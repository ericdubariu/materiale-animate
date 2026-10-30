// Scenele proprii ale recapitulării Farmacologie LP 2–4: coperta (3 LP-uri + stația) și cele 3 formule de la stație.
// Statice: cardul / banda punctului activ se aprinde; pe intro totul e aprins. Helperii vin din l4/fk.js (aceeași paletă Farma).
import { HOME, C, OUT, bg, panel, txt, pill, arr, icon, membrane, receptor, gprot } from './l4/fk.js';

const ON = 'rgba(255,207,133,.14)', OFF = 'rgba(255,236,200,.06)';
const box = (g, x, y, w, h, act) => panel(g, x, y, w, h, { fill: act ? ON : OFF, stroke: act ? C.hi : 'rgba(255,225,180,.2)', lw: act ? 5 : 3 });

/* =================================================== COPERTA: LP 2 · LP 3 · LP 4 · stația */
export function rcover() {
  const R = [[40, 40], [520, 40], [40, 490], [520, 490]];
  const T = ['LP 2 · farmacocinetică', 'LP 3 · farmacodinamie', 'LP 4 · SNV: 4 experimente', 'stația: 7 minute'];
  return {
    home: HOME, anchors: R.map(([x, y]) => [x + 32, y + 32]),
    draw(g, t, b) {
      bg(g);
      R.forEach(([x, y], i) => {
        const act = b.i < 0 || b.i === i; const a = act ? 1 : 0.45;
        box(g, x, y, 440, 410, b.i === i);
        txt(g, T[i], x + 220, y + 370, 25, C.hi, { alpha: a });
        const cx = x + 220;
        if (i === 0) {
          ['A', 'D', 'M', 'E'].forEach((l, j) => { pill(g, x + 75 + j * 97, y + 120, 74, 74, ['#7fc8ff', '#ffd27a', '#ff9d6b', '#b48cff'][j], l, { size: 34, r: 37, alpha: a }); if (j < 3) arr(g, x + 114 + j * 97, y + 120, x + 136 + j * 97, y + 120, C.cream, 5, a); });
          txt(g, 'absorbție · distribuție\nmetabolizare · eliminare', cx, y + 210, 20, C.cream, { alpha: a, w: 700 });
          txt(g, '5 cazuri: peptid · antiacid\ninductor · pro-drog · T½', cx, y + 290, 20, C.cream, { alpha: a, w: 700 });
        }
        if (i === 1) {
          membrane(g, x + 30, x + 410, y + 130, { h: 42, alpha: a });
          [['Gs', C.gs, 'β'], ['Gi', C.gi, 'M2'], ['Gq', C.gq, 'H1']].forEach(([l, c, r], j) => { const xx = x + 100 + j * 120; receptor(g, xx, y + 130, c, r, { s: 0.75, ly: -72, size: 22, alpha: a }); gprot(g, xx, y + 205, c, l, { s: 0.8, alpha: a }); });
          txt(g, 'liganzi · curbe · Gs / Gi / Gq\n5 cazuri prin decodor', cx, y + 285, 20, C.cream, { alpha: a, w: 700 });
        }
        if (i === 2) {
          [['gut', 'ileon'], ['gland', 'salivă'], ['eye', 'pupilă'], ['uterus', 'uter']].forEach(([n, l], j) => { const xx = x + 70 + j * 100; icon(g, n, xx, y + 130, 0.78, { pupil: 9, alpha: a }); txt(g, l, xx, y + 200, 18, C.cream, { alpha: a, w: 700 }); });
          txt(g, 'receptori · opuse · clasificare\ngrile SNV', cx, y + 285, 20, C.cream, { alpha: a, w: 700 });
        }
        if (i === 3) {
          const X0 = cx, Y0 = y + 170, Rr = 105;
          g.save(); g.globalAlpha = a; g.lineWidth = 34; g.strokeStyle = OUT;
          g.beginPath(); g.arc(X0, Y0, Rr, 0, 7); g.stroke();
          g.lineWidth = 24; g.strokeStyle = '#8a7a6a'; g.beginPath(); g.arc(X0, Y0, Rr, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 / 7); g.stroke();
          g.strokeStyle = C.hi; g.beginPath(); g.arc(X0, Y0, Rr, -Math.PI / 2 + Math.PI * 2 / 7 + 0.04, Math.PI * 1.5 - 0.04); g.stroke(); g.restore();
          txt(g, '7 min', X0, Y0 - 12, 40, '#fff', { alpha: a });
          txt(g, '1 citești · 6 vorbești', X0, Y0 + 30, 17, C.cream, { alpha: a, w: 700 });
          txt(g, 'doar ce spui cu voce tare', cx, y + 318, 19, C.cream, { alpha: a, w: 700 });
        }
      });
    },
  };
}

/* =================================================== CELE 3 FORMULE DE LA STAȚIE */
export function formulas() {
  const ORD = ['identificare', 'mecanism', 'aplicare', 'comparație (DD)', 'concluzie'];
  const B = [
    ['Caz de farmacocinetică · LP 2', ['ce observ', 'etapa\nADME', 'mecanism', 'consecință', 'recoman-\ndare'], '#7fc8ff'],
    ['Caz de receptori · LP 3', ['afinitate', 'activitate\nintrinsecă', 'proteina G', 'țesut', 'efect +\nindicație'], C.gq],
    ['Experiment SNV · LP 4', ['modelul', 'rezultatul', 'receptor +\nmesageri', 'antago-\nnistul', 'aplicația\nclinică'], C.gs],
  ];
  const X = (k) => 118 + k * 191;
  return {
    home: HOME, anchors: [[60, 70], [60, 300], [60, 500], [60, 700]],
    draw(g, t, b) {
      bg(g);
      // 1 · stația: bara de 7 minute + ciorna
      const a0 = b.i < 0 || b.i === 0 ? 1 : 0.45;
      box(g, 30, 40, 940, 200, b.i === 0);
      txt(g, 'stația · 7 minute', 500, 80, 24, C.hi, { alpha: a0 });
      const bx = 90, bw = 820, u = bw / 7;
      pill(g, bx + u / 2, 140, u - 6, 54, '#8a7a6a', '1 min', { size: 20, alpha: a0 });
      pill(g, bx + u + 3 * u, 140, 6 * u - 6, 54, C.hi, 'vorbești 6 min: tot ce spui se punctează', { size: 20, alpha: a0 });
      txt(g, 'citești + ciornă: 5 cuvinte', bx + u / 2 + 40, 200, 17, C.cream, { alpha: a0, w: 700, align: 'left' });
      txt(g, 'la „mai e 1 minut” → concluzia', 900, 200, 17, C.cream, { alpha: a0, w: 700, align: 'right' });
      // ordinea de punctaj (aceeași la toate)
      txt(g, 'punctaj: ' + ORD.join(' → '), 500, 272, 17, C.dim, { w: 700 });
      // 2–4 · cele 3 benzi
      B.forEach(([lab, steps, col], j) => {
        const y = 300 + j * 200; const act = b.i === j + 1; const a = b.i < 0 || act ? 1 : 0.45;
        box(g, 30, y, 940, 180, act);
        txt(g, lab, 500, y + 32, 22, col, { alpha: a });
        steps.forEach((s, k) => { pill(g, X(k), y + 112, 160, 86, col, s, { size: 19, alpha: a }); if (k < 4) arr(g, X(k) + 82, y + 112, X(k) + 108, y + 112, C.cream, 5, a); });
      });
      txt(g, 'formula umple identificarea, mecanismul și aplicarea; apoi DD + concluzia', 500, 906, 18, C.cream, { w: 700 });
    },
  };
}
