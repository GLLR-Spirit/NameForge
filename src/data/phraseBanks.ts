/**
 * Runtime quarantine for phrase banks with unverified authorship and redistribution rights.
 *
 * The previous phrase-bank source files were removed from the active source tree.
 * Do not restore runtime data here until provenance, permissions and licence obligations
 * have been reviewed and recorded in docs/legal/rights-register.md.
 */
export const QUARANTINED_PHRASE_BANK_GENERATORS = [
  "slogan",
  "book",
  "song_title",
  "podcast",
  "blog_name",
  "newsletter",
  "album_title",
  "novel_series",
  "tactical_operation",
  "restaurant",
  "coffee_shop",
  "tavern",
  "band_name",
  "videogame",
  "youtube",
  "shop",
  "guild",
  "bakery",
  "hotel_name"
] as const;

/** No phrase bank is currently approved for runtime use. */
export const PHRASE_BANK_GENERATORS: string[] = [];

/** Returns no phrases while the editorial banks remain quarantined. */
export function getPhraseBank(_generatorId: string, _language: string): string[] {
  return [];
}
