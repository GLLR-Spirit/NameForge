import { getAppSettings } from '../services/settings';

/**
 * Returns true when reduced motion is requested either by the NameForge
 * user setting ("reduceMotion") or by the OS accessibility media query.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  if (getAppSettings().reduceMotion) return true;
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('reduce-motion')) {
    return true;
  }
  return Boolean(
    typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Scrolls to the top of the viewport while strictly respecting the active
 * reduced-motion preference instead of forcing animated smooth scrolling.
 */
export function scrollToTop(): void {
  if (typeof window === 'undefined' || typeof window.scrollTo !== 'function') return;
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}
