// Scenele cartoon 2D pentru lamele 1–5 de Anatomie patologică (tulburări hemodinamice), colorație HE.
import {
  OUT, HE, clamp, lerp, ease, srand, rnd, rr, smooth, blob, blobPts, spindle, paint, bb, glowRing,
  rbc, capillary, makeNet, drawNet, roundRect, arrow, REDUCED,
} from './kit2d.js';
import { atlas, mosaic } from './atlas.js';

const W = 1000, H = 934;
const cam = (x, y, z) => ({ x, y, z });
const HOME = cam(500, 467, 1);
const lbl = (at, html, o = {}) => ({ at, html, ...o });
const bgFill = (g, a, b, w = W, h = H) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(-2000, -2000, w + 4000, h + 4000); };
const u01 = (b, k = 0.8) => (b.i >= 0 ? clamp(b.bt / (b.bd * k)) : 1);
const ring = (g, b, k, x, y, rx, ry = rx, rot = 0) => { if (b.i === k) glowRing(g, x, y, rx, ry, rot, ease(b.bt * 1.4)); };
const txt = (g, s, x, y, size = 28, col = '#fff', al = 'center') => { g.save(); g.font = `800 ${size}px "Plus Jakarta Sans", Inter, sans-serif`; g.textAlign = al; g.lineWidth = 7; g.strokeStyle = OUT; g.lineJoin = 'round'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); g.restore(); };
// câmp de microscop rotund (varianta corectă: conturul e cercul, nu ultimul path desenat înăuntru)
function field(g, x, y, r, inside) {
  const c = new Path2D(); c.arc(x, y, r, 0, Math.PI * 2);
  g.save(); g.clip(c); inside(); g.restore();
  g.save(); g.lineWidth = 10; g.strokeStyle = OUT; g.stroke(c); g.lineWidth = 4; g.strokeStyle = 'rgba(255,255,255,.35)'; g.stroke(c); g.restore();
}
const mini = (g, x, y, r, F, t, o) => field(g, x, y, r, () => { const s = 2 * r / H; g.save(); g.translate(x - W * s / 2, y - H * s / 2); g.scale(s, s); F(g, t, o); g.restore(); });
function dots(g, n, x, y, rx, ry, col, rad, seed) { srand(seed); g.fillStyle = col; for (let k = 0; k < n; k++) { const a = rnd() * 6.283, d = Math.sqrt(rnd()); g.beginPath(); g.arc(x + Math.cos(a) * rx * d, y + Math.sin(a) * ry * d, rad * rr(0.7, 1.2), 0, 7); g.fill(); } }

/* =============================================================== PLĂMÂN */
const LUNG = {};
function lungGeo(seed, R) {
  const key = seed + ':' + R; if (LUNG[key]) return LUNG[key];
  srand(seed); const A = [];
  for (let row = -1; row * R * 0.87 < H + R; row++) for (let col = -1; col * R < W + R; col++) {
    A.push({ x: col * R + (row % 2 ? R / 2 : 0) + rr(-R * 0.12, R * 0.12), y: row * R * 0.87 + rr(-R * 0.1, R * 0.1), r: R * rr(0.46, 0.52), rot: rr(0, 3), s: rr(0, 9) });
  }
  const S = []; // puncte în septuri (pentru nuclei și hematii)
  for (let k = 0; k < 2600 && S.length < 520; k++) { const p = [rr(-20, W + 20), rr(-20, H + 20)]; if (A.every((a) => Math.hypot(p[0] - a.x, p[1] - a.y) > a.r * 1.0)) S.push(p); }
  return (LUNG[key] = { A, S });
}
// o.kind(a,k) → 'air' | 'edema' | 'blood' | 'clot'; o.open = cât din alveolă e lumen (septuri subțiri ~1, groase ~0.78)
function lungField(g, t, o = {}) {
  const R = o.R || 150; const { A, S } = lungGeo(o.seed || 3, R); const open = o.open ?? 1;
  bgFill(g, o.sept || '#e79bc2', o.sept2 || '#dc84b2');
  if (o.fibro) { g.save(); g.strokeStyle = '#f4b9d4'; g.lineWidth = 3; srand(5); for (let k = 0; k < 160; k++) { const x = rr(0, W), y = rr(0, H), a = rr(0, 3); g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(a) * 20, y + Math.sin(a) * 20 + 6, x + Math.cos(a) * 40, y + Math.sin(a) * 40); g.stroke(); } g.restore(); }
  A.forEach((a, k) => {
    const kind = o.kind ? o.kind(a, k) : 'air';
    const p = blob(a.x, a.y, a.r * open, a.r * open * 0.94, a.rot, t, 0.1, 14, a.s);
    if (kind === 'air') { g.fillStyle = '#fff7fb'; g.fill(p); }
    else if (kind === 'edema') {
      g.fillStyle = '#f7b3d1'; g.fill(p);
      g.save(); g.clip(p); g.globalAlpha = 0.35; g.strokeStyle = '#ffd6e8'; g.lineWidth = 10; for (let j = 0; j < 3; j++) { g.beginPath(); const yy = a.y - a.r * 0.4 + j * a.r * 0.4 + Math.sin(t * 0.8 + k + j) * 6; g.moveTo(a.x - a.r, yy); g.bezierCurveTo(a.x - a.r / 3, yy - 16, a.x + a.r / 3, yy + 16, a.x + a.r, yy); g.stroke(); } g.restore();
    } else if (kind === 'blood') {
      g.fillStyle = '#c8243c'; g.fill(p); g.save(); g.clip(p); dots(g, 40, a.x, a.y, a.r, a.r, '#e8485e', 7, k + 1); dots(g, 18, a.x, a.y, a.r, a.r, '#a8162c', 6, k + 7); g.restore();
    }
    g.save(); g.lineJoin = 'round'; g.strokeStyle = o.rim || '#b0517f'; g.lineWidth = 3; g.stroke(p); g.restore();
    if (o.extra) o.extra(g, a, k, p);
  });
  // nuclei în septuri
  S.forEach((p, k) => {
    const ghost = o.ghost && o.ghost(p[0], p[1]);
    if (k % 3 === 0 && o.cong !== false) { // hematii în capilarele septale
      if (!ghost || k % 2) { g.fillStyle = o.cong ? '#d22a44' : '#e0607a'; g.beginPath(); g.arc(p[0] + 6, p[1] - 4, o.cong ? 8 : 5, 0, 7); g.fill(); if (o.cong) { g.beginPath(); g.arc(p[0] - 8, p[1] + 5, 7, 0, 7); g.fill(); } }
    } else if (k % 3 === 1) {
      if (ghost) { g.save(); g.strokeStyle = 'rgba(150,80,130,.35)'; g.lineWidth = 2; g.beginPath(); g.ellipse(p[0], p[1], 9, 6, k, 0, 7); g.stroke(); g.restore(); }
      else { g.fillStyle = HE.nuc; g.beginPath(); g.ellipse(p[0], p[1], 9, 6, k, 0, 7); g.fill(); }
    }
  });
}
function bubble(g, x, y, r) { g.save(); g.fillStyle = '#fffdfd'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke(); g.globalAlpha = 0.6; g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(x - r * 0.35, y - r * 0.35, r * 0.25, r * 0.15, -0.6, 0, 7); g.fill(); g.restore(); }
function siderophage(g, x, y, s, t, seed, blue = 0) {
  paint(g, blob(x, y, 40 * s, 34 * s, seed, t, 0.12, 12, seed), '#f2c4d8', '#e4a3c0', '#fff', bb(x, y, 40 * s, 34 * s), OUT, 4 * s);
  g.save(); g.fillStyle = HE.nuc; g.beginPath(); g.ellipse(x - 16 * s, y - 6 * s, 11 * s, 8 * s, 0.4, 0, 7); g.fill(); g.restore();
  srand(seed * 13 + 1); for (let k = 0; k < 16; k++) { const a = rnd() * 6.28, d = Math.sqrt(rnd()) * 26 * s; const col = blue > 0.5 ? (k % 2 ? '#2f4fd6' : '#1c2f9a') : (k % 2 ? '#b8762e' : '#7d4a1c'); g.fillStyle = col; g.beginPath(); g.arc(x + 6 * s + Math.cos(a) * d, y + Math.sin(a) * d * 0.8, rr(3.5, 6) * s, 0, 7); g.fill(); }
}
function neutrophil(g, x, y, s, t, seed, frag = false) {
  g.save(); g.fillStyle = 'rgba(246,206,224,.95)'; g.strokeStyle = OUT; g.lineWidth = 2.5 * s; g.beginPath(); g.arc(x, y, 20 * s, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#3b1f8c';
  if (!frag) { const L = [[-8, -5], [3, -9], [9, 4], [-3, 7]]; L.forEach(([dx, dy]) => { g.beginPath(); g.arc(x + dx * s, y + dy * s, 6 * s, 0, 7); g.fill(); }); g.strokeStyle = '#3b1f8c'; g.lineWidth = 3 * s; g.beginPath(); g.moveTo(x - 8 * s, y - 5 * s); g.lineTo(x + 3 * s, y - 9 * s); g.lineTo(x + 9 * s, y + 4 * s); g.lineTo(x - 3 * s, y + 7 * s); g.stroke(); }
  else { srand(seed); for (let k = 0; k < 7; k++) { g.beginPath(); g.arc(x + rr(-12, 12) * s, y + rr(-12, 12) * s, rr(2.5, 4.5) * s, 0, 7); g.fill(); } }
  g.restore();
}

// ---- câmpurile (reutilizate în coperți, DD, script, recap)
const edemField = (g, t) => { lungField(g, t, { seed: 3, R: 170, kind: () => 'edema', cong: true }); [[420, 380, 18], [610, 690, 26], [180, 640, 14], [820, 260, 20]].forEach(([x, y, r], k) => bubble(g, x + Math.sin(t * 0.7 + k) * 4, y + Math.cos(t * 0.6 + k) * 3, r)); };
const pneumoField = (g, t) => lungField(g, t, { seed: 3, R: 170, kind: () => 'air', cong: true, extra: (g2, a, k) => { if (a.x < -50 || a.y < -50) return; srand(k + 3); g2.save(); g2.strokeStyle = '#f07fb0'; g2.lineWidth = 3; for (let j = 0; j < 5; j++) { g2.beginPath(); g2.moveTo(a.x + rr(-60, 60), a.y + rr(-60, 60)); g2.lineTo(a.x + rr(-60, 60), a.y + rr(-60, 60)); g2.stroke(); } g2.restore(); for (let j = 0; j < 9; j++) neutrophil(g2, a.x + rr(-a.r * 0.6, a.r * 0.6), a.y + rr(-a.r * 0.6, a.r * 0.6), 0.75, 0, k * 9 + j); } });
const STAZA_SID = [[310, 280], [345, 312], [290, 320], [640, 520], [672, 548], [612, 560], [160, 700], [740, 210], [770, 236]];
const stazaField = (g, t, o = {}) => { lungField(g, t, { seed: 8, R: 175, open: 0.74, sept: '#ee9cc4', sept2: '#e48ab7', fibro: true, cong: true }); arteriole(g, 860, 760, 70); STAZA_SID.forEach(([x, y], k) => siderophage(g, x, y, 0.9, t, k + 2, o.blue)); };
function arteriole(g, x, y, r) { g.save(); g.fillStyle = '#e9789f'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke(); g.strokeStyle = '#c94d7d'; g.lineWidth = 3; for (let k = 0; k < 4; k++) { g.beginPath(); g.arc(x, y, r * (0.5 + k * 0.12), 0, 7); g.stroke(); } g.fillStyle = '#fff3f7'; g.beginPath(); g.arc(x, y, r * 0.32, 0, 7); g.fill(); g.stroke(); g.fillStyle = HE.nuc; for (let k = 0; k < 9; k++) { const a = k / 9 * 6.28; g.beginPath(); g.ellipse(x + Math.cos(a) * r * 0.66, y + Math.sin(a) * r * 0.66, 9, 4, a + 1.57, 0, 7); g.fill(); } g.restore(); }
const antraField = (g, t) => { lungField(g, t, { seed: 8, R: 175, open: 0.9, cong: false }); arteriole(g, 520, 470, 60); g.save(); srand(4); g.fillStyle = '#141014'; for (let k = 0; k < 90; k++) { const a = rnd() * 6.28, d = 75 + rnd() * 70; g.beginPath(); g.arc(520 + Math.cos(a) * d, 470 + Math.sin(a) * d * 0.8, rr(4, 9), 0, 7); g.fill(); } g.restore(); };
// infarct pulmonar: pleura sus, con cu baza la pleură
const inWedge = (x, y) => y > 90 && Math.abs(x - 600) < (y - 40) * 0.0 + 380 - (y - 90) * 0.42;
const infField = (g, t, o = {}) => {
  const k1 = o.prog ?? 1;
  lungField(g, t, { seed: 11, R: 120, kind: (a) => (inWedge(a.x, a.y) && k1 > 0.3 ? 'blood' : 'air'), ghost: (x, y) => inWedge(x, y) && k1 > 0.6, cong: true });
  g.fillStyle = '#2e1838'; g.fillRect(-2000, -2000, W + 4000, 2000);
  // pleura viscerală
  g.save(); g.fillStyle = '#f2b7d1'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(-20, 0); g.lineTo(W + 20, 0); g.lineTo(W + 20, 70); for (let x = W + 20; x >= -20; x -= 40) g.lineTo(x, 70 + Math.sin(x / 50) * 8); g.closePath(); g.fill(); g.stroke();
  g.strokeStyle = '#f8e07a'; g.lineWidth = 5; g.setLineDash([12, 9]); g.beginPath(); g.moveTo(240, 76); g.lineTo(960, 76); g.stroke(); g.restore();
  // contur con
  g.save(); g.setLineDash([16, 10]); g.strokeStyle = '#ffe36e'; g.lineWidth = 4; g.globalAlpha = 0.85; g.beginPath(); g.moveTo(220, 90); g.lineTo(600, 90 + 380 / 0.42); g.lineTo(980, 90); g.stroke(); g.restore();
};
const hemoField = (g, t) => lungField(g, t, { seed: 11, R: 120, kind: (a, k) => (k % 3 ? 'blood' : 'air'), cong: true });

/* =============================================================== RINICHI */
const REN = {};
function renGeo() {
  if (REN.T) return REN; srand(21); const T = []; const G = [[260, 220], [700, 640], [880, 180], [120, 700]];
  for (let y = 40; y < H + 60; y += 95) for (let x = 30 + (y / 95 % 2) * 48; x < W + 60; x += 96) { const p = [x + rr(-14, 14), y + rr(-12, 12)]; if (G.every(([gx, gy]) => Math.hypot(p[0] - gx, p[1] - gy) > 150)) T.push([...p, rr(36, 44)]); }
  REN.T = T; REN.G = G; return REN;
}
const renZone = (x, y) => { const b = 470 + 60 * Math.sin(y / 160); return x < b - 50 ? 'viable' : x < b + 40 ? 'rim' : 'dead'; };
function tubX(g, x, y, r, ghost, t) {
  const n = 9; g.save();
  g.fillStyle = ghost ? '#f58cbc' : '#efa6c6'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
  g.strokeStyle = ghost ? '#c97aa0' : OUT; g.lineWidth = ghost ? 3 : 3.5; g.stroke(); // membrana bazală păstrată
  g.fillStyle = '#fff2f7'; g.beginPath(); g.arc(x, y, r * 0.36, 0, 7); g.fill();
  if (ghost) { dots(g, 6, x, y, r * 0.28, r * 0.28, '#e88fb7', 3.5, Math.round(x)); }
  g.strokeStyle = ghost ? 'rgba(201,122,160,.45)' : '#c76b98'; g.lineWidth = 2;
  for (let k = 0; k < n; k++) { const a = k / n * 6.283; g.beginPath(); g.moveTo(x + Math.cos(a) * r * 0.36, y + Math.sin(a) * r * 0.36); g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); g.stroke(); }
  if (!ghost) { g.fillStyle = HE.nuc; for (let k = 0; k < n; k++) { const a = (k + 0.5) / n * 6.283; g.beginPath(); g.arc(x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7, 4.5, 0, 7); g.fill(); } }
  g.restore();
}
function glom(g, x, y, r, ghost, t) {
  g.save(); g.fillStyle = '#fff4f8'; g.strokeStyle = ghost ? '#c97aa0' : OUT; g.lineWidth = 5; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke(); g.restore();
  srand(Math.round(x + y)); for (let k = 0; k < 9; k++) { const a = k / 9 * 6.28 + rr(-0.2, 0.2), d = r * rr(0.25, 0.55); const cx = x + Math.cos(a) * d, cy = y + Math.sin(a) * d;
    paint(g, blob(cx, cy, r * 0.22, r * 0.18, a, t, 0.06, 10, k), ghost ? '#f8cfe0' : '#ee9ac0', null, null, bb(cx, cy, r * 0.22, r * 0.18), ghost ? '#cf86aa' : '#8e3a6a', 2.5);
    if (!ghost) { g.fillStyle = HE.nuc; g.beginPath(); g.arc(cx + 4, cy - 3, 5, 0, 7); g.fill(); } }
}
const renField = (g, t, o = {}) => {
  const { T, G } = renGeo(); const z = o.zone || renZone;
  bgFill(g, '#f3c3d8', '#ecb0cb');
  // interstițiu: hemoragie + neutrofile în lizereu
  srand(30); for (let k = 0; k < 700; k++) { const x = rr(0, W), y = rr(0, H); if (z(x, y) === 'rim') { g.fillStyle = k % 5 ? '#d42d45' : '#a3122a'; g.beginPath(); g.arc(x, y, 6, 0, 7); g.fill(); } }
  T.forEach(([x, y, r]) => tubX(g, x, y, r, z(x, y) === 'dead', t));
  G.forEach(([x, y]) => glom(g, x, y, 100, z(x, y) === 'dead', t));
  srand(31); for (let k = 0; k < 60; k++) { const x = rr(0, W), y = rr(0, H); if (z(x, y) === 'rim') neutrophil(g, x, y, 0.7, t, k); }
};
const ntaField = (g, t) => { const { T, G } = renGeo(); bgFill(g, '#f3c3d8', '#ecb0cb'); T.forEach(([x, y, r], k) => { tubX(g, x, y, r, k % 3 === 0, t); }); G.forEach(([x, y]) => glom(g, x, y, 100, false, t)); };

/* =============================================================== MIOCARD */
const MIO_A = -0.38;
const mioDead = (x, y) => { const u = x * Math.cos(-MIO_A) - y * Math.sin(-MIO_A); return u > 330 && u < 760; };
function mioField(g, t, o = {}) {
  const dead = o.dead || mioDead; bgFill(g, '#f8d9e6', '#f2c8da');
  g.save(); g.translate(500, 467); g.rotate(MIO_A); g.translate(-500, -467);
  for (let y = -380, k = 0; y < H + 380; y += 66, k++) {
    // fiecare fibră e întreruptă de discuri / benzi; o desenăm din segmente
    for (let x = -400 + (k % 2) * 90; x < W + 400; x += 210) {
      const cx = x + 100, cy = y; // centrul în cadrul rotit → în lume:
      const wx = 500 + (cx - 500) * Math.cos(MIO_A) - (cy - 467) * Math.sin(MIO_A), wy = 467 + (cx - 500) * Math.sin(MIO_A) + (cy - 467) * Math.cos(MIO_A);
      const d = o.normal ? false : dead(wx, wy);
      const hh = d ? 18 : 24; const p = new Path2D(); p.roundRect(x, y - hh, 200, hh * 2, 16);
      paint(g, p, d ? '#ff5f9b' : '#e77aa0', d ? null : '#d8628c', d ? '#ffc0d8' : null, [x, y - hh, 200, hh * 2], OUT, 4);
      if (!d) { g.save(); g.clip(p); g.strokeStyle = 'rgba(150,40,90,.45)'; g.lineWidth = 2; for (let sx = x + 6; sx < x + 200; sx += 11) { g.beginPath(); g.moveTo(sx, y - 24); g.lineTo(sx, y + 24); g.stroke(); } g.restore();
        paint(g, blob(x + 100, y, 22, 9, 0, t, 0.03, 10, k), HE.nuc, HE.nucS, HE.nucL, bb(x + 100, y, 22, 9), OUT, 2.5);
        g.save(); g.strokeStyle = '#7a2453'; g.lineWidth = 4; g.beginPath(); g.moveTo(x + 2, y - 22); g.lineTo(x + 2, y + 22); g.stroke(); g.restore(); }
    }
  }
  g.restore();
  if (!o.normal) {
    const loc = (x, y) => [500 + (x - 500) * Math.cos(MIO_A) + (y - 467) * Math.sin(MIO_A), 467 - (x - 500) * Math.sin(MIO_A) + (y - 467) * Math.cos(MIO_A)];
    const gap = (ly) => Math.abs((((ly + 380) % 66) + 66) % 66 - 33) < 9;
    srand(41); for (let k = 0; k < 1400; k++) { const x = rr(-20, W + 20), y = rr(-20, H + 20); const [lx, ly] = loc(x, y); if (!gap(ly)) continue;
      const u = x * Math.cos(-MIO_A) - y * Math.sin(-MIO_A);
      if (dead(x, y)) { if (k % 3 === 0) neutrophil(g, x, y, 0.62, t, k, k % 2 === 0); }
      else if ((u > 285 && u < 330) || (u > 760 && u < 805)) { g.fillStyle = '#d22a44'; g.beginPath(); g.arc(x, y, 7, 0, 7); g.fill(); }
    }
  }
}

/* =============================================================== TROMB */
function vesselLong(g, t, o = {}) {
  bgFill(g, '#f7d4e3', '#f0c2d7');
  // peretele vasului (sus, jos)
  [[60, 150], [784, 874]].forEach(([y0, y1]) => { const p = new Path2D(); p.rect(-30, y0, W + 60, y1 - y0); paint(g, p, '#ea8fb6', null, null, [-30, y0, W + 60, y1 - y0], OUT, 6); g.save(); g.clip(p); srand(y0); g.fillStyle = HE.nuc; for (let k = 0; k < 40; k++) { g.beginPath(); g.ellipse(rr(-20, W + 20), rr(y0 + 10, y1 - 10), 14, 4, rr(-0.1, 0.1), 0, 7); g.fill(); } g.restore(); });
  g.fillStyle = '#fff0f5'; g.fillRect(-30, 150, W + 60, 634);
}
const ZAHN = 7;
function trombField(g, t, o = {}) {
  vesselLong(g, t, o);
  const top = (x) => 330 + 40 * Math.sin(x / 120 + 1) + 18 * Math.sin(x / 47);
  const n = o.layers ?? ZAHN;
  for (let k = 0; k < n; k++) {
    const f0 = k / ZAHN, f1 = (k + 1) / ZAHN; const red = k % 2 === 1;
    const p = new Path2D(); const yA = (x) => lerp(784, top(x), f0), yB = (x) => lerp(784, top(x), f1);
    p.moveTo(-30, yA(-30)); for (let x = -30; x <= W + 30; x += 20) p.lineTo(x, yA(x) + Math.sin(x / 35 + k) * 5);
    for (let x = W + 30; x >= -30; x -= 20) p.lineTo(x, yB(x) + Math.sin(x / 35 + k + 1) * 5); p.closePath();
    g.fillStyle = red ? '#cf2c47' : '#efd0dd'; g.fill(p);
    g.save(); g.clip(p); if (red) dots(g, 140, 500, 560, 560, 260, '#ea5468', 6, k + 3); else { dots(g, 120, 500, 560, 560, 260, '#b98fb8', 3.5, k + 9); g.strokeStyle = '#f39abd'; g.lineWidth = 2.5; srand(k); for (let j = 0; j < 40; j++) { const x = rr(0, W), y = rr(150, 800); g.beginPath(); g.moveTo(x, y); g.lineTo(x + rr(20, 50), y + rr(-6, 6)); g.stroke(); } } g.restore();
  }
  if (n > 0) { g.save(); g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); for (let x = -30; x <= W + 30; x += 20) { const y = lerp(784, top(x), n / ZAHN) + Math.sin(x / 35 + n) * 5; x === -30 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); g.restore(); }
  // sângele care curge peste tromb
  for (let k = 0; k < 14; k++) { const u = ((k / 14) + (REDUCED ? 0 : t * 0.05)) % 1; const x = -40 + u * (W + 80); const y = 180 + ((k * 37) % Math.max(40, (top(x) - 210) * (n / ZAHN) + (1 - n / ZAHN) * 560)); rbc(g, x, Math.min(y, lerp(784, top(x), n / ZAHN) - 25), 0.8, 0.3, t); }
}
function fibrinField(g, t) {
  bgFill(g, '#f6d3e2', '#efc0d6');
  if (!REN.F) { srand(55); const N = []; for (let k = 0; k < 120; k++) N.push([rr(-30, W + 30), rr(-30, H + 30)]); REN.F = makeNet(N, 3, 170); }
  drawNet(g, REN.F, '#ec6fa3', 7, 1, OUT);
  srand(56); for (let k = 0; k < 10; k++) { const x = rr(60, 940), y = rr(60, 880); paint(g, blob(x, y, 55, 38, rr(0, 3), t, 0.15, 12, k), '#cdb3e3', '#b598d4', null, bb(x, y, 55, 38), OUT, 4); dots(g, 22, x, y, 42, 28, '#7d5aa8', 3.5, k + 40); }
  srand(57); for (let k = 0; k < 16; k++) rbc(g, rr(40, 960), rr(40, 900), 0.9, rr(0, 3), t);
  srand(58); for (let k = 0; k < 8; k++) neutrophil(g, rr(60, 940), rr(60, 880), 1.1, t, k);
}
function cheagField(g, t) {
  bgFill(g, '#2a1534', '#140a1a');
  const p = blob(500, 470, 420, 300, 0.05, t, 0.04, 16, 2); paint(g, p, '#8e1028', '#6a0a1d', '#c43a55', bb(500, 470, 420, 300), OUT, 7);
  g.save(); g.clip(p); g.fillStyle = '#f6d36a'; g.beginPath(); g.ellipse(500, 230, 430, 120, 0, 0, 7); g.fill(); g.globalAlpha = 0.35; g.fillStyle = '#fff'; g.beginPath(); g.ellipse(360, 390, 120, 40, -0.3, 0, 7); g.fill(); g.restore();
  g.save(); g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(p); g.restore();
}

/* =============================================================== COPERTA, FIȘA, RECAP */
const FIELDS = { edem: edemField, pneumo: pneumoField, staza: stazaField, antra: antraField, inf: infField, hemo: hemoField, ren: renField, nta: ntaField, ima: mioField, mio: (g, t) => mioField(g, t, { normal: true }), tromb: trombField, fibrin: fibrinField, cheag: cheagField };
const POS5 = [[200, 230], [500, 230], [800, 230], [350, 650], [650, 650]];
const NAMES5 = ['edem', 'staza', 'ren', 'ima', 'tromb'];
function cover() {
  const k = [0, 0, 0, 0, 0];
  return {
    home: HOME, cams: POS5.map(([x, y]) => cam(x, y, 1.9)), anchors: POS5.map(([x, y]) => [x - 120, y - 120]),
    labels: POS5.map(([x, y], i) => lbl([x, y + 170], ['edem pulmonar', 'stază + infarct', 'infarct renal', 'infarct miocardic', 'tromb mixt'][i])),
    draw(g, t, b) {
      bgFill(g, '#3a1d2a', '#140a12');
      POS5.forEach(([x, y], i) => { k[i] = lerp(k[i], b.i === i ? 1 : 0, 0.08); const F = i === 1 ? (gg, tt) => { stazaField(gg, tt); } : FIELDS[NAMES5[i]]; mini(g, x, y, 140 + k[i] * 6, F, t); if (k[i] > 0.05) glowRing(g, x, y, 155, 155, 0, k[i]); });
    },
  };
}
function fisa() {
  const rows = [['Organ', 1, '#ffd36e'], ['Leziune', 1, '#ffd36e'], ['Definiție', 1, '#ffd36e'], ['Descriere', 6, '#ff9fc6'], ['Cauze', 4, '#c9b3ff'], ['Complicații', 4, '#7fe8ff'], ['DD', 1, '#9dff8a']];
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
      // contorul de puncte (minim 5)
      const tot = b.i === 2 ? Math.min(5, Math.floor(b.bt * 2.2)) : b.i > 2 || b.i < 0 ? 5 : 0;
      const cx = 860, cy = 650; g.save(); g.strokeStyle = OUT; g.lineWidth = 34; g.beginPath(); g.arc(cx, cy, 90, 0, 7); g.stroke(); g.strokeStyle = tot >= 5 ? '#9dff8a' : '#ff9fc6'; g.lineWidth = 24; g.beginPath(); g.arc(cx, cy, 90, -1.57, -1.57 + 6.283 * tot / 5); g.stroke(); g.restore(); txt(g, `${tot}/5`, cx, cy + 14, 40); txt(g, 'minim 5 p', cx, cy + 140, 26, '#ffe36e');
      if (b.i === 3) { txt(g, 'cauză → leziune → complicație', 500, 880, 30, '#7fe8ff'); }
    },
  };
}
function recap() {
  const k = [0, 0, 0, 0, 0];
  return {
    home: HOME, cams: POS5.map(([x, y]) => cam(x, y, 1.6)), anchors: [],
    draw(g, t, b) { bgFill(g, '#3a1d2a', '#140a12'); POS5.forEach(([x, y], i) => { k[i] = lerp(k[i], b.i === i ? 1 : 0, 0.08); mini(g, x, y, 140, FIELDS[NAMES5[i]], t); if (k[i] > 0.05) glowRing(g, x, y, 155, 155, 0, k[i]); txt(g, ['1', '2', '3', '4', '5'][i], x - 110, y - 100, 34, '#ffe36e'); }); },
  };
}
function ddPair({ spec }) {
  const o = spec.sceneOpts;
  return {
    home: HOME, cams: [cam(500, 470, 1), cam(500, 470, 1), cam(500, 470, 1), cam(500, 470, 1)].slice(0, Math.max(1, (spec.points || []).length)),
    anchors: [[260, 160], [740, 160], [500, 800], [500, 860]].slice(0, (spec.points || []).length),
    labels: [lbl([260, 810], o.l), lbl([740, 810], o.r)],
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      mini(g, 260, 470, 225, FIELDS[o.a], t, o.ao); mini(g, 740, 470, 225, FIELDS[o.b], t, o.bo);
      txt(g, 'vs.', 500, 485, 40, '#ffe36e');
      if (b.i >= 0) { glowRing(g, 260, 470, 235, 235, 0, ease(b.bt * 1.5)); glowRing(g, 740, 470, 235, 235, 0, ease(b.bt * 1.5), '#7fe8ff'); }
    },
  };
}
function script({ spec }) {
  const o = spec.sceneOpts || {}; const n = spec.script.length; const tot = spec.durs.reduce((a, c) => a + c, 0);
  const WS = 600, HS = 897;
  return {
    W: WS, H: HS, home: cam(300, 448, 1), cams: null, anchors: [],
    phase: (i) => (i >= 0 ? `${spec.script[i].tm} · ${spec.script[i].at}` : ''),
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a', WS, HS);
      field(g, 300, 290, 230, () => { g.save(); g.translate(70, 60); g.scale(0.46, 0.49); FIELDS[o.f](g, t, o.fo); g.restore(); });
      const C0 = [300, 700], R = 130; let acc = 0;
      spec.durs.forEach((d, i) => { const a0 = acc / tot, a1 = (acc + d) / tot; acc += d; const on = i === b.i, done = i < b.i; g.save(); g.strokeStyle = OUT; g.lineWidth = 36; g.beginPath(); g.arc(C0[0], C0[1], R, -Math.PI / 2 + a0 * Math.PI * 2, -Math.PI / 2 + a1 * Math.PI * 2 - 0.03); g.stroke(); g.strokeStyle = on ? '#ff9fc6' : done ? '#c23a62' : '#4a3d58'; g.lineWidth = 26; if (on) { g.shadowColor = '#ff9fc6'; g.shadowBlur = 20; } g.stroke(); g.restore(); });
      let f = 0; if (b.i >= 0) { let a = 0; for (let k = 0; k < b.i; k++) a += spec.durs[k]; f = (a + spec.durs[b.i] * clamp(b.bt / b.bd)) / tot; }
      const ang = -Math.PI / 2 + f * Math.PI * 2; g.save(); g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(C0[0] + Math.cos(ang) * R, C0[1] + Math.sin(ang) * R, 16, 0, 7); g.fill(); g.stroke(); g.restore();
      const sec = Math.round(f * tot); txt(g, b.i >= 0 ? `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}` : '6 min', C0[0], C0[1] + 14, 40);
    },
  };
}

/* =============================================================== LAMA 1 · EDEM PULMONAR ACUT */
function edemMic() {
  return {
    home: HOME, cams: [cam(500, 470, 1.6), cam(420, 300, 2.2)], anchors: [[520, 420], [400, 250]],
    labels: [lbl([520, 560], 'alveolă plină cu transsudat', { beats: [-1, 0] }), lbl([380, 170], 'sept subțire, fără fibroză', { beats: [1] })],
    draw(g, t, b) {
      const fill = b.i < 0 ? 1 : b.i === 0 ? 0.35 + 0.65 * ease(b.bt / 2) : 1;
      lungField(g, t, { seed: 3, R: 170, kind: (a, k) => ((k * 7) % 10 < fill * 10 ? 'edema' : 'air'), cong: true });
      [[420, 380, 18], [610, 690, 26], [180, 640, 14]].forEach(([x, y, r], k) => bubble(g, x + Math.sin(t * 0.7 + k) * 4, y, r));
      ring(g, b, 0, 520, 470, 150, 130); ring(g, b, 1, 400, 250, 130, 50, -0.2);
    },
  };
}
function edemMare() {
  const ALV = [[260, 300, 250, 230], [760, 640, 260, 240]];
  return {
    home: HOME, cams: [cam(280, 320, 1.6), cam(520, 470, 1.8), cam(760, 640, 1.6)], anchors: [[200, 220], [520, 440], [830, 560]],
    labels: [lbl([260, 560], 'transsudat roz-pal', { beats: [0] }), lbl([560, 360], 'capilar plin cu hematii', { beats: [1] }), lbl([760, 900], 'bule de aer = spumă', { beats: [2] })],
    draw(g, t, b) {
      bgFill(g, '#e894bd', '#dc80b0');
      ALV.forEach(([x, y, rx, ry], k) => { const p = blob(x, y, rx, ry, 0.3, t, 0.08, 16, k + 2); paint(g, p, '#f8bcd6', null, '#ffe2ef', bb(x, y, rx, ry), '#a54a7c', 5); g.save(); g.clip(p); dots(g, 18, x, y, rx, ry, '#fbd2e4', 9, k + 3); g.restore(); });
      capillary(g, [[-40, 1000], [300, 760], [520, 470], [700, 260], [1040, -40]], 54, t, { n: 12, speed: 0.03, wall: '#ef9cc2', lumen: '#ffe8f0' });
      [[700, 600, 46], [830, 720, 30], [620, 760, 22], [200, 250, 26]].forEach(([x, y, r], k) => bubble(g, x + Math.sin(t * 0.8 + k) * 6, y + Math.cos(t * 0.5 + k) * 4, r));
      ring(g, b, 0, 260, 300, 200, 180); ring(g, b, 1, 520, 470, 90, 160, 0.6); ring(g, b, 2, 740, 660, 150, 150);
    },
  };
}
function edemWhy() {
  const X = [210, 500, 790];
  return {
    home: HOME, cams: [cam(500, 700, 1.4), cam(500, 470, 1.15), cam(500, 420, 1.2), cam(790, 420, 1.7)], anchors: [[500, 820], [380, 300], [500, 230], [790, 240]],
    labels: [lbl([210, 640], 'normal: aer'), lbl([500, 640], 'lichidul urcă'), lbl([790, 640], 'plină + spumă'), lbl([500, 900], 'capilar: P hidrostatică ↑')],
    phase: (i) => ['P ↑ în capilar', 'edem interstițial', 'lichid în alveole', 'spumă'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      const st = b.i < 0 ? 4 : b.i + (b.i >= 0 ? clamp(b.bt / 3) : 0);
      // capilarul de jos, pulsatil
      const pw = 46 + (st > 0 ? 10 * Math.sin(t * 6) * clamp(st) : 0);
      capillary(g, [[-40, 790], [300, 770], [700, 790], [1040, 770]], pw, t, { n: 14, speed: 0.05 });
      if (st > 0) { for (let k = 0; k < 3; k++) { const yy = 740 - ((t * 60 + k * 40) % 120); g.save(); g.globalAlpha = clamp(st); arrow(g, X[k], 760, X[k], yy, '#7fe8ff', 6); g.restore(); } }
      X.forEach((x, k) => {
        const sw = k === 0 ? 0 : clamp(st - 1) * 22; // septul se îngroașă
        const p = blob(x, 400, 120, 150, 0, t, 0.05, 14, k);
        g.save(); g.fillStyle = '#e894bd'; g.beginPath(); g.ellipse(x, 400, 140 + sw, 170 + sw, 0, 0, 7); g.fill(); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(); g.restore();
        g.save(); g.fillStyle = '#fff7fb'; g.fill(p); g.clip(p);
        const lvl = k === 0 ? 0 : k === 1 ? clamp(st - 2) * 0.55 : clamp(st - 2);
        if (lvl > 0) { g.fillStyle = '#f7b3d1'; const top = 550 - lvl * 300 + Math.sin(t * 2 + k) * 5; g.fillRect(x - 160, top, 320, 400); }
        if (k === 2 && st > 3) for (let j = 0; j < 7; j++) bubble(g, x - 70 + (j * 37) % 140, 300 + (j * 53) % 180 + Math.sin(t + j) * 5, 12 + (j % 3) * 6);
        g.restore(); g.save(); g.strokeStyle = '#a54a7c'; g.lineWidth = 4; g.stroke(p); g.restore();
      });
      txt(g, '1', 500, 860, 30, '#ffe36e');
    },
  };
}

/* =============================================================== LAMA 2 · STAZĂ + INFARCT */
function stazaMic() {
  return {
    home: HOME, cams: [cam(330, 300, 2), cam(500, 470, 1.3), cam(500, 470, 1.4), cam(860, 760, 2.2)], anchors: [[330, 230], [520, 140], [470, 620], [860, 670]],
    labels: [lbl([330, 390], 'siderofage brune', { beats: [0] }), lbl([600, 400], 'capilare pline cu hematii', { beats: [1] }), lbl([470, 760], 'septuri groase, fibroase', { beats: [2] }), lbl([860, 870], 'arteriolă cu perete gros', { beats: [3] })],
    draw(g, t, b) { stazaField(g, t); ring(g, b, 0, 320, 300, 80, 70); ring(g, b, 2, 470, 650, 110, 60, 0.4); ring(g, b, 3, 860, 760, 90); if (b.i === 1) { const { S } = lungGeo(8, 175); S.filter((_, k) => k % 3 === 0).slice(0, 26).forEach((p) => glowRing(g, p[0] + 6, p[1] - 4, 16, 16, 0, ease(b.bt * 1.4), '#7fe8ff', 3)); } },
  };
}
function stazaMare() {
  return {
    home: HOME, cams: [cam(330, 430, 1.6), cam(640, 470, 1.6), cam(820, 760, 2), cam(330, 430, 1.4)], anchors: [[300, 230], [640, 280], [820, 660], [470, 280]],
    labels: [lbl([330, 650], 'siderofag: granule brun-aurii', { beats: [0] }), lbl([660, 870], 'sept fibrozat (colagen)', { beats: [1] }), lbl([820, 880], 'hematii', { beats: [2] }), lbl([330, 650], 'Perls: albastru de Prusia', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#fff6fa', '#f8e6ef');
      const sp = new Path2D(); sp.moveTo(560, -40); sp.bezierCurveTo(520, 300, 760, 520, 690, 980); sp.lineTo(840, 980); sp.bezierCurveTo(900, 520, 680, 300, 720, -40); sp.closePath();
      paint(g, sp, '#ee9cc4', '#e086b4', null, [560, -40, 280, 1020], OUT, 6);
      g.save(); g.clip(sp); g.strokeStyle = '#fbcfe2'; g.lineWidth = 4; for (let k = 0; k < 12; k++) { g.beginPath(); g.moveTo(560 + k * 14, -40); g.bezierCurveTo(520 + k * 14, 300, 760 + k * 10, 520, 690 + k * 12, 980); g.stroke(); } g.restore();
      const blue = b.i === 3 ? clamp(b.bt / 1.5) : 0;
      [[300, 360], [400, 470], [250, 520], [380, 300]].forEach(([x, y], k) => siderophage(g, x, y, 1.9, t, k + 3, blue));
      [[790, 760], [850, 820], [770, 840], [880, 730]].forEach(([x, y], k) => rbc(g, x, y, 1.3, k, t));
      ring(g, b, 0, 330, 420, 210, 190); ring(g, b, 1, 650, 470, 120, 380, 0.1); ring(g, b, 2, 820, 790, 110);
    },
  };
}
function stazaWhy() {
  const path = [[120, 760], [260, 620], [430, 520], [600, 440], [760, 380]];
  return {
    home: HOME, cams: [cam(220, 700, 1.6), cam(420, 560, 1.4), cam(760, 330, 1.6), cam(760, 330, 1.6)], anchors: [[120, 640], [430, 430], [700, 240], [880, 240]],
    labels: [lbl([150, 890], 'AS dilatat (IC stângă / stenoză mitrală)'), lbl([430, 650], 'presiune ↑ retrograd'), lbl([760, 560], 'alveola')],
    phase: (i) => ['inima stângă cedează', 'presiunea urcă retrograd', 'diapedeză + fagocitoză', 'hemosiderină + fibroză'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      const st = b.i < 0 ? 4 : b.i + clamp(b.bt / 3);
      // inima stângă (AS mare)
      const beat = 1 + 0.03 * Math.sin(t * 5);
      paint(g, blob(170, 770, 120 * beat * (1 + 0.15 * clamp(st)), 100 * beat, 0.2, t, 0.05, 14, 1), '#d24b6a', '#a8304f', '#f08aa0', bb(170, 770, 120, 100), OUT, 7);
      txt(g, 'AS', 170, 784, 36);
      // vena pulmonară → capilar
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 64; g.beginPath(); path.forEach((p, k) => (k ? g.lineTo(...p) : g.moveTo(...p))); g.stroke(); g.strokeStyle = '#b8304e'; g.lineWidth = 50 + 8 * clamp(st - 1); g.stroke(); g.restore();
      for (let k = 0; k < 10; k++) { const u = ((k / 10) + (REDUCED ? 0 : t * 0.04 * (st > 1 ? 0.3 : 1))) % 1; const i = Math.min(3, Math.floor(u * 4)), f = u * 4 - i; rbc(g, lerp(path[i + 1][0], path[i][0], f), lerp(path[i + 1][1], path[i][1], f), 0.8, 0.5, t); }
      if (st > 1) { g.save(); g.globalAlpha = clamp(st - 1); arrow(g, 520, 560, 330, 660, '#ffe36e', 7); g.restore(); }
      // alveola
      const sw = 20 + 40 * clamp(st - 3);
      g.save(); g.fillStyle = '#ee9cc4'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.ellipse(760, 280, 190 + sw, 160 + sw, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#fff7fb'; g.beginPath(); g.ellipse(760, 280, 185, 150, 0, 0, 7); g.fill(); g.strokeStyle = '#a54a7c'; g.lineWidth = 4; g.stroke(); g.restore();
      if (st > 2) { const f = clamp(st - 2); [[700, 330], [740, 360], [690, 260]].forEach(([x, y], k) => rbc(g, lerp(760, x, f), lerp(420, y, f), 0.9, k, t)); siderophage(g, 820, 270, 1.4, t, 4, 0); if (st > 3) { g.save(); g.globalAlpha = clamp(st - 3); siderophage(g, 820, 270, 1.4, t, 4, 0); g.restore(); } }
      if (st > 3) { g.save(); g.globalAlpha = clamp(st - 3); g.strokeStyle = '#fbcfe2'; g.lineWidth = 4; for (let k = 0; k < 8; k++) { g.beginPath(); g.ellipse(760, 280, 192 + k * 6, 158 + k * 6, 0, 0, 7); g.stroke(); } g.restore(); }
    },
  };
}
function infMic() {
  return {
    home: HOME, cams: [cam(600, 120, 2), cam(600, 430, 1.3), cam(140, 560, 2)], anchors: [[420, 40], [600, 300], [120, 460]],
    labels: [lbl([600, 130], 'pleura viscerală', { beats: [0] }), lbl([600, 600], 'arie infarctată: alveole pline de sânge', { beats: [1] }), lbl([150, 700], 'plămân viabil, aerat', { beats: [2] })],
    draw(g, t, b) { infField(g, t); ring(g, b, 0, 600, 40, 420, 45); ring(g, b, 1, 600, 330, 260, 220); ring(g, b, 2, 130, 560, 120, 150); },
  };
}
function infMare() {
  return {
    home: HOME, cams: [cam(330, 470, 1.6), cam(560, 470, 2.2), cam(860, 470, 1.8)], anchors: [[330, 260], [560, 300], [860, 260]],
    labels: [lbl([330, 720], 'alveole pline cu hematii', { beats: [0] }), lbl([560, 650], 'sept fără nuclei = necroză', { beats: [1] }), lbl([860, 720], 'sept interlobular viabil (cu nuclei)', { beats: [2] })],
    draw(g, t, b) {
      lungField(g, t, { seed: 13, R: 260, kind: (a) => (a.x < 760 ? 'blood' : 'air'), ghost: (x) => x < 760, cong: true, sept: '#f4bfd6', sept2: '#efb2cc' });
      const p = new Path2D(); p.rect(780, -40, 150, 1020); paint(g, p, '#f0b4cf', null, null, [780, -40, 150, 1020], OUT, 5); srand(3); g.fillStyle = HE.nuc; for (let k = 0; k < 22; k++) { g.beginPath(); g.ellipse(rr(795, 915), rr(0, 930), 12, 5, rr(1.3, 1.8), 0, 7); g.fill(); }
      ring(g, b, 0, 330, 470, 210, 210); ring(g, b, 2, 855, 470, 90, 300); if (b.i === 1) { const { S } = lungGeo(13, 260); S.filter((s, k) => k % 3 === 1 && s[0] < 680 && s[0] > 380).slice(0, 10).forEach((s) => glowRing(g, s[0], s[1], 22, 22, 0, ease(b.bt * 1.4), '#ffe36e', 4)); }
    },
  };
}
function infWhy() {
  return {
    home: HOME, cams: [cam(260, 620, 1.4), cam(500, 470, 1), cam(600, 300, 1.4), cam(600, 300, 1.6)], anchors: [[200, 520], [460, 170], [700, 140], [600, 380]],
    labels: [lbl([170, 880], 'embol din TVP'), lbl([330, 220], 'a. pulmonară blocată'), lbl([760, 560], 'a. bronșică: sânge în continuare'), lbl([600, 500], 'con cu baza la pleură')],
    phase: (i) => ['embol pulmonar mic', 'circulația dublă', 'sângele inundă alveolele', 'septurile mor'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a'); const st = b.i < 0 ? 4 : b.i + clamp(b.bt / 3);
      // plămânul (lob) cu pleura
      const lung = new Path2D(); lung.moveTo(80, 120); lung.quadraticCurveTo(500, 40, 940, 120); lung.quadraticCurveTo(980, 520, 820, 860); lung.lineTo(300, 860); lung.quadraticCurveTo(60, 520, 80, 120);
      paint(g, lung, '#e7a5bf', '#d88aa8', '#f7cfdd', [80, 60, 880, 800], OUT, 8);
      // conul
      const red = clamp(st - 2);
      if (st > 1) { const c = new Path2D(); c.moveTo(380, 95); c.lineTo(820, 115); c.lineTo(560, 470); c.closePath(); g.save(); g.fillStyle = `rgba(${Math.round(lerp(220, 150, red))},${Math.round(lerp(150, 20, red))},${Math.round(lerp(180, 40, red))},${0.3 + 0.6 * red})`; g.fill(c); g.strokeStyle = '#ffe36e'; g.setLineDash([14, 9]); g.lineWidth = 4; g.stroke(c); g.restore(); }
      // arborele arterial pulmonar
      g.save(); g.lineCap = 'round'; const tree = [[[240, 860], [330, 600], [450, 420], [560, 470]], [[330, 600], [260, 380], [230, 180]], [[450, 420], [520, 250], [560, 130]], [[450, 420], [700, 300], [800, 160]]];
      tree.forEach((br) => { g.strokeStyle = OUT; g.lineWidth = 30; g.beginPath(); br.forEach((p, k) => (k ? g.lineTo(...p) : g.moveTo(...p))); g.stroke(); g.strokeStyle = '#6e8ee6'; g.lineWidth = 20; g.stroke(); }); g.restore();
      // embolul se deplasează
      const u = b.i < 0 ? 1 : b.i === 0 ? ease(b.bt / 3) : 1; const ex = lerp(240, 560, u), ey = lerp(860, 470, u) - (u > 0.5 ? 0 : 0);
      paint(g, blob(ex, ey, 22, 14, -0.6, t, 0.1, 10, 3), '#5a0d1e', null, '#a33', bb(ex, ey, 22, 14), OUT, 4);
      // artera bronșică (circulația dublă)
      if (st > 1) { g.save(); g.globalAlpha = clamp(st - 1); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 20; g.beginPath(); g.moveTo(920, 700); g.quadraticCurveTo(760, 450, 640, 250); g.stroke(); g.strokeStyle = '#ff5a6e'; g.lineWidth = 12; g.stroke(); for (let k = 0; k < 5; k++) { const v = (t * 0.25 + k / 5) % 1; rbc(g, lerp(920, 640, v), lerp(700, 250, v) + Math.sin(v * 3) * 30, 0.6, 0, t); } g.restore(); }
      if (st > 3) { g.save(); g.globalAlpha = clamp(st - 3); txt(g, 'fără nuclei', 600, 300, 28, '#fff'); g.restore(); }
      txt(g, 'pleura', 500, 70, 24, '#f8e07a');
    },
  };
}

/* =============================================================== LAMA 3 · INFARCT RENAL */
function renMic() {
  return {
    home: HOME, cams: [cam(200, 300, 1.8), cam(760, 470, 1.4), cam(480, 470, 1.6)], anchors: [[180, 170], [780, 330], [490, 120]],
    labels: [lbl([200, 470], 'viabil: nuclei bine colorați', { beats: [0] }), lbl([780, 620], 'zona infarctată: „fantome”', { beats: [1] }), lbl([490, 800], 'lizereu hemoragic-inflamator', { beats: [2] })],
    draw(g, t, b) { renField(g, t); ring(g, b, 0, 200, 300, 160, 200); ring(g, b, 1, 780, 470, 200, 300); ring(g, b, 2, 480, 470, 90, 420); },
  };
}
function nucFate(g, x, y, stage, t) {
  // 0 normal → 1 picnoză → 2 carioreexă → 3 carioliză
  g.save(); g.fillStyle = '#f6b3d0'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(x, y, 60, 0, 7); g.fill(); g.stroke(); g.restore();
  if (stage < 1) { paint(g, blob(x, y, 26 - 12 * stage, 24 - 11 * stage, 0, t, 0.04, 10, 2), lerp(0, 1, stage) > 0.5 ? '#1a0f55' : HE.nuc, null, HE.nucL, bb(x, y, 24, 22), OUT, 3); }
  else if (stage < 2) { const f = stage - 1; srand(5); for (let k = 0; k < 7; k++) { const a = k / 7 * 6.28; g.fillStyle = '#1a0f55'; g.beginPath(); g.arc(x + Math.cos(a) * 30 * f, y + Math.sin(a) * 30 * f, 7, 0, 7); g.fill(); } }
  else { const f = clamp(stage - 2); g.save(); g.globalAlpha = 1 - f; for (let k = 0; k < 7; k++) { const a = k / 7 * 6.28; g.fillStyle = '#1a0f55'; g.beginPath(); g.arc(x + Math.cos(a) * 30, y + Math.sin(a) * 30, 7, 0, 7); g.fill(); } g.restore(); }
}
function renMare() {
  return {
    home: HOME, cams: [cam(330, 330, 1.8), cam(760, 260, 1.9), cam(760, 260, 2.4), cam(500, 780, 1.3)], anchors: [[240, 170], [680, 120], [760, 230], [500, 600]],
    labels: [lbl([330, 520], 'glomerul-fantomă', { beats: [0] }), lbl([760, 440], 'tub-fantomă: contur + membrană bazală păstrate', { beats: [1] }), lbl([760, 440], 'detritus eozinofil în lumen', { beats: [2] }), lbl([500, 690], 'nucleul dispare în 3 pași', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#f6cfe0', '#f0bed5');
      glom(g, 330, 330, 190, true, t); tubX(g, 760, 260, 170, true, t);
      [[120, 620, 90], [880, 620, 80], [560, 560, 70]].forEach(([x, y, r]) => tubX(g, x, y, r, true, t));
      const st = b.i === 3 ? Math.min(3, b.bt * 0.9) : b.i < 0 ? 3 : 0;
      ['normal', 'picnoză', 'carioreexă', 'carioliză'].forEach((nm, k) => { const x = 230 + k * 180; if (st >= k) nucFate(g, x, 780, k, t); else { g.save(); g.globalAlpha = 0.3; g.strokeStyle = '#fff'; g.lineWidth = 3; g.beginPath(); g.arc(x, 780, 60, 0, 7); g.stroke(); g.restore(); } txt(g, nm, x, 880, 22, st >= k && b.i === 3 ? '#ffe36e' : '#fff'); });
      ring(g, b, 0, 330, 330, 210); ring(g, b, 1, 760, 260, 190); ring(g, b, 2, 760, 260, 70);
    },
  };
}
function renWhy() {
  return {
    home: HOME, cams: [cam(300, 470, 1.3), cam(500, 470, 1), cam(640, 330, 1.5), cam(640, 330, 1.5)], anchors: [[150, 420], [420, 380], [700, 170], [880, 300]],
    labels: [lbl([180, 620], 'embol din cordul stâng'), lbl([470, 560], 'artere terminale'), lbl([700, 80], 'baza la capsulă'), lbl([900, 470], 'lizereu roșu')],
    phase: (i) => ['ocluzie arterială', 'artere terminale', 'necroză de coagulare', 'reacția la margine'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a'); const st = b.i < 0 ? 4 : b.i + clamp(b.bt / 3);
      const kid = new Path2D(); kid.moveTo(420, 120); kid.bezierCurveTo(820, 0, 1000, 330, 900, 620); kid.bezierCurveTo(820, 860, 460, 880, 420, 720); kid.bezierCurveTo(520, 600, 520, 380, 420, 240); kid.closePath();
      paint(g, kid, '#a4404e', '#7f2c3a', '#c9707a', [420, 40, 560, 820], OUT, 8);
      // conul
      if (st > 1.5) { const f = clamp(st - 1.5); const c = new Path2D(); c.moveTo(620, 360); c.lineTo(600, 100); c.quadraticCurveTo(720, 70, 830, 140); c.closePath(); g.save(); g.fillStyle = `rgba(246,226,170,${f})`; g.fill(c); if (st > 3) { g.strokeStyle = `rgba(214,30,50,${clamp(st - 3)})`; g.lineWidth = 14; g.stroke(c); } g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(c); g.restore(); }
      // arborele arterial (terminal, fără anastomoze)
      g.save(); g.lineCap = 'round'; const br = [[[80, 470], [470, 470]], [[620, 360], [700, 120]], [[620, 360], [800, 200]], [[470, 470], [620, 360]], [[470, 470], [640, 520], [880, 420]], [[470, 470], [600, 650], [780, 760]], [[640, 520], [760, 640]]];
      br.forEach((p, k) => { g.strokeStyle = OUT; g.lineWidth = k ? 18 : 30; g.beginPath(); p.forEach((q, j) => (j ? g.lineTo(...q) : g.moveTo(...q))); g.stroke(); g.strokeStyle = (k === 1 || k === 2) && st > 0.5 ? '#6b6178' : '#ff5a6e'; g.lineWidth = k ? 10 : 20; g.stroke(); }); g.restore();
      const u = b.i < 0 ? 1 : b.i === 0 ? ease(b.bt / 2.5) : 1; const ex = u < 0.6 ? lerp(80, 470, u / 0.6) : lerp(470, 620, (u - 0.6) / 0.4), ey = u < 0.6 ? 470 : lerp(470, 360, (u - 0.6) / 0.4);
      paint(g, blob(ex, ey, 20, 14, -0.6, t, 0.1, 10, 3), '#5a0d1e', null, '#a33', bb(ex, ey, 20, 14), OUT, 4);
      if (b.i === 1) { [[700, 120], [800, 200]].forEach(([x, y]) => glowRing(g, x, y, 30, 30, 0, ease(b.bt), '#ffe36e', 4)); }
      txt(g, 'a. renală', 230, 530, 24, '#fff');
    },
  };
}

/* =============================================================== LAMA 4 · INFARCT MIOCARDIC */
function imaMic() {
  return {
    home: HOME, cams: [cam(560, 300, 1.7), cam(500, 520, 1.6), cam(240, 700, 1.7)], anchors: [[620, 200], [470, 430], [200, 600]],
    labels: [lbl([600, 120], 'fibre roz intens, fără nuclei, fără striații', { beats: [0] }), lbl([500, 660], 'neutrofile + edem interstițial', { beats: [1] }), lbl([220, 860], 'miocard viabil: striații, nuclei centrali', { beats: [2] })],
    draw(g, t, b) { mioField(g, t); ring(g, b, 0, 600, 300, 200, 70, MIO_A); ring(g, b, 1, 500, 520, 140); ring(g, b, 2, 230, 700, 180, 90, MIO_A); },
  };
}
function imaMare() {
  return {
    home: HOME, cams: [cam(420, 300, 1.6), cam(560, 560, 1.8), cam(850, 665, 1.9)], anchors: [[380, 170], [560, 470], [850, 590]],
    labels: [lbl([420, 450], 'fibră necrozată: fără nucleu, fără striații', { beats: [0] }), lbl([560, 690], 'neutrofile: nuclei multilobați / fragmentați', { beats: [1] }), lbl([850, 790], 'hematii extravazate (în interstițiu)', { beats: [2] })],
    draw(g, t, b) {
      bgFill(g, '#fbe3ee', '#f5d0e1');
      g.save(); g.translate(500, 467); g.rotate(-0.3);
      [[-180, '#ff5f9b', true], [150, '#ff5f9b', true], [430, '#e77aa0', false]].forEach(([y, c, d]) => { const p = new Path2D(); p.roundRect(-700, y - 90, 1400, 180, 70); paint(g, p, c, d ? null : '#d8628c', d ? '#ffc0d8' : null, [-700, y - 90, 1400, 180], OUT, 6); if (!d) { g.save(); g.clip(p); g.strokeStyle = 'rgba(150,40,90,.45)'; g.lineWidth = 3; for (let x = -700; x < 700; x += 16) { g.beginPath(); g.moveTo(x, y - 90); g.lineTo(x, y + 90); g.stroke(); } g.restore(); paint(g, blob(0, y, 50, 20, 0, t, 0.03, 10, 1), HE.nuc, HE.nucS, HE.nucL, bb(0, y, 50, 20), OUT, 3); } });
      g.restore();
      [[440, 520, 0], [520, 590, 1], [610, 540, 0], [680, 620, 1], [380, 600, 1], [560, 470, 0]].forEach(([x, y, f], k) => neutrophil(g, x, y, 1.8, t, k, !!f));
      [[777, 685], [872, 655], [830, 672], [920, 640]].forEach(([x, y], k) => rbc(g, x, y, 1.0, -0.3, t));
      ring(g, b, 0, 420, 300, 320, 90, -0.3); ring(g, b, 1, 540, 560, 190, 120, -0.3); ring(g, b, 2, 850, 665, 90);
    },
  };
}
function imaWhy() {
  const ST = [['0–4 ore', 'nimic la MO'], ['4–6 ore → 3 zile', 'roz intens, fără nuclei'], ['3–7 zile', 'neutrofile → macrofage'], ['săpt. 2–3', 'țesut de granulație'], ['2–3 luni', 'cicatrice fibroasă']];
  return {
    home: HOME, cams: ST.map((_, k) => cam(500, 420, 1.15)), anchors: ST.map((_, k) => [120 + k * 190, 820]),
    phase: (i) => (ST[i] ? ST[i][0] : ''),
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a'); const s = b.i < 0 ? 1 : b.i;
      // fibra mare
      const deadF = s >= 1 && s <= 2, gone = s >= 3;
      const p = new Path2D(); p.roundRect(110, 300, 780, 230, 80);
      if (!gone) { paint(g, p, deadF ? '#ff5f9b' : '#e77aa0', deadF ? null : '#d8628c', deadF ? '#ffc0d8' : null, [110, 300, 780, 230], OUT, 7); if (!deadF) { g.save(); g.clip(p); g.strokeStyle = 'rgba(150,40,90,.45)'; g.lineWidth = 4; for (let x = 120; x < 890; x += 22) { g.beginPath(); g.moveTo(x, 300); g.lineTo(x, 530); g.stroke(); } g.restore(); paint(g, blob(500, 415, 60, 24, 0, t, 0.03, 10, 1), HE.nuc, HE.nucS, HE.nucL, bb(500, 415, 60, 24), OUT, 3); } }
      else if (s === 3) { g.save(); g.fillStyle = '#f6c4d9'; g.fill(p); g.restore(); for (let k = 0; k < 5; k++) capillary(g, [[150 + k * 160, 290], [200 + k * 160, 420], [160 + k * 160, 540]], 26, t, { n: 2, nuclei: 1 }); for (let k = 0; k < 7; k++) paint(g, spindle(180 + k * 110, 470 - (k % 2) * 110, 90, 26, 0.3, t, k), '#d9c8f4', '#b9a2ea', null, bb(180 + k * 110, 400, 45, 13), OUT, 3); }
      else { g.save(); g.clip(p); g.fillStyle = '#f9d5e4'; g.fill(p); g.strokeStyle = '#ef8fb8'; g.lineWidth = 9; for (let y = 310; y < 530; y += 26) { g.beginPath(); g.moveTo(110, y); g.bezierCurveTo(400, y - 12, 600, y + 12, 890, y); g.stroke(); } g.restore(); g.save(); g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(p); g.restore(); for (let k = 0; k < 4; k++) paint(g, spindle(220 + k * 180, 380 + (k % 2) * 70, 110, 14, 0, t, k), HE.nuc, HE.nucS, null, bb(220 + k * 180, 400, 55, 7), OUT, 2.5); }
      if (s === 1) { const f = clamp(b.bt / 3); [[300, 600], [500, 610], [700, 600]].forEach(([x, y], k) => neutrophil(g, x, lerp(700, y, f), 1.5, t, k)); }
      if (s === 2) { [[230, 280], [380, 560], [560, 270], [700, 570], [820, 290]].forEach(([x, y], k) => neutrophil(g, x, y, 1.5, t, k, true)); [[300, 420], [650, 420]].forEach(([x, y], k) => paint(g, blob(x, y, 60, 46, k, t, 0.12, 12, k + 4), '#f7c6d9', '#eba2bf', null, bb(x, y, 60, 46), OUT, 5)); }
      // cronologia jos
      g.save(); g.strokeStyle = OUT; g.lineWidth = 16; g.beginPath(); g.moveTo(120, 760); g.lineTo(880, 760); g.stroke(); g.strokeStyle = '#ff9fc6'; g.lineWidth = 8; g.stroke(); g.restore();
      ST.forEach(([a, c], k) => { const x = 120 + k * 190, on = k === s; g.save(); g.fillStyle = on ? '#ffe36e' : '#4a3d58'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(x, 760, on ? 22 : 15, 0, 7); g.fill(); g.stroke(); g.restore(); txt(g, a, x, 720, 20, on ? '#ffe36e' : '#d9c8e4'); });
      txt(g, ST[s][1], 500, 200, 36, '#fff');
      if (s === 2) txt(g, 'zilele 5–10 (Robbins: 3–7): miomalacie → RUPTURĂ', 500, 880, 26, '#ff8a8a');
    },
  };
}

/* =============================================================== LAMA 5 · TROMB MIXT */
function trombMic() {
  return {
    home: HOME, cams: [cam(500, 560, 1.5), cam(500, 600, 1.7), cam(500, 790, 1.8)], anchors: [[320, 520], [680, 470], [500, 830]],
    labels: [lbl([300, 380], 'lamele roșii: hematii în fibrină', { beats: [0] }), lbl([700, 380], 'lamele palide: trombocite + fibrină', { beats: [1] }), lbl([500, 900], 'atașat de perete; endoteliul lipsește', { beats: [2] })],
    draw(g, t, b) { trombField(g, t); ring(g, b, 0, 320, 640, 110, 30); ring(g, b, 1, 680, 600, 110, 28); ring(g, b, 2, 500, 790, 400, 30); },
  };
}
function trombMare() {
  return {
    home: HOME, cams: [cam(400, 400, 1.6), cam(560, 520, 1.6), cam(500, 120, 1.6)], anchors: [[300, 300], [560, 420], [500, 60]],
    labels: [lbl([400, 560], 'fibrină + trombocite agregate', { beats: [0] }), lbl([560, 700], 'neutrofile + hematii prinse', { beats: [1] }), lbl([500, 230], 'marginea liberă, spre lumen', { beats: [2] })],
    draw(g, t, b) {
      fibrinField(g, t);
      g.save(); g.fillStyle = '#fff3f7'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(-40, -40); g.lineTo(1040, -40); g.lineTo(1040, 90); for (let x = 1040; x >= -40; x -= 30) g.lineTo(x, 90 + Math.sin(x / 40) * 18); g.closePath(); g.fill(); g.stroke(); g.restore();
      for (let k = 0; k < 6; k++) { const u = ((k / 6) + (REDUCED ? 0 : t * 0.06)) % 1; rbc(g, -40 + u * 1080, 30, 0.9, 0.2, t); }
      ring(g, b, 0, 400, 400, 200); ring(g, b, 1, 560, 520, 200); ring(g, b, 2, 500, 85, 480, 50);
    },
  };
}
function trombWhy() {
  return {
    home: HOME, cams: [cam(500, 400, 1.05), cam(500, 600, 1.3), cam(500, 600, 1.3), cam(500, 560, 1.1)], anchors: [[330, 170], [300, 700], [700, 700], [500, 340]],
    phase: (i) => ['triada Virchow', 'trombocitele → strat palid', 'fibrina → strat roșu', 'straturi repetate = Zahn'][i] || '',
    draw(g, t, b) {
      const st = b.i < 0 ? 4 : b.i + clamp(b.bt / 3);
      if (st < 1) {
        bgFill(g, '#2e1838', '#140a1a');
        const P = [[500, 170], [270, 560], [730, 560]]; g.save(); g.strokeStyle = OUT; g.lineWidth = 16; g.beginPath(); P.forEach((p, k) => (k ? g.lineTo(...p) : g.moveTo(...p))); g.closePath(); g.stroke(); g.strokeStyle = '#ff9fc6'; g.lineWidth = 8; g.stroke(); g.restore();
        [['leziune endotelială', '#ffe36e'], ['flux anormal (stază, turbulență)', '#7fe8ff'], ['hipercoagulabilitate', '#9dff8a']].forEach(([s, c], k) => { const [x, y] = P[k]; g.save(); g.fillStyle = c; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.arc(x, y, 42 + 4 * Math.sin(t * 3 + k), 0, 7); g.fill(); g.stroke(); g.restore(); txt(g, s, k === 1 ? x + 40 : k === 2 ? x - 40 : x, y + (k ? 90 : -65), 26, c); });
        txt(g, 'TROMB', 500, 450, 46, '#fff');
        return;
      }
      const layers = st < 2 ? 1 : st < 3 ? 2 : Math.min(ZAHN, 2 + Math.floor((st - 3) * 6));
      trombField(g, t, { layers });
      if (st < 2) { const f = clamp(st - 1); srand(9); for (let k = 0; k < 14; k++) { const x = rr(0, 1000); g.save(); g.fillStyle = '#c9b3ff'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x, lerp(200, 740, f) + rr(-20, 20), 10, 0, 7); g.fill(); g.stroke(); g.restore(); } }
      txt(g, 'sângele curge în continuare →', 560, 260, 28, '#fff');
    },
  };
}

function fallback() { return { home: HOME, anchors: [], draw(g) { bgFill(g, '#2e1838', '#140a1a'); } }; }

export const SCENES = { atlas, mosaic, cover, fisa, recap, ddPair, script, edemMic, edemMare, edemWhy, stazaMic, stazaMare, stazaWhy, infMic, infMare, infWhy, renMic, renMare, renWhy, imaMic, imaMare, imaWhy, trombMic, trombMare, trombWhy, fallback };
