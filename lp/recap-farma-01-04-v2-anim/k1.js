// k1.js · scenele LP 1 (farmacocinetica 1): drumul medicamentului (voyage), trecerea prin membrană (membrane4),
// biodisponibilitatea desenată live (aucLive), proteinele de legare (bound), distribuția în cazuri (distrib).
import { K, W, H, HOME, OUT, T, sg, ln, pop, back, lp, pulse, mix, hash, clamp, lerp, ease, RED, bgK, glowAt, hud, tx, tw, chip, cap, capSeq, Path, mol, comet, stream, arrowK, crossK, tick, panel, ring, shape, ellK, rectK, plot, trace, hline, pt, lens, bilayer, chan, ion, meter, dial, blob, bb, paint } from './kino.js';
import { R, ROUTE, ORG, drawBody, heartK, kidneyK } from './body.js';

// bile emise pe rând de la capătul traseului; tau = secunde de la pornire (după primul tur, curg în buclă)
function flow(g, path, tau, col, o = {}) {
  if (tau <= 0) return; const n = o.n ?? 6, sp = o.speed ?? 0.25, r = o.r ?? 7; const a = o.alpha ?? 1; if (a <= 0.01) return;
  for (let k = 0; k < n; k++) { let u = tau * sp - k / n; if (u < 0) continue; if (o.once && u > 1) { if (o.hold) u = 1; else continue; } else u %= 1; const uu = lerp(o.u0 ?? 0, o.u1 ?? 1, u); const [x, y] = path.at(uu); const f = o.hold && u >= 1 ? 1 : Math.min(1, u * 10, (1 - u) * 10 + (o.keepEnd ? 1 : 0));
    mol(g, x + (o.jx ? (hash(k * 7 + 1) - 0.5) * o.jx : 0), y + (o.jy ? (hash(k * 13 + 2) - 0.5) * o.jy : 0), r, typeof col === 'function' ? col(uu, k) : col, { alpha: a * f, ow: o.ow ?? 2.4, glow: o.glow ?? 0.35 }); }
}
const tauOf = (tt, t0, t) => (tt >= 1e4 ? 100 + t : tt - t0);
const bateman = (x) => 1.36 * (Math.exp(-0.28 * x) - Math.exp(-1.4 * x)); // curba p.o. schematică (vârf ≈ 1 la x ≈ 1,45)

/* ================= 1. DRUMUL MEDICAMENTULUI ================= */
export function voyage() {
  const LX = 772, LY = 262, LR = 168;
  const lensSrc = [[300, 536], [506, 440], [248, 410], [400, 610]];
  // conținutul lupei pe fiecare etapă (coordonate locale, centrul lupei = 0,0)
  const villi = new Path([[-150, -62], [150, -62]], { raw: true });
  const inLens = [
    (g, t, tt) => { // enterocitele: lumen sus, sânge jos
      g.fillStyle = '#3b2231'; g.fillRect(-200, -200, 400, 150); tx(g, 'lumen', 0, -118, 17, K.dim, { w: 700 });
      for (let k = -3; k <= 3; k++) { const x = k * 58; rectK(g, x - 27, -52, 54, 112, K.cell, { r: 12, shade: K.cellS, ow: 4 }); g.strokeStyle = OUT; g.lineWidth = 3; g.lineCap = 'round'; for (let m = -3; m <= 3; m++) { g.beginPath(); g.moveTo(x + m * 7, -52); g.lineTo(x + m * 7, -64 - (RED ? 0 : Math.sin(t * 3 + m + k) * 1.5)); g.stroke(); } ellK(g, x, 34, 13, 15, '#8a63c9', { ow: 3 }); }
      g.fillStyle = K.bloodS; g.fillRect(-200, 78, 400, 130); g.fillStyle = K.blood; g.fillRect(-200, 86, 400, 110); stream(g, new Path([[-190, 120], [190, 122]], { raw: true }), t, K.bloodL, { n: 5, speed: 0.12, r: 11, rbc: true });
      tx(g, 'sânge → v. portă', 0, 138, 15, '#ffe1e6', { w: 700 });
      for (let k = 0; k < 3; k++) { const P = new Path([[-70 + k * 70, -110], [-64 + k * 70, -40], [-76 + k * 72, 40], [-40 + k * 70, 104], [40 + k * 60, 112]], { n: 8 }); flow(g, P, tauOf(tt, 0.3 + k * 0.5, t) , K.drug, { n: 3, speed: 0.22, r: 9 }); }
    },
    (g, t, tt) => { // capilarul și țesutul
      g.fillStyle = K.bloodS; g.fillRect(-200, -130, 400, 96); g.fillStyle = K.blood; g.fillRect(-200, -122, 400, 80); stream(g, new Path([[-190, -84], [190, -82]], { raw: true }), t, K.bloodL, { n: 5, speed: 0.14, r: 11, rbc: true });
      tx(g, 'capilar', 0, -146, 16, '#ffe1e6', { w: 800 });
      for (let k = -3; k <= 3; k++) rectK(g, k * 60 - 26, -42, 52, 16, '#f6c9cf', { r: 8, ow: 3 }); // endoteliul, cu spații între celule
      for (let r2 = 0; r2 < 3; r2++) { rectK(g, -190, 14 + r2 * 50, 380, 38, K.muscle, { r: 19, shade: K.muscleS, ow: 4 }); for (let m = 0; m < 3; m++) ellK(g, -120 + m * 120 + r2 * 20, 33 + r2 * 50, 13, 6, '#6b2a6e', { ow: 2 }); }
      tx(g, 'țesut', 60, 138, 16, '#ffe1e6', { w: 800 });
      for (let k = 0; k < 3; k++) { const P = new Path([[-190, -84], [-90 + k * 60, -84], [-60 + k * 60, -30], [-70 + k * 66, 20 + k * 30], [-40 + k * 60, 60 + k * 14]], { n: 8 }); flow(g, P, tauOf(tt, 0.3 + k * 0.4, t), K.drug, { n: 3, speed: 0.2, r: 9, keepEnd: true }); }
    },
    (g, t, tt) => { // hepatocitul cu enzima
      const cellP = new Path2D(); const pts = [[-140, -60], [-60, -128], [70, -122], [146, -40], [120, 80], [10, 132], [-110, 96]]; pts.forEach((p, k) => (k ? cellP.lineTo(p[0], p[1]) : cellP.moveTo(p[0], p[1]))); cellP.closePath();
      shape(g, cellP, '#c9806a', { shade: '#a95f4b', box: [-140, -128, 290, 260], ow: 6 }); ellK(g, -58, 54, 30, 26, '#7a4bb0', { ow: 4 }); tx(g, 'hepatocit', -20, 108, 16, '#ffe1d6', { w: 700 });
      const bite = 0.25 + 0.2 * pulse(t, 0.7); g.save(); g.translate(18, -6); g.fillStyle = '#ffd36e'; g.strokeStyle = OUT; g.lineWidth = 5; g.lineJoin = 'round'; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 40, Math.PI + bite, Math.PI - bite + Math.PI * 2); g.closePath(); g.fill(); g.stroke(); g.restore(); tx(g, 'enzimă', 26, 50, 16, '#ffe9b0', { w: 800 });
      const P = new Path([[-190, -20], [-110, -14], [-30, -6], [18, -6], [80, -30], [150, -70], [200, -90]], { n: 8 });
      flow(g, P, tauOf(tt, 0.3, t), (u) => (u < 0.5 ? K.drug : K.met), { n: 4, speed: 0.2, r: 10 });
      chip(g, -112, -52, 'medicament', { size: 13, fill: '#3a2410', line: K.drug, col: K.drug }); chip(g, 86, -84, 'metabolit', { size: 13, fill: '#10301e', line: K.met, col: K.met });
    },
    (g, t, tt) => { // glomerulul și tubul
      ellK(g, -70, -50, 76, 70, '#f3d9c0', { ow: 5, shade: '#dcb893' }); const gl = new Path([[-170, -118], [-110, -84], [-60, -96], [-34, -60], [-70, -34], [-104, -52], [-90, -16], [-52, -4], [-40, -40], [-150, -6], [-190, 14]], { n: 10 }); gl.stroke(g, 13, K.blood, { ow: 6 });
      tx(g, 'glomerul', -70, 44, 16, K.dim, { w: 700 });
      const tub = new Path([[-14, -30], [50, -50], [104, -20], [96, 40], [40, 60], [34, 104], [110, 124], [200, 120]], { n: 10 }); tub.stroke(g, 34, '#e9c9a0', { ow: 7 }); tub.stroke(g, 16, K.urine, { ow: 0, alpha: 0.9 });
      tx(g, 'tub → urină', 60, -104, 16, '#ffe9a8', { w: 700 });
      const P = new Path([[-170, -118], [-110, -84], [-60, -96], [-36, -60], [-14, -30], [50, -50], [104, -20], [96, 40], [40, 60], [34, 104], [110, 124], [200, 120]], { n: 8 });
      flow(g, P, tauOf(tt, 0.3, t), (u, k) => (k % 2 ? K.met : K.drug), { n: 5, speed: 0.16, r: 9 });
    },
  ];
  const caps = [
    [[0, 'pastila coboară pe esofag în stomac'], [2.3, 'se dizolvă: substanța e liberă'], [3.6, 'trece prin peretele intestinului în sânge'], [6.4, 'vena portă o duce întâi la ficat']],
    [[0, 'inima o pompează în tot corpul'], [2.6, 'iese din capilar și intră în țesuturi']],
    [[0, 'ficatul o transformă în metaboliți'], [2.8, 'portocaliu → verde: metabolitul pleacă spre excreție']],
    [[0, 'sângele o duce la rinichi'], [2.6, 'rinichiul o trece în urină → vezica se umple']],
    [[0, 'cei 5 parametri, fiecare la locul lui']],
  ];
  const phases = ['A · absorbția', 'D · distribuția', 'M · metabolizarea', 'E · excreția', 'parametrii'];
  return {
    home: HOME, beatDur: 9,
    anchors: [[300, 560], [532, 424], [220, 380], [430, 650], [640, 560]],
    phase: (i) => phases[i] || 'drumul medicamentului',
    draw(g, t, b) {
      const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3), t4 = T(b, 4); const intro = b.i < 0;
      const hl = { gut: sg(t0, 2.6, 0.8) * (b.i === 0 ? 1 : 0), stomach: (b.i === 0 ? 1 : 0) * sg(t0, 1.6, 0.6) * (1 - sg(t0, 4.2, 0.8)), portal: b.i === 0 ? sg(t0, 5.6, 0.6) : b.i === 2 ? 1 : 0, muscle: b.i === 1 ? sg(t1, 1.6, 0.8) : 0, heart: b.i === 1 ? 1 - sg(t1, 2.2, 0.8) : 0, liver: b.i === 2 ? 1 : b.i === 4 ? 0.5 : 0, kidney: b.i === 3 ? 1 : b.i === 4 ? 0.5 : 0, bladder: b.i === 3 ? sg(t3, 3.4, 0.8) : 0 };
      bgK(g, [[300, 420, 420, '#5b3c86', 0.2], [LX, LY, 300, '#ffa23e', b.i >= 0 && b.i < 4 ? 0.07 : 0]]);
      const bl = intro ? 0.55 : clamp(0.12 + 0.75 * sg(t3, 3.2, 5));
      drawBody(g, t, { hl, dim: b.i >= 0 && b.i < 4 ? 0.55 : 0, bladder: bl });
      // --- 1 · absorbția
      if (intro || t0 >= 0) {
        const pu = sg(t0, 0, 2.3); if (!intro && pu < 1) { const [x, y, an] = R.oral.at(pu); g.save(); g.translate(x, y); g.rotate(an); const p1 = new Path2D(); p1.roundRect(-20, -9, 40, 18, 9); shape(g, p1, '#fff6ea', { box: [-20, -9, 40, 18], ow: 4 }); const p2 = new Path2D(); p2.roundRect(-20, -9, 20, 18, [9, 0, 0, 9]); shape(g, p2, K.drug, { box: [-20, -9, 20, 18], ow: 4 }); g.restore(); }
        if (!intro && t0 >= 2.3 && t0 < 3.6) { const u = ln(t0, 2.3, 1.2); for (let k = 0; k < 9; k++) { const a = k * 0.7; mol(g, 384 + Math.cos(a) * 26 * u, 440 + Math.sin(a) * 20 * u, 7, K.drug, { alpha: Math.min(1, u * 3), glow: 0.5 }); } ring(g, 384, 440, 14 + 30 * u, K.drug, 1 - u, 4); }
        const tau = intro ? 100 + t : tauOf(t0, 3.4, t); const al = b.i === 0 || intro ? 1 : b.i === 4 ? 0.9 : 0.35;
        flow(g, ROUTE.absorb, tau, K.drug, { n: 7, speed: 0.17, r: 7, alpha: al });
        if (b.i !== 2) flow(g, ROUTE.toHeart, intro ? 100 + t : tauOf(t0, 7.2, t), K.drug, { n: 3, speed: 0.3, r: 6.5, alpha: al });
      }
      // --- 2 · distribuția
      if (intro || t1 >= 0) { const tau = intro ? 100 + t : tauOf(t1, 0.2, t); const al = b.i === 1 || intro ? 1 : b.i === 4 ? 0.9 : 0.35;
        flow(g, ROUTE.toArm, tau, K.drug, { n: 5, speed: 0.24, r: 7, alpha: al }); flow(g, ROUTE.toBrain, tau - 0.3, K.drug, { n: 3, speed: 0.3, r: 6, alpha: al });
        const nset = intro ? 6 : Math.floor(6 * sg(t1, 2.4, 3.5)); for (let k = 0; k < nset; k++) mol(g, 506 + (hash(k) - 0.5) * 24, 404 + k * 14, 5.5, K.drug, { alpha: al, ow: 2 }); }
      // --- 3 · metabolizarea
      if (intro || t2 >= 0) { const tau = intro ? 100 + t : tauOf(t2, 0.2, t); const al = b.i === 2 || intro ? 1 : b.i === 4 ? 0.9 : 0.35;
        const liv = new Path([[262, 440], [240, 428], [222, 410], [236, 392], [262, 392]], { n: 8 }); flow(g, liv, tau, (u) => (u < 0.55 ? K.drug : K.met), { n: 4, speed: 0.22, r: 7, alpha: al });
        flow(g, ROUTE.toHeart, tau - 1.6, K.met, { n: 3, speed: 0.3, r: 6.5, alpha: al, u0: 0.35 }); }
      // --- 4 · excreția
      if (intro || t3 >= 0) { const tau = intro ? 100 + t : tauOf(t3, 0.2, t); const al = b.i === 3 || intro ? 1 : b.i === 4 ? 0.9 : 0.35; const c = (u, k) => (k % 2 ? K.met : K.drug);
        flow(g, ROUTE.toKidL, tau, c, { n: 4, speed: 0.2, r: 6.5, alpha: al }); flow(g, ROUTE.toKidR, tau - 0.4, c, { n: 4, speed: 0.2, r: 6.5, alpha: al });
        flow(g, R.urL, tau - 3, c, { n: 3, speed: 0.3, r: 5, alpha: al }); flow(g, R.urR, tau - 3.3, c, { n: 3, speed: 0.3, r: 5, alpha: al }); }
      // --- lupa (pe etapele 1–4)
      if (b.i >= 0 && b.i < 4) { const tt = T(b, b.i); const [sx, sy] = lensSrc[b.i]; lens(g, LX, LY, LR, sx, sy, sg(tt, b.i === 0 ? 3.4 : 1.2, 0.7), (gg) => inLens[b.i](gg, t, tt - (b.i === 0 ? 3.4 : 1.2)), { title: ['în perete: enterocitele', 'în țesut: capilarul', 'în ficat: hepatocitul', 'în rinichi: nefronul'][b.i] }); }
      // --- curba Cp–timp, sincronă cu drumul
      const s = intro ? 1 : b.i === 0 ? 0.13 * sg(t0, 5.2, 4) : b.i === 1 ? 0.13 + 0.1 * sg(t1, 1, 5) : b.i === 2 ? 0.23 + 0.27 * sg(t2, 1, 5) : b.i === 3 ? 0.5 + 0.5 * sg(t3, 1, 6) : 1;
      const pa = intro ? 1 : b.i === 0 ? sg(t0, 4.6, 0.6) : 1;
      const pl = plot(g, { x: 672, y: 588, w: 262, h: 176, xmax: 12, ymax: 1.12, xl: 'timp', yl: 'Cp', alpha: pa, title: 'concentrația în sânge', ts: 17 });
      if (pa > 0) { trace(g, pl, bateman, 0, 12, s, K.drug, { fill: 'rgba(255,162,62,.2)', w: 6, alpha: pa });
        tx(g, 'absorbția', pl.X(1.9), pl.Y(0.2), 14, K.drug, { alpha: pa * (intro ? 1 : b.i === 0 ? sg(t0, 7.5, 0.6) : 1), align: 'left' });
        tx(g, 'eliminarea', pl.X(6.2), pl.Y(0.62), 14, K.met, { alpha: intro ? 1 : b.i === 3 ? sg(t3, 4, 0.6) : b.i > 3 ? 1 : 0 }); }
      // --- 5 · parametrii
      if (t4 >= 0 || intro) { const q = (k) => (intro ? 1 : pop(t4, 0.3 + k * 0.55)); const ch = (x, y, s2, c, k) => chip(g, x, y, s2, { size: 19, fill: '#241430', line: c, col: c, lw: 3.5, alpha: clamp(q(k)), scale: 0.6 + 0.4 * q(k), glow: b.i === 4 ? 0.5 : 0 });
        ch(128, 500, 'Bd (F)', K.drug, 0); ch(556, 372, 'Vd', K.gi, 1); ch(408, 300, 'Cp', K.bloodL, 2); ch(128, 430, 'Cl', K.met, 3); ch(120, 610, 'Cl', K.met, 3); ch(802, 500, 'T½ ← Cl, Vd', K.hi, 4);
        if (b.i === 4) panel(g, 612, 470, 360, 60, { fill: 'rgba(255,227,110,0)', line: 'rgba(255,227,110,0)' }); }
      // legendă + cheia culorilor
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i]); mol(g, 640, 838, 8, K.drug); tx(g, 'medicamentul', 656, 839, 15, K.dim, { align: 'left', w: 700 }); mol(g, 806, 838, 8, K.met); tx(g, 'metabolitul', 822, 839, 15, K.dim, { align: 'left', w: 700 }); g.restore();
    },
  };
}

/* ================= 2. TRECEREA PRIN MEMBRANĂ (4 feluri de transport + cele 3 condiții) ================= */
export function membrane4() {
  const MY = 470, LX = [140, 380, 620, 860];
  const names = ['difuziune pasivă', 'difuziune facilitată', 'transport activ', 'endocitoză'];
  const subs = ['direct prin membrană', 'printr-o proteină\nde transport', 'printr-o pompă\ndin membrană', 'membrana o înglobează\nîntr-o veziculă'];
  const laneP = LX.map((x) => new Path([[x, 250], [x, 400], [x, 540], [x + 10, 700]], { n: 6 }));
  const caps = [[[0, 'molecula mică și liposolubilă alunecă printre lipide']], [[0, 'proteina de transport o trece dincolo, tot pasiv']], [[0, 'pompa o împinge prin membrană, cu consum de energie']], [[0, 'membrana se înfundă în jurul moleculei mari'], [2.6, 'vezicula se desprinde și intră în celulă']], [[0, 'liposolubilă trece; hidrosolubila nu'], [3, 'neionizată trece; ionizată nu'], [6, 'liberă trece; legată de proteină e prea mare']]];
  const Y2 = 934, M2 = Y2 + 470, CX = [200, 500, 800];
  return {
    home: HOME, beatDur: 8, camSpeed: 2.4,
    cams: [cam2(250, 470, 1.5), cam2(400, 470, 1.5), cam2(600, 470, 1.5), cam2(750, 470, 1.5), cam2(500, Y2 + 440, 1)],
    anchors: [[LX[0], 250], [LX[1], 250], [LX[2], 250], [LX[3], 250], [64, Y2 + 150]],
    phase: (i) => (i < 0 ? 'cum trece membrana' : i < 4 ? names[i] : 'cele 3 condiții'),
    draw(g, t, b) {
      bgK(g, [[500, 300, 500, '#ffa23e', 0.07], [500, 700, 500, '#e5485d', 0.08], [500, M2 - 200, 500, '#ffa23e', 0.07], [500, M2 + 250, 500, '#e5485d', 0.08]]);
      const act = (k) => (b.i < 0 || b.i === 4 ? 1 : b.i === k ? 1 : 0.32);
      
      // moleculele care plutesc sus (multe) și jos (puține)
      for (let k = 0; k < 26; k++) { const x = 40 + hash(k) * 920, y = 150 + hash(k + 50) * 200; const ln3 = x > 520 && x < 720; if (ln3 && k % 3) continue; mol(g, x + Math.sin(t * 0.6 + k) * 10, y + Math.cos(t * 0.5 + k * 2) * 8, 9, K.drug, { alpha: 0.85 }); }
      for (let k = 0; k < 7; k++) mol(g, 60 + hash(k + 9) * 880 + Math.sin(t * 0.5 + k) * 10, 600 + hash(k + 70) * 170, 9, K.drug, { alpha: 0.8 });
      for (let k = 0; k < 9; k++) mol(g, 540 + hash(k + 20) * 160 + Math.sin(t * 0.5 + k) * 8, 700 + hash(k + 90) * 110, 9, K.drug, { alpha: 0.85 * act(2) }); // sub pompă: mai multe (împinge împotriva gradientului)
      bilayer(g, 10, 990, MY, t);
      // 1 · pasivă
      { const a = act(0); glowAt(g, LX[0], MY, 150, '#ffa23e', b.i === 0 ? 0.22 : 0); stream(g, laneP[0], t, K.drug, { n: 4, speed: 0.22, r: 10, alpha: a }); }
      // 2 · facilitată: proteina de transport se leagănă
      { const a = act(1); glowAt(g, LX[1], MY, 150, '#5aa8ff', b.i === 1 ? 0.25 : 0); const rock = RED ? 0 : Math.sin(t * 2.2) * 0.16; g.save(); g.translate(LX[1], MY); g.globalAlpha = a; for (const d of [-1, 1]) { g.save(); g.rotate(rock * d); const p = new Path2D(); p.roundRect(d > 0 ? 8 : -34, -52, 26, 104, 13); shape(g, p, K.gi, { shade: '#2f7bd4', box: [-34, -52, 68, 104], ow: 5 }); g.restore(); } g.restore(); stream(g, laneP[1], t, K.drug, { n: 3, speed: 0.2, r: 10, alpha: a }); }
      // 3 · activă: pompa cu ATP
      { const a = act(2); glowAt(g, LX[2], MY, 150, '#ffe36e', b.i === 2 ? 0.25 : 0); const cyc = lp(t, 1.6); const sq = 1 + 0.07 * Math.sin(cyc * Math.PI * 2); g.save(); g.globalAlpha = a; const p = new Path2D(); p.roundRect(LX[2] - 40 * sq, MY - 58, 80 * sq, 116, 22); shape(g, p, '#b58cff', { shade: '#8a5fd6', box: [LX[2] - 40, MY - 58, 80, 116], ow: 5 }); g.fillStyle = OUT; g.beginPath(); g.ellipse(LX[2], MY, 9, 44, 0, 0, 7); g.fill(); g.restore();
        stream(g, laneP[2], t, K.drug, { n: 3, speed: 0.625, r: 10, alpha: a }); const fl = Math.max(0, 1 - cyc * 2.2); chip(g, LX[2] + 78, MY + 66, 'ATP', { size: 16, fill: K.hi, col: '#20102a', line: OUT, alpha: a, glow: fl, scale: 1 + fl * 0.25 }); arrowK(g, [[LX[2] + 78, MY + 46], [LX[2] + 64, MY + 20], [LX[2] + 44, MY + 6]], K.hi, 4, 1, { alpha: a * 0.9, head: 9 }); }
      // 4 · endocitoză: groapa → veziculă (în buclă)
      { const a = act(3); glowAt(g, LX[3], MY, 150, '#ff8fa0', b.i === 3 ? 0.22 : 0); const tt = T(b, 3); const c = b.i === 3 && tt < 5.6 ? tt / 5.6 : lp(t, 5.6); const yb = lerp(330, MY - 6, ease(clamp(c / 0.38))); const pit = ease(clamp((c - 0.3) / 0.25)); const ves = ease(clamp((c - 0.55) / 0.4)); const vy = lerp(MY + 2, 690, ves);
        g.save(); g.globalAlpha = a; if (c > 0.3) { const full = c >= 0.55; g.strokeStyle = OUT; g.lineWidth = 15; g.beginPath(); g.arc(LX[3], full ? vy : MY + 4, 36, full ? 0 : Math.PI / 2 - Math.PI * pit * 0.94, full ? 7 : Math.PI / 2 + Math.PI * pit * 0.94); g.stroke(); g.strokeStyle = K.mem; g.lineWidth = 9; g.stroke(); } g.restore();
        const by = c < 0.55 ? Math.min(yb, MY + 4) : vy; ellK(g, LX[3], by, 22, 19, '#ff9fb0', { ow: 4, alpha: a, shade: '#d96f86' }); }
      LX.forEach((x, k) => { chip(g, x, 572, names[k], { size: 17, alpha: act(k), fill: b.i === k ? '#3a2a12' : 'rgba(20,12,28,.86)', line: b.i === k ? K.hi : 'rgba(255,255,255,.22)', col: b.i === k ? K.hi : K.ink }); tx(g, subs[k], x, 646, 15, K.dim, { w: 600, alpha: act(k) * (b.i === k || b.i < 0 ? 1 : 0.7) }); });
      // ----- ecranul 2: cele 3 condiții -----
      tx(g, 'ca să treacă membrana, molecula trebuie să fie:', 500, Y2 + 76, 21, K.ink, { w: 800 });
      bilayer(g, 10, 990, M2, t); tx(g, 'sânge', 900, M2 + 250, 22, '#ffb3be', { w: 800 });
      const t4 = b.i === 4 ? T(b, 4) : b.i < 0 ? -1 : -1; const tests = [['liposolubilă', 'hidrosolubilă', 'coeficientul octanol/apă'], ['neionizată', 'ionizată', 'pH-ul mediului, pKa'], ['nelegată', 'legată de proteine', 'mărimea moleculei']];
      CX.forEach((cx, k) => { const tk = t4 < 0 ? -1 : t4 - k * 3; const cyc = tk < 0 ? 0 : tk > 3 ? lp(t + k, 3.2) : tk / 3; const on = t4 >= k * 3 || b.i !== 4;
        chip(g, cx, Y2 + 150, tests[k][0], { size: 20, fill: '#10301e', line: K.ok, col: K.ok, alpha: on ? 1 : 0.35, lw: 3 }); tx(g, tests[k][2], cx, Y2 + 190, 15, K.dim, { w: 600, alpha: on ? 1 : 0.35 });
        // cea bună trece (stânga), cea rea se oprește (dreapta)
        const yg = lerp(Y2 + 270, M2 + 150, ease(clamp(cyc / 0.8))); const yb = lerp(Y2 + 270, M2 - 66, ease(clamp(cyc / 0.4))) - (cyc > 0.4 ? Math.sin(clamp((cyc - 0.4) / 0.3) * Math.PI) * 46 : 0);
        const al = on ? 1 : 0.3; mol(g, cx - 66, yg, 20, K.drug, { alpha: al, glow: 0.5 }); if (cyc > 0.75 || tk > 3) tick(g, cx - 66, M2 + 206, 17, on ? 1 : 0);
        if (k === 0) { mol(g, cx + 56, yb, 20, '#7fc8ff', { alpha: al }); g.save(); g.globalAlpha = al * 0.9; g.strokeStyle = '#bfe6ff'; g.lineWidth = 3; for (let m = 0; m < 5; m++) { const a = m * 1.26 + t; g.beginPath(); g.arc(cx + 56 + Math.cos(a) * 31, yb + Math.sin(a) * 31, 6, 0, 7); g.stroke(); } g.restore(); }
        if (k === 1) mol(g, cx + 56, yb, 20, '#7fc8ff', { alpha: al, s: '−', fs: 30 });
        if (k === 2) { ellK(g, cx + 66, yb - 18, 56, 38, K.prot, { ow: 4, alpha: al, shade: K.protS }); tx(g, 'proteină', cx + 66, yb - 20, 15, '#20304a', { stroke: false, alpha: al }); mol(g, cx + 30, yb + 14, 17, K.drug, { alpha: al }); }
        if (cyc > 0.42 || tk > 3) crossK(g, cx + 56, M2 - 4, 17, on ? clamp((cyc - 0.42) * 6 + (tk > 3 ? 1 : 0)) : 0);
        tx(g, tests[k][1], cx + 62, M2 + 66, 17, K.warn, { w: 700, alpha: on ? 0.95 : 0.3 }); });
      hud(g); if (b.i !== 4) { tx(g, 'sus: locul de administrare (multă substanță)', 500, 84, 18, K.dim, { w: 700 }); tx(g, 'jos: sângele', 500, 828, 19, '#ffb3be', { w: 800 }); } if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i]); g.restore();
    },
  };
}
function cam2(x, y, z) { return { x, y, z }; }

/* ================= 3. BIODISPONIBILITATEA (curbe desenate live + primul pasaj) ================= */
export function aucLive() {
  const ke = 0.32, ka = 1.25, F = 0.6;
  const fiv = (x) => Math.exp(-ke * x), fpo = (x) => F * (ka / (ka - ke)) * (Math.exp(-ke * x) - Math.exp(-ka * x)), fref = (x) => 0.82 * (1.5 / (1.5 - ke)) * (Math.exp(-ke * x) - Math.exp(-1.5 * x));
  const rowIV = new Path([[150, 118], [420, 118], [690, 118], [820, 118]], { raw: true }), rowPO = new Path([[150, 232], [300, 232], [400, 232], [520, 232], [690, 232], [820, 232]], { raw: true });
  const caps = [[[0, 'i.v.: toată doza ajunge direct în circulație'], [3.2, 'p.o.: o parte se pierde la primul pasaj prin ficat'], [7, 'Bd = cât ajunge în circulația sistemică, neschimbat și activ']], [[0, 'curba i.v.: pornește de sus și scade'], [3, 'curba p.o.: urcă, face vârf, scade'], [6.4, 'raportul ariilor de sub curbe = Bd absolută']], [[0, 'același drum p.o., două produse: testat și de referință'], [4.2, 'raportul ariilor lor = Bd relativă']]];
  function swatch(g, x, y, col, lab, a) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.beginPath(); g.moveTo(x - 34, y + 16); g.quadraticCurveTo(x - 20, y - 26, x - 6, y - 14); g.quadraticCurveTo(x + 12, y + 6, x + 34, y + 16); g.closePath(); g.fillStyle = col + '55'; g.fill(); g.strokeStyle = col; g.lineWidth = 3.5; g.lineJoin = 'round'; g.stroke(); g.restore(); tx(g, lab, x + 44, y, 20, col, { align: 'left', alpha: a }); }
  return {
    home: HOME, beatDur: 10, anchors: [[60, 176], [70, 752], [70, 846]],
    phase: (i) => ['primul pasaj hepatic', 'Bd absolută', 'Bd relativă'][i] || 'biodisponibilitatea',
    draw(g, t, b) {
      const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), intro = b.i < 0;
      bgK(g, [[500, 480, 520, '#5c8dff', 0.08], [420, 232, 200, '#b0503c', 0.14]]);
      // --- cele două căi (sus)
      const pa = b.i === 0 || intro ? 1 : 0.5; panel(g, 30, 64, 940, 222, { alpha: pa, glow: b.i === 0 ? 0.25 : 0, gc: K.hi });
      tx(g, 'i.v.', 82, 118, 24, K.vein, { alpha: pa }); tx(g, 'p.o.', 82, 232, 24, K.drug, { alpha: pa });
      rowIV.stroke(g, 16, K.blood, { ow: 6, alpha: pa * 0.9 }); rowPO.stroke(g, 16, K.blood, { ow: 6, alpha: pa * 0.9, u0: 0.38 }); new Path([[150, 232], [300, 232], [400, 232]], { raw: true }).stroke(g, 20, K.gut, { ow: 6, alpha: pa });
      // seringa, pastila, ficatul, rezervoarele
      g.save(); g.globalAlpha = pa; rectK(g, 116, 104, 50, 28, '#dff1ff', { r: 6, ow: 4 }); g.fillStyle = K.vein; g.fillRect(122, 110, 26, 16); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(166, 118); g.lineTo(186, 118); g.moveTo(104, 104); g.lineTo(104, 132); g.moveTo(104, 118); g.lineTo(116, 118); g.stroke();
      rectK(g, 120, 220, 44, 24, '#fff6ea', { r: 12, ow: 4 }); rectK(g, 120, 220, 22, 24, K.drug, { r: 12, ow: 4 }); g.restore();
      tx(g, 'intestin', 300, 264, 14, K.dim, { w: 700, alpha: pa }); tx(g, 'v. portă', 440, 206, 14, K.dim, { w: 700, alpha: pa });
      { const p = new Path2D(); p.moveTo(486, 220); p.bezierCurveTo(500, 190, 580, 186, 618, 204); p.bezierCurveTo(636, 214, 630, 240, 606, 252); p.bezierCurveTo(566, 272, 510, 276, 492, 262); p.bezierCurveTo(478, 250, 478, 234, 486, 220); p.closePath(); shape(g, p, K.liver, { shade: K.liverS, light: '#ffffff', box: [478, 186, 156, 90], ow: 5, alpha: pa, glow: b.i === 0 ? sg(t0, 4.6, 0.6) * (1 - sg(t0, 7.5, 1)) : 0, gc: K.hi }); tx(g, 'ficat', 556, 230, 16, '#ffe1d6', { alpha: pa, w: 800 }); }
      // bilele: i.v. 10 din 10; p.o. 6 din 10 (4 devin metaboliți în ficat)
      const NB = 10; const ivN = intro ? NB : Math.round(NB * 1); let arrIV = 0, arrPO = 0;
      for (let k = 0; k < NB; k++) { const u = intro ? 1 : ln(t0, 0.3 + k * 0.16, 1.6); if (u >= 1) arrIV++; else if (u > 0) { const [x, y] = rowIV.at(ease(u)); mol(g, x, y, 8, K.drug, { glow: 0.5, alpha: pa }); } }
      for (let k = 0; k < NB; k++) { const u = intro ? 1 : ln(t0, 3.2 + k * 0.2, 3); const lost = k % 5 === 1 || k % 5 === 3; if (u <= 0) continue; if (lost) { const uu = Math.min(u, 0.6); const [x, y] = rowPO.at(ease(uu / 0.6) * 0.52); const d = clamp((u - 0.5) / 0.3); if (u < 1 || true) mol(g, x + (u > 0.6 ? (hash(k) - 0.5) * 60 : 0), y + (u > 0.6 ? (hash(k + 5) - 0.3) * 22 : 0), 8 - d * 2, mix(K.drug, '#8f8698', d), { alpha: pa * (1 - d * 0.45), ow: 2 }); } else if (u >= 1) arrPO++; else { const [x, y] = rowPO.at(ease(u)); mol(g, x, y, 8, K.drug, { glow: 0.5, alpha: pa }); } }
      for (const [y, n, c, lab] of [[118, arrIV, K.vein, '100%'], [232, arrPO, K.drug, 'mai puțin']]) { rectK(g, 822, y - 42, 122, 84, '#2a1c36', { r: 14, ow: 5, alpha: pa }); for (let k = 0; k < n; k++) mol(g, 842 + (k % 5) * 20.5, y + 22 - Math.floor(k / 5) * 22, 8, K.drug, { alpha: pa, ow: 2 }); tx(g, lab, 883, y - 26, 15, c, { alpha: pa * (n >= (y < 200 ? 10 : 6) ? 1 : 0), w: 800 }); }
      tx(g, 'circulația sistemică', 883, 178, 14, K.dim, { w: 700, alpha: pa });
      tx(g, 'primul pasaj', 556, 296, 15, K.hi, { alpha: pa * (intro ? 1 : sg(t0, 5, 0.6)) });
      // --- graficul
      const ga = intro ? 1 : b.i === 0 ? sg(t0, 7.6, 0.8) * 0.6 : 1;
      const pl = plot(g, { x: 150, y: 340, w: 720, h: 248, xmax: 12, ymax: 1.08, xl: 'timp', yl: 'concentrația plasmatică (Cp)', alpha: ga });
      const ivA = b.i === 2 ? 1 - sg(t2, 0, 0.8) : 1; const u1 = intro || b.i > 1 ? 1 : sg(t1, 0.2, 2.6), u2 = intro || b.i > 1 ? 1 : sg(t1, 3.2, 3);
      if (b.i >= 1 || intro) { trace(g, pl, fiv, 0, 12, u1, K.vein, { fill: 'rgba(92,141,255,.16)', alpha: ivA * (intro && false ? 0 : 1) }); if (u1 >= 1) tx(g, 'i.v. (referința = 100%)', pl.X(1.5), pl.Y(0.86), 17, K.vein, { align: 'left', alpha: ivA });
        trace(g, pl, fpo, 0, 12, u2, K.drug, { fill: 'rgba(255,162,62,.3)' }); if (u2 >= 1) tx(g, b.i === 2 ? 'testat' : 'p.o.', pl.X(3.2), pl.Y(0.5), 17, K.drug, { align: 'left' }); if (u2 >= 1) tx(g, b.i === 2 ? 'AUC testat' : 'AUC p.o.', pl.X(3), pl.Y(0.13), 16, '#ffd9a8', { w: 700 }); }
      if (b.i === 2) { const u3 = sg(t2, 1, 3); trace(g, pl, fref, 0, 12, u3, '#e9e2f2', { fill: 'rgba(233,226,242,.12)' }); if (u3 >= 1) tx(g, 'referință', pl.X(1.3), pl.Y(0.72), 17, '#e9e2f2', { align: 'left' }); }
      // --- formulele (jos)
      const fr = (y, name, top, bot, ct, cb, a, hl2) => { if (a <= 0.01) return; panel(g, 110, y - 44, 780, 88, { alpha: a, glow: hl2 ? 0.3 : 0, gc: K.hi, line: hl2 ? K.hi : undefined }); tx(g, name + ' =', 240, y, 23, K.ink, { alpha: a }); swatch(g, 380, y - 20, ct, top, a); swatch(g, 380, y + 22, cb, bot, a); g.save(); g.globalAlpha = a; g.strokeStyle = K.ink; g.lineWidth = 3; g.beginPath(); g.moveTo(336, y + 1); g.lineTo(640, y + 1); g.stroke(); g.restore(); tx(g, '× 100', 730, y, 23, K.ink, { alpha: a }); };
      fr(752, 'Bd abs', 'AUC p.o.', 'AUC i.v.', K.drug, K.vein, intro ? 1 : b.i === 1 ? sg(t1, 6.4, 0.7) : b.i > 1 ? 0.55 : 0, b.i === 1);
      fr(846, 'Bd r', 'AUC testat', 'AUC referință', K.drug, '#e9e2f2', intro ? 1 : b.i === 2 ? sg(t2, 4.2, 0.7) : 0, b.i === 2);
      hud(g); if (b.i >= 0 && b.i < 2) capSeq(g, T(b, b.i), caps[b.i], { y: 676 }); if (b.i === 2) capSeq(g, t2, caps[2], { y: 676 }); g.restore();
    },
  };
}

/* ================= 4. PROTEINELE DE LEGARE (doar fracția liberă are efect) ================= */
export function bound() {
  // 6 poziții de proteine în vas; câte sunt prezente în fiecare stare: normal 4 · scăzute 1 · crescute 6
  const PP = [[190, 250, 'albumină'], [470, 300, 'SHBG'], [330, 400, 'TBG'], [640, 230, 'albumină'], [760, 390, 'SHBG'], [560, 420, 'TBG']];
  const vis = [[1, 1, 1, 1, 0, 0], [1, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1]];
  const ND = 14; const slots = [[-40, -30], [42, -26], [0, 38]];
  const freeP = (j, t) => [110 + hash(j * 3 + 1) * 720 + Math.sin(t * 0.7 + j) * 14, 210 + hash(j * 5 + 2) * 250 + Math.cos(t * 0.6 + j * 2) * 12];
  // ținta bilei j în starea s: legată de proteina p (dacă proteina există și are loc), altfel liberă
  const target = (j, s, t) => { let n = 0; for (let p = 0; p < 6; p++) { if (!vis[s][p]) continue; for (let q = 0; q < 3; q++) { if (n === j) return [PP[p][0] + slots[q][0], PP[p][1] + slots[q][1], 1]; n++; } } return [...freeP(j, t), 0]; };
  const REC = [200, 380, 560, 740];
  const caps = [[[0, 'legat de proteină: prea mare, rămâne în vas'], [3, 'doar bila liberă iese din vas și ajunge la receptor']], [[0, 'proteine puține → bilele rămân libere'], [3, 'fracția liberă crește → efectul crește']], [[0, 'ficatul produce mai puține · rinichiul le pierde · androgenii scad SHBG']], [[0, 'proteine multe → prind bilele libere'], [3, 'fracția liberă scade → efectul scade']]];
  return {
    home: HOME, beatDur: 8, anchors: [[60, 200], [912, 330], [60, 590], [912, 520]],
    phase: (i) => ['normal', 'proteine ↓', 'cauzele scăderii', 'proteine ↑'][i] || 'fracția liberă',
    draw(g, t, b) {
      const st = b.i <= 0 ? 0 : b.i < 3 ? 1 : 2, prev = b.i <= 0 ? 0 : b.i === 1 ? 0 : b.i === 2 ? 1 : 1; const tt = b.i < 0 ? 1e4 : b.bt; const u = b.i === 2 || b.i <= 0 ? 1 : sg(tt, 0.4, 2.2);
      bgK(g, [[480, 330, 520, '#e5485d', 0.1], [480, 720, 420, '#ffa23e', 0.06]]);
      // vasul
      rectK(g, -40, 170, 1080, 330, '#3a1622', { r: 0, ow: 0 }); g.fillStyle = '#4a1a2a'; g.fillRect(-40, 182, 1080, 306);
      stream(g, new Path([[-20, 215], [1020, 222]], { raw: true }), t, K.bloodL, { n: 5, speed: 0.05, r: 15, rbc: true, alpha: 0.35 }); stream(g, new Path([[-20, 452], [1020, 446]], { raw: true }), t + 7, K.bloodL, { n: 5, speed: 0.045, r: 15, rbc: true, alpha: 0.35 });
      // peretele capilarului (celule cu spații)
      for (let k = 0; k < 8; k++) rectK(g, -30 + k * 132, 488, 112, 26, '#f6c9cf', { r: 13, ow: 4 });
      for (let k = 0; k < 8; k++) rectK(g, -30 + k * 132, 150, 112, 26, '#f6c9cf', { r: 13, ow: 4 });
      tx(g, 'sânge', 60, 462, 18, '#ffb3be', { w: 800 }); tx(g, 'țesut', 60, 560, 18, K.dim, { w: 800 });
      // proteinele
      PP.forEach(([x, y, name], p) => { const a = lerp(vis[prev][p], vis[st][p], u); if (a <= 0.01) return; const s = 0.6 + 0.4 * back(a); const col = name === 'albumină' ? K.prot : name === 'SHBG' ? '#c9b8ff' : '#ffc7e3'; shape(g, blob(x, y, 66 * s, 50 * s, 0, t * 0.3, 0.06, 12, p + 1), col, { shade: mix(col, '#000000', 0.22), light: '#ffffff', box: bb(x, y, 66 * s, 50 * s), ow: 5, alpha: a }); tx(g, name, x, y - 2, 17, '#20304a', { stroke: false, alpha: a }); });
      // bilele
      let nfree = 0; for (let j = 0; j < ND; j++) { const A = target(j, prev, t), B = target(j, st, t); const x = lerp(A[0], B[0], u), y = lerp(A[1], B[1], u); const bnd = lerp(A[2], B[2], u); nfree += 1 - bnd; mol(g, x, y, 12, K.drug, { glow: (1 - bnd) * 0.7, ow: 2.6 }); }
      const ff = nfree / ND;
      // bilele libere coboară la receptori
      const nfl = Math.round(ff * 9); REC.forEach((x, k) => { const P = new Path([[x + 40, 420], [x + 36, 500], [x + 10, 600], [x, 668]], { n: 8 }); stream(g, P, t + k * 1.3, K.drug, { n: nfl === 0 ? 0 : k < nfl / 2 ? 2 : nfl > 6 ? 2 : k === 0 ? 1 : 0, speed: 0.16, r: 10, glow: 0.5 }); });
      // celula-țintă cu receptori
      rectK(g, 80, 700, 800, 150, '#3b2a4d', { r: 30, ow: 6, oc: '#6b5590' }); bilayer(g, 96, 864, 704, t, { h: 44, step: 16 });
      REC.forEach((x) => { const p = new Path2D(); p.moveTo(x - 26, 664); p.lineTo(x - 14, 700); p.lineTo(x - 14, 728); p.lineTo(x + 14, 728); p.lineTo(x + 14, 700); p.lineTo(x + 26, 664); p.lineTo(x + 12, 664); p.lineTo(x, 688); p.lineTo(x - 12, 664); p.closePath(); shape(g, p, K.gs, { box: [x - 26, 664, 52, 64], ow: 4, glow: ff * 1.1, gc: K.hi }); });
      tx(g, 'celula-țintă: receptorii', 480, 800, 18, K.dim, { w: 700 });
      // indicatorul fracției libere + efectul
      meter(g, 916, 600, 34, 200, 0.1 + ff * 0.9, K.drug, 'fracția\nliberă', { size: 15 }); tx(g, ff > 0.5 ? 'efect ↑' : ff < 0.1 ? 'efect ↓' : 'efect', 933, 576, 17, K.hi, {});
      // cauzele (punctul 3) și estrogenii (punctul 4)
      if (b.i === 2 || b.i < 0) { const q = (k) => (b.i < 0 ? 1 : pop(tt, 0.3 + k * 0.9)); [['ficat: ciroză, insuficiență hepatică', K.liver], ['cașexie: aport scăzut', '#b9a48a'], ['rinichi: boala cronică renală', K.kidney], ['androgenii: scad SHBG', '#c9b8ff']].forEach(([s, c], k) => chip(g, 300 + (k % 2) * 400, 546 + Math.floor(k / 2) * 50, s, { size: 16, fill: '#221528', line: c, col: '#fff3e6', lw: 3, alpha: clamp(q(k)) * (b.i < 0 ? 0 : 1), scale: 0.7 + 0.3 * q(k) })); }
      if (b.i === 3) chip(g, 480, 566, 'estrogenii: cresc SHBG și TBG', { size: 17, fill: '#221528', line: '#ffc7e3', col: '#fff3e6', lw: 3, alpha: pop(tt, 0.6) });
      hud(g); if (b.i >= 0) capSeq(g, tt, caps[b.i]); g.restore();
    },
  };
}

/* ================= 5. DISTRIBUȚIA ÎN CAZURI: Vd (A și B), țesutul adipos, dislocarea de pe proteine ================= */
export function distrib() {
  const X2 = 1000, X3 = 2000;
  const caps = [[[0, '100 mg i.v. · substanța A rămâne în sânge'], [3.4, 'proba de sânge: 20 mg/L → Vd = 100 : 20 = 5 L']], [[0, '100 mg i.v. · substanța B pleacă în țesuturi'], [3.6, 'în sânge rămâne puțin: 1 mg/L → Vd = 100 : 1 = 100 L']], [[0, 'lipofilul intră în țesutul adipos: în sânge rămâne puțin'], [3.4, 'efect mic → doze tot mai mari'], [6, 'slăbire bruscă: grăsimea îl dă înapoi în sânge'], [8.6, 'concentrația sare peste pragul toxic: supradozaj']], [[0, 'G circulă legat de proteine; doar puțin e liber'], [2.6, 'X are și el afinitate: îl dă jos pe G'], [5.6, 'G liber crește → mai multă insulină → hipoglicemie']]];
  // un „pacient” ca două compartimente: sângele (mic) și țesuturile (mare)
  function tank(g, t, y, col, name, uIn, uOut, a, conc, vd, uF) {
    panel(g, 40, y, 920, 330, { alpha: a, glow: a > 0.9 ? 0.2 : 0, gc: col });
    tx(g, name, 120, y + 40, 24, col, { alpha: a });
    rectK(g, 80, y + 74, 250, 150, '#4a1a2a', { r: 18, ow: 5, alpha: a }); tx(g, 'sânge', 205, y + 244, 17, '#ffb3be', { alpha: a, w: 800 });
    rectK(g, 372, y + 74, 380, 150, '#5a3340', { r: 18, ow: 5, alpha: a }); tx(g, 'țesuturi', 562, y + 244, 17, K.dim, { alpha: a, w: 800 });
    g.save(); g.globalAlpha = a * 0.5; g.fillStyle = K.muscle; for (let k = 0; k < 3; k++) { g.beginPath(); g.roundRect(388, y + 90 + k * 44, 348, 30, 15); g.fill(); } g.restore();
    // seringa
    const sy = y + 40; rectK(g, 232, sy - 12, 60, 24, '#dff1ff', { r: 6, ow: 4, alpha: a }); g.save(); g.globalAlpha = a; g.fillStyle = col; g.fillRect(238, sy - 7, 46 * (1 - uIn), 14); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(262, sy + 12); g.lineTo(262, y + 74); g.stroke(); g.restore(); tx(g, '100 mg', 340, sy, 17, K.ink, { alpha: a, align: 'left' });
    // cele 10 bile: intră în sânge; o parte (uOut) trece în țesuturi
    for (let k = 0; k < 10; k++) { const ui = clamp(uIn * 1.6 - k * 0.06); if (ui <= 0) continue; const bx = 110 + (k % 5) * 46 + Math.sin(t * 0.8 + k) * 6, by = y + 118 + Math.floor(k / 5) * 60 + Math.cos(t * 0.7 + k) * 5; const goes = uOut > 0 && k !== 4; const uo = goes ? clamp(uOut * 1.5 - k * 0.05) : 0; const tx2 = 410 + (k % 5) * 70 + Math.sin(t * 0.5 + k) * 5, ty = y + 106 + (k % 3) * 44; const x = lerp(lerp(262, bx, ease(ui)), tx2, ease(uo)), yy = lerp(lerp(y + 80, by, ease(ui)), ty, ease(uo)); mol(g, x, yy, 12, col, { alpha: a, glow: 0.4 }); }
    // eprubeta + formula
    const tu = clamp(uF); if (tu > 0) { rectK(g, 800, y + 84, 34, 110, '#dff1ff', { r: 14, ow: 4, alpha: a * tu }); g.save(); g.globalAlpha = a * tu; g.fillStyle = K.blood; g.beginPath(); g.roundRect(805, y + 130, 24, 60, 10); g.fill(); g.restore(); tx(g, conc, 818, y + 216, 20, K.ink, { alpha: a * tu }); tx(g, 'c0', 818, y + 66, 16, K.dim, { alpha: a * tu, w: 700 }); }
    const f2 = clamp(uF * 1.4 - 0.5); tx(g, 'Vd = Q / c0 = ' + vd, 500, y + 292, 26, K.hi, { alpha: a * f2 });
  }
  const fatC = [[1560, 290, 90], [1740, 240, 80], [1720, 410, 92], [1540, 470, 84], [1880, 350, 72], [1890, 510, 70], [1650, 556, 68]];
  return {
    W: 1000, H: 934, home: HOME, beatDur: 9, camSpeed: 2.2,
    cams: [HOME, HOME, cam2(X2 + 500, 467, 1), cam2(X3 + 500, 467, 1)],
    anchors: [[60, 110], [60, 500], [X2 + 60, 110], [X3 + 60, 110]],
    phase: (i) => ['cazul 5 · substanța A', 'cazul 5 · substanța B', 'cazul 6 · lipofilul', 'cazul 7 · G și X'][i] || 'distribuția în cazuri',
    draw(g, t, b) {
      const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3), intro = b.i < 0;
      bgK(g, [[500, 300, 460, '#e5485d', 0.08], [X2 + 640, 420, 480, '#ffe9a8', 0.09], [X3 + 420, 380, 480, '#5c8dff', 0.09]]);
      // ---- ecranul 1: Vd
      tank(g, t, 70, K.drug, 'A', intro ? 1 : sg(t0, 0.3, 1.6), 0, b.i === 1 ? 0.55 : 1, '20 mg/L', '100 mg : 20 mg/L = 5 L', intro ? 1 : ln(t0, 3.4, 1.8));
      tank(g, t, 440, K.x, 'B', intro ? 1 : sg(t1, 0.3, 1.6), intro ? 1 : sg(t1, 1.8, 1.8), b.i === 0 ? 0.4 : 1, '1 mg/L', '100 mg : 1 mg/L = 100 L', intro ? 1 : ln(t1, 3.6, 1.8));
      // ---- ecranul 2: țesutul adipos
      { const sh = intro ? 0 : sg(t2, 6, 2.2); const inn = intro ? 1 : sg(t2, 0.4, 2.6);
        const ves = new Path([[X2 + 30, 250], [X2 + 200, 330], [X2 + 300, 520], [X2 + 240, 760], [X2 + 120, 900]], { n: 12 }); ves.stroke(g, 74, K.bloodS, { ow: 8 }); ves.stroke(g, 58, K.blood, { ow: 0 }); stream(g, ves, t, K.bloodL, { n: 5, speed: 0.07, r: 14, rbc: true, alpha: 0.7 });
        tx(g, 'sânge', X2 + 96, 216, 18, '#ffb3be', { w: 800 }); tx(g, 'țesut adipos', X2 + 700, 170, 20, '#ffe9a8', { w: 800 });
        fatC.forEach(([x, y, r], k) => { const rr = r * (1 - 0.42 * sh); shape(g, blob(x, y, rr, rr * 0.94, 0, t * 0.2, 0.04, 14, k + 3), K.fat, { shade: K.fatS, light: '#ffffff', box: bb(x, y, rr, rr), ow: 5 }); ellK(g, x + rr * 0.62, y - rr * 0.58, 13, 7, '#6b4fb0', { ow: 2.5, rot: -0.7 });
          for (let m = 0; m < 3; m++) { const ang = m * 2.1 + k; const fx = x + Math.cos(ang) * rr * 0.42, fy = y + Math.sin(ang) * rr * 0.42; const [vx, vy] = ves.at(0.25 + ((k * 3 + m) % 9) * 0.06); const ui = clamp(inn * 1.7 - (k * 3 + m) * 0.035); const uo = clamp(sh * 1.5 - (k * 3 + m) * 0.02) * (m < 2 ? 1 : 0); mol(g, lerp(lerp(vx, fx, ease(ui)), vx + Math.sin(t + m) * 8, ease(uo)), lerp(lerp(vy, fy, ease(ui)), vy + Math.cos(t + k) * 8, ease(uo)), 11, K.drug, { glow: uo > 0.5 ? 0.8 : 0.2 }); } });
        // Cp în timp (live): mic → doze ↑ → slăbire → peste pragul toxic
        const pl = plot(g, { x: X2 + 490, y: 676, w: 420, h: 118, xmax: 10, ymax: 1.2, xl: 'timp', yl: 'Cp', fs: 14 }); hline(g, pl, 0.95, K.warn, 'prag toxic', { size: 14, align: 'left', lx: pl.o.x + 10 }); hline(g, pl, 0.4, '#e9e2f2', 'minim eficace', { size: 14, dy: -12 });
        const f = (x) => (x < 5.6 ? 0.22 + 0.3 * (1 - Math.exp(-x * 0.9)) + (x > 2.6 ? 0.06 * Math.min(1, (x - 2.6)) : 0) : 0.58 + 0.56 * (1 - Math.exp(-(x - 5.6) * 1.3)));
        trace(g, pl, f, 0, 10, intro ? 1 : ln(t2, 0.6, 9.4), K.drug, { w: 5, n: 120 });
        chip(g, X2 + 640, 640, 'doze ↑', { size: 15, fill: '#3a2410', line: K.drug, col: K.drug, alpha: intro ? 1 : pop(t2, 3.4) }); chip(g, X2 + 820, 640, 'slăbire', { size: 15, fill: '#2a1d10', line: K.hi, col: K.hi, alpha: intro ? 1 : pop(t2, 6) }); }
      // ---- ecranul 3: X îl dislocă pe G
      { const kick = intro ? 1 : sg(t3, 2.8, 2.4); const ax = X3 + 330, ay = 330;
        shape(g, blob(ax, ay, 170, 120, 0, t * 0.25, 0.05, 14, 5), K.prot, { shade: K.protS, light: '#ffffff', box: bb(ax, ay, 170, 120), ow: 6 }); tx(g, 'proteină plasmatică', ax, ay, 20, '#20304a', { stroke: false });
        const sl = [[-130, -70], [-40, -112], [70, -104], [150, -40], [120, 70], [0, 112], [-120, 70]];
        sl.forEach(([dx, dy], k) => { const out = k % 2 === 0 && k < 6; const uo = out ? clamp(kick * 1.4 - k * 0.07) : 0; const fx = X3 + 640 + (k % 3) * 70 + Math.sin(t * 0.8 + k) * 10, fy = 250 + k * 34 + Math.cos(t * 0.7 + k) * 8; mol(g, lerp(ax + dx, fx, ease(uo)), lerp(ay + dy, fy, ease(uo)), 20, K.met, { s: 'G', glow: uo * 0.9 });
          if (out) { const ux = clamp(kick * 1.4 - k * 0.07 + 0.25); const sx = X3 + 40 + k * 16, sy = 120 + k * 70; mol(g, lerp(sx, ax + dx, ease(ux)), lerp(sy, ay + dy, ease(ux)), 20, K.x, { s: 'X', alpha: intro ? 1 : sg(t3, 2.4, 0.5) }); } });
        tx(g, 'G liber', X3 + 720, 196, 19, K.met, { alpha: kick });
        // pancreasul → insulina → glicemia
        const pn = new Path2D(); pn.moveTo(X3 + 560, 590); pn.bezierCurveTo(X3 + 580, 540, X3 + 660, 566, X3 + 730, 548); pn.bezierCurveTo(X3 + 800, 536, X3 + 850, 560, X3 + 842, 590); pn.bezierCurveTo(X3 + 800, 624, X3 + 700, 610, X3 + 640, 630); pn.bezierCurveTo(X3 + 590, 640, X3 + 552, 620, X3 + 560, 590); pn.closePath(); shape(g, pn, '#f2c48a', { shade: '#d49e5c', light: '#ffffff', box: [X3 + 552, 536, 296, 100], ow: 5, glow: kick * 0.6, gc: K.met }); tx(g, 'pancreas', X3 + 700, 588, 18, '#4a2e0c', { stroke: false });
        arrowK(g, [[X3 + 700, 440], [X3 + 704, 490], [X3 + 700, 530]], K.met, 6, kick);
        stream(g, new Path([[X3 + 640, 640], [X3 + 560, 700], [X3 + 420, 740]], { n: 8 }), t, '#ffe36e', { n: 2 + Math.round(kick * 5), speed: 0.3, r: 8 }); tx(g, 'insulină', X3 + 560, 760, 17, K.hi, {});
        dial(g, X3 + 260, 760, 90, lerp(0.5, 0.1, intro ? 1 : sg(t3, 5.4, 2.4)), 'glicemia', { segs: [[0, 0.25, K.warn], [0.25, 0.75, K.ok], [0.75, 1, K.hi]] });
        chip(g, X3 + 260, 836, 'hipoglicemie', { size: 18, fill: '#3a1418', line: K.warn, col: K.warn, alpha: intro ? 1 : pop(t3, 7.4) }); }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], b.i < 2 ? { y: 418 } : {}); g.restore();
    },
  };
}
