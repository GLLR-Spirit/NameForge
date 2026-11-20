import { SUBCATEGORIES_DATA } from '../src/data/subcategories';
import { resolveEnglishDomainPool } from '../src/data/englishDomainPools';
import { PHRASE_BANK_GENERATORS, getPhraseBank } from '../src/data/phraseBanks';
import { ATTESTED_BABY_NAMES, LOCALIZED_BABY_NAMES } from '../src/data/attestedBabyNames';
import { generateNames } from '../src/services/generatorEngine';
import type { GeneratorId } from '../src/types';

// Minimal storage mock so runtime generation runs cleanly under tsx
const memory: Record<string, string> = {};
const g = globalThis as unknown as {
  localStorage?: Storage;
  window?: unknown;
};
if (!g.localStorage) {
  g.localStorage = {
    getItem: (k: string) => memory[k] ?? null,
    setItem: (k: string, v: string) => { memory[k] = v; },
    removeItem: (k: string) => { delete memory[k]; },
    clear: () => { for (const k of Object.keys(memory)) delete memory[k]; },
    key: (i: number) => Object.keys(memory)[i] ?? null,
    get length() { return Object.keys(memory).length; },
  } as Storage;
}
if (!g.window) {
  g.window = { localStorage: g.localStorage, dispatchEvent: () => true, addEventListener: () => {}, removeEventListener: () => {} };
}

const pbSet = new Set(PHRASE_BANK_GENERATORS);
const allIds = Object.keys(SUBCATEGORIES_DATA) as GeneratorId[];

const frNonPbMinRaw: Array<{ id: string; minRaw: number; minStyle: string }> = [];
const enNonPbMinRaw: Array<{ id: string; minRaw: number; minStyle: string }> = [];
const pbSizes: Array<{ id: string; en: number; fr: number }> = [];

let lowRuntimeFr = 0;
let lowRuntimeEn = 0;
const lowRuntimeSamples: string[] = [];

for (const id of allIds) {
  const styles = SUBCATEGORIES_DATA[id];
  if (id === 'baby_name') continue;

  if (pbSet.has(id)) {
    pbSizes.push({
      id,
      en: getPhraseBank(id, 'en').length,
      fr: getPhraseBank(id, 'fr').length,
    });
    continue;
  }

  let minFr = Infinity;
  let minFrSt = '';
  let minEn = Infinity;
  let minEnSt = '';

  for (const [st, data] of Object.entries(styles)) {
    const rawFr = (data.prefixes?.length || 0) * (data.suffixes?.length || 0);
    if (rawFr < minFr) {
      minFr = rawFr;
      minFrSt = `${st}(${data.prefixes?.length || 0}x${data.suffixes?.length || 0})`;
    }
    const enData = resolveEnglishDomainPool(id, st, data);
    const rawEn = (enData.prefixes?.length || 0) * (enData.suffixes?.length || 0);
    if (rawEn < minEn) {
      minEn = rawEn;
      minEnSt = `${st}(${enData.prefixes?.length || 0}x${enData.suffixes?.length || 0})`;
    }
  }
  frNonPbMinRaw.push({ id, minRaw: minFr, minStyle: minFrSt });
  enNonPbMinRaw.push({ id, minRaw: minEn, minStyle: minEnSt });

  const frBatch = generateNames({ generator: id, genLanguage: 'fr', quantity: 24, seed: `cap-fr-${id}` });
  const enBatch = generateNames({ generator: id, genLanguage: 'en', quantity: 24, seed: `cap-en-${id}` });
  const uFr = new Set(frBatch.map((x) => x.name.toLowerCase())).size;
  const uEn = new Set(enBatch.map((x) => x.name.toLowerCase())).size;
  if (uFr < 20) {
    lowRuntimeFr++;
    if (lowRuntimeSamples.length < 15) lowRuntimeSamples.push(`${id}[fr]=${uFr}`);
  }
  if (uEn < 20) {
    lowRuntimeEn++;
    if (lowRuntimeSamples.length < 15) lowRuntimeSamples.push(`${id}[en]=${uEn}`);
  }
}

const bucketize = (rows: Array<{ minRaw: number }>) => ({
  total: rows.length,
  under60: rows.filter((r) => r.minRaw < 60).length,
  from60to99: rows.filter((r) => r.minRaw >= 60 && r.minRaw < 100).length,
  from100to149: rows.filter((r) => r.minRaw >= 100 && r.minRaw < 150).length,
  atLeast150: rows.filter((r) => r.minRaw >= 150).length,
  lowest5: [...rows].sort((a, b) => a.minRaw - b.minRaw).slice(0, 5),
});

console.log('=== NameForge Generator Capacity Report ===');
console.log(`Total generators: ${allIds.length} (syllable/procedural: ${frNonPbMinRaw.length}, phrase-bank: ${pbSizes.length}, attested baby_name: 1)`);
console.log('FR / base minRaw buckets:', JSON.stringify(bucketize(frNonPbMinRaw)));
console.log('EN minRaw buckets:', JSON.stringify(bucketize(enNonPbMinRaw)));
console.log(`Phrase-bank >= 20 (EN): ${pbSizes.filter((p) => p.en >= 20).length}/${pbSizes.length}; < 20: ${pbSizes.filter((p) => p.en < 20).map((p) => `${p.id}(${p.en})`).join(', ') || 'none'}`);
console.log(`Runtime unique yield < 20 at qty=24: fr=${lowRuntimeFr}, en=${lowRuntimeEn}${lowRuntimeSamples.length ? ` (${lowRuntimeSamples.join(', ')})` : ''}`);
console.log(`Baby names attested: total=${ATTESTED_BABY_NAMES.length}, unique=${new Set(ATTESTED_BABY_NAMES.map((b) => b.name.toLowerCase())).size}, ar=${LOCALIZED_BABY_NAMES.ar?.length || 0}`);
