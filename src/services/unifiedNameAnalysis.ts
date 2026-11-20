import type { GeneratedName, GeneratorId, GenLanguageCode } from '../types';
import type { NameInsightMetrics, NameInsightResult, NameIntelligenceReport } from '../types/nameInsight';
import { GENERATORS_METADATA } from '../data/generators';
import { createNameInsight } from './nameInsightService';
import { evaluateGeneratedName, type NameQualityResult } from './linguisticQuality';
import { buildNameIntelligenceReport } from './nameIntelligenceReport';
import {
  getCategoryLanguageCompatibility,
  type CategoryLanguageCompatibility,
} from './languageCompatibility';
import {
  getLanguagePhoneticReadiness,
  type LanguagePhoneticReadiness,
} from './phoneticReadiness';
import {
  decomposeHangulSyllable,
  splitJapaneseMora,
  type HangulSyllableParts,
} from './phoneticUnits';
import { splitOrthographicUnits } from './orthographicUnits';
import { getAppSettings, resolveGenerationLanguage } from './settings';
import { getLocalizedGeneratorDescription } from '../i18n/generatorContent';
import { getLocalizedGeneratorShortTitle } from '../i18n/generatorTitles';
import { getLocalizedNameMeaning, getLocalizedNameOrigin } from '../i18n/attestedNameTranslations';
import { getLocalizedStyleLabel } from '../i18n/styleLabels';
import {
  getLocalizedQualityFindingMessage,
  type UnifiedAnalysisStatus,
} from '../i18n/unifiedAnalysisLabels';

export interface UnifiedNameAnalysisInput {
  name: string;
  generatorId: GeneratorId;
  style: string;
  interfaceLanguage?: string;
  generationLanguage?: GenLanguageCode;
  batchNames?: string[];
  humanNaturalness?: number;
  humanCategoryFit?: number;
  isCustomInput?: boolean;
  item?: Partial<GeneratedName>;
}

export interface UnifiedIdentitySection {
  status: UnifiedAnalysisStatus;
  normalizedName: string;
  generatorId: GeneratorId;
  generatorLabel: string;
  styleLabel: string;
  metrics: NameInsightMetrics;
  orthographicUnits: string[];
}

export interface UnifiedLinguisticSection {
  status: UnifiedAnalysisStatus;
  effectiveLanguage: GenLanguageCode;
  pronunciationGuide: string | null;
  compatibility: CategoryLanguageCompatibility;
  phoneticReadiness: LanguagePhoneticReadiness | null;
  moraUnits: string[];
  hangulSyllables: Array<{ syllable: string; parts: HangulSyllableParts }>;
  nonNativeValidationRequired: true;
}

export interface UnifiedSemanticSection {
  status: UnifiedAnalysisStatus;
  etymologyMode: 'attested' | 'creative-only' | 'unavailable';
  origin: string | null;
  meaning: string | null;
  variants: string[];
  creativeReading: string | null;
  contextDescription: string;
  slogan: string | null;
}

export interface UnifiedQualitySection {
  status: UnifiedAnalysisStatus;
  result: NameQualityResult;
  measuredCount: number;
  pendingCount: number;
  localizedFindings: Array<{
    code: string;
    severity: 'info' | 'warning' | 'error';
    message: string;
  }>;
}

export interface UnifiedVisualSection {
  status: UnifiedAnalysisStatus;
  insight: NameInsightResult | null;
}

export interface UnifiedRecommendationsSection {
  status: UnifiedAnalysisStatus;
  highlights: string[];
  watchouts: string[];
  legalCheckRequired: true;
}

export interface UnifiedNameAnalysisResult {
  overallStatus: UnifiedAnalysisStatus;
  identity: UnifiedIdentitySection;
  linguistic: UnifiedLinguisticSection;
  semantic: UnifiedSemanticSection;
  quality: UnifiedQualitySection;
  visual: UnifiedVisualSection;
  recommendations: UnifiedRecommendationsSection;
  report: NameIntelligenceReport;
}

const IGNORED_GENERIC_PHRASES = new Set([
  'memorable sound',
  'sonorité mémorable',
  'sonoridad memorable',
  'einprägsamer klang',
  'suono memorabile',
  'repeated adjacent letters may affect pronunciation',
]);

function isGenericOrSubjectiveFallback(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return true;
  if (IGNORED_GENERIC_PHRASES.has(normalized)) return true;
  if (normalized.includes('memorable sound')) return true;
  if (normalized.includes('repeated adjacent letters may affect pronunciation')) return true;
  return false;
}

function getGraphemeClusters(value: string): string[] {
  type GraphemeSegmenterConstructor = new (
    locales?: string | string[],
    options?: { granularity: 'grapheme' }
  ) => { segment(input: string): Iterable<{ segment: string }> };

  const Segmenter = (Intl as unknown as { Segmenter?: GraphemeSegmenterConstructor }).Segmenter;
  if (!Segmenter) return Array.from(value);
  return Array.from(new Segmenter(undefined, { granularity: 'grapheme' }).segment(value), (p) => p.segment);
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
  try {
    return Array.from(new Segmenter(language, { granularity: 'word' }).segment(value)).filter(
      (part) => part.isWordLike
    ).length;
  } catch {
    return value.split(/\s+/u).filter(Boolean).length;
  }
}

function detectWritingSystem(character: string): string {
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
  return 'other';
}

function computeStandaloneMetrics(normalized: string, language: string): NameInsightMetrics {
  const codePoints = Array.from(normalized);
  const clusters = getGraphemeClusters(normalized);
  const letterClusters = clusters.filter((c) => /\p{L}/u.test(c));
  const latinLetters = letterClusters.filter((c) => detectWritingSystem(c) === 'latin');
  const vowels = latinLetters.filter((c) => {
    const base = c.normalize('NFD').replace(/\p{M}/gu, '');
    return /^[aeiouy]$/i.test(base);
  }).length;
  const writingSystems = Array.from(new Set(letterClusters.map(detectWritingSystem)));

  let repeatedCharacterCount = 0;
  for (let i = 1; i < clusters.length; i += 1) {
    const cur = clusters[i];
    const prev = clusters[i - 1];
    try {
      if (/\p{L}/u.test(cur) && /\p{L}/u.test(prev) && cur.toLocaleLowerCase(language) === prev.toLocaleLowerCase(language)) {
        repeatedCharacterCount += 1;
      }
    } catch {
      if (/\p{L}/u.test(cur) && /\p{L}/u.test(prev) && cur.toLowerCase() === prev.toLowerCase()) {
        repeatedCharacterCount += 1;
      }
    }
  }

  let hasMixedScripts = writingSystems.length > 1;
  if (hasMixedScripts && language.toLowerCase().startsWith('ja')) {
    const jaSet = new Set(['han', 'hiragana', 'katakana']);
    hasMixedScripts = writingSystems.some((s) => !jaSet.has(s));
  }

  return {
    characterCount: letterClusters.length,
    wordCount: countWords(normalized, language),
    repeatedCharacterCount,
    latinVowelShare:
      letterClusters.length > 0 && latinLetters.length === letterClusters.length
        ? Math.round((vowels / letterClusters.length) * 100)
        : null,
    digitCount: codePoints.filter((c) => /\p{N}/u.test(c)).length,
    symbolCount: codePoints.filter((c) => !/[\p{L}\p{N}\s]/u.test(c)).length,
    uppercaseCount: letterClusters.filter((c) => /\p{Lu}/u.test(c)).length,
    hasMixedScripts,
    writingSystems,
  };
}

function getEffectiveGenLanguage(
  requested: GenLanguageCode | undefined,
  interfaceLanguage: string
): GenLanguageCode {
  if (!requested || requested === 'auto') {
    return resolveGenerationLanguage('auto', interfaceLanguage as never) as GenLanguageCode;
  }
  return requested;
}

export function analyzeNameCompletely(input: UnifiedNameAnalysisInput): UnifiedNameAnalysisResult {
  const interfaceLanguage = input.interfaceLanguage || getAppSettings().language || 'en';
  const requestedGenLang = input.generationLanguage ?? getAppSettings().defaultGenLanguage ?? 'auto';
  const effectiveGenLang = getEffectiveGenLanguage(requestedGenLang, interfaceLanguage);
  const meta = GENERATORS_METADATA[input.generatorId] || GENERATORS_METADATA.fantasy;
  const generatorLabel = getLocalizedGeneratorShortTitle(input.generatorId, interfaceLanguage, meta.shortTitle);
  const styleLabel = getLocalizedStyleLabel(input.style, interfaceLanguage, input.generatorId);
  const normalizedName = String(input.name ?? '').normalize('NFC').trim().replace(/\s+/g, ' ');
  const localizedDescription = getLocalizedGeneratorDescription(meta, interfaceLanguage);

  // 1. Visual insight (optional: null for tactical/weapon excluded generators or blank names)
  let insight: NameInsightResult | null = null;
  let visualStatus: UnifiedAnalysisStatus = 'unavailable';
  try {
    insight = createNameInsight({
      name: normalizedName,
      generatorId: input.generatorId,
      style: input.style,
      description: localizedDescription,
      generatorLabel,
      language: interfaceLanguage,
    });
    visualStatus = insight ? 'ready' : 'unavailable';
  } catch {
    insight = null;
    visualStatus = 'error';
  }

  // 2. Identity & Name Structure (always computed independently)
  const metrics = insight?.metrics ?? computeStandaloneMetrics(normalizedName, interfaceLanguage);
  const orthographicUnits = normalizedName
    ? splitOrthographicUnits(normalizedName, effectiveGenLang)
    : [];
  const identityStatus: UnifiedAnalysisStatus = normalizedName ? 'ready' : 'unavailable';

  // 3. Linguistic & Script Readiness
  const compatibility = getCategoryLanguageCompatibility(
    input.generatorId,
    requestedGenLang,
    interfaceLanguage
  );
  const phoneticReadiness = getLanguagePhoneticReadiness(effectiveGenLang) ?? null;

  const hasKana = /[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(normalizedName);
  const moraUnits = hasKana ? splitJapaneseMora(normalizedName) : [];

  const hangulSyllables: Array<{ syllable: string; parts: HangulSyllableParts }> = [];
  if (/\p{Script=Hangul}/u.test(normalizedName)) {
    for (const ch of Array.from(normalizedName)) {
      const parts = decomposeHangulSyllable(ch);
      if (parts) hangulSyllables.push({ syllable: ch, parts });
    }
  }

  const linguisticStatus: UnifiedAnalysisStatus = !normalizedName
    ? 'unavailable'
    : compatibility.strategy === 'unsupported' || phoneticReadiness?.readiness === 'reference-data-required'
      ? 'partial'
      : 'ready';

  // 4. Semantic & Cultural Context (strict honesty — never fabricate etymologies)
  const item = input.item;
  const hasAttested = item?.isAttested === true;
  const rawOrigin = item?.origin?.replace(/^Origine certifiée\s*:\s*/i, '').trim() || '';
  const origin = hasAttested && rawOrigin ? getLocalizedNameOrigin(rawOrigin, interfaceLanguage) : null;
  const meaning =
    hasAttested && item?.meaning?.trim()
      ? getLocalizedNameMeaning(item.meaning, interfaceLanguage)
      : null;
  const variants = hasAttested && Array.isArray(item?.variants) ? item.variants : [];

  let semantic: UnifiedSemanticSection;
  if (hasAttested && (origin || meaning)) {
    semantic = {
      status: 'ready',
      etymologyMode: 'attested',
      origin,
      meaning,
      variants,
      creativeReading: insight?.creativeReading ?? null,
      contextDescription: localizedDescription,
      slogan: insight?.slogan ?? null,
    };
  } else if (insight?.creativeReading) {
    semantic = {
      status: 'partial',
      etymologyMode: 'creative-only',
      origin: null,
      meaning: null,
      variants: [],
      creativeReading: insight.creativeReading,
      contextDescription: localizedDescription,
      slogan: insight.slogan ?? null,
    };
  } else {
    semantic = {
      status: 'unavailable',
      etymologyMode: 'unavailable',
      origin: null,
      meaning: null,
      variants: [],
      creativeReading: null,
      contextDescription: localizedDescription,
      slogan: null,
    };
  }

  // 5. Quality Evaluation
  const qualityInputLang =
    effectiveGenLang === 'latin' || effectiveGenLang === 'nordic' || effectiveGenLang === 'tech'
      ? 'en'
      : effectiveGenLang;
  const qualityResult = evaluateGeneratedName({
    name: normalizedName,
    language: qualityInputLang,
    category: input.generatorId,
    batchNames: input.batchNames,
    humanNaturalness: input.humanNaturalness && input.humanNaturalness > 0 ? input.humanNaturalness : undefined,
    humanCategoryFit: input.humanCategoryFit && input.humanCategoryFit > 0 ? input.humanCategoryFit : undefined,
  });

  const dimensionValues = Object.values(qualityResult.dimensions);
  const measuredCount = dimensionValues.filter((d) => d.status === 'measured').length;
  const pendingCount = dimensionValues.length - measuredCount;
  const qualityStatus: UnifiedAnalysisStatus = !normalizedName
    ? 'unavailable'
    : pendingCount === 0
      ? 'ready'
      : 'partial';

  const localizedFindings = qualityResult.findings.map((finding) => ({
    code: finding.code,
    severity: finding.severity,
    message: getLocalizedQualityFindingMessage(finding.code, finding.message, interfaceLanguage),
  }));

  // 6. Practical Recommendations & Review Watchouts
  const rawStrengths = (item?.strengths ?? []).filter((s) => !isGenericOrSubjectiveFallback(s));
  const factualHighlights: string[] = [...rawStrengths];
  if (hasAttested && origin) {
    factualHighlights.push(origin);
  }
  if (qualityResult.dimensions.textHygiene.score === 100 && qualityResult.dimensions.scriptIntegrity.score === 100) {
    factualHighlights.push(
      getLocalizedQualityFindingMessage('SCRIPT_MATCH', 'Characters match the expected writing system.', interfaceLanguage)
    );
  }

  const rawWatchouts = (item?.watchouts ?? []).filter((w) => !isGenericOrSubjectiveFallback(w));
  const warningFindings = localizedFindings
    .filter((f) => f.severity === 'warning' || f.severity === 'error')
    .map((f) => f.message);
  const watchouts = Array.from(new Set([...rawWatchouts, ...warningFindings]));

  const overallStatus: UnifiedAnalysisStatus = !normalizedName
    ? 'unavailable'
    : visualStatus === 'ready' && qualityStatus === 'ready'
      ? 'ready'
      : 'partial';

  const report = buildNameIntelligenceReport({
    name: normalizedName,
    generatorId: input.generatorId,
    generatorLabel,
    styleLabel,
    effectiveLanguage: effectiveGenLang,
    interfaceLanguage,
    metrics,
    orthographicUnits,
    compatibility,
    qualityResult,
    insight,
    moraUnits,
    hangulSyllables,
    item: input.item,
    humanNaturalness: input.humanNaturalness,
    humanCategoryFit: input.humanCategoryFit,
    hasBatchContext: Boolean(input.batchNames && input.batchNames.length > 0),
    isCustomInput: input.isCustomInput,
    attestedOrigin: origin,
    attestedMeaning: meaning,
  });

  return {
    overallStatus,
    identity: {
      status: identityStatus,
      normalizedName,
      generatorId: input.generatorId,
      generatorLabel,
      styleLabel,
      metrics,
      orthographicUnits,
    },
    linguistic: {
      status: linguisticStatus,
      effectiveLanguage: effectiveGenLang,
      pronunciationGuide: item?.pronunciation?.trim() || null,
      compatibility,
      phoneticReadiness,
      moraUnits,
      hangulSyllables,
      nonNativeValidationRequired: true,
    },
    semantic,
    quality: {
      status: qualityStatus,
      result: qualityResult,
      measuredCount,
      pendingCount,
      localizedFindings,
    },
    visual: {
      status: visualStatus,
      insight,
    },
    recommendations: {
      status: normalizedName ? 'ready' : 'unavailable',
      highlights: factualHighlights,
      watchouts,
      legalCheckRequired: true,
    },
    report,
  };
}
