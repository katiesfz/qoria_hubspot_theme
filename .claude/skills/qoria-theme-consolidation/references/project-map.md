# Qoria HubSpot theme project map

Read this before starting any phase. If anything here contradicts what you see in
the repo, trust the repo, tell the user, and suggest updating this file.

## Repo layout

| Path | What it is |
|---|---|
| `hubspot/q-theme/` | **Parent theme, the single source of truth.** Shared modules, sections, layouts, partials, CSS, JS, images. Holds no page templates of its own. |
| `hubspot/qoria-theme-<site>/` | Child themes (`"extends": "q-theme"` in `theme.json`). Site-specific page templates, modules, sections, partials, `child.css`, `child.js`. |
| `src/old_themes/q-theme-anz/`, `q-theme-uk/`, `q-theme-us/` | The drifted copies, as exported from each portal. **Read-only reference.** Never edit or deploy these. |
| `src/old_themes/*-archive*/` | Older archives. Ignore unless the user asks for them. |
| `src/hubspot-defaults/`, `src/bootstrap/`, `src/old_modules/` | Reference material. Not part of the migration. |
| `scripts/repoint-templates.js` | The user's own script for listing template usage and repointing pages via the CMS Pages API (site pages and landing pages). |
| `.github/workflows/` | `sandbox.yaml` (active) uploads the **whole `hubspot/` folder** to the ANZ portal on push to `sandbox`. `main.yaml` and `deploy.yaml` (all three portals) are currently commented out. Uploading is always done by the user, so never push to these branches. |
| `migration/` | Create this at the repo root for reports, rename plans, mapping files and `STATUS.md`. It sits outside `hubspot/` on purpose, because anything inside `hubspot/` gets uploaded to every portal on deploy. |

## Portals and sites

The same parent theme is (or will be) on all three portals. Each portal also
receives every child theme, because the deploy uploads the whole `hubspot/` folder.
The table says where each site's **pages actually live**, so it tells you which
drifted copy is that site's real history and which portal to repoint pages on.

| Site | Child theme | Brand in old labels | Portal | Drifted source | Old template folder | Old site-specific modules |
|---|---|---|---|---|---|---|
| AU | `qoria-theme-au` | Linewize | ANZ | `q-theme-anz` | `templates/linewize-au/` | `modules/region-specific/au/` |
| NZ | `qoria-theme-nz` | Linewize | ANZ | `q-theme-anz` | `templates/linewize-nz/` | `modules/region-specific/nz/` |
| Corp (label "Global") | `qoria-theme-corp` | Qoria | ANZ | `q-theme-anz` | `templates/qoria/` | none (check `modules/global/`) |
| UK | `qoria-theme-uk` | Smoothwall | UK | `q-theme-uk` | `templates/smoothwall/` | `modules/region-specific/uk/` |
| ES | `qoria-theme-es` | Qoria | UK | `q-theme-uk` | `templates/qoria-es/` | `modules/region-specific/es/` **and** `spain/` |
| EU | `qoria-theme-eu` | Qoria | UK | `q-theme-uk` | `templates/qoria-eu/` | `modules/region-specific/eu/` |
| US | `qoria-theme-us` | Linewize | US | `q-theme-us` | `templates/linewize-us/` | `modules/region-specific/us/` |

Every drifted theme contains **all** sites' template folders, because the same theme
was uploaded everywhere. For a given site, compare against the drifted copy from the
portal where that site lives (table above). The other portals' copies of that
folder are stale duplicates, though they're worth a glance if the user wants to know
whether a change was made on the "wrong" portal.

Items with no obvious owner that need a decision from the user when you reach them:
`templates/qustodio/` (ANZ copy only), `templates/global/`, `qa-test.html`,
`landing-page-whitepaper-typ.html` (US copy only), and `modules/campaigns/*`
(some campaign modules are site-specific, e.g. `ai-checklist-survey-eu`).

## Status (as of skill creation; check `migration/STATUS.md` for the latest)

- **UK** is the reference child theme and nearly done. Remaining: template renames,
  fixing broken references (see below), repointing pages.
- AU, NZ, US, Corp, ES, EU child themes exist but still carry prefixed template names
  and haven't been through the content reconciliation.

## Naming convention (agreed)

- **Template file:** drop the site code, whether prefix or suffix:
  `uk-landing-page.html` → `landing-page.html`, `au-resource-post.html` → `resource-post.html`.
- **Template label:** drop the brand and site code, and expand abbreviations:
  "Smoothwall LP with CTA" → "Landing Page with CTA", "Linewize AU WP" → "Webpage",
  "Smoothwall - Resource Post" → "Resource Post". The child theme's label
  ("Qoria Child Theme - UK") is what tells sites apart in the template picker.
- Product names that aren't the site brand (e.g. "eSafe", "EducatorImpact") stay.
- Site-specific **modules** used to keep their site suffix (e.g. `trending-topics-uk.module`).
  The UK child was renamed on 2026-10-07 to drop the "-uk" marker from names and labels
  (the user's call). Confirm with the user before renaming modules in other children.

## HubSpot path rules that matter here

- `/q-theme/modules/heading` is an absolute path from the portal's design-manager
  root, and it points at `hubspot/q-theme/modules/heading.module`.
- Relative paths in templates and partials resolve from the file's own folder. In a child
  theme, a relative path that isn't found in the child falls back to the same
  theme-relative path in the parent.
- **Sections are different.** A section is embedded into a template, so relative paths
  inside it (`get_asset_url('../../images/...')`, including ones in rich-text fields)
  resolve from the **template** that embeds it, not from the section file. Do not
  "fix" them to be relative to `sections/`. They must be correct for the template's depth
  (`templates/x.html` -> `../images/...`, `templates/initial-upload/x.html` ->
  `../../images/...`), so leave them alone when moving or renaming sections.
- Old templates sat one folder deeper (`templates/smoothwall/x.html`), so paths in
  **templates** like `../../sections/hero-banner.html` and `../../images/...` now climb
  out of the theme once a template moves to `templates/x.html`. Use one fewer `../`.
- Modules that moved from the parent's `modules/region-specific/<site>/` into a child
  must be referenced at their new location, e.g. `/qoria-theme-uk/modules/subscribe`.
- Pages store their **full template path**. Renaming or deleting a template file
  that pages still use breaks those pages.
- Blog post and listing templates are assigned per blog (Settings → Website → Blog →
  Templates), not per page. `repoint-templates.js` doesn't change them.
- The parent theme files use CRLF line endings and the portal exports use LF. Any
  comparison must ignore line endings, or everything looks changed.
