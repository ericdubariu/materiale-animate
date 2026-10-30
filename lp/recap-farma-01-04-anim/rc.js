// Scena proprie a recapitulării: fișa OSPE a unuia sau a două cazuri (coloana îngustă, layout „script”).
// Rânduri: antet de caz { h, e } (titlul + enunțul pe scurt) sau subpunct { l, q, n: [noțiuni], p } (litera, întrebarea, noțiunile de barem
// în ordinea în care le spui, punctajul oficial dacă există). Un rând = un beat (aceeași ordine ca secțiunile din stânga).
import { C, OUT, bg, txt, pill, dot, check, paint } from './l3/fk.js';

const FONT = (w, s) => `${w} ${s}px Inter, "Segoe UI", sans-serif`;
let MC = null;
function measure(font, s) { if (!MC) MC = document.createElement('canvas').getContext('2d'); MC.font = font; return MC.measureText(s).width; }
function wrap(s, font, maxW) {
  const out = []; let line = '';
  String(s).split(' ').forEach((w) => { const t = line ? line + ' ' + w : w; if (measure(font, t) > maxW && line) { out.push(line); line = w; } else line = t; });
  if (line) out.push(line);
  return out;
}

export function fisaR({ spec }) {
  const o = spec.sceneOpts; const R = o.rows; const WS = 600;
  const QF = FONT(700, 17), EF = FONT(600, 16), PF = FONT(800, 15);
  // așezarea: înălțimea fiecărui rând
  let y = 64;
  const L = R.map((r) => {
    if (r.h) {
      const el = r.e ? wrap(r.e, EF, 510) : [];
      const h = 48 + el.length * 22 + (el.length ? 10 : 0);
      const it = { y, h, el }; y += h + 10; return it;
    }
    const ql = wrap(r.q, QF, r.p ? 350 : 440);
    const items = []; let x = 0, line = 0;
    (r.n || []).forEach((s) => { const w = Math.min(470, measure(PF, s) + 30); if (x + w > 470 && x > 0) { x = 0; line++; } items.push([x, line, w, s]); x += w + 8; });
    const nl = r.n && r.n.length ? line + 1 : 0;
    const h = 22 + ql.length * 22 + nl * 40 + 8;
    const it = { y, h, ql, items, qh: ql.length * 22 }; y += h + 6; return it;
  });
  const cardB = y + 8; const HS = Math.max(897, cardB + 96);
  return {
    W: WS, H: HS, home: { x: WS / 2, y: HS / 2, z: 1 }, anchors: [],
    phase: (i) => { const r = R[i]; if (!r) return ''; return r.h ? r.h.split(' · ')[0] : `subpunctul ${r.l}`; },
    draw(g, t, b) {
      bg(g, WS, HS);
      const sp = new Path2D(); sp.roundRect(16, 50, 568, cardB - 50, 16); paint(g, sp, '#fbf3e2', null, null, [16, 50, 568, cardB - 50], OUT, 6);
      R.forEach((r, k) => {
        const it = L[k]; const on = b.i === k; const a = b.i < 0 || on || b.i > k ? 1 : 0.5;
        if (r.h) {
          const hp = new Path2D(); hp.roundRect(28, it.y, 544, it.h, 12);
          g.save(); g.globalAlpha = a; g.fillStyle = on ? '#C27A10' : '#7a4a10'; g.fill(hp); if (on) { g.strokeStyle = '#ffd36e'; g.lineWidth = 4; g.stroke(hp); } g.restore();
          txt(g, r.h, 44, it.y + 25, 19, '#fff6e6', { stroke: false, align: 'left', alpha: a, maxW: 515 });
          it.el.forEach((ln, j) => txt(g, ln, 44, it.y + 54 + j * 22, 16, '#ffe9c4', { stroke: false, align: 'left', w: 600, alpha: a }));
          return;
        }
        if (on) { const hp = new Path2D(); hp.roundRect(28, it.y - 2, 544, it.h + 2, 12); g.save(); g.fillStyle = 'rgba(255,211,110,.38)'; g.fill(hp); g.strokeStyle = '#C27A10'; g.lineWidth = 4; g.stroke(hp); g.restore(); }
        const cy = it.y + 11 + Math.min(it.qh, 44) / 2;
        dot(g, 52, cy, 17, on ? '#ffd36e' : '#e8d9bd', { ow: 3, alpha: a }); txt(g, r.l, 52, cy, 16, OUT, { stroke: false, alpha: a });
        it.ql.forEach((ln, j) => txt(g, ln, 80, it.y + 22 + j * 22, 17, '#4a2e0c', { stroke: false, align: 'left', w: 700, alpha: a }));
        if (r.p) pill(g, 494, it.y + 22, 84, 30, '#ffe9a8', r.p, { size: 15, ow: 3, r: 10, alpha: a, col: OUT });
        it.items.forEach(([x, line, w, s]) => pill(g, 84 + x + w / 2, it.y + 14 + it.qh + 20 + line * 40, w, 32, '#d9eedd', s, { size: 15, ow: 3, r: 10, alpha: a, col: OUT }));
        if (b.i > k) check(g, 558, it.y + 20, 9, C.gs);
      });
      txt(g, o.foot1 || 'noțiunile de barem întâi · scurt', WS / 2, cardB + 34, 18, C.hi);
      txt(g, o.foot2 || 'max. +50% noțiuni: contează doar primele', WS / 2, cardB + 66, 16, C.dim, { w: 700, maxW: 560 });
    },
  };
}
