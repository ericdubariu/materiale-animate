// Scenele pentru Partea E (anafilaxia, adrenalina) + scripturile OSPE + final (decodorul pe cazuri, carduri, galerie).
import { W, H, HOME, cam, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, loopT, txt, pill, dot, ell, arr, cross, check,
  heart, icon, bronchus, vesselX, gauge, mastocyte, antiY, galpha } from './fk.js';
import { lymphocyte as lymph, plasmocyte as plasma } from './kit2d.js';

const star = (g, x, y, r, a = 1) => { g.save(); g.globalAlpha = clamp(a); const p = new Path2D(); for (let k = 0; k < 16; k++) { const rr = k % 2 ? r * 0.45 : r; const an = k / 16 * Math.PI * 2; k ? p.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : p.moveTo(x + rr, y); } p.closePath(); g.fillStyle = '#ffd34a'; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(p); g.restore(); };

/* =================================================== ANAFILAXIA: SENSIBILIZARE + DEGRANULARE */
export function anaph() {
  const MC = [830, 200]; const MB = [330, 640];
  return {
    home: HOME, anchors: [[30, 110], [MB[0] - 140, MB[1] - 150], [600, 455], [950, 700]],
    phase: (i) => ['sensibilizare: IgE pe mastocit', 're-expunere: degranulare', 'vasodilatație → TA ↓', 'bronhoconstricție + edem'][i] || '',
    draw(g, t, b) {
      bg(g);
      const ph = b.i < 0 ? 4 : b.i + clamp(b.bt / (b.bd * 0.8));
      const p = (k) => clamp(ph - k);
      panel(g, 15, 15, 970, 360, { stroke: b.i === 0 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 0 ? 5 : 3 });
      txt(g, 'prima expunere = sensibilizare (fără simptome)', 420, 355, 18, C.dim, { w: 700 });
      // sus: antigen → limfocit B → plasmocit → IgE → mastocit
      const s1 = p(0);
      for (let j = 0; j < 3; j++) { const q = ease(clamp(s1 / 0.3)); star(g, lerp(70 + j * 25, 250, q), lerp(150 + j * 40, 190, q), 16, 1 - 0.7 * clamp((s1 - 0.3) * 3)); }
      txt(g, 'antigen\n(antibioticul)', 85, 300, 17, '#ffd34a');
      const toP = clamp((s1 - 0.3) / 0.2);
      if (toP < 1) { g.save(); g.globalAlpha = 1 - toP; lymph(g, 320, 190, 1.6, t); g.restore(); }
      if (toP > 0) { g.save(); g.globalAlpha = toP; plasma(g, 320, 190, 0.95, 0, t); g.restore(); }
      txt(g, toP > 0.5 ? 'plasmocit' : 'limfocit B', 320, 300, 18, '#c8c1f7');
      const fly = clamp((s1 - 0.5) / 0.4);
      for (let j = 0; j < 7; j++) { const a = -Math.PI * 0.95 + j * Math.PI * 0.95 / 6; const tx = MC[0] + Math.cos(a) * 86, ty = MC[1] + Math.sin(a) * 86; const q = ease(clamp(fly * 1.4 - j * 0.06)); if (fly > 0) antiY(g, lerp(400 + j * 18, tx, q), lerp(200 + (j % 3) * 30, ty, q), lerp(0, a + Math.PI / 2, q)); }
      if (fly > 0 && fly < 1) txt(g, 'IgE', 520, 140, 22, '#7fd36a');
      mastocyte(g, MC[0], MC[1], 80, 0, t, { ige: fly >= 1 ? 1 : 0 });
      txt(g, 'mastocit (sau bazofil)', MC[0], 330, 18, '#d6a7ff');
      // jos: re-expunere
      panel(g, 15, 395, 970, 520, { stroke: b.i >= 1 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i >= 1 ? 5 : 3 });
      txt(g, 'după 8 luni: re-expunerea', 330, 425, 20, C.cream, { w: 700 });
      const s2 = p(1); const deg = clamp((s2 - 0.35) / 0.5);
      mastocyte(g, MB[0], MB[1], 92, deg, t, { ige: 1 });
      for (let j = 0; j < 4; j++) { const a = -Math.PI * 0.8 + j * 0.45; const q = ease(clamp(s2 / 0.35)); star(g, lerp(80 + j * 40, MB[0] + Math.cos(a) * 128, q), lerp(470, MB[1] + Math.sin(a) * 128, q), 15, ph >= 1 ? 1 : 0); }
      txt(g, deg > 0.3 ? 'degranulare: histamină + LT, PG, PAF' : 'antigenul leagă IgE', MB[0], 880, 19, '#d6a7ff');
      // efecte
      const s3 = p(2), s4 = p(3);
      const hist = (x1, y1, q) => { for (let j = 0; j < 6; j++) { const qq = clamp(q * 1.4 - j * 0.08); dot(g, lerp(MB[0] + 90, x1 + (j % 3) * 14, qq), lerp(MB[1] - 20 + j * 8, y1 + (j % 2) * 16, qq), 7, '#b06ad0', { ow: 2, alpha: qq > 0 && qq < 1 ? 1 : 0 }); } };
      hist(600, 560, s3); hist(840, 760, s4);
      const vd = ease(clamp((s3 - 0.3) / 0.6));
      vesselX(g, 620, 560, 62 + 14 * vd, vd, { leak: vd }); gauge(g, 770, 560, 58, lerp(0.75, 0.12, vd), 'TA');
      txt(g, vd > 0.5 ? 'vasodilatație → TA ↓ → colaps' : 'vasul', 700, 660, 18, vd > 0.5 ? C.key : C.cream, { w: 700 });
      const bc = ease(clamp((s4 - 0.3) / 0.6));
      bronchus(g, 860, 780, 72, lerp(0.85, 0.1, bc), { edema: bc > 0.3 });
      txt(g, bc > 0.5 ? 'bronhoconstricție\n+ edem' : 'bronhia', 680, 790, 18, bc > 0.5 ? C.gq : C.cream, { w: 700 });
    },
  };
}

/* =================================================== ADRENALINA PE α1 / β1 / β2 */
export function adren() {
  const CEN = [500, 430]; const TG = [[230, 200], [770, 200], [500, 760]];
  return {
    home: HOME, anchors: [[TG[0][0] - 150, TG[0][1] - 130], [TG[1][0] + 120, TG[1][1] - 130], [TG[2][0] - 220, TG[2][1] - 60], [700, 545]],
    phase: (i) => ['α1: vasoconstricție', 'β1: cordul', 'β2: bronhii + mastocit', 'restul tratamentului'][i] || '',
    draw(g, t, b) {
      bg(g);
      const s = (k) => (b.i < 0 || b.i > k ? 1 : b.i < k ? 0 : clamp(b.bt / (b.bd * 0.8)));
      // autoinjectorul
      g.save(); g.translate(CEN[0], CEN[1]); g.rotate(-0.3);
      const body = new Path2D(); body.roundRect(-36, -110, 72, 220, 22); g.fillStyle = '#f2f2f2'; g.fill(body); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(body);
      const tip = new Path2D(); tip.roundRect(-30, 100, 60, 40, 12); g.fillStyle = '#ff8a2a'; g.fill(tip); g.stroke(tip);
      const cap = new Path2D(); cap.roundRect(-30, -140, 60, 36, 10); g.fillStyle = '#2f8ad8'; g.fill(cap); g.stroke(cap);
      g.restore();
      txt(g, 'adrenalină\n0,5 mg i.m.', CEN[0] + 150, CEN[1] + 10, 24, C.na);
      const path = (k, q, col) => { const [x, y] = TG[k]; arr(g, CEN[0] + (x - CEN[0]) * 0.25, CEN[1] + (y - CEN[1]) * 0.25, CEN[0] + (x - CEN[0]) * 0.62, CEN[1] + (y - CEN[1]) * 0.62, col, 6, 0.5 + 0.5 * q); if (q > 0 && q < 1) for (let j = 0; j < 5; j++) { const v = ((j / 5) + t * 0.6) % 1; dot(g, lerp(CEN[0], x, v * 0.8), lerp(CEN[1], y, v * 0.8), 8, C.na, { ow: 2 }); } };
      // 1 α1 vasul
      const a1 = s(0); path(0, a1, C.gq);
      vesselX(g, TG[0][0] - 50, TG[0][1], 70, 1 - 0.85 * ease(a1), { leak: 1 - ease(a1) }); gauge(g, TG[0][0] + 110, TG[0][1], 58, lerp(0.12, 0.75, ease(a1)), 'TA');
      txt(g, 'α1 · vase', TG[0][0], TG[0][1] - 120, 22, C.gq); txt(g, a1 > 0.5 ? 'vasoconstricție → TA ↑' : '', TG[0][0], TG[0][1] + 110, 18, C.cream, { w: 700 });
      // 2 β1 cordul
      const b1 = s(1); path(1, b1, C.gs);
      const rate = lerp(1.6, 4.5, ease(b1)); const beat = Math.max(0, Math.sin(t * rate)) ** 6; heart(g, TG[1][0], TG[1][1], 0.85 + 0.15 * ease(b1), beat * (0.3 + 0.9 * b1));
      txt(g, 'β1 · cord', TG[1][0], TG[1][1] - 120, 22, C.gs); txt(g, b1 > 0.5 ? 'forță + frecvență ↑' : '', TG[1][0], TG[1][1] + 105, 18, C.cream, { w: 700 });
      // 3 β2 bronhii + mastocit
      const b2 = s(2); path(2, b2, C.gs);
      bronchus(g, TG[2][0] - 80, TG[2][1], 78, lerp(0.12, 0.85, ease(b2)), { edema: b2 < 0.5 });
      mastocyte(g, TG[2][0] + 110, TG[2][1], 64, lerp(0.6, 0, ease(b2)), t);
      txt(g, 'β2 · bronhii + mastocit', TG[2][0], TG[2][1] - 110, 22, C.gs); txt(g, b2 > 0.5 ? 'bronhodilatație · mediatori ↓' : '', TG[2][0], TG[2][1] + 110, 18, C.cream, { w: 700 });
      // 4 restul
      const r4 = s(3); const RS = ['hidrocortizon hemisuccinat', 'antihistaminic H1', 'fluide (plasmă)', 'O₂'];
      panel(g, 690, 560, 290, 240, { fill: 'rgba(255,236,200,.06)', stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3 });
      RS.forEach((r, j) => pill(g, 835, 610 + j * 50, 260, 40, '#fff3e0', r, { size: 16, alpha: 0.35 + 0.65 * clamp(r4 * 4 - j) }));
    },
  };
}

/* =================================================== SCRIPTUL OSPE (coloana îngustă) */
const CHAINS = {
  B: [['agonist', '#ff9a4a'], ['receptori din centrul respirator', '#7ad3a0'], ['mesageri → respirație ↓', C.gi], ['antagonist competitiv', '#ff6b5e'], ['naloxonă', '#ffd0c8']],
  D: [['agonist', C.gs], ['Gs → AMPc ↑ → PKA', C.gs], ['Ca²⁺-ATPaza, calsechestrina', C.camp], ['Ca²⁺ ↓ → relaxare', C.ca], ['bronhodilatator, tocolitic', '#ffd0c8']],
  E: [['antagonist β1', C.gi], ['Gs din cord blocată', C.gs], ['AMPc, PKA, calciductina oprite', '#d8cde0'], ['Ca²⁺ ↓ → cardioinhibiție', C.ca], ['angină, HTA, aritmii, IC', '#ffd0c8']],
  alergie: [['histamina (mastocit)', '#d6a7ff'], ['H1 → Gq', C.gq], ['PLC → IP3 + DAG', '#ffe08a'], ['Ca²⁺ ↑ + PKC', C.ca], ['bronhoconstricție → dispnee', '#ffd0c8']],
  soc: [['tip I, re-expunere', '#ffd34a'], ['IgE pe mastocite', '#7fd36a'], ['degranulare: histamină', '#d6a7ff'], ['TA ↓ · bronhoconstricție', C.key], ['adrenalină 0,5 mg i.m.', '#ffd0c8']],
};
const toSec = (s) => { const [m, x] = s.split(':').map(Number); return m * 60 + x; };
export function script({ spec }) {
  const o = spec.sceneOpts || {}; const WS = 600, HS = 897;
  const seg = spec.script.map((s) => { const m = s.at.match(/(\d+:\d+)\s*[–-]\s*(\d+:\d+)/); return m ? [toSec(m[1]), toSec(m[2])] : null; });
  const CHN = CHAINS[o.f] || [];
  return {
    W: WS, H: HS, home: cam(300, 448, 1), anchors: [],
    phase: (i) => (i >= 0 ? `${spec.script[i].tm} · ${spec.script[i].at}` : ''),
    draw(g, t, b) {
      bg(g, WS, HS);
      panel(g, 30, 30, 540, 410, {});
      txt(g, 'lanțul de spus', 300, 62, 19, C.dim, { w: 700 });
      CHN.forEach(([s, c], k) => { const y = 112 + k * 70; pill(g, 300, y, 470, 50, c, s, { size: 18, col: OUT }); if (k < 4) txt(g, '↓', 300, y + 36, 18, C.cream, { stroke: false }); });
      const C0 = [300, 660], R = 150; const tot = 180;
      seg.forEach((sg, i) => { if (!sg) return; const a0 = sg[0] / tot, a1 = sg[1] / tot; const onn = i === b.i, done = b.i > i; g.save(); g.strokeStyle = OUT; g.lineWidth = 40; g.beginPath(); g.arc(C0[0], C0[1], R, -Math.PI / 2 + a0 * Math.PI * 2, -Math.PI / 2 + a1 * Math.PI * 2 - 0.03); g.stroke(); g.strokeStyle = onn ? C.hi : done ? '#C27A10' : '#4a3d30'; g.lineWidth = 30; if (onn) { g.shadowColor = C.hi; g.shadowBlur = 20; } g.stroke(); g.restore(); });
      let f = 0; const sg = seg[b.i]; if (b.i >= 0 && sg) f = (sg[0] + (sg[1] - sg[0]) * clamp(b.bt / b.bd)) / tot;
      const ang = -Math.PI / 2 + f * Math.PI * 2; dot(g, C0[0] + Math.cos(ang) * R, C0[1] + Math.sin(ang) * R, 17, '#fff', { ow: 5 });
      const lab = b.i >= 0 && !sg ? '1 min' : '3 min'; txt(g, b.i >= 0 && sg ? `${Math.floor(f * 3)}:${String(Math.floor((f * 180) % 60)).padStart(2, '0')}` : lab, C0[0], C0[1] - 6, 46, '#fff');
      txt(g, b.i >= 0 && !sg ? 'citești + ciornă' : 'cu voce tare', C0[0], C0[1] + 40, 19, C.dim, { w: 700 });
    },
  };
}

/* =================================================== DECODORUL PE CELE 5 CAZURI (coloana îngustă) */
export function decRows() {
  const WW = 600, HH = 897; const RH = 166;
  const R = [
    { n: '1 · supradoză B', act: true, gc: C.gi, gl: 'Gi', ico: 'brain', e: 'naloxonă' },
    { n: '2 · substanța D', act: true, gc: C.gs, gl: 'Gs', ico: 'bronchi', e: 'β2-agonist' },
    { n: '3 · substanța E', act: false, gc: C.gs, gl: 'Gs', ico: 'heart', e: 'β1-blocant' },
    { n: '4 · alergie', act: true, gc: C.gq, gl: 'Gq', ico: 'bronchi', e: 'bronhoconstricție' },
    { n: '5 · re-expunere', act: true, gc: C.gq, gl: 'Gq + Gs', ico: 'vessel', e: 'adrenalină i.m.' },
  ];
  return {
    W: WW, H: HH, home: cam(WW / 2, HH / 2, 1), anchors: R.map((_, k) => [34, 14 + k * (RH + 10) + 26]),
    draw(g, t, b) {
      bg(g, WW, HH);
      R.forEach((r, k) => {
        const y = 14 + k * (RH + 10); const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.5;
        panel(g, 12, y, WW - 24, RH, { fill: on ? 'rgba(255,207,133,.15)' : 'rgba(255,236,200,.06)', stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3 });
        g.save(); g.globalAlpha = a;
        txt(g, r.n, 300, y + 30, 21, C.hi);
        check(g, 70, y + 100, 18, C.gs, 1); txt(g, 'leagă', 70, y + 140, 15, C.cream, { w: 700 });
        if (r.act) check(g, 160, y + 100, 18, C.gs, 1); else cross(g, 160, y + 100, 16, C.key, 1); txt(g, r.act ? 'activează' : 'nu activează', 160, y + 140, 15, C.cream, { w: 700 });
        pill(g, 270, y + 100, 100, 44, r.gc, r.gl, { size: 18 });
        icon(g, r.ico, 370, y + 98, 0.6);
        pill(g, 495, y + 100, 170, 50, '#ffd0c8', r.e, { size: 16 });
        g.restore();
      });
    },
  };
}

/* =================================================== CARDURI (capcane, recapitulare) */
export function cards({ spec }) {
  const o = spec.sceneOpts; const T = o.items; const cols = o.cols || 3; const rows = Math.ceil(T.length / cols);
  const WW = o.narrow ? 600 : 1000, HH = o.narrow ? 897 : 934;
  const GX = 14, GY = 14; const w = (WW - 30 - GX * (cols - 1)) / cols; const h = (HH - 30 - GY * (rows - 1)) / rows;
  const pos = T.map((_, k) => { const r = Math.floor(k / cols); const n = r === rows - 1 ? T.length - r * cols : cols; const off = (cols - n) * (w + GX) / 2; return [15 + off + (k % cols) * (w + GX), 15 + r * (h + GY)]; });
  return {
    W: WW, H: HH, home: { x: WW / 2, y: HH / 2, z: 1 }, anchors: pos.map(([x, y]) => [x + 26, y + 26]),
    draw(g, t, b) {
      bg(g, WW, HH);
      T.forEach((it, k) => {
        const [x, y] = pos[k]; const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.5;
        panel(g, x, y, w, h, { fill: on ? 'rgba(255,207,133,.15)' : 'rgba(255,236,200,.06)', stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3, alpha: a });
        txt(g, it.t, x + w / 2 + 12, y + h * (it.w ? 0.3 : 0.36), 19, C.hi, { alpha: a, maxW: w - 60 });
        if (it.w) { cross(g, x + 34, y + h * 0.56, 10, C.key, a); txt(g, it.w, x + 56, y + h * 0.56, 16, '#ffb3ab', { align: 'left', alpha: a, w: 700, maxW: w - 70 }); }
        if (it.r) { const yy = it.w ? y + h * 0.8 : y + h * 0.68; if (it.w) check(g, x + 34, yy, 10, C.gs, a); txt(g, it.r, it.w ? x + 56 : x + w / 2, yy, it.w ? 16 : 17, it.w ? '#b8f5cf' : C.cream, { align: it.w ? 'left' : 'center', alpha: a, w: 700, maxW: w - (it.w ? 70 : 24) }); }
      });
    },
  };
}

/* =================================================== GALERIA (coloana îngustă) */
const IMG = {};
function img(n) { if (!IMG[n]) { const i = new Image(); i.src = `img/${n}.jpg`; IMG[n] = i; } return IMG[n]; }
export function gallery({ spec }) {
  const T = spec.sceneOpts.tiles; const WW = 600, HH = 897; const TW = 277, TH = 207;
  const pos = T.map((_, k) => [15 + (k % 2) * (TW + 16), 12 + Math.floor(k / 2) * (TH + 14)]);
  return {
    W: WW, H: HH, home: { x: WW / 2, y: HH / 2, z: 1 }, anchors: pos.map(([x, y]) => [x + 24, y + 24]),
    draw(g, t, b) {
      bg(g, WW, HH);
      T.forEach((tl, k) => {
        const [x, y] = pos[k]; const on = b.i === k; const im = img(tl.img); const p = new Path2D(); p.roundRect(x, y, TW, TH, 14);
        g.save(); g.fillStyle = '#100916'; g.fill(p); g.clip(p);
        if (im.complete && im.naturalWidth) { const [sx, sy, sw, sh] = tl.src || [0, 0, im.naturalWidth, im.naturalHeight]; const r = Math.max(TW / sw, TH / sh); const dw = TW / r, dh = TH / r; g.drawImage(im, sx + (sw - dw) / 2, sy + (sh - dh) / 2, dw, dh, x, y, TW, TH); }
        g.fillStyle = 'rgba(20,12,6,.78)'; g.fillRect(x, y + TH - 34, TW, 34);
        g.restore();
        txt(g, tl.lab, x + TW / 2, y + TH - 17, 16, '#fff', { stroke: false, maxW: TW - 12 });
        g.save(); g.strokeStyle = on ? C.hi : OUT; g.lineWidth = on ? 7 : 5; if (on) { g.shadowColor = C.hi; g.shadowBlur = 20; } g.stroke(p); g.restore();
      });
    },
  };
}
