import assert from 'node:assert/strict';
import { combineParts, generateNames } from '../services/generatorEngine';
import { GENERATORS_METADATA } from '../data/generators';
import { screenTrademarkSimilarity } from '../services/trademarkSafeguard';
import type { GeneratorId } from '../types';

function run(): void {
  const allIds = Object.keys(GENERATORS_METADATA) as GeneratorId[];

  // 1. No truncated French tokens across French generation
  for (const id of ['placename', 'dragon', 'griffin_rider', 'enchanted_forest', 'scientific_model'] as GeneratorId[]) {
    const batch = generateNames({ generator: id, genLanguage: 'fr', quantity: 20, seed: `trunc-${id}` });
    for (const item of batch) {
      for (const word of item.name.split(/\s+/)) {
        assert.ok(!/^(?:Î|Fidè|Né|Ép)$/i.test(word), `Unexpected truncated word in ${id}: ${item.name}`);
      }
    }
  }

  // 2. Consonant/vowel collision smoothing and clean neologism rules
  assert.equal(combineParts('Magm', 'maw', 'en'), 'Magmaw');
  assert.equal(combineParts('Ba', 'ack', 'en'), 'Back');

  // 3. French preposition & adjective gender agreement
  assert.equal(combineParts('Danse de', 'Comète', 'fr'), 'Danse de la Comète');
  assert.equal(combineParts('Le Port', 'Secrète', 'fr'), 'Le Port Secret');
  assert.equal(combineParts('Le Désert', 'Brûlée', 'fr'), 'Le Désert Brûlé');
  assert.equal(combineParts('Jugement', 'Divine', 'fr'), 'Jugement Divin');
  assert.equal(combineParts('Brume', 'Gris', 'fr'), 'Brume Grise');
  assert.equal(combineParts('Serre', 'Ailé', 'fr'), 'Serre Ailée');

  // 4. Trademark screening and zero Catan leakage
  const catanHit = screenTrademarkSimilarity('Catan Isles');
  assert.equal(catanHit.matched, true);
  assert.equal(catanHit.matchedTerm, 'catan');
  for (const id of ['board_game', 'boardgame_title'] as GeneratorId[]) {
    const batch = generateNames({ generator: id, genLanguage: 'fr', quantity: 30, seed: `tm-${id}` });
    for (const item of batch) {
      assert.ok(!/\bcatan\b/i.test(item.name), `Found trademark 'Catan' in ${id}: ${item.name}`);
    }
  }

  // 5. Arabic generation: zero religious suffixes and clean accent transliteration
  for (const id of allIds) {
    if (id === 'baby_name') continue;
    const arBatch = generateNames({ generator: id, genLanguage: 'ar', quantity: 10, seed: `ar-clean-${id}` });
    assert.ok(
      arBatch.length >= 10,
      `Expected >= 10 Arabic names for ${id}, got ${arBatch.length}`
    );
    for (const item of arBatch) {
      assert.ok(!/(الدين|النور|الحق)/.test(item.name), `Unexpected religious suffix in Arabic ${id}: ${item.name}`);
    }
  }

  // 6. English output across all 233 procedural/phrase generators: zero French articles/prepositions or leaked French diacritics
  const frenchLeakRe =
    /(?:^|\s)(?:le|la|les|du|des|de|un|une|au|aux|sans|dans|sous|avec|sur|et)(?:\s|$)|(?:^|\s)[ld][\x27’]|[àâéèêëîïôùûüçœæ]/i;
  for (const id of allIds) {
    if (id === 'baby_name') continue;
    const enBatch = generateNames({ generator: id, genLanguage: 'en', quantity: 12, seed: `en-clean-${id}` });
    assert.ok(enBatch.length > 0, `Expected English output for ${id}`);
    for (const item of enBatch) {
      assert.ok(!frenchLeakRe.test(item.name), `French leak found in English ${id}: "${item.name}"`);
      assert.ok(
        !/\bthe (Fearless|Bold|Undying|Valkyrie|Shadow|Eternal|Wise)\b/i.test(item.name) || item.name.split(/\s+/).length <= 3,
        `Personal title leaked onto long/institutional phrase in ${id}: "${item.name}"`
      );
    }
  }

  console.log(`PASS criticalEngineFixes: checked ${allIds.length} generators cleanly.`);
}

run();
