// Scenele „Înțelege” pentru întrebările 16–22: limfomul Hodgkin, angina streptococică, inflamația.
import { W, H, cam as cam0, HOME, lbl, bgFill, u01, stage, ring, txt, pill, node, field, thermometer, PURPLE, OUT, clamp, ease, glowRing, paint, blob, bb, arrow, REDUCED } from './fz.js';
import { lerp, srand, rr, rnd, lymphocyte, macrophage, rbc, HE, spindle } from './kit2d.js';

/* ================================================================ ajutoare */
const cam = (x, y, z) => cam0(x, y, 1 + (z - 1) * 0.45); // zoom moderat: păstrează contextul vizibil
const vis = (s, k) => clamp(s - k); // vizibilitatea pasului k (0..1) din stadiul cumulativ s
function fade(g, a, fn) { if (a <= 0) return; g.save(); g.globalAlpha = Math.min(1, a); fn(); g.restore(); }
function arr(g, x0, y0, x1, y1, p = 1, col = '#ffffff', w = 7) { if (p <= 0) return; arrow(g, x0, y0, lerp(x0, x1, p), lerp(y0, y1, p), col, w); }
// coci Gram-pozitivi în lanț (violet)
function cocci(g, x, y, n, ang, t, s = 1, col = '#5b3cc4', capsule = 0) {
  for (let k = 0; k < n; k++) {
    const cx = x + Math.cos(ang) * k * 30 * s + Math.sin(t * 2 + k) * 1.5, cy = y + Math.sin(ang) * k * 30 * s + Math.cos(t * 2 + k) * 1.5;
    if (capsule > 0) { g.save(); g.globalAlpha = 0.45 * capsule; g.fillStyle = '#cfe8ff'; g.beginPath(); g.arc(cx, cy, 24 * s, 0, 7); g.fill(); g.restore(); }
    paint(g, blob(cx, cy, 15 * s, 14 * s, 0, t, 0.02, 10, k), col, '#3f26a0', '#9c86f0', bb(cx, cy, 15 * s, 14 * s), OUT, 3.5 * s);
  }
}
function neutrophil(g, x, y, s = 1, t = 0) {
  paint(g, blob(x, y, 30 * s, 28 * s, 0, t, 0.05, 12, x), '#f6cfe0', '#e9aecb', '#fff', bb(x, y, 30 * s, 28 * s), OUT, 4 * s);
  g.save(); g.fillStyle = '#3b1f8c'; [[-10, -6], [2, -11], [11, 3], [-2, 9]].forEach(([dx, dy]) => { g.beginPath(); g.arc(x + dx * s, y + dy * s, 7 * s, 0, 7); g.fill(); }); g.restore();
}
function eosinophil(g, x, y, s = 1, t = 0) {
  paint(g, blob(x, y, 30 * s, 28 * s, 0, t, 0.05, 12, y), '#ff9db4', '#f07a98', '#ffd0dc', bb(x, y, 30 * s, 28 * s), OUT, 4 * s);
  srand(Math.round(x + y)); g.save(); g.fillStyle = '#e8304f'; for (let k = 0; k < 14; k++) { g.beginPath(); g.arc(x + rr(-18, 18) * s, y + rr(-16, 16) * s, 3.2 * s, 0, 7); g.fill(); } g.restore();
  g.save(); g.fillStyle = '#3b1f8c'; g.beginPath(); g.arc(x - 9 * s, y, 8 * s, 0, 7); g.arc(x + 9 * s, y, 8 * s, 0, 7); g.fill(); g.restore();
}
// celula Reed-Sternberg: mare, nucleu bilobat „în oglindă”, nucleoli eozinofili mari („ochi de bufniță”)
function rsCell(g, x, y, s = 1, t = 0) {
  paint(g, blob(x, y, 92 * s, 80 * s, 0.2, t, 0.07, 16, 5), '#f4c6da', '#e6a6c4', '#fff0f6', bb(x, y, 92 * s, 80 * s), OUT, 6 * s);
  for (const d of [-1, 1]) {
    const nx = x + d * 34 * s;
    paint(g, blob(nx, y - 2 * s, 34 * s, 46 * s, d * 0.15, t, 0.05, 14, d + 3), '#cbb9f2', '#ab95e6', '#efe8ff', bb(nx, y, 34 * s, 46 * s), '#4a2f9c', 4 * s);
    paint(g, blob(nx, y - 4 * s, 14 * s, 14 * s, 0, t, 0.02, 10, d + 7), '#e8305a', '#b5173d', '#ff98b0', bb(nx, y, 14 * s, 14 * s), OUT, 3 * s);
  }
}
function cytokines(g, x0, y0, x1, y1, n, t, cols, speed = 0.35, spread = 26, tags) {
  for (let k = 0; k < n; k++) {
    const u = ((k / n) + (REDUCED ? 0 : t * speed)) % 1; const x = lerp(x0, x1, u) + Math.sin(k * 2.3 + u * 6) * spread, y = lerp(y0, y1, u) + Math.cos(k * 1.7 + u * 6) * spread;
    const c = cols[k % cols.length]; g.save(); g.fillStyle = c; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 9, 0, 7); g.fill(); g.stroke(); g.restore();
    if (tags && k % 2 === 0 && k / 2 < tags.length) txt(g, tags[k / 2], x, y - 16, 18, '#fff');
  }
}
// termostatul hipotalamic: cadran cu acul care urcă (f 0..1)
function dial(g, x, y, r, f, lab = 'set-point') {
  g.save(); g.fillStyle = '#3a2a5c'; g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.arc(x, y, r, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
  const segs = [['#7fe8ff', 0, 0.45], ['#ffe36e', 0.45, 0.7], ['#ff6b7a', 0.7, 1]];
  segs.forEach(([c, a, b2]) => { g.strokeStyle = c; g.lineWidth = r * 0.16; g.beginPath(); g.arc(x, y, r * 0.78, Math.PI + a * Math.PI, Math.PI + b2 * Math.PI); g.stroke(); });
  const an = Math.PI + clamp(f) * Math.PI; g.strokeStyle = OUT; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(an) * r * 0.82, y + Math.sin(an) * r * 0.82); g.stroke(); g.strokeStyle = '#fff'; g.lineWidth = 6; g.stroke();
  g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(x, y, 12, 0, 7); g.fill(); g.stroke(); g.restore();
  txt(g, lab, x, y + 38, 22, '#c9b3ff');
}
function heart(g, x, y, s, t, col = '#e8485e') {
  const b2 = 1 + 0.05 * Math.sin(t * 6); g.save(); g.translate(x, y); g.scale(s * b2, s * b2);
  const p = new Path2D(); p.moveTo(0, 30); p.bezierCurveTo(-70, -20, -45, -75, 0, -40); p.bezierCurveTo(45, -75, 70, -20, 0, 30);
  paint(g, p, col, '#b02338', '#ff9aa8', [-60, -70, 120, 100], OUT, 6 / s); g.restore();
}
function kidney(g, x, y, s, t, col = '#c4505e') {
  g.save(); g.translate(x, y); g.scale(s, s); const p = new Path2D(); p.moveTo(-10, -55); p.bezierCurveTo(50, -70, 70, 50, 0, 58); p.bezierCurveTo(-40, 60, -45, 25, -18, 10); p.bezierCurveTo(-8, 2, -8, -6, -18, -14); p.bezierCurveTo(-45, -30, -40, -52, -10, -55);
  paint(g, p, col, '#9b3240', '#e7909a', [-45, -60, 110, 120], OUT, 6 / s); g.restore();
}
function liver(g, x, y, s, t) {
  g.save(); g.translate(x, y); g.scale(s, s); const p = new Path2D(); p.moveTo(-120, -20); p.bezierCurveTo(-90, -70, 60, -80, 120, -40); p.bezierCurveTo(110, 0, 40, 50, -40, 55); p.bezierCurveTo(-100, 55, -130, 20, -120, -20);
  paint(g, p, '#a8463c', '#7f2f28', '#d4786c', [-130, -80, 250, 135], OUT, 7 / s); g.restore();
}
function mastCell(g, x, y, s, t, burst = 0) {
  paint(g, blob(x, y, 52 * s, 46 * s, 0.3, t, 0.08, 14, 9), '#d9c8f4', '#bba5ea', '#f3edff', bb(x, y, 52 * s, 46 * s), OUT, 5 * s);
  g.save(); g.fillStyle = '#3b1f8c'; g.beginPath(); g.ellipse(x - 8 * s, y, 15 * s, 13 * s, 0, 0, 7); g.fill(); g.restore();
  srand(77); g.save(); g.fillStyle = '#7a3fc4'; for (let k = 0; k < 18; k++) { const a = rnd() * 6.28, d = rr(18, 40) * s; const out = burst * rr(30, 90) * s; g.beginPath(); g.arc(x + Math.cos(a) * (d + out), y + Math.sin(a) * (d + out) * 0.9, 5 * s, 0, 7); g.fill(); } g.restore();
}
function cellPanel(g, x, y, w, h, title, on) { g.save(); g.fillStyle = 'rgba(255,255,255,.05)'; g.strokeStyle = on ? '#ffe36e' : 'rgba(255,255,255,.18)'; g.lineWidth = on ? 4 : 2.5; g.beginPath(); g.roundRect(x, y, w, h, 22); g.fill(); g.stroke(); g.restore(); if (title) txt(g, title, x + w / 2, y + 36, 26, on ? '#ffe36e' : '#d9c8f0'); }

/* ================================================================ Î 16 · limfomul Hodgkin */
export function q16({ spec }) {
  // fundalul reactiv al câmpului
  srand(16); const BG = []; for (let k = 0; k < 34; k++) { const a = rnd() * 6.28, d = rr(115, 200); BG.push([260 + Math.cos(a) * d, 300 + Math.sin(a) * d * 0.95, k % 6 === 0 ? 'eo' : 'ly']); }
  return {
    home: HOME, cams: [cam(270, 300, 1.55), cam(720, 300, 1.55), cam(700, 735, 1.65)], anchors: [[95, 95], [545, 95], [545, 620]],
    phase: (i) => ['definiție', 'clasificare', 'simptomele B'][i] || '',
    draw(g, t, b) {
      bgFill(g); const s = stage(b, 3);
      // 1 · câmpul cu celula RS
      cellPanel(g, 60, 70, 410, 470, 'Definiție', b.i === 0);
      field(g, 265, 320, 190, () => { g.fillStyle = '#fbe6ef'; g.fillRect(60, 120, 420, 420); BG.forEach(([x, y, k2], j) => (k2 === 'eo' ? eosinophil(g, x, y + 20, 0.7, t) : lymphocyte(g, x, y + 20, 0.62, t))); rsCell(g, 265, 320, 1.05, t); });
      const tg = b.i === 0 ? ease(b.bt / 2) : b.i < 0 || b.i > 0 ? 1 : 0;
      fade(g, tg, () => pill(g, 'fond inflamator reactiv', 265, 530, '#e8305a', 19));
      txt(g, 'celula Hodgkin / Reed–Sternberg', 265, 160, 20, '#ffe36e');
      txt(g, 'neoplazie limfoidă malignă, origine B', 265, 585, 19, '#d9c8f0');
      // 2 · clasificarea
      cellPanel(g, 510, 70, 440, 470, 'Clasificare', b.i === 1);
      const c = b.i === 1 ? clamp(b.bt / 4.5) * 6 : b.i < 0 || b.i > 1 ? 6 : 0.0;
      const N = (k, f) => fade(g, clamp(c - k), f);
      N(0, () => node(g, 'Limfom Hodgkin', 730, 150, 260, 52, PURPLE, b.i === 1, 24));
      N(1, () => { arr(g, 690, 178, 615, 230, 1, '#fff', 5); node(g, 'LH clasic', 615, 255, 170, 48, '#5c3ab0', false, 22); });
      N(2, () => { ['scleroză nodulară', 'celularitate mixtă', 'bogat în limfocite', 'sărac în limfocite'].forEach((s2, k) => txt(g, s2, 540, 320 + k * 32, 19, '#f3ecf6', 'left', 700)); });
      N(3, () => { arr(g, 770, 178, 845, 300, 1, '#fff', 5); node(g, 'LH nodular cu\npredominanță\nlimfocitară', 845, 370, 190, 96, '#5c3ab0', false, 19); });
      // 3 · simptomele B
      cellPanel(g, 510, 575, 440, 300, 'Simptome B', b.i === 2);
      const q = b.i === 2 ? clamp(b.bt / 4) * 3 : b.i < 0 ? 3 : 0;
      fade(g, 0.35 + 0.65 * clamp(q), () => { thermometer(g, 590, 820, 150, 0.45 + 0.4 * clamp(q) + 0.04 * Math.sin(t * 3)); txt(g, '> 38°C', 590, 652, 21, '#ff8a8a'); });
      fade(g, 0.35 + 0.65 * clamp(q - 1), () => { g.save(); g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(730, 700, 40, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#3a2a5c'; g.beginPath(); g.arc(748, 690, 36, 0, 7); g.fill(); g.restore(); for (let k = 0; k < 3; k++) { const yy = 755 + ((t * 30 + k * 18) % 50); g.save(); g.fillStyle = '#7fe8ff'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.moveTo(705 + k * 22, yy - 14); g.quadraticCurveTo(715 + k * 22, yy, 705 + k * 22, yy + 4); g.quadraticCurveTo(695 + k * 22, yy, 705 + k * 22, yy - 14); g.fill(); g.stroke(); g.restore(); } txt(g, 'transpirații', 730, 845, 19, '#7fe8ff'); txt(g, 'nocturne', 730, 868, 19, '#7fe8ff'); });
      fade(g, 0.35 + 0.65 * clamp(q - 2), () => { g.save(); g.fillStyle = '#4a3a6e'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(825, 700, 110, 90, 14); g.fill(); g.stroke(); g.restore(); txt(g, '> 10%', 880, 760, 28, '#ffe36e'); arr(g, 880, 640, 880, 690, 1, '#ff8a8a', 6); txt(g, 'în 6 luni', 880, 830, 19, '#f3ecf6'); });
      ring(g, b, 0, 265, 320, 205); ring(g, b, 1, 730, 300, 240, 245); ring(g, b, 2, 730, 725, 240, 160);
    },
  };
}

/* ================================================================ Î 17 · mecanismul Hodgkin */
export function q17({ spec }) {
  // lanțul din LP: RS → citokine/chemokine → celule inflamatorii → IL-1, IL-6, TNF-α → PGE₂ hipotalamic → set-point ↑ → febră
  const P = [[175, 200], [480, 200], [810, 230], [820, 560], [500, 560], [740, 800]];
  return {
    home: HOME, cams: P.map(([x, y], k) => cam(x, y, k === 2 ? 1.6 : 1.75)), anchors: [[55, 80], [610, 95], [690, 110], [690, 625], [370, 455], [555, 700]],
    phase: (i) => ['celulele Hodgkin / RS', 'citokine și chemokine', 'micromediul tumoral', 'citokine pirogene', 'PGE₂ hipotalamic', 'set-point ↑ → febră'][i] || '',
    draw(g, t, b) {
      bgFill(g); const s = stage(b, 6);
      for (let c = 1; c < 6; c++) { const p = clamp(s - c); if (p > 0) { const [x0, y0] = P[c - 1], [x1, y1] = P[c]; const dx = x1 - x0, dy = y1 - y0, d = Math.hypot(dx, dy); arr(g, x0 + dx / d * 140, y0 + dy / d * 140, x1 - dx / d * 130, y1 - dy / d * 130, ease(p), 'rgba(255,255,255,.85)', 6); } }
      // 1 · celulele tumorale Hodgkin / Reed–Sternberg
      fade(g, 1, () => { const [x, y] = P[0];
        g.save(); g.fillStyle = 'rgba(255,214,232,.18)'; g.strokeStyle = 'rgba(255,214,232,.5)'; g.lineWidth = 3; g.setLineDash([10, 8]); g.beginPath(); g.arc(x, y, 105, 0, 7); g.fill(); g.stroke(); g.restore();
        rsCell(g, x, y, 0.95, t); txt(g, 'celule Hodgkin / RS', x, y + 140, 21, '#ffe36e'); });
      // 2 · secreție de citokine și chemokine
      fade(g, 0.25 + 0.75 * vis(s, 1), () => { const [x, y] = P[1]; rsCell(g, x, y, 0.75, t);
        for (let k = 0; k < 4; k++) { const a = -0.8 + k * 0.6; cytokines(g, x + Math.cos(a) * 60, y + Math.sin(a) * 60, x + Math.cos(a) * 140, y + Math.sin(a) * 140, 3, t + k, ['#9dff8a', '#7fe8ff']); }
        txt(g, 'citokine + chemokine', x, y + 140, 21, '#9dff8a'); });
      // 3 · recrutarea celulelor inflamatorii în micromediul tumoral
      fade(g, vis(s, 2), () => { const [x, y] = P[2]; const ins = b.i === 2 ? ease(b.bt / 3.5) : 1;
        [[-110, -70, 'ly'], [110, -80, 'ly'], [-120, 70, 'eo'], [115, 75, 'ly'], [0, -115, 'eo'], [0, 112, 'hi']].forEach(([dx, dy, k2]) => { const f = 1.6 - 0.6 * ins; const xx = x + dx * f, yy = y + dy * f; if (k2 === 'ly') lymphocyte(g, xx, yy, 0.75, t); else if (k2 === 'eo') eosinophil(g, xx, yy, 0.8, t); else macrophage(g, xx, yy, 0.45, t, { inc: 2, seed: 4 }); });
        rsCell(g, x, y, 0.7, t); txt(g, 'LT · macrofage · eozinofile', x, y + 180, 20, '#f3ecf6'); txt(g, 'micromediul tumoral', x, y - 150, 20, '#ffd6e8'); });
      // 4 · eliberarea de citokine pirogene IL-1, IL-6, TNF-α
      fade(g, vis(s, 3), () => { const [x, y] = P[3]; macrophage(g, x, y, 0.9, t, { inc: 2, seed: 7 });
        cytokines(g, x - 60, y + 20, P[4][0] + 80, P[4][1] + 10, 6, t, ['#ff6b7a', '#ffe36e', '#7fe8ff'], 0.3, 18, ['IL-1', 'IL-6', 'TNF-α']);
        txt(g, 'citokine pirogene', x, y + 120, 22, '#ffe36e'); });
      // 5 · sinteză crescută de PGE₂ la nivel hipotalamic
      fade(g, vis(s, 4), () => { const [x, y] = P[4]; paint(g, blob(x, y, 120, 85, 0, t, 0.04, 16, 2), '#f2b8cf', '#e098b8', '#ffe0ec', bb(x, y, 120, 85), OUT, 7);
        g.save(); g.fillStyle = '#ffd36e'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.ellipse(x, y + 30, 36, 22, 0, 0, 7); g.fill(); g.stroke(); g.restore();
        const pg = b.i === 4 ? ease(b.bt / 3) : vis(s, 4) >= 1 ? 1 : 0; for (let k = 0; k < 5; k++) { const u = (t * 0.4 + k / 5) % 1; g.save(); g.globalAlpha = pg; g.fillStyle = '#c2558c'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(lerp(x - 30, x + 60, u), lerp(y + 25, y - 40, u), 8, 0, 7); g.fill(); g.stroke(); g.restore(); }
        pill(g, 'PGE₂ hipotalamic', x, y - 115, '#c2558c', 20); });
      // 6 · set-point ↑ → vasoconstricție + frison + termogeneză → febră
      fade(g, vis(s, 5), () => { const [x, y] = P[5]; const up = b.i === 5 ? ease(b.bt / 3) : b.i < 0 ? 1 : 0.2;
        dial(g, x - 60, y + 30, 90, 0.35 + 0.5 * up, 'set-point');
        thermometer(g, x + 120, y + 60, 150, 0.4 + 0.45 * up);
        txt(g, 'frison · vasoconstricție', x - 60, y - 95, 19, '#7fe8ff'); txt(g, 'febră', x + 120, y + 120, 24, '#ffe36e'); });
      P.forEach(([x, y], k) => ring(g, b, k, x, y, 150));
    },
  };
}

/* ================================================================ Î 18 · febra în angina streptococică */
export function q18({ spec }) {
  const P = [[210, 210], [500, 210], [810, 230], [790, 560], [600, 790]];
  return {
    home: HOME, cams: [cam(220, 220, 1.8), cam(500, 220, 1.8), cam(800, 250, 1.7), cam(790, 560, 1.7), cam(640, 770, 1.6)], anchors: [[95, 85], [360, 130], [690, 105], [600, 470], [485, 665]],
    phase: (i) => ['Streptococcus pyogenes', 'exotoxine → opsonizare', 'macrofagul', 'hipotalamusul', 'termogeneză → febră'][i] || '',
    draw(g, t, b) {
      bgFill(g); const s = stage(b, 5);
      [[0, 1], [1, 2], [2, 3], [3, 4]].forEach(([a, c]) => { const p = clamp(s - c); if (p > 0) { const [x0, y0] = P[a], [x1, y1] = P[c]; const dx = x1 - x0, dy = y1 - y0, d = Math.hypot(dx, dy); arr(g, x0 + dx / d * 115, y0 + dy / d * 115, x1 - dx / d * 120, y1 - dy / d * 120, ease(p), 'rgba(255,255,255,.85)', 6); } });
      // 1 · streptococ β-hemolitic grup A, Gram +, coci în lanț
      { const [x, y] = P[0]; g.save(); g.fillStyle = '#c0222f'; g.beginPath(); g.arc(x, y, 112, 0, 7); g.fill(); g.fillStyle = 'rgba(255,240,220,.65)'; g.beginPath(); g.arc(x, y, 92, 0, 7); g.fill(); g.restore(); cocci(g, x - 75, y - 40, 6, 0.5, t, 1); cocci(g, x - 60, y + 40, 5, -0.2, t, 1); txt(g, 'β-hemoliză', x, y + 140, 20, '#ffd6e8'); txt(g, 'grup A (S. pyogenes)', x, y - 128, 21, '#c9b3ff'); }
      // 2 · exotoxinele (punctele galbene) → opsonizare cu complement
      fade(g, 0.25 + 0.75 * vis(s, 1), () => {
        const [x, y] = P[1]; paint(g, blob(x, y, 70, 66, 0, t, 0.03, 14, 3), '#5b3cc4', '#3f26a0', '#9c86f0', bb(x, y, 70, 66), OUT, 6);
        g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 4; for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283; g.beginPath(); g.moveTo(x + Math.cos(a) * 70, y + Math.sin(a) * 66); g.lineTo(x + Math.cos(a) * 92, y + Math.sin(a) * 88); g.stroke(); } g.restore();
        const op = b.i === 1 ? ease(b.bt / 3) : vis(s, 1) >= 1 ? 1 : 0; for (let k = 0; k < 10; k++) { const a = k / 10 * 6.283 + 0.3; const d = lerp(170, 100, op); g.save(); g.fillStyle = '#9dff8a'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, 9, 0, 7); g.fill(); g.stroke(); g.restore(); }
        txt(g, 'exotoxine', x + 15, y - 125, 22, '#ffe36e'); txt(g, 'opsonizare (complement)', x, y + 135, 20, '#9dff8a');
      });
      // 3 · macrofagul fagocitează → pirogeni endogeni
      fade(g, 0.25 + 0.75 * vis(s, 2), () => {
        const [x, y] = P[2]; macrophage(g, x - 10, y, 1.15, t, { inc: 0, seed: 3, pseudo: [x - 120, y, 0.6] });
        const eat = b.i === 2 ? ease(b.bt / 2.5) : vis(s, 2) >= 1 ? 1 : 0; cocci(g, lerp(x - 160, x + 20, eat), y + 10, 3, 0, t, 0.7);
        cytokines(g, x + 40, y - 30, x + 120, y - 160, 6, t, ['#ff6b7a', '#ffe36e', '#7fe8ff'], 0.35, 16, ['IL-1', 'IL-6', 'TNF']);
        txt(g, 'macrofag (cel. Kupffer)', x - 10, y + 125, 21, '#f3ecf6');
      });
      // 4 · hipotalamusul: aria preoptică / OVLT → PGE₂ → pragul termic ↑
      fade(g, 0.25 + 0.75 * vis(s, 3), () => {
        const [x, y] = P[3]; paint(g, blob(x, y, 150, 105, 0, t, 0.04, 16, 2), '#f2b8cf', '#e098b8', '#ffe0ec', bb(x, y, 150, 105), OUT, 7);
        g.save(); g.setLineDash([12, 9]); g.strokeStyle = '#7fe8ff'; g.lineWidth = 4; g.beginPath(); g.arc(x - 55, y + 20, 42, 0, 7); g.stroke(); g.restore();
        cytokines(g, x - 120, y - 120, x - 55, y + 20, 5, t, ['#ff6b7a', '#ffe36e']);
        txt(g, 'OVLT', x - 55, y + 28, 22, '#ffffff', 'center', 800);
        const pg = b.i === 3 ? ease(b.bt / 3) : vis(s, 3) >= 1 ? 1 : 0; for (let k = 0; k < 5; k++) { const u = (t * 0.4 + k / 5) % 1; g.save(); g.globalAlpha = pg; g.fillStyle = '#c2558c'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(lerp(x - 40, x + 80, u), lerp(y + 15, y - 30, u), 8, 0, 7); g.fill(); g.stroke(); g.restore(); }
        pill(g, 'PGE₂', x + 70, y + 60, '#c2558c', 19); txt(g, 'hipotalamus: aria preoptică', x + 20, y - 125, 19, '#7fe8ff');
      });
      // 5 · termostat resetat ↑ → frison, vasoconstricție → febră
      fade(g, 0.25 + 0.75 * vis(s, 4), () => {
        const [x, y] = P[4]; const up = b.i === 4 ? ease(b.bt / 3) : b.i < 0 ? 1 : 0.2;
        dial(g, x - 40, y - 10, 95, 0.35 + 0.5 * up, 'prag termic ↑');
        thermometer(g, x + 170, y + 50, 160, 0.4 + 0.45 * up);
        const sh = Math.sin(t * 40) * 4 * up; txt(g, 'frison', x - 40 + sh, y + 95, 22, '#7fe8ff'); txt(g, 'vasoconstricție · tahicardie', x - 10, y + 125, 19, '#c9b3ff');
      });
      P.forEach(([x, y], k) => ring(g, b, k, x, y, 145));
    },
  };
}

/* ================================================================ Î 19 · angina streptococică pas cu pas */
export function q19({ spec }) {
  // schema din LP („Faringita cu streptococ de grup A: mecanism fiziopatologic”): 4 coloane pornite din streptococ
  const CX = [130, 375, 625, 870], W2 = 232, TOP = [500, 105];
  const COL = [['#c8323f', '#5a1c24'], ['#d98a14', '#5a3a10'], ['#2f9a46', '#173f22'], ['#2a78c8', '#142f50']];
  const BOX = [
    ['Exotoxine pirogene\n(SpeA, SpeC, SSA)', 'superantigene', 'activare policlonală LT\nIL-1, IL-6, TNF-α, IFN-γ', 'vasodilatație,\ninflamație cutanată', 'ERUPȚIE\nSCARLATINIFORMĂ'],
    ['IL-1, IL-6\nși TNF-α', 'PGE₂ la nivel\nhipotalamic', 'pragul termic\nhipotalamic ↑', null, 'FEBRĂ'],
    ['Citokine și\nchemokine', 'recrutare de\nneutrofile', 'edem și exudat\nfaringian', null, 'ADENOPATIE CERVICALĂ\nANTERIOARĂ DUREROASĂ'],
    ['Streptolizina O', 'leagă colesterolul\nmembranelor', 'pori\nmembranari', null, 'CITOTOXICITATE,\nHEMOLIZĂ LOCALĂ'],
  ];
  const Y = [265, 385, 500, 615, 770], HH = [74, 62, 74, 64, 104];
  return {
    home: HOME, cams: [cam(500, 160, 1.5), cam(200, 500, 1.35), cam(400, 500, 1.35), cam(600, 500, 1.35), cam(800, 500, 1.35)],
    anchors: [[290, 65], [20, 225], [265, 225], [515, 225], [760, 225]],
    phase: (i) => ['streptococul de grup A', 'exotoxine → erupție', 'IL-1, IL-6, TNF-α → febră', 'chemokine → adenopatie', 'streptolizina O → hemoliză'][i] || '',
    draw(g, t, b) {
      bgFill(g); const s = stage(b, 5);
      // caseta streptococului
      g.save(); g.fillStyle = '#6a3fb8'; g.strokeStyle = b.i === 0 ? '#ffe36e' : OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(TOP[0] - 210, TOP[1] - 50, 420, 100, 22); g.fill(); g.stroke(); g.restore();
      cocci(g, TOP[0] - 175, TOP[1] + 20, 4, -0.6, t, 0.7, '#c9b3ff');
      txt(g, 'Streptococ de grup A', TOP[0] + 40, TOP[1] - 4, 25, '#fff'); txt(g, '(S. pyogenes)', TOP[0] + 40, TOP[1] + 28, 20, '#f3d6ee', 'center', 700);
      // ramificația
      g.save(); g.strokeStyle = '#1f3f8a'; g.lineWidth = 6; g.beginPath(); g.moveTo(TOP[0], TOP[1] + 50); g.lineTo(TOP[0], 190); g.moveTo(CX[0], 190); g.lineTo(CX[3], 190); g.stroke(); g.restore();
      CX.forEach((x, c) => {
        const vis1 = b.i < 0 ? 1 : clamp(s - (c + 1)); const act = b.i === c + 1; const dim = b.i < 0 || b.i === 0 || vis1 > 0 ? 1 : 0.25;
        arr(g, x, 190, x, Y[0] - HH[0] / 2 - 4, 1, '#1f3f8a', 5);
        const rows = BOX[c].map((tx, k) => [tx, k]).filter(([tx]) => tx);
        rows.forEach(([tx, k], j) => {
          const shown = j === 0 ? 1 : clamp(vis1 * (rows.length) - j + 0.6);
          const final = k === 4; const hdr = k === 0;
          g.save(); g.globalAlpha = Math.max(dim * (j === 0 ? 1 : 0.25), shown);
          const yk = Y[k]; const h = HH[k];
          g.fillStyle = final || hdr ? COL[c][0] : COL[c][1]; g.strokeStyle = act ? '#ffe36e' : OUT; g.lineWidth = act ? 5 : 4; g.beginPath(); g.roundRect(x - W2 / 2, yk - h / 2, W2, h, 16); g.fill(); g.stroke();
          const lines = tx.split('\n'); const fs = final ? (lines[0].length > 16 ? 15 : 19) : hdr ? 18 : 16;
          lines.forEach((l, i) => txt(g, l, x, yk + fs * 0.35 + (i - (lines.length - 1) / 2) * fs * 1.2, fs, '#fff', 'center', 800));
          g.restore();
          if (j > 0) { const prevK = rows[j - 1][1]; const y0 = Y[prevK] + HH[prevK] / 2 + 2, y1 = Y[k] - HH[k] / 2 - 4; arr(g, x, y0, x, y1, clamp(shown * 1.5), COL[c][0], 5); }
        });
        // bile care curg pe coloana activă
        if (act || b.i < 0) { const end = Y[4]; for (let k = 0; k < 4; k++) { const u = ((t * 0.35 + k / 4) % 1) * (b.i < 0 ? 1 : clamp(vis1 * 1.2)); const yy = lerp(Y[0], end - 60, u); g.save(); g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.arc(x + W2 / 2 - 14, yy, 6, 0, 7); g.fill(); g.stroke(); g.restore(); } }
      });
      ring(g, b, 0, TOP[0], TOP[1], 250, 80); CX.forEach((x, c) => ring(g, b, c + 1, x, 515, 135, 360));
    },
  };
}

/* ================================================================ Î 20 · bacteriană vs. virală */
function throat(g, x, y, t, bact) {
  g.save(); g.fillStyle = '#f2a3b8'; g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.ellipse(x, y, 190, 150, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#5a1222'; g.beginPath(); g.ellipse(x, y + 25, 95, 105, 0, 0, 7); g.fill(); // faringe
  g.fillStyle = bact ? '#e8485e' : '#e8687e'; g.beginPath(); g.ellipse(x, y + 120, 175, 50, 0, 0, Math.PI); g.fill(); // limba
  g.restore();
  // palatul moale + uvula
  paint(g, blob(x, y - 75, 22, 40, 0, t, 0.03, 10, 2), bact ? '#e04b67' : '#e0607a', null, null, bb(x, y - 75, 22, 40), OUT, 5);
  for (const d of [-1, 1]) { const tx = x + d * 95, ty = y + 15; paint(g, blob(tx, ty, 48, 62, d * 0.2, t, 0.08, 12, d + 4), bact ? '#d8304e' : '#e2687f', '#b81f3c', null, bb(tx, ty, 48, 62), OUT, 5);
    if (bact) { srand(d + 30); for (let k = 0; k < 5; k++) paint(g, blob(tx + rr(-25, 25), ty + rr(-35, 35), rr(8, 13), rr(6, 10), 0, t, 0.2, 8, k), '#fff6d8', null, null, bb(tx, ty, 10, 8), OUT, 2); } }
  }
export function q20({ spec }) {
  return {
    home: HOME, cams: [HOME, HOME], anchors: [[70, 95], [530, 95]],
    phase: (i) => ['angina bacteriană', 'angina virală'][i] || '',
    draw(g, t, b) {
      bgFill(g); txt(g, 'vs.', 500, 330, 40, '#ffe36e');
      const a0 = b.i === 1 ? 0.45 : 1, a1 = b.i === 0 ? 0.45 : 1;
      fade(g, a0, () => {
        cellPanel(g, 40, 60, 450, 600, 'Bacteriană (streptococ)', b.i === 0); g.save(); g.translate(265, 250); g.scale(0.8, 0.8); throat(g, 0, 0, t, true); g.restore();
        const r = b.i === 0 ? clamp(b.bt / 4) * 4 : 4; const rows = [['debut brusc (într-o zi)', '#ff8a8a'], ['rinoree mucoasă înaintea febrei', '#fff6d8'], ['adenopatie dureroasă · eritem intens', '#ffe36e'], ['complicații: afte, hepato-splenomegalie', '#9dff8a']];
        rows.forEach(([s2, c], k) => fade(g, clamp(r - k), () => txt(g, s2, 265, 430 + k * 36, 18, c, 'center', 700)));
      });
      fade(g, a1, () => {
        cellPanel(g, 510, 60, 450, 600, 'Virală', b.i === 1); g.save(); g.translate(735, 250); g.scale(0.8, 0.8); throat(g, 0, 0, t, false); g.restore();
        const r = b.i === 1 ? clamp(b.bt / 4) * 4 : 4; const rows = [['debut progresiv', '#ffb36b'], ['rinoree seroasă, simultan cu febra', '#7fe8ff'], ['adenopatie nedureroasă · eritem discret', '#c9b3ff'], ['complicații: otită, sinuzită', '#f3ecf6']];
        rows.forEach(([s2, c], k) => fade(g, clamp(r - k), () => txt(g, s2, 735, 430 + k * 36, 18, c, 'center', 700)));
      });
      ring(g, b, 0, 265, 360, 235, 310); ring(g, b, 1, 735, 360, 235, 310);
    },
  };
}

/* ================================================================ Î 21 · inflamația: definiție, scop, cauze */
export function q21({ spec }) {
  return {
    home: HOME, cams: [cam(500, 230, 1.6), cam(290, 520, 1.6), cam(540, 500, 1)], anchors: [[260, 80], [100, 390], [585, 390]],
    phase: (i) => ['definiție și scop', 'cauze exogene', 'cauze endogene'][i] || '',
    draw(g, t, b) {
      bgFill(g); const s = stage(b, 3);
      // 1 · țesutul lezat + scutul apărării + repararea
      { const x = 500, y = 230; for (let k = 0; k < 7; k++) { const cx = x - 180 + k * 60, dead = k === 3; paint(g, blob(cx, y + 10, 30, 36, 0, t, 0.05, 10, k), dead ? '#d9a3b6' : '#f2a3c6', '#df7dab', null, bb(cx, y, 30, 36), OUT, 4); if (!dead) { g.save(); g.fillStyle = HE.nuc; g.beginPath(); g.arc(cx, y + 10, 9, 0, 7); g.fill(); g.restore(); } }
        const sh = b.i === 0 ? ease(b.bt / 2) : 1; g.save(); g.globalAlpha = sh; g.strokeStyle = '#7fe8ff'; g.lineWidth = 10; g.shadowColor = '#7fe8ff'; g.shadowBlur = 18; g.beginPath(); g.arc(x, y + 10, 110, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); g.restore();
        const agent = b.i === 0 ? 1 - 0.45 * ease(b.bt / 3) : 0.55; cocci(g, x - 40, y - 150 + 40 * (1 - agent), 3, 0, t, 0.8);
        txt(g, 'limitează leziunile · elimină cauza', x, y - 165, 21, '#7fe8ff'); txt(g, 'reacție de apărare', x, y + 80, 22, '#ffe36e');
        const rep = b.i === 0 ? clamp((b.bt - 2.5) / 2.5) : 1; fade(g, rep, () => { txt(g, '🩹', x, y + 18, 30, '#fff'); txt(g, '→ repară leziunile', x, y + 120, 21, '#9dff8a'); }); }
      // 2 · cauze exogene
      fade(g, 0.3 + 0.7 * vis(s, 1), () => {
        cellPanel(g, 60, 360, 420, 255, 'Exogene', b.i === 1);
        cocci(g, 110, 470, 4, 0.2, t, 0.8); txt(g, 'microorganisme', 160, 510, 19, '#f3ecf6');
        srand(21); g.save(); g.fillStyle = '#f3ecf6'; g.strokeStyle = OUT; g.lineWidth = 2.5; for (let k = 0; k < 8; k++) { g.beginPath(); g.arc(360 + rr(-35, 35), 470 + rr(-16, 16), rr(5, 8), 0, 7); g.fill(); g.stroke(); } g.restore(); txt(g, 'corpi străini', 360, 520, 19, '#f3ecf6'); txt(g, 'polen · azbest · siliciu · pulberi', 270, 575, 17, '#d9c8f0', 'center', 700);
      });
      // 3 · cauze endogene
      fade(g, 0.3 + 0.7 * vis(s, 2), () => {
        cellPanel(g, 520, 360, 430, 520, 'Endogene', b.i === 2);
        for (let k = 0; k < 3; k++) paint(g, blob(590 + k * 36, 485, 18, 22, 0, t, 0.08, 10, k), k === 1 ? '#7a3a4a' : '#f2a3c6', '#df7dab', null, bb(590, 485, 18, 22), OUT, 3); txt(g, 'distrugere tisulară', 625, 545, 18, '#f3ecf6'); txt(g, '(mecanic, chimic, fizic)', 625, 568, 15, '#d9c8f0', 'center', 700);
        g.save(); g.fillStyle = '#ffd36e'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(820, 480, 28, 0, 7); g.fill(); g.stroke(); for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283 + t * 0.5; g.beginPath(); g.moveTo(820 + Math.cos(a) * 36, 480 + Math.sin(a) * 36); g.lineTo(820 + Math.cos(a) * 50, 480 + Math.sin(a) * 50); g.stroke(); } g.restore(); txt(g, 'T° ↑ · UV · raze X', 820, 555, 18, '#f3ecf6'); txt(g, 'radioactivitate', 820, 578, 15, '#d9c8f0', 'center', 700);
        g.save(); g.strokeStyle = '#fff6d8'; g.lineWidth = 5; g.lineCap = 'round'; srand(5); for (let k = 0; k < 9; k++) { const x = 600 + rr(-40, 40), y = 700 + rr(-30, 30), a = rr(0, 3); g.beginPath(); g.moveTo(x - Math.cos(a) * 25, y - Math.sin(a) * 25); g.lineTo(x + Math.cos(a) * 25, y + Math.sin(a) * 25); g.stroke(); } g.restore(); txt(g, 'cristale: acid uric, colesterol', 625, 790, 17, '#f3ecf6');
        paint(g, blob(820, 700, 60, 50, 0.4, t, 0.18, 14, 3), '#c9a3e6', '#a37fd0', null, bb(820, 700, 60, 50), OUT, 5); g.save(); g.fillStyle = '#2c2490'; g.beginPath(); g.ellipse(825, 695, 26, 22, 0, 0, 7); g.fill(); g.restore(); txt(g, 'celule tumorale', 820, 790, 19, '#f3ecf6');
      });
      ring(g, b, 0, 500, 220, 260, 150); ring(g, b, 1, 270, 488, 225, 140); ring(g, b, 2, 735, 620, 230, 275);
    },
  };
}

/* ================================================================ Î 22 · faza acută și complementul */
export function q22({ spec }) {
  return {
    home: HOME, cams: [cam(470, 230, 1.45), cam(250, 640, 1.45), cam(730, 650, 1.45)], anchors: [[110, 80], [60, 425], [560, 470]],
    phase: (i) => ['reacțiile de fază acută', 'mediatorii inflamației', 'sistemul complement'][i] || '',
    draw(g, t, b) {
      bgFill(g); const s = stage(b, 3);
      // 1 · pirogeni endogeni → febră; produși ai inflamației → leucocitoză; ficat → reactanți de fază acută
      { macrophage(g, 150, 210, 0.95, t, { inc: 3, seed: 5 }); txt(g, 'macrofag', 150, 315, 20, '#f3ecf6');
        cytokines(g, 220, 180, 430, 120, 5, t, ['#ff6b7a', '#ffe36e', '#7fe8ff'], 0.35, 12, ['IL-1', 'TNF-α']);
        cytokines(g, 220, 230, 680, 230, 5, t, ['#ff6b7a', '#ffe36e', '#7fe8ff'], 0.3, 12);
        thermometer(g, 470, 210, 130, 0.5 + 0.3 * (b.i === 0 ? ease(b.bt / 3) : 1)); txt(g, 'febră', 470, 270, 19, '#ff8a8a');
        neutrophil(g, 470, 330, 0.7, t); neutrophil(g, 510, 345, 0.7, t); txt(g, 'leucocitoză', 490, 395, 18, '#f3ecf6'); txt(g, '(devierea la stânga)', 490, 418, 15, '#d9c8f0', 'center', 700);
        liver(g, 780, 215, 0.95, t); const pr = ['CRP', 'fibrinogen']; const pp = b.i === 0 ? clamp(b.bt / 4) * 2 : 2;
        pr.forEach((p, k) => fade(g, clamp(pp - k), () => pill(g, p, 780 + (k ? 70 : -60), 300, '#a8463c', 17)));
        txt(g, 'reactanți de fază acută', 780, 350, 18, '#ffd6e8'); txt(g, 'ficatul', 780, 140, 21, '#ffd6e8'); }
      // 2 · mediatorii: Ag–Ac → mastocit → histamină; fosfolipaza A2 → prostaglandine, leucotriene, PAF → efecte
      fade(g, 0.3 + 0.7 * vis(s, 1), () => {
        const on = b.i === 1 ? b.bt : 9; cellPanel(g, 40, 440, 410, 450, null, b.i === 1);
        mastCell(g, 130, 540, 0.8, t, clamp(on / 2) * (0.5 + 0.5 * Math.sin(t * 2) ** 2)); txt(g, 'Ag–Ac → mastocit', 140, 625, 17, '#ffe36e');
        const f = ease(clamp((on - 0.5) / 2)); arr(g, 210, 540, 255, 540, f, '#fff', 4);
        fade(g, f, () => { node(g, 'histamină · IL-8', 340, 540, 165, 44, '#5c3ab0', false, 16); node(g, 'fosfolipaza A2', 245, 690, 190, 44, '#4a3a6e', false, 17); node(g, 'prostaglandine\nleucotriene · PAF', 245, 780, 220, 64, '#5c3ab0', false, 15); arr(g, 245, 714, 245, 744, 1, '#fff', 4); });
        const f2 = ease(clamp((on - 2.5) / 2)); fade(g, f2, () => { txt(g, 'vasodilatație', 380, 640, 16, '#ff8a8a'); txt(g, 'permeabilitate ↑', 380, 665, 16, '#7fe8ff'); txt(g, 'durere', 395, 760, 16, '#ffe36e'); });
      });
      // 3 · complementul: anafilaxine → chemotactism → macrofag activat; C3b + C5–C9 → complexul de atac membranar → liză; opsonizare
      fade(g, 0.3 + 0.7 * vis(s, 2), () => {
        const on = b.i === 2 ? b.bt : 9;
        cellPanel(g, 470, 450, 500, 450, null, b.i === 2);
        macrophage(g, 570, 560, 0.55, t, { inc: 1, seed: 8 });
        for (let k = 0; k < 3; k++) { const u = (t * 0.35 + k / 3) % 1; pill(g, ['C3a', 'C4a', 'C5a'][k], lerp(900, 650, u), 540 + k * 22, '#3a7a5a', 14); }
        txt(g, 'anafilaxine → chemotactism', 760, 640, 17, '#7fe8ff'); txt(g, 'macrofag activat', 570, 640, 16, '#f3ecf6', 'center', 700);
        { cocci(g, 545, 760, 1, 0, t, 1.4); for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283; g.save(); g.fillStyle = '#9dff8a'; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.arc(545 + Math.cos(a) * 32, 760 + Math.sin(a) * 32, 7, 0, 7); g.fill(); g.stroke(); g.restore(); } txt(g, 'opsonizare', 560, 835, 18, '#9dff8a'); }
        { const x = 820, y = 770; g.save(); g.fillStyle = '#e8b4cc'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.rect(700, y - 18, 240, 36); g.fill(); g.stroke(); g.restore();
          const op = clamp((on - 1.5) / 2); g.save(); g.fillStyle = '#ffb36b'; g.strokeStyle = OUT; g.lineWidth = 4; for (const d of [-1, 1]) { g.beginPath(); g.roundRect(x + d * (14 + 8 * op) - 8, y - 40, 16, 80, 6); g.fill(); g.stroke(); } g.restore();
          for (let k = 0; k < 4; k++) { const u = ((t * 0.5 + k / 4) % 1) * op; g.save(); g.globalAlpha = op; g.fillStyle = '#7fe8ff'; g.beginPath(); g.arc(x, y - 30 + u * 70, 5, 0, 7); g.fill(); g.restore(); }
          txt(g, 'C3b + C5–C9 → por → liză', x, y + 75, 17, '#ffb36b'); }
      });
      ring(g, b, 0, 520, 240, 450, 200); ring(g, b, 1, 245, 665, 220, 235); ring(g, b, 2, 720, 675, 255, 230);
    },
  };
}
