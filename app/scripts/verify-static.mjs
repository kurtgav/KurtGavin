import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join, extname } from 'node:path';

const root = resolve('dist');
async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : path.endsWith('.html') ? [path] : [];
  }));
  return nested.flat();
}
const failures = [];
const pages = await htmlFiles(root);
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  if (html.includes('/_next/')) failures.push(`${file}: unexpected Next.js runtime`);
  if (html.includes('Applied AI initiatives') || html.includes('/ai-initiatives/')) failures.push(`${file}: removed AI initiatives project remains`);
  if (html.includes('GEO optimization platform')) failures.push(`${file}: outdated GEO project title`);
  for (const [, reference] of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    if (!reference.startsWith('/') || reference.startsWith('//')) continue;
    const { pathname } = new URL(reference, 'https://portfolio.example');
    const path = decodeURIComponent(pathname);
    if (!extname(path) && !path.endsWith('/')) {
      failures.push(`${file}: page link requires trailing slash: ${path}`);
      continue;
    }
    const target = resolve(root, `.${path}`, path.endsWith('/') ? 'index.html' : '');
    if (!target.startsWith(root + '/')) {
      failures.push(`${file}: path outside build: ${path}`);
      continue;
    }
    try { assert((await stat(target)).isFile()); }
    catch { failures.push(`${file}: missing asset or route: ${path}`); }
  }
}
assert.equal(failures.length, 0, failures.join('\n'));
assert.equal(pages.length, 9, 'Expected four portfolio pages and five recreated project pages');
assert.equal(pages.filter(file => file.includes('/concepts/')).length, 5, 'Expected five recreated project pages');
assert(!pages.some(file => file.includes('/ai-initiatives/')), 'Removed AI initiatives route must not be generated');
console.log(`Verified ${pages.length} static pages: internal links, assets, trailing slashes, and no Next runtime.`);
