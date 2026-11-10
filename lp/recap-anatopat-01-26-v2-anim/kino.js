// kino.js · kitul de animație al recapitulării noi de Farmacologie (v2).
// Idei: fiecare punct (beat) are un „timp de joc” T(b,k) în secunde; pasul se joacă o dată și rămâne pe cadrul final,
// doar curgerile (sânge, ioni, molecule) merg în buclă. Componente: fundal aproape negru, trasee cu comete, grafice desenate live
// (cu vârf de creion), lupa (detaliu celular scos dintr-un organ), HUD fix (rămâne pe loc când camera face zoom), legende de pas.
import { OUT, clamp, lerp, ease, paint, blob, bb } from './kit2d.js';
export { OUT, clamp, lerp, ease, paint, blob, bb };

export const W = 1000, H = 934;
export const RED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const cam = (x, y, z) => ({ x, y, z });
export const HOME = cam(500, 467, 1);

export const K = {
  ink: '#fff3e6', dim: '#a99bb5', faint: '#6f6280', hi: '#ffe36e', warn: '#ff7a6b', ok: '#5fe08e',
  drug: '#ffa23e', drugS: '#d9781a', met: '#5fe08e', metS: '#2fae62', x: '#c57bff', xS: '#9450d6',
  blood: '#e5485d', bloodS: '#a3233a', bloodL: '#ff8fa0', vein: '#5c8dff', veinS: '#3160cf',
  body: '#2c2038', bodyL: '#59456f', skin: '#3a2a4a',
  liver: '#b0503c', liverS: '#853527', gut: '#f0a19a', gutS: '#cf7870', stomach: '#f4b392', stomachS: '#d68f6a',
  kidney: '#c4574b', kidneyS: '#983a30', heart: '#e5485d', heartS: '#ad2c40', brain: '#f2b0c8', brainS: '#d488a6',
  muscle: '#e2707a', muscleS: '#b94a55', fat: '#ffe9a8', fatS: '#e6c56a', urine: '#f6dd6a', lung: '#f3b4b4', lungS: '#d98b8b',
  mem: '#f3cf8a', memS: '#c9a258', memC: '#f8e9c8', cyto: '#2a2135', cell: '#f6e3c8', cellS: '#e0c39b',
  gs: '#4fd18b', gi: '#5aa8ff', gq: '#ff9d3c', ch: '#e7c34a', camp: '#7fe8ff', ca: '#ffe36e',
  na: '#ffb347', k: '#b58cff', cl: '#6fe0c0', an: '#9aa3b5', prot: '#b9d6ff', protS: '#7fa9e6',
  panel: 'rgba(255,240,225,.055)', panelS: 'rgba(255,230,200,.16)',
};

/* ---------- timp ---------- */
// secunde jucate din punctul k: −1 = încă neajuns, mare = deja trecut (cadrul final), altfel timpul curent
export const T = (b, k) => (b.i < 0 ? -1 : b.i > k ? 1e4 : b.i < k ? -1 : b.bt);
export const sg = (tt, t0, d) => (tt < 0 ? 0 : ease(clamp((tt - t0) / d)));
export const ln = (tt, t0, d) => (tt < 0 ? 0 : clamp((tt - t0) / d));
export const back = (u) => { u = clamp(u); const c = 1.9; return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); };
export const pop = (tt, t0, d = 0.45) => (tt < 0 ? 0 : back(clamp((tt - t0) / d)));
export const lp = (t, p) => (RED ? 0.5 : (t % p) / p);
export const pulse = (t, p = 1.2) => (RED ? 0.5 : 0.5 + 0.5 * Math.sin((t / p) * Math.PI * 2));
export const mix = (a, b, u) => { const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16)); return '#' + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(u))).toString(16).padStart(2, '0')).join(''); };
let SEED = 7; export const srand = (s) => { SEED = s; }; export const rnd = () => { SEED = (SEED * 16807) % 2147483647; return (SEED - 1) / 2147483646; };
export const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

/* ---------- fundal, lumină ---------- */
export function glowAt(g, x, y, r, c, a = 0.25) { if (a <= 0.005) return; const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, c); gr.addColorStop(1, c + '00'); g.save(); g.globalAlpha = clamp(a); g.fillStyle = gr; g.fillRect(x - r, y - r, 2 * r, 2 * r); g.restore(); }
export function bgK(g, glows = [], w = W, h = H) {
  const gr = g.createRadialGradient(w * 0.5, h * 0.4, 40, w * 0.5, h * 0.5, h);
  gr.addColorStop(0, '#1c1226'); gr.addColorStop(1, '#09050d'); g.fillStyle = gr; g.fillRect(-4000, -4000, w + 8000, h + 8000);
  for (const [x, y, r, c, a] of glows) glowAt(g, x, y, r, c, a ?? 0.16);
}
// HUD: același sistem de coordonate ca scena „acasă”, indiferent de zoomul camerei
export function hud(g, w = W, h = H) { const cw = g.canvas.width, ch = g.canvas.height; const s = Math.min(cw / w, ch / h); g.save(); g.setTransform(s, 0, 0, s, (cw - w * s) / 2, (ch - h * s) / 2); }

/* ---------- text ---------- */
export function tx(g, s, x, y, size = 22, col = K.ink, o = {}) {
  if (o.alpha !== undefined && o.alpha <= 0.01) return;
  g.save(); g.font = `${o.w || 800} ${size}px Inter, "Segoe UI", sans-serif`; g.textAlign = o.align || 'center'; g.textBaseline = 'middle';
  if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  const L = String(s).split('\n'); const lh = size * (o.lh || 1.22);
  L.forEach((line, i) => { const yy = y + (i - (L.length - 1) / 2) * lh; if (o.stroke !== false) { g.lineJoin = 'round'; g.strokeStyle = o.sc || '#0d0712'; g.lineWidth = size * 0.3; g.strokeText(line, x, yy, o.maxW); } g.fillStyle = col; g.fillText(line, x, yy, o.maxW); });
  g.restore();
}
export function tw(g, s, size = 22, w = 800) { g.save(); g.font = `${w} ${size}px Inter, "Segoe UI", sans-serif`; const m = g.measureText(s).width; g.restore(); return m; }
// etichetă-pastilă (text pe fond)
export function chip(g, x, y, s, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return; const size = o.size || 19; const w = (o.wd || tw(g, s, size, o.w || 800) + size * 1.3), h = o.h || size * 1.75;
  const sc = o.scale ?? 1; g.save(); g.translate(x, y); g.scale(sc, sc); g.globalAlpha = clamp(a);
  const p = new Path2D(); p.roundRect(-w / 2, -h / 2, w, h, o.r ?? h / 2);
  if (o.glow) { g.shadowColor = o.gc || o.fill || K.hi; g.shadowBlur = 26 * o.glow; }
  g.fillStyle = o.fill || 'rgba(20,12,28,.86)'; g.fill(p); g.shadowBlur = 0;
  g.strokeStyle = o.line || 'rgba(255,255,255,.22)'; g.lineWidth = o.lw ?? 2.5; g.stroke(p);
  g.restore();
  tx(g, s, x, y + 1, size * sc, o.col || K.ink, { stroke: false, alpha: a, w: o.w || 800 });
}
// legenda pasului (jos, în HUD): spune într-un rând ce se întâmplă acum
export function cap(g, s, a = 1, o = {}) {
  if (!s || a <= 0.01) return; const y = o.y ?? 884, size = o.size || 21; const w = Math.min(o.maxW || 900, tw(g, s, size, 700) + 56);
  g.save(); g.globalAlpha = clamp(a); const p = new Path2D(); p.roundRect((o.x ?? W / 2) - w / 2, y - 23, w, 46, 23);
  g.fillStyle = 'rgba(12,7,17,.9)'; g.fill(p); g.strokeStyle = o.line || 'rgba(255,227,110,.55)'; g.lineWidth = 2.5; g.stroke(p); g.restore();
  tx(g, s, o.x ?? W / 2, y + 1, size, o.col || K.ink, { stroke: false, alpha: a, w: 700, maxW: w - 30 });
}
// legendă pe secvență: seq = [[t0, text], …]; alege textul după timpul de joc și îl aduce cu fade
export function capSeq(g, tt, seq, o = {}) {
  if (tt < 0 || !seq.length) return; let k = 0; for (let i = 0; i < seq.length; i++) if (tt >= seq[i][0]) k = i;
  cap(g, seq[k][1], clamp((tt - seq[k][0]) / 0.35), o);
}

/* ---------- trasee ---------- */
function spline(pts, n = 14) {
  if (pts.length < 3) { const out = []; for (let k = 0; k <= n; k++) out.push([lerp(pts[0][0], pts[1][0], k / n), lerp(pts[0][1], pts[1][1], k / n)]); return out; }
  const out = []; const m = pts.length;
  for (let i = 0; i < m - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(m - 1, i + 2)];
    for (let k = 0; k < n; k++) { const u = k / n, u2 = u * u, u3 = u2 * u; out.push([0, 1].map((d) => 0.5 * ((2 * p1[d]) + (-p0[d] + p2[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * u3))); } }
  out.push(pts[m - 1]); return out;
}
export class Path {
  constructor(pts, o = {}) { this.P = o.raw ? pts : spline(pts, o.n || 14); const L = [0]; for (let k = 1; k < this.P.length; k++) L.push(L[k - 1] + Math.hypot(this.P[k][0] - this.P[k - 1][0], this.P[k][1] - this.P[k - 1][1])); this.L = L; this.len = L[L.length - 1]; }
  at(u) { const P = this.P, L = this.L; const d = clamp(u) * this.len; let a = 1, b = P.length - 1; while (a < b) { const m = (a + b) >> 1; if (L[m] < d) a = m + 1; else b = m; }
    const f = (d - L[a - 1]) / Math.max(1e-6, L[a] - L[a - 1]); return [lerp(P[a - 1][0], P[a][0], f), lerp(P[a - 1][1], P[a][1], f), Math.atan2(P[a][1] - P[a - 1][1], P[a][0] - P[a - 1][0])]; }
  p2d(u0 = 0, u1 = 1) { const p = new Path2D(); if (u1 <= u0) return p; const P = this.P, L = this.L; const a = u0 * this.len, b = u1 * this.len; const s = this.at(u0); p.moveTo(s[0], s[1]); for (let k = 1; k < P.length - 1; k++) if (L[k] > a && L[k] < b) p.lineTo(P[k][0], P[k][1]); const e = this.at(u1); p.lineTo(e[0], e[1]); return p; }
  // tub (vas, intestin, nerv): contur gros + culoare; o.u0/u1 = porțiunea, o.glow, o.dash, o.alpha, o.ow
  stroke(g, w, col, o = {}) { const p = this.p2d(o.u0 ?? 0, o.u1 ?? 1); g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); g.lineCap = o.cap || 'round'; g.lineJoin = 'round'; if (o.dash) g.setLineDash(o.dash);
    if (o.glow) { g.shadowColor = o.gc || col; g.shadowBlur = 24 * o.glow; g.strokeStyle = o.gc || col; g.lineWidth = w + 6; g.stroke(p); g.shadowBlur = 0; }
    if (o.ow !== 0) { g.strokeStyle = o.oc || OUT; g.lineWidth = w + (o.ow ?? 8); g.stroke(p); } g.strokeStyle = col; g.lineWidth = w; g.stroke(p);
    if (o.core) { g.strokeStyle = o.core; g.lineWidth = w * 0.42; g.stroke(p); } g.restore(); }
}
// bilă de medicament / moleculă: luciu, contur, opțional literă sau sarcină
export function mol(g, x, y, r, col, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01 || r <= 0.2) return; g.save(); g.globalAlpha = clamp(a);
  if (o.glow) { g.shadowColor = o.gc || col; g.shadowBlur = 18 * o.glow; }
  g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.shadowBlur = 0;
  if (o.ow !== 0) { g.strokeStyle = o.oc || OUT; g.lineWidth = o.ow ?? Math.max(2, r * 0.3); g.stroke(); }
  g.fillStyle = 'rgba(255,255,255,.55)'; g.beginPath(); g.ellipse(x - r * 0.3, y - r * 0.35, r * 0.3, r * 0.2, -0.5, 0, 7); g.fill();
  g.restore();
  if (o.s) tx(g, o.s, x, y + 0.5, o.fs || r * (o.s.length > 2 ? 0.72 : o.s.length > 1 ? 0.9 : 1.15), o.tc || '#20102a', { stroke: false, alpha: a, w: 800 });
}
// cometă: bilă cu coadă care se stinge, pe un traseu
export function comet(g, path, u, col, r = 8, o = {}) {
  if (u <= 0 || u >= 1) { if (!o.hold || u <= 0) return; u = 1; }
  const n = o.tail ?? 7; const dl = (o.len ?? 60) / path.len;
  for (let k = n; k >= 1; k--) { const uu = u - (k / n) * dl; if (uu <= 0) continue; const [x, y] = path.at(uu); g.save(); g.globalAlpha = (o.alpha ?? 1) * 0.5 * (1 - k / (n + 1)); g.fillStyle = col; g.beginPath(); g.arc(x, y, r * (1 - 0.6 * k / n), 0, 7); g.fill(); g.restore(); }
  const [x, y] = path.at(u); mol(g, x, y, r, col, { alpha: o.alpha, glow: o.glow ?? 0.7, s: o.s, ow: o.ow });
}
// curgere în buclă pe un traseu: n bile, uniform
export function stream(g, path, t, col, o = {}) {
  const n = o.n ?? 6, sp = o.speed ?? 0.2, r = o.r ?? 7, a = o.alpha ?? 1; if (a <= 0.01) return;
  for (let k = 0; k < n; k++) { let u = (k / n + (RED ? 0 : t * sp)) % 1; if (u < 0) u += 1; const uu = lerp(o.u0 ?? 0, o.u1 ?? 1, u); const [x, y] = path.at(uu); const fade = Math.min(1, u * 8, (1 - u) * 8);
    if (o.rbc) { g.save(); g.translate(x, y); g.rotate(path.at(uu)[2]); g.globalAlpha = a * fade; g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.ellipse(0, 0, r * 1.25, r * 0.8, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = 'rgba(120,20,40,.45)'; g.beginPath(); g.ellipse(0, 0, r * 0.5, r * 0.3, 0, 0, 7); g.fill(); g.restore(); }
    else mol(g, x, y, r, typeof col === 'function' ? col(uu, k) : col, { alpha: a * fade, ow: o.ow ?? 2.2, glow: o.glow }); }
}
// săgeată curbată/dreaptă cu vârf (desenată progresiv cu u)
export function arrowK(g, pts, col = K.ink, w = 6, u = 1, o = {}) {
  if (u <= 0.02) return; const P = pts instanceof Path ? pts : new Path(pts, { n: 10 }); const a = o.alpha ?? 1;
  P.stroke(g, w, col, { u1: clamp(u) * 0.985, ow: o.ow ?? 6, alpha: a, dash: o.dash });
  const [x, y, an] = P.at(clamp(u)); const s = o.head ?? w * 2.6; g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(an);
  g.beginPath(); g.moveTo(s * 0.9, 0); g.lineTo(-s * 0.6, s * 0.75); g.lineTo(-s * 0.6, -s * 0.75); g.closePath(); g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 4; g.lineJoin = 'round'; g.stroke(); g.fill(); g.restore();
}
export function crossK(g, x, y, s = 22, a = 1, col = K.warn) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round'; const k = back(a); for (const [c, w] of [[OUT, s * 0.62], [col, s * 0.34]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - s * k, y - s * k); g.lineTo(x + s * k, y + s * k); g.moveTo(x + s * k, y - s * k); g.lineTo(x - s * k, y + s * k); g.stroke(); } g.restore(); }
export function tick(g, x, y, s = 20, a = 1, col = K.ok) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round'; g.lineJoin = 'round'; for (const [c, w] of [[OUT, s * 0.62], [col, s * 0.34]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - s, y); g.lineTo(x - s * 0.3, y + s * 0.7); g.lineTo(x + s, y - s * 0.7); g.stroke(); } g.restore(); }
export function panel(g, x, y, w, h, o = {}) { g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); const p = new Path2D(); p.roundRect(x, y, w, h, o.r ?? 22); if (o.glow) { g.shadowColor = o.gc || K.hi; g.shadowBlur = 30 * o.glow; } g.fillStyle = o.fill || K.panel; g.fill(p); g.shadowBlur = 0; g.strokeStyle = o.line || K.panelS; g.lineWidth = o.lw || 2.5; g.stroke(p); g.restore(); }
export function ring(g, x, y, r, col, a = 1, w = 5) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.shadowColor = col; g.shadowBlur = 18; g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.restore(); }
export function shape(g, path, fill, o = {}) { g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); if (o.glow) { g.shadowColor = o.gc || fill; g.shadowBlur = 26 * o.glow; g.fillStyle = fill; g.fill(path); g.shadowBlur = 0; } paint(g, path, fill, o.shade || null, o.light || null, o.box || [0, 0, 1, 1], o.oc || OUT, o.ow ?? 5); g.restore(); }
export function ellK(g, x, y, rx, ry, fill, o = {}) { const p = new Path2D(); p.ellipse(x, y, Math.max(0.5, rx), Math.max(0.5, ry), o.rot || 0, 0, 7); shape(g, p, fill, { ...o, box: [x - rx, y - ry, rx * 2, ry * 2] }); return p; }
export function rectK(g, x, y, w, h, fill, o = {}) { const p = new Path2D(); p.roundRect(x, y, w, h, o.r ?? 10); shape(g, p, fill, { ...o, box: [x, y, w, h] }); return p; }

/* ---------- grafic desenat live ---------- */
// o = {x,y,w,h, xmax, ymax, ymin, xl, yl, xt:[[v,label]], yt:[[v,label]], alpha, grid, title}
export function plot(g, o) {
  const a = o.alpha ?? 1; const ymin = o.ymin || 0; const X = (v) => o.x + (v / o.xmax) * o.w, Y = (v) => o.y + o.h - ((v - ymin) / (o.ymax - ymin)) * o.h;
  if (a <= 0.01) return { X, Y, o };
  g.save(); g.globalAlpha = clamp(a);
  if (o.box !== false) { const p = new Path2D(); p.roundRect(o.x - 58, o.y - (o.title ? 44 : 22), o.w + 84, o.h + (o.title ? 96 : 74), 20); g.fillStyle = o.fill || 'rgba(255,240,225,.05)'; g.fill(p); g.strokeStyle = o.line || 'rgba(255,230,200,.15)'; g.lineWidth = 2.5; g.stroke(p); }
  g.strokeStyle = 'rgba(255,243,230,.1)'; g.lineWidth = 1.5;
  (o.yt || []).forEach(([v]) => { g.beginPath(); g.moveTo(o.x, Y(v)); g.lineTo(o.x + o.w, Y(v)); g.stroke(); });
  if (o.grid) (o.xt || []).forEach(([v]) => { g.beginPath(); g.moveTo(X(v), o.y); g.lineTo(X(v), o.y + o.h); g.stroke(); });
  g.strokeStyle = K.ink; g.lineWidth = 4; g.lineCap = 'round'; g.lineJoin = 'round'; const y0 = Y(Math.max(ymin, 0));
  g.beginPath(); g.moveTo(o.x, o.y - 8); g.lineTo(o.x, o.y + o.h); g.moveTo(o.x, y0); g.lineTo(o.x + o.w + 10, y0); g.stroke();
  g.fillStyle = K.ink; g.beginPath(); g.moveTo(o.x, o.y - 20); g.lineTo(o.x - 7, o.y - 6); g.lineTo(o.x + 7, o.y - 6); g.fill(); g.beginPath(); g.moveTo(o.x + o.w + 22, y0); g.lineTo(o.x + o.w + 8, y0 - 7); g.lineTo(o.x + o.w + 8, y0 + 7); g.fill();
  g.restore();
  const fs = o.fs || 15;
  (o.xt || []).forEach(([v, l]) => tx(g, l ?? String(v), X(v), y0 + fs + 4, fs, K.dim, { stroke: false, alpha: a, w: 600 }));
  (o.yt || []).forEach(([v, l]) => tx(g, l ?? String(v), o.x - 10, Y(v), fs, K.dim, { stroke: false, alpha: a, w: 600, align: 'right' }));
  if (o.xl) tx(g, o.xl, o.x + o.w, y0 + fs * 2 + 14, fs + 1, K.dim, { stroke: false, alpha: a, w: 700, align: 'right' });
  if (o.yl) tx(g, o.yl, o.x + 12, o.y - 6, fs + 1, K.dim, { stroke: false, alpha: a, w: 700, align: 'left' });
  if (o.title) tx(g, o.title, o.x + o.w / 2, o.y - 22, o.ts || 19, o.tc || K.ink, { stroke: false, alpha: a });
  return { X, Y, o };
}
// desenează f(x) de la x0 până la x0+(x1−x0)·u, cu vârf de creion luminos; o.fill = aria de sub curbă; întoarce [xpix, ypix] al vârfului
export function trace(g, pl, f, x0, x1, u, col, o = {}) {
  u = clamp(u); if (u <= 0 || (o.alpha !== undefined && o.alpha <= 0.01)) return null; const n = o.n || 90; const xe = lerp(x0, x1, u); const pts = [];
  for (let k = 0; k <= n; k++) { const x = lerp(x0, xe, k / n); pts.push([pl.X(x), pl.Y(f(x))]); }
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  if (o.fill) { const base = pl.Y(o.base ?? Math.max(pl.o.ymin || 0, 0)); g.beginPath(); g.moveTo(pts[0][0], base); pts.forEach((p) => g.lineTo(p[0], p[1])); g.lineTo(pts[n][0], base); g.closePath(); g.fillStyle = o.fill; g.globalAlpha *= o.fa ?? 1; g.fill(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); else g.globalAlpha = 1; }
  g.lineCap = 'round'; g.lineJoin = 'round'; if (o.dash) g.setLineDash(o.dash);
  const stroke = () => { g.beginPath(); pts.forEach((p, k) => (k ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.stroke(); };
  if (o.ow !== 0 && !o.dash) { g.strokeStyle = '#0d0712'; g.lineWidth = (o.w || 6) + 5; stroke(); }
  g.strokeStyle = col; g.lineWidth = o.w || 6; stroke(); g.setLineDash([]);
  const [px, py] = pts[n];
  if (u < 1 && o.pen !== false) { g.shadowColor = col; g.shadowBlur = 22; g.fillStyle = '#fff'; g.beginPath(); g.arc(px, py, (o.w || 6) * 0.95 + 2, 0, 7); g.fill(); g.shadowBlur = 0; g.strokeStyle = col; g.lineWidth = 3; g.stroke(); }
  g.restore(); return [px, py];
}
export function hline(g, pl, v, col, label, o = {}) { const a = o.alpha ?? 1; if (a <= 0.01) return; const y = pl.Y(v); g.save(); g.globalAlpha = clamp(a); g.strokeStyle = col; g.lineWidth = o.w || 3; g.setLineDash(o.dash || [10, 8]); g.beginPath(); g.moveTo(pl.o.x, y); g.lineTo(pl.o.x + pl.o.w * (o.u ?? 1), y); g.stroke(); g.restore(); if (label) tx(g, label, o.lx ?? pl.o.x + pl.o.w - 4, y - (o.dy ?? 13), o.size || 15, col, { align: o.align || 'right', alpha: a, w: 700 }); }
export function pt(g, pl, x, y, col, o = {}) { const a = o.alpha ?? 1; if (a <= 0.01) return; const s = back(a); mol(g, pl.X(x), pl.Y(y), (o.r || 9) * s, col, { alpha: a, glow: o.glow ?? 0.6 }); if (o.label) tx(g, o.label, pl.X(x) + (o.dx ?? 0), pl.Y(y) + (o.dy ?? -22), o.size || 16, o.tc || col, { alpha: a, align: o.align }); }

/* ---------- lupa: detaliul celular scos dintr-un organ ---------- */
export function lens(g, cx, cy, r, sx, sy, a, draw, o = {}) {
  if (a <= 0.01) return; const s = back(clamp(a)); const R = r * s; const x = lerp(sx, cx, s), y = lerp(sy, cy, s);
  g.save(); g.globalAlpha = clamp(a * 1.4);
  // conul de la sursă
  const an = Math.atan2(y - sy, x - sx); g.fillStyle = 'rgba(255,227,110,.12)'; g.strokeStyle = 'rgba(255,227,110,.5)'; g.lineWidth = 2;
  g.beginPath(); g.moveTo(sx, sy); g.lineTo(x + Math.cos(an + 1.57) * R, y + Math.sin(an + 1.57) * R); g.lineTo(x + Math.cos(an - 1.57) * R, y + Math.sin(an - 1.57) * R); g.closePath(); g.fill(); g.stroke();
  ring(g, sx, sy, o.sr || 16, K.hi, 0.9, 3.5);
  g.shadowColor = 'rgba(0,0,0,.7)'; g.shadowBlur = 30; g.fillStyle = o.bg || '#1a1222'; g.beginPath(); g.arc(x, y, R, 0, 7); g.fill(); g.shadowBlur = 0;
  g.save(); g.beginPath(); g.arc(x, y, R, 0, 7); g.clip(); g.translate(x, y); g.scale(s, s); draw(g); g.restore();
  g.strokeStyle = OUT; g.lineWidth = 13; g.beginPath(); g.arc(x, y, R, 0, 7); g.stroke(); g.strokeStyle = o.rim || K.hi; g.lineWidth = 6; g.stroke();
  g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.arc(x, y, R - 12, -2.5, -1.9); g.stroke();
  g.restore();
  if (o.title) chip(g, x, y - R - 4, o.title, { size: 17, alpha: a, fill: '#2a1d10', line: K.hi, col: K.hi });
}

/* ---------- membrană, receptori, canale ---------- */
// dublu strat lipidic orizontal; capetele se leagănă ușor
export function bilayer(g, x0, x1, y, t = 0, o = {}) {
  const h = o.h || 56; g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  g.fillStyle = o.core || K.memC; g.fillRect(x0, y - h / 2 + 8, x1 - x0, h - 16);
  const st = o.step || 17; g.lineWidth = 2.2; g.strokeStyle = '#d7b779';
  for (let x = x0 + st / 2, k = 0; x < x1; x += st, k++) { const sw = RED ? 0 : Math.sin(t * 1.6 + k * 0.9) * 1.6; g.beginPath(); g.moveTo(x, y - h / 2 + 9); g.lineTo(x + sw, y - 3); g.moveTo(x, y + h / 2 - 9); g.lineTo(x - sw, y + 3); g.stroke(); }
  for (const yy of [y - h / 2 + 7, y + h / 2 - 7]) for (let x = x0 + st / 2; x < x1; x += st) { if (o.gaps && o.gaps.some(([a, b]) => x > a && x < b)) continue; g.fillStyle = o.head || K.mem; g.strokeStyle = OUT; g.lineWidth = 2.2; g.beginPath(); g.arc(x, yy, st * 0.44, 0, 7); g.fill(); g.stroke(); }
  if (o.gaps) for (const [a, b] of o.gaps) { g.clearRect; }
  g.restore();
}
// receptor cuplat cu proteină G: 7 helixuri transmembranare legate prin bucle; o.act = activat (se strânge și luminează)
export function gpcr(g, x, y, col, o = {}) {
  const s = o.s || 1, act = o.act || 0; g.save(); g.translate(x, y); g.scale(s, s); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  if (act > 0.02) { g.shadowColor = o.gc || K.hi; g.shadowBlur = 34 * act; }
  const dark = mix(col, '#000000', 0.28); g.lineCap = 'round'; g.lineJoin = 'round';
  // buclele
  g.strokeStyle = OUT; g.lineWidth = 9; const lp2 = (k, up) => { const xa = (k - 3) * 15, xb = (k - 2) * 15; g.beginPath(); g.moveTo(xa, up ? -44 : 44); g.quadraticCurveTo((xa + xb) / 2, up ? -64 - act * 4 : 64, xb, up ? -44 : 44); };
  for (let k = 0; k < 6; k++) { lp2(k, k % 2 === 1); g.strokeStyle = OUT; g.lineWidth = 9; g.stroke(); g.strokeStyle = dark; g.lineWidth = 4.5; g.stroke(); }
  for (let k = 0; k < 7; k++) { const xx = (k - 3) * 15 * (1 - act * 0.07); const p = new Path2D(); p.roundRect(xx - 6.6, -46, 13.2, 92, 6.6); g.fillStyle = k % 2 ? dark : col; g.fill(p); g.shadowBlur = 0; g.strokeStyle = OUT; g.lineWidth = 3.4; g.stroke(p); g.fillStyle = 'rgba(255,255,255,.3)'; g.fillRect(xx - 3.6, -40, 2.6, 80); }
  // buzunarul pentru ligand
  g.fillStyle = OUT; g.beginPath(); g.ellipse(0, -52, 15, 8, 0, 0, Math.PI); g.fill();
  g.restore();
  if (o.label) tx(g, o.label, x, y + (o.ly ?? 86) * s, (o.size || 20) * s, col, { alpha: o.alpha });
}
// proteina G: α (cu GDP/GTP) + βγ; o.split = cât s-a desprins α (0..1), o.tok = 'GDP' | 'GTP'
export function gprotK(g, x, y, col, o = {}) {
  const s = o.s || 1, sp = o.split || 0, a = o.alpha ?? 1; if (a <= 0.01) return;
  const ax = x + (o.dx || 0) * sp, ay = y + (o.dy || 0) * sp;
  ellK(g, x + 44 * s + sp * 6, y + 6 * s, 26 * s, 19 * s, '#cbb9e8', { alpha: a, ow: 4, shade: '#a892cf' }); tx(g, 'βγ', x + 44 * s + sp * 6, y + 7 * s, 17 * s, '#2a1534', { stroke: false, alpha: a });
  ellK(g, ax, ay, 36 * s, 25 * s, col, { alpha: a, ow: 4, glow: o.glow, light: '#ffffff', shade: mix(col, '#000000', 0.25) }); tx(g, o.name || 'α', ax - 8 * s, ay, 19 * s, '#20102a', { stroke: false, alpha: a });
  const gtp = o.tok === 'GTP'; chip(g, ax + 16 * s, ay - 24 * s, o.tok || 'GDP', { size: 12 * s, fill: gtp ? K.hi : '#8d7fa0', col: '#20102a', line: OUT, lw: 2.5, alpha: a, glow: gtp ? 0.6 : 0 });
}
// canal ionic în membrană: două jumătăți care se depărtează; open 0..1
export function chan(g, x, y, open, col = K.ch, o = {}) {
  const s = o.s || 1, h = (o.h || 86) * s, w = 22 * s, gap = lerp(1.5, 13, clamp(open)) * s; g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  if (o.glow) { g.shadowColor = o.gc || col; g.shadowBlur = 28 * o.glow; }
  for (const d of [-1, 1]) { const p = new Path2D(); const xx = x + d * (gap + w / 2); p.moveTo(xx - w / 2, y - h / 2 + 8 * s); p.quadraticCurveTo(xx - w / 2, y - h / 2, xx, y - h / 2); p.quadraticCurveTo(xx + w / 2, y - h / 2, xx + w / 2, y - h / 2 + 8 * s); p.lineTo(xx + w / 2 - (d > 0 ? 0 : 5 * s * (1 - open)), y); p.lineTo(xx + w / 2, y + h / 2 - 8 * s); p.quadraticCurveTo(xx + w / 2, y + h / 2, xx, y + h / 2); p.quadraticCurveTo(xx - w / 2, y + h / 2, xx - w / 2, y + h / 2 - 8 * s); p.lineTo(xx - w / 2 + (d > 0 ? 5 * s * (1 - open) : 0), y); p.closePath();
    paint(g, p, col, mix(col, '#000000', 0.25), null, [xx - w / 2, y - h / 2, w, h], OUT, 4); g.shadowBlur = 0; }
  g.restore();
}
// ion: bilă mică cu simbol
export function ion(g, x, y, sym, col, r = 13, o = {}) { mol(g, x, y, r, col, { ...o, s: sym, fs: r * (sym.length > 2 ? 0.8 : 0.95), ow: 2.4 }); }
// nor de ioni care plutesc (brownian determinist) într-un dreptunghi
export function cloud(g, n, x, y, w, h, t, sym, col, r = 12, seed = 1, o = {}) {
  for (let k = 0; k < n; k++) { const hx = hash(seed * 31 + k), hy = hash(seed * 57 + k * 3); const px = x + hx * w + (RED ? 0 : Math.sin(t * (0.5 + hx) + k) * 9), py = y + hy * h + (RED ? 0 : Math.cos(t * (0.4 + hy) + k * 2) * 8); ion(g, px, py, sym, col, r, o); }
}
// manometru / cadran: v 0..1
export function dial(g, x, y, R, v, label, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a);
  g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = R * 0.34; g.beginPath(); g.arc(x, y, R, Math.PI, 0); g.stroke();
  const segs = o.segs || [[0, 0.33, K.vein], [0.33, 0.67, K.ok], [0.67, 1, K.warn]]; g.lineCap = 'butt';
  for (const [u0, u1, c] of segs) { g.strokeStyle = c; g.lineWidth = R * 0.22; g.beginPath(); g.arc(x, y, R, Math.PI + u0 * Math.PI, Math.PI + u1 * Math.PI); g.stroke(); }
  const an = Math.PI + clamp(v) * Math.PI; g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 9; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(an) * R * 0.86, y + Math.sin(an) * R * 0.86); g.stroke(); g.strokeStyle = K.ink; g.lineWidth = 4.5; g.stroke();
  g.fillStyle = K.ink; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 8, 0, 7); g.fill(); g.stroke(); g.restore();
  if (label) tx(g, label, x, y + 24, o.size || 17, o.col || K.ink, { alpha: a });
}
// bară verticală de nivel (ex.: fracția liberă)
export function meter(g, x, y, w, h, v, col, label, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); const p = new Path2D(); p.roundRect(x, y, w, h, w / 2); g.fillStyle = 'rgba(255,255,255,.07)'; g.fill(p); g.save(); g.clip(p); g.fillStyle = col; g.fillRect(x, y + h * (1 - clamp(v)), w, h); g.restore(); g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(p); g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 2.5; g.stroke(p); g.restore();
  if (label) tx(g, label, x + w / 2, y + h + 22, o.size || 16, o.col || K.ink, { alpha: a });
}

/* ---------- organe în secțiune, lanțuri de pastile ---------- */
// tub în secțiune transversală (bronhie, vas): inel de mușchi neted + mucoasă + lumen; open 0..1 = cât de larg e lumenul
export function tubeX(g, x, y, R, open, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return; const lum = lerp(R * 0.2, R * 0.66, clamp(open)); const mus = o.mus || K.muscle;
  ellK(g, x, y, R, R, mus, { ow: 5, alpha: a, shade: mix(mus, '#000000', 0.25), glow: o.glow, gc: o.gc });
  g.save(); g.globalAlpha = a * 0.55; g.strokeStyle = '#ffd9dd'; g.lineWidth = 2; const n = 14; for (let k = 0; k < n; k++) { const an = (k / n) * Math.PI * 2; g.beginPath(); g.arc(x, y, (R + lum) / 2 + 4, an, an + 0.28); g.stroke(); } g.restore();
  ellK(g, x, y, lum + R * 0.1, lum + R * 0.1, o.muc || '#f6c9cf', { ow: 4, alpha: a });
  ellK(g, x, y, lum, lum, o.lumen || '#150c1c', { ow: 4, alpha: a });
  if (o.blood) for (let k = 0; k < 5; k++) { const an = k * 1.26 + (o.t || 0) * 0.6; const rr = lum * 0.55; if (lum > 10) mol(g, x + Math.cos(an) * rr, y + Math.sin(an) * rr * 0.9, Math.min(9, lum * 0.22), K.blood, { alpha: a, ow: 2 }); }
}
// lanț de pastile cu săgeți: items = [text | [text, culoare]]; q(k) = cât e aprinsă pastila k (0..1)
export function chain(g, x, y, items, q, o = {}) {
  const size = o.size || 16, gap = o.gap ?? 26, vert = o.vert; let cx = x, cy = y;
  items.forEach((it, k) => { const [s, c] = Array.isArray(it) ? it : [it, o.col || K.hi]; const w = tw(g, s, size, 800) + size * 1.3; const u = clamp(q(k)); const px = vert ? x : cx + w / 2, py = vert ? cy : y;
    chip(g, px, py, s, { size, fill: u > 0.5 ? '#2a1d10' : 'rgba(20,12,28,.86)', line: u > 0.02 ? c : 'rgba(255,255,255,.18)', col: u > 0.5 ? c : K.faint, lw: 3, alpha: o.alpha ?? 1, glow: u > 0.5 && u < 0.999 ? 0.5 : 0, scale: 1 + 0.08 * Math.sin(u * Math.PI) });
    if (k < items.length - 1) { if (vert) { arrowK(g, [[x, cy + size * 1.0], [x, cy + size * 1.0 + gap - 4]], u > 0.5 ? c : K.faint, 3.5, 1, { head: 8, ow: 3, alpha: o.alpha }); cy += size * 1.75 + gap; } else { arrowK(g, [[cx + w + 4, y], [cx + w + gap - 5, y]], u > 0.5 ? c : K.faint, 3.5, 1, { head: 8, ow: 3, alpha: o.alpha }); cx += w + gap; } } });
}
// chenarul albastru pe desen: marchează ce e „în plus · nu e în LP”
export function extra(g, x, y, s, a = 1, o = {}) { chip(g, x, y, s, { size: o.size || 15, fill: 'rgba(59,130,246,.2)', line: '#3B82F6', col: '#DCE7FB', lw: 3, alpha: a, w: 700 }); }
