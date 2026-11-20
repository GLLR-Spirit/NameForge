import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../dist/assets/', import.meta.url);
const sentinels = [
  'Simply better, every day',
  'Operation Clear Sky',
  'The Grand Meridian',
  'Built for tomorrow, ready today',
];
const files = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (/\.(?:js|mjs|css|json)$/i.test(entry.name)) files.push(path);
  }
}

await collect(root.pathname);
const leaked = [];
for (const file of files) {
  const content = await readFile(file, 'utf8');
  for (const sentinel of sentinels) {
    if (content.includes(sentinel)) leaked.push({ file: file.replace(root.pathname, ''), sentinel });
  }
}
if (leaked.length) {
  for (const item of leaked) console.error(`FAIL quarantined phrase found in bundle ${item.file}: ${item.sentinel}`);
  throw new Error(`Found ${leaked.length} quarantined phrase sentinel(s) in the production bundle.`);
}
console.log(`Phrase-bank quarantine verified: scanned ${files.length} production assets; no sentinel phrases found.`);
