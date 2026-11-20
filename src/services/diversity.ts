/**
 * Quality-guarded candidate ranking.
 *
 * Linguistic score remains primary: the diversity tie-breaker only considers candidates
 * within a small score window of the best remaining candidate. It never hard-rejects names.
 */
export interface DiversityCandidate {
  name: string;
  score: number;
  strategy: string;
}

export interface NameDiversityProfile {
  onset: string;
  ending: string;
  structure: string;
  phoneticFamily: string;
}

const points = (value: string): string[] => Array.from(value.normalize('NFC'));
const key = (value: string): string =>
  value.normalize('NFKC').toLocaleLowerCase().replace(/[^\p{L}\p{M}\p{N}]+/gu, ' ').trim();

export function getNameDiversityProfile(name: string): NameDiversityProfile {
  const normalized = key(name);
  const tokens = normalized.split(/\s+/u).filter(Boolean);
  const first = points(tokens[0] || '');
  const last = points(tokens[tokens.length - 1] || '');
  const letters = points(normalized.replace(/\s/gu, ''));
  const latin = /\p{Script=Latin}/u.test(normalized);
  const vowelCount = latin ? (normalized.match(/[aeiouyà-ÿ]/giu) || []).length : 0;
  const letterCount = Math.max(1, letters.length);
  const ratio = vowelCount / letterCount;
  const phoneticFamily = !latin
    ? 'non-latin'
    : ratio < 0.28
      ? 'consonant-dense'
      : ratio > 0.55
        ? 'vowel-rich'
        : 'balanced';

  return {
    onset: first.slice(0, Math.min(2, first.length)).join(''),
    ending: last.slice(-Math.min(2, last.length)).join(''),
    structure: tokens.length === 1 ? 'single' : tokens.length === 2 ? 'double' : 'phrase',
    phoneticFamily,
  };
}

/**
 * Greedy selection with a 2.5-point quality guard.
 * Within that band, it favors unused strategies, onsets and endings.
 * Lower-scoring candidates outside the band cannot jump ahead just for variety.
 */
export function selectDiverseCandidates<T extends DiversityCandidate>(
  candidates: T[],
  limit = candidates.length,
  qualityWindow = 2.5
): T[] {
  const remaining = candidates.map((candidate) => ({
    candidate,
    profile: getNameDiversityProfile(candidate.name),
  }));
  const selected: T[] = [];
  const strategyCounts = new Map<string, number>();
  const onsetCounts = new Map<string, number>();
  const endingCounts = new Map<string, number>();
  const structureCounts = new Map<string, number>();
  const familyCounts = new Map<string, number>();

  const penalty = (counts: Map<string, number>, value: string, weight: number): number => {
    if (!value) return 0;
    const count = counts.get(value) || 0;
    return count === 0 ? 0 : weight / Math.sqrt(count);
  };
  const increment = (counts: Map<string, number>, value: string): void => {
    if (value) counts.set(value, (counts.get(value) || 0) + 1);
  };

  const targetCount = Math.max(0, limit);
  const clampedWindow = Math.max(0, qualityWindow);

  while (remaining.length && selected.length < targetCount) {
    let bestScore = remaining[0].candidate.score;
    for (let i = 1; i < remaining.length; i++) {
      const s = remaining[i].candidate.score;
      if (s > bestScore) bestScore = s;
    }
    const minimumScore = bestScore - clampedWindow;
    let bestIndex = -1;
    let bestPenalty = Number.POSITIVE_INFINITY;
    let bestCandidateScore = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < remaining.length; i++) {
      const { candidate, profile } = remaining[i];
      if (candidate.score < minimumScore) continue;
      const diversityPenalty =
        penalty(strategyCounts, candidate.strategy, 1.25) +
        penalty(onsetCounts, profile.onset, 1) +
        penalty(endingCounts, profile.ending, 1) +
        penalty(structureCounts, profile.structure, 0.35) +
        (profile.phoneticFamily === 'non-latin'
          ? 0
          : penalty(familyCounts, profile.phoneticFamily, 0.35));

      if (
        diversityPenalty < bestPenalty ||
        (diversityPenalty === bestPenalty && candidate.score > bestCandidateScore)
      ) {
        bestPenalty = diversityPenalty;
        bestCandidateScore = candidate.score;
        bestIndex = i;
        // Early exit if a zero-penalty item has the maximum possible score in the band
        if (bestPenalty === 0 && bestCandidateScore === bestScore) break;
      }
    }

    // A non-empty remaining list always has at least its highest-scoring candidate in-band.
    if (bestIndex < 0) break;
    const [{ candidate, profile }] = remaining.splice(bestIndex, 1);
    selected.push(candidate);
    increment(strategyCounts, candidate.strategy);
    increment(onsetCounts, profile.onset);
    increment(endingCounts, profile.ending);
    increment(structureCounts, profile.structure);
    if (profile.phoneticFamily !== 'non-latin') increment(familyCounts, profile.phoneticFamily);
  }

  return selected;
}
