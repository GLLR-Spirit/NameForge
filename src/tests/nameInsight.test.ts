import assert from 'node:assert/strict';
import { createNameInsight, getContrastTextColor, isNameInsightSupported } from '../services/nameInsightService';
import { resolveNameInsightCategory } from '../data/nameInsightData';
import { ALL_GENERATORS_LIST } from '../data/generators';
import { FULL_TRANSLATION_LANGUAGES } from '../i18n';
import { getNameDetailsLabels } from '../i18n/nameDetails';
import { getNameInsightSectionLabels } from '../i18n/nameInsightLabels';
import { UNICODE_STYLES, VISUAL_EFFECTS } from '../services/textStyler';

const base = {
  name: 'Asterion',
  generatorId: 'brand' as const,
  style: 'modern',
  description: 'A concise creative description.',
  language: 'en'
};

const first = createNameInsight(base);
const second = createNameInsight(base);
assert.ok(first);
assert.deepEqual(first, second, 'Insight output must be deterministic');
assert.equal(first?.isCreativeOnly, true);
assert.equal(first?.category, 'brand');
assert.equal(first?.palette.length, 3);
assert.equal(first?.visualDirection.colors.length, 4, 'Visual direction must expose a 4-color brand palette');
assert.deepEqual(
  first?.visualDirection.colors.map((c) => c.role),
  ['primary', 'secondary', 'surface', 'accent']
);
for (const swatch of first.visualDirection.colors) {
  assert.match(swatch.hex, /^#[0-9A-F]{6}$/i, `Expected hex color, got ${swatch.hex}`);
  assert.equal(swatch.contrastInk, getContrastTextColor(swatch.hex));
}
assert.ok(first.alternatives.length >= 3 && first.alternatives.length <= 5, 'Should expose 3-5 variations');
assert.deepEqual(first.alternatives, first.variations.map((v) => v.name), 'alternatives should match variation names');
assert.equal(new Set(first.alternatives.map((v) => v.toLowerCase())).size, first.alternatives.length, 'Variations must be unique');
assert.equal(first?.slogan, 'Make your mark with Asterion.');
assert.ok(first?.creativeReading.includes('Asterion'));
assert.ok(first?.creativeReading.includes('8-letter form'), 'Category reading should explain the name structure');
assert.equal(first?.metrics.characterCount, 8);
assert.equal(first?.metrics.wordCount, 1);
assert.equal(first?.metrics.latinVowelShare, 50, 'Asterion has four Latin vowels across eight letters');
assert.equal(first?.metrics.repeatedCharacterCount, 0);
assert.equal(first?.metrics.digitCount, 0);
assert.equal(first?.metrics.symbolCount, 0);
assert.equal(first?.metrics.uppercaseCount, 1);
assert.equal(first?.metrics.hasMixedScripts, false);

// Different categories & brand archetypes yield distinct visual identities
const techInsight = createNameInsight({ ...base, name: 'Veridian', generatorId: 'fintech_app' });
const luxuryInsight = createNameInsight({ ...base, name: 'Veridian', generatorId: 'luxury_perfume' });
const bakeryInsight = createNameInsight({ ...base, name: 'Veridian', generatorId: 'artisanal_bakery' });
const cyberInsight = createNameInsight({ ...base, name: 'Veridian', generatorId: 'cyberpunk' });
const rpgInsight = createNameInsight({ ...base, name: 'Veridian', generatorId: 'rpg' });

assert.equal(techInsight?.visualDirection.archetype, 'modern-tech');
assert.equal(luxuryInsight?.visualDirection.archetype, 'luxury-atelier');
assert.equal(bakeryInsight?.visualDirection.archetype, 'organic-craft');
assert.equal(cyberInsight?.visualDirection.archetype, 'cyber-kinetic');
assert.equal(rpgInsight?.visualDirection.archetype, 'arcane-heritage');

assert.notDeepEqual(
  luxuryInsight?.visualDirection.colors.map((c) => c.hex),
  techInsight?.visualDirection.colors.map((c) => c.hex),
  'Luxury atelier and modern tech brands must generate distinct palettes'
);
assert.notEqual(luxuryInsight?.visualDirection.typographyMood, techInsight?.visualDirection.typographyMood);
assert.notEqual(luxuryInsight?.visualDirection.motif, techInsight?.visualDirection.motif);
assert.notDeepEqual(luxuryInsight?.visualDirection.studioMapping, techInsight?.visualDirection.studioMapping);

// Brand personality traits & Creative Studio mapping validity
const validStyleIds = new Set(UNICODE_STYLES.map((s) => s.id));
const validEffectIds = new Set(['', ...VISUAL_EFFECTS.map((e) => e.id)]);
for (const sample of [techInsight, luxuryInsight, bakeryInsight, cyberInsight, rpgInsight]) {
  assert.ok(sample);
  assert.ok(sample.visualDirection.personality.length >= 3 && sample.visualDirection.personality.length <= 4);
  assert.ok(validStyleIds.has(sample.visualDirection.studioMapping.styleId), 'Mapped styleId must exist in Creative Studio');
  assert.ok(validEffectIds.has(sample.visualDirection.studioMapping.effectId), 'Mapped effectId must exist in Creative Studio');
}

// Stem collision and repetition prevention in brand variations
const studioName = createNameInsight({ ...base, name: 'Apex Studio' });
assert.ok(studioName);
assert.ok(!studioName.alternatives.some((v) => /Studio\s+Studio/i.test(v)), 'Must not repeat Studio suffix');
assert.equal(new Set(studioName.alternatives.map((v) => v.toLowerCase())).size, studioName.alternatives.length);

const multiColliding = createNameInsight({ ...base, name: 'Pulse Labs Digital' });
assert.ok(multiColliding);
assert.ok(!multiColliding.alternatives.some((v) => v.toLowerCase().endsWith(' labs') || v.toLowerCase().endsWith(' digital')));
assert.ok(multiColliding.alternatives.length >= 3);

// RPG/character names should never receive corporate suffixes like Group or Digital
assert.ok(!rpgInsight?.variations.some((v) => ['corporate', 'digital'].includes(v.direction)));

const composedAccent = createNameInsight({ ...base, name: 'Élan' });
const decomposedAccent = createNameInsight({ ...base, name: 'E\u0301lan' });
assert.deepEqual(
  decomposedAccent,
  composedAccent,
  'Canonically equivalent Unicode spellings should produce identical insight and metrics'
);
assert.equal(decomposedAccent?.metrics.characterCount, 4, 'Combining marks must not distort the visible letter count');
assert.equal(composedAccent?.metrics.latinVowelShare, 50, 'Accented Latin vowels must count after canonical decomposition');
const nordicName = createNameInsight({ ...base, name: 'Ångström' });
assert.equal(nordicName?.metrics.characterCount, 8);
assert.equal(nordicName?.metrics.latinVowelShare, 25, 'Multiple accented Latin vowels must be counted without changing the letter denominator');
const accentedVowels = createNameInsight({ ...base, name: 'ÀÉÎÕÜ' });
assert.equal(accentedVowels?.metrics.latinVowelShare, 100, 'Accented forms of all five Latin vowels must be counted');
const accentedConsonant = createNameInsight({ ...base, name: 'Çý' });
assert.equal(accentedConsonant?.metrics.latinVowelShare, 50, 'Accented consonants must not be counted as vowels');
const paddedName = createNameInsight({ ...base, name: '  Asterion   ' });
assert.deepEqual(paddedName, first, 'Leading, trailing, and repeated whitespace should not change the normalized insight');
const repeated = createNameInsight({ ...base, name: 'Aallora' });
assert.ok((repeated?.metrics.repeatedCharacterCount ?? 0) > 0);
const turkishDotlessPair = createNameInsight({ ...base, language: 'tr', name: 'Iı' });
assert.equal(turkishDotlessPair?.metrics.repeatedCharacterCount, 1, 'Turkish case comparison should pair capital dottedness correctly for I and ı');
const turkishDottedPair = createNameInsight({ ...base, language: 'tr', name: 'İi' });
assert.equal(turkishDottedPair?.metrics.repeatedCharacterCount, 1, 'Turkish case comparison should pair İ and i');
const separatedLetters = createNameInsight({ ...base, name: 'A A' });
assert.equal(separatedLetters?.metrics.repeatedCharacterCount, 0, 'Spaces must break adjacent-letter runs');
const nonLatin = createNameInsight({ ...base, name: 'أستريون' });
assert.equal(nonLatin?.metrics.latinVowelShare, null);
assert.equal(nonLatin?.metrics.hasMixedScripts, false, 'Arabic-only names must be treated as one writing system');
assert.deepEqual(nonLatin?.metrics.writingSystems, ['arabic'], 'Arabic names should expose their detected writing system');
const devanagariConjunct = createNameInsight({ ...base, name: 'क्ष' });
assert.equal(devanagariConjunct?.metrics.characterCount, 1, 'A Devanagari conjunct should count as one visible grapheme cluster');
const hindiWord = createNameInsight({ ...base, name: 'नमस्ते' });
assert.equal(hindiWord?.metrics.characterCount, 3, 'Combining marks and conjunct sequences must not inflate Indic grapheme counts');
const japaneseWords = createNameInsight({ ...base, language: 'ja', name: '私は学生です' });
assert.equal(japaneseWords?.metrics.wordCount, 4, 'Japanese word count should use locale-aware segmentation without spaces');
assert.equal(japaneseWords?.metrics.hasMixedScripts, false, 'The conventional Han and Hiragana combination in Japanese should not be flagged as unusual mixed scripts');
assert.deepEqual(japaneseWords?.metrics.writingSystems, ['han', 'hiragana'], 'Japanese script inventory should still expose its component writing systems');
const chineseWords = createNameInsight({ ...base, language: 'zh', name: '我喜欢学习' });
assert.equal(chineseWords?.metrics.wordCount, 3, 'Chinese word count should use locale-aware segmentation without spaces');
const thaiWords = createNameInsight({ ...base, language: 'th', name: 'ฉันรักภาษาไทย' });
assert.equal(thaiWords?.metrics.wordCount, 4, 'Thai word count should use locale-aware segmentation without spaces');

const mixedScripts = createNameInsight({ ...base, name: 'طارقNova' });
assert.equal(mixedScripts?.metrics.hasMixedScripts, true, 'Mixed Arabic and Latin scripts must be detected');
assert.deepEqual(mixedScripts?.metrics.writingSystems, ['arabic', 'latin'], 'Mixed names should expose each detected writing system');
const additionalScriptCases = [
  ['Աստղ', 'armenian'],
  ['მზე', 'georgian'],
  ['ሰላም', 'ethiopic'],
  ['தமிழ்', 'tamil'],
  ['తెలుగు', 'telugu'],
  ['ਪੰਜਾਬੀ', 'gurmukhi'],
  ['ગુજરાતી', 'gujarati'],
  ['ಕನ್ನಡ', 'kannada'],
  ['മലയാളം', 'malayalam'],
  ['සිංහල', 'sinhala'],
  ['ລາວ', 'lao'],
  ['မြန်မာ', 'myanmar'],
  ['ខ្មែរ', 'khmer']
] as const;
for (const [name, script] of additionalScriptCases) {
  const result = createNameInsight({ ...base, name });
  assert.deepEqual(result?.metrics.writingSystems, [script], `Expected ${script} writing system for ${name}`);
}
const decorated = createNameInsight({ ...base, name: 'Nova-7!' });
assert.equal(decorated?.metrics.digitCount, 1);
assert.equal(decorated?.metrics.symbolCount, 2);
const categoryPalette = createNameInsight({ ...base, generatorId: 'anime_hero' });
assert.notDeepEqual(categoryPalette?.palette, first?.palette, 'Palette selection should incorporate category context');
assert.equal(createNameInsight({ ...base, name: '   ' }), null);
assert.equal(isNameInsightSupported('weapon' as never), false);
assert.equal(isNameInsightSupported('plasma_weapon' as never), false);
assert.equal(isNameInsightSupported('tactical_operation' as never), false);
assert.equal(isNameInsightSupported('special_attack' as never), false);

const categoryCases = [
  ['brand', 'brand'],
  ['character', 'anime_hero'],
  ['rpg', 'rpg'],
  ['game', 'gaming'],
  ['science-fiction', 'sci-fi'],
  ['science', 'quantum_particle'],
  ['project', 'project'],
  ['place', 'placename'],
  ['general', 'unmapped-test-generator' as never]
] as const;
for (const language of ['en', 'fr', 'ar'] as const) {
  const readings = categoryCases.map(([category, generatorId]) => {
    const result = createNameInsight({ ...base, generatorId, language, name: 'Asterion' });
    assert.equal(result?.category, category);
    assert.ok(result?.creativeReading.includes('Asterion'));
    return result?.creativeReading;
  });
  assert.equal(new Set(readings).size, categoryCases.length, `Category readings must be distinct in ${language}`);
}

const categoryPrecedenceCases = [
  ['vampire', 'character'],
  ['space_pirate', 'character'],
  ['enchanted_forest', 'rpg'],
  ['floating_skyland', 'science-fiction']
] as const;
for (const [generatorId, expectedCategory] of categoryPrecedenceCases) {
  assert.equal(
    resolveNameInsightCategory(generatorId),
    expectedCategory,
    `Expected ${generatorId} to keep its primary ${expectedCategory} category`
  );
}

const character = createNameInsight({ ...base, generatorId: 'anime_hero', description: 'A fictional hero concept.' });
assert.equal(character?.category, 'character');
const science = createNameInsight({ ...base, generatorId: 'quantum_particle', description: 'A science concept.' });
assert.equal(science?.category, 'science');

const allGeneratorIds = ALL_GENERATORS_LIST.map((generator) => generator.id);
assert.equal(allGeneratorIds.length, 234, 'Expected all 234 generator metadata entries to be represented');
for (const generator of ALL_GENERATORS_LIST) {
  const result = createNameInsight({
    name: 'SampleNova',
    generatorId: generator.id,
    style: 'test-style',
    description: generator.description
  });
  if (isNameInsightSupported(generator.id)) {
    assert.ok(result, `Insight should be available for ${generator.id}`);
    assert.notEqual(resolveNameInsightCategory(generator.id), 'general', `Generator needs a specialized category: ${generator.id}`);
  } else {
    assert.equal(result, null, `Excluded generator should not expose insight: ${generator.id}`);
  }
}

const completeLanguages = [
  'en','fr','es','de','it','pt','ar','tr','ja','ko','zh','ru','hi','nl',
  'pl','sv','vi','id','th','el','he','cs','ro','da','fi','uk','bn','nb'
] as const;
for (const language of completeLanguages) {
  assert.ok(FULL_TRANSLATION_LANGUAGES.includes(language), `Missing complete translation pack: ${language}`);
  const labels = getNameDetailsLabels(language);
  const sectionLabels = getNameInsightSectionLabels(language);
  const translatedInsight = createNameInsight({ ...base, language, name: 'TestNova' });
  assert.ok(translatedInsight?.slogan && !translatedInsight.slogan.includes('{name}'), `Missing slogan template: ${language}`);
  assert.ok(translatedInsight?.creativeReading && translatedInsight.creativeReading.includes('TestNova'), `Missing reading template: ${language}`);
  assert.ok(labels.whyFits && labels.strengths && labels.watchouts && labels.transparency, `Missing Name Insight labels: ${language}`);
  assert.ok(sectionLabels.visualDirection && sectionLabels.suggestedVariations && sectionLabels.customizeInStudio, `Missing Visual Direction labels: ${language}`);
}

const frLabels = getNameInsightSectionLabels('fr');
assert.equal(frLabels.visualDirection, 'Direction visuelle');
assert.equal(frLabels.customizeInStudio, 'Personnaliser dans l’Atelier Créatif');
assert.equal(frLabels.suggestedVariations, 'Déclinaisons de marque suggérées');

console.log('Name Insight tests passed for visual direction, palettes, context-aware variations, 234 generators, and 28 UI languages.');
