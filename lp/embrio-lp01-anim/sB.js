// Partea B: celulele germinale primordiale, spermatogeneza vs. ovogeneza, ovogeneza în timp, ciclul, fecundația, teratomul.
import {
  cam, HOME, C, K, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead,
  OUT, clamp, lerp, ease, paint, blob, bb, smooth, REDUCED,
  chromo, cellB, dividing, sperm, oocyte, polar, cleave, blastocyst, srand, rr, rnd,
} from './k1.js';

const sp = (u, a, b) => ease(clamp((u - a) / (b - a)));
// CGP: celulă amiboidă verde, cu un pseudopod spre direcția de mers
function cgpCell(g, x, y, s, t, dir = 0, a = 1, seed = 0) {
  if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a);
  const p = blob(x, y, 17 * s, 14 * s, dir, t * 2, 0.12, 14, seed);
  paint(g, p, K.cgp, K.cgpS, '#c8f5d9', bb(x, y, 17 * s, 14 * s), OUT, 3.5);
  ell(g, x + Math.cos(dir) * 13 * s, y + Math.sin(dir) * 13 * s, 7 * s, 5 * s, K.cgp, { rot: dir, ow: 2.5 });
  ell(g, x - 2 * s, y, 6 * s, 6 * s, '#1f6b3e', { ow: 0 });
  g.restore();
}

/* =================================================== CGP: migrarea (secțiune transversală, ~S5; sacul vitelin schematic)
   Se vede: sus tubul neural + notocorda, aorta dorsală pe linia mediană, lateral mezonefrosul (stânga + dreapta) cu creasta
   genitală MEDIAL de el, mezenterul dorsal coborând la intestinul posterior; dedesubt, schematic, sacul vitelin cu alantoida.
   1 = CGP apar în peretele sacului vitelin, lângă alantoidă; 2 = urcă pe peretele intestinului posterior, apoi prin
   mezenterul dorsal (mișcare amiboidă); 3 = se despart și intră în crestele genitale (care se aprind); 4 = una rătăcește
   lateral și devine un nodul (teratom). Direcția: mereu din sacul vitelin SPRE crestele genitale (dorsal). */
export function cgp() {
  const RIDGE = [[395, 345], [605, 345]];
  const YS = [500, 790];
  const PATH = [[612, 772], [560, 700], [540, 640], [528, 590], [512, 520], [503, 450], [500, 400]];
  const N = 7;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[700, 760], [585, 505], [432, 292], [165, 525]],
    phase: (i) => ['S3–S4: sacul vitelin', 'S4–S5: migrare', 'S5–S6: crestele genitale', 'CGP rătăcite'][i] || 'din sacul vitelin în gonadă',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3);
      // peretele corpului (ectoderm) + cavitatea celomică
      const wall = new Path2D(); wall.moveTo(500, 60); wall.bezierCurveTo(760, 60, 880, 220, 860, 420); wall.bezierCurveTo(850, 560, 700, 640, 560, 660); wall.lineTo(440, 660); wall.bezierCurveTo(300, 640, 150, 560, 140, 420); wall.bezierCurveTo(120, 220, 240, 60, 500, 60); wall.closePath();
      paint(g, wall, '#3a2a30', null, null, [140, 60, 720, 600], 'rgba(255,230,210,.45)', 4);
      g.save(); g.clip(wall); g.fillStyle = 'rgba(255,240,228,.06)'; g.fillRect(140, 60, 720, 600); g.restore();
      // tubul neural + notocorda
      ell(g, 500, 140, 62, 52, '#7fb0ff', { ow: 5, shade: '#5b8fe6', light: '#cfe0ff' }); ell(g, 500, 140, 14, 26, '#2a1c30', { ow: 3 });
      dot(g, 500, 218, 13, '#c9b3a6', { ow: 3 });
      txt(g, 'tub neural', 645, 120, 17, '#cfe0ff'); txt(g, 'notocordă', 615, 220, 16, '#d8c4b8', { w: 600 });
      // aorta dorsală
      ell(g, 500, 275, 30, 28, '#e0443e', { ow: 5, shade: '#a92b27', light: '#ff9a92' }); txt(g, 'aorta', 500, 275, 15, '#fff3e6', { w: 800 });
      // mezonefrosul (lateral) + creasta genitală (medial)
      [-1, 1].forEach((s) => {
        const mx = 500 + s * 215;
        ell(g, mx, 360, 78, 98, '#f6b49c', { ow: 5, shade: '#e08d72', light: '#ffe0d2' });
        for (let k = 0; k < 4; k++) { const yy = 310 + k * 32; tube(g, [[mx - 34, yy], [mx - 10, yy - 10], [mx + 12, yy + 6], [mx + 34, yy - 4]], 7, '#e06a3a', { ow: 3 }); }
        const [rx, ry] = RIDGE[s < 0 ? 0 : 1];
        const lit = Math.max(p2, b.i < 0 ? 1 : 0);
        ell(g, rx, ry, 40, 74, '#b9a3ea', { ow: 5, shade: '#8b6fd6', light: '#e9dcff' });
        if (lit > 0) { g.save(); g.globalAlpha = 0.35 * lit; g.fillStyle = C.hi; g.beginPath(); g.ellipse(rx, ry, 40, 74, 0, 0, 7); g.fill(); g.restore(); }
      });
      txt(g, 'mezonefros', 760, 480, 17, '#ffd6c4'); txt(g, 'creasta genitală', 380, 250, 16, '#e9dcff', { w: 800 });
      // mezenterul dorsal + intestinul posterior
      const mes = new Path2D(); mes.moveTo(480, 300); mes.lineTo(520, 300); mes.lineTo(540, 540); mes.lineTo(460, 540); mes.closePath();
      g.save(); g.fillStyle = 'rgba(233,214,189,.30)'; g.fill(mes); g.strokeStyle = 'rgba(233,214,189,.7)'; g.lineWidth = 3; g.stroke(mes); g.restore();
      txt(g, 'mezenter\ndorsal', 390, 470, 16, '#e9d6bd', { w: 800 });
      ell(g, 500, 585, 62, 52, C.sinus, { ow: 5, shade: C.sinusS, light: '#fff2c4' }); ell(g, 500, 585, 20, 16, '#5a3a18', { ow: 3 });
      txt(g, 'intestinul posterior', 420, 650, 17, '#ffe9a8', { align: 'right' });
      // sacul vitelin (schematic) + alantoida
      tube(g, [[500, 636], [500, 700]], 30, C.sinus, { ow: 5 });
      const ys = new Path2D(); ys.ellipse(YS[0], YS[1], 150, 110, 0, 0, 7); paint(g, ys, '#f7d77e', '#e4b84d', '#fff2c4', bb(YS[0], YS[1], 150, 110), OUT, 6);
      txt(g, 'sacul vitelin', 470, 800, 19, OUT, { stroke: false }); txt(g, '(schematic)', 470, 826, 15, '#5a3a18', { stroke: false, w: 700 });
      tube(g, [[640, 760], [720, 740], [790, 760]], 18, '#e9c46a', { ow: 5 }); txt(g, 'alantoida', 820, 715, 16, '#ffe9a8', { w: 800 });
      // CGP
      const P2 = curve(PATH);
      for (let k = 0; k < N; k++) {
        const home = [600 + (k % 3) * 18 - 10, 778 + Math.floor(k / 3) * 14 - 10];
        let x = home[0], y = home[1], dir = -2, a = b.i < 0 ? 1 : b.i >= 0 ? (b.i === 0 ? sp(p0, k * 0.08, k * 0.08 + 0.3) : 1) : 0;
        const stray = k === N - 1;
        // urcarea
        const mv = clamp(p1 * 1.15 - k * 0.025);
        if (mv > 0) { const q = at(P2, mv); x = lerp(home[0], q[0] + (k % 2 ? 8 : -8), clamp(mv * 6)); y = lerp(home[1], q[1], clamp(mv * 6)); dir = q[2]; }
        // intrarea în creste (S5–S6): jumătate stânga, jumătate dreapta; ultima (stray) rătăcește la punctul 4
        if (!stray && p2 > 0) { const [rx, ry] = RIDGE[k % 2]; const q = clamp(p2 * 1.2 - (k >> 1) * 0.08); x = lerp(x, rx + ((k >> 1) - 1) * 12, q); y = lerp(y, ry - 20 + (k >> 1) * 22, q); dir = Math.atan2(ry - 400, rx - 500); }
        if (stray && p2 > 0) { const q = p2 * 0.25; x = lerp(x, 330, q); y = lerp(y, 530, q); }
        if (stray && p3 > 0) { x = lerp(lerp(x, 330, 0.25), 250, p3); y = lerp(lerp(y, 530, 0.25), 520, p3); dir = Math.PI; }
        if (stray && p3 > 0.7) { const s2 = sp(p3, 0.7, 1); ell(g, 250, 520, 22 + 16 * s2, 20 + 14 * s2, '#c9b3a6', { ow: 4, alpha: s2 }); for (let j = 0; j < 5; j++) tube(g, [[244 + j * 3, 512], [236 + j * 5, 490 - j * 2], [228 + j * 7, 482]], 2.5, '#3a2a20', { ow: 0, alpha: s2 }); }
        cgpCell(g, x, y, 1, t + k, dir, a, k);
      }
      if (p1 > 0 && p1 < 1) tube(g, PATH, 4, K.cgp, { ow: 0, dash: [10, 8], alpha: 0.6 });
      if (p2 > 0.6) txt(g, '→ spermatogonii / ovogonii', 500, 452, 18, '#c8f5d9', { alpha: sp(p2, 0.6, 1) });
      if (p3 > 0.6) txt(g, 'rătăcită → teratom', 250, 470, 18, C.hi, { alpha: sp(p3, 0.6, 1) });
      if (on(b, 0)) ring(g, 612, 782, 60, 44, ease(b.bt * 1.4));
      if (on(b, 2)) { ring(g, RIDGE[0][0], RIDGE[0][1], 56, 90, ease(b.bt * 1.4)); ring(g, RIDGE[1][0], RIDGE[1][1], 56, 90, ease(b.bt * 1.4)); }
    },
  };
}

/* =================================================== SPERMATOGENEZA vs. OVOGENEZA (o pereche de omologi: roșu + albastru)
   Rândul 1: gonia 2n — pereche cu cromatide SIMPLE. Rândul 2 (creștere): gametocitul I mai mare, perechea DUBLATĂ (2 cromatide).
   Rândul 3 (MI): bărbat → 2 spermatocite II egale, fiecare cu UN omolog dublat (unul roșu, unul albastru);
   femeie → ovocit II mare (un omolog dublat) + globul polar 1 mic (celălalt omolog dublat).
   Rândul 4 (MII): 4 spermatide, fiecare cu O cromatidă; ovul (o cromatidă) + globul polar 2 (o cromatidă); GP1 se poate
   divide în 2 globuli mici. Rândul 5 (diferențiere): spermatidele → 4 spermatozoizi (cap + coadă); 1 ovul + 3 globuli polari. */
export function gameto() {
  const SX = 270, OX = 740; const Y = [150, 300, 470, 630, 790];
  const SP2 = [[175, Y[2]], [365, Y[2]]];
  const SPT = [[80, Y[3]], [175, Y[3]], [275, Y[3]], [370, Y[3]]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[500, Y[1] - 50], [500, Y[2] - 50], [500, Y[3] - 50], [500, Y[4] - 50]],
    phase: (i) => ['creștere', 'meioza I: 2n → n', 'meioza II', 'diferențiere'][i] || 'aceeași meioză, alt rezultat',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3);
      txt(g, 'SPERMATOGENEZA · testicul', SX, 72, 20, '#bfe0ff'); txt(g, 'OVOGENEZA · ovar', OX, 72, 20, '#ffd0e6');
      g.save(); g.strokeStyle = 'rgba(255,230,210,.16)'; g.lineWidth = 3; g.setLineDash([10, 10]); g.beginPath(); g.moveTo(500, 100); g.lineTo(500, 900); g.stroke(); g.restore();
      // etichetele centrale
      const LAB = [['gonie · 2n', 'prin mitoze'], ['gametocit I · 2n', 'ADN dublat'], ['după MEIOZA I · n', '2 cromatide'], ['după MEIOZA II · n', '1 cromatidă'], ['gameți', '']];
      LAB.forEach(([a, c], k) => { const act = b.i < 0 || k <= b.i + 1 ? 1 : 0.25; pill(g, 500, Y[k], 186, c ? 54 : 40, '#3a2a26', '', { ow: 3, alpha: act }); txt(g, a, 500, Y[k] - (c ? 10 : 0), 16, C.cream, { stroke: false, alpha: act }); if (c) txt(g, c, 500, Y[k] + 14, 14, '#d8c4b8', { stroke: false, alpha: act, w: 600 }); });
      const pairS = (x, y, s, dup) => { chromo(g, x - 11 * s, y, 40 * s, K.mat, { dup, w: 9 * s }); chromo(g, x + 11 * s + (dup ? 8 * s : 0), y, 40 * s, K.pat, { dup, w: 9 * s }); };
      /* ---- rândurile 1–2: gonia → gametocitul I (crește, ADN dublat) ---- */
      [[SX, K.cyt, K.cytS, K.cytL], [OX, K.ooc, K.oocS, K.oocL]].forEach(([x, f, sh, li], c) => {
        cellB(g, x, Y[0], 44, 44, t, { fill: f, shade: sh, light: li, seed: c });
        pairS(x, Y[0], 0.85, false);
        const gr = Math.max(p0, b.i < 0 ? 1 : 0);
        if (gr > 0) {
          arr(g, x, Y[0] + 50, x, Y[1] - 74, '#fff3e6', 4, gr);
          const r = lerp(44, c ? 72 : 62, gr); cellB(g, x, Y[1], r, r, t, { fill: f, shade: sh, light: li, seed: 2 + c, alpha: gr });
          pairS(x, Y[1], 1, gr > 0.5);
        }
      });
      txt(g, 'spermatogonie', SX - 120, Y[0], 16, '#cfe0ff', { w: 700 }); txt(g, 'ovogonie', OX + 110, Y[0], 16, '#ffd0e6', { w: 700 });
      if (p0 > 0.5 || b.i < 0) { txt(g, 'spermatocit I', SX - 140, Y[1], 16, '#cfe0ff', { w: 700 }); txt(g, 'ovocit I', OX + 130, Y[1], 16, '#ffd0e6', { w: 700 }); }
      /* ---- rândul 3: meioza I ---- */
      const m1 = Math.max(p1, b.i < 0 ? 1 : 0);
      if (m1 > 0) {
        // bărbat: 2 celule egale
        SP2.forEach(([x, y], k) => { arr(g, SX + (k ? 30 : -30), Y[1] + 60, x + (k ? -10 : 10), y - 56, '#fff3e6', 4, m1); cellB(g, lerp(SX, x, m1), lerp(Y[1], y, m1), 48, 48, t, { seed: 4 + k, alpha: m1 }); chromo(g, lerp(SX, x, m1), lerp(Y[1], y, m1), 40, k ? K.pat : K.mat, { dup: true, w: 9, alpha: m1 }); });
        txt(g, 'spermatocite II', SX, Y[2] + 70, 16, '#cfe0ff', { alpha: m1, w: 700 });
        // femeie: ovocit II mare + GP1 mic (diviziune inegală)
        arr(g, OX - 20, Y[1] + 76, OX - 40, Y[2] - 74, '#fff3e6', 4, m1);
        cellB(g, OX - 40, lerp(Y[1], Y[2], m1), 66, 66, t, { fill: K.ooc, shade: K.oocS, light: K.oocL, seed: 6, alpha: m1 });
        chromo(g, OX - 40, lerp(Y[1], Y[2], m1), 40, K.mat, { dup: true, w: 9, alpha: m1 });
        const gp1 = [OX + 110, Y[2] - 10];
        arr(g, OX + 50, Y[1] + 50, gp1[0] - 18, gp1[1] - 28, '#fff3e6', 3, m1);
        polar(g, lerp(OX + 40, gp1[0], m1), lerp(Y[1], gp1[1], m1), 24, t, m1);
        chromo(g, lerp(OX + 40, gp1[0], m1), lerp(Y[1], gp1[1], m1), 26, K.pat, { dup: true, w: 6, alpha: m1 });
        txt(g, 'ovocit II', OX - 40, Y[2] + 88, 16, '#ffd0e6', { alpha: m1, w: 700 }); txt(g, 'globul polar 1', gp1[0] + 20, gp1[1] + 46, 15, '#ffd0e6', { alpha: m1, w: 700 });
      }
      /* ---- rândul 4: meioza II ---- */
      const m2 = Math.max(p2, b.i < 0 ? 1 : 0);
      if (m2 > 0) {
        SPT.forEach(([x, y], k) => { const par = SP2[k >> 1]; arr(g, par[0] + (k % 2 ? 16 : -16), par[1] + 52, x, y - 44, '#fff3e6', 3, m2); if (p3 < 0.5 || b.i < 0) { cellB(g, lerp(par[0], x, m2), lerp(par[1], y, m2), 36, 36, t, { seed: 9 + k, alpha: m2 * (b.i === 3 ? 1 - sp(p3, 0.2, 0.5) : 1) }); chromo(g, lerp(par[0], x, m2), lerp(par[1], y, m2), 36, k < 2 ? K.mat : K.pat, { w: 9, alpha: m2 * (b.i === 3 ? 1 - sp(p3, 0.2, 0.5) : 1) }); } });
        txt(g, 'spermatide', SX, Y[3] + 58, 16, '#cfe0ff', { alpha: m2 * (b.i === 3 ? 1 - p3 : 1), w: 700 });
        // ovul + GP2; GP1 → 2 globuli mici
        arr(g, OX - 40, Y[2] + 72, OX - 40, Y[3] - 72, '#fff3e6', 4, m2);
        cellB(g, OX - 40, lerp(Y[2], Y[3], m2), 64, 64, t, { fill: K.ooc, shade: K.oocS, light: K.oocL, seed: 12, alpha: m2 });
        chromo(g, OX - 40, lerp(Y[2], Y[3], m2), 40, K.mat, { w: 9, alpha: m2 });
        polar(g, OX + 70, lerp(Y[2], Y[3] + 40, m2), 20, t, m2); chromo(g, OX + 70, lerp(Y[2], Y[3] + 40, m2), 22, K.mat, { w: 6, alpha: m2 });
        [[OX + 120, Y[3] - 40], [OX + 175, Y[3] - 20]].forEach(([x, y], k) => { polar(g, lerp(OX + 110, x, m2), lerp(Y[2] - 10, y, m2), 17, t, m2); chromo(g, lerp(OX + 110, x, m2), lerp(Y[2] - 10, y, m2), 18, K.pat, { w: 5, alpha: m2 }); });
        txt(g, 'ovul', OX - 40, Y[3] + 86, 16, '#ffd0e6', { alpha: m2, w: 700 }); txt(g, 'GP2', OX + 70, Y[3] + 82, 15, '#ffd0e6', { alpha: m2, w: 700 }); txt(g, 'GP1 se poate divide', OX + 150, Y[3] + 20, 15, '#ffd0e6', { alpha: m2, w: 700 });
      }
      /* ---- rândul 5: diferențierea ---- */
      const m3 = Math.max(p3, b.i < 0 ? 1 : 0);
      if (m3 > 0) {
        SPT.forEach(([x], k) => { const y = lerp(Y[3], Y[4] - 52, m3); sperm(g, x + 8, y, 0.6, -Math.PI / 2, t + k * 0.3, { alpha: sp(m3, 0.2, 0.7) }); if (m3 < 0.6) { cellB(g, x, y, lerp(36, 18, m3 / 0.6), lerp(36, 22, m3 / 0.6), t, { seed: 30 + k, alpha: 1 - sp(m3, 0.3, 0.6) }); } });
        txt(g, '4 spermatozoizi · 23,X sau 23,Y', SX, Y[4] + 92, 17, C.hi, { alpha: sp(m3, 0.5, 1) });
        oocyte(g, OX - 40, Y[4] + 10, 62, t, { glow: on(b, 3) ? 0.5 + 0.5 * Math.sin(t * 4) : 0, alpha: sp(m3, 0.2, 0.7), inner: (gg) => chromo(gg, 0, 0, 38, K.mat, { w: 9 }) });
        [[OX + 70, Y[4] - 10], [OX + 110, Y[4] + 30], [OX + 150, Y[4] - 6]].forEach(([x, y], k) => polar(g, x, y, 16, t, sp(m3, 0.3, 0.8)));
        txt(g, '1 ovul 23,X + 3 globuli polari', OX + 10, Y[4] + 92, 17, C.hi, { alpha: sp(m3, 0.5, 1) });
      }
      if (on(b, 1)) { ring(g, SX, Y[2], 160, 60, ease(b.bt * 1.4)); ring(g, OX + 20, Y[2], 150, 76, ease(b.bt * 1.4)); }
    },
  };
}

/* =================================================== OVOGENEZA ÎN TIMP
   Axa: luna 3 fetal → luna 5 (S20) → naștere → pubertate → ovulație → fecundație. Banda „ovocit I OPRIT în PROFAZA I”
   pornește din luna 3 fetal și ține până la ovulație; banda „oprit în METAFAZA II” de la ovulație la fecundație.
   Stânga-jos: „rezerva” de ovocite (puncte) care se golește: 7 milioane (luna 5) → < 1 milion (naștere) → ~40 000 (pubertate)
   (manual). Dreapta-jos: UN ovocit mărit: 1 = ovogonii care se divid prin mitoză → ovocit I cu nucleu mare, perechea dublată
   împerecheată (profaza I) și semnul pauză; 2 = același ovocit așteaptă (ani); 3 = la ovulație termină MI → expulzează GP1,
   cromozomii pe fusul metafazei II, pauză; 4 = intră spermatozoidul → termină MII → GP2 + pronucleii. */
export function ovotime() {
  const X0 = 90, X1 = 920; const M = { l3: 0, l5: 0.13, nas: 0.3, pub: 0.52, ov: 0.78, fec: 0.95 };
  const ax = (u) => lerp(X0, X1, u); const AY = 230;
  srand(17); const DOTS = Array.from({ length: 160 }, () => [rr(70, 390), rr(560, 860), rnd()]);
  const OX = 700, OY = 640;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[ax(M.l3), AY - 70], [ax(M.pub) - 60, AY - 70], [ax(M.ov), AY - 70], [ax(M.fec), AY - 70]],
    phase: (i) => ['viața fetală', 'naștere → pubertate', 'ovulația', 'fecundația'][i] || 'oprit decenii în profaza I',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3);
      // axa + marcajele
      tube(g, [[X0, AY], [X1, AY]], 8, '#6b5650', { ow: 4 });
      [['luna 3\nfetal', M.l3], ['luna 5\n(S20)', M.l5], ['naștere', M.nas], ['pubertate', M.pub], ['ovulație', M.ov], ['fecundație', M.fec]].forEach(([n, u]) => { dot(g, ax(u), AY, 10, '#fff3e6', { ow: 3 }); txt(g, n, ax(u), AY + 42, 16, '#ffe7d6', { w: 700 }); });
      // benzile
      const cur = b.i < 0 ? M.fec : b.i === 0 ? lerp(M.l3, M.nas, p0) : b.i === 1 ? lerp(M.nas, M.pub + 0.12, p1) : b.i === 2 ? lerp(M.pub + 0.12, M.ov, p2) : lerp(M.ov, M.fec, p3);
      const bEnd = Math.min(cur, M.ov); if (bEnd > M.l3) { const pp = new Path2D(); pp.roundRect(ax(M.l3), AY - 52, ax(bEnd) - ax(M.l3), 34, 12); paint(g, pp, '#cdbcf1', null, null, [ax(M.l3), AY - 52, ax(bEnd) - ax(M.l3), 34], OUT, 3); if (bEnd > 0.5) txt(g, 'ovocit I OPRIT în PROFAZA I (ani, decenii)', ax((M.l3 + bEnd) / 2), AY - 35, 16, OUT, { stroke: false }); }
      if (cur > M.ov) { const pp = new Path2D(); pp.roundRect(ax(M.ov), AY - 52, ax(Math.min(cur, M.fec)) - ax(M.ov), 34, 12); paint(g, pp, '#ffd0e6', null, null, [ax(M.ov), AY - 52, ax(M.fec) - ax(M.ov), 34], OUT, 3); txt(g, 'oprit în MII', ax((M.ov + M.fec) / 2), AY - 35, 15, OUT, { stroke: false, alpha: cur > M.ov + 0.1 ? 1 : 0 }); }
      dot(g, ax(cur), AY, 14, C.hi, { ow: 4 });
      // rezerva de ovocite (manual)
      panel(g, 50, 470, 360, 420);
      const left = cur < M.l5 ? lerp(0.2, 1, (cur - M.l3) / M.l5) : cur < M.nas ? lerp(1, 0.32, (cur - M.l5) / (M.nas - M.l5)) : cur < M.pub ? lerp(0.32, 0.08, (cur - M.nas) / (M.pub - M.nas)) : lerp(0.08, 0.03, clamp((cur - M.pub) / 0.4));
      DOTS.forEach(([x, y, r]) => { if (r < left) { dot(g, x, y + 20, 7, '#ffd2e1', { ow: 2 }); } else if (r < left + 0.06) dot(g, x, y + 20, 5, '#8f7d74', { ow: 0, alpha: 0.6 }); });
      const lab = cur < M.l5 + 0.02 ? '7 milioane (luna 5)' : cur < M.nas + 0.04 ? '< 1 milion (naștere)' : cur < M.ov ? '~40 000 (pubertate)' : '~400–500 ajung ovulate';
      pill(g, 230, 510, 300, 44, C.hi, lab, { size: 17 });
      txt(g, 'restul degenerează (atrezie) · manual', 230, 905, 15, '#d8c4b8', { w: 600 });
      // ovocitul mărit
      panel(g, 440, 330, 540, 560);
      const nucR = 52;
      const st = cur < M.l3 + 0.05 ? 0 : cur < M.ov ? 1 : cur < M.fec - 0.02 ? 2 : 3;
      if (b.i === 0 && p0 < 0.35) {
        // ovogonii în mitoză
        const f = sp(p0, 0, 0.3); dividing(g, OX, OY, 70, f, t, { fill: K.ooc, shade: K.oocS, light: K.oocL });
        txt(g, 'ovogonii: mitoze', OX, OY - 140, 20, C.cream);
      } else {
        const ovul = b.i === 3 ? sp(p3, 0.3, 0.7) : b.i < 0 ? 0 : 0;
        oocyte(g, OX, OY, 120, t, { corona: st >= 2, inner: (gg) => {
          if (st <= 1) { // nucleul mare (vezicula germinativă) cu perechea împerecheată, profaza I
            const q = blob(0, 0, nucR, nucR, 0, t, 0.03, 14, 2); gg.fillStyle = K.nuc; gg.fill(q); gg.strokeStyle = K.nucS; gg.lineWidth = 3; gg.stroke(q);
            chromo(gg, -10, 0, 52, K.mat, { dup: true, w: 9, rot: 0.15 }); chromo(gg, 14, 2, 52, K.pat, { dup: true, w: 9, rot: 0.15 });
          } else if (st === 2) { // fusul MII cu un omolog dublat pe placă
            gg.save(); gg.strokeStyle = 'rgba(255,243,230,.6)'; gg.lineWidth = 2; for (let k = -2; k <= 2; k++) { gg.beginPath(); gg.moveTo(0, -60); gg.quadraticCurveTo(k * 18, 0, 0, 60); gg.stroke(); } gg.restore();
            chromo(gg, 0, 0, 46, K.mat, { dup: true, w: 9, rot: Math.PI / 2 });
          } else { // pronucleii
            ell(gg, -34, 0, 30, 30, '#d9c6ff', { ow: 3 }); ell(gg, 34, 0, 30, 30, '#bfe0ff', { ow: 3 });
            chromo(gg, -34, 0, 30, K.mat, { w: 7 }); chromo(gg, 34, 0, 30, K.pat, { w: 7 });
          }
        } });
        if (st >= 2) { polar(g, OX + 104, OY - 92, 22, t); chromo(g, OX + 104, OY - 92, 24, K.pat, { dup: true, w: 5 }); txt(g, 'GP1', OX + 150, OY - 120, 16, '#ffd0e6', { w: 800 }); }
        if (st === 3) { polar(g, OX - 100, OY - 100, 18, t); chromo(g, OX - 100, OY - 100, 18, K.mat, { w: 5 }); txt(g, 'GP2', OX - 150, OY - 126, 16, '#ffd0e6', { w: 800 }); }
        if (b.i === 3) sperm(g, lerp(OX - 330, OX - 150, sp(p3, 0, 0.35)), OY + 60, 1, 0, t, { alpha: 1 - sp(p3, 0.3, 0.45) });
        // semnul pauză
        if (st === 1 || st === 2) { g.save(); g.globalAlpha = 0.6 + 0.4 * Math.sin(t * 3); g.fillStyle = C.hi; g.strokeStyle = OUT; g.lineWidth = 4; [[-16], [6]].forEach(([dx]) => { g.beginPath(); g.roundRect(OX + 160 + dx, OY + 90, 14, 44, 4); g.fill(); g.stroke(); }); g.restore(); }
        const cap = st <= 1 ? 'ovocit I · oprit în profaza I' : st === 2 ? 'ovocit II + GP1 · oprit în metafaza II' : 'ovul + GP2 → zigot';
        txt(g, cap, OX, OY - 200, 20, C.cream);
        if (b.i === 1) txt(g, 'nicio diviziune', OX, OY + 200, 19, C.hi);
        if (st === 3 || (b.i === 3 && p3 > 0.6)) txt(g, 'nefecundat → degenerează (~24 h)', OX, OY + 210, 17, '#d8c4b8', { w: 600 });
      }
      if (on(b, 1)) ring(g, 230, 680, 190, 200, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== CICLUL FEMININ (manual): 4 benzi pe aceeași axă, ziua 1 → 28
   1 hipofiza: FSH (verde) bombat la început, scade, vârf mic odată cu LH; LH (albastru) mic, vârf ascuțit ziua 13–14.
   2 ovarul (hormoni): estrogenul (portocaliu) urcă la vârful preovulator (~ziua 12–13), scade, al doilea vârf luteal;
   progesteronul (violet) mic până la 14, vârf ~ziua 21, scade spre 28.
   3 ovarul: foliculi care cresc → foliculul Graaf → ovulația (ziua 14) → corp galben → corp alb.
   4 endometrul: subțire la menstruație (1–4, picături), proliferativ (5–14, crește), secretor (15–28, gros, glande ondulate);
   fără sarcină → se descuamează (menstruația). Cursorul ziua înaintează; curbele se desenează până la cursor. */
export function cycle() {
  const X0 = 150, X1 = 940; const dx = (d) => lerp(X0, X1, (d - 1) / 27);
  const gauss = (d, m, s) => Math.exp(-((d - m) ** 2) / (2 * s * s));
  const FSH = (d) => 0.45 * gauss(d, 3, 3.5) + 0.25 + 0.35 * gauss(d, 14, 0.8) - 0.12 * gauss(d, 21, 4);
  const LH = (d) => 0.18 + 0.82 * gauss(d, 13.6, 0.75);
  const E = (d) => 0.12 + 0.78 * gauss(d, 12.5, 2.2) + 0.35 * gauss(d, 21, 3);
  const PG = (d) => 0.06 + 0.86 * gauss(d, 21, 3.2) * (d > 14 ? 1 : gauss(d, 14, 1));
  const L1 = [110, 270], L2 = [300, 450];
  const curveTo = (fn, lane, dmax, col) => { const pts = []; for (let d = 1; d <= dmax; d += 0.25) pts.push([dx(d), lerp(lane[1], lane[0], clamp(fn(d)))]); if (pts.length > 1) tube(g0, pts, 6, col, { ow: 3, raw: true }); };
  let g0;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[dx(6), 300], [dx(14) + 74, 150], [dx(22.6), 520], [dx(27), 640]],
    phase: (i) => ['faza foliculară', 'ovulația: ziua 14', 'faza luteală', 'fără sarcină'][i] || 'ziua 1 → 28',
    draw(g, t, b) {
      g0 = g; bg(g); const p = P(b, t, 4);
      const day = b.i < 0 ? lerp(1, 28, loopT(t, 14)) : b.i === 0 ? lerp(1, 13, p(0)) : b.i === 1 ? lerp(13, 15, p(1)) : b.i === 2 ? lerp(15, 27, p(2)) : lerp(27, 28, p(3));
      // etichetele benzilor
      [['HIPOFIZA', 190], ['OVARUL\n(hormoni)', 375], ['OVARUL', 545], ['ENDOMETRUL', 730]].forEach(([n, y]) => txt(g, n, 72, y, 15, '#d8c4b8', { w: 800 }));
      // faza foliculară / luteală + ovulația
      g.save(); g.strokeStyle = 'rgba(255,227,110,.6)'; g.lineWidth = 3; g.setLineDash([8, 7]); g.beginPath(); g.moveTo(dx(14), 90); g.lineTo(dx(14), 850); g.stroke(); g.restore();
      txt(g, 'ovulația · ziua 14', dx(14), 76, 17, C.hi);
      txt(g, 'faza foliculară (durată variabilă)', (dx(1) + dx(14)) / 2, 470, 15, '#d8c4b8', { w: 700 }); txt(g, 'faza luteală (~14 zile, fixă)', (dx(14) + dx(28)) / 2, 470, 15, '#d8c4b8', { w: 700 });
      // curbele
      g.save(); g.strokeStyle = 'rgba(255,230,210,.12)'; g.lineWidth = 2; [L1[1], L2[1]].forEach((y) => { g.beginPath(); g.moveTo(X0, y); g.lineTo(X1, y); g.stroke(); }); g.restore();
      curveTo(FSH, L1, day, '#5cc48a'); curveTo(LH, L1, day, '#6fa8ff'); curveTo(E, L2, day, '#ff9a3d'); curveTo(PG, L2, day, '#b48cff');
      txt(g, 'FSH', dx(3), lerp(L1[1], L1[0], FSH(3)) - 22, 17, '#8fe0b0'); txt(g, 'LH', dx(14) + 40, L1[0] + 6, 17, '#a9c8ff');
      if (day > 9) txt(g, 'estrogen', dx(10.2), lerp(L2[1], L2[0], E(10.5)) - 6, 16, '#ffc08a', { align: 'right' });
      if (day > 18) txt(g, 'progesteron', dx(24.5), lerp(L2[1], L2[0], PG(24)) - 20, 16, '#d6c0ff', { align: 'left' });
      // ovarul: foliculul → Graaf → ovulație → corp galben → corp alb
      const FY = 545;
      [2, 5, 8, 11].forEach((d, k) => { if (day >= d) { const r = 9 + k * 5; ell(g, dx(d), FY, r, r, '#ffd2e1', { ow: 3 }); dot(g, dx(d) + r * 0.3, FY - r * 0.2, r * 0.32, '#ef5a6a', { ow: 0 }); } });
      if (day >= 12.5) { const r = 34; ell(g, dx(13), FY, r, r, '#ffd2e1', { ow: 4 }); ell(g, dx(13) + 6, FY - 2, r * 0.62, r * 0.62, '#cfeaff', { ow: 2 }); dot(g, dx(13) - 16, FY + 12, 7, '#ef5a6a', { ow: 2 }); txt(g, 'Graaf', dx(13) - 40, FY + 54, 15, '#ffd0e6', { w: 800 }); }
      if (day >= 14 && day < 15.5) { const u = (day - 14) / 1.5; dot(g, lerp(dx(13), dx(15.5), u), FY - 40 * Math.sin(u * Math.PI), 9, '#ef5a6a', { ow: 3 }); }
      if (day >= 15) { const big = clamp((day - 15) / 5) * (1 - clamp((day - 24) / 4) * 0.5); ell(g, dx(19), FY, 22 + 14 * big, 22 + 14 * big, '#f4c34f', { ow: 4, shade: '#d19a22', light: '#fff2c4' }); txt(g, 'corp galben', dx(19), FY + 56, 15, '#ffe9a8', { w: 800 }); }
      if (day >= 25) { ell(g, dx(26.5), FY, 18, 18, '#f3ede4', { ow: 4, alpha: clamp((day - 25) / 2) }); txt(g, 'corp alb', dx(26.5), FY + 50, 15, '#f3ede4', { w: 800, alpha: clamp((day - 25) / 2) }); }
      // endometrul: profilul grosimii
      const EB = 830; const th = (d) => (d <= 4 ? lerp(40, 18, (d - 1) / 3) : d <= 14 ? lerp(18, 110, (d - 4) / 10) : d <= 27 ? lerp(110, 150, Math.min(1, (d - 14) / 8)) : lerp(150, 30, (d - 27)));
      const ep = new Path2D(); ep.moveTo(dx(1), EB); for (let d = 1; d <= day; d += 0.25) ep.lineTo(dx(d), EB - th(d)); ep.lineTo(dx(day), EB); ep.closePath();
      paint(g, ep, K.endo, K.endoS, '#f7b3bf', [X0, EB - 160, X1 - X0, 160], OUT, 4);
      // glandele (ondulate în faza secretorie)
      for (let d = 6; d <= day; d += 2.2) { const h = th(d) * 0.7; const wav = d > 15 ? 7 : 2; const pts = []; for (let k = 0; k <= 8; k++) pts.push([dx(d) + Math.sin(k * 1.4) * wav, EB - 6 - (k / 8) * h]); tube(g, pts, 4, '#a2405a', { ow: 0, raw: true }); }
      if (day < 4.5) for (let k = 0; k < 4; k++) { const u = loopT(t + k * 0.4, 1.6); dot(g, dx(1.5 + k * 0.7), EB + 10 + u * 40, 6, '#c8203a', { alpha: 1 - u, ow: 2 }); }
      tube(g, [[X0, EB], [X1, EB]], 6, K.myo, { ow: 3 });
      [['menstruală 1–4', 2.5], ['proliferativă 5–14', 9.5], ['secretorie 15–28', 21.5]].forEach(([n, d]) => txt(g, n, dx(d), EB + 30, 15, '#ffd6dc', { w: 800, alpha: day >= d - 1.5 ? 1 : 0.35 }));
      // menstruația la sfârșit (punctul 4): picături noi
      if (b.i === 3 && p(3) > 0.3) { for (let k = 0; k < 5; k++) { const u = loopT(t + k * 0.35, 1.4); dot(g, dx(26.4 + k * 0.35), EB + 8 + u * 40, 6, '#c8203a', { alpha: 1 - u, ow: 2 }); } txt(g, '→ menstruația', dx(25), EB - 190, 18, C.hi); }
      // cursorul zilei
      g.save(); g.strokeStyle = C.hi; g.lineWidth = 2; g.globalAlpha = 0.6; g.beginPath(); g.moveTo(dx(day), 100); g.lineTo(dx(day), EB); g.stroke(); g.restore();
      pill(g, dx(day), 896, 110, 36, C.hi, `ziua ${Math.min(28, Math.round(day))}`, { size: 16 });
      if (on(b, 1)) ring(g, dx(13.7), 160, 50, 80, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, dx(19), FY, 60, 50, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== FECUNDAȚIA + DRUMUL ZIGOTULUI (manual), vedere frontală schematică
   Uterul stânga, trompa urcă spre dreapta: istm (îngust) → ampulă (largă) → infundibul cu fimbrii deasupra ovarului (dreapta-jos).
   1 = foliculul din ovar se rupe, ovocitul II e prins de fimbrii; 2 = spermatozoizii urcă din uter prin trompă; în AMPULĂ se
   întâlnesc (ziua 0) → zigot cu 2 pronuclei; 3 = conceptusul coboară spre uter: 2 celule (ziua 1–2), morula (ziua 3) în istm,
   intră în uter în ziua 4 → blastocist în cavitate; 4 = implantare în ziua 6–7 în endometrul secretor, pe peretele corpului
   uterin (posterior). Sensul: ovar → fimbrii → ampulă → istm → uter. */
export function fert() {
  const TUBE = [[330, 395], [420, 360], [520, 330], [620, 330], [720, 360], [800, 420], [850, 500]];
  const TP = curve(TUBE, 14);
  const OV = [800, 640];
  const STOP = { fim: 0.98, amp: 0.66, d12: 0.52, d3: 0.3, d4: 0.02 };
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[OV[0] + 90, OV[1] - 40], [at(TP, STOP.amp)[0] + 100, 250], [at(TP, STOP.d3)[0], 270], [140, 660]],
    phase: (i) => ['ovulația', 'ziua 0: în ampulă', 'segmentarea pe drum', 'ziua 6–7: implantarea'][i] || 'de la ovar la uter',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3);
      // uterul (frontal): miometru + endometru gros (secretor) + colul
      const U = new Path2D(); U.moveTo(110, 360); U.bezierCurveTo(100, 520, 180, 690, 230, 770); U.lineTo(270, 770); U.bezierCurveTo(320, 690, 400, 520, 360, 360); U.bezierCurveTo(300, 330, 170, 330, 110, 360); U.closePath();
      paint(g, U, K.myo, K.myoS, '#ee96a6', [100, 330, 300, 440], OUT, 6);
      const Cv = new Path2D(); Cv.moveTo(150, 390); Cv.bezierCurveTo(150, 520, 210, 650, 245, 720); Cv.bezierCurveTo(285, 650, 345, 520, 325, 390); Cv.bezierCurveTo(270, 372, 200, 372, 150, 390); Cv.closePath();
      paint(g, Cv, K.endo, null, '#f7b3bf', [150, 372, 175, 350], OUT, 4);
      const cav = new Path2D(); cav.moveTo(190, 415); cav.bezierCurveTo(195, 520, 225, 610, 245, 680); cav.bezierCurveTo(265, 610, 295, 520, 290, 415); cav.bezierCurveTo(260, 405, 220, 405, 190, 415); cav.closePath();
      g.save(); g.fillStyle = '#3a1e28'; g.fill(cav); g.restore();
      txt(g, 'uter', 235, 810, 20, C.cream);
      // trompa: istm îngust → ampulă largă → infundibul + fimbrii
      tube(g, TP.slice(0, 40), 22, '#f08aa0', { ow: 5, raw: true, lumen: '#3a1e28' });
      tube(g, TP.slice(36), 42, '#f08aa0', { ow: 5, raw: true, lumen: '#3a1e28' });
      for (let k = 0; k < 7; k++) { const q = -0.7 + k * 0.28; tube(g, [[850, 500], [850 + Math.cos(q) * 40, 520 + Math.sin(q) * 30 + 20], [850 + Math.cos(q) * 62, 540 + Math.sin(q) * 40 + 20]], 9, '#f08aa0', { ow: 3 }); }
      txt(g, 'istm', at(TP, 0.2)[0], 300, 18, '#ffd0dc'); txt(g, 'ampulă', at(TP, 0.66)[0], 262, 18, '#ffd0dc'); txt(g, 'fimbrii', 930, 470, 16, '#ffd0dc', { w: 800 });
      // ovarul cu foliculul care se rupe
      ell(g, OV[0], OV[1], 92, 58, '#cdb8f2', { ow: 5, shade: '#a98ae6', light: '#efe6ff' }); txt(g, 'ovar', OV[0], OV[1] + 88, 18, '#e9dcff');
      const rup = b.i < 0 ? 1 : b.i === 0 ? sp(p0, 0.1, 0.45) : 1;
      if (rup < 1) ell(g, OV[0] + 30, OV[1] - 34, 30, 26, '#ffd2e1', { ow: 4 });
      // conceptusul pe drum
      let pos = null, n = 1, lab = '';
      if (b.i < 0) { const u = loopT(t, 10); const tt = u * 4; if (tt < 1) { pos = at(TP, lerp(1, STOP.amp, ease(tt))); n = 0; } else if (tt < 3) { pos = at(TP, lerp(STOP.amp, STOP.d4, ease((tt - 1) / 2))); n = tt < 1.6 ? 1 : tt < 2.3 ? 2 : 16; } else { pos = [lerp(at(TP, STOP.d4)[0], 214, ease(tt - 3)), lerp(at(TP, STOP.d4)[1], 560, ease(tt - 3))]; n = 99; } }
      else if (b.i === 0) { const u = sp(p0, 0.35, 1); pos = u < 0.5 ? [lerp(OV[0] + 30, 875, u * 2), lerp(OV[1] - 34, 560, u * 2)] : at(TP, lerp(1, 0.94, (u - 0.5) * 2)); n = 0; lab = 'ovocitul II'; }
      else if (b.i === 1) { pos = at(TP, lerp(0.94, STOP.amp, sp(p1, 0, 0.4))); n = p1 > 0.75 ? 1 : 0; lab = p1 > 0.75 ? 'zigot (2n) · ziua 0' : 'fecundabil ~24 h'; }
      else if (b.i === 2) { const u = p2; pos = at(TP, lerp(STOP.amp, STOP.d4, u)); n = u < 0.35 ? 2 : 16; lab = u < 0.35 ? 'ziua 1–2: 2 celule' : u < 0.85 ? 'ziua 3: morula' : 'ziua 4: intră în uter'; }
      else { const u = sp(p3, 0, 0.6); const s0 = at(TP, STOP.d4); pos = [lerp(s0[0], 214, u), lerp(s0[1], 560, u)]; n = u > 0.4 ? 99 : 16; lab = u > 0.95 ? 'ziua 6–7: implantare' : 'blastocist'; }
      // spermatozoizii urcă (punctul 2)
      if (b.i === 1 || b.i < 0) for (let k = 0; k < 6; k++) { const u = b.i === 1 ? clamp(sp(p1, 0, 0.7) - k * 0.05) : loopT(t + k * 0.4, 4); const q = at(TP, lerp(0, STOP.amp - 0.02, u)); sperm(g, q[0] - 18, q[1] + (k - 3) * 4, 0.42, q[2] + 0, t + k, { alpha: b.i === 1 ? 1 - sp(p1, 0.7, 0.85) : Math.sin(u * Math.PI) }); }
      if (pos) {
        if (n === 0) oocyte(g, pos[0], pos[1], 22, t, { corona: true });
        else if (n === 99) { const imp = b.i === 3 ? sp(p3, 0.6, 1) : 0; blastocyst(g, pos[0] - 18 * imp, pos[1], 22, t, { zona: imp < 0.2 }); }
        else cleave(g, pos[0], pos[1], 22, n, t);
        if (lab) txt(g, lab, b.i === 3 ? 470 : pos[0], b.i === 3 ? 600 : pos[1] - 58, 18, C.hi);
        if (b.i === 3 && p3 > 0.95) { lead(g, 400, 600, pos[0] + 20, pos[1], 1); txt(g, 'în endometrul secretor', 470, 630, 16, '#ffd6dc', { w: 700 }); }
      }
      if (b.i === 1 && p1 > 0.75) { polar(g, pos[0] + 20, pos[1] - 20, 7, t); }
      // reperele zilelor pe trompă
      [[STOP.amp, 'ziua 0'], [STOP.d12, 'ziua 1–2'], [STOP.d3, 'ziua 3'], [STOP.d4 + 0.04, 'ziua 4']].forEach(([u, s]) => { const q = at(TP, u); dot(g, q[0], q[1] + 48, 5, '#fff3e6', { ow: 0, alpha: 0.7 }); txt(g, s, q[0], q[1] + 70, 15, '#d8c4b8', { w: 700 }); });
      if (on(b, 1)) ring(g, at(TP, STOP.amp)[0], at(TP, STOP.amp)[1], 70, 60, ease(b.bt * 1.4));
      if (on(b, 3)) ring(g, 205, 560, 54, 54, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== TERATOMUL (secțiune prin tumoră; ca desenul macroscopic din LP)
   Un chist mare cu perete gros (galbui) și conținut cenușiu; jos pe perete, protuberanța Rokitansky (nodulul) din care cresc
   un smoc de păr (fire închise, ondulate, în sus în cavitate), dinți și os. 1 = peretele; 2 = firele de păr cresc; 3 = nodulul
   pulsează, apar dinții; 4 = originea: o celulă pluripotentă (CGP / epiblast) dă 3 săgeți spre cele 3 foițe →
   ectoderm (albastru: piele, păr, dinți), mezoderm (roșu: os, mușchi), endoderm (galben: epitelii). */
export function teratoma() {
  const CX = 590, CY = 420, RX = 300, RY = 250; const NOD = [590, 640];
  srand(23); const HAIR = Array.from({ length: 26 }, (_, k) => { const a = -Math.PI / 2 + (k / 25 - 0.5) * 2.0; const L = rr(170, 330); return { a, L, c: rr(-0.5, 0.5), ph: rr(0, 6) }; });
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[CX + RX - 10, CY - RY + 70], [CX - 40, 240], [NOD[0] + 120, NOD[1] + 20], [120, 290]],
    phase: (i) => ['peretele chistului', 'smocul de păr', 'protuberanța Rokitansky', 'originea: celule pluripotente'][i] || 'păr, os și dinți',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p1 = p(1), p2 = p(2), p3 = p(3);
      // peretele
      const outer = new Path2D(); outer.ellipse(CX, CY, RX, RY, -0.05, 0, 7);
      paint(g, outer, '#f2c86a', '#d9a640', '#fff0c4', bb(CX, CY, RX, RY), OUT, 7);
      const inner = new Path2D(); inner.ellipse(CX, CY - 6, RX - 34, RY - 30, -0.05, 0, 7);
      paint(g, inner, '#b9b2b8', '#9a929a', '#e6e0e4', bb(CX, CY, RX - 34, RY - 30), OUT, 4);
      if (on(b, 0)) { g.save(); g.globalAlpha = 0.5 + 0.5 * Math.sin(t * 4); g.strokeStyle = C.hi; g.lineWidth = 8; g.stroke(outer); g.restore(); }
      // nodulul Rokitansky
      const nb = 1 + (on(b, 2) ? 0.06 * Math.sin(t * 5) : 0);
      const nod = blob(NOD[0], NOD[1] - 10, 120 * nb, 60 * nb, 0, t, 0.06, 16, 3); paint(g, nod, '#f6d58a', '#d9a640', '#fff3cf', bb(NOD[0], NOD[1] - 10, 120, 60), OUT, 5);
      // firele de păr
      const hl = Math.max(p1, b.i < 0 || b.i > 1 ? 1 : 0);
      HAIR.forEach(({ a, L, c, ph }, k) => {
        const pts = []; const len = L * hl; for (let j = 0; j <= 10; j++) { const u = j / 10; const sw = Math.sin(u * 3 + ph + (REDUCED ? 0 : t * 0.6)) * 12 * u; pts.push([NOD[0] + (k - 12.5) * 5 + Math.cos(a + c * u) * len * u + sw, NOD[1] - 50 + Math.sin(a + c * u) * len * u]); }
        if (len > 4) tube(g, pts, 3.2, '#2e2218', { ow: 0, raw: false });
      });
      // dinții + osul
      const ta = Math.max(p2, b.i < 0 || b.i > 2 ? 1 : 0);
      const tooth = (x, y, s, r) => { g.save(); g.translate(x, y); g.rotate(r); g.scale(s, s); const q = new Path2D(); q.moveTo(-14, 0); q.bezierCurveTo(-16, -26, 16, -26, 14, 0); q.lineTo(10, 18); q.lineTo(4, 6); q.lineTo(-4, 6); q.lineTo(-10, 18); q.closePath(); paint(g, q, '#ffffff', '#dcd6cc', null, [-16, -26, 32, 44], OUT, 4 / s); g.restore(); };
      if (ta > 0) { g.save(); g.globalAlpha = ta; tooth(NOD[0] + 70, NOD[1] - 44, 1.1, 0.2); tooth(NOD[0] - 80, NOD[1] - 40, 1, -0.3); tooth(NOD[0] - 30, NOD[1] - 56, 0.9, 0.05); g.restore();
        const bone = new Path2D(); bone.moveTo(NOD[0] + 20, NOD[1] + 10); bone.bezierCurveTo(NOD[0] + 60, NOD[1] - 6, NOD[0] + 100, NOD[1] + 2, NOD[0] + 110, NOD[1] + 18); bone.bezierCurveTo(NOD[0] + 80, NOD[1] + 32, NOD[0] + 40, NOD[1] + 30, NOD[0] + 20, NOD[1] + 10); g.save(); g.globalAlpha = ta; paint(g, bone, K.bone, K.boneS, '#ffffff', [NOD[0] + 20, NOD[1] - 6, 90, 38], OUT, 4); g.restore(); }
      // etichetele (pe desen)
      txt(g, 'peretele chistului', CX + RX - 60, CY - RY - 10, 18, '#ffe9a8');
      if (hl > 0.5) txt(g, 'smoc de păr', CX - 150, 230, 18, C.cream);
      txt(g, 'protuberanța Rokitansky', NOD[0], NOD[1] + 92, 18, '#ffe9a8');
      if (ta > 0.5) { txt(g, 'dinți', NOD[0] + 128, NOD[1] - 70, 17, C.cream); txt(g, 'os', NOD[0] + 150, NOD[1] + 16, 17, C.cream); }
      // originea: celula pluripotentă → cele 3 foițe
      if (p3 > 0) {
        const ox = 140, oy = 200;
        g.save(); g.globalAlpha = p3; ell(g, ox, oy, 46, 42, K.cgp, { ow: 5, shade: K.cgpS, light: '#c8f5d9' }); ell(g, ox - 4, oy, 16, 16, '#1f6b3e', { ow: 0 }); g.restore();
        txt(g, 'CGP / epiblast\npluripotentă', ox, oy - 78, 16, '#c8f5d9', { alpha: p3 });
        const T3 = [[K.ecto, 'ectoderm: piele, păr, dinți', [CX - 60, 260]], [K.meso, 'mezoderm: os, mușchi', [NOD[0] + 70, NOD[1] + 14]], [K.endoL, 'endoderm: epitelii', [CX + RX - 60, CY + 40]]];
        T3.forEach(([col, n, [tx, ty]], k) => { const u = sp(p3, 0.15 + k * 0.15, 0.55 + k * 0.15); if (u <= 0) return; arr(g, ox + 40, oy + 10 + k * 14, lerp(ox + 40, tx - 18, u), lerp(oy + 10 + k * 14, ty - 14, u), col, 5, 1); dot(g, tx, ty, 13, col, { ow: 3, alpha: u }); });
        [[K.ecto, 'ectoderm · piele, păr, dinți'], [K.meso, 'mezoderm · os, mușchi'], [K.endoL, 'endoderm · epitelii']].forEach(([col, n], k) => { pill(g, 830, 760 + k * 50, 300, 40, col, n, { size: 15, alpha: sp(p3, 0.4 + k * 0.15, 0.7 + k * 0.15) }); });
      }
      if (on(b, 1)) ring(g, CX - 20, 360, 150, 140, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, NOD[0], NOD[1] - 10, 150, 80, ease(b.bt * 1.4));
    },
  };
}
