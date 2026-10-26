// Partea C: anomaliile cromozomiale — clasificarea (cariotip), ploidia, nondisjuncția, trisomiile, anomaliile structurale,
// microdeleția 15q, cromozomii sexuali, Turner vs. Klinefelter.
import {
  cam, HOME, C, K, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead,
  OUT, clamp, lerp, ease, paint, blob, bb, smooth, REDUCED,
  chromo, cellB, dividing, sperm, oocyte, polar, body, person, srand, rr,
} from './k1.js';

const sp = (u, a, b) => ease(clamp((u - a) / (b - a)));
const KAR = '#e9dcff', KARS = '#b9a3ea';

/* =================================================== CLASIFICAREA, pe un cariotip (22 de perechi + XY)
   Se vede: cariotipul normal 46,XY (perechile 1–22 în ordinea mărimii, apoi X și Y). 1 = numeric: un al treilea 21 cade în
   perechea 21 → 47 (trisomie); 2 = structural: un segment din brațul scurt al lui 5 se rupe și pleacă (5p−);
   3 = autozomale: se aprind perechile 1–22 (Down 21, Edwards 18, Patau 13, cri-du-chat 5p−);
   4 = sexuali: se aprinde perechea XY (Turner XO, Klinefelter XXY, XXX, XYY). Jos, cele 2 întrebări. */
export function classif() {
  const ROWS = [[1, 5], [6, 12], [13, 18], [19, 22]]; const RY = [170, 330, 480, 620];
  const len = (k) => 74 - k * 2.3; const cenOf = (k) => ([13, 14, 15, 21, 22].includes(k) ? 0.14 : k <= 3 ? 0.45 : 0.33);
  const POS = {};
  ROWS.forEach(([a, c], r) => { const n = c - a + 1 + (r === 3 ? 1 : 0); const w = 860 / n; for (let k = a; k <= c; k++) POS[k] = [90 + w * (k - a + 0.5), RY[r]]; if (r === 3) POS.XY = [90 + w * (n - 0.5), RY[r]]; });
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[POS[21][0] + 62, POS[21][1] + 42], [POS[5][0] - 72, POS[5][1] + 34], [POS[1][0] - 60, POS[1][1] - 60], [POS.XY[0] - 70, POS.XY[1] - 60]],
    phase: (i) => ['I.A numerice', 'I.B structurale', 'II.A autozomale', 'II.B sexuali'][i] || '46,XY',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1);
      const auto = on(b, 2) ? 1 : 0, sex = on(b, 3) ? 1 : 0;
      for (let k = 1; k <= 22; k++) {
        const [x, y] = POS[k]; const h = len(k);
        const hot = auto || (b.i < 0 && [21, 18, 13, 5].includes(k));
        if (auto) { g.save(); g.globalAlpha = 0.18 + 0.1 * Math.sin(t * 3 + k); g.fillStyle = C.hi; g.beginPath(); g.roundRect(x - 26, y - h / 2 - 12, 52, h + 24, 12); g.fill(); g.restore(); }
        const del = k === 5 ? p1 : 0;
        [-1, 1].forEach((s, j) => {
          if (k === 5 && j === 1 && del > 0) {
            // cromozomul 5 cu brațul scurt rupt: rămâne partea de jos; fragmentul pleacă
            const cut = 0.2; chromo(g, x + s * 11, y + h * cut / 2, h * (1 - cut), KAR, { dup: true, w: 7, cen: (cenOf(k) - cut) / (1 - cut), sc: KARS });
            const fx = x + s * 11 + 40 * del, fy = y - h / 2 + h * cut / 2 - 30 * del;
            chromo(g, fx, fy, h * cut, '#ffb15c', { dup: true, w: 7, cen: 0.99, alpha: 1 - sp(del, 0.6, 1), rot: del });
          } else chromo(g, x + s * 11, y, h, KAR, { dup: true, w: 7, cen: cenOf(k), sc: KARS });
        });
        txt(g, String(k), x, y + h / 2 + 18, 14, hot ? C.hi : '#d8c4b8', { w: 700 });
      }
      // al treilea 21 (numeric)
      if (p0 > 0) { const [x, y] = POS[21]; chromo(g, x + 34, lerp(y - 140, y, sp(p0, 0, 0.6)), len(21), K.extra, { dup: true, w: 7, cen: cenOf(21), glow: on(b, 0) ? 1 : 0 }); }
      // XY
      const [xx, xy] = POS.XY;
      if (sex) { g.save(); g.globalAlpha = 0.25 + 0.1 * Math.sin(t * 3); g.fillStyle = C.hi; g.beginPath(); g.roundRect(xx - 32, xy - 46, 64, 92, 12); g.fill(); g.restore(); }
      chromo(g, xx - 12, xy, 56, '#ffd0e6', { dup: true, w: 7, cen: 0.4 }); chromo(g, xx + 14, xy + 10, 26, '#bfe0ff', { dup: true, w: 7, cen: 0.3 });
      txt(g, 'X  Y', xx, xy + 52, 14, sex ? C.hi : '#d8c4b8', { w: 700 });
      // contorul
      pill(g, 870, 795, 170, 46, p0 > 0.5 ? K.extra : '#3a2a26', p0 > 0.5 ? '47 → trisomie' : '46 de cromozomi', { size: 17, col: p0 > 0.5 ? OUT : C.cream });
      // etichetele punctelor (pe desen)
      if (on(b, 0) || (b.i < 0 && p0 > 0.6)) txt(g, '+1 copie a lui 21', POS[21][0] - 10, POS[21][1] - 80, 17, '#ffc98a');
      if (p1 > 0.5) txt(g, '5p− (deleție)', POS[5][0], POS[5][1] - 88, 17, '#ffc98a', { alpha: sp(p1, 0.5, 1) });
      if (auto) [[21, 'Down'], [18, 'Edwards'], [13, 'Patau'], [5, 'cri-du-chat']].forEach(([k, n]) => { const [x, y] = POS[k]; pill(g, x, y - len(k) / 2 - 30, n.length * 9 + 26, 30, C.hi, n, { size: 14 }); });
      const LST = ['numerice: poliploidie · aneuploidie (trisomie, monosomie)', 'structurale: deleții · microdeleții · translocații', 'autozomale: Down (21) · Edwards (18) · Patau (13) · cri-du-chat (5p−)', 'sexuali: Turner (XO) · Klinefelter (XXY) · XXX · XYY'];
      if (b.i >= 0) txt(g, LST[b.i], 520, 702, 18, C.hi, { alpha: ease(clamp(b.bt * 1.5)) });
      // cele 2 întrebări
      const Q = [['ce s-a stricat?', [['numeric', 0], ['structural', 1]]], ['pe ce cromozom?', [['autozomal (1–22)', 2], ['sexual (X, Y)', 3]]]];
      Q.forEach(([q, opts], r) => {
        const y = 760 + r * 70; txt(g, q, 180, y, 18, C.cream, { align: 'right' });
        opts.forEach(([o, k], j) => pill(g, 330 + j * 260, y, 230, 46, b.i === k ? C.hi : '#3a2a26', o, { size: 17, col: b.i === k ? OUT : C.cream, glow: b.i === k ? 0.8 : 0 }));
      });
      txt(g, '50% dintre produșii de concepție → avort spontan', 700, 900, 16, '#d8c4b8', { w: 700 });
      if (on(b, 0)) ring(g, POS[21][0] + 10, POS[21][1], 60, 56, ease(b.bt * 1.4));
      if (on(b, 1)) ring(g, POS[5][0] + 20, POS[5][1] - 10, 60, 64, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== PLOIDIA (3 cromozomi reprezentativi; fiecare bară = o copie)
   Fiecare caz e o celulă întreagă: citoplasmă cu mitocondrii, nucleu cu nucleol și setul de cromozomi (grupați pe tip).
   Sus, euploidie: n = gametul (ovocit cu zona pellucida), un set roșu · 2n = celulă somatică: setul albastru apare lângă cel
   roșu · 3n = al treilea set (portocaliu) apare → avort (celula se estompează, „×”).
   Jos, aneuploidie: 2n+1 = o copie portocalie în plus la UN singur cromozom → 47 · 2n−1 = o copie a unui cromozom dispare
   → 45; viabil doar 45,X. */
export function ploidy() {
  const L = [58, 46, 34]; const GX = [-62, 0, 62];
  const NUC = { n: [175, 290], d: [500, 290], t: [825, 290], tri: [330, 690], mono: [670, 690] };
  const COLS = [K.mat, K.pat, K.extra];
  srand(9); const MITO = Array.from({ length: 7 }, (_, k) => [Math.cos(k * 0.9 + 0.3), Math.sin(k * 0.9 + 0.3), rr(0.6, 1.4)]);
  const grp = (g, x, y, copies, mv = () => [0, 0, 1]) => copies.forEach((n, k) => { for (let c = 0; c < n; c++) { const [dx, dy, a] = mv(k, c); chromo(g, x + GX[k] + (c - (n - 1) / 2) * 16 + dx, y + dy, L[k], COLS[c], { w: 9, alpha: a }); } });
  const cellDraw = (g, x, y, t, o = {}) => {
    const a = o.alpha ?? 1;
    if (o.gamete) oocyte(g, x, y, 112, t, { alpha: a, glow: o.glow });
    else { cellB(g, x, y, 140, 118, t, { alpha: a, seed: x, glow: o.glow }); g.save(); g.globalAlpha = a; MITO.forEach(([cx, cy, r], k) => ell(g, x + cx * 112, y + cy * 92, 13 * r, 6 * r, '#f2a07a', { rot: k, ow: 2.5 })); g.restore(); }
    g.save(); g.globalAlpha = a; const q = blob(x, y, 102, 76, 0, t, 0.03, 16, 2); g.fillStyle = K.nuc; g.fill(q); g.strokeStyle = K.nucS; g.lineWidth = 3; g.stroke(q); dot(g, x + 70, y - 46, 10, '#b9a3ea', { ow: 0 }); g.restore();
  };
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[NUC.n[0] - 95, NUC.n[1] - 120], [NUC.d[0] - 120, NUC.d[1] - 120], [NUC.t[0] - 120, NUC.t[1] - 120], [500, 650]],
    phase: (i) => ['haploid: n', 'diploid: 2n', 'poliploid: 3n', 'aneuploid: 2n ± 1'][i] || 'câte seturi',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const A = (k) => Math.max(p(k), b.i < 0 ? 1 : 0);
      txt(g, 'EUPLOIDIE · seturi întregi', 500, 112, 20, '#ffd6c4'); txt(g, 'ANEUPLOIDIE · un cromozom', 500, 525, 20, '#ffd6c4');
      const tag = (x, y, s0, a, sub, sc) => { pill(g, x, y + 160, 220, 44, '#ffd6c4', s0, { size: 17, alpha: Math.max(0.35, a) }); if (sub) txt(g, sub, x, y + 204, 16, sc || C.cream, { alpha: Math.max(0.35, a) }); };
      // n: gametul
      cellDraw(g, ...NUC.n, t, { gamete: true, alpha: Math.max(0.35, A(0)), glow: on(b, 0) ? 0.8 : 0 }); grp(g, ...NUC.n, [1, 1, 1], () => [0, 0, Math.max(0.35, A(0))]); tag(...NUC.n, 'n = 23', A(0), 'gameții');
      // 2n
      cellDraw(g, ...NUC.d, t, { alpha: Math.max(0.35, A(1)), glow: on(b, 1) ? 0.8 : 0 }); grp(g, ...NUC.d, [2, 2, 2], (k, c) => (c === 1 ? [0, 0, A(1)] : [0, 0, Math.max(0.35, A(1))])); tag(...NUC.d, '2n = 46', A(1), 'celulele somatice');
      // 3n → avort
      const a2 = A(2);
      cellDraw(g, ...NUC.t, t, { alpha: Math.max(0.35, a2) * (1 - 0.35 * sp(a2, 0.7, 1)), glow: on(b, 2) ? 0.8 : 0 }); grp(g, ...NUC.t, [3, 3, 3], (k, c) => (c === 2 ? [0, 0, a2] : [0, 0, Math.max(0.35, a2)]));
      if (a2 > 0.7) { const q = sp(a2, 0.7, 1); g.save(); g.globalAlpha = q; g.strokeStyle = K.bad; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(NUC.t[0] + 90, NUC.t[1] - 120); g.lineTo(NUC.t[0] + 130, NUC.t[1] - 80); g.moveTo(NUC.t[0] + 130, NUC.t[1] - 120); g.lineTo(NUC.t[0] + 90, NUC.t[1] - 80); g.stroke(); g.restore(); }
      tag(...NUC.t, '3n = 69', a2, '→ de regulă avort', K.bad);
      // aneuploidii
      const a3 = A(3); const dimA = Math.max(0.5, a3);
      cellDraw(g, ...NUC.tri, t, { alpha: dimA, glow: on(b, 3) ? 0.6 : 0 }); grp(g, ...NUC.tri, [2, 3, 2], (k, c) => (k === 1 && c === 2 ? [0, 0, a3] : [0, 0, dimA]));
      cellDraw(g, ...NUC.mono, t, { alpha: dimA, glow: on(b, 3) ? 0.6 : 0 }); grp(g, ...NUC.mono, [2, 2, 2], (k, c) => (k === 1 && c === 1 ? [0, 0, dimA * (1 - a3)] : [0, 0, dimA]));
      tag(...NUC.tri, 'trisomie · 2n+1 = 47', dimA, 'Down 21 · Edwards 18 · Patau 13');
      tag(...NUC.mono, 'monosomie · 2n−1 = 45', dimA, 'viabilă doar 45,X (Turner)', C.hi);
    },
  };
}

/* =================================================== NONDISJUNCȚIA (o pereche: roșu matern + albastru patern, dublați)
   Același arbore, 3 moduri: 1 = normal: MI separă omologii (sus roșu, jos albastru), MII separă cromatidele → 4 gameți n;
   2 = în MI omologii NU se separă: o celulă primește ambii, cealaltă niciunul → gameții: n+1, n+1, n−1, n−1;
   3 = MI normal, în MII cromatidele unei celule NU se separă → n, n, n+1, n−1; 4 = gametul n+1 + spermatozoid n → zigot 47
   (trisomie); gametul n−1 + n → 45 (monosomie). */
export function nondis() {
  const M = [500, 165]; const D = [[300, 405], [700, 405]]; const G = [[190, 650], [410, 650], [590, 650], [810, 650]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[M[0] - 130, M[1] - 10], [D[0][0] - 110, D[0][1] - 60], [D[1][0] + 110, D[1][1] - 60], [500, 760]],
    phase: (i) => ['meioza normală', 'nondisjuncție în MI', 'nondisjuncție în MII', 'fecundația'][i] || 'o pereche nu se desparte',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const mode = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 5) % 3 : b.i === 3 ? 2 : b.i;
      const u = b.i < 0 ? clamp(((REDUCED ? 4.9 : t) % 5) / 3.6) : b.i === 3 ? 1 : p(b.i);
      const s1 = sp(u, 0.05, 0.45), s2 = sp(u, 0.5, 0.88), lab = sp(u, 0.85, 1);
      // celula-mamă
      cellB(g, M[0], M[1], 92, 84, t, { seed: 1 });
      chromo(g, M[0] - 20, M[1], 64, K.mat, { dup: true, w: 10 }); chromo(g, M[0] + 22, M[1], 64, K.pat, { dup: true, w: 10 });
      txt(g, '2n', M[0] + 120, M[1], 20, C.cream);
      txt(g, 'meioza I', 500, 290, 18, '#ffd6c4'); txt(g, 'meioza II', 500, 535, 18, '#ffd6c4');
      // conținutul celulelor după MI
      const dCont = mode === 1 ? [[K.mat, K.pat], []] : [[K.mat], [K.pat]];
      D.forEach(([x, y], j) => {
        if (s1 <= 0) return;
        arr(g, M[0] + (j ? 60 : -60), M[1] + 70, lerp(M[0], x, 0.82), lerp(M[1], y, 0.78), '#fff3e6', 4, s1);
        const X = lerp(M[0], x, s1), Y = lerp(M[1], y, s1);
        cellB(g, X, Y, 70, 66, t, { seed: 3 + j, alpha: s1 });
        dCont[j].forEach((c, k) => chromo(g, X + (dCont[j].length > 1 ? (k ? 18 : -18) : 0), Y, 56, c, { dup: true, w: 9, alpha: s1 }));
      });
      // gameții
      const gc = mode === 0 ? [[K.mat], [K.mat], [K.pat], [K.pat]]
        : mode === 1 ? [[K.mat, K.pat], [K.mat, K.pat], [], []]
          : [[K.mat], [K.mat], [K.pat, K.pat], []];
      const gl = mode === 0 ? ['n', 'n', 'n', 'n'] : mode === 1 ? ['n+1', 'n+1', 'n−1', 'n−1'] : ['n', 'n', 'n+1', 'n−1'];
      const bad = (k) => gl[k] !== 'n';
      G.forEach(([x, y], k) => {
        if (s2 <= 0) return;
        const par = D[k >> 1];
        arr(g, par[0] + (k % 2 ? 40 : -40), par[1] + 62, lerp(par[0], x, 0.85), lerp(par[1], y, 0.8), '#fff3e6', 4, s2);
        const X = lerp(par[0], x, s2), Y = lerp(par[1], y, s2);
        cellB(g, X, Y, 60, 58, t, { seed: 6 + k, alpha: s2, fill: lab > 0.5 && bad(k) ? '#ffd0c8' : K.cyt });
        gc[k].forEach((c, j) => chromo(g, X + (gc[k].length > 1 ? (j ? 14 : -14) : 0), Y, 50, c, { w: 9, alpha: s2 }));
        if (lab > 0) pill(g, x, y + 92, 84, 38, bad(k) ? K.bad : K.ok, gl[k], { size: 19, alpha: lab });
      });
      if (lab > 0 && mode === 1) txt(g, 'toți 4 gameții sunt anormali', 500, 800, 20, C.hi, { alpha: lab });
      if (lab > 0 && mode === 2 && b.i !== 3) txt(g, '2 normali · 1 × n+1 · 1 × n−1', 500, 800, 20, C.hi, { alpha: lab });
      // fecundația (punctul 4)
      if (b.i === 3) {
        const q = p(3);
        [[G[2], '+ n → zigot 47 = TRISOMIE', 0], [G[3], '+ n → zigot 45 = MONOSOMIE', 1]].forEach(([[x], s, k]) => {
          const y0 = 830 + k * 0; const xx = k ? 690 : 310;
          sperm(g, lerp(xx - 200, xx - 70, sp(q, 0.1 + k * 0.2, 0.5 + k * 0.2)), y0, 0.5, 0, t, { alpha: sp(q, 0.05 + k * 0.2, 0.3 + k * 0.2) });
          cellB(g, xx, y0, 40, 38, t, { seed: 30 + k, alpha: sp(q, 0.4 + k * 0.2, 0.6 + k * 0.2), fill: '#ffd0c8' });
          txt(g, k ? '45' : '47', xx, y0, 22, OUT, { stroke: false, alpha: sp(q, 0.5 + k * 0.2, 0.7 + k * 0.2) });
          txt(g, k ? 'n−1 + n → MONOSOMIE' : 'n+1 + n → TRISOMIE', xx + (k ? 0 : 0), y0 + 64, 18, C.hi, { alpha: sp(q, 0.55 + k * 0.2, 0.8 + k * 0.2) });
          lead(g, x, 760, xx - 30, y0 - 40, sp(q, 0, 0.3));
        });
      }
      if (on(b, 1)) ring(g, lerp(M[0], D[0][0], s1), lerp(M[1], D[0][1], s1), 100, 90, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, lerp(D[1][0], (G[2][0] + G[3][0]) / 2, s2), lerp(D[1][1], G[2][1], s2), lerp(100, 200, s2), 90, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== TRISOMIILE AUTOZOMALE: 21 / 18 / 13 + semnul-cheie
   Sus: cele 3 perechi cu copia în plus (verde). În centru, semnul de recunoaștere din LP, mare: 1 = Down: palma cu UN pliu
   palmar transversal; 2 = Edwards: pumnul strâns, degetul arătător suprapus peste mijlociu; 3 = Patau: buza superioară cu
   despicătură care urcă spre nas. */
export function trisomy() {
  const TRI = [[21, 230, 40, 0.16, 'trisomia 21 · Down'], [18, 500, 52, 0.3, 'trisomia 18 · Edwards'], [13, 770, 58, 0.16, 'trisomia 13 · Patau']];
  const HX = 600, HY = 560;
  const hand = (g, s, crease) => {
    g.save(); g.translate(HX, HY); g.scale(s, s);
    const sk = K.skin; const ow = 6;
    [[-78, -150, 34, 120], [-28, -190, 34, 150], [22, -180, 34, 142], [70, -140, 30, 112]].forEach(([x, y, w, h]) => { const p = new Path2D(); p.roundRect(x - w / 2, y, w, h + 40, w / 2); paint(g, p, sk, K.skinS, K.skinL, [x - w / 2, y, w, h], OUT, ow); });
    const palm = new Path2D(); palm.moveTo(-100, -40); palm.bezierCurveTo(-110, 80, -70, 160, 0, 170); palm.bezierCurveTo(80, 170, 104, 80, 96, -50); palm.bezierCurveTo(60, -70, -60, -70, -100, -40); palm.closePath();
    paint(g, palm, sk, K.skinS, K.skinL, [-110, -70, 210, 240], OUT, ow);
    tube(g, [[-96, 40], [-150, -10], [-176, -70]], 40, sk, { ow });
    // pliul palmar transversal unic (Down)
    if (crease > 0) { g.save(); g.globalAlpha = crease; g.strokeStyle = '#8a3b2a'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(-96, 10); g.bezierCurveTo(-40, -4, 30, -2, 94, 6); g.stroke(); g.restore(); }
    g.restore();
  };
  const fist = (g, s) => {
    g.save(); g.translate(HX, HY + 30); g.scale(s, s); const sk = K.skin; const ow = 6;
    // pumnul (fața palmară): degetele flectate se văd ca 4 perne verticale, sub ele policele culcat
    const f = new Path2D(); f.roundRect(-118, -70, 236, 180, 64); paint(g, f, sk, K.skinS, K.skinL, [-118, -70, 236, 180], OUT, ow);
    const pad = (x, y, w, h, r = 0) => { g.save(); g.translate(x, y); g.rotate(r); const p = new Path2D(); p.roundRect(-w / 2, -h / 2, w, h, w / 2); paint(g, p, sk, K.skinS, K.skinL, [-w / 2, -h / 2, w, h], OUT, ow); g.restore(); };
    pad(88, -40, 50, 100); pad(32, -62, 54, 118); pad(-26, -66, 54, 122);
    // degetul arătător (stânga) suprapus PESTE mijlociu
    pad(-62, -60, 54, 116, 0.42);
    tube(g, [[-110, 60], [-40, 70], [20, 48]], 46, sk, { ow });
    g.restore();
  };
  const lip = (g, s, cleft) => {
    g.save(); g.translate(HX, HY); g.scale(s, s); const ow = 6;
    [-1, 1].forEach((d) => ell(g, d * 206, 70, 30, 46, K.skin, { ow, shade: K.skinS, rot: d * 0.2 }));
    const face = new Path2D(); face.ellipse(0, -10, 210, 230, 0, 0, 7); paint(g, face, K.skin, K.skinS, K.skinL, [-210, -240, 420, 460], OUT, ow);
    // nasul
    const n = new Path2D(); n.moveTo(-40, -40); n.bezierCurveTo(-46, 10, -20, 30, 0, 30); n.bezierCurveTo(20, 30, 46, 10, 40, -40); g.save(); g.strokeStyle = OUT; g.lineWidth = ow; g.stroke(n); g.restore();
    dot(g, -18, 22, 7, '#8a3b2a', { ow: 0 }); dot(g, 18, 22, 7, '#8a3b2a', { ow: 0 });
    // gura cu buza superioară despicată (stânga), despicătura urcă spre nară
    const up = new Path2D(); up.moveTo(-90, 110); up.bezierCurveTo(-60, 80, -36, 86, -26, 96); up.lineTo(-26 + 4 * cleft, 96 - 60 * cleft); up.lineTo(-10 + 4 * cleft, 96 - 60 * cleft); up.lineTo(-6, 96); up.bezierCurveTo(10, 84, 60, 80, 90, 110); up.bezierCurveTo(40, 120, -40, 120, -90, 110); up.closePath();
    paint(g, up, '#e8848a', '#c45c64', null, [-90, 36, 180, 84], OUT, ow);
    const low = new Path2D(); low.moveTo(-80, 118); low.bezierCurveTo(-40, 160, 40, 160, 80, 118); low.bezierCurveTo(40, 130, -40, 130, -80, 118); low.closePath();
    paint(g, low, '#e8848a', '#c45c64', null, [-80, 118, 160, 42], OUT, ow);
    if (cleft > 0) { g.save(); g.fillStyle = '#5a1e2a'; g.globalAlpha = cleft; g.beginPath(); g.moveTo(-24, 100); g.lineTo(-24 + 4 * cleft, 100 - 58 * cleft); g.lineTo(-12 + 4 * cleft, 100 - 58 * cleft); g.lineTo(-8, 100); g.closePath(); g.fill(); g.restore(); }
    // ochii închiși
    [[-80, -80], [80, -80]].forEach(([x, y]) => { g.save(); g.strokeStyle = OUT; g.lineWidth = ow; g.lineCap = 'round'; g.beginPath(); g.arc(x, y, 26, 0.3, Math.PI - 0.3); g.stroke(); g.restore(); });
    g.restore();
  };
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[TRI[0][1] - 90, 150], [TRI[1][1] - 90, 150], [TRI[2][1] - 90, 150]],
    phase: (i) => ['Down · trisomia 21', 'Edwards · trisomia 18', 'Patau · trisomia 13'][i] || 'un cromozom în plus',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3);
      const show = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 3.2) % 3 : b.i;
      TRI.forEach(([n, x, h, cen, name], k) => {
        const act = k === show; const a = act ? 1 : 0.45;
        chromo(g, x - 40, 200, h * 1.4, K.mat, { dup: true, w: 11, cen, alpha: a }); chromo(g, x, 200, h * 1.4, K.pat, { dup: true, w: 11, cen, alpha: a });
        const drop = act ? (b.i < 0 ? 1 : sp(p(k), 0, 0.4)) : 1;
        chromo(g, x + 40, lerp(110, 200, drop), h * 1.4, K.extra, { dup: true, w: 11, cen, alpha: a, glow: act ? 0.8 : 0 });
        txt(g, name, x, 290, 18, act ? C.hi : '#d8c4b8');
      });
      const u = b.i < 0 ? 1 : sp(p(show), 0.2, 0.9);
      if (show === 0) { hand(g, 1.15, u); if (u > 0.5) { lead(g, HX + 60, HY + 12, 860, 470, 1); txt(g, 'pliu palmar\ntransversal unic', 860, 430, 19, C.cream); } }
      if (show === 1) { fist(g, 1.2); if (u > 0.4) { lead(g, HX - 40, HY - 120, 860, 420, 1); txt(g, 'pumn strâns,\ndegete suprapuse', 860, 380, 19, C.cream); } }
      if (show === 2) { lip(g, 1.0, u); if (u > 0.5) { lead(g, HX - 20, HY + 70, 870, 760, 1); txt(g, 'despicătură\nde buză / palat', 870, 800, 19, C.cream); } }
      if (b.i >= 0) ring(g, TRI[b.i][1], 200, 90, 80, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== ANOMALIILE STRUCTURALE (patru panouri, zoom pe fiecare)
   1 = deleția 5p−: vârful brațului scurt al lui 5 (sus) se rupe și pleacă. 2 = microdeleția 15q: un segment mic din brațul lung
   al lui 15, sub centromer, dispare; o lupă arată că se vede doar la rezoluție înaltă. 3 = translocația reciprocă t(9;22):
   vârful MIC al 9q (mov) trece pe 22, partea MARE a 22q (verde) trece pe 9 → der(9) mai lung, der(22) = Philadelphia, mai scurt.
   4 = translocația 13/14 (robertsoniană): brațele scurte se pierd, brațele lungi se unesc la centromer într-UN cromozom → 45. */
export function struct() {
  const Q = [[250, 270], [750, 270], [250, 700], [750, 700]];
  const C9 = '#b9a3ea', C22 = '#7fe0a8', C13 = '#ffd166', C14 = '#7fc8ff';
  return {
    home: HOME, cams: Q.map(([x, y]) => cam(x, y + 6, 1.8)),
    anchors: [[Q[0][0] - 165, Q[0][1] - 120], [Q[1][0] - 165, Q[1][1] - 120], [Q[2][0] - 165, Q[2][1] - 120], [Q[3][0] - 165, Q[3][1] - 120]],
    phase: (i) => ['deleție · 5p−', 'microdeleție · 15q', 'translocație · t(9;22)', 'translocație 13/14'][i] || 'cromozomul se rupe',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      // fiecare panou = un nucleu (anvelopă cu pori, cromatină), cu cromozomii lui
      const showP = (k) => b.i < 0 || b.i === k; // la zoom se desenează doar panoul curent (fără margini de la vecini)
      Q.forEach(([x, y], k) => { if (!showP(k)) return; const nb = blob(x, y + 6, 218, 186, 0.05 * k, t, 0.03, 18, k); paint(g, nb, '#3a2a52', '#2e2142', '#5a4680', bb(x, y, 218, 186), '#8a6fc0', 5); srand(30 + k); for (let j = 0; j < 40; j++) dot(g, x + rr(-180, 180), y + rr(-150, 160), rr(2, 4), '#6b55a0', { ow: 0, alpha: 0.6 }); for (let j = 0; j < 14; j++) { const q = j / 14 * Math.PI * 2; dot(g, x + Math.cos(q) * 214, y + 6 + Math.sin(q) * 182, 4, '#1d1220', { ow: 0 }); } });
      const u = (k) => (b.i < 0 ? p(k) : b.i === k ? p(k) : b.i > k ? 1 : 0);
      const spark = (x, y, a) => { if (a <= 0.02) return; g.save(); g.globalAlpha = a; g.strokeStyle = C.hi; g.lineWidth = 5; g.shadowColor = C.hi; g.shadowBlur = 18; g.lineJoin = 'round'; g.beginPath(); g.moveTo(x - 26, y - 10); g.lineTo(x - 8, y + 4); g.lineTo(x - 2, y - 8); g.lineTo(x + 12, y + 8); g.lineTo(x + 26, y - 4); g.stroke(); g.restore(); };
      const flash = (d, a0, a1) => Math.sin(clamp((d - a0) / (a1 - a0)) * Math.PI);
      /* 1 · 5p− */
      if (showP(0)) { const [x, y] = Q[0]; const d = u(0); const h = 170, cut = 0.16, cen = 0.3;
        chromo(g, x - 70, y, h, KAR, { dup: true, w: 14, cen, sc: KARS, label: '5 normal', ls: 16 });
        chromo(g, x + 70, y + h * cut / 2 * d, h * (1 - cut * d), KAR, { dup: true, w: 14, cen: (cen - cut * d) / (1 - cut * d), sc: KARS });
        chromo(g, x + 70 + 70 * d, y - h / 2 + h * cut / 2 - 40 * d, h * cut, '#ffb15c', { dup: true, w: 14, cen: 0.99, alpha: 1 - sp(d, 0.7, 1), rot: 0.8 * d });
        spark(x + 70, y - h / 2 + h * cut, flash(d, 0, 0.35));
        txt(g, '5p−', x + 70, y + h / 2 + 22, 18, d > 0.5 ? C.hi : C.cream);
        txt(g, 'DELEȚIE', x, y - 172, 18, '#ffd6c4'); }
      /* 2 · microdeleția 15q */
      if (showP(1)) { const [x, y] = Q[1]; const d = u(1); const h = 160, cen = 0.14;
        chromo(g, x - 60, y, h, KAR, { dup: true, w: 14, cen, sc: KARS, segL: [[0.2, 0.3, '#ffb15c']], segR: [[0.2, 0.3, '#ffb15c']] });
        chromo(g, x + 40, y, h, KAR, { dup: true, w: 14, cen, sc: KARS, segL: [[0.2, 0.3, d > 0.5 ? '#1a1018' : '#ffb15c']], segR: [[0.2, 0.3, d > 0.5 ? '#1a1018' : '#ffb15c']] });
        // lupa
        const lx = x + 150, ly = y - 60; const la = sp(d, 0.3, 0.8);
        if (la > 0) { g.save(); g.globalAlpha = la; lead(g, x + 52, y - 50, lx - 50, ly, 1); ell(g, lx, ly, 56, 56, '#1d1220', { ow: 5, sc: '#ffe7d6' }); g.restore(); chromo(g, lx, ly + 10, 110, KAR, { dup: true, w: 12, cen: 0.05, sc: KARS, alpha: la, segL: [[0.18, 0.4, '#1a1018']], segR: [[0.18, 0.4, '#1a1018']] }); tube(g, [[lx + 52, ly + 52], [lx + 80, ly + 80]], 12, '#c9b3a6', { ow: 4, alpha: la }); }
        spark(x + 40, y - 80 + 160 * 0.25, flash(d, 0.2, 0.5));
        txt(g, '15q11–q13', x - 10, y + 110, 17, C.cream); txt(g, 'MICRODELEȚIE', x, y - 172, 18, '#ffd6c4');
        if (d > 0.6) txt(g, 'doar la rezoluție înaltă', x + 120, y + 150, 16, C.hi); }
      /* 3 · t(9;22) */
      if (showP(2)) { const [x, y] = Q[2]; const d = u(2); const h9 = 170, h22 = 80; const tip9 = 0.12, keep22 = 0.42;
        txt(g, 'TRANSLOCAȚIE RECIPROCĂ', x, y - 172, 18, '#ffd6c4');
        const m = sp(d, 0.25, 0.75);
        spark(x - 70, y + h9 / 2 - h9 * tip9, flash(d, 0, 0.25)); spark(x + 70, y - h22 / 2 + h22 * keep22, flash(d, 0, 0.25));
        // cromozomul 9: pierde vârful q (jos), primește partea mare a 22q
        const L9 = h9 * (1 - tip9) + h22 * (1 - keep22) * m; const L22 = h22 * keep22 + h9 * tip9 * m;
        chromo(g, x - 70, y + (L9 - h9) / 2, L9, C9, { dup: true, w: 14, splay: 0, sep: 10, cen: 0.35 * h9 / L9, segL: m > 0 ? [[h9 * (1 - tip9) / L9, 1, C22]] : [], segR: m > 0 ? [[h9 * (1 - tip9) / L9, 1, C22]] : [] });
        chromo(g, x + 70, y - (h22 - L22) / 2, L22, C22, { dup: true, w: 14, splay: 0, sep: 10, cen: 0.22 * h22 / L22, segL: m > 0 ? [[h22 * keep22 / L22, 1, C9]] : [], segR: m > 0 ? [[h22 * keep22 / L22, 1, C9]] : [] });
        // piesele în zbor
        if (d > 0 && d < 0.75) { const f = sp(d, 0, 0.5) * (1 - sp(d, 0.5, 0.75));
          chromo(g, lerp(x - 70, x + 70, sp(d, 0.1, 0.6)), lerp(y + h9 / 2 - h9 * tip9 / 2, y + 40, sp(d, 0.1, 0.6)) + 30 * Math.sin(d * 6), h9 * tip9, C9, { dup: true, w: 14, splay: 0, sep: 10, cen: 0.01, alpha: f });
          chromo(g, lerp(x + 70, x - 70, sp(d, 0.1, 0.6)), lerp(y + h22 / 2, y + 110, sp(d, 0.1, 0.6)) - 30 * Math.sin(d * 6), h22 * (1 - keep22), C22, { dup: true, w: 14, splay: 0, sep: 10, cen: 0.01, alpha: f }); }
        txt(g, m > 0.9 ? 'der(9) · mai lung' : '9', x - 70, y + 150, 17, C.cream); txt(g, m > 0.9 ? 'Ph = 22 scurtat' : '22', x + 70, y + 150, 17, m > 0.9 ? C.hi : C.cream); }
      /* 4 · 13/14 */
      if (showP(3)) { const [x, y] = Q[3]; const d = u(3); const h = 140, cen = 0.1; const f = sp(d, 0.35, 0.85);
        txt(g, 'TRANSLOCAȚIE 13/14', x, y - 172, 18, '#ffd6c4');
        spark(x, y - 20, flash(d, 0.3, 0.6));
        if (f < 0.98) {
          chromo(g, lerp(x - 60, x - 6, f), lerp(y, y + 30, f), h, C13, { dup: true, w: 14, cen, rot: lerp(0, -0.25, f), segL: [[0, cen, d > 0.2 ? 'rgba(0,0,0,0)' : C13]], segR: [[0, cen, C13]] });
          chromo(g, lerp(x + 60, x + 6, f), lerp(y, y - 30, f), h, C14, { dup: true, w: 14, cen, rot: lerp(0, Math.PI + 0.25, f) });
          // brațele scurte se pierd
          [[x - 60, y - h / 2 + 4, C13], [x + 60, y - h / 2 + 4, C14]].forEach(([px, py, c], k) => { const q = sp(d, 0.05, 0.4); dot(g, px + (k ? 40 : -40) * q, py - 50 * q, 9, c, { alpha: 1 - q }); });
        } else {
          chromo(g, x, y, h * 1.8, C13, { dup: true, w: 14, cen: 0.46, segL: [[0, 0.46, C14]], segR: [[0, 0.46, C14]] });
        }
        txt(g, f > 0.98 ? '1 cromozom: 13q + 14q' : '13      14', x, y + 150, 17, C.cream);
        if (f > 0.98) txt(g, '45 de cromozomi · purtător echilibrat (manual)', x, y + 180, 15, C.hi); }
    },
  };
}

/* =================================================== MICRODELEȚIA 15q: același loc, alt părinte
   Perechea 15 mare: roșu = copia maternă, albastru = copia paternă; regiunea 15q11–q13 (sub centromer) marcată, cu un „bec”
   pe fiecare copie (gene active doar pe copia unui părinte — amprentare, manual). 1 = lipsește regiunea de pe copia MATERNĂ →
   becul matern se stinge → Angelman; 2 = lipsește regiunea de pe copia PATERNĂ → Prader-Willi; 3 = lupa pe aceeași regiune. */
export function imprint() {
  const MX = 480, PX = 700, Y = 430, H = 380, R0 = 0.22, R1 = 0.36;
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[MX - 90, 200], [PX + 90, 200], [870, 318]],
    phase: (i) => ['Angelman: lipsă maternă', 'Prader-Willi: lipsă paternă', '15q11–q13'][i] || 'aceeași regiune, alt părinte',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3);
      const delM = b.i === 0 ? sp(p(0), 0.2, 0.7) : 0, delP = b.i === 1 ? sp(p(1), 0.2, 0.7) : 0;
      const reg = (d, c) => [[R0, R1, d > 0.5 ? '#1a1018' : c]];
      chromo(g, MX, Y, H, K.mat, { dup: true, w: 24, cen: 0.14, segL: reg(delM, '#ffb15c'), segR: reg(delM, '#ffb15c') });
      chromo(g, PX, Y, H, K.pat, { dup: true, w: 24, cen: 0.14, segL: reg(delP, '#ffb15c'), segR: reg(delP, '#ffb15c') });
      txt(g, 'copia MATERNĂ', MX, Y + H / 2 + 34, 19, '#ffb0b8'); txt(g, 'copia PATERNĂ', PX, Y + H / 2 + 34, 19, '#bfe0ff');
      // becurile (gene active doar de pe un părinte)
      const bulb = (x, y, on1, col) => { g.save(); if (on1) { g.shadowColor = col; g.shadowBlur = 26; } ell(g, x, y, 18, 18, on1 ? col : '#4a3a3a', { ow: 4 }); g.restore(); };
      const yR = Y - H / 2 + H * (R0 + R1) / 2;
      bulb(MX - 80, yR, delM < 0.5, '#ffe36e'); bulb(PX + 80, yR, delP < 0.5, '#ffe36e');
      lead(g, MX - 62, yR, MX - 34, yR, 1); lead(g, PX + 62, yR, PX + 34, yR, 1);
      txt(g, '15q11–q13', 590, yR, 17, '#ffc98a');
      if (b.i === 0) { const a = sp(p(0), 0.5, 1); pill(g, 590, 140, 380, 50, C.hi, 'lipsește copia maternă → Angelman', { size: 18, alpha: a }); }
      if (b.i === 1) { const a = sp(p(1), 0.5, 1); pill(g, 590, 140, 400, 50, C.hi, 'lipsește copia paternă → Prader-Willi', { size: 18, alpha: a }); }
      if (b.i < 0) pill(g, 590, 140, 300, 50, '#3a2a26', 'P = patern → Prader-Willi', { size: 18, col: C.cream });
      if (b.i === 2) { const a = sp(p(2), 0.1, 0.6); g.save(); g.globalAlpha = a; ell(g, 870, 430, 90, 90, '#1d1220', { ow: 5, sc: '#ffe7d6' }); g.restore(); chromo(g, 870, 470, 200, KAR, { dup: true, w: 16, cen: 0.0, sc: KARS, alpha: a, segL: [[0.08, 0.3, '#ffb15c']], segR: [[0.08, 0.3, '#ffb15c']] }); tube(g, [[935, 495], [975, 535]], 14, '#c9b3a6', { ow: 4, alpha: a }); txt(g, 'rezoluție înaltă', 870, 555, 17, C.hi, { alpha: a }); lead(g, PX + 40, yR, 790, 420, a); }
      if (on(b, 0)) ring(g, MX, yR, 70, 50, ease(b.bt * 1.4));
      if (on(b, 1)) ring(g, PX, yR, 70, 50, ease(b.bt * 1.4));
    },
  };
}

/* ---------- iconițele abilităților: bula de vorbire (verbal) și cubul (spațial) ----------
   ok = normal (verde, plin); altfel portocaliu: bula cu „…” (vorbire întârziată) / cubul cu o fațetă lipsă (spațial scăzut). */
function bubble(g, x, y, ok, a, t) { g.save(); g.globalAlpha = a; const p = new Path2D(); p.roundRect(x - 26, y - 20, 52, 36, 12); p.moveTo(x - 10, y + 16); p.lineTo(x - 16, y + 28); p.lineTo(x + 2, y + 16); paint(g, p, ok ? K.ok : '#ff9a3d', null, null, [x - 26, y - 20, 52, 48], OUT, 3.5); if (ok) txt(g, 'abc', x, y - 2, 14, OUT, { stroke: false }); else for (let k = 0; k < 3; k++) dot(g, x - 12 + k * 12, y - 2, 3.5, OUT, { ow: 0, alpha: 0.4 + 0.6 * ((Math.floor((REDUCED ? 0 : t) * 3) % 3) >= k ? 1 : 0) }); g.restore(); }
function cube(g, x, y, ok, a) { g.save(); g.globalAlpha = a; const c = ok ? K.ok : '#ff9a3d'; const top = new Path2D(); top.moveTo(x, y - 22); top.lineTo(x + 20, y - 12); top.lineTo(x, y - 2); top.lineTo(x - 20, y - 12); top.closePath(); const lf = new Path2D(); lf.moveTo(x - 20, y - 12); lf.lineTo(x, y - 2); lf.lineTo(x, y + 22); lf.lineTo(x - 20, y + 12); lf.closePath(); const rt = new Path2D(); rt.moveTo(x + 20, y - 12); rt.lineTo(x, y - 2); rt.lineTo(x, y + 22); rt.lineTo(x + 20, y + 12); rt.closePath(); paint(g, lf, c, null, null, [x - 20, y - 12, 20, 34], OUT, 3); if (ok) paint(g, rt, c, null, null, [x, y - 12, 20, 34], OUT, 3); else { g.setLineDash([4, 4]); g.strokeStyle = c; g.lineWidth = 3; g.stroke(rt); g.setLineDash([]); } paint(g, top, ok ? '#a8ecc4' : '#ffc890', null, null, [x - 20, y - 22, 40, 20], OUT, 3); g.restore(); }

/* =================================================== CROMOZOMII SEXUALI: tabelul din LP, desenat ca oameni
   6 persoane pictate, în ordine: XX femeie · XY bărbat · XO Turner · XXY Klinefelter · XXX · XYY. Deasupra fiecăreia, cromozomii
   sexuali adevărați (X mare roz, Y mic albastru, dublați) și numărul lor; corpul arată sexul (cu Y → bărbat: umeri lați, păr
   scurt; fără Y → femeie: talie, șolduri, păr lung) și înălțimea relativă (Turner mai scundă, Klinefelter mai înalt).
   Sub picioare, cele două abilități din LP: bula (verbal) și cubul (spațial): verde = normal, portocaliu = întârziat / scăzut.
   Punctele aprind Turner (un X dispare: 2 → 1), Klinefelter, XXX, XYY (cromozomul în plus cade în set). */
export function sexchr() {
  const COL = [['XX', 'femeie', ['X', 'X'], 1, 1, 'f', 1], ['XY', 'bărbat', ['X', 'Y'], 1, 1, 'm', 1], ['XO', 'Turner', ['X'], 1, 0, 'f', 0.86], ['XXY', 'Klinefelter', ['X', 'X', 'Y'], 0, 1, 'm', 1.1], ['XXX', 'triplo X', ['X', 'X', 'X'], 0, 1, 'f', 1], ['XYY', 'XYY', ['X', 'Y', 'Y'], 0, 1, 'm', 1.04]];
  const cx = (k) => 95 + k * 162; const FY = 700;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[cx(2) + 58, 150], [cx(3) + 62, 150], [cx(4) + 62, 150], [cx(5) + 62, 150]],
    phase: (i) => ['Turner · 45,X', 'Klinefelter · 47,XXY', 'triplo X · 47,XXX', '47,XYY'][i] || 'cu Y → bărbat · fără Y → femeie',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      // podeaua
      g.save(); g.fillStyle = 'rgba(255,240,228,.06)'; g.beginPath(); g.ellipse(500, FY + 6, 500, 26, 0, 0, 7); g.fill(); g.restore();
      COL.forEach(([kar, name, chs, verb, spat, sex, h], k) => {
        const act = b.i >= 0 && b.i === k - 2; const a = b.i < 0 || act || k < 2 ? 1 : 0.55; const x = cx(k);
        if (act) { g.save(); g.globalAlpha = 0.12; g.fillStyle = C.hi; g.beginPath(); g.roundRect(x - 78, 92, 156, 820, 24); g.fill(); g.restore(); }
        txt(g, name, x, 115, 18, act ? C.hi : C.cream, { alpha: a });
        const u = act ? sp(p(k - 2), 0, 0.5) : 1;
        chs.forEach((c, j) => { const isNew = act && j === chs.length - 1 && chs.length === 3; const dx = (j - (chs.length - 1) / 2) * 36; chromo(g, x + dx, (c === 'X' ? 190 : 202) - (isNew ? 70 * (1 - u) : 0), c === 'X' ? 64 : 34, c === 'X' ? '#ffd0e6' : '#bfe0ff', { dup: true, w: 10, cen: c === 'X' ? 0.42 : 0.3, alpha: a * (isNew ? u : 1) }); });
        if (k === 2 && act) chromo(g, x + 28, 190 + 80 * u, 64, '#ffd0e6', { dup: true, w: 10, cen: 0.42, alpha: (1 - u) * 0.8 });
        txt(g, kar + ' · ' + chs.length, x, 250, 16, '#d8c4b8', { alpha: a, w: 800 });
        person(g, x, FY, 0.8, t + k, { sex, h, limb: k === 3 ? 1.1 : 1, shortNeck: k === 2, web: k === 2, broadChest: k === 2, breasts: sex === 'f' ? (k === 2 ? 0.25 : 0.9) : k === 3 ? 0.5 : 0, hips: k === 3 ? 0.6 : 0, alpha: a, hair: sex === 'f' ? '#7a4a2a' : '#4a3020' });
        bubble(g, x - 28, 770, verb, a, t); cube(g, x + 30, 772, spat, a);
        if (act || b.i < 0) txt(g, (verb ? 'verbal normal' : 'verbal întârziat') + '\n' + (spat ? 'spațial normal' : 'spațial scăzut'), x, 830, 13, verb && spat ? '#bff0d2' : '#ffc890', { alpha: act ? sp(p(k - 2), 0.4, 0.9) : 1, w: 700 });
      });
      // legenda iconițelor
      bubble(g, 330, 890, true, 0.9, t); txt(g, 'abilitatea verbală', 370, 890, 15, '#d8c4b8', { align: 'left', w: 700 });
      cube(g, 590, 892, true, 0.9); txt(g, 'abilitatea spațială', 625, 890, 15, '#d8c4b8', { align: 'left', w: 700 });
    },
  };
}

/* =================================================== TURNER vs. KLINEFELTER: două persoane pictate + lupe
   Stânga: femeia 45,X (Turner), scundă: în spate, conturul punctat al unei femei de înălțime normală. 1 = gât scurt cu pliuri
   (pterigium), torace lat în scut cu mameloane depărtate, statură mică; 2 = lupa pe pelvis: uter + ovare nedezvoltate (benzi albe).
   Dreapta: bărbatul 47,XXY (Klinefelter), înalt, membre lungi; în spate, conturul unui bărbat de înălțime normală. 3 = ginecomastie,
   barbă rară, brațe și picioare lungi, statură înaltă; 4 = lupa pe scrot: testicul mic (atrofie) lângă unul normal; grăsime cu
   distribuție feminină (șolduri). Poza din LP stă jos-stânga: Turner e mutată spre centru, nimic important sub poză. */
export function turnKlin() {
  const TX = 470, KX = 770, FY = 860; const ST = 1.45, SK = 1.35;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[TX - 140, 400], [110, 115], [KX - 120, 250], [915, 705]],
    phase: (i) => ['Turner · 45,X', 'Turner: ovarele', 'Klinefelter · 47,XXY', 'Klinefelter: testiculul'][i] || 'X lipsă vs. X în plus',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const aT = b.i < 0 || b.i <= 1 ? 1 : 0.6, aK = b.i < 0 || b.i >= 2 ? 1 : 0.6;
      person(g, TX, FY, ST, t, { sex: 'f', ghost: true });
      person(g, KX, FY, SK, t, { sex: 'm', ghost: true });
      const RT = person(g, TX, FY, ST, t, { sex: 'f', h: 0.8, shortNeck: true, web: true, broadChest: true, breasts: 0.2, alpha: aT, hair: '#7a4a2a' });
      const RK = person(g, KX, FY, SK, t + 1, { sex: 'm', h: 1.0, limb: 1.18, breasts: 0.6, hips: 0.7, beard: 0.9, alpha: aK, hair: '#4a3020' });
      const q0 = b.i < 0 ? 1 : b.i === 0 ? sp(p(0), 0.2, 0.8) : 0, q2 = b.i < 0 ? 1 : b.i === 2 ? sp(p(2), 0.2, 0.8) : 0;
      txt(g, '45,X · Turner', TX, RT.top[1] - 44, 20, '#ffd0e6', { alpha: aT }); txt(g, 'statură mică', TX, RT.top[1] - 18, 17, C.hi, { alpha: q0 });
      txt(g, '47,XXY · Klinefelter', KX, RK.top[1] - 44, 20, '#bfe0ff', { alpha: aK }); txt(g, 'statură înaltă', KX, RK.top[1] - 18, 17, C.hi, { alpha: q2 });
      txt(g, 'contur punctat = înălțime obișnuită', 640, 905, 15, '#d8c4b8', { w: 700 });
      const L = (s0, x0, y0, x1, y1, a, al = 'right') => { if (a <= 0.01) return; lead(g, x0, y0, x1, y1, a); txt(g, s0, x1 + (al === 'right' ? -8 : 8), y1, 17, C.cream, { alpha: a, align: al }); };
      // 1 · Turner (etichetele în stânga, deasupra pozei)
      L('gât scurt (pliuri)', RT.neck[0] - 24, RT.neck[1], 330, RT.neck[1] - 46, q0); L('torace lat', RT.chestL[0], RT.chestL[1], 330, RT.chestL[1] + 6, q0);
      // 2 · Turner: lupa pe ovare
      const q1 = b.i === 1 ? sp(p(1), 0.1, 0.6) : b.i < 0 ? 1 : 0;
      if (q1 > 0) {
        lead(g, RT.groin[0], RT.groin[1] - 30, 270, 250, q1);
        g.save(); g.globalAlpha = q1; ell(g, 200, 215, 100, 100, '#1d1220', { ow: 5, sc: '#ffe7d6' }); g.restore();
        const ux = 200, uy = 215; const ut = new Path2D(); ut.moveTo(ux - 30, uy - 26); ut.bezierCurveTo(ux - 34, uy + 10, ux - 10, uy + 36, ux, uy + 50); ut.bezierCurveTo(ux + 10, uy + 36, ux + 34, uy + 10, ux + 30, uy - 26); ut.bezierCurveTo(ux + 14, uy - 36, ux - 14, uy - 36, ux - 30, uy - 26); ut.closePath();
        g.save(); g.globalAlpha = q1; paint(g, ut, K.myo, K.myoS, null, [ux - 34, uy - 36, 68, 86], OUT, 4);
        [-1, 1].forEach((d) => { tube(g, [[ux + d * 28, uy - 22], [ux + d * 56, uy - 40], [ux + d * 80, uy - 24]], 7, '#f08aa0', { ow: 3 }); tube(g, [[ux + d * 42, uy - 6], [ux + d * 76, uy]], 7, '#f3ede4', { ow: 3 }); }); g.restore();
        txt(g, 'ovare nedezvoltate (benzi)', 200, 338, 16, C.cream, { alpha: q1 });
      }
      // 3 · Klinefelter (etichetele în dreapta)
      L('barbă rară', RK.head[0] + 16, RK.head[1] + 28, 872, RK.head[1] + 20, q2, 'left'); L('ginecomastie', RK.chestR[0], RK.chestR[1], 872, RK.chestR[1], q2, 'left'); L('brațe lungi', RK.handR[0] - 6, FY - 330, 872, FY - 380, q2, 'left');
      // 4 · Klinefelter: lupa pe testicule + grăsimea
      const q3 = b.i === 3 ? sp(p(3), 0.1, 0.6) : b.i < 0 ? 1 : 0;
      if (q3 > 0) {
        lead(g, RK.groin[0] + 10, RK.groin[1], 870, 770, q3);
        g.save(); g.globalAlpha = q3; ell(g, 915, 792, 72, 72, '#1d1220', { ow: 5, sc: '#ffe7d6' }); g.restore();
        ell(g, 892, 788, 22, 30, '#f6c3a0', { ow: 3, alpha: q3 * 0.6, dash: [5, 5], sc: '#ffe7d6' }); ell(g, 940, 792, 10, 13, '#f6a35c', { ow: 4, alpha: q3 });
        txt(g, 'normal', 892, 836, 13, '#d8c4b8', { alpha: q3, w: 700 }); txt(g, 'mic', 940, 836, 13, C.hi, { alpha: q3, w: 800 });
        txt(g, 'atrofie testiculară', 915, 885, 16, C.cream, { alpha: q3 });
        L('grăsime:\nfeminină', RK.hips[0], RK.hips[1], 872, RK.hips[1] - 30, q3, 'left');
      }
      if (on(b, 0)) ring(g, RT.chest[0], RT.chest[1] - 30, 95, 80, ease(b.bt * 1.4));
      if (on(b, 3)) ring(g, 915, 792, 82, 82, ease(b.bt * 1.4));
    },
  };
}
