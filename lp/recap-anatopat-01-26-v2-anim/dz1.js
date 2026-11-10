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

export { FIELDS, W as W1, H as H1 };
