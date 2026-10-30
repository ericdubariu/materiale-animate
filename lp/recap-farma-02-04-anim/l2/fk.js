// Kit Farmacologie (copiat din LP 4): culori fixe pe tot deck-ul, membrane, receptori, liganzi, iconițe de organe, grafice.
// În LP 2 (farmacocinetică) se folosesc mai ales: txt, pill, dot, ell, arr, cross, check, membrane, icon, chart, tube, flow.
import { OUT, clamp, lerp, ease, paint, blob, bb, smooth, glowRing, arrow, REDUCED } from '../kit2d.js';
export { OUT, clamp, lerp, ease, paint, blob, bb, smooth, glowRing, arrow, REDUCED };

export const W = 1000, H = 934;
export const cam = (x, y, z) => ({ x, y, z });
export const HOME = cam(500, 467, 1);
export const lbl = (at, html, o = {}) => ({ at, html, ...o });

// culorile (aceleași pe tot deck-ul)
export const C = {
  para: '#5fcf7a', paraS: '#3b9d55', sym: '#ff9a4a', symS: '#d06d22',
  ach: '#3fe0c5', na: '#ff6f4a', adr: '#ff6f4a',
  gq: '#ff9d3c', gqS: '#d4741a', gi: '#5aa8ff', giS: '#2f7bd4', gs: '#4fd18b', gsS: '#2a9f60', nch: '#e7c34a', nchS: '#b8932a',
  pilo: '#9be15d', atr: '#c57bff', prop: '#ff5fa2', iso: '#ffb347',
  ca: '#ffe36e', camp: '#7fe8ff', cream: '#fff3e6', dim: '#9c8b7a', hi: '#ffe36e', key: '#ff6b5e',
  muscle: '#e2707a', muscleS: '#b94a55', cyto: '#f6e3c8', cytoS: '#e3c7a0', er: '#b8a4ec', erS: '#8f78d4',
  mem: '#f3cf8a', memS: '#c9a258', blood: '#d93b4a', water: '#9fd3f0', tyrode: '#fff2b0', locke: '#ffd9e6',
  glass: 'rgba(210,235,255,.18)', nerve: '#ffe08a', nerveS: '#d1b04f',
};

export function bg(g, w = W, h = H) { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#30230f'); gr.addColorStop(1, '#120c05'); g.fillStyle = gr; g.fillRect(-3000, -3000, w + 6000, h + 6000); }
export function panel(g, x, y, w, h, o = {}) { g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); g.fillStyle = o.fill || 'rgba(255,236,200,.06)'; g.strokeStyle = o.stroke || 'rgba(255,225,180,.18)'; g.lineWidth = o.lw || 3; g.beginPath(); g.roundRect(x, y, w, h, o.r || 24); g.fill(); g.stroke(); g.restore(); }

// progresul etapei k: înainte = 0, pe punct = animat, după = 1; pe intro totul e gata
export function st(b, k, f = 0.65) { if (b.i < 0) return 1; if (b.i > k) return 1; if (b.i < k) return 0; return ease(clamp(b.bt / (b.bd * f))); }
export const on = (b, k) => b.i === k;
export const loopT = (t, p) => (REDUCED ? 0.999 : (t % p) / p);
// timp local pe beat (0..1) sau buclă pe intro
export const u01 = (b, t, f = 0.8, loop = 9) => (b.i >= 0 ? clamp(b.bt / (b.bd * f)) : loopT(t, loop));
export function P(b, t, n, f = 0.6) {
  if (b.i < 0) { const cyc = n * 2.6 + 2.2; const ph = REDUCED ? n : (t % cyc) / 2.6; return (k) => ease(clamp(ph - k)); }
  return (k) => (k < b.i ? 1 : k > b.i ? 0 : ease(clamp(b.bt / (b.bd * f))));
}

export function txt(g, s, x, y, size = 24, col = C.cream, o = {}) {
  g.save(); g.font = `${o.w || 800} ${size}px Inter, "Segoe UI", sans-serif`; g.textAlign = o.align || 'center'; g.textBaseline = 'middle';
  if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  const L = String(s).split('\n');
  L.forEach((ln, i) => { const yy = y + (i - (L.length - 1) / 2) * size * 1.2; if (o.stroke !== false) { g.lineJoin = 'round'; g.strokeStyle = o.sc || OUT; g.lineWidth = size * 0.28; g.strokeText(ln, x, yy, o.maxW); } g.fillStyle = col; g.fillText(ln, x, yy, o.maxW); });
  g.restore();
}
export function pill(g, x, y, w, h, fill, label, o = {}) {
  const p = new Path2D(); p.roundRect(x - w / 2, y - h / 2, w, h, o.r ?? 18);
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  paint(g, p, fill, o.shade || null, null, [x - w / 2, y - h / 2, w, h], OUT, o.ow ?? 5);
  if (o.glow) { g.shadowColor = o.gc || C.hi; g.shadowBlur = 24 * o.glow; g.strokeStyle = o.gc || C.hi; g.lineWidth = 4; g.stroke(p); g.shadowBlur = 0; }
  g.restore();
  if (label) txt(g, label, x, y, o.size || 21, o.col || OUT, { stroke: false, alpha: o.alpha, w: o.w || 800, maxW: w - 10 });
}
export function dot(g, x, y, r, col, o = {}) { g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = o.ow ?? 3; g.beginPath(); g.arc(x, y, Math.max(0.5, r), 0, 7); g.fill(); if (o.ow !== 0) g.stroke(); g.restore(); }
export function ell(g, x, y, rx, ry, fill, o = {}) { rx = Math.max(0.5, rx); ry = Math.max(0.5, ry); const p = new Path2D(); p.ellipse(x, y, rx, ry, o.rot || 0, 0, Math.PI * 2); g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); paint(g, p, fill, o.shade || null, o.light || null, [x - rx, y - ry, rx * 2, ry * 2], o.sc || OUT, o.ow ?? 6); g.restore(); return p; }
export function arr(g, x0, y0, x1, y1, col = '#fff', w = 7, a = 1) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); arrow(g, x0, y0, x1, y1, col, w); g.restore(); }
export function lead(g, x0, y0, x1, y1, a = 1) { g.save(); g.globalAlpha = clamp(a) * 0.8; g.strokeStyle = '#fff3e6'; g.lineWidth = 2.5; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); }
export function cross(g, x, y, s = 26, col = C.key, a = 1) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round'; for (const [c, w] of [[OUT, 15], [col, 8]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - s, y - s); g.lineTo(x + s, y + s); g.moveTo(x + s, y - s); g.lineTo(x - s, y + s); g.stroke(); } g.restore(); }
export function check(g, x, y, s = 24, col = C.gs, a = 1) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round'; g.lineJoin = 'round'; for (const [c, w] of [[OUT, 15], [col, 8]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - s, y); g.lineTo(x - s * 0.3, y + s * 0.7); g.lineTo(x + s, y - s * 0.7); g.stroke(); } g.restore(); }

/* ---------- curbe ---------- */
export function curve(pts, n = 14) {
  if (pts.length < 3) { const out = []; for (let k = 0; k <= n; k++) out.push([lerp(pts[0][0], pts[1][0], k / n), lerp(pts[0][1], pts[1][1], k / n)]); return out; }
  const out = []; const m = pts.length;
  for (let i = 0; i < m - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(m - 1, i + 2)];
    for (let k = 0; k < n; k++) { const u = k / n, u2 = u * u, u3 = u2 * u; out.push([0, 1].map((d) => 0.5 * ((2 * p1[d]) + (-p0[d] + p2[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * u3))); }
  }
  out.push(pts[m - 1]); return out;
}
function lens(P) { const L = [0]; for (let k = 1; k < P.length; k++) L.push(L[k - 1] + Math.hypot(P[k][0] - P[k - 1][0], P[k][1] - P[k - 1][1])); return L; }
export function at(P, u) {
  const L = lens(P); const d = clamp(u) * L[L.length - 1]; let k = 1; while (k < P.length - 1 && L[k] < d) k++;
  const f = (d - L[k - 1]) / Math.max(1e-6, L[k] - L[k - 1]);
  return [lerp(P[k - 1][0], P[k][0], f), lerp(P[k - 1][1], P[k][1], f), Math.atan2(P[k][1] - P[k - 1][1], P[k][0] - P[k - 1][0])];
}
export function sub(P, u0, u1) {
  if (u1 <= u0) return [];
  const L = lens(P); const T = L[L.length - 1]; const a = u0 * T, b = u1 * T; const out = [at(P, u0).slice(0, 2)];
  for (let k = 1; k < P.length - 1; k++) if (L[k] > a && L[k] < b) out.push(P[k]);
  out.push(at(P, u1).slice(0, 2)); return out;
}
export function tube(g, pts, w, col, o = {}) {
  const P = o.raw ? pts : curve(pts); const Q = sub(P, o.u0 ?? 0, o.u1 ?? 1); if (Q.length < 2) return P;
  const p = new Path2D(); p.moveTo(Q[0][0], Q[0][1]); for (let k = 1; k < Q.length; k++) p.lineTo(Q[k][0], Q[k][1]);
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); g.lineCap = o.cap || 'round'; g.lineJoin = 'round';
  if (o.dash) g.setLineDash(o.dash);
  if (o.glow) { g.shadowColor = o.gc || C.hi; g.shadowBlur = 26 * o.glow; g.strokeStyle = o.gc || C.hi; g.lineWidth = w + 14; g.stroke(p); g.shadowBlur = 0; }
  if (o.ow !== 0) { g.strokeStyle = OUT; g.lineWidth = w + (o.ow ?? 8); g.stroke(p); }
  g.strokeStyle = col; g.lineWidth = w; g.stroke(p);
  g.restore(); return P;
}
export function flow(g, P, t, col, n = 6, speed = 0.25, r = 7, o = {}) {
  for (let k = 0; k < n; k++) {
    const u = ((k / n) + (REDUCED ? 0 : t * speed)) % 1; if (o.u1 !== undefined && u > o.u1) continue;
    const [x, y] = at(P, u);
    dot(g, x, y, r, col, { alpha: (o.alpha ?? 1) * Math.sin(u * Math.PI) ** 0.4, ow: 2.5 });
  }
}

/* ---------- molecule și membrane ---------- */
// ligand: bilă cu literă (P = pilocarpina, A = atropina, ACh, NA…)
export function ligand(g, x, y, col, letter = '', r = 20, o = {}) {
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  if (o.shape === 'block') { const p = new Path2D(); p.roundRect(x - r, y - r * 0.8, r * 2, r * 1.6, 7); paint(g, p, col, null, null, [x - r, y - r, 2 * r, 2 * r], OUT, 4); }
  else paint(g, blob(x, y, r, r, 0, 0, 0.03, 10, x), col, null, '#ffffff', bb(x, y, r, r), OUT, 4);
  g.restore();
  if (letter) txt(g, letter, x, y + 1, r * (letter.length > 2 ? 0.62 : letter.length > 1 ? 0.8 : 1.05), OUT, { stroke: false, alpha: o.alpha });
}
// dublu strat lipidic orizontal între x0 și x1, centrat pe y
export function membrane(g, x0, x1, y, o = {}) {
  const h = o.h || 50; g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  g.fillStyle = o.core || '#f7e7c4'; g.fillRect(x0, y - h / 2, x1 - x0, h);
  g.strokeStyle = '#d7b779'; g.lineWidth = 2;
  for (let x = x0 + 8; x < x1; x += 16) { g.beginPath(); g.moveTo(x, y - h / 2 + 8); g.lineTo(x + 2, y - 3); g.moveTo(x, y + h / 2 - 8); g.lineTo(x - 2, y + 3); g.stroke(); }
  for (const yy of [y - h / 2 + 6, y + h / 2 - 6]) for (let x = x0 + 8; x < x1; x += 16) { g.fillStyle = o.head || C.mem; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.arc(x, yy, 7, 0, 7); g.fill(); g.stroke(); }
  g.restore();
}
// receptor cu 7 segmente transmembranare (stilizat), cu „buzunarul” pentru ligand sus
export function receptor(g, x, y, col, label = '', o = {}) {
  const s = o.s || 1; g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  if (o.glow) { g.shadowColor = o.gc || C.hi; g.shadowBlur = 30 * o.glow; }
  for (let k = 0; k < 7; k++) {
    const xx = x + (k - 3) * 13 * s; const hh = (k === 3 ? 70 : 92) * s; const yy = k === 3 ? y + 12 * s : y;
    const p = new Path2D(); p.roundRect(xx - 6.5 * s, yy - hh / 2, 13 * s, hh, 6 * s);
    g.fillStyle = col; g.fill(p); g.shadowBlur = 0; g.strokeStyle = OUT; g.lineWidth = 3.5; g.stroke(p);
  }
  g.restore();
  if (o.blocked) cross(g, x, y - 58 * s, 18 * s, C.key, o.blocked);
  if (label) txt(g, label, x, y + (o.ly ?? 72) * s, (o.size || 24) * s, col, { alpha: o.alpha });
}
// proteina G: subunitatea α mare + βγ
export function gprot(g, x, y, col, label = '', o = {}) {
  const s = o.s || 1; g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  if (o.glow) { g.shadowColor = o.gc || col; g.shadowBlur = 28 * o.glow; }
  paint(g, blob(x, y, 40 * s, 28 * s, 0, 0, 0.05, 12, 3), col, null, '#ffffff', bb(x, y, 40 * s, 28 * s), OUT, 4);
  g.shadowBlur = 0;
  if (!o.alphaOnly) { paint(g, blob(x + 46 * s, y - 6 * s, 20 * s, 18 * s, 0, 0, 0.05, 10, 5), '#d9c9b2', null, null, bb(x + 46 * s, y, 20 * s, 18 * s), OUT, 3.5); paint(g, blob(x + 60 * s, y + 16 * s, 12 * s, 10 * s, 0, 0, 0.05, 10, 7), '#bfae96', null, null, bb(x + 60 * s, y + 16 * s, 12 * s, 10 * s), OUT, 3); }
  g.restore();
  if (label) txt(g, label, x, y, 22 * s, OUT, { stroke: false, alpha: o.alpha });
}
// enzimă de membrană (PLC, adenilat-ciclaza)
export function enzyme(g, x, y, col, label, o = {}) {
  const s = o.s || 1; g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  if (o.glow) { g.shadowColor = o.gc || C.hi; g.shadowBlur = 30 * o.glow; }
  const p = blob(x, y, 52 * s, 40 * s, 0, 0, 0.08, 12, 11); paint(g, p, col, null, '#ffffff', bb(x, y, 52 * s, 40 * s), OUT, 4.5);
  g.restore();
  txt(g, label, x, y, (o.size || 22) * s, OUT, { stroke: false, alpha: o.alpha });
  if (o.off) cross(g, x + 40 * s, y - 30 * s, 13 * s, C.key, o.off);
}
// canal ionic (N1, N2): două jumătăți care se depărtează când e deschis
export function channel(g, x, y, open, col = C.nch, o = {}) {
  const s = o.s || 1; const gap = (6 + 22 * open) * s;
  for (const d of [-1, 1]) { const p = new Path2D(); p.roundRect(x + d * gap / 2 - (d < 0 ? 30 * s : 0), y - 50 * s, 30 * s, 100 * s, 10 * s); paint(g, p, col, null, '#fff6c8', [x - 40, y - 50, 80, 100], OUT, 4); }
}
// fibră musculară netedă / miofilamente: lungime l = 0 (relaxată) … 1 (contractată)
export function myofil(g, x, y, w, k, o = {}) {
  const n = o.n || 5; const sh = 1 - 0.32 * k; const ww = w * sh;
  g.save();
  const p = new Path2D(); p.roundRect(x - ww / 2 - 18, y - 52, ww + 36, 104, 40);
  paint(g, p, o.col || C.muscle, o.colS || C.muscleS, '#ffc3c8', [x - ww / 2, y - 52, ww, 104], OUT, 5);
  g.lineCap = 'round';
  for (let r = 0; r < 3; r++) {
    const yy = y - 28 + r * 28;
    for (let i = 0; i < n; i++) { const cx = x - ww / 2 + (i + 0.5) * ww / n; g.strokeStyle = '#7a1f2c'; g.lineWidth = 5; g.beginPath(); g.moveTo(cx - ww / n * 0.42, yy); g.lineTo(cx + ww / n * 0.42, yy); g.stroke(); }
    g.strokeStyle = '#ffe1e5'; g.lineWidth = 3; g.beginPath(); g.moveTo(x - ww / 2, yy + 9); g.lineTo(x + ww / 2, yy + 9); g.stroke();
  }
  g.restore();
}

/* ---------- inimă, ochi, iconițe ---------- */
export function heart(g, x, y, s = 1, beat = 0, o = {}) {
  g.save(); g.translate(x, y); const k = 1 + 0.06 * beat; g.scale(s * k, s * k);
  const p = new Path2D(); p.moveTo(0, 70); p.bezierCurveTo(-90, 10, -95, -55, -48, -70); p.bezierCurveTo(-22, -78, -6, -60, 0, -44); p.bezierCurveTo(6, -60, 22, -78, 48, -70); p.bezierCurveTo(95, -55, 90, 10, 0, 70); p.closePath();
  paint(g, p, o.col || '#e04b5a', '#b02c3d', '#ff9aa5', [-90, -78, 180, 150], OUT, 6 / s);
  g.restore();
}
// irisul din față: R = raza irisului, pr = raza pupilei; o.circ / o.rad = cât de „aprins” e fiecare mușchi
export function iris(g, x, y, R, pr, o = {}) {
  g.save();
  ell(g, x, y, R + 26, R + 26, o.sclera || '#f7f1ea', { ow: 6 });
  ell(g, x, y, R, R, o.col || '#9a5a2e', { ow: 5 });
  // mușchiul radial (dilatator): spițe de la marginea pupilei spre periferie
  g.save(); g.beginPath(); g.arc(x, y, R - 3, 0, 7); g.clip();
  const n = 36;
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2; const r0 = pr + 22, r1 = R - 6;
    g.strokeStyle = o.rad ? `rgba(255,154,74,${0.35 + 0.65 * o.rad})` : 'rgba(255,215,170,.33)'; g.lineWidth = o.rad ? 4 + 2 * o.rad : 3;
    g.beginPath(); g.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); g.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); g.stroke();
  }
  // mușchiul circular (sfincter): inele concentrice lângă pupilă
  for (let k = 0; k < 3; k++) { g.strokeStyle = o.circ ? `rgba(95,207,122,${0.4 + 0.6 * o.circ})` : 'rgba(255,225,190,.4)'; g.lineWidth = o.circ ? 4 + 2 * o.circ : 3; g.beginPath(); g.arc(x, y, pr + 5 + k * 7, 0, 7); g.stroke(); }
  g.restore();
  ell(g, x, y, pr, pr, '#0d0a10', { ow: 4 });
  dot(g, x - pr * 0.35, y - pr * 0.4, Math.max(3, pr * 0.16), '#ffffff', { ow: 0, alpha: 0.85 });
  g.restore();
}
// înregistrare: grilă + traseul f(x) (x ∈ 0..1, y ∈ −1..1) desenat până la u; întoarce poziția peniței
export function chart(g, x, y, w, h, f, u, o = {}) {
  const p = new Path2D(); p.roundRect(x, y, w, h, 16);
  paint(g, p, o.paper || '#fbf3e2', null, null, [x, y, w, h], OUT, 5);
  g.save(); g.clip(p); g.strokeStyle = 'rgba(190,140,90,.28)'; g.lineWidth = 1.5;
  for (let gx = x; gx < x + w; gx += 30) { g.beginPath(); g.moveTo(gx, y); g.lineTo(gx, y + h); g.stroke(); }
  for (let gy = y; gy < y + h; gy += 30) { g.beginPath(); g.moveTo(x, gy); g.lineTo(x + w, gy); g.stroke(); }
  if (o.base !== undefined) { g.setLineDash([8, 8]); g.strokeStyle = 'rgba(120,80,40,.55)'; g.lineWidth = 2; const by = y + h / 2 - o.base * h * 0.42; g.beginPath(); g.moveTo(x, by); g.lineTo(x + w, by); g.stroke(); g.setLineDash([]); }
  g.restore();
  const N = Math.max(2, Math.floor(700 * clamp(u))); const pts = [];
  for (let k = 0; k <= N; k++) { const xx = (k / 700); if (xx > u) break; pts.push([x + 14 + xx * (w - 28), y + h / 2 - f(xx) * h * 0.42]); }
  if (pts.length > 1) { g.save(); g.lineJoin = 'round'; g.strokeStyle = o.ink || '#1d3f8f'; g.lineWidth = 3.5; g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); pts.forEach((q) => g.lineTo(q[0], q[1])); g.stroke(); g.restore(); }
  const last = pts[pts.length - 1] || [x + 14, y + h / 2];
  if (o.pen !== false && u < 0.999) dot(g, last[0], last[1], 8, C.key, { ow: 3 });
  return { X: (xx) => x + 14 + xx * (w - 28), Y: (v) => y + h / 2 - v * h * 0.42, last };
}
// marcaj de administrare pe înregistrare
export function mark(g, X, y0, y1, label, col, a = 1) {
  if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.strokeStyle = col; g.lineWidth = 3; g.setLineDash([7, 6]); g.beginPath(); g.moveTo(X, y0); g.lineTo(X, y1); g.stroke(); g.restore();
  arr(g, X, y0 - 46, X, y0 - 10, col, 5, a);
  txt(g, label, X, y0 - 66, 19, col, { alpha: a });
}

// baia de organ izolat (vasul Magnus): o.organ = 'ileon' | 'uter'; k = contracția (0..1)
export function bath(g, x, y, o = {}) {
  const k = o.k || 0; const s = o.s || 1; const sol = o.organ === 'uter' ? C.locke : C.tyrode;
  g.save(); g.translate(x, y); g.scale(s, s);
  // baia exterioară (apă termostatată)
  const outer = new Path2D(); outer.roundRect(-150, -150, 300, 380, 40); paint(g, outer, 'rgba(159,211,240,.45)', null, null, [-150, -150, 300, 380], OUT, 6);
  // vasul interior cu soluția
  const inner = new Path2D(); inner.roundRect(-82, -120, 164, 320, 30); paint(g, inner, sol, null, '#ffffff', [-82, -120, 164, 320], OUT, 5);
  g.save(); g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(-82, -120, 164, 22); g.restore();
  // tubul de barbotare + bule
  g.save(); g.strokeStyle = OUT; g.lineWidth = 9; g.beginPath(); g.moveTo(58, -190); g.lineTo(58, 170); g.lineTo(30, 182); g.stroke(); g.strokeStyle = '#d8e6ef'; g.lineWidth = 4; g.stroke(); g.restore();
  const tt = o.t || 0;
  for (let i = 0; i < 9; i++) { const u = ((i / 9) + (o.still ? 0 : tt * 0.18)) % 1; dot(g, 34 + Math.sin(i * 2.1 + u * 9) * 8, 175 - u * 280, 5 + (i % 3), 'rgba(255,255,255,.85)', { ow: 2 }); }
  // cârligul jos, organul, firul spre traductor
  const top = -40 - 30 * (1 - k), bot = 140; const len = bot - top;
  g.save(); g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(-20, 192); g.lineTo(-20, bot + 6); g.stroke(); g.restore();
  g.save(); g.strokeStyle = '#2a1534'; g.lineWidth = 3; g.beginPath(); g.moveTo(-20, top); g.lineTo(-20, -250); g.stroke(); g.restore();
  if (o.organ === 'uter') {
    const ww = 34 + 12 * k; const p = new Path2D(); p.roundRect(-20 - ww / 2, top, ww, len, 16); paint(g, p, '#e88a9a', '#c45d70', '#ffd0d8', [-20 - ww / 2, top, ww, len], OUT, 5);
  } else {
    const ww = 40 + 14 * k; const p = new Path2D(); p.roundRect(-20 - ww / 2, top, ww, len, 18); paint(g, p, '#f0a6a0', '#d27c78', '#ffe0dc', [-20 - ww / 2, top, ww, len], OUT, 5);
    g.save(); g.strokeStyle = 'rgba(150,60,60,.45)'; g.lineWidth = 3; for (let yy = top + 16; yy < bot - 8; yy += 18) { g.beginPath(); g.moveTo(-20 - ww / 2 + 6, yy); g.quadraticCurveTo(-20, yy + 6, -20 + ww / 2 - 6, yy); g.stroke(); } g.restore();
  }
  // traductorul
  const tr = new Path2D(); tr.roundRect(-70, -300, 110, 56, 12); paint(g, tr, '#8e8a9c', '#6b6779', '#d6d2e2', [-70, -300, 110, 56], OUT, 5);
  txt(g, 'traductor', -15, -272, 18, OUT, { stroke: false });
  g.restore();
  return { organ: [x - 20 * s, y + 50 * s], vessel: [x, y + 40 * s], trans: [x - 15 * s, y - 272 * s], gas: [x + 58 * s, y - 190 * s], top: [x - 20 * s, y - 250 * s] };
}

/* ---------- iconițe de organe (desen simplu, contur gros), centrate în (x,y), mărime ~ s*100 ---------- */
export function icon(g, name, x, y, s = 1, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s); const A = o.alpha ?? 1; g.globalAlpha = A;
  const P = (fn) => { const p = new Path2D(); fn(p); return p; };
  const fill = (p, c, sh = null) => paint(g, p, c, sh, null, [-50, -50, 100, 100], OUT, 5 / s);
  switch (name) {
    case 'eye': { ell(g, 0, 0, 52, 30, '#f7f1ea', { ow: 5 / s }); ell(g, 0, 0, 24, 24, '#9a5a2e', { ow: 4 / s }); ell(g, 0, 0, o.pupil ?? 10, o.pupil ?? 10, '#0d0a10', { ow: 3 / s }); break; }
    case 'ciliary': { ell(g, 0, 0, 44, 44, '#f7f1ea', { ow: 5 / s }); ell(g, 0, 0, 20, 28, '#cfe8ff', { ow: 4 / s }); g.lineWidth = 9; g.strokeStyle = OUT; for (const d of [-1, 1]) { g.beginPath(); g.arc(0, 0, 36, d > 0 ? -0.6 : Math.PI - 0.6, d > 0 ? 0.6 : Math.PI + 0.6); g.stroke(); } g.strokeStyle = '#c75b3f'; g.lineWidth = 5; for (const d of [-1, 1]) { g.beginPath(); g.arc(0, 0, 36, d > 0 ? -0.6 : Math.PI - 0.6, d > 0 ? 0.6 : Math.PI + 0.6); g.stroke(); } break; }
    case 'bronchi': { g.lineCap = 'round'; const tr = [[0, -50, 0, -8], [0, -8, -26, 22], [0, -8, 26, 22], [-26, 22, -40, 46], [-26, 22, -12, 46], [26, 22, 12, 46], [26, 22, 40, 46]]; for (const [c, w] of [[OUT, 20], ['#f2b6a6', 12]]) { g.strokeStyle = c; g.lineWidth = w; tr.forEach(([a, b, c2, d]) => { g.beginPath(); g.moveTo(a, b); g.lineTo(c2, d); g.stroke(); }); } break; }
    case 'gut': { g.lineCap = 'round'; g.lineJoin = 'round'; const pts = [[-44, -36], [40, -36], [40, -10], [-40, -10], [-40, 16], [40, 16], [40, 40], [-30, 40]]; for (const [c, w] of [[OUT, 24], ['#f0a6a0', 16]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(...pts[0]); pts.slice(1).forEach((p) => g.lineTo(...p)); g.stroke(); } break; }
    case 'gland': { for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; ell(g, Math.cos(a) * 26, Math.sin(a) * 22 - 6, 17, 15, '#e9c79a', { ow: 4 / s }); } ell(g, 0, -6, 15, 13, '#e9c79a', { ow: 4 / s }); g.strokeStyle = OUT; g.lineWidth = 8; g.beginPath(); g.moveTo(0, 14); g.lineTo(0, 50); g.stroke(); g.strokeStyle = C.water; g.lineWidth = 4; g.stroke(); break; }
    case 'vessel': { const p = P((p) => { p.roundRect(-52, -22, 104, 44, 22); }); fill(p, '#c93a4a', '#a12535'); ell(g, -52, 0, 12, 22, '#7d1a28', { ow: 4 / s }); for (let k = 0; k < 3; k++) ell(g, -18 + k * 22, 0, 8, 6, '#ff8a96', { ow: 2.5 / s }); break; }
    case 'heart': { heart(g, 0, 4, 0.62, 0); break; }
    case 'adrenal': { const kid = P((p) => { p.ellipse(0, 14, 30, 38, 0, 0, 7); }); fill(kid, '#b5473f', '#8e3029'); const cap = P((p) => { p.moveTo(-34, -14); p.quadraticCurveTo(0, -60, 34, -14); p.quadraticCurveTo(0, -30, -34, -14); }); fill(cap, '#f2c14e', '#d19a22'); break; }
    case 'muscle': { const p = P((p) => { p.roundRect(-52, -24, 104, 48, 22); }); fill(p, '#d9535f', '#b03a46'); g.strokeStyle = 'rgba(255,220,225,.8)'; g.lineWidth = 3; for (let xx = -40; xx <= 40; xx += 10) { g.beginPath(); g.moveTo(xx, -18); g.lineTo(xx, 18); g.stroke(); } g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.moveTo(0, -24); g.lineTo(0, -52); g.stroke(); g.strokeStyle = C.nerve; g.lineWidth = 4; g.stroke(); break; }
    case 'smooth': { for (let k = 0; k < 3; k++) { const p = P((p) => { p.ellipse(0, -26 + k * 26, 50, 11, 0, 0, 7); }); fill(p, '#ef9aa2', '#d3747f'); ell(g, -6 + k * 6, -26 + k * 26, 12, 4, '#6b2a6e', { ow: 2 / s }); } break; }
    case 'liver': { const p = P((p) => { p.moveTo(-52, -16); p.quadraticCurveTo(-30, -40, 30, -34); p.quadraticCurveTo(56, -30, 50, -10); p.quadraticCurveTo(20, 30, -40, 26); p.quadraticCurveTo(-58, 10, -52, -16); }); fill(p, '#9b3a2e', '#7a271e'); break; }
    case 'pancreas': { const p = P((p) => { p.moveTo(-52, 8); p.quadraticCurveTo(-46, -26, -20, -14); p.quadraticCurveTo(10, -2, 46, -20); p.quadraticCurveTo(56, -6, 44, 6); p.quadraticCurveTo(10, 18, -20, 22); p.quadraticCurveTo(-48, 30, -52, 8); }); fill(p, '#f2c48a', '#d9a466'); break; }
    case 'bladder': { const p = P((p) => { p.moveTo(-36, -20); p.quadraticCurveTo(0, -56, 36, -20); p.quadraticCurveTo(46, 22, 8, 36); p.lineTo(8, 50); p.lineTo(-8, 50); p.lineTo(-8, 36); p.quadraticCurveTo(-46, 22, -36, -20); }); fill(p, '#f2d07a', '#d4ad4c'); break; }
    case 'uterus': { const p = P((p) => { p.moveTo(-30, -30); p.quadraticCurveTo(0, -40, 30, -30); p.quadraticCurveTo(28, 10, 10, 26); p.lineTo(10, 46); p.lineTo(-10, 46); p.lineTo(-10, 26); p.quadraticCurveTo(-28, 10, -30, -30); }); fill(p, '#e88a9a', '#c45d70'); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 9; g.beginPath(); g.moveTo(-30, -30); g.quadraticCurveTo(-46, -40, -52, -22); g.moveTo(30, -30); g.quadraticCurveTo(46, -40, 52, -22); g.stroke(); g.strokeStyle = '#e88a9a'; g.lineWidth = 5; g.stroke(); break; }
    case 'hair': { const sk = P((p) => { p.roundRect(-52, 6, 104, 40, 10); }); fill(sk, '#f3c29b', '#d99b72'); g.lineCap = 'round'; for (const [c, w] of [[OUT, 9], ['#4a2c1a', 5]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(-6, 30); g.lineTo(10, -46); g.stroke(); } const m = P((p) => { p.ellipse(10, 18, 18, 6, -0.9, 0, 7); }); fill(m, '#ef9aa2'); break; }
    case 'sphincter': { ell(g, 0, 0, 44, 44, '#f0a6a0', { ow: 5 / s }); ell(g, 0, 0, o.open ?? 10, o.open ?? 10, '#2b1a14', { ow: 4 / s }); g.strokeStyle = 'rgba(150,60,60,.6)'; g.lineWidth = 3; for (let r = 18; r < 42; r += 8) { g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke(); } break; }
    case 'terminal': { g.lineCap = 'round'; for (const [c, w] of [[OUT, 22], [C.nerve, 14]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(0, -52); g.lineTo(0, -12); g.stroke(); } ell(g, 0, 8, 34, 26, C.nerve, { ow: 5 / s }); for (let k = 0; k < 4; k++) dot(g, -16 + k * 11, 14, 5, C.na, { ow: 2 }); break; }
    case 'kidney': { const p = P((p) => { p.moveTo(0, -46); p.bezierCurveTo(40, -48, 46, -10, 42, 8); p.bezierCurveTo(38, 38, 16, 50, -4, 46); p.bezierCurveTo(-28, 42, -34, 24, -20, 12); p.bezierCurveTo(-12, 4, -12, -4, -20, -12); p.bezierCurveTo(-34, -26, -26, -46, 0, -46); }); fill(p, '#b5473f', '#8e3029'); break; }
    case 'fat': { for (const [xx, yy, r] of [[-22, -12, 24], [20, -16, 22], [0, 20, 24]]) { ell(g, xx, yy, r, r, '#fff6dc', { ow: 4 / s }); ell(g, xx + r * 0.7, yy - r * 0.5, 6, 3, '#4b3a8a', { ow: 1.5 / s }); } break; }
    case 'brain': { const p = blob(0, 0, 50, 38, 0, 0, 0.1, 14, 3); fill(p, '#f2b6c6', '#d98ea5'); g.strokeStyle = 'rgba(120,40,70,.6)'; g.lineWidth = 3; for (const [a, b2, c2, d] of [[-30, -10, -10, 4], [0, -24, 10, 0], [20, -6, 36, 14], [-20, 16, 4, 26]]) { g.beginPath(); g.moveTo(a, b2); g.quadraticCurveTo((a + c2) / 2, b2 - 12, c2, d); g.stroke(); } break; }
    case 'stomach': { const p = P((p) => { p.moveTo(-20, -48); p.quadraticCurveTo(-30, -10, -8, 10); p.quadraticCurveTo(20, 34, 50, 14); p.lineTo(50, 30); p.quadraticCurveTo(10, 56, -30, 26); p.quadraticCurveTo(-54, 0, -36, -48); p.closePath(); }); fill(p, '#f0a6a0', '#d27c78'); break; }
    case 'pill': { const p = P((p) => { p.roundRect(-46, -18, 92, 36, 18); }); fill(p, '#ffffff'); const h = P((p) => { p.roundRect(-46, -18, 46, 36, [18, 0, 0, 18]); }); fill(h, o.col || C.gq); break; }
    default: ell(g, 0, 0, 40, 40, '#888');
  }
  g.restore();
}

// tile cu iconiță + 2 rânduri de text pe canvas (fără roșu)
export function tile(g, x, y, w, h, o, act, k) {
  const a = act ? 1 : (o.dim ?? 0.55);
  panel(g, x, y, w, h, { fill: act ? 'rgba(255,207,133,.16)' : 'rgba(255,236,200,.06)', stroke: act ? C.hi : 'rgba(255,225,180,.2)', lw: act ? 5 : 3, r: 20 });
  if (act) { g.save(); g.shadowColor = C.hi; g.shadowBlur = 20 * k; g.strokeStyle = C.hi; g.lineWidth = 3; g.beginPath(); g.roundRect(x, y, w, h, 20); g.stroke(); g.restore(); }
  if (o.ico) icon(g, o.ico, x + w / 2, y + h * 0.36, (o.is || 0.85) * Math.min(1, h / 280) * (1 + 0.08 * k), { alpha: a, ...(o.io || {}) });
  if (o.chip) pill(g, x + w / 2, y + h * 0.7, Math.min(w - 26, 220), 38, o.cc || C.gq, o.chip, { alpha: a, size: 19 });
  if (o.sub) txt(g, o.sub, x + w / 2, y + h * 0.88, o.ss || 17, C.cream, { alpha: a, w: 700, maxW: w - 16 });
}
