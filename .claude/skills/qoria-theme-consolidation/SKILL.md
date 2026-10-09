---
name: qoria-theme-consolidation
description: Guides the Qoria HubSpot theme consolidation project. It re-aligns the drifted copies of the shared theme (from the ANZ, UK and US portals) into the single parent theme q-theme, builds and tidies the per-site child themes (qoria-theme-uk, -au, -nz, -us, -corp, -es, -eu), renames templates to site-neutral names, fixes broken module and section paths, and prepares the template mapping for repointing HubSpot pages to the child-theme templates. Use this skill whenever the user mentions q-theme, a qoria-theme-* child theme, old_themes, theme drift, comparing or diffing theme modules, moving modules or templates into a child theme, renaming templates, repoint-templates.js, template mapping, or repointing pages for any of the Smoothwall, Linewize or Qoria sites. Use it even when the user only names one step ("next site", "check the AU templates", "fix the UK paths") without describing the whole project.
---

# Qoria theme consolidation

One HubSpot theme was uploaded to three portals (ANZ, UK, US) serving seven sites,
and each portal's copy drifted. The goal is:

1. **Re-align** all shared code into one parent theme, `hubspot/q-theme`.
2. **Build a child theme per site** holding only that site's templates, modules and sections.
3. **Repoint pages** on each portal to the correct child-theme templates.

Before doing anything, read `references/project-map.md`. It has the repo layout,
which site lives on which portal, where each site's old files are, the naming
convention, and HubSpot path rules. Most mistakes in this project come from getting
one of those wrong.

## Two rules that come before everything else

**1. Never decide which version of a file is correct on your own.** When a module,
section, template, partial, CSS/JS file or image differs between a drifted copy and
the parent (or child), show the user exactly what differs and wait for their
decision. The user knows which changes were deliberate, which were experiments and
which were mistakes, and that history isn't in the code. Compare **contents**, not
just names: a file with the same name can carry meaningful edits, and a renamed
file can be a copy of something that already exists. Identical files, and files that
differ only in line endings or whitespace, are not decisions. Report their counts
and move on.

**2. Never change anything in HubSpot.** The user does all uploading and anything
that writes to a portal themselves. That means no `hs upload`, `hs watch` or
`hs remove`, no pushes or merges to `sandbox`/`main` (those branches deploy), and no
`repoint-templates.js --apply`. Your job ends at changed files in the repo and
ready-to-run commands. When a step needs something uploaded or applied, say
exactly what (which theme, which files, which command), then wait for the user to
tell you it's done before continuing. Read-only commands the user runs with their
own token, like `repoint-templates.js --list` and its dry run, are fine to prepare.
Never ask for a token in the chat.

## Before starting: work out where things stand

1. Read `migration/STATUS.md` at the repo root. If it doesn't exist, create it from
   the template at the bottom of this file and fill it in by asking the user.
2. Confirm with the user which site and which phase you're working on. Several
   sites can be at different phases at once.

## How to present differences

The user wants to see the actual changes, not just a description of them. For
every unit that needs a decision, show:

1. **A plain-language summary** of each changed file: what behaviour or content
   differs, in a sentence or two each.
2. **The diff itself** in a ```diff block, with every hunk for that file, copied from
   the file in `diffs/` (OLD = drifted copy, NEW = parent or child). Keep the `@@`
   line-number headers so the user can find the spot. Diffs up to about 150
   changed lines are shown in full. For longer ones, show every hunk that changes
   logic, markup, fields or content, collapse purely mechanical runs (e.g. 80
   identical class renames) into a one-line note saying what was collapsed and how
   many lines, and give the path to the full diff.
   For **JSON files** (`fields.json`, `meta.json`, `theme.json`), show the
   `.data.diff` instead of the raw one. It compares the data with keys sorted and
   HubSpot's noise keys removed, so a removed field or changed default is visible
   instead of being buried under reordered keys. Offer the raw diff if the user wants it.
3. **Anything risky in the change**, called out explicitly:
   - **Portal-specific ids** (the report flags long numbers in changed lines). Menu,
     form, HubDB table, CTA and blog ids only exist on the portal they came from, so
     a version containing one will break or behave differently on the other portals.
   - Changes to the parent that alter rendering on **all seven sites** (shared CSS,
     module default field values, layouts). The user may want the change in one
     child instead.
   - Removed fields in `fields.json`. Pages using that field lose the content.
4. **Which looks newer**, as an observation rather than a decision. Say what it's
   based on (comments or dates, matching another portal's copy, a more complete
   feature, a portal-neutral rewrite), and say plainly when you can't tell.
5. **Options:** keep parent / take <portal> copy / merge (user says which parts) / skip for now.

Because each unit now carries its full diff, use batches of **3–4 units**, simplest
first. Show JSON export noise once, as a single short list (unit names only), and
ask whether to treat it all as matching. Do the same for the "likely leftover" group.

Example of one unit:

````
### modules/statistic.module   (UK portal copy → parent)

**module.html**: the UK copy colours each stat's description in the stat colour;
the parent leaves descriptions in the default text colour.

```diff
@@ -69,7 +69,7 @@
               <p class="fs-4 text-{{statColour}} fw-semibold mb-2 lh-1">{{ item.statistic_header }}</p>
           {%endif%}
           {% if item.description != "" %}
-              <p class=" text-{{statColour}}">{{ item.description }}</p>
+              <p>{{ item.description }}</p>
           {%endif%}
```

**fields.json / meta.json**: export noise only.
Risk: affects every site using this module.
Which looks newer: can't tell. It's a styling choice. Do UK pages rely on coloured descriptions?
Options: keep parent / take UK copy / skip
````

## Phase 1: Re-align shared code into the parent

Do this once per **portal** (ANZ, UK, US), not per site. Each drifted copy is
compared with the current parent, so decisions from earlier portals are already in
`q-theme` by the time you compare the next one.

**1. Run the comparison**, excluding every site's template folder and the
region-specific modules (those are Phase 2). Include images, because missing logos
and diagrams were a real problem on the UK site.

```bash
python <skill>/scripts/compare_themes.py \
  --old src/old_themes/q-theme-uk --new hubspot/q-theme \
  --also-new hubspot/qoria-theme-uk --also-new hubspot/qoria-theme-es --also-new hubspot/qoria-theme-eu \
  --exclude 'templates/smoothwall' --exclude 'templates/linewize-*' --exclude 'templates/qoria*' \
  --exclude 'templates/qustodio' --exclude 'modules/region-specific' \
  --out migration/reports/uk-vs-parent
```

Pass the child themes for that portal's sites as `--also-new`, so units that
already moved into a child are recognised as "moved" instead of "missing".
`report.md` embeds every diff of up to 400 changed lines (data-level diffs for
JSON), so the user can read it alongside the conversation.

**2. Statuses in the report:**

- `identical`, `line-endings-only`, `whitespace-only`: same code. Report the count only.
- `json-export-noise`: the only JSON differences are keys HubSpot rewrites per
  portal (`module_id`, field ids, editor defaults). Ask once about the whole group.
- `different`, `moved+different`: real decisions. Present them as described above.
- `only-in-old (likely leftover)`: named copy, archive, temp, sandbox, backup or old.
  Ask once about the whole group, listing every name.
- `only-in-old`: exists in the drifted copy but not in the parent or any child.
  It could be something that needs adding, or something deliberately removed.
  Show its contents briefly (what it is and what uses it) and ask.
- `only-in-new`: parent-only. This is usually fine (newer work), so give the count
  and offer the list.

**3. Apply only what the user chose**, and only to `hubspot/q-theme` (or a child,
if they decide something belongs to one site). Never edit `src/old_themes/`.
Show the resulting change as a diff after applying it.

**4. Record every decision** in the decisions log in `migration/STATUS.md`
(unit, choice, reason if given). The next portal's comparison will often show the
same unit again, and the log saves asking twice. Raise it if a later portal's
copy conflicts with an earlier decision.

## Phase 2: Build the site's child theme

**1. Compare the site's old files with its child theme**, applying the same rules
about decisions and presentation:

```bash
# templates
python <skill>/scripts/compare_themes.py \
  --old src/old_themes/q-theme-uk/templates/smoothwall --new hubspot/qoria-theme-uk/templates \
  --strip-prefix uk- --out migration/reports/uk-templates
# site-specific modules (ES has two folders: es/ and spain/)
python <skill>/scripts/compare_themes.py \
  --old src/old_themes/q-theme-uk/modules/region-specific/uk --new hubspot/qoria-theme-uk/modules \
  --strip-prefix uk- --out migration/reports/uk-modules
```

`--strip-prefix` makes `uk-landing-page.html` match `landing-page.html` and
`trending-topics-uk.module` match `trending-topics.module`. Anything `only-in-old`
here is a site item that hasn't moved yet. Confirm with the user before moving it.

When many template differences follow the same pattern (e.g. the same image-path
fix in five templates), show the diff once in full, list the other files it applies
to, and let the user decide the pattern as a group.

**2. Move site-specific items** into the child, keeping the structure used in
`qoria-theme-uk` (the reference child): `modules/`, `modules/campaigns/<campaign>/`,
`sections/`, `templates/`, `templates/partials/`, `templates/layouts/`.

**3. Rename templates** to the agreed site-neutral convention:

```bash
python <skill>/scripts/plan_renames.py --theme hubspot/qoria-theme-uk --site uk          # dry run
python <skill>/scripts/plan_renames.py --theme hubspot/qoria-theme-uk --site uk --apply  # after review
```

Show the user the plan. Duplicate labels (e.g. `resource-post.html` and
`resource-post-update.html` both becoming "Resource Post") and name collisions need
agreement first, and `--apply` refuses to run while they remain. Check the `--list`
output (Phase 3) before renaming anything that live pages already use **in the child
theme**. Pages still on the old shared theme are unaffected by a child rename.

**4. Check every reference resolves:**

```bash
python <skill>/scripts/check_references.py --theme hubspot/qoria-theme-uk --site uk --old-themes src/old_themes
python <skill>/scripts/check_references.py --theme hubspot/q-theme
```

- `escapes-theme`: a leftover extra `../`. The script suggests the fix. Ignore this for
  paths inside `sections/*.html`: the script resolves them from the section file, but they
  are really relative to the embedding template, so don't edit them (see project-map.md).
- `missing` with "exists in this theme": the module moved into the child but
  the path wasn't updated. Point it at the child path.
- `missing` with "still in old: …": the file hasn't been reconciled into the
  parent yet. That's a Phase 1 item, so raise it rather than copying it silently.
- `missing` with "not in any old theme": genuinely gone. Ask the user.
- `other-site` / "also points at another site": e.g. the UK resource post using
  `trending-topics-nz`. This is often a copy-paste slip, but sometimes intentional, so ask.

Show the exact line changes you propose as a diff, apply what the user agrees to,
and rerun until only accepted items remain. Recording the accepted leftovers in
`STATUS.md` keeps them from being raised again.

## Phase 3: Repoint pages on the site's portal

Pages store full template paths, so order matters. The user does every step that
touches HubSpot. You prepare and check.

1. **Hand over for upload.** Tell the user the child theme is ready to upload to
   the site's portal, and that the old templates must stay in place for now. List
   what changed since their last upload if you know it. Wait for them to confirm
   it's uploaded.
2. **Ask them to list what's in use** on that portal and save it into the repo:
   `HUBSPOT_TOKEN=xxx node scripts/repoint-templates.js --list > migration/<portal>-templates.txt`
3. **Build the mapping** for the site from that file:
   ```bash
   python <skill>/scripts/build_mapping.py --site uk --child hubspot/qoria-theme-uk \
     --old-folder smoothwall --list migration/uk-portal-templates.txt \
     --out migration/template-mapping-uk.json
   ```
   Go through the "no local target" list with the user. Each one needs a new child
   template or an agreed alternative mapping. Show the final mapping file.
4. **Give them the dry-run command** and review its output together:
   `HUBSPOT_TOKEN=xxx node scripts/repoint-templates.js --mapping migration/template-mapping-uk.json`
5. **They run `--apply`** when they're happy. This changes live pages, so it's
   always their call and their command.
6. **Verify** from a fresh `--list` they save. No pages for this site should remain
   on `templates/<old-folder>/` or on pre-rename child paths.
7. **Blog templates** are set per blog in HubSpot settings, which the script doesn't
   touch. Remind the user to switch each blog's post and listing templates.
8. **Old templates.** Once step 6 shows nothing uses them, tell the user which old
   template files on the portal are now unused and safe for them to remove. That's
   only this site's folder in the old shared theme, never the whole theme, since
   other sites on the same portal still use it.

## Keeping this skill up to date

The user may ask you to change how this skill works, or you may notice the project
has moved on (a site finished, a convention changed, a new recurring check). When
that happens:

- Edit the skill's own files (`SKILL.md`, `references/project-map.md`,
  `scripts/`) where this skill is installed, and show the user the change as a diff
  before or straight after making it.
- Prefer updating `project-map.md` for facts (status, mappings, conventions) and
  `SKILL.md` for how to work.
- If a script misbehaves (a false flag, a missed case), fix the script rather than
  working around it in conversation, then rerun it.
- Keep the two rules at the top intact unless the user explicitly changes them.

## STATUS.md template

```markdown
# Theme consolidation status

## Phase 1 – parent re-alignment (per portal)
| Portal | Compared | Decisions done | Applied to q-theme | Uploaded by user |
|---|---|---|---|---|
| ANZ | | | | |
| UK  | | | | |
| US  | | | | |

## Phase 2/3 – per site
| Site | Child compared | Items moved | Renamed | References clean | Uploaded by user | Mapping ready | Pages repointed (user) | Blogs switched (user) | Old templates removed (user) |
|---|---|---|---|---|---|---|---|---|---|
| UK | | | | | | | | | |
| ES | | | | | | | | | |
| EU | | | | | | | | | |
| AU | | | | | | | | | |
| NZ | | | | | | | | | |
| Corp | | | | | | | | | |
| US | | | | | | | | | |

## Decisions log
| Date | Unit | Compared | Choice | Reason |
|---|---|---|---|---|

## Accepted leftovers (don't re-flag)
-
```
