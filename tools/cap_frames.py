#!/usr/bin/env python3
"""cap.py <deck_dir> <out.png> s:k:t [s:k:t ...]  (slide s 1-based, beat k = -1 intro / 0.. , t = secunde în beat; t<0 → cadrul final 1e4)
Randează doar godeul (scena) și pune cadrele într-o grilă."""
import sys, io, threading, functools, http.server, socketserver
from pathlib import Path
from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright
deck = Path(sys.argv[1]).resolve(); out = sys.argv[2]; specs = sys.argv[3:]
full = False
if specs and specs[0] == '--full': full = True; specs = specs[1:]
root = deck.parent.parent; rel = deck.relative_to(root).as_posix()
class Q(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads = True
class _H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *x): pass
srv = Q(('127.0.0.1', 0), functools.partial(_H, directory=str(root))); port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
shots = []; errs = []
with sync_playwright() as p:
    br = p.chromium.launch(args=['--force-color-profile=srgb'])
    pg = br.new_page(viewport={'width': 1280, 'height': 720})
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(f'http://127.0.0.1:{port}/{rel}/index.html'); pg.wait_for_timeout(900)
    last = None
    for sp in specs:
        s, k, t = sp.split(':'); s = int(s); k = int(k); t = float(t)
        if last != s: pg.evaluate(f'window.__deck.show({s-1})'); pg.wait_for_timeout(250); last = s
        if k >= 0: pg.evaluate(f'window.__deck.jumpTo({k})')
        else: pg.evaluate('(()=>{const c=window.__deck.cur;c.k=0;c.bt=0;})()')
        pg.wait_for_timeout(900)  # camera
        if t >= 0: pg.evaluate(f'window.__deck.cur.bt={t}-0.03')
        pg.wait_for_timeout(90)
        el = pg if full else pg.locator('#well')
        shots.append((sp, el.screenshot()))
    br.close()
if errs: print('ERORI:', *errs[:8], sep='\n  ')
ims = [(sp, Image.open(io.BytesIO(b)).convert('RGB')) for sp, b in shots]
n = len(ims); cols = 1 if n == 1 else 2 if (n <= 4 or full) else 3
tw = (1100 if n == 1 else 716) if full else (560 if cols < 3 else 470)
th = int(tw * ims[0][1].height / ims[0][1].width); rows = (n + cols - 1) // cols
sheet = Image.new('RGB', (cols * tw + (cols + 1) * 6, rows * (th + 6) + 6), '#000')
d = ImageDraw.Draw(sheet)
for i, (sp, im) in enumerate(ims):
    x = 6 + (i % cols) * (tw + 6); y = 6 + (i // cols) * (th + 6)
    sheet.paste(im.resize((tw, th), Image.LANCZOS), (x, y)); d.rectangle([x, y, x + 78, y + 18], fill='#000'); d.text((x + 4, y + 3), sp, fill='#ff0')
sheet.save(out); print('ok', out, sheet.size)
