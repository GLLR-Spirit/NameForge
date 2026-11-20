import { AppSettings, GenLanguageCode, LanguageCode, TextSizeMode, ThemeMode } from '../types';
import {
  LOCALE_REGISTRY,
  isCatalogLocale,
  resolveCanonicalLocale,
  resolveDefaultGenLanguageForLocale,
  resolveLocaleDirection,
} from '../i18n/localeRegistry';

const SETTINGS_KEY = 'nameforge_settings';

export interface LanguageMeta {
  code: LanguageCode;
  label: string;
  native: string;
  dir: 'ltr' | 'rtl';
  flag: string;
  region?: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = LOCALE_REGISTRY.map(
  ({ code, label, native, dir, flag, region }) => ({
    code,
    label,
    native,
    dir,
    flag,
    region,
  })
);

export function getAlphabeticalLanguages(): LanguageMeta[] {
  return [...SUPPORTED_LANGUAGES].sort((a, b) => {
    return a.label.localeCompare(b.label, 'fr', { sensitivity: 'base' });
  });
}

export const GEN_LANGUAGES: {
  code: GenLanguageCode;
  label: string;
  desc: string;
}[] = [
  { code: 'auto', label: 'Auto (By Style)', desc: 'Follows interface language and category archetype' },
  { code: 'fr', label: 'Français', desc: 'French roots and clear melodic phonetics' },
  { code: 'en', label: 'English', desc: 'English and Anglo-Saxon roots' },
  { code: 'ja', label: '日本語 (Japanese)', desc: 'Japanese syllables and kana forms' },
  { code: 'ar', label: 'العربية (Arabic)', desc: 'Arabic roots and poetic cadence' },
  { code: 'latin', label: 'Latin & Mythic', desc: 'Classical Latin and melodic roots' },
  { code: 'nordic', label: 'Nordic & Runic', desc: 'Old Norse and crisp Nordic roots' },
  { code: 'tech', label: 'Cyber & Tech', desc: 'Modern compound syllables and neologisms' },
  { code: 'es', label: 'Español', desc: 'Spanish roots and phonology' },
  { code: 'de', label: 'Deutsch', desc: 'Germanic roots and compounds' },
  { code: 'it', label: 'Italiano', desc: 'Melodic Italian phonology' },
  { code: 'pt', label: 'Português', desc: 'Portuguese roots and cadence' },
  { code: 'tr', label: 'Türkçe', desc: 'Turkish roots and vowel harmony' },
  { code: 'ko', label: '한국어 (Korean)', desc: 'Korean syllables and Hangul forms' },
  { code: 'zh', label: '中文 (Chinese)', desc: 'Chinese characters and naming roots' },
  { code: 'ru', label: 'Русский', desc: 'Slavic roots and Cyrillic forms' },
  { code: 'hi', label: 'हिन्दी (Hindi)', desc: 'Devanagari roots and Sanskrit heritage' },
  { code: 'nl', label: 'Nederlands', desc: 'Dutch phonetics and word stems' },
  { code: 'pl', label: 'Polski', desc: 'Polish stems and Slavic endings' },
  { code: 'sv', label: 'Svenska', desc: 'Swedish stems and Nordic forms' },
  { code: 'vi', label: 'Tiếng Việt', desc: 'Vietnamese syllables and compound names' },
  { code: 'id', label: 'Bahasa Indonesia', desc: 'Indonesian roots and forms' },
  { code: 'th', label: 'ไทย (Thai)', desc: 'Thai syllables and traditional forms' },
  { code: 'el', label: 'Ελληνικά (Greek)', desc: 'Hellenic roots and Greek script' },
  { code: 'he', label: 'עברית (Hebrew)', desc: 'Hebrew roots and traditional forms' },
  { code: 'cs', label: 'Čeština', desc: 'Czech roots and endings' },
  { code: 'ro', label: 'Română', desc: 'Romanian stems and cadence' },
  { code: 'da', label: 'Dansk', desc: 'Danish stems and compounds' },
  { code: 'fi', label: 'Suomi', desc: 'Finnish phonetics and stems' },
  { code: 'uk', label: 'Українська', desc: 'Ukrainian roots and Cyrillic forms' },
  { code: 'bn', label: 'বাংলা (Bengali)', desc: 'Bengali roots and poetic compounds' },
  { code: 'nb', label: 'Norsk bokmål', desc: 'Norwegian roots and compounds' },
];

const DEFAULT_SETTINGS: AppSettings = {
  language: 'en',
  theme: 'light',
  textSize: 'normal',
  reduceMotion: false,
  defaultGenLanguage: 'auto',
};

export function normalizeAppSettings(raw: unknown): AppSettings {
  const parsed = raw && typeof raw === 'object' ? raw as Partial<AppSettings> : {};
  // Legacy code: earlier versions stored Norwegian as "no"; it resolves via localeRegistry to "nb".
  const rawLang = String(parsed.language || '');
  const language = isCatalogLocale(rawLang)
    ? resolveCanonicalLocale(rawLang)
    : DEFAULT_SETTINGS.language;
  const theme: ThemeMode = parsed.theme === 'dark' || parsed.theme === 'light' || parsed.theme === 'system'
    ? parsed.theme
    : DEFAULT_SETTINGS.theme;
  const textSize: TextSizeMode = parsed.textSize === 'normal' || parsed.textSize === 'large' || parsed.textSize === 'compact'
    ? parsed.textSize
    : DEFAULT_SETTINGS.textSize;
  const defaultGenLanguage: GenLanguageCode = GEN_LANGUAGES.some((item) => item.code === parsed.defaultGenLanguage)
    ? parsed.defaultGenLanguage!
    : DEFAULT_SETTINGS.defaultGenLanguage;

  return {
    language,
    theme,
    textSize,
    reduceMotion: typeof parsed.reduceMotion === 'boolean'
      ? parsed.reduceMotion
      : DEFAULT_SETTINGS.reduceMotion,
    defaultGenLanguage,
  };
}

/** Interface languages that ship complete translations (used for first-visit browser detection). */
const DETECTABLE_LANGUAGES = [
  'en', 'fr', 'es', 'de', 'it', 'pt', 'ar', 'tr', 'ja', 'ko', 'zh', 'ru', 'hi', 'nl', 'pl', 'sv',
  'vi', 'id', 'th', 'el', 'he', 'cs', 'ro', 'da', 'fi', 'uk', 'bn', 'nb',
];

/**
 * Picks the interface language for a first visit from the browser preferences.
 * Norwegian variants (no, nn, nb) map to Bokmål; Chinese variants map to the simplified-Chinese pack;
 * anything unsupported keeps the default (English). An explicit choice saved later always wins.
 */
export function detectBrowserLanguage(preferred?: readonly string[]): LanguageCode {
  const list = preferred ?? (typeof navigator !== 'undefined' ? navigator.languages || [navigator.language] : []);
  for (const entry of list) {
    const primary = String(entry || '').toLowerCase().split('-')[0];
    const code = primary === 'no' || primary === 'nn' ? 'nb' : primary === 'iw' ? 'he' : primary;
    if (DETECTABLE_LANGUAGES.includes(code)) return code as LanguageCode;
  }
  return DEFAULT_SETTINGS.language;
}

/**
 * Resolves the language used to build names. An explicit choice always wins; in "auto" mode names follow the
 * interface language when it ships a phonetic profile, otherwise English (the interface text falls back to
 * English for those languages too, so names never silently come from the French source data).
 * The interface language, the name language and the style stay independent settings.
 */
export function resolveGenerationLanguage(selected: GenLanguageCode, interfaceLanguage: LanguageCode): GenLanguageCode {
  if (selected !== 'auto') return selected;
  return resolveDefaultGenLanguageForLocale(interfaceLanguage);
}

export function getAppSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS, language: detectBrowserLanguage() };
    return normalizeAppSettings(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveAppSettings(newSettings: Partial<AppSettings>): AppSettings {
  try {
    const current = getAppSettings();
    // Callers can pass runtime values that bypass TypeScript (e.g. stale UI state or imported data).
    // Normalize the merged object before persisting or applying it to the document.
    const updated = normalizeAppSettings({ ...current, ...newSettings });
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    applySettingsToDOM(updated);
    notifySettingsChange();
    return updated;
  } catch (e) {
    console.error('Failed to save settings', e);
    return DEFAULT_SETTINGS;
  }
}

let systemThemeListenerRegistered = false;
let reducedMotionListenerRegistered = false;

export function applySettingsToDOM(settings: AppSettings): void {
  if (typeof document === 'undefined') return;

  // Keep "System" mode and OS reduced-motion preference live if changed mid-session.
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    if (!systemThemeListenerRegistered) {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const syncSystemTheme = () => {
        if (getAppSettings().theme === 'system') applySettingsToDOM(getAppSettings());
      };
      if (typeof media.addEventListener === 'function') {
        media.addEventListener('change', syncSystemTheme);
      } else {
        media.addListener(syncSystemTheme);
      }
      systemThemeListenerRegistered = true;
    }

    if (!reducedMotionListenerRegistered) {
      const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
      const syncMotion = () => {
        applySettingsToDOM(getAppSettings());
      };
      if (typeof motionMedia.addEventListener === 'function') {
        motionMedia.addEventListener('change', syncMotion);
      } else {
        motionMedia.addListener(syncMotion);
      }
      reducedMotionListenerRegistered = true;
    }
  }
  const root = document.documentElement;

  // Language & Direction
  root.lang = settings.language;
  root.dir = resolveLocaleDirection(settings.language);

  // Theme
  let isDark = settings.theme === 'dark';
  if (settings.theme === 'light') {
    isDark = false;
  } else if (settings.theme === 'system') {
    isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  if (isDark) {
    root.classList.add('dark');
    root.classList.remove('light');
    if (root.style) root.style.colorScheme = 'dark';
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
    if (root.style) root.style.colorScheme = 'light';
  }

  // Text size
  root.classList.remove('text-size-compact', 'text-size-normal', 'text-size-large');
  root.classList.add(`text-size-${settings.textSize}`);

  // Reduce motion (respects both explicit app toggle and OS prefers-reduced-motion)
  const osReduceMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const effectiveReduceMotion = Boolean(settings.reduceMotion || osReduceMotion);

  if (effectiveReduceMotion) {
    root.classList.add('reduce-motion');
  } else {
    root.classList.remove('reduce-motion');
  }
  root.dataset.reduceMotion = String(effectiveReduceMotion);
}

export function subscribeToSettings(callback: (settings: AppSettings) => void): () => void {
  const handler = () => callback(getAppSettings());
  const storageHandler = (event: StorageEvent) => {
    // Synchronize settings changed in another tab without reacting to unrelated storage writes.
    if (event.key === SETTINGS_KEY || event.key === null) {
      const settings = getAppSettings();
      applySettingsToDOM(settings);
      callback(settings);
    }
  };

  window.addEventListener('nameforge:settings', handler);
  window.addEventListener('storage', storageHandler);
  return () => {
    window.removeEventListener('nameforge:settings', handler);
    window.removeEventListener('storage', storageHandler);
  };
}

function notifySettingsChange() {
  try {
    window.dispatchEvent(new CustomEvent('nameforge:settings'));
  } catch {
    // ignore
  }
}

/**
 * Resets all user local data cleanly
 */
export function resetAllLocalData(): void {
  try {
    // User-created content lives in several independent tools. Keep preferences
    // (nameforge_settings) intact, but clear every personal workspace dataset.
    const keysToRemove = [
      'nameforge_saved_names',
      'nameforge_saved_projects',
      'nameforge_collections',
      'nameforge_generation_history',
      'nameforge_recent_names',
      'nameforge.unified-designs.v1',
      'nameforge.text-art.favorites.v1',
    ];
    for (const k of keysToRemove) {
      localStorage.removeItem(k);
    }
    // Remove rating keys through the Storage API (rather than relying on
    // enumerable implementation details of the browser's Storage object).
    for (let index = localStorage.length - 1; index >= 0; index -= 1) {
      const key = localStorage.key(index);
      if (key?.startsWith('nameforge_rating_')) localStorage.removeItem(key);
    }
    notifySettingsChange();
    window.dispatchEvent(new CustomEvent('nameforge:storage'));
  } catch (e) {
    // Storage can be unavailable (private mode, blocked cookies); there is nothing to reset in that case.
    console.error('Error resetting local data', e);
  }
}
