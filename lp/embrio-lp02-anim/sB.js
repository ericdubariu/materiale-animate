// Partea B: derivatele arcurilor (harta, nervii, arterele, mușchii, scheletul). Culoarea = arcul de origine (ARC), ca în LP.
import {
  cam, HOME, C, bg, P, on, loopT, txt, pill, curve, at, sub, tube, flow, dot, ell, arr, ring, lead, OUT, clamp, lerp, ease, paint, smooth, REDUCED, srand, rr,
  ARC, ARCS, ARCS_, ARCL, L, G, sp, nerve, artery, bar, muscle, embryoLat, childHead, skullLat, ARCH_LAT,
} from './ka.js';
import { lupa } from './sA.js';

const T = (x, y, s) => (px, py) => [x + px * s, y + py * s]; // coordonate locale → scenă

/* =================================================== HARTA ARCURILOR: tabelul din LP, arc cu arc
   Se vede: stânga, embrionul lateral (arcurile colorate pe ARC); arcul punctului se aprinde, restul rămân vizibile, mai stinse.
   Arcul 6 nu se vede din exterior: apare punctat, caudal de arcul 4, doar pe punctul lui. Dreapta, o lupă legată de arc: secțiunea
   prin acel arc (mezenchim în culoarea arcului) cu cele 4 primordii, toate în culoarea arcului: nervul (sus-stânga), artera (sus-dreapta),
   cartilajul (centru), mușchiul (jos), fiecare cu derivatul lui din tabelul LP. Intro: lupa trece prin arcuri pe rând. */
const MAPTX = {
  1: { n: 'V2 + V3 (trigemen)', a: 'a. maxilară (o parte)', c: 'Meckel → ciocan, nicovală\nmaxila, zigomatic, temporal', m: 'masticatori, milohioid,\npântec ant. digastric, tensorii', l: 'lig. sfenomandibular' },
  2: { n: 'VII facial', a: 'a. hioidă + a. stapedială', c: 'scăriță, proc. stiloid,\ncornul mic + hioid sus', m: 'mimica, pântec post. digastric,\nstilohioid, stapedius', l: 'lig. stilohioid' },
  3: { n: 'IX glosofaringian', a: 'a. carotidă comună + internă', c: 'cornul mare + hioid jos', m: 'stilofaringian', l: '' },
  4: { n: 'X: n. laringeu superior', a: 'stg: arcul aortei\ndr: a. subclavie dr.', c: 'cartilajele laringelui (4 + 6)', m: 'cricotiroidian, ridicătorul vălului,\nconstrictorii faringelui', l: '' },
  6: { n: 'X: n. laringeu recurent', a: 'stg: ductus arteriosus\ndr: a. pulmonară dr.', c: 'cartilajele laringelui (4 + 6)', m: 'intrinsecii laringelui (4 + 6)', l: '' },
};
export function archMap() {
  const EX = 250, EY = 470, ES = 0.6; const LX = 690, LY = 470, LR = 268;
  const R0 = embryoLat(null, EX, EY, ES, 0, { alpha: 0 });
  const arc6 = [[EX - 70 * ES, EY + 156 * ES], [EX + 20 * ES, EY + 166 * ES], [EX + 100 * ES, EY + 160 * ES]];
  const apos = (k) => (k === 6 ? arc6[1] : R0.arch(k));
  return {
    home: HOME, cams: ARCS.map(() => HOME),
    anchors: ARCS.map((k) => { const p = apos(k); return [p[0] - 130 * ES - 26, p[1]]; }),
    phase: (i) => (i >= 0 ? `arcul ${ARCS[i]}` : 'arc cu arc'),
    draw(g, t, b) {
      bg(g);
      const k = b.i >= 0 ? ARCS[b.i] : ARCS[Math.floor(t / 3.2) % 5];
      const q = b.i >= 0 ? ease(clamp(b.bt / (b.bd * 0.45))) : ease(clamp((t % 3.2) / 0.8));
      embryoLat(g, EX, EY, ES, t, { col: true, hi: [k === 6 ? 4 : k], dimArc: 0.4 });
      [1, 2, 3, 4].forEach((n) => { const [x, y] = R0.archV(n); txt(g, String(n), x - 16, y, 18, OUT, { stroke: false, w: 900 }); });
      if (k === 6) { g.save(); g.globalAlpha = q; g.setLineDash([8, 7]); tube(g, arc6, 22, 'rgba(181,131,90,.55)', { ow: 3 }); g.restore(); txt(g, '6 (ascuns)', arc6[2][0] + 20, arc6[2][1] + 20, 15, ARCL[6], { alpha: q, align: 'left' }); }
      const ap = apos(k);
      lead(g, ap[0] + 40, ap[1], LX - LR + 4, LY, 1);
      lupa(g, LX, LY, LR, 1, () => {
        const ox = LX, oy = LY + 6; const RX = 178, RY = 128;
        const ov = new Path2D(); ov.ellipse(ox, oy, RX, RY, 0, 0, 7); paint(g, ov, ARCL[k], null, null, [ox - RX, oy - RY, RX * 2, RY * 2], OUT, 0);
        g.save(); g.lineWidth = 18; g.strokeStyle = OUT; g.beginPath(); g.ellipse(ox, oy, RX, RY, 0, Math.PI * 0.62, Math.PI * 1.62); g.stroke(); g.strokeStyle = L.ecto; g.lineWidth = 11; g.stroke(); g.strokeStyle = OUT; g.lineWidth = 18; g.beginPath(); g.ellipse(ox, oy, RX, RY, 0, -Math.PI * 0.38, Math.PI * 0.62); g.stroke(); g.strokeStyle = L.endo; g.lineWidth = 11; g.stroke(); g.restore();
        const s1 = sp(q, 0, 0.4), s2 = sp(q, 0.15, 0.55), s3 = sp(q, 0.3, 0.7), s4 = sp(q, 0.45, 0.85);
        g.save(); g.globalAlpha = s1; const cb = new Path2D(); cb.roundRect(ox - 86, oy - 24, 172, 48, 24); paint(g, cb, ARC[k], ARCS_[k], ARCL[k], [ox - 86, oy - 24, 172, 48], OUT, 4); g.restore();
        g.save(); g.globalAlpha = s2; ell(g, ox - 108, oy - 62, 34, 31, ARC[k], { shade: ARCS_[k], ow: 4 }); [[-11, -8], [11, -10], [0, 11], [-14, 12], [14, 10]].forEach(([dx, dy]) => ell(g, ox - 108 + dx, oy - 62 + dy, 7, 7, ARCL[k], { ow: 2 })); g.restore();
        g.save(); g.globalAlpha = s3; ell(g, ox + 104, oy - 62, 34, 34, ARC[k], { shade: ARCS_[k], ow: 4 }); ell(g, ox + 104, oy - 62, 16, 16, L.lum, { ow: 2 }); g.restore();
        muscle(g, ox + 20, oy + 72, 170, 56, -0.06, ARC[k], { alpha: s4, shade: ARCS_[k] });
        const X = MAPTX[k];
        txt(g, 'nerv: ' + X.n, ox - 96, oy - 122, 17, ARCL[k], { alpha: s2 });
        txt(g, X.a, ox + 120, oy - 128, 16, ARCL[k], { alpha: s3 });
        txt(g, X.c, ox - 10, oy + 166, 16, ARCL[k], { alpha: s1 });
        txt(g, X.m, ox + 10, oy + 220, 15, ARCL[k], { alpha: s4 });
        if (X.l) txt(g, X.l, ox - 168, oy + 74, 15, '#ffd6c4', { alpha: s1 });
        txt(g, 'cartilaj', ox, oy, 16, OUT, { stroke: false, alpha: s1 });
        txt(g, `ARCUL ${k}`, ox, oy - 196, 22, ARC[k], { w: 900 });
      });
      ring(g, ap[0], ap[1], 120 * ES + 20, 40, ease(b.bt * 1.4) * (b.i >= 0 ? 1 : 0));
    },
  };
}

/* =================================================== NERVII: un nerv cranian pentru fiecare arc (embrionul lateral, ventral = dreapta)
   Se vede: embrionul mare; pe spate (dorsal), prin transparență, rombencefalul, din care ies nervii spre arcuri, fiecare în culoarea
   arcului lui: V (ganglionul trigeminal) → V2 în procesul maxilar, V3 în procesul mandibular (V1 oftalmic, punctat, spre ochi:
   nu e nerv de arc); VII → arcul 2; IX → arcul 3; X coboară spre torace și dă n. laringeu superior → arcul 4 și n. laringeu recurent
   → arcul 6 (ascuns, punctat, caudal de 4). Pe punctul lui, nervul crește din trunchiul cerebral până în arc; apoi impulsuri curg
   spre arc. Ceilalți nervi rămân vizibili, mai stinși. */
const NV = {
  V0: [[-176, -176], [-96, -142]], V1: [[-96, -142], [0, -196], [66, -204]], V2: [[-96, -142], [20, -134], [150, -134]], V3: [[-96, -142], [0, -104], [100, -84], [196, -68]],
  VII: [[-196, -104], [-110, -54], [40, -12], [176, 6]], IX: [[-206, -56], [-120, 8], [30, 50], [150, 62]],
  X: [[-210, -12], [-150, 40], [-140, 130], [-120, 260], [-92, 370]], XS: [[-148, 72], [-40, 100], [110, 108]], XR: [[-132, 200], [-40, 172], [70, 156]],
};
export function nerves() {
  const EX = 610, EY = 440, ES = 1.0; const TT = T(EX, EY, ES);
  const NP = Object.fromEntries(Object.entries(NV).map(([k, v]) => [k, v.map(([x, y]) => TT(x, y))]));
  const ARC6 = [[-60, 150], [20, 160], [100, 154]].map(([x, y]) => TT(x, y));
  const LAB = [[TT(150, -134), 'V2'], [TT(196, -68), 'V3'], [TT(176, 6), 'VII'], [TT(150, 62), 'IX']];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [TT(-60, -230), TT(-40, -48), TT(-60, 40), TT(-196, 140)],
    phase: (i) => ['arcul 1 → V (V2, V3)', 'arcul 2 → VII', 'arcul 3 → IX', 'arcurile 4, 6 → X'][i] || 'V · VII · IX · X',
    draw(g, t, b) {
      bg(g);
      const hi = b.i < 0 ? [] : [[1, 'max'], [2], [3], [4]][b.i];
      embryoLat(g, EX, EY, ES, t, { col: true, hi, dimArc: 0.55 });
      // rombencefalul (prin transparență)
      g.save(); g.globalAlpha = 0.55; tube(g, [TT(-150, -230), TT(-200, -150), TT(-214, -40), TT(-212, 30)], 30, '#e7a2b4', { ow: 3 }); g.restore();
      txt(g, 'rombencefal', ...TT(-238, -250), 15, '#ffd6e0', { align: 'left' });
      if (b.i === 3 || b.i < 0) { g.save(); g.globalAlpha = 0.9; g.setLineDash([8, 7]); tube(g, ARC6, 22, 'rgba(181,131,90,.6)', { ow: 3 }); g.restore(); txt(g, 'arcul 6 (ascuns)', ARC6[0][0] - 10, ARC6[0][1] + 34, 15, ARCL[6], { align: 'left' }); }
      const grow = (k) => (b.i < 0 ? 1 : b.i === k ? ease(clamp(b.bt / (b.bd * 0.55))) : 1);
      const al = (k) => (b.i < 0 || b.i === k ? 1 : 0.45);
      const N = (pts, col, w, k, o = {}) => { const P0 = nerve(g, pts, w, col, { u1: grow(k), alpha: al(k), fib: OUT, ...o }); if (b.i === k && grow(k) > 0.98) flow(g, curve(pts), t, '#ffffff', 3, 0.5, 4.5, { alpha: 0.9 }); return P0; };
      // V: rădăcina + ganglionul + ramurile
      N(NP.V0, ARCL[1], 13, 0); ell(g, NP.V0[1][0], NP.V0[1][1], 22 * grow(0), 16 * grow(0), ARCL[1], { ow: 4, alpha: al(0), shade: ARC[1] });
      g.save(); g.setLineDash([6, 6]); nerve(g, NP.V1, 6, '#d8c4b8', { u1: grow(0), alpha: al(0) * 0.8, ow: 3 }); g.restore();
      N(NP.V2, ARCL[1], 9, 0); N(NP.V3, ARCL[1], 9, 0);
      N(NP.VII, ARCL[2], 9, 1); N(NP.IX, ARCL[3], 9, 2);
      N(NP.X, '#f2dcb8', 12, 3); N(NP.XS, ARCL[4], 8, 3); N(NP.XR, ARCL[6], 8, 3);
      if (grow(0) > 0.6) { txt(g, 'V1 (oftalmic)', NP.V1[2][0] + 10, NP.V1[2][1] - 24, 14, '#d8c4b8', { alpha: al(0) }); txt(g, 'ganglionul V', NP.V0[1][0] - 20, NP.V0[1][1] - 34, 14, ARCL[1], { alpha: al(0) }); }
      LAB.forEach(([p, s], j) => { const k = j < 2 ? 0 : j - 1; if (grow(k) > 0.8) txt(g, s, p[0] + 26, p[1] - 2, 19, [ARCL[1], ARCL[1], ARCL[2], ARCL[3]][j], { alpha: al(k), align: 'left' }); });
      if (grow(3) > 0.8) { txt(g, 'X', NP.X[3][0] - 28, NP.X[3][1], 19, '#ffe6c4', { alpha: al(3) }); txt(g, 'n. laringeu sup.', NP.XS[2][0] + 18, NP.XS[2][1] - 4, 15, ARCL[4], { alpha: al(3), align: 'left' }); txt(g, 'n. laringeu recurent', NP.XR[2][0] + 18, NP.XR[2][1] + 46, 15, ARCL[6], { alpha: al(3), align: 'left' }); }
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, ...TT(40, -120), 190, 80, e, -0.1);
      if (b.i === 1) ring(g, ...TT(10, -24), 210, 50, e, 0.12);
      if (b.i === 2) ring(g, ...TT(-10, 30), 200, 50, e, 0.18);
      if (b.i === 3) ring(g, ...TT(-80, 150), 170, 130, e);
    },
  };
}

/* =================================================== ARTERELE: arcurile aortice, înainte (A) și după remodelare (B) — vedere ventrală
   Orientare: vedere ventrală, cranial ↑; STÂNGA embrionului = DREAPTA ecranului. Jos-centru sacul aortic; din el urcă cele 2 aorte
   ventrale; arterele arcurilor (1, 2, 3, 4, 6; colorate pe ARC) merg din aorta ventrală spre lateral, în cele 2 aorte dorsale, care coboară
   și se unesc într-o singură aortă descendentă. Sângele curge: sac → arcuri → aortele dorsale → aorta descendentă.
   1 = arcurile 1 și 2 regresează: rămân doar ciotul a. maxilare (1) și al a. hioide + stapediale (2); 2 = arcul 3 → a. carotidă comună +
   prima parte a carotidei interne (segmentul de aortă dorsală dintre 3 și 4 dispare; aorta ventrală de deasupra = carotida externă);
   3 = arcul 4: stânga → arcul aortei (gros), dreapta → partea proximală a a. subclavii drepte (aorta dorsală dreaptă de sub ea dispare);
   4 = arcul 6: stânga → ductus arteriosus (spre aortă), dreapta → partea proximală a a. pulmonare drepte (partea distală dispare);
   vagii coboară lateral, iar laringeul recurent stâng ocolește ductusul/arcul aortei, cel drept ocolește subclavia dreaptă (manual). */
export function arteries() {
  const X0 = 600, DA = 215, VA = 48; const Y = { 1: 200, 2: 290, 3: 380, 4: 480, 6: 580 }; const SAC = [X0, 690];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[X0 - DA - 60, (Y[1] + Y[2]) / 2], [X0 + DA + 50, Y[3] - 40], [X0 - DA - 50, Y[4] + 10], [X0 + DA + 50, Y[6] + 30]],
    phase: (i) => ['arcurile 1 și 2 regresează', 'arcul 3 → carotidele', 'arcul 4: stânga ≠ dreapta', 'arcul 6 → circulația pulmonară'][i] || 'A → B',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4, 0.7);
      const r12 = p(0), r3 = p(1), r4 = p(2), r6 = p(3);
      // aortele dorsale (sus → jos), cu segmentele care dispar
      [-1, 1].forEach((s) => {
        const x = X0 + s * DA;
        artery(g, [[x, 130], [x, Y[3]]], 26, t, { flow: 0.0 });
        artery(g, [[x, Y[3]], [x, Y[4]]], 26, t, { alpha: 1 - r3 * 0.92 }); // ductus caroticus dispare
        const lowA = s < 0 ? 1 - r4 * 0.92 : 1; // aorta dorsală dreaptă, sub arcul 4, dispare
        artery(g, [[x, Y[4]], [x, 690], [X0 + s * 120, 800], [X0, 830]], 26, t, { alpha: lowA, flow: lowA > 0.5 ? 0.2 : 0 });
      });
      artery(g, [[X0, 830], [X0, 930]], 30, t, { flow: 0.25 });
      // aortele ventrale (din sac în sus)
      [-1, 1].forEach((s) => { artery(g, [[X0 + s * 30, SAC[1] - 30], [X0 + s * VA, Y[6]], [X0 + s * VA, Y[3]]], 24, t); artery(g, [[X0 + s * VA, Y[3]], [X0 + s * VA, 140]], 20, t, { col: r3 > 0.5 ? '#e05a4a' : L.art }); });
      // arterele arcurilor
      const loop = (k, s) => [[X0 + s * VA, Y[k]], [X0 + s * (VA + DA) / 2 + s * 14, Y[k] - 30], [X0 + s * DA, Y[k]]];
      [-1, 1].forEach((s) => {
        artery(g, loop(1, s), 18, t, { col: ARC[1], alpha: 1 - 0.85 * r12, flow: 0.3 * (1 - r12) });
        artery(g, loop(2, s), 18, t, { col: ARC[2], alpha: 1 - 0.85 * r12, flow: 0.3 * (1 - r12) });
        if (r12 > 0.5) { artery(g, loop(1, s), 18, t, { col: ARC[1], u0: 0.72, alpha: sp(r12, 0.5, 1) }); artery(g, loop(2, s), 18, t, { col: ARC[2], u0: 0.72, alpha: sp(r12, 0.5, 1) }); }
        artery(g, loop(3, s), 24, t, { col: ARC[3], flow: 0.3 });
        artery(g, loop(4, s), s > 0 ? lerp(24, 34, r4) : 24, t, { col: ARC[4], flow: 0.3 });
        const d6 = s < 0 ? 1 - r6 * 0.9 : 1; // dreapta: partea distală dispare
        artery(g, loop(6, s), 22, t, { col: ARC[6], u1: 0.5, flow: 0.25 });
        artery(g, loop(6, s), 22, t, { col: ARC[6], u0: 0.5, alpha: d6, flow: d6 > 0.5 ? 0.25 : 0 });
      });
      // sacul aortic
      ell(g, SAC[0], SAC[1], 70, 46, L.art, { shade: L.artS, light: '#ff8a8a' }); txt(g, 'sacul aortic', SAC[0], SAC[1] + 72, 17, '#ffc0b6');
      // ramurile noi: carotida externă (sus), subclavia dreaptă (a 7-a intersegmentară), arterele pulmonare
      if (r3 > 0.3) { [-1, 1].forEach((s) => { txt(g, 'a. carotidă\nexternă', X0 + s * (VA + 4), 112, 14, '#ffd0c8', { alpha: sp(r3, 0.3, 1) }); }); txt(g, 'a. carotidă\ninternă', X0 + DA + 70, 160, 14, '#ffd0c8', { alpha: sp(r3, 0.3, 1) }); txt(g, 'a. carotidă\ncomună', X0 + VA + 76, Y[3] + 58, 14, ARCL[3], { alpha: sp(r3, 0.3, 1) }); }
      if (r4 > 0.3) { const ya = sp(r4, 0.3, 1); artery(g, [[X0 - DA, Y[4] + 70], [X0 - DA - 70, Y[4] + 100], [X0 - DA - 120, Y[4] + 96]], 16, t, { alpha: ya, u1: ya }); txt(g, 'a. subclavie dr.', X0 - DA - 30, Y[4] + 140, 15, ARCL[4], { alpha: ya }); txt(g, 'arcul aortei', X0 + DA + 56, Y[4] + 44, 16, ARCL[4], { alpha: ya, align: 'left' }); }
      if (r6 > 0.3) { const ya = sp(r6, 0.3, 1); [-1, 1].forEach((s) => artery(g, [[X0 + s * (VA + 40), Y[6] - 8], [X0 + s * (VA + 70), Y[6] + 50], [X0 + s * (VA + 60), Y[6] + 100]], 14, t, { col: ARC[6], alpha: ya, u1: ya })); txt(g, 'ductus\narteriosus', X0 + DA - 10, Y[6] + 64, 15, ARCL[6], { alpha: ya }); txt(g, 'a. pulmonară dr.', X0 - VA - 150, Y[6] + 90, 15, ARCL[6], { alpha: ya }); }
      if (r12 > 0.5) { txt(g, 'a. maxilară', X0 - DA - 70, Y[1] - 30, 14, ARCL[1], { alpha: sp(r12, 0.5, 1) }); txt(g, 'a. hioidă +\nstapedială', X0 - DA - 76, Y[2] + 6, 14, ARCL[2], { alpha: sp(r12, 0.5, 1) }); }
      // vagii + laringeii recurenți (manual): stânga sub ductus / arcul aortei, dreapta sub subclavie
      if (r6 > 0.6) {
        const ya = sp(r6, 0.6, 1);
        nerve(g, [[X0 + DA + 70, 120], [X0 + DA + 62, Y[6] + 70], [X0 + DA + 50, 760]], 7, L.nerve, { alpha: ya, ow: 3 });
        nerve(g, [[X0 + DA + 62, Y[6] + 40], [X0 + DA - 20, Y[6] + 46], [X0 + DA - 40, Y[6] - 10], [X0 + DA + 30, Y[4] + 30], [X0 + DA + 100, 300]], 6, L.nerve, { alpha: ya, ow: 3, u1: ya });
        nerve(g, [[X0 - DA - 70, 120], [X0 - DA - 62, Y[4] + 160], [X0 - DA - 50, 760]], 7, L.nerve, { alpha: ya, ow: 3 });
        nerve(g, [[X0 - DA - 64, Y[4] + 120], [X0 - DA - 140, Y[4] + 130], [X0 - DA - 150, Y[4] + 60], [X0 - DA - 100, 300]], 6, L.nerve, { alpha: ya, ow: 3, u1: ya });
        txt(g, 'n. laringeu recurent', X0 + DA + 20, 260, 13, L.nerve, { alpha: ya, align: 'left' });
      }
      ARCS.forEach((k) => txt(g, String(k), X0, Y[k] - (k === 6 ? 2 : 0), 20, [ARCL[k]][0], { w: 900 }));
      txt(g, 'dreapta', X0 - DA, 96, 18, '#ffd6c4'); txt(g, 'stânga', X0 + DA, 96, 18, '#ffd6c4');
      txt(g, 'aortele\ndorsale', X0 + DA + 70, 690, 14, '#ffc0b6');
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, X0, (Y[1] + Y[2]) / 2, DA + 30, 90, e);
      if (b.i === 1) ring(g, X0, Y[3], DA + 40, 70, e);
      if (b.i === 2) ring(g, X0, Y[4], DA + 40, 70, e);
      if (b.i === 3) ring(g, X0, Y[6] + 20, DA + 40, 80, e);
    },
  };
}

/* =================================================== MUȘCHII: pe capul copilului (profil, fața spre stânga), colorați pe arcul de origine
   Arcul 1 (teal): temporalul (evantai pe tâmplă) + maseterul (de la arcada zigomatică la unghiul mandibulei).
   Arcul 2 (roz): mușchii mimicii — frontalul, orbicularul ochiului, orbicularul gurii, buccinatorul, platisma pe gât.
   Arcul 3 (verde): stilofaringianul — profund, de la procesul stiloid (sub ureche) în jos, spre faringe (contur punctat = profund).
   Arcurile 4 + 6: constrictorii faringelui (portocaliu, profund, în spatele gâtului) + cricotiroidianul pe laringe (portocaliu);
   intrinsecii laringelui (maro, arcul 6, manual), în lupă pe laringe. Pe punctul lui, grupul crește; cei de dinainte rămân. */
export function muscles() {
  const HX = 610, HY = 330, HS = 1.05; const TT = T(HX, HY, HS);
  const sh = (pts) => smooth(pts.map(([x, y]) => TT(x, y)));
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [TT(110, -150), TT(-200, -100), TT(140, 180), TT(-170, 290)],
    phase: (i) => ['arcul 1: masticatori', 'arcul 2: mimica', 'arcul 3: stilofaringian', 'arcurile 4 + 6: faringe, laringe'][i] || 'mușchii arcurilor',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      childHead(g, HX, HY, HS, t, { neck: true });
      const M = (path, k, a, o = {}) => { if (a <= 0.01) return; g.save(); g.globalAlpha = a * (o.alpha ?? 0.92); paint(g, path, ARC[k], ARCS_[k], ARCL[k], [0, 0, 1000, 934], OUT, 3.5); if (o.str !== false) { g.save(); g.clip(path); g.strokeStyle = 'rgba(40,10,20,.28)'; g.lineWidth = 2; for (let q = -20; q < 20; q++) { const [x, y] = TT(q * 14, -260); g.beginPath(); g.moveTo(x, y); g.lineTo(x + (o.sl ?? 60), y + 700); g.stroke(); } g.restore(); } if (o.dash) { g.setLineDash([7, 6]); g.strokeStyle = '#ffffff'; g.lineWidth = 2.5; g.stroke(path); } g.restore(); };
      const a1 = p(0), a2 = p(1), a3 = p(2), a4 = p(3);
      // arcul 1: temporalul + maseterul
      M(sh([[-40, -170], [40, -196], [118, -160], [120, -80], [60, -24], [10, 24], [-20, -40], [-50, -110]]), 1, a1, { sl: 10 });
      M(sh([[-40, 38], [30, 30], [50, 90], [30, 150], [-20, 156], [-44, 96]]), 1, a1, { sl: 20 });
      // arcul 2: mimica
      M(sh([[-150, -150], [-100, -210], [-20, -200], [-40, -140], [-110, -120]]), 2, a2, { sl: 0 });
      { const [x, y] = TT(-92, -28); const r = new Path2D(); r.ellipse(x, y, 44 * HS, 32 * HS, 0.1, 0, 7); r.ellipse(x, y, 30 * HS, 16 * HS, 0.1, 0, 7, true); M(r, 2, a2, { str: false }); }
      { const [x, y] = TT(-150, 86); const r = new Path2D(); r.ellipse(x, y, 30 * HS, 22 * HS, 0, 0, 7); r.ellipse(x, y, 18 * HS, 7 * HS, 0, 0, 7, true); M(r, 2, a2, { str: false }); }
      M(sh([[-120, 50], [-80, 40], [-60, 80], [-90, 110], [-120, 100]]), 2, a2, { sl: 0, alpha: 0.75 });
      M(sh([[-90, 190], [40, 176], [120, 240], [140, 330], [-90, 330], [-110, 250]]), 2, a2 * 0.8, { sl: 30 });
      // arcul 3: stilofaringianul (profund)
      M(sh([[70, 80], [80, 86], [40, 200], [26, 230], [16, 224], [54, 120]]), 3, a3, { str: false, dash: true });
      if (a3 > 0.2) { g.save(); g.globalAlpha = a3; tube(g, [TT(80, 72), TT(64, 130)], 7, L.bone, { ow: 3 }); g.restore(); }
      // arcurile 4 + 6: constrictorii (profund, în spate), cricotiroidianul; intrinsecii (arcul 6)
      M(sh([[30, 190], [90, 200], [110, 300], [60, 320], [20, 280]]), 4, a4, { dash: true, sl: 0 });
      { const [lx, ly] = TT(-70, 268); g.save(); g.globalAlpha = a4; const lp = new Path2D(); lp.moveTo(lx - 30, ly - 22); lp.lineTo(lx + 26, ly - 22); lp.lineTo(lx + 18, ly + 26); lp.lineTo(lx - 22, ly + 26); lp.closePath(); paint(g, lp, '#e9dcc8', '#c9b79a', null, [lx - 30, ly - 22, 56, 48], OUT, 3); muscle(g, lx - 2, ly + 30, 46, 16, 0.1, ARC[4], { ow: 3 }); g.restore(); }
      lead(g, ...TT(-70, 290), 640, 770, a4);
      lupa(g, 720, 830, 96, a4, () => {
        const cx = 720, cy = 834; const lar = new Path2D(); lar.ellipse(cx, cy, 66, 74, 0, 0, 7); paint(g, lar, '#3a2228', null, null, [cx - 80, cy - 92, 160, 184], OUT, 3);
        [[-1, 1]].forEach(() => {}); [-1, 1].forEach((s) => { muscle(g, cx + s * 28, cy - 4, 74, 22, s * 1.3, ARC[6], { ow: 3 }); });
        muscle(g, cx, cy + 40, 66, 18, 0, ARC[6], { ow: 3 });
        txt(g, 'intrinsecii laringelui', cx, cy - 58, 13, ARCL[6]); txt(g, '(arcul 6, manual)', cx, cy + 70, 12, '#d8c4b8');
      });
      const lb = (s0, x, y, k, a, al = 'center') => txt(g, s0, x, y, 16, ARCL[k], { alpha: a, align: al });
      lb('temporal', ...TT(150, -170), 1, a1, 'left'); lb('maseter', ...TT(90, 120), 1, a1, 'left');
      lb('frontal', ...TT(-110, -236), 2, a2); lb('orbicularul ochiului', ...TT(-215, -60), 2, a2, 'right'); lb('orbicularul gurii', ...TT(-210, 130), 2, a2, 'right'); lb('platisma', ...TT(200, 310), 2, a2, 'left');
      lb('stilofaringian\n(profund)', ...TT(190, 150), 3, a3, 'left');
      lb('constrictorii\nfaringelui', ...TT(190, 250), 4, a4, 'left'); lb('cricotiroidian', ...TT(-120, 340), 4, a4, 'right');
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, ...TT(40, -40), 140, 210, e);
      if (b.i === 1) ring(g, ...TT(-110, -10), 120, 230, e);
      if (b.i === 2) ring(g, ...TT(50, 150), 70, 100, e, 0.3);
      if (b.i === 3) ring(g, ...TT(10, 270), 160, 90, e);
    },
  };
}

/* =================================================== SCHELETUL: craniul în profil (fața spre stânga) + hioidul și laringele pe gât
   Arcul 1 (teal): cartilajul Meckel (bară) de la urechea medie, pe fața internă a mandibulei, până la bărbie; din capătul lui dorsal
   ciocanul + nicovala (în lupă, sus-dreapta); lig. sfenomandibular (punctat); maxila, zigomaticul, o parte din temporal colorate teal;
   mandibula = contur punctat teal (se osifică în jurul lui Meckel, manual). Arcul 2 (roz): scărița (lupă), procesul stiloid (sub ureche),
   lig. stilohioid până la cornul mic al hioidului + partea sup. a corpului hioid. Arcul 3 (verde): cornul mare + partea inf. a corpului.
   Arcurile 4 + 6: cartilajele laringelui (tiroid, cricoid), portocaliu → maro. */
export function skeleton() {
  const SX = 540, SY = 290, SS = 1.45; const TT = T(SX, SY, SS);
  const HY = 600, HXc = 500; const LY = 700;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [TT(-130, 140), [700, 470], [HXc + 140, HY + 34], [HXc - 110, LY + 30]],
    phase: (i) => ['arcul 1: Meckel', 'arcul 2: Reichert (manual)', 'arcul 3: hioidul jos', 'arcurile 4 + 6: laringele'][i] || 'scheletul arcurilor',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const a1 = p(0), a2 = p(1), a3 = p(2), a4 = p(3);
      // craniul: fața în teal pe măsură ce apare arcul 1
      skullLat(g, SX, SY, SS, { face: a1 > 0.5 ? ARC[1] : L.bone, faceS: a1 > 0.5 ? ARCS_[1] : L.boneS, mand: '#f4ecdc', mandS: L.boneS, alpha: 1 });
      // mandibula: contur punctat teal (manual)
      if (a1 > 0.3) { g.save(); g.globalAlpha = sp(a1, 0.3, 1); g.setLineDash([9, 7]); g.strokeStyle = ARC[1]; g.lineWidth = 4; g.beginPath(); const md = curve([TT(-118, 70), TT(-120, 112), TT(-70, 124), TT(20, 116), TT(60, 102), TT(74, 50), TT(86, 16)], 8); g.moveTo(md[0][0], md[0][1]); md.forEach((q) => g.lineTo(q[0], q[1])); g.stroke(); g.restore(); }
      // Meckel: de la urechea medie (lângă meat) la bărbie, pe fața internă a mandibulei
      bar(g, [TT(84, 30), TT(40, 70), TT(-40, 96), TT(-110, 96)], 13, ARC[1], ARCS_[1], { u1: a1, cells: true });
      if (a1 > 0.5) { g.save(); g.globalAlpha = sp(a1, 0.5, 1); g.setLineDash([6, 6]); tube(g, [TT(78, 24), TT(60, 60)], 5, ARC[1], { ow: 2 }); g.restore(); }
      // arcul 2: procesul stiloid + lig. stilohioid + cornul mic
      if (a2 > 0) { g.save(); g.globalAlpha = a2; const s1 = TT(90, 40), s2 = TT(70, 112); bar(g, [s1, s2], 10, ARC[2], ARCS_[2], { u1: a2 }); g.setLineDash([7, 6]); tube(g, [s2, [HXc + 74, HY - 20]], 5, ARC[2], { ow: 2, u1: a2 }); g.restore(); }
      // hioidul: corpul (sus = 2, jos = 3), cornul mic (2), cornul mare (3)
      { const x0 = HXc - 40, x1 = HXc + 50; const top = new Path2D(); top.roundRect(x0, HY - 14, x1 - x0, 14, 6); const bot = new Path2D(); bot.roundRect(x0, HY, x1 - x0, 14, 6);
        paint(g, top, a2 > 0.3 ? ARC[2] : L.bone, null, null, [x0, HY - 14, x1 - x0, 14], OUT, 3); paint(g, bot, a3 > 0.3 ? ARC[3] : L.bone, null, null, [x0, HY, x1 - x0, 14], OUT, 3);
        bar(g, [[x1 - 4, HY - 6], [x1 + 18, HY - 26]], 10, a2 > 0.3 ? ARC[2] : L.bone, ARCS_[2], { light: false });
        bar(g, [[x1 - 4, HY + 6], [x1 + 60, HY - 2], [x1 + 110, HY - 18]], 11, a3 > 0.3 ? ARC[3] : L.bone, ARCS_[3], { light: false }); }
      // laringele: cartilajul tiroid + cricoidul
      { const gr = g.createLinearGradient(0, LY - 40, 0, LY + 90); gr.addColorStop(0, ARC[4]); gr.addColorStop(1, ARC[6]); const fill = a4 > 0.3 ? gr : L.bone;
        const th = new Path2D(); th.moveTo(HXc - 60, LY - 36); th.lineTo(HXc + 50, LY - 36); th.lineTo(HXc + 40, LY + 30); th.quadraticCurveTo(HXc - 6, LY + 44, HXc - 52, LY + 30); th.closePath(); paint(g, th, fill, null, null, [HXc - 60, LY - 36, 110, 80], OUT, 4);
        const cr = new Path2D(); cr.roundRect(HXc - 44, LY + 52, 80, 26, 12); paint(g, cr, fill, null, null, [HXc - 44, LY + 52, 80, 26], OUT, 4);
        tube(g, [[HXc - 4, LY + 80], [HXc - 4, 900]], 40, '#e9dcc8', { ow: 4, alpha: 0.6 }); }
      // lupa: oscioarele (ciocan + nicovală = 1, scărița = 2)
      const la = Math.max(a1, a2, b.i < 0 ? 1 : 0);
      lupa(g, 860, 180, 112, la, () => {
        const ox = 860, oy = 186;
        g.save(); g.globalAlpha = Math.max(0.25, a1); const ml = new Path2D(); ml.moveTo(ox - 70, oy - 10); ml.quadraticCurveTo(ox - 60, oy - 50, ox - 30, oy - 40); ml.lineTo(ox - 20, oy + 40); ml.lineTo(ox - 36, oy + 44); ml.closePath(); paint(g, ml, ARC[1], ARCS_[1], ARCL[1], [ox - 70, oy - 50, 50, 94], OUT, 4);
        const ic = new Path2D(); ic.moveTo(ox - 24, oy - 40); ic.quadraticCurveTo(ox + 10, oy - 50, ox + 14, oy - 20); ic.lineTo(ox + 4, oy + 30); ic.lineTo(ox - 6, oy - 10); ic.closePath(); paint(g, ic, ARC[1], ARCS_[1], ARCL[1], [ox - 24, oy - 50, 38, 80], OUT, 4); g.restore();
        g.save(); g.globalAlpha = Math.max(0.25, a2); const sp1 = new Path2D(); sp1.moveTo(ox + 4, oy + 30); sp1.lineTo(ox + 60, oy + 14); sp1.lineTo(ox + 64, oy + 50); sp1.closePath(); paint(g, sp1, ARC[2], ARCS_[2], ARCL[2], [ox, oy + 10, 66, 44], OUT, 4); g.restore();
        txt(g, 'ciocan', ox - 50, oy - 66, 14, ARCL[1], { alpha: Math.max(0.3, a1) }); txt(g, 'nicovală', ox + 30, oy - 56, 14, ARCL[1], { alpha: Math.max(0.3, a1) }); txt(g, 'scărița', ox + 40, oy + 72, 14, ARCL[2], { alpha: Math.max(0.3, a2) });
      });
      lead(g, 760, 230, TT(88, 26)[0], TT(88, 26)[1], la);
      const lb = (s0, x, y, c, a, al = 'center') => txt(g, s0, x, y, 16, c, { alpha: a, align: al });
      lb('cartilajul Meckel', ...TT(-60, 150), ARCL[1], a1); lb('mandibula (manual)', ...TT(-150, 140), ARCL[1], a1, 'right'); lb('maxila, zigomaticul', ...TT(-150, -10), ARCL[1], a1, 'right'); lb('lig. sfeno-\nmandibular', ...TT(-10, 52), ARCL[1], sp(a1, 0.5, 1));
      lb('proc. stiloid', ...TT(124, 84), ARCL[2], a2, 'left'); lb('lig. stilohioid', HXc + 160, HY - 80, ARCL[2], a2, 'left');
      lb('cornul mic', HXc + 74, HY - 44, ARCL[2], a2, 'left'); lb('hioid', HXc - 60, HY, '#ffd6c4', 1, 'right'); lb('cornul mare', HXc + 170, HY - 20, ARCL[3], a3, 'left');
      lb('cartilajul tiroid', HXc + 70, LY, ARCL[4], a4, 'left'); lb('cricoid (+ aritenoizi…)', HXc + 50, LY + 66, ARCL[6], a4, 'left');
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, ...TT(-10, 70), 160, 80, e, 0.2);
      if (b.i === 1) ring(g, 640, 470, 80, 150, e, -0.3);
      if (b.i === 2) ring(g, HXc + 40, HY + 4, 120, 40, e);
      if (b.i === 3) ring(g, HXc - 4, LY + 22, 90, 80, e);
    },
  };
}
