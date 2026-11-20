import assert from 'node:assert/strict';
import { buildCsvContent, formatCsvCell, neutralizeSpreadsheetFormula } from '../utils/csv';

class MemoryStorage {
  private values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, String(value)); }
  removeItem(key: string) { this.values.delete(key); }
  clear() { this.values.clear(); }
}

const memory = new MemoryStorage();
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: memory });
Object.defineProperty(globalThis, 'window', {
  configurable: true,
  value: {
    localStorage: memory,
    dispatchEvent: () => true,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  },
});

const storage = await import('../services/storage');

// 1. Formula-injection payloads must be neutralized regardless of leading whitespace/tabs.
const dangerousInputs = [
  '=CMD("calc")',
  '+1+1',
  '-2+3',
  '@SUM(A1:A2)',
  '\t=HYPERLINK("https://example.com")',
  '\r=1+1',
  '  =1+1',
  '\n+42',
];

for (const payload of dangerousInputs) {
  const safe = neutralizeSpreadsheetFormula(payload);
  assert.ok(safe.startsWith("'"), `Payload "${JSON.stringify(payload)}" must be prefixed with apostrophe, got "${safe}"`);
  const cell = formatCsvCell(payload);
  assert.ok(cell.startsWith('"\''), `CSV cell for "${JSON.stringify(payload)}" must start with "' , got ${cell}`);
}

// 2. Normal values (including Unicode, French quotes, Arabic, Japanese) must not be altered unnecessarily.
assert.equal(neutralizeSpreadsheetFormula('Valmont'), 'Valmont');
assert.equal(neutralizeSpreadsheetFormula('العربية'), 'العربية');
assert.equal(neutralizeSpreadsheetFormula('アキラ'), 'アキラ');
assert.equal(formatCsvCell('Name "Nova"'), '"\'Name ""Nova"""'.replace("'", ''));
assert.equal(formatCsvCell('Name "Nova"'), '"Name ""Nova"""');

// 3. buildCsvContent protects both headers and rows.
const built = buildCsvContent(['=BadHeader', 'Safe'], [['+100', 'Normal']], { includeBom: true });
assert.ok(built.startsWith('\uFEFF"\'=BadHeader","Safe"'));
assert.ok(built.includes('"\'+100","Normal"'));

// 4. storage.exportDataCSV neutralizes saved names and private notes with formula prefixes.
storage.clearAllSavedNames();
storage.toggleSaveName('=1+1', 'brand', 'modern');
storage.updateEntryNote('=1+1', '@IMPORTXML("https://bad.example","//a")', 'brand', 'modern');
const csvExport = storage.exportDataCSV();
assert.ok(csvExport.includes('"\'=1+1"'), 'Saved name starting with = must be neutralized in exportDataCSV');
assert.ok(csvExport.includes('"\'@IMPORTXML'), 'Note starting with @ must be neutralized in exportDataCSV');

// 5. Prototype-pollution keys in JSON import must never pollute Object.prototype.
const maliciousJson = '{"version":3,"names":[{"name":"SafeName","generator":"fantasy","style":"default","saved":true,"__proto__":{"polluted":true}}],"collections":[{"id":"c1","name":"Col","color":"javascript:alert(1)","__proto__":{"polluted":true}}]}';
const importRes = storage.importDataJSON(maliciousJson);
assert.equal(importRes.success, true, 'Sanitized import should succeed cleanly');
assert.equal(({} as Record<string, unknown>).polluted, undefined, 'Object.prototype must not be polluted');
const importedCol = storage.getCollections().find((c) => c.name === 'Col');
assert.equal(importedCol?.color, '#8b5cf6', 'Unsafe collection color must fall back to default hex');

console.log('CSV and storage security checks passed.');
