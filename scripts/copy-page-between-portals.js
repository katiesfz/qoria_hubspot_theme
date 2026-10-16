#!/usr/bin/env node
// Copies one site page or landing page from one HubSpot portal to another as a
// draft, keeping its template, settings and module content, and remapping the
// portal-specific module_ids on the page to the target portal's modules.
//
// Usage:
//   HUBSPOT_TOKEN_<sourcePortalId>=xxx HUBSPOT_TOKEN_<targetPortalId>=yyy \
//     node scripts/copy-page-between-portals.js --page <pageId> --from <sourcePortalId> --to <targetPortalId> [--override <sourceModuleId>=<target module folder>]... [--apply]
//
// Tokens are read from environment variables named HUBSPOT_TOKEN_<portalId>
// (private app tokens; source needs content read, target needs content write).
// Each token is checked against the portal id you pass, so they can't be swapped.
// Defaults to a dry run; pass --apply to create the page.
//
// Prereqs: the page's template and the theme's modules must already exist in
// the target portal (e.g. `hs cms upload`). Modules are matched between portals
// by their folder path inside <theme>/modules. Use --override to point a source
// module at a different target module, e.g.
//   --override 223088807216=qoria-theme-uk/modules/campaigns/swipe-game.module
//
// Not remapped: forms, CTAs, HubDB tables, blogs, menus and files. Their IDs in
// module fields are portal-specific and need checking on the new page.

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const pageId = getArg('--page');
const fromPortal = getArg('--from');
const toPortal = getArg('--to');
const overrides = args.flatMap((a, i) => (a === '--override' ? [args[i + 1]] : []));

function getArg(name) {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
}

const fromToken = process.env[`HUBSPOT_TOKEN_${fromPortal}`];
const toToken = process.env[`HUBSPOT_TOKEN_${toPortal}`];

if (!pageId || !fromPortal || !toPortal || !fromToken || !toToken) {
  console.error('Usage:');
  console.error('  node scripts/copy-page-between-portals.js --page <pageId> --from <sourcePortalId> --to <targetPortalId> [--override <sourceModuleId>=<target module folder>]... [--apply]');
  console.error('Tokens are read from HUBSPOT_TOKEN_<sourcePortalId> and HUBSPOT_TOKEN_<targetPortalId>.');
  if (fromPortal && !fromToken) console.error(`Missing env var HUBSPOT_TOKEN_${fromPortal}`);
  if (toPortal && !toToken) console.error(`Missing env var HUBSPOT_TOKEN_${toPortal}`);
  process.exit(1);
}

const API = 'https://api.hubapi.com';
const SOURCE_CODE = `${API}/cms/v3/source-code/published`;

// Only these fields are copied; everything else (ids, domain, urls, dates,
// authors, translations) is portal-specific or read-only.
const COPY_FIELDS = [
  'name', 'slug', 'htmlTitle', 'metaDescription', 'templatePath', 'language',
  'featuredImage', 'featuredImageAltText', 'useFeaturedImage', 'subcategory',
  'headHtml', 'footerHtml', 'linkRelCanonicalUrl', 'enableLayoutStylesheets',
  'themeSettingsValues', 'layoutSections', 'widgets', 'widgetContainers', 'groupedWidgets',
];

const auth = (token) => ({ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });

async function checkPortal(token, expectedId, label) {
  const res = await fetch(`${API}/account-info/v3/details`, auth(token));
  if (!res.ok) throw new Error(`${label} portal lookup failed: ${res.status} ${await res.text()}`);
  const details = await res.json();
  if (String(details.portalId) !== String(expectedId)) {
    throw new Error(`${label} token belongs to portal ${details.portalId}, not ${expectedId} — aborting.`);
  }
  console.log(`${label}: portal ${details.portalId} (${details.accountType})`);
}

async function getPage() {
  for (const pageType of ['site-pages', 'landing-pages']) {
    const res = await fetch(`${API}/cms/v3/pages/${pageType}/${pageId}`, auth(fromToken));
    if (res.ok) return { pageType, page: await res.json() };
  }
  throw new Error(`Page ${pageId} not found as a site page or landing page in portal ${fromPortal}`);
}

// Map of module folder (relative to the scanned directory, e.g.
// "q-theme/modules/campaigns/x.module") -> module_id. Folders that aren't
// *.module are searched recursively.
async function moduleIdsByFolder(token, dirs) {
  const ids = new Map();
  async function scan(dir) {
    const res = await fetch(`${SOURCE_CODE}/metadata/${dir}`, auth(token));
    if (!res.ok) return;
    const listing = await res.json();
    await Promise.all((listing.children || []).map(async (child) => {
      const path = `${dir}/${child}`;
      if (!child.endsWith('.module')) return scan(path);
      const meta = await fetch(`${SOURCE_CODE}/content/${path}/meta.json`, auth(token));
      if (!meta.ok) return;
      try {
        ids.set(path, JSON.parse(await meta.text()).module_id);
      } catch {}
    }));
  }
  await Promise.all(dirs.map(scan));
  return ids;
}

async function buildModuleIdMap(page) {
  const theme = page.templatePath.split('/')[0];
  const dirs = theme.startsWith('@') ? ['modules'] : [`${theme}/modules`, 'modules'];
  const [source, target] = await Promise.all([moduleIdsByFolder(fromToken, dirs), moduleIdsByFolder(toToken, dirs)]);
  const idMap = new Map();
  const missing = [];
  for (const [folder, sourceId] of source) {
    if (target.get(folder)) idMap.set(sourceId, target.get(folder));
    else missing.push(folder);
  }
  console.log(`Module ID map: ${idMap.size} of ${source.size} source module(s) in ${dirs.join(', ')} found in the target`);
  if (missing.length) console.log(`  Not in target: ${missing.join(', ')}`);

  for (const override of overrides) {
    const [sourceId, folder] = override.split('=');
    const res = await fetch(`${SOURCE_CODE}/content/${folder}/meta.json`, auth(toToken));
    if (!res.ok) throw new Error(`Override target not found in portal ${toPortal}: ${folder} (${res.status})`);
    idMap.set(Number(sourceId), JSON.parse(await res.text()).module_id);
    console.log(`  Override: ${sourceId} -> ${folder}`);
  }
  return idMap;
}

function remapModuleIds(node, idMap, stats) {
  if (Array.isArray(node)) {
    node.forEach((child) => remapModuleIds(child, idMap, stats));
  } else if (node && typeof node === 'object') {
    if (node.module_id) {
      const targetId = idMap.get(node.module_id);
      if (targetId) {
        node.module_id = targetId;
        stats.remapped++;
      } else {
        stats.unmapped.add(node.module_id);
      }
    }
    Object.values(node).forEach((child) => remapModuleIds(child, idMap, stats));
  }
}

async function run() {
  if (fromPortal === toPortal) throw new Error('Source and target portal are the same — aborting.');
  await checkPortal(fromToken, fromPortal, 'Source');
  await checkPortal(toToken, toPortal, 'Target');

  const { pageType, page } = await getPage();
  console.log(`\nPage: "${page.name}" (${page.id}, ${pageType}), template ${page.templatePath}`);

  if (!page.templatePath.startsWith('@hubspot/')) {
    const res = await fetch(`${SOURCE_CODE}/metadata/${page.templatePath}`, auth(toToken));
    if (!res.ok) throw new Error(`Template ${page.templatePath} not found in portal ${toPortal} — upload it first.`);
  }

  const payload = {};
  for (const field of COPY_FIELDS) {
    if (page[field] !== undefined && page[field] !== null) payload[field] = structuredClone(page[field]);
  }

  const idMap = await buildModuleIdMap(page);
  const stats = { remapped: 0, unmapped: new Set() };
  remapModuleIds(payload, idMap, stats);
  console.log(`\n${stats.remapped} module_id(s) remapped`);
  console.log(`module_ids left unchanged (HubSpot's own modules, or custom modules not in the scanned folders): ${[...stats.unmapped].join(', ') || 'none'}`);
  console.log('Forms, CTAs, HubDB tables, blogs, menus and files are not remapped — check them on the new page.');

  if (!apply) {
    console.log('\nDry run only — rerun with --apply to create the page in the target portal.');
    return;
  }
  const res = await fetch(`${API}/cms/v3/pages/${pageType}`, { ...auth(toToken), method: 'POST', body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(`Create failed: ${res.status} ${await res.text()}`);
  const created = await res.json();
  console.log(`\nCreated draft "${created.name}" in portal ${toPortal}: id ${created.id}`);
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
