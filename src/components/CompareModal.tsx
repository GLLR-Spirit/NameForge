import React, { useMemo, useState } from 'react';
import { useEscapeKey, useModalFocus } from '../hooks';
import {
  X,
  Copy,
  Check,
  Star,
  Plus,
  Scale,
  FileSearch,
  AlertCircle,
  Search,
  FolderOpen,
  Bookmark,
  Sparkles,
  Download,
  Trash2,
} from 'lucide-react';
import {
  findSavedEntry,
  getCollections,
  getGenerationHistory,
  getSavedNames,
  setStoredRating,
} from '../services/storage';
import { getAppSettings } from '../services/settings';
import { analyzeNameCompletely } from '../services/unifiedNameAnalysis';
import {
  compareNamesIntelligently,
  formatComparisonAsJson,
  formatComparisonAsText,
} from '../services/nameIntelligenceReport';
import { getCompareModalLabels } from '../i18n/compareModal';
import { getNameIntelligenceLabels } from '../i18n/nameIntelligenceLabels';
import { getNameDetailsLabels } from '../i18n/nameDetails';
import { getEnhancementsLabels } from '../i18n/enhancementsLabels';
import { getLocalizedGeneratorShortTitle } from '../i18n/generatorTitles';
import { getTextDirection } from '../utils/locale';
import { copyToClipboard } from '../utils/clipboard';
import { GeneratorId, GenLanguageCode } from '../types';
import { ComparisonCandidateSource, QualityCriterionKey } from '../types/nameInsight';

export interface CompareModalProps {
  initialNames: string[];
  availableBatchNames?: string[];
  defaultGeneratorId?: GeneratorId;
  generationLanguage?: GenLanguageCode;
  onInspectReport?: (name: string, generatorId: GeneratorId, style: string) => void;
  onClose: () => void;
  onUpdate?: () => void;
}

const COMPARISON_CRITERIA: QualityCriterionKey[] = [
  'readability',
  'pronunciation',
  'memorability',
  'distinctiveness',
  'categoryFit',
  'naturalness',
  'culturalSuitability',
  'brandPotential',
  'scriptIntegrity',
  'textHygiene',
];

const MAX_COMPARE_NAMES = 4;

interface CatalogCandidate {
  name: string;
  source: ComparisonCandidateSource;
  generatorId: GeneratorId;
  style: string;
  rating: number;
  note: string;
  saved: boolean;
  collectionId?: string;
  collectionName?: string;
  isBatchMember: boolean;
}

function inferLanguageForExternalEntry(
  name: string,
  fallbackLanguage: GenLanguageCode
): GenLanguageCode {
  if (/[\u0600-\u06FF\u0750-\u077F]/.test(name)) return 'ar';
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(name)) return 'ja';
  if (/[\uAC00-\uD7AF]/.test(name)) return 'ko';
  if (/[\u4E00-\u9FFF]/.test(name)) return 'zh';
  if (/[\u0400-\u04FF]/.test(name)) return 'ru';
  if (/[\u0900-\u097F]/.test(name)) return 'hi';
  if (/[\u0590-\u05FF]/.test(name)) return 'he';
  if (/[\u0370-\u03FF]/.test(name)) return 'el';
  if (/[\u0E00-\u0E7F]/.test(name)) return 'th';
  if (/[\u0980-\u09FF]/.test(name)) return 'bn';
  return fallbackLanguage;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  initialNames,
  availableBatchNames = [],
  defaultGeneratorId = 'fantasy',
  generationLanguage,
  onInspectReport,
  onClose,
  onUpdate,
}) => {
  useEscapeKey(onClose);
  const modalRef = useModalFocus<HTMLDivElement>();
  const [comparedNames, setComparedNames] = useState<string[]>(() => {
    const seen = new Set<string>();
    const seed: string[] = [];
    for (const raw of initialNames) {
      const n = raw.trim();
      if (n && !seen.has(n.toLowerCase())) {
        seen.add(n.toLowerCase());
        seed.push(n);
      }
      if (seed.length >= MAX_COMPARE_NAMES) break;
    }
    return seed;
  });

  const [customInput, setCustomInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | ComparisonCandidateSource>('all');
  const [collectionFilter, setCollectionFilter] = useState<string>('all');
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [comparisonCopied, setComparisonCopied] = useState(false);
  const [, setRatingTick] = useState(0);

  const settings = getAppSettings();
  const language = settings.language;
  const dir = getTextDirection(language);
  const t = getCompareModalLabels(language);
  const intel = getNameIntelligenceLabels(language);
  const common = getNameDetailsLabels(language);
  const enh = getEnhancementsLabels(language);

  const allSaved = getSavedNames();
  const allCollections = getCollections();
  const allHistory = getGenerationHistory();

  const collectionMap = useMemo(() => {
    const map = new Map<string, string>();
    allCollections.forEach((col) => map.set(col.id, col.name));
    return map;
  }, [allCollections]);

  const candidateCatalog = useMemo<CatalogCandidate[]>(() => {
    const map = new Map<string, CatalogCandidate>();

    // 1. Saved & Collection entries (highest metadata fidelity, never mutated)
    for (const entry of allSaved) {
      const key = entry.name.toLowerCase();
      const collectionName = entry.collectionId ? collectionMap.get(entry.collectionId) : undefined;
      const source: ComparisonCandidateSource = entry.collectionId ? 'collection' : 'saved';
      map.set(key, {
        name: entry.name,
        source,
        generatorId: (entry.generator || defaultGeneratorId) as GeneratorId,
        style: entry.style || 'default',
        rating: entry.rating || 0,
        note: entry.note || '',
        saved: Boolean(entry.saved),
        collectionId: entry.collectionId,
        collectionName,
        isBatchMember: availableBatchNames.some((b) => b.toLowerCase() === key),
      });
    }

    // 2. Current batch generated names
    for (const rawName of availableBatchNames) {
      const clean = rawName.trim();
      const key = clean.toLowerCase();
      if (!clean) continue;
      if (map.has(key)) {
        const existing = map.get(key)!;
        existing.isBatchMember = true;
      } else {
        map.set(key, {
          name: clean,
          source: 'generated',
          generatorId: defaultGeneratorId,
          style: 'default',
          rating: 0,
          note: '',
          saved: false,
          isBatchMember: true,
        });
      }
    }

    // 3. Recent generation history
    for (const hist of allHistory) {
      const clean = hist.name.trim();
      const key = clean.toLowerCase();
      if (!clean || map.has(key)) continue;
      map.set(key, {
        name: clean,
        source: 'generated',
        generatorId: (hist.generator || defaultGeneratorId) as GeneratorId,
        style: hist.style || 'default',
        rating: 0,
        note: '',
        saved: false,
        isBatchMember: false,
      });
    }

    return Array.from(map.values());
  }, [allSaved, allHistory, availableBatchNames, collectionMap, defaultGeneratorId]);

  const filteredCatalog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return candidateCatalog.filter((item) => {
      if (sourceFilter !== 'all') {
        if (sourceFilter === 'saved' && item.source !== 'saved' && !item.saved) return false;
        if (sourceFilter === 'collection' && !item.collectionId) return false;
        if (sourceFilter === 'generated' && item.source !== 'generated' && !item.isBatchMember) return false;
      }
      if (collectionFilter === '__none__' && item.collectionId) return false;
      if (collectionFilter !== 'all' && collectionFilter !== '__none__' && item.collectionId !== collectionFilter) {
        return false;
      }
      if (!q) return true;
      const genTitle = getLocalizedGeneratorShortTitle(item.generatorId, language, item.generatorId).toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        genTitle.includes(q) ||
        (item.collectionName || '').toLowerCase().includes(q) ||
        item.note.toLowerCase().includes(q)
      );
    });
  }, [candidateCatalog, searchQuery, sourceFilter, collectionFilter, language]);

  const comparisonReport = useMemo(() => {
    const baseFallbackLanguage = generationLanguage ?? settings.defaultGenLanguage;
    const candidates = comparedNames.map((name) => {
      const key = name.toLowerCase();
      const catalogMatch = candidateCatalog.find((c) => c.name.toLowerCase() === key);
      const saved = findSavedEntry(name);
      const hist = allHistory.find((h) => h.name.toLowerCase() === key);
      const isBatchMember = availableBatchNames.some((b) => b.toLowerCase() === key);
      const generatorId = (catalogMatch?.generatorId || saved?.generator || hist?.generator || defaultGeneratorId) as GeneratorId;
      const style = catalogMatch?.style || saved?.style || hist?.style || 'default';
      const collectionId = catalogMatch?.collectionId || saved?.collectionId;
      const collectionName = collectionId ? collectionMap.get(collectionId) : undefined;
      const source: ComparisonCandidateSource = collectionId
        ? 'collection'
        : saved || catalogMatch?.saved
          ? 'saved'
          : 'generated';

      const candidateGenLang: GenLanguageCode = isBatchMember
        ? baseFallbackLanguage
        : inferLanguageForExternalEntry(name, baseFallbackLanguage);

      return {
        name,
        generatorId,
        style,
        rating: saved?.rating || catalogMatch?.rating || 0,
        note: saved?.note || catalogMatch?.note || '',
        saved: Boolean(saved?.saved || catalogMatch?.saved),
        source,
        collectionId,
        collectionName,
        generationLanguage: candidateGenLang,
        isCustom: !saved && !hist && !isBatchMember,
      };
    });

    return compareNamesIntelligently(
      candidates,
      (candidate, allNames) =>
        analyzeNameCompletely({
          name: candidate.name,
          generatorId: candidate.generatorId,
          style: candidate.style,
          interfaceLanguage: language,
          generationLanguage: candidate.generationLanguage ?? baseFallbackLanguage,
          batchNames: allNames,
          humanNaturalness: candidate.rating && candidate.rating > 0 ? candidate.rating : undefined,
          isCustomInput:
            !findSavedEntry(candidate.name) &&
            !allHistory.some((h) => h.name.toLowerCase() === candidate.name.toLowerCase()) &&
            !availableBatchNames.some((b) => b.toLowerCase() === candidate.name.toLowerCase()),
        }).report,
      language
    );
  }, [
    comparedNames,
    candidateCatalog,
    allHistory,
    availableBatchNames,
    collectionMap,
    defaultGeneratorId,
    language,
    generationLanguage,
    settings.defaultGenLanguage,
  ]);

  const handleCopy = async (name: string) => {
    if (await copyToClipboard(name)) {
      setCopiedName(name);
      window.setTimeout(() => setCopiedName(null), 1200);
    }
  };

  const handleCopyComparison = async () => {
    if (comparisonReport.entries.length === 0) return;
    if (await copyToClipboard(formatComparisonAsText(comparisonReport, language))) {
      setComparisonCopied(true);
      window.setTimeout(() => setComparisonCopied(false), 1600);
    }
  };

  const handleDownloadComparison = (format: 'txt' | 'json') => {
    if (comparisonReport.entries.length === 0) return;
    const payload =
      format === 'txt'
        ? formatComparisonAsText(comparisonReport, language)
        : formatComparisonAsJson(comparisonReport);
    const mime =
      format === 'txt' ? 'text/plain;charset=utf-8' : 'application/json;charset=utf-8';
    const blob = new Blob([payload], { type: mime });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `nameforge-comparison-${Date.now()}.${format}`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleRate = (name: string, r: number, currentRating: number) => {
    const next = currentRating === r ? 0 : r;
    setStoredRating(name, next);
    setRatingTick((tick) => tick + 1);
    if (onUpdate) onUpdate();
  };

  const handleRemove = (name: string) => {
    setComparedNames((prev) => prev.filter((n) => n.toLowerCase() !== name.toLowerCase()));
  };

  const isSelected = (name: string) =>
    comparedNames.some((n) => n.toLowerCase() === name.toLowerCase());

  const handleToggleCandidate = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    setComparedNames((prev) => {
      const exists = prev.some((n) => n.toLowerCase() === clean.toLowerCase());
      if (exists) {
        return prev.filter((n) => n.toLowerCase() !== clean.toLowerCase());
      }
      if (prev.length >= MAX_COMPARE_NAMES) {
        return prev;
      }
      return [...prev, clean];
    });
  };

  const handleAddName = (raw: string) => {
    const clean = raw.trim();
    if (clean && comparedNames.length < MAX_COMPARE_NAMES && !isSelected(clean)) {
      setComparedNames((prev) => [...prev, clean]);
    }
  };

  const getSourceLabel = (source?: ComparisonCandidateSource, collectionName?: string) => {
    if (source === 'collection') {
      return collectionName
        ? `${enh.compare.sourceCollection}: ${collectionName}`
        : enh.compare.sourceCollection;
    }
    if (source === 'saved') return enh.compare.sourceSaved;
    return enh.compare.sourceGenerated;
  };

  const formatScoreOrFallback = (score: number | null, status?: string) => {
    if (score !== null) return `${score}/100`;
    if (status === 'insufficient-data') return enh.compare.insufficientData;
    return enh.compare.notEvaluated;
  };

  return (
    <div
      data-modal-layer="top"
      className="fixed inset-0 z-[70] flex items-center justify-center p-2.5 sm:p-6 bg-slate-950/65 dark:bg-black/80 backdrop-blur-md overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
        data-testid="compare-modal-dialog"
        dir={dir}
        lang={language}
        className="w-full max-w-6xl bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-700/80 rounded-3xl p-4 sm:p-7 shadow-2xl relative text-start my-auto text-slate-900 dark:text-slate-100 max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 dark:bg-sky-500/15 text-blue-700 dark:text-sky-300 border border-blue-200/70 dark:border-sky-500/30 flex items-center justify-center">
              <Scale className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h2 id="compare-modal-title" className="text-lg sm:text-2xl font-black text-slate-950 dark:text-white">
                {t.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {t.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {comparisonReport.entries.length > 0 && (
              <>
                <button
                  type="button"
                  data-testid="compare-copy-button"
                  onClick={() => void handleCopyComparison()}
                  className="nf-btn-secondary py-2 px-3 text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {comparisonCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      <span>{enh.compare.comparisonCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{enh.compare.copyComparison}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  data-testid="compare-export-txt"
                  onClick={() => handleDownloadComparison('txt')}
                  className="nf-btn-secondary py-2 px-2.5 text-xs inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{enh.compare.exportTxt}</span>
                </button>
                <button
                  type="button"
                  data-testid="compare-export-json"
                  onClick={() => handleDownloadComparison('json')}
                  className="nf-btn-secondary py-2 px-2.5 text-xs inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{enh.compare.exportJson}</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 shrink-0 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
              aria-label={common.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Compare with My Collections & Saved Selector Panel */}
        <section
          data-testid="compare-selector-panel"
          aria-label={enh.compare.compareWithCollectionsTitle}
          className="mt-4 rounded-2xl bg-slate-50 dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <FolderOpen className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" aria-hidden="true" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {enh.compare.compareWithCollectionsTitle}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span
                data-testid="compare-selected-counter"
                className="text-xs font-bold tabular-nums px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                {enh.compare.selectedCounter
                  .replace('{count}', String(comparedNames.length))
                  .replace('{max}', String(MAX_COMPARE_NAMES))}
              </span>
              {comparedNames.length > 0 && (
                <button
                  type="button"
                  data-testid="compare-clear-selection"
                  onClick={() => setComparedNames([])}
                  className="nf-btn-ghost px-2.5 py-1 text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 inline-flex items-center gap-1 cursor-pointer rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{enh.compare.clearSelection}</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter & Search & Custom Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            <div className="md:col-span-4 relative">
              <Search
                className="w-3.5 h-3.5 text-slate-500 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                data-testid="compare-candidate-search"
                aria-label={enh.compare.searchPlaceholder}
                placeholder={enh.compare.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="nf-input h-10 w-full ps-8 pe-3 text-xs"
              />
            </div>

            <div className="md:col-span-4">
              <select
                data-testid="compare-collection-filter"
                aria-label={enh.compare.allCollectionsFilter}
                value={collectionFilter}
                onChange={(e) => setCollectionFilter(e.target.value)}
                className="nf-input h-10 w-full px-3 text-xs"
              >
                <option value="all">{enh.compare.allCollectionsFilter}</option>
                <option value="__none__">{enh.compare.unassignedCollection}</option>
                {allCollections.map((col) => {
                  const colCount = allSaved.filter((s) => s.collectionId === col.id).length;
                  return (
                    <option key={col.id} value={col.id}>
                      {col.name} ({colCount})
                    </option>
                  );
                })}
              </select>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (customInput.trim() && comparedNames.length < MAX_COMPARE_NAMES) {
                  handleAddName(customInput);
                  setCustomInput('');
                }
              }}
              className="md:col-span-4 flex items-center gap-2"
            >
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={intel.comparison.customPlaceholder}
                disabled={comparedNames.length >= MAX_COMPARE_NAMES}
                className="nf-input h-10 flex-1 min-w-0 px-3 text-xs disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!customInput.trim() || comparedNames.length >= MAX_COMPARE_NAMES}
                className="nf-btn-secondary h-10 px-3 text-xs font-bold inline-flex items-center gap-1 shrink-0 cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{intel.comparison.addCustomButton}</span>
              </button>
            </form>
          </div>

          {/* Source tabs */}
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={enh.compare.sourceFilterAll}>
            {(
              [
                { key: 'all', label: enh.compare.sourceFilterAll },
                { key: 'generated', label: enh.compare.sourceGenerated },
                { key: 'saved', label: enh.compare.sourceSaved },
                { key: 'collection', label: enh.compare.sourceCollection },
              ] as const
            ).map((tab) => {
              const active = sourceFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSourceFilter(tab.key)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    active
                      ? 'bg-rose-700 text-white border-rose-700 dark:bg-rose-600 dark:border-rose-500'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}

            {comparedNames.length >= MAX_COMPARE_NAMES && (
              <span className="ms-auto text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                {enh.compare.maxSelectedHint}
              </span>
            )}
          </div>

          {/* Candidate Checkboxes Grid */}
          {filteredCatalog.length > 0 ? (
            <div className="max-h-44 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pe-1">
              {filteredCatalog.map((item) => {
                const checked = isSelected(item.name);
                const disabled = !checked && comparedNames.length >= MAX_COMPARE_NAMES;
                const genTitle = getLocalizedGeneratorShortTitle(
                  item.generatorId,
                  language,
                  item.generatorId
                );
                return (
                  <label
                    key={`${item.source}-${item.name}`}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs transition ${
                      checked
                        ? 'bg-rose-50/90 dark:bg-rose-950/35 border-rose-300 dark:border-rose-700 text-slate-950 dark:text-white'
                        : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-slate-300 dark:hover:border-slate-600'}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => handleToggleCandidate(item.name)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-rose-700 focus:ring-rose-600 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-bold truncate">{item.name}</span>
                        {item.rating > 0 && (
                          <span className="inline-flex items-center gap-0.5 text-[11px] tabular-nums text-amber-600 dark:text-amber-400 shrink-0">
                            <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                            <span>{item.rating}</span>
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-slate-600 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1 font-semibold">
                          {item.source === 'collection' ? (
                            <FolderOpen className="w-3 h-3 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                          ) : item.source === 'saved' ? (
                            <Bookmark className="w-3 h-3 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                          ) : (
                            <Sparkles className="w-3 h-3 text-blue-600 dark:text-sky-400" aria-hidden="true" />
                          )}
                          <span>{getSourceLabel(item.source, item.collectionName)}</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{genTitle}</span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400 py-2">
              {enh.compare.noCandidatesFound}
            </p>
          )}
        </section>

        {/* Cross-language / Cross-category Notice */}
        {comparisonReport.crossContextWarning && (
          <div
            data-testid="compare-cross-context-warning"
            role="note"
            className="mt-4 rounded-2xl border border-amber-300 dark:border-amber-700/70 bg-amber-50 dark:bg-amber-950/35 px-4 py-3 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700 dark:text-amber-300" aria-hidden="true" />
            <div className="space-y-0.5">
              <p className="font-bold">{enh.compare.crossContextTitle}</p>
              <p className="leading-relaxed">{comparisonReport.crossContextWarning}</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {comparisonReport.entries.length === 0 ? (
          <div className="text-center py-12 text-slate-600 dark:text-slate-400 text-sm">
            {t.empty}
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            {/* Candidate Summary Strip */}
            <div
              className={`grid gap-3 ${
                comparisonReport.entries.length === 1
                  ? 'grid-cols-1'
                  : comparisonReport.entries.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : comparisonReport.entries.length === 3
                      ? 'grid-cols-1 sm:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {comparisonReport.entries.map((entry) => (
                <div
                  key={entry.name}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#11192c] border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-3 relative"
                >
                  <button
                    type="button"
                    onClick={() => handleRemove(entry.name)}
                    className="absolute top-3 end-3 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 p-1.5 rounded-lg transition cursor-pointer"
                    title={t.remove}
                    aria-label={`${t.remove}: ${entry.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-700 dark:text-rose-300 pe-8">
                      {entry.source === 'collection' ? (
                        <FolderOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      ) : entry.source === 'saved' ? (
                        <Bookmark className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 shrink-0 text-blue-700 dark:text-sky-300" aria-hidden="true" />
                      )}
                      <span className="truncate">{getSourceLabel(entry.source, entry.collectionName)}</span>
                    </div>

                    <div className="text-[11px] font-semibold text-blue-700 dark:text-sky-300 pe-6 mt-1 truncate">
                      {getLocalizedGeneratorShortTitle(entry.generatorId, language, entry.generatorId)} ·{' '}
                      {entry.targetLanguageLabel || entry.report.identification.targetLanguage}
                    </div>

                    <h3 className="text-xl font-black text-slate-950 dark:text-white break-words mt-1 pe-6">
                      {entry.name}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tabular-nums text-slate-600 dark:text-slate-300">
                      <span>
                        {intel.comparison.lengthMetric}:{' '}
                        <strong className="text-slate-900 dark:text-white">{entry.letterCount}</strong>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {intel.comparison.measuredAvgMetric}:{' '}
                        <strong className="text-slate-900 dark:text-white">
                          {entry.measuredAverage !== null
                            ? `${entry.measuredAverage}/100`
                            : enh.compare.notEvaluated}
                        </strong>
                      </span>
                    </div>

                    {/* 5-star rating */}
                    <div className="flex items-center gap-1 mt-2.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRate(entry.name, star, entry.rating)}
                          className="p-0.5 text-slate-400 dark:text-slate-600 hover:text-amber-500 transition cursor-pointer"
                          title={t.rate.replace('{count}', String(star))}
                          aria-label={t.rate.replace('{count}', String(star))}
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${
                              star <= entry.rating
                                ? 'text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400'
                                : 'text-slate-400 dark:text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-[11px] tabular-nums text-slate-600 dark:text-slate-400 ms-1">
                        {entry.rating > 0 ? `${entry.rating}/5` : t.unrated}
                      </span>
                    </div>

                    {entry.note && (
                      <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 italic line-clamp-2">
                        “{entry.note}”
                      </p>
                    )}
                  </div>

                  <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                    {onInspectReport && (
                      <button
                        type="button"
                        onClick={() => onInspectReport(entry.name, entry.generatorId, entry.style)}
                        className="nf-btn-secondary py-2 px-2.5 text-xs inline-flex items-center justify-center gap-1 cursor-pointer"
                        title={intel.comparison.inspectReport}
                      >
                        <FileSearch className="w-3.5 h-3.5" aria-hidden="true" />
                        <span className="hidden sm:inline">{intel.comparison.inspectReport}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => void handleCopy(entry.name)}
                      className="nf-btn-primary flex-1 py-2 px-3 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copiedName === entry.name ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{common.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t.chooseCopy}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Side-by-side Criteria Matrix Table (md+ screens) */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-start border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#11192c] border-b border-slate-200 dark:border-slate-800">
                    <th className="py-3 px-4 font-bold text-slate-700 dark:text-slate-200 text-start">
                      {intel.comparison.tableCriterion}
                    </th>
                    {comparisonReport.entries.map((entry) => (
                      <th
                        key={entry.name}
                        className="py-3 px-4 font-black text-slate-950 dark:text-white text-start"
                      >
                        <div>{entry.name}</div>
                        <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                          {getLocalizedGeneratorShortTitle(entry.generatorId, language, entry.generatorId)} ·{' '}
                          {entry.targetLanguageLabel}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {COMPARISON_CRITERIA.map((criterionKey) => (
                    <tr key={criterionKey} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                      <td className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-200">
                        {intel.criteriaLabels[criterionKey]}
                      </td>
                      {comparisonReport.entries.map((entry) => {
                        const c = entry.report.quality.criteria.find((item) => item.key === criterionKey);
                        return (
                          <td key={`${entry.name}-${criterionKey}`} className="py-2.5 px-4 align-top">
                            <div className="flex flex-wrap items-center gap-1.5 tabular-nums">
                              <span className="font-bold text-slate-900 dark:text-white">
                                {formatScoreOrFallback(c?.score ?? null, c?.verificationStatus)}
                              </span>
                              {c && c.score !== null && (
                                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                  · {intel.verificationStatuses[c.verificationStatus]}
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="bg-slate-50/50 dark:bg-[#11192c]/50">
                    <td className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-200">
                      {intel.labels.overallStatus}
                    </td>
                    {comparisonReport.entries.map((entry) => (
                      <td
                        key={`${entry.name}-overall`}
                        className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {intel.verificationStatuses[entry.report.identification.overallVerificationStatus]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Comparison Rows */}
            <div className="md:hidden space-y-3">
              {COMPARISON_CRITERIA.map((criterionKey) => (
                <div
                  key={criterionKey}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#11192c] p-3 space-y-2"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {intel.criteriaLabels[criterionKey]}
                  </p>
                  <div className="space-y-1.5">
                    {comparisonReport.entries.map((entry) => {
                      const c = entry.report.quality.criteria.find((item) => item.key === criterionKey);
                      return (
                        <div
                          key={`${entry.name}-${criterionKey}`}
                          className="flex items-center justify-between gap-2 text-xs"
                        >
                          <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                            {entry.name}
                          </span>
                          <span className="tabular-nums font-bold text-slate-900 dark:text-white shrink-0">
                            {formatScoreOrFallback(c?.score ?? null, c?.verificationStatus)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Honest Comparative Summary */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090f1e] p-4 space-y-2 text-xs">
              <p className="font-bold text-slate-900 dark:text-white">
                {intel.comparison.summaryTitle}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-700 dark:text-slate-300">
                <span>
                  {intel.comparison.compactLeader}{' '}
                  <strong className="text-slate-950 dark:text-white">
                    {comparisonReport.mostCompactNames.join(', ') || '—'}
                  </strong>
                </span>
                <span>
                  {intel.comparison.readabilityLeader}{' '}
                  <strong className="text-slate-950 dark:text-white">
                    {comparisonReport.bestReadabilityNames.join(', ') || '—'}
                  </strong>
                </span>
                {comparisonReport.highestRatedNames.length > 0 && (
                  <span>
                    {intel.comparison.ratingLeader}{' '}
                    <strong className="text-slate-950 dark:text-white">
                      {comparisonReport.highestRatedNames.join(', ')}
                    </strong>
                  </span>
                )}
              </div>
              {comparisonReport.summaryObservations.map((obs, idx) => (
                <p key={idx} className="text-slate-600 dark:text-slate-400">
                  {obs}
                </p>
              ))}
              <p className="flex items-start gap-2 pt-1 text-[11px] text-amber-700 dark:text-amber-300">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{comparisonReport.verificationCaveat}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
