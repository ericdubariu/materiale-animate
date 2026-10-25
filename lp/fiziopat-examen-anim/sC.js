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
    phase: (i) => ['celula Reed-Sternberg', 'clasificarea OMS', 'simptomele B'][i] || '',
    draw(g, t, b) {
      bgFill(g); const s = stage(b, 3);
      // 1 · câmpul cu celula RS
      cellPanel(g, 60, 70, 410, 470, 'Definiție', b.i === 0);
      field(g, 265, 320, 190, () => { g.fillStyle = '#fbe6ef'; g.fillRect(60, 120, 420, 420); BG.forEach(([x, y, k2], j) => (k2 === 'eo' ? eosinophil(g, x, y + 20, 0.7, t) : lymphocyte(g, x, y + 20, 0.62, t))); rsCell(g, 265, 320, 1.05, t); });
      const tg = b.i === 0 ? ease(b.bt / 2) : b.i < 0 || b.i > 0 ? 1 : 0;
      fade(g, tg, () => pill(g, 'CD15+, CD30+ (LH clasic)', 265, 530, '#e8305a', 19));
      txt(g, '„ochi de bufniță”', 265, 160, 22, '#ffe36e');
      txt(g, 'limfocit B → celulă malignă', 265, 585, 22, '#d9c8f0');
      // 2 · clasificarea
      cellPanel(g, 510, 70, 440, 470, 'Clasificare', b.i === 1);
      const c = b.i === 1 ? clamp(b.bt / 4.5) * 6 : b.i < 0 || b.i > 1 ? 6 : 0.0;
      const N = (k, f) => fade(g, clamp(c - k), f);
      N(0, () => node(g, 'Limfoame', 730, 150, 220, 52, '#4a3a6e', false, 24));
      N(1, () => { arr(g, 690, 178, 610, 225, 1, '#fff', 5); arr(g, 770, 178, 850, 225, 1, '#fff', 5); node(g, 'Hodgkin (RS)', 615, 255, 190, 50, PURPLE, b.i === 1, 22); node(g, 'non-Hodgkin', 850, 255, 170, 50, '#4a3a6e', false, 22); txt(g, 'fără RS', 850, 310, 18, '#c9b3ff'); });
      N(2, () => { arr(g, 590, 282, 590, 330, 1, '#fff', 5); node(g, 'clasic', 590, 355, 140, 44, '#5c3ab0', false, 22); });
      N(3, () => { ['★ scleroză nodulară', 'celularitate mixtă', 'bogat în limfocite', 'depleție limfocitară'].forEach((s2, k) => txt(g, s2, 540, 410 + k * 30, 19, k === 0 ? '#ffe36e' : '#f3ecf6', 'left', 700)); });
      N(4, () => { arr(g, 680, 282, 790, 340, 1, '#fff', 5); node(g, 'nodular cu\npredominanță\nlimfocitară', 845, 395, 180, 96, '#5c3ab0', false, 19); });
      // 3 · simptomele B
      cellPanel(g, 510, 575, 440, 300, 'Simptome B', b.i === 2);
      const q = b.i === 2 ? clamp(b.bt / 4) * 3 : b.i < 0 ? 3 : 0;
      fade(g, 0.35 + 0.65 * clamp(q), () => { thermometer(g, 590, 820, 150, 0.45 + 0.4 * clamp(q) + 0.04 * Math.sin(t * 3)); txt(g, '> 38°C', 590, 652, 21, '#ff8a8a'); });
      fade(g, 0.35 + 0.65 * clamp(q - 1), () => { g.save(); g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(730, 700, 40, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#3a2a5c'; g.beginPath(); g.arc(748, 690, 36, 0, 7); g.fill(); g.restore(); for (let k = 0; k < 3; k++) { const yy = 755 + ((t * 30 + k * 18) % 50); g.save(); g.fillStyle = '#7fe8ff'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.moveTo(705 + k * 22, yy - 14); g.quadraticCurveTo(715 + k * 22, yy, 705 + k * 22, yy + 4); g.quadraticCurveTo(695 + k * 22, yy, 705 + k * 22, yy - 14); g.fill(); g.stroke(); g.restore(); } txt(g, 'transpirații', 730, 845, 19, '#7fe8ff'); txt(g, 'nocturne', 730, 868, 19, '#7fe8ff'); });
      fade(g, 0.35 + 0.65 * clamp(q - 2), () => { g.save(); g.fillStyle = '#4a3a6e'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(825, 700, 110, 90, 14); g.fill(); g.stroke(); g.restore(); txt(g, '−10%', 880, 760, 28, '#ffe36e'); arr(g, 880, 640, 880, 690, 1, '#ff8a8a', 6); txt(g, 'în 6 luni', 880, 830, 19, '#f3ecf6'); });
      ring(g, b, 0, 265, 320, 205); ring(g, b, 1, 730, 300, 240, 245); ring(g, b, 2, 730, 725, 240, 160);
    },
  };
}

/* ================================================================ Î 17 · mecanismul Hodgkin */
export function q17({ spec }) {
  const P = [[175, 200], [480, 200], [810, 230], [820, 560], [500, 560], [740, 800]];
  return {
    home: HOME, cams: P.map(([x, y], k) => cam(x, y, k === 2 ? 1.6 : 1.75)), anchors: [[55, 80], [610, 95], [690, 110], [690, 625], [285, 520], [555, 700]],
    phase: (i) => ['limfocit B mutat', 'scapă de apoptoză', 'microambientul', 'sindrom inflamator', 'liza → pirogeni', 'termostat ↑'][i] || '',
    draw(g, t, b) {
      bgFill(g); const s = stage(b, 6);
      // săgețile de legătură
      // RS → microambient → sindrom inflamator; separat: RS → liză/secreție → pirogeni → PGE₂
      [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5]].forEach(([a, c]) => { const p = clamp(s - c); if (p > 0) { const [x0, y0] = P[a], [x1, y1] = P[c]; const dx = x1 - x0, dy = y1 - y0, d = Math.hypot(dx, dy); const e = c === 4 ? 165 : 115; arr(g, x0 + dx / d * 150, y0 + dy / d * 150, x1 - dx / d * e, y1 - dy / d * e, ease(p), 'rgba(255,255,255,.85)', 6); } });
      // 1 · limfocitul B din centrul germinativ, cu mutații
      fade(g, 1, () => {
        g.save(); g.fillStyle = 'rgba(255,214,232,.18)'; g.strokeStyle = 'rgba(255,214,232,.5)'; g.lineWidth = 3; g.setLineDash([10, 8]); g.beginPath(); g.arc(P[0][0], P[0][1], 105, 0, 7); g.fill(); g.stroke(); g.restore();
        const morph = clamp(s - 1.4); if (morph < 1) fade(g, 1 - morph, () => lymphocyte(g, P[0][0], P[0][1], 1.7, t));
        txt(g, '⚡', P[0][0] + 55, P[0][1] - 45, 40, '#ffe36e'); txt(g, 'limfocit B', P[0][0], P[0][1] + 92, 22, '#f3ecf6'); txt(g, 'centru germinativ', P[0][0], P[0][1] - 112, 20, '#ffd6e8');
      });
      // 2 · scutul NF-κB oprește apoptoza → celula RS
      fade(g, vis(s, 1) + (b.i === 0 ? 0.25 : 0), () => {
        const [x, y] = P[1]; const grow = clamp(s - 1.5);
        g.save(); g.strokeStyle = '#7fe8ff'; g.lineWidth = 8; g.shadowColor = '#7fe8ff'; g.shadowBlur = 16; g.beginPath(); for (let k = 0; k <= 6; k++) { const a = k / 6 * 6.283 + t * 0.4; const xx = x + Math.cos(a) * 112, yy = y + Math.sin(a) * 112; k ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); g.restore();
        for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; const a = -2.4 + k * 0.6; const d = 220 - 100 * Math.min(1, u * 1.8); const bounce = u > 0.55 ? (u - 0.55) * 160 : 0; g.save(); g.globalAlpha = 1 - u; arrow(g, x + Math.cos(a) * (d + 40 + bounce), y + Math.sin(a) * (d + 40 + bounce), x + Math.cos(a) * (d + bounce), y + Math.sin(a) * (d + bounce), '#ff6b7a', 5); g.restore(); }
        if (grow < 1) fade(g, 1 - grow, () => lymphocyte(g, x, y, 1.7, t)); fade(g, grow, () => rsCell(g, x, y, 0.95, t));
        pill(g, 'NF-κB permanent', x, y - 140, '#2b8fb3', 20); pill(g, '± EBV', x + 120, y + 105, '#5c3ab0', 18); txt(g, 'apoptoză ✗', x - 150, y - 100, 20, '#ff8a8a'); txt(g, 'Reed-Sternberg', x, y + 140, 22, '#ffe36e');
      });
      // 3 · citokine → microambient reactiv + fibroză + imunosupresie
      fade(g, vis(s, 2), () => {
        const [x, y] = P[2];
        g.save(); g.strokeStyle = '#f5b9cf'; g.lineWidth = 9; g.lineCap = 'round'; for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(x - 150, y - 120 + k * 80); g.bezierCurveTo(x - 50, y - 150 + k * 80, x + 60, y - 90 + k * 80, x + 150, y - 125 + k * 80); g.stroke(); } g.restore();
        const ins = b.i === 2 ? ease(b.bt / 3.5) : 1;
        [[-110, -70, 'ly'], [110, -80, 'ly'], [-120, 70, 'eo'], [115, 75, 'ly'], [0, -115, 'eo'], [0, 112, 'hi']].forEach(([dx, dy, k2], j) => { const f = 1.6 - 0.6 * ins; const xx = x + dx * f, yy = y + dy * f; if (k2 === 'ly') lymphocyte(g, xx, yy, 0.75, t); else if (k2 === 'eo') eosinophil(g, xx, yy, 0.8, t); else macrophage(g, xx, yy, 0.45, t, { inc: 2, seed: 4 }); });
        rsCell(g, x, y, 0.7, t);
        cytokines(g, x, y, x + 140, y - 140, 5, t, ['#9dff8a', '#7fe8ff']);
        pill(g, 'TGF-β, IL-10 → imunosupresie', x, y + 175, '#2b6f5a', 18); txt(g, 'fibroză', x + 150, y - 140, 20, '#ffd6e8');
      });
      // 4 · eșuarea self / non-self → sindrom inflamator
      fade(g, vis(s, 3), () => {
        const [x, y] = P[3]; const f = 1 + 0.08 * Math.sin(t * 5);
        g.save(); g.translate(x, y + 10); g.scale(f * 0.8, f * 0.8); const p = new Path2D(); p.moveTo(0, -130); p.bezierCurveTo(80, -60, 100, 10, 65, 70); p.bezierCurveTo(40, 110, -40, 110, -65, 70); p.bezierCurveTo(-100, 10, -50, -40, 0, -130); paint(g, p, '#ff8a3d', '#e2541f', '#ffd27a', [-100, -130, 200, 240], OUT, 8); g.restore();
        txt(g, 'self / non-self ✗', x, y - 110, 22, '#ffe36e'); txt(g, 'sindrom inflamator', x, y + 120, 22, '#f3ecf6');
      });
      // 5 · liza celulelor maligne → pirogeni endogeni
      fade(g, vis(s, 4), () => {
        const [x, y] = P[4]; const burst = b.i === 4 ? ease(b.bt / 2.5) : 1;
        fade(g, 1 - 0.6 * burst, () => rsCell(g, x, y, 0.75, t));
        for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283; const d = 60 + 45 * burst; g.save(); g.fillStyle = '#f4c6da'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, 10, 0, 7); g.fill(); g.stroke(); g.restore(); }
        cytokines(g, x + 40, y + 60, P[5][0] - 60, P[5][1] - 40, 6, t, ['#ff6b7a', '#ffe36e', '#7fe8ff'], 0.3, 18, ['IL-1', 'IL-6', 'TNF-α']);
        txt(g, 'liza / secreția celulelor maligne', x, y - 120, 21, '#f3ecf6');
      });
      // 6 · PGE₂ în OVLT → pragul termoreglator ↑ → simptome B
      fade(g, vis(s, 5), () => {
        const [x, y] = P[5]; const up = b.i === 5 ? ease(b.bt / 3) : b.i < 0 ? 1 : 0.2;
        dial(g, x - 60, y + 30, 90, 0.35 + 0.5 * up, 'termostat');
        thermometer(g, x + 120, y + 60, 150, 0.4 + 0.45 * up);
        pill(g, 'PGE₂ (OVLT)', x - 60, y - 100, '#c2558c', 20); txt(g, 'simptome B', x + 120, y + 120, 22, '#ffe36e');
      });
      P.forEach(([x, y], k) => ring(g, b, k, x, y, 150));
    },
  };
}

/* ================================================================ Î 18 · febra în angina streptococică */
export function q18({ spec }) {
  const P = [[210, 210], [500, 210], [810, 230], [790, 560], [600, 790]];
  return {
    home: HOME, cams: [cam(220, 220, 1.8), cam(500, 220, 1.8), cam(800, 250, 1.7), cam(790, 560, 1.7), cam(640, 770, 1.6)], anchors: [[95, 85], [360, 130], [690, 105], [600, 470], [485, 665]],
    phase: (i) => ['streptococul', 'perete → opsonizare', 'macrofagul', 'PGE₂ în OVLT', 'termostat resetat ↑'][i] || '',
    draw(g, t, b) {
      bgFill(g); const s = stage(b, 5);
      [[0, 1], [1, 2], [2, 3], [3, 4]].forEach(([a, c]) => { const p = clamp(s - c); if (p > 0) { const [x0, y0] = P[a], [x1, y1] = P[c]; const dx = x1 - x0, dy = y1 - y0, d = Math.hypot(dx, dy); arr(g, x0 + dx / d * 115, y0 + dy / d * 115, x1 - dx / d * 120, y1 - dy / d * 120, ease(p), 'rgba(255,255,255,.85)', 6); } });
      // 1 · streptococ β-hemolitic grup A, Gram +, coci în lanț
      { const [x, y] = P[0]; g.save(); g.fillStyle = '#c0222f'; g.beginPath(); g.arc(x, y, 112, 0, 7); g.fill(); g.fillStyle = 'rgba(255,240,220,.65)'; g.beginPath(); g.arc(x, y, 92, 0, 7); g.fill(); g.restore(); cocci(g, x - 75, y - 40, 6, 0.5, t, 1); cocci(g, x - 60, y + 40, 5, -0.2, t, 1); txt(g, 'β-hemoliză', x, y + 140, 20, '#ffd6e8'); txt(g, 'grup A · Gram +', x, y - 128, 21, '#c9b3ff'); }
      // 2 · peretele: LPZ, acid lipoteicoic → opsonizare cu complement
      fade(g, 0.25 + 0.75 * vis(s, 1), () => {
        const [x, y] = P[1]; paint(g, blob(x, y, 70, 66, 0, t, 0.03, 14, 3), '#5b3cc4', '#3f26a0', '#9c86f0', bb(x, y, 70, 66), OUT, 6);
        g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 4; for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283; g.beginPath(); g.moveTo(x + Math.cos(a) * 70, y + Math.sin(a) * 66); g.lineTo(x + Math.cos(a) * 92, y + Math.sin(a) * 88); g.stroke(); } g.restore();
        const op = b.i === 1 ? ease(b.bt / 3) : vis(s, 1) >= 1 ? 1 : 0; for (let k = 0; k < 10; k++) { const a = k / 10 * 6.283 + 0.3; const d = lerp(170, 100, op); g.save(); g.fillStyle = '#9dff8a'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, 9, 0, 7); g.fill(); g.stroke(); g.restore(); }
        txt(g, 'acid lipoteicoic · peptidoglican', x + 15, y - 125, 20, '#ffe36e'); txt(g, 'C3b: opsonizare', x, y + 135, 20, '#9dff8a');
      });
      // 3 · macrofagul fagocitează → pirogeni endogeni
      fade(g, 0.25 + 0.75 * vis(s, 2), () => {
        const [x, y] = P[2]; macrophage(g, x - 10, y, 1.15, t, { inc: 0, seed: 3, pseudo: [x - 120, y, 0.6] });
        const eat = b.i === 2 ? ease(b.bt / 2.5) : vis(s, 2) >= 1 ? 1 : 0; cocci(g, lerp(x - 160, x + 20, eat), y + 10, 3, 0, t, 0.7);
        cytokines(g, x + 40, y - 30, x + 120, y - 160, 6, t, ['#ff6b7a', '#ffe36e', '#7fe8ff'], 0.35, 16, ['IL-1', 'TNF-α', 'IL-6']);
        txt(g, 'macrofag', x - 10, y + 125, 22, '#f3ecf6');
      });
      // 4 · PGE₂ în aria preoptică / OVLT (fără BHE)
      fade(g, 0.25 + 0.75 * vis(s, 3), () => {
        const [x, y] = P[3]; paint(g, blob(x, y, 150, 105, 0, t, 0.04, 16, 2), '#f2b8cf', '#e098b8', '#ffe0ec', bb(x, y, 150, 105), OUT, 7);
        g.save(); g.setLineDash([12, 9]); g.strokeStyle = '#7fe8ff'; g.lineWidth = 4; g.beginPath(); g.arc(x - 55, y + 20, 42, 0, 7); g.stroke(); g.restore();
        cytokines(g, x - 120, y - 120, x - 55, y + 20, 5, t, ['#ff6b7a', '#ffe36e']);
        txt(g, 'OVLT', x - 55, y + 28, 22, '#ffffff', 'center', 800);
        const pg = b.i === 3 ? ease(b.bt / 3) : vis(s, 3) >= 1 ? 1 : 0; for (let k = 0; k < 5; k++) { const u = (t * 0.4 + k / 5) % 1; g.save(); g.globalAlpha = pg; g.fillStyle = '#c2558c'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(lerp(x - 40, x + 80, u), lerp(y + 15, y - 30, u), 8, 0, 7); g.fill(); g.stroke(); g.restore(); }
        pill(g, 'COX → PGE₂', x + 70, y + 60, '#c2558c', 19); txt(g, 'fără barieră hematoencefalică', x + 40, y - 125, 19, '#7fe8ff');
      });
      // 5 · termostat resetat ↑ → frison, vasoconstricție → febră
      fade(g, 0.25 + 0.75 * vis(s, 4), () => {
        const [x, y] = P[4]; const up = b.i === 4 ? ease(b.bt / 3) : b.i < 0 ? 1 : 0.2;
        dial(g, x - 40, y - 10, 95, 0.35 + 0.5 * up, 'set-point ↑');
        thermometer(g, x + 170, y + 50, 160, 0.4 + 0.45 * up);
        const sh = Math.sin(t * 40) * 4 * up; txt(g, 'frison', x - 40 + sh, y + 95, 22, '#7fe8ff'); txt(g, 'vasoconstricție', x - 40, y + 125, 20, '#c9b3ff');
      });
      P.forEach(([x, y], k) => ring(g, b, k, x, y, 145));
    },
  };
}

/* ================================================================ Î 19 · angina streptococică pas cu pas */
export function q19({ spec }) {
  const T = [460, 380]; // amigdala
  return {
    home: HOME, cams: [cam(330, 260, 1.7), cam(470, 300, 1.8), cam(500, 420, 1.6), cam(470, 400, 1.35), cam(790, 270, 1.6), cam(720, 770, 1.6)],
    anchors: [[250, 165], [450, 160], [610, 470], [290, 360], [690, 80], [520, 660]],
    phase: (i) => ['aderare', 'evită fagocitoza', 'invazie + toxine', 'inflamație locală', 'răspuns sistemic', 'complicații'][i] || '',
    draw(g, t, b) {
      bgFill(g); const s = stage(b, 6);
      const infl = clamp(s - 3); // inflamația înroșește și umflă
      // amigdala (epiteliul în partea de sus)
      const sw = 1 + 0.12 * infl; const tons = blob(T[0], T[1], 250 * sw, 180 * sw, 0, t, 0.06, 18, 4);
      paint(g, tons, infl > 0 ? `rgb(${Math.round(lerp(240, 230, infl))},${Math.round(lerp(160, 80, infl))},${Math.round(lerp(185, 95, infl))})` : '#f0a0b9', '#d97f9c', '#ffd2e0', bb(T[0], T[1], 250, 180), OUT, 8);
      g.save(); g.clip(tons); g.strokeStyle = 'rgba(255,255,255,.4)'; g.lineWidth = 3; for (let k = 0; k < 4; k++) { g.beginPath(); g.ellipse(T[0] - 60 + k * 50, T[1] + 30, 30, 70, 0.3, 0, 7); g.stroke(); } g.restore();
      txt(g, 'amigdala', T[0] + 40, T[1] + 210 * sw, 22, '#ffd6e8');
      // 1 · picături → aderare prin proteina M
      { const u = b.i === 0 ? ease(b.bt / 3) : 1; for (let k = 0; k < 4; k++) { const x = lerp(40 + k * 30, 260 + k * 45, u), y = lerp(60 + k * 25, 225 + (k % 2) * 8, u); g.save(); g.fillStyle = 'rgba(127,232,255,.35)'; g.strokeStyle = 'rgba(127,232,255,.8)'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 26, 0, 7); g.fill(); g.stroke(); g.restore(); cocci(g, x - 12, y, 2, 0, t, 0.6); }
        g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 3; for (let k = 0; k < 4; k++) { const x = 255 + k * 45, y = 240; for (let j = 0; j < 3; j++) { g.beginPath(); g.moveTo(x - 6 + j * 6, y + 6); g.lineTo(x - 6 + j * 6, y + 18); g.stroke(); } } g.restore();
        txt(g, 'picături', 90, 40, 22, '#7fe8ff'); txt(g, 'proteina M', 330, 300, 20, '#ffe36e'); }
      // 2 · capsula de acid hialuronic respinge fagocitul
      fade(g, vis(s, 1) + 0.15, () => { const cx = 520, cy = 200; cocci(g, cx, cy, 3, 0.2, t, 1, '#5b3cc4', 1); const u = (t * 0.5) % 1; const d = 130 - 70 * Math.sin(u * Math.PI); neutrophil(g, cx + 30 + d * 0.9, cy - d * 0.5, 1.2, t); txt(g, 'capsulă: acid hialuronic', cx - 20, cy - 105, 20, '#cfe8ff'); txt(g, 'fagocitoză ✗', cx + 150, cy - 60, 20, '#ff8a8a'); });
      // 3 · invazie (enzime) + toxine
      fade(g, vis(s, 2) + 0.1, () => { const inv = b.i === 2 ? ease(b.bt / 3) : vis(s, 2) >= 1 ? 1 : 0; cocci(g, 560, lerp(300, 420, inv), 3, 1.3, t, 0.9);
        txt(g, '✂', 620, 360, 34, '#ffe36e'); pill(g, 'hialuronidază · streptokinază', 650, 520, '#5c3ab0', 17);
        for (let k = 0; k < 3; k++) { const x = 720 + k * 45, y = 420 + (k % 2) * 30; fade(g, 1 - 0.7 * inv * (k === 1 ? 1 : 0.4), () => rbc(g, x, y, 0.9, k, t)); }
        txt(g, 'streptolizine O, S', 770, 380, 18, '#ff8a8a'); txt(g, 'exotoxine pirogene', 770, 480, 18, '#ffb36b'); });
      // 4 · inflamație locală: edem, exsudat purulent, neutrofile
      fade(g, vis(s, 3), () => { srand(19); for (let k = 0; k < 7; k++) { const x = T[0] + rr(-170, 150), y = T[1] + rr(-60, 110); paint(g, blob(x, y, rr(16, 26), rr(12, 20), rr(0, 3), t, 0.15, 10, k), '#fff6d8', '#efe2a8', null, bb(x, y, 22, 16), OUT, 3); }
        neutrophil(g, T[0] - 90, T[1] + 40, 0.9, t); neutrophil(g, T[0] + 60, T[1] + 80, 0.9, t); neutrophil(g, T[0] - 10, T[1] - 20, 0.9, t);
        txt(g, 'exsudat purulent', T[0] - 40, T[1] + 125, 21, '#fff6d8'); txt(g, 'edem · hiperemie', T[0] - 40, T[1] + 158, 20, '#ffd6e8'); });
      // 5 · răspuns sistemic: citokine → febră, leucocitoză, CRP ↑
      fade(g, vis(s, 4), () => { cytokines(g, T[0] + 200, T[1] - 120, 760, 220, 6, t, ['#ff6b7a', '#ffe36e', '#7fe8ff'], 0.3, 14);
        pill(g, 'IL-1 · TNF-α · IL-6', 820, 330, '#5c3ab0', 17);
        thermometer(g, 780, 260, 150, 0.5 + 0.35 * clamp(s - 4)); pill(g, 'febră', 715, 250, '#c0222f', 18);
        neutrophil(g, 880, 120, 0.8, t); neutrophil(g, 920, 160, 0.8, t); neutrophil(g, 870, 190, 0.8, t); txt(g, 'leucocitoză', 900, 240, 18, '#f3ecf6');
        pill(g, 'CRP ↑', 905, 280, '#a8463c', 18); });
      // 6 · complicații: abces; RAA (HS II); glomerulonefrită (HS III)
      fade(g, vis(s, 5), () => {
        paint(g, blob(530, 760, 70, 55, 0, t, 0.08, 12, 2), '#f6e08a', '#dcc25c', '#fff6c8', bb(530, 760, 70, 55), OUT, 6); txt(g, 'abces', 530, 850, 20, '#fff6d8'); txt(g, 'periamigdalian', 530, 875, 17, '#d9c8f0');
        heart(g, 710, 760, 0.9, t); txt(g, 'RAA', 710, 850, 21, '#ffe36e'); txt(g, 'HS tip II', 710, 875, 17, '#d9c8f0');
        kidney(g, 880, 760, 0.9, t); txt(g, 'glomerulonefrită', 880, 850, 19, '#ffe36e'); txt(g, 'HS tip III', 880, 875, 17, '#d9c8f0');
        arr(g, T[0] + 120, T[1] + 195, 560, 690, 1, 'rgba(255,255,255,.8)', 5);
      });
      ring(g, b, 0, 300, 225, 170, 90); ring(g, b, 1, 560, 190, 170, 110); ring(g, b, 2, 680, 430, 200, 130); ring(g, b, 3, T[0], T[1], 280, 210); ring(g, b, 4, 830, 210, 150, 160); ring(g, b, 5, 700, 790, 280, 120);
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
  if (bact) { srand(7); g.save(); g.fillStyle = '#9e0f2a'; for (let k = 0; k < 14; k++) { g.beginPath(); g.arc(x + rr(-120, 120), y + rr(-125, -95), 3.5, 0, 7); g.fill(); } g.restore(); }
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
        const r = b.i === 0 ? clamp(b.bt / 4) * 4 : 4; const rows = [['⚡ debut brusc · > 38,5°C', '#ff8a8a'], ['exsudat · fără tuse / rinoree', '#fff6d8'], ['neutrofilie · CRP ↑', '#ffe36e'], ['test rapid + → penicilină', '#9dff8a']];
        rows.forEach(([s2, c], k) => fade(g, clamp(r - k), () => txt(g, s2, 265, 430 + k * 36, 21, c, 'center', 700)));
      });
      fade(g, a1, () => {
        cellPanel(g, 510, 60, 450, 820, 'Virală', b.i === 1); g.save(); g.translate(735, 250); g.scale(0.8, 0.8); throat(g, 0, 0, t, false); g.restore();
        const r = b.i === 1 ? clamp(b.bt / 4) * 4 : 4; const rows = [['debut progresiv · febră moderată', '#ffb36b'], ['tuse · rinoree · conjunctivită', '#7fe8ff'], ['limfocitoză · test strep −', '#c9b3ff'], ['tratament simptomatic', '#f3ecf6']];
        rows.forEach(([s2, c], k) => fade(g, clamp(r - k), () => txt(g, s2, 735, 430 + k * 36, 21, c, 'center', 700)));
        // tuse: nori care ies
        for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; g.save(); g.globalAlpha = 1 - u; g.fillStyle = '#cfe8ff'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(735 + 60 + u * 150, 740 - u * 30 + k * 10, 18 + u * 14, 0, 7); g.fill(); g.stroke(); g.restore(); }
        txt(g, 'adenovirus · EBV · Coxsackie', 735, 860, 19, '#d9c8f0');
      });
      txt(g, 'copii 5–15 ani · adenopatie dureroasă', 265, 590, 17, '#d9c8f0');
      ring(g, b, 0, 265, 360, 235, 310); ring(g, b, 1, 735, 470, 235, 420);
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
        txt(g, 'stopează / limitează agentul', x, y - 165, 21, '#7fe8ff'); txt(g, 'apărare nespecifică', x, y + 80, 22, '#ffe36e');
        const rep = b.i === 0 ? clamp((b.bt - 2.5) / 2.5) : 1; fade(g, rep, () => { txt(g, '🩹', x, y + 18, 30, '#fff'); txt(g, '→ reparare tisulară', x, y + 120, 21, '#9dff8a'); }); }
      // 2 · cauze exogene
      fade(g, 0.3 + 0.7 * vis(s, 1), () => {
        cellPanel(g, 60, 360, 420, 255, 'Exogene', b.i === 1);
        cocci(g, 110, 470, 4, 0.2, t, 0.8); txt(g, 'biologice', 155, 500, 19, '#f3ecf6');
        g.save(); g.fillStyle = '#ffd36e'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(380, 465, 30, 0, 7); g.fill(); g.stroke(); for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283 + t * 0.5; g.beginPath(); g.moveTo(380 + Math.cos(a) * 38, 465 + Math.sin(a) * 38); g.lineTo(380 + Math.cos(a) * 52, 465 + Math.sin(a) * 52); g.stroke(); } g.restore(); txt(g, 'fizice', 380, 510, 19, '#f3ecf6');
        g.save(); g.fillStyle = '#e6f6ff'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(140, 530); g.lineTo(140, 555); g.lineTo(110, 595); g.lineTo(190, 595); g.lineTo(160, 555); g.lineTo(160, 530); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#9dff8a'; g.beginPath(); g.moveTo(118, 583); g.lineTo(182, 583); g.lineTo(190, 595); g.lineTo(110, 595); g.fill(); g.restore(); txt(g, 'chimice', 230, 580, 19, '#f3ecf6');
        srand(21); g.save(); g.fillStyle = '#f3ecf6'; g.strokeStyle = OUT; g.lineWidth = 2.5; for (let k = 0; k < 6; k++) { g.beginPath(); g.arc(360 + rr(-25, 25), 555 + rr(-12, 12), rr(5, 8), 0, 7); g.fill(); g.stroke(); } g.restore(); txt(g, 'corpi străini', 395, 595, 18, '#f3ecf6');
      });
      // 3 · cauze endogene
      fade(g, 0.3 + 0.7 * vis(s, 2), () => {
        cellPanel(g, 520, 360, 430, 520, 'Endogene', b.i === 2);
        heart(g, 625, 490, 0.9, t, '#c94a5e'); g.save(); g.fillStyle = '#4a2028'; g.beginPath(); g.ellipse(645, 480, 16, 12, 0.4, 0, 7); g.fill(); g.restore(); txt(g, 'necroză (infarct)', 625, 560, 19, '#f3ecf6');
        lymphocyte(g, 800, 480, 0.8, t); g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 5; g.lineCap = 'round'; for (let k = 0; k < 3; k++) { const x = 840 + k * 18, y = 470 + k * 8; g.beginPath(); g.moveTo(x, y + 12); g.lineTo(x, y); g.lineTo(x - 7, y - 9); g.moveTo(x, y); g.lineTo(x + 7, y - 9); g.stroke(); } g.restore(); txt(g, 'autoimune / HS', 820, 560, 19, '#f3ecf6');
        g.save(); g.strokeStyle = '#fff6d8'; g.lineWidth = 5; g.lineCap = 'round'; srand(5); for (let k = 0; k < 9; k++) { const x = 600 + rr(-40, 40), y = 700 + rr(-30, 30), a = rr(0, 3); g.beginPath(); g.moveTo(x - Math.cos(a) * 25, y - Math.sin(a) * 25); g.lineTo(x + Math.cos(a) * 25, y + Math.sin(a) * 25); g.stroke(); } g.restore(); txt(g, 'cristale: urați, colesterol', 625, 790, 18, '#f3ecf6');
        paint(g, blob(820, 700, 60, 50, 0.4, t, 0.18, 14, 3), '#c9a3e6', '#a37fd0', null, bb(820, 700, 60, 50), OUT, 5); g.save(); g.fillStyle = '#2c2490'; g.beginPath(); g.ellipse(825, 695, 26, 22, 0, 0, 7); g.fill(); g.restore(); txt(g, 'celule tumorale', 820, 790, 19, '#f3ecf6');
      });
      ring(g, b, 0, 500, 220, 260, 150); ring(g, b, 1, 270, 488, 225, 140); ring(g, b, 2, 735, 620, 230, 275);
    },
  };
}

/* ================================================================ Î 22 · faza acută și complementul */
export function q22({ spec }) {
  return {
    home: HOME, cams: [cam(470, 230, 1.45), cam(330, 560, 1.45), cam(730, 650, 1.45)], anchors: [[110, 80], [60, 385], [560, 470]],
    phase: (i) => ['reacția de fază acută', 'cele 3 căi → C3', 'rolurile complementului'][i] || '',
    draw(g, t, b) {
      bgFill(g); const s = stage(b, 3);
      // 1 · citokine → febră, leucocitoză, ficat (proteine de fază acută)
      { macrophage(g, 150, 210, 0.95, t, { inc: 3, seed: 5 }); txt(g, 'macrofag', 150, 315, 20, '#f3ecf6');
        cytokines(g, 220, 180, 430, 120, 5, t, ['#ff6b7a', '#ffe36e', '#7fe8ff'], 0.35, 12, ['IL-1', 'IL-6', 'TNF-α']);
        cytokines(g, 220, 230, 680, 230, 5, t, ['#ff6b7a', '#ffe36e', '#7fe8ff'], 0.3, 12);
        thermometer(g, 470, 210, 130, 0.5 + 0.3 * (b.i === 0 ? ease(b.bt / 3) : 1)); txt(g, 'febră', 470, 270, 19, '#ff8a8a');
        neutrophil(g, 470, 330, 0.7, t); neutrophil(g, 510, 345, 0.7, t); txt(g, 'leucocitoză', 490, 395, 18, '#f3ecf6');
        liver(g, 780, 215, 0.95, t); const pr = ['CRP', 'fibrinogen', 'amiloid A', 'haptoglobină']; const pp = b.i === 0 ? clamp(b.bt / 4) * 4 : 4;
        pr.forEach((p, k) => fade(g, clamp(pp - k), () => pill(g, p, 790 + (k % 2 ? 80 : -70), 300 + Math.floor(k / 2) * 46, '#a8463c', 17)));
        txt(g, 'ficatul', 780, 140, 21, '#ffd6e8'); }
      // 2 · cele 3 căi → C3
      fade(g, 0.3 + 0.7 * vis(s, 1), () => {
        const C3 = [380, 560]; const lanes = [['clasică (Ag–Ac)', 110, 440], ['a lectinei', 110, 560], ['alternativă', 110, 680]];
        const f = b.i === 1 ? ease(b.bt / 3) : vis(s, 1) >= 1 ? 1 : 0;
        lanes.forEach(([nm, x, y], k) => { node(g, nm, x + 55, y, 205, 46, '#4a3a6e', false, 17); arr(g, x + 160, y, C3[0] - 55, C3[1] + (y - C3[1]) * 0.25, f, '#9dff8a', 5); });
        g.save(); g.fillStyle = '#9dff8a'; g.strokeStyle = OUT; g.lineWidth = 6; g.shadowColor = '#9dff8a'; g.shadowBlur = 20 * f; g.beginPath(); g.arc(C3[0], C3[1], 48, 0, 7); g.fill(); g.stroke(); g.restore(); txt(g, 'C3', C3[0], C3[1] + 12, 32, '#ffffff');
        txt(g, 'activare în cascadă', 280, 400, 20, '#9dff8a');
      });
      // 3 · rolurile: anafilatoxic, chemotactism, opsonizare, liză
      fade(g, 0.3 + 0.7 * vis(s, 2), () => {
        const on = b.i === 2 ? b.bt : 9;
        cellPanel(g, 470, 450, 500, 450, null, b.i === 2);
        // C3a, C5a → mastocit degranulat
        mastCell(g, 560, 545, 0.85, t, clamp(on / 2) * (0.5 + 0.5 * Math.sin(t * 2) ** 2)); txt(g, 'C3a, C5a', 650, 500, 18, '#ffe36e'); txt(g, 'anafilatoxic', 560, 625, 18, '#f3ecf6');
        // C5a → chemotactism
        { const u = (t * 0.3) % 1; neutrophil(g, lerp(920, 790, u), 560, 0.8, t); arr(g, 900, 610, 790, 610, 1, '#7fe8ff', 4); txt(g, 'C5a → chemotactism', 850, 650, 18, '#7fe8ff'); }
        // C3b → opsonizare
        { cocci(g, 545, 760, 1, 0, t, 1.4); for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283; g.save(); g.fillStyle = '#9dff8a'; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.arc(545 + Math.cos(a) * 32, 760 + Math.sin(a) * 32, 7, 0, 7); g.fill(); g.stroke(); g.restore(); } txt(g, 'C3b → opsonizare', 560, 835, 18, '#9dff8a'); }
        // C5b–C9 → por în membrană → liză
        { const x = 820, y = 770; g.save(); g.fillStyle = '#e8b4cc'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.rect(700, y - 18, 240, 36); g.fill(); g.stroke(); g.restore();
          const op = clamp((on - 1.5) / 2); g.save(); g.fillStyle = '#ffb36b'; g.strokeStyle = OUT; g.lineWidth = 4; for (const d of [-1, 1]) { g.beginPath(); g.roundRect(x + d * (14 + 8 * op) - 8, y - 40, 16, 80, 6); g.fill(); g.stroke(); } g.restore();
          for (let k = 0; k < 4; k++) { const u = ((t * 0.5 + k / 4) % 1) * op; g.save(); g.globalAlpha = op; g.fillStyle = '#7fe8ff'; g.beginPath(); g.arc(x, y - 30 + u * 70, 5, 0, 7); g.fill(); g.restore(); }
          txt(g, 'C5b–C9 → por → liză', x, y + 75, 18, '#ffb36b'); }
      });
      ring(g, b, 0, 520, 240, 450, 200); ring(g, b, 1, 260, 560, 230, 175); ring(g, b, 2, 720, 675, 255, 230);
    },
  };
}
