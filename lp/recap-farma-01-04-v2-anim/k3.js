// k3.js · scenele LP 3 (farmacodinamia): curbele doză–efect desenate live (doseResp), receptorii membranari pas cu pas (gCycle),
// același AMPc pe bronhie și pe inimă (ampOrgans), experimentele rulate live (gqGut), ochiul: pupila și umoarea apoasă (eye).
import { K, W, H, HOME, OUT, T, sg, ln, pop, back, lp, pulse, mix, hash, clamp, lerp, ease, RED, bgK, glowAt, hud, tx, tw, chip, cap, capSeq, Path, mol, comet, stream, arrowK, crossK, tick, panel, ring, shape, ellK, rectK, plot, trace, hline, pt, lens, bilayer, gpcr, gprotK, chan, ion, cloud, meter, dial, tubeX, chain, extra, blob, bb } from './kino.js';
import { heartK, kidneyK } from './body.js';
const cam = (x, y, z) => ({ x, y, z });
const tauOf = (tt, t0, t) => (tt >= 1e4 ? 100 + t : tt - t0);
function flow(g, path, tau, col, o = {}) { if (tau <= 0) return; const n = o.n ?? 5, sp = o.speed ?? 0.25, r = o.r ?? 7, a = o.alpha ?? 1; if (a <= 0.01) return; for (let k = 0; k < n; k++) { let u = tau * sp - k / n; if (u < 0) continue; u %= 1; const [x, y] = path.at(u); mol(g, x, y, r, col, { alpha: a * Math.min(1, u * 10, (1 - u) * 10), ow: 2.2, glow: 0.4, s: o.s, fs: o.fs }); } }
// receptor simplu „cupă” (pentru rânduri de receptori)
function cup(g, x, y, col, o = {}) { const s = o.s || 1; const p = new Path2D(); p.moveTo(x - 26 * s, y - 36 * s); p.lineTo(x - 14 * s, y); p.lineTo(x - 14 * s, y + 30 * s); p.lineTo(x + 14 * s, y + 30 * s); p.lineTo(x + 14 * s, y); p.lineTo(x + 26 * s, y - 36 * s); p.lineTo(x + 12 * s, y - 36 * s); p.lineTo(x, y - 12 * s); p.lineTo(x - 12 * s, y - 36 * s); p.closePath(); shape(g, p, col, { box: [x - 26 * s, y - 36 * s, 52 * s, 66 * s], ow: 4, glow: o.glow, gc: o.gc || K.hi, alpha: o.alpha }); }

/* ================= 1. CURBELE DOZĂ–EFECT ================= */
export function doseResp() {
  const sig = (x50, em, k = 1.3) => (x) => em / (1 + Math.exp(-(x - x50) * k));
  const fA = sig(6, 1), fN = sig(3.4, 1), fP = sig(6.2, 0.55), fI = (x) => -0.3 / (1 + Math.exp(-(x - 4.6) * 1.3)), fS = sig(8, 1);
  const caps = [[[0, 'substanța A: efectul crește cu doza, până la un maxim'], [2.6, 'substanța nouă: aceeași curbă, mutată la stânga'], [4.8, 'același efect cu o doză mai mică = potență mai mare']], [[0, 'altă substanță: oricât crești doza, efectul maxim e mai mic'], [2.6, 'diferența pe verticală = eficacitatea']], [[0, 'agonistul total ajunge la efectul maxim (α = 1)'], [2, 'agonistul parțial: răspuns maxim mai mic'], [4, 'agonistul invers: coboară sub activitatea bazală'], [6, 'antagonistul (α = 0): singur nu schimbă nimic']], [[0, 'agonistul B ocupă receptorii și îi activează'], [2.6, 'antagonistul competitiv ocupă același situs, fără să activeze'], [5.4, 'receptori ocupați, dar neactivați → efectul dispare']]];
  const RX = [170, 290, 410, 530, 650, 770];
  return {
    home: HOME, beatDur: 8, anchors: [[60, 470], [930, 250], [930, 380], [60, 720]],
    phase: (i) => ['potența', 'eficacitatea', 'tipurile de liganzi', 'antagonistul competitiv'][i] || 'doză → efect',
    draw(g, t, b) {
      const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3), intro = b.i < 0;
      bgK(g, [[500, 300, 520, '#ffa23e', 0.07], [500, 760, 420, '#4fd18b', b.i === 3 ? 0.08 : 0]]);
      const pl = plot(g, { x: 140, y: 130, w: 730, h: 340, xmax: 10.4, ymax: 1.14, ymin: -0.42, xl: 'doza (crește →)', yl: 'efectul', yt: [[1, 'max']] });
      tx(g, 'activitatea bazală', pl.X(10.3), pl.Y(0) - 13, 13, K.dim, { align: 'right', w: 600 });
      const s1 = b.i >= 2 && !intro ? 1 - sg(T(b, 2), 0, 0.7) : 1; // primul set (cazul 1) se stinge când vin tipurile de liganzi
      // setul 1: A, „nou”, substanța cu efect maxim mai mic
      if (s1 > 0.01) { const uA = intro ? 1 : sg(t0, 0.4, 1.9), uN = intro ? 1 : sg(t0, 2.6, 1.9);
        trace(g, pl, fA, 0, 10, uA, '#e9e2f2', { w: 5, alpha: s1 }); if (uA >= 1) tx(g, 'A', pl.X(7.6), pl.Y(0.8), 20, '#e9e2f2', { alpha: s1, align: 'left' });
        trace(g, pl, fN, 0, 10, uN, K.drug, { w: 6, alpha: s1 }); if (uN >= 1) tx(g, 'nou', pl.X(4.2), pl.Y(0.92), 20, K.drug, { alpha: s1, align: 'right' });
        const q = intro ? 1 : sg(t0, 4.8, 0.9); if (q > 0) { const y = pl.Y(0.5); g.save(); g.globalAlpha = q * s1; g.strokeStyle = K.hi; g.lineWidth = 2.5; g.setLineDash([7, 6]); g.beginPath(); g.moveTo(pl.X(0), y); g.lineTo(pl.X(6), y); g.moveTo(pl.X(3.4), y); g.lineTo(pl.X(3.4), pl.Y(0)); g.moveTo(pl.X(6), y); g.lineTo(pl.X(6), pl.Y(0)); g.stroke(); g.setLineDash([]); g.strokeStyle = OUT; g.lineWidth = 15; g.lineCap = 'round'; g.beginPath(); g.moveTo(pl.X(3.4) + 8, y); g.lineTo(pl.X(6) - 8, y); g.stroke(); g.strokeStyle = K.hi; g.lineWidth = 9; g.stroke(); g.restore(); chip(g, pl.X(4.7), y - 30, 'y · potența', { size: 16, fill: '#3a2a12', line: K.hi, col: K.hi, alpha: q * s1 }); }
        const uP = intro ? 1 : sg(t1, 0.4, 1.9); trace(g, pl, fP, 0, 10, uP, '#6fb4ff', { w: 6, alpha: s1 });
        const q2 = intro ? 1 : sg(t1, 2.6, 0.9); if (q2 > 0) { const x = pl.X(9.8); g.save(); g.globalAlpha = q2 * s1; g.strokeStyle = OUT; g.lineWidth = 15; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, pl.Y(0.55) - 8); g.lineTo(x, pl.Y(1) + 8); g.stroke(); g.strokeStyle = '#6fb4ff'; g.lineWidth = 9; g.stroke(); g.restore(); chip(g, x - 96, pl.Y(0.78), 'x · eficacitatea', { size: 16, fill: '#12233a', line: '#6fb4ff', col: '#bfe0ff', alpha: q2 * s1 }); } }
      // setul 2: tipurile de liganzi
      if (b.i >= 2 && !intro) { const dim = b.i === 3 ? 0.35 : 1; const u = (k) => (b.i > 2 ? 1 : sg(t2, 0.5 + k * 2, 1.6));
        trace(g, pl, fN, 0, 10, u(0), K.drug, { w: 6, alpha: b.i === 3 ? 1 : 1 }); if (u(0) >= 1) tx(g, 'agonist total · α = 1', pl.X(5.2), pl.Y(1.05), 16, K.drug, { align: 'left' });
        trace(g, pl, fP, 0, 10, u(1), '#6fb4ff', { w: 6, alpha: dim }); if (u(1) >= 1) tx(g, 'agonist parțial · 0 < α < 1', pl.X(7.2), pl.Y(0.44), 16, '#6fb4ff', { alpha: dim });
        trace(g, pl, fI, 0, 10, u(2), K.x, { w: 6, alpha: dim }); if (u(2) >= 1) tx(g, 'agonist invers · −1 < α < 0', pl.X(7.4), pl.Y(-0.36), 16, K.x, { alpha: dim });
        trace(g, pl, () => 0.012, 0, 10, u(3), '#b9b0c4', { w: 4, alpha: dim, dash: [10, 8] }); if (u(3) >= 1) tx(g, 'antagonist · α = 0', pl.X(2.2), pl.Y(-0.12), 16, '#b9b0c4', { alpha: dim }); }
      // jos: cazul 1 (comprimatele) pe punctele 1–3, receptorii pe punctul 4
      if (b.i < 3) { const a = intro ? 1 : 1; panel(g, 110, 590, 780, 190, { alpha: a });
        const row = (y, name, c, n, q) => { tx(g, name, 180, y, 21, c, { alpha: a }); for (let k = 0; k < n; k++) { rectK(g, 240 + k * 62, y - 12, 48, 24, '#fff6ea', { r: 12, ow: 4, alpha: a }); rectK(g, 240 + k * 62, y - 12, 24, 24, c, { r: 12, ow: 4, alpha: a }); } arrowK(g, [[450, y], [540, y]], c, 5, q, { alpha: a }); chip(g, 680, y, 'același efect', { size: 17, fill: '#160d1c', line: c, col: c, alpha: a * q }); };
        row(640, 'A', '#e9e2f2', 3, 1); row(726, 'nou', K.drug, 1, intro ? 1 : b.i === 0 ? sg(t0, 5.4, 0.8) : 1); tx(g, 'cazul 1: doza zilnică mai mică, nu mai multe comprimate', 500, 812, 16, K.dim, { w: 600 }); }
      else { bilayer(g, 80, 880, 760, t, { h: 44, step: 16 }); tx(g, 'receptorii din centrul respirator bulbar (cazul 2)', 480, 846, 16, K.dim, { w: 600 });
        let act = 0; RX.forEach((x, k) => { const sw = sg(t3, 2.8 + k * 0.42, 0.7); act += 1 - sw; cup(g, x, 740, K.gs, { glow: (1 - sw) * 1.1 }); mol(g, x + sw * (40 + k * 6), 726 - sw * (90 + (k % 3) * 26), 18, K.drug, { s: 'B', glow: 0.5 * (1 - sw) }); if (sw > 0) { const ux = ease(sw); rectK(g, lerp(x - 180, x - 16, ux), lerp(560, 712, ux), 32, 26, '#6fb4ff', { r: 7, ow: 3.5, alpha: clamp(sw * 3) }); } });
        meter(g, 902, 610, 34, 170, 0.06 + 0.94 * (act / 6), K.drug, 'efect', { size: 15 }); chip(g, 300, 590, 'B = agonist', { size: 16, fill: '#3a2410', line: K.drug, col: K.drug, alpha: 1 }); chip(g, 620, 590, 'antagonist competitiv', { size: 16, fill: '#12233a', line: '#6fb4ff', col: '#bfe0ff', alpha: sg(t3, 2.6, 0.6) });
        const ex = sg(t3, 6, 1.6); trace(g, pl, fS, 0, 10, ex, '#3B82F6', { w: 5, dash: [10, 8] }); if (ex > 0.2) { arrowK(g, [[pl.X(4.3), pl.Y(0.72)], [pl.X(7.6), pl.Y(0.72)]], '#3B82F6', 4, clamp((ex - 0.2) * 2), { head: 9 }); extra(g, pl.X(5.4), pl.Y(0.18), 'în plus · nu e în LP: curba se mută la dreapta', clamp((ex - 0.3) * 2)); } }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: b.i === 3 ? 896 : 560, size: 19 }); g.restore();
    },
  };
}

/* ================= 2. RECEPTORII MEMBRANARI, PAS CU PAS (Gs · Gi · Gq · canal) ================= */
export function gCycle() {
  const MY = 290; const tabs = [['Gs · β1, β2, β3 (+ H2)', K.gs], ['Gi · α2, M2', K.gi], ['Gq · α1, M1,3 (+ H1)', K.gq], ['canal · N1, N2, GABA-A', K.ch]]; const TX = [140, 372, 598, 840];
  const caps = [
    [[0, 'agonistul se leagă: receptorul se activează'], [1.9, 'α schimbă GDP pe GTP și se desprinde de βγ'], [3.9, 'α-GTP pornește adenilat-ciclaza: ATP → AMPc'], [5.6, 'AMPc → PKA: inima bate mai tare, mușchiul neted se relaxează']],
    [[0, 'agonistul se leagă: receptorul se activează'], [1.9, 'α schimbă GDP pe GTP și se desprinde de βγ'], [3.9, 'α-GTP frânează adenilat-ciclaza: AMPc scade'], [5.6, 'M2: inima încetinește · α2 presinaptic: mai puțină NA']],
    [[0, 'agonistul se leagă: receptorul se activează'], [1.9, 'α schimbă GDP pe GTP și se desprinde de βγ'], [3.9, 'α-GTP pornește fosfolipaza C: PIP2 → IP3 + DAG'], [5.6, 'IP3 scoate Ca²⁺ din depozite, DAG pornește PKC: contracție']],
    [[0, 'fără proteină G: ligandul deschide direct canalul'], [1.6, 'N1, N2: Na⁺ intră în celulă'], [3.8, 'GABA-A: Cl⁻ intră în celulă']],
  ];
  const toPKA = new Path([[676, MY + 122], [660, MY + 190], [650, MY + 262]], { n: 8 }), atpIn = new Path([[440, MY + 236], [540, MY + 180], [640, MY + 116]], { n: 8 });
  function gStage(g, t, k, tt) { // k = 0 Gs, 1 Gi, 2 Gq; tt = −1 (repaus) sau timpul de joc
    const col = [K.gs, K.gi, K.gq][k]; const idle = tt < 0; const u1 = idle ? 0 : sg(tt, 0.3, 1), act = idle ? 0 : sg(tt, 1.1, 0.6), gtp = !idle && tt > 2.1, sp = idle ? 0 : sg(tt, 2.6, 1.2), en = idle ? 0 : sg(tt, 3.9, 0.5), fx = idle ? 0 : sg(tt, 5.6, 1.4);
    // enzima din fața internă a membranei
    const ename = k === 2 ? 'fosfolipaza C' : 'adenilat-ciclaza'; const ex = 650, ey = MY + 72; const inh = k === 1 ? en : 0; const pu = k !== 1 && en > 0.5 ? 1 + 0.05 * pulse(t, 0.5) : 1;
    ellK(g, ex, ey, 92 * pu, 50 * pu, k === 1 ? mix('#e8a8ff', '#8d7fa0', inh) : '#e8a8ff', { ow: 5, shade: '#b871d6', glow: k !== 1 ? en * 0.9 : 0, gc: col }); tx(g, ename, ex + 14, ey, 18, '#2a1534', { stroke: false }); if (inh) crossK(g, ex + 86, ey - 40, 18, inh);
    // receptorul + ligandul
    gpcr(g, 230, MY, col, { act, s: 1.45 }); tx(g, ['β1, β2, β3', 'α2 · M2', 'α1 · M1,3'][k], 96, MY - 64, 19, col, {});
    if (!idle) mol(g, 230, lerp(110, MY - 82, ease(u1)), 24, K.drug, { glow: 0.6 + act * 0.5, s: 'L' });
    // proteina G: α pleacă spre enzimă
    gprotK(g, 262, MY + 106, col, { s: 1.3, split: sp, dx: 278, dy: -8, tok: gtp ? 'GTP' : 'GDP', glow: gtp ? 0.6 : 0, name: ['αs', 'αi', 'αq'][k] });
    if (k < 2) { // AMPc
      const base = k === 1 ? 1 - en * 0.86 : en; const tau = idle ? 0 : k === 1 ? 100 + t : tauOf(tt, 4, t);
      if (k === 1 || en > 0) { flow(g, atpIn, tau, '#d9c9a0', { n: 3, speed: 0.4, r: 8, alpha: base }); flow(g, toPKA, tau - 0.3, K.camp, { n: 5, speed: 0.34, r: 9, alpha: base }); }
      chip(g, 470, MY + 250, 'ATP', { size: 14, fill: '#2a2414', line: '#d9c9a0', col: '#d9c9a0', alpha: idle ? 0.4 : 1 }); chip(g, 770, MY + 196, k === 1 ? 'AMPc ↓' : 'AMPc ↑', { size: 20, fill: '#0f2a33', line: K.camp, col: K.camp, alpha: idle ? 0.3 : k === 1 ? 0.4 + 0.6 * en : en, glow: en > 0.5 && fx < 1 ? 0.5 : 0 });
      chip(g, 650, MY + 296, 'PKA', { size: 23, fill: k === 0 && fx > 0.3 ? '#3a2a12' : '#221528', line: k === 0 ? K.hi : K.faint, col: k === 0 && fx > 0.3 ? K.hi : K.dim, lw: 3, alpha: 1, glow: k === 0 ? fx * 0.6 : 0 });
    } else { // PIP2 → IP3 + DAG
      const cut = idle ? 0 : sg(tt, 4.3, 0.6); mol(g, 742, MY + 22, 12, K.hi, { alpha: 1 - cut, s: '' }); tx(g, 'PIP2', 742, MY - 6, 13, '#6b4a2a', { stroke: false, alpha: 1 - cut });
      const ip = idle ? 0 : sg(tt, 4.6, 1.4); if (cut > 0.3) { const p3 = new Path([[742, MY + 30], [760, MY + 130], [770, MY + 236]], { n: 8 }); const [x, y] = p3.at(ip); mol(g, x, y, 15, K.hi, { s: 'IP3', fs: 10, glow: 0.7 }); const dx = lerp(742, 866, ip); ellK(g, dx, MY + 20, 20, 11, K.gq, { ow: 3.5 }); tx(g, 'DAG', dx, MY + 21, 11, '#2a1534', { stroke: false }); }
      rectK(g, 690, MY + 240, 170, 80, '#3d2f55', { r: 40, ow: 5, oc: '#8f78d4' }); tx(g, 'depozit de Ca²⁺', 775, MY + 340, 14, K.dim, { w: 700 });
      const rel = idle ? 0 : sg(tt, 5.8, 0.8); for (let m = 0; m < 6; m++) { const hx = 716 + (m % 3) * 56, hy = MY + 264 + Math.floor(m / 3) * 30; const out = m % 2 === 0 ? rel : 0; ion(g, hx - out * (120 + m * 22), hy + out * (40 + (m % 3) * 34) + Math.sin(t * 2 + m) * 3, 'Ca²⁺', K.ca, 13, { glow: out * 0.8 }); }
      ellK(g, 880, MY + 64, 44, 26, '#e8a8ff', { ow: 4, shade: '#b871d6', glow: ip >= 1 ? 0.8 : 0, gc: K.gq }); tx(g, 'PKC', 880, MY + 64, 16, '#2a1534', { stroke: false });
      chip(g, 520, MY + 330, 'Ca²⁺ ↑', { size: 17, fill: '#2f2a10', line: K.ca, col: K.ca, alpha: rel });
    }
    // efectul pe organ (jos)
    const ya = 800;
    if (k === 0) { arrowK(g, [[590, MY + 300], [470, MY + 380], [400, 716]], K.hi, 4, fx, { head: 9 }); arrowK(g, [[690, MY + 300], [780, MY + 380], [820, 700]], K.hi, 4, fx, { head: 9 });
      const hb = RED ? 0 : Math.pow(Math.max(0, Math.sin(t * 1.2 * Math.PI * 2)), 6) * (0.05 + 0.13 * fx); heartK(g, 380, 770, 1.25 + hb, { glow: fx * 0.5 }); tx(g, 'miocard: contracție ↑', 380, 850, 17, K.ink, { alpha: 0.5 + 0.5 * fx });
      tubeX(g, 820, 772, 58, 0.25 + 0.7 * fx); tx(g, 'mușchi neted: relaxare', 820, 850, 17, K.ink, { alpha: 0.5 + 0.5 * fx }); }
    if (k === 1) { arrowK(g, [[590, MY + 300], [470, MY + 380], [400, 716]], K.gi, 4, fx, { head: 9 }); arrowK(g, [[690, MY + 300], [780, MY + 380], [820, 700]], K.gi, 4, fx, { head: 9 });
      const hb = RED ? 0 : Math.pow(Math.max(0, Math.sin(t * lerp(1.3, 0.6, fx) * Math.PI * 2)), 6) * 0.1; heartK(g, 380, 770, 1.25 + hb, {}); tx(g, 'M2 · cord: cardioinhibiție', 380, 850, 17, K.ink, { alpha: 0.5 + 0.5 * fx });
      ellK(g, 800, 760, 50, 40, K.na, { ow: 5, shade: '#c9772a' }); rectK(g, 790, 690, 20, 40, K.na, { r: 6, ow: 5 }); const nn = Math.round(lerp(6, 1, fx)); stream(g, new Path([[800, 790], [840, 830], [900, 840]], { n: 6 }), t, '#ff6f4a', { n: nn, speed: 0.4, r: 7 }); tx(g, 'α2 presinaptic: ↓ NA', 800, 850, 17, K.ink, { alpha: 0.5 + 0.5 * fx }); }
    if (k === 2) { arrowK(g, [[500, MY + 352], [430, MY + 400], [380, 716]], K.gq, 4, fx, { head: 9 }); const c = fx; const w = lerp(150, 96, c), h = lerp(26, 44, c); const p = new Path2D(); p.ellipse(360, 772, w, h, 0, 0, 7); shape(g, p, K.muscle, { shade: K.muscleS, box: [360 - w, 772 - h, w * 2, h * 2], ow: 5, glow: fx * 0.5, gc: K.gq }); ellK(g, 360, 772, 22, 10, '#6b2a6e', { ow: 3 }); tx(g, 'mușchi neted: contracție', 360, 850, 17, K.ink, { alpha: 0.5 + 0.5 * fx }); }
  }
  return {
    home: HOME, beatDur: 8, anchors: TX.map((x) => [x, 150]),
    phase: (i) => (i < 0 ? 'receptorii membranari' : ['Gs → AMPc ↑', 'Gi → AMPc ↓', 'Gq → IP3 + DAG', 'receptorii-canal'][i]),
    draw(g, t, b) {
      const k = b.i < 0 ? 0 : b.i; const tt = b.i < 0 ? -1 : b.bt; const col = tabs[k][1];
      bgK(g, [[420, 300, 480, col, 0.1], [600, 760, 380, col, 0.06]]);
      tabs.forEach(([s, c], m) => chip(g, TX[m], 100, s, { size: 15, fill: b.i === m ? '#2a1d10' : 'rgba(20,12,28,.86)', line: b.i === m ? c : 'rgba(255,255,255,.2)', col: b.i === m ? c : K.dim, lw: b.i === m ? 3.5 : 2, glow: b.i === m ? 0.5 : 0 }));
      tx(g, 'în afara celulei', 880, MY - 70, 15, K.dim, { w: 600 }); tx(g, 'în celulă', 900, MY + 60 + (k === 2 ? 46 : 0), 15, K.dim, { w: 600, alpha: k === 2 ? 0 : 1 });
      bilayer(g, 0, 1000, MY, t);
      if (k < 3) gStage(g, t, k, tt);
      else { // receptorii-canal
        const o1 = sg(tt, 1.2, 0.5), o2 = sg(tt, 3.4, 0.5);
        cloud(g, 9, 190, 150, 300, 80, t, 'Na⁺', K.na, 13, 3); cloud(g, 9, 560, 150, 300, 80, t, 'Cl⁻', K.cl, 13, 5); cloud(g, 2, 220, MY + 90, 240, 60, t, 'Na⁺', K.na, 13, 8, { alpha: 0.8 }); cloud(g, 2, 580, MY + 90, 240, 60, t, 'Cl⁻', K.cl, 13, 9, { alpha: 0.8 });
        chan(g, 340, MY, o1, K.ch, { glow: o1 * 0.8, s: 1.5 }); chan(g, 700, MY, o2, '#57d0a8', { glow: o2 * 0.8, gc: '#57d0a8', s: 1.5 });
        mol(g, 290, lerp(120, MY - 78, sg(tt, 0.3, 0.9)), 19, K.drug, { s: 'L', glow: 0.6 }); mol(g, 650, lerp(120, MY - 78, sg(tt, 2.5, 0.9)), 19, K.drug, { s: 'L', glow: 0.6 });
        if (o1 > 0.5) flow(g, new Path([[340, MY - 90], [340, MY], [336, MY + 110], [300, MY + 200]], { n: 8 }), tauOf(tt, 1.6, t), K.na, { n: 4, speed: 0.5, r: 13, s: 'Na⁺', fs: 11 });
        if (o2 > 0.5) flow(g, new Path([[700, MY - 90], [700, MY], [704, MY + 110], [740, MY + 200]], { n: 8 }), tauOf(tt, 3.8, t), K.cl, { n: 4, speed: 0.5, r: 13, s: 'Cl⁻', fs: 11 });
        tx(g, 'N1, N2', 340, MY + 250, 22, K.ch, {}); tx(g, 'canal de Na⁺', 340, MY + 282, 17, K.ink, { w: 700 }); tx(g, 'GABA-A', 700, MY + 250, 22, '#57d0a8', {}); tx(g, 'canal de Cl⁻ (LP 4)', 700, MY + 282, 17, K.ink, { w: 700 });
        chip(g, 520, 700, 'fără proteină G · ionii trec cu gradientul', { size: 18, fill: '#2a2414', line: K.ch, col: K.hi, lw: 3, alpha: sg(tt, 0.2, 0.6) });
      }
      hud(g); if (b.i >= 0) capSeq(g, tt, caps[b.i], { y: 896, size: 19 }); g.restore();
    },
  };
}

/* ================= 3. ACELAȘI AMPc: BRONHIA (β2) ȘI INIMA (β1) ================= */
function strip(g, x, y, w, h, fn, u, col, title, o = {}) { const pl = plot(g, { x, y, w, h, xmax: 1, ymax: 1.25, alpha: o.alpha ?? 1, title, ts: 15, tc: K.dim, fs: 12 }); trace(g, pl, fn, 0, 1, u, col, { w: 4, n: 260, alpha: o.alpha }); if (o.mark !== undefined) { const xx = pl.X(o.mark); g.save(); g.globalAlpha = (o.alpha ?? 1) * 0.9; g.strokeStyle = o.mc || K.hi; g.lineWidth = 2.5; g.setLineDash([6, 5]); g.beginPath(); g.moveTo(xx, y); g.lineTo(xx, y + h); g.stroke(); g.restore(); tx(g, o.ml || '', xx + 6, y + 10, 13, o.mc || K.hi, { align: 'left', alpha: o.alpha }); } return pl; }
export function ampOrgans() {
  const caps = [[[0, 'S (agonist β2) ajunge la mușchiul neted bronșic'], [1.8, 'AMPc ↑ → PKA → Ca²⁺ scade în citoplasmă'], [4.4, 'mușchiul se relaxează: bronhia se lărgește']], [[0, 'același lanț în uter: contracțiile se sting'], [3.4, 'relaxarea uterului = efect tocolitic']], [[0, 'noradrenalina pe β1: AMPc → PKA → canalele de Ca²⁺ tip L'], [2.4, 'M ocupă β1 fără să-l activeze: intră mai puțin Ca²⁺'], [4.8, 'forța contracției scade']], [[0, 'în nodul sinusal, fără AMPc canalele HCN nu se activează'], [3, 'depolarizare mai mică: frecvența scade'], [5.6, 'în aparatul juxtaglomerular: mai puțină renină']]];
  const uterF = (s) => { const amp = lerp(1, 0.12, clamp((s - 0.38) / 0.25)); return 0.08 + amp * Math.pow(Math.max(0, Math.sin(s * Math.PI * 7)), 2); };
  const forceF = (s) => { const amp = lerp(1, 0.48, clamp((s - 0.4) / 0.2)); return 0.05 + amp * Math.pow(Math.max(0, Math.sin(s * Math.PI * 12)), 4); };
  const rateF = (s) => { const ph = s < 0.42 ? s * 12 : 0.42 * 12 + (s - 0.42) * 6.4; return 0.05 + 0.9 * Math.pow(Math.max(0, Math.sin(ph * Math.PI)), 4); };
  return {
    home: HOME, beatDur: 8, anchors: [[56, 96], [56, 640], [556, 96], [540, 640]],
    phase: (i) => ['cazul 3 · bronhia', 'cazul 3 · uterul', 'cazul 4 · miocardul', 'cazul 4 · nodul sinusal, rinichiul'][i] || 'efectul pe organ',
    draw(g, t, b) {
      const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3), intro = b.i < 0; const aL = intro || b.i < 2 ? 1 : 0.45, aR = intro || b.i >= 2 ? 1 : 0.45;
      bgK(g, [[250, 320, 360, K.gs, 0.1], [750, 320, 360, K.blood, 0.1]]);
      g.save(); g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 2; g.setLineDash([8, 8]); g.beginPath(); g.moveTo(500, 80); g.lineTo(500, 850); g.stroke(); g.restore();
      // ---- stânga: β2, mușchiul neted
      tx(g, 'β2 (Gs) + agonistul S', 270, 96, 21, K.gs, { alpha: aL });
      const op = intro ? 0.95 : lerp(0.2, 0.95, sg(t0, 4.2, 2.2)); tubeX(g, 250, 300, 128, op, { alpha: aL, glow: b.i === 0 ? 0.3 : 0, gc: K.gs }); tx(g, intro || t0 > 6 ? 'bronhodilatație' : 'bronhia', 250, 452, 18, K.ink, { alpha: aL });
      if (!intro && b.i === 0) for (let k = 0; k < 5; k++) { const an = -2.4 + k * 0.5; const u = sg(t0, 0.3 + k * 0.15, 1.2); mol(g, lerp(250 + Math.cos(an) * 320, 250 + Math.cos(an) * 112, u), lerp(300 + Math.sin(an) * 320, 300 + Math.sin(an) * 112, u), 15, K.drug, { s: 'S', glow: 0.6 }); }
      chain(g, 46, 500, [['AMPc ↑', K.camp], ['PKA', K.hi], ['Ca²⁺ ↓', K.ca], ['relaxare', K.gs]], (k) => (intro || b.i > 0 ? 1 : sg(t0, 1.8 + k * 0.7, 0.5)), { size: 17, alpha: aL, gap: 30 });
      // uterul + contracțiile
      { const a = intro || b.i === 1 ? 1 : b.i < 1 ? 0.3 : 0.45; const rel = intro ? 1 : sg(t1, 3, 2); g.save(); g.translate(120, 700); g.globalAlpha = a; const sq = 1 + (1 - rel) * 0.05 * Math.sin(t * 4); g.scale(1.25 * sq, 1.25 / sq); const p = new Path2D(); p.moveTo(-46, -44); p.quadraticCurveTo(0, -58, 46, -44); p.quadraticCurveTo(42, 14, 14, 38); p.lineTo(14, 62); p.lineTo(-14, 62); p.lineTo(-14, 38); p.quadraticCurveTo(-42, 14, -46, -44); p.closePath(); shape(g, p, '#e88a9a', { shade: '#c45d72', light: '#ffffff', box: [-46, -58, 92, 120], ow: 4 }); g.restore(); tx(g, 'uter', 120, 800, 16, K.dim, { alpha: a, w: 700 });
        strip(g, 262, 650, 190, 110, uterF, intro ? 1 : ln(t1, 0.4, 5.2), '#ff9fb0', 'contracțiile uterului', { alpha: a, mark: 0.38, ml: 'S' }); if (intro || t1 > 5.6) chip(g, 340, 820, 'efect tocolitic', { size: 17, fill: '#10301e', line: K.gs, col: K.gs, alpha: a * (intro ? 1 : pop(t1, 5.6)) }); }
      // ---- dreapta: β1, inima
      tx(g, 'β1 (Gs) + antagonistul M', 760, 96, 21, '#6fb4ff', { alpha: aR });
      const amp = intro ? 0.5 : b.i < 2 ? 1 : lerp(1, 0.45, sg(t2, 3.4, 2)); const hr = intro ? 0.7 : b.i < 3 ? 1.2 : lerp(1.2, 0.7, sg(t3, 2, 2.5));
      const hb = RED ? 0 : Math.pow(Math.max(0, Math.sin(t * hr * Math.PI * 2)), 6) * 0.22 * amp; heartK(g, 750, 300, 3 + hb * 3, { alpha: aR, glow: b.i >= 2 ? 0.25 : 0 });
      if (!intro && b.i >= 2) for (let k = 0; k < 4; k++) { const u = b.i > 2 ? 1 : sg(t2, 2.4 + k * 0.2, 1); const an = -2.6 + k * 0.7; rectK(g, lerp(750 + Math.cos(an) * 330, 750 + Math.cos(an) * 104, u) - 15, lerp(296 + Math.sin(an) * 330, 296 + Math.sin(an) * 100, u) - 13, 30, 26, '#6fb4ff', { r: 7, ow: 3.5, alpha: aR }); tx(g, 'M', lerp(750 + Math.cos(an) * 330, 750 + Math.cos(an) * 104, u), lerp(296 + Math.sin(an) * 330, 296 + Math.sin(an) * 100, u) + 1, 15, '#12233a', { stroke: false, alpha: aR }); }
      { const off = (k) => (intro || b.i > 2 ? 1 : b.i < 2 ? 0 : sg(t2, 2.8 + k * 0.5, 0.5)); chain(g, 524, 500, [['AMPc', K.camp], ['PKA', K.hi], ['Ca²⁺ tip L', K.ca], ['contracție', K.bloodL]], (k) => (b.i < 2 && !intro ? 0.999 : 1 - off(k)), { size: 16, alpha: aR, gap: 26 }); if (intro || b.i >= 2) crossK(g, 512, 500, 13, intro ? 1 : sg(t2, 2.6, 0.5)); }
      strip(g, 572, 650, 180, 110, forceF, intro || b.i > 2 ? 1 : b.i === 2 ? ln(t2, 0.3, 6) : 0, K.bloodL, 'forța contracției', { alpha: aR * (b.i >= 2 || intro ? 1 : 0.5), mark: 0.4, ml: 'M', mc: '#6fb4ff' });
      strip(g, 806, 650, 160, 110, rateF, intro ? 1 : b.i === 3 ? ln(t3, 0.3, 6) : 0, K.hi, 'frecvența (HCN)', { alpha: aR * (b.i >= 3 || intro ? 1 : 0.5), mark: 0.42, ml: 'M', mc: '#6fb4ff' });
      { const q = intro ? 1 : b.i === 3 ? pop(t3, 5.6) : 0; if (q > 0) { kidneyK(g, 612, 836, 0.5, false, { alpha: clamp(q) }); chip(g, 742, 836, 'renina ↓', { size: 17, fill: '#12233a', line: '#6fb4ff', col: '#bfe0ff', alpha: clamp(q) }); } }
      if (intro || b.i >= 2) tx(g, intro || b.i === 3 || t2 > 5 ? 'cardioinhibiție' : 'miocardul', 750, 452, 18, K.ink, { alpha: aR });
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: 572, size: 18 }); g.restore();
    },
  };
}

/* ================= 4. EXPERIMENTELE RULATE LIVE: intestinul izolat și saliva ================= */
export function gqGut() {
  const S = (x) => 1 / (1 + Math.exp(-x * 4));
  const tone = (x) => 0.18 + 0.58 * S((x - 2) / 1) - 0.62 * S((x - 6.6) / 1.1); const cf = (x) => tone(x) + (0.035 + 0.07 * S(x - 2) - 0.085 * S(x - 6.6)) * Math.sin(x * 9);
  const lots = [['1 · ser fiziologic', 30, '#e9e2f2'], ['2 · pilocarpină', 50, K.gs], ['3 · atropină', 11, K.x], ['4 · pilocarpină + atropină', 29, '#ffd08a']]; const LXs = [140, 380, 620, 860];
  const caps = [[[0, 'în baie: fragment de intestin, 37 °C, oxigen'], [1.6, 'pilocarpina (agonist M1,3) intră în baie'], [3.4, 'IP3 → Ca²⁺: contracții fazice · DAG → PKC: tonus']], [[0, 'atropina (antagonist) ocupă aceiași receptori'], [2.6, 'pilocarpina nu mai poate acționa: intestinul se relaxează']], [[0, 'petele de salivă cresc de la 10 la 50 de minute'], [4.6, 'pilocarpina crește secreția, atropina o scade']], [[0, 'glandele au receptori M1,3 (Gq): agonistul crește secreția, antagonistul o scade']]];
  return {
    home: HOME, beatDur: 8, anchors: [[60, 110], [530, 110], [60, 640], [930, 560]],
    phase: (i) => ['cazul 5 · pilocarpina', 'cazul 5 · atropina', 'cazul 6 · saliva', 'cazul 6 · de ce'][i] || 'experimentele',
    draw(g, t, b) {
      const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3), intro = b.i < 0;
      bgK(g, [[250, 330, 360, '#fff2b0', 0.07], [500, 740, 520, '#7fc8ff', 0.06]]);
      const xe = intro ? 10 : b.i === 0 ? 5 * ln(t0, 0.6, 6.4) : b.i === 1 ? 5 + 5 * ln(t1, 0.4, 6) : 10; const c = cf(xe);
      const aT = intro || b.i < 2 ? 1 : 0.5;
      // ---- baia de organ
      g.save(); g.globalAlpha = aT; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(250, 130); g.lineTo(250, 230 + c * 70); g.stroke(); g.strokeStyle = '#d9d2e2'; g.lineWidth = 2.5; g.stroke(); rectK(g, 196, 112, 108, 22, '#8d7fa0', { r: 8, ow: 4 }); g.restore(); tx(g, 'traductor', 250, 96, 13, K.dim, { w: 600, alpha: aT });
      rectK(g, 120, 180, 260, 340, 'rgba(210,235,255,.1)', { r: 26, ow: 5, oc: '#9fc3e6', alpha: aT }); g.save(); g.globalAlpha = aT * 0.5; g.fillStyle = '#fff2b0'; g.beginPath(); g.roundRect(128, 216, 244, 296, 20); g.fill(); g.restore();
      for (let k = 0; k < 6; k++) { const ph = lp(t + k * 0.9, 3.4); ring(g, 160 + (k % 3) * 80 + Math.sin(t * 2 + k) * 6, 500 - ph * 270, 5 + (k % 2) * 3, '#dff1ff', aT * (1 - ph) * 0.8, 2); }
      { const y0 = 230 + c * 70, y1 = 470; const n = 12; const pts = []; for (let k = 0; k <= n; k++) pts.push([250 + Math.sin(k * 1.1 + t * 2.4) * (10 + c * 12), lerp(y0, y1, k / n)]); const P = new Path(pts, { n: 4 }); P.stroke(g, 26 + c * 10, K.gut, { ow: 7, alpha: aT, glow: c > 0.5 ? 0.4 : 0, gc: K.gs, core: 'rgba(255,255,255,.16)' }); rectK(g, 236, 468, 28, 16, '#8d7fa0', { r: 5, ow: 4, alpha: aT }); }
      chip(g, 250, 546, '37 °C · O₂ · izotonie, izoionie', { size: 13, fill: '#1c1a10', line: '#fff2b0', col: '#fff2b0', alpha: aT });
      const drop = (tt, col, s, x) => { if (tt < 0 || tt > 1e3) return; const u = ln(tt, 0.9, 0.8); if (u < 1) { rectK(g, x - 9, 120, 18, 60, '#dff1ff', { r: 6, ow: 4 }); mol(g, x, lerp(184, 250, ease(u)), 11, col, { s, glow: 0.7 }); } else ring(g, x, 250, 12 + (tt - 1.7) * 60, col, clamp(1 - (tt - 1.7) / 1.2), 4); };
      if (b.i === 0) drop(t0, K.gs, 'P', 180); if (b.i === 1) drop(t1, K.x, 'A', 320);
      // ---- înregistrarea (kimograf)
      const pl = plot(g, { x: 500, y: 180, w: 440, h: 290, xmax: 10.2, ymax: 1.12, xl: 'timp', alpha: aT, title: 'contractilitatea intestinului, înregistrată în timp', ts: 16, tc: K.dim });
      trace(g, pl, cf, 0, 10, xe / 10, K.gut, { w: 5, n: 300, alpha: aT });
      const mk = (x, s, col, on) => { if (!on) return; const xx = pl.X(x); g.save(); g.globalAlpha = aT; g.strokeStyle = col; g.lineWidth = 2.5; g.setLineDash([6, 5]); g.beginPath(); g.moveTo(xx, 186); g.lineTo(xx, 470); g.stroke(); g.restore(); chip(g, xx + 4, 198, s, { size: 13, fill: '#160d1c', line: col, col, alpha: aT }); };
      mk(1.5, 'pilocarpină', K.gs, xe > 1.5); mk(6, 'atropină', K.x, xe > 6);
      if (intro || t0 > 4.6) { const q = intro ? 1 : sg(t0, 4.6, 0.6); tx(g, 'fazică (IP3 → Ca²⁺)', pl.X(4.2), pl.Y(0.98), 13, K.hi, { alpha: aT * q }); tx(g, 'tonică (DAG → PKC)', pl.X(4.2), pl.Y(0.5), 13, K.gq, { alpha: aT * q }); }
      // ---- saliva: 4 loturi
      const aS = intro || b.i >= 2 ? 1 : 0.4; const gr = intro || b.i === 3 ? 1 : b.i === 2 ? ln(t2, 0.5, 4) : 0;
      tx(g, 'hârtia de filtru: pata de salivă', 500, 628, 16, K.dim, { w: 700, alpha: aS }); const min = Math.round(10 + gr * 40); chip(g, 880, 628, min + ' min', { size: 15, fill: '#160d1c', line: K.hi, col: K.hi, alpha: aS * (gr > 0 ? 1 : 0.4) });
      lots.forEach(([s, r, col], k) => { const x = LXs[k]; ellK(g, x, 730, 66, 66, '#f4eee2', { ow: 5, alpha: aS, shade: '#ddd3c0' }); const rr = r * (0.25 + 0.75 * ease(gr)) * (gr > 0 ? 1 : 0.25); shape(g, blob(x, 730, rr, rr * 0.92, 0, 0, 0.08, 12, k + 2), '#9fd3f0', { box: bb(x, 730, rr, rr), ow: 3, oc: '#5f9fc4', alpha: aS }); tx(g, s, x, 822, 14, col, { w: 700, alpha: aS, maxW: 226 }); });
      { const q = intro ? 1 : b.i === 2 ? pop(t2, 5) : b.i > 2 ? 1 : 0; chip(g, 500, 866, '2  >  1 ≈ 4  >  3', { size: 21, fill: '#3a2a12', line: K.hi, col: K.hi, lw: 3.5, alpha: clamp(q), glow: b.i === 2 ? 0.5 : 0 }); }
      if (b.i === 3) { const q = (k) => sg(t3, 0.4 + k * 0.6, 0.5); chain(g, 96, 594, [['pilocarpina: agonist M1,3 (Gq)', K.gs], ['secreție ↑', K.gs]], q, { size: 15 }); chain(g, 560, 594, [['atropina: antagonist', K.x], ['secreție ↓', K.x]], (k) => q(k + 2), { size: 15 }); }
      hud(g); if (b.i >= 0 && b.i < 3) capSeq(g, T(b, b.i), caps[b.i], { y: b.i < 2 ? 590 : 590, size: 18 }); g.restore();
    },
  };
}

/* ================= 5. OCHIUL: PUPILA ȘI DRUMUL UMORII APOASE ================= */
export function eye() {
  const EX = 250, EY = 330, IR = 150;
  const caps = [[[0, 'pilocarpina (agonist M) contractă mușchiul circular'], [2.6, 'pupila se strânge: mioză']], [[0, 'atropina (antagonist M) relaxează mușchiul circular'], [2.6, 'pupila se lărgește: midriază']], [[0, 'adrenalina (α1) contractă mușchiul radial'], [2.6, 'pupila e trasă spre margine: midriază activă']], [[0, 'umoarea: corp ciliar → camera posterioară → pupilă → camera anterioară'], [3.4, 'iese prin rețeaua trabeculară în canalul Schlemm'], [6, 'agoniștii M deschid drumul: presiunea intraoculară scade']]];
  const names = ['pilocarpină', 'atropină', 'adrenalină']; const cols = [K.gs, K.x, K.na];
  // secțiunea prin partea anterioară a ochiului (corneea în stânga)
  const CX = 740, CY = 330, SC = 1.55; const L = (x, y) => [CX + x * SC, CY + y * SC];
  // umoarea: corpul ciliar → camera posterioară (între iris și cristalin) → pupilă (între marginea irisului și cristalin) → camera anterioară → unghi → rețeaua trabeculară → canalul Schlemm
  const up = new Path([L(30, -78), L(18, -64), L(9, -46), L(5, -30), L(3, -9), L(-10, -6), L(-28, -16), L(-46, -42), L(-54, -70), L(-50, -88), L(-44, -100)], { n: 10 }), dn = new Path([L(30, 78), L(18, 64), L(9, 46), L(5, 30), L(3, 9), L(-10, 6), L(-28, 16), L(-46, 42), L(-54, 70), L(-50, 88), L(-44, 100)], { n: 10 });
  return {
    home: HOME, beatDur: 8, anchors: [[60, 100], [60, 150], [60, 200], [540, 100]],
    phase: (i) => ['iepurele 1 · pilocarpină', 'iepurele 2 · atropină', 'iepurele 3 · adrenalină', 'presiunea intraoculară'][i] || 'pupila și PIO',
    draw(g, t, b) {
      const intro = b.i < 0; const tt = intro ? -1 : b.bt; const st = intro ? -1 : b.i === 3 ? 0 : b.i; const u = b.i > 2 ? 1 : sg(tt, 1.6, 2.2);
      bgK(g, [[EX, EY, 360, '#6fb4ff', 0.08], [CX, CY, 360, '#57d0a8', b.i === 3 ? 0.1 : 0.04]]);
      const aE = intro || b.i < 3 ? 1 : 0.5, aC = intro || b.i === 3 ? 1 : 0.5;
      // ---- ochiul din față
      const pr0 = 58; const target = st === 0 ? 26 : st === 1 ? 104 : st === 2 ? 104 : pr0; const pr = b.i === 3 ? 26 : lerp(pr0, target, u);
      const circ = st === 0 ? u : 0, rad = st === 2 ? u : 0, blockM = st === 1 ? u : 0;
      { const p = new Path2D(); p.moveTo(EX - 232, EY); p.quadraticCurveTo(EX, EY - 250, EX + 232, EY); p.quadraticCurveTo(EX, EY + 250, EX - 232, EY); p.closePath(); shape(g, p, '#f7f1ea', { box: [EX - 232, EY - 125, 464, 250], ow: 6, shade: '#d9cdc0', alpha: aE }); g.save(); g.clip(p); g.globalAlpha = aE;
        ellK(g, EX, EY, IR, IR, '#7a9ad6', { ow: 5, shade: '#4f6fae' });
        // fibrele radiale (dilatatorul) și inelul circular (sfincterul)
        g.lineCap = 'round'; for (let k = 0; k < 28; k++) { const an = (k / 28) * Math.PI * 2; g.strokeStyle = rad > 0.05 ? mix('#4a64a0', '#ffb347', rad) : '#4a64a0'; g.lineWidth = 3 + rad * 2.5; g.beginPath(); g.moveTo(EX + Math.cos(an) * (pr + 20), EY + Math.sin(an) * (pr + 20)); g.lineTo(EX + Math.cos(an) * (IR - 8), EY + Math.sin(an) * (IR - 8)); g.stroke(); }
        g.strokeStyle = OUT; g.lineWidth = 22; g.beginPath(); g.arc(EX, EY, pr + 10, 0, 7); g.stroke(); g.strokeStyle = blockM > 0.05 ? mix('#c96f8a', '#8d7fa0', blockM) : mix('#c96f8a', '#5fe08e', circ); g.lineWidth = 15; if (circ > 0.05) { g.shadowColor = K.gs; g.shadowBlur = 20 * circ; } g.stroke(); g.shadowBlur = 0;
        ellK(g, EX, EY, pr, pr, '#0a060e', { ow: 4 }); g.fillStyle = 'rgba(255,255,255,.75)'; g.beginPath(); g.ellipse(EX - pr * 0.35 - 10, EY - pr * 0.4 - 8, 12, 8, -0.6, 0, 7); g.fill(); g.restore(); g.save(); g.globalAlpha = aE; g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(p); g.restore(); }
      // săgețile de mișcare a mușchilor
      if (circ > 0.2) for (let k = 0; k < 4; k++) { const an = k * 1.57 + 0.78; arrowK(g, [[EX + Math.cos(an) * (pr + 54), EY + Math.sin(an) * (pr + 54)], [EX + Math.cos(an) * (pr + 22), EY + Math.sin(an) * (pr + 22)]], K.gs, 4, clamp(circ * 2 - 0.4), { head: 9, alpha: aE }); }
      if (rad > 0.2) for (let k = 0; k < 4; k++) { const an = k * 1.57 + 0.78; arrowK(g, [[EX + Math.cos(an) * (pr - 30), EY + Math.sin(an) * (pr - 30)], [EX + Math.cos(an) * (pr + 6), EY + Math.sin(an) * (pr + 6)]], K.na, 4, clamp(rad * 2 - 0.4), { head: 9, alpha: aE }); }
      // picătura
      if (!intro && b.i < 3 && tt < 2.4) { const du = ln(tt, 0.3, 1.1); mol(g, EX + 30, lerp(90, EY - 60, ease(du)), 13, cols[st], { glow: 0.7, alpha: du < 1 ? 1 : clamp(1 - (tt - 1.4) * 2) }); }
      tx(g, 'mușchiul circular (M3)', EX - 130, EY + 190, 15, circ > 0.3 ? K.gs : blockM > 0.3 ? '#b9b0c4' : K.dim, { w: 700, alpha: aE }); tx(g, 'mușchiul radial (α1)', EX + 130, EY + 190, 15, rad > 0.3 ? K.na : K.dim, { w: 700, alpha: aE });
      // cei 3 iepuri: rezultatele rămân afișate jos
      [0, 1, 2].forEach((k) => { const done = intro || b.i > k; const cur = b.i === k; const x = 100 + k * 150, y = 620; const r2 = done ? (k === 0 ? 7 : 24) : cur ? lerp(13, k === 0 ? 7 : 24, u) : 13; const a = done || cur ? 1 : 0.4; ellK(g, x, y, 40, 28, '#f7f1ea', { ow: 4, alpha: a }); ellK(g, x, y, 26, 26, '#7a9ad6', { ow: 3, alpha: a }); ellK(g, x, y, r2, r2, '#0a060e', { ow: 2.5, alpha: a }); tx(g, names[k], x, y + 48, 14, cols[k], { w: 700, alpha: a }); tx(g, done || (cur && u > 0.9) ? (k === 0 ? 'mioză' : k === 1 ? 'midriază' : 'midriază activă') : '', x, y + 68, 14, K.ink, { alpha: a }); });
      tx(g, 'ochiul stâng = martor', 250, 728, 14, K.dim, { w: 600, alpha: aE });
      // ---- secțiunea: drumul umorii apoase
      g.save(); g.globalAlpha = aC;
      { const cor = new Path([L(40, -112), L(-40, -100), L(-84, -50), L(-96, 0), L(-84, 50), L(-40, 100), L(40, 112)], { n: 12 }); cor.stroke(g, 20, '#cfe6ff', { ow: 7 }); cor.stroke(g, 20, '#f2e6da', { ow: 0, u0: 0, u1: 0.16 }); cor.stroke(g, 20, '#f2e6da', { ow: 0, u0: 0.84, u1: 1 }); }
      ellK(g, CX + 30 * SC, CY, 26 * SC, 60 * SC, '#e9f3ff', { ow: 5, shade: '#bcd4ee' }); // cristalinul
      const open = b.i === 3 ? sg(tt, 6, 1.6) : 0; const gap = 20 - open * 6;
      for (const d of [-1, 1]) { const ir = new Path([L(4, d * 92), L(-2 - open * 3, d * 60), L(2, d * gap)], { n: 6 }); ir.stroke(g, 15, '#7a9ad6', { ow: 6 }); const [bx, by] = L(34, d * 90); ellK(g, bx, by, 26, 20, '#e9a08a', { ow: 4, shade: '#c9745c' }); g.strokeStyle = '#d9d2e2'; g.lineWidth = 2; for (let m = 0; m < 3; m++) { g.beginPath(); g.moveTo(bx - 6, by - d * 14); g.lineTo(CX + 30 * SC + (m - 1) * 8, CY + d * 56 * SC); g.stroke(); }
        const [tx0, ty0] = L(-50, d * 88); rectK(g, tx0 - 16, ty0 - 8, 32, 16, '#b9d6ff', { r: 4, ow: 3 }); g.strokeStyle = OUT; g.lineWidth = 1.5; for (let m = 1; m < 4; m++) { g.beginPath(); g.moveTo(tx0 - 16 + m * 8, ty0 - 8); g.lineTo(tx0 - 16 + m * 8, ty0 + 8); g.stroke(); } const [sx, sy] = L(-44, d * 104); ellK(g, sx, sy, 9, 9, '#3a2a55', { ow: 3, oc: '#b9d6ff' }); }
      g.restore();
      const fa = b.i === 3 ? 1 : intro ? 0.9 : 0.35; const nfl = b.i === 3 ? 3 + Math.round(open * 4) : 3; stream(g, up, t, '#8fe8ff', { n: nfl, speed: 0.16, r: 6.5, alpha: fa * aC * 1.6 }); stream(g, dn, t + 1.7, '#8fe8ff', { n: nfl, speed: 0.16, r: 6.5, alpha: fa * aC * 1.6 });
      const lb = (s, x, y, al = 'center') => tx(g, s, CX + x * SC, CY + y * SC, 13, K.dim, { w: 700, alpha: aC, align: al });
      lb('cornee', -112, 0, 'right'); lb('camera\nanterioară', -50, 0); lb('cristalin', 34, 0); lb('corp ciliar', 76, -96, 'left'); lb('camera posterioară', 78, -58, 'left'); { g.save(); g.globalAlpha = aC * 0.8; g.strokeStyle = K.dim; g.lineWidth = 1.5; g.setLineDash([4, 4]); const [ax, ay] = L(74, -58), [bx2, by2] = L(12, -52); g.beginPath(); g.moveTo(ax, ay); g.lineTo(bx2, by2); g.stroke(); g.restore(); } lb('rețea trabeculară\n(spațiile Fontana)', -62, -128); lb('canal Schlemm', -62, 128);
      dial(g, 760, 690, 78, b.i === 3 ? lerp(0.62, 0.3, open) : 0.62, 'PIO', { alpha: aC, segs: [[0, 0.5, K.ok], [0.5, 1, K.warn]] });
      if (b.i === 3) { chip(g, 760, 762, 'agoniștii M1,3: PIO ↓', { size: 16, fill: '#10301e', line: K.gs, col: K.gs, alpha: pop(tt, 6.4) }); chip(g, 760, 806, 'antagoniștii M: PIO ↑ · antagoniștii β: umoare ↓', { size: 14, fill: '#160d1c', line: '#b9b0c4', col: K.ink, alpha: pop(tt, 7) }); }
      hud(g); if (b.i >= 0) capSeq(g, tt, caps[b.i], { y: 870, size: 18 }); g.restore();
    },
  };
}
