import { RTL_LOCALES, resolveLocaleDirection } from '../i18n/localeRegistry';

/**
 * Canonical RTL language codes supported by NameForge.
 */
export const RTL_LANGUAGE_CODES = RTL_LOCALES;

export function isRtlLanguage(code: string | undefined | null): boolean {
  if (!code) return false;
  return resolveLocaleDirection(code) === 'rtl';
}

export function getTextDirection(code: string | undefined | null): 'rtl' | 'ltr' {
  return resolveLocaleDirection(code);
}
