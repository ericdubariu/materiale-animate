// Scenele pentru intro + Partea A (ADME) + Partea B (absorbția): coperta, harta, formatul OSPE, drumul prin corp,
// fereastra terapeutică, locurile-cheie, distribuția, captarea ionică, tubul digestiv.
import { W, H, HOME, cam, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, st, u01, loopT, txt, pill, dot, ell, arr, lead, cross, check, tube, curve, at, flow,
  membrane, icon, heart, paint, blob, bb, glowRing } from './fk.js';
import { K, hiBox, mol, pac, axes, plot, liver, kidney, stomach } from './fx.js';

/* =================================================== COPERTA */
export function cover() {
  const R = [[40, 50], [520, 50], [40, 490], [520, 490]];
  const T = ['drumul ADME', 'absorbția: pH-ul', 'metabolizarea: CYP', 'eliminarea: T½'];
  return {
    home: HOME, anchors: R.map(([x, y]) => [x + 30, y + 30]),
    draw(g, t, b) {
      bg(g);
      R.forEach(([x, y], i) => {
        const act = b.i === i || (b.i < 0 && Math.floor(t / 2.4) % 4 === i);
        panel(g, x, y, 440, 400, { fill: act ? 'rgba(255,207,133,.13)' : 'rgba(255,236,200,.06)', stroke: act ? C.hi : 'rgba(255,225,180,.2)', lw: act ? 5 : 3 });
        txt(g, T[i], x + 220, y + 360, 26, C.cream);
        const cx = x + 220, cy = y + 175;
        if (i === 0) {
          const L = ['A', 'D', 'M', 'E']; L.forEach((l, j) => { pill(g, x + 70 + j * 100, cy - 40, 74, 74, K.stage[j], l, { size: 34, r: 37 }); if (j < 3) arr(g, x + 108 + j * 100, cy - 40, x + 132 + j * 100, cy - 40, C.cream, 5); });
          icon(g, 'stomach', x + 90, cy + 90, 0.8); liver(g, x + 210, cy + 90, 0.7); kidney(g, x + 340, cy + 90, 0.65);
        }
        if (i === 1) {
          membrane(g, x + 30, x + 410, cy + 10, { h: 46 });
          mol(g, cx - 90, cy - 80, 'HA'); mol(g, cx - 90, cy + 90, 'A⁻'); arr(g, cx - 90, cy - 50, cx - 90, cy + 55, C.gs, 6);
          mol(g, cx + 90, cy - 80, 'A⁻'); cross(g, cx + 90, cy + 10, 20, C.key); txt(g, 'ionizat = captiv', cx + 90, cy + 100, 20, C.cream, { w: 700 });
        }
        if (i === 2) {
          pac(g, cx - 90, cy - 20, 40, C.gq, t * 4); pac(g, cx - 20, cy + 40, 40, C.gq, t * 4 + 1); pac(g, cx - 120, cy + 70, 40, C.gq, t * 4 + 2);
          txt(g, 'inductor', cx - 80, cy - 105, 22, C.gs);
          pac(g, cx + 110, cy + 10, 40, '#8b8090', 0); ell(g, cx + 110, cy - 40, 26, 18, C.atr, { ow: 4 }); cross(g, cx + 150, cy - 40, 13, C.key);
          txt(g, 'inhibitor', cx + 110, cy - 105, 22, C.atr);
        }
        if (i === 3) {
          const A = axes(g, x + 50, y + 50, 340, 250, { xmax: 15, ymax: 10, noTicks: true });
          plot(g, A, (h) => 10 * Math.pow(0.5, h / 3), 0, 15, { col: K.drug, w: 6 });
          [0, 3, 6, 9].forEach((h) => dot(g, A.X(h), A.Y(10 * Math.pow(0.5, h / 3)), 8, C.hi, { ow: 3 }));
        }
      });
    },
  };
}

/* =================================================== HARTA */
export function harta() {
  const X = [130, 375, 625, 870];
  const L = [['A', 'Absorbție'], ['D', 'Distribuție'], ['M', 'Metabolizare'], ['E', 'Eliminare']];
  const CASES = [[['Caz 1', 'peptid per os'], ['Caz 2', 'acid + antiacid']], [['fără caz', 'legarea de proteine']], [['Caz 3', 'inductor + COC'], ['Caz 4', 'pro-drog +\ninhibitor']], [['Caz 5', 'T½ din 2 valori']]];
  return {
    home: HOME, anchors: X.map((x) => [x - 70, 110]),
    draw(g, t, b) {
      bg(g);
      X.forEach((x, j) => {
        const on = b.i === j; const a = b.i < 0 || on ? 1 : 0.5;
        hiBox(g, x - 112, 60, 224, 840, on);
        pill(g, x, 170, 140, 140, K.stage[j], L[j][0], { size: 70, r: 70, alpha: a, glow: on ? 1 : 0 });
        txt(g, L[j][1], x, 285, 24, C.cream, { alpha: a });
        if (j < 3) arr(g, x + 78, 170, X[j + 1] - 78, 170, C.cream, 6, 0.8);
        CASES[j].forEach(([h, d], k) => {
          const y = 360 + k * 260; const dim = h === 'fără caz';
          panel(g, x - 105, y, 210, 220, { fill: dim ? 'rgba(255,236,200,.03)' : 'rgba(255,207,133,.1)', stroke: dim ? 'rgba(255,225,180,.15)' : K.stage[j], lw: 4, alpha: a });
          txt(g, h, x, y + 45, 26, dim ? C.dim : C.hi, { alpha: a });
          txt(g, d, x, y + 120, 20, C.cream, { alpha: a, w: 700, maxW: 195 });
          if (j === 0) icon(g, k === 0 ? 'stomach' : 'bronchi', x, y + 180, 0.45, { alpha: a });
          if (j === 2) pac(g, x, y + 180, 22, k === 0 ? C.gq : '#8b8090', t * 4, a);
          if (j === 3) { g.save(); g.globalAlpha = a; const A = axes(g, x - 70, y + 150, 140, 55, { xmax: 9, ymax: 10, noTicks: true, thin: true }); plot(g, A, (h) => 10 * Math.pow(0.5, h / 3), 0, 9, { col: K.drug, w: 4 }); g.restore(); }
        });
      });
    },
  };
}

/* =================================================== FORMATUL OSPE */
export function ospe() {
  const X0 = 80, PX = 120, Y = 230;
  const SEG = [[0, 1, '#6d6178', 'citești'], [1, 1.5, '#a88a5a', 'ciornă'], [1.5, 4.5, '#C27A10', 'vorbești: scriptul'], [4.5, 7, '#4a3d58', 'completezi']];
  const ST = [['Identificarea', 'ce observ\n+ când'], ['Descrierea', 'etapa ADME\n+ mecanismul'], ['Aplicarea', 'consecința\n+ recomandarea'], ['Comparația', 'alt caz +\nconcluzia']];
  return {
    home: HOME, anchors: ST.map((_, i) => [140 + i * 240, 585]),
    phase: (i) => ['0:00–0:30', '0:30–1:45', '1:45–2:15', '2:15–2:45'][i] || '',
    draw(g, t, b) {
      bg(g);
      txt(g, 'stația: 7 minute', 500, 90, 30, C.cream);
      SEG.forEach(([a, c, col, l]) => { const p = new Path2D(); p.roundRect(X0 + a * PX + 2, Y - 34, (c - a) * PX - 4, 68, 12); g.save(); g.fillStyle = col; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(p); g.restore(); txt(g, l, X0 + (a + c) / 2 * PX, Y, c - a < 1 ? 16 : 20, '#fff', { maxW: (c - a) * PX - 10 }); });
      for (let m = 0; m <= 7; m++) txt(g, `${m}`, X0 + m * PX, Y + 62, 20, C.dim, { w: 700 });
      txt(g, 'minute', X0 + 7 * PX + 30, Y + 92, 16, C.dim, { w: 600 });
      g.save(); g.strokeStyle = C.key; g.lineWidth = 4; g.setLineDash([8, 6]); g.beginPath(); g.moveTo(X0 + 6 * PX, Y - 60); g.lineTo(X0 + 6 * PX, Y + 40); g.stroke(); g.restore();
      txt(g, '„mai e 1 minut” → concluzia', X0 + 6 * PX - 60, Y - 82, 19, C.key);
      const hand = REDUCED ? 3 : (t * 0.6) % 7; dot(g, X0 + hand * PX, Y - 44, 9, '#fff');
      ST.forEach(([h, s], i) => {
        const x = 140 + i * 240; const act = b.i === i;
        const hh = act ? 280 : 250; const p = new Path2D(); p.roundRect(x - 105, 880 - hh, 210, hh, 18);
        g.save(); g.fillStyle = ['#7d5a1a', '#9c6c14', '#C27A10', '#d9952e'][i]; if (act) { g.shadowColor = C.hi; g.shadowBlur = 24; } g.fill(p); g.shadowBlur = 0; g.strokeStyle = act ? C.hi : OUT; g.lineWidth = act ? 6 : 5; g.stroke(p); g.restore();
        txt(g, String(i + 1), x, 880 - hh + 50, 44, '#fff');
        txt(g, h, x, 880 - hh + 110, 22, '#fff', { maxW: 200 });
        txt(g, s, x, 880 - hh + 175, 18, '#fff3e0', { w: 600, maxW: 200 });
      });
      txt(g, '„Observ că… se explică prin… duce la… recomand…”', 500, 920, 18, C.dim, { w: 700 });
    },
  };
}

/* =================================================== ADME: DRUMUL PRIN CORP (anim) */
export function body() {
  // trasee (coordonate în scenă); ficatul în stânga imaginii (= dreapta pacientului)
  const GI = curve([[500, 105], [500, 190], [505, 270], [470, 330], [440, 370], [470, 410], [520, 440]]);
  const GUT = curve([[520, 455], [600, 470], [600, 505], [430, 515], [420, 550], [600, 560], [590, 600], [470, 605]]);
  const PORT = curve([[520, 520], [440, 470], [380, 410], [330, 360]]);
  const HEP = curve([[330, 330], [400, 280], [470, 245], [520, 235]]);
  const ART = curve([[560, 245], [650, 250], [720, 300], [790, 360], [840, 420]]);
  const REN = curve([[560, 270], [640, 330], [690, 400], [700, 440]]);
  const URE = curve([[690, 500], [660, 620], [580, 700], [530, 730]]);
  const LIVER = [330, 330], KID = [700, 470], TIS = [850, 440], GUTC = [520, 530], HEART = [540, 240];
  return {
    home: HOME, anchors: [[GUTC[0] + 110, GUTC[1] - 20], [TIS[0] + 30, TIS[1] - 120], [LIVER[0] - 110, LIVER[1] - 90], [KID[0] - 55, KID[1] - 50], [770, 640]],
    phase: (i) => ['A · absorbția', 'D · distribuția', 'M · metabolizarea', 'E · excreția', 'parametrii'][i] || 'tot drumul',
    draw(g, t, b) {
      bg(g);
      // silueta
      g.save(); g.globalAlpha = 0.9;
      ell(g, 500, 70, 62, 70, '#3d2e22', { ow: 6 });
      const bod = new Path2D(); bod.moveTo(330, 160); bod.quadraticCurveTo(500, 130, 670, 160); bod.lineTo(720, 200); bod.lineTo(900, 380); bod.lineTo(930, 470); bod.lineTo(880, 480); bod.lineTo(760, 330); bod.lineTo(720, 560); bod.lineTo(700, 820); bod.lineTo(300, 820); bod.lineTo(280, 560); bod.lineTo(240, 330); bod.lineTo(120, 480); bod.lineTo(70, 470); bod.lineTo(100, 380); bod.lineTo(280, 200); bod.closePath();
      paint(g, bod, '#3d2e22', null, null, [70, 130, 860, 690], OUT, 6);
      g.restore();
      const on = (k) => b.i === k; const lit = (k) => b.i < 0 || b.i === k || b.i === 4;
      // vase și tub
      tube(g, GI, 22, '#f0a6a0', { raw: true, glow: on(0) ? 0.6 : 0 });
      tube(g, GUT, 26, '#f0a6a0', { raw: true, glow: on(0) ? 0.6 : 0 });
      tube(g, PORT, 14, '#7c4ad8', { raw: true, glow: on(2) ? 0.6 : 0 });
      tube(g, HEP, 14, '#5b6be0', { raw: true });
      tube(g, ART, 14, C.blood, { raw: true, glow: on(1) ? 0.6 : 0 });
      tube(g, REN, 12, C.blood, { raw: true, glow: on(3) ? 0.5 : 0 });
      tube(g, URE, 10, '#f2d07a', { raw: true, glow: on(3) ? 0.5 : 0 });
      liver(g, LIVER[0] - 30, LIVER[1] - 10, 1.25, { glow: on(2) });
      kidney(g, KID[0], KID[1], 0.75, { glow: on(3) });
      heart(g, HEART[0], HEART[1], 0.48, Math.max(0, Math.sin(t * 6)) * 0.6);
      // vezica
      const fillU = b.i === 3 ? clamp(b.bt / (b.bd * 0.9)) : b.i < 0 ? 0.6 : 0.15;
      const bl = new Path2D(); bl.ellipse(500, 760, 70, 48, 0, 0, 7); paint(g, bl, '#5a4630', null, null, [430, 712, 140, 96], OUT, 5);
      g.save(); g.clip(bl); g.fillStyle = '#f2d07a'; g.fillRect(430, 808 - 96 * fillU, 140, 96 * fillU); g.restore(); g.save(); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(bl); g.restore();
      // țesutul (mușchiul brațului drept)
      const ms = new Path2D(); ms.roundRect(800, 400, 110, 70, 26); paint(g, ms, '#d9535f', '#b03a46', '#ff9aa5', [800, 400, 110, 70], OUT, 5);
      if (on(1)) glowRing(g, 855, 435, 80, 55, 0, 1, C.hi, 5);
      // pastila pe esofag
      if (lit(0)) { const u = u01(b, t, 0.5, 6); const [px, py] = at(GI, clamp(u * 1.2)); const pp = new Path2D(); pp.roundRect(px - 22, py - 11, 44, 22, 11); paint(g, pp, K.drug, null, '#fff', [px - 22, py - 11, 44, 22], OUT, 4); }
      // molecule
      if (lit(0)) flow(g, GUT, t, K.drug, 6, 0.18, 8);
      if (lit(0) || lit(2)) flow(g, PORT, t, K.drug, 4, 0.3, 8);
      if (lit(2)) flow(g, HEP, t, K.met, 4, 0.3, 8);
      if (lit(1)) { flow(g, ART, t, K.drug, 5, 0.3, 8); for (let k = 0; k < 3; k++) { const u = (t * 0.5 + k / 3) % 1; dot(g, 830 + k * 25, 470 + u * 50, 7, K.drug, { alpha: 1 - u }); } }
      if (lit(3)) { flow(g, REN, t, K.met, 4, 0.3, 8); flow(g, REN, t + 0.9, K.drug, 3, 0.3, 8); flow(g, URE, t, K.met, 4, 0.25, 7); flow(g, URE, t + 0.7, K.drug, 3, 0.25, 7); }
      txt(g, 'stomac', 380, 395, 18, C.cream); txt(g, 'intestin', 660, 600, 18, C.cream);
      txt(g, 'ficat', LIVER[0] - 60, LIVER[1] + 70, 20, C.cream); txt(g, 'vena portă', 400, 490, 17, '#c7b1ff');
      txt(g, 'inimă', HEART[0] + 60, HEART[1] - 50, 18, C.cream); txt(g, 'țesut', 855, 380, 18, C.cream);
      txt(g, 'rinichi', KID[0] + 70, KID[1] + 40, 18, C.cream); txt(g, 'vezica (urina)', 500, 840, 18, C.cream);
      // parametrii farmacocinetici
      panel(g, 745, 600, 245, 310, { stroke: on(4) ? C.hi : 'rgba(255,225,180,.2)', lw: on(4) ? 5 : 3 });
      txt(g, 'primari', 867, 630, 17, C.dim, { w: 700 });
      ['Bd (F)', 'Vd', 'Cp', 'Cl'].forEach((l, j) => pill(g, 810 + (j % 2) * 115, 675 + Math.floor(j / 2) * 62, 100, 48, K.stage[j], l, { size: 20 }));
      txt(g, 'secundar', 867, 800, 17, C.dim, { w: 700 });
      pill(g, 867, 845, 200, 48, '#e7c34a', 'T½ (Cl, Vd)', { size: 20 });
      // legenda
      dot(g, 120, 870, 10, K.drug); txt(g, 'medicamentul', 140, 870, 18, C.cream, { align: 'left', w: 700 });
      dot(g, 120, 905, 10, K.met); txt(g, 'metabolitul', 140, 905, 18, C.cream, { align: 'left', w: 700 });
    },
  };
}

/* =================================================== FEREASTRA TERAPEUTICĂ */
export function windowSc() {
  const x0 = 70, y0 = 90, w = 880, h = 700;
  const TOX = 300, MEC = 560;
  const bell = (pk) => (u) => pk * (Math.exp(-u / 0.45) - Math.exp(-u / 0.08)) / 0.62;
  return {
    home: HOME, anchors: [[x0 + 330, 420], [x0 + 300, 150], [x0 + 300, 660]],
    draw(g, t, b) {
      bg(g);
      g.save(); g.fillStyle = 'rgba(255,107,94,.13)'; g.fillRect(x0, y0, w, TOX - y0); g.fillStyle = 'rgba(79,209,139,.15)'; g.fillRect(x0, TOX, w, MEC - TOX); g.fillStyle = 'rgba(90,168,255,.12)'; g.fillRect(x0, MEC, w, y0 + h - MEC); g.restore();
      g.save(); g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0, y0 + h); g.lineTo(x0 + w, y0 + h); g.stroke(); g.restore();
      for (const [y, l, c] of [[TOX, 'prag toxic', C.key], [MEC, 'prag minim eficace', C.gi]]) { g.save(); g.strokeStyle = c; g.lineWidth = 4; g.setLineDash([12, 8]); g.beginPath(); g.moveTo(x0, y); g.lineTo(x0 + w, y); g.stroke(); g.restore(); txt(g, l, x0 + w - 10, y - 20, 19, c, { align: 'right' }); }
      txt(g, 'fereastra terapeutică', x0 + w - 10, (TOX + MEC) / 2 + 40, 22, C.gs, { align: 'right' });
      txt(g, 'timp', x0 + w - 30, y0 + h + 35, 20, C.cream); txt(g, 'concentrația plasmatică', x0 + 10, y0 - 30, 20, C.cream, { align: 'left' });
      g.save(); g.translate(x0 - 50, y0 + h / 2); g.rotate(-Math.PI / 2); g.restore();
      const Y = (v) => y0 + h - v * h; const X = (u) => x0 + 10 + u * (w - 20);
      const CUR = [[0.62, C.gs, 'în fereastră'], [0.88, C.key, 'inhibitor + activ'], [0.22, C.gi, 'cazurile 1–4: sub prag']];
      CUR.forEach(([pk, col, l], k) => {
        const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.35; const f = bell(pk);
        g.save(); g.globalAlpha = a; g.lineJoin = 'round';
        g.beginPath(); for (let i = 0; i <= 200; i++) { const u = i / 200; const v = f(u); i ? g.lineTo(X(u), Y(v)) : g.moveTo(X(u), Y(v)); }
        g.strokeStyle = OUT; g.lineWidth = on ? 14 : 10; g.stroke(); g.strokeStyle = col; g.lineWidth = on ? 8 : 5; g.stroke(); g.restore();
        let um = 0, vm = 0; for (let i = 0; i <= 200; i++) { const v = f(i / 200); if (v > vm) { vm = v; um = i / 200; } }
        txt(g, l, X(um) + 150, Y(vm) - 6, 20, col, { alpha: a, align: 'left' });
      });
    },
  };
}

/* =================================================== LOCURILE-CHEIE: stomac, intestin, ficat, CYP */
export function sites() {
  const P = [[30, 30, 455, 300], [515, 30, 455, 300], [30, 350, 455, 270], [515, 350, 455, 550]];
  return {
    home: HOME, anchors: P.map(([x, y, w]) => [x + w - 28, y + 28]),
    draw(g, t, b) {
      bg(g);
      P.forEach(([x, y, w, h], k) => { const on = b.i === k; panel(g, x, y, w, h, { fill: on ? 'rgba(255,207,133,.13)' : 'rgba(255,236,200,.05)', stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3 }); });
      // stomacul
      stomach(g, 170, 175, 1.25); txt(g, 'stomac', 350, 80, 24, C.hi);
      txt(g, 'pH 1–2', 350, 140, 22, '#ffb3ab'); txt(g, 'pepsină', 350, 185, 20, C.cream, { w: 700 }); txt(g, '~0,15 m²', 350, 230, 20, C.cream, { w: 700 }); txt(g, 'acizi neionizați', 350, 275, 18, C.dim, { w: 700 });
      // intestinul: vilozități
      txt(g, 'intestin subțire', 742, 70, 24, C.hi);
      for (let k = 0; k < 9; k++) { const x = 560 + k * 45; const p = new Path2D(); p.moveTo(x, 260); p.lineTo(x, 150); p.quadraticCurveTo(x + 18, 120, x + 36, 150); p.lineTo(x + 36, 260); paint(g, p, '#f0a6a0', '#d27c78', '#ffe0dc', [x, 120, 36, 140], OUT, 4); g.save(); g.strokeStyle = C.blood; g.lineWidth = 3; g.beginPath(); g.moveTo(x + 12, 255); g.lineTo(x + 12, 160); g.quadraticCurveTo(x + 18, 148, x + 24, 160); g.lineTo(x + 24, 255); g.stroke(); g.restore(); }
      const vb = new Path2D(); vb.roundRect(550, 258, 390, 26, 10); paint(g, vb, C.blood, null, null, [550, 258, 390, 26], OUT, 4);
      txt(g, '~100 m² · acizi + baze slabe', 742, 308, 18, C.cream, { w: 700 });
      // ficatul + vena portă
      liver(g, 230, 470, 1.6, { glow: b.i === 2 }); tube(g, [[120, 590], [150, 540], [190, 505]], 14, '#7c4ad8', { raw: true });
      txt(g, 'ficat', 400, 400, 24, C.hi); txt(g, 'vena portă', 130, 600, 17, '#c7b1ff'); txt(g, 'primul pasaj', 400, 450, 18, C.cream, { w: 700 });
      // CYP
      txt(g, 'citocromul P450 (CYP)', 742, 395, 24, C.hi);
      pac(g, 742, 500, 70, C.gq, t * 3);
      txt(g, 'mai ales oxidări', 742, 600, 18, C.cream, { w: 700 });
      const ISO = ['CYP1A2', 'CYP2C9', 'CYP2D6', 'CYP3A4'];
      ISO.forEach((s, j) => { const x = 630 + (j % 2) * 225, y = 670 + Math.floor(j / 2) * 85; pill(g, x, y, 200, 56, j === 2 ? '#8b8090' : C.gq, s, { size: 22 }); });
      txt(g, 'CYP2D6 = singura neinductibilă', 742, 850, 19, '#d6c9e0', { w: 700 });
    },
  };
}

/* =================================================== DISTRIBUȚIA */
export function distrib() {
  const ALB = [[200, 200], [430, 230], [690, 190]];
  return {
    home: HOME, anchors: [[ALB[0][0] - 40, ALB[0][1] - 85], [600, 400], [740, 150], [60, 680]],
    draw(g, t, b) {
      bg(g);
      // capilarul
      const cap = new Path2D(); cap.roundRect(20, 90, 960, 240, 60); paint(g, cap, '#7a1f2c', null, null, [20, 90, 960, 240], OUT, 7);
      g.save(); g.fillStyle = 'rgba(255,180,170,.15)'; g.fill(cap); g.restore();
      txt(g, 'plasmă (în capilar)', 500, 60, 22, C.cream);
      // pori în perete (linia de jos)
      g.save(); g.strokeStyle = '#f2b6c0'; g.lineWidth = 8; g.setLineDash([60, 24]); g.beginPath(); g.moveTo(40, 330); g.lineTo(960, 330); g.stroke(); g.restore();
      const sw = REDUCED ? 0 : Math.sin(t * 1.4);
      ALB.forEach(([x, y], k) => {
        ell(g, x, y, 70, 46, '#ffe08a', { ow: 5 }); txt(g, 'albumină', x, y + 4, 17, OUT, { stroke: false });
        for (let j = 0; j < 3; j++) { const a = j * 2.1 + k; mol(g, x + Math.cos(a) * 70, y + Math.sin(a) * 46, '', 13); }
      });
      // molecule libere ⇄
      for (let k = 0; k < 4; k++) dot(g, 310 + k * 130, 280 + 8 * Math.sin(t * 2 + k), 12, K.drug, { ow: 3 });
      const eq = b.i === 2 || b.i < 0 ? 1 : 0.4;
      arr(g, 760, 210, 830, 270, C.hi, 6, eq); arr(g, 840, 250, 770, 190, C.cream, 6, eq); txt(g, 'echilibru', 880, 300, 19, C.hi, { alpha: eq });
      // țesutul
      txt(g, 'țesut (locul de acțiune)', 260, 380, 22, C.cream);
      for (let k = 0; k < 3; k++) { const x = 330 + k * 200; ell(g, x, 520, 85, 65, '#f3c6a0', { ow: 5 }); ell(g, x, 520, 22, 20, '#6b4aa0', { ow: 3 }); const rx = x - 50; const p = new Path2D(); p.roundRect(rx - 12, 450, 24, 34, 8); paint(g, p, C.gs, null, null, [rx - 12, 450, 24, 34], OUT, 3); }
      // săgeata „doar liberul trece”
      const u = REDUCED ? 0.5 : (t * 0.45) % 1; dot(g, 480 + 0 * u, 300 + u * 150, 12, K.drug, { ow: 3, alpha: Math.sin(u * Math.PI) ** 0.3 });
      arr(g, 560, 340, 560, 440, C.gs, 6, b.i === 1 || b.i < 0 ? 1 : 0.5);
      txt(g, 'doar ce e liber trece', 700, 420, 19, C.gs);
      txt(g, 'legat → nu trece', 200, 300, 18, '#ffe08a');
      if (b.i === 0) glowRing(g, ALB[0][0], ALB[0][1], 95, 70, 0, 1, C.hi, 5);
      // barierele
      panel(g, 30, 640, 455, 270, { stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3 });
      panel(g, 515, 640, 455, 270, { stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3 });
      icon(g, 'brain', 140, 770, 1.1); txt(g, 'BHE', 330, 700, 24, C.hi); txt(g, 'trec doar\nsubstanțele lipofile', 330, 790, 19, C.cream, { w: 700 });
      icon(g, 'uterus', 620, 770, 1.0); txt(g, 'placenta', 820, 700, 24, C.hi); txt(g, 'pori largi →\nniveluri la făt', 820, 790, 19, C.cream, { w: 700 });
      void sw;
    },
  };
}

/* =================================================== CAPTAREA IONICĂ (anim) */
export function ph() {
  const PAN = [[20, 'Stomac fără antiacid', 'lumen: pH 1–2', '#c9563e'], [510, 'Stomac după antiacid', 'lumen: pH ↑', '#4f7fc4']];
  const MY = 440;
  // traiectorie: coboară din lumen (yA) până la yB; „ricoșeu” = coboară până la membrană și urcă înapoi
  const down = (u, y0, y1) => lerp(y0, y1, ease(u));
  const bounce = (u, y0, ym) => (u < 0.5 ? lerp(y0, ym, ease(u * 2)) : lerp(ym, y0, ease((u - 0.5) * 2)));
  return {
    home: HOME, anchors: [[60, 240], [60, 640], [545, 140], [500, 900]],
    phase: (i) => ['HA trece', 'A⁻ captat în plasmă', 'antiacid: A⁻ respins', 'ionizat = captiv'][i] || '',
    draw(g, t, b) {
      bg(g);
      PAN.forEach(([x0, h, sub, lc], p) => {
        const L = new Path2D(); L.roundRect(x0, 40, 470, MY - 70, [24, 24, 0, 0]); paint(g, L, lc, null, null, [x0, 40, 470, MY - 70], OUT, 5);
        g.save(); g.globalAlpha = 0.55; g.fillStyle = '#100a05'; g.fill(L); g.restore();
        const Pl = new Path2D(); Pl.roundRect(x0, MY + 30, 470, 290, [0, 0, 24, 24]); paint(g, Pl, '#7a1f2c', null, null, [x0, MY + 30, 470, 290], OUT, 5);
        g.save(); g.globalAlpha = 0.45; g.fillStyle = '#100a05'; g.fill(Pl); g.restore();
        membrane(g, x0, x0 + 470, MY, { h: 60 });
        txt(g, h, x0 + 235, 75, 22, C.cream); txt(g, sub, x0 + 235, 110, 19, p ? '#bcd6ff' : '#ffb3ab', { w: 700 });
        txt(g, 'plasmă: pH 7,4', x0 + 235, MY + 290, 19, '#ffc9cf', { w: 700 });
      });
      // ------- stânga: HA trece, apoi devine A⁻ (captat)
      const L0 = b.i < 0 || b.i === 0 || b.i === 3 ? 1 : b.i === 1 ? 0 : 0.35;
      for (let k = 0; k < 4; k++) {
        const x = 90 + k * 105; const ph1 = (b.i === 1) ? 1 : ((t * 0.3 + k * 0.25) % 1);
        g.save(); g.globalAlpha = b.i === 2 ? 0.35 : 1;
        if (b.i === 1) { // în plasmă: HA → A⁻ + H⁺, apoi A⁻ ricoșează în membrană
          const u = clamp(b.bt / (b.bd * 0.9)); const y = MY + 160; const conv = clamp(u * 3 - k * 0.3);
          if (conv < 1) mol(g, x, y, 'HA'); else { const uu = ((u * 3 - 1 - k * 0.3) % 1 + 1) % 1; mol(g, x, bounce(uu, y, MY + 48), 'A⁻'); }
          if (conv > 0 && conv < 1.6) dot(g, x + 30 + conv * 30, y - 30 - conv * 30, 9, C.hi, { alpha: 1 - conv / 1.6 });
        } else {
          const u = ph1; const y = down(clamp(u * 1.6), 180, MY + 160);
          if (u * 1.6 < 1) mol(g, x, y, 'HA'); else { const uu = (u * 1.6 - 1) / 0.6; mol(g, x, bounce(clamp(uu), MY + 160, MY + 48), 'A⁻'); }
        }
        g.restore();
      }
      void L0;
      if (b.i === 0) arr(g, 470, 200, 470, MY + 120, C.gs, 7);
      if (b.i === 1) txt(g, 'HA → A⁻ + H⁺', 255, MY + 230, 22, C.hi);
      // ------- dreapta: A⁻ în lumen, ricoșează; un HA trece
      const R = b.i < 0 || b.i >= 2;
      for (let k = 0; k < 5; k++) {
        const x = 570 + k * 88; const u = R ? ((t * 0.32 + k * 0.2) % 1) : 0.15;
        g.save(); g.globalAlpha = R ? 1 : 0.35;
        if (k === 2) { const y = down(u, 180, MY + 160); mol(g, x, y, 'HA'); }
        else { mol(g, x, bounce(u, 190, MY - 48), 'A⁻'); }
        g.restore();
      }
      if (R) { cross(g, 610, MY, 16, C.key); cross(g, 880, MY, 16, C.key); }
      // bara concentrației lui B (sub panoul drept)
      const lvl = b.i === 2 ? lerp(0.8, 0.35, clamp(b.bt / (b.bd * 0.8))) : R ? 0.35 : 0.8;
      panel(g, 510, 790, 470, 130, { alpha: 1 });
      txt(g, 'concentrația lui B', 640, 815, 17, C.cream, { w: 700 });
      const bar = new Path2D(); bar.roundRect(540, 840, 400 * lvl, 40, 10); paint(g, bar, lvl < 0.5 ? C.gi : C.gs, null, null, [540, 840, 400, 40], OUT, 4);
      g.save(); g.strokeStyle = C.key; g.lineWidth = 4; g.setLineDash([8, 6]); g.beginPath(); g.moveTo(540 + 400 * 0.5, 830); g.lineTo(540 + 400 * 0.5, 892); g.stroke(); g.restore();
      txt(g, 'prag 13 µg/mL', 740, 905, 16, '#ffb3ab', { w: 700 });
      // regula
      const ra = b.i === 3 || b.i < 0 ? 1 : 0.4;
      panel(g, 20, 790, 470, 130, { stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3, alpha: 1 });
      txt(g, 'ionizat = captiv', 255, 830, 28, C.hi, { alpha: ra });
      txt(g, 'acid din mediu acid · bază din mediu bazic', 255, 880, 17, C.cream, { alpha: ra, w: 700 });
    },
  };
}

/* =================================================== TUBUL DIGESTIV: ce se absoarbe unde */
export function tract() {
  const SEG = [[150, 'Sub limbă', '0,02 m²', 'foarte liposolubile'], [340, 'Stomac', 'pH 1–2', 'acizi neionizați · antiacid → ↓'], [560, 'Intestin', 'pH 4,8–8', 'acizi + baze slabe · peptide ✕'], [790, 'Rect', 'supozitoare', 'acizi + baze slabe']];
  return {
    home: HOME, anchors: SEG.map(([y]) => [60, y - 50]),
    draw(g, t, b) {
      bg(g);
      // tubul vertical
      tube(g, [[230, 90], [230, 250], [230, 300]], 34, '#f0a6a0', { raw: true });
      stomach(g, 240, 350, 1.1);
      tube(g, [[250, 430], [250, 500], [300, 520], [180, 560], [300, 600], [180, 640], [250, 680], [250, 760]], 30, '#f0a6a0', { raw: false });
      tube(g, [[250, 760], [250, 840]], 30, '#e58a88', { raw: true });
      ell(g, 230, 120, 70, 40, '#e88a9a', { ow: 5 }); txt(g, 'limbă', 230, 120, 17, OUT, { stroke: false });
      SEG.forEach(([y, h, s1, s2], k) => {
        const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.45;
        hiBox(g, 30, y - 75, 600, 150, on);
        txt(g, h, 450, y - 35, 26, C.hi, { alpha: a }); txt(g, s1, 450, y + 5, 21, '#ffb3ab', { alpha: a, w: 700 }); txt(g, s2, 450, y + 45, 18, C.cream, { alpha: a, w: 700, maxW: 330 });
      });
      // ficat + vena portă + circulație (traseele ocolesc coloana de text)
      liver(g, 800, 470, 1.3);
      txt(g, 'ficat', 800, 395, 22, C.cream);
      tube(g, [[290, 410], [400, 450], [660, 450], [720, 470]], 12, '#7c4ad8', { raw: false, alpha: b.i === 1 || b.i < 0 ? 1 : 0.5 });
      tube(g, [[300, 650], [400, 675], [660, 675], [740, 520]], 12, '#7c4ad8', { raw: false, alpha: b.i === 2 || b.i < 0 ? 1 : 0.5 });
      txt(g, 'vena portă', 720, 600, 17, '#c7b1ff');
      heart(g, 840, 230, 0.45, 0);
      arr(g, 820, 420, 832, 300, '#5b6be0', 7); txt(g, '→ circulația\nsistemică', 740, 330, 16, C.cream, { w: 700 });
      // sublingual: direct în sânge
      const sa = b.i === 0 || b.i < 0 ? 1 : 0.4;
      tube(g, [[300, 100], [360, 45], [700, 45], [800, 180]], 10, C.blood, { raw: false, dash: [14, 10], alpha: sa });
      txt(g, 'direct în sânge,\nocolește ficatul', 700, 105, 17, '#ffc9cf', { w: 700, alpha: sa });
      // rect: parțial ocolește
      const ra = b.i === 3 || b.i < 0 ? 1 : 0.4;
      tube(g, [[290, 820], [400, 895], [700, 895], [900, 720], [905, 300]], 10, C.blood, { raw: false, dash: [14, 10], alpha: ra });
      txt(g, 'evită parțial\nprimul pasaj', 700, 830, 17, '#ffc9cf', { w: 700, alpha: ra });
      // enzimele care taie peptidele
      pac(g, 120, 590, 26, '#b07cff', t * 4); txt(g, 'proteaze', 120, 640, 15, '#d6b8ff');
    },
  };
}
