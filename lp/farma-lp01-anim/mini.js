// Desenele-rezumat ale celor 5 cazuri (folosite pe slide-urile de rezolvare și pe cele cu scriptul OSPE).
// Fiecare se desenează într-o cutie locală de 540 × 330, scalată unde e nevoie.
import { C, OUT, clamp, txt, dot, ell, arr, cross, check, membrane, pill, panel, heart } from './fk.js';
import { K, mol, pac, axes, plot, chain, platelet, liver } from './fx.js';

export function mini(g, f, x, y, s, t) {
  g.save(); g.translate(x, y); g.scale(s, s);
  panel(g, 0, 0, 540, 330, {});
  if (f === 'peptid') {
    txt(g, 'lumen: proteaze', 150, 30, 18, C.cream);
    chain(g, 40, 90, 6, 42, [0, 1, 0, 1, 1], [[0, 0], [0, 0], [10, 6], [10, 6], [24, -8], [36, 10]]);
    pac(g, 330, 95, 30, '#b07cff', t * 4); txt(g, 'pepsină, tripsină,\nchimotripsină', 440, 90, 16, '#d6b8ff', { w: 700 });
    const wl = new Path2D(); wl.roundRect(20, 150, 360, 40, 10); g.save(); g.fillStyle = '#f0a6a0'; g.fill(wl); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(wl); g.restore();
    cross(g, 200, 170, 16, C.key);
    const cp = new Path2D(); cp.roundRect(20, 220, 360, 60, 26); g.save(); g.fillStyle = '#7a1f2c'; g.fill(cp); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(cp); g.restore();
    txt(g, 'sânge: 0 µg/mL', 200, 250, 20, '#ffc9cf');
    // stiloul de insulină
    g.save(); g.translate(460, 230); g.rotate(-0.6); const pen = new Path2D(); pen.roundRect(-16, -70, 32, 120, 10); g.fillStyle = '#5b8fd6'; g.fill(pen); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(pen); g.strokeStyle = '#ddd'; g.lineWidth = 3; g.beginPath(); g.moveTo(0, 50); g.lineTo(0, 78); g.stroke(); g.restore();
    txt(g, 'parenteral', 470, 315, 18, C.gs);
  }
  if (f === 'acid') {
    for (const [x0, lab, ok] of [[20, 'pH 1–2', true], [280, 'pH ↑ (antiacid)', false]]) {
      txt(g, lab, x0 + 120, 28, 19, ok ? '#ffb3ab' : '#bcd6ff');
      membrane(g, x0, x0 + 240, 150, { h: 44 });
      if (ok) { mol(g, x0 + 120, 80, 'HA', 24); arr(g, x0 + 120, 106, x0 + 120, 205, C.gs, 6); mol(g, x0 + 120, 235, 'A⁻', 24); txt(g, 'trece', x0 + 200, 205, 17, C.gs); }
      else { mol(g, x0 + 80, 85, 'A⁻', 24); mol(g, x0 + 160, 85, 'A⁻', 24); cross(g, x0 + 120, 150, 18, C.key); txt(g, 'nu trece', x0 + 120, 215, 18, C.key); }
    }
    txt(g, 'B < 13 µg/mL → bronhospasm', 270, 300, 21, C.hi);
  }
  if (f === 'carba') {
    ell(g, 130, 160, 115, 120, '#f3c6a0', { ow: 5 }); ell(g, 130, 160, 30, 28, '#6b4aa0', { ow: 4 });
    [[70, 90], [190, 90], [60, 200], [200, 210], [130, 250], [90, 150], [180, 150]].forEach(([px, py], k) => pac(g, px, py, 20, C.gq, t * 4 + k));
    txt(g, 'CYP3A4 ↑', 130, 310, 19, C.gq);
    const A = axes(g, 270, 30, 250, 250, { xmax: 24, ymax: 10, noTicks: true, bare: true });
    g.save(); g.strokeStyle = C.gs; g.lineWidth = 3; g.setLineDash([8, 6]); g.beginPath(); g.moveTo(A.x0, A.Y(4)); g.lineTo(A.x1, A.Y(4)); g.stroke(); g.restore();
    plot(g, A, (h) => 9 * Math.exp(-h / 30), 0, 24, { col: C.cream, w: 4, dash: [8, 6] });
    plot(g, A, (h) => 9 * Math.exp(-h / 7), 0, 24, { col: K.ion, w: 5 });
    txt(g, 'nivel eficient', 400, A.Y(4) - 18, 15, C.gs, { w: 700 }); txt(g, 'hormonul ↓', 400, 300, 18, K.ion);
  }
  if (f === 'clopi') {
    mol(g, 40, 120, '', 24, { col: K.grey }); txt(g, 'clopidogrel', 60, 170, 15, C.cream, { w: 700 });
    arr(g, 70, 120, 130, 120, C.cream, 5);
    liver(g, 210, 125, 0.9); pac(g, 210, 120, 30, K.grey, 0); const ob = new Path2D(); ob.roundRect(186, 64, 48, 26, 7); g.save(); g.fillStyle = K.inh; g.fill(ob); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(ob); g.restore();
    cross(g, 250, 80, 12, C.key); txt(g, 'CYP2C19', 210, 190, 17, C.gq); txt(g, 'omeprazol', 210, 40, 16, K.inh);
    arr(g, 290, 120, 350, 120, C.cream, 5); mol(g, 380, 120, '', 22, { col: K.grey }); txt(g, 'tot inactiv', 380, 165, 15, C.cream, { w: 700 });
    [[410, 250], [445, 240], [430, 280], [470, 270], [395, 285]].forEach(([px, py]) => platelet(g, px, py, 22, { spiky: true }));
    txt(g, 'trombocitele se agregă', 200, 270, 19, C.key);
  }
  if (f === 'thalf') {
    const A = axes(g, 10, 10, 520, 310, { xmax: 22, ymax: 14, xt: [1, 4, 7, 10, 13, 16, 19, 22], yt: [5, 10], fs: 14 });
    plot(g, A, (h) => (h < 1 ? 10 * h : 10 * Math.pow(0.5, (h - 1) / 3)), 0, 22, { col: K.drug, w: 5 });
    dot(g, A.X(1), A.Y(10), 9, C.hi); dot(g, A.X(4), A.Y(5), 9, C.hi);
    g.save(); g.strokeStyle = C.hi; g.lineWidth = 3; g.beginPath(); g.moveTo(A.X(1), A.Y(10) - 22); g.lineTo(A.X(4), A.Y(10) - 22); g.stroke(); g.restore();
    txt(g, 'T½ = 3 h', (A.X(1) + A.X(4)) / 2 + 30, A.Y(10) - 42, 18, C.hi);
    txt(g, '5–7 × T½ = 15–21 h', A.X(15), A.Y(7), 19, C.gs);
  }
  g.restore();
}
