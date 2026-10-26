// Kit LP 2 (arcurile faringiene), peste kitul LP 1 (k1.js → ek.js → kit2d.js): paleta ARC (o culoare pe arc, în tot deck-ul),
// foițele, glandele din pungi, embrionul de S4–S5 în vedere laterală, secțiunea frontală prin aparatul faringian,
// capul de copil în profil (malformațiile, cazul), capul în secțiune sagitală (Pierre Robin), nervi, artere, glande.
export * from './k1.js';
import { C, K, txt, pill, ell, dot, tube, curve, at, sub, flow, ring, lead, arr, OUT, clamp, lerp, ease, paint, blob, bb, smooth, REDUCED, srand, rr, loopT } from './k1.js';

/* ---------- paleta: aceeași în tot deck-ul ----------
   ARC = arcul de origine (teal 1, roz 2, verde 3, portocaliu 4, maro 6).
   L = foițele / țesuturile: ectoderm albastru, endoderm galben, mezoderm coral, creasta neurală mov, mezenchim neutru,
       artera roșie (cu lumen), nervul galben-pai.
   G = glandele din pungi: amigdala orhidee, timusul crem (lobulat), paratiroidele cyan, corpul ultimobranhial indigo,
       tiroida zmeurie. */
export const ARCS = [1, 2, 3, 4, 6];
export const ARC = {
  1: '#22c3a8', 2: '#ff6fb1', 3: '#8acb3e', 4: '#ff9a3c', 6: '#b5835a',
};
export const ARCS_ = { 1: '#13917c', 2: '#cf4486', 3: '#5f9a22', 4: '#cf6f16', 6: '#86592f' };
export const ARCL = { 1: '#9ff0de', 2: '#ffc2de', 3: '#cdf0a0', 4: '#ffd2a4', 6: '#e6c6a6' };
export const L = {
  ecto: '#5b9bf0', ectoS: '#2f68bd', ectoL: '#cfe0ff',
  endo: '#f4cc4f', endoS: '#c99a22', endoL: '#fff0b8',
  meso: '#ef6f62', mesoS: '#bf4a40', mesoL: '#ffc0b6',
  nc: '#a879f0', ncS: '#7a4fc4', ncL: '#dcc8ff',
  mes: '#ecd2b4', mesS: '#c9a985', mesL: '#fff2e2',
  art: '#d93a3a', artS: '#9e2424', lum: '#5a1418',
  nerve: '#fff0b0', nerveS: '#d9c06a',
  skin: '#f3c1a6', skinS: '#d99a80', skinL: '#ffe5d6',
  bone: '#efe6d2', boneS: '#c9bb9a', lumen: '#3a2620',
};
export const G = {
  tonsil: '#e58bd8', tonsilS: '#b45aa8',
  thymus: '#f4ead6', thymusS: '#cdbb98',
  para: '#36d1e0', paraS: '#1a97a5',
  ub: '#6c7cff', ubS: '#4250c9',
  thy: '#c05a7a', thyS: '#8e3554',
  heart: '#e25b6a', heartS: '#ad3646',
};
export const roman = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 6: 'VI' };

/* ---------- helperi ---------- */
export const sp = (u, a, b) => ease(clamp((u - a) / (b - a)));
// nerv: cordon subțire cu contur + fibre fine
export function nerve(g, pts, w, col = L.nerve, o = {}) {
  const P = tube(g, pts, w, col, { ow: o.ow ?? 5, u0: o.u0, u1: o.u1, alpha: o.alpha, glow: o.glow });
  if ((o.u1 ?? 1) > 0.05 && w >= 7) { g.save(); g.globalAlpha = (o.alpha ?? 1) * 0.5; const Q = sub(P, o.u0 ?? 0, o.u1 ?? 1); if (Q.length > 1) { const p = new Path2D(); p.moveTo(Q[0][0], Q[0][1]); Q.forEach((q) => p.lineTo(q[0], q[1])); g.strokeStyle = o.fib || '#ffffff'; g.lineWidth = Math.max(1.5, w * 0.16); g.setLineDash([w * 0.9, w * 0.7]); g.stroke(p); } g.restore(); }
  return P;
}
// arteră: tub roșu cu lumen închis și hematii care curg (o.flow = viteza; o.u1 = cât e desenat)
export function artery(g, pts, w, t, o = {}) {
  const col = o.col || L.art;
  const P = tube(g, pts, w, col, { ow: o.ow ?? 6, u0: o.u0, u1: o.u1, alpha: o.alpha, glow: o.glow, raw: o.raw });
  if (w >= 12 && (o.lumen ?? true)) tube(g, o.raw ? pts : pts, w * 0.34, o.lum || 'rgba(70,10,14,.55)', { ow: 0, u0: o.u0, u1: o.u1, alpha: o.alpha, raw: o.raw });
  if (o.flow && (o.alpha ?? 1) > 0.2) flow(g, P, t, '#ffd0d0', o.n || 4, o.flow, Math.max(3, w * 0.16), { alpha: (o.alpha ?? 1) * 0.85, u1: o.u1 });
  return P;
}
// cartilaj / os: bară rotunjită pictată (cu „perle” de condrocite dacă o.cells)
export function bar(g, pts, w, col, shade, o = {}) {
  const P = tube(g, pts, w, col, { ow: o.ow ?? 5, alpha: o.alpha, glow: o.glow, u0: o.u0, u1: o.u1, dash: o.dash });
  if (o.light !== false && (o.alpha ?? 1) > 0.05) tube(g, pts.map(([x, y]) => [x - w * 0.12, y - w * 0.16]), w * 0.22, 'rgba(255,255,255,.35)', { ow: 0, alpha: o.alpha, u0: (o.u0 ?? 0) + 0.04, u1: Math.max(0, (o.u1 ?? 1) - 0.04) });
  if (o.cells) { const Q = sub(P, o.u0 ?? 0, o.u1 ?? 1); for (let k = 2; k < Q.length - 2; k += 3) dot(g, Q[k][0], Q[k][1] + (k % 2 ? 2 : -2), Math.max(2, w * 0.13), shade, { ow: 0, alpha: (o.alpha ?? 1) * 0.7 }); }
  return P;
}
// mușchi: fus cu striații
export function muscle(g, cx, cy, len, w, rot, col, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.translate(cx, cy); g.rotate(rot);
  const p = new Path2D(); p.moveTo(-len / 2, 0); p.bezierCurveTo(-len / 4, -w / 2, len / 4, -w / 2, len / 2, 0); p.bezierCurveTo(len / 4, w / 2, -len / 4, w / 2, -len / 2, 0); p.closePath();
  paint(g, p, col, o.shade || 'rgba(0,0,0,.18)', 'rgba(255,255,255,.5)', [-len / 2, -w / 2, len, w], OUT, o.ow ?? 4);
  g.save(); g.clip(p); g.strokeStyle = o.str || 'rgba(60,10,10,.35)'; g.lineWidth = 2; for (let k = -6; k <= 6; k++) { g.beginPath(); g.moveTo(k * len / 14, -w); g.lineTo(k * len / 14 + 4, w); g.stroke(); } g.restore();
  if (o.glow) { g.shadowColor = C.hi; g.shadowBlur = 20 * o.glow; g.strokeStyle = C.hi; g.lineWidth = 4; g.stroke(p); }
  g.restore();
}
// timus: lobulat, crem
export function thymus(g, pts, w, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  const P = curve(pts, 10); g.save(); g.globalAlpha = clamp(a);
  tube(g, pts, w, G.thymus, { ow: 5 });
  for (let k = 3; k < P.length - 2; k += 5) { const q = P[k]; ell(g, q[0] + (k % 2 ? 3 : -3), q[1], w * 0.42, w * 0.34, G.thymus, { ow: 2.5, sc: G.thymusS }); }
  g.restore(); return P;
}
export function para(g, x, y, r, o = {}) { ell(g, x, y, r, r * 0.82, G.para, { ow: o.ow ?? 4, shade: G.paraS, light: '#c8f6fb', alpha: o.alpha }); if (o.label) txt(g, o.label, x, y + 1, Math.max(13, r * 0.9), OUT, { stroke: false, alpha: o.alpha }); }
export function tonsil(g, x, y, rx, ry, rot = 0, o = {}) { ell(g, x, y, rx, ry, G.tonsil, { rot, shade: G.tonsilS, light: '#ffd8f6', ow: 4, alpha: o.alpha }); if ((o.alpha ?? 1) > 0.1) for (let k = 0; k < 3; k++) { g.save(); g.globalAlpha = (o.alpha ?? 1) * 0.7; g.strokeStyle = G.tonsilS; g.lineWidth = 2.5; g.beginPath(); g.arc(x + (k - 1) * rx * 0.45, y, ry * 0.35, 0.3, 2.8); g.stroke(); g.restore(); } }
// tiroida: fluture (2 lobi + istm) centrat în (x, y)
export function thyroid(g, x, y, s = 1, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s);
  const p = new Path2D();
  p.moveTo(-14, -6); p.bezierCurveTo(-30, -70, -78, -80, -86, -30); p.bezierCurveTo(-92, 20, -74, 76, -40, 70); p.bezierCurveTo(-24, 66, -18, 30, -10, 26);
  p.lineTo(10, 26); p.bezierCurveTo(18, 30, 24, 66, 40, 70); p.bezierCurveTo(74, 76, 92, 20, 86, -30); p.bezierCurveTo(78, -80, 30, -70, 14, -6); p.closePath();
  paint(g, p, G.thy, G.thyS, '#f2a0b8', [-90, -80, 180, 150], OUT, 5 / s);
  if (o.glow) { g.shadowColor = C.hi; g.shadowBlur = 22 * o.glow; g.strokeStyle = C.hi; g.lineWidth = 4 / s; g.stroke(p); }
  g.restore();
}
// inima (proeminența cardiacă / organul) cu bătaie
export function heart(g, x, y, s, t, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  const beat = REDUCED ? 0 : Math.max(0, Math.sin(t * 6)) ** 6 * 0.04;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s * (1 + beat), s * (1 + beat)); g.rotate(o.rot || 0);
  const p = new Path2D(); p.moveTo(0, -40); p.bezierCurveTo(30, -78, 92, -52, 80, 2); p.bezierCurveTo(70, 46, 22, 74, 0, 96); p.bezierCurveTo(-22, 74, -70, 46, -80, 2); p.bezierCurveTo(-92, -52, -30, -78, 0, -40); p.closePath();
  paint(g, p, o.col || G.heart, G.heartS, '#ff9aa6', [-90, -78, 180, 174], OUT, 5 / s);
  g.restore();
}

/* =================================================== EMBRIONUL S4–S5, VEDERE LATERALĂ (stadiul 14, ~32 de zile)
   Orientare (ca poza UNSW din LP): dorsal = stânga (rombencefalul, somitele pe spate), ventral = dreapta (proeminența frontonazală,
   inima, ficatul); cranial = sus. Sub ochi: arcul 1 cu procesul maxilar (sus, mic, spre ochi) și mandibular (jos, mare);
   apoi arcurile 2, 3, 4, tot mai mici, de sus în jos; arcul 6 nu se vede din exterior. Între arcuri, șanțurile (adâncituri).
   Inima = proeminența de sub arcuri; arterele arcurilor pleacă din sacul aortic. Coordonate locale: s = 1 → ~780 înălțime.
   o: col (arcurile colorate pe ARC), archP (0..1 apariția), over (0..1 arcul 2 acoperă 3–4 → sinusul cervical, gâtul neted),
   ear (0..1 pavilionul), hi (lista arcurilor accentuate), dimArc (opacitatea celorlalte), nc (fluxul crestei; nc1 = cât ajunge în arcul 1),
   tube (tubul neural vizibil), alpha. Întoarce reperele (coordonate globale). */
const E_OUT = [[-40, -300], [-150, -278], [-232, -212], [-264, -112], [-270, 0], [-262, 110], [-240, 220], [-196, 320], [-122, 396], [-22, 440], [80, 446], [150, 418], [182, 380], [206, 338], [246, 270], [266, 190], [276, 110], [252, 50], [228, 22], [214, -28], [232, -70], [204, -104], [238, -150], [232, -222], [182, -282], [82, -318]];
export const ARCH_LAT = {
  max: [[58, -128], [122, -138], [186, -124]],
  1: [[-74, -122], [48, -86], [214, -66]],
  2: [[-100, -52], [38, -8], [198, 10]],
  3: [[-94, 22], [28, 54], [162, 66]],
  4: [[-78, 82], [18, 106], [124, 110]],
};
const ARCH_W = { max: 44, 1: 66, 2: 56, 3: 44, 4: 32 };
// creastă (arc) în vedere laterală: bandă care se subțiază dorsal și e rotunjită ventral
export function ridge(pts, W, o = {}) {
  const P = curve(pts, 12); const n = P.length; const up = [], dn = [];
  for (let k = 0; k < n; k++) {
    const u = k / (n - 1); const a = P[Math.min(n - 1, k + 1)], b = P[Math.max(0, k - 1)]; const ang = Math.atan2(a[1] - b[1], a[0] - b[0]);
    const capD = u < 0.14 ? Math.sqrt(Math.max(0.04, 1 - ((0.14 - u) / 0.14) ** 2)) : 1, capV = u > 0.84 ? Math.sqrt(Math.max(0.02, 1 - ((u - 0.84) / 0.16) ** 2)) : 1;
    const w = W / 2 * (0.34 + 0.66 * Math.pow(u, 0.5)) * capD * capV;
    const nx = -Math.sin(ang), ny = Math.cos(ang);
    up.push([P[k][0] + nx * w * (o.lo ?? 1), P[k][1] + ny * w * (o.lo ?? 1)]); dn.push([P[k][0] - nx * w, P[k][1] - ny * w]);
  }
  return smooth([...up, ...dn.reverse()]);
}
export function embryoLat(g, x, y, s, t, o = {}) {
  const a = o.alpha ?? 1; const T = (px, py) => [x + px * s, y + py * s];
  const R = { arch: (k) => T(...ARCH_LAT[k][1]), archV: (k) => T(...ARCH_LAT[k][2]), archD: (k) => T(...ARCH_LAT[k][0]), heart: T(205, 128), liver: T(178, 290), eye: T(92, -192), max: T(122, -132), mand: T(130, -84), cleft: (j) => T(lerp(ARCH_LAT[[1, 2, 3, 4][j]][1][0], ARCH_LAT[[2, 3, 4, 4][j]][1][0], 0.5) + 10, (ARCH_LAT[[1, 2, 3, 4][j]][1][1] + (j < 3 ? ARCH_LAT[[2, 3, 4][j]][1][1] : 150)) / 2), sac: T(210, 40), hind: T(-200, -150), crest: (k) => T(-206, { 1: -150, 2: -80, 3: -10, 4: 50 }[k]), ear: T(-40, -30), limb: T(-30, 268), neck: T(10, 60) };
  if (a <= 0.01) return R;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s);
  const ow = 5 / s; const br = REDUCED ? 0 : Math.sin(t * 1.2) * 1.5;
  const sk = o.skin || L.skin, skS = L.skinS, skL = L.skinL;
  const body = smooth(E_OUT.map(([px, py], k) => [px + (k > 12 && k < 18 ? br : 0), py]));
  paint(g, body, sk, skS, skL, [-270, -320, 546, 766], OUT, ow);
  // volum: umbră pe spate, lumină pe cap
  g.save(); g.clip(body); g.globalAlpha *= 0.35; g.fillStyle = '#c47e66'; g.beginPath(); g.ellipse(-250, 120, 60, 330, 0, 0, 7); g.fill(); g.globalAlpha = clamp(a) * 0.5; g.fillStyle = '#ffeadf'; g.beginPath(); g.ellipse(-20, -230, 150, 60, -0.2, 0, 7); g.fill(); g.restore();
  // creierul prin transparență (veziculele)
  g.save(); g.globalAlpha *= 0.22; g.fillStyle = '#d46a7e'; g.beginPath(); g.ellipse(60, -240, 120, 54, 0.15, 0, 7); g.fill(); g.beginPath(); g.ellipse(-120, -232, 80, 44, -0.5, 0, 7); g.fill(); g.beginPath(); g.ellipse(-205, -120, 40, 80, -0.1, 0, 7); g.fill(); g.restore();
  // tubul neural (pe spate) + creasta neurală
  if (o.tube) { g.save(); g.globalAlpha *= clamp(o.tube); tube(g, [[-60, -280], [-180, -230], [-225, -120], [-236, 0], [-230, 140], [-206, 260]], 16, L.ectoL, { ow: 3 / s }); g.restore(); }
  // somitele pe spate
  const SOM = curve([[-232, -40], [-236, 60], [-226, 160], [-200, 250], [-156, 330], [-96, 384], [-20, 412], [60, 414]], 10);
  for (let k = 0; k < 17; k++) { const P0 = at(SOM, k / 16); const sz = lerp(18, 9, k / 16); ell(g, P0[0], P0[1], sz * 0.62, sz * 0.9, '#eaa88e', { ow: 2.2 / s, alpha: 0.95, rot: P0[2] + Math.PI / 2, light: '#ffd6c4' }); }
  // mugurele membrului superior + ficatul + inima
  { const lb = new Path2D(); lb.moveTo(-90, 236); lb.bezierCurveTo(-60, 196, 40, 200, 70, 236); lb.bezierCurveTo(84, 262, 40, 300, -10, 300); lb.bezierCurveTo(-60, 300, -104, 266, -90, 236); lb.closePath(); paint(g, lb, sk, skS, skL, [-100, 200, 180, 100], OUT, ow); }
  ell(g, 178, 290, 72, 62, '#eab096', { ow, shade: '#cf8d72', light: skL });
  const beat = REDUCED ? 0 : Math.max(0, Math.sin(t * 6)) ** 6 * 3;
  ell(g, 205, 128, 78 + beat, 84 + beat, o.heartCol || '#ee9c94', { ow, shade: '#d8776f', light: '#ffd8d2' });
  // ochiul (placoda optică / cupa optică) + placoda nazală
  ell(g, 92, -192, 36, 30, '#f7d6c6', { ow: 3.5 / s }); ell(g, 96, -190, 18, 16, '#5a3a48', { ow: 0, alpha: 0.75 });
  ell(g, 196, -168, 16, 22, '#e0a08a', { ow: 3 / s, rot: 0.3 });
  // arcurile: benzi rotunjite; arcul 2 poate crește peste 3–4 (sinusul cervical se închide)
  const P = clamp(o.archP ?? 1); const ov = clamp(o.over ?? 0); const hi = o.hi || []; const dimA = o.dimArc ?? 1;
  const archCol = (k) => (o.col ? ARC[k === 'max' ? 1 : k] : sk);
  const archS = (k) => (o.col ? ARCS_[k === 'max' ? 1 : k] : skS);
  const archA = (k) => (hi.length && !hi.includes(k === 'max' ? 1 : k) && !hi.includes(k) ? dimA : 1);
  const drawArch = (k, wmul = 1) => {
    const w = ARCH_W[k] * P * wmul * (k === 1 || k === 'max' ? (o.a1 ?? 1) : 1); if (w < 2) return;
    g.save(); g.globalAlpha *= archA(k);
    const pts = ARCH_LAT[k];
    const rp = ridge(pts, w);
    paint(g, rp, archCol(k), archS(k), o.col ? ARCL[k === 'max' ? 1 : k] : skL, [pts[0][0], pts[1][1] - w / 2, pts[2][0] - pts[0][0], w], OUT, 4.5 / s);
    g.restore();
  };
  // ordinea: caudal → cranial (cel cranial stă deasupra)
  // șanțurile: adâncituri întunecate între arcuri (se văd din exterior)
  const groove = (pa, pb, a1) => { if (a1 <= 0.01) return; const mid = pa.map((p, i) => [(p[0] + pb[i][0]) / 2, (p[1] + pb[i][1]) / 2]); g.save(); g.globalAlpha *= a1; tube(g, mid.map(([px, py], i) => [px + (i === 0 ? 18 : 0), py]), 12 * P, '#a8644f', { ow: 0, u0: 0.08, u1: 0.95 }); g.restore(); };
  groove(ARCH_LAT[1], ARCH_LAT[2], 1 - ov); groove(ARCH_LAT[2], ARCH_LAT[3], 1 - ov); groove(ARCH_LAT[3], ARCH_LAT[4], 1 - ov);
  [4, 3].forEach((k) => drawArch(k));
  drawArch(2); drawArch(1); drawArch('max');
  if (ov > 0.01) { // arcul 2 crește în jos ca un capac peste 3 și 4: o pleoapă de țesut care coboară; dedesubt se închide sinusul cervical
    const yb = lerp(10, 132, ov);
    const fl = new Path2D(); fl.moveTo(-104, -40); fl.bezierCurveTo(-120, yb * 0.5, -70, yb + 6, 30, yb + 10); fl.bezierCurveTo(120, yb + 12, 176, yb * 0.6, 196, 14); fl.bezierCurveTo(150, -6, 40, -14, -104, -40); fl.closePath();
    g.save(); g.globalAlpha *= archA(2) * clamp(ov * 1.6);
    paint(g, fl, o.col ? ARC[2] : sk, o.col ? ARCS_[2] : skS, o.col ? ARCL[2] : skL, [-120, -40, 316, yb + 52], OUT, 4 / s);
    g.restore();
  }
  // gura primitivă (stomodeum) între procesele maxilare / mandibulare și proeminența frontonazală
  g.save(); g.strokeStyle = OUT; g.lineWidth = 4 / s; g.lineCap = 'round'; g.beginPath(); g.moveTo(206, -104); g.quadraticCurveTo(190, -100, 176, -104); g.stroke(); g.restore();
  // pavilionul urechii (din muguri ai arcurilor 1 și 2, în jurul șanțului 1)
  if ((o.ear ?? 0) > 0.02) { const e = clamp(o.ear); g.save(); g.globalAlpha *= e; const pa = new Path2D(); pa.ellipse(-46, -40, 34, 50, 0.2, 0, 7); paint(g, pa, '#f6c8ae', skS, skL, [-80, -90, 68, 100], OUT, 4 / s); g.strokeStyle = skS; g.lineWidth = 4 / s; g.beginPath(); g.arc(-44, -38, 20, -1.2, 2.2); g.stroke(); dot(g, -40, -36, 7, '#5a3a48', { ow: 0 }); g.restore(); }
  // creasta neurală care migrează în arcuri (mov)
  if (o.nc) {
    const ncA = clamp(o.nc); const n1 = o.nc1 ?? 1;
    [1, 2, 3, 4].forEach((k) => {
      const tgt = ARCH_LAT[k][1]; const src = { 1: [-212, -150], 2: [-224, -80], 3: [-230, -10], 4: [-226, 48] }[k];
      const path = curve([src, [lerp(src[0], tgt[0], 0.4), lerp(src[1], tgt[1], 0.3) - 12], tgt], 10);
      const amt = k === 1 ? n1 : 1;
      for (let q = 0; q < 6; q++) { let u = ((q / 6) + (REDUCED ? 0.5 : t * 0.22)) % 1; const lim = k === 1 ? lerp(0.32, 1, n1) : 1; if (u > lim) continue; const [px, py] = at(path, u); dot(g, px, py, 7, L.nc, { alpha: ncA * Math.sin(Math.min(1, u / lim) * Math.PI) ** 0.3, ow: 2 / s }); }
      // celulele ajunse în arc
      srand(31 + k); const cnt = Math.round(10 * amt * ncA);
      for (let q = 0; q < cnt; q++) { const [px, py] = at(ARCH_LAT[k], rr(0.1, 0.9)); dot(g, px + rr(-8, 8), py + rr(-ARCH_W[k] * 0.25, ARCH_W[k] * 0.25), 5.5, L.nc, { ow: 1.6 / s, alpha: ncA }); }
    });
    g.save(); g.globalAlpha *= ncA; tube(g, [[-205, -175], [-214, -110], [-222, -30], [-222, 60]], 12, L.nc, { ow: 3 / s }); g.restore();
  }
  g.restore();
  return R;
}

/* =================================================== SECȚIUNEA FRONTALĂ PRIN APARATUL FARINGIAN (ca schema din LP)
   Se vede: faringele la mijloc (lumen, căptușit cu ENDODERM galben); de fiecare parte, 5 arcuri (1, 2, 3, 4, 6) de sus în jos
   (cranial ↑), din mezenchim (mezoderm + creasta neurală); pe fața EXTERNĂ (ECTODERM albastru) 4 șanțuri între arcuri;
   pe fața INTERNĂ 4 pungi între arcuri; unde vârful șanțului atinge vârful pungii: membrana (3 straturi).
   o: cx, y0 (sus), col (arcurile colorate pe ARC; altfel mezenchim neutru), dim(k) = opacitatea arcului k, pouchD/cleftD (0..1 adâncimea),
   comp (0..1 punctele mezoderm + creasta neurală în arcuri), sides ([-1, 1] implicit), sc (scara pe orizontală).
   Întoarce geometria (centrele arcurilor, vârfurile pungilor / șanțurilor, membranele). */
export function pharynxGeo(o = {}) {
  const cx = o.cx ?? 500, y0 = o.y0 ?? 150, step = o.step ?? 128, hs = o.hs ?? 1;
  const yA = ARCS.map((_, k) => y0 + 70 + k * step); const yB = [0, 1, 2, 3].map((j) => (yA[j] + yA[j + 1]) / 2);
  const inner = 64 * hs, out = ARCS.map((_, k) => (318 - k * 18) * hs);
  const pTip = [0, 1, 2, 3].map((j) => (214 - j * 10) * hs), cTip = [0, 1, 2, 3].map((j) => (230 - j * 10) * hs);
  return { cx, y0, yA, yB, inner, out, pTip, cTip, top: y0, bot: yA[4] + 60 * hs * 0 + 62, X: (s, d) => cx + s * d };
}
export function pharynxSec(g, t, o = {}) {
  const Gm = pharynxGeo(o); const { cx, yA, yB, inner, out, top, bot } = Gm;
  const pd = clamp(o.pouchD ?? 1), cd = clamp(o.cleftD ?? 1);
  const sides = o.sides || [-1, 1];
  sides.forEach((s) => {
    const X = (d) => cx + s * d;
    const pT = Gm.pTip.map((d) => lerp(inner + 8, d, pd)), cT = Gm.cTip.map((d, j) => lerp((out[j] + out[j + 1]) / 2 - 6, d, cd));
    // conturul extern (ectoderm), de sus în jos, cu șanțurile
    const oe = [[X(out[0] - 30), top]];
    ARCS.forEach((_, k) => {
      oe.push([X(out[k]), yA[k] - 26], [X(out[k] + 4), yA[k]], [X(out[k]), yA[k] + 26]);
      if (k < 4) { const mo = (out[k] + out[k + 1]) / 2; oe.push([X(mo - 10), yB[k] - 18], [X(cT[k]), yB[k]], [X(mo - 10), yB[k] + 18]); }
    });
    oe.push([X(out[4] - 30), bot]);
    // conturul intern (endoderm), de jos în sus, cu pungile
    const ie = [[X(inner), bot]];
    for (let k = 4; k >= 0; k--) {
      ie.push([X(inner), yA[k] + 30], [X(inner - 4), yA[k]], [X(inner), yA[k] - 30]);
      if (k > 0) { const j = k - 1; ie.push([X(inner + 6), yB[j] + 22], [X(pT[j] - 12), yB[j] + 13], [X(pT[j]), yB[j]], [X(pT[j] - 12), yB[j] - 13], [X(inner + 6), yB[j] - 22]); }
    }
    ie.push([X(inner), top]);
    const OE = curve(oe, 6), IE = curve(ie, 6);
    const reg = new Path2D(); reg.moveTo(OE[0][0], OE[0][1]); OE.forEach((p) => reg.lineTo(p[0], p[1])); IE.forEach((p) => reg.lineTo(p[0], p[1])); reg.closePath();
    // umplerea: benzi pe arcuri
    g.save(); g.fillStyle = L.mes; g.fill(reg); g.clip(reg);
    ARCS.forEach((k, i) => {
      const a = o.dim ? o.dim(k) : 1; const y1 = i ? yB[i - 1] : top - 10, y2 = i < 4 ? yB[i] : bot + 10;
      g.globalAlpha = a; g.fillStyle = o.col ? ARCL[k] : L.mes; g.fillRect(Math.min(X(0), X(400)), y1, 400, y2 - y1);
      if (o.col) { g.globalAlpha = a * 0.75; g.fillStyle = ARC[k]; g.beginPath(); g.ellipse(X((inner + out[i]) / 2 + 8), yA[i], (out[i] - inner) / 2 - 8, (y2 - y1) / 2 - 4, 0, 0, 7); g.fill(); }
    });
    g.globalAlpha = 1;
    // compoziția: mezoderm (coral) + creasta neurală (mov)
    const cp = clamp(o.comp ?? 0);
    if (cp > 0) ARCS.forEach((k, i) => { srand(11 + i * 7 + (s > 0 ? 3 : 0)); const a = (o.dim ? o.dim(k) : 1) * cp; for (let q = 0; q < 9; q++) { const px = X(rr(inner + 30, out[i] - 34)), py = yA[i] + rr(-22, 22); dot(g, px, py, 6, q % 3 === 0 ? L.meso : L.nc, { alpha: a, ow: 1.8 }); } });
    g.restore();
    // liniile foițelor
    const strokeP = (Q, col, w, a = 1) => { const p = new Path2D(); p.moveTo(Q[0][0], Q[0][1]); Q.forEach((q) => p.lineTo(q[0], q[1])); g.save(); g.globalAlpha = a; g.lineJoin = 'round'; g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = w + 6; g.stroke(p); g.strokeStyle = col; g.lineWidth = w; g.stroke(p); g.restore(); };
    strokeP(OE, L.ecto, 9, o.ectoA ?? 1); strokeP(IE, L.endo, 9, o.endoA ?? 1);
    Gm[s > 0 ? 'R' : 'Lf'] = { OE, IE, pT, cT };
  });
  // lumenul faringelui
  g.save(); g.globalAlpha = 0.5; g.fillStyle = L.lumen; g.fillRect(cx - inner + 8, top, (inner - 8) * 2, bot - top); g.restore();
  return Gm;
}

/* =================================================== CAPUL DE COPIL, PROFIL (fața spre stânga)
   Coordonate locale: s = 1 → cap ~470 înălțime; (0, 0) ≈ centrul feței-craniului. o: mand (0..1 hipoplazia mandibulei: bărbia
   se retrage și urcă), slant (0..1 fanta palpebrală coboară lateral), zyg (0..1 pometele turtit), ear (0..1 urechea mică, malformată),
   low (0..1 urechea jos inserată), mouth (0..1 gura mică), neck (gâtul + umărul), scm (0..1 mușchiul SCM vizibil), ghost (conturul
   normal punctat al bărbiei). Întoarce reperele globale. */
export function childHead(g, x, y, s, t, o = {}) {
  const a = o.alpha ?? 1; const m = clamp(o.mand ?? 0); const T = (px, py) => [x + px * s, y + py * s];
  const chin = [-150 + 46 * m, 142 - 16 * m];
  const R = { chin: T(...chin), eye: T(-92, -28), zyg: T(-62, 22), ear: T(78, 8 + 46 * (o.low ?? 0)), jaw: T(10 - 6 * m, 150 - 18 * m), mouth: T(-158 + 18 * m, 84), scmTop: T(96, 74), scmBot: T(-58, 330), throat: T(-70, 220) };
  if (a <= 0.01) return R;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s);
  const ow = 5 / s; const sk = o.skin || '#f2c2a0', skS = '#d89a78', skL = '#ffe4d2';
  const lipX = 26 * m, mo = clamp(o.mouth ?? 0);
  // gâtul + umărul (în spatele capului)
  if (o.neck) {
    const nk = new Path2D(); nk.moveTo(-96, 170 - 10 * m); nk.bezierCurveTo(-104, 240, -110, 300, -150, 370); nk.lineTo(250, 370); nk.bezierCurveTo(200, 320, 150, 250, 140, 150); nk.closePath();
    paint(g, nk, sk, skS, skL, [-150, 150, 400, 220], OUT, ow);
    if ((o.scm ?? 0) > 0.01) { // mușchiul sternocleidomastoidian: de la mastoidă (după ureche) la stern, oblic în jos și înainte
      g.save(); g.globalAlpha *= clamp(o.scm); const sc = new Path2D(); sc.moveTo(84, 56); sc.bezierCurveTo(70, 160, 10, 260, -70, 350); sc.lineTo(-30, 356); sc.bezierCurveTo(46, 270, 112, 170, 128, 70); sc.closePath();
      paint(g, sc, '#e48a7c', '#c0645a', '#ffc4b8', [-70, 56, 200, 300], OUT, 4 / s);
      g.save(); g.clip(sc); g.strokeStyle = 'rgba(120,30,30,.35)'; g.lineWidth = 2.5 / s; for (let k = 0; k < 12; k++) { g.beginPath(); g.moveTo(80 + k * 6, 40); g.bezierCurveTo(60 + k * 6, 160, 0 + k * 5, 260, -80 + k * 5, 360); g.stroke(); } g.restore(); g.restore();
    }
  }
  // capul: craniu + fața (contur unic)
  const pts = [[30, -244], [150, -214], [218, -122], [228, -12], [204, 92], [150, 166], [60, 186], [10 - 6 * m, 156 - 18 * m], [-60 + 30 * m, 166 - 14 * m], [-110 + 40 * m, 164 - 16 * m], chin, [-160 + lipX, 106], [-152 + lipX * 0.6 - mo * 4, 88], [-168 + lipX * 0.3, 72], [-160, 54], [-192, 32], [-164, -18], [-160, -62], [-152, -142], [-92, -216]];
  const head = smooth(pts);
  paint(g, head, sk, skS, skL, [-190, -244, 418, 430], OUT, ow);
  if (o.ghost) { g.save(); g.setLineDash([9, 8]); g.strokeStyle = 'rgba(255,240,228,.75)'; g.lineWidth = 3.5 / s; g.beginPath(); const gh = curve([[10, 156], [-60, 166], [-110, 164], [-150, 142], [-160, 106], [-152, 88]], 8); g.moveTo(gh[0][0], gh[0][1]); gh.forEach((p) => g.lineTo(p[0], p[1])); g.stroke(); g.restore(); }
  // părul
  g.save(); g.clip(head); const hair = new Path2D(); hair.moveTo(-150, -120); hair.bezierCurveTo(-120, -250, 120, -280, 230, -110); hair.lineTo(240, 60); hair.bezierCurveTo(200, -40, 120, -120, 40, -150); hair.bezierCurveTo(-40, -170, -110, -150, -150, -120); hair.closePath(); paint(g, hair, '#4a3022', '#33201a', '#7a5040', [-150, -260, 390, 320], OUT, 0); g.restore();
  // pometele (zigomaticul): proeminență sub ochi; zyg → turtit
  const zy = 1 - clamp(o.zyg ?? 0);
  g.save(); g.globalAlpha *= 0.5 + 0.3 * zy; g.fillStyle = '#ffd3bc'; g.beginPath(); g.ellipse(-70, 26, 34 * (0.5 + 0.5 * zy), 18 * (0.5 + 0.5 * zy), -0.3, 0, 7); g.fill(); g.restore();
  g.save(); g.strokeStyle = skS; g.lineWidth = 3.5 / s; g.lineCap = 'round'; g.globalAlpha *= 0.4 + 0.6 * zy; g.beginPath(); g.moveTo(-104, 46); g.quadraticCurveTo(-60, 54 - 16 * zy, -22, 40); g.stroke(); g.restore();
  // ochiul: fanta palpebrală; slant → unghiul lateral (spre ureche) coboară
  const sl = clamp(o.slant ?? 0) * 0.42; g.save(); g.translate(-92, -28); g.rotate(sl);
  const eye = new Path2D(); eye.moveTo(-26, 0); eye.quadraticCurveTo(0, -18, 24, 2); eye.quadraticCurveTo(2, 14, -26, 0); eye.closePath();
  g.fillStyle = '#ffffff'; g.fill(eye); g.save(); g.clip(eye); dot(g, -6, 0, 9, '#4a2e22', { ow: 0 }); dot(g, -8, -2, 3, '#ffffff', { ow: 0 }); g.restore();
  g.strokeStyle = OUT; g.lineWidth = 3.5 / s; g.stroke(eye);
  g.lineCap = 'round'; g.beginPath(); g.moveTo(-26, -24); g.quadraticCurveTo(0, -36, 28, -22); g.strokeStyle = '#4a3022'; g.lineWidth = 5 / s; g.stroke();
  g.restore();
  // nasul (nara), gura
  g.save(); g.strokeStyle = skS; g.lineWidth = 3.5 / s; g.lineCap = 'round'; g.beginPath(); g.arc(-172, 40, 8, -0.2, 2.6); g.stroke();
  g.strokeStyle = '#b3545e'; g.lineWidth = 4 / s; g.beginPath(); g.moveTo(-160 + lipX * 0.5, 88); g.quadraticCurveTo(-140 + lipX * 0.4, 92, -126 + lipX * 0.3 - mo * 18, 86); g.stroke(); g.restore();
  // urechea: pavilion în C; ear → mică, mototolită; low → coborâtă și rotită
  const er = clamp(o.ear ?? 0), lw = clamp(o.low ?? 0);
  g.save(); g.translate(78, 8 + 46 * lw); g.rotate(0.12 + 0.3 * lw); g.scale(1 - 0.42 * er, 1 - 0.5 * er);
  const au = new Path2D(); au.moveTo(-10, -56); au.bezierCurveTo(40, -70, 52, -10, 36, 22); au.bezierCurveTo(26 - er * 14, 46, 10, 64, -6, 58); au.bezierCurveTo(-18, 52, -14, 36, -22, 26); au.bezierCurveTo(-34 + er * 10, 4, -36, -44, -10, -56); au.closePath();
  paint(g, au, '#f0b694', skS, skL, [-36, -70, 88, 134], OUT, 4.5 / s);
  g.strokeStyle = skS; g.lineWidth = 4 / s; g.lineCap = 'round'; g.beginPath(); if (er < 0.5) { g.moveTo(-6, -40); g.bezierCurveTo(26, -48, 34, -4, 20, 18); } else { g.moveTo(-4, -30); g.lineTo(12, -16); g.lineTo(2, 0); g.lineTo(16, 14); } g.stroke();
  dot(g, -4, 6, 6, '#6a3a30', { ow: 0, alpha: 0.8 });
  g.restore();
  g.restore();
  return R;
}

/* =================================================== CAPUL DE NOU-NĂSCUT ÎN SECȚIUNE SAGITALĂ (fața spre stânga) · Pierre Robin
   Se vede: cavitatea nazală sus, palatul dur (os) care o desparte de cavitatea bucală, limba în cavitatea bucală, mandibula (os)
   jos-față, faringele (calea aeriană) care coboară spre laringe/trahee (față) și esofagul (spate). Aerul curge: nas → faringe → trahee.
   o: mand (0..1 mandibula mică: bărbia se retrage), tongue (0..1 limba împinsă înapoi spre faringe → obstrucție), ghost (conturul normal).
   Întoarce reperele globale. */
export function sagHead(g, x, y, s, t, o = {}) {
  const a = o.alpha ?? 1; const m = clamp(o.mand ?? 0), tg = clamp(o.tongue ?? 0); const T = (px, py) => [x + px * s, y + py * s];
  const R = { mand: T(-120 + 40 * m, 150 - 10 * m), tongue: T(-60 + 50 * tg, 90 + 6 * tg), airway: T(30, 140), palate: T(-60, 40), nose: T(-170, 10) };
  if (a <= 0.01) return R;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s);
  const ow = 5 / s; const sk = '#f2c2a0', skS = '#d89a78', skL = '#ffe4d2';
  const chin = [-150 + 50 * m, 160 - 14 * m];
  const outline = smooth([[20, -250], [150, -220], [222, -120], [232, 0], [206, 110], [150, 190], [120, 330], [-70, 340], [-80, 250], [-90 + 30 * m, 200 - 10 * m], chin, [-160 + 30 * m, 118], [-162 + 16 * m, 98], [-168, 72], [-162, 52], [-196, 28], [-168, -20], [-162, -66], [-150, -150], [-90, -222]]);
  paint(g, outline, sk, skS, skL, [-196, -250, 428, 590], OUT, ow);
  g.save(); g.clip(outline);
  // creierul + craniul (sus)
  paint(g, smooth([[-130, -120], [-60, -210], [80, -210], [180, -120], [190, -20], [120, -40], [0, -40], [-120, -50]]), '#f3d3d8', '#dba7b2', '#fff0f2', [-130, -210, 320, 190], '#c48a96', 3 / s);
  // cavitatea nazală
  paint(g, smooth([[-172, 8], [-120, -24], [-20, -26], [40, -6], [46, 22], [-40, 26], [-150, 30]]), '#3a2228', null, null, [-172, -26, 218, 56], OUT, 3 / s);
  // palatul dur (os)
  tube(g, [[-150, 40], [-80, 38], [-10, 40]], 12, L.bone, { ow: 3 / s });
  // nazofaringele → orofaringele → laringofaringele (calea aeriană), traheea în față, esofagul în spate
  const air = [[40, 8], [70, 40], [70, 120], [56, 200], [40, 340]];
  tube(g, air, 46, '#3a2228', { ow: 3 / s });
  tube(g, [[90, 200], [100, 340]], 26, '#c97d76', { ow: 3 / s });
  // cavitatea bucală + limba (împinsă înapoi și în sus când mandibula e mică)
  paint(g, smooth([[-150 + 30 * m, 70], [-60, 54], [30, 60], [40, 150], [-60 + 20 * m, 150 - 6 * m], [-140 + 40 * m, 120]]), '#3a2228', null, null, [-150, 54, 190, 100], OUT, 3 / s);
  const tx = 30 * tg + 22 * m, ty = -6 * tg;
  const tongue = smooth([[-130 + 44 * m + tx * 0.4, 96 + ty], [-80 + tx, 62 + ty], [-10 + tx, 58 + ty], [44 + tx * 0.9, 84 + ty * 0.4], [50 + tx * 0.6, 140], [-20 + tx * 0.6, 150], [-110 + 40 * m, 130]]);
  paint(g, tongue, '#ef8a96', '#c95f6e', '#ffc4cc', [-130, 58, 190, 92], OUT, 4 / s);
  // mandibula (secțiune prin simfiză) + hioidul
  paint(g, smooth([[-148 + 50 * m, 132 - 10 * m], [-110 + 40 * m, 150 - 12 * m], [-80 + 30 * m, 196 - 12 * m], [-118 + 44 * m, 196 - 12 * m], [-158 + 50 * m, 162 - 12 * m]]), L.bone, L.boneS, '#ffffff', [-158, 130, 80, 66], OUT, 4 / s);
  ell(g, -20 + 10 * m, 206, 16, 8, L.bone, { ow: 3 / s });
  g.restore();
  if (o.ghost) { g.save(); g.setLineDash([9, 8]); g.strokeStyle = 'rgba(255,240,228,.8)'; g.lineWidth = 3.5 / s; const gh = curve([[-90, 200], [-150, 160], [-160, 118], [-162, 98]], 8); g.beginPath(); g.moveTo(gh[0][0], gh[0][1]); gh.forEach((p) => g.lineTo(p[0], p[1])); g.stroke(); g.restore(); }
  g.restore();
  R.air = air.map(([px, py]) => T(px, py)); R.noseIn = T(-196, 24);
  return R;
}

/* =================================================== CRANIUL ÎN PROFIL (fața spre stânga), schematic
   Neurocraniul (os, crem) + viscerocraniul: maxila, zigomaticul (cu arcada), oasele nazale, mandibula (ram + corp), orbita,
   meatul acustic extern. o.face = culoarea oaselor feței (ex. creasta neurală mov sau ARC[1]); o.hypo (0..1) = maxila, zigomaticul și
   mandibula mici (sindroamele primului arc). Coordonate locale: s = 1 → ~300 lățime. */
export function skullLat(g, x, y, s, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return; const h = clamp(o.hypo ?? 0); const fc = o.face || L.bone, fcS = o.faceS || L.boneS;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s); const ow = 4 / s;
  const cr = smooth([[-96, -40], [-80, -120], [10, -158], [110, -120], [150, -30], [132, 40], [70, 52], [-40, 30]]);
  paint(g, cr, L.bone, L.boneS, '#ffffff', [-100, -160, 252, 214], OUT, ow);
  // maxila + nazalele
  const mx = smooth([[-100, -36], [-128 + 20 * h, 0], [-122 + 22 * h, 44 - 10 * h], [-60, 56 - 12 * h], [-14, 40], [-20, -6], [-64, -30]]);
  paint(g, mx, fc, fcS, null, [-128, -36, 120, 92], OUT, ow);
  // zigomaticul + arcada zigomatică
  const zs = 1 - 0.45 * h;
  const zg = new Path2D(); zg.ellipse(-36, 2, 30 * zs, 22 * zs, 0.2, 0, 7); paint(g, zg, fc, fcS, null, [-66, -20, 60, 44], OUT, ow);
  tube(g, [[-10, 6], [40, 10], [70, 8]], 12 * zs + 2, fc, { ow: 3.5 / s });
  // orbita
  const ob = new Path2D(); ob.ellipse(-58, -40, 30, 26, 0, 0, 7); paint(g, ob, '#2a1d30', null, null, [-88, -66, 60, 52], OUT, ow);
  // mandibula: corp + ram + condil; hypo → mai mică, bărbia retrasă
  const k = 1 - 0.38 * h;
  const md = smooth([[-118 + 30 * h, 70 - 6 * h], [-120 + 34 * h, 106 * k + 6], [-70, 118 * k + 6], [20, 110 * k + 6], [60, 96 * k + 6], [74, 50], [86, 16], [70, 14], [52, 56], [10, 76], [-60, 80]]);
  paint(g, md, o.mand || fc, o.mandS || fcS, null, [-120, 14, 206, 112], OUT, ow);
  // meatul acustic extern + dinții
  ell(g, 96, 20, 9, 11, '#2a1d30', { ow: 3 / s });
  g.save(); g.strokeStyle = 'rgba(255,255,255,.75)'; g.lineWidth = 3 / s; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(-104 + 24 * h + i * 14, 62 - 8 * h); g.lineTo(-104 + 24 * h + i * 14, 72 - 8 * h); g.stroke(); } g.restore();
  g.restore();
}
