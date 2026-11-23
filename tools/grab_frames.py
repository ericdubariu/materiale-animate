#!/usr/bin/env python3
"""Cadre din deck la un moment ales al punctului: grab.py <deck> s:k:f,...  (slide s, punctul k de la 1 sau 0 = intro, f = fracțiune din beat sau secunde dacă >1.5)
Scrie o foaie cu doar scena (godeul) → out png."""
import sys, pathlib, http.server, socketserver, threading, functools, io
from PIL import Image
deck = pathlib.Path(sys.argv[1]).resolve(); root = deck.parent.parent; out = sys.argv[3]
cols = int(sys.argv[4]) if len(sys.argv) > 4 else 3
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True
class _H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *x): pass
srv = Q(('127.0.0.1', 0), functools.partial(_H, directory=str(root))); port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
from playwright.sync_api import sync_playwright
shots = []
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1280, 'height': 720})
    errs = []; pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None); pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(f'http://127.0.0.1:{port}/lp/{deck.name}/index.html#s1'); pg.wait_for_timeout(700)
    for fr in sys.argv[2].split(','):
        s, k, f = fr.split(':'); s = int(s); k = int(k); f = float(f)
        pg.evaluate(f'window.__deck.show({s-1})'); pg.wait_for_timeout(150)
        for _ in range(k): pg.evaluate('window.__deck.step(1)')
        pg.wait_for_timeout(120)
        pg.evaluate(f'''() => {{ const c = window.__deck.cur; const bd = c.spec.beatDur || c.sc.beatDur || 7; const v = {f} > 1.5 ? {f} : {f} * bd; c.bt = v; c.t = v; }}''')
        pg.wait_for_timeout(90)
        im = Image.open(io.BytesIO(pg.locator('#well').screenshot())); shots.append(im)
    b.close()
if errs: print('ERORI:', errs[:5])
W, H = shots[0].size; rows = (len(shots) + cols - 1) // cols
sheet = Image.new('RGB', (W * cols, H * rows), 'black')
for j, im in enumerate(shots): sheet.paste(im, ((j % cols) * W, (j // cols) * H))
sheet.save(out); print(out, sheet.size)
