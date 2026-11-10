// Scenele cartoon 2D pentru piesele macroscopice 6–12 (Anatomie patologică, LP 1–2: tulburări hemodinamice).
import { OUT, clamp, lerp, ease, srand, rnd, rr, smooth, blob, blobPts, paint, bb, glowRing, arrow, REDUCED } from './kit2d.js';
// câmp rotund (cu Path2D: desenele din interior nu mai strică conturul)
function field(g, x, y, r, drawInside, ring = '#ffffff') { const c = new Path2D(); c.arc(x, y, r, 0, 7); g.save(); g.save(); g.clip(c); drawInside(); g.restore(); g.lineWidth = 10; g.strokeStyle = OUT; g.stroke(c); g.lineWidth = 4; g.strokeStyle = ring; g.globalAlpha = 0.35; g.stroke(c); g.restore(); }
import { atlas, mosaic } from './atlas.js';

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
// puncte aleatoare (textură) într-un contur
function stipple(g, path, box, n, cols, r0, r1, seed) {
  g.save(); g.clip(path); srand(seed); const [x, y, w, h] = box;
  for (let k = 0; k < n; k++) { g.fillStyle = cols[k % cols.length]; g.beginPath(); g.ellipse(x + rnd() * w, y + rnd() * h, rr(r0, r1), rr(r0, r1) * 0.8, rnd() * 3, 0, 7); g.fill(); }
  g.restore();
}
function sheen(g, path, x, y, rx, ry, a = 0.35) { g.save(); g.clip(path); g.globalAlpha = a; g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x, y, rx, ry, -0.4, 0, 7); g.fill(); g.restore(); }
const P = (pts) => smooth(pts);
function polyPath(pts) { const p = new Path2D(); p.moveTo(...pts[0]); for (const q of pts.slice(1)) p.lineTo(...q); p.closePath(); return p; }

/* =================================================== DESENELE PIESELOR (lume 1000×934) */

// 6 · aorta abdominală deschisă longitudinal, cu tromb parietal stratificat pe peretele stâng, extins în a. iliacă stângă
const AORTA = [[400, 40], [600, 40], [608, 300], [612, 560], [700, 690], [790, 890], [690, 905], [600, 720], [500, 650], [400, 720], [300, 905], [200, 890], [290, 690], [388, 560], [392, 300]];
const THR = [[398, 230], [470, 225], [482, 330], [478, 470], [470, 580], [420, 660], [340, 760], [282, 870], [236, 880], [300, 720], [380, 600], [392, 470], [396, 330]];
export function drawAorta(g, t, o = {}) {
  const ao = P(AORTA);
  paint(g, ao, '#e8cfa0', '#d2b07a', '#fff3d6', [200, 40, 590, 860], OUT, 7);
  // plăci de aterom (galbene, unele ulcerate)
  srand(5); const pl = [[540, 120], [450, 150], [560, 260], [550, 420], [575, 560], [650, 760], [700, 840], [520, 640], [455, 100]];
  pl.forEach(([x, y], k) => { const p = blob(x, y, rr(18, 30), rr(12, 20), rr(-1, 1), t, 0.12, 10, k); paint(g, p, '#f3d66b', '#d9b444', '#fff6c4', bb(x, y, 25, 16), OUT, 3); if (k % 3 === 0) { g.save(); g.fillStyle = '#9b1d2a'; g.beginPath(); g.ellipse(x, y, 7, 5, 0, 0, 7); g.fill(); g.restore(); } });
  if (o.noThr) return;
  // plăcile ulcerate de sub tromb (se văd pe jumătate la marginea lui)
  [[480, 330], [478, 460], [470, 575]].forEach(([x, y], k) => { paint(g, blob(x, y, 26, 18, 0.2, t, 0.12, 10, k + 20), '#f3d66b', '#d9b444', '#fff6c4', bb(x, y, 26, 18), OUT, 3); g.save(); g.fillStyle = '#9b1d2a'; g.beginPath(); g.ellipse(x + 4, y, 9, 6, 0, 0, 7); g.fill(); g.restore(); });
  const grow = o.grow ?? 1;
  const thr = P(THR);
  g.save(); if (grow < 1) { g.beginPath(); g.rect(0, 230, 1000, 660 * grow); g.clip(); }
  paint(g, thr, '#8e5a55', '#6f3d3a', '#c79b90', [236, 225, 246, 655], OUT, 6);
  // liniile Zahn: benzi alternante palide / roșii
  g.save(); g.clip(thr); for (let k = 0; k < 40; k++) { const y = 225 + k * 17; g.strokeStyle = k % 2 ? 'rgba(122,26,38,.75)' : 'rgba(222,196,186,.75)'; g.lineWidth = 7; g.beginPath(); g.moveTo(200, y + 30); g.bezierCurveTo(330, y - 10, 420, y + 20, 520, y - 40); g.stroke(); } g.restore();
  g.save(); g.clip(thr); g.globalAlpha = 0.28; stipple(g, thr, [230, 220, 260, 670], 160, ['#3f1d1c', '#e9d6cc'], 2, 5, 3); g.restore();
  g.restore();
}
// 7 · trunchiul a. pulmonare deschis, cu embolul „în șa” la bifurcație
const PA_T = [[500, 940], [500, 760], [500, 560], [500, 470]], PA_L = [[500, 470], [380, 410], [250, 380], [110, 400]], PA_R = [[500, 470], [620, 410], [750, 380], [890, 400]];
function tube(g, pts, w, col, inner) { const p = smooth(pts, false); g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = w + 12; g.stroke(p); g.strokeStyle = col; g.lineWidth = w; g.stroke(p); if (inner) { g.strokeStyle = inner; g.lineWidth = w * 0.55; g.stroke(p); } g.restore(); }
// linia mediană a lumenului (ramura stângă → bifurcație → ramura dreaptă)
const PA_CL = [[160, 395], [250, 382], [380, 410], [500, 474], [620, 410], [750, 382], [840, 395]];
function emPath(t) {
  const L = [0]; for (let i = 1; i < PA_CL.length; i++) L.push(L[i - 1] + Math.hypot(PA_CL[i][0] - PA_CL[i - 1][0], PA_CL[i][1] - PA_CL[i - 1][1]));
  const pts = []; const N = 60;
  for (let k = 0; k <= N; k++) { const d = k / N * L[L.length - 1]; let i = 1; while (i < L.length - 1 && L[i] < d) i++; const f = (d - L[i - 1]) / (L[i] - L[i - 1]); const a = PA_CL[i - 1], b = PA_CL[i]; const x = lerp(a[0], b[0], f), y = lerp(a[1], b[1], f); const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + Math.PI / 2; const c = 10 * Math.sin(k / N * Math.PI * 11 + (REDUCED ? 0 : t * 0.6)); pts.push([x + Math.cos(ang) * c, y + Math.sin(ang) * c]); }
  return pts;
}
export function drawEmbolus(g, t, o = {}) {
  // plămânii congestionați, roșu-violaceu
  const L = blob(220, 520, 230, 330, 0.08, t, 0.06, 16, 2), R = blob(780, 520, 230, 330, -0.08, t, 0.06, 16, 5);
  paint(g, L, '#7d2d4f', '#5a1d3a', '#a65678', [0, 190, 460, 660], OUT, 7); paint(g, R, '#7d2d4f', '#5a1d3a', '#a65678', [550, 190, 460, 660], OUT, 7);
  stipple(g, L, [0, 190, 460, 660], 140, ['#5a1d3a', '#9b3c62'], 3, 8, 4); stipple(g, R, [550, 190, 460, 660], 140, ['#5a1d3a', '#9b3c62'], 3, 8, 7);
  tube(g, PA_T, 120, '#ead9b8', '#f6ecd6'); tube(g, PA_L, 84, '#ead9b8', '#f6ecd6'); tube(g, PA_R, 84, '#ead9b8', '#f6ecd6');
  if (o.noEmb) return;
  const pts = o.pts || emPath(t); const p = smooth(pts, false); const show = o.show ?? 1;
  g.save(); if (show < 1) { g.beginPath(); g.rect(500 - 340 * show, 0, 680 * show, 1000); g.clip(); }
  g.lineCap = 'butt'; g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 40; g.stroke(p); g.strokeStyle = '#6a1c22'; g.lineWidth = 32; g.stroke(p);
  g.strokeStyle = '#8f2c2f'; g.lineWidth = 18; g.stroke(p);
  g.setLineDash([4, 14]); g.strokeStyle = 'rgba(240,215,205,.8)'; g.lineWidth = 28; g.stroke(p); g.setLineDash([]);
  // capete rupte, neregulate
  for (const e of [pts[0], pts[pts.length - 1]]) { const q = blob(e[0], e[1], 20, 17, 0, t, 0.35, 9, e[0]); paint(g, q, '#5a1519', null, null, bb(e[0], e[1], 20, 17), OUT, 4); }
  g.restore();
}
// rinichi pe secțiune longitudinală (hil la dreapta); o: {cortex, med, wedge:{a, p}, abscess, cortexW}
function beanPts(cx, cy, rx, ry, k = 0.33) { const pts = []; for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; const d = Math.atan2(Math.sin(a), Math.cos(a)); const r = 1 - k * Math.exp(-(d * d) / 0.18); pts.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]); } return pts; }
export function drawKidney(g, t, o = {}) {
  const cx = o.cx ?? 470, cy = o.cy ?? 470, s = o.s ?? 1; const rx = 360 * s, ry = 300 * s;
  const outer = P(beanPts(cx, cy, rx, ry)); const cw = o.cortexW ?? 0.8;
  paint(g, outer, o.cortex || '#c8573f', o.cortexS || '#bf5139', o.cortexL || '#e98a6f', [cx - rx, cy - ry, 2 * rx, 2 * ry], OUT, 7);
  const S = [cx + 210 * s, cy];
  // medulara: piramide cu baza la joncțiunea cortico-medulară, papila spre sinus
  const inner = beanPts(cx + 25 * s, cy, rx * cw, ry * cw, 0.42);
  g.save(); g.clip(outer);
  for (let k = 0; k < 9; k++) { const a = Math.PI * (0.5 + k / 8); const b0 = a - 0.16, b1 = a + 0.16; const mr = o.medR ?? 0.84; const pb = (an) => [S[0] + Math.cos(an) * 330 * s * mr, S[1] + Math.sin(an) * 255 * s * mr]; const ap = [S[0] + Math.cos(a) * 120 * s, S[1] + Math.sin(a) * 95 * s]; const tri = P([pb(b0), pb(a), pb(b1), ap]); paint(g, tri, o.med || '#8f2a35', o.medS || '#6c1b27', null, bb(ap[0], ap[1], 60, 60), OUT, 3); g.save(); g.clip(tri); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 2; for (let j = -3; j <= 3; j++) { const an = a + j * 0.04; g.beginPath(); g.moveTo(...ap); g.lineTo(S[0] + Math.cos(an) * 320 * s * mr, S[1] + Math.sin(an) * 250 * s * mr); g.stroke(); } g.restore(); }
  // sinusul renal: grăsime + bazinet
  const sin = blob(S[0] + 40 * s, S[1], 120 * s, 150 * s, 0, t, 0.08, 12, 3); paint(g, sin, '#f2e1b0', '#dcc387', '#fffbe6', bb(S[0], S[1], 120 * s, 150 * s), OUT, 4);
  const pel = P([[S[0] - 60 * s, S[1] - 60 * s], [S[0] + 10 * s, S[1] - 20 * s], [S[0] + 200 * s, S[1] - 10 * s], [S[0] + 200 * s, S[1] + 14 * s], [S[0] + 10 * s, S[1] + 20 * s], [S[0] - 60 * s, S[1] + 60 * s], [S[0] - 20 * s, S[1]]]); paint(g, pel, '#f7f1ea', '#e4d8cb', null, bb(S[0], S[1], 100, 40), OUT, 4);
  if (o.abscess) { srand(31); for (let k = 0; k < 22; k++) { const a = rr(1.6, 4.7), rr0 = rr(0.84, 0.96); const x = cx + Math.cos(a) * rx * rr0 * 0.95, y = cy + Math.sin(a) * ry * rr0 * 0.95; g.fillStyle = '#c42a2a'; g.beginPath(); g.arc(x, y, 13 * s, 0, 7); g.fill(); paint(g, blob(x, y, 8 * s, 8 * s, 0, t, 0.1, 8, k), '#f6e04b', null, null, bb(x, y, 8, 8), OUT, 2); } }
  if (o.wedge) {
    const a = o.wedge.a, sp = o.wedge.sp ?? 0.24, pr = o.wedge.p ?? 1; const bp = (an) => { const d = Math.atan2(Math.sin(an), Math.cos(an)); const r = 1 - 0.33 * Math.exp(-(d * d) / 0.18); return [cx + Math.cos(an) * rx * r * 1.02, cy + Math.sin(an) * ry * r * 1.02]; };
    const ap = [lerp(bp(a)[0], S[0], 0.58), lerp(bp(a)[1], S[1], 0.58)];
    const wpts = [bp(a - sp), bp(a - sp / 2), bp(a), bp(a + sp / 2), bp(a + sp), ap];
    const sc = (k) => wpts.map(([x, y]) => [ap[0] + (x - ap[0]) * k, ap[1] + (y - ap[1]) * k]);
    const core = polyPath(wpts);
    g.globalAlpha = pr; g.fillStyle = o.wedge.col || '#f0d98f'; g.fill(core); stipple(g, core, [cx - rx, cy - ry, 2 * rx, 2 * ry], 120, ['rgba(214,180,90,.6)', 'rgba(255,248,214,.7)'], 2, 6, 9);
    // lizereul hiperemic pe cele două laturi + banda subcapsulară păstrată
    g.save(); g.clip(core); g.lineCap = 'round'; g.strokeStyle = o.wedge.rim || '#a3122a'; g.lineWidth = 24; g.beginPath(); g.moveTo(...bp(a - sp)); g.lineTo(...ap); g.lineTo(...bp(a + sp)); g.stroke();
    g.strokeStyle = o.cortex || '#c8573f'; g.lineWidth = 24; g.stroke(outer); g.restore();
    g.globalAlpha = 1; o.wedge.ap = ap; o.wedge.base = bp(a);
  }
  g.restore();
  g.save(); g.lineWidth = 7; g.strokeStyle = OUT; g.stroke(outer); g.restore();
  return { S, outer };
}
// 9 · plămân pe secțiune, cu infarct roșu cuneiform (baza la pleură, jos-stânga)
const LUNG = [[170, 110], [420, 70], [700, 110], [860, 260], [900, 520], [850, 760], [640, 870], [330, 880], [140, 760], [90, 520], [110, 270]];
const WEDGE = [[95, 520], [120, 700], [190, 820], [300, 870], [560, 520]];
export function drawLung(g, t, o = {}) {
  const lung = P(LUNG);
  paint(g, lung, o.base || '#8a5658', '#6d4044', '#b48384', [90, 70, 810, 810], OUT, 7);
  stipple(g, lung, [90, 70, 810, 810], 520, ['#5d3638', '#a9787a', '#4a2a2d', '#c89a96'], 2, 6, 11);
  // bronhii și vase pe secțiune
  srand(4); for (let k = 0; k < 9; k++) { const x = rr(330, 820), y = rr(150, 640); g.save(); g.fillStyle = '#f4ece4'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.ellipse(x, y, rr(14, 26), rr(11, 20), rnd() * 3, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#2a1a1c'; g.beginPath(); g.ellipse(x, y, 7, 5, 0, 0, 7); g.fill(); g.restore(); }
  if (o.lobe) { // pneumonie lobară: lobul superior întreg consolidat (LP: Klebsiella → pneumonie lobară a lobului superior)
    const lobe = P([[100, 460], [110, 270], [170, 110], [420, 70], [700, 110], [860, 260], [895, 430], [620, 410], [330, 430]]);
    g.save(); g.clip(lung); paint(g, lobe, '#9c3b2e', '#7e2b22', '#c46a55', [90, 60, 820, 400], OUT, 5); stipple(g, lobe, [90, 60, 820, 400], 600, ['#c46a55', '#6e231b', '#e0957a'], 2, 4.5, 21); g.restore();
    g.save(); g.setLineDash([14, 10]); g.strokeStyle = '#fff3e0'; g.lineWidth = 4; g.beginPath(); g.moveTo(100, 460); g.bezierCurveTo(330, 425, 620, 405, 895, 430); g.stroke(); g.restore();
  }
  if (o.wedge !== false && !o.lobe) {
    const pr = o.wedgeP ?? 1; const wp = P(WEDGE);
    g.save(); g.clip(lung); g.globalAlpha = pr; paint(g, wp, '#5c0b16', '#3e0610', '#8c2030', [95, 520, 470, 350], OUT, 5); stipple(g, wp, [95, 520, 470, 350], 260, ['#3a050c', '#8a1f2c', '#2a0308'], 2, 6, 8); g.restore();
    // fibrina pe pleură, deasupra bazei
    if (o.fibrin !== false) { g.save(); g.globalAlpha = pr; g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 20; const f = smooth([[95, 525], [118, 700], [190, 820], [300, 872]], false); g.stroke(f); g.strokeStyle = '#e9d68a'; g.lineWidth = 12; g.setLineDash([9, 6]); g.stroke(f); g.restore(); }
  }
  g.save(); g.lineWidth = 9; g.strokeStyle = '#cfb8bd'; g.globalAlpha = 0.5; g.stroke(lung); g.restore();
}
// 10 · cord pe secțiune transversală prin ventriculi; infarct în peretele posterior al VS (jos)
export function drawHeart(g, t, o = {}) {
  const LV = [580, 470], R = o.thin ? 205 : 240, r = 105;
  // VD: perete subțire, cavitate în semilună care îmbracă septul
  const rv = blob(470, 470, 255, 240, 0, t, 0.04, 16, 2); paint(g, rv, '#9a3a33', '#7c2b26', '#c66a5c', [215, 230, 510, 480], OUT, 7);
  const rvl = blob(472, 470, 226, 210, 0, t, 0.05, 16, 6); paint(g, rvl, '#3a1418', null, null, bb(472, 470, 226, 210), OUT, 5);
  srand(3); for (let k = 0; k < 6; k++) { g.save(); g.strokeStyle = '#b8574c'; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); const y = 330 + k * 55; const x0 = 250 + Math.abs(y - 470) * 0.18; g.moveTo(x0, y); g.quadraticCurveTo(x0 + 25, y + rr(-12, 12), x0 + 48, y + rr(-6, 6)); g.stroke(); g.restore(); }
  const lv = blob(LV[0], LV[1], R, R * 0.96, 0, t, 0.03, 18, 4); paint(g, lv, '#a3443a', '#83322b', '#cf7466', bb(LV[0], LV[1], R, R), OUT, 7);
  const lum = blob(LV[0], LV[1], r, r * 1.08, 0, t, 0.14, 14, 9); paint(g, lum, '#3a1418', null, null, bb(LV[0], LV[1], r, r), OUT, 5);
  for (const [a, rad] of [[0.9, 30], [2.2, 34]]) { const x = LV[0] + Math.cos(a) * (r - 6), y = LV[1] + Math.sin(a) * (r - 6); paint(g, blob(x, y, rad, rad * 0.8, a, t, 0.05, 10, a), '#a3443a', '#83322b', null, bb(x, y, rad, rad), OUT, 4); }
  if (o.mi || o.scar) {
    const a0 = Math.PI * 0.2, a1 = Math.PI * 0.8; const sec = new Path2D(); sec.arc(LV[0], LV[1], R - 4, a0, a1); sec.arc(LV[0], LV[1], r + 2, a1, a0, true); sec.closePath();
    const p = o.mi ?? 1;
    if (o.scar) { paint(g, sec, '#efe8e2', '#d7ccc4', '#ffffff', bb(LV[0], LV[1] + 170, 180, 80), OUT, 4); g.save(); g.clip(sec); g.strokeStyle = 'rgba(200,190,185,.8)'; g.lineWidth = 3; for (let k = 0; k < 12; k++) { g.beginPath(); g.arc(LV[0], LV[1], r + 10 + k * 11, a0, a1); g.stroke(); } g.restore(); }
    else {
      const rim = new Path2D(); rim.arc(LV[0], LV[1], R - 1, a0 - 0.12, a1 + 0.12); rim.arc(LV[0], LV[1], r - 2, a1 + 0.12, a0 - 0.12, true); rim.closePath();
      g.save(); g.globalAlpha = p; g.fillStyle = o.rimCol || '#7d1f4a'; g.fill(rim); g.fillStyle = o.miCol || '#e7c066'; g.fill(sec); stipple(g, sec, [LV[0] - 240, LV[1], 480, 240], 90, ['rgba(255,240,180,.7)', 'rgba(190,140,60,.5)'], 2, 6, 3);
      if (o.focus !== false) { const fx = LV[0] - 20, fy = LV[1] + 170; paint(g, blob(fx, fy, 38, 24, 0.2, t, 0.2, 10, 5), '#5a0a16', null, null, bb(fx, fy, 38, 24), OUT, 3); }
      g.restore();
    }
  }
}
// 11 · creier pe secțiune coronală; o.hem = 0..1 (hematom profund drept), o.shift, o.subdural
export function drawBrain(g, t, o = {}) {
  const sh = o.shift ?? (o.hem ? 26 * o.hem : 0);
  // un singur contur (emisferele unite sub fisură, prin corpul calos)
  const B = P([[500, 142], [350, 118], [200, 215], [125, 420], [165, 650], [300, 785], [440, 805], [500, 772], [560, 805], [700, 785], [835, 650], [885, 420], [810, 215], [650, 118]]);
  paint(g, B, '#c9ab95', '#b49680', '#e6cdb8', [120, 115, 770, 690], OUT, 7);
  // substanța albă + girusuri sugerate
  const WL = blob(330, 470, 160, 255, 0.1, t, 0.08, 14, 3), WR = blob(670 - sh * 0.5, 470, 160, 255, -0.1, t, 0.08, 14, 8);
  for (const wp of [WL, WR]) { g.save(); g.fillStyle = '#f1e6d4'; g.fill(wp); g.restore(); }
  g.save(); g.strokeStyle = 'rgba(120,90,70,.45)'; g.lineWidth = 4; srand(2); for (let k = 0; k < 18; k++) { const a = rr(0, 6.28); const side = k % 2 ? 330 : 670; g.beginPath(); g.moveTo(side + Math.cos(a) * 200, 470 + Math.sin(a) * 300); g.lineTo(side + Math.cos(a) * 150, 470 + Math.sin(a) * 235); g.stroke(); } g.restore();
  // corpul calos: punte albă peste linia mediană
  g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 32; g.beginPath(); g.moveTo(400, 352); g.quadraticCurveTo(500 - sh, 316, 600 - sh, 352); g.stroke(); g.strokeStyle = '#fbf6ee'; g.lineWidth = 24; g.stroke(); g.restore();
  // nucleii bazali (cenușii)
  for (const [x, y] of [[400, 530], [610 - sh * 0.6, 530]]) paint(g, blob(x, y, 55, 75, 0, t, 0.08, 12, x), '#b79c8a', null, null, bb(x, y, 55, 75), 'rgba(42,21,52,.5)', 3);
  // ventriculii laterali, sub corpul calos, despărțiți de septul pellucid
  const VL = P([[490 - sh, 372], [446, 376], [424, 430], [452, 450], [490 - sh, 412]]), VR = P([[510 - sh, 372], [554 - sh, 376], [576 - sh, 430], [548 - sh, 450], [510 - sh, 412]]);
  const vh = o.hem ? clamp((o.hem - 0.55) / 0.45) : 0;
  paint(g, VL, '#f7f1ea', null, null, [420, 370, 80, 90], OUT, 4); paint(g, VR, vh > 0 ? `rgba(60,8,14,${0.2 + 0.8 * vh})` : '#f7f1ea', null, null, [510, 370, 80, 90], OUT, 4);
  if (o.hem) { const h = o.hem; const hx = 650 - sh * 0.6, hy = 540;
    g.save(); g.globalAlpha = 0.5 * h; g.fillStyle = '#f3e7b0'; g.beginPath(); g.ellipse(hx, hy, 150 * h + 20, 140 * h + 20, 0.2, 0, 7); g.fill(); g.restore();
    if (vh > 0) { g.save(); g.lineCap = 'round'; g.strokeStyle = `rgba(74,9,16,${vh})`; g.lineWidth = 34; g.beginPath(); g.moveTo(hx - 50, hy - 50); g.lineTo(555 - sh, 425); g.stroke(); g.restore(); }
    const hp = blob(hx, hy, 125 * h + 5, 115 * h + 5, 0.3, t, 0.22, 16, 7); paint(g, hp, '#4a0910', '#2c0408', '#8a2030', bb(hx, hy, 125, 115), OUT, 5); stipple(g, hp, [hx - 130, hy - 120, 260, 240], 70 * h, ['#1e0206', '#7a1a26'], 3, 8, 5);
  }
  if (o.subdural) { const p = o.subdural; const cres = P([[560, 128], [700, 118], [850, 225], [915, 430], [860, 660], [880, 640], [870, 430], [815, 240], [690, 150]]); g.save(); g.globalAlpha = p; paint(g, cres, '#5a0a14', '#3a0610', '#8c2030', [560, 118, 360, 540], OUT, 4); g.restore(); }
  // fisura interemisferică: doar până la corpul calos; septul pellucid între ventriculi
  g.save(); g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(500, 125); g.quadraticCurveTo(500 - sh * 0.4, 240, 500 - sh, 330); g.stroke(); g.lineWidth = 4; g.beginPath(); g.moveTo(500 - sh, 372); g.lineTo(500 - sh, 412); g.stroke(); g.restore();
}
// 12 · rinichi de șoc: corticală palidă, lată; medulară roșu-violacee
export const drawShockKidney = (g, t, o = {}) => drawKidney(g, t, { cortex: o.cortex || '#efd6b8', cortexS: '#e3c6a4', cortexL: '#fff4e6', med: o.med || '#7e1838', medS: '#5c0f2a', medR: 0.7, ...o });

// cheagul postmortem: mulaj neted, lucios — „jeleu de coacăze” + „grăsime de pui”
export function drawClot(g, t, o = {}) {
  const pts = o.pts || [[180, 470], [330, 440], [500, 470], [670, 500], [820, 470]];
  const p = smooth(pts, false);
  g.save(); const w = o.w || 120; g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = w + 12; g.stroke(p); g.strokeStyle = '#a0122c'; g.lineWidth = w; g.stroke(p);
  g.strokeStyle = '#f0c75a'; g.lineWidth = w * 0.38; g.translate(0, -w * 0.28); g.stroke(p); g.restore();
  g.save(); g.lineCap = 'round'; g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = w * 0.08; g.translate(0, -w * 0.43); g.setLineDash([60, 40]); g.lineDashOffset = REDUCED ? 0 : -t * 20; g.stroke(p); g.restore();
  g.save(); g.lineCap = 'round'; g.strokeStyle = 'rgba(255,190,200,.45)'; g.lineWidth = w * 0.07; g.translate(0, w * 0.25); g.setLineDash([40, 50]); g.stroke(p); g.restore();
}

/* =================================================== COPERTA */
const DDF = {
  aorta: (g, t) => drawAorta(g, t), clotAo: (g, t) => { drawAorta(g, t, { noThr: true }); drawClot(g, t, { pts: [[500, 90], [490, 300], [500, 520], [480, 640], [370, 760], [290, 860]] }); },
  embol: (g, t) => drawEmbolus(g, t), clotPA: (g, t) => { drawEmbolus(g, t, { noEmb: true }); drawClot(g, t, { w: 66, pts: [[130, 402], [250, 382], [380, 410], [500, 470], [620, 410], [750, 382], [870, 402]] }); drawClot(g, t, { w: 80, pts: [[500, 480], [500, 640], [500, 780]] }); },
  ren: (g, t) => drawKidney(g, t, { wedge: { a: -2.05 } }), pyelo: (g, t) => drawKidney(g, t, { abscess: true }),
  pulm: (g, t) => drawLung(g, t), lobar: (g, t) => drawLung(g, t, { lobe: true }),
  ima: (g, t) => drawHeart(g, t, { mi: 1 }), scar: (g, t) => drawHeart(g, t, { scar: true, thin: true }),
  hem: (g, t) => drawBrain(g, t, { hem: 1 }), subdural: (g, t) => drawBrain(g, t, { subdural: 1 }),
  soc: (g, t) => drawShockKidney(g, t), renInf: (g, t) => drawKidney(g, t, { wedge: { a: -2.05 } }),
};
/* poza reală a partenerului de DD, decupată în cerc (când nu există desen în deck) */
export { DDF, W as W2, H as H2 };
