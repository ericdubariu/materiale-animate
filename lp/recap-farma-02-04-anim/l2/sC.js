// Scenele pentru Partea D (eliminarea) + cazul 5 + final: T½ (anim), ordinul 1 vs 0 (anim), platoul (anim), graficul cazului 5,
// formula, scriptul OSPE (coloana îngustă), cardurile de capcane, galeria, recapitularea.
import { W, H, HOME, cam, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, st, loopT, txt, pill, dot, ell, arr, cross, check, icon } from './fk.js';
import { K, hiBox, mol, pac, axes, plot, chain, platelet } from './fx.js';
import { mini } from './mini.js';

const P = (b) => (b.i < 0 ? 1 : clamp(b.bt / (b.bd * 0.75)));

/* =================================================== T½ (anim) */
export function half() {
  return {
    home: HOME, anchors: [[230, 120], [180, 760], [930, 110], [130, 90]],
    phase: (i) => ['curba de ordinul 1', 'ce rămâne după N × T½', 'practic eliminat', 'doza dublă'][i] || '',
    draw(g, t, b) {
      bg(g);
      const A = axes(g, 30, 64, 940, 660, { xmax: 24, ymax: 21, xt: [0, 3, 6, 9, 12, 15, 18, 21, 24], yt: [0, 5, 10, 20], xl: 'ore de la vârf', yl: 'ng/mL' });
      const f = (h) => 10 * Math.pow(0.5, h / 3);
      // banda „practic eliminat”
      const pb = b.i === 2 ? P(b) : b.i < 0 || b.i > 2 ? 1 : 0;
      if (pb > 0) { g.save(); g.globalAlpha = pb; g.fillStyle = 'rgba(79,209,139,.2)'; g.fillRect(A.X(15), A.y0, A.X(21) - A.X(15), A.y1 - A.y0); g.restore(); txt(g, 'practic eliminat\n5–7 × T½ = 15–21 h', A.X(18), A.Y(15), 21, C.gs, { alpha: pb }); }
      // curba
      const u = b.i === 0 ? P(b) : b.i < 0 || b.i > 0 ? 1 : 0;
      plot(g, A, f, 0, 24, { col: K.drug, w: 7, u });
      const hNow = 24 * u;
      [[0, '10'], [3, '5'], [6, '2,5'], [9, '1,25']].forEach(([h, l], k) => {
        if (h > hNow + 0.01) return;
        dot(g, A.X(h), A.Y(f(h)), 11, C.hi);
        if (k) txt(g, l, A.X(h) - 16, A.Y(f(h)) + 26, 20, C.hi, { align: 'right' });
        if (k < 3 && h + 3 <= hNow + 0.01) { g.save(); g.strokeStyle = 'rgba(255,227,110,.7)'; g.lineWidth = 3; g.setLineDash([7, 6]); g.beginPath(); g.moveTo(A.X(h), A.Y(f(h))); g.lineTo(A.X(h + 3), A.Y(f(h))); g.lineTo(A.X(h + 3), A.Y(f(h + 3))); g.stroke(); g.restore(); txt(g, 'T½', A.X(h + 1.5), A.Y(f(h)) - 18, 17, C.hi); }
      });
      // procentele rămase
      const pp = b.i === 1 ? P(b) : b.i < 0 || b.i > 1 ? 1 : 0;
      const PC = [[3, '50%'], [6, '25%'], [9, '12,5%'], [12, '6,25%'], [15, '≈ 3%'], [21, '< 1%']];
      panel(g, 30, 760, 940, 150, { alpha: 1 });
      txt(g, 'rămâne din doză:', 120, 790, 17, C.dim, { w: 700 });
      PC.forEach(([h, l], k) => { const a = clamp(pp * 6 - k); txt(g, l, A.X(h), 850, 24, k >= 4 ? C.gs : C.cream, { alpha: a }); txt(g, `${h / 3} T½`, A.X(h), 885, 16, C.dim, { alpha: a, w: 700 }); });
      // doza dublă
      const pd = b.i === 3 ? P(b) : b.i < 0 ? 1 : 0;
      if (pd > 0) { plot(g, A, (h) => 20 * Math.pow(0.5, h / 3), 0, 24, { col: '#ff8ad0', w: 5, dash: [12, 8], u: pd }); txt(g, 'doză dublă (20 ng/mL): după 3 h e tot 10\n→ doar un T½ în plus', A.X(10.5), A.Y(16), 19, '#ff8ad0', { alpha: pd }); }
    },
  };
}

/* =================================================== ORDINUL 1 vs ORDINUL 0 (anim) */
export function orders() {
  const f1 = (x) => 10 * Math.pow(0.5, x / 2), f0 = (x) => Math.max(0, 10 - x);
  return {
    home: HOME, anchors: [[60, 80], [550, 80]],
    phase: (i) => ['ordinul 1: fracție constantă', 'ordinul 0: cantitate constantă'][i] || '',
    draw(g, t, b) {
      bg(g);
      [[20, f1, 'Ordinul 1 (exponențial)', 'viteza ∝ concentrația', 0], [510, f0, 'Ordinul 0 (liniar)', 'viteza = constantă', 1]].forEach(([x0, f, h, s, k]) => {
        const on = b.i === k; const live = b.i < 0 || on; const a = live ? 1 : 0.45;
        hiBox(g, x0, 40, 470, 870, on);
        g.save(); g.globalAlpha = a;
        txt(g, h, x0 + 235, 80, 24, C.hi);
        const A = axes(g, x0 + 10, 110, 450, 470, { xmax: 10, ymax: 11, xt: [0, 2, 4, 6, 8, 10], yt: [], xl: 'timp', yl: 'concentrație' });
        plot(g, A, f, 0, 10, { col: k ? K.ion : K.drug, w: 6 });
        const u = live ? (b.i < 0 ? loopT(t, 7) : clamp(b.bt / (b.bd * 0.85))) : 1;
        const xNow = 10 * u;
        for (let s2 = 0; s2 < 5; s2++) { const xa = s2 * 2, xb = xa + 2; if (xb > xNow + 0.01) break; const ya = f(xa), yb = f(xb); arr(g, A.X(xb) + 14, A.Y(ya), A.X(xb) + 14, A.Y(yb) + 4, C.hi, 5); txt(g, (ya - yb).toFixed(1).replace('.', ','), A.X(xb) + 44, A.Y((ya + yb) / 2), 16, C.hi, { align: 'left' }); }
        dot(g, A.X(xNow), A.Y(f(xNow)), 13, '#fff', { ow: 4 });
        txt(g, s, x0 + 235, 640, 24, C.cream);
        // găleți: cât pleacă pe interval
        const D = [0, 1, 2, 3, 4].map((j) => f(j * 2) - f(j * 2 + 2));
        D.forEach((d, j) => { const bh = d * 22; const bx = x0 + 60 + j * 78; const bar = new Path2D(); bar.roundRect(bx, 850 - bh, 50, bh, 8); g.save(); g.fillStyle = k ? K.ion : K.drug; g.fill(bar); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(bar); g.restore(); });
        txt(g, k ? 'aceeași cantitate pe interval' : 'jumătate din cât era → T½ constant', x0 + 235, 885, 18, C.dim, { w: 700 });
        txt(g, 'cât se elimină la fiecare interval:', x0 + 235, 690, 17, C.dim, { w: 700 });
        g.restore();
      });
    },
  };
}

/* =================================================== DOZE REPETATE: PLATOUL (anim) */
export function plateau() {
  const Cm = (x) => { const n = Math.min(7, Math.floor(x + 1e-9)); return 2 * (1 - Math.pow(0.5, n + 1)) * Math.pow(0.5, x - n); };
  const Cl = (x) => { const n = Math.min(7, Math.floor(x + 1e-9)); return 2 * Math.pow(0.5, x - n); };
  function draw(g, A, f, x1, col, o = {}) {
    if (x1 <= 0) return;
    g.save(); g.lineJoin = 'round'; g.beginPath(); g.moveTo(A.X(0), A.Y(0));
    for (let n = 0; n < 8; n++) { if (n > x1) break; g.lineTo(A.X(n), A.Y(f(n))); const e = Math.min(n + 1, x1); for (let k = 1; k <= 30; k++) { const x = n + (e - n) * k / 30 - 1e-6; g.lineTo(A.X(x), A.Y(f(x))); } }
    if (o.dash) g.setLineDash(o.dash);
    g.strokeStyle = OUT; g.lineWidth = 11; g.stroke(); g.strokeStyle = col; g.lineWidth = 6; g.stroke(); g.restore();
  }
  return {
    home: HOME, anchors: [[200, 330], [560, 250], [700, 100], [130, 140]],
    phase: (i) => ['prima doză', 'acumularea', 'platoul (Css)', 'doza de atac'][i] || '',
    draw(g, t, b) {
      bg(g);
      const A = axes(g, 30, 64, 940, 730, { xmax: 8, ymax: 2.35, xt: [0, 1, 2, 3, 4, 5, 6, 7, 8], yt: [], xl: 'timp (în T½)', yl: 'concentrația' });
      for (let n = 0; n < 8; n++) arr(g, A.X(n), A.y1 + 70, A.X(n), A.y1 + 46, C.cream, 4, 0.7);
      txt(g, 'o doză la fiecare T½', A.X(4), A.y1 + 100, 17, C.dim, { w: 700 });
      const x1 = b.i < 0 ? 8 : b.i === 0 ? P(b) : b.i === 1 ? 1 + 7 * P(b) : 8;
      // liniile Css
      const pc = b.i === 2 ? P(b) : b.i < 0 || b.i > 2 ? 1 : 0;
      if (pc > 0) for (const [v, l, c] of [[2, 'Css max', '#ff8a8a'], [1 / Math.LN2, 'Css medie', C.hi], [1, 'Css min', C.gi]]) { g.save(); g.globalAlpha = pc; g.strokeStyle = c; g.lineWidth = 3; g.setLineDash([10, 7]); g.beginPath(); g.moveTo(A.x0, A.Y(v)); g.lineTo(A.x1, A.Y(v)); g.stroke(); g.restore(); txt(g, l, A.x1 - 6, A.Y(v) - 16, 18, c, { align: 'right', alpha: pc }); }
      draw(g, A, Cm, x1, K.drug);
      // procentele la minime
      ['50%', '75%', '87,5%', '94%', '97%'].forEach((l, k) => { const x = k + 1; if (x1 < x - 0.02) return; const v = 1 - Math.pow(0.5, k + 1); dot(g, A.X(x), A.Y(v), 9, C.hi); txt(g, l, A.X(x), A.Y(v) + 30, 19, C.hi); });
      if (b.i === 1 || b.i < 0) txt(g, '~4–5 T½: ≈ 94–97% din platou', A.X(5.6), A.Y(0.45), 19, C.cream, { w: 700 });
      // doza de atac
      const pl = b.i === 3 ? P(b) : b.i < 0 ? 1 : 0;
      if (pl > 0) { draw(g, A, Cl, 8 * pl, '#ff8ad0', { dash: [12, 8] }); txt(g, 'doza de atac → direct la platou', A.X(2.2), A.Y(2.22), 19, '#ff8ad0', { alpha: pl }); }
    },
  };
}

/* =================================================== CAZUL 5 · ENUNȚUL */
export function case5() {
  const f = (h) => (h < 1 ? 10 * h : 10 * Math.pow(0.5, (h - 1) / 3));
  const OPT = ['A. 6–8 h', 'B. 10–14 h', 'C. 5–7 h', 'D. 15–21 h', 'E. 14–16 h'];
  return {
    home: HOME, anchors: [[108, 140], [300, 420], [700, 90]],
    draw(g, t, b) {
      bg(g);
      const A = axes(g, 20, 70, 640, 735, { xmax: 22, ymax: 12, xt: [0, 1, 4, 7, 10, 13, 16, 19, 22], yt: [5, 10], xl: 'ore de la administrare', yl: 'ng/mL', fs: 16 });
      plot(g, A, f, 0, 22, { col: K.drug, w: 7 });
      const a1 = b.i < 0 || b.i === 0 ? 1 : 0.5, a2 = b.i < 0 || b.i === 1 ? 1 : 0.5;
      dot(g, A.X(1), A.Y(10), 13, C.hi, { alpha: a1 }); txt(g, 'vârf: 10 ng/mL la 1 h', A.X(1) + 30, A.Y(10) - 4, 20, C.hi, { align: 'left', alpha: a1 });
      dot(g, A.X(4), A.Y(5), 13, C.hi, { alpha: a2 }); txt(g, '5 ng/mL la 4 h', A.X(4) + 30, A.Y(5) - 6, 20, C.hi, { align: 'left', alpha: a2 });
      g.save(); g.globalAlpha = a2; g.strokeStyle = 'rgba(255,227,110,.6)'; g.lineWidth = 3; g.setLineDash([7, 6]); g.beginPath(); g.moveTo(A.X(4), A.Y(5)); g.lineTo(A.X(4), A.y1); g.moveTo(A.X(1), A.Y(10)); g.lineTo(A.X(1), A.y1); g.stroke(); g.restore();
      txt(g, 'cinetică de ordinul 1', A.X(13), A.Y(8), 20, C.cream, { w: 700, alpha: a2 });
      const on = b.i === 2;
      panel(g, 690, 60, 290, 760, { stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3 });
      txt(g, 'practic eliminat\ndupă:', 835, 130, 22, C.cream);
      OPT.forEach((o, k) => { const y = 240 + k * 115; const right = k === 3 && (on || b.i < 0); pill(g, 835, y, 240, 80, right ? C.gs : 'rgba(255,236,200,.15)', o, { size: 24, col: right ? OUT : C.cream }); });
      panel(g, 20, 830, 960, 80, {});
      txt(g, 'medicamentul A · doză unică · epurare de ordinul 1', 500, 870, 20, C.dim, { w: 700 });
    },
  };
}

/* =================================================== FORMULA */
export function formula() {
  const R = [['Ce observ', 'simptom, lipsă de efect, toxicitate + CÂND'], ['Etapa ADME', 'A · D · M · E'], ['Mecanismul', 'ionizare · degradare · inducție · inhibiție · pro-drog'], ['Consecința', 'concentrație ↑/↓ → efect ↑/↓'], ['Recomandarea', 'cale · metodă · asociere · distanțare · monitorizare']];
  return {
    home: HOME, anchors: R.map((_, k) => [40, 70 + k * 172]),
    draw(g, t, b) {
      bg(g);
      R.forEach(([h, s], k) => {
        const y = 30 + k * 172; const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.5;
        panel(g, 20, y, 960, 140, { fill: on ? 'rgba(255,207,133,.15)' : 'rgba(255,236,200,.06)', stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3, alpha: a });
        const cx = 130, cy = y + 70;
        g.save(); g.globalAlpha = a;
        if (k === 0) icon(g, 'eye', cx, cy, 1.1, { pupil: 12 });
        if (k === 1) ['A', 'D', 'M', 'E'].forEach((l, j) => pill(g, cx - 75 + j * 50, cy, 44, 44, K.stage[j], l, { size: 22, r: 22 }));
        if (k === 2) { pac(g, cx - 30, cy, 34, C.gq, t * 4); mol(g, cx + 40, cy, 'A⁻', 24); }
        if (k === 3) { const A = axes(g, cx - 80, cy - 55, 170, 110, { xmax: 10, ymax: 10, noTicks: true, bare: true, thin: true }); g.save(); g.fillStyle = 'rgba(79,209,139,.25)'; g.fillRect(A.x0, A.Y(7), A.x1 - A.x0, A.Y(3) - A.Y(7)); g.restore(); plot(g, A, (x) => 9 * (Math.exp(-x / 4) - Math.exp(-x / 0.8)) / 0.6, 0, 10, { col: K.ion, w: 4 }); }
        if (k === 4) { const p = new Path2D(); p.roundRect(cx - 45, cy - 55, 90, 110, 8); g.fillStyle = '#fbf3e2'; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(p); txt(g, 'Rp/', cx - 15, cy - 30, 20, OUT, { stroke: false }); for (let j = 0; j < 3; j++) { g.strokeStyle = 'rgba(80,50,30,.5)'; g.lineWidth = 3; g.beginPath(); g.moveTo(cx - 32, cy + j * 20); g.lineTo(cx + 32, cy + j * 20); g.stroke(); } }
        g.restore();
        txt(g, `${k + 1} · ${h}`, 590, y + 45, 28, C.hi, { alpha: a });
        txt(g, s, 590, y + 100, 19, C.cream, { alpha: a, w: 700, maxW: 700 });
        if (k < 4) arr(g, 130, y + 140, 130, y + 170, C.cream, 5, 0.7);
      });
    },
  };
}

/* =================================================== SCRIPTUL OSPE (coloana îngustă) */
const toSec = (s) => { const [m, x] = s.split(':').map(Number); return m * 60 + x; };
const MINI_T = { peptid: 'peptidul: digerat → 0 în sânge', acid: 'acid + antiacid: ionizat = captiv', carba: 'inductor: CYP3A4 ↑ → hormon ↓', clopi: 'pro-drog + inhibitor: nu se activează', thalf: '10 → 5 ng/mL în 3 h: T½ = 3 h' };
export function script({ spec }) {
  const o = spec.sceneOpts || {}; const WS = 600, HS = 897;
  const seg = spec.script.map((s) => { const m = s.at.match(/(\d+:\d+)\s*[–-]\s*(\d+:\d+)/); return m ? [toSec(m[1]), toSec(m[2])] : null; });
  return {
    W: WS, H: HS, home: cam(300, 448, 1), anchors: [],
    phase: (i) => (i >= 0 ? `${spec.script[i].tm} · ${spec.script[i].at}` : ''),
    draw(g, t, b) {
      bg(g, WS, HS);
      txt(g, MINI_T[o.f] || '', 300, 82, 20, C.cream, { maxW: 560 });
      mini(g, o.f, 30, 105, 1.0, t);
      const C0 = [300, 640], R = 150; const tot = 180;
      seg.forEach((sg, i) => { if (!sg) return; const a0 = sg[0] / tot, a1 = sg[1] / tot; const onn = i === b.i, done = b.i > i; g.save(); g.strokeStyle = OUT; g.lineWidth = 40; g.beginPath(); g.arc(C0[0], C0[1], R, -Math.PI / 2 + a0 * Math.PI * 2, -Math.PI / 2 + a1 * Math.PI * 2 - 0.03); g.stroke(); g.strokeStyle = onn ? C.hi : done ? '#C27A10' : '#4a3d30'; g.lineWidth = 30; if (onn) { g.shadowColor = C.hi; g.shadowBlur = 20; } g.stroke(); g.restore(); });
      let f = 0; const sg = seg[b.i]; if (b.i >= 0 && sg) f = (sg[0] + (sg[1] - sg[0]) * clamp(b.bt / b.bd)) / tot;
      const ang = -Math.PI / 2 + f * Math.PI * 2; dot(g, C0[0] + Math.cos(ang) * R, C0[1] + Math.sin(ang) * R, 17, '#fff', { ow: 5 });
      const lab = b.i >= 0 && !sg ? '1 min' : '3 min'; txt(g, b.i >= 0 && sg ? `${Math.floor(f * 3)}:${String(Math.floor((f * 180) % 60)).padStart(2, '0')}` : lab, C0[0], C0[1] - 6, 46, '#fff');
      txt(g, b.i >= 0 && !sg ? 'citești + ciornă' : 'cu voce tare', C0[0], C0[1] + 40, 19, C.dim, { w: 700 });
    },
  };
}

/* =================================================== CARDURI (capcane) */
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
        txt(g, it.t, x + w / 2 + 12, y + h * 0.3, 20, C.hi, { alpha: a, maxW: w - 60 });
        cross(g, x + 34, y + h * 0.56, 10, C.key, a); txt(g, it.w, x + 56, y + h * 0.56, 18, '#ffb3ab', { align: 'left', alpha: a, w: 700, maxW: w - 70 });
        check(g, x + 34, y + h * 0.8, 10, C.gs, a); txt(g, it.r, x + 56, y + h * 0.8, 18, '#b8f5cf', { align: 'left', alpha: a, w: 700, maxW: w - 70 });
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
        g.save(); g.fillStyle = '#f4efe8'; g.fill(p); g.clip(p);
        if (im.complete && im.naturalWidth) { const [sx, sy, sw, sh] = tl.src || [0, 0, im.naturalWidth, im.naturalHeight]; const r = Math.max(TW / sw, TH / sh); const dw = TW / r, dh = TH / r; g.drawImage(im, sx + (sw - dw) / 2, sy + (sh - dh) / 2, dw, dh, x, y, TW, TH); }
        g.fillStyle = 'rgba(20,12,6,.78)'; g.fillRect(x, y + TH - 34, TW, 34);
        g.restore();
        txt(g, tl.lab, x + TW / 2, y + TH - 17, 16, '#fff', { stroke: false, maxW: TW - 12 });
        g.save(); g.strokeStyle = on ? C.hi : OUT; g.lineWidth = on ? 7 : 5; if (on) { g.shadowColor = C.hi; g.shadowBlur = 20; } g.stroke(p); g.restore();
      });
    },
  };
}

/* =================================================== RECAPITULARE: 7 benzi */
export function recap7() {
  const WW = 600, HH = 897; const BH = 118;
  const R = [[0, 'A', '1 · peptid per os'], [0, 'A', '2 · acid + antiacid'], [2, 'M', '3 · carbamazepină + COC'], [2, 'M', '4 · clopidogrel + omeprazol'], [3, 'E', '5 · T½ = 3 h'], [1, 'D', 'distribuția'], [3, 'E', 'platoul']];
  return {
    W: WW, H: HH, home: { x: WW / 2, y: HH / 2, z: 1 }, anchors: R.map((_, k) => [30, 12 + k * (BH + 8) + 24]),
    draw(g, t, b) {
      bg(g, WW, HH);
      R.forEach(([si, l, h], k) => {
        const y = 12 + k * (BH + 8); const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.5;
        panel(g, 12, y, 576, BH, { fill: on ? 'rgba(255,207,133,.15)' : 'rgba(255,236,200,.06)', stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3, alpha: a });
        pill(g, 80, y + BH / 2, 60, 60, K.stage[si], l, { size: 30, r: 30, alpha: a });
        txt(g, h, 270, y + BH / 2, 20, C.cream, { alpha: a, maxW: 260 });
        const sx = 490, sy = y + BH / 2;
        g.save(); g.globalAlpha = a;
        if (k === 0) { chain(g, sx - 50, sy, 4, 30, [0, 1, 0], [], { r: 11 }); }
        if (k === 1) { mol(g, sx - 30, sy, 'A⁻', 22); cross(g, sx + 35, sy, 14, C.key); }
        if (k === 2) { pac(g, sx - 30, sy, 24, C.gq, t * 4); pac(g, sx + 25, sy, 24, C.gq, t * 4 + 1); }
        if (k === 3) { pac(g, sx, sy, 26, K.grey, 0); cross(g, sx + 32, sy - 22, 10, C.key); }
        if (k === 4) { const A = axes(g, sx - 70, sy - 45, 140, 90, { xmax: 9, ymax: 10, noTicks: true, bare: true, thin: true }); plot(g, A, (x) => 10 * Math.pow(0.5, x / 3), 0, 9, { col: K.drug, w: 4 }); }
        if (k === 5) { ell(g, sx, sy, 40, 26, '#ffe08a', { ow: 4 }); dot(g, sx + 40, sy - 10, 9, K.drug); dot(g, sx - 38, sy + 12, 9, K.drug); }
        if (k === 6) { const A = axes(g, sx - 70, sy - 45, 140, 90, { xmax: 5, ymax: 2.2, noTicks: true, bare: true, thin: true }); g.save(); g.strokeStyle = K.drug; g.lineWidth = 4; g.beginPath(); g.moveTo(A.X(0), A.Y(0)); for (let n = 0; n < 5; n++) { const pk = 2 * (1 - Math.pow(0.5, n + 1)); g.lineTo(A.X(n), A.Y(pk)); g.lineTo(A.X(n + 1), A.Y(pk / 2)); } g.stroke(); g.restore(); }
        g.restore();
      });
    },
  };
}
