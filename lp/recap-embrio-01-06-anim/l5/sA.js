// Partea A (+ copertă, cronologie): sistemul urinar — 3 generații de rinichi, mezonefrosul, inducția, sistemul colector, cloaca.
import {
  W, H, cam, HOME, lbl, C, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, germ, ell, arr, ring, lead, kidney,
  OUT, clamp, lerp, ease, paint, blob, bb, smooth, REDUCED,
} from './ek.js';

/* =================================================== COPERTA: 4 surse → tot sistemul */
export function srcIcon(g, k, x, y, t, a = 1) {
  g.save(); g.globalAlpha = a;
  ell(g, x, y, 66, 66, '#2a1c18', { ow: 5, sc: 'rgba(255,230,210,.5)' });
  if (k === 0) { // mezoderm intermediar: o bandă cu 3 generații (sus → jos)
    tube(g, [[x, y - 50], [x, y + 50]], 26, C.imm, { ow: 5 });
    for (let j = 0; j < 4; j++) dot(g, x, y - 42 + j * 7, 4, '#c64c43', { ow: 0 });
    for (let j = 0; j < 4; j++) tube(g, [[x - 8, y - 12 + j * 9], [x + 8, y - 8 + j * 9]], 4, '#e06a3a', { ow: 2 });
    ell(g, x, y + 36, 16, 13, C.blast, { ow: 3 });
  } else if (k === 1) { // cloaca + septul care coboară
    ell(g, x, y + 6, 46, 40, C.sinus, { ow: 5 });
    const s = ease(clamp(loopT(t, 3) * 1.4)); // septul urorectal doar COBOARĂ (spre membrana cloacală), apoi bucla repornește
    tube(g, [[x, y - 34], [x + 2, y - 34 + 70 * s]], 9, C.septum, { ow: 4 });
  } else if (k === 2) { // gonada + celule germinale care intră
    ell(g, x, y, 42, 30, C.gonad, { ow: 5 });
    for (let j = 0; j < 3; j++) { const u = loopT(t + j * 0.8, 2.4); germ(g, lerp(x - 70, x - 8 + j * 10, u), lerp(y + 50, y + 2 - j * 6, u), 0.6, Math.sin(u * Math.PI) * 0.6 + 0.4); }
  } else { // ductele: Wolff (albastru) + Müller (roz)
    tube(g, [[x - 14, y - 46], [x - 12, y + 10], [x - 4, y + 46]], 10, C.wolff, { ow: 4 });
    tube(g, [[x + 16, y - 46], [x + 10, y + 10], [x + 2, y + 46]], 10, C.muller, { ow: 4 });
  }
  g.restore();
}
export const SRC = [
  { src: 'Mezodermul\nintermediar', mid: 'pronefros → mezonefros\n→ metanefros', res: 'rinichiul definitiv:\nnefron + colector', col: '#ffd6c4' },
  { src: 'Cloaca\n(endoderm)', mid: 'septul urorectal →\nsinusul urogenital', res: 'vezica · uretra ·\nprostata / gl. uretrale', col: '#ffe9a8' },
  { src: 'Creasta gonadală\n+ celulele germinale', mid: 'gonada indiferentă\n(aceeași la ambele sexe)', res: 'SRY → testicul\nfără Y → ovar', col: '#e3d6ff' },
  { src: 'Ductele Wolff + Müller\n+ faldurile cloacale', mid: 'stadiul indiferent\n(căi + organe externe)', res: 'căi + OGE\nmasculine / feminine', col: '#ffd0e6' },
];
export function cover({ spec }) {
  const map = (spec.sceneOpts && spec.sceneOpts.map) || null; // recapitulare: rândul tabelului → sursa
  const Y = [150, 370, 590, 810];
  const hiOf = (b) => (b.i < 0 ? -1 : map ? map[b.i] : b.i);
  const k = [0, 0, 0, 0];
  return {
    home: HOME,
    cams: map ? map.map(() => HOME) : Y.map(() => HOME),
    anchors: map ? [] : Y.map((y) => [44, y - 58]),
    draw(g, t, b) {
      bg(g);
      const hi = hiOf(b); const cyc = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 2.4) % 4 : -1;
      SRC.forEach((r, i) => {
        const y = Y[i]; const act = i === hi || i === cyc; k[i] = lerp(k[i], act ? 1 : 0, 0.08);
        const dim = hi >= 0 && !act ? 0.45 : 1;
        panel(g, 14, y - 100, 972, 200, { fill: act ? 'rgba(217,101,42,.16)' : 'rgba(255,240,228,.05)', stroke: act ? 'rgba(255,180,138,.6)' : 'rgba(255,230,210,.14)' });
        srcIcon(g, i, 110, y - 18, t, dim);
        txt(g, r.src, 110, y + 70, 17, C.cream, { alpha: dim, w: 700 });
        pill(g, 420, y, 250, 92, r.col, r.mid, { size: 19, alpha: dim, glow: k[i] });
        pill(g, 785, y, 300, 92, r.col, r.res, { size: 19, alpha: dim, glow: k[i] });
        arr(g, 184, y - 18, 286, y, '#fff3e6', 6, dim);
        arr(g, 550, y, 626, y, '#fff3e6', 6, dim);
        if (act) { flow(g, [[184, y - 18], [292, y]], t, C.hi, 3, 0.6, 6); flow(g, [[548, y], [632, y]], t, C.hi, 3, 0.6, 6); }
      });
    },
  };
}

/* =================================================== CRONOLOGIA (verticală: săptămânile în jos) */
export function timeline() {
  const ROW = ['S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S12 · sf. L3', 'L4', 'L5'];
  const Y = ROW.map((_, i) => 96 + i * 92);
  const GR = [[0, 1], [2, 3], [4, 5], [6, 8]];
  const U = [[1, 'pronefros (S4–S5) +\nprimii tubuli mezonefrici', 0], [2, 'metanefros: mugure\nureteric + blastem', 1], [3, 'mezonefros = organ oval\nde fiecare parte', 1], [4, 'septul urorectal împarte\ncloaca (S4–S7)', 2], [6, 'muguri din uretră →\nprostata / gl. uretrale', 3]];
  const G = [[0, 'falduri cloacale; celulele\ngerminale în sacul vitelin', 0], [1, 'celulele germinale prin\nmezenterul dorsal', 0], [2, 'celulele germinale\najung la gonade', 1], [3, 'apar în crestele\ngonadale', 1], [4, 'ovar: cordoanele\ncorticale', 2], [5, 'Leydig → testosteron', 2], [6, 'uretra peniană;\novar: grupuri izolate', 3], [7, 'cordoni testiculari în\npotcoavă; meatul', 3], [8, 'vaginul complet\ntunelizat', 3]];
  const gcam = GR.map(() => HOME);
  return {
    home: HOME, cams: gcam,
    anchors: GR.map(([a]) => [500, Y[a] - 40]),
    phase: (i) => ['S3–S4', 'S5–S6', 'S7–S8', 'S12 → L5'][i] || '',
    draw(g, t, b) {
      bg(g);
      txt(g, 'SISTEMUL URINAR', 250, 110, 20, '#ffb48a'); txt(g, 'SISTEMUL GENITAL', 750, 30, 20, '#d9c6ff');
      tube(g, [[500, 60], [500, 880]], 10, '#6b5650', { ow: 4 });
      // bara septului S4–S7
      tube(g, [[438, Y[1]], [438, Y[4]]], 14, C.sinus, { alpha: b.i < 0 || b.i >= 2 ? 1 : 0.3 });
      // markerul care coboară
      let my;
      if (b.i < 0) my = lerp(Y[0], Y[8], loopT(t, 9));
      else { const [a, c] = GR[b.i]; my = lerp(Y[a], Y[c], ease(clamp(b.bt / (b.bd * 0.75)))); }
      const vis = (gi, row) => (b.i < 0 ? (Y[row] <= my + 4 ? 1 : 0.35) : gi < b.i ? 0.55 : gi > b.i ? 0.12 : (Y[row] <= my + 4 ? 1 : 0.25));
      ROW.forEach((w, i) => pill(g, 500, Y[i], w.length > 4 ? 150 : 74, 40, '#3a2a26', '', { ow: 4 }));
      ROW.forEach((w, i) => txt(g, w, 500, Y[i], 18, '#ffe7d6', { stroke: false }));
      const card = (row, s, gi, left) => {
        const a = vis(gi, row); const x = left ? 250 : 750; const act = gi === b.i && a > 0.9;
        pill(g, x, Y[row], 380, 74, left ? '#ffd9c6' : '#e6dbff', '', { alpha: a, glow: act ? 1 : 0, ow: 4, r: 16 });
        txt(g, s, x, Y[row], 18, OUT, { stroke: false, alpha: a, w: 700 });
        g.save(); g.globalAlpha = a * 0.6; g.strokeStyle = '#fff3e6'; g.lineWidth = 3; g.beginPath(); g.moveTo(left ? 440 : 560, Y[row]); g.lineTo(left ? 462 : 538, Y[row]); g.stroke(); g.restore();
      };
      U.forEach(([r, s, gi]) => card(r, s, gi, true));
      G.forEach(([r, s, gi]) => card(r, s, gi, false));
      dot(g, 500, my, 15, C.hi, { ow: 4 });
    },
  };
}

/* =================================================== 3 GENERAȚII DE RINICHI (craniocaudal) */
export function kidney3() {
  const SEG = [['cervical', 70, 250], ['toracic', 250, 560], ['lombar', 560, 720], ['sacral', 720, 880]];
  const side = [-1, 1];
  const XS = (s) => 500 + s * 62;         // banda de mezoderm intermediar
  const XD = (s) => 500 + s * 104;        // canalul Wolff (lateral de tubuli)
  const duct = (s) => [[XD(s), 455], [XD(s), 640], [XD(s) - s * 4, 770], [500 + s * 40, 838]];
  return {
    home: HOME, cams: [cam(520, 420, 1.06), HOME, cam(520, 500, 1.06)],
    anchors: [[330, 160], [330, 520], [330, 790]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3);
      // trunchiul embrionului (vedere dorsală, schematic)
      const body = new Path2D(); body.roundRect(330, 50, 340, 850, 150);
      g.save(); g.fillStyle = 'rgba(255,235,220,.07)'; g.fill(body); g.strokeStyle = 'rgba(255,230,210,.35)'; g.lineWidth = 4; g.stroke(body); g.restore();
      SEG.forEach(([n, a, c], i) => { g.save(); g.strokeStyle = 'rgba(255,230,210,.18)'; g.setLineDash([10, 10]); g.lineWidth = 2; g.beginPath(); g.moveTo(130, c); g.lineTo(700, c); g.stroke(); g.restore(); txt(g, n, 180, (a + c) / 2, 22, '#d8c4b8', { w: 700 }); });
      tube(g, [[500, 70], [500, 860]], 16, 'rgba(255,240,228,.25)', { ow: 0 }); // tubul neural / axa
      side.forEach((s) => tube(g, [[XS(s), 80], [XS(s), 820]], 40, C.imm, { ow: 4, alpha: 0.55 }));
      // cloaca
      ell(g, 500, 850, 70, 34, C.sinus, { ow: 5 }); txt(g, 'cloaca', 500, 850, 18, OUT, { stroke: false });
      // 1 · PRONEFROS: 7–10 grupuri solide cervicale; apare în S4, dispare în S5
      const p0 = p(0); const fade = b.i < 0 ? (p(1) > 0 ? 1 : 0) : b.i === 0 ? clamp((b.bt / b.bd - 0.62) / 0.25) : b.i > 0 ? 1 : 0;
      side.forEach((s) => { for (let j = 0; j < 8; j++) { const y = 100 + j * 19; const a = clamp(p0 * 8 - j); if (a <= 0) continue; if (fade < 1) dot(g, XS(s), y, 9, '#e0603f', { alpha: a * (1 - fade) }); if (fade > 0) { g.save(); g.globalAlpha = 0.45 * fade; g.setLineDash([4, 4]); g.strokeStyle = '#ffd6c4'; g.lineWidth = 2; g.beginPath(); g.arc(XS(s), y, 9, 0, 7); g.stroke(); g.restore(); } } });
      // 2 · MEZONEFROS: tubuli în S (toracic inferior → L3), canalul Wolff spre cloacă
      const p1 = p(1);
      side.forEach((s) => {
        tube(g, duct(s), 12, C.wolff, { u1: p1 });
        for (let j = 0; j < 11; j++) { const y = 470 + j * 21; const a = clamp(p1 * 12 - j); if (a <= 0) continue; tube(g, [[XS(s) - s * 14, y - 4], [XS(s) + s * 6, y - 10], [XS(s) + s * 14, y + 4], [XD(s), y + 6]], 6, '#e06a3a', { ow: 3, alpha: a }); }
      });
      // 3 · METANEFROS: mugurele ureteric din Wolff, lângă cloacă + blastemul (sacral)
      const p2 = p(2);
      side.forEach((s) => {
        if (p2 > 0) tube(g, [[XD(s) - s * 4, 770], [XD(s) - s * 14, 760], [XS(s) + s * 4, 760]], 9, C.bud, { u1: clamp(p2 * 1.6) });
        if (p2 > 0.35) ell(g, XS(s) - s * 2, 748, 30 * ease((p2 - 0.35) / 0.65), 26 * ease((p2 - 0.35) / 0.65), C.blast, { ow: 5 });
      });
      // coloana din dreapta: timpul
      const RX = 835;
      pill(g, RX, 140, 240, 60, '#ffd6c4', 'PRONEFROS', { size: 20, alpha: b.i < 0 || b.i >= 0 ? 1 : 1, glow: on(b, 0) ? 1 : 0 });
      txt(g, '7–10 grupuri solide\nnefuncțional · S4–S5', RX, 210, 17, C.cream, { w: 600 });
      pill(g, RX, 470, 240, 60, '#cfe0ff', 'MEZONEFROS', { size: 20, glow: on(b, 1) ? 1 : 0, alpha: p1 > 0 ? 1 : 0.35 });
      txt(g, 'toracic inferior → lombar 3\nprovizoriu · S4 → S6', RX, 540, 17, C.cream, { w: 600, alpha: p1 > 0 ? 1 : 0.35 });
      pill(g, RX, 690, 240, 60, '#ffc9c2', 'METANEFROS', { size: 20, glow: on(b, 2) ? 1 : 0, alpha: p2 > 0 ? 1 : 0.35 });
      txt(g, 'definitiv · S5 →\nmugure + blastem', RX, 760, 17, C.cream, { w: 600, alpha: p2 > 0 ? 1 : 0.35 });
      arr(g, RX, 250, RX, 420, '#ffb48a', 5, 0.6); arr(g, RX, 590, RX, 640, '#ffb48a', 5, 0.6);
      txt(g, 'în timp ↓', RX + 92, 330, 17, '#ffb48a', { w: 700 });
      if (on(b, 0)) ring(g, 500, 170, 110, 110, ease(b.bt * 1.4));
      if (on(b, 1)) ring(g, 500, 580, 150, 140, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, 500, 760, 120, 60, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== MEZONEFROSUL: o unitate + secțiunea S6 */
export function meso() {
  const AO = 100, DX = 440;
  const TUB = [[262, 420], [300, 360], [360, 380], [330, 470], [380, 520], [DX, 520]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[420, 300], [160, 500], [DX + 50, 700], [870, 300]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      panel(g, 22, 60, 500, 830); panel(g, 540, 60, 440, 830);
      // aorta + canalul Wolff
      tube(g, [[AO, 110], [AO, 820]], 40, C.aorta, { ow: 6 }); txt(g, 'aorta', AO, 90, 20, C.cream);
      tube(g, [[DX, 120], [DX, 820]], 22, C.wolff, { ow: 6, u1: 0.12 + 0.88 * Math.max(p(2), 0.999 * (b.i < 0 ? 1 : 0)) });
      txt(g, 'canalul\nWolff', DX + 18, 160, 20, '#cfe0ff', { align: 'left' });
      // 1 · tubulul mezonefric: veziculă → tub în S
      const p0 = p(0);
      if (p0 > 0) tube(g, TUB, 22, '#f08a5a', { ow: 6, u1: p0, lumen: '#ffd6c4' });
      // 2 · capătul medial înconjoară ghemul capilar din aortă → glomerul + capsula Bowman
      const p1 = p(1);
      if (p1 > 0) {
        tube(g, [[AO, 430], [180, 425], [235, 420]], 12, C.aorta, { u1: p1, ow: 4 });
        g.save(); g.globalAlpha = p1; for (let j = 0; j < 5; j++) { const a = j * 1.26 + t * 0.6; tube(g, [[248, 420], [248 + Math.cos(a) * 26, 420 + Math.sin(a) * 26]], 7, '#e0443e', { ow: 3 }); } g.restore();
        g.save(); g.globalAlpha = p1; g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 22; g.beginPath(); g.arc(250, 420, 44, 0.9, 0.9 + 4.6 * p1); g.stroke(); g.strokeStyle = '#f08a5a'; g.lineWidth = 14; g.stroke(); g.restore();
        txt(g, 'glomerul + Bowman', 250, 330, 20, C.cream, { alpha: p1 });
      }
      // 3 · capătul lateral se varsă în canal; canalul → cloacă
      const p2 = p(2);
      if (p2 > 0.3) { flow(g, curve(TUB.slice(2)), t, '#ffe36e', 4, 0.35, 6, { alpha: p2 }); flow(g, [[DX, 520], [DX, 820]], t, '#ffe36e', 5, 0.25, 6, { alpha: p2 }); }
      txt(g, '↓ spre cloacă', DX, 860, 20, '#cfe0ff', { alpha: Math.max(0.35, p2) });
      txt(g, 'tubul în S', 345, 610, 20, '#ffd6c4', { alpha: p0 });
      txt(g, 'o unitate mezonefrică', 270, 860, 18, '#c9b3a6', { w: 600 });
      // 4 · secțiunea transversală S6: creasta urogenitală
      const p3 = p(3); const cx = 765;
      g.save(); g.fillStyle = 'rgba(255,240,228,.05)'; g.beginPath(); g.roundRect(560, 150, 400, 680, 30); g.fill(); g.restore();
      tube(g, [[580, 170], [950, 170]], 30, C.wall, { ow: 5 }); txt(g, 'peretele dorsal', cx, 120, 18, '#d8c4b8', { w: 700 });
      ell(g, cx, 235, 26, 26, C.aorta, { ow: 5 }); txt(g, 'aorta', cx + 70, 235, 18, C.cream, { w: 700 });
      tube(g, [[cx, 262], [cx, 610]], 14, '#e7c9b0', { ow: 4 }); // mezenterul dorsal
      ell(g, cx, 650, 46, 40, '#f4c34f', { ow: 5 }); txt(g, 'intestin', cx, 715, 18, '#ffe9a8', { w: 700 });
      [-1, 1].forEach((s) => {
        const x = cx + s * 120; const pul = on(b, 3) ? 0.5 + 0.5 * Math.sin(t * 4) : 0;
        ell(g, x + s * 22, 330, 50, 104, '#f7b9a2', { ow: 5 });       // coarda mezonefrică (lateral)
        for (let j = 0; j < 4; j++) dot(g, x + s * 30, 270 + j * 38, 9, '#e06a3a', { ow: 2 });
        dot(g, x + s * 52, 350, 11, C.wolff, { ow: 3 });
        ell(g, x - s * 38, 370, 26, 70, C.gonad, { ow: 5, alpha: 0.6 + 0.4 * Math.max(p3, pul) }); // coarda genitală (medial)
      });
      txt(g, 'coarda\nmezonefrică', cx - 160, 470, 17, '#ffd6c4', { w: 700 });
      txt(g, 'coarda\ngenitală', cx - 35, 490, 17, '#d9c6ff', { w: 700 });
      if (p3 > 0.4) { arr(g, cx + 82, 470, cx + 82, 560, '#d9c6ff', 5, p3); txt(g, '→ gonada', cx + 140, 580, 20, '#d9c6ff', { alpha: p3 }); }
      txt(g, 'creasta urogenitală (S6), secțiune', cx, 790, 17, '#c9b3a6', { w: 600 });
      if (on(b, 0)) ring(g, 330, 450, 100, 110, ease(b.bt * 1.4));
      if (on(b, 1)) ring(g, 250, 420, 62, 62, ease(b.bt * 1.4));
      if (on(b, 3)) ring(g, cx, 350, 190, 130, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== METANEFROSUL: mugure + blastem, inducție reciprocă */
export function induce() {
  const DX = 140;
  const BUD = [[DX + 4, 700], [220, 610], [300, 480], [360, 410]];
  const BR = [[[360, 410], [400, 340], [430, 290]], [[360, 410], [420, 420], [470, 440]]];
  const NEPH = [[436, 280], [490, 240], [530, 270], [505, 320], [478, 300], [500, 222], [545, 190]];
  srand2(5);
  const CELLS = Array.from({ length: 34 }, () => [R(260, 600), R(220, 520)]);
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[220, 560], [470, 230], [300, 330], [622, 690]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      tube(g, [[DX, 60], [DX, 760], [200, 830]], 24, C.wolff, { ow: 6 }); txt(g, 'canalul\nWolff', DX - 6, 120, 20, '#cfe0ff', { align: 'right' });
      ell(g, 250, 845, 80, 38, C.sinus, { ow: 5 }); txt(g, 'cloaca', 250, 845, 18, OUT, { stroke: false });
      const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3);
      // blastemul: celule împrăștiate → capac peste vârful mugurelui
      CELLS.forEach(([x, y], j) => {
        const a = j / CELLS.length * Math.PI * 1.3 - 2.3; const cxp = 360 + Math.cos(a) * 62, cyp = 410 + Math.sin(a) * 62;
        const k = p2 > 0 ? (j % 2 ? BR[0][2] : BR[1][2]) : null;
        let X = lerp(x, cxp, p1), Y = lerp(y, cyp, p1);
        if (k) { const a2 = j / CELLS.length * Math.PI * 1.6 - 2.6; X = lerp(X, k[0] + Math.cos(a2) * 48, p2); Y = lerp(Y, k[1] + Math.sin(a2) * 48, p2); }
        dot(g, X, Y, 12, C.blast, { ow: 3, alpha: p3 > 0.5 && j % 2 === 1 ? 1 - (p3 - 0.5) * 1.6 : 1 });
      });
      txt(g, 'mezodermul metanefric\n(blastemul)', 470, 560, 20, '#ffc9c2', { alpha: 1 - p2 * 0.6 });
      // mugurele ureteric
      tube(g, BUD, 26, C.bud, { ow: 6, u1: Math.max(0.04, p0) });
      if (p0 > 0.5) txt(g, 'mugurele\nureteric (S5)', 250, 700, 20, '#bff0d2', { alpha: (p0 - 0.5) * 2 });
      if (p2 > 0) BR.forEach((br) => tube(g, br, 18, C.bud, { ow: 5, u1: p2 }));
      // inducția reciprocă: săgeți care pulsează
      if (on(b, 2) || (b.i < 0 && p2 > 0 && p3 === 0)) {
        const u = loopT(t, 1.4);
        arr(g, 300, 470, 300 + 70 * u, 470 - 110 * u, C.bud, 6, 1); txt(g, 'mugure → induce nefronii', 200, 300, 19, '#bff0d2');
        arr(g, 560, 430, 560 - 90 * u, 430 + 10 * u, C.blast, 6, 1); txt(g, 'blastem → induce ramificarea', 640, 500, 19, '#ffc9c2');
      }
      // rezultatul: nefronul (din blastem) se leagă de tubul colector (din mugure)
      if (p3 > 0) {
        tube(g, NEPH, 14, '#f08a5a', { ow: 5, u1: p3, lumen: '#ffd6c4' });
        if (p3 > 0.85) { ell(g, 552, 180, 26, 26, '#f08a5a', { ow: 5 }); ell(g, 552, 180, 13, 13, '#e0443e', { ow: 3 }); }
        txt(g, 'nefron\n(din blastem)', 610, 300, 18, '#ffd6c4', { alpha: p3 });
        txt(g, 'tub colector\n(din mugure)', 330, 250, 18, '#bff0d2', { alpha: p3 });
      }
      // casetele
      const box = (y, h, col, head, lines, glow) => { pill(g, 810, y + h / 2, 330, h, col, '', { glow, r: 22 }); txt(g, head, 810, y + 34, 19, OUT, { stroke: false }); lines.forEach((l, j) => txt(g, l, 810, y + 74 + j * 30, 18, OUT, { stroke: false, w: 600 })); };
      box(70, 230, '#c9f0d8', 'MUGURELE URETERIC\n→ sistemul COLECTOR', ['ureter · bazinet', 'calice mari + calice mici', 'tubii colectori'], on(b, 0) ? 1 : 0);
      box(340, 260, '#ffd3cd', 'MEZODERMUL METANEFRIC\n→ nefronul', ['capsula Bowman', 'tub contort proximal', 'ansa Henle', 'tub contort distal'], on(b, 1) ? 1 : 0);
      if (p3 > 0.5) { pill(g, 810, 690, 330, 70, C.hi, '1–3 milioane de nefroni', { size: 21, alpha: (p3 - 0.5) * 2 }); txt(g, '(cifra din LP)', 810, 750, 17, C.cream, { alpha: (p3 - 0.5) * 2, w: 600 }); }
    },
  };
}
let S2 = 1; function srand2(s) { S2 = s; } function R(a, c) { S2 = (S2 * 16807) % 2147483647; return a + (c - a) * ((S2 - 1) / 2147483646); }

/* =================================================== SISTEMUL COLECTOR: 12 generații */
export function branch() {
  const PV = [300, 470];
  const MAJ = [[470, 300], [470, 640]];
  const MIN = [[620, 215], [620, 385], [620, 555], [620, 725]];
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[300, 380], [620, 140], [860, 200]],
    phase: (i) => ['gen. 1 → 12', 'gen. 2 + 3 + 4 = calice mici', 'gen. 5–12 = piramida'][i] || '',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3); const p0 = p(0), p1 = p(1), p2 = p(2);
      // piramidele: tubii colectori (gen. 5–12) converg spre caliciul mic
      MIN.forEach(([x, y], k) => {
        const tip = [x + 30, y];
        if (p2 > 0) { const tri = new Path2D(); tri.moveTo(tip[0] + 8, y); tri.lineTo(930, y - 74); tri.lineTo(930, y + 74); tri.closePath(); g.save(); g.globalAlpha = p2 * 0.85; paint(g, tri, '#cdeedb', null, null, [tip[0], y - 74, 300, 148], OUT, 5); g.restore(); }
        for (let j = 0; j < 8; j++) { const ey = y - 64 + j * 18.3; const len = lerp(0.42, 1, p2); tube(g, [tip, [lerp(tip[0], 920, len), lerp(y, ey, len)]], 4, C.bud, { ow: 2, alpha: Math.max(0.25, p0) * (p0 > 0.6 ? 1 : 0) }); }
      });
      // ureterul + bazinetul (dilatarea)
      tube(g, [[50, 470], [PV[0] - 40, 470]], 30, C.bud, { ow: 6 }); txt(g, 'ureter', 110, 420, 20, '#bff0d2');
      const pr = lerp(18, 70, ease(clamp(p0 * 3)));
      // calicele mari: porțiunea craniană + caudală
      MAJ.forEach((m) => tube(g, [PV, m], 30, C.bud, { ow: 6, u1: clamp(p0 * 3 - 0.6) }));
      // generația 2 → se lărgește și absoarbe 3 + 4
      MAJ.forEach((m, k) => [MIN[k * 2], MIN[k * 2 + 1]].forEach((n) => tube(g, [m, n], lerp(14, 34, p1), C.bud, { ow: 5, u1: clamp(p0 * 3 - 1.2) })));
      MIN.forEach(([x, y]) => {
        // gen. 3 + 4: ramuri mici, absorbite
        if (p0 > 0.55 && p1 < 1) { const s = 1 - p1; [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, c]) => tube(g, [[x, y], [x + 26 * s, y + a * 22 * s], [x + 44 * s, y + a * 22 * s + c * 14 * s]], 7, C.bud, { ow: 3, alpha: s })); }
        if (p1 > 0) { g.save(); g.globalAlpha = p1; g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 16; g.beginPath(); g.arc(x + 34, y, 30, Math.PI * 0.55, Math.PI * 1.45); g.stroke(); g.strokeStyle = '#7fd9a3'; g.lineWidth = 10; g.stroke(); g.restore(); }
      });
      ell(g, PV[0], PV[1], pr, pr * 0.8, C.bud, { ow: 6 });
      txt(g, 'bazinet', PV[0], PV[1] + 96, 20, '#bff0d2', { alpha: p0 });
      txt(g, 'caliciu mare\ncranial', 385, 300, 19, '#bff0d2', { alpha: p0 }); txt(g, 'caliciu mare\ncaudal', 385, 650, 19, '#bff0d2', { alpha: p0 });
      txt(g, 'calice mici\n(gen. 2 + 3 + 4)', 640, 470, 19, C.cream, { alpha: p1 });
      txt(g, 'tubii colectori (gen. 5–12)\n→ piramida renală', 790, 880, 19, C.cream, { alpha: p2 });
      // contorul de generații
      const gen = b.i < 0 ? 12 : b.i === 0 ? Math.max(1, Math.round(1 + 11 * clamp(b.bt / (b.bd * 0.8)))) : 12;
      pill(g, 160, 110, 230, 56, C.hi, `generația ${gen} / 12`, { size: 21 });
      if (on(b, 0)) ring(g, PV[0], PV[1], 90, 80, ease(b.bt * 1.4));
      if (on(b, 1)) MIN.forEach(([x, y]) => ring(g, x + 30, y, 46, 46, ease(b.bt * 1.4)));
    },
  };
}

/* =================================================== CLOACA → sinusul urogenital (secțiune sagitală) */
export function cloaca() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[560, 520], [370, 420], [360, 760], [330, 690]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3);
      txt(g, 'anterior ←', 150, 900, 19, '#d8c4b8', { w: 700 }); txt(g, '→ posterior', 850, 900, 19, '#d8c4b8', { w: 700 });
      // intestinul posterior (sus, posterior) → canalul anorectal
      tube(g, [[700, 60], [680, 260], [620, 470]], 46, C.anal, { ow: 6 });
      // alantoida (anterior) → uraca: devine cordon fibros
      const ural = p1;
      tube(g, [[300, 70], [330, 260], [400, 450]], lerp(30, 12, ural), ural > 0.5 ? '#e7d3b5' : C.sinus, { ow: 6, dash: ural > 0.5 ? [16, 10] : null });
      txt(g, ural > 0.5 ? 'alantoida → uraca\n→ lig. ombilical median' : 'alantoida', 190, 170, 19, '#ffe9a8');
      // cloaca nedivizată → sinus urogenital + canal anorectal
      const bag = new Path2D(); bag.ellipse(505, 640, 175, 170, 0, 0, Math.PI * 2);
      const sx = (y) => 505 + (y - 470) * 0.05;
      const sy = lerp(470, 812, p0); // vârful septului coboară
      g.save(); paint(g, bag, C.sinus, C.sinusS, '#fff2c4', bb(505, 640, 175, 170), OUT, 6);
      g.save(); g.clip(bag); g.globalAlpha = p0; g.fillStyle = C.anal; g.beginPath(); g.moveTo(sx(470), 400); g.lineTo(sx(sy), sy); g.lineTo(sx(sy), 900); g.lineTo(800, 900); g.lineTo(800, 400); g.closePath(); g.fill(); g.restore(); g.restore();
      // după divizare: vezica (partea superioară), partea pelvină (îngustă), partea falică
      if (p1 > 0) {
        const r = lerp(60, 120, p1);
        ell(g, 410, 540, r * 0.95, r, C.sinus, { ow: 6, shade: C.sinusS, light: '#fff2c4' });
        txt(g, 'VEZICA', 410, 540, 24, OUT, { stroke: false, alpha: p1 });
      }
      // septul urorectal (mezoderm roșu)
      if (p0 > 0) { const sp = new Path2D(); sp.moveTo(sx(470) - 26, 450); sp.lineTo(sx(470) + 26, 450); sp.lineTo(sx(sy) + 6, sy); sp.lineTo(sx(sy) - 6, sy); sp.closePath(); paint(g, sp, C.septum, '#a8342d', null, [470, 450, 60, sy - 450], OUT, 5); }
      // membrana cloacală
      tube(g, [[400, 812], [610, 812]], 8, '#2a1534', { ow: 0 });
      if (p0 > 0.6) txt(g, 'septul urorectal', 548, 388, 19, '#ffb0a8');
      if (p0 > 0.6) txt(g, 'canal\nanorectal', 640, 690, 20, '#e8d9ff');
      txt(g, p0 > 0.6 ? 'sinusul\nurogenital' : 'cloaca', p0 > 0.6 ? 420 : 505, p0 > 0.6 ? 735 : 650, 20, OUT, { stroke: false, alpha: p1 > 0.5 ? 0 : 1 });
      // părțile sinusului urogenital (etichete pe dreapta)
      const part = (y, s, a, x0, y0) => { if (a <= 0) return; lead(g, x0, y0, 790, y, a); pill(g, 880, y, 230, 76, '#ffe9a8', s, { size: 17, alpha: a, w: 700 }); };
      part(250, 'partea VEZICALĂ\n→ vezica urinară', p1, 470, 470);
      if (p2 > 0) { tube(g, [[420, 655], [420, 740]], 34, C.sinus, { ow: 6, alpha: p2 }); const ph = new Path2D(); ph.moveTo(400, 740); ph.lineTo(440, 740); ph.lineTo(470, 805); ph.lineTo(330, 805); ph.closePath(); g.save(); g.globalAlpha = p2; paint(g, ph, C.sinus, null, null, [330, 740, 140, 65], OUT, 5); g.restore(); }
      part(560, 'partea PELVINĂ →\nuretra prostatică\n+ membranoasă', p2, 445, 700);
      part(780, 'partea FALICĂ →\nuretra peniană /\nvestibul', p2, 460, 790);
      // S12: epiteliul uretrei înmugurește → prostata / gl. uretrale
      if (p3 > 0) for (let j = 0; j < 6; j++) { const a = (j % 3) * 0.5 - 0.5, s = j < 3 ? -1 : 1; const r = 10 + 12 * p3; dot(g, 420 + s * (24 + 20 * p3) + Math.sin(a) * 8, 668 + (j % 3) * 30, r, '#ffd36a', { ow: 3 }); }
      if (p3 > 0.3) txt(g, 'S12: muguri →\nprostata (♂)\ngl. uretrale (♀)', 210, 640, 18, '#fff3e6', { alpha: p3 });
      if (on(b, 0)) ring(g, 505, 640, 190, 185, ease(b.bt * 1.4));
      if (on(b, 3)) ring(g, 420, 700, 80, 70, ease(b.bt * 1.4));
    },
  };
}
