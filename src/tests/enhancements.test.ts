import assert from 'node:assert/strict';
import { ALL_GENERATORS_LIST } from '../data/generators';
import {
  getEnhancementsLabels,
  type CompatibilityIndicatorKey,
  type ProfileDomainKey,
} from '../i18n/enhancementsLabels';
import { FULL_TRANSLATION_LANGUAGES } from '../i18n';
import {
  getGeneratorCompatibilityAssessment,
  resolveGeneratorCompatibilityDomain,
} from '../services/languageCompatibility';
import { analyzeNameCompletely } from '../services/unifiedNameAnalysis';
import {
  compareNamesIntelligently,
  formatComparisonAsJson,
  formatComparisonAsText,
  type CompareCandidateInput,
} from '../services/nameIntelligenceReport';

const COMPATIBILITY_LEVELS: CompatibilityIndicatorKey[] = [
  'highly-compatible',
  'compatible',
  'alternative-style',
  'limited-resources',
  'requires-review',
  'not-evaluated',
];

const PROFILE_DOMAINS: ProfileDomainKey[] = [
  'anime',
  'attested',
  'phraseBank',
  'desert',
  'nordic',
  'medieval',
  'business',
  'tech',
  'creative',
];

function run() {
  // 1. Complete 28-language coverage for enhancements labels (zero English leakage into non-EN locales)
  const en = getEnhancementsLabels('en');
  const fr = getEnhancementsLabels('fr');
  assert.equal(FULL_TRANSLATION_LANGUAGES.length, 28, 'Expected 28 supported UI languages');

  for (const lang of FULL_TRANSLATION_LANGUAGES) {
    const labels = getEnhancementsLabels(lang);
    assert.ok(labels.compare.compareWithCollectionsTitle.length > 0, `${lang}: missing compareWithCollectionsTitle`);
    assert.ok(labels.compare.selectedCounter.includes('{count}'), `${lang}: selectedCounter missing {count}`);
    assert.ok(labels.compare.selectedCounter.includes('{max}'), `${lang}: selectedCounter missing {max}`);
    assert.ok(labels.compare.crossContextNotice.includes('{details}'), `${lang}: crossContextNotice missing {details}`);
    assert.equal(labels.compatibility.whyPoints.length, 4, `${lang}: expected 4 whyPoints`);
    assert.ok(labels.compatibility.footerNotice.length > 10, `${lang}: missing footerNotice`);

    for (const lvl of COMPATIBILITY_LEVELS) {
      assert.ok(labels.compatibility.indicators[lvl]?.length > 0, `${lang}: missing indicator ${lvl}`);
      assert.ok(
        labels.compatibility.indicatorDescriptions[lvl]?.length > 0,
        `${lang}: missing indicator description ${lvl}`
      );
    }

    for (const dom of PROFILE_DOMAINS) {
      const note = labels.compatibility.domainNotes[dom];
      assert.ok(note.whyFit.length > 0, `${lang}: domain ${dom} missing whyFit`);
      assert.ok(note.limitations.length > 0, `${lang}: domain ${dom} missing limitations`);
      assert.ok(note.cultural.length > 0, `${lang}: domain ${dom} missing cultural`);
      assert.ok(note.example.length > 0, `${lang}: domain ${dom} missing example`);
    }

    if (lang !== 'en' && lang !== 'fr') {
      assert.notEqual(
        labels.compare.exportTxt,
        en.compare.exportTxt,
        `${lang}: exportTxt leaked English string`
      );
      assert.notEqual(
        labels.compare.exportJson,
        en.compare.exportJson,
        `${lang}: exportJson leaked English string`
      );
      assert.notEqual(
        labels.compatibility.footerNotice,
        en.compatibility.footerNotice,
        `${lang}: footerNotice leaked English string`
      );
      for (const dom of PROFILE_DOMAINS) {
        assert.notEqual(
          labels.compatibility.domainNotes[dom].limitations,
          en.compatibility.domainNotes[dom].limitations,
          `${lang}: domainNotes.${dom}.limitations leaked English`
        );
        assert.notEqual(
          labels.compatibility.domainNotes[dom].cultural,
          en.compatibility.domainNotes[dom].cultural,
          `${lang}: domainNotes.${dom}.cultural leaked English`
        );
        assert.notEqual(
          labels.compatibility.domainNotes[dom].example,
          en.compatibility.domainNotes[dom].example,
          `${lang}: domainNotes.${dom}.example leaked English`
        );
      }
    }
  }

  // Verify alias normalization ('no' -> 'nb')
  assert.equal(
    getEnhancementsLabels('no').compatibility.heading,
    getEnhancementsLabels('nb').compatibility.heading
  );
  assert.notEqual(fr.compatibility.heading, en.compatibility.heading);

  // 2. Generator & Language Compatibility across all 234 generators
  assert.equal(ALL_GENERATORS_LIST.length, 234, 'Expected 234 generators');

  for (const gen of ALL_GENERATORS_LIST) {
    const domain = resolveGeneratorCompatibilityDomain(gen.id);
    assert.ok(PROFILE_DOMAINS.includes(domain), `Unknown compatibility domain for ${gen.id}`);
    const assessment = getGeneratorCompatibilityAssessment(gen.id, 'en', 'en');
    assert.equal(assessment.isEvaluated, true, `${gen.id}: should be evaluated for en`);
    assert.ok(assessment.badgeLabel.length > 0, `${gen.id}: missing badgeLabel`);
    assert.ok(assessment.profile.suitableLanguages.length > 0, `${gen.id}: missing suitableLanguages`);
    assert.ok(assessment.profile.whyLanguagesFit.length > 0, `${gen.id}: missing whyLanguagesFit`);
    assert.ok(assessment.profile.knownLimitations.length > 0, `${gen.id}: missing knownLimitations`);
    assert.ok(assessment.profile.culturalConsiderations.length > 0, `${gen.id}: missing culturalConsiderations`);
    assert.ok(assessment.profile.contextualExample.length > 0, `${gen.id}: missing contextualExample`);
  }

  // Grounded rule assertions against real engine resources
  const babyEn = getGeneratorCompatibilityAssessment('baby_name', 'en', 'en');
  assert.equal(babyEn.level, 'highly-compatible');
  const babyAr = getGeneratorCompatibilityAssessment('baby_name', 'ar', 'en');
  assert.equal(babyAr.level, 'highly-compatible');
  const babyJa = getGeneratorCompatibilityAssessment('baby_name', 'ja', 'en');
  assert.equal(babyJa.level, 'requires-review');

  const animeJa = getGeneratorCompatibilityAssessment('anime', 'ja', 'en');
  assert.equal(animeJa.level, 'compatible');
  const animeAr = getGeneratorCompatibilityAssessment('anime', 'ar', 'en');
  assert.equal(animeAr.level, 'alternative-style');
  const animeKo = getGeneratorCompatibilityAssessment('anime', 'ko', 'en');
  assert.equal(animeKo.level, 'limited-resources');

  // Unverified phrase banks are quarantined, so this category now uses the procedural profile.
  const sloganTh = getGeneratorCompatibilityAssessment('slogan', 'th', 'en');
  assert.equal(resolveGeneratorCompatibilityDomain('slogan'), 'business');
  assert.equal(sloganTh.level, 'limited-resources');

  const valkyrieNordic = getGeneratorCompatibilityAssessment('nordic_valkyrie', 'nordic', 'en');
  assert.equal(valkyrieNordic.level, 'highly-compatible');
  const valkyrieSv = getGeneratorCompatibilityAssessment('nordic_valkyrie', 'sv', 'en');
  assert.equal(valkyrieSv.level, 'compatible');

  const djinnAr = getGeneratorCompatibilityAssessment('desert_djinn', 'ar', 'en');
  assert.equal(djinnAr.level, 'alternative-style');

  const brandEn = getGeneratorCompatibilityAssessment('brand', 'en', 'en');
  assert.equal(brandEn.profile.recommendedLanguage, null);

  // Unknown runtime language code must report not-evaluated transparently
  const unknownLang = getGeneratorCompatibilityAssessment('brand', 'klingon_unknown', 'en');
  assert.equal(unknownLang.level, 'not-evaluated');
  assert.equal(unknownLang.isEvaluated, false);

  // 3. Extended Comparison across Generated, Saved, and Collection candidates
  const mixedCandidates: CompareCandidateInput[] = [
    {
      name: 'Kaelith',
      generatorId: 'fantasy',
      style: 'mythic',
      source: 'generated',
      generationLanguage: 'en',
      rating: 4,
    },
    {
      name: 'نور',
      generatorId: 'baby_name',
      style: 'classic',
      source: 'saved',
      saved: true,
      generationLanguage: 'ar',
      rating: 5,
      note: 'Saved Arabic favorite',
    },
    {
      name: 'Veltrix',
      generatorId: 'brand',
      style: 'modern',
      source: 'collection',
      saved: true,
      collectionId: 'col_brands',
      collectionName: 'Launch Shortlist',
      generationLanguage: 'en',
      rating: 3,
    },
  ];

  const buildReport = (candidate: CompareCandidateInput, allNames: string[]) =>
    analyzeNameCompletely({
      name: candidate.name,
      generatorId: candidate.generatorId,
      style: candidate.style,
      interfaceLanguage: 'en',
      generationLanguage: candidate.generationLanguage || 'en',
      batchNames: allNames,
      humanNaturalness: candidate.rating,
      item: candidate.item,
    }).report;

  const mixedReport = compareNamesIntelligently(mixedCandidates, buildReport, 'en');
  assert.equal(mixedReport.entries.length, 3);
  assert.equal(mixedReport.entries[0].source, 'generated');
  assert.equal(mixedReport.entries[1].source, 'saved');
  assert.equal(mixedReport.entries[2].source, 'collection');
  assert.equal(mixedReport.entries[2].collectionName, 'Launch Shortlist');
  assert.ok(mixedReport.crossContextWarning, 'Expected crossContextWarning for mixed categories/languages');

  // Unvocalized Arabic keeps null scores on unmeasurable criteria (no fabricated scores)
  const arabicCategoryFit = mixedReport.entries[1].report.quality.criteria.find((c) => c.key === 'categoryFit');
  assert.equal(arabicCategoryFit?.score, null, 'categoryFit must remain null (Not evaluated)');

  // Same category + same script should produce null crossContextWarning
  const uniformCandidates: CompareCandidateInput[] = [
    { name: 'Lumiora', generatorId: 'brand', style: 'modern', source: 'generated', generationLanguage: 'en' },
    { name: 'Veltrix', generatorId: 'brand', style: 'modern', source: 'collection', saved: true, collectionId: 'col_1', collectionName: 'Shortlist', generationLanguage: 'en' },
  ];
  const uniformReport = compareNamesIntelligently(uniformCandidates, buildReport, 'en');
  assert.equal(uniformReport.crossContextWarning, null, 'Expected no crossContextWarning when category & language match');

  // Export serializers preserve collection metadata and cross-context warning
  const txtExport = formatComparisonAsText(mixedReport, 'en');
  assert.ok(txtExport.includes('Launch Shortlist'));
  assert.ok(txtExport.includes('Not evaluated'));
  assert.ok(txtExport.includes('Cross-language'));

  const jsonParsed = JSON.parse(formatComparisonAsJson(mixedReport));
  assert.equal(jsonParsed.schema, 'nameforge-comparison-report/v1');
  assert.equal(jsonParsed.entries.length, 3);
  assert.equal(jsonParsed.entries[2].collectionName, 'Launch Shortlist');
  assert.ok(typeof jsonParsed.crossContextWarning === 'string' && jsonParsed.crossContextWarning.length > 0);
}

run();
console.log('enhancements.test.ts: PASS');
