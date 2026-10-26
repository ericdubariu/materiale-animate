// Copertă, harta aparatului, cronologia, originea arcului.
import { HOME, C, bg, panel, txt, pill, tube, flow, dot, ell, arr, OUT, clamp, lerp, ease, REDUCED, loopT,
  ARC, ARCN, ECTO, MESO, CREST, ENDO, MES, LUMEN, NERVE, ART, A, from, prog, cyc, ringAt, poly, line, arcTag, legend,
  section, secGeom, tipCleft, tipPouch, embryo, head, opercul, card, pulse } from './k2.js';

/* ============ COPERTA ============
   Sus: secțiunea frontală prin aparatul faringian (cranial sus, faringele la mijloc, arcurile 1→6 de sus în jos pe ambele părți;
   șanțurile = ectoderm cyan pe exterior, pungile = endoderm galben în interior). Jos: cele 4 teme ca, carduri.
   pt0 → contururile + membranele (cele 4 componente); pt1 → arcurile colorate (derivatele); pt2 → șanțul 1 (urechea) + pungile 3–4
   (timus, paratiroide); pt3 → arcul 1 „gol” (creasta lipsă) + un chist în locul sinusului cervical (malformații). */
export function cover() {
  const cx = 500, y0 = 110, sc = 0.62;
  const CARDS = [
    { x: 140, t: '4 componente', s: 'arc · șanț ·\nmembrană · pungă', col: '#ffe9a8' },
    { x: 380, t: '5 arcuri', s: 'nerv · arteră ·\nschelet · mușchi', col: '#ffd6c4' },
    { x: 620, t: 'Șanțuri, pungi', s: 'urechea · timus ·\nparatiroide', col: '#d6ecff' },
    { x: 860, t: 'Malformații', s: 'fistulă · TC ·\nPR · DiGeorge', col: '#e3d6ff' },
  ];
  return {
    home: HOME, cams: CARDS.map(() => HOME),
    anchors: CARDS.map((c) => [c.x - 92, 585]),
    draw(g, t, b) {
      bg(g);
      const on = (k) => (b.i < 0 ? cyc(t, 4, 2.4) === k : b.i === k);
      const G = section(g, t, {
        cx, y0, sc,
        aArc: (k) => (on(1) ? 1 : on(3) && k === 0 ? 0.35 + 0.3 * pulse(t, 5) : 0.75),
        tint: (k) => (on(1) ? 0.85 : on(3) && k === 0 ? 0.1 : 0.45),
        aMem: () => (on(0) ? 0.6 + 0.4 * pulse(t, 4) : 0),
        aCleft: (k) => (on(2) && k === 0 ? 1 : 0.9), aPouch: () => 0.95,
      });
      txt(g, 'CRANIAL ↑', cx + 270, y0 + 6, 16, '#ffe7d6');
      txt(g, 'secțiune frontală prin aparatul faringian', cx, G.yEnd + 48, 17, '#cdb8ab', { w: 600 });
      if (on(0)) G.gaps.forEach((gy) => ringAt(g, cx - (G.pw + G.AW * 0.5), gy, 40, 26, t, 0.9));
      if (on(2)) { const [x, y] = tipCleft(G, cx, 1, 0); ringAt(g, x + 20, y, 44, 30, t); txt(g, 'urechea', x + 110, y, 17, C.hi); [2, 3].forEach((j) => { const [px, py] = tipPouch(G, cx, -1, j); ringAt(g, px, py, 40, 26, t); }); txt(g, 'timus +\nparatiroide', cx - 300, G.gaps[2] + 30, 16, C.hi); }
      if (on(3)) { const [x, y] = [cx - (G.pw + G.AW * 1.05), (G.gaps[1] + G.gaps[2]) / 2]; ell(g, x, y, 22, 30, '#bfeaf5', { ow: 4, sc: '#ff6b5e' }); txt(g, 'chist', x - 50, y, 16, '#ff9b8e'); txt(g, 'arcul 1 fără\ncreastă neurală', cx + 300, G.ys[0], 16, '#ff9b8e'); }
      CARDS.forEach((c, k) => {
        const lit = on(k); card(g, c.x, 680, 214, 160, c.t, c.s, c.col, { alpha: b.i < 0 || lit ? 1 : 0.45, glow: lit ? 1 : 0, ts: 21, ss: 16 });
      });
      txt(g, 'S4: apar arcurile · S8: totul e la locul lui', 500, 860, 18, '#cdb8ab', { w: 600 });
    },
  };
}

/* ============ APARATUL FARINGIAN: cele 4 componente ============
   Secțiune frontală mare, ambele părți; cranial = sus. Arcurile (mezenchim, tenta arcului) cu numerele 1, 2, 3, 4, 6.
   Șanțurile = invaginări de ECTODERM pe exterior (etichete în dreapta); pungile = diverticuli de ENDODERM din faringe
   (etichete în lumen); membrana = unde vârful șanțului atinge vârful pungii, 3 straturi (endo · mezo · ecto, etichete în stânga).
   pt0 arcurile; pt1 șanțurile (doar primul rămâne → meatul); pt2 membranele; pt3 pungile; pt4 embrionul de 32 de zile din lateral
   (secțiunea se stinge; benzile arcurilor + procesul maxilar + inima). */
export function apparatus() {
  const cx = 520, y0 = 132, sc = 0.9;
  const G0 = secGeom({ cx, y0, sc });
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[cx - 70, y0 - 50], [905, G0.gaps[0] - 46], [132, G0.gaps[1] - 44], [cx, G0.yEnd + 40], [955, 620]],
    draw(g, t, b) {
      bg(g);
      const emb = b.i === 4;
      const sa = emb ? 0.12 : 1;
      const G = section(g, t, {
        cx, y0, sc, lumenLabel: false, aLumen: sa, aEdge: sa,
        aArc: (k) => sa * (b.i === 0 ? 1 : b.i < 0 ? 1 : 0.55), tint: () => (b.i === 0 ? 0.8 : 0.45),
        aCleft: () => sa * A(b, 1, 0.45), aPouch: () => sa * A(b, 3, 0.45), aMem: () => sa * (b.i === 2 ? 1 : b.i < 0 ? 0.7 : 0),
        nums: true,
      });
      txt(g, 'faringe', cx, y0 - 42, 18, '#ffe7b0', { alpha: sa });
      txt(g, 'CRANIAL ↑', 880, 100, 16, '#ffe7d6', { alpha: sa });
      // etichetele: șanțuri (dreapta), pungi (în lumen), membrane (stânga)
      G.gaps.forEach((gy, j) => {
        const aC = sa * A(b, 1, 0.35), aP = sa * A(b, 3, 0.35), aM = sa * (b.i === 2 || b.i < 0 ? 1 : 0.2);
        txt(g, j === 0 ? 'șanț 1 → meat' : `șanț ${j + 1}`, 872, gy, 16, j === 0 && b.i === 1 ? C.hi : '#bfeaf5', { alpha: aC });
        txt(g, `pungă ${j + 1}`, cx, gy, 15, '#fff0c4', { alpha: aP });
        txt(g, 'membrană', 150, gy, 15, '#ffd0c0', { alpha: aM }); line(g, [[200, gy], [cx - (G.pw + G.AW * 0.43) - 8, gy]], '#fff3e6', 2, { dash: [5, 6], alpha: aM * 0.7 });
      });
      if (b.i === 1) { const [x, y] = tipCleft(G, cx, 1, 0); ringAt(g, x + 16, y, 42, 28, t); }
      if (b.i === 3) G.gaps.forEach((gy, j) => { const [x, y] = tipPouch(G, cx, -1, j); flow(g, [[cx, gy], [x - 6, y]], t, ENDO, 3, 0.5, 5); });
      if (b.i === 0) G.ys.forEach((y, k) => ringAt(g, cx + G.pw + G.AW * 0.5, y, G.AW * 0.5, G.H[k] / 2, t, 0.6));
      // legenda foițelor
      legend(g, 300, 880, [[ECTO, 'ectoderm'], [MES, 'mezoderm + creasta neurală'], [ENDO, 'endoderm']], emb ? 0.15 : 1);
      // pt4: embrionul de ~32 de zile, din lateral (fața spre stânga)
      if (emb || b.i < 0) {
        const ea = emb ? ease(clamp(b.bt / 1.2)) : 0;
        if (ea > 0.01) {
          panel(g, 420, 130, 560, 720, { fill: 'rgba(30,18,14,.92)' });
          const E = embryo(g, 750, 470, 1.15, { alpha: ea });
          E.arcs.forEach(([x, y], k) => { arcTag(g, x - 92 + k * 8, y + 4, k, 17, ea); });
          txt(g, 'proces maxilar', E.max[0] - 10, E.max[1] - 44, 16, '#ffe7d6', { alpha: ea });
          txt(g, 'arcul 1 = proces\nmandibular', 500, E.arcs[0][1] - 46, 15, '#ffe7d6', { alpha: ea });
          txt(g, 'inima', E.heart[0] - 90, E.heart[1] + 30, 16, '#ffd0c0', { alpha: ea });
          txt(g, 'șanțurile = adânciturile dintre benzi', 720, 800, 16, '#bfeaf5', { alpha: ea });
          txt(g, 'arcul 6: ascuns caudal, nu se vede', 720, 834, 15, '#cdb8ab', { alpha: ea, w: 600 });
          txt(g, '~32 de zile · stadiul 14', 700, 168, 19, '#ffb48a', { alpha: ea });
        }
      }
    },
  };
}

/* ============ CRONOLOGIA S3 → S10 ============
   Axa săptămânilor sus (S3 stânga → S10 dreapta), banda roșie S3–S8 = perioada embrionară. Fiecare punct mută markerul la
   săptămâna lui și schimbă panoul de jos: S3 = placa trilaminară (ecto sus, mezo, endo jos); S4 = embrionul cu benzile arcurilor
   care apar + membrana bucofaringiană care se rupe; S5 = arcul 2 crește în jos peste 3–6 (sinusul cervical, manual);
   S6–S7 = capul din profil: pavilionul urechii se formează (manual); S8 = cele 4 „bife”: nervi, mușchi, glande, schelet. */
export function chrono() {
  const X = (w) => 110 + (w - 3) * 112; const Y = 172;
  const AT = [3, 4, 5, 6.5, 8];
  return {
    home: HOME, cams: AT.map(() => HOME),
    anchors: AT.map((w, k) => [X(w) + (k === 4 ? -40 : k === 3 ? 0 : 40), Y - 80]),
    draw(g, t, b) {
      bg(g);
      tube(g, [[X(3) - 30, Y], [X(10) + 30, Y]], 10, '#6b5650', { ow: 4 });
      tube(g, [[X(3), Y + 40], [X(8), Y + 40]], 22, '#ef7468', { ow: 4, alpha: 0.85 });
      txt(g, 'perioada embrionară S3–S8', (X(3) + X(8)) / 2, Y + 40, 15, OUT, { stroke: false });
      for (let w = 3; w <= 10; w++) { tube(g, [[X(w), Y - 12], [X(w), Y + 12]], 4, '#a08a80', { ow: 0 }); txt(g, 'S' + w, X(w), Y - 32, 17, '#ffe7d6'); }
      const k = b.i < 0 ? cyc(t, 5, 2.6) : b.i;
      const tgt = AT[k]; const prev = k > 0 ? AT[k - 1] : 3; const u = b.i < 0 ? 1 : ease(clamp(b.bt / 1.2));
      dot(g, X(lerp(prev, tgt, u)), Y, 16, C.hi, { ow: 4 });
      // panoul de jos
      panel(g, 60, 250, 880, 640);
      const pa = b.i < 0 ? 1 : ease(clamp(b.bt / 0.9));
      const TT = ['S3 · placa embrionară trilaminară', 'S4 · apar arcurile faringiene', 'S5 · arcurile aproape complet dezvoltate', 'S6–S7 · migrare și diferențiere', 'S8 · totul e la locul lui'];
      txt(g, TT[k], 500, 292, 22, '#ffb48a', { alpha: pa });
      g.save(); g.globalAlpha = pa;
      if (k === 0) {
        [[ECTO, 'ectoderm'], [MESO, 'mezoderm'], [ENDO, 'endoderm']].forEach(([col, s], j) => {
          const y = 440 + j * 110; const w = 520 + 20 * Math.sin(t * 1.5 + j);
          pill(g, 470, y, w, 80, col, '', { r: 40 }); txt(g, s, 470, y, 22, OUT, { stroke: false });
        });
        txt(g, 'din ele se vor face arcurile', 470, 790, 18, '#cdb8ab', { w: 600 });
        arr(g, 790, 420, 790, 690, '#fff3e6', 5); txt(g, 'dorsal', 850, 410, 15, '#cdb8ab'); txt(g, 'ventral', 850, 700, 15, '#cdb8ab');
      } else if (k === 1) {
        const grow = b.i < 0 ? 1 : ease(clamp(b.bt / (b.bd * 0.7)));
        const E = embryo(g, 380, 600, 1.0, { aArc: (j) => clamp(grow * 4 - j) });
        E.arcs.forEach(([x, y], j) => arcTag(g, x - 52, y, j, 14, clamp(grow * 4 - j)));
        // membrana bucofaringiană: două foițe care se rup la sfârșitul S4
        const rip = clamp((grow - 0.55) * 2.4);
        const mx = 720, my = 560;
        tube(g, [[mx, my - 90], [mx, my - 10 - rip * 50]], 14, ECTO, { ow: 4 }); tube(g, [[mx, my + 90], [mx, my + 10 + rip * 50]], 14, ECTO, { ow: 4 });
        tube(g, [[mx + 16, my - 90], [mx + 16, my - 10 - rip * 50]], 14, ENDO, { ow: 4 }); tube(g, [[mx + 16, my + 90], [mx + 16, my + 10 + rip * 50]], 14, ENDO, { ow: 4 });
        txt(g, 'membrana\nbucofaringiană', mx + 8, my - 150, 17, '#ffe7d6');
        txt(g, rip > 0.5 ? 'se rupe (sfârșitul S4)' : 'ectoderm + endoderm', mx + 8, my + 150, 16, rip > 0.5 ? C.hi : '#cdb8ab');
        txt(g, 'gura primitivă', mx - 110, my, 15, '#cdb8ab', { alpha: rip }); txt(g, 'faringe', mx + 130, my, 15, '#cdb8ab', { alpha: rip });
        txt(g, 'figura LP: 4–5 săptămâni', 720, 830, 16, '#cdb8ab', { w: 600 });
      } else if (k === 2) {
        const u2 = b.i < 0 ? 1 : ease(clamp(b.bt / (b.bd * 0.7)));
        const G = section(g, t, { cx: 600, y0: 340, sc: 0.68, sides: [-1], lumenLabel: false, tint: () => 0.5 });
        opercul(g, G, 600, u2, 1);
        txt(g, 'arcul 2 crește în jos\npeste arcurile 3, 4, 6', 790, 470, 17, '#ffd0e4');
        txt(g, 'sinusul cervical\n(manual)', 790, 620, 17, '#bfeaf5', { alpha: clamp((u2 - 0.6) * 3) });
        txt(g, 'exterior', 220, 320, 15, '#cdb8ab'); txt(g, 'faringe', 640, 320, 15, '#cdb8ab');
      } else if (k === 3) {
        const u3 = b.i < 0 ? 1 : ease(clamp(b.bt / (b.bd * 0.7)));
        head(g, 400, 560, 0.95, { ear: lerp(0.4, 1, u3) });
        ringAt(g, 400, 560, 70, 70, t, 0.9);
        txt(g, 'pavilionul urechii\n(manual)', 400, 680, 17, C.hi);
        [[560, 380, 760, 380], [560, 470, 760, 520], [560, 560, 760, 660]].forEach(([x0, y0, x1, y1], j) => arr(g, x0, y0, lerp(x0, x1, u3), lerp(y0, y1, u3), '#fff3e6', 5, 0.8));
        txt(g, 'țesuturile arcurilor\nmigrează și se\ndiferențiază', 800, 520, 17, '#ffe7d6');
        txt(g, 'sinusul cervical dispare (manual)', 500, 840, 16, '#cdb8ab', { w: 600 });
      } else {
        const L = [['nervii', NERVE], ['mușchii', MESO], ['glandele', '#5cc48a'], ['scheletul', '#e9d6bd']];
        L.forEach(([s, col], j) => {
          const x = 200 + j * 200, y = 520; const ok = b.i < 0 ? 1 : clamp(b.bt * 1.4 - j * 0.5);
          ell(g, x, y, 70, 70, col, { ow: 6 }); txt(g, s, x, y + 120, 20, '#ffe7d6');
          if (ok > 0) { line(g, [[x - 28, y], [x - 6, y + 24], [x + 32, y - 26]], OUT, 12, { alpha: ok }); }
        });
        txt(g, 'sfârșitul perioadei embrionare', 500, 760, 19, '#ffb48a');
      }
      g.restore();
    },
  };
}

/* ============ ORIGINEA + REȚETA UNUI ARC ============
   Sus: secțiune transversală prin embrion (dorsal sus): tubul neural (ectoderm) la mijloc, creasta neurală (mov) pe marginile lui,
   mezodermul (somitic lângă tub, intermediar, al plăcii laterale în afară), notocordul sub tub, endodermul jos.
   pt1: celulele crestei curg DORSO-VENTRAL (în jos) până în arcul desenat jos. Jos-dreapta: secțiune printr-un arc:
   exterior (ectoderm) stânga, faringe (endoderm) dreapta; 4 primordii: cartilaj (din creastă), mușchi (din mezoderm), nerv, arteră.
   pt2 aprinde cartilajul + mușchiul, pt3 nervul + artera. Colțul stânga-jos rămâne liber (poza din LP pe pt0–pt1). */
export function origin() {
  const ax = 690, ay = 690;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[170, 120], [740, 70], [ax - 125, ay - 70], [ax + 175, ay - 125]],
    draw(g, t, b) {
      bg(g);
      const aTop = A(b, [0, 1], 0.35);
      // --- secțiunea prin embrion
      g.save(); g.globalAlpha = aTop;
      poly(g, [[90, 300], [240, 290], [380, 250], [420, 130], [500, 92], [580, 130], [620, 250], [760, 290], [910, 300]], null, { close: false, stroke: ECTO, lw: 9 });
      poly(g, [[90, 370], [300, 365], [500, 380], [700, 365], [910, 370]], null, { close: false, stroke: ENDO, lw: 9 });
      ell(g, 500, 185, 48, 62, '#bfeaf5', { ow: 5 }); ell(g, 500, 185, 13, 30, '#24170f', { ow: 3 });
      [[438, 132], [562, 132]].forEach(([x, y]) => { for (let k = 0; k < 4; k++) dot(g, x + (k % 2) * 12 - 6, y + Math.floor(k / 2) * 12 - 6, 7, CREST, { ow: 2 }); });
      [[385, 255, 56, 44], [615, 255, 56, 44]].forEach(([x, y, rx, ry]) => ell(g, x, y, rx, ry, MESO, { ow: 4 }));
      [[285, 300, 30, 24], [715, 300, 30, 24]].forEach(([x, y, rx, ry]) => ell(g, x, y, rx, ry, '#f39a8c', { ow: 4 }));
      [[170, 322, 72, 18], [830, 322, 72, 18]].forEach(([x, y, rx, ry]) => ell(g, x, y, rx, ry, '#f7b3a6', { ow: 4 }));
      dot(g, 500, 300, 15, '#c9e6a0', { ow: 3 });
      g.restore();
      const l0 = b.i === 0 || b.i < 0 ? 1 : 0.3;
      txt(g, 'tub neural\n(ectoderm)', 395, 165, 16, '#bfeaf5', { alpha: l0 * aTop, align: 'right' });
      txt(g, 'somitic', 385, 330, 15, '#ffd0c0', { alpha: l0 * aTop }); txt(g, 'intermediar', 285, 345, 15, '#ffd0c0', { alpha: l0 * aTop });
      txt(g, 'plăcii laterale', 170, 280, 15, '#ffd0c0', { alpha: l0 * aTop }); txt(g, 'notocord', 500, 330, 15, '#e1f3c8', { alpha: l0 * aTop });
      txt(g, 'endoderm', 840, 398, 15, '#fff0c4', { alpha: l0 * aTop }); txt(g, 'ectoderm', 840, 270, 15, '#bfeaf5', { alpha: l0 * aTop });
      txt(g, 'mezodermul → mușchi, vase, schelet axial/apendicular', 500, 430, 16, '#ffd0c0', { alpha: (b.i === 0 ? 1 : 0.35) * aTop, w: 700 });
      txt(g, 'creasta neurală', 630, 118, 16, '#e3ccff', { alpha: A(b, 1, 0.4) });
      // --- migrarea crestei (dorso-ventral) spre arc
      const mig = [[562, 132], [640, 210], [700, 380], [ax - 120, ay - 60], [ax - 60, ay - 20]];
      if (b.i === 1 || b.i < 0) { tube(g, mig, 6, CREST, { ow: 0, alpha: 0.35, dash: [10, 10] }); flow(g, mig, t, CREST, 7, 0.28, 8); txt(g, 'migrare\ndorso-ventrală', 790, 470, 16, '#e3ccff'); }
      // --- secțiunea prin arc
      const aB = b.i < 0 || b.i >= 1 ? 1 : 0.4;
      const p = new Path2D(); p.ellipse(ax, ay, 260, 170, 0, 0, 7);
      g.save(); g.globalAlpha = aB; g.fillStyle = MES; g.fill(p);
      g.lineWidth = 12; g.strokeStyle = ECTO; g.beginPath(); g.ellipse(ax, ay, 260, 170, 0, Math.PI / 2, Math.PI * 1.5); g.stroke();
      g.strokeStyle = ENDO; g.beginPath(); g.ellipse(ax, ay, 260, 170, 0, -Math.PI / 2, Math.PI / 2); g.stroke();
      g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(p); g.restore();
      txt(g, 'ECTODERM\n(exterior)', ax - 250, ay - 205, 15, '#bfeaf5', { alpha: aB }); txt(g, 'ENDODERM\n(spre faringe)', ax + 250, ay - 205, 15, '#fff0c4', { alpha: aB });
      const a2 = A(b, 2, 0.3), a3 = A(b, 3, 0.3);
      // cartilaj (din creasta neurală): bloc lavandă cu celule
      pill(g, ax - 40, ay + 30, 110, 150, '#e9dcff', '', { alpha: aB * a2, r: 50, glow: b.i === 2 ? 0.8 : 0 });
      for (let k = 0; k < 6; k++) dot(g, ax - 60 + (k % 2) * 40, ay - 20 + Math.floor(k / 2) * 45, 9, CREST, { alpha: aB * a2, ow: 2 });
      txt(g, 'cartilaj', ax - 40, ay + 130, 16, '#e3ccff', { alpha: aB * a2 });
      // mușchi (din mezoderm): fus striat roșu
      ell(g, ax + 130, ay + 50, 70, 42, MESO, { alpha: aB * a2, ow: 4 });
      for (let k = -2; k <= 2; k++) line(g, [[ax + 80, ay + 50 + k * 13], [ax + 180, ay + 50 + k * 13]], '#b9483f', 3, { alpha: aB * a2 });
      txt(g, 'mușchi', ax + 130, ay + 115, 16, '#ffd0c0', { alpha: aB * a2 });
      // nerv + arteră
      dot(g, ax - 150, ay + 40, 24, NERVE, { alpha: aB * a3, ow: 4 }); txt(g, 'nerv', ax - 150, ay + 88, 16, '#fff3b0', { alpha: aB * a3 });
      dot(g, ax + 110, ay - 70, 26, ART, { alpha: aB * a3, ow: 4 }); dot(g, ax + 110, ay - 70, 11, '#5a1a18', { alpha: aB * a3, ow: 0 });
      txt(g, 'arteră', ax + 175, ay - 70, 16, '#ffc0b8', { alpha: aB * a3 });
      if (b.i === 3) { const pz = 0.5 + 0.5 * Math.sin(t * 6); dot(g, ax + 110, ay - 70, 26 + 5 * pz, ART, { ow: 4 }); dot(g, ax + 110, ay - 70, 11, '#5a1a18', { ow: 0 }); }
      txt(g, 'mezenchimul arcului = mezoderm + creasta neurală', ax, ay + 205, 16, '#ffe7d6', { alpha: aB, w: 700 });
    },
  };
}
