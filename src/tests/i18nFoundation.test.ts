import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  LOCALE_REGISTRY,
  LOCALE_ALIASES,
  NON_CATALOG_LOCALE_NOTES,
  resolveCanonicalLocale,
  resolveLocaleDirection,
  resolveDefaultGenLanguageForLocale,
  getLocaleEntry,
  getLocaleRegistryStats,
  isCatalogLocale,
} from '../i18n/localeRegistry';
import {
  getLocalizedStorageError,
  getStorageCsvLabels,
  getProjectWorkspaceCopy,
  getSeedCopy,
  getCreativeStudioUiCopy,
} from '../i18n/moduleLabels';
import { SUPPORTED_LANGUAGES } from '../services/settings';
import { getTextDirection, isRtlLanguage } from '../utils/locale';
import { createNameInsight } from '../services/nameInsightService';
import { getLocalizedNameInsightCategoryLabel, NAME_INSIGHT_CATEGORY_LABELS } from '../data/nameInsightData';
import { FULL_TRANSLATION_LANGUAGES, getTranslations } from '../i18n';

// 1. Registry completeness & alignment with SUPPORTED_LANGUAGES
const stats = getLocaleRegistryStats();
assert.equal(stats.total, 82, 'Registry must contain all 82 UI languages');
assert.equal(SUPPORTED_LANGUAGES.length, 82, 'SUPPORTED_LANGUAGES must be derived from all 82 registry entries');
assert.equal(stats.completePacks, 28);
assert.equal(stats.verified, 2, 'Only verified locales (en, fr) should be marked verified');
assert.equal(stats.awaitingReview, 26);
assert.equal(stats.fallback, 54);
assert.equal(stats.rtlCount, 5);
assert.equal(new Set(LOCALE_REGISTRY.map((e) => e.code)).size, 82, 'Registry codes must be unique');
assert.deepEqual(
  SUPPORTED_LANGUAGES.map((l) => l.code),
  LOCALE_REGISTRY.map((l) => l.code),
  'SUPPORTED_LANGUAGES must match canonical LOCALE_REGISTRY codes'
);

// 2. Honest translation status invariant
for (const entry of LOCALE_REGISTRY) {
  if (entry.code === 'en' || entry.code === 'fr') {
    assert.equal(entry.translationStatus, 'verified');
  } else if (FULL_TRANSLATION_LANGUAGES.includes(entry.code)) {
    assert.equal(entry.translationStatus, 'awaiting_review', `${entry.code} should stay awaiting_review until audited`);
  } else {
    assert.equal(entry.translationStatus, 'fallback', `${entry.code} should honestly declare fallback status`);
    assert.equal(entry.fallbackLocale, 'en');
  }
}

// 3. Explicit aliases & non-catalog compatibility (no -> nb, yi RTL fallback)
assert.equal(LOCALE_ALIASES.no, 'nb');
assert.equal(resolveCanonicalLocale('no'), 'nb');
assert.equal(resolveCanonicalLocale('nb-NO'), 'nb');
assert.equal(resolveCanonicalLocale('nn'), 'nb');
assert.equal(resolveCanonicalLocale('iw'), 'he');
assert.equal(isCatalogLocale('no'), true);
assert.equal(isCatalogLocale('fr'), true);
assert.equal(isCatalogLocale('yi'), false);
assert.equal(NON_CATALOG_LOCALE_NOTES.yi.dir, 'rtl');
assert.equal(NON_CATALOG_LOCALE_NOTES.yi.fallbackLocale, 'en');
assert.equal(resolveLocaleDirection('yi'), 'rtl');
assert.equal(resolveDefaultGenLanguageForLocale('fr'), 'fr');
assert.equal(resolveDefaultGenLanguageForLocale('fa'), 'en');

// 4. All 5 RTL locales consistent across registry & locale helpers
const rtlCodes = ['ar', 'he', 'fa', 'ur', 'ps'] as const;
for (const code of rtlCodes) {
  const entry = getLocaleEntry(code);
  assert.equal(entry.dir, 'rtl', `${code} must be RTL`);
  assert.equal(entry.rtlReady, true, `${code} must flag rtlReady`);
  assert.equal(getTextDirection(code), 'rtl');
  assert.equal(isRtlLanguage(code), true);
}
assert.equal(getTextDirection('en'), 'ltr');
assert.equal(isRtlLanguage('fr'), false);

// 5. Centralized module labels (storage errors, CSV headers, workspace, seed copy, studio UI)
assert.equal(getLocalizedStorageError('projectNotFound', 'en'), 'Project not found.');
assert.equal(getLocalizedStorageError('projectNotFound', 'fr'), 'Projet introuvable.');
assert.notEqual(getLocalizedStorageError('invalidJsonFormat', 'ar'), getLocalizedStorageError('invalidJsonFormat', 'en'));
assert.deepEqual(
  getStorageCsvLabels('en').headers,
  ['Name', 'Generator', 'Style', 'Saved', 'Liked', 'Star rating', 'Collection', 'Private note', 'Created at']
);
assert.deepEqual(
  getStorageCsvLabels('fr').headers,
  ['Nom', 'Générateur', 'Style', 'Enregistré', 'Aimé', 'Note étoiles', 'Collection', 'Note privée', 'Date de création']
);
assert.equal(getProjectWorkspaceCopy('uk').title, 'Збережені проєкти');
assert.ok(getSeedCopy('ko').help.includes('설정을 사용하면'), 'Korean seed copy should have correct particle');
assert.equal(getCreativeStudioUiCopy('es').title, 'Estudio de diseño de nombres');
assert.equal(getCreativeStudioUiCopy('de').title, 'Namens-Designstudio');
assert.equal(getCreativeStudioUiCopy('he').title, 'סטודיו לעיצוב שמות');

// 6. Ukrainian translation sanity check & GeneratorDetailView Ukrainian fix check
assert.ok(getTranslations('uk').nav.generators.length > 0);
const detailViewSource = readFileSync(new URL('../views/GeneratorDetailView.tsx', import.meta.url), 'utf8');
assert.ok(detailViewSource.includes("leaderboard: 'Незалежний рейтинг'"), 'Ukrainian leaderboard typo fix must persist');
assert.ok(!detailViewSource.includes('Независимий рейтинг'), 'Russian hybrid typo must not reappear');

// 7. Localized NameInsightCategory labels preserve English default while localizing non-English views
assert.equal(getLocalizedNameInsightCategoryLabel('brand', 'en'), NAME_INSIGHT_CATEGORY_LABELS.brand);
assert.equal(getLocalizedNameInsightCategoryLabel('brand', 'fr'), 'Marque et identité');
assert.equal(getLocalizedNameInsightCategoryLabel('brand', 'ar'), 'العلامة والهوية');
const frInsight = createNameInsight({
  name: 'Asterion',
  generatorId: 'brand',
  style: 'modern',
  description: 'Description test',
  language: 'fr',
});
assert.equal(frInsight?.categoryLabel, 'Marque et identité');

console.log('PASS i18nFoundation: verified 82-language registry, aliases, RTL helpers, module labels, and category localization.');
