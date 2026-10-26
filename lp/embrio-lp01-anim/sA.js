// Partea A (+ copertă): drumul normal, cronologia, mitoza/meioza, perioadele critice, cauzele malformațiilor.
import { HOME, C, bg, panel, txt, pill, tube, flow, dot, ell, arr, loopT, OUT, clamp, lerp, ease, REDUCED } from './ek.js';
import { chromo, cell, card, vis, act, pulse, MAT, PAT, RED, AMB, OK } from './k1.js';

/* ============ COPERTA: drumul normal sus, cele 4 teme jos, legate de momentul lor ============ */
// sus: gamet → fecundație → S1–S2 → S3–S8 → S9–S38 → naștere; jos: 4 carduri; fiecare punct aprinde cardul + momentul
export function cover() {
  const ST = [[90, 'Gameții', 'meioză\n2n → n'], [250, 'Fecundația', 'zigot 2n'], [410, 'S1–S2', 'implantare'], [570, 'S3–S8', 'organo-\ngeneza'], [730, 'S9–S38', 'perioada\nfetală'], [900, 'Nașterea', '~9 luni\n40 SA']];
  const Y0 = 230;
  const TH = [
    { x: 160, t: 'Gameții', s: 'meioza: 2n → n', at: 0, col: '#ffe9a8' },
    { x: 390, t: 'Cromozomii', s: 'numerice · structurale', at: 0, col: '#ffd6c4' },
    { x: 620, t: 'Gameți anormali\n+ CGP → teratom', s: '', at: 1, col: '#e3d6ff' },
    { x: 850, t: 'Teratogeni +\ndiagnostic prenatal', s: '', at: 3, col: '#c8f0d8' },
  ];
  return {
    home: HOME, cams: TH.map(() => HOME),
    anchors: TH.map((h) => [h.x - 100, 600]),
    draw(g, t, b) {
      bg(g);
      txt(g, 'DRUMUL NORMAL', 500, 90, 22, '#ffb48a');
      tube(g, [[90, Y0], [900, Y0]], 12, '#6b5650', { ow: 4 });
      const P = ST.map(([x]) => [x, Y0]);
      // markerul care parcurge sarcina (buclă)
      const u = loopT(t, 9); const mx = lerp(90, 900, u);
      ST.forEach(([x, a, s], i) => {
        const on = mx >= x - 4; ell(g, x, Y0, 26, 26, on ? '#ffb48a' : '#3a2a26', { ow: 5 });
        txt(g, a, x, Y0 - 60, 19, '#ffe7d6'); txt(g, s, x, Y0 + 70, 16, '#cdb8ab', { w: 600 });
      });
      // sus: cromozomii care se înjumătățesc (gamet) și se reunesc (zigot)
      const ph = loopT(t, 9);
      chromo(g, 70, Y0 - 120, 34, MAT, { alpha: ph < 0.2 ? 1 : 0.4 }); chromo(g, 110, Y0 - 120, 34, PAT, { alpha: ph < 0.2 ? 1 : 0.4 });
      dot(g, mx, Y0, 15, C.hi, { ow: 4 });
      txt(g, 'CE POATE MERGE PROST', 500, 470, 22, '#ffb48a');
      TH.forEach((h, k) => {
        const on = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 2.4) % 4 === k : b.i === k;
        const a = b.i < 0 || on ? 1 : 0.4;
        card(g, h.x, 640, 210, 150, h.t, h.s, h.col, { alpha: a, glow: on ? 1 : 0, ts: 20 });
        const sx = ST[h.at][0];
        g.save(); g.globalAlpha = a * (on ? 0.95 : 0.35); g.strokeStyle = on ? C.hi : '#fff3e6'; g.lineWidth = on ? 4 : 2.5; g.setLineDash([8, 8]);
        g.beginPath(); g.moveTo(h.x, 565); g.lineTo(sx, Y0 + 110); g.stroke(); g.restore();
        if (on) flow(g, [[h.x, 565], [sx, Y0 + 110]], t, C.hi, 3, 0.5, 6);
      });
      // cardul 4: banda organogenezei S3–S8 colorată roșu
      if (b.i === 3 || b.i < 0) tube(g, [[530, Y0 + 2], [610, Y0 + 2]], 14, RED, { ow: 0, alpha: 0.85 });
      txt(g, 'temele din LP, legate de momentul în care apar', 500, 860, 18, '#cdb8ab', { w: 600 });
    },
  };
}

/* ============ CRONOLOGIA: axa −2 … 10 (+38), două numărători ============ */
export function chrono() {
  const X = (w) => 90 + (w + 2) * 62; // −2 → 90 ; 10 → 834
  const Y = 300;
  const EV = [[1, 'S1: morula →\nblastocist', 1], [2, 'S2: implantare,\ndisc bilaminar', 1], [3, 'S3: gastrulație,\ndisc trilaminar', 2], [4, 'S4: plicaturare,\nsomite, tub neural', 2], [6.5, 'S5–S8: fața,\nmembrele, organele', 2]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[X(-2) - 100, Y - 110], [X(0) + 140, Y - 190], [X(0) + 10, Y + 90], [X(9.6), Y + 140]],
    draw(g, t, b) {
      bg(g);
      txt(g, 'săptămâni de la fecundație (embriologie)', 500, 70, 19, '#ffe7d6');
      tube(g, [[X(-2) - 20, Y], [940, Y]], 10, '#6b5650', { ow: 4 });
      for (let w = -2; w <= 10; w++) { tube(g, [[X(w), Y - 12], [X(w), Y + 12]], 4, '#a08a80', { ow: 0 }); txt(g, String(w), X(w), Y + 34, 16, '#cdb8ab', { w: 700 }); }
      txt(g, '… 38', 915, Y + 34, 16, '#cdb8ab', { w: 700 });
      // marker animat pe etapă
      const seg = [[-2, -2], [0, 2], [0, 8], [8, 10]][Math.max(0, b.i)] || [-2, 10];
      const u = b.i < 0 ? loopT(t, 8) : ease(clamp(b.bt / (b.bd * 0.7)));
      const mw = b.i < 0 ? lerp(-2, 10, u) : lerp(seg[0], seg[1], u);
      // benzile perioadelor
      const pa = (k) => (b.i < 0 || b.i === k ? 1 : b.i > k ? 0.55 : 0.15);
      tube(g, [[X(0) + 4, Y + 90], [X(8) - 4, Y + 90]], 30, '#ef7468', { ow: 4, alpha: pa(2) });
      txt(g, 'perioada embrionară S1–S8 · stadiile 1–23', (X(0) + X(8)) / 2, Y + 90, 17, OUT, { stroke: false, alpha: pa(2) });
      tube(g, [[X(8) + 6, Y + 90], [935, Y + 90]], 30, '#7fb6e6', { ow: 4, alpha: pa(3) });
      txt(g, 'fetală → naștere', (X(8) + 935) / 2 + 4, Y + 90, 16, OUT, { stroke: false, alpha: pa(3) });
      // −2 și 0
      pill(g, X(-2), Y - 110, 170, 64, '#ffe9a8', 'ultima\nmenstruație', { alpha: pa(0), size: 17, glow: act(b, 0) ? 1 : 0 });
      pill(g, X(0) + 40, Y - 190, 170, 64, '#ffd6c4', 'FECUNDAȚIA\nzigot (ziua 0)', { alpha: pa(1), size: 17, glow: act(b, 1) ? 1 : 0 });
      arr(g, X(0) + 30, Y - 156, X(0) + 4, Y - 18, '#fff3e6', 5, pa(1));
      // evenimentele S1–S8 apar pe măsură ce trece markerul
      EV.forEach(([w, s, k], i) => { const a = (b.i < 0 ? (mw >= w - 0.5 ? 1 : 0.2) : b.i >= k ? (b.i > k || mw >= w - 0.5 ? 1 : 0.2) : 0.12); const ex = 175 + i * 165, ey = Y + 240; g.save(); g.globalAlpha = a * 0.7; g.strokeStyle = '#fff3e6'; g.lineWidth = 2.5; g.setLineDash([5, 6]); g.beginPath(); g.moveTo(X(w), Y + 14); g.lineTo(ex, ey - 36); g.stroke(); g.restore(); pill(g, ex, ey, 158, 70, '#3a2a26', '', { alpha: a, ow: 3 }); txt(g, s, ex, ey, 14, '#ffe7d6', { alpha: a, w: 700 }); });
      // cele două numărători
      const yb = 760;
      panel(g, 380, yb - 56, 590, 160);
      txt(g, 'Sarcina ≈ 9 luni', 675, yb - 22, 22, '#ffb48a');
      txt(g, '40 SA (de la ultima menstruație)', 675, yb + 18, 19, '#ffe7d6', { w: 700 });
      txt(g, '= 38 săptămâni de la fecundație', 675, yb + 54, 19, '#ffe7d6', { w: 700 });
      dot(g, X(Math.min(10, mw)), Y, 16, C.hi, { ow: 4 });
      if (b.i === 3) { const k = pulse(t); tube(g, [[X(8) + 6, Y + 90], [935, Y + 90]], 30, C.hi, { ow: 0, alpha: 0.25 * k }); }
    },
  };
}

/* ============ MITOZA vs. MEIOZA ============ */
// 1 pereche de omologi (roșu = matern, albastru = patern). Mitoza: 2 celule 2n. Meioza I: omologii se separă; Meioza II: cromatidele.
export function division() {
  const Ym = 200, Yme = 560;
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[60, Ym - 120], [60, Yme - 150], [810, Yme - 165]],
    draw(g, t, b) {
      bg(g);
      const p = (k) => (b.i < 0 ? ((REDUCED ? 1 : (t % 7) / 7)) : b.i === k ? ease(clamp(b.bt / (b.bd * 0.65))) : b.i > k ? 1 : 0);
      // ---- MITOZA
      txt(g, 'MITOZA', 160, Ym - 120, 22, '#ffb48a'); txt(g, 'se separă cromatidele surori', 450, Ym - 120, 16, '#ffe7d6');
      const m = b.i < 0 ? p(0) : (b.i === 0 ? p(0) : 1);
      cell(g, 250, Ym, 80, '#3a2a26', { alpha: 1 - m * 0.7, glow: act(b, 0) ? 1 : 0 });
      chromo(g, 232, Ym, 70, MAT, { dup: true, alpha: 1 - m * 0.7 }); chromo(g, 268, Ym, 70, PAT, { dup: true, alpha: 1 - m * 0.7 });
      txt(g, '2n · 46', 250, Ym + 108, 17, '#cdb8ab', { alpha: 1 - m * 0.5 });
      [[560, Ym - 50], [560, Ym + 70]].forEach(([x, y]) => {
        arr(g, 340, Ym, x - 70, y, '#fff3e6', 5, m);
        cell(g, x, y, 56, '#3a2a26', { alpha: m });
        chromo(g, x - 14, y, 54, MAT, { alpha: m }); chromo(g, x + 14, y, 54, PAT, { alpha: m });
      });
      pill(g, 820, Ym + 10, 250, 80, '#ffe9a8', '2 celule 2n\nidentice', { alpha: m, size: 19 });
      // ---- MEIOZA
      txt(g, 'MEIOZA', 160, Yme - 150, 22, '#ffb48a');
      const m1 = b.i < 0 ? clamp(p(1) * 2) : b.i === 1 ? p(1) : b.i > 1 ? 1 : 0;
      const m2 = b.i < 0 ? clamp(p(1) * 2 - 1) : b.i === 2 ? p(2) : 0;
      cell(g, 150, Yme + 40, 80, '#3a2a26', { glow: act(b, 1) ? 1 : 0 });
      // crossing-over: un segment schimbat între omologi (doar după MI se vede pe cromatide)
      chromo(g, 132, Yme + 40, 70, MAT, { dup: true, seg: [0.35, 1], segCol: PAT }); chromo(g, 168, Yme + 40, 70, PAT, { dup: true, seg: [0.35, 1], segCol: MAT });
      txt(g, '2n', 150, Yme + 145, 18, '#cdb8ab');
      txt(g, 'meioza I · reducțională', 400, Yme - 140, 17, '#ffe7d6', { alpha: 0.3 + 0.7 * m1 });
      // MI: omologii se separă → 2 celule, fiecare cu UN cromozom (încă dublu)
      const Y1 = [Yme - 40, Yme + 120];
      Y1.forEach((y, i) => {
        arr(g, 235, Yme + 40, 345, y, '#fff3e6', 5, m1);
        cell(g, 400, y, 54, '#3a2a26', { alpha: m1, glow: act(b, 1) ? 0.6 : 0 });
        chromo(g, 400, y, 56, i ? PAT : MAT, { dup: true, alpha: m1, seg: [0.35, 1], segCol: i ? MAT : PAT });
      });
      txt(g, 'meioza II · ecvațională', 660, Yme - 165, 17, '#ffe7d6', { alpha: 0.3 + 0.7 * (b.i === 2 || b.i < 0 ? Math.max(m2, 0.2) : 0.2) });
      const m2v = b.i < 0 ? m2 : b.i === 2 ? m2 : 0;
      // MII: cromatidele surori se separă → 4 celule n, diferite (cu crossing-over)
      const Y2 = [Yme - 90, Yme + 10, Yme + 80, Yme + 180];
      Y2.forEach((y, j) => {
        const from = Y1[j < 2 ? 0 : 1]; const isM = j < 2;
        arr(g, 455, from, 600, y, '#fff3e6', 4, m2v);
        cell(g, 650, y, 40, '#3a2a26', { alpha: m2v });
        chromo(g, 650, y, 44, isM ? MAT : PAT, { alpha: m2v, seg: j % 2 ? [0.35, 1] : null, segCol: isM ? PAT : MAT });
      });
      pill(g, 860, Yme + 45, 220, 110, '#ffe9a8', '4 celule n\n(23), diferite\ngenetic', { alpha: m2v, size: 18 });
      txt(g, 'roșu = cromozom matern · albastru = patern', 500, 880, 17, '#cdb8ab', { w: 600 });
    },
  };
}

/* ============ PERIOADELE CRITICE ============ */
// benzi pe săptămâni: S1–S2 gri (tot sau nimic), apoi pe organe: roșu = majore, galben = minore/funcționale
export function critical() {
  const X = (w) => 300 + (w - 1) * 70; // S1 → 300 ; S9 → 860
  // ferestrele după figura LP (Moore): roșu = majore, galben = minore; SNC rămâne roșu și în perioada fetală
  const ORG = [['SNC', 3, 9.6, 38], ['Cord', 3, 6, 9], ['Membre', 4, 7, 8], ['Ochi', 4, 8, 38], ['Ureche', 4, 9, 38], ['Palat', 6, 9, 9.6], ['Dinți', 6, 9, 38], ['OGE', 7, 9, 38]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[X(1.5), 110], [X(5), 110], [X(9), 110], [60, 222]],
    draw(g, t, b) {
      bg(g);
      for (let w = 1; w <= 9; w++) txt(g, w === 9 ? 'S9 → 38' : 'S' + w, X(w) + (w === 9 ? 20 : 0), 160, 16, '#cdb8ab', { w: 700 });
      const a0 = vis(b, 0), a1 = vis(b, 1), a2 = vis(b, 2), a3 = vis(b, 3);
      // S1–S2
      pill(g, (X(1) + X(2)) / 2, 420, 120, 500, '#4a3a34', '', { alpha: a0, ow: 4, glow: act(b, 0) ? 1 : 0 });
      txt(g, 'tot sau\nnimic', (X(1) + X(2)) / 2, 470, 18, '#ffe7d6', { alpha: a0 });
      // embrion care dispare sau se reface (punctul 0)
      if (act(b, 0) || b.i < 0) { const u = loopT(t, 3); const ok = Math.floor((REDUCED ? 0 : t) / 3) % 2 === 0; dot(g, (X(1) + X(2)) / 2, 260, 22 * (ok ? 1 : 1 - u), ok ? OK : '#9a8a84', { ow: 4 }); txt(g, ok ? 'se reface' : 'moare', (X(1) + X(2)) / 2, 300, 15, '#ffe7d6'); }
      ORG.forEach(([n, s0, s1, end], i) => {
        const y = 222 + i * 54; const isSNC = n === 'SNC';
        txt(g, n, 180, y, 18, '#ffe7d6', { alpha: isSNC ? a3 : a1, align: 'right' });
        // majore: roșu
        const pr = b.i === 1 ? ease(clamp(b.bt / (b.bd * 0.6))) : b.i < 0 || b.i > 1 ? 1 : 0;
        tube(g, [[X(s0) - 20, y], [lerp(X(s0) - 20, Math.min(X(s1) + 20, 940), pr), y]], 26, RED, { ow: 4, alpha: a1 });
        // minore / funcționale: galben, de la sfârșitul ferestrei până la 9 sau 38
        const pm = b.i === 2 ? ease(clamp(b.bt / (b.bd * 0.6))) : b.i < 0 || b.i > 2 ? 1 : 0;
        const xe = end === 38 ? 940 : X(end);
        if (pm > 0) tube(g, [[X(s1) + 22, y], [lerp(X(s1) + 22, xe, pm), y], ], 18, AMB, { ow: 3, alpha: a2 });
        if (isSNC && (act(b, 3) || b.i < 0)) { g.save(); g.globalAlpha = 0.5 * pulse(t); g.strokeStyle = C.hi; g.lineWidth = 5; g.beginPath(); g.roundRect(X(3) - 34, y - 22, 900 - X(3) + 50, 44, 22); g.stroke(); g.restore(); }
      });
      txt(g, 'roșu = malformații MAJORE · galben = funcționale și minore', 640, 740, 16, '#cdb8ab', { w: 600 });
      tube(g, [[X(3) - 30, 196], [X(8) + 30, 196]], 8, RED, { ow: 0, alpha: a1 });
      txt(g, 'S3–S8 = organogeneza', (X(3) + X(8)) / 2, 182, 16, '#ff9a8a', { alpha: a1 });
    },
  };
}

/* ============ CAUZELE MALFORMAȚIILOR ============ */
export function causes() {
  const BOY = [['stenoză aortică', 2.88], ['coarctația aortei', 2.51], ['transpoziția vaselor', 2.34], ['craniosinostoză', 2.12], ['cheilo-palatoschizis', 2.01], ['cheiloschizis fără palat', 1.78]];
  const GIRL = [['atrezie coanală', 0.45], ['extrofie cloacală', 0.46], ['DSV multiple', 0.52], ['trunchi arterial comun', 0.63], ['holoprosencefalie', 0.64], ['heterotaxie + cardiopatie', 0.64]];
  const CX = [180, 500, 820];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[CX[0] - 120, 70], [CX[1] - 120, 70], [CX[2] - 120, 70], [60, 380]],
    draw(g, t, b) {
      bg(g);
      [['GENETICI', 'moștenire', '#ffd6c4'], ['DE MEDIU', 'factori materni', '#ffe9a8'], ['IDIOPATICI', 'cauză necunoscută\n~40–45%', '#e3d6ff']].forEach(([a, s, col], k) => {
        const on = act(b, k); card(g, CX[k], 170, 270, 150, a, s, col, { alpha: b.i === 3 ? 0.45 : vis(b, k, 0.35), glow: on ? 1 : 0 });
      });
      // icoane animate: cromozom (genetic), pilulă/teratogen care intră (mediu), semn de întrebare (idiopatic)
      chromo(g, CX[0], 300, 40, MAT, { dup: true, alpha: vis(b, 0, 0.35) });
      const u = loopT(t, 2.4); dot(g, CX[1], lerp(260, 320, u), 12, '#ff8a3d', { alpha: vis(b, 1, 0.35) * (1 - u * 0.5) });
      txt(g, '?', CX[2], 305, 40, '#d9c6ff', { alpha: vis(b, 2, 0.35) * (0.6 + 0.4 * pulse(t)) });
      // raport băieți : fete — bare orizontale cu axa la 1
      const a3 = b.i < 0 || b.i === 3 ? 1 : 0.3;
      const X1 = 560, SC = 150; // 1 → 560 ; 2.88 → 560 + 1.88 × 150
      const pr = b.i === 3 ? ease(clamp(b.bt / (b.bd * 0.6))) : 1;
      txt(g, 'raport băieți : fete', 500, 400, 20, '#ffb48a', { alpha: a3 });
      tube(g, [[X1, 430], [X1, 900]], 4, '#fff3e6', { ow: 0, alpha: a3 }); txt(g, '1', X1, 915, 16, '#fff3e6', { alpha: a3 });
      BOY.forEach(([n, v], i) => { const y = 450 + i * 34; tube(g, [[X1, y], [X1 + (v - 1) * SC * pr, y]], 22, '#7fb6e6', { ow: 3, alpha: a3, cap: 'butt' }); txt(g, n, X1 - 12, y, 15, '#ffe7d6', { align: 'right', alpha: a3, w: 600 }); txt(g, v.toFixed(2).replace('.', ','), X1 + (v - 1) * SC * pr + 30, y, 14, '#cde4ff', { alpha: a3 * pr }); });
      GIRL.forEach(([n, v], i) => { const y = 670 + i * 34; tube(g, [[X1, y], [X1 - (1 - v) * SC * pr, y]], 22, '#f08ab8', { ow: 3, alpha: a3, cap: 'butt' }); txt(g, n, X1 + 14, y, 15, '#ffe7d6', { align: 'left', alpha: a3, w: 600 }); txt(g, v.toFixed(2).replace('.', ','), X1 - (1 - v) * SC * pr - 30, y, 14, '#ffd0e4', { alpha: a3 * pr }); });
      txt(g, 'mai des la BĂIEȚI (> 1)', 820, 430, 16, '#cde4ff', { alpha: a3 }); txt(g, 'mai des la FETE (< 1)', 300, 650, 16, '#ffd0e4', { alpha: a3 });
    },
  };
}
