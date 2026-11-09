#!/usr/bin/env python3
"""Textul din stânga: scroll când nu încape (09.11.2026).

- #body (punctele, casetele, tabelul) devine derulabil: rotiță, trackpad, deget pe tabletă;
- jos apare o fâșie estompată + „↓ mai e text” cât timp mai e ceva dedesubt;
- punctul activ e adus singur în vedere când avansezi (fără să miște restul paginii);
- textul se reîncadrează și după ce se încarcă fonturile (nu doar la primul slide).

Folosire: python3 tools/patch_scroll.py lp/<id>/ [lp/<id2>/ ...]   (idempotent)
"""
import sys, pathlib

MARK = '/* scroll-text v1 */'
CSS = MARK + '''
#body{overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.28) transparent}
#body::-webkit-scrollbar{width:6px}
#body::-webkit-scrollbar-thumb{background:rgba(255,255,255,.28);border-radius:6px}
#body::-webkit-scrollbar-track{background:transparent}
#txt.more #body{-webkit-mask-image:linear-gradient(#000 calc(100% - 30px),transparent);mask-image:linear-gradient(#000 calc(100% - 30px),transparent)}
#moreHint{position:absolute;right:4px;z-index:2;font:700 10.5px/1 var(--f-ui);letter-spacing:.04em;color:#fff;background:var(--histo);padding:5px 9px;border-radius:999px;box-shadow:0 4px 12px rgba(0,0,0,.45);opacity:0;transition:opacity .3s;pointer-events:none}
#txt.more #moreHint{opacity:.92}
'''

JS_FUNCS = '''
/* ---------- scroll în textul din stânga (când nu încape) ---------- */
function updMore() {
  const b = $('body'), t = $('txt'); if (!b || !t) return;
  const more = b.scrollHeight - b.clientHeight - b.scrollTop > 3;
  t.classList.toggle('more', more);
  let h = $('moreHint');
  if (!h) { h = document.createElement('div'); h.id = 'moreHint'; h.textContent = '↓ mai e text'; t.appendChild(h); }
  if (more) { const br = b.getBoundingClientRect(), tr = t.getBoundingClientRect(), s = tr.width / (t.offsetWidth || 1) || 1; h.style.top = ((br.bottom - tr.top) / s - 28) + 'px'; }
}
function keepVisible(el) {
  const b = $('body'); if (!el || b.scrollHeight <= b.clientHeight + 1) return;
  const br = b.getBoundingClientRect(), er = el.getBoundingClientRect();
  const r = b.clientHeight / (br.height || 1), pad = 10;
  let d = 0;
  if (er.bottom > br.bottom - 24) d = Math.min(er.bottom - br.bottom + 24, er.top - br.top - pad);
  else if (er.top < br.top) d = er.top - br.top - pad;
  if (Math.abs(d) < 1) return;
  b.scrollTo({ top: Math.max(0, b.scrollTop + d * r), behavior: reduced ? 'auto' : 'smooth' });
}
'''

def patch(d):
    d = pathlib.Path(d); ih = d / 'index.html'; ej = d / 'engine.js'
    h = ih.read_text(encoding='utf-8'); e = ej.read_text(encoding='utf-8')
    if MARK not in h:
        assert '</style>' in h, ih
        h = h.replace('</style>', CSS + '</style>', 1)
        ih.write_text(h, encoding='utf-8')
    if 'function keepVisible' in e:
        print('deja:', d); return
    old_fit = '  let z = 1.3; body.style.zoom = z;'
    assert e.count(old_fit) == 1, ej
    e = e.replace(old_fit, '  if (!body.clientHeight) { requestAnimationFrame(() => { if ($(\'body\').clientHeight) autoFit(); }); }\n  body.scrollTop = 0;\n' + old_fit, 1)
    old_end = '  body.dataset.zoom = z.toFixed(2);\n}'
    assert e.count(old_end) == 1, ej
    e = e.replace(old_end, '  body.dataset.zoom = z.toFixed(2);\n  body.scrollTop = 0; updMore();\n}\n' + JS_FUNCS, 1)
    old_siv = "  if (el && el.scrollIntoView) { const body = $('body'); if (el.offsetTop + el.offsetHeight > body.scrollTop + body.clientHeight) el.scrollIntoView({ block: 'nearest' }); }"
    assert e.count(old_siv) == 1, ej
    e = e.replace(old_siv, '  if (el) keepVisible(el);', 1)
    old_rs = "addEventListener('resize', fit);"
    assert e.count(old_rs) == 1, ej
    e = e.replace(old_rs, old_rs + "\n$('body').addEventListener('scroll', updMore, { passive: true });\naddEventListener('resize', () => { try { updMore(); } catch (e) { /* încă nu e randat */ } });\nif (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', () => { try { autoFit(); } catch (e) { /* încă nu e randat */ } });", 1)
    ej.write_text(e, encoding='utf-8')
    print('ok:', d)

for a in sys.argv[1:]: patch(a)
