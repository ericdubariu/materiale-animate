// Partea A + B (copertă, cronologie, foițele, neurulația, închiderea, creasta neurală, veziculele, măduva).
// Orientare în toate secțiunile transversale: SUS = DORSAL, JOS = VENTRAL. În vederile dorsale / sagitale: SUS = CRANIAL.
// Culori (ca în LP): albastru = ectoderm, mov = neuroectoderm, verde = creasta neurală, roșu = mezoderm, galben = endoderm.
import {
  W, H, cam, HOME, C, N, bg, panel, P, on, loopT, txt, pill, curve, at, sub, tube, flow, dot, ell, arr, ring, lead,
  foldPlate, crestCell, mix, stage, photoCap, OUT, clamp, lerp, ease, paint, REDUCED,
} from './ek.js';

/* ==========================================================================================
   NEURULAȚIA ÎN SECȚIUNE (folosită pe copertă și pe slide-ul de neurulație)
   Ce trebuie să se vadă, în ordine:
   1. ectodermul dorsal median se îngroașă = placa neurală (mov), deasupra notocordului (roșu, ventral de placă);
   2. placa se adâncește la mijloc (șanțul) și marginile se ridică DORSAL (plicile);
   3. plicile se întâlnesc și fuzionează pe linia mediană DORSALĂ; capetele lor (marginea plăcii) = creasta (verde);
   4. tubul se desprinde de ectoderm și coboară în mezoderm (spre notocord); ectodermul cutanat se închide DEASUPRA lui;
      celulele crestei rămân între tub și ectoderm, apoi migrează lateral → ganglionul spinal stă LÂNGĂ tub, nu în el.
   f = plierea 0..1 · d = desprinderea 0..1 · m = migrarea crestei 0..1
   ========================================================================================== */
export function neuruXS(g, cx, y0, s, f, d, m, o = {}) {
  const L = 280 * s, R = L / (2 * Math.PI);
  const fp = clamp(f), dd = ease(clamp(d)), mm = ease(clamp(m));
  const D = dd * (2 * R + 40 * s);                    // cât coboară tubul
  const yb = y0 + D;                                  // fundul șanțului (linia mediană ventrală a plăcii)
  const ext = o.ext || 470 * s;
  const thick = (o.thick ?? 1);                       // 0 = ectoderm subțire (înainte de inducție), 1 = placă îngroșată
  const notoY = y0 + 2 * R + 85 * s;
  // endodermul (galben, cel mai ventral)
  tube(g, [[cx - ext, y0 + 2 * R + 150 * s], [cx + ext, y0 + 2 * R + 150 * s]], 14 * s, N.endo, { ow: 4 * s + 2 });
  // somitele (mezoderm paraxial) — lateral de tub
  [-1, 1].forEach((k) => ell(g, cx + k * 175 * s, y0 + R + 70 * s, 70 * s, 52 * s, N.meso2, { ow: 4, alpha: o.dimSom ? 0.35 : 1 }));
  // notocordul (mezoderm, ventral de placă / tub); în m se reduce → nucleul pulpos
  const nr = 22 * s * (1 - 0.45 * (o.notoShrink ? mm : 0));
  ell(g, cx, notoY, nr, nr, N.noto, { ow: 4 });
  // ectodermul cutanat: de la margine până la vârful plicii; la desprindere se închide pe linia mediană, la y0
  const pts = foldPlate(fp, cx, yb, L);
  const tipL = pts[0], tipR = pts[pts.length - 1];
  const endL = [lerp(tipL[0], cx, dd), lerp(tipL[1] - (fp >= 1 ? D : 0), y0, dd)];
  const endR = [lerp(tipR[0], cx, dd), lerp(tipR[1] - (fp >= 1 ? D : 0), y0, dd)];
  const skinCol = N.ecto;
  tube(g, [[cx - ext, y0], [lerp(cx - ext, endL[0], 0.6), y0], endL], 12 * s, skinCol, { ow: 4 * s + 2, glow: o.hl === 'ecto' ? 0.9 : 0 });
  tube(g, [endR, [lerp(cx + ext, endR[0], 0.6), y0], [cx + ext, y0]], 12 * s, skinCol, { ow: 4 * s + 2, glow: o.hl === 'ecto' ? 0.9 : 0 });
  // lumenul tubului (doar când e închis)
  if (fp >= 0.999) ell(g, cx, yb - R, Math.max(2, R - 13 * s), Math.max(2, R - 13 * s), N.lumen, { ow: 0 });
  // placa / tubul (mov), îngroșarea crește odată cu inducția
  const w = lerp(12, 24, thick) * s;
  const plateCol = mix(N.ecto, N.neuro, thick);
  tube(g, pts, w, plateCol, { raw: true, ow: 4 * s + 2, cap: 'butt', glow: o.hl === 'tube' ? 0.9 : 0 });
  // marginile plăcii = creasta (verde) cât timp plicile nu s-au desprins
  const cr = clamp((fp - 0.35) / 0.3) * (1 - dd);
  if (cr > 0.01) {
    const n = pts.length; const k = 5;
    tube(g, pts.slice(0, k), w + 2 * s, N.crest, { raw: true, ow: 4 * s + 2, alpha: cr, glow: o.hl === 'crest' ? 0.8 : 0 });
    tube(g, pts.slice(n - k), w + 2 * s, N.crest, { raw: true, ow: 4 * s + 2, alpha: cr, glow: o.hl === 'crest' ? 0.8 : 0 });
  }
  // celulele crestei după desprindere: între tub și ectoderm, apoi migrează lateral și ventral (ganglionul spinal lângă tub)
  if (dd > 0.05) {
    const top = [cx, lerp(yb - 2 * R, y0 + 22 * s, 1)];
    const gx = R + 34 * s, gy = yb - R;           // ganglionul: lateral de tub
    for (let j = 0; j < 8; j++) {
      const side = j % 2 ? 1 : -1, q = Math.floor(j / 2);
      const start = [top[0] + side * (6 + q * 7) * s, top[1] + (q % 2) * 6 * s];
      const far = q === 3;                          // o celulă merge mai departe, ventral (ex. spre medulosuprarenală)
      const end = far ? [cx + side * (gx + 40 * s), gy + 70 * s] : [cx + side * gx + (q - 1) * 7 * s * side, gy - 10 * s + (q % 2) * 14 * s];
      const u = clamp(mm * 1.2 - q * 0.06);
      const mid = [cx + side * (R + 26 * s), yb - 2 * R + 6 * s];
      const p = curve([start, mid, end], 10);
      const [x, y] = at(p, ease(u));
      crestCell(g, x, y, s * 1.15, dd);
    }
    if (o.hl === 'crest') ring(g, cx, y0 + 30 * s, 60 * s, 30 * s, 1);
  }
  if (o.hl === 'noto') ring(g, cx, notoY, 36 * s, 36 * s, 1);
  return { R, yb, D, notoY, tipL, tipR, center: [cx, yb - R] };
}

/* =================================================== COPERTA: ectodermul se împarte în trei */
// Ce trebuie să se vadă: aceeași secțiune care se pliază în buclă; pe punctul k se aprinde sursa k
// (1 ectodermul de suprafață, 2 tubul, 3 creasta care migrează, 4 tubul care NU se închide = malformații).
const SRC = [
  { h: 'Ectodermul de suprafață', l: ['epiderm, păr, unghii · glande cutanate + mamare', 'adenohipofiza · smalțul dinților', 'urechea internă · cristalinul'], col: '#cfe0ff' },
  { h: 'Tubul neural', l: ['SNC (encefal + măduvă)', 'retina · epifiza (gl. pineală)', 'neurohipofiza'], col: '#e3d6ff' },
  { h: 'Creasta neurală', l: ['ganglioni + nervi (SNP) · medulosuprarenala', 'melanocitele · cartilajele arcurilor', 'mezenchimul capului · crestele bulbare + conale'], col: '#c9f0d8' },
  { h: 'Ce iese prost', l: ['tub neînchis → spina bifida, encefalocel', 'nu se împarte / neuronii nu migrează →', 'holoprozencefalie, lisencefalie …'], col: '#ffd3cd' },
];
export function cover({ spec }) {
  const map = (spec.sceneOpts && spec.sceneOpts.map) || null; // recapitulare: rândul tabelului → sursa
  const Y = [130, 355, 580, 805];
  const k = [0, 0, 0, 0];
  return {
    home: HOME,
    anchors: map ? [] : Y.map((y) => [470, y - 70]),
    phase: (i) => (map ? '' : ['ectoderm de suprafață', 'neuroectoderm: tubul', 'neuroectoderm: creasta', 'tub neînchis'][i] || ''),
    draw(g, t, b) {
      bg(g);
      const hi = b.i < 0 ? -1 : map ? map[b.i] : b.i;
      // stânga: secțiunea care se pliază în buclă (9 s)
      panel(g, 14, 40, 420, 860);
      txt(g, 'ECTODERM', 224, 90, 22, '#cfe0ff');
      const u = loopT(t, 9) * 9; const bad = hi === 3;
      const f = bad ? Math.min(0.62, u / 3) : clamp(u / 3), d = bad ? 0 : clamp((u - 3.2) / 1.8), m = bad ? 0 : clamp((u - 5.2) / 2.2);
      neuruXS(g, 224, 380, 0.62, f, d, m, { ext: 190, hl: ['ecto', 'tube', 'crest', null][hi] });
      if (bad && u > 2.4) { txt(g, 'plicile nu se unesc', 224, 210, 20, C.key); txt(g, '✕', 224, 300, 54, C.key); }
      txt(g, 'albastru = ectoderm\nmov = neuroectoderm\nverde = creasta neurală\nroșu = mezoderm · galben = endoderm', 224, 690, 17, '#d8c4b8', { w: 600 });
      txt(g, 'dorsal ↑', 380, 140, 16, '#c9b3a6', { w: 700 });
      // dreapta: cele 4 cutii
      SRC.forEach((r, i) => {
        const y = Y[i]; const act = i === hi || (b.i < 0 && Math.floor(t / 2.25) % 4 === i); k[i] = lerp(k[i], act ? 1 : 0, 0.08);
        const dim = hi >= 0 && !act ? 0.45 : 1;
        pill(g, 712, y, 520, 196, r.col, '', { alpha: dim, glow: k[i], r: 24 });
        txt(g, r.h, 712, y - 62, 23, OUT, { stroke: false, alpha: dim });
        r.l.forEach((l, j) => txt(g, l, 712, y - 14 + j * 34, 18, OUT, { stroke: false, alpha: dim, w: 600 }));
      });
      arr(g, 400, 330, 452, Y[0], '#cfe0ff', 4, 0.6); arr(g, 400, 400, 452, Y[1], '#e3d6ff', 4, 0.6); arr(g, 400, 470, 452, Y[2], '#c9f0d8', 4, 0.6);
    },
  };
}

/* =================================================== CRONOLOGIA (axa S3 → S17, culoare pe sistem) */
// Ce trebuie să se vadă: un cursor care merge de la stânga (S3) la dreapta (S17); evenimentele se aprind în ordinea lor:
// Z18 placa → sf. S4 tubul închis + creasta + 3 vezicule + placoda otică + primordiul optic → S5 5 vezicule → S9–S10 cerebel, S10 unghii → S13 măduva → S16 părul.
export function timeline() {
  const X = (w) => 200 + (w - 3) * 55;
  const LANES = [['Tubul neural', N.neuro], ['Creasta neurală', N.crest], ['Encefalul', '#4f8fe6'], ['Măduva', '#e0574f'], ['Ochi + ureche', '#c9a227'], ['Pielea', '#e07a3a']];
  const LY = LANES.map((_, i) => 120 + i * 128);
  // [lane, w0, w1 (= w0 → punct), text, punctul, dx, dy]
  const EV = [
    [0, 3.4, 3.6, 'Z18: placa neurală,\nîncepe neurulația', 0, 70, -40],
    [0, 3.6, 5.0, 'tubul închis: neuropori Z29 / Z30 (curs)\nZ25 / Z28 (Langman)', 1, 230, 44],
    [1, 4.4, 5.0, 'se formează la închiderea tubului\nși migrează (st. 9–10)', 1, 210, -40],
    [2, 4.6, 4.6, '3 vezicule\n(1 lună)', 1, -40, -44],
    [2, 5.3, 5.3, '5 vezicule (S5)', 2, 60, 40],
    [2, 9, 11, 'cerebelul: S9 coalescență,\nS10 eversie', 2, 120, -40],
    [3, 13, 13, 'S13: măduva are aproape\nforma definitivă', 3, -40, -40],
    [4, 4.5, 4.8, 'placoda otică (st. 9) · primordiul optic\n(sf. S4, st. 10) → vezicula optică', 1, 260, -40],
    [5, 10, 10, 'unghiile (S10)', 2, 0, -38],
    [5, 16, 16, 'părul devine\nvizibil (după S16)', 3, -60, -40],
  ];
  const RANGE = [[3, 3.6], [3.6, 5.0], [5.0, 11], [11, 16.6]];
  return {
    home: HOME,
    anchors: [[X(3.5), LY[0] - 70], [X(4.8), LY[1] + 52], [X(9), LY[2] + 52], [X(14.5), LY[3] + 52]],
    phase: (i) => ['S3 · Z18', 'sfârșitul S4', 'S5 → S10', 'S13 → S16'][i] || '',
    draw(g, t, b) {
      bg(g);
      let cw;
      if (b.i < 0) cw = lerp(3, 17, loopT(t, 12));
      else { const [a, c] = RANGE[b.i]; cw = lerp(a, c, ease(clamp(b.bt / (b.bd * 0.75)))); }
      // axa
      tube(g, [[X(3), 880], [X(17), 880]], 6, '#6b5650', { ow: 3 });
      for (let w = 3; w <= 17; w++) { tube(g, [[X(w), 870], [X(w), 890]], 3, '#6b5650', { ow: 0 }); txt(g, 'S' + w, X(w), 912, 15, '#d8c4b8', { w: 700 }); }
      LANES.forEach(([n, c], i) => {
        g.save(); g.strokeStyle = 'rgba(255,230,210,.10)'; g.lineWidth = 2; g.setLineDash([8, 10]); g.beginPath(); g.moveTo(X(3), LY[i]); g.lineTo(X(17), LY[i]); g.stroke(); g.restore();
        txt(g, n, 92, LY[i], 18, c === N.neuro ? '#d9c6ff' : c, { w: 800 });
      });
      EV.forEach(([ln, w0, w1, s, gi, dx, dy]) => {
        const c = LANES[ln][1]; const vis = cw >= w0 - 0.02; const act = b.i === gi || b.i < 0;
        const a = vis ? (act ? 1 : 0.55) : 0.13;
        const we = Math.min(w1, Math.max(w0, cw));
        if (w1 > w0) tube(g, [[X(w0), LY[ln]], [X(Math.max(w0 + 0.05, vis ? we : w1)), LY[ln]]], 18, c, { ow: 4, alpha: a });
        else dot(g, X(w0), LY[ln], 11, c, { alpha: a, ow: 3 });
        txt(g, s, X(w0) + dx, LY[ln] + dy, 15, C.cream, { alpha: a, w: 700 });
      });
      tube(g, [[X(cw), 60], [X(cw), 880]], 3, C.hi, { ow: 0, alpha: 0.7 });
      dot(g, X(cw), 880, 12, C.hi, { ow: 3 });
    },
  };
}

/* =================================================== DISCUL TRILAMINAR: ce dă fiecare foiță */
// Ce trebuie să se vadă: secțiune prin disc (dorsal sus): ectoderm (albastru; în centru placa mov, margini verzi),
// mezoderm (roșu: paraxial lângă notocord → intermediar → lateral, de la median spre lateral), endoderm (galben, ventral).
// Pe punctul k foița k se aprinde și derivatele ei „zboară” din ea în listă.
const DER = [
  ['epiderm, păr, unghii', 'glande cutanate + mamare', 'adenohipofiza', 'smalțul dinților', 'urechea internă', 'cristalinul', 'neuroectoderm → tubul neural', 'neuroectoderm → creasta neurală'],
  ['mușchii capului', 'mușchii striați: trunchi + membre', 'scheletul (fără craniu)', 'dermul pielii', 'țesut conjunctiv'],
  ['intermediar: aparatul urogenital', '(gonade, ducte, glande)', 'lateral: conjunctiv + mușchi viscerale', 'seroasele (pleură, pericard, peritoneu)', 'inima primitivă', 'sânge + limfatice', 'splina', 'corticosuprarenala'],
  ['trahee, bronhii, plămâni', 'tub digestiv, ficat, pancreas', 'vezica urinară, uraca', 'faringe, tiroidă, paratiroide', 'cavitatea timpanică', 'tuba faringotimpanică', 'amigdale'],
];
const LNAME = ['ECTODERMUL', 'MEZODERMUL PARAXIAL', 'MEZODERMUL INTERMEDIAR\n+ LATERAL', 'ENDODERMUL\n(doar epiteliile)'];
export function layers() {
  const src = [[500, 120], [380, 215], [790, 215], [500, 300]];
  return {
    home: HOME,
    anchors: [[150, 100], [300, 250], [870, 250], [150, 325]],
    phase: (i) => ['ectoderm', 'mezoderm paraxial', 'intermediar + lateral', 'endoderm'][i] || 'disc trilaminar (S3)',
    draw(g, t, b) {
      bg(g);
      const cyc = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 3.2) % 4 : b.i;
      const lift = (k) => (k === cyc ? -8 * (0.5 + 0.5 * Math.sin(t * 3)) : 0);
      const al = (k) => (k === cyc ? 1 : 0.5);
      // ectoderm
      g.save(); g.globalAlpha = al(0);
      tube(g, [[70, 120 + lift(0)], [930, 120 + lift(0)]], 26, N.ecto, { ow: 5, glow: cyc === 0 ? 0.7 : 0 });
      tube(g, [[420, 120 + lift(0)], [580, 120 + lift(0)]], 30, N.neuro, { ow: 5 });
      tube(g, [[410, 120 + lift(0)], [428, 120 + lift(0)]], 30, N.crest, { ow: 4, cap: 'butt' }); tube(g, [[572, 120 + lift(0)], [590, 120 + lift(0)]], 30, N.crest, { ow: 4, cap: 'butt' });
      g.restore();
      // mezoderm: paraxial, intermediar, lateral (2 foițe), notocordul la mijloc
      g.save(); g.globalAlpha = al(1);
      [-1, 1].forEach((s) => ell(g, 500 + s * 120, 212 + lift(1), 70, 40, N.meso, { ow: 4 }));
      g.restore();
      g.save(); g.globalAlpha = al(2);
      [-1, 1].forEach((s) => { ell(g, 500 + s * 235, 212 + lift(2), 32, 26, '#f6b49c', { ow: 4 }); tube(g, [[500 + s * 285, 196 + lift(2)], [500 + s * 420, 196 + lift(2)]], 14, N.meso2, { ow: 4 }); tube(g, [[500 + s * 285, 232 + lift(2)], [500 + s * 420, 232 + lift(2)]], 14, N.meso2, { ow: 4 }); });
      g.restore();
      ell(g, 500, 212, 24, 24, N.noto, { ow: 4 }); txt(g, 'notocord', 500, 258, 15, '#ffb0a8', { w: 700 });
      // endoderm
      g.save(); g.globalAlpha = al(3); tube(g, [[70, 300 + lift(3)], [930, 300 + lift(3)]], 22, N.endo, { ow: 5, glow: cyc === 3 ? 0.7 : 0 }); g.restore();
      txt(g, 'dorsal ↑ · secțiune prin discul trilaminar', 500, 60, 17, '#c9b3a6', { w: 600 });
      txt(g, 'paraxial', 620, 270, 15, '#ffb0a8', { w: 700, alpha: al(1) }); txt(g, 'intermediar', 735, 160, 15, '#ffd6c4', { w: 700, alpha: al(2) }); txt(g, 'lateral', 880, 160, 15, '#ffd6c4', { w: 700, alpha: al(2) });
      // stânga: numele foiței active
      txt(g, LNAME[cyc], 190, 420, 24, [N.ectoL, '#ffb0a8', '#ffd6c4', '#ffe9a8'][cyc]);
      txt(g, 'dă ↓', 190, 500, 20, C.cream, { w: 700 });
      // dreapta: derivatele zboară din foiță
      const list = DER[cyc]; const pr = b.i < 0 ? clamp(((REDUCED ? 3 : t % 3.2)) / 1.6) : clamp(b.bt / (b.bd * 0.6));
      list.forEach((s, j) => {
        const u = ease(clamp(pr * 1.6 - j * 0.08)); const tx = 680, ty = 380 + j * 64;
        const x = lerp(src[cyc][0], tx, u), y = lerp(src[cyc][1], ty, u);
        pill(g, x, y, 560 * lerp(0.3, 1, u), 50, [N.ectoL, '#ffc9c2', '#ffd6c4', '#ffe9a8'][cyc], u > 0.6 ? s : '', { alpha: u, size: 18, w: 700 });
      });
    },
  };
}

/* =================================================== NEURULAȚIA pas cu pas */
// Ce trebuie să se vadă: vezi neuruXS. Pe punctul 1 săgețile merg DE LA notocord (ventral) ÎN SUS spre ectoderm (inducția).
// Pe punctul 5: crestele → ganglionul spinal (lângă tub), notocordul se reduce (→ nucleul pulpos), somitele → schelet axial + mușchi.
export function neurulation() {
  const cx = 500, y0 = 300, s = 1.25;
  return {
    home: HOME,
    anchors: [[640, 330], [640, 200], [560, 150], [640, 420], [720, 560]],
    phase: (i) => ['1 · placa neurală (Z18)', '2 · șanțul + plicile', '3 · plicile fuzionează', '4 · tubul se desprinde', '5 · ce devine fiecare'][i] || 'neurulația, în buclă',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5);
      const f = 0.55 * p(1) + 0.45 * p(2), d = p(3), m = p(4);
      const R = 280 * s / (2 * Math.PI);
      const r = neuruXS(g, cx, y0, s, f, d, m, { ext: 470, thick: p(0), notoShrink: true, hl: b.i === 2 ? 'crest' : null });
      // 1 · inducția: semnalul pleacă din notocord în sus
      if (b.i === 0 || (b.i < 0 && p(0) < 1 && p(0) > 0)) {
        const u = loopT(t, 1.3);
        [-30, 0, 30].forEach((dx) => arr(g, cx + dx, r.notoY - 30, cx + dx * 1.4, lerp(r.notoY - 40, y0 + 30, u), C.hi, 5, 1 - u * 0.4));
        txt(g, 'notocordul induce', cx + 170, r.notoY - 40, 19, C.hi);
      }
      // etichete
      const lab = (s2, x, y, col, a, lx, ly) => { if (a <= 0.02) return; if (lx !== undefined) lead(g, x, y, lx, ly, a); txt(g, s2, x, y, 19, col, { alpha: a }); };
      lab('placa neurală', 215, 220, '#d9c6ff', p(0) * (1 - p(1)), cx - 80, y0);
      lab('notocord', 190, r.notoY, '#ffb0a8', 1, cx - 30, r.notoY);
      lab('șanțul neural', 215, 420, '#d9c6ff', p(1) * (1 - p(3)), cx - 10, y0 - 30);
      lab('plicile neurale', 790, 160, '#d9c6ff', p(1) * (1 - p(2)), r.tipR[0] + 10, r.tipR[1] + 30);
      lab('creasta neurală', 800, 180, '#bff0d2', p(2), cx + 30, b.i >= 3 || (b.i < 0 && d > 0) ? y0 + 30 : r.tipR[1]);
      lab('tubul neural', 170, 480, '#d9c6ff', p(3), cx - R - 10, r.center[1]);
      lab('ectodermul cutanat\n(pielea) se închide', 800, 250, '#cfe0ff', p(3), cx + 120, y0);
      lab('somită', 880, 470, '#ffb0a8', 1, cx + 260, y0 + R + 80);
      lab('endoderm', 880, y0 + 2 * R + 220, '#ffe9a8', 1);
      // 5 · ce devine fiecare
      if (m > 0.05) {
        lab('ganglion spinal\n(din creastă, lângă tub)', 800, 560, '#bff0d2', m, cx + R + 45, r.center[1]);
        lab('→ nucleul pulpos', 250, r.notoY + 70, '#ffb0a8', m);
        lab('→ schelet axial + mușchi', 235, 560, '#ffb0a8', m, cx - 210, y0 + R + 80);
      }
      // bara de etape
      ['placa', 'șanț + plici', 'fuziune', 'tub', 'derivate'].forEach((s2, k) => { const a = p(k) > 0.5 ? 1 : 0.35; pill(g, 120 + k * 190, 50, 170, 44, k === b.i ? C.hi : '#3a2a26', s2, { size: 17, col: k === b.i ? OUT : '#ffe7d6', alpha: a, ow: 4 }); });
      txt(g, 'dorsal ↑', 935, 120, 17, '#c9b3a6', { w: 700 });
    },
  };
}

/* =================================================== ÎNCHIDEREA TUBULUI: fermoarul + neuroporii (vedere dorsală) */
// Ce trebuie să se vadă (sus = CRANIAL): închiderea începe la mijloc (regiunea cervicală, în dreptul primelor somite)
// și merge în AMBELE sensuri; capătul CRANIAL (neuroporul rostral) se închide PRIMUL, cel CAUDAL după el.
// La final ectodermul cutanat acoperă tubul (de la mijloc spre capete).
export function closureState(b, t) {
  // ur, uc = progresul fronturilor (0 = la mijloc, 1 = capătul închis); sk = pielea
  if (b.i < 0) { const u = loopT(t, 10); return { ur: clamp(u / 0.5), uc: clamp(u / 0.75), sk: clamp((u - 0.78) / 0.15) }; }
  const e = ease(clamp(b.bt / (b.bd * 0.7)));
  if (b.i === 0) return { ur: 0.45 * e, uc: 0.32 * e, sk: 0 };
  if (b.i === 1) return { ur: lerp(0.45, 1, e), uc: lerp(0.32, 0.62, e), sk: 0 };
  if (b.i === 2) return { ur: 1, uc: lerp(0.62, 1, e), sk: 0 };
  return { ur: 1, uc: 1, sk: e };
}
export function dorsalTube(g, t, ur, uc, o = {}) {
  const Y0 = 360, YT = 110, YB = 840, CX = 500;
  const yT = lerp(Y0, YT, ur), yB = lerp(Y0, YB, uc);
  // embrionul (vedere dorsală)
  const body = new Path2D(); body.moveTo(CX, 60); body.bezierCurveTo(CX + 190, 60, CX + 200, 260, CX + 150, 380); body.bezierCurveTo(CX + 130, 560, CX + 110, 760, CX, 890); body.bezierCurveTo(CX - 110, 760, CX - 130, 560, CX - 150, 380); body.bezierCurveTo(CX - 200, 260, CX - 190, 60, CX, 60); body.closePath();
  paint(g, body, '#f0dccb', '#dcc0a8', null, [CX - 200, 60, 400, 830], OUT, 6);
  // somitele, perechi lângă tub
  for (let k = 0; k < 13; k++) { const y = 330 + k * 30; [-1, 1].forEach((s) => ell(g, CX + s * 78, y, 22, 12, N.meso2, { ow: 3 })); }
  const hw = (y) => (y < 300 ? lerp(78, 36, clamp((y - 100) / 200)) : y > 760 ? lerp(34, 22, clamp((y - 760) / 80)) : 34);
  const open = (y, front, dir) => clamp(dir * (front - y) / 70); // 0 la front (lipit), 1 deschis
  const fold = (s, y0, y1, front, dir) => { const pts = []; for (let y = y0; dir > 0 ? y <= y1 : y >= y1; y += dir * 8) pts.push([CX + s * hw(y) * ease(open(y, front, dir)), y]); pts.push([CX, front]); return pts; };
  // partea deschisă craniană (de la vârf la front)
  if (yT > YT + 2) {
    const L = fold(-1, YT - 10, yT, yT, 1), Rr = fold(1, YT - 10, yT, yT, 1);
    const grv = new Path2D(); grv.moveTo(L[0][0], L[0][1]); L.forEach((p) => grv.lineTo(p[0], p[1])); for (let k = Rr.length - 1; k >= 0; k--) grv.lineTo(Rr[k][0], Rr[k][1]); grv.closePath();
    g.save(); g.fillStyle = o.redR ? 'rgba(224,60,50,.55)' : '#3a2140'; g.fill(grv); g.restore();
    tube(g, L, 18, N.neuro, { raw: true, ow: 6 }); tube(g, Rr, 18, N.neuro, { raw: true, ow: 6 });
  }
  if (yB < YB - 2) {
    const L = fold(-1, YB + 10, yB, yB, -1), Rr = fold(1, YB + 10, yB, yB, -1);
    const grv = new Path2D(); grv.moveTo(L[0][0], L[0][1]); L.forEach((p) => grv.lineTo(p[0], p[1])); for (let k = Rr.length - 1; k >= 0; k--) grv.lineTo(Rr[k][0], Rr[k][1]); grv.closePath();
    g.save(); g.fillStyle = o.redC ? 'rgba(224,60,50,.55)' : '#3a2140'; g.fill(grv); g.restore();
    tube(g, L, 18, N.neuro, { raw: true, ow: 6 }); tube(g, Rr, 18, N.neuro, { raw: true, ow: 6 });
  }
  // porțiunea închisă = tubul (cranial mai lat = viitorul encefal)
  if (yB - yT > 4) {
    const pts = []; for (let y = yT; y <= yB; y += 8) pts.push([CX, y]); pts.push([CX, yB]);
    const wTop = (y) => (y < 300 ? lerp(120, 50, clamp((y - 110) / 190)) : 50);
    for (let k = 0; k < pts.length - 1; k++) tube(g, [pts[k], pts[k + 1]], wTop(pts[k][1]) + 12, OUT, { raw: true, ow: 0, cap: 'round' });
    for (let k = 0; k < pts.length - 1; k++) tube(g, [pts[k], pts[k + 1]], wTop(pts[k][1]), N.neuro, { raw: true, ow: 0, cap: 'round' });
    for (let k = 0; k < pts.length - 1; k++) tube(g, [pts[k], pts[k + 1]], wTop(pts[k][1]) * 0.3, N.lumen, { raw: true, ow: 0, cap: 'round' });
  }
  // ectodermul cutanat acoperă (de la mijloc spre capete)
  if (o.sk > 0) {
    const a = ease(o.sk); const y0 = lerp(Y0, YT - 20, a), y1 = lerp(Y0, YB + 20, a);
    g.save(); g.globalAlpha = 0.55; g.fillStyle = N.ecto; g.beginPath(); g.roundRect(CX - 70, y0, 140, y1 - y0, 40); g.fill(); g.restore();
  }
  return { yT, yB, Y0, YT, YB, CX };
}
export function closure() {
  return {
    home: HOME,
    anchors: [[640, 360], [690, 120], [690, 830], [330, 520]],
    phase: (i) => ['fermoarul pornește din regiunea cervicală', 'neuroporul rostral se închide primul', 'neuroporul caudal se închide după', 'pielea se închide deasupra'][i] || 'sfârșitul S4',
    draw(g, t, b) {
      bg(g); const s = closureState(b, t);
      const r = dorsalTube(g, t, s.ur, s.uc, { sk: s.sk });
      txt(g, 'CRANIAL', 500, 30, 20, '#d8c4b8');
      txt(g, 'vedere dorsală', 140, 40, 17, '#c9b3a6', { w: 600 });
      // fronturile fermoarului
      if (s.ur < 1) arr(g, 600, r.yT + 40, 600, r.yT - 10, C.hi, 5, 1);
      if (s.uc < 1) arr(g, 600, r.yB - 40, 600, r.yB + 10, C.hi, 5, 1);
      lead(g, 720, 380, 560, 360, 1); txt(g, 'închiderea pornește\nde la mijloc, ca un\nfermoar, în 2 sensuri', 830, 400, 18, C.hi);
      // neuroporii
      const rc = s.ur >= 1 ? '#bff0d2' : '#ffd0e6', cc = s.uc >= 1 ? '#bff0d2' : '#ffd0e6';
      txt(g, s.ur >= 1 ? 'neuroporul rostral ÎNCHIS' : 'neuroporul rostral', 820, 120, 19, rc);
      txt(g, 'Z29 (curs) · ~Z25 (Langman)', 820, 152, 17, C.cream, { w: 600 });
      if (s.ur >= 1) txt(g, 'lamina terminală (curs)', 820, 182, 16, '#d9c6ff', { w: 600 });
      txt(g, s.uc >= 1 ? 'neuroporul caudal ÎNCHIS' : 'neuroporul caudal', 820, 800, 19, cc);
      txt(g, 'Z30 (curs) · ~Z28 (Langman)', 820, 832, 17, C.cream, { w: 600 });
      txt(g, 'somite', 230, 520, 18, '#ffb0a8'); lead(g, 270, 520, 405, 520, 1);
      if (s.sk > 0.3) txt(g, 'ectodermul cutanat\nsigilează pielea\npeste tub', 200, 700, 18, '#cfe0ff', { alpha: s.sk });
      if (b.i === 1) ring(g, 500, 140, 110, 70, ease(b.bt * 1.3));
      if (b.i === 2) ring(g, 500, 820, 70, 60, ease(b.bt * 1.3));
    },
  };
}

/* =================================================== CREASTA NEURALĂ: migrarea spre 6 destinații */
// Ce trebuie să se vadă: celulele verzi pleacă din creastă (dorsal de tub, sub ectoderm) și curg SPRE destinație (spre dreapta),
// nu invers. Grupul activ: fluxul lui + caseta aprinsă; pe punctul 1, ganglionul spinal crește lângă tub.
const DEST = [
  ['ganglionii + nervii cranieni și senzitivi', '(SNP; ex. ganglionul spinal)', 0],
  ['medulosuprarenala', '(celulele cromafine)', 1],
  ['melanocitele', '(celulele pigmentare din piele)', 1],
  ['cartilajele arcurilor faringiene', '(LP 2)', 2],
  ['mezenchimul + conjunctivul capului', '(ectomezenchimul)', 2],
  ['crestele bulbare și conale', '(septul tractului de ejecție)', 3],
];
export function crest() {
  const DY = DEST.map((_, i) => 120 + i * 140);
  const SRC = [250, 260];
  return {
    home: HOME,
    anchors: [[480, 95], [480, 240], [480, 520], [480, 800]],
    phase: (i) => ['SNP', 'celule răspândite în corp', 'ectomezenchimul capului', 'inima'][i] || 'migrarea crestei',
    draw(g, t, b) {
      bg(g);
      const gi = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 2.6) % 4 : b.i;
      neuruXS(g, 230, 230, 0.75, 1, 1, b.i === 0 ? ease(clamp(b.bt / (b.bd * 0.7))) : 1, { ext: 200, dimSom: true });
      txt(g, 'tubul neural', 120, 470, 18, '#d9c6ff'); txt(g, 'CREASTA NEURALĂ', 230, 160, 19, '#bff0d2');
      txt(g, 'dorsal ↑', 380, 150, 15, '#c9b3a6', { w: 700 });
      if (gi === 1) txt(g, 'corticosuprarenala\n= mezoderm!', 220, 700, 19, C.hi);
      if (gi === 3) txt(g, '→ septul aortico-\npulmonar (LP de cardio)', 230, 700, 19, C.hi);
      DEST.forEach(([h, s2, k], i) => {
        const act = k === gi; const y = DY[i];
        const path = curve([[SRC[0], SRC[1]], [400, lerp(SRC[1], y, 0.4)], [500, y]], 16);
        tube(g, path, 6, N.crest, { raw: true, ow: 3, alpha: act ? 0.9 : 0.25, dash: act ? null : [8, 8] });
        if (act) flow(g, path, t, N.crest, 5, 0.32, 9);
        pill(g, 745, y, 470, 104, act ? '#c9f0d8' : '#e8f5ec', '', { alpha: act ? 1 : 0.45, glow: act ? 1 : 0, r: 20 });
        txt(g, h, 745, y - 18, 19, OUT, { stroke: false, alpha: act ? 1 : 0.45 });
        txt(g, s2, 745, y + 18, 17, OUT, { stroke: false, alpha: act ? 1 : 0.45, w: 600 });
      });
    },
  };
}

/* =================================================== VEZICULELE: 3 → 5 + sistemul ventricular */
// Ce trebuie să se vadă (sus = CRANIAL): S4 trei vezicule (pro-, mez-, rombencefal) + restul tubului (măduva).
// S5: prozencefalul se împarte în telencefal (sus) + diencefal; rombencefalul în metencefal (sus) + mielencefal; mezencefalul NU se împarte.
// Punctul 5: lumenul devine sistemul ventricular; LCR curge de sus în jos: ventriculii laterali → III → apeduct (cel mai îngust) → IV → canalul central.
export function vesicles() {
  const CX = 230;
  const V3 = { pros: [200, 112, 108], mes: [370, 74, 52], rhomb: [530, 86, 100] };
  const V5 = { tel: [128, 132, 66], di: [262, 84, 56], mes: [370, 74, 52], met: [480, 88, 54], miel: [592, 70, 52] };
  const ROWS = [
    ['telencefal', 'emisferele: cortex, substanță\nalbă, nuclei bazali', 128, N.tel],
    ['diencefal', 'talamus, hipotalamus,\nepitalamus', 262, N.di],
    ['mezencefal', 'nu se împarte → mezencefalul\n(parte din trunchiul cerebral)', 370, N.mes],
    ['metencefal', 'puntea + cerebelul', 480, N.met],
    ['mielencefal', 'bulbul rahidian\n(LA: medulla oblongata)', 592, N.miel],
    ['restul tubului', '→ măduva spinării', 760, N.cordG],
  ];
  const VEN = [['ventriculii laterali', 128], ['ventriculul III', 262], ['apeductul (cel mai îngust)', 370], ['ventriculul IV', 536], ['canalul central', 760]];
  return {
    home: HOME,
    anchors: [[60, 150], [60, 370], [60, 540], [60, 760], [470, 370]],
    phase: (i) => ['prozencefal → tel- + diencefal', 'mezencefalul rămâne unul', 'rombencefal → met- + mielencefal', 'restul → măduva', 'lumenul → ventriculii'][i] || 'S4 → S5',
    draw(g, t, b) {
      bg(g);
      let spP, spR;
      if (b.i < 0) { const u = loopT(t, 8); spP = spR = ease(clamp((u - 0.3) / 0.35)); }
      else { const e = ease(clamp(b.bt / (b.bd * 0.6))); spP = b.i === 0 ? e : 1; spR = b.i < 2 ? 0 : b.i === 2 ? e : 1; }
      const vent = b.i === 4 ? ease(clamp(b.bt / (b.bd * 0.5))) : 0;
      // măduva
      tube(g, [[CX, 600], [CX, 900]], 50, mix(N.cordG, N.cordG, 0), { ow: 6, glow: b.i === 3 ? 0.7 : 0 });
      const ves = (y, rx, ry, col, glow) => { ell(g, CX, y, rx, ry, col, { ow: 6 }); if (glow) ring(g, CX, y, rx + 14, ry + 14, 1); };
      // rombencefal → met + miel
      const yM = lerp(V3.rhomb[0], V5.met[0], spR), yL = lerp(V3.rhomb[0], V5.miel[0], spR);
      ves(yL, lerp(V3.rhomb[1], V5.miel[1], spR), lerp(V3.rhomb[2], V5.miel[2], spR), mix(N.rhomb, N.miel, spR), b.i === 2);
      ves(yM, lerp(V3.rhomb[1], V5.met[1], spR), lerp(V3.rhomb[2], V5.met[2], spR), mix(N.rhomb, N.met, spR), false);
      ves(V3.mes[0], V3.mes[1], V3.mes[2], N.mes, b.i === 1);
      const yD = lerp(V3.pros[0], V5.di[0], spP), yT = lerp(V3.pros[0], V5.tel[0], spP);
      ves(yD, lerp(V3.pros[1], V5.di[1], spP), lerp(V3.pros[2], V5.di[2], spP), mix(N.pros, N.di, spP), false);
      ves(yT, lerp(V3.pros[1], V5.tel[1], spP), lerp(V3.pros[2], V5.tel[2], spP), mix(N.pros, N.tel, spP), b.i === 0);
      // lumenul (în punctul 5 devine LCR albastru)
      const lc = mix(N.lumen, N.csf, vent);
      [[yT, 0.45], [yD, 0.3], [yM, 0.3], [yL, 0.25]].forEach(([y, k]) => ell(g, CX, y, 52 * k + 6, 26, lc, { ow: 3 }));
      tube(g, [[CX, yT], [CX, 900]], 10 + 6 * vent, lc, { ow: 3 });
      tube(g, [[CX, 330], [CX, 410]], 6, lc, { ow: 3 }); // apeductul, îngust
      if (vent > 0) {
        flow(g, [[CX, 120], [CX, 262], [CX, 370], [CX, 536]], t, '#2f68bd', 6, 0.22, 7); // LCR: laterali → III → apeduct → IV (de acolo iese în spațiul subarahnoidian)
        ring(g, CX, 370, 40, 52, vent);
      }
      // etichetele 3 vezicule (stânga, mici) și cele 5 (dreapta)
      txt(g, spP < 0.5 && spR < 0.5 ? 'S4 · 3 vezicule' : 'S5 · 5 vezicule', CX, 40, 21, C.hi);
      if (spP < 0.4) txt(g, 'prozencefal', CX, yT, 20, OUT, { stroke: false });
      if (spR < 0.4) txt(g, 'rombencefal', CX, yL, 20, OUT, { stroke: false });
      txt(g, 'mezencefal', CX, 370, 17, OUT, { stroke: false });
      ROWS.forEach(([n, d, y, col], i) => {
        const split = i < 2 ? spP : i === 2 ? 1 : i < 5 ? spR : 1;
        const a = vent > 0 ? 0.35 : split > 0.5 ? 1 : 0.3;
        lead(g, CX + 140, y, 420, y, a * 0.8);
        pill(g, 570, y - 22, 270, 40, col, n, { size: 18, alpha: a });
        txt(g, d, 790, y + 22, 16, C.cream, { alpha: a, w: 600 });
      });
      if (vent > 0) VEN.forEach(([n, y]) => { pill(g, 640, y, 360, 44, N.csf, n, { size: 18, alpha: vent }); lead(g, CX + 30, y, 460, y, vent); });
      // punctul 4: figura din LP (1 lună → 5 săptămâni → copil) peste coloana din dreapta
      if (b.i === 3) { const a = ease(clamp(b.bt / 1.2)); g.save(); g.globalAlpha = a; panel(g, 420, 90, 560, 620, { fill: 'rgba(20,12,10,.92)', stroke: 'rgba(255,180,138,.7)' }); g.restore(); photoCap(g, 'vezicule_fac', 440, 110, 520, 420, 'De la embrionul de 1 lună la copil', 'Disciplina de Anatomie-Embriologie UMFST (LP)', a); txt(g, 'restul tubului → măduva spinării', 700, 650, 19, C.hi, { alpha: a }); }
    },
  };
}

/* =================================================== MĂDUVA: plăcile alară + bazală, ascensiunea */
// Ce trebuie să se vadă (secțiune, sus = DORSAL): placa alară = jumătatea dorsală (verde) → coarnele POSTERIOARE (senzitive);
// placa bazală = jumătatea ventrală (portocaliu) → coarnele ANTERIOARE (motorii); șanțul limitant = granița, pe peretele lumenului.
// Fluxul: informația senzitivă INTRĂ dorsal (din ganglionul spinal în cornul posterior); comanda motorie IESE ventral.
// Coloana (dreapta): conul medular urcă relativ de la L3 (naștere) la L1 (adult) pentru că coloana crește mai repede.
export function cord() {
  const VX = 770, VY = (k) => 190 + k * 105; const VN = ['T12', 'L1', 'L2', 'L3', 'L4', 'L5'];
  return {
    home: HOME,
    anchors: [[290, 120], [290, 460], [360, 290], [880, 470]],
    phase: (i) => ['placa alară = dorsal = senzitiv', 'placa bazală = ventral = motor', 'șanțul limitant', 'L3 la naștere → L1 la adult'][i] || '',
    draw(g, t, b) {
      bg(g); panel(g, 14, 40, 560, 860); panel(g, 590, 40, 396, 860);
      const p = P(b, t, 4);
      // --- tubul embrionar (sus)
      const ex = 230, ey = 280;
      ell(g, ex, ey, 128, 160, '#f3ecff', { ow: 6 });
      const half = (top) => { const pth = new Path2D(); pth.ellipse(ex, ey, 118, 150, 0, top ? Math.PI : 0, top ? Math.PI * 2 : Math.PI); pth.closePath(); return pth; };
      g.save(); g.globalAlpha = 0.95; paint(g, half(true), N.alar, null, null, [ex - 118, ey - 150, 236, 150], OUT, b.i === 0 ? 6 : 0); paint(g, half(false), N.basal, null, null, [ex - 118, ey, 236, 150], OUT, b.i === 1 ? 6 : 0); g.restore();
      // lumenul în romb: colțurile laterale = șanțul limitant
      const lum = new Path2D(); lum.moveTo(ex, ey - 110); lum.lineTo(ex + 26, ey); lum.lineTo(ex, ey + 100); lum.lineTo(ex - 26, ey); lum.closePath();
      paint(g, lum, '#ffffff', null, null, [ex - 26, ey - 110, 52, 210], OUT, 4);
      txt(g, 'placa\nalară', ex - 62, ey - 70, 18, OUT, { stroke: false }); txt(g, 'placa\nbazală', ex - 62, ey + 70, 18, OUT, { stroke: false });
      if (b.i === 2 || b.i < 0) { const pu = 0.5 + 0.5 * Math.sin(t * 5); dot(g, ex + 26, ey, 8 + 4 * pu, C.hi, { ow: 3 }); dot(g, ex - 26, ey, 8 + 4 * pu, C.hi, { ow: 3 }); }
      lead(g, ex + 30, ey, 430, ey, 1); txt(g, 'șanțul limitant', 480, ey - 22, 17, C.hi);
      txt(g, 'tubul neural (secțiune)', ex, 90, 18, '#d8c4b8', { w: 700 });
      txt(g, 'dorsal ↑', 480, 110, 16, '#c9b3a6', { w: 700 });
      arr(g, ex, 470, ex, 520, '#fff3e6', 5, 0.7);
      // --- măduva adultă (jos): fluturele de substanță cenușie
      const ax = 270, ay = 700;
      ell(g, ax, ay, 150, 120, '#fbf3ea', { ow: 6 });
      const hornP = (s) => { tube(g, [[ax + s * 14, ay - 4], [ax + s * 56, ay - 60], [ax + s * 74, ay - 104]], 26, N.alar, { ow: 5, glow: b.i === 0 ? 0.7 : 0 }); };
      const hornA = (s) => { const q = new Path2D(); q.ellipse(ax + s * 58, ay + 46, 46, 38, 0, 0, 7); paint(g, q, N.basal, null, null, [ax + s * 58 - 46, ay + 8, 92, 76], OUT, 5); };
      hornP(-1); hornP(1); hornA(-1); hornA(1);
      tube(g, [[ax - 30, ay + 4], [ax + 30, ay + 4]], 20, '#d8cfe0', { ow: 4 }); dot(g, ax, ay + 4, 5, '#ffffff', { ow: 2 });
      txt(g, 'coarne posterioare\n(senzitiv)', ax + 170, ay - 120, 17, '#bff0d2'); txt(g, 'coarne anterioare\n(motor)', ax + 175, ay + 110, 17, '#ffd6c4');
      // ganglionul spinal + fibra senzitivă care INTRĂ; fibra motorie care IESE
      ell(g, 70, ay - 130, 28, 22, N.crest, { ow: 4 }); txt(g, 'ganglion\nspinal', 70, ay - 190, 15, '#bff0d2');
      const aff = [[30, ay - 210], [70, ay - 130], [150, ay - 110], [ax - 74, ay - 104]];
      const eff = [[ax - 58, ay + 46], [150, ay + 120], [60, ay + 150]];
      tube(g, aff, 6, '#bff0d2', { ow: 3 }); tube(g, eff, 6, '#ffd6c4', { ow: 3 });
      if (b.i === 0 || b.i < 0) flow(g, curve(aff), t, C.hi, 4, 0.35, 7);
      if (b.i === 1 || b.i < 0) flow(g, curve(eff), t, '#ff8a3d', 4, 0.35, 7);
      txt(g, 'spre mușchi', 80, ay + 185, 15, '#ffd6c4');
      txt(g, 'măduva (adult)', ax, 880, 18, '#d8c4b8', { w: 700 });
      // --- coloana + conul medular
      VN.forEach((n, k) => { pill(g, VX + 70, VY(k), 110, 80, N.bone, n, { size: 19 }); });
      const u = p(3);
      const tipBirth = VY(3), tipAdult = VY(1);
      const tip = b.i < 0 ? lerp(tipBirth, tipAdult, ease(clamp((loopT(t, 6) - 0.3) / 0.4))) : b.i === 3 ? lerp(tipBirth, tipAdult, u) : tipBirth;
      tube(g, [[VX - 40, 80], [VX - 40, tip - 30]], 30, N.neuro, { ow: 5 });
      const cone = new Path2D(); cone.moveTo(VX - 55, tip - 32); cone.lineTo(VX - 25, tip - 32); cone.lineTo(VX - 40, tip + 6); cone.closePath(); paint(g, cone, N.neuro, null, null, [VX - 55, tip - 32, 30, 38], OUT, 4);
      for (let k = 0; k < 5; k++) tube(g, [[VX - 40 + (k - 2) * 4, tip], [VX - 40 + (k - 2) * 10, 860]], 3, '#d9c6ff', { ow: 0, alpha: 0.7 });
      tube(g, [[VX - 90, tipBirth], [VX - 62, tipBirth]], 6, '#bfa4ff', { ow: 3 }); txt(g, 'naștere', VX - 140, tipBirth, 15, '#d9c6ff');
      tube(g, [[VX - 90, tipAdult], [VX - 62, tipAdult]], 6, '#1a1020', { ow: 3 }); txt(g, 'adult', VX - 130, tipAdult, 15, '#ffffff');
      txt(g, 'unde se termină\nconul medular', VX + 10, 90, 17, '#d8c4b8', { w: 700 });
      if (b.i === 3) { arr(g, VX + 150, 760, VX + 150, 860, '#fff3e6', 5, u); txt(g, 'coloana\ncrește mai\nrepede', VX + 150, 690, 15, C.cream, { alpha: u }); txt(g, 'S13: forma aproape definitivă', VX + 10, 880, 15, C.hi, { alpha: u }); }
    },
  };
}
