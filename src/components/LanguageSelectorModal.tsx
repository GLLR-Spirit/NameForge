import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Check, Globe } from 'lucide-react';
import { LanguageCode } from '../types';
import {
  SUPPORTED_LANGUAGES,
  getAlphabeticalLanguages,
  getAppSettings,
  saveAppSettings,
} from '../services/settings';
import { isLanguageFullyTranslated, FULL_TRANSLATION_LANGUAGES } from '../i18n';
import { getLocaleEntry } from '../i18n/localeRegistry';
import { formatLanguageModalDescription, getLanguageModalLabels } from '../i18n/languageModal';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageSelected?: (lang: LanguageCode) => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  onLanguageSelected,
}) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'full' | 'Europe' | 'Asie' | 'Moyen-Orient' | 'Afrique' | 'Inde & Asie du Sud'>('all');
  const [currentLang, setCurrentLang] = useState<LanguageCode>(getAppSettings().language);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const labels = getLanguageModalLabels(currentLang);

  useEffect(() => {
    if (!isOpen) return;

    setCurrentLang(getAppSettings().language);
    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    inputRef.current?.focus();

    return () => {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.getAttribute('aria-hidden') !== 'true');
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const sortedLanguages = useMemo(() => getAlphabeticalLanguages(), []);

  const filteredLanguages = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sortedLanguages.filter((l) => {
      let matchesTab = true;
      if (activeTab === 'full') {
        matchesTab = isLanguageFullyTranslated(l.code);
      } else if (activeTab !== 'all') {
        matchesTab = l.region === activeTab;
      }
      if (!matchesTab) return false;
      if (!q) return true;
      return (
        l.label.toLowerCase().includes(q) ||
        l.native.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
      );
    });
  }, [sortedLanguages, search, activeTab]);

  const handleSelect = (code: LanguageCode) => {
    saveAppSettings({ language: code });
    setCurrentLang(code);
    if (onLanguageSelected) {
      onLanguageSelected(code);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-modal-title"
      dir={SUPPORTED_LANGUAGES.find((language) => language.code === currentLang)?.dir || 'ltr'}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-3xl bg-white dark:bg-[#0c1224] border border-slate-200 dark:border-slate-700/80 rounded-3xl shadow-2xl flex flex-col text-slate-900 dark:text-slate-100 overflow-hidden max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-violet-500/20 border border-blue-200 dark:border-violet-500/40 flex items-center justify-center text-blue-700 dark:text-violet-300">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 id="lang-modal-title" className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white flex items-center gap-2 flex-wrap">
                <span>{labels.title}</span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  ({SUPPORTED_LANGUAGES.length} {labels.count})
                </span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {formatLanguageModalDescription(labels.description, SUPPORTED_LANGUAGES.length, FULL_TRANSLATION_LANGUAGES.length)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition cursor-pointer"
            aria-label={labels.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 space-y-3 bg-white dark:bg-[#0a0f1d]">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute start-4 top-1/2 -translate-y-1/2" />
            <input
              ref={inputRef}
              type="text"
              placeholder={labels.searchPlaceholder}
              aria-label={labels.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="nf-input w-full h-11 ps-12 pe-10 text-sm font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs px-2 py-1 cursor-pointer"
                aria-label={labels.reset}
              >
                ✕
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: `${labels.all} (${SUPPORTED_LANGUAGES.length})` },
              { id: 'full', label: `${labels.fullyTranslated} (${FULL_TRANSLATION_LANGUAGES.length})` },
              { id: 'Europe', label: labels.europe },
              { id: 'Asie', label: labels.asia },
              { id: 'Moyen-Orient', label: labels.middleEast },
              { id: 'Inde & Asie du Sud', label: labels.southAsia },
              { id: 'Afrique', label: labels.africa },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                aria-pressed={activeTab === tab.id}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                  activeTab === tab.id
                    ? 'bg-blue-600 dark:bg-violet-600 text-white border-blue-600 dark:border-violet-500'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Language Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[58vh] flex-1 bg-slate-50/50 dark:bg-[#0c1224]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {filteredLanguages.map((lang) => {
              const isSelected = currentLang === lang.code;
              const isFull = isLanguageFullyTranslated(lang.code);
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  aria-pressed={isSelected}
                  className={`p-3 rounded-2xl border text-start transition flex items-center justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-violet-600/25 border-blue-600 dark:border-violet-500 text-slate-950 dark:text-white shadow-sm'
                      : 'bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-violet-500/60 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      aria-hidden="true"
                      className="nf-bidi-ltr w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[11px] font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-200 shrink-0"
                    >
                      {lang.code}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-950 dark:text-white truncate flex items-center gap-1.5">
                        <span className="truncate">{lang.native}</span>
                        {lang.dir === 'rtl' && (
                          <span className="nf-bidi-ltr text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300 shrink-0">
                            RTL
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">
                        {lang.label} · {isFull ? labels.complete : labels.fallback}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-blue-600 dark:bg-violet-500 flex items-center justify-center shrink-0 text-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {filteredLanguages.length === 0 && (
            <div className="text-center py-12 text-slate-600 dark:text-slate-400 space-y-2">
              <p className="text-sm font-semibold">{labels.noResults} « {search} ».</p>
              <button
                onClick={() => {
                  setSearch('');
                  setActiveTab('all');
                }}
                className="text-xs text-blue-700 dark:text-violet-300 hover:underline cursor-pointer font-semibold"
                aria-label={labels.reset}
              >
                {labels.reset}
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090e1c] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
          <span>
            {labels.active}{' '}
            <strong className="text-slate-950 dark:text-white">
              {SUPPORTED_LANGUAGES.find((l) => l.code === currentLang)?.native || currentLang}
            </strong>{' '}
            ({isLanguageFullyTranslated(currentLang) ? labels.completeStatus : labels.standardStatus}
            {(() => {
              const entry = getLocaleEntry(currentLang);
              return entry.dir === 'rtl' && entry.translationStatus === 'fallback'
                ? ' · RTL UI + EN'
                : '';
            })()})
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            {FULL_TRANSLATION_LANGUAGES.length} {labels.fullCount} · {SUPPORTED_LANGUAGES.length - FULL_TRANSLATION_LANGUAGES.length} {labels.fallbackCount} · UTF-8 & RTL
          </span>
        </div>
      </div>
    </div>
  );
};
