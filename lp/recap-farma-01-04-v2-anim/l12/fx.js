// Helperi în plus pentru LP 2 (farmacocinetică): culorile etapelor ADME, molecula HA / A⁻, enzima CYP ca „pac-man”,
// axe + curbe pentru graficele de concentrație, ficat, rinichi, stomac, lanțul peptidic, trombocitul.
import { C, OUT, clamp, lerp, txt, dot, ell, paint, blob, bb, glowRing, REDUCED } from './fk.js';

export const K = {
  stage: ['#f2c14e', '#3fd0c0', '#b07cff', '#5fcf7a'],
  drug: '#ffa040', met: '#7be07b', ion: '#5aa8ff', neu: '#f4efe6', inh: '#c57bff', ind: '#4fd18b', plt: '#c9a0e8', grey: '#8b8090',
};

export const hiBox = (g, x, y, w, h, on) => { if (!on) return; g.save(); g.shadowColor = C.hi; g.shadowBlur = 24; g.strokeStyle = C.hi; g.lineWidth = 6; g.beginPath(); g.roundRect(x - 4, y - 4, w + 8, h + 8, 22); g.stroke(); g.restore(); };

// molecula: 'HA' = neionizată (albă), 'A⁻' = ionizată (albastră), '' = medicament (portocaliu), 'M' = metabolit (verde)
export function mol(g, x, y, lab = '', r = 26, o = {}) {
  const col = o.col || (lab === 'HA' ? K.neu : lab === 'A⁻' ? K.ion : lab === 'M' ? K.met : K.drug);
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  if (o.glow) { g.shadowColor = o.gc || col; g.shadowBlur = 22 * o.glow; }
  paint(g, blob(x, y, r, r, 0, 0, 0.03, 10, Math.round(x)), col, null, '#ffffff', bb(x, y, r, r), OUT, 4);
  g.restore();
  if (lab && lab !== 'M') txt(g, lab, x, y + 1, r * 0.72, OUT, { stroke: false, alpha: o.alpha });
}

// enzima CYP: pac-man care „mestecă” (ph = faza)
export function pac(g, x, y, r, col, ph = 0, a = 1) {
  const m = 0.12 + 0.28 * (REDUCED ? 0.5 : (Math.sin(ph) * 0.5 + 0.5));
  const p = new Path2D(); p.moveTo(x, y); p.arc(x, y, r, m, Math.PI * 2 - m); p.closePath();
  g.save(); g.globalAlpha = clamp(a); paint(g, p, col, null, '#ffffff', bb(x, y, r, r), OUT, Math.max(3, r * 0.12));
  dot(g, x + r * 0.1, y - r * 0.5, Math.max(2, r * 0.12), OUT, { ow: 0 });
  g.restore();
}

// axe pentru grafice: întoarce funcțiile de proiecție
export function axes(g, x, y, w, h, o = {}) {
  const pl = o.noTicks ? 8 : 64, pb = o.noTicks ? 8 : 44, pt = 10, pr = 14;
  const X = (v) => x + pl + (v - (o.xmin || 0)) / (o.xmax - (o.xmin || 0)) * (w - pl - pr);
  const Y = (v) => y + h - pb - v / o.ymax * (h - pb - pt);
  g.save();
  if (!o.bare) { g.fillStyle = o.paper || 'rgba(255,236,200,.06)'; g.beginPath(); g.roundRect(x, y, w, h, 14); g.fill(); }
  g.strokeStyle = C.cream; g.lineWidth = o.thin ? 3 : 4; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x + pl, y + pt); g.lineTo(x + pl, y + h - pb); g.lineTo(x + w - pr, y + h - pb); g.stroke();
  g.restore();
  if (!o.noTicks) {
    (o.xt || []).forEach((v) => { txt(g, String(v).replace('.', ','), X(v), y + h - pb + 22, o.fs || 17, C.dim, { w: 700 }); g.save(); g.strokeStyle = C.cream; g.lineWidth = 3; g.beginPath(); g.moveTo(X(v), y + h - pb); g.lineTo(X(v), y + h - pb + 7); g.stroke(); g.restore(); });
    (o.yt || []).forEach((v) => { txt(g, String(v).replace('.', ','), x + pl - 12, Y(v), o.fs || 17, C.dim, { w: 700, align: 'right' }); g.save(); g.strokeStyle = 'rgba(255,236,200,.12)'; g.lineWidth = 2; g.beginPath(); g.moveTo(x + pl, Y(v)); g.lineTo(x + w - pr, Y(v)); g.stroke(); g.restore(); });
    if (o.xl) txt(g, o.xl, x + w - pr, y + h + 6, 16, C.cream, { align: 'right', w: 700 });
    if (o.yl) txt(g, o.yl, x + pl + 8, y + pt + 8, 16, C.cream, { align: 'left', w: 700 });
  }
  return { X, Y, x0: x + pl, x1: x + w - pr, y0: y + pt, y1: y + h - pb };
}
export function plot(g, A, f, a, b, o = {}) {
  const n = o.n || 160; const e = lerp(a, b, clamp(o.u ?? 1)); if (e <= a) return null;
  g.save(); g.lineJoin = 'round'; g.lineCap = 'round'; if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  g.beginPath(); let last = null;
  for (let i = 0; i <= n; i++) { const v = lerp(a, e, i / n); const pt = [A.X(v), A.Y(f(v))]; i ? g.lineTo(...pt) : g.moveTo(...pt); last = pt; }
  if (o.dash) g.setLineDash(o.dash);
  if (o.ow !== 0) { g.strokeStyle = OUT; g.lineWidth = (o.w || 5) + 5; g.stroke(); }
  g.strokeStyle = o.col || C.cream; g.lineWidth = o.w || 5; g.stroke(); g.restore();
  return last;
}

export function liver(g, x, y, s = 1, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  if (o.glow) { g.shadowColor = C.hi; g.shadowBlur = 30; }
  const p = new Path2D(); p.moveTo(-70, -22); p.quadraticCurveTo(-40, -58, 40, -48); p.quadraticCurveTo(76, -42, 68, -14); p.quadraticCurveTo(30, 40, -54, 36); p.quadraticCurveTo(-80, 14, -70, -22);
  paint(g, p, '#9b3a2e', '#7a271e', '#d0705f', [-80, -58, 156, 98], OUT, 5 / s);
  g.restore();
}
export function kidney(g, x, y, s = 1, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  if (o.glow) { g.shadowColor = C.hi; g.shadowBlur = 30; }
  const p = new Path2D(); p.moveTo(0, -46); p.bezierCurveTo(40, -48, 46, -10, 42, 8); p.bezierCurveTo(38, 38, 16, 50, -4, 46); p.bezierCurveTo(-28, 42, -34, 24, -20, 12); p.bezierCurveTo(-12, 4, -12, -4, -20, -12); p.bezierCurveTo(-34, -26, -26, -46, 0, -46);
  paint(g, p, '#b5473f', '#8e3029', '#e07a70', [-34, -48, 80, 96], OUT, 5 / s);
  g.restore();
}
export function stomach(g, x, y, s = 1) {
  g.save(); g.translate(x, y); g.scale(s, s);
  const p = new Path2D(); p.moveTo(-20, -60); p.quadraticCurveTo(-30, -14, -6, 10); p.quadraticCurveTo(26, 40, 62, 16); p.lineTo(64, 36); p.quadraticCurveTo(12, 70, -38, 32); p.quadraticCurveTo(-68, 0, -44, -60); p.closePath();
  paint(g, p, '#f0a6a0', '#d27c78', '#ffe0dc', [-68, -60, 132, 100], OUT, 5 / s);
  g.restore();
}
// lanț peptidic: n bile; cut[k] = cât de desprinsă e legătura k (0 legată … 1 ruptă); off[k] = deplasarea bilei k
export function chain(g, x, y, n, sp, cut = [], off = [], o = {}) {
  const P = []; for (let k = 0; k < n; k++) { const d = off[k] || [0, 0]; P.push([x + k * sp + d[0], y + Math.sin(k * 1.3) * 8 + d[1]]); }
  g.save(); g.lineCap = 'round';
  for (let k = 0; k < n - 1; k++) { const c = cut[k] || 0; if (c >= 1) continue; g.globalAlpha = (o.alpha ?? 1) * (1 - c); g.strokeStyle = OUT; g.lineWidth = 11; g.beginPath(); g.moveTo(...P[k]); g.lineTo(...P[k + 1]); g.stroke(); g.strokeStyle = '#f6e3c8'; g.lineWidth = 5; g.stroke(); }
  g.restore();
  const cols = ['#ff8a8a', '#ffd36e', '#8fd3ff', '#9be15d', '#d6a3ff', '#ffb36b', '#7fe8d0', '#ff9ad0'];
  P.forEach((p, k) => dot(g, p[0], p[1], o.r || 17, cols[k % cols.length], { ow: 4, alpha: o.alpha }));
  return P;
}
// trombocit (disc mov); agg = cât de lipit e de vecini (doar culoare + spiculi)
export function platelet(g, x, y, r = 30, o = {}) {
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  if (o.spiky) { g.strokeStyle = OUT; g.lineWidth = 5; for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; g.beginPath(); g.moveTo(x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.6); g.lineTo(x + Math.cos(a) * r * 1.35, y + Math.sin(a) * r * 1.1); g.stroke(); } }
  g.restore();
  ell(g, x, y, r, r * 0.7, o.col || K.plt, { ow: 4, alpha: o.alpha });
  dot(g, x - r * 0.25, y - r * 0.1, r * 0.16, '#7a4aa0', { ow: 0, alpha: o.alpha }); dot(g, x + r * 0.25, y + r * 0.15, r * 0.13, '#7a4aa0', { ow: 0, alpha: o.alpha });
}
export { glowRing };
