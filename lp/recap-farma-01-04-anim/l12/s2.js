// Scenele LP 2 Farmacologie (farmacocinetica 2: metabolizarea, excreția, cinetica; cazurile oficiale 1–7).
import { HOME, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, st, txt, pill, dot, ell, arr, cross, check, tube, curve, at,
  membrane, icon, paint, glowRing } from './fk.js';
import { K, hiBox, mol, pac, axes, plot, liver, kidney } from './fx.js';

const L = (t, per, off = 0) => (REDUCED ? 0.5 : (((t / per) + off) % 1 + 1) % 1);
const live = (b, k) => b.i < 0 || b.i === k;
const prog = (b, k, f = 0.8) => (b.i === k ? clamp(b.bt / (b.bd * f)) : b.i > k || b.i < 0 ? 1 : 0);
const box = (g, x, y, w, h, on) => panel(g, x, y, w, h, { fill: on ? 'rgba(255,207,133,.13)' : 'rgba(255,236,200,.05)', stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3 });
const rbox = (g, x, y, w, h, col, r = 16, ow = 5) => { const p = new Path2D(); p.roundRect(x, y, w, h, r); paint(g, p, col, null, null, [x, y, w, h], OUT, ow); return p; };
const dline = (g, x0, y0, x1, y1, col, w = 3, dash = [9, 7]) => { g.save(); g.strokeStyle = col; g.lineWidth = w; g.setLineDash(dash); g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); };
const bell = (pk, k1 = 3.5, k2 = 0.7) => (h) => pk * (Math.exp(-h / k1) - Math.exp(-h / k2)) / 0.6;
// capsula (polar = verde, nepolar = maro), ca în imaginea din LP
function caps(g, x, y, col, a = 1, rot = 0.5) { g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(rot); const p = new Path2D(); p.roundRect(-16, -8, 32, 16, 8); paint(g, p, col, null, '#fff', [-16, -8, 32, 16], OUT, 3); g.restore(); }
const POL = '#8fd08a', NPOL = '#b08a68';
// graficul concentrație–timp din cele 4 grafice ale LP-ului
function gmini(g, x, y, w, h, f0, f1, col, o = {}) {
  const A = axes(g, x, y, w, h, { xmax: 12, ymax: 11, noTicks: true, thin: true });
  dline(g, A.x0, A.Y(8), A.x1, A.Y(8), C.key, 3); dline(g, A.x0, A.Y(4), A.x1, A.Y(4), '#e8e0d0', 3);
  if (o.f2) plot(g, A, o.f2, 0, 12, { col: '#b8b8c8', w: 4 });
  plot(g, A, f0, 0, 12, { col: '#1a1020', w: 4, ow: 0 }); plot(g, A, f0, 0, 12, { col: '#f4efe6', w: 3, ow: 0, dash: [2, 0] });
  plot(g, A, f1, 0, 12, { col, w: 5 });
  return A;
}

/* =================================================== COPERTA */
export function cover2() {
  const R = [[40, 50], [520, 50], [40, 490], [520, 490]];
  const T = ['metabolizarea: faza I / II', 'inductor / inhibitor', 'excreția renală, pH-ul', 'cinetica: T½'];
  return {
    home: HOME, anchors: R.map(([x, y]) => [x + 30, y + 30]),
    draw(g, t, b) {
      bg(g);
      R.forEach(([x, y], i) => {
        const act = b.i === i || (b.i < 0 && Math.floor(t / 2.4) % 4 === i);
        box(g, x, y, 440, 400, act); txt(g, T[i], x + 220, y + 360, 26, C.cream);
        const cx = x + 220, cy = y + 175;
        if (i === 0) { liver(g, cx, cy - 20, 1.6); pill(g, cx - 100, cy + 110, 150, 50, K.stage[2], 'faza I', { size: 22 }); pill(g, cx + 100, cy + 110, 150, 50, K.stage[3], 'faza II', { size: 22 }); }
        if (i === 1) { for (let k = 0; k < 4; k++) pac(g, cx - 140 + (k % 2) * 70, cy - 40 + Math.floor(k / 2) * 80, 28, C.gq, t * 4 + k); txt(g, '↑', cx - 105, cy + 120, 40, K.ind); pac(g, cx + 110, cy, 30, K.grey, 0); txt(g, '↓', cx + 110, cy + 120, 40, K.inh); }
        if (i === 2) { kidney(g, cx - 100, cy, 1.4); caps(g, cx + 60, cy - 40, POL); caps(g, cx + 120, cy + 20, NPOL); txt(g, 'pH', cx + 90, cy + 100, 40, C.gi); }
        if (i === 3) { const A = axes(g, x + 50, y + 40, 340, 270, { xmax: 15, ymax: 10, noTicks: true }); plot(g, A, (h) => 10 * Math.pow(0.5, h / 3), 0, 15, { col: K.drug, w: 6 }); [0, 3, 6, 9].forEach((h) => dot(g, A.X(h), A.Y(10 * Math.pow(0.5, h / 3)), 8, C.hi)); }
      });
    },
  };
}

/* =================================================== METABOLIZAREA: DRUG vs PRODRUG (anim) */
export function metab() {
  const PL = curve([[250, 140], [250, 260], [250, 360], [250, 560], [250, 740]]);
  const PR = curve([[640, 130], [700, 230], [760, 290], [860, 420], [880, 470], [820, 540], [740, 600], [740, 700], [740, 760]]);
  return {
    home: HOME, anchors: [[40, 95], [70, 300], [560, 230], [560, 600]],
    phase: (i) => ['definiția', 'medicament activ → metaboliți', 'pro-drog → formă activă', 'forma activă → inactivă → excreție'][i] || '',
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 470, 880, b.i === 1); box(g, 510, 30, 470, 880, b.i === 2 || b.i === 3);
      txt(g, 'majoritatea medicamentelor', 255, 70, 21, C.hi); txt(g, 'pro-drog (inactiv)', 745, 70, 21, C.hi);
      tube(g, PL, 8, 'rgba(255,236,200,.25)', { raw: true, ow: 0 }); tube(g, PR, 8, 'rgba(255,236,200,.25)', { raw: true, ow: 0 });
      liver(g, 250, 360, 1.1); liver(g, 720, 250, 0.9); liver(g, 760, 590, 0.9);
      txt(g, '1', 640, 250, 24, C.hi); txt(g, '2', 840, 600, 24, C.hi);
      icon(g, 'bladder', 250, 800, 0.8); icon(g, 'bladder', 740, 810, 0.8); txt(g, 'excreție', 330, 820, 18, C.cream, { align: 'left' }); txt(g, 'excreție', 810, 830, 18, C.cream, { align: 'left' });
      txt(g, 'efect', 120, 140, 21, C.gs); arr(g, 220, 140, 160, 140, C.gs, 5);
      txt(g, 'metaboliți mai puțin\nactivi sau inactivi', 380, 470, 17, C.cream, { w: 700 });
      ell(g, 900, 420, 40, 40, 'rgba(79,209,139,.2)', { ow: 4, sc: C.gs }); txt(g, 'efect', 900, 370, 20, C.gs);
      txt(g, 'formă\nactivă', 940, 500, 17, K.drug, { w: 700 }); txt(g, 'metaboliți mai puțin\nactivi sau inactivi', 620, 700, 17, C.cream, { w: 700 });
      // stânga: activ → metabolit
      const uL = live(b, 1) ? L(t, 4.5) : b.i === 0 ? 0.08 : 1;
      if (b.i !== 0 || true) { const [x, y] = at(PL, uL); mol(g, x, y, '', 24, { col: uL > 0.42 ? K.met : K.drug }); }
      // dreapta: pro-drog → activ (1) → efect → inactiv (2) → excreție
      let uR = 0.02; if (b.i < 0) uR = L(t, 7); else if (b.i === 2) uR = lerp(0.02, 0.45, ease(clamp(b.bt / (b.bd * 0.8)))); else if (b.i === 3) uR = lerp(0.45, 1, ease(clamp(b.bt / (b.bd * 0.8))));
      const [rx, ry] = at(PR, uR); mol(g, rx, ry, '', 24, { col: uR < 0.2 ? K.grey : uR < 0.66 ? K.drug : K.met, glow: uR > 0.38 && uR < 0.52 ? 1 : 0 });
    },
  };
}

/* =================================================== UNDE, FAZA I, FAZA II, CE INFLUENȚEAZĂ */
export function phases() {
  return {
    home: HOME, anchors: [[40, 95], [380, 60], [380, 360], [40, 690]],
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 340, 630, b.i === 0);
      liver(g, 190, 180, 1.7); txt(g, 'ficatul: predominant', 190, 290, 20, C.hi);
      icon(g, 'bronchi', 80, 420, 0.6); icon(g, 'kidney', 190, 420, 0.6); icon(g, 'gut', 300, 420, 0.6);
      txt(g, 'plămân · rinichi ·\nperetele intestinului subțire', 190, 520, 17, C.cream, { w: 700 }); txt(g, 'în măsură mult mai mică', 190, 600, 17, C.dim, { w: 700 });
      box(g, 380, 30, 600, 300, b.i === 1);
      pill(g, 500, 80, 180, 52, K.stage[2], 'FAZA I', { size: 24 }); pill(g, 820, 80, 250, 52, C.gq, 'citocromul P450', { size: 20 });
      ['oxidare', 'hidroliză', 'reducere'].forEach((l, k) => pill(g, 490 + k * 165, 170, 150, 46, 'rgba(176,124,255,.35)', l, { size: 19, col: C.cream }));
      mol(g, 470, 265, '', 22); arr(g, 500, 265, 580, 265, C.cream, 5); mol(g, 610, 265, 'M', 22, { col: '#7fd3ff' });
      txt(g, 'metaboliți mai polari,\nmai solubili în apă', 790, 265, 18, C.cream, { w: 700 });
      box(g, 380, 350, 600, 310, b.i === 2);
      pill(g, 530, 400, 250, 52, K.stage[3], 'FAZA II · conjugare', { size: 20 });
      txt(g, 'se adaugă o grupare sau o substanță', 790, 400, 16, C.dim, { w: 700, maxW: 330 });
      ['metilare', 'acetilare', 'sulfatare', 'glutation', 'acid glucuronic'].forEach((l, k) => pill(g, 490 + (k % 3) * 185, 490 + Math.floor(k / 3) * 70, 170, 50, 'rgba(95,207,122,.3)', l, { size: 18, col: C.cream }));
      mol(g, 620, 620, '', 20); dot(g, 646, 606, 12, C.gs); txt(g, '+ grupare', 720, 620, 17, C.gs, { align: 'left' });
      box(g, 20, 680, 960, 230, b.i === 3);
      txt(g, 'metabolizarea este influențată de:', 500, 715, 21, C.hi);
      const F = ['fondul\ngenetic', 'vârstă', 'patologii\nhepatice', 'medicamente', 'alimente', 'suplimente\nalimentare'];
      F.forEach((l, k) => { const x = 105 + k * 158; ell(g, x, 790, 34, 34, 'rgba(255,236,200,.1)', { ow: 4, sc: C.hi }); txt(g, String(k + 1), x, 790, 22, C.hi); txt(g, l, x, 860, 16, C.cream, { w: 700 }); });
    },
  };
}

/* =================================================== ENZIMELE MICROZOMIALE vs NEMICROZOMIALE */
export function enzymes() {
  return {
    home: HOME, anchors: [[40, 120], [40, 470], [40, 720], [520, 120]],
    draw(g, t, b) {
      bg(g);
      txt(g, 'microzomiale (citocromul P450)', 255, 60, 22, C.gq); txt(g, 'nemicrozomiale', 745, 60, 22, '#7fe8ff');
      // localizare
      box(g, 20, 90, 470, 330, b.i === 0);
      ell(g, 255, 255, 200, 140, '#f3c6a0', { ow: 5 }); ell(g, 200, 250, 40, 36, '#6b4aa0', { ow: 4 });
      g.save(); g.strokeStyle = C.erS; g.lineWidth = 7; for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(260, 180 + k * 30); g.quadraticCurveTo(320, 160 + k * 30, 380, 190 + k * 30); g.stroke(); } g.restore();
      ell(g, 330, 330, 52, 26, '#ff9a7a', { ow: 4 }); g.save(); g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); for (let k = 0; k < 5; k++) { g.moveTo(292 + k * 16, 318); g.lineTo(296 + k * 16, 342); } g.stroke(); g.restore();
      txt(g, 'reticul endoplasmatic', 380, 140, 16, C.er, { w: 700 }); txt(g, 'membrana internă a mitocondriei', 255, 395, 16, '#ffb3a0', { w: 700 });
      // specificitate redusă
      box(g, 20, 440, 470, 230, b.i === 1);
      pac(g, 110, 555, 46, C.gq, t * 4);
      [[220, 500, '■'], [290, 540, '▲'], [360, 500, '●'], [240, 600, '◆'], [330, 610, '★']].forEach(([x, y, s]) => txt(g, s, x, y, 34, '#ffd36e'));
      txt(g, 'specificitate de substrat redusă', 300, 650, 17, C.cream, { w: 700 });
      // inductibile
      box(g, 20, 690, 470, 220, b.i === 2);
      for (let k = 0; k < 3; k++) pac(g, 90 + k * 60, 770, 24, C.gq, t * 4 + k); txt(g, 'inductor ↑', 150, 830, 19, K.ind);
      pac(g, 380, 770, 24, K.grey, 0); txt(g, 'inhibitor ↓', 380, 830, 19, '#d6b8ff');
      txt(g, 'INDUCTIBILE', 255, 885, 20, C.hi);
      // nemicrozomiale
      box(g, 510, 90, 470, 820, b.i === 3);
      ell(g, 745, 250, 180, 110, '#7a1f2c', { ow: 5 }); txt(g, 'plasmă · ficat · alte țesuturi', 745, 150, 17, C.cream, { w: 700 });
      for (let k = 0; k < 4; k++) pac(g, 640 + k * 70, 255 + (k % 2) * 30, 22, '#7fe8ff', t * 4 + k);
      txt(g, 'enzime libere', 745, 400, 21, '#7fe8ff');
      pac(g, 650, 520, 40, '#7fe8ff', t * 4); txt(g, '▲', 740, 520, 40, '#ffd36e'); check(g, 820, 520, 16, C.gs);
      txt(g, '■', 880, 520, 34, '#ffd36e'); cross(g, 930, 520, 12, C.key);
      txt(g, 'specificitate de substrat înaltă', 745, 600, 18, C.cream, { w: 700 }); txt(g, 'metabolismul intermediar:\ncompuși endogeni', 745, 670, 17, C.dim, { w: 700 });
      txt(g, 'NU sunt inductibile', 745, 800, 24, C.key);
    },
  };
}

/* =================================================== INDUCȚIE / INHIBIȚIE: RATA SINTEZEI ENZIMELOR (anim) */
export function induct2() {
  const EP = [[180, 250], [330, 250], [140, 360], [370, 360], [180, 470], [330, 470], [255, 200], [255, 520]];
  const CELL = [255, 360];
  return {
    home: HOME, anchors: [[CELL[0] - 160, 160], [CELL[0] + 490 + 160, 160], [60, 700], [550, 700]],
    phase: (i) => ['inductorul: mai multă enzimă', 'inhibitorul: mai puțină enzimă', 'medicament + inductor: Cp ↓', 'medicament + inhibitor: Cp ↑'][i] || '',
    draw(g, t, b) {
      bg(g);
      const indP = prog(b, 0), inhP = prog(b, 1, 0.7);
      [0, 1].forEach((side) => {
        const ox = side * 490; const cx = CELL[0] + ox, cy = CELL[1];
        rbox(g, 20 + ox, 30, 470, 70, '#7a1f2c', 30, 5);
        txt(g, side ? '+ INHIBITOR ENZIMATIC' : '+ INDUCTOR ENZIMATIC', 255 + ox, 130, 22, side ? '#d6b8ff' : K.ind);
        ell(g, cx, cy + 20, 215, 200, '#f3c6a0', { ow: 6 }); ell(g, cx, cy, 52, 46, '#6b4aa0', { ow: 5 });
        txt(g, 'hepatocit · enzime CYP450', cx, 600, 17, C.cream, { w: 700 });
        // enzimele: bază 4; inductorul → 8, inhibitorul → 1
        if (!side) {
          for (let k = 0; k < 8; k++) { let [x, y] = EP[k]; x += ox; if (k >= 4) { const pk = clamp(indP * 4 - (k - 4)); if (pk <= 0) continue; x = lerp(cx, x, ease(pk)); y = lerp(cy, y, ease(pk)); } pac(g, x, y, 30, C.gq, t * 5 + k); }
          const ix = lerp(cx - 150, cx, ease(clamp(indP * 2))), iy = lerp(70, cy, ease(clamp(indP * 2)));
          g.save(); g.translate(ix, iy); g.rotate(Math.PI / 4); const r = new Path2D(); r.rect(-15, -15, 30, 30); paint(g, r, K.ind, null, null, [-15, -15, 30, 30], OUT, 3); g.restore();
        } else {
          for (let k = 0; k < 4; k++) { const [x, y] = EP[k]; const fade = k === 0 ? 1 : clamp(1 - (inhP * 3 - (k - 1))); if (fade <= 0.02) continue; pac(g, x + ox, y, 30 * (0.6 + 0.4 * fade), C.gq, t * 5 + k, fade); }
          const ix = lerp(cx + 150, cx, ease(clamp(inhP * 2))), iy = lerp(70, cy, ease(clamp(inhP * 2)));
          const r = new Path2D(); r.roundRect(ix - 22, iy - 14, 44, 28, 7); paint(g, r, K.inh, null, null, [ix - 22, iy - 14, 44, 28], OUT, 3);
        }
        // medicamentul activ (albastru)
        const flowOn = b.i < 0 || b.i >= 2;
        if (flowOn) {
          if (!side) { for (let k = 0; k < 5; k++) { const u = L(t, 3, k / 5); const x = 120 + k * 60, y = lerp(65, 300, u); if (u < 0.7) mol(g, x, y, '', 15, { col: K.ion, alpha: 1 - u }); } }
          else { const acc = b.i === 3 ? clamp(b.bt / (b.bd * 0.8)) : b.i < 0 ? 1 : 0; const n = 3 + Math.round(9 * acc); for (let k = 0; k < n; k++) { const a = k * 2.4; mol(g, cx + Math.cos(a) * (95 + (k % 3) * 35), cy + 30 + Math.sin(a) * (80 + (k % 2) * 40), '', 14, { col: K.ion }); } }
        }
        const lvl = side ? lerp(0.55, 0.92, b.i === 3 ? ease(clamp(b.bt / (b.bd * 0.8))) : b.i < 0 ? 1 : 0) : lerp(0.55, 0.2, b.i === 2 ? ease(clamp(b.bt / (b.bd * 0.8))) : b.i < 0 || b.i > 2 ? 1 : 0);
        const x0 = 50 + ox, y0 = 650, bw = 410, bh = 200; const onB = side ? b.i === 3 : b.i === 2;
        panel(g, x0 - 20, y0 - 20, bw + 40, bh + 70, { stroke: onB ? C.hi : 'rgba(255,225,180,.2)', lw: onB ? 5 : 3 });
        const bar = new Path2D(); bar.roundRect(x0 + 150, y0 + bh * (1 - lvl), 110, bh * lvl, 10); paint(g, bar, lvl > 0.75 ? '#ff6b5e' : lvl < 0.35 ? C.gi : C.gs, null, null, [x0, y0, bw, bh], OUT, 4);
        for (const [v, l, c] of [[0.75, 'risc de toxicitate', C.key], [0.35, 'risc de ineficacitate', C.gi]]) { dline(g, x0, y0 + bh * (1 - v), x0 + bw, y0 + bh * (1 - v), c); txt(g, l, x0 + bw - 2, y0 + bh * (1 - v) - 14, 15, c, { align: 'right', w: 700 }); }
        txt(g, side ? 'viteza ↓ → Cp ↑' : 'viteza ↑ → Cp ↓', x0 + bw / 2, y0 + bh + 28, 19, C.cream);
      });
    },
  };
}

/* =================================================== CELE 4 GRAFICE: DRUG / PRODRUG × INDUCTOR / INHIBITOR */
export function graphs4() {
  const f0 = bell(6.2), fInd = bell(3.0, 2.6, 0.7), fInh = bell(9.6, 5.5, 0.8), fPInd = bell(9.4, 3.5, 0.6), fPInh = bell(2.9, 3.5, 0.8);
  const G = [[20, 40, 'Drug + inductor', '#e0b040', fInd, 'Cp ↓ → ineficacitate'], [510, 40, 'Drug + inhibitor', '#ff6b5e', fInh, 'Cp ↑ → toxicitate'], [20, 480, 'Prodrug + inductor', '#ff9d3c', fPInd, 'metabolit activ ↑'], [510, 480, 'Prodrug + inhibitor', '#9fb4d8', fPInh, 'metabolit activ ↓']];
  return {
    home: HOME, anchors: G.map(([x, y]) => [x + 26, y + 26]),
    draw(g, t, b) {
      bg(g);
      G.forEach(([x, y, h, col, f, l], k) => {
        const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.5;
        box(g, x, y, 470, 420, on);
        g.save(); g.globalAlpha = a;
        pill(g, x + 235, y + 40, 260, 46, col, h, { size: 20 });
        gmini(g, x + 20, y + 80, 430, 270, f0, f, col);
        txt(g, l, x + 235, y + 385, 20, col);
        g.restore();
      });
      txt(g, 'alb = fără interacțiune · roșu punctat = prag toxic · alb punctat = prag minim eficace', 500, 920, 15, C.dim, { w: 700, maxW: 960 });
    },
  };
}

/* =================================================== CAZUL 1: CARBAMAZEPINĂ + CONTRACEPTIVE ORALE */
export function c1carba() {
  return {
    home: HOME, anchors: [[40, 100], [40, 330], [520, 60], [520, 690]],
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 470, 270, b.i === 0);
      icon(g, 'pill', 120, 130, 0.9, { col: K.ind }); txt(g, 'carbamazepină', 120, 190, 18, K.ind); txt(g, 'antiepileptic\ninductor enzimatic', 120, 245, 15, C.dim, { w: 700 });
      for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) dot(g, 300 + c * 40, 110 + r * 36, 13, '#f6eef7', { ow: 3 });
      txt(g, 'contraceptive orale', 360, 210, 18, C.cream, { w: 700 });
      box(g, 20, 320, 470, 590, b.i === 1);
      ell(g, 255, 560, 200, 190, '#f3c6a0', { ow: 6 }); ell(g, 255, 560, 46, 42, '#6b4aa0', { ow: 4 });
      [[150, 470], [360, 470], [130, 600], [380, 600], [180, 700], [330, 700], [255, 440]].forEach(([x, y], k) => pac(g, x, y, 26, C.gq, t * 4 + k));
      txt(g, 'CYP3A4 ↑', 255, 860, 26, C.gq);
      box(g, 510, 30, 470, 620, b.i === 2);
      const A = axes(g, 530, 60, 430, 470, { xmax: 24, ymax: 10, xt: [], yt: [], xl: 'timp', yl: 'Cp contraceptiv' });
      dline(g, A.x0, A.Y(4), A.x1, A.Y(4), C.gs, 4); txt(g, 'nivel eficient', A.x1 - 6, A.Y(4) - 18, 16, C.gs, { align: 'right' });
      plot(g, A, bell(7.5, 9, 1.5), 0, 24, { col: C.cream, w: 4, dash: [10, 7] }); plot(g, A, bell(3.8, 4, 1.2), 0, 24, { col: '#e0b040', w: 6 });
      txt(g, 'metabolizate mai repede', 745, 590, 20, '#e0b040'); txt(g, 'eficacitate compromisă', 745, 625, 18, C.cream, { w: 700 });
      box(g, 510, 670, 470, 240, b.i === 3);
      txt(g, 'alte metode contraceptive', 745, 705, 20, C.hi);
      // prezervativ (inel în plic) și sterilet (T)
      rbox(g, 580, 750, 120, 110, '#7fb3ff', 14, 4); ell(g, 640, 805, 34, 34, 'rgba(255,255,255,.25)', { ow: 4 }); txt(g, 'prezervativ', 640, 885, 17, C.cream, { w: 700 });
      g.save(); g.lineCap = 'round'; for (const [c, w] of [[OUT, 16], ['#f4efe6', 9]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(820, 760); g.lineTo(900, 760); g.moveTo(860, 760); g.lineTo(860, 850); g.stroke(); } g.restore(); txt(g, 'sterilet', 860, 885, 17, C.cream, { w: 700 });
    },
  };
}

/* =================================================== CAZUL 2: AUTOINDUCȚIA CARBAMAZEPINEI */
export function autoind() {
  const T = [4, 8, 12], I = [8.65, 7.42, 6.32], D = [6.12, 4.35, 3.17];
  return {
    home: HOME, anchors: [[40, 105], [40, 300], [520, 640]],
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 960, 220, b.i === 0);
      icon(g, 'pill', 100, 110, 0.8, { col: K.ind }); txt(g, '500 mg/zi', 100, 175, 18, K.ind);
      txt(g, 'prima criză epileptică → carbamazepină', 560, 75, 20, C.cream, { w: 700 });
      [['4 h', 280], ['8 h', 420], ['12 h', 560]].forEach(([l, x]) => { icon(g, 'vessel', x, 150, 0.45); txt(g, l, x, 200, 17, C.hi); });
      txt(g, '→ după 3 săptămâni: din nou', 820, 160, 18, C.cream, { w: 700 });
      // tabelul
      box(g, 20, 270, 470, 640, b.i === 1);
      txt(g, 'Timp (h)', 100, 320, 19, C.hi); txt(g, 'Inițial', 260, 320, 19, C.hi); txt(g, 'După 3 săpt.', 400, 320, 19, C.hi);
      txt(g, 'conc. CBZ (mg/L)', 330, 360, 15, C.dim, { w: 700 });
      T.forEach((h, k) => { const y = 430 + k * 90; txt(g, String(h), 100, y, 28, C.cream); txt(g, String(I[k]).replace('.', ','), 260, y, 28, C.cream); txt(g, String(D[k]).replace('.', ','), 400, y, 28, '#ff8a8a'); });
      txt(g, 'mai mici la toți timpii', 255, 760, 21, '#ff8a8a'); txt(g, 'și scad mai repede', 255, 800, 19, C.cream, { w: 700 });
      // graficul + bucla autoinducției
      box(g, 510, 270, 470, 640, b.i === 2);
      const A = axes(g, 530, 290, 430, 340, { xmax: 14, ymax: 10, xt: [4, 8, 12], yt: [3, 6, 9], xl: 'ore', yl: 'mg/L' });
      for (const [S, col] of [[I, C.cream], [D, '#ff8a8a']]) { g.save(); g.strokeStyle = col; g.lineWidth = 4; g.beginPath(); S.forEach((v, k) => (k ? g.lineTo(A.X(T[k]), A.Y(v)) : g.moveTo(A.X(T[k]), A.Y(v)))); g.stroke(); g.restore(); S.forEach((v, k) => dot(g, A.X(T[k]), A.Y(v), 9, col)); }
      txt(g, 'inițial', A.X(12) + 6, A.Y(6.32) - 20, 16, C.cream, { align: 'right' }); txt(g, 'după 3 săptămâni', A.X(12) + 6, A.Y(3.17) + 26, 16, '#ff8a8a', { align: 'right' });
      mol(g, 640, 780, '', 26, { col: K.ind }); txt(g, 'CBZ', 640, 830, 16, K.ind);
      arr(g, 680, 760, 760, 730, K.ind, 5); for (let k = 0; k < 3; k++) pac(g, 800 + k * 55, 730, 22, C.gq, t * 4 + k);
      arr(g, 820, 770, 680, 800, C.gq, 5); txt(g, 'își induce propria enzimă', 820, 870, 18, C.hi);
    },
  };
}

/* =================================================== CAZUL 3: SIMVASTATINĂ + CLARITROMICINĂ */
export function simva() {
  const f0 = bell(6.2), f1 = bell(9.6, 5.5, 0.8);
  return {
    home: HOME, anchors: [[40, 105], [40, 300], [520, 50], [520, 640]],
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 470, 250, b.i === 0);
      icon(g, 'pill', 120, 110, 0.8, { col: '#f2c14e' }); txt(g, 'simvastatină\ndoză maximă', 120, 200, 17, C.cream, { w: 700 });
      icon(g, 'pill', 360, 110, 0.8, { col: K.inh }); txt(g, 'claritromicină\n(infecție)', 360, 200, 17, C.cream, { w: 700 });
      box(g, 20, 300, 470, 610, b.i === 1);
      ell(g, 255, 470, 190, 140, '#f3c6a0', { ow: 6 });
      pac(g, 200, 470, 46, K.grey, 0); txt(g, 'CYP3A4', 200, 545, 19, C.gq);
      const r = new Path2D(); r.roundRect(240, 400, 64, 34, 8); paint(g, r, K.inh, null, null, [240, 400, 64, 34], OUT, 4); cross(g, 330, 420, 13, C.key);
      txt(g, 'inhibitor enzimatic', 340, 360, 17, '#d6b8ff');
      icon(g, 'muscle', 150, 720, 1.0); g.save(); g.strokeStyle = C.key; g.lineWidth = 6; g.lineJoin = 'round'; g.beginPath(); g.moveTo(240, 680); g.lineTo(215, 725); g.lineTo(245, 725); g.lineTo(220, 770); g.stroke(); g.restore();
      txt(g, 'toxicitate musculară', 370, 700, 18, C.key); txt(g, 'miopatie: miozită,\nrabdomioliză', 370, 760, 17, C.cream, { w: 700 });
      box(g, 510, 30, 470, 590, b.i === 2);
      txt(g, 'Drug + inhibitor enzimatic', 745, 70, 20, '#ff6b5e');
      gmini(g, 530, 100, 430, 400, f0, f1, '#ff6b5e');
      txt(g, 'metabolizată mai lent → Cp ↑', 745, 560, 19, C.cream);
      box(g, 510, 640, 470, 270, b.i === 3);
      txt(g, 'risc de toxicitate\nla doze terapeutice', 745, 710, 21, C.key);
      txt(g, '→ scăderea dozei\nsau evitarea asocierii (alternative)', 745, 820, 18, C.cream, { w: 700 });
    },
  };
}

/* =================================================== CAZUL 4: CLOPIDOGREL (PRO-DROG) + OMEPRAZOL (anim) */
export function prodrug2() {
  const LANE = [230, 690];
  return {
    home: HOME, anchors: [[60, LANE[0] - 80], [300, LANE[0] - 120], [300, LANE[1] - 125], [900, 470]],
    phase: (i) => ['clopidogrelul intră în ficat', 'CYP2C19 îl activează → efect', '+ omeprazol: activare ↓', 'se evită asocierea'][i] || '',
    draw(g, t, b) {
      bg(g);
      LANE.forEach((y, Ln) => {
        const blk = Ln === 1; const la = blk ? (b.i < 0 || b.i >= 2 ? 1 : 0.35) : 1;
        g.save(); g.globalAlpha = la;
        panel(g, 15, y - 200, 970, 420, {});
        txt(g, blk ? '+ omeprazol (inhibitor enzimatic)' : 'clopidogrel singur', 560, y - 165, 22, blk ? '#d6b8ff' : C.cream);
        ell(g, 300, y + 10, 140, 120, '#f3c6a0', { ow: 5 }); txt(g, 'ficatul', 300, y + 155, 18, C.cream);
        rbox(g, 450, y - 20, 300, 60, '#7a1f2c', 28, 5);
        pac(g, 310, y + 10, 44, blk ? K.grey : C.gq, blk ? 0 : t * 5); txt(g, 'CYP2C19', 310, y + 90, 19, blk ? C.dim : C.gq);
        if (blk) { rbox(g, 280, y - 64, 60, 32, K.inh, 8, 4); cross(g, 360, y - 50, 14, C.key); }
        // efectul
        const ok = !blk;
        ell(g, 860, y + 10, 70, 70, ok ? 'rgba(79,209,139,.25)' : 'rgba(255,107,94,.15)', { ow: 5, sc: ok ? C.gs : C.key });
        ell(g, 860, y + 10, 36, 36, ok ? 'rgba(79,209,139,.45)' : 'rgba(255,107,94,.25)', { ow: 4, sc: ok ? C.gs : C.key });
        txt(g, ok ? 'efect' : 'ineficacitate', 860, y + 120, 20, ok ? C.gs : C.key);
        let u;
        if (!blk) { u = b.i < 0 ? L(t, 7) * 3 : b.i === 0 ? prog(b, 0) : b.i === 1 ? 1 + 2 * prog(b, 1) : 3; }
        else { u = b.i < 0 ? L(t, 7) * 3 : b.i === 2 ? 3 * prog(b, 2) : b.i === 3 ? 3 : 0.05; }
        const x = u < 1 ? lerp(70, 250, ease(u)) : u < 1.5 ? 250 : lerp(250, 820, ease((u - 1.5) / 1.5));
        const active = !blk && u > 1.3;
        mol(g, x, y + 10, '', 24, { col: active ? K.drug : K.grey, glow: !blk && u > 1 && u < 1.6 ? 1 : 0 });
        txt(g, active ? 'metabolit\nactiv' : 'clopidogrel\n(inactiv)', x, y - 55, 16, active ? K.drug : C.cream, { w: 700 });
        if (!blk && u >= 2.9) check(g, 860, y + 10, 18, C.gs);
        g.restore();
      });
      if (b.i === 3 || b.i < 0) { pill(g, 560, 460, 340, 46, C.key, 'se evită asocierea', { size: 21 }); }
    },
  };
}

/* =================================================== EXCREȚIA: CĂILE */
export function excr() {
  return {
    home: HOME, anchors: [[40, 50], [340, 50], [640, 50], [40, 560], [520, 560]],
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 300, 500, b.i === 0);
      icon(g, 'kidney', 120, 200, 1.0); icon(g, 'kidney', 220, 200, 1.0); icon(g, 'bladder', 170, 360, 1.0);
      txt(g, 'URINĂ', 170, 450, 26, C.hi); txt(g, 'majoritatea', 170, 490, 18, C.cream, { w: 700 });
      box(g, 340, 30, 280, 500, b.i === 1);
      icon(g, 'gut', 480, 170, 1.1); txt(g, 'FECALE', 480, 300, 24, '#d0a070');
      txt(g, '1 · neabsorbite\ndin tractul GI', 480, 380, 17, C.cream, { w: 700 }); txt(g, '2 · eliminate direct\nîn fecale', 480, 465, 17, C.cream, { w: 700 });
      box(g, 640, 30, 340, 500, b.i === 2);
      liver(g, 760, 150, 0.9); icon(g, 'gut', 880, 200, 0.7);
      g.save(); g.strokeStyle = '#9be15d'; g.lineWidth = 6; g.beginPath(); g.moveTo(790, 180); g.quadraticCurveTo(840, 240, 870, 230); g.stroke(); g.restore();
      txt(g, 'BILĂ', 810, 300, 24, '#9be15d');
      txt(g, '1 · absorbite din tractul GI', 810, 355, 16, C.cream, { w: 700 }); txt(g, '2 · intră în circuitul\nenterohepatic', 810, 415, 16, C.cream, { w: 700 }); txt(g, '3 · eliminate în fecale', 810, 480, 16, C.cream, { w: 700 });
      box(g, 20, 550, 470, 360, b.i === 3);
      icon(g, 'bronchi', 255, 680, 1.4); txt(g, 'AER EXPIRAT', 255, 800, 24, '#9fd3f0'); txt(g, 'anestezicele inhalatorii\n(nivel pulmonar)', 255, 860, 17, C.cream, { w: 700 });
      box(g, 510, 550, 470, 360, b.i === 4);
      ['lapte', 'transpirație', 'salivă', 'lacrimi'].forEach((l, k) => { const x = 590 + k * 105; dot(g, x, 690, 24, ['#f4efe6', '#9fd3f0', '#c9a0e8', '#7fb3ff'][k], { ow: 4 }); txt(g, l, x, 760, 17, C.cream, { w: 700 }); });
      txt(g, 'alte căi', 745, 850, 22, C.hi);
    },
  };
}

/* =================================================== EXCREȚIA RENALĂ: CEI 3 PAȘI (anim) */
export function nephron() {
  const TY = 250, CY = 440;
  return {
    home: HOME, anchors: [[60, 120], [330, 120], [660, 120]],
    phase: (i) => ['1 · filtrarea glomerulară', '2 · secreția tubulară (proximal)', '3 · reabsorbția tubulară (distal)'][i] || '',
    draw(g, t, b) {
      bg(g);
      // glomerulul + capsula
      ell(g, 150, TY, 95, 95, 'rgba(243,207,138,.25)', { ow: 6, sc: C.memS }); ell(g, 150, TY, 60, 60, '#c93a4a', { ow: 5 });
      g.save(); g.strokeStyle = '#ff8a96'; g.lineWidth = 5; for (let k = 0; k < 4; k++) { g.beginPath(); g.arc(150 + (k % 2 ? 14 : -14), TY + (k < 2 ? -14 : 14), 18, 0, 6.3); g.stroke(); } g.restore();
      // tubul
      rbox(g, 235, TY - 40, 745, 80, 'rgba(255,236,200,.12)', 40, 5);
      dline(g, 600, TY - 60, 600, CY + 60, 'rgba(255,236,200,.35)', 3);
      txt(g, 'tub contort proximal', 420, TY - 70, 18, C.cream); txt(g, 'tub contort distal', 790, TY - 70, 18, C.cream);
      txt(g, 'urină →', 935, TY + 70, 17, '#f2d07a');
      // capilarul peritubular
      rbox(g, 235, CY - 35, 745, 70, '#7a1f2c', 34, 5); txt(g, 'capilar peritubular', 420, CY + 60, 17, '#ffc9cf');
      txt(g, '1 · filtrare glomerulară', 168, 110, 19, C.hi); txt(g, '2 · secreție tubulară', 420, 110, 19, C.hi); txt(g, '3 · reabsorbție tubulară', 790, 110, 19, C.hi);
      if (b.i >= 0) hiBox(g, [40, 250, 610][b.i], 80, [230, 350, 370][b.i], 440, true);
      // 1: filtrarea: capsulele intră din glomerul în tub
      if (live(b, 0)) for (let k = 0; k < 4; k++) { const u = L(t, 3.2, k / 4); const x = lerp(150, 560, u), y = TY + Math.sin(k * 2) * 18; caps(g, x, y, k % 2 ? POL : NPOL, 1 - u * 0.3, 0); }
      // 2: secreția: polare prin pompă (ATP), nepolare prin difuzie, din capilar în tub
      const p2 = live(b, 1);
      ell(g, 360, (TY + CY) / 2, 26, 26, '#5aa8ff', { ow: 4 }); txt(g, 'ATP', 360, (TY + CY) / 2, 13, OUT, { stroke: false });
      if (p2) { const u = L(t, 2.8); caps(g, 360, lerp(CY, TY, ease(u)), POL, 1, 1.57); const u2 = L(t, 2.8, 0.5); caps(g, 480, lerp(CY, TY, ease(u2)), NPOL, 1, 1.57); }
      else { caps(g, 360, CY, POL, 0.5, 1.57); caps(g, 480, CY, NPOL, 0.5, 1.57); }
      // 3: reabsorbția: în distal concentrația e mare; nepolarele coboară în capilar, polarele merg spre urină
      for (let k = 0; k < 6; k++) caps(g, 640 + k * 50, TY + (k % 2 ? 14 : -14), k % 2 ? POL : NPOL, b.i === 2 || b.i < 0 ? 1 : 0.5, 0);
      if (live(b, 2)) { const u = L(t, 2.8); caps(g, 700, lerp(TY, CY, ease(u)), NPOL, 1, 1.57); caps(g, 840, lerp(TY, CY, ease(L(t, 2.8, 0.5))), NPOL, 1, 1.57); const v = L(t, 3); caps(g, lerp(700, 960, v), TY + 20, POL, 1 - v * 0.5, 0); }
      // legenda
      panel(g, 20, 560, 470, 350, {}); panel(g, 510, 560, 470, 350, {});
      caps(g, 70, 610, POL, 1, 0); txt(g, 'polare, hidrofile', 100, 610, 20, POL, { align: 'left' });
      txt(g, '2 · secreție activă', 255, 690, 19, C.cream, { w: 700 }); txt(g, '3 · rămân în urină', 255, 760, 19, C.cream, { w: 700 });
      caps(g, 560, 610, NPOL, 1, 0); txt(g, 'nepolare, lipofile', 590, 610, 20, '#d9b48e', { align: 'left' });
      txt(g, '2 · difuzie pasivă', 745, 690, 19, C.cream, { w: 700 }); txt(g, '3 · trec înapoi în circulația\nperitubulară (difuzie pasivă)', 745, 775, 19, C.cream, { w: 700 });
      txt(g, 'în distal: concentrația din urină > cea din capilar', 500, 880, 17, C.dim, { w: 700, maxW: 940 });
    },
  };
}

/* =================================================== pH-UL URINAR (anim) */
export function urineph() {
  const PAN = [[20, 'acid slab · urină alcalină (pH > pKa)', '#3d5a3a', 'HA', 'A⁻', '↓ H⁺'], [510, 'bază slabă · urină acidă (pH < pKa)', '#5a3e22', 'B', 'BH⁺', '↑ H⁺']];
  const WY = 470;
  const bounce = (u, y0, ym) => (u < 0.5 ? lerp(y0, ym, ease(u * 2)) : lerp(ym, y0, ease((u - 0.5) * 2)));
  return {
    home: HOME, anchors: [[36, 745], [40, 120], [530, 120], [500, 650]],
    phase: (i) => ['neionizat trece · ionizat rămâne', 'acid slab în urină alcalină', 'bază slabă în urină acidă', 'ionizat → eliminat'][i] || '',
    draw(g, t, b) {
      bg(g);
      PAN.forEach(([x0, h, col, n, ion, hh], p) => {
        const on = b.i === p + 1; const lv = b.i < 0 || on || b.i === 0 || b.i === 3; const a = lv ? 1 : 0.4;
        hiBox(g, x0, 60, 470, 660, on);
        g.save(); g.globalAlpha = a;
        rbox(g, x0, 60, 470, WY - 90, col, 22, 5); txt(g, h, x0 + 235, 95, 18, C.cream, { maxW: 450 });
        txt(g, 'urină (lumenul tubului)', x0 + 235, 130, 15, C.dim, { w: 700 });
        membrane(g, x0, x0 + 470, WY, { h: 60 });
        rbox(g, x0, WY + 30, 470, 190, '#7a1f2c', 22, 5); txt(g, 'sânge (peritubular)', x0 + 235, WY + 190, 16, '#ffc9cf');
        // transformarea: neionizat → ionizat cu H⁺ (pleacă sau vine)
        const uc = on ? clamp(b.bt / (b.bd * 0.6)) : b.i === 3 || b.i < 0 ? 1 : 0;
        for (let k = 0; k < 3; k++) {
          const x = x0 + 90 + k * 140; const conv = clamp(uc * 3 - k);
          const ub = L(t, 3, k / 3); const y = conv >= 1 ? bounce(ub, 230, WY - 48) : 230;
          mol(g, x, y, conv >= 1 ? ion : n, 28, { col: conv >= 1 ? K.ion : K.neu });
          if (conv > 0 && conv < 1) dot(g, x + 30, p ? lerp(150, 205, conv) : lerp(205, 150, conv), 9, C.hi);
        }
        if (uc >= 1) { cross(g, x0 + 160, WY, 14, C.key); cross(g, x0 + 300, WY, 14, C.key); }
        txt(g, hh, x0 + 420, 230, 22, C.hi);
        g.restore();
      });
      // regula (neionizat trece)
      box(g, 20, 740, 470, 170, b.i === 0);
      mol(g, 90, 790, 'HA', 24); arr(g, 120, 790, 190, 790, C.gs, 5); txt(g, 'neionizat = mai lipofil → trece înapoi', 350, 790, 15, C.gs, { w: 700, maxW: 240 });
      mol(g, 90, 860, 'A⁻', 24, { col: K.ion }); cross(g, 155, 860, 12, C.key); txt(g, 'ionizat = mai hidrofil → rămâne', 350, 860, 15, '#bcd6ff', { w: 700, maxW: 240 });
      if (b.i === 0 || b.i < 0) { const u = L(t, 3); mol(g, 255, lerp(230, WY + 130, ease(u)), 'HA', 24); }
      box(g, 510, 740, 470, 170, b.i === 3);
      txt(g, 'forma ionizată nu se reabsoarbe', 745, 790, 19, C.cream, { w: 700 }); txt(g, '→ rămâne în urină → se elimină', 745, 850, 20, C.hi);
    },
  };
}

/* =================================================== CAZUL 5: FENOBARBITAL */
export function pheno() {
  return {
    home: HOME, anchors: [[40, 100], [520, 50], [40, 470], [520, 470]],
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 470, 420, b.i === 0);
      g.save(); g.translate(255, 210); g.rotate(-Math.PI / 2); g.restore();
      const bod = new Path2D(); bod.roundRect(90, 230, 300, 70, 34); paint(g, bod, '#5a3a32', null, null, [90, 230, 300, 70], OUT, 5); ell(g, 80, 265, 38, 34, '#5a3a32', { ow: 5 });
      txt(g, 'z z', 120, 200, 24, C.dim);
      for (let k = 0; k < 3; k++) { const x = 190 + k * 80; rbox(g, x - 30, 340, 60, 40, '#cfd6e0', 6, 3); for (let j = 0; j < 4; j++) ell(g, x - 18 + (j % 2) * 36 - 0, 352 + Math.floor(j / 2) * 16, 7, 5, 'rgba(60,60,80,.5)', { ow: 1.5 }); }
      txt(g, 'inconștient · blistere goale', 255, 420, 18, C.cream, { w: 700 });
      txt(g, 'fenobarbital', 255, 90, 22, C.hi);
      box(g, 510, 30, 470, 420, b.i === 1);
      [['caracter slab acid', 'HA'], ['excretat la nivel renal', 'kid'], ['reabsorbit tubular', 'reab']].forEach(([l, ic], k) => { const y = 110 + k * 115; if (ic === 'HA') mol(g, 580, y, 'HA', 26); if (ic === 'kid') icon(g, 'kidney', 580, y, 0.55); if (ic === 'reab') { arr(g, 580, y - 30, 580, y + 30, C.gs, 5); } txt(g, l, 630, y, 20, C.cream, { align: 'left', w: 700 }); });
      txt(g, '+ cărbune activat (doze multiple)', 745, 420, 16, C.dim, { w: 700 });
      box(g, 20, 470, 470, 440, b.i === 2);
      rbox(g, 90, 540, 120, 150, '#f4efe6', 14, 5); txt(g, 'NaHCO₃', 150, 615, 20, OUT, { stroke: false });
      arr(g, 230, 615, 310, 615, C.cream, 6); rbox(g, 330, 560, 120, 120, '#3d5a3a', 14, 5); txt(g, 'pH ↑', 390, 620, 24, C.gs);
      txt(g, 'bicarbonat de sodiu', 150, 730, 18, C.cream, { w: 700 }); txt(g, 'alcalinizarea urinii', 390, 730, 18, C.gs);
      box(g, 510, 470, 470, 440, b.i === 3);
      membrane(g, 530, 960, 690, { h: 54 }); txt(g, 'urină alcalină', 745, 520, 17, C.dim, { w: 700 });
      for (let k = 0; k < 3; k++) mol(g, 620 + k * 120, 600, 'A⁻', 26, { col: K.ion }); cross(g, 680, 690, 13, C.key); cross(g, 800, 690, 13, C.key);
      txt(g, 'ionizat → nu se reabsoarbe', 745, 790, 20, C.cream); txt(g, 'eliminare ↑', 745, 850, 24, C.hi);
    },
  };
}

/* =================================================== CINETICA: ORDINUL I vs ORDINUL 0 (anim) */
export function orders2() {
  const f1 = (x) => 100 * Math.pow(0.5, x), f0 = (x) => Math.max(0, 100 - 25 * x);
  return {
    home: HOME, anchors: [[60, 80], [550, 80], [60, 880]],
    phase: (i) => ['ordinul I: 50% pe oră', 'ordinul 0: 25 mg/L pe oră', 'timpul de înjumătățire'][i] || '',
    draw(g, t, b) {
      bg(g);
      [[20, f1, 'Cinetică de ordinul I', 'eliminat: 50% pe oră', 0], [510, f0, 'Cinetică de ordinul 0', 'eliminat: 25 mg/L pe oră', 1]].forEach(([x0, f, h, s, k]) => {
        const on = b.i === k; const lv = b.i < 0 || on || b.i === 2; const a = lv ? 1 : 0.45;
        hiBox(g, x0, 40, 470, 790, on);
        g.save(); g.globalAlpha = a;
        txt(g, h, x0 + 235, 80, 23, C.hi); txt(g, 'Cp inițial = 100 mg/L', x0 + 235, 115, 17, C.dim, { w: 700 });
        const A = axes(g, x0 + 10, 140, 450, 470, { xmax: 5, ymax: 105, xt: [0, 1, 2, 3, 4, 5], yt: [25, 50, 75, 100], xl: 'timp (h)', yl: 'mg/L', fs: 15 });
        plot(g, A, f, 0, 5, { col: k ? K.ion : K.drug, w: 6 });
        const u = on ? (b.i < 0 ? 1 : clamp(b.bt / (b.bd * 0.85))) : 1; const xNow = 4 * u;
        for (let s2 = 0; s2 < 4; s2++) { const xa = s2, xb = s2 + 1; if (xb > xNow + 0.01) break; const ya = f(xa), yb = f(xb); arr(g, A.X(xb) + 12, A.Y(ya), A.X(xb) + 12, A.Y(yb) + 4, C.hi, 5); txt(g, String(+(ya - yb).toFixed(2)).replace('.', ','), A.X(xb) + 38, A.Y((ya + yb) / 2), 15, C.hi, { align: 'left' }); }
        // T½
        if (b.i === 2 || b.i < 0) {
          const TH = k ? [[0, 2, '2 h'], [2, 3, '1 h'], [3, 3.5, '0,5 h']] : [[0, 1, '1 h'], [1, 2, '1 h'], [2, 3, '1 h']];
          TH.forEach(([xa, xb, l], j) => { const ya = f(xa), yb = f(xb); dline(g, A.X(xa), A.Y(yb), A.X(xb), A.Y(yb), '#d6b8ff', 3); txt(g, `t½ = ${l}`, A.X(xb) + 8, A.Y(yb) - 14 - j * 2, 15, '#d6b8ff', { align: 'left' }); void ya; });
        }
        g.restore();
        const P = k ? ['liniară', 'cantitate eliminată constantă', 'rata de eliminare variază', 't½ variază'] : ['neliniară, exponențială', 'cantitatea ∝ Cp', 'rata de eliminare constantă', 't½ constant'];
        P.forEach((l, j) => txt(g, l, x0 + 235, 660 + j * 40, 18, j === 3 ? C.hi : C.cream, { w: 700, alpha: a }));
      });
      box(g, 20, 845, 960, 70, b.i === 2);
      txt(g, 't½ = timpul în care concentrația plasmatică se reduce la jumătate', 500, 880, 20, C.cream, { maxW: 920 });
    },
  };
}

/* =================================================== CAZUL 6: T½ = 3 h, PRIZE, RETARD */
export function c6() {
  const f = (h) => (h < 1 ? 10 * h : 10 * Math.pow(0.5, (h - 1) / 3));
  const OPT = ['A. 6–8 h', 'B. 10–14 h', 'C. 5–7 h', 'D. 15–21 h', 'E. 14–16 h'];
  return {
    home: HOME, anchors: [[300, 95], [700, 60], [60, 640], [40, 820], [530, 820]],
    draw(g, t, b) {
      bg(g);
      const A = axes(g, 20, 40, 660, 560, { xmax: 22, ymax: 11, xt: [0, 1, 4, 7, 10, 13, 16, 19, 22], yt: [5, 10], xl: 'ore', yl: 'ng/mL', fs: 15 });
      const pb = b.i === 1 || b.i < 0;
      if (pb) { g.save(); g.fillStyle = 'rgba(79,209,139,.2)'; g.fillRect(A.X(15), A.y0, A.X(21) - A.X(15), A.y1 - A.y0); g.restore(); txt(g, '5–7 × T½', A.X(18), A.Y(8), 19, C.gs); }
      plot(g, A, f, 0, 22, { col: K.drug, w: 6 });
      dot(g, A.X(1), A.Y(10), 11, C.hi); dot(g, A.X(4), A.Y(5), 11, C.hi);
      txt(g, '10 ng/mL la 1 h', A.X(1) + 26, A.Y(10) - 4, 18, C.hi, { align: 'left' }); txt(g, '5 ng/mL la 4 h', A.X(4) + 26, A.Y(5) - 4, 18, C.hi, { align: 'left' });
      g.save(); g.strokeStyle = C.hi; g.lineWidth = 3; g.beginPath(); g.moveTo(A.X(1), A.Y(1.2)); g.lineTo(A.X(4), A.Y(1.2)); g.moveTo(A.X(1), A.Y(0.6)); g.lineTo(A.X(1), A.Y(1.8)); g.moveTo(A.X(4), A.Y(0.6)); g.lineTo(A.X(4), A.Y(1.8)); g.stroke(); g.restore(); txt(g, 'T½ = 3 h', A.X(2.5), A.Y(2.4), 18, C.hi);
      box(g, 700, 40, 280, 560, b.i === 1);
      txt(g, 'practic eliminat\ndupă:', 840, 100, 20, C.cream);
      OPT.forEach((o, k) => { const y = 200 + k * 85; const right = k === 3 && (b.i === 1 || b.i < 0); pill(g, 840, y, 220, 64, right ? C.gs : 'rgba(255,236,200,.15)', o, { size: 22, col: right ? OUT : C.cream }); });
      // 24 h: 8 prize
      box(g, 20, 620, 960, 170, b.i === 2);
      txt(g, '24 h : 3 h = 8 prize / zi (interval = 1 T½)', 500, 655, 20, C.hi);
      g.save(); g.strokeStyle = C.cream; g.lineWidth = 4; g.beginPath(); g.moveTo(80, 730); g.lineTo(920, 730); g.stroke(); g.restore();
      for (let k = 0; k < 8; k++) { const x = 80 + k * 105; icon(g, 'pill', x + 50, 715, 0.32); txt(g, `${k * 3} h`, x, 765, 14, C.dim, { w: 700 }); }
      box(g, 20, 805, 470, 105, b.i === 3); txt(g, 'T½ lung → administrări mai rare', 255, 858, 19, C.cream);
      box(g, 510, 805, 470, 105, b.i === 4); icon(g, 'pill', 590, 858, 0.6, { col: K.ind }); txt(g, 'formă retard /\neliberare prelungită', 790, 858, 18, C.cream, { w: 700 });
    },
  };
}

/* =================================================== CAZUL 7: TABELUL, Ke, T½ (partea 1) · PROTEINE, RINICHI (partea 2) */
export function c7({ spec }) {
  const part = spec.sceneOpts.part; const T = [0, 1, 2, 5, 6, 9, 12], V = [100, 70, 50, 35, 25, 12.5, 6.25];
  if (part === 2) return {
    home: HOME, anchors: [[40, 50], [40, 480], [520, 480]],
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 960, 420, b.i === 0);
      ell(g, 250, 230, 120, 76, '#ffe08a', { ow: 5 }); txt(g, 'proteine plasmatice', 250, 230, 17, OUT, { stroke: false });
      [0.3, 1.5, 2.7, 3.9, 5.1].forEach((a) => mol(g, 250 + Math.cos(a) * 120, 230 + Math.sin(a) * 76, '', 14));
      txt(g, 'legarea de proteine', 650, 170, 22, C.cream); txt(g, '→ T½ crește', 650, 240, 30, C.hi);
      box(g, 20, 470, 470, 440, b.i === 1);
      kidney(g, 150, 650, 1.6); txt(g, 'insuficiență renală', 330, 580, 19, C.key, { maxW: 280 });
      for (let k = 0; k < 2; k++) dot(g, 300 + k * 40, 700, 9, K.drug); txt(g, 'eliminare renală ↓', 330, 790, 20, C.cream);
      box(g, 510, 470, 470, 440, b.i === 2);
      pill(g, 640, 620, 170, 80, C.gi, 'Cl ↓', { size: 34 }); pill(g, 850, 620, 170, 80, C.key, 'T½ ↑', { size: 34 });
      txt(g, 'clearance-ul scade,\ntimpul de înjumătățire crește', 745, 790, 19, C.cream, { w: 700 });
    },
  };
  return {
    home: HOME, anchors: [[700, 50], [300, 330], [40, 650], [120, 300], [520, 650]],
    draw(g, t, b) {
      bg(g);
      const A = axes(g, 20, 40, 660, 560, { xmax: 13, ymax: 105, xt: [0, 1, 2, 5, 6, 9, 12], yt: [25, 50, 75, 100], xl: 'ore', yl: 'µg/mL', fs: 15 });
      g.save(); g.strokeStyle = K.drug; g.lineWidth = 5; g.lineJoin = 'round'; g.beginPath(); T.forEach((h, k) => (k ? g.lineTo(A.X(h), A.Y(V[k])) : g.moveTo(A.X(h), A.Y(V[k])))); g.stroke(); g.restore();
      T.forEach((h, k) => dot(g, A.X(h), A.Y(V[k]), 9, C.hi));
      if (b.i === 1 || b.i < 0) { dline(g, A.X(0), A.Y(100), A.X(12), A.Y(0), C.dim, 3); txt(g, 'nu scade liniar', A.X(8), A.Y(55), 19, C.cream); }
      if (b.i === 3 || b.i < 0) { glowRing(g, A.X(1), A.Y(70), 70, 60, 0, 1, '#d6b8ff', 4); txt(g, '2 ore? (distribuție)', A.X(2.6), A.Y(85), 17, '#d6b8ff', { align: 'left' }); }
      if (b.i === 4 || b.i < 0) { glowRing(g, A.X(7.5), A.Y(19), 90, 40, -0.3, 1, C.gs, 4); }
      box(g, 700, 30, 280, 570, b.i === 0);
      txt(g, 'Cp (µg/mL)', 780, 70, 17, C.hi); txt(g, 'timp (h)', 910, 70, 17, C.hi);
      T.forEach((h, k) => { const y = 120 + k * 64; txt(g, String(V[k]).replace('.', ','), 780, y, 24, k >= 4 ? C.gs : C.cream); txt(g, String(h), 910, y, 24, C.cream); });
      box(g, 20, 620, 470, 290, b.i === 2);
      txt(g, 'practic completă', 255, 680, 22, C.hi); txt(g, 'după 5–7 × T½', 255, 745, 30, C.cream); txt(g, 'eliminarea depinde de T½', 255, 820, 17, C.dim, { w: 700 });
      box(g, 510, 620, 470, 290, b.i === 4);
      txt(g, 'c = c0 · e^(−Ke·Δt)', 745, 660, 18, C.dim, { w: 700 });
      txt(g, 'Ke = (ln 25 − ln 12,5) : (9 − 6)', 745, 710, 19, C.cream, { w: 700 });
      txt(g, 'Ke = (3,21 − 2,52) : 3 = 0,23', 745, 760, 19, C.cream, { w: 700 });
      txt(g, 'T½ = 0,693 / Ke = 0,693 / 0,23 = 3 h', 745, 830, 20, C.hi, { maxW: 450 });
    },
  };
}
