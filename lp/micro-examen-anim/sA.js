// Partea A (coperta, „Înainte să începi”, LP 1–2): scenele 2D. Toate exporturile au prefixul a_.
// Regula de corectitudine: înaintea fiecărei scene scrie ce trebuie să se vadă (de unde pleacă, încotro merge,
// unde se oprește, ce culoare are, în ce ordine apar etapele). Desenul face exact asta.
import {
  W, H, HOME, M, bg, panel, P, on, loopT, txt, pill, tube, dot, ell, arr, ring, plate, colony, testTube, coccus, bacillus, loop, photo,
  OUT, clamp, lerp, ease, REDUCED,
} from './mk.js';

/* ------------------------------------------------------------------ helperi locali */
let SD = 1;
const sr = (s) => { SD = s; };
const R = (a = 0, b = 1) => { SD = (SD * 16807) % 2147483647; return a + (b - a) * ((SD - 1) / 2147483646); };
const TT = (t) => (REDUCED ? 0 : t);
const T = (g, s, x, y, size = 18, col = M.cream, o = {}) => txt(g, s, x, y, size, col, { w: 700, ...o });
const hex = (c) => { c = c.replace('#', ''); return [0, 2, 4].map((i) => parseInt(c.substr(i, 2), 16)); };
const mix = (a, b, f) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(f)))).join(',')})`; };
const DEAD = '#8d8781';
const COL = { cv: '#6a2fb0', cvi: '#4a1d86', pink: '#e25472', red: '#d8243c', blueBg: '#6f9fe0', mb: '#2f62d6', saf: '#d6336c', mv: '#7a3fc0' };
// progresul în beat-ul curent (0..1), pe toată durata
const fb = (b, k = 0.85) => clamp(b.bt / (b.bd * k));

function flame(g, x, y, s = 1, t = 0, a = 1) {
  if (a <= 0.01) return;
  const fl = REDUCED ? 1 : 1 + 0.08 * Math.sin(t * 13) + 0.05 * Math.sin(t * 7.3);
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s * fl);
  const p = new Path2D(); p.moveTo(0, -62); p.bezierCurveTo(26, -30, 30, -6, 22, 10); p.bezierCurveTo(14, 26, -14, 26, -22, 10); p.bezierCurveTo(-30, -6, -26, -30, 0, -62); p.closePath();
  g.fillStyle = '#ff8a2a'; g.fill(p); g.lineWidth = 4; g.strokeStyle = OUT; g.stroke(p);
  const q = new Path2D(); q.moveTo(0, -34); q.bezierCurveTo(13, -16, 14, 0, 9, 9); q.bezierCurveTo(4, 17, -4, 17, -9, 9); q.bezierCurveTo(-14, 0, -13, -16, 0, -34); q.closePath();
  g.fillStyle = '#ffe36e'; g.fill(q);
  g.restore();
}
function burner(g, x, y, t, a = 1) { // bec de gaz: flacăra deasupra
  g.save(); g.globalAlpha = clamp(a);
  g.fillStyle = '#7d8a93'; g.strokeStyle = OUT; g.lineWidth = 5;
  g.beginPath(); g.roundRect(x - 12, y - 10, 24, 70, 5); g.fill(); g.stroke();
  g.beginPath(); g.roundRect(x - 40, y + 56, 80, 16, 6); g.fill(); g.stroke();
  g.restore();
  flame(g, x, y - 12, 1, t, a);
}
function spore(g, x, y, s = 1, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  const k = clamp(o.dead || 0);
  ell(g, x, y, 15 * s, 10 * s, mix('#3fae6a', DEAD, k), { ow: 5 * s, rot: o.rot || 0, alpha: a });
  ell(g, x, y, 8 * s, 5 * s, mix('#bff0d2', '#c8c2bc', k), { ow: 0, rot: o.rot || 0, alpha: a });
  if (k > 0.5) xmark(g, x, y, 0.7 * s, (k - 0.5) * 2 * a);
}
function rod(g, x, y, len, w, rot, col, a = 1, dead = 0) {
  bacillus(g, x, y, len, w, rot, dead > 0 ? mix(col.startsWith('#') ? col : '#e25472', DEAD, dead) : col, a);
  if (dead > 0.5) xmark(g, x, y, 0.6 * w / 12, (dead - 0.5) * 2 * a);
}
function xmark(g, x, y, s = 1, a = 1) {
  if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round';
  for (const [c, w] of [[OUT, 9 * s], ['#ff4d4d', 5 * s]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - 11 * s, y - 11 * s); g.lineTo(x + 11 * s, y + 11 * s); g.moveTo(x + 11 * s, y - 11 * s); g.lineTo(x - 11 * s, y + 11 * s); g.stroke(); }
  g.restore();
}
function check(g, x, y, s = 1, a = 1) {
  if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round'; g.lineJoin = 'round';
  for (const [c, w] of [[OUT, 10 * s], ['#5ee08a', 6 * s]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - 12 * s, y); g.lineTo(x - 3 * s, y + 10 * s); g.lineTo(x + 14 * s, y - 12 * s); g.stroke(); }
  g.restore();
}
function thermo(g, x, y, h, f, o = {}) { // termometru vertical: (x, y) = vârful; bulbul jos; f = nivel 0..1
  g.save(); g.globalAlpha = clamp(o.alpha ?? 1);
  g.fillStyle = '#f4f1ee'; g.strokeStyle = OUT; g.lineWidth = 5;
  g.beginPath(); g.roundRect(x - 11, y, 22, h, 11); g.fill(); g.stroke();
  g.beginPath(); g.arc(x, y + h + 10, 18, 0, 7); g.fillStyle = o.col || '#e0443e'; g.fill(); g.stroke();
  g.fillStyle = o.col || '#e0443e'; const lv = (h - 14) * clamp(f); g.fillRect(x - 5, y + h - lv, 10, lv + 6);
  g.restore();
}
function gauge(g, x, y, r, f, a = 1) {
  g.save(); g.globalAlpha = clamp(a);
  g.fillStyle = '#f4f1ee'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke();
  g.strokeStyle = '#c9c2b5'; g.lineWidth = 3; for (let k = 0; k <= 6; k++) { const an = Math.PI * 0.8 + k / 6 * Math.PI * 1.4; g.beginPath(); g.moveTo(x + Math.cos(an) * r * 0.72, y + Math.sin(an) * r * 0.72); g.lineTo(x + Math.cos(an) * r * 0.9, y + Math.sin(an) * r * 0.9); g.stroke(); }
  const an = Math.PI * 0.8 + clamp(f) * Math.PI * 1.4;
  g.strokeStyle = '#d8243c'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(an) * r * 0.78, y + Math.sin(an) * r * 0.78); g.stroke();
  g.fillStyle = OUT; g.beginPath(); g.arc(x, y, 6, 0, 7); g.fill();
  g.restore();
}
function clock(g, x, y, r, f, a = 1, col = '#ffe36e') {
  g.save(); g.globalAlpha = clamp(a);
  g.fillStyle = '#f4f1ee'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke();
  if (f > 0) { g.fillStyle = col; g.beginPath(); g.moveTo(x, y); g.arc(x, y, r * 0.8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(f)); g.closePath(); g.fill(); }
  g.strokeStyle = OUT; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.lineTo(x, y - r * 0.7); g.stroke();
  g.restore();
}
function zig(g, x0, y0, x1, y1, amp, n, col, w, ph = 0, a = 1, u1 = 1) { // rază ondulată
  if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round'; g.lineJoin = 'round';
  const L = Math.hypot(x1 - x0, y1 - y0), nx = -(y1 - y0) / L, ny = (x1 - x0) / L; const N = 60;
  for (const [c, ww] of [[OUT, w + 5], [col, w]]) {
    g.strokeStyle = c; g.lineWidth = ww; g.beginPath();
    for (let k = 0; k <= N * u1; k++) { const u = k / N; const s = Math.sin(u * n * Math.PI * 2 + ph) * amp; const x = lerp(x0, x1, u) + nx * s, y = lerp(y0, y1, u) + ny * s; k ? g.lineTo(x, y) : g.moveTo(x, y); }
    g.stroke();
  }
  g.restore();
}
function cup(g, x, y, w, h, fill, lvl = 0.6, a = 1, lab = '') { // pahar de recoltare, (x, y) = centrul gurii
  g.save(); g.globalAlpha = clamp(a);
  const p = new Path2D(); p.moveTo(x - w / 2, y); p.lineTo(x - w * 0.42, y + h); p.lineTo(x + w * 0.42, y + h); p.lineTo(x + w / 2, y); p.closePath();
  g.save(); g.clip(p); g.fillStyle = fill; g.fillRect(x - w, y + h * (1 - lvl), w * 2, h); g.restore();
  g.fillStyle = 'rgba(220,245,255,.18)'; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(p);
  g.fillStyle = '#c9c2b5'; g.beginPath(); g.roundRect(x - w / 2 - 5, y - 16, w + 10, 18, 5); g.fill(); g.stroke();
  g.restore();
  if (lab) T(g, lab, x, y + h + 26, 16, M.cream, { alpha: a });
}
function bottle(g, x, y, s, capCol, a = 1) { // flacon de hemocultură
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s);
  const p = new Path2D(); p.moveTo(-12, -40); p.lineTo(-12, -28); p.bezierCurveTo(-30, -22, -30, -10, -30, 0); p.lineTo(-30, 44); p.quadraticCurveTo(-30, 50, -24, 50); p.lineTo(24, 50); p.quadraticCurveTo(30, 50, 30, 44); p.lineTo(30, 0); p.bezierCurveTo(30, -10, 30, -22, 12, -28); p.lineTo(12, -40); p.closePath();
  g.save(); g.clip(p); g.fillStyle = '#f2d98c'; g.fillRect(-30, 8, 60, 44); g.restore();
  g.fillStyle = 'rgba(220,245,255,.2)'; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(p);
  g.fillStyle = capCol; g.beginPath(); g.roundRect(-16, -54, 32, 16, 4); g.fill(); g.stroke();
  g.restore();
}
function swab(g, x, y, rot, a = 1, len = 120) { // tampon: tijă + vată
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(rot);
  g.strokeStyle = OUT; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.lineTo(len, 0); g.stroke();
  g.strokeStyle = '#e8dcc6'; g.lineWidth = 5; g.stroke();
  ell(g, 0, 0, 16, 10, '#fbf7ef', { ow: 4 });
  g.restore();
}
function virus(g, x, y, r, col = '#ff7a3d', a = 1, dead = 0) {
  if (a <= 0.01) return;
  const c = dead ? mix(col, DEAD, dead) : col;
  g.save(); g.globalAlpha = clamp(a);
  g.strokeStyle = OUT; g.lineWidth = 3;
  for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2; g.beginPath(); g.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); g.lineTo(x + Math.cos(an) * r * 1.45, y + Math.sin(an) * r * 1.45); g.stroke(); }
  g.restore();
  dot(g, x, y, r, c, { alpha: a, ow: 3 });
}
function diplo(g, x, y, s, rot, col, a = 1, kind = 'ren') { // diplococ: reniform (Neisseria) sau lanceolat (pneumococ)
  if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  for (const sg of [-1, 1]) {
    const p = new Path2D();
    if (kind === 'ren') { // boabe de cafea: fețele plate (ușor concave) spre interior
      p.moveTo(sg * 3, -15); p.quadraticCurveTo(sg * 7, 0, sg * 3, 15); p.bezierCurveTo(sg * 20, 18, sg * 26, 6, sg * 26, 0); p.bezierCurveTo(sg * 26, -6, sg * 20, -18, sg * 3, -15);
    } else { // lanceolat: capetele late alăturate, vârfurile ascuțite spre exterior
      p.moveTo(sg * 2, -13); p.bezierCurveTo(sg * 16, -13, sg * 26, -6, sg * 34, 0); p.bezierCurveTo(sg * 26, 6, sg * 16, 13, sg * 2, 13); p.quadraticCurveTo(sg * -1, 0, sg * 2, -13);
    }
    p.closePath(); g.fillStyle = col; g.fill(p); g.lineJoin = 'round'; g.lineWidth = 4; g.strokeStyle = OUT; g.stroke(p);
  }
  g.restore();
}
function field(g, x, y, r, fill, fn, o = {}) { // câmp microscopic circular, conținutul desenat în clip
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  g.beginPath(); g.arc(x, y, r, 0, 7); g.fillStyle = fill; g.fill();
  g.save(); g.clip(); fn(); g.restore();
  g.lineWidth = 8; g.strokeStyle = OUT; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke();
  g.lineWidth = 4; g.strokeStyle = 'rgba(255,255,255,.25)'; g.beginPath(); g.arc(x, y, r + 7, 0, 7); g.stroke();
  g.restore();
}
function egg(g, x, y, s, col = '#a8452a', a = 1, rot = 0, flat = false) { // ou de helmint (flat = Enterobius, turtit pe o parte)
  if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  const p = new Path2D();
  if (flat) { p.moveTo(-22, 0); p.bezierCurveTo(-22, -16, 22, -16, 22, 0); p.bezierCurveTo(22, 9, -22, 9, -22, 0); }
  else p.ellipse(0, 0, 22, 14, 0, 0, 7);
  p.closePath(); g.fillStyle = col; g.fill(p); g.lineWidth = 4; g.strokeStyle = OUT; g.stroke(p);
  g.fillStyle = 'rgba(255,240,210,.45)'; g.beginPath(); g.ellipse(0, flat ? -3 : 0, 13, 7, 0, 0, 7); g.fill();
  g.restore();
}
function hdr(g, s, x, y, col, o = {}) { pill(g, x, y, o.w || 260, o.h || 46, col, s, { size: o.size || 19, glow: o.glow || 0, alpha: o.alpha }); }

/* =================================================================== 1 · COPERTA
 Ce se vede: stânga = Partea A (6 plăcuțe LP 1–6, fiecare cu mecanismul ei în mișcare: ansa se înroșește în flacără;
 coci violet (Gram +) și bacili roz (Gram −); colonii care cresc pe geloza-sânge; tubul cu roșu fenol care virează din roșu
 în galben (acid); pe Mueller-Hinton discurile își lărgesc zona clară de inhibiție în covorul de creștere; oul urcă la suprafață
 în soluția hipertonă). Dreapta = Partea B: 4 cărți care se întorc de pe „?” pe poza reală (întâi poza, apoi răspunsul).
 Jos = tabla: zahărul → mediul → culoarea virează de la culoarea alcalină la cea acidă (Chapman roșu → galben; MacConkey: colonii
 incolore → roz; geloza lactozată albastră → galben). Pe intro se aprind pe rând: A → antibiograma → tabla → B. */
export function a_cover() {
  const TL = [[40, 125], [265, 125], [40, 285], [265, 285], [40, 445], [265, 445]]; const TW = 205, TH = 150;
  const NAMES = ['LP 1 · sterilizare', 'LP 2 · microscopie', 'LP 3 · medii', 'LP 4 · identificare', 'LP 5 · antibiograma ★', 'LP 6 · parazitologie'];
  const CARDS = [['gsange', 'geloză-sânge'], ['macP', 'MacConkey lactozo +'], ['chapP', 'Chapman pozitiv'], ['mh', 'Mueller-Hinton']];
  const CP = [[630, 215], [860, 215], [630, 445], [860, 445]]; const CW = 200, CH = 160;
  const ROWS = [['manitol', 'Chapman\n(sare 7,5%)', M.chapR, M.yellow, 'galben', 'plate'], ['lactoză', 'MacConkey\n(săruri biliare)', '#f3e6d0', '#e8205f', 'roz', 'col'], ['lactoză', 'geloză\nlactozată', M.lactB, M.yellow, 'galben', 'plate']];
  sr(11); const LAWN = Array.from({ length: 40 }, () => [R(-1, 1), R(-1, 1)]);
  function tile(g, k, x, y, t, act, dim) {
    panel(g, x, y, TW, TH, { fill: act ? 'rgba(255,227,110,.14)' : 'rgba(255,240,228,.05)', stroke: act ? 'rgba(255,227,110,.7)' : 'rgba(255,230,210,.16)', r: 18 });
    g.save(); g.globalAlpha = dim;
    const cx = x + TW / 2, cy = y + 88;
    if (k === 0) { // ansa intră în flacără și se înroșește
      const hot = 0.5 + 0.5 * Math.sin(TT(t) * 1.6);
      g.save(); g.translate(cx - 40, cy + 14); g.scale(0.55, 0.55); burner(g, 0, 40, t); g.restore();
      g.save(); g.translate(cx - 44, cy - 6); g.scale(0.5, 0.5); loop(g, 0, 0, 2.6, hot); g.restore();
    } else if (k === 1) {
      field(g, cx, cy, 52, '#f6f0e6', () => { [[-20, -14], [-6, -22], [-28, 4], [-14, 0]].forEach(([a, c]) => coccus(g, cx + a, cy + c, 7, COL.cv)); [[18, 10, 0.4], [10, 26, -0.6], [28, -14, 1.2]].forEach(([a, c, r]) => bacillus(g, cx + a, cy + c, 26, 10, r, COL.pink)); });
    } else if (k === 2) {
      plate(g, cx, cy, 44, M.blood); const u = 0.35 + 0.65 * loopT(t, 4);
      [[-18, -12], [12, -20], [16, 14], [-10, 18], [0, -2]].forEach(([a, c]) => colony(g, cx + a, cy + c, 6 * u, '#f3ece0'));
    } else if (k === 3) {
      const u = ease(clamp(loopT(t, 4) * 2 - 0.4));
      testTube(g, cx, cy - 46, 34, 96, mix(M.chapR, M.yellow, u), { level: 0.75 });
      T(g, u > 0.5 ? 'acid' : 'alcalin', cx + 56, cy, 16, u > 0.5 ? M.yellow : '#ff9aa8');
    } else if (k === 4) { // MH + covor de creștere + discuri cu zonă clară
      plate(g, cx, cy, 46, M.mh); const u = 0.2 + 0.8 * ease(loopT(t, 4) * 1.5);
      g.save(); g.beginPath(); g.arc(cx, cy, 46, 0, 7); g.clip(); g.fillStyle = 'rgba(250,243,226,.75)'; g.fillRect(cx - 50, cy - 50, 100, 100);
      g.fillStyle = 'rgba(200,180,140,.5)'; LAWN.forEach(([a, c]) => { g.beginPath(); g.arc(cx + a * 44, cy + c * 44, 2, 0, 7); g.fill(); });
      [[-18, -14, 15], [18, -10, 11], [0, 20, 18]].forEach(([a, c, z]) => { g.fillStyle = M.mh; g.beginPath(); g.arc(cx + a, cy + c, z * u, 0, 7); g.fill(); });
      g.restore();
      [[-18, -14], [18, -10], [0, 20]].forEach(([a, c]) => dot(g, cx + a, cy + c, 5, '#ffffff', { ow: 2 }));
    } else { // oul urcă în soluția hipertonă (flotație)
      const u = ease(loopT(t, 4) * 1.3);
      testTube(g, cx, cy - 46, 40, 100, '#cfe7f2', { level: 0.82 });
      egg(g, cx, lerp(cy + 36, cy - 26, u), 0.6, '#a8452a');
    }
    g.restore();
    T(g, NAMES[k], x + TW / 2, y + 20, 17, act ? M.hi : M.cream, { alpha: Math.max(0.5, dim) });
  }
  return {
    home: HOME,
    anchors: [[60, 72], [56, 462], [56, 660], [540, 72]],
    draw(g, t, b) {
      bg(g);
      const hi = b.i < 0 ? Math.floor(TT(t) / 2.6) % 4 : b.i;
      const dimOf = (k) => (hi === k ? 1 : 0.55);
      // ---- Partea A
      panel(g, 20, 40, 470, 570, { fill: hi === 0 ? 'rgba(14,156,134,.16)' : 'rgba(255,240,228,.05)', stroke: hi === 0 ? 'rgba(127,227,207,.7)' : 'rgba(255,230,210,.16)' });
      T(g, 'PARTEA A · principiile LP 1–6', 255, 72, 22, '#9ef0dd');
      T(g, 'LP 7 (micologia) nu intră', 255, 104, 16, M.dim, { w: 600 });
      TL.forEach(([x, y], k) => tile(g, k, x, y, t, (hi === 0) || (hi === 1 && k === 4), k === 4 ? Math.max(dimOf(0), dimOf(1)) : dimOf(0)));
      if (hi === 1) ring(g, 265 + TW / 2, 445 + 85, 100, 74, ease((b.i < 0 ? TT(t) % 2.6 : b.bt) * 1.2));
      // ---- Partea B: cărțile se întorc de pe „?” pe poza reală
      panel(g, 510, 40, 470, 570, { fill: hi === 3 ? 'rgba(14,156,134,.16)' : 'rgba(255,240,228,.05)', stroke: hi === 3 ? 'rgba(127,227,207,.7)' : 'rgba(255,230,210,.16)' });
      T(g, 'PARTEA B · atlasul mediilor', 745, 72, 22, '#9ef0dd');
      T(g, 'întâi poza, apoi răspunsul', 745, 104, 16, M.dim, { w: 600 });
      const tt = (REDUCED ? 6 : t) % 12;
      CARDS.forEach(([img, cap], k) => {
        const [cx, cy] = CP[k];
        const a = clamp((tt - 1 - k * 0.7) / 0.8) - clamp((tt - 10.4 - k * 0.25) / 0.6);
        const sx = Math.abs(Math.cos(a * Math.PI)); const front = a > 0.5;
        g.save(); g.globalAlpha = hi === 3 ? 1 : 0.6; g.translate(cx, cy); g.scale(Math.max(0.02, sx), 1);
        if (front) photo(g, img, -CW / 2, -CH / 2, CW, CH, null, 1);
        else { g.fillStyle = '#2b2134'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(-CW / 2, -CH / 2, CW, CH, 16); g.fill(); g.stroke(); g.strokeStyle = 'rgba(158,240,221,.5)'; g.lineWidth = 3; g.beginPath(); g.roundRect(-CW / 2 + 10, -CH / 2 + 10, CW - 20, CH - 20, 10); g.stroke(); }
        g.restore();
        if (!front) T(g, '?', cx, cy, 64, '#9ef0dd', { alpha: (hi === 3 ? 1 : 0.6) * sx });
        T(g, cap, cx, cy + CH / 2 + 24, 17, M.cream, { alpha: front ? (hi === 3 ? 1 : 0.6) * sx : 0 });
      });
      // ---- Tabla: zahăr → mediu → culoarea virează (alcalin → acid)
      panel(g, 20, 630, 960, 285, { fill: hi === 2 ? 'rgba(14,156,134,.16)' : 'rgba(255,240,228,.05)', stroke: hi === 2 ? 'rgba(127,227,207,.7)' : 'rgba(255,230,210,.16)' });
      T(g, 'TABLA DE LA LP, REDESENATĂ · zahăr → mediu → culoare', 500, 660, 19, '#9ef0dd');
      const al = hi === 2 ? 1 : 0.6;
      ROWS.forEach(([sug, med, c0, c1, res, kind], r) => {
        const y = 715 + r * 72; const u = ease(clamp(loopT(t, 6) * 6 - 1.2 - r * 0.6));
        pill(g, 130, y, 150, 50, '#fff3c4', sug, { size: 19, alpha: al });
        arr(g, 212, y, 262, y, '#fff3e6', 5, al);
        if (kind === 'plate') plate(g, 310, y, 26, mix(c0, c1, u), { alpha: al });
        else { plate(g, 310, y, 26, M.mac, { alpha: al }); [[-9, -6], [8, -8], [0, 9]].forEach(([a, c]) => colony(g, 310 + a, y + c, 6, mix(c0, c1, u), { alpha: al })); }
        T(g, med, 430, y, 17, M.cream, { alpha: al });
        arr(g, 530, y, 610, y, '#fff3e6', 5, al);
        pill(g, 700, y, 150, 46, mix(c0, c1, u), '', { alpha: al });
        T(g, u > 0.5 ? res : '…', 700, y, 19, OUT, { stroke: false, alpha: al });
        T(g, 'acid → virează', 870, y, 17, u > 0.5 ? M.hi : M.dim, { alpha: al, w: 600 });
      });
    },
  };
}

/* =================================================================== 2 · ÎNAINTE SĂ ÎNCEPI
 Ce se vede: sus, arborele examenului (oral → Teorie + Practic), sub Teorie șirul LP 1–6 aprins și LP 7 tăiat.
 Stânga, formula în 5 pași; dreapta, același mediu (MacConkey) construit pas cu pas, în ordinea formulei:
 1 numele (eticheta), 2 tipul (selectiv-diferențial), 3 ce conține (săruri biliare + lactoză + roșu neutru cad în placă),
 4 ce crește: cocii violet (Gram +) sunt opriți de sărurile biliare (✕), bacilii roz (Gram −) aterizează și fac colonii
 incolore, 5 + / − : colonia fermentează lactoza → acid → roșul neutru devine roșu → coloniile devin roz (lactozo +).
 Culoarea virează DOAR după ce coloniile au crescut. */
export function a_intro() {
  const FY = [385, 480, 575, 670, 765];
  const FL = [['NUMELE', 'MacConkey'], ['TIPUL', 'selectiv-diferențial'], ['CE CONȚINE', 'săruri biliare + lactoză + roșu neutru'], ['CE CREȘTE', 'enterobacteriile (Gram −)'], ['+ / − ȘI DE CE', 'lactoză → acid → colonii roz = +']];
  const PX = 775, PY = 650, PR = 135;
  const COLS = [[-60, -40], [30, -70], [60, 20], [-30, 50], [-80, 30], [10, -10], [70, -40], [-10, 85]];
  return {
    home: HOME,
    anchors: [[48, 150], [538, 150], [48, 345], [470, 270]],
    draw(g, t, b) {
      bg(g);
      // ---- arborele
      const hi = b.i;
      pill(g, 500, 50, 500, 54, '#e6f4ef', 'Examenul oral de Microbiologie', { size: 21 });
      arr(g, 360, 78, 270, 120, '#fff3e6', 5, 0.8); arr(g, 640, 78, 730, 120, '#fff3e6', 5, 0.8);
      const bx = (x, title, sub, act) => { pill(g, x, 175, 430, 96, act ? '#ffe9a8' : '#d9efe8', '', { glow: act ? 1 : 0, r: 20 }); T(g, title, x, 158, 21, OUT, { stroke: false }); T(g, sub, x, 192, 17, OUT, { stroke: false, w: 600 }); };
      bx(255, 'TEORIE', 'principiile din slide-urile LP', hi === 0);
      bx(745, 'PRACTIC', 'mediile din poze + tabla', hi === 1);
      // LP 1–6 + LP 7 tăiat
      for (let k = 0; k < 7; k++) {
        const x = 70 + k * 62; const a3 = hi === 3 ? ease(clamp(b.bt * 2 - k * 0.25)) : 1;
        pill(g, x, 268, 54, 34, k < 6 ? '#9ef0dd' : '#6b5a66', `LP ${k + 1}`, { size: 15, alpha: hi === 3 ? 0.4 + 0.6 * a3 : 0.75, glow: hi === 3 && k < 6 ? a3 : 0 });
        if (k === 6) xmark(g, x, 268, 1.1, 1);
      }
      // mini-iconițe pentru practic: placă + tub
      plate(g, 690, 268, 26, M.chapR, { alpha: hi === 1 ? 1 : 0.6 }); testTube(g, 780, 238, 26, 64, M.yellow, { alpha: hi === 1 ? 1 : 0.6 });
      T(g, 'ce mediu · ce crește · + / −', 880, 268, 15, M.cream, { alpha: hi === 1 ? 1 : 0.6, w: 600 });
      // ---- progresul formulei
      let fs;
      if (b.i < 0) fs = P(b, t, 5, 0.6);
      else if (b.i === 2) { const f = fb(b, 0.8) * 5; fs = (k) => ease(clamp(f - k)); }
      else fs = () => 1;
      const fdim = b.i === 0 || b.i === 1 ? 0.45 : 1;
      FL.forEach(([h, v], k) => {
        const y = FY[k]; const a = fs(k); const act = a > 0 && a < 1 && (b.i === 2 || b.i < 0);
        pill(g, 285, y, 470, 80, a > 0.02 ? '#fff3e6' : '#4a3f47', '', { glow: act ? 1 : 0, alpha: fdim, r: 18 });
        dot(g, 80, y, 20, '#0e9c86', { alpha: fdim }); T(g, String(k + 1), 80, y, 19, '#ffffff', { stroke: false, alpha: fdim });
        T(g, h, 290, y - 17, 15, a > 0.02 ? '#0b6b5c' : '#b8abc4', { stroke: false, alpha: fdim });
        T(g, v, 290, y + 13, 18, OUT, { stroke: false, alpha: fdim * (0.25 + 0.75 * a) });
        if (k < 4) T(g, '↓', 520, y + 47, 20, '#9ef0dd', { alpha: fdim });
      });
      // ---- placa MacConkey construită pe formulă
      g.save(); g.globalAlpha = fdim;
      const a0 = fs(0), a1 = fs(1), a2 = fs(2), a3 = fs(3), a4 = fs(4);
      plate(g, PX, PY, PR, M.mac, { alpha: 0.25 + 0.75 * a0 });
      pill(g, PX, 395, 220, 46, '#ffd0e6', 'MacConkey', { size: 21, alpha: a0 });
      pill(g, PX, 450, 260, 40, '#e6dbff', 'selectiv · diferențial', { size: 17, alpha: a1 });
      // 3: ingredientele cad în placă, apoi se dizolvă
      [['#cfe8a0', -60], ['#ffffff', 0], ['#d8243c', 60]].forEach(([c, dx], k) => {
        const u = clamp(a2 * 1.4 - k * 0.2); if (u <= 0 || u >= 1) return;
        const y = lerp(470, PY, ease(u)); const x = PX + dx;
        if (k === 0) { g.save(); g.translate(x, y); g.rotate(0.8); g.fillStyle = c; g.strokeStyle = OUT; g.lineWidth = 4; g.fillRect(-10, -10, 20, 20); g.strokeRect(-10, -10, 20, 20); g.restore(); }
        else if (k === 1) { g.fillStyle = c; g.strokeStyle = OUT; g.lineWidth = 4; g.fillRect(x - 11, y - 11, 22, 22); g.strokeRect(x - 11, y - 11, 22, 22); }
        else dot(g, x, y, 12, c, { ow: 4 });
      });
      T(g, 'săruri biliare + lactoză + roșu neutru', PX, 812, 17, '#ffd0e6', { alpha: a2 });
      // 4: Gram + opriți, Gram − cresc colonii incolore
      if (a3 > 0) {
        for (let k = 0; k < 2; k++) { const u = clamp(a3 * 1.5 - k * 0.3); const x = lerp(PX + 220, PX + 130, u), y = lerp(PY - 150 + k * 60, PY - 70 + k * 50, u); coccus(g, x, y, 10, COL.cv, 1 - clamp((u - 0.85) * 4) * 0.5); if (u > 0.8) xmark(g, x, y, 0.9, (u - 0.8) * 5); }
        if (a3 < 0.6) for (let k = 0; k < 3; k++) { const u = clamp(a3 * 2 - k * 0.2); bacillus(g, lerp(PX - 200, PX + COLS[k][0], u), lerp(PY - 170, PY + COLS[k][1], u), 26, 11, 0.5, COL.pink, 1 - clamp((u - 0.8) * 5)); }
      }
      const cg = clamp((a3 - 0.45) / 0.55);
      if (cg > 0) COLS.forEach(([dx, dy]) => {
        const halo = a4 > 0.3 ? `rgba(255,90,150,${0.35 * clamp((a4 - 0.3) / 0.7)})` : null;
        colony(g, PX + dx, PY + dy, 15 * cg, mix('#f3e6d0', '#e8205f', a4), { halo, haloK: 1.7 });
      });
      if (a3 > 0.3) T(g, 'Gram + oprit · Gram − crește', PX, 860, 17, M.cream, { alpha: a3 * (1 - a4) });
      if (a4 > 0.1) T(g, 'lactoză → acid → pH ↓ → roz = lactozo +', PX, 860, 17, M.hi, { alpha: a4 });
      g.restore();
      T(g, 'culoarea se schimbă mereu din același motiv: pH-ul', 285, 860, 17, M.cream, { alpha: fdim, w: 600 });
      if (hi === 2) ring(g, PX, PY, PR + 26, PR + 26, ease(b.bt));
    },
  };
}

/* =================================================================== 3 · LP 1 · CONTROLUL CREȘTERII + CURBA DE DISTRUGERE
 Ce se vede: (sus) scara metodelor, de jos în sus: curățare → antisepsie → dezinfecție → sterilizare („cu cât urci, cu atât
 omori mai mult”). Proba din dreapta are murdărie (maro), bacterii vegetative (roz) și spori (verzi, cu înveliș gros).
 Curățarea scoate DOAR murdăria (germenii rămân vii); antisepsia (pe țesut viu, fond piele) și dezinfecția (pe obiecte, fond
 metal) omoară formele vegetative, sporii rămân; sterilizarea omoară tot, și sporii.
 (jos stânga) curba pe scară log: fiecare populație coboară în linie dreaptă, cu aceeași pantă; 10⁸ ajunge la 1 în dublul
 timpului lui 10⁴ (la scară: x = 2×). Rândul de 10 bacterii: în fiecare interval mor 9 din 10 (90%). La punctul 5, o linie
 mai abruptă (timp, concentrație, t° ↑). (jos dreapta) scara rezistenței, cel mai greu de omorât sus: prioni, spori… */
export function a_kill() {
  const BARS = [['Sterilizare', 'omoară TOT, și sporii', '#0f5e4f', '#ffffff'], ['Dezinfecție', 'patogenii, fără spori · obiecte', '#1f7d68', '#ffffff'], ['Antisepsie', 'forme vegetative · țesut viu', '#4aa58c', OUT], ['Curățare', 'doar murdăria · curat ≠ steril', '#a8d8c8', OUT]];
  const BY = [80, 168, 256, 344];
  sr(7);
  const DIRT = Array.from({ length: 6 }, () => [R(590, 950), R(120, 380), R(9, 16)]);
  const VEG = Array.from({ length: 8 }, () => [R(600, 940), R(125, 380), R(0, 3)]);
  const SPO = [[680, 300], [820, 180], [900, 330]];
  const LAD = ['prioni', 'spori', 'micobacterii', 'chisturi', 'virusuri neînvelite', 'fungi', 'bacterii vegetative', 'virusuri învelite'];
  const OX = 120, OY = 845, YT = 500, XT = 520;
  const ly = (e) => OY - (e / 8) * (OY - YT); const lx = (u) => OX + u * (XT - OX);
  return {
    home: HOME,
    anchors: [[46, BY[0] - 30], [66, BY[1] - 30], [106, BY[3] - 30], [OX + 40, 475], [780, 470]],
    draw(g, t, b) {
      bg(g);
      // ---- nivelul aplicat probei: L = 1 curățare, 2 antisepsie, 3 dezinfecție, 4 sterilizare
      let L, kp;
      if (b.i < 0) { const c = TT(t) / 2.6; L = 1 + Math.floor(c) % 4; kp = clamp((c % 1) * 1.8); }
      else if (b.i === 0) { L = 4; kp = fb(b, 0.5); }
      else if (b.i === 1) { const h = b.bd / 2; L = b.bt < h ? 3 : 2; kp = clamp((b.bt % h) / (h * 0.6)); }
      else if (b.i === 2) { L = 1; kp = fb(b, 0.5); }
      else { L = 4; kp = 1; }
      const barOf = { 4: 0, 3: 1, 2: 2, 1: 3 };
      BARS.forEach(([n, s, c, tc], k) => {
        const x = 30 + k * 22, w = 470 - k * 22; const act = barOf[L] === k && b.i < 3;
        pill(g, x + w / 2, BY[k], w, 74, c, '', { glow: act ? 1 : 0, alpha: b.i >= 3 ? 0.5 : 1, r: 16 });
        T(g, n, x + 26, BY[k] - 13, 21, tc, { stroke: false, align: 'left', alpha: b.i >= 3 ? 0.5 : 1 });
        T(g, s, x + 26, BY[k] + 15, 16, tc, { stroke: false, align: 'left', w: 600, alpha: b.i >= 3 ? 0.5 : 1 });
      });
      T(g, '↑ cu cât urci, cu atât omori mai mult', 265, 412, 17, '#9ef0dd', { alpha: b.i >= 3 ? 0.5 : 1 });
      // ---- proba
      const fa = b.i >= 3 ? 0.45 : 1;
      g.save(); g.globalAlpha = fa;
      g.fillStyle = L === 2 ? '#f3c29b' : '#aab4bb'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(570, 95, 400, 310, 22); g.fill(); g.stroke();
      g.restore();
      T(g, ['', 'curățare: pleacă murdăria', 'antisepsie: pe țesut viu', 'dezinfecție: pe obiecte', 'sterilizare: tot, și sporii'][L], 770, 66, 19, M.hi, { alpha: fa });
      const dirtGone = L === 1 ? kp : 0, vegDead = L >= 2 ? kp : 0, spDead = L === 4 ? kp : 0;
      DIRT.forEach(([x, y, r], k) => ell(g, x + (L === 1 ? kp * 60 * (k % 2 ? 1 : -1) : 0), y, r * 1.3, r, '#7a5230', { alpha: fa * (1 - dirtGone), ow: 3 }));
      VEG.forEach(([x, y, r]) => rod(g, x + (vegDead > 0 ? 0 : Math.sin(TT(t) * 2 + r) * 4), y, 40, 15, r, COL.pink, fa, vegDead));
      SPO.forEach(([x, y]) => spore(g, x, y, 1.3, { alpha: fa, dead: spDead }));
      if (L === 1 && kp > 0.6) T(g, 'germenii rămân vii', 770, 385, 18, '#ffd0d0', { alpha: fa * (kp - 0.6) * 2.5 });
      if ((L === 2 || L === 3) && kp > 0.6) T(g, 'sporii rămân', 770, 385, 18, '#bff0d2', { alpha: fa * (kp - 0.6) * 2.5 });
      // ---- curba de distrugere (scară log)
      const pa = b.i >= 3 || b.i < 0 ? 1 : 0.45;
      panel(g, 30, 450, 530, 465);
      g.save(); g.globalAlpha = pa; g.strokeStyle = M.cream; g.lineWidth = 4; g.beginPath(); g.moveTo(OX, YT - 20); g.lineTo(OX, OY); g.lineTo(XT + 20, OY); g.stroke(); g.restore();
      [[8, '10⁸'], [6, '10⁶'], [4, '10⁴'], [2, '10²'], [0, '1']].forEach(([e, s]) => T(g, s, OX - 34, ly(e), 17, M.cream, { alpha: pa }));
      T(g, 'germeni (scară log)', 230, 470, 16, M.dim, { alpha: pa, w: 600 }); T(g, 'timp →', XT - 20, OY + 32, 16, M.dim, { alpha: pa, w: 600 });
      const lu = b.i === 3 ? fb(b, 0.6) : 1;
      const line = (e0, uEnd, col, u1, dash) => { g.save(); g.globalAlpha = pa; g.lineCap = 'round'; if (dash) g.setLineDash([14, 10]); for (const [c, w] of [[OUT, 12], [col, 7]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(lx(0), ly(e0)); g.lineTo(lx(uEnd * u1), ly(e0 * (1 - u1))); g.stroke(); } g.restore(); };
      line(8, 1, '#3fd1a8', lu); line(4, 0.5, '#7fb8ff', lu);
      if (lu > 0.95) { dot(g, lx(1), ly(0), 9, '#3fd1a8', { alpha: pa }); dot(g, lx(0.5), ly(0), 9, '#7fb8ff', { alpha: pa }); }
      T(g, '10⁸ germeni', lx(0.36), ly(5.6) - 22, 17, '#3fd1a8', { alpha: pa });
      T(g, '10⁴', lx(0.12) + 30, ly(2.4), 17, '#7fb8ff', { alpha: pa });
      if (b.i === 3 || b.i < 0) { // punctele care coboară, cu aceeași pantă
        const u = loopT(t, 4);
        dot(g, lx(u), ly(8 * (1 - u)), 10, M.hi, { alpha: pa }); if (u < 0.5) dot(g, lx(u), ly(4 * (1 - u / 0.5)), 10, M.hi, { alpha: pa });
        T(g, 'timp × 2', lx(0.75), OY - 26, 17, M.hi, { alpha: pa });
        // 10 bacterii: în fiecare interval mor 9 (90%)
        const c = loopT(t, 1.6);
        for (let k = 0; k < 10; k++) rod(g, 300 + k * 22, 535, 18, 9, 1.57, COL.pink, pa, k === 3 ? 0 : clamp((c - 0.35) * 3));
        T(g, '−90% / interval', 400, 568, 16, M.hi, { alpha: pa });
      }
      if (b.i === 4 || b.i < 0) { line(8, 0.55, M.hi, b.i === 4 ? fb(b, 0.5) : 1, true); T(g, 'timp, concentrație, t° ↑\n→ moare mai repede', lx(0.3) + 40, ly(1.2), 16, M.hi, { alpha: pa }); }
      // ---- scara rezistenței
      panel(g, 580, 450, 400, 465);
      T(g, 'cei mai greu de omorât ↑', 780, 478, 18, M.cream, { alpha: pa });
      LAD.forEach((s, k) => {
        const y = 520 + k * 44; const glow = (b.i === 4 && (k === 1 || k === 2 || k === 3)) ? 0.6 + 0.4 * Math.sin(TT(t) * 4) : 0;
        pill(g, 780, y, 300 - k * 14, 36, mix('#0f5e4f', '#cfeee3', k / 7), '', { alpha: pa, glow, r: 12 });
        T(g, s, 780, y, 16, k < 4 ? '#ffffff' : OUT, { stroke: false, alpha: pa });
      });
      T(g, '(ordinea din literatură)', 780, 888, 15, M.dim, { alpha: pa, w: 600 });
    },
  };
}

/* =================================================================== 4 · LP 1 · RECOLTAREA (+ pe produse)
 Ce se vede: sus, 3 zone: FRIG 4 °C (albastru), GHEAȚĂ −70 °C (cyan), NU FRIG = t° camerei (roșu). Probele zboară în zona
 lor pe punctul care le explică: urina → frig; probele virusologice și LCR-ul virusologic → gheață; hemocultura, LCR-ul
 bacteriologic, secrețiile genitale → NU frig; serologia → t° camerei (galben). Jos, mecanismul punctului:
 1 recoltare ÎNAINTE de antibiotic (după antibiotic germenii din probă mor); 2 urina la cald > 2 h: bacteriile se dublează
 (bacteriurie fals crescută), la 4 °C rămân la fel; virusurile la −20 °C mor, la −70 °C rămân; 3 diplococii Neisseria mor
 la frig, rămân vii la t° camerei; 4 iod apoi alcool, 2 locuri × (aerob + anaerob); serologie: titrul crește de la proba 1
 la proba 2 (10–14 zile); 5 tamponul atinge amigdalele și peretele posterior, nu limba; jetul: prima porțiune și ultima
 merg în toaletă, porțiunea din mijloc în pahar; fecale: porțiunea mucoasă/sanguinolentă. */
export function a_sample() {
  const Z = [[30, 'FRIG · 4 °C', '#7fb8ff', 'rgba(127,184,255,.14)'], [350, 'GHEAȚĂ · −70 °C', '#9fe8ff', 'rgba(159,232,255,.12)'], [670, 'NU FRIG · t° camerei', '#ff8a8a', 'rgba(255,138,138,.12)']];
  // [tip, x, y, etichetă, beat]
  const IT = [['urina', 180, 230, 'urina\n(dacă > 2 h)', 1], ['vir', 430, 220, 'probe\nvirusologice', 1], ['lcr', 575, 220, 'LCR\nvirusologic', 1], ['hemo', 730, 205, 'hemocultură', 2], ['lcr', 830, 205, 'LCR\nbacteriologic', 2], ['swab', 920, 205, 'secreții\ngenitale', 2], ['ser', 820, 335, 'serologie (galben)', 3]];
  function item(g, k, x, y, t, a) {
    if (a <= 0.01) return;
    if (k === 'urina') cup(g, x, y - 30, 56, 64, '#f2d23a', 0.7, a);
    else if (k === 'vir') { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(200,240,255,.6)'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(x - 34, y - 34, 68, 62, 10); g.fill(); g.stroke(); g.restore(); virus(g, x, y - 4, 13, '#ff7a3d', a); }
    else if (k === 'lcr') testTube(g, x, y - 42, 26, 74, '#eef6ff', { level: 0.6, alpha: a });
    else if (k === 'hemo') { bottle(g, x - 18, y - 6, 0.55, '#3f7fd9', a); bottle(g, x + 18, y - 6, 0.55, '#f08a3a', a); }
    else if (k === 'swab') swab(g, x - 26, y + 10, -1.0, a, 80);
    else if (k === 'ser') testTube(g, x, y - 40, 26, 70, '#f6d36b', { level: 0.6, alpha: a, cap: '#d8243c' });
  }
  return {
    home: HOME,
    anchors: [[60, 478], [52, 72], [690, 72], [600, 478], [880, 478]],
    labelText: ['LCR'],
    draw(g, t, b) {
      bg(g);
      Z.forEach(([x, s, c, f]) => { panel(g, x, 40, 300, 380, { fill: f, stroke: c }); T(g, s, x + 150, 70, 19, c); });
      if (b.i === 1 || b.i < 0) T(g, '−20 °C ✕', 500, 400, 17, '#ff8a8a');
      const f = fb(b, 0.55);
      IT.forEach(([k, x, y, lab, bk]) => {
        const a = b.i < 0 || b.i > bk ? 1 : b.i === bk ? ease(f) : 0; if (a <= 0) return;
        const xx = lerp(500, x, a), yy = lerp(-40, y, a);
        item(g, k, xx, yy, t, 1); if (a > 0.95) T(g, lab, x, y + 60, 16, M.cream);
      });
      // ---- panoul mecanismului
      panel(g, 30, 450, 940, 465);
      const dk = b.i < 0 ? Math.floor(TT(t) / 3.6) % 5 : b.i;
      const df = b.i < 0 ? (TT(t) % 3.6) / 3.2 : fb(b, 0.8);
      if (dk === 0) {
        pill(g, 190, 540, 220, 56, '#bff0d2', '1 · recoltare', { size: 20 }); arr(g, 310, 540, 370, 540, '#fff3e6', 6);
        pill(g, 490, 540, 220, 56, '#ffd0d0', '2 · antibiotic', { size: 20 });
        testTube(g, 720, 490, 46, 110, '#f6efe0', { level: 0.6 });
        for (let k = 0; k < 4; k++) rod(g, 712 + (k % 2) * 16, 560 + k * 10, 16, 8, k, COL.pink, 1, 0);
        T(g, 'germen viu → crește în cultură', 840, 640, 16, '#bff0d2');
        // ordinea inversă: germenii din probă mor
        const u = ease(clamp(df * 1.5));
        T(g, 'antibiotic întâi →', 190, 680, 18, '#ff8a8a'); testTube(g, 380, 640, 46, 100, '#f6efe0', { level: 0.6 });
        for (let k = 0; k < 4; k++) rod(g, 372 + (k % 2) * 16, 700 + k * 9, 16, 8, k, COL.pink, 1, u);
        T(g, 'germenul moare în probă', 560, 700, 16, '#ff8a8a', { alpha: u });
        ['steril', 'închis ermetic', 'bilet de trimitere', 'transport rapid'].forEach((s, k) => { const a = clamp(df * 4 - k * 0.7); pill(g, 150 + k * 225, 840, 205, 48, '#e6f4ef', s, { size: 17, alpha: 0.4 + 0.6 * a }); check(g, 70 + k * 225, 840, 0.8, a); });
      } else if (dk === 1) {
        // urina: la cald bacteriile se dublează, la 4 °C nu
        const gen = Math.min(4, Math.floor(df * 5));
        const nW = 2 ** (gen + 1);
        cup(g, 170, 560, 120, 140, '#f2d23a', 0.75, 1); cup(g, 400, 560, 120, 140, '#f2d23a', 0.75, 1);
        sr(3); for (let k = 0; k < 32; k++) { const x = R(130, 210), y = R(600, 690); if (k < nW) rod(g, x, y, 14, 7, R(0, 3), COL.pink); }
        sr(4); for (let k = 0; k < 2; k++) rod(g, R(370, 430), R(610, 680), 14, 7, R(0, 3), COL.pink);
        T(g, 'la cald, > 2 h', 170, 520, 17, '#ff8a8a'); T(g, '4 °C', 400, 520, 17, '#7fb8ff');
        T(g, `${nW} → bacteriurie\nfals crescută`, 170, 760, 17, '#ff8a8a'); T(g, 'înmulțirea\noprită', 400, 760, 17, '#7fb8ff');
        // virusurile: −20 °C mor, −70 °C rămân
        thermo(g, 640, 520, 190, 0.45, { col: '#7fb8ff' }); thermo(g, 830, 520, 190, 0.15, { col: '#9fe8ff' });
        T(g, '−20 °C', 640, 770, 18, '#ff8a8a'); T(g, '−70 °C', 830, 770, 18, '#9fe8ff');
        for (let k = 0; k < 3; k++) { virus(g, 700, 560 + k * 50, 11, '#ff7a3d', 1, clamp(df * 1.6)); virus(g, 890, 560 + k * 50, 11, '#ff7a3d', 1, 0); }
        xmark(g, 700, 720, 1, clamp(df * 1.6)); check(g, 890, 720, 1, 1);
        T(g, 'virusurile își pierd viabilitatea la −20 °C', 760, 820, 16, M.cream, { w: 600 });
      } else if (dk === 2) {
        panel(g, 80, 500, 380, 300, { fill: 'rgba(127,184,255,.16)', stroke: '#7fb8ff' }); panel(g, 540, 500, 380, 300, { fill: 'rgba(255,138,138,.12)', stroke: '#ff8a8a' });
        T(g, 'frig', 270, 530, 20, '#7fb8ff'); T(g, 't° camerei', 730, 530, 20, '#ff8a8a');
        sr(9); for (let k = 0; k < 6; k++) { const x = R(130, 410), y = R(580, 760), r = R(0, 3); const d = clamp(df * 1.6 - k * 0.08); diplo(g, x, y, 0.9, r, mix(COL.pink, DEAD, d), 1); if (d > 0.6) xmark(g, x, y, 0.7, (d - 0.6) * 2.5); }
        sr(9); for (let k = 0; k < 6; k++) { const x = R(130, 410) + 460, y = R(580, 760), r = R(0, 3) + Math.sin(TT(t) * 2 + k) * 0.15; diplo(g, x, y, 0.9, r, COL.pink, 1); }
        T(g, 'Neisseriile mor la frig: meningococ (LCR), gonococ (secreții genitale)', 500, 850, 17, M.hi);
      } else if (dk === 3) {
        // pielea: iod (brun) apoi alcool (se întinde peste iod)
        ell(g, 160, 640, 110, 110, '#f3c29b', { ow: 5 });
        const u1 = clamp(df * 2.2), u2 = clamp(df * 2.2 - 1);
        g.save(); g.globalAlpha = 0.75; g.fillStyle = '#8a4b14'; g.beginPath(); g.arc(160, 640, 95 * ease(u1), 0, 7); g.fill(); g.restore();
        if (u2 > 0) { g.save(); g.globalAlpha = 0.5 * u2; g.fillStyle = '#e8f4ff'; g.beginPath(); g.arc(160, 640, 95 * ease(u2), 0, 7); g.fill(); g.restore(); }
        T(g, u2 > 0 ? '…apoi alcool' : 'iod…', 160, 640, 20, M.cream);
        T(g, '2 locuri diferite', 160, 790, 17, M.cream);
        [[340, 'locul 1'], [520, 'locul 2']].forEach(([x, s], k) => { const a = clamp(df * 3 - 1 - k * 0.5); bottle(g, x - 30, 620, 0.9, '#3f7fd9', a); bottle(g, x + 34, 620, 0.9, '#f08a3a', a); T(g, s, x, 520, 17, M.cream, { alpha: a }); T(g, 'aerob · anaerob', x, 700, 15, M.cream, { alpha: a, w: 600 }); });
        T(g, 'hemocultură: NU la frigider', 430, 790, 17, '#ff8a8a');
        // serologia: titrul crește
        testTube(g, 690, 520, 34, 90, '#f6d36b', { level: 0.6, cap: '#d8243c' }); testTube(g, 860, 520, 34, 90, '#f6d36b', { level: 0.6, cap: '#d8243c' });
        T(g, 'proba 1', 690, 650, 16, M.cream); T(g, '10–14 zile', 860, 650, 16, M.cream);
        const hb = 40 + 110 * ease(clamp(df * 1.4 - 0.3));
        g.save(); g.fillStyle = '#f2d23a'; g.strokeStyle = OUT; g.lineWidth = 4; g.fillRect(670, 780 - 40, 40, 40); g.strokeRect(670, 780 - 40, 40, 40); g.fillRect(840, 780 - hb, 40, hb); g.strokeRect(840, 780 - hb, 40, hb); g.restore();
        T(g, 'titrul crește → infecție acută', 775, 820, 16, M.hi);
      } else {
        // faringe: amigdale + perete posterior, nu limba
        ell(g, 180, 640, 130, 120, '#7a2a3a', { ow: 6 });
        ell(g, 180, 600, 70, 50, '#b8485a', { ow: 0 }); T(g, 'perete\nposterior', 180, 545, 14, '#ffd0d0', { stroke: false });
        ell(g, 95, 640, 26, 38, '#ef8a9a', { ow: 4 }); ell(g, 265, 640, 26, 38, '#ef8a9a', { ow: 4 });
        ell(g, 180, 735, 90, 40, '#f29aa8', { ow: 5 }); xmark(g, 180, 740, 0.9, 1); T(g, 'limba', 180, 790, 15, '#ffd0d0');
        const sp = [[95, 640], [180, 610], [265, 640]]; const u = df * 3 % 3; const s0 = sp[Math.floor(u) % 3], s1 = sp[(Math.floor(u) + 1) % 3]; const fu = ease(u % 1);
        swab(g, lerp(s0[0], s1[0], fu), lerp(s0[1], s1[1], fu), -1.2, 1, 150);
        T(g, 'amigdale + perete posterior', 180, 840, 16, M.hi);
        // jetul mijlociu
        const ph = df % 1; const mid = ph > 0.33 && ph < 0.66;
        const sc = ph < 0.33 ? '#c9c2b5' : mid ? '#f2d23a' : '#c9c2b5';
        tube(g, [[500, 500], [500, 760]], 12, sc, { ow: 4 });
        const cx = mid ? 500 : ph < 0.33 ? lerp(640, 500, 0) : 640;
        cup(g, mid ? 500 : cx, 650, 80, 90, '#f2d23a', mid ? 0.2 + (ph - 0.33) * 1.5 : 0.65, 1);
        T(g, ph < 0.33 ? 'prima porțiune → toaletă' : mid ? 'jetul mijlociu → pahar' : 'ultima → toaletă', 500, 800, 16, mid ? M.hi : M.cream);
        T(g, 'evită flora uretrei', 500, 840, 16, M.cream, { w: 600 });
        // fecale: porțiunea patologică
        ell(g, 820, 630, 90, 60, '#8a5a2b', { ow: 5 }); ell(g, 850, 615, 32, 18, '#e0e8c8', { ow: 3, alpha: 0.9 }); ell(g, 800, 648, 22, 9, '#c4202f', { ow: 2 });
        ring(g, 835, 625, 56, 40, ease(df * 1.5));
        T(g, 'porțiunea mucoasă,\nsanguinolentă', 820, 735, 16, M.cream); T(g, 'amibe: „la cald”, ≤ 1 h', 820, 800, 16, M.hi);
      }
    },
  };
}

/* =================================================================== 5 · LP 1 · SCHEMA DIAGNOSTICULUI
 Ce se vede: stânga, lanțul metodelor directe de sus în jos (examen direct → cultură pură → identificare → patogenitate
 + antibiogramă) și caseta roșie a metodelor indirecte. Un jeton-germen coboară pe lanț. Dreapta, mecanismul punctului:
 1 câmp microscopic + antigen + ADN, cu cronometrul care se umple repede (rapid, dar grosier); 2 ansa trage striuri pe placă,
 la capătul striului rămân colonii izolate; o bacterie se divide 1 → 2 → 4 → 8 → colonie; ansa ia colonia și o repică;
 3 cultura pură în centru, apar pe rând: cultură, colorație Gram, tuburi biochimice, anticorpi pe antigen; 4 in vitro /
 in vivo + antibiograma cu zone clare în jurul discurilor; 5 gazda: anticorpii (Y) din serul pacientului cresc de la proba 1
 la proba 2; IDR: papula crește la locul injectării. Capcana: antigenul = bucată din germen (direct), anticorpul = răspunsul
 gazdei (indirect). */
export function a_diag() {
  const BY = [150, 300, 450, 600];
  const BL = [['Examen direct', 'microscop, antigen, ADN'], ['Cultură pură', 'colonie izolată → repicare'], ['Identificare', 'cultură, colorație, biochimie'], ['Patogenitate', 'in vitro / in vivo + antibiogramă']];
  const SX = 725;
  function ab(g, x, y, s, rot, col = '#ffe36e', a = 1) { // anticorp (Y)
    g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(rot); g.lineCap = 'round';
    for (const [c, w] of [[OUT, 10 * s], [col, 5 * s]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(0, 18 * s); g.lineTo(0, 0); g.lineTo(-12 * s, -14 * s); g.moveTo(0, 0); g.lineTo(12 * s, -14 * s); g.stroke(); }
    g.restore();
  }
  return {
    home: HOME,
    anchors: [[48, BY[0] - 40], [48, BY[1] - 40], [48, BY[2] - 40], [48, BY[3] - 40], [48, 735]],
    labelText: ['ADN', 'IDR'],
    draw(g, t, b) {
      bg(g);
      T(g, 'METODE DIRECTE · cauți germenul', 240, 60, 18, '#9ef0dd');
      const hi = b.i < 0 ? Math.floor(TT(t) / 3.4) % 5 : b.i;
      const f = b.i < 0 ? (TT(t) % 3.4) / 3 : fb(b, 0.8);
      BL.forEach(([h, s], k) => {
        pill(g, 240, BY[k], 400, 96, hi === k ? '#ffe9a8' : '#e6f4ef', '', { glow: hi === k ? 1 : 0, r: 18, alpha: hi === k ? 1 : 0.8 });
        T(g, h, 240, BY[k] - 16, 21, OUT, { stroke: false }); T(g, s, 240, BY[k] + 17, 16, OUT, { stroke: false, w: 600 });
        if (k < 3) arr(g, 240, BY[k] + 52, 240, BY[k + 1] - 52, '#fff3e6', 5, 0.8);
      });
      pill(g, 240, 780, 400, 130, hi === 4 ? '#ffd0d0' : '#f6dede', '', { glow: hi === 4 ? 1 : 0, r: 18 });
      T(g, 'INDIRECTE · cauți urma lui', 240, 735, 19, '#a1352f', { stroke: false });
      T(g, 'anticorpii pacientului (probe pereche)', 240, 775, 16, OUT, { stroke: false, w: 600 });
      T(g, 'IDR (tuberculina)', 240, 808, 16, OUT, { stroke: false, w: 600 });
      // jetonul pe lanț
      if (hi < 4) dot(g, 455, BY[hi], 14, M.hi);
      panel(g, 480, 40, 495, 870);
      if (hi === 0) {
        field(g, SX, 280, 150, '#f6f0e6', () => { sr(2); for (let k = 0; k < 10; k++) bacillus(g, SX + R(-110, 110), 280 + R(-110, 110), 34, 13, R(0, 3), COL.pink, 0.75); });
        T(g, 'microscop', SX, 460, 18, M.cream);
        // antigenul = bucată din germen; ADN
        bacillus(g, 600, 600, 80, 34, 0, COL.pink); const u = ease(f);
        for (let k = 0; k < 3; k++) dot(g, 630 + k * 22 * u + 20, 590 - k * 14 * u, 8, '#ffe36e');
        T(g, 'antigen = bucată\ndin germen', 600, 680, 16, M.hi);
        tube(g, [[820, 560], [840, 590], [820, 620], [840, 650]], 8, '#7fe8ff', { ow: 4 }); tube(g, [[840, 560], [820, 590], [840, 620], [820, 650]], 8, '#ffa3e0', { ow: 4 });
        T(g, 'ADN', 830, 690, 18, M.cream);
        clock(g, SX, 800, 40, clamp(f * 3)); T(g, 'rapid, dar grosier', SX, 870, 18, M.hi);
      } else if (hi === 1) {
        plate(g, 640, 250, 130, M.agar);
        const u = clamp(f * 2.2); // striurile
        const S = [[[560, 170], [600, 200], [560, 230], [600, 260]], [[610, 270], [650, 300], [620, 330], [680, 320]], [[690, 310], [720, 250], [740, 200]]];
        S.forEach((s, k) => { const uu = clamp(u * 3 - k); if (uu > 0) tube(g, s, 4, '#f6efe0', { u1: uu, ow: 2 }); });
        if (u >= 1) [[722, 238], [735, 205], [705, 285]].forEach(([x, y]) => colony(g, x, y, 10, '#f6efe0'));
        T(g, 'colonii izolate', 640, 410, 17, M.cream);
        // o bacterie → colonie
        const gN = Math.min(3, Math.floor(clamp(f * 2 - 0.6) * 4));
        const pos = [[0, 0], [16, 0], [0, 16], [16, 16], [8, -14], [-14, 8], [30, 8], [8, 30]];
        for (let k = 0; k < 2 ** gN; k++) coccus(g, 850 + pos[k][0], 230 + pos[k][1], 8, '#f6efe0');
        T(g, 'o colonie =\no singură bacterie\ninițială', 860, 340, 16, M.hi);
        // repicare
        const ur = clamp(f * 2 - 1.2);
        if (ur > 0) { const lx0 = lerp(722, 700, ur), ly0 = lerp(238, 640, ur); g.save(); g.translate(lx0, ly0); g.scale(0.6, 0.6); loop(g, 0, 0, -2.4, 0); g.restore(); }
        testTube(g, 640, 560, 70, 180, M.agar, { slant: 1, alpha: 0.9 });
        if (ur > 0.9) for (let k = 0; k < 6; k++) colony(g, 628 + (k % 2) * 22, 620 + k * 14, 6, '#f6efe0');
        T(g, 'repicare → cultură pură', 640, 790, 17, M.cream);
        T(g, 'fără ea: nu identifici,\nnu faci antibiogramă', 860, 640, 16, '#ffd0d0');
      } else if (hi === 2) {
        testTube(g, SX, 360, 70, 180, M.agar, { slant: 1 }); T(g, 'cultura pură', SX, 590, 17, M.cream);
        const ic = [[600, 170, 'cultură'], [850, 170, 'morfotinctorial'], [600, 700, 'biochimic'], [850, 700, 'antigenic']];
        ic.forEach(([x, y, s], k) => {
          const a = clamp(f * 4 - k * 0.8); if (a <= 0) return;
          arr(g, SX + (x < SX ? -40 : 40), y < 400 ? 380 : 560, x + (x < SX ? 20 : -20), y + (y < 400 ? 50 : -60), '#fff3e6', 4, a);
          if (k === 0) { plate(g, x, y, 50, M.blood, { alpha: a }); colony(g, x - 10, y, 9, '#f3ece0', { alpha: a }); colony(g, x + 14, y - 12, 7, '#f3ece0', { alpha: a }); }
          else if (k === 1) field(g, x, y, 52, '#f6f0e6', () => { coccus(g, x - 14, y - 6, 8, COL.cv); coccus(g, x + 2, y - 10, 8, COL.cv); bacillus(g, x + 18, y + 16, 26, 10, 0.6, COL.pink); }, { alpha: a });
          else if (k === 2) { testTube(g, x - 26, y - 50, 24, 80, M.yellow, { level: 0.7, alpha: a }); testTube(g, x + 6, y - 50, 24, 80, M.urPink, { level: 0.7, alpha: a }); testTube(g, x + 38, y - 50, 24, 80, M.simB, { level: 0.7, alpha: a }); }
          else { bacillus(g, x, y, 70, 28, 0, COL.pink, a); ab(g, x - 20, y - 34, 1, 0, '#ffe36e', a); ab(g, x + 20, y + 36, 1, Math.PI, '#ffe36e', a); }
          T(g, s, x, y + (y < 400 ? -72 : 72), 17, M.cream, { alpha: a });
        });
      } else if (hi === 3) {
        // in vitro / in vivo
        testTube(g, 590, 110, 46, 120, '#f6efe0', { level: 0.6 }); T(g, 'in vitro', 590, 270, 18, M.cream);
        g.save(); g.translate(840, 180); ell(g, 0, 0, 70, 40, '#e8e2dc', { ow: 5 }); ell(g, 62, -22, 26, 22, '#e8e2dc', { ow: 5 }); dot(g, 70, -26, 4, OUT, { ow: 0 }); ell(g, 52, -42, 10, 12, '#f2b6c0', { ow: 3 }); tube(g, [[-70, 10], [-110, 30], [-130, 10]], 5, '#f2b6c0', { ow: 3 }); g.restore();
        T(g, 'in vivo', 840, 270, 18, M.cream);
        // antibiograma pe cultura pură
        plate(g, SX, 560, 170, M.mh);
        const u = ease(clamp(f * 1.6));
        g.save(); g.beginPath(); g.arc(SX, 560, 170, 0, 7); g.clip(); g.fillStyle = 'rgba(250,243,226,.78)'; g.fillRect(SX - 180, 380, 360, 360);
        [[-80, -60, 60], [70, -70, 40], [-50, 80, 30], [80, 60, 70]].forEach(([a, c, z]) => { g.fillStyle = M.mh; g.beginPath(); g.arc(SX + a, 560 + c, z * u, 0, 7); g.fill(); });
        g.restore();
        [[-80, -60], [70, -70], [-50, 80], [80, 60]].forEach(([a, c]) => dot(g, SX + a, 560 + c, 13, '#ffffff', { ow: 3 }));
        T(g, 'antibiograma: pe cultura pură', SX, 780, 18, M.hi);
        T(g, 'zona clară = germenul nu crește lângă disc', SX, 830, 16, M.cream, { w: 600 });
      } else {
        // anticorpii pacientului, în dinamică
        testTube(g, 600, 90, 40, 110, '#f6d36b', { level: 0.6, cap: '#d8243c' }); testTube(g, 720, 90, 40, 110, '#f6d36b', { level: 0.6, cap: '#d8243c' });
        T(g, 'proba 1', 600, 240, 16, M.cream); T(g, 'proba 2', 720, 240, 16, M.cream);
        const n2 = 2 + Math.floor(ease(clamp(f * 1.6)) * 6);
        for (let k = 0; k < 2; k++) ab(g, 590 + k * 20, 150, 0.7, 0);
        for (let k = 0; k < n2; k++) ab(g, 704 + (k % 4) * 11, 140 + Math.floor(k / 4) * 22, 0.6, 0);
        T(g, 'anticorpii cresc\nîn dinamică', 880, 150, 17, M.hi);
        // capcana: antigen = direct, anticorp = indirect
        bacillus(g, 640, 400, 110, 44, 0, COL.pink);
        dot(g, 720, 380, 10, '#ffe36e'); T(g, 'antigen = bucată din germen\n→ DIRECT', 640, 470, 16, '#bff0d2');
        ab(g, 860, 400, 1.5, -0.4); T(g, 'anticorp = răspunsul\ngazdei → INDIRECT', 860, 470, 16, '#ffd0d0');
        // IDR: papula crește
        g.save(); g.fillStyle = '#f3c29b'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(530, 620, 400, 120, 50); g.fill(); g.stroke(); g.restore();
        const pu = ease(clamp(f * 1.5 - 0.3));
        ell(g, 730, 680, 18 + 40 * pu, 12 + 26 * pu, '#e88a7a', { ow: 4, alpha: 0.4 + 0.6 * pu });
        T(g, 'IDR (tuberculina): papula la locul injectării', 730, 800, 16, M.cream, { w: 600 });
      }
    },
  };
}

/* =================================================================== 6 · LP 1 · CĂLDURA
 Ce se vede: stânga USCATĂ (roșu, oxidare): ansa intră în flacără și se înroșește (încălzire la roșu); Poupinelul cu aer
 cald care urcă și obiectele potrivite (sticlă, porțelan, metal), 160 °C / 2 h · 180 °C / 1 h; DA/NU. Dreapta UMEDĂ
 (albastru, denaturare): 1 oala care fierbe: bacteriile vegetative mor, sporii rămân (✕ sporii supraviețuiesc);
 2 tindalizarea: ziua 1 încălzești (vegetativele mor) → incubezi: sporii germinează în bacterii → ziua 2 încălzești → …
 → ziua 3 nu mai rămâne nimic; 3 autoclavul: capacul închis, manometrul urcă, termometrul urcă la 121 °C; picăturile de
 abur lovesc obiectul rece, CONDENSEAZĂ pe el (sclipire = căldura cedată) și obiectul se încălzește; proteina din germen se
 desface (denaturare). Jos: aer 160 °C / 2 h vs abur 121 °C / 15 min. */
export function a_heat() {
  sr(21);
  const POT = Array.from({ length: 7 }, () => [R(570, 700), R(210, 270), R(0, 3)]);
  const STEAM = Array.from({ length: 16 }, (_, k) => [R(0, 1), R(0.2, 0.8), k]);
  return {
    home: HOME,
    anchors: [[46, 110], [550, 100], [550, 330], [550, 560]],
    labelText: [],
    draw(g, t, b) {
      bg(g);
      const p = P(b, t, 4, 0.75);
      const dimL = b.i < 0 || b.i === 0 ? 1 : 0.5; const dimR = (k) => (b.i < 0 || b.i === k ? 1 : 0.5);
      hdr(g, 'USCATĂ · oxidare', 250, 44, '#ff8a8a', { w: 300 }); hdr(g, 'UMEDĂ · denaturare', 750, 44, '#9cc3ff', { w: 320 });
      // ---- 1 · ansa la roșu + Poupinel
      panel(g, 20, 80, 460, 720, { fill: on(b, 0) ? 'rgba(255,138,138,.12)' : 'rgba(255,240,228,.05)' });
      g.save(); g.globalAlpha = dimL;
      const hot = b.i === 0 ? ease(clamp(b.bt / 2)) : b.i < 0 ? 0.5 + 0.5 * Math.sin(TT(t) * 1.4) : 1;
      burner(g, 140, 250, t);
      loop(g, 150, 170, 2.6, hot);
      g.restore();
      T(g, 'ansa: încălzire la roșu', 300, 140, 17, '#ffb48a', { alpha: dimL });
      T(g, 'flambare: doar completează\nincinerare: arde tot', 330, 250, 16, M.cream, { alpha: dimL, w: 600 });
      // Poupinel
      g.save(); g.globalAlpha = dimL;
      g.fillStyle = '#c9ced2'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(50, 340, 400, 280, 18); g.fill(); g.stroke();
      g.fillStyle = '#3a2a26'; g.beginPath(); g.roundRect(75, 380, 300, 215, 12); g.fill(); g.stroke();
      g.strokeStyle = '#8a7a72'; g.lineWidth = 4; g.beginPath(); g.moveTo(80, 490); g.lineTo(370, 490); g.stroke();
      // aer cald urcă
      for (let k = 0; k < 5; k++) { const u = loopT(t + k * 0.5, 2.5); zig(g, 100 + k * 60, lerp(585, 400, u), 100 + k * 60, lerp(560, 380, u), 4, 1.5, '#ff8a5a', 3, TT(t) * 4, 0.6 * Math.sin(u * Math.PI)); }
      g.restore();
      // obiecte: flacon de sticlă, vas de porțelan, instrument metalic
      g.save(); g.globalAlpha = dimL;
      const fl = new Path2D(); fl.moveTo(125, 420); fl.lineTo(125, 445); fl.lineTo(100, 485); fl.lineTo(160, 485); fl.lineTo(135, 445); fl.lineTo(135, 420); fl.closePath(); g.fillStyle = 'rgba(220,245,255,.5)'; g.fill(fl); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(fl);
      ell(g, 230, 475, 40, 12, '#f6f3ee', { ow: 4 });
      g.fillStyle = '#b8c2c8'; g.beginPath(); g.roundRect(170, 560, 150, 12, 5); g.fill(); g.stroke();
      g.fillStyle = '#e6d6b0'; g.beginPath(); g.ellipse(320, 480, 26, 10, 0, 0, 7); g.fill(); g.stroke();
      g.restore();
      T(g, 'Poupinel', 410, 400, 17, OUT, { stroke: false, alpha: dimL });
      thermo(g, 410, 430, 120, 0.85, { alpha: dimL });
      pill(g, 250, 660, 400, 50, '#ffd0d0', '160 °C / 2 h · 180 °C / 1 h', { size: 20, alpha: dimL });
      T(g, '✓ sticlă, porțelan, metal, pulberi', 250, 718, 17, '#9dff8a', { alpha: dimL });
      T(g, '✕ lichide, plastic, textile', 250, 760, 17, '#ff8a8a', { alpha: dimL });
      // ---- 2 · fierbere (dreapta sus)
      panel(g, 520, 80, 460, 220, { fill: on(b, 1) ? 'rgba(156,195,255,.14)' : 'rgba(255,240,228,.05)' });
      g.save(); g.globalAlpha = dimR(1);
      g.fillStyle = '#9aa4ab'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(550, 180, 180, 105, 14); g.fill(); g.stroke();
      g.fillStyle = 'rgba(140,200,255,.6)'; g.fillRect(556, 198, 168, 82);
      for (let k = 0; k < 6; k++) { const u = loopT(t + k * 0.37, 1.4); dot(g, 570 + k * 28, lerp(278, 200, u), 5 + 3 * u, '#e8f4ff', { ow: 2, alpha: 1 - u }); }
      g.restore();
      const kp1 = b.i === 1 ? ease(clamp(b.bt / 3)) : b.i < 0 ? p(1) : 1;
      POT.forEach(([x, y, r]) => rod(g, x, y, 24, 10, r, COL.pink, dimR(1), kp1));
      spore(g, 600, 240, 1, { alpha: dimR(1) }); spore(g, 690, 225, 1, { alpha: dimR(1) });
      T(g, 'fierbere 100 °C, 30 min\nvapori fluenți (vasul Koch)', 855, 150, 16, M.cream, { alpha: dimR(1), w: 600 });
      T(g, '✕ sporii supraviețuiesc', 855, 240, 18, '#ff8a8a', { alpha: dimR(1) * kp1 });
      // ---- 3 · tindalizare: 3 zile
      panel(g, 520, 315, 460, 225, { fill: on(b, 2) ? 'rgba(156,195,255,.14)' : 'rgba(255,240,228,.05)' });
      const tp = b.i === 2 ? fb(b, 0.85) : b.i < 0 ? p(2) : b.i > 2 ? 1 : 0;
      const ph = tp * 6; // 0–1 ziua 1 încălzire, 1–2 germinare, 2–3 ziua 2, 3–4 germinare, 4–5 ziua 3, 5–6 gol
      const day = Math.min(3, 1 + Math.floor(ph / 2));
      [0, 1, 2].forEach((d) => { const x = 590 + d * 150; pill(g, x, 345, 110, 34, day - 1 === d ? '#ffe36e' : '#3a3046', `ziua ${d + 1}`, { size: 16, col: day - 1 === d ? OUT : '#d8c4b8', alpha: dimR(2) }); });
      const heating = Math.floor(ph) % 2 === 0 && ph < 5;
      if (heating) flame(g, 600 + Math.floor(ph / 2) * 150, 520, 0.5, t, dimR(2));
      // ziua 1: încălzirea omoară forma vegetativă (V), sporii rămân; incubarea: sporul 1 germinează; ziua 2 îl omoară; sporul 2 germinează; ziua 3 îl omoară
      if (ph < 1.6) rod(g, 640, 430, 34, 13, 0.3, COL.pink, dimR(2) * (1 - clamp((ph - 1.2) * 2.5)), clamp(ph * 1.5));
      [[750, 455], [850, 420]].forEach(([x, y], j) => {
        const i = j + 1, gs = 2 * i - 1, ks = 2 * i; if (ph > ks + 0.8) return;
        const gm = clamp(ph - gs); const dd = clamp((ph - ks) * 1.5);
        if (ph < gs) spore(g, x, y, 1.1, { alpha: dimR(2) });
        else if (gm < 1) { spore(g, x, y, 1.1, { alpha: dimR(2) * (1 - gm) }); rod(g, x, y, 34, 13, 0.3, COL.pink, dimR(2) * gm); }
        else rod(g, x, y, 34, 13, 0.3, COL.pink, dimR(2) * (1 - clamp((ph - ks - 0.4) * 2.5)), dd);
      });
      T(g, heating ? 'încălzești' : ph < 5 ? 'incubezi: sporii germinează' : 'după 3 zile: nimic viu', 750, 515, 17, heating ? '#ffb48a' : '#bff0d2', { alpha: dimR(2) });
      // ---- 4 · autoclavul
      panel(g, 520, 555, 460, 245, { fill: on(b, 3) ? 'rgba(156,195,255,.14)' : 'rgba(255,240,228,.05)' });
      const ap = b.i === 3 ? fb(b, 0.8) : b.i < 0 ? p(3) : b.i > 3 ? 1 : 0;
      g.save(); g.globalAlpha = dimR(3);
      g.fillStyle = '#c9ced2'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(545, 600, 230, 180, 26); g.fill(); g.stroke();
      g.fillStyle = '#4a5a66'; g.fillRect(565, 615, 190, 150); g.strokeRect(565, 615, 190, 150);
      g.fillStyle = '#7d8a93'; g.fillRect(540, 588, 240, 16); g.strokeRect(540, 588, 240, 16);
      g.restore();
      const warm = clamp(ap * 1.3 - 0.3);
      g.save(); g.globalAlpha = dimR(3); g.fillStyle = mix('#7fb8ff', '#ff9a5a', warm); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(600, 720, 120, 18, 6); g.fill(); g.stroke(); g.restore();
      STEAM.forEach(([x0, sp2, k]) => { // abur → condensează pe obiect
        const u = loopT(t + k * 0.21, 1.6); const x = lerp(575, 745, x0), y = lerp(625, 716, u);
        const hitObj = x > 600 && x < 720;
        if (hitObj && u > 0.95) { g.save(); g.globalAlpha = dimR(3) * ap; g.fillStyle = '#ffe36e'; g.shadowColor = '#ffe36e'; g.shadowBlur = 16; g.beginPath(); g.arc(x, 716, 7, 0, 7); g.fill(); g.restore(); }
        else dot(g, x, y, 5, '#e8f4ff', { alpha: dimR(3) * ap * (hitObj ? 1 : 0.5), ow: 2 });
      });
      gauge(g, 815, 640, 34, ap * 0.7, dimR(3)); T(g, 'presiune', 815, 690, 15, M.cream, { alpha: dimR(3), w: 600 });
      thermo(g, 905, 600, 120, 0.4 + 0.5 * ap, { alpha: dimR(3) }); T(g, `${Math.round(lerp(100, 121, ap))} °C`, 905, 760, 17, M.hi, { alpha: dimR(3) });
      // proteina: ghem → fir desfăcut
      const pu = clamp(ap * 1.4 - 0.4);
      const prot = []; for (let k = 0; k <= 16; k++) { const a = k / 16 * Math.PI * 4; const r = lerp(14, 0, pu); prot.push([815 + lerp(Math.cos(a) * r, (k - 8) * 6, pu), 730 + lerp(Math.sin(a) * r, Math.sin(k) * 4, pu)]); }
      tube(g, prot, 5, '#ffa3e0', { ow: 3, raw: true, alpha: dimR(3) });
      T(g, '121 °C, 15–30 min · bloc: 134 °C, 30 min', 750, 790, 15, M.cream, { alpha: dimR(3), w: 600 });
      // ---- comparația
      pill(g, 500, 860, 900, 60, '#fff3e6', '', { r: 18 });
      T(g, 'aer: 160 °C / 2 h', 270, 860, 21, '#c43b33', { stroke: false }); T(g, 'vs', 500, 860, 19, OUT, { stroke: false }); T(g, 'abur: 121 °C / 15 min', 730, 860, 21, '#2a5aa3', { stroke: false });
      if (on(b, 0)) ring(g, 150, 190, 90, 90, ease(b.bt));
    },
  };
}

/* =================================================================== 7 · LP 1 · ALTE METODE
 Ce se vede: 1 pasteurizarea: laptele încălzit sub 100 °C, majoritatea bacteriilor mor, câteva rămân (LP: micobacteriile,
 enterovirusurile) → NU e sterilizare. 2 filtrarea: lichidul curge în jos prin porii membranei; bacteriile, prea mari,
 rămân deasupra, VII. 3 radiațiile: cele ionizante (galben) trec prin ambalaj și rup ADN-ul bacteriei din interior; UV
 (violet) se opresc la suprafață: bacteria de pe suprafață moare, cea din umbră/sub ambalaj rămâne. 4 chimice: alcoolul
 70% (cu apă) intră în celulă și o denaturează toată (gri); alcoolul 100% coagulează doar marginea (crustă), interiorul
 rămâne viu. 5 prezervarea: la 4 °C bacteria se oprește din diviziune (nu moare); −70 °C; liofilizarea: cristale de
 gheață → apa pleacă sub formă de vapori → pulbere uscată. */
export function a_other() {
  sr(31);
  const MILK = Array.from({ length: 10 }, () => [R(90, 200), R(130, 270), R(0, 3)]);
  return {
    home: HOME,
    anchors: [[50, 60], [540, 60], [50, 370], [540, 370], [50, 680]],
    labelText: ['ADN', 'UV', 'HEPA'],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5, 0.7);
      const til = (x, y, w, h, k, s) => { panel(g, x, y, w, h, { fill: on(b, k) ? 'rgba(14,156,134,.16)' : 'rgba(255,240,228,.05)', stroke: on(b, k) ? 'rgba(127,227,207,.7)' : 'rgba(255,230,210,.16)' }); T(g, s, x + w / 2, y + 28, 20, '#9ef0dd'); };
      const al = (k) => (b.i < 0 || b.i === k ? 1 : 0.55);
      // 1 · Pasteurizare
      til(20, 30, 470, 300, 0, 'Pasteurizare');
      g.save(); g.globalAlpha = al(0);
      const bt = new Path2D(); bt.moveTo(120, 90); bt.lineTo(120, 110); bt.lineTo(80, 140); bt.lineTo(80, 290); bt.lineTo(210, 290); bt.lineTo(210, 140); bt.lineTo(170, 110); bt.lineTo(170, 90); bt.closePath();
      g.fillStyle = '#fbf7ef'; g.fill(bt); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(bt);
      g.restore();
      const u0 = p(0);
      MILK.forEach(([x, y, r], k) => rod(g, x, y, 22, 9, r, COL.pink, al(0), k < 2 ? 0 : u0));
      thermo(g, 260, 100, 140, 0.45 + 0.3 * u0, { alpha: al(0) }); T(g, 'sub 100 °C', 260, 278, 16, M.hi, { alpha: al(0) });
      T(g, 'reduce patogenii\n(lapte)', 390, 130, 16, M.cream, { alpha: al(0), w: 600 });
      T(g, 'rămân: micobacterii,\nenterovirusuri (LP)', 390, 205, 16, '#ffd0d0', { alpha: al(0) * u0 });
      T(g, 'NU e sterilizare', 390, 275, 18, '#ff8a8a', { alpha: al(0) });
      // 2 · Filtrare
      til(510, 30, 470, 300, 1, 'Filtrare');
      g.save(); g.globalAlpha = al(1);
      const fn = new Path2D(); fn.moveTo(560, 80); fn.lineTo(760, 80); fn.lineTo(720, 190); fn.lineTo(600, 190); fn.closePath(); g.fillStyle = 'rgba(140,200,255,.25)'; g.fill(fn); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(fn);
      g.fillStyle = '#e8dcc6'; g.fillRect(596, 188, 128, 10); g.strokeRect(596, 188, 128, 10);
      g.fillStyle = OUT; for (let k = 0; k < 8; k++) g.fillRect(604 + k * 15, 188, 4, 10);
      g.fillStyle = 'rgba(220,245,255,.25)'; g.strokeStyle = OUT; g.beginPath(); g.roundRect(610, 210, 100, 90, 10); g.fill(); g.stroke();
      g.restore();
      const u1 = b.i < 0 ? 1 : p(1);
      for (let k = 0; k < 8; k++) { const u = loopT(t + k * 0.3, 2.4); const x = 612 + k * 13; dot(g, x, lerp(110, 290, u), 4, '#7fd3ff', { alpha: al(1), ow: 1.5 }); }
      for (let k = 0; k < 6; k++) { const yy = lerp(100 + k * 8, 176 - (k % 2) * 10, ease(clamp(u1 * 1.5 - k * 0.1))); rod(g, 620 + k * 16, yy, 18, 9, 0.2 + k, COL.pink, al(1)); }
      T(g, 'membrană 0,22 µm\nseruri, antibiotice', 860, 110, 16, M.cream, { alpha: al(1), w: 600 });
      T(g, 'germenii rămân sus\n(vii: nu-i omoară)', 860, 190, 16, M.hi, { alpha: al(1) });
      T(g, 'aer: hota HEPA', 860, 270, 16, M.cream, { alpha: al(1), w: 600 });
      // 3 · Radiații
      til(20, 345, 470, 310, 2, 'Radiații');
      const u2 = b.i < 0 ? loopT(t, 3) : p(2);
      g.save(); g.globalAlpha = al(2); g.fillStyle = '#c9a77a'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(60, 470, 150, 110, 8); g.fill(); g.stroke(); g.restore();
      rod(g, 135, 525, 50, 20, 0.2, COL.pink, al(2), clamp(u2 * 2 - 1));
      zig(g, 135, 400, 135, 400 + 125 * clamp(u2 * 2), 8, 4, '#ffe36e', 4, TT(t) * 6, al(2));
      T(g, 'ionizante:\ntrec prin ambalaj', 135, 620, 16, '#ffe36e', { alpha: al(2) });
      g.save(); g.globalAlpha = al(2); g.fillStyle = '#9aa4ab'; g.strokeStyle = OUT; g.lineWidth = 5; g.fillRect(270, 520, 190, 30); g.strokeRect(270, 520, 190, 30); g.fillStyle = '#c9a77a'; g.fillRect(380, 470, 70, 50); g.strokeRect(380, 470, 70, 50); g.restore();
      rod(g, 320, 510, 34, 14, 0, COL.pink, al(2), clamp(u2 * 2 - 1));
      rod(g, 415, 505, 30, 12, 0, COL.pink, al(2) * 0.9);
      zig(g, 320, 400, 320, 400 + 95 * clamp(u2 * 2), 6, 5, '#c08aff', 4, TT(t) * 6, al(2));
      zig(g, 415, 400, 415, 400 + 68 * clamp(u2 * 2), 6, 5, '#c08aff', 4, TT(t) * 6, al(2));
      T(g, 'UV: doar suprafața;\ndedesubt rămâne viu', 365, 600, 16, '#c08aff', { alpha: al(2) });
      T(g, 'ambele lovesc ADN-ul', 250, 640, 15, M.cream, { alpha: al(2), w: 600 });
      // 4 · Chimice: alcool 70% vs 100%
      til(510, 345, 470, 310, 3, 'Chimice');
      const u3 = b.i < 0 ? loopT(t, 3.5) * 1.2 : p(3);
      ell(g, 620, 490, 70, 48, mix('#f2a3c6', '#9b958f', clamp(u3 * 1.3 - 0.3)), { ow: 6, alpha: al(3) });
      for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; const r = lerp(110, 20, clamp(u3 * 1.4 - k * 0.05)); dot(g, 620 + Math.cos(a) * r, 490 + Math.sin(a) * r * 0.7, 6, '#7fd3ff', { alpha: al(3), ow: 2 }); }
      T(g, 'alcool 70%: intră,\ndenaturează tot', 620, 585, 16, '#9dff8a', { alpha: al(3) });
      ell(g, 860, 490, 70, 48, '#f2a3c6', { ow: 6, alpha: al(3) });
      g.save(); g.globalAlpha = al(3); g.strokeStyle = '#6b5a4a'; g.lineWidth = 4 + 12 * clamp(u3 * 1.4); g.beginPath(); g.ellipse(860, 490, 64, 42, 0, 0, 7); g.stroke(); g.restore();
      T(g, 'alcool 100%: crustă,\ninteriorul rămâne viu', 860, 585, 16, '#ff8a8a', { alpha: al(3) });
      T(g, 'sporicide: glutaraldehidă 2%, oxid de etilen', 745, 400, 15, M.cream, { alpha: al(3), w: 600 });
      T(g, 'iod · fenoli · detergenți · formaldehidă (dezinfectează)', 745, 630, 14, M.dim, { alpha: al(3), w: 600 });
      // 5 · Prezervare
      til(20, 670, 960, 240, 4, 'Prezervare: vrei germenii VII');
      const u4 = b.i < 0 ? loopT(t, 4) : p(4);
      // 4 °C: diviziunea se oprește la jumătate
      const dv = Math.min(0.5, (REDUCED ? 0.5 : (t * 0.4) % 1));
      thermo(g, 90, 730, 110, 0.25, { col: '#7fb8ff', alpha: al(4) });
      rod(g, 200 - dv * 20, 800, 40, 16, 0, COL.pink, al(4)); rod(g, 240 + dv * 20, 800, 40, 16, 0, COL.pink, al(4));
      T(g, '4 °C: oprește creșterea\n(bacteriostatic)', 230, 870, 16, '#7fb8ff', { alpha: al(4) });
      thermo(g, 430, 730, 110, 0.08, { col: '#9fe8ff', alpha: al(4) }); T(g, '−70 °C', 430, 880, 17, '#9fe8ff', { alpha: al(4) });
      // liofilizare
      testTube(g, 640, 740, 50, 110, '#ffffff', { level: 0.5 * (1 - u4 * 0.7), alpha: al(4) });
      for (let k = 0; k < 5; k++) { g.save(); g.globalAlpha = al(4) * (1 - u4); g.strokeStyle = '#bfefff'; g.lineWidth = 3; const x = 630 + (k % 3) * 10, y = 820 + Math.floor(k / 3) * 12; g.beginPath(); g.moveTo(x - 6, y); g.lineTo(x + 6, y); g.moveTo(x, y - 6); g.lineTo(x, y + 6); g.stroke(); g.restore(); }
      for (let k = 0; k < 4; k++) { const u = loopT(t + k * 0.4, 1.6); dot(g, 630 + k * 8, lerp(760, 690, u), 4, '#e8f4ff', { alpha: al(4) * u4 * (1 - u), ow: 1.5 }); }
      T(g, 'liofilizare = congelare bruscă\n+ desicare (pe termen lung)', 830, 800, 16, M.cream, { alpha: al(4) });
    },
  };
}

/* =================================================================== 8 · LP 1 · CONTROLUL STERILIZĂRII
 Ce se vede: autoclavul cu ciclul pornit: termometrul urcă la 121 °C, manometrul urcă, cronometrul se umple (FIZIC);
 cristalele de acid benzoic se topesc DOAR când temperatura atinge 121 °C (CHIMIC); în fiola Stearotest sporii de
 B. stearothermophilus mor la 121 °C, APOI indicatorul fiolei virează (BIOLOGIC). Jos, controlul sterilității: tamponul
 ia probă de pe o suprafață sterilă, o însămânțează pe placă, după incubare nu crește nimic = sterilitatea se menține. */
export function a_ctrl() {
  const CX = 300, CY = 400;
  return {
    home: HOME,
    anchors: [[640, 100], [640, 300], [640, 500], [56, 700]],
    labelText: ['B. stearothermophilus'],
    draw(g, t, b) {
      bg(g);
      const temp = b.i < 0 ? clamp(loopT(t, 6) * 1.6) : b.i === 0 ? fb(b, 0.7) : 1; // 0 → 121 °C
      const T121 = temp >= 0.999;
      const after = b.i < 0 ? clamp(loopT(t, 6) * 1.6 - 1) * 1.7 : b.i === 0 ? 0 : b.i === 1 || b.i === 2 ? fb(b, 0.7) : 1; // după atingerea 121
      // autoclavul
      g.save(); g.fillStyle = '#c9ced2'; g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.roundRect(60, 120, 480, 520, 40); g.fill(); g.stroke();
      g.fillStyle = '#4a5a66'; g.beginPath(); g.arc(CX, CY, 220, 0, 7); g.fill(); g.stroke(); g.restore();
      T(g, 'autoclav', CX, 95, 20, M.cream);
      thermo(g, 170, 270, 220, 0.2 + 0.75 * temp); T(g, `${Math.round(lerp(20, 121, temp))} °C`, 170, 540, 20, T121 ? M.hi : M.cream);
      gauge(g, 300, 240, 52, temp * 0.7); clock(g, 410, 260, 36, temp, 1, '#7fe8ff');
      // acid benzoic: cristale → topit la 121 °C
      const melt = T121 ? clamp(after * 1.6) : 0;
      ell(g, 290, 470, 70, 22, '#e8eef2', { ow: 5 });
      g.save(); g.globalAlpha = 1 - melt; g.fillStyle = '#ffffff'; g.strokeStyle = OUT; g.lineWidth = 3;
      for (let k = 0; k < 5; k++) { g.save(); g.translate(250 + k * 20, 458); g.rotate(-0.4 + k * 0.2); g.fillRect(-4, -18, 8, 26); g.strokeRect(-4, -18, 8, 26); g.restore(); }
      g.restore();
      if (melt > 0) ell(g, 290, 468, 52 * melt, 12 * melt, 'rgba(220,240,255,.85)', { ow: 3 });
      T(g, melt > 0.5 ? 'topit ✓' : 'acid benzoic', 290, 515, 16, melt > 0.5 ? M.hi : M.cream);
      // fiola Stearotest
      const vx = 420, vy = 380;
      g.save(); g.fillStyle = 'rgba(220,245,255,.3)'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(vx - 22, vy, 44, 140, 18); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(vx - 8, vy); g.lineTo(vx - 4, vy - 30); g.lineTo(vx + 4, vy - 30); g.lineTo(vx + 8, vy); g.fill(); g.stroke(); g.restore();
      const sd = T121 ? clamp(after * 2) : 0;
      [[vx - 8, vy + 60], [vx + 8, vy + 85], [vx - 6, vy + 110]].forEach(([x, y]) => spore(g, x, y, 0.75, { dead: sd }));
      const vir = T121 ? clamp(after * 2 - 1) : 0; // indicatorul virează DUPĂ ce sporii au murit
      g.save(); g.fillStyle = mix('#f2ead8', '#3a3046', vir); g.strokeStyle = OUT; g.lineWidth = 4; g.fillRect(vx - 22, vy + 20, 44, 22); g.strokeRect(vx - 22, vy + 20, 44, 22); g.restore();
      T(g, vir > 0.5 ? 'virat' : 'indicator', vx, vy + 160, 15, vir > 0.5 ? M.hi : M.cream);
      // casetele
      const bx = (y, h, s1, s2, k) => { pill(g, 800, y, 330, 120, b.i === k ? '#ffe9a8' : '#e6f4ef', '', { glow: b.i === k ? 1 : 0, r: 18 }); T(g, h, 800, y - 26, 21, OUT, { stroke: false }); T(g, s1, 800, y + 10, 16, OUT, { stroke: false, w: 600 }); T(g, s2, 800, y + 36, 16, OUT, { stroke: false, w: 600 }); };
      bx(150, 'FIZIC', 'termometru · manometru', 'timpul de expunere', 0);
      bx(350, 'CHIMIC', 'acid benzoic:', 'se topește la 121 °C', 1);
      bx(550, 'BIOLOGIC', 'Stearotest: spori de', 'B. stearothermophilus', 2);
      arr(g, 460, 250, 630, 160, '#fff3e6', 5, 0.7); arr(g, 360, 470, 630, 360, '#fff3e6', 5, 0.7); arr(g, 450, 470, 630, 560, '#fff3e6', 5, 0.7);
      // controlul sterilității
      panel(g, 30, 680, 940, 230, { fill: b.i === 3 ? 'rgba(14,156,134,.16)' : 'rgba(255,240,228,.05)', stroke: b.i === 3 ? 'rgba(127,227,207,.7)' : 'rgba(255,230,210,.16)' });
      T(g, 'controlul sterilității = sterilizarea a mers + sterilitatea se menține', 500, 708, 17, '#9ef0dd');
      const cs = b.i === 3 ? fb(b, 0.8) : b.i < 0 ? loopT(t, 5) : 1;
      g.save(); g.fillStyle = '#b8c2c8'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(80, 800, 220, 40, 8); g.fill(); g.stroke(); g.restore();
      T(g, 'suprafață sterilă', 190, 870, 16, M.cream);
      const su = clamp(cs * 3); const sx = su < 0.5 ? lerp(120, 260, su * 2) : lerp(260, 520, (su - 0.5) * 2); const sy = su < 0.5 ? 790 : lerp(790, 800, (su - 0.5) * 2);
      swab(g, sx, sy, -1.1, 1, 90);
      arr(g, 330, 810, 420, 810, '#fff3e6', 5, 0.8);
      plate(g, 520, 810, 70, M.agar);
      clock(g, 680, 810, 34, clamp(cs * 3 - 1.2)); T(g, 'incubare', 680, 870, 16, M.cream);
      arr(g, 730, 810, 790, 810, '#fff3e6', 5, 0.8);
      if (cs > 0.75) { check(g, 860, 800, 1.2, (cs - 0.75) * 4); T(g, 'nu crește nimic', 870, 860, 16, M.hi, { alpha: (cs - 0.75) * 4 }); }
    },
  };
}

/* =================================================================== 9 · LP 2 · EXAMENUL MICROSCOPIC
 Ce se vede: 1 preparatul nativ: bacterii nevopsite (gri) care SE MIȘCĂ (mobilitate), plus fondul întunecat cu spirochete
 albe ondulate; 2 Burri: fond negru de tuș, germenul și capsula rămân albe; particulele de tuș se lovesc de capsulă și NU
 intră; 3 frotiul colorat: coci violet, nemișcați. Jos, frotiul în 3 pași, în ordine: etalare (picătura e întinsă cu ansa,
 fără să atingă marginile lamei) → uscare (la t° camerei, apa se evaporă) → fixare (lama trece prin flacără; germenii nu se
 mai mișcă, rămân lipiți și morți). */
export function a_prep() {
  sr(41);
  const NAT = Array.from({ length: 7 }, () => [R(-100, 100), R(-100, 100), R(0, 6.28), R(0.6, 1.2)]);
  const BUR = [[-55, -45], [50, -30], [-20, 55], [60, 60]];
  const INK = Array.from({ length: 60 }, () => [R(-130, 130), R(-130, 130), R(0, 6.28)]);
  const CO = Array.from({ length: 12 }, () => [R(-100, 100), R(-100, 100)]);
  return {
    home: HOME,
    anchors: [[60, 120], [390, 120], [715, 120], [60, 545]],
    labelText: [],
    draw(g, t, b) {
      bg(g); const tt = TT(t);
      const al = (k) => (b.i < 0 || b.i === k ? 1 : 0.55);
      // 1 · nativ
      field(g, 175, 260, 140, '#eef3f6', () => {
        NAT.forEach(([x, y, a, s], k) => { const xx = 175 + ((x + tt * 40 * s * Math.cos(a) + 140) % 280 + 280) % 280 - 140; const yy = 260 + ((y + tt * 40 * s * Math.sin(a) + 140) % 280 + 280) % 280 - 140; bacillus(g, xx, yy, 32, 12, a, '#93a5ae'); });
      }, { alpha: al(0) });
      T(g, 'nativ: germeni vii', 175, 425, 18, M.cream, { alpha: al(0) });
      field(g, 175, 500, 62, '#0b0a0e', () => { for (let k = 0; k < 3; k++) { const pts = []; for (let j = 0; j <= 20; j++) pts.push([130 + j * 4.5, 480 + k * 18 + Math.sin(j * 1.3 + tt * 5 + k) * 5]); tube(g, pts, 3, '#f6f6ff', { ow: 0, raw: true, alpha: al(0) }); } }, { alpha: al(0) });
      T(g, 'fond întunecat:\nspirochete', 330, 500, 16, M.cream, { alpha: al(0), w: 600 });
      // 2 · Burri
      field(g, 500, 260, 140, '#2b2733', () => {
        INK.forEach(([x, y, a], k) => { let xx = 500 + x + Math.sin(tt * 1.5 + a) * 8, yy = 260 + y + Math.cos(tt * 1.3 + a) * 8; BUR.forEach(([bx, by]) => { const dx = xx - 500 - bx, dy = yy - 260 - by, d = Math.hypot(dx, dy); if (d < 40) { xx = 500 + bx + dx / d * 40; yy = 260 + by + dy / d * 40; } }); dot(g, xx, yy, 4.5, '#0a090c', { ow: 0 }); });
        BUR.forEach(([x, y]) => { ell(g, 500 + x, 260 + y, 34, 26, '#f4f2f6', { ow: 0 }); ell(g, 500 + x, 260 + y, 18, 11, '#ffffff', { ow: 2, sc: 'rgba(0,0,0,.25)' }); });
      }, { alpha: al(1) });
      T(g, 'Burri: tușul colorează fondul', 500, 425, 18, M.cream, { alpha: al(1) });
      T(g, 'germenul + capsula\nrămân albe', 500, 480, 16, M.hi, { alpha: al(1) });
      // 3 · frotiu colorat
      field(g, 825, 260, 140, '#f6f0e6', () => { CO.forEach(([x, y]) => { coccus(g, 825 + x, 260 + y, 10, COL.cv); coccus(g, 825 + x + 18, 260 + y + 4, 10, COL.cv); }); }, { alpha: al(2) });
      T(g, 'frotiu colorat', 825, 425, 18, M.cream, { alpha: al(2) });
      T(g, 'simple (formă) ·\ncompuse (Gram, Ziehl-Neelsen)', 825, 480, 16, M.cream, { alpha: al(2), w: 600 });
      // 4 · frotiul în 3 pași
      panel(g, 30, 560, 940, 350, { fill: on(b, 3) ? 'rgba(14,156,134,.16)' : 'rgba(255,240,228,.05)', stroke: on(b, 3) ? 'rgba(127,227,207,.7)' : 'rgba(255,230,210,.16)' });
      const ps = b.i === 3 ? fb(b, 0.9) * 3 : b.i < 0 ? loopT(t, 9) * 3 : 3;
      const slide = (x) => { g.save(); g.fillStyle = 'rgba(220,245,255,.55)'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(x - 120, 700, 240, 70, 6); g.fill(); g.stroke(); g.restore(); };
      ['Etalare', 'Uscare', 'Fixare'].forEach((s, k) => { const x = 180 + k * 320; pill(g, x, 610, 200, 46, Math.floor(ps) === k ? '#ffe36e' : '#e6f4ef', s, { size: 20, glow: Math.floor(ps) === k ? 1 : 0 }); if (k < 2) arr(g, x + 112, 610, x + 206, 610, '#fff3e6', 5, 0.8); slide(x); });
      // etalare: pata se întinde, fără margini
      const e = ease(clamp(ps)); ell(g, 180, 735, 20 + 70 * e, 8 + 18 * e, 'rgba(242,190,170,.85)', { ow: 2 });
      if (ps < 1) { g.save(); g.translate(180 + Math.cos(tt * 4) * 50 * e, 735 + Math.sin(tt * 4) * 14 * e); g.scale(0.45, 0.45); loop(g, 0, 0, -2.2, 0); g.restore(); }
      T(g, 'fără margini', 180, 815, 17, M.cream);
      // uscare
      const d = ease(clamp(ps - 1)); ell(g, 500, 735, 90, 26, mix('#f2beaa', '#e8d8cc', d), { ow: 2, alpha: ps >= 1 ? 1 : 0.4 });
      if (ps >= 1 && ps < 2) for (let k = 0; k < 4; k++) { const u = loopT(t + k * 0.3, 1.2); zig(g, 460 + k * 25, lerp(715, 660, u), 460 + k * 25, lerp(700, 650, u), 3, 1, '#e8f4ff', 2, tt * 6, 1 - u); }
      T(g, 't° camerei', 500, 815, 17, M.cream);
      // fixare: lama trece prin flacără; germenii se opresc
      const fx = ease(clamp(ps - 2));
      flame(g, 820, 880, 0.6, t, ps >= 2 ? 1 : 0.4);
      const off = ps >= 2 && ps < 3 ? Math.sin((ps - 2) * Math.PI * 6) * 60 : 0;
      g.save(); g.translate(off, 0); ell(g, 820, 735, 90, 26, '#e8d8cc', { ow: 2, alpha: ps >= 2 ? 1 : 0.4 });
      for (let k = 0; k < 5; k++) { const j = fx < 1 ? Math.sin(tt * 9 + k) * 6 * (1 - fx) : 0; bacillus(g, 770 + k * 25 + j, 735 + (k % 2 ? 6 : -6), 16, 7, k + j * 0.1, '#93a5ae', ps >= 2 ? 1 : 0.4); }
      g.restore();
      T(g, 'flacără: omoară + lipește', 820, 815, 17, fx > 0.5 ? M.hi : M.cream);
    },
  };
}

/* =================================================================== 10 · LP 2 · GRAM + ZIEHL-NEELSEN + NEISSER
 Ce se vede: două celule secționate: Gram + (peptidoglican GROS, cu pori, peste membrana citoplasmatică) și Gram −
 (membrana externă cu LPS + peptidoglican subțire + membrana citoplasmatică). Pașii, în ordine: cristal violet → ambele
 devin violet; Lugol → violetul se leagă în complexe mari (violet mai închis); alcool → la Gram + porii se strâng și
 complexul rămâne înăuntru (violet); la Gram − membrana externă se dizolvă și complexul IESE (celula devine incoloră);
 fuxină → Gram − devine roz-roșu, Gram + rămâne violet. Punctul 3: durata alcoolului: prea scurt → și Gram − rămâne violet
 (fals Gram +); corect; prea lung → și Gram + se decolorează și iese roșu (fals Gram −).
 Jos: Ziehl-Neelsen, în ordine: fucsină fenicată (totul roșu) → alcool acid (fondul se decolorează, bacilii rămân roșii) →
 albastru de metilen (fondul albastru) = BAAR roșii pe albastru. Neisser: bacili galbeni cu granulații albastre-negre la
 capete, care se așază în V, L („litere chinezești”). */
export function a_gram() {
  const SEQ = [['cristal violet', COL.cv, '2 min'], ['Lugol', '#8a5a12', '2 min'], ['alcool', '#b8b8b8', 'decolorare'], ['fuxină', COL.red, '2 min']];
  sr(51);
  const ZN = Array.from({ length: 9 }, () => [R(-90, 90), R(-90, 90), R(0, 3)]);
  const NE = [[-60, -40, 0.0, 0.9], [-60, -40, 0.9, 0.9], [30, -60, 1.6, -0.9], [30, -60, 0.6, -0.9], [-20, 40, 0.3, 1.3], [-20, 40, 1.6, 1.3], [60, 40, 2.4, 0], [60, 40, 0.8, 0]];
  function cell(g, cx, cy, pos, s, t, focus) {
    // s = etapa 0..4 (continuă); interiorul își schimbă culoarea după etapă
    const cream = '#f3e6d0';
    let c;
    if (s < 1) c = mix(cream, COL.cv, s);
    else if (s < 2) c = mix(COL.cv, COL.cvi, s - 1);
    else if (s < 3) c = pos ? COL.cvi : mix(COL.cvi, cream, s - 2);
    else c = pos ? COL.cvi : mix(cream, COL.pink, s - 3);
    const a = focus ? 1 : 0.55;
    g.save(); g.globalAlpha = a;
    // interior
    g.fillStyle = c; g.beginPath(); g.ellipse(cx, cy, 150, 92, 0, 0, 7); g.fill();
    // membrana citoplasmatică
    g.strokeStyle = '#f4d35e'; g.lineWidth = 6; g.beginPath(); g.ellipse(cx, cy, 152, 94, 0, 0, 7); g.stroke();
    if (pos) {
      // peptidoglican gros, cu pori care se strâng la alcool
      const pore = s < 2 ? 1 : s < 3 ? 1 - (s - 2) : 0;
      g.strokeStyle = '#c9a25a'; g.lineWidth = 26; g.setLineDash([22, 6 + 10 * pore]); g.beginPath(); g.ellipse(cx, cy, 170, 112, 0, 0, 7); g.stroke(); g.setLineDash([]);
      g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.ellipse(cx, cy, 184, 126, 0, 0, 7); g.stroke();
    } else {
      g.strokeStyle = '#c9a25a'; g.lineWidth = 6; g.beginPath(); g.ellipse(cx, cy, 160, 102, 0, 0, 7); g.stroke();
      const om = s < 2 ? 1 : s < 3 ? 1 - (s - 2) : 0;
      g.globalAlpha = a * (0.15 + 0.85 * om); g.strokeStyle = '#f08aa0'; g.lineWidth = 12; g.beginPath(); g.ellipse(cx, cy, 172, 114, 0, 0, 7); g.stroke();
      for (let k = 0; k < 28; k++) { const an = k / 28 * Math.PI * 2; dot(g, cx + Math.cos(an) * 182, cy + Math.sin(an) * 124, 4, '#ffd0dc', { ow: 1.5 }); }
      g.globalAlpha = a;
      g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.ellipse(cx, cy, 188, 130, 0, 0, 7); g.stroke();
      // complexul iese la alcool
      if (s > 2 && s < 3) for (let k = 0; k < 6; k++) { const an = k / 6 * Math.PI * 2 + 0.3; const r = lerp(60, 230, s - 2); dot(g, cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.62, 10, COL.cvi, { alpha: a * (1 - (s - 2)) }); }
    }
    // complexe violet–iod în interior
    if (s >= 1 && (pos || s < 2.4)) for (let k = 0; k < 5; k++) dot(g, cx - 70 + k * 35, cy + (k % 2 ? 22 : -18), 10, '#2e0f58', { alpha: a * clamp(s - 1) * (pos ? 1 : clamp(1 - (s - 2) * 2.5)), ow: 2 });
    // particule de colorant care intră (etapa 1 și 4)
    if (s > 0 && s < 1) for (let k = 0; k < 6; k++) { const an = k / 6 * Math.PI * 2; const r = lerp(240, 90, s); dot(g, cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.62, 7, COL.cv, { alpha: a, ow: 2 }); }
    if (s > 3 && s < 4) for (let k = 0; k < 6; k++) { const an = k / 6 * Math.PI * 2 + 0.5; const r = lerp(240, pos ? 200 : 90, s - 3); dot(g, cx + Math.cos(an) * r, cy + Math.sin(an) * r * 0.62, 7, COL.red, { alpha: a, ow: 2 }); }
    g.restore();
  }
  return {
    home: HOME,
    anchors: [[60, 90], [560, 90], [86, 455], [120, 610], [620, 610]],
    labelText: ['LPS', 'BAAR'],
    draw(g, t, b) {
      bg(g); const tt = TT(t);
      let s = 4, sPos = null, sNeg = null, lab = '';
      if (b.i < 0) s = (tt % 10) / 2.2;
      else if (b.i === 0 || b.i === 1) s = fb(b, 0.85) * 4;
      if (b.i === 2) { // durata alcoolului
        const v = Math.floor(tt / 2.6) % 3;
        lab = ['alcool prea scurt → fals Gram +', 'alcool corect', 'alcool prea lung → fals Gram −'][v];
        sPos = v === 2 ? 'neg' : 'pos'; sNeg = v === 0 ? 'pos' : 'neg';
      }
      s = Math.min(4, s);
      const focusP = b.i !== 1, focusN = b.i !== 0;
      T(g, 'Gram + → violet', 250, 45, 22, '#c9a3ff'); T(g, 'Gram − → roșu', 750, 45, 22, '#ff9ab0');
      cell(g, 250, 240, sPos ? sPos === 'pos' : true, s, t, focusP);
      cell(g, 750, 240, sNeg ? sNeg === 'pos' : false, s, t, focusN);
      T(g, 'peptidoglican GROS', 250, 400, 17, '#e3c27a', { alpha: focusP ? 1 : 0.55 });
      T(g, 'membrană externă (LPS)\n+ peptidoglican subțire', 750, 405, 16, '#ffb0c2', { alpha: focusN ? 1 : 0.55 });
      // bara pașilor
      SEQ.forEach(([n, c, d], k) => {
        const x = 140 + k * 240; const act = b.i !== 2 && Math.floor(s) === k && s < 4;
        pill(g, x, 470, 210, 60, c, '', { glow: act || (b.i === 2 && k === 2) ? 1 : 0 });
        T(g, n, x, 460, 19, '#ffffff', { stroke: false }); T(g, d, x, 484, 15, '#ffffff', { stroke: false, w: 600 });
        if (k < 3) arr(g, x + 108, 470, x + 132, 470, '#fff3e6', 4, 0.8);
      });
      T(g, b.i === 2 ? lab : 'pe tablă: safranină în loc de fuxină (tot roșu)', 500, 530, 17, b.i === 2 ? M.hi : M.dim);
      // Ziehl-Neelsen
      const zs = b.i < 0 ? (tt % 6) / 2 : b.i === 3 ? fb(b, 0.8) * 3 : 3;
      const bgZ = zs < 1 ? mix('#f3e6d0', '#e88aa0', zs) : zs < 2 ? mix('#e88aa0', '#f3eee6', zs - 1) : mix('#f3eee6', COL.blueBg, zs - 2);
      field(g, 250, 740, 150, bgZ, () => { ZN.forEach(([x, y, r]) => { const pts = [[250 + x - Math.cos(r) * 18, 740 + y - Math.sin(r) * 18], [250 + x, 740 + y + 3], [250 + x + Math.cos(r) * 18, 740 + y + Math.sin(r) * 18]]; tube(g, pts, 7, COL.red, { ow: 3 }); }); });
      T(g, ['fucsină fenicată', 'alcool acid', 'albastru de metilen', 'BAAR: roșii pe albastru'][Math.min(3, Math.floor(zs))], 250, 910, 17, zs >= 3 ? M.hi : M.cream);
      T(g, 'Ziehl-Neelsen', 250, 575, 19, '#9ef0dd');
      // Neisser: litere chinezești
      const nu = b.i < 0 ? 0.5 + 0.5 * Math.sin(tt * 0.9) : b.i === 4 ? ease(fb(b, 0.6)) : 1;
      field(g, 750, 740, 150, '#f6f0e2', () => {
        NE.forEach(([x, y, r0, r1], k) => {
          const r = lerp(r0 + k, r1 + (k % 2 ? 0.9 : 0), nu); const cx = 750 + x + Math.cos(r) * 22, cy = 740 + y + Math.sin(r) * 22;
          bacillus(g, cx, cy, 46, 12, r, '#d9b23a');
          dot(g, cx + Math.cos(r) * 18, cy + Math.sin(r) * 18, 5, '#1f1f5a', { ow: 1.5 }); dot(g, cx - Math.cos(r) * 18, cy - Math.sin(r) * 18, 5, '#1f1f5a', { ow: 1.5 });
        });
      });
      T(g, 'Neisser', 750, 575, 19, '#9ef0dd'); T(g, 'galbeni, granulații la capete · V, L', 750, 910, 16, M.cream, { w: 600 });
    },
  };
}

/* =================================================================== 11 · LP 2 · MICROSCOPUL
 Ce se vede: stânga, microscopul cu cele 3 sisteme colorate (optic = cyan: ocular, revolver, obiective; mecanic = portocaliu:
 macro/microviză, platină; iluminare = galben: sursa, diafragma, condensorul). Lumina pleacă de JOS (sursa), trece prin
 condensor, preparat, obiectiv, în sus spre ocular. Dreapta sus, razele de la preparat în sus: la ×10/×40 (aer), la
 ieșirea din sticlă în aer razele oblice se frâng spre exterior și ratează lentila; la ×100 cu ulei de cedru (același
 indice ca sticla) razele merg drept și intră în lentilă. Dreapta jos: condensorul coborât → con îngust, puțină lumină
 (preparate native); ridicat → mult lumină (preparate colorate). */
export function a_scope() {
  return {
    home: HOME,
    anchors: [[60, 80], [520, 70], [770, 70], [520, 520]],
    labelText: [],
    draw(g, t, b) {
      bg(g); const tt = TT(t);
      const sys = b.i === 0 ? Math.floor(b.bt / 2) % 3 : b.i < 0 ? Math.floor(tt / 2.4) % 3 : -1;
      const cOpt = sys === 0 ? '#7fe8ff' : '#9aa4ab', cMec = sys === 1 ? '#ffb36b' : '#9aa4ab', cIl = sys === 2 ? '#ffe36e' : '#9aa4ab';
      // microscopul
      g.save(); g.strokeStyle = OUT; g.lineWidth = 6;
      g.fillStyle = '#6b7780'; g.beginPath(); g.roundRect(80, 700, 300, 50, 14); g.fill(); g.stroke(); // baza
      g.fillStyle = cIl; g.beginPath(); g.arc(200, 690, 22, 0, 7); g.fill(); g.stroke(); // sursa
      g.fillStyle = '#6b7780'; g.beginPath(); g.moveTo(330, 700); g.bezierCurveTo(420, 600, 410, 300, 300, 180); g.lineTo(270, 205); g.bezierCurveTo(360, 320, 360, 560, 290, 700); g.closePath(); g.fill(); g.stroke(); // brațul
      g.fillStyle = cMec; g.fillRect(90, 520, 260, 22); g.strokeRect(90, 520, 260, 22); // platina
      g.fillStyle = cIl; g.fillRect(170, 560, 60, 30); g.strokeRect(170, 560, 60, 30); // condensor
      g.fillStyle = cIl; g.fillRect(160, 600, 80, 10); g.strokeRect(160, 600, 80, 10); // diafragma
      g.fillStyle = cOpt; g.beginPath(); g.moveTo(170, 120); g.lineTo(230, 120); g.lineTo(240, 330); g.lineTo(160, 330); g.closePath(); g.fill(); g.stroke(); // tubul
      g.fillRect(180, 70, 40, 50); g.strokeRect(180, 70, 40, 50); // ocular
      g.beginPath(); g.ellipse(200, 345, 70, 22, 0, 0, 7); g.fill(); g.stroke(); // revolver
      [[170, 0.25], [200, 0], [230, -0.25]].forEach(([x, r]) => { g.save(); g.translate(x, 360); g.rotate(r); g.fillRect(-12, 0, 24, 90 - Math.abs(r) * 120); g.strokeRect(-12, 0, 24, 90 - Math.abs(r) * 120); g.restore(); });
      g.fillStyle = cMec; g.beginPath(); g.arc(360, 480, 26, 0, 7); g.fill(); g.stroke(); g.beginPath(); g.arc(360, 480, 13, 0, 7); g.stroke();
      g.restore();
      // lumina urcă de la sursă
      for (let k = 0; k < 4; k++) { const u = loopT(t + k * 0.35, 1.4); dot(g, 200, lerp(670, 90, u), 6, '#ffe36e', { ow: 2, alpha: 0.9 * Math.sin(u * Math.PI) }); }
      T(g, 'ocular ×10', 300, 85, 16, M.cream, { align: 'left' }); T(g, 'obiective', 60, 400, 16, M.cream, { align: 'left' });
      T(g, 'platină', 70, 505, 15, M.cream, { align: 'left' }); T(g, 'condensor', 60, 575, 15, M.cream, { align: 'left' }); T(g, 'macro/micro-\nviză', 400, 470, 15, M.cream, { align: 'left' });
      const sb = (x, s, sub, c, k) => { pill(g, x, 820, 145, 96, sys === k ? c : '#3a3046', '', { r: 14, glow: sys === k ? 1 : 0 }); T(g, s, x, 798, 16, sys === k ? OUT : M.cream, { stroke: false }); T(g, sub, x, 840, 13, sys === k ? OUT : M.dim, { stroke: false, w: 600 }); };
      sb(85, 'OPTIC', 'ocular · revolver\n· obiective', '#7fe8ff', 0); sb(235, 'MECANIC', 'macro/microviză\n· platină', '#ffb36b', 1); sb(385, 'ILUMINARE', 'sursă · diafragmă\n· condensor', '#ffe36e', 2);
      // ---- razele: aer vs ulei
      const rays = (cx, oil, act) => {
        const a = act ? 1 : 0.45; const ySpec = 340, yTop = 300, yLens = 170, lw = 46;
        g.save(); g.globalAlpha = a;
        g.fillStyle = 'rgba(220,245,255,.45)'; g.strokeStyle = OUT; g.lineWidth = 4; g.fillRect(cx - 110, yTop, 220, 50); g.strokeRect(cx - 110, yTop, 220, 50);
        if (oil) { g.fillStyle = 'rgba(255,214,90,.55)'; g.beginPath(); g.moveTo(cx - 60, yTop); g.lineTo(cx - 40, yLens); g.lineTo(cx + 40, yLens); g.lineTo(cx + 60, yTop); g.closePath(); g.fill(); }
        g.fillStyle = '#c9ced2'; g.beginPath(); g.moveTo(cx - 50, 70); g.lineTo(cx + 50, 70); g.lineTo(cx + lw / 2 + 2, yLens); g.lineTo(cx - lw / 2 - 2, yLens); g.closePath(); g.fill(); g.stroke();
        g.restore();
        const n = 1.5; let hit = 0;
        [-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6].forEach((th, k) => {
          const x1 = cx + Math.tan(th) * (ySpec - yTop);
          let pts = [[cx, ySpec], [x1, yTop]]; let inLens = true;
          if (oil) { const x2 = x1 + Math.tan(th) * (yTop - yLens); pts.push([x2, yLens]); inLens = Math.abs(x2 - cx) < lw / 2; }
          else { const sn = n * Math.sin(th); if (Math.abs(sn) >= 1) { pts.push([x1 + Math.sign(th) * 60, yTop - 4]); inLens = false; } else { const th2 = Math.asin(sn); const x2 = x1 + Math.tan(th2) * (yTop - yLens); pts.push([x2, yLens]); inLens = Math.abs(x2 - cx) < lw / 2; } }
          if (inLens) hit++;
          tube(g, pts, 3, inLens ? '#ffe36e' : '#ff8a8a', { ow: 2, raw: true, alpha: a * 0.9 });
          const u = loopT(t + k * 0.13, 1.2); const P0 = u < 0.4 ? pts[0] : pts[1], P1 = u < 0.4 ? pts[1] : pts[2]; const uu = u < 0.4 ? u / 0.4 : (u - 0.4) / 0.6;
          dot(g, lerp(P0[0], P1[0], uu), lerp(P0[1], P1[1], uu), 5, inLens ? '#ffffff' : '#ff8a8a', { ow: 1.5, alpha: a });
        });
        dot(g, cx, ySpec, 7, COL.cv, { alpha: a });
        return hit;
      };
      panel(g, 470, 30, 510, 420);
      const h1 = rays(600, false, b.i === 1 || b.i < 0); const h2 = rays(850, true, b.i === 2 || b.i < 0);
      T(g, '×10, ×40: aer', 600, 395, 18, '#ff8a8a', { alpha: b.i === 1 || b.i < 0 ? 1 : 0.5 }); T(g, '×100: ulei de cedru', 850, 395, 18, M.hi, { alpha: b.i === 2 || b.i < 0 ? 1 : 0.5 });
      T(g, `${h1} / 7 raze intră`, 600, 425, 15, M.cream, { alpha: b.i === 1 || b.i < 0 ? 1 : 0.5, w: 600 }); T(g, `${h2} / 7 raze intră`, 850, 425, 15, M.cream, { alpha: b.i === 2 || b.i < 0 ? 1 : 0.5, w: 600 });
      // ---- condensorul
      panel(g, 470, 470, 510, 440, { fill: on(b, 3) ? 'rgba(14,156,134,.16)' : 'rgba(255,240,228,.05)' });
      const up = b.i === 3 ? 0.5 - 0.5 * Math.cos(clamp(b.bt / (b.bd * 0.9)) * Math.PI * 2) : b.i < 0 ? 0.5 - 0.5 * Math.cos(tt * 0.8) : 0.5;
      const cy = lerp(780, 650, up);
      g.save(); g.strokeStyle = OUT; g.lineWidth = 5; g.fillStyle = '#9aa4ab'; g.fillRect(560, 580, 330, 18); g.strokeRect(560, 580, 330, 18);
      g.globalAlpha = 0.25 + 0.6 * up; g.fillStyle = '#ffe36e'; g.beginPath(); g.moveTo(725 - 40, cy); g.lineTo(725 - 8 - 70 * up, 580); g.lineTo(725 + 8 + 70 * up, 580); g.lineTo(725 + 40, cy); g.closePath(); g.fill(); g.restore();
      ell(g, 725, cy, 60, 14, '#ffe36e', { ow: 5 }); dot(g, 725, 870, 16, '#ffe36e');
      g.save(); g.globalAlpha = 0.25 + 0.6 * up; g.fillStyle = '#fff7c0'; g.beginPath(); g.ellipse(725, 568, 30 + 60 * up, 10, 0, 0, 7); g.fill(); g.restore();
      T(g, up < 0.5 ? 'coborât: lumină puțină,\ncontrast mare → native' : 'ridicat: lumină multă\n→ colorate', 725, 515, 17, up < 0.5 ? '#9fe8ff' : M.hi);
      T(g, 'condensorul', 600, 830, 17, M.cream);
    },
  };
}

/* =================================================================== 12 · LP 2 · FORMĂ ȘI DISPOZIȚIE
 Ce se vede: sus, cocii care se divid: Staphylococcus: fiecare diviziune în alt plan → grămadă; Streptococcus: toate
 diviziunile în același plan → lanț; Neisseria: perechi reniforme (fețele plate față în față); pneumococul: perechi
 lanceolate (capetele late alăturate, vârfurile spre exterior). Jos: bacili scurți drepți (roz, Gram −), bacili sporulați
 (violet, sporul = zonă clară), Corynebacterium în palisade, V, L (violet), Haemophilus mic, pleomorf (roz), spirochete
 ondulate care se mișcă. Culorile = Gram. La punctul 5 toate celulele iau aceeași culoare a colorantului simplu (albastru
 de metilen → safranină → metil violet): forma se vede, peretele nu. */
export function a_shape() {
  // diviziuni: [părintele la generația anterioară]; poziții finale relative
  const STA = [[[0, 0]], [[-12, 0], [12, 0]], [[-12, -12], [12, -12], [-12, 12], [12, 12]], [[-12, -12], [12, -12], [-12, 12], [12, 12], [-30, -2], [30, 4], [2, -32], [-4, 30]]];
  const STP = [0, 1, 2, 3].map((gN) => Array.from({ length: 2 ** gN }, (_, i) => [(i - (2 ** gN - 1) / 2) * 24, 0]));
  return {
    home: HOME,
    anchors: [[48, 70], [48, 490], [690, 490], [880, 490], [500, 885]],
    draw(g, t, b) {
      bg(g); const tt = TT(t);
      const DYES = [['albastru de metilen', COL.mb], ['safranină', COL.saf], ['metil violet', COL.mv]];
      const simple = b.i === 4 || (b.i < 0 && Math.floor(tt / 6) % 2 === 1);
      const dy = Math.floor(tt / 2) % 3;
      const cc = (c) => (simple ? DYES[dy][1] : c);
      const al = (k) => (b.i < 0 || b.i === k || b.i === 4 ? 1 : 0.5);
      // ---- coci: diviziune
      const gp = b.i === 0 ? fb(b, 0.8) * 3 : (b.i < 0 ? loopT(t, 6) * 3.6 : 3);
      const gen = Math.min(3, Math.floor(gp)), fr = gp >= 3 ? 1 : ease(gp - gen);
      const divDraw = (L, cx, cy, s) => {
        const cur = L[gen + (gp >= 3 ? 0 : 1)] || L[3]; const prev = L[gen];
        cur.forEach((p, i) => { const par = gp >= 3 ? p : prev[Math.min(prev.length - 1, i < prev.length ? i : (i % prev.length))]; const x = lerp(par[0], p[0], gp >= 3 ? 1 : fr), y = lerp(par[1], p[1], gp >= 3 ? 1 : fr); coccus(g, cx + x * s, cy + y * s, 12 * s, cc(COL.cv), al(0)); });
      };
      const tl = (x, s1, s2, k) => { panel(g, x, 30, 230, 400, { fill: 'rgba(255,240,228,.05)' }); T(g, s1, x + 115, 360, 17, M.cream, { alpha: al(k) }); T(g, s2, x + 115, 392, 16, '#c9b3ff', { alpha: al(k), w: 600 }); };
      tl(20, 'grămezi', 'Staphylococcus', 0); tl(262, 'lanțuri', 'Streptococcus', 0); tl(504, 'diplococi reniformi', 'Neisseria', 0); tl(746, 'diplococ lanceolat', 'pneumococ', 2);
      divDraw(STA, 135, 190, 1.6);
      divDraw(STP, 377, 190, 0.95);
      T(g, gen < 3 || gp < 3 ? `diviziunea ${Math.min(3, gen + 1)}` : '', 135, 300, 15, M.dim, { w: 600 });
      T(g, 'planuri la\nîntâmplare', 135, 80, 15, M.hi, { alpha: al(0) }); T(g, 'același plan', 377, 80, 15, M.hi, { alpha: al(0) });
      [[580, 150, 0.3], [660, 210, -0.4], [600, 270, 1.2]].forEach(([x, y, r]) => diplo(g, x, y, 1.1, r, cc(COL.pink), al(0), 'ren'));
      [[820, 150, 0.2], [900, 230, -0.6], [830, 290, 0.9]].forEach(([x, y, r]) => diplo(g, x, y, 1, r, cc(COL.cv), al(2), 'lan'));
      // ---- bacili etc.
      const BT = [['bacili scurți', 'E. coli, Salmonella,\nKlebsiella', 1], ['sporulați', 'Clostridium,\nBacillus', 1], ['palisade, V, L', 'Corynebacterium', 1], ['cocobacili mici,\npleomorfi', 'Haemophilus', 2], ['spirochete', 'Treponema,\nLeptospira', 3]];
      BT.forEach(([s1, s2, k], i) => { const x = 20 + i * 194; panel(g, x, 450, 184, 400, { fill: 'rgba(255,240,228,.05)' }); T(g, s1, x + 92, 760, 16, M.cream, { alpha: al(k) }); T(g, s2, x + 92, 812, 15, '#c9b3ff', { alpha: al(k), w: 600 }); });
      [[90, 540, 0.3], [130, 610, -0.5], [70, 670, 1.1], [140, 690, 0.1]].forEach(([x, y, r]) => bacillus(g, x, y, 46, 18, r, cc(COL.pink), al(1)));
      [[300, 540, 0.2, 0], [270, 620, -0.4, 1], [320, 690, 1.2, 0]].forEach(([x, y, r, term]) => { bacillus(g, x, y, 62, 18, r, cc(COL.cv), al(1)); const off = term ? 20 : 0; ell(g, x + Math.cos(r) * off, y + Math.sin(r) * off, 10, 7, '#f6f0e6', { ow: 2, rot: r, alpha: al(1) }); });
      [[440, 540, 0.9], [470, 540, 2.2], [500, 640, 1.57], [520, 640, 1.57], [540, 640, 1.57], [430, 690, 0], [430, 690, 1.57]].forEach(([x, y, r]) => bacillus(g, x + Math.cos(r) * 18, y + Math.sin(r) * 18, 42, 13, r, cc(COL.cv), al(1)));
      [[640, 540], [680, 580], [620, 630], [700, 660], [650, 700]].forEach(([x, y], k) => bacillus(g, x, y, 14 + (k % 3) * 9, 11, k * 0.8, cc(COL.pink), al(2)));
      for (let k = 0; k < 3; k++) { const pts = []; for (let j = 0; j <= 30; j++) pts.push([815 + j * 4.2, 560 + k * 65 + Math.sin(j * 0.9 + tt * 4 + k) * 9]); tube(g, pts, 5, cc('#e25472'), { ow: 3, raw: true, alpha: al(3) }); }
      T(g, 'nativ: fond întunecat\nsau Burri', 912, 715, 14, M.dim, { alpha: al(3), w: 600 });
      // ---- colorația simplă
      pill(g, 500, 885, 940, 50, simple ? '#fff3e6' : '#3a3046', '', { glow: b.i === 4 ? 1 : 0 });
      T(g, simple ? `colorația simplă: ${DYES[dy][0]} → aceeași culoare la toți` : 'culorile de aici = Gram (violet +, roz −)', 500, 885, 17, simple ? OUT : M.cream, { stroke: false });
    },
  };
}

/* =================================================================== 13 · LP 2 · COPROPARAZITOLOGIC
 Ce se vede: sus, scaunul proaspăt → macroscopic / microscopic / cultivare 37 °C / ADN: PCR. Șase metode:
 1 nativ în ser: trofozoitul își scoate pseudopode și se deplasează; picătura de Lugol colorează chistul galben-brun și oul
 brun-roșcat; 2 MGG: trofozoit cu nucleu roșu, citoplasmă violet-albastră, citit cu ulei (imersie); 3 Kato-Miura:
 celofanul cu glicerină + verde de malachit clarifică scaunul în 30 min și ouăle apar; 4 concentrare: în soluția hipertonă
 ouăle URCĂ la suprafață (flotație), în soluția hipotonă + centrifugare ouăle COBOARĂ la fund; 5 larvele ies din scaun;
 6 noaptea femela de oxiur iese și depune ouăle pe pielea perianală; banda adezivă ia ouăle (turtite pe o parte). */
export function a_copro() {
  const TX = [20, 345, 670], TY = [230, 575]; const TW = 310, TH = 330;
  return {
    home: HOME,
    anchors: [[40, 250], [365, 250], [690, 250], [40, 595], [365, 595], [690, 595]],
    labelText: ['PCR', 'ADN', 'MGG'],
    draw(g, t, b) {
      bg(g); const tt = TT(t); const p = P(b, t, 6, 0.75);
      pill(g, 500, 50, 230, 50, '#e8d2b0', 'scaun proaspăt', { size: 19 });
      [[130, 'ADN: PCR'], [375, 'macroscopic'], [625, 'MICROSCOPIC'], [870, 'cultivare, 37 °C']].forEach(([x, s], k) => { arr(g, 500, 78, x, 125, '#fff3e6', 4, 0.7); pill(g, x, 160, 210, 50, k === 2 ? '#0e9c86' : '#e6f4ef', s, { size: 17, col: k === 2 ? '#ffffff' : OUT }); });
      const tile = (k, s) => { const x = TX[k % 3], y = TY[Math.floor(k / 3)]; panel(g, x, y, TW, TH, { fill: on(b, k) ? 'rgba(14,156,134,.16)' : 'rgba(255,240,228,.05)', stroke: on(b, k) ? 'rgba(127,227,207,.7)' : 'rgba(255,230,210,.16)' }); T(g, s, x + TW / 2, y + TH - 26, 17, '#9ef0dd'); return [x, y]; };
      const al = (k) => (b.i < 0 || b.i === k ? 1 : 0.55);
      // 1 · nativ ser + Lugol
      let [x, y] = tile(0, 'nativ: ser + Lugol');
      const u0 = p(0);
      const ax = x + 90 + Math.sin(tt * 0.8) * 20, ay = y + 110;
      const ps = []; for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; const r = 34 + (k === 2 ? 22 * (0.5 + 0.5 * Math.sin(tt * 2)) : 0) + 4 * Math.sin(a * 3 + tt); ps.push([ax + Math.cos(a) * r, ay + Math.sin(a) * r * 0.8]); }
      g.save(); g.globalAlpha = al(0); const pp = new Path2D(); ps.forEach(([a, c], k) => (k ? pp.lineTo(a, c) : pp.moveTo(a, c))); pp.closePath(); g.fillStyle = '#d8e6d0'; g.fill(pp); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(pp); g.restore();
      dot(g, ax, ay, 9, '#9fb59a', { alpha: al(0), ow: 2 });
      T(g, 'în ser: trofozoiți\nvii, mobili', x + 90, y + 190, 15, M.cream, { alpha: al(0), w: 600 });
      dot(g, x + 230, y + 70, 30, mix('#f2f2ea', '#c99a3a', u0), { alpha: al(0), ow: 4 }); [[-10, -6], [8, 4], [-2, 12]].forEach(([a, c]) => dot(g, x + 230 + a, y + 70 + c, 4, '#5a3a10', { alpha: al(0) * u0, ow: 0 }));
      egg(g, x + 230, y + 150, 1, mix('#f2f2ea', '#a8452a', u0), al(0));
      T(g, 'Lugol: chist galben-brun,\nou brun-roșcat', x + 210, y + 230, 14, M.cream, { alpha: al(0) * (0.4 + 0.6 * u0), w: 600 });
      // 2 · MGG
      [x, y] = tile(1, 'frotiu MGG · imersie');
      ell(g, x + 150, y + 120, 80, 58, '#6b6fd6', { ow: 5, alpha: al(1) }); dot(g, x + 130, y + 112, 22, '#d0223a', { alpha: al(1) });
      T(g, 'nucleu roșu ·\ncitoplasmă violet-albastră', x + 155, y + 220, 15, M.cream, { alpha: al(1), w: 600 });
      dot(g, x + 260, y + 50, 12, '#ffd65a', { alpha: al(1) }); T(g, 'ulei', x + 260, y + 80, 14, M.hi, { alpha: al(1) });
      // 3 · Kato-Miura
      [x, y] = tile(2, 'strat gros Kato-Miura');
      const u2 = b.i < 0 ? loopT(t, 4) : p(2);
      g.save(); g.globalAlpha = al(2); g.fillStyle = '#8a5a2b'; g.beginPath(); g.roundRect(x + 40, y + 60, 230, 150, 12); g.fill(); g.restore();
      egg(g, x + 110, y + 120, 1, '#c9862a', al(2) * u2); egg(g, x + 200, y + 160, 1, '#c9862a', al(2) * u2, 0.6);
      g.save(); g.globalAlpha = al(2) * (1 - u2 * 0.8); g.fillStyle = '#5a3a1a'; g.beginPath(); g.roundRect(x + 40, y + 60, 230, 150, 12); g.fill(); g.restore();
      g.save(); g.globalAlpha = al(2) * 0.4; g.fillStyle = '#5fd18a'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(x + 30, y + 50, 250, 170, 12); g.fill(); g.stroke(); g.restore();
      clock(g, x + 270, y + 50, 22, u2, al(2)); T(g, '30 min · glicerina clarifică', x + 155, y + 250, 14, M.cream, { alpha: al(2), w: 600 });
      // 4 · concentrare
      [x, y] = tile(3, 'concentrare');
      const u3 = b.i < 0 ? loopT(t, 4) : p(3);
      testTube(g, x + 90, y + 50, 56, 170, '#cfe7f2', { level: 0.85, alpha: al(3) }); testTube(g, x + 220, y + 50, 56, 170, '#eef6ff', { level: 0.85, alpha: al(3) });
      for (let k = 0; k < 3; k++) { egg(g, x + 80 + k * 10, lerp(y + 190, y + 90 + k * 6, ease(u3)), 0.45, '#a8452a', al(3)); egg(g, x + 210 + k * 10, lerp(y + 110, y + 196 - k * 6, ease(u3)), 0.45, '#a8452a', al(3)); }
      T(g, 'hipertonă:\nouăle plutesc', x + 90, y + 260, 14, M.hi, { alpha: al(3) }); T(g, 'hipotonă +\ncentrifugare: jos', x + 225, y + 260, 14, M.cream, { alpha: al(3), w: 600 });
      // 5 · larvoscopice
      [x, y] = tile(4, 'larvoscopice');
      ell(g, x + 155, y + 180, 110, 50, '#8a5a2b', { ow: 5, alpha: al(4) });
      for (let k = 0; k < 3; k++) { const u = (REDUCED ? 0.5 : (t * 0.25 + k * 0.33) % 1); const pts = []; for (let j = 0; j <= 14; j++) pts.push([x + 90 + k * 60 + j * 3 + Math.sin(j * 0.8 + tt * 6) * 4, lerp(y + 180, y + 60, u) + j * 3]); tube(g, pts, 5, '#f6e8d0', { ow: 3, raw: true, alpha: al(4) }); }
      T(g, 'larve (viermii transmiși prin sol)', x + 155, y + 260, 14, M.cream, { alpha: al(4), w: 600 });
      // 6 · amprenta anală
      [x, y] = tile(5, 'amprentă anală');
      const cx6 = x + 120, cy6 = y + 140;
      g.save(); g.globalAlpha = al(5); g.fillStyle = '#f3c29b'; g.beginPath(); g.arc(cx6, cy6, 90, 0, 7); g.fill(); g.strokeStyle = '#b77a58'; g.lineWidth = 3; for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; g.beginPath(); g.moveTo(cx6 + Math.cos(a) * 18, cy6 + Math.sin(a) * 18); g.lineTo(cx6 + Math.cos(a) * 70, cy6 + Math.sin(a) * 70); g.stroke(); } g.fillStyle = '#7a3a3a'; g.beginPath(); g.arc(cx6, cy6, 14, 0, 7); g.fill(); g.restore();
      const u5 = b.i < 0 ? loopT(t, 6) : p(5);
      const nightU = clamp(u5 * 2.5); // noaptea: femela iese și depune ouăle
      const wx = cx6 + nightU * 50, wy = cy6 - nightU * 30;
      if (u5 < 0.5) { const pts = []; for (let j = 0; j <= 10; j++) pts.push([lerp(cx6, wx, j / 10) + Math.sin(j + tt * 5) * 3, lerp(cy6, wy, j / 10)]); tube(g, pts, 6, '#f6f0e6', { ow: 3, raw: true, alpha: al(5) }); T(g, '☾ noaptea', x + 255, y + 40, 15, '#c9d6ff', { alpha: al(5) }); }
      const eggsA = clamp(u5 * 3 - 0.6);
      const tape = clamp(u5 * 2.2 - 1.1); // banda vine, apasă și pleacă cu ouăle
      const EG = [[30, -30], [50, -10], [20, -50], [60, -40]];
      if (tape < 0.5) EG.forEach(([a, c]) => egg(g, cx6 + a, cy6 + c, 0.35, '#e8e0c0', al(5) * eggsA, 0.3, true));
      const ty = tape < 0.5 ? lerp(y + 20, cy6 - 30, ease(tape * 2)) : lerp(cy6 - 30, y + 30, ease((tape - 0.5) * 2));
      if (tape > 0) { g.save(); g.globalAlpha = al(5) * 0.85; g.fillStyle = 'rgba(230,240,255,.75)'; g.strokeStyle = OUT; g.lineWidth = 4; g.fillRect(cx6 - 20, ty - 40, 150, 50); g.strokeRect(cx6 - 20, ty - 40, 150, 50); g.restore(); if (tape >= 0.5) EG.forEach(([a], k) => egg(g, cx6 + a + 10, ty - 15 + (k % 2) * 8, 0.35, '#e8e0c0', al(5), 0.3, true)); }
      T(g, '> 50% (scaunul: 10–15%)', x + 155, y + 262, 14, M.hi, { alpha: al(5) });
    },
  };
}

/* =================================================================== 14 · LP 2 · VIRUSURILE LA MICROSCOP
 Ce se vede: 1 virionul se asamblează: genomul (UN SINGUR acid nucleic, ARN sau ADN) → capsomerele vin și formează capsida
 → învelișul apare doar la unele (pâlpâie: cu / fără); 2 simetriile: cubică (icosaedru, hexagon în proiecție), helicoidală
 (subunitățile se rotesc în spirală în jurul acidului nucleic), binară (bacteriofag: cap icosaedric + coadă helicoidală);
 3 rigla de mărime: virusurile 20–900 nm, limita MO ≈ 200 nm (linie roșie); ce e sub limită se vede doar la ME;
 4 neuronul (citoplasmă albastră, nucleu violet): particulele virale se adună în citoplasmă în incluzii care cresc până se
 văd: Babeș-Negri, roșu strălucitor (colorația Mann). */
export function a_virus() {
  return {
    home: HOME,
    anchors: [[60, 70], [530, 70], [60, 470], [60, 650]],
    labelText: ['ARN', 'ADN', 'MO', 'ME'],
    draw(g, t, b) {
      bg(g); const tt = TT(t);
      const al = (k) => (b.i < 0 || b.i === k ? 1 : 0.5);
      // ---- 1 · virionul
      panel(g, 20, 30, 470, 400);
      const u = b.i === 0 ? fb(b, 0.7) : b.i < 0 ? loopT(t, 6) * 1.3 : 1;
      const cx = 230, cy = 220;
      const gen = clamp(u * 3), cap = clamp(u * 3 - 1), env = clamp(u * 3 - 2);
      const envOn = env > 0 && (Math.floor(tt / 2) % 2 === 0 || b.i !== 0 && b.i >= 0);
      if (envOn) { g.save(); g.globalAlpha = al(0) * env; g.strokeStyle = '#ffb36b'; g.lineWidth = 10; g.setLineDash([16, 8]); g.beginPath(); g.arc(cx, cy, 130, 0, 7); g.stroke(); g.setLineDash([]); g.strokeStyle = OUT; g.lineWidth = 4; for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; g.beginPath(); g.moveTo(cx + Math.cos(a) * 136, cy + Math.sin(a) * 136); g.lineTo(cx + Math.cos(a) * 156, cy + Math.sin(a) * 156); g.stroke(); dot(g, cx + Math.cos(a) * 158, cy + Math.sin(a) * 158, 5, '#ffb36b', { ow: 2 }); } g.restore(); }
      const hexP = (r) => Array.from({ length: 6 }, (_, k) => [cx + Math.cos(k / 6 * Math.PI * 2 + Math.PI / 6) * r, cy + Math.sin(k / 6 * Math.PI * 2 + Math.PI / 6) * r]);
      const HX = hexP(95);
      for (let k = 0; k < 18; k++) { const e = Math.floor(k / 3), f = (k % 3 + 0.5) / 3; const A = HX[e], B = HX[(e + 1) % 6]; const tx = lerp(A[0], B[0], f), ty = lerp(A[1], B[1], f); const a = clamp(cap * 1.4 - k * 0.02); const sx = lerp(tx + (tx - cx) * 1.6, tx, ease(a)), sy = lerp(ty + (ty - cy) * 1.6, ty, ease(a)); dot(g, sx, sy, 12, '#7fe8ff', { alpha: al(0) * clamp(a * 3) }); }
      const gp = []; for (let k = 0; k <= 40; k++) gp.push([cx - 60 + k * 3, cy + Math.sin(k * 0.5 + tt * 2) * 22]); tube(g, gp, 5, '#ff6b9a', { ow: 3, raw: true, u1: gen, alpha: al(0) });
      T(g, 'genom (ARN sau ADN)', cx, 380, 16, '#ff9ab8', { alpha: al(0) * gen }); T(g, 'capsidă', 420, 100, 16, '#7fe8ff', { alpha: al(0) * cap }); T(g, envOn ? 'înveliș (la unele)' : 'fără înveliș', 400, 400, 16, '#ffb36b', { alpha: al(0) * env });
      // ---- 2 · simetria
      panel(g, 510, 30, 470, 400);
      const sx0 = 590, sx1 = 745, sx2 = 900, sy = 190;
      g.save(); g.globalAlpha = al(1); const H6 = Array.from({ length: 6 }, (_, k) => [sx0 + Math.cos(k / 6 * Math.PI * 2 + tt * 0.3) * 50, sy + Math.sin(k / 6 * Math.PI * 2 + tt * 0.3) * 50]); const hp = new Path2D(); H6.forEach(([a, c], k) => (k ? hp.lineTo(a, c) : hp.moveTo(a, c))); hp.closePath(); g.fillStyle = '#9fe8ff'; g.fill(hp); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(hp); g.lineWidth = 2; H6.forEach(([a, c]) => { g.beginPath(); g.moveTo(sx0, sy); g.lineTo(a, c); g.stroke(); }); g.restore();
      for (let k = 0; k < 14; k++) { const yy = sy - 70 + k * 10; const a = k * 0.9 + tt * 2; const front = Math.sin(a) > 0; dot(g, sx1 + Math.cos(a) * 26, yy, 9, front ? '#9fe8ff' : '#5a9ab0', { alpha: al(1), ow: 2 }); }
      g.save(); g.globalAlpha = al(1); const PH = Array.from({ length: 6 }, (_, k) => [sx2 + Math.cos(k / 6 * Math.PI * 2 + Math.PI / 6) * 30, sy - 60 + Math.sin(k / 6 * Math.PI * 2 + Math.PI / 6) * 30]); const php = new Path2D(); PH.forEach(([a, c], k) => (k ? php.lineTo(a, c) : php.moveTo(a, c))); php.closePath(); g.fillStyle = '#9fe8ff'; g.fill(php); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(php); g.fillStyle = '#5a9ab0'; g.fillRect(sx2 - 9, sy - 30, 18, 80); g.strokeRect(sx2 - 9, sy - 30, 18, 80); g.lineWidth = 4; [-1, 1].forEach((s) => { g.beginPath(); g.moveTo(sx2, sy + 50); g.lineTo(sx2 + s * 30, sy + 75); g.lineTo(sx2 + s * 38, sy + 100); g.stroke(); }); g.restore();
      T(g, 'cubică', sx0, 290, 17, M.cream, { alpha: al(1) }); T(g, 'herpes, adeno,\npolio', sx0, 335, 15, '#c9b3ff', { alpha: al(1), w: 600 });
      T(g, 'helicoidală', sx1, 290, 17, M.cream, { alpha: al(1) }); T(g, 'gripal, rabic', sx1, 325, 15, '#c9b3ff', { alpha: al(1), w: 600 });
      T(g, 'binară', sx2, 290, 17, M.cream, { alpha: al(1) }); T(g, 'bacteriofag', sx2, 325, 15, '#c9b3ff', { alpha: al(1), w: 600 });
      T(g, 'simetria capsidei', 745, 60, 18, '#9ef0dd', { alpha: al(1) });
      // ---- 3 · rigla
      panel(g, 20, 450, 960, 165);
      const X = (nm) => 60 + nm / 1000 * 880;
      g.save(); g.globalAlpha = al(2); g.strokeStyle = M.cream; g.lineWidth = 4; g.beginPath(); g.moveTo(X(0), 560); g.lineTo(X(1000), 560); g.stroke(); [0, 200, 400, 600, 800, 1000].forEach((n) => { g.beginPath(); g.moveTo(X(n), 552); g.lineTo(X(n), 568); g.stroke(); T(g, `${n}`, X(n), 588, 14, M.dim, { w: 600 }); }); g.restore();
      const ru = b.i === 2 ? ease(fb(b, 0.6)) : 1;
      g.save(); g.globalAlpha = al(2); g.fillStyle = '#ff9a5a'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(X(20), 512, (X(900) - X(20)) * ru, 26, 10); g.fill(); g.stroke(); g.restore();
      T(g, 'virusuri 20–900 nm', X(460), 490, 16, '#ff9a5a', { alpha: al(2) });
      g.save(); g.globalAlpha = al(2); g.strokeStyle = '#ff4d4d'; g.lineWidth = 5; g.setLineDash([10, 7]); g.beginPath(); g.moveTo(X(200), 470); g.lineTo(X(200), 575); g.stroke(); g.restore();
      T(g, 'limita MO ≈ 200 nm', X(200) - 8, 600, 15, '#ff8a8a', { alpha: al(2), align: 'right' });
      T(g, 'virionul doar la ME: colorare negativă\n(acid fosfotungstic), 20.000–40.000×', 700, 600 - 6, 13, M.cream, { alpha: al(2), w: 600 });
      // ---- 4 · incluziile
      panel(g, 20, 635, 960, 275);
      const iu = b.i === 3 ? fb(b, 0.8) : b.i < 0 ? loopT(t, 6) : 1;
      g.save(); g.globalAlpha = al(3);
      const nb = new Path2D(); nb.moveTo(180, 700); nb.bezierCurveTo(300, 650, 420, 660, 470, 700); nb.lineTo(620, 690); nb.lineTo(470, 730); nb.bezierCurveTo(500, 800, 450, 880, 330, 880); nb.bezierCurveTo(220, 880, 140, 820, 160, 760); nb.lineTo(60, 800); nb.lineTo(150, 730); nb.closePath();
      g.fillStyle = '#4f7fd0'; g.fill(nb); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(nb); g.restore();
      ell(g, 320, 770, 48, 42, '#7a3fc0', { ow: 5, alpha: al(3) });
      // particulele se adună → incluzii
      const INC = [[230, 740], [410, 805]];
      INC.forEach(([ix, iy], k) => {
        for (let j = 0; j < 8; j++) { const a = j / 8 * Math.PI * 2 + k; const r = lerp(70, 6, clamp(iu * 1.5 - j * 0.05)); dot(g, ix + Math.cos(a) * r, iy + Math.sin(a) * r, 4, '#ff2a3a', { ow: 1, alpha: al(3) * (1 - clamp((iu - 0.75) * 4)) }); }
        const ir = 18 * clamp((iu - 0.55) * 2.2);
        if (ir > 0) { g.save(); g.globalAlpha = al(3); g.shadowColor = '#ff2a3a'; g.shadowBlur = 18; ell(g, ix, iy, ir, ir * 0.9, '#ff2a3a', { ow: 3 }); g.restore(); }
      });
      T(g, 'Babeș-Negri în neuronii din rabie', 790, 700, 17, M.hi, { alpha: al(3) });
      T(g, 'Mann: incluzii roșu strălucitor\ncitoplasmă albastră · nucleu violet', 790, 760, 15, M.cream, { alpha: al(3), w: 600 });
      T(g, 'aglomerări de particule virale\n(se multiplică doar în celule vii)', 790, 835, 15, M.cream, { alpha: al(3), w: 600 });
    },
  };
}
