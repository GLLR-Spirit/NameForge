import {
  BrandPersonalityTrait,
  NameInsightCategory,
  NameInsightInput,
  NameInsightMetrics,
  NameInsightResult,
  SuggestedVariation,
  VisualArchetypeId,
  VisualBrandColor,
  VisualBrandColorRole,
  VisualDirectionProfile,
} from '../types/nameInsight';
import {
  ARCHETYPE_PALETTES,
  ARCHETYPE_PRIORITY_DIRECTIONS,
  ARCHETYPE_SPECS,
  CATEGORY_DEFAULT_ARCHETYPE,
  CATEGORY_VARIATION_TEMPLATES,
  GENERATOR_VISUAL_ARCHETYPES,
  getLocalizedNameInsightCategoryLabel,
  isNameInsightSupported,
  NAME_INSIGHT_CATEGORY_READING_TEMPLATES,
  NAME_INSIGHT_READING_TEMPLATES,
  NAME_INSIGHT_SLOGAN_TEMPLATES,
  resolveNameInsightCategory,
  VariationCandidateTemplate,
} from '../data/nameInsightData';
import { resolveCanonicalLocale } from '../i18n/localeRegistry';
import { GeneratorId } from '../types';

function stableHash(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function getGraphemeClusters(value: string): string[] {
  type GraphemeSegmenterConstructor = new (
    locales?: string | string[],
    options?: { granularity: 'grapheme' }
  ) => { segment(input: string): Iterable<{ segment: string }> };

  const Segmenter = (Intl as unknown as { Segmenter?: GraphemeSegmenterConstructor }).Segmenter;
  if (!Segmenter) return Array.from(value);
  return Array.from(new Segmenter(undefined, { granularity: 'grapheme' }).segment(value), (part) => part.segment);
}

function countWords(value: string, language: string): number | null {
  if (!value) return 0;

  type WordSegmenterConstructor = new (
    locales?: string | string[],
    options?: { granularity: 'word' }
  ) => { segment(input: string): Iterable<{ segment: string; isWordLike?: boolean }> };

  const Segmenter = (Intl as unknown as { Segmenter?: WordSegmenterConstructor }).Segmenter;
  if (!Segmenter) {
    const baseLanguage = language.toLowerCase().split('-')[0];
    if (['ja', 'zh', 'th'].includes(baseLanguage)) return null;
    return value.split(/\s+/u).filter(Boolean).length;
  }

  return Array.from(
    new Segmenter(language, { granularity: 'word' }).segment(value)
  ).filter((part) => part.isWordLike).length;
}

function countRepeatedCharacters(name: string, language: string): number {
  const characters = getGraphemeClusters(name);
  let repeated = 0;
  for (let index = 1; index < characters.length; index += 1) {
    const current = characters[index];
    const previous = characters[index - 1];
    if (/\p{L}/u.test(current) && /\p{L}/u.test(previous)
      && current.toLocaleLowerCase(language) === previous.toLocaleLowerCase(language)) {
      repeated += 1;
    }
  }
  return repeated;
}

function getWritingSystem(character: string): string {
  if (/\p{Script=Latin}/u.test(character)) return 'latin';
  if (/\p{Script=Arabic}/u.test(character)) return 'arabic';
  if (/\p{Script=Cyrillic}/u.test(character)) return 'cyrillic';
  if (/\p{Script=Greek}/u.test(character)) return 'greek';
  if (/\p{Script=Hebrew}/u.test(character)) return 'hebrew';
  if (/\p{Script=Devanagari}/u.test(character)) return 'devanagari';
  if (/\p{Script=Han}/u.test(character)) return 'han';
  if (/\p{Script=Hiragana}/u.test(character)) return 'hiragana';
  if (/\p{Script=Katakana}/u.test(character)) return 'katakana';
  if (/\p{Script=Hangul}/u.test(character)) return 'hangul';
  if (/\p{Script=Thai}/u.test(character)) return 'thai';
  if (/\p{Script=Bengali}/u.test(character)) return 'bengali';
  if (/\p{Script=Armenian}/u.test(character)) return 'armenian';
  if (/\p{Script=Georgian}/u.test(character)) return 'georgian';
  if (/\p{Script=Ethiopic}/u.test(character)) return 'ethiopic';
  if (/\p{Script=Tamil}/u.test(character)) return 'tamil';
  if (/\p{Script=Telugu}/u.test(character)) return 'telugu';
  if (/\p{Script=Gurmukhi}/u.test(character)) return 'gurmukhi';
  if (/\p{Script=Gujarati}/u.test(character)) return 'gujarati';
  if (/\p{Script=Kannada}/u.test(character)) return 'kannada';
  if (/\p{Script=Malayalam}/u.test(character)) return 'malayalam';
  if (/\p{Script=Sinhala}/u.test(character)) return 'sinhala';
  if (/\p{Script=Lao}/u.test(character)) return 'lao';
  if (/\p{Script=Myanmar}/u.test(character)) return 'myanmar';
  if (/\p{Script=Khmer}/u.test(character)) return 'khmer';
  return 'other';
}

function hasMixedWritingSystems(writingSystems: string[], language: string): boolean {
  if (writingSystems.length <= 1) return false;
  if (language.toLowerCase().startsWith('ja')) {
    const japaneseScripts = new Set(['han', 'hiragana', 'katakana']);
    return writingSystems.some((script) => !japaneseScripts.has(script));
  }
  return true;
}

function analyzeStructure(name: string, language: string): NameInsightMetrics {
  const normalized = name.normalize('NFC').trim().replace(/\s+/g, ' ');
  const codePoints = Array.from(normalized);
  const characters = getGraphemeClusters(normalized).filter((character) => /\p{L}/u.test(character));
  const latinLetters = characters.filter((character) => getWritingSystem(character) === 'latin');
  const vowels = latinLetters.filter((character) => {
    const baseLetter = character.normalize('NFD').replace(/\p{M}/gu, '');
    return /^[aeiouy]$/i.test(baseLetter);
  }).length;
  const writingSystems = Array.from(new Set(characters.map(getWritingSystem)));
  return {
    characterCount: characters.length,
    wordCount: countWords(normalized, language),
    repeatedCharacterCount: countRepeatedCharacters(normalized, language),
    latinVowelShare: characters.length > 0 && latinLetters.length === characters.length
      ? Math.round((vowels / characters.length) * 100)
      : null,
    digitCount: codePoints.filter((character) => /\p{N}/u.test(character)).length,
    symbolCount: codePoints.filter((character) => !/[\p{L}\p{N}\s]/u.test(character)).length,
    uppercaseCount: characters.filter((character) => /\p{Lu}/u.test(character)).length,
    hasMixedScripts: hasMixedWritingSystems(writingSystems, language),
    writingSystems
  };
}

/** WCAG relative luminance text contrast calculation for hex swatch badges. */
export function getContrastTextColor(hex: string): '#0f172a' | '#ffffff' {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return '#0f172a';
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const linearize = (channel: number) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  const luminance = 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
  return luminance > 0.34 ? '#0f172a' : '#ffffff';
}

export function resolveVisualArchetype(
  generatorId: GeneratorId,
  category: NameInsightCategory,
  style: string
): VisualArchetypeId {
  const direct = GENERATOR_VISUAL_ARCHETYPES[generatorId];
  if (direct) return direct;

  const lowerStyle = style.toLowerCase();
  if (lowerStyle.includes('luxury') || lowerStyle.includes('prestige') || lowerStyle.includes('luxe')) {
    return 'luxury-atelier';
  }
  if (lowerStyle.includes('cyber') || lowerStyle.includes('neon') || lowerStyle.includes('arcade')) {
    return 'cyber-kinetic';
  }
  if (lowerStyle.includes('tech') || lowerStyle.includes('saas') || lowerStyle.includes('modern')) {
    return category === 'rpg' ? 'arcane-heritage' : 'modern-tech';
  }
  if (lowerStyle.includes('organic') || lowerStyle.includes('craft') || lowerStyle.includes('nature')) {
    return 'organic-craft';
  }

  return CATEGORY_DEFAULT_ARCHETYPE[category];
}

function deriveBrandPersonality(
  archetype: VisualArchetypeId,
  metrics: NameInsightMetrics
): BrandPersonalityTrait[] {
  const spec = ARCHETYPE_SPECS[archetype];
  const traits: BrandPersonalityTrait[] = [...spec.baseTraits];

  if (metrics.characterCount <= 6) {
    traits.push('minimalist');
  } else if (metrics.characterCount >= 14) {
    traits.push(archetype === 'modern-tech' || archetype === 'scientific-clarity' ? 'structured' : 'atmospheric');
  }

  if (metrics.digitCount > 0) {
    traits.push('futuristic');
  } else if (metrics.latinVowelShare !== null && metrics.latinVowelShare >= 50) {
    traits.push('expressive');
  }

  const unique: BrandPersonalityTrait[] = [];
  for (const trait of traits) {
    if (!unique.includes(trait)) unique.push(trait);
    if (unique.length >= 4) break;
  }
  return unique;
}

function buildVisualDirection(
  generatorId: GeneratorId,
  category: NameInsightCategory,
  style: string,
  metrics: NameInsightMetrics,
  hash: number
): VisualDirectionProfile {
  const archetype = resolveVisualArchetype(generatorId, category, style);
  const candidates = ARCHETYPE_PALETTES[archetype];
  const paletteTuple = candidates[hash % candidates.length];
  const roles: VisualBrandColorRole[] = ['primary', 'secondary', 'surface', 'accent'];
  const colors: VisualBrandColor[] = paletteTuple.map((hex, idx) => ({
    hex,
    role: roles[idx],
    contrastInk: getContrastTextColor(hex),
  }));

  const spec = ARCHETYPE_SPECS[archetype];
  const personality = deriveBrandPersonality(archetype, metrics);

  return {
    archetype,
    colors,
    typographyMood: spec.typographyMood,
    motif: spec.motif,
    personality,
    studioMapping: { ...spec.studioMapping },
  };
}

function tokenizeNormalizedStemWords(value: string): Set<string> {
  const cleaned = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .trim();

  const words = cleaned.split(/\s+/).filter(Boolean);
  const stems = new Set<string>();
  for (const word of words) {
    stems.add(word);
    if (word.length > 3 && word.endsWith('s')) {
      stems.add(word.slice(0, -1));
    }
  }
  return stems;
}

function hasTokenCollision(nameStems: Set<string>, candidateToken: string): boolean {
  const tokenStems = tokenizeNormalizedStemWords(candidateToken);
  for (const stem of tokenStems) {
    if (stem.length >= 3 && nameStems.has(stem)) {
      return true;
    }
  }
  return false;
}

function buildContextAwareVariations(
  name: string,
  category: NameInsightCategory,
  archetype: VisualArchetypeId,
  hash: number
): SuggestedVariation[] {
  const base = name.trim().replace(/\s+/g, ' ');
  if (!base) return [];

  const nameStems = tokenizeNormalizedStemWords(base);
  const pool = [...CATEGORY_VARIATION_TEMPLATES[category]];
  const priorityOrder = ARCHETYPE_PRIORITY_DIRECTIONS[archetype];

  // Prioritize templates aligned with the visual archetype, then rotate deterministically by hash
  const prioritized = pool.sort((a, b) => {
    const aIdx = priorityOrder.indexOf(a.direction);
    const bIdx = priorityOrder.indexOf(b.direction);
    const rankA = aIdx === -1 ? 99 : aIdx;
    const rankB = bIdx === -1 ? 99 : bIdx;
    if (rankA !== rankB) return rankA - rankB;
    return ((stableHash(a.token) + hash) % 17) - ((stableHash(b.token) + hash) % 17);
  });

  const results: SuggestedVariation[] = [];
  const seenNames = new Set<string>([base.toLowerCase()]);

  const tryAddCandidate = (candidate: VariationCandidateTemplate) => {
    if (hasTokenCollision(nameStems, candidate.token)) return;
    const composed =
      candidate.position === 'prefix'
        ? `${candidate.token} ${base}`
        : `${base} ${candidate.token}`;
    const key = composed.toLowerCase();
    if (seenNames.has(key)) return;
    seenNames.add(key);
    results.push({ name: composed, direction: candidate.direction });
  };

  for (const template of prioritized) {
    if (results.length >= 4) break;
    tryAddCandidate(template);
  }

  // Fallback across general clean descriptors only if base name collided with almost all category tokens
  if (results.length < 3) {
    const fallbacks = CATEGORY_VARIATION_TEMPLATES.general;
    for (const template of fallbacks) {
      if (results.length >= 4) break;
      tryAddCandidate(template);
    }
  }

  return results;
}

/**
 * Creates a reproducible creative reading and deterministic visual direction from
 * the name's visible structure and generator metadata. Visual and linguistic notes
 * are creative suggestions — never trademark clearances or etymological claims.
 */
export function createNameInsight(input: NameInsightInput): NameInsightResult | null {
  if (!isNameInsightSupported(input.generatorId) || !input.name.trim()) return null;

  const category = resolveNameInsightCategory(input.generatorId);
  const normalizedName = input.name.normalize('NFC').trim().replace(/\s+/g, ' ');
  const hash = stableHash(`${input.generatorId}|${normalizedName}|${input.style}`);
  const language = resolveCanonicalLocale(input.language ?? 'en');
  const metrics = analyzeStructure(normalizedName, language);

  const visualDirection = buildVisualDirection(
    input.generatorId,
    category,
    input.style,
    metrics,
    hash
  );
  const palette: [string, string, string] = [
    visualDirection.colors[0].hex,
    visualDirection.colors[1].hex,
    visualDirection.colors[3].hex,
  ];
  const variations = buildContextAwareVariations(
    normalizedName,
    category,
    visualDirection.archetype,
    hash
  );

  const localizedCategoryLabel = getLocalizedNameInsightCategoryLabel(category, language);
  const sloganTone = category === 'brand' ? 'identity' : ['character', 'rpg', 'place'].includes(category) ? 'world' : 'innovation';
  const languageTemplates = NAME_INSIGHT_SLOGAN_TEMPLATES[language] ?? NAME_INSIGHT_SLOGAN_TEMPLATES.en;
  const slogan = languageTemplates[sloganTone].replace('{name}', normalizedName);
  const readingTemplates = NAME_INSIGHT_READING_TEMPLATES[language] ?? NAME_INSIGHT_READING_TEMPLATES.en;
  const readingBand = metrics.characterCount <= 8 ? 'compact' : metrics.characterCount <= 15 ? 'balanced' : 'extended';
  const categoryTemplate = NAME_INSIGHT_CATEGORY_READING_TEMPLATES[language]?.[category];
  const readingTemplate = categoryTemplate ?? readingTemplates[readingBand];
  const creativeReading = readingTemplate
    .replace('{context}', input.generatorLabel ?? localizedCategoryLabel)
    .replace('{name}', normalizedName)
    .replace('{count}', String(metrics.characterCount));

  return {
    category,
    categoryLabel: localizedCategoryLabel,
    creativeReading,
    contextDescription: input.description,
    slogan,
    palette,
    alternatives: variations.map((item) => item.name),
    variations,
    visualDirection,
    metrics,
    isCreativeOnly: true
  };
}

export { isNameInsightSupported };
