// Scenele cartoon 2D pentru piesele macroscopice 19–26 (Anatomie patologică, LP 3–4: distrofii, inflamații).
import { OUT, clamp, lerp, ease, srand, rnd, rr, smooth, blob, paint, bb, glowRing, arrow, REDUCED } from './kit2d.js';
import { atlas } from './atlas.js';
// câmp rotund (cu Path2D: desenele din interior nu mai strică conturul)
function field(g, x, y, r, drawInside, ring = '#ffffff') { const c = new Path2D(); c.arc(x, y, r, 0, 7); g.save(); g.save(); g.clip(c); drawInside(); g.restore(); g.lineWidth = 10; g.strokeStyle = OUT; g.stroke(c); g.lineWidth = 4; g.strokeStyle = ring; g.globalAlpha = 0.35; g.stroke(c); g.restore(); }

const W = 1000, H = 934;
const cam = (x, y, z) => ({ x, y, z });
const HOME = cam(500, 467, 1);
const lbl = (at, html, o = {}) => ({ at, html, ...o });
const bgFill = (g, a = '#2e1838', b = '#140a1a', w = W, h = H) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(-3000, -3000, w + 6000, h + 6000); };
const u01 = (b, k = 0.8) => (b.i >= 0 ? clamp(b.bt / (b.bd * k)) : 1);
const pulse = (t, f = 2) => (REDUCED ? 0.5 : 0.5 + 0.5 * Math.sin(t * f));
function txt(g, s, x, y, size = 26, col = '#fff', align = 'center', wt = 800) {
  g.save(); g.font = `${wt} ${size}px "Plus Jakarta Sans", Inter, sans-serif`; g.textAlign = align; g.lineJoin = 'round';
  g.strokeStyle = OUT; g.lineWidth = Math.max(4, size * 0.22); g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); g.restore();
}
function stipple(g, path, box, n, cols, r0, r1, seed) {
  g.save(); g.clip(path); srand(seed); const [x, y, w, h] = box;
  for (let k = 0; k < n; k++) { g.fillStyle = cols[k % cols.length]; g.beginPath(); g.ellipse(x + rnd() * w, y + rnd() * h, rr(r0, r1), rr(r0, r1) * 0.8, rnd() * 3, 0, 7); g.fill(); }
  g.restore();
}
function sheen(g, path, x, y, rx, ry, a = 0.35) { g.save(); g.clip(path); g.globalAlpha = a; g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x, y, rx, ry, -0.4, 0, 7); g.fill(); g.restore(); }
const P = (pts) => smooth(pts);
function polyPath(pts) { const p = new Path2D(); p.moveTo(...pts[0]); for (const q of pts.slice(1)) p.lineTo(...q); p.closePath(); return p; }
const mix = (a, c, u) => { const A = a.match(/\w\w/g).map((x) => parseInt(x, 16)), C = c.match(/\w\w/g).map((x) => parseInt(x, 16)); return '#' + A.map((v, i) => Math.round(lerp(v, C[i], clamp(u))).toString(16).padStart(2, '0')).join(''); };
let _CX = null; const inP = (p, x, y) => { if (!_CX) _CX = document.createElement('canvas').getContext('2d'); return _CX.isPointInPath(p, x, y); };
function tube(g, pts, w, col, inner) { const p = smooth(pts, false); g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = w + 12; g.stroke(p); g.strokeStyle = col; g.lineWidth = w; g.stroke(p); if (inner) { g.strokeStyle = inner; g.lineWidth = w * 0.5; g.stroke(p); } g.restore(); }
function dot(g, x, y, r, col, ow = 3) { g.save(); g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = ow; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); if (ow) g.stroke(); g.restore(); }
// punct pe o polilinie (u = 0…1)
function along(pts, u) { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; } let s = clamp(u) * tot; for (let i = 0; i < L.length; i++) { if (s <= L[i] || i === L.length - 1) { const f = L[i] ? Math.min(1, s / L[i]) : 0; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; } s -= L[i]; } return pts[pts.length - 1]; }
function neutro(g, x, y, s = 1) { dot(g, x, y, 13 * s, '#f6d2e2', 2.5); g.save(); g.fillStyle = '#4b2a8c'; for (const [dx, dy] of [[-5, -3], [4, -5], [3, 5]]) { g.beginPath(); g.arc(x + dx * s, y + dy * s, 4.2 * s, 0, 7); g.fill(); } g.restore(); }
function diplo(g, x, y, a, col = '#6fd36a') { const dx = Math.cos(a) * 7, dy = Math.sin(a) * 7; dot(g, x - dx, y - dy, 7, col, 3); dot(g, x + dx, y + dy, 7, col, 3); }
function bacil(g, x, y, a, col = '#6fd36a') { g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.roundRect(-11, -5, 22, 10, 5); g.fill(); g.stroke(); g.restore(); }

/* =================================================== 19 · FICATUL GRAS (vedere anterioară) */
const LIV = [[95, 330], [210, 215], [390, 175], [600, 185], [800, 225], [925, 300], [900, 365], [760, 425], [600, 505], [470, 605], [330, 700], [215, 720], [125, 640], [85, 500]];
export function drawLiver(g, t, o = {}) {
  const k = o.fat ?? 1, s = lerp(0.84, 1, k);
  g.save(); g.translate(500, 450); g.scale(s, s); g.translate(-500, -450);
  if (!o.noGB) paint(g, blob(470, 648, 44, 30, 0.5, t, 0.04, 10, 2), '#6f9a46', '#557a33', '#a8cc7a', bb(470, 648, 44, 30), OUT, 5);
  const L = P(LIV);
  paint(g, L, mix('9b3b30', 'f0cb55', k), mix('7a2a22', 'd9ad3a', k), mix('c8675a', 'fff0a6', k), [85, 175, 840, 545], OUT, 7);
  stipple(g, L, [85, 175, 840, 545], 170, [mix('86332a', 'e2b444', k), mix('b04c40', 'fbe08a', k)], 3, 7, 3);
  g.save(); g.strokeStyle = 'rgba(42,21,52,.55)'; g.lineWidth = 5; g.beginPath(); g.moveTo(585, 188); g.quadraticCurveTo(560, 330, 562, 515); g.stroke(); g.restore();
  sheen(g, L, 700, 290, 130, 40, 0.15 + 0.3 * k);
  g.restore();
}
// profilul marginii inferioare: normal = pană ascuțită; ficatul gras = rotunjită, boantă
function edgeProfile(g, x, y, r, k) {
  field(g, x, y, r, () => {
    bgFill(g, '#2a1631', '#120914');
    const tip = lerp(x + r * 0.75, x + r * 0.45, k), th = lerp(0.35, 0.62, k) * r;
    const p = new Path2D(); p.moveTo(x - r, y - th); p.lineTo(tip - th * k * 0.6, y - th * (1 - 0.2 * k));
    p.quadraticCurveTo(tip + th * k * 0.5, y, tip - th * k * 0.6, y + th * (1 - 0.2 * k)); p.lineTo(x - r, y + th); p.closePath();
    paint(g, p, mix('9b3b30', 'f0cb55', k), null, mix('c8675a', 'fff0a6', k), [x - r, y - th, 2 * r, 2 * th], OUT, 6);
  });
  txt(g, k > 0.5 ? 'margine boantă' : 'margine ascuțită', x, y + r + 34, 24, '#ffe36e');
}
function liverCut(g, x, y, r) {
  field(g, x, y, r, () => {
    bgFill(g, '#f6d873', '#e8bf45');
    stipple(g, new Path2D(`M${x - r} ${y - r}h${2 * r}v${2 * r}h${-2 * r}z`), [x - r, y - r, 2 * r, 2 * r], 120, ['#f9e391', '#e2b444', '#fff2b8'], 3, 8, 8);
    const kn = polyPath([[x - r * 0.9, y - 10], [x + r * 0.5, y - 40], [x + r * 0.62, y - 16], [x - r * 0.9, y + 18]]); paint(g, kn, '#d8dde6', '#aeb6c4', '#ffffff', [x - r, y - 40, r * 1.6, 60], OUT, 4);
    g.save(); g.globalAlpha = 0.75; g.fillStyle = '#f3cf4f'; g.beginPath(); g.ellipse(x - 10, y + 2, 60, 10, -0.15, 0, 7); g.fill(); g.restore();
  });
  txt(g, 'pe secțiune: unsuros', x, y + r + 34, 24, '#ffe36e');
}

/* =================================================== 20 · PANCREASUL (cu duodenul) */
const PAN = [[255, 385], [330, 335], [450, 335], [600, 300], [760, 262], [880, 252], [925, 300], [875, 352], [720, 392], [560, 432], [430, 482], [385, 560], [300, 585], [245, 505]];
const DUO = [[380, 205], [240, 250], [178, 420], [205, 600], [320, 690], [470, 690]];
const CBP = [[400, 30], [350, 180], [300, 330], [262, 430], [232, 468]];
const AMP = [232, 468];
const FAT = [[520, 250, 46], [650, 212, 44], [790, 200, 42], [420, 560, 44], [560, 505, 46], [700, 462, 46], [840, 418, 40], [320, 650, 36], [905, 205, 34]];
const HEM = [[470, 410, 62], [640, 360, 58], [790, 312, 48], [330, 470, 50]];
export function drawPancreas(g, t, o = {}) {
  const act = o.act ?? 1, soap = o.soap ?? 1, hem = o.hem ?? 1, sw = o.sw ?? Math.max(act, hem) * 0.06;
  tube(g, DUO, 92, '#e7a3a0', '#f1c0bb');
  FAT.forEach(([x, y, r], i) => paint(g, blob(x, y, r, r * 0.8, i, t, 0.08, 12, i), '#f3d67b', '#dcb955', '#fff1b0', bb(x, y, r, r * 0.8), OUT, 4));
  const st = o.stone ?? 0; const dil = 1 + 0.5 * clamp(st * 2 - 1);
  g.save(); g.translate(590, 410); g.scale(1 + sw, 1 + sw); g.translate(-590, -410);
  const pan = P(PAN);
  paint(g, pan, mix('e8c49a', 'c98572', Math.max(act, hem) * 0.8), mix('d1a87c', 'a8604f', Math.max(act, hem) * 0.8), '#fff2dc', [245, 252, 680, 333], OUT, 7);
  if (Math.max(act, hem) < 0.6) stipple(g, pan, [245, 252, 680, 333], 150, ['#f3d9b6', '#d9b088'], 6, 12, 5); // lobulația
  // activarea enzimelor: frontul merge de la cap spre coadă
  if (act > 0 && act < 1) { srand(12); g.save(); g.clip(pan); const fr = lerp(240, 940, act); for (let k = 0; k < 110; k++) { const x = rr(245, 925), y = rr(252, 585); dot(g, x, y, 6, x < fr ? '#ff9a3c' : '#d9cbb8', 2); } g.restore(); }
  HEM.forEach(([x, y, r], i) => { if (hem > 0.02) { g.save(); g.clip(pan); g.globalAlpha = clamp(hem * 1.3); paint(g, blob(x, y, r * (0.4 + 0.6 * hem), r * 0.75 * (0.4 + 0.6 * hem), i, t, 0.12, 12, i + 3), '#4a0c1a', '#2e0510', '#8a2236', bb(x, y, r, r * 0.75), null, 0); g.restore(); } });
  // canalul Wirsung
  g.save(); g.strokeStyle = 'rgba(42,21,52,.5)'; g.lineWidth = 6 * dil; g.setLineDash([16, 10]); g.beginPath(); g.moveTo(880, 300); g.quadraticCurveTo(560, 370, AMP[0] + 12, AMP[1]); g.stroke(); g.restore();
  // petele alb-cretoase pe pancreas
  if (soap > 0.02) { srand(31); g.save(); g.clip(pan); for (let k = 0; k < Math.round(18 * soap); k++) { const x = rr(300, 900), y = rr(270, 560); paint(g, blob(x, y, rr(8, 15), rr(7, 12), k, t, 0.15, 9, k), '#fffaf0', null, null, bb(x, y, 14, 12), OUT, 2.5); } g.restore(); }
  g.restore();
  if (soap > 0.02) { srand(44); FAT.forEach(([x, y, r], i) => { for (let k = 0; k < Math.round(4 * soap); k++) { const a = rr(0, 6.28), d = rr(0, r * 0.6); paint(g, blob(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.8, rr(7, 12), rr(6, 10), k, t, 0.15, 9, k + i), '#fffaf0', null, null, bb(x, y, 12, 10), OUT, 2.5); } }); }
  tube(g, CBP, 26 * dil, '#7fae4a', '#a8d06e');
  dot(g, AMP[0], AMP[1], 14, '#f6c2a0', 4);
  if (st > 0) { const [x, y] = along(CBP, Math.min(1, st)); paint(g, polyPath([[x - 15, y - 10], [x + 4, y - 17], [x + 17, y - 4], [x + 10, y + 14], [x - 10, y + 15], [x - 18, y + 2]]), '#3a2f28', '#241b16', '#7c6a5c', [x - 18, y - 17, 35, 32], OUT, 3.5); }
}
function panCut(g, x, y, r) {
  field(g, x, y, r, () => {
    bgFill(g, '#b0675a', '#7a3a33');
    srand(6); for (let k = 0; k < 9; k++) { const px = x + rr(-r, r), py = y + rr(-r, r); paint(g, blob(px, py, rr(20, 40), rr(16, 30), k, 0, 0.15, 10, k), k % 3 ? '#4a0c1a' : '#fff6e2', null, null, bb(px, py, 40, 30), null, 0); }
    paint(g, blob(x + 20, y + 10, 52, 40, 0.3, 0, 0.05, 12, 4), '#7a4a2a', '#5a3218', '#a8774e', bb(x + 20, y + 10, 52, 40), OUT, 5);
  });
  txt(g, 'necroză pestriță, pseudochist', x, y + r + 34, 22, '#ffe36e');
}

/* =================================================== 21 · RINICHIUL CU CALCUL ȘI HIDRONEFROZĂ (secțiune, hilul la stânga) */
function beanPts(cx, cy, rx, ry, k = 0.3) { const pts = []; for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; const d = Math.atan2(Math.sin(a - Math.PI), Math.cos(a - Math.PI)); const r = 1 - k * Math.exp(-(d * d) / 0.18); pts.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]); } return pts; }
const KID = beanPts(560, 450, 300, 400, 0.3);
const PELV = [380, 465];
const CALY = [[470, 175], [610, 220], [700, 335], [725, 470], [690, 605], [600, 712], [470, 742]];
const URET = [[330, 560], [305, 680], [290, 800], [282, 930]];
export function drawKidneyLit(g, t, o = {}) {
  const dil = o.dil ?? 1, stone = o.stone ?? 1;
  tube(g, URET, lerp(40, 54, dil), '#e8cdb0', '#f3e1cc');
  if (o.ur != null) { const [x, y] = along(URET, o.ur); paint(g, blob(x, y, 15, 12, 0.4, t, 0.2, 9, 3), '#d6a64a', '#b9852c', '#f4d88c', bb(x, y, 15, 12), OUT, 3.5); }
  const kid = P(KID);
  paint(g, kid, '#b8714c', '#9c5a3a', '#dc9a72', [260, 50, 600, 800], OUT, 7);
  // boselare discretă a suprafeței (rinichi cu suprafață boselată)
  if (dil > 0.5) { g.save(); g.clip(kid); g.strokeStyle = 'rgba(42,21,52,.35)'; g.lineWidth = 4; for (const [x, y] of [[835, 300], [855, 470], [830, 640]]) { g.beginPath(); g.arc(x + 40, y, 60, 2.3, 3.9); g.stroke(); } g.restore(); }
  const cr = lerp(24, 86, dil), pl = [lerp(50, 125, dil), lerp(90, 190, dil)];
  const CY = CALY.map(([x, y]) => [lerp(PELV[0] + (x - PELV[0]) * 0.5, x, dil), lerp(PELV[1] + (y - PELV[1]) * 0.5, y, dil)]);
  // piramidele: papila intră în calice, baza spre corticală; se turtesc pe măsură ce calicele se dilată
  g.save(); g.clip(kid); CY.forEach(([x, y]) => { const a = Math.atan2(y - PELV[1], x - PELV[0]); const L = lerp(150, 25, dil); const c = [x + Math.cos(a) * (cr * 0.6), y + Math.sin(a) * (cr * 0.6)]; const e = [c[0] + Math.cos(a) * L, c[1] + Math.sin(a) * L]; const n = [Math.cos(a + 1.57), Math.sin(a + 1.57)]; const wd = lerp(62, 40, dil); paint(g, polyPath([c, [e[0] + n[0] * wd, e[1] + n[1] * wd], [e[0] - n[0] * wd, e[1] - n[1] * wd]]), '#8e4a3a', null, null, [x - 60, y - 60, 120, 120], 'rgba(42,21,52,.5)', 3); }); g.restore();
  // gâturile calicelor + calicele + bazinetul (cavitățile)
  CY.forEach(([x, y]) => { g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = lerp(30, 100, dil) + 10; g.beginPath(); g.moveTo(PELV[0], PELV[1]); g.lineTo(x, y); g.stroke(); g.strokeStyle = '#f1e2c6'; g.lineWidth = lerp(30, 100, dil); g.stroke(); g.restore(); });
  CY.forEach(([x, y], i) => paint(g, blob(x, y, cr, cr * 0.9, i, t, 0.05, 12, i), '#f1e2c6', '#e2cca6', '#fffaf0', bb(x, y, cr, cr), OUT, 5));
  paint(g, blob(PELV[0], PELV[1], pl[0], pl[1], 0, t, 0.04, 14, 7), '#f1e2c6', '#e2cca6', '#fffaf0', bb(PELV[0], PELV[1], pl[0], pl[1]), OUT, 6);
  // calculul coraliform: mulat pe bazinet, cu „coarne” în calice
  if (stone > 0.02) {
    const s = stone; g.save(); g.lineCap = 'round';
    [1, 2, 3, 4, 5].forEach((i) => { const [x, y] = CY[i]; const e = [lerp(PELV[0], x, 0.25 + 0.75 * s), lerp(PELV[1], y, 0.25 + 0.75 * s)]; g.strokeStyle = OUT; g.lineWidth = 34 * s + 10; g.beginPath(); g.moveTo(PELV[0], PELV[1]); g.lineTo(...e); g.stroke(); g.strokeStyle = '#d8b05a'; g.lineWidth = 34 * s; g.stroke(); });
    g.restore();
    const sp = blob(PELV[0], PELV[1], pl[0] * 0.75 * s + 8, pl[1] * 0.7 * s + 8, 0, t, 0.1, 14, 9);
    paint(g, sp, '#d8b05a', '#b88b34', '#f4dc94', bb(PELV[0], PELV[1], pl[0], pl[1]), OUT, 5);
    stipple(g, sp, bb(PELV[0], PELV[1], pl[0], pl[1]), 60, ['#9c7428', '#f6e3a6'], 2, 5, 13);
  }
}

/* =================================================== 22 · VEZICULA BILIARĂ DESCHISĂ, CU CALCULI */
const GBO = [[150, 420], [240, 340], [400, 285], [600, 250], [790, 270], [905, 390], [880, 560], [720, 650], [480, 640], [290, 570], [170, 500]];
const GBC = [560, 450];
const STONES = [[300, 445, 62, 'y'], [430, 400, 70, 'y'], [560, 360, 44, 'b'], [650, 345, 42, 'b'], [745, 375, 40, 'b'], [600, 445, 44, 'b'], [700, 460, 44, 'b'], [800, 470, 36, 'b'], [520, 520, 40, 'b'], [630, 545, 40, 'b'], [735, 560, 36, 'b'], [430, 520, 36, 'y']];
function facet(g, x, y, r, col, seed, t) { srand(seed); const pts = []; const n = 6; for (let i = 0; i < n; i++) { const a = i / n * 6.28 + rr(-0.25, 0.25); const d = r * rr(0.82, 1.05); pts.push([x + Math.cos(a) * d, y + Math.sin(a) * d]); } const p = polyPath(pts);
  const dark = col === 'b'; paint(g, p, dark ? '#2b2420' : '#e2c24e', dark ? '#1a1412' : '#c9a133', dark ? '#7d6b5c' : '#fff0a0', [x - r, y - r, 2 * r, 2 * r], OUT, 4);
  g.save(); g.strokeStyle = dark ? 'rgba(255,255,255,.18)' : 'rgba(120,90,20,.4)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(x, y); g.lineTo(...pts[1]); g.moveTo(x, y); g.lineTo(...pts[3]); g.moveTo(x, y); g.lineTo(...pts[5]); g.stroke(); g.restore();
  if (dark) { g.save(); g.globalAlpha = 0.7; g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x - r * 0.3, y - r * 0.35, r * 0.22, r * 0.1, -0.5, 0, 7); g.fill(); g.restore(); }
  else { srand(seed + 9); g.save(); g.clip(p); for (let k = 0; k < 18; k++) { g.fillStyle = 'rgba(160,130,40,.55)'; g.beginPath(); g.arc(x + rr(-r, r), y + rr(-r, r), rr(2, 5), 0, 7); g.fill(); } g.restore(); }
}
export function drawGB(g, t, o = {}) {
  const wall = o.wall ?? 1, ns = o.stones ?? 1, inc = o.inc ?? 0, dist = 1 + 0.06 * inc;
  tube(g, [[170, 455], [90, 420], [30, 350]], 34, '#e9cdb6', '#f5e2d2');
  g.save(); g.translate(GBC[0], GBC[1]); g.scale(dist, dist); g.translate(-GBC[0], -GBC[1]);
  const outer = P(GBO);
  paint(g, outer, mix('e4b3a0', 'efe2d0', wall), mix('cf9078', 'dccab2', wall), '#fff6ec', [150, 250, 755, 400], OUT, 7);
  const f = lerp(0.92, 0.82, wall); const inner = P(GBO.map(([x, y]) => [GBC[0] + (x - GBC[0]) * f, GBC[1] + (y - GBC[1]) * f]));
  paint(g, inner, mix('6f9a43', 'a3ad74', wall), mix('5a7f32', '8e9a62', wall), null, [180, 270, 700, 360], OUT, 4);
  if (wall < 0.6) { g.save(); g.clip(inner); g.strokeStyle = 'rgba(40,70,20,.45)'; g.lineWidth = 4; for (let i = 0; i < 14; i++) { g.beginPath(); g.moveTo(200 + i * 50, 280); g.quadraticCurveTo(220 + i * 50, 450, 190 + i * 50, 640); g.stroke(); } g.restore(); }
  if (wall > 0.5) { g.save(); g.strokeStyle = 'rgba(140,110,90,.6)'; g.lineWidth = 3; for (let i = 0; i < 9; i++) { const a = i / 9 * 6.28; g.beginPath(); g.arc(GBC[0] + Math.cos(a) * 330, GBC[1] + Math.sin(a) * 170, 9, 0, 7); g.stroke(); } g.restore(); }
  g.save(); g.clip(inner); STONES.slice(0, Math.round(STONES.length * ns)).forEach(([x, y, r, c], i) => { const gr = clamp(ns * 1.2); facet(g, x, y, r * (0.5 + 0.5 * gr), c, 11 + i, t); }); g.restore();
  g.restore();
  if (inc > 0) { const [x, y] = along([[260, 455], [170, 455], [95, 420]], inc); facet(g, x, y, 22, 'b', 77, t); }
}
function stoneCut(g, x, y, r) {
  field(g, x, y, r, () => {
    bgFill(g, '#5a4a6a', '#2a1f33');
    const a = blob(x - r * 0.42, y, r * 0.48, r * 0.48, 0, 0, 0.03, 14, 1); paint(g, a, '#f0d66a', '#d8b444', null, bb(x - r * 0.42, y, r * 0.48, r * 0.48), OUT, 4);
    g.save(); g.strokeStyle = '#b48a22'; g.lineWidth = 3; for (let i = 0; i < 16; i++) { const an = i / 16 * 6.28; g.beginPath(); g.moveTo(x - r * 0.42, y); g.lineTo(x - r * 0.42 + Math.cos(an) * r * 0.44, y + Math.sin(an) * r * 0.44); g.stroke(); } g.restore();
    const b2 = blob(x + r * 0.45, y, r * 0.45, r * 0.45, 0, 0, 0.03, 14, 2); paint(g, b2, '#8a6a3a', null, null, bb(x + r * 0.45, y, r * 0.45, r * 0.45), OUT, 4);
    for (let i = 4; i > 0; i--) { g.save(); g.strokeStyle = i % 2 ? '#e8c46a' : '#4a3420'; g.lineWidth = 6; g.beginPath(); g.arc(x + r * 0.45, y, r * 0.1 * i, 0, 7); g.stroke(); g.restore(); }
  });
  txt(g, 'radiar · concentric', x, y + r + 34, 22, '#ffe36e');
}

/* =================================================== 23 · CORDUL PĂROS */
const HRT = [[300, 270], [420, 225], [560, 245], [690, 235], [790, 305], [815, 430], [760, 565], [640, 700], [505, 830], [430, 790], [330, 650], [245, 505], [232, 380]];
export function drawHeartPeri(g, t, o = {}) {
  const v = o.villi ?? 1;
  tube(g, [[365, 262], [352, 120]], 52, '#d9b7a8', '#e8cfc2');
  tube(g, [[470, 250], [452, 150], [520, 78], [612, 88], [655, 160]], 72, '#e8c9b0', '#f4ddca');
  tube(g, [[600, 255], [640, 170], [705, 140]], 60, '#d9b0a8', '#e9c8c0');
  const h = P(HRT);
  paint(g, h, mix('b8574c', 'c9a27a', v), mix('97423a', 'ae8660', v), mix('e08a7c', 'eedcb4', v), [232, 225, 583, 605], OUT, 7);
  if (v < 0.5) { // epicard normal: lucios, grăsime în șanțuri, coronare
    g.save(); g.clip(h); g.strokeStyle = '#f2d36a'; g.lineWidth = 26; g.beginPath(); g.moveTo(260, 420); g.quadraticCurveTo(520, 360, 800, 440); g.moveTo(560, 300); g.quadraticCurveTo(520, 560, 470, 800); g.stroke();
    g.strokeStyle = '#a3222f'; g.lineWidth = 7; g.stroke(); g.restore(); sheen(g, h, 420, 380, 110, 50, 0.45);
  } else {
    srand(7); g.save(); g.clip(h); g.lineCap = 'round';
    const N = Math.round(1100 * v);
    for (let i = 0; i < N; i++) { const x = rr(232, 815), y = rr(225, 830); const base = y < 470 ? 1.45 : 1; const L = rr(9, 20) * base; const a = rr(0, 6.28) + (REDUCED ? 0 : Math.sin(t * 2 + i) * 0.18); g.strokeStyle = 'rgba(42,21,52,.55)'; g.lineWidth = 6; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); g.stroke(); g.strokeStyle = i % 3 ? '#ead9a6' : '#cdb07a'; g.lineWidth = 3.5; g.stroke(); }
    g.restore();
    if (o.peel) { const pp = blob(645, 600, 62, 44, 0.4, t, 0.18, 12, 5); paint(g, pp, '#c43b44', '#9c2430', '#ef7a80', bb(645, 600, 62, 44), OUT, 4); }
  }
}

/* =================================================== 24 · CREIERUL PE SECȚIUNE CORONALĂ, CU ABCES */
const BRN = (() => { const p = []; for (let i = 0; i < 90; i++) { const a = i / 90 * 6.2832; const bump = 1 + 0.016 * Math.sin(a * 22) + 0.008 * Math.sin(a * 37); const x = 500 + Math.cos(a) * 410 * bump; let y = 400 + Math.sin(a) * 330 * bump; if (Math.sin(a) > 0) { const d = Math.abs(Math.cos(a)); if (d < 0.3) y -= (0.3 - d) / 0.3 * 120; } p.push([x, y]); } return p; })();
const VLP = [[498, 296], [468, 292], [438, 302], [418, 326], [414, 356], [428, 362], [446, 334], [472, 318], [498, 316]];
const ABS = [690, 470];
export function drawBrainAbs(g, t, o = {}) {
  const cer = o.cer ?? 0, liq = o.liq ?? 1, cap = o.cap ?? 1, mass = o.mass ?? 1, sh = -36 * mass;
  const br = P(BRN);
  paint(g, br, '#b49a8c', '#9a8073', null, [90, 70, 820, 660], OUT, 7);
  const wm = P(BRN.map(([x, y]) => [500 + (x - 500) * 0.86, 405 + (y - 405) * 0.84]));
  paint(g, wm, '#f1e6d6', null, null, [150, 120, 700, 560], null, 0);
  // fisura interemisferică + scizurile laterale (Sylvius)
  g.save(); g.clip(br); g.strokeStyle = OUT; g.lineCap = 'round'; g.lineWidth = 7; g.beginPath(); g.moveTo(500, 60); g.quadraticCurveTo(500 + sh * 0.4, 170, 500 + sh * 0.8, 255); g.stroke();
  g.lineWidth = 6; g.beginPath(); g.moveTo(85, 450); g.quadraticCurveTo(200, 420, 300, 440); g.moveTo(915, 450); g.quadraticCurveTo(800, 420, 700, 440); g.stroke(); g.restore();
  // edemul (halou palid)
  if (mass > 0.02 || cer > 0.02) { const rad = g.createRadialGradient(ABS[0], ABS[1], 60, ABS[0], ABS[1], 230); rad.addColorStop(0, `rgba(255,252,240,${0.85 * Math.max(mass, cer * 0.6)})`); rad.addColorStop(1, 'rgba(255,252,240,0)'); g.save(); g.clip(br); g.fillStyle = rad; g.fillRect(400, 200, 520, 520); g.restore(); }
  // nucleii bazali, corpul calos, ventriculii laterali (în „fluture”) și ventriculul III
  g.save(); g.lineCap = 'round'; const cc = new Path2D(); cc.moveTo(395 + sh, 305); cc.quadraticCurveTo(500 + sh, 245, 605 + sh * 0.8, 305); g.strokeStyle = OUT; g.lineWidth = 30; g.stroke(cc); g.strokeStyle = '#faf3e8'; g.lineWidth = 20; g.stroke(cc); g.restore();
  paint(g, polyPath([[497 + sh, 300], [503 + sh * 0.8, 300], [503 + sh * 0.7, 500], [497 + sh * 0.7, 500]]), '#3b2a35', null, null, [490, 300, 20, 200], OUT, 3);
  paint(g, smooth(VLP.map(([x, y]) => [x + sh, y])), '#3b2a35', null, null, [400, 294, 94, 70], OUT, 4);
  const sq = lerp(1, 0.35, mass); paint(g, smooth(VLP.map(([x, y]) => [1000 - x + sh * 0.8, 300 + (y - 300) * sq])), '#3b2a35', null, null, [506, 294, 94, 70], OUT, 4);
  // cerebrita: zonă roșie, prost delimitată
  if (cer > 0.02) { g.save(); g.globalAlpha = cer * (1 - liq); paint(g, blob(ABS[0], ABS[1], 110, 95, 0, t, 0.14, 14, 5), '#d9707a', null, null, bb(ABS[0], ABS[1], 110, 95), null, 0); srand(3); for (let k = 0; k < 30; k++) dot(g, ABS[0] + rr(-90, 90), ABS[1] + rr(-75, 75), 6, '#7b4fc0', 2); g.restore(); }
  // capsula (mai subțire spre ventricul = medial) + puroiul
  if (cap > 0.02) { g.save(); g.globalAlpha = cap; paint(g, blob(ABS[0], ABS[1], 102, 90, 0, t, 0.03, 16, 6), '#efe9de', '#ddd3c2', '#ffffff', bb(ABS[0], ABS[1], 102, 90), OUT, 5); g.restore(); }
  if (liq > 0.02) { const s = 0.3 + 0.7 * liq; paint(g, blob(ABS[0] - 8 * cap, ABS[1], 82 * s, 74 * s, 0, t, cap > 0.5 ? 0.03 : 0.1, 16, 7), '#c9c255', '#a9a23a', '#ecea9a', bb(ABS[0], ABS[1], 82, 74), cap > 0.5 ? '#8a7f5a' : OUT, 4); }
}

/* =================================================== 25 · LEPTOMENINGITA (convexitatea, de sus) */
const CRB = (() => { const p = []; for (let i = 0; i < 36; i++) { const a = i / 36 * 6.28; p.push([500 + Math.cos(a) * 360, 480 + Math.sin(a) * 420 * (1 + 0.06 * Math.sin(a))]); } return p; })();
const SULCI = (() => { srand(17); const out = []; for (const h of [-1, 1]) for (let i = 0; i < 12; i++) { let x = 500 + h * rr(40, 140), y = 100 + i * 66 + rr(-15, 15), a = h > 0 ? rr(-0.5, 0.5) : Math.PI + rr(-0.5, 0.5); const pts = [[x, y]]; const n = Math.round(rr(5, 9)); for (let k = 0; k < n; k++) { a += rr(-0.6, 0.6); x += Math.cos(a) * 40; y += Math.sin(a) * 40; pts.push([x, y]); } out.push([h, pts]); } return out; })();
export function drawMening(g, t, o = {}) {
  const pus = o.pus ?? 1, flat = o.flat ?? pus;
  const cr = P(CRB);
  paint(g, cr, '#e3b8ab', '#cc9a8c', '#f6d6cc', [140, 60, 720, 840], OUT, 7);
  g.save(); g.clip(cr);
  for (const [h, pts] of SULCI) { g.save(); g.beginPath(); g.rect(h < 0 ? 0 : 506, 0, 494, 934); g.clip(); const p = smooth(pts, false); g.lineCap = 'round';
    g.strokeStyle = `rgba(110,50,60,${lerp(0.75, 0.35, flat)})`; g.lineWidth = lerp(10, 5, flat); g.stroke(p);
    g.strokeStyle = '#b8283a'; g.lineWidth = 4 + 2 * pus; g.save(); g.translate(0, 12); g.stroke(p); g.restore();
    if (pus > 0.02) { g.globalAlpha = 0.85 * pus; g.strokeStyle = '#c7cf5e'; g.lineWidth = 26; g.stroke(p); g.globalAlpha = 0.5 * pus; g.strokeStyle = '#e6e79a'; g.lineWidth = 12; g.stroke(p); }
    g.restore(); }
  if (pus > 0.02) { g.globalAlpha = 0.28 * pus; g.fillStyle = '#e9e6b0'; g.fill(cr); g.globalAlpha = 1; }
  g.restore();
  g.save(); g.strokeStyle = OUT; g.lineWidth = 8; g.beginPath(); g.moveTo(500, 62); g.lineTo(500, 902); g.stroke(); g.restore();
}
function meningCut(g, x, y, r) {
  field(g, x, y, r, () => {
    bgFill(g, '#f1e6d6', '#e8dac6');
    const surf = (xx) => y - 30 + 70 * Math.exp(-((xx - x) ** 2) / 900);
    const cx = new Path2D(); cx.moveTo(x - r, surf(x - r)); for (let xx = x - r; xx <= x + r; xx += 6) cx.lineTo(xx, surf(xx)); cx.lineTo(x + r, y + r); cx.lineTo(x - r, y + r); cx.closePath(); paint(g, cx, '#c4a090', null, null, [x - r, y - 30, 2 * r, r], OUT, 4);
    const ex = new Path2D(); ex.moveTo(x - r, y - r); ex.lineTo(x + r, y - r); for (let xx = x + r; xx >= x - r; xx -= 6) ex.lineTo(xx, surf(xx) - 4); ex.closePath(); g.save(); g.clip(ex); g.fillStyle = '#c7cf5e'; g.fillRect(x - r, y - r, 2 * r, 2 * r); g.restore();
    g.save(); g.fillStyle = '#f1e6d6'; g.fillRect(x - r, y + 40, 2 * r, r); g.restore();
  });
  txt(g, 'puroi la suprafață, cortex intact', x, y + r + 34, 22, '#ffe36e');
}

/* =================================================== 26 · BRONHOPNEUMONIA (secțiune de plămân) */
const LUNG = [[170, 110], [420, 70], [700, 110], [860, 260], [900, 520], [850, 760], [640, 870], [330, 880], [140, 760], [90, 520], [110, 270]];
const FOCI = (() => { srand(21); const f = []; for (let i = 0; i < 26; i++) { const y = 150 + 700 * Math.sqrt(rnd()); f.push([rr(150, 850), y, rr(30, 50)]); } f.push([450, 765, 52], [515, 785, 50], [580, 760, 48]); return f; })();
export function drawLungBP(g, t, o = {}) {
  const n = o.n ?? 1; const lung = P(LUNG);
  if (o.lobar) {
    paint(g, lung, '#c98a8f', '#a86d72', '#e6b4b6', [90, 70, 810, 810], OUT, 7);
    stipple(g, lung, [90, 70, 810, 810], 300, ['#b97a80', '#e4aeb2'], 2, 5, 11);
    const low = new Path2D(); low.moveTo(60, 380); low.quadraticCurveTo(520, 480, 940, 700); low.lineTo(940, 940); low.lineTo(60, 940); low.closePath();
    g.save(); g.clip(lung); g.fillStyle = '#c9b6a6'; g.fill(low); g.restore(); stipple(g, low, [90, 380, 810, 500], 260, ['#b3a090', '#ddd0c2'], 2, 5, 12);
    g.save(); g.clip(lung); g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.moveTo(60, 380); g.quadraticCurveTo(520, 480, 940, 700); g.stroke(); g.restore();
    g.save(); g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(lung); g.restore();
    return;
  }
  paint(g, lung, '#8a4a5a', '#6d3846', '#b07888', [90, 70, 810, 810], OUT, 7);
  stipple(g, lung, [90, 70, 810, 810], 420, ['#5d3040', '#a9707e', '#4a2433', '#c89aa4'], 2, 6, 11);
  g.save(); g.clip(lung);
  FOCI.slice(0, Math.round(FOCI.length * n)).forEach(([x, y, r], i) => { paint(g, blob(x, y, r, r * 0.88, i, t, 0.12, 12, i), '#e4d6ae', '#cdbb8c', '#fbf3d8', bb(x, y, r, r), null, 0); dot(g, x, y, 7, '#5a2e3a', 0); g.save(); g.strokeStyle = '#fff8e8'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 9, 0, 7); g.stroke(); g.restore(); });
  g.restore();
  g.save(); g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(lung); g.restore();
}

/* =================================================== COPERTA + HARTA */
