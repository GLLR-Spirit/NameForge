import type {
  GeneratedName,
  GeneratorId,
  GenLanguageCode,
} from '../types';
import type {
  ArabicLinguisticDetails,
  BrandPersonalityTrait,
  CategorizedNameVariations,
  ComparisonCandidateSource,
  IntelligenceChecklistItem,
  JapaneseLinguisticDetails,
  NameComparisonEntry,
  NameComparisonReport,
  NameInsightMetrics,
  NameInsightResult,
  NameIntelligenceReport,
  NameOriginClassification,
  PronunciationDifficultyLevel,
  QualityCriterionAssessment,
  ReportVerificationStatus,
  ScriptBreakdownEntry,
  VisualBrandColor,
  VisualBrandColorRole,
  VisualDirectionPreset,
  VisualExtensionItem,
} from '../types/nameInsight';
import type { NameQualityResult } from './linguisticQuality';
import type { CategoryLanguageCompatibility } from './languageCompatibility';
import { screenTrademarkSimilarity } from './trademarkSafeguard';
import { screenNameSemantics } from './semanticSafety';
import { splitJapaneseMora, type HangulSyllableParts } from './phoneticUnits';
import { getUnifiedAnalysisLabels, formatTargetLanguageName } from '../i18n/unifiedAnalysisLabels';
import { getNameIntelligenceLabels } from '../i18n/nameIntelligenceLabels';
import { getEnhancementsLabels } from '../i18n/enhancementsLabels';
import { getLocalizedGeneratorShortTitle } from '../i18n/generatorTitles';
import { resolveCanonicalLocale } from '../i18n/localeRegistry';
import { GENERATORS_METADATA } from '../data/generators';

const ISO_SCRIPT_CODES: Record<string, { iso: string; classEn: string; classFr: string }> = {
  latin: { iso: 'Latn', classEn: 'Alphabet (Latin)', classFr: 'Alphabet (latin)' },
  arabic: { iso: 'Arab', classEn: 'Abjad (Arabic script)', classFr: 'Abjad (écriture arabe)' },
  hebrew: { iso: 'Hebr', classEn: 'Abjad (Hebrew script)', classFr: 'Abjad (écriture hébraïque)' },
  cyrillic: { iso: 'Cyrl', classEn: 'Alphabet (Cyrillic)', classFr: 'Alphabet (cyrillique)' },
  greek: { iso: 'Grek', classEn: 'Alphabet (Greek)', classFr: 'Alphabet (grec)' },
  devanagari: { iso: 'Deva', classEn: 'Abugida (Devanagari)', classFr: 'Alphasyllabaire (dévanâgarî)' },
  bengali: { iso: 'Beng', classEn: 'Abugida (Bengali)', classFr: 'Alphasyllabaire (bengali)' },
  thai: { iso: 'Thai', classEn: 'Abugida (Thai script)', classFr: 'Alphasyllabaire (thaï)' },
  hangul: { iso: 'Hang', classEn: 'Featural syllabic (Hangul)', classFr: 'Syllabaire featural (hangeul)' },
  hiragana: { iso: 'Hira', classEn: 'Moraic syllabary (Hiragana)', classFr: 'Syllabaire moraïque (hiragana)' },
  katakana: { iso: 'Kana', classEn: 'Moraic syllabary (Katakana)', classFr: 'Syllabaire moraïque (katakana)' },
  han: { iso: 'Hani', classEn: 'Logographic / Morphosyllabic (Han/Kanji)', classFr: 'Logographique (Han / Kanji)' },
  other: { iso: 'Zyyy', classEn: 'Mixed or common symbols', classFr: 'Symboles communs ou mixtes' },
};

function detectCharScript(ch: string): string {
  if (/\p{Script=Latin}/u.test(ch)) return 'latin';
  if (/\p{Script=Arabic}/u.test(ch)) return 'arabic';
  if (/\p{Script=Hebrew}/u.test(ch)) return 'hebrew';
  if (/\p{Script=Cyrillic}/u.test(ch)) return 'cyrillic';
  if (/\p{Script=Greek}/u.test(ch)) return 'greek';
  if (/\p{Script=Devanagari}/u.test(ch)) return 'devanagari';
  if (/\p{Script=Bengali}/u.test(ch)) return 'bengali';
  if (/\p{Script=Thai}/u.test(ch)) return 'thai';
  if (/\p{Script=Hangul}/u.test(ch)) return 'hangul';
  if (/\p{Script=Hiragana}/u.test(ch)) return 'hiragana';
  if (/\p{Script=Katakana}/u.test(ch)) return 'katakana';
  if (/\p{Script=Han}/u.test(ch)) return 'han';
  return 'other';
}

function estimateLatinSyllables(text: string): string[] {
  const words = text
    .trim()
    .split(/[\s\-_'’]+/u)
    .filter((w) => /\p{L}/u.test(w));
  const units: string[] = [];
  for (const word of words) {
    const clean = word.normalize('NFC');
    const chunks = clean.match(/[^aeiouyàâäéèêëîïôöùûüÿœæáéíóúñąćęłńóśźżäöüßăâîșțåøāēīōū]*[aeiouyàâäéèêëîïôöùûüÿœæáéíóúäöüāēīōū]+(?:[^aeiouyàâäéèêëîïôöùûüÿœæáéíóúäöüāēīōū]+(?=$))?/giu);
    if (chunks && chunks.length > 0) {
      units.push(...chunks);
    } else {
      units.push(clean);
    }
  }
  return units;
}

function isFrenchLocale(locale: string): boolean {
  return resolveCanonicalLocale(locale) === 'fr';
}

function analyzeArabicSpecifics(name: string, targetLang: string, interfaceLang: string): ArabicLinguisticDetails {
  const fr = isFrenchLocale(interfaceLang);
  const hasArabic = /\p{Script=Arabic}/u.test(name);
  const hasLatin = /\p{Script=Latin}/u.test(name);
  const harakatMatches = name.match(/[\u064B-\u065F\u0670]/gu) ?? [];
  const hasHarakat = harakatMatches.length > 0;
  const isArabicContext = hasArabic || targetLang === 'ar';

  if (!isArabicContext) {
    return {
      isArabicScript: false,
      hasHarakat: false,
      hasLatinInArabic: false,
      diacriticCount: 0,
      notes: [],
    };
  }

  const notes: string[] = [];
  if (hasArabic && !hasHarakat) {
    notes.push(
      fr
        ? 'Écriture arabe sans harakat (voyelles brèves) : la prononciation exacte dépend de l’usage lexical et ne peut pas être déduite avec certitude de la seule graphie.'
        : 'Arabic text without harakat (short vowel marks): exact vocalization depends on lexical familiarity rather than spelling alone.'
    );
  } else if (hasArabic && hasHarakat) {
    notes.push(
      fr
        ? `Voyelles diacritiques arabes détectées (${harakatMatches.length}) facilitant la lecture phonétique.`
        : `Arabic vowel diacritics detected (${harakatMatches.length}), aiding phonetic reading clarity.`
    );
  }
  if (hasArabic && hasLatin) {
    notes.push(
      fr
        ? 'Présence simultanée de caractères arabes et latins : vérifiez que cette insertion bidirectionnelle est volontaire.'
        : 'Both Arabic and Latin characters appear in the same name; confirm bidirectional mixed-script styling is intentional.'
    );
  } else if (!hasArabic && targetLang === 'ar') {
    notes.push(
      fr
        ? 'Nom translittéré ou latinisé pour un contexte arabe : une vérification par un locuteur arabophone est conseillée.'
        : 'Latinized or transliterated form used with an Arabic target context; native Arabic speaker confirmation is recommended.'
    );
  }

  return {
    isArabicScript: hasArabic,
    hasHarakat,
    hasLatinInArabic: hasArabic && hasLatin,
    diacriticCount: harakatMatches.length,
    notes,
  };
}

function analyzeJapaneseSpecifics(
  name: string,
  generatorId: GeneratorId,
  isAttested: boolean,
  targetLang: string,
  interfaceLang: string
): JapaneseLinguisticDetails {
  const fr = isFrenchLocale(interfaceLang);
  const chars = Array.from(name.normalize('NFC'));
  const hiraganaCount = chars.filter((c) => /\p{Script=Hiragana}/u.test(c)).length;
  const katakanaCount = chars.filter((c) => /\p{Script=Katakana}/u.test(c)).length;
  const kanjiCount = chars.filter((c) => /\p{Script=Han}/u.test(c)).length;
  const romajiCount = chars.filter((c) => /\p{Script=Latin}/u.test(c)).length;
  const hasJaScript = hiraganaCount + katakanaCount + kanjiCount > 0;
  const isJaGen =
    targetLang === 'ja' ||
    hasJaScript ||
    ['japanese', 'anime', 'anime_hero', 'anime_villain', 'shinobi', 'samurai', 'kanji', 'mecha'].includes(generatorId);

  if (!isJaGen) {
    return {
      isJapaneseContext: false,
      hiraganaCount: 0,
      katakanaCount: 0,
      kanjiCount: 0,
      romajiCount: 0,
      scriptMixMode: 'non-japanese',
      authenticityDistinction: '',
      notes: [],
    };
  }

  let scriptMixMode: JapaneseLinguisticDetails['scriptMixMode'] = 'mixed';
  if (katakanaCount > 0 && hiraganaCount === 0 && kanjiCount === 0 && romajiCount === 0) scriptMixMode = 'katakana-only';
  else if (hiraganaCount > 0 && katakanaCount === 0 && kanjiCount === 0 && romajiCount === 0) scriptMixMode = 'hiragana-only';
  else if (kanjiCount > 0 && romajiCount === 0 && katakanaCount === 0) scriptMixMode = 'kanji-kana';
  else if (romajiCount > 0 && !hasJaScript) scriptMixMode = 'romaji';

  const isAnimeGenre = ['anime', 'anime_hero', 'anime_villain', 'mecha', 'shinobi'].includes(generatorId);
  const authenticityDistinction = isAttested
    ? fr
      ? 'Forme japonaise attestée issue du répertoire de référence (distincte d’un néologisme d’anime).'
      : 'Attested Japanese form from the reference directory (distinct from fictional anime coinage).'
    : isAnimeGenre || scriptMixMode === 'katakana-only'
      ? fr
        ? 'Création stylistique d’inspiration anime/fiction : peut adopter des sonorités katakana ou romaji sans prétendre à l’état civil japonais.'
        : 'Creative anime or fiction styling: may use katakana or romaji resonance rather than traditional civic naming.'
      : fr
        ? 'Nom d’inspiration japonaise généré localement ; la lecture des kanji et la pertinence culturelle exigent une relecture humaine.'
        : 'Locally composed Japanese-inspired pattern; kanji reading and cultural nuance require human validation.';

  const notes: string[] = [];
  if (kanjiCount > 0) {
    notes.push(
      fr
        ? `Contient ${kanjiCount} kanji : la lecture exacte (on’yomi / kun’yomi) dépend du contexte et ne peut pas être garantie sans furigana.`
        : `Contains ${kanjiCount} kanji character(s): exact reading (on'yomi / kun'yomi) depends on naming context without furigana.`
    );
  }
  if (katakanaCount > 0) {
    notes.push(
      fr
        ? `${katakanaCount} caractère(s) katakana (registre courant pour les noms stylisés, d’emprunt ou de fiction).`
        : `${katakanaCount} katakana character(s), idiomatic for stylized, foreign-origin, or fictional naming.`
    );
  }
  if (hiraganaCount > 0) {
    notes.push(
      fr
        ? `${hiraganaCount} caractère(s) hiragana offrant une lecture syllabique régulière en mores.`
        : `${hiraganaCount} hiragana character(s) providing regular moraic reading.`
    );
  }

  return {
    isJapaneseContext: true,
    hiraganaCount,
    katakanaCount,
    kanjiCount,
    romajiCount,
    scriptMixMode,
    authenticityDistinction,
    notes,
  };
}

function getRelevantThematicUniverses(generatorId: GeneratorId, interfaceLang: string): string[] {
  const fr = isFrenchLocale(interfaceLang);
  const meta = GENERATORS_METADATA[generatorId];
  const fam = meta?.category ?? 'creative';
  if (['brand', 'startup', 'saas', 'ecommerce', 'agency', 'fintech', 'studio'].includes(generatorId) || fam === 'business') {
    return fr
      ? ['Identité de marque & produit', 'Positionnement commercial et digital', 'Architecture de gamme ou studio']
      : ['Brand & product identity', 'Digital & commercial positioning', 'Studio or product line naming'];
  }
  if (['scifi', 'cyberpunk', 'space', 'planet', 'starship', 'ai_system', 'tech', 'quantum'].includes(generatorId) || fam === 'innovation') {
    return fr
      ? ['Science-fiction & univers technologiques', 'Systèmes innovants et projets numériques', 'Littérature spéculative et jeux futuristes']
      : ['Science fiction & speculative tech', 'Software systems & innovation projects', 'Futuristic games and worldbuilding'];
  }
  if (['anime', 'anime_hero', 'anime_villain', 'manga', 'shinobi', 'samurai', 'idol'].includes(generatorId)) {
    return fr
      ? ['Fiction anime & manga', 'Arcs narratifs d’action ou de fantasy stylisée', 'Personnages, pseudonymes et créations visuelles']
      : ['Anime & manga storytelling', 'Action or stylized character arcs', 'Pseudonyms and visual creative projects'];
  }
  if (['baby_name', 'first_name', 'surname', 'character'].includes(generatorId)) {
    return fr
      ? ['Nommage personnel ou littéraire', 'Fiches de personnages réalistes', 'Récits contemporains ou historiques']
      : ['Personal or literary naming', 'Realistic character profiles', 'Contemporary or historical narratives'];
  }
  if (fam === 'fantasy' || ['fantasy', 'elf', 'dragon', 'kingdom', 'tavern', 'rpg_quest'].includes(generatorId)) {
    return fr
      ? ['Littérature et jeux de rôle fantasy', 'Construction d’univers et factions', 'Campagnes narratives et JDR']
      : ['Fantasy fiction & tabletop RPGs', 'Worldbuilding, realms, and factions', 'Narrative campaigns and game lore'];
  }
  return fr
    ? ['Création éditoriale et artistique', 'Projets numériques, jeux et récits', 'Identités conceptuelles']
    : ['Editorial & creative projects', 'Games, storytelling, and digital identities', 'Concept naming'];
}

function getRelevantAudiences(generatorId: GeneratorId, interfaceLang: string): string[] {
  const fr = isFrenchLocale(interfaceLang);
  const fam = GENERATORS_METADATA[generatorId]?.category ?? 'creative';
  if (fam === 'business') {
    return fr
      ? ['Fondateurs, startups et studios créatifs', 'Équipes produit & marketing', 'Porteurs de projets numériques']
      : ['Founders, startups, and creative studios', 'Product and brand teams', 'Digital product builders'];
  }
  if (fam === 'innovation') {
    return fr
      ? ['Développeurs, chercheurs et créateurs sci-fi', 'Équipes tech et studios de jeu vidéo']
      : ['Builders, engineers, and sci-fi writers', 'Tech teams and game studios'];
  }
  if (fam === 'fantasy') {
    return fr
      ? ['Auteurs, maîtres du jeu et joueurs JDR', 'Concepteurs d’univers et créateurs indépendants']
      : ['Authors, game masters, and RPG players', 'Worldbuilders and indie game creators'];
  }
  return fr
    ? ['Créateurs de contenu, auteurs et designers', 'Communautés créatives et projets indépendants']
    : ['Content creators, writers, and designers', 'Creative communities and independent projects'];
}

function getRecommendedFontsForScripts(scripts: string[], interfaceLang: string): string[] {
  const fr = isFrenchLocale(interfaceLang);
  if (scripts.includes('arabic')) {
    return fr
      ? ['Noto Naskh Arabic / Amiri (éditorial classique)', 'IBM Plex Sans Arabic / Cairo (moderne géométrique)', 'Noto Kufi Arabic (titres structurés)']
      : ['Noto Naskh Arabic / Amiri (classical editorial)', 'IBM Plex Sans Arabic / Cairo (modern geometric)', 'Noto Kufi Arabic (structured display)'];
  }
  if (scripts.includes('hiragana') || scripts.includes('katakana') || scripts.includes('han')) {
    return fr
      ? ['Noto Sans JP / Hiragino Kaku (clarté numérique)', 'Shippori Mincho / Noto Serif JP (éditorial)', 'M PLUS Rounded (moderne accessible)']
      : ['Noto Sans CJK / Hiragino Kaku (digital clarity)', 'Shippori Mincho / Noto Serif CJK (editorial serif)', 'M PLUS Rounded (friendly modern)'];
  }
  if (scripts.includes('hangul')) {
    return fr
      ? ['Pretendard / Noto Sans KR (interface moderne)', 'Nanum Myeongjo / Noto Serif KR (littéraire)']
      : ['Pretendard / Noto Sans KR (modern UI sans)', 'Nanum Myeongjo / Noto Serif KR (editorial serif)'];
  }
  if (scripts.includes('cyrillic') || scripts.includes('greek')) {
    return fr
      ? ['Plus Jakarta Sans / Manrope (support étendu propre)', 'Cormorant Garamond / PT Serif (littéraire & historique)']
      : ['Plus Jakarta Sans / Manrope (clean extended glyph coverage)', 'Cormorant Garamond / PT Serif (literary serif)'];
  }
  if (scripts.includes('devanagari') || scripts.includes('bengali') || scripts.includes('thai')) {
    return fr
      ? ['Noto Sans / Kohinoor (lisibilité des ligatures)', 'Tiro / Noto Serif (édition soignée)']
      : ['Noto Sans / Kohinoor (clean conjunct rendering)', 'Tiro / Noto Serif (refined editorial)'];
  }
  return fr
    ? ['Plus Jakarta Sans / Outfit (sans-serif géométrique moderne)', 'Cormorant Garamond / Fraunces (sérif éditorial de caractère)', 'JetBrains Mono / IBM Plex Mono (signature technique)']
    : ['Plus Jakarta Sans / Outfit (clean geometric sans)', 'Cormorant Garamond / Fraunces (editorial character serif)', 'JetBrains Mono / IBM Plex Mono (structured technical)'];
}

function buildCategorizedVariations(
  name: string,
  baseVariations: string[],
  metrics: NameInsightMetrics
): CategorizedNameVariations {
  const clean = name.normalize('NFC').trim();
  const parts = clean.split(/[\s\-_]+/u).filter(Boolean);
  const latinOnly = metrics.writingSystems.every((s) => s === 'latin');
  const firstWord = parts[0] || clean;
  const asciiSlug = clean
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\p{L}\p{N}]+/gu, '')
    .toLowerCase();

  const shortSet = new Set<string>();
  if (parts.length > 1) {
    shortSet.add(firstWord);
  }
  if (Array.from(clean).length > 6) {
    shortSet.add(Array.from(firstWord).slice(0, Math.min(5, Array.from(firstWord).length)).join(''));
  } else {
    shortSet.add(clean);
  }

  const extendedSet = new Set<string>(baseVariations.slice(0, 3));
  if (latinOnly && parts.length === 1) {
    extendedSet.add(`${clean} Studio`);
    extendedSet.add(`${clean} Labs`);
  }

  const altSpellingSet = new Set<string>();
  if (latinOnly && clean.length >= 4) {
    if (/c(?=[eiy])/i.test(clean)) altSpellingSet.add(clean.replace(/c(?=[eiy])/i, 's'));
    if (/k/i.test(clean)) altSpellingSet.add(clean.replace(/k/i, 'c'));
    else if (/ph/i.test(clean)) altSpellingSet.add(clean.replace(/ph/i, 'f'));
    else if (/ae/i.test(clean)) altSpellingSet.add(clean.replace(/ae/i, 'e'));
    else if (!clean.includes('-')) {
      const mid = Math.floor(clean.length / 2);
      if (mid >= 2 && clean.length >= 6) {
        altSpellingSet.add(`${clean.slice(0, mid)}-${clean.slice(mid)}`);
      }
    }
    if (altSpellingSet.size === 0) {
      altSpellingSet.add(clean.toUpperCase());
    }
  } else if (baseVariations[3]) {
    altSpellingSet.add(baseVariations[3]);
  }

  const usernameSet = new Set<string>();
  if (asciiSlug) {
    usernameSet.add(`@${asciiSlug}`);
    usernameSet.add(`${asciiSlug}.official`);
    if (asciiSlug.length <= 12) usernameSet.add(`${asciiSlug}_hq`);
  } else {
    usernameSet.add(`@${clean.replace(/\s+/g, '')}`);
  }

  const logoSet = new Set<string>();
  if (parts.length >= 2) {
    const initials = parts.map((p) => Array.from(p)[0] ?? '').join('').toUpperCase();
    if (initials) logoSet.add(initials);
    logoSet.add(`${Array.from(parts[0])[0]?.toUpperCase() ?? ''} · ${parts[parts.length - 1]}`);
  } else {
    const letters = Array.from(clean);
    if (letters.length >= 2) {
      logoSet.add(`${letters[0]}${letters[1]}`.toUpperCase());
      logoSet.add(`[${letters[0].toUpperCase()}]`);
    } else if (letters.length === 1) {
      logoSet.add(letters[0].toUpperCase());
    }
  }

  return {
    short: Array.from(shortSet).filter(Boolean).slice(0, 3),
    extended: Array.from(extendedSet).filter(Boolean).slice(0, 3),
    alternativeSpelling: Array.from(altSpellingSet).filter(Boolean).slice(0, 3),
    username: Array.from(usernameSet).filter(Boolean).slice(0, 3),
    logoFriendly: Array.from(logoSet).filter(Boolean).slice(0, 3),
  };
}

function buildVisualExtensions(name: string, generatorId: GeneratorId): VisualExtensionItem[] {
  const clean = name.trim();
  const compact = clean
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\p{L}\p{N}]+/gu, '')
    .toLowerCase();
  const handle = compact || clean.replace(/\s+/g, '').toLowerCase();
  const fam = GENERATORS_METADATA[generatorId]?.category ?? 'creative';
  const items: VisualExtensionItem[] = [
    { channel: 'social', example: `@${handle}` },
    { channel: 'profile', example: `${clean} · Official` },
  ];
  if (fam === 'business' || fam === 'innovation') {
    items.push({ channel: 'website', example: `${handle}.io / ${handle}.com` });
    items.push({ channel: 'brand', example: `${clean.toUpperCase()} — Studio` });
  } else if (fam === 'fantasy' || ['gamer', 'esports', 'anime', 'anime_hero', 'character'].includes(generatorId)) {
    items.push({ channel: 'gaming', example: `${clean} [NF]` });
    items.push({ channel: 'brand', example: `House of ${clean}` });
  } else {
    items.push({ channel: 'website', example: `${handle}.org` });
  }
  return items;
}

function buildVisualPresets(insight: NameInsightResult, interfaceLang: string): VisualDirectionPreset[] {
  const fr = isFrenchLocale(interfaceLang);
  const vd = insight.visualDirection;
  const primaryColors = vd.colors;

  const minimalColors: VisualBrandColor[] = [
    { hex: '#0F172A', role: 'primary', contrastInk: '#ffffff' },
    { hex: '#475569', role: 'secondary', contrastInk: '#ffffff' },
    { hex: '#F8FAFC', role: 'surface', contrastInk: '#0f172a' },
    { hex: primaryColors[3]?.hex || '#0284C7', role: 'accent', contrastInk: '#ffffff' },
  ];

  const monoColors: VisualBrandColor[] = [
    { hex: '#1E293B', role: 'primary', contrastInk: '#ffffff' },
    { hex: '#0284C7', role: 'secondary', contrastInk: '#ffffff' },
    { hex: '#0F172A', role: 'surface', contrastInk: '#ffffff' },
    { hex: '#38BDF8', role: 'accent', contrastInk: '#0f172a' },
  ];

  return [
    {
      id: 'archetype-primary',
      presetKey: 'archetype-primary',
      archetype: vd.archetype,
      typographyMood: vd.typographyMood,
      motif: vd.motif,
      colors: primaryColors,
      studioMapping: vd.studioMapping,
      intentionNote: fr
        ? 'Direction recommandée alignée sur l’archétype de la catégorie.'
        : 'Recommended baseline palette and typography matched to this category.',
    },
    {
      id: 'minimal-editorial',
      presetKey: 'minimal-editorial',
      archetype: 'luxury-atelier',
      typographyMood: 'serif',
      motif: 'crest',
      colors: minimalColors,
      studioMapping: {
        styleId: 'serif',
        effectId: '',
        fontId: 'georgia',
      },
      intentionNote: fr
        ? 'Présentation sobre à fort contraste éditorial sur fond clair.'
        : 'High-legibility editorial presentation on a clean light canvas.',
    },
    {
      id: 'modern-mono',
      presetKey: 'modern-mono',
      archetype: 'modern-tech',
      typographyMood: 'monospace',
      motif: 'grid',
      colors: monoColors,
      studioMapping: {
        styleId: 'monospace',
        effectId: 'cyber-neon',
        fontId: 'mono',
      },
      intentionNote: fr
        ? 'Système technique sombre orienté interfaces, code et médias numériques.'
        : 'Technical high-contrast layout suited for software and digital interfaces.',
    },
  ];
}

export interface BuildIntelligenceReportParams {
  name: string;
  generatorId: GeneratorId;
  generatorLabel: string;
  styleLabel: string;
  effectiveLanguage: GenLanguageCode;
  interfaceLanguage: string;
  metrics: NameInsightMetrics;
  orthographicUnits: string[];
  compatibility: CategoryLanguageCompatibility;
  qualityResult: NameQualityResult;
  insight: NameInsightResult | null;
  moraUnits: string[];
  hangulSyllables: Array<{ syllable: string; parts: HangulSyllableParts }>;
  item?: Partial<GeneratedName>;
  humanNaturalness?: number;
  humanCategoryFit?: number;
  hasBatchContext: boolean;
  isCustomInput?: boolean;
  attestedOrigin: string | null;
  attestedMeaning: string | null;
}

export function buildNameIntelligenceReport(params: BuildIntelligenceReportParams): NameIntelligenceReport {
  const {
    name,
    generatorId,
    generatorLabel,
    styleLabel,
    effectiveLanguage,
    interfaceLanguage,
    metrics,
    compatibility,
    qualityResult,
    insight,
    moraUnits,
    hangulSyllables,
    item,
    humanNaturalness,
    humanCategoryFit,
    hasBatchContext,
    isCustomInput,
    attestedOrigin,
    attestedMeaning,
  } = params;

  const fr = isFrenchLocale(interfaceLanguage);
  const normalized = name.normalize('NFC').trim();
  const chars = Array.from(normalized);
  const letterChars = chars.filter((c) => /\p{L}/u.test(c));
  const totalLetters = letterChars.length;

  const isAttested = item?.isAttested === true;
  const generationMethod: NameIntelligenceReport['identification']['generationMethod'] = isCustomInput
    ? 'custom-input'
    : isAttested
      ? 'attested-dataset'
      : 'algorithmic-engine';

  const originClassification: NameOriginClassification = isCustomInput
    ? 'unverified'
    : isAttested
      ? 'source-attested'
      : humanNaturalness && humanNaturalness > 0
        ? 'native-reviewed'
        : compatibility.strategy === 'native-language' || compatibility.strategy === 'culturally-faithful'
          ? 'language-inspired'
          : 'algorithmic';

  // Script breakdown
  const scriptCounts = new Map<string, number>();
  for (const ch of letterChars) {
    const s = detectCharScript(ch);
    scriptCounts.set(s, (scriptCounts.get(s) ?? 0) + 1);
  }
  const writingSystems: ScriptBreakdownEntry[] = Array.from(scriptCounts.entries()).map(([script, count]) => ({
    script,
    isoCode: ISO_SCRIPT_CODES[script]?.iso ?? 'Zyyy',
    count,
    share: totalLetters > 0 ? Math.round((count / totalLetters) * 100) : 0,
  }));

  const hasRtl = writingSystems.some((s) => s.script === 'arabic' || s.script === 'hebrew');
  const hasLtr = writingSystems.some((s) => s.script !== 'arabic' && s.script !== 'hebrew');
  const writingDirection: 'ltr' | 'rtl' | 'mixed' = hasRtl && hasLtr ? 'mixed' : hasRtl ? 'rtl' : 'ltr';

  const primaryScriptKey = writingSystems[0]?.script ?? 'other';
  const scriptClassInfo = ISO_SCRIPT_CODES[primaryScriptKey] ?? ISO_SCRIPT_CODES.other;
  const alphabetClass = fr ? scriptClassInfo.classFr : scriptClassInfo.classEn;

  const diacriticCount = (normalized.normalize('NFD').match(/\p{M}/gu) ?? []).length;
  const separatorCount = (normalized.match(/[\s\-_'’.]/gu) ?? []).length;

  let vowelCount: number | null = null;
  let consonantCount: number | null = null;
  if (totalLetters > 0 && metrics.writingSystems.every((s) => s === 'latin')) {
    const v = letterChars.filter((c) => /^[aeiouy]$/i.test(c.normalize('NFD').replace(/\p{M}/gu, ''))).length;
    vowelCount = v;
    consonantCount = totalLetters - v;
  }

  const arabicDetails = analyzeArabicSpecifics(normalized, effectiveLanguage, interfaceLanguage);
  const japaneseDetails = analyzeJapaneseSpecifics(
    normalized,
    generatorId,
    isAttested,
    effectiveLanguage,
    interfaceLanguage
  );

  // Syllabic / Mora / Hangul segmentation
  let syllabicUnits: string[] = [];
  if (moraUnits.length > 0) {
    syllabicUnits = moraUnits;
  } else if (hangulSyllables.length > 0) {
    syllabicUnits = hangulSyllables.map((h) => h.syllable);
  } else if (metrics.writingSystems.length === 1 && metrics.writingSystems[0] === 'latin' && normalized) {
    syllabicUnits = estimateLatinSyllables(normalized);
  }
  const syllableCountEstimated = syllabicUnits.length > 0 ? syllabicUnits.length : null;

  // Indicative pronunciation assessment (honest uncertainty!)
  let pronunciationDifficulty: PronunciationDifficultyLevel = 'unknown';
  let pronunciationScore: number | null = null;
  let pronunciationStatus: ReportVerificationStatus = 'insufficient-data';
  const phoneticCharacteristics: string[] = [];

  if (!normalized || totalLetters === 0) {
    pronunciationDifficulty = 'unknown';
    pronunciationScore = null;
    pronunciationStatus = 'insufficient-data';
  } else if (arabicDetails.isArabicScript && !arabicDetails.hasHarakat) {
    pronunciationDifficulty = 'unknown';
    pronunciationScore = null;
    pronunciationStatus = 'insufficient-data';
    phoneticCharacteristics.push(
      fr
        ? 'Graphie consonantique non vocalisée : impossible d’estimer mécaniquement la prononciation exacte.'
        : 'Unvocalized Arabic script: mechanical pronunciation estimation is withheld without vowel marks.'
    );
  } else if (japaneseDetails.kanjiCount > 0) {
    pronunciationDifficulty = 'unknown';
    pronunciationScore = null;
    pronunciationStatus = 'requires-human-review';
    phoneticCharacteristics.push(
      fr
        ? 'Présence de kanji : la lecture dépend de l’usage choisi et requiert une confirmation humaine.'
        : 'Contains kanji: spoken reading depends on intended kanji reading rather than letter rules.'
    );
  } else if (metrics.writingSystems.every((s) => s === 'latin')) {
    const asciiLetters = normalized.normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z]/gi, '');
    const consonantClusterMatch = asciiLetters.match(/[^aeiouy]{3,}/gi) ?? [];
    const clusterPenalty = consonantClusterMatch.length * 14;
    const rawScore = Math.max(35, Math.min(96, 92 - clusterPenalty - (totalLetters > 18 ? 15 : 0)));
    pronunciationScore = rawScore;
    pronunciationStatus = 'estimated';
    pronunciationDifficulty = rawScore >= 78 ? 'easy' : rawScore >= 58 ? 'moderate' : 'challenging';
    if (consonantClusterMatch.length > 0) {
      phoneticCharacteristics.push(
        fr
          ? `Groupe(s) consonantique(s) dense(s) (${consonantClusterMatch.join(', ')}) pouvant demander une articulation plus appuyée.`
          : `Dense consonant cluster(s) (${consonantClusterMatch.join(', ')}) may slow rapid spoken articulation.`
      );
    } else if (metrics.latinVowelShare !== null) {
      phoneticCharacteristics.push(
        fr
          ? `Équilibre vocalique latin de ${metrics.latinVowelShare}% sur ${syllableCountEstimated ?? 1} unité(s) rythmique(s) estimée(s).`
          : `${metrics.latinVowelShare}% Latin vowel ratio across ~${syllableCountEstimated ?? 1} estimated rhythmic unit(s).`
      );
    }
  } else if (moraUnits.length > 0 || hangulSyllables.length > 0) {
    const unitCount = moraUnits.length || hangulSyllables.length;
    pronunciationScore = unitCount <= 6 ? 88 : 74;
    pronunciationStatus = 'estimated';
    pronunciationDifficulty = unitCount <= 6 ? 'easy' : 'moderate';
    phoneticCharacteristics.push(
      fr
        ? `Structure phonétique régulière en ${unitCount} unité(s) syllabique(s)/moraïque(s).`
        : `Regular phonetic cadence across ${unitCount} syllabic/moraic unit(s).`
    );
  } else {
    pronunciationDifficulty = 'unknown';
    pronunciationScore = null;
    pronunciationStatus = 'requires-human-review';
    phoneticCharacteristics.push(
      fr
        ? 'Évaluation phonétique automatique non calibrée pour ce système d’écriture ; test oral recommandé.'
        : 'Automated phonetic heuristics are not calibrated for this script; spoken human review is advised.'
    );
  }

  // Local safety + trademark screen (transparent & non-claiming)
  const semanticScreen = screenNameSemantics(normalized, effectiveLanguage, []);
  const trademarkScreen = screenTrademarkSimilarity(normalized);

  const ambiguitiesAndRisks: string[] = [];
  if (metrics.hasMixedScripts) {
    ambiguitiesAndRisks.push(
      fr
        ? 'Systèmes d’écriture mélangés : risque d’incohérence typographique ou d’homoglyphes visuels.'
        : 'Mixed writing systems detected: verify visual consistency and avoid unintended homoglyph confusion.'
    );
  }
  if (trademarkScreen.matched) {
    ambiguitiesAndRisks.push(
      fr
        ? `Proximité lexicale détectée avec une marque connue (« ${trademarkScreen.matchedTerm} ») lors du contrôle local préliminaire.`
        : `Lexical proximity detected against known mark "${trademarkScreen.matchedTerm}" in local preliminary screening.`
    );
  }
  if (semanticScreen.status === 'blocked' || semanticScreen.status === 'needs-review') {
    ambiguitiesAndRisks.push(semanticScreen.explanation);
  }
  ambiguitiesAndRisks.push(...arabicDetails.notes);

  const morphologicalNotes: string[] = [];
  if (separatorCount > 0) {
    morphologicalNotes.push(
      fr
        ? `Structure composée avec ${separatorCount} séparateur(s) (espace, tiret ou apostrophe).`
        : `Compound structure containing ${separatorCount} word/token separator(s).`
    );
  }
  if (diacriticCount > 0 && !arabicDetails.isArabicScript) {
    morphologicalNotes.push(
      fr
        ? `Contient ${diacriticCount} signe(s) diacritique(s) : vérifier la conservation dans les URL, formulaires et exports ASCII.`
        : `Includes ${diacriticCount} diacritical mark(s): verify fallback behavior in URLs, forms, and plain ASCII systems.`
    );
  }
  if (morphologicalNotes.length === 0) {
    morphologicalNotes.push(
      fr
        ? 'Graphie d’un seul tenant sans séparateur ni diacritique complexe.'
        : 'Single compact orthography without separators or multi-mark diacritics.'
    );
  }

  const transliterationNote = metrics.writingSystems.some((s) => s !== 'latin')
    ? fr
      ? 'Nom hors alphabet latin : prévoir une transcription romanisée cohérente pour les contextes internationaux.'
      : 'Non-Latin script: consider defining a consistent Latin romanization for cross-border domains or handles.'
    : effectiveLanguage !== 'en' && effectiveLanguage !== 'fr' && effectiveLanguage !== 'es' && effectiveLanguage !== 'de' && compatibility.strategy === 'phonetic-transliteration'
      ? fr
        ? 'Adapté par translittération vers l’alphabet de travail ; vérifier l’orthographe naturelle dans la langue cible.'
        : 'Adapted via transliteration; verify preferred spelling conventions in the target language.'
      : null;

  const readabilitySummary =
    qualityResult.dimensions.readability.score !== null && qualityResult.dimensions.readability.score >= 85
      ? fr
        ? `Longueur compacte (${totalLetters} lettres) offrant une lecture visuelle rapide.`
        : `Compact length (${totalLetters} letters) supporting quick visual scanning.`
      : fr
        ? `Format de ${totalLetters} lettres : vérifiez l’encombrement sur mobile, cartes et en-têtes.`
        : `${totalLetters}-letter span: confirm visual wrapping across narrow mobile cards and headers.`;

  const conventionCompatibility = getUnifiedAnalysisLabels(interfaceLanguage).strategies[compatibility.strategy];

  // Build 10 Quality Criteria cleanly (never inventing unmeasured scores!)
  const scriptDim = qualityResult.dimensions.scriptIntegrity;
  const hygieneDim = qualityResult.dimensions.textHygiene;
  const readDim = qualityResult.dimensions.readability;
  const distDim = qualityResult.dimensions.distinctiveness;

  const memorabilityScore =
    totalLetters === 0
      ? null
      : Math.max(
          25,
          Math.min(
            94,
            100 -
              (totalLetters > 14 ? (totalLetters - 14) * 4 : totalLetters < 3 ? 25 : 0) -
              metrics.digitCount * 8 -
              metrics.symbolCount * 10 -
              metrics.repeatedCharacterCount * 6
          )
        );

  const brandPotentialScore =
    totalLetters === 0
      ? null
      : Math.max(
          20,
          Math.min(
            90,
            (totalLetters >= 4 && totalLetters <= 12 ? 86 : totalLetters <= 18 ? 72 : 52) -
              (trademarkScreen.matched ? 45 : 0) -
              (metrics.symbolCount > 0 ? 18 : 0) -
              (metrics.hasMixedScripts ? 18 : 0)
          )
        );

  const culturalScore: number | null = trademarkScreen.matched
    ? 35
    : metrics.hasMixedScripts
      ? 65
      : null;

  const naturalnessScore =
    humanNaturalness && humanNaturalness > 0
      ? Math.min(100, Math.max(20, humanNaturalness * 20))
      : isAttested
        ? 90
        : null;

  const categoryFitScore =
    humanCategoryFit && humanCategoryFit > 0
      ? Math.min(100, Math.max(20, humanCategoryFit * 20))
      : null;

  const criteria: QualityCriterionAssessment[] = [
    {
      key: 'scriptIntegrity',
      score: scriptDim.score,
      maxScore: 100,
      method: 'automatic-rule',
      verificationStatus:
        scriptDim.score === null
          ? 'insufficient-data'
          : scriptDim.score === 100
            ? 'automatically-verified'
            : 'automatically-evaluated',
      measurable: scriptDim.score !== null,
      explanation:
        scriptDim.score === 100
          ? fr
            ? 'Tous les caractères détectés correspondent à l’écriture attendue.'
            : 'All observed letters align with the expected writing system.'
          : fr
            ? 'Écart d’écriture ou translittération détectée par rapport à la langue cible.'
            : 'Script deviation or transliteration detected relative to the target language.',
      warnings: scriptDim.score !== null && scriptDim.score < 100 ? [conventionCompatibility] : [],
    },
    {
      key: 'textHygiene',
      score: hygieneDim.score,
      maxScore: 100,
      method: 'automatic-rule',
      verificationStatus: hygieneDim.score === 100 ? 'automatically-verified' : 'automatically-evaluated',
      measurable: true,
      explanation:
        hygieneDim.score === 100
          ? fr
            ? 'Aucun caractère de contrôle, marqueur technique ou défaut Unicode détecté.'
            : 'No control characters, broken UTF-16 sequences, or template leaks detected.'
          : fr
            ? 'Des anomalies techniques ou répétitions excessives ont pénalisé l’hygiène du texte.'
            : 'Technical text anomalies or excessive character runs reduced hygiene.',
      warnings: [],
    },
    {
      key: 'pronunciation',
      score: pronunciationScore,
      maxScore: 100,
      method: pronunciationScore !== null ? 'structural-estimate' : 'unmeasured',
      verificationStatus: pronunciationStatus,
      measurable: pronunciationScore !== null,
      explanation:
        pronunciationScore !== null
          ? fr
            ? 'Estimation structurelle basée sur l’alternance voyelles/consonnes ou mores (à confirmer à l’oral).'
            : 'Structural estimate derived from vowel/consonant cadence or moraic rhythm (verify spoken aloud).'
          : fr
            ? 'Impossible à estimer de façon fiable sans voyelles explicites ou lecture native.'
            : 'Cannot be estimated reliably without explicit vowel marks or native lexical context.',
      warnings: phoneticCharacteristics,
    },
    {
      key: 'readability',
      score: readDim.score,
      maxScore: 100,
      method: 'automatic-rule',
      verificationStatus: 'automatically-evaluated',
      measurable: true,
      explanation: readabilitySummary,
      warnings: totalLetters > 24 ? [fr ? 'Nom long à tester dans des espaces réduits.' : 'Extended character length; verify UI truncation.'] : [],
    },
    {
      key: 'memorability',
      score: memorabilityScore,
      maxScore: 100,
      method: memorabilityScore !== null ? 'structural-estimate' : 'unmeasured',
      verificationStatus: memorabilityScore !== null ? 'estimated' : 'insufficient-data',
      measurable: memorabilityScore !== null,
      explanation:
        fr
          ? 'Estimation basée uniquement sur la compacité, l’absence de chiffres/symboles parasites et la structure visuelle.'
          : 'Heuristic estimate based purely on compactness, low symbol noise, and structural clarity — not recall testing.',
      warnings: [],
    },
    {
      key: 'distinctiveness',
      score: distDim.score,
      maxScore: 100,
      method: hasBatchContext && distDim.score !== null ? 'batch-comparison' : 'unmeasured',
      verificationStatus:
        distDim.score !== null ? 'automatically-evaluated' : 'insufficient-data',
      measurable: distDim.score !== null,
      explanation:
        distDim.score !== null
          ? fr
            ? 'Comparé aux autres propositions du lot courant (aucune vérification web/registre externe).'
            : 'Compared strictly against peer names in the current batch (not an external uniqueness search).'
          : fr
            ? 'Aucun lot comparatif fourni pour mesurer l’unicité relative.'
            : 'Requires peer candidates in a batch to calculate relative distinctiveness.',
      warnings: [],
    },
    {
      key: 'categoryFit',
      score: categoryFitScore,
      maxScore: 100,
      method: categoryFitScore !== null ? 'human-rating' : 'unmeasured',
      verificationStatus:
        categoryFitScore !== null ? 'automatically-evaluated' : 'requires-human-review',
      measurable: categoryFitScore !== null,
      explanation:
        categoryFitScore !== null
          ? fr
            ? 'Score issu de votre évaluation manuelle d’adéquation.'
            : 'Derived directly from your manual category fit rating.'
          : fr
            ? 'La pertinence éditoriale pour « ' + generatorLabel + ' » dépend de votre briefing et reste en attente d’évaluation humaine.'
            : `Alignment with "${generatorLabel}" depends on your project brief and remains pending human judgment.`,
      warnings: [],
    },
    {
      key: 'naturalness',
      score: naturalnessScore,
      maxScore: 100,
      method: humanNaturalness && humanNaturalness > 0 ? 'human-rating' : isAttested ? 'automatic-rule' : 'unmeasured',
      verificationStatus:
        humanNaturalness && humanNaturalness > 0
          ? 'automatically-evaluated'
          : isAttested
            ? 'automatically-verified'
            : 'native-review-pending',
      measurable: naturalnessScore !== null,
      explanation:
        humanNaturalness && humanNaturalness > 0
          ? fr
            ? `Alimenté par votre note manuelle (${humanNaturalness}/5).`
            : `Reflects your manual evaluation rating (${humanNaturalness}/5).`
          : isAttested
            ? fr
              ? 'Prénom attesté issu d’une base documentée ; vérifier toutefois le registre d’usage souhaité.'
              : 'Attested personal name from reference corpus; still verify regional usage tone.'
            : fr
              ? 'Aucun validateur hors-ligne ne peut certifier la naturalité idiomatique : avis d’un locuteur natif requis.'
              : 'Offline software cannot certify native idiomaticity; review with a fluent speaker is pending.',
      warnings: [],
    },
    {
      key: 'culturalSuitability',
      score: culturalScore,
      maxScore: 100,
      method: trademarkScreen.matched || metrics.hasMixedScripts ? 'safety-screen' : 'unmeasured',
      verificationStatus:
        trademarkScreen.matched || metrics.hasMixedScripts ? 'requires-human-review' : 'native-review-pending',
      measurable: culturalScore !== null,
      explanation: trademarkScreen.matched
        ? fr
          ? `Similitude détectée avec une marque connue (« ${trademarkScreen.matchedTerm} »). Vérification culturelle et juridique indispensable.`
          : `Resembles known mark "${trademarkScreen.matchedTerm}" in local screen. Cultural and legal clearance required.`
        : fr
          ? 'Aucun conflit détecté dans la liste locale limitée ; la sensibilité culturelle réelle exige une revue humaine native.'
          : 'No conflict found in the limited local risk list; real cultural resonance and slang checks remain pending native review.',
      warnings: ambiguitiesAndRisks,
    },
    {
      key: 'brandPotential',
      score: brandPotentialScore,
      maxScore: 100,
      method: brandPotentialScore !== null ? 'structural-estimate' : 'unmeasured',
      verificationStatus: brandPotentialScore !== null ? 'estimated' : 'not-verified',
      measurable: brandPotentialScore !== null,
      explanation:
        fr
          ? 'Potentiel structurel de marque (portabilité texte, longueur, absence d’ambiguïté de marque évidente). Ne remplace aucune recherche INPI/EUIPO/USPTO ni disponibilité de domaine.'
          : 'Structural brand portability estimate (length, typography cleanliness, basic local mark check). Does NOT verify domain or official trademark availability.',
      warnings: trademarkScreen.matched ? [trademarkScreen.disclaimer] : [],
    },
  ];

  const measuredCount = criteria.filter((c) => c.score !== null && c.verificationStatus !== 'estimated').length;
  const estimatedCount = criteria.filter((c) => c.verificationStatus === 'estimated').length;
  const pendingReviewCount = criteria.filter((c) => c.score === null || c.verificationStatus === 'requires-human-review' || c.verificationStatus === 'native-review-pending').length;

  const overallVerificationStatus: ReportVerificationStatus = isAttested
    ? 'automatically-verified'
    : pendingReviewCount > 0
      ? 'requires-human-review'
      : 'automatically-evaluated';

  const labelTargetLanguage = formatTargetLanguageName(effectiveLanguage, interfaceLanguage);

  // Creative & Semantic enrichment
  const vd = insight?.visualDirection;
  const personalityTraits: BrandPersonalityTrait[] = vd?.personality ?? ['structured', 'professional'];
  const soundIdentityNote =
    pronunciationDifficulty === 'easy'
      ? fr
        ? `Lecture créative : cadence concise et fluide qui peut évoquer clarté et accessibilité dans un univers « ${generatorLabel} ».`
        : `Creative impression: crisp, approachable cadence suited for clear recall within "${generatorLabel}".`
      : fr
        ? `Lecture créative : sonorité plus singulière et marquée ; l’impression exacte dépend de la prononciation choisie dans votre contexte.`
        : `Creative impression: distinctive cadence whose exact tone depends on spoken delivery in your target context.`;

  const categoryWeaknesses: string[] = [];
  if (totalLetters > 18) {
    categoryWeaknesses.push(
      fr
        ? 'Format relativement long pour des logos carrés, pseudos courts ou badges compacts.'
        : 'Relatively long for compact badges, app icons, or short handle limits.'
    );
  }
  if (metrics.hasMixedScripts) {
    categoryWeaknesses.push(
      fr
        ? 'Mélange de systèmes d’écriture pouvant compliquer la saisie clavier sur certains appareils.'
        : 'Mixed scripts may create keyboard input friction across different locales.'
    );
  }
  if (trademarkScreen.matched) {
    categoryWeaknesses.push(
      fr
        ? `Risque de confusion commerciale avec « ${trademarkScreen.matchedTerm} ».`
        : `Potential confusion with known trademark "${trademarkScreen.matchedTerm}".`
    );
  }

  const categoryPositives: string[] = [
    fr
      ? `Aligné sur la stylistique « ${styleLabel} » de la catégorie ${generatorLabel}.`
      : `Stylistically aligned with "${styleLabel}" under ${generatorLabel}.`,
  ];
  if (qualityResult.dimensions.textHygiene.score === 100) {
    categoryPositives.push(
      fr
        ? 'Chaîne Unicode propre et prête pour le copier-coller multi-plateformes.'
        : 'Clean Unicode encoding suitable for cross-platform copy and export.'
    );
  }
  if (isAttested && attestedOrigin) {
    categoryPositives.push(attestedOrigin);
  }

  const colorIntentions: Record<VisualBrandColorRole, string> = {
    primary: fr ? 'Ancrage principal des titres, logotypes et éléments clés' : 'Primary anchor for wordmarks, headlines, and core framing',
    secondary: fr ? 'Soutien graphique pour sous-titres et contrastes doux' : 'Supporting tone for secondary sections and visual depth',
    surface: fr ? 'Arrière-plan garantissant le contraste du nom affiché' : 'Canvas surface ensuring accessible foreground legibility',
    accent: fr ? 'Touches d’intention pour repères actifs et détails visuels' : 'Focused highlight tone for interactive cues and emblems',
  };

  const baseVariations = insight ? insight.variations.map((v) => v.name) : [];
  const categorizedVariations = buildCategorizedVariations(normalized, baseVariations, metrics);
  const presets = insight ? buildVisualPresets(insight, interfaceLanguage) : [];
  const extensions = insight ? buildVisualExtensions(normalized, generatorId) : [];
  const recommendedTypography = getRecommendedFontsForScripts(
    writingSystems.map((w) => w.script),
    interfaceLanguage
  );

  // Decision Support Recommendations (Section 06)
  const strengths: string[] = [...categoryPositives];
  if (pronunciationDifficulty === 'easy') {
    strengths.push(
      fr
        ? 'Structure phonétique estimée accessible à première lecture.'
        : 'Estimated spoken cadence appears straightforward at first glance.'
    );
  }
  if (distDim.score === 100) {
    strengths.push(
      fr
        ? 'Distinctif par rapport aux autres noms générés dans ce lot.'
        : 'Unique within the current generated candidate batch.'
    );
  }

  const weaknesses: string[] = [...categoryWeaknesses];
  if (arabicDetails.isArabicScript && !arabicDetails.hasHarakat) {
    weaknesses.push(
      fr
        ? 'Sans harakat, plusieurs lectures vocaliques peuvent exister.'
        : 'Unvocalized Arabic spelling allows multiple possible short-vowel readings.'
    );
  }
  if (japaneseDetails.kanjiCount > 0) {
    weaknesses.push(
      fr
        ? 'La lecture des kanji n’est pas univoque sans furigana.'
        : 'Kanji pronunciation is not self-evident without furigana annotation.'
    );
  }

  const improvementSuggestions: string[] = [];
  if (totalLetters > 16 && categorizedVariations.short[0]) {
    improvementSuggestions.push(
      fr
        ? `Tester une version raccourcie comme « ${categorizedVariations.short[0]} » pour les emplacements étroits.`
        : `Consider a compact variant such as "${categorizedVariations.short[0]}" for narrow UI spaces.`
    );
  }
  if (metrics.hasMixedScripts) {
    improvementSuggestions.push(
      fr
        ? 'Unifier le nom dans un seul système d’écriture si vous visez une lisibilité universelle.'
        : 'Consolidate characters into a single writing system if universal legibility is required.'
    );
  }
  if (arabicDetails.isArabicScript && !arabicDetails.hasHarakat) {
    improvementSuggestions.push(
      fr
        ? 'Ajouter une vocalisation indicative ou une translittération latine pour le public non arabophone.'
        : 'Pair the name with vocalized guidance or Latin romanization for non-Arabic speakers.'
    );
  }
  if (improvementSuggestions.length === 0) {
    improvementSuggestions.push(
      fr
        ? 'Tester le nom à voix haute dans une phrase réelle et sur fond clair/sombre avant validation finale.'
        : 'Test spoken rhythm in a natural sentence and verify legibility on both light and dark backgrounds.'
    );
  }

  const recommendedVariations = [
    categorizedVariations.short[0] && {
      variant: categorizedVariations.short[0],
      rationale: fr ? 'Option compacte pour logos carrés ou badges mobiles' : 'Compact option for mobile headers and square marks',
    },
    categorizedVariations.username[0] && {
      variant: categorizedVariations.username[0],
      rationale: fr ? 'Format normalisé prêt pour profil social' : 'Normalized format suited for social handles',
    },
    categorizedVariations.alternativeSpelling[0] && {
      variant: categorizedVariations.alternativeSpelling[0],
      rationale: fr ? 'Variante graphique alternative pour tester la disponibilité' : 'Alternate spelling option for availability testing',
    },
  ].filter(Boolean) as Array<{ variant: string; rationale: string }>;

  const usageRecommendations = getRelevantThematicUniverses(generatorId, interfaceLanguage);

  const checklist: IntelligenceChecklistItem[] = [
    {
      id: 'script',
      labelKey: 'scriptConsistency',
      completed: scriptDim.score !== null,
      scope: 'automatic-local',
    },
    {
      id: 'hygiene',
      labelKey: 'textCleanliness',
      completed: hygieneDim.score !== null,
      scope: 'automatic-local',
    },
    {
      id: 'readability',
      labelKey: 'readabilityStructure',
      completed: readDim.score !== null,
      scope: 'automatic-local',
    },
    {
      id: 'batch',
      labelKey: 'batchComparison',
      completed: distDim.score !== null,
      scope: 'automatic-local',
    },
    {
      id: 'safety',
      labelKey: 'preliminarySafety',
      completed: true,
      scope: 'automatic-local',
    },
    {
      id: 'native',
      labelKey: 'nativeSpeakerReview',
      completed: Boolean(humanNaturalness && humanNaturalness > 0),
      scope: 'human-native',
    },
    {
      id: 'trademark',
      labelKey: 'trademarkRegistry',
      completed: false,
      scope: 'external-registry',
    },
    {
      id: 'domain',
      labelKey: 'domainAvailability',
      completed: false,
      scope: 'external-registry',
    },
  ];

  return {
    identification: {
      name: normalized,
      categoryLabel: generatorLabel,
      generatorId,
      styleLabel,
      targetLanguage: labelTargetLanguage,
      targetLanguageCode: effectiveLanguage,
      generationMethod,
      originClassification,
      overallVerificationStatus,
    },
    linguistic: {
      targetLanguageCode: effectiveLanguage,
      writingSystems,
      writingDirection,
      alphabetClass,
      graphemeCount: metrics.characterCount,
      latinLetterCount: writingSystems.find((w) => w.script === 'latin')?.count ?? 0,
      vowelCount,
      consonantCount,
      diacriticCount,
      separatorCount,
      syllabicUnits,
      syllableCountEstimated,
      pronunciationDifficulty,
      pronunciationStatus,
      readabilitySummary,
      conventionCompatibility,
      phoneticCharacteristics,
      morphologicalNotes,
      transliterationNote,
      ambiguitiesAndRisks,
      arabicDetails,
      japaneseDetails,
    },
    quality: {
      criteria,
      measuredCount,
      estimatedCount,
      pendingReviewCount,
      overallCompositeNote: fr
        ? `${measuredCount} critère(s) mesuré(s) localement, ${estimatedCount} estimé(s), ${pendingReviewCount} en attente de validation humaine ou externe.`
        : `${measuredCount} locally measured criteria, ${estimatedCount} structural estimates, ${pendingReviewCount} awaiting human or external review.`,
    },
    creativeSemantic: {
      mode: isAttested && (attestedOrigin || attestedMeaning) ? 'attested' : insight?.creativeReading ? 'creative-only' : 'unavailable',
      attestedOrigin,
      attestedMeaning,
      creativeReading: insight?.creativeReading ?? null,
      soundIdentityNote,
      personalityTraits,
      thematicUniverses: getRelevantThematicUniverses(generatorId, interfaceLanguage),
      targetAudience: getRelevantAudiences(generatorId, interfaceLanguage),
      categoryFitVerdict: categoryWeaknesses.length > 0 ? 'review-needed' : 'aligned',
      categoryPositives,
      categoryWeaknesses,
      slogan: insight?.slogan ?? null,
    },
    visualIdentity: {
      enabled: Boolean(insight),
      presets,
      recommendedTypography,
      colorIntentions,
      categorizedVariations,
      extensions,
    },
    recommendations: {
      strengths: Array.from(new Set(strengths)),
      weaknesses: Array.from(new Set(weaknesses)),
      improvementSuggestions,
      recommendedVariations,
      potentialConfusions: ambiguitiesAndRisks,
      usageRecommendations,
      checklist,
    },
  };
}

export function formatReportAsText(report: NameIntelligenceReport, language: string): string {
  const labels = getNameIntelligenceLabels(language);
  const lines: string[] = [
    `========================================`,
    `${labels.reportTitle}: ${report.identification.name}`,
    `========================================`,
    `${labels.sectionTitles.s01}`,
    `- ${labels.labels.analyzedName}: ${report.identification.name}`,
    `- Category / Style: ${report.identification.categoryLabel} · ${report.identification.styleLabel}`,
    `- Target language: ${report.identification.targetLanguage} (${report.identification.targetLanguageCode})`,
    `- ${labels.labels.originClassification}: ${labels.originClassifications[report.identification.originClassification]}`,
    `- ${labels.labels.overallStatus}: ${labels.verificationStatuses[report.identification.overallVerificationStatus]}`,
    ``,
    `${labels.sectionTitles.s02}`,
    `- ${labels.labels.alphabetClass}: ${report.linguistic.alphabetClass}`,
    `- ${labels.labels.writingDirection}: ${report.linguistic.writingDirection.toUpperCase()}`,
    `- ${labels.labels.pronunciationDifficulty}: ${labels.pronunciationLevels[report.linguistic.pronunciationDifficulty]} (${labels.verificationStatuses[report.linguistic.pronunciationStatus]})`,
    `- Scripts: ${report.linguistic.writingSystems.map((s) => `${s.script} [${s.isoCode}] ${s.share}%`).join(', ') || '—'}`,
    ...report.linguistic.ambiguitiesAndRisks.map((r) => `- Note: ${r}`),
    ``,
    `${labels.sectionTitles.s03}`,
    ...report.quality.criteria.map(
      (c) =>
        `- ${labels.criteriaLabels[c.key]}: ${c.score !== null ? `${c.score}/100` : '—'} [${labels.verificationStatuses[c.verificationStatus]}] — ${c.explanation}`
    ),
    ``,
    `${labels.sectionTitles.s04}`,
    ...(report.creativeSemantic.attestedOrigin ? [`- Origin: ${report.creativeSemantic.attestedOrigin}`] : []),
    ...(report.creativeSemantic.attestedMeaning ? [`- Meaning: ${report.creativeSemantic.attestedMeaning}`] : []),
    ...(report.creativeSemantic.creativeReading ? [`- Reading: ${report.creativeSemantic.creativeReading}`] : []),
    ...(report.creativeSemantic.slogan ? [`- Slogan: ${report.creativeSemantic.slogan}`] : []),
    ``,
    `${labels.sectionTitles.s06}`,
    ...report.recommendations.strengths.map((s) => `+ ${s}`),
    ...report.recommendations.weaknesses.map((w) => `! ${w}`),
    ...report.recommendations.improvementSuggestions.map((i) => `-> ${i}`),
    ``,
    `${labels.labels.verificationChecklist}:`,
    ...report.recommendations.checklist.map(
      (item) =>
        `[${item.completed ? 'x' : ' '}] ${labels.labels.checklistItems[item.labelKey]}`
    ),
  ];
  return lines.join('\n');
}

export function formatReportAsJson(report: NameIntelligenceReport): string {
  return JSON.stringify(
    {
      schema: 'nameforge-intelligence-report/v1',
      generatedAt: new Date().toISOString(),
      disclaimer:
        'Automated local evaluation only. Does not replace native linguistic review, trademark search, or domain availability checks.',
      report,
    },
    null,
    2
  );
}

export interface CompareCandidateInput {
  name: string;
  generatorId: GeneratorId;
  style: string;
  rating?: number;
  note?: string;
  saved?: boolean;
  source?: ComparisonCandidateSource;
  collectionId?: string;
  collectionName?: string;
  generationLanguage?: GenLanguageCode;
  item?: Partial<GeneratedName>;
}

export function compareNamesIntelligently(
  candidates: CompareCandidateInput[],
  analyzeEntry: (candidate: CompareCandidateInput, allNames: string[]) => NameIntelligenceReport,
  interfaceLanguage: string
): NameComparisonReport {
  const allNames = candidates.map((c) => c.name);
  const fr = isFrenchLocale(interfaceLanguage);
  const enh = getEnhancementsLabels(interfaceLanguage);

  const entries: NameComparisonEntry[] = candidates.map((c) => {
    const report = analyzeEntry(c, allNames);
    const measurableStrict = report.quality.criteria.filter(
      (q) => q.score !== null && q.verificationStatus !== 'estimated'
    );
    const estimatedList = report.quality.criteria.filter(
      (q) => q.score !== null && q.verificationStatus === 'estimated'
    );

    const measuredAverage =
      measurableStrict.length > 0
        ? Math.round(measurableStrict.reduce((sum, x) => sum + (x.score ?? 0), 0) / measurableStrict.length)
        : null;
    const estimatedAverage =
      estimatedList.length > 0
        ? Math.round(estimatedList.reduce((sum, x) => sum + (x.score ?? 0), 0) / estimatedList.length)
        : null;

    const inferredSource: ComparisonCandidateSource =
      c.source || (c.collectionId ? 'collection' : c.saved ? 'saved' : 'generated');

    return {
      name: c.name,
      generatorId: c.generatorId,
      style: c.style,
      rating: c.rating ?? 0,
      note: c.note ?? '',
      saved: Boolean(c.saved),
      source: inferredSource,
      collectionId: c.collectionId,
      collectionName: c.collectionName,
      targetLanguageLabel: report.identification.targetLanguage,
      report,
      measuredAverage,
      estimatedAverage,
      letterCount: report.linguistic.graphemeCount,
    };
  });

  if (entries.length === 0) {
    return {
      entries: [],
      bestReadabilityNames: [],
      mostCompactNames: [],
      highestRatedNames: [],
      summaryObservations: [],
      verificationCaveat: getNameIntelligenceLabels(interfaceLanguage).comparison.noFakeWinnerNote,
      crossContextWarning: null,
    };
  }

  const readScores = entries.map(
    (e) => e.report.quality.criteria.find((q) => q.key === 'readability')?.score ?? null
  );
  const validReadScores = readScores.filter((s): s is number => s !== null);
  const maxRead = validReadScores.length > 0 ? Math.max(...validReadScores) : null;
  const bestReadabilityNames =
    maxRead !== null
      ? entries.filter((_, idx) => readScores[idx] === maxRead).map((e) => e.name)
      : [];

  const minLen = Math.min(...entries.map((e) => Math.max(1, e.letterCount)));
  const mostCompactNames = entries
    .filter((e) => Math.max(1, e.letterCount) === minLen)
    .map((e) => e.name);

  const maxRating = Math.max(...entries.map((e) => e.rating));
  const highestRatedNames = maxRating > 0 ? entries.filter((e) => e.rating === maxRating).map((e) => e.name) : [];

  const distinctCategories = Array.from(
    new Set(entries.map((e) => getLocalizedGeneratorShortTitle(e.generatorId, interfaceLanguage, e.generatorId)))
  );
  const distinctLanguages = Array.from(
    new Set(entries.map((e) => e.targetLanguageLabel || e.report.identification.targetLanguage))
  );
  const distinctScripts = Array.from(
    new Set(entries.map((e) => e.report.linguistic.writingSystems[0]?.isoCode || 'Zyyy'))
  );

  let crossContextWarning: string | null = null;
  if (distinctCategories.length > 1 || distinctLanguages.length > 1 || distinctScripts.length > 1) {
    const detailParts: string[] = [];
    if (distinctCategories.length > 1) {
      detailParts.push(`${enh.compare.categoryMetaLabel}: ${distinctCategories.join(' / ')}`);
    }
    if (distinctLanguages.length > 1) {
      detailParts.push(`${enh.compare.languageMetaLabel}: ${distinctLanguages.join(' / ')}`);
    } else if (distinctScripts.length > 1) {
      detailParts.push(`Scripts: ${distinctScripts.join(' / ')}`);
    }
    crossContextWarning = enh.compare.crossContextNotice.replace('{details}', detailParts.join(' · '));
  }

  const summaryObservations: string[] = [];
  summaryObservations.push(
    fr
      ? `Longueur comprise entre ${minLen} et ${Math.max(...entries.map((e) => e.letterCount))} lettres.`
      : `Letter lengths span from ${minLen} to ${Math.max(...entries.map((e) => e.letterCount))} characters.`
  );
  if (entries.some((e) => e.report.quality.criteria.some((c) => c.warnings.length > 0))) {
    summaryObservations.push(
      fr
        ? 'Au moins une option présente un avertissement linguistique ou de similitude à vérifier avant choix final.'
        : 'At least one option carries a script, pronunciation, or mark-proximity note worth reviewing.'
    );
  }

  return {
    entries,
    bestReadabilityNames,
    mostCompactNames,
    highestRatedNames,
    summaryObservations,
    verificationCaveat: getNameIntelligenceLabels(interfaceLanguage).comparison.noFakeWinnerNote,
    crossContextWarning,
  };
}

export function formatComparisonAsText(report: NameComparisonReport, interfaceLanguage: string): string {
  const intel = getNameIntelligenceLabels(interfaceLanguage);
  const enh = getEnhancementsLabels(interfaceLanguage);
  const lines: string[] = [
    `========================================`,
    `NameForge — ${intel.comparison.tableCriterion} (${report.entries.length})`,
    `========================================`,
    ``,
  ];

  for (const entry of report.entries) {
    const sourceLabel =
      entry.source === 'collection'
        ? `${enh.compare.sourceCollection}${entry.collectionName ? ` (${entry.collectionName})` : ''}`
        : entry.source === 'saved'
          ? enh.compare.sourceSaved
          : enh.compare.sourceGenerated;
    const catLabel = getLocalizedGeneratorShortTitle(entry.generatorId, interfaceLanguage, entry.generatorId);
    lines.push(
      `• ${entry.name}`,
      `  ${sourceLabel} | ${enh.compare.categoryMetaLabel}: ${catLabel} | ${enh.compare.languageMetaLabel}: ${entry.targetLanguageLabel || entry.report.identification.targetLanguage}`,
      `  ${intel.comparison.lengthMetric}: ${entry.letterCount} | ${intel.comparison.measuredAvgMetric}: ${entry.measuredAverage !== null ? `${entry.measuredAverage}/100` : enh.compare.notEvaluated}`,
      ...entry.report.quality.criteria.map(
        (c) =>
          `  - ${intel.criteriaLabels[c.key]}: ${c.score !== null ? `${c.score}/100` : enh.compare.notEvaluated} [${intel.verificationStatuses[c.verificationStatus]}]`
      ),
      ``
    );
  }

  if (report.crossContextWarning) {
    lines.push(`${enh.compare.crossContextTitle}:`, report.crossContextWarning, ``);
  }

  lines.push(
    `${intel.comparison.summaryTitle}:`,
    ...report.summaryObservations.map((obs) => `- ${obs}`),
    `! ${report.verificationCaveat}`
  );

  return lines.join('\n');
}

export function formatComparisonAsJson(report: NameComparisonReport): string {
  return JSON.stringify(
    {
      schema: 'nameforge-comparison-report/v1',
      generatedAt: new Date().toISOString(),
      crossContextWarning: report.crossContextWarning,
      verificationCaveat: report.verificationCaveat,
      entries: report.entries.map((e) => ({
        name: e.name,
        source: e.source,
        collectionId: e.collectionId,
        collectionName: e.collectionName,
        generatorId: e.generatorId,
        style: e.style,
        targetLanguage: e.targetLanguageLabel || e.report.identification.targetLanguage,
        targetLanguageCode: e.report.identification.targetLanguageCode,
        rating: e.rating,
        note: e.note,
        letterCount: e.letterCount,
        measuredAverage: e.measuredAverage,
        estimatedAverage: e.estimatedAverage,
        overallVerificationStatus: e.report.identification.overallVerificationStatus,
        criteria: e.report.quality.criteria.map((c) => ({
          key: c.key,
          score: c.score,
          verificationStatus: c.verificationStatus,
          measurable: c.measurable,
        })),
      })),
    },
    null,
    2
  );
}
