import { GenLanguageCode, LanguageCode } from '../types';

export type LocaleTranslationStatus =
  | 'missing'
  | 'fallback'
  | 'translated'
  | 'awaiting_review'
  | 'verified';

export type LocaleScriptFamily =
  | 'Latin'
  | 'Arabic'
  | 'Hebrew'
  | 'Cyrillic'
  | 'Greek'
  | 'Devanagari'
  | 'Bengali'
  | 'CJK'
  | 'Hangul'
  | 'Thai'
  | 'SouthAsian'
  | 'SoutheastAsian'
  | 'Ethiopic'
  | 'Caucasian'
  | 'Other';

export interface CanonicalLocaleEntry {
  code: LanguageCode;
  label: string;
  native: string;
  dir: 'ltr' | 'rtl';
  flag: string;
  region: string;
  scriptFamily: LocaleScriptFamily;
  fallbackLocale: LanguageCode;
  translationStatus: LocaleTranslationStatus;
  /** True when layout & UI controls are RTL-safe; translationStatus stays honest about copy readiness. */
  rtlReady: boolean;
  /** True when a dedicated phonetic/corpus generator rule exists for this language code. */
  genLanguageReady: boolean;
}

export const RTL_LOCALES = new Set<string>(['ar', 'he', 'fa', 'ur', 'ps']);

/**
 * Legacy and variant locale aliases mapped to their canonical catalog code.
 * `no` / `nn` map explicitly to `nb`; `iw` maps explicitly to `he`.
 */
export const LOCALE_ALIASES: Record<string, LanguageCode> = {
  no: 'nb',
  nn: 'nb',
  iw: 'he',
};

/**
 * Locale codes present in TypeScript types or historical settings that are not
 * separate entries inside the 82-language UI selector catalog.
 */
export const NON_CATALOG_LOCALE_NOTES: Record<
  string,
  { canonical: LanguageCode; dir: 'ltr' | 'rtl'; fallbackLocale: LanguageCode; note: string }
> = {
  no: {
    canonical: 'nb',
    dir: 'ltr',
    fallbackLocale: 'nb',
    note: 'Legacy Norwegian ISO 639-1 code explicitly aliased to Bokmål (nb).',
  },
  yi: {
    canonical: 'yi',
    dir: 'rtl',
    fallbackLocale: 'en',
    note: 'Kept in LanguageCode type for compatibility; falls back to English UI with RTL layout preserved.',
  },
};

const VERIFIED_UI_LOCALES = new Set<string>(['en', 'fr']);
const COMPLETE_TRANSLATION_PACKS = new Set<string>([
  'en', 'fr', 'es', 'de', 'it', 'pt', 'ar', 'tr', 'ja', 'ko',
  'zh', 'ru', 'hi', 'nl', 'pl', 'sv', 'vi', 'id', 'th', 'el',
  'he', 'cs', 'ro', 'da', 'fi', 'uk', 'bn', 'nb',
]);

const GENERATOR_LANGUAGE_CODES = new Set<string>([
  'fr', 'en', 'es', 'de', 'it', 'pt', 'ar', 'tr', 'ja', 'ko',
  'zh', 'ru', 'hi', 'nl', 'pl', 'sv', 'vi', 'id', 'th', 'el',
  'he', 'cs', 'ro', 'da', 'fi', 'uk', 'bn', 'nb',
]);

interface RawLocaleSeed {
  code: LanguageCode;
  label: string;
  native: string;
  dir: 'ltr' | 'rtl';
  flag: string;
  region: string;
  scriptFamily: LocaleScriptFamily;
}

const RAW_LOCALE_CATALOG: readonly RawLocaleSeed[] = [
  // Europe
  { code: 'fr', label: 'Français', native: 'Français', dir: 'ltr', flag: '🇫🇷', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'en', label: 'English', native: 'English', dir: 'ltr', flag: '🇬🇧', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'es', label: 'Espagnol', native: 'Español', dir: 'ltr', flag: '🇪🇸', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'de', label: 'Allemand', native: 'Deutsch', dir: 'ltr', flag: '🇩🇪', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'it', label: 'Italien', native: 'Italiano', dir: 'ltr', flag: '🇮🇹', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'pt', label: 'Portugais', native: 'Português', dir: 'ltr', flag: '🇵🇹', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'nl', label: 'Néerlandais', native: 'Nederlands', dir: 'ltr', flag: '🇳🇱', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'pl', label: 'Polonais', native: 'Polski', dir: 'ltr', flag: '🇵🇱', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'sv', label: 'Suédois', native: 'Svenska', dir: 'ltr', flag: '🇸🇪', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'da', label: 'Danois', native: 'Dansk', dir: 'ltr', flag: '🇩🇰', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'fi', label: 'Finnois', native: 'Suomi', dir: 'ltr', flag: '🇫🇮', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'nb', label: 'Norvégien (Bokmål)', native: 'Norsk bokmål', dir: 'ltr', flag: '🇳🇴', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'is', label: 'Islandais', native: 'Íslenska', dir: 'ltr', flag: '🇮🇸', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'cs', label: 'Tchèque', native: 'Čeština', dir: 'ltr', flag: '🇨🇿', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'sk', label: 'Slovaque', native: 'Slovenčina', dir: 'ltr', flag: '🇸🇰', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'hu', label: 'Hongrois', native: 'Magyar', dir: 'ltr', flag: '🇭🇺', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'ro', label: 'Roumain', native: 'Română', dir: 'ltr', flag: '🇷🇴', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'bg', label: 'Bulgare', native: 'Български', dir: 'ltr', flag: '🇧🇬', region: 'Europe', scriptFamily: 'Cyrillic' },
  { code: 'el', label: 'Grec', native: 'Ελληνικά', dir: 'ltr', flag: '🇬🇷', region: 'Europe', scriptFamily: 'Greek' },
  { code: 'uk', label: 'Ukrainien', native: 'Українська', dir: 'ltr', flag: '🇺🇦', region: 'Europe', scriptFamily: 'Cyrillic' },
  { code: 'ru', label: 'Russe', native: 'Русский', dir: 'ltr', flag: '🇷🇺', region: 'Europe', scriptFamily: 'Cyrillic' },
  { code: 'be', label: 'Biélorusse', native: 'Беларуская', dir: 'ltr', flag: '🇧🇾', region: 'Europe', scriptFamily: 'Cyrillic' },
  { code: 'hr', label: 'Croate', native: 'Hrvatski', dir: 'ltr', flag: '🇭🇷', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'sr', label: 'Serbe', native: 'Српски', dir: 'ltr', flag: '🇷🇸', region: 'Europe', scriptFamily: 'Cyrillic' },
  { code: 'bs', label: 'Bosnien', native: 'Bosanski', dir: 'ltr', flag: '🇧🇦', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'sl', label: 'Slovène', native: 'Slovenščina', dir: 'ltr', flag: '🇸🇮', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'mk', label: 'Macédonien', native: 'Македонски', dir: 'ltr', flag: '🇲🇰', region: 'Europe', scriptFamily: 'Cyrillic' },
  { code: 'sq', label: 'Albanais', native: 'Shqip', dir: 'ltr', flag: '🇦🇱', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'et', label: 'Estonien', native: 'Eesti', dir: 'ltr', flag: '🇪🇪', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'lv', label: 'Letton', native: 'Latviešu', dir: 'ltr', flag: '🇱🇻', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'lt', label: 'Lituanien', native: 'Lietuvių', dir: 'ltr', flag: '🇱🇹', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'ca', label: 'Catalan', native: 'Català', dir: 'ltr', flag: '🇪🇸', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'eu', label: 'Basque', native: 'Euskara', dir: 'ltr', flag: '🇪🇸', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'gl', label: 'Galicien', native: 'Galego', dir: 'ltr', flag: '🇪🇸', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'ga', label: 'Irlandais', native: 'Gaeilge', dir: 'ltr', flag: '🇮🇪', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'cy', label: 'Gallois', native: 'Cymraeg', dir: 'ltr', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', region: 'Europe', scriptFamily: 'Latin' },
  { code: 'mt', label: 'Maltais', native: 'Malti', dir: 'ltr', flag: '🇲🇹', region: 'Europe', scriptFamily: 'Latin' },

  // Asia & Pacific
  { code: 'ja', label: 'Japonais', native: '日本語', dir: 'ltr', flag: '🇯🇵', region: 'Asie', scriptFamily: 'CJK' },
  { code: 'ko', label: 'Coréen', native: '한국어', dir: 'ltr', flag: '🇰🇷', region: 'Asie', scriptFamily: 'Hangul' },
  { code: 'zh', label: 'Chinois', native: '中文', dir: 'ltr', flag: '🇨🇳', region: 'Asie', scriptFamily: 'CJK' },
  { code: 'vi', label: 'Vietnamien', native: 'Tiếng Việt', dir: 'ltr', flag: '🇻🇳', region: 'Asie', scriptFamily: 'Latin' },
  { code: 'id', label: 'Indonésien', native: 'Bahasa Indonesia', dir: 'ltr', flag: '🇮🇩', region: 'Asie', scriptFamily: 'Latin' },
  { code: 'ms', label: 'Malais', native: 'Bahasa Melayu', dir: 'ltr', flag: '🇲🇾', region: 'Asie', scriptFamily: 'Latin' },
  { code: 'fil', label: 'Filipino', native: 'Filipino', dir: 'ltr', flag: '🇵🇭', region: 'Asie', scriptFamily: 'Latin' },
  { code: 'th', label: 'Thaï', native: 'ไทย', dir: 'ltr', flag: '🇹🇭', region: 'Asie', scriptFamily: 'Thai' },
  { code: 'lo', label: 'Lao', native: 'ພາສາລາວ', dir: 'ltr', flag: '🇱🇦', region: 'Asie', scriptFamily: 'SoutheastAsian' },
  { code: 'km', label: 'Khmer', native: 'ភាសាខ្មែរ', dir: 'ltr', flag: '🇰🇭', region: 'Asie', scriptFamily: 'SoutheastAsian' },
  { code: 'my', label: 'Birman', native: 'မြန်မာစာ', dir: 'ltr', flag: '🇲🇲', region: 'Asie', scriptFamily: 'SoutheastAsian' },
  { code: 'mn', label: 'Mongol', native: 'Монгол', dir: 'ltr', flag: '🇲🇳', region: 'Asie', scriptFamily: 'Cyrillic' },

  // South Asia
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', dir: 'ltr', flag: '🇮🇳', region: 'Inde & Asie du Sud', scriptFamily: 'Devanagari' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', dir: 'ltr', flag: '🇧🇩', region: 'Inde & Asie du Sud', scriptFamily: 'Bengali' },
  { code: 'pa', label: 'Pendjabi', native: 'ਪੰਜਾਬੀ', dir: 'ltr', flag: '🇮🇳', region: 'Inde & Asie du Sud', scriptFamily: 'SouthAsian' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', dir: 'ltr', flag: '🇮🇳', region: 'Inde & Asie du Sud', scriptFamily: 'Devanagari' },
  { code: 'ta', label: 'Tamoul', native: 'தமிழ்', dir: 'ltr', flag: '🇮🇳', region: 'Inde & Asie du Sud', scriptFamily: 'SouthAsian' },
  { code: 'te', label: 'Télougou', native: 'తెలుగు', dir: 'ltr', flag: '🇮🇳', region: 'Inde & Asie du Sud', scriptFamily: 'SouthAsian' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', dir: 'ltr', flag: '🇮🇳', region: 'Inde & Asie du Sud', scriptFamily: 'SouthAsian' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', dir: 'ltr', flag: '🇮🇳', region: 'Inde & Asie du Sud', scriptFamily: 'SouthAsian' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ', dir: 'ltr', flag: '🇮🇳', region: 'Inde & Asie du Sud', scriptFamily: 'SouthAsian' },
  { code: 'ne', label: 'Népalais', native: 'नेपाली', dir: 'ltr', flag: '🇳🇵', region: 'Inde & Asie du Sud', scriptFamily: 'Devanagari' },
  { code: 'si', label: 'Cinghalais', native: 'සිංහල', dir: 'ltr', flag: '🇱🇰', region: 'Inde & Asie du Sud', scriptFamily: 'SouthAsian' },

  // Middle East, Caucasus & Central Asia (including all 5 RTL locales)
  { code: 'ar', label: 'Arabe', native: 'العربية', dir: 'rtl', flag: '🇸🇦', region: 'Moyen-Orient', scriptFamily: 'Arabic' },
  { code: 'he', label: 'Hébreu', native: 'עברית', dir: 'rtl', flag: '🇮🇱', region: 'Moyen-Orient', scriptFamily: 'Hebrew' },
  { code: 'fa', label: 'Persan', native: 'فارسی', dir: 'rtl', flag: '🇮🇷', region: 'Moyen-Orient', scriptFamily: 'Arabic' },
  { code: 'ur', label: 'Ourdou', native: 'اردو', dir: 'rtl', flag: '🇵🇰', region: 'Moyen-Orient', scriptFamily: 'Arabic' },
  { code: 'ps', label: 'Pachto', native: 'پښتو', dir: 'rtl', flag: '🇦🇫', region: 'Moyen-Orient', scriptFamily: 'Arabic' },
  { code: 'ku', label: 'Kurde', native: 'Kurdî', dir: 'ltr', flag: '🇹🇷', region: 'Moyen-Orient', scriptFamily: 'Latin' },
  { code: 'tr', label: 'Turc', native: 'Türkçe', dir: 'ltr', flag: '🇹🇷', region: 'Moyen-Orient', scriptFamily: 'Latin' },
  { code: 'az', label: 'Azerbaïdjanais', native: 'Azərbaycan', dir: 'ltr', flag: '🇦🇿', region: 'Moyen-Orient', scriptFamily: 'Latin' },
  { code: 'hy', label: 'Arménien', native: 'Հայերեն', dir: 'ltr', flag: '🇦🇲', region: 'Moyen-Orient', scriptFamily: 'Caucasian' },
  { code: 'ka', label: 'Géorgien', native: 'ქართული', dir: 'ltr', flag: '🇬🇪', region: 'Moyen-Orient', scriptFamily: 'Caucasian' },
  { code: 'kk', label: 'Kazakh', native: 'Қазақша', dir: 'ltr', flag: '🇰🇿', region: 'Asie', scriptFamily: 'Cyrillic' },
  { code: 'uz', label: 'Ouzbek', native: 'Oʻzbekcha', dir: 'ltr', flag: '🇺🇿', region: 'Asie', scriptFamily: 'Latin' },
  { code: 'ky', label: 'Kirghiz', native: 'Кыргызча', dir: 'ltr', flag: '🇰🇬', region: 'Asie', scriptFamily: 'Cyrillic' },
  { code: 'tk', label: 'Turkmène', native: 'Türkmençe', dir: 'ltr', flag: '🇹🇲', region: 'Asie', scriptFamily: 'Latin' },

  // Africa
  { code: 'sw', label: 'Swahili', native: 'Kiswahili', dir: 'ltr', flag: '🇰🇪', region: 'Afrique', scriptFamily: 'Latin' },
  { code: 'am', label: 'Amharique', native: 'አማርኛ', dir: 'ltr', flag: '🇪🇹', region: 'Afrique', scriptFamily: 'Ethiopic' },
  { code: 'ti', label: 'Tigrinya', native: 'ትግርኛ', dir: 'ltr', flag: '🇪🇷', region: 'Afrique', scriptFamily: 'Ethiopic' },
  { code: 'yo', label: 'Yoruba', native: 'Èdè Yorùbá', dir: 'ltr', flag: '🇳🇬', region: 'Afrique', scriptFamily: 'Latin' },
  { code: 'ig', label: 'Igbo', native: 'Asụsụ Igbo', dir: 'ltr', flag: '🇳🇬', region: 'Afrique', scriptFamily: 'Latin' },
  { code: 'so', label: 'Somali', native: 'Soomaali', dir: 'ltr', flag: '🇸🇴', region: 'Afrique', scriptFamily: 'Latin' },
  { code: 'af', label: 'Afrikaans', native: 'Afrikaans', dir: 'ltr', flag: '🇿🇦', region: 'Afrique', scriptFamily: 'Latin' },
  { code: 'zu', label: 'Zoulou', native: 'isiZulu', dir: 'ltr', flag: '🇿🇦', region: 'Afrique', scriptFamily: 'Latin' },
];

export const LOCALE_REGISTRY: readonly CanonicalLocaleEntry[] = RAW_LOCALE_CATALOG.map((item) => {
  const status: LocaleTranslationStatus = VERIFIED_UI_LOCALES.has(item.code)
    ? 'verified'
    : COMPLETE_TRANSLATION_PACKS.has(item.code)
      ? 'awaiting_review'
      : 'fallback';
  return {
    ...item,
    fallbackLocale: COMPLETE_TRANSLATION_PACKS.has(item.code) ? item.code : 'en',
    translationStatus: status,
    rtlReady: item.dir === 'rtl' ? true : false,
    genLanguageReady: GENERATOR_LANGUAGE_CODES.has(item.code),
  };
});

const LOCALE_MAP = new Map<string, CanonicalLocaleEntry>(
  LOCALE_REGISTRY.map((entry) => [entry.code, entry])
);

export function resolveCanonicalLocale(code: string | undefined | null): LanguageCode {
  const normalized = String(code || '').trim().toLowerCase().split(/[-_]/)[0];
  if (!normalized) return 'en';
  const aliased = LOCALE_ALIASES[normalized] || normalized;
  if (LOCALE_MAP.has(aliased)) return aliased as LanguageCode;
  return 'en';
}

export function getLocaleEntry(code: string | undefined | null): CanonicalLocaleEntry {
  const resolved = resolveCanonicalLocale(code);
  return LOCALE_MAP.get(resolved) || LOCALE_MAP.get('en')!;
}

export function isCatalogLocale(code: string | undefined | null): boolean {
  const normalized = String(code || '').trim().toLowerCase();
  const aliased = LOCALE_ALIASES[normalized] || normalized;
  return LOCALE_MAP.has(aliased);
}

export function resolveLocaleDirection(code: string | undefined | null): 'ltr' | 'rtl' {
  const normalized = String(code || '').trim().toLowerCase().split(/[-_]/)[0];
  if (normalized === 'yi' || RTL_LOCALES.has(normalized)) return 'rtl';
  return getLocaleEntry(normalized).dir;
}

export function resolveDefaultGenLanguageForLocale(code: LanguageCode): GenLanguageCode {
  const canonical = resolveCanonicalLocale(code);
  return GENERATOR_LANGUAGE_CODES.has(canonical) ? (canonical as GenLanguageCode) : 'en';
}

export function getLocaleRegistryStats() {
  const total = LOCALE_REGISTRY.length;
  const verified = LOCALE_REGISTRY.filter((e) => e.translationStatus === 'verified').length;
  const awaitingReview = LOCALE_REGISTRY.filter((e) => e.translationStatus === 'awaiting_review').length;
  const fallback = LOCALE_REGISTRY.filter((e) => e.translationStatus === 'fallback').length;
  const rtlCount = LOCALE_REGISTRY.filter((e) => e.dir === 'rtl').length;
  return {
    total,
    completePacks: verified + awaitingReview,
    verified,
    awaitingReview,
    fallback,
    rtlCount,
  };
}
