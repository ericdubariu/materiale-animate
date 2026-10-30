// Scenele pentru Partea B (cele 4 experimente): montajul (vasul Magnus / baia de organ), înregistrările care se desenează,
// cascadele Gq și Gs în celula musculară netedă, scripturile OSPE, petele de salivă, acinul salivar, pupilele iepurilor,
// clinica (poze + desene), drenajul umorii apoase (glaucom).
import { W, H, HOME, cam, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, st, u01, loopT, txt, pill, dot, ell, arr, lead, cross, check, tube, curve, at, flow,
  ligand, membrane, receptor, gprot, enzyme, myofil, heart, iris, icon, chart, mark, bath, glowRing, blob, paint, bb } from './fk.js';

const IMG = {};
function img(n) { if (!IMG[n]) { const i = new Image(); i.src = `img/${n}.jpg`; IMG[n] = i; } return IMG[n]; }
function photo(g, name, x, y, w, h, src) {
  const im = img(name); const p = new Path2D(); p.roundRect(x, y, w, h, 14);
  g.save(); g.fillStyle = '#100916'; g.fill(p); g.clip(p);
  if (im.complete && im.naturalWidth) { const [sx, sy, sw, sh] = src || [0, 0, im.naturalWidth, im.naturalHeight]; const r = Math.max(w / sw, h / sh); const dw = w / r, dh = h / r; g.drawImage(im, sx + (sw - dw) / 2, sy + (sh - dh) / 2, dw, dh, x, y, w, h); }
  g.restore(); g.save(); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(p); g.restore();
}

/* =================================================== TRASEELE (schematice, ca în deck-ul verificat) */
const sm = (x, a, w) => ease(clamp((x - a) / w));
// ileonul: preparatul A (pilocarpină → spălare), preparatul B (pilocarpină → atropină)
export const ILEON = { marks: [[0.17, 'pilocarpină', C.pilo], [0.40, 'spălare', '#9fd3f0'], [0.58, 'pilocarpină', C.pilo], [0.78, 'atropină', C.atr]], cuts: [0, 0.15, 0.38, 0.53, 1] };
export function fIleon(x) {
  const tone = 0.55 * sm(x, 0.17, 0.05) * (1 - sm(x, 0.40, 0.07)) + 0.55 * sm(x, 0.58, 0.05) * (1 - sm(x, 0.78, 0.05)) - 0.22 * sm(x, 0.78, 0.07);
  const amp = 0.06 + 0.1 * (sm(x, 0.17, 0.05) * (1 - sm(x, 0.40, 0.07)) + sm(x, 0.58, 0.05) * (1 - sm(x, 0.78, 0.05))) - 0.045 * sm(x, 0.78, 0.07);
  return -0.3 + tone + amp * Math.sin(x * Math.PI * 2 * 38);
}
// uterul: contracții spontane ample; adrenalina / izoprenalina le opresc, propranololul le readuce
export const UTER = { marks: [[0.18, 'adrenalină', C.adr], [0.36, 'propranolol', C.prop], [0.54, 'spălare', '#9fd3f0'], [0.66, 'izoprenalină', C.iso], [0.79, 'propranolol', C.prop]], cuts: [0, 0.17, 0.34, 0.53, 1] };
export function fUter(x, noRelax = false) {
  const A = noRelax ? 1 : 1 - sm(x, 0.18, 0.04) * (1 - sm(x, 0.36, 0.06)) - sm(x, 0.66, 0.04) * (1 - sm(x, 0.79, 0.06));
  const ph = (x * 13) % 1; const pk = ph < 0.18 ? Math.sin(ph / 0.18 * Math.PI / 2) : Math.exp(-(ph - 0.18) * 7);
  return -0.5 + A * 1.05 * pk;
}

/* =================================================== MONTAJUL (vasul Magnus / baia de organ izolat) */
export function montaj({ spec }) {
  const o = spec.sceneOpts || {}; const ut = o.organ === 'uter';
  const BX = 560, BYc = 560;
  return {
    home: HOME, anchors: [[BX - 80, BYc + 10], [BX + 50, BYc + 175], [400, 300], [840, 140]],
    phase: (i) => ['organul', ut ? 'baia: Locke, carbogen' : 'vasul Magnus', 'substanțele', 'înregistrarea'][i] || '',
    draw(g, t, b) {
      bg(g);
      // circulatorul (încălzește apa din baia exterioară)
      const cp = new Path2D(); cp.roundRect(780, 600, 170, 150, 16); paint(g, cp, '#b9bfcc', '#9097a6', '#eef0f5', [780, 600, 170, 150], OUT, 5);
      txt(g, '37 °C', 865, 655, 30, '#c0392b', { stroke: false }); txt(g, 'circulator', 865, 715, 18, OUT, { stroke: false });
      tube(g, [[780, 640], [700, 640], [690, 520]], 10, C.water, { raw: true }); tube(g, [[780, 720], [690, 720], [690, 700]], 10, C.water, { raw: true });
      const r = bath(g, BX, BYc, { organ: o.organ, k: 0.2, t, still: true, s: 0.95 });
      // pipeta
      g.save(); g.translate(455, 330); g.rotate(-0.4); const pp = new Path2D(); pp.moveTo(-14, -120); pp.lineTo(14, -120); pp.lineTo(14, 0); pp.lineTo(3, 30); pp.lineTo(-3, 30); pp.lineTo(-14, 0); pp.closePath(); paint(g, pp, 'rgba(230,240,255,.85)', null, null, [-14, -120, 28, 150], OUT, 4); const bulb = new Path2D(); bulb.ellipse(0, -140, 22, 26, 0, 0, 7); paint(g, bulb, '#e56b6b', null, null, [-22, -166, 44, 52], OUT, 4); g.restore();
      dot(g, 478, 405, 9, ut ? C.adr : C.pilo, { ow: 3 });
      txt(g, '0,1 mL', 360, 250, 20, C.cream);
      // înregistrarea: traductor → amplificator → calculator
      tube(g, [[r.trans[0] + 40, r.trans[1]], [700, r.trans[1]], [720, 160]], 6, '#3b3b46', { raw: true, ow: 4 });
      const sc = new Path2D(); sc.roundRect(720, 60, 250, 180, 16); paint(g, sc, '#2b3140', null, null, [720, 60, 250, 180], OUT, 5);
      chart(g, 735, 75, 220, 150, ut ? (x) => fUter(x * 0.35) : (x) => fIleon(0.1 + x * 0.25), 1, { pen: false });
      txt(g, 'amplificator + calculator', 845, 268, 17, C.cream, { w: 700 });
      // etichete
      txt(g, ut ? 'soluție Locke' : 'soluție Tyrode', BX - 20, BYc - 175, 19, ut ? C.locke : C.tyrode);
      txt(g, ut ? 'carbogen (O₂ + CO₂)' : 'barbotare de aer', BX + 150, BYc - 150, 18, '#d8e6ef');
      txt(g, 'baia exterioară termostatată', BX, BYc + 255, 18, C.water);
      txt(g, ut ? 'uter 2–3 cm' : 'ileon 2–4 cm', BX - 165, BYc - 40, 19, '#f0a6a0');
      lead(g, BX - 110, BYc - 25, BX - 45, BYc + 10);
    },
  };
}

/* =================================================== ÎNREGISTRAREA (ileon / uter) */
export function trace({ spec }) {
  const o = spec.sceneOpts || {}; const ut = o.kind === 'uter'; const D = ut ? UTER : ILEON; const f = ut ? (x) => fUter(x) : fIleon;
  const CX = 30, CY = 430, CW = 940, CH = 420;
  return {
    home: HOME, anchors: D.cuts.slice(0, 4).map((c, k) => [CX + 14 + ((c + D.cuts[k + 1]) / 2) * (CW - 28), CY - 20]),
    phase: (i) => (ut ? ['contracții spontane', 'adrenalină → relaxare', 'propranolol → revin', 'izoprenalină → propranolol'] : ['bazal', 'pilocarpină → contracție', 'spălare', 'atropină → relaxare'])[i] || '',
    draw(g, t, b) {
      bg(g);
      const u = b.i >= 0 ? lerp(D.cuts[b.i], D.cuts[b.i + 1], clamp(b.bt / (b.bd * 0.8))) : loopT(t, 16);
      const v = f(Math.max(0.001, u));
      // organul în baie, care se contractă odată cu traseul
      const k = clamp((v + 0.6) / 1.1);
      bath(g, 130, 230, { organ: ut ? 'uter' : 'ileon', k, t, s: 0.5 });
      txt(g, ut ? 'uter izolat\nde șobolan' : 'ileon izolat de cobai', ut ? 330 : 270, ut ? 170 : 150, 20, C.cream, { align: 'left' });
      txt(g, ut ? 'Locke · 37 °C\ncarbogen' : 'Tyrode · 37 °C · aer', ut ? 330 : 270, ut ? 250 : 190, 18, C.dim, { align: 'left', w: 700 });
      if (ut) {
        // dacă propranololul e dat ÎNAINTE de adrenalină
        panel(g, 560, 70, 420, 280, {});
        txt(g, 'dacă propranololul e dat înainte:', 770, 98, 17, C.prop);
        const m = chart(g, 580, 120, 380, 170, (x) => fUter(x * 0.5, true), 1, { pen: false });
        for (const [xx, col, l] of [[0.12, C.prop, 'propranolol'], [0.5, C.adr, 'adrenalină']]) { g.save(); g.strokeStyle = col; g.lineWidth = 3; g.setLineDash([7, 6]); g.beginPath(); g.moveTo(m.X(xx), 125); g.lineTo(m.X(xx), 285); g.stroke(); g.restore(); txt(g, l, m.X(xx) + 8, 140, 15, col, { align: 'left' }); }
        txt(g, 'β2 blocați → adrenalina nu mai relaxează', 770, 322, 16, C.cream, { w: 700 });
      } else {
        txt(g, 'tonus = platoul', 270, 245, 19, C.cream, { align: 'left', w: 700 }); txt(g, 'amplitudine = vârfurile', 270, 280, 19, C.cream, { align: 'left', w: 700 });
      }
      const m = chart(g, CX, CY, CW, CH, f, u, { base: f(0.05) + (ut ? 0 : 0) });
      D.marks.forEach(([x, l, col], j) => mark(g, m.X(x), CY, CY + CH, l, col, u >= x - 0.002 ? 1 : 0.18));
      // parantezele preparatelor (ileon)
      if (!ut) { [[0, 0.5, 'preparatul A'], [0.52, 1, 'preparatul B']].forEach(([a, c, l]) => { const x0 = m.X(a), x1 = m.X(c); g.save(); g.strokeStyle = C.cream; g.lineWidth = 3; g.beginPath(); g.moveTo(x0, CY + CH + 18); g.lineTo(x0, CY + CH + 30); g.lineTo(x1, CY + CH + 30); g.lineTo(x1, CY + CH + 18); g.stroke(); g.restore(); txt(g, l, (x0 + x1) / 2, CY + CH + 56, 19, C.cream); }); }
      else txt(g, 'timp →', CX + CW - 60, CY + CH + 40, 18, C.dim, { w: 700 });
    },
  };
}

/* =================================================== CASCADA Gq (ileon) / Gs (uter) în celula musculară netedă */
export function cascade({ spec }) {
  const o = spec.sceneOpts || {}; const gs = o.kind === 'gs';
  const MY = 250, RX = 300, EX = 540;
  const col = gs ? C.gs : C.gq;
  return {
    home: HOME, anchors: [[RX + 75, 90], [EX - 100, MY + 120], gs ? [590, 470] : [700, MY - 50], [740, 590]],
    phase: (i) => (gs ? ['β2 + agonist', 'Gs → adenilat-ciclaza', 'AMPc ↑ → PKA', 'relaxare'] : ['M3 + pilocarpină', 'Gq → PLC', 'IP3 + DAG', 'Ca²⁺ ↑ → contracție'])[i] || '',
    draw(g, t, b) {
      bg(g);
      const ph = b.i >= 0 ? b.i + clamp(b.bt / (b.bd * 0.75)) : loopT(t, 12) * 4;
      const p = (k) => clamp(ph - k);
      txt(g, 'în afara celulei', 880, 120, 18, C.dim, { w: 700 }); txt(g, 'citoplasma', 900, 330, 18, C.dim, { w: 700 });
      membrane(g, 0, 1000, MY, { h: 54 });
      // agonistul și antagonistul care așteaptă
      const lp = ease(clamp(p(0) / 0.6));
      receptor(g, RX, MY, col, gs ? 'β2' : 'M3', { s: 1.1, glow: p(0) > 0.6 ? 1 : 0, gc: col, ly: -118, size: 28 });
      ligand(g, lerp(RX + 10, RX, lp), lerp(60, MY - 66, lp), gs ? C.adr : C.pilo, gs ? 'Adr' : 'P', 24);
      ligand(g, 70, 100, gs ? C.prop : C.atr, gs ? 'Pr' : 'A', 22, { shape: 'block', alpha: 0.95 });
      txt(g, gs ? 'propranolol:\nblochează β2' : 'atropina: ocupă M3,\nfără activitate\nintrinsecă', 30, gs ? 160 : 170, 16, gs ? C.prop : C.atr, { align: 'left', w: 700 });
      // proteina G → enzima
      const gp = ease(clamp(p(1) / 0.6));
      gprot(g, lerp(RX, EX - 40, gp), MY + 80, col, gs ? 'Gs' : 'Gq', { glow: p(1) > 0 && p(1) < 1 ? 1 : 0.2, gc: col });
      arr(g, RX + 60, MY + 140, EX - 80, MY + 140, '#fff3e6', 4, clamp(p(1) * 2) * 0.8);
      enzyme(g, EX, MY, '#f3e7ff', gs ? 'adenilat-\nciclaza' : 'PLC', { glow: p(1) > 0.6 ? 1 : 0, size: gs ? 16 : 26 });
      if (!gs) {
        // PIP2 în membrană → IP3 (în citoplasmă) + DAG (rămâne în membrană)
        const sp = clamp(p(2) / 0.5);
        if (ph < 2) pill(g, 700, MY, 84, 40, '#ffd6a0', 'PIP2', { size: 18 });
        else {
          pill(g, lerp(700, 770, sp), MY, 80, 40, '#ffe08a', 'DAG', { size: 18 });
          ell(g, 860, 420, 52, 40, '#d6a7ff', { ow: 5, alpha: sp }); txt(g, 'PKC', 860, 420, 20, OUT, { stroke: false, alpha: sp });
          arr(g, 790, MY + 26, 835, 385, '#fff3e6', 4, sp * 0.8);
        }
        // reticulul endoplasmatic
        const er = blob(250, 640, 190, 80, -0.05, t, 0.12, 14, 4); paint(g, er, C.er, C.erS, '#e9e0ff', bb(250, 640, 190, 80), OUT, 5);
        if (ph >= 2) { const ip = clamp(p(2) / 0.8); pill(g, lerp(690, 330, ip), lerp(MY + 30, 545, ip), 70, 40, '#9fe0ff', 'IP3', { size: 18 }); }
        txt(g, 'reticul endoplasmatic', 250, 745, 18, C.er);
        const ca = clamp(p(3) / 0.5);
        for (let j = 0; j < 10; j++) { const s0 = [200 + (j % 5) * 30, 625 + Math.floor(j / 5) * 25]; const tgt = [610 + (j % 5) * 45, 560 + Math.floor(j / 5) * 160]; const q = ph >= 3 ? clamp(ca * 1.4 - j * 0.04) : 0; dot(g, lerp(s0[0], tgt[0], q), lerp(s0[1], tgt[1], q), 9, C.ca, { ow: 2.5 }); }
        txt(g, 'Ca²⁺', 455, 610, 20, C.ca, { alpha: ph >= 3 ? 1 : 0.4 });
        const kk = ph >= 3 ? clamp((ph - 3.3) / 0.5) * (0.8 + 0.2 * Math.sin(t * 5)) : 0;
        myofil(g, 740, 640, 300, kk);
        txt(g, ph >= 3.3 ? 'CONTRACȚIE' : 'miofilamente', 740, 740, 24, ph >= 3.3 ? C.hi : C.cream);
        txt(g, 'fazică (Ca²⁺) + tonică (PKC)', 740, 790, 18, C.cream, { alpha: clamp(ph - 3.3), w: 700 });
      } else {
        // ATP → AMPc → PKA → Ca²⁺ ↓, MLCK inhibată → relaxare
        const cp = clamp(p(2) / 0.7);
        for (let j = 0; j < 6; j++) { const q = clamp(cp * 1.5 - j * 0.08); const a0 = [EX - 20 + j * 8, MY + 40]; const a1 = [430 + (j % 3) * 50, 430 + Math.floor(j / 3) * 46]; dot(g, lerp(a0[0], a1[0], q), lerp(a0[1], a1[1], q), 10, q > 0.3 ? C.camp : '#ffe7a0', { ow: 2.5, alpha: ph >= 2 ? 1 : 0.25 }); }
        txt(g, 'ATP', EX + 70, MY + 70, 18, '#ffe7a0', { alpha: ph >= 2 ? 1 : 0.4 }); txt(g, 'AMPc ↑', 480, 540, 20, C.camp, { alpha: cp });
        ell(g, 650, 440, 58, 42, '#a8f0c8', { ow: 5, alpha: 0.3 + 0.7 * cp }); txt(g, 'PKA', 650, 440, 22, OUT, { stroke: false, alpha: 0.3 + 0.7 * cp });
        arr(g, 540, 440, 585, 440, '#fff3e6', 4, cp * 0.8);
        const rl = clamp(p(3) / 0.6);
        ell(g, 360, 640, 58, 34, '#f3e7ff', { ow: 4 }); txt(g, 'MLCK', 360, 640, 18, OUT, { stroke: false }); cross(g, 395, 615, 14, C.key, rl);
        for (let j = 0; j < 8; j++) { const x0 = 600 + (j % 4) * 70, y0 = 560 + Math.floor(j / 4) * 160; dot(g, lerp(x0, 940, rl * (j % 2 ? 1 : 0.6)), y0 - rl * 30, 8, C.ca, { ow: 2, alpha: 1 - 0.8 * rl }); }
        txt(g, 'Ca²⁺ ↓', 900, 520, 20, C.ca, { alpha: rl });
        const kk = (1 - rl) * (0.8 + 0.2 * Math.sin(t * 5)) * (ph < 0.2 ? 1 : 1);
        myofil(g, 740, 640, 300, kk);
        txt(g, rl > 0.5 ? 'RELAXARE = tocolitic' : 'mușchiul uterin', 740, 745, 24, rl > 0.5 ? C.gs : C.cream);
      }
    },
  };
}

/* =================================================== SCRIPTUL OSPE (coloana îngustă) */
const toSec = (s) => { const [m, x] = s.split(':').map(Number); return m * 60 + x; };
export function script({ spec }) {
  const o = spec.sceneOpts || {}; const WS = 600, HS = 897; const n = spec.script.length;
  const seg = spec.script.map((s) => { const m = s.at.match(/(\d+:\d+)\s*[–-]\s*(\d+:\d+)/); return m ? [toSec(m[1]), toSec(m[2])] : null; });
  return {
    W: WS, H: HS, home: cam(300, 448, 1), anchors: [],
    phase: (i) => (i >= 0 ? `${spec.script[i].tm} · ${spec.script[i].at}` : ''),
    draw(g, t, b) {
      bg(g, WS, HS);
      panel(g, 30, 80, 540, 330, {});
      if (o.f === 'ileon' || o.f === 'uter') { const D = o.f === 'uter' ? UTER : ILEON; const m = chart(g, 50, 165, 500, 220, o.f === 'uter' ? (x) => fUter(x) : fIleon, 1, { pen: false }); D.marks.forEach(([x, l, c]) => { g.save(); g.strokeStyle = c; g.lineWidth = 3; g.setLineDash([7, 6]); g.beginPath(); g.moveTo(m.X(x), 170); g.lineTo(m.X(x), 380); g.stroke(); g.restore(); }); txt(g, o.f === 'uter' ? 'uter: relaxare → revine tonusul' : 'ileon: contracție → relaxare', 300, 125, 19, C.cream); }
      if (o.f === 'saliva') { [[2, 46], [1, 30], [4, 30], [3, 10]].forEach(([l, d], k) => { const x = 105 + k * 130; ell(g, x, 240, 56, 56, '#fbf3e2', { ow: 4 }); ell(g, x, 240, d, d, 'rgba(90,160,230,.75)', { ow: 2 }); txt(g, `lot ${l}`, x, 330, 19, C.cream); }); txt(g, 'pilo > ser ≈ atr + pilo > atropină', 300, 380, 19, C.hi); txt(g, 'diametrul petelor de salivă', 300, 125, 19, C.cream); }
      if (o.f === 'pupila') { [[34, 'pilocarpină'], [70, 'martor'], [130, 'atropină']].forEach(([pr, l], k) => { iris(g, 115 + k * 185, 250, 72, pr * 0.5, { col: '#8a5a3a' }); txt(g, l, 115 + k * 185, 375, 18, C.cream); }); txt(g, 'M3 din mușchiul circular', 300, 125, 19, C.cream); }
      // ceasul de 3 minute
      const C0 = [300, 640], R = 150; const tot = 180;
      seg.forEach((sg, i) => { if (!sg) return; const a0 = sg[0] / tot, a1 = sg[1] / tot; const onn = i === b.i, done = b.i > i; g.save(); g.strokeStyle = OUT; g.lineWidth = 40; g.beginPath(); g.arc(C0[0], C0[1], R, -Math.PI / 2 + a0 * Math.PI * 2, -Math.PI / 2 + a1 * Math.PI * 2 - 0.03); g.stroke(); g.strokeStyle = onn ? C.hi : done ? '#C27A10' : '#4a3d30'; g.lineWidth = 30; if (onn) { g.shadowColor = C.hi; g.shadowBlur = 20; } g.stroke(); g.restore(); });
      let f = 0; const sg = seg[b.i]; if (b.i >= 0 && sg) f = (sg[0] + (sg[1] - sg[0]) * clamp(b.bt / b.bd)) / tot; else if (b.i >= 0) f = 0;
      const ang = -Math.PI / 2 + f * Math.PI * 2; dot(g, C0[0] + Math.cos(ang) * R, C0[1] + Math.sin(ang) * R, 17, '#fff', { ow: 5 });
      const lab = b.i >= 0 && !sg ? '1 min' : '3 min'; txt(g, b.i >= 0 && sg ? `${Math.floor(f * 3)}:${String(Math.floor((f * 180) % 60)).padStart(2, '0')}` : lab, C0[0], C0[1] - 6, 46, '#fff');
      txt(g, b.i >= 0 && !sg ? 'citești + ciornă' : 'cu voce tare', C0[0], C0[1] + 40, 19, C.dim, { w: 700 });
    },
  };
}

/* =================================================== EXP. 2: PETELE DE SALIVĂ (4 loturi) */
function mouse(g, x, y, s = 1, a = 1) {
  g.save(); g.globalAlpha = a; g.translate(x, y); g.scale(s, s);
  g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 9; g.beginPath(); g.moveTo(58, 10); g.quadraticCurveTo(110, 30, 120, -10); g.stroke(); g.strokeStyle = '#f2b6c0'; g.lineWidth = 4; g.stroke();
  ell(g, 10, 6, 62, 36, '#e9e4ec', { ow: 5 }); ell(g, -50, -4, 30, 24, '#e9e4ec', { ow: 5 }); ell(g, -40, -30, 14, 14, '#f2b6c0', { ow: 4 });
  g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.moveTo(-64, -8); g.lineTo(-54, -6); g.stroke(); dot(g, -80, 2, 5, '#f28aa0', { ow: 2 });
  g.restore();
}
export function spots() {
  const X = [140, 380, 620, 860]; const D = [16, 30, 4, 15]; const TM = [10, 20, 30, 40, 50];
  const LB = [['Lot 1', 'ser fiziologic', '(martor)'], ['Lot 2', 'ser + pilocarpină', ''], ['Lot 3', 'ser + atropină', ''], ['Lot 4', 'atropină +', 'pilocarpină']];
  return {
    home: HOME, anchors: X.map((x) => [x - 80, 335]),
    phase: (i) => ['martorul', 'pilocarpina: cele mai mari', 'atropina: cele mai mici', 'împreună ≈ martorul'][i] || '',
    draw(g, t, b) {
      bg(g);
      TM.forEach((m, r) => txt(g, `${m} min`, 30, 395 + r * 100, 16, C.dim, { align: 'left', w: 700 }));
      X.forEach((x, l) => {
        const act = b.i === l; const done = b.i < 0 || b.i > l; const a = act || done ? 1 : 0.4;
        if (act) panel(g, x - 112, 75, 224, 795, { fill: 'rgba(255,207,133,.12)', stroke: C.hi, lw: 4 });
        txt(g, LB[l][0], x, 105, 22, C.hi, { alpha: a }); txt(g, LB[l][1], x, 137, 17, C.cream, { alpha: a, w: 700 }); if (LB[l][2]) txt(g, LB[l][2], x, 161, 17, C.cream, { alpha: a, w: 700 });
        mouse(g, x - 10, 230, 0.95, a); txt(g, 'uretan i.p.', x, 282, 15, C.dim, { alpha: a, w: 700 });
        TM.forEach((m, r) => {
          const y = 395 + r * 100; const p = new Path2D(); p.roundRect(x - 44, y - 44, 88, 88, 8);
          g.save(); g.globalAlpha = a; g.fillStyle = '#fbf3e2'; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(p); g.restore();
          const show = done ? 1 : act ? clamp((b.bt / (b.bd * 0.8)) * 5 - r) : 0;
          if (show > 0) { const d = (D[l] + (l === 1 ? r * 1.2 : 0)) * ease(show); ell(g, x, y, d, d * 0.92, 'rgba(90,160,230,.8)', { ow: 2 }); }
        });
      });
      const fin = b.i < 0 || (b.i === 3 && b.bt > b.bd * 0.8);
      txt(g, 'pete: 2 > 1 ≈ 4 > 3', 500, 905, 24, C.hi, { alpha: fin ? 1 : 0.25 });
    },
  };
}

/* =================================================== EXP. 2: ACINUL SALIVAR (receptori M, Gq) */
export function acinus() {
  const AX = 640, AY = 330, N = 8;
  return {
    home: HOME, anchors: [[AX + 190, AY - 190], [AX - 260, AY - 200], [AX + 250, AY + 130], [AX + 70, 830]],
    phase: (i) => ['receptori M (Gq) pe celula acinară', 'pilocarpină → secreție ↑', 'atropină → secreție ↓', 'împreună ≈ martorul'][i] || '',
    draw(g, t, b) {
      bg(g);
      const k = b.i; const rate = k === 1 ? 10 : k === 2 ? 1 : 3; const flash = k === 1 ? 0.5 + 0.5 * Math.sin(t * 6) : 0;
      // ductul
      tube(g, [[AX, AY + 60], [AX, 600], [AX + 40, 900]], 40, '#f2d6c0', {});
      tube(g, [[AX, AY + 60], [AX, 600], [AX + 40, 900]], 18, '#cfe8ff', { ow: 0 });
      // celulele acinare (piramidale, în jurul lumenului)
      for (let j = 0; j < N; j++) {
        const a = j / N * Math.PI * 2 - Math.PI / 2; const cx = AX + Math.cos(a) * 140, cy = AY + Math.sin(a) * 140;
        g.save(); g.translate(cx, cy); g.rotate(a + Math.PI / 2);
        const p = new Path2D(); p.moveTo(-34, 70); p.lineTo(-62, -60); p.quadraticCurveTo(0, -84, 62, -60); p.lineTo(34, 70); p.closePath();
        g.globalAlpha = 1; paint(g, p, '#e9c79a', '#d2a970', '#fff1d8', [-62, -84, 124, 154], OUT, 5);
        if (flash > 0) { g.save(); g.globalAlpha = 0.45 * flash; g.fillStyle = C.ca; g.fill(p); g.restore(); }
        ell(g, 0, -34, 18, 15, '#5a4bb0', { ow: 3 });
        for (let q = 0; q < 3; q++) dot(g, -14 + q * 14, 28, 7, C.water, { ow: 2 });
        // receptorul M pe fața bazală (spre exterior)
        const p2 = new Path2D(); p2.roundRect(-16, -88, 32, 18, 8); g.fillStyle = k === 2 || k === 3 ? '#7b5aa6' : C.gq; g.fill(p2); g.strokeStyle = k === 0 ? C.hi : OUT; g.lineWidth = k === 0 ? 5 : 3; g.stroke(p2);
        if (k === 1 || k === 3) dot(g, 8, -100, 9, C.pilo, { ow: 2.5, alpha: k === 3 ? 0.9 : 1 });
        if (k === 2 || k === 3) { const bl = new Path2D(); bl.roundRect(-14, -112, 26, 20, 5); g.fillStyle = C.atr; g.fill(bl); g.strokeStyle = OUT; g.lineWidth = 2.5; g.stroke(bl); }
        g.restore();
      }
      ell(g, AX, AY, 50, 50, '#cfe8ff', { ow: 4 }); txt(g, 'lumen', AX, AY, 16, OUT, { stroke: false });
      // saliva care curge
      const P = curve([[AX, AY + 50], [AX, 600], [AX + 40, 900]]);
      for (let j = 0; j < rate; j++) { const v = ((j / rate) + t * 0.18) % 1; const [x, y] = at(P, v); dot(g, x, y, 8, '#4f9fe6', { ow: 2 }); }
      // pilocarpina / atropina care vin din sânge (capilar)
      tube(g, [[60, 60], [300, 120], [380, 320], [300, 560]], 26, C.blood, {});
      if (k === 1 || k === 3) for (let j = 0; j < 5; j++) { const v = ((j / 5) + t * 0.25) % 1; dot(g, lerp(330, AX - 160, v), lerp(150 + j * 40, AY - 40 + j * 20, v), 8, C.pilo, { ow: 2, alpha: Math.sin(v * Math.PI) }); }
      if (k === 2 || k === 3) for (let j = 0; j < 4; j++) { const v = ((j / 4) + t * 0.2 + 0.1) % 1; const x = lerp(330, AX + 160, v), y = lerp(420 + j * 30, AY + 60 - j * 30, v); g.save(); g.globalAlpha = Math.sin(v * Math.PI); g.fillStyle = C.atr; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.roundRect(x - 9, y - 7, 18, 14, 4); g.fill(); g.stroke(); g.restore(); }
      // indicatorul de secreție
      const lab = k === 1 ? 'secreție ↑' : k === 2 ? 'secreție ↓ (sub martor)' : k === 3 ? '≈ martorul' : 'secreție bazală';
      pill(g, 840, 650, 270, 56, k === 1 ? C.pilo : k === 2 ? C.atr : '#fff3e0', lab, { size: 19 });
      txt(g, 'Gq → IP3 → Ca²⁺ ↑\n→ secreție', 840, 740, 19, C.cream, { alpha: k === 1 ? 1 : 0.45 });
      txt(g, 'capilar', 250, 590, 17, C.blood);
      txt(g, 'saliva', AX + 110, 880, 18, C.water);
    },
  };
}

/* =================================================== EXP. 3: PUPILELE IEPURILOR */
function rabbit(g, cy, a = 1) {
  g.save(); g.globalAlpha = a;
  for (const d of [-1, 1]) { g.save(); g.translate(500 + d * 110, cy - 140); g.rotate(d * 0.5); ell(g, 0, -40, 34, 72, '#efe9e4', { ow: 5 }); ell(g, 0, -40, 15, 50, '#f2b6c0', { ow: 0 }); g.restore(); }
  ell(g, 500, cy, 400, 165, '#efe9e4', { ow: 6, shade: '#d8cfc8' });
  ell(g, 500, cy + 80, 26, 18, '#f28aa0', { ow: 4 });
  g.restore();
}
export function rabbits() {
  const Y1 = 250, Y2 = 690; const ODx = 320, OSx = 680; const R = 92;
  const st0 = { p1: 34, p2: 34, o1: 34, o2: 34 };
  return {
    home: HOME, anchors: [[OSx + 112, Y1 + 95], [ODx - 112, Y1 + 95], [ODx - 112, Y2 + 95], [ODx + 112, Y2 - 95]],
    phase: (i) => ['OS martor: reflex prezent', 'atropină: midriază, reflex abolit', 'pilocarpină: mioză', 'pilocarpină → atropină: midriază'][i] || '',
    draw(g, t, b) {
      bg(g);
      const k = b.i; const u = k >= 0 ? clamp(b.bt / (b.bd * 0.5)) : 0;
      let od1 = 34, od2 = 34, os = 34; let flash = 0;
      if (k >= 1) od1 = k === 1 ? lerp(34, 66, ease(clamp((b.bt - 0.6) / 2))) : 66;
      if (k >= 2) od2 = k === 2 ? lerp(34, 14, ease(clamp((b.bt - 0.6) / 2))) : 14;
      if (k === 3) od2 = lerp(14, 66, ease(clamp((b.bt - 0.6) / 2.4)));
      if (k === 0) { flash = clamp((b.bt - 0.8) / 0.4) * (1 - clamp((b.bt - 3) / 1)); os = 34 - 14 * flash; }
      if (k === 1) { flash = clamp((b.bt - 3.4) / 0.4) * (1 - clamp((b.bt - 5.6) / 0.8)); }
      rabbit(g, Y1, 1); rabbit(g, Y2, 1);
      txt(g, 'iepurele 1', 500, Y1 - 35, 21, OUT, { stroke: false });
      txt(g, 'iepurele 2', 500, Y2 - 35, 21, OUT, { stroke: false });
      // OD = ochiul drept al iepurelui (în stânga privitorului)
      const eye = (x, y, pr, lab, hi) => { iris(g, x, y, R, pr, { col: '#7a4a2a' }); if (hi) glowRing(g, x, y, R + 34, R + 34, 0, 1); txt(g, lab, x, y + R + 48, 18, C.cream, { w: 700 }); };
      eye(ODx, Y1, od1, 'OD · atropină', k === 1);
      eye(OSx, Y1, k === 0 ? os : 34, 'OS · martor', k === 0);
      eye(ODx, Y2, od2, k === 3 ? 'OD · pilocarpină → atropină' : 'OD · pilocarpină', k === 2 || k === 3);
      eye(OSx, Y2, k === 0 ? os : 34, 'OS · martor', k === 0);
      // picăturile
      const drop = (x, y, col, p) => { if (p <= 0 || p >= 1) return; g.save(); g.translate(x + 60, y - 170); const pp = new Path2D(); pp.roundRect(-10, -70, 20, 80, 8); paint(g, pp, 'rgba(230,240,255,.85)', null, null, [-10, -70, 20, 80], OUT, 3); g.restore(); dot(g, x + 60, lerp(y - 150, y - 40, p), 10, col, { ow: 3 }); };
      if (k === 1) drop(ODx, Y1, C.atr, clamp(b.bt / 0.8));
      if (k === 2) drop(ODx, Y2, C.pilo, clamp(b.bt / 0.8));
      if (k === 3) drop(ODx, Y2, C.atr, clamp(b.bt / 0.8));
      // lanterna (reflexul fotomotor)
      if (flash > 0) {
        const tg = k === 0 ? [[OSx, Y1], [OSx, Y2]] : [[ODx, Y1]];
        tg.forEach(([x, y]) => { g.save(); g.globalAlpha = flash * 0.9; g.fillStyle = '#fff6b0'; g.beginPath(); g.moveTo(x + 220, y - 120); g.lineTo(x + 30, y - 40); g.lineTo(x + 30, y + 40); g.closePath(); g.fill(); g.restore(); });
      }
      if (k === 1 && b.bt > 3.6) txt(g, 'reflex fotomotor abolit', 500, Y1 + 115, 20, C.key);
      if (k === 0 && flash > 0.5) txt(g, 'reflex fotomotor prezent', 500, Y1 + 115, 20, C.para);
      void u; void st0;
    },
  };
}

/* =================================================== LA PACIENT: poze + desene */
export function clinic() {
  const PN = [[20, 20], [510, 20], [20, 480], [510, 480]]; const PW = 470, PH = 400;
  const ecg = (x) => { const rr = 0.42; const ph = x % rr; return 0.1 * Math.exp(-((ph - 0.05) ** 2) / 0.0008) + Math.exp(-((ph - 0.14) ** 2) / 0.00009) - 0.25 * Math.exp(-((ph - 0.17) ** 2) / 0.0001) + 0.2 * Math.exp(-((ph - 0.3) ** 2) / 0.002); };
  return {
    home: HOME, anchors: PN.map(([x, y]) => [x + 30, y + 30]),
    draw(g, t, b) {
      bg(g);
      PN.forEach(([x, y], k) => { if (b.i === k) { g.save(); g.shadowColor = C.hi; g.shadowBlur = 26; g.strokeStyle = C.hi; g.lineWidth = 6; g.beginPath(); g.roundRect(x - 4, y - 4, PW + 8, PH + 8, 18); g.stroke(); g.restore(); } });
      photo(g, 'midriaza', 20, 20, PW, 330, [180, 40, 620, 310]);
      txt(g, 'midriază · Raziel, CC BY-SA 3.0', 255, 380, 16, C.cream, { w: 600 });
      photo(g, 'mioza', 510, 20, PW, 330, [20, 10, 420, 200]);
      txt(g, 'mioză · anonim, CC0', 745, 380, 16, C.cream, { w: 600 });
      // glaucomul acut: ochi roșu, cornee tulbure, pupilă semidilatată
      panel(g, 20, 480, PW, PH, { fill: '#1d140a' });
      ell(g, 255, 660, 200, 110, '#f3c4be', { ow: 6 });
      g.save(); g.strokeStyle = '#d23a3a'; g.lineWidth = 3; for (let j = 0; j < 14; j++) { const a = j / 14 * Math.PI * 2; g.beginPath(); g.moveTo(255 + Math.cos(a) * 190, 660 + Math.sin(a) * 100); g.quadraticCurveTo(255 + Math.cos(a + 0.2) * 150, 660 + Math.sin(a + 0.2) * 85, 255 + Math.cos(a) * 110, 660 + Math.sin(a) * 75); g.stroke(); } g.restore();
      iris(g, 255, 660, 78, 44, { col: '#6b7f9a', sclera: 'rgba(0,0,0,0)' });
      ell(g, 255, 660, 80, 80, 'rgba(220,235,245,.35)', { ow: 0 });
      txt(g, 'glaucom acut: ochi roșu, pupilă semidilatată', 255, 830, 16, C.cream, { w: 700 });
      // tahicardie sinusală
      panel(g, 510, 480, PW, PH, { fill: '#0e1a10' });
      g.save(); g.strokeStyle = 'rgba(125,255,154,.18)'; g.lineWidth = 1; for (let xx = 520; xx < 980; xx += 24) { g.beginPath(); g.moveTo(xx, 490); g.lineTo(xx, 870); g.stroke(); } g.restore();
      g.save(); g.strokeStyle = '#7dff9a'; g.lineWidth = 3.5; g.beginPath(); for (let j = 0; j <= 400; j++) { const xx = j / 400; const X = 530 + xx * 430; const Y = 700 - ecg(xx * 2.2) * 120; if (j) g.lineTo(X, Y); else g.moveTo(X, Y); } g.stroke(); g.restore();
      txt(g, 'tahicardie sinusală', 745, 830, 18, '#7dff9a');
    },
  };
}

/* =================================================== GLAUCOMUL: drenajul umorii apoase */
export function glaucoma() {
  const AXY = 760;
  return {
    home: HOME, anchors: [[720, 420], [560, 710], [460, 300], [615, 520]],
    phase: (i) => ['se formează: corpul ciliar', 'trece prin pupilă', 'drenaj: Fontana → Schlemm', 'pilocarpina deschide unghiul'][i] || '',
    draw(g, t, b) {
      bg(g);
      const pilo = b.i === 3 ? ease(clamp(b.bt / (b.bd * 0.5))) : 0;
      g.save(); g.translate(0, 60);
      // sclera + corneea (jumătatea de sus a segmentului anterior, privită din lateral; lumina vine din stânga)
      tube(g, [[520, 260], [700, 210], [980, 200]], 44, '#f4efe6', { raw: false });
      const cor = curve([[180, AXY], [230, 520], [360, 330], [520, 262]]); tube(g, cor, 22, 'rgba(200,230,255,.9)', { raw: true });
      txt(g, 'cornee', 190, 470, 19, '#cfe8ff');
      // cristalinul
      ell(g, 700, AXY, 80, 300, 'rgba(230,240,255,.55)', { ow: 5 });
      txt(g, 'cristalin', 700, 620, 18, OUT, { stroke: false });
      // corpul ciliar + mușchiul ciliar
      const cb = new Path2D(); cb.moveTo(560, 290); cb.lineTo(700, 250); cb.quadraticCurveTo(720, 340, 640, 420); cb.quadraticCurveTo(600, 380, 560, 290); paint(g, cb, '#c75b3f', '#a4432c', '#f0a080', [560, 250, 160, 170], OUT, 5);
      if (pilo > 0) { g.save(); g.globalAlpha = pilo; g.strokeStyle = C.para; g.lineWidth = 6; g.stroke(cb); g.restore(); }
      txt(g, 'corp ciliar +\nmușchi ciliar', 840, 330, 18, '#f0a080');
      // irisul: de la rădăcină (unghi) spre pupilă; pilocarpina îl trage spre ax (mioză) și deschide unghiul
      const root = [lerp(545, 565, pilo), lerp(330, 345, pilo)]; const tip = [lerp(575, 590, pilo), lerp(640, 705, pilo)];
      tube(g, [root, [lerp(560, 575, pilo), 480], tip], lerp(30, 22, pilo), '#8a5a3a', {});
      txt(g, 'iris', 470, 560, 19, '#e0b08a');
      // canalul Schlemm + spațiile Fontana (unghiul)
      ell(g, 505, 280, 18, 12, '#9fd3f0', { ow: 4, glow: 0 });
      const gap = lerp(14, 40, pilo);
      g.save(); g.strokeStyle = '#e8dcc0'; g.lineWidth = 3; for (let j = 0; j < 4; j++) { g.beginPath(); g.moveTo(510 + j * 6, 296); g.lineTo(520 + j * 8, 296 + gap); g.stroke(); } g.restore();
      txt(g, 'canalul Schlemm', 320, 236, 18, '#9fd3f0');
      txt(g, 'camera anterioară', 360, 640, 18, '#cfe8ff');
      txt(g, 'camera posterioară', 860, 640, 16, '#cfe8ff', { w: 700 }); lead(g, 790, 630, 610, 560);
      // umoarea apoasă
      const path = curve([[640, 400], [625, 520], [600, 650], [560, 700], [420, 620], [430, 420], [512, 320], [505, 282], [470, 200]]);
      const spd = 0.08 * (1 + 1.6 * pilo);
      const upto = b.i === 0 ? 0.25 : b.i === 1 ? 0.55 : 1;
      flow(g, path, t, '#4f9fe6', 14, spd, 8, { u1: upto });
      if (b.i === 0 || b.i < 0) glowRing(g, 640, 360, 70, 80, 0, b.i === 0 ? 1 : 0.0);
      g.restore();
      // presiunea intraoculară
      panel(g, 30, 70, 230, 140, {});
      txt(g, 'PIO', 145, 95, 18, C.cream);
      const pv = lerp(0.65, 0.3, pilo); g.save(); g.strokeStyle = OUT; g.lineWidth = 16; g.beginPath(); g.arc(145, 190, 64, Math.PI, 2 * Math.PI); g.stroke(); g.strokeStyle = '#4a3d30'; g.lineWidth = 10; g.stroke(); g.strokeStyle = pv > 0.5 ? C.key : C.gs; g.beginPath(); g.arc(145, 190, 64, Math.PI, Math.PI + pv * Math.PI); g.stroke(); g.restore();
      txt(g, pilo > 0.5 ? 'PIO ↓' : 'PIO', 145, 170, 20, pilo > 0.5 ? C.gs : C.cream);
      // atropina (contraindicată)
      panel(g, 700, 70, 280, 130, { fill: 'rgba(197,123,255,.12)', stroke: C.atr });
      txt(g, 'atropina: irisul strâns\nîn unghi → drenaj blocat\n→ PIO ↑ (contraindicată)', 840, 135, 16, C.atr, { w: 700 });
      if (b.i === 3) txt(g, 'mioză + contracția mușchiului ciliar → unghi larg', 330, 880, 19, C.para, { alpha: pilo });
    },
  };
}
