// Scenele cazurilor 5–7 din LP 3 oficial (intestinul, saliva, pupila) + tabelele receptorilor: preluate din deck-ul LP 4 vechi
// și adaptate la LP 3 oficial (intestin subțire, M1,3, 3 iepuri, PIO).
import { W, H, HOME, cam, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, st, u01, loopT, txt, pill, dot, ell, arr, lead, cross, check, tube, curve, at, flow,
  ligand, membrane, receptor, gprot, enzyme, myofil, heart, iris, icon, chart, mark, bath, glowRing, blob, paint, bb, tile } from './fk.js';

const sm = (x, a, w) => ease(clamp((x - a) / w));
// intestinul: bazal → pilocarpină (contracție: tonus + vârfuri) → atropină (relaxare)
export const INT = { marks: [[0.3, 'pilocarpină', C.pilo], [0.65, 'atropină', C.atr]], cuts: [0, 0.28, 0.63, 1] };
export function fInt(x) {
  const on = sm(x, 0.3, 0.05) * (1 - sm(x, 0.65, 0.06));
  const tone = 0.55 * on - 0.18 * sm(x, 0.65, 0.08);
  const amp = 0.06 + 0.1 * on - 0.04 * sm(x, 0.65, 0.08);
  return -0.3 + tone + amp * Math.sin(x * Math.PI * 2 * 30);
}

/* =================================================== GRILĂ DE ICONIȚE (pentru tabele) */
// sceneOpts.tiles: [{ico, chip, cc, sub, l, r}], cols
export function tiles({ spec }) {
  const o = spec.sceneOpts || {}; const T = o.tiles; const cols = o.cols || 3; const rows = Math.ceil(T.length / cols);
  const WW = o.narrow ? 600 : 1000, HH = o.narrow ? 897 : 934;
  const GX = 16, GY = 16; const w = (WW - 30 - GX * (cols - 1)) / cols; const h = Math.min(300, (HH - 30 - GY * (rows - 1)) / rows);
  const y0 = (HH - (rows * h + (rows - 1) * GY)) / 2;
  const pos = T.map((_, k) => { const r = Math.floor(k / cols), c = k % cols; const n = r === rows - 1 ? T.length - r * cols : cols; const off = (cols - n) * (w + GX) / 2; return [15 + off + c * (w + GX), y0 + r * (h + GY)]; });
  const kk = T.map(() => 0);
  return {
    W: WW, H: HH, home: cam(WW / 2, HH / 2, 1), anchors: pos.map(([x, y]) => [x + 24, y + 24]),
    draw(g, t, b) {
      bg(g, WW, HH);
      T.forEach((tl, k) => {
        const [x, y] = pos[k]; const act = b.i === k || b.i < 0; kk[k] = lerp(kk[k], b.i === k ? 1 : 0, 0.1);
        if (tl.l) {
          tile(g, x, y, w, h, { ico: tl.ico, is: 0.7, io: tl.io, dim: 0.5 }, act, kk[k]);
          if (tl.n) txt(g, tl.n, x + w / 2, y + 22, 17, C.hi, { alpha: act ? 1 : 0.5 });
          const a = act ? 1 : 0.5; const hw = (w - 30) / 2;
          for (const [side, s, col] of [[0, tl.l, C.para], [1, tl.r, C.sym]]) { const bx = x + 10 + side * (hw + 10); const p = new Path2D(); p.roundRect(bx, y + h * 0.58, hw, h * 0.38, 12); g.save(); g.globalAlpha = a; g.fillStyle = side ? 'rgba(255,154,74,.25)' : 'rgba(95,207,122,.25)'; g.fill(p); g.strokeStyle = col; g.lineWidth = 2.5; g.stroke(p); g.restore(); txt(g, s, bx + hw / 2, y + h * 0.77, 14.5, '#fff', { alpha: a, w: 700, maxW: hw - 8 }); }
        } else tile(g, x, y, w, h, { ...tl, dim: 0.5 }, act, kk[k]);
      });
      if (o.legend) txt(g, o.legend, WW / 2, HH - 12, 16, C.dim, { w: 700 });
    },
  };
}

/* =================================================== OCHIUL: CIRCULAR (M3) vs RADIAL (α1) */
export function eye() {
  const X = 620, Y = 330, R = 220; let pr = 70;
  return {
    home: HOME, anchors: [() => [X - (pr + 14) * 0.7, Y - (pr + 14) * 0.7], () => [X + (pr + R) / 2 * 0.72, Y - (pr + R) / 2 * 0.72], [X - 300, Y - 200], [70, 800]],
    phase: (i) => ['pilocarpina: mioză (M3)', 'adrenalina: midriază activă (α1)', 'atropina: midriază', 'midriaza: PIO ↑'][i] || '',
    draw(g, t, b) {
      bg(g);
      const u = b.i >= 0 ? clamp(b.bt / (b.bd * 0.6)) : 0;
      let target = 70, circ = 0, rad = 0;
      if (b.i === 0) { target = lerp(70, 34, ease(u)); circ = 1; }
      if (b.i === 1) { target = lerp(70, 140, ease(u)); rad = 1; }
      if (b.i === 2) { target = lerp(70, 140, ease(u)); }
      if (b.i === 3) target = 140;
      if (b.i < 0) { const c = loopT(t, 9) * 3; const k = Math.floor(c), f = clamp((c - k) * 1.6); target = k === 0 ? lerp(70, 34, ease(f)) : k === 1 ? lerp(34, 140, ease(f)) : lerp(140, 70, ease(f)); circ = k === 0 ? 1 : 0; rad = k === 1 ? 1 : 0; }
      pr = target;
      iris(g, X, Y, R, pr, { circ, rad, col: '#8a5a3a' });
      if (circ > 0.3) for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI * 2 + t * 0.5; const r = pr + 22; g.save(); g.strokeStyle = C.para; g.lineWidth = 6; g.beginPath(); g.arc(X, Y, r, a, a + 0.9); g.stroke(); g.restore(); const ax = X + Math.cos(a + 0.9) * r, ay = Y + Math.sin(a + 0.9) * r; dot(g, ax, ay, 7, C.para, { ow: 2 }); }
      if (rad > 0.3) for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI * 2 + Math.PI / 4; arr(g, X + Math.cos(a) * (pr + 30), Y + Math.sin(a) * (pr + 30), X + Math.cos(a) * (pr + 85), Y + Math.sin(a) * (pr + 85), C.sym, 6); }
      if (b.i === 0) ligand(g, X - 300, Y - 200, C.pilo, 'P', 22);
      if (b.i === 1) ligand(g, X + 280, Y - 230, C.adr, 'Adr', 24);
      if (b.i >= 2) { const a = b.i === 2 ? clamp(b.bt / 1.2) : 1; txt(g, 'M3 blocat', X - 210, Y - 245, 22, C.atr, { alpha: a }); cross(g, X - 210, Y - 205, 18, C.atr, a); ligand(g, X - 300, Y - 200, C.atr, 'A', 20, { alpha: a, shape: 'block' }); }
      const ly = 640;
      pill(g, 690, ly, 560, 60, 'rgba(95,207,122,.9)', b.i >= 2 ? 'circular · M3 blocat (atropină) → relaxat' : 'circular · M3 (Gq) · pilocarpina → mioză', { size: 18, glow: b.i === 0 || b.i === 2 ? 0.8 : 0, alpha: b.i === 1 ? 0.45 : 1 });
      pill(g, 690, ly + 80, 560, 60, 'rgba(255,154,74,.95)', 'radial · α1 (Gq) · adrenalina → midriază activă', { size: 18, glow: b.i === 1 ? 0.8 : 0, alpha: b.i === 0 || b.i >= 2 ? 0.45 : 1 });
      txt(g, `pupila: ${pr < 50 ? 'mioză' : pr > 110 ? 'midriază' : 'normală'}`, X, Y + R + 45, 22, C.cream);
      panel(g, 30, 780, 940, 130, { stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3, alpha: b.i < 0 || b.i === 3 ? 1 : 0.4 });
      txt(g, 'antagoniștii M: mușchii circular și ciliar relaxați → PIO ↑', 520, 845, 20, b.i === 3 ? C.key : C.cream, { alpha: b.i < 0 || b.i === 3 ? 1 : 0.5, maxW: 900 });
    },
  };
}

/* =================================================== ÎNREGISTRAREA (ileon / uter) */
export function trace() {
  const D = INT, f = fInt; const CX = 30, CY = 430, CW = 940, CH = 400;
  return {
    home: HOME, anchors: D.cuts.slice(0, D.cuts.length - 1).map((c, k) => [CX + 14 + ((c + D.cuts[k + 1]) / 2) * (CW - 28), CY - 20]),
    phase: (i) => ['bazal', 'pilocarpină → contracție', 'atropină → relaxare'][i] || '',
    draw(g, t, b) {
      bg(g);
      const u = b.i >= 0 ? lerp(D.cuts[b.i], D.cuts[b.i + 1], clamp(b.bt / (b.bd * 0.8))) : loopT(t, 14);
      const v = f(Math.max(0.001, u));
      const k = clamp((v + 0.6) / 1.1);
      bath(g, 130, 230, { organ: 'ileon', k, t, s: 0.5 });
      txt(g, 'fragment de intestin subțire', 270, 120, 20, C.cream, { align: 'left' });
      txt(g, 'izotonie · izoionie · O₂ · 37 °C', 270, 160, 18, C.dim, { align: 'left', w: 700 });
      txt(g, 'contracție tonică = platoul', 270, 235, 19, C.cream, { align: 'left', w: 700 }); txt(g, 'contracție fazică = vârfurile', 270, 270, 19, C.cream, { align: 'left', w: 700 });
      const m = chart(g, CX, CY, CW, CH, f, u, { base: f(0.05) });
      D.marks.forEach(([x, l, col]) => mark(g, m.X(x), CY, CY + CH, l, col, u >= x - 0.002 ? 1 : 0.18));
      txt(g, 'timp →', CX + CW - 60, CY + CH + 36, 18, C.dim, { w: 700 });
      txt(g, 'înregistrare schematică', CX + 120, CY + CH + 36, 16, C.dim, { w: 600 });
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
    phase: (i) => (gs ? ['β2 + agonist', 'Gs → adenilat-ciclaza', 'AMPc ↑ → PKA', 'relaxare'] : ['M1,3 + pilocarpină', 'Gq → PLC', 'IP3 + DAG', 'Ca²⁺ ↑ → contracție'])[i] || '',
    draw(g, t, b) {
      bg(g);
      const ph = b.i >= 0 ? b.i + clamp(b.bt / (b.bd * 0.75)) : loopT(t, 12) * 4;
      const p = (k) => clamp(ph - k);
      txt(g, 'în afara celulei', 880, 120, 18, C.dim, { w: 700 }); txt(g, 'citoplasma', 900, 330, 18, C.dim, { w: 700 });
      membrane(g, 0, 1000, MY, { h: 54 });
      // agonistul și antagonistul care așteaptă
      const lp = ease(clamp(p(0) / 0.6));
      receptor(g, RX, MY, col, gs ? 'β2' : 'M1,3', { s: 1.1, glow: p(0) > 0.6 ? 1 : 0, gc: col, ly: -118, size: 28 });
      ligand(g, lerp(RX + 10, RX, lp), lerp(60, MY - 66, lp), gs ? C.adr : C.pilo, gs ? 'Adr' : 'P', 24);
      ligand(g, 70, 100, gs ? C.prop : C.atr, gs ? 'Pr' : 'A', 22, { shape: 'block', alpha: 0.95 });
      txt(g, gs ? 'propranolol:\nblochează β2' : 'atropina: antagonist\nM1,3 (fără activitate\nintrinsecă)', 30, gs ? 160 : 170, 16, gs ? C.prop : C.atr, { align: 'left', w: 700 });
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
      txt(g, 'antagoniștii M (atropina):\nrelaxează mușchii\n→ PIO ↑', 840, 135, 16, C.atr, { w: 700 });
      if (b.i === 3) txt(g, 'mioză + contracția mușchiului ciliar → unghi larg', 330, 880, 19, C.para, { alpha: pilo });
    },
  };
}

