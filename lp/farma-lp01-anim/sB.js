// Scenele pentru cazurile 1–4 și Partea C (metabolizarea): tabelul peptidului, digestia peptidului (anim), graficul lui B,
// inducție / inhibiție (anim), matricea, pro-drogul (anim), graficul hormonului, rețeta, cardurile de rezolvare.
import { W, H, HOME, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, st, u01, loopT, txt, pill, dot, ell, arr, cross, check, tube, icon, heart, paint, glowRing } from './fk.js';
import { K, hiBox, mol, pac, axes, plot, liver, chain, platelet } from './fx.js';
import { mini } from './mini.js';

/* =================================================== CAZUL 1 · ENUNȚUL: tabelul + graficul */
export function case1() {
  const TT = [0, 20, 40, 60, 90];
  return {
    home: HOME, anchors: [[60, 70], [470, 560], [640, 200]],
    draw(g, t, b) {
      bg(g);
      const on = (k) => b.i === k;
      panel(g, 30, 60, 330, 640, { stroke: on(0) ? C.hi : 'rgba(255,225,180,.2)', lw: on(0) ? 5 : 3 });
      txt(g, 'Timp (min)', 115, 120, 21, C.hi); txt(g, 'µg/mL', 280, 120, 21, C.hi);
      g.save(); g.strokeStyle = 'rgba(255,236,200,.3)'; g.lineWidth = 2; g.beginPath(); g.moveTo(50, 150); g.lineTo(340, 150); g.moveTo(200, 95); g.lineTo(200, 680); g.stroke(); g.restore();
      TT.forEach((v, k) => { const y = 210 + k * 100; txt(g, String(v), 115, y, 28, C.cream); txt(g, '0', 280, y, 30, '#ff8a8a'); });
      const A = axes(g, 400, 60, 570, 640, { xmax: 90, ymax: 10, xt: TT, yt: [], xl: 'timp (min)', yl: 'concentrația plasmatică' });
      const a3 = b.i < 0 || on(2) ? 1 : 0.4;
      plot(g, A, (m) => 8.5 * (Math.exp(-m / 55) - Math.exp(-m / 9)) / 0.66, 0, 90, { col: C.cream, w: 4, dash: [10, 8], alpha: a3 });
      txt(g, 'un medicament absorbit\n(schematic)', 830, 330, 18, C.cream, { alpha: a3, w: 700 });
      const a2 = b.i < 0 || on(1) ? 1 : 0.5;
      g.save(); g.globalAlpha = a2; if (on(1)) { g.shadowColor = C.hi; g.shadowBlur = 20; }
      g.strokeStyle = OUT; g.lineWidth = 13; g.beginPath(); g.moveTo(A.X(0), A.Y(0.08)); g.lineTo(A.X(90), A.Y(0.08)); g.stroke(); g.strokeStyle = '#ff6b5e'; g.lineWidth = 7; g.stroke(); g.restore();
      TT.forEach((v) => dot(g, A.X(v), A.Y(0.08), 10, '#ff6b5e', { alpha: a2 }));
      txt(g, 'peptidul I, per os: 0 la toate recoltările', 700, A.Y(0.08) - 40, 19, '#ffb3ab', { alpha: a2 });
      panel(g, 30, 740, 940, 160, {});
      txt(g, 'medicament cu structură peptidică (I) · per os (p.o.)', 500, 790, 21, C.cream, { w: 700 });
      txt(g, 'recoltări la 0, 20, 40, 60, 90 min', 500, 845, 21, C.dim, { w: 700 });
    },
  };
}

/* =================================================== CAZUL 1 · REZOLVAREA: proteazele taie peptidul (anim) */
export function peptide() {
  const N = 8, SP = 46, CX = 140, CY = 230;
  const drift = [[-30, -40], [-12, 30], [10, -30], [28, 40], [44, -36], [60, 26], [80, -20], [96, 34]];
  return {
    home: HOME, anchors: [[560, 595], [940, 455], [430, 120], [250, 455], [700, 690]],
    phase: (i) => ['ce observ', 'etapa: absorbția', 'mecanism: proteazele', 'consecința', 'recomandarea'][i] || '',
    draw(g, t, b) {
      bg(g);
      // lumenul: stomac + intestin
      const ls = new Path2D(); ls.roundRect(20, 40, 470, 350, [24, 0, 0, 0]); paint(g, ls, '#5a2a22', null, null, [20, 40, 470, 350], OUT, 5);
      const li = new Path2D(); li.roundRect(490, 40, 490, 350, [0, 24, 0, 0]); paint(g, li, '#4a2a3a', null, null, [490, 40, 490, 350], OUT, 5);
      txt(g, 'stomac', 255, 72, 19, '#ffb3ab'); txt(g, 'intestin · proteaze (enzime digestive)', 735, 72, 19, '#d6b8ff');
      // peretele (enterocite)
      const wallOn = b.i === 1;
      for (let k = 0; k < 16; k++) { const x = 20 + k * 60; const p = new Path2D(); p.roundRect(x + 2, 400, 56, 90, 12); paint(g, p, '#f0a6a0', '#d27c78', '#ffe0dc', [x, 400, 56, 90], OUT, 4); ell(g, x + 30, 460, 9, 9, '#6b4aa0', { ow: 2 }); }
      if (wallOn) { g.save(); g.shadowColor = C.hi; g.shadowBlur = 28; g.strokeStyle = C.hi; g.lineWidth = 6; g.strokeRect(20, 398, 960, 94); g.restore(); txt(g, 'aici ar trebui să se absoarbă', 500, 445, 22, OUT, { stroke: false }); }
      // capilarul
      const cp = new Path2D(); cp.roundRect(20, 530, 960, 110, 50); paint(g, cp, '#7a1f2c', null, null, [20, 530, 960, 110], OUT, 6);
      const inj = b.i === 4 ? clamp(b.bt / (b.bd * 0.75)) : 0;
      txt(g, 'sânge: 0 µg/mL', 330, 585, 24, '#ffc9cf');
      // tăierea
      const cutP = st(b, 2, 0.8);
      const fall = b.i === 3 ? loopT(b.bt, 2.4) : 0;
      const cut = []; for (let k = 0; k < N - 1; k++) cut.push(clamp(cutP * (N - 1) - k));
      const off = []; for (let k = 0; k < N; k++) { const c = Math.max(cut[k - 1] || 0, cut[k] || 0); const d = drift[k]; let dy = d[1] * c; if (fall > 0) { const ff = fall < 0.5 ? ease(fall * 2) : ease((1 - fall) * 2); dy = lerp(dy, 400 - CY - 34 - (Math.sin(k * 1.3) * 8), ff); } off.push([d[0] * c, dy + (REDUCED ? 0 : Math.sin(t * 2 + k) * 4)]); }
      chain(g, CX + (b.i >= 2 || b.i < 0 ? 0 : 0), CY, N, SP + 0, cut, off);
      if (b.i === 3) { cross(g, 300, 400, 20, C.key); cross(g, 470, 400, 20, C.key); }
      if (b.i < 0) cross(g, 380, 400, 18, C.key, 0.8);
      // enzimele: urmăresc legătura care se taie
      const kb = Math.min(N - 2, Math.floor(cutP * (N - 1)));
      const bx = CX + kb * SP + SP / 2;
      const ea = b.i === 2 ? 1 : 0.85;
      if (b.i === 2) pac(g, bx, CY - 80, 34, '#b07cff', t * 6, ea);
      else { pac(g, 380, 140, 32, '#b07cff', t * 4, ea); if (b.i !== 4) pac(g, 700, 300, 32, '#b07cff', t * 4 + 1, ea); if (b.i !== 4) pac(g, 880, 160, 32, '#b07cff', t * 4 + 2, ea); }
      // insulina: chiar intactă, e prea mare și prea hidrofilă → nu trece peretele (punctul 5)
      const pa = b.i === 4 || b.i < 0 ? 1 : 0.35;
      if (b.i === 4) { const ui = loopT(b.bt, 2.6); const iy = ui < 0.5 ? lerp(170, 360, ease(ui * 2)) : lerp(360, 170, ease((ui - 0.5) * 2)); chain(g, 640, iy, 7, 40, [], [], { r: 18 }); cross(g, 760, 400, 18, C.key); }
      panel(g, 560, 680, 420, 200, { alpha: pa });
      txt(g, 'insulina intactă: prea mare,\nprea hidrofilă → nu se absoarbe', 770, 780, 19, C.hi, { alpha: pa });
      txt(g, 'proteazele → fragmente de\npeptide și aminoacizi', 280, 780, 19, '#d6b8ff', { alpha: b.i === 2 || b.i < 0 ? 1 : 0.5, maxW: 520 });
    },
  };
}

/* =================================================== CAZUL 2 · ENUNȚUL: concentrația lui B pe zile */
export function case2() {
  const f = (d) => { const base = d < 2.5 ? 15.5 : lerp(15.5, 9.5, ease(clamp((d - 2.5) / 2.2))); return base + 2 * Math.cos(d * Math.PI * 4); };
  return {
    home: HOME, anchors: [[180, 330], [400, 140], [950, 360]],
    draw(g, t, b) {
      bg(g);
      const A = axes(g, 30, 64, 940, 520, { xmax: 6, ymax: 26, xt: [], yt: [13, 18], yl: 'B (µg/mL)' });
      ['Z1', 'Z2', 'Z3', 'Z4', 'Z5', 'Z6'].forEach((z, k) => txt(g, z, A.X(k + 0.5), A.y1 + 24, 18, C.dim, { w: 700 }));
      txt(g, 'zile', A.x1, A.y1 + 52, 16, C.cream, { align: 'right', w: 700 });
      g.save(); g.fillStyle = 'rgba(79,209,139,.16)'; g.fillRect(A.x0, A.Y(18), A.x1 - A.x0, A.Y(13) - A.Y(18)); g.restore();
      g.save(); g.strokeStyle = C.key; g.lineWidth = 3; g.setLineDash([10, 7]); g.beginPath(); g.moveTo(A.x0, A.Y(13)); g.lineTo(A.x1, A.Y(13)); g.stroke(); g.restore();
      txt(g, '13–18 µg/mL: concentrații staționare', A.X(1.25), A.Y(18) - 34, 18, C.gs);
      plot(g, A, f, 0, 6, { col: K.ion, w: 6, n: 400 });
      const a2 = b.i < 0 || b.i === 1 ? 1 : 0.5;
      g.save(); g.globalAlpha = a2; g.strokeStyle = C.hi; g.lineWidth = 4; g.setLineDash([8, 6]); g.beginPath(); g.moveTo(A.X(2.5), A.y0 + 40); g.lineTo(A.X(2.5), A.y1); g.stroke(); g.restore();
      txt(g, 'începe neutralizantul gastric', A.X(2.5) + 12, A.y0 + 40, 18, C.hi, { align: 'left', alpha: a2 });
      const a3 = b.i < 0 || b.i === 2 ? 1 : 0.5;
      txt(g, 'sub prag → bronhospasm', A.X(4.9), A.Y(4.5), 20, '#ff8a8a', { alpha: a3 });
      if (b.i === 0) glowRing(g, A.X(1), A.Y(15.5), 150, 50, 0, 1, C.hi, 5);
      if (b.i === 2) glowRing(g, A.X(5), A.Y(9.5), 110, 50, 0, 1, C.hi, 5);
      // plămânul / bronhia: normală vs îngustată
      panel(g, 400, 620, 570, 290, {});
      txt(g, 'bronhia', 685, 650, 19, C.cream);
      for (const [x, r, l] of [[540, 50, 'B în fereastră'], [830, 22, 'B sub 13 µg/mL']]) {
        ell(g, x, 760, 90, 90, '#f2b6a6', { ow: 6 }); ell(g, x, 760, r, r, '#2b1a14', { ow: 4 });
        g.save(); g.strokeStyle = 'rgba(150,60,60,.6)'; g.lineWidth = 4; for (let rr = r + 10; rr < 86; rr += 12) { g.beginPath(); g.arc(x, 760, rr, 0, 7); g.stroke(); } g.restore();
        txt(g, l, x, 880, 18, x > 700 ? '#ff8a8a' : C.gs, { w: 700 });
      }
      arr(g, 640, 760, 730, 760, C.cream, 6);
    },
  };
}

/* =================================================== INDUCȚIE / INHIBIȚIE (anim) */
export function induct() {
  const EP = [[180, 250], [330, 250], [140, 360], [370, 360], [180, 470], [330, 470], [255, 200], [255, 520]];
  const CELL = [255, 360];
  return {
    home: HOME, anchors: [[CELL[0] - 160, 160], [CELL[0] + 490 + 160, 160], [60, 700], [550, 700]],
    phase: (i) => ['inductorul → mai multă enzimă', 'inhibitorul → enzima blocată', 'activ + inductor: concentrație ↓', 'activ + inhibitor: concentrație ↑'][i] || '',
    draw(g, t, b) {
      bg(g);
      const indP = st(b, 0, 0.8), inhP = st(b, 1, 0.6);
      [0, 1].forEach((side) => {
        const ox = side * 490; const cx = CELL[0] + ox, cy = CELL[1];
        // sângele (sinusoidul) sus
        const bv = new Path2D(); bv.roundRect(20 + ox, 30, 470, 70, 30); paint(g, bv, '#7a1f2c', null, null, [20 + ox, 30, 470, 70], OUT, 5);
        txt(g, side ? '+ INHIBITOR' : '+ INDUCTOR', 255 + ox, 130, 24, side ? K.inh : K.ind);
        ell(g, cx, cy + 20, 215, 200, '#f3c6a0', { ow: 6 });
        ell(g, cx, cy, 52, 46, '#6b4aa0', { ow: 5 });
        txt(g, 'hepatocit (citocromul P450)', cx, 600, 17, C.cream, { w: 700 });
        // enzimele
        const nE = side ? 2 : 2 + Math.round(6 * indP);
        for (let k = 0; k < nE; k++) {
          const [ex, ey] = EP[k]; let x = ex + ox, y = ey;
          if (!side && k >= 2) { const pk = clamp(indP * 6 - (k - 2)); x = lerp(cx, x, ease(pk)); y = lerp(cy, y, ease(pk)); if (pk <= 0) continue; }
          const blocked = side && inhP > 0.5;
          pac(g, x, y, 30, blocked ? K.grey : C.gq, t * (blocked ? 0 : 5) + k);
          if (side) { const bx = lerp(x + 120, x, ease(inhP)), by = lerp(y - 160, y - 34, ease(inhP)); const ib = new Path2D(); ib.roundRect(bx - 22, by - 13, 44, 26, 7); g.save(); g.globalAlpha = inhP > 0 ? 1 : 0; paint(g, ib, K.inh, null, null, [bx - 22, by - 13, 44, 26], OUT, 3); g.restore(); if (inhP > 0.9) cross(g, x + 34, y - 30, 11, C.key); }
        }
        if (!side) { const ix = lerp(cx - 150, cx, ease(clamp(indP * 2))), iy = lerp(70, cy, ease(clamp(indP * 2))); g.save(); g.translate(ix, iy); g.rotate(Math.PI / 4); const r = new Path2D(); r.rect(-15, -15, 30, 30); paint(g, r, K.ind, null, null, [-15, -15, 30, 30], OUT, 3); g.restore(); }
        // moleculele de medicament
        const flowOn = b.i < 0 || b.i >= 2;
        if (flowOn) {
          if (!side) { for (let k = 0; k < 5; k++) { const u = ((REDUCED ? 0.3 : t * 0.35) + k / 5) % 1; const x = 120 + k * 60, y = lerp(65, 300, u); if (u < 0.7) mol(g, x, y, '', 15, { col: K.ion, alpha: 1 - u }); } }
          else { const acc = b.i === 3 ? clamp(b.bt / (b.bd * 0.8)) : b.i < 0 ? 1 : 0; const n = 3 + Math.round(9 * acc); for (let k = 0; k < n; k++) { const a = k * 2.4; mol(g, cx + Math.cos(a) * (95 + (k % 3) * 35), cy + 30 + Math.sin(a) * (80 + (k % 2) * 40), '', 14, { col: K.ion }); } }
        }
        if (!side && flowOn) txt(g, '+ INDUCTOR', 255, 130, 24, K.ind);
        // bara concentrației
        const lvl = side ? lerp(0.55, 0.92, b.i === 3 ? ease(clamp(b.bt / (b.bd * 0.8))) : b.i < 0 ? 1 : 0) : lerp(0.55, 0.2, b.i === 2 ? ease(clamp(b.bt / (b.bd * 0.8))) : b.i < 0 || b.i > 2 ? 1 : 0);
        const x0 = 50 + ox, y0 = 650, bw = 410, bh = 200;
        panel(g, x0 - 20, y0 - 20, bw + 40, bh + 70, { stroke: (side ? b.i === 3 : b.i === 2) ? C.hi : 'rgba(255,225,180,.2)', lw: (side ? b.i === 3 : b.i === 2) ? 5 : 3 });
        const bar = new Path2D(); bar.roundRect(x0 + 150, y0 + bh * (1 - lvl), 110, bh * lvl, 10); paint(g, bar, lvl > 0.75 ? '#ff6b5e' : lvl < 0.35 ? C.gi : C.gs, null, null, [x0, y0, bw, bh], OUT, 4);
        for (const [v, l, c] of [[0.75, 'prag toxic', C.key], [0.35, 'prag minim eficace', C.gi]]) { g.save(); g.strokeStyle = c; g.lineWidth = 3; g.setLineDash([8, 6]); g.beginPath(); g.moveTo(x0, y0 + bh * (1 - v)); g.lineTo(x0 + bw, y0 + bh * (1 - v)); g.stroke(); g.restore(); txt(g, l, x0 + bw - 2, y0 + bh * (1 - v) - 14, 15, c, { align: 'right', w: 700 }); }
        txt(g, side ? 'concentrație ↑ → toxicitate' : 'concentrație ↓ → ineficacitate', x0 + bw / 2, y0 + bh + 28, 18, C.cream);
      });
    },
  };
}

/* =================================================== MATRICEA */
export function matrix() {
  const CX = [520, 800], RY = [330, 700];
  const CELLS = [[0, 0, '↓', '#ff6b5e', 'metabolizat mai repede\nconcentrație ↓ → EȘEC', 'carbamazepină + COC'], [1, 0, '↑', '#ff9d3c', 'metabolizat mai lent\nconcentrație ↑ → TOXIC', 'la doze terapeutice'],
    [0, 1, '↑', '#ff9d3c', 'mai mult metabolit activ\nefect ↑ (posibil toxic)', ''], [1, 1, '↓', '#ff6b5e', 'nu se mai activează\nefect ↓ → EȘEC', 'clopidogrel + omeprazol']];
  return {
    home: HOME, anchors: CELLS.map(([c, r]) => [CX[c] - 120, RY[r] - 150]),
    draw(g, t, b) {
      bg(g);
      pill(g, CX[0], 80, 260, 70, K.ind, '+ INDUCTOR (CYP ↑)', { size: 20 }); pill(g, CX[1], 80, 260, 70, K.inh, '+ INHIBITOR (CYP ↓)', { size: 20 });
      [['Medicament\nACTIV', 'metabolizarea\nîl INACTIVEAZĂ'], ['PRO-DROG', 'metabolizarea\nîl ACTIVEAZĂ']].forEach(([h, s], r) => { panel(g, 20, RY[r] - 160, 330, 330, {}); txt(g, h, 185, RY[r] - 60, 30, C.hi); txt(g, s, 185, RY[r] + 60, 21, C.cream, { w: 700 }); });
      CELLS.forEach(([c, r, ar, col, l, ex], k) => {
        const x = CX[c] - 130, y = RY[r] - 160; const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.45;
        panel(g, x, y, 260, 330, { fill: on ? 'rgba(255,207,133,.15)' : 'rgba(255,236,200,.06)', stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3, alpha: a });
        txt(g, ar, x + 130, y + 80, 96, col, { alpha: a });
        txt(g, l, x + 130, y + 200, 18, C.cream, { alpha: a, w: 700, maxW: 245 });
        if (ex) txt(g, ex, x + 130, y + 290, 17, C.hi, { alpha: a, maxW: 245 });
      });
    },
  };
}

/* =================================================== PRO-DROGUL (anim) */
export function prodrug() {
  const LANE = [230, 690];
  return {
    home: HOME, anchors: [[70, LANE[0] - 75], [300, LANE[0] - 120], [560, LANE[0] - 70], [955, LANE[0] - 80]],
    phase: (i) => ['pro-drogul intră în ficat', 'CYP2C19 îl activează', 'metabolitul activ în sânge', 'trombocitele nu se agregă'][i] || '',
    draw(g, t, b) {
      bg(g);
      LANE.forEach((y, L) => {
        const blk = L === 1; const la = blk ? (b.i < 0 || b.i === 3 ? 1 : 0.35) : 1;
        g.save(); g.globalAlpha = la;
        panel(g, 15, y - 200, 970, 420, {});
        txt(g, blk ? '+ omeprazol (inhibitor enzimatic)' : 'fără inhibitor', 500, y - 170, 22, blk ? K.inh : C.cream);
        ell(g, 290, y + 10, 140, 120, '#f3c6a0', { ow: 5 }); txt(g, 'ficatul', 290, y + 155, 18, C.cream);
        const vs = new Path2D(); vs.roundRect(440, y - 20, 280, 60, 28); paint(g, vs, '#7a1f2c', null, null, [440, y - 20, 280, 60], OUT, 5);
        const blocked = blk;
        pac(g, 300, y + 10, 44, blocked ? K.grey : C.gq, blocked ? 0 : t * 5);
        txt(g, 'CYP2C19', 300, y + 90, 19, blocked ? C.dim : C.gq);
        if (blocked) { const ob = new Path2D(); ob.roundRect(270, y - 64, 60, 32, 8); paint(g, ob, K.inh, null, null, [270, y - 64, 60, 32], OUT, 4); cross(g, 350, y - 50, 14, C.key); }
        // trombocitele
        const agg = blocked ? 1 : 0;
        const PL = [[790, -60], [900, -40], [800, 70], [910, 80], [850, 10]];
        PL.forEach(([px, py], k) => { const x = agg ? lerp(px, 850, 0.45) : px, yy = y + (agg ? lerp(py, 10, 0.45) : py); platelet(g, x, yy, 32, { spiky: agg }); });
        if (agg) { g.save(); g.strokeStyle = '#ff6b5e'; g.lineWidth = 3; for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(800 + k * 18, y - 50); g.lineTo(830 + k * 12, y + 70); g.stroke(); } g.restore(); txt(g, 'TROMBOZĂ', 850, y + 150, 22, '#ff6b5e'); }
        else txt(g, 'antiagregare', 850, y + 150, 22, C.gs);
        // molecula
        let u, col, glow = 0;
        if (!blk) {
          const p0 = st(b, 0, 0.7), p1 = st(b, 1, 0.7), p2 = st(b, 2, 0.7), p3 = st(b, 3, 0.7);
          const loopU = b.i < 0 ? loopT(t, 8) : null;
          if (loopU !== null) { u = loopU * 4; } else u = p0 + p1 + p2 + p3;
          const x = u < 1 ? lerp(60, 250, ease(u)) : u < 2 ? 250 : u < 3 ? lerp(250, 700, ease(u - 2)) : lerp(700, 850, ease(u - 3));
          const yy = y + 10 + (u >= 3 ? lerp(0, -10, ease(u - 3)) : 0);
          const g1 = clamp(u - 1); col = g1 > 0.5 ? K.met : K.grey; glow = u > 1 && u < 2.2 ? 1 : 0;
          mol(g, x, yy, '', 24, { col, glow });
          txt(g, u < 1.5 ? 'clopidogrel\n(inactiv)' : 'metabolit\nactiv', x, yy - 60, 16, u < 1.5 ? C.cream : C.gs, { w: 700 });
          if (u >= 3.5) { check(g, 850, y - 120, 18, C.gs); txt(g, 'P2Y12 blocat', 760, y - 120, 16, C.gs, { w: 700 }); }
        } else {
          const lu = b.i < 0 || b.i === 3 ? loopT(t, 6) : 0.1;
          const x = lerp(60, 720, lu); mol(g, x, y + 10, '', 24, { col: K.grey });
          txt(g, 'rămâne inactiv', x, y - 50, 16, C.cream, { w: 700 });
        }
        g.restore();
      });
    },
  };
}

/* =================================================== CAZUL 3 · ENUNȚUL: hormonul în 24 h */
export function case3() {
  return {
    home: HOME, anchors: [[440, 600], [740, 600], [300, 250]],
    draw(g, t, b) {
      bg(g);
      const A = axes(g, 30, 70, 940, 490, { xmax: 24, ymax: 10, xt: [0, 6, 12, 18, 24], yt: [], xl: 'ore (24 h)', yl: 'hormonul contraceptiv' });
      g.save(); g.strokeStyle = C.gs; g.lineWidth = 4; g.setLineDash([12, 8]); g.beginPath(); g.moveTo(A.x0, A.Y(4)); g.lineTo(A.x1, A.Y(4)); g.stroke(); g.restore();
      txt(g, 'nivel eficient', A.x1 - 10, A.Y(4) - 20, 19, C.gs, { align: 'right' });
      const a3 = b.i < 0 || b.i === 2 ? 1 : 0.55;
      plot(g, A, (h) => 9 * Math.exp(-h / 30), 0, 24, { col: C.cream, w: 5, dash: [12, 8], alpha: a3 });
      plot(g, A, (h) => 9 * Math.exp(-h / 7), 0, 24, { col: K.ion, w: 7, alpha: a3 });
      txt(g, 'fără inductor', A.X(16), A.Y(6.9), 19, C.cream, { alpha: a3 });
      txt(g, 'cu carbamazepină (CYP3A4 ↑)', A.X(12.5), A.Y(2.4), 19, K.ion, { alpha: a3 });
      if (b.i === 2) glowRing(g, A.X(5.7), A.Y(4), 60, 40, 0, 1, C.hi, 5);
      // fișa pacientei + medicamentele
      const on0 = b.i === 0, on1 = b.i === 1;
      panel(g, 400, 590, 270, 320, { stroke: on0 ? C.hi : 'rgba(255,225,180,.2)', lw: on0 ? 5 : 3 });
      txt(g, 'R.S., 25 de ani', 535, 630, 21, C.hi); txt(g, '72 kg · 168 cm', 535, 680, 18, C.cream, { w: 700 }); txt(g, 'TA 120/85 mmHg', 535, 725, 18, C.cream, { w: 700 }); txt(g, 'AV 77/min', 535, 770, 18, C.cream, { w: 700 }); txt(g, 'cord, plămâni\nnormale', 535, 840, 17, C.dim, { w: 700 });
      panel(g, 690, 590, 280, 320, { stroke: on1 ? C.hi : 'rgba(255,225,180,.2)', lw: on1 ? 5 : 3 });
      txt(g, 'epilepsie, grand mal', 830, 630, 18, C.hi);
      icon(g, 'pill', 830, 700, 1.0, { col: K.ind }); txt(g, 'carbamazepină', 830, 750, 18, K.ind);
      for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) dot(g, 760 + c * 35, 805 + r * 30, 11, '#f6eef7', { ow: 3 });
      txt(g, 'contraceptive orale', 830, 885, 18, C.cream, { w: 700 });
    },
  };
}

/* =================================================== CAZUL 4 · ENUNȚUL: rețeta */
export function case4() {
  const ROWS = [[190, 'angină pectorală', 'clopidogrel', 'pro-drog', C.gq], [290, 'ulcer', 'omeprazol', 'inhibitor enzimatic', K.inh], [390, 'hipercolesterolemie, HTA', 'alte medicamente', '', C.dim]];
  return {
    home: HOME, anchors: [[150, 190], [150, 290], [145, 92]],
    draw(g, t, b) {
      bg(g);
      const pp = new Path2D(); pp.roundRect(110, 40, 820, 460, 16); paint(g, pp, '#fbf3e2', null, null, [110, 40, 820, 460], OUT, 6);
      txt(g, 'Rp/', 205, 92, 30, OUT, { stroke: false });
      txt(g, 'O.M., 63 de ani, bărbat, 81 kg', 560, 92, 24, OUT, { stroke: false });
      if (b.i === 2) hiBox(g, 140, 62, 760, 60, true);
      g.save(); g.strokeStyle = 'rgba(80,50,30,.3)'; g.lineWidth = 2; g.beginPath(); g.moveTo(140, 130); g.lineTo(900, 130); g.stroke(); g.restore();
      ROWS.forEach(([y, dx, drug, tag, col], k) => {
        const on = b.i === k; if (on) { g.save(); g.fillStyle = 'rgba(255,227,110,.35)'; g.beginPath(); g.roundRect(140, y - 38, 760, 76, 12); g.fill(); g.restore(); }
        txt(g, dx, 300, y, 22, '#5a4630', { stroke: false, w: 700, maxW: 300 });
        txt(g, '→', 470, y, 26, OUT, { stroke: false });
        txt(g, drug, 600, y, 24, OUT, { stroke: false });
        if (tag) pill(g, 800, y, 180, 44, col, tag, { size: 16 });
      });
      txt(g, 'Comentați prescripția medicală.', 520, 460, 20, '#5a4630', { stroke: false, w: 700 });
      // artera coronară: trombocite separate = artera deschisă
      panel(g, 400, 540, 570, 370, {});
      txt(g, 'artera coronară: antiagregarea o ține deschisă', 685, 575, 18, C.cream, { maxW: 540 });
      const ar = new Path2D(); ar.roundRect(430, 640, 510, 170, 80); paint(g, ar, '#7a1f2c', null, null, [430, 640, 510, 170], OUT, 6);
      for (let k = 0; k < 6; k++) { const u = ((REDUCED ? 0.2 : t * 0.12) + k / 6) % 1; platelet(g, 470 + u * 430, 700 + (k % 2) * 50, 22); }
      heart(g, 470, 860, 0.35, 0); txt(g, 'coronarian → are nevoie de antiagregare', 720, 870, 17, C.cream, { w: 700, maxW: 440 });
    },
  };
}

/* =================================================== REZOLVAREA: desenul cazului + cele 5 carduri */
export function solve({ spec }) {
  const o = spec.sceneOpts; const TI = ['Ce observ', 'Etapa ADME', 'Mecanismul', 'Consecința', o.f === 'thalf' ? 'Răspunsul' : 'Recomandarea'];
  const X = [0, 1, 2, 3, 4].map((k) => 12 + k * 197);
  return {
    home: HOME, anchors: X.map((x) => [x + 24, 490]),
    draw(g, t, b) {
      bg(g);
      mini(g, o.f, 162, 14, 1.25, t);
      X.forEach((x, k) => {
        const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.5; const y = 470;
        panel(g, x, y, 186, 440, { fill: on ? 'rgba(255,207,133,.16)' : 'rgba(255,236,200,.06)', stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3, alpha: a });
        txt(g, TI[k], x + 93, y + 70, 23, C.hi, { alpha: a, maxW: 176 });
        o.c[k].slice(1).forEach((l, j) => txt(g, l, x + 93, y + 155 + j * 56, 20, C.cream, { alpha: a, w: 700, maxW: 178 }));
        if (k < 4) arr(g, x + 180, y + 400, x + 205, y + 400, C.cream, 4, 0.7);
      });
    },
  };
}
