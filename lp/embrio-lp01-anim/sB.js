// Partea B + D: CGP (migrarea), spermatogeneza vs. ovogeneza, ovogeneza în timp, ciclul + fecundația, teratomul, gameții anormali, gemenii.
import { HOME, C, bg, panel, txt, pill, tube, flow, dot, ell, arr, at, curve, loopT, OUT, clamp, lerp, ease, REDUCED } from './ek.js';
import { chromo, cell, card, vis, act, pulse, MAT, PAT, GRN, RED, AMB } from './k1.js';

const pr = (b, k, f = 0.65) => (b.i < 0 ? 1 : b.i > k ? 1 : b.i < k ? 0 : ease(clamp(b.bt / (b.bd * f))));

/* ============ CGP: sac vitelin → intestin posterior → mezenter dorsal → creste genitale ============ */
// secțiune transversală schematică ~S5: dorsal = sus (tub neural), ventral = jos (sacul vitelin)
export function cgp() {
  const PATH = curve([[500, 760], [500, 640], [500, 560], [500, 470], [500, 400]]);
  const L = curve([[500, 400], [455, 372], [415, 352]]); const R = curve([[500, 400], [545, 372], [585, 352]]);
  const STRAY = curve([[500, 560], [430, 600], [340, 640]]);
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[400, 700], [560, 470], [700, 400], [230, 610]],
    draw(g, t, b) {
      bg(g);
      // peretele posterior al corpului + structuri dorsale
      ell(g, 500, 135, 48, 48, '#9ad0f0', { ow: 6 }); ell(g, 500, 135, 14, 18, '#2a1c18', { ow: 3 }); txt(g, 'tub neural', 610, 120, 17, '#cde4ff', { align: 'left' });
      ell(g, 500, 285, 34, 34, C.aorta, { ow: 6 }); txt(g, 'aorta', 560, 270, 17, '#ffc0b8', { align: 'left' });
      ell(g, 330, 315, 62, 52, C.imm, { ow: 6 }); ell(g, 670, 315, 62, 52, C.imm, { ow: 6 });
      txt(g, 'mezonefros', 250, 230, 16, '#ffd6c4'); txt(g, 'mezonefros', 750, 230, 16, '#ffd6c4');
      const a2 = vis(b, 2, 0.6);
      ell(g, 410, 352, 30, 22, C.gonad, { ow: 5, alpha: a2 }); ell(g, 590, 352, 30, 22, C.gonad, { ow: 5, alpha: a2 });
      txt(g, 'creasta\ngenitală', 390, 420, 16, '#e3d6ff', { alpha: a2 }); txt(g, 'creasta\ngenitală', 610, 420, 16, '#e3d6ff', { alpha: a2 });
      // mezenterul dorsal + intestinul posterior
      tube(g, [[500, 320], [500, 520]], 26, '#e9d6bd', { ow: 5 }); txt(g, 'mezenter dorsal', 380, 470, 16, '#f3e6d6', { align: 'right' });
      ell(g, 500, 560, 64, 46, C.sinus, { ow: 6 }); ell(g, 500, 560, 22, 14, '#5a3c1a', { ow: 3 }); txt(g, 'intestinul posterior', 590, 590, 16, '#ffe9a8', { align: 'left' });
      tube(g, [[500, 606], [500, 700]], 22, C.sinus, { ow: 5 });
      ell(g, 500, 790, 120, 90, '#f6dc8a', { ow: 6, glow: 0 }); txt(g, 'sacul vitelin', 500, 900, 18, '#ffe9a8');
      txt(g, '(schematic, nu în secțiune)', 760, 880, 14, '#a8968c', { w: 600 });
      if (act(b, 0) || b.i < 0) { g.save(); g.globalAlpha = 0.6 * pulse(t); g.strokeStyle = C.hi; g.lineWidth = 6; g.beginPath(); g.ellipse(500, 790, 128, 98, 0, 0, 7); g.stroke(); g.restore(); }
      // CGP în peretele sacului vitelin
      const wall = [[430, 735], [470, 712], [530, 712], [570, 735], [600, 770]];
      const u = b.i < 0 ? loopT(t, 6) : b.i === 1 ? pr(b, 1, 0.8) * 0.75 : b.i >= 2 ? 0.75 + 0.25 * pr(b, 2, 0.6) : 0;
      wall.forEach(([x, y], k) => {
        const off = k * 0.06; let px, py;
        const uu = clamp(u - off);
        if (b.i === 0) { px = x; py = y + Math.sin(t * 2 + k) * 2; }
        else if (uu < 0.75) { const [ax, ay] = at(PATH, uu / 0.75); px = lerp(x, ax, clamp(uu * 6)); py = lerp(y, ay, clamp(uu * 6)); }
        else { const [ax, ay] = at(k % 2 ? R : L, (uu - 0.75) / 0.25); px = ax; py = ay; }
        dot(g, px, py, 11, GRN, { ow: 3 });
      });
      // CGP rătăcită
      const a3 = b.i === 3 ? 1 : b.i < 0 ? 0.8 : 0;
      if (a3) { const [sx, sy] = at(STRAY, b.i === 3 ? pr(b, 3, 0.7) : loopT(t, 5)); dot(g, sx, sy, 12, GRN, { ow: 3, alpha: a3 }); txt(g, 'rătăcită → teratom', 300, 690, 17, '#b8f0c8', { alpha: a3 }); }
      // etichete de timp
      [['S3–S4', 640, 730, 0], ['S4–S5', 380, 520, 1], ['S5–S6', 600, 470, 2]].forEach(([s, x, y, k]) => pill(g, x, y, 96, 36, act(b, k) ? C.hi : '#3a2a26', '', { ow: 3, alpha: vis(b, k, 0.35) }));
      [['S3–S4', 640, 730, 0], ['S4–S5', 380, 520, 1], ['S5–S6', 600, 470, 2]].forEach(([s, x, y, k]) => txt(g, s, x, y, 16, act(b, k) ? OUT : '#ffe7d6', { stroke: false, alpha: vis(b, k, 0.35) }));
      txt(g, 'verde = CGP', 120, 880, 16, '#b8f0c8');
    },
  };
}

/* ============ SPERMATOGENEZA vs. OVOGENEZA ============ */
export function gameto() {
  const Y = [175, 335, 505, 680, 850];
  const LX = 260, RX = 740;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[24, Y[1] - 50], [24, Y[2] - 50], [24, Y[3] - 50], [24, Y[4] - 50]],
    draw(g, t, b) {
      bg(g);
      txt(g, 'SPERMATOGENEZA · testicul', LX, 100, 20, '#cde4ff'); txt(g, 'OVOGENEZA · ovar', RX, 100, 20, '#ffd0e4');
      tube(g, [[500, 130], [500, 900]], 4, '#5a4842', { ow: 0 });
      const r = (k) => (b.i < 0 ? 1 : k <= b.i ? (k === b.i ? pr(b, k) : 1) : 0);
      // rândul 0: gonia (2n), prin mitoze
      cell(g, LX, Y[0], 40, '#7fb6e6'); chromo(g, LX - 9, Y[0], 30, MAT); chromo(g, LX + 9, Y[0], 30, PAT); txt(g, 'spermatogonie · 2n', LX + 160, Y[0], 16, '#ffe7d6');
      cell(g, RX, Y[0], 40, '#f08ab8'); chromo(g, RX - 9, Y[0], 30, MAT); chromo(g, RX + 9, Y[0], 30, PAT); txt(g, 'ovogonie · 2n', RX + 140, Y[0], 16, '#ffe7d6');
      // rândul 1: gametocit I (2n, ADN dublat) — crește
      const a1 = r(0); const s1 = lerp(40, 54, a1);
      arr(g, LX, Y[0] + 44, LX, Y[1] - s1 - 6, '#fff3e6', 5, a1); arr(g, RX, Y[0] + 44, RX, Y[1] - 70, '#fff3e6', 5, a1);
      cell(g, LX, Y[1], s1, '#7fb6e6', { alpha: a1, glow: act(b, 0) ? 0.8 : 0 }); chromo(g, LX - 13, Y[1], 40, MAT, { dup: true, alpha: a1 }); chromo(g, LX + 13, Y[1], 40, PAT, { dup: true, alpha: a1 });
      cell(g, RX, Y[1], lerp(40, 70, a1), '#f08ab8', { alpha: a1, glow: act(b, 0) ? 0.8 : 0 }); chromo(g, RX - 13, Y[1], 40, MAT, { dup: true, alpha: a1 }); chromo(g, RX + 13, Y[1], 40, PAT, { dup: true, alpha: a1 });
      txt(g, 'spermatocit I\n2n · ADN dublat', LX - 150, Y[1] + 10, 15, '#ffe7d6', { alpha: a1 }); txt(g, 'ovocit I\n2n · ADN dublat', RX + 165, Y[1], 15, '#ffe7d6', { alpha: a1 });
      pill(g, 500, Y[1] + 90, 150, 40, '#ffe9a8', 'MEIOZA I', { alpha: r(1), size: 18 });
      // rândul 2: MI — 2 spermatocite II egale vs. ovocit II mare + GP1 mic
      const a2 = r(1);
      [LX - 80, LX + 80].forEach((x, j) => { arr(g, LX, Y[1] + 56, x, Y[2] - 46, '#fff3e6', 4, a2); cell(g, x, Y[2], 40, '#7fb6e6', { alpha: a2 }); chromo(g, x, Y[2], 30, j ? PAT : MAT, { dup: true, alpha: a2 }); });
      txt(g, 'spermatocite II · n', LX, Y[2] + 66, 15, '#ffe7d6', { alpha: a2 });
      arr(g, RX, Y[1] + 72, RX - 20, Y[2] - 64, '#fff3e6', 4, a2); cell(g, RX - 20, Y[2], 62, '#f08ab8', { alpha: a2, glow: act(b, 1) ? 1 : 0 }); chromo(g, RX - 20, Y[2], 30, MAT, { dup: true, alpha: a2 });
      arr(g, RX + 30, Y[1] + 66, RX + 110, Y[2] - 18, '#fff3e6', 3, a2); cell(g, RX + 110, Y[2], 18, '#f08ab8', { alpha: a2, ow: 4 }); chromo(g, RX + 110, Y[2], 14, PAT, { dup: true, alpha: a2, w: 5 });
      txt(g, 'ovocit II + GP1 · n', RX + 40, Y[2] + 86, 15, '#ffe7d6', { alpha: a2 }); txt(g, 'GP1', RX + 150, Y[2] - 20, 14, '#ffd0e4', { alpha: a2 });
      pill(g, 500, Y[2] + 92, 150, 40, '#ffe9a8', 'MEIOZA II', { alpha: r(2), size: 18 });
      // rândul 3: MII — 4 spermatide vs. ovul + GP2 (+ GP1 se poate divide)
      const a3 = r(2);
      [LX - 150, LX - 50, LX + 50, LX + 150].forEach((x, k) => { arr(g, LX + (k < 2 ? -80 : 80), Y[2] + 44, x, Y[3] - 32, '#fff3e6', 3, a3); cell(g, x, Y[3], 28, '#7fb6e6', { alpha: a3 }); chromo(g, x, Y[3], 24, k < 2 ? MAT : PAT, { alpha: a3 }); });
      txt(g, 'spermatide · n', LX, Y[3] + 50, 15, '#ffe7d6', { alpha: a3 });
      arr(g, RX - 20, Y[2] + 66, RX - 30, Y[3] - 62, '#fff3e6', 4, a3); cell(g, RX - 30, Y[3], 58, '#f08ab8', { alpha: a3, glow: act(b, 2) ? 1 : 0 }); chromo(g, RX - 30, Y[3], 26, MAT, { alpha: a3 });
      cell(g, RX + 60, Y[3] - 30, 15, '#f08ab8', { alpha: a3, ow: 4 }); chromo(g, RX + 60, Y[3] - 30, 12, MAT, { alpha: a3, w: 5 }); txt(g, 'GP2', RX + 92, Y[3] - 36, 14, '#ffd0e4', { alpha: a3 });
      [RX + 105, RX + 145].forEach((x) => { cell(g, x, Y[3] + 30, 15, '#f08ab8', { alpha: a3, ow: 4 }); chromo(g, x, Y[3] + 30, 12, PAT, { alpha: a3, w: 5 }); }); txt(g, 'GP1 → 2', RX + 160, Y[3] + 64, 14, '#ffd0e4', { alpha: a3 });
      txt(g, 'ovul + GP2 · n', RX - 30, Y[3] + 80, 15, '#ffe7d6', { alpha: a3 });
      // rândul 4: spermiogeneza → 4 spermatozoizi; 1 ovul + 3 globuli polari
      const a4 = r(3);
      [LX - 150, LX - 50, LX + 50, LX + 150].forEach((x, k) => {
        g.save(); g.globalAlpha = a4; const wig = REDUCED ? 0 : Math.sin(t * 8 + k) * 8;
        tube(g, [[x, Y[4] - 30], [x + wig, Y[4]], [x - wig, Y[4] + 34]], 4, '#cde4ff', { ow: 3 }); ell(g, x, Y[4] - 38, 11, 15, '#7fb6e6', { ow: 4 }); g.restore();
      });
      txt(g, '4 spermatozoizi · 23,X sau 23,Y', LX, Y[4] + 60, 16, '#cde4ff', { alpha: a4 });
      cell(g, RX - 30, Y[4] - 10, 52, '#f08ab8', { alpha: a4, glow: act(b, 3) ? 1 : 0 }); txt(g, '1 ovul · 23,X\n+ 3 globuli polari', RX + 130, Y[4] - 10, 16, '#ffd0e4', { alpha: a4 });
    },
  };
}

/* ============ OVOGENEZA ÎN TIMP ============ */
export function ovotime() {
  const XS = [[90, 'luna 3\nfetal'], [230, 'luna 5\n(S20)'], [380, 'naștere'], [560, 'pubertate'], [740, 'ovulație'], [900, 'fecundație']];
  const Y = 260;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[160, Y - 125], [470, Y - 125], [700, Y - 125], [950, Y - 125]],
    draw(g, t, b) {
      bg(g);
      tube(g, [[70, Y], [930, Y]], 10, '#6b5650', { ow: 4 });
      XS.forEach(([x, s]) => { dot(g, x, Y, 12, '#a08a80', { ow: 3 }); txt(g, s, x, Y + 50, 16, '#cdb8ab', { w: 700 }); });
      // banda „oprit în profaza I”
      const a = (k) => vis(b, k, 0.25);
      tube(g, [[90, Y - 70], [735, Y - 70]], 34, '#e3d6ff', { ow: 4, alpha: Math.max(a(0), a(1)) });
      txt(g, 'ovocit I OPRIT în PROFAZA I (ani, decenii)', 412, Y - 70, 17, OUT, { stroke: false, alpha: Math.max(a(0), a(1)) });
      tube(g, [[745, Y - 70], [895, Y - 70]], 34, '#ffd0e4', { ow: 4, alpha: a(2) });
      txt(g, 'oprit în\nMETAFAZA II', 820, Y - 140, 16, '#ffd0e4', { alpha: a(2) });
      // ovocitul care stă (lacăt) — marker
      const mx = b.i < 0 ? lerp(90, 900, loopT(t, 10)) : [lerp(90, 230, pr(b, 0)), lerp(380, 560, pr(b, 1)), lerp(560, 740, pr(b, 2)), lerp(740, 900, pr(b, 3))][b.i];
      dot(g, mx, Y, 18, C.hi, { ow: 4 });
      // numărul de celule: bare care scad
      const BAR = [[230, 7e6, '7 milioane', 0], [380, 1e6, '< 1 milion', 1], [560, 4e4, '~40 000', 1]];
      txt(g, 'câte ovocite rămân', 300, 400, 19, '#ffb48a', { alpha: Math.max(a(0), a(1)) });
      BAR.forEach(([x, n, s, k]) => { const h = Math.max(8, 300 * Math.sqrt(n / 7e6)) * (b.i === k ? pr(b, k) : 1); tube(g, [[x, 760], [x, 760 - h]], 56, '#f08ab8', { ow: 5, cap: 'butt', alpha: a(k) }); txt(g, s, x, 790, 17, '#ffe7d6', { alpha: a(k) }); });
      txt(g, '(înălțimea barei e comprimată)', 380, 830, 13, '#a8968c', { w: 600, alpha: a(1) });
      // ovulația: ovocit II + GP1 ; fecundația: ovul + GP2 ; nefecundat → degenerează
      cell(g, 740, 520, 54, '#f08ab8', { alpha: a(2), glow: act(b, 2) ? 1 : 0 }); cell(g, 805, 480, 14, '#f08ab8', { alpha: a(2), ow: 4 }); txt(g, 'ovocit II + GP1', 740, 610, 16, '#ffe7d6', { alpha: a(2) });
      txt(g, 'doar ~400–500\nsunt ovulate', 740, 690, 16, '#ffd0e4', { alpha: a(2) });
      const fert = b.i < 0 || b.i === 3; const deg = b.i === 3 ? Math.floor((REDUCED ? 0 : t) / 3) % 2 : 0;
      cell(g, 900, 520, 46, deg ? '#7a6a64' : '#f08ab8', { alpha: a(3), glow: act(b, 3) && !deg ? 1 : 0 }); cell(g, 950, 486, 12, '#f08ab8', { alpha: a(3), ow: 4 });
      txt(g, deg ? 'nefecundat →\ndegenerează (~24 h)' : 'ovul + GP2', 900, 610, 16, '#ffe7d6', { alpha: a(3) });
      if (fert && !deg) { const u = loopT(t, 2.5); g.save(); g.globalAlpha = a(3); tube(g, [[lerp(990, 950, u), 560], [lerp(1020, 980, u), 580]], 3, '#cde4ff', { ow: 2 }); ell(g, lerp(985, 945, u), 556, 7, 9, '#7fb6e6', { ow: 3 }); g.restore(); }
      txt(g, 'Numerele: din cursul 1 și Langman (manual)', 560, 900, 14, '#a8968c', { w: 600 });
    },
  };
}

/* ============ CICLUL (sus) + DRUMUL ZIGOTULUI (jos) ============ */
export function cycle() {
  const X = (d) => 110 + (d - 1) * 29; // ziua 1 → 110 ; 28 → 893
  const H0 = 370; // baza curbelor hormonale
  const curveOf = (f) => { const P = []; for (let d = 1; d <= 28; d += 0.5) P.push([X(d), H0 - f(d)]); return P; };
  const gauss = (d, m, s) => Math.exp(-((d - m) ** 2) / (2 * s * s));
  const LH = curveOf((d) => 10 + 150 * gauss(d, 13.5, 0.9));
  const FSH = curveOf((d) => 25 + 25 * gauss(d, 3, 2.5) + 45 * gauss(d, 13.5, 0.9));
  const E2 = curveOf((d) => 15 + 105 * gauss(d, 12.5, 2.2) + 45 * gauss(d, 21, 3));
  const P4 = curveOf((d) => 8 + 120 * gauss(d, 21, 3.2));
  const endo = (d) => (d <= 4 ? lerp(34, 10, (d - 1) / 3) : d <= 14 ? lerp(10, 50, (d - 4) / 10) : lerp(50, 70, clamp((d - 14) / 8)));
  const TUBE = curve([[150, 720], [260, 690], [380, 700], [500, 735], [600, 760], [700, 760]]);
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[X(1) + 20, 205], [X(14) - 30, 205], [X(26), 205], [700, 650]],
    draw(g, t, b) {
      bg(g);
      // fazele
      const PH = [[1, 14, 'faza foliculară (variabilă)', 0], [14, 28, 'faza luteală (~14 zile, fixă)', 2]];
      PH.forEach(([d0, d1, s, k]) => { panel(g, X(d0), 115, X(d1) - X(d0), 280, { fill: act(b, k) ? 'rgba(217,101,42,.18)' : 'rgba(255,240,228,.04)' }); txt(g, s, (X(d0) + X(d1)) / 2, 137, 16, '#ffe7d6', { w: 700 }); });
      tube(g, [[X(14), 115], [X(14), 500]], 4, C.hi, { ow: 0, alpha: act(b, 1) ? 1 : 0.5, dash: [8, 8] }); txt(g, 'ovulația · ziua 14', X(14) + 12, 98, 16, C.hi, { align: 'left' });
      // curbele: se desenează pe măsură ce trece ziua
      const dNow = b.i < 0 ? lerp(1, 28, loopT(t, 9)) : [lerp(1, 13, pr(b, 0)), lerp(13, 15, pr(b, 1)), lerp(15, 28, pr(b, 2)), 28][b.i];
      const u = clamp((dNow - 1) / 27);
      tube(g, FSH, 5, '#9ad0f0', { raw: true, u1: u, ow: 3 }); tube(g, LH, 5, '#ffe36e', { raw: true, u1: u, ow: 3 });
      tube(g, E2, 5, '#f08ab8', { raw: true, u1: u, ow: 3 }); tube(g, P4, 5, '#9dff8a', { raw: true, u1: u, ow: 3 });
      [['FSH', '#9ad0f0'], ['LH', '#ffe36e'], ['estrogen', '#f08ab8'], ['progesteron', '#9dff8a']].forEach(([s, c], k) => txt(g, s, 150 + k * 120, 170, 15, c));
      // ovarul: folicul → Graaf → corp galben → corp alb
      const Yo = 430; const fol = dNow < 14 ? lerp(10, 30, (dNow - 1) / 13) : 0;
      if (dNow < 14) { ell(g, X(dNow), Yo, fol, fol, '#ffd6c4', { ow: 4 }); dot(g, X(dNow) + fol * 0.3, Yo - fol * 0.2, 6, '#f08ab8', { ow: 2 }); }
      else if (dNow < 15.5) { ell(g, X(14), Yo, 30, 30, '#ffd6c4', { ow: 4, dash: [6, 6] }); dot(g, X(14) + 40, Yo - 30, 8, '#f08ab8', { ow: 2 }); }
      else { const cg = dNow < 25 ? 1 : 1 - (dNow - 25) / 3; ell(g, X(dNow), Yo, 26, 26, cg > 0.4 ? '#f4c34f' : '#e9e0d6', { ow: 4 }); }
      txt(g, 'ovarul', 70, Yo, 15, '#cdb8ab', { align: 'left' });
      // endometrul: grosimea
      const EY = 535; const P = []; for (let d = 1; d <= dNow; d += 0.5) P.push([X(d), EY - endo(d)]);
      if (P.length > 1) { g.save(); g.fillStyle = '#e2569f'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(X(1), EY); P.forEach(([x, y]) => g.lineTo(x, y)); g.lineTo(P[P.length - 1][0], EY); g.closePath(); g.fill(); g.stroke(); g.restore(); }
      txt(g, 'endometrul', 70, EY - 24, 15, '#cdb8ab', { align: 'left' }); if (dNow > 26.5) txt(g, 'fără sarcină → corp alb →\nprogesteronul scade → menstruația', X(23), EY - 110, 14, '#ffd0e4');
      [['menstruală 1–4', 2.5], ['proliferativă 5–14', 9.5], ['secretorie 15–28', 21.5]].forEach(([s, d]) => txt(g, s, X(d), EY + 22, 14, '#ffd0e4', { w: 700 }));
      // jos: trompa + uterul; zigotul merge de la ampulă la uter
      const a3 = b.i < 0 || b.i >= 2 ? 1 : 0.35;
      tube(g, TUBE, 30, '#f3c29b', { raw: true, ow: 5, alpha: a3 });
      ell(g, 120, 740, 46, 34, '#f6b49c', { ow: 5, alpha: a3 }); txt(g, 'ovar', 120, 800, 15, '#ffd6c4', { alpha: a3 });
      ell(g, 800, 770, 110, 90, '#f3c29b', { ow: 6, alpha: a3 }); ell(g, 800, 770, 70, 54, '#e2569f', { ow: 4, alpha: a3 }); txt(g, 'uter', 800, 880, 16, '#ffd6c4', { alpha: a3 });
      txt(g, 'ampulă', 300, 650, 15, '#ffe7d6', { alpha: a3 }); txt(g, 'istm', 560, 715, 15, '#ffe7d6', { alpha: a3 });
      const zu = b.i < 0 ? loopT(t, 7) : b.i === 3 ? pr(b, 3, 0.8) : b.i === 2 ? 0.15 * pr(b, 2) : 0;
      const [zx, zy] = zu < 0.9 ? at(TUBE, 0.2 + zu / 0.9 * 0.8) : [lerp(700, 790, (zu - 0.9) / 0.1), lerp(760, 744, (zu - 0.9) / 0.1)];
      const stage = zu < 0.15 ? 'ziua 0: zigot (ampulă)' : zu < 0.4 ? 'ziua 1–2: 2 celule' : zu < 0.7 ? 'ziua 3: morula' : zu < 0.9 ? 'ziua 4: morula intră în uter' : 'blastocist → implantare (ziua 6–7)';
      if (b.i < 0 || b.i >= 2) { ell(g, zx, zy, 14, 14, '#ffe9a8', { ow: 4 }); if (zu > 0.15) { dot(g, zx - 4, zy, 4, '#c69a3a', { ow: 0 }); dot(g, zx + 4, zy, 4, '#c69a3a', { ow: 0 }); } txt(g, stage, zx, zy - 40, 16, C.hi); }
    },
  };
}

/* ============ TERATOMUL ============ */
export function teratoma() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[400, 160], [560, 300], [700, 470], [860, 640]],
    draw(g, t, b) {
      bg(g);
      const a = (k) => vis(b, k, 0.35);
      // chistul
      ell(g, 600, 400, 280, 230, '#f2dcc0', { ow: 7, alpha: 1 }); ell(g, 600, 400, 250, 200, '#fff3dc', { ow: 3, alpha: 0.9 });
      if (act(b, 0)) { g.save(); g.globalAlpha = 0.7 * pulse(t); g.strokeStyle = C.hi; g.lineWidth = 8; g.beginPath(); g.ellipse(600, 400, 290, 240, 0, 0, 7); g.stroke(); g.restore(); }
      txt(g, 'peretele chistului', 600, 140, 18, '#ffe7d6', { alpha: a(0) });
      // protuberanța Rokitansky (jos-dreapta) cu dinți
      ell(g, 690, 530, 90, 56, '#e9b894', { ow: 6, alpha: a(2), glow: 0 });
      [[650, 500], [690, 490], [730, 505]].forEach(([x, y]) => { g.save(); g.globalAlpha = a(2); tube(g, [[x, y], [x, y - 26]], 16, '#ffffff', { ow: 4 }); g.restore(); });
      txt(g, 'protuberanța\nRokitansky', 830, 590, 17, '#ffe7d6', { alpha: a(2) });
      // smocul de păr (ondulează) — crește din protuberanță
      for (let k = 0; k < 9; k++) { const x0 = 650 + k * 10; const sw = REDUCED ? 0 : Math.sin(t * 1.6 + k) * 14; g.save(); g.globalAlpha = a(1); tube(g, [[x0, 495], [x0 - 30 + sw, 400], [x0 - 70 - sw, 300]], 4, '#4a3020', { ow: 0 }); g.restore(); }
      txt(g, 'păr', 520, 280, 18, '#ffe7d6', { alpha: a(1) });
      // os (fragment)
      g.save(); g.globalAlpha = a(1); tube(g, [[470, 470], [540, 430]], 18, '#f6f0e6', { ow: 5 }); dot(g, 466, 474, 12, '#f6f0e6', { ow: 4 }); dot(g, 544, 426, 12, '#f6f0e6', { ow: 4 }); g.restore();
      txt(g, 'os', 470, 520, 16, '#ffe7d6', { alpha: a(1) });
      // originea: 3 foițe → țesuturi (punctul 4)
      const a3 = b.i === 3 ? pr(b, 3) : b.i < 0 ? 1 : 0;
      [['ectoderm', '#9ad0f0', 'piele, păr, dinți', 760], ['mezoderm', '#ef7468', 'os, mușchi', 820], ['endoderm', '#f4c34f', 'epitelii', 880]].forEach(([n, c, s, y], k) => {
        pill(g, 470, y - 70, 160, 44, c, n, { alpha: a3, size: 17 }); txt(g, '→ ' + s, 570, y - 70, 17, '#ffe7d6', { alpha: a3, align: 'left' });
      });
      const ga = b.i === 3 || b.i < 0 ? a3 : 0; cell(g, 860, 120, 30, GRN, { alpha: ga, glow: ga }); txt(g, 'CGP\npluripotentă', 860, 190, 15, '#b8f0c8', { alpha: ga });
    },
  };
}

/* ============ GAMEȚII ANORMALI ============ */
export function abngam() {
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[62, 102], [492, 102], [442, 422]],
    draw(g, t, b) {
      bg(g);
      const a = (k) => vis(b, k, 0.3);
      // 1. folicul cu 2 ovocite
      panel(g, 40, 80, 400, 290); txt(g, 'folicul cu 2–3 ovocite', 240, 110, 17, '#ffe7d6', { alpha: a(0) });
      ell(g, 240, 240, 140, 100, '#ffd6c4', { ow: 6, alpha: a(0), glow: 0 });
      cell(g, 195, 240, 38, '#f08ab8', { alpha: a(0), glow: act(b, 0) ? 1 : 0 }); cell(g, 285, 240, 38, '#f08ab8', { alpha: a(0), glow: act(b, 0) ? 1 : 0 });
      dot(g, 195, 240, 10, '#7a3fb0', { alpha: a(0) }); dot(g, 285, 240, 10, '#7a3fb0', { alpha: a(0) });
      txt(g, '→ se pot naște gemeni', 240, 355, 16, '#ffd0e4', { alpha: a(0) });
      // 2. ovocit trinucleat
      panel(g, 470, 80, 490, 290); txt(g, 'ovocit primar cu mai mulți nuclei', 715, 110, 17, '#ffe7d6', { alpha: a(1) });
      cell(g, 715, 240, 92, '#f08ab8', { alpha: a(1), glow: act(b, 1) ? 1 : 0 });
      [[690, 215], [745, 225], [710, 275]].forEach(([x, y]) => dot(g, x, y, 15, '#7a3fb0', { alpha: a(1) }));
      txt(g, 'ex. trinucleat · de obicei degenerează', 715, 355, 16, '#ffd0e4', { alpha: a(1) });
      // 3. spermatozoizi: normal + atipici (cap, coadă, mărime), cu motilitate
      panel(g, 420, 400, 540, 470); txt(g, 'spermatozoizi atipici: MAI FRECVENȚI', 690, 430, 18, act(b, 2) ? C.hi : '#ffe7d6', { alpha: a(2) });
      const SP = [['normal', 1, 1, 0, 1], ['cap dublu', 2, 1, 0, 1], ['cap gigant', 1, 1.8, 0, 0.6], ['cap mic', 1, 0.55, 0, 0.8], ['coadă dublă', 1, 1, 2, 0.7], ['coadă încolăcită', 1, 1, 1, 0.25]];
      SP.forEach(([n, heads, hs, tail, mot], k) => {
        const x = 520 + (k % 3) * 170, y = 560 + Math.floor(k / 3) * 190; g.save(); g.globalAlpha = a(2);
        const wig = REDUCED ? 0 : Math.sin(t * 9 * mot + k) * 10 * mot;
        if (tail === 1) { const P = []; for (let q = 0; q <= 20; q++) { const an = q / 20 * Math.PI * 3; P.push([x + 18 * Math.cos(an), y + 30 + q * 2 + 18 * Math.sin(an)]); } tube(g, P, 4, '#cde4ff', { raw: true, ow: 2 }); }
        else { const tails = tail === 2 ? [-8, 8] : [0]; tails.forEach((dx) => tube(g, [[x + dx * 0.3, y + 18], [x + dx + wig, y + 55], [x + dx - wig, y + 95]], 4, '#cde4ff', { ow: 2 })); }
        const hd = heads === 2 ? [-12, 12] : [0]; hd.forEach((dx) => ell(g, x + dx, y, 12 * hs, 17 * hs, '#7fb6e6', { ow: 4 }));
        g.restore(); txt(g, n, x, y + 120, 15, k === 0 ? '#b8f0c8' : '#ffe7d6', { alpha: a(2) });
      });
    },
  };
}

/* ============ GEMENII ============ */
// corion = inel roșu (exterior), amnios = inel albastru, embrion = portocaliu
export function twins() {
  const COL = [[110, 'DIZIGOȚI', '2 ovocite', 'DiDi'], [300, 'MZ · ziua 0–3', '2 celule–morula', 'DiDi'], [500, 'MZ · ziua 4–8', 'blastocist', 'MoDi'], [700, 'MZ · ziua 8–13', 'disc bilaminar', 'MoMo'], [890, 'MZ · > ziua 13', 'disc trilaminar', 'siamezi']];
  const K = [0, 1, 2, 3, 3];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[110, 150], [300, 150], [500, 150], [790, 150]],
    draw(g, t, b) {
      bg(g);
      txt(g, 'separare tot mai târzie →', 600, 70, 19, '#ffb48a');
      tube(g, [[230, 100], [960, 100]], 6, '#ffb48a', { ow: 0 });
      COL.forEach(([x, n, s, tip], c) => {
        const k = K[c]; const a = b.i < 0 || b.i === k ? 1 : b.i > k ? 0.5 : 0.2; const on = b.i === k;
        txt(g, n, x, 180, 17, on ? C.hi : '#ffe7d6', { alpha: a }); txt(g, s, x, 210, 14, '#cdb8ab', { alpha: a, w: 600 });
        const cy = 430; const breathe = REDUCED ? 0 : Math.sin(t * 1.5 + c) * 3;
        const emb = (ex, ey) => { ell(g, ex, ey + breathe, 15, 22, '#ff9a4a', { ow: 4, alpha: a }); };
        if (tip === 'DiDi') { [cy - 85, cy + 85].forEach((y) => { ell(g, x, y, 80, 76, 'rgba(0,0,0,0)', { ow: 0, alpha: a }); g.save(); g.globalAlpha = a; g.strokeStyle = RED; g.lineWidth = 9; g.beginPath(); g.arc(x, y, 76, 0, 7); g.stroke(); g.strokeStyle = '#4f8fe6'; g.lineWidth = 7; g.beginPath(); g.arc(x, y, 52, 0, 7); g.stroke(); g.restore(); emb(x, y); }); }
        else {
          g.save(); g.globalAlpha = a; g.strokeStyle = RED; g.lineWidth = 9; g.beginPath(); g.ellipse(x, cy, 88, 170, 0, 0, 7); g.stroke();
          g.strokeStyle = '#4f8fe6'; g.lineWidth = 7;
          if (tip === 'MoDi') { [cy - 75, cy + 75].forEach((y) => { g.beginPath(); g.arc(x, y, 58, 0, 7); g.stroke(); }); }
          else { g.beginPath(); g.ellipse(x, cy, 66, 140, 0, 0, 7); g.stroke(); }
          g.restore();
          if (tip === 'siamezi') { ell(g, x, cy - 26 + breathe, 17, 26, '#ff9a4a', { ow: 4, alpha: a }); ell(g, x, cy + 26 + breathe, 17, 26, '#ff9a4a', { ow: 4, alpha: a }); ell(g, x, cy + breathe, 12, 10, '#ff9a4a', { ow: 0, alpha: a }); }
          else if (tip === 'MoDi') { emb(x, cy - 75); emb(x, cy + 75); }
          else { emb(x, cy - 45); emb(x, cy + 45); }
        }
        const lab = tip === 'siamezi' ? 'gemeni\nsiamezi\n(lipiți)' : tip === 'DiDi' ? '2 corioni\n2 amnioși\n(DiDi)' : tip === 'MoDi' ? '1 corion\n2 amnioși\n(MoDi)' : '1 corion\n1 amnios\n(MoMo)';
        pill(g, x, 720, 170, 110, on ? '#ffe9a8' : '#3a2a26', '', { alpha: a, ow: 3, glow: on ? 1 : 0 }); txt(g, lab, x, 720, 16, on ? OUT : '#ffe7d6', { stroke: false, alpha: a });
      });
      txt(g, 'roșu = corion (spre placentă) · albastru = amnios · portocaliu = embrion', 500, 880, 16, '#cdb8ab', { w: 600 });
    },
  };
}
