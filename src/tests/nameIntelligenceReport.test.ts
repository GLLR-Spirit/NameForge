import assert from 'node:assert/strict';
import { analyzeNameCompletely } from '../services/unifiedNameAnalysis';
import {
  compareNamesIntelligently,
  formatReportAsJson,
  formatReportAsText,
} from '../services/nameIntelligenceReport';
import { getNameIntelligenceLabels } from '../i18n/nameIntelligenceLabels';
import { FULL_TRANSLATION_LANGUAGES } from '../i18n';
import type { QualityCriterionKey } from '../types/nameInsight';

const EXPECTED_CRITERIA: QualityCriterionKey[] = [
  'scriptIntegrity',
  'textHygiene',
  'pronunciation',
  'readability',
  'memorability',
  'distinctiveness',
  'categoryFit',
  'naturalness',
  'culturalSuitability',
  'brandPotential',
];

function run() {
  // 1. Complete 10-criteria honesty & anti-fabrication on Latin attested vs language-inspired names
  const solenne = analyzeNameCompletely({
    name: 'Solenne',
    generatorId: 'french',
    style: 'classic',
    interfaceLanguage: 'en',
    generationLanguage: 'fr',
    batchNames: ['Solenne', 'Aurélien', 'Célestine', 'Vespera'],
    item: {
      isAttested: true,
      origin: 'Latin',
      meaning: 'Solemnis',
    },
  });

  const r1 = solenne.report;
  assert.equal(r1.identification.name, 'Solenne');
  assert.equal(r1.identification.originClassification, 'source-attested');
  assert.equal(r1.identification.generationMethod, 'attested-dataset');
  assert.equal(r1.quality.criteria.length, 10, 'Must always expose all 10 quality criteria');

  const algoFrench = analyzeNameCompletely({
    name: 'Aureval',
    generatorId: 'french',
    style: 'classic',
    interfaceLanguage: 'en',
    generationLanguage: 'fr',
  });
  assert.equal(algoFrench.report.identification.originClassification, 'language-inspired');
  assert.equal(algoFrench.report.identification.generationMethod, 'algorithmic-engine');

  for (const key of EXPECTED_CRITERIA) {
    assert.ok(
      r1.quality.criteria.some((c) => c.key === key),
      `Missing quality criterion ${key}`
    );
  }

  const attestedNaturalness = r1.quality.criteria.find((c) => c.key === 'naturalness')!;
  assert.equal(attestedNaturalness.score, 90, 'Attested corpus name reflects corpus verification');
  assert.equal(attestedNaturalness.verificationStatus, 'automatically-verified');

  const algoNaturalness = algoFrench.report.quality.criteria.find((c) => c.key === 'naturalness')!;
  assert.equal(algoNaturalness.score, null, 'Unrated algorithmic naturalness must never fabricate a numeric score');
  assert.equal(algoNaturalness.verificationStatus, 'native-review-pending');

  const categoryFit = r1.quality.criteria.find((c) => c.key === 'categoryFit')!;
  assert.equal(categoryFit.score, null, 'Category relevance requires human judgment');
  assert.equal(categoryFit.verificationStatus, 'requires-human-review');

  // Rated name promotes naturalness and originClassification
  const rated = analyzeNameCompletely({
    name: 'Kaelith',
    generatorId: 'fantasy',
    style: 'mythic',
    interfaceLanguage: 'en',
    humanNaturalness: 4,
  });
  assert.equal(rated.report.identification.originClassification, 'native-reviewed');
  assert.equal(
    rated.report.quality.criteria.find((c) => c.key === 'naturalness')?.score,
    80
  );
  assert.equal(
    rated.report.quality.criteria.find((c) => c.key === 'distinctiveness')?.score,
    null,
    'Without batch context, distinctiveness must be null'
  );

  // 2. Arabic script checks: missing harakat & Latin intrusion detection
  const arabicUnvocalized = analyzeNameCompletely({
    name: 'عمر',
    generatorId: 'arabic',
    style: 'classic',
    interfaceLanguage: 'fr',
    generationLanguage: 'ar',
  });
  assert.equal(arabicUnvocalized.report.linguistic.writingDirection, 'rtl');
  assert.equal(arabicUnvocalized.report.linguistic.arabicDetails.isArabicScript, true);
  assert.equal(arabicUnvocalized.report.linguistic.arabicDetails.hasHarakat, false);
  assert.equal(arabicUnvocalized.report.linguistic.arabicDetails.hasLatinInArabic, false);
  assert.equal(arabicUnvocalized.report.linguistic.pronunciationStatus, 'insufficient-data');

  const arabicMixed = analyzeNameCompletely({
    name: 'عمرX',
    generatorId: 'arabic',
    style: 'modern',
    interfaceLanguage: 'en',
    generationLanguage: 'ar',
  });
  assert.equal(arabicMixed.report.linguistic.arabicDetails.hasLatinInArabic, true);
  assert.equal(arabicMixed.report.linguistic.writingDirection, 'mixed');
  assert.ok(arabicMixed.report.linguistic.ambiguitiesAndRisks.length >= 1);

  // 3. Japanese script checks: Hiragana/Katakana/Kanji/Romaji + anime-creative vs attested
  const hiraganaName = analyzeNameCompletely({
    name: 'しゃら',
    generatorId: 'anime',
    style: 'spirit',
    interfaceLanguage: 'ja',
    generationLanguage: 'ja',
  });
  assert.equal(hiraganaName.report.linguistic.japaneseDetails.isJapaneseContext, true);
  assert.equal(hiraganaName.report.linguistic.japaneseDetails.hiraganaCount, 3);
  assert.equal(hiraganaName.report.identification.originClassification, 'algorithmic');

  const animeCultural = analyzeNameCompletely({
    name: 'Akira',
    generatorId: 'anime',
    style: 'hero',
    interfaceLanguage: 'en',
    generationLanguage: 'en',
  });
  assert.equal(animeCultural.report.identification.originClassification, 'language-inspired');

  // 4. Custom user input starts unverified
  const customInput = analyzeNameCompletely({
    name: 'Zephira',
    generatorId: 'brand',
    style: 'custom',
    interfaceLanguage: 'en',
    isCustomInput: true,
  });
  assert.equal(customInput.report.identification.generationMethod, 'custom-input');
  assert.equal(customInput.report.identification.originClassification, 'unverified');

  // 5. Visual presets & categorized variations & checklist honesty
  assert.equal(r1.visualIdentity.presets.length, 3);
  assert.ok(r1.visualIdentity.recommendedTypography.length >= 2);
  assert.ok(r1.visualIdentity.categorizedVariations.username.length >= 1);
  assert.ok(r1.recommendations.checklist.some((c) => !c.completed));
  assert.ok(r1.recommendations.checklist.some((c) => c.completed));

  // 6. Export TXT & JSON preserve Unicode cleanly
  const txtAr = formatReportAsText(arabicUnvocalized.report, 'fr');
  assert.ok(txtAr.includes('عمر'));
  assert.ok(txtAr.includes('01.') && txtAr.includes('06.'));
  const jsonJa = formatReportAsJson(hiraganaName.report);
  const parsedJson = JSON.parse(jsonJa);
  assert.equal(parsedJson.report.identification.name, 'しゃら');
  assert.equal(parsedJson.report.quality.criteria.length, 10);

  // 7. Side-by-side comparison engine
  const cmp = compareNamesIntelligently(
    [
      { name: 'Solenne', generatorId: 'french', style: 'classic', rating: 5, saved: true },
      { name: 'Aurélien', generatorId: 'french', style: 'classic', rating: 3, saved: false },
      { name: 'Nova', generatorId: 'brand', style: 'modern', rating: 0, saved: false },
    ],
    (cand, all) =>
      analyzeNameCompletely({
        name: cand.name,
        generatorId: cand.generatorId,
        style: cand.style,
        interfaceLanguage: 'en',
        humanNaturalness: cand.rating,
        batchNames: all,
        isCustomInput: cand.rating === 0,
      }).report,
    'en'
  );
  assert.equal(cmp.entries.length, 3);
  assert.deepEqual(cmp.mostCompactNames, ['Nova']);
  assert.deepEqual(cmp.highestRatedNames, ['Solenne']);
  assert.ok(cmp.verificationCaveat.length > 20);

  // 8. 28 priority UI languages all have localized labels, section titles, criteria & verification statuses
  for (const lang of FULL_TRANSLATION_LANGUAGES) {
    const labels = getNameIntelligenceLabels(lang);
    assert.ok(labels.reportTitle.trim().length > 0, `Missing reportTitle for ${lang}`);
    assert.ok(labels.sectionTitles.s01.trim().length > 0);
    assert.ok(labels.sectionTitles.s06.trim().length > 0);
    for (const k of EXPECTED_CRITERIA) {
      assert.ok(labels.criteriaLabels[k].trim().length > 0, `Missing criteriaLabel ${k} for ${lang}`);
    }
    if (lang !== 'en') {
      assert.notEqual(
        labels.reportTitle,
        getNameIntelligenceLabels('en').reportTitle,
        `Language ${lang} fell back to English reportTitle`
      );
      assert.notEqual(
        labels.verificationStatuses['native-review-pending'],
        getNameIntelligenceLabels('en').verificationStatuses['native-review-pending'],
        `Language ${lang} fell back to English verificationStatuses`
      );
    }
  }

  console.log('✅ nameIntelligenceReport.test.ts passed');
}

run();
