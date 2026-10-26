// Kit LP 2 (arcurile faringiene): peste kitul embriologie (ek.js) + utilitarele LP 1 (k1.js).
// Paleta ARC e aceeași în tot deck-ul: indexul 0..4 = arcurile 1, 2, 3, 4, 6.
export * from './ek.js';
export { card, vis, act, pulse } from './k1.js';
import { C, txt, pill, tube, dot, ell, OUT, clamp, lerp, ease, REDUCED, curve, glowRing } from './ek.js';

export const ARC = ['#f2b33d', '#ec6aa6', '#4f8fe6', '#9a6ad6', '#b98352']; // 1 galben · 2 roz · 3 albastru · 4 mov · 6 maro
export const ARCN = ['1', '2', '3', '4', '6'];
// foițele și structurile (constante în deck)
export const ECTO = '#56c2e0', MESO = '#ef7468', CREST = '#c08cf2', ENDO = '#f7d77e';
export const MES = '#f1c4a8', LUMEN = '#6d5633', SKY = '#1d130f';
export const NERVE = '#ffe36e', ART = '#e0443e', PTH = '#5cc48a', THY = '#e0443e', UB = '#7fd3ff', TONS = '#c9a0ff', TUBA = '#ffd27a', THYR = '#e98a4f';
export const RED = '#e0443e', OK = '#5cc48a', BAD = '#ff6b5e';

// alpha: intro (-1) = tot; altfel aprins pe punctul lui, dim (lo) în rest
export const A = (b, ks, lo = 0.3) => (b.i < 0 || (Array.isArray(ks) ? ks.includes(b.i) : ks === b.i) ? 1 : lo);
// alpha cumulativ: vizibil de la punctul k încolo
export const from = (b, k, lo = 0.12) => (b.i < 0 || b.i >= k ? 1 : lo);
// progresul animației punctului k (0 → 1), 1 după el, 0 înainte; pe intro buclă
export function prog(b, t, k, f = 0.7, per = 6) {
  if (b.i < 0) return REDUCED ? 1 : ease(clamp(((t % per) / per) * 1.4));
  if (b.i > k) return 1; if (b.i < k) return 0; return ease(clamp(b.bt / (b.bd * f)));
}
// banda pe intro: indexul care „pâlpâie” ciclic
export const cyc = (t, n, per = 2.2) => (REDUCED ? 0 : Math.floor(t / per) % n);

export function ringAt(g, x, y, rx, ry, t, a = 1) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); glowRing(g, x, y, rx, ry, 0, 0.5 + 0.5 * Math.sin(t * 4)); g.restore(); }
export function poly(g, pts, fill, o = {}) {
  if (pts.length < 2) return; g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let k = 1; k < pts.length; k++) g.lineTo(pts[k][0], pts[k][1]); if (o.close !== false) g.closePath();
  if (fill) { g.fillStyle = fill; g.fill(); }
  if (o.stroke) { g.lineJoin = 'round'; g.strokeStyle = o.stroke; g.lineWidth = o.lw ?? 5; if (o.dash) g.setLineDash(o.dash); g.stroke(); }
  g.restore();
}
export function line(g, pts, col, w = 5, o = {}) {
  if (pts.length < 2) return; g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  g.lineCap = 'round'; g.lineJoin = 'round'; if (o.dash) g.setLineDash(o.dash);
  g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let k = 1; k < pts.length; k++) g.lineTo(pts[k][0], pts[k][1]);
  if (o.ow) { g.strokeStyle = OUT; g.lineWidth = w + o.ow; g.stroke(); }
  g.strokeStyle = col; g.lineWidth = w; g.stroke(); g.restore();
}
// insignă rotundă cu numărul arcului, în culoarea lui
export function arcTag(g, x, y, k, r = 19, a = 1) { dot(g, x, y, r, ARC[k], { alpha: a, ow: 4 }); txt(g, ARCN[k], x, y + 1, r * 1.15, OUT, { stroke: false, alpha: a, w: 900 }); }
// legenda foițelor
export function legend(g, x, y, items, a = 1, size = 16) {
  let cx = x; items.forEach(([col, s]) => { dot(g, cx + 9, y, 9, col, { alpha: a, ow: 2.5 }); g.save(); g.font = `700 ${size}px Inter, sans-serif`; const w = g.measureText(s).width; g.restore(); txt(g, s, cx + 24, y, size, '#ffe7d6', { align: 'left', alpha: a, w: 700 }); cx += 24 + w + 26; });
}

/* ================= SECȚIUNEA FRONTALĂ PRIN APARATUL FARINGIAN =================
   Cranial = sus. Faringele (lumenul, endoderm) e la mijloc; pe fiecare parte, 5 arcuri (1, 2, 3, 4, 6) de sus în jos.
   Între două arcuri: în EXTERIOR șanțul (ectoderm, albastru-cyan), în INTERIOR punga (endoderm, galben), iar unde se ating = membrana (3 straturi).
   Conturul extern e trasat cu ECTO, cel intern cu ENDO; mezenchimul arcului e colorat cu tenta arcului.
   o = { cx, y0, sc, sides:[-1,1] (−1 = stânga imaginii), aArc(k), aCleft(k), aPouch(k), aMem(k), tint, nums, flap, sinus, ridge } */
export function secGeom(o) {
  const sc = o.sc ?? 1; const H = [128, 112, 98, 84, 58].map((h) => h * sc); const G = 40 * sc;
  const ys = []; let y = o.y0; H.forEach((h) => { ys.push(y + h / 2); y += h + G; });
  const yEnd = y - G; const gaps = [0, 1, 2, 3].map((k) => (ys[k] + H[k] / 2 + ys[k + 1] - H[k + 1] / 2) / 2);
  return { sc, H, ys, gaps, y0: o.y0, yEnd, pw: (o.pw ?? 46) * sc, AW: (o.aw ?? 230) * sc, WK: [1, 0.96, 0.9, 0.82, 0.68] };
}
function ext(G, k, y) { const ry = G.H[k] / 2 + 6 * G.sc; if (k === 0 && y < G.ys[0]) return 1; if (k === 4 && y > G.ys[4]) return 1; const u = (y - G.ys[k]) / ry; return Math.abs(u) >= 1 ? 0 : Math.sqrt(1 - u * u); }
export function contours(G) {
  const out = [], inn = [];
  for (let y = G.y0 - 18 * G.sc; y <= G.yEnd + 18 * G.sc; y += 4) {
    let q = 0, e = 0; for (let k = 0; k < 5; k++) { const v = ext(G, k, y); q = Math.max(q, v); e = Math.max(e, v * G.WK[k]); }
    out.push([y, G.pw + G.AW * Math.max(0.56, e)]); inn.push([y, G.pw + G.AW * 0.43 * Math.pow(1 - q, 1.6)]);
  }
  return { out, inn };
}
export function section(g, t, o) {
  const G = secGeom(o); const { out, inn } = contours(G); const cx = o.cx; const sides = o.sides || [-1, 1];
  const aArc = o.aArc || (() => 1), aCl = o.aCleft || (() => 1), aPo = o.aPouch || (() => 1), aMem = o.aMem || (() => 0);
  const top = G.y0 - 18 * G.sc, bot = G.yEnd + 18 * G.sc;
  // lumenul faringelui (între contururile interne)
  const L = sides.includes(-1) ? inn.map(([y, x]) => [cx - x, y]) : [[cx - G.pw, top], [cx - G.pw, bot]];
  const R = sides.includes(1) ? inn.map(([y, x]) => [cx + x, y]).reverse() : [[cx + G.pw, bot], [cx + G.pw, top]];
  poly(g, [...L, ...R], LUMEN, { alpha: o.aLumen ?? 1 });
  if (o.lumenLabel !== false) txt(g, 'faringe', cx, (G.ys[1] + G.ys[2]) / 2, 17 * G.sc, '#ffe7b0', { alpha: o.aLumen ?? 1 });
  for (const d of sides) {
    const O = out.map(([y, x]) => [cx + d * x, y]), I = inn.map(([y, x]) => [cx + d * x, y]);
    // mezenchimul (între contururi), apoi tenta fiecărui arc
    poly(g, [...O, ...I.slice().reverse()], MES);
    g.save(); g.beginPath(); g.moveTo(O[0][0], O[0][1]); O.forEach((p) => g.lineTo(p[0], p[1])); I.slice().reverse().forEach((p) => g.lineTo(p[0], p[1])); g.closePath(); g.clip();
    for (let k = 0; k < 5; k++) { const a = aArc(k); const tint = o.tint ? o.tint(k) : 0.55; g.globalAlpha = clamp(a * tint); g.fillStyle = ARC[k]; g.beginPath(); g.ellipse(cx + d * (G.pw + G.AW * 0.5), G.ys[k], G.AW * 0.62, G.H[k] / 2 + 4, 0, 0, 7); g.fill(); }
    g.restore();
    // contururile: ectoderm extern, endoderm intern (segmente cu alpha pe șanț / pungă)
    const seg = (P, col, aF) => { for (let k = 1; k < P.length; k++) { const y = P[k][1]; let kk = -1; G.gaps.forEach((gy, j) => { if (Math.abs(y - gy) < 30 * G.sc) kk = j; }); const a = kk >= 0 ? aF(kk) : (o.aEdge ?? 1); g.save(); g.globalAlpha = clamp(a); g.strokeStyle = col; g.lineWidth = 7 * G.sc; g.lineCap = 'round'; g.beginPath(); g.moveTo(P[k - 1][0], P[k - 1][1]); g.lineTo(P[k][0], P[k][1]); g.stroke(); g.restore(); } };
    seg(O, ECTO, aCl); seg(I, ENDO, aPo);
    // membranele: 3 benzi (endo · mezo · ecto) între vârful pungii și al șanțului
    G.gaps.forEach((gy, j) => {
      const a = aMem(j); if (a <= 0.01) return; const x0 = G.pw + G.AW * 0.43, x1 = G.pw + G.AW * 0.56; const w = (x1 - x0) / 3;
      [ENDO, MESO, ECTO].forEach((col, s) => { g.save(); g.globalAlpha = clamp(a); g.fillStyle = col; const xa = cx + d * (x0 + s * w); g.fillRect(Math.min(xa, xa + d * w), gy - 15 * G.sc, w, 30 * G.sc); g.restore(); });
      g.save(); g.globalAlpha = clamp(a); g.strokeStyle = OUT; g.lineWidth = 2.5; g.strokeRect(cx + d * x0 - (d < 0 ? x1 - x0 : 0), gy - 15 * G.sc, x1 - x0, 30 * G.sc); g.restore();
    });
    // numerele arcurilor
    if (o.nums !== false) for (let k = 0; k < 5; k++) arcTagSafe(g, cx + d * (G.pw + G.AW * 0.66), G.ys[k], k, Math.max(13, 18 * G.sc), aArc(k));
  }
  return G;
}
function arcTagSafe(g, x, y, k, r, a) { if (a > 0.01) arcTag(g, x, y, k, r, a); }
// pozițiile utile (vârful șanțului / pungii / centrul arcului) pentru etichete
export const tipCleft = (G, cx, d, j) => [cx + d * (G.pw + G.AW * 0.6), G.gaps[j]];
export const tipPouch = (G, cx, d, j) => [cx + d * (G.pw + G.AW * 0.38), G.gaps[j]];
export const outerX = (G, cx, d) => cx + d * (G.pw + G.AW * 1.02);

/* ================= CAPUL DIN PROFIL (privește spre dreapta) =================
   origine = urechea; j = mărimea mandibulei (1 normal, ~0.55 hipoplazică); întoarce punctele utile. */
export function headPts(j = 1) {
  const cb = 1 - j; // cât de retrasă e bărbia
  return [[-20, -262], [110, -238], [190, -170], [228, -92], [236, -58], [292, -8], [252, 20], [264, 50], [246, 72],
    [258 - cb * 60, 94 + cb * 4], [246 - cb * 118, 150 - cb * 42], [200 - cb * 110, 186 - cb * 48], [130 - cb * 40, 210 - cb * 28], [150, 300], [150, 430],
    [-140, 430], [-136, 300], [-160, 120], [-205, -20], [-180, -160], [-110, -236], [-20, -262]];
}
export function head(g, x, y, s, o = {}) {
  const j = o.jaw ?? 1; const P = curve(headPts(j), 10).map(([a, b]) => [x + a * s, y + b * s]);
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  g.beginPath(); g.moveTo(P[0][0], P[0][1]); P.forEach((p) => g.lineTo(p[0], p[1])); g.closePath();
  g.fillStyle = o.fill || C.skin; g.fill(); g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(); g.restore();
  if (o.normal) { const N = curve(headPts(1), 10).slice(70, 140).map(([a, b]) => [x + a * s, y + b * s]); line(g, N, '#fff3e6', 3, { dash: [8, 7], alpha: (o.alpha ?? 1) * 0.9 }); }
  const a = o.alpha ?? 1;
  // ochiul, sprânceana, gura, urechea
  const ey = o.slant ? 6 : 0;
  g.save(); g.globalAlpha = clamp(a); g.translate(x + 182 * s, y + (-70 + ey) * s); g.rotate(o.slant ? 0.32 : 0);
  g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.ellipse(0, 0, 24 * s, 13 * s, 0, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#3b2a24'; g.beginPath(); g.arc(8 * s, 0, 8 * s, 0, 7); g.fill(); g.restore();
  line(g, [[x + (258 - (1 - j) * 50) * s, y + 74 * s], [x + 226 * s, y + 76 * s]], OUT, 4, { alpha: a });
  const es = o.ear ?? 1; // urechea (mică/malformată la TC)
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(es * s, es * s);
  g.fillStyle = '#e7a882'; g.strokeStyle = OUT; g.lineWidth = 5 / es; g.beginPath(); g.moveTo(10, -42); g.bezierCurveTo(-34, -48, -40, 36, -6, 44); g.bezierCurveTo(10, 46, 14, 20, 4, 10); g.bezierCurveTo(-6, 0, 8, -10, 14, -20); g.closePath(); g.fill(); g.stroke(); g.restore();
  return P;
}

/* ================= EMBRIONUL DE ~32 DE ZILE, din lateral (fața spre stânga) =================
   capul sus, arcurile = benzi pe lateralul gâtului (1 cu proces maxilar + mandibular), inima sub arcuri, corpul curbat în C. */
export function embryo(g, x, y, s, o = {}) {
  const a = o.alpha ?? 1; g.save(); g.translate(x, y); g.scale(s, s); g.globalAlpha = clamp(a);
  const body = new Path2D();
  body.moveTo(-20, -230); body.bezierCurveTo(120, -250, 190, -130, 170, 0); body.bezierCurveTo(160, 120, 110, 220, 20, 250);
  body.bezierCurveTo(-30, 262, -70, 240, -60, 210); body.bezierCurveTo(-30, 200, 30, 170, 40, 120);
  body.bezierCurveTo(-20, 110, -90, 70, -110, 10); body.bezierCurveTo(-150, -60, -140, -200, -20, -230); body.closePath();
  g.fillStyle = '#f3d2b8'; g.fill(body); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(body);
  // somitele pe spate
  for (let k = 0; k < 9; k++) { const u = k / 8; const px = 170 - u * 40 - u * u * 60, py = -20 + u * 230; dot(g, px - 18, py, 9, '#e7b896', { ow: 2.5 }); }
  // inima (bombată sub arcuri)
  ell(g, -60, 70, 46, 40, '#e86a63', { ow: 5 });
  // mugurele membrului superior
  ell(g, 70, 70, 26, 40, '#efc2a4', { ow: 4, rot: -0.4 });
  g.restore();
  // arcurile (benzi) — desenate fără scalarea contextului pentru grosimea conturului
  const B = [[-80, -88, 50, 20, 0], [-66, -42, 40, 15, 1], [-50, -10, 30, 12, 2], [-36, 14, 20, 9, 3]];
  B.forEach(([bx, by, rx, ry, k]) => { const al = (o.aArc ? o.aArc(k) : 1) * a; ell(g, x + bx * s, y + by * s, rx * s, ry * s, ARC[k], { alpha: al, ow: 4, rot: -0.35 }); });
  // procesul maxilar (deasupra arcului 1)
  ell(g, x - 92 * s, y - 122 * s, 30 * s, 12 * s, ARC[0], { alpha: (o.aArc ? o.aArc(0) : 1) * a, ow: 4, rot: -0.2 });
  // ochiul (placoda optică)
  dot(g, x - 70 * s, y - 158 * s, 10 * s, '#5a3a30', { alpha: a, ow: 2 });
  return { arcs: B.map(([bx, by]) => [x + bx * s, y + by * s]), max: [x - 92 * s, y - 122 * s], heart: [x - 60 * s, y + 70 * s] };
}

/* ================= OPERCULUL ARCULUI 2 (doar partea stângă a secțiunii, exteriorul = stânga) =================
   u = cât a crescut arcul 2 în jos (0 → 1: ajunge la creasta epicardică, sub arcul 6); sinus = cât mai există sinusul cervical (1 → 0). */
export function opercul(g, G, cx, u, sinus, o = {}) {
  const xo = (k) => cx - (G.pw + G.AW * G.WK[k]) - 14 * G.sc;
  const ridge = [cx - (G.pw + G.AW * 0.62), G.yEnd + 34 * G.sc];
  const a = o.alpha ?? 1;
  // creasta epicardică (deasupra inimii), caudal de arcul 6
  if (o.ridge !== false) { ell(g, ridge[0], ridge[1], 70 * G.sc, 26 * G.sc, '#d2524a', { alpha: a, ow: 4 }); if (o.labels !== false) txt(g, 'creasta epicardică', ridge[0] - 10 * G.sc, ridge[1] + 50 * G.sc, 16, '#ffd0c0', { alpha: a }); }
  // sinusul cervical: spațiul (ectoderm) dintre opercul și șanțurile 2–4
  if (sinus > 0.01 && u > 0.5) {
    const yc = (G.gaps[1] + G.gaps[3]) / 2, ry = ((G.gaps[3] - G.gaps[1]) / 2 + 26 * G.sc) * sinus;
    ell(g, xo(2) + 18 * G.sc, yc, 34 * G.sc * Math.max(0.35, sinus), ry, '#bfeaf5', { alpha: a * clamp((u - 0.5) * 2), ow: 4, sc: ECTO });
  }
  // operculul: mezenchimul arcului 2 care crește în jos, pe exterior
  const P = [[xo(1) + 30 * G.sc, G.ys[1]], [xo(1) - 10 * G.sc, G.ys[1] + 40 * G.sc], [xo(2) - 26 * G.sc, G.ys[2]], [xo(3) - 26 * G.sc, G.ys[3]], [xo(4) - 22 * G.sc, G.ys[4]], [ridge[0] - 40 * G.sc, ridge[1] - 14 * G.sc]];
  if (u > 0.01) tube(g, P, 30 * G.sc, ARC[1], { u1: u, alpha: a, ow: 7 });
  return { P, ridge, sinusAt: [xo(2) + 18 * G.sc, (G.gaps[1] + G.gaps[3]) / 2] };
}
