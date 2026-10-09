#!/usr/bin/env node
// Read-only. Prints the name, url and state of every site page / landing page
// that uses one of the given templatePaths. Changes nothing in HubSpot.
//
// Usage (PowerShell):
//   $env:HUBSPOT_TOKEN = "pat-..."
//   node scripts\list-pages-by-template.js `
//     q-theme/templates/smoothwall/initial-upload/latest.html `
//     q-theme/templates/smoothwall/initial-templates/smw-monitor.html `
//     q-theme/templates/smoothwall/initial-templates/smw-book-a-demo.html

const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;
const wanted = new Set(process.argv.slice(2));

if (!HUBSPOT_TOKEN || wanted.size === 0) {
  console.error('Usage: HUBSPOT_TOKEN=xxx node scripts/list-pages-by-template.js <templatePath> [<templatePath> ...]');
  process.exit(1);
}

const PAGE_TYPES = ['site-pages', 'landing-pages'];
const API_BASE = 'https://api.hubapi.com/cms/v3/pages';

async function fetchAllPages(pageType) {
  const pages = [];
  let after;
  do {
    const query = new URLSearchParams({ limit: '100' });
    if (after) query.set('after', after);
    const res = await fetch(`${API_BASE}/${pageType}?${query}`, {
      headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}` },
    });
    if (!res.ok) throw new Error(`GET /${pageType} failed: ${res.status} ${await res.text()}`);
    const data = await res.json();
    pages.push(...data.results);
    after = data.paging?.next?.after;
  } while (after);
  return pages;
}

async function main() {
  const found = new Map([...wanted].map((path) => [path, []]));
  for (const pageType of PAGE_TYPES) {
    for (const page of await fetchAllPages(pageType)) {
      if (found.has(page.templatePath)) found.get(page.templatePath).push({ pageType, page });
    }
  }
  for (const [path, hits] of found) {
    console.log(`\n${path} (${hits.length} pages)`);
    for (const { pageType, page } of hits) {
      console.log(`  [${pageType}] ${page.name}`);
      console.log(`      ${page.url || '(no url)'}  | state: ${page.state}  | id: ${page.id}`);
    }
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
