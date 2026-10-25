// Scenele deck-ului Fiziopat: coperta, formatul examenului, foaia de răspuns (comune) + q1..q22 (sA, sB, sC).
import { lerp, rbc } from './kit2d.js';
import { W, H, cam, HOME, lbl, bgFill, u01, stage, ring, txt, pill, node, field, thermometer, PURPLE, OUT, clamp, ease, glowRing, paint, blob, bb, arrow, REDUCED } from './fz.js';
import { atlas } from './atlas.js';
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';

/* ---------------- copertă: 4 capitole ---------------- */
function cover() {
  const P = [[270, 250], [730, 250], [270, 690], [730, 690]]; const k = [0, 0, 0, 0];
  const icons = [
    (g, t) => { thermometer(g, 500, 640, 420, 0.55 + 0.25 * Math.sin(t)); txt(g, '37°C', 680, 420, 70, '#ffe36e'); },
    (g, t) => { g.save(); g.strokeStyle = OUT; g.lineWidth = 26; g.lineCap = 'round'; g.beginPath(); for (let x = 150; x <= 850; x += 10) { const y = 650 - 260 * Math.max(0, Math.sin((x - 150) / 700 * Math.PI)) + 18 * Math.sin(x / 30 + t * 3); x === 150 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); g.strokeStyle = '#ff6b7a'; g.lineWidth = 14; g.stroke(); g.restore(); txt(g, 'set-point ↑', 500, 300, 64, '#ffe36e'); },
    (g, t) => { paint(g, blob(500, 470, 240, 190, 0.2, t, 0.06, 16, 2), '#f2a3c6', '#df7dab', '#ffd6e8', bb(500, 470, 240, 190), OUT, 9); paint(g, blob(500, 470, 90, 80, 0, t, 0.1, 14, 4), '#d9d2fb', '#b9a6ea', '#fff', bb(500, 470, 90, 80), OUT, 7); for (let j = 0; j < 4; j++) paint(g, blob(470 + (j % 2) * 60, 445 + Math.floor(j / 2) * 50, 22, 20, 0, t, 0.03, 10, j), '#2c2490', null, '#6b63c9', bb(500, 470, 22, 20), OUT, 4); txt(g, 'Reed-Sternberg', 500, 780, 54, '#ffe36e'); },
    (g, t) => { const f = 1 + 0.06 * Math.sin(t * 4); g.save(); g.translate(500, 560); g.scale(f, f); const p = new Path2D(); p.moveTo(0, -330); p.bezierCurveTo(180, -140, 230, 30, 150, 160); p.bezierCurveTo(90, 250, -90, 250, -150, 160); p.bezierCurveTo(-230, 30, -120, -100, 0, -330); paint(g, p, '#ff8a3d', '#e2541f', '#ffd27a', [-230, -330, 460, 580], OUT, 10); g.restore(); txt(g, 'rubor · calor · tumor', 500, 880, 50, '#ffe36e'); },
  ];
  return {
    home: HOME, cams: P.map(([x, y]) => cam(x, y, 1.8)), anchors: P.map(([x, y]) => [x - 150, y - 150]),
    labels: P.map(([x, y], i) => lbl([x, y + 205], ['termoreglarea · Î 1–9', 'febra · Î 10–15', 'Hodgkin + angina · Î 16–20', 'inflamația · Î 21–22'][i])),
    draw(g, t, b) {
      bgFill(g, '#2b1d48', '#120b1f');
      P.forEach(([x, y], i) => { k[i] = lerp(k[i], b.i === i ? 1 : 0, 0.08); field(g, x, y, 180, () => { g.save(); g.fillStyle = '#3a2a5c'; g.fillRect(x - 200, y - 200, 400, 400); g.translate(x - 180, y - 180); g.scale(0.36, 0.385); icons[i](g, t); g.restore(); }); if (k[i] > 0.05) glowRing(g, x, y, 195, 195, 0, k[i]); });
    },
  };
}

/* ---------------- formatul examenului ---------------- */
function exam() {
  return {
    home: HOME, cams: [cam(330, 330, 1.2), cam(700, 560, 1.25), cam(700, 560, 1.25), cam(500, 470, 1)], anchors: [[120, 120], [560, 330], [880, 330], [500, 870]],
    labels: [lbl([330, 640], '22 de întrebări → tragi 2'), lbl([700, 900], 'scris · 30 de minute')],
    draw(g, t, b) {
      bgFill(g);
      const draw2 = b.i < 0 ? 1 : b.i === 0 ? ease(b.bt / 2.5) : 1;
      // pachetul de 22 de cartonașe
      for (let k = 21; k >= 0; k--) { const a = -0.5 + k / 21; const x = 330 + Math.sin(a) * 260, y = 380 - Math.cos(a) * 60 + 40; const pick = k === 5 || k === 15; let px = x, py = y; if (pick) { px = lerp(x, k === 5 ? 210 : 450, draw2); py = lerp(y, 190, draw2); } g.save(); g.translate(px, py); g.rotate(a * 0.6 * (pick ? 1 - draw2 : 1)); g.fillStyle = pick ? '#ffe36e' : '#4a3a6e'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(-55, -80, 110, 160, 12); g.fill(); g.stroke(); txt(g, String(k + 1), 0, 14, 36, pick ? '#2a1534' : '#fff'); g.restore(); }
      if (draw2 > 0.6) { txt(g, 'mecanism', 210, 310, 26, '#ffe36e'); txt(g, 'definiție /', 450, 300, 24, '#ffe36e'); txt(g, 'clasificare', 450, 330, 24, '#ffe36e'); }
      // foaia de examen
      const sh = new Path2D(); sh.roundRect(560, 380, 300, 400, 14); paint(g, sh, '#fbf6ea', null, null, [560, 380, 300, 400], OUT, 7);
      g.save(); g.clip(sh); g.strokeStyle = '#9ec5ff'; g.lineWidth = 2; for (let y = 430; y < 780; y += 28) { g.beginPath(); g.moveTo(560, y); g.lineTo(860, y); g.stroke(); } g.strokeStyle = '#ff7b8a'; g.beginPath(); g.moveTo(600, 380); g.lineTo(600, 780); g.stroke();
      const wr = b.i < 0 ? 1 : b.i >= 1 ? (b.i === 1 ? ease(b.bt / 4) : 1) : 0; g.strokeStyle = '#2b3a8a'; g.lineWidth = 4; for (let k = 0; k < 11; k++) { const f = clamp(wr * 11 - k); if (f <= 0) break; g.beginPath(); g.moveTo(612, 425 + k * 28); for (let x = 0; x < 230 * f; x += 6) g.lineTo(612 + x, 425 + k * 28 + Math.sin(x * 0.5 + k) * 3); g.stroke(); } g.restore();
      // ceasul de 30 de minute
      const C = [880, 230]; const f = b.i < 0 ? (t * 0.05) % 1 : clamp((b.i * 6 + b.bt) / 30);
      g.save(); g.fillStyle = '#3a2a5c'; g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.arc(C[0], C[1], 85, 0, 7); g.fill(); g.stroke(); g.strokeStyle = '#ffe36e'; g.lineWidth = 16; g.beginPath(); g.arc(C[0], C[1], 62, -1.57, -1.57 + 6.283 * f); g.stroke(); g.restore(); txt(g, '30', C[0], C[1] + 14, 40); txt(g, 'min', C[0], C[1] + 120, 26, '#c9b3ff');
      if (b.i === 2 || b.i < 0) { txt(g, '50–70 de cuvinte', 710, 830, 30, '#9dff8a'); }
      if (b.i === 3) { g.save(); g.globalAlpha = ease(b.bt); txt(g, 'NU mai intră: hipersensibilitatea, infecțiile', 500, 900, 26, '#ff8a8a'); g.restore(); }
      ring(g, b, 0, 330, 330, 300, 230); ring(g, b, 1, 710, 580, 180, 230); ring(g, b, 2, 710, 580, 180, 230);
    },
  };
}

/* ---------------- foaia de răspuns: frazele se „scriu” pe rând ---------------- */
const plain = (s) => String(s || '').replace(/<[^>]+>/g, '');
function tokenize(s) { // [{w, bold}]
  const out = []; let bold = false;
  String(s).split(/(\*\*)/).forEach((part) => { if (part === '**') { bold = !bold; return; } part.split(/(\s+)/).forEach((w) => { if (w) out.push({ w, bold }); }); });
  return out;
}
function foaie({ spec }) {
  const pts = spec.points || []; const o = spec.sceneOpts || {};
  const X0 = 110, X1 = 925, FS = 27, LH = 42;
  let L = null; const cams = []; const anchors = pts.map((_, k) => () => [70, L ? L.y0[k] + 6 : 120 + k * 80]);
  const layout = (g) => {
    g.save(); g.font = `500 ${FS}px Inter, sans-serif`; const sp = g.measureText(' ').width; let y = 150; const y0 = [], items = [];
    pts.forEach((p, k) => { const toks = tokenize((p.d && p.d[0]) || p.h); let x = X0; y0.push(y); const line = [];
      toks.forEach((tk) => { if (/^\s+$/.test(tk.w)) return; if ((/^[.,;:)!?]/.test(tk.w) || (line.length && /[(„]$/.test(line[line.length - 1].w))) && line.length) x -= sp; g.font = `${tk.bold ? 700 : 500} ${FS}px Inter, sans-serif`; const w = g.measureText(tk.w).width; if (x + w > X1) { x = X0; y += LH; } line.push({ ...tk, x, y, wd: w }); x += w + sp; });
      items.push(line); y += LH + 18; });
    g.restore();
    const total = items.reduce((a, l) => a + l.length, 0);
    return { y0, items, end: y, total };
  };
  return {
    home: HOME, cams, anchors,
    phase: (i) => (i >= 0 ? `fraza ${i + 1} din ${pts.length}` : ''),
    draw(g, t, b) {
      if (!L) { L = layout(g); const scale = Math.min(1, 880 / Math.max(500, L.end)); L.items.forEach((l, k) => cams[k] = cam(500, Math.min(Math.max(L.y0[k] + 150, 400), Math.max(400, L.end - 300)), 1.12)); }
      bgFill(g, '#24183a', '#120b1f');
      // foaia
      const sh = new Path2D(); sh.roundRect(40, 40, 920, Math.max(854, L.end + 40), 18); paint(g, sh, '#fbf6ea', null, null, [40, 40, 920, 854], OUT, 8);
      g.save(); g.clip(sh); g.strokeStyle = '#a9ccff'; g.lineWidth = 2; for (let y = 150 + 8; y < L.end + 80; y += LH) { g.beginPath(); g.moveTo(40, y); g.lineTo(960, y); g.stroke(); } g.strokeStyle = '#ff8a95'; g.lineWidth = 3; g.beginPath(); g.moveTo(96, 40); g.lineTo(96, L.end + 80); g.stroke(); g.restore();
      g.save(); g.font = `800 30px "Plus Jakarta Sans", Inter, sans-serif`; g.fillStyle = '#5a3fb0'; g.fillText(`Întrebarea ${o.n}`, X0, 100); g.restore();
      // cât s-a scris
      let shown = 0;
      L.items.forEach((line, k) => {
        const f = b.i < 0 ? 1 : k < b.i ? 1 : k === b.i ? clamp(b.bt / (b.bd * 0.7)) : 0; const n = Math.floor(line.length * f + (f >= 1 ? 0 : 0));
        for (let j = 0; j < n; j++) { const tk = line[j];
          if (tk.bold) { const hl = k === b.i ? clamp((b.bt - 0.2) * 2) : 1; g.save(); g.globalAlpha = 0.55; g.fillStyle = '#ffe36e'; g.fillRect(tk.x - 3, tk.y - FS + 4, (tk.wd + 6) * hl, FS + 4); g.restore(); }
          g.save(); g.font = `${tk.bold ? 700 : 500} ${FS}px Inter, sans-serif`; g.fillStyle = tk.bold ? '#1b1350' : '#2b3a8a'; g.fillText(tk.w, tk.x, tk.y); g.restore(); }
        shown += n;
        if (k === b.i && f < 1 && n < line.length) { const tk = line[n]; g.save(); g.translate(tk.x, tk.y); g.rotate(-0.6); g.fillStyle = '#ffd36e'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(0, -8, 90, 16, 6); g.fill(); g.stroke(); g.fillStyle = OUT; g.beginPath(); g.moveTo(0, -8); g.lineTo(-18, 0); g.lineTo(0, 8); g.fill(); g.restore(); }
      });
      // contorul de cuvinte
      const words = Math.round((o.words || 70) * shown / Math.max(1, L.total));
      const cy = Math.max(L.end + 10, 830); pill(g, `${words} / ~${o.words} cuvinte · ~${o.min} min`, 760, Math.min(cy, 880), '#5a3fb0', 22);
    },
  };
}

function fallback() { return { home: HOME, anchors: [], draw(g) { bgFill(g); } }; }

export const SCENES = { atlas, cover, exam, foaie, fallback, ...SA, ...SB, ...SC };
