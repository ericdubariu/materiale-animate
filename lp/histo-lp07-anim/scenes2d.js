// Scenele cartoon 2D ale LP 7 (țesutul conjunctiv II): lax, adipos alb, tendinos, reticular.
import {
  OUT, HE, AG, clamp, lerp, ease, srand, rnd, rr, smooth, blob, spindle, paint, bb, glowRing,
  fibrocyte, lymphocyte, plasmocyte, rbc, capillary, bundle, wavy, makeNet, drawNet, tubule, field, roundRect, arrow, REDUCED,
} from './kit2d.js';
import { atlas, mosaic } from './atlas.js';

// field() din kit2d conturează ultima cale desenată; refacem cercul ca să fie conturat cercul, nu ultima formă din interior.
const fieldC = (g, x, y, r, f, ring) => field(g, x, y, r, () => { f(); g.beginPath(); g.arc(x, y, r, 0, 7); }, ring);

const W = 1000, H = 934;
const cam = (x, y, z) => ({ x, y, z });
const HOME = cam(500, 467, 1);
const lbl = (at, html, o = {}) => ({ at, html, ...o });
const bgFill = (g, a, b, w = W, h = H) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(-2000, -2000, w + 4000, h + 4000); };
const u01 = (b, k = 0.8) => (b.i >= 0 ? clamp(b.bt / (b.bd * k)) : 1);

/* ---------- celule specifice LP 7 ---------- */
// fibroblast în LP 7: nucleu alungit, „în bastonaș”, hipocrom; fibrocit: același, dar hipercrom
function fibroblastRod(g, x, y, s, rot, t) { fibrocyte(g, x, y, s, rot, t, { cyto: '#d9c8f4', cytoS: '#b9a2ea', nuc: '#b3a8ef', nucS: '#8f84e0', nucL: '#e6e1ff' }); paint(g, blob(x, y, 11 * s, 9 * s, rot, t, 0.02, 10, 9), '#2a1670', '#170b4a', '#6a52d0', bb(x, y, 11 * s, 9 * s), OUT, 2.5 * Math.max(0.6, s)); } // nucleol vizibil (celulă activă)
function fibrocyteRod(g, x, y, s, rot, t) { fibrocyte(g, x, y, s, rot, t); }
// acin glandular (lobul mamar): epiteliu cubic (nuclei violet) în jurul unui lumen
function acinus(g, x, y, r, t) {
  paint(g, blob(x, y, r, r * 0.92, 0, t, 0.05, 12, x), '#b9a6ea', '#9a84dc', '#e1d8fb', bb(x, y, r, r), OUT, 5);
  g.save(); g.fillStyle = '#fff7fb'; g.beginPath(); g.ellipse(x, y, r * 0.36, r * 0.32, 0, 0, 7); g.fill(); g.strokeStyle = OUT; g.lineWidth = 2.5; g.stroke(); g.restore();
  const n = Math.max(7, Math.round(r / 6)); g.save(); g.fillStyle = HE.nuc;
  for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; g.beginPath(); g.ellipse(x + Math.cos(a) * r * 0.66, y + Math.sin(a) * r * 0.62, Math.max(3, r * 0.1), Math.max(2.5, r * 0.08), a, 0, 7); g.fill(); }
  g.restore();
}
// adipocit poligonal (în fagure): vacuolă goală, inel subțire de citoplasmă, nucleu turtit periferic
function adiCell(g, pts, nucIdx, t, hi = false) {
  const p = smooth(pts);
  g.save(); g.fillStyle = '#ffffff'; g.fill(p); g.lineJoin = 'round';
  g.strokeStyle = '#f2a3c6'; g.lineWidth = 7; g.stroke(p); g.strokeStyle = OUT; g.lineWidth = 2.5; g.stroke(p); g.restore();
  const a = pts[nucIdx], b = pts[(nucIdx + 1) % pts.length]; const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const cx = pts.reduce((s, q) => s + q[0], 0) / pts.length, cy = pts.reduce((s, q) => s + q[1], 0) / pts.length;
  const ix = mx + (cx - mx) * 0.07, iy = my + (cy - my) * 0.07;
  paint(g, spindle(ix, iy, 46, 12, ang, t, nucIdx), HE.nuc, HE.nucS, null, bb(ix, iy, 23, 6), OUT, 2.5);
  if (hi) glowRing(g, cx, cy, 70, 64, 0, 1);
  return [ix, iy, cx, cy];
}
// fagure de adipocite: grilă hexagonală deformată
function honeycomb(seed, x0, y0, cols, rows, R) {
  srand(seed); const cells = [];
  const P = []; for (let r = 0; r <= rows * 2 + 1; r++) { P.push([]); for (let c = 0; c <= cols + 1; c++) P[r].push([x0 + c * R * 1.73 + (r % 2 ? R * 0.87 : 0) + rr(-8, 8), y0 + r * R * 0.5 * 1.5 + rr(-8, 8)]); }
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const cx = x0 + c * R * 1.73 + (r % 2 ? R * 0.87 : 0), cy = y0 + r * R * 1.5;
    const pts = []; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; pts.push([cx + Math.cos(a) * R * rr(0.9, 1.04), cy + Math.sin(a) * R * rr(0.9, 1.04)]); }
    cells.push({ pts, nuc: Math.floor(rr(0, 6)), c: [cx, cy] });
  }
  return cells;
}
// capilar longitudinal: nuclei alternativi („dinții unui fierăstrău”), hematii în șir indian
function capLong(g, x0, y0, x1, w, t, o = {}) {
  const a = Math.atan2(0, x1 - x0);
  g.save(); g.lineCap = 'round';
  g.strokeStyle = OUT; g.lineWidth = w + 10; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y0); g.stroke();
  g.strokeStyle = '#f5b9cf'; g.lineWidth = w + 4; g.stroke(); g.strokeStyle = '#fff1f6'; g.lineWidth = w - 10; g.stroke(); g.restore();
  const n = o.nuclei || 6; for (let k = 0; k < n; k++) { const x = lerp(x0 + 40, x1 - 40, k / (n - 1)); const up = k % 2 === 0; const y = y0 + (up ? -1 : 1) * (w / 2 - 6); paint(g, spindle(x, y, 50, 13, 0, t, k), HE.nuc, HE.nucS, null, bb(x, y, 25, 6), OUT, 2.5); }
  if (o.rbcs !== false) { const m = o.m || 7; for (let k = 0; k < m; k++) { const u = ((k / m) + (REDUCED ? 0 : t * 0.04)) % 1; rbc(g, lerp(x0 + 20, x1 - 20, u), y0, 0.62, Math.PI / 2, t); } }
}
// capilar transversal: spațiu mic, rotund, 1, maximum 2 nuclei care proemină în lumen
function capTrans(g, x, y, r, t) {
  g.save(); g.fillStyle = '#f5b9cf'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#fff1f6'; g.beginPath(); g.arc(x, y, r * 0.66, 0, 7); g.fill(); g.restore();
  paint(g, blob(x - r * 0.48, y - r * 0.15, r * 0.3, r * 0.22, 0.6, t, 0.03, 10, 2), HE.nuc, HE.nucS, null, bb(x, y, r * 0.3, r * 0.2), OUT, 2.5);
  paint(g, blob(x + r * 0.5, y + r * 0.25, r * 0.26, r * 0.19, -0.5, t, 0.03, 10, 5), HE.nuc, HE.nucS, null, bb(x, y, r * 0.26, r * 0.19), OUT, 2.5);
}
// celulă reticulară: corp stelat roz (eozinofil), nucleu mare, rotund, hipocrom, prelungiri lungi anastomozate
function reticularCell(g, x, y, s, t, arms) {
  const pts = []; const n = 60;
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; let r = 30; for (const [aa, L] of arms) { const d = Math.atan2(Math.sin(a - aa), Math.cos(a - aa)); r += (L - 30) * Math.exp(-(d * d) / 0.02); } const b = 0.01 * (REDUCED ? 0 : Math.sin(t * 1.4 + i)); pts.push([x + Math.cos(a) * r * s * (1 + b), y + Math.sin(a) * r * s * (1 + b)]); }
  paint(g, smooth(pts), '#f2b6cf', '#e294b6', '#ffe6f0', bb(x, y, 40 * s, 40 * s), OUT, 4);
  paint(g, blob(x, y, 22 * s, 21 * s, 0, t, 0.03, 12, x), '#d9d2fb', '#c3b9f4', '#ffffff', bb(x, y, 22 * s, 21 * s), '#6a50c4', 3);
  g.save(); g.fillStyle = '#a99de8'; for (let k = 0; k < 7; k++) { const a = k * 2.4, r = Math.sqrt((k % 4 + 1) / 5) * 14 * s; g.beginPath(); g.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, 2.6 * s, 0, 7); g.fill(); } g.restore();
}

/* ---------- câmpuri ---------- */
// lama 1 (și 2): glanda mamară, HE — lobuli de acini în conjunctiv lax, separați de conjunctiv dens
function laxField(g, t, o = {}) {
  srand(o.seed || 3); bgFill(g, '#fbe9f1', '#f6dcea');
  // conjunctiv dens între lobuli: fascicule groase, roz intens, puține celule
  const dense = [wavy(-60, 470, 1060, 430, 18, 2, 0, 18), wavy(470, -60, 520, 1000, 16, 2.4, 1, 18)];
  dense.forEach((p) => { for (let k = -2; k <= 2; k++) bundle(g, p.map(([x, y]) => [x + k * 14, y + k * 14 * (p === dense[0] ? 1 : 0)]), 18, { c: { col: '#e985b2', colL: '#ffc4dc', colS: '#c95f92' }, n: 3 }); });
  // lobuli: acini în conjunctiv lax palid, aerisit
  const lob = [[230, 230], [770, 230], [230, 710], [770, 710]];
  lob.forEach(([cx, cy], li) => {
    g.save(); g.fillStyle = 'rgba(255,240,247,.85)'; g.strokeStyle = 'rgba(42,21,52,.25)'; g.lineWidth = 3; g.beginPath(); g.ellipse(cx, cy, 190, 175, 0, 0, 7); g.fill(); g.stroke(); g.restore();
    srand(li * 7 + 1);
    for (let k = 0; k < 6; k++) { const a = rr(0, 6.28), r = rr(20, 150); bundle(g, wavy(cx + Math.cos(a) * r - 40, cy + Math.sin(a) * r * 0.9, cx + Math.cos(a) * r + 40, cy + Math.sin(a) * r * 0.9 + rr(-30, 30), 5, 1.5, k, 8), 7, { n: 2, c: { col: '#f5b5d0', colL: '#ffe0ec', colS: '#e293b6' } }); }
    for (let k = 0; k < 6; k++) { const a = k / 6 * 6.28 + li, r = k % 2 ? 105 : 70; acinus(g, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.9, 34, t); }
    acinus(g, cx, cy, 30, t);
    capTrans(g, cx + 140, cy - 40, 16, t);
    fibroblastRod(g, cx - 130, cy + 70, 0.2, 0.5, t);
    lymphocyte(g, cx + 40, cy + 140, 0.5, t);
  });
  capillary(g, [[-40, 860], [300, 820], [620, 880], [1040, 840]], 34, t, { n: 6 });
  return { lob };
}
function adiField(g, t, o = {}) {
  bgFill(g, '#fbe9f1', '#f6dcea');
  const cells = honeycomb(o.seed || 12, 70, 120, 6, 6, 92);
  cells.forEach((c) => adiCell(g, c.pts, c.nuc, t));
  // capilare în spațiile înguste dintre celule
  capTrans(g, 245, 335, 14, t); capTrans(g, 562, 470, 14, t); capTrans(g, 720, 750, 14, t);
  return { cells };
}
function tenField(g, t, o = {}) {
  srand(o.seed || 20); bgFill(g, '#f7cfe0', '#f1bcd3');
  const ang = 0.42, rows = 13; const twins = [];
  g.save(); g.translate(500, 467); g.rotate(ang); g.translate(-700, -467);
  for (let r = 0; r < rows; r++) {
    const y = 467 + (r - rows / 2) * 74;
    bundle(g, wavy(-100, y, 1500, y, 6, 4, r, 30), 58, { c: { col: '#f39cc3', colL: '#ffd0e4', colS: '#de7aa8' }, n: 6 });
    if (r % 3 === 1) { g.save(); g.fillStyle = '#ffffff'; g.strokeStyle = OUT; g.lineWidth = 3; const p = smooth(wavy(100 + r * 30, y + 37, 700 + r * 40, y + 37, 3, 2, r, 10), false); g.lineCap = 'round'; g.lineWidth = 14; g.strokeStyle = OUT; g.stroke(p); g.lineWidth = 9; g.strokeStyle = '#ffffff'; g.stroke(p); g.restore(); }
    // tenocite: nuclei alungiți, hipercromi, în șiruri, adesea în perechi „cap la cap”
    for (let k = 0; k < 4; k++) { const x = 120 + k * 330 + (r % 2) * 150 + rr(-30, 30); const yy = y + 36; paint(g, spindle(x, yy, 52, 12, 0, t, k), HE.nuc, HE.nucS, null, bb(x, yy, 26, 6), OUT, 2.5); paint(g, spindle(x + 58, yy, 52, 12, 0, t, k + 9), HE.nuc, HE.nucS, null, bb(x + 58, yy, 26, 6), OUT, 2.5); twins.push([x + 29, yy]); }
  }
  g.restore();
  return { twins, ang };
}
const toWorldTen = (x, y, ang = 0.42) => { const dx = x - 700, dy = y - 467; return [500 + dx * Math.cos(ang) - dy * Math.sin(ang), 467 + dx * Math.sin(ang) + dy * Math.cos(ang)]; };
function retHEField(g, t, o = {}) {
  srand(o.seed || 31); bgFill(g, '#fbeef4', '#f4dde8');
  // cordoane dense de limfocite (în medulară)
  const cords = [[[60, 760], [260, 700], [420, 760], [560, 690]], [[640, 120], [760, 200], [900, 160], [1040, 220]]];
  cords.forEach((p) => { srand(p[0][0]); for (let k = 0; k < 70; k++) { const i = Math.floor(rr(0, p.length - 1)); const u = rnd(); const x = lerp(p[i][0], p[i + 1][0], u) + rr(-45, 45), y = lerp(p[i][1], p[i + 1][1], u) + rr(-45, 45); lymphocyte(g, x, y, 0.62, t); } });
  // celule reticulare stelate, prelungirile se anastomozează → pseudorețea
  const RC = [[220, 240], [430, 180], [330, 430], [560, 380], [760, 470], [460, 620], [690, 650], [850, 330], [140, 470]];
  srand(7); const E = [];
  RC.forEach((p, i) => RC.forEach((q, j) => { if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < 260) E.push([p, q]); }));
  g.save(); g.lineCap = 'round';
  E.forEach(([p, q], k) => { const m = [(p[0] + q[0]) / 2 + Math.sin(k) * 18, (p[1] + q[1]) / 2 + Math.cos(k) * 18]; const pa = new Path2D(); pa.moveTo(p[0], p[1]); pa.quadraticCurveTo(m[0], m[1], q[0], q[1]); g.strokeStyle = OUT; g.lineWidth = 9; g.stroke(pa); g.strokeStyle = '#f2b6cf'; g.lineWidth = 5; g.stroke(pa); });
  g.restore();
  RC.forEach(([x, y], k) => reticularCell(g, x, y, 1.15, t, [[k, 70], [k + 2.1, 64], [k + 4.2, 68]]));
  // limfocite izolate în ochiurile rețelei
  const LY = [[330, 300], [500, 270], [430, 520], [610, 530], [270, 360], [640, 420], [790, 560], [560, 760], [200, 590], [370, 640]];
  LY.forEach(([x, y]) => lymphocyte(g, x, y, 0.85, t));
  return { RC, LY };
}

/* =================================================== 1 · COPERTA */
function cover() {
  const L = [['HE', laxField, 'lax'], ['HE', adiField, 'adipos'], ['HE', tenField, 'tendinos'], ['HE', retHEField, 'reticular']];
  const pos = [[270, 230], [730, 230], [270, 700], [730, 700]]; const k = [0, 0, 0, 0];
  return {
    home: HOME, cams: pos.map(([x, y]) => cam(x, y, 1.7)), anchors: pos.map(([x, y]) => [x - 150, y - 150]),
    labels: pos.map(([x, y], i) => lbl([x, y + 205], L[i][2])),
    draw(g, t, b) {
      bgFill(g, '#3a1d47', '#160b1d');
      pos.forEach(([x, y], i) => { k[i] = lerp(k[i], b.i === i ? 1 : 0, 0.08); fieldC(g, x, y, 180 + k[i] * 8, () => { g.save(); g.translate(x - 180, y - 180); g.scale(0.36, 0.385); L[i][1](g, t); g.restore(); }); if (k[i] > 0.05) glowRing(g, x, y, 195, 195, 0, k[i]); });
    },
  };
}

/* =================================================== 2 · PROPORȚII */
function props() {
  const T = [['lax', [1, 1, 1]], ['adipos alb', [3, 0.3, 0.3]], ['tendinos', [0.4, 3, 0.3]], ['reticular', [2.2, 0.6, 0.5]]];
  const C = ['#b9a6ea', '#f2a3c6', '#bfe1ff']; const NM = ['celule', 'fibre', 'SF'];
  return {
    home: HOME, cams: T.map((_, i) => cam(150 + i * 235 > 500 ? 560 : 440, 470, 1.15)), anchors: T.map((_, i) => [150 + i * 235, 140]),
    labels: [...T.map(([n], i) => lbl([150 + i * 235, 830], n)), lbl([150 + 3 * 235, 190], 'fibrele nu se văd în HE', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      T.forEach(([n, v], i) => {
        const x = 150 + i * 235; const tot = v.reduce((a, c) => a + c, 0); let y = 780;
        const on = b.i === i; const grow = on ? ease(b.bt * 1.2) : 1;
        v.forEach((val, j) => { const h = 560 * val / tot * grow; const p = new Path2D(); p.roundRect(x - 70, y - h, 140, h, 12); paint(g, p, C[j], null, null, [x - 70, y - h, 140, h], OUT, 6); if (i === 3 && j === 1) { g.save(); g.setLineDash([10, 8]); g.strokeStyle = '#fff'; g.lineWidth = 3; g.stroke(p); g.restore(); } if (h > 50) { g.save(); g.fillStyle = OUT; g.font = '800 24px Inter, sans-serif'; g.textAlign = 'center'; g.fillText(NM[j], x, y - h / 2 + 8); g.restore(); } y -= h + 6; });
        if (on) glowRing(g, x, 500, 100, 310, 0, ease(b.bt * 1.5));
      });
    },
  };
}

/* =================================================== 3 · OSPE (ca la LP 6) */
function ospe() {
  const R = 250, C0 = [500, 330];
  const segs = [[0, 1, '#6d6178'], [1, 1.5, '#e07bb0'], [1.5, 3, '#c2558c'], [3, 3.75, '#9a2f66'], [3.75, 4, '#ff9fd0'], [4, 7, '#4a3d58']];
  const ang = (m) => -Math.PI / 2 + (m / 7) * Math.PI * 2;
  const clk = (m, out) => [C0[0] + Math.cos(ang(m)) * (R + out), C0[1] + Math.sin(ang(m)) * (R + out)];
  const pil = [[330, 150], [500, 210], [670, 270]]; const tA = [0.5, 1.25, 2.4, 3.4];
  return {
    home: HOME, cams: [cam(500, 700, 1.25), cam(500, 690, 1.25), cam(500, 680, 1.25)], anchors: pil.map(([x, h]) => [x, 900 - h - 30]),
    labels: [lbl(clk(0, 50), '0:00 · 7 min'), lbl(clk(0.5, 70), '1 min: citești'), lbl(clk(2.4, 90), 'scriptul: 2–3 min'), lbl(clk(6, 80), '6:00 · „mai e 1 minut”')],
    phase: (i) => ['Recunoașterea', 'Descrierea', 'Diagnosticul diferențial'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      g.save(); segs.forEach(([a, c, col], k) => { const on = (b.i === 0 && k === 1) || (b.i === 1 && k === 2) || (b.i === 2 && k === 3); g.strokeStyle = OUT; g.lineWidth = 48; g.beginPath(); g.arc(C0[0], C0[1], R, ang(a), ang(c)); g.stroke(); g.strokeStyle = col; g.lineWidth = 38; if (on) { g.shadowColor = col; g.shadowBlur = 22; } g.beginPath(); g.arc(C0[0], C0[1], R, ang(a) + 0.01, ang(c) - 0.01); g.stroke(); g.shadowBlur = 0; }); g.restore();
      const tm = b.i < 0 ? (t * 0.9) % 7 : tA[b.i] + clamp(b.bt / b.bd) * ((tA[b.i + 1] ?? 4) - tA[b.i]);
      g.save(); g.strokeStyle = OUT; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(C0[0], C0[1]); g.lineTo(...clk(tm, -60)); g.stroke(); g.strokeStyle = '#fff'; g.lineWidth = 9; g.stroke(); g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.arc(C0[0], C0[1], 20, 0, 7); g.fill(); g.stroke(); g.restore();
      pil.forEach(([x, h], i) => { const on = b.i === i; const hh = h * (on ? 1.08 : 1); const p = new Path2D(); p.roundRect(x - 62, 900 - hh, 124, hh, 14); paint(g, p, ['#e07bb0', '#c2558c', '#9a2f66'][i], null, null, [x - 62, 900 - hh, 124, hh], OUT, 7); g.fillStyle = '#fff'; g.font = '800 46px "Plus Jakarta Sans", Inter, sans-serif'; g.textAlign = 'center'; g.fillText(String(i + 1), x, 900 - hh / 2 + 16); });
    },
  };
}

/* =================================================== LAMA 1 · LAX */
function laxRec() {
  return {
    home: HOME, cams: [cam(230, 230, 1.9), cam(270, 260, 2.6), cam(500, 450, 1.5), cam(330, 220, 2.4)],
    anchors: [[230, 50], [140, 300], [500, 400], [370, 190]],
    inset: () => ({ img: 'lax', cap: 'Așa arată pe lamă · HE, ob. mic' }),
    labels: [lbl([230, 440], 'lobul mamar', { beats: [-1, 0] }), lbl([600, 440], 'conjunctiv dens', { beats: [2] }), lbl([120, 330], 'conjunctiv lax (în lobul)', { beats: [1] }), lbl([370, 160], 'capilar', { beats: [3] })],
    draw(g, t, b) {
      laxField(g, t);
      if (b.i === 0) glowRing(g, 230, 230, 195, 180, 0, ease(b.bt * 1.5));
      if (b.i === 1) glowRing(g, 135, 300, 50, 50, 0, ease(b.bt * 1.5));
      if (b.i === 2) glowRing(g, 500, 450, 110, 60, -0.05, ease(b.bt * 1.5));
      if (b.i === 3) glowRing(g, 370, 190, 30, 30, 0, ease(b.bt * 1.5));
    },
  };
}
function laxMare() {
  srand(41);
  const fib = Array.from({ length: 16 }, (_, k) => { const x = rr(40, 960), y = rr(60, 880), a = rr(0, 3.14), L = rr(180, 320); return wavy(x, y, x + Math.cos(a) * L, y + Math.sin(a) * L, 8, 2, k, 10); });
  return {
    home: HOME, cams: [cam(500, 467, 1.2), cam(320, 300, 2.4), cam(680, 560, 2.4), cam(560, 260, 2.2)],
    anchors: [[150, 180], [320, 250], [680, 510], [560, 200]],
    inset: () => ({ img: 'lax_mare', cap: 'Lax pe lamă · HE, ob. mare' }),
    labels: [lbl([320, 360], 'fibroblast: nucleu palid', { beats: [1] }), lbl([680, 620], 'fibrocit: nucleu închis', { beats: [2] }), lbl([600, 330], 'limfocit · plasmocit', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#fdf0f6', '#f7dfeb');
      g.save(); g.fillStyle = 'rgba(160,190,255,.22)'; for (let k = 0; k < 120; k++) { const x = (k * 97) % 1000, y = (k * 53) % 934; g.beginPath(); g.arc(x, y, 3, 0, 7); g.fill(); } g.restore();
      fib.forEach((p) => bundle(g, p, 12, { n: 3, c: { col: '#f5b5d0', colL: '#ffe0ec', colS: '#e293b6' } }));
      fibroblastRod(g, 320, 300, 0.55, 0.3, t);
      fibrocyteRod(g, 680, 560, 0.5, -0.4, t);
      lymphocyte(g, 540, 250, 1.0, t); plasmocyte(g, 620, 240, 0.75, 0.3, t);
      capTrans(g, 160, 700, 30, t); capTrans(g, 860, 160, 26, t);
      if (b.i === 0) glowRing(g, 150, 180, 130, 40, 0.3, ease(b.bt * 1.5));
    },
  };
}
function capillaries() {
  return {
    home: HOME, cams: [cam(500, 250, 1.6), cam(300, 620, 2.0)],
    anchors: [[500, 140], [300, 520]],
    labels: [lbl([500, 340], '„dinții unui fierăstrău” + hematii în șir indian', { beats: [0] }), lbl([300, 720], '1, maximum 2 nuclei', { beats: [1] })],
    draw(g, t, b) {
      bgFill(g, '#fdf0f6', '#f7dfeb');
      capLong(g, 120, 250, 880, 52, t);
      capTrans(g, 300, 620, 70, t);
      acinus(g, 820, 650, 90, t);
      if (b.i === 0) glowRing(g, 500, 250, 400, 50, 0, ease(b.bt * 1.5));
      if (b.i === 1) glowRing(g, 300, 620, 82, 82, 0, ease(b.bt * 1.5));
    },
  };
}

/* =================================================== LAMA 2 · ADIPOS */
function adiRec() {
  let F = null;
  return {
    home: HOME, cams: [cam(420, 420, 1.6), cam(430, 330, 2.6), cam(560, 470, 2.6), cam(500, 120, 1.6)],
    anchors: [[420, 330], [430, 300], [562, 430], [500, 60]],
    inset: () => ({ img: 'adi', cap: 'Așa arată pe lamă · HE' }),
    labels: [lbl([420, 520], 'adipocit: vacuolă goală', { beats: [-1, 0] }), lbl([430, 260], 'nucleu turtit = pecetea', { beats: [1] }), lbl([562, 510], 'celule strâns una lângă alta', { beats: [2] }), lbl([500, 140], 'lobul mamar alături', { beats: [3] })],
    draw(g, t, b) {
      F = adiField(g, t);
      // lobul mamar alături (sus)
      g.save(); g.fillStyle = 'rgba(255,240,247,.9)'; g.fillRect(-100, -100, 1200, 160); g.restore();
      for (let k = 0; k < 7; k++) acinus(g, 120 + k * 130, 20, 34, t);
      if (b.i === 0) glowRing(g, 420, 420, 90, 85, 0, ease(b.bt * 1.5));
    },
  };
}
function adiWhy() {
  const phases = ['1 · în corp: o picătură de trigliceride', '2 · uniloculat → nucleu împins la margine', '3 · grupate → poligonale (fagure)', '4 · Sudan / Szekely pe secțiune la gheață'];
  return {
    home: HOME, cams: [cam(330, 420, 1.6), cam(330, 420, 1.6), cam(700, 470, 1.4), cam(500, 467, 1.0)],
    anchors: [[330, 230], [430, 300], [700, 200], [820, 760]],
    labels: [lbl([330, 640], 'trigliceride', { beats: [0] }), lbl([600, 640], 'alcool + xilen → lipidele se dizolvă', { beats: [0, 1] }), lbl([820, 860], 'lipide colorate', { beats: [3] })],
    phase: (i) => phases[i] || 'de ce e „goală”',
    draw(g, t, b) {
      bgFill(g, '#fbe9f1', '#f6dcea');
      const u = u01(b, 0.7); const dis = b.i === 0 ? ease((u - 0.4) / 0.6) : b.i >= 1 ? 1 : 0;
      // adipocitul: picătura de lipid (galbenă) se dizolvă → vacuolă goală
      g.save(); g.fillStyle = '#ffffff'; g.strokeStyle = '#f2a3c6'; g.lineWidth = 10; g.beginPath(); g.arc(330, 420, 170, 0, 7); g.fill(); g.stroke(); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(); g.restore();
      if (dis < 1) { g.save(); g.globalAlpha = 1 - dis; paint(g, blob(330, 420, 158, 158, 0, t, 0.01, 18, 1), '#ffe08a', '#f2c45a', '#fff6cf', bb(330, 420, 158, 158), OUT, 0); g.restore(); }
      paint(g, spindle(330, 258, 120, 26, 0, t, 3), HE.nuc, HE.nucS, null, bb(330, 258, 60, 13), OUT, 3);
      if (b.i === 0) { for (let k = 0; k < 6; k++) { const a = k + t; g.save(); g.globalAlpha = dis; g.fillStyle = '#ffe08a'; g.beginPath(); g.arc(560 + Math.cos(a) * 30 + k * 18, 420 + Math.sin(a) * 50, 10, 0, 7); g.fill(); g.restore(); } arrow(g, 520, 420, 640, 420, '#a8ffcf'); }
      if (b.i === 2) { const cells = honeycomb(5, 560, 260, 3, 3, 70); cells.forEach((c) => adiCell(g, c.pts, c.nuc, t)); }
      if (b.i === 3) { g.save(); g.fillStyle = '#ffffff'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.arc(820, 700, 120, 0, 7); g.fill(); g.stroke(); g.clip(); for (let k = 0; k < 7; k++) { const x = 760 + (k % 3) * 60, y = 640 + Math.floor(k / 3) * 60; paint(g, blob(x, y, 30, 28, 0, t, 0.03, 10, k), '#ff8a3c', '#e0601c', '#ffd1a8', bb(x, y, 30, 28), OUT, 2); } g.restore(); g.save(); g.fillStyle = '#fff'; g.font = '800 22px Inter, sans-serif'; g.textAlign = 'center'; g.fillText('Sudan: lipidele portocalii', 820, 860); g.restore(); }
    },
  };
}

/* =================================================== LAMA 3 · TENDINOS */
function tenRec() {
  let F = null;
  const near = (fx, fy) => { if (!F) return toWorldTen(fx, fy); let best = F.twins[0], d = 1e9; for (const p of F.twins) { const e = Math.hypot(p[0] - fx, p[1] - fy); if (e < d) { d = e; best = p; } } return toWorldTen(best[0], best[1]); };
  const tw = () => near(700, 467);
  return {
    home: HOME, cams: [cam(500, 467, 1.3), cam(500, 467, 1.9), cam(500, 467, 2.6), cam(500, 467, 1.9)],
    anchors: [() => { const p = toWorldTen(300, 400); return p; }, () => { const p = near(450, 540); return [p[0], p[1] - 30]; }, () => { const p = tw(); return [p[0], p[1] - 34]; }, () => toWorldTen(560, 319)],
    inset: () => ({ img: 'ten', cap: 'Așa arată pe lamă · HE' }),
    labels: [lbl(toWorldTen(700, 690), 'fascicule paralele de colagen', { beats: [-1, 0] }), lbl(() => { const p = near(450, 540); return [p[0], p[1] + 34]; }, 'nuclei de tenocite', { beats: [1] }), lbl(() => { const p = tw(); return [p[0], p[1] + 40]; }, '„nuclei gemeni”', { beats: [2] }), lbl(() => { const p = toWorldTen(560, 319); return [p[0], p[1] + 30]; }, 'fantă albă (artefact)', { beats: [3] })],
    draw(g, t, b) {
      F = tenField(g, t);
      if (b.i === 2) { const [x, y] = tw(); glowRing(g, x, y, 70, 26, 0.42, ease(b.bt * 1.5)); }
      if (b.i === 0) { const [x, y] = toWorldTen(300, 400); glowRing(g, x, y, 260, 34, 0.42, ease(b.bt * 1.5)); }
    },
  };
}
function tenWhy() {
  return {
    home: HOME, cams: [cam(500, 300, 1.2), cam(500, 300, 1.2), cam(500, 300, 1.6), cam(500, 700, 1.4)],
    anchors: [[500, 170], [300, 420], [620, 300], [500, 515]],
    labels: [lbl([140, 300], 'mușchi'), lbl([870, 300], 'os'), lbl([500, 440], 'puține celule, puține vase → vindecare lentă', { beats: [1] }), lbl([500, 965], 'transversal (din manuale): fascicule poligonale, tenocite „în aripi” între fibre', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#fbe9f1', '#f6dcea');
      // mușchi → tendon → os
      paint(g, (() => { const p = new Path2D(); p.roundRect(40, 210, 200, 180, 30); return p; })(), '#d0566f', '#b03c56', '#f2909f', [40, 210, 200, 180], OUT, 7);
      paint(g, (() => { const p = new Path2D(); p.roundRect(760, 200, 200, 200, 20); return p; })(), '#f2ead6', '#ddd0b0', '#fffaf0', [760, 200, 200, 200], OUT, 7);
      const st = b.i === 0 ? 0.5 + 0.5 * Math.sin(t * 2.5) : 0;
      for (let k = 0; k < 4; k++) bundle(g, wavy(230, 250 + k * 34, 770, 250 + k * 34, 4 * (1 - st), 4, k, 20), 26, { n: 3 });
      for (let k = 0; k < 3; k++) { const x = 340 + k * 150, y = 284 + (k % 2) * 34; paint(g, spindle(x, y, 40, 10, 0, t, k), HE.nuc, HE.nucS, null, bb(x, y, 20, 5), OUT, 2); paint(g, spindle(x + 44, y, 40, 10, 0, t, k + 5), HE.nuc, HE.nucS, null, bb(x + 44, y, 20, 5), OUT, 2); }
      arrow(g, 520, 160, 300 - st * 20, 160, '#ffffff'); g.save(); g.fillStyle = OUT; g.font = '800 24px Inter, sans-serif'; g.textAlign = 'center'; g.fillText('forța de tracțiune', 520, 130); g.restore();
      if (b.i === 2) glowRing(g, 512, 284, 70, 22, 0, ease(b.bt * 1.5));
      if (b.i === 3 || b.i < 0) {
        // secțiune transversală: fascicule poligonale, tenocite stelate între ele
        srand(4); const R = 66, cx0 = 500, cy0 = 712;
        const C = [[0, 0]]; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; C.push([Math.cos(a) * R * 1.732, Math.sin(a) * R * 1.732]); }
        // endotenon: conjunctiv lax subțire între fascicule (fond palid)
        g.save(); g.fillStyle = '#fbe3ee'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.arc(cx0, cy0, R * 2.75, 0, 7); g.fill(); g.stroke(); g.restore();
        C.forEach(([dx, dy], k) => {
          const x = cx0 + dx, y = cy0 + dy; const p = new Path2D(); const vs = [];
          for (let v = 0; v < 6; v++) { const a = v * Math.PI / 3; const r = R * 0.93 * rr(0.96, 1.03); vs.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); }
          vs.forEach(([px, py], v) => (v ? p.lineTo(px, py) : p.moveTo(px, py))); p.closePath();
          g.save(); g.fillStyle = '#f39cc3'; g.fill(p); g.clip(p);
          // fibrele de colagen secționate transversal: puncte fine
          g.fillStyle = '#e07fac'; for (let n = 0; n < 150; n++) { const px = x + rr(-R, R), py = y + rr(-R, R); g.beginPath(); g.arc(px, py, rr(1.6, 3), 0, 7); g.fill(); }
          // tenocite stelate ÎN fascicul, între fibre („în aripi”)
          for (let n = 0; n < 3; n++) {
            const a0 = k + n * 2.1, tx = x + Math.cos(a0) * R * 0.42, ty = y + Math.sin(a0) * R * 0.42;
            for (const [col, lw] of [[OUT, 5], ['#c45f93', 2.5]]) { g.strokeStyle = col; g.lineWidth = lw; g.lineCap = 'round'; for (let w = 0; w < 3; w++) { const a = a0 + w * 2.09; g.beginPath(); g.moveTo(tx, ty); g.quadraticCurveTo(tx + Math.cos(a + 0.3) * 12, ty + Math.sin(a + 0.3) * 12, tx + Math.cos(a) * 22, ty + Math.sin(a) * 22); g.stroke(); } }
            paint(g, blob(tx, ty, 8, 5.5, a0, t, 0.02, 8, k * 3 + n), HE.nuc, HE.nucS, null, bb(tx, ty, 8, 6), OUT, 2);
          }
          g.restore(); g.save(); g.strokeStyle = OUT; g.lineWidth = 4; g.lineJoin = 'round'; g.stroke(p); g.restore();
        });
      }
    },
  };
}

/* =================================================== LAMA 4 · RETICULAR */
function retRec() {
  let F = null;
  return {
    home: HOME, cams: [cam(450, 400, 1.5), cam(430, 180, 2.6), cam(500, 270, 2.6), cam(300, 730, 1.8)],
    anchors: [[480, 330], [430, 120], [500, 240], [300, 650]],
    inset: (i) => (i === 1 || i === 2 ? { img: 'ret_mare', cap: 'Reticular pe lamă · ob. mare' } : { img: 'ret', cap: 'Așa arată pe lamă · HE' }),
    labels: [lbl([480, 420], 'ochi clar (medulară)', { beats: [0] }), lbl([430, 250], 'celulă reticulară', { beats: [-1, 1] }), lbl([500, 300], 'limfocit', { beats: [2] }), lbl([300, 820], 'cordon dens de limfocite', { beats: [3] })],
    draw(g, t, b) {
      F = retHEField(g, t);
      if (b.i === 0) glowRing(g, 480, 330, 70, 55, 0, ease(b.bt * 1.5));
      if (b.i === 3) glowRing(g, 300, 730, 260, 80, -0.1, ease(b.bt * 1.5));
    },
  };
}
function retWhy() {
  return {
    home: HOME, cams: [cam(260, 470, 1.7), cam(680, 470, 1.6), cam(680, 470, 1.6)],
    anchors: [[260, 220], [680, 220], [680, 720]],
    labels: [lbl([260, 760], 'limfocite dese: rețeaua ascunsă'), lbl([680, 760], 'medulara: se vede rețeaua'), lbl([680, 380], 'pseudorețeaua dublează rețeaua de fibre (nu se văd în HE)', { beats: [2] })],
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      fieldC(g, 260, 470, 220, () => { g.save(); g.fillStyle = '#fbeef4'; g.fillRect(40, 250, 440, 440); srand(3); for (let k = 0; k < 160; k++) lymphocyte(g, rr(50, 470), rr(260, 680), 0.6, t); g.restore(); });
      fieldC(g, 680, 470, 220, () => { g.save(); g.translate(460, 250); g.scale(0.44, 0.47); retHEField(g, t); g.restore();
        if (b.i === 2) { g.save(); g.setLineDash([8, 6]); g.strokeStyle = '#151017'; g.lineWidth = 3; const RC = [[220, 240], [430, 180], [330, 430], [560, 380], [760, 470], [460, 620], [690, 650], [850, 330], [140, 470]].map(([x, y]) => [460 + x * 0.44, 250 + y * 0.47]); RC.forEach((p, i) => RC.forEach((q, j) => { if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < 115) { g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(q[0], q[1]); g.stroke(); } })); g.restore(); } });
      if (b.i === 0) glowRing(g, 260, 470, 230, 230, 0, ease(b.bt * 1.5));
      if (b.i === 1) glowRing(g, 680, 470, 230, 230, 0, ease(b.bt * 1.5));
    },
  };
}

/* =================================================== DD: două câmpuri */
function ddPair({ spec }) {
  const o = spec.sceneOpts; const F = { lax: laxField, adi: adiField, ten: tenField, retHE: retHEField, retAg: agField };
  return {
    home: HOME, cams: [cam(500, 470, 1.0), cam(500, 470, 1.0), cam(500, 470, 1.0)],
    anchors: [[260, 140], [740, 140], [500, 800]],
    labels: [lbl([260, 820], o.l), lbl([740, 820], o.r)],
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      fieldC(g, 260, 470, 225, () => { g.save(); g.translate(35, 245); g.scale(0.45, 0.48); F[o.a](g, t); g.restore(); });
      fieldC(g, 740, 470, 225, () => { g.save(); g.translate(515, 245); g.scale(0.45, 0.48); F[o.b](g, t); g.restore(); });
      if (b.i >= 0) { glowRing(g, 260, 470, 235, 235, 0, ease(b.bt * 1.5)); glowRing(g, 740, 470, 235, 235, 0, ease(b.bt * 1.5)); }
    },
  };
}
// fibre de reticulină în impregnație argentică (LP 6, lama 3) — pentru DD
const AGN = {};
function agField(g, t) {
  bgFill(g, AG.bg, AG.bg2);
  const T = [[230, 230, 120], [520, 200, 95], [790, 260, 125], [320, 520, 105], [610, 470, 118], [880, 560, 92], [180, 780, 110], [470, 760, 100], [760, 790, 118]];
  T.forEach(([x, y, r]) => tubule(g, x, y, r));
  if (!AGN.E) { srand(9); const nodes = []; T.forEach(([x, y, r]) => { const n = Math.round(r / 9); for (let k = 0; k < n; k++) { const a = k / n * 6.28; nodes.push([x + Math.cos(a) * (r + 6), y + Math.sin(a) * (r + 6)]); } }); for (let k = 0; k < 120; k++) { const p = [rr(-20, 1020), rr(-20, 950)]; if (T.every(([x, y, r]) => Math.hypot(p[0] - x, p[1] - y) > r + 10)) nodes.push(p); } AGN.E = makeNet(nodes, 3, 95); }
  drawNet(g, AGN.E, AG.fib, 5.5);
}

/* =================================================== SCRIPT */
function script({ spec }) {
  const o = spec.sceneOpts || {}; const n = spec.script.length; const tot = spec.durs.reduce((a, c) => a + c, 0);
  const F = { lax: laxField, adi: adiField, ten: tenField, ret: retHEField };
  const WS = 600, HS = 897;
  return {
    W: WS, H: HS, home: cam(300, 448, 1), cams: null, anchors: [],
    phase: (i) => (i >= 0 ? `${spec.script[i].tm} · ${spec.script[i].at}` : ''),
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a', WS, HS);
      fieldC(g, 300, 300, 230, () => { g.save(); g.translate(70, 70); g.scale(0.46, 0.49); F[o.f](g, t); g.restore(); });
      const C0 = [300, 700], R = 130; let acc = 0;
      spec.durs.forEach((d, i) => { const a0 = acc / tot, a1 = (acc + d) / tot; acc += d; const on = i === b.i, done = i < b.i; g.save(); g.strokeStyle = OUT; g.lineWidth = 36; g.beginPath(); g.arc(C0[0], C0[1], R, -Math.PI / 2 + a0 * Math.PI * 2, -Math.PI / 2 + a1 * Math.PI * 2 - 0.03); g.stroke(); g.strokeStyle = on ? '#ff9fd0' : done ? '#c2558c' : '#4a3d58'; g.lineWidth = 26; if (on) { g.shadowColor = '#ff9fd0'; g.shadowBlur = 20; } g.stroke(); g.restore(); });
      let f = 0; if (b.i >= 0) { let a = 0; for (let k = 0; k < b.i; k++) a += spec.durs[k]; f = (a + spec.durs[b.i] * clamp(b.bt / b.bd)) / tot; }
      const ang = -Math.PI / 2 + f * Math.PI * 2; g.save(); g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(C0[0] + Math.cos(ang) * R, C0[1] + Math.sin(ang) * R, 16, 0, 7); g.fill(); g.stroke(); g.restore();
      g.save(); g.fillStyle = '#fff'; g.font = '800 40px "Plus Jakarta Sans", Inter, sans-serif'; g.textAlign = 'center'; g.fillText(b.i >= 0 ? `${b.i + 1}/${n}` : '3 min', C0[0], C0[1] + 14); g.restore();
    },
  };
}

/* =================================================== RECAPITULARE */
function recap() {
  const F = [laxField, adiField, tenField, retHEField]; const pos = [[270, 230], [730, 230], [270, 700], [730, 700]]; const k = [0, 0, 0, 0];
  return {
    home: HOME, cams: pos.map(([x, y]) => cam(x, y, 1.5)), anchors: [],
    draw(g, t, b) {
      bgFill(g, '#3a1d47', '#160b1d');
      pos.forEach(([x, y], i) => { k[i] = lerp(k[i], b.i === i ? 1 : 0, 0.08); fieldC(g, x, y, 180, () => { g.save(); g.translate(x - 180, y - 180); g.scale(0.36, 0.385); F[i](g, t); g.restore(); }); if (k[i] > 0.05) glowRing(g, x, y, 195, 195, 0, k[i]); });
    },
  };
}

function fallback() { return { home: HOME, anchors: [], draw(g) { bgFill(g, '#2e1838', '#140a1a'); } }; }

export const SCENES = { atlas, mosaic, cover, props, ospe, laxRec, laxMare, capillaries, adiRec, adiWhy, tenRec, tenWhy, retRec, retWhy, ddPair, script, recap, fallback };
