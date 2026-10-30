#!/usr/bin/env python3
"""Verificare automată a unui deck animat (fără model).

Utilizare:
  python3 tools/check_deck.py lp/<id> [--src sursa.json|.txt] [--sheet out.png] [--only 3,5,7] [--frames 4:1,4:3] [--fast]

Ce face: pornește deck-ul într-un Chromium headless (server local), trece prin toate slide-urile și toate punctele,
și raportează: erori în consolă, text tăiat (overflow) în coloana stângă, marcaje vizibile (!! ** undefined),
roșu 1–4 pe slide și doar în stânga, ş/ţ cu sedilă, abrevieri lipsă din GLOS, anim/spec lipsă, badge-uri suprapuse,
cifrele din sursă care lipsesc din deck. Scrie lp/<id>/data.json (texts + outline) pentru site și calendar.
--sheet: foi de contact (un cadru/slide la ultimul punct, 9 pe foaie) → out_1.png, out_2.png…
--frames s:k,…: randează cadrele cerute (slide s, punctul k, numerotare de la 1) → <deck>/_frames/
"""
import argparse, json, os, re, sys, threading, functools, http.server, socketserver, time
from pathlib import Path

ap = argparse.ArgumentParser()
ap.add_argument('deck'); ap.add_argument('--src'); ap.add_argument('--sheet'); ap.add_argument('--only')
ap.add_argument('--frames'); ap.add_argument('--fast', action='store_true'); ap.add_argument('--engine')
a = ap.parse_args()
deck = Path(a.deck).resolve()
root = deck.parent.parent  # repo
rel = deck.relative_to(root).as_posix()

# ---------- verificări statice pe sursă ----------
issues = []
src_js = ''.join(p.read_text(encoding='utf-8') for p in deck.glob('*.js'))
if re.search('[şţŞŢ]', src_js): issues.append('STATIC: ş/ţ cu sedilă în fișierele .js (folosește ș/ț)')
slides_js = (deck / 'slides.js').read_text(encoding='utf-8')
if slides_js.count('!!') % 2: issues.append('STATIC: număr impar de „!!” în slides.js (marcaj neînchis)')

class Q(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True
class _H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *x): pass
H = functools.partial(_H, directory=str(root))
srv = Q(('127.0.0.1', 0), H); port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()

from playwright.sync_api import sync_playwright
only = set(int(x) for x in a.only.split(',')) if a.only else None
JS_INFO = r"""() => {
  const D = window.__deck; const c = D.cur; const S = D.SLIDES;
  const txt = document.getElementById('txt'), body = document.getElementById('body');
  const over = [];
  // overflow: corpul și orice element cu scroll ascuns
  if (body.scrollHeight > body.clientHeight + 2) over.push('body +' + (body.scrollHeight - body.clientHeight) + 'px');
  txt.querySelectorAll('h3,p,.box,td,th,#title').forEach(e => { if (e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflow !== 'visible') over.push('lat:' + e.textContent.slice(0, 30)); });
  const vis = txt.innerText;
  const tw = document.createTreeWalker(txt, NodeFilter.SHOW_TEXT); const parts = []; let nd;
  while ((nd = tw.nextNode())) { const pe = nd.parentElement; if (pe.closest('.h,th,#kick,#foot,#pg,.tm')) continue; parts.push(nd.nodeValue); }
  const raw = parts.join(' ');
  const keysLeft = txt.querySelectorAll('b.key').length;
  const keysWell = document.getElementById('well').querySelectorAll('b.key, .key').length;
  const kickTitleKey = document.querySelectorAll('#kick b.key, #title b.key').length;
  // badge-uri suprapuse
  const bs = [...document.querySelectorAll('#ov .badge')].filter(b => getComputedStyle(b).opacity > 0.5).map(b => b.getBoundingClientRect());
  let ovl = 0; for (let i = 0; i < bs.length; i++) for (let j = i + 1; j < bs.length; j++) { const A = bs[i], B = bs[j]; if (Math.abs(A.x - B.x) < 18 && Math.abs(A.y - B.y) < 18) ovl++; }
  const ls = [...document.querySelectorAll('#ov .lbl:not(.dim)')].map(l => l.getBoundingClientRect());
  let lov = 0; for (let i = 0; i < ls.length; i++) for (let j = i + 1; j < ls.length; j++) { const A = ls[i], B = ls[j]; if (A.x < B.x + B.width - 4 && B.x < A.x + A.width - 4 && A.y < B.y + B.height - 4 && B.y < A.y + A.height - 4) lov++; }
  const small = [...txt.querySelectorAll('p,td,.box')].filter(e => parseFloat(getComputedStyle(e).fontSize) < 10.5).length;
  // litere grecești mici într-un element cu text-transform: uppercase → α devine „A”, β devine „B” (greșeală găsită la Farma LP 3)
  const greekUp = [...document.querySelectorAll('body *')].filter(e => getComputedStyle(e).textTransform === 'uppercase' && [...e.childNodes].some(n => n.nodeType === 3 && /[α-ω]/.test(n.nodeValue))).map(e => e.textContent.slice(0, 30));
  return { raw, greekUp, i: c.i, n: S.length, beats: c.beats.length, over, vis, keysLeft, keysWell, kickTitleKey, ovl, lov, small,
           kick: document.getElementById('kick').innerText, title: document.getElementById('title').innerText,
           anim: S[c.i].anim, spec: S[c.i].spec, foot: document.getElementById('foot') ? document.getElementById('foot').innerText : '' };
}"""

texts, outline, errs = [], [], []
with sync_playwright() as p:
    br = p.chromium.launch()
    pg = br.new_page(viewport={'width': 1280, 'height': 720}, device_scale_factor=1)
    pg.on('console', lambda m: m.type == 'error' and errs.append(m.text))
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(f'http://127.0.0.1:{port}/{rel}/index.html#s1')
    pg.wait_for_function('window.__deck && window.__deck.cur', timeout=20000)
    pg.wait_for_timeout(800)
    n = pg.evaluate('window.__deck.SLIDES.length')
    shots = []
    for s in range(n):
        pg.evaluate(f'window.__deck.show({s})'); pg.wait_for_timeout(120 if a.fast else 250)
        nb = pg.evaluate('window.__deck.cur.beats.length')
        info = None
        for k in range(nb):
            if k: pg.evaluate('window.__deck.step(1)'); pg.wait_for_timeout(60 if a.fast else 140)
            if k == nb - 1 or not a.fast:
                info = pg.evaluate(JS_INFO)
                if info['over'] and (only is None or s + 1 in only): issues.append(f"S{s+1} pct {k}: text tăiat {info['over'][:3]}")
        if info is None: info = pg.evaluate(JS_INFO)
        sn = s + 1
        if only is None or sn in only:
            v = info['vis']
            for bad in ['!!', '**', 'undefined', 'NaN', '[object']:
                if bad in v: issues.append(f'S{sn}: „{bad}” vizibil pe ecran')
            if info['keysWell']: issues.append(f'S{sn}: roșu în scenă (dreapta) ×{info["keysWell"]}')
            if info['kickTitleKey']: issues.append(f'S{sn}: roșu în kicker/titlu')
            if s > 0 and not (1 <= info['keysLeft'] <= 4): issues.append(f'S{sn}: roșu = {info["keysLeft"]} (trebuie 1–4)')
            if info['anim'] is None: issues.append(f'S{sn}: lipsește câmpul anim')
            if info['anim'] is True and not info['spec']: issues.append(f'S{sn}: anim:true fără spec')
            if info['ovl']: issues.append(f'S{sn}: {info["ovl"]} perechi de badge-uri suprapuse')
            if info['lov']: issues.append(f'S{sn}: {info["lov"]} etichete suprapuse')
            if info.get('greekUp'): issues.append(f'S{sn}: literă grecească în text cu majuscule (α→A, β→B): {info["greekUp"][:3]}')
            if info['small']: issues.append(f'S{sn}: {info["small"]} elemente cu font < 10,5 px')
            # abrevieri: tokenuri MAJUSCULE din textul stâng care nu apar în subsol
            body_txt = info['raw']
            foot = info['foot']
            for t in sorted(set(re.findall(r'\b[A-ZĂÂÎȘȚ][A-ZĂÂÎȘȚ0-9]{1,6}\b', body_txt))):
                if t in ('LP', 'DA', 'NU', 'OSPE') and t in foot: continue
                if re.fullmatch(r'[IVX]+', t): continue
                if re.fullmatch(r'[SZ]\d+', t) and re.search(r'\b[SZ]\d', foot): continue
                if t not in foot: issues.append(f'S{sn}: abrevierea „{t}” nu e explicată jos (GLOS)')
        texts.append(info['vis']); outline.append({'k': info['kick'], 't': info['title']})
        if a.sheet and (only is None or sn in only):
            shots.append(pg.screenshot())
    if a.frames:
        fd = deck / '_frames'; fd.mkdir(exist_ok=True)
        for fr in a.frames.split(','):
            s, k = (int(x) for x in fr.split(':'))
            pg.evaluate(f'window.__deck.show({s-1})'); pg.wait_for_timeout(300)
            for _ in range(k - 1): pg.evaluate('window.__deck.step(1)'); pg.wait_for_timeout(120)
            for t in (0.4, 2.2, 4.5):
                pg.wait_for_timeout(int(t * 1000) if t == 0.4 else 1900)
                pg.screenshot(path=str(fd / f's{s}_k{k}_{t}s.png'))
    br.close()

if a.sheet and shots:
    from PIL import Image
    import io
    for off in range(0, len(shots), 9):
        grp = shots[off:off + 9]
        W, Hh = 640, 360
        sheet = Image.new('RGB', (W * 3, Hh * ((len(grp) + 2) // 3)), 'white')
        for j, b in enumerate(grp):
            im = Image.open(io.BytesIO(b)).resize((W, Hh))
            sheet.paste(im, ((j % 3) * W, (j // 3) * Hh))
        out = a.sheet.replace('.png', f'_{off // 9 + 1}.png'); sheet.save(out); print('foaie:', out)

for e in sorted(set(errs)): issues.insert(0, 'CONSOLĂ: ' + e[:200])

# acoperirea sursei: cifre din sursă care lipsesc
if a.src:
    sp = Path(a.src); raw = sp.read_text(encoding='utf-8')
    try:
        j = json.loads(raw); raw = '\n'.join(j['texts']) if isinstance(j, dict) and 'texts' in j else raw
    except Exception: pass
    deck_txt = '\n'.join(texts)
    nums = set(re.findall(r'\b\d+(?:[.,]\d+)?\s?(?:%|mg|ml|mL|°C|min|h|ore|zile|săpt|S\d+)?', raw))
    miss = sorted(x for x in nums if len(x) >= 2 and x.strip() not in deck_txt)
    if miss: issues.append('ACOPERIRE: cifre din sursă absente din deck: ' + ', '.join(miss[:60]))

if not only:
    (deck / 'data.json').write_text(json.dumps({'texts': texts, 'outline': outline}, ensure_ascii=False), encoding='utf-8')
    print(f'data.json scris: {len(texts)} slide-uri, {sum(len(t.split()) for t in texts)} cuvinte')
print(f'{len(issues)} probleme')
for i in issues: print(' -', i)
srv.shutdown()
