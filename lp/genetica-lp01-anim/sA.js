// Scenele părții A (cromozomii): coperta, harta deck-ului, anatomia cromozomului, cariotipul 46, tipurile morfologice, elementele facultative, numărul pe specii, telomerele.
import { W, H, HOME, C, OUT, bg, panel, st, on, loopT, txt, pill, dot, ell, arr, ring, lead, line, chrom, vchrom, cell, nucleus, spindle, sperm, lbl, clamp, lerp, ease, REDUCED } from './gk.js';

/* ---------- 1. coperta ---------- */
export function cover() {
  return {
    home: HOME,
    anchors: [[640, 250], [150, 610], [500, 610], [850, 610]],
    draw(g, t, b) {
      bg(g);
      const wob = REDUCED ? 0 : Math.sin(t * 0.8) * 0.03;
      chrom(g, 500, 290, { p: 120, q: 210, w: 50, col: C.chr, tel: true, rot: wob });
      ring(g, 500, 320, 190, 270, st(b, 0) * (on(b, 0) ? 1 : 0));
      // B: celulă în metafază
      panel(g, 40, 640, 290, 250); cell(g, 185, 765, 115, 92);
      spindle(g, 85, 765, 285, 765, { n: 3, bulge: 34 });
      for (const [y, c] of [[715, C.mat], [748, C.pat], [782, C.mat], [815, C.pat]]) chrom(g, 185, y, { p: 9, q: 15, w: 8, col: c, rot: Math.PI / 2 });
      ring(g, 185, 765, 135, 112, on(b, 1) ? st(b, 1) : 0);
      // C: patru gameți
      panel(g, 355, 640, 290, 250);
      for (const [x, y, c] of [[425, 715, C.mat], [575, 715, C.pat], [425, 820, C.pat], [575, 820, C.mat]]) { cell(g, x, y, 52, 44); chrom(g, x, y - 4, { p: 10, q: 18, w: 8, col: c, bi: false }); }
      txt(g, 'n', 500, 767, 30, C.hi);
      ring(g, 500, 765, 135, 112, on(b, 2) ? st(b, 2) : 0);
      // D: fecundarea
      panel(g, 670, 640, 290, 250); cell(g, 790, 765, 88, 84, { stroke: C.mat }); nucleus(g, 790, 765, 34, 32);
      sperm(g, 905, 720, Math.PI * 0.85, t, '#eafff1', 0.9);
      ring(g, 815, 765, 135, 112, on(b, 3) ? st(b, 3) : 0);
    },
  };
}

/* ---------- 2. harta deck-ului ---------- */
export function guide({ spec }) {
  const rows = (spec.sceneOpts && spec.sceneOpts.rows) || [];
  const y0 = 120, dy = 92;
  return {
    home: HOME,
    anchors: [[80, y0], [80, y0 + dy * 2.5], [80, 790]],
    draw(g, t, b) {
      bg(g);
      rows.forEach((r, k) => {
        const y = y0 + k * dy, hot = k === 0;
        const act = (on(b, 0) && k === 0) || (on(b, 1) && k >= 1 && k <= 4);
        pill(g, 520, y, 780, 70, hot ? C.hi : k === 5 ? '#9fb7a8' : C.mem, null, { glow: act ? 1 : 0, r: 22 });
        txt(g, r[0], 160, y, 24, OUT, { stroke: false, align: 'left' });
        txt(g, r[1], 880, y, 20, OUT, { stroke: false, align: 'right', w: 700 });
      });
      panel(g, 130, 700, 780, 190, { stroke: on(b, 2) ? C.hi : undefined, lw: on(b, 2) ? 5 : 3 });
      txt(g, 'Aplicațiile practice de la LP', 520, 730, 22, C.hi);
      [['preparate cromozomiale\n(ceapă, animale, om)', 250], ['idiograme: elemente\nși tipuri de cromozomi', 520], ['etapele diviziunii\npe lame', 790]].forEach(([s, x]) => txt(g, s, x, 792, 19, C.cream, { w: 700 }));
      txt(g, 'probleme de mitoză și de meioză', 520, 856, 19, C.cream, { w: 700 });
    },
  };
}

/* ---------- 3. anatomia cromozomului metafazic ---------- */
export function anat({ spec }) {
  const base = spec.sceneOpts && spec.sceneOpts.mode === 'base';
  const X = 450, Y = 470, P = 200, Q = 330, Wd = 62;
  const A = base ? [[538, 300], [X, Y - 4], [790, 400], [552, 800]] : [[392, 640], [X, 426], [545, 474], [790, 400], [552, 800]];
  const L = [
    lbl([250, 640], 'cromatidă', {}), lbl([250, 300], 'cromatidă soră', {}),
    lbl([228, Y], '<i>centromer</i> · constricția primară', {}),
    lbl([690, Y + 44], 'kinetocor', { beats: base ? [-1] : [-1, 2] }),
    lbl([640, 846], '<i>telomer</i>', {}),
  ];
  return {
    home: HOME, anchors: A, labels: L,
    phase: (i) => (base ? ['ADN + proteine', 'centromerul', 'brațele p și q', 'telomerele'] : ['cromatidele', 'constricția primară', 'centromerul', 'brațele', 'telomerele'])[i] || 'cromozom metafazic',
    draw(g, t, b) {
      bg(g);
      const k = b.i;
      chrom(g, X, Y, { p: P, q: Q, w: Wd, col: C.chr, tel: true, open: 0.2 });
      // kinetocorii (2), de o parte și de alta a centromerului
      for (const sd of [-1, 1]) { g.save(); g.fillStyle = '#e25aa8'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.ellipse(X + sd * 82, Y, 11, 20, 0, 0, 7); g.fill(); g.stroke(); g.restore(); }
      lead(g, 330, Y, X - 100, Y); if (!base || k < 0) lead(g, 640, Y + 34, X + 90, Y + 6, base ? 1 : (k === 2 || k < 0 ? 1 : 0));
      lead(g, 590, 838, 552, 812);
      // brațele: p sus, q jos
      const ba = base ? (k === 2 || k < 0 ? 1 : 0.45) : (k === 3 || k < 0 ? 1 : 0.45);
      g.save(); g.globalAlpha = ba;
      arr(g, 730, Y - 12, 730, Y - P + 6, C.hi, 6); arr(g, 730, Y - P + 30, 730, Y - 16, C.hi, 6);
      arr(g, 730, Y + 12, 730, Y + Q - 6, C.ok, 6); arr(g, 730, Y + Q - 30, 730, Y + 16, C.ok, 6);
      txt(g, 'p', 800, Y - P / 2, 60, C.hi); txt(g, 'brațul scurt', 870, Y - P / 2 + 52, 20, C.hi, { w: 700 });
      txt(g, 'q', 800, Y + Q / 2, 60, C.ok); txt(g, 'brațul lung', 870, Y + Q / 2 + 52, 20, C.ok, { w: 700 });
      g.restore();
      if (base) { pill(g, 250, 130, 380, 64, '#eafff1', 'ADN + proteine, în părți egale', { size: 20, alpha: k === 0 || k < 0 ? 1 : 0.4 }); }
      const R = base ? [[X, 340, 150, 150], [X, Y, 120, 60], [760, 470, 150, 380], [X, Y + Q, 150, 50]] : [[X, 640, 130, 190], [X, Y, 70, 44], [X, Y, 120, 44], [760, 470, 150, 380], [X, Y + Q, 150, 50]];
      if (k >= 0 && R[k]) ring(g, R[k][0], R[k][1], R[k][2], R[k][3], st(b, k));
      if ((base && k === 3) || (!base && k === 4)) ring(g, X, Y - P, 130, 46, st(b, k));
    },
  };
}

/* ---------- 4. cariotipul: 22 de perechi de autozomi + heterozomii ---------- */
export function karyo({ spec }) {
  const keys = (spec.sceneOpts && spec.sceneOpts.anch) || ['auto', 'sex', 'fem', 'masc'];
  const pos = (i) => { const r = Math.floor(i / 8), c = i % 8; return [100 + c * 104, 150 + r * 150]; };
  const AN = { all: [500, 62], auto: [56, 300], sex: [800, 372], fem: [70, 640], masc: [530, 640], gam: [500, 640] };
  return {
    home: HOME, anchors: keys.map((k) => AN[k]),
    labels: [lbl([800, 520], '<i>heterozomi</i> (gonozomi)'), lbl([330, 568], '<i>autozomi</i>: perechile 1–22')],
    draw(g, t, b) {
      bg(g);
      const k = b.i >= 0 ? keys[b.i] : '';
      for (let i = 0; i < 22; i++) {
        const [x, y] = pos(i), q = 58 - i * 1.7, p = q * (i > 11 && i < 15 || i > 19 ? 0.22 : 0.6);
        chrom(g, x - 15, y, { p, q, w: 8, col: C.mat, open: 0.16 }); chrom(g, x + 15, y, { p, q, w: 8, col: C.pat, open: 0.16 });
        txt(g, String(i + 1), x, y + 76, 16, C.dim, { w: 700 });
      }
      // heterozomii: XX sau XY
      panel(g, 690, 392, 250, 150, { stroke: k === 'sex' ? C.hi : undefined, lw: k === 'sex' ? 5 : 3 });
      chrom(g, 735, 452, { p: 26, q: 40, w: 8, col: C.mat, open: 0.16 }); chrom(g, 765, 452, { p: 26, q: 40, w: 8, col: C.mat, open: 0.16 });
      txt(g, 'sau', 815, 452, 17, C.cream, { w: 700 });
      chrom(g, 868, 452, { p: 26, q: 40, w: 8, col: C.mat, open: 0.16 }); chrom(g, 900, 462, { p: 8, q: 24, w: 8, col: C.pat, open: 0.16 });
      txt(g, 'XX', 750, 520, 20, C.mat); txt(g, 'XY', 884, 520, 20, C.pat);
      if (k === 'auto') ring(g, 420, 320, 400, 250, st(b, b.i)); if (k === 'all') ring(g, 500, 330, 480, 270, st(b, b.i));
      // jos: gameții
      const fa = k === 'masc' ? 0.4 : 1, ma = k === 'fem' ? 0.4 : 1;
      panel(g, 40, 610, 440, 290, { stroke: k === 'fem' || k === 'gam' ? C.hi : undefined, alpha: fa }); panel(g, 520, 610, 440, 290, { stroke: k === 'masc' || k === 'gam' ? C.hi : undefined, alpha: ma });
      g.save(); g.globalAlpha = fa;
      txt(g, 'sexul feminin · XX', 260, 648, 24, C.mat); txt(g, 'homogametic', 260, 682, 19, C.cream, { w: 700 });
      cell(g, 260, 790, 80, 74, { stroke: C.mat }); chrom(g, 260, 785, { p: 16, q: 28, w: 9, col: C.mat, bi: false }); txt(g, 'ovul · 23,X', 260, 880, 19, C.cream, { w: 700 });
      g.restore(); g.save(); g.globalAlpha = ma;
      txt(g, 'sexul masculin · XY', 740, 648, 24, C.pat); txt(g, 'heterogametic', 740, 682, 19, C.cream, { w: 700 });
      sperm(g, 690, 760, -Math.PI / 2, t, C.mat, 1.1); sperm(g, 840, 760, -Math.PI / 2, t + 1, C.pat, 1.1);
      txt(g, 'ginospermatozoid\n23,X', 660, 868, 17, C.mat, { w: 700 }); txt(g, 'androspermatozoid\n23,Y', 850, 868, 17, C.pat, { w: 700 });
      g.restore();
    },
  };
}

/* ---------- 5. tipurile morfologice după poziția centromerului ---------- */
export function types() {
  const T = [
    { x: 140, p: 160, q: 180, n: 'metacentric', r: 'R = 1–1,7', c: 'median' },
    { x: 380, p: 110, q: 230, n: 'submetacentric', r: 'R = 1,7–3', c: 'submedian' },
    { x: 620, p: 52, q: 288, n: 'acrocentric', r: 'R > 3', c: 'subterminal', sat: true },
    { x: 860, p: 0, q: 340, n: 'telocentric', r: 'nu e în cariotipul normal', c: 'terminal', off: true },
  ];
  const cy = (q) => 650 - q;
  return {
    home: HOME, anchors: T.map((o) => [o.x - 78, cy(o.q)]),
    phase: (i) => (i >= 0 && T[i] ? 'centromer ' + T[i].c : 'R = q / p'),
    draw(g, t, b) {
      bg(g);
      pill(g, 390, 104, 600, 58, '#eafff1', 'R = q / p = brațul lung / brațul scurt', { size: 22 });
      T.forEach((o, k) => {
        const a = o.off ? 0.5 : 1, y = cy(o.q);
        lead(g, o.x - 70, y, o.x + 70, y, 0.7);
        chrom(g, o.x, y, { p: o.p, q: o.q, w: 34, col: o.off ? '#b9b39a' : C.chr, sat: !!o.sat, alpha: a, open: 0.17 });
        if (o.off) { g.save(); g.strokeStyle = C.bad; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(o.x - 62, y + 90); g.lineTo(o.x + 62, y + 250); g.moveTo(o.x + 62, y + 90); g.lineTo(o.x - 62, y + 250); g.stroke(); g.restore(); }
        txt(g, o.n, o.x, 730, 23, on(b, k) ? C.hi : C.cream);
        txt(g, o.r, o.x, 770, 21, o.off ? C.bad : C.ok, { w: 700 });
        if (on(b, k)) ring(g, o.x, y, 60, 40, st(b, k));
      });
      txt(g, 'sateliți', 700, cy(288) - 124, 18, C.sat, { w: 700 });
      txt(g, 'p', 86, cy(180) - 80, 28, C.hi); txt(g, 'q', 86, cy(180) + 90, 28, C.ok);
      panel(g, 60, 820, 880, 84);
      txt(g, 'cu cât centromerul e mai aproape de capăt, cu atât p e mai scurt și R mai mare', 500, 862, 20, C.cream, { w: 700 });
    },
  };
}

/* ---------- 6. elementele facultative: sateliții și constricțiile secundare ---------- */
export function facult() {
  return {
    home: HOME,
    anchors: [[395, 190], [150, 262], [800, 452]],
    labels: [lbl([420, 236], '<i>sateliți</i>'), lbl([210, 110], 'constricție secundară <i>terminală</i>'), lbl([850, 520], 'constricție secundară <i>interstițială</i>')],
    draw(g, t, b) {
      bg(g);
      chrom(g, 300, 400, { p: 110, q: 360, w: 54, col: C.chr, sat: true, open: 0.2 });
      chrom(g, 700, 380, { p: 170, q: 330, w: 54, col: C.chr, sec: 0.2, open: 0.2 });
      txt(g, 'cromozom acrocentric', 300, 820, 23, C.cream); txt(g, '13, 14, 15, 21, 22', 300, 858, 26, C.hi);
      txt(g, 'pe brațul lung, lângă centromer', 700, 820, 23, C.cream); txt(g, '1, 9, 16, Y', 700, 858, 26, C.hi);
      if (on(b, 0)) { ring(g, 232, 222, 44, 44, st(b, 0)); ring(g, 368, 222, 44, 44, st(b, 0)); }
      lead(g, 206, 130, 238, 246); if (on(b, 1)) { ring(g, 240, 258, 30, 30, st(b, 1)); ring(g, 360, 258, 30, 30, st(b, 1)); }
      if (on(b, 2)) ring(g, 700, 446, 90, 40, st(b, 2));
    },
  };
}

/* ---------- 7. numărul de cromozomi: tabelul nr. 1 + 2n → n → 2n ---------- */
export function species() {
  const S = [['Mazăre', 14], ['Ceapă', 16], ['Cartofi', 48], ['Scorpion', 4], ['Drosophila melanogaster', 8], ['Șoareci', 40], ['Șobolani', 42], ['Cimpanzeu', 48], ['Cal', 64], ['Câine', 78], ['Om', 46]];
  return {
    home: HOME,
    anchors: [[36, 76], [150, 706], [500, 706], [850, 706]],
    draw(g, t, b) {
      bg(g);
      txt(g, 'Numărul diploid (2n) la câteva specii', 500, 40, 22, C.hi);
      S.forEach(([n, v], k) => {
        const y = 92 + k * 50, om = n === 'Om', w = 40 + v * 6.2;
        txt(g, n, 330, y, 21, om ? C.hi : C.cream, { align: 'right', w: om ? 800 : 700 });
        pill(g, 350 + w / 2, y, w, 30, om ? C.hi : v === 48 ? C.mat : C.mem, null, { ow: 4, r: 10 });
        txt(g, String(v), 350 + w + 14, y, 22, om ? C.hi : C.cream, { align: 'left' });
      });
      // jos: 2n → n → 2n
      const act = (k) => (b.i < 0 || b.i === 0 || b.i === k ? 1 : 0.45);
      cell(g, 150, 800, 110, 84, { alpha: act(1) }); txt(g, '2n = 46', 150, 790, 30, C.cream, { alpha: act(1) }); txt(g, 'celulă somatică', 150, 826, 17, C.cream, { w: 700, alpha: act(1) });
      arr(g, 275, 800, 372, 800, C.hi, 6, act(2)); txt(g, 'meioză', 323, 762, 18, C.hi, { alpha: act(2) });
      cell(g, 500, 800, 110, 84, { alpha: act(2) }); txt(g, 'n = 23', 500, 790, 30, C.cream, { alpha: act(2) }); txt(g, 'gameți', 500, 826, 17, C.cream, { w: 700, alpha: act(2) });
      arr(g, 625, 800, 722, 800, C.hi, 6, act(3)); txt(g, 'fecundare', 673, 762, 18, C.hi, { alpha: act(3) });
      cell(g, 850, 800, 110, 84, { alpha: act(3) }); txt(g, '2n = 46', 850, 790, 30, C.cream, { alpha: act(3) }); txt(g, 'zigot', 850, 826, 17, C.cream, { w: 700, alpha: act(3) });
      for (const k of [1, 2, 3]) if (on(b, k)) ring(g, [0, 150, 500, 850][k], 800, 126, 98, st(b, k));
    },
  };
}

/* ---------- 8. telomerele: se scurtează la fiecare ciclu; telomeraza le reface ---------- */
export function telo() {
  const X0 = 250, KB = 30; // 1 kb = 30 px; 20 kb = 600 px
  const bar = (g, kb, t, grow) => {
    line(g, [[90, 400], [X0 - 6, 400]], 56, C.chr);
    const L = kb * KB;
    g.save(); g.beginPath(); g.roundRect(X0, 366, Math.max(8, L), 68, 16); g.fillStyle = C.tel; g.fill(); g.lineWidth = 6; g.strokeStyle = OUT; g.stroke(); g.clip();
    g.fillStyle = 'rgba(42,21,52,.85)'; g.font = '800 15px Inter, sans-serif'; g.textBaseline = 'middle';
    for (let x = X0 + 10; x < X0 + L; x += 84) { g.fillText('TTAGGG', x, 401); g.fillRect(x + 72, 370, 3, 60); }
    g.restore();
    if (grow > 0) { ell(g, X0 + L + 30, 400, 40, 34, '#57d18a', { stroke: OUT, ow: 5, alpha: grow }); txt(g, 'telomerază', X0 + L + 30, 344, 18, '#57d18a', { alpha: grow }); }
  };
  return {
    home: HOME,
    anchors: [[280, 340], [X0 + 1.5 * KB + 20, 520], [600, 640], [760, 640]],
    phase: (i) => ['(TTAGGG)n', 'se scurtează la fiecare ciclu', 'telomeraza le reface', 'ruptura capetelor'][i] || 'capătul unei cromatide',
    draw(g, t, b) {
      bg(g);
      const k = b.i;
      // reper: unde suntem pe cromozom
      chrom(g, 120, 170, { p: 44, q: 76, w: 20, col: C.chr, tel: true }); ring(g, 150, 250, 34, 30, 1);
      lead(g, 170, 270, 300, 356); txt(g, 'capătul unei cromatide, mărit', 520, 170, 22, C.cream, { w: 700 });
      let kb = 20, grow = 0, cyc = 0;
      if (k === 1) { const u = clamp(b.bt / (b.bd * 0.8)); kb = lerp(20, 1.5, ease(u)); cyc = Math.round(u * 60); }
      else if (k === 2) { const u = clamp(b.bt / (b.bd * 0.8)); kb = lerp(5, 18, ease(u)); grow = 1; }
      else if (k === 3) kb = 9;
      bar(g, kb, t, grow);
      if (k === 3) { g.save(); g.fillStyle = '#12201a'; g.beginPath(); const x = X0 + kb * KB; g.moveTo(x + 6, 360); g.lineTo(x - 16, 376); g.lineTo(x + 2, 392); g.lineTo(x - 18, 410); g.lineTo(x + 2, 424); g.lineTo(x - 10, 440); g.lineTo(x + 14, 440); g.lineTo(x + 14, 360); g.fill(); g.restore(); txt(g, 'ruptură', X0 + kb * KB + 60, 400, 20, C.bad); }
      // scala
      for (const [v, s] of [[5, '5 kb'], [20, '20 kb']]) { g.save(); g.strokeStyle = 'rgba(234,255,241,.5)'; g.lineWidth = 3; g.beginPath(); g.moveTo(X0 + v * KB, 444); g.lineTo(X0 + v * KB, 470); g.stroke(); g.restore(); txt(g, s, X0 + v * KB, 490, 19, C.cream, { w: 700 }); }
      g.save(); g.strokeStyle = C.bad; g.lineWidth = 4; g.setLineDash([10, 8]); g.beginPath(); g.moveTo(X0 + 1.5 * KB, 330); g.lineTo(X0 + 1.5 * KB, 478); g.stroke(); g.restore();
      txt(g, '1,5 kb · valoarea critică', X0 + 1.5 * KB + 6, 310, 19, C.bad, { align: 'left' });
      if (k === 1) { txt(g, `ciclul celular nr. ${cyc}`, 720, 300, 22, C.hi); if (b.bt > b.bd * 0.8) pill(g, 500, 575, 600, 56, C.bad, 'celula nu se mai poate divide', { size: 22 }); }
      // jos: unde e activă telomeraza / ce apare după rupturi
      const a2 = k < 0 || k === 2 ? 1 : 0.25, a3 = k < 0 || k === 3 ? 1 : 0.25;
      panel(g, 40, 660, 560, 240, { alpha: a2 + 0.2 }); panel(g, 630, 660, 330, 240, { alpha: a3 + 0.2 });
      txt(g, 'telomeraza e activă în:', 320, 692, 20, '#57d18a', { alpha: a2 });
      ['țesuturile embrio-fetale', 'celulele stem din măduva osoasă', 'procesele neoplazice'].forEach((s, i) => pill(g, 320, 740 + i * 54, 480, 42, i === 2 ? C.bad : '#57d18a', s, { size: 19, alpha: a2, ow: 4 }));
      txt(g, 'după rupturi:', 795, 692, 20, C.bad, { alpha: a3 });
      g.save(); g.globalAlpha = a3; g.strokeStyle = OUT; g.lineWidth = 22; g.beginPath(); g.arc(720, 800, 40, 0, 7); g.stroke(); g.strokeStyle = C.chr; g.lineWidth = 14; g.stroke(); dot(g, 720, 760, 9, C.cen); g.restore();
      txt(g, 'r', 720, 800, 28, C.cream, { alpha: a3 }); txt(g, 'inel', 720, 872, 17, C.cream, { w: 700, alpha: a3 });
      g.save(); g.globalAlpha = a3; line(g, [[880, 730], [880, 850]], 16, C.chr); dot(g, 880, 765, 9, C.cen); dot(g, 880, 815, 9, C.cen); g.restore();
      txt(g, 'dic', 835, 790, 24, C.cream, { alpha: a3 }); txt(g, 'dicentric', 880, 872, 17, C.cream, { w: 700, alpha: a3 });
      if (k === 0) ring(g, X0 + 300, 400, 330, 60, st(b, 0));
    },
  };
}

/* ---------- 9. cromatina → cromozom (static) ---------- */
export function condense() {
  return {
    home: HOME,
    anchors: [[760, 150], [430, 150], [60, 660], [250, 520]],
    draw(g, t, b) {
      bg(g);
      // interfază: cromatină despiralizată
      ell(g, 170, 300, 130, 120, 'rgba(180,160,235,.16)', { stroke: C.nucS, ow: 4, out: false });
      g.save(); g.strokeStyle = '#d9c9ff'; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); for (let i = 0; i <= 140; i++) { const a = i * 0.33, r = 14 + i * 0.62; const x = 170 + Math.cos(a * 1.7) * r * 0.9 + Math.sin(a * 0.6) * 12, y = 300 + Math.sin(a * 2.3) * r * 0.8; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore();
      txt(g, 'cromatină', 170, 452, 22, C.cream); txt(g, '(interfază)', 170, 480, 17, C.cream, { w: 700 });
      arr(g, 318, 300, 372, 300, C.hi, 6);
      // supraspiralizare: fir gros, spiralat
      const coil = []; for (let i = 0; i <= 60; i++) { const u = i / 60; coil.push([440 + u * 130 + Math.sin(u * 44) * 16, 190 + u * 220 + Math.cos(u * 44) * 9]); }
      line(g, coil, 13, C.chrS); line(g, coil, 7, C.chr, true);
      txt(g, 'supraspiralizare', 505, 452, 22, on(b, 1) ? C.hi : C.cream); txt(g, 'și condensare', 505, 480, 17, C.cream, { w: 700 });
      arr(g, 640, 300, 694, 300, C.hi, 6);
      chrom(g, 830, 290, { p: 80, q: 130, w: 34, col: C.chr });
      txt(g, 'cromozom', 830, 452, 22, on(b, 0) ? C.hi : C.cream); txt(g, '(diviziune)', 830, 480, 17, C.cream, { w: 700 });
      if (on(b, 0)) ring(g, 830, 300, 120, 170, st(b, 0)); if (on(b, 1)) ring(g, 505, 300, 110, 140, st(b, 1));
      pill(g, 560, 548, 560, 56, '#eafff1', '„chroma” + „soma” = corpuscul colorat', { size: 21, glow: on(b, 3) ? 1 : 0 });
      // rolul: împărțire egală între celulele fiice
      panel(g, 40, 620, 920, 280, { stroke: on(b, 2) ? C.hi : undefined });
      txt(g, 'separare egală a informației ereditare', 500, 652, 21, C.hi);
      cell(g, 220, 780, 110, 90); chrom(g, 190, 780, { p: 18, q: 30, w: 9, col: C.mat }); chrom(g, 250, 780, { p: 18, q: 30, w: 9, col: C.pat });
      txt(g, 'celula mamă', 220, 884, 17, C.cream, { w: 700 });
      arr(g, 350, 760, 520, 720, C.cream, 5); arr(g, 350, 800, 520, 840, C.cream, 5);
      for (const y of [716, 844]) { cell(g, 640, y, 96, 52); chrom(g, 615, y, { p: 12, q: 20, w: 8, col: C.mat, bi: false }); chrom(g, 665, y, { p: 12, q: 20, w: 8, col: C.pat, bi: false }); }
      txt(g, 'două celule fiice,\nfiecare cu același\nmaterial genetic', 850, 780, 19, C.cream, { w: 700 });
    },
  };
}
