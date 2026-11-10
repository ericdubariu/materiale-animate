// k4.js · scenele LP 4: ionii, pompa și canalele (ions), GABA-A și placa motorie cu trasee live (synapses),
// tahifilaxia / down-regulation / up-regulation + rebound (adapt), alergia și șocul anafilactic pe organe (anaphyl),
// glucocorticoizii: din citoplasmă în nucleu până la PLA2 (gluco), reacțiile adverse din cazuri pe corp (raBody).
import { K, W, H, HOME, OUT, T, sg, ln, pop, back, lp, pulse, mix, hash, clamp, lerp, ease, RED, bgK, glowAt, hud, tx, tw, chip, cap, capSeq, Path, mol, comet, stream, arrowK, crossK, tick, panel, ring, shape, ellK, rectK, plot, trace, hline, pt, lens, bilayer, gpcr, gprotK, chan, ion, cloud, meter, dial, tubeX, chain, extra, blob, bb } from './kino.js';
import { drawBody, ORG, heartK } from './body.js';
const cam = (x, y, z) => ({ x, y, z });
const tauOf = (tt, t0, t) => (tt >= 1e4 ? 100 + t : tt - t0);
function flow(g, path, tau, col, o = {}) { if (tau <= 0) return; const n = o.n ?? 5, sp = o.speed ?? 0.25, r = o.r ?? 7, a = o.alpha ?? 1; if (a <= 0.01) return; for (let k = 0; k < n; k++) { let u = tau * sp - k / n; if (u < 0) continue; u %= 1; const [x, y] = path.at(u); mol(g, x, y, r, col, { alpha: a * Math.min(1, u * 10, (1 - u) * 10), ow: 2.2, glow: 0.4, s: o.s, fs: o.fs }); } }
function cup(g, x, y, col, o = {}) { const s = o.s || 1; const p = new Path2D(); p.moveTo(x - 26 * s, y - 36 * s); p.lineTo(x - 14 * s, y); p.lineTo(x - 14 * s, y + 30 * s); p.lineTo(x + 14 * s, y + 30 * s); p.lineTo(x + 14 * s, y); p.lineTo(x + 26 * s, y - 36 * s); p.lineTo(x + 12 * s, y - 36 * s); p.lineTo(x, y - 12 * s); p.lineTo(x - 12 * s, y - 36 * s); p.closePath(); shape(g, p, col, { box: [x - 26 * s, y - 36 * s, 52 * s, 66 * s], ow: 4, glow: o.glow, gc: o.gc || K.hi, alpha: o.alpha }); }
function enz(g, x, y, r, t, o = {}) { const a = o.alpha ?? 1; if (a <= 0.01) return; const bite = o.blocked ? 0.1 : 0.2 + 0.3 * pulse(t + x, 0.5); g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(o.rot || 0); g.fillStyle = o.col || '#ffd36e'; g.strokeStyle = OUT; g.lineWidth = 3.5; g.lineJoin = 'round'; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, r, bite, Math.PI * 2 - bite); g.closePath(); g.fill(); g.stroke(); g.restore(); }
const gaus = (x, m, s) => Math.exp(-((x - m) * (x - m)) / (2 * s * s));

/* ================= 1. IONII, POMPA, CANALUL, RECEPTORUL-CANAL ================= */
export function ions() {
  const MY = 430; const caps = [[[0, 'afară: mult Na⁺, Cl⁻ și Ca²⁺ · în celulă: mult K⁺ și anioni']], [[0, 'pompa duce ionul din partea cu puțin în partea cu mult'], [3, 'împotriva gradientului: consumă ATP']], [[0, 'canalul lasă ionul să curgă de unde e mult spre unde e puțin'], [3, 'cu gradientul: fără energie']], [[0, 'ligandul se așază pe receptorul-canal'], [1.8, 'canalul se deschide: ionii curg cu gradientul'], [4, 'sarcinile din celulă se schimbă → răspuns']]];
  const up = new Path([[300, MY + 130], [300, MY + 40], [300, MY - 40], [300, MY - 130]], { n: 6 }), dn = new Path([[560, MY - 130], [560, MY - 30], [560, MY + 40], [556, MY + 140]], { n: 6 }), dn2 = new Path([[800, MY - 130], [800, MY - 30], [800, MY + 40], [796, MY + 150]], { n: 6 });
  return {
    home: HOME, beatDur: 8, camSpeed: 2.4, cams: [HOME, cam(330, 430, 1.4), cam(560, 430, 1.4), cam(730, 510, 1.25)],
    anchors: [[60, 140], [300, MY - 150], [560, MY - 150], [800, MY - 150]],
    phase: (i) => ['distribuția ionilor', 'pompa · transport activ', 'canalul · transport pasiv', 'receptorul-canal'][i] || 'ionii și membrana',
    draw(g, t, b) {
      const intro = b.i < 0; const tt = intro ? -1 : b.bt; const A = (k) => (intro || b.i === 0 || b.i === k ? 1 : 0.4);
      bgK(g, [[500, 250, 520, K.na, 0.08], [500, 650, 520, K.k, 0.09]]);
      rectK(g, -60, MY, 1120, 620, '#221a30', { r: 0, ow: 0 });
      tx(g, 'în afara celulei', 860, 122, 20, K.ink, { w: 800 }); tx(g, 'în celulă', 880, 826, 20, K.ink, { w: 800 });
      cloud(g, 10, 60, 160, 880, 180, t, 'Na⁺', K.na, 15, 1); cloud(g, 7, 60, 170, 880, 170, t, 'Cl⁻', K.cl, 15, 2); cloud(g, 3, 100, 180, 800, 150, t, 'Ca²⁺', K.ca, 15, 3); cloud(g, 1, 400, 220, 200, 60, t, 'K⁺', K.k, 15, 4);
      cloud(g, 10, 60, 520, 880, 150, t, 'K⁺', K.k, 15, 5); cloud(g, 5, 80, 530, 840, 130, t, 'A⁻', K.an, 19, 6); cloud(g, 1, 380, 560, 200, 60, t, 'Na⁺', K.na, 15, 7); cloud(g, 1, 640, 600, 200, 60, t, 'Cl⁻', K.cl, 15, 8);
      rectK(g, 150, 706, 260, 84, '#3d2f55', { r: 42, ow: 5, oc: '#8f78d4' }); cloud(g, 4, 180, 730, 200, 36, t, 'Ca²⁺', K.ca, 14, 9); tx(g, 'Ca²⁺ în depozite', 280, 812, 15, K.dim, { w: 700 });
      bilayer(g, -20, 1020, MY, t);
      // pompa
      { const a = A(1); const cyc = lp(t, 2.4); const sq = 1 + 0.06 * Math.sin(cyc * Math.PI * 2); const p = new Path2D(); p.roundRect(300 - 46 * sq, MY - 62, 92 * sq, 124, 24); shape(g, p, '#b58cff', { shade: '#8a5fd6', box: [254, MY - 62, 92, 124], ow: 5, alpha: a, glow: b.i === 1 ? 0.5 : 0 }); tx(g, 'pompă', 300, MY, 17, '#2a1534', { stroke: false, alpha: a });
        if (b.i === 1 || intro) { stream(g, up, t, K.na, { n: 3, speed: 1 / 2.4, r: 15 }); const fl = Math.max(0, 1 - cyc * 2.4); chip(g, 392, MY + 92, 'ATP', { size: 17, fill: K.hi, col: '#20102a', line: OUT, glow: fl, scale: 1 + fl * 0.25, alpha: a }); arrowK(g, [[214, MY + 110], [214, MY - 110]], '#ff8a7a', 7, intro ? 1 : sg(tt, 0.4, 1), { alpha: a }); tx(g, 'împotriva\ngradientului', 150, MY - 150, 15, '#ffb3a8', { w: 700, alpha: (intro ? 1 : sg(tt, 1, 0.6)) }); } }
      // canalul
      { const a = A(2); chan(g, 560, MY, 1, K.ch, { alpha: a, s: 1.4, glow: b.i === 2 ? 0.5 : 0 }); if (b.i === 2 || intro) { stream(g, dn, t, K.na, { n: 4, speed: 0.5, r: 15 }); arrowK(g, [[640, MY - 110], [640, MY + 110]], K.ok, 7, intro ? 1 : sg(tt, 0.4, 1), { alpha: a }); tx(g, 'cu gradientul', 700, MY + 150, 15, '#bff5d6', { w: 700, alpha: intro ? 1 : sg(tt, 1, 0.6) }); } tx(g, 'canal', 560, MY + 92, 16, K.ch, { alpha: a }); }
      // receptorul-canal
      { const a = A(3); const dock = b.i === 3 ? sg(tt, 0.4, 1.1) : intro ? 1 : 0; const op = b.i === 3 ? sg(tt, 1.6, 0.6) : intro ? 1 : 0; chan(g, 800, MY, op, '#57d0a8', { alpha: a, s: 1.4, glow: op * 0.7, gc: '#57d0a8' }); if (dock > 0) mol(g, lerp(880, 754, ease(dock)), lerp(200, MY - 74, ease(dock)), 19, K.drug, { s: 'L', glow: 0.6 }); tx(g, 'receptor-canal', 906, MY + 64, 16, '#8ff0d0', { alpha: a });
        if (op > 0.5) flow(g, dn2, intro ? 100 + t : tauOf(tt, 2, t), K.na, { n: 4, speed: 0.55, r: 15 });
        const pa = b.i === 3 ? sg(tt, 2.6, 0.6) : intro ? 1 : 0; const pl = plot(g, { x: 660, y: 640, w: 270, h: 110, xmax: 1, ymax: 1.1, alpha: pa, title: 'sarcinile din celulă', ts: 15, tc: K.dim }); trace(g, pl, (s) => 0.25 + 0.6 / (1 + Math.exp(-(s - 0.4) * 14)), 0, 1, intro ? 1 : ln(tt, 3.2, 2.6), K.hi, { w: 5, alpha: pa }); chip(g, 880, 700, 'răspuns', { size: 15, fill: '#3a2a12', line: K.hi, col: K.hi, alpha: intro ? 1 : b.i === 3 ? pop(tt, 5.6) : 0 }); }
      hud(g); if (b.i >= 0) capSeq(g, tt, caps[b.i], { y: 896, size: 19 }); g.restore();
    },
  };
}

/* ================= 2. GABA-A ȘI PLACA MOTORIE ================= */
export function synapses() {
  const X2 = 1000, MY = 330, M2 = 410; const NX = [X2 + 300, X2 + 440, X2 + 580];
  const caps = [[[0, 'agonistul A se leagă de receptorul GABA-A'], [1.8, 'canalul de Cl⁻ se deschide: Cl⁻ intră în neuron'], [3.6, 'interiorul devine mai negativ: hiperpolarizare (PPSI)']], [[0, 'potențialul de acțiune ajunge la terminație: veziculele eliberează ACh'], [2.4, 'ACh deschide N2: Na⁺ intră în fibră → depolarizare'], [4.4, 'potențial de acțiune → se contractă întreaga fibră']], [[0, 'inhibitorul blochează acetilcolinesteraza'], [2.2, 'ACh nu mai e descompusă: rămâne în fantă'], [4.4, 'N2 se tot deschide: efect prelungit']], [[0, 'curarizantul ocupă N2'], [2.2, 'ACh nu se mai poate lega: Na⁺ nu intră'], [4.4, 'fără potențial de acțiune: mușchiul rămâne relaxat']]];
  const vm1 = (s) => 30 - 12 / (1 + Math.exp(-(s - 0.42) * 18)); // −70 → −82 (desenat ca +100)
  const ap = (s, m) => 80 * gaus(s, m, 0.018) + 34 * gaus(s, m - 0.05, 0.04);
  const vmA = (s) => 10 + ap(s, 0.42), vmB = (s) => 10 + 24 / (1 + Math.exp(-(s - 0.25) * 30)) + 80 * (gaus(s, 0.34, 0.018) + gaus(s, 0.52, 0.018) + gaus(s, 0.7, 0.018) + gaus(s, 0.88, 0.018)), vmC = (s) => 10 + 3 * gaus(s, 0.42, 0.05);
  const ves = [[-90, -40], [-30, -70], [40, -60], [100, -30], [-60, 10], [60, 16]];
  return {
    home: HOME, beatDur: 9, camSpeed: 2.2, cams: [HOME, cam(X2 + 500, 467, 1), cam(X2 + 500, 467, 1), cam(X2 + 500, 467, 1)],
    anchors: [[60, 110], [X2 + 60, 110], [X2 + 60, 360], [X2 + 60, 430]],
    phase: (i) => ['cazul 1 · GABA-A', 'cazul 2 · ACh pe N2', 'cazul 2 · anticolinesterazice', 'cazul 2 · curarizante'][i] || 'receptori-canal',
    draw(g, t, b) {
      const intro = b.i < 0; const tt = intro ? -1 : b.bt; const t0 = T(b, 0);
      bgK(g, [[440, 300, 480, K.cl, 0.09], [X2 + 440, 300, 520, K.ch, 0.08]]);
      // ---- ecranul 1: GABA-A
      rectK(g, -60, MY, 1060, 240, '#221a30', { r: 0, ow: 0 }); tx(g, 'în afara neuronului', 860, 124, 18, K.dim, { w: 700 }); tx(g, 'în neuron', 130, MY + 110, 18, K.dim, { w: 700 });
      cloud(g, 13, 120, 150, 720, 110, t, 'Cl⁻', K.cl, 15, 11); cloud(g, 2, 200, MY + 90, 500, 60, t, 'Cl⁻', K.cl, 15, 12);
      bilayer(g, -20, 1000, MY, t);
      { const dock = intro ? 1 : sg(t0, 0.4, 1.1), op = intro ? 1 : sg(t0, 1.7, 0.6); chan(g, 440, MY, op, '#57d0a8', { s: 1.7, glow: op * 0.8, gc: '#57d0a8' }); tx(g, 'GABA-A', 500, MY + 110, 20, '#8ff0d0', { align: 'left' }); mol(g, lerp(250, 384, ease(dock)), lerp(110, MY - 88, ease(dock)), 21, K.drug, { s: 'A', glow: 0.6 });
        if (op > 0.5) flow(g, new Path([[440, MY - 130], [440, MY - 20], [440, MY + 60], [470, MY + 170]], { n: 6 }), intro ? 100 + t : tauOf(t0, 2, t), K.cl, { n: 4, speed: 0.5, r: 15, s: 'Cl⁻', fs: 12 });
        const pl = plot(g, { x: 170, y: 640, w: 680, h: 150, xmax: 1, ymax: 46, ymin: 8, yt: [[30, '−70 mV'], [18, '−82']], title: 'potențialul de membrană al neuronului', ts: 16, tc: K.dim, box: true }); hline(g, pl, 30, '#b9b0c4', 'repaus', { size: 13, w: 2 });
        trace(g, pl, vm1, 0, 1, intro ? 1 : ln(t0, 1.2, 4.6), '#8ff0d0', { w: 5, base: 8 }); chip(g, 640, 768, 'hiperpolarizare · PPSI', { size: 16, fill: '#0f2a26', line: '#57d0a8', col: '#8ff0d0', alpha: intro ? 1 : pop(t0, 5.4) }); }
      // ---- ecranul 2: placa motorie
      const k = b.i; const on2 = k >= 1; const t1 = k === 1 ? tt : -1;
      const rel = k === 1 ? sg(tt, 0.8, 1.2) : k >= 2 ? 1 : 0; const inh = k === 2 ? sg(tt, 0.5, 1) : 0; const cur = k === 3 ? sg(tt, 0.5, 1.1) : 0;
      const open = k === 1 ? sg(tt, 2.4, 0.5) : k === 2 ? 1 : k === 3 ? 1 - cur : 0; const con = k === 1 ? sg(tt, 4.4, 0.9) : k === 2 ? 1 : k === 3 ? 1 - sg(tt, 2.6, 1.6) : 0;
      // axonul + terminația
      { const p = new Path2D(); p.moveTo(X2 + 400, 60); p.lineTo(X2 + 400, 130); p.bezierCurveTo(X2 + 230, 150, X2 + 220, 320, X2 + 300, 330); p.lineTo(X2 + 580, 330); p.bezierCurveTo(X2 + 660, 320, X2 + 650, 150, X2 + 480, 130); p.lineTo(X2 + 480, 60); p.closePath(); shape(g, p, '#ffe08a', { shade: '#d1b04f', box: [X2 + 220, 60, 440, 270], ow: 6, glow: k === 1 && tt < 1.2 ? 0.8 : 0, gc: K.hi }); tx(g, 'terminația nervoasă', X2 + 440, 306, 15, '#4a3a10', { stroke: false }); }
      if (k === 1 && tt < 1.4) { const u = ln(tt, 0, 1); ring(g, X2 + 440, 60 + u * 200, 30, K.hi, 1 - u, 6); }
      ves.forEach(([dx, dy], m) => { const out = m % 2 === 0 ? rel : 0; const vx = X2 + 440 + dx, vy = 230 + dy + out * (70 - dy * 0.6); ellK(g, vx, vy, 24, 24, '#fff3c8', { ow: 4, alpha: 1 - out * 0.9 }); for (let q = 0; q < 3; q++) mol(g, vx + Math.cos(q * 2.1 + m) * 9, vy + Math.sin(q * 2.1 + m) * 9, 6, K.gs === 0 ? '' : '#3fe0c5', { ow: 1.5, alpha: 1 - out }); });
      tx(g, 'fanta sinaptică', X2 + 800, 366, 14, K.dim, { w: 700 });
      // ACh în fantă
      if (on2 && rel > 0.3) { const nA = k === 2 ? 14 : k === 3 ? 8 : 9; for (let m = 0; m < nA; m++) { const bx = X2 + 250 + hash(m * 3) * 380, by = 352 + hash(m * 7) * 28; const gone = k === 1 ? sg(tt, 5.6 + (m % 3) * 0.4, 0.8) * (m % 3 ? 1 : 0) : 0; const tgt = m < 3 && k !== 3; const x = tgt ? lerp(bx, NX[m] - 20, open) : bx + Math.sin(t * 2 + m) * 8, y = tgt ? lerp(by, M2 - 62, open) : by + Math.cos(t * 2.3 + m) * 6; mol(g, x, y, 9, '#3fe0c5', { alpha: clamp((rel - 0.3) * 3) * (1 - gone), ow: 2, glow: 0.4 }); } tx(g, 'ACh', X2 + 208, 366, 15, '#3fe0c5', { alpha: rel }); }
      // acetilcolinesteraza (mușcă) / acoperită de inhibitor
      [[X2 + 700, 356, 2.6], [X2 + 180, 392, -0.4], [X2 + 730, 392, 3.4]].forEach(([x, y, rot], m) => { enz(g, x, y, 17, t + m, { rot, blocked: inh > 0.5 }); if (inh > 0) rectK(g, x - 15 + Math.cos(rot) * 12, lerp(y - 90, y - 12, ease(inh)) + Math.sin(rot) * 6, 30, 24, K.x, { r: 8, ow: 3.5, alpha: clamp(inh * 3) }); }); tx(g, 'acetilcolinesteraza', X2 + 800, 420, 13, '#ffe9b0', { w: 700, alpha: on2 || intro ? 1 : 0.6 });
      // membrana fibrei + N2
      rectK(g, X2, M2, 1060, 560, '#2a1a22', { r: 0, ow: 0 }); bilayer(g, X2, X2 + 1020, M2, t);
      NX.forEach((x, m) => { chan(g, x, M2, open, K.ch, { s: 1.35, glow: open * 0.7 }); if (cur > 0) { rectK(g, x - 34, lerp(M2 - 200, M2 - 86, ease(cur)), 30, 26, '#8fb4d9', { r: 7, ow: 3.5, alpha: clamp(cur * 3) }); crossK(g, x + 20, M2 - 78, 9, cur > 0.9 ? 1 : 0); } if (open > 0.5 && k !== 3) flow(g, new Path([[x, M2 - 60], [x, M2 + 30], [x + (m - 1) * 16, M2 + 110]], { n: 5 }), k === 1 ? tauOf(tt, 2.7, t) + m * 0.2 : 50 + t + m * 0.3, K.na, { n: 2, speed: 0.8, r: 12, s: 'Na⁺', fs: 9 }); });
      tx(g, 'N2', X2 + 660, M2 + 2, 20, K.ch, {}); cloud(g, 4, X2 + 60, 350, 120, 30, t, 'Na⁺', K.na, 12, 21); cloud(g, 3, X2 + 820, 384, 120, 14, t, 'Na⁺', K.na, 12, 22);
      // fibra musculară (se scurtează)
      { const w = lerp(600, 470, con), h = lerp(110, 140, con); const fx = X2 + 440 - w / 2, fy = 566 - h / 2; rectK(g, fx, fy, w, h, K.muscle, { r: 24, ow: 6, shade: K.muscleS, glow: con * 0.5, gc: K.na }); g.save(); g.strokeStyle = 'rgba(120,30,50,.6)'; g.lineWidth = 3; for (let m = 1; m < 16; m++) { const x = fx + (w * m) / 16; g.beginPath(); g.moveTo(x, fy + 8); g.lineTo(x, fy + h - 8); g.stroke(); } g.restore(); tx(g, con > 0.6 ? 'fibra musculară: contracție' : 'fibra musculară', X2 + 440, 566, 17, '#fff3e6', {}); }
      // traseul potențialului
      { const f = k === 2 ? vmB : k === 3 ? vmC : vmA; const pl = plot(g, { x: X2 + 150, y: 700, w: 680, h: 124, xmax: 1, ymax: 140, yt: [[10, 'repaus']], title: 'potențialul fibrei musculare', ts: 15, tc: K.dim }); const u = k === 1 ? ln(tt, 2.2, 3.4) : k === 2 ? ln(tt, 1.6, 4.6) : k === 3 ? ln(tt, 1.6, 4) : intro ? 1 : 0; trace(g, pl, f, 0, 1, u, k === 3 ? '#8fb4d9' : K.na, { w: 4.5, n: 320 });
        if (k === 1 && tt > 4.2) tx(g, 'potențial de acțiune', pl.X(0.5), pl.Y(118), 14, K.hi, { align: 'left', alpha: sg(tt, 4.2, 0.5) }); }
      if (k === 2) chip(g, X2 + 470, 370, 'inhibitor de colinesterază', { size: 14, fill: '#2a1638', line: K.x, col: '#e3c6ff', alpha: pop(tt, 1.2) });
      if (k === 3) { chip(g, X2 + 190, 300, 'curarizant', { size: 15, fill: '#16222e', line: '#8fb4d9', col: '#cfe2f5', alpha: pop(tt, 0.6) }); extra(g, X2 + 800, 300, 'antidepolarizant · din manual', sg(tt, 1.6, 0.6), { size: 13 }); }
      hud(g); if (b.i >= 0) capSeq(g, tt, caps[b.i], { y: b.i === 0 ? 560 : 872, size: 18 }); g.restore();
    },
  };
}

/* ================= 3. TAHIFILAXIA · DOWN-REGULATION · UP-REGULATION + REBOUND ================= */
export function adapt() {
  const X2 = 1000, X3 = 2000; const DT = [0.7, 2.6, 4.5, 6.4]; const batch = [5, 4, 2, 1]; const resp = [1, 0.72, 0.34, 0.1];
  const caps = [[[0, 'efedrina eliberează noradrenalina din vezicule'], [2.6, 'la fiecare doză rămân mai puține vezicule'], [6.4, 'stocurile s-au epuizat: răspunsul aproape dispare']], [[0, 'agonistul stimulează receptorii luni la rând'], [2.4, 'celula retrage o parte din receptori'], [5.4, 'aceeași doză, efect mai mic']], [[0, 'antagonistul ține receptorii blocați'], [2, 'celula pune în membrană mai mulți receptori']], [[0, 'tratamentul e oprit brusc: antagonistul pleacă'], [1.8, 'noradrenalina găsește mai mulți receptori liberi'], [3.6, 'efect de rebound: criză hipertensivă']]];
  const RX2 = [0, 1, 2, 3, 4, 5].map((k) => X2 + 150 + k * 140); const gone = [1, 3, 4]; const RX3 = [X3 + 250, X3 + 500, X3 + 750], NX3 = [X3 + 125, X3 + 375, X3 + 625, X3 + 875];
  return {
    home: HOME, beatDur: 9, camSpeed: 2.2, cams: [HOME, cam(X2 + 500, 467, 1), cam(X3 + 500, 467, 1), cam(X3 + 500, 467, 1)],
    anchors: [[60, 110], [X2 + 60, 110], [X3 + 60, 110], [X3 + 60, 600]],
    phase: (i) => ['cazul 3 · tahifilaxie', 'cazul 4 · down-regulation', 'cazul 5 · up-regulation', 'cazul 5 · rebound'][i] || 'toleranța',
    draw(g, t, b) {
      const intro = b.i < 0; const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3);
      bgK(g, [[420, 300, 480, K.na, 0.08], [X2 + 500, 320, 520, K.gs, 0.08], [X3 + 500, 320, 520, K.gi, 0.08]]);
      // ---- ecranul 1: tahifilaxia
      { const p = new Path2D(); p.moveTo(250, 60); p.lineTo(250, 120); p.bezierCurveTo(60, 140, 60, 350, 180, 356); p.lineTo(440, 356); p.bezierCurveTo(560, 350, 560, 140, 370, 120); p.lineTo(370, 60); p.closePath(); shape(g, p, '#ffe08a', { shade: '#d1b04f', box: [60, 60, 500, 300], ow: 6 }); tx(g, 'terminația simpatică', 310, 152, 15, '#4a3a10', { stroke: false }); }
      let left = 12; const done = (k) => (intro ? 1 : sg(t0, DT[k], 1)); let cum = 0;
      for (let d = 0; d < 4; d++) { for (let m = 0; m < batch[d]; m++) { const id = cum + m; const u = done(d); const hx = 150 + (id % 6) * 64, hy = 190 + Math.floor(id / 6) * 70; if (u < 1) { ellK(g, hx, lerp(hy, 372, ease(u)), 22, 22, '#fff3c8', { ow: 4, alpha: 1 - u * 0.8 }); for (let q = 0; q < 3; q++) mol(g, hx + Math.cos(q * 2.1) * 8, lerp(hy, 372, ease(u)) + Math.sin(q * 2.1) * 8, 6, '#ff6f4a', { ow: 1.5 }); } if (u >= 1) left--; else if (u > 0) { /* în drum */ } } cum += batch[d];
        const tr = intro ? -1 : t0 - DT[d] - 0.8; if (tr > 0 && tr < 1.3) for (let m = 0; m < batch[d] * 2; m++) mol(g, 180 + ((m * 53) % 300), lerp(372, 446, clamp(tr / 0.8)) + (m % 3) * 6, 7, '#ff6f4a', { alpha: clamp(2 - tr * 1.6), glow: 0.5 });
        chip(g, 640 + (d % 2) * 150, 120 + Math.floor(d / 2) * 50, 'doza ' + (d + 1), { size: 15, fill: '#3a2410', line: K.drug, col: K.drug, alpha: intro ? 1 : pop(t0, DT[d] - 0.3) }); }
      tx(g, 'vezicule cu NA: ' + left, 310, 336, 15, '#4a3a10', { stroke: false }); tx(g, 'efedrină', 715, 80, 16, K.drug, {});
      rectK(g, 40, 440, 580, 70, '#5a3340', { r: 20, ow: 5 }); for (let m = 0; m < 4; m++) cup(g, 150 + m * 110, 446, K.gq, { s: 0.8 }); tx(g, 'mușchiul neted al vasului · α1 (Gq)', 330, 492, 15, '#ffd9dd', { w: 700 });
      // răspunsul la fiecare doză + vasul
      { const lastD = intro ? 3 : Math.max(-1, ...DT.map((d, k) => (t0 >= d + 0.9 ? k : -1))); const cur = lastD >= 0 ? resp[lastD] : 0; const bell = intro ? 1 : lastD >= 0 ? Math.min(1, (t0 - DT[lastD] - 0.9) * 2) : 0; tubeX(g, 800, 380, 96, 0.9 - 0.72 * cur * bell, { blood: true, t }); tx(g, 'vasul din mucoasa nazală', 800, 500, 15, K.dim, { w: 700 }); tx(g, 'vasoconstricție = decongestionare', 800, 522, 14, K.dim, { w: 600 });
        tx(g, 'răspunsul la fiecare doză', 330, 566, 17, K.ink, {}); g.save(); g.strokeStyle = 'rgba(255,243,230,.35)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(110, 800); g.lineTo(560, 800); g.stroke(); g.restore();
        for (let d = 0; d < 4; d++) { const q = intro ? 1 : pop(t0, DT[d] + 0.9, 0.5); const h = 190 * resp[d] * clamp(q); rectK(g, 140 + d * 104, 800 - Math.max(h, 2), 72, Math.max(h, 2), d === 3 ? '#8d7fa0' : K.drug, { r: 8, ow: 4, alpha: clamp(q) }); tx(g, 'doza ' + (d + 1), 176 + d * 104, 822, 14, K.dim, { w: 700 }); }
        chip(g, 800, 640, 'tahifilaxie', { size: 21, fill: '#3a2a12', line: K.hi, col: K.hi, lw: 3.5, alpha: intro ? 1 : pop(t0, 7.6) }); tx(g, 'toleranță acută', 800, 684, 15, K.dim, { w: 700, alpha: intro ? 1 : sg(t0, 7.8, 0.5) }); }
      // ---- ecranul 2: down-regulation
      { const MY2 = 360; rectK(g, X2, MY2, 1000, 600, '#221a30', { r: 0, ow: 0 }); bilayer(g, X2, X2 + 1000, MY2, t); tx(g, 'agonist β2 (substanța D), zi de zi', X2 + 500, 110, 19, K.drug, {});
        RX2.forEach((x, k) => { const g1 = gone.includes(k) ? (intro ? 1 : sg(t1, 2.4 + gone.indexOf(k) * 0.9, 1.4)) : 0; const y = MY2 + g1 * 170; if (g1 > 0.05) ring(g, x, y, 62, '#f3cf8a', g1 * 0.8, 6); gpcr(g, x, y, K.gs, { s: 0.95, alpha: 1 - g1 * 0.5, act: g1 > 0.3 ? 0 : 0.5 }); if (g1 < 0.3) flow(g, new Path([[x - 30 + (k % 2) * 60, 140], [x, 230], [x, MY2 - 60]], { n: 5 }), 30 + t + k * 0.4, K.drug, { n: 2, speed: 0.5, r: 10, s: 'D', fs: 9 }); });
        tx(g, 'receptori retrași în celulă', X2 + 640, MY2 + 262, 15, K.dim, { w: 700, alpha: intro ? 1 : sg(t1, 4.4, 0.6) });
        const pl = plot(g, { x: X2 + 150, y: 690, w: 500, h: 120, xmax: 1, ymax: 1.15, xl: 'luni', title: 'efectul bronhodilatator la aceeași doză', ts: 15, tc: K.dim }); trace(g, pl, (s) => 1 - 0.55 / (1 + Math.exp(-(s - 0.5) * 9)), 0, 1, intro ? 1 : ln(t1, 1, 6), K.gs, { w: 5 });
        chip(g, X2 + 800, 690, 'down-regulation', { size: 19, fill: '#10301e', line: K.gs, col: K.gs, lw: 3.5, alpha: intro ? 1 : pop(t1, 4.6) }); chip(g, X2 + 800, 744, 'doza ↑', { size: 16, fill: '#3a2410', line: K.drug, col: K.drug, alpha: intro ? 1 : pop(t1, 6.4) }); chip(g, X2 + 800, 792, '+ corticosteroizi', { size: 16, fill: '#3a2410', line: K.drug, col: K.drug, alpha: intro ? 1 : pop(t1, 7) }); }
      // ---- ecranul 3: up-regulation + rebound
      { const MY3 = 360; rectK(g, X3, MY3, 1060, 600, '#221a30', { r: 0, ow: 0 }); bilayer(g, X3, X3 + 1020, MY3, t); tx(g, 'antagonist β, tratament cronic', X3 + 500, 110, 19, '#6fb4ff', { alpha: b.i === 3 ? 1 - sg(t3, 0.4, 0.8) : 1 });
        const nw = intro ? 1 : b.i === 2 ? 1 : b.i === 3 ? 1 : 0; const off = b.i === 3 ? sg(t3, 0.5, 1.1) : 0; const na = b.i === 3 ? sg(t3, 1.8, 1.2) : 0;
        const all = [...RX3.map((x) => [x, 1]), ...NX3.map((x, k) => [x, intro || b.i === 3 ? 1 : b.i === 2 ? pop(t2, 2 + k * 0.7, 0.6) : 0])];
        all.forEach(([x, q], k) => { if (q <= 0.02) return; gpcr(g, x, MY3, K.gs, { s: 0.95 * Math.min(1.1, q), act: na, alpha: clamp(q) }); const by = lerp(MY3 - 74, MY3 - 300, ease(off)); rectK(g, x - 17, by - 14, 34, 28, '#6fb4ff', { r: 8, ow: 3.5, alpha: clamp(q) * (1 - off) }); if (na > 0) mol(g, x, lerp(120, MY3 - 62, ease(clamp(na * 1.3 - k * 0.04))), 15, '#ff6f4a', { s: 'NA', fs: 9, glow: 0.6 }); });
        chip(g, X3 + 500, 490, 'up-regulation: de la 3 la 7 receptori', { size: 18, fill: '#12233a', line: '#6fb4ff', col: '#bfe0ff', lw: 3, alpha: intro ? 1 : b.i === 2 ? pop(t2, 5) : b.i === 3 ? 1 : 0 });
        const pa = intro || b.i === 3 ? 1 : 0.35; const pl = plot(g, { x: X3 + 150, y: 620, w: 520, h: 170, xmax: 1, ymax: 1.25, xl: 'timp', yl: 'TA', alpha: pa }); hline(g, pl, 0.45, K.ok, 'tensiunea sub tratament', { alpha: pa, size: 13, align: 'left', lx: pl.X(0.02), dy: -12 });
        const f = (s) => 0.45 + 0.68 / (1 + Math.exp(-(s - 0.5) * 16)); const u = intro ? 1 : b.i === 3 ? ln(t3, 1.6, 4.4) : 0; trace(g, pl, f, 0, 1, u, K.warn, { w: 5.5, alpha: pa }); trace(g, pl, (s) => 0.45 + 0.1 / (1 + Math.exp(-(s - 0.5) * 6)), 0, 1, intro ? 1 : b.i === 3 ? ln(t3, 5.6, 2) : 0, K.ok, { w: 4, dash: [9, 7], alpha: pa });
        if (u > 0.3) { const xx = pl.X(0.3); g.save(); g.strokeStyle = K.ink; g.lineWidth = 2; g.setLineDash([5, 5]); g.beginPath(); g.moveTo(xx, 620); g.lineTo(xx, 790); g.stroke(); g.restore(); tx(g, 'oprire bruscă', xx + 6, 632, 13, K.ink, { align: 'left', w: 700 }); }
        chip(g, X3 + 820, 650, 'criză hipertensivă', { size: 17, fill: '#3a1418', line: K.warn, col: K.warn, lw: 3, alpha: intro ? 1 : b.i === 3 ? pop(t3, 4.6) : 0 }); chip(g, X3 + 820, 760, 'reducere treptată', { size: 16, fill: '#10301e', line: K.ok, col: K.ok, alpha: intro ? 1 : b.i === 3 ? pop(t3, 6.6) : 0 }); }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: 880, size: 18 }); g.restore();
    },
  };
}

/* ================= 4. ALERGIA ȘI ȘOCUL ANAFILACTIC ================= */
export function anaphyl() {
  const MX = 250, MYc = 430, MR = 136; const igA = [-2.6, -2.0, -1.4, -0.8, -0.2, 0.4, 1.0, 2.6];
  const caps = [[[0, 'la prima expunere, limfocitele B produc IgE'], [2.4, 'IgE se fixează pe mastocit: organismul e sensibilizat']], [[0, 'la reexpunere, antigenul se leagă de IgE de pe mastocit'], [2.6, 'mastocitul degranulează: eliberează histamina']], [[0, 'histamina ajunge la bronhii și la vase'], [2, 'H1 strânge bronhia · H1 + H2 dilată vasul'], [4.6, 'lichidul iese din vas (edem), tensiunea cade']], [[0, 'adrenalină intramuscular'], [1.8, 'α1 strânge vasul · β2 deschide bronhia'], [4.4, 'tensiunea revine']]];
  const gran = Array.from({ length: 18 }, (_, k) => [hash(k * 3 + 1) * 6.28, 30 + hash(k * 7 + 2) * 80]);
  const ta = (s) => (s < 0.5 ? 0.72 - 0.5 / (1 + Math.exp(-(s - 0.25) * 22)) : 0.22 + 0.46 / (1 + Math.exp(-(s - 0.75) * 22)));
  return {
    home: HOME, beatDur: 9, anchors: [[60, 110], [60, 250], [560, 110], [470, 800]],
    phase: (i) => ['sensibilizarea', 'degranularea', 'histamina pe organe', 'adrenalina'][i] || 'alergia și șocul',
    draw(g, t, b) {
      const intro = b.i < 0; const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3);
      bgK(g, [[MX, MYc, 380, '#b58cff', 0.12], [760, 400, 420, K.blood, 0.07]]);
      // limfocitul B + IgE
      ellK(g, 120, 160, 50, 50, '#8fb4ff', { ow: 5, shade: '#5c86d9', light: '#ffffff' }); ellK(g, 124, 164, 30, 30, '#4a5fb0', { ow: 3 }); tx(g, 'limfocit B', 120, 232, 15, K.dim, { w: 700 });
      const deg = intro ? 1 : b.i === 1 ? sg(t1, 2.8, 1.6) : b.i > 1 ? 1 : 0;
      // mastocitul
      shape(g, blob(MX, MYc, MR, MR * 0.96, 0, t * 0.3, 0.05 + deg * 0.03, 16, 4), '#c9a8ff', { shade: '#9a74d9', light: '#ffffff', box: bb(MX, MYc, MR, MR), ow: 6, glow: b.i === 1 && t1 > 2.4 && t1 < 4 ? 0.9 : 0, gc: K.hi }); ellK(g, MX - 20, MYc + 20, 46, 40, '#6b4fb0', { ow: 4 }); tx(g, 'mastocit', MX, MYc + MR + 52, 16, K.dim, { w: 700 });
      gran.forEach(([an, r], k) => { const out = clamp(deg * 1.5 - k * 0.03); const gx = MX + Math.cos(an) * r, gy = MYc + Math.sin(an) * r * 0.9; const far = 150 + k * 6; const ox = MX + Math.cos(an * 0.4 - 0.2) * far + out * 120, oy = MYc + Math.sin(an) * far * 0.8; const hx = lerp(gx, ox, ease(out)), hy = lerp(gy, oy, ease(out));
        let x = hx, y = hy; if (b.i >= 2 && !intro) { const u = b.i === 2 ? sg(t2, 0.2 + (k % 6) * 0.15, 1.6) : 1; const tgx = 760 + Math.cos(k * 1.3) * 120, tgy = (k % 2 ? 250 : 570) + Math.sin(k * 1.7) * 110; x = lerp(hx, tgx, u); y = lerp(hy, tgy, u); }
        mol(g, x + Math.sin(t * 1.5 + k) * 3 * out, y + Math.cos(t * 1.3 + k) * 3 * out, 9, '#7a3fd6', { glow: out * 0.6, ow: 2, alpha: intro && k > 8 ? 0.5 : 1 }); });
      igA.forEach((an, k) => { const u = intro ? 1 : sg(t0, 0.6 + k * 0.35, 1.2); if (u <= 0) return; const tx0 = MX + Math.cos(an) * (MR + 12), ty0 = MYc + Math.sin(an) * (MR * 0.96 + 12); const x = lerp(150, tx0, ease(u)), y = lerp(170, ty0, ease(u)); g.save(); g.translate(x, y); g.rotate(lerp(0, an + Math.PI / 2, u)); g.lineCap = 'round'; const Y = () => { g.beginPath(); g.moveTo(0, 16); g.lineTo(0, 0); g.lineTo(-11, -14); g.moveTo(0, 0); g.lineTo(11, -14); }; g.strokeStyle = OUT; g.lineWidth = 10; Y(); g.stroke(); g.strokeStyle = '#7fd36a'; g.lineWidth = 5.5; Y(); g.stroke(); g.restore(); });
      tx(g, 'IgE', 222, 128, 16, '#7fd36a', { alpha: intro ? 1 : sg(t0, 0.6, 0.6) });
      // antigenul (romburi) la reexpunere
      if (b.i >= 1 || intro) for (let k = 0; k < 4; k++) { const u = intro ? 1 : b.i === 1 ? sg(t1, 0.5 + k * 0.4, 1.2) : 1; const an = (igA[k * 2] + igA[k * 2 + 1]) / 2; const txp = MX + Math.cos(an) * (MR + 34), typ = MYc + Math.sin(an) * (MR + 34); const x = lerp(MX + Math.cos(an) * (MR + 300), txp, ease(u)), y = lerp(MYc + Math.sin(an) * (MR + 300), typ, ease(u)); g.save(); g.translate(x, y); g.rotate(0.78); rectK(g, -10, -10, 20, 20, K.drug, { r: 3, ow: 3.5, alpha: clamp(u * 3) }); g.restore(); }
      if (b.i === 1) chip(g, 470, 150, 'antigenul (antibioticul)', { size: 14, fill: '#3a2410', line: K.drug, col: K.drug, alpha: sg(t1, 0.3, 0.5) });
      if (deg > 0.3) tx(g, 'histamină', 470, 300, 17, '#c9a8ff', { alpha: clamp((deg - 0.3) * 2) });
      // organele
      const hist = intro ? 1 : b.i === 2 ? sg(t2, 2, 2.4) : b.i > 2 ? 1 : 0; const adr = intro ? 1 : b.i === 3 ? sg(t3, 1.8, 2.2) : 0;
      const aO = intro || b.i >= 2 ? 1 : 0.45;
      tubeX(g, 760, 250, 104, lerp(lerp(0.85, 0.15, hist), 0.85, adr), { alpha: aO, glow: b.i === 2 ? 0.3 : 0, gc: '#c9a8ff' }); tx(g, 'bronhie · H1 (Gq)', 760, 376, 16, K.ink, { alpha: aO });
      const leak = hist * (1 - adr * 0.8); for (let k = 0; k < 10; k++) { const an = k * 0.628; ellK(g, 760 + Math.cos(an) * (120 + leak * 22), 570 + Math.sin(an) * (120 + leak * 22), 12 * leak, 10 * leak, '#9fd3f0', { ow: 2.5, alpha: aO * leak }); }
      tubeX(g, 760, 570, 104, lerp(lerp(0.45, 0.98, hist), 0.5, adr), { alpha: aO, blood: true, t, mus: '#d0667a', lumen: '#5a1422', glow: b.i === 2 ? 0.3 : 0, gc: '#c9a8ff' }); tx(g, 'vas · H1 (Gq) + H2 (Gs)', 760, 700, 16, K.ink, { alpha: aO });
      // tensiunea arterială (traseu live)
      { const pl = plot(g, { x: 560, y: 760, w: 380, h: 84, xmax: 1, ymax: 0.95, alpha: aO, title: 'tensiunea arterială', ts: 14, tc: K.dim, box: false }); const u = intro ? 1 : b.i === 2 ? 0.5 * ln(t2, 2.6, 4.4) : b.i === 3 ? 0.5 + 0.5 * ln(t3, 2.2, 4.4) : 0; trace(g, pl, ta, 0, 1, u, u > 0.5 ? K.ok : K.warn, { w: 5, alpha: aO }); }
      // adrenalina
      if (b.i === 3 || intro) { const q = intro ? 1 : sg(t3, 0.2, 0.8); g.save(); g.globalAlpha = q; g.translate(450, 690); g.rotate(-0.5); rectK(g, -50, -13, 78, 26, '#dff1ff', { r: 6, ow: 4 }); g.fillStyle = K.na; g.fillRect(-44, -8, 50 * (intro ? 0.2 : 1 - sg(t3, 0.8, 1.2)), 16); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(28, 0); g.lineTo(56, 0); g.moveTo(-62, -14); g.lineTo(-62, 14); g.moveTo(-62, 0); g.lineTo(-50, 0); g.stroke(); g.restore();
        if (!intro) for (let k = 0; k < 6; k++) { const u = sg(t3, 1 + k * 0.15, 1.4); const tg = k % 2 ? [760 - 110, 250 + 40] : [760 - 110, 570 - 30]; mol(g, lerp(500, tg[0] + (k % 3) * 14, ease(u)), lerp(664, tg[1] + (k % 3) * 20, ease(u)), 12, K.na, { s: 'A', fs: 11, glow: 0.6, alpha: clamp(u * 4) }); }
        chip(g, 300, 760, 'adrenalină i.m. · 0,01 mg/kg (max. 0,5 mg)', { size: 15, fill: '#3a2410', line: K.na, col: K.na, lw: 3, alpha: q }); tx(g, 'repetată la 5 minute', 300, 800, 14, K.dim, { w: 700, alpha: q }); chip(g, 600, 250, 'β2', { size: 15, fill: '#10301e', line: K.gs, col: K.gs, alpha: adr }); chip(g, 600, 570, 'α1', { size: 15, fill: '#3a2410', line: K.gq, col: K.gq, alpha: adr }); }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: 884, size: 18 }); g.restore();
    },
  };
}

/* ================= 5. GLUCOCORTICOIZII ================= */
export function gluco() {
  const dna = (g, x0, x1, y, t, hre) => { g.save(); g.lineCap = 'round'; for (let s = 0; s < 2; s++) { g.strokeStyle = s ? '#8fd0ff' : '#ff9fb0'; g.lineWidth = 5; g.beginPath(); for (let x = x0; x <= x1; x += 4) { const yy = y + Math.sin((x - x0) * 0.07 + s * Math.PI) * 16; x === x0 ? g.moveTo(x, yy) : g.lineTo(x, yy); } g.stroke(); } g.strokeStyle = 'rgba(255,255,255,.45)'; g.lineWidth = 2; for (let x = x0 + 6; x < x1; x += 15) { const a = Math.sin((x - x0) * 0.07) * 16; g.beginPath(); g.moveTo(x, y + a); g.lineTo(x, y - a); g.stroke(); } if (hre > 0) { g.globalAlpha = hre; g.strokeStyle = K.hi; g.lineWidth = 4; g.shadowColor = K.hi; g.shadowBlur = 16; g.beginPath(); g.roundRect(300, y - 26, 80, 52, 12); g.stroke(); } g.restore(); };
  const caps = [[[0, 'hormonul steroid e lipofil: difuzează prin membrană'], [2.4, 'se leagă de receptorul din citoplasmă: complex activ']], [[0, 'complexul intră în nucleu și se leagă de ADN'], [2.2, 'transcripție: mRNA iese din nucleu'], [4.2, 'ribozomul traduce mRNA într-o proteină specifică']], [[0, 'proteina blochează fosfolipaza A2'], [2.4, 'fără acid arahidonic: nici leucotriene, nici prostaglandine']], [[0, 'leucotrienele strâng bronhia prin CysLT1 (Gq)'], [3, 'debut lent, dar efect îndelungat'], [5.6, 'cu glucocorticoid se formează mai puține']]];
  const pIn = new Path([[70, 70], [130, 130], [190, 200], [250, 268]], { n: 8 }), pNuc = new Path([[250, 290], [280, 400], [320, 500], [340, 566]], { n: 8 }), pRna = new Path([[380, 580], [430, 540], [470, 480], [520, 430], [556, 404]], { n: 10 }), pProt = new Path([[580, 380], [600, 320], [680, 270], [770, 244]], { n: 8 });
  return {
    home: HOME, beatDur: 8, anchors: [[110, 190], [330, 470], [690, 236], [650, 640]],
    phase: (i) => ['receptorul steroidic', 'nucleul', 'PLA2 blocată', 'leucotrienele'][i] || 'glucocorticoizii',
    draw(g, t, b) {
      const intro = b.i < 0; const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3);
      bgK(g, [[330, 520, 460, '#8f78d4', 0.12], [820, 300, 320, K.hi, 0.06]]);
      // celula
      rectK(g, 40, 130, 590, 720, '#241a30', { r: 90, ow: 14, oc: K.mem }); g.save(); g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.roundRect(33, 123, 604, 734, 96); g.stroke(); g.restore(); tx(g, 'citoplasmă', 520, 200, 15, K.dim, { w: 700 });
      ellK(g, 330, 600, 210, 150, '#3d2f5c', { ow: 6, oc: '#8f78d4', shade: '#30244a' }); tx(g, 'nucleu', 330, 716, 16, '#c9b8ff', { w: 700 });
      const hre = intro ? 1 : sg(t1, 1.4, 0.6); dna(g, 170, 490, 600, t, hre); if (hre > 0) tx(g, 'element de răspuns hormonal', 330, 652, 13, K.hi, { alpha: hre, w: 700 });
      // ribozomul
      ellK(g, 566, 410, 34, 22, '#c9a06a', { ow: 4, shade: '#a67d48' }); ellK(g, 566, 388, 24, 15, '#dbb98a', { ow: 4 }); tx(g, 'ribozom', 566, 448, 13, K.dim, { w: 700 });
      // hormonul + receptorul → complex → nucleu
      const u0 = intro ? 1 : sg(t0, 0.3, 2.2), bind = intro ? 1 : sg(t0, 2.4, 0.7), u1 = intro ? 1 : sg(t1, 0.2, 1.3);
      const [cx, cy] = pNuc.at(u1); const rx = u1 > 0 ? cx : 250, ry = u1 > 0 ? cy : 300;
      cup(g, rx, ry + 10, '#b58cff', { s: 1.15, glow: bind * 0.9 }); const [hx, hy] = u0 < 1 ? pIn.at(u0) : [rx, ry - 18]; const hex = new Path2D(); for (let k = 0; k < 6; k++) { const an = k * 1.047 + 0.52; const px = hx + Math.cos(an) * 20, py = hy + Math.sin(an) * 20; k ? hex.lineTo(px, py) : hex.moveTo(px, py); } hex.closePath(); shape(g, hex, K.hi, { box: [hx - 20, hy - 20, 40, 40], ow: 4, glow: 0.5 }); tx(g, 'GC', hx, hy + 1, 13, '#2a1534', { stroke: false });
      if (!intro && b.i === 0) { tx(g, 'hormon steroid', 150, 78, 15, K.hi, { align: 'left' }); tx(g, 'receptor (inactiv)', 290, 356, 14, '#c9b8ff', { align: 'left', alpha: 1 - bind }); tx(g, 'complex activ', 300, 300, 15, K.hi, { align: 'left', alpha: bind }); }
      // mRNA + proteina
      const ur = intro ? 1 : sg(t1, 2.2, 1.8); if (ur > 0) { pRna.stroke(g, 6, '#ff8fc0', { u1: ur, ow: 5, dash: null }); tx(g, 'mRNA', 440, 560, 14, '#ff8fc0', { alpha: ur }); }
      const up = intro ? 1 : sg(t1, 4.2, 1.4); const u2 = intro ? 1 : sg(t2, 0.3, 1.6); if (up > 0) { const [px, py] = u2 > 0 ? pProt.at(u2) : [580, lerp(396, 372, up)]; shape(g, blob(px, py, 26 * up, 20 * up, 0.3, t, 0.12, 10, 2), '#6fb4ff', { shade: '#3f86d9', light: '#ffffff', box: bb(px, py, 26, 20), ow: 4, glow: 0.4 }); if (u2 <= 0 || intro) tx(g, 'proteină specifică', 548, 340, 14, '#bfe0ff', { alpha: up * (intro ? 0 : 1), align: 'right' }); }
      // lanțul acidului arahidonic (dreapta)
      const blk = intro ? 1 : sg(t2, 1.8, 0.7); const dimA = 1 - 0.68 * (intro ? 1 : sg(t2, 2.4, 1.4));
      chip(g, 820, 150, 'fosfolipide membranare', { size: 15, fill: '#2a2414', line: K.mem, col: K.mem });
      arrowK(g, [[820, 170], [820, 204]], K.ink, 4, 1, { head: 8, alpha: dimA });
      ellK(g, 820, 240, 54, 30, '#ffd36e', { ow: 5, shade: '#d9a83e', alpha: 1 }); tx(g, 'PLA2', 820, 241, 18, '#2a1534', { stroke: false }); crossK(g, 876, 214, 17, blk);
      arrowK(g, [[820, 274], [820, 304]], K.ink, 4, 1, { head: 8, alpha: dimA }); chip(g, 820, 330, 'acid arahidonic', { size: 15, alpha: dimA, fill: '#221528', line: '#ffb347', col: '#ffd08a' });
      arrowK(g, [[790, 350], [740, 398]], K.ink, 4, 1, { head: 8, alpha: dimA }); arrowK(g, [[850, 350], [900, 398]], K.ink, 4, 1, { head: 8, alpha: dimA });
      tx(g, 'LOX', 742, 366, 13, K.dim, { alpha: dimA, w: 700 }); tx(g, 'COX', 900, 366, 13, K.dim, { alpha: dimA, w: 700 });
      chip(g, 728, 424, 'leucotriene', { size: 15, alpha: dimA, fill: '#2a1638', line: K.x, col: '#e3c6ff' }); chip(g, 908, 424, 'prostaglandine', { size: 14, alpha: dimA, fill: '#221528', line: '#8fb4d9', col: '#cfe2f5' });
      // bronhiile (punctul 4)
      { const a = intro || b.i === 3 ? 1 : 0.4; const nar = intro ? 1 : b.i === 3 ? sg(t3, 0.8, 4.6) : 0; tubeX(g, 730, 640, 74, lerp(0.85, 0.15, nar), { alpha: a }); tubeX(g, 900, 640, 74, 0.85, { alpha: a }); tx(g, 'cu leucotriene', 730, 736, 14, '#e3c6ff', { alpha: a, w: 700 }); tx(g, 'cu glucocorticoid', 900, 736, 14, '#bfe0ff', { alpha: a, w: 700 });
        if (b.i === 3) { flow(g, new Path([[728, 446], [724, 510], [730, 560]], { n: 6 }), t3, K.x, { n: 3, speed: 0.4, r: 8 }); chip(g, 730, 536, 'CysLT1 (Gq)', { size: 13, fill: '#2a1638', line: K.x, col: '#e3c6ff', alpha: sg(t3, 0.4, 0.5) }); chip(g, 815, 790, 'bronhoconstricție: debut lent, efect îndelungat', { size: 14, fill: '#160d1c', line: K.x, col: K.ink, alpha: pop(t3, 3) }); } }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: 890, size: 18 }); g.restore();
    },
  };
}

/* ================= 6. REACȚIILE ADVERSE DIN CAZURI, PE CORP (static, organul punctului se aprinde) ================= */
export function raBody({ spec }) {
  const items = spec.sceneOpts.items; // [organ(e), x, y, eticheta, ancora]
  return {
    home: HOME, beatDur: 5, anchors: items.map((it) => it.at),
    phase: (i) => (i >= 0 && items[i] ? items[i].ph : 'reacțiile adverse, pe organ'),
    draw(g, t, b) {
      bgK(g, [[300, 420, 420, '#5b3c86', 0.2]]); const hl = {}; const cur = b.i >= 0 ? items[b.i] : null; if (cur) cur.org.forEach((o) => { hl[o] = 1; });
      drawBody(g, t, { hl, dim: cur ? 0.6 : 0, lungA: cur && cur.org.includes('lungs') ? 0.9 : 0.3, names: false, bladder: 0.3 });
      items.forEach((it, k) => { const on = b.i === k; const seen = b.i < 0 || b.i >= k; chip(g, 780, 130 + k * 96, it.lab, { size: 16, wd: 380, fill: on ? '#3a1418' : 'rgba(20,12,28,.86)', line: on ? K.warn : seen ? 'rgba(255,255,255,.3)' : 'rgba(255,255,255,.12)', col: on ? '#ffd0c8' : seen ? K.ink : K.faint, lw: on ? 3.5 : 2, glow: on ? 0.4 : 0, h: 38 }); tx(g, it.sub, 780, 164 + k * 96, 13, K.dim, { w: 600, alpha: seen ? 1 : 0.4 });
        if (on) { arrowK(g, [[588, 130 + k * 96], [it.at[0] + 34, it.at[1]]], K.warn, 4, clamp(b.bt * 1.6), { head: 9 }); ring(g, it.at[0], it.at[1], 30 + 6 * pulse(t, 1), K.warn, 0.9, 4); } });
    },
  };
}
