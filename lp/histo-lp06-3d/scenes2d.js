// Scenele cartoon 2D ale LP 6. Lumea are 1000×934 (slide normal) sau 600×897 (slide cu script).
// Fiecare scenă: draw(g, t, b), home/cams (cameră pe punct: x, y, z), anchors (badge-uri 1-2-3), labels, inset (poza reală), phase.
import {
  OUT, HE, VG, AG, clamp, lerp, ease, back, srand, rnd, rr, smooth, blob, spindle, paint, bb, glowRing,
  fibroblast, fibrocyte, lymphocyte, plasmocyte, macrophage, giant, adipocyte, rbc, capillary, bundle, wavy,
  makeNet, drawNet, qpt, tubule, field, roundRect, antibody, arrow, REDUCED,
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

/* ---------- câmpuri reutilizate ---------- */
// țesut de granulație (lama 1): multe celule, multe vase, colagen roz dezordonat
function granField(g, t, o = {}) {
  srand(o.seed || 5);
  bgFill(g, HE.bg, HE.bg2);
  for (let k = 0; k < 13; k++) { const x = rr(-80, 1000), y = rr(-40, 940), a = rr(-0.9, 0.9), L = rr(260, 520); bundle(g, wavy(x, y, x + Math.cos(a) * L, y + Math.sin(a) * L, rr(8, 16), rr(1.5, 3), rr(0, 6), 12), rr(14, 26), { n: 3 }); }
  const caps = [];
  for (const pts of [[[-60, 760], [250, 700], [520, 780], [820, 720], [1060, 770]], [[640, -40], [600, 200], [700, 380], [660, 560]], [[-40, 260], [180, 300], [340, 240]], [[780, 420], [900, 470], [1060, 430]]]) caps.push(capillary(g, pts, 40, t, { n: 7, speed: 0.035 }));
  if (o.fat !== false) { adipocyte(g, 905, 620, 66, t); adipocyte(g, 840, 760, 58, t, { nucAngle: Math.PI }); }
  fibroblast(g, 300, 470, 0.45, 0.25, t);
  fibroblast(g, 470, 160, 0.38, -0.3, t);
  fibrocyte(g, 790, 260, 0.5, 0.5, t);
  fibrocyte(g, 160, 600, 0.45, -0.4, t);
  plasmocyte(g, 420, 610, 0.7, 0.4, t);
  plasmocyte(g, 560, 420, 0.62, -0.6, t);
  macrophage(g, 200, 150, 0.55, t, { seed: 4, inc: 4 });
  const ly = [[350, 330], [380, 360], [330, 380], [520, 560], [550, 600], [250, 560], [610, 300], [140, 420], [470, 300], [720, 600], [690, 160], [860, 120], [300, 700], [560, 700]];
  ly.forEach(([x, y]) => lymphocyte(g, x, y, 0.75, t));
  return { caps, ly };
}
// fibre de colagen în van Gieson (lama 2)
function colField(g, t, o = {}) {
  srand(o.seed || 7);
  bgFill(g, VG.bg, VG.bg2);
  const B = [];
  const add = (x0, y0, x1, y1, w, amp, wv, ph) => { const p = wavy(x0, y0, x1, y1, amp, wv, ph, 18); B.push(p); bundle(g, p, w, { c: VG, n: Math.max(3, Math.round(w / 9)) }); return p; };
  add(-60, 140, 1060, 210, 30, 18, 2.5, 0);
  add(-60, 330, 1060, 300, 70, 26, 2, 1);   // fascicul grosier
  add(-60, 470, 1060, 520, 22, 16, 3, 2);   // fascicul fin
  add(-60, 640, 1060, 600, 52, 22, 2.2, 3);
  add(-60, 800, 1060, 850, 26, 14, 2.8, 4);
  add(100, -40, 380, 980, 18, 14, 3.5, 5);
  // nuclei de fibrocite: negru-cafenii, turtiți, lipiți de fibre (citoplasma nu se vede)
  const nuc = [[220, 300], [600, 330], [860, 300], [360, 505], [740, 515], [480, 625], [180, 820], [820, 845], [520, 170]];
  nuc.forEach(([x, y], k) => paint(g, spindle(x, y, 70, 17, 0.05 * (k % 3 - 1), t, k), VG.nuc, VG.nucS, VG.nucL, bb(x, y, 35, 8), OUT, 3));
  if (o.fat !== false) { adipocyte(g, 110, 720, 62, t, { nuc: VG.nuc, nucS: VG.nucS, rim: '#c94d62' }); adipocyte(g, 230, 760, 54, t, { nuc: VG.nuc, nucS: VG.nucS, rim: '#c94d62', nucAngle: 0 }); }
  return { B, nuc };
}
// rinichi impregnat argentic (lama 3): tubi în secțiune, rețea neagră în jurul lor
const RET = {};
function retField(g, t, o = {}) {
  const seed = o.seed || 9;
  bgFill(g, AG.bg, AG.bg2);
  const T = [[230, 230, 120], [520, 200, 95], [790, 260, 125], [320, 520, 105], [610, 470, 118], [880, 560, 92], [180, 780, 110], [470, 760, 100], [760, 790, 118]];
  T.forEach(([x, y, r]) => tubule(g, x, y, r));
  if (!RET[seed]) {
    srand(seed); const nodes = [];
    T.forEach(([x, y, r]) => { const n = Math.round(r / 9); for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2 + rr(-0.15, 0.15); const rad = r + rr(2, 12); nodes.push([x + Math.cos(a) * rad, y + Math.sin(a) * rad]); } });
    for (let k = 0; k < 120; k++) { const p = [rr(-20, 1020), rr(-20, 950)]; if (T.every(([x, y, r]) => Math.hypot(p[0] - x, p[1] - y) > r + 10)) nodes.push(p); }
    RET[seed] = makeNet(nodes, 3, 95);
  }
  const E = RET[seed];
  drawNet(g, E, AG.fib, 5.5, o.prog ?? 1);
  return { T, E };
}

/* =================================================== 1 · COPERTA */
function cover() {
  const L = [['HE', HE.bg, '#e9b6cf'], ['VG', VG.bg, '#e0223f'], ['Ag', AG.bg, '#151017']];
  const pos = [[300, 250], [520, 470], [740, 690]];
  const k = [0, 0, 0];
  return {
    home: HOME, cams: [cam(330, 270, 1.6), cam(520, 470, 1.6), cam(720, 680, 1.6)],
    anchors: pos.map(([x, y]) => [x - 170, y - 70]),
    draw(g, t, b) {
      bgFill(g, '#3a1d47', '#160b1d');
      pos.forEach(([x, y], i) => {
        k[i] = lerp(k[i], b.i === i ? 1 : 0, 0.08);
        g.save(); g.translate(x, y); g.rotate(-0.12); g.scale(1 + k[i] * 0.06, 1 + k[i] * 0.06);
        // lama de sticlă
        g.fillStyle = 'rgba(220,235,255,.18)'; g.strokeStyle = OUT; g.lineWidth = 7; roundRect(g, -230, -85, 460, 170, 18); g.fill(); g.stroke();
        g.fillStyle = '#f6f2ea'; roundRect(g, 140, -78, 82, 156, 10); g.fill(); g.lineWidth = 4; g.stroke();
        g.fillStyle = OUT; g.font = '800 34px Inter, sans-serif'; g.textAlign = 'center'; g.fillText(L[i][0], 181, 12);
        // preparatul
        g.save(); g.beginPath(); g.ellipse(-40, 0, 150, 66, 0, 0, 7); g.clip();
        g.fillStyle = L[i][1]; g.fillRect(-200, -80, 330, 160);
        g.translate(-190, -70); g.scale(0.32, 0.15);
        if (i === 0) granField(g, t, { fat: false }); else if (i === 1) colField(g, t, { fat: false }); else retField(g, t);
        g.restore();
        g.beginPath(); g.ellipse(-40, 0, 150, 66, 0, 0, 7); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke();
        if (k[i] > 0.05) { g.globalAlpha = k[i]; g.strokeStyle = '#ffe36e'; g.lineWidth = 6; g.shadowColor = '#ffe36e'; g.shadowBlur = 18; roundRect(g, -240, -95, 480, 190, 22); g.stroke(); }
        g.restore();
      });
    },
  };
}

/* =================================================== 2 · COMPONENTE */
function components() {
  srand(21);
  const net = makeNet(Array.from({ length: 40 }, () => [rr(660, 950), rr(90, 330)]), 3, 90);
  const gel = Array.from({ length: 160 }, () => [rr(40, 960), rr(40, 900), rr(0, 6)]);
  const lyPath = [[430, 790], [440, 740], [470, 670], [520, 600], [560, 540]];
  let lyP = [430, 790];
  return {
    home: HOME, cams: [cam(330, 440, 1.7), cam(470, 650, 1.6), cam(560, 330, 1.25), cam(500, 467, 1.05)],
    anchors: [[330, 380], () => [lyP[0], lyP[1] - 40], [470, 300], [150, 160]],
    labels: [lbl([800, 75], 'reticulină'), lbl([200, 70], 'elastice'), lbl([140, 560], 'adipocit'), lbl([780, 560], 'macrofag'), lbl([110, 845], 'capilar'), lbl([150, 205], 'gel = SF', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#fbecf3', '#f3d7e5');
      // substanța fundamentală: gel cu molecule (punctate)
      const gk = b.i === 3 ? 1 : 0.35;
      g.save(); g.fillStyle = `rgba(150,190,255,${0.45 * gk + 0.1})`; gel.forEach(([x, y, p]) => { g.beginPath(); g.arc(x + Math.sin(t * 0.5 + p) * 4, y + Math.cos(t * 0.4 + p) * 4, b.i === 3 ? 5 : 3.5, 0, 7); g.fill(); }); g.restore();
      // fibre elastice (subțiri, ondulate, ramificate)
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 8; const el = [wavy(60, 100, 420, 150, 10, 5, 0), wavy(60, 140, 380, 210, 9, 5, 1)]; el.forEach((p) => g.stroke(smooth(p, false))); g.strokeStyle = '#c9893f'; g.lineWidth = 4; el.forEach((p) => g.stroke(smooth(p, false))); g.restore();
      drawNet(g, net, '#3a3240', 3.5);
      const hi = b.i === 2;
      bundle(g, wavy(-40, 300, 1040, 380, 18, 2.4, 0), hi ? 40 : 34, { n: 4 });
      bundle(g, wavy(-40, 470, 1040, 420, 16, 2.8, 1.4), hi ? 32 : 26, { n: 4 });
      bundle(g, wavy(80, 900, 900, -20, 14, 3, 2), hi ? 26 : 22, { n: 3 });
      if (hi) glowRing(g, 470, 330, 120, 50, 0.08, ease(b.bt * 1.5));
      adipocyte(g, 150, 640, 72, t);
      fibroblast(g, 330, 430, 0.55, 0.1, t);
      fibrocyte(g, 700, 470, 0.55, -0.1, t);
      macrophage(g, 790, 640, 0.6, t, { seed: 6, inc: 4 });
      capillary(g, [[-40, 800], [250, 760], [500, 830], [760, 780], [1040, 820]], 54, t, { n: 9 });
      // limfocit care iese din capilar (diapedeză) în pasul 2
      const u = b.i === 1 ? ease(b.bt / (b.bd * 0.8)) : b.i > 1 ? 1 : 0;
      const f = u * (lyPath.length - 1); const i = Math.min(lyPath.length - 2, Math.floor(f)); lyP = [lerp(lyPath[i][0], lyPath[i + 1][0], f - i), lerp(lyPath[i][1], lyPath[i + 1][1], f - i)];
      lymphocyte(g, lyP[0], lyP[1], 0.95, t);
      if (b.i === 0) glowRing(g, 330, 430, 170, 70, 0.1, ease(b.bt * 1.5));
    },
  };
}

/* =================================================== 3 · TREI FIBRE */
function fibers3() {
  srand(31);
  const net = makeNet(Array.from({ length: 46 }, () => [rr(380, 620), rr(250, 690)]), 3, 75);
  const el = []; srand(3); for (let k = 0; k < 5; k++) el.push(wavy(rr(720, 900), 250, rr(720, 900), 690, 8, 6, k, 24));
  const br = el.map((p, k) => { const s = p[6 + k * 2]; return wavy(s[0], s[1], s[0] + (k % 2 ? 70 : -70), s[1] + 90, 5, 2, k, 8); });
  let st = 0, lastI = -9;
  const cards = [[150, 'colagen'], [500, 'reticulină'], [850, 'elastice']];
  const SP = [['#f4e09a', VG.col, 'van Gieson → roșu'], [AG.bg, AG.fib, 'impregnație argentică → negru'], ['#f3dfe9', '#d9a9bf', 'elastice: în HE nu se colorează']];
  return {
    home: HOME, cams: [cam(160, 470, 1.85), cam(500, 470, 1.85), cam(840, 470, 1.85)],
    anchors: [[150, 215], [500, 215], [850, 215]],
    labels: cards.map(([x, n]) => lbl([x, 735], n)),
    phase: (i) => (i < 0 ? 'HE: se vede doar colagenul' : ''),
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      if (b.i !== lastI) { lastI = b.i; st = 0; }
      const special = b.i >= 0 && b.bt > 1.4; st = lerp(st, special ? 1 : 0, 0.06);
      const ph = document.getElementById('phase'); if (ph) ph.textContent = b.i < 0 ? 'HE: se vede doar colagenul' : special ? SP[b.i][2] : 'HE';
      cards.forEach(([x], i) => {
        const k = i === b.i ? st : 0;
        const bgc = k > 0.5 ? SP[i][0] : '#f3dfe9';
        g.save(); g.fillStyle = bgc; g.strokeStyle = OUT; g.lineWidth = 7; roundRect(g, x - 140, 240, 280, 460, 22); g.fill(); g.stroke();
        g.beginPath(); g.roundRect(x - 140, 240, 280, 460, 22); g.clip();
        if (i === 0) { const c = k > 0.5 ? VG : HE; bundle(g, wavy(x - 60, 230, x + 40, 710, 16, 2.5, 0), 46, { c, n: 5 }); bundle(g, wavy(x + 50, 230, x - 20, 710, 14, 2.2, 1), 30, { c, n: 4 }); }
        if (i === 1) { if (k > 0.05) { g.globalAlpha = k; drawNet(g, net, AG.fib, 4); g.globalAlpha = 1; } else { g.globalAlpha = 0.12; drawNet(g, net, '#c9a3b8', 3); g.globalAlpha = 1; } }
        if (i === 2) { g.globalAlpha = 0.12 + 0.1 * k; g.lineCap = 'round'; [...el, ...br].forEach((p) => { g.strokeStyle = '#c9a3b8'; g.lineWidth = 5; g.stroke(smooth(p, false)); }); g.globalAlpha = 1; }
        g.restore();
      });
    },
  };
}

/* =================================================== 4 · OSPE */
function ospe() {
  const R = 250, C0 = [500, 330];
  const segs = [[0, 1, '#6d6178', 'citești'], [1, 1.5, '#e07bb0', ''], [1.5, 3, '#c2558c', ''], [3, 3.75, '#9a2f66', ''], [3.75, 4, '#ff9fd0', ''], [4, 7, '#4a3d58', 'completezi']];
  const ang = (m) => -Math.PI / 2 + (m / 7) * Math.PI * 2;
  const clk = (m, out) => [C0[0] + Math.cos(ang(m)) * (R + out), C0[1] + Math.sin(ang(m)) * (R + out)];
  const pil = [[330, 150], [500, 210], [670, 270]];
  const tA = [0.5, 1.25, 2.4, 3.4];
  return {
    home: HOME, cams: [cam(500, 700, 1.25), cam(500, 690, 1.25), cam(500, 680, 1.25)],
    anchors: pil.map(([x, h]) => [x, 900 - h - 30]),
    labels: [lbl(clk(0, 50), '0:00 · 7 min'), lbl(clk(0.5, 70), '1 min: citești'), lbl(clk(2.4, 90), 'scriptul: 2–3 min'), lbl(clk(6, 80), '6:00 · „mai e 1 minut”')],
    phase: (i) => ['Recunoașterea', 'Descrierea', 'Diagnosticul diferențial'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      g.save(); g.lineCap = 'butt';
      segs.forEach(([a, c, col], k) => { const on = (b.i === 0 && k === 1) || (b.i === 1 && k === 2) || (b.i === 2 && k === 3); g.strokeStyle = OUT; g.lineWidth = 48; g.beginPath(); g.arc(C0[0], C0[1], R, ang(a), ang(c)); g.stroke(); g.strokeStyle = col; g.lineWidth = 38; if (on) { g.shadowColor = col; g.shadowBlur = 22; } g.beginPath(); g.arc(C0[0], C0[1], R, ang(a) + 0.01, ang(c) - 0.01); g.stroke(); g.shadowBlur = 0; });
      g.restore();
      for (let m = 0; m < 7; m++) { const [x, y] = clk(m, -46); g.fillStyle = '#fff'; g.beginPath(); g.arc(x, y, 6, 0, 7); g.fill(); }
      const tm = b.i < 0 ? (t * 0.9) % 7 : tA[b.i] + clamp(b.bt / b.bd) * ((tA[b.i + 1] ?? 4) - tA[b.i]);
      g.save(); g.strokeStyle = OUT; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(C0[0], C0[1]); g.lineTo(...clk(tm, -60)); g.stroke(); g.strokeStyle = '#fff'; g.lineWidth = 9; g.stroke(); g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.arc(C0[0], C0[1], 20, 0, 7); g.fill(); g.stroke(); g.restore();
      pil.forEach(([x, h], i) => { const on = b.i === i; const hh = h * (on ? 1.08 : 1); paint(g, (() => { const p = new Path2D(); p.roundRect(x - 62, 900 - hh, 124, hh, 14); return p; })(), ['#e07bb0', '#c2558c', '#9a2f66'][i], null, null, [x - 62, 900 - hh, 124, hh], OUT, 7); g.fillStyle = '#fff'; g.font = '800 46px "Plus Jakarta Sans", Inter, sans-serif'; g.textAlign = 'center'; g.fillText(String(i + 1), x, 900 - hh / 2 + 16); });
    },
  };
}

/* =================================================== 5 · LAMA 1 · RECUNOAȘTERE */
function granRec() {
  let F = null;
  return {
    home: HOME, cams: [cam(380, 400, 1.9), cam(500, 380, 1.4), cam(450, 740, 1.6), cam(850, 660, 1.9)],
    anchors: [[350, 330], [140, 140], [500, 770], [905, 600]],
    inset: () => ({ img: 'gr', cap: 'Așa arată pe lamă · HE, ob. mic' }),
    labels: [lbl([350, 300], 'limfocite', { beats: [0] }), lbl([560, 380], 'plasmocit', { beats: [0] }), lbl([300, 520], 'fibroblast', { beats: [-1, 3] }), lbl([820, 640], 'adipocit', { beats: [3] })],
    draw(g, t, b) {
      F = granField(g, t);
      if (b.i === 0) glowRing(g, 360, 355, 70, 60, 0, ease(b.bt * 1.5));
      if (b.i === 2) glowRing(g, 480, 760, 300, 70, -0.05, ease(b.bt * 1.5));
    },
  };
}

/* =================================================== 6 · FIBROBLAST vs FIBROCIT */
function fbfc() {
  return {
    home: HOME, cams: [cam(330, 330, 1.9), cam(320, 330, 2.6), cam(560, 300, 1.4), cam(680, 680, 1.8)],
    anchors: [[300, 270], [312, 335], [640, 250], [700, 640]],
    inset: (i) => (i === 3 ? { img: 'c_fibrocit', cap: 'Fibrocit pe lamă' } : { img: 'c_fibroblast', cap: 'Fibroblast pe lamă' }),
    labels: [lbl([330, 230], 'eucromatină → nucleu palid', { beats: [0, 1] }), lbl([700, 710], 'heterocromatină → nucleu închis', { beats: [3] }), lbl([850, 330], 'colagen nou', { beats: [2] })],
    draw(g, t, b) {
      bgFill(g, HE.bg, HE.bg2);
      bundle(g, wavy(-40, 700, 1040, 640, 16, 2.2, 0), 42, { n: 5 });
      bundle(g, wavy(-40, 820, 1040, 860, 14, 2.6, 1), 30, { n: 4 });
      // secreție: tropocolagen care pleacă din fibroblast și se adună într-o fibrilă nouă
      const act = b.i === 2 || b.i < 0 ? 1 : 0.4;
      const path = [[460, 330], [600, 280], [760, 300], [940, 330]];
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 16; g.stroke(smooth(path, false)); g.strokeStyle = HE.col; g.lineWidth = 9; g.stroke(smooth(path, false)); g.restore();
      for (let k = 0; k < 9; k++) { const u = ((k / 9) + t * 0.08) % 1; const x = lerp(400, 900, u), y = 300 + Math.sin(u * 5) * 26 - 30; g.save(); g.globalAlpha = act * Math.sin(u * Math.PI); g.translate(x, y); g.rotate(0.3); g.fillStyle = '#ffd6e8'; g.strokeStyle = OUT; g.lineWidth = 3; roundRect(g, -14, -5, 28, 10, 5); g.fill(); g.stroke(); g.restore(); }
      fibroblast(g, 320, 330, 0.95, -0.05, t);
      fibrocyte(g, 700, 680, 0.95, -0.06, t);
      if (b.i === 0) glowRing(g, 320, 330, 100, 56, -0.05, ease(b.bt * 1.5));
      if (b.i === 1) glowRing(g, 312, 332, 26, 26, 0, ease(b.bt * 1.5));
      if (b.i === 3) glowRing(g, 700, 678, 90, 26, -0.06, ease(b.bt * 1.5));
    },
  };
}

/* =================================================== 7 · PLASMOCIT, LIMFOCIT, ADIPOCIT */
function cells3() {
  const P = [[210, 420], [530, 480], [810, 420]];
  const ab = Array.from({ length: 12 }, (_, k) => ({ a: (k / 12) * Math.PI * 2 + 0.2, ph: k / 12 }));
  return {
    home: HOME, cams: [cam(230, 420, 2.2), cam(530, 480, 2.6), cam(810, 420, 1.9)],
    anchors: [[210, 320], [530, 425], [810, 280]],
    inset: (i) => (i === 1 ? { img: 'c_limfocit', cap: 'Limfocite pe lamă' } : i === 2 ? { img: 'c_adipocit', cap: 'Adipocite pe lamă' } : { img: 'c_plasmocit', cap: 'Plasmocite pe lamă' }),
    labels: [lbl([155, 470], '„spițe de roată”', { beats: [0] }), lbl([250, 380], 'zona clară (Golgi)', { beats: [0] }), lbl([350, 300], 'anticorpi (Ig)', { beats: [0] }), lbl([575, 500], 'citoplasmă în semilună', { beats: [1] }), lbl([810, 470], 'vacuolă lipidică (goală)', { beats: [2] }), lbl([810, 305], 'nucleu turtit, periferic', { beats: [2] }),
      lbl([210, 600], 'plasmocit', { beats: [-1] }), lbl([530, 560], 'limfocit', { beats: [-1] }), lbl([810, 600], 'adipocit', { beats: [-1] })],
    draw(g, t, b) {
      bgFill(g, HE.bg, HE.bg2);
      bundle(g, wavy(-40, 760, 1040, 820, 14, 2.2, 0), 34, { n: 4 });
      bundle(g, wavy(-40, 120, 1040, 90, 12, 2.6, 1), 26, { n: 3 });
      P.forEach(([x, y], i) => { const on = b.i === i; g.save(); g.fillStyle = on ? 'rgba(255,227,110,.22)' : 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(x, y + (i === 1 ? 60 : 150), 150, 26, 0, 0, 7); g.fill(); g.restore(); });
      // anticorpi ies din plasmocit
      ab.forEach((a) => { const u = (a.ph + (REDUCED ? 0 : t * 0.12)) % 1; const r = 80 + u * 160; antibody(g, P[0][0] + Math.cos(a.a) * r, P[0][1] + Math.sin(a.a) * r * 0.8, 1.1 * Math.sin(u * Math.PI) * (b.i <= 0 ? 1 : 0.4), a.a + t); });
      plasmocyte(g, P[0][0], P[0][1], 1.6, 0.15, t);
      lymphocyte(g, P[1][0], P[1][1], 1.7, t);
      adipocyte(g, P[2][0], P[2][1], 135, t);
    },
  };
}

/* =================================================== 8 · MACROFAG */
function macro() {
  const C = [470, 470];
  const phases = ['1 · înghite', '2 · digeră', '3 · incluziuni', '4 · se contopesc'];
  return {
    home: HOME, cams: [cam(560, 460, 1.5), cam(500, 470, 1.8), cam(500, 470, 1.8), cam(500, 470, 1.0)],
    anchors: [[640, 400], [520, 480], [520, 560], [500, 250]],
    inset: (i) => (i === 3 ? { img: 'c_gigant', cap: 'Celulă gigantă pe lamă' } : { img: 'c_macrofag', cap: 'Macrofag pe lamă' }),
    labels: [lbl([800, 420], 'bacterie', { beats: [0] }), lbl([560, 620], 'lizozomi', { beats: [1] }), lbl([560, 640], 'resturi = incluziuni', { beats: [2] }), lbl([500, 760], 'celulă gigantă multinucleată', { beats: [3] })],
    phase: (i) => phases[i] || 'fagocitoza',
    draw(g, t, b) {
      bgFill(g, HE.bg, HE.bg2);
      bundle(g, wavy(-40, 800, 1040, 860, 14, 2.2, 0), 32, { n: 4 });
      bundle(g, wavy(-40, 110, 1040, 140, 12, 2.6, 1), 26, { n: 3 });
      const u = u01(b, 0.85);
      if (b.i === 3) {
        const m = ease(u / 0.6), gi = ease((u - 0.55) / 0.35);
        if (gi < 1) { g.save(); g.globalAlpha = 1 - gi; [[-1, -1], [1, -0.6], [0, 1]].forEach(([dx, dy], k) => macrophage(g, C[0] + dx * lerp(330, 90, m), C[1] + dy * lerp(220, 60, m), 0.9, t, { seed: 30 + k, inc: 3 })); g.restore(); }
        if (gi > 0) { g.save(); g.globalAlpha = gi; giant(g, 500, 470, 1.25, t); g.restore(); }
        return;
      }
      let bac = [820, 400], eng = 0, dig = 0, inc = 0;
      if (b.i === -1) { bac = [820 + Math.sin(t) * 10, 400]; }
      if (b.i === 0) { bac = [lerp(820, 560, ease(u * 1.3)), lerp(400, 450, ease(u))]; eng = ease((u - 0.25) / 0.6); }
      if (b.i >= 1) { bac = [540, 460]; eng = 1; }
      if (b.i === 1) dig = u; if (b.i >= 2) dig = 1; if (b.i === 2) inc = u;
      macrophage(g, C[0], C[1], 1.7, t, { seed: 8, inc: Math.round(inc * 6), pseudo: b.i === 0 ? [bac[0], bac[1], eng] : null });
      // bacteria (verde), digerată treptat
      if (dig < 1) { const s = 1 - dig * 0.8; g.save(); g.translate(bac[0], bac[1]); g.rotate(t * 0.6); g.scale(s, s); paint(g, (() => { const p = new Path2D(); p.roundRect(-38, -16, 76, 32, 16); return p; })(), '#7fe0a8', '#4bb37e', '#d6ffe8', [-38, -16, 76, 32], OUT, 5); g.restore(); }
      // fagozom (membrană în jurul bacteriei) + lizozomi care fuzionează
      if (b.i >= 1 && dig < 1) { g.save(); g.strokeStyle = OUT; g.lineWidth = 4; g.setLineDash([8, 6]); g.beginPath(); g.ellipse(540, 460, 56, 38, 0, 0, 7); g.stroke(); g.restore(); }
      for (let k = 0; k < 5; k++) { const a = k * 1.25 + t * 0.4; let x = C[0] + Math.cos(a) * 110, y = C[1] + Math.sin(a) * 80; if (b.i === 1) { const f = ease((u - k * 0.08) * 1.6); x = lerp(x, 540, f); y = lerp(y, 460, f); } if (b.i <= 1 && !(b.i === 1 && u > 0.9)) paint(g, blob(x, y, 14, 14, 0, t, 0.03, 10, k), '#ffb060', '#e08a30', '#ffe1b8', bb(x, y, 14, 14), OUT, 3); }
      if (b.i === 1 && u > 0.55 && u < 0.95) { g.save(); g.globalAlpha = Math.sin((u - 0.55) / 0.4 * Math.PI); g.fillStyle = '#ffd08a'; g.shadowColor = '#ffb060'; g.shadowBlur = 40; g.beginPath(); g.arc(540, 460, 48, 0, 7); g.fill(); g.restore(); }
    },
  };
}

/* =================================================== 9 · GALERIA */
function gallery() {
  const S = [[180, 300], [500, 300], [820, 300], [140, 690], [390, 690], [640, 690], [880, 690]];
  const names = ['Fibroblast', 'Fibrocit', 'Adipocit', 'Plasmocit', 'Macrofag', 'Celulă gigantă', 'Limfocit'];
  const draw = [
    (g, t) => fibroblast(g, S[0][0], S[0][1], 0.5, 0, t), (g, t) => fibrocyte(g, S[1][0], S[1][1], 0.55, 0, t), (g, t) => adipocyte(g, S[2][0], S[2][1], 95, t),
    (g, t) => plasmocyte(g, S[3][0], S[3][1], 1.0, 0.1, t), (g, t) => macrophage(g, S[4][0], S[4][1], 0.8, t, { seed: 5, inc: 4 }), (g, t) => giant(g, S[5][0], S[5][1], 0.55, t), (g, t) => lymphocyte(g, S[6][0], S[6][1], 1.4, t),
  ];
  return {
    home: HOME, cams: S.map(([x, y]) => cam(x, y, 2.2)),
    anchors: S.map(([x, y]) => [x, y - 115]),
    labels: S.map(([x, y], i) => lbl([x, y + 120], names[i], { beats: [-1, i] })),
    phase: (i) => names[i] || 'proprii → migrate',
    draw(g, t, b) {
      bgFill(g, HE.bg, HE.bg2);
      g.save(); g.fillStyle = 'rgba(194,85,140,.12)'; roundRect(g, 30, 140, 940, 320, 30); g.fill(); g.fillStyle = 'rgba(80,90,200,.10)'; roundRect(g, 30, 520, 940, 340, 30); g.fill();
      g.fillStyle = '#8e2f60'; g.font = '800 24px "Plus Jakarta Sans", Inter, sans-serif'; g.fillText('PROPRII', 54, 184); g.fillStyle = '#3b3a90'; g.fillText('MIGRATE DIN SÂNGE', 54, 564); g.restore();
      draw.forEach((d, i) => { d(g, t); if (b.i === i) glowRing(g, S[i][0], S[i][1], 150, 120, 0, ease(b.bt * 1.5)); });
    },
  };
}

/* =================================================== 10 · VINDECAREA PLĂGII */
function wound() {
  srand(101);
  const fib = Array.from({ length: 40 }, () => { const x = rr(400, 600), y = rr(330, 800), a = rr(0, 6); return [x, y, x + Math.cos(a) * 70, y + Math.sin(a) * 70]; });
  const rb = Array.from({ length: 30 }, () => [rr(410, 590), rr(340, 790), rr(0, 6)]);
  const sprouts = Array.from({ length: 4 }, (_, k) => { const x = 430 + k * 45; return [[x, 840], [x + rr(-25, 25), 700], [x + rr(-25, 25), 560], [x + rr(-20, 20), 420]]; });
  const cells = Array.from({ length: 9 }, () => [rr(420, 580), rr(360, 780), rr(-1, 1)]);
  const ly = Array.from({ length: 16 }, () => [rr(415, 585), rr(350, 790)]);
  const gb = Array.from({ length: 10 }, (_, k) => wavy(rr(400, 520), 360 + k * 45, rr(480, 600), 380 + k * 45, 6, 1.5, k));
  const phases = ['1 · plaga: cheag de fibrină', '2 · macrofage + capilare noi', '3 · țesut de granulație = LAMA 1', '4 · cicatrice'];
  return {
    home: HOME, cams: [cam(500, 560, 1.5), cam(500, 560, 1.5), cam(500, 560, 1.5), cam(500, 560, 1.5)],
    anchors: [[420, 300], [470, 300], [530, 300], [580, 300]],
    phase: (i) => phases[i] || 'vindecarea plăgii',
    labels: [lbl([200, 270], 'epiderm'), lbl([200, 560], 'derm')],
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      const p = b.i < 0 ? 2 : b.i; const u = b.i < 0 ? 1 : ease(b.bt / (b.bd * 0.6));
      // derm + epiderm, cu defectul la mijloc
      const derm = new Path2D(); derm.moveTo(40, 320); derm.lineTo(400, 320); derm.lineTo(440, 850); derm.lineTo(560, 850); derm.lineTo(600, 320); derm.lineTo(960, 320); derm.lineTo(960, 900); derm.lineTo(40, 900); derm.closePath();
      paint(g, derm, '#f7d3e2', '#efbcd2', null, [40, 320, 920, 580], OUT, 7);
      for (const [x0, x1] of [[40, 400], [600, 960]]) { const e = new Path2D(); e.roundRect(x0, 250, x1 - x0, 80, 10); paint(g, e, '#9b7ad8', '#7a5cc8', '#c7b4f2', [x0, 250, x1 - x0, 80], OUT, 7); }
      for (let k = 0; k < 6; k++) bundle(g, wavy(60, 400 + k * 80, 380, 410 + k * 80, 8, 2, k), 16, { n: 3 });
      for (let k = 0; k < 6; k++) bundle(g, wavy(620, 400 + k * 80, 940, 410 + k * 80, 8, 2, k + 2), 16, { n: 3 });
      g.save(); const hole = new Path2D(); hole.moveTo(400, 320); hole.lineTo(440, 850); hole.lineTo(560, 850); hole.lineTo(600, 320); hole.closePath(); g.clip(hole);
      if (p === 0 || p === 1) { const a = p === 0 ? u : 1 - u * 0.7; g.globalAlpha = a; g.fillStyle = 'rgba(160,30,50,.25)'; g.fill(hole); g.lineCap = 'round'; fib.forEach(([x0, y0, x1, y1]) => { g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.strokeStyle = '#fff1b8'; g.lineWidth = 3.5; g.stroke(); }); rb.forEach(([x, y, r]) => rbc(g, x, y, 0.55, r, t)); g.globalAlpha = 1; }
      if (p === 1 || p === 2 || p === 3) { const f = p === 1 ? u : p === 2 ? 1 : 1 - u * 0.85; sprouts.forEach((pts) => { const n = Math.max(2, Math.round(pts.length * f + 0.5)); g.save(); g.lineCap = 'round'; g.setLineDash([600 * f, 2000]); g.strokeStyle = OUT; g.lineWidth = 20; g.stroke(smooth(pts, false)); g.strokeStyle = '#ff8aa6'; g.lineWidth = 12; g.stroke(smooth(pts, false)); g.restore(); }); }
      if (p === 1) [0, 1, 2].forEach((k) => macrophage(g, lerp(300 + k * 30, 450 + k * 50, u), 420 + k * 140, 0.45, t, { seed: 40 + k, inc: 3 }));
      if (p === 2 || p === 3) { const a = p === 2 ? u : 1 - u * 0.9; g.globalAlpha = a; gb.forEach((p) => bundle(g, p, 9, { n: 2 })); cells.forEach(([x, y, r]) => fibroblast(g, x, y, 0.2, r, t)); ly.forEach(([x, y]) => lymphocyte(g, x, y, 0.62, t)); g.globalAlpha = 1; }
      if (p === 3) { g.globalAlpha = u; for (let k = 0; k < 11; k++) bundle(g, wavy(380, 345 + k * 46, 620, 345 + k * 46, 4, 3, k), 30, { n: 4 }); g.globalAlpha = 1; }
      g.restore();
      if (p >= 2) { const a = p === 2 ? u : 1; g.save(); g.globalAlpha = a; const e = new Path2D(); e.roundRect(396, 262, 208, 56, 10); paint(g, e, '#9b7ad8', '#7a5cc8', null, [396, 262, 208, 56], OUT, 6); g.restore(); }
      if (p === 2) { g.save(); g.globalAlpha = 0.5 + 0.2 * Math.sin(t * 3); g.strokeStyle = '#ffe36e'; g.lineWidth = 6; g.setLineDash([16, 10]); g.beginPath(); g.moveTo(400, 320); g.lineTo(440, 850); g.lineTo(560, 850); g.lineTo(600, 320); g.closePath(); g.stroke(); g.restore(); }
    },
  };
}

/* =================================================== 11 · DD GRANULAȚIE vs LAX */
function ddLax() {
  const laxDraw = (g, t) => {
    srand(11); bgFill(g, HE.bg, HE.bg2);
    for (let k = 0; k < 10; k++) { const x = rr(-60, 900), y = rr(-40, 900), a = rr(-0.8, 0.8); bundle(g, wavy(x, y, x + Math.cos(a) * 420, y + Math.sin(a) * 420, 10, 2, k), rr(14, 22), { n: 3 }); }
    // lobul mamar: acini mici, epiteliali (violet)
    for (let k = 0; k < 7; k++) { const x = 330 + Math.cos(k) * 120 * (k % 2 ? 0.6 : 1), y = 330 + Math.sin(k * 1.3) * 110; g.save(); g.fillStyle = '#b9a6ea'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(x, y, 46, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#fff7fb'; g.beginPath(); g.arc(x, y, 18, 0, 7); g.fill(); g.restore(); }
    capillary(g, [[100, 520], [300, 500], [520, 560]], 32, t, { n: 4 });
    capillary(g, [[560, 140], [600, 300], [560, 460]], 30, t, { n: 4 });
    [[700, 560, 0.4], [250, 720, -0.2], [640, 760, 0.1], [820, 330, 0.6]].forEach(([x, y, r], k) => (k % 2 ? fibrocyte(g, x, y, 0.42, r, t) : fibroblast(g, x, y, 0.36, r, t)));
    lymphocyte(g, 780, 700, 0.6, t);
  };
  return {
    home: HOME, cams: [cam(500, 470, 1.0), cam(500, 470, 1.0), cam(500, 470, 1.0)],
    anchors: [[260, 140], [740, 140], [270, 615]],
    labels: [lbl([260, 860], 'granulație'), lbl([740, 860], 'conjunctiv lax'), lbl([700, 380], 'lobul mamar', { beats: [2] })],
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      fieldC(g, 260, 470, 225, () => { g.save(); g.translate(35, 245); g.scale(0.45, 0.48); granField(g, t, { fat: false }); g.restore(); });
      fieldC(g, 740, 470, 225, () => { g.save(); g.translate(515, 245); g.scale(0.45, 0.48); laxDraw(g, t); g.restore(); });
      const hi = (x, y) => glowRing(g, x, y, 235, 235, 0, ease(b.bt * 1.5));
      if (b.i === 0) { hi(260, 470); hi(740, 470); }
      if (b.i === 1) { hi(260, 470); hi(740, 470); }
      if (b.i === 2) { hi(260, 470); hi(740, 470); }
    },
  };
}

/* =================================================== SCRIPT OSPE (slide îngust) */
function script({ spec }) {
  const o = spec.sceneOpts || {}; const n = spec.script.length; const tot = spec.durs.reduce((a, c) => a + c, 0);
  const WS = 600, HS = 897;
  return {
    W: WS, H: HS, home: cam(300, 448, 1), cams: null, anchors: [],
    phase: (i) => (i >= 0 ? `${spec.script[i].tm} · ${spec.script[i].at}` : ''),
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a', WS, HS);
      fieldC(g, 300, 300, 230, () => { g.save(); g.translate(70, 70); g.scale(0.46, 0.49); if (o.img === 'gr') granField(g, t); else if (o.img === 'col') colField(g, t); else retField(g, t); g.restore(); });
      const C0 = [300, 700], R = 130; let acc = 0;
      spec.durs.forEach((d, i) => { const a0 = acc / tot, a1 = (acc + d) / tot; acc += d; const on = i === b.i, done = i < b.i; g.save(); g.lineCap = 'butt'; g.strokeStyle = OUT; g.lineWidth = 36; g.beginPath(); g.arc(C0[0], C0[1], R, -Math.PI / 2 + a0 * Math.PI * 2, -Math.PI / 2 + a1 * Math.PI * 2 - 0.03); g.stroke(); g.strokeStyle = on ? '#ff9fd0' : done ? '#c2558c' : '#4a3d58'; g.lineWidth = 26; if (on) { g.shadowColor = '#ff9fd0'; g.shadowBlur = 20; } g.stroke(); g.restore(); });
      let f = 0; if (b.i >= 0) { let a = 0; for (let k = 0; k < b.i; k++) a += spec.durs[k]; f = (a + spec.durs[b.i] * clamp(b.bt / b.bd)) / tot; }
      const ang = -Math.PI / 2 + f * Math.PI * 2; g.save(); g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(C0[0] + Math.cos(ang) * R, C0[1] + Math.sin(ang) * R, 16, 0, 7); g.fill(); g.stroke(); g.restore();
      g.save(); g.fillStyle = '#fff'; g.font = '800 40px "Plus Jakarta Sans", Inter, sans-serif'; g.textAlign = 'center'; g.fillText(b.i >= 0 ? `${b.i + 1}/${n}` : '3 min', C0[0], C0[1] + 14); g.restore();
    },
  };
}

/* =================================================== 13 · LAMA 2 · COLAGEN */
function colRec() {
  let F = null;
  return {
    home: HOME, cams: [cam(500, 330, 1.5), cam(500, 420, 1.4), cam(600, 330, 2.6), cam(500, 400, 1.3), cam(170, 740, 2.0)],
    anchors: [[300, 290], [700, 470], [600, 300], [520, 230], [110, 650]],
    inset: () => ({ img: 'col', cap: 'Așa arată pe lamă · van Gieson' }),
    labels: [lbl([150, 325], 'fascicul grosier', { beats: [1] }), lbl([150, 480], 'fascicul fin', { beats: [1] }), lbl([620, 220], 'NU se ramifică', { beats: [3] })],
    draw(g, t, b) {
      F = colField(g, t);
      // fibra care trece dintr-un fascicul în altul: evidențiată, cu un puls care o parcurge
      const cross = [[-60, 320], [200, 300], [400, 250], [560, 200], [760, 180], [1060, 210]];
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 15; g.stroke(smooth(cross, false)); g.strokeStyle = b.i === 3 ? '#ff6b86' : VG.col; g.lineWidth = 8; g.stroke(smooth(cross, false));
      if (b.i === 3) { const u = (t * 0.25) % 1; const k = Math.min(cross.length - 2, Math.floor(u * (cross.length - 1))); const f = u * (cross.length - 1) - k; const x = lerp(cross[k][0], cross[k + 1][0], f), y = lerp(cross[k][1], cross[k + 1][1], f); g.fillStyle = '#fff6b0'; g.shadowColor = '#ffe36e'; g.shadowBlur = 24; g.beginPath(); g.arc(x, y, 11, 0, 7); g.fill(); }
      g.restore();
      if (b.i === 2) glowRing(g, 600, 330, 52, 22, 0, ease(b.bt * 1.5));
    },
  };
}

/* =================================================== 14 · CABLUL */
function cable() {
  const X = [140, 380, 620, 860];
  return {
    home: HOME, cams: X.map((x) => cam(x, 470, 2.3)),
    anchors: X.map((x) => [x, 250]),
    labels: [lbl([140, 720], 'molecula'), lbl([380, 720], 'fibrila'), lbl([620, 720], 'fibra'), lbl([860, 720], 'fasciculul'), lbl([860, 210], 'tracțiune ⟷', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, VG.bg, VG.bg2);
      g.save(); g.strokeStyle = 'rgba(42,21,52,.25)'; g.lineWidth = 3; g.setLineDash([10, 10]); [260, 500, 740].forEach((x) => { g.beginPath(); g.moveTo(x, 300); g.lineTo(x, 640); g.stroke(); }); g.restore();
      // 1 · triplu helix: trei lanțuri răsucite
      const cols = ['#ff6b86', '#ffd0d9', '#c41634'];
      for (let k = 2; k >= 0; k--) { const pts = []; for (let i = 0; i <= 60; i++) { const y = 300 + i * 6; pts.push([140 + Math.sin(i / 60 * Math.PI * 6 + k * 2.09 + t * 1.2) * 34, y]); } g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 15; g.stroke(smooth(pts, false)); g.strokeStyle = cols[k]; g.lineWidth = 8; g.stroke(smooth(pts, false)); g.restore(); }
      // 2 · fibrila: striații transversale (molecule aliniate, decalate)
      g.save(); const fp = new Path2D(); fp.roundRect(345, 300, 70, 360, 30); g.fillStyle = '#e8435c'; g.fill(fp); g.clip(fp); for (let y = 300 + ((t * 20) % 40); y < 660; y += 40) { g.fillStyle = '#ff9aaa'; g.fillRect(345, y, 70, 18); } g.restore(); g.save(); g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(fp); g.restore();
      // 3 · fibra = fibrile paralele
      for (let k = 0; k < 6; k++) { const p = new Path2D(); p.roundRect(575 + k * 15, 300, 13, 360, 7); paint(g, p, k % 2 ? '#e8435c' : '#ff6f86', null, null, [575 + k * 15, 300, 13, 360], OUT, 3); }
      // 4 · fasciculul: fibre ondulate împreună + tracțiune
      const st = b.i === 3 ? 0.5 + 0.5 * Math.sin(t * 2.5) : 0;
      for (let k = 0; k < 4; k++) bundle(g, wavy(820 + k * 26, 300 - st * 14, 820 + k * 26, 660 + st * 14, 10 * (1 - st * 0.5), 2, 0, 16), 22, { c: VG, n: 3 });
      arrow(g, 860, 280, 860, 220 - st * 16); arrow(g, 860, 680, 860, 740 + st * 16);
      const hl = [140, 380, 620, 860][b.i]; if (hl) glowRing(g, hl, 480, 110, 210, 0, ease(b.bt * 1.5));
    },
  };
}

/* =================================================== 16 · LAMA 3 · RETICULINĂ */
function retRec() {
  let F = null, pulse = null; const SPX = 1700;
  srand(16); const spl = makeNet(Array.from({ length: 260 }, () => [rr(SPX - 420, SPX + 420), rr(80, 860)]), 3, 70);
  return {
    home: HOME, cams: [cam(250, 240, 2.0), cam(500, 467, 1.0), cam(560, 380, 1.9), cam(SPX, 467, 1.0)],
    anchors: [[340, 160], [610, 470], () => (pulse ? [pulse[0], pulse[1] - 30] : [500, 330]), [SPX, 120]],
    inset: (i) => (i === 3 ? { img: 'splina', cap: 'Splina · argentic (poză din LP)' } : i === 2 ? { img: 'ret_mare', cap: 'Ob. mare · rinichi' } : { img: 'ret', cap: 'Așa arată pe lamă · argentic' }),
    labels: [lbl([230, 230], 'tub renal (în ochi)', { beats: [-1, 0, 1] }), lbl([SPX, 900], 'splina: rețea deasă, fără tubi', { beats: [3] })],
    draw(g, t, b) {
      F = retField(g, t);
      g.save(); g.fillStyle = AG.bg; g.fillRect(SPX - 470, 40, 940, 860); g.strokeStyle = OUT; g.lineWidth = 8; g.strokeRect(SPX - 470, 40, 940, 860); drawNet(g, spl, AG.fib, 4); g.restore();
      // puls care merge pe rețea, alegând ramuri: arată ramificarea și anastomozele
      const E = F.E; const st = this._st || (this._st = { e: E[Math.floor(E.length / 2)], u: 0, dir: 1 });
      st.u += 0.012; if (st.u >= 1) { const end = st.dir > 0 ? st.e[1] : st.e[0]; const opts = E.filter((e) => e !== st.e && (e[0] === end || e[1] === end)); st.e = opts.length ? opts[Math.floor(Math.random() * opts.length)] : E[Math.floor(Math.random() * E.length)]; st.dir = st.e[0] === end ? 1 : -1; st.u = 0; }
      pulse = qpt(st.e, st.dir > 0 ? st.u : 1 - st.u);
      if (b.i === 2) { g.save(); g.fillStyle = '#fff6b0'; g.shadowColor = '#ffe36e'; g.shadowBlur = 26; g.beginPath(); g.arc(pulse[0], pulse[1], 11, 0, 7); g.fill(); g.restore(); }
      if (b.i === 0) glowRing(g, 230, 230, 135, 135, 0, ease(b.bt * 1.5));
    },
  };
}

/* =================================================== 17 · ARGIROFILIA */
function argyro() {
  srand(171);
  const fib = [[-40, 420], [250, 380], [520, 440], [780, 400], [1040, 430]];
  const coat = Array.from({ length: 70 }, (_, k) => { const u = k / 70; const x = lerp(-30, 1030, u); const y = 420 + Math.sin(u * 7) * 18 - 4 + (k % 2 ? -26 : 26); return [x, y]; });
  const ions = Array.from({ length: 60 }, (_, k) => ({ f: [rr(30, 970), rr(120, 760)], tg: coat[(k * 7) % coat.length], ph: rr(0, 6) }));
  const phases = ['1 · înveliș de zaharuri', '2 · Ag⁺ se leagă', '3 · reducere → argint metalic', '4 · rețea neagră; colagenul gros rămâne deschis'];
  return {
    home: HOME, cams: [cam(330, 430, 2.0), cam(500, 420, 1.3), cam(500, 430, 1.1), cam(500, 560, 1.15)],
    anchors: [[250, 340], [700, 330], [500, 220], [500, 640]],
    labels: [lbl([170, 500], 'fibră de reticulină (colagen III)'), lbl([170, 790], 'colagen gros', { beats: [-1, 3] }), lbl([880, 180], 'Ag⁺', { beats: [-1, 1] })],
    phase: (i) => phases[i] || 'argirofilia',
    draw(g, t, b) {
      bgFill(g, '#3a2b44', '#150c1b');
      const u = u01(b, 0.75); const bind = b.i === 1 ? ease(u) : b.i >= 2 ? 1 : 0; const red = b.i === 2 ? ease(u) : b.i === 3 ? 1 : 0;
      bundle(g, wavy(-40, 720, 1040, 760, 14, 2, 0), 64, { c: { col: '#c9a36a', colL: '#e6cc98', colS: '#a9814a' }, n: 6 });
      const wx = lerp(-60, 1060, red);
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 20; g.stroke(smooth(fib, false));
      const gr = g.createLinearGradient(0, 0, 1000, 0); const blk = '#151017', pale = '#d8c0a0'; gr.addColorStop(0, red > 0 ? blk : pale); gr.addColorStop(clamp(red), red > 0 ? blk : pale); gr.addColorStop(Math.min(1, clamp(red) + 0.001), pale); gr.addColorStop(1, pale);
      g.strokeStyle = gr; g.lineWidth = 12; g.stroke(smooth(fib, false)); g.restore();
      coat.forEach(([x, y], k) => { g.save(); const c = x < wx ? '#2a2a30' : '#8fe3ff'; g.fillStyle = c; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.arc(x, y + Math.sin(t * 2 + k) * 2, b.i === 0 ? 8 : 6, 0, 7); g.fill(); g.stroke(); g.restore(); });
      ions.forEach((ion) => { const x = lerp(ion.f[0] + Math.sin(t + ion.ph) * 10, ion.tg[0], bind), y = lerp(ion.f[1] + Math.cos(t * 0.8 + ion.ph) * 10, ion.tg[1], bind); const black = x < wx; g.save(); g.fillStyle = black ? '#0d0d10' : '#e8eef5'; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.arc(x, y, 9, 0, 7); g.fill(); g.stroke(); if (!black) { g.fillStyle = '#fff'; g.beginPath(); g.arc(x - 3, y - 3, 3, 0, 7); g.fill(); } g.restore(); });
      if (b.i === 2) { g.save(); g.fillStyle = 'rgba(168,255,207,.25)'; g.fillRect(wx - 30, 100, 60, 760); g.strokeStyle = '#a8ffcf'; g.lineWidth = 4; g.beginPath(); g.moveTo(wx, 100); g.lineTo(wx, 860); g.stroke(); g.restore(); }
    },
  };
}

/* =================================================== 18 · DD COLAGEN vs RETICULINĂ */
function ddFib() {
  srand(181);
  const nodes = Array.from({ length: 150 }, () => [rr(550, 950), rr(170, 770)]); const E = makeNet(nodes, 3, 70);
  const adj = new Map(); E.forEach((e, k) => [e[0], e[1]].forEach((n) => { if (!adj.has(n)) adj.set(n, []); adj.get(n).push(k); }));
  let front = [{ e: E[0], dir: 1 }], fu = 0;
  return {
    home: HOME, cams: [cam(500, 470, 1.0), cam(250, 470, 1.7), cam(500, 470, 1.0)],
    anchors: [[500, 130], [250, 300], [750, 470]],
    labels: [lbl([250, 820], 'colagen · van Gieson'), lbl([750, 820], 'reticulină · argentic'), lbl([250, 130], 'merge drept, nu se desparte', { beats: [2] }), lbl([750, 130], 'se desparte și se reunește', { beats: [2] })],
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      g.save(); g.fillStyle = VG.bg; g.strokeStyle = OUT; g.lineWidth = 8; roundRect(g, 40, 160, 420, 620, 26); g.fill(); g.stroke(); g.fillStyle = AG.bg; roundRect(g, 540, 160, 420, 620, 26); g.fill(); g.stroke(); g.restore();
      const lines = [[80, 300, 420, 320], [80, 470, 420, 450], [80, 640, 420, 660]];
      lines.forEach(([x0, y0, x1, y1], k) => bundle(g, wavy(x0, y0, x1, y1, 16, 2, k), 58, { c: VG, n: 6 }));
      g.save(); g.beginPath(); g.roundRect(540, 160, 420, 620, 26); g.clip(); drawNet(g, E, AG.fib, 5); g.restore();
      if (b.i === 2) {
        const u = (t * 0.3) % 1; g.save(); g.fillStyle = '#fff6b0'; g.shadowColor = '#ffe36e'; g.shadowBlur = 24; g.beginPath(); g.arc(lerp(80, 420, u), lerp(470, 450, u) + Math.sin(u * 12.6) * 16, 11, 0, 7); g.fill(); g.restore();
        fu += 0.025; if (fu >= 1) { fu = 0; const nf = []; for (const f of front) { const end = f.dir > 0 ? f.e[1] : f.e[0]; (adj.get(end) || []).filter((k) => E[k] !== f.e).slice(0, 2).forEach((k) => nf.push({ e: E[k], dir: E[k][0] === end ? 1 : -1 })); } front = nf.length && nf.length < 26 ? nf : [{ e: E[Math.floor(Math.random() * E.length)], dir: 1 }]; }
        front.forEach((f) => { const [x, y] = qpt(f.e, f.dir > 0 ? fu : 1 - fu); g.save(); g.fillStyle = '#fff6b0'; g.shadowColor = '#ffe36e'; g.shadowBlur = 20; g.beginPath(); g.arc(x, y, 9, 0, 7); g.fill(); g.restore(); });
      }
      if (b.i === 0) { glowRing(g, 250, 470, 230, 320, 0, ease(b.bt * 1.5)); glowRing(g, 750, 470, 230, 320, 0, ease(b.bt * 1.5)); }
    },
  };
}

/* =================================================== 20 · RECAPITULARE */
function recap() {
  const pos = [[500, 200], [500, 467], [500, 734]]; const L = ['HE', 'VG', 'Ag']; const k = [0, 0, 0];
  return {
    home: HOME, cams: [cam(500, 300, 1.15), cam(500, 467, 1.15), cam(500, 634, 1.15)], anchors: [],
    draw(g, t, b) {
      bgFill(g, '#3a1d47', '#160b1d');
      pos.forEach(([x, y], i) => {
        k[i] = lerp(k[i], b.i === i ? 1 : 0, 0.08);
        g.save(); g.translate(x, y); g.scale(1 + k[i] * 0.05, 1 + k[i] * 0.05);
        g.fillStyle = 'rgba(220,235,255,.18)'; g.strokeStyle = OUT; g.lineWidth = 7; roundRect(g, -330, -105, 660, 210, 20); g.fill(); g.stroke();
        g.fillStyle = '#f6f2ea'; roundRect(g, 210, -96, 110, 192, 12); g.fill(); g.lineWidth = 4; g.stroke();
        g.fillStyle = OUT; g.font = '800 40px Inter, sans-serif'; g.textAlign = 'center'; g.fillText(L[i], 265, 14);
        g.save(); g.beginPath(); g.ellipse(-50, 0, 230, 86, 0, 0, 7); g.clip(); g.translate(-290, -100); g.scale(0.48, 0.21);
        if (i === 0) granField(g, t, { fat: false }); else if (i === 1) colField(g, t, { fat: false }); else retField(g, t);
        g.restore(); g.beginPath(); g.ellipse(-50, 0, 230, 86, 0, 0, 7); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke();
        if (k[i] > 0.05) { g.globalAlpha = k[i]; g.strokeStyle = '#ffe36e'; g.lineWidth = 6; g.shadowColor = '#ffe36e'; g.shadowBlur = 18; roundRect(g, -342, -117, 684, 234, 24); g.stroke(); }
        g.restore();
      });
    },
  };
}

function fallback() { return { home: HOME, anchors: [], draw(g) { bgFill(g, '#2e1838', '#140a1a'); } }; }

export const SCENES = { atlas, mosaic, cover, components, fibers3, ospe, granRec, fbfc, cells3, macro, gallery, wound, ddLax, script, colRec, cable, retRec, argyro, ddFib, recap, fallback };
