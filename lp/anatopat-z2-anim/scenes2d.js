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
  if (o.lobe) { // pneumonie lobară: lobul inferior întreg consolidat
    const lobe = P([[95, 470], [300, 430], [520, 470], [760, 560], [880, 600], [850, 760], [640, 870], [330, 880], [140, 760]]);
    g.save(); g.clip(lung); paint(g, lobe, '#9c3b2e', '#7e2b22', '#c46a55', [90, 430, 810, 450], OUT, 5); stipple(g, lobe, [90, 430, 810, 450], 600, ['#c46a55', '#6e231b', '#e0957a'], 2, 4.5, 21); g.restore();
    g.save(); g.setLineDash([14, 10]); g.strokeStyle = '#fff3e0'; g.lineWidth = 4; g.beginPath(); g.moveTo(95, 470); g.bezierCurveTo(300, 420, 560, 470, 880, 600); g.stroke(); g.restore();
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
const ICONS = [
  ['aortă cu tromb', (g, t) => { g.translate(500, 467); g.scale(0.95, 0.95); g.translate(-500, -467); drawAorta(g, t); }],
  ['tromb călăreț', (g, t) => drawEmbolus(g, t)],
  ['infarct renal', (g, t) => drawKidney(g, t, { wedge: { a: -2.0 } })],
  ['infarct pulmonar', (g, t) => drawLung(g, t)],
  ['infarct miocardic', (g, t) => drawHeart(g, t, { mi: 1 })],
  ['hemoragie intracerebrală', (g, t) => drawBrain(g, t, { hem: 1 })],
  ['rinichi de șoc', (g, t) => drawShockKidney(g, t)],
];
const POS7 = [[140, 230], [380, 230], [620, 230], [860, 230], [260, 650], [500, 650], [740, 650]];
function iconGrid(names, R = 110) {
  const k = names.map(() => 0);
  return (g, t, b) => {
    POS7.forEach(([x, y], i) => { k[i] = lerp(k[i], b.i === i ? 1 : 0, 0.08); field(g, x, y, R + k[i] * 8, () => { g.save(); g.fillStyle = '#21122a'; g.fillRect(x - R, y - R, 2 * R, 2 * R); g.translate(x - R, y - R); g.scale(2 * R / 1000, 2 * R / 934); ICONS[i][1](g, t); g.restore(); }); if (k[i] > 0.05) glowRing(g, x, y, R + 14, R + 14, 0, k[i]); });
  };
}
function cover() {
  const draw = iconGrid(ICONS.map((x) => x[0]));
  return {
    home: HOME, cams: POS7.map(([x, y]) => cam(x, y, 2.1)), anchors: POS7.map(([x, y]) => [x - 80, y - 85]),
    labels: POS7.map(([x, y], i) => lbl([x, y + 150], ICONS[i][0])),
    draw(g, t, b) { bgFill(g, '#3a1d47', '#160b1d'); draw(g, t, b); },
  };
}

/* =================================================== FIȘA OSPE PENTRU PIESE */
function fisaPiesa() {
  const B = [['organ', 1, '#e07bb0'], ['leziune', 1, '#e07bb0'], ['definiție', 1, '#e07bb0'], ['descriere', 6, '#c2558c'], ['cauze', 4, '#9a2f66'], ['complicații', 4, '#7b2152'], ['DD', 1, '#ff9fd0']];
  const RUB = ['dimensiune', 'formă', 'culoare', 'consistență', 'suprafață', 'pe secțiune'];
  // beat → câte blocuri apar
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
      // acolada „obligatoriu”
      g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 5; g.beginPath(); g.moveTo(40, 845); g.lineTo(40, 860); g.lineTo(322, 860); g.lineTo(322, 845); g.stroke(); g.restore(); txt(g, 'OBLIGATORIU · 3 p', 181, 900, 24, '#ffe36e');
      // cronometrul stației
      const C0 = [870, 210], R = 80; const f = b.i === 4 ? clamp(b.bt / b.bd) : (t * 0.05) % 1;
      g.save(); g.lineWidth = 28; g.strokeStyle = OUT; g.beginPath(); g.arc(C0[0], C0[1], R, 0, 7); g.stroke(); g.lineWidth = 18; g.strokeStyle = '#4a3d58'; g.stroke();
      g.strokeStyle = '#ff9fd0'; g.beginPath(); g.arc(C0[0], C0[1], R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 / 7); g.stroke(); g.strokeStyle = '#c2558c'; g.beginPath(); g.arc(C0[0], C0[1], R, -Math.PI / 2 + Math.PI * 2 / 7, -Math.PI / 2 + Math.PI * 2 * f); g.stroke(); g.restore();
      txt(g, '7 min', C0[0], C0[1] + 12, 34); txt(g, '1 citești · 6 vorbești', C0[0], C0[1] + 130, 22, '#e6dcec', 'center', 700);
      txt(g, 'minim 5 puncte', 500, 90, 40, '#fff');
    },
  };
}

/* =================================================== PIESELE: scenele „Rec” (rubricile descrierii) */
function recScene(drawFn, o) {
  return () => ({
    home: o.home || HOME, cams: o.cams, anchors: o.anchors, labels: o.labels || [],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914'); drawFn(g, t, b);
      const r = o.rings && b.i >= 0 && o.rings[b.i]; if (r) glowRing(g, r[0], r[1], r[2], r[3] ?? r[2], r[4] || 0, ease(b.bt * 1.4));
    },
  });
}
const aortaRec = recScene((g, t, b) => drawAorta(g, t), {
  cams: [cam(380, 560, 1.15), cam(400, 520, 1.55), cam(380, 500, 1.9), cam(380, 520, 2.1), cam(400, 420, 2.2), cam(440, 360, 2.0)],
  anchors: [[300, 200], [520, 330], [360, 420], [330, 560], [445, 300], [400, 250]],
  labels: [lbl([620, 120], 'intimă cu plăci de aterom', { beats: [-1, 5] }), lbl([270, 560], 'tromb parietal', { beats: [-1, 0, 1, 2, 3] }), lbl([560, 440], 'lumen liber', { beats: [1] }), lbl([235, 800], 'extensia în a. iliacă', { beats: [-1, 0] })],
  rings: [[360, 560, 150, 350, 0.25], [530, 420, 60, 140], [440, 420, 60, 80], [430, 520, 55, 70], [470, 350, 40, 90], [400, 240, 30, 40]],
});
const embolRec = recScene((g, t, b) => drawEmbolus(g, t), {
  cams: [cam(500, 450, 1.0), cam(500, 430, 1.4), cam(420, 420, 2.0), cam(600, 450, 2.0), cam(330, 400, 2.0), cam(780, 640, 1.4)],
  anchors: [[160, 330], [500, 330], [420, 360], [620, 380], [300, 470], [800, 560]],
  labels: [lbl([500, 260], 'embolul „în șa”, pe bifurcație', { beats: [-1, 0, 1] }), lbl([500, 850], 'trunchiul a. pulmonare', { beats: [-1] }), lbl([230, 330], 'capăt rupt', { beats: [1] }), lbl([840, 760], 'plămân congestionat', { beats: [5] })],
  rings: [[500, 450, 360, 130], [500, 450, 340, 110], [420, 420, 70, 50], [620, 440, 60, 50], [330, 410, 70, 50], [780, 640, 170, 190]],
});
const renRec = recScene((g, t, b) => drawKidney(g, t, { wedge: { a: -2.05 } }), {
  cams: [cam(380, 330, 1.7), cam(380, 330, 1.8), cam(380, 320, 2.0), cam(380, 330, 2.0), cam(330, 220, 2.2), cam(470, 470, 1.0)],
  anchors: [[250, 210], [470, 300], [310, 300], [380, 360], [300, 150], [700, 250]],
  labels: [lbl([330, 150], 'baza la capsulă', { beats: [-1, 1, 4] }), lbl([520, 420], 'vârful spre hil', { beats: [-1, 1] }), lbl([200, 380], 'lizereu roșu', { beats: [2] }), lbl([780, 470], 'hil', { beats: [-1, 5] })],
  rings: [[350, 290, 120, 100, 0.4], [370, 310, 140, 110, 0.4], [360, 300, 120, 100, 0.4], [360, 300, 100, 80, 0.4], [300, 190, 100, 40, -0.6], [430, 400, 160, 110, 0.4]],
});
const pulmRec = recScene((g, t, b) => drawLung(g, t), {
  cams: [cam(330, 700, 1.4), cam(300, 700, 1.6), cam(300, 720, 1.9), cam(280, 720, 2.0), cam(170, 720, 2.3), cam(400, 660, 1.4)],
  anchors: [[400, 600], [520, 560], [300, 690], [240, 760], [120, 620], [600, 620]],
  labels: [lbl([170, 900], 'pleură cu fibrină', { beats: [-1, 4] }), lbl([600, 480], 'vârful spre hil', { beats: [1] }), lbl([700, 300], 'parenchim congestionat, aerat', { beats: [-1, 5] })],
  rings: [[300, 690, 230, 170], [330, 690, 250, 190], [280, 720, 150, 120], [280, 720, 130, 110], [160, 730, 90, 150, -0.4], [330, 690, 260, 200]],
});
const imaRec = recScene((g, t, b) => drawHeart(g, t, { mi: 1 }), {
  cams: [cam(560, 600, 1.4), cam(560, 610, 1.5), cam(560, 620, 1.8), cam(560, 620, 1.9), cam(560, 600, 1.4), cam(560, 650, 2.2)],
  anchors: [[470, 680], [700, 640], [600, 690], [450, 610], [580, 400], [560, 600]],
  labels: [lbl([580, 760], 'peretele posterior VS', { beats: [-1, 4] }), lbl([270, 470], 'VD', { beats: [-1] }), lbl([580, 470], 'lumen VS', { beats: [-1] }), lbl([390, 700], 'margine roșie-violacee', { beats: [2] })],
  rings: [[580, 640, 200, 90], [580, 640, 200, 90], [580, 640, 160, 70], [580, 640, 160, 70], [580, 640, 220, 110], [560, 640, 50, 40]],
});
const hemRec = recScene((g, t, b) => drawBrain(g, t, { hem: 1 }), {
  cams: [cam(620, 520, 1.6), cam(620, 520, 1.8), cam(620, 520, 2.0), cam(620, 520, 2.0), cam(580, 470, 1.5), cam(500, 470, 1.0)],
  anchors: [[700, 380], [780, 520], [620, 540], [770, 640], [560, 330], [500, 160]],
  labels: [lbl([620, 700], 'hematom profund', { beats: [-1, 0, 1, 2] }), lbl([560, 300], 'sânge în ventricul', { beats: [4] }), lbl([400, 110], 'linia mediană împinsă', { beats: [5] }), lbl([820, 300], 'țesut edemațiat', { beats: [3] })],
  rings: [[625, 530, 150, 140], [625, 530, 150, 140], [625, 530, 125, 115], [625, 530, 170, 165], [545, 410, 50, 60], [480, 430, 50, 300]],
});
const socRec = recScene((g, t, b) => drawShockKidney(g, t), {
  cams: [cam(470, 470, 1.0), cam(470, 470, 1.1), cam(330, 380, 1.8), cam(400, 470, 1.5), cam(200, 420, 2.0), cam(480, 470, 1.4)],
  anchors: [[170, 220], [800, 240], [250, 300], [330, 600], [110, 500], [560, 400]],
  labels: [lbl([200, 160], 'corticala palidă, lată', { beats: [-1, 2] }), lbl([420, 470], 'medulara roșie', { beats: [-1, 2, 5] }), lbl([720, 470], 'sinus + bazinet', { beats: [-1] })],
  rings: [[470, 470, 370, 310], [470, 470, 370, 310], [330, 380, 170, 130], [470, 470, 350, 290], [130, 470, 50, 230], [470, 470, 300, 240]],
});

/* =================================================== „DE CE ARATĂ AȘA” (patogenia, animată) */
function aortaWhy() {
  return {
    home: HOME, cams: [cam(330, 470, 1.6), cam(500, 470, 1.4), cam(500, 470, 1.2), cam(650, 470, 1.2), cam(500, 470, 1)],
    anchors: [[320, 250], [520, 250], [500, 700], [840, 250], null],
    labels: [lbl([320, 820], 'placă ulcerată', { beats: [-1, 0] }), lbl([550, 160], 'turbulență', { beats: [1] }), lbl([500, 840], 'tromb parietal; lumenul rămâne liber', { beats: [2] }), lbl([800, 820], 'embol → membrele inferioare, intestin', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914');
      // peretele aortic longitudinal (jos) + lumen cu flux
      const wall = new Path2D(); wall.roundRect(40, 640, 920, 120, 20); paint(g, wall, '#e8cfa0', '#d2b07a', null, [40, 640, 920, 120], OUT, 7);
      const top = new Path2D(); top.roundRect(40, 160, 920, 70, 20); paint(g, top, '#e8cfa0', '#d2b07a', null, [40, 160, 920, 70], OUT, 7);
      // placa
      const pl = blob(320, 640, 120, 50, 0, t, 0.05, 12, 2); paint(g, pl, '#f3d66b', '#d9b444', '#fff6c4', bb(320, 640, 120, 50), OUT, 5);
      g.save(); g.fillStyle = '#9b1d2a'; g.beginPath(); g.ellipse(320, 600, 40, 12, 0, 0, 7); g.fill(); g.restore(); txt(g, '← colagen expus', 455, 612, 22, '#ffe36e', 'left', 700);
      // fluxul: particule (hematii + trombocite)
      srand(9); const tt = REDUCED ? 0 : t;
      for (let k = 0; k < 46; k++) { const sp = rr(120, 220); let x = (rr(0, 1000) + tt * sp) % 1000; let y = rr(260, 600); if (b.i >= 1 && x > 380 && x < 700) y += Math.sin((x - 380) / 40 + tt * 3 + k) * 40; g.save(); g.fillStyle = k % 3 ? '#e23a4f' : '#c9b3ff'; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.ellipse(x, y, k % 3 ? 13 : 7, k % 3 ? 8 : 7, 0, 0, 7); g.fill(); g.stroke(); g.restore(); }
      if (b.i >= 1) { g.save(); g.strokeStyle = 'rgba(255,255,255,.6)'; g.lineWidth = 5; for (let k = 0; k < 3; k++) { const cx = 470 + k * 90; g.beginPath(); g.arc(cx, 420, 40 + 6 * Math.sin(tt * 3 + k), tt * 2 + k, tt * 2 + k + 4.4); g.stroke(); } g.restore(); }
      // trombul crește în straturi
      const grow = b.i < 2 ? (b.i < 0 ? 1 : 0.15) : b.i === 2 ? 0.2 + 0.8 * u01(b) : 1;
      const n = Math.round(10 * grow);
      for (let k = 0; k < n; k++) { const hgt = 22; const y = 640 - (k + 1) * hgt * 0.95; const wv = 260 - k * 8; const p = new Path2D(); p.roundRect(320 - wv / 2 + k * 6, y, wv, hgt, 10); paint(g, p, k % 2 ? '#a3222f' : '#dcc4bc', null, null, [0, y, 1, hgt], OUT, 3); }
      if (b.i === 3) { const u = u01(b); const x = lerp(380, 900, u), y = 640 - n * 21 - 10 - Math.sin(u * 3) * 30; paint(g, blob(x, y, 34, 22, 0, t, 0.2, 10, 3), '#a3222f', null, null, bb(x, y, 34, 22), OUT, 4); arrow(g, 620, 300, 900, 300, '#ffe36e'); }
      txt(g, b.i >= 2 || b.i < 0 ? 'trombocite + fibrină în straturi (Zahn)' : '', 560, 120, 26, '#ffe36e');
    },
  };
}
// TVP → VCI → AD → VD → a. pulmonară
const ROUTE = [[620, 900], [600, 780], [560, 640], [520, 520], [500, 420], [470, 360], [420, 330], [400, 290], [470, 250], [520, 210], [520, 150]];
function embolWhy() {
  return {
    home: HOME, cams: [cam(600, 780, 1.6), cam(560, 640, 1.5), cam(480, 380, 1.5), cam(500, 220, 1.7)],
    anchors: [[700, 830], [640, 600], [360, 380], [600, 150]],
    labels: [lbl([760, 900], 'TVP: mulajul venei', { beats: [-1, 0] }), lbl([660, 520], 'VCI', { beats: [-1, 1] }), lbl([330, 300], 'AD → VD', { beats: [-1, 2] }), lbl([500, 70], 'a. pulmonară: se pliază „în șa”', { beats: [-1, 3] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914');
      // siluetă: cord + VCI + vena membrului inferior
      const heart = blob(450, 320, 150, 130, 0.3, t, 0.06, 14, 3); paint(g, heart, '#b8433f', '#933230', '#e07a70', [300, 190, 300, 260], OUT, 7);
      txt(g, 'AD', 400, 360, 26); txt(g, 'VD', 500, 300, 26);
      const v = smooth(ROUTE.slice(0, 5), false); g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 58; g.stroke(v); g.strokeStyle = '#5d6fb8'; g.lineWidth = 46; g.stroke(v); g.restore();
      const pa = smooth([[520, 220], [520, 130], [380, 80], [660, 80]], false); g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 54; g.beginPath(); g.moveTo(520, 220); g.lineTo(520, 120); g.moveTo(380, 70); g.quadraticCurveTo(520, 120, 660, 70); g.stroke(); g.strokeStyle = '#ead9b8'; g.lineWidth = 42; g.stroke(); g.restore();
      // trombul în vena gambei
      const prog = b.i < 0 ? 0 : [0, 0.33, 0.7, 1][b.i] + (b.i < 3 ? u01(b) * ([0.33, 0.7, 1, 1][b.i] - [0, 0.33, 0.7, 1][b.i]) : 0);
      const seg = (u) => { const f = u * (ROUTE.length - 1); const i = Math.min(ROUTE.length - 2, Math.floor(f)); const k = f - i; return [lerp(ROUTE[i][0], ROUTE[i + 1][0], k), lerp(ROUTE[i][1], ROUTE[i + 1][1], k)]; };
      if (b.i === 0 || b.i < 0) { g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 36; g.beginPath(); g.moveTo(620, 920); g.lineTo(605, 800); g.stroke(); g.strokeStyle = '#6a1c22'; g.lineWidth = 26; g.stroke(); g.restore(); if (b.i === 0) { const k = ease(b.bt * 0.8 - 0.4); g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 5; g.setLineDash([8, 8]); g.beginPath(); g.moveTo(580, 820 - k * 6); g.lineTo(640, 812 + k * 6); g.stroke(); g.restore(); txt(g, 'se rupe', 700, 790, 24, '#ffe36e'); } }
      if (b.i >= 1) { const [x, y] = b.i === 3 ? [520, 120] : seg(prog); const rot = b.i === 3 ? 0 : -1.2; g.save(); g.translate(x, y); g.rotate(rot); const k = b.i === 3 ? ease(b.bt) : 0; const pts = []; for (let i = 0; i <= 12; i++) { const u = i / 12; pts.push([lerp(-60, -140 * k - 20, 0) + u * lerp(120, 260, k) - lerp(60, 130, k), Math.sin(u * 9 + t) * lerp(6, 14, k) + (k > 0 ? -Math.sin(u * Math.PI) * 30 * k : 0)]); } const p = smooth(pts, false); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 32; g.stroke(p); g.strokeStyle = '#6a1c22'; g.lineWidth = 22; g.stroke(p); g.restore(); }
      if (b.i < 0) txt(g, 'imobilizare · postoperator · sarcină · cancer', 330, 900, 22, '#e6dcec', 'center', 700);
    },
  };
}
function renWhy() {
  const tree = [[[140, 470], [330, 470]], [[330, 470], [470, 330]], [[330, 470], [470, 610]], [[470, 330], [600, 250]], [[470, 330], [610, 380]], [[470, 610], [600, 560]], [[470, 610], [610, 690]]];
  return {
    home: HOME, cams: [cam(260, 330, 1.6), cam(560, 470, 1.2), cam(640, 300, 1.7), cam(640, 300, 1.7)],
    anchors: [[150, 220], [500, 160], [800, 160], [860, 360]],
    labels: [lbl([330, 520], 'cord stâng: AS (fibrilație) · valve (endocardită) · VS (tromb mural post-IMA)', { beats: [-1, 0] }), lbl([470, 790], 'ramuri terminale, fără colaterale', { beats: [1] }), lbl([760, 470], 'țesut palid, ferm', { beats: [2] }), lbl([760, 470], 'cicatrice în „V”', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914');
      // atriul stâng cu tromb + embolul care pleacă
      const as = blob(170, 300, 110, 90, 0, t, 0.08, 12, 2); paint(g, as, '#b8433f', '#933230', '#e07a70', bb(170, 300, 110, 90), OUT, 6); txt(g, 'AS', 170, 280, 28);
      paint(g, blob(200, 335, 34, 24, 0, t, 0.2, 10, 4), '#6a1c22', null, null, bb(200, 335, 34, 24), OUT, 4);
      // teritoriile (conuri) cu baza la capsulă
      const cone = (a, k) => { const ap = [470, 470 + (k - 1.5) * 1]; return null; };
      const caps = new Path2D(); caps.arc(470, 470, 330, -0.95, 0.95); g.save(); g.lineWidth = 46; g.strokeStyle = OUT; g.stroke(caps); g.lineWidth = 34; g.strokeStyle = '#c8573f'; g.stroke(caps); g.restore();
      const wedge = (a0, a1, col) => { const p = new Path2D(); p.moveTo(470 + Math.cos((a0 + a1) / 2) * 140, 470 + Math.sin((a0 + a1) / 2) * 140); p.arc(470, 470, 316, a0, a1); p.closePath(); return p; };
      const bl = b.i >= 2 || b.i < 0; const sc = b.i === 3;
      const w0 = wedge(-0.9, -0.3), w1 = wedge(-0.3, 0.3), w2 = wedge(0.3, 0.9);
      paint(g, w1, '#c8573f', '#a8432f', null, [470, 300, 330, 330], OUT, 4); paint(g, w2, '#c8573f', '#a8432f', null, [470, 300, 330, 330], OUT, 4);
      if (bl) { const k = b.i === 2 ? ease(b.bt) : 1; g.save(); g.fillStyle = '#a3122a'; g.fill(w0); g.restore(); const inner = wedge(-0.86, -0.34); paint(g, w0, '#c8573f', null, null, [470, 140, 330, 330], OUT, 4); g.save(); g.globalAlpha = k; g.fillStyle = '#a3122a'; g.fill(w0); g.fillStyle = sc ? '#f4f0ea' : '#f0d98f'; g.save(); g.translate(470, 470); g.scale(0.94, 0.94); g.translate(-470, -470); g.fill(inner); g.restore(); g.restore(); }
      else paint(g, w0, '#c8573f', '#a8432f', null, [470, 140, 330, 330], OUT, 4);
      if (sc) { g.save(); g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(680, 140); g.lineTo(700, 210); g.lineTo(745, 155); g.stroke(); g.restore(); }
      // arborele arterial (terminal)
      g.save(); g.lineCap = 'round'; for (const [a, c] of tree) { g.strokeStyle = OUT; g.lineWidth = 22; g.beginPath(); g.moveTo(...a); g.lineTo(...c); g.stroke(); g.strokeStyle = '#e8424f'; g.lineWidth = 13; g.stroke(); } g.restore();
      // embolul care circulă și se oprește în ramura superioară
      const path = [[200, 335], [200, 470], [330, 470], [470, 330], [600, 250]]; const u = b.i < 0 ? 1 : b.i === 0 ? 0.25 * u01(b) : b.i === 1 ? 0.25 + 0.75 * u01(b) : 1;
      const f = u * (path.length - 1); const i = Math.min(path.length - 2, Math.floor(f)); const kk = f - i; const ex = lerp(path[i][0], path[i + 1][0], kk), ey = lerp(path[i][1], path[i + 1][1], kk);
      if (b.i >= 0 || true) paint(g, blob(ex, ey, 20, 14, 0, t, 0.2, 10, 3), '#3b0a10', null, null, bb(ex, ey, 20, 14), OUT, 4);
      if (b.i === 1) txt(g, 'ocluzie', 640, 220, 26, '#ffe36e');
    },
  };
}
function pulmWhy() {
  return {
    home: HOME, cams: [cam(700, 300, 1.5), cam(420, 470, 1.25), cam(300, 650, 1.5), cam(500, 470, 1)],
    anchors: [[800, 200], [620, 380], [170, 640], [840, 700]],
    labels: [lbl([780, 120], 'embol din TVP → ramură a a. pulmonare', { beats: [-1, 0] }), lbl([660, 560], 'a. bronșică: sânge în zona moartă', { beats: [1] }), lbl([260, 900], 'con roșu, baza la pleură + fibrină', { beats: [2] }), lbl([780, 860], 'resorbție → cicatrice · embol infectat → abces', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914');
      const p = b.i < 2 ? (b.i < 0 ? 1 : 0) : b.i === 2 ? ease(b.bt * 0.6) : 1;
      g.save(); if (b.i === 3) { g.globalAlpha = 1; } drawLung(g, t, { wedgeP: p, fibrin: b.i >= 2 || b.i < 0 }); g.restore();
      // artera pulmonară cu embolul
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 34; g.beginPath(); g.moveTo(860, 150); g.quadraticCurveTo(700, 330, 570, 515); g.stroke(); g.strokeStyle = '#5d6fb8'; g.lineWidth = 22; g.stroke(); g.restore();
      const u = b.i === 0 ? u01(b) : 1; const ex = lerp(860, 570, u), ey = lerp(150, 515, u) - Math.sin(u * Math.PI) * 30;
      paint(g, blob(ex, ey, 22, 15, 0.7, t, 0.2, 10, 3), '#3b0a10', null, null, bb(ex, ey, 22, 15), OUT, 4);
      if (b.i >= 1 || b.i < 0) { g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 20; const ba = smooth([[760, 470], [600, 520], [430, 600], [300, 700]], false); g.stroke(ba); g.strokeStyle = '#e8424f'; g.lineWidth = 11; g.stroke(ba); g.setLineDash([10, 18]); g.lineDashOffset = REDUCED ? 0 : -t * 60; g.strokeStyle = '#ffd0d6'; g.lineWidth = 5; g.stroke(ba); g.restore(); }
      if (b.i < 0) txt(g, 'plămân deja congestionat (IC stângă)', 500, 60, 26, '#ffe36e');
      if (b.i === 3) { const k = ease(b.bt * 0.5); g.save(); g.globalAlpha = k; const wp = P(WEDGE); g.clip(wp); g.fillStyle = 'rgba(235,228,220,.85)'; g.fillRect(0, 0, 1000, 934); g.restore(); }
    },
  };
}
// IMA: culoarea peretelui în timp
function imaWhy() {
  const ST = [['12–24 ore', '#9c4a40', '#7d1f4a', 'palid, halou hiperemic'], ['2–3 zile', '#e7c066', '#7d1f4a', 'galben, moale'], ['5–10 zile', '#e8cf7c', '#7d1f4a', 'miomalacie → ruptură'], ['săptămâni', '#efe8e2', null, 'cicatrice alb-sidefie']];
  return {
    home: HOME, cams: ST.map((_, i) => cam(500, 520, 1.05)), anchors: ST.map((_, i) => [130 + i * 245, 200]),
    labels: ST.map(([a, , , d], i) => lbl([130 + i * 245, 760], d)),
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914');
      // linia timpului
      g.save(); g.strokeStyle = OUT; g.lineWidth = 18; g.lineCap = 'round'; g.beginPath(); g.moveTo(80, 850); g.lineTo(920, 850); g.stroke(); g.strokeStyle = '#c2558c'; g.lineWidth = 10; g.stroke(); g.restore();
      const cur = b.i < 0 ? ((t * 0.25) % 4) : b.i + clamp(b.bt / b.bd);
      g.save(); g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(130 + Math.min(3, cur) * 245, 850, 18, 0, 7); g.fill(); g.stroke(); g.restore();
      ST.forEach(([nm, c, rim, d], i) => {
        const x = 130 + i * 245, y = 470; const on = b.i === i;
        g.save(); g.translate(x, y); g.scale(on ? 0.33 : 0.29, on ? 0.33 : 0.29); g.translate(-520, -470);
        if (i === 3) drawHeart(g, t, { scar: true, thin: true }); else drawHeart(g, t, { mi: 1, miCol: c, rimCol: rim, focus: i === 2 });
        g.restore();
        txt(g, nm, x, 260, on ? 32 : 26, on ? '#ffe36e' : '#fff');
        if (i === 2 && on) { const k = pulse(t, 6); g.save(); g.strokeStyle = `rgba(255,80,90,${0.5 + 0.5 * k})`; g.lineWidth = 6; g.beginPath(); g.moveTo(x + 30, y + 60); g.lineTo(x + 50, y + 90); g.lineTo(x + 35, y + 110); g.stroke(); g.restore(); txt(g, 'ruptură → hemopericard', x, y + 170, 22, '#ff8a8a'); }
      });
      txt(g, 'peretele posterior al VS, secționat transversal', 500, 110, 28, '#e6dcec', 'center', 700);
    },
  };
}
// cele 4 hemoragii intracraniene, pe straturi
function hem4() {
  const bump = (x, c, w) => { const d = (x - c) / w; return Math.abs(d) < 1 ? Math.cos(d * Math.PI / 2) ** 2 : 0; };
  const XS = []; for (let x = -400; x <= 1400; x += 8) XS.push(x);
  const band = (g, f0, f1, col) => { const p = new Path2D(); XS.forEach((x, k) => (k ? p.lineTo(x, f0(x)) : p.moveTo(x, f0(x)))); for (let k = XS.length - 1; k >= 0; k--) p.lineTo(XS[k], f1(XS[k])); p.closePath(); g.fillStyle = col; g.fill(p); };
  const line = (g, f, w = 4) => { g.beginPath(); XS.forEach((x, k) => (k ? g.lineTo(x, f(x)) : g.moveTo(x, f(x)))); g.strokeStyle = OUT; g.lineWidth = w; g.stroke(); };
  const SUL = [150, 340, 560, 720, 900];
  return {
    home: HOME, cams: [cam(220, 300, 1.8), cam(450, 330, 1.8), cam(720, 360, 1.7), cam(780, 620, 1.4)],
    anchors: [[190, 120], [450, 300], [720, 290], [780, 560]],
    labels: [lbl([190, 600], 'biconvex · a. meningee medie', { beats: [-1, 0] }), lbl([450, 650], 'semilună · venele-punte', { beats: [-1, 1] }), lbl([720, 700], 'în șanțuri, la bază', { beats: [-1, 2] }), lbl([780, 880], 'în parenchim · HTA', { beats: [-1, 3] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914');
      const pr = (i) => (b.i < 0 ? 1 : b.i === i ? ease(b.bt) : b.i > i ? 1 : 0.15);
      const e1 = pr(0), e2 = pr(1), e3 = pr(2);
      const yB = (x) => 190 - 16 * bump(x, 190, 115) * e1;          // tăblia internă a osului
      const yD0 = (x) => 190 + 58 * bump(x, 190, 115) * e1;         // dura, dezlipită de os
      const yD1 = (x) => yD0(x) + 42;
      const yA0 = (x) => yD1(x) + 34 * bump(x, 450, 150) * e2;      // arahnoida, despărțită de dură
      const yA1 = (x) => yA0(x) + 24;
      const yP = (x) => yA1(x) + 54;                                 // pia + suprafața creierului
      band(g, () => 30, yB, '#efe6d6');
      band(g, yB, yD0, '#6a0a14');
      band(g, yD0, yD1, '#8fa9cf');
      band(g, yD1, yA0, '#6a0a14');
      band(g, yA0, yA1, '#d6c8ef');
      band(g, yA1, yP, '#bfe0ef');
      band(g, yP, () => 934, '#d9b8a3');
      // sânge subarahnoidian în spațiu, între 620 și 820
      g.save(); g.globalAlpha = e3; band(g, (x) => (x > 600 && x < 790 ? yA1(x) : yP(x)), yP, '#8a1424'); g.restore();
      // șanțurile (sulci): LCR, iar cel de la 720 se umple cu sânge
      SUL.forEach((x) => { const top = yP(x); const p = new Path2D(); p.moveTo(x - 16, top); p.quadraticCurveTo(x - 6, top + 70, x, top + 130); p.quadraticCurveTo(x + 6, top + 70, x + 16, top); p.closePath(); g.fillStyle = '#bfe0ef'; g.fill(p); if (x === 720) { g.save(); g.globalAlpha = e3; g.fillStyle = '#8a1424'; g.fill(p); g.restore(); } g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(p); });
      [yB, yD0, yD1, yA0, yA1].forEach((f) => line(g, f, 3.5)); line(g, yP, 3);
      g.save(); g.strokeStyle = OUT; g.lineWidth = 4; g.strokeRect(-400, 30, 1800, 0); g.restore();
      // 4 intracerebral
      g.save(); g.globalAlpha = Math.max(0.15, pr(3)); const k4 = Math.max(0.35, pr(3)); paint(g, blob(780, 640, 90 * k4, 70 * k4, 0.3, t, 0.2, 14, 7), '#4a0910', null, null, bb(780, 640, 90, 70), OUT, 5); g.restore();
      // etichetele straturilor, în dreapta, fiecare în stratul ei
      txt(g, 'os', 975, 120, 24, '#fff', 'right'); txt(g, 'dura mater', 975, 220, 19, '#fff', 'right'); txt(g, 'arahnoida', 975, 250, 16, '#fff', 'right'); txt(g, 'sp. subarahnoidian (LCR)', 975, 289, 16, '#fff', 'right'); txt(g, 'pia + creier', 40, 860, 22, '#fff', 'left');
      ['1 epidural', '2 subdural', '3 subarahnoidian', '4 intracerebral'].forEach((s, i) => txt(g, s, [190, 450, 720, 780][i], [470, 470, 520, 760][i], 28, b.i === i ? '#ffe36e' : '#fff'));
    },
  };
}
function hemWhy() {
  return {
    home: HOME, cams: [cam(260, 420, 1.8), cam(260, 420, 2.0), cam(560, 500, 1.2), cam(500, 470, 1.0), cam(560, 420, 1.4)],
    anchors: [[150, 250], [330, 300], [700, 380], [460, 120], [560, 330]],
    labels: [lbl([230, 640], 'perete hialinizat, fragil', { beats: [0] }), lbl([300, 250], 'per rhexin', { beats: [1] }), lbl([660, 720], 'hematom', { beats: [2] }), lbl([380, 90], 'linia mediană împinsă', { beats: [3] }), lbl([560, 300], 'inundație ventriculară', { beats: [4] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914');
      if (b.i <= 1 && b.i >= 0) {
        // arteriola perforantă mărită
        const k = pulse(t, 5); const wall = new Path2D(); wall.roundRect(80, 330, 380, 180, 90);
        paint(g, wall, '#f2d7e6', '#e0b8cf', null, [80, 330, 380, 180], OUT, 7);
        g.save(); g.fillStyle = 'rgba(255,255,255,.5)'; for (let i = 0; i < 9; i++) { g.beginPath(); g.ellipse(120 + i * 38, 345, 14, 6, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(120 + i * 38, 495, 14, 6, 0, 0, 7); g.fill(); } g.restore();
        const lum = new Path2D(); lum.roundRect(110, 375 - k * 6, 320, 90 + k * 12, 45); paint(g, lum, '#d8323f', null, null, [110, 375, 320, 90], OUT, 4);
        txt(g, 'TA ↑', 270, 432, 30);
        if (b.i === 1) { const u = ease(b.bt); paint(g, blob(330, 300 - 120 * u, 40 + 60 * u, 30 + 50 * u, 0, t, 0.25, 12, 5), '#4a0910', null, null, bb(330, 260, 80, 60), OUT, 5); g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 6; g.beginPath(); g.moveTo(310, 330); g.lineTo(330, 350); g.lineTo(350, 330); g.stroke(); g.restore(); }
        txt(g, 'a. lenticulostriată (perforantă)', 270, 600, 26, '#e6dcec', 'center', 700);
        g.save(); g.translate(760, 470); g.scale(0.32, 0.32); g.translate(-500, -467); drawBrain(g, t, { hem: 0 }); g.restore(); txt(g, 'nucleii bazali', 760, 650, 22, '#e6dcec', 'center', 700);
      } else {
        const h = b.i === 2 ? 0.2 + 0.6 * ease(b.bt * 0.6) : b.i === 3 ? 0.8 + 0.2 * ease(b.bt) : 1; drawBrain(g, t, { hem: h, shift: b.i === 3 ? 26 * ease(b.bt) : b.i < 0 || b.i >= 3 ? 26 : 10 });
        if (b.i === 3) { arrow(g, 620, 160, 520, 160, '#ffe36e'); txt(g, 'edem · HTIC · herniere', 500, 900, 26, '#ffe36e'); }
      }
    },
  };
}
function socWhy() {
  return {
    home: HOME, cams: [cam(500, 470, 1.0), cam(300, 400, 1.6), cam(640, 380, 1.15), cam(500, 470, 1.0)],
    anchors: [[150, 120], [170, 260], [640, 130], [840, 830]],
    labels: [lbl([500, 80], 'hipoperfuzie: hemoragie, sepsis, pompă', { beats: [0] }), lbl([210, 760], 'corticala: vasoconstricție → palidă', { beats: [1] }), lbl([480, 800], 'medulara: vasele drepte pline → roșie', { beats: [1, 2] }), lbl([700, 900], 'IRA: oligurie → regenerare (poliurie)', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#2a1631', '#120914');
      const k = b.i < 0 ? 1 : b.i === 0 ? 0 : b.i === 1 ? ease(b.bt * 0.7) : 1;
      const mix = (a, c, u) => { const A = a.match(/\w\w/g).map((x) => parseInt(x, 16)), C = c.match(/\w\w/g).map((x) => parseInt(x, 16)); return '#' + A.map((v, i) => Math.round(lerp(v, C[i], u)).toString(16).padStart(2, '0')).join(''); };
      drawKidney(g, t, { cortex: mix('c8573f', 'efd6b8', k), cortexS: mix('bf5139', 'e3c6a4', k), cortexL: mix('e98a6f', 'fff4e6', k), med: mix('8f2a35', '7e1838', k), medR: lerp(0.84, 0.7, k) });
      if (b.i === 0) { const p = pulse(t, 4); txt(g, 'TA ↓', 500, 200 + p * 10, 60, '#ff8a8a'); }
      if (b.i === 2) {
        // tub necrozat cu cilindru, mărit
        field(g, 790, 260, 140, () => { bgFill(g, '#f7d8e4', '#f1c6d6'); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28; const x = 790 + Math.cos(a) * 80, y = 260 + Math.sin(a) * 80; const dead = i % 3 === 0; paint(g, blob(x, y, 24, 18, a, t, 0.05, 10, i), dead ? '#f9c7da' : '#e88fb6', null, null, bb(x, y, 24, 18), OUT, 3); if (!dead) { g.fillStyle = '#2c2490'; g.beginPath(); g.arc(x, y, 7, 0, 7); g.fill(); } } paint(g, blob(790, 260, 40, 34, 0, t, 0.1, 10, 9), '#f4a1c4', null, null, bb(790, 260, 40, 34), OUT, 3); });
        txt(g, 'tub necrozat pe segmente + cilindru', 760, 440, 22, '#ffe36e');
      }
      if (b.i === 3) { const u = ease(b.bt * 0.5); g.save(); g.strokeStyle = OUT; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(860, 470); g.lineTo(860, 520 + 260 * u); g.stroke(); g.strokeStyle = '#ffe36e'; g.lineWidth = 6; g.stroke(); g.restore(); txt(g, 'urina ↓', 900, 820, 24, '#ffe36e', 'left'); }
    },
  };
}

/* =================================================== DD: două desene alăturate */
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
const MINI = { aorta: DDF.aorta, embol: DDF.embol, ren: DDF.ren, pulm: DDF.pulm, ima: DDF.ima, hem: DDF.hem, soc: DDF.soc };
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
  const T = [
    ['tromb ≠ cheag', DDF.aorta, DDF.clotAo], ['alb vs. roșu', DDF.ren, DDF.pulm], ['edem vs. pneumonie', null, null], ['siderofage vs. antracoză', null, null],
    ['între ce straturi?', DDF.hem, DDF.subdural], ['șoc ≠ infarct', DDF.soc, DDF.renInf], ['lama 2: două leziuni', null, null], ['piesa fixată', DDF.aorta, null],
  ];
  const pos = T.map((_, i) => [130 + (i % 4) * 247, 260 + Math.floor(i / 4) * 400]);
  const micro = (g, t, kind, x, y) => { // desene mici pentru capcanele de la lame
    if (kind === 2) { for (let k = 0; k < 4; k++) { const cx = x - 50 + (k % 2) * 100, cy = y - 50 + Math.floor(k / 2) * 100; paint(g, blob(cx, cy, 44, 44, 0, t, 0.05, 12, k), k < 2 ? '#f6c7da' : '#f2a3c6', null, null, bb(cx, cy, 44, 44), OUT, 4); if (k >= 2) { srand(k); for (let j = 0; j < 6; j++) { g.fillStyle = '#2c2490'; g.beginPath(); g.arc(cx + rr(-25, 25), cy + rr(-25, 25), 5, 0, 7); g.fill(); } } else { g.fillStyle = '#fff'; g.beginPath(); g.arc(cx + 12, cy - 10, 10, 0, 7); g.fill(); } } }
    if (kind === 3) { paint(g, blob(x - 50, y, 50, 40, 0, t, 0.12, 12, 2), '#f7c6d9', null, null, bb(x - 50, y, 50, 40), OUT, 4); srand(3); for (let j = 0; j < 8; j++) { g.fillStyle = '#a8652d'; g.beginPath(); g.arc(x - 50 + rr(-25, 25), y + rr(-20, 20), 6, 0, 7); g.fill(); } paint(g, blob(x + 55, y, 50, 40, 0, t, 0.12, 12, 5), '#f7c6d9', null, null, bb(x + 55, y, 50, 40), OUT, 4); for (let j = 0; j < 8; j++) { g.fillStyle = '#111'; g.beginPath(); g.arc(x + 55 + rr(-25, 25), y + rr(-20, 20), 6, 0, 7); g.fill(); } }
    if (kind === 6) { const p = new Path2D(); p.roundRect(x - 100, y - 70, 200, 140, 16); paint(g, p, '#d8a3bf', null, null, [x - 100, y - 70, 200, 140], OUT, 5); paint(g, P([[x + 100, y - 70], [x + 100, y + 70], [x + 10, y + 70]]), '#7a0f20', null, null, [x, y, 100, 70], OUT, 4); srand(4); for (let j = 0; j < 10; j++) { g.fillStyle = '#a8652d'; g.beginPath(); g.arc(x - 80 + rr(0, 100), y - 50 + rr(0, 100), 5, 0, 7); g.fill(); } }
  };
  return {
    home: HOME, cams: pos.map(([x, y]) => cam(x, y, 1.9)), anchors: pos.map(([x, y]) => [x - 100, y - 150]),
    labels: pos.map(([x, y], i) => lbl([x, y + 165], T[i][0])),
    draw(g, t, b) {
      bgFill(g);
      pos.forEach(([x, y], i) => {
        const on = b.i === i; const p = new Path2D(); p.roundRect(x - 115, y - 140, 230, 280, 20); paint(g, p, on ? '#4a2a58' : '#2e1838', null, null, [x - 115, y - 140, 230, 280], on ? '#ffe36e' : OUT, on ? 7 : 5);
        g.save(); g.clip(p);
        const [, a, c] = T[i];
        if (a && c) { for (const [f, dx] of [[a, -55], [c, 55]]) { g.save(); g.translate(x + dx - 55, y - 55); g.scale(0.11, 0.118); f(g, t); g.restore(); } txt(g, 'vs.', x, y + 6, 22, '#ffe36e'); }
        else if (a) { g.save(); g.translate(x - 100, y - 100); g.scale(0.2, 0.214); a(g, t); g.restore(); g.save(); g.globalAlpha = 0.45 + 0.25 * pulse(t, 2); g.fillStyle = '#6b4a2e'; g.fill(p); g.restore(); txt(g, 'formol → brun-cenușiu', x, y + 110, 18, '#fff'); }
        else micro(g, t, i, x, y);
        g.restore();
        if (on) glowRing(g, x, y, 135, 160, 0, ease(b.bt * 1.5));
        txt(g, String(i + 1), x - 90, y - 100, 30, '#ffe36e');
      });
    },
  };
}
function recap() {
  const draw = iconGrid(ICONS.map((x) => x[0]), 100);
  return { home: HOME, cams: POS7.map(([x, y]) => cam(x, y, 2.0)), anchors: [], labels: POS7.map(([x, y], i) => lbl([x, y + 135], ICONS[i][0])), draw(g, t, b) { bgFill(g, '#3a1d47', '#160b1d'); draw(g, t, b); } };
}
function fallback() { return { home: HOME, anchors: [], draw(g) { bgFill(g); } }; }

export const SCENES = {
  atlas, mosaic, cover, fisaPiesa, aortaRec, embolRec, renRec, pulmRec, imaRec, hemRec, socRec,
  aortaWhy, embolWhy, renWhy, pulmWhy, imaWhy, hem4, hemWhy, socWhy, ddPair, script, capcane, recap, fallback,
};
