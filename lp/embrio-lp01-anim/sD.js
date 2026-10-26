// Părțile D–F: gameții anormali, gemenii, diagnosticul prenatal (harta, ecografia, sângele, metodele invazive), cazul,
// capcanele și recapitularea.
import {
  cam, HOME, C, K, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead,
  OUT, clamp, lerp, ease, paint, blob, bb, smooth, REDUCED,
  chromo, cellB, dividing, sperm, oocyte, polar, cleave, blastocyst, embryoC, fetus, pelvis, srand, rr, rnd,
} from './k1.js';
import { cover } from './sA.js';

const sp = (u, a, b) => ease(clamp((u - a) / (b - a)));

/* =================================================== GAMEȚII ANORMALI (figura LP, după Langman)
   1 = un folicul (celule foliculare în jur) cu DOUĂ ovocite → „gemeni”, dar de obicei degenerează (se estompează);
   2 = un ovocit primar al cărui nucleu devine 3 nuclei (trinucleat); 3 = jos-dreapta, un șir de spermatozoizi care înoată:
   cei normali + cei atipici (2 capete, gigant, foarte mic, coadă încolăcită, 2 cozi), unii mai lenți (motilitate redusă). */
export function abngam() {
  const FX = 300, FY = 300, OX = 740, OY = 300;
  const SP = [['normal', 1], ['twohead', 1], ['normal', 1], ['giant', 1], ['tiny', 1], ['coil', 0.35], ['normal', 1], ['twotail', 1]];
  const LAB = { twohead: 'cap dublu', giant: 'gigant', tiny: 'foarte mic', coil: 'coadă anormală', twotail: 'coadă dublă' };
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[FX - 150, FY - 150], [OX - 150, OY - 150], [420, 560]],
    phase: (i) => ['folicul cu 2–3 ovocite', 'ovocit multinucleat', 'spermatozoizi atipici'][i] || 'gameți greșiți ca formă',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3); const p0 = p(0), p1 = p(1), p2 = p(2);
      // 1 · foliculul cu 2 ovocite
      const deg = b.i === 0 ? sp(p0, 0.65, 1) : b.i < 0 ? 0 : 0;
      srand(3); for (let k = 0; k < 30; k++) { const q = (k / 30) * Math.PI * 2; ell(g, FX + Math.cos(q) * 150, FY + Math.sin(q) * 118, 16, 10, '#f6d8b8', { rot: q + Math.PI / 2, ow: 2.5, alpha: 1 - deg * 0.5 }); }
      const two = Math.max(p0, b.i < 0 || b.i > 0 ? 1 : 0);
      oocyte(g, lerp(FX, FX - 58, two), FY, 66, t, { zona: false, alpha: 1 - deg * 0.5, inner: (gg) => ell(gg, 0, 0, 20, 20, K.nuc, { ow: 3 }) });
      if (two > 0) oocyte(g, FX + 62, FY, 60 * two, t, { zona: false, alpha: two * (1 - deg * 0.5), inner: (gg) => ell(gg, 0, 0, 18 * two, 18 * two, K.nuc, { ow: 3 }) });
      txt(g, 'folicul cu 2 ovocite', FX, FY + 170, 18, C.cream);
      if (b.i === 0 && p0 > 0.4) txt(g, deg > 0.3 ? 'de obicei degenerează' : '→ se pot naște gemeni', FX, FY - 160, 18, C.hi);
      // 2 · ovocitul trinucleat
      const tri = Math.max(p1, b.i < 0 || b.i > 1 ? 1 : 0);
      oocyte(g, OX, OY, 118, t, { zona: true, inner: (gg) => { const P3 = [[-40, -26], [42, -20], [0, 44]]; P3.forEach(([x, y], k) => ell(gg, lerp(0, x, tri), lerp(0, y, tri), lerp(36, 26, tri), lerp(36, 26, tri), K.nuc, { ow: 3, alpha: k === 0 ? 1 : tri })); } });
      txt(g, 'ovocit trinucleat', OX, OY + 170, 18, C.cream);
      // 3 · spermatozoizii
      panel(g, 380, 470, 590, 430);
      SP.forEach(([kind, spd], k) => {
        const y = 520 + k * 46; const u = (loopT(t * spd + k * 0.37, 7) );
        const x = lerp(460, 940, u);
        const atyp = kind !== 'normal'; const a = b.i < 0 || b.i === 2 ? 1 : 0.6;
        sperm(g, x, y, 0.55, 0, t * (spd < 0.6 ? 0.3 : 1) + k, { kind, alpha: a, col: atyp && on(b, 2) ? '#ffe36e' : K.spH });
        if (atyp && (b.i === 2 && p2 > 0.3)) txt(g, LAB[kind] + (spd < 0.7 ? ' · motilitate redusă' : ''), 520, y, 15, C.hi, { align: 'right', alpha: sp(p2, 0.3, 0.7) });
      });
      txt(g, 'spermatozoizii atipici: cei mai frecvenți', 675, 890, 17, '#ffd6c4', { alpha: b.i < 0 || b.i === 2 ? 1 : 0.5 });
      if (on(b, 0)) ring(g, FX, FY, 180, 150, ease(b.bt * 1.4));
      if (on(b, 1)) ring(g, OX, OY, 160, 160, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== GEMENII: când se despart → ce anexe au comune
   Sus, banda etapelor: 2 ovocite (DZ) · 2 celule–morula (ziua 0–3) · blastocist (ziua 4–8) · disc bilaminar (ziua 8–13) ·
   disc trilaminar (> ziua 13); separarea alunecă spre dreapta. Jos, rezultatul, mare: roșu = corion, albastru = amnios,
   portocaliu = embrion. 1 = DZ: 2 corioni + 2 amnioși; 2 = MZ 0–3: tot 2 + 2; 3 = MZ 4–8: butonul embrionar se împarte →
   1 corion, 2 amnioși; 4 = MZ după ziua 8: 1 corion + 1 amnios, iar după ziua 13 separare incompletă → siamezi. */
export function twins() {
  const SX = [130, 320, 510, 700, 880], SY = 210;
  const sac = (g, x, y, rc, ra, nEmb, chor = true, conj = false, a = 1) => {
    g.save(); g.globalAlpha = a;
    if (chor) { g.strokeStyle = OUT; g.lineWidth = 16; g.beginPath(); g.arc(x, y, rc, 0, 7); g.stroke(); g.strokeStyle = K.chor; g.lineWidth = 10; g.stroke(); }
    g.restore();
  };
  const ringC = (g, x, y, r, col, w, a = 1) => { g.save(); g.globalAlpha = a; g.strokeStyle = OUT; g.lineWidth = w + 6; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.strokeStyle = col; g.lineWidth = w; g.stroke(); g.restore(); };
  const emb = (g, x, y, s, a = 1) => { g.save(); g.globalAlpha = a; const p = blob(x, y, 30 * s, 18 * s, -0.4, 0, 0.06, 12, 2); paint(g, p, K.emb, '#e07f2c', '#ffd2a3', bb(x, y, 30 * s, 18 * s), OUT, 4); ell(g, x - 22 * s, y - 14 * s, 14 * s, 13 * s, K.emb, { ow: 3.5 }); g.restore(); };
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[SX[0], SY - 100], [SX[1], SY - 100], [SX[2], SY - 100], [SX[3] + 90, SY - 100]],
    phase: (i) => ['dizigoți · DiDi', 'MZ ziua 0–3 · DiDi', 'MZ ziua 4–8 · MoDi', 'MZ după ziua 8 · MoMo'][i] || 'separare tot mai târzie →',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const cur = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 3.5) % 4 : b.i; const u = b.i < 0 ? 1 : p(b.i);
      // banda etapelor
      const lab = ['DIZIGOȚI\n2 ovocite', 'MZ · ziua 0–3\n2 celule–morula', 'MZ · ziua 4–8\nblastocist', 'MZ · ziua 8–13\ndisc bilaminar', 'MZ · > ziua 13\ndisc trilaminar'];
      lab.forEach((l, k) => { const act = k === cur || (cur === 3 && k === 4); txt(g, l, SX[k], SY + 92, 15, act ? C.hi : '#d8c4b8', { w: 800 }); });
      arr(g, 230, 330, 930, 330, '#8f7d74', 4, 0.8); txt(g, 'separare tot mai târzie →', 580, 355, 15, '#d8c4b8', { w: 700 });
      // icoanele: fiecare se „taie” când e punctul lui
      const cut = (k) => (k === cur || (cur === 3 && k === 4) ? sp(u, 0.1, 0.5) : 0);
      // 0 · 2 ovocite
      [-1, 1].forEach((s) => oocyte(g, SX[0] + s * 34, SY, 26, t, { zona: true, alpha: cur === 0 ? 1 : 0.6 }));
      // 1 · 2 celule care se despart
      { const c = cut(1); [-1, 1].forEach((s) => cleave(g, SX[1] + s * (22 + 26 * c), SY, 22, 2, t, { alpha: cur === 1 ? 1 : 0.6 })); }
      // 2 · blastocistul cu butonul embrionar împărțit
      blastocyst(g, SX[2], SY, 44, t, { zona: false, icm: cur === 2 ? 1 - cut(2) * 0.4 : 0.8, alpha: cur === 2 ? 1 : 0.6 });
      if (cur === 2) [-1, 1].forEach((s) => ell(g, SX[2] + s * (12 + 10 * cut(2)), SY - 26, 10, 9, K.emb, { ow: 3, alpha: cut(2) }));
      // 3 · disc bilaminar în amnios
      { const a = cur === 3 ? 1 : 0.6; ringC(g, SX[3], SY, 44, K.chor, 6, a); ringC(g, SX[3], SY - 8, 24, K.amn, 4, a); const c = cut(3); [-1, 1].forEach((s) => ell(g, SX[3] + s * (8 + 6 * c), SY + 2, 12, 6, K.emb, { ow: 2.5, alpha: a })); }
      // 4 · disc trilaminar
      { const a = cur === 3 ? 1 : 0.6; ringC(g, SX[4], SY, 44, K.chor, 6, a); ringC(g, SX[4], SY - 8, 24, K.amn, 4, a); ell(g, SX[4], SY + 2, 18, 7, K.emb, { ow: 2.5, alpha: a }); }
      // rezultatul
      const R = sp(u, 0.45, 0.95); const RY = 640;
      if (cur <= 1) { [-1, 1].forEach((s) => { const x = 500 + s * lerp(120, 200, R); ringC(g, x, RY, 160, K.chor, 12, Math.max(0.3, R)); ringC(g, x, RY + 10, 112, K.amn, 8, Math.max(0.3, R)); emb(g, x, RY + 20, 1.5, Math.max(0.3, R)); }); pill(g, 500, 880, 380, 46, C.hi, '2 corioni + 2 amnioși (DiDi)', { size: 18, alpha: R }); }
      if (cur === 2) { ringC(g, 500, RY, 250, K.chor, 12); [-1, 1].forEach((s) => { const x = 500 + s * lerp(0, 112, R); ringC(g, x, RY + 10, 100, K.amn, 8); emb(g, x, RY + 20, 1.4); }); pill(g, 500, 900, 400, 46, C.hi, '1 corion, 2 amnioși (MoDi) · cel mai frecvent', { size: 17, alpha: R }); }
      if (cur === 3) {
        const c2 = sp(u, 0.6, 1);
        ringC(g, 330, RY, 190, K.chor, 12); ringC(g, 330, RY + 10, 150, K.amn, 8); emb(g, 270, RY + 30, 1.3); emb(g, 390, RY + 30, 1.3);
        pill(g, 330, 880, 320, 44, C.hi, '1 corion + 1 amnios (MoMo)', { size: 17, alpha: R });
        g.save(); g.globalAlpha = c2; ringC(g, 760, RY, 150, K.chor, 12); ringC(g, 760, RY + 10, 112, K.amn, 8); emb(g, 725, RY + 26, 1.3); emb(g, 795, RY + 26, 1.3); g.restore();
        if (c2 > 0) { g.save(); g.globalAlpha = c2; g.fillStyle = K.emb; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.ellipse(760, RY + 24, 26, 14, 0, 0, 7); g.fill(); g.stroke(); g.restore(); }
        pill(g, 760, 880, 300, 44, C.hi, '> ziua 13: siamezi (lipiți)', { size: 17, alpha: c2 });
      }
      if (b.i >= 0) ring(g, b.i === 3 ? (SX[3] + SX[4]) / 2 : SX[b.i], SY, b.i === 3 ? 180 : 80, 80, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== DIAGNOSTICUL PRENATAL · HARTA
   Sus: axa săptămânilor de sarcină 8 → 40 cu benzile: ecografia (verde, toată sarcina), biopsia vilozităților ~10–13
   (roșu, punctat: manual), amniocenteza 14–18 (roșu, LP); sângele matern și cordocenteza fără interval (LP nu îl dă).
   Jos: gravida în secțiune, cu instrumentul fiecărei metode: 1 = sonda pe abdomen + undele; 2 = eprubeta cu sângele mamei
   (AFP, hCG, inhibină A, infecții); 3 = în ordine CVS (cateter prin col spre placentă) → amniocenteză (ac în lichid) →
   cordocenteză (ac în cordon); 4 = probele → cariotipul cu o trisomie. */
export function prenatal() {
  const X0 = 120, X1 = 930; const wx = (w) => lerp(X0, X1, (w - 8) / 32); const AY = 110;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[wx(30), AY + 104], [150, 470], [wx(28), AY + 146], [895, 360]],
    phase: (i) => ['ecografia', 'sângele matern', 'invazive', 'teste genetice'][i] || '6 metode',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      // axa
      tube(g, [[X0, AY], [X1, AY]], 6, '#6b5650', { ow: 3 });
      [8, 12, 16, 20, 24, 28, 32, 36, 40].forEach((w) => txt(g, String(w), wx(w), AY - 26, 16, '#ffe7d6', { w: 700 }));
      txt(g, 'săptămâni de sarcină', X1, AY + 26, 14, '#d8c4b8', { w: 700, align: 'right' });
      const band = (a, c, y, col, lab, al, dash) => { const pp = new Path2D(); pp.roundRect(wx(a), y - 15, wx(c) - wx(a), 30, 10); g.save(); g.globalAlpha = al; if (dash) { g.setLineDash([8, 6]); g.strokeStyle = col; g.lineWidth = 4; g.stroke(pp); } else paint(g, pp, col, null, null, [wx(a), y - 15, wx(c) - wx(a), 30], OUT, 3); g.restore(); txt(g, lab, wx(c) + 10, y, 15, C.cream, { align: 'left', alpha: al }); };
      band(8, 40, AY + 60, K.ok, '', b.i < 0 || b.i === 0 ? 1 : 0.5); txt(g, 'ecografia · de rutină, toată sarcina', wx(24), AY + 60, 15, OUT, { stroke: false });
      const ia = b.i < 0 || b.i >= 2 ? 1 : 0.35;
      band(10, 13, AY + 104, '#ff6f62', 'CVS ~10–13 (manual)', ia, true);
      band(14, 18, AY + 146, '#ff6f62', 'amniocenteza 14–18 (LP)', ia, false);
      // gravida
      const PT = pelvis(g, t, { x: 560, y: 640, s: 0.62 });
      // 1 · ecografia
      const q0 = Math.max(p(0), b.i < 0 ? 1 : 0);
      if (q0 > 0) { const [wx0, wy0] = PT.wall; g.save(); g.globalAlpha = q0; g.translate(wx0 - 30, wy0); g.rotate(-0.25); const pr = new Path2D(); pr.roundRect(-30, -24, 54, 48, 14); paint(g, pr, '#dfe6f0', '#aab6c6', '#ffffff', [-30, -24, 54, 48], OUT, 5); tube(g, [[-30, 0], [-80, -20]], 8, '#8f9bb0', { ow: 3 }); g.restore();
        for (let k = 0; k < 3; k++) { const u = loopT(t + k * 0.4, 1.2); g.save(); g.globalAlpha = q0 * (1 - u); g.strokeStyle = '#bfe0ff'; g.lineWidth = 4; g.beginPath(); g.arc(wx0 - 10, wy0, 20 + u * 90, -0.6, 0.6); g.stroke(); g.restore(); } }
      // 2 · sângele matern
      const q1 = Math.max(p(1), b.i < 0 ? 1 : 0);
      g.save(); g.globalAlpha = Math.max(0.35, q1); const tb = new Path2D(); tb.roundRect(120, 520, 50, 170, 22); paint(g, tb, '#f4f1ee', '#d8d2cc', '#ffffff', [120, 520, 50, 170], OUT, 5); g.restore();
      if (q1 > 0) { const lv = 150 * q1; g.save(); g.beginPath(); g.roundRect(126, 684 - lv, 38, lv, 16); g.fillStyle = '#c8203a'; g.fill(); g.restore(); }
      txt(g, 'sânge matern', 145, 720, 16, C.cream, { alpha: Math.max(0.35, q1) });
      if (q1 > 0.5) txt(g, 'AFP · hCG · inhibină A\n· infecții', 145, 780, 15, '#ffd6dc', { alpha: sp(q1, 0.5, 1) });
      // 3 · invazive: CVS → amniocenteza → cordocenteza
      const q2 = b.i < 0 ? 1 : b.i === 2 ? p(2) : b.i > 2 ? 1 : 0;
      const c1 = sp(q2, 0, 0.33), c2 = sp(q2, 0.33, 0.66), c3 = sp(q2, 0.66, 1);
      if (c1 > 0) { const P1 = [PT.vagina, PT.cervix, [lerp(PT.cervix[0], PT.plac[0], 0.5) + 20, lerp(PT.cervix[1], PT.plac[1], 0.5) + 10], [PT.plac[0] - 6, PT.plac[1] + 60]]; tube(g, P1, 5, '#e9f0ff', { ow: 3, u1: c1 }); }
      if (c2 > 0) { const [fx, fy] = PT.fluid; tube(g, [[fx - 160, fy - 120], [fx, fy]], 4, '#e9f0ff', { ow: 3, u1: c2 }); }
      if (c3 > 0) { const [cx2, cy2] = PT.cord; tube(g, [[cx2 - 260, cy2 - 210], [cx2, cy2]], 4, '#e9f0ff', { ow: 3, u1: c3 }); }
      if (q2 > 0) { txt(g, 'CVS', PT.cervix[0] + 50, PT.cervix[1] + 30, 16, C.hi, { alpha: c1 }); txt(g, 'amniocenteză', PT.fluid[0] - 170, PT.fluid[1] - 140, 16, C.hi, { alpha: c2 }); txt(g, 'cordocenteză', PT.cord[0] - 90, PT.cord[1] - 230, 16, C.hi, { alpha: c3 }); }
      // 4 · testele genetice: probele → cariotip cu trisomie
      const q3 = Math.max(p(3), b.i < 0 ? 1 : 0);
      if (q3 > 0) { g.save(); g.globalAlpha = q3; panel(g, 805, 380, 185, 150); g.restore(); [0, 1, 2, 3, 4, 5].forEach((k) => chromo(g, 832 + (k % 3) * 22 + (k > 2 ? 72 : 0), 445, 44 - (k > 2 ? 14 : 0), k % 3 === 2 ? K.dad : k % 3 ? K.pat : K.mat, { dup: true, w: 6, alpha: q3 })); txt(g, 'cariotip / teste genetice', 897, 555, 15, C.cream, { alpha: q3 }); txt(g, 'ex. trisomii', 897, 500, 15, C.hi, { alpha: sp(q3, 0.4, 1) }); }
      if (on(b, 0)) ring(g, PT.wall[0] - 20, PT.wall[1], 80, 70, ease(b.bt * 1.4));
      if (on(b, 1)) ring(g, 145, 610, 60, 110, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== ECOGRAFIA: 3 căi (secțiune sagitală, anterior = stânga)
   Uter cu sac gestațional (embrion mic), vezica în față, vaginul în jos-spate. 1 = sonda pe peretele abdominal, undele merg
   spre uter; 2 = vezica se umple și undele trec PRIN ea spre uter; 3 = sonda în vagin, lângă col, unde scurte → imagine clară
   devreme; 4 = ecranul: sacul + embrionul măsurat (vârsta, numărul, creșterea, localizarea). */
export function echo() {
  const X = 470, Y = 430, S = 0.95; const L = (x, y) => [X + x * S, Y + y * S];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[L(-430, -80)[0], L(-430, -80)[1]], [L(-430, 170)[0], L(-430, 170)[1]], [L(250, 420)[0], L(250, 420)[1]], [840, 150]],
    phase: (i) => ['transabdominal', 'transvezical', 'endovaginal', 'ce afli'][i] || 'de rutină, non-invaziv',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const full = b.i === 1 ? sp(p(1), 0, 0.5) : b.i < 0 ? 1 : 0;
      pelvis(g, t, { x: X, y: Y, s: S, early: true, fullBladder: full > 0.5 });
      const sac = L(10, 96);
      const probe = (x, y, rot, a) => { g.save(); g.globalAlpha = a; g.translate(x, y); g.rotate(rot); const pr = new Path2D(); pr.roundRect(-26, -30, 52, 60, 16); paint(g, pr, '#dfe6f0', '#aab6c6', '#ffffff', [-26, -30, 52, 60], OUT, 5); tube(g, [[0, -30], [0, -90]], 9, '#8f9bb0', { ow: 3 }); g.restore(); };
      const waves = (x, y, ang, len, a) => { for (let k = 0; k < 4; k++) { const u = loopT(t + k * 0.3, 1.2); g.save(); g.globalAlpha = a * (1 - u); g.strokeStyle = '#bfe0ff'; g.lineWidth = 4; g.beginPath(); g.arc(x, y, 20 + u * len, ang - 0.4, ang + 0.4); g.stroke(); g.restore(); } };
      // 1 · transabdominal
      const a0 = b.i < 0 || b.i === 0 ? 1 : 0.35; const P0 = L(-392, 40);
      probe(P0[0], P0[1], Math.PI / 2, a0); if (b.i < 0 || b.i === 0) waves(P0[0] + 30, P0[1], Math.atan2(sac[1] - P0[1], sac[0] - P0[0]), Math.hypot(sac[0] - P0[0], sac[1] - P0[1]) - 30, 1);
      // 2 · transvezical: prin vezica plină
      const a1 = b.i < 0 || b.i === 1 ? 1 : 0.35; const P1 = L(-372, 190);
      probe(P1[0], P1[1], Math.PI / 2 - 0.25, a1); if (b.i === 1 || b.i < 0) waves(P1[0] + 30, P1[1], Math.atan2(sac[1] - P1[1], sac[0] - P1[0]), Math.hypot(sac[0] - P1[0], sac[1] - P1[1]) - 30, full);
      // 3 · endovaginal
      const a2 = b.i < 0 || b.i === 2 ? 1 : 0.35; const P2 = L(150, 330);
      probe(P2[0], P2[1], -0.45, a2); if (b.i === 2 || b.i < 0) waves(P2[0] - 10, P2[1] - 30, Math.atan2(sac[1] - P2[1], sac[0] - P2[0]), Math.hypot(sac[0] - P2[0], sac[1] - P2[1]) - 30, 1);
      // etichetele
      txt(g, 'peretele\nabdominal', L(-350, -300)[0], L(-350, -300)[1], 16, '#ffd6c4');
      txt(g, full > 0.5 ? 'vezica plină' : 'vezica', L(-150, 330)[0], L(-150, 330)[1], 16, '#ffe9a8');
      txt(g, 'vagin', L(250, 470)[0], L(250, 470)[1], 16, '#ffd6dc');
      txt(g, 'uter cu sac gestațional', L(60, -70)[0], L(60, -70)[1], 17, C.cream);
      // 4 · ecranul
      const q3 = Math.max(p(3), b.i < 0 ? 1 : 0);
      if (q3 > 0) {
        g.save(); g.globalAlpha = q3; const scr = new Path2D(); scr.roundRect(700, 90, 260, 200, 18); paint(g, scr, '#0d0a12', null, null, [700, 90, 260, 200], '#c9b3a6', 6);
        g.save(); g.clip(scr); g.fillStyle = 'rgba(200,200,210,.15)'; g.beginPath(); g.moveTo(830, 100); g.arc(830, 100, 200, 0.5, Math.PI - 0.5); g.closePath(); g.fill(); g.restore();
        ell(g, 830, 200, 58, 46, '#050308', { ow: 3, sc: '#d8d8e0' }); ell(g, 838, 208, 22, 12, '#d8d8e0', { ow: 0 });
        g.strokeStyle = C.hi; g.lineWidth = 3; g.setLineDash([5, 4]); g.beginPath(); g.moveTo(814, 214); g.lineTo(862, 202); g.stroke(); g.setLineDash([]);
        const hb = 0.5 + 0.5 * Math.sin(t * 9); dot(g, 836, 206, 4 + 2 * hb, '#ff6b5e', { ow: 0 });
        g.restore(); lead(g, sac[0] + 40, sac[1] - 30, 700, 200, q3);
        txt(g, 'localizare · vârstă · număr · creștere', 830, 315, 15, C.hi, { alpha: q3 });
      }
      if (on(b, 0)) ring(g, P0[0], P0[1], 60, 60, ease(b.bt * 1.4));
      if (on(b, 1)) ring(g, L(-150, 190)[0], L(-150, 190)[1], 140, 100, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, P2[0], P2[1], 60, 60, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== TESTELE DE SÂNGE (gravida în secțiune, sarcină avansată)
   1 = AFP (galben) e făcută de ficatul fătului; printr-un tub neural DESCHIS (pata roșie pe spate) scapă în lichidul amniotic,
   apoi trece în sângele mamei → eprubeta din stânga (AFP ↑ → DTN); 2 = hCG + inhibina A (violet) pleacă din placentă în sângele
   mamei → Down; 3 = restul analizelor pe eprubetă; 4 = acul în cordon (cordocenteză) → eprubeta cu sânge fetal (dreapta). */
export function blood() {
  const X = 600, Y = 500, S = 0.78;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[300, 250], [880, 200], [60, 625], [900, 640]],
    phase: (i) => ['AFP ↑ → DTN', 'hCG ↑ + inhibină A ↑ → Down', 'restul serului matern', 'sânge fetal · cordocenteză'][i] || 'screening vs. certitudine',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const PT = pelvis(g, t, { x: X, y: Y, s: S });
      // tubul neural deschis
      const q0 = b.i < 0 || b.i === 0 ? 1 : 0.4;
      ell(g, PT.back[0], PT.back[1], 16, 10, '#d8203a', { ow: 3, alpha: q0 });
      // vasul mamei: de la peretele uterin la eprubetă
      const V = [[X - 120 * S, Y - 300 * S], [X - 260 * S, Y - 340 * S], [330, 230], [200, 300], [140, 360]];
      tube(g, V, 16, '#c8203a', { ow: 4, lumen: '#8f1428' });
      // eprubeta mamei
      const tb = new Path2D(); tb.roundRect(110, 360, 60, 200, 26); paint(g, tb, '#f4f1ee', '#d8d2cc', '#ffffff', [110, 360, 60, 200], OUT, 5);
      g.save(); g.beginPath(); g.roundRect(117, 430, 46, 124, 20); g.fillStyle = '#c8203a'; g.fill(); g.restore(); txt(g, 'serul\nmatern', 140, 600, 16, C.cream);
      // 1 · AFP: ficat → tub neural → lichid → mamă
      if (b.i < 0 || b.i === 0) {
        const path = [PT.liver, PT.back, [PT.back[0] - 40, PT.back[1] - 60], [X - 150 * S, Y - 250 * S], ...V.slice(0, 4)];
        flow(g, curve(path), t, '#ffe36e', 10, 0.12, 7);
        if (b.i === 0 && p(0) > 0.4) { pill(g, 300, 290, 230, 44, '#ffe36e', 'AFP ↑ → DTN', { size: 18, alpha: sp(p(0), 0.4, 0.8) }); txt(g, '(AFP ↓ sugerează Down: manual)', 300, 340, 15, '#d8c4b8', { alpha: sp(p(0), 0.6, 1), w: 600 }); }
        lead(g, PT.liver[0], PT.liver[1], PT.liver[0] - 120, PT.liver[1] + 150, 1); txt(g, 'ficatul fetal → AFP', PT.liver[0] - 120, PT.liver[1] + 170, 15, '#ffe9a8');
        lead(g, PT.back[0], PT.back[1], PT.back[0] + 150, PT.back[1] + 100, 1); txt(g, 'tub neural deschis', PT.back[0] + 150, PT.back[1] + 120, 15, '#ffb0a8');
      }
      // 2 · hCG + inhibina A din placentă
      if (b.i < 0 || b.i === 1) {
        flow(g, curve([PT.plac, [PT.plac[0] - 40, PT.plac[1] - 120], ...V.slice(0, 4)]), t + 0.5, '#b48cff', 9, 0.14, 7);
        if (b.i === 1 && p(1) > 0.4) pill(g, 300, 290, 300, 44, '#d6c0ff', 'hCG ↑ + inhibină A ↑ → Down', { size: 17, alpha: sp(p(1), 0.4, 0.8) });
        txt(g, 'placenta', PT.plac[0] + 60, PT.plac[1] - 20, 16, '#ffd6dc');
      }
      // 3 · restul analizelor
      const q2 = Math.max(p(2), b.i < 0 ? 1 : 0);
      if (q2 > 0) ['diabet gestațional', 'grup sanguin + anticorpi', 'infecții: sifilis, rubeolă,', 'VHB, VHC, HIV'].forEach((s, k) => txt(g, s, 50, 660 + k * 30, 15, '#ffd6dc', { align: 'left', alpha: sp(q2, k * 0.15, 0.4 + k * 0.15) }));
      // 4 · cordocenteza
      const q3 = Math.max(p(3), b.i < 0 ? 1 : 0);
      if (q3 > 0) {
        const C0 = [930, 470]; tube(g, [C0, PT.cord], 4, '#e9f0ff', { ow: 3, u1: sp(q3, 0, 0.5) });
        const t2 = new Path2D(); t2.roundRect(905, 500, 56, 170, 24); paint(g, t2, '#f4f1ee', '#d8d2cc', '#ffffff', [905, 500, 56, 170], OUT, 5);
        const lv = 120 * sp(q3, 0.5, 1); g.save(); g.beginPath(); g.roundRect(911, 664 - lv, 44, lv, 18); g.fillStyle = '#8f1428'; g.fill(); g.restore();
        txt(g, 'sânge fetal', 933, 700, 16, C.cream, { alpha: q3 }); txt(g, 'izoimunizare Rh ·\nanaliză cromozomală', 900, 755, 15, '#ffd6dc', { alpha: sp(q3, 0.5, 1) });
      }
      if (on(b, 0)) ring(g, PT.back[0], PT.back[1], 60, 50, ease(b.bt * 1.4));
      if (on(b, 1)) ring(g, PT.plac[0], PT.plac[1], 80, 120, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, 150, 700, 130, 90, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== METODELE INVAZIVE (gravida în secțiune; poza LP în stânga-jos)
   1 = amniocenteza: acul intră prin abdomen și uter, ghidat de sonda de ecografie, într-un buzunar de lichid amniotic DEPARTE de
   făt; 2 = seringa se umple cu ~20–30 mL; 3 = CVS transcervical: cateterul intră prin vagin și col, merge PE LÂNGĂ peretele
   uterin, în afara sacului amniotic, până la placentă și aspiră vilozități (10–30 mg); 4 = cordocenteza: acul transcutanat în
   cordonul ombilical → sânge fetal. */
export function invasive() {
  const X = 600, Y = 470, S = 0.8;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[400, 170], [210, 330], [560, 760], [640, 60]],
    phase: (i) => ['amniocenteza · 14–18 săpt.', 'lichidul: cca. 20–30 mL', 'CVS · 10–30 mg', 'cordocenteza'][i] || 'aduc celule fetale',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const PT = pelvis(g, t, { x: X, y: Y, s: S });
      // sonda de ecografie (ghidaj)
      const pr0 = [PT.wall[0] + 30, PT.wall[1] + 120];
      g.save(); g.translate(pr0[0] - 40, pr0[1]); g.rotate(Math.PI / 2 - 0.3); const pr = new Path2D(); pr.roundRect(-24, -28, 48, 56, 14); paint(g, pr, '#dfe6f0', '#aab6c6', '#ffffff', [-24, -28, 48, 56], OUT, 5); g.restore();
      for (let k = 0; k < 3; k++) { const u = loopT(t + k * 0.4, 1.2); g.save(); g.globalAlpha = 0.6 * (1 - u); g.strokeStyle = '#bfe0ff'; g.lineWidth = 4; g.beginPath(); g.arc(pr0[0] - 10, pr0[1], 20 + u * 90, -0.9, -0.1); g.stroke(); g.restore(); }
      // 1–2 · amniocenteza
      const am = b.i < 0 ? 1 : b.i === 0 ? sp(p(0), 0, 0.8) : b.i === 1 ? 1 : 0.35;
      const [fx, fy] = PT.fluid; const N0 = [fx - 230, fy - 180];
      tube(g, [N0, [fx, fy]], 5, '#e9f0ff', { ow: 3, u1: am, alpha: b.i >= 2 ? 0.4 : 1 });
      // seringa
      g.save(); g.globalAlpha = b.i >= 2 ? 0.4 : 1; g.translate(N0[0], N0[1]); g.rotate(Math.atan2(fy - N0[1], fx - N0[0])); const sy = new Path2D(); sy.roundRect(-150, -24, 150, 48, 10); paint(g, sy, 'rgba(240,248,255,.9)', null, '#ffffff', [-150, -24, 150, 48], OUT, 5);
      const fill = b.i === 1 ? sp(p(1), 0, 0.8) : b.i > 1 || b.i < 0 ? 1 : 0; g.fillStyle = '#ffe9a8'; g.fillRect(-140 + 130 * (1 - fill), -16, 130 * fill, 32); tube(g, [[-150, 0], [-190, 0]], 10, '#c9b3a6', { ow: 3 }); g.restore();
      if (b.i === 1) { pill(g, 210, 230, 220, 46, C.hi, 'cca. 20–30 mL', { size: 18, alpha: sp(p(1), 0.3, 0.7) }); ['boli genetice (Down)', 'sexul fătului', 'tulburări enzimatice', 'defectul de tub neural'].forEach((s, k) => txt(g, s, 210, 290 + k * 28, 15, C.cream, { alpha: sp(p(1), 0.4 + k * 0.1, 0.7 + k * 0.1) })); }
      txt(g, 'lichid amniotic', fx + 10, fy - 50, 16, '#cfeaff', { alpha: b.i < 2 ? 1 : 0.5 });
      // 3 · CVS transcervical: pe lângă peretele uterin, în afara sacului, până la placentă
      const cv = b.i < 0 ? 1 : b.i === 2 ? sp(p(2), 0, 0.75) : b.i > 2 ? 0.35 : 0;
      if (cv > 0) {
        // traseul: vagin → col → de-a lungul peretelui posterior (între perete și sac) → marginea placentei
        const E = (ang) => { const cx = -20, cy = -40, rx = 250, ry = 282, r = 0.08; const x = Math.cos(ang) * rx, y = Math.sin(ang) * ry; return [X + (cx + x * Math.cos(r) - y * Math.sin(r)) * S, Y + (cy + x * Math.sin(r) + y * Math.cos(r)) * S]; };
        const CP = [[PT.vagina[0] + 20, PT.vagina[1] + 40], PT.vagina, PT.cervix, E(1.45), E(1.1), E(0.75)];
        tube(g, CP, 6, '#e9f0ff', { ow: 3, u1: cv, alpha: b.i === 3 ? 0.4 : 1 });
        if (b.i === 2 && p(2) > 0.75) { const tip = E(0.75); for (let k = 0; k < 5; k++) { const u = loopT(t + k * 0.3, 1.5); const q = at(curve(CP), 1 - u * 0.5); dot(g, q[0], q[1], 5, K.plac, { ow: 2, alpha: 1 - u }); } pill(g, 820, 860, 260, 44, C.hi, 'țesut corial 10–30 mg', { size: 17 }); txt(g, '~10–13 săpt. (manual)', 820, 905, 15, '#d8c4b8', { w: 600 }); }
        txt(g, 'col', PT.cervix[0] + 40, PT.cervix[1] + 10, 15, '#ffd6dc');
      }
      // 4 · cordocenteza
      const cd = b.i < 0 ? 1 : b.i === 3 ? sp(p(3), 0, 0.7) : 0;
      if (cd > 0) { const N3 = [X - 40 * S, Y - 470 * S]; tube(g, [N3, PT.cord], 5, '#e9f0ff', { ow: 3, u1: cd }); if (b.i === 3 && p(3) > 0.7) { for (let k = 0; k < 4; k++) { const u = loopT(t + k * 0.3, 1.4); const q = at([PT.cord, N3], u); dot(g, q[0], q[1], 5, '#8f1428', { ow: 2, alpha: 1 - u }); } txt(g, 'sânge fetal din cordon', N3[0] + 150, N3[1] + 10, 16, C.hi); } txt(g, 'cordonul ombilical', PT.cord[0] + 70, PT.cord[1] + 30, 15, '#e9dcf5', { alpha: cd }); }
      txt(g, 'placenta', PT.plac[0] + 80, PT.plac[1] - 40, 16, '#ffd6dc');
      if (on(b, 0)) ring(g, fx, fy, 60, 50, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, PT.plac[0], PT.plac[1] + 40, 90, 120, ease(b.bt * 1.4));
      if (on(b, 3)) ring(g, PT.cord[0], PT.cord[1], 50, 50, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== CAZUL (1): copilul și diagnosticul
   Un copil desenat (fața rotundă, ochi cu pliu epicantic, limba scoasă), cu o pată de „ceață” = apatic; 2 = apar indiciile pe
   desen: față rotundă + pliuri epicantice, hipoton (corp „moale”), pliul palmar unic (palma), retard; 3 = cariotipul 21 cu trei
   copii + diagnosticul. Nimic important în stânga-jos (poza din LP). */
export function caseClin() {
  const FX = 620, FY = 360;
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[FX - 250, FY - 200], [FX + 260, 560], [FX + 240, 760]],
    phase: (i) => ['cazul', 'ce găsești', 'diagnosticul'][i] || 'copil de 5 ani',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3); const q1 = Math.max(p(1), b.i < 0 ? 1 : 0), q2 = Math.max(p(2), b.i < 0 ? 1 : 0);
      // trunchiul (moale, hipoton)
      const tr = new Path2D(); tr.moveTo(FX - 150, FY + 380); tr.bezierCurveTo(FX - 170, FY + 250, FX - 120, FY + 190, FX, FY + 190); tr.bezierCurveTo(FX + 120, FY + 190, FX + 170, FY + 250, FX + 150, FY + 380); tr.closePath();
      paint(g, tr, '#7fb0ff', '#5b8fe6', '#cfe0ff', [FX - 170, FY + 190, 340, 190], OUT, 6);
      // capul
      const hd = new Path2D(); hd.ellipse(FX, FY, 190, 180, 0, 0, 7); paint(g, hd, K.skin, K.skinS, K.skinL, bb(FX, FY, 190, 180), OUT, 6);
      g.save(); g.fillStyle = '#c99a4a'; g.beginPath(); g.ellipse(FX, FY - 120, 184, 80, 0, Math.PI, 0); g.fill(); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(); g.restore();
      [-1, 1].forEach((d) => ell(g, FX + d * 188, FY + 10, 26, 36, K.skin, { ow: 5, shade: K.skinS }));
      // ochii migdalați, oblici, cu pliu epicantic
      [-1, 1].forEach((d) => { const ex = FX + d * 70, ey = FY - 10; g.save(); g.translate(ex, ey); g.rotate(-d * 0.22); g.fillStyle = '#ffffff'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.ellipse(0, 0, 34, 16, 0, 0, 7); g.fill(); g.stroke(); dot(g, d * 4, 0, 10, '#4a3020', { ow: 0 }); g.lineWidth = 4; g.beginPath(); g.arc(-d * 30, -2, 16, d > 0 ? Math.PI * 0.6 : -0.4, d > 0 ? Math.PI * 1.4 : 0.4); g.stroke(); g.restore(); });
      // nasul mic, gura deschisă cu limba scoasă
      g.save(); g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.moveTo(FX - 14, FY + 46); g.quadraticCurveTo(FX, FY + 60, FX + 14, FY + 46); g.stroke(); g.restore();
      const m = new Path2D(); m.ellipse(FX, FY + 104, 52, 28, 0, 0, 7); paint(g, m, '#7a2a3a', null, null, bb(FX, FY + 104, 52, 28), OUT, 5);
      const tg = new Path2D(); tg.ellipse(FX, FY + 128 + (REDUCED ? 0 : Math.sin(t * 2) * 2), 34, 26, 0, 0, 7); paint(g, tg, '#ff8fa3', '#e0607a', '#ffd0da', bb(FX, FY + 128, 34, 26), OUT, 5);
      // apatic: o ceață cu „…”
      if (b.i < 0 || b.i === 0) { const a = b.i === 0 ? sp(p(0), 0.3, 0.8) : 1; g.save(); g.globalAlpha = 0.6 * a; for (let k = 0; k < 4; k++) { g.fillStyle = 'rgba(220,210,235,.35)'; g.beginPath(); g.ellipse(FX + 230 + k * 18, FY - 190 - k * 10, 50 - k * 6, 28 - k * 3, 0, 0, 7); g.fill(); } g.restore(); txt(g, 'apatic', FX + 260, FY - 200, 18, C.cream, { alpha: a }); txt(g, 'limba mereu scoasă', FX + 250, FY + 150, 17, C.cream, { alpha: a }); lead(g, FX + 40, FY + 128, FX + 160, FY + 150, a); txt(g, 'ochii par anormali', FX - 270, FY - 120, 17, C.cream, { alpha: a }); lead(g, FX - 100, FY - 18, FX - 220, FY - 100, a); }
      // 2 · indiciile
      if (b.i === 1 || (b.i < 0 && false)) {
        const k = (j) => sp(q1, j * 0.2, j * 0.2 + 0.3);
        pill(g, FX - 300, FY - 30, 230, 44, '#ffd6c4', 'față rotundă · epicant', { size: 15, alpha: k(0) });
        pill(g, FX + 300, FY + 300, 150, 44, '#ffd6c4', 'hipoton', { size: 16, alpha: k(1) });
        pill(g, FX + 300, FY + 30, 160, 44, '#ffd6c4', 'retard mental', { size: 16, alpha: k(3) });
        // palma cu pliul unic
        const a = k(2); g.save(); g.globalAlpha = a; g.translate(FX + 300, FY + 160); g.scale(0.45, 0.45); [[-50, -110, 26, 90], [-14, -130, 26, 110], [20, -124, 26, 104], [52, -100, 22, 80]].forEach(([x, y, w, h]) => { const pp = new Path2D(); pp.roundRect(x - w / 2, y, w, h + 30, w / 2); paint(g, pp, K.skin, K.skinS, K.skinL, [x - w / 2, y, w, h], OUT, 8); }); const pa = new Path2D(); pa.roundRect(-74, -40, 148, 150, 50); paint(g, pa, K.skin, K.skinS, K.skinL, [-74, -40, 148, 150], OUT, 8); g.strokeStyle = '#8a3b2a'; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(-66, 10); g.lineTo(66, 14); g.stroke(); g.restore();
        txt(g, 'pliu palmar unic', FX + 300, FY + 236, 15, C.cream, { alpha: a });
      }
      // 3 · diagnosticul
      if (q2 > 0) { panel(g, FX - 200, 740, 400, 150, { fill: 'rgba(255,227,110,.10)', stroke: 'rgba(255,227,110,.6)' }); [K.mat, K.pat, K.dad].forEach((c, j) => chromo(g, FX - 140 + j * 34, 815, 54, c, { dup: true, w: 9, cen: 0.18, alpha: sp(q2, j * 0.2, j * 0.2 + 0.4) })); txt(g, 'sindromul Down\n(trisomia 21)', FX + 70, 815, 21, C.hi, { alpha: sp(q2, 0.5, 1) }); }
      if (on(b, 1)) ring(g, FX, FY + 40, 240, 250, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== CAZUL (2): baza embriologică
   1 = ovocitul I (mama de 40 de ani): perechea 21 dublată (roșu + albastru), oprit decenii; 2 = în MI omologii NU se separă:
   ovocitul II primește AMBII 21 (dublați), globul polar 1 niciunul; 3 = spermatozoidul aduce UN 21 (verde); la fecundație
   ovocitul termină MII: în ovul rămân câte o cromatidă din fiecare 21 (roșu + albastru), restul în GP2 → zigotul are trei 21:
   47,XX,+21; 4 = zigotul se divide: toate celulele au trei copii ale lui 21. */
export function caseEmb() {
  const A = [175, 300], B = [550, 300], Z = [550, 660];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[A[0] - 150, A[1] - 150], [B[0] - 150, B[1] - 150], [880, 300], [820, 560]],
    phase: (i) => ['ovocitul I · mamă de 40 de ani', 'nondisjuncție în MI', 'fecundația', '47,XX,+21'][i] || 'de unde vine al treilea 21',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const q = (k) => Math.max(p(k), b.i < 0 ? 1 : 0);
      // 1 · ovocitul I
      oocyte(g, A[0], A[1], 110, t, { inner: (gg) => { chromo(gg, -16, 0, 70, K.mat, { dup: true, w: 11, cen: 0.18 }); chromo(gg, 18, 0, 70, K.pat, { dup: true, w: 11, cen: 0.18 }); } });
      txt(g, 'ovocit I', A[0], A[1] + 160, 18, C.cream);
      // ceasul: 40 de ani oprit în profaza I
      const yrs = Math.round(40 * q(0)); pill(g, A[0], A[1] - 170, 230, 44, '#cdbcf1', `mamă de ${yrs} de ani`, { size: 17 });
      // 2 · nondisjuncția în MI
      const q1 = q(1);
      if (q1 > 0) {
        arr(g, A[0] + 140, A[1], B[0] - 140, B[1], '#fff3e6', 5, q1); txt(g, 'MI:\nnondisjuncție', 357, A[1] - 52, 16, '#ffb0a8', { alpha: q1 });
        const fert = q(2);
        oocyte(g, B[0], B[1], 104, t, { corona: true, alpha: q1, inner: (gg) => {
          if (fert < 0.55) { chromo(gg, -16, 0, 66, K.mat, { dup: true, w: 11, cen: 0.18 }); chromo(gg, 18, 0, 66, K.pat, { dup: true, w: 11, cen: 0.18 }); }
          else { chromo(gg, -16, 0, 60, K.mat, { w: 11, cen: 0.18 }); chromo(gg, 18, 0, 60, K.pat, { w: 11, cen: 0.18 }); if (fert > 0.75) chromo(gg, 50, 0, 60, K.dad, { w: 11, cen: 0.18 }); }
        } });
        polar(g, B[0] + 120, B[1] - 100, 26, t, q1); txt(g, 'GP1: fără 21', B[0] + 160, B[1] - 150, 15, '#ffd0e6', { alpha: q1 });
        txt(g, fert > 0.55 ? 'ovul' : 'ovocit II: două 21', B[0], B[1] + 160, 18, C.cream, { alpha: q1 });
      }
      // 3 · fecundația
      const q2 = q(2);
      if (q2 > 0) {
        const sx = lerp(900, B[0] + 110, sp(q2, 0, 0.5));
        g.save(); g.globalAlpha = 1 - sp(q2, 0.55, 0.75); sperm(g, sx, B[1] + 20, 1.1, Math.PI, t); g.restore();
        chromo(g, sx - 4, B[1] + 20, 26, K.dad, { w: 7, alpha: 1 - sp(q2, 0.55, 0.75) });
        txt(g, 'spermatozoid: un 21', 860, B[1] + 90, 16, '#bff0d2', { alpha: 1 - sp(q2, 0.6, 0.8) });
        if (q2 > 0.55) { polar(g, B[0] - 120, B[1] - 100, 22, t, sp(q2, 0.55, 0.75)); chromo(g, B[0] - 126, B[1] - 100, 22, K.mat, { w: 5, alpha: sp(q2, 0.55, 0.75) }); chromo(g, B[0] - 114, B[1] - 100, 22, K.pat, { w: 5, alpha: sp(q2, 0.55, 0.75) }); txt(g, 'GP2', B[0] - 160, B[1] - 140, 15, '#ffd0e6', { alpha: sp(q2, 0.55, 0.75) }); }
      }
      // 4 · zigotul 47,XX,+21 → toate celulele
      const q3 = q(3);
      if (q3 > 0) {
        arr(g, B[0], B[1] + 190, Z[0], Z[1] - 130, '#fff3e6', 5, q3);
        const dv = sp(q3, 0.4, 0.9);
        if (dv < 0.05) cellB(g, Z[0], Z[1], 110, 110, t, { fill: K.ooc, shade: K.oocS, light: K.oocL, alpha: q3 });
        const cells = dv < 0.05 ? [[0, 0, 1]] : [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([u, v]) => [u * 62 * dv, v * 58 * dv, lerp(1, 0.5, dv)]);
        cells.forEach(([dx, dy, s], k) => { if (dv >= 0.05) cellB(g, Z[0] + dx, Z[1] + dy, 110 * s, 104 * s, t, { fill: K.ooc, shade: K.oocS, light: K.oocL, seed: k }); [K.mat, K.pat, K.dad].forEach((c, j) => chromo(g, Z[0] + dx + (j - 1) * 30 * s, Z[1] + dy, 60 * s, c, { w: 11 * Math.max(0.6, s), cen: 0.18, alpha: q3 })); });
        pill(g, Z[0], Z[1] + 160, 220, 50, C.hi, '47,XX,+21', { size: 21, alpha: q3 });
        if (dv > 0.6) txt(g, 'toate celulele: trei 21', Z[0] + 270, Z[1], 18, C.hi);
      }
      if (on(b, 1)) ring(g, B[0], B[1], 140, 140, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== CAPCANELE: 6 carduri cu câte o mini-schemă
   1 = MI vs. MII (4 gameți anormali vs. 2); 2 = profaza I → metafaza II; 3 = 15q: lipsă paternă = Prader-Willi;
   4 = 22q11.2 (DiGeorge) și 5p− (cri-du-chat); 5 = 13/14 și 9/22; 6 = markerii serului matern. */
export function traps() {
  const CELL = [[255, 170], [745, 170], [255, 460], [745, 460], [255, 750], [745, 750]];
  const T = ['MI vs. MII', 'unde stă ovocitul', 'Angelman vs. Prader-Willi', 'DiGeorge · cri-du-chat', 'translocațiile', 'serul matern'];
  return {
    home: HOME, cams: CELL.map(() => HOME),
    anchors: CELL.map(([x, y]) => [x - 205, y - 105]),
    phase: (i) => T[i] || 'ce se confundă',
    draw(g, t, b) {
      bg(g);
      CELL.forEach(([x, y], k) => {
        const act = b.i === k || b.i < 0; const a = act ? 1 : 0.55;
        panel(g, x - 230, y - 125, 460, 250, { fill: b.i === k ? 'rgba(217,101,42,.16)' : 'rgba(255,240,228,.05)', stroke: b.i === k ? 'rgba(255,180,138,.7)' : 'rgba(255,230,210,.14)' });
        txt(g, T[k], x, y - 96, 18, b.i === k ? C.hi : '#ffd6c4', { alpha: a });
        g.save(); g.globalAlpha = a;
        if (k === 0) { // 4 gameți: MI (toți anormali) vs. MII (2 din 4)
          ['MI', 'MII'].forEach((m, j) => { const ox = x - 110 + j * 220; txt(g, m, ox, y - 50, 16, C.cream); for (let q = 0; q < 4; q++) { const bad = j === 0 ? true : q >= 2; cellB(g, ox - 66 + q * 44, y + 20, 18, 18, t, { fill: bad ? '#ffd0c8' : K.cyt, seed: q }); dot(g, ox - 66 + q * 44, y + 56, 6, bad ? K.bad : K.ok, { ow: 2 }); } });
        } else if (k === 1) {
          const pp = new Path2D(); pp.roundRect(x - 200, y - 10, 280, 34, 12); paint(g, pp, '#cdbcf1', null, null, [x - 200, y - 10, 280, 34], OUT, 3); txt(g, 'profaza I (fetal → ovulație)', x - 60, y + 7, 14, OUT, { stroke: false });
          const p2 = new Path2D(); p2.roundRect(x + 90, y - 10, 110, 34, 12); paint(g, p2, '#ffd0e6', null, null, [x + 90, y - 10, 110, 34], OUT, 3); txt(g, 'metafaza II', x + 145, y + 7, 14, OUT, { stroke: false });
          txt(g, 'termină MII doar la fecundație', x, y + 70, 15, C.cream);
        } else if (k === 2) {
          [[K.mat, 'M', 0], [K.pat, 'P', 1]].forEach(([c, l, j]) => { chromo(g, x - 70 + j * 140, y + 20, 120, c, { dup: true, w: 12, cen: 0.14, segL: [[0.22, 0.38, j ? '#1a1018' : '#ffb15c']], segR: [[0.22, 0.38, j ? '#1a1018' : '#ffb15c']] }); });
          txt(g, 'lipsă P →\nPrader-Willi', x + 70, y + 100, 14, C.hi); txt(g, 'lipsă M →\nAngelman', x - 70, y + 100, 14, C.cream);
        } else if (k === 3) {
          chromo(g, x - 90, y + 20, 80, KARc, { dup: true, w: 11, cen: 0.22, segL: [[0.4, 0.5, '#1a1018']], segR: [[0.4, 0.5, '#1a1018']] }); txt(g, '22q11.2', x - 90, y + 86, 15, C.hi);
          chromo(g, x + 90, y + 30, 110, KARc, { dup: true, w: 11, cen: 0.18 }); chromo(g, x + 130, y - 40, 24, '#ffb15c', { dup: true, w: 11, cen: 0.99, rot: 0.6 }); txt(g, '5p− (deleție)', x + 90, y + 96, 15, C.cream);
        } else if (k === 4) {
          chromo(g, x - 110, y + 20, 120, '#ffd166', { dup: true, w: 11, cen: 0.46, segL: [[0, 0.46, '#7fc8ff']], segR: [[0, 0.46, '#7fc8ff']] }); txt(g, '13/14 · cea mai frecventă', x - 110, y + 96, 14, C.hi);
          chromo(g, x + 70, y + 10, 110, '#b9a3ea', { dup: true, w: 11, cen: 0.3, segL: [[0.8, 1, '#7fe0a8']], segR: [[0.8, 1, '#7fe0a8']] }); chromo(g, x + 140, y + 20, 34, '#7fe0a8', { dup: true, w: 11, cen: 0.3, segL: [[0.6, 1, '#b9a3ea']], segR: [[0.6, 1, '#b9a3ea']] }); txt(g, '9/22 · Ph', x + 105, y + 96, 14, C.cream);
        } else {
          [['AFP ↑', 'DTN', '#ffe36e'], ['hCG ↑ + inhibină A ↑', 'Down', '#d6c0ff']].forEach(([m, r, c], j) => { const yy = y - 20 + j * 60; pill(g, x - 70, yy, 200, 38, c, m, { size: 14 }); arr(g, x + 40, yy, x + 100, yy, '#fff3e6', 4, 1); txt(g, r, x + 150, yy, 17, C.cream); });
          txt(g, 'amnio 14–18 săpt., 20–30 mL · CVS 10–30 mg', x, y + 92, 13, '#d8c4b8', { w: 700 });
        }
        g.restore();
      });
    },
  };
}
const KARc = '#e9dcff';

/* =================================================== RECAPITULAREA: drumul de pe copertă, cu rândul tabelului aprins */
export function recap({ spec }) { return cover({ spec: { ...spec, sceneOpts: { map: [0, 0, 0, 0, 1, 2, 2, 2, 3, 3, 2] } } }); }
