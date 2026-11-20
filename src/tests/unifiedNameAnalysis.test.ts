import assert from 'node:assert/strict';
import { FULL_TRANSLATION_LANGUAGES } from '../i18n';
import { getUnifiedAnalysisLabels } from '../i18n/unifiedAnalysisLabels';
import { analyzeNameCompletely } from '../services/unifiedNameAnalysis';

// 1. Creative mode (Brand): never invents historical etymology, includes visual & slogan
const brandAnalysis = analyzeNameCompletely({
  name: 'Asterion',
  generatorId: 'brand',
  style: 'modern',
  interfaceLanguage: 'en',
  generationLanguage: 'en',
  batchNames: ['Asterion', 'Velora'],
});

assert.equal(brandAnalysis.identity.status, 'ready');
assert.equal(brandAnalysis.identity.metrics.characterCount, 8);
assert.equal(brandAnalysis.semantic.status, 'partial');
assert.equal(brandAnalysis.semantic.etymologyMode, 'creative-only');
assert.equal(brandAnalysis.semantic.origin, null, 'Must never fabricate etymological origin for creative names');
assert.equal(brandAnalysis.semantic.meaning, null, 'Must never fabricate dictionary meaning for creative names');
assert.ok(brandAnalysis.semantic.creativeReading?.includes('Asterion'));
assert.ok(brandAnalysis.semantic.slogan?.includes('Asterion'));
assert.equal(brandAnalysis.visual.status, 'ready');
assert.ok(brandAnalysis.visual.insight);
assert.equal(brandAnalysis.quality.result.dimensions.distinctiveness.status, 'measured');
assert.equal(brandAnalysis.quality.result.dimensions.distinctiveness.score, 100);
assert.equal(brandAnalysis.quality.result.dimensions.naturalness.status, 'pending');

// 2. Human rating updates human naturalness and coverage dynamically
const ratedBrand = analyzeNameCompletely({
  name: 'Asterion',
  generatorId: 'brand',
  style: 'modern',
  interfaceLanguage: 'fr',
  generationLanguage: 'fr',
  batchNames: ['Asterion', 'Velora'],
  humanNaturalness: 4,
});
assert.equal(ratedBrand.quality.result.dimensions.naturalness.status, 'measured');
assert.equal(ratedBrand.quality.result.dimensions.naturalness.score, 80);
assert.ok(ratedBrand.quality.result.coverage > brandAnalysis.quality.result.coverage);

// 3. Attested baby name: exposes verified origin, meaning, variants
const attestedAnalysis = analyzeNameCompletely({
  name: 'Elena',
  generatorId: 'baby_name',
  style: 'classic',
  interfaceLanguage: 'en',
  generationLanguage: 'en',
  item: {
    name: 'Elena',
    generatorId: 'baby_name',
    style: 'classic',
    isAttested: true,
    origin: 'Greek',
    meaning: 'Bright shining light',
    variants: ['Helena', 'Hélène'],
  },
});
assert.equal(attestedAnalysis.semantic.status, 'ready');
assert.equal(attestedAnalysis.semantic.etymologyMode, 'attested');
assert.ok(attestedAnalysis.semantic.origin);
assert.ok(attestedAnalysis.semantic.meaning);
assert.deepEqual(attestedAnalysis.semantic.variants, ['Helena', 'Hélène']);

// 4. Excluded tactical / weapon categories degrade gracefully without failing structural or quality sections
for (const excludedId of ['weapon', 'plasma_weapon', 'tactical_operation', 'special_attack'] as const) {
  const excludedAnalysis = analyzeNameCompletely({
    name: 'Aegis Striker',
    generatorId: excludedId,
    style: 'tactical',
    interfaceLanguage: 'en',
    generationLanguage: 'en',
  });
  assert.equal(excludedAnalysis.identity.status, 'ready');
  assert.equal(excludedAnalysis.visual.status, 'unavailable');
  assert.equal(excludedAnalysis.visual.insight, null);
  assert.equal(excludedAnalysis.semantic.etymologyMode, 'unavailable');
  assert.ok(excludedAnalysis.quality.result.score !== null);
}

// 5. Japanese mora and Korean Hangul unit decomposition
const jaAnalysis = analyzeNameCompletely({
  name: 'しゃら',
  generatorId: 'anime_hero',
  style: 'anime',
  interfaceLanguage: 'ja',
  generationLanguage: 'ja',
});
assert.deepEqual(jaAnalysis.linguistic.moraUnits, ['しゃ', 'ら']);

const koAnalysis = analyzeNameCompletely({
  name: '하늘',
  generatorId: 'fantasy',
  style: 'fantasy',
  interfaceLanguage: 'ko',
  generationLanguage: 'ko',
});
assert.equal(koAnalysis.linguistic.hangulSyllables.length, 2);
assert.equal(koAnalysis.linguistic.hangulSyllables[0].syllable, '하');

// 6. Never emits banned subjective claims
for (const result of [brandAnalysis, ratedBrand, attestedAnalysis]) {
  const combined = [...result.recommendations.highlights, ...result.recommendations.watchouts].join(' ');
  assert.ok(!combined.includes('Memorable sound'));
  assert.ok(!combined.includes('Repeated adjacent letters may affect pronunciation'));
}

// 7. All 28 UI languages supported cleanly
for (const lang of FULL_TRANSLATION_LANGUAGES) {
  const labels = getUnifiedAnalysisLabels(lang);
  assert.ok(labels.sheetTitle, `Missing sheetTitle for ${lang}`);
  assert.ok(labels.triggerLabel, `Missing triggerLabel for ${lang}`);
  assert.ok(labels.sections.identityStructure, `Missing identityStructure for ${lang}`);
  assert.ok(labels.sections.qualityEvaluation, `Missing qualityEvaluation for ${lang}`);
  assert.ok(labels.statusLabels.ready && labels.statusLabels.unavailable, `Missing statusLabels for ${lang}`);
}

console.log('Unified Name Analysis tests passed across creative, attested, excluded, CJK segmentation, and 28 languages.');
