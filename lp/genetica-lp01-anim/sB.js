// Scenele părții B: ciclul celular, mitoza vs. meioza (schema), fazele mitozei, tipurile de mitoză, erorile din mitoză.
import { W, H, HOME, C, OUT, bg, panel, st, on, loopT, txt, pill, dot, ell, arr, ring, lead, line, chrom, vchrom, cell, nucleus, chromatin, spindle, centriole, lbl, clamp, lerp, ease, stage, REDUCED } from './gk.js';

const SOLID = '#1c3828';
const sm = (a, b, x) => ease(clamp((x - a) / (b - a)));

/* ---------- mitoza ca „mașină de stări”: s = 0 interfază · 1 profază târzie · 2 metafază · 3 anafază · 4 telofază ---------- */
const CH = [
  { p: 34, q: 62, col: C.mat, y: 250, sx: 410, sy: 330, sr: 0.7 },
  { p: 34, q: 62, col: C.pat, y: 372, sx: 600, sy: 390, sr: -0.6 },
  { p: 20, q: 40, col: C.mat, y: 486, sx: 440, sy: 540, sr: 1.2 },
  { p: 20, q: 40, col: C.pat, y: 582, sx: 580, sy: 560, sr: -1.0 },
];
export function mitoFrame(g, s, t, o = {}) {
  const err = o.err || null, CX = 500, CY = 440;
  const uT = clamp(s - 3), uA = clamp(s - 2), uM = clamp(s - 1), uP = clamp(s);
  // celula: una → două
  const d = 190 * sm(0.25, 1, uT), rx = 335 + 25 * uA - d * 0.947, ry = 270 - 55 * sm(0.3, 1, uT);
  g.save(); g.strokeStyle = OUT; g.lineWidth = 11;
  for (const sd of [-1, 1]) { g.beginPath(); g.ellipse(CX + sd * d, CY, rx, ry, 0, 0, 7); g.stroke(); }
  g.strokeStyle = C.mem; g.lineWidth = 6;
  for (const sd of [-1, 1]) { g.beginPath(); g.ellipse(CX + sd * d, CY, rx, ry, 0, 0, 7); g.stroke(); }
  g.fillStyle = SOLID; for (const sd of [-1, 1]) { g.beginPath(); g.ellipse(CX + sd * d, CY, rx - 3, ry - 3, 0, 0, 7); g.fill(); }
  g.restore();
  // polii (centriolii)
  const pm = sm(0, 1, uP), px = 310 * Math.sin(pm * Math.PI / 2) + 25 * uA - 20 * uT, py = CY - 250 * Math.cos(pm * Math.PI / 2) * 0.92;
  const PL = [CX - px - (pm < 0.02 ? 14 : 0), py], PR = [CX + px + (pm < 0.02 ? 14 : 0), py];
  const spA = sm(0.3, 0.8, uP) * (1 - sm(0.2, 0.7, uT));
  spindle(g, PL[0], PL[1], PR[0], PR[1], { n: 3, bulge: 62, alpha: spA, cent: false });
  // nucleul din interfază/profază
  nucleus(g, CX, CY, 190, 170, 1 - sm(0.5, 0.95, uP), uP > 0.5);
  chromatin(g, CX, CY, 150, 1 - sm(0.05, 0.6, uP));
  dot(g, CX + 40, CY - 30, 26, C.nucleol, { alpha: 1 - sm(0, 0.35, uP) });
  // nucleii fii
  if (uT > 0) for (const sd of [-1, 1]) { nucleus(g, CX + sd * (150 + d * 0.15), CY, 105, 95, sm(0.35, 0.9, uT)); if (!err) { chromatin(g, CX + sd * (150 + d * 0.15), CY, 80, sm(0.4, 1, uT), '#d9c9ff', 6, sd + 3); dot(g, CX + sd * (150 + d * 0.15) + 22, CY - 18, 15, C.nucleol, { alpha: sm(0.55, 1, uT) }); } }
  // cromozomii
  const cA = sm(0.15, 0.75, uP), fade = err ? 1 : 1 - sm(0.25, 0.8, uT);
  CH.forEach((c, k) => {
    const x = lerp(c.sx, CX, ease(uM)), y = lerp(c.sy, c.y, ease(uM)), rot = lerp(c.sr, 0, ease(uM)), w = lerp(7, 15, cA);
    const noSplit = err === 'nd' && k === 0;
    if (uA <= 0.08 || noSplit) {
      // bicromatidic; la nondisjuncție pleacă întreg spre polul stâng
      const mv = noSplit ? ease(clamp((uA - 0.08) / 0.92)) : 0, tx = lerp(x, CX - 150 - d * 0.15 - 40, mv), ty = lerp(y, CY - 50, mv * clamp(uT * 2 + mv * 0.3));
      if (uP > 0.1) { if (s > 1.6 && s < 3.2) for (const P of [PL, PR]) fib(g, P, [tx, ty], spA); chrom(g, tx, ty, { p: c.p, q: c.q, w, col: c.col, rot, alpha: cA * (noSplit ? 1 : fade) }); }
    } else {
      const u = ease(clamp((uA - 0.08) / 0.92));
      for (const sd of [-1, 1]) {
        const lag = err === 'lag' && k === 1 && sd === 1;
        let tx = CX + sd * lerp(8, 222, lag ? u * 0.2 : u), ty = lerp(y, CY + (y - CY) * 0.86, u);
        // în telofază se strâng în nucleul fiu
        const hx = CX + sd * (150 + d * 0.15) + (k % 2 ? 30 : -30) * (err ? 1 : 0.6), hy = CY + (k < 2 ? -38 : 38);
        if (lag) { tx = lerp(tx, CX + d * 0.95, sm(0, 0.6, uT)); ty = lerp(ty, CY + 138, sm(0, 0.6, uT)); }
        else { tx = lerp(tx, hx, sm(0, 0.7, uT)); ty = lerp(ty, hy, sm(0, 0.7, uT)); }
        if (uT < 0.3) fib(g, sd < 0 ? PL : PR, [tx, ty], spA);
        if (lag && uT > 0.4) ell(g, tx, ty + 10, 34, 50, C.nuc, { stroke: C.bad, ow: 4, alpha: sm(0.4, 0.8, uT), out: false });
        vchrom(g, tx, ty, sd, { p: c.p, q: c.q, w: 13, col: c.col, alpha: fade, bend: 1 - sm(0, 0.6, uT) * 0.7 });
      }
    }
  });
  centriole(g, PL[0], PL[1], 1 - sm(0.6, 1, uT) * 0.6); centriole(g, PR[0], PR[1], 1 - sm(0.6, 1, uT) * 0.6);
}
function fib(g, P, Q, a) { if (a <= 0.02) return; g.save(); g.globalAlpha *= a * 0.9; g.strokeStyle = '#eafff1'; g.lineWidth = 2.6; g.beginPath(); g.moveTo(P[0], P[1]); g.lineTo(Q[0], Q[1]); g.stroke(); g.restore(); }

export function mitosis({ spec }) {
  const o = spec.sceneOpts || {}, stg = o.stg || [[0, 4]];
  return {
    home: HOME, anchors: o.anch || [], labels: (o.lab || []).map((l) => lbl(l[0], l[1], { beats: l[2] })),
    phase: (i) => (o.ph || [])[i] || o.ph0 || '',
    draw(g, t, b) { bg(g); g.save(); g.translate(0, 30); mitoFrame(g, stage(b, t, stg, 10), t); g.restore(); },
  };
}

/* ---------- ciclul celular ---------- */
export function cycle() {
  const CX = 470, CY = 470, R = 270, TH = 76, TOT = 21;
  const PH = [['G1', 9, '#7fd6a0', '8–10 h'], ['S', 7, '#58a6f2', '6–8 h'], ['G2', 4, '#b99cf5', '3–5 h'], ['M', 1, '#f0688c', '1 h']];
  let a0 = -Math.PI / 2; const ARC = PH.map(([n, h, c, d]) => { const a1 = a0 + (h / TOT) * Math.PI * 2; const r = { n, c, d, a0, a1 }; a0 = a1; return r; });
  const at = (a, r = R) => [CX + Math.cos(a) * r, CY + Math.sin(a) * r];
  const mid = (k) => (ARC[k].a0 + ARC[k].a1) / 2;
  const G0 = [880, 150];
  const ORD = [0, 1, 2, -1, 3]; // punctele: G1, S, G2, G0, M
  return {
    home: HOME,
    anchors: [at(mid(0), R + 62), at(mid(1), R + 84), at(mid(2), R + 62), [G0[0] - 86, G0[1] - 4], at(mid(3), R + 64)],
    phase: (i) => ['G1 · presintetic', 'S · sinteza de ADN', 'G2 · postsintetic', 'G0 · repaus', 'M · diviziunea'][i] || 'ciclul celular',
    draw(g, t, b) {
      bg(g);
      const k = b.i >= 0 ? ORD[b.i] : -2;
      ARC.forEach((r, i) => {
        g.save(); g.lineCap = 'butt'; g.strokeStyle = OUT; g.lineWidth = TH + 10; g.beginPath(); g.arc(CX, CY, R, r.a0, r.a1); g.stroke();
        g.globalAlpha = k === -2 || k === i ? 1 : 0.4; g.strokeStyle = r.c; g.lineWidth = TH; g.beginPath(); g.arc(CX, CY, R, r.a0 + 0.012, r.a1 - 0.012); g.stroke(); g.restore();
        const [x, y] = at(mid(i), i === 3 ? R - 72 : R);
        txt(g, r.n, x, y - (i === 3 ? 0 : 12), 34, i === 3 ? r.c : OUT, { stroke: i === 3 });
        if (i !== 3) txt(g, r.d, x, y + 22, 19, OUT, { stroke: false, w: 700 }); else txt(g, r.d, x + 4, y + 32, 19, r.c, { w: 700 });
      });
      // sensul
      const aa = ARC[0].a0 + 0.5; arr(g, ...at(aa - 0.18, R + 58), ...at(aa, R + 58), C.cream, 5, 0.8);
      txt(g, 'INTERFAZA = G1 + S + G2', CX, CY + R + 86, 22, C.cream);
      // G0
      const e = at(ARC[0].a0 + 0.75, R + 44);
      arr(g, e[0], e[1], G0[0] - 50, G0[1] + 46, C.dim, 5, k === -1 || k === -2 ? 1 : 0.4);
      ell(g, G0[0], G0[1], 76, 60, '#31473a', { stroke: k === -1 ? C.hi : C.dim, ow: 5 }); txt(g, 'G0', G0[0], G0[1] - 10, 32, C.cream); txt(g, 'repaus', G0[0], G0[1] + 22, 18, C.cream, { w: 700 });
      // punctul care parcurge ciclul
      let pa;
      if (k === -2) pa = -Math.PI / 2 + loopT(t, 12) * Math.PI * 2;
      else if (k >= 0) pa = lerp(ARC[k].a0 + 0.05, ARC[k].a1 - 0.05, REDUCED ? 0.5 : 0.5 + 0.5 * Math.sin(b.bt * 1.1 - Math.PI / 2) * (b.bt < 2.85 ? 1 : 1));
      const P = k === -1 ? [lerp(e[0], G0[0] - 62, st(b, 3)), lerp(e[1], G0[1] + 40, st(b, 3))] : at(pa, R);
      dot(g, P[0], P[1], 20, C.hi, { ow: 5 });
      // în centru: cum arată materialul genetic în faza curentă
      const cur = k === -2 ? ARC.findIndex((r) => { let a = pa; while (a > ARC[3].a1) a -= Math.PI * 2; return a >= r.a0 && a < r.a1; }) : k;
      ell(g, CX, CY, 150, 150, 'rgba(234,255,241,.05)', { stroke: 'rgba(234,255,241,.25)', ow: 3, out: false });
      const cap = (s) => txt(g, s, CX, CY + 108, 19, C.cream, { w: 700 });
      if (cur === 0 || cur === -1) { chrom(g, CX, CY - 20, { p: 46, q: 76, w: 10, col: C.chr, bi: false }); cap(cur === -1 ? 'nu se divide (temporar)' : 'o cromatidă · ADN despiralizat'); }
      else if (cur === 1) { const u = k === -2 ? 0.6 : clamp(b.bt / 4); chrom(g, CX - 9, CY - 20, { p: 46, q: 76, w: 10, col: C.chr, bi: false }); line(g, [[CX + 9, CY - 66], [CX + 9, CY - 66 + 122 * u]], 10, '#ffe9a8'); cap('ADN-ul se dublează (replicare)'); }
      else if (cur === 2) { chrom(g, CX, CY - 20, { p: 46, q: 76, w: 10, col: C.chr, open: 0.1 }); cap('două cromatide surori'); }
      else { chrom(g, CX, CY - 20, { p: 40, q: 62, w: 24, col: C.chr }); cap('cromozom condensat'); }
    },
  };
}

/* ---------- mitoza vs. meioza (după figura nr. 3) ---------- */
const mini = (g, x, y, r, items, a = 1) => { cell(g, x, y, r, r * 0.9, { alpha: a }); items.forEach(([dx, col, bi]) => chrom(g, x + dx, y, { p: r * 0.2, q: r * 0.36, w: r * 0.13, col, bi, open: 0.2, alpha: a })); };
export function divCompare({ spec }) {
  const keys = (spec.sceneOpts && spec.sceneOpts.anch) || ['mit', 'mei', 'after'];
  const AN = { rep: [500, 240], mit: [118, 130], mei: [598, 130], after: [60, 760] };
  const M = 250, E = 730;
  return {
    home: HOME, anchors: keys.map((k) => AN[k]),
    draw(g, t, b) {
      bg(g);
      const k = b.i >= 0 ? keys[b.i] : 'all', aM = k === 'mei' ? 0.35 : 1, aE = k === 'mit' ? 0.35 : 1, aB = k === 'after' || k === 'all' ? 1 : 0.35;
      g.save(); g.strokeStyle = 'rgba(234,255,241,.25)'; g.lineWidth = 3; g.setLineDash([10, 10]); g.beginPath(); g.moveTo(500, 30); g.lineTo(500, 720); g.stroke(); g.restore();
      txt(g, 'MITOZA', M, 44, 30, C.hi, { alpha: aM }); txt(g, 'MEIOZA', E, 44, 30, C.hi, { alpha: aE });
      for (const [x, a] of [[M, aM], [E, aE]]) {
        mini(g, x, 130, 54, [[-14, C.mat, false], [14, C.pat, false]], a); txt(g, '2n', x + 84, 130, 24, C.cream, { alpha: a });
        arr(g, x, 190, x, 222, C.cream, 5, a); mini(g, x, 280, 54, [[-16, C.mat, true], [16, C.pat, true]], a);
      }
      pill(g, 500, 205, 250, 44, '#eafff1', 'replicarea ADN (S)', { size: 19, glow: k === 'rep' ? 1 : 0 });
      // mitoza: o diviziune
      g.save(); g.globalAlpha = aM;
      arr(g, M - 20, 342, 168, 440, C.cream, 5); arr(g, M + 20, 342, 332, 440, C.cream, 5);
      for (const x of [150, 350]) { mini(g, x, 510, 54, [[-14, C.mat, false], [14, C.pat, false]]); txt(g, '2n', x, 590, 24, C.cream); }
      txt(g, '2 celule identice cu mama', M, 640, 21, C.ok); txt(g, 'celulele somatice', M, 672, 19, C.cream, { w: 700 });
      g.restore();
      // meioza: două diviziuni
      g.save(); g.globalAlpha = aE;
      txt(g, 'meioza I', 905, 370, 19, C.hi); txt(g, 'meioza II', 905, 520, 19, C.hi);
      arr(g, E - 20, 342, 652, 386, C.cream, 5); arr(g, E + 20, 342, 808, 386, C.cream, 5);
      mini(g, 640, 440, 46, [[0, C.mat, true]]); mini(g, 820, 440, 46, [[0, C.pat, true]]); txt(g, 'n', 730, 440, 24, C.cream);
      for (const [x0, x1] of [[625, 590], [655, 690], [805, 770], [835, 870]]) arr(g, x0, 492, x1, 540, C.cream, 4);
      [[585, C.mat], [690, C.mat], [770, C.pat], [875, C.pat]].forEach(([x, c]) => { mini(g, x, 590, 38, [[0, c, false]]); });
      txt(g, '4 gameți · n', E, 656, 21, C.ok); txt(g, 'numai în gametogeneză', E, 688, 19, C.cream, { w: 700 });
      g.restore();
      // după diviziune
      panel(g, 40, 730, 920, 172, { alpha: aB, stroke: k === 'after' ? C.hi : undefined });
      txt(g, 'După diviziune, celula:', 500, 762, 21, C.hi, { alpha: aB });
      [['rămâne în ciclu\n(proliferează)', 190, C.mem], ['iese temporar: G0\n(poate reintra)', 500, '#b99cf5'], ['iese definitiv\n(ex. neuronii)', 810, '#9fb7a8']].forEach(([s, x, c]) => { pill(g, x, 838, 270, 86, c, null, { alpha: aB, ow: 4 }); txt(g, s, x, 838, 19, OUT, { stroke: false, alpha: aB }); });
    },
  };
}

/* ---------- tipurile de mitoză ---------- */
function tcell(g, x, y, r, diff) {
  if (diff) { g.save(); g.strokeStyle = OUT; g.lineCap = 'round'; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + 0.3; g.lineWidth = 12; g.beginPath(); g.moveTo(x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8); g.lineTo(x + Math.cos(a) * r * 1.3, y + Math.sin(a) * r * 1.3); g.stroke(); g.strokeStyle = C.diff; g.lineWidth = 6; g.stroke(); g.strokeStyle = OUT; } g.restore(); }
  ell(g, x, y, r, r, diff ? C.diff : C.stem, { stroke: OUT, ow: 5, out: false }); dot(g, x, y, r * 0.38, diff ? '#b9801a' : '#8fa398', { ow: 3 });
}
export function mitTypes() {
  const T = [['homotipică', 0, [0, 0]], ['heterotipică', 0, [1, 1]], ['homo-heterotipică', 0, [0, 1]], ['de dediferențiere', 1, [0, 0]]];
  const pos = (k) => [40 + (k % 2) * 480, 30 + Math.floor(k / 2) * 420];
  return {
    home: HOME, anchors: T.map((_, k) => { const [x, y] = pos(k); return [x + 34, y + 36]; }),
    draw(g, t, b) {
      bg(g);
      T.forEach(([n, m, ds], k) => {
        const [x, y] = pos(k), cx = x + 220;
        panel(g, x, y, 440, 400, { stroke: on(b, k) ? C.hi : undefined, lw: on(b, k) ? 5 : 3 });
        txt(g, 'mitoza ' + n, cx + 12, y + 38, 23, on(b, k) ? C.hi : C.cream);
        tcell(g, cx, y + 130, 50, !!m);
        arr(g, cx - 26, y + 190, cx - 86, y + 250, C.cream, 5); arr(g, cx + 26, y + 190, cx + 86, y + 250, C.cream, 5);
        tcell(g, cx - 105, y + 310, 44, !!ds[0]); tcell(g, cx + 105, y + 310, 44, !!ds[1]);
      });
      tcell(g, 250, 892, 16, false); txt(g, 'nediferențiată', 280, 892, 19, C.cream, { align: 'left', w: 700 });
      tcell(g, 590, 892, 16, true); txt(g, 'diferențiată', 622, 892, 19, C.cream, { align: 'left', w: 700 });
    },
  };
}

/* ---------- erorile din mitoză 1: nondisjuncția cromatidiană + întârzierea anafazică ---------- */
export function mitErr1() {
  const fr = (g, cx, cy, s, t, err) => { g.save(); g.translate(cx, cy); g.scale(0.58, 0.58); g.translate(-500, -440); mitoFrame(g, s, t, { err }); g.restore(); };
  return {
    home: HOME,
    anchors: [[60, 150], [60, 600], [550, 150], [550, 600]],
    phase: (i) => ['nu se separă la centromer', 'trisomie + monosomie', 'un cromozom rămâne în urmă', 'micronucleu'][i] || 'două erori din anafază',
    draw(g, t, b) {
      bg(g);
      const loop = REDUCED ? 4 : 2 + clamp(((t % 9) / 7)) * 2;
      const sL = b.i < 0 ? loop : b.i === 0 ? lerp(2, 4, ease(clamp(b.bt / (b.bd * 0.8)))) : 4;
      const sR = b.i < 0 ? loop : b.i < 2 ? 2 : b.i === 2 ? lerp(2, 4, ease(clamp(b.bt / (b.bd * 0.8)))) : 4;
      txt(g, 'Nondisjuncția cromatidiană', 255, 96, 24, C.hi); txt(g, 'Întârzierea anafazică', 745, 96, 24, C.hi);
      fr(g, 255, 300, sL, t, 'nd'); fr(g, 745, 300, sR, t, 'lag');
      const aL = sm(3.5, 4, sL), aR = sm(3.5, 4, sR);
      txt(g, '2n + 1', 148, 492, 28, C.bad, { alpha: aL }); txt(g, '2n − 1', 362, 492, 28, C.bad, { alpha: aL });
      txt(g, 'trisomie', 148, 526, 19, C.cream, { alpha: aL, w: 700 }); txt(g, 'monosomie', 362, 526, 19, C.cream, { alpha: aL, w: 700 });
      txt(g, '2n', 638, 492, 28, C.ok, { alpha: aR }); txt(g, '2n − 1', 852, 492, 28, C.bad, { alpha: aR });
      txt(g, 'normală', 638, 526, 19, C.cream, { alpha: aR, w: 700 }); txt(g, 'monosomie', 852, 526, 19, C.cream, { alpha: aR, w: 700 });
      // jos: mozaicismul și micronucleul
      panel(g, 40, 590, 440, 300, { stroke: on(b, 1) ? C.hi : undefined }); panel(g, 520, 590, 440, 300, { stroke: on(b, 3) ? C.hi : undefined });
      txt(g, 'în primele diviziuni ale zigotului:', 260, 622, 19, C.cream, { w: 700 });
      const cols = [C.ok, C.bad, C.pat, C.ok, C.ok, C.bad, C.pat, C.ok, C.pat, C.ok, C.bad, C.ok];
      cols.forEach((c, i) => ell(g, 100 + (i % 6) * 64, 690 + Math.floor(i / 6) * 62, 26, 24, c, { stroke: OUT, ow: 4, out: false }));
      txt(g, 'mozaicism', 260, 812, 26, C.hi); txt(g, 'diploide + trisomice + monosomice', 260, 848, 18, C.cream, { w: 700 });
      cell(g, 660, 730, 104, 92); nucleus(g, 640, 722, 52, 48); ell(g, 722, 772, 17, 15, C.nuc, { stroke: C.bad, ow: 4, out: false });
      lead(g, 800, 700, 736, 764); txt(g, 'micronucleu', 862, 688, 21, C.bad);
      txt(g, 'testul micronucleilor', 740, 848, 22, C.hi);
    },
  };
}

/* ---------- erorile din mitoză 2: izocromozomii, mitoza multipolară, endomitoza ---------- */
export function mitErr2() {
  const iso = (g, x, y, len, a, up, col) => { // două brațe identice, de la centromer; a = unghiul față de verticală
    const sgn = up ? -1 : 1;
    line(g, [[x - Math.sin(a) * len, y + sgn * Math.cos(a) * len], [x, y], [x + Math.sin(a) * len, y + sgn * Math.cos(a) * len]], 22, col); dot(g, x, y, 10, C.cen);
  };
  return {
    home: HOME,
    anchors: [[452, 92], [926, 228], [70, 484], [550, 484]],
    phase: (i) => ['centromerul se rupe transversal', 'izocromozomi', 'mai mult de doi poli', '4n, fără citokineză'][i] || 'alte erori din mitoză',
    draw(g, t, b) {
      bg(g);
      panel(g, 40, 30, 920, 400, { stroke: on(b, 0) || on(b, 1) ? C.hi : undefined });
      // normal: clivare longitudinală
      txt(g, 'normal: longitudinal', 220, 92, 20, C.ok);
      chrom(g, 130, 236, { p: 70, q: 120, w: 22, col: C.chr }); g.save(); g.strokeStyle = C.ok; g.lineWidth = 4; g.setLineDash([9, 8]); g.beginPath(); g.moveTo(130, 136); g.lineTo(130, 380); g.stroke(); g.restore();
      arr(g, 190, 236, 240, 236, C.cream, 5); chrom(g, 280, 236, { p: 70, q: 120, w: 22, col: C.chr, bi: false }); chrom(g, 330, 236, { p: 70, q: 120, w: 22, col: C.chr, bi: false });
      txt(g, 'fiecare: p + q', 305, 402, 18, C.cream, { w: 700 });
      g.save(); g.strokeStyle = 'rgba(234,255,241,.25)'; g.lineWidth = 3; g.beginPath(); g.moveTo(410, 70); g.lineTo(410, 410); g.stroke(); g.restore();
      // greșit: transversal
      txt(g, 'eroare: transversal', 610, 92, 20, C.bad);
      const u = b.i < 0 ? 1 : b.i === 0 ? ease(clamp(b.bt / (b.bd * 0.7))) : 1;
      const a = lerp(0.3, Math.PI / 2, u), xr = lerp(560, 800, u);
      if (u < 0.999) { g.save(); g.globalAlpha = 1 - u; g.strokeStyle = C.bad; g.lineWidth = 4; g.setLineDash([9, 8]); g.beginPath(); g.moveTo(470, 240); g.lineTo(650, 240); g.stroke(); g.restore(); }
      iso(g, xr, lerp(234, 170, u), 70, a, true, C.chr); iso(g, xr, lerp(246, 320, u), 120, a, false, C.chrS);
      if (u > 0.6) { const al = (u - 0.6) / 0.4; txt(g, 'i(p)', 800, 130, 26, C.hi, { alpha: al }); txt(g, 'doar brațe scurte', 800, 208, 17, C.cream, { alpha: al, w: 700 }); txt(g, 'i(q)', 800, 278, 26, C.hi, { alpha: al }); txt(g, 'doar brațe lungi', 800, 360, 17, C.cream, { alpha: al, w: 700 }); txt(g, 'perfect metacentrici', 800, 400, 18, C.ok, { alpha: al }); }
      if (on(b, 1)) { ring(g, 800, 170, 104, 26, st(b, 1)); ring(g, 800, 320, 150, 26, st(b, 1)); }
      // mitoza multipolară
      panel(g, 40, 450, 440, 440, { stroke: on(b, 2) ? C.hi : undefined });
      txt(g, 'mitoza multipolară', 276, 484, 22, on(b, 2) ? C.hi : C.cream);
      cell(g, 260, 690, 180, 165);
      const PO = [[260, 560], [130, 770], [390, 770]];
      PO.forEach((p, i) => { const q = PO[(i + 1) % 3]; spindle(g, p[0], p[1], q[0], q[1], { n: 1, bulge: 30, cent: false }); });
      [[0, 232, 620, C.mat], [0, 290, 624, C.pat], [0, 262, 650, C.mat], [1, 190, 740, C.pat], [1, 214, 706, C.mat], [1, 226, 760, C.pat], [2, 330, 740, C.mat], [2, 318, 700, C.pat]].forEach(([pi, x, y, c]) => { g.save(); g.translate(x, y); g.rotate(Math.atan2(PO[pi][1] - y, PO[pi][0] - x)); vchrom(g, 0, 0, 1, { p: 12, q: 20, w: 8, col: c }); g.restore(); });
      PO.forEach((p) => centriole(g, p[0], p[1]));
      txt(g, '3 + 3 + 2: împărțire inegală', 260, 868, 18, C.bad);
      // endomitoza
      panel(g, 520, 450, 440, 440, { stroke: on(b, 3) ? C.hi : undefined });
      txt(g, 'endomitoza', 756, 484, 22, on(b, 3) ? C.hi : C.cream);
      cell(g, 620, 600, 70, 62); [[-24, C.mat], [-8, C.pat], [8, C.mat], [24, C.pat]].forEach(([dx, c], i) => chrom(g, 620 + dx, 600, { p: i < 2 ? 12 : 8, q: i < 2 ? 20 : 14, w: 6, col: c, bi: false }));
      txt(g, '2n', 620, 690, 24, C.cream);
      arr(g, 690, 640, 740, 690, C.cream, 5); txt(g, 'replicare,\nfără citokineză', 846, 620, 19, C.hi);
      cell(g, 760, 780, 120, 84);
      for (let i = 0; i < 8; i++) chrom(g, 676 + i * 24, 780, { p: (i % 4) < 2 ? 12 : 8, q: (i % 4) < 2 ? 20 : 14, w: 6, col: i % 2 ? C.pat : C.mat, bi: false });
      txt(g, '4n', 912, 780, 28, C.bad);
    },
  };
}
