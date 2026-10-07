#!/usr/bin/env python3
"""
Compare two HubSpot theme folders (or sub-folders) by CONTENT, not just by name.

Typical uses:
  # Shared code: old drifted portal theme vs the parent theme
  python compare_themes.py --old src/old_themes/q-theme-uk --new hubspot/q-theme \
      --also-new hubspot/qoria-theme-uk \
      --exclude "templates/smoothwall" --exclude "modules/region-specific" ... \
      --out reports/uk-vs-parent

  # Site code: one site's old folder vs its child theme
  python compare_themes.py --old src/old_themes/q-theme-uk/templates/smoothwall \
      --new hubspot/qoria-theme-uk/templates --strip-prefix uk- --out reports/uk-templates

What it does
  * Groups files into "units": a whole *.module folder counts as one unit,
    any other file is its own unit.
  * Normalises line endings before comparing (the parent theme uses CRLF and the
    old portal exports use LF, so without this every file looks different).
  * Classifies each unit: identical | line-endings-only | whitespace-only |
    different | only-in-old | only-in-new.
  * For units only in OLD, looks for a unit with the same name elsewhere in NEW
    or in any --also-new folder (e.g. moved into a child theme) and compares
    against that instead, marking it "moved+<status>".
  * Writes report.md (human summary with the diffs embedded, up to
    --embed-max-lines changed lines per file), report.json (machine-readable) and a
    unified diff per differing file under diffs/.
  * Flags long numeric ids in changed lines (menu/form/HubDB/CTA ids are
    portal-specific) and marks only-in-old units named copy/archive/temp/sandbox/
    backup/old as "likely leftover" so they can be triaged together.

It never edits any theme files.
"""
import argparse, difflib, fnmatch, json, os, re
from pathlib import Path

TEXT_EXT = {'.html', '.htm', '.css', '.js', '.json', '.md', '.txt', '.svg', '.xml',
            '.hubl', '.yml', '.yaml', '.rb', '.scss', '.map'}
ORDER = ['different', 'json-export-noise', 'whitespace-only', 'line-endings-only', 'identical']

# Keys HubSpot adds, removes, reorders or regenerates per portal when a theme is
# fetched/exported. Differences limited to these are reported as
# "json-export-noise" (diff still saved) rather than "different".
#   module_id               - assigned per portal, always differs
#   id                      - field ids regenerated on export
#   content_types           - legacy key some exports include, others don't
#   display_width / show_emoji_picker / expanded / tab / locked / required
#                           - editor defaults HubSpot writes out inconsistently
NOISE_KEYS = {'module_id', 'id', 'content_types', 'display_width', 'show_emoji_picker',
              'expanded', 'tab', 'locked', 'required'}


LEFTOVER_RE = re.compile(r'(\bcopy\b|archive|\btemp\b|-temp|sandbox|backup|\.bak$|\bold\b|-old\b)', re.I)
# Long numbers in changed lines are usually portal-specific object ids (menus, forms,
# HubDB tables, CTAs, blogs). These only exist on the portal they came from.
PORTAL_ID_RE = re.compile(r'(?<![\w.#-])\d{9,}(?![\w.-])')


def portal_ids(diff_text):
    ids = set()
    for line in diff_text.splitlines():
        if line[:1] in '+-' and not line.startswith(('+++', '---')):
            ids.update(PORTAL_ID_RE.findall(line))
    return sorted(ids)


def canonical_json(text, drop_noise, pretty=False):
    import json as _j
    def clean(o):
        if isinstance(o, dict):
            return {k: clean(v) for k, v in sorted(o.items())
                    if not (drop_noise and (k in NOISE_KEYS or v in (None, '', [], {})))}
        if isinstance(o, list):
            return [clean(v) for v in o]
        return o
    return _j.dumps(clean(_j.loads(text)), sort_keys=True, indent=2 if pretty else None)


def semantic_json_diff(ta, tb, a, b):
    """Diff of the JSON *data* with keys sorted and HubSpot noise keys removed, so
    real changes (new fields, changed defaults, removed options) aren't buried under
    key reordering. Returns (diff_text, added, removed) or None if not parseable."""
    try:
        ca = canonical_json(ta, True, pretty=True).splitlines()
        cb = canonical_json(tb, True, pretty=True).splitlines()
    except ValueError:
        return None
    d = list(difflib.unified_diff(ca, cb, fromfile=f'OLD {a} (data, noise removed)',
                                  tofile=f'NEW {b} (data, noise removed)', lineterm='', n=4))
    add = sum(1 for l in d if l.startswith('+') and not l.startswith('+++'))
    rem = sum(1 for l in d if l.startswith('-') and not l.startswith('---'))
    return '\n'.join(d) + '\n', add, rem


def is_excluded(rel, patterns):
    rel = rel.replace(os.sep, '/')
    for p in patterns:
        p = p.rstrip('/')
        if fnmatch.fnmatch(rel, p) or fnmatch.fnmatch(rel, p + '/*') or rel.startswith(p + '/'):
            return True
    return False


def collect_units(root, excludes):
    """Return {unit_rel_path: [file_rel_paths]} for one side."""
    root = Path(root)
    units = {}
    for dirpath, dirnames, filenames in os.walk(root):
        rel_dir = os.path.relpath(dirpath, root).replace(os.sep, '/')
        rel_dir = '' if rel_dir == '.' else rel_dir
        dirnames[:] = [d for d in dirnames
                       if not is_excluded(f'{rel_dir}/{d}'.lstrip('/'), excludes)
                       and d != 'node_modules' and not d.startswith('.')]
        for f in filenames:
            rel = f'{rel_dir}/{f}'.lstrip('/')
            if is_excluded(rel, excludes) or f.startswith('.'):
                continue
            m = re.match(r'(.*?[^/]+\.module)/(.*)', rel)
            unit = m.group(1) if m else rel
            units.setdefault(unit, []).append(rel)
    return units


def compare_file(a, b):
    """Return (status, diff_text or None, added, removed)."""
    ba, bb = Path(a).read_bytes(), Path(b).read_bytes()
    if ba == bb:
        return 'identical', None, 0, 0
    if Path(a).suffix.lower() not in TEXT_EXT:
        return 'different', f'Binary files differ ({len(ba)} vs {len(bb)} bytes)\n', 0, 0
    ta = ba.decode('utf-8', 'replace').replace('\r\n', '\n').replace('\r', '\n')
    tb = bb.decode('utf-8', 'replace').replace('\r\n', '\n').replace('\r', '\n')
    if ta == tb:
        return 'line-endings-only', None, 0, 0
    if re.sub(r'\s+', '', ta) == re.sub(r'\s+', '', tb):
        return 'whitespace-only', None, 0, 0
    json_noise = False
    if Path(a).suffix.lower() == '.json':
        try:
            if canonical_json(ta, False) == canonical_json(tb, False):
                return 'whitespace-only', None, 0, 0   # same data, different key order/formatting
            json_noise = canonical_json(ta, True) == canonical_json(tb, True)
        except ValueError:
            pass
    diff = list(difflib.unified_diff(ta.splitlines(), tb.splitlines(),
                                     fromfile=f'OLD {a}', tofile=f'NEW {b}', lineterm='', n=3))
    added = sum(1 for l in diff if l.startswith('+') and not l.startswith('+++'))
    removed = sum(1 for l in diff if l.startswith('-') and not l.startswith('---'))
    return ('json-export-noise' if json_noise else 'different'), '\n'.join(diff) + '\n', added, removed


def unit_name(unit, strip_prefixes):
    """Name used for moved/renamed matching, with site prefixes/suffixes removed."""
    name = unit.split('/')[-1]
    for p in strip_prefixes:
        if name.startswith(p):
            name = name[len(p):]
        suf = '-' + p.strip('-')
        stem, dot, ext = name.partition('.')
        if stem.endswith(suf):
            name = stem[: -len(suf)] + dot + ext
    return name


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--old', required=True, help='Old / drifted folder')
    ap.add_argument('--new', required=True, help='Parent or child theme folder to compare against')
    ap.add_argument('--also-new', action='append', default=[],
                    help='Extra folders to search for moved units (e.g. child themes); repeatable')
    ap.add_argument('--exclude', action='append', default=[], help='Glob relative to each root; repeatable')
    ap.add_argument('--strip-prefix', action='append', default=[],
                    help='Site prefix to ignore when matching names, e.g. uk- ; repeatable')
    ap.add_argument('--out', required=True, help='Output folder for report + diffs')
    ap.add_argument('--embed-max-lines', type=int, default=400,
                    help='Embed each file diff in report.md when it has at most this many changed '
                         'lines (default 400; 0 = never embed). Larger diffs are linked only.')
    args = ap.parse_args()

    old_units = collect_units(args.old, args.exclude)
    sides = {args.new: collect_units(args.new, args.exclude)}
    for f in args.also_new:
        sides[f] = collect_units(f, [])
    new_units = sides[args.new]

    name_idx = {}
    for root, units in sides.items():
        for u in units:
            name_idx.setdefault(unit_name(u, args.strip_prefix), []).append((root, u))

    out = Path(args.out)
    (out / 'diffs').mkdir(parents=True, exist_ok=True)
    results, matched_new = [], set()

    for u in sorted(old_units):
        rec = {'unit': u, 'status': None, 'match': None, 'files': []}
        if u in new_units:
            root, tu = args.new, u
        else:
            cands = name_idx.get(unit_name(u, args.strip_prefix), [])
            if not cands:
                rec['status'] = 'only-in-old (likely leftover)' if LEFTOVER_RE.search(u) else 'only-in-old'
                results.append(rec)
                continue
            root, tu = cands[0]
            rec['match'] = os.path.join(root, tu)
            if len(cands) > 1:
                rec['other_candidates'] = [os.path.join(r, x) for r, x in cands[1:]]
        if root == args.new:
            matched_new.add(tu)
        tunits = sides[root]
        if u.endswith('.module'):
            of = {f[len(u) + 1:]: f for f in old_units[u]}
            nf = {f[len(tu) + 1:]: f for f in tunits[tu]}
        else:
            of, nf = {'': old_units[u][0]}, {'': tunits[tu][0]}
        statuses = []
        for key in sorted(set(of) | set(nf)):
            if key not in nf:
                rec['files'].append({'file': key, 'status': 'only-in-old'}); statuses.append('different'); continue
            if key not in of:
                rec['files'].append({'file': key, 'status': 'only-in-new'}); statuses.append('different'); continue
            st, diff, add, rem = compare_file(os.path.join(args.old, of[key]), os.path.join(root, nf[key]))
            entry = {'file': key or Path(u).name, 'status': st}
            if diff:
                dname = (u + ('/' + key if key else '')).replace('/', '__') + '.diff'
                (out / 'diffs' / dname).write_text(diff, encoding='utf-8')
                entry.update({'diff': f'diffs/{dname}', 'lines_added': add, 'lines_removed': rem})
                if st == 'different' and (key or u).endswith('.json'):
                    ta = Path(os.path.join(args.old, of[key])).read_text(encoding='utf-8', errors='replace')
                    tb = Path(os.path.join(root, nf[key])).read_text(encoding='utf-8', errors='replace')
                    sem = semantic_json_diff(ta, tb, os.path.join(args.old, of[key]), os.path.join(root, nf[key]))
                    if sem:
                        sname = dname[:-5] + '.data.diff'
                        (out / 'diffs' / sname).write_text(sem[0], encoding='utf-8')
                        entry.update({'data_diff': f'diffs/{sname}', 'data_added': sem[1], 'data_removed': sem[2]})
                if st == 'different' and not key.endswith('meta.json'):
                    ids = portal_ids(diff)
                    if ids:
                        entry['portal_ids'] = ids
            rec['files'].append(entry)
            statuses.append(st)
        rec['status'] = min(statuses, key=ORDER.index) if statuses else 'identical'
        if rec['match']:
            rec['status'] = 'moved+' + rec['status']
        results.append(rec)

    for u in sorted(set(new_units) - set(old_units) - matched_new):
        results.append({'unit': u, 'status': 'only-in-new', 'match': None, 'files': []})

    (out / 'report.json').write_text(json.dumps(results, indent=2), encoding='utf-8')

    groups = {}
    for r in results:
        groups.setdefault(r['status'], []).append(r)
    same = lambda s: s.split('+')[-1] in ('identical', 'line-endings-only')
    lines = ['# Content comparison', '', f'- OLD: `{args.old}`', f'- NEW: `{args.new}`']
    if args.also_new:
        lines.append('- Also searched for moved units: ' + ', '.join(f'`{x}`' for x in args.also_new))
    if args.exclude:
        lines.append('- Excluded: ' + ', '.join(f'`{x}`' for x in args.exclude))
    lines += ['', '## Summary', '', '| Status | Units |', '|---|---|']
    for st in sorted(groups):
        lines.append(f'| {st} | {len(groups[st])} |')
    lines += ['', '"line-endings-only" and "whitespace-only" mean the code is effectively the same. '
              '"json-export-noise" means the only JSON differences are keys HubSpot rewrites per portal '
              '(module_id, field ids, editor defaults); skim these, but they rarely need a decision.', '']
    for st in sorted(groups):
        if same(st):
            continue
        lines += [f'## {st} ({len(groups[st])})', '']
        for r in groups[st]:
            head = f'- `{r["unit"]}`' + (f' → `{r["match"]}`' if r.get('match') else '')
            if r.get('other_candidates'):
                head += ' (also matches: ' + ', '.join(f'`{c}`' for c in r['other_candidates']) + ')'
            lines.append(head)
            for f in r['files']:
                if same(f['status']):
                    continue
                d = f' (+{f["lines_added"]}/-{f["lines_removed"]}, `{f["diff"]}`)' if f.get('diff') else ''
                lines.append(f'    - {f["file"]}: {f["status"]}{d}')
                if f.get('portal_ids'):
                    lines.append(f'      - **portal-specific ids in changed lines:** {", ".join(f["portal_ids"])}')
                show, n = f.get('diff'), f.get('lines_added', 0) + f.get('lines_removed', 0)
                if f.get('data_diff'):   # JSON: show the data-level diff, not the reordered text
                    show, n = f['data_diff'], f['data_added'] + f['data_removed']
                    lines.append(f'      - data-level diff (keys sorted, HubSpot noise removed): '
                                 f'+{f["data_added"]}/-{f["data_removed"]}, `{f["data_diff"]}`')
                if (show and f['status'] == 'different' and args.embed_max_lines
                        and n <= args.embed_max_lines):
                    body = (out / show).read_text(encoding='utf-8').rstrip('\n')
                    lines += ['', '      ```diff'] + ['      ' + l for l in body.splitlines()] + ['      ```', '']
        lines.append('')
    (out / 'report.md').write_text('\n'.join(lines), encoding='utf-8')
    summary_end = lines.index('## Summary') + 4 + len(groups)
    print('\n'.join(lines[:summary_end]))
    print(f'\nFull report: {out / "report.md"}')


if __name__ == '__main__':
    main()
