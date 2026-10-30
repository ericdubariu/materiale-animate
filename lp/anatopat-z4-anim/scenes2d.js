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
  txt(g, 'lama cuțitului: aspect grăsos', x, y + r + 34, 24, '#ffe36e');
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
  txt(g, 'necroză hemoragică', x, y + r + 34, 22, '#ffe36e');
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
    paint(g, blob(x - r * 0.42, y, r * 0.16, r * 0.14, 0, 0, 0.1, 10, 3), '#3a2a20', null, null, bb(x - r * 0.42, y, r * 0.16, r * 0.14), OUT, 3);
    const b2 = blob(x + r * 0.45, y, r * 0.4, r * 0.4, 0, 0, 0.03, 14, 2); paint(g, b2, '#f0d66a', '#d8b444', null, bb(x + r * 0.45, y, r * 0.4, r * 0.4), OUT, 4);
    paint(g, blob(x + r * 0.45, y, r * 0.13, r * 0.12, 0, 0, 0.1, 10, 4), '#3a2a20', null, null, bb(x + r * 0.45, y, r * 0.13, r * 0.12), OUT, 3);
  });
  txt(g, 'colesterolic: centrul negricios', x, y + r + 34, 22, '#ffe36e');
}

function diceStones(g, x, y, r, t) {
  field(g, x, y, r, () => {
    bgFill(g, '#c9b98a', '#a8955e');
    srand(14); for (let k = 0; k < 9; k++) { const px = x + ((k % 3) - 1) * r * 0.55 + rr(-8, 8), py = y + (Math.floor(k / 3) - 1) * r * 0.55 + rr(-8, 8); const p = new Path2D(); p.roundRect(px - 22, py - 22, 44, 44, 9); g.save(); g.translate(px, py); g.rotate(rr(-0.3, 0.3)); g.translate(-px, -py); paint(g, p, '#f6f2e6', '#ddd5c0', '#ffffff', [px - 22, py - 22, 44, 44], OUT, 4); g.restore(); }
  });
  txt(g, 'cu săruri de calciu: ca zarurile', x, y + r + 34, 22, '#ffe36e');
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
  txt(g, 'puroiul acoperă leptomeningele', x, y + r + 34, 22, '#ffe36e');
}

/* =================================================== 26 · BRONHOPNEUMONIA (secțiune de plămân) */
const LUNG = [[170, 110], [420, 70], [700, 110], [860, 260], [900, 520], [850, 760], [640, 870], [330, 880], [140, 760], [90, 520], [110, 270]];
const FOCI = (() => { srand(21); const f = []; for (let i = 0; i < 26; i++) { const y = 150 + 700 * Math.sqrt(rnd()); f.push([rr(150, 850), y, rr(30, 50)]); } f.push([450, 765, 52], [515, 785, 50], [580, 760, 48]); return f; })();
export function drawLungBP(g, t, o = {}) {
  const n = o.n ?? 1; const lung = P(LUNG);
  if (o.lobar) {
    paint(g, lung, '#c98a8f', '#a86d72', '#e6b4b6', [90, 70, 810, 810], OUT, 7);
    stipple(g, lung, [90, 70, 810, 810], 300, ['#b97a80', '#e4aeb2'], 2, 5, 11);
    const low = new Path2D(); low.moveTo(60, 380); low.quadraticCurveTo(520, 480, 940, 700); low.lineTo(940, 0); low.lineTo(60, 0); low.closePath();
    g.save(); g.clip(lung); g.fillStyle = '#c9b6a6'; g.fill(low); g.restore(); g.save(); g.clip(lung); stipple(g, low, [90, 70, 810, 600], 260, ['#b3a090', '#ddd0c2'], 2, 5, 12); g.restore();
    g.save(); g.clip(lung); g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.moveTo(60, 380); g.quadraticCurveTo(520, 480, 940, 700); g.stroke(); g.restore();
    g.save(); g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(lung); g.restore();
    return;
  }
  paint(g, lung, '#dba7ae', '#c48d95', '#f2ccd0', [90, 70, 810, 810], OUT, 7);
  stipple(g, lung, [90, 70, 810, 810], 420, ['#c4909a', '#ecc0c6', '#b27c86', '#f6d8dc'], 2, 6, 11);
  g.save(); g.clip(lung);
  FOCI.slice(0, Math.round(FOCI.length * n)).forEach(([x, y, r], i) => { paint(g, blob(x, y, r, r * 0.88, i, t, 0.12, 12, i), '#9e2a3a', '#7d1d2c', '#c8505f', bb(x, y, r, r), null, 0); dot(g, x, y, 7, '#5a2e3a', 0); g.save(); g.strokeStyle = '#fff8e8'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 9, 0, 7); g.stroke(); g.restore(); });
  g.restore();
  g.save(); g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(lung); g.restore();
}

/* =================================================== COPERTA + HARTA */
const ICONS = [
  ['steatoză hepatică', (g, t) => drawLiver(g, t)], ['pancreatită acută', (g, t) => drawPancreas(g, t)], ['litiază renală', (g, t) => drawKidneyLit(g, t)], ['litiază biliară', (g, t) => drawGB(g, t)],
  ['pericardită fibrinoasă', (g, t) => drawHeartPeri(g, t)], ['abces cerebral', (g, t) => drawBrainAbs(g, t)], ['leptomeningită', (g, t) => drawMening(g, t)], ['bronhopneumonie', (g, t) => drawLungBP(g, t)],
];
const POS8 = [[140, 230], [380, 230], [620, 230], [860, 230], [140, 640], [380, 640], [620, 640], [860, 640]];
function iconGrid(R = 105) {
  const k = POS8.map(() => 0);
  return (g, t, b) => { POS8.forEach(([x, y], i) => { k[i] = lerp(k[i], b.i === i ? 1 : 0, 0.08); field(g, x, y, R + k[i] * 8, () => { g.save(); g.fillStyle = '#21122a'; g.fillRect(x - R, y - R, 2 * R, 2 * R); g.translate(x - R, y - R); g.scale(2 * R / 1000, 2 * R / 934); ICONS[i][1](g, t); g.restore(); }); if (k[i] > 0.05) glowRing(g, x, y, R + 14, R + 14, 0, k[i]); }); };
}
function cover() {
  const draw = iconGrid();
  return { home: HOME, cams: POS8.map(([x, y]) => cam(x, y, 2.1)), anchors: POS8.map(([x, y]) => [x - 78, y - 82]), labels: POS8.map(([x, y], i) => lbl([x, y + 140], ICONS[i][0])), draw(g, t, b) { bgFill(g, '#3a1d47', '#160b1d'); draw(g, t, b); } };
}

/* =================================================== FIȘA OSPE PENTRU PIESE */
function fisaPiesa() {
  const B = [['organ', 1, '#e07bb0'], ['leziune', 1, '#e07bb0'], ['definiție', 1, '#e07bb0'], ['descriere', 6, '#c2558c'], ['cauze', 4, '#9a2f66'], ['complicații', 4, '#7b2152'], ['DD', 1, '#ff9fd0']];
  const RUB = ['dimensiune', 'formă', 'culoare', 'consistență', 'suprafață', 'pe secțiune'];
  const upto = [3, 4, 5, 7, 7];
  return {
    home: HOME, cams: [cam(500, 467, 1), cam(500, 430, 1.05), cam(500, 467, 1), cam(500, 467, 1), cam(500, 467, 1)],
    anchors: [[180, 600], [420, 300], [640, 420], [915, 600], [770, 120]],
    phase: (i) => ['Recunoașterea · 3 p obligatoriu', 'Descrierea · o bulină = 1 p', 'Cauze · complicații', 'Diagnostic diferențial', 'Stația: 7 minute'][i] || '',
    draw(g, t, b) {
      bgFill(g);
      const n = b.i < 0 ? 7 : upto[b.i]; let x = 40;
      B.forEach(([nm, pts, col], k) => {
        const wdt = nm === 'descriere' ? 240 : nm === 'cauze' || nm === 'complicații' ? 132 : 82; const vis = k < n; const grow = vis ? (k >= (b.i > 0 ? upto[b.i - 1] : 0) && b.i >= 0 ? ease(b.bt * 1.4 - (k - (b.i > 0 ? upto[b.i - 1] : 0)) * 0.25) : 1) : 0;
        const hh = 70 * pts * grow + 4; const y = 760 - hh;
        if (nm === 'DD') { if (grow > 0.01) { const cx = x + wdt / 2, r = 34 * Math.min(1, grow + 0.2); g.save(); g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.arc(cx, 720, r, 0, 7); g.fill(); g.stroke(); g.restore(); txt(g, '✓', cx, 734, 38, '#fff'); } }
        else if (grow > 0.01) { const p = new Path2D(); p.roundRect(x, y, wdt, hh, 14); paint(g, p, col, null, null, [x, y, wdt, hh], OUT, 6);
          if (nm === 'descriere') RUB.forEach((r, j) => { if (j < pts * grow - 0.3) { g.save(); g.fillStyle = 'rgba(255,255,255,.9)'; g.beginPath(); g.arc(x + 26, 760 - 35 - j * 70, 11, 0, 7); g.fill(); g.restore(); txt(g, r, x + 46, 760 - 27 - j * 70, 24, '#fff', 'left', 700); } });
          else if (nm === 'cauze' || nm === 'complicații') for (let j = 0; j < pts * grow - 0.3; j++) { g.save(); g.fillStyle = 'rgba(255,255,255,.9)'; g.beginPath(); g.arc(x + wdt / 2, 760 - 35 - j * 70, 13, 0, 7); g.fill(); g.restore(); }
        }
        txt(g, nm, x + wdt / 2, 805, nm.length > 8 ? 21 : 24, vis ? '#fff' : '#6d6178', 'center', 800);
        if (k < 3) txt(g, '1 p', x + wdt / 2, 760 - hh - 14, 22, vis ? '#ffe36e' : '#6d6178');
        x += wdt + 16;
      });
      g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 5; g.beginPath(); g.moveTo(40, 845); g.lineTo(40, 860); g.lineTo(322, 860); g.lineTo(322, 845); g.stroke(); g.restore(); txt(g, 'OBLIGATORIU · 3 p', 181, 900, 24, '#ffe36e');
      const C0 = [870, 210], R = 80; const f = b.i === 4 ? clamp(b.bt / b.bd) : (t * 0.05) % 1;
      g.save(); g.lineWidth = 28; g.strokeStyle = OUT; g.beginPath(); g.arc(C0[0], C0[1], R, 0, 7); g.stroke(); g.lineWidth = 18; g.strokeStyle = '#4a3d58'; g.stroke();
      g.strokeStyle = '#ff9fd0'; g.beginPath(); g.arc(C0[0], C0[1], R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 / 7); g.stroke(); g.strokeStyle = '#c2558c'; g.beginPath(); g.arc(C0[0], C0[1], R, -Math.PI / 2 + Math.PI * 2 / 7, -Math.PI / 2 + Math.PI * 2 * f); g.stroke(); g.restore();
      txt(g, '7 min', C0[0], C0[1] + 12, 34); txt(g, '1 citești · 6 vorbești', C0[0], C0[1] + 130, 22, '#e6dcec', 'center', 700);
      txt(g, 'minim 5 puncte', 500, 90, 40, '#fff');
    },
  };
}

/* =================================================== DESCRIEREA (rubricile descrierii, pe desen) */
function recScene(drawFn, o) {
  return () => ({
    home: o.home || HOME, cams: o.cams, anchors: o.anchors, labels: o.labels || [],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914'); drawFn(g, t, b);
      const r = o.rings && b.i >= 0 && o.rings[b.i]; if (r) glowRing(g, r[0], r[1], r[2], r[3] ?? r[2], r[4] || 0, ease(b.bt * 1.4));
    },
  });
}
const fgRec = recScene((g, t, b) => {
  drawLiver(g, t);
  if (b.i === 3) { g.save(); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(620, 380); g.lineTo(645, 400); g.lineTo(638, 418); g.lineTo(668, 430); g.stroke(); g.restore(); [[690, 372, 14], [712, 398, 10], [700, 425, 8]].forEach(([x, y, r], k) => paint(g, blob(x + 6 * ease(b.bt), y + 4 * ease(b.bt), r, r * 0.8, k, t, 0.2, 8, k), '#f0cb55', '#d9ad3a', '#fff0a6', bb(x, y, r, r), OUT, 3)); txt(g, 'parenchim friabil', 660, 470, 22, '#ffe36e'); }
  if (b.i === 1) edgeProfile(g, 800, 760, 110, 1);
  if (b.i === 5) liverCut(g, 800, 760, 110);
}, {
  cams: [cam(505, 450, 1.0), cam(500, 560, 1.15), cam(400, 420, 1.5), cam(620, 420, 1.6), cam(700, 320, 1.6), cam(640, 640, 1.2)],
  anchors: [[160, 240], [150, 610], [300, 330], [600, 330], [800, 210], [690, 670]],
  labels: [lbl([300, 520], 'lobul drept', { beats: [-1, 0] }), lbl([770, 330], 'lobul stâng', { beats: [-1, 0] }), lbl([500, 730], 'vezica biliară', { beats: [-1] })],
  rings: [[505, 450, 440, 290], [190, 660, 110, 70, 0.5], [360, 420, 150, 120], [660, 400, 70, 50], [720, 300, 140, 60], [800, 760, 125, 125]],
});
const paRec = recScene((g, t, b) => { drawPancreas(g, t); if (b.i === 5) panCut(g, 790, 740, 115); }, {
  cams: [cam(560, 440, 1.0), cam(760, 330, 1.6), cam(520, 400, 1.4), cam(420, 470, 1.6), cam(650, 300, 1.25), cam(700, 620, 1.2)],
  anchors: [[600, 230], [880, 200], [540, 330], [380, 400], [650, 150], [690, 650]],
  labels: [lbl([150, 660], 'duodenul', { beats: [-1, 0] }), lbl([110, 470], 'ampula Vater', { beats: [-1, 0] }), lbl([430, 70], 'calea biliară', { beats: [-1] })],
  rings: [[590, 420, 370, 220], [810, 300, 120, 70], [530, 390, 170, 100], [410, 470, 90, 80], [690, 230, 220, 90], [790, 740, 120, 120]],
});
const lrRec = recScene((g, t) => drawKidneyLit(g, t, { ur: 0.55 }), {
  cams: [cam(520, 467, 1.0), cam(470, 450, 1.35), cam(400, 470, 1.8), cam(400, 470, 1.8), cam(760, 450, 1.3), cam(600, 460, 1.1)],
  anchors: [[560, 40], [600, 200], [310, 330], [450, 600], [880, 300], [770, 760]],
  labels: [lbl([210, 820], 'ureterul, cu calcul', { beats: [-1, 0] }), lbl([500, 880], 'calice dilatate', { beats: [-1, 5] }), lbl([380, 300], 'calcul coraliform', { beats: [-1, 2, 3] })],
  rings: [[560, 450, 320, 410], [470, 450, 230, 300], [380, 465, 90, 120], [380, 465, 90, 120], [840, 470, 50, 220], [640, 460, 170, 330]],
});
const lbRec = recScene((g, t, b) => { drawGB(g, t); if (b.i === 4) stoneCut(g, 800, 760, 115); if (b.i === 5) diceStones(g, 800, 760, 115, t); }, {
  cams: [cam(500, 450, 1.0), cam(650, 440, 1.5), cam(380, 430, 1.5), cam(660, 450, 1.6), cam(700, 600, 1.2), cam(780, 450, 1.4)],
  anchors: [[180, 300], [660, 270], [370, 330], [620, 430], [690, 650], [910, 650]],
  labels: [lbl([80, 300], 'canalul cistic', { beats: [-1, 0] }), lbl([300, 560], 'calculi galbeni (colesterolici)', { beats: [-1, 2] }), lbl([650, 620], 'calculi negri (pigmentari)', { beats: [-1, 1] })],
  rings: [[520, 450, 400, 230], [650, 440, 160, 130], [370, 420, 140, 100], [650, 450, 60, 55], [800, 760, 120, 120], [800, 760, 120, 120]],
});
const cpRec = recScene((g, t, b) => drawHeartPeri(g, t), {
  cams: [cam(520, 470, 1.0), cam(520, 500, 1.05), cam(420, 480, 1.6), cam(645, 600, 2.0), cam(520, 560, 2.3), cam(520, 340, 1.4)],
  anchors: [[230, 230], [860, 560], [380, 400], [720, 660], [470, 610], [560, 210]],
  labels: [lbl([560, 40], 'aorta', { beats: [-1, 0] }), lbl([300, 90], 'vena cavă superioară', { beats: [-1] }), lbl([540, 880], 'vârful', { beats: [-1, 0] }), lbl([760, 720], 'aspect de „limbă de pisică”', { beats: [3] })],
  rings: [[520, 520, 340, 340], [520, 520, 310, 330], [420, 480, 120, 120], [645, 600, 80, 60], [520, 560, 90, 70], [520, 330, 290, 110]],
});
const acRec = recScene((g, t) => drawBrainAbs(g, t), {
  cams: [cam(560, 450, 1.1), cam(690, 470, 1.8), cam(690, 470, 2.1), cam(760, 560, 1.7), cam(720, 520, 1.3), cam(500, 400, 1.6)],
  anchors: [[600, 340], [800, 380], [690, 470], [790, 610], [880, 460], [440, 270]],
  labels: [lbl([800, 760], 'cavitate cu puroi + membrană piogenă', { beats: [-1, 0, 1, 2] }), lbl([300, 790], 'linia mediană deviată spre stânga', { beats: [-1, 5] }), lbl([560, 230], 'ventricul comprimat', { beats: [5] })],
  rings: [[690, 470, 115, 105], [690, 470, 100, 92], [690, 470, 75, 70], [780, 590, 80, 60], [740, 520, 170, 150], [480, 380, 100, 130]],
});
const lmRec = recScene((g, t, b) => { drawMening(g, t); if (b.i === 5) meningCut(g, 810, 760, 115); }, {
  cams: [cam(500, 480, 1.0), cam(330, 380, 1.7), cam(650, 560, 1.6), cam(380, 650, 1.6), cam(640, 300, 1.6), cam(700, 650, 1.2)],
  anchors: [[160, 160], [260, 300], [700, 480], [330, 580], [690, 230], [700, 640]],
  labels: [lbl([500, 40], 'fisura interemisferică', { beats: [-1, 0] }), lbl([240, 500], 'puroi în șanțuri', { beats: [-1, 1] })],
  rings: [[500, 480, 380, 440], [330, 390, 140, 70], [650, 560, 130, 80], [380, 650, 120, 70], [640, 300, 130, 70], [810, 760, 120, 120]],
});
// locul aerat cel mai depărtat de focare (pentru punctul „între focare”)
const AER = (() => { let best = [500, 300], bd = 0; for (let x = 200; x <= 800; x += 20) for (let y = 160; y <= 760; y += 20) { const d = Math.min(...FOCI.map(([fx, fy, fr]) => Math.hypot(x - fx, y - fy) - fr)); if (d > bd && Math.hypot((x - 500) / 380, (y - 470) / 380) < 0.85) { bd = d; best = [x, y]; } } return [...best, Math.max(18, Math.min(45, bd - 6))]; })();
const bpRec = recScene((g, t) => drawLungBP(g, t), {
  cams: [cam(500, 470, 1.0), cam(FOCI[3][0], FOCI[3][1], 2.4), cam(450, 450, 1.3), cam(AER[0], AER[1], 2.2), cam(515, 770, 2.0), cam(500, 690, 1.15)],
  anchors: [[130, 160], [FOCI[3][0], FOCI[3][1] - 70], [300, 330], [AER[0], AER[1] - AER[2] - 30], [600, 830], [880, 700]],
  labels: [lbl([500, 40], 'secțiune de plămân', { beats: [-1] }), lbl([515, 870], 'focare confluente', { beats: [-1, 4] }), lbl([AER[0], AER[1] + AER[2] + 34], 'parenchim aerat', { beats: [3] })],
  rings: [[500, 475, 420, 415], [FOCI[3][0], FOCI[3][1], FOCI[3][2] + 18, FOCI[3][2] + 18], [450, 450, 300, 250], [AER[0], AER[1], AER[2], AER[2]], [515, 772, 130, 60], [500, 700, 400, 170]],
});

// 20: pancreasul normal (acini + insulă Langerhans), durerea în bară, laboratorul, epidemiologia (static)
const paClin = recScene((g, t) => {
  field(g, 270, 400, 230, () => {
    bgFill(g, '#f7dbe7', '#efc6d8');
    const AC = [[150, 250], [260, 220], [370, 260], [130, 370], [410, 380], [140, 490], [250, 560], [380, 520], [300, 300]];
    AC.forEach(([x, y], i) => { paint(g, blob(x, y, 46, 42, i, t, 0.03, 10, i), '#d8649c', '#c24f87', '#f2a3c6', bb(x, y, 46, 42), OUT, 3);
      g.save(); g.strokeStyle = 'rgba(42,21,52,.35)'; g.lineWidth = 2; for (let k = 0; k < 7; k++) { const a = k / 7 * 6.28 + i; g.beginPath(); g.moveTo(x + Math.cos(a) * 7, y + Math.sin(a) * 7); g.lineTo(x + Math.cos(a) * 40, y + Math.sin(a) * 37); g.stroke(); } g.restore();
      for (let k = 0; k < 7; k++) { const a = k / 7 * 6.28 + i + 0.45; dot(g, x + Math.cos(a) * 30, y + Math.sin(a) * 27, 5, '#3b2a8c', 0); }
      dot(g, x, y, 5, '#ffffff', 1.5); });
    const isl = blob(265, 420, 72, 64, 0.2, t, 0.03, 14, 31); paint(g, isl, '#f8e6ee', '#efd2df', '#ffffff', bb(265, 420, 72, 64), OUT, 4);
    srand(33); for (let k = 0; k < 16; k++) dot(g, 265 + rr(-52, 52), 420 + rr(-44, 44), 5, '#7a5ab8', 0);
  });
  txt(g, 'acini (exocrin) · insulă Langerhans (endocrin)', 270, 680, 22, '#e6dcec');
  g.save(); g.translate(560, 70); g.scale(0.42, 0.42); drawPancreas(g, t); g.restore();
  arrow(g, 760, 290, 570, 290, '#ffe36e', 7); arrow(g, 760, 290, 950, 290, '#ffe36e', 7); txt(g, 'durere în bară', 760, 340, 26, '#ffe36e');
  const tube = new Path2D(); tube.roundRect(590, 470, 70, 250, 30); paint(g, tube, '#f4eaf6', null, null, [590, 470, 70, 250], OUT, 6);
  const liq = new Path2D(); liq.roundRect(598, 560, 54, 152, 24); paint(g, liq, '#f2d36a', '#d9b444', null, [598, 560, 54, 152], null, 0);
  txt(g, 'amilază ↑', 700, 540, 30, '#fff', 'left'); txt(g, 'lipază ↑', 700, 600, 30, '#fff', 'left'); txt(g, 'Ca²⁺ ↓', 700, 660, 30, '#9fe3ff', 'left');
  txt(g, '10–20 / 100.000', 270, 790, 40, '#fff'); txt(g, 'BISAP · Ranson · Glasgow-Imrie', 270, 845, 24, '#e6dcec');
}, {
  cams: [HOME, HOME, HOME, HOME],
  anchors: [[90, 210], [600, 120], [560, 470], [70, 790]],
  rings: [[270, 400, 240, 240], [760, 250, 230, 130], [690, 600, 170, 160], [270, 815, 240, 70]],
});

/* =================================================== „DE CE ARATĂ AȘA” (animate) */
// 19: hepatocitele se umplu cu trigliceride → organul crește, se îngălbenește, marginile se rotunjesc
function fgWhy() {
  const st = (b) => (b.i < 0 ? 0 : b.i === 0 ? 0.65 * u01(b) : b.i === 1 ? 0.65 + 0.15 * u01(b) : b.i === 2 ? 0.8 + 0.2 * u01(b) : 1);
  return {
    home: HOME, cams: [cam(500, 467, 1), cam(620, 560, 1.05), cam(500, 467, 1), cam(320, 440, 1.5)],
    anchors: [[560, 230], [790, 560], [880, 320], [110, 250]],
    labels: [lbl([300, 760], 'hepatocitele: vacuole de grăsime', { beats: [-1, 0] }), lbl([730, 470], 'ficatul crește și se îngălbenește', { beats: [0, 2] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914'); const p = st(b);
      field(g, 290, 440, 250, () => {
        bgFill(g, '#f7dbe7', '#efc6d8'); const s = lerp(1, 1.22, p);
        g.save(); g.translate(290, 440); g.scale(s, s); g.translate(-290, -440);
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const x = 140 + c * 100 + (r % 2) * 50, y = 290 + r * 100; const cell = blob(x, y, 46, 44, 0, t, 0.03, 10, r * 4 + c); paint(g, cell, mix('f2a3c6', 'fde8f0', p), '#df7dab', null, bb(x, y, 46, 44), OUT, 3.5);
          const vr = 36 * p; if (vr > 2) { g.save(); g.fillStyle = '#ffffff'; g.strokeStyle = 'rgba(42,21,52,.35)'; g.lineWidth = 2; g.beginPath(); g.arc(x - 4 * p, y + 4 * p, vr, 0, 7); g.fill(); g.stroke(); g.restore(); }
          const nx = x + 26 * p, ny = y - 22 * p; paint(g, blob(nx, ny, 13, lerp(13, 7, p), -0.7, t, 0.05, 10, c), '#2c2490', '#1b1468', '#6b63c9', bb(nx, ny, 13, 13), OUT, 2.5); }
        g.restore();
      });
      g.save(); g.translate(560, 120); g.scale(0.42, 0.42); drawLiver(g, t, { fat: p }); g.restore();
      edgeProfile(g, 790, 700, 120, clamp((p - 0.5) / 0.35));
      if (b.i === 3) { glowRing(g, 290, 440, 262, 262, 0, ease(b.bt)); txt(g, '= lama 14', 290, 760, 30, '#ffe36e'); }
      txt(g, p < 0.1 ? 'ficat normal' : 'ficat gras', 770, 110, 28, '#fff');
    },
  };
}
// 20: calculul în ampulă → tripsina activă ÎN pancreas → lipaza (săpunuri) → elastaza (hemoragie)
function paWhy() {
  const ART = [[600, 120], [610, 300], [600, 470], [590, 640]];
  return {
    home: HOME, cams: [cam(330, 330, 1.5), cam(570, 420, 1.0), cam(600, 380, 1.15), cam(560, 420, 1.15)],
    anchors: [[400, 140], [700, 250], [880, 140], [700, 560]],
    labels: [lbl([150, 560], 'calcul în ampula Vater', { beats: [0] }), lbl([600, 610], 'tripsina se activează ÎN pancreas', { beats: [1] }), lbl([620, 110], 'acizi grași + Ca²⁺ = săpunuri', { beats: [2] }), lbl([760, 600], 'necroză parenchimatoasă hemoragică', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914'); const u = u01(b);
      const s = { stone: b.i === 0 ? u : b.i > 0 ? 1 : 0, act: b.i < 1 ? 0 : b.i === 1 ? u : 1, soap: b.i < 2 ? 0 : b.i === 2 ? u : 1, hem: b.i < 3 ? 0 : b.i === 3 ? u : 0 };
      if (b.i === 3) s.hem = u; if (b.i < 0) Object.assign(s, { stone: 0, act: 0, soap: 0, hem: 0 });
      if (b.i >= 3) { tube(g, ART, 30, '#c0303c', '#e25a66'); }
      drawPancreas(g, t, { ...s, act: s.act >= 1 && b.i > 1 ? 1 : s.act });
      if (b.i === 3) { g.save(); g.setLineDash([14, 12]); g.strokeStyle = '#ffe36e'; g.lineWidth = 5; g.lineDashOffset = -t * 30; g.beginPath(); g.arc(605, 380, 60 + 40 * u, 0, 7); g.stroke(); g.restore(); }
      if (b.i === 2) { srand(5); for (let k = 0; k < 27; k++) { const [fx, fy] = FAT[k % FAT.length]; const x = lerp(fx + rr(-200, 200), fx + rr(-20, 20), ease(u)), y = lerp(40, fy + rr(-15, 15), ease(u)); dot(g, x, y, 7, '#9fe3ff', 2); } txt(g, '● = Ca²⁺', 160, 120, 24, '#9fe3ff'); txt(g, 'Ca²⁺ în sânge ↓ (hipocalcemie)', 500, 880, 26, '#9fe3ff'); }
      if (b.i === 0) txt(g, 'sau alcool (cel mai frecvent)', 560, 880, 24, '#ffe36e');
    },
  };
}
// 21: precipitare → coraliform → calcul în ureter → hidronefroză
function lrWhy() {
  return {
    home: HOME, cams: [cam(620, 330, 1.2), cam(470, 460, 1.25), cam(330, 690, 1.5), cam(560, 467, 1.0)],
    anchors: [[840, 330], [610, 160], [380, 760], [880, 470]],
    labels: [lbl([840, 360], 'concentrație ↑ (hiperCa), pH, infecții', { beats: [0] }), lbl([560, 880], 'coraliform: preia forma pielo-caliceală', { beats: [1] }), lbl([440, 860], 'obstrucție: colică, hematurie', { beats: [2] }), lbl([560, 905], 'presiune ↑ → calice dilatate, parenchim subțiat', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914'); const u = u01(b);
      const o = { dil: b.i === 3 ? u : 0, stone: b.i < 1 ? 0 : b.i === 1 ? u : 1, ur: b.i === 2 ? 0.05 + 0.45 * ease(u) : b.i > 2 ? 0.5 : null };
      drawKidneyLit(g, t, o);
      if (b.i === 0) field(g, 840, 190, 130, () => { bgFill(g, '#f3e6c8', '#e6d4ae'); srand(4); for (let k = 0; k < 40; k++) { const a = rr(0, 6.28), d0 = rr(70, 130); const d = lerp(d0, 20, ease(u * 1.2 - k / 80)); dot(g, 840 + Math.cos(a) * d, 190 + Math.sin(a) * d, 5, k % 2 ? '#7fb3ff' : '#ff9a6a', 1.5); } for (let i = Math.ceil(4 * u); i > 0; i--) { g.save(); g.strokeStyle = i % 2 ? '#d8b05a' : '#9c7428'; g.lineWidth = 7; g.beginPath(); g.arc(840, 190, 8 * i, 0, 7); g.stroke(); g.restore(); } dot(g, 840, 190, 8, '#6b4a2a', 2); });
      if (b.i === 3) { for (const [x, y] of CALY.slice(1, 6)) { const a = Math.atan2(y - PELV[1], x - PELV[0]); arrow(g, PELV[0] + Math.cos(a) * 90, PELV[1] + Math.sin(a) * 90, PELV[0] + Math.cos(a) * (130 + 40 * u), PELV[1] + Math.sin(a) * (130 + 40 * u), '#ffe36e', 6); } }
      if (b.i === 2) { const p = pulse(t, 6); g.save(); g.globalAlpha = 0.5 + 0.5 * p; txt(g, '!', 230, 700, 60, '#ff6b6b'); g.restore(); }
    },
  };
}
// 22: bila litogenă → calculi fațetați → perete fibros → calcul inclavat în cistic
function lbWhy() {
  return {
    home: HOME, cams: [cam(500, 420, 1.0), cam(560, 450, 1.1), cam(760, 450, 1.3), cam(260, 430, 1.4)],
    anchors: [[500, 100], [660, 300], [900, 330], [150, 350]],
    labels: [lbl([330, 205], 'colesterolul depășește solubilizarea (săruri biliare + lecitine)', { beats: [0] }), lbl([560, 720], 'pigmentari: mulți, mici, fațetați', { beats: [1] }), lbl([760, 720], 'iritația cronică a mucoasei', { beats: [2] }), lbl([200, 600], 'calcul migrat în cistic: stază, empiem', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914'); const u = u01(b);
      const o = { stones: b.i < 1 ? 0 : b.i === 1 ? u : 1, wall: b.i < 2 ? 0 : b.i === 2 ? u : 1, inc: b.i === 3 ? u : 0 };
      drawGB(g, t, o);
      if (b.i === 0) {
        srand(8); for (let k = 0; k < 60; k++) { const x = rr(260, 820), y = rr(320, 590); const ch = k < 20 + 30 * u; if (ch) { g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 4; g.beginPath(); g.moveTo(x - 9, y - 4); g.lineTo(x + 9, y + 4); g.stroke(); g.restore(); } else dot(g, x, y, 6, '#7fb3ff', 2); }
        const tilt = lerp(0, 0.28, u); g.save(); g.translate(500, 130); g.rotate(tilt); g.strokeStyle = '#fff'; g.lineWidth = 8; g.beginPath(); g.moveTo(-170, 0); g.lineTo(170, 0); g.stroke(); dot(g, -170, 20, 26, '#7fb3ff'); dot(g, 170, 20, 34, '#ffe36e'); g.restore(); dot(g, 500, 145, 12, '#fff');
        txt(g, 'săruri + lecitină', 300, 70, 22, '#9fe3ff'); txt(g, 'colesterol', 700, 70, 22, '#ffe36e');
      }
    },
  };
}
// 23: fibrina între foițe, trasă la fiecare bătaie → vilozități → organizare
function cpWhy() {
  return {
    home: HOME, cams: [cam(500, 467, 1.0), cam(500, 420, 1.15), cam(560, 467, 1.0), cam(500, 467, 1.0)],
    anchors: [[150, 640], [500, 330], [880, 300], [150, 330]],
    labels: [lbl([500, 150], 'pericardul parietal', { beats: [-1, 0, 1] }), lbl([500, 860], 'epicard + miocard', { beats: [-1, 0, 3] }), lbl([820, 470], 'frecătură pericardică', { beats: [2] }), lbl([500, 470], 'aderențe fibroase → pericardită constrictivă', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914'); const u = u01(b);
      const fib = b.i < 0 ? 0 : b.i === 0 ? u : 1, beat = b.i === 1 || b.i === 2, org = b.i === 3 ? u : 0;
      const gap = beat ? 70 + 110 * (REDUCED ? 0.5 : 0.5 + 0.5 * Math.sin(t * 2.6)) : lerp(120, 70, org);
      const yT = 210, yB = yT + 50 + gap;
      // pericardul parietal (sus) și epicardul + miocardul (jos)
      const top = new Path2D(); top.roundRect(40, yT, 920, 50, 18); paint(g, top, '#e8d2c4', null, null, [40, yT, 920, 50], OUT, 6);
      const myo = new Path2D(); myo.roundRect(40, yB, 920, 760 - yB + 90, 18); paint(g, myo, '#b8574c', '#97423a', null, [40, yB, 920, 400], OUT, 6);
      const epi = new Path2D(); epi.roundRect(40, yB, 920, 36, 14); paint(g, epi, '#f2d36a', null, null, [40, yB, 920, 36], OUT, 5);
      for (let i = 0; i < 6; i++) dot(g, 110 + i * 160, yB + 70, 16, '#e23a4f', 3);
      if (b.i === 0) { srand(2); for (let k = 0; k < 24; k++) { const i = k % 6; const x = 110 + i * 160 + rr(-30, 30); const y = lerp(yB + 60, yB - 10 - rr(0, gap * 0.5), clamp(u * 1.5 - k / 40)); dot(g, x, y, 5, '#ffe36e', 1.5); } }
      // fibrina: pe ambele foițe + firicele între ele
      if (fib > 0.02) {
        srand(9); g.save(); g.lineCap = 'round';
        for (let k = 0; k < 70; k++) { const x = rr(60, 940); const pulled = beat || org > 0; const yt = yT + 50, yb = yB;
          if (pulled && k % 2 === 0) { const wob = REDUCED ? 0 : Math.sin(t * 3 + k) * 6; g.strokeStyle = OUT; g.lineWidth = 8; g.beginPath(); g.moveTo(x, yt); g.quadraticCurveTo(x + wob + 10, (yt + yb) / 2, x + 4, yb); g.stroke(); g.strokeStyle = mix('ead9a6', 'ffffff', org); g.lineWidth = 4 + 4 * org; g.stroke(); }
          else { const L = rr(10, 26) * fib; g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.moveTo(x, yb); g.lineTo(x + rr(-6, 6), yb - L); g.moveTo(x, yt); g.lineTo(x + rr(-6, 6), yt + L); g.stroke(); g.strokeStyle = '#ead9a6'; g.lineWidth = 3.5; g.stroke(); } }
        g.restore();
      }
      if (b.i === 2) { for (let i = 0; i < 3; i++) { g.save(); g.strokeStyle = `rgba(255,227,110,${1 - ((t * 0.8 + i / 3) % 1)})`; g.lineWidth = 5; g.beginPath(); g.arc(880, 360, 30 + ((t * 0.8 + i / 3) % 1) * 70, -0.8, 0.8); g.stroke(); g.restore(); } }
      if (b.i === 3) { arrow(g, 500, 60, 500, yT - 10, '#ffe36e', 7); arrow(g, 120, 900, 120, yB + 120, '#ffe36e', 7); arrow(g, 880, 900, 880, yB + 120, '#ffe36e', 7); }
    },
  };
}
// 24: cerebrită → lichefiere → capsulă → efect de masă
function acWhy() {
  return {
    home: HOME, cams: [cam(700, 480, 1.4), cam(690, 470, 1.8), cam(690, 470, 1.8), cam(560, 430, 1.05)],
    anchors: [[820, 330], [690, 380], [790, 400], [430, 260]],
    labels: [lbl([690, 620], 'infecție de vecinătate (otită)', { beats: [0] }), lbl([690, 610], 'necroză de colicvație → puroi', { beats: [1] }), lbl([690, 610], 'membrana piogenă (fibroasă)', { beats: [2] }), lbl([400, 770], 'HTIC → hernierea tonsilelor cerebeloase', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914'); const u = u01(b);
      const o = b.i < 0 ? { cer: 0, liq: 0, cap: 0, mass: 0 } : b.i === 0 ? { cer: u, liq: 0, cap: 0, mass: 0.3 * u } : b.i === 1 ? { cer: 1, liq: u, cap: 0, mass: 0.3 } : b.i === 2 ? { cer: 1, liq: 1, cap: u, mass: 0.3 } : { cer: 1, liq: 1, cap: 1, mass: 0.3 + 0.7 * u };
      drawBrainAbs(g, t, o);
      if (b.i === 0) { arrow(g, 975, 650, lerp(975, 790, u), lerp(650, 540, u), '#ffe36e', 7); txt(g, 'otită', 940, 700, 22, '#ffe36e'); }
      if (b.i === 3) { arrow(g, 590, 470, 560, 470, '#ffe36e', 6); txt(g, 'risc: hernierea tonsilelor cerebeloase', 520, 830, 24, '#ffe36e'); }
    },
  };
}
// 25: bacterii în LCR → neutrofile din vase → puroi în șanțuri → edem
function lmWhy() {
  const surf = (x, amp) => { const u = ((x % 220) + 220) % 220; const d = Math.min(u, 220 - u); return 300 + amp * 170 * Math.exp(-(d * d) / (2 * 30 * 30)); };
  const VES = [[110, 240], [330, 240], [550, 240], [770, 240], [220, 330], [440, 330], [660, 330], [880, 330]];
  return {
    home: HOME, cams: [cam(500, 300, 1.4), cam(440, 300, 1.6), cam(500, 380, 1.3), cam(500, 467, 1.0)],
    anchors: [[160, 210], [550, 190], [440, 460], [880, 600]],
    labels: [lbl([500, 60], 'os', { beats: [-1] }), lbl([500, 130], 'dura', { beats: [-1] }), lbl([300, 560], 'cortex', { beats: [-1] }), lbl([780, 860], 'girusuri aplatizate', { beats: [3] }), lbl([500, 110], 'bacterii în LCR', { beats: [0] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914'); const u = u01(b);
      const amp = b.i === 3 ? lerp(1, 0.45, u) : 1, pus = b.i < 2 ? 0 : b.i === 2 ? u : 1;
      const bone = new Path2D(); bone.rect(-20, 30, 1040, 80); paint(g, bone, '#efe2c8', null, null, [0, 30, 1000, 80], OUT, 5);
      const dura = new Path2D(); dura.rect(-20, 112, 1040, 40); paint(g, dura, '#d9c7b7', null, null, [0, 112, 1000, 40], OUT, 4);
      g.save(); g.fillStyle = '#bfe3f2'; g.fillRect(-20, 158, 1040, 500); g.restore();
      g.save(); g.strokeStyle = '#fff'; g.lineWidth = 4; g.beginPath(); g.moveTo(-20, 160); g.lineTo(1020, 160); g.stroke(); g.restore();
      const cx = new Path2D(); cx.moveTo(-20, surf(-20, amp)); for (let x = -20; x <= 1020; x += 8) cx.lineTo(x, surf(x, amp)); cx.lineTo(1020, 940); cx.lineTo(-20, 940); cx.closePath();
      if (pus > 0.02) { g.save(); g.globalAlpha = 0.9 * pus; g.fillStyle = '#c7cf5e'; g.fillRect(-20, 162, 1040, 520); g.restore(); }
      paint(g, cx, '#c9988e', null, null, [0, 300, 1000, 640], OUT, 5);
      g.save(); g.clip(cx); g.fillStyle = '#f1e6d6'; g.fillRect(-20, 640, 1040, 400); g.restore();
      const cong = b.i >= 1 ? 1.3 : 1;
      VES.forEach(([x, y]) => dot(g, x, y + (y > 300 ? (amp - 1) * 60 : 0), 16 * cong, '#c0303c', 3));
      if (b.i === 0 || b.i === 1) { srand(3); for (let k = 0; k < 16; k++) { const x = ((rr(0, 1000) + (REDUCED ? 0 : t * 40)) % 1040) - 20; diplo(g, x, rr(185, 280), rr(0, 3)); } }
      if (b.i === 1) { VES.forEach(([x, y], i) => { for (let k = 0; k < 3; k++) { const a = i + k * 2.1; const d = 22 + 50 * clamp(u * 1.3 - k * 0.2); neutro(g, x + Math.cos(a) * d, y + Math.sin(a) * d * 0.6, 0.9); } }); }
      if (b.i >= 2) { srand(6); for (let k = 0; k < 40; k++) { const x = rr(0, 1000); const y = rr(175, surf(x, amp) - 14); neutro(g, x, y, 0.75); } }
      if (b.i === 3) { arrow(g, 190, 470, 190, 620, '#ffe36e', 7); txt(g, 'edem → HIC', 200, 680, 24, '#ffe36e'); txt(g, 'piocefalie, meningoencefalită', 700, 700, 24, '#ffe36e'); }
    },
  };
}
// 26: germenii coboară pe bronhii → focare lobulare bazale → bronșiolita purulentă → alveolele din jur
const TREE = (() => { const segs = [], leaves = []; const grow = (x, y, a, len, d, path) => { const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len; const p = [...path, [x2, y2]]; segs.push([x, y, x2, y2, d]); if (d >= 4) { leaves.push(p); return; } grow(x2, y2, a - 0.42, len * 0.74, d + 1, p); grow(x2, y2, a + 0.42, len * 0.74, d + 1, p); };
  grow(500, 180, Math.PI / 2 + 0.75, 170, 1, [[500, 40], [500, 180]]); grow(500, 180, Math.PI / 2 - 0.75, 170, 1, [[500, 40], [500, 180]]); return { segs, leaves }; })();
function bpWhy() {
  const L2 = [[470, 90], [300, 110], [140, 300], [110, 650], [250, 860], [470, 820]];
  const R2 = L2.map(([x, y]) => [1000 - x, y]);
  return {
    home: HOME, cams: [cam(500, 400, 1.05), cam(500, 560, 1.05), cam(780, 680, 1.6), cam(780, 680, 1.6)],
    anchors: [[560, 120], [500, 700], [700, 560], [900, 760]],
    labels: [lbl([500, 905], 'focare bazale, bilaterale', { beats: [1] }), lbl([780, 880], 'inflamația bronhiolei', { beats: [2] }), lbl([780, 880], 'extensia în alveolele adiacente', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914'); const u = u01(b);
      for (const pts of [L2, R2]) { const p = P(pts); paint(g, p, '#a8707c', '#8a5562', '#d4a0aa', [100, 80, 800, 800], OUT, 6); }
      g.save(); g.lineCap = 'round'; for (const [x1, y1, x2, y2, d] of [[500, 40, 500, 180, 0], ...TREE.segs]) { g.strokeStyle = OUT; g.lineWidth = 26 - d * 4.5 + 8; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); g.strokeStyle = '#f2e3d8'; g.lineWidth = 26 - d * 4.5; g.stroke(); } g.restore();
      if (b.i === 0) TREE.leaves.forEach((lf, i) => { const [x, y] = along(lf, clamp(u * 1.4 - (i % 5) * 0.08)); dot(g, x, y, 7, '#6fd36a', 2); });
      if (b.i >= 1) TREE.leaves.forEach((lf, i) => { const [x, y] = lf[lf.length - 1]; const basal = y > 520; const s = b.i === 1 ? clamp(u * 1.5 - (basal ? 0 : 0.6)) : 1; if (!basal && i % 3) return; if (s > 0) paint(g, blob(x, y, 34 * s, 30 * s, i, t, 0.12, 10, i), '#9e2a3a', '#7d1d2c', null, bb(x, y, 34, 30), OUT, 3); });
      if (b.i >= 2) field(g, 780, 680, 170, () => {
        bgFill(g, '#f7dbe7', '#efc6d8');
        for (let k = 0; k < 10; k++) { const a = k / 10 * 6.28, x = 780 + Math.cos(a) * 125, y = 680 + Math.sin(a) * 125; const fill = b.i === 3 ? clamp(u * 1.4 - k * 0.05) : 0; paint(g, blob(x, y, 38, 34, a, t, 0.04, 10, k), mix('ffffff', 'f1dfb0', fill), null, null, bb(x, y, 38, 34), '#df7dab', 4); if (fill > 0.3) { srand(k); for (let j = 0; j < 5; j++) neutro(g, x + rr(-18, 18), y + rr(-15, 15), 0.6); } }
        paint(g, blob(780, 680, 70, 66, 0, t, 0.04, 14, 3), '#f2a3c6', '#df7dab', null, bb(780, 680, 70, 66), OUT, 4);
        paint(g, blob(780, 680, 46, 42, 0, t, 0.06, 14, 4), '#ffffff', null, null, bb(780, 680, 46, 42), OUT, 3);
        const nn = b.i === 2 ? Math.round(14 * u) : 14; srand(2); for (let j = 0; j < nn; j++) neutro(g, 780 + rr(-30, 30), 680 + rr(-26, 26), 0.75);
      });
    },
  };
}

/* =================================================== SLIDE-URI SUPLIMENTARE (statice) */
// 21: calculii renali, de aproape
function stoneShape(g, kind, x, y, s, t) {
  if (kind === 'cor') { g.save(); g.lineCap = 'round'; for (const a of [-2.2, -1.2, -0.2, 0.8]) { g.strokeStyle = OUT; g.lineWidth = 46 * s; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * 110 * s, y + Math.sin(a) * 110 * s); g.stroke(); g.strokeStyle = '#e9e1d2'; g.lineWidth = 34 * s; g.stroke(); } g.restore(); const p = blob(x, y, 60 * s, 70 * s, 0, t, 0.1, 12, 1); paint(g, p, '#e9e1d2', '#cfc4b0', '#ffffff', bb(x, y, 60 * s, 70 * s), OUT, 5); stipple(g, p, bb(x, y, 60 * s, 70 * s), 40, ['#bdb19a'], 2, 5, 4); }
  if (kind === 'oxa') { const pts = []; for (let i = 0; i < 28; i++) { const a = i / 28 * 6.28; const r = (i % 2 ? 78 : 96) * s; pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r * 0.85]); } paint(g, polyPath(pts), '#8a5a2a', '#6a4018', '#c08a50', [x - 96 * s, y - 80 * s, 192 * s, 160 * s], OUT, 5); }
  if (kind === 'mic') { srand(8); for (let k = 0; k < 14; k++) { const px = x + rr(-80, 80) * s, py = y + rr(-60, 60) * s; paint(g, blob(px, py, rr(10, 18) * s, rr(9, 14) * s, k, t, 0.15, 9, k), '#c9973a', '#a8782a', '#efc77a', bb(px, py, 18 * s, 14 * s), OUT, 3); } }
  if (kind === 'ura') paint(g, blob(x, y, 80 * s, 56 * s, 0.2, t, 0.02, 14, 2), '#e0a050', '#c27e34', '#ffe0a8', bb(x, y, 80 * s, 56 * s), OUT, 5);
  if (kind === 'cis') paint(g, blob(x, y, 70 * s, 60 * s, 0, t, 0.05, 14, 3), '#d7d27a', '#b9b45a', '#f6f3c0', bb(x, y, 70 * s, 60 * s), OUT, 5);
  if (kind === 'mix') { for (const [dx, dy] of [[-50, -30], [40, -30], [-5, 45]]) facet(g, x + dx * s, y + dy * s, 48 * s, 'y', 60 + dx, t); }
  if (kind === 'col') { paint(g, blob(x, y, 95 * s, 80 * s, 0, t, 0.02, 14, 4), '#f0d66a', '#d8b444', '#fff6c0', bb(x, y, 95 * s, 80 * s), OUT, 5); paint(g, blob(x, y, 30 * s, 26 * s, 0, t, 0.08, 10, 5), '#3a2a20', null, null, bb(x, y, 30 * s, 26 * s), OUT, 3); }
  if (kind === 'neg') { srand(5); for (let k = 0; k < 12; k++) facet(g, x + rr(-80, 80) * s, y + rr(-55, 55) * s, rr(14, 22) * s, 'b', 40 + k, t); }
  if (kind === 'zar') { srand(15); for (const [dx, dy] of [[-55, -45], [5, -50], [60, -35], [-45, 15], [15, 10], [65, 25], [-20, 65], [40, 70]]) { const px = x + dx * s, py = y + dy * s, p = new Path2D(); p.roundRect(px - 24 * s, py - 24 * s, 48 * s, 48 * s, 9 * s); g.save(); g.translate(px, py); g.rotate(rr(-0.35, 0.35)); g.translate(-px, -py); paint(g, p, '#f6f2e6', '#ddd5c0', '#ffffff', [px - 24 * s, py - 24 * s, 48 * s, 48 * s], OUT, 4); g.restore(); } }
  if (kind === 'bru') paint(g, blob(x, y, 70 * s, 50 * s, 0.3, t, 0.12, 14, 6), '#8a5a32', '#6a4020', '#b07a4c', bb(x, y, 70 * s, 50 * s), OUT, 5);
}
function stoneBoard(items, extra) {
  return () => ({
    home: HOME, cams: items.map((it) => cam(it[1], it[2], 1.5)), anchors: items.map((it) => [it[1] - 110, it[2] - 120]),
    labels: items.map((it) => lbl([it[1], it[2] + 150], it[3])),
    draw(g, t, b) { bgFill(g); items.forEach(([k, x, y], i) => { stoneShape(g, k, x, y, 1, t); if (b.i === i) glowRing(g, x, y, 150, 130, 0, ease(b.bt * 1.4)); }); if (extra) extra(g, t, b); },
  });
}
const lrCalc = stoneBoard([['cor', 250, 260, 'coraliform: forma pielo-caliceală'], ['oxa', 750, 260, 'oxalat de calciu · 80%'], ['mic', 250, 660, 'mai mulți calculi'], ['ura', 750, 660, 'acid uric sau cistină · 6–10%']]);
const lbCalc = stoneBoard([['col', 250, 260, 'colesterolici: galbeni, friabili'], ['neg', 750, 260, 'pigmentari: multipli, mici'], ['mix', 250, 660, 'fațetați'], ['zar', 750, 660, 'albicioși, ca zarurile']]);
// 24: peretele abcesului la microscop (desen, HE)
function acMicro() {
  const C = [500, 470];
  return {
    home: HOME, cams: [cam(500, 470, 1.6), cam(640, 360, 1.6), cam(800, 230, 1.5)],
    anchors: [[500, 420], [700, 300], [830, 140]],
    labels: [lbl([500, 560], 'exsudat granulocitar + detritus', { beats: [-1, 0] }), lbl([730, 520], 'membrana fibroasă', { beats: [-1, 1] }), lbl([840, 860], 'țesut cerebral adiacent', { beats: [-1, 2] })],
    draw(g, t, b) {
      bgFill(g, '#f7dbe7', '#efc6d8');
      // zona externă: glioză + edem
      srand(4); for (let k = 0; k < 40; k++) { const a = rr(0, 6.28), d = rr(300, 520); const x = C[0] + Math.cos(a) * d, y = C[1] + Math.sin(a) * d; g.save(); g.strokeStyle = '#b05a8a'; g.lineWidth = 3; for (let j = 0; j < 6; j++) { const aa = j / 6 * 6.28 + k; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(aa) * 22, y + Math.sin(aa) * 22); g.stroke(); } g.restore(); dot(g, x, y, 8, '#4a3aa0', 2); }
      for (let k = 0; k < 30; k++) { const a = rr(0, 6.28), d = rr(300, 520); g.save(); g.strokeStyle = 'rgba(42,21,52,.25)'; g.lineWidth = 2; g.beginPath(); g.arc(C[0] + Math.cos(a) * d, C[1] + Math.sin(a) * d, rr(6, 14), 0, 7); g.stroke(); g.restore(); }
      // capsula: țesut de granulație + fibroză
      const ring = new Path2D(); ring.arc(C[0], C[1], 290, 0, 7); ring.arc(C[0], C[1], 180, 0, 7, true); g.save(); g.fillStyle = '#ec9cc0'; g.fill(ring, 'evenodd'); g.restore();
      g.save(); g.clip(ring, 'evenodd'); g.strokeStyle = '#f8c8dc'; g.lineWidth = 5; for (let r = 195; r < 290; r += 18) { g.beginPath(); g.arc(C[0], C[1], r, 0, 7); g.stroke(); } srand(7); for (let k = 0; k < 18; k++) { const a = rr(0, 6.28), d = rr(200, 280); dot(g, C[0] + Math.cos(a) * d, C[1] + Math.sin(a) * d, 12, '#e23a4f', 2.5); } g.restore();
      // centrul necrotic: neutrofile + detritus
      const core = new Path2D(); core.arc(C[0], C[1], 178, 0, 7); g.save(); g.fillStyle = '#f9e1ea'; g.fill(core); g.clip(core); srand(9); for (let k = 0; k < 50; k++) neutro(g, C[0] + rr(-160, 160), C[1] + rr(-160, 160), 0.8); for (let k = 0; k < 40; k++) dot(g, C[0] + rr(-160, 160), C[1] + rr(-160, 160), 3, '#6b4aa8', 0); g.restore();
      g.save(); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(core); g.beginPath(); g.arc(C[0], C[1], 290, 0, 7); g.stroke(); g.restore();
      if (b.i >= 0) { const R = [[178, 178], [290, 290], [440, 440]][b.i]; glowRing(g, C[0], C[1], R[0], R[1], 0, ease(b.bt * 1.4)); }
    },
  };
}
// 26: bronhopneumonie vs. pneumonie lobară (desene alăturate)
function bpLobar() {
  return {
    home: HOME, cams: [cam(260, 470, 1.6), cam(260, 470, 1.4), cam(740, 470, 1.6), cam(740, 470, 1.4)],
    anchors: [[150, 300], [370, 640], [640, 300], [860, 640]],
    labels: [lbl([260, 760], 'bronhopneumonie: focare'), lbl([740, 760], 'pneumonie lobară: un lob')],
    draw(g, t, b) {
      bgFill(g);
      field(g, 260, 470, 225, () => { g.save(); g.fillStyle = '#21122a'; g.fillRect(30, 240, 460, 460); g.translate(35, 245); g.scale(0.45, 0.48); drawLungBP(g, t); g.restore(); });
      field(g, 740, 470, 225, () => { g.save(); g.fillStyle = '#21122a'; g.fillRect(510, 240, 460, 460); g.translate(515, 245); g.scale(0.45, 0.48); drawLungBP(g, t, { lobar: true }); g.restore(); });
      const e = b.i >= 0 ? ease(b.bt * 1.5) : 0; if (b.i === 0 || b.i === 1) glowRing(g, 260, 470, 235, 235, 0, e); if (b.i >= 2) glowRing(g, 740, 470, 235, 235, 0, e);
      txt(g, 'vs.', 500, 480, 40, '#ffe36e');
    },
  };
}

/* =================================================== DD: două desene alăturate */
const DDF = {
  fg: (g, t) => drawLiver(g, t), pa: (g, t) => drawPancreas(g, t), lr: (g, t) => drawKidneyLit(g, t, { ur: 0.55 }), lb: (g, t) => drawGB(g, t),
  cp: (g, t) => drawHeartPeri(g, t), ac: (g, t) => drawBrainAbs(g, t), lm: (g, t) => drawMening(g, t), bp: (g, t) => drawLungBP(g, t), lobar: (g, t) => drawLungBP(g, t, { lobar: true }),
};
/* poza reală a partenerului de DD, decupată în cerc (când nu există desen în deck) */
const _DDIMG = {};
function photoDisc(g, x, y, r, n) {
  let im = _DDIMG[n]; if (!im) { im = new Image(); im.src = `img/${n}.jpg`; _DDIMG[n] = im; }
  g.save(); g.beginPath(); g.arc(x, y, r, 0, 7); g.clip(); g.fillStyle = '#21122a'; g.fillRect(x - r, y - r, 2 * r, 2 * r);
  if (im.complete && im.naturalWidth) { const s = Math.max(2 * r / im.naturalWidth, 2 * r / im.naturalHeight); g.drawImage(im, x - im.naturalWidth * s / 2, y - im.naturalHeight * s / 2, im.naturalWidth * s, im.naturalHeight * s); }
  g.restore(); g.save(); g.lineWidth = 10; g.strokeStyle = OUT; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.lineWidth = 4; g.strokeStyle = 'rgba(255,255,255,.35)'; g.stroke(); g.restore();
}
function ddPair({ spec }) {
  const o = spec.sceneOpts;
  return {
    home: HOME, cams: [cam(500, 470, 1.0), cam(260, 470, 1.6), cam(740, 470, 1.6), cam(500, 470, 1.0)],
    anchors: [[60, 260], [260, 230], [740, 230], [940, 260]],
    labels: [lbl([260, 760], o.l), lbl([740, 760], o.r)],
    draw(g, t, b) {
      bgFill(g);
      field(g, 260, 470, 225, () => { g.save(); g.fillStyle = '#21122a'; g.fillRect(30, 240, 460, 460); g.translate(35, 245); g.scale(0.45, 0.48); DDF[o.a](g, t); g.restore(); });
      if (o.bImg) photoDisc(g, 740, 470, 225, o.bImg);
      else field(g, 740, 470, 225, () => { g.save(); g.fillStyle = '#21122a'; g.fillRect(510, 240, 460, 460); g.translate(515, 245); g.scale(0.45, 0.48); DDF[o.b](g, t); g.restore(); });
      const e = b.i >= 0 ? ease(b.bt * 1.5) : 0;
      if (b.i === 0 || b.i === 3) { glowRing(g, 260, 470, 235, 235, 0, e); glowRing(g, 740, 470, 235, 235, 0, e); }
      if (b.i === 1) glowRing(g, 260, 470, 235, 235, 0, e); if (b.i === 2) glowRing(g, 740, 470, 235, 235, 0, e);
      txt(g, 'vs.', 500, 480, 40, '#ffe36e');
    },
  };
}

/* =================================================== SCRIPT (fișa OSPE) */
const MINI = { fg: DDF.fg, pa: DDF.pa, lr: DDF.lr, lb: DDF.lb, cp: DDF.cp, ac: DDF.ac, lm: DDF.lm, bp: DDF.bp };
function script({ spec }) {
  const o = spec.sceneOpts || {}; const n = spec.script.length; const tot = spec.durs.reduce((a, c) => a + c, 0);
  const WS = 600, HS = 897;
  return {
    W: WS, H: HS, home: cam(300, 448, 1), cams: null, anchors: [],
    phase: (i) => (i >= 0 ? `${spec.script[i].tm} · ${spec.script[i].at}` : ''),
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a', WS, HS);
      field(g, 300, 300, 230, () => { g.save(); g.fillStyle = '#21122a'; g.fillRect(70, 70, 460, 460); g.translate(70, 70); g.scale(0.46, 0.49); MINI[o.f](g, t); g.restore(); });
      const C0 = [300, 700], R = 130; let acc = 0;
      spec.durs.forEach((d, i) => { const a0 = acc / tot, a1 = (acc + d) / tot; acc += d; const on = i === b.i, done = i < b.i; g.save(); g.strokeStyle = OUT; g.lineWidth = 36; g.beginPath(); g.arc(C0[0], C0[1], R, -Math.PI / 2 + a0 * Math.PI * 2, -Math.PI / 2 + a1 * Math.PI * 2 - 0.03); g.stroke(); g.strokeStyle = on ? '#ff9fd0' : done ? '#c2558c' : '#4a3d58'; g.lineWidth = 26; if (on) { g.shadowColor = '#ff9fd0'; g.shadowBlur = 20; } g.stroke(); g.restore(); });
      let f = 0; if (b.i >= 0) { let a = 0; for (let k = 0; k < b.i; k++) a += spec.durs[k]; f = (a + spec.durs[b.i] * clamp(b.bt / b.bd)) / tot; }
      const ang = -Math.PI / 2 + f * Math.PI * 2; g.save(); g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(C0[0] + Math.cos(ang) * R, C0[1] + Math.sin(ang) * R, 16, 0, 7); g.fill(); g.stroke(); g.restore();
      txt(g, b.i >= 0 ? `${b.i + 1}/${n}` : '6 min', C0[0], C0[1] + 14, 40);
    },
  };
}

/* =================================================== CAPCANE + RECAPITULARE */
function capcane() {
  const sk = { // schițe mici pentru capcanele de la lame (1, 2, 4, 5)
    0: (g, t, x, y) => { for (const [dx, para] of [[-55, false], [55, true]]) { for (let k = 0; k < 4; k++) { const p = new Path2D(); p.roundRect(x + dx - 45, y - 70 + k * 30, 90, 26, 6); paint(g, p, k === 0 ? '#f6b8d2' : k === 1 ? (para ? '#f2a3c6' : '#9b6ab8') : '#e48bb3', null, null, [0, 0, 1, 1], OUT, 3); if (k === 0 && para) for (let j = 0; j < 3; j++) dot(g, x + dx - 25 + j * 25, y - 57, 4, '#2c2490', 0); } } },
    1: (g, t, x, y) => { paint(g, blob(x - 52, y, 46, 44, 0, t, 0.03, 10, 1), '#f2a3c6', null, null, bb(x - 52, y, 46, 44), OUT, 3); dot(g, x - 56, y + 4, 30, '#fff', 2); dot(g, x - 26, y - 30, 8, '#2c2490', 2); paint(g, blob(x + 52, y, 46, 44, 0, t, 0.03, 10, 2), '#fbeef3', null, null, bb(x + 52, y, 46, 44), OUT, 3); srand(3); for (let j = 0; j < 9; j++) dot(g, x + 52 + rr(-30, 30), y + rr(-28, 28), 4, '#f2a3c6', 0); dot(g, x + 52, y, 9, '#2c2490', 2); },
    3: (g, t, x, y) => { srand(2); for (let j = 0; j < 9; j++) neutro(g, x - 55 + rr(-30, 30), y + rr(-30, 30), 0.6); for (let j = 0; j < 8; j++) { const a = j / 8 * 6.28; paint(g, blob(x + 55 + Math.cos(a) * 32, y + Math.sin(a) * 32, 12, 8, a, t, 0.05, 8, j), '#f2a3c6', null, null, bb(x, y, 12, 8), OUT, 2); } dot(g, x + 55, y, 14, '#f7c6d9', 2); },
    4: (g, t, x, y) => { dot(g, x - 55, y, 42, '#f2a3c6', 3); for (let j = 0; j < 7; j++) { const a = Math.PI * 0.15 + j / 6 * Math.PI * 0.7; dot(g, x - 55 + Math.cos(a) * 30, y + Math.sin(a) * 30, 6, '#2c2490', 0); } dot(g, x + 55, y, 42, '#f2a3c6', 3); srand(5); for (let j = 0; j < 8; j++) dot(g, x + 55 + rr(-26, 26), y + rr(-26, 26), 6, '#2c2490', 0); },
  };
  const T = [['steatoză ≠ steatonecroză', [DDF.fg, DDF.pa]], ['pancreatita: laboratorul', [DDF.pa]], ['calculi: organul', [DDF.lr, DDF.lb]], ['calculul care migrează', [DDF.lr]], ['fibrinos ≠ purulent', [DDF.cp, DDF.lm]], ['abces ≠ leptomeningită', [DDF.ac, DDF.lm]], ['meningita: unde e puroiul', [DDF.lm]], ['bronhopneumonie ≠ lobară', [DDF.bp, DDF.lobar]]];
  const pos = T.map((_, i) => [130 + (i % 4) * 247, 260 + Math.floor(i / 4) * 400]);
  return {
    home: HOME, cams: pos.map(([x, y]) => cam(x, y, 1.9)), anchors: pos.map(([x, y]) => [x - 100, y - 150]),
    labels: pos.map(([x, y], i) => lbl([x, y + 165], T[i][0])),
    draw(g, t, b) {
      bgFill(g);
      pos.forEach(([x, y], i) => {
        const on = b.i === i; const p = new Path2D(); p.roundRect(x - 115, y - 140, 230, 280, 20); paint(g, p, on ? '#4a2a58' : '#2e1838', null, null, [x - 115, y - 140, 230, 280], on ? '#ffe36e' : OUT, on ? 7 : 5);
        g.save(); g.clip(p);
        const d = T[i][1];
        if (d && d.length === 2) { for (const [f, dx] of [[d[0], -55], [d[1], 55]]) { g.save(); g.translate(x + dx - 55, y - 55); g.scale(0.11, 0.118); f(g, t); g.restore(); } txt(g, 'vs.', x, y + 6, 22, '#ffe36e'); }
        else if (d) { g.save(); g.translate(x - 100, y - 100); g.scale(0.2, 0.214); d[0](g, t); g.restore(); }
        else sk[i](g, t, x, y);
        g.restore();
        if (on) glowRing(g, x, y, 135, 160, 0, ease(b.bt * 1.5));
        txt(g, String(i + 1), x - 90, y - 100, 30, '#ffe36e');
      });
    },
  };
}
function recap() {
  const draw = iconGrid(100);
  return { home: HOME, cams: POS8.map(([x, y]) => cam(x, y, 2.0)), anchors: [], labels: POS8.map(([x, y], i) => lbl([x, y + 135], ICONS[i][0])), draw(g, t, b) { bgFill(g, '#3a1d47', '#160b1d'); draw(g, t, b); } };
}
function fallback() { return { home: HOME, anchors: [], draw(g) { bgFill(g); } }; }

export const SCENES = {
  atlas, cover, fisaPiesa, fgRec, paRec, lrRec, lbRec, cpRec, acRec, lmRec, bpRec,
  fgWhy, paWhy, paClin, lrWhy, lbWhy, cpWhy, acWhy, lmWhy, bpWhy, lrCalc, lbCalc, acMicro, bpLobar, ddPair, script, capcane, recap, fallback,
};
