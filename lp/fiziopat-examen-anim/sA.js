// Fiziopatologie · Capitolul 1 · Termoreglarea: scenele „Înțelege” pentru întrebările 1–9.
import { lerp, rbc, spindle } from './kit2d.js';
import { W, H, cam, HOME, lbl, bgFill, u01, stage, ring, txt, pill, node, field, thermometer, PURPLE, OUT, clamp, ease, glowRing, paint, blob, bb, arrow, REDUCED } from './fz.js';

const HOT = '#ff5a4e', WARM = '#ff9a3d', COLD = '#5fb4ff', ICE = '#bfe8ff', SKIN = '#f3c29b', SKIN_S = '#d99b72';
const wob = (t, k = 0) => (REDUCED ? 0 : Math.sin(t * 3 + k));

/* ---------- primitive locale ---------- */
function bodyPath(x, y, s = 1) {
  const p = new Path2D();
  p.arc(x, y - 230 * s, 58 * s, 0, Math.PI * 2);
  p.roundRect(x - 95 * s, y - 165 * s, 190 * s, 270 * s, 50 * s); // trunchi
  p.roundRect(x - 140 * s, y - 155 * s, 42 * s, 230 * s, 20 * s); // brațe
  p.roundRect(x + 98 * s, y - 155 * s, 42 * s, 230 * s, 20 * s);
  p.roundRect(x - 85 * s, y + 90 * s, 70 * s, 260 * s, 26 * s); // picioare
  p.roundRect(x + 15 * s, y + 90 * s, 70 * s, 260 * s, 26 * s);
  return p;
}
function drop(g, x, y, s = 1, col = '#7fd0ff') {
  g.save(); g.translate(x, y); g.scale(s, s); g.beginPath(); g.moveTo(0, -16); g.bezierCurveTo(10, -2, 12, 6, 0, 12); g.bezierCurveTo(-12, 6, -10, -2, 0, -16);
  g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 3; g.fill(); g.stroke(); g.restore();
}
function dial(g, x, y, r, f, label, col = PURPLE) { // f 0..1 → ac de la stânga la dreapta
  g.save(); g.fillStyle = '#3a2a5c'; g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke();
  g.lineWidth = r * 0.18; g.strokeStyle = COLD; g.beginPath(); g.arc(x, y, r * 0.78, Math.PI * 0.8, Math.PI * 1.3); g.stroke(); g.strokeStyle = '#9dff8a'; g.beginPath(); g.arc(x, y, r * 0.78, Math.PI * 1.3, Math.PI * 1.7); g.stroke(); g.strokeStyle = HOT; g.beginPath(); g.arc(x, y, r * 0.78, Math.PI * 1.7, Math.PI * 2.2); g.stroke();
  const a = Math.PI * 0.8 + Math.PI * 1.4 * clamp(f); g.strokeStyle = OUT; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * r * 0.75, y + Math.sin(a) * r * 0.75); g.stroke(); g.strokeStyle = '#fff'; g.lineWidth = 6; g.stroke();
  g.fillStyle = '#fff'; g.beginPath(); g.arc(x, y, r * 0.12, 0, 7); g.fill(); g.restore();
  if (label) txt(g, label, x, y + r + 34, 24, col === PURPLE ? '#e6dcff' : col);
}
function heart(g, x, y, s, beat, col = '#e8455d') {
  const k = 1 + 0.08 * beat; g.save(); g.translate(x, y); g.scale(s * k, s * k);
  const p = new Path2D(); p.moveTo(0, 30); p.bezierCurveTo(-60, -10, -40, -60, 0, -30); p.bezierCurveTo(40, -60, 60, -10, 0, 30);
  paint(g, p, col, '#b8243c', '#ff9aa8', [-50, -55, 100, 85], OUT, 5 / s); g.restore();
}
function heatWave(g, x, y, len, t, col = HOT, a = -Math.PI / 2) {
  g.save(); g.translate(x, y); g.rotate(a + Math.PI / 2); g.strokeStyle = col; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath();
  for (let k = 0; k <= 20; k++) { const u = k / 20; const yy = -u * len; const xx = Math.sin(u * 9 - t * 6) * 9; k ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); g.restore();
}
function iceCrystal(g, x, y, r, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.strokeStyle = OUT; g.lineWidth = 8; g.lineCap = 'round';
  const arm = () => { g.beginPath(); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; g.moveTo(0, 0); g.lineTo(Math.cos(a) * r, Math.sin(a) * r); const m = r * 0.55; g.moveTo(Math.cos(a) * m, Math.sin(a) * m); g.lineTo(Math.cos(a + 0.5) * r * 0.8, Math.sin(a + 0.5) * r * 0.8); g.moveTo(Math.cos(a) * m, Math.sin(a) * m); g.lineTo(Math.cos(a - 0.5) * r * 0.8, Math.sin(a - 0.5) * r * 0.8); } g.stroke(); };
  arm(); g.strokeStyle = ICE; g.lineWidth = 4; arm(); g.restore();
}
function panel(g, x, y, w, h, title, col, on, ts = 30) {
  g.save(); if (on) { g.shadowColor = col; g.shadowBlur = 26; } g.fillStyle = 'rgba(58,42,92,.55)'; g.strokeStyle = on ? col : 'rgba(255,255,255,.18)'; g.lineWidth = on ? 6 : 3; g.beginPath(); g.roundRect(x, y, w, h, 24); g.fill(); g.stroke(); g.restore();
  txt(g, title, x + w / 2, y + 46, ts, col);
}
function person(g, x, y, s, t, o = {}) { // siluetă mică, stilizată
  const shake = o.shake ? Math.sin(t * 40) * 4 * o.shake : 0; g.save(); g.translate(x + shake, y);
  if (o.lying) g.rotate(-Math.PI / 2);
  const p = bodyPath(0, 0, s); paint(g, p, o.col || SKIN, o.shade || SKIN_S, null, [-140 * s, -290 * s, 280 * s, 640 * s], OUT, 5); g.restore();
}

/* =================================================================== Î 1 */
// hipertermia < 39°C: vasodilatație + sudorație → ↓ volum → ↓ TA → hipoperfuzie
export function q1() {
  const BX = 400, BY = 380;
  return {
    home: HOME,
    cams: [cam(700, 260, 1.5), cam(420, 380, 1.3), cam(420, 380, 1.3), cam(800, 560, 1.5), cam(800, 300, 1.4), cam(520, 380, 1.15)],
    anchors: [[590, 110], [250, 200], [560, 230], [910, 450], [940, 120], [520, 120]],
    labels: [lbl([700, 350], 'set-point nemodificat (37°C)', { beats: [-1, 0] }), lbl([420, 140], 'vasodilatație', { beats: [1] }), lbl([420, 140], 'sudorație intensificată', { beats: [2] }), lbl([800, 750], 'volum circulant ↓', { beats: [3] }), lbl([870, 350], 'RVP ↓ · DC ↓ · TA ↓', { beats: [4] }), lbl([520, 360], 'hipoperfuzie de organ', { beats: [5] })],
    phase: (i) => ['termoliza depășită', 'vasodilatație', 'sudorație', '↓ volum circulant', '↓ RVP, ↓ DC → ↓ TA', 'hipoperfuzie de organ'][i] || '',
    draw(g, t, b) {
      bgFill(g); const st = stage(b, 6);
      // corpul
      const p = bodyPath(BX, BY, 1); const flush = clamp(st - 1);
      paint(g, p, `rgb(${Math.round(lerp(243, 255, flush))},${Math.round(lerp(194, 140, flush))},${Math.round(lerp(155, 130, flush))})`, SKIN_S, '#ffe2cc', [BX - 140, BY - 290, 280, 640], OUT, 7);
      // vasele cutanate (se dilată)
      const vw = 4 + 9 * flush; g.save(); g.strokeStyle = '#d5263f'; g.lineCap = 'round'; g.lineWidth = vw; g.globalAlpha = 0.85;
      [[BX - 120, BY - 140, BX - 118, BY + 60], [BX + 120, BY - 140, BX + 118, BY + 60], [BX - 70, BY - 150, BX - 75, BY + 90], [BX + 70, BY - 150, BX + 75, BY + 90], [BX - 50, BY + 110, BX - 50, BY + 330], [BX + 50, BY + 110, BX + 50, BY + 330]].forEach(([a, c, d, e]) => { g.beginPath(); g.moveTo(a, c); g.quadraticCurveTo((a + d) / 2 + 10, (c + e) / 2, d, e); g.stroke(); }); g.restore();
      // organe: creier, inimă, rinichi
      const dim = clamp(st - 5); const org = (x, y, rx, ry, c) => paint(g, blob(x, y, rx, ry, 0, t, 0.06, 12, x), dim > 0 ? `rgba(${c},${1 - 0.55 * dim})` : `rgba(${c},1)`, null, null, bb(x, y, rx, ry), OUT, 4);
      org(BX, BY - 238, 38, 30, '240,160,200'); org(BX - 40, BY + 40, 18, 26, '200,90,90'); org(BX + 40, BY + 40, 18, 26, '200,90,90');
      const tachy = 1; heart(g, BX - 20, BY - 80, 0.55, Math.max(0, Math.sin(t * 6 * tachy)));
      if (dim > 0) { txt(g, '?', BX + 70, BY - 300, 46, '#ffe36e'); }
      // termoliza: valuri de căldură care pleacă
      for (let k = 0; k < 5; k++) heatWave(g, BX - 160 + k * 80, BY - 320 - (k % 2) * 10, 70 + 20 * Math.sin(t + k), t + k, HOT);
      // sudorația
      if (st > 2) { const n = Math.floor(14 * clamp(st - 2)); for (let k = 0; k < n; k++) { const sx = BX - 130 + ((k * 53) % 260), sy = BY - 150 + (((t * 90 + k * 47) % 420)); drop(g, sx, sy, 0.9); } }
      // termostatul hipotalamic (neschimbat)
      dial(g, 690, 190, 80, 0.5, ''); txt(g, '37°C', 690, 195, 30, '#9dff8a'); txt(g, 'hipotalamus', 690, 305, 24, '#e6dcff');
      if (st > 0.2 && st < 1.2) arrow(g, 610, 200, 470, 160, '#fff', 6);
      // rezervorul de volum circulant
      const vol = 1 - 0.45 * clamp(st - 2.5); g.save(); g.fillStyle = '#3a2a5c'; g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.roundRect(740, 440, 130, 260, 20); g.fill(); g.stroke(); g.beginPath(); g.roundRect(747, 440 + 253 * (1 - vol) + 7, 116, 253 * vol - 7, 14); g.fillStyle = '#d5263f'; g.fill(); g.restore();
      txt(g, 'volum', 805, 430, 24, '#e6dcff');
      if (st > 3) arrow(g, 735, 600, 580, 520, COLD, 5 + 6 * vol), txt(g, 'întoarcere venoasă ↓', 650, 650, 20, '#9ec5ff');
      // manometrul TA
      const bp = 0.65 - 0.4 * clamp(st - 3.6); dial(g, 880, 190, 65, bp, '', '#fff'); txt(g, 'TA', 880, 290, 26, '#e6dcff');
      ring(g, b, 0, 690, 190, 105); ring(g, b, 1, BX, BY - 20, 160, 280); ring(g, b, 2, BX, BY - 20, 160, 280); ring(g, b, 3, 805, 560, 100, 160); ring(g, b, 4, 880, 190, 90); ring(g, b, 5, BX, BY - 120, 150, 200);
    },
  };
}

/* =================================================================== Î 2 */
// 40–40,5°C: SNC suferă; răcirea selectivă a creierului prin sinusul cavernos
export function q2() {
  const head = () => { const p = new Path2D(); p.moveTo(250, 640); p.bezierCurveTo(200, 420, 260, 140, 520, 120); p.bezierCurveTo(760, 110, 820, 330, 790, 470); p.lineTo(840, 560); p.lineTo(790, 590); p.bezierCurveTo(800, 650, 760, 700, 700, 700); p.lineTo(640, 820); p.lineTo(400, 820); p.bezierCurveTo(420, 740, 300, 720, 250, 640); return p; };
  const SIN = [560, 470];
  return {
    home: HOME,
    cams: [cam(500, 330, 1.3), cam(560, 220, 1.4), cam(560, 200, 1.6), cam(640, 470, 1.6), cam(560, 470, 2.2)],
    anchors: [[340, 160], [250, 300], [700, 140], [710, 395], [575, 455]],
    labels: [lbl([470, 90], 'modificări ale substanței cerebrale', { beats: [-1, 0] }), lbl([560, 80], 'termoliza se intensifică (cap)', { beats: [1] }), lbl([560, 80], 'sudorație cefalică → evaporare', { beats: [2] }), lbl([700, 620], 'sânge periferic răcit → vene endocraniene', { beats: [3] }), lbl([560, 560], 'sinus cavernos → arterele învecinate', { beats: [4] })],
    phase: (i) => ['40–40,5°C', 'termoliza intensificată', 'evaporare cefalică', 'sistemul venos endocranian', 'conducție'][i] || '',
    draw(g, t, b) {
      bgFill(g); const st = stage(b, 5);
      paint(g, head(), SKIN, SKIN_S, '#ffe2cc', [200, 110, 640, 710], OUT, 8);
      // creierul
      const hot = clamp(st) * (1 - 0.5 * clamp(st - 4.2));
      const br = blob(470, 300, 200, 140, -0.1, t, 0.07, 18, 3); paint(g, br, `rgb(${Math.round(lerp(240, 255, hot))},${Math.round(lerp(170, 110, hot))},${Math.round(lerp(200, 110, hot))})`, '#d98cb0', '#ffd6e8', bb(470, 300, 200, 140), OUT, 6);
      g.save(); g.clip(br); g.strokeStyle = 'rgba(150,60,110,.5)'; g.lineWidth = 5; for (let k = 0; k < 7; k++) { g.beginPath(); g.moveTo(290 + k * 55, 180); g.bezierCurveTo(320 + k * 55, 260, 270 + k * 55, 330, 310 + k * 55, 420); g.stroke(); } g.restore();
      // hipotalamusul
      paint(g, blob(500, 420, 30, 22, 0, t, 0.05, 10, 1), hot > 0.3 ? HOT : '#e07bb0', null, null, bb(500, 420, 30, 22), OUT, 4);
      if (b.i === 0 || b.i < 0) { thermometer(g, 150, 360, 220, 0.8); txt(g, '40°C', 150, 450, 30, HOT); }
      // sudorație pe cap + evaporare
      if (st > 1) { for (let k = 0; k < 8; k++) { const a = -2.6 + k * 0.28; const x = 520 + Math.cos(a) * 300, y = 360 + Math.sin(a) * 250; drop(g, x, y + ((t * 30 + k * 13) % 30), 0.9); heatWave(g, x, y - 20, 40, t + k, '#bfe8ff'); } }
      // venele faciale răcite → sinusul cavernos
      if (st > 3) { const f = clamp(st - 3); g.save(); g.strokeStyle = OUT; g.lineWidth = 22; g.lineCap = 'round'; const vp = new Path2D(); vp.moveTo(760, 380); vp.bezierCurveTo(720, 430, 640, 450, SIN[0], SIN[1]); vp.moveTo(740, 560); vp.bezierCurveTo(680, 540, 620, 500, SIN[0] + 10, SIN[1] + 10); g.stroke(vp); g.strokeStyle = COLD; g.lineWidth = 14; g.stroke(vp); g.restore();
        for (let k = 0; k < 6; k++) { const u = ((t * 0.25 + k / 6) % 1) * f; const x = lerp(760, SIN[0], u), y = lerp(380, SIN[1], u) + Math.sin(u * 3) * 20; g.save(); g.fillStyle = '#d9f0ff'; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.arc(x, y, 7, 0, 7); g.fill(); g.stroke(); g.restore(); } }
      // sinusul cavernos (albastru) cu carotida internă (roșu) prin el
      paint(g, blob(SIN[0], SIN[1], 70, 40, 0, t, 0.08, 12, 5), st > 3 ? '#4f8fe0' : '#6a5a8a', null, '#a8d3ff', bb(SIN[0], SIN[1], 70, 40), OUT, 5);
      const cool = clamp(st - 4); g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 20; const cp = new Path2D(); cp.moveTo(SIN[0] - 10, 700); cp.bezierCurveTo(SIN[0] - 60, 560, SIN[0] + 50, 470, SIN[0] - 20, 420); g.stroke(cp);
      g.strokeStyle = `rgb(${Math.round(lerp(230, 200, cool))},${Math.round(lerp(50, 90, cool))},${Math.round(lerp(60, 170, cool))})`; g.lineWidth = 12; g.stroke(cp); g.restore();
      if (st > 4) { for (let k = 0; k < 3; k++) { const a = -0.6 + k * 0.6; arrow(g, SIN[0] + 40 + Math.cos(a) * 10, SIN[1] + Math.sin(a) * 40, SIN[0] + 5, SIN[1] + Math.sin(a) * 20, '#ffd36e', 4); } txt(g, 'conducție', SIN[0] + 90, SIN[1] + 80, 22, '#ffd36e'); }
      ring(g, b, 0, 470, 300, 230, 170); ring(g, b, 1, 560, 200, 300, 120); ring(g, b, 2, 560, 200, 300, 120); ring(g, b, 3, 660, 470, 140, 110); ring(g, b, 4, SIN[0], SIN[1], 100, 70);
    },
  };
}

/* =================================================================== Î 3 */
// tipurile de hipertermie; hipertermia malignă; mialgie, insolație, arsuri
export function q3() {
  const X = [30, 355, 680], PW = 300;
  return {
    home: HOME,
    cams: [cam(390, 420, 1.0), cam(560, 430, 1.1), cam(760, 450, 1.1)],
    anchors: X.map((x) => [x + PW - 18, 72]),
    labels: [lbl([560, 880], 'anestezic halogenat / miorelaxant depolarizant', { beats: [1] })],
    phase: (i) => ['tipurile prezentate', 'hipertermia malignă', 'mialgie · insolație · arsuri'][i] || '',
    draw(g, t, b) {
      bgFill(g);
      panel(g, X[0], 70, PW, 560, 'TIPURI', WARM, b.i === 0); panel(g, X[1], 70, PW, 800, 'MALIGNĂ', HOT, b.i === 1); panel(g, X[2], 70, PW, 800, 'CELELALTE 3', '#ffd36e', b.i === 2, 26);
      // 1 · cele 4 tipuri prezentate în LP
      const sx = 180, sy = 190; g.save(); g.fillStyle = '#ffd34d'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.arc(sx, sy, 50, 0, 7); g.fill(); g.stroke(); for (let k = 0; k < 10; k++) { const a = k * 0.628 + t * 0.4; g.beginPath(); g.moveTo(sx + Math.cos(a) * 62, sy + Math.sin(a) * 62); g.lineTo(sx + Math.cos(a) * 85, sy + Math.sin(a) * 85); g.stroke(); } g.restore();
      ['hipertermia malignă', 'mialgia termică', 'insolația', 'arsurile'].forEach((s, k) => { pill(g, s, 180, 310 + k * 70, k === 0 ? '#b8323f' : '#c2642a', 21); });
      // 2 · malignă: fibra musculară, reticulul sarcoplasmic, receptorul pentru rianodină
      const mx = 505; const mf = new Path2D(); mf.roundRect(mx - 120, 170, 240, 380, 40); paint(g, mf, '#e77aa0', '#d8628c', '#ffc0d8', [mx - 120, 170, 240, 380], OUT, 6);
      g.save(); g.clip(mf); g.strokeStyle = 'rgba(150,40,90,.45)'; g.lineWidth = 4; for (let y = 180; y < 550; y += 18) { g.beginPath(); g.moveTo(mx - 120, y); g.lineTo(mx + 120, y); g.stroke(); } g.restore();
      const sr = new Path2D(); sr.roundRect(mx - 80, 250, 160, 70, 30); paint(g, sr, '#8fd0ff', null, '#d8f0ff', [mx - 80, 250, 160, 70], OUT, 5); txt(g, 'reticul', mx, 280, 18, '#fff'); txt(g, 'sarcoplasmic', mx, 304, 18, '#fff');
      const rel = b.i === 1 ? clamp((b.bt - 1) / 3) : b.i < 0 ? 1 : 0;
      paint(g, blob(mx, 330, 18, 14, 0, t, 0.05, 10, 2), '#ffe36e', null, null, bb(mx, 330, 18, 14), OUT, 4); txt(g, 'receptor', mx, 372, 16, '#fff', 'center', 800); txt(g, 'rianodină', mx, 392, 16, '#fff', 'center', 800);
      for (let k = 0; k < 18; k++) { const u = ((t * 0.5 + k / 18) % 1) * rel; if (u <= 0) continue; const a = (k * 2.4) % 6.28; const x = mx + Math.cos(a) * 100 * u, y = 340 + Math.abs(Math.sin(a)) * 190 * u; g.save(); g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.arc(x, y, 8, 0, 7); g.fill(); g.stroke(); g.restore(); }
      txt(g, 'Ca²⁺', mx - 70, 470, 24, '#ffe36e');
      // seringa cu anestezic
      g.save(); g.translate(mx - 40, 625); g.rotate(-0.5); g.fillStyle = '#e8e2f2'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(-60, -16, 110, 32, 8); g.fill(); g.stroke(); g.fillRect(50, -3, 40, 6); g.restore(); txt(g, 'anestezic', mx - 40, 668, 20, '#fff');
      thermometer(g, mx + 95, 790, 150, 0.4 + 0.55 * rel, HOT);
      txt(g, 'defecte genetice', mx - 20, 580, 18, '#e6dcff', 'center', 700);
      // 3 · mialgie (spasme), insolație (cap), arsuri (grade diferite)
      const ax = 830; const sp = REDUCED ? 0 : Math.abs(Math.sin(t * 9)) * (b.i === 2 || b.i < 0 ? 1 : 0.3);
      paint(g, spindle(ax, 205, 200 - 30 * sp, 54 + 14 * sp, 0, t, 3), '#e2626e', null, '#ffb3bd', bb(ax, 205, 100, 30), OUT, 5);
      txt(g, 'mialgie: spasme musculare', ax, 290, 18, '#e6dcff', 'center', 700);
      g.save(); g.fillStyle = SKIN; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(ax, 400, 46, 0, 7); g.fill(); g.stroke(); g.restore();
      for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; arrow(g, ax - 90 + k * 60, 310 + u * 20, ax - 30 + k * 25, 360, '#ffd34d', 5); }
      txt(g, 'insolație: cap → edem cerebral', ax, 480, 17, '#ffd36e', 'center', 800);
      ['#ffb0a0', '#ff7a6a', '#7a3030'].forEach((c, k) => { const y = 530 + k * 95; const base = new Path2D(); base.roundRect(ax - 120, y, 240, 75, 16); paint(g, base, c, null, null, [ax - 120, y, 240, 75], OUT, 5); });
      txt(g, 'arsuri: grade diferite', ax, 830, 19, '#fff', 'center', 800);
    },
  };
}

/* =================================================================== Î 4 */
// mecanismele hipotermiei
export function q4() {
  return {
    home: HOME,
    cams: [cam(260, 260, 1.5), cam(560, 260, 1.5), cam(830, 300, 1.45), cam(620, 600, 1.45), cam(820, 790, 1.6)],
    anchors: [[160, 90], [480, 90], [760, 90], [430, 470], [700, 680]],
    labels: [lbl([270, 450], 'pierdere excesivă / producție inadecvată', { beats: [0] }), lbl([560, 450], 'vasoconstricție · O₂ ↑ · glicogen ↓', { beats: [1] }), lbl([830, 490], 'metabolism ↓ · vâscozitate ↑ · acidoză', { beats: [2] }), lbl([600, 700], 'tahicardie → bradicardie → aritmii → asistolie', { beats: [3] }), lbl([700, 880], 'moartea celulară', { beats: [4] })],
    phase: (i) => ['↑ termoliză / ↓ termogeneză', 'vasoconstricție periferică', 'metabolism ↓, vâscozitate ↑', 'inima', 'moartea celulară'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#1d2546', '#0c1022'); const st = stage(b, 5);
      // termometrul care coboară
      thermometer(g, 70, 560, 400, 0.62 - 0.4 * clamp(st / 5), COLD); txt(g, '< 35°C', 70, 120, 26, ICE);
      // 1 · balanța pierdere / producție
      const tilt = 0.28 * clamp(st); g.save(); g.translate(270, 260); g.rotate(tilt); g.strokeStyle = OUT; g.lineWidth = 12; g.beginPath(); g.moveTo(-140, 0); g.lineTo(140, 0); g.stroke(); g.strokeStyle = '#e6dcff'; g.lineWidth = 6; g.stroke();
      [[-140, 'producție', WARM], [140, 'pierdere', COLD]].forEach(([x, s, c]) => { g.save(); g.translate(x, 0); g.rotate(-tilt); g.fillStyle = c; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(-60, 20, 120, 60, 14); g.fill(); g.stroke(); txt(g, s, 0, 62, 20, '#fff'); txt(g, x < 0 ? 'inadecvată' : 'excesivă', 0, 108, 17, x < 0 ? WARM : ICE, 'center', 700); g.restore(); }); g.restore();
      g.save(); g.fillStyle = '#e6dcff'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.moveTo(270, 260); g.lineTo(240, 340); g.lineTo(300, 340); g.closePath(); g.fill(); g.stroke(); g.restore();
      // 2 · vasul cutanat se strânge + frison
      const vc = clamp((st - 1) * 2); g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 50 - 38 * vc + 10; g.beginPath(); g.moveTo(470, 180); g.lineTo(650, 180); g.stroke(); g.strokeStyle = '#d5263f'; g.lineWidth = 50 - 38 * vc; g.stroke(); if (vc > 0.2) { arrow(g, 625, 110, 625, 160 - 14 * vc, '#fff', 4); arrow(g, 625, 250, 625, 200 + 14 * vc, '#fff', 4); } g.restore();
      txt(g, 'vas cutanat', 525, 140, 20, '#fff');
      person(g, 560, 330, 0.28, t, { col: '#d8e4ff', shade: '#a8b8e8' });
      if (vc > 0.3) { txt(g, 'O₂ ↑', 640, 300, 22, '#7fd0ff'); txt(g, 'glicogen ↓', 640, 330, 18, '#e6dcff', 'center', 700); }
      // 3 · metabolism, vâscozitate, acidoză
      const m = clamp((st - 2) * 2); dial(g, 830, 220, 70, 0.7 - 0.6 * m, 'metabolism');
      g.save(); g.fillStyle = '#7a1428'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(760, 340, 140, 60, 20); g.fill(); g.stroke(); g.restore();
      for (let k = 0; k < 4; k++) rbc(g, 780 + ((t * 40 * (1 - 0.7 * m) + k * 30) % 110), 370, 0.55, 0, t);
      pill(g, m > 0.5 ? 'pH ↓ (acidoză)' : 'pH', 830, 440, m > 0.5 ? '#c23a62' : '#5a4378', 20);
      // 4 · inima + ECG: ritm rapid, apoi rar
      const h = clamp(st - 3); const rate = st > 3 ? lerp(2.4, 0.9, h) : 2.2; heart(g, 300, 600, 0.9, Math.max(0, Math.sin(t * rate * 3)));
      const ex = 400, ey = 600, EW = 520; g.save(); g.fillStyle = '#0f2b1e'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(ex, ey - 90, EW, 180, 14); g.fill(); g.stroke(); g.beginPath(); g.rect(ex, ey - 90, EW, 180); g.clip();
      g.strokeStyle = '#7dff9a'; g.lineWidth = 4; g.beginPath(); const per = st > 3 ? lerp(120, 230, h) : 110; const off = (t * 120) % per;
      for (let x = 0; x <= EW; x += 2) { const u = ((x + off) % per); let y = 0; if (u > 20 && u < 26) y = -10; if (u >= 30 && u < 34) y = 12; if (u >= 34 && u < 40) y = -70; if (u >= 40 && u < 46) y = 22; if (u > 85 && u < 110) y = -14 * Math.sin((u - 85) / 25 * Math.PI); x ? g.lineTo(ex + x, ey + y) : g.moveTo(ex + x, ey + y); } g.stroke(); g.restore();
      // 5 · cristale de gheață într-o celulă
      const ic = clamp(st - 4); const cell = blob(820, 790, 110, 80, 0.1, t, 0.06, 14, 7); paint(g, cell, ic > 0.5 ? '#9fb4d8' : '#f2c4d8', null, null, bb(820, 790, 110, 80), OUT, 5);
      if (ic > 0) { for (let k = 0; k < 3; k++) iceCrystal(g, 770 + k * 50, 780 + (k % 2) * 20, 20 + 40 * ic, k + t * 0.1); }
    },
  };
}

/* =================================================================== Î 5 */
// cele trei faze ale hipotermiei
export function q5() {
  const TX = 430, top = 90, bot = 800; const yOf = (T) => lerp(top, bot, (37 - T) / 15); // 37 → 22
  const Z = [[35, 32, '#ffb347', 'EXCITAȚIE'], [32, 28, '#5fb4ff', 'INHIBIȚIE'], [28, 22, '#3949ab', 'CRITICĂ']];
  const PY = [80, 340, 600], PH = 230, PX = 540, PWD = 440;
  return {
    home: HOME,
    cams: PY.map((y) => cam(650, y + PH / 2, 1.4)),
    anchors: PY.map((y) => [PX, y]),
    labels: [],
    phase: (i) => ['agitație · 32–35°C', 'epuizare · 28–32°C', 'paralizie · sub 28°C'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#1d2546', '#0c1022');
      const tube = new Path2D(); tube.roundRect(TX - 32, top - 20, 64, bot - top + 40, 32); paint(g, tube, '#f6eef7', null, null, [TX - 32, top - 20, 64, bot - top + 40], OUT, 7);
      Z.forEach(([a, c, col], k) => { const on = b.i === k || b.i < 0; g.save(); g.globalAlpha = on ? 0.95 : 0.4; g.fillStyle = col; g.fillRect(TX - 26, yOf(a), 52, yOf(c) - yOf(a)); g.restore(); txt(g, `${a}°C`, TX - 50, yOf(a) + 9, 24, '#e6dcff', 'right');
        // conector zonă → panou
        g.save(); g.globalAlpha = on ? 0.9 : 0.3; g.strokeStyle = col; g.lineWidth = 4; g.setLineDash([8, 8]); g.beginPath(); g.moveTo(TX + 32, (yOf(a) + yOf(c)) / 2); g.lineTo(PX, PY[k] + PH / 2); g.stroke(); g.restore(); });
      txt(g, '37°C', TX - 50, top + 9, 22, '#9dff8a', 'right');
      const cur = b.i < 0 ? 26 : lerp(Z[b.i][0], Z[b.i][1], clamp(b.bt / 4)); g.save(); g.fillStyle = '#ff4d5e'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(TX - 40, yOf(cur)); g.lineTo(TX - 70, yOf(cur) - 14); g.lineTo(TX - 70, yOf(cur) + 14); g.closePath(); g.fill(); g.stroke(); g.restore();
      Z.forEach(([a, c, col, nm], k) => { const y0 = PY[k]; const on = b.i === k || b.i < 0; g.save(); g.globalAlpha = on ? 1 : 0.45; if (b.i === k) { g.shadowColor = col; g.shadowBlur = 26; } g.fillStyle = 'rgba(58,42,92,.7)'; g.strokeStyle = on ? col : 'rgba(255,255,255,.2)'; g.lineWidth = on ? 6 : 2; g.beginPath(); g.roundRect(PX, y0, PWD, PH, 22); g.fill(); g.stroke(); g.restore();
        g.save(); g.globalAlpha = on ? 1 : 0.45;
        txt(g, nm, PX + 270, y0 + 46, 30, col); const cx = PX + 280, cy = y0 + 95;
        if (k === 0) { person(g, PX + 70, y0 + 150, 0.24, t, { shake: on ? 1 : 0, col: '#d8e4ff', shade: '#a8b8e8' }); txt(g, 'frison · hiperglicemie', cx, cy, 22, '#fff'); txt(g, 'O₂ ↑ · tahicardie', cx, cy + 40, 22, '#ffb347'); txt(g, 'conștient (confuzie, apatie)', cx, cy + 78, 18, '#e6dcff', 'center', 700); }
        if (k === 1) { person(g, PX + 70, y0 + 150, 0.24, t, { col: '#c8d8f0', shade: '#98a8d8' }); txt(g, 'hipoglicemie', cx, cy, 24, '#5fb4ff'); txt(g, 'tulburări de ritm, conducere', cx, cy + 40, 19, '#fff'); txt(g, 'halucinații → comă', cx, cy + 78, 19, '#e6dcff', 'center', 700); }
        if (k === 2) { person(g, PX + 110, y0 + 150, 0.17, t, { lying: true, col: '#b8c4e0', shade: '#8898c8' }); txt(g, 'comă · fără reflexe pupilare', cx, cy - 5, 19, '#fff'); g.strokeStyle = '#7dff9a'; g.lineWidth = 4; g.beginPath(); for (let x = 0; x < 200; x += 3) { const y = cy + 35 + Math.sin(x * 0.4 + t * 9) * 9 * (0.5 + 0.5 * Math.sin(x * 0.07)); x ? g.lineTo(cx - 100 + x, y) : g.moveTo(cx - 100 + x, y); } g.stroke(); txt(g, 'fibrilație ventriculară · apnee', cx, cy + 82, 17, '#e6dcff', 'center', 700); txt(g, 'cristale de gheață', cx, cy + 108, 17, ICE, 'center', 700); }
        g.restore(); });
    },
  };
}

/* =================================================================== Î 6 */
// 40,5–43°C: șocul termic
export function q6() {
  const sk = (g, x, y, dry, t) => { // petic de piele cu pori
    const p = new Path2D(); p.roundRect(x - 130, y - 70, 260, 140, 20); paint(g, p, dry ? '#ff8a6a' : '#f6b896', null, null, [x - 130, y - 70, 260, 140], OUT, 5);
    for (let k = 0; k < 4; k++) { const px = x - 90 + k * 60; g.save(); g.fillStyle = OUT; g.beginPath(); g.ellipse(px, y + 10, 8, dry ? 2 : 6, 0, 0, 7); g.fill(); g.restore(); if (!dry) drop(g, px, y - 20 - ((t * 25 + k * 9) % 30), 0.8); }
    if (dry) for (let k = 0; k < 3; k++) heatWave(g, x - 60 + k * 60, y - 80, 50, t + k, HOT);
  };
  return {
    home: HOME,
    cams: [cam(700, 220, 1.6), cam(360, 380, 1.4), cam(780, 560, 1.5)],
    anchors: [[620, 110], [210, 230], [640, 455]],
    labels: [lbl([700, 340], 'centrul termoreglator hipotalamic: oprit', { beats: [0] }), lbl([360, 640], 'edem cerebral progresiv', { beats: [1] })],
    phase: (i) => ['centrul termoreglator oprit', 'edem cerebral progresiv', 'șoc termic'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#3a1424', '#140a12'); const st = stage(b, 3);
      // craniul + creierul care se umflă
      const sw = 1 + 0.12 * clamp(st - 1);
      g.save(); g.fillStyle = '#e8dcc8'; g.strokeStyle = OUT; g.lineWidth = 9; g.beginPath(); g.ellipse(370, 400, 250, 210, 0, 0, 7); g.fill(); g.stroke(); g.restore();
      const br = blob(370, 400, 215 * Math.min(sw, 1.08), 175 * sw, 0, t, 0.06, 18, 4); paint(g, br, st > 1 ? '#ff9ab8' : '#f3b6cf', '#d98cb0', '#ffe0ec', bb(370, 400, 215, 175), OUT, 6);
      g.save(); g.clip(br); g.strokeStyle = 'rgba(150,60,110,.45)'; g.lineWidth = 5; for (let k = 0; k < 7; k++) { g.beginPath(); g.moveTo(190 + k * 60, 240); g.bezierCurveTo(220 + k * 60, 340, 170 + k * 60, 420, 210 + k * 60, 560); g.stroke(); } g.restore();
      if (st > 1) { const f = clamp(st - 1); for (let k = 0; k < 6; k++) { const a = k * 1.05; arrow(g, 370 + Math.cos(a) * 140, 400 + Math.sin(a) * 110, 370 + Math.cos(a) * (190 + 20 * f), 400 + Math.sin(a) * (150 + 20 * f), '#7fd0ff', 5); } }
      // termostatul (centrul termoreglator) se oprește
      const off = clamp(st * 1.2); dial(g, 700, 200, 80, lerp(0.85, 1, off), ''); g.save(); g.globalAlpha = off; pill(g, 'OFF', 700, 205, '#c23a62', 26); g.restore();
      thermometer(g, 900, 320, 220, 0.9 + 0.05 * Math.sin(t)); txt(g, '40,5–43°C', 900, 80, 24, HOT);
      // șoc termic (tabelul din LP: 40–44°C → insuficiență multiplă de organ)
      const s3 = clamp(st - 2); if (s3 > 0) { g.save(); g.globalAlpha = s3; node(g, 'ȘOC TERMIC', 780, 520, 290, 66, '#c23a62', b.i === 2, 28); txt(g, 'insuficiență multiplă', 780, 610, 22, '#ffd0c0', 'center', 800); txt(g, 'de organ', 780, 640, 22, '#ffd0c0', 'center', 800); g.restore(); }
      ring(g, b, 0, 700, 200, 110); ring(g, b, 1, 370, 400, 260, 220); ring(g, b, 2, 780, 570, 190, 110);
    },
  };
}

/* =================================================================== Î 7 */
// termoliza: iradiere, evaporare, convecție, conducție
export function q7() {
  // ordinea din LP: radiație, convecție, conducție, evaporare
  const X = [20, 265, 510, 755], PW = 225, C = ['#ff7a5c', '#9dff8a', '#ffd36e', '#7fd0ff'], N = ['RADIAȚIE', 'CONVECȚIE', 'CONDUCȚIE', 'EVAPORARE'];
  return {
    home: HOME,
    cams: X.map((x) => cam(Math.min(Math.max(x + PW / 2, 330), 670), 360, 1.35)),
    anchors: X.map((x) => [x + PW - 18, 72]),
    labels: [],
    phase: (i) => ['radiație de la corp', 'flux de aer', 'contact direct', 'sudoare + respirație'][i] || '',
    draw(g, t, b) {
      bgFill(g);
      X.forEach((x, k) => { panel(g, x, 70, PW, 560, N[k], C[k], b.i === k, 26); });
      const cx = (k) => X[k] + PW / 2;
      const arm = (k, y = 300) => { const p = new Path2D(); p.roundRect(cx(k) - 70, y, 140, 90, 30); paint(g, p, SKIN, SKIN_S, '#ffe2cc', [cx(k) - 70, y, 140, 90], OUT, 5); };
      // 1 · radiație: unde de căldură care pleacă de la corp spre mediu
      arm(0, 380); g.save(); g.fillStyle = '#4a6aa8'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(cx(0) - 90, 140, 180, 40, 10); g.fill(); g.stroke(); g.restore(); txt(g, 'mediu', cx(0), 220, 18, ICE, 'center', 700);
      for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; g.save(); g.globalAlpha = 1 - u * 0.6; heatWave(g, cx(0) - 40 + k * 40, 370 - u * 120, 60, t + k, '#ff7a5c'); g.restore(); }
      txt(g, 'radiație de la corp', cx(0), 530, 18, '#ff7a5c', 'center', 800);
      // 2 · convecție: fluxul de aer trece pe lângă braț și ia căldura
      arm(1, 380); for (let k = 0; k < 6; k++) { const u = (t * 0.35 + k / 6) % 1; const y = 200 + (k % 3) * 55; const x = X[1] + u * PW; g.save(); g.strokeStyle = u > 0.5 ? '#ff9a7a' : '#9dff8a'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(x - 30, y); g.quadraticCurveTo(x - 15, y - 10, x, y); g.stroke(); g.restore(); }
      txt(g, 'flux de aer →', cx(1), 180, 20, '#9dff8a'); txt(g, 'aerul duce căldura', cx(1), 530, 18, '#9dff8a', 'center', 800);
      // 3 · conducție: contact direct cu o suprafață rece
      g.save(); g.fillStyle = '#2f6fc0'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(X[2] + 15, 330, PW - 30, 150, 14); g.fill(); g.stroke(); g.restore(); arm(2, 280);
      for (let k = 0; k < 4; k++) { const u = (t * 0.7 + k / 4) % 1; arrow(g, cx(2) - 45 + k * 30, 370, cx(2) - 45 + k * 30, 370 + 50 * u + 10, ICE, 4); }
      txt(g, 'suprafață rece', cx(2), 520, 18, '#ffd36e', 'center', 800); txt(g, 'contact direct', cx(2), 560, 18, '#e6dcff', 'center', 700);
      // 4 · evaporare: picătura de sudoare se transformă în vapori
      arm(3, 380); for (let k = 0; k < 3; k++) { const u = (t * 0.4 + k / 3) % 1; const dx = cx(3) - 40 + k * 40; if (u < 0.5) drop(g, dx, 370, 1.1 - u); else { g.save(); g.globalAlpha = 1.4 - u * 1.4; g.strokeStyle = '#d9f0ff'; g.lineWidth = 5; g.beginPath(); for (let j = 0; j < 10; j++) { const yy = 360 - (u - 0.5) * 300 - j * 8; g.lineTo(dx + Math.sin(j + t * 4) * 8, yy); } g.stroke(); g.restore(); } }
      txt(g, 'sudoare + respirație', cx(3), 530, 18, '#7fd0ff', 'center', 800);
      if (b.i < 1) { txt(g, 'Radiație · Convecție · Conducție · Evaporare', 500, 700, 28, '#ffe36e'); txt(g, 'efectori (schema LP): vasodilatație + sudorație', 500, 745, 20, '#e6dcff', 'center', 700); }
    },
  };
}

/* =================================================================== Î 8 */
// termogeneza: celular, organe și mușchi, reglare hormonală
export function q8() {
  const X = [30, 355, 680], PW = 300;
  return {
    home: HOME,
    cams: [cam(260, 420, 1.15), cam(505, 420, 1.15), cam(760, 420, 1.15)],
    anchors: X.map((x) => [x + PW - 18, 72]),
    labels: [],
    phase: (i) => ['termogeneza = producerea căldurii', 'sursa 1: metabolismul celular', 'sursa 2: ATP-aza Na/K'][i] || '',
    draw(g, t, b) {
      bgFill(g);
      panel(g, X[0], 70, PW, 620, 'DEFINIȚIE', '#c9b3ff', b.i === 0, 26); panel(g, X[1], 70, PW, 620, 'SURSA 1', HOT, b.i === 1, 26); panel(g, X[2], 70, PW, 620, 'SURSA 2', WARM, b.i === 2, 26);
      // 1 · balanța termogeneză – termoliză în echilibru
      const bx = 180, by = 300, tilt = REDUCED ? 0 : 0.05 * Math.sin(t * 1.2);
      g.save(); g.fillStyle = '#5a3fb0'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.moveTo(bx, by); g.lineTo(bx - 34, by + 90); g.lineTo(bx + 34, by + 90); g.closePath(); g.fill(); g.stroke(); g.restore();
      g.save(); g.translate(bx, by); g.rotate(tilt); g.strokeStyle = OUT; g.lineWidth = 12; g.beginPath(); g.moveTo(-110, 0); g.lineTo(110, 0); g.stroke(); g.strokeStyle = '#e6dcff'; g.lineWidth = 6; g.stroke();
      [[-110, WARM], [110, COLD]].forEach(([x, c]) => { g.save(); g.translate(x, 0); g.rotate(-tilt); g.fillStyle = c; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(-45, 18, 90, 50, 12); g.fill(); g.stroke(); g.restore(); }); g.restore();
      txt(g, 'termogeneză', bx - 85, by + 150, 19, WARM, 'center', 800); txt(g, 'termoliză', bx + 90, by + 150, 19, COLD, 'center', 800);
      txt(g, 'producerea căldurii', bx, 200, 22, '#fff'); txt(g, 'echilibru', bx, 500, 20, '#e6dcff', 'center', 700);
      // 2 · mitocondria: fosforilarea oxidativă, 70%
      const mx = 505; const mi = blob(mx, 300, 110, 60, 0.1, t, 0.04, 14, 2); paint(g, mi, '#ff9a7a', '#e2705a', '#ffd0c0', bb(mx, 300, 110, 60), OUT, 6);
      g.save(); g.clip(mi); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); for (let x = mx - 100; x < mx + 100; x += 4) g.lineTo(x, 300 + Math.sin(x * 0.12) * 28); g.stroke(); g.restore();
      for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1; heatWave(g, mx - 60 + k * 40, 230 - u * 30, 40, t + k, HOT); }
      txt(g, 'metabolism energetic celular', mx, 410, 18, '#ffd0c0', 'center', 800); txt(g, 'fosforilare oxidativă', mx, 440, 18, '#ffd0c0', 'center', 700);
      const pc = b.i === 1 ? ease(clamp(b.bt / 2.5)) : 1; g.save(); g.globalAlpha = 0.4 + 0.6 * pc; txt(g, '70%', mx, 545, 64, '#ffe36e'); g.restore(); txt(g, 'principala sursă', mx, 600, 20, '#fff', 'center', 800);
      // 3 · membrana cu pompa Na/K
      const px = 830; g.save(); g.fillStyle = '#e8d070'; g.strokeStyle = OUT; g.lineWidth = 4; g.fillRect(X[2] + 20, 310, PW - 40, 50); g.strokeRect(X[2] + 20, 310, PW - 40, 50); g.restore();
      paint(g, blob(px, 335, 44, 58, 0, t, 0.04, 12, 4), '#7c4fd6', null, '#c9b3ff', bb(px, 335, 44, 58), OUT, 5);
      const pu = REDUCED ? 0.5 : (t * 0.6) % 1; pill(g, 'Na⁺', px - 85, lerp(450, 220, pu), '#3a6ab0', 16); pill(g, 'K⁺', px + 85, lerp(220, 450, pu), '#7a3a5a', 16);
      for (let k = 0; k < 2; k++) { const u = (t * 0.5 + k / 2) % 1; heatWave(g, px - 20 + k * 40, 260 - u * 30, 36, t + k, WARM); }
      txt(g, 'ATP-aza Na/K', px, 500, 22, '#c9b3ff'); txt(g, 'membrana celulară', px, 535, 18, '#e6dcff', 'center', 700); txt(g, 'a doua sursă', px, 600, 20, '#fff', 'center', 800);
    },
  };
}

/* =================================================================== Î 9 */
// efectele locale ale frigului: direct (gheață), indirect (vase), degerăturile
export function q9() {
  const X = [30, 355, 680], PW = 300;
  return {
    home: HOME,
    cams: [cam(260, 420, 1.15), cam(505, 420, 1.15), cam(760, 420, 1.15)],
    anchors: X.map((x) => [x + PW - 18, 72]),
    labels: [],
    phase: (i) => ['vasoconstricție → microtromboze', 'histamină → edeme', 'frig prelungit → degerături'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#1d2546', '#0c1022');
      panel(g, X[0], 70, PW, 760, 'VASE', '#ff8a8a', b.i === 0, 26); panel(g, X[1], 70, PW, 760, 'HISTAMINĂ', '#ffe36e', b.i === 1, 26); panel(g, X[2], 70, PW, 760, 'FRIG PRELUNGIT', ICE, b.i === 2, 24);
      // 1 · vasul se strânge, fluxul încetinește → microtromboze → necroze
      const vi = b.i === 0 ? clamp(b.bt / 4.5) : 1; const vx = 180; const vw = lerp(54, 26, clamp(vi * 1.6));
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = vw + 10; g.beginPath(); g.moveTo(vx, 160); g.lineTo(vx, 520); g.stroke(); g.strokeStyle = '#f5b9cf'; g.lineWidth = vw; g.stroke(); g.restore();
      if (vi > 0.2) { arrow(g, vx - 75, 300, vx - 25 - (54 - vw) / 2, 300, '#fff', 4); arrow(g, vx + 75, 300, vx + 25 + (54 - vw) / 2, 300, '#fff', 4); }
      for (let k = 0; k < 6; k++) { const u = (t * 0.25 * (1 - 0.8 * vi) + k / 6) % 1; const y = 160 + u * (vi > 0.6 ? 220 : 360); rbc(g, vx, y, 0.55, 1.57, t); }
      if (vi > 0.6) { paint(g, blob(vx, 390, 16, 26, 0, t, 0.1, 10, 3), '#7a1428', null, null, bb(vx, 390, 16, 26), OUT, 4); txt(g, 'microtromboze', vx, 455, 18, '#ff8a8a', 'center', 800); }
      const nec = clamp((vi - 0.6) / 0.4); paint(g, blob(vx, 620, 110, 60, 0, t, 0.08, 12, 9), `rgb(${Math.round(lerp(242, 70, nec))},${Math.round(lerp(196, 50, nec))},${Math.round(lerp(216, 60, nec))})`, null, null, bb(vx, 620, 110, 60), OUT, 5);
      txt(g, nec > 0.5 ? 'necroze' : 'flux încetinit', vx, 720, 20, '#ff8a8a');
      // 2 · histamina → hiperpermeabilitate capilară → apa iese în interstițiu (edeme)
      const hi = b.i === 1 ? clamp(b.bt / 4) : b.i < 0 || b.i > 1 ? 1 : 0.15; const hx = 505;
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 64; g.beginPath(); g.moveTo(hx, 160); g.lineTo(hx, 560); g.stroke(); g.strokeStyle = '#f5b9cf'; g.lineWidth = 54; g.stroke(); g.restore();
      for (let k = 0; k < 5; k++) { const u = (t * 0.6 + k / 5) % 1; g.save(); g.globalAlpha = hi; g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.arc(hx + 40 + u * 70, 220 + k * 25, 6, 0, 7); g.fill(); g.stroke(); g.restore(); }
      txt(g, 'histamină', hx + 75, 200, 18, '#ffe36e', 'center', 800);
      if (hi > 0.4) { for (let k = 0; k < 5; k++) drop(g, hx - 45 - ((t * 20 + k * 15) % 60), 300 + k * 45, 0.8, '#9ec5ff'); txt(g, 'apa → interstițiu', hx, 610, 18, '#9ec5ff', 'center', 800); }
      txt(g, 'hiperpermeabilitate', hx, 660, 18, '#e6dcff', 'center', 700); txt(g, 'edeme', hx, 720, 26, '#9ec5ff');
      // 3 · frig prelungit: degerături (degete care se închid la culoare) + necroză grăsoasă
      const dg = b.i === 2 ? clamp(b.bt / 4) : b.i < 0 ? 1 : 0; const dx = 830;
      for (let k = 0; k < 4; k++) { const f = new Path2D(); f.roundRect(dx - 95 + k * 48, 170 + Math.abs(k - 1.5) * 18, 40, 170, 20); const c = Math.round(lerp(238, 60, clamp(dg * 1.4 - k * 0.12))); paint(g, f, `rgb(${c},${Math.round(c * 0.85)},${Math.round(c * 0.9)})`, null, null, [dx - 95, 170, 200, 170], OUT, 5); }
      for (let j = 0; j < 3; j++) iceCrystal(g, dx - 60 + j * 60, 150, 12, t * 0.2);
      txt(g, 'degerături', dx, 400, 24, ICE);
      paint(g, blob(dx, 540, 100, 55, 0, t, 0.06, 12, 4), `rgb(${Math.round(lerp(255, 120, dg))},${Math.round(lerp(220, 80, dg))},${Math.round(lerp(120, 40, dg))})`, null, null, bb(dx, 540, 100, 55), OUT, 5);
      txt(g, 'țesut grăsos', dx, 547, 18, '#fff', 'center', 800); txt(g, 'necroză grăsoasă', dx, 640, 22, '#ffd36e');
    },
  };
}
