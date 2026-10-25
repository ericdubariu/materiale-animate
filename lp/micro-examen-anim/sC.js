// Partea C · LP 5 (p. 38–56): antibiograma (Kirby-Bauer, CMI, E-test), antibioticele + rezistența, reacțiile Ag–Ac, acizii nucleici + PCR, IDR.
// Fiecare scenă începe cu un comentariu „CE TREBUIE SĂ SE VADĂ” (direcții, ordine, culori); desenul urmează exact comentariul.
import {
  HOME, C, M, bg, panel, P, on, loopT, txt, pill, dot, ell, arr, ring, lead, plate, colony, testTube, loop,
  OUT, clamp, lerp, ease, paint, blob, bb, REDUCED,
} from './mk.js';
import { srand, rnd, rr, rbc, lymphocyte } from './kit2d.js';

/* ======================= helperi comuni ======================= */
const GREEN = '#5fd08a', RED = '#ff6b5e', AMBER = '#ffb547', BLUE = '#6fb6ff', CREAM = '#fff3e6', GOLD = '#ffe7b0', DIM = '#b9a9a0';
const LAWN = '#f4ead2';                      // gazonul (cultură confluentă): crem opac, mat
const CLEAR = '#f6edc8', TURBID = '#c9ad72'; // bulion limpede (inhibat) / tulbure (crește)
const seg = (p, a, b) => clamp((p - a) / (b - a));
const T = (t) => (REDUCED ? 0 : t);
const hex2 = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const mix = (a, b, k) => { const A = hex2(a), B = hex2(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(k)))).join(',')})`; };
const circ = (x, y, r) => { const p = new Path2D(); p.arc(x, y, Math.max(0.1, r), 0, Math.PI * 2); return p; };
const intro = (b) => b.i < 0;

// disc de antibiotic (hârtie albă)
function disc(g, x, y, lab = '', a = 1, r = 17) {
  if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.fillStyle = '#ffffff'; g.strokeStyle = OUT; g.lineWidth = 3.5; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke(); g.restore();
  if (lab) txt(g, lab, x, y + 1, Math.min(13, r * 0.78), OUT, { stroke: false, alpha: a, w: 800 });
}
// gazonul: acoperă toată placa (zonele se desenează PESTE el, cu culoarea agarului limpede)
function lawn(g, x, y, r, a, seed = 3) {
  if (a <= 0.01) return;
  g.save(); g.beginPath(); g.arc(x, y, r - 1, 0, 7); g.clip();
  g.globalAlpha = clamp(a); g.fillStyle = LAWN; g.fillRect(x - r, y - r, 2 * r, 2 * r);
  srand(seed); g.fillStyle = 'rgba(170,140,90,.45)';
  const n = Math.round(r * r / 200);
  for (let k = 0; k < n; k++) { const an = rnd() * 6.283, d = Math.sqrt(rnd()) * r; g.beginPath(); g.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, 1.3 + rnd() * 1.5, 0, 7); g.fill(); }
  g.restore();
}
// zona de inhibiție = agarul Mueller-Hinton rămas limpede
function zone(g, path, a = 1, edge = true) {
  if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.fillStyle = M.mh; g.fill(path);
  if (edge) { g.strokeStyle = 'rgba(140,105,50,.6)'; g.lineWidth = 2.5; g.stroke(path); }
  g.restore();
}
// eprubetă cu bulion: turb 0 = limpede, 1 = tulbure (cu particule)
function broth(g, x, y, w, h, turb, o = {}) {
  const lv = o.level ?? 0.6;
  testTube(g, x, y, w, h, mix(CLEAR, TURBID, turb), { level: lv, alpha: o.alpha });
  if (o.tint) { // antibioticul (didactic: albastru transparent, mai intens = concentrație mai mare)
    g.save(); g.globalAlpha = clamp(o.tint) * (o.alpha ?? 1); g.fillStyle = 'rgba(90,160,255,.55)';
    const top = y + h * (1 - lv); g.beginPath(); g.moveTo(x - w / 2 + 3, top); g.lineTo(x + w / 2 - 3, top); g.lineTo(x + w / 2 - 3, y + h - w / 2); g.arc(x, y + h - w / 2, w / 2 - 3, 0, Math.PI); g.closePath(); g.fill(); g.restore();
  }
  if (turb > 0.05) {
    g.save(); g.globalAlpha = clamp(turb) * 0.75 * (o.alpha ?? 1); srand(Math.round(x * 7)); g.fillStyle = '#8f7646';
    const top = y + h * (1 - lv) + 6;
    for (let k = 0; k < 22; k++) { g.beginPath(); g.arc(x + rr(-w * 0.3, w * 0.3), rr(top, y + h - w * 0.5), 1.8, 0, 7); g.fill(); }
    g.restore();
  }
}
// godeu văzut de sus
function well(g, x, y, r, turb, a = 1) {
  g.save(); g.globalAlpha = clamp(a);
  g.fillStyle = mix(CLEAR, TURBID, turb); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke();
  if (turb > 0.05) { srand(Math.round(x)); g.globalAlpha = clamp(a) * turb * 0.8; g.fillStyle = '#8f7646'; for (let k = 0; k < 12; k++) { const an = rnd() * 6.28, d = Math.sqrt(rnd()) * r * 0.8; g.beginPath(); g.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, 1.8, 0, 7); g.fill(); } }
  g.restore();
}
function dashBox(g, x, y, w, h, col, a) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.strokeStyle = col; g.lineWidth = 4; g.setLineDash([10, 8]); g.beginPath(); g.roundRect(x, y, w, h, 12); g.stroke(); g.restore(); }
function hline(g, x0, x1, y, col, w = 3, dash = null, a = 1) { g.save(); g.globalAlpha = clamp(a); g.strokeStyle = col; g.lineWidth = w; if (dash) g.setLineDash(dash); g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke(); g.restore(); }
function vline(g, x, y0, y1, col, w = 3, dash = null, a = 1) { g.save(); g.globalAlpha = clamp(a); g.strokeStyle = col; g.lineWidth = w; if (dash) g.setLineDash(dash); g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke(); g.restore(); }
function check(g, x, y, ok, a = 1, s = 30) { txt(g, ok ? '✓' : '✗', x, y, s, ok ? GREEN : RED, { alpha: a }); }
// anticorp (Y): tips = cele 2 situsuri de legare; rot = 0 → brațele în sus
function Y(g, x, y, s = 1, rot = 0, col = '#ffe08a', a = 1) {
  if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(rot); g.lineCap = 'round'; g.lineJoin = 'round';
  const path = () => { g.beginPath(); g.moveTo(0, 22 * s); g.lineTo(0, 0); g.lineTo(-15 * s, -18 * s); g.moveTo(0, 0); g.lineTo(15 * s, -18 * s); };
  g.strokeStyle = OUT; g.lineWidth = 11 * s; path(); g.stroke(); g.strokeStyle = col; g.lineWidth = 6 * s; path(); g.stroke(); g.restore();
}
// antigen (triunghi galben)
function agTri(g, x, y, s = 12, col = '#ffcf4a', a = 1) {
  if (a <= 0.01) return; const p = new Path2D(); p.moveTo(x, y - s); p.lineTo(x + s * 0.95, y + s * 0.7); p.lineTo(x - s * 0.95, y + s * 0.7); p.closePath();
  g.save(); g.globalAlpha = clamp(a); paint(g, p, col, null, null, [x - s, y - s, 2 * s, 2 * s], OUT, 3); g.restore();
}
function star(g, x, y, r, col = '#7dff8a', a = 1, glow = 0) {
  if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.beginPath();
  for (let k = 0; k < 10; k++) { const an = -Math.PI / 2 + k * Math.PI / 5; const rr2 = k % 2 ? r * 0.45 : r; g.lineTo(x + Math.cos(an) * rr2, y + Math.sin(an) * rr2); }
  g.closePath(); if (glow) { g.shadowColor = col; g.shadowBlur = 18 * glow; } g.fillStyle = col; g.fill(); g.shadowBlur = 0; g.strokeStyle = OUT; g.lineWidth = 2.5; g.stroke(); g.restore();
}
function virus(g, x, y, r = 16, a = 1, col = '#9a6ad6') {
  if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.strokeStyle = OUT; g.lineWidth = 3.5;
  for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3 + Math.PI / 6; const ex = x + Math.cos(an) * (r + 8), ey = y + Math.sin(an) * (r + 8); g.beginPath(); g.moveTo(x + Math.cos(an) * r, y + Math.sin(an) * r); g.lineTo(ex, ey); g.stroke(); g.fillStyle = '#e2b6ff'; g.beginPath(); g.arc(ex, ey, 3.5, 0, 7); g.fill(); g.stroke(); }
  const p = new Path2D(); for (let k = 0; k < 6; k++) { const an = k * Math.PI / 3; p.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } p.closePath();
  paint(g, p, col, null, null, [x - r, y - r, 2 * r, 2 * r], OUT, 3.5); g.restore();
}
function cellB(g, x, y, r, dmg = 0, a = 1) { // celulă de cultură; dmg = efect citopatic (se strică, devine gri)
  g.save(); g.globalAlpha = clamp(a);
  const col = mix('#f6b9a0', '#9b8f8a', dmg);
  paint(g, blob(x, y, r * (1 - 0.15 * dmg), r * 0.8 * (1 - 0.1 * dmg), 0.2, 0, 0.05 + 0.18 * dmg, 14, x), col, null, null, bb(x, y, r, r), OUT, 4);
  dot(g, x + 3, y - 2, r * 0.32, mix('#6a4fb8', '#5c5560', dmg), { ow: 2.5 });
  g.restore();
}
function comp(g, x, y, a = 1) { // complementul (C)
  if (a <= 0.01) return; dot(g, x, y, 11, '#57c27d', { alpha: a, ow: 3 }); txt(g, 'C', x, y + 1, 13, OUT, { stroke: false, alpha: a, w: 900 });
}

/* =================================================================================================
 1 · ANTIBIOGRAMA: calitativă vs. cantitativă + când o faci (p. 38 + 45)
 CE TREBUIE SĂ SE VADĂ:
 - stânga: placa Mueller-Hinton; gazonul crește peste tot, mai puțin în jurul discurilor; zonele au mărimi diferite →
   zonă mare = S, medie = I, fără zonă (gazonul ajunge până la disc) = R.
 - dreapta: 9 tuburi; concentrația SCADE de la stânga (64) la dreapta (0 = martor). După incubare se tulbură DOAR
   tuburile cu concentrație sub CMI (1; 0,5; martorul 0). Ultimul tub limpede (2) = CMI → „un număr (µg/ml)”.
 - jos: un germen trece prin 3 porți în ordinea LP (semnificativ clinic → sensibilitate nepredictibilă → există standard)
   → DA → decide medicul microbiolog. Flora normală se oprește la poarta 1; specia mereu sensibilă trece de 1, se oprește la 2.
================================================================================================= */
export function c_abg() {
  const PX = 250, PY = 300, PR = 158;
  const D = [[190, 240, 64, 'S'], [322, 234, 40, 'I'], [196, 372, 0, 'R'], [318, 368, 52, 'S']];
  const CONC = ['64', '32', '16', '8', '4', '2', '1', '0,5', '0'];
  const TX = (i) => 545 + i * 51;
  const GX = [180, 500, 820];
  const TOK = [['flora normală', RED], ['specie mereu sensibilă', AMBER], ['germen semnificativ', GREEN]];
  return {
    home: HOME,
    anchors: [[PX + 118, PY - 118], [TX(5), 136], [60, 595], [150, 866]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      panel(g, 20, 70, 460, 455); panel(g, 500, 70, 480, 455); panel(g, 20, 540, 960, 380);
      // ---- 1 · difuzimetrică (calitativă)
      const p0 = p(0);
      txt(g, 'calitativă · difuzimetrică', 250, 104, 21, GOLD);
      plate(g, PX, PY, PR, M.mh);
      lawn(g, PX, PY, PR, seg(p0, 0, 0.45), 7);
      D.forEach(([x, y, r]) => { if (r) zone(g, circ(x, y, r * ease(seg(p0, 0.15, 0.65))), seg(p0, 0.05, 0.35)); });
      D.forEach(([x, y]) => disc(g, x, y));
      D.forEach(([x, y, , s]) => txt(g, s, x, y + 33, 24, s === 'S' ? GREEN : s === 'I' ? AMBER : RED, { alpha: seg(p0, 0.65, 0.9) }));
      txt(g, 'zonă mare = S · medie = I · fără zonă = R', 250, 495, 17, CREAM, { w: 700, alpha: Math.max(0.35, seg(p0, 0.7, 1)) });
      // ---- 2 · CMI (cantitativă): tuburile cu concentrație < CMI se tulbură
      const p1 = p(1);
      txt(g, 'cantitativă · CMI', 740, 104, 21, GOLD);
      CONC.forEach((c, i) => {
        const turb = i >= 6 ? ease(seg(p1, 0.15 + (i - 6) * 0.08, 0.55 + (i - 6) * 0.08)) : 0;
        broth(g, TX(i), 182, 34, 215, turb, { level: 0.66 });
        txt(g, c, TX(i), 422, 17, CREAM, { w: 700 });
      });
      txt(g, 'µg/ml · limpede = inhibat · tulbure = crește', 740, 452, 16, DIM, { w: 600 });
      const pb = seg(p1, 0.65, 0.9);
      dashBox(g, TX(5) - 28, 150, 56, 290, C.hi, pb);
      txt(g, 'CMI = 2 µg/ml (un număr)', 740, 492, 21, C.hi, { alpha: pb });
      // ---- 3 · cele 3 condiții (porți) · 4 · cine decide
      hline(g, 40, 960, 595, 'rgba(255,240,228,.3)', 3, [8, 8]);
      const act3 = b.i === 2 || intro(b), done3 = b.i > 2;
      let k = -1, x = 0;
      if (act3) { const u = loopT(t, 9); k = Math.min(2, Math.floor(u * 3)); const v = clamp((u * 3 - k) / 0.7); x = lerp(40, [GX[0], GX[1], 960][k], ease(v)); }
      if (done3) { k = 2; x = 960; }
      const gateCol = (j) => (k < 0 || x < GX[j] - 2 || j > k ? null : (k === j && k < 2 ? RED : GREEN));
      const GL = [['bacterie semnificativă\nclinic', 'nu flora normală,\nnu contaminanți'], ['sensibilitate\nnepredictibilă', 'specia nu e mereu\nsensibilă'], ['există standard', 'pentru specie\n+ antibiotic']];
      GL.forEach(([a1, a2], j) => {
        const gc = gateCol(j);
        pill(g, GX[j], 650, 270, 70, gc === GREEN ? '#bdf0cf' : gc === RED ? '#ffc6bf' : '#e9ddd2', a1, { size: 18, glow: gc ? 0.8 : 0, alpha: b.i >= 2 || intro(b) ? 1 : 0.55 });
        txt(g, a2, GX[j], 717, 15, DIM, { w: 600 });
        if (gc) check(g, GX[j] + 118, 616, gc === GREEN, 1, 26);
      });
      if (k >= 0) { const [lab, col] = TOK[k]; dot(g, x, 595, 13, col, { ow: 3 }); txt(g, lab, Math.min(870, Math.max(110, x)), 568, 15, col, { w: 800 }); }
      const da = k === 2 && x > 900 ? 1 : 0;
      pill(g, 500, 783, 470, 44, da ? '#bdf0cf' : '#3a2f2a', 'toate 3 = DA → faci antibiograma', { size: 18, col: da ? OUT : DIM, glow: da * 0.7 });
      arr(g, 500, 806, 500, 822, CREAM, 4, 0.7);
      const p3 = p(3);
      pill(g, 500, 866, 640, 70, '#d6e9ff', 'decide medicul microbiolog (produs + specie)\nrelevanță incertă → împreună cu medicul curant', { size: 17, glow: on(b, 3) ? 1 : 0, alpha: Math.max(0.5, p3) });
    },
  };
}

/* =================================================================================================
 2 · KIRBY-BAUER · PRINCIPIUL (p. 39)
 CE TREBUIE SĂ SE VADĂ:
 - 1: antibioticul PLEACĂ din disc și difuzează radial în geloză; concentrația e MAXIMĂ lângă disc și SCADE cu distanța
   (graficul de jos: curbă cu vârful în dreptul discului, coboară spre margini; frontul avansează în timp).
 - 2: gazonul crește peste tot UNDE concentrația < CMI; zona rămâne limpede doar unde concentrația ≥ CMI.
   Marginea zonei = punctul unde curba taie linia CMI (liniile verticale leagă marginea zonei de intersecții).
 - 3: linia CMI urcă/coboară: CMI mică → intersecția departe de disc → zonă mare (S); CMI mare → zonă mică/absentă (R).
================================================================================================= */
export function c_kb() {
  const X = 500, Y = 290, R = 215, LAM = 105, DR = 20, G0 = 872, GH = 245;
  const zr = (c) => Math.max(DR, -LAM * Math.log(c));
  const prof = (d, front) => Math.exp(-Math.abs(d) / LAM) * clamp((front - Math.abs(d)) / 45);
  return {
    home: HOME,
    anchors: [[X + 46, Y - 46], [X + 89, Y + 89], [X + R + 70, G0 - 150]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3); const p0 = p(0), p1 = p(1), p2 = p(2);
      const osc = 0.5 - 0.5 * Math.cos(T(t) * 0.9);
      const cmi = lerp(0.3, lerp(0.17, 0.82, osc), p2);
      const front = DR + (R + 50) * p0;
      const la = seg(p1, 0, 0.6), ae = seg(p1, 0.5, 0.9), ac = seg(p1, 0.25, 0.6);
      const z = zr(cmi);
      plate(g, X, Y, R, M.mh);
      // gradientul (didactic, albastru): plin lângă disc, se stinge spre front
      if (p0 > 0.01) {
        g.save(); g.beginPath(); g.arc(X, Y, R, 0, 7); g.clip();
        const gr = g.createRadialGradient(X, Y, DR, X, Y, Math.max(DR + 1, front));
        gr.addColorStop(0, 'rgba(70,150,255,.62)'); gr.addColorStop(0.55, 'rgba(70,150,255,.25)'); gr.addColorStop(1, 'rgba(70,150,255,0)');
        g.globalAlpha = 1 - 0.55 * la; g.fillStyle = gr; g.beginPath(); g.arc(X, Y, front, 0, 7); g.fill();
        for (let k = 0; k < 26; k++) { // molecule care pleacă DIN disc spre exterior
          const an = k * 2.399; const span = Math.max(1, front - DR); const d = DR + ((T(t) * 38 + k * 41) % span);
          g.globalAlpha = (1 - d / (front + 1)) * 0.9 * (1 - 0.6 * la); g.fillStyle = BLUE; g.beginPath(); g.arc(X + Math.cos(an) * d, Y + Math.sin(an) * d, 4, 0, 7); g.fill();
        }
        g.restore();
      }
      lawn(g, X, Y, R, la, 5);
      zone(g, circ(X, Y, z), la);
      if (ae > 0) { g.save(); g.globalAlpha = ae; g.strokeStyle = C.hi; g.lineWidth = 4; g.setLineDash([12, 9]); g.beginPath(); g.arc(X, Y, z, 0, 7); g.stroke(); g.restore(); }
      disc(g, X, Y, 'AB', 1, DR);
      // etichete laterale
      txt(g, 'gradient de\nantibiotic', 150, 190, 19, BLUE, { alpha: Math.max(0.3, p0) * (1 - 0.5 * la) });
      lead(g, 205, 205, X - 60, Y - 40, p0 * (1 - 0.5 * la));
      txt(g, 'gazon\n(cultură confluentă)', 865, 175, 18, GOLD, { alpha: la });
      lead(g, 840, 200, X + 170, Y - 70, la);
      txt(g, 'zona clară\n= inhibiție', 140, 400, 18, CREAM, { alpha: la });
      lead(g, 190, 395, X - z * 0.7, Y + z * 0.45, la);
      txt(g, 'marginea:\nconcentrația ≈ CMI', 860, 410, 18, C.hi, { alpha: ae });
      lead(g, 800, 400, X + z * 0.72, Y + z * 0.69, ae);
      // graficul: concentrația vs. distanța (aliniat cu diametrul plăcii)
      hline(g, X - R, X + R, G0, CREAM, 3);
      vline(g, X - R - 22, G0, G0 - GH - 18, CREAM, 3);
      txt(g, 'concentrația', X - R - 22, G0 - GH - 36, 16, CREAM, { w: 700 });
      txt(g, 'distanța →', X + R + 52, G0, 16, CREAM, { w: 700 });
      const pts = []; for (let xx = X - R; xx <= X + R; xx += 4) pts.push([xx, G0 - GH * prof(xx - X, front)]);
      g.save(); g.fillStyle = 'rgba(70,150,255,.18)'; g.beginPath(); g.moveTo(X - R, G0); pts.forEach(([a, c]) => g.lineTo(a, c)); g.lineTo(X + R, G0); g.closePath(); g.fill();
      g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 9; g.beginPath(); pts.forEach(([a, c], i) => (i ? g.lineTo(a, c) : g.moveTo(a, c))); g.stroke(); g.strokeStyle = BLUE; g.lineWidth = 5; g.stroke(); g.restore();
      const yc = G0 - GH * cmi;
      hline(g, X - R, X + R, yc, '#ff8a7a', 4, [12, 8], ac);
      txt(g, 'CMI', X + R + 36, yc, 20, '#ff8a7a', { alpha: ac });
      if (ae > 0) { [-1, 1].forEach((s) => { vline(g, X + s * z, Y, yc, C.hi, 3, [6, 7], ae * 0.9); dot(g, X + s * z, yc, 9, C.hi, { alpha: ae, ow: 3 }); }); }
      // banda de sub axă: unde crește / unde e inhibat
      if (la > 0) {
        g.save(); g.globalAlpha = la; g.fillStyle = LAWN; g.fillRect(X - R, G0 + 7, 2 * R, 14); g.fillStyle = M.mh; g.fillRect(X - z, G0 + 7, 2 * z, 14); g.strokeStyle = OUT; g.lineWidth = 2; g.strokeRect(X - R, G0 + 7, 2 * R, 14); g.restore();
        if (z > 60) txt(g, 'inhibat', X, G0 + 40, 15, CREAM, { alpha: la, w: 700 });
        txt(g, 'crește', X - (R + z) / 2 - 6, G0 + 40, 15, GOLD, { alpha: la, w: 700 });
        txt(g, 'crește', X + (R + z) / 2 + 6, G0 + 40, 15, GOLD, { alpha: la, w: 700 });
      }
      // 3 · concluzia
      if (p2 > 0.05) {
        if (cmi < 0.36) txt(g, 'CMI mică → zonă mare → S', X, 556, 22, GREEN, { alpha: p2 });
        else if (cmi > 0.6) txt(g, 'CMI mare → zonă mică / absentă → R', X, 556, 22, RED, { alpha: p2 });
        else txt(g, 'CMI crește → zona se micșorează', X, 556, 20, AMBER, { alpha: p2 });
      }
    },
  };
}

/* =================================================================================================
 3 · KIRBY-BAUER · CEI 6 PAȘI (CLSI) (p. 40)
 CE TREBUIE SĂ SE VADĂ (în ordinea pașilor, câte un panou; panoul activ se animă):
 1 inoculul: ansa duce 2–3 colonii în ser fiziologic; tubul se tulbură până egalează etalonul 0,5 McFarland (=).
 2 însămânțarea: tamponul șterge placa MH de 3 ori (3 treceri, de fiecare dată în altă direcție) → gazon; secțiunea arată 4 mm.
 3 discurile: cad unul câte unul pe placa însămânțată, la 1,5 cm de margine și 3 cm între ele.
 4 incubarea: placa intră în termostat, 35 °C, ceasul merge 16–18 h; ABIA ACUM apar zonele.
 5 citirea: săgeata măsoară diametrul zonei, se compară cu tabelul.
 6 interpretarea: din tabel ies S / IS / R; diametrul în mm se taie (nu se raportează).
================================================================================================= */
export function c_steps() {
  const PAN = [0, 1, 2, 3, 4, 5].map((k) => [20 + (k % 2) * 490, 70 + (k >> 1) * 285]);
  const TI = [['inoculul', '0,5 McFarland = 1,5 × 10⁸ CFU/ml'], ['însămânțarea', 'Mueller-Hinton · 4 mm · pH 7,2–7,4'], ['discurile', 'max. 12 · 15 min la temp. camerei'], ['incubarea', '35 °C · 16–18 h'], ['citirea', 'diametrele vs. tabelele standard'], ['interpretarea', 'S · IS · R, nu diametrele']];
  const swab = (g, x, y) => { g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 9; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 60, y - 70); g.stroke(); g.strokeStyle = '#e8d9b8'; g.lineWidth = 5; g.stroke(); g.restore(); ell(g, x, y, 10, 13, '#ffffff', { ow: 3, rot: -0.7 }); };
  const pans = [
    (g, x0, y0, q) => { // 1 · inoculul
      const cx = x0 + 95, cy = y0 + 145; const COL = [[-25, -18], [18, -28], [22, 14], [-12, 24], [-30, 8]];
      plate(g, cx, cy, 62, M.agar); COL.forEach(([dx, dy]) => colony(g, cx + dx, cy + dy, 9, '#f6efe0'));
      txt(g, '2–3 colonii', cx, y0 + 232, 16, CREAM, { w: 700 });
      const tx = x0 + 250, mx = x0 + 375;
      broth(g, tx, y0 + 70, 46, 160, 0.38 * ease(seg(q, 0.15, 0.85)), { level: 0.72 });
      broth(g, mx, y0 + 70, 46, 160, 0.38, { level: 0.72 });
      txt(g, 'ser fiziologic\n+ colonii', tx, y0 + 250, 15, CREAM, { w: 700 });
      txt(g, 'etalonul\n0,5 McFarland', mx, y0 + 250, 15, GOLD, { w: 700 });
      txt(g, '=', x0 + 312, y0 + 160, 38, GREEN, { alpha: seg(q, 0.8, 0.95) });
      if (q > 0.001 && q < 0.78) {
        const k = Math.min(2, Math.floor(q / 0.26)); const u = clamp((q - k * 0.26) / 0.26); const [dx, dy] = COL[k];
        const lx = lerp(cx + dx, tx, ease(u)), ly = lerp(cy + dy, y0 + 170, ease(u)) - 70 * Math.sin(u * Math.PI);
        g.save(); g.translate(lx, ly); g.scale(0.5, 0.5); loop(g, 0, 0, 2.36); g.restore();
      }
    },
    (g, x0, y0, q) => { // 2 · însămânțarea: 3 treceri cu tamponul
      const cx = x0 + 130, cy = y0 + 152, r = 92;
      plate(g, cx, cy, r, M.mh);
      let cur = null;
      for (let j = 0; j < 3; j++) {
        const qj = seg(q, j * 0.28, j * 0.28 + 0.28); if (qj <= 0) continue;
        const an = j * Math.PI / 3; const pts = [];
        for (let k = 0; k <= 10; k++) { const lx = -84 + k * 16.8; const ly = (k % 2 ? 1 : -1) * 0.9 * Math.sqrt(Math.max(0, r * r - lx * lx)); pts.push([cx + lx * Math.cos(an) - ly * Math.sin(an), cy + lx * Math.sin(an) + ly * Math.cos(an)]); }
        const m = qj * 10; const n = Math.floor(m); const seg2 = pts.slice(0, n + 1); if (n < 10) { const f = m - n; seg2.push([lerp(pts[n][0], pts[n + 1][0], f), lerp(pts[n][1], pts[n + 1][1], f)]); }
        g.save(); g.beginPath(); g.arc(cx, cy, r - 1, 0, 7); g.clip(); g.globalAlpha = 0.55; g.strokeStyle = LAWN; g.lineWidth = 24; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); seg2.forEach(([a, c], i) => (i ? g.lineTo(a, c) : g.moveTo(a, c))); g.stroke(); g.restore();
        if (qj < 1) cur = seg2[seg2.length - 1];
      }
      lawn(g, cx, cy, r, seg(q, 0.84, 1), 11);
      if (cur) swab(g, cur[0], cur[1]);
      // secțiune prin placă: stratul de 4 mm
      const sx = x0 + 280, sy = y0 + 125;
      g.save(); g.fillStyle = M.mh; g.fillRect(sx, sy - 18, 150, 18); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(sx - 6, sy - 40); g.lineTo(sx - 6, sy + 4); g.lineTo(sx + 156, sy + 4); g.lineTo(sx + 156, sy - 40); g.stroke(); g.restore();
      vline(g, sx + 172, sy - 18, sy, C.hi, 3);
      txt(g, '4 mm', sx + 200, sy - 9, 16, C.hi, { w: 800 });
      txt(g, 'secțiune', sx + 75, sy - 58, 14, DIM, { w: 600 });
      txt(g, 'ștergi toată suprafața\nde 3 ori', x0 + 355, y0 + 190, 16, CREAM, { w: 700 });
      txt(g, '→ gazon', x0 + 355, y0 + 240, 18, GOLD, { alpha: seg(q, 0.84, 1) });
    },
    (g, x0, y0, q) => { // 3 · discurile: 1,5 cm de margine, 3 cm între ele
      const cx = x0 + 140, cy = y0 + 152, r = 105, ri = 70; // 1,5 cm = 35 px · 3 cm = 70 px
      plate(g, cx, cy, r, M.mh); lawn(g, cx, cy, r, 1, 13);
      for (let k = 0; k < 6; k++) { const a = ease(seg(q, k * 0.1, k * 0.1 + 0.1)); const an = k * Math.PI / 3; disc(g, cx + Math.cos(an) * ri, cy + Math.sin(an) * ri - (1 - a) * 40, '', a, 13); }
      const dm = seg(q, 0.65, 0.85);
      if (dm > 0) {
        hline(g, cx + ri + 13, cx + r, cy, C.hi, 3, null, dm); txt(g, '1,5 cm', cx + 88, cy - 18, 14, C.hi, { alpha: dm });
        g.save(); g.globalAlpha = dm; g.strokeStyle = C.hi; g.lineWidth = 3; g.setLineDash([5, 5]); g.beginPath(); g.moveTo(cx + ri, cy); g.lineTo(cx + ri / 2, cy + ri * 0.866); g.stroke(); g.restore();
        txt(g, '3 cm', cx + 70, cy + 44, 14, C.hi, { alpha: dm });
      }
      txt(g, '1,5 cm de margine\n3 cm între discuri', x0 + 360, y0 + 105, 16, CREAM, { w: 700 });
      txt(g, 'max. 12', x0 + 360, y0 + 160, 20, GOLD);
      txt(g, '15 min la\ntemperatura camerei', x0 + 360, y0 + 215, 15, CREAM, { w: 600, alpha: Math.max(0.4, seg(q, 0.85, 1)) });
    },
    (g, x0, y0, q) => { // 4 · incubarea
      const bx = x0 + 40, by = y0 + 62; const warm = seg(q, 0, 0.3);
      g.save(); g.fillStyle = '#c9d3d8'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(bx, by, 190, 190, 16); g.fill(); g.stroke();
      g.fillStyle = mix('#3b4a52', '#7a4a2a', warm); g.beginPath(); g.roundRect(bx + 16, by + 40, 158, 134, 10); g.fill(); g.stroke();
      g.fillStyle = '#16221c'; g.beginPath(); g.roundRect(bx + 50, by + 8, 90, 26, 6); g.fill(); g.restore();
      txt(g, '35 °C', bx + 95, by + 22, 16, '#7dff8a', { stroke: false });
      for (let j = 0; j < 2; j++) { const py = by + 90 + j * 50; plate(g, bx + 95, py, 50, M.mh); lawn(g, bx + 95, py, 50, seg(q, 0.3, 0.9), 20 + j); [[-22, 0], [22, 0]].forEach(([dx]) => { zone(g, circ(bx + 95 + dx, py, 16 * seg(q, 0.4, 0.9)), seg(q, 0.3, 0.9)); disc(g, bx + 95 + dx, py, '', 1, 7); }); }
      const cx = x0 + 350, cy = y0 + 122;
      ell(g, cx, cy, 50, 50, '#fff3e6', { ow: 5 });
      for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; vline(g, 0, 0, 0, OUT); g.save(); g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.moveTo(cx + Math.cos(an) * 40, cy + Math.sin(an) * 40); g.lineTo(cx + Math.cos(an) * 46, cy + Math.sin(an) * 46); g.stroke(); g.restore(); }
      const ha = -Math.PI / 2 + q * Math.PI * 2 * 1.4;
      g.save(); g.strokeStyle = OUT; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(ha) * 36, cy + Math.sin(ha) * 36); g.stroke(); g.restore();
      txt(g, '16–18 h', cx, cy + 75, 19, GOLD);
      txt(g, 'aer sau CO₂ · pretențioși 20–24 h\nvancomicina: 24 h', x0 + 330, y0 + 238, 14, CREAM, { w: 600 });
    },
    (g, x0, y0, q) => { // 5 · citirea
      const cx = x0 + 145, cy = y0 + 152, r = 100, zr2 = 58;
      plate(g, cx, cy, r, M.mh); lawn(g, cx, cy, r, 1, 31); zone(g, circ(cx, cy, zr2)); disc(g, cx, cy, '', 1, 13);
      const hw = zr2 * ease(seg(q, 0.05, 0.6));
      if (hw > 2) { arr(g, cx, cy + 30, cx - hw, cy + 30, C.hi, 4); arr(g, cx, cy + 30, cx + hw, cy + 30, C.hi, 4); }
      txt(g, 'Ø zonă (mm)', cx, cy - 34, 15, C.hi, { alpha: seg(q, 0.4, 0.7) });
      const tx = x0 + 330, ty = y0 + 85; const ta = seg(q, 0.55, 0.85);
      g.save(); g.globalAlpha = Math.max(0.35, ta); g.fillStyle = '#fff3e6'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(tx - 10, ty - 10, 140, 130, 10); g.fill(); g.stroke(); g.restore();
      [['S', GREEN, 90], ['IS', AMBER, 60], ['R', RED, 30]].forEach(([s, col, w], i) => { pill(g, tx + 18, ty + 18 + i * 38, 34, 26, col, s, { size: 13, alpha: Math.max(0.35, ta), ow: 3 }); g.save(); g.globalAlpha = Math.max(0.35, ta); g.fillStyle = '#c9b8a8'; g.fillRect(tx + 44, ty + 12 + i * 38, w, 12); g.restore(); });
      txt(g, 'tabelul standard', tx + 60, ty + 145, 15, CREAM, { w: 700 });
      arr(g, cx + r + 14, cy - 40, tx - 18, ty + 40, CREAM, 4, ta);
    },
    (g, x0, y0, q) => { // 6 · interpretarea
      const a1 = seg(q, 0, 0.3);
      pill(g, x0 + 110, y0 + 120, 130, 50, '#e9ddd2', 'Ø (mm)', { size: 20 });
      const cut = seg(q, 0.65, 0.85);
      if (cut > 0) { g.save(); g.strokeStyle = RED; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0 + 50, y0 + 145); g.lineTo(x0 + 50 + 120 * cut, y0 + 95); g.stroke(); g.restore(); }
      txt(g, 'nu raportezi\ndiametrele', x0 + 110, y0 + 200, 16, RED, { alpha: cut });
      arr(g, x0 + 185, y0 + 120, x0 + 265, y0 + 120, CREAM, 5, a1);
      txt(g, 'raportezi', x0 + 360, y0 + 62, 16, CREAM, { w: 700, alpha: a1 });
      [['S', GREEN], ['IS', AMBER], ['R', RED]].forEach(([s, col], i) => { const a = seg(q, 0.2 + i * 0.13, 0.33 + i * 0.13); pill(g, x0 + 360, y0 + 98 + i * 52, 120, 40, col, s, { size: 20, alpha: Math.max(0.3, a), glow: a * 0.6 }); });
    },
  ];
  return {
    home: HOME,
    anchors: PAN.map(([x0, y0]) => [x0 + 28, y0 + 28]),
    draw(g, t, b) {
      bg(g); const p = P(b, t, 6);
      PAN.forEach(([x0, y0], k) => {
        const act = on(b, k);
        panel(g, x0, y0, 470, 272, { fill: act ? 'rgba(14,156,134,.16)' : 'rgba(255,240,228,.05)', stroke: act ? 'rgba(120,230,200,.6)' : 'rgba(255,230,210,.16)' });
        txt(g, TI[k][0], x0 + 56, y0 + 28, 20, act ? '#9EF0DD' : CREAM, { align: 'left' });
        txt(g, TI[k][1], x0 + 458, y0 + 28, 14, GOLD, { align: 'right', w: 700 });
        g.save(); g.beginPath(); g.roundRect(x0, y0 + 40, 470, 232, 20); g.clip();
        pans[k](g, x0, y0, b.i < 0 ? p(k) : (k < b.i ? 1 : k > b.i ? 0 : p(k)), t);
        g.restore();
      });
    },
  };
}

/* =================================================================================================
 4 · INTERPRETAREA S / I / R (p. 41)
 CE TREBUIE SĂ SE VADĂ:
 - sus: 3 plăci, diametrul zonei CREȘTE R → I → S (R: gazonul ajunge până la disc).
 - jos: pe fiecare coloană un bar albastru = concentrația antibioticului; urcă de jos până la nivelul SERIC obișnuit.
   R: CMI e deasupra nivelului seric → barul nu o atinge → ✗ (nu e inhibat).
   I: CMI chiar peste nivelul seric → barul seric nu ajunge; barul continuă până la nivelul din URINĂ / doze mari → ✓.
   S: CMI mult sub nivelul seric → barul o depășește → ✓ (concentrație realizabilă în ser).
================================================================================================= */
export function c_sir() {
  const X = [190, 500, 810]; const PY = 205, PR = 108;
  const Z = [0, 50, 88]; const LAB = [['R', RED], ['I', AMBER], ['S', GREEN]];
  const YB = 885, YS = 700, YU = 545; const CMI = [480, 672, 805];
  return {
    home: HOME,
    anchors: X.map((x) => [x + 84, PY - 84]),
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3);
      panel(g, 20, 440, 960, 475);
      // bara „diametrul crește”
      const gr = g.createLinearGradient(110, 0, 890, 0); gr.addColorStop(0, RED); gr.addColorStop(0.5, AMBER); gr.addColorStop(1, GREEN);
      g.save(); g.fillStyle = gr; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.roundRect(110, 388, 760, 16, 8); g.fill(); g.stroke(); g.restore();
      arr(g, 870, 396, 900, 396, CREAM, 4);
      txt(g, 'diametrul zonei crește →', 500, 420, 17, CREAM, { w: 700 });
      X.forEach((x, k) => {
        const q = p(k), act = on(b, k) || intro(b);
        plate(g, x, PY, PR, M.mh); lawn(g, x, PY, PR, 1, 40 + k);
        if (Z[k]) zone(g, circ(x, PY, Z[k] * (b.i < 0 ? q : Math.max(q, b.i > k ? 1 : 0.999 * (b.i >= k ? q : 1)))));
        disc(g, x, PY, '', 1, 15);
        txt(g, LAB[k][0], x, PY + PR + 36, 30, LAB[k][1]);
        if (act) ring(g, x, PY, PR + 18, PR + 18, ease(b.bt * 1.2));
      });
      // nivelurile
      txt(g, 'concentrația ↑', 92, 470, 16, CREAM, { w: 700 });
      hline(g, 60, 950, YU, BLUE, 3, [12, 8]); txt(g, 'în urină / doze mari', 860, YU - 20, 16, BLUE, { w: 700 });
      hline(g, 60, 950, YS, '#9EF0DD', 3, [12, 8]); txt(g, 'concentrația serică obișnuită', 820, YS - 20, 16, '#9EF0DD', { w: 700 });
      hline(g, 60, 950, YB, CREAM, 3);
      X.forEach((x, k) => {
        const q = p(k);
        // CMI-ul germenului
        hline(g, x - 60, x + 60, CMI[k], '#ff8a7a', 5); txt(g, 'CMI', x - 92, CMI[k], 17, '#ff8a7a');
        // barul de concentrație: întâi până la nivelul seric, apoi (doar la I) până la urină
        const ys = lerp(YB, YS, ease(seg(q, 0, 0.45)));
        const yu = k === 1 ? lerp(YS, YU, ease(seg(q, 0.55, 0.85))) : YS;
        g.save(); g.fillStyle = 'rgba(111,182,255,.85)'; g.strokeStyle = OUT; g.lineWidth = 3;
        g.beginPath(); g.rect(x - 22, ys, 44, YB - ys); g.fill(); g.stroke();
        if (k === 1 && yu < YS - 1) { g.fillStyle = 'rgba(111,182,255,.45)'; g.beginPath(); g.rect(x - 22, yu, 44, YS - yu); g.fill(); g.stroke(); }
        g.restore();
        const a1 = seg(q, 0.42, 0.55);
        if (k === 0) { check(g, x + 50, YS + 30, false, a1); txt(g, 'nu e inhibat', x, YS + 70, 16, RED, { alpha: a1 }); }
        if (k === 1) { txt(g, '?', x + 50, YS + 30, 26, AMBER, { alpha: a1 * (1 - seg(q, 0.85, 0.95)) }); check(g, x + 50, YU + 30, true, seg(q, 0.85, 0.95)); txt(g, 'răspuns posibil mai slab', x, YS + 70, 15, AMBER, { alpha: a1 }); }
        if (k === 2) { check(g, x + 50, CMI[k] - 30, true, a1); txt(g, 'inhibat în ser', x, YS + 70, 16, GREEN, { alpha: a1 }); }
      });
    },
  };
}

/* =================================================================================================
 5 · CMI: DILUȚII (p. 42)
 CE TREBUIE SĂ SE VADĂ:
 - 1 (în lichid), în ordine: diluțiile succesive (pipeta merge de la stânga la dreapta, concentrația se înjumătățește:
   64 → 0,5; martorul 0 fără antibiotic) → aceeași cantitate de cultură în fiecare tub → 18 h, 35 °C →
   se tulbură DOAR tuburile 1; 0,5 și martorul (concentrație < CMI) → ultimul limpede = 2 µg/ml = CMI.
 - 2 (în agar): câte o placă MH pe concentrație (8, 4, 2, 1, 0); pe 8 și 4 nimic, pe 2 o singură colonie
   (încă = CMI: „fără creștere sau max. o colonie”), pe 1 și pe martor spotul crește → CMI = 2.
================================================================================================= */
export function c_cmi() {
  const CONC = ['64', '32', '16', '8', '4', '2', '1', '0,5', '0'];
  const TX = (i) => 115 + i * 96;
  const PL = [['8', 0], ['4', 0], ['2', 1], ['1', 2], ['0 martor', 2]];
  return {
    home: HOME,
    anchors: [[TX(5), 140], [500 + 92, 640]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 2); const p0 = p(0), p1 = p(1);
      panel(g, 20, 70, 960, 455); panel(g, 20, 540, 960, 375);
      const a = seg(p0, 0, 0.32), dr = seg(p0, 0.34, 0.5), inc = seg(p0, 0.5, 0.64), tu = seg(p0, 0.62, 0.88), cm = seg(p0, 0.88, 1);
      const fill = a * 8; // câte tuburi au primit diluția
      CONC.forEach((c, i) => {
        const tint = i < 8 && fill >= i ? 0.95 * (1 - i / 8.5) : 0;
        const turb = i >= 6 ? ease(seg(tu, (i - 6) * 0.15, 0.6 + (i - 6) * 0.15)) : 0;
        broth(g, TX(i), 160, 50, 250, turb, { level: 0.62, tint });
        txt(g, c, TX(i), 440, 20, CREAM);
      });
      txt(g, 'martor', TX(8), 466, 15, DIM, { w: 700 });
      // pipeta: merge de la tubul i la i+1 (diluție 1:2 succesivă)
      if (a > 0 && a < 1) { const px = lerp(TX(0), TX(8), a); g.save(); g.fillStyle = '#eef6fa'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(px - 9, 60, 18, 90, 6); g.fill(); g.stroke(); g.beginPath(); g.moveTo(px - 4, 150); g.lineTo(px, 175); g.lineTo(px + 4, 150); g.fill(); g.stroke(); g.restore(); }
      txt(g, 'diluții succesive', 500, 100, 18, BLUE, { alpha: a > 0 && a < 1 ? 1 : 0 });
      // cultura: aceeași cantitate în fiecare tub (picături care cad)
      if (dr > 0 && dr < 1) CONC.forEach((c, i) => { const y = lerp(118, 260, ease(clamp(dr * 1.3 - i * 0.03))); dot(g, TX(i), y, 7, TURBID, { ow: 2.5 }); });
      txt(g, '+ cantitate fixă de cultură', 500, 100, 18, GOLD, { alpha: dr > 0 && dr < 1 ? 1 : 0 });
      pill(g, 500, 100, 200, 38, '#ffd9b0', '18 h · 35 °C', { size: 18, alpha: inc > 0 ? Math.min(1, inc * 3) : 0 });
      dashBox(g, TX(5) - 36, 126, 72, 330, C.hi, cm);
      txt(g, 'limpede = inhibat · tulbure = crește', 250, 500, 17, CREAM, { w: 700, alpha: Math.max(0.35, tu) });
      txt(g, 'CMI = 2 µg/ml', TX(5), 500, 22, C.hi, { alpha: cm });
      txt(g, 'concentrații în µg/ml', 850, 500, 15, DIM, { w: 600 });
      // ---- 2 · în agar: o placă MH pe concentrație
      txt(g, 'în agar: o placă Mueller-Hinton pe concentrație (spot de cultură)', 500, 572, 17, GOLD, { w: 700 });
      PL.forEach(([c, grw], k) => {
        const x = 150 + k * 175, y = 718;
        txt(g, c, x, 617, 18, CREAM);
        plate(g, x, y, 76, M.mh);
        const q = ease(seg(p1, 0.1, 0.7));
        g.save(); g.globalAlpha = 0.5; g.strokeStyle = '#8b6b3a'; g.setLineDash([4, 5]); g.lineWidth = 2; g.beginPath(); g.arc(x, y, 26, 0, 7); g.stroke(); g.restore();
        if (grw === 1) colony(g, x + 8, y - 6, 8 * q, LAWN, { alpha: q });
        if (grw === 2) colony(g, x, y, 28 * q, LAWN, { rough: true, alpha: q });
      });
      txt(g, 'nimic', 150, 818, 15, DIM, { w: 700, alpha: seg(p1, 0.6, 0.8) }); txt(g, 'nimic', 325, 818, 15, DIM, { w: 700, alpha: seg(p1, 0.6, 0.8) });
      txt(g, 'o colonie', 500, 818, 15, C.hi, { w: 700, alpha: seg(p1, 0.6, 0.8) });
      txt(g, 'crește', 675, 818, 15, GOLD, { w: 700, alpha: seg(p1, 0.6, 0.8) }); txt(g, 'crește', 850, 818, 15, GOLD, { w: 700, alpha: seg(p1, 0.6, 0.8) });
      dashBox(g, 410, 596, 180, 236, C.hi, seg(p1, 0.75, 0.95));
      txt(g, 'CMI = fără creștere sau max. o colonie → 2 µg/ml', 500, 870, 18, C.hi, { alpha: seg(p1, 0.75, 0.95) });
    },
  };
}

/* =================================================================================================
 6 · E-TEST, MICRODILUȚIA, CMB (p. 43)
 CE TREBUIE SĂ SE VADĂ:
 - 1 E-test: fâșia are concentrația MARE sus (256) și mică jos (0,016). Gazonul crește; zona clară e o ELIPSĂ largă
   lângă capătul concentrat, care se îngustează în jos și ATINGE fâșia la 0,06 = CMI. Sub acest punct gazonul ajunge la fâșie.
 - 2 microdiluția: godeurile 1 → 7 au concentrații descrescătoare; 1–4 rămân limpezi, 5–7 se tulbură → CMI = godeul 4.
 - 3 CMB: din godeurile limpezi 1–4 subcultivezi pe agar fără antibiotic: din 4 și 3 cresc colonii (doar oprite),
   din 2 și 1 nu crește nimic (omorâte ≥ 99,9%) → CMB = godeul 2, deci CMB ≥ CMI.
================================================================================================= */
export function c_etest() {
  const PX = 262, PY = 400, PR = 225, SX = 262, S0 = 195, S1 = 605;
  const TK = ['256', '64', '16', '4', '1', '0,25', '0,06', '0,016']; const ty = (k) => 205 + k * 57;
  const ECY = 330, ERY = ty(6) - 330, ERX = 150; // elipsa atinge fâșia exact la 0,06
  const WX = (k) => 570 + k * 62;
  return {
    home: HOME,
    anchors: [[PX + 160, PY - 150], [WX(3), 165], [750, 520]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3); const p0 = p(0), p1 = p(1), p2 = p(2);
      panel(g, 520, 70, 460, 350); panel(g, 520, 440, 460, 470);
      const la = seg(p0, 0, 0.5);
      plate(g, PX, PY, PR, M.mh); lawn(g, PX, PY, PR, la, 61);
      if (la > 0) { g.save(); g.beginPath(); g.arc(PX, PY, PR - 1, 0, 7); g.clip(); const e = new Path2D(); e.ellipse(SX, ECY, ERX * ease(seg(p0, 0.1, 0.55)), ERY, 0, 0, 7); zone(g, e, la); g.restore(); }
      // fâșia: gradient (mai închis = mai concentrat), sus 256 → jos 0,016
      const sg = g.createLinearGradient(0, S0, 0, S1); sg.addColorStop(0, '#9fc6ff'); sg.addColorStop(1, '#ffffff');
      g.save(); g.fillStyle = sg; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(SX - 15, S0, 30, S1 - S0, 6); g.fill(); g.stroke(); g.restore();
      TK.forEach((s, k) => { hline(g, SX - 15, SX + 2, ty(k), OUT, 2.5); txt(g, s, SX + 22, ty(k), 15, CREAM, { align: 'left', w: 800 }); });
      const ca = seg(p0, 0.6, 0.85);
      if (ca > 0) { dot(g, SX, ty(6), 9, C.hi, { alpha: ca, ow: 3 }); arr(g, 470, ty(6) + 30, SX + 70, ty(6) + 6, C.hi, 4, ca); txt(g, 'CMI = 0,06', 470, ty(6) + 56, 20, C.hi, { alpha: ca }); }
      txt(g, 'fâșie cu gradient', 420, 200, 17, BLUE, { w: 800 });
      lead(g, 360, 210, SX + 16, 250, 1);
      txt(g, 'zonă elipsoidală', 115, 205, 17, CREAM, { w: 800, alpha: la });
      // ---- 2 · microdiluția
      txt(g, 'microdiluția (desenul de pe tablă)', 750, 104, 18, GOLD);
      for (let k = 0; k < 7; k++) { const turb = k >= 4 ? ease(seg(p1, 0.1 + (k - 4) * 0.12, 0.5 + (k - 4) * 0.12)) : 0; well(g, WX(k), 205, 24, turb); txt(g, String(k + 1), WX(k), 248, 16, CREAM); }
      txt(g, 'concentrația scade →', 750, 284, 16, DIM, { w: 700 });
      dashBox(g, WX(3) - 32, 172, 64, 92, C.hi, seg(p1, 0.7, 0.9));
      txt(g, 'CMI = ultimul godeu limpede (4)', 750, 330, 18, C.hi, { alpha: seg(p1, 0.7, 0.9) });
      txt(g, 'limpezi 1–4 · tulburi 5–7', 750, 372, 16, CREAM, { w: 700, alpha: Math.max(0.35, p1) });
      // ---- 3 · CMB: subcultivezi godeurile limpezi
      txt(g, 'CMB: subcultivezi godeurile limpezi', 750, 474, 18, GOLD);
      const CF = [0, 0, 4, 7];
      for (let k = 0; k < 4; k++) {
        const x = 585 + k * 110; well(g, x, 535, 17, 0, 0.9); txt(g, String(k + 1), x, 535, 13, OUT, { stroke: false });
        const da = seg(p2, k * 0.08, 0.3 + k * 0.08); arr(g, x, 558, x, 588, CREAM, 4, Math.max(0.3, da));
        plate(g, x, 650, 44, M.agar);
        const cg = ease(seg(p2, 0.4, 0.7)); srand(k + 7);
        for (let j = 0; j < CF[k]; j++) { const an = rnd() * 6.28, d = rr(6, 30); colony(g, x + Math.cos(an) * d, 650 + Math.sin(an) * d, 6 * cg, '#f6efe0', { alpha: cg }); }
        txt(g, CF[k] ? 'cresc' : 'nimic', x, 715, 15, CF[k] ? GOLD : CREAM, { w: 700, alpha: cg });
      }
      const ra = seg(p2, 0.7, 0.9);
      txt(g, 'CMB', 695, 748, 19, GREEN, { alpha: ra }); txt(g, 'CMI', 915, 748, 19, C.hi, { alpha: ra });
      txt(g, 'omoară ≥ 99,9% → CMB ≥ CMI', 750, 800, 20, GREEN, { alpha: ra });
      txt(g, 'CMB = concentrația care omoară,\nnu doar oprește', 750, 860, 16, CREAM, { w: 700, alpha: Math.max(0.35, ra) });
    },
  };
}

/* =================================================================================================
 7 · CE MAI VEZI PE PLACĂ + CE STRICĂ REZULTATUL / CONTROLUL DE CALITATE (p. 46 + 47 + caseta de la p. 40)
 CE TREBUIE SĂ SE VADĂ:
 - sinergism: zona cefalosporinei (CEF) se LĂRGEȘTE SPRE discul de amoxicilină + clavulanat (AMC) → „dop de cheie”.
 - antagonism: zona discului AB se TURTEȘTE pe partea dinspre inductor (IND) → zonă în „D”; inductorul fără zonă.
 - colonii în zonă: colonii izolate apar ÎN zona clară (subpopulații rezistente).
 - ce strică: aceeași placă, zona se schimbă: inocul dens → mai mică (fals R); diluat → mai mare (fals S);
   geloză groasă → mai mică (fals R); disc expirat → mai mică (fals R).
 - controlul: tulpina de referință; diametrul ei în interval → valid → raportezi S/IS/R; în afară → mediu / discuri.
================================================================================================= */
export function c_plate() {
  const ST = [['standard (corect)', 62, CREAM], ['inocul dens → fals R', 34, RED], ['inocul diluat → fals S', 92, AMBER], ['geloză groasă → fals R', 38, RED], ['disc expirat → fals R', 28, RED]];
  let zcur = 62;
  return {
    home: HOME,
    anchors: [[170, 150], [830, 150], [140, 590], [630, 590]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1);
      panel(g, 20, 70, 960, 415); panel(g, 20, 500, 465, 415); panel(g, 515, 500, 465, 415);
      const Yp = 285, R = 128;
      txt(g, 'sinergism: „dop de cheie”', 170, 112, 18, GOLD); txt(g, 'antagonism: zona în „D”', 500, 112, 18, GOLD); txt(g, 'colonii în zonă', 830, 112, 18, GOLD);
      // sinergism
      plate(g, 170, Yp, R, M.mh); lawn(g, 170, Yp, R, 1, 71);
      g.save(); g.beginPath(); g.arc(170, Yp, R - 1, 0, 7); g.clip();
      zone(g, circ(115, Yp, 48)); zone(g, circ(235, Yp, 36));
      const bulge = new Path2D(); bulge.ellipse(160, Yp, 58 * ease(p0) + 0.1, 34 * ease(p0) + 0.1, 0, 0, 7); zone(g, bulge, 1, false);
      g.restore();
      disc(g, 115, Yp, 'CEF', 1, 19); disc(g, 235, Yp, 'AMC', 1, 19);
      // antagonism: zona AB se turtește spre IND
      plate(g, 500, Yp, R, M.mh); lawn(g, 500, Yp, R, 1, 72);
      const cut = 455 + lerp(62, 22, ease(p0));
      g.save(); g.beginPath(); g.rect(300, 100, cut - 300, 400); g.clip(); zone(g, circ(455, Yp, 62)); g.restore();
      disc(g, 455, Yp, 'AB', 1, 19); disc(g, 565, Yp, 'IND', 1, 19);
      // colonii în zonă
      plate(g, 830, Yp, R, M.mh); lawn(g, 830, Yp, R, 1, 73); zone(g, circ(830, Yp, 86)); disc(g, 830, Yp, 'AB', 1, 19);
      [[-52, -30], [40, -50], [58, 28], [-30, 56], [-62, 18]].forEach(([dx, dy], k) => { const a = ease(seg(p1, k * 0.12, k * 0.12 + 0.3)); if (a > 0) colony(g, 830 + dx, Yp + dy, 7 * a, LAWN, { alpha: a }); });
      txt(g, 'subpopulații rezistente', 830, 450, 16, RED, { w: 800, alpha: p1 });
      txt(g, 'clavulanatul inhibă ESBL (manual)', 170, 450, 15, CREAM, { w: 700, alpha: Math.max(0.4, p0) });
      txt(g, 'inductorul induce rezistența (manual)', 500, 450, 15, CREAM, { w: 700, alpha: Math.max(0.4, p0) });
      // ce strică rezultatul: aceeași placă, zona se schimbă
      txt(g, 'ce strică rezultatul', 252, 532, 19, GOLD);
      const act3 = on(b, 2) || intro(b);
      let idx = 0; if (act3) idx = Math.floor(T(t) / 1.7) % 5;
      zcur = lerp(zcur, ST[idx][1], 0.08);
      const dense = idx === 1 ? 1 : 0, thin = idx === 2 ? 1 : 0;
      plate(g, 135, 720, 100, M.mh);
      lawn(g, 135, 720, 100, 1, 74); if (dense) { g.save(); g.globalAlpha = 0.35; g.fillStyle = '#d9c79c'; g.beginPath(); g.arc(135, 720, 99, 0, 7); g.fill(); g.restore(); }
      if (thin) { g.save(); g.globalAlpha = 0.4; g.fillStyle = M.mh; g.beginPath(); g.arc(135, 720, 99, 0, 7); g.fill(); g.restore(); }
      g.save(); g.beginPath(); g.arc(135, 720, 99, 0, 7); g.clip(); zone(g, circ(135, 720, zcur)); g.restore();
      disc(g, 135, 720, '', idx === 4 ? 0.6 : 1, 15);
      ST.forEach(([s, r, col], k) => txt(g, s, 365, 600 + k * 52, 15, k === idx && act3 ? col : DIM, { w: k === idx && act3 ? 800 : 600 }));
      if (act3) ring(g, 135, 720, 112, 112, 1);
      // controlul de calitate
      txt(g, 'controlul de calitate', 748, 532, 19, GOLD);
      plate(g, 630, 690, 92, M.mh); lawn(g, 630, 690, 92, 1, 75); zone(g, circ(630, 690, 52)); disc(g, 630, 690, '', 1, 14);
      txt(g, 'tulpină de referință\n(diametre știute)', 630, 818, 15, CREAM, { w: 700 });
      const bx0 = 760, bx1 = 960; hline(g, bx0, bx1, 650, '#6b5a52', 14); hline(g, 820, 900, 650, GREEN, 14);
      txt(g, 'intervalul', 860, 622, 14, GREEN, { w: 700 });
      const act4 = on(b, 3) || intro(b); const out = act4 && Math.floor(T(t) / 2.2) % 2 === 1;
      const mx = out ? 945 : 860;
      g.save(); g.fillStyle = C.hi; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.moveTo(mx, 664); g.lineTo(mx - 10, 684); g.lineTo(mx + 10, 684); g.closePath(); g.fill(); g.stroke(); g.restore();
      txt(g, out ? 'în afara lui →\ngreșeala e în mediu / discuri' : 'în interval →\ntestul e valid', 860, 735, 16, out ? RED : GREEN, { w: 800, alpha: act4 ? 1 : 0.5 });
      pill(g, 748, 872, 420, 46, '#d6e9ff', 'raportezi S, IS, R · nu diametrele', { size: 17, glow: on(b, 3) ? 0.8 : 0 });
    },
  };
}

/* =================================================================================================
 8 · ANTIBIOTICELE (ținte) + REZISTENȚA (p. 44 + 48)
 CE TREBUIE SĂ SE VADĂ:
 - celula: perete (violet, exterior) → membrana (inelul galben) → citoplasmă cu ADN și ribozomi (50S mare + 30S mic).
 - 1: β-lactaminele vin din AFARĂ și lovesc peretele → peretele se fisurează.  2: moleculele intră până la ADN →
   ADN-ul se oprește (nu se mai răsucește/copiază).  3: o moleculă se leagă de 50S, alta de 30S → lanțul proteic nu mai crește.
 - 4: polimixinele găuresc MEMBRANA (inelul galben) → conținutul curge afară.
 - 5: 4 căi de scăpare: enzima sparge antibioticul; ținta modificată nu mai „primește” antibioticul; porina închisă →
   antibioticul ricoșează; pompa de eflux scoate antibioticul din celulă (dinăuntru → afară).
================================================================================================= */
export function c_abx() {
  const RB = [[690, 290, 0], [330, 520, 1], [650, 545, 2]]; // ribozomi
  const ribo = (g, x, y, blk50, blk30) => {
    ell(g, x, y - 10, 34, 22, blk50 ? '#a37a86' : '#d9909f', { ow: 4 }); ell(g, x, y + 16, 25, 14, blk30 ? '#bfa3aa' : '#f1bfc9', { ow: 4 });
  };
  const ab = (g, x, y, col = RED, a = 1) => { dot(g, x, y, 12, col, { alpha: a, ow: 3 }); txt(g, 'AB', x, y + 1, 10, '#ffffff', { stroke: false, alpha: a, w: 900 }); };
  const fly = (q, x0, y0, x1, y1) => [lerp(x0, x1, ease(q)), lerp(y0, y1, ease(q))];
  return {
    home: HOME,
    anchors: [[500, 110], [400, 330], [770, 220], [870, 330], [500, 690]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5); const q = [0, 1, 2, 3, 4].map((k) => p(k));
      // celula
      const W0 = new Path2D(); W0.roundRect(170, 150, 660, 490, 130);
      const M0 = new Path2D(); M0.roundRect(192, 172, 616, 446, 110);
      const C0 = new Path2D(); C0.roundRect(204, 184, 592, 422, 100);
      paint(g, W0, '#7a3fc0', null, null, [170, 150, 660, 490], OUT, 6);
      paint(g, M0, '#f2c94c', null, null, [192, 172, 616, 446], OUT, 3);
      paint(g, C0, '#fbeccf', null, null, [204, 184, 592, 422], OUT, 3);
      txt(g, 'perete', 105, 240, 19, '#d9c6ff'); lead(g, 130, 255, 172, 280, 0.8);
      txt(g, 'membrană', 905, 600, 18, '#f2c94c'); lead(g, 880, 585, 810, 560, 0.8);
      // 1 · peretele: fisuri unde lovesc β-lactaminele
      [350, 500, 650].forEach((x, k) => {
        const u = seg(q[0], k * 0.12, 0.5 + k * 0.12);
        if (u > 0 && u < 1) ab(g, ...fly(u, x, 70, x, 150));
        if (u >= 1) { g.save(); g.strokeStyle = '#fbeccf'; g.lineWidth = 5; g.beginPath(); g.moveTo(x - 10, 150); g.lineTo(x - 3, 158); g.lineTo(x - 9, 166); g.lineTo(x + 2, 173); g.stroke(); g.restore(); }
      });
      // 2 · ADN: se răsucește până ajunge antibioticul
      const blkD = q[1] >= 0.75; const ph = blkD ? 0 : T(t) * 2.2;
      for (let s = 0; s < 2; s++) { g.save(); g.lineWidth = 7; g.strokeStyle = OUT; g.beginPath(); for (let x = 380; x <= 600; x += 4) { const y = 395 + Math.sin((x - 380) / 22 + ph + s * Math.PI) * 26; x === 380 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); g.lineWidth = 4; g.strokeStyle = blkD ? '#8e9aa8' : s ? '#8fc0ff' : '#4f8fe6'; g.stroke(); g.restore(); }
      txt(g, 'ADN', 490, 448, 18, blkD ? DIM : '#4f8fe6');
      if (q[1] > 0 && q[1] < 0.75) { const u = q[1] / 0.75; ab(g, ...fly(u, 60, 300, 382, 395)); ab(g, ...fly(clamp(u * 1.1 - 0.1), 60, 470, 420, 410), '#ff8a5e'); }
      if (blkD) { ab(g, 384, 393); ab(g, 422, 410, '#ff8a5e'); txt(g, 'sinteza oprită', 490, 335, 17, RED, { alpha: q[1] }); }
      // 3 · ribozomii + lanțul proteic
      const b50 = q[2] >= 0.6, b30 = q[2] >= 0.8;
      RB.forEach(([x, y, k]) => {
        const stop = (k === 0 && b50) || (k === 2 && b30);
        const L = stop ? 40 : 30 + 30 * (0.5 + 0.5 * Math.sin(T(t) * 1.5 + k));
        g.save(); g.strokeStyle = '#e0574f'; g.lineWidth = 4; g.beginPath(); for (let s = 0; s <= L; s += 3) { const xx = x + 34 + s, yy = y + 10 + Math.sin(s / 6) * 5; s ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); g.restore();
        ribo(g, x, y, k === 0 && b50, k === 2 && b30);
      });
      txt(g, '50S + 30S', 330, 575, 16, '#d9909f');
      if (q[2] > 0 && q[2] < 0.6) ab(g, ...fly(q[2] / 0.6, 930, 90, 690, 278));
      if (b50) { ab(g, 690, 278); txt(g, '50S', 690, 240, 15, CREAM); }
      if (q[2] > 0.2 && q[2] < 0.8) ab(g, ...fly((q[2] - 0.2) / 0.6, 950, 610, 652, 562), '#ff8a5e');
      if (b30) { ab(g, 652, 562, '#ff8a5e'); txt(g, '30S', 612, 585, 15, CREAM); }
      // 4 · membrana: polimixinele fac găuri → conținutul curge afară
      const hole = q[3] >= 0.55;
      if (q[3] > 0 && q[3] < 0.55) ab(g, ...fly(q[3] / 0.55, 960, 400, 808, 400), '#ffb547');
      if (hole) { g.save(); g.fillStyle = '#fbeccf'; g.fillRect(790, 380, 20, 40); g.restore(); ab(g, 812, 375, '#ffb547'); for (let k = 0; k < 5; k++) { const u = ((T(t) * 0.5 + k / 5) % 1); dot(g, 800 + u * 150, 400 + Math.sin(k * 2 + u * 6) * 18, 5, '#fbeccf', { alpha: 1 - u, ow: 2 }); } txt(g, 'conținutul curge afară', 900, 470, 15, AMBER, { w: 700, alpha: q[3] }); }
      // 5 · rezistența: 4 mini-scene
      const ra = intro(b) || b.i >= 4 ? 1 : 0.35; const u = loopT(t, 3.2);
      const BX = [135, 375, 615, 855]; const by = 790;
      [['enzime', 'β-lactamaze, ESBL'], ['ținta modificată', 'PBP2a (MRSA)'], ['porină pierdută', 'Gram −'], ['pompă de eflux', 'scoate AB afară']].forEach(([a1, a2], k) => {
        panel(g, BX[k] - 115, 670, 230, 245, { fill: b.i === 4 ? 'rgba(14,156,134,.14)' : 'rgba(255,240,228,.05)' });
        txt(g, a1, BX[k], 695, 17, GOLD, { alpha: ra }); txt(g, a2, BX[k], 893, 14, CREAM, { alpha: ra, w: 700 });
      });
      g.save(); g.globalAlpha = ra;
      { // enzima (verde, „pac-man”) sparge antibioticul
        const x = BX[0], ex = x + 40; const ax = lerp(x - 90, ex - 24, ease(seg(u, 0, 0.45)));
        const mo = 0.35 + 0.3 * Math.abs(Math.sin(T(t) * 6));
        g.save(); g.fillStyle = '#57c27d'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(ex, by); g.arc(ex, by, 32, Math.PI + mo, Math.PI - mo + Math.PI * 2); g.closePath(); g.fill(); g.stroke(); g.restore();
        if (u < 0.5) ab(g, ax, by); else { const s = ease(seg(u, 0.5, 0.9)); g.save(); g.globalAlpha = ra * (1 - s * 0.6); g.fillStyle = RED; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(ex - 40 - 20 * s, by - 20 * s, 12, Math.PI / 2, Math.PI * 1.5); g.closePath(); g.fill(); g.stroke(); g.beginPath(); g.arc(ex - 36 + 4 * s, by + 22 * s, 12, -Math.PI / 2, Math.PI / 2); g.closePath(); g.fill(); g.stroke(); g.restore(); }
      }
      { // ținta modificată: antibioticul (triunghi) nu mai intră în locașul pătrat
        const x = BX[1]; const tp = new Path2D(); tp.moveTo(x - 50, by + 40); tp.lineTo(x - 50, by - 10); tp.lineTo(x - 14, by - 10); tp.lineTo(x - 14, by - 40); tp.lineTo(x + 14, by - 40); tp.lineTo(x + 14, by - 10); tp.lineTo(x + 50, by - 10); tp.lineTo(x + 50, by + 40); tp.closePath();
        paint(g, tp, '#d4b2ff', null, null, [x - 50, by - 40, 100, 80], OUT, 4);
        const d = u < 0.5 ? lerp(-120, -54, ease(u / 0.5)) : lerp(-54, -110, ease((u - 0.5) / 0.5));
        g.save(); g.fillStyle = RED; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.moveTo(x, by + d + 26); g.lineTo(x - 16, by + d); g.lineTo(x + 16, by + d); g.closePath(); g.fill(); g.stroke(); g.restore();
        if (u > 0.45 && u < 0.7) check(g, x + 40, by - 70, false, 1, 24);
      }
      { // porina pierdută: antibioticul ricoșează din membrană
        const x = BX[2]; g.save(); g.fillStyle = '#f2c94c'; g.strokeStyle = OUT; g.lineWidth = 4; g.fillRect(x - 100, by + 5, 200, 26); g.strokeRect(x - 100, by + 5, 200, 26); g.restore();
        g.save(); g.fillStyle = '#7b6a5a'; g.strokeStyle = OUT; g.lineWidth = 3; g.fillRect(x - 14, by + 2, 28, 32); g.strokeRect(x - 14, by + 2, 28, 32); g.restore();
        const yy = u < 0.5 ? lerp(by - 80, by - 14, ease(u / 0.5)) : lerp(by - 14, by - 75, ease((u - 0.5) / 0.5)); const xx = u < 0.5 ? x : x + (u - 0.5) * 120;
        ab(g, xx, yy); txt(g, 'afară', x - 70, by - 50, 14, DIM, { w: 700 }); txt(g, 'înăuntru', x - 60, by + 62, 14, DIM, { w: 700 });
      }
      { // pompa de eflux: dinăuntru (jos) → afară (sus)
        const x = BX[3]; g.save(); g.fillStyle = '#f2c94c'; g.strokeStyle = OUT; g.lineWidth = 4; g.fillRect(x - 100, by + 5, 200, 26); g.strokeRect(x - 100, by + 5, 200, 26); g.restore();
        g.save(); g.fillStyle = '#3f7fd9'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(x - 18, by - 12, 36, 62, 10); g.fill(); g.stroke(); g.restore();
        const yy = lerp(by + 72, by - 70, ease(u)); ab(g, x, yy);
        txt(g, 'afară', x - 70, by - 50, 14, DIM, { w: 700 }); txt(g, 'înăuntru', x - 60, by + 62, 14, DIM, { w: 700 });
      }
      g.restore();
    },
  };
}

/* =================================================================================================
 9 · IDENTIFICAREA ANTIGENICĂ · PRINCIPIU (p. 49)
 CE TREBUIE SĂ SE VADĂ:
 - sus: anticorpul (Y) prinde cu vârfurile brațelor DOAR antigenul lui (triunghiul); antigenul străin (pătratul) ricoșează.
 - mijloc: 5 reacții, fiecare se animă pe punctul ei: precipitare (inel/precipitat), aglutinare (grunji), neutralizare
   (Ac acoperă virusul → celula rămâne întreagă), RFC (complementul e prins de complex → hematiile rămân întregi),
   marcaj (Ac cu marcaj care strălucește).
 - jos: direct = Ac cunoscut caută Ag (identifici germenul) · indirect = Ag cunoscut caută Ac (serodiagnostic).
================================================================================================= */
export function c_ag() {
  const TXs = [110, 305, 500, 695, 890];
  const NAMES = [['precipitare', 'Ag solubil'], ['aglutinare', 'Ag corpuscular'], ['neutralizare', 'virus / toxină'], ['RFC', 'complement'], ['marcaj', 'RIF · IPO · ELISA']];
  return {
    home: HOME,
    anchors: TXs.map((x) => [x + 70, 392]),
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5);
      panel(g, 20, 70, 960, 290); panel(g, 20, 720, 470, 190); panel(g, 510, 720, 470, 190);
      // sus: specificitatea
      const u = loopT(t, 4);
      Y(g, 500, 250, 2.6, 0, '#ffe08a');
      const tip = (s) => [500 + s * 39, 250 - 47 - 8];
      const v = ease(seg(u, 0, 0.45));
      agTri(g, lerp(330, tip(-1)[0], v), lerp(130, tip(-1)[1], v), 14);
      agTri(g, lerp(670, tip(1)[0], v), lerp(130, tip(1)[1], v), 14);
      const sq = u < 0.5 ? ease(u / 0.5) : 1 - ease((u - 0.5) / 0.5);
      g.save(); g.fillStyle = '#7fd3e8'; g.strokeStyle = OUT; g.lineWidth = 3; g.fillRect(lerp(160, 420, sq) - 13, lerp(290, 245, sq) - 13, 26, 26); g.strokeRect(lerp(160, 420, sq) - 13, lerp(290, 245, sq) - 13, 26, 26); g.restore();
      if (u > 0.4 && u < 0.6) check(g, 420, 205, false, 1, 22);
      if (v >= 1) { ring(g, tip(-1)[0], tip(-1)[1], 24, 24, 1); ring(g, tip(1)[0], tip(1)[1], 24, 24, 1); }
      txt(g, 'anticorpul (Ac)', 640, 300, 18, '#ffe08a'); txt(g, 'antigenul lui (Ag) ✓', 805, 135, 17, '#ffcf4a'); txt(g, 'alt antigen ✗', 150, 330, 16, '#7fd3e8');
      // mijloc: 5 plăcuțe
      TXs.forEach((x, k) => {
        const act = on(b, k) || intro(b); const q = p(k); const cy = 545;
        panel(g, x - 92, 378, 184, 325, { fill: on(b, k) ? 'rgba(14,156,134,.16)' : 'rgba(255,240,228,.05)' });
        txt(g, NAMES[k][0], x, 410, 18, GOLD); txt(g, NAMES[k][1], x, 680, 14, CREAM, { w: 700 });
        if (k === 0) { testTube(g, x, 455, 46, 160, '#f3e7c4', { level: 0.75 }); g.save(); g.globalAlpha = q; g.fillStyle = '#ffffff'; g.fillRect(x - 20, 545, 40, 9 * q + 2); g.restore(); }
        if (k === 1) { srand(5); for (let j = 0; j < 18; j++) { const sx = x + rr(-60, 60), sy = cy + rr(-60, 60); const c = j % 3; const cx = x + [-35, 30, 0][c], cyy = cy + [-25, -15, 35][c]; dot(g, lerp(sx, cx + rr(-12, 12), q), lerp(sy, cyy + rr(-12, 12), q), 6, '#f0d9a8', { ow: 2.5 }); } }
        if (k === 2) { cellB(g, x, cy + 70, 30); virus(g, x, lerp(cy - 70, cy, 1), 15); for (let j = 0; j < 4; j++) { const an = j * Math.PI / 2 + 0.6; Y(g, x + Math.cos(an) * lerp(70, 34, q), cy + Math.sin(an) * lerp(70, 34, q), 0.6, an - Math.PI / 2 * 3 + Math.PI, '#ffe08a', Math.max(0.3, q)); } }
        if (k === 3) { Y(g, x - 20, cy - 30, 0.8, 0); agTri(g, x - 20, cy - 52, 8); comp(g, lerp(x + 50, x - 2, q), lerp(cy + 30, cy - 40, q)); rbc(g, x - 30, cy + 70, 0.8); rbc(g, x + 25, cy + 80, 0.8); }
        if (k === 4) { Y(g, x, cy + 10, 1.4, 0); agTri(g, x - 21, cy - 23, 9); star(g, x, cy + 45, 12, '#7dff8a', 1, act ? q : 0); }
      });
      // jos: direct / indirect
      const w = loopT(t + 1, 4); const vv = ease(seg(w, 0, 0.5));
      txt(g, 'DIRECT: Ac cunoscut + Ag?', 255, 750, 17, GOLD); txt(g, 'INDIRECT: Ag cunoscut + Ac?', 745, 750, 17, GOLD);
      Y(g, 180, 830, 1.3, 0, '#ffe08a'); txt(g, 'știut', 180, 875, 14, CREAM, { w: 700 });
      agTri(g, lerp(300, 160, vv), lerp(790, 801, vv), 11, '#ffcf4a'); txt(g, '?', lerp(300, 160, vv) + 22, 790, 18, C.hi, { alpha: 1 - vv });
      txt(g, '→ identifici germenul', 370, 840, 16, GREEN, { w: 800, alpha: vv });
      agTri(g, 670, 805, 13, '#ffcf4a'); txt(g, 'știut', 670, 875, 14, CREAM, { w: 700 });
      Y(g, lerp(560, 690, vv), lerp(800, 838, vv), 1.3, 0, '#ffe08a'); txt(g, 'serul\nbolnavului?', 560, 860, 13, C.hi, { alpha: 1 - vv, w: 700 });
      txt(g, '→ serodiagnostic', 860, 840, 16, GREEN, { w: 800, alpha: vv });
    },
  };
}

/* =================================================================================================
 10 · PRECIPITAREA (p. 50)
 CE TREBUIE SĂ SE VADĂ:
 - 1: markerul merge pe axa „Ag adăugat” de la exces de Ac la exces de Ag. În fereastra de sus: exces Ac → fiecare Ag
   acoperit de mulți Ac (complexe mici); echivalență → REȚEA mare (precipitat); exces Ag → fiecare Ac cu câte 2 Ag (mici).
   Curba precipitatului are maximul la echivalență.
 - 2 Ascoli: serul (Ac) jos, extractul de organ (Ag) deasupra, FĂRĂ amestec → inelul alb apare la CONTACT (interfață).
 - 3 Mancini: Ag în agaroză, serul în godeu → cerc de precipitat; godeul 2 (ser la 10 zile) are cercul mai mare decât 1
   (seroconversie); 3 și 4 egale (contact vechi).
================================================================================================= */
export function c_prec() {
  const GX0 = 70, GX1 = 590, GY = 470, GH = 160;
  const bell = (u) => Math.exp(-(((u - 0.5) / 0.17) ** 2));
  const link = (g, a, c) => { const mx = (a[0] + c[0]) / 2, my = (a[1] + c[1]) / 2; const dx = c[0] - a[0], dy = c[1] - a[1]; const L = Math.hypot(dx, dy) || 1; const nx = -dy / L * 9, ny = dx / L * 9; g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; const pth = () => { g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(mx + nx, my + ny); g.lineTo(c[0], c[1]); g.moveTo(mx + nx, my + ny); g.lineTo(mx + nx * 2.2, my + ny * 2.2); }; g.strokeStyle = OUT; g.lineWidth = 8; pth(); g.stroke(); g.strokeStyle = '#ffe08a'; g.lineWidth = 4; pth(); g.stroke(); g.restore(); };
  const ag = (g, x, y, a = 1) => dot(g, x, y, 8, '#ffcf4a', { ow: 3, alpha: a });
  return {
    home: HOME,
    anchors: [[GX0 + 20, 300], [930, 300], [500, 545]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3); const p0 = p(0), p1 = p(1), p2 = p(2);
      panel(g, 20, 70, 600, 440); panel(g, 640, 70, 340, 440); panel(g, 20, 525, 960, 390);
      // 1 · fereastra moleculară + curba
      const act = on(b, 0) || intro(b);
      const u = act ? 0.5 - 0.5 * Math.cos(T(t) * 0.55) : 0.5;
      const eq = bell(u);
      g.save(); g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.roundRect(45, 90, 550, 180, 14); g.fill(); g.restore();
      g.save(); g.globalAlpha = eq; // rețeaua
      const N = []; for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) N.push([130 + i * 70 + (j % 2) * 35, 125 + j * 55]);
      N.forEach((a, i) => N.forEach((c, j) => { if (j > i && Math.hypot(a[0] - c[0], a[1] - c[1]) < 80) link(g, a, c); }));
      N.forEach(([x, y]) => ag(g, x, y)); g.restore();
      g.save(); g.globalAlpha = 1 - eq; // complexe mici
      if (u < 0.5) [[150, 180], [320, 150], [480, 200]].forEach(([x, y]) => { ag(g, x, y); for (let k = 0; k < 4; k++) { const an = k * Math.PI / 2 + 0.4; Y(g, x + Math.cos(an) * 32, y + Math.sin(an) * 32, 0.7, an + Math.PI / 2, '#ffe08a'); } });
      else [[140, 160], [300, 210], [450, 150], [520, 230]].forEach(([x, y]) => { link(g, [x - 22, y], [x + 22, y]); ag(g, x - 22, y); ag(g, x + 22, y); });
      g.restore();
      txt(g, eq > 0.6 ? 'echivalență → rețea mare → precipitat vizibil' : u < 0.5 ? 'exces de Ac → complexe mici, solubile' : 'exces de Ag → complexe mici, solubile', 320, 258, 16, eq > 0.6 ? GREEN : CREAM, { w: 800 });
      hline(g, GX0, GX1, GY, CREAM, 3);
      const pts = []; for (let x = GX0; x <= GX1; x += 5) pts.push([x, GY - GH * 0.85 * bell((x - GX0) / (GX1 - GX0))]);
      g.save(); g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 9; g.beginPath(); pts.forEach(([a, c], i) => (i ? g.lineTo(a, c) : g.moveTo(a, c))); g.stroke(); g.strokeStyle = '#4fd1b0'; g.lineWidth = 5; g.stroke(); g.restore();
      const mx = lerp(GX0, GX1, u); dot(g, mx, GY - GH * 0.85 * eq, 11, C.hi, { ow: 3 });
      txt(g, 'precipitat', GX0 + 50, 320, 15, '#4fd1b0', { w: 700 });
      txt(g, 'exces Ac', GX0 + 40, GY + 22, 15, CREAM, { w: 700 }); txt(g, 'exces Ag', GX1 - 40, GY + 22, 15, CREAM, { w: 700 }); txt(g, 'echivalența', (GX0 + GX1) / 2, GY + 22, 15, GREEN, { w: 800 });
      // 2 · Ascoli (inel la interfață)
      const tx = 810, ty = 115, th = 300, tw = 74;
      testTube(g, tx, ty, tw, th, '#f5ecc8', { level: 0.78, top: '#e8c4a8', topH: 0.26 });
      const yi = ty + th * (1 - 0.78) + th * 0.26;
      g.save(); g.globalAlpha = ease(p1); g.fillStyle = '#ffffff'; g.strokeStyle = 'rgba(42,21,52,.5)'; g.lineWidth = 2; g.fillRect(tx - tw / 2 + 4, yi - 5, tw - 8, 10); g.strokeRect(tx - tw / 2 + 4, yi - 5, tw - 8, 10); g.restore();
      txt(g, 'Ag (organ)', 700, yi - 45, 15, '#e8c4a8', { w: 800 }); txt(g, 'Ac (ser\nanticărbunos)', 700, yi + 60, 15, '#f5ecc8', { w: 800 });
      txt(g, '← inel', 905, yi, 17, C.hi, { alpha: Math.max(0.3, p1) });
      txt(g, 'Ascoli: diagnostic\nretrospectiv (cărbune)', 810, 470, 15, CREAM, { w: 700 });
      // 3 · Mancini
      txt(g, 'Mancini: Ag în agaroză, serul în godeu', 500, 555, 18, GOLD);
      g.save(); g.fillStyle = 'rgba(225,235,242,.85)'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(60, 590, 880, 240, 18); g.fill(); g.stroke(); g.restore();
      const WX = [180, 390, 610, 820]; const q1 = ease(seg(p2, 0, 0.5)), q2 = ease(seg(p2, 0.5, 1));
      const RF = [44 * q1, 44 * q1 + 32 * q2, 60 * q1, 60 * q1];
      WX.forEach((x, k) => { g.save(); g.fillStyle = 'rgba(255,255,255,.95)'; g.strokeStyle = '#bfc7cc'; g.lineWidth = 3; g.beginPath(); g.arc(x, 710, Math.max(15, RF[k]), 0, 7); g.fill(); g.stroke(); g.restore(); dot(g, x, 710, 14, '#f3dfa8', { ow: 3 }); txt(g, String(k + 1), x, 805, 16, OUT, { stroke: false }); });
      txt(g, '1 → 2 (ser la 10 zile): crește → seroconversie', 290, 618, 14, '#2f6b3f', { stroke: false, alpha: Math.max(0.3, q2), w: 800 });
      txt(g, '3 = 4: egale → contact vechi', 715, 618, 14, '#5a4b40', { stroke: false, alpha: Math.max(0.3, q1), w: 800 });
      txt(g, 'diametrul vs. curbe etalon → cantitativ', 500, 870, 17, CREAM, { w: 700 });
    },
  };
}

/* =================================================================================================
 11 · AGLUTINAREA (p. 51)
 CE TREBUIE SĂ SE VADĂ:
 - 1 pe lamă: în picătura cu ser aglutinant bacteriile se strâng în GRUNJI (1–2 min), lichidul dintre ele se limpezește;
   în martorul cu ser fiziologic bacteriile rămân uniform răspândite (suspensie omogenă).
 - 2 godeuri (văzute de sus): hematiile singure se rostogolesc la fund → BUTON compact; + virus (HA) → hematiile legate
   între ele într-o REȚEA întinsă pe fund; + virus + Ac → Ac blochează HA → hematiile cad iar în buton compact (HAI pozitivă).
 - 3 pe suport: particulele (latex) acoperite cu elementul cunoscut sunt legate de Ag căutat → se adună într-un aglutinat.
================================================================================================= */
export function c_aggl() {
  srand(17); const BAC = Array.from({ length: 34 }, () => { const an = rnd() * 6.28, d = Math.sqrt(rnd()); return [Math.cos(an) * d * 130, Math.sin(an) * d * 58, Math.floor(rnd() * 5)]; });
  const CL = [[-80, -15], [-30, 25], [20, -20], [70, 15], [100, -25]];
  srand(23); const RB = Array.from({ length: 30 }, () => { const an = rnd() * 6.28, d = Math.sqrt(rnd()); return [Math.cos(an) * d * 80, Math.sin(an) * d * 80, rnd() * 6.28]; });
  const BTN = RB.map((_, i) => { const an = i * 2.399, d = Math.sqrt(i / 30) * 22; return [Math.cos(an) * d, Math.sin(an) * d]; });
  const NET = RB.map((_, i) => { const r = Math.floor(i / 6), c = i % 6; return [-70 + c * 28 + (r % 2) * 14, -62 + r * 31]; });
  return {
    home: HOME,
    anchors: [[300, 120], [500, 372], [270, 700]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3); const p0 = p(0), p1 = p(1), p2 = p(2);
      panel(g, 20, 70, 960, 285); panel(g, 20, 370, 960, 290); panel(g, 20, 675, 960, 240);
      // 1 · lama
      g.save(); g.fillStyle = 'rgba(220,240,255,.22)'; g.strokeStyle = 'rgba(220,240,255,.7)'; g.lineWidth = 4; g.beginPath(); g.roundRect(70, 110, 860, 190, 14); g.fill(); g.stroke(); g.restore();
      const q = ease(p0);
      [[300, true], [700, false]].forEach(([cx, ser]) => {
        g.save(); g.fillStyle = mix('#e9dcc0', '#f5f0e4', ser ? q : 0); g.globalAlpha = 0.9; g.beginPath(); g.ellipse(cx, 205, 150, 72, 0, 0, 7); g.fill(); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(); g.restore();
        BAC.forEach(([dx, dy, c], i) => {
          let x = cx + dx + Math.sin(T(t) * 2 + i) * 2, y = 205 + dy + Math.cos(T(t) * 2.3 + i) * 2;
          if (ser) { const [kx, ky] = CL[c]; x = lerp(x, cx + kx + (dx % 9), q); y = lerp(y, 205 + ky + (dy % 9), q); }
          dot(g, x, y, 5, '#c8a76a', { ow: 2 });
        });
      });
      txt(g, 'ser aglutinant + colonie → grunji (1–2 min)', 300, 325, 16, GREEN, { w: 800, alpha: Math.max(0.35, q) });
      txt(g, 'martor (ser fiziologic) → rămâne uniform', 700, 325, 16, CREAM, { w: 800 });
      // 2 · godeurile: buton compact vs. rețea
      const W2 = [[200, 'hematii', 'buton compact', BTN, false, false], [500, '+ virus (HA)', 'rețea („buton stelat”)', NET, true, false], [800, '+ virus + Ac', 'HAI pozitivă: buton', BTN, true, true]];
      const q2 = ease(p1);
      W2.forEach(([cx, top, bot, F, vir, ac], k) => {
        const cy = 505;
        g.save(); g.fillStyle = '#f7e6e6'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(cx, cy, 98, 0, 7); g.fill(); g.stroke(); g.restore();
        if (vir && !ac) { g.save(); g.globalAlpha = q2 * 0.6; g.strokeStyle = '#9a6ad6'; g.lineWidth = 2; F.forEach((a, i) => F.forEach((c, j) => { if (j > i && Math.hypot(a[0] - c[0], a[1] - c[1]) < 33) { g.beginPath(); g.moveTo(cx + a[0], cy + a[1]); g.lineTo(cx + c[0], cy + c[1]); g.stroke(); } })); g.restore(); }
        RB.forEach(([dx, dy, rot], i) => rbc(g, cx + lerp(dx, F[i][0], q2), cy + lerp(dy, F[i][1], q2), 0.42, rot));
        if (vir) for (let j = 0; j < 6; j++) { const an = j * 1.05 + 0.3; const vx = cx + Math.cos(an) * (ac ? 70 : 48), vy = cy + Math.sin(an) * (ac ? 70 : 48); virus(g, vx, vy, 6, 1); if (ac) Y(g, vx + 9, vy - 9, 0.4, 0.8, '#ffe08a'); }
        txt(g, top, cx, 392, 16, GOLD); txt(g, bot, cx, 628, 15, k === 2 ? GREEN : CREAM, { w: 800, alpha: Math.max(0.4, q2) });
      });
      // 3 · pe suport (latex)
      const q3 = ease(p2);
      const LP = [[110, 760, 190, 790], [260, 850, 230, 820], [420, 760, 280, 785], [180, 880, 250, 860]];
      srand(31); const AGP = Array.from({ length: 6 }, () => [rr(150, 300), rr(760, 870)]);
      AGP.forEach(([x, y], i) => dot(g, lerp(x + 120 * (i % 2 ? 1 : -0.3), x, q3), y, 5, '#ffcf4a', { ow: 2, alpha: 0.4 + 0.6 * q3 }));
      LP.forEach(([x0, y0, x1, y1]) => { const x = lerp(x0, x1, q3), y = lerp(y0, y1, q3); dot(g, x, y, 28, '#dfe3e6', { ow: 4 }); for (let k = 0; k < 6; k++) { const an = k * 1.047; Y(g, x + Math.cos(an) * 32, y + Math.sin(an) * 32, 0.38, an + Math.PI / 2, '#ffe08a'); } });
      txt(g, 'latex / hematie / proteina A\n+ elementul cunoscut', 690, 745, 17, GOLD, { w: 800 });
      txt(g, 'Ag căutat leagă particulele\n→ aglutinat vizibil', 690, 835, 17, Math.max(0.4, q3) > 0.6 ? GREEN : CREAM, { w: 800, alpha: Math.max(0.4, q3) });
    },
  };
}

/* =================================================================================================
 12 · NEUTRALIZAREA ȘI RFC (p. 52)
 CE TREBUIE SĂ SE VADĂ:
 - 1: rândul de sus: virusul ajunge la celulă → celula se strică (infecție). Rândul 2: virusul e acoperit de Ac → celula
   rămâne întreagă (nimic). Citești EFECTUL CARE LIPSEȘTE.
 - 2 (prima etapă, ambele eprubete au Ag + ser + complement): stânga, serul are Ac → Ac se leagă de Ag, iar complementul (C)
   se lipește de complexe (FIXAT). Dreapta, fără Ac → complementul rămâne liber.
 - 3 (a doua etapă: hematii + Ac anti-hematii): stânga, nu mai e complement liber → hematiile rămân întregi și se depun la
   fund (lichid limpede, sediment roșu) = POZITIV. Dreapta, complementul liber sparge hematiile → lichid roșu uniform = NEGATIV.
================================================================================================= */
export function c_rfc() {
  srand(41); const AGS = Array.from({ length: 5 }, () => [rr(-55, 55), rr(-120, 40)]);
  const CS = Array.from({ length: 6 }, () => [rr(-60, 60), rr(-130, 60)]);
  const RBS = Array.from({ length: 12 }, () => [rr(-60, 60), rr(-110, 80), rr(0, 6)]);
  return {
    home: HOME,
    anchors: [[60, 130], [300, 400], [700, 400]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3); const p0 = p(0), p1 = p(1), p2 = p(2);
      panel(g, 20, 70, 960, 270); panel(g, 20, 355, 960, 560);
      // 1 · neutralizarea
      txt(g, 'neutralizarea: citești efectul care lipsește', 380, 98, 18, GOLD);
      [[155, false], [270, true]].forEach(([y, ac]) => {
        const v = ease(seg(p0, 0, 0.6)); const vx = lerp(130, 470, v);
        arr(g, 180, y, 420, y, 'rgba(255,240,228,.5)', 4);
        virus(g, vx, y, 18); if (ac) for (let k = 0; k < 5; k++) { const an = k * 1.257; Y(g, vx + Math.cos(an) * 33, y + Math.sin(an) * 33, 0.55, an + Math.PI / 2, '#ffe08a'); }
        const dmg = ac ? 0 : ease(seg(p0, 0.6, 1));
        cellB(g, 530, y, 42, dmg);
        txt(g, ac ? 'virus + Ac → nimic' : 'virus → infecție', 680, y, 18, ac ? GREEN : RED, { align: 'left', alpha: Math.max(0.4, seg(p0, 0.6, 1)) });
      });
      txt(g, 'cultură celulară,\nanimal sau piele (Schick)', 860, 300, 14, DIM, { w: 700 });
      // 2–3 · RFC
      txt(g, 'RFC: complementul e „martorul”', 500, 382, 19, GOLD);
      const q1 = ease(p1), q2 = ease(p2);
      [[300, true], [700, false]].forEach(([cx, hasAc]) => {
        const top = 420, h = 430, w = 230;
        // lichidul: la negativ devine roșu (hemoliză)
        const lys = hasAc ? 0 : ease(seg(p2, 0.45, 0.95));
        g.save(); const body = new Path2D(); body.moveTo(cx - w / 2, top); body.lineTo(cx - w / 2, top + h - w / 2); body.arc(cx, top + h - w / 2, w / 2, Math.PI, 0, true); body.lineTo(cx + w / 2, top);
        g.fillStyle = mix('#f7f1e1', '#c8283a', lys); g.globalAlpha = 0.9; g.fill(body); g.globalAlpha = 1; g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(body); g.restore();
        txt(g, hasAc ? 'ser CU Ac' : 'ser FĂRĂ Ac', cx, top - 2, 17, CREAM);
        const mid = top + 210;
        // Ag + (Ac) + C
        AGS.forEach(([dx, dy], i) => { const x = cx + dx, y = mid + dy * 0.9; agTri(g, x, y, 10); if (hasAc) Y(g, x, y + 12 + 22 * (1 - q1) + 6, 0.6, Math.PI, '#ffe08a', Math.max(0.3, q1)); });
        CS.forEach(([dx, dy], i) => {
          let x = cx + dx + Math.sin(T(t) + i) * 6, y = mid + dy * 0.9 + Math.cos(T(t) * 1.3 + i) * 6;
          if (hasAc && i < 5) { const [ax, ay] = AGS[i]; x = lerp(x, cx + ax + 16, q1); y = lerp(y, mid + ay * 0.9 + 26, q1); }
          if (!hasAc && q2 > 0) { const [rx, ry] = RBS[i * 2]; x = lerp(x, cx + rx + 12, seg(p2, 0.1, 0.45)); y = lerp(y, mid + ry - 12, seg(p2, 0.1, 0.45)); }
          comp(g, x, y, 1 - (hasAc ? 0 : seg(p2, 0.5, 0.8)));
        });
        // hematiile sensibilizate (cu Ac anti-hematii)
        if (q2 > 0) RBS.forEach(([dx, dy, rot], i) => {
          const fall = ease(seg(p2, 0, 0.3)); let x = cx + dx, y = lerp(top - 40, mid + dy, fall);
          if (hasAc) { const sx = cx - 70 + (i % 6) * 28, sy = top + h - 50 - Math.floor(i / 6) * 18; x = lerp(x, sx, seg(p2, 0.45, 0.95)); y = lerp(y, sy, seg(p2, 0.45, 0.95)); rbc(g, x, y, 0.55, rot); }
          else { const burst = seg(p2, 0.45, 0.85); if (burst < 1) { g.save(); g.globalAlpha = 1 - burst; rbc(g, x, y, 0.55 * (1 + burst * 0.5), rot); g.restore(); } }
        });
        if (q1 > 0.5 && hasAc) txt(g, 'complementul se fixează', cx, top + 40, 15, GREEN, { w: 800, alpha: q1 });
        if (!hasAc && q1 > 0.5) txt(g, 'complementul rămâne liber', cx, top + 40, 15, AMBER, { w: 800, alpha: q1 });
      });
      txt(g, '+ hematii + Ac anti-hematii', 500, 455, 15, CREAM, { w: 800, alpha: Math.max(0.3, q2) });
      txt(g, 'pozitiv: fără hemoliză', 300, 893, 19, GREEN, { alpha: Math.max(0.3, seg(p2, 0.6, 1)) });
      txt(g, 'negativ: hemoliză', 700, 893, 19, RED, { alpha: Math.max(0.3, seg(p2, 0.6, 1)) });
    },
  };
}

/* =================================================================================================
 13 · REACȚIILE CU MARCAJ (p. 53)
 CE TREBUIE SĂ SE VADĂ:
 - RIF: fond negru, Ac cu fluorocrom se leagă pe celule → puncte VERZI fluorescente, care apoi pălesc (nu e stabilă în timp).
 - IPO: fond deschis, peroxidaza + substrat → precipitat MARONIU care rămâne (se păstrează).
 - ELISA: godeuri pe suport solid; culoarea galbenă apare cu intensități diferite → citire spectrofotometrică (bare) = cantitativ.
 - 4: direct = Ac marcat (cu stea) se leagă direct de Ag. Indirect = întâi Ac nemarcat → SPĂLARE (cei nelegați pleacă) →
   apoi Ac anti-Ig marcat se leagă de PICIORUL primului Ac.
================================================================================================= */
export function c_label() {
  srand(51); const CELL = [[110, 190], [215, 260], [140, 330], [250, 160]];
  const ELI = [0.9, 0.55, 0.2, 0.75, 0.35, 0.05];
  return {
    home: HOME,
    anchors: [[300, 105], [628, 105], [955, 105], [500, 520]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3);
      // RIF
      g.save(); g.fillStyle = '#05060a'; g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 3; g.beginPath(); g.roundRect(20, 70, 305, 400, 18); g.fill(); g.stroke(); g.restore();
      const fade = intro(b) ? 1 - 0.55 * seg(p0, 0.75, 1) : b.i === 0 ? 1 - 0.55 * seg(b.bt / b.bd, 0.7, 1) : 0.45;
      CELL.forEach(([x, y], k) => { g.save(); g.strokeStyle = 'rgba(120,140,160,.45)'; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 34, 0, 7); g.stroke(); g.restore(); for (let j = 0; j < 4; j++) { const an = j * 1.57 + k; const a = seg(p0, 0.1 + k * 0.1, 0.4 + k * 0.1) * fade; g.save(); g.globalAlpha = a; g.shadowColor = '#7dff8a'; g.shadowBlur = 16; g.fillStyle = '#7dff8a'; g.beginPath(); g.arc(x + Math.cos(an) * 34, y + Math.sin(an) * 34, 6, 0, 7); g.fill(); g.restore(); } });
      txt(g, 'RIF: fluorescență\n(microscop UV)', 172, 425, 16, '#7dff8a', { w: 800 });
      // IPO
      g.save(); g.fillStyle = '#f3ead8'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(347, 70, 305, 400, 18); g.fill(); g.stroke(); g.restore();
      CELL.forEach(([x, y], k) => { g.save(); g.strokeStyle = '#d9a7b8'; g.lineWidth = 3; g.beginPath(); g.arc(x + 327, y, 34, 0, 7); g.stroke(); g.restore(); for (let j = 0; j < 4; j++) { const an = j * 1.57 + k; dot(g, x + 327 + Math.cos(an) * 34, y + Math.sin(an) * 34, 7, '#7a4a22', { alpha: seg(p1, 0.1 + k * 0.1, 0.4 + k * 0.1), ow: 2 }); } });
      txt(g, 'IPO: precipitat maro\n(microscop optic)', 500, 425, 16, '#7a4a22', { stroke: false, w: 800 });
      // ELISA
      panel(g, 675, 70, 305, 400);
      ELI.forEach((v, k) => { const x = 735 + (k % 3) * 92, y = 150 + Math.floor(k / 3) * 92; const a = ease(seg(p2, 0, 0.6)) * v; g.save(); g.fillStyle = mix('#fbfaf2', '#f2c21b', a); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(x, y, 34, 0, 7); g.fill(); g.stroke(); g.restore(); });
      ELI.forEach((v, k) => { const h = 90 * v * ease(seg(p2, 0.5, 0.9)); g.save(); g.fillStyle = '#f2c21b'; g.strokeStyle = OUT; g.lineWidth = 2.5; g.fillRect(720 + k * 40, 385 - h, 26, h); g.strokeRect(720 + k * 40, 385 - h, 26, h); g.restore(); });
      hline(g, 710, 960, 386, CREAM, 3);
      txt(g, 'ELISA: culoare →\nspectrofotometru (cantitativ)', 828, 430, 15, '#f2c21b', { w: 800 });
      // 4 · direct vs. indirect (între etape: spălări)
      panel(g, 20, 490, 470, 425); panel(g, 510, 490, 470, 425);
      txt(g, 'DIRECT: Ac specific marcat', 255, 522, 17, GOLD); txt(g, 'INDIRECT: Ac nemarcat + anti-Ig marcat', 745, 522, 17, GOLD);
      const q = intro(b) ? loopT(t, 7) : p3;
      [0, 1].forEach((side) => {
        const ox = side ? 510 : 20; hline(g, ox + 30, ox + 440, 860, '#c9b8a8', 10);
        [120, 235, 350].forEach((dx, k) => {
          const x = ox + dx; agTri(g, x, 840, 13);
          const s = 1.3; const yAc = 840 - 13 - 18 * s; // vârfurile Ac pe Ag
          if (!side) { const v = ease(seg(q, 0.05 + k * 0.05, 0.4 + k * 0.05)); Y(g, x, lerp(560, yAc, v), s, Math.PI, '#ffe08a'); star(g, x, lerp(560, yAc, v) - 22 * s - 10, 11, '#7dff8a', 1, v); }
          else {
            const v1 = ease(seg(q, 0.02 + k * 0.04, 0.3 + k * 0.04)); Y(g, x, lerp(560, yAc, v1), s, Math.PI, '#d8d0c0');
            const v2 = ease(seg(q, 0.6 + k * 0.04, 0.9 + k * 0.04)); const y2 = yAc - 22 * s - 18 * s; Y(g, x, lerp(560, y2, v2), s, Math.PI, '#ffe08a', v2 > 0 ? 1 : 0); star(g, x, lerp(560, y2, v2) - 22 * s - 10, 11, '#7dff8a', v2 > 0 ? 1 : 0, v2);
          }
        });
        // spălarea: Ac nelegați pleacă
        const w = seg(q, side ? 0.35 : 0.45, side ? 0.55 : 0.65);
        if (w > 0 && w < 1) { for (let k = 0; k < 3; k++) Y(g, ox + 180 + k * 70 + w * 260, 660 + k * 20 - w * 40, 1, 2 + k, side ? '#d8d0c0' : '#ffe08a', 1 - w); g.save(); g.globalAlpha = (1 - Math.abs(w - 0.5) * 2) * 0.6; g.strokeStyle = BLUE; g.lineWidth = 4; for (let k = 0; k < 3; k++) { g.beginPath(); for (let x = ox + 40; x < ox + 440; x += 10) g.lineTo(x, 620 + k * 40 + Math.sin(x / 20 + T(t) * 5) * 6); g.stroke(); } g.restore(); txt(g, 'spălare', ox + 235, 600, 18, BLUE); }
      });
      txt(g, 'Ag pe lamă + Ac marcat', 255, 892, 15, CREAM, { w: 700 }); txt(g, 'Ag + Ac nemarcat → spălare → anti-Ig marcat', 745, 892, 15, CREAM, { w: 700 });
    },
  };
}

/* =================================================================================================
 14 · ACIZII NUCLEICI + PCR (p. 54 + 56)
 CE TREBUIE SĂ SE VADĂ:
 - 1 hibridizarea, în ordinea LP: ADN dublu catenar → DENATURARE (lanțurile se separă) → fixare pe suport (membrana).
 - 2 sonda (portocalie, cu marcaj) coboară și se leagă de secvența COMPLEMENTARĂ; sondele în exces sunt spălate; semnalul
   rămâne doar unde sonda e legată.
 - 3 Southern: fragmentezi → electroforeză (fragmentele MICI migrează MAI DEPARTE) → transfer pe membrană → sonda → o bandă.
 - 4 PCR, un ciclu: 90 °C denaturare (lanțurile se separă) → 50 °C alinierea primerilor (la capătul 3′ al fiecărei matrițe)
   → 70 °C elongare cu Taq (catena nouă crește 5′→3′, spre capătul 5′ al matriței).
 - 5 fiecare ciclu dublează: ×1 → ×2 → ×4 → ×8 (2ⁿ).
================================================================================================= */
export function c_na() {
  const STEP = ['extragi', 'denaturezi', 'fixezi', 'sonda', 'speli → semnal'];
  const rungs = (g, x0, x1, y, dir, col, a = 1) => { g.save(); g.globalAlpha = clamp(a); g.strokeStyle = col; g.lineWidth = 3; for (let x = x0 + 8; x < x1; x += 16) { g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + dir * 12); g.stroke(); } g.restore(); };
  const strand = (g, x0, x1, y, col, a = 1) => { hline(g, x0, x1, y, OUT, 11, null, a); hline(g, x0, x1, y, col, 6, null, a); };
  return {
    home: HOME,
    anchors: [[60, 110], [660, 220], [60, 385], [440, 640], [740, 640]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5); const p0 = p(0), p1 = p(1), p2 = p(2);
      panel(g, 20, 70, 960, 285); panel(g, 20, 365, 960, 240); panel(g, 20, 615, 960, 300);
      // ---- 1–2 · hibridizarea
      const s = p0 * 3; const sep = ease(clamp(s - 1)), fix = ease(clamp(s - 2));
      const lit = [p0 > 0.01, sep > 0, fix > 0, p1 > 0.05, p1 > 0.6];
      STEP.forEach((st, k) => pill(g, 130 + k * 185, 100, 165, 36, lit[k] ? '#bdf0cf' : '#3a2f2a', st, { size: 15, col: lit[k] ? OUT : DIM, ow: 3 }));
      // poziții: dublu catenar (y 190/205) → separate (165/235) → fixate pe membrană (y 300, una lângă alta)
      const aY = lerp(lerp(190, 165, sep), 300, fix), aX = lerp(330, 200, fix);
      const bY = lerp(lerp(214, 240, sep), 300, fix), bX = lerp(330, 560, fix);
      hline(g, 160, 900, 316, '#c9b8a8', 12, null, Math.max(0.35, fix));
      txt(g, 'membrana (suport)', 820, 336, 13, DIM, { w: 700, alpha: Math.max(0.35, fix) });
      strand(g, aX, aX + 270, aY, '#4f8fe6'); rungs(g, aX, aX + 270, aY, 1, '#4f8fe6', 1 - fix);
      strand(g, bX, bX + 270, bY, '#8fc0ff'); rungs(g, bX, bX + 270, bY, fix > 0.5 ? -1 : -1, '#8fc0ff', 1);
      if (fix < 0.5) rungs(g, bX, bX + 270, bY, -1, '#8fc0ff', 1);
      // sonda: se leagă de secvența complementară a catenei b (x 640–720)
      const pr = ease(seg(p1, 0, 0.5)); const wash = seg(p1, 0.55, 0.85);
      if (p1 > 0) {
        const px = 640, py = lerp(160, 300 - 26, pr);
        strand(g, px, px + 90, py, '#ff9a3d'); rungs(g, px, px + 90, py, 1, '#ff9a3d'); star(g, px + 100, py - 8, 11, '#ffe36e', 1, pr >= 1 ? 1 : 0);
        for (let k = 0; k < 2; k++) { const ex = 300 + k * 160 + wash * 500, ey = 200 - k * 30 - wash * 40; g.save(); g.globalAlpha = 1 - wash; strand(g, ex, ex + 90, ey, '#ff9a3d'); star(g, ex + 100, ey - 8, 11, '#ffe36e'); g.restore(); }
        if (wash > 0.9) ring(g, 690, 285, 70, 30, 1);
        txt(g, 'sonda marcată (secvență cunoscută)', 600, 140, 15, '#ff9a3d', { w: 800, alpha: Math.max(0.4, pr) });
      }
      // ---- 3 · Southern blot
      txt(g, 'Southern blot (ADN) · Northern = ARN · Western = proteine', 500, 390, 17, GOLD);
      const SX = [140, 380, 620, 860]; const q = p2;
      // a · fragmentezi (enzime)
      const cut = ease(seg(q, 0, 0.25));
      [0, 1, 2, 3].forEach((k) => strand(g, SX[0] - 90 + k * 46 + k * 12 * cut, SX[0] - 90 + k * 46 + 40 + k * 12 * cut, 470, '#4f8fe6'));
      txt(g, 'fragmentezi\n(enzime)', SX[0], 560, 14, CREAM, { w: 700 });
      // b · electroforeza: fragmentele mici migrează mai departe (în jos)
      g.save(); g.fillStyle = 'rgba(200,220,235,.3)'; g.strokeStyle = OUT; g.lineWidth = 3; g.fillRect(SX[1] - 60, 420, 120, 105); g.strokeRect(SX[1] - 60, 420, 120, 105); g.restore();
      const el = ease(seg(q, 0.2, 0.5)); [[0.2, 30], [0.45, 24], [0.7, 18], [0.95, 12]].forEach(([d, w]) => hline(g, SX[1] - 20 - w / 2 + 20, SX[1] - 20 + w / 2 + 20, 428 + el * d * 88, '#4f8fe6', 6));
      txt(g, 'mic ↓', SX[1] + 82, 505, 13, DIM, { w: 700 });
      txt(g, 'electroforeză\n(după mărime)', SX[1], 560, 14, CREAM, { w: 700 });
      // c · transfer pe membrană
      const tr = ease(seg(q, 0.5, 0.75));
      g.save(); g.fillStyle = '#efe8dc'; g.strokeStyle = OUT; g.lineWidth = 3; g.fillRect(SX[2] - 60, 420, 120, 105); g.strokeRect(SX[2] - 60, 420, 120, 105); g.restore();
      [[0.2, 30], [0.45, 24], [0.7, 18], [0.95, 12]].forEach(([d, w]) => hline(g, SX[2] - w / 2, SX[2] + w / 2, 428 + d * 88, '#4f8fe6', 6, null, tr));
      arr(g, SX[1] + 70, 470, SX[2] - 70, 470, CREAM, 4, Math.max(0.3, tr));
      txt(g, 'transfer\npe membrană', SX[2], 560, 14, CREAM, { w: 700 });
      // d · sonda → o singură bandă
      const pb = ease(seg(q, 0.75, 1));
      g.save(); g.fillStyle = '#efe8dc'; g.strokeStyle = OUT; g.lineWidth = 3; g.fillRect(SX[3] - 60, 420, 120, 105); g.strokeRect(SX[3] - 60, 420, 120, 105); g.restore();
      [[0.2, 30], [0.45, 24], [0.7, 18], [0.95, 12]].forEach(([d, w], k) => { hline(g, SX[3] - w / 2, SX[3] + w / 2, 428 + d * 88, k === 1 ? '#ff9a3d' : 'rgba(79,143,230,.35)', 6); });
      if (pb > 0) { g.save(); g.globalAlpha = pb; g.shadowColor = '#ffe36e'; g.shadowBlur = 18; hline(g, SX[3] - 12, SX[3] + 12, 428 + 0.45 * 88, '#ffe36e', 8); g.restore(); }
      txt(g, 'sonda →\nbanda', SX[3], 560, 14, CREAM, { w: 700 });
      // ---- 4–5 · PCR
      const pa = intro(b) || b.i >= 3 ? 1 : 0.35;
      const Tc = b.i === 3 ? 6 : 4.5; const tt = b.i >= 3 ? b.bt : T(t);
      const u = (tt % Tc) / Tc; const stp = Math.min(2, Math.floor(u * 3)); const su = (u * 3) % 1;
      const ncyc = b.i === 4 ? Math.min(3, Math.floor(b.bt / Tc) + 1) : intro(b) ? (Math.floor(T(t) / Tc) % 3) + 1 : 1;
      g.save(); g.globalAlpha = pa;
      // temperatura (trepte 90 / 50 / 70)
      const TY = { 90: 670, 50: 820, 70: 745 }; const cw = 110, x0 = 85;
      txt(g, '90 °C', 50, TY[90], 14, '#ff8a7a', { w: 800 }); txt(g, '70 °C', 50, TY[70], 14, '#7fe0b0', { w: 800 }); txt(g, '50 °C', 50, TY[50], 14, BLUE, { w: 800 });
      g.save(); g.strokeStyle = CREAM; g.lineWidth = 4; g.beginPath(); for (let c = 0; c < 3; c++) [90, 50, 70].forEach((v, j) => { const xa = x0 + c * cw + j * cw / 3; g.lineTo(xa, TY[v]); g.lineTo(xa + cw / 3, TY[v]); }); g.stroke(); g.restore();
      const cIdx = (ncyc - 1) % 3; dot(g, x0 + cIdx * cw + u * cw, TY[[90, 50, 70][stp]], 10, C.hi, { ow: 3 });
      txt(g, 'denaturare · aliniere primeri · elongare (Taq)', 230, 880, 14, CREAM, { w: 700 });
      // molecula
      const L0 = 470, L1 = 690, cy = 760;
      const gap = stp === 0 ? lerp(14, 70, ease(su)) : 70;
      const ya = cy - gap / 2, yb = cy + gap / 2;
      strand(g, L0, L1, ya, '#4f8fe6'); strand(g, L0, L1, yb, '#8fc0ff');
      txt(g, '5′', L0 - 18, ya, 13, CREAM); txt(g, '3′', L1 + 18, ya, 13, CREAM); txt(g, '3′', L0 - 18, yb, 13, CREAM); txt(g, '5′', L1 + 18, yb, 13, CREAM);
      if (stp === 0 && su < 0.3) rungs(g, L0, L1, ya, 1, '#9fb7b0', 1 - su / 0.3);
      if (stp >= 1) {
        const an = stp === 1 ? ease(su) : 1;
        strand(g, L1 - 40, L1, lerp(ya + 40, ya + 16, an), '#3ddc84'); strand(g, L0, L0 + 40, lerp(yb - 40, yb - 16, an), '#3ddc84');
      }
      if (stp === 2) { const e = ease(su); strand(g, lerp(L1 - 40, L0, e), L1 - 40, ya + 16, '#f0a35a'); strand(g, L0 + 40, lerp(L0 + 40, L1, e), yb - 16, '#f0a35a'); }
      txt(g, ['90 °C · denaturare', '50 °C · aliniere primeri', '70 °C · elongare (Taq)'][stp], 580, 660, 19, ['#ff8a7a', BLUE, '#7fe0b0'][stp]);
      txt(g, 'primer', 580, 850, 14, '#3ddc84', { w: 800, alpha: stp >= 1 ? 1 : 0 });
      // copiile: ×1 → ×2 → ×4 → ×8
      const nc = 2 ** ncyc;
      for (let k = 0; k < nc; k++) hline(g, 770, 930, 665 + k * 22, '#3ddc84', 8);
      txt(g, `ciclul ${ncyc} → ×${nc}`, 850, 845, 18, GREEN);
      txt(g, 'după n cicluri: 2ⁿ copii', 850, 880, 15, CREAM, { w: 700 });
      g.restore();
    },
  };
}

/* =================================================================================================
 15 · INTRADERMOREACȚIILE ȘI BOALA EXPERIMENTALĂ (p. 55)
 CE TREBUIE SĂ SE VADĂ:
 - Schick: toxina se injectează intradermic. Stânga: Ac antitoxină urcă din vas și prind toxina → pielea rămâne normală
   (fără eritem = protejat). Dreapta: fără Ac → eritem roșu care crește (receptiv).
 - Tuberculina (PPD): stânga, limfocitele T sensibilizate migrează din vas spre locul injectării; ceasul ajunge la ~48 h →
   INDURAȚIE (ridicătură fermă) = contact / vaccinat. Dreapta: nimic → trebuie vaccinat.
 - Boala experimentală: animalele (șoarece, cobai, iepure) → inoculare → supraveghere → autopsie; scopurile.
================================================================================================= */
export function c_idr() {
  const mouse = (g, x, y) => { g.save(); g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.moveTo(x - 38, y + 6); g.quadraticCurveTo(x - 70, y + 20, x - 74, y - 6); g.stroke(); g.restore(); ell(g, x, y, 40, 24, '#c9c4c8', { ow: 4 }); ell(g, x + 36, y - 8, 17, 15, '#c9c4c8', { ow: 4 }); ell(g, x + 30, y - 24, 8, 8, '#f2b6c0', { ow: 3 }); dot(g, x + 44, y - 10, 2.8, OUT, { ow: 0 }); };
  const gpig = (g, x, y) => { ell(g, x, y, 46, 30, '#c98a52', { ow: 4 }); ell(g, x + 26, y - 6, 14, 10, '#f3e3cf', { ow: 3 }); ell(g, x + 24, y - 26, 8, 6, '#a86a3a', { ow: 3 }); dot(g, x + 36, y - 10, 3, OUT, { ow: 0 }); };
  const rabbit = (g, x, y) => { ell(g, x + 22, y - 48, 7, 22, '#efe9e2', { ow: 3, rot: 0.2 }); ell(g, x + 36, y - 46, 7, 22, '#efe9e2', { ow: 3, rot: 0.45 }); ell(g, x, y, 40, 28, '#efe9e2', { ow: 4 }); ell(g, x + 32, y - 14, 18, 16, '#efe9e2', { ow: 4 }); dot(g, x + 40, y - 16, 3, OUT, { ow: 0 }); };
  const syr = (g, x, y, a) => { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(-0.7); g.fillStyle = '#e8f3f8'; g.strokeStyle = OUT; g.lineWidth = 3; g.fillRect(8, -8, 60, 16); g.strokeRect(8, -8, 60, 16); g.beginPath(); g.moveTo(0, 0); g.lineTo(8, 0); g.stroke(); g.restore(); };
  srand(61); const TC = Array.from({ length: 7 }, () => [rr(-90, 90), rr(0, 40)]);
  return {
    home: HOME,
    anchors: [[60, 110], [540, 110], [60, 600]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3); const p0 = p(0), p1 = p(1), p2 = p(2);
      panel(g, 20, 70, 465, 475); panel(g, 515, 70, 465, 475); panel(g, 20, 570, 960, 345);
      txt(g, 'Schick (neutralizare)', 252, 102, 19, GOLD); txt(g, 'tuberculina PPD (alergică)', 748, 102, 19, '#d9c6ff');
      [[40, 0], [535, 1]].forEach(([ox, k]) => {
        g.save(); g.fillStyle = '#f3c29b'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(ox, 130, 425, 300, 40); g.fill(); g.stroke(); g.restore();
        hline(g, ox + 20, ox + 405, 395, '#c63a3a', 12); txt(g, 'vas de sânge', ox + 212, 418, 13, '#7a2a2a', { stroke: false, w: 700 });
      });
      // Schick
      const s1 = ease(seg(p0, 0, 0.2)), s2 = ease(seg(p0, 0.25, 0.85));
      [[150, true], [355, false]].forEach(([x, prot]) => {
        syr(g, x + 6, 230, 1 - seg(p0, 0.2, 0.3));
        if (!prot) { g.save(); g.globalAlpha = s2 * 0.8; g.fillStyle = '#e0473f'; g.beginPath(); g.ellipse(x, 245, 20 + 52 * s2, 14 + 34 * s2, 0, 0, 7); g.fill(); g.restore(); }
        for (let k = 0; k < 6; k++) { const an = k * 1.047; const tx = x + Math.cos(an) * 22 * s1, ty = 245 + Math.sin(an) * 14 * s1; dot(g, tx, ty, 5, '#9a6ad6', { alpha: s1 * (prot ? 1 - seg(p0, 0.6, 0.9) : 1), ow: 2 }); if (prot) Y(g, lerp(x + (k - 2.5) * 22, tx, s2), lerp(390, ty + 16, s2), 0.5, 0, '#ffe08a', s2 > 0 ? 1 : 0); }
        txt(g, prot ? 'fără eritem\nprotejat (are Ac)' : 'eritem\nreceptiv', x, 480, 16, prot ? GREEN : RED, { w: 800, alpha: Math.max(0.35, seg(p0, 0.6, 1)) });
      });
      // PPD
      const r1 = ease(seg(p1, 0, 0.15)), r2 = ease(seg(p1, 0.2, 0.85));
      [[645, true], [850, false]].forEach(([x, cont]) => {
        syr(g, x + 6, 230, 1 - seg(p1, 0.15, 0.25));
        dot(g, x, 245, 6, '#b7d2ff', { alpha: r1 * (1 - r2 * 0.5), ow: 2 });
        if (cont) {
          g.save(); g.globalAlpha = r2; g.fillStyle = '#e08070'; g.beginPath(); g.ellipse(x, 245, 16 + 40 * r2, 12 + 28 * r2, 0, 0, 7); g.fill(); g.strokeStyle = '#a83a30'; g.lineWidth = 4; g.stroke(); g.fillStyle = '#c94a3a'; g.beginPath(); g.ellipse(x, 245, 10 + 20 * r2, 8 + 14 * r2, 0, 0, 7); g.fill(); g.restore();
          TC.forEach(([dx, dy], i) => { const v = ease(seg(p1, 0.15 + i * 0.04, 0.6 + i * 0.04)); lymphocyte(g, lerp(x + dx, x + Math.cos(i) * 34, v), lerp(390 - dy, 245 + Math.sin(i) * 22, v), 0.32, t); });
        }
        txt(g, cont ? 'indurație\ncontact / vaccinat' : 'nimic\nde vaccinat', x, 480, 16, cont ? '#ffb4a8' : CREAM, { w: 800, alpha: Math.max(0.35, seg(p1, 0.6, 1)) });
      });
      // ceasul: maximul la ~48 h
      const cx = 940, cy = 165; ell(g, cx, cy, 24, 24, '#fff3e6', { ow: 4 }); const ha = -Math.PI / 2 + r2 * Math.PI * 4; g.save(); g.strokeStyle = OUT; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(ha) * 17, cy + Math.sin(ha) * 17); g.stroke(); g.restore();
      txt(g, '~48 h', cx - 10, cy + 42, 15, '#d9c6ff', { w: 800 });
      txt(g, 'limfocite T', 755, 360, 13, '#4a3aa8', { stroke: false, w: 800, alpha: r2 });
      txt(g, '↔ citire inversă', 500, 557, 18, C.hi);
      // boala experimentală
      txt(g, 'boala experimentală: animale de laborator', 500, 600, 19, GOLD);
      mouse(g, 130, 690); gpig(g, 270, 690); rabbit(g, 400, 700);
      txt(g, 'șoareci · cobai · iepuri', 265, 768, 15, CREAM, { w: 700 });
      txt(g, '„germ free” / gnotobiotice', 265, 800, 15, CREAM, { w: 700 });
      txt(g, 'alese după receptivitate', 265, 832, 15, DIM, { w: 700 });
      const CH = [['inoculare\n(diverse căi)', 590], ['supraveghere', 745], ['autopsie', 900]];
      CH.forEach(([s, x], k) => { const a = seg(p2, k * 0.25, k * 0.25 + 0.25); pill(g, x, 690, 138, 64, a > 0 ? '#bdf0cf' : '#3a2f2a', s, { size: 15, col: a > 0 ? OUT : DIM, glow: a * (on(b, 2) ? 0.8 : 0) }); if (k) arr(g, x - 92, 690, x - 74, 690, CREAM, 4, 0.8); });
      txt(g, 'scop: diagnostic (izolare, patogenitate)\nvaccinuri · cercetare', 745, 805, 16, CREAM, { w: 700, alpha: Math.max(0.4, seg(p2, 0.7, 1)) });
    },
  };
}
