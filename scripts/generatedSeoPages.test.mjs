import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const distPath = decodeURIComponent(dist.pathname);
const sitemapPath = join(distPath, 'sitemap.xml');
const sitemap = readFileSync(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

assert.ok(sitemap.includes('<urlset'), 'generated sitemap should contain a urlset root');
assert.ok(sitemap.includes('</urlset>'), 'generated sitemap should close its urlset root');
assert.ok(urls.includes('https://gllr-spirit.github.io/nameforge/'), 'generated sitemap should include the homepage');
assert.ok(urls.length > 6500, 'generated sitemap should include every generator in all 28 languages');
assert.equal(new Set(urls).size, urls.length, 'generated sitemap URLs should be unique');
assert.ok(urls.every((url) => !url.includes('#')), 'sitemap URLs must not contain fragments');

function countHtmlFiles(directory) {
  return readdirSync(directory).reduce((count, name) => {
    const path = join(directory, name);
    return count + (statSync(path).isDirectory()
      ? countHtmlFiles(path)
      : (name === 'index.html' ? 1 : 0));
  }, 0);
}

const pagesRoot = join(distPath, 'seo');
const pageCount = countHtmlFiles(pagesRoot);
assert.ok(pageCount > 6500, 'build should generate localized static HTML landing pages for the generator catalogue');
assert.equal(pageCount, urls.length - 1, 'every generated landing page should have one sitemap entry');

const CANONICAL_ORIGIN = 'https://gllr-spirit.github.io/nameforge/';
const FORBIDDEN_ORIGIN = /https?:\/\/hhkskkkdjwbf\.github\.io|jjspa4830-hue\.github\.io|rayanellg\.github\.io\/nameforge/i;

assert.ok(!FORBIDDEN_ORIGIN.test(sitemap), 'generated sitemap must not contain any legacy or misspelled production origin');
assert.ok(urls.every((url) => url.startsWith(CANONICAL_ORIGIN)), 'every generated sitemap URL must use the official NFV2.1 production origin');

const distIndexHtml = readFileSync(join(distPath, 'index.html'), 'utf8');
assert.ok(distIndexHtml.includes(`<link rel="canonical" href="${CANONICAL_ORIGIN}" />`), 'built index.html must retain the canonical NFV2.1 origin');
assert.ok(!FORBIDDEN_ORIGIN.test(distIndexHtml), 'built index.html must not contain any legacy or misspelled origin');

const distRobotsTxt = readFileSync(join(distPath, 'robots.txt'), 'utf8');
assert.ok(distRobotsTxt.includes(`Sitemap: ${CANONICAL_ORIGIN}sitemap.xml`), 'built robots.txt must point to the canonical NFV2.1 sitemap');
assert.ok(!FORBIDDEN_ORIGIN.test(distRobotsTxt), 'built robots.txt must not contain any legacy or misspelled origin');

for (const id of ['fantasy', 'brand', 'sci-fi']) {
  const pagePath = join(pagesRoot, 'generators', id, 'index.html');
  const html = readFileSync(pagePath, 'utf8');
  assert.ok(!FORBIDDEN_ORIGIN.test(html), `${id} page must not contain any legacy or misspelled production origin`);
  assert.equal((html.match(/hreflang="/g) || []).length, 29, `${id} page should declare 28 languages plus x-default`);
  assert.match(html, /<title>.+NameForge<\/title>/, `${id} page should have a page-specific title`);
  assert.match(html, /<meta name="description" content="[^"]+"/, `${id} page should have a meta description`);
  assert.match(html, new RegExp(`<link rel="canonical" href="https://hhkskkkdjwbf-bot\\.github\\.io/NFV2\\.1/seo/generators/${id}/">`), `${id} page should have a canonical URL`);
  assert.match(html, new RegExp(`<meta property="og:url" content="https://hhkskkkdjwbf-bot\\.github\\.io/NFV2\\.1/seo/generators/${id}/">`), `${id} page should have an og:url matching the canonical origin`);
  assert.ok(html.includes(`#/generator/${id}`), `${id} page should link to the matching interactive generator`);
  const structuredDataMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(structuredDataMatch, `${id} page should include structured data`);
  assert.doesNotThrow(() => JSON.parse(structuredDataMatch[1]), `${id} structured data should be valid JSON`);
  const jsonLd = JSON.parse(structuredDataMatch[1]);
  assert.ok(String(jsonLd.url).startsWith(CANONICAL_ORIGIN), `${id} JSON-LD url must start with canonical NFV2.1 origin`);
}

for (const [lang, dir] of [['ar', 'rtl'], ['ja', 'ltr'], ['fr', 'ltr']]) {
  const html = readFileSync(join(pagesRoot, lang, 'generators', 'fantasy', 'index.html'), 'utf8');
  assert.ok(!FORBIDDEN_ORIGIN.test(html), `${lang} page must not contain any legacy or misspelled origin`);
  assert.ok(html.includes(`<html lang="${lang}" dir="${dir}">`), `${lang} page should declare its language and direction`);
  assert.ok(html.includes(`https://gllr-spirit.github.io/nameforge/seo/${lang}/generators/fantasy/`), `${lang} page should use its own canonical URL`);
}

console.log(`Generated SEO checks passed: ${pageCount} static landing pages and ${urls.length} sitemap URLs.`);
