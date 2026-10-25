#!/usr/bin/env python3
"""Sincronizează site-ul cu artifactul „Tutor AI animat”.

Folosire:
  python3 tools/sync_from_tutor.py <SRC> [--date YYYY-MM-DD]

<SRC> = folderul în care s-au descărcat din artifact `index.html` și tot `lp/<id>/`
(fără `lib.json`). Scriptul:
  - citește `DATA` din index.html-ul tutorului și ia toate itemii cu câmpul `anim`;
  - copiază fiecare `lp/<id>/` în site (înlocuiește complet folderul, fără lib.json);
  - șterge din site deck-urile care nu mai sunt în tutor;
  - rescrie `decks.json`: păstrează titlul/subtitlul/data deja existente pentru un id,
    iar pentru id-uri noi le generează (fără data din calendar și fără „· animat”);
  - refuză orice fișier care cheamă `window.claude` (site-ul e doar de vizualizare).
"""
import json, re, shutil, sys, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def clean_title(it):
    t = re.sub(r'^\d{1,2}\.\d{1,2}\s*·\s*', '', it.get('title', ''))
    t = t.replace(' · animat', '').strip()
    if it.get('subj') == 'histo' and it.get('n') and not t.startswith('LP '):
        t = f"LP {it['n']} · {t}"
    return t

def clean_sub(it):
    s = it.get('sub') or it.get('preps') or ''
    s = re.sub(r'\s*\([^)]*\)\.?$', '', s).rstrip('.')
    return s

def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1]).resolve()
    today = datetime.date.today().isoformat()
    if '--date' in sys.argv:
        today = sys.argv[sys.argv.index('--date') + 1]
    html = (src / 'index.html').read_text(encoding='utf-8')
    m = re.search(r'const DATA = (\{.*?\});\n', html, re.S)
    if not m:
        sys.exit('Nu găsesc DATA în index.html-ul tutorului.')
    D = json.loads(m.group(1))
    items = [it for it in D['items'] if it.get('anim')]

    old_path = ROOT / 'decks.json'
    old = json.loads(old_path.read_text(encoding='utf-8')) if old_path.exists() else {'decks': []}
    prev = {d['id']: d for d in old['decks']}

    keep = set()
    decks = []
    for it in items:
        rel = Path(it['anim']).parent           # lp/<id>
        s_dir, d_dir = src / rel, ROOT / rel
        if not (s_dir / 'index.html').exists():
            print(f'! lipsește {s_dir}/index.html — sar peste {it["id"]}')
            if it['id'] in prev and d_dir.exists():
                decks.append(prev[it['id']]); keep.add(rel.parts[1])
            continue
        for f in s_dir.rglob('*'):
            if f.is_file() and f.suffix in ('.js', '.html') and 'window.claude' in f.read_text(encoding='utf-8', errors='ignore'):
                sys.exit(f'STOP: {f} cheamă window.claude — site-ul trebuie să rămână doar de vizualizare.')
        if d_dir.exists():
            shutil.rmtree(d_dir)
        shutil.copytree(s_dir, d_dir, ignore=shutil.ignore_patterns('lib.json'))
        keep.add(rel.parts[1])
        p = prev.get(it['id'], {})
        changed = not p or p.get('slides') != it.get('slides')
        decks.append({
            'id': it['id'], 'subj': it['subj'], 'tip': p.get('tip') or ('curs' if it.get('kind') == 'curs' else 'lp'),
            'title': p.get('title') or clean_title(it),
            'sub': p.get('sub') or clean_sub(it),
            'slides': it.get('slides'),
            'path': it['anim'],
            'added': p.get('added') or today,
            'updated': today if changed else p.get('updated', p.get('added') or today),
        })
        print(('+ nou ' if not p else '~ actualizat ') + it['id'])

    for d in (ROOT / 'lp').iterdir() if (ROOT / 'lp').exists() else []:
        if d.is_dir() and d.name not in keep:
            shutil.rmtree(d); print('- șters', d.name)

    subjects = {k: {'name': v['name'], 'color': v['color']} for k, v in D['subj'].items()}
    old_path.write_text(json.dumps({'subjects': subjects, 'decks': decks}, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    print(f'{len(decks)} deck-uri în decks.json')

if __name__ == '__main__':
    main()
