import assert from 'node:assert/strict';

class MemoryStorage {
  private values = new Map<string, string>();
  get length() { return this.values.size; }
  key(index: number) { return [...this.values.keys()][index] ?? null; }
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, String(value)); }
  removeItem(key: string) { this.values.delete(key); }
  clear() { this.values.clear(); }
}

const memory = new MemoryStorage();
const rootClasses = new Set<string>();
const rootDataset: Record<string, string> = {};
const scrollCalls: ScrollToOptions[] = [];
let mockOsReduceMotion = false;

Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: memory });
Object.defineProperty(globalThis, 'window', {
  configurable: true,
  value: {
    localStorage: memory,
    dispatchEvent: () => true,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    scrollTo: (opts: ScrollToOptions) => { scrollCalls.push(opts); },
    matchMedia: (query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? mockOsReduceMotion : false,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
    }),
  },
});
Object.defineProperty(globalThis, 'document', {
  configurable: true,
  value: {
    documentElement: {
      lang: 'en',
      dir: 'ltr',
      style: { colorScheme: '' },
      dataset: rootDataset,
      classList: {
        add: (...cls: string[]) => cls.forEach((c) => rootClasses.add(c)),
        remove: (...cls: string[]) => cls.forEach((c) => rootClasses.delete(c)),
        toggle: (cls: string, force?: boolean) => {
          const next = force === undefined ? !rootClasses.has(cls) : Boolean(force);
          if (next) rootClasses.add(cls);
          else rootClasses.delete(cls);
          return next;
        },
        contains: (cls: string) => rootClasses.has(cls),
      },
    },
  },
});

const { applySettingsToDOM, getAppSettings, resetAllLocalData, saveAppSettings } = await import('../services/settings');
const { prefersReducedMotion, scrollToTop } = await import('../utils/motion');

const personalKeys = [
  'nameforge_saved_names',
  'nameforge_saved_projects',
  'nameforge_collections',
  'nameforge_generation_history',
  'nameforge_recent_names',
  'nameforge.unified-designs.v1',
  'nameforge.text-art.favorites.v1',
];

for (const key of personalKeys) memory.setItem(key, 'test-data');
memory.setItem('nameforge_rating_Aster Vale', '5');
memory.setItem('nameforge_settings', JSON.stringify({
  language: 'fr',
  theme: 'light',
  textSize: 'large',
  reduceMotion: true,
  defaultGenLanguage: 'fr',
}));
memory.setItem('unrelated-app-data', 'must-remain');

resetAllLocalData();

for (const key of personalKeys) {
  assert.equal(memory.getItem(key), null, key + ' should be cleared by reset');
}
assert.equal(memory.getItem('nameforge_rating_Aster Vale'), null, 'rating entries should be cleared');
assert.ok(memory.getItem('nameforge_settings'), 'reset must preserve user preferences');
assert.equal(memory.getItem('unrelated-app-data'), 'must-remain', 'reset must not touch unrelated storage');

// Verify reduceMotion persistence, DOM class/attribute sync, OS media override & scrollToTop behavior
const initial = saveAppSettings({ reduceMotion: false });
applySettingsToDOM(initial);
assert.equal(rootClasses.has('reduce-motion'), false);
assert.equal(rootDataset.reduceMotion, 'false');
assert.equal(prefersReducedMotion(), false);
scrollToTop();
assert.equal(scrollCalls[scrollCalls.length - 1]?.behavior, 'smooth');

const updated = saveAppSettings({ reduceMotion: true });
assert.equal(getAppSettings().reduceMotion, true, 'reduceMotion preference must persist');
applySettingsToDOM(updated);
assert.equal(rootClasses.has('reduce-motion'), true, 'reduce-motion class must be added on <html>');
assert.equal(rootDataset.reduceMotion, 'true', 'data-reduce-motion attribute must be set on <html>');
assert.equal(prefersReducedMotion(), true);
scrollToTop();
assert.equal(scrollCalls[scrollCalls.length - 1]?.behavior, 'auto', 'scrollToTop must disable smooth scroll when reduceMotion is active');

// Verify OS prefers-reduced-motion activates DOM reduce-motion even when toggle is false
const disabledToggle = saveAppSettings({ reduceMotion: false });
mockOsReduceMotion = true;
applySettingsToDOM(disabledToggle);
assert.equal(rootClasses.has('reduce-motion'), true, 'OS prefers-reduced-motion must also enforce reduce-motion class');
assert.equal(prefersReducedMotion(), true);
scrollToTop();
assert.equal(scrollCalls[scrollCalls.length - 1]?.behavior, 'auto');

console.log('Settings, preferences persistence, and reduced-motion DOM/scroll checks passed.');
