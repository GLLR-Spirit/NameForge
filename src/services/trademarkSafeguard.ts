/**
 * Configurable screening guard against well-known commercial marks and game titles.
 *
 * IMPORTANT: Matching against this local screening list does NOT constitute a legal
 * clearance search (such as INPI, EUIPO, USPTO, or WIPO checks) and a non-match
 * must never be presented as legal availability.
 */

export interface TrademarkScreenResult {
  matched: boolean;
  matchType?: 'exact' | 'close-similarity';
  matchedTerm?: string;
  disclaimer: string;
}

export const TRADEMARK_SCREENING_DISCLAIMER =
  'Preliminary local similarity screen only. Passing this check does not grant legal clearance; consult official trademark registries (INPI, EUIPO, USPTO) before commercial use.';

const DEFAULT_PROTECTED_MARKS: readonly string[] = [
  'catan',
  'carcassonne',
  'wingspan',
  'monopoly',
  'scrabble',
  'minecraft',
  'roblox',
  'fortnite',
  'pokemon',
  'zelda',
  'nintendo',
  'playstation',
  'xbox',
  'google',
  'apple',
  'microsoft',
  'amazon',
  'netflix',
  'spotify',
  'tesla',
  'nvidia',
  'openai',
  'anthropic',
  'instagram',
  'tiktok',
  'youtube',
  'twitter',
  'discord',
  'steam',
  'adobe',
  'shopify',
  'stripe',
  'airbnb',
  'uber',
  'nike',
  'adidas',
  'rolex',
  'gucci',
  'prada',
  'chanel',
  'louis vuitton',
  'coca cola',
  'pepsi',
  'disney',
  'marvel',
  'starbucks',
  'lego',
  'warhammer',
];

interface PrecomputedMark {
  raw: string;
  norm: string;
  compact: string;
}

function normalizeMarkToken(value: string): string {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const PRECOMPUTED_DEFAULT_MARKS: readonly PrecomputedMark[] = DEFAULT_PROTECTED_MARKS.map((raw) => {
  const norm = normalizeMarkToken(raw);
  return { raw, norm, compact: norm.replace(/\s+/g, '') };
}).filter((entry) => entry.compact.length > 0);

function boundedEditDistance(a: string, b: string): number {
  const lenA = a.length;
  const lenB = b.length;
  if (Math.abs(lenA - lenB) > 2) return 3;
  const row = Array.from({ length: lenB + 1 }, (_, i) => i);
  for (let i = 1; i <= lenA; i++) {
    let diag = row[0];
    row[0] = i;
    for (let j = 1; j <= lenB; j++) {
      const up = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diag + cost);
      diag = up;
    }
  }
  return row[lenB];
}

function matchPrecomputedWatchlist(
  normalized: string,
  compact: string,
  tokens: string[],
  watchlist: readonly PrecomputedMark[]
): TrademarkScreenResult | null {
  for (const mark of watchlist) {
    if (compact === mark.compact || normalized === mark.norm || tokens.includes(mark.compact)) {
      return {
        matched: true,
        matchType: 'exact',
        matchedTerm: mark.raw,
        disclaimer: TRADEMARK_SCREENING_DISCLAIMER,
      };
    }

    if (mark.compact.length >= 5 && compact.length >= 5) {
      if (boundedEditDistance(compact, mark.compact) <= 1) {
        return {
          matched: true,
          matchType: 'close-similarity',
          matchedTerm: mark.raw,
          disclaimer: TRADEMARK_SCREENING_DISCLAIMER,
        };
      }
      for (const token of tokens) {
        if (token.length >= 5 && boundedEditDistance(token, mark.compact) <= 1) {
          return {
            matched: true,
            matchType: 'close-similarity',
            matchedTerm: mark.raw,
            disclaimer: TRADEMARK_SCREENING_DISCLAIMER,
          };
        }
      }
    }
  }
  return null;
}

export function screenTrademarkSimilarity(
  candidate: string,
  customWatchlist: readonly string[] = []
): TrademarkScreenResult {
  const normalized = normalizeMarkToken(candidate);
  if (!normalized) {
    return { matched: false, disclaimer: TRADEMARK_SCREENING_DISCLAIMER };
  }
  const compact = normalized.replace(/\s+/g, '');
  const tokens = normalized.split(' ').filter(Boolean);

  const defaultHit = matchPrecomputedWatchlist(normalized, compact, tokens, PRECOMPUTED_DEFAULT_MARKS);
  if (defaultHit) return defaultHit;

  if (customWatchlist.length > 0) {
    const customEntries: PrecomputedMark[] = [];
    for (const raw of customWatchlist) {
      const norm = normalizeMarkToken(raw);
      const markCompact = norm.replace(/\s+/g, '');
      if (markCompact) customEntries.push({ raw, norm, compact: markCompact });
    }
    const customHit = matchPrecomputedWatchlist(normalized, compact, tokens, customEntries);
    if (customHit) return customHit;
  }

  return {
    matched: false,
    disclaimer: TRADEMARK_SCREENING_DISCLAIMER,
  };
}
