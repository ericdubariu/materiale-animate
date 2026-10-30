#!/usr/bin/env python3
"""Adaugă chenarul albastru „Explicație în plus · nu e în LP” (câmpul `xtra` din slides.js) în motorul și CSS-ul deck-urilor.
Idempotent: rulează-l pe toate deck-urile (`python3 tools/patch_xtra.py lp/*/`) după ce copiezi un motor."""
import sys, pathlib

LOOP_OLD = "[['why', 'why', 'De ce?'], "
LOOP_NEW = "[['why', 'why', 'De ce?'], ['xtra', 'xtra', 'Explicație în plus · nu e în LP'], "
PARTS_OLD = "spec.why, spec.say"
PARTS_NEW = "spec.why, spec.xtra, spec.say"
CSS_ANCHOR = ".box .h{display:block;font:800 10.5px/1 var(--f-ui);letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px}"
CSS_ADD = ("\n.xtra{position:relative;margin-top:16px;background:rgba(59,130,246,.10);color:#DCE7FB;box-shadow:inset 0 0 0 2px #3B82F6;border-top-left-radius:0}"
           "\n.xtra .h{position:absolute;left:0;top:-15px;margin:0;padding:3px 10px 2px;background:#3B82F6;color:#fff;border-radius:8px 8px 0 0;font-size:9.5px}"
           "\n.xtra b{color:#fff}")

for d in sys.argv[1:]:
    d = pathlib.Path(d)
    eng, idx = d / 'engine.js', d / 'index.html'
    if not eng.exists() or not idx.exists():
        continue
    e = eng.read_text()
    if LOOP_NEW not in e:
        assert LOOP_OLD in e, f'{d}: ancora buclei lipsește'
        e = e.replace(LOOP_OLD, LOOP_NEW)
    if PARTS_NEW not in e and PARTS_OLD in e:
        e = e.replace(PARTS_OLD, PARTS_NEW, 1)
    eng.write_text(e)
    h = idx.read_text()
    if '.xtra{' not in h:
        assert CSS_ANCHOR in h, f'{d}: ancora CSS lipsește'
        h = h.replace(CSS_ANCHOR, CSS_ANCHOR + CSS_ADD, 1)
        idx.write_text(h)
    print('ok', d)
