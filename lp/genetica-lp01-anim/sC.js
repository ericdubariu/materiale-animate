// Scenele părților C și D: profaza I, meioza (mașină de stări, cu erorile de distribuție), gametogeneza ♂/♀, fecundarea și anomaliile ei.
import { W, H, HOME, C, OUT, bg, panel, st, on, loopT, txt, pill, dot, ell, arr, ring, lead, line, chrom, vchrom, cell, nucleus, chromatin, spindle, sperm, lbl, clamp, lerp, ease, mix, stage, REDUCED } from './gk.js';
import { cover } from './sA.js';

const sm = (a, b, x) => ease(clamp((x - a) / (b - a)));
const SOLID = '#1c3828';

/* ---------- profaza I: leptoten → zigoten → pahiten → diploten → diakineză ---------- */
export function prophI() {
  const CX = 400, CY = 480;
  const K = (s, arr2) => { const i = Math.min(arr2.length - 2, Math.floor(clamp(s, 0, arr2.length - 1))); return lerp(arr2[i], arr2[i + 1], clamp(s - i)); };
  const geo = (s) => ({ len: K(s, [560, 540, 420, 420, 310]), w: K(s, [6, 8, 13, 13, 17]), sep: K(s, [230, 40, 40, 190, 210]), wav: K(s, [15, 7, 0, 0, 0]), cross: sm(1.25, 1.95, s), split: sm(1.1, 1.9, s), u: K(s, [0.62, 0.62, 0.62, 0.62, 0.96]) });
  return {
    home: HOME,
    anchors: [[250, 130], [400, 300], [505, 545], [270, 380], [400, 652]],
    labels: [lbl([520, 60], 'telomere prinse de membrana nucleară', { beats: [0] }), lbl([400, 880], '<i>bivalent</i> = tetradă (4 cromatide)', { beats: [1, 2] }), lbl([590, 545], '<i>crossing-over</i>', { beats: [2] }), lbl([560, 520], '<i>chiasmă</i>', { beats: [3] }), lbl([560, 640], 'chiasma a ajuns la capăt', { beats: [4] }), lbl([830, 690], '<i>vezicula sexuală</i>: X și Y, cap la cap', { beats: [-1, 1, 2, 3, 4] })],
    phase: (i) => ['leptoten', 'zigoten', 'pahiten', 'diploten', 'diakineză'][i] || 'profaza I',
    draw(g, t, b) {
      bg(g);
      const s = stage(b, t, [[0, 0], [0, 1], [1, 2], [2, 3], [3, 4]], 12);
      const G = geo(s), top = CY - G.len / 2, yc = top + G.u * G.len, off = G.w * 0.62 * G.split, minS = 2 * off + G.w * 0.5 + 2;
      ell(g, 500, 470, 470, 440, 'rgba(180,160,235,.07)', { stroke: C.nucS, ow: 5, out: false });
      const hold = sm(1.9, 2.6, s); // de la diploten, omologii se depărtează, dar rămân prinși la chiasmă
      const sepAt = (y) => lerp(G.sep, lerp(minS, G.sep, clamp(Math.abs(y - yc) / 150)), hold > 0 ? 1 : 0) * 1;
      const wob = (y, k) => (REDUCED ? 0 : Math.sin(y * 0.05 + t * 1.3 + k) * G.wav);
      const xOf = (side, inner, y, k) => CX + side * sepAt(y) / 2 + side * (inner ? -off : off) + wob(y, k);
      const N = 30, ys = Array.from({ length: N + 1 }, (_, i) => top + (i / N) * G.len);
      const paths = [];
      for (const side of [-1, 1]) {
        paths.push({ pts: ys.map((y) => [xOf(side, false, y, side), y]), col: () => (side < 0 ? C.mat : C.pat) });
        // cromatida internă trece de partea cealaltă sub chiasmă (după crossing-over)
        const pts = ys.map((y) => { const f = G.cross * sm(yc - 16, yc + 16, y); return [lerp(xOf(side, true, y, side * 2), xOf(-side, true, y, side * 2), f), y]; });
        paths.push({ pts, inner: side });
      }
      const colAt = (p, x) => (x < CX ? C.mat : C.pat);
      for (const pass of [0, 1]) for (const p of paths) {
        if (!p.inner) { if (pass === 0) line(g, p.pts, G.w + 6, OUT, true); else line(g, p.pts, G.w, p.col(), true); continue; }
        if (pass === 0) { line(g, p.pts, G.w + 6, OUT, true); continue; }
        const iC = p.pts.findIndex((q) => q[1] > yc);
        const a = p.pts.slice(0, Math.max(2, iC + 1)), z = p.pts.slice(Math.max(1, iC));
        line(g, a, G.w, p.inner < 0 ? C.mat : C.pat, true);
        if (z.length > 1) line(g, z, G.w, mix(p.inner < 0 ? C.mat : C.pat, p.inner < 0 ? C.pat : C.mat, G.cross), true);
      }
      // centromerii (unul pe omolog)
      const yk = top + 0.25 * G.len;
      for (const side of [-1, 1]) { g.save(); g.fillStyle = C.cen; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.ellipse(CX + side * sepAt(yk) / 2 + wob(yk, side), yk, off + G.w * 0.7, G.w * 0.5, 0, 0, 7); g.fill(); g.stroke(); g.restore(); }
      // complexul sinaptonemal (zigoten–pahiten)
      const sc = sm(0.6, 1, s) * (1 - sm(2, 2.4, s));
      if (sc > 0.02) { g.save(); g.globalAlpha = sc * 0.9; g.strokeStyle = C.hi; g.lineWidth = 3; for (let y = top + 14; y < top + G.len - 8; y += 24) { g.beginPath(); g.moveTo(CX - G.sep / 2 + off + G.w / 2, y); g.lineTo(CX + G.sep / 2 - off - G.w / 2, y); g.stroke(); } g.restore(); txt(g, 'complex sinaptonemal', 640, top + 60, 19, C.hi, { alpha: sc }); lead(g, 520, top + 60, CX + 22, top + 60, sc); }
      // leptoten: capetele prinse de membrana nucleară
      const le = 1 - sm(0.2, 0.9, s);
      if (le > 0.02) for (const side of [-1, 1]) { const x = CX + side * G.sep / 2, my = 470 - 440 * Math.sqrt(Math.max(0, 1 - ((x - 500) / 470) ** 2)) + 4; g.save(); g.globalAlpha = le; line(g, [[x, my], [x + wob(top, side), top]], G.w, side < 0 ? C.mat : C.pat); g.restore(); dot(g, x, my, 10, C.tel, { alpha: le }); }
      // crossing-over: scânteia de la locul schimbului
      const fl = sm(1.25, 1.6, s) * (1 - sm(1.95, 2.3, s)); if (fl > 0.02) ring(g, CX, yc, 60, 46, fl);
      // vezicula sexuală: X și Y unite cap la cap prin regiunea pseudoautozomală
      const xv = sm(0.5, 1, s);
      if (xv > 0.02) { g.save(); g.globalAlpha = xv; ell(g, 830, 520, 92, 150, 'rgba(234,255,241,.05)', { stroke: 'rgba(234,255,241,.35)', ow: 3, out: false, dash: [8, 8] }); line(g, [[830, 400], [830, 548]], 12, C.x); line(g, [[830, 552], [830, 630]], 12, C.y); dot(g, 830, 550, 9, C.hi); txt(g, 'X', 790, 470, 26, C.x); txt(g, 'Y', 790, 596, 26, C.y); g.restore(); }
    },
  };
}

/* ---------- meioza ca „mașină de stări”: S = 0 bivalenți · 1 metafaza I · 2 anafaza I · 3 telofaza I · 4 profaza II · 5 metafaza II · 6 anafaza II · 7 telofaza II ---------- */
const GX = [130, 380, 620, 870], GY = 800;
function plan(err) {
  // side: 0 = celula stângă, 1 = celula dreaptă (după meioza I)
  const ch = [
    { id: 'Lm', long: 1, col: C.mat, tipR: C.pat, x0: 478, y0: 130, side: 0 },
    { id: 'Lp', long: 1, col: C.pat, tipL: C.mat, x0: 522, y0: 130, side: 1 },
    { id: 'Sp', long: 0, col: C.pat, x0: 478, y0: 212, side: 0 },
    { id: 'Sm', long: 0, col: C.mat, x0: 522, y0: 212, side: 1 },
  ];
  if (err === 'ndI') ch[1].side = 0;
  if (err === 'lagI') ch[1].lost = true;
  if (err === 'ndII') ch[0].nosplit = true;
  for (const sd of [0, 1]) { const m = ch.filter((c) => c.side === sd && !c.lost); m.forEach((c, j) => { c.slot = j; c.n = m.length; }); }
  const gam = [[], [], [], []];
  ch.forEach((c) => { if (c.lost) return; const g0 = c.side * 2; if (c.nosplit) { gam[g0].push([c, -1], [c, 1]); } else { gam[g0].push([c, -1]); gam[g0 + 1].push([c, 1]); } });
  gam.forEach((m) => m.forEach((e, j) => { e[0]['g' + e[1]] = [GX[gam.indexOf(m)] + (j - (m.length - 1) / 2) * 36, GY]; }));
  const cnt = gam.map((m) => m.length);
  return { ch, cnt };
}
export function meioFrame(g, S, t, o = {}) {
  const { ch, cnt } = plan(o.err || null);
  const C1 = [500, 170], C2 = [[270, 470], [730, 470]];
  const a1 = 1 - sm(2.3, 3, S) * 0.72, a2 = sm(2.2, 3, S) * (1 - sm(6.3, 7, S) * 0.72), a3 = sm(6.1, 6.8, S);
  // celulele
  g.save(); g.globalAlpha = a1; cell(g, C1[0], C1[1], 225, 140, { fill: SOLID }); g.restore();
  spindle(g, 305, 170, 695, 170, { n: 2, bulge: 44, alpha: sm(0.5, 1, S) * (1 - sm(2, 2.5, S)) });
  if (a2 > 0.01) { g.save(); g.globalAlpha = a2; const br = sm(2.4, 3, S) * (1 - sm(3.6, 4.2, S)); if (br > 0.02) { g.save(); g.globalAlpha *= br; line(g, [[430, 470], [570, 470]], 16, C.mem); g.restore(); } for (const c of C2) cell(g, c[0], c[1], 170, 112, { fill: SOLID }); g.restore(); for (const c of C2) { nucleus(g, c[0], c[1], 110, 82, sm(2.6, 3, S) * (1 - sm(3.3, 4, S)), S > 3.3); spindle(g, c[0] - 150, c[1], c[0] + 150, c[1], { n: 2, bulge: 36, alpha: sm(4.2, 5, S) * (1 - sm(6, 6.5, S)) }); } }
  if (a3 > 0.01) GX.forEach((x, i) => { g.save(); g.globalAlpha = a3; cell(g, x, GY, 100, 78, { fill: SOLID, stroke: cnt[i] === 2 ? C.mem : C.bad }); g.restore(); });
  // săgețile dintre etaje
  arr(g, 400, 300, 320, 356, C.cream, 5, sm(2.2, 2.8, S) * 0.8); arr(g, 600, 300, 680, 356, C.cream, 5, sm(2.2, 2.8, S) * 0.8);
  for (const [x0, x1] of [[220, 150], [320, 370], [680, 630], [780, 850]]) arr(g, x0, 590, x1, 706, C.cream, 4, sm(6.1, 6.7, S) * 0.8);
  // cromozomii
  ch.forEach((c) => {
    const p = c.long ? 16 : 10, q = c.long ? 32 : 19, w = 9;
    // meioza I
    const left = c.x0 < 500, sx = c.long ? (left ? 420 : 470) : (left ? 540 : 590), sy = c.long ? 150 : 200;
    let x = lerp(sx, c.x0, sm(0, 1, S)), y = lerp(sy, c.y0, sm(0, 1, S));
    const px = c.side === 0 ? 372 : 628, pxx = c.id === 'Lp' && c.side === 0 ? px + 46 : px;
    if (c.lost) { x = lerp(x, 522, sm(1, 2, S)); const al = 1 - sm(2, 2.8, S); if (al > 0.02) { if (S > 1.6) txt(g, 'rămâne în urmă', 610, 106, 18, C.bad, { alpha: al }); chrom(g, x, y, { p, q, w, col: c.col, tipL: c.tipL, tipR: c.tipR, alpha: al }); } return; }
    x = lerp(x, pxx, sm(1.08, 2, S));
    // spre celula din etajul 2
    const cc = C2[c.side], slotX = cc[0] + (c.slot - (c.n - 1) / 2) * 74, slotY = cc[1] + (c.n === 1 ? 0 : (c.slot - (c.n - 1) / 2) * 16);
    x = lerp(x, slotX, sm(2.2, 3, S)); y = lerp(y, slotY, sm(2.2, 3, S));
    // placa metafazică II (verticală), apoi separarea cromatidelor
    const py = cc[1] + (c.slot - (c.n - 1) / 2) * (c.n === 3 ? 62 : 84);
    x = lerp(x, cc[0], sm(4, 5, S)); y = lerp(y, py, sm(4, 5, S));
    const uS = sm(5.08, 6, S), uG = sm(6.1, 7, S);
    if (uS <= 0.001 || c.nosplit) {
      const tx = c.nosplit ? lerp(lerp(x, cc[0] - 96, uS), (c['g-1'][0] + c.g1[0]) / 2, uG) : x, ty = c.nosplit ? lerp(y, GY, uG) : y;
      chrom(g, tx, ty, { p, q, w, col: c.col, tipL: c.tipL, tipR: c.tipR });
    } else for (const sd of [-1, 1]) {
      const G = c['g' + sd], tx = lerp(lerp(x, cc[0] + sd * 96, uS), G[0], uG), ty = lerp(y, G[1], uG), tip = sd < 0 ? c.tipL : c.tipR;
      chrom(g, tx, ty, { p, q, w, col: c.col, bi: false, tipR: tip, tipL: tip });
    }
  });
  // rezultatul
  if (a3 > 0.5) GX.forEach((x, i) => { const n = cnt[i], s = n === 2 ? 'n' : n > 2 ? 'n + 1' : 'n − 1'; txt(g, s, x, GY + 104, 26, n === 2 ? C.ok : C.bad, { alpha: sm(6.6, 7, S) }); });
}
export function meiosis({ spec }) {
  const o = spec.sceneOpts || {}, stg = o.stg || [[0, 7]];
  return {
    home: HOME, anchors: o.anch || [], labels: (o.lab || []).map((l) => lbl(l[0], l[1], { beats: l[2] })),
    phase: (i) => (o.ph || [])[i] || o.ph0 || '',
    draw(g, t, b) { bg(g); meioFrame(g, stage(b, t, stg, 12), t, { err: o.err }); },
  };
}

/* ---------- erorile din meioză ---------- */
function unequalCO(g, u) {
  const seg = (x, y, s, col, w = 86) => { pill(g, x + w / 2, y, w - 6, 50, col, s, { size: 24, ow: 4, r: 12 }); };
  txt(g, 'omologii se aliniază greșit', 560, 104, 24, C.hi);
  ['A', 'B', 'C', 'D'].forEach((s, i) => seg(240 + i * 86, 170, s, C.mat)); ['A', 'B', 'C', 'D'].forEach((s, i) => seg(326 + i * 86, 250, s, C.pat));
  g.save(); g.strokeStyle = C.hi; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(488, 140); g.lineTo(518, 280); g.moveTo(518, 140); g.lineTo(488, 280); g.stroke(); g.restore();
  txt(g, 'schimb inegal', 730, 210, 22, C.hi);
  arr(g, 500, 320, 500, 400, C.cream, 6, u);
  g.save(); g.globalAlpha = u;
  const r1 = [['A', C.mat], ['B', C.mat], ['C', C.mat], ['C', C.pat], ['D', C.pat]], r2 = [['A', C.pat], ['B', C.pat], ['D', C.mat]];
  r1.forEach(([s, c], i) => seg(190 + i * 86, 480, s, c)); txt(g, 'duplicație (C apare de două ori)', 405, 548, 22, C.bad);
  r2.forEach(([s, c], i) => seg(540 + i * 86, 660, s, c)); txt(g, 'deleție (lipsește C)', 669, 728, 22, C.bad);
  g.restore();
  panel(g, 80, 790, 840, 100); txt(g, 'un cromozom pierde secvențe, celălalt le are dublate', 500, 840, 22, C.cream, { w: 700 });
}
export function meiErr({ spec }) {
  const o = spec.sceneOpts || {}, modes = o.modes || ['uco', 'ndI', 'ndII', 'lagI'];
  return {
    home: HOME, anchors: o.anch || [[150, 170], [300, 100], [86, 440], [745, 135]],
    phase: (i) => (o.ph || ['crossing-over inegal', 'nondisjuncție în meioza I', 'nondisjuncție în meioza II', 'întârziere anafazică'])[i] || 'erorile din meioză',
    draw(g, t, b) {
      bg(g);
      const m = b.i < 0 ? (modes.find((x) => x !== 'uco') || 'ndI') : modes[Math.min(b.i, modes.length - 1)];
      if (m === 'uco') { unequalCO(g, st(b, b.i)); return; }
      const hold = m.endsWith('!'), err = m.replace('!', '');
      const S = b.i < 0 ? stage(b, t, [[1, 7]], 12) : hold ? 7 : lerp(1, 7, ease(clamp(b.bt / (b.bd * 0.85))));
      meioFrame(g, S, t, { err });
      if (hold) GX.forEach((x) => ring(g, x, GY, 108, 86, st(b, b.i)));
    },
  };
}

/* ---------- gametogeneza masculină vs. feminină ---------- */
export function gameto() {
  return {
    home: HOME,
    anchors: [[40, 706], [40, 330], [520, 706], [520, 330]],
    draw(g, t, b) {
      bg(g);
      const k = b.i, aM = k === 2 || k === 3 ? 0.4 : 1, aF = k === 0 || k === 1 ? 0.4 : 1;
      panel(g, 30, 30, 455, 870, { alpha: aM }); panel(g, 515, 30, 455, 870, { alpha: aF });
      g.save(); g.globalAlpha = aM;
      txt(g, 'MASCULINĂ', 258, 66, 26, C.pat);
      cell(g, 258, 160, 62, 54); txt(g, '2n', 258, 160, 24, C.cream); arr(g, 258, 224, 258, 268, C.cream, 5); txt(g, 'meioză', 318, 246, 18, C.hi);
      [100, 205, 310, 415].forEach((x) => { cell(g, x, 320, 40, 36); txt(g, 'n', x, 320, 20, C.cream); arr(g, x, 362, x, 392, C.cream, 4); });
      txt(g, '4 spermatide', 258, 432, 19, C.cream, { w: 700 });
      [[100, C.x], [205, C.x], [310, C.y], [415, C.y]].forEach(([x, c], i) => sperm(g, x, 478, -Math.PI / 2, t + i, c, 0.95));
      txt(g, '2 gino · 23,X', 152, 590, 19, C.x); txt(g, '2 andro · 23,Y', 362, 590, 19, C.y);
      txt(g, 'din pubertate, continuă', 258, 660, 20, C.cream); line(g, [[150, 706], [440, 706]], 16, C.pat); txt(g, 'pubertate', 150, 740, 16, C.cream, { w: 700 }); txt(g, 'vârste înaintate', 400, 740, 16, C.cream, { w: 700 });
      pill(g, 258, 830, 400, 70, C.pat, null, { ow: 4, glow: k === 1 ? 1 : 0 }); txt(g, 'risc GENIC\nerori de copiere', 258, 830, 20, OUT, { stroke: false });
      g.restore(); g.save(); g.globalAlpha = aF;
      txt(g, 'FEMININĂ', 742, 66, 26, C.mat);
      cell(g, 742, 160, 62, 54, { stroke: C.mat }); txt(g, '2n', 742, 160, 24, C.cream); arr(g, 742, 224, 742, 268, C.cream, 5); txt(g, 'meioză', 802, 246, 18, C.hi);
      cell(g, 680, 380, 96, 90, { stroke: C.mat }); txt(g, 'ovul', 680, 368, 24, C.cream); txt(g, '23,X', 680, 400, 20, C.x);
      [[850, 310], [890, 380], [850, 450]].forEach(([x, y]) => { cell(g, x, y, 26, 24, { stroke: C.mat }); });
      txt(g, '3 globuli polari', 850, 510, 18, C.cream, { w: 700 }); txt(g, '23,X', 850, 536, 18, C.x);
      txt(g, 'un ovul la fiecare ciclu menstrual', 742, 596, 19, C.cream, { w: 700 });
      txt(g, 'din viața intrauterină, discontinuă', 742, 660, 20, C.cream); for (let x = 560; x < 900; x += 44) line(g, [[x, 706], [x + 20, 706]], 16, C.mat);
      txt(g, 'intrauterin', 590, 740, 16, C.cream, { w: 700 }); txt(g, 'menopauză', 880, 740, 16, C.cream, { w: 700 });
      pill(g, 742, 830, 400, 70, C.mat, null, { ow: 4, glow: k === 3 ? 1 : 0 }); txt(g, 'risc CROMOZOMIAL\nerori de distribuție', 742, 830, 20, OUT, { stroke: false });
      g.restore();
    },
  };
}

/* ---------- fecundarea ---------- */
export function fert() {
  const OX = 330, OY = 340;
  return {
    home: HOME,
    anchors: [[548, 250], [OX, 250], [56, 648], [652, 64], [200, 470]],
    phase: (i) => ['n + n → 2n', 'combinație nouă de gene', 'sexul genetic', 'raportul sexelor', 'mitocondriile vin din ovul'][i] || 'fecundarea',
    draw(g, t, b) {
      bg(g);
      const k = b.i, u = k < 0 ? (REDUCED ? 1 : clamp(((t % 9) / 6))) : k === 0 ? clamp(b.bt / (b.bd * 0.8)) : 1;
      cell(g, OX, OY, 215, 200, { stroke: C.mat, ow: 7 });
      // mitocondriile (din ovul)
      [[200, 250], [230, 450], [330, 500], [440, 470], [180, 350], [420, 215]].forEach(([x, y], i) => { ell(g, x, y, 22, 11, '#ff9d4d', { stroke: OUT, ow: 3, out: false, rot: i * 0.7, alpha: k === 4 || k < 0 ? 1 : 0.55 }); });
      if (k === 4) [[200, 250], [230, 450], [330, 500], [440, 470], [180, 350], [420, 215]].forEach(([x, y]) => ring(g, x, y, 30, 20, st(b, 4)));
      // spermatozoidul intră, pronucleii se unesc
      const en = sm(0, 0.45, u), fu = sm(0.5, 1, u);
      if (en < 1) sperm(g, lerp(900, 548, en), lerp(180, 300, en), Math.PI - 0.33, t, '#eafff1', 1.3);
      const mx = lerp(OX - 40, OX, fu), px = lerp(500, OX, fu), py = lerp(310, OY, fu);
      if (fu < 0.98) { nucleus(g, mx, OY, 58, 54); txt(g, 'n', mx, OY, 30, C.mat); if (en >= 1 || u > 0.45) { nucleus(g, px, py, 40, 38, sm(0.42, 0.55, u)); txt(g, 'n', px, py, 26, C.pat, { alpha: sm(0.42, 0.55, u) }); } }
      else { nucleus(g, OX, OY, 86, 80); txt(g, '2n = 46', OX, OY, 30, C.hi); txt(g, 'zigot', OX, OY + 120, 22, C.cream, { w: 700 }); }
      if (k === 1) ring(g, OX, OY, 100, 94, st(b, 1));
      // raportul sexelor
      panel(g, 640, 60, 320, 330, { stroke: k === 3 ? C.hi : undefined, alpha: k === 3 || k < 0 ? 1 : 0.5 });
      g.save(); g.globalAlpha = k === 3 || k < 0 ? 1 : 0.4;
      txt(g, 'raportul sexelor nu e 1:1', 800, 96, 19, C.cream);
      txt(g, 'la naștere', 800, 140, 18, C.hi); pill(g, 730, 180, 150, 40, C.pat, '46,XY', { size: 18, ow: 4 }); pill(g, 870, 180, 110, 40, C.mat, '46,XX', { size: 18, ow: 4 });
      txt(g, 'la vârste înaintate', 800, 260, 18, C.hi); pill(g, 710, 300, 110, 40, C.pat, '46,XY', { size: 18, ow: 4 }); pill(g, 850, 300, 150, 40, C.mat, '46,XX', { size: 18, ow: 4 });
      txt(g, 'se pierd mai mulți 46,XY', 800, 356, 17, C.cream, { w: 700 });
      g.restore();
      // sexul genetic
      panel(g, 40, 630, 920, 270, { stroke: k === 2 ? C.hi : undefined, alpha: k === 2 || k < 0 ? 1 : 0.5 });
      g.save(); g.globalAlpha = k === 2 || k < 0 ? 1 : 0.4;
      txt(g, 'Sexul genetic îl dă spermatozoidul', 500, 664, 22, C.hi);
      [[720, C.x, 'ginospermatozoid 23,X', '46,XX', C.mat], [820, C.y, 'androspermatozoid 23,Y', '46,XY', C.pat]].forEach(([y, c, s, r, rc]) => {
        cell(g, 150, y, 46, 40, { stroke: C.mat }); txt(g, '23,X', 150, y, 18, C.x); txt(g, '+', 226, y, 30, C.cream);
        sperm(g, 300, y, 0, t, c, 0.9); txt(g, s, 480, y, 19, c, { w: 700 }); arr(g, 630, y, 700, y, C.cream, 5); pill(g, 820, y, 170, 52, rc, r, { size: 24, ow: 4 });
      });
      g.restore();
    },
  };
}

/* ---------- anomaliile de fecundare ---------- */
export function fertAnom() {
  const ov = (g, x, y, s, r = 34) => { cell(g, x, y, r, r * 0.92, { stroke: C.mat }); txt(g, s, x, y, r * 0.56, C.cream); };
  const sp = (g, x, y, t, a = Math.PI) => sperm(g, x, y, a, t, '#eafff1', 0.62);
  const pos = (k) => [40 + (k % 2) * 480, 30 + Math.floor(k / 2) * 435];
  const T = ['Fecundarea dublă', 'Dispermia', 'Gameți diploizi', 'Izodisomia globală'];
  return {
    home: HOME, anchors: T.map((_, k) => { const [x, y] = pos(k); return [x + 30, y + 34]; }),
    draw(g, t, b) {
      bg(g);
      T.forEach((n, k) => { const [x, y] = pos(k); panel(g, x, y, 440, 420, { stroke: on(b, k) ? C.hi : undefined, lw: on(b, k) ? 5 : 3 }); txt(g, n, x + 232, y + 36, 23, on(b, k) ? C.hi : C.cream); });
      // a) fecundarea dublă
      ov(g, 110, 150, 'n'); sp(g, 176, 132, t); ov(g, 110, 250, 'n'); sp(g, 176, 232, t + 1);
      arr(g, 200, 150, 250, 150, C.cream, 4); arr(g, 200, 250, 250, 250, C.cream, 4);
      ov(g, 296, 150, '2n', 30); ov(g, 296, 250, '2n', 30);
      txt(g, 'separat:', 400, 150, 17, C.cream, { w: 700 }); txt(g, 'gemeni\ndizigoți', 400, 196, 20, C.ok);
      txt(g, 'uniți:', 400, 262, 17, C.cream, { w: 700 }); txt(g, 'himeră', 400, 292, 20, C.bad);
      pill(g, 260, 388, 400, 76, '#eafff1', null, { ow: 4 }); txt(g, 'himeră din zigoți de sex diferit =\nhermafroditism adevărat', 260, 388, 18, OUT, { stroke: false });
      // b) dispermia
      ov(g, 640, 200, 'n', 52); sp(g, 730, 160, t); sp(g, 730, 240, t + 2);
      arr(g, 760, 200, 810, 200, C.cream, 5); ov(g, 880, 200, '3n', 50);
      pill(g, 740, 360, 400, 70, C.bad, null, { ow: 4 }); txt(g, '1 ovul + 2 spermatozoizi =\nzigot triploid', 740, 360, 19, OUT, { stroke: false });
      // c) gameți diploizi
      txt(g, 'diginie: 2n matern + n', 260, 536, 20, C.mat); pill(g, 260, 602, 410, 74, C.mat, null, { ow: 4 }); txt(g, 'placentă mică, fibrotică\navort precoce', 260, 602, 19, OUT, { stroke: false });
      txt(g, 'diandrie: n + 2n patern', 260, 690, 20, C.pat); pill(g, 260, 760, 410, 84, C.pat, null, { ow: 4 }); txt(g, 'molă hidatiformă PARȚIALĂ\nplacentă mare, polichistică', 260, 760, 19, OUT, { stroke: false });
      txt(g, 'în ambele: zigot 3n', 260, 846, 19, C.hi);
      // d) izodisomia globală
      txt(g, 'gamet fără nucleu + gamet normal', 740, 532, 18, C.cream, { w: 700 }); txt(g, 'setul se dublează: 2n de la un părinte', 740, 562, 18, C.hi, { w: 700 });
      txt(g, 'origine maternă', 740, 610, 19, C.mat); pill(g, 740, 660, 400, 56, C.mat, 'teratom ovarian', { size: 21, ow: 4 });
      txt(g, 'origine paternă', 740, 728, 19, C.pat); pill(g, 740, 786, 400, 76, C.pat, null, { ow: 4 }); txt(g, 'molă hidatiformă COMPLETĂ\nfără embrion', 740, 786, 19, OUT, { stroke: false });
    },
  };
}

/* ---------- scenă statică pentru capcane / recapitulare ---------- */
export function recap() { const c = cover(); return { home: HOME, anchors: [], draw: (g, t, b) => c.draw(g, t, { ...b, i: -1 }) }; }
