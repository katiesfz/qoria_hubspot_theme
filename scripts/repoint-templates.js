#!/usr/bin/env node
// Usage:
//   HUBSPOT_TOKEN=xxx node scripts/repoint-templates.js --list
//     Lists every templatePath currently in use on site-pages/landing-pages,
//     with a page count for each, so you can build a mapping file from real data.
//
//   HUBSPOT_TOKEN=xxx node scripts/repoint-templates.js --mapping scripts/template-mapping.json [--apply]
//     Repoints pages whose templatePath is a key in the mapping file to that
//     key's value. Mapping file is JSON: { "old/path.html": "new/path.html", ... }
//     Defaults to a dry run; pass --apply to actually update HubSpot.

const fs = require('fs');

const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;
const args = process.argv.slice(2);
const listMode = args.includes('--list');
const mappingPath = getArg('--mapping');
const apply = args.includes('--apply');

function getArg(name) {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
}

if (!HUBSPOT_TOKEN || (!listMode && !mappingPath)) {
  console.error('Usage:');
  console.error('  HUBSPOT_TOKEN=xxx node scripts/repoint-templates.js --list');
  console.error('  HUBSPOT_TOKEN=xxx node scripts/repoint-templates.js --mapping <file.json> [--apply]');
  process.exit(1);
}

const PAGE_TYPES = ['site-pages', 'landing-pages'];
const API_BASE = 'https://api.hubapi.com/cms/v3/pages';

async function hubspotFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${HUBSPOT_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`${options.method || 'GET'} ${path} failed: ${res.status} ${await res.text()}`);
  }
  return res.status === 204 ? null : res.json();
}

async function fetchAllPages(pageType) {
  const pages = [];
  let after;
  do {
    const query = new URLSearchParams({ limit: '100' });
    if (after) query.set('after', after);
    const data = await hubspotFetch(`/${pageType}?${query}`);
    pages.push(...data.results);
    after = data.paging?.next?.after;
  } while (after);
  return pages;
}

async function runList() {
  for (const pageType of PAGE_TYPES) {
    const pages = await fetchAllPages(pageType);
    const counts = new Map();
    for (const page of pages) {
      counts.set(page.templatePath, (counts.get(page.templatePath) || 0) + 1);
    }
    console.log(`\n${pageType} (${pages.length} total):`);
    for (const [path, count] of [...counts.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`  ${String(count).padStart(4)}  ${path}`);
    }
  }
}

async function runMapping() {
  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  const matchedKeys = new Set();

  for (const pageType of PAGE_TYPES) {
    const pages = await fetchAllPages(pageType);
    const matches = pages.filter((page) => mapping[page.templatePath]);
    console.log(`\n${pageType}: ${matches.length} page(s) matched by mapping`);
    for (const page of matches) {
      matchedKeys.add(page.templatePath);
      const newPath = mapping[page.templatePath];
      console.log(`${apply ? 'Updating' : '[dry run]'} "${page.name}" (${page.id}): ${page.templatePath} -> ${newPath}`);
      if (apply) {
        await hubspotFetch(`/${pageType}/${page.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ templatePath: newPath }),
        });
      }
    }
  }

  const unusedKeys = Object.keys(mapping).filter((key) => !matchedKeys.has(key));
  if (unusedKeys.length) {
    console.log('\nMapping entries with no matching pages (check for typos):');
    unusedKeys.forEach((key) => console.log(`  ${key}`));
  }

  if (!apply) console.log('\nDry run only — rerun with --apply to make these changes.');
}

(listMode ? runList() : runMapping()).catch((err) => {
  console.error(err);
  process.exit(1);
});
