// Capitolul 2 · Febra: scenele „Înțelege” pentru întrebările 10–15.
import { lerp, rbc, macrophage, lymphocyte, antibody, srand, rr, spindle } from './kit2d.js';
import { W, H, cam, HOME, lbl, bgFill, u01, stage, ring, txt, pill, node, thermometer, PURPLE, OUT, clamp, ease, glowRing, paint, blob, bb, arrow, REDUCED } from './fz.js';

/* ---------------- unelte locale ---------------- */
const TMIN = 35, TMAX = 42;
const ang = (T) => Math.PI + Math.PI * clamp((T - TMIN) / (TMAX - TMIN));
// termostat cu cadran (35–42°C): acul galben = set-point, triunghiul roșu = temperatura reală
function dial(g, x, y, r, setT, curT, title, on = false) {
  g.save();
  g.fillStyle = '#3a2a5c'; g.strokeStyle = on ? '#ffe36e' : OUT; g.lineWidth = 8;
  g.beginPath(); g.arc(x, y, r + 18, Math.PI, 0); g.lineTo(x + r + 18, y + 40); g.lineTo(x - r - 18, y + 40); g.closePath(); g.fill(); g.stroke();
  // scala colorată
  for (let T = TMIN; T < TMAX; T += 0.25) { const a0 = ang(T), a1 = ang(T + 0.26); const f = (T - TMIN) / (TMAX - TMIN); g.strokeStyle = `hsl(${220 - 220 * f},80%,62%)`; g.lineWidth = 16; g.beginPath(); g.arc(x, y, r - 10, a0, a1); g.stroke(); }
  g.strokeStyle = OUT; g.lineWidth = 3; for (let T = TMIN; T <= TMAX; T++) { const a = ang(T); g.beginPath(); g.moveTo(x + Math.cos(a) * (r - 22), y + Math.sin(a) * (r - 22)); g.lineTo(x + Math.cos(a) * (r + 2), y + Math.sin(a) * (r + 2)); g.stroke(); }
  g.restore();
  [35, 37, 39, 42].forEach((T) => { const a = ang(T); txt(g, String(T), x + Math.cos(a) * (r - 48), y + Math.sin(a) * (r - 48) + 8, 20, '#d9c8e4', 'center', 700); });
  // temperatura reală
  const ac = ang(curT); g.save(); g.fillStyle = '#ff4d5e'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); const px = x + Math.cos(ac) * (r + 8), py = y + Math.sin(ac) * (r + 8);
  g.moveTo(px, py); g.lineTo(px + Math.cos(ac + 0.18) * 30, py + Math.sin(ac + 0.18) * 30); g.lineTo(px + Math.cos(ac - 0.18) * 30, py + Math.sin(ac - 0.18) * 30); g.closePath(); g.fill(); g.stroke(); g.restore();
  // acul set-point
  const as = ang(setT); g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 14; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(as) * (r - 30), y + Math.sin(as) * (r - 30)); g.stroke(); g.strokeStyle = '#ffe36e'; g.lineWidth = 7; g.stroke(); g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(x, y, 14, 0, 7); g.fill(); g.stroke(); g.restore();
  if (title) txt(g, title, x, y + 32, 22, '#fff', 'center', 800);
}
function rod(g, x, y, s, rot, t, col = '#ff8fb3', lps = false) {
  g.save(); g.translate(x, y); g.rotate(rot + (REDUCED ? 0 : Math.sin(t * 2 + x) * 0.05));
  const p = new Path2D(); p.roundRect(-46 * s, -20 * s, 92 * s, 40 * s, 20 * s);
  paint(g, p, col, null, '#ffd6e5', [-46 * s, -20 * s, 92 * s, 40 * s], OUT, 5 * s);
  if (lps) { g.strokeStyle = '#ffe36e'; g.lineWidth = 3 * s; for (let k = 0; k < 10; k++) { const a = k / 10 * 6.283; const ex = Math.cos(a) * 52 * s, ey = Math.sin(a) * 26 * s; g.beginPath(); g.moveTo(ex * 0.92, ey * 0.85); g.lineTo(ex * 1.12, ey * 1.25); g.stroke(); } }
  g.restore();
}
function coccus(g, x, y, s, t, n = 4, col = '#9fb3ff') { for (let k = 0; k < n; k++) paint(g, blob(x + k * 30 * s, y + Math.sin(k * 1.3 + t) * 4 * s, 15 * s, 15 * s, 0, t, 0.02, 10, k), col, null, '#e6ecff', bb(x, y, 15 * s, 15 * s), OUT, 4 * s); }
function virus(g, x, y, s, t) { g.save(); g.strokeStyle = OUT; g.lineWidth = 4 * s; for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283 + t * 0.3; g.beginPath(); g.moveTo(x + Math.cos(a) * 20 * s, y + Math.sin(a) * 20 * s); g.lineTo(x + Math.cos(a) * 32 * s, y + Math.sin(a) * 32 * s); g.stroke(); g.fillStyle = '#ff9f6b'; g.beginPath(); g.arc(x + Math.cos(a) * 33 * s, y + Math.sin(a) * 33 * s, 5 * s, 0, 7); g.fill(); g.stroke(); } g.restore(); paint(g, blob(x, y, 24 * s, 24 * s, 0, t, 0.03, 12, 3), '#ffb38a', null, '#ffe2cc', bb(x, y, 24 * s, 24 * s), OUT, 4 * s); }
function capsule(g, x, y, s, rot, c1 = '#ff6b7a', c2 = '#fff') { g.save(); g.translate(x, y); g.rotate(rot); const a = new Path2D(); a.roundRect(-40 * s, -17 * s, 40 * s, 34 * s, [17 * s, 0, 0, 17 * s]); const b = new Path2D(); b.roundRect(0, -17 * s, 40 * s, 34 * s, [0, 17 * s, 17 * s, 0]); paint(g, a, c1, null, '#ffd0d6', [-40 * s, -17 * s, 40 * s, 34 * s], OUT, 4 * s); paint(g, b, c2, null, null, [0, -17 * s, 40 * s, 34 * s], OUT, 4 * s); g.restore(); }
// particule (citokine) care curg pe o polilinie
function along(pts, u) { const L = []; let tot = 0; for (let k = 1; k < pts.length; k++) { const d = Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); L.push(d); tot += d; } let d = u * tot; for (let k = 0; k < L.length; k++) { if (d <= L[k]) { const f = d / L[k]; return [lerp(pts[k][0], pts[k + 1][0], f), lerp(pts[k][1], pts[k + 1][1], f)]; } d -= L[k]; } return pts[pts.length - 1]; }
function flow(g, pts, n, t, sp, cols, r = 11, prog = 1) {
  for (let k = 0; k < n; k++) { const u = ((k / n) + (REDUCED ? 0 : t * sp)) % 1; if (u > prog) continue; const [x, y] = along(pts, u); g.save(); g.fillStyle = cols[k % cols.length]; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke(); g.restore(); }
}
function pathLine(g, pts, col = 'rgba(201,179,255,.35)', w = 34) { g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = col; g.lineWidth = w; g.beginPath(); pts.forEach((p, k) => (k ? g.lineTo(...p) : g.moveTo(...p))); g.stroke(); g.restore(); }
function brain(g, x, y, s, t, hot = 0) {
  const p = new Path2D(); p.moveTo(x - 150 * s, y + 30 * s); p.bezierCurveTo(x - 170 * s, y - 80 * s, x - 70 * s, y - 130 * s, x, y - 110 * s); p.bezierCurveTo(x + 90 * s, y - 135 * s, x + 175 * s, y - 70 * s, x + 150 * s, y + 20 * s); p.bezierCurveTo(x + 140 * s, y + 70 * s, x + 60 * s, y + 80 * s, x + 10 * s, y + 60 * s); p.bezierCurveTo(x - 50 * s, y + 85 * s, x - 140 * s, y + 80 * s, x - 150 * s, y + 30 * s);
  paint(g, p, '#f2b6cf', '#e294b6', '#ffe6f0', [x - 160 * s, y - 130 * s, 320 * s, 210 * s], OUT, 7 * s);
  g.save(); g.clip(p); g.strokeStyle = 'rgba(160,60,110,.45)'; g.lineWidth = 4 * s; for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(x - 140 * s + k * 50 * s, y - 100 * s); g.bezierCurveTo(x - 110 * s + k * 50 * s, y - 50 * s, x - 150 * s + k * 50 * s, y, x - 120 * s + k * 50 * s, y + 50 * s); g.stroke(); } g.restore();
  // hipotalamusul / OVLT
  g.save(); g.fillStyle = hot ? `rgba(255,${Math.round(200 - 140 * hot)},80,1)` : '#ffd36e'; g.strokeStyle = OUT; g.lineWidth = 4 * s; g.beginPath(); g.ellipse(x + 10 * s, y + 40 * s, 34 * s, 22 * s, 0, 0, 7); g.fill(); g.stroke(); if (hot) { g.shadowColor = '#ff6b3d'; g.shadowBlur = 25 * hot; g.stroke(); } g.restore();
}
function heart(g, x, y, s, t, fast = 1) { const f = 1 + 0.08 * Math.max(0, Math.sin(t * 6 * fast)); g.save(); g.translate(x, y); g.scale(s * f, s * f); const p = new Path2D(); p.moveTo(0, 40); p.bezierCurveTo(-70, -5, -50, -60, 0, -30); p.bezierCurveTo(50, -60, 70, -5, 0, 40); paint(g, p, '#ff5a6e', '#d93a52', '#ffb3bd', [-60, -55, 120, 95], OUT, 5); g.restore(); }
function lungs(g, x, y, s, t, fast = 1) { const f = 1 + 0.07 * Math.sin(t * 5 * fast); [-1, 1].forEach((d) => paint(g, blob(x + d * 34 * s, y, 30 * s * f, 48 * s * f, d * 0.15, t, 0.06, 12, d + 3), '#f7a1b8', '#e07d99', '#ffd6e2', bb(x, y, 30 * s, 48 * s), OUT, 5 * s)); g.save(); g.strokeStyle = OUT; g.lineWidth = 6 * s; g.beginPath(); g.moveTo(x, y - 60 * s); g.lineTo(x, y - 25 * s); g.stroke(); g.restore(); }
function flame(g, x, y, s, t, col = '#ff8a3d') { const f = 1 + 0.08 * Math.sin(t * 7 + x); g.save(); g.translate(x, y); g.scale(s, s * f); const p = new Path2D(); p.moveTo(0, -60); p.bezierCurveTo(34, -25, 42, 10, 26, 32); p.bezierCurveTo(14, 48, -14, 48, -26, 32); p.bezierCurveTo(-42, 10, -20, -18, 0, -60); paint(g, p, col, '#e2541f', '#ffd27a', [-42, -60, 84, 108], OUT, 5); g.restore(); }
function neutrophil(g, x, y, s, t) { paint(g, blob(x, y, 30 * s, 28 * s, 0, t, 0.08, 12, x), '#f7d6e6', '#ebb6cf', '#fff', bb(x, y, 30 * s, 28 * s), OUT, 4 * s); g.save(); g.fillStyle = '#3b1f8c'; [[-10, -6], [3, -10], [10, 4], [-3, 8]].forEach(([dx, dy]) => { g.beginPath(); g.arc(x + dx * s, y + dy * s, 7 * s, 0, 7); g.fill(); }); g.restore(); }
function tcell(g, x, y, s, t) { lymphocyte(g, x, y, s, t); }
function liver(g, x, y, s, t) { const p = new Path2D(); p.moveTo(x - 90 * s, y - 20 * s); p.bezierCurveTo(x - 40 * s, y - 60 * s, x + 80 * s, y - 50 * s, x + 90 * s, y - 20 * s); p.bezierCurveTo(x + 70 * s, y + 10 * s, x + 10 * s, y + 40 * s, x - 70 * s, y + 30 * s); p.bezierCurveTo(x - 100 * s, y + 20 * s, x - 100 * s, y - 5 * s, x - 90 * s, y - 20 * s); paint(g, p, '#a8434f', '#86303c', '#cf7a84', [x - 100 * s, y - 60 * s, 190 * s, 100 * s], OUT, 5 * s); }
function sweat(g, x, y, s, t, n = 4) { for (let k = 0; k < n; k++) { const u = ((t * 0.6 + k / n) % 1); const xx = x + (k - n / 2) * 22 * s, yy = y + u * 50 * s; g.save(); g.globalAlpha = 1 - u; g.fillStyle = '#7fe8ff'; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.moveTo(xx, yy - 12 * s); g.quadraticCurveTo(xx + 9 * s, yy + 2 * s, xx, yy + 8 * s); g.quadraticCurveTo(xx - 9 * s, yy + 2 * s, xx, yy - 12 * s); g.fill(); g.stroke(); g.restore(); } }
function shiver(g, x, y, s, t) { g.save(); g.strokeStyle = '#7fe8ff'; g.lineWidth = 5 * s; g.lineCap = 'round'; [-1, 1].forEach((d) => { g.beginPath(); for (let k = 0; k < 5; k++) { const yy = y - 30 * s + k * 15 * s; const xx = x + d * (40 + 8 * Math.sin(t * 30 + k)) * s + (k % 2 ? 8 : -8) * s * d; k ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); }); g.restore(); }
function cross(g, x, y, r) { g.save(); g.strokeStyle = '#ff4d5e'; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(x - r, y - r); g.lineTo(x + r, y + r); g.moveTo(x + r, y - r); g.lineTo(x - r, y + r); g.stroke(); g.restore(); }
const CYT = ['#ffe36e', '#7fe8ff', '#9dff8a'];

/* =============================================================== Î 10 · FEBRĂ vs HIPERTERMIE */
export function q10({ spec }) {
  return {
    home: HOME, cams: [cam(240, 400, 1.1), cam(730, 400, 1.1)], anchors: [[90, 150], [590, 150]],
    labels: [],
    phase: (i) => ['set-point ↑', 'set-point nemodificat'][i] || '',
    draw(g, t, b) {
      bgFill(g);
      g.save(); g.strokeStyle = 'rgba(201,179,255,.25)'; g.lineWidth = 4; g.setLineDash([14, 12]); g.beginPath(); g.moveTo(500, 60); g.lineTo(500, 900); g.stroke(); g.restore();
      txt(g, 'FEBRĂ', 250, 90, 40, '#ffe36e'); txt(g, 'HIPERTERMIE', 750, 90, 40, '#7fe8ff');
      // ---- stânga: febra
      const fL = b.i === 0 ? clamp(b.bt / (b.bd * 0.95)) : 1; // 0..1 în beat
      const cyc = b.i === 0 ? fL : (t * 0.12) % 1;
      // pirogenii urcă set-point-ul (0→0.35), corpul se încălzește (0.2→0.7), antipireticul îl coboară (0.75→1)
      const setL = 37 + 2 * ease(clamp(cyc / 0.3)) - 2 * ease(clamp((cyc - 0.75) / 0.2));
      const curL = 37 + 2 * ease(clamp((cyc - 0.15) / 0.45)) - 2 * ease(clamp((cyc - 0.82) / 0.18));
      dial(g, 230, 290, 130, setL, curL, '', b.i === 0);
      txt(g, `set-point ${setL.toFixed(1)}°C`, 230, 380, 24, '#ffe36e', 'center', 800);
      thermometer(g, 430, 700, 230, (curL - 35) / 7);
      txt(g, `${curL.toFixed(1)}°C`, 430, 800, 24, '#ff8a95');
      if (cyc < 0.35) { [[170, 520], [230, 545], [290, 520]].forEach(([x, y], k) => { paint(g, blob(x, y - 50 * clamp(cyc / 0.3), 14, 14, 0, t, 0.05, 10, k), '#ffe36e', null, null, bb(x, y, 14, 14), OUT, 3); }); txt(g, 'pirogeni → set-point ↑', 250, 600, 22, '#ffe36e'); }
      // frisonul doar cât temperatura reală e sub noul set-point; apoi echilibru; după antipiretic set-point ↓ → vasodilatație + sudorație
      else if (cyc < 0.72) { if (curL < setL - 0.05) { shiver(g, 230, 500, 1, t); txt(g, 'frison, vasoconstricție', 250, 570, 22, '#7fe8ff'); } else txt(g, 'echilibru la nivel ↑', 250, 570, 22, '#9dff8a'); txt(g, 'feedback normal', 250, 602, 22, '#9dff8a'); }
      else { capsule(g, 230, 505, 1.3, -0.4); txt(g, 'antipiretic → ↓ PGE₂', 250, 590, 22, '#ff8a95'); if (curL > setL + 0.05) txt(g, 'vasodilatație, sudorație', 250, 624, 20, '#7fe8ff'); }
      // ---- dreapta: hipertermia
      const fR = b.i === 1 ? clamp(b.bt / (b.bd * 0.95)) : 1; const cycR = b.i === 1 ? fR : (t * 0.12 + 0.5) % 1;
      const curR = 37 + 3.5 * ease(clamp(cycR / 0.6)) - 3.5 * ease(clamp((cycR - 0.75) / 0.22));
      dial(g, 730, 290, 130, 37, curR, '', b.i === 1);
      txt(g, 'set-point 37°C (fix)', 730, 380, 24, '#ffe36e', 'center', 800);
      thermometer(g, 920, 700, 230, (curR - 35) / 7);
      txt(g, `${curR.toFixed(1)}°C`, 920, 800, 24, '#ff8a95');
      // soare + flăcări = căldura din mediu / efort
      g.save(); g.fillStyle = '#ffd36e'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(600, 500, 30, 0, 7); g.fill(); g.stroke(); for (let k = 0; k < 8; k++) { const a = k / 8 * 6.28 + t; g.beginPath(); g.moveTo(600 + Math.cos(a) * 40, 500 + Math.sin(a) * 40); g.lineTo(600 + Math.cos(a) * 56, 500 + Math.sin(a) * 56); g.stroke(); } g.restore();
      if (cycR < 0.72) { flame(g, 740, 510, 0.8, t); txt(g, 'căldură / efort > pierderi', 740, 575, 21, '#ffb38a'); txt(g, 'adaptare depășită', 740, 607, 22, '#ff8a95'); }
      else { g.save(); g.fillStyle = '#bfe9ff'; g.strokeStyle = OUT; g.lineWidth = 5; for (let k = 0; k < 3; k++) { g.beginPath(); g.roundRect(678 + k * 42, 488, 36, 36, 6); g.fill(); g.stroke(); } g.restore(); txt(g, 'răcire fizică', 740, 590, 22, '#7fe8ff'); }
      txt(g, 'antipireticele NU ajută', 740, 660, 21, '#d9c8e4', 'center', 700);
    },
  };
}

/* =============================================================== Î 11 · PATOGENIA FEBREI */
export function q11({ spec }) {
  const MAC = [220, 260], BR = [690, 230], DIAL = [880, 420];
  const vessel = [[300, 250], [420, 200], [540, 200], [640, 250]];
  const CX0 = 540, CX1 = 960, CY0 = 680, CY1 = 540; // curba febrei
  const curveY = (u) => { // u 0..1 pe axa timpului
    if (u < 0.15) return CY0 - 8 * Math.sin(u * 40); // prodrom
    if (u < 0.42) return lerp(CY0, CY1, ease((u - 0.15) / 0.27)); // creștere
    if (u < 0.72) return CY1 + 6 * Math.sin(u * 50); // stare
    return lerp(CY1, CY0, ease((u - 0.72) / 0.28)); // revenire
  };
  return {
    home: HOME, cams: [cam(260, 280, 1.5), cam(450, 270, 1.35), cam(640, 330, 1.4), cam(780, 380, 1.4), cam(660, 470, 1.08), cam(690, 470, 1.08)],
    anchors: [[90, 280], [360, 290], [560, 110], [960, 300], [650, 612], [912, 600]],
    labels: [],
    phase: (i) => ['pirogen exogen', 'pirogeni endogeni', 'OVLT → PGE₂', 'set-point ↑', 'prodrom → creștere', 'stare → revenire'][i] || '',
    draw(g, t, b) {
      bgFill(g); const st = stage(b, 6);
      // 1 · LPZ + macrofag
      const eat = b.i === 0 ? ease(b.bt / 4) : st >= 1 ? 1 : 0;
      macrophage(g, MAC[0], MAC[1], 1.15, t, { pseudo: [MAC[0] - 110, MAC[1] - 40, eat], inc: 3 });
      if (eat < 0.95) rod(g, lerp(MAC[0] - 140, MAC[0] + 10, eat), lerp(MAC[1] - 60, MAC[1] - 5, eat), 0.8 * (1 - 0.4 * eat), 0.4, t, '#ff8fb3', true);
      txt(g, 'LPZ (Gram −)', MAC[0] - 110, MAC[1] - 100, 22, '#ffe36e'); txt(g, 'macrofag', MAC[0] + 10, MAC[1] + 110, 20, '#ffb3d0', 'center', 700); if (st > 1) txt(g, 'IL-1 · TNF-α · IL-6', 470, 150, 21, '#ffe36e');
      // 2 · citokinele în sânge
      pathLine(g, vessel, 'rgba(255,90,110,.28)', 46);
      if (st > 1) flow(g, vessel, 9, t, 0.12, CYT, 11, clamp(st - 1) * 1.01);
      // 3 · creierul + OVLT
      brain(g, BR[0], BR[1], 0.95, t, clamp(st - 2.4));
      if (st > 2) { const f = clamp(st - 2); g.save(); g.globalAlpha = f; node(g, 'COX', 560, 420, 90, 50, '#5a3fb0', b.i === 2, 22); arrow(g, 607, 420, 640, 420, '#fff', 5); node(g, 'PGE₂', 690, 420, 96, 50, '#c23a62', b.i === 2, 22); txt(g, 'acid arahidonic', 560, 382, 18, '#d9c8e4', 'center', 700); txt(g, 'OVLT / aria preoptică', BR[0], BR[1] + 115, 18, '#ffe36e', 'center', 700); g.restore(); }
      if (b.i === 2 || b.i < 0) { capsule(g, 445, 420, 0.8, -0.3, '#fff', '#c9b3ff'); txt(g, 'aspirina ⊣ COX', 445, 470, 18, '#ff8a95', 'center', 700); }
      // 4 · set-point
      const sp = 37 + 2 * clamp(st - 3);
      const tu = b.i === 4 ? clamp(b.bt / (b.bd * 0.85)) * 0.42 : b.i === 5 ? 0.42 + clamp(b.bt / (b.bd * 0.85)) * 0.58 : b.i < 0 ? 1 : 0;
      const realT = 37 + 2 * clamp((CY0 - curveY(Math.max(0.0001, tu))) / (CY0 - CY1));
      // revenirea (defervescența): set-point-ul coboară primul la 37°C, temperatura reală îl urmează (vasodilatație, sudorație)
      const setNow = tu > 0.72 ? lerp(sp, 37, ease(clamp((tu - 0.72) / 0.06))) : sp;
      dial(g, DIAL[0], DIAL[1], 95, setNow, b.i >= 4 || b.i < 0 ? realT : 37, '', b.i === 3);
      txt(g, 'set-point', DIAL[0], DIAL[1] - 125, 20, '#ffe36e', 'center', 700);
      if (st > 2.6) { arrow(g, 740, 420, 772, 420, '#ffe36e', 5); txt(g, 'AMPc', 752, 395, 17, '#ffe36e', 'center', 700); }
      // 5–6 · curba febrei
      g.save(); g.strokeStyle = 'rgba(201,179,255,.4)'; g.lineWidth = 3; g.beginPath(); g.moveTo(CX0, CY0 + 30); g.lineTo(CX1, CY0 + 30); g.moveTo(CX0, CY0 + 30); g.lineTo(CX0, CY1 - 40); g.stroke(); g.setLineDash([10, 8]); g.beginPath(); g.moveTo(CX0, CY0); g.lineTo(CX1, CY0); g.stroke(); g.restore();
      txt(g, '37°C', CX0 - 10, CY0 + 6, 18, '#d9c8e4', 'right', 700);
      if (tu > 0) { g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 16; g.beginPath(); for (let u = 0; u <= tu; u += 0.005) { const x = lerp(CX0, CX1, u), y = curveY(u); u ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.strokeStyle = '#ff6b7a'; g.lineWidth = 8; g.stroke(); g.restore();
        const hx = lerp(CX0, CX1, tu), hy = curveY(tu); g.save(); g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(hx, hy, 11, 0, 7); g.fill(); g.stroke(); g.restore(); }
      [['prodrom', 0.07], ['creștere', 0.29], ['stare', 0.57], ['revenire', 0.86]].forEach(([s, u]) => txt(g, s, lerp(CX0, CX1, u), CY0 + 42, 20, tu >= u - 0.05 ? '#fff' : 'rgba(217,200,228,.5)', 'center', 700));
      if (tu > 0.15 && tu < 0.45) { shiver(g, lerp(CX0, CX1, 0.29), CY1 - 10, 0.9, t); txt(g, '„mi-e frig”', lerp(CX0, CX1, 0.29) + 6, CY1 - 60, 20, '#7fe8ff'); }
      if (tu > 0.72) { sweat(g, lerp(CX0, CX1, 0.86), CY1 - 30, 1, t); txt(g, 'vasodilatație, sudorație', lerp(CX0, CX1, 0.8), CY1 - 45, 19, '#7fe8ff'); }
      if (tu > 0.45 && tu <= 0.72) txt(g, 'echilibru la nivel ↑', lerp(CX0, CX1, 0.57), CY1 - 40, 19, '#9dff8a');
      ring(g, b, 0, MAC[0], MAC[1], 120, 100);
    },
  };
}

/* =============================================================== Î 12 · COST vs CÂȘTIG */
export function q12({ spec }) {
  const PIV = [500, 150];
  return {
    home: HOME, cams: [cam(400, 370, 1.1), cam(600, 370, 1.1)], anchors: [[150, 300], [870, 300]],
    labels: [],
    phase: (i) => ['consecințele (costurile)', 'efectele benefice'][i] || '',
    draw(g, t, b) {
      bgFill(g);
      const tilt = b.i === 0 ? 0.12 : b.i === 1 ? -0.12 : 0.04 * Math.sin(t);
      const ax = Math.cos(tilt), ay = Math.sin(tilt);
      const L = [PIV[0] - 250 * ax, PIV[1] - 250 * ay], R = [PIV[0] + 250 * ax, PIV[1] + 250 * ay];
      // suportul
      g.save(); g.fillStyle = '#5a3fb0'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(PIV[0], PIV[1]); g.lineTo(PIV[0] - 40, PIV[1] + 110); g.lineTo(PIV[0] + 40, PIV[1] + 110); g.closePath(); g.fill(); g.stroke(); g.restore();
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 18; g.beginPath(); g.moveTo(...L); g.lineTo(...R); g.stroke(); g.strokeStyle = '#c9b3ff'; g.lineWidth = 9; g.stroke(); g.restore();
      [L, R].forEach(([x, y], k) => { g.save(); g.strokeStyle = '#d9c8e4'; g.lineWidth = 3; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 70, y + 60); g.moveTo(x, y); g.lineTo(x + 70, y + 60); g.stroke(); g.fillStyle = k ? '#2f6b4f' : '#7a2a3d'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.ellipse(x, y + 62, 90, 18, 0, 0, 7); g.fill(); g.stroke(); g.restore(); txt(g, k ? '+' : '−', x, y + 70, 30, '#fff'); });
      g.save(); g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(...PIV, 14, 0, 7); g.fill(); g.stroke(); g.restore();
      txt(g, 'COSTURI', 250, 75, 30, '#ff8a95'); txt(g, 'CÂȘTIG', 750, 75, 30, '#9dff8a');
      // ---- costuri (stânga, de sus în jos)
      const sL = b.i < 0 || b.i === 1 ? 5 : clamp(b.bt / (b.bd * 0.75)) * 5;
      const rowsL = [
        ['FC ↑ · polipnee', (x, y) => { heart(g, x - 40, y, 0.55, t, 2); lungs(g, x + 45, y + 8, 0.55, t, 2); }],
        ['O₂ ↑ · catabolism', (x, y) => { flame(g, x - 40, y, 0.55, t); txt(g, 'O₂', x + 40, y + 10, 28, '#7fe8ff'); }],
        ['convulsii febrile', (x, y) => { brain(g, x - 20, y + 6, 0.26, t, 0.6); g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 4; g.beginPath(); for (let k = 0; k < 5; k++) g.lineTo(x + 40 + k * 12, y - 10 + (k % 2 ? -9 : 9) * Math.sin(t * 12)); g.stroke(); g.restore(); }],
        ['gravidă trim. I: tub neural', (x, y) => { paint(g, blob(x, y - 4, 32, 24, 0.3, t, 0.04, 12, 2), '#ffc9a8', null, '#fff', bb(x, y, 40, 30), OUT, 4); g.save(); g.strokeStyle = '#ff4d5e'; g.lineWidth = 4; g.setLineDash([6, 5]); g.beginPath(); g.moveTo(x - 25, y - 6); g.quadraticCurveTo(x, y - 18, x + 25, y - 6); g.stroke(); g.restore(); }],
      ];
      rowsL.forEach(([s, f], k) => { if (sL < k + 0.3) return; const y = 285 + k * 80; g.save(); g.globalAlpha = clamp(sL - k); f(300, y); g.restore(); txt(g, s, 300, y + 42, 20, '#fff', 'center', 700); });
      // ---- câștig (dreapta)
      const sR = b.i < 0 || b.i === 0 ? 5 : clamp(b.bt / (b.bd * 0.75)) * 5;
      const rowsR = [
        ['bactericid · antiviral', (x, y) => { rod(g, x - 30, y, 0.6, 0.3, t, '#8ad1a0'); cross(g, x - 30, y, 26); virus(g, x + 50, y, 0.6, t); }],
        ['↓ Fe, Zn, Cu (hrana bacteriei)', (x, y) => { rod(g, x - 90, y, 0.5, 0, t, '#8ad1a0'); ['Fe', 'Zn', 'Cu'].forEach((e, j) => { const d = REDUCED ? 0.5 : ((t * 0.4 + j / 3) % 1); g.save(); g.globalAlpha = 1 - d; pill(g, e, x - 20 + j * 45 + d * 50, y - 8 + (j - 1) * 6, '#6b7a8f', 17); g.restore(); }); }],
        ['↑ fagocitoză · interferon · T', (x, y) => { neutrophil(g, x - 50, y, 1, t); g.save(); g.strokeStyle = '#7fe8ff'; g.lineWidth = 5; g.beginPath(); g.arc(x + 10, y, 22, -1.2, 1.2); g.stroke(); g.restore(); tcell(g, x + 60, y, 0.75, t); }],
        ['↑ proteine de fază acută', (x, y) => { liver(g, x - 30, y, 0.6, t); for (let j = 0; j < 4; j++) { const u = (t * 0.5 + j / 4) % 1; g.save(); g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.arc(x + 30 + u * 60, y - 10 + j * 6, 7, 0, 7); g.fill(); g.stroke(); g.restore(); } }],
      ];
      rowsR.forEach(([s, f], k) => { if (sR < k + 0.3) return; const y = 285 + k * 80; g.save(); g.globalAlpha = clamp(sR - k); f(720, y); g.restore(); txt(g, s, 720, y + 42, 20, '#fff', 'center', 700); });
    },
  };
}

/* =============================================================== Î 13 · FEBRA NON-INFECȚIOASĂ */
export function q13({ spec }) {
  const SRC = [[440, 450], [570, 450], [700, 450]]; // monocit, macrofag, celulă tumorală
  return {
    home: HOME, cams: [cam(330, 260, 1.4), cam(590, 260, 1.4), cam(590, 470, 1.4), cam(780, 470, 1.4), cam(700, 650, 1.35)],
    anchors: [[110, 300], [450, 110], [350, 400], [960, 280], [470, 700]],
    labels: [],
    phase: (i) => ['fără microb', 'sindrom inflamator', 'IL-1, TNF-α', 'mediatori inflamatori', 'OVLT → PGE₂ → febră'][i] || '',
    draw(g, t, b) {
      bgFill(g); const st = stage(b, 5);
      // 0 · fără microb
      rod(g, 230, 230, 1, 0.2, t, '#8a7f99'); coccus(g, 190, 300, 0.8, t, 3, '#8a7f99'); cross(g, 230, 250, 70);
      txt(g, 'FĂRĂ MICROB', 230, 140, 28, '#ff8a95'); txt(g, 'mecanism imunologic', 230, 365, 20, '#d9c8e4', 'center', 700);
      // 1 · self / non-self
      if (st > 0.9) { const f = clamp(st - 0.9); g.save(); g.globalAlpha = f;
        [[480, 220], [540, 190], [600, 240]].forEach(([x, y], k) => { paint(g, blob(x, y, 32, 30, 0, t, 0.05, 10, k), '#bde3c7', null, '#fff', bb(x, y, 32, 30), OUT, 4); txt(g, 'self', x, y + 7, 16, '#fff', 'center', 800); });
        lymphocyte(g, 640, 300, 0.9, t);
        for (let k = 0; k < 3; k++) antibody(g, 600 - k * 50 + 10 * Math.sin(t * 2 + k), 270 - k * 12, 1.2, -0.6 - k * 0.3, '#ff8a95');
        txt(g, '?', 690, 250, 46, '#ffe36e'); txt(g, 'self / non-self confundat', 560, 150, 20, '#bde3c7', 'center', 700); flame(g, 790, 220, 0.7, t); txt(g, 'sindrom inflamator', 790, 310, 20, '#ff8a3d'); g.restore(); }
      // 2 · celulele care eliberează citokine
      if (st > 1.9) { const f = clamp(st - 1.9); g.save(); g.globalAlpha = f;
        paint(g, blob(SRC[0][0], SRC[0][1], 42, 40, 0, t, 0.05, 12, 1), '#d7cdf7', '#b8a8ee', '#fff', bb(SRC[0][0], SRC[0][1], 42, 40), OUT, 5);
        g.save(); g.strokeStyle = OUT; g.lineCap = 'round'; g.lineWidth = 20; g.beginPath(); g.arc(SRC[0][0] - 6, SRC[0][1], 16, 0.6, 5.2); g.stroke(); g.strokeStyle = '#4a3aa8'; g.lineWidth = 13; g.stroke(); g.restore();
        macrophage(g, SRC[1][0], SRC[1][1], 0.55, t, { inc: 2 });
        paint(g, blob(SRC[2][0], SRC[2][1], 48, 44, 0.4, t, 0.18, 14, 7), '#e7a0c6', '#cf7aa8', '#fff', bb(SRC[2][0], SRC[2][1], 48, 44), OUT, 5);
        paint(g, blob(SRC[2][0] - 4, SRC[2][1], 24, 20, 0, t, 0.15, 10, 9), '#3a2a8a', null, '#7a6ad0', bb(SRC[2][0], SRC[2][1], 24, 20), OUT, 3);
        txt(g, 'monocit', SRC[0][0], SRC[0][1] - 58, 18, '#d7cdf7', 'center', 700); txt(g, 'macrofag', SRC[1][0], SRC[1][1] - 58, 18, '#ffb3d0', 'center', 700); txt(g, 'tumoră', SRC[2][0], SRC[2][1] - 58, 18, '#ffb3d0', 'center', 700); txt(g, 'IL-1 · TNF-α', 570, 545, 21, '#ffe36e');
        g.restore();
        SRC.forEach(([x, y], k) => { flow(g, [[x, y + 30], [x, y + 140], [560, 640], [560, 700]], 4, t + k * 0.3, 0.14, CYT, 9, clamp(st - 2.2) * 1.01); });
      }
      // 3 · neutrofile prin chemotactism
      if (st > 2.9) { const f = clamp(st - 2.9); pathLine(g, [[930, 330], [930, 600]], 'rgba(255,90,110,.3)', 60); txt(g, 'vas', 930, 315, 18, '#ff8a95', 'center', 700);
        for (let k = 0; k < 3; k++) { const u = clamp(f * 1.3 - k * 0.15); neutrophil(g, lerp(930, 830 - k * 15, u), 380 + k * 80, 1, t); }
        txt(g, 'neutrofile', 830, 340, 18, '#f7d6e6', 'center', 700); txt(g, '(chemotactism)', 830, 620, 17, '#d9c8e4', 'center', 700);
        if (f > 0.5) { for (let j = 0; j < 5; j++) { const u = (t * 0.6 + j / 5) % 1; g.save(); g.globalAlpha = 1 - u; g.fillStyle = '#ff8a3d'; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.arc(790 - u * 50, 390 + j * 40, 6, 0, 7); g.fill(); g.stroke(); g.restore(); } txt(g, 'mediatori inflamatori', 830, 650, 17, '#ff8a3d', 'center', 700); }
      }
      // 4 · OVLT → PGE₂ → set-point
      if (st > 3.8) { const f = clamp(st - 3.8); g.save(); g.globalAlpha = f; brain(g, 560, 760, 0.5, t, f); txt(g, 'OVLT', 565, 845, 18, '#ffe36e', 'center', 700); arrow(g, 640, 780, 670, 780, '#fff', 5); node(g, 'PGE₂', 720, 780, 96, 46, '#c23a62', b.i === 4, 20); arrow(g, 770, 780, 800, 780, '#fff', 5); dial(g, 880, 790, 55, 37 + 2 * f, 37 + 2 * clamp(f * 1.2 - 0.2), ''); txt(g, 'set-point ↑ → FEBRĂ', 870, 870, 20, '#ff8a95'); g.restore(); }
    },
  };
}

/* =============================================================== Î 14 · TIPURILE DE FEBRĂ NON-INFECȚIOASĂ */
export function q14({ spec }) {
  const T = [[270, 250], [730, 250], [270, 690], [730, 690]];
  const TT = ['medicamentoasă', 'posttransfuzională', 'neoplazică', 'autoimună'];
  return {
    home: HOME, cams: T.map(([x, y]) => cam(x + 20, y + 30, 1.8)), anchors: T.map(([x, y]) => [x - 165, y - 150]),
    labels: [],
    phase: (i) => TT[i] || '',
    draw(g, t, b) {
      bgFill(g);
      T.forEach(([x, y], k) => { const on = b.i === k; g.save(); g.fillStyle = on ? '#3d2c63' : '#2c2147'; g.strokeStyle = on ? '#ffe36e' : OUT; g.lineWidth = on ? 7 : 6; g.beginPath(); g.roundRect(x - 210, y - 195, 420, 390, 26); g.fill(); g.stroke(); g.restore(); txt(g, TT[k], x + 20, y - 145, 28, on ? '#ffe36e' : '#fff'); });
      const lt = (k) => (b.i === k ? b.bt : t);
      // 1 · medicamentoasă
      { const [x, y] = T[0]; const tt = lt(0); capsule(g, x - 40, y - 60, 1.4, -0.4 + 0.1 * Math.sin(tt)); capsule(g, x + 70, y - 80, 1.1, 0.5, '#7fe8ff');
        txt(g, 'β-lactamine', x + 30, y - 0, 18, '#d9c8e4', 'center', 700); txt(g, 'difenilhidantoină · procainamidă', x + 30, y + 24, 17, '#d9c8e4', 'center', 700);
        // eozinofil (granule roșii, nucleu bilobat)
        paint(g, blob(x + 120, y + 85, 38, 36, 0, tt, 0.05, 12, 3), '#ffd0dc', null, '#fff', bb(x + 120, y + 85, 38, 36), OUT, 4); g.save(); g.fillStyle = '#ff5a6e'; srand(4); for (let j = 0; j < 14; j++) { g.beginPath(); g.arc(x + 120 + rr(-25, 25), y + 85 + rr(-24, 24), 4, 0, 7); g.fill(); } g.fillStyle = '#3b1f8c'; g.beginPath(); g.arc(x + 108, y + 82, 11, 0, 7); g.arc(x + 132, y + 82, 11, 0, 7); g.fill(); g.restore();
        txt(g, 'eozinofilie', x + 120, y + 150, 18, '#ffb3d0', 'center', 700); shiver(g, x + 10, y + 95, 0.8, tt); txt(g, 'frison', x + 10, y + 150, 18, '#7fe8ff', 'center', 700); }
      // 2 · posttransfuzională
      { const [x, y] = T[1]; const tt = lt(1); const bag = new Path2D(); bag.roundRect(x - 20, y - 110, 120, 150, 22); paint(g, bag, '#d22a44', '#a8122b', '#ff8a96', [x - 20, y - 110, 120, 150], OUT, 6);
        g.save(); g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(x + 40, y + 40); g.lineTo(x + 40, y + 110); g.stroke(); g.restore(); const u = (tt * 0.8) % 1; g.save(); g.fillStyle = '#d22a44'; g.beginPath(); g.arc(x + 40, y + 50 + u * 60, 7, 0, 7); g.fill(); g.restore();
        // ceasul 30–180 min
        const cx = x + 165, cy = y - 60; g.save(); g.fillStyle = '#f6eef7'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(cx, cy, 45, 0, 7); g.fill(); g.stroke(); g.strokeStyle = '#c23a62'; g.lineWidth = 9; g.beginPath(); g.arc(cx, cy, 32, -1.57 + 0.5, -1.57 + 0.5 + 2.6 * clamp((tt % 6) / 4)); g.stroke(); g.restore();
        txt(g, '30–180 min', cx - 10, cy + 80, 20, '#ffe36e'); shiver(g, x + 160, y + 75, 0.8, tt); txt(g, 'frison → febră', x + 160, y + 135, 18, '#7fe8ff', 'center', 700); txt(g, 'sânge / derivate', x - 110, y - 40, 18, '#ffb3bd', 'center', 700); }
      // 3 · neoplazică
      { const [x, y] = T[2]; const tt = lt(2); const cx = x + 120, cy = y + 30; srand(11); for (let j = 0; j < 7; j++) { const a = j / 7 * 6.28, d = j ? 46 : 0; paint(g, blob(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.75, 27, 24, a, tt, 0.18, 12, j), '#e7a0c6', '#cf7aa8', '#fff', bb(cx, cy, 27, 24), OUT, 4); g.save(); g.fillStyle = '#3a2a8a'; g.beginPath(); g.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.75, 9, 0, 7); g.fill(); g.restore(); }
        flow(g, [[cx + 50, cy - 20], [x + 185, cy - 60], [x + 195, y - 110]], 5, tt, 0.15, CYT, 8);
        txt(g, 'plurifactorial: tumoră · HS', x + 20, y - 95, 18, '#d9c8e4', 'center', 700); txt(g, 'rejet · tromboze', x + 20, y - 70, 18, '#d9c8e4', 'center', 700); txt(g, 'Hodgkin · leucemii', x - 10, y - 30, 18, '#ffb3d0', 'center', 700); txt(g, 'cancer renal', x - 10, y - 6, 18, '#ffb3d0', 'center', 700); }
      // 4 · autoimună
      { const [x, y] = T[3]; const tt = lt(3); // articulație + complexe imune
        paint(g, blob(x + 40, y - 70, 70, 40, 0, tt, 0.04, 12, 2), '#f2e3c6', null, '#fff', bb(x + 40, y - 70, 70, 40), OUT, 5); paint(g, blob(x + 40, y + 20, 70, 40, 0, tt, 0.04, 12, 5), '#f2e3c6', null, '#fff', bb(x + 40, y + 20, 70, 40), OUT, 5);
        for (let j = 0; j < 5; j++) { const u = (tt * 0.35 + j / 5) % 1; const ax = lerp(x + 180, x + 50 + (j - 2) * 22, u), ay = lerp(y - 140, y - 25, u); antibody(g, ax, ay, 1.6, 0.4 * Math.sin(j + tt), '#ffe08a'); g.save(); g.fillStyle = '#ff6b7a'; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.arc(ax, ay - 20, 7, 0, 7); g.fill(); g.stroke(); g.restore(); }
        flame(g, x + 40, y - 20, 0.45, tt); txt(g, 'LES: complexe imune + citokine', x + 30, y + 85, 18, '#d9c8e4', 'center', 700); txt(g, 'alte: distrucții tisulare, embolie, gută', x + 30, y + 112, 17, '#ffb3d0', 'center', 700); }
    },
  };
}

/* =============================================================== Î 15 · PIROGENII EXOGENI */
export function q15({ spec }) {
  const C = [170, 500, 830];
  return {
    home: HOME, cams: [cam(190, 330, 1.22), cam(480, 385, 1.22), cam(800, 415, 1.22)], anchors: [[60, 115], [390, 115], [720, 115]],
    labels: [],
    phase: (i) => ['cine', 'calea', 'efectele'][i] || '',
    draw(g, t, b) {
      bgFill(g); const st = stage(b, 3);
      ['CINE', 'CALEA', 'EFECTE'].forEach((s, k) => txt(g, s, C[k], 125, 30, b.i === k ? '#ffe36e' : '#c9b3ff'));
      // ---- cine
      { const x = C[0]; const glow = 0.5 + 0.5 * Math.sin(t * 3);
        g.save(); g.shadowColor = '#ffe36e'; g.shadowBlur = 18 * glow; rod(g, x - 30, 175, 0.9, 0.2, t, '#ff8fb3', true); g.restore(); txt(g, 'LPZ · Gram −', x + 40, 225, 19, '#ffe36e', 'center', 700); txt(g, '(cel mai puternic)', x + 40, 250, 17, '#ffe36e', 'center', 700);
        coccus(g, x - 60, 310, 0.9, t, 4, '#6a48c9'); txt(g, 'acid lipoteicoic, peptidoglicani', x + 20, 355, 16, '#9fb3ff', 'center', 700); txt(g, '(Gram +)', x + 20, 377, 16, '#9fb3ff', 'center', 700);
        virus(g, x - 60, 430, 0.8, t); paint(g, blob(x + 20, 430, 26, 18, 0.5, t, 0.08, 10, 6), '#d8c47a', null, '#fff3c0', bb(x + 20, 430, 26, 18), OUT, 4); capsule(g, x + 90, 430, 0.8, 0.3);
        txt(g, 'virusuri · fungi · medicamente', x + 10, 478, 16, '#d9c8e4', 'center', 700);
        antibody(g, x - 20, 530, 1.6, 0, '#ffe08a'); g.save(); g.fillStyle = '#ff6b7a'; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.arc(x - 20, 508, 8, 0, 7); g.fill(); g.stroke(); g.restore(); txt(g, 'complexe Ag-Ac', x + 60, 538, 17, '#d9c8e4', 'center', 700); }
      if (st > 0.8) { g.save(); g.globalAlpha = clamp(st - 0.8); arrow(g, C[0] + 120, 330, C[1] - 120, 330, '#fff', 6); g.restore(); }
      // ---- calea
      if (st > 0.9) { const x = C[1]; const f = clamp(st - 0.9);
        const op = b.i === 1 ? ease(clamp(b.bt / 2.5)) : 1;
        rod(g, x, 200, 0.8, 0, t, '#ff8fb3', true);
        for (let j = 0; j < 7; j++) { const a = j / 7 * 6.28; const d = lerp(110, 52, op); g.save(); g.globalAlpha = f; g.fillStyle = '#9dff8a'; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.arc(x + Math.cos(a) * d, 200 + Math.sin(a) * d * 0.6, 8, 0, 7); g.fill(); g.stroke(); g.restore(); }
        txt(g, 'opsonizare (complement)', x, 290, 18, '#9dff8a', 'center', 700);
        const eat = b.i === 1 ? ease(clamp((b.bt - 2) / 3)) : st >= 2 ? 1 : 0;
        g.save(); g.globalAlpha = f; macrophage(g, x, 420, 1.0, t, { pseudo: [x, 330, eat], inc: 3 }); g.restore();
        txt(g, 'fagocitoză (macrofag)', x, 530, 18, '#d9c8e4', 'center', 700);
        if (eat > 0.5) { flow(g, [[x + 60, 450], [x + 140, 520], [x + 200, 560]], 6, t, 0.15, CYT, 10); txt(g, 'IL-1 · TNF-α · IL-6', x, 600, 21, '#ffe36e'); txt(g, '= pirogeni endogeni', x, 630, 18, '#ffe36e', 'center', 700); }
      }
      if (st > 1.8) { g.save(); g.globalAlpha = clamp(st - 1.8); arrow(g, C[1] + 115, 470, C[2] - 140, 470, '#fff', 6); g.restore(); }
      // ---- efecte
      if (st > 1.9) { const x = C[2]; const f = clamp(st - 1.9); const e = b.i === 2 ? clamp(b.bt / (b.bd * 0.8)) * 4 : 4;
        g.save(); g.globalAlpha = f;
        if (e > 0) { brain(g, x, 210, 0.55, t, clamp(e)); txt(g, 'central: PGE₂ la OVLT → febră', x, 285, 17, '#ffe36e', 'center', 700); }
        if (e > 1) { g.save(); g.globalAlpha = clamp(e - 1); g.strokeStyle = '#7fe8ff'; g.lineWidth = 5; g.setLineDash([12, 8]); g.lineDashOffset = -t * 30; g.beginPath(); g.moveTo(x - 100, 380); g.bezierCurveTo(x - 30, 330, x + 30, 410, x + 100, 350); g.stroke(); g.restore(); txt(g, 'direct: fibre viscero-senzitive', x, 420, 17, '#7fe8ff', 'center', 700); }
        if (e > 2) { g.save(); g.globalAlpha = clamp(e - 2); flame(g, x - 50, 500, 0.5, t); liver(g, x + 50, 505, 0.5, t); g.restore(); txt(g, 'periferic: inflamație, fază acută', x, 565, 17, '#ff8a3d', 'center', 700); }
        if (e > 3) { g.save(); g.globalAlpha = clamp(e - 3); g.fillStyle = '#7a1a2d'; g.strokeStyle = '#ff4d5e'; g.lineWidth = 5; g.beginPath(); g.roundRect(x - 140, 610, 280, 70, 16); g.fill(); g.stroke(); g.restore(); txt(g, 'prelungit: șoc toxico-septic', x, 655, 18, '#fff', 'center', 800); }
        g.restore(); }
      
    },
  };
}
