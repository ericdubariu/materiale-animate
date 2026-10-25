// Scenele cartoon 2D pentru lamele 13–18 de Anatomie patologică (distrofii, inflamații), colorație HE.
import {
  OUT, HE, clamp, lerp, ease, srand, rnd, rr, smooth, blob, spindle, paint, bb, glowRing,
  rbc, capillary, lymphocyte, adipocyte, arrow, REDUCED,
} from './kit2d.js';
import { atlas, mosaic } from './atlas.js';

const W = 1000, H = 934;
const cam = (x, y, z) => ({ x, y, z });
const HOME = cam(500, 467, 1);
const lbl = (at, html, o = {}) => ({ at, html, ...o });
const bgFill = (g, a, b, w = W, h = H) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(-2000, -2000, w + 4000, h + 4000); };
const ring = (g, b, k, x, y, rx, ry = rx, rot = 0, col) => { if (b.i === k) glowRing(g, x, y, rx, ry, rot, ease(b.bt * 1.4), col); };
const txt = (g, s, x, y, size = 28, col = '#fff', al = 'center') => { g.save(); g.font = `800 ${size}px "Plus Jakarta Sans", Inter, sans-serif`; g.textAlign = al; g.lineWidth = 7; g.strokeStyle = OUT; g.lineJoin = 'round'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); g.restore(); };
function field(g, x, y, r, inside) {
  const c = new Path2D(); c.arc(x, y, r, 0, Math.PI * 2);
  g.save(); g.clip(c); inside(); g.restore();
  g.save(); g.lineWidth = 10; g.strokeStyle = OUT; g.stroke(c); g.lineWidth = 4; g.strokeStyle = 'rgba(255,255,255,.35)'; g.stroke(c); g.restore();
}
// miniaturile (copertă, DD, recapitulare) se randează o singură dată într-un canvas ascuns: altfel 6 câmpuri pe cadru ar fi prea grele
const MINI = new Map();
function miniCanvas(F, r) {
  const key = F.name + ':' + Math.round(r); if (MINI.has(key)) return MINI.get(key);
  const k = 2, c = document.createElement('canvas'); c.width = c.height = Math.round(2 * r * k); const g = c.getContext('2d');
  const s = 2 * r / H; g.scale(k, k); g.translate(r - W * s / 2, r - H * s / 2); g.scale(s, s); F(g, 0, {});
  MINI.set(key, c); return c;
}
const mini = (g, x, y, r, F) => field(g, x, y, r, () => { g.drawImage(miniCanvas(F, 230), x - r, y - r, 2 * r, 2 * r); });
function dots(g, n, x, y, rx, ry, col, rad, seed) { srand(seed); g.fillStyle = col; for (let k = 0; k < n; k++) { const a = rnd() * 6.283, d = Math.sqrt(rnd()); g.beginPath(); g.arc(x + Math.cos(a) * rx * d, y + Math.sin(a) * ry * d, rad * rr(0.7, 1.2), 0, 7); g.fill(); } }
const u = (b, d = 3) => (b.i < 0 ? 1 : clamp(b.bt / d));

/* =============================================================== CELULE */
// neutrofil: nucleu polilobat (3–5 lobi legați), citoplasmă palidă; frag = piocit (nucleu picnotic / fragmentat)
function neutrophil(g, x, y, s, t, seed, pyk = false) {
  g.save(); g.fillStyle = 'rgba(246,206,224,.96)'; g.strokeStyle = OUT; g.lineWidth = 2.5 * s; g.beginPath(); g.arc(x, y, 20 * s, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#3b1f8c';
  if (!pyk) { const L = [[-8, -5], [3, -9], [9, 4], [-3, 7]]; L.forEach(([dx, dy]) => { g.beginPath(); g.arc(x + dx * s, y + dy * s, 5.5 * s, 0, 7); g.fill(); }); g.strokeStyle = '#3b1f8c'; g.lineWidth = 2.6 * s; g.beginPath(); g.moveTo(x - 8 * s, y - 5 * s); g.lineTo(x + 3 * s, y - 9 * s); g.lineTo(x + 9 * s, y + 4 * s); g.lineTo(x - 3 * s, y + 7 * s); g.stroke(); }
  else { g.fillStyle = '#1a0f55'; g.beginPath(); g.arc(x + 2 * s, y - 1 * s, 7 * s, 0, 7); g.fill(); }
  g.restore();
}
// macrofag activat = celulă epitelioidă: citoplasmă roz abundentă, limite neclare, nucleu alungit, palid, „în talpă de pantof”
function epithelioid(g, x, y, s, rot, t, seed) {
  paint(g, blob(x, y, 58 * s, 32 * s, rot, t, 0.1, 12, seed), '#f2b8d4', '#e49cbf', null, bb(x, y, 58 * s, 32 * s), 'rgba(42,21,52,.35)', 2.5 * s);
  const pts = []; const n = 18;
  for (let i = 0; i < n; i++) { const a = i / n * 6.283; const c = Math.cos(a), sn = Math.sin(a); const w = 11 * s * (1 - 0.35 * Math.max(0, Math.sin(a * 1)) * (c > 0 ? 1 : 0)); const X = c * 30 * s, Y = sn * w + (c * c) * 3 * s; pts.push([x + X * Math.cos(rot) - Y * Math.sin(rot), y + X * Math.sin(rot) + Y * Math.cos(rot)]); }
  paint(g, smooth(pts), '#b9a6ec', '#a08ade', '#e6dcff', bb(x, y, 30 * s, 11 * s), '#4a3aa8', 2 * s);
  g.save(); g.fillStyle = '#5a49b8'; for (let k = -1; k <= 1; k++) { g.beginPath(); g.arc(x + k * 12 * s * Math.cos(rot), y + k * 12 * s * Math.sin(rot), 1.8 * s, 0, 7); g.fill(); } g.restore();
}
function macrophageP(g, x, y, s, t, seed) { // macrofag (fără incluziuni brune)
  paint(g, blob(x, y, 40 * s, 32 * s, seed, t, 0.13, 12, seed), '#f7c6d9', '#eba2bf', null, bb(x, y, 40 * s, 32 * s), OUT, 2.5 * s);
  g.save(); g.lineCap = 'round'; g.strokeStyle = '#4a3aa8'; g.lineWidth = 9 * s; g.beginPath(); g.arc(x - 6 * s, y, 11 * s, Math.PI * 0.45, Math.PI * 1.6); g.stroke(); g.restore();
}
// celula gigantă Langhans: citoplasmă eozinofilă mare, nucleii în POTCOAVĂ la periferie (centrul liber)
function langhans(g, x, y, s, t, open = 1) {
  paint(g, blob(x, y, 120 * s, 96 * s, 0.2, t, 0.07, 16, 3), '#f39cc4', '#e57fae', '#ffd1e6', bb(x, y, 120 * s, 96 * s), OUT, 5 * Math.max(0.5, s));
  const n = 22; const a0 = Math.PI * 0.95, a1 = Math.PI * 2.05 + 0.35; // arc de ~240° (potcoavă), deschis în dreapta-jos
  for (let k = 0; k < n; k++) { const a = lerp(a0, a1, k / (n - 1)); const rr2 = 82 + (k % 2) * 9; const nx = x + Math.cos(a) * rr2 * s * open, ny = y + Math.sin(a) * rr2 * 0.78 * s * open; paint(g, blob(nx, ny, 10 * s, 7 * s, a, t, 0.04, 8, k), HE.nuc, HE.nucS, HE.nucL, bb(nx, ny, 10 * s, 7 * s), OUT, 1.8 * Math.max(0.5, s)); }
}
// celula gigantă de corp străin: nucleii DEZORDONAȚI, împrăștiați în toată citoplasma
function fbgc(g, path, box, nuclei, t) {
  paint(g, path, '#e889bd', '#d66ea6', '#ffc6e2', box, OUT, 5);
  nuclei.forEach(([nx, ny, a], k) => paint(g, blob(nx, ny, 11, 7.5, a, t, 0.04, 8, k), HE.nuc, HE.nucS, HE.nucL, bb(nx, ny, 11, 7.5), OUT, 2));
}
function fibroSp(g, x, y, s, rot, t, k) { paint(g, spindle(x, y, 70 * s, 12 * s, rot, t, k), '#3b2b9a', '#2a1d78', null, bb(x, y, 35 * s, 6 * s), OUT, 2); }
function bacillus(g, x, y, rot, s = 1) { g.save(); g.translate(x, y); g.rotate(rot); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 9 * s; g.beginPath(); g.moveTo(-12 * s, 0); g.lineTo(12 * s, 0); g.stroke(); g.strokeStyle = '#ff3b5c'; g.lineWidth = 5 * s; g.stroke(); g.restore(); }
function vessel(g, x, y, r, t, k = 0) { g.save(); g.fillStyle = '#f6c0d6'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke(); g.restore(); dots(g, Math.max(3, Math.round(r / 4)), x, y, r * 0.7, r * 0.7, '#d9283f', Math.max(3.5, r * 0.18), k + 7); g.save(); g.fillStyle = HE.nuc; g.beginPath(); g.ellipse(x + r * 0.9, y, 3, 7, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(x - r * 0.9, y, 3, 7, 0, 0, 7); g.fill(); g.restore(); }

/* =============================================================== PIELE (lama 13) */
// o: yG = limita cornos/strat viu, th = grosimea cornosului, yB = vârful papilelor, d = adâncimea crestelor, para, cells
function skinField(g, t, o = {}) {
  const yG = o.yG ?? 420, th = o.th ?? 390, yB = o.yB ?? 600, d = o.d ?? 210, para = !!o.para, P = 200, x0 = o.x0 ?? 100;
  const J = (x) => yB + d * Math.pow(Math.max(0, Math.cos(2 * Math.PI * (x - x0) / P)), 2.2);
  bgFill(g, '#fbe4ee', '#f4cfe0');
  // dermul: papile cu capilare, fibroblaste, limfocite rare
  srand(31); for (let k = 0; k < 70; k++) { const x = rr(-20, W + 20), y = rr(yB - 40, H + 30); if (y < J(x) + 20) continue; fibroSp(g, x, y, 0.8, rr(-0.4, 0.4), t, k); }
  g.save(); g.strokeStyle = '#f2b2cd'; g.lineWidth = 6; srand(32); for (let k = 0; k < 40; k++) { const x = rr(0, W), y = rr(yB, H); if (y < J(x) + 15) continue; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 30, y + 10, x + 70, y - 4); g.stroke(); } g.restore();
  for (let x = x0 + P / 2 - 2 * P; x < W + P; x += P) { const cy = Math.min(H - 60, yB + 70); vessel(g, x, cy, 20, t, Math.round(x)); }
  if (o.lymph) { srand(34); for (let k = 0; k < 4; k++) lymphocyte(g, rr(60, 940), rr(yB + 120, H - 40), 0.45, t); }
  // epidermul viu (de la yG la joncțiune)
  const ep = new Path2D(); ep.moveTo(-40, yG); ep.lineTo(W + 40, yG); for (let x = W + 40; x >= -40; x -= 8) ep.lineTo(x, J(x)); ep.closePath();
  g.save(); g.fillStyle = '#d7a2d6'; g.fill(ep); g.clip(ep);
  // celule spinoase (poligonale) cu punți intercelulare
  const cs = o.cs ?? 44; const yS = yG + (para ? 0 : 36);
  for (let y = yS + cs / 2, r = 0; y < yB + d + cs; y += cs * 0.86, r++) for (let x = -cs + (r % 2) * cs / 2; x < W + cs; x += cs) {
    if (y > J(x) - 22) continue; srand(Math.round(x * 7 + y));
    const jx = x + rr(-3, 3), jy = y + rr(-3, 3);
    g.fillStyle = '#e8bce6'; g.beginPath(); g.roundRect(jx - cs / 2 + 4, jy - cs * 0.43 + 4, cs - 8, cs * 0.86 - 8, 9); g.fill();
    if (o.cells !== false) { g.strokeStyle = '#a96fb4'; g.lineWidth = 1.6; for (let q = -1; q <= 1; q++) { g.beginPath(); g.moveTo(jx + cs / 2 - 5, jy + q * 8); g.lineTo(jx + cs / 2 + 5, jy + q * 8); g.stroke(); g.beginPath(); g.moveTo(jx + q * 9, jy + cs * 0.43 - 5); g.lineTo(jx + q * 9, jy + cs * 0.43 + 4); g.stroke(); } }
    g.fillStyle = HE.nuc; g.beginPath(); g.ellipse(jx, jy, 8.5, 7.5, 0, 0, 7); g.fill(); g.fillStyle = '#9d8fe6'; g.beginPath(); g.arc(jx + 1.5, jy - 1, 2, 0, 7); g.fill();
  }
  g.restore();
  // stratul bazal: nuclei închiși, înghesuiți, de-a lungul joncțiunii
  g.save(); g.fillStyle = '#25196e'; for (let x = -30; x < W + 30; x += 15) { const e = 1.2; const sl = (J(x + e) - J(x - e)) / (2 * e); const nx = -sl / Math.hypot(1, sl), ny = 1 / Math.hypot(1, sl); g.beginPath(); g.ellipse(x - nx * 13, J(x) - ny * 13, 5.5, 9, Math.atan2(ny, nx), 0, 7); g.fill(); } g.restore();
  g.save(); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); for (let x = -40; x <= W + 40; x += 8) (x === -40 ? g.moveTo(x, J(x)) : g.lineTo(x, J(x))); g.stroke(); g.restore();
  // stratul granulos: celule turtite cu granule bazofile de keratohialină
  if (!para) {
    g.save(); g.fillStyle = '#e1a9d8'; g.fillRect(-40, yG, W + 80, 36); srand(40);
    for (let x = -30; x < W + 30; x += 46) { g.fillStyle = '#ecc2e6'; g.beginPath(); g.ellipse(x + 23, yG + 18, 21, 11, 0, 0, 7); g.fill(); g.fillStyle = '#3a1f78'; for (let k = 0; k < 9; k++) { g.beginPath(); g.arc(x + 23 + rr(-17, 17), yG + 18 + rr(-8, 8), rr(2, 3.4), 0, 7); g.fill(); } g.fillStyle = '#2a1d78'; g.beginPath(); g.ellipse(x + 23, yG + 18, 6, 3.5, 0, 0, 7); g.fill(); }
    g.restore();
  }
  // stratul cornos: lamele de cheratină, roz, compacte; fără nuclei (ortocheratoză) sau cu nuclei turtiți (paracheratoză)
  const top = yG - th; const n = Math.max(2, Math.round(th / 20));
  for (let k = 0; k < n; k++) {
    const y0 = top + k * th / n, h = th / n - 4; const p = new Path2D();
    p.moveTo(-40, y0 + Math.sin(-40 / 70 + k) * 4); for (let x = -40; x <= W + 40; x += 20) p.lineTo(x, y0 + Math.sin(x / 70 + k) * 4 + Math.sin(x / 23 + k * 2) * 1.5);
    for (let x = W + 40; x >= -40; x -= 20) p.lineTo(x, y0 + h + Math.sin(x / 70 + k + 0.6) * 4); p.closePath();
    g.fillStyle = k % 3 === 0 ? '#f4a6c8' : k % 3 === 1 ? '#ec8fb8' : '#f7b6d2'; g.fill(p);
    if (para) { srand(k * 13 + 5); g.fillStyle = '#2c2490'; for (let j = 0; j < 9; j++) { g.beginPath(); g.ellipse(rr(0, W), y0 + h / 2, 9, 2.6, 0, 0, 7); g.fill(); } }
  }
  g.save(); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); for (let x = -40; x <= W + 40; x += 20) (x === -40 ? g.moveTo(x, top + Math.sin(x / 70) * 4) : g.lineTo(x, top + Math.sin(x / 70) * 4)); g.stroke(); g.restore();
  // scuame care se desprind la suprafață
  if (o.flakes) { for (let k = 0; k < 5; k++) { const f = ((t * 0.12 * o.flakes + k / 5) % 1); const x = 100 + k * 190, y = top - 10 - f * 140; g.save(); g.globalAlpha = 1 - f; g.fillStyle = '#f4a6c8'; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.ellipse(x + Math.sin(t + k) * 10, y, 34, 7, 0.1 * Math.sin(t + k), 0, 7); g.fill(); g.stroke(); g.restore(); } }
}
const hkField = (g, t) => skinField(g, t, {});
const paraField = (g, t) => skinField(g, t, { para: true, th: 330, yG: 380, lymph: true });
const normSkin = { yG: 300, th: 60, yB: 470, d: 55 };

/* =============================================================== FICAT (lamele 14, 16) */
const LIV = {};
// celule hepatice în cordoane, sinusoide comprimate între cordoane; kind: 'fat' | 'balon' | 'normal' | 'ghost'
function liverGeo(S, seed) {
  const key = S + ':' + seed; if (LIV[key]) return LIV[key];
  srand(seed); const C = []; const rows = [];
  for (let r = 0, y = -S / 2; y < H + S; r++) {
    const rowH = S * 0.92; rows.push(y);
    for (let x = -S + (r % 2) * S * 0.45; x < W + S; x += S) {
      const fat = rnd(); const rv = S * rr(0.2, 0.46);
      C.push({ x: x + rr(-3, 3), y: y + rowH / 2 + rr(-3, 3), w: S - 6, h: rowH - 6, f: fat, rv, a: rr(0, 6.28), r });
    }
    y += rowH + ((r % 2) ? S * 0.14 : 2);
  }
  return (LIV[key] = { C, rows });
}
function liverField(g, t, o = {}) {
  const S = o.S || 70; const kind = o.kind || 'fat'; const { C } = liverGeo(S, o.seed || 7);
  bgFill(g, '#fbe2ec', '#f6d3e2');
  const cv = o.cv; // vena centrolobulară [x,y,r]
  // sinusoide (lumen palid cu hematii, comprimate)
  const sinG = new Set(); C.forEach((c) => { if (c.r % 2) sinG.add(Math.round(c.y + c.h / 2 + S * 0.07)); });
  g.save(); [...sinG].forEach((yy, k) => { g.fillStyle = '#fff3f8'; g.fillRect(-40, yy - S * 0.07, W + 80, S * 0.14); srand(yy); for (let j = 0; j < 16; j++) { const x = rr(-20, W + 20); if (cv && Math.hypot(x - cv[0], yy - cv[1]) < cv[2] + 20) continue; g.fillStyle = '#d93a52'; g.beginPath(); g.ellipse(x, yy, S * 0.13, S * 0.045, 0, 0, 7); g.fill(); } }); g.restore();
  C.forEach((c, k) => {
    if (cv && Math.hypot(c.x - cv[0], c.y - cv[1]) < cv[2] + S * 0.45) return;
    const x = c.x, y = c.y, w = c.w, h = c.h;
    const ghost = kind === 'ghost';
    if (kind === 'balon') {
      const sw = 1.08; g.save(); g.fillStyle = '#fbeef5'; g.strokeStyle = '#c785ad'; g.lineWidth = 2.5; g.beginPath(); g.roundRect(x - w * sw / 2, y - h * sw / 2, w * sw, h * sw, 10); g.fill(); g.stroke();
      g.strokeStyle = 'rgba(214,130,180,.75)'; g.lineWidth = 1.6; srand(k + 3); for (let j = 0; j < 7; j++) { g.beginPath(); const sx = x + rr(-w / 2.6, w / 2.6), sy = y + rr(-h / 2.6, h / 2.6); g.moveTo(sx, sy); g.quadraticCurveTo(sx + rr(-12, 12), sy + rr(-12, 12), sx + rr(-16, 16), sy + rr(-16, 16)); g.stroke(); } g.restore();
      paint(g, blob(x, y, S * 0.13, S * 0.12, 0, t, 0.03, 10, k), HE.nuc, HE.nucS, HE.nucL, bb(x, y, S * 0.13, S * 0.12), OUT, 1.5);
      return;
    }
    g.save(); g.fillStyle = ghost ? '#f79cc6' : '#e8a2c8'; g.strokeStyle = ghost ? '#d17aa6' : '#b9649a'; g.lineWidth = 2.2; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, 10); g.fill(); g.stroke(); g.restore();
    if (ghost) return;
    const fatty = kind === 'fat' && c.f < (o.p ?? 0.8);
    if (!fatty) { paint(g, blob(x, y, S * 0.13, S * 0.12, 0, t, 0.03, 10, k), HE.nuc, HE.nucS, HE.nucL, bb(x, y, S * 0.13, S * 0.12), OUT, 1.5); g.save(); g.fillStyle = '#a99be8'; g.beginPath(); g.arc(x + 1, y - 1, S * 0.03, 0, 7); g.fill(); g.restore(); return; }
    const gr = o.grow ?? 1; const big = c.rv > S * 0.33;
    // vacuola mare e decalată opus nucleului și limitată ca nucleul în semilună să rămână ÎN celulă (între vacuolă și membrană)
    const R0 = Math.min(w, h) / 2 - 2, dv = S * 0.055; const rv = (big ? Math.min(c.rv, R0 - dv) : c.rv) * gr;
    // vacuola: rotundă, net delimitată, GOALĂ (grăsimea s-a dizolvat la prelucrare)
    const vx = x + (big ? -Math.cos(c.a) * dv : Math.cos(c.a) * S * 0.12), vy = y + (big ? -Math.sin(c.a) * dv : Math.sin(c.a) * S * 0.1);
    g.save(); g.fillStyle = '#fffdfd'; g.strokeStyle = '#a9578a'; g.lineWidth = 2; g.beginPath(); g.arc(vx, vy, rv, 0, 7); g.fill(); g.stroke(); g.restore();
    if (big && gr > 0.75) { // nucleul împins la periferie, turtit, în semilună
      const a = c.a;
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = S * 0.11; g.beginPath(); g.arc(vx, vy, rv + dv, a - 0.42, a + 0.42); g.stroke(); g.strokeStyle = HE.nuc; g.lineWidth = S * 0.075; g.stroke(); g.restore();
    } else { const nx = x - Math.cos(c.a) * S * 0.2, ny = y - Math.sin(c.a) * S * 0.17; paint(g, blob(nx, ny, S * 0.11, S * 0.1, 0, t, 0.03, 10, k), HE.nuc, HE.nucS, HE.nucL, bb(nx, ny, S * 0.11, S * 0.1), OUT, 1.5); }
  });
  if (cv) { g.save(); g.fillStyle = '#fff6fa'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(cv[0], cv[1], cv[2], 0, 7); g.fill(); g.stroke(); g.fillStyle = HE.nuc; for (let k = 0; k < 10; k++) { const a = k / 10 * 6.28; g.beginPath(); g.ellipse(cv[0] + Math.cos(a) * (cv[2] - 6), cv[1] + Math.sin(a) * (cv[2] - 6), 8, 3, a + 1.57, 0, 7); g.fill(); } dots(g, 6, cv[0], cv[1], cv[2] * 0.5, cv[2] * 0.5, '#d93a52', 7, 3); g.restore(); }
}
const stField = (g, t) => liverField(g, t, { S: 120, kind: 'fat', cv: [830, 160, 60] });
const balonField = (g, t) => liverField(g, t, { S: 120, kind: 'balon' });
const coagField = (g, t) => liverField(g, t, { S: 120, kind: 'ghost' });

/* =============================================================== PERICARD (lama 15) */
const villi = (x) => { const a = Math.abs(Math.sin(x / 61 + 1.3)) ** 3, b = Math.abs(Math.sin(x / 37 + 0.4)) ** 6, c = Math.abs(Math.sin(x / 113)) ** 2; return 40 + 120 * a + 70 * b + 40 * c; };
function pericField(g, t, o = {}) {
  const base = o.base ?? 360, grow = o.grow ?? 1, pur = !!o.pur;
  bgFill(g, '#fdf1f7', '#fdf1f7');
  // miocard (jos)
  for (let k = 0; k < 4; k++) { const y = 790 + k * 46; const p = new Path2D(); p.roundRect(-40, y, W + 80, 38, 14); paint(g, p, '#e77aa0', '#d8628c', null, [-40, y, W + 80, 38], OUT, 3.5); g.save(); g.clip(p); g.strokeStyle = 'rgba(150,40,90,.4)'; g.lineWidth = 2; for (let x = -40 + (k % 2) * 6; x < W + 40; x += 12) { g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 38); g.stroke(); } g.restore(); for (let x = 60 + k * 70; x < W; x += 260) paint(g, blob(x, y + 19, 18, 6, 0, t, 0.03, 8, k), HE.nuc, HE.nucS, null, bb(x, y + 19, 18, 6), OUT, 2); }
  // țesut adipos subepicardic
  for (let x = 40, k = 0; x < W + 60; x += 92, k++) adipocyte(g, x + (k % 2) * 20, 690 + (k % 3) * 14, 46, t, { nucAngle: -1.2 + k });
  // țesut conjunctiv subepicardic: fibroblaste; la bază, organizarea = capilare de neoformație
  g.save(); g.fillStyle = '#f5c9dc'; g.fillRect(-40, base, W + 80, 640 - base); g.restore();
  srand(51); for (let k = 0; k < 26; k++) fibroSp(g, rr(0, W), rr(base + 120, 630), 0.9, rr(-0.2, 0.2), t, k);
  for (let k = 0; k < 6; k++) { const x = 90 + k * 165; vessel(g, x, base + 150 + (k % 2) * 40, 24, t, k); }
  // infiltrat inflamator sub fibrină: neutrofile, limfocite, macrofage; vase dilatate, congestionate
  srand(52); for (let k = 0; k < 38; k++) { const x = rr(0, W), y = rr(base + 8, base + 105); const q = k % 4; if (q === 0 || q === 1) neutrophil(g, x, y, 0.7, t, k); else if (q === 2) lymphocyte(g, x, y, 0.42, t); else macrophageP(g, x, y, 0.6, t, k); }
  [[170, base + 60], [520, base + 70], [820, base + 55]].forEach(([x, y], k) => vessel(g, x, y, 30, t, k + 20));
  if (pur) { // stratul cremos de neutrofile (puroi)
    const p = new Path2D(); p.moveTo(-40, base); p.lineTo(W + 40, base); p.lineTo(W + 40, base - 170); for (let x = W + 40; x >= -40; x -= 30) p.lineTo(x, base - 170 + Math.sin(x / 50) * 10); p.closePath();
    paint(g, p, '#f3dc7a', '#e8c95a', null, [-40, base - 180, W + 80, 180], OUT, 5); g.save(); g.clip(p); srand(53); for (let k = 0; k < 90; k++) neutrophil(g, rr(-10, W + 10), rr(base - 165, base - 10), 0.7, t, k, k % 3 === 0); g.restore();
    return;
  }
  // fibrina: strat eozinofil, amorf, cu proeminențe viloase (franjurat)
  const p = new Path2D(); p.moveTo(-40, base + 6);
  for (let x = -40; x <= W + 40; x += 6) { const v = villi(x) * grow; p.lineTo(x + Math.sin(x / 9) * 2, base - v + (REDUCED ? 0 : Math.sin(t * 2 + x / 40) * 2)); }
  p.lineTo(W + 40, base + 6); p.closePath();
  paint(g, p, '#f08cba', '#e273a8', '#ffc3dd', [-40, base - 200, W + 80, 210], OUT, 5);
  g.save(); g.clip(p); g.strokeStyle = 'rgba(255,214,232,.85)'; g.lineWidth = 3; srand(54); for (let k = 0; k < 90; k++) { const x = rr(-20, W + 20), y = rr(base - 220, base); g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + rr(-20, 20), y + rr(-30, 30), x + rr(-40, 40), y + rr(-40, 40)); g.stroke(); }
  srand(55); for (let k = 0; k < 16; k++) { const x = rr(10, W - 10), y = base - rr(10, villi(x) * grow * 0.8); neutrophil(g, x, y, 0.6, t, k); }
  srand(56); for (let k = 0; k < 5; k++) { const x = rr(10, W - 10); rbc(g, x, base - rr(10, 50), 0.55, 0, t); }
  g.restore();
}
const pcField = (g, t) => pericField(g, t, {});
const purField = (g, t) => pericField(g, t, { pur: true });

/* =============================================================== ABCES (lama 16) */
const AB = [500, 470];
function abscessField(g, t, o = {}) {
  const [cx, cy] = AB; const sc = o.sc ?? 1;
  bgFill(g, '#f8d7e6', '#f2c6da');
  // hepatocite din jur, comprimate și turtite, aranjate concentric; sinusoide congestionate
  for (let rr2 = 455; rr2 < 900; rr2 += 54) { const n = Math.round(rr2 * 6.28 / 74); for (let k = 0; k < n; k++) { const a = k / n * 6.283 + rr2; const x = cx + Math.cos(a) * rr2 * 1.06, y = cy + Math.sin(a) * rr2 * 0.92; if (x < -60 || x > W + 60 || y < -60 || y > H + 60) continue; const comp = clamp(1 - (rr2 - 455) / 300); g.save(); g.translate(x, y); g.rotate(a + Math.PI / 2); g.fillStyle = '#e8a2c8'; g.strokeStyle = '#b9649a'; g.lineWidth = 2; g.beginPath(); g.roundRect(-30, -22 + 9 * comp, 60, 44 - 18 * comp, 8); g.fill(); g.stroke(); g.fillStyle = HE.nuc; g.beginPath(); g.ellipse(0, 0, 8, 7 - 3 * comp, 0, 0, 7); g.fill(); g.restore(); }
    const p = rr2 + 27; g.save(); g.strokeStyle = 'rgba(217,40,63,.75)'; g.lineWidth = 6; g.setLineDash([10, 16]); g.beginPath(); g.ellipse(cx, cy, p * 1.06, p * 0.92, 0, 0, 7); g.stroke(); g.restore(); }
  // abces mic, alăturat (colecții multiple)
  if (o.multi !== false) { const [mx, my] = [905, 95]; g.save(); g.fillStyle = '#f4e3b0'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(mx, my, 80, 0, 7); g.fill(); g.stroke(); g.clip(); srand(61); for (let k = 0; k < 18; k++) neutrophil(g, mx + rr(-60, 60), my + rr(-60, 60), 0.55, t, k, k % 2); g.restore(); }
  // capsula fibroasă (țesut de granulație → fibroză)
  const cap = new Path2D(); cap.ellipse(cx, cy, 440, 400, 0, 0, 7);
  paint(g, cap, '#f3b4cf', null, null, [cx - 440, cy - 400, 880, 800], OUT, 5);
  g.save(); g.clip(cap); for (let k = 0; k < 44; k++) { const a = k / 44 * 6.283; fibroSp(g, cx + Math.cos(a) * 408, cy + Math.sin(a) * 370, 0.95, a + Math.PI / 2, t, k); } for (let k = 0; k < 10; k++) { const a = k / 10 * 6.283 + 0.3; vessel(g, cx + Math.cos(a) * 392, cy + Math.sin(a) * 356, 15, t, k + 40); } g.restore();
  // membrana piogenă: neutrofile dense, fibrină, vase congestionate
  const mem = new Path2D(); mem.ellipse(cx, cy, 375, 338, 0, 0, 7);
  g.save(); g.fillStyle = '#e9a8d0'; g.fill(mem); g.clip(mem);
  g.strokeStyle = '#f7c2dc'; g.lineWidth = 4; for (let k = 0; k < 36; k++) { const a = k / 36 * 6.28; g.beginPath(); g.arc(cx, cy, 330 + (k % 3) * 8, a, a + 0.3); g.stroke(); }
  srand(62); for (let k = 0; k < 140; k++) { const a = rr(0, 6.283), r = rr(300, 372); neutrophil(g, cx + Math.cos(a) * r * 1.0, cy + Math.sin(a) * r * 0.9, 0.62, t, k); }
  for (let k = 0; k < 7; k++) { const a = k / 7 * 6.283; vessel(g, cx + Math.cos(a) * 345, cy + Math.sin(a) * 310, 17, t, k + 60); }
  g.restore();
  // centrul: puroi = neutrofile (multe degenerate = piocite) + detritus eozinofil, fibrină, hematii; țesutul inițial a dispărut
  const core = new Path2D(); core.ellipse(cx, cy, 300 * sc, 270 * sc, 0, 0, 7);
  paint(g, core, '#f3e2b8', null, null, [cx - 300, cy - 270, 600, 540], OUT, 4);
  g.save(); g.clip(core); g.fillStyle = '#f2a9c9'; srand(63); for (let k = 0; k < 40; k++) { g.beginPath(); g.ellipse(cx + rr(-280, 280), cy + rr(-250, 250), rr(8, 26), rr(5, 13), rr(0, 3), 0, 7); g.fill(); }
  g.strokeStyle = '#ea8cb8'; g.lineWidth = 3; srand(64); for (let k = 0; k < 30; k++) { const x = cx + rr(-280, 280), y = cy + rr(-250, 250); g.beginPath(); g.moveTo(x, y); g.lineTo(x + rr(-40, 40), y + rr(-20, 20)); g.stroke(); }
  srand(65); for (let k = 0; k < 70; k++) { const a = rr(0, 6.283), r = Math.sqrt(rnd()) * 285; neutrophil(g, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.9, 0.62, t, k, r < 190 && k % 3 !== 0); }
  srand(66); for (let k = 0; k < 6; k++) rbc(g, cx + rr(-200, 200), cy + rr(-180, 180), 0.6, rr(0, 3), t);
  g.restore();
}
const abField = (g, t) => abscessField(g, t, {});

/* =============================================================== GANGLION TBC (lama 17) */
const TB = [640, 540];
function tbField(g, t, o = {}) {
  const [cx, cy] = TB; const cas = o.cas ?? 1;
  bgFill(g, '#efcfe4', '#e9c0da');
  // țesut limfoid restant: limfocite dense (periferie)
  srand(71); for (let k = 0; k < 420; k++) { const x = rr(-30, W + 30), y = rr(-30, H + 30); const d = Math.hypot((x - cx) / 1.05, (y - cy) / 0.98); if (d < 410) continue; lymphocyte(g, x, y, 0.36, t); }
  // granulom mic necazeificat, separat (stânga sus)
  const g2 = [200, 230]; srand(72); for (let k = 0; k < 14; k++) { const a = k / 14 * 6.283; epithelioid(g, g2[0] + Math.cos(a) * 68, g2[1] + Math.sin(a) * 58, 0.75, a + Math.PI / 2, t, k); }
  langhans(g, g2[0], g2[1], 0.42, t);
  // coroana de limfocite
  srand(73); for (let k = 0; k < 150; k++) { const a = rr(0, 6.283), r = rr(335, 410); lymphocyte(g, cx + Math.cos(a) * r * 1.05, cy + Math.sin(a) * r * 0.98, 0.36, t); }
  // fibroblaste rare la exterior
  for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283 + 0.2; fibroSp(g, cx + Math.cos(a) * 395, cy + Math.sin(a) * 380, 0.9, a + Math.PI / 2, t, k); }
  // celulele epitelioide, în palisadă în jurul cazeumului
  for (let ring2 = 0; ring2 < 3; ring2++) { const r = 255 + ring2 * 30; const n = Math.round(r * 6.28 / 54); for (let k = 0; k < n; k++) { const a = k / n * 6.283 + ring2 * 0.2; epithelioid(g, cx + Math.cos(a) * r * 1.05, cy + Math.sin(a) * r * 0.98, 0.78, a + Math.PI / 2, t, k + ring2 * 50); } }
  // celule gigante Langhans în coroana epitelioidă
  [[-2.3, 1], [0.35, 1], [1.9, 1]].forEach(([a]) => langhans(g, cx + Math.cos(a) * 290, cy + Math.sin(a) * 272, 0.5, t));
  // necroza cazeoasă: roz, amorfă, granulară, fără contururi celulare
  const c = new Path2D(); c.ellipse(cx, cy, 238 * cas, 222 * cas, 0, 0, 7);
  paint(g, c, '#f2a4c6', '#ea93b9', '#ffd6e8', [cx - 240, cy - 224, 480, 448], 'rgba(42,21,52,.45)', 3);
  g.save(); g.clip(c); dots(g, 260, cx, cy, 236, 220, '#d784ae', 2.6, 74); dots(g, 120, cx, cy, 236, 220, '#b56aa8', 1.8, 75); g.restore();
}
const tbFieldF = (g, t) => tbField(g, t, {});

/* =============================================================== CORP STRĂIN (lama 18) */
const MAT = [[340, 340], [460, 250], [640, 270], [720, 380], [650, 520], [470, 540], [330, 470]];
function matPath(sc = 1, ox = 0, oy = 0) { return smooth(MAT.map(([x, y]) => [500 + ox + (x - 520) * sc, 400 + oy + (y - 400) * sc])); }
const GC = (() => { // celulele gigante mulate pe material (forme fixe)
  const A = []; const base = [[300, 400, 1.2], [520, 205, 0.0], [745, 330, -0.9], [610, 590, 2.6]];
  base.forEach(([x, y, a], i) => { srand(80 + i); const nuc = []; for (let k = 0; k < 14; k++) nuc.push([x + rr(-70, 70) * Math.abs(Math.cos(a)) + rr(-30, 30), y + rr(-70, 70) * Math.abs(Math.sin(a)) + rr(-28, 28), rr(0, 3)]); A.push({ x, y, a, nuc }); });
  return A;
})();
function csField(g, t, o = {}) {
  bgFill(g, '#f1c7dc', '#ebb8d0');
  // fibroză la periferie: fascicule de colagen roz
  g.save(); g.strokeStyle = '#f7a7c8'; g.lineCap = 'round'; for (let k = 0; k < 18; k++) { g.lineWidth = 14; const r = 430 + k * 14; g.beginPath(); g.ellipse(500, 420, r * 1.1, r * 0.95, 0, 0, 7); g.globalAlpha = 0.55; g.stroke(); } g.restore();
  srand(81); for (let k = 0; k < 30; k++) { const a = rr(0, 6.28), r = rr(470, 640); fibroSp(g, 500 + Math.cos(a) * r * 1.1, 420 + Math.sin(a) * r * 0.95, 1, a + Math.PI / 2, t, k); }
  // țesut de granulație: capilare de neoformație + fibroblaste
  for (let k = 0; k < 9; k++) { const a = k / 9 * 6.283 + 0.4; vessel(g, 500 + Math.cos(a) * 395 * 1.08, 420 + Math.sin(a) * 360, 20, t, k + 80); }
  // infiltrat: macrofage (epitelioide), limfocite
  srand(82); for (let k = 0; k < 60; k++) { const a = rr(0, 6.28), r = rr(250, 380); const x = 500 + Math.cos(a) * r * 1.1, y = 420 + Math.sin(a) * r * 0.95; if (k % 3 === 0) epithelioid(g, x, y, 0.62, a, t, k); else lymphocyte(g, x, y, 0.38, t); }
  // materialul străin: aici cheratină lamelară (eozinofilă, palidă, în straturi)
  const mp = matPath(1); g.save(); g.fillStyle = '#fbe3ef'; g.fill(mp); g.clip(mp); for (let k = 0; k < 16; k++) { g.strokeStyle = k % 2 ? '#f0a6c9' : '#d9b8e8'; g.lineWidth = 7; g.beginPath(); const y = 240 + k * 22; g.moveTo(300, y); g.bezierCurveTo(420, y - 30, 560, y + 30, 760, y - 10); g.stroke(); } g.restore();
  g.save(); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(mp); g.restore();
  // fragmente de material înglobate
  [[860, 760, -0.3], [150, 160, 0.5]].forEach(([x, y, a]) => { g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = '#fbe3ef'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.ellipse(0, 0, 50, 16, 0, 0, 7); g.fill(); g.stroke(); g.strokeStyle = '#d9b8e8'; g.lineWidth = 4; g.beginPath(); g.moveTo(-40, -4); g.lineTo(40, -4); g.moveTo(-36, 6); g.lineTo(36, 6); g.stroke(); g.restore(); });
  // celule gigante de corp străin, mulate pe material, nuclei dezordonați
  GC.forEach((c, i) => { const p = new Path2D(); const L = 120, Wd = 52; p.ellipse(c.x, c.y, L, Wd, c.a, 0, 7); fbgc(g, p, bb(c.x, c.y, L, Wd), c.nuc.filter(([nx, ny]) => { const dx = nx - c.x, dy = ny - c.y; const X = dx * Math.cos(-c.a) - dy * Math.sin(-c.a), Y = dx * Math.sin(-c.a) + dy * Math.cos(-c.a); return (X * X) / (L * L * 0.72) + (Y * Y) / (Wd * Wd * 0.6) < 1; }), t); });
  [[860, 760, -0.3]].forEach(([x, y, a]) => { const p = new Path2D(); p.ellipse(x, y - 34, 78, 30, a, 0, 7); fbgc(g, p, bb(x, y - 34, 78, 30), [[x - 40, y - 40, 0], [x - 10, y - 28, 1], [x + 20, y - 46, 2], [x + 44, y - 36, 0.5], [x + 6, y - 50, 1.3]], t); });
}
const csFieldF = (g, t) => csField(g, t, {});

/* =============================================================== COPERTA, FIȘA, RECAP, DD, SCRIPT */
const FIELDS = { hk: hkField, para: paraField, st: stField, balon: balonField, coag: coagField, pc: pcField, pur: purField, ab: abField, tb: tbFieldF, cs: csFieldF };
const POS6 = [[190, 270], [500, 270], [810, 270], [190, 690], [500, 690], [810, 690]];
const NAMES6 = ['hk', 'st', 'pc', 'ab', 'tb', 'cs'];
const LAB6 = ['13 · hipercheratoză', '14 · steatoză hepatică', '15 · pericardită fibrinoasă', '16 · abcese hepatice', '17 · limfadenită TBC', '18 · granulom de corp străin'];
function cover() {
  const k = [0, 0, 0, 0, 0, 0];
  return {
    home: HOME, cams: POS6.map(([x, y]) => cam(x, y, 1.9)), anchors: POS6.map(([x, y]) => [x - 105, y - 105]),
    labels: POS6.map(([x, y], i) => lbl([x, y + 165], LAB6[i])),
    draw(g, t, b) { bgFill(g, '#3a1d2a', '#140a12'); POS6.forEach(([x, y], i) => { k[i] = lerp(k[i], b.i === i ? 1 : 0, 0.08); mini(g, x, y, 135 + k[i] * 6, FIELDS[NAMES6[i]], t); if (k[i] > 0.05) glowRing(g, x, y, 150, 150, 0, k[i]); }); },
  };
}
function fisa() {
  const rows = [['Organ', 1, '#ffd36e'], ['Leziune', 1, '#ffd36e'], ['Definiție', 1, '#ffd36e'], ['Descriere', 6, '#ff9fc6'], ['Cauze', 4, '#c9b3ff'], ['Complicații', 3, '#7fe8ff'], ['DD', 1, '#9dff8a']];
  return {
    home: HOME, cams: [cam(500, 300, 1.25), cam(500, 560, 1.15), cam(500, 470, 1), cam(500, 560, 1.05)],
    anchors: [[60, 60], [60, 330], [860, 510], [60, 530]],
    phase: (i) => ['3 puncte obligatorii', 'o bulină = 1 punct', 'minim 5 puncte', 'mecanismul = liantul'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      const prog = b.i < 0 ? 1 : b.i === 0 ? ease(b.bt) : 1;
      rows.forEach(([nm, n, col], r) => {
        const y = 110 + r * 100; const on = (b.i === 0 && r < 3) || (b.i === 1 && r >= 3 && r <= 5) || (b.i === 3 && r >= 4 && r <= 5);
        txt(g, nm, 330, y + 12, 30, on ? '#fff' : '#d9c8e4', 'right');
        for (let j = 0; j < n; j++) { const x = 380 + j * 74; const appear = r < 3 ? clamp(prog * 3 - r) : b.i >= 1 || b.i < 0 ? clamp((b.i === 1 ? b.bt * 2.4 : 9) - j * 0.35) : 0.35; g.save(); g.globalAlpha = 0.25 + 0.75 * appear; g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(x, y, 28 * (0.7 + 0.3 * appear), 0, 7); g.fill(); g.stroke(); g.restore(); txt(g, r === 6 ? '✓' : '1', x, y + 10, 24, '#ffffff'); }
        if (r === 2) { g.save(); g.strokeStyle = '#ffd36e'; g.lineWidth = 4; g.setLineDash([10, 8]); g.strokeRect(345, 60, 75, 270); g.restore(); txt(g, 'OBLIGATORIU · 3 p', 445, 210, 26, '#ffd36e', 'left'); }
      });
      const tot = b.i === 2 ? Math.min(5, Math.floor(b.bt * 2.2)) : b.i > 2 || b.i < 0 ? 5 : 0;
      const cx = 860, cy = 650; g.save(); g.strokeStyle = OUT; g.lineWidth = 34; g.beginPath(); g.arc(cx, cy, 90, 0, 7); g.stroke(); g.strokeStyle = tot >= 5 ? '#9dff8a' : '#ff9fc6'; g.lineWidth = 24; g.beginPath(); g.arc(cx, cy, 90, -1.57, -1.57 + 6.283 * tot / 5); g.stroke(); g.restore(); txt(g, `${tot}/5`, cx, cy + 14, 40); txt(g, 'minim 5 p', cx, cy + 140, 26, '#ffe36e');
      if (b.i === 3) txt(g, 'cauză → leziune → complicație', 500, 880, 30, '#7fe8ff');
    },
  };
}
function recap() {
  const k = [0, 0, 0, 0, 0, 0];
  return {
    home: HOME, cams: POS6.map(([x, y]) => cam(x, y, 1.6)), anchors: [],
    draw(g, t, b) { bgFill(g, '#3a1d2a', '#140a12'); POS6.forEach(([x, y], i) => { k[i] = lerp(k[i], b.i === i ? 1 : 0, 0.08); mini(g, x, y, 135, FIELDS[NAMES6[i]], t); if (k[i] > 0.05) glowRing(g, x, y, 150, 150, 0, k[i]); txt(g, String(13 + i), x - 105, y - 95, 34, '#ffe36e'); }); },
  };
}
const wrapTxt = (g, s, x, y, size, col, maxW) => { g.save(); g.font = `800 ${size}px "Plus Jakarta Sans", Inter, sans-serif`; const words = s.split(' '); const L = []; let cur = ''; words.forEach((w) => { const tt = cur ? cur + ' ' + w : w; if (g.measureText(tt).width > maxW && cur) { L.push(cur); cur = w; } else cur = tt; }); if (cur) L.push(cur); g.restore(); L.forEach((l, k) => txt(g, l, x, y + k * (size + 6), size, col)); };
function ddDraw(g, t, o, pa, pb) {
  bgFill(g, '#2e1838', '#140a1a');
  mini(g, 260, 540, 215, FIELDS[o.a]); mini(g, 740, 540, 215, FIELDS[o.b]);
  txt(g, 'vs.', 500, 555, 40, '#ffe36e');
  if (o.ka) wrapTxt(g, o.ka, 260, 150, 23, '#ffe36e', 420); if (o.kb) wrapTxt(g, o.kb, 740, 150, 23, '#7fe8ff', 420);
  if (pa > 0) glowRing(g, 260, 540, 225, 225, 0, pa); if (pb > 0) glowRing(g, 740, 540, 225, 225, 0, pb, '#7fe8ff');
}
function ddPair({ spec }) {
  const o = spec.sceneOpts; const n = (spec.points || []).length;
  return {
    home: HOME, cams: Array.from({ length: Math.max(1, n) }, () => cam(500, 470, 1)),
    anchors: [[40, 50], [960, 50], [500, 900], [620, 900], [740, 900], [860, 900]].slice(0, n),
    labels: [lbl([260, 255], o.l), lbl([740, 255], o.r)],
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      mini(g, 260, 470, 225, FIELDS[o.a], t); mini(g, 740, 470, 225, FIELDS[o.b], t);
      txt(g, 'vs.', 500, 485, 40, '#ffe36e');
      if (o.ka) txt(g, o.ka, 260, 860, 24, '#ffe36e'); if (o.kb) txt(g, o.kb, 740, 860, 24, '#7fe8ff');
      if (b.i === 0 || b.i < 0) glowRing(g, 260, 470, 235, 235, 0, b.i < 0 ? 0 : ease(b.bt * 1.5));
      if (b.i === 1) glowRing(g, 740, 470, 235, 235, 0, ease(b.bt * 1.5), '#7fe8ff');
      if (b.i >= 2) { glowRing(g, 260, 470, 235, 235, 0, ease(b.bt * 1.5)); glowRing(g, 740, 470, 235, 235, 0, ease(b.bt * 1.5), '#7fe8ff'); }
    },
  };
}
function script({ spec }) {
  const o = spec.sceneOpts || {}; const tot = spec.durs.reduce((a, c) => a + c, 0);
  const WS = 600, HS = 897;
  return {
    W: WS, H: HS, home: cam(300, 448, 1), cams: null, anchors: [],
    phase: (i) => (i >= 0 ? `${spec.script[i].tm} · ${spec.script[i].at}` : ''),
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a', WS, HS);
      field(g, 300, 290, 230, () => { g.save(); g.translate(70, 60); g.scale(0.46, 0.49); FIELDS[o.f](g, t, o.fo || {}); g.restore(); });
      const C0 = [300, 700], R = 130; let acc = 0;
      spec.durs.forEach((d, i) => { const a0 = acc / tot, a1 = (acc + d) / tot; acc += d; const on = i === b.i, done = i < b.i; g.save(); g.strokeStyle = OUT; g.lineWidth = 36; g.beginPath(); g.arc(C0[0], C0[1], R, -Math.PI / 2 + a0 * Math.PI * 2, -Math.PI / 2 + a1 * Math.PI * 2 - 0.03); g.stroke(); g.strokeStyle = on ? '#ff9fc6' : done ? '#c23a62' : '#4a3d58'; g.lineWidth = 26; if (on) { g.shadowColor = '#ff9fc6'; g.shadowBlur = 20; } g.stroke(); g.restore(); });
      let f = 0; if (b.i >= 0) { let a = 0; for (let k = 0; k < b.i; k++) a += spec.durs[k]; f = (a + spec.durs[b.i] * clamp(b.bt / b.bd)) / tot; }
      const ang = -Math.PI / 2 + f * Math.PI * 2; g.save(); g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(C0[0] + Math.cos(ang) * R, C0[1] + Math.sin(ang) * R, 16, 0, 7); g.fill(); g.stroke(); g.restore();
      const sec = Math.round(f * tot); txt(g, b.i >= 0 ? `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}` : '6 min', C0[0], C0[1] + 14, 40);
    },
  };
}
// atlas cu DOUĂ poze (ob. mic, apoi ob. mare): marcajele primei poze vin primele, apoi poza se schimbă
const IMGS = {};
const pic = (n) => { if (!IMGS[n]) { const i = new Image(); i.src = `img/${n}.jpg`; IMGS[n] = i; } return IMGS[n]; };
const ACOL = ['#ffe36e', '#7fe8ff', '#9dff8a', '#ffa3e0', '#ffb36b', '#c9b3ff', '#ff8a8a', '#ffffff'];
function atlas2({ spec }) {
  const o = spec.sceneOpts; const FW = 1000, FH = 760; const P = [o.a, o.b];
  const fit = P.map((p) => { const s = Math.min(FW / p.W, FH / p.H); return { s, ox: (FW - p.W * s) / 2, oy: (FH - p.H * s) / 2 }; });
  const all = []; P.forEach((p, j) => p.marks.forEach((m, k) => all.push({ j, k, m })));
  const T = (j, x, y) => [fit[j].ox + x * fit[j].s, fit[j].oy + y * fit[j].s];
  let curJ = 0;
  const which = (bi) => (bi < 0 ? 0 : all[bi] ? all[bi].j : 1);
  return {
    W: FW, H: FH, home: { x: FW / 2, y: FH / 2, z: 1 }, cams: null,
    anchors: all.map(({ j, m }) => () => (curJ === j ? T(j, m.x + (m.bx ?? 0), m.y - (m.ry ?? m.rx) - 18 / fit[j].s + (m.by ?? 0)) : [-9999, -9999])),
    labels: all.map(({ j, m }, idx) => ({ at: () => (curJ === j ? T(j, m.lx ?? m.x, m.ly ?? m.y + (m.ry ?? m.rx) + 22 / fit[j].s) : [-9999, -9999]), html: m.lab })),
    phase: (i) => (which(i) === 0 ? 'ob. mic' : 'ob. mare'),
    draw(g, t, b) {
      curJ = which(b.i);
      g.fillStyle = '#100916'; g.fillRect(-4000, -4000, 8000 + FW, 8000 + FH);
      const p = P[curJ], f = fit[curJ]; const im = pic(p.img);
      const fade = b.i >= 0 && all[b.i] && all[b.i].k === 0 && curJ === 1 ? clamp(b.bt / 0.6) : 1;
      g.save(); g.globalAlpha = fade; if (im.complete && im.naturalWidth) g.drawImage(im, f.ox, f.oy, p.W * f.s, p.H * f.s);
      g.strokeStyle = OUT; g.lineWidth = 8; g.strokeRect(f.ox, f.oy, p.W * f.s, p.H * f.s);
      g.translate(f.ox, f.oy); g.scale(f.s, f.s);
      p.marks.forEach((m, k) => { const on = b.i >= 0 && all[b.i].j === curJ && all[b.i].k === k; const c = ACOL[k % 8]; const rx = m.rx, ry = m.ry ?? m.rx, rot = m.rot || 0;
        g.save(); g.lineWidth = 9 / f.s; g.strokeStyle = OUT; g.beginPath(); g.ellipse(m.x, m.y, rx, ry, rot, 0, 7); g.stroke(); g.lineWidth = (on ? 6 : 4.5) / f.s; g.strokeStyle = c; if (on) { g.shadowColor = c; g.shadowBlur = 18; } g.beginPath(); g.ellipse(m.x, m.y, rx, ry, rot, 0, 7); g.stroke(); g.restore();
        if (on) { g.save(); g.globalAlpha = 0.18 + 0.08 * Math.sin(t * 3); g.fillStyle = c; g.beginPath(); g.ellipse(m.x, m.y, rx, ry, rot, 0, 7); g.fill(); g.restore(); } });
      g.restore();
    },
  };
}

/* =============================================================== LAMA 13 · HIPERCHERATOZĂ */
function hkRec() {
  return {
    home: HOME, cams: [cam(500, 230, 1.45), cam(420, 440, 2.6), cam(500, 640, 1.6), cam(600, 720, 2.2)],
    anchors: [[640, 120], [470, 400], [420, 560], [600, 600]],
    labels: [lbl([500, 300], 'strat cornos: lamele roz, fără nuclei', { beats: [-1, 0] }), lbl([420, 485], 'stratul granulos: granule de keratohialină', { beats: [1] }), lbl([500, 765], 'acantoză: creste interpapilare alungite', { beats: [2] }), lbl([600, 820], 'papilă dermică: capilar + fibroblaste', { beats: [3] })],
    // papilele dermice stau între creste: crestele (J maxim) sunt la x = 100, 300, 500, 700; papilele (J = yB) la x = 200, 400, 600
    draw(g, t, b) { skinField(g, t, { lymph: true }); ring(g, b, 0, 500, 225, 420, 170); ring(g, b, 1, 420, 438, 150, 26); ring(g, b, 2, 300, 690, 40, 110); ring(g, b, 3, 600, 690, 62, 95); },
  };
}
function hkWhy() {
  const PX = [40, 520], PW = 440;
  return {
    home: HOME, cams: [cam(500, 470, 1.05), cam(500, 470, 1.1), cam(500, 500, 1.08), cam(500, 500, 1.05)],
    anchors: [[740, 210], [960, 470], [740, 760], [960, 790]],
    labels: [lbl([260, 140], 'epiderm normal'), lbl([740, 140], 'hipercheratoză + acantoză')],
    phase: (i) => ['producție ↑ + descuamare ↓', 'maturare completă = orto', 'stimul cronic → bazalele se divid', 'fără atipii, fără invazie'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      const p0 = b.i < 0 ? 1 : b.i === 0 ? ease(b.bt / 3) : 1; const p2 = b.i < 0 || b.i > 2 ? 1 : b.i === 2 ? ease(b.bt / 3) : 0.35;
      const H1 = { yG: lerp(300, 420, p0), th: lerp(60, 390, p0), yB: lerp(470, 600, p2), d: lerp(55, 210, p2) };
      PX.forEach((px, j) => {
        g.save(); const r = new Path2D(); r.roundRect(px, 180, PW, 640, 22); g.clip(r);
        g.translate(px, 180); g.scale(640 / H, 640 / H); g.translate(-(W - PW * H / 640) / 2, 0); skinField(g, t, j === 0 ? { ...normSkin, flakes: 1 } : { ...H1, flakes: 0.25 }); g.restore();
        g.save(); g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.roundRect(px, 180, PW, 640, 22); g.stroke(); g.restore();
      });
      // mitoze în stratul bazal (dreapta)
      if (b.i === 2) for (let k = 0; k < 4; k++) { const x = 560 + k * 110, y = 180 + (H1.yB + H1.d * 0.6) * 640 / H; g.save(); g.globalAlpha = 0.5 + 0.5 * Math.sin(t * 6 + k); g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 12, 0, 7); g.fill(); g.stroke(); g.restore(); }
      if (b.i === 0) { arrow(g, 740, 430, 740, 300, '#7fe8ff', 7); txt(g, 'cheratina se acumulează', 740, 880, 26, '#7fe8ff'); }
      if (b.i === 1) glowRing(g, 740, 180 + (H1.yG + 18) * 640 / H, 200, 18, 0, ease(b.bt * 1.4));
      if (b.i === 3) txt(g, 'derm normal / ușor inflamat', 740, 880, 26, '#9dff8a');
      txt(g, 'cornos subțire, creste scurte', 260, 870, 20, '#d9c8e4');
    },
  };
}

/* =============================================================== LAMA 14 · STEATOZĂ */
function stRec() {
  // celule de referință din geometrie (S=120): găsim un hepatocit cu vacuolă mare și unul fără grăsime
  const { C } = liverGeo(120, 7); const vis = (c) => c.x > 120 && c.x < 880 && c.y > 140 && c.y < 820 && Math.hypot(c.x - 830, c.y - 160) > 140;
  const big = C.find((c) => vis(c) && c.f < 0.8 && c.rv > 120 * 0.4 && c.x > 300 && c.x < 600) || C[20];
  const lean = C.find((c) => vis(c) && c.f >= 0.8 && c.x > 500) || C[30];
  // nucleul în semilună: la distanța rv (vacuola limitată) de centrul celulei, ca în liverField
  const rvB = Math.min(big.rv, Math.min(big.w, big.h) / 2 - 2 - 120 * 0.055); const nx = big.x + Math.cos(big.a) * rvB, ny = big.y + Math.sin(big.a) * rvB;
  const sinY = (() => { const c = C.find((q) => q.r % 2 && q.y > 380 && q.y < 600); return c ? c.y + c.h / 2 + 120 * 0.07 : 500; })();
  // ordinea punctelor: vacuole (ob. mic) → sinusoide → vacuola mare → nucleul împins → hepatocit fără grăsime
  return {
    home: HOME, cams: [cam(500, 470, 1), cam(330, sinY, 2.4), cam(big.x, big.y, 2.6), cam(nx, ny, 3.2), cam(lean.x, lean.y, 2.6)],
    anchors: [[830, 70], [250, sinY - 30], [big.x, big.y - 75], [nx, ny - 30], [lean.x, lean.y - 70]],
    labels: [lbl([830, 260], 'arhitectură păstrată (v. centrolobulară)', { beats: [-1, 0] }), lbl([330, sinY + 40], 'sinusoid comprimat, cu hematii', { beats: [1] }), lbl([big.x, big.y + 90], 'vacuolă mare, unică, goală', { beats: [2] }), lbl([nx, ny + 45], 'nucleu împins, turtit (semilună)', { beats: [3] }), lbl([lean.x, lean.y + 80], 'hepatocit fără grăsime: nucleu central', { beats: [4] })],
    draw(g, t, b) { stField(g, t); ring(g, b, 0, 830, 160, 80); ring(g, b, 1, 330, sinY, 150, 16); ring(g, b, 2, big.x, big.y, 62); ring(g, b, 3, nx, ny, 22); ring(g, b, 4, lean.x, lean.y, 62); },
  };
}
function stWhy() {
  const cx = 330, cy = 470; const hx = 790, hy = 470, hr = 165;
  const hex = (r) => { const p = new Path2D(); for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283 + Math.PI / 6; k ? p.lineTo(hx + Math.cos(a) * r, hy + Math.sin(a) * r) : p.moveTo(hx + Math.cos(a) * r, hy + Math.sin(a) * r); } p.closePath(); return p; };
  return {
    home: HOME, cams: [cam(300, 470, 1.4), cam(330, 520, 1.5), cam(420, 470, 1.4), cam(790, 470, 1.6)],
    anchors: [[60, 330], [250, 650], [560, 330], [960, 300]],
    labels: [lbl([120, 300], 'acizi grași ↑'), lbl([330, 720], 'β-oxidare ↓'), lbl([600, 560], 'export ca lipoproteine ✕'), lbl([790, 690], 'centru = v. centrolobulară · colțuri = spații porte')],
    phase: (i) => ['prea mulți acizi grași', 'prea puțină ardere', 'export blocat', 'distribuția în lobul'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      const st = b.i < 0 ? 4 : b.i + clamp(b.bt / 3);
      // hepatocitul
      const cell = new Path2D(); cell.roundRect(cx - 220, cy - 190, 440, 380, 40);
      paint(g, cell, '#eaa6ca', '#dc8ab7', '#ffd6e8', [cx - 220, cy - 190, 440, 380], OUT, 7);
      // picături de trigliceride care confluează într-o vacuolă mare
      const big = clamp(st / 3.2); const vr = lerp(40, 140, big);
      srand(5); for (let k = 0; k < 9; k++) { const a = rr(0, 6.28), d = lerp(140, 30, big) * rr(0.6, 1); const x = cx + 20 + Math.cos(a) * d, y = cy + Math.sin(a) * d * 0.8; const r = lerp(16, 4, big); if (r > 5) { g.save(); g.fillStyle = '#fffdfd'; g.strokeStyle = '#a9578a'; g.lineWidth = 2.5; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke(); g.restore(); } }
      g.save(); g.fillStyle = '#fffdfd'; g.strokeStyle = '#a9578a'; g.lineWidth = 4; g.beginPath(); g.arc(cx + 20, cy, vr, 0, 7); g.fill(); g.stroke(); g.restore();
      txt(g, 'trigliceride', cx + 20, cy + 10, 26, '#c23a7a');
      // nucleul: împins spre periferie pe măsură ce vacuola crește
      const nx = lerp(cx - 120, cx - 170, big), ny = lerp(cy - 60, cy - 120, big);
      if (big < 0.85) paint(g, blob(nx, ny, 32, 28, 0, t, 0.03, 10, 2), HE.nuc, HE.nucS, HE.nucL, bb(nx, ny, 32, 28), OUT, 3);
      else { g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 22; g.beginPath(); g.arc(cx + 20, cy, vr + 22, Math.PI * 1.1, Math.PI * 1.35); g.stroke(); g.strokeStyle = HE.nuc; g.lineWidth = 15; g.stroke(); g.restore(); }
      // 1 · acizi grași care intră
      for (let k = 0; k < 6; k++) { const f = ((t * 0.3 + k / 6) % 1); const x = lerp(-60, cx - 150, f), y = cy - 60 + Math.sin(k * 2) * 70; g.save(); g.globalAlpha = st > 0 ? 1 : 0.4; g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 9, 0, 7); g.fill(); g.stroke(); g.restore(); }
      arrow(g, -40, cy - 60, cx - 230, cy - 60, '#ffe36e', 6);
      // 2 · mitocondria (β-oxidare) blocată
      const mx = cx - 40, my = cy + 140; paint(g, blob(mx, my, 50, 24, 0.2, t, 0.05, 12, 1), '#ffb36b', '#e8954f', null, bb(mx, my, 50, 24), OUT, 4);
      g.save(); g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); for (let k = 0; k < 5; k++) { g.moveTo(mx - 36 + k * 18, my - 14); g.quadraticCurveTo(mx - 28 + k * 18, my, mx - 36 + k * 18, my + 14); } g.stroke(); g.restore(); txt(g, 'β-ox', mx, my + 9, 20, '#fff');
      if (st > 1) { g.save(); g.globalAlpha = clamp(st - 1); g.strokeStyle = '#ff4d4d'; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(mx - 40, my - 34); g.lineTo(mx + 40, my + 34); g.moveTo(mx + 40, my - 34); g.lineTo(mx - 40, my + 34); g.stroke(); g.restore(); }
      // 3 · exportul (lipoproteine) blocat
      arrow(g, cx + 160, cy + 60, cx + 290, cy + 60, '#9dff8a', 6);
      if (st > 2) { g.save(); g.globalAlpha = clamp(st - 2); g.strokeStyle = '#ff4d4d'; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx + 210, cy + 30); g.lineTo(cx + 260, cy + 90); g.moveTo(cx + 260, cy + 30); g.lineTo(cx + 210, cy + 90); g.stroke(); g.restore(); }
      // 4 · lobulul: centrolobulară (hipoxie) · periferolobulară (metabolic) · difuză (alcool)
      const zi = b.i === 3 ? Math.floor((b.bt / 2.2) % 3) : -1;
      g.save(); g.fillStyle = '#f2c6da'; g.strokeStyle = OUT; g.lineWidth = 6; g.fill(hex(hr)); g.stroke(hex(hr)); g.restore();
      if (zi === 0 || zi === 2) { g.save(); g.fillStyle = 'rgba(255,253,253,.9)'; g.beginPath(); g.arc(hx, hy, zi === 2 ? hr * 0.95 : 75, 0, 7); g.fill(); g.restore(); }
      if (zi === 1) { g.save(); g.fillStyle = 'rgba(255,253,253,.9)'; for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283 + Math.PI / 6; g.beginPath(); g.arc(hx + Math.cos(a) * hr, hy + Math.sin(a) * hr, 62, 0, 7); g.fill(); } g.restore(); }
      g.save(); g.fillStyle = '#7fb0ff'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(hx, hy, 20, 0, 7); g.fill(); g.stroke(); for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283 + Math.PI / 6; g.fillStyle = '#9dff8a'; g.beginPath(); g.arc(hx + Math.cos(a) * hr, hy + Math.sin(a) * hr, 13, 0, 7); g.fill(); g.stroke(); } g.restore();
      if (zi >= 0) txt(g, ['centrolobulară: hipoxie', 'periferolobulară: metabolic, obezitate', 'difuză: alcoolism'][zi], 790, 215, 24, '#ffe36e');
    },
  };
}

/* =============================================================== LAMA 15 · PERICARDITĂ FIBRINOASĂ */
function pcRec() {
  return {
    // ordinea punctelor: fibrina → mezoteliul lipsește → infiltratul → organizarea → țesutul subepicardic
    home: HOME, cams: [cam(500, 280, 1.5), cam(300, 362, 2.6), cam(500, 420, 1.9), cam(500, 540, 1.7), cam(500, 760, 1.3)],
    anchors: [[540, 170], [300, 330], [300, 400], [470, 500], [500, 640]],
    labels: [lbl([500, 130], 'fibrină: strat roz, franjurat, cu vilozități', { beats: [-1, 0] }), lbl([300, 410], 'mezoteliul lipsește sub fibrină', { beats: [1] }), lbl([520, 485], 'neutrofile, limfocite, macrofage; vase congestionate', { beats: [2] }), lbl([500, 625], 'organizare: fibroblaste + capilare noi', { beats: [3] }), lbl([500, 905], 'grăsime subepicardică + miocard', { beats: [4] })],
    draw(g, t, b) { pcField(g, t); ring(g, b, 0, 500, 280, 470, 90); ring(g, b, 1, 300, 362, 120, 14); ring(g, b, 2, 500, 420, 330, 60); ring(g, b, 3, 500, 540, 420, 70); ring(g, b, 4, 500, 780, 470, 140); },
  };
}
function pcWhy() {
  return {
    home: HOME, cams: [cam(500, 440, 1.05), cam(500, 460, 1.1), cam(500, 520, 1.1), cam(500, 520, 1.05)],
    anchors: [[80, 300], [700, 360], [210, 600], [500, 700]],
    labels: [lbl([500, 70], 'foița parietală (se separă la fiecare bătaie)'), lbl([800, 600], 'vas: permeabilitate ↑↑')],
    phase: (i) => ['fibrinogenul trece → fibrină', 'neutrofile prinse; mezoteliu distrus', 'vase congestionate', 'organizare → aderențe'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      const st = b.i < 0 ? 4 : b.i + clamp(b.bt / 3);
      const beat = REDUCED ? 0 : Math.max(0, Math.sin(t * 3.2)); const topY = 130 + 70 * beat; const base = 470;
      // epicard (visceral) cu țesutul de dedesubt
      g.save(); g.fillStyle = '#f5c9dc'; g.fillRect(-40, base, W + 80, H); g.restore();
      // vasul congestionat din care iese fibrinogenul
      capillary(g, [[-40, 640], [300, 600], [700, 640], [1040, 600]], 70 + (st > 2 ? 14 * clamp(st - 2) : 0), t, { n: 16, speed: 0.03 });
      for (let k = 0; k < 10; k++) { const f = ((t * 0.35 + k / 10) % 1); const x = 80 + k * 90 + Math.sin(k) * 20, y = lerp(600, base - 30, f); g.save(); g.globalAlpha = (1 - f) * 0.9 + 0.1; g.translate(x, y); g.rotate(k); g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.moveTo(-9, 0); g.lineTo(9, 0); g.stroke(); g.strokeStyle = '#ffe36e'; g.lineWidth = 4; g.stroke(); g.restore(); }
      // fibrina pe seroasă, trasă în vilozități de foița care se separă
      const grow = clamp(st * 0.7 + 0.3);
      const p = new Path2D(); p.moveTo(-40, base); for (let x = -40; x <= W + 40; x += 6) { const v = villi(x) * grow * (0.75 + 0.35 * beat); p.lineTo(x, base - Math.min(v, base - topY - 8)); } p.lineTo(W + 40, base); p.closePath();
      paint(g, p, '#f08cba', '#e273a8', '#ffc3dd', [-40, base - 200, W + 80, 200], OUT, 5);
      // fire de fibrină între cele două foițe
      g.save(); g.strokeStyle = 'rgba(255,190,220,.8)'; g.lineWidth = 3; for (let x = 30; x < W; x += 70) { const v = villi(x) * grow; if (v < 120) continue; g.beginPath(); g.moveTo(x, base - Math.min(v, base - topY - 8)); g.lineTo(x + 6, topY + 10); g.stroke(); } g.restore();
      // foița parietală
      const par = new Path2D(); par.rect(-40, topY - 70, W + 80, 70); paint(g, par, '#f3b4cf', null, null, [-40, topY - 70, W + 80, 70], OUT, 5);
      // neutrofile prinse
      if (st > 1) { srand(9); for (let k = 0; k < 14; k++) { const x = rr(40, 960); const y = base - rr(15, villi(x) * grow * 0.7); g.save(); g.globalAlpha = clamp(st - 1); neutrophil(g, x, y, 0.85, t, k); g.restore(); } }
      // organizarea: fibroblaste + capilare care cresc din bază
      if (st > 3) { const f = clamp(st - 3); for (let k = 0; k < 6; k++) { const x = 100 + k * 160; g.save(); g.globalAlpha = f; fibroSp(g, x + 40, base - 30 * f, 1.2, -1.2, t, k); g.strokeStyle = OUT; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, base + 40); g.lineTo(x - 10, base - 70 * f); g.stroke(); g.strokeStyle = '#ff6f86'; g.lineWidth = 8; g.stroke(); g.restore(); } }
      txt(g, 'cavitatea pericardică', 500, topY + 50, 24, '#ffe36e');
    },
  };
}

/* =============================================================== LAMA 16 · ABCESE HEPATICE */
function abRec() {
  // ordinea fișei: ob. mic (centru → membrană → capsulă → ficatul din jur), apoi ob. mare (neutrofile → detritus)
  return {
    home: HOME, cams: [cam(500, 470, 1.25), cam(500, 150, 2.2), cam(860, 470, 2.2), cam(500, 860, 1.8), cam(470, 450, 2.6), cam(600, 560, 2.6)],
    anchors: [[400, 300], [500, 110], [880, 400], [300, 880], [430, 400], [650, 520]],
    labels: [lbl([500, 640], 'centru: puroi (lichefiere)', { beats: [-1, 0] }), lbl([500, 200], 'membrana piogenă', { beats: [1] }), lbl([860, 560], 'capsulă: granulație → fibroză', { beats: [2] }), lbl([500, 905], 'hepatocite comprimate · abcese multiple', { beats: [3] }), lbl([470, 520], 'neutrofile; piocite = nuclei picnotici', { beats: [4] }), lbl([600, 620], 'detritus eozinofil, fibrină, hematii', { beats: [5] })],
    draw(g, t, b) { abField(g, t); ring(g, b, 0, 500, 470, 300, 270); ring(g, b, 1, 500, 150, 120, 36); ring(g, b, 2, 905, 470, 40, 120); ring(g, b, 3, 500, 900, 220, 40); if (b.i === 3) glowRing(g, 905, 95, 90, 90, 0, ease(b.bt * 1.4), '#7fe8ff'); ring(g, b, 4, 470, 450, 80); ring(g, b, 5, 600, 560, 80); },
  };
}
function abWhy() {
  return {
    home: HOME, cams: [cam(500, 500, 1.02), cam(500, 500, 1.02), cam(520, 480, 1.02), cam(520, 430, 1.02), cam(520, 450, 1.02)],
    anchors: [[470, 850], [160, 800], [920, 640], [880, 110], [640, 300]],
    labels: [lbl([520, 905], 'biliar: colangită'), lbl([140, 905], 'portal: apendicită, diverticulită'), lbl([900, 760], 'arterial: sepsis'), lbl([760, 215], 'contiguitate'), lbl([600, 560], 'amibian', { beats: [4] })],
    phase: (i) => ['calea biliară', 'calea portală', 'calea arterială', 'contiguitate / direct', 'abcesul amibian'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      const liv = new Path2D(); liv.moveTo(110, 360); liv.bezierCurveTo(200, 160, 760, 140, 900, 300); liv.bezierCurveTo(960, 380, 880, 560, 700, 600); liv.bezierCurveTo(500, 650, 220, 620, 120, 520); liv.closePath();
      paint(g, liv, '#a94a52', '#83343e', '#cf7880', [110, 150, 850, 480], OUT, 8);
      const routes = [
        { c: '#9dff8a', p: [[520, 920], [500, 760], [470, 620], [430, 470]], ab: [[430, 450], [380, 400]] },
        { c: '#7fa8ff', p: [[120, 900], [260, 760], [340, 620], [300, 470]], ab: [[300, 450], [250, 400]] },
        { c: '#ff6f86', p: [[960, 780], [800, 620], [640, 460], [560, 330]], ab: [[560, 320], [700, 360], [470, 300], [780, 420], [350, 520], [620, 520]] },
        { c: '#ffb36b', p: [[960, 60], [890, 170], [840, 260]], ab: [[820, 280]] },
      ];
      routes.forEach((r, k) => {
        const on = b.i === k || b.i < 0; g.save(); g.globalAlpha = on ? 1 : 0.3; g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 24; g.beginPath(); r.p.forEach((q, j) => (j ? g.lineTo(...q) : g.moveTo(...q))); g.stroke(); g.strokeStyle = r.c; g.lineWidth = 14; g.stroke(); g.restore();
        if (b.i === k) { const f = ((t * 0.35) % 1); const n = r.p.length - 1; const s = Math.min(n - 1e-3, f * n); const i = Math.floor(s), e = s - i; for (let j = 0; j < 4; j++) { const ee = clamp(e - j * 0.08); g.save(); g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(lerp(r.p[i][0], r.p[i + 1][0], ee), lerp(r.p[i][1], r.p[i + 1][1], ee), 8, 0, 7); g.fill(); g.stroke(); g.restore(); } }
        if (b.i === k || b.i < 0) r.ab.forEach(([x, y], j) => { const sz = (k === 2 ? 22 : 34) * (b.i === k ? ease(b.bt / 2 - j * 0.1) : 1); if (sz <= 1) return; g.save(); g.fillStyle = '#f3dc7a'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(x, y, sz, 0, 7); g.fill(); g.stroke(); g.restore(); });
      });
      if (b.i === 4 || b.i < 0) { const s = b.i === 4 ? ease(b.bt / 2) : 1; g.save(); g.fillStyle = '#c99a6a'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.ellipse(600, 430, 110 * s, 95 * s, 0.2, 0, 7); g.fill(); g.stroke(); g.restore(); if (b.i === 4) txt(g, 'unic, mare · „pastă de anșoa”', 520, 700, 26, '#ffe36e'); }
      txt(g, 'ficat', 230, 330, 30, '#fff');
    },
  };
}

/* =============================================================== LAMA 17 · LIMFADENITĂ TBC */
function tbRec() {
  const [cx, cy] = TB; const L1 = [cx + Math.cos(0.35) * 290, cy + Math.sin(0.35) * 272];
  return {
    home: HOME, cams: [cam(200, 300, 1.6), cam(640, 540, 1.6), cam(200, 240, 2.4), cam(cx - 280, cy - 40, 3), cam(L1[0], L1[1], 2.6), cam(cx, cy - 380, 2.2)],
    anchors: [[90, 90], [640, 380], [200, 150], [cx - 300, cy - 125], [L1[0], L1[1] - 70], [cx, cy - 430]],
    labels: [lbl([150, 470], 'țesut limfoid restant (periferie)', { beats: [-1, 0] }), lbl([640, 560], 'necroză cazeoasă: roz, amorfă, granulară', { beats: [1] }), lbl([200, 340], 'granulom: epitelioide + celulă gigantă', { beats: [2] }), lbl([cx - 255, cy + 20], 'epitelioide: nucleu „în talpă de pantof”', { beats: [3] }), lbl([L1[0], L1[1] + 75], 'Langhans: nuclei în potcoavă', { beats: [4] }), lbl([cx, cy - 330], 'coroană de limfocite + fibroblaste', { beats: [5] })],
    draw(g, t, b) { tbFieldF(g, t); ring(g, b, 0, 110, 300, 100, 260); ring(g, b, 1, 640, 540, 245, 228); ring(g, b, 2, 200, 230, 100, 90); ring(g, b, 3, cx - 300, cy - 40, 42, 72); ring(g, b, 4, L1[0], L1[1], 64, 52); ring(g, b, 5, cx, cy - 375, 120, 30); },
  };
}
function tbWhy() {
  const cx = 500, cy = 470;
  return {
    home: HOME, cams: [cam(560, 440, 1.15), cam(560, 420, 1.12), cam(500, 470, 1.08), cam(500, 470, 1.05)],
    anchors: [[300, 300], [960, 380], [760, 150], [760, 470]],
    phase: (i) => ['bacilul supraviețuiește în macrofag', 'Th1 → IFN-γ → activare', 'epitelioide → Langhans', 'cazeificare: hipoxie + radicali liberi'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      const st = b.i < 0 ? 4 : b.i + clamp(b.bt / 3);
      if (st < 2) {
        // macrofagul cu bacili în el; limfocitul T CD4 Th1 și IFN-γ
        const act = clamp(st - 1);
        if (act < 0.5) { paint(g, blob(cx, cy, 120, 96, 0.3, t, 0.13, 14, 2), '#f7c6d9', '#eba2bf', '#fff0f6', bb(cx, cy, 120, 96), OUT, 6); g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 34; g.beginPath(); g.arc(cx - 40, cy - 10, 32, Math.PI * 0.45, Math.PI * 1.6); g.stroke(); g.strokeStyle = '#4a3aa8'; g.lineWidth = 26; g.stroke(); g.restore(); }
        else epithelioid(g, cx, cy, 2.6, 0.2, t, 3);
        [[cx + 40, cy - 20, 0.4], [cx + 60, cy + 25, -0.6], [cx + 10, cy + 40, 1.2], [cx + 70, cy - 40, 2]].forEach(([x, y, a]) => bacillus(g, x + Math.sin(t * 2 + a) * 3, y, a, 1));
        txt(g, 'bacilul TBC trăiește în macrofag', cx, cy + 190, 26, '#ff8a8a');
        if (st > 1) { const tx = 820, ty = 300; lymphocyte(g, tx, ty, 1.5, t); txt(g, 'T CD4 Th1', tx, ty - 70, 24, '#c9b3ff'); for (let k = 0; k < 6; k++) { const f = ((t * 0.5 + k / 6) % 1); const x = lerp(tx - 40, cx + 90, f), y = lerp(ty + 10, cy - 30, f) + Math.sin(k * 3 + f * 6) * 20; g.save(); g.fillStyle = '#9dff8a'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 8, 0, 7); g.fill(); g.stroke(); g.restore(); } txt(g, 'IFN-γ', 700, 420, 28, '#9dff8a'); }
        return;
      }
      // granulomul care se construiește
      const n = 12; const f = clamp(st - 2);
      if (st >= 3) { const c = clamp(st - 3); const p = new Path2D(); p.ellipse(cx, cy, 150, 140, 0, 0, 7); g.save(); g.globalAlpha = c; paint(g, p, '#f2a4c6', '#ea93b9', '#ffd6e8', [cx - 150, cy - 140, 300, 280], 'rgba(42,21,52,.45)', 3); g.clip(p); dots(g, 120, cx, cy, 148, 138, '#d784ae', 3, 9); g.restore(); txt(g, 'cazeum', cx, cy + 10, 34, '#fff'); }
      for (let k = 0; k < n; k++) { const a = k / n * 6.283; const r = st >= 3 ? 210 : lerp(320, 190, f); epithelioid(g, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.92, 1.05, a + Math.PI / 2, t, k); }
      // fuziunea: două epitelioide → Langhans (nucleii migrează la periferie, în potcoavă)
      const lx = cx + 10, ly = st >= 3 ? cy - 300 : cy;
      langhans(g, lx, ly, st >= 3 ? 0.62 : lerp(0.3, 0.75, f), t, lerp(0.35, 1, f));
      if (st < 3) txt(g, 'fuziune → Langhans', cx + 200, cy + 330, 28, '#ffe36e'); else txt(g, 'hipoxie + radicali liberi', cx + 200, cy + 330, 28, '#ffe36e');
      srand(4); for (let k = 0; k < 40; k++) { const a = rr(0, 6.283), r = rr(330, 420); lymphocyte(g, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.92, 0.42, t); }
    },
  };
}

/* =============================================================== LAMA 18 · GRANULOM DE CORP STRĂIN */
function csRec() {
  const c0 = GC[1];
  // ordinea fișei: ob. mic (material → gigante mulate → infiltrat → granulație + fibroză), apoi ob. mare (nucleii dezordonați)
  return {
    home: HOME, cams: [cam(520, 400, 1.6), cam(500, 420, 1.3), cam(860, 420, 1.8), cam(500, 860, 1.6), cam(c0.x, c0.y, 2.8)],
    anchors: [[520, 300], [300, 320], [860, 300], [500, 820], [c0.x, c0.y - 70]],
    labels: [lbl([520, 420], 'material străin: cheratină lamelară', { beats: [-1, 0] }), lbl([300, 490], 'celule gigante mulate pe material', { beats: [1] }), lbl([860, 560], 'macrofage, limfocite', { beats: [2] }), lbl([500, 905], 'țesut de granulație + fibroză', { beats: [3] }), lbl([c0.x, c0.y + 75], 'nuclei dezordonați, în toată citoplasma', { beats: [4] })],
    draw(g, t, b) { csFieldF(g, t); ring(g, b, 0, 520, 395, 210, 160); ring(g, b, 1, 300, 400, 130, 60, 1.2); ring(g, b, 2, 860, 420, 70, 140); ring(g, b, 3, 500, 860, 300, 60); ring(g, b, 4, c0.x, c0.y, 130, 60); },
  };
}
function csWhy() {
  const cx = 500, cy = 430;
  return {
    home: HOME, cams: [cam(500, 440, 1.2), cam(500, 440, 1.15), cam(500, 440, 1.15), cam(500, 470, 1.05)],
    anchors: [[160, 330], [870, 300], [160, 560], [870, 800]],
    phase: (i) => ['material nedigerabil', 'fagocitoză „frustrată”', 'fuziune (IL-4, IL-13)', 'granulom + fibroză'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      const st = b.i < 0 ? 4 : b.i + clamp(b.bt / 3);
      if (st >= 3) { const f = clamp(st - 3); g.save(); g.globalAlpha = f; g.strokeStyle = '#f7a7c8'; for (let k = 0; k < 8; k++) { g.lineWidth = 12; g.beginPath(); g.ellipse(cx, cy, 300 + k * 18, 210 + k * 16, 0, 0, 7); g.stroke(); } g.restore(); }
      // firul de sutură (material nedigerabil)
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 30; g.beginPath(); g.moveTo(cx - 220, cy + 30); g.bezierCurveTo(cx - 80, cy - 70, cx + 80, cy + 90, cx + 220, cy - 20); g.stroke(); g.strokeStyle = '#8fb6ff'; g.lineWidth = 20; g.stroke(); g.restore();
      txt(g, 'sutură · talc · cheratină', cx, cy - 170, 26, '#8fb6ff');
      if (st >= 1 && st < 2) { const f = clamp(st - 1); [[cx - 200, cy - 110], [cx + 30, cy - 120], [cx + 200, cy + 110], [cx - 80, cy + 120]].forEach(([x, y], k) => { macrophageP(g, lerp(x * 1.2 - cx * 0.2, x, f), y + Math.sin(t * 3 + k) * 6, 1.4, t, k); }); txt(g, 'prea mare / inert: nu poate fi înghițit', cx, cy + 250, 26, '#ffe36e'); }
      if (st >= 2) { const f = st >= 3 ? 1 : clamp(st - 2); const p = new Path2D(); p.ellipse(cx, cy + 10, lerp(150, 260, f), lerp(70, 110, f), -0.05, 0, 7);
        srand(12); const nuc = []; for (let k = 0; k < 16; k++) nuc.push([cx + rr(-220, 220) * f + rr(-30, 30) * (1 - f), cy + 10 + rr(-80, 80) * f, rr(0, 3)]);
        g.save(); g.globalAlpha = 0.92; fbgc(g, p, bb(cx, cy, 260, 110), nuc.filter(([x, y]) => ((x - cx) ** 2) / (lerp(150, 260, f) ** 2 * 0.8) + ((y - cy - 10) ** 2) / (lerp(70, 110, f) ** 2 * 0.7) < 1), t); g.restore();
        g.save(); g.lineCap = 'round'; g.globalAlpha = 0.85; g.strokeStyle = '#8fb6ff'; g.lineWidth = 16; g.beginPath(); g.moveTo(cx - 220, cy + 30); g.bezierCurveTo(cx - 80, cy - 70, cx + 80, cy + 90, cx + 220, cy - 20); g.stroke(); g.restore();
        if (st < 3) txt(g, 'celulă gigantă de corp străin: nuclei dezordonați', cx, cy + 250, 24, '#ffe36e'); }
      if (st >= 3) { srand(3); for (let k = 0; k < 18; k++) { const a = rr(0, 6.28); const x = cx + Math.cos(a) * 330, y = cy + Math.sin(a) * 240; k % 2 ? lymphocyte(g, x, y, 0.5, t) : epithelioid(g, x, y, 0.8, a, t, k); } txt(g, 'persistă cât persistă materialul', cx, cy + 330, 26, '#9dff8a'); }
    },
  };
}

// „De ce arată așa” + DD pe același slide: după punctele de mecanism (from), scena trece pe comparația desenată
function withDD(fn) {
  return ({ spec }) => {
    const sc = fn({ spec }); const o = spec.dd; const from = o.from; const n = (spec.points || []).length;
    const pre = Array.from({ length: from + 1 }, (_, k) => k - 1);
    (sc.labels || []).forEach((l) => { l.beats = (l.beats || pre).filter((x) => x < from); });
    const ddL = [lbl([260, 255], o.l, { beats: Array.from({ length: n - from }, (_, k) => from + k) }), lbl([740, 255], o.r, { beats: Array.from({ length: n - from }, (_, k) => from + k) })];
    const cams = (sc.cams || []).slice(0, from); const anchors = (sc.anchors || []).slice(0, from);
    for (let k = from; k < n; k++) { cams.push(HOME); anchors.push(() => (curB >= from ? [[40, 50], [960, 50], [500, 900], [620, 900]][k - from] : [-9999, -9999])); }
    const anc = anchors.map((a, k) => (k < from ? () => (curB < from ? (typeof a === 'function' ? a() : a) : [-9999, -9999]) : a));
    let curB = -1; const ph = sc.phase;
    return {
      ...sc, cams, anchors: anc, labels: [...(sc.labels || []), ...ddL],
      phase: (i) => (i >= from ? 'diagnostic diferențial' : ph ? ph(i) : ''),
      draw(g, t, b) {
        curB = b.i; if (b.i < from) return sc.draw(g, t, b);
        bgFill(g, '#2e1838', '#140a1a');
        ddDraw(g, t, o, ease(b.bt * 1.5), ease(b.bt * 1.5));
      },
    };
  };
}

function fallback() { return { home: HOME, anchors: [], draw(g) { bgFill(g, '#2e1838', '#140a1a'); } }; }

const atlasAny = (a) => (a.spec.sceneOpts && a.spec.sceneOpts.a ? atlas2(a) : atlas(a));
export const SCENES = { atlas: atlasAny, mosaic, atlas2, cover, fisa, recap, ddPair, script, hkRec, hkWhy: withDD(hkWhy), stRec, stWhy: withDD(stWhy), pcRec, pcWhy: withDD(pcWhy), abRec, abWhy: withDD(abWhy), tbRec, tbWhy: withDD(tbWhy), csRec, csWhy: withDD(csWhy), fallback };
