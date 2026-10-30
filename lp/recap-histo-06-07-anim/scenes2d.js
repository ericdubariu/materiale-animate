// Scenele recapitulării Histo LP 6–7: harta lamelor, formatul OSPE, arborele, bazele, celulele, fibrele,
// câte o scenă pe lamă (+ DD), mozaic, tabel.
import { OUT, HE, VG, AG, clamp, lerp, ease, glowRing, roundRect, paint, spindle, blob, bb, bundle, wavy, srand, rr, makeNet, drawNet,
  fibroblast, plasmocyte, macrophage, giant, lymphocyte, arrow, field as ring0 } from './kit2d.js';
import { atlas, mosaic } from './atlas.js';

// field() din kit2d conturează ultima cale desenată; refacem cercul ca să fie conturat cercul, nu ultima formă din interior.
const fieldC = (g, x, y, r, f, ring) => ring0(g, x, y, r, () => { f(); g.beginPath(); g.arc(x, y, r, 0, 7); }, ring);
import { W, H, bgFill, field, fieldThumb } from './fields.js';

const cam = (x, y, z) => ({ x, y, z });
const HOME = cam(500, 467, 1);
const lbl = (at, html, o = {}) => ({ at, html, ...o });
const ring = (g, b, i, x, y, rx, ry = rx, rot = 0) => { if (b.i === i) glowRing(g, x, y, rx, ry, rot, ease(b.bt * 1.5)); };
export const NAMES = { gr: 'celulele țesutului conjunctiv', col: 'fibrele de colagen', ret: 'fibrele de reticulină', lax: 'conjunctivul lax', adi: 'țesutul adipos alb', ten: 'conjunctivul tendinos', rt: 'conjunctivul reticular' };
const SHORT = { gr: 'granulație', col: 'colagen', ret: 'reticulină', lax: 'lax', adi: 'adipos alb', ten: 'tendinos', rt: 'reticular' };
const ORDER = ['gr', 'col', 'ret', 'lax', 'adi', 'ten', 'rt'];
const FONT = (w, s) => `${w} ${s}px "Plus Jakarta Sans", Inter, sans-serif`;
function chipText(g, x, y, s, w = 760) { g.save(); g.fillStyle = 'rgba(20,10,28,.88)'; g.strokeStyle = '#ff9fd0'; g.lineWidth = 4; roundRect(g, x - w / 2, y - 26, w, 50, 14); g.fill(); g.stroke(); g.fillStyle = '#fff'; g.font = '700 22px Inter, sans-serif'; g.textAlign = 'center'; g.fillText(s, x, y + 7); g.restore(); }

/* =========================================================== 1 · HARTA CELOR 7 LAME */
function cover() {
  const pos = [[250, 250], [500, 250], [750, 250], [170, 640], [390, 640], [610, 640], [830, 640]]; const kk = ORDER.map(() => 0);
  const rowOf = (i) => (i < 3 ? 0 : 1);
  return {
    home: HOME, cams: [cam(500, 300, 1.25), cam(500, 620, 1.1), HOME],
    anchors: [[110, 250], [40, 520], [500, 790]],
    labels: [lbl([500, 115], 'LP 6 · trei colorații'), lbl([500, 505], 'LP 7 · toate în HE'),
      ...ORDER.map((k, i) => lbl([pos[i][0], pos[i][1] + 116], `${i + 1} · ${SHORT[k]}`))],
    draw(g, t, b) {
      bgFill(g, '#3a1d47', '#160b1d');
      pos.forEach(([x, y], i) => {
        const on = b.i === rowOf(i) || (b.i === 2 && (i === 1 || i === 2));
        kk[i] = lerp(kk[i], on ? 1 : 0, 0.08); const bob = on ? Math.sin(t * 2 + i) * 3 : 0;
        fieldThumb(g, ORDER[i], x, y + bob, 92 + kk[i] * 6);
        if (kk[i] > 0.05) glowRing(g, x, y + bob, 106, 106, 0, kk[i], b.i === 2 ? (i === 1 ? '#ff6b81' : '#ffffff') : '#ffe36e');
      });
      if (b.i < 0) { const i = ((Math.floor(t * 0.8) % 7) + 7) % 7; glowRing(g, pos[i][0], pos[i][1], 104, 104, 0, (t * 0.8) % 1); }
      if (b.i === 2) chipText(g, 500, 860, 'negru = reticulină · roșu = colagen · HE = restul de 5', 820);
    },
  };
}

/* =========================================================== 2 · FORMATUL OSPE (cronometrul de 7 minute) */
function ospe() {
  const R = 250, C0 = [500, 330];
  const segs = [[0, 1, '#6d6178'], [1, 1.5, '#e07bb0'], [1.5, 3, '#c2558c'], [3, 3.75, '#9a2f66'], [3.75, 4, '#ff9fd0'], [4, 7, '#4a3d58']];
  const ang = (m) => -Math.PI / 2 + (m / 7) * Math.PI * 2;
  const clk = (m, out) => [C0[0] + Math.cos(ang(m)) * (R + out), C0[1] + Math.sin(ang(m)) * (R + out)];
  const pil = [[330, 150], [500, 210], [670, 270]]; const tA = [0.5, 1.25, 2.4, 3.4, 3.9];
  return {
    home: HOME, cams: [cam(500, 700, 1.25), cam(500, 690, 1.25), cam(500, 680, 1.25), cam(500, 420, 1.05)], anchors: [...pil.map(([x, h]) => [x, 900 - h - 30]), clk(3.85, 60)],
    labels: [lbl(clk(0, 50), '0:00 · 7 min'), lbl(clk(0.5, 70), '1 min: citești'), lbl(clk(2.4, 90), 'scriptul: 2–3 min'), lbl(clk(6, 80), '6:00 · „mai e 1 minut”'), lbl(clk(3.9, 100), 'concluzia', { beats: [3] })],
    phase: (i) => ['Recunoașterea', 'Descrierea', 'Diagnosticul diferențial', 'Concluzia'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      g.save(); segs.forEach(([a, c, col], k) => { const on = (b.i === 0 && k === 1) || (b.i === 1 && k === 2) || (b.i === 2 && k === 3) || (b.i === 3 && k === 4); g.strokeStyle = OUT; g.lineWidth = 48; g.beginPath(); g.arc(C0[0], C0[1], R, ang(a), ang(c)); g.stroke(); g.strokeStyle = col; g.lineWidth = 38; if (on) { g.shadowColor = col; g.shadowBlur = 22; } g.beginPath(); g.arc(C0[0], C0[1], R, ang(a) + 0.01, ang(c) - 0.01); g.stroke(); g.shadowBlur = 0; }); g.restore();
      const tm = b.i < 0 ? 0.3 : tA[b.i] + clamp(b.bt / b.bd) * ((tA[b.i + 1] ?? 4) - tA[b.i]) * 0;
      g.save(); g.strokeStyle = OUT; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(C0[0], C0[1]); g.lineTo(...clk(tm, -60)); g.stroke(); g.strokeStyle = '#fff'; g.lineWidth = 9; g.stroke(); g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.arc(C0[0], C0[1], 20, 0, 7); g.fill(); g.stroke(); g.restore();
      pil.forEach(([x, h], i) => { const on = b.i === i; const hh = h * (on ? 1.08 : 1); const p = new Path2D(); p.roundRect(x - 62, 900 - hh, 124, hh, 14); g.save(); g.fillStyle = ['#e07bb0', '#c2558c', '#9a2f66'][i]; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(p); g.fillStyle = '#fff'; g.font = FONT(800, 46); g.textAlign = 'center'; g.fillText(String(i + 1), x, 900 - hh / 2 + 16); g.restore(); });
    },
  };
}

/* =========================================================== 3 · ARBORELE DE DECIZIE */
function tree() {
  const N = { root: [500, 70, 'Ce colorație?'], ng: [140, 210, 'NEGRU'], rs: [360, 210, 'ROȘU'], he: [700, 210, 'HE: ce predomină?'] };
  const NC = { ng: '#2b2230', rs: '#d8243f', he: '#c2558c' };
  const L = { ret: [140, 440, 'ng'], col: [360, 440, 'rs'], gr: [540, 450, 'he'], lax: [700, 450, 'he'], adi: [860, 450, 'he'], ten: [620, 740, 'he'], rt: [800, 740, 'he'] };
  const grp = [['ng', 'rs', 'he', 'ret', 'col'], ['he', 'gr', 'lax', 'adi'], ['he', 'ten', 'rt']];
  const on = (b, id) => b.i >= 0 && grp[b.i].includes(id);
  return {
    home: HOME, cams: [cam(400, 330, 1.2), cam(700, 430, 1.35), cam(710, 620, 1.35)],
    anchors: [[N.ng[0] - 90, N.ng[1] - 46], [L.gr[0] - 70, L.gr[1] - 80], [L.ten[0] - 70, L.ten[1] - 80]],
    labels: Object.entries(L).map(([k, [x, y]]) => lbl([x, y + 82], `${ORDER.indexOf(k) + 1} · ${SHORT[k]}`)),
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      g.save(); g.lineCap = 'round';
      const edge = (A, C, hi, dash) => { g.setLineDash(dash ? [8, 8] : []); g.strokeStyle = OUT; g.lineWidth = dash ? 7 : 12; g.beginPath(); g.moveTo(A[0], A[1] + 26); g.bezierCurveTo(A[0], (A[1] + C[1]) / 2, C[0], (A[1] + C[1]) / 2, C[0], C[1]); g.stroke(); g.strokeStyle = hi ? '#ff9fd0' : '#7d5f8e'; g.lineWidth = dash ? 4 : 6; g.stroke(); };
      for (const id of ['ng', 'rs', 'he']) edge(N.root, [N[id][0], N[id][1] - 26], on(b, id), false);
      for (const [k, [x, y, p]] of Object.entries(L)) edge(N[p], [x, y - 64], on(b, k), true);
      g.restore();
      for (const [id, [x, y, s]] of Object.entries(N)) {
        const hi = on(b, id) || id === 'root'; const w = Math.max(130, s.length * 13 + 34);
        g.save(); roundRect(g, x - w / 2, y - 26, w, 52, 26); g.fillStyle = id === 'root' ? '#4a3a5a' : NC[id]; g.globalAlpha = hi ? 1 : 0.55; g.fill(); g.globalAlpha = 1; g.strokeStyle = hi ? '#ffe36e' : OUT; g.lineWidth = 6; g.stroke();
        g.fillStyle = '#fff'; g.font = FONT(800, 21); g.textAlign = 'center'; g.fillText(s, x, y + 7); g.restore();
      }
      Object.entries(L).forEach(([k, [x, y]], i) => { const hi = on(b, k); const bob = hi ? Math.sin(t * 2.5 + i) * 3 : 0; fieldThumb(g, k, x, y + bob, 62); if (hi) glowRing(g, x, y + bob, 72, 72, 0, ease(b.bt * 1.5)); });
    },
  };
}

/* =========================================================== 4 · BAZELE: 3 COMPONENTE + PROPORȚII */
function props() {
  const C = [[200, 220], [500, 220], [800, 220]]; const R = 130;
  const G = [['lax', 140, [0.6, 0.6, 0.6]], ['adipos alb', 380, [0.95, 0.15, 0.15]], ['tendinos', 620, [0.2, 0.95, 0.15]], ['reticular', 860, [0.85, 0.4, 0.25]]];
  const COL = ['#9a84dc', '#f39cc3', '#bfe3ff'];
  return {
    home: HOME, cams: [cam(330, 300, 1.5), cam(500, 300, 1.5), cam(670, 300, 1.5), HOME],
    anchors: [[C[0][0] - 110, C[0][1] - 110], [C[1][0] - 110, C[1][1] - 110], [C[2][0] - 110, C[2][1] - 110], [40, 600]],
    labels: [lbl([200, 380], 'celule'), lbl([500, 380], 'fibre'), lbl([800, 380], 'substanță fundamentală'), ...G.map(([n, x]) => lbl([x, 520], n))],
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      fieldC(g, C[0][0], C[0][1], R, () => { g.fillStyle = HE.bg; g.fillRect(0, 0, W, H); fibroblast(g, 170, 180, 0.28, 0.3, t); plasmocyte(g, 250, 270, 0.5, 0.3, t); lymphocyte(g, 140, 280, 0.7, t); macrophage(g, 260, 150, 0.4, t, { inc: 3 }); });
      fieldC(g, C[1][0], C[1][1], R, () => { g.fillStyle = HE.bg; g.fillRect(0, 0, W, H); bundle(g, wavy(370, 170, 640, 200, 10, 2, 0, 12), 28, { n: 3 }); bundle(g, wavy(370, 250, 640, 280, 8, 2, 1, 12), 18, { n: 2 }); g.save(); g.strokeStyle = AG.fib; g.lineWidth = 4; g.beginPath(); g.moveTo(420, 320); g.lineTo(480, 300); g.lineTo(540, 330); g.moveTo(480, 300); g.lineTo(500, 250); g.stroke(); g.restore(); });
      fieldC(g, C[2][0], C[2][1], R, () => { g.fillStyle = '#eaf4ff'; g.fillRect(0, 0, W, H); srand(4); g.fillStyle = 'rgba(150,190,230,.5)'; for (let k = 0; k < 40; k++) { g.beginPath(); g.arc(rr(670, 930), rr(90, 350), rr(4, 10), 0, 7); g.fill(); } });
      for (let k = 0; k < 3; k++) if (b.i === k) glowRing(g, C[k][0], C[k][1], R + 12, R + 12, 0, ease(b.bt * 1.5));
      // proporțiile: 3 bare pe țesut (celule, fibre, SF)
      G.forEach(([n, x, v], gi) => {
        v.forEach((h, j) => { const bx = x - 81 + j * 56, hh = h * 250; g.save(); roundRect(g, bx, 860 - hh, 50, hh, 8); g.fillStyle = COL[j]; g.globalAlpha = gi === 3 && j === 1 ? 0.35 : 1; g.fill(); g.globalAlpha = 1; g.strokeStyle = OUT; g.lineWidth = 5; if (gi === 3 && j === 1) g.setLineDash([10, 8]); g.stroke(); g.restore(); });
        g.save(); g.fillStyle = '#f6eef7'; g.font = '700 20px Inter, sans-serif'; g.textAlign = 'center'; ['C', 'F', 'SF'].forEach((s, j) => g.fillText(s, x - 56 + j * 56, 896)); g.restore();
      });
      if (b.i === 3) glowRing(g, 500, 760, 470, 150, 0, ease(b.bt * 1.5));
    },
  };
}

/* =========================================================== 6 · NUCLEUL PALID / ÎNCHIS (animat) */
const mix = (a, b, u) => { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return `rgb(${A.map((x, i) => Math.round(lerp(x, B[i], u))).join(',')})`; };
function chrom() {
  let u = 0;
  return {
    home: HOME, cams: [cam(500, 320, 1.3), cam(500, 320, 1.3), cam(330, 700, 1.6), cam(680, 720, 1.35)],
    anchors: [[200, 190], [800, 190], [300, 600], [560, 610]],
    labels: [lbl([500, 470], 'fibroblast ↔ fibrocit', { beats: [-1] }), lbl([500, 470], 'fibroblast: nucleu mare, hipocrom', { beats: [0] }), lbl([500, 470], 'fibrocit: nucleu fusiform, hipercrom', { beats: [1] }),
      lbl([300, 850], 'plasmocit: spițe de roată', { beats: [2] }), lbl([700, 870], 'macrofage → celulă gigantă', { beats: [3] })],
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      const target = b.i < 0 ? 0.5 - 0.5 * Math.cos(t * Math.PI / 3) : b.i === 0 ? 0 : 1;
      u = b.i < 0 ? target : lerp(u, target, 0.06);
      const x = 500, y = 300, rot = -0.08;
      // corpul: fibroblast mare, stelat-fusiform → fibrocit subțire
      paint(g, spindle(x, y, lerp(600, 560, u), lerp(170, 52, u), rot, t, 2), mix('#cdbcf1', '#f6b6d2', u), mix('#a891e3', '#e48bb3', u), '#fff0f8', bb(x, y, 300, 85), OUT, 6);
      // nucleul: mare, ovalar, palid → fusiform, hipercrom (cromatina se condensează)
      paint(g, blob(x, y, lerp(95, 88, u), lerp(50, 17, u), rot, t, 0.03, 16, 3), mix('#ece6ff', '#2a1d78', u), mix('#d8cff8', '#160d4c', u), mix('#ffffff', '#5d50c4', u), bb(x, y, 95, 50), '#2a1534', 4);
      g.save(); g.globalAlpha = 1 - u; g.fillStyle = '#9d8fe6';
      for (let i = 0; i < 22; i++) { const a = i * 2.4, r = Math.sqrt((i % 9 + 1) / 10); g.beginPath(); g.arc(x + Math.cos(a) * 70 * r, y + Math.sin(a) * 34 * r, 4, 0, 7); g.fill(); }
      g.fillStyle = '#2a1670'; g.beginPath(); g.arc(x - 8, y + 2, 15, 0, 7); g.fill(); g.restore();
      g.save(); g.font = FONT(800, 24); g.textAlign = 'center'; g.fillStyle = mix('#bfb3ff', '#ff9fd0', u); g.fillText(u < 0.5 ? 'eucromatină: transcrie → palid' : 'heterocromatină: inactivă → închis', 500, 130); g.restore();
      ring(g, b, 0, x, y, 320, 120, rot); ring(g, b, 1, x, y, 300, 70, rot);
      plasmocyte(g, 300, 720, 1.3, 0.3, t);
      macrophage(g, 560, 720, 0.85, t, { seed: 4, inc: 5 }); macrophage(g, 600, 800, 0.6, t, { seed: 7, inc: 3 });
      arrow(g, 680, 740, 740, 740, '#ffe36e', 7); giant(g, 840, 730, 0.48, t);
      ring(g, b, 2, 300, 720, 110, 90); ring(g, b, 3, 700, 750, 215, 110);
    },
  };
}

/* =========================================================== 7–8 · CELE 3 FIBRE */
function fibers({ spec }) {
  const tab = !!(spec.sceneOpts && spec.sceneOpts.table);
  const C = [[180, 320], [500, 320], [820, 320]]; const R = 145;
  srand(9); const nodes = []; for (let k = 0; k < 60; k++) nodes.push([rr(340, 660), rr(160, 480)]); const NET = makeNet(nodes, 3, 70);
  const EL = []; srand(3); for (let k = 0; k < 7; k++) { const y0 = rr(200, 450); EL.push(wavy(660, y0, 980, y0 + rr(-60, 60), 8, 3, k, 18)); }
  const hiRow = (b) => (tab ? b.i : -1);
  return {
    home: HOME, cams: tab ? null : [cam(260, 380, 1.6), cam(500, 380, 1.6), cam(740, 380, 1.6), HOME],
    anchors: tab ? [] : [[C[0][0] - 105, C[0][1] - 120], [C[1][0] - 105, C[1][1] - 120], [C[2][0] - 105, C[2][1] - 120], [60, 640]],
    labels: [lbl([180, 512], 'colagen<br>van Gieson → roșu'), lbl([500, 512], 'reticulină<br>argentic → negru'), lbl([820, 512], 'elastice<br>nu se văd în HE'),
      lbl([280, 890], 'nu se ramifică'), lbl([720, 890], 'se ramifică + anastomozează')],
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      fieldC(g, C[0][0], C[0][1], R, () => { g.fillStyle = VG.bg; g.fillRect(0, 0, W, H); [[200, 34], [260, 54], [330, 24], [400, 44], [460, 30]].forEach(([y, w], k) => bundle(g, wavy(0, y, 380, y + 20, 14, 2, k, 14), w, { c: VG, n: 3 })); });
      fieldC(g, C[1][0], C[1][1], R, () => { g.fillStyle = AG.bg; g.fillRect(0, 0, W, H); drawNet(g, NET, AG.fib, 4.5); });
      fieldC(g, C[2][0], C[2][1], R, () => { g.fillStyle = '#f3dfe9'; g.fillRect(0, 0, W, H); g.save(); g.globalAlpha = 0.28; g.strokeStyle = '#c9a3b8'; g.lineWidth = 4; g.lineCap = 'round'; EL.forEach((p, k) => { g.beginPath(); p.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); const [mx, my] = p[8]; g.beginPath(); g.moveTo(mx, my); g.quadraticCurveTo(mx + 30, my + (k % 2 ? 30 : -30), mx + 70, my + (k % 2 ? 50 : -50)); g.stroke(); }); g.restore(); g.beginPath(); g.arc(C[2][0], C[2][1], R, 0, 7); });
      const r = hiRow(b);
      for (let k = 0; k < 3; k++) if (b.i === k || (tab && r >= 0 && r !== 3)) glowRing(g, C[k][0], C[k][1], R + 12, R + 12, 0, ease(b.bt * 1.5), k === 0 ? '#ff6b81' : '#ffe36e');
      // jos: criteriul decisiv (pe fond deschis, ca pe lamă)
      g.save(); roundRect(g, 90, 660, 380, 200, 22); g.fillStyle = VG.bg; g.fill(); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(); roundRect(g, 530, 660, 380, 200, 22); g.fillStyle = AG.bg; g.fill(); g.stroke(); g.restore();
      bundle(g, wavy(120, 760, 440, 770, 10, 1.5, 0, 14), 40, { c: VG, n: 4 });
      g.save(); g.strokeStyle = AG.fib; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(560, 800); g.lineTo(660, 760); g.lineTo(760, 800); g.lineTo(860, 740); g.moveTo(660, 760); g.lineTo(700, 690); g.lineTo(800, 700); g.moveTo(760, 800); g.lineTo(800, 700); g.stroke(); g.restore();
      if (b.i === 3) { glowRing(g, 280, 765, 200, 70, 0, ease(b.bt * 1.5), '#ff6b81'); glowRing(g, 720, 750, 200, 90, 0, ease(b.bt * 1.5)); }
    },
  };
}

/* =========================================================== DD: cele două lame, față în față */
function drawDD(g, t, b, k, p) {
  const a = ease(b.bt * 1.4);
  g.save(); g.globalAlpha = 0.9 * a; g.fillStyle = '#140a1a'; g.fillRect(-3000, -3000, 7000, 7000); g.restore();
  if (a < 0.02) return;
  g.save(); g.globalAlpha = a;
  const xl = lerp(120, 265, a), xr = lerp(880, 735, a);
  fieldThumb(g, k, xl, 460, 222); fieldThumb(g, p, xr, 460, 222);
  glowRing(g, xl, 460, 234, 234, 0, a); glowRing(g, xr, 460, 234, 234, 0, a, '#7fe8ff');
  g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.arc(500, 460, 44, 0, 7); g.fill(); g.stroke();
  g.fillStyle = OUT; g.font = FONT(800, 34); g.textAlign = 'center'; g.fillText('vs', 500, 472);
  const n = Math.min(4, Math.floor(b.bt * 1.1)); for (let i = 0; i < 4; i++) { const x = 560 + i * 80; g.fillStyle = i < n ? (i === 0 ? '#9dff8a' : '#ffe36e') : '#3a2e45'; g.beginPath(); g.arc(x, 860, 22, 0, 7); g.fill(); g.lineWidth = 5; g.stroke(); g.fillStyle = OUT; g.font = '800 22px Inter, sans-serif'; g.fillText(i === 0 ? '=' : String(i), x, 868); }
  g.restore();
}

/* =========================================================== SCENA UNEI LAME */
const CFG = {
  gr: () => ({
    cams: [HOME, cam(620, 380, 1.35), cam(360, 520, 1.9)],
    anchors: [[150, 110], [700, 200], [420, 548]],
    labels: [lbl([500, 890], 'celularitate abundentă + multe vase', { beats: [-1, 0] }), lbl([800, 330], 'vas cu hematii', { beats: [1] }), lbl([290, 405], 'fibroblast: nucleu palid', { beats: [2] }), lbl([430, 690], 'plasmocit', { beats: [2] })],
    ring: (g, b) => { ring(g, b, 1, 665, 370, 60, 150, 0.08); ring(g, b, 2, 300, 470, 75, 40, 0.25); ring(g, b, 2, 420, 610, 58, 48); },
  }),
  col: (F) => ({
    cams: [HOME, cam(500, 450, 1.15), cam(F.A.nuc[0], F.A.nuc[1], 2.4)],
    anchors: [[150, 90], [500, 250], [F.A.nuc[0], F.A.nuc[1] - 38]],
    labels: [lbl([500, 890], 'colagen roșu · nuclei negru-cafenii', { beats: [-1, 0] }), lbl([560, 410], 'fascicul grosier, sinuos', { beats: [1] }), lbl([800, 620], 'adipocite (reper)', { beats: [1] }), lbl([F.A.nuc[0], F.A.nuc[1] + 50], 'nucleu de fibrocit, turtit', { beats: [2] })],
    ring: (g, b) => { ring(g, b, 1, 500, 318, 420, 72, -0.03); ring(g, b, 1, F.A.fat[0], F.A.fat[1], 140, 85); ring(g, b, 2, F.A.nuc[0], F.A.nuc[1], 52, 20); },
  }),
  ret: (F) => ({
    cams: [HOME, cam(610, 470, 1.6), cam(F.A.mesh[0], F.A.mesh[1], 2.5)],
    anchors: [[150, 90], [610, 325], [F.A.mesh[0] - 40, F.A.mesh[1] - 60]],
    labels: [lbl([500, 890], 'rețea neagră pe fond gălbui', { beats: [-1, 0] }), lbl([610, 475], 'tub renal în ochi', { beats: [1] }), lbl([F.A.mesh[0], F.A.mesh[1] + 70], 'ramificare + anastomoze', { beats: [2] })],
    ring: (g, b) => { ring(g, b, 1, 610, 470, 136); ring(g, b, 2, F.A.mesh[0], F.A.mesh[1], 50); },
  }),
  lax: (F) => ({
    cams: [HOME, cam(770, 250, 1.6), cam(760, 260, 2.0)],
    anchors: [[150, 90], [770, 50], [F.A.lax[0] - 20, F.A.lax[1] - 40]],
    labels: [lbl([500, 520], 'conjunctiv dens, între lobuli', { beats: [-1, 0] }), lbl([770, 440], 'lobul: acini + lax palid', { beats: [1] }), lbl([F.A.lax[0], F.A.lax[1] + 52], 'fibroblast', { beats: [2] }), lbl([F.A.capT[0] - 20, F.A.capT[1] - 50], 'capilar transversal', { beats: [2] })],
    ring: (g, b) => { ring(g, b, 1, 770, 230, 205, 190); ring(g, b, 2, F.A.lax[0], F.A.lax[1], 60, 26, 0.5); ring(g, b, 2, F.A.capT[0], F.A.capT[1], 28); },
  }),
  adi: (F) => ({
    cams: [HOME, cam(500, 467, 1.15), cam(F.A.cell[0], F.A.cell[1], 2.2)],
    anchors: [[150, 70], [F.A.cap[0], F.A.cap[1] - 40], [F.A.nuc[0] + 30, F.A.nuc[1] - 40]],
    labels: [lbl([500, 40], 'fagure de celule optic goale', { beats: [-1, 0] }), lbl([F.A.cap[0], F.A.cap[1] + 40], 'capilar între celule', { beats: [1] }), lbl([F.A.cell[0], F.A.cell[1]], 'vacuolă goală', { beats: [2] }), lbl([F.A.nuc[0], F.A.nuc[1] + 36], 'nucleu turtit, excentric', { beats: [2] })],
    ring: (g, b) => { ring(g, b, 1, F.A.cap[0], F.A.cap[1], 30); ring(g, b, 2, F.A.nuc[0], F.A.nuc[1], 40, 22); },
  }),
  ten: (F) => ({
    cams: [HOME, cam(500, 467, 1.3), cam(F.A.twin[0], F.A.twin[1], 2.6)],
    anchors: [[150, 70], [F.A.slit[0], F.A.slit[1] - 44], [F.A.twin[0], F.A.twin[1] - 40]],
    labels: [lbl([500, 890], 'fascicule paralele, ușor ondulate', { beats: [-1, 0] }), lbl([F.A.slit[0], F.A.slit[1] + 44], 'fantă albă = artefact', { beats: [1] }), lbl([F.A.twin[0], F.A.twin[1] + 46], '„nuclei gemeni”', { beats: [2] })],
    ring: (g, b) => { ring(g, b, 1, F.A.slit[0], F.A.slit[1], 120, 24, 0.42); ring(g, b, 2, F.A.twin[0], F.A.twin[1], 66, 22, 0.42); },
  }),
  rt: (F) => ({
    cams: [HOME, cam(500, 467, 1.0), cam(500, 450, 2.0)],
    anchors: [[150, 70], [F.A.cord[0] - 120, F.A.cord[1] - 80], [F.A.rc[0], F.A.rc[1] - 90]],
    labels: [lbl([500, 40], 'medulara: ochiuri clare', { beats: [-1, 0] }), lbl([F.A.cord[0], F.A.cord[1] + 110], 'cordon dens de limfocite', { beats: [1] }), lbl([F.A.rc[0] + 20, F.A.rc[1] + 92], 'celulă reticulară stelată', { beats: [2] }), lbl([F.A.ly[0] + 20, F.A.ly[1] + 48], 'limfocit', { beats: [2] })],
    ring: (g, b) => { ring(g, b, 1, F.A.cord[0], F.A.cord[1], 220, 75, 0.12); ring(g, b, 2, F.A.rc[0], F.A.rc[1], 82); ring(g, b, 2, F.A.ly[0], F.A.ly[1], 32); },
  }),
};

function lama({ spec }) {
  const { k, dd } = spec.sceneOpts; const F = field(k); const C = CFG[k](F);
  const n = spec.points.length; const ddI = n - 1; let cur = -1; const OFF = [-9999, -9999];
  return {
    home: HOME, cams: [...C.cams.slice(0, ddI), HOME],
    anchors: [...C.anchors.slice(0, ddI).map((a) => () => (cur === ddI ? OFF : a)), () => (cur === ddI ? [500, 300] : OFF)],
    labels: [...C.labels, lbl([265, 222], 'lama ta: ' + SHORT[k], { beats: [ddI] }), lbl([735, 222], 'DD: ' + SHORT[dd], { beats: [ddI] })],
    phase: (i) => (i === ddI ? '1 asemănare + 3 diferențe' : ''),
    draw(g, t, b) {
      cur = b.i;
      F.draw(g, t, {});
      C.ring(g, b);
      if (b.i === ddI) drawDD(g, t, b, k, dd);
    },
  };
}

/* =========================================================== RECAPITULARE (tabel) */
function recap() {
  const pos = [[190, 130], [500, 130], [810, 130], [190, 420], [500, 420], [810, 420], [500, 705]]; const kk = ORDER.map(() => 0);
  return {
    home: HOME, cams: pos.map(([x, y]) => cam(lerp(500, x, 0.4), lerp(467, y, 0.4), 1.12)), anchors: [],
    labels: ORDER.map((k, i) => lbl([pos[i][0], pos[i][1] + 136], `${i + 1} · ${SHORT[k]}`)),
    draw(g, t, b) {
      bgFill(g, '#3a1d47', '#160b1d');
      pos.forEach(([x, y], i) => { kk[i] = lerp(kk[i], b.i === i ? 1 : 0, 0.08); const bob = b.i === i ? Math.sin(t * 2) * 3 : 0; fieldThumb(g, ORDER[i], x, y + bob, 112 + kk[i] * 8); if (kk[i] > 0.05) glowRing(g, x, y + bob, 128, 128, 0, kk[i]); });
      if (b.i < 0) { const i = ((Math.floor(t * 0.7) % 7) + 7) % 7; glowRing(g, pos[i][0], pos[i][1], 126, 126, 0, (t * 0.7) % 1); }
    },
  };
}

function fallback() { return { home: HOME, anchors: [], draw(g) { bgFill(g, '#2e1838', '#140a1a'); } }; }
void H;
export const SCENES = { atlas, mosaic, cover, ospe, tree, props, chrom, fibers, lama, recap, fallback };
