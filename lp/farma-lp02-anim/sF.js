// Scene comune LP 1 + LP 2 Farmacologie (aceeași copie în ambele deck-uri): harta LP-ului, formatul OSPE oficial,
// fișa OSPE pe subpuncte (coloana îngustă), recapitularea pe benzi (coloana îngustă).
import { HOME, C, OUT, clamp, bg, panel, txt, pill, dot, arr, cross, check, icon } from './fk.js';
import { K, hiBox } from './fx.js';

/* =================================================== HARTA: coloanele A · D · M · E cu cazurile oficiale */
export function harta({ spec }) {
  const cols = spec.sceneOpts.cols; const X = [130, 375, 625, 870];
  return {
    home: HOME, anchors: cols.map((_, j) => [X[j] - 72, 112]),
    draw(g, t, b) {
      bg(g);
      cols.forEach((c, j) => {
        const x = X[j]; const on = b.i === j; const a = c.other ? 0.42 : (b.i < 0 || on ? 1 : 0.55);
        hiBox(g, x - 112, 60, 224, 850, on);
        pill(g, x, 170, 130, 130, K.stage[j], c.l, { size: 64, r: 65, alpha: a, glow: on ? 1 : 0 });
        txt(g, c.n, x, 280, 23, C.cream, { alpha: a });
        if (j < 3) arr(g, x + 72, 170, X[j + 1] - 72, 170, C.cream, 6, 0.7);
        const n = c.cases.length; const bh = n > 3 ? 128 : 160; const gap = 12;
        c.cases.forEach(([h, d], k) => {
          const y = 320 + k * (bh + gap);
          panel(g, x - 105, y, 210, bh, { fill: c.other ? 'rgba(255,236,200,.03)' : 'rgba(255,207,133,.1)', stroke: c.other ? 'rgba(255,225,180,.15)' : K.stage[j], lw: 4, alpha: a });
          txt(g, h, x, y + 34, 23, c.other ? C.dim : C.hi, { alpha: a, maxW: 196 });
          txt(g, d, x, y + bh * 0.62, 18, C.cream, { alpha: a, w: 700, maxW: 196 });
        });
      });
    },
  };
}

/* =================================================== FORMATUL OSPE OFICIAL: fișa, baremul, regula +50%, 7 min */
export function ospeOff() {
  const SUB = [['1', ['a · 1,5 p', 'b · 0,5 p']], ['2', ['a · 0,5 p', 'b · 1 p', 'c · 2 p', 'd · 1,5 p']], ['3', ['a · 2 p']]];
  return {
    home: HOME, anchors: [[60, 70], [600, 70], [600, 470], [60, 760]],
    phase: (i) => ['fișa cu subpuncte', 'baremul pe noțiuni', 'regula +50%', '7 minute · 9 + 1 p'][i] || '',
    draw(g, t, b) {
      bg(g);
      const on = (k) => b.i === k;
      // fișa
      const pp = new Path2D(); pp.roundRect(40, 50, 500, 650, 14);
      g.save(); if (on(0)) { g.shadowColor = C.hi; g.shadowBlur = 26; } g.fillStyle = '#fbf3e2'; g.fill(pp); g.shadowBlur = 0; g.strokeStyle = on(0) ? C.hi : OUT; g.lineWidth = 6; g.stroke(pp); g.restore();
      txt(g, 'Fișa studentului', 290, 92, 26, OUT, { stroke: false });
      let y = 140;
      SUB.forEach(([n, sp]) => {
        txt(g, `Subiectul ${n}`, 80, y + 6, 21, '#7a3d10', { stroke: false, align: 'left' });
        g.save(); g.strokeStyle = 'rgba(80,50,30,.35)'; g.lineWidth = 3; g.beginPath(); g.moveTo(250, y + 6); g.lineTo(500, y + 6); g.stroke(); g.restore();
        y += 42;
        sp.forEach((s) => { txt(g, s, 110, y, 19, '#3d2a1a', { stroke: false, align: 'left', w: 700 }); g.save(); g.strokeStyle = 'rgba(80,50,30,.25)'; g.lineWidth = 2; g.beginPath(); g.moveTo(250, y); g.lineTo(500, y); g.stroke(); g.restore(); y += 36; });
        y += 18;
      });
      txt(g, 'max 9 p + 1 p din oficiu', 290, 670, 20, '#7a3d10', { stroke: false });
      // baremul
      panel(g, 580, 50, 390, 380, { stroke: on(1) ? C.hi : 'rgba(255,225,180,.2)', lw: on(1) ? 5 : 3 });
      txt(g, 'baremul: pe noțiuni', 775, 90, 23, C.hi);
      [['noțiunea 1', '0,75 p'], ['noțiunea 2', '0,75 p']].forEach(([l, p], k) => { pill(g, 720, 160 + k * 80, 200, 56, K.stage[1], l, { size: 19 }); txt(g, p, 885, 160 + k * 80, 22, C.cream); });
      txt(g, 'subpunct = 0 / parțial / maxim', 775, 340, 18, C.cream, { w: 700 });
      txt(g, 'contează noțiunea, nu lungimea', 775, 385, 18, C.dim, { w: 700 });
      // regula +50%
      panel(g, 580, 450, 390, 250, { stroke: on(2) ? C.hi : 'rgba(255,225,180,.2)', lw: on(2) ? 5 : 3 });
      txt(g, 'cerute 4 → se citesc primele 6', 775, 490, 20, C.hi);
      for (let k = 0; k < 8; k++) { const x = 625 + (k % 4) * 100, yy = 560 + Math.floor(k / 4) * 80; pill(g, x, yy, 70, 54, k < 4 ? K.stage[3] : k < 6 ? '#f2c14e' : '#6d6178', String(k + 1), { size: 24 }); if (k >= 6) cross(g, x, yy, 16, C.key); }
      // bara de 7 minute
      panel(g, 40, 730, 930, 180, { stroke: on(3) ? C.hi : 'rgba(255,225,180,.2)', lw: on(3) ? 5 : 3 });
      const X0 = 90, PX = 115, Y = 800;
      for (let m = 0; m < 7; m++) { const p = new Path2D(); p.roundRect(X0 + m * PX + 2, Y - 26, PX - 4, 52, 10); g.save(); g.fillStyle = m === 6 ? '#9c6c14' : '#C27A10'; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(p); g.restore(); txt(g, String(m + 1), X0 + m * PX + PX / 2, Y, 22, '#fff'); }
      txt(g, '7 minute · fără întrebări către examinator · contează ce spui', 505, 865, 19, C.cream, { w: 700, maxW: 880 });
    },
  };
}

/* =================================================== FIȘA OSPE PE SUBPUNCTE (coloana îngustă) */
export function fisa({ spec }) {
  const o = spec.sceneOpts; const WS = 600, HS = 897; const R = o.rows; const n = R.length;
  const top = 200, avail = 560; const rh = Math.min(150, avail / n);
  return {
    W: WS, H: HS, home: { x: 300, y: 448, z: 1 }, anchors: [],
    phase: (i) => (i >= 0 && R[i] ? `subpunctul ${R[i].l}` : ''),
    draw(g, t, b) {
      bg(g, WS, HS);
      const pp = new Path2D(); pp.roundRect(24, 24, 552, 780, 14);
      g.save(); g.fillStyle = '#fbf3e2'; g.fill(pp); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(pp); g.restore();
      if (o.ico) icon(g, o.ico, 100, 110, 0.9);
      txt(g, o.title, 340, 92, 26, OUT, { stroke: false, maxW: 380 });
      txt(g, o.sub || '', 340, 136, 18, '#7a3d10', { stroke: false, w: 700, maxW: 380 });
      R.forEach((r, k) => {
        const y = top + k * rh; const on = b.i === k; const a = b.i < 0 || on || b.i > k ? 1 : 0.45;
        if (on) { g.save(); g.fillStyle = 'rgba(255,207,80,.4)'; g.beginPath(); g.roundRect(40, y + 6, 520, rh - 12, 12); g.fill(); g.restore(); }
        g.save(); g.globalAlpha = a;
        pill(g, 80, y + rh / 2, 54, 54, K.stage[o.stage ?? 0], r.l, { size: 26, r: 27 });
        txt(g, r.t, 330, y + rh / 2 - (r.n ? 14 : 0), 19, '#3d2a1a', { stroke: false, w: 700, maxW: 420 });
        for (let j = 0; j < (r.n || 0); j++) dot(g, 140 + j * 30, y + rh / 2 + 26, 10, b.i > k || on ? K.stage[3] : '#d8c8b0', { ow: 3 });
        if (r.n) txt(g, `${r.n} ${r.n === 1 ? 'noțiune' : 'noțiuni'}`, 150 + r.n * 30, y + rh / 2 + 26, 16, '#7a3d10', { stroke: false, align: 'left', w: 700 });
        g.restore();
        if (b.i > k) check(g, 535, y + rh / 2, 13, C.gs);
      });
      txt(g, 'întâi noțiunile de barem, scurt', 300, 845, 21, C.hi);
      txt(g, 'max +50% noțiuni: se citesc doar primele', 300, 880, 17, C.cream, { w: 700 });
    },
  };
}

/* =================================================== RECAPITULARE PE BENZI (coloana îngustă) */
export function recapT({ spec }) {
  const R = spec.sceneOpts.rows; const WW = 600, HH = 897; const BH = Math.min(118, (HH - 24) / R.length - 8);
  return {
    W: WW, H: HH, home: { x: WW / 2, y: HH / 2, z: 1 }, anchors: R.map((_, k) => [30, 12 + k * (BH + 8) + 22]),
    draw(g, t, b) {
      bg(g, WW, HH);
      R.forEach(([si, l, h], k) => {
        const y = 12 + k * (BH + 8); const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.5;
        panel(g, 12, y, 576, BH, { fill: on ? 'rgba(255,207,133,.15)' : 'rgba(255,236,200,.06)', stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3, alpha: a });
        pill(g, 80, y + BH / 2, BH * 0.55, BH * 0.55, K.stage[si], l, { size: BH * 0.28, r: BH * 0.27, alpha: a });
        txt(g, h, 340, y + BH / 2, 21, C.cream, { alpha: a, maxW: 430 });
      });
    },
  };
}
