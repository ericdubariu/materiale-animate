// Câmpurile cartoon ale celor 7 lame din LP 6–7 (țesutul conjunctiv), portate din deck-urile LP 6 și LP 7.
// Fiecare câmp = lume 1000×934: field(k) → { A: puncte de reper, draw(g, t, st) }; fieldThumb = miniatură rotundă.
import {
  OUT, HE, VG, AG, lerp, srand, rnd, rr, smooth, blob, spindle, paint, bb, glowRing,
  fibroblast, fibrocyte, lymphocyte, plasmocyte, macrophage, adipocyte, capillary, bundle, wavy,
  makeNet, drawNet, tubule, REDUCED,
} from './kit2d.js';

export const W = 1000, H = 934;
export function bgFill(g, a, b, w = W, h = H) { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(-3000, -3000, w + 6000, h + 6000); }

/* ---------------- celule specifice (din LP 7) ---------------- */
function fibroblastRod(g, x, y, s, rot, t) { fibrocyte(g, x, y, s, rot, t, { cyto: '#d9c8f4', cytoS: '#b9a2ea', nuc: '#b3a8ef', nucS: '#8f84e0', nucL: '#e6e1ff' }); paint(g, blob(x, y, 11 * s, 9 * s, rot, t, 0.02, 10, 9), '#2a1670', '#170b4a', '#6a52d0', bb(x, y, 11 * s, 9 * s), OUT, 2.5 * Math.max(0.6, s)); }
function acinus(g, x, y, r, t) {
  paint(g, blob(x, y, r, r * 0.92, 0, t, 0.05, 12, x), '#b9a6ea', '#9a84dc', '#e1d8fb', bb(x, y, r, r), OUT, 5);
  g.save(); g.fillStyle = '#fff7fb'; g.beginPath(); g.ellipse(x, y, r * 0.36, r * 0.32, 0, 0, 7); g.fill(); g.strokeStyle = OUT; g.lineWidth = 2.5; g.stroke(); g.restore();
  const n = Math.max(7, Math.round(r / 6)); g.save(); g.fillStyle = HE.nuc;
  for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; g.beginPath(); g.ellipse(x + Math.cos(a) * r * 0.66, y + Math.sin(a) * r * 0.62, Math.max(3, r * 0.1), Math.max(2.5, r * 0.08), a, 0, 7); g.fill(); }
  g.restore();
}
function adiNuc(pts, nucIdx) {
  const a = pts[nucIdx], b = pts[(nucIdx + 1) % pts.length]; const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
  const cx = pts.reduce((s, q) => s + q[0], 0) / pts.length, cy = pts.reduce((s, q) => s + q[1], 0) / pts.length;
  return [mx + (cx - mx) * 0.07, my + (cy - my) * 0.07, Math.atan2(b[1] - a[1], b[0] - a[0]), cx, cy];
}
function adiCell(g, pts, nucIdx, t, pass = 0) {
  const p = smooth(pts);
  if (pass === 1) { const [ix, iy, ang] = adiNuc(pts, nucIdx); paint(g, spindle(ix, iy, 46, 12, ang, t, nucIdx), HE.nuc, HE.nucS, null, bb(ix, iy, 23, 6), OUT, 2.5); return; }
  g.save(); g.fillStyle = '#ffffff'; g.fill(p); g.lineJoin = 'round';
  g.strokeStyle = '#f2a3c6'; g.lineWidth = 7; g.stroke(p); g.strokeStyle = OUT; g.lineWidth = 2.5; g.stroke(p); g.restore();
}
function honeycomb(seed, x0, y0, cols, rows, R) {
  srand(seed); const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const cx = x0 + c * R * 1.73 + (r % 2 ? R * 0.87 : 0), cy = y0 + r * R * 1.5;
    const pts = []; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; pts.push([cx + Math.cos(a) * R * rr(0.9, 1.04), cy + Math.sin(a) * R * rr(0.9, 1.04)]); }
    cells.push({ pts, nuc: Math.floor(rr(0, 6)), c: [cx, cy] });
  }
  return cells;
}
function capTrans(g, x, y, r, t) {
  g.save(); g.fillStyle = '#f5b9cf'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#fff1f6'; g.beginPath(); g.arc(x, y, r * 0.66, 0, 7); g.fill(); g.restore();
  paint(g, blob(x - r * 0.48, y - r * 0.15, r * 0.3, r * 0.22, 0.6, t, 0.03, 10, 2), HE.nuc, HE.nucS, null, bb(x, y, r * 0.3, r * 0.2), OUT, 2.5);
  paint(g, blob(x + r * 0.5, y + r * 0.25, r * 0.26, r * 0.19, -0.5, t, 0.03, 10, 5), HE.nuc, HE.nucS, null, bb(x, y, r * 0.26, r * 0.19), OUT, 2.5);
}
export function reticularCell(g, x, y, s, t, arms) {
  const pts = []; const n = 60;
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; let r = 30; for (const [aa, L] of arms) { const d = Math.atan2(Math.sin(a - aa), Math.cos(a - aa)); r += (L - 30) * Math.exp(-(d * d) / 0.02); } const b = 0.01 * (REDUCED ? 0 : Math.sin(t * 1.4 + i)); pts.push([x + Math.cos(a) * r * s * (1 + b), y + Math.sin(a) * r * s * (1 + b)]); }
  paint(g, smooth(pts), '#f2b6cf', '#e294b6', '#ffe6f0', bb(x, y, 40 * s, 40 * s), OUT, 4);
  paint(g, blob(x, y, 22 * s, 21 * s, 0, t, 0.03, 12, x), '#d9d2fb', '#c3b9f4', '#ffffff', bb(x, y, 22 * s, 21 * s), '#6a50c4', 3);
}

/* =========================================================== LP 6 · 1 · ȚESUT DE GRANULAȚIE (HE) */
function makeGr() {
  return {
    A: { cap: [250, 700], fb: [300, 470], pl: [420, 610], ly: [350, 350], mac: [200, 150], col: [620, 300] },
    draw(g, t) {
      srand(5); bgFill(g, HE.bg, HE.bg2);
      for (let k = 0; k < 13; k++) { const x = rr(-80, 1000), y = rr(-40, 940), a = rr(-0.9, 0.9), L = rr(260, 520); bundle(g, wavy(x, y, x + Math.cos(a) * L, y + Math.sin(a) * L, rr(8, 16), rr(1.5, 3), rr(0, 6), 12), rr(14, 26), { n: 3 }); }
      for (const pts of [[[-60, 760], [250, 700], [520, 780], [820, 720], [1060, 770]], [[640, -40], [600, 200], [700, 380], [660, 560]], [[-40, 260], [180, 300], [340, 240]], [[780, 420], [900, 470], [1060, 430]]]) capillary(g, pts, 40, t, { n: 7, speed: 0.035 });
      adipocyte(g, 905, 620, 66, t); adipocyte(g, 840, 760, 58, t, { nucAngle: Math.PI });
      fibroblast(g, 300, 470, 0.45, 0.25, t); fibroblast(g, 470, 160, 0.38, -0.3, t);
      fibrocyte(g, 790, 260, 0.5, 0.5, t); fibrocyte(g, 160, 600, 0.45, -0.4, t);
      plasmocyte(g, 420, 610, 0.7, 0.4, t); plasmocyte(g, 560, 420, 0.62, -0.6, t);
      macrophage(g, 200, 150, 0.55, t, { seed: 4, inc: 4 });
      [[350, 330], [380, 360], [330, 380], [520, 560], [550, 600], [250, 560], [610, 300], [140, 420], [470, 300], [720, 600], [690, 160], [860, 120], [300, 700], [560, 700]].forEach(([x, y]) => lymphocyte(g, x, y, 0.75, t));
    },
  };
}
/* =========================================================== LP 6 · 2 · FIBRE DE COLAGEN (van Gieson) */
function makeCol() {
  const nuc = [[220, 300], [600, 330], [860, 300], [360, 505], [740, 515], [480, 625], [180, 820], [820, 845], [520, 170]];
  return {
    A: { thick: [500, 318], nuc: [360, 505], fat: [830, 745] },
    draw(g, t) {
      srand(7); bgFill(g, VG.bg, VG.bg2);
      const add = (x0, y0, x1, y1, w, amp, wv, ph) => bundle(g, wavy(x0, y0, x1, y1, amp, wv, ph, 18), w, { c: VG, n: Math.max(3, Math.round(w / 9)) });
      add(-60, 140, 1060, 210, 30, 18, 2.5, 0); add(-60, 330, 1060, 300, 70, 26, 2, 1); add(-60, 470, 1060, 520, 22, 16, 3, 2);
      add(-60, 640, 1060, 600, 52, 22, 2.2, 3); add(-60, 800, 1060, 850, 26, 14, 2.8, 4); add(100, -40, 380, 980, 18, 14, 3.5, 5);
      nuc.forEach(([x, y], k) => paint(g, spindle(x, y, 70, 17, 0.05 * (k % 3 - 1), t, k), VG.nuc, VG.nucS, VG.nucL, bb(x, y, 35, 8), OUT, 3));
      adipocyte(g, 880, 720, 62, t, { nuc: VG.nuc, nucS: VG.nucS, rim: '#c94d62' }); adipocyte(g, 770, 770, 54, t, { nuc: VG.nuc, nucS: VG.nucS, rim: '#c94d62', nucAngle: Math.PI });
    },
  };
}
/* =========================================================== LP 6 · 3 · FIBRE DE RETICULINĂ (argentic, rinichi) */
function makeRet() {
  const T = [[230, 230, 120], [520, 200, 95], [790, 260, 125], [320, 520, 105], [610, 470, 118], [880, 560, 92], [180, 780, 110], [470, 760, 100], [760, 790, 118]];
  srand(9); const nodes = [];
  T.forEach(([x, y, r]) => { const n = Math.round(r / 9); for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2 + rr(-0.15, 0.15); const rad = r + rr(2, 12); nodes.push([x + Math.cos(a) * rad, y + Math.sin(a) * rad]); } });
  for (let k = 0; k < 120; k++) { const p = [rr(-20, 1020), rr(-20, 950)]; if (T.every(([x, y, r]) => Math.hypot(p[0] - x, p[1] - y) > r + 10)) nodes.push(p); }
  const E = makeNet(nodes, 3, 95);
  return {
    A: { tub: [610, 470], mesh: [450, 625] }, T,
    draw(g, t, st = {}) {
      bgFill(g, AG.bg, AG.bg2);
      T.forEach(([x, y, r]) => tubule(g, x, y, r));
      drawNet(g, E, AG.fib, 5.5, st.prog ?? 1);
    },
  };
}
/* =========================================================== LP 7 · 1 · CONJUNCTIV LAX (HE, glanda mamară) */
function makeLax() {
  const lob = [[230, 230], [770, 230], [230, 710], [770, 710]];
  return {
    A: { lob: [770, 230], lax: [640, 300], dense: [500, 450], capT: [910, 190], cap: [620, 860] },
    draw(g, t) {
      srand(3); bgFill(g, '#fbe9f1', '#f6dcea');
      const dense = [wavy(-60, 470, 1060, 430, 18, 2, 0, 18), wavy(470, -60, 520, 1000, 16, 2.4, 1, 18)];
      dense.forEach((p) => { for (let k = -2; k <= 2; k++) bundle(g, p.map(([x, y]) => [x + k * 14, y + k * 14 * (p === dense[0] ? 1 : 0)]), 18, { c: { col: '#e985b2', colL: '#ffc4dc', colS: '#c95f92' }, n: 3 }); });
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
    },
  };
}
/* =========================================================== LP 7 · 2 · ADIPOS ALB (HE) */
function makeAdi() {
  const cells = honeycomb(12, 70, 120, 6, 6, 92);
  const c0 = cells[14]; const N = adiNuc(c0.pts, c0.nuc);
  return {
    A: { cell: [N[3], N[4]], nuc: [N[0], N[1]], cap: [562, 470] },
    draw(g, t) {
      bgFill(g, '#fbe9f1', '#f6dcea');
      cells.forEach((c) => adiCell(g, c.pts, c.nuc, t)); cells.forEach((c) => adiCell(g, c.pts, c.nuc, t, 1));
      capTrans(g, 245, 335, 14, t); capTrans(g, 562, 470, 14, t); capTrans(g, 720, 750, 14, t);
    },
  };
}
/* =========================================================== LP 7 · 3 · TENDINOS (HE, tendon longitudinal) */
const ANG = 0.42;
const toW = (x, y) => { const dx = x - 700, dy = y - 467; return [500 + dx * Math.cos(ANG) - dy * Math.sin(ANG), 467 + dx * Math.sin(ANG) + dy * Math.cos(ANG)]; };
function tenDraw(g, t) {
  srand(20); bgFill(g, '#f7cfe0', '#f1bcd3');
  const rows = 13; const twins = [], slits = [];
  g.save(); g.translate(500, 467); g.rotate(ANG); g.translate(-700, -467);
  for (let r = 0; r < rows; r++) {
    const y = 467 + (r - rows / 2) * 74;
    bundle(g, wavy(-100, y, 1500, y, 6, 4, r, 30), 58, { c: { col: '#f39cc3', colL: '#ffd0e4', colS: '#de7aa8' }, n: 6 });
    if (r % 3 === 1) { const p = smooth(wavy(100 + r * 30, y + 37, 700 + r * 40, y + 37, 3, 2, r, 10), false); g.save(); g.lineCap = 'round'; g.lineWidth = 14; g.strokeStyle = OUT; g.stroke(p); g.lineWidth = 9; g.strokeStyle = '#ffffff'; g.stroke(p); g.restore(); slits.push([400 + r * 35, y + 37]); }
    for (let k = 0; k < 4; k++) { const x = 120 + k * 330 + (r % 2) * 150 + rr(-30, 30); const yy = y + 36; paint(g, spindle(x, yy, 52, 12, 0, t, k), HE.nuc, HE.nucS, null, bb(x, yy, 26, 6), OUT, 2.5); paint(g, spindle(x + 58, yy, 52, 12, 0, t, k + 9), HE.nuc, HE.nucS, null, bb(x + 58, yy, 26, 6), OUT, 2.5); twins.push([x + 29, yy]); }
  }
  g.restore();
  return { twins: twins.map(([x, y]) => toW(x, y)), slits: slits.map(([x, y]) => toW(x, y)) };
}
function makeTen() {
  const c = document.createElement('canvas'); c.width = 4; c.height = 4; const R = tenDraw(c.getContext('2d'), 0);
  const tw = R.twins.filter(([x, y]) => x > 300 && x < 700 && y > 300 && y < 650)[0] || [500, 467];
  const sl = R.slits.filter(([x, y]) => x > 150 && x < 850 && y > 150 && y < 800)[0] || [500, 300];
  return { A: { twin: tw, slit: sl, bundle: toW(700, 467 - 37) }, draw: (g, t) => tenDraw(g, t) };
}
/* =========================================================== LP 7 · 4 · CONJUNCTIV RETICULAR (HE, nodul limfatic) */
function makeRt() {
  const RC = [[220, 240], [430, 180], [330, 430], [560, 380], [760, 470], [460, 620], [690, 650], [850, 330], [140, 470]];
  const LY = [[330, 300], [500, 270], [430, 520], [610, 530], [270, 360], [640, 420], [790, 560], [560, 760], [200, 590], [370, 640]];
  const E = []; RC.forEach((p, i) => RC.forEach((q, j) => { if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < 260) E.push([p, q]); }));
  return {
    A: { rc: RC[3], ly: LY[3], cord: [840, 180], mesh: [470, 330] },
    draw(g, t) {
      srand(31); bgFill(g, '#fbeef4', '#f4dde8');
      const cords = [[[60, 760], [260, 700], [420, 760], [560, 690]], [[640, 120], [760, 200], [900, 160], [1040, 220]]];
      cords.forEach((p) => { srand(p[0][0]); for (let k = 0; k < 70; k++) { const i = Math.floor(rr(0, p.length - 1)); const u = rnd(); const x = lerp(p[i][0], p[i + 1][0], u) + rr(-45, 45), y = lerp(p[i][1], p[i + 1][1], u) + rr(-45, 45); lymphocyte(g, x, y, 0.62, t); } });
      g.save(); g.lineCap = 'round';
      E.forEach(([p, q], k) => { const m = [(p[0] + q[0]) / 2 + Math.sin(k) * 18, (p[1] + q[1]) / 2 + Math.cos(k) * 18]; const pa = new Path2D(); pa.moveTo(p[0], p[1]); pa.quadraticCurveTo(m[0], m[1], q[0], q[1]); g.strokeStyle = OUT; g.lineWidth = 9; g.stroke(pa); g.strokeStyle = '#f2b6cf'; g.lineWidth = 5; g.stroke(pa); });
      g.restore();
      RC.forEach(([x, y], k) => reticularCell(g, x, y, 1.15, t, [[k, 70], [k + 2.1, 64], [k + 4.2, 68]]));
      LY.forEach(([x, y]) => lymphocyte(g, x, y, 0.85, t));
    },
  };
}

const MAKERS = { gr: makeGr, col: makeCol, ret: makeRet, lax: makeLax, adi: makeAdi, ten: makeTen, rt: makeRt };
const CACHE = {};
export function field(k) { if (!CACHE[k]) CACHE[k] = MAKERS[k](); return CACHE[k]; }
const TH = {};
export const FOCUS = { gr: [33, 0, 934], col: [33, 0, 934], ret: [33, 0, 934], lax: [33, 0, 934], adi: [33, 0, 934], ten: [33, 0, 934], rt: [33, 0, 934] };
export function thumb(k) {
  if (!TH[k]) { const c = document.createElement('canvas'); c.width = 620; c.height = 580; const x = c.getContext('2d'); x.scale(0.62, 0.62); try { field(k).draw(x, 0, {}); } catch (e) { console.error('thumb', k, e); } TH[k] = c; }
  return TH[k];
}
export function fieldThumb(g, k, x, y, r, ring = '#ffffff') {
  const th = thumb(k); const [sx, sy, sw] = FOCUS[k]; const s = 0.62;
  g.save(); g.beginPath(); g.arc(x, y, r, 0, 7); g.save(); g.clip(); g.fillStyle = '#100916'; g.fillRect(x - r, y - r, 2 * r, 2 * r);
  g.drawImage(th, sx * s, sy * s, sw * s, sw * s, x - r, y - r, 2 * r, 2 * r); g.restore();
  g.lineWidth = 10; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 4; g.strokeStyle = ring; g.globalAlpha = 0.35; g.stroke(); g.restore();
}
export const fieldKeys = Object.keys(MAKERS);
void glowRing;
