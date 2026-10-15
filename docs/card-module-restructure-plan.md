# Card module restructure plan

Module: `hubspot/q-theme/modules/card.module/`
Status: planned, not started. The card module is used almost everywhere (pages and sections across all sites), so every step below is judged by how much saved content it could break.

## Why

Findings from reading `fields.json` (1,720 lines) and `module.html` (470 lines):

**fields.json**
- Two parallel content models. The `multiple_text` toggle switches between `card.text` plus the `card.cta` group and the `text_group` repeater. The repeater carries its own copy of all CTA fields, and every field is gated on `card.multiple_text` via `visibility` / `advanced_visibility`.
- Duplicated definitions. The colour list appears 6 times, CTA style/size/colour 2 times each, and the icon group twice (`card.icon` and `styles.icon`).
- Legacy `aliases_mapping` entries on `card.cta.*` point at old flat paths (`card.link`, `card.cta_style`, ...).
- Six accent toggles sit loose in `styles`. `styles.responsive` is three nested groups with one `cards` field each.
- Inconsistent override pattern. Some fields use `inherit` (`override_image_fit`, `background_type`). `override_colour` uses `" "`, and `accent_colour` has no inherit option.
- Inconsistent ids: `card.shadow`, `card.colour`, `card.alignment` and `row.alignment` sit inside `styles`, `style.no_animate_on_mobile` is a typo, and `icon_toggle` / `custom_icon_height` have no prefix.
- Two `locked: true` overlap fields (`card.overlap`, `styles.overlap`).
- Choice values store class strings (`"bg-primary text-white"`, `" "`).
- Sample default content ("Linewize (North America)") sits in a shared parent theme.

**module.html**
- The icon rendering block is copy-pasted (~40 lines at 267-308 and 357-398), once for the accent header and once for the body header.
- The accent colour if/elif chain (8 branches) is repeated three times (heading, preheading, header background).
- The single-CTA branch and the `text_group` branch build CTA classes separately.
- Possible bugs to confirm while in there: `"background-color: rgba({{ ... }})"` inside `{% set %}` strings (nested `{{ }}` in a string), a `gradient` branch with no gradient field, and a stray `"` after `background-size: cover;` (line 24).

## Ground rule for all work

HubSpot stores module content by field **name path**. Renaming, moving or regrouping a field blanks its saved value on every page using the module. Phase A must not change any name, group nesting or choice value.

---

## Phase A: non-breaking cleanup

Goal: smaller, DRY, readable source. The editor and the saved data stay identical.

**A0. Baseline**
1. Run `find hubspot -name "card.module"` and note any child-theme copies or overrides. Each one needs the same treatment or a note.
2. Copy the current `fields.json` to a scratch file as the reference.
3. Confirm how this repo uploads modules (package.json scripts, `.github` workflows). `hs upload` and `hs watch` compile `fields.js` to `fields.json`, but check that CI and the `src` -> `hubspot` build do too, and that the wiki / module-reference tooling that reads `fields.json` still works. If any step reads `fields.json` directly, decide whether to commit the generated JSON or change that step.
   → verify: a test upload of a trivial `fields.js` module to the sandbox portal succeeds.

**A1. Convert to fields.js**
1. Create `fields.js` exporting the same structure. Put shared pieces in local constants and helpers:
   - `COLOURS` / `CTA_STYLE` / `CTA_SIZE` / `ALIGNMENT` choice lists
   - `ctaFields(prefix, visibilityFn)`, used for both `card.cta` and `text_group`
   - `iconFields(pathPrefix, { withInherit })`, used for `card.icon` and `styles.icon`
   - `multipleTextVisibility`, the repeated `advanced_visibility` block
2. Keep every `name`, `id`, nesting level, choice value, default, `occurrence` and `visibility` path exactly as is. Where the two icon groups differ (the card version adds `inherit`, `custom_image`, `icon_code` and `icon_field`), the helper takes options. It must not force them to match.
3. Delete the old `fields.json` only once step A2 passes.
   → verify: see A2.

**A2. Prove equivalence**
1. Write a throwaway script in the scratchpad (not committed) that loads `fields.js`, normalises both outputs (sorted keys, `JSON.parse` of the old file), and deep-diffs against the saved reference.
2. The only acceptable differences are ones you have listed and agreed in advance, e.g. removing the dead `aliases_mapping` entries (A3).
   → verify: the diff is empty (or only the agreed items).

**A3. Safe deletions (agree each before doing it)**
- The `aliases_mapping` entries are probably inert (they point at paths that no longer exist), but confirm no page still depends on the migration before removing them.
- The `locked: true` overlap fields: keep them. Locked fields still hold data. Only remove them if the template no longer reads them (`card.overlap` and `card.image_overlap` are read in module.html, so they stay).

**A4. Template DRY (separate commit, optional within A)**
Pure Jinja refactor, no field changes:
1. Extract an `accent_classes(colour)` macro or dict lookup to replace the three if/elif chains.
2. Extract an `icon()` macro to replace the two icon blocks.
3. Extract a `cta()` macro shared by the single and multi-text branches, if the HTML can match exactly.
4. Fix the possible bugs listed above only if confirmed, and call each out in the commit message.
   → verify: render the module before and after on 3-4 representative pages/sections (accent header, image header, icon on/off, `multiple_text` on, `animate_in` on) and compare the HTML output. Whitespace-only differences are fine.

**A5. Rollout**
1. Upload to the sandbox portal only and spot-check pages that use the module, in the editor and on the live page.
2. Compare the editor panel against the old one for the same module instance. Groups, labels and visibility behaviour must look identical.
3. Then merge to main and deploy, per the normal flow.
4. Update the wiki module reference (wiki-maintainer skill) and the Notion docs only if asked (update-notion-docs skill is explicit-request only).

Phase A exit criteria: fields.js equals the old JSON (except agreed deletions), template output unchanged on the test pages, deploy works.

---

## Phase B: structural redesign (breaking), as a new module

Do this only after Phase A ships. Because the card module is everywhere, ship B as a **new module** (`card-v2.module`, working name) and leave `card.module` in place and deprecated. Pages move over gradually, with no big-bang blanking of content.

**B1. Design (agree before building)**
- One content model: a "Content blocks" repeater (min 1, default 1) where each block has rich text plus an optional CTA. This removes `multiple_text`, `card.text` and `card.cta`.
- One shared CTA group, reused through the Phase A helpers.
- Consistent override rule: defaults live in `styles`, per-card overrides live on the card with an `inherit` option as the default.
- Group the six accent toggles into one "Accent section" group, and flatten responsive to `desktop_cards` / `tablet_cards` / `mobile_cards` (or one group with three fields).
- Store semantic values (`primary`, `teal`, ...) and map them to classes in the template via the single lookup from A4.
- Consistent ids (all `styles.*` fields have `styles.` ids) and neutral default content.
- Drop `locked` fields that the template no longer needs.

**B2. Build**
1. Create `card-v2.module` from the Phase A `fields.js` and `module.html`, then restructure.
2. Keep the CSS/JS shared, or copy it, so that `normaliseHeights` and `cardAnimateHandler` still work.

**B3. Migration**
1. List every usage of the card module (sections, templates, and pages via the HubSpot API/CLI; the repo's `migration/` scripts and `repoint-templates.js` are a useful starting point).
2. Decide per usage: replace by hand, or script a conversion that reads the old module's saved values and writes the new structure.
3. Sections in the theme (`hubspot/q-theme/sections/*.html`) are the easy bulk. Page-level instances need a script or manual rework.
4. Run both modules side by side until no instance of the old one remains, then remove `card.module`.
   → verify: a usage report shows zero remaining `card.module` instances before deletion.

**B4. Open questions**
- Is a new module name acceptable, or must the old name be reused (which means a one-shot migration, riskier)?
- Is automated migration worth building, given the number of page-level instances?
- Do the child themes (`qoria-theme-*`) override card fields or defaults anywhere?

---

## Suggested order

1. A0 baseline and tooling check
2. A1 + A2 (fields.js plus equivalence proof)
3. A3 deletions, only those agreed
4. A4 template DRY, as its own commit
5. A5 rollout
6. B1 design sign-off, then B2-B4
