import assert from 'node:assert/strict';
import { ALL_GENERATORS_LIST, GENERATORS_METADATA } from '../data/generators';
import { FULL_TRANSLATION_LANGUAGES } from '../i18n';
import { getGeneratorDiscoveryLabels } from '../i18n/generatorDiscoveryLabels';
import {
  FEATURED_GENERATOR_IDS,
  getGeneratorEngineMode,
  getGeneratorThemeBucket,
  getRecentlyUsedGenerators,
} from '../services/generatorDiscovery';
import type { HistoryEntry } from '../types';

assert.equal(ALL_GENERATORS_LIST.length, 234, 'Catalog must keep all 234 generators');

// Featured IDs must all resolve to real metadata
for (const id of FEATURED_GENERATOR_IDS) {
  assert.ok(GENERATORS_METADATA[id], `Featured generator ${id} must exist in GENERATORS_METADATA`);
}

// Every generator maps deterministically to a valid theme bucket & engine mode
const validThemes = new Set(['characters', 'brands', 'worlds', 'scifi-tech', 'culture-media']);
for (const meta of ALL_GENERATORS_LIST) {
  assert.ok(validThemes.has(getGeneratorThemeBucket(meta)), `Unexpected theme bucket for ${meta.id}`);
  const mode = getGeneratorEngineMode(meta.id);
  assert.ok(mode === 'curated' || mode === 'procedural', `Invalid engine mode for ${meta.id}`);
}
assert.equal(getGeneratorEngineMode('baby_name'), 'curated');
assert.equal(getGeneratorEngineMode('fantasy'), 'procedural');

// Recently used generator resolution preserves latest order, deduplicates, and ignores unknown IDs
const sampleHistory: HistoryEntry[] = [
  { id: '1', name: 'A', generator: 'brand', style: 's', tone: 't', description: '', bestFor: '', generatedAt: '2026-01-01T10:00:00Z' },
  { id: '2', name: 'B', generator: 'non_existent_gen', style: 's', tone: 't', description: '', bestFor: '', generatedAt: '2026-01-01T10:01:00Z' },
  { id: '3', name: 'C', generator: 'fantasy', style: 's', tone: 't', description: '', bestFor: '', generatedAt: '2026-01-01T10:02:00Z' },
  { id: '4', name: 'D', generator: 'brand', style: 's', tone: 't', description: '', bestFor: '', generatedAt: '2026-01-01T10:03:00Z' },
  { id: '5', name: 'E', generator: 'startup', style: 's', tone: 't', description: '', bestFor: '', generatedAt: '2026-01-01T10:04:00Z' },
];
const recent = getRecentlyUsedGenerators(sampleHistory, 3);
assert.deepEqual(
  recent.map((g) => g.id),
  ['startup', 'brand', 'fantasy']
);

// 28 UI languages covered cleanly in generatorDiscoveryLabels
for (const lang of FULL_TRANSLATION_LANGUAGES) {
  const labels = getGeneratorDiscoveryLabels(lang);
  assert.ok(labels.featuredTitle && labels.recentTitle && labels.familiesTitle, `Missing discovery headings for ${lang}`);
  assert.ok(labels.themeAll && labels.modeAll && labels.modeCurated && labels.modeProcedural, `Missing filter labels for ${lang}`);
}

console.log('Generator discovery tests passed across all 234 generators, history deduplication, and 28 UI languages.');
