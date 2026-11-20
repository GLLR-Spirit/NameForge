import { GeneratorId, GeneratorMeta, HistoryEntry } from '../types';
import { ALL_GENERATORS_LIST } from '../data/generators';
import { PHRASE_BANK_GENERATORS } from '../data/phraseBanks';
import { JAPANESE_ANIME_GENERATORS } from './languageCompatibility';

export type DiscoveryThemeFilter =
  | 'all'
  | 'characters'
  | 'brands'
  | 'worlds'
  | 'scifi-tech'
  | 'culture-media';

export type DiscoveryModeFilter = 'all' | 'curated' | 'procedural';

export const FEATURED_GENERATOR_IDS: readonly GeneratorId[] = [
  'brand',
  'fantasy',
  'baby_name',
  'anime',
  'startup',
  'cyberpunk',
] as const;

const PHRASE_BANK_SET = new Set<string>(PHRASE_BANK_GENERATORS);

export function getGeneratorEngineMode(generatorId: GeneratorId): 'curated' | 'procedural' {
  if (
    generatorId === 'baby_name' ||
    PHRASE_BANK_SET.has(generatorId) ||
    JAPANESE_ANIME_GENERATORS.has(generatorId)
  ) {
    return 'curated';
  }
  return 'procedural';
}

export function getGeneratorThemeBucket(gen: GeneratorMeta): Exclude<DiscoveryThemeFilter, 'all'> {
  const id = gen.id;
  if (
    id === 'baby_name' ||
    id === 'character' ||
    id === 'elf' ||
    id === 'dragon' ||
    id === 'vampire' ||
    id === 'warrior' ||
    id === 'wizard' ||
    id === 'anime_hero' ||
    id === 'anime_rival' ||
    id === 'fictional_mentor' ||
    id === 'npc' ||
    id === 'pirate' ||
    id === 'space_pirate' ||
    id === 'superhero' ||
    id === 'villains' ||
    id === 'knight' ||
    id === 'samurai' ||
    id === 'viking' ||
    id === 'angel' ||
    id === 'demon'
  ) {
    return 'characters';
  }
  if (
    gen.category === 'business' ||
    id === 'brand' ||
    id === 'startup' ||
    id === 'company' ||
    id === 'slogan'
  ) {
    return 'brands';
  }
  if (
    gen.category === 'innovation' ||
    id === 'sci-fi' ||
    id === 'cyberpunk' ||
    id === 'robot' ||
    id === 'spaceship' ||
    id === 'galaxy' ||
    id === 'quantum_particle'
  ) {
    return 'scifi-tech';
  }
  if (
    id === 'kingdom' ||
    id === 'city' ||
    id === 'placename' ||
    id === 'continent' ||
    id === 'island' ||
    id === 'tavern' ||
    id === 'dungeon' ||
    id === 'enchanted_forest' ||
    id === 'floating_skyland' ||
    id === 'planet' ||
    id === 'starship'
  ) {
    return 'worlds';
  }
  if (gen.category === 'fantasy' && !id.includes('dragon') && !id.includes('elf')) {
    // Remaining fantasy place/world/lore generators lean worlds or characters
    if (
      id.includes('city') ||
      id.includes('land') ||
      id.includes('realm') ||
      id.includes('castle') ||
      id.includes('forest') ||
      id.includes('temple') ||
      id.includes('tower') ||
      id.includes('village')
    ) {
      return 'worlds';
    }
  }
  return 'culture-media';
}

export function getRecentlyUsedGenerators(
  history: HistoryEntry[],
  limit = 4
): GeneratorMeta[] {
  if (!Array.isArray(history) || history.length === 0) return [];
  const byId = new Map<string, GeneratorMeta>();
  for (const gen of ALL_GENERATORS_LIST) {
    byId.set(gen.id, gen);
  }
  const seen = new Set<string>();
  const recent: GeneratorMeta[] = [];
  const sorted = [...history].sort(
    (a, b) => (Date.parse(b.generatedAt || '') || 0) - (Date.parse(a.generatedAt || '') || 0)
  );
  for (const entry of sorted) {
    if (!entry.generator || seen.has(entry.generator)) continue;
    const meta = byId.get(entry.generator);
    if (!meta) continue;
    seen.add(entry.generator);
    recent.push(meta);
    if (recent.length >= limit) break;
  }
  return recent;
}
