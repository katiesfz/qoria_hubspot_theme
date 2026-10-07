#!/usr/bin/env python3
"""
Build the template mapping file that scripts/repoint-templates.js expects, from real data.

Step 1 - capture what's in use on ONE portal (the token decides which portal):
  HUBSPOT_TOKEN=xxx node scripts/repoint-templates.js --list > migration/uk-portal-templates.txt

Step 2 - build a mapping for ONE site on that portal:
  python build_mapping.py --site uk --child hubspot/qoria-theme-uk --old-folder smoothwall \
      --list migration/uk-portal-templates.txt --out migration/template-mapping-uk.json

Matching rules for each templatePath in the --list output:
  * .../templates/<old-folder>/[sub/]<name>.html  (page still on the old shared theme)
        -> <child>/templates/[sub/]<renamed name>.html
  * <child>/templates/<site>-<name>.html    (page already on the child, pre-rename name)
        -> <child>/templates/<renamed name>.html
  The renamed name comes from migration/<child>-rename-plan.json if present, otherwise the
  site prefix/suffix is stripped. A mapping is only written when the target file exists
  locally in the child theme.

Prints three lists: mapped, in-use paths for this site with NO local target (need a decision),
and in-use paths that already point at the final child template (nothing to do).
Never calls HubSpot itself.
"""
import argparse, json, os, re
from pathlib import Path


def parse_list(path):
    rows, section = [], None
    for line in Path(path).read_text(encoding='utf-8').splitlines():
        m = re.match(r'^(site-pages|landing-pages) \((\d+) total\):', line.strip())
        if m:
            section = m.group(1)
            continue
        m = re.match(r'^\s*(\d+)\s+(\S.*)$', line)
        if m and section:
            rows.append((section, int(m.group(1)), m.group(2).strip()))
    return rows


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--site', required=True)
    ap.add_argument('--child', required=True, help='e.g. hubspot/qoria-theme-uk')
    ap.add_argument('--old-folder', required=True, help="The site's folder in the old shared theme, e.g. smoothwall")
    ap.add_argument('--list', required=True, help='Saved output of repoint-templates.js --list')
    ap.add_argument('--plan-dir', default='migration')
    ap.add_argument('--out', required=True)
    args = ap.parse_args()

    child = Path(args.child)
    cname = child.name
    renames = {}
    plan_file = Path(args.plan_dir) / f'{cname}-rename-plan.json'
    if plan_file.exists():
        for p in json.loads(plan_file.read_text(encoding='utf-8')):
            renames[Path(p['old_path']).name] = p['new_path']

    def renamed(name):
        if name in renames:
            return renames[name]
        stem, ext = os.path.splitext(name)
        stem = re.sub(rf'^{args.site}-', '', stem)
        stem = re.sub(rf'-{args.site}$', '', stem)
        return stem + ext

    mapping, no_target, done = {}, [], []
    for section, count, tp in parse_list(args.list):
        parts = tp.split('/')
        target = None
        if f'/templates/{args.old_folder}/' in '/' + tp:
            after = tp.split(f'templates/{args.old_folder}/', 1)[1]
            sub = str(Path(after).with_name(renamed(Path(after).name))).replace(os.sep, '/')
            target = f'{cname}/templates/{sub}'   # sub-folders such as initial-upload/ are kept
        elif parts[0] == cname:
            rel = tp.split('/templates/', 1)[1] if '/templates/' in tp else None
            if rel is None:
                continue
            new_rel = str(Path(rel).with_name(renamed(Path(rel).name))).replace(os.sep, '/')
            if new_rel == rel:
                done.append((section, count, tp))
                continue
            target = f'{cname}/templates/{new_rel}'
        else:
            continue
        local = child / target.split('/', 1)[1]
        if local.exists():
            mapping[tp] = target
            print(f'  map  {count:4}  {section:13} {tp}\n                          -> {target}')
        else:
            no_target.append((section, count, tp, f'expected {target}, not found locally'))

    if no_target:
        print('\nIn use for this site but NO local target (ask the user - new template needed, or map elsewhere?):')
        for section, count, tp, why in no_target:
            print(f'  {count:4}  {section:13} {tp}   ({why})')
    if done:
        print('\nAlready on final child templates (nothing to do):')
        for section, count, tp in done:
            print(f'  {count:4}  {section:13} {tp}')
    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    Path(args.out).write_text(json.dumps(mapping, indent=2), encoding='utf-8')
    print(f'\n{len(mapping)} mapping entr{"y" if len(mapping) == 1 else "ies"} written to {args.out}')
    print('Next: dry run with  HUBSPOT_TOKEN=xxx node scripts/repoint-templates.js --mapping ' + args.out)


if __name__ == '__main__':
    main()
