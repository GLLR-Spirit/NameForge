import { ALL_GENERATORS_LIST } from '../data/generators';
import { FULL_TRANSLATION_LANGUAGES } from '../i18n';
import { generateNames } from '../services/generatorEngine';

declare const process: { exitCode?: number };

const memory = new Map<string, string>();
const storage = {
  getItem: (key: string) => memory.get(key) ?? null,
  setItem: (key: string, value: string) => { memory.set(key, value); },
  removeItem: (key: string) => { memory.delete(key); },
  clear: () => memory.clear(),
};
(globalThis as any).localStorage = storage;
(globalThis as any).window = {
  localStorage: storage,
  dispatchEvent: () => true,
  addEventListener: () => {},
  removeEventListener: () => {},
};
(globalThis as any).CustomEvent = class { type: string; constructor(type: string) { this.type = type; } };

const failures: string[] = [];
let scenarios = 0;
let generated = 0;
let emptyScenarios = 0;

if (ALL_GENERATORS_LIST.length !== 234) {
  failures.push(`Expected 234 generators, found ${ALL_GENERATORS_LIST.length}`);
}
if (new Set(ALL_GENERATORS_LIST.map((item) => item.id)).size !== ALL_GENERATORS_LIST.length) {
  failures.push('Generator catalog contains duplicate IDs');
}

for (const generator of ALL_GENERATORS_LIST) {
  for (const language of FULL_TRANSLATION_LANGUAGES) {
    scenarios++;
    storage.clear();
    let names;
    try {
      names = generateNames({
        generatorId: generator.id,
        genLanguage: language as any,
        quantity: 3,
        seed: `all-generators-smoke:${generator.id}:${language}`,
      });
    } catch (error) {
      failures.push(`${generator.id}/${language}: threw ${String(error)}`);
      continue;
    }

    if (!Array.isArray(names)) {
      failures.push(`${generator.id}/${language}: result is not an array`);
      continue;
    }
    if (names.length === 0) {
      emptyScenarios++;
      if (generator.id !== 'baby_name') {
        failures.push(`${generator.id}/${language}: unexpectedly returned no results`);
      }
      continue;
    }
    if (names.length > 3) {
      failures.push(`${generator.id}/${language}: returned more than requested (3)`);
    }

    const normalized = new Set<string>();
    for (const item of names) {
      const name = String(item?.name ?? '').trim();
      if (!name) failures.push(`${generator.id}/${language}: returned an empty name`);
      const key = name.normalize('NFC').toLocaleLowerCase();
      if (normalized.has(key)) failures.push(`${generator.id}/${language}: duplicate result "${name}"`);
      normalized.add(key);
      if (item?.generatorId && item.generatorId !== generator.id) {
        failures.push(`${generator.id}/${language}: result has mismatched generatorId "${item.generatorId}"`);
      }
      generated++;
    }
  }
}

console.log(`All-generator smoke: ${scenarios} generator/language scenarios, ${generated} valid results, ${emptyScenarios} empty scenarios.`);
console.log(`Catalog size: ${ALL_GENERATORS_LIST.length} generators × ${FULL_TRANSLATION_LANGUAGES.length} languages.`);
if (failures.length) {
  for (const failure of failures.slice(0, 100)) console.error(`FAIL ${failure}`);
  console.error(`${failures.length} failure(s) detected.`);
  process.exitCode = 1;
} else {
  console.log('All-generator smoke checks passed.');
}
