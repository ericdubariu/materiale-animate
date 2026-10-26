// Coperta, cronologia și Partea A (generalități): perioada de dezvoltare, diviziunea, perioadele critice, cauzele.
import {
  cam, HOME, C, K, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead,
  OUT, clamp, lerp, ease, paint, blob, bb, REDUCED,
  chromo, cellB, spindleFib, dividing, sperm, oocyte, polar, cleave, blastocyst, embryoC, EMB, fetus, srand, rr,
} from './k1.js';

const sp = (u, a, b) => ease(clamp((u - a) / (b - a))); // sub-etapă a unui punct

/* =================================================== COPERTA: drumul normal, de la gamet la naștere
   Se vede: un drum în S, de sus-stânga până jos; pe el, în ordine: gameții (spermatozoid + ovocit, meioză 2n → n) →
   zigotul 2n → blastocistul care se implantează (S1–S2) → embrionul în C (S3–S8) → fătul (S9–S38) → nașterea (~9 luni, 40 SA).
   Un punct luminos parcurge drumul în buclă. Punctul 1 = embrion + făt (perioade critice), 2 = gameții (CGP),
   3 = lupa pe zigot cu cromozomii (un 21 în plus apare), 4 = gameți anormali + sonda de ecografie pe făt. */
export function cover({ spec } = {}) {
  const map = (spec && spec.sceneOpts && spec.sceneOpts.map) || null; // recapitulare: rândul tabelului → tema de pe drum
  const ROAD = curve([[90, 200], [330, 140], [560, 210], [800, 200], [900, 360], [760, 520], [520, 540], [250, 560], [150, 720], [330, 840], [620, 830], [880, 800]], 12);
  const ST = [
    { at: 0.04, x: 140, y: 230, lab: 'gameții\nmeioză: 2n → n' },
    { at: 0.2, x: 450, y: 180, lab: 'fecundația\nzigot 2n' },
    { at: 0.36, x: 790, y: 230, lab: 'S1–S2\nimplantare' },
    { at: 0.55, x: 700, y: 500, lab: 'S3–S8\norganogeneza' },
    { at: 0.73, x: 320, y: 560, lab: 'S9–S38\nperioada fetală' },
    { at: 0.95, x: 800, y: 800, lab: 'nașterea\n~9 luni · 40 SA' },
  ];
  return {
    home: HOME, cams: map ? map.map(() => HOME) : [HOME, HOME, HOME, HOME],
    anchors: map ? [] : [[560, 640], [70, 120], [520, 90], [420, 760]],
    phase: (i) => ['perioadele critice', 'gameții (CGP)', 'cromozomii', 'diagnosticul prenatal'][map ? (i < 0 ? -1 : map[i]) : i] || 'drumul normal',
    draw(g, t, b0) {
      const b = map ? { ...b0, i: b0.i < 0 ? -1 : map[b0.i] } : b0;
      bg(g); const p = P(b, t, 4);
      // drumul
      tube(g, ROAD, 46, 'rgba(255,240,228,.10)', { ow: 0, raw: true });
      tube(g, ROAD, 6, 'rgba(255,230,210,.35)', { ow: 0, raw: true, dash: [14, 12] });
      // banda perioadei critice pe drum (S3–S8 roșu, apoi fetal galben) — punctul 1
      const c0 = p(0);
      if (c0 > 0) { tube(g, ROAD, 16, K.bad, { raw: true, u0: 0.46, u1: lerp(0.46, 0.64, c0), ow: 4, alpha: 0.9 }); tube(g, ROAD, 12, K.warnY, { raw: true, u0: 0.64, u1: lerp(0.64, 0.9, clamp(c0 * 1.6 - 0.6)), ow: 4, alpha: 0.85 }); }
      const trav = at(ROAD, loopT(t, 12)); dot(g, trav[0], trav[1], 11, C.hi, { ow: 3 });
      // 1 · gameții
      const gA = b.i < 0 || b.i === 1 ? 1 : 0.75;
      oocyte(g, 150, 160, 44, t, { corona: true, alpha: gA });
      sperm(g, 250, 250, 0.55, -2.6, t, { alpha: gA }); sperm(g, 270, 300, 0.5, -2.8, t + 0.4, { alpha: gA });
      if (p(1) > 0) { for (let k = 0; k < 3; k++) { const u = loopT(t + k * 0.9, 2.7); dot(g, lerp(40, 120, u), lerp(330, 210, u), 9, K.cgp, { alpha: p(1) * Math.sin(u * Math.PI) }); } }
      // 2 · zigotul (+ lupa cu cromozomii la punctul 3)
      cleave(g, 450, 120, 34, 1, t);
      const z = p(2);
      if (z > 0) {
        const lx = 560, ly = 330; g.save(); g.globalAlpha = z;
        lead(g, 470, 150, lx - 60, ly - 70, z);
        ell(g, lx, ly, 120, 92, '#1d1220', { ow: 5, sc: '#ffe7d6' });
        const cols = [K.mat, K.pat];
        for (let k = 0; k < 6; k++) chromo(g, lx - 80 + k * 30, ly - 10, k < 2 ? 56 : k < 4 ? 46 : 36, cols[k % 2], { w: 10 });
        const ex = sp(z, 0.4, 0.9); chromo(g, lx + 100 - 10 * ex, ly - 10 - 40 * (1 - ex), 36, K.dad, { w: 10, alpha: ex, glow: ex });
        g.restore();
        txt(g, '21 în plus → 47', lx, ly + 76, 18, C.hi, { alpha: sp(z, 0.6, 1) });
      }
      // 3 · blastocistul care se implantează
      const ew = new Path2D(); ew.roundRect(730, 262, 140, 30, 12); paint(g, ew, K.endo, K.endoS, null, [730, 262, 140, 30], OUT, 4);
      blastocyst(g, 800, 238, 30, t, { zona: false });
      // 4 · embrionul în C
      embryoC(g, 700, 430, 0.5, t, { stage: 0.6, alpha: b.i < 0 || b.i === 0 ? 1 : 0.8 });
      // 5 · fătul
      const fa = b.i < 0 || b.i === 0 || b.i === 3 ? 1 : 0.8;
      ell(g, 330, 480, 108, 92, K.fluid, { ow: 5, shade: K.fluidS, light: '#e3f5ff', alpha: fa });
      fetus(g, 340, 488, 0.55, t, { alpha: fa });
      // 6 · nașterea: nou-născutul
      g.save(); g.translate(800, 735);
      const sw = new Path2D(); sw.moveTo(-40, -34); sw.bezierCurveTo(10, -52, 80, -40, 96, 0); sw.bezierCurveTo(100, 30, 50, 46, -10, 40); sw.bezierCurveTo(-46, 36, -60, 0, -40, -34); sw.closePath();
      paint(g, sw, '#bfe0ff', '#8fbfe6', '#eef7ff', [-60, -52, 160, 98], OUT, 5);
      g.strokeStyle = '#8fbfe6'; g.lineWidth = 3; g.beginPath(); g.moveTo(-6, -40); g.quadraticCurveTo(20, 0, 0, 38); g.stroke();
      ell(g, -58, -4, 36, 34, K.skin, { ow: 5, shade: K.skinS, light: K.skinL });
      g.fillStyle = '#ffd0e6'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.ellipse(-50, -30, 34, 18, -0.4, Math.PI, 0); g.fill(); g.stroke();
      g.lineCap = 'round'; g.beginPath(); g.arc(-72, -4, 5, 0.2, Math.PI - 0.2); g.stroke(); g.beginPath(); g.arc(-56, 0, 5, 0.2, Math.PI - 0.2); g.stroke();
      g.restore();
      // gameții anormali + sonda (punctul 4)
      const q = p(3);
      if (q > 0) {
        sperm(g, 120, 330, 0.55, -2.4, t, { kind: 'twohead', alpha: q });
        // sonda de ecografie pe sacul amniotic + undele
        g.save(); g.globalAlpha = q; g.translate(222, 400); g.rotate(-0.7); const pr = new Path2D(); pr.roundRect(-22, -60, 44, 70, 14); paint(g, pr, '#dfe6f0', '#aab6c6', '#ffffff', [-22, -60, 44, 70], OUT, 5); g.restore();
        for (let k = 0; k < 3; k++) { const u = loopT(t + k * 0.4, 1.2); g.save(); g.globalAlpha = q * (1 - u); g.strokeStyle = '#bfe0ff'; g.lineWidth = 4; g.beginPath(); g.arc(240, 420, 20 + u * 70, -0.1, 1.2); g.stroke(); g.restore(); }
      }
      // etichetele stațiilor
      ST.forEach((s, k) => txt(g, s.lab, s.x + (k === 0 ? 0 : 0), s.y + (k === 3 ? 110 : k === 4 ? 135 : k === 5 ? 60 : 95), 17, C.cream, { w: 700 }));
      if (on(b, 0)) ring(g, 520, 500, 280, 150, ease(b.bt * 1.4));
      if (on(b, 1)) ring(g, 190, 220, 130, 120, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, 560, 330, 140, 112, ease(b.bt * 1.4));
      if (on(b, 3)) ring(g, 300, 470, 170, 130, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== CRONOLOGIA: același conceptus, săptămână cu săptămână
   Se vede: o axă de săptămâni (de la fecundație, 0 → 10) jos, cu benzile S1–S2 (gri, tot sau nimic), S3–S8 (roșu, majore),
   S9 → (galben, minore). Cursorul înaintează; în centru, conceptusul se transformă: zigot → 2 celule → morula → blastocist (S1)
   → blastocist intrat în endometru cu disc bilaminar (S2) → disc trilaminar cu creasta primitivă (S3) → embrion plicaturat cu
   somite + cord (S4) → embrion cu mugurii membrelor și ochi (S5–S8) → făt (S9 →). */
export function chrono() {
  const X0 = 80, X1 = 930; const wx = (w) => lerp(X0, X1, w / 10);
  const RANGE = [[0, 2], [2, 4], [4, 8], [8, 10]];
  const CAP = [[0.2, 'zigot (ziua 0)'], [0.45, '2 celule'], [0.75, 'S1: morula'], [1.0, 'S1: blastocist'], [2.0, 'S2: implantare, disc bilaminar'], [3.0, 'S3: gastrulație, disc trilaminar'], [4.0, 'S4: plicaturare, somite, cord, tub neural'], [8.0, 'S5–S8: fața, membrele, organele'], [99, 'S9 →: perioada fetală']];
  const CX = 500, CY = 420;
  return {
    home: HOME, cams: RANGE.map(() => HOME),
    anchors: [[wx(1), 712], [wx(3), 712], [wx(6), 712], [wx(9), 712]],
    phase: (i) => ['S1–S2', 'S3–S4', 'S5–S8', 'S9 → naștere'][i] || 'săptămâna cu săptămâna',
    draw(g, t, b) {
      bg(g);
      let w;
      if (b.i < 0) w = 10 * loopT(t, 16); else { const [a, c] = RANGE[b.i]; w = lerp(a, c, ease(clamp(b.bt / (b.bd * 0.8)))); }
      // scena conceptusului
      const fade = (a, c) => clamp(Math.min((w - a) / 0.15 + 1, (c - w) / 0.15 + 1)); // vizibil în [a,c], cu tranziții
      // fundal: endometrul apare de la S2
      const endoA = clamp((w - 1.05) / 0.3) * (1 - clamp((w - 3.0) / 0.3));
      if (endoA > 0) { const en = new Path2D(); en.moveTo(170, 520); en.bezierCurveTo(330, 500, 670, 500, 830, 520); en.lineTo(830, 640); en.lineTo(170, 640); en.closePath(); g.save(); g.globalAlpha = endoA; paint(g, en, K.endo, K.endoS, '#f7b3bf', [170, 500, 660, 140], OUT, 5); g.restore(); txt(g, 'endometrul', 760, 610, 17, '#ffd6dc', { alpha: endoA }); }
      // zigot / 2 celule / morula / blastocist
      if (w < 0.32) cleave(g, CX, CY, 110, 1, t, { alpha: fade(-1, 0.3) });
      if (w > 0.2 && w < 0.62) cleave(g, CX, CY, 110, 2, t, { alpha: fade(0.3, 0.6) });
      if (w > 0.5 && w < 0.92) cleave(g, CX, CY, 110, 16, t, { alpha: fade(0.6, 0.9) });
      if (w > 0.8 && w < 2.1) {
        const sink = clamp((w - 1.05) / 0.6);
        blastocyst(g, CX, lerp(CY, 530, sink), 115, t, { alpha: fade(0.9, 2.0), zona: w < 1.05 });
        if (endoA > 0 && sink > 0) { g.save(); g.globalAlpha = endoA * 0.88; g.beginPath(); g.rect(150, 528, 700, 140); g.clip(); const en2 = new Path2D(); en2.moveTo(170, 520); en2.bezierCurveTo(330, 500, 670, 500, 830, 520); en2.lineTo(830, 640); en2.lineTo(170, 640); en2.closePath(); paint(g, en2, K.endo, K.endoS, null, [170, 500, 660, 140], OUT, 5); g.restore(); }
        if (w > 1.3) { // discul bilaminar (epiblast albastru + hipoblast galben) în butonul embrionar
          const a = clamp((w - 1.3) / 0.4) * fade(0.9, 2.0); g.save(); g.globalAlpha = a;
          const y0 = lerp(CY, 530, sink) - 62; const e1 = new Path2D(); e1.ellipse(CX, y0, 70, 14, 0, 0, 7); paint(g, e1, K.ecto, null, null, [CX - 70, y0 - 14, 140, 28], OUT, 3);
          const e2 = new Path2D(); e2.ellipse(CX, y0 + 22, 66, 10, 0, 0, 7); paint(g, e2, K.endoL, null, null, [CX - 66, y0 + 12, 132, 20], OUT, 3); g.restore();
          txt(g, 'disc bilaminar', CX + 150, y0 - 30, 18, '#cfe0ff', { alpha: a, align: 'left' });
        }
      }
      // disc trilaminar (secțiune) + creasta primitivă: celulele coboară din epiblast
      if (w > 1.9 && w < 3.2) {
        const a = fade(2.0, 3.0); g.save(); g.globalAlpha = a;
        const L = (y, col, h) => { const p = new Path2D(); p.roundRect(CX - 240, y, 480, h, h / 2); paint(g, p, col, null, null, [CX - 240, y, 480, h], OUT, 4); };
        L(CY - 50, K.ecto, 34); L(CY + 2, K.meso, 30); L(CY + 50, K.endoL, 30);
        for (let k = 0; k < 6; k++) { const u = loopT(t + k * 0.35, 2.1); const s = k % 2 ? 1 : -1; dot(g, CX + s * u * 160, CY - 30 + u * 46, 9, K.meso, { alpha: Math.sin(u * Math.PI) }); }
        tube(g, [[CX, CY - 64], [CX, CY - 20]], 8, '#2a1534', { ow: 0 });
        g.restore();
        txt(g, 'ectoderm', CX + 330, CY - 34, 17, '#cfe0ff', { alpha: a, align: 'left' }); txt(g, 'mezoderm', CX + 330, CY + 17, 17, '#ffc2c8', { alpha: a, align: 'left' }); txt(g, 'endoderm', CX + 330, CY + 65, 17, '#ffe9a8', { alpha: a, align: 'left' });
        txt(g, 'creasta primitivă', CX, CY - 92, 17, C.cream, { alpha: a });
      }
      // embrionul plicaturat (S4) → membre + ochi (S5–S8)
      if (w > 2.9 && w < 8.3) embryoC(g, CX + 10, CY + 20, lerp(1.3, 1.75, clamp((w - 3) / 5)), t, { stage: clamp((w - 4) / 4), alpha: fade(3.0, 8.1) });
      // fătul
      if (w > 7.9) { const a = fade(8.1, 99); ell(g, CX, CY + 20, 270, 230, K.fluid, { ow: 5, shade: K.fluidS, light: '#e3f5ff', alpha: a }); fetus(g, CX + 26, CY + 40, lerp(1.25, 1.45, clamp((w - 8) / 2)), t, { alpha: a }); }
      // legenda etapei
      const cap = CAP.find(([lim]) => w < lim)[1];
      pill(g, CX, 150, 520, 50, '#3a2a26', '', { ow: 3 }); txt(g, cap, CX, 150, 21, C.cream, { stroke: false });
      // axa săptămânilor
      const AY = 790;
      const band = (a, c, col, lab, k) => { const act = b.i < 0 ? 1 : (k === b.i ? 1 : 0.45); const p = new Path2D(); p.roundRect(wx(a) + 2, AY - 40, wx(c) - wx(a) - 4, 30, 10); g.save(); g.globalAlpha = act; paint(g, p, col, null, null, [wx(a), AY - 40, wx(c) - wx(a), 30], OUT, 3); g.restore(); txt(g, lab, (wx(a) + wx(c)) / 2, AY - 25, 15, OUT, { stroke: false, alpha: act }); };
      band(0, 2, '#cbbfb8', 'tot sau nimic', 0); band(2, 8, '#ff8a7e', 'S3–S8: malformații MAJORE', 1); band(8, 10, K.warnY, 'minore', 3);
      tube(g, [[X0, AY], [X1, AY]], 6, '#6b5650', { ow: 3 });
      for (let k = 0; k <= 10; k++) { g.save(); g.strokeStyle = '#d8c4b8'; g.lineWidth = 3; g.beginPath(); g.moveTo(wx(k), AY - 8); g.lineTo(wx(k), AY + 8); g.stroke(); g.restore(); txt(g, String(k), wx(k), AY + 30, 18, '#ffe7d6', { w: 700 }); }
      txt(g, 'fecundația', wx(0), AY + 62, 16, C.hi, { w: 700 }); txt(g, 'săptămâni de la fecundație →', 640, AY + 62, 16, '#d8c4b8', { w: 600 });
      dot(g, wx(w), AY, 14, C.hi, { ow: 4 });
      g.save(); g.globalAlpha = 0.4; g.strokeStyle = C.hi; g.lineWidth = 2; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(wx(w), AY - 44); g.lineTo(wx(w), 640); g.stroke(); g.restore();
    },
  };
}

/* =================================================== PERIOADA DE DEZVOLTARE: două rigle decalate cu 2 săptămâni
   Se vede: sus rigla SA (0 → 40, clinica), jos rigla „de la fecundație” (−2 → 38); același punct din timp e pe aceeași verticală
   (SA 2 = fecundația 0; SA 10 = S8; SA 40 = 38). Sub rigle, ilustrația momentului: 1 = endometrul care se descuamează
   (ultima menstruație), 2 = spermatozoidul intră în ovocit → zigot, 3 = embrionul crește, contorul stadiilor 1 → 23,
   testul de sarcină devine pozitiv după implantare, 4 = fătul crește în sacul amniotic. */
export function devPeriod() {
  const X0 = 90, X1 = 930; const sx = (sa) => lerp(X0, X1, sa / 40); // poziția pe axa SA
  const TY = 150, BY = 270;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[48, TY], [48, BY], [sx(6), BY + 46], [sx(25), BY + 46]],
    phase: (i) => ['ultima menstruație (−2)', 'fecundația (0)', 'perioada embrionară S1–S8', 'perioada fetală S9 →'][i] || '9 luni = 40 SA = 38 săpt.',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      // riglele
      const ruler = (y, lab, off, col) => {
        tube(g, [[X0, y], [X1, y]], 8, col, { ow: 4 });
        [0, 2, 10, 20, 30, 40].forEach((sa) => { g.save(); g.strokeStyle = '#d8c4b8'; g.lineWidth = 3; g.beginPath(); g.moveTo(sx(sa), y - 10); g.lineTo(sx(sa), y + 10); g.stroke(); g.restore(); txt(g, String(sa - off), sx(sa), y + (off ? 32 : -30), 18, '#ffe7d6', { w: 700 }); });
        txt(g, lab, X1, y + (off ? 84 : -62), 16, '#d8c4b8', { w: 700, align: 'right' });
      };
      ruler(TY, 'săptămâni de amenoree (SA) · clinica', 0, '#c98a6a'); ruler(BY, 'săptămâni de la fecundație · embriologia', 2, '#8a7ad0');
      // benzile perioadelor pe rigla de jos
      const bandA = Math.max(p(2), b.i < 0 ? 1 : 0), bandF = Math.max(p(3), b.i < 0 ? 1 : 0);
      if (bandA > 0) { const pp = new Path2D(); pp.roundRect(sx(2), BY - 16, (sx(10) - sx(2)) * bandA, 32, 10); paint(g, pp, '#ffb48a', null, null, [sx(2), BY - 16, sx(10) - sx(2), 32], OUT, 3); txt(g, 'embrionară', (sx(2) + sx(10)) / 2, BY, 14, OUT, { stroke: false, alpha: bandA > 0.7 ? 1 : 0 }); }
      if (bandF > 0) { const pp = new Path2D(); pp.roundRect(sx(10), BY - 16, (sx(40) - sx(10)) * bandF, 32, 10); paint(g, pp, '#cdbcf1', null, null, [sx(10), BY - 16, sx(40) - sx(10), 32], OUT, 3); txt(g, 'fetală: S9 → naștere', (sx(10) + sx(40)) / 2, BY, 15, OUT, { stroke: false, alpha: bandF > 0.7 ? 1 : 0 }); }
      // verticala „același moment”: fecundația (SA 2 = 0) și S8 = 10 SA
      const vline = (sa, a, lab) => { if (a <= 0) return; g.save(); g.globalAlpha = a; g.strokeStyle = C.hi; g.lineWidth = 3; g.setLineDash([7, 6]); g.beginPath(); g.moveTo(sx(sa), TY + 12); g.lineTo(sx(sa), BY - 12); g.stroke(); g.restore(); if (lab) txt(g, lab, sx(sa) + 8, (TY + BY) / 2, 17, C.hi, { alpha: a, align: 'left' }); };
      vline(2, Math.max(p(1), b.i < 0 ? 1 : 0), '0 = 2 SA');
      vline(10, b.i < 0 ? 1 : b.i === 2 ? sp(b.bt / b.bd, 0.55, 0.8) : b.i > 2 ? 1 : 0, 'S8 = 10 SA');
      // marcajele
      const mk = (sa, y, col, k) => { dot(g, sx(sa), y, 13, col, { ow: 4 }); if (on(b, k)) ring(g, sx(sa), y, 30, 30, ease(b.bt * 1.4)); };
      mk(0, TY, K.endo, 0); mk(2, BY, C.hi, 1);
      // ilustrația momentului (dreapta-jos, ca să lase loc pozei)
      const IX = 680, IY = 610;
      panel(g, 400, 380, 580, 520);
      const show = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 3) % 4 : b.i;
      if (show === 0) {
        // uterul (frontal) cu endometrul care se descuamează
        const u = new Path2D(); u.moveTo(IX - 150, IY - 140); u.bezierCurveTo(IX - 160, IY + 30, IX - 60, IY + 150, IX - 20, IY + 190); u.lineTo(IX + 20, IY + 190); u.bezierCurveTo(IX + 60, IY + 150, IX + 160, IY + 30, IX + 150, IY - 140); u.bezierCurveTo(IX + 60, IY - 175, IX - 60, IY - 175, IX - 150, IY - 140); u.closePath();
        paint(g, u, K.myo, K.myoS, '#ee96a6', [IX - 160, IY - 175, 320, 365], OUT, 6);
        const c = new Path2D(); c.moveTo(IX - 105, IY - 110); c.bezierCurveTo(IX - 100, IY + 10, IX - 30, IY + 110, IX, IY + 150); c.bezierCurveTo(IX + 30, IY + 110, IX + 100, IY + 10, IX + 105, IY - 110); c.closePath();
        paint(g, c, K.endo, null, null, [IX - 105, IY - 110, 210, 260], OUT, 4);
        for (let k = 0; k < 7; k++) { const u2 = loopT(t + k * 0.5, 2.4); dot(g, IX - 30 + (k % 3) * 30, lerp(IY + 40, IY + 230, u2), 8, '#c8203a', { alpha: Math.sin(u2 * Math.PI) }); }
        txt(g, 'ziua 1 a ultimei menstruații', IX, IY - 210, 20, C.cream);
      } else if (show === 1) {
        const u = b.i === 1 ? clamp(b.bt / (b.bd * 0.7)) : loopT(t, 3);
        oocyte(g, IX, IY, 110, t, { corona: true, inner: (gg) => { if (u > 0.7) { ell(gg, -30, 0, 24, 24, '#d9c6ff', { ow: 3 }); ell(gg, 30, 0, 24, 24, '#bfe0ff', { ow: 3 }); } } });
        sperm(g, lerp(IX - 300, IX - 128, ease(clamp(u * 1.5))), IY + 20, 1, 0, t, { alpha: 1 - clamp((u - 0.75) * 4) });
        txt(g, u > 0.7 ? 'zigot: ziua 0' : 'fecundația', IX, IY - 200, 20, C.cream);
      } else if (show === 2) {
        const u = b.i === 2 ? clamp(b.bt / (b.bd * 0.7)) : loopT(t, 3);
        embryoC(g, IX - 40, IY + 10, lerp(0.7, 1.1, u), t, { stage: u });
        pill(g, IX + 180, IY - 150, 170, 50, C.hi, `stadiul ${Math.max(1, Math.round(1 + 22 * u))} / 23`, { size: 19 });
        // testul de sarcină: a doua linie apare după implantare
        g.save(); g.translate(IX + 190, IY + 60); const st = new Path2D(); st.roundRect(-26, -120, 52, 240, 16); paint(g, st, '#f4f1ee', '#d8d2cc', '#ffffff', [-26, -120, 52, 240], OUT, 5);
        const win = new Path2D(); win.roundRect(-14, -60, 28, 90, 6); g.fillStyle = '#fffdfb'; g.fill(win); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(win);
        g.fillStyle = '#c8203a'; g.fillRect(-12, -40, 24, 6); g.globalAlpha = clamp((u - 0.25) * 3); g.fillRect(-12, 4, 24, 6); g.restore();
        txt(g, 'hCG +', IX + 190, IY + 210, 18, '#ffb0a8', { alpha: clamp((u - 0.25) * 3) });
      } else {
        const u = b.i === 3 ? clamp(b.bt / (b.bd * 0.75)) : loopT(t, 3);
        const s = lerp(0.6, 1.05, u);
        ell(g, IX, IY + 10, 190 * s + 20, 160 * s + 20, K.fluid, { ow: 5, shade: K.fluidS, light: '#e3f5ff' });
        fetus(g, IX + 10, IY + 20, s, t);
        txt(g, 'organele cresc și se maturizează', IX, IY - 225, 19, C.cream);
      }
      if (on(b, 2)) ring(g, (sx(2) + sx(10)) / 2, BY, (sx(10) - sx(2)) / 2 + 20, 30, ease(b.bt * 1.4));
      if (on(b, 3)) ring(g, (sx(10) + sx(40)) / 2, BY, (sx(40) - sx(10)) / 2 + 16, 30, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== DIVIZIUNEA: mitoza (sus) + meioza I și II (jos)
   Mitoza: celula 2n cu 2 perechi (A lung, B scurt; roșu = matern, albastru = patern), fiecare cromozom DUBLAT (2 cromatide).
   Profază (nucleul dispare) → metafază (cromozomii pe placa verticală, fusul de la 2 poli) → anafază (cromatidele surori merg la
   poli opuși) → citokineză → 2 celule 2n identice, fiecare cu 4 cromozomi SIMPLI (A roșu, A albastru, B roșu, B albastru).
   Meioza I: omologii se împerechează (bivalenți pe placa orizontală, maternul A sus, paternul A jos; la B invers);
   crossing-over între cromatidele NESURORI adiacente (cromatida de jos a lui A matern ↔ cromatida de sus a lui A patern,
   vârful brațului q); omologii se separă: sus pleacă A matern + B patern, jos A patern + B matern → 2 celule n cu cromozomi dublați.
   Meioza II: în fiecare, cromatidele surori se separă (sus / jos) → 4 celule n cu cromatide simple, toate diferite. */
export function division() {
  const MX = 420, MY = 215; // mitoza
  const MA = [[K.mat, 40], [K.pat, 40], [K.mat, 28], [K.pat, 28]];
  const MPLATE = [-80, -30, 22, 66]; const MDX = [-33, -11, 11, 33];
  srand(11); const MPRO = MA.map(() => [rr(-50, 50), rr(-45, 45), rr(-1.2, 1.2)]);
  const BX = 150, BY = 650; // meioza: celula-mamă
  const D = [[420, 512], [420, 782]];
  const G4 = [[745, 452], [745, 572], [745, 722], [745, 842]];
  const R = Math.PI / 2; const SEG = [0.68, 1];
  srand(5); const BPRO = [0, 1, 2, 3].map(() => [rr(-45, 45), rr(-45, 45), rr(-1.5, 1.5)]);
  return {
    home: HOME, cams: [cam(470, 225, 1.55), cam(300, 650, 1.5), cam(640, 645, 1.42)],
    anchors: [[MX - 150, 105], [BX - 60, 520], [610, 380]],
    phase: (i) => ['mitoza: 2n → 2 × 2n', 'meioza I: se separă omologii', 'meioza II: se separă cromatidele'][i] || 'mitoza vs. meioza',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3);
      /* ---------- MITOZA ---------- */
      const u = p(0);
      const vis0 = b.i < 0 || b.i === 0 ? 1 : 0, vis1 = b.i < 0 || b.i === 1 ? 1 : 0, vis2 = b.i < 0 || b.i === 2 ? 1 : 0;
      txt(g, 'MITOZA', 120, 110, 22, '#ffd6c4', { alpha: vis0 });
      const split = sp(u, 0.7, 0.95), apart = sp(u, 0.45, 0.72), meta = sp(u, 0.15, 0.4);
      if (split < 0.98) { if (split > 0.02) dividing(g, MX, MY, 102, split, t); else cellB(g, MX, MY, 102 + 50 * apart, 108 - 10 * apart, t, { seed: 3 }); }
      else [-1, 1].forEach((s) => cellB(g, MX + s * 118, MY, 84, 84, t, { seed: 4 + s, nuc: [MX + s * 118, MY, 60], nucDash: false, alpha: 1 }));
      if (u < 0.3) { g.save(); g.globalAlpha = 1 - sp(u, 0.05, 0.3); g.setLineDash([7, 6]); g.strokeStyle = K.nucS; g.lineWidth = 3; g.beginPath(); g.arc(MX, MY, 70, 0, 7); g.stroke(); g.restore(); }
      // fusul
      const poleX = 128 + 22 * apart; const fusA = sp(u, 0.15, 0.3) * (1 - sp(u, 0.75, 0.9));
      MA.forEach(([col, h], k) => {
        const [px, py, pr] = MPRO[k]; const yy = MY + MPLATE[k];
        if (apart < 0.02) {
          const x = lerp(MX + px, MX, meta), y = lerp(MY + py, yy, meta), r = lerp(pr, 0, meta);
          chromo(g, x, y, h, col, { dup: true, w: 11, rot: r });
          if (meta > 0.5) { spindleFib(g, [MX - poleX, MY], [[x - 8, y]], fusA); spindleFib(g, [MX + poleX, MY], [[x + 8, y]], fusA); }
        } else {
          [-1, 1].forEach((s) => {
            const tx = split > 0 ? lerp(MX + s * 95, MX + s * 118 + MDX[k], split) : MX + s * lerp(9, 95, apart);
            const ty = lerp(yy, MY, split);
            chromo(g, tx, ty, h * lerp(1, 0.95, split), col, { w: 11, bend: -s * 6 * (1 - split) });
            spindleFib(g, [MX + s * poleX, MY], [[tx, ty]], fusA);
          });
        }
      });
      txt(g, '2n · 46', MX, MY + 140, 18, C.cream, { alpha: 1 - split });
      if (split > 0.6) txt(g, '2 celule 2n identice', MX, MY + 128, 21, C.hi, { alpha: sp(split, 0.6, 1) * (b.i <= 0 ? 1 : 0) });
      // separator
      g.save(); g.strokeStyle = 'rgba(255,230,210,.18)'; g.lineWidth = 3; g.setLineDash([12, 10]); g.beginPath(); g.moveTo(40, 380); g.lineTo(960, 380); g.stroke(); g.restore();
      /* ---------- MEIOZA I ---------- */
      const v = p(1), w2 = p(2);
      txt(g, 'MEIOZA', BX, 520, 22, '#ffd6c4', { alpha: vis1 });
      txt(g, 'meioza I · reducțională', 330, 418, 18, '#ffd6c4', { alpha: vis1 });
      txt(g, 'meioza II · ecvațională', 745, 375, 18, '#ffd6c4', { alpha: vis2 });
      const pair = sp(v, 0.05, 0.25), xo = sp(v, 0.28, 0.45), sepI = sp(v, 0.5, 0.72), goI = sp(v, 0.74, 0.98);
      const metaII = sp(w2, 0.05, 0.3), sepII = sp(w2, 0.35, 0.65), goII = sp(w2, 0.68, 0.98);
      // ordinea: [culoare, lungime, x pe placă, y (−1 sus / +1 jos), încrucișat?]
      const BIV = [[K.mat, 56, -32, -1, 'R'], [K.pat, 56, -32, 1, 'L'], [K.pat, 36, 44, -1, ''], [K.mat, 36, 44, 1, '']];
      const xseg = (k) => { const o = {}; if (k === 0) o.segR = [[SEG[0], SEG[1], K.pat]]; if (k === 1) o.segL = [[SEG[0], SEG[1], K.mat]]; return o; };
      // celula-mamă
      if (goI < 0.02) {
        if (sepI > 0.02) { g.save(); g.translate(BX, BY); g.rotate(R); dividing(g, 0, 0, 92, sepI, t); g.restore(); }
        else cellB(g, BX, BY, 96, 96, t, { seed: 7, nuc: pair < 0.6 ? [BX, BY, 66] : null, nucDash: true });
      }
      arr(g, BX + 96, BY - 44, D[0][0] - 96, D[0][1] + 44, '#fff3e6', 5, 0.5 + 0.5 * v); arr(g, BX + 96, BY + 44, D[1][0] - 96, D[1][1] - 44, '#fff3e6', 5, 0.5 + 0.5 * v);
      if (goI >= 0.02 && sepII <= 0.02 && goII < 0.02) D.forEach(([dx, dy], j) => cellB(g, lerp(BX, dx, goI), lerp(BY + (j ? 75 : -75), dy, goI), lerp(64, 74, goI), lerp(64, 74, goI), t, { seed: 8 + j }));
      BIV.forEach(([col, h, x, s, xx], k) => {
        const [px, py, pr] = BPRO[k];
        const segs = xo > 0.5 ? xseg(k) : {};
        let X, Y, rot = R;
        if (goI < 0.02) { X = BX + lerp(px, x, pair); Y = BY + lerp(py, s * 17, pair) + s * 60 * sepI; rot = lerp(pr, R, pair); }
        else { const d = D[s < 0 ? 0 : 1]; X = lerp(BX + x, d[0] + x * 0.8, goI); Y = lerp(BY + s * 77, d[1], goI); }
        if (w2 < 0.02 || goI < 0.98) chromo(g, X, Y, h * (goI > 0 ? lerp(1, 0.85, goI) : 1), col, { dup: true, w: 10, rot, ...segs });
      });
      if (xo > 0 && xo < 1) { const a = Math.sin(xo * Math.PI); g.save(); g.globalAlpha = a; g.fillStyle = C.hi; g.shadowColor = C.hi; g.shadowBlur = 20; g.beginPath(); g.arc(BX - 32 - 24, BY, 9, 0, 7); g.fill(); g.restore(); txt(g, 'crossing-over', BX, BY + 128, 18, C.hi, { alpha: a }); }
      txt(g, '2n', BX, BY + 118, 18, C.cream, { alpha: goI > 0 ? 0 : xo > 0 && xo < 1 ? 0 : 1 });
      /* ---------- MEIOZA II ---------- */
      // cele 4 celule n (desenate înaintea cromatidelor)
      if (goII > 0.02) G4.forEach(([gx, gy], k) => { const [px, py] = D[k >> 1]; cellB(g, lerp(px, gx, goII), lerp(py + (k % 2 ? 62 : -62), gy, goII), lerp(50, 56, goII), lerp(48, 54, goII), t, { seed: 20 + k }); if (goII > 0.6) txt(g, 'n', gx + 92, gy, 22, C.hi, { alpha: sp(goII, 0.6, 1) }); });
      D.forEach(([dx, dy], j) => {
        if (goI < 0.02) return;
        if (goII < 0.02) {
          if (sepII > 0.02) { g.save(); g.translate(dx, dy); g.rotate(R); dividing(g, 0, 0, 70, sepII, t); g.restore(); }
        }
        // cromozomii celulei j: j = 0 (sus): A matern (recombinat pe cromatida de jos) + B patern; j = 1: A patern (recombinat sus) + B matern
        const chs = j === 0 ? [[K.mat, 56, -32, 0], [K.pat, 36, 44, 2]] : [[K.pat, 56, -32, 1], [K.mat, 36, 44, 3]];
        chs.forEach(([col, h, x, k]) => {
          const segs = xseg(k);
          if (sepII < 0.02 && w2 < 0.05) { if (goI > 0.98) chromo(g, dx + x * 0.8, dy, h * 0.85, col, { dup: true, w: 10, rot: R, ...segs }); return; }
          if (sepII < 0.02) { chromo(g, dx + x * 0.8, dy, h * 0.85, col, { dup: true, w: 10, rot: R, ...segs }); return; }
          // cromatida stângă (după rotire: sus) → celula de sus; dreapta → jos
          [[-1, segs.segL], [1, segs.segR]].forEach(([s, sg]) => {
            const gi = j * 2 + (s < 0 ? 0 : 1); const [gx, gy] = G4[gi];
            const X = goII > 0 ? lerp(dx + x * 0.8, gx + x * 0.62, goII) : dx + x * 0.8;
            const Y = goII > 0 ? lerp(dy + s * 58, gy, goII) : dy + s * lerp(8, 58, sepII);
            chromo(g, X, Y, h * lerp(0.85, 0.72, goII), col, { w: 10, rot: R, seg: sg });
          });
        });
      });
      if (goII > 0.6) txt(g, '4 celule n (23), diferite genetic', 640, 912, 19, C.hi, { alpha: sp(goII, 0.6, 1) });
      if (on(b, 0)) ring(g, MX, MY, 270, 140, ease(b.bt * 1.2));
      if (on(b, 1)) ring(g, 290, 650, 250, 240, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, 745, 647, 120, 255, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== PERIOADELE CRITICE (figura LP, după Moore)
   Se vede: un embrion mare (stânga, sus) cu organele; în dreapta grila săptămânilor: 1–2 conceptus (gri, tot sau nimic),
   3–8 embrionar, 9 → 38 fetal (comprimat). Benzile se desenează de la stânga la dreapta: roșu = perioada de sensibilitate
   maximă (malformații majore), galben = funcționale și minore. SNC: roșu S3 → 38 (singura bandă continuă);
   cord roșu S3–S6, galben până la S9; membre roșu S4–S7; ochi roșu S4–S8; ureche roșu S4–S9; palat roșu S6–S9;
   dinți roșu S6–S9; organele genitale externe roșu S7–S9; după, galben până la naștere unde figura o arată. */
export function critical() {
  const x0 = 425; const wx = (w) => (w <= 9 ? x0 + (w - 1) * 54 : w <= 16 ? x0 + 8 * 54 + (w - 9) / 7 * 60 : x0 + 8 * 54 + 60 + (w - 16) / 22 * 66);
  const ROWS = [
    ['SNC', [[3, 38, 'R']], [-38, -96]],
    ['cord', [[3, 6, 'R'], [6, 9, 'Y']], [10, 6]],
    ['membre', [[4, 7, 'R'], [7, 9, 'Y']], [44, 30]],
    ['ochi', [[4, 8, 'R'], [8, 38, 'Y']], [-40, -92]],
    ['ureche', [[4, 9, 'R'], [9, 38, 'Y']], [-10, -80]],
    ['palat', [[6, 9, 'R'], [9, 16, 'Y']], [-56, -60]],
    ['dinți', [[6, 9, 'R'], [9, 38, 'Y']], [-58, -52]],
    ['OGE', [[7, 9, 'R'], [9, 38, 'Y']], [40, 96]],
  ];
  const RY = (k) => 215 + k * 56; const EX = 165, EY = 330, ES = 1.0;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[wx(1.5), 660], [(wx(3) + wx(8)) / 2, 660], [(wx(9) + wx(38)) / 2, 660], [(wx(16) + wx(38)) / 2, RY(0) + 30]],
    phase: (i) => ['S1–S2: tot sau nimic', 'S3–S8: majore', 'S9 → naștere: minore', 'SNC: până la naștere'][i] || 'fiecare organ, fereastra lui',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      // capul grilei
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 16, 38].forEach((w) => txt(g, String(w), wx(w), 160, 17, '#ffe7d6', { w: 700 }));
      txt(g, 'embrionar (săptămâni)', (wx(3) + wx(8)) / 2, 120, 16, '#d8c4b8', { w: 700 }); txt(g, 'fetal', (wx(9) + wx(38)) / 2, 120, 16, '#d8c4b8', { w: 700 });
      g.save(); g.strokeStyle = 'rgba(255,230,210,.12)'; g.lineWidth = 2; for (let w = 1; w <= 9; w++) { g.beginPath(); g.moveTo(wx(w) - 27, 180); g.lineTo(wx(w) - 27, RY(7) + 30); g.stroke(); } g.restore();
      // S1–S2: conceptusul (tot sau nimic)
      const c0 = Math.max(p(0), b.i < 0 ? 1 : 0);
      const cp = new Path2D(); cp.roundRect(wx(1) - 26, 180, wx(2) - wx(1) + 52, RY(7) - 145, 16); g.save(); g.fillStyle = 'rgba(203,191,184,.16)'; g.fill(cp); g.restore();
      const lose = on(b, 0) ? Math.sin(clamp(b.bt / b.bd) * Math.PI * 2) * 0.5 + 0.5 : 1;
      blastocyst(g, (wx(1) + wx(2)) / 2, 250, 34, t, { zona: true, icm: lose });
      txt(g, 'tot sau\nnimic', (wx(1) + wx(2)) / 2, 330, 17, '#ffe7d6', { alpha: c0 });
      if (on(b, 0)) txt(g, lose < 0.4 ? 'moare („Loss”)' : 'se reface complet', (wx(1) + wx(2)) / 2, 410, 16, C.hi);
      // embrionul + organele
      embryoC(g, EX, EY, ES, t, { stage: 1 });
      // rândurile
      const cur = b.i < 0 ? 38 : b.i === 0 ? 2 : b.i === 1 ? lerp(3, 8.99, p(1)) : b.i === 2 ? lerp(9, 38, p(2)) : 38;
      ROWS.forEach(([n, segs, [ox, oy]], k) => {
        const y = RY(k);
        txt(g, n, x0 - 36, y, 18, C.cream, { w: 800, align: 'right' });
        segs.forEach(([a, c, ty]) => {
          const show = ty === 'R' ? (b.i < 0 || b.i >= 1) : (b.i < 0 || b.i >= 2);
          if (!show) return;
          const end = Math.min(c, cur); if (end <= a) return;
          const pp = new Path2D(); pp.roundRect(wx(a) - 26, y - 16, wx(end) - wx(a) + (end === c && c <= 9 ? 0 : 26), 32, 10);
          const glow = on(b, 3) && k === 0 ? 1 : 0;
          paint(g, pp, ty === 'R' ? '#ff6f62' : K.warnY, null, null, [wx(a), y - 16, wx(end) - wx(a), 32], OUT, 3);
          if (glow) { g.save(); g.shadowColor = C.hi; g.shadowBlur = 24; g.strokeStyle = C.hi; g.lineWidth = 4; g.stroke(pp); g.restore(); }
        });
        // organul aprins pe embrion cât timp banda roșie crește
        const hot = (b.i === 1 && segs.some(([a, c, ty]) => ty === 'R' && cur >= a && cur <= c)) || (on(b, 3) && k === 0);
        if (hot) { const op = EMB.pt(n === 'dinți' ? 'dinti' : n); const hx = EX + op[0] * ES, hy = EY + op[1] * ES; lead(g, hx, hy, x0 - 46 - n.length * 10, y, 0.9); g.save(); g.globalAlpha = 0.55 + 0.45 * Math.sin(t * 6); g.fillStyle = C.hi; g.shadowColor = C.hi; g.shadowBlur = 18; g.beginPath(); g.arc(hx, hy, 11, 0, 7); g.fill(); g.restore(); }
      });
      // cursorul
      if (b.i >= 1 && b.i <= 2) { g.save(); g.strokeStyle = C.hi; g.lineWidth = 3; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(wx(cur), 176); g.lineTo(wx(cur), RY(7) + 26); g.stroke(); g.restore(); }
      // legenda
      pill(g, 560, 730, 240, 44, '#ff6f62', 'malformații MAJORE', { size: 17 }); pill(g, 830, 730, 260, 44, K.warnY, 'funcționale și minore', { size: 17 });
      if (on(b, 1)) ring(g, (wx(3) + wx(9)) / 2, (RY(0) + RY(7)) / 2, 200, 290, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, (wx(9) + wx(38)) / 2, (RY(0) + RY(7)) / 2, 110, 290, ease(b.bt * 1.4));
      if (on(b, 3)) ring(g, (wx(3) + wx(38)) / 2, RY(0), 330, 36, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== CAUZELE MALFORMAȚIILOR + distribuția pe sexe
   Sus: embrionul în sac, cu 3 surse care converg: stânga = cromozomii (genetic: un cromozom în plus intră), dreapta = vasul
   mamei cu particule de teratogen care trec prin placentă (mediu), jos = un semn de întrebare în ceață (idiopatic, ~40–45%, manual).
   Jos: barele raportului băieți : fete față de 1 (scală logaritmică): băieți spre dreapta (albastru), fete spre stânga (roz),
   cu valorile din LP. */
export function causes() {
  const BOY = [['stenoză aortică', 2.88], ['coarctația aortei', 2.51], ['transpoziția vaselor mari', 2.34], ['craniosinostoză', 2.12], ['cheilo-palatoschizis', 2.01], ['cheiloschizis fără palat', 1.78]];
  const GIRL = [['atrezie coanală', 0.45], ['extrofie cloacală', 0.46], ['DSV multiple', 0.52], ['trunchi arterial comun', 0.63], ['holoprosencefalie', 0.64], ['heterotaxie + cardiopatie', 0.64]];
  const AX = 500, SC = 175; const EX = 500, EY = 255;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[170, 120], [880, 120], [EX - 150, 352], [AX, 470]],
    phase: (i) => ['genetic', 'de mediu (matern)', 'idiopatic', 'băieți : fete'][i] || 'trei cauze',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      // embrionul în sac
      ell(g, EX, EY, 118, 104, K.fluid, { ow: 5, shade: K.fluidS, light: '#e3f5ff' }); embryoC(g, EX + 6, EY + 6, 0.62, t, { stage: 0.7 });
      // 1 · genetic: cromozomi + un cromozom în plus care intră
      const a0 = b.i < 0 || b.i === 0 ? 1 : 0.6;
      [K.mat, K.pat, K.mat].forEach((c, k) => chromo(g, 120 + k * 40, 170, 60, c, { dup: true, w: 10, alpha: a0 }));
      txt(g, 'GENETIC\nmoștenire', 160, 255, 18, '#ffd6c4', { alpha: a0 });
      if (b.i < 0 || b.i === 0) { const u = b.i === 0 ? clamp(b.bt / (b.bd * 0.7)) : loopT(t, 3); chromo(g, lerp(260, EX - 60, ease(u)), lerp(170, EY - 10, ease(u)), 40, K.dad, { w: 9, alpha: Math.sin(u * Math.PI) * 0.6 + 0.4 }); }
      // 2 · mediu: vasul mamei + placenta + teratogeni
      const a1 = b.i < 0 || b.i === 1 ? 1 : 0.6;
      tube(g, [[780, 70], [820, 200], [800, 330]], 40, '#c8203a', { ow: 6, alpha: a1, lumen: '#8f1428' });
      const pl = new Path2D(); pl.ellipse(700, 210, 46, 92, 0.1, 0, 7); g.save(); g.globalAlpha = a1; paint(g, pl, K.plac, K.placS, '#d4607a', [654, 118, 92, 184], OUT, 5); g.restore();
      txt(g, 'DE MEDIU\nfactori materni', 860, 390, 18, '#ffd6c4', { alpha: a1 });
      if (b.i < 0 || b.i === 1) for (let k = 0; k < 6; k++) { const u = loopT(t + k * 0.45, 2.7); const path = [[810, 120 + k * 30], [700, 200 + (k - 3) * 14], [EX + 70, EY]]; const [x, y] = at(curve(path), u); g.save(); g.globalAlpha = Math.sin(u * Math.PI); g.translate(x, y); g.rotate(t * 2 + k); g.fillStyle = '#b7ff5a'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); for (let j = 0; j < 5; j++) { const q = (j / 5) * Math.PI * 2; g.lineTo(Math.cos(q) * 9, Math.sin(q) * 9); g.lineTo(Math.cos(q + 0.6) * 4, Math.sin(q + 0.6) * 4); } g.closePath(); g.fill(); g.stroke(); g.restore(); }
      // 3 · idiopatic: semnul de întrebare
      const a2 = b.i < 0 || b.i === 2 ? 1 : 0.55;
      g.save(); g.globalAlpha = a2 * 0.5; for (let k = 0; k < 7; k++) { const q = t * 0.4 + k; g.fillStyle = 'rgba(220,210,230,.25)'; g.beginPath(); g.ellipse(EX - 200 + k * 30 + Math.sin(q) * 10, 410 + Math.cos(q) * 6, 44, 20, 0, 0, 7); g.fill(); } g.restore();
      txt(g, '?', EX - 150, 405, 60, '#e9dcff', { alpha: a2 });
      txt(g, 'IDIOPATIC · cauză necunoscută', EX + 60, 395, 18, '#ffd6c4', { alpha: a2 });
      txt(g, '~40–45% (manual)', EX + 60, 425, 17, C.hi, { alpha: a2 });
      // 4 · raportul băieți : fete
      const q = Math.max(p(3), b.i < 0 ? 1 : 0); const Y0 = 520; g.save(); g.globalAlpha = b.i < 0 || b.i === 3 ? 1 : 0.4;
      g.save(); g.strokeStyle = '#fff3e6'; g.lineWidth = 3; g.beginPath(); g.moveTo(AX, Y0 - 16); g.lineTo(AX, Y0 + 12 * 30 + 6); g.stroke(); g.restore();
      txt(g, 'raport = 1', AX, Y0 + 12 * 30 + 26, 16, '#fff3e6');
      txt(g, '← mai des la FETE', AX - 200, Y0 - 30, 16, K.girl, { w: 800 }); txt(g, 'mai des la BĂIEȚI →', AX + 200, Y0 - 30, 16, K.boy, { w: 800 });
      const row = (n, v, k, boy) => {
        const y = Y0 + 12 + k * 30; const L = Math.log2(v) * SC * q; const x1 = AX + L;
        const pp = new Path2D(); pp.roundRect(Math.min(AX, x1), y - 11, Math.abs(L), 22, 8);
        paint(g, pp, boy ? K.boy : K.girl, null, null, [Math.min(AX, x1), y - 11, Math.abs(L) + 1, 22], OUT, 3);
        txt(g, n, boy ? AX - 12 : AX + 12, y, 15, C.cream, { align: boy ? 'right' : 'left', w: 600 });
        txt(g, v.toFixed(2).replace('.', ','), x1 + (boy ? 30 : -30), y, 15, boy ? '#cfe6ff' : '#ffd0e6', { alpha: q, w: 800 });
      };
      BOY.forEach(([n, v], k) => row(n, v, k, true));
      GIRL.forEach(([n, v], k) => row(n, v, k + 6, false));
      g.restore();
      if (on(b, 0)) ring(g, 160, 175, 100, 70, ease(b.bt * 1.4));
      if (on(b, 1)) ring(g, 760, 200, 110, 140, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, EX - 30, 410, 260, 50, ease(b.bt * 1.4));
    },
  };
}
