#!/usr/bin/env python3
"""
Propose (and optionally apply) site-neutral names and labels for a child theme's templates.

  python plan_renames.py --theme hubspot/qoria-theme-uk --site uk            # dry run: prints the plan
  python plan_renames.py --theme hubspot/qoria-theme-uk --site uk --apply    # renames + relabels

Convention (agreed with the user):
  file   uk-landing-page.html            -> landing-page.html      (site code dropped, prefix or suffix)
  label  "Smoothwall LP with CTA"        -> "Landing Page with CTA" (brand + site code dropped,
                                                                    LP -> Landing Page, WP -> Webpage)
The child theme's own label ("Qoria Child Theme - UK") is what tells sites apart in HubSpot.

Only files with a templateType annotation are considered; layouts/, partials/ and system/
are skipped (they aren't picked by editors). Use --include-initial-upload to also cover
templates/initial-upload/.

The plan flags name collisions, existing target files, and duplicate or empty labels -
review these with the user before --apply (which refuses while any remain). Also check
that templates marked isAvailableForNewContent: false are worth keeping at all.
--apply also rewrites any references to a renamed file inside the same theme.
A JSON copy of the plan is written to migration/<theme>-rename-plan.json (outside hubspot/).
"""
import argparse, json, os, re
from pathlib import Path

BRANDS = ['Smoothwall', 'Linewize', 'Qoria', 'Boilerplate']
SITE_WORDS = ['UK', 'AU', 'NZ', 'US', 'ES', 'EU', 'ANZ', 'Global', 'Corp']
ABBREV = [(r'\bLP\b', 'Landing Page'), (r'\bWP\b', 'Webpage')]
SKIP_DIRS = {'layouts', 'partials', 'system'}


def clean_label(label):
    out = label
    for b in BRANDS:
        out = re.sub(rf'\b{b}\b', '', out, flags=re.I)
    for w in SITE_WORDS:
        out = re.sub(rf'\b{w}\b', '', out)
    for pat, rep in ABBREV:
        out = re.sub(pat, rep, out)
    out = re.sub(r'\s+', ' ', out).strip()
    out = re.sub(r'^[-–:|]\s*', '', out).strip()
    out = re.sub(r'\s*[-–]\s*$', '', out).strip()
    return out


def clean_name(name, site):
    stem, ext = os.path.splitext(name)
    stem = re.sub(rf'^{site}-', '', stem)
    stem = re.sub(rf'-{site}$', '', stem)
    return stem + ext


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--theme', required=True)
    ap.add_argument('--site', required=True, help='Site code used in file names: uk, au, nz, us, es, eu, corp')
    ap.add_argument('--include-initial-upload', action='store_true')
    ap.add_argument('--apply', action='store_true')
    ap.add_argument('--plan-dir', default='migration',
                    help='Where to write the JSON plan. Keep this OUTSIDE hubspot/, because the deploy '
                         'action uploads everything in hubspot/ to the portals.')
    args = ap.parse_args()

    root = Path(args.theme)
    tdir = root / 'templates'
    plan = []
    for f in sorted(tdir.rglob('*.html')):
        rel = f.relative_to(tdir)
        if rel.parts[0] in SKIP_DIRS:
            continue
        if rel.parts[0] == 'initial-upload' and not args.include_initial_upload:
            continue
        text = f.read_text(encoding='utf-8', errors='replace')
        head = text[:600]
        if 'templateType' not in head:
            continue
        m = re.search(r'^\s*label:\s*(.*?)\s*$', head, re.M)
        label = m.group(1) if m else ''
        new_name = clean_name(f.name, args.site)
        new_label = clean_label(label)
        plan.append({'old_path': str(rel).replace(os.sep, '/'),
                     'new_path': str(rel.with_name(new_name)).replace(os.sep, '/'),
                     'old_label': label, 'new_label': new_label, 'flags': []})

    targets = {}
    for p in plan:
        targets.setdefault(p['new_path'], []).append(p['old_path'])
    labels = {}
    for p in plan:
        labels.setdefault(p['new_label'], []).append(p['old_path'])
    for p in plan:
        if p['new_path'] != p['old_path']:
            if len(targets[p['new_path']]) > 1:
                p['flags'].append('name collision: ' + ', '.join(targets[p['new_path']]))
            elif (tdir / p['new_path']).exists():
                p['flags'].append('target file already exists')
        if len(labels[p['new_label']]) > 1:
            p['flags'].append('duplicate label')
        if not p['new_label']:
            p['flags'].append('label empty after cleaning')

    changed = [p for p in plan if p['new_path'] != p['old_path'] or p['new_label'] != p['old_label']]
    print(f'{len(changed)} of {len(plan)} templates would change\n')
    for p in plan:
        mark = ' ' if p in changed else '='
        print(f'{mark} {p["old_path"]:45} -> {p["new_path"]}')
        print(f'  {"":45}    "{p["old_label"]}" -> "{p["new_label"]}"')
        for fl in p['flags']:
            print(f'  {"":45}    ! {fl}')
    Path(args.plan_dir).mkdir(parents=True, exist_ok=True)
    out_json = Path(args.plan_dir) / f'{root.name}-rename-plan.json'
    out_json.write_text(json.dumps(plan, indent=2), encoding='utf-8')
    print(f'\nPlan written to {out_json}')

    if not args.apply:
        print('Dry run only. Review flags with the user, then rerun with --apply.')
        return
    blocking = [p for p in changed
                if any(f.startswith(('name collision', 'target file', 'duplicate label', 'label empty'))
                       for f in p['flags'])]
    if blocking:
        print('\nNot applying: resolve collisions / duplicate or empty labels first '
              '(agree new names with the user and edit the labels by hand):')
        for p in blocking:
            print('  ' + p['old_path'])
        return
    for p in changed:
        src, dst = tdir / p['old_path'], tdir / p['new_path']
        raw = src.read_bytes().decode('utf-8')
        if p['new_label'] != p['old_label']:
            raw = re.sub(r'(^\s*label:\s*)' + re.escape(p['old_label']) + r'(\s*$)',
                         lambda m: m.group(1) + p['new_label'] + m.group(2), raw, count=1, flags=re.M)
        dst.write_bytes(raw.encode('utf-8'))
        if dst != src:
            src.unlink()
    renamed = {p['old_path']: p['new_path'] for p in changed if p['new_path'] != p['old_path']}
    for f in root.rglob('*.html'):
        raw = f.read_bytes().decode('utf-8', 'replace')
        new = raw
        for old, newp in renamed.items():
            new = new.replace('/' + old, '/' + newp).replace("'" + old, "'" + newp).replace('"' + old, '"' + newp)
        if new != raw:
            f.write_bytes(new.encode('utf-8'))
            print(f'updated references in {f}')
    print(f'\nApplied {len(changed)} change(s).')


if __name__ == '__main__':
    main()
