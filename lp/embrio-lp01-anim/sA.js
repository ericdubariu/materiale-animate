// Coperta, cronologia și Partea A (generalități): perioada de dezvoltare, diviziunea, perioadele critice, cauzele.
import {
  cam, HOME, C, K, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead,
  OUT, clamp, lerp, ease, paint, blob, bb, REDUCED,
  chromo, cellB, spindleFib, dividing, pinchCell, sperm, oocyte, polar, cleave, blastocyst, embryoC, EMB, fetus, srand, rr,
} from './k1.js';

const sp = (u, a, b) => ease(clamp((u - a) / (b - a))); // sub-etapă a unui punct

/* =================================================== COPERTA: drumul normal, de la gamet la naștere
   Se vede: un drum în S, de sus-stânga până jos; pe el, în ordine: gameții (spermatozoid + ovocit, meioză 2n → n) →
   zigotul 2n → blastocistul care se implantează cu BUTONUL EMBRIONAR spre endometru (S1–S2) → embrionul în C (S3–S8) →
   fătul (S9–S38) → nașterea (~9 luni, 40 SA). Un punct luminos parcurge drumul în buclă.
   Teme (punctele copertei și rândurile recapitulării): crit = banda roșie/galbenă pe drum + embrionul și fătul;
   gam = gameții + CGP; div = gameții cu eticheta meiozei; chr = lupa pe zigot (un 21 în plus, portocaliu); abn = spermatozoidul
   cu cap dublu lângă gameți; pren = sonda de ecografie pe sacul amniotic. */
const COVER_PTS = [['crit'], ['gam'], ['chr'], ['abn', 'pren']];
export function cover({ spec } = {}) {
  const map = (spec && spec.sceneOpts && spec.sceneOpts.map) || null; // recapitulare: rândul tabelului → listă de teme
  const ROAD = curve([[90, 200], [330, 140], [560, 210], [800, 200], [900, 360], [760, 520], [520, 540], [250, 560], [150, 720], [330, 840], [620, 830], [880, 800]], 12);
  const ST = [[140, 325, 'gameții\nmeioză: 2n → n'], [450, 215, 'fecundația\nzigot 2n'], [800, 325, 'S1–S2\nimplantare'], [700, 600, 'S3–S8\norganogeneza'], [330, 615, 'S9–S38\nperioada fetală'], [800, 860, 'nașterea\n~9 luni · 40 SA']];
  const LIST = map || COVER_PTS;
  const PH = { crit: 'perioadele critice', gam: 'gameții (CGP)', div: 'diviziunea: 2n → n', chr: 'cromozomii', abn: 'gameții anormali', pren: 'diagnosticul prenatal' };
  return {
    home: HOME, cams: LIST.map(() => HOME),
    anchors: map ? [] : [[775, 380], [70, 120], [490, 82], [160, 455]],
    phase: (i) => (i < 0 ? 'drumul normal' : LIST[i].map((k) => PH[k]).join(' · ')),
    draw(g, t, b) {
      bg(g);
      const th = b.i < 0 ? [] : LIST[b.i]; const has = (k) => th.includes(k);
      const pr = b.i < 0 ? 1 : ease(clamp(b.bt / (b.bd * 0.6)));
      const A = (k) => (b.i < 0 ? 1 : has(k) ? pr : 0); // progresul temei curente; intro = totul gata
      const dimOf = (k) => (b.i < 0 || has(k) ? 1 : 0.55);
      // drumul
      tube(g, ROAD, 46, 'rgba(255,240,228,.10)', { ow: 0, raw: true });
      tube(g, ROAD, 6, 'rgba(255,230,210,.35)', { ow: 0, raw: true, dash: [14, 12] });
      const c0 = A('crit');
      if (c0 > 0) { tube(g, ROAD, 16, K.bad, { raw: true, u0: 0.46, u1: lerp(0.46, 0.64, c0), ow: 4, alpha: 0.9 }); tube(g, ROAD, 12, K.warnY, { raw: true, u0: 0.64, u1: lerp(0.64, 0.9, clamp(c0 * 1.6 - 0.6)), ow: 4, alpha: 0.85 }); }
      const trav = at(ROAD, loopT(t, 12)); dot(g, trav[0], trav[1], 11, C.hi, { ow: 3 });
      // gameții (+ CGP)
      const gA = Math.max(dimOf('gam'), dimOf('div'), dimOf('abn'));
      oocyte(g, 150, 160, 44, t, { corona: true, alpha: gA });
      sperm(g, 250, 250, 0.55, -2.6, t, { alpha: gA }); sperm(g, 270, 300, 0.5, -2.8, t + 0.4, { alpha: gA });
      if (A('gam') > 0) for (let k = 0; k < 3; k++) { const u = loopT(t + k * 0.9, 2.7); dot(g, lerp(40, 120, u), lerp(330, 210, u), 9, K.cgp, { alpha: A('gam') * Math.sin(u * Math.PI) }); }
      if (has('div')) { const q = A('div'); g.save(); g.globalAlpha = q; cellB(g, 260, 120, 30, 30, t, { seed: 3 }); chromo(g, 252, 120, 30, K.mat, { dup: true, w: 6 }); chromo(g, 270, 120, 30, K.pat, { dup: true, w: 6 }); g.restore(); arr(g, 232, 132, 196, 150, '#fff3e6', 4, q); txt(g, '2n → n', 320, 92, 17, C.hi, { alpha: q }); }
      // gameți anormali: spermatozoid cu cap dublu
      if (A('abn') > 0) sperm(g, 330, 290, 0.6, -2.9, t, { kind: 'twohead', alpha: A('abn'), col: '#ffe36e' });
      // zigotul + lupa cu cromozomii
      cleave(g, 450, 120, 34, 1, t, { alpha: dimOf('chr') });
      const z = A('chr');
      if (z > 0) {
        const lx = 545, ly = 390; g.save(); g.globalAlpha = z;
        lead(g, 470, 140, lx - 70, ly - 70, z);
        ell(g, lx, ly, 112, 90, '#1d1220', { ow: 5, sc: '#ffe7d6' });
        const cols = [K.mat, K.pat];
        for (let k = 0; k < 6; k++) chromo(g, lx - 82 + k * 28, ly - 10, k < 2 ? 56 : k < 4 ? 46 : 36, cols[k % 2], { w: 10 });
        const ex = sp(z, 0.4, 0.9); chromo(g, lx + 92 - 10 * ex, ly - 10 - 40 * (1 - ex), 36, K.extra, { w: 10, alpha: ex, glow: ex });
        g.restore();
        txt(g, '21 în plus → 47', lx, ly + 76, 18, C.hi, { alpha: sp(z, 0.6, 1) });
      }
      // blastocistul se implantează: butonul embrionar (polul embrionar) spre endometru
      const ew = new Path2D(); ew.roundRect(730, 262, 140, 30, 12); paint(g, ew, K.endo, K.endoS, null, [730, 262, 140, 30], OUT, 4);
      blastocyst(g, 800, 238, 30, t, { zona: false, icmAng: Math.PI / 2 });
      // embrionul în C + fătul
      embryoC(g, 700, 430, 0.5, t, { stage: 0.6, alpha: dimOf('crit') });
      const fa = Math.max(dimOf('crit'), dimOf('pren'));
      ell(g, 330, 480, 108, 92, K.fluid, { ow: 5, shade: K.fluidS, light: '#e3f5ff', alpha: fa });
      fetus(g, 340, 488, 0.55, t, { alpha: fa });
      // nașterea: nou-născutul
      g.save(); g.translate(800, 735);
      const sw = new Path2D(); sw.moveTo(-40, -34); sw.bezierCurveTo(10, -52, 80, -40, 96, 0); sw.bezierCurveTo(100, 30, 50, 46, -10, 40); sw.bezierCurveTo(-46, 36, -60, 0, -40, -34); sw.closePath();
      paint(g, sw, '#bfe0ff', '#8fbfe6', '#eef7ff', [-60, -52, 160, 98], OUT, 5);
      g.strokeStyle = '#8fbfe6'; g.lineWidth = 3; g.beginPath(); g.moveTo(-6, -40); g.quadraticCurveTo(20, 0, 0, 38); g.stroke();
      ell(g, -58, -4, 36, 34, K.skin, { ow: 5, shade: K.skinS, light: K.skinL });
      g.fillStyle = '#ffd0e6'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.ellipse(-50, -30, 34, 18, -0.4, Math.PI, 0); g.fill(); g.stroke();
      g.lineCap = 'round'; g.beginPath(); g.arc(-72, -4, 5, 0.2, Math.PI - 0.2); g.stroke(); g.beginPath(); g.arc(-56, 0, 5, 0.2, Math.PI - 0.2); g.stroke();
      g.restore();
      // sonda de ecografie
      const q = A('pren');
      if (q > 0) {
        g.save(); g.globalAlpha = q; g.translate(222, 400); g.rotate(-0.7); const pp = new Path2D(); pp.roundRect(-22, -60, 44, 70, 14); paint(g, pp, '#dfe6f0', '#aab6c6', '#ffffff', [-22, -60, 44, 70], OUT, 5); g.restore();
        for (let k = 0; k < 3; k++) { const u = loopT(t + k * 0.4, 1.2); g.save(); g.globalAlpha = q * (1 - u); g.strokeStyle = '#bfe0ff'; g.lineWidth = 4; g.beginPath(); g.arc(240, 420, 20 + u * 70, -0.1, 1.2); g.stroke(); g.restore(); }
      }
      ST.forEach(([x, y, s]) => txt(g, s, x, y, 17, C.cream, { w: 700 }));
      const e = ease(b.bt * 1.4);
      if (has('crit')) ring(g, 520, 500, 280, 150, e);
      if (has('gam') || has('div')) ring(g, 190, 200, 130, 120, e);
      if (has('chr')) ring(g, 545, 390, 130, 108, e);
      if (has('abn')) ring(g, 300, 280, 70, 50, e);
      if (has('pren')) ring(g, 300, 470, 170, 130, e);
    },
  };
}

/* =================================================== CRONOLOGIA: același conceptus, săptămână cu săptămână
   Se vede: o axă de săptămâni (de la fecundație, 0 → 10) jos, cu benzile S1–S2 (gri, tot sau nimic), S3–S8 (roșu, majore),
   S9 → (galben, minore). Cursorul înaintează și se oprește ÎN INTERIORUL intervalului punctului (1,95 / 3,95 / 7,95).
   O singură etapă e desenată odată (fără crossfade): zigot → 2 celule → morula → blastocist (S1) → blastocistul se scufundă
   în endometru cu POLUL EMBRIONAR înainte; butonul embrionar = disc bilaminar (epiblast spre endometru, hipoblast spre cavitate)
   (S2) → discul trilaminar în secțiune, între amnios (sus) și sacul vitelin (jos), cu creasta primitivă prin care celulele
   coboară între ectoderm și endoderm (S3) → embrion plicaturat cu somite + cord (S4) → embrion cu mugurii membrelor și ochi
   (S5–S8) → făt (S9 →). */
export function chrono() {
  const X0 = 80, X1 = 930; const wx = (w) => lerp(X0, X1, w / 10);
  const RANGE = [[0, 1.95], [2, 3.95], [4, 7.95], [8, 10]];
  const STG = [[0, 'zigot (ziua 0)'], [0.2, '2 celule'], [0.45, 'S1: morula'], [0.75, 'S1: blastocist'], [1.0, 'S2: implantare, disc bilaminar'], [2.0, 'S3: gastrulație, disc trilaminar'], [3.0, 'S4: plicaturare, somite, cord, tub neural'], [4.0, 'S5–S8: fața, membrele, organele'], [8.0, 'S9 →: perioada fetală']];
  const CX = 500, CY = 420;
  const endo = (g, a, clipTop) => { const en = new Path2D(); en.moveTo(150, 540); en.bezierCurveTo(330, 522, 670, 522, 850, 540); en.lineTo(850, 660); en.lineTo(150, 660); en.closePath(); g.save(); g.globalAlpha = a; if (clipTop) { g.beginPath(); g.rect(130, clipTop, 740, 200); g.clip(); } paint(g, en, K.endo, K.endoS, '#f7b3bf', [150, 522, 700, 138], OUT, 5); for (let k = 0; k < 9; k++) tube(g, [[200 + k * 75, 650], [205 + k * 75 + Math.sin(k) * 6, 590], [198 + k * 75, 560]], 5, '#c95a6c', { ow: 0 }); g.restore(); };
  return {
    home: HOME, cams: RANGE.map(() => HOME),
    anchors: [[wx(1), 712], [wx(3), 712], [wx(6), 712], [wx(9), 712]],
    phase: (i) => ['S1–S2', 'S3–S4', 'S5–S8', 'S9 → naștere'][i] || 'săptămâna cu săptămâna',
    draw(g, t, b) {
      bg(g);
      let w;
      if (b.i < 0) w = 10 * loopT(t, 18); else { const [a, c] = RANGE[b.i]; w = lerp(a, c, ease(clamp(b.bt / (b.bd * 0.8)))); }
      let si = 0; STG.forEach(([s0], k) => { if (w >= s0) si = k; });
      const ain = si === 0 ? 1 : ease(clamp((w - STG[si][0]) / 0.1)); // apariția etapei; cea veche dispare instant
      const g0 = (a) => { g.save(); g.globalAlpha = a; };
      if (si <= 2) { g0(ain); cleave(g, CX, CY, 110, [1, 2, 16][si], t); g.restore(); }
      else if (si === 3) { g0(ain); blastocyst(g, CX, CY, 115, t, { icmAng: Math.PI / 2 }); g.restore(); txt(g, 'butonul embrionar', CX + 175, CY + 70, 17, '#ffd2a3', { alpha: ain, align: 'left' }); txt(g, 'trofoblast', CX + 175, CY - 60, 17, '#ffc2c8', { alpha: ain, align: 'left' }); }
      else if (si === 4) {
        // blastocistul intră în endometru cu polul embrionar (butonul embrionar jos) înainte
        const sink = ease(clamp((w - 1.0) / 0.55)); const by = lerp(CY, 515, sink);
        endo(g, ain);
        g0(ain); blastocyst(g, CX, by, 115, t, { icmAng: Math.PI / 2, zona: false }); g.restore();
        // discul bilaminar în butonul embrionar: epiblast (albastru) spre endometru/polul embrionar, hipoblast (galben) spre cavitate
        const d = ease(clamp((w - 1.3) / 0.35)); const y0 = by + 64;
        if (d > 0) { g0(d * ain); const e2 = new Path2D(); e2.ellipse(CX, y0 - 14, 66, 10, 0, 0, 7); paint(g, e2, K.endoL, null, null, [CX - 66, y0 - 24, 132, 20], OUT, 3); const e1 = new Path2D(); e1.ellipse(CX, y0 + 6, 70, 13, 0, 0, 7); paint(g, e1, K.ecto, null, null, [CX - 70, y0 - 7, 140, 26], OUT, 3); g.restore(); }
        endo(g, ain * 0.5 * sink, 548);
        txt(g, 'endometrul', 770, 630, 17, '#ffd6dc', { alpha: ain });
        txt(g, 'disc bilaminar: epiblast + hipoblast', CX, 300, 18, '#cfe0ff', { alpha: d * ain });
        lead(g, CX + 40, 320, CX + 30, y0 - 8, d * ain);
      } else if (si === 5) {
        // disc trilaminar în secțiune: amniosul deasupra, sacul vitelin dedesubt, creasta primitivă la mijloc
        g0(ain);
        const am = new Path2D(); am.ellipse(CX, CY - 40, 250, 110, 0, Math.PI, 0); am.closePath(); paint(g, am, '#cfeaff', null, '#ffffff', [CX - 250, CY - 150, 500, 110], OUT, 4);
        const ys = new Path2D(); ys.ellipse(CX, CY + 60, 220, 150, 0, 0, Math.PI); ys.closePath(); paint(g, ys, '#f7d77e', '#e4b84d', '#fff2c4', [CX - 220, CY + 60, 440, 150], OUT, 4);
        const disc = new Path2D(); disc.ellipse(CX, CY + 10, 270, 52, 0, 0, 7);
        g.save(); g.clip(disc);
        g.fillStyle = K.ecto; g.fillRect(CX - 280, CY - 50, 560, 42);
        g.fillStyle = K.meso; g.fillRect(CX - 280, CY - 8, 560, 34);
        g.fillStyle = K.endoL; g.fillRect(CX - 280, CY + 26, 560, 40);
        srand(5); for (let k = 0; k < 40; k++) { const x = CX - 260 + k * 13; dot(g, x, CY - 30 + rr(-4, 4), 4, '#3d6fc0', { ow: 0, alpha: 0.6 }); dot(g, x + 6, CY + 44 + rr(-3, 3), 4, '#c99a22', { ow: 0, alpha: 0.6 }); }
        g.restore(); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(disc);
        // creasta primitivă (șanț) + celulele care migrează între cele 2 straturi
        tube(g, [[CX, CY - 50], [CX, CY - 14]], 10, '#1d1220', { ow: 0 });
        for (let k = 0; k < 8; k++) { const u = loopT(t + k * 0.3, 2.4); const s = k % 2 ? 1 : -1; dot(g, CX + s * (6 + u * 210), CY - 14 + Math.min(u * 4, 1) * 20, 8, K.meso, { alpha: Math.sin(Math.min(u * 1.2, 1) * Math.PI * 0.95) + 0.1 }); }
        g.restore();
        txt(g, 'amnios', CX, CY - 110, 17, '#cfe0ff', { alpha: ain }); txt(g, 'sacul vitelin', CX, CY + 160, 17, OUT, { stroke: false, alpha: ain });
        [['ectoderm', -30, '#cfe0ff'], ['mezoderm', 9, '#ffc2c8'], ['endoderm', 46, '#ffe9a8']].forEach(([n, dy, c]) => txt(g, n, CX + 290, CY + dy, 17, c, { alpha: ain, align: 'left' }));
        txt(g, 'creasta primitivă', CX - 130, CY - 180, 17, C.cream, { alpha: ain }); lead(g, CX - 80, CY - 165, CX - 4, CY - 50, ain);
      } else if (si <= 7) {
        g0(ain); embryoC(g, CX + 10, CY + 20, si === 6 ? 1.3 : lerp(1.35, 1.75, clamp((w - 4) / 4)), t, { stage: si === 6 ? 0 : clamp((w - 4) / 4) }); g.restore();
      } else {
        g0(ain); ell(g, CX, CY + 20, 270, 230, K.fluid, { ow: 5, shade: K.fluidS, light: '#e3f5ff' }); fetus(g, CX + 26, CY + 40, lerp(1.25, 1.45, clamp((w - 8) / 2)), t); g.restore();
      }
      // legenda etapei
      pill(g, CX, 150, 540, 50, '#3a2a26', '', { ow: 3 }); txt(g, STG[si][1], CX, 150, 21, C.cream, { stroke: false });
      // axa săptămânilor
      const AY = 790;
      const band = (a, c, col, lab, k) => { const act = b.i < 0 ? 1 : (k === b.i ? 1 : 0.45); const p = new Path2D(); p.roundRect(wx(a) + 2, AY - 40, wx(c) - wx(a) - 4, 30, 10); g.save(); g.globalAlpha = act; paint(g, p, col, null, null, [wx(a), AY - 40, wx(c) - wx(a), 30], OUT, 3); g.restore(); txt(g, lab, (wx(a) + wx(c)) / 2, AY - 25, 15, OUT, { stroke: false, alpha: act }); };
      band(0, 2, '#cbbfb8', 'tot sau nimic', 0); band(2, 8, '#ff8a7e', 'S3–S8: malformații MAJORE', 1); band(8, 10, K.warnY, 'minore', 3);
      tube(g, [[X0, AY], [X1, AY]], 6, '#6b5650', { ow: 3 });
      for (let k = 0; k <= 10; k++) { g.save(); g.strokeStyle = '#d8c4b8'; g.lineWidth = 3; g.beginPath(); g.moveTo(wx(k), AY - 8); g.lineTo(wx(k), AY + 8); g.stroke(); g.restore(); txt(g, String(k), wx(k), AY + 30, 18, '#ffe7d6', { w: 700 }); }
      txt(g, 'fecundația', wx(0), AY + 62, 16, C.hi, { w: 700 }); txt(g, 'săptămâni de la fecundație →', 640, AY + 62, 16, '#d8c4b8', { w: 600 });
      dot(g, wx(w), AY, 14, C.hi, { ow: 4 });
      g.save(); g.globalAlpha = 0.4; g.strokeStyle = C.hi; g.lineWidth = 2; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(wx(w), AY - 44); g.lineTo(wx(w), 680); g.stroke(); g.restore();
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
        [0, 2, 10, 20, 30, 40].forEach((sa) => { g.save(); g.strokeStyle = '#d8c4b8'; g.lineWidth = 3; g.beginPath(); g.moveTo(sx(sa), y - 10); g.lineTo(sx(sa), y + 10); g.stroke(); g.restore(); txt(g, String(sa - off), sx(sa), y + (off ? 44 : -30), 18, '#ffe7d6', { w: 700 }); });
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
      if (on(b, 2)) ring(g, (sx(2) + sx(10)) / 2, BY, (sx(10) - sx(2)) / 2 + 20, 24, ease(b.bt * 1.4));
      if (on(b, 3)) ring(g, (sx(10) + sx(40)) / 2, BY, (sx(40) - sx(10)) / 2 + 16, 24, ease(b.bt * 1.4));
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
  const MPLATE = [-56, -20, 18, 52]; const MDX = [-30, -10, 10, 30]; const ADX = [-12, 12, -6, 6]; // la anafază: cromatidele în evantai, nu cap la cap
  srand(11); const MPRO = MA.map(() => [rr(-50, 50), rr(-45, 45), rr(-1.2, 1.2)]);
  const BX = 150, BY = 650; // meioza: celula-mamă
  const D = [[420, 512], [420, 782]];
  const G4 = [[745, 452], [745, 572], [745, 722], [745, 842]];
  const R = Math.PI / 2; const SEG = [0.68, 1];
  srand(5); const BPRO = [0, 1, 2, 3].map(() => [rr(-45, 45), rr(-45, 45), rr(-1.5, 1.5)]);
  return {
    home: HOME, cams: [cam(470, 225, 1.55), cam(300, 650, 1.5), cam(640, 645, 1.42)],
    anchors: [[MX - 150, 105], [BX + 80, BY - 100], [680, 425]],
    phase: (i) => ['mitoza: 2n → 2 × 2n', 'meioza I: se separă omologii', 'meioza II: se separă cromatidele'][i] || 'mitoza vs. meioza',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3);
      /* ---------- MITOZA ---------- */
      const u = p(0);
      const vis0 = b.i < 0 || b.i === 0 ? 1 : 0, vis1 = b.i < 0 || b.i === 1 ? 1 : 0, vis2 = b.i < 0 || b.i === 2 ? 1 : 0;
      txt(g, 'MITOZA', 205, 345, 22, '#ffd6c4', { alpha: vis0 });
      const split = sp(u, 0.7, 0.95), apart = sp(u, 0.45, 0.72), meta = sp(u, 0.15, 0.4);
      // celula se alungește în anafază (rx 102 → 175), apoi șanțul de clivaj o strânge în 2 celule fiice (la ±96)
      const crx = lerp(102, 175, apart), cry = lerp(108, 100, apart);
      if (split < 0.98) pinchCell(g, MX, MY, crx, cry, split, t);
      else [-1, 1].forEach((s) => cellB(g, MX + s * 96, MY, 80, 92, t, { seed: 4 + s, nuc: [MX + s * 96, MY, 58], nucDash: false, alpha: 1 }));
      if (u < 0.3) { g.save(); g.globalAlpha = 1 - sp(u, 0.05, 0.3); g.setLineDash([7, 6]); g.strokeStyle = K.nucS; g.lineWidth = 3; g.beginPath(); g.arc(MX, MY, 70, 0, 7); g.stroke(); g.restore(); }
      // fusul
      const poleX = crx - 24; const fusA = sp(u, 0.15, 0.3) * (1 - sp(u, 0.75, 0.9)); // polii fusului: în interiorul celulei
      MA.forEach(([col, h], k) => {
        const [px, py, pr] = MPRO[k]; const yy = MY + MPLATE[k];
        if (apart < 0.02) {
          const x = lerp(MX + px, MX, meta), y = lerp(MY + py, yy, meta), r = lerp(pr, 0, meta);
          chromo(g, x, y, h, col, { dup: true, w: 11, rot: r });
          if (meta > 0.5) { spindleFib(g, [MX - poleX, MY], [[x - 8, y]], fusA); spindleFib(g, [MX + poleX, MY], [[x + 8, y]], fusA); }
        } else {
          [-1, 1].forEach((s) => {
            const tx = split > 0 ? lerp(MX + s * 100 + ADX[k], MX + s * 96 + MDX[k], split) : MX + s * lerp(9, 100, apart) + ADX[k] * apart;
            const ty = lerp(yy, MY, split);
            chromo(g, tx, ty, h * lerp(1, 0.95, split), col, { w: 11, bend: -s * 8 * (1 - split), rot: s * (k % 2 ? 0.22 : -0.22) * (1 - split) });
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
      txt(g, 'MEIOZA', BX - 30, 515, 22, '#ffd6c4', { alpha: vis1 });
      txt(g, 'meioza I · reducțională', 330, 418, 18, '#ffd6c4', { alpha: vis1 });
      txt(g, 'meioza II · ecvațională', 745, 375, 18, '#ffd6c4', { alpha: vis2 });
      const pair = sp(v, 0.05, 0.25), xo = sp(v, 0.28, 0.45), sepI = sp(v, 0.5, 0.72), goI = sp(v, 0.74, 0.98);
      const metaII = sp(w2, 0.05, 0.3), sepII = sp(w2, 0.35, 0.65), goII = sp(w2, 0.68, 0.98);
      // ordinea: [culoare, lungime, x pe placă, y (−1 sus / +1 jos), încrucișat?]
      const BIV = [[K.mat, 56, -32, -1, 'R'], [K.pat, 56, -32, 1, 'L'], [K.pat, 36, 44, -1, ''], [K.mat, 36, 44, 1, '']];
      const xseg = (k) => { const o = {}; if (k === 0) o.segR = [[SEG[0], SEG[1], K.pat]]; if (k === 1) o.segL = [[SEG[0], SEG[1], K.mat]]; return o; };
      // celula-mamă
      if (goI < 0.02) {
        if (sepI > 0.02) pinchCell(g, BX, BY, lerp(96, 140, sepI), lerp(96, 90, sepI), sp(sepI, 0.35, 1), t, { vertical: true });
        else cellB(g, BX, BY, 96, 96, t, { seed: 7, nuc: pair < 0.6 ? [BX, BY, 66] : null, nucDash: true });
      }
      const aMI = (0.5 + 0.5 * v) * (1 - goII); arr(g, BX + 96, BY - 44, D[0][0] - 96, D[0][1] + 44, '#fff3e6', 5, aMI); arr(g, BX + 96, BY + 44, D[1][0] - 96, D[1][1] - 44, '#fff3e6', 5, aMI);
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
          if (sepII > 0.02) pinchCell(g, dx, dy, lerp(74, 104, sepII), lerp(74, 70, sepII), sp(sepII, 0.35, 1), t, { vertical: true });
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
      if (on(b, 2)) ring(g, lerp(420, 745, goII), 647, lerp(110, 120, goII), 255, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== PERIOADELE CRITICE (figura LP, după Moore)
   Se vede: un embrion mare (stânga, sus) cu organele; în dreapta grila săptămânilor: 1–2 conceptus (gri, tot sau nimic),
   3–8 embrionar, 9 → 38 fetal (comprimat). Benzile se desenează de la stânga la dreapta: roșu = perioada de sensibilitate
   maximă (malformații majore), galben = funcționale și minore. SNC: roșu S3 → ~S20, apoi coadă galbenă până la 38 (singura
   bandă continuă până la naștere); cord roșu S3–S6 (toată săptămâna 6), galben până la S9; membre roșu S4–S7; ochi roșu S4–S8,
   galben până la naștere; ureche roșu S4–S9, galben până la ~S20; palat roșu S6–S9, galben până la ~S16; dinți și OGE roșu
   până la S9, apoi galben. */
export function critical() {
  const x0 = 425; const wx = (w) => (w <= 9 ? x0 + (w - 1) * 54 : w <= 16 ? x0 + 8 * 54 + (w - 9) / 7 * 60 : x0 + 8 * 54 + 60 + (w - 16) / 22 * 66);
  // intervale INCLUSIVE de săptămâni (a..c): bara acoperă toată săptămâna c
  const ROWS = [
    ['SNC', [[3, 20, 'R'], [21, 38, 'Y']], [-38, -96]],
    ['cord', [[3, 6, 'R'], [7, 9, 'Y']], [10, 6]],
    ['membre', [[4, 7, 'R'], [8, 9, 'Y']], [44, 30]],
    ['ochi', [[4, 8, 'R'], [9, 38, 'Y']], [-40, -92]],
    ['ureche', [[4, 9, 'R'], [10, 20, 'Y']], [-10, -80]],
    ['palat', [[6, 9, 'R'], [10, 16, 'Y']], [-56, -60]],
    ['dinți', [[6, 9, 'R'], [10, 38, 'Y']], [-58, -52]],
    ['OGE', [[7, 9, 'R'], [10, 38, 'Y']], [40, 96]],
  ];
  const XC = (w) => (w <= 9 ? wx(w) + 27 : Math.max(wx(w), wx(9) + 27)); // capătul din dreapta al săptămânii w
  const XL = (a) => (a <= 9 ? wx(a) - 27 : XC(a - 1)); const XR = (c) => XC(c);
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
      const cur = b.i < 0 ? 38 : b.i === 0 ? 2 : b.i === 1 ? lerp(2.5, 8, p(1)) : b.i === 2 ? lerp(9, 38, p(2)) : 38;
      ROWS.forEach(([n, segs, [ox, oy]], k) => {
        const y = RY(k);
        txt(g, n, x0 - 36, y, 18, C.cream, { w: 800, align: 'right' });
        segs.forEach(([a, c, ty]) => {
          const show = ty === 'R' ? (b.i < 0 || b.i >= 1) : (b.i < 0 || b.i >= 2);
          if (!show) return;
          const xr = Math.min(XR(c), XC(cur)); if (xr <= XL(a) + 2) return;
          const pp = new Path2D(); pp.roundRect(XL(a) + 1, y - 16, xr - XL(a) - 2, 32, 10);
          const glow = on(b, 3) && k === 0 ? 1 : 0;
          paint(g, pp, ty === 'R' ? '#ff6f62' : K.warnY, null, null, [XL(a), y - 16, xr - XL(a), 32], OUT, 3);
          if (glow) { g.save(); g.shadowColor = C.hi; g.shadowBlur = 24; g.strokeStyle = C.hi; g.lineWidth = 4; g.stroke(pp); g.restore(); }
        });
        // organul aprins pe embrion cât timp banda roșie crește
        const hot = (b.i === 1 && segs.some(([a, c, ty]) => ty === 'R' && cur >= a - 1 && cur <= c)) || (on(b, 3) && k === 0);
        if (hot) { const op = EMB.pt(n === 'dinți' ? 'dinti' : n); const hx = EX + op[0] * ES, hy = EY + op[1] * ES; lead(g, hx, hy, x0 - 46 - n.length * 10, y, 0.9); g.save(); g.globalAlpha = 0.55 + 0.45 * Math.sin(t * 6); g.fillStyle = C.hi; g.shadowColor = C.hi; g.shadowBlur = 18; g.beginPath(); g.arc(hx, hy, 11, 0, 7); g.fill(); g.restore(); }
      });
      // cursorul
      if (b.i >= 1 && b.i <= 2) { g.save(); g.strokeStyle = C.hi; g.lineWidth = 3; g.setLineDash([6, 6]); const cx = XC(cur); g.beginPath(); g.moveTo(cx, 176); g.lineTo(cx, RY(7) + 26); g.stroke(); g.restore(); }
      // legenda
      pill(g, 560, 730, 240, 44, '#ff6f62', 'malformații MAJORE', { size: 17 }); pill(g, 830, 730, 260, 44, K.warnY, 'funcționale și minore', { size: 17 });
      if (on(b, 1)) ring(g, (wx(3) + wx(9)) / 2, (RY(0) + RY(7)) / 2, 200, 290, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, (wx(9) + wx(38)) / 2, (RY(0) + RY(7)) / 2, 110, 290, ease(b.bt * 1.4));
      if (on(b, 3)) ring(g, (wx(3) + wx(38)) / 2, RY(0), 330, 36, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== CAUZELE MALFORMAȚIILOR + distribuția pe sexe
   Sus, o singură ilustrație: sacul amniotic cu embrionul, legat prin cordonul ombilical de placenta lipită de peretele sacului;
   vasul mamei intră în placentă. Cele 3 cauze converg spre embrion: 1 = genetic: o pereche de cromozomi și o copie în plus
   (portocaliu) intră în celula embrionului (lupa); 2 = de mediu: particule de teratogen (verde-acid) din sângele mamei trec prin
   placentă și cordon la embrion; 3 = idiopatic: un „?” în ceață (~40–45%, manual).
   Jos (mereu vizibil): barele raportului băieți : fete față de 1 (scală logaritmică), băieți spre dreapta, fete spre stânga;
   la punctul 4 barele cresc din nou. */
export function causes() {
  const BOY = [['stenoză aortică', 2.88], ['coarctația aortei', 2.51], ['transpoziția vaselor mari', 2.34], ['craniosinostoză', 2.12], ['cheilo-palatoschizis', 2.01], ['cheiloschizis fără palat', 1.78]];
  const GIRL = [['atrezie coanală', 0.45], ['extrofie cloacală', 0.46], ['DSV multiple', 0.52], ['trunchi arterial comun', 0.63], ['holoprosencefalie', 0.64], ['heterotaxie + cardiopatie', 0.64]];
  const AX = 500, SC = 160; const EX = 470, EY = 250; const PX = 665, PY = 240; const Y0 = 528;
  const CORD = curve([[PX - 40, PY + 10], [590, 300], [540, 300], [EX + 30, EY + 30]], 14);
  const VES = curve([[930, 70], [860, 140], [800, 220], [PX + 40, PY]], 12);
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[120, 120], [820, 330], [300, 395], [AX + 335, Y0 + 12]],
    phase: (i) => ['genetic', 'de mediu (matern)', 'idiopatic', 'băieți : fete'][i] || 'trei cauze',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const dim = (k) => (b.i < 0 || b.i === k ? 1 : 0.55);
      // vasul mamei → placenta (lipită de sac) → cordonul → embrionul
      tube(g, VES, 30, '#c8203a', { ow: 5, raw: true, lumen: '#8f1428', alpha: dim(1) });
      ell(g, EX, EY, 165, 135, K.fluid, { ow: 6, shade: K.fluidS, light: '#e3f5ff' });
      const pl = blob(PX, PY, 70, 105, 0.12, t, 0.05, 16, 4); g.save(); g.globalAlpha = Math.max(0.8, dim(1)); paint(g, pl, K.plac, K.placS, '#d4607a', bb(PX, PY, 70, 105), OUT, 5); g.restore();
      for (let k = 0; k < 6; k++) tube(g, [[PX - 30, PY - 70 + k * 28], [PX - 5, PY - 62 + k * 28], [PX + 20, PY - 70 + k * 28]], 4, '#7f2238', { ow: 0, alpha: 0.6 });
      tube(g, CORD, 14, K.cord, { ow: 4, raw: true });
      embryoC(g, EX - 10, EY + 4, 0.75, t, { stage: 0.7 });
      txt(g, 'placenta', PX + 20, PY + 130, 16, '#ffd6dc', { w: 800 }); txt(g, 'sângele mamei', 760, 110, 16, '#ffb0a8', { w: 800 });
      // 1 · genetic
      const a0 = dim(0);
      [K.mat, K.pat].forEach((c, k) => chromo(g, 92 + k * 30, 170, 64, c, { w: 10, alpha: a0 }));
      const u0 = b.i === 0 ? sp(p(0), 0, 0.7) : b.i < 0 ? 1 : 0;
      if (b.i <= 0) {
        lead(g, EX - 60, EY - 20, 255, 150, a0); ell(g, 215, 150, 46, 46, '#1d1220', { ow: 4, sc: '#ffe7d6', alpha: a0 });
        chromo(g, 202, 150, 40, K.mat, { w: 8, alpha: a0 }); chromo(g, 216, 150, 40, K.pat, { w: 8, alpha: a0 });
        chromo(g, lerp(165, 232, u0), lerp(220, 150, u0), 40, K.extra, { w: 8, alpha: a0 * (u0 > 0 ? 1 : 0.4), glow: on(b, 0) ? u0 : 0 });
      }
      txt(g, 'GENETIC · moștenire', 150, 255, 18, '#ffd6c4', { alpha: a0 });
      // 2 · mediu: teratogenii pe drumul mamă → placentă → cordon → embrion
      if (b.i < 0 || b.i === 1) { const route = [...VES, ...CORD]; for (let k = 0; k < 8; k++) { const u = loopT(t + k * 0.5, 4); const [x, y] = at(route, u); g.save(); g.globalAlpha = Math.sin(u * Math.PI) * 0.9 + 0.1; g.translate(x, y); g.rotate(t * 2 + k); g.fillStyle = '#b7ff5a'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); for (let j = 0; j < 5; j++) { const q = (j / 5) * Math.PI * 2; g.lineTo(Math.cos(q) * 9, Math.sin(q) * 9); g.lineTo(Math.cos(q + 0.6) * 4, Math.sin(q + 0.6) * 4); } g.closePath(); g.fill(); g.stroke(); g.restore(); } }
      txt(g, 'DE MEDIU · factori materni', 830, 390, 18, '#ffd6c4', { alpha: dim(1) });
      // 3 · idiopatic
      const a2 = dim(2);
      g.save(); g.globalAlpha = a2 * 0.55; for (let k = 0; k < 6; k++) { const q = t * 0.4 + k; g.fillStyle = 'rgba(220,210,230,.3)'; g.beginPath(); g.ellipse(110 + k * 34 + Math.sin(q) * 10, 395 + Math.cos(q) * 6, 46, 22, 0, 0, 7); g.fill(); } g.restore();
      txt(g, '?', 200, 390, 62, '#e9dcff', { alpha: a2 });
      txt(g, 'IDIOPATIC · ~40–45% (manual)', 200, 445, 17, C.hi, { alpha: a2 });
      // 4 · raportul băieți : fete (mereu vizibil; crește la punctul 4)
      const q = b.i === 3 ? p(3) : 1; g.save(); g.globalAlpha = b.i < 0 || b.i === 3 ? 1 : 0.6;
      g.save(); g.strokeStyle = '#fff3e6'; g.lineWidth = 3; g.beginPath(); g.moveTo(AX, Y0 - 16); g.lineTo(AX, Y0 + 12 * 30 + 6); g.stroke(); g.restore();
      txt(g, 'raport = 1', AX, Y0 + 12 * 30 + 26, 16, '#fff3e6');
      txt(g, '← mai des la FETE', AX - 190, Y0 - 32, 16, K.girl, { w: 800 }); txt(g, 'mai des la BĂIEȚI →', AX + 190, Y0 - 32, 16, K.boy, { w: 800 });
      const row = (n, v, k, boy) => {
        const y = Y0 + 12 + k * 30; const L = Math.log2(v) * SC * q; const x1 = AX + L;
        const pp = new Path2D(); pp.roundRect(Math.min(AX, x1), y - 11, Math.max(2, Math.abs(L)), 22, 8);
        paint(g, pp, boy ? K.boy : K.girl, null, null, [Math.min(AX, x1), y - 11, Math.abs(L) + 1, 22], OUT, 3);
        txt(g, n, boy ? AX - 12 : AX + 12, y, 15, C.cream, { align: boy ? 'right' : 'left', w: 600 });
        txt(g, v.toFixed(2).replace('.', ','), x1 + (boy ? 30 : -30), y, 15, boy ? '#cfe6ff' : '#ffd0e6', { alpha: q, w: 800 });
      };
      BOY.forEach(([n, v], k) => row(n, v, k, true));
      GIRL.forEach(([n, v], k) => row(n, v, k + 6, false));
      g.restore();
      if (on(b, 0)) ring(g, 160, 180, 130, 90, ease(b.bt * 1.4));
      if (on(b, 1)) ring(g, PX + 40, PY - 20, 130, 150, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, 200, 410, 150, 60, ease(b.bt * 1.4));
    },
  };
}
