#!/usr/bin/env python3
"""
Check that every path referenced from a HubSpot theme actually resolves.

  python check_references.py --theme hubspot/qoria-theme-uk --site uk
  python check_references.py --theme hubspot/q-theme            # parent theme

Looks at HubL in .html files (module/extends/include/global_partial/
include_dnd_partial/get_asset_url/require_css/require_js paths and template
screenshotPath annotations) and asset paths in module meta.json files.

Each reference is reported as one of:
  ok                - found in this theme
  ok-parent         - not in the child, but found at the same theme-relative path in the
                      parent theme, which HubSpot falls back to for child themes
  escapes-theme     - a relative path that climbs above the theme root (usually a
                      leftover "../" from when templates sat one folder deeper);
                      a likely fix is suggested when one exists
  missing           - cannot be found anywhere
  other-site        - resolves, but points at another site's code (e.g. a -nz module
                      used in the UK theme) - may be intentional, confirm with the user
Absolute paths (/q-theme/..., /qoria-theme-xx/...) are resolved against the folder
that contains the themes (the repo's hubspot/ folder). @hubspot/... is skipped.
Only "missing", "escapes-theme" and "other-site" are printed unless --all is given.
A "missing" parent reference that still exists in an old drifted theme usually means
that file hasn't been reconciled into q-theme yet (pass --old-themes to see this).
"""
import argparse, json, os, re
from pathlib import Path

SITE_CODES = ['uk', 'au', 'nz', 'us', 'es', 'eu', 'corp', 'spain', 'anz']
SITE_WORDS = {'smoothwall': 'uk', 'linewize-au': 'au', 'linewize-nz': 'nz', 'linewize-us': 'us',
              'qoria-es': 'es', 'qoria-eu': 'eu'}

PATTERNS = [
    # path="..." / path='...' inside any HubL tag (module, dnd_module, partials, etc.)
    re.compile(r'''\bpath\s*=\s*["']([^"'{}]+)["']'''),
    re.compile(r'''{%-?\s*(?:extends|include|import|from)\s+["']([^"'{}]+)["']'''),
    re.compile(r'''get_asset_url\(\s*["']([^"'{}]+)["']'''),
    re.compile(r'''require_(?:css|js)\(\s*["']([^"'{}]+\.(?:css|js))["']'''),
    re.compile(r'''^\s*screenshotPath:\s*(\S+)''', re.M),
]


def candidates(target):
    """A module referenced without .module, or a file referenced exactly."""
    yield target
    if not target.suffix:
        yield target.with_name(target.name + '.module')


def exists(p):
    return any(c.exists() for c in candidates(p))


def other_site(ref, site):
    if not site:
        return None
    low = ref.lower()
    for word, code in SITE_WORDS.items():
        if word in low and code != site:
            return code
    # A site code only counts as a whole path segment (/nz/), a leading prefix (nz-foo)
    # or a trailing suffix (foo-nz, foo-nz.module). A code in the middle of a name
    # (contact-us-pullout) is an ordinary word, not a site marker.
    for seg in low.split('/'):
        stem = seg.split('.')[0]
        for code in SITE_CODES:
            if code == site:
                continue
            if stem == code or stem.startswith(code + '-') or stem.endswith('-' + code):
                return code
    return None


def resolve(ref, src_file, theme_root, themes_root, parent_root):
    if ref.startswith('@hubspot/') or ref.startswith('http') or ref.startswith('//'):
        return 'skip', None
    if ref.startswith('/'):
        tgt = themes_root / ref.lstrip('/')
        return ('ok' if exists(tgt) else 'missing'), None
    tgt = Path(os.path.normpath(src_file.parent / ref))
    try:
        rel = tgt.relative_to(theme_root)
    except ValueError:
        # climbed out of the theme: try fewer leading ../ to suggest a fix
        n_up = ref.split('/').count('..')
        tail = '/'.join(p for p in ref.split('/') if p not in ('..', '.'))
        for k in range(n_up - 1, -1, -1):
            trial = '/'.join(['..'] * k + [tail]) if k else './' + tail
            t = Path(os.path.normpath(src_file.parent / trial))
            try:
                r2 = t.relative_to(theme_root)
            except ValueError:
                continue
            if exists(t) or (parent_root and exists(parent_root / r2)):
                return 'escapes-theme', trial
        return 'escapes-theme', None
    if exists(tgt):
        return 'ok', None
    if parent_root and exists(parent_root / rel):
        return 'ok-parent', None
    return 'missing', None


def child_match(ref, theme_root):
    """For a missing absolute ref, find a same-named module/file in this theme
    (e.g. a module moved from the parent into the child but the path not updated)."""
    name = ref.rstrip('/').split('/')[-1]
    names = {name, name + '.module'}
    for p in theme_root.rglob('*'):
        if p.name in names:
            return '/' + theme_root.name + '/' + str(p.relative_to(theme_root)).replace(os.sep, '/').removesuffix('.module')
    return None


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--theme', required=True, help='Theme folder, e.g. hubspot/qoria-theme-uk')
    ap.add_argument('--site', help='Site code of this child theme (uk, au, nz, us, es, eu, corp)')
    ap.add_argument('--all', action='store_true', help='Also print ok references')
    ap.add_argument('--old-themes', default=None,
                    help='Folder of old drifted themes (e.g. src/old_themes). For missing /q-theme/... '
                         'references, reports which old themes still contain the file, so you can '
                         'tell "not migrated yet" apart from "genuinely gone".')
    args = ap.parse_args()

    theme_root = Path(args.theme).resolve()
    themes_root = theme_root.parent
    parent_root = None
    tj = theme_root / 'theme.json'
    if tj.exists():
        try:
            ext = json.loads(tj.read_text(encoding='utf-8-sig')).get('extends')
            if ext:
                parent_root = themes_root / ext.strip('/').split('/')[-1]
        except ValueError:
            pass

    rows = []
    for f in sorted(theme_root.rglob('*')):
        if not f.is_file():
            continue
        refs = []
        if f.suffix == '.html':
            text = f.read_text(encoding='utf-8', errors='replace')
            for pat in PATTERNS:
                for m in pat.finditer(text):
                    line = text.count('\n', 0, m.start()) + 1
                    refs.append((m.group(1).strip(), line))
        elif f.name == 'meta.json':
            try:
                meta = json.loads(f.read_text(encoding='utf-8-sig'))
            except ValueError:
                continue
            for key in ('js_assets', 'css_assets', 'other_assets'):
                for a in meta.get(key) or []:
                    if isinstance(a, dict) and a.get('path'):
                        refs.append((a['path'], 0))
            if meta.get('icon'):
                refs.append((meta['icon'], 0))
        for ref, line in refs:
            status, fix = resolve(ref, f, theme_root, themes_root, parent_root)
            if status == 'skip':
                continue
            os_flag = other_site(ref, args.site)
            if os_flag and status in ('ok', 'ok-parent'):
                status = 'other-site'
            rows.append((status, f.relative_to(theme_root), line, ref, fix, os_flag))

    order = {'missing': 0, 'escapes-theme': 1, 'other-site': 2, 'ok-parent': 3, 'ok': 4}
    rows.sort(key=lambda r: (order[r[0]], str(r[1]), r[2]))
    counts = {}
    for r in rows:
        counts[r[0]] = counts.get(r[0], 0) + 1
    print(f'Theme: {theme_root.name}' + (f'  (extends {parent_root.name})' if parent_root else ''))
    print('Counts: ' + ', '.join(f'{k}={counts.get(k, 0)}' for k in order))
    for status, file, line, ref, fix, os_flag in rows:
        if status in ('ok', 'ok-parent') and not args.all:
            continue
        loc = f'{file}:{line}' if line else str(file)
        extra = ''
        if fix:
            extra = f'   -> likely fix: {fix}'
        elif status == 'missing' and ref.startswith('/') and child_match(ref, theme_root):
            extra = f'   -> exists in this theme: {child_match(ref, theme_root)}'
        elif status == 'missing' and args.old_themes and ref.startswith('/'):
            rest = ref.lstrip('/').split('/', 1)[-1]
            found = [d.name for d in sorted(Path(args.old_themes).iterdir())
                     if d.is_dir() and exists(d / rest)]
            extra = ('   (still in old: ' + ', '.join(found) + ')') if found else '   (not in any old theme)'
        elif status == 'other-site':
            extra = f'   ({os_flag})'
        if os_flag and status == 'missing':
            extra += f'   (also points at another site: {os_flag})'
        print(f'  [{status}] {loc}  {ref}{extra}')


if __name__ == '__main__':
    main()
