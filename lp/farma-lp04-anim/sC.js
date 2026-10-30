// Scenele pentru Partea C + final: plantele, sinapsa colinergică (clasificarea), matricea adrenergică,
// cardurile (APARE DES, capcane) și panourile tabelului de recapitulare.
import { W, H, HOME, C, OUT, clamp, lerp, ease, bg, panel, txt, pill, dot, ell, arr, cross, check, ligand, membrane, receptor, icon, iris, chart, mark, glowRing, paint, blob, bb } from './fk.js';
import { fIleon, fUter, ILEON, UTER } from './sB.js';

const hiBox = (g, x, y, w, h, on) => { if (!on) return; g.save(); g.shadowColor = C.hi; g.shadowBlur = 24; g.strokeStyle = C.hi; g.lineWidth = 6; g.beginPath(); g.roundRect(x - 4, y - 4, w + 8, h + 8, 22); g.stroke(); g.restore(); };

/* =================================================== PLANTELE */
export function plants() {
  return {
    home: HOME, anchors: [[60, 60], [540, 60]],
    draw(g, t, b) {
      bg(g);
      panel(g, 20, 20, 470, 890, {}); panel(g, 510, 20, 470, 890, {});
      hiBox(g, 20, 20, 470, 890, b.i === 0); hiBox(g, 510, 20, 470, 890, b.i === 1);
      // Atropa belladonna: tulpină, frunze ovale, flori-clopot violet-brun, boabe negre lucioase
      g.save(); g.lineCap = 'round'; for (const [c, w] of [[OUT, 16], ['#4f7a35', 9]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(255, 640); g.quadraticCurveTo(240, 420, 270, 160); g.moveTo(250, 470); g.quadraticCurveTo(170, 380, 120, 300); g.moveTo(262, 330); g.quadraticCurveTo(350, 270, 390, 200); g.stroke(); } g.restore();
      [[150, 360, -0.7], [340, 420, 0.6], [200, 230, -0.4], [330, 280, 0.9], [175, 520, -0.9], [345, 560, 0.5]].forEach(([x, y, r]) => paint(g, blob(x, y, 62, 30, r, 0, 0.05, 12, x), '#5f9a3e', '#46782c', '#9fd07a', bb(x, y, 62, 30), OUT, 5));
      for (const [x, y] of [[120, 300], [390, 200]]) { const p = new Path2D(); p.moveTo(x - 8, y); p.quadraticCurveTo(x - 28, y + 30, x - 30, y + 68); p.quadraticCurveTo(x - 20, y + 60, x - 10, y + 70); p.quadraticCurveTo(x, y + 60, x + 10, y + 70); p.quadraticCurveTo(x + 20, y + 60, x + 30, y + 68); p.quadraticCurveTo(x + 28, y + 30, x + 8, y); p.closePath(); paint(g, p, '#7a3a66', '#5a2a4c', '#b07aa0', [x - 30, y, 60, 70], OUT, 5); for (const d of [-1, 0, 1]) ell(g, x + d * 9, y + 2, 7, 12, '#4f7a35', { ow: 3, rot: d * 0.5 }); }
      for (const [x, y] of [[270, 150], [300, 455], [215, 470]]) { for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2 - Math.PI / 2; ell(g, x + Math.cos(a) * 20, y - 14 + Math.sin(a) * 10, 14, 6, '#4f7a35', { ow: 3, rot: a }); } ell(g, x, y, 24, 24, '#16121a', { ow: 5 }); dot(g, x - 8, y - 9, 6, '#ffffff', { ow: 0, alpha: 0.8 }); }
      txt(g, 'Atropa belladonna', 255, 690, 26, '#c9a0d8');
      txt(g, '→ atropina', 255, 730, 24, C.atr);
      txt(g, 'fructe toxice → sindrom anticolinergic:', 255, 790, 17, C.cream, { w: 700 });
      txt(g, 'midriază · tahicardie · gură uscată\npiele roșie și caldă · agitație', 255, 840, 17, C.cream, { w: 600 });
      // Pilocarpus (jaborandi): frunză compusă penată
      g.save(); g.lineCap = 'round'; for (const [c, w] of [[OUT, 14], ['#4f7a35', 7]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(745, 640); g.lineTo(745, 130); g.stroke(); } g.restore();
      for (let k = 0; k < 5; k++) { const y = 560 - k * 95; for (const d of [-1, 1]) paint(g, blob(745 + d * 90, y - 10, 82, 32, d * -0.35, 0, 0.04, 12, k * 3 + d), '#3f8f4a', '#2d6e37', '#86c98e', bb(745 + d * 90, y, 82, 32), OUT, 5); }
      paint(g, blob(745, 110, 36, 70, 0, 0, 0.04, 12, 9), '#3f8f4a', '#2d6e37', '#86c98e', bb(745, 110, 36, 70), OUT, 5);
      txt(g, 'Pilocarpus (jaborandi)', 745, 690, 26, '#9fe0a8');
      txt(g, '→ pilocarpina (din frunze)', 745, 730, 24, C.pilo);
      txt(g, 'stimulează receptorii M:', 745, 790, 17, C.cream, { w: 700 });
      txt(g, 'mioză · salivație · transpirație', 745, 830, 17, C.cream, { w: 600 });
    },
  };
}

/* =================================================== CLASIFICAREA COLINERGICĂ: sinapsa */
export function cholSyn() {
  const MY = 480; const RX = [300, 500, 700];
  const GR = [['bronchi', 'bronhodilatatoare', 'ipratropiu, tiotropiu'], ['gut', 'antispastice', 'butilscopolamină'], ['stomach', 'antisecretoare', 'pirenzepina'], ['brain', 'centrale', 'trihexifenidil']];
  return {
    home: HOME, anchors: [[RX[0] - 65, MY - 70], [905, 250], [RX[2] - 65, MY - 70], [60, 690]],
    phase: (i) => ['PSM direct', 'PSM indirect', 'parasimpatolitic', '4 grupe de -litice'][i] || '',
    draw(g, t, b) {
      bg(g);
      // terminația colinergică
      ell(g, 500, 120, 300, 100, C.nerve, { ow: 6 });
      txt(g, 'terminația colinergică', 500, 70, 20, OUT, { stroke: false });
      for (let k = 0; k < 6; k++) { const x = 330 + k * 66; ell(g, x, 140, 20, 20, '#fff8e0', { ow: 3 }); dot(g, x, 140, 6, C.ach, { ow: 1.5 }); }
      txt(g, 'ACh în fantă', 200, 250, 18, C.ach);
      for (let k = 0; k < 9; k++) dot(g, 330 + (k * 47) % 340, 260 + (k % 3) * 30, 7, C.ach, { ow: 2 });
      // celula efectoare
      const cell = new Path2D(); cell.roundRect(60, MY, 880, 170, 30); paint(g, cell, '#ef9aa2', '#d3747f', null, [60, MY, 880, 170], OUT, 6);
      membrane(g, 60, 940, MY, { h: 40 });
      txt(g, 'celula efectoare: mușchi neted, glandă, cord', 500, MY + 120, 19, OUT, { stroke: false });
      RX.forEach((x, k) => { receptor(g, x, MY, k === 2 ? '#7b8a90' : '#7ad3a0', 'M', { s: 0.75, ly: 70, size: 22, glow: k === 0 ? 0.7 : 0, gc: C.pilo }); });
      ligand(g, RX[0], MY - 70, C.pilo, 'P', 22); txt(g, 'pilocarpina', RX[0], MY - 115, 19, C.pilo);
      ligand(g, RX[2], MY - 70, C.atr, 'A', 22, { shape: 'block' }); txt(g, 'atropina', RX[2], MY - 115, 19, C.atr);
      // acetilcolinesteraza blocată de neostigmină
      ell(g, 850, 300, 56, 40, '#d6c4ff', { ow: 5 }); txt(g, 'acetilcolin-\nesteraza', 850, 300, 15, OUT, { stroke: false });
      ligand(g, 800, 262, '#ffd36e', 'N', 17, { shape: 'block' }); txt(g, 'neostigmina', 850, 220, 19, '#ffd36e');
      cross(g, 900, 272, 12, C.key, 1);
      txt(g, '→ mai multă ACh\npe M și N', 860, 380, 16, C.cream, { w: 700 });
      // cele 4 grupe de parasimpatolitice
      panel(g, 30, 690, 940, 225, { fill: 'rgba(197,123,255,.1)', stroke: b.i === 3 ? C.hi : 'rgba(197,123,255,.5)', lw: b.i === 3 ? 5 : 3 });
      GR.forEach(([ic, h, d], k) => { const x = 150 + k * 235; icon(g, ic, x, 760, 0.75); txt(g, h, x, 835, 18, C.atr); txt(g, d, x, 870, 15, C.cream, { w: 700, maxW: 225 }); });
    },
  };
}

/* =================================================== MATRICEA ADRENERGICĂ */
export function adrMatrix() {
  const ROWS = [['adrenalina, dopamina,\nefedrina', [1, 1, 1, 1]], ['noradrenalina', [1, 1, 0.5, 0]], ['izoprenalina', [0, 0, 1, 1]], ['dobutamina', [0, 0, 1, 0]], ['fenoterol', [0, 0, 0, 1]],
    ['doxazosin,\ntamsulosin', [-1, 0, 0, 0]], ['propranolol', [0, 0, -1, -1]], ['metoprolol', [0, 0, -1, 0]], ['carvedilol', [-1, 0, -1, -1]]];
  const CX = [470, 580, 690, 800]; const Y0 = 120, DY = 82;
  return {
    home: HOME, anchors: ROWS.map((_, k) => [40, Y0 + k * DY]),
    draw(g, t, b) {
      bg(g);
      ['α1', 'α2', 'β1', 'β2'].forEach((h, j) => txt(g, h, CX[j], 60, 30, j < 2 ? C.gq : C.gs));
      g.save(); g.fillStyle = 'rgba(79,209,139,.10)'; g.fillRect(20, Y0 - DY / 2, 960, DY * 5); g.fillStyle = 'rgba(255,107,94,.10)'; g.fillRect(20, Y0 + DY * 4.5, 960, DY * 4); g.restore();
      txt(g, 'stimulează', 975, Y0 + DY * 2, 15, C.gs, { align: 'right', w: 700 }); txt(g, 'blochează', 975, Y0 + DY * 6.5, 15, C.key, { align: 'right', w: 700 });
      ROWS.forEach(([n, v], k) => {
        const y = Y0 + k * DY; const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.45;
        if (on) { g.save(); g.strokeStyle = C.hi; g.lineWidth = 5; g.shadowColor = C.hi; g.shadowBlur = 18; g.beginPath(); g.roundRect(24, y - DY / 2 + 4, 952, DY - 8, 14); g.stroke(); g.restore(); }
        txt(g, n, 205, y, n.includes('\n') ? 19 : 22, k === 8 || k === 5 ? C.hi : C.cream, { alpha: a });
        v.forEach((s, j) => { const x = CX[j]; if (s === 1) dot(g, x, y, 18, C.gs, { alpha: a, ow: 4 }); else if (s === 0.5) { g.save(); g.globalAlpha = a; g.strokeStyle = C.gs; g.lineWidth = 6; g.beginPath(); g.arc(x, y, 16, 0, 7); g.stroke(); g.restore(); } else if (s === -1) cross(g, x, y, 15, C.key, a); else txt(g, '–', x, y, 26, C.dim, { alpha: a }); });
      });
      txt(g, '● stimulează · ✕ blochează · ○ efect mai slab (NA pe β1, din manuale)', 500, 900, 17, C.dim, { w: 700 });
    },
  };
}

/* =================================================== CARDURI (APARE DES, capcane) */
// sceneOpts: { cols, items: [{t, w, r}] } — w = varianta greșită (✕), r = răspunsul corect / cuvântul-cheie
export function cards({ spec }) {
  const o = spec.sceneOpts; const T = o.items; const cols = o.cols || 3; const rows = Math.ceil(T.length / cols);
  const WW = o.narrow ? 600 : 1000, HH = o.narrow ? 897 : 934;
  const GX = 14, GY = 14; const w = (WW - 30 - GX * (cols - 1)) / cols; const h = (HH - 30 - GY * (rows - 1)) / rows;
  const pos = T.map((_, k) => { const r = Math.floor(k / cols); const n = r === rows - 1 ? T.length - r * cols : cols; const off = (cols - n) * (w + GX) / 2; return [15 + off + (k % cols) * (w + GX), 15 + r * (h + GY)]; });
  return {
    W: WW, H: HH, home: { x: WW / 2, y: HH / 2, z: 1 }, anchors: pos.map(([x, y]) => [x + 26, y + 26]),
    draw(g, t, b) {
      bg(g, WW, HH);
      T.forEach((it, k) => {
        const [x, y] = pos[k]; const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.5;
        panel(g, x, y, w, h, { fill: on ? 'rgba(255,207,133,.15)' : 'rgba(255,236,200,.06)', stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3, alpha: a });
        txt(g, it.t, x + w / 2 + 12, y + h * (it.w ? 0.3 : 0.36), 19, C.hi, { alpha: a, maxW: w - 60 });
        if (it.w) { cross(g, x + 34, y + h * 0.56, 10, C.key, a); txt(g, it.w, x + 56, y + h * 0.56, 16, '#ffb3ab', { align: 'left', alpha: a, w: 700, maxW: w - 70 }); }
        if (it.r) { const yy = it.w ? y + h * 0.8 : y + h * 0.68; if (it.w) check(g, x + 34, yy, 10, C.gs, a); txt(g, it.r, it.w ? x + 56 : x + w / 2, yy, it.w ? 16 : 17, it.w ? '#b8f5cf' : C.cream, { align: it.w ? 'left' : 'center', alpha: a, w: 700, maxW: w - (it.w ? 70 : 24) }); }
      });
    },
  };
}

/* =================================================== RECAPITULARE: cele 4 experimente (coloana îngustă, 4 benzi) */
export function recap4() {
  const WW = 600, HH = 897; const PH = 205; const Y = [12, 233, 454, 675];
  const T = ['1 · ileon (cobai) · M3–Gq', '2 · salivă (șoareci) · M–Gq', '3 · pupila (iepure) · M3–Gq', '4 · uter (șobolan) · β2–Gs'];
  return {
    W: WW, H: HH, home: { x: WW / 2, y: HH / 2, z: 1 }, anchors: Y.map((y) => [40, y + 30]),
    draw(g, t, b) {
      bg(g, WW, HH);
      Y.forEach((y, k) => {
        const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.5; const x = 15, w = 570;
        panel(g, x, y, w, PH, { fill: on ? 'rgba(255,207,133,.13)' : 'rgba(255,236,200,.06)', stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3 });
        txt(g, T[k], x + w / 2 + 20, y + 28, 19, C.hi, { alpha: a });
        g.save(); g.globalAlpha = a;
        if (k === 0 || k === 3) { const D = k === 0 ? ILEON : UTER; const m = chart(g, x + 20, y + 52, w - 40, PH - 64, k === 0 ? fIleon : (xx) => fUter(xx), 1, { pen: false }); D.marks.forEach(([xx, , c]) => { g.save(); g.strokeStyle = c; g.lineWidth = 3; g.setLineDash([6, 5]); g.beginPath(); g.moveTo(m.X(xx), y + 56); g.lineTo(m.X(xx), y + PH - 16); g.stroke(); g.restore(); }); }
        if (k === 1) { [[2, 40], [1, 24], [4, 23], [3, 7]].forEach(([l, d], j) => { const xx = x + 80 + j * 135; ell(g, xx, y + 110, 46, 46, '#fbf3e2', { ow: 4 }); ell(g, xx, y + 110, d, d, 'rgba(90,160,230,.8)', { ow: 2 }); txt(g, `lot ${l}`, xx, y + 180, 17, C.cream); }); }
        if (k === 2) { [[18, 'pilocarpină'], [34, 'martor'], [64, 'atropină']].forEach(([pr, l], j) => { iris(g, x + 110 + j * 175, y + 112, 50, pr * 0.55, { col: '#7a4a2a' }); txt(g, l, x + 110 + j * 175, y + 190, 16, C.cream, { w: 700 }); }); }
        g.restore();
      });
    },
  };
}

/* =================================================== GALERIA (recapitularea vizuală, coloana îngustă) */
const IMG = {};
function img(n) { if (!IMG[n]) { const i = new Image(); i.src = `img/${n}.jpg`; IMG[n] = i; } return IMG[n]; }
export function gallery({ spec }) {
  const T = spec.sceneOpts.tiles; const WW = 600, HH = 897; const TW = 277, TH = 207;
  const pos = T.map((_, k) => [15 + (k % 2) * (TW + 16), 12 + Math.floor(k / 2) * (TH + 14)]);
  return {
    W: WW, H: HH, home: { x: WW / 2, y: HH / 2, z: 1 }, anchors: pos.map(([x, y]) => [x + 24, y + 24]),
    draw(g, t, b) {
      bg(g, WW, HH);
      T.forEach((tl, k) => {
        const [x, y] = pos[k]; const on = b.i === k; const im = img(tl.img); const p = new Path2D(); p.roundRect(x, y, TW, TH, 14);
        g.save(); g.fillStyle = '#100916'; g.fill(p); g.clip(p);
        if (im.complete && im.naturalWidth) { const [sx, sy, sw, sh] = tl.src || [0, 0, im.naturalWidth, im.naturalHeight]; const r = Math.max(TW / sw, TH / sh); const dw = TW / r, dh = TH / r; g.drawImage(im, sx + (sw - dw) / 2, sy + (sh - dh) / 2, dw, dh, x, y, TW, TH); }
        g.fillStyle = 'rgba(20,12,6,.78)'; g.fillRect(x, y + TH - 34, TW, 34);
        g.restore();
        txt(g, tl.lab, x + TW / 2, y + TH - 17, 16, '#fff', { stroke: false, maxW: TW - 12 });
        g.save(); g.strokeStyle = on ? C.hi : OUT; g.lineWidth = on ? 7 : 5; if (on) { g.shadowColor = C.hi; g.shadowBlur = 20; } g.stroke(p); g.restore();
      });
    },
  };
}
