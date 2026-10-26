// Partea C + E + F: anomaliile cromozomiale, diagnosticul prenatal, cazul, capcanele, recapitularea.
import { HOME, C, bg, panel, txt, pill, tube, flow, dot, ell, arr, at, curve, loopT, OUT, clamp, lerp, ease, REDUCED } from './ek.js';
import { chromo, cell, card, vis, act, pulse, MAT, PAT, GRN, RED, AMB, OK } from './k1.js';

const pr = (b, k, f = 0.65) => (b.i < 0 ? 1 : b.i > k ? 1 : b.i < k ? 0 : ease(clamp(b.bt / (b.bd * f))));
const glowBox = (g, x, y, w, h, a) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.strokeStyle = C.hi; g.lineWidth = 5; g.shadowColor = C.hi; g.shadowBlur = 20; g.beginPath(); g.roundRect(x, y, w, h, 18); g.stroke(); g.restore(); };

/* ============ CLASIFICAREA + PLOIDIA ============ */
export function classif() {
  const BR = [[260, 300, 'A. Numerice', 'apar în meioză', '#ffd6c4'], [260, 470, 'B. Structurale', 'deleții · microdeleții\ntranslocații', '#ffe9a8'], [740, 300, 'A. Autozomale', 'Down 21 · Edwards 18\nPatau 13 · cri-du-chat 5p−', '#e3d6ff'], [740, 470, 'B. Sexuali', 'Turner XO · Klinefelter XXY\nXXX · XYY', '#c8f0d8']];
  // ploidia: câte copii are fiecare din 3 cromozomi reprezentativi
  const PL = [['haploid · n', [1, 1, 1], '23'], ['diploid · 2n', [2, 2, 2], '46'], ['triploid · 3n', [3, 3, 3], '69'], ['trisomie · 2n+1', [2, 3, 2], '47'], ['monosomie · 2n−1', [2, 1, 2], '45']];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: BR.map(([x, y]) => [x - 150, y - 50]),
    draw(g, t, b) {
      bg(g);
      card(g, 500, 80, 360, 70, 'Anomalii cromozomiale', '', '#ffb48a', { ts: 22 });
      [['I. după tipul anomaliei', 260], ['II. după cromozom', 740]].forEach(([s, x]) => { txt(g, s, x, 190, 18, '#ffe7d6'); arr(g, 500, 118, x, 168, '#fff3e6', 4, 1); });
      BR.forEach(([x, y, n, s, col], k) => card(g, x, y, 330, 120, n, s, col, { alpha: vis(b, k, 0.35), glow: act(b, k) ? 1 : 0, ts: 20, ss: 15 }));
      // ploidia (sub numerice)
      const a0 = b.i < 0 || b.i === 0 ? 1 : 0.25;
      panel(g, 30, 560, 940, 300, { fill: 'rgba(255,240,228,.05)' });
      txt(g, '3 cromozomi reprezentativi; fiecare bară = o copie', 500, 585, 15, '#cdb8ab', { alpha: a0, w: 600 });
      const cyc = b.i === 0 ? Math.min(4, Math.floor(b.bt / (b.bd / 5))) : b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 1.6) % 5 : -1;
      PL.forEach(([n, cp, num], j) => {
        const x = 120 + j * 190; const on = j === cyc; const odd = j >= 3;
        cp.forEach((m, c) => { for (let q = 0; q < m; q++) { const extra = odd && ((j === 3 && c === 1 && q === 2) || (j === 4 && c === 1)); tube(g, [[x - 40 + c * 40 + q * 10 - 5, 640], [x - 40 + c * 40 + q * 10 - 5, 720]], 8, extra ? AMB : ['#e8505b', '#7fb6e6', '#9dff8a'][c], { ow: 3, alpha: a0 }); } });
        txt(g, n, x, 760, 15, on ? C.hi : '#ffe7d6', { alpha: a0 }); txt(g, num, x, 800, 22, on ? C.hi : '#ffb48a', { alpha: a0 });
        glowBox(g, x - 85, 615, 170, 205, on ? a0 * 0.9 : 0);
      });
      txt(g, 'euploidie (seturi întregi)', 310, 845, 15, '#cdb8ab', { alpha: a0 }); txt(g, 'aneuploidie (1 cromozom)', 785, 845, 15, '#cdb8ab', { alpha: a0 });
      txt(g, '50% dintre produșii de concepție sunt avortați spontan', 500, 905, 17, '#ff9a8a', { alpha: b.i < 0 ? 1 : 0.7 });
    },
  };
}

/* ============ NONDISJUNCȚIA ============ */
// o pereche de omologi: roșu = matern, albastru = patern. MI separă omologii, MII separă cromatidele.
export function nondis() {
  const COLX = [170, 500, 830];
  // gameții: listă de cromozomi (culori) per gamet
  const G = [[[MAT], [MAT], [PAT], [PAT]], [[MAT, PAT], [MAT, PAT], [], []], [[MAT], [MAT], [PAT, PAT], []]];
  const MI = [[[MAT], [PAT]], [[MAT, PAT], []], [[MAT], [PAT]]];
  const lab = (n) => (n === 1 ? 'n' : n === 2 ? 'n+1' : 'n−1');
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[COLX[0] - 120, 70], [COLX[1] - 120, 70], [COLX[2] - 120, 70], [80, 740]],
    draw(g, t, b) {
      bg(g);
      [['normal', 0], ['nondisjuncție\nîn meioza I', 1], ['nondisjuncție\nîn meioza II', 2]].forEach(([s, k]) => txt(g, s, COLX[k], 80, 18, act(b, k) ? C.hi : '#ffe7d6', { alpha: b.i === 3 ? 0.5 : vis(b, k, 0.35) }));
      COLX.forEach((x, k) => {
        const a = b.i === 3 ? 0.45 : vis(b, k, 0.3); const p = b.i === k ? ease(clamp(b.bt / (b.bd * 0.7))) : b.i < 0 || b.i > k ? 1 : 0;
        cell(g, x, 180, 48, '#3a2a26', { alpha: a }); chromo(g, x - 12, 180, 46, MAT, { dup: true, alpha: a }); chromo(g, x + 12, 180, 46, PAT, { dup: true, alpha: a });
        const p1 = clamp(p * 2), p2 = clamp(p * 2 - 1);
        MI[k].forEach((cs, j) => { const cx = x + (j ? 70 : -70); arr(g, x, 230, cx, 290, '#fff3e6', 4, a * p1); cell(g, cx, 330, 40, '#3a2a26', { alpha: a * p1, glow: k === 1 && act(b, 1) ? p1 : 0 }); cs.forEach((c, q) => chromo(g, cx + (q - (cs.length - 1) / 2) * 22, 330, 38, c, { dup: true, alpha: a * p1 })); });
        G[k].forEach((cs, j) => {
          const gx = x - 105 + j * 70; const from = x + (j < 2 ? -70 : 70);
          arr(g, from, 372, gx, 440, '#fff3e6', 3, a * p2);
          const bad = cs.length !== 1; cell(g, gx, 480, 30, bad ? '#5a2a2a' : '#2f4a36', { alpha: a * p2, glow: bad && (b.i === k) ? p2 * 0.8 : 0 });
          cs.forEach((c, q) => chromo(g, gx + (q - (cs.length - 1) / 2) * 14, 480, 30, c, { alpha: a * p2 }));
          txt(g, lab(cs.length === 0 ? 0 : cs.length), gx, 530, 16, bad ? '#ff9a8a' : '#b8f0c8', { alpha: a * p2 });
        });
      });
      txt(g, 'MI', 40, 255, 15, '#cdb8ab'); txt(g, 'MII', 40, 405, 15, '#cdb8ab');
      // fecundația: n+1 + n → 47 ; n−1 + n → 45
      const a3 = b.i < 0 || b.i === 3 ? 1 : 0.2; const p3 = b.i === 3 ? ease(clamp(b.bt / (b.bd * 0.6))) : 1;
      panel(g, 40, 590, 920, 300, { fill: 'rgba(255,240,228,.05)' });
      [[680, 'n+1', [MAT, PAT], 'zigot 47 = TRISOMIE'], [810, 'n−1', [], 'zigot 45 = MONOSOMIE']].forEach(([y, s, cs, res], r) => {
        cell(g, 160, y - r * 0, 32, '#5a2a2a', { alpha: a3 }); cs.forEach((c, q) => chromo(g, 160 + (q - 0.5) * 14, y, 30, c, { alpha: a3 })); txt(g, s, 160, y + 50, 15, '#ff9a8a', { alpha: a3 });
        txt(g, '+', 240, y, 30, '#fff3e6', { alpha: a3 });
        cell(g, 320, y, 32, '#2f4a36', { alpha: a3 }); chromo(g, 320, y, 30, GRN, { alpha: a3 }); txt(g, 'n (normal)', 320, y + 50, 15, '#b8f0c8', { alpha: a3 });
        arr(g, 370, y, lerp(380, 540, p3), y, '#fff3e6', 5, a3);
        const n = cs.length + 1; cell(g, 610, y, 44, '#3a2a26', { alpha: a3 * p3, glow: act(b, 3) ? p3 : 0 });
        [...cs, GRN].forEach((c, q) => chromo(g, 610 + (q - (n - 1) / 2) * 16, y, 34, c, { alpha: a3 * p3 }));
        txt(g, res, 800, y, 19, r ? '#9ad0f0' : '#ff9a8a', { alpha: a3 * p3 });
      });
    },
  };
}

/* ============ TRISOMIILE: Down, Edwards, Patau ============ */
function palm(g, x, y, a) { g.save(); g.globalAlpha = a; ell(g, x, y + 20, 48, 56, '#f3c29b', { ow: 5 }); for (let k = 0; k < 4; k++) tube(g, [[x - 33 + k * 22, y - 22], [x - 33 + k * 22, y - 78]], 18, '#f3c29b', { ow: 5 }); tube(g, [[x + 44, y + 20], [x + 74, y - 18]], 18, '#f3c29b', { ow: 5 }); tube(g, [[x - 44, y + 6], [x + 44, y + 2]], 4, '#8a4a2a', { ow: 0 }); g.restore(); }
function fist(g, x, y, a) { g.save(); g.globalAlpha = a; ell(g, x, y, 54, 46, '#f3c29b', { ow: 5 }); tube(g, [[x - 34, y - 10], [x + 30, y - 4]], 14, '#e9b087', { ow: 4 }); tube(g, [[x - 30, y + 12], [x + 34, y + 2]], 14, '#e9b087', { ow: 4 }); tube(g, [[x - 40, y - 26], [x + 14, y + 22]], 13, '#f3c29b', { ow: 4 }); g.restore(); }
function cleft(g, x, y, a) { g.save(); g.globalAlpha = a; ell(g, x, y, 50, 56, '#f3c29b', { ow: 5 }); dot(g, x - 18, y - 12, 5, OUT); dot(g, x + 18, y - 12, 5, OUT); tube(g, [[x - 22, y + 26], [x - 4, y + 22]], 5, '#b03a3a', { ow: 0 }); tube(g, [[x + 6, y + 22], [x + 22, y + 26]], 5, '#b03a3a', { ow: 0 }); tube(g, [[x, y + 22], [x - 2, y + 6]], 7, '#7a2222', { ow: 0 }); g.restore(); }
export function trisomy() {
  const K = [[21, 'Down', 'trisomia 21', palm, 'pliu palmar unic'], [18, 'Edwards', 'trisomia 18', fist, 'pumni strânși,\ndegete suprapuse'], [13, 'Patau', 'trisomia 13', cleft, 'despicătură buză /\npalat + cap mic']];
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[400, 70], [400, 330], [400, 590]],
    draw(g, t, b) {
      bg(g);
      K.forEach(([n, name, s, icon, sign], k) => {
        const y = 150 + k * 260; const a = vis(b, k, 0.3); const on = b.i === k || (b.i < 0 && Math.floor((REDUCED ? 0 : t) / 2.5) % 3 === k);
        panel(g, 380, y - 110, 590, 225, { fill: on ? 'rgba(217,101,42,.16)' : 'rgba(255,240,228,.05)' });
        txt(g, name + ' · ' + s, 560, y - 80, 20, on ? C.hi : '#ffe7d6', { alpha: a });
        // trei copii ale cromozomului; a treia apare (pulsează)
        const p3 = on ? 0.55 + 0.45 * pulse(t, 3) : 1;
        chromo(g, 440, y + 5, 70, MAT, { dup: false, alpha: a }); chromo(g, 485, y + 5, 70, PAT, { alpha: a }); chromo(g, 530, y + 5, 70, AMB, { alpha: a * p3 });
        txt(g, String(n), 485, y + 72, 18, '#ffb48a', { alpha: a });
        icon(g, 680, y + 15, a);
        txt(g, sign, 860, y + 10, 16, '#ffe7d6', { alpha: a });
        txt(g, `47,XX,+${n} / 47,XY,+${n}`, 700, y + 92, 15, '#cdb8ab', { alpha: a, w: 600 });
      });
    },
  };
}

/* ============ ANOMALIILE STRUCTURALE ============ */
export function struct() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[50, 70], [530, 70], [50, 500], [530, 500]],
    draw(g, t, b) {
      bg(g);
      const P = [[30, 50, 'Deleție', 'cri-du-chat · 5p−'], [510, 50, 'Microdeleție', 'Angelman / Prader-Willi · 15q'], [30, 480, 'Translocație reciprocă', 'Philadelphia · t(9;22)'], [510, 480, 'Translocație 13/14', 'cea mai frecventă']];
      P.forEach(([x, y, n, s], k) => { const a = vis(b, k, 0.35); panel(g, x, y, 460, 400, { fill: act(b, k) ? 'rgba(217,101,42,.15)' : 'rgba(255,240,228,.05)' }); txt(g, n, x + 230, y + 36, 20, act(b, k) ? C.hi : '#ffe7d6', { alpha: a }); txt(g, s, x + 230, y + 66, 16, '#cdb8ab', { alpha: a, w: 600 }); });
      const q = (k) => (b.i === k ? ease(clamp(b.bt / (b.bd * 0.6))) : b.i < 0 ? loopT(t, 4) : b.i > k ? 1 : 0);
      // 1. deleție: brațul scurt (p) al lui 5 pierde un segment
      { const a = vis(b, 0, 0.35), u = q(0); chromo(g, 170, 270, 200, '#7fb6e6', { alpha: a, cen: -40 }); txt(g, '5 normal', 170, 400, 15, '#cdb8ab', { alpha: a });
        chromo(g, 340, 270, 200, '#7fb6e6', { alpha: a, cen: -40 }); g.save(); g.globalAlpha = a; g.fillStyle = '#1e1310'; g.fillRect(320, 165, 40, 40 + 0 * u); g.restore();
        dot(g, lerp(340, 420, u), lerp(185, 140, u), 14, '#7fb6e6', { alpha: a * (1 - u) }); txt(g, '5p− (lipsește din p)', 360, 400, 15, '#ff9a8a', { alpha: a }); }
      // 2. microdeleție: segment mic din q, vizibil doar la rezoluție înaltă (lupă)
      { const a = vis(b, 1, 0.35); chromo(g, 740, 270, 200, '#f08ab8', { alpha: a, cen: -60 }); const blink = 0.4 + 0.6 * pulse(t, 4);
        g.save(); g.globalAlpha = a * blink; g.fillStyle = '#1e1310'; g.fillRect(722, 225, 36, 14); g.restore();
        g.save(); g.globalAlpha = a; g.strokeStyle = '#fff3e6'; g.lineWidth = 6; g.beginPath(); g.arc(860, 230, 46, 0, 7); g.stroke(); tube(g, [[893, 263], [930, 300]], 10, '#fff3e6', { ow: 3 }); g.restore();
        txt(g, 'doar la\nrezoluție înaltă', 860, 340, 15, '#ffd0e4', { alpha: a }); txt(g, '15q', 740, 400, 15, '#cdb8ab', { alpha: a }); }
      // 3. translocația reciprocă t(9;22)(q34;q11): vârful MIC al lui 9q (roșu) trece pe 22; partea MARE din 22q (verde) trece pe 9
      //    → der(9) mai lung, der(22) = cromozomul Philadelphia, vizibil mai scurt
      { const a = vis(b, 2, 0.35), u = q(2); const x9 = 170, x22 = 330, y = 720;
        const rod = (x, y0, y1, col) => tube(g, [[x, y0], [x, y1]], 22, col, { ow: 4, alpha: a, cap: 'butt' });
        rod(x9, y - 115, y + 75, '#e8505b'); dot(g, x9, y - 55, 9, '#fff3e6', { alpha: a });
        rod(x22, y - 35, y + 5, '#9dff8a'); dot(g, x22, y - 15, 8, '#fff3e6', { alpha: a });
        // piesele care se schimbă (se mută între capete)
        const t9 = [lerp(x9, x22, u), lerp(y + 75, y + 5, u)]; rod(t9[0], t9[1], t9[1] + 20, '#e8505b');
        const t22 = [lerp(x22, x9, u), lerp(y + 5, y + 75, u)]; rod(t22[0], t22[1], t22[1] + 80, '#9dff8a');
        txt(g, u > 0.9 ? 'der(9) · mai lung' : '9', x9, 880, 16, '#ffb48a', { alpha: a }); txt(g, u > 0.9 ? 'der(22) = Ph · scurt' : '22', x22 + 20, 880, 16, '#ffb48a', { alpha: a }); }
      // 4. translocația robertsoniană 13/14: brațele scurte se pierd, brațele lungi se unesc la centromer → UN cromozom; 45 de cromozomi
      { const a = vis(b, 3, 0.35), u = q(3); const L = 150;
        const c13 = [lerp(650, 730, u), lerp(630, 720, u)], c14 = [lerp(810, 730, u), lerp(630, 720, u)];
        const an13 = lerp(Math.PI / 2, -Math.PI / 2, u);
        tube(g, [c13, [c13[0] + L * Math.cos(an13), c13[1] + L * Math.sin(an13)]], 24, '#f4c34f', { ow: 5, alpha: a });
        tube(g, [c14, [c14[0], c14[1] + L]], 24, '#9ad0f0', { ow: 5, alpha: a });
        dot(g, c13[0], c13[1] - 14, 8, '#f4c34f', { alpha: a * (1 - u) }); dot(g, c14[0], c14[1] - 14, 8, '#9ad0f0', { alpha: a * (1 - u) });
        dot(g, c14[0], c14[1], 9, '#fff3e6', { alpha: a });
        txt(g, '13q', c13[0] - 40, c13[1] - 60, 15, '#ffe9a8', { alpha: a }); txt(g, '14q', c14[0] + 40, c14[1] + 70, 15, '#cde4ff', { alpha: a });
        txt(g, '45 cromozomi\npurtător echilibrat', 870, 640, 14, '#cdb8ab', { alpha: a * u }); }
    },
  };
}

/* ============ ANGELMAN vs. PRADER-WILLI ============ */
export function imprint() {
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[344, 124], [664, 124], [400, 700]],
    draw(g, t, b) {
      bg(g);
      txt(g, 'perechea 15: de la mamă și de la tată', 640, 60, 18, '#ffe7d6');
      const COLS = [[470, 'Angelman', 'lipsește copia MATERNĂ', 0], [790, 'Prader-Willi', 'lipsește copia PATERNĂ', 1]];
      COLS.forEach(([x, n, s, k]) => {
        const a = b.i < 0 || b.i === k || b.i === 2 ? 1 : 0.3; const on = b.i === k || (b.i < 0 && Math.floor((REDUCED ? 0 : t) / 3) % 2 === k);
        panel(g, x - 150, 100, 300, 520, { fill: on ? 'rgba(217,101,42,.16)' : 'rgba(255,240,228,.05)' });
        txt(g, n, x, 135, 21, on ? C.hi : '#ffe7d6', { alpha: a });
        // cromozomul matern și cel patern; regiunea 15q11–q13
        [[x - 50, MAT, 'mamă'], [x + 50, PAT, 'tată']].forEach(([cx, col, who], j) => {
          chromo(g, cx, 360, 280, col, { alpha: a, cen: -90 });
          const missing = (k === 0 && j === 0) || (k === 1 && j === 1);
          const blink = missing && on ? 0.35 + 0.65 * pulse(t, 4) : 1;
          g.save(); g.globalAlpha = a * blink; g.fillStyle = missing ? '#1e1310' : C.hi; g.fillRect(cx - 16, 300, 32, 34); g.restore();
          txt(g, who, cx, 530, 15, '#cdb8ab', { alpha: a });
        });
        txt(g, s, x, 580, 16, k ? '#cde4ff' : '#ffc0b8', { alpha: a });
      });
      const a2 = b.i < 0 || b.i === 2 ? 1 : 0.35;
      pill(g, 640, 700, 520, 70, '#ffe9a8', 'aceeași regiune: 15q11–q13 (brațul lung)', { alpha: a2, size: 18, glow: act(b, 2) ? 1 : 0 });
      txt(g, 'galben = regiunea 15q11–q13 · negru = microdeleția', 640, 790, 15, '#cdb8ab', { w: 600 });
      txt(g, 'P = patern → Prader-Willi', 640, 840, 18, '#cde4ff', { alpha: a2 });
    },
  };
}

/* ============ CROMOZOMII SEXUALI: tabelul din LP ============ */
function xy(g, x, y, s, a) { // literele ca mini-cromozomi
  const L = s.split(''); L.forEach((c, k) => { const cx = x + (k - (L.length - 1) / 2) * 34; if (c === 'X') { g.save(); g.globalAlpha = a; tube(g, [[cx - 12, y - 24], [cx + 12, y + 24]], 9, '#f08ab8', { ow: 4 }); tube(g, [[cx + 12, y - 24], [cx - 12, y + 24]], 9, '#f08ab8', { ow: 4 }); g.restore(); } else if (c === 'Y') { g.save(); g.globalAlpha = a; tube(g, [[cx - 12, y - 22], [cx, y]], 9, '#7fb6e6', { ow: 4 }); tube(g, [[cx + 12, y - 22], [cx, y]], 9, '#7fb6e6', { ow: 4 }); tube(g, [[cx, y], [cx, y + 24]], 9, '#7fb6e6', { ow: 4 }); g.restore(); } else txt(g, 'O', cx, y, 30, '#a8968c', { alpha: a }); });
}
export function sexchr() {
  const COL = [['XX', 'femeie', 2, 'normal', 'normal', -1], ['XY', 'bărbat', 2, 'normal', 'normal', -1], ['XO', 'Turner', 1, 'normal', 'scăzută', 0], ['XXY', 'Klinefelter', 3, 'întârziată', 'normal', 1], ['XXX', 'triplo X', 3, 'întârziată', 'normal', 2], ['XYY', 'XYY', 3, 'întârziată', 'normal', 3]];
  const X = (c) => 340 + c * 112;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[X(2), 60], [X(3), 60], [X(4), 60], [X(5), 60]],
    draw(g, t, b) {
      bg(g);
      const hi = b.i < 0 ? 2 + Math.floor((REDUCED ? 0 : t) / 2.2) % 4 : b.i + 2;
      [['nr. cromozomi sexuali', 330], ['abilitatea verbală', 410], ['abilitatea spațială', 490]].forEach(([s, y]) => txt(g, s, 270, y, 16, '#ffe7d6', { align: 'right' }));
      COL.forEach(([k, n, nr, ve, sp], c) => {
        const x = X(c); const on = c === hi; const a = on || c < 2 ? 1 : 0.55;
        panel(g, x - 52, 90, 104, 440, { fill: on ? 'rgba(217,101,42,.22)' : 'rgba(255,240,228,.05)', stroke: on ? 'rgba(255,227,110,.8)' : undefined });
        xy(g, x, 160, k, a); txt(g, n, x, 225, 14, hasY(k) ? '#cde4ff' : '#ffd0e4', { alpha: a });
        txt(g, String(nr), x, 330, 20, '#ffe7d6', { alpha: a });
        txt(g, ve, x, 410, 14, ve === 'normal' ? '#b8f0c8' : '#ff9a8a', { alpha: a, w: 700 });
        txt(g, sp, x, 490, 14, sp === 'normal' ? '#b8f0c8' : '#ff9a8a', { alpha: a, w: 700 });
      });
      // regula: cu Y → bărbat, fără Y → femeie
      const u = loopT(t, 4);
      pill(g, 640, 600, 600, 60, '#e3d6ff', 'cu Y (SRY) → bărbat · fără Y → femeie', { size: 18 });
      dot(g, lerp(360, 920, u), 632, 8, C.hi, { ow: 3 });
      txt(g, '(regula: manual)', 640, 645, 14, '#a8968c', { w: 600 });
    },
  };
}
const hasY = (k) => k.includes('Y');

/* ============ DIAGNOSTICUL PRENATAL: harta + ecografia ============ */
export function prenatal() {
  const X = (w) => 120 + (w - 8) * 25; // săpt. 8 → 120 ; 40 → 920
  const BARS = [['Ecografia', 8, 40, OK, 'de rutină, toată sarcina', 0], ['Sânge matern (LP nu dă interval)', 8, 40, OK, 'AFP, hCG, inhibină A, infecții', 2], ['CVS', 10, 13, RED, '(manual)', 3], ['Amniocenteza', 14, 18, RED, '14–18 (LP)', 3], ['Cordocenteza', 18, 40, RED, 'sânge fetal din cordon (manual)', 3]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[330, 500], [620, 480], [70, 200], [70, 300], [960, 380]],
    draw(g, t, b) {
      bg(g);
      for (let w = 8; w <= 40; w += 4) { txt(g, String(w), X(w), 100, 15, '#cdb8ab', { w: 700 }); tube(g, [[X(w), 116], [X(w), 410]], 2, '#4a3a34', { ow: 0 }); }
      txt(g, 'săptămâni de sarcină', 760, 70, 15, '#cdb8ab', { w: 600 });
      BARS.forEach(([n, w0, w1, col, s, k], i) => {
        const y = 145 + i * 56; const a = b.i < 0 || b.i === k || (k === 0 && b.i === 1) ? 1 : 0.3;
        const p = b.i === k ? ease(clamp(b.bt / (b.bd * 0.6))) : 1;
        tube(g, [[X(w0), y], [lerp(X(w0), X(w1), p), y]], 26, col, { ow: 4, alpha: a, cap: 'butt' });
        txt(g, n, X(w0) + 8, y, 15, OUT, { stroke: false, align: 'left', alpha: a }); txt(g, s, Math.min(X(w1) + 10, 760), y + 26, 13, '#cdb8ab', { align: 'left', alpha: a, w: 600 });
      });
      const ag = b.i < 0 || b.i === 4 ? 1 : 0.3;
      pill(g, 860, 435, 200, 44, '#e3d6ff', 'teste genetice', { alpha: ag, size: 16, glow: act(b, 4) ? 1 : 0 });
      arr(g, X(16), 350, 780, 428, '#fff3e6', 4, ag);
      // jos: secțiune sagitală, anterior = stânga; cele 3 căi ale ecografiei
      const ae = b.i < 0 || b.i <= 1 ? 1 : 0.35;
      tube(g, [[230, 470], [230, 900]], 16, '#f3c29b', { ow: 5, alpha: ae }); txt(g, 'perete\nabdominal', 170, 520, 13, '#ffd6c4', { alpha: ae });
      ell(g, 330, 790, 70, 52, '#f6dc8a', { ow: 5, alpha: ae }); txt(g, 'vezica plină', 330, 790, 14, OUT, { stroke: false, alpha: ae });
      ell(g, 470, 640, 120, 100, '#f3c29b', { ow: 6, alpha: ae }); ell(g, 470, 630, 60, 50, '#2a1c18', { ow: 4, alpha: ae }); ell(g, 470, 635, 16, 22, '#ff9a4a', { ow: 3, alpha: ae });
      txt(g, 'sac gestațional', 470, 560, 13, '#ffe7d6', { alpha: ae });
      tube(g, [[460, 740], [440, 820], [420, 900]], 24, '#e9a0a0', { ow: 5, alpha: ae }); txt(g, 'vagin', 500, 880, 14, '#ffd6c4', { alpha: ae });
      const which = b.i === 0 ? Math.min(2, Math.floor(b.bt / (b.bd / 3))) : b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 2) % 3 : 1;
      const PR = [[205, 600, 0, 'transabdominal'], [205, 770, 0, 'transvezical'], [425, 860, -1.4, 'endovaginal']];
      PR.forEach(([x, y, r, s], k) => {
        const on = k === which; const a = ae * (on ? 1 : 0.35);
        g.save(); g.globalAlpha = a; g.translate(x, y); g.rotate(r); tube(g, [[-40, 0], [-6, 0]], 22, '#cde4ff', { ow: 4 }); g.restore();
        if (on) { for (let q = 0; q < 3; q++) { const rr = ((REDUCED ? 0 : t) * 120 + q * 60) % 180 + 20; g.save(); g.globalAlpha = a * (1 - rr / 200); g.strokeStyle = '#9ad0f0'; g.lineWidth = 4; g.beginPath(); const ang = k === 2 ? -Math.PI / 2 + 0.1 : 0; g.arc(x, y, rr, ang - 0.4, ang + 0.4); g.stroke(); g.restore(); } }
        txt(g, s, k === 2 ? 600 : 90, k === 2 ? 760 : y, 15, on ? C.hi : '#cde4ff', { alpha: ae });
      });
      // scopurile (punctul 1)
      const a1 = b.i === 1 ? 1 : b.i < 0 ? 0.8 : 0.25;
      ['confirmi sarcina / extrauterină', 'vârsta gestațională, nr. embrioni', 'creșterea, oprirea în evoluție', 'tulburările de dezvoltare', 'ghid pentru biopsie / amniocenteză'].forEach((s, k) => { pill(g, 800, 520 + k * 72, 330, 58, '#c8f0d8', s, { alpha: a1, size: 15, glow: b.i === 1 && Math.floor(b.bt / (b.bd / 5)) === k ? 1 : 0 }); });
      txt(g, 'secțiune sagitală, anterior = stânga', 330, 925, 13, '#a8968c', { w: 600 });
    },
  };
}

/* ============ TESTELE DE SÂNGE ============ */
// mecanismul AFP: ficatul fetal → (tub neural deschis) → lichid amniotic → sângele mamei
export function blood() {
  const LEAK = curve([[330, 470], [300, 420], [380, 330], [520, 300], [640, 260], [760, 220]]);
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[600, 290], [600, 460], [600, 620], [62, 668]],
    draw(g, t, b) {
      bg(g);
      const a0 = vis(b, 0, 0.3);
      // uter + lichid amniotic + făt cu tub neural deschis
      ell(g, 330, 420, 230, 190, '#f3c29b', { ow: 7 }); ell(g, 330, 420, 195, 160, '#bfe0f0', { ow: 4 }); txt(g, 'lichid amniotic', 330, 285, 15, '#2a4a5a', { stroke: false });
      ell(g, 330, 440, 70, 95, '#ffb07a', { ow: 5 }); ell(g, 330, 345, 46, 42, '#ffb07a', { ow: 5 });
      ell(g, 300, 450, 20, 14, '#a8522a', { ow: 3 }); txt(g, 'ficatul\nfetal', 250, 520, 13, '#5a2a10', { stroke: false });
      // defectul de tub neural (deschis, pe spate)
      g.save(); g.globalAlpha = a0; tube(g, [[392, 400], [398, 470]], 10, '#e0443e', { ow: 3 }); g.restore(); txt(g, 'tub neural\ndeschis', 460, 480, 13, '#ff9a8a', { alpha: a0 });
      // vasul matern + eprubeta
      tube(g, [[620, 160], [960, 160]], 30, '#c9473f', { ow: 5 }); txt(g, 'sângele mamei', 790, 115, 16, '#ffc0b8');
      if (b.i < 0 || b.i === 0) flow(g, LEAK, t, '#ffe36e', 7, 0.18, 8, { alpha: a0 });
      // markerii
      const M = [['AFP ↑', '→ defect de tub neural', 230, '#ffe9a8', 0], ['hCG ↑ + inhibină A ↑', '→ sindrom Down', 400, '#e3d6ff', 1], ['diabet gestațional · grup + anticorpi', 'infecții: sifilis, rubeolă, VHB, VHC, HIV', 560, '#c8f0d8', 2]];
      M.forEach(([a, s, y, col, k]) => { const al = vis(b, k, 0.3); pill(g, 790, y + 60, 340, 100, col, '', { alpha: al, glow: act(b, k) ? 1 : 0, ow: 4 }); txt(g, a, 790, y + 40, 17, OUT, { stroke: false, alpha: al }); txt(g, s, 790, y + 80, 14, '#3b2a24', { stroke: false, alpha: al, w: 600 }); });
      txt(g, '(AFP ↓ sugerează Down: manual)', 790, 345, 13, '#a8968c', { alpha: a0, w: 600 });
      // sângele fetal prin cordocenteză
      const a3 = vis(b, 3, 0.3);
      panel(g, 40, 650, 520, 240, { fill: act(b, 3) ? 'rgba(217,101,42,.16)' : 'rgba(255,240,228,.05)' });
      txt(g, 'SÂNGE FETAL (prin cordocenteză)', 300, 685, 17, '#ffe7d6', { alpha: a3 });
      const CORD = curve([[90, 790], [180, 750], [270, 800], [360, 760], [450, 800], [520, 770]]);
      tube(g, CORD, 30, '#d9c6ff', { raw: true, ow: 5, alpha: a3 }); flow(g, CORD, t, '#c9473f', 6, 0.2, 7, { alpha: a3 });
      txt(g, 'izoimunizarea Rh · analiza cromozomală', 300, 860, 15, '#ffd0e4', { alpha: a3 });
      txt(g, 'ser matern = screening → anormal? se confirmă invaziv', 790, 900, 14, '#cdb8ab', { w: 600 });
    },
  };
}

/* ============ METODELE INVAZIVE ============ */
export function invasive() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[410, 60], [560, 50], [880, 760], [860, 100]],
    draw(g, t, b) {
      bg(g);
      // uter (secțiune), placenta pe peretele posterior (dreapta), cordon, făt
      ell(g, 600, 470, 300, 270, '#f3c29b', { ow: 7 }); ell(g, 600, 470, 262, 232, '#bfe0f0', { ow: 4 });
      g.save(); g.fillStyle = '#b8405a'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.ellipse(600, 470, 262, 232, 0, -0.9, 0.9); g.lineTo(600 + 200, 470); g.closePath(); g.fill(); g.stroke(); g.restore();
      txt(g, 'placenta\n(vilozități coriale)', 880, 220, 14, '#ffc0d0');
      const CORD = curve([[790, 470], [720, 430], [660, 500], [600, 480]]);
      tube(g, CORD, 16, '#d9c6ff', { raw: true, ow: 4 });
      ell(g, 540, 500, 80, 110, '#ffb07a', { ow: 5 }); ell(g, 540, 380, 56, 52, '#ffb07a', { ow: 5 });
      txt(g, 'lichid amniotic', 470, 300, 14, '#2a4a5a', { stroke: false });
      // col + vagin (jos)
      tube(g, [[600, 735], [600, 900]], 30, '#e9a0a0', { ow: 5 }); txt(g, 'col → vagin', 680, 880, 14, '#ffd6c4');
      // sonda eco pe abdomen (sus-stânga) — ghidează toate
      tube(g, [[330, 150], [370, 200]], 26, '#cde4ff', { ow: 4 }); txt(g, 'sonda eco', 270, 130, 14, '#cde4ff');
      const p = (k) => (b.i === k ? ease(clamp(b.bt / (b.bd * 0.6))) : b.i < 0 ? 1 : 0);
      // 1+2. amniocenteza: acul transabdominal în lichid; seringa se umple 20–30 mL
      const am = Math.max(p(0), p(1)); const aA = b.i < 0 || b.i <= 1 ? 1 : 0.25;
      const nx = lerp(475, 450, am), ny = lerp(150, 300, am);
      g.save(); g.globalAlpha = aA; tube(g, [[480, 120], [nx, ny]], 5, '#e6e6e6', { ow: 3 }); g.fillStyle = '#e9f4fb'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(445, 50, 70, 70, 10); g.fill(); g.stroke();
      const fill = b.i === 1 ? p(1) : b.i < 0 ? 1 : 0; g.fillStyle = '#f2e6a0'; g.fillRect(451, 114 - 58 * fill, 58, 58 * fill); g.restore();
      txt(g, fill > 0.1 ? 'amniocenteză · 20–30 mL' : 'amniocenteză', 530, 85, 15, '#ffe9a8', { alpha: aA, align: 'left' });
      // 3. CVS transcervical: cateterul urcă prin col spre placentă; 10–30 mg
      const cv = p(2); const aC = b.i < 0 || b.i === 2 ? 1 : 0.25;
      const CV = curve([[600, 920], [600, 750], [680, 728], [770, 660], [830, 580]]); // prin col, pe lângă peretele uterin, în afara sacului amniotic, spre placentă
      tube(g, CV, 6, '#e6e6e6', { raw: true, ow: 3, u1: Math.max(0.05, cv), alpha: aC });
      txt(g, 'CVS · 10–30 mg', 790, 700, 16, '#ffc0d0', { alpha: aC });
      // 4. cordocenteza: ac transcutanat în cordon; sânge fetal
      const co = p(3); const aK = b.i < 0 || b.i === 3 ? 1 : 0.25;
      const [cx, cy] = at(CORD, 0.45);
      tube(g, [[cx - 80, 120], [lerp(cx - 80, cx, co), lerp(120, cy, co)]], 5, '#e6e6e6', { ow: 3, alpha: aK });
      if (co > 0.95) flow(g, [[cx, cy], [cx - 80, 120]], t, '#c9473f', 4, 0.4, 6, { alpha: aK });
      txt(g, 'cordocenteză', cx - 50, 100, 15, '#d9c6ff', { alpha: aK, align: 'left' });
    },
  };
}

/* ============ CAZUL: sindromul Down ============ */
export function caseDown() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[380, 90], [740, 90], [80, 400], [580, 640]],
    draw(g, t, b) {
      bg(g);
      // copilul: limba scoasă, hipoton (stă moale)
      const a0 = vis(b, 0, 0.4);
      ell(g, 480, 200, 96, 100, '#f3c29b', { ow: 6, alpha: a0 });
      g.save(); g.globalAlpha = a0; tube(g, [[435, 180], [460, 188]], 5, OUT, { ow: 0 }); tube(g, [[500, 188], [525, 180]], 5, OUT, { ow: 0 }); g.restore();
      const tg = REDUCED ? 1 : 0.8 + 0.2 * Math.sin(t * 2); ell(g, 480, 262, 22 * tg, 16 * tg, '#e86a7a', { ow: 4, alpha: a0 });
      txt(g, 'limba mereu scoasă · apatic · ochi „anormali”', 480, 340, 16, '#ffe7d6', { alpha: a0 });
      const a1 = vis(b, 1, 0.3);
      pill(g, 860, 200, 220, 170, '#e3d6ff', '', { alpha: a1, glow: act(b, 1) ? 1 : 0, ow: 4 });
      txt(g, 'Sindromul Down\n(trisomia 21)\n\nepicant · retard\nhipotonie\npliu palmar unic', 860, 200, 15, OUT, { stroke: false, alpha: a1 });
      // baza embriologică: ovocit I (mama 40 de ani) → nondisjuncție MI → ovocit II cu două 21 + spermatozoid cu un 21 → 47
      const a2 = vis(b, 2, 0.3), a3 = vis(b, 3, 0.3);
      const p2 = b.i === 2 ? ease(clamp(b.bt / (b.bd * 0.6))) : 1; const p3 = b.i === 3 ? ease(clamp(b.bt / (b.bd * 0.6))) : 1;
      cell(g, 160, 480, 70, '#f08ab8', { alpha: a2 }); chromo(g, 145, 480, 60, MAT, { dup: true, alpha: a2 }); chromo(g, 178, 480, 60, PAT, { dup: true, alpha: a2 });
      txt(g, 'ovocit I\n(mamă de 40 de ani)', 160, 575, 14, '#ffe7d6', { alpha: a2 });
      arr(g, 240, 480, lerp(250, 340, p2), 480, '#fff3e6', 5, a2); txt(g, 'nondisjuncție\nîn meioza I', 300, 420, 14, '#ff9a8a', { alpha: a2 });
      cell(g, 420, 480, 64, '#f08ab8', { alpha: a2 * p2, glow: act(b, 2) ? p2 : 0 }); chromo(g, 405, 480, 54, MAT, { dup: true, alpha: a2 * p2 }); chromo(g, 438, 480, 54, PAT, { dup: true, alpha: a2 * p2 });
      txt(g, 'ovocit II: două 21', 420, 570, 14, '#ffe7d6', { alpha: a2 * p2 }); cell(g, 470, 415, 16, '#f08ab8', { alpha: a2 * p2, ow: 4 }); txt(g, 'GP1 (fără 21)', 470, 385, 13, '#ffd0e4', { alpha: a2 * p2 });
      // spermatozoidul
      const sx = lerp(700, 500, p3);
      g.save(); g.globalAlpha = a3; tube(g, [[sx + 20, 480], [sx + 60, 470 + (REDUCED ? 0 : Math.sin(t * 9) * 8)], [sx + 100, 480]], 4, '#cde4ff', { ow: 2 }); ell(g, sx, 480, 20, 14, '#7fb6e6', { ow: 4 }); g.restore();
      chromo(g, sx, 480, 18, GRN, { alpha: a3 }); txt(g, 'spermatozoid: un 21', 720, 440, 14, '#b8f0c8', { alpha: a3 });
      // zigotul 47,XX,+21
      cell(g, 690, 720, 80, '#3a2a26', { alpha: a3 * p3, glow: act(b, 3) ? p3 : 0 });
      chromo(g, 655, 720, 54, MAT, { alpha: a3 * p3 }); chromo(g, 690, 720, 54, PAT, { alpha: a3 * p3 }); chromo(g, 725, 720, 54, GRN, { alpha: a3 * p3 });
      txt(g, '47,XX,+21', 690, 830, 20, '#ffb48a', { alpha: a3 * p3 });
      txt(g, 'roșu + albastru = cei doi 21 ai mamei · verde = 21 al tatălui', 600, 900, 14, '#cdb8ab', { w: 600 });
    },
  };
}

/* ============ CAPCANELE ============ */
export function traps() {
  const T = [['MI vs. MII', 'MI strică 4/4 gameți\nMII doar 2/4'], ['Ovocitul blocat', 'fetal → profaza I\novulat → metafaza II'], ['Angelman vs. PW', 'PW = patern lipsă\nAngelman = matern'], ['DiGeorge · cri-du-chat', '22q11.2 (nu „2”)\n5p− = deleție'], ['Translocațiile', '13/14 = cea mai frecventă\nPh = 9;22'], ['Serul matern', 'AFP ↑ → DTN\nhCG + inhibină ↑ → Down']];
  return {
    home: HOME, cams: T.map(() => HOME),
    anchors: T.map((_, k) => [(k % 2) * 480 + 62, 82 + Math.floor(k / 2) * 290]),
    draw(g, t, b) {
      bg(g);
      T.forEach(([n, s], k) => {
        const x = 260 + (k % 2) * 480, y = 180 + Math.floor(k / 2) * 290; const on = b.i === k || (b.i < 0 && Math.floor((REDUCED ? 0 : t) / 2) % 6 === k);
        const sc = on ? 1 + 0.03 * pulse(t, 4) : 1;
        card(g, x, y, 420 * sc, 220 * sc, n, s, on ? '#ffe9a8' : '#e9d6bd', { glow: on ? 1 : 0, ts: 22, ss: 18, alpha: b.i < 0 || on ? 1 : 0.55 });
      });
    },
  };
}

/* ============ RECAPITULAREA: rândul tabelului → partea LP-ului ============ */
export function recap() {
  const PARTS = [['A', 'Generalități'], ['B', 'CGP + teratom'], ['C', 'Cromozomii'], ['D', 'Gameți + gemeni'], ['E', 'Diagnostic prenatal'], ['F', 'Cazul Down']];
  const MAP = [0, 0, 0, 0, 1, 2, 2, 2, 3, 4, 2];
  return {
    home: HOME, cams: MAP.map(() => HOME), anchors: [],
    draw(g, t, b) {
      bg(g);
      const hi = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 1.8) % 6 : MAP[b.i];
      PARTS.forEach(([L, n], k) => {
        const x = 180 + (k % 3) * 320, y = 280 + Math.floor(k / 3) * 380; const on = k === hi;
        ell(g, x, y, 110, 110, on ? '#ffb48a' : '#3a2a26', { ow: 6, glow: 0 });
        if (on) { g.save(); g.globalAlpha = 0.6 * pulse(t); g.strokeStyle = C.hi; g.lineWidth = 7; g.beginPath(); g.arc(x, y, 124, 0, 7); g.stroke(); g.restore(); }
        txt(g, L, x, y, 70, on ? OUT : '#ffe7d6', { stroke: !on });
        txt(g, n, x, y + 160, 19, on ? C.hi : '#ffe7d6');
      });
    },
  };
}
