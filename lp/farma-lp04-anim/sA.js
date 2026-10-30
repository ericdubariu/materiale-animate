// Scenele pentru intro + Partea A (receptorii SNV): coperta, harta, formatul OSPE, lanțurile de neuroni, proteinele G,
// grila de iconițe pentru tabele, placa motorie (N2), frâna vagală (M2), irisul (M3 vs α1), agonist vs antagonist.
import { W, H, HOME, cam, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, st, u01, loopT, txt, pill, dot, ell, arr, lead, cross, check, tube, curve, at, flow,
  ligand, membrane, receptor, gprot, enzyme, channel, myofil, heart, iris, icon, tile, glowRing } from './fk.js';

/* =================================================== COPERTA */
export function cover() {
  const R = [[40, 50], [520, 50], [40, 490], [520, 490]]; const k = [0, 0, 0, 0];
  const T = ['receptori + proteina G', 'parasimpatic vs simpatic', 'cele 4 experimente', 'clasificare + grile'];
  return {
    home: HOME, anchors: R.map(([x, y]) => [x + 30, y + 30]),
    draw(g, t, b) {
      bg(g);
      R.forEach(([x, y], i) => {
        const act = b.i === i || (b.i < 0 && Math.floor(t / 2.4) % 4 === i); k[i] = lerp(k[i], act ? 1 : 0, 0.08);
        panel(g, x, y, 440, 400, { fill: act ? 'rgba(255,207,133,.13)' : 'rgba(255,236,200,.06)', stroke: act ? C.hi : 'rgba(255,225,180,.2)', lw: act ? 5 : 3 });
        txt(g, T[i], x + 220, y + 360, 24, C.cream);
        const cx = x + 220, cy = y + 180;
        if (i === 0) { membrane(g, x + 30, x + 410, cy - 20, { h: 44 }); receptor(g, cx - 70, cy - 20, C.gq, 'M3', { s: 0.9, ly: -86, size: 26 }); gprot(g, cx - 70, cy + 60, C.gq, 'Gq', { s: 0.9 }); receptor(g, cx + 90, cy - 20, C.gs, 'β2', { s: 0.9, ly: -86, size: 26 }); gprot(g, cx + 90, cy + 60, C.gs, 'Gs', { s: 0.9 }); }
        if (i === 1) { g.save(); g.fillStyle = 'rgba(95,207,122,.28)'; g.fillRect(x + 20, y + 40, 200, 280); g.fillStyle = 'rgba(255,154,74,.28)'; g.fillRect(x + 220, y + 40, 200, 280); g.restore(); icon(g, 'eye', cx - 100, cy - 40, 1.3, { pupil: 7 }); icon(g, 'eye', cx + 100, cy - 40, 1.3, { pupil: 20 }); icon(g, 'heart', cx - 100, cy + 90, 0.9); icon(g, 'heart', cx + 100, cy + 90, 1.05); txt(g, 'mioză', cx - 100, cy + 10, 20, C.para); txt(g, 'midriază', cx + 100, cy + 10, 20, C.sym); }
        if (i === 2) { ['gut', 'gland', 'eye', 'uterus'].forEach((n, j) => icon(g, n, x + 75 + (j % 2) * 290 - (j % 2) * 0, y + 95 + Math.floor(j / 2) * 160, 1.05, { pupil: 14 })); txt(g, 'ileon · salivă', cx, y + 90, 20, C.cream, { w: 700 }); txt(g, 'pupilă · uter', cx, y + 250, 20, C.cream, { w: 700 }); }
        if (i === 3) { icon(g, 'pill', cx - 90, cy - 50, 1.3, { col: C.para }); icon(g, 'pill', cx + 90, cy - 50, 1.3, { col: C.sym }); txt(g, '-mimetice\n-litice', cx, cy + 70, 26, C.cream); }
      });
    },
  };
}

/* =================================================== HARTA LP-ului */
export function harta() {
  const R = [[40, 300], [520, 300], [40, 610], [520, 610]]; const k = [0, 0, 0, 0];
  const T = [['Receptorii', 'N1, N2 · M1–M3', 'α1, α2 · β1–β3'], ['Efectele pe organe', 'parasimpatic vs simpatic', '= efecte opuse'], ['4 experimente', 'ileon · salivă', 'pupilă · uter'], ['Clasificarea', 'colinergice', 'adrenergice']];
  const CH = ['substanță', 'receptor', 'proteina G', 'mesager', 'efect'];
  return {
    home: HOME, anchors: R.map(([x, y]) => [x + 30, y + 30]),
    draw(g, t, b) {
      bg(g);
      panel(g, 30, 40, 940, 220, { fill: 'rgba(194,122,16,.16)' });
      txt(g, 'lanțul pe care îl spui la orice experiment', 500, 85, 22, C.cream, { w: 700 });
      const run = loopT(t, 6) * 6;
      CH.forEach((c, j) => { const x = 110 + j * 195; const a = REDUCED ? 1 : clamp(run - j * 0.7) > 0 ? 1 : 0.45; pill(g, x, 175, 170, 66, [C.pilo, C.gq, C.gq, C.ca, C.muscle][j], c, { size: 20, alpha: a, glow: a > 0.9 && run - j * 0.7 < 1 ? 1 : 0 }); if (j < 4) arr(g, x + 88, 175, x + 110, 175, C.cream, 5, 0.9); });
      R.forEach(([x, y], i) => {
        const act = b.i === i; k[i] = lerp(k[i], act ? 1 : 0, 0.08);
        panel(g, x, y, 440, 280, { fill: act ? 'rgba(255,207,133,.14)' : 'rgba(255,236,200,.06)', stroke: act ? C.hi : 'rgba(255,225,180,.2)', lw: act ? 5 : 3 });
        txt(g, T[i][0], x + 220, y + 60, 28, C.hi);
        txt(g, T[i][1], x + 220, y + 135, 24, C.cream, { w: 700 });
        txt(g, T[i][2], x + 220, y + 185, 24, C.cream, { w: 700 });
      });
    },
  };
}

/* =================================================== FORMATUL OSPE (7 minute) */
export function ospe() {
  const X0 = 80, PX = 120, Y = 230;
  const SEG = [[0, 1, '#6d6178', 'citești'], [1, 1.5, '#a88a5a', 'ciornă'], [1.5, 4.5, '#C27A10', 'vorbești: scriptul'], [4.5, 7, '#4a3d58', 'completezi']];
  const ST = [['Identificarea', 'modelul +\nsubstanțele'], ['Descrierea', 'rezultat → receptor\n→ proteina G'], ['Aplicarea', 'antagonistul\n+ clinica'], ['Comparația', 'alt receptor\n+ DD']];
  const k = [0, 0, 0, 0];
  return {
    home: HOME, anchors: ST.map((_, i) => [140 + i * 240, 585]),
    phase: (i) => ['0:00–0:30', '0:30–1:45', '1:45–2:15', '2:15–2:45'][i] || '',
    draw(g, t, b) {
      bg(g);
      txt(g, 'stația: 7 minute', 500, 90, 30, C.cream);
      SEG.forEach(([a, c, col, l]) => { const p = new Path2D(); p.roundRect(X0 + a * PX + 2, Y - 34, (c - a) * PX - 4, 68, 12); g.save(); g.fillStyle = col; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(p); g.restore(); txt(g, l, X0 + (a + c) / 2 * PX, Y, c - a < 1 ? 16 : 20, '#fff', { maxW: (c - a) * PX - 10 }); });
      for (let m = 0; m <= 7; m++) { txt(g, `${m}`, X0 + m * PX, Y + 62, 20, C.dim, { w: 700 }); }
      txt(g, 'minute', X0 + 7 * PX + 30, Y + 92, 16, C.dim, { w: 600 });
      // „mai e 1 minut”
      g.save(); g.strokeStyle = C.key; g.lineWidth = 4; g.setLineDash([8, 6]); g.beginPath(); g.moveTo(X0 + 6 * PX, Y - 60); g.lineTo(X0 + 6 * PX, Y + 40); g.stroke(); g.restore();
      txt(g, '„mai e 1 minut” → concluzia', X0 + 6 * PX - 60, Y - 82, 19, C.key);
      const hand = REDUCED ? 3 : (t * 0.6) % 7; dot(g, X0 + hand * PX, Y - 44, 9, '#fff');
      ST.forEach(([h, s], i) => {
        const x = 140 + i * 240; const act = b.i === i; k[i] = lerp(k[i], act ? 1 : 0, 0.1);
        const hh = 250 + 30 * k[i]; const p = new Path2D(); p.roundRect(x - 105, 880 - hh, 210, hh, 18);
        g.save(); g.fillStyle = ['#7d5a1a', '#9c6c14', '#C27A10', '#d9952e'][i]; if (act) { g.shadowColor = C.hi; g.shadowBlur = 24; } g.fill(p); g.shadowBlur = 0; g.strokeStyle = act ? C.hi : OUT; g.lineWidth = act ? 6 : 5; g.stroke(p); g.restore();
        txt(g, String(i + 1), x, 880 - hh + 50, 44, '#fff');
        txt(g, h, x, 880 - hh + 110, 22, '#fff', { maxW: 200 });
        txt(g, s, x, 880 - hh + 175, 18, '#fff3e0', { w: 600, maxW: 200 });
      });
      txt(g, 'se punctează doar ce spui cu voce tare', 500, 920, 18, C.dim, { w: 700 });
    },
  };
}

/* =================================================== LANȚURILE DE NEURONI */
export function chains() {
  const LY = [150, 375, 600, 815];
  const L = [
    { col: C.para, pre: [[210, LY[0]], [680, LY[0]]], gang: [700, LY[0]], post: [[720, LY[0]], [820, LY[0]]], org: [880, LY[0]], m1: 'ACh', m2: 'ACh', r1: 'N1', r2: 'M', orgLab: 'cord · M2\nmușchi neted · M3', t1: 'preganglionar lung', t2: '' },
    { col: C.sym, pre: [[210, LY[1]], [320, LY[1]]], gang: [340, LY[1]], post: [[360, LY[1]], [820, LY[1]]], org: [880, LY[1]], m1: 'ACh', m2: 'NA', r1: 'N1', r2: 'α / β', orgLab: 'organ', t1: '', t2: 'postganglionar lung' },
    { col: C.sym, pre: [[210, LY[2]], [640, LY[2]]], gang: null, post: null, org: [700, LY[2]], m1: 'ACh', r1: 'N1', adrenal: true, t1: 'preganglionar', t2: '' },
    { col: C.nerve, pre: [[210, LY[3]], [800, LY[3]]], gang: null, post: null, org: [870, LY[3]], m1: 'ACh', r1: 'N2', motor: true, t1: 'nervul motor: un singur neuron', t2: '' },
  ];
  const ORIG = ['trunchi cerebral\n+ măduva sacrată', 'măduva\ntoraco-lombară', 'măduva\ntoraco-lombară', 'coarnele\nanterioare'];
  const burst = (g, x, y, col, p, n = 7) => { if (p <= 0 || p >= 1) return; for (let j = 0; j < n; j++) { const a = j / n * Math.PI * 2; const r = 8 + 34 * p; dot(g, x + Math.cos(a) * r, y + Math.sin(a) * r * 0.7, 6, col, { alpha: 1 - p * 0.6, ow: 2 }); } };
  return {
    home: HOME, anchors: [[450, LY[0] + 42], [600, LY[1] + 42], [700, LY[2] - 70], [900, LY[3] - 60]],
    phase: (i) => ['parasimpatic', 'simpatic', 'medulosuprarenala', 'somatic (nu e vegetativ)'][i] || '',
    draw(g, t, b) {
      bg(g);
      // SNC
      const sp = new Path2D(); sp.roundRect(24, 50, 186, 860, 40); g.save(); g.fillStyle = 'rgba(255,224,138,.15)'; g.fill(sp); g.strokeStyle = 'rgba(255,224,138,.5)'; g.lineWidth = 4; g.stroke(sp); g.restore();
      txt(g, 'SNC', 117, 85, 24, C.nerve);
      const act = b.i >= 0 ? b.i : Math.floor((REDUCED ? 0 : t) / 3.2) % 4;
      const u = b.i >= 0 ? clamp(b.bt / (b.bd * 0.75)) : loopT(t, 3.2);
      L.forEach((l, i) => {
        const on = i === act; const a = on ? 1 : 0.42; const y = LY[i];
        txt(g, ORIG[i], 117, y, 18, C.cream, { alpha: a, w: 700 });
        g.save(); g.globalAlpha = a;
        tube(g, l.pre, 12, l.col, { raw: true });
        if (l.t1) txt(g, l.t1, (l.pre[0][0] + l.pre[1][0]) / 2 + 20, y - 34, 17, l.col, { w: 700 });
        if (l.gang) { ell(g, l.gang[0], l.gang[1], 26, 26, l.col, { ow: 5 }); tube(g, l.post, 10, l.col, { raw: true, dash: i === 0 ? null : null }); }
        if (l.t2) txt(g, l.t2, (l.post[0][0] + l.post[1][0]) / 2, y - 34, 17, l.col, { w: 700 });
        // ținta
        if (l.adrenal) { icon(g, 'adrenal', 700, y, 0.9); tube(g, [[760, y + 20], [980, y + 20]], 18, C.blood, { raw: true }); txt(g, 'adrenalină (+ NA)\nîn sânge', 870, y - 40, 16, C.cream, { w: 700 }); txt(g, '→ toate organele', 870, y + 62, 16, C.cream, { w: 700 }); }
        else if (l.motor) { icon(g, 'muscle', 900, y + 14, 1.05); txt(g, 'mușchi striat', 900, y + 62, 16, C.cream, { w: 700 }); }
        else { ell(g, l.org[0] + 34, y, 80, 50, i === 0 ? '#ef9aa2' : '#f0b58a', { ow: 5 }); txt(g, l.orgLab, l.org[0] + 34, y, l.orgLab.length > 8 ? 15 : 19, OUT, { stroke: false, w: 800, maxW: 150 }); }
        // receptorii (cipuri)
        if (l.gang) pill(g, l.gang[0], y + 46, 56, 30, C.nch, l.r1, { size: 16, ow: 3 });
        if (l.adrenal) pill(g, 650, y + 50, 56, 30, C.nch, 'N1', { size: 16, ow: 3 });
        if (l.motor) pill(g, 820, y + 46, 56, 30, C.nch, 'N2', { size: 16, ow: 3 });
        if (l.r2) pill(g, l.org[0] - 50, y + 50, 70, 30, l.m2 === 'NA' ? C.sym : C.para, l.r2, { size: 16, ow: 3 });
        g.restore();
        if (!on) return;
        // impulsul + eliberarea mediatorilor
        const two = !!l.gang; const e1 = two ? 0.42 : 0.7;
        const p1 = clamp(u / e1); const [x1, y1] = [lerp(l.pre[0][0], l.pre[1][0], p1), y];
        if (u < e1) { dot(g, x1, y1, 13, '#fff', { ow: 3 }); g.save(); g.shadowColor = '#fff'; g.shadowBlur = 20; dot(g, x1, y1, 8, C.hi, { ow: 0 }); g.restore(); }
        const at1 = l.gang ? l.gang : l.adrenal ? [650, y] : [810, y];
        burst(g, at1[0], at1[1], C.ach, clamp((u - e1) / 0.14));
        if (u > e1 && u < e1 + 0.2) txt(g, 'ACh', at1[0], at1[1] - 50, 18, C.ach);
        if (two) {
          const p2 = clamp((u - 0.58) / 0.27); if (u > 0.58 && u < 0.85) dot(g, lerp(l.post[0][0], l.post[1][0], p2), y, 11, '#fff', { ow: 3 });
          burst(g, l.post[1][0] + 8, y, l.m2 === 'NA' ? C.na : C.ach, clamp((u - 0.85) / 0.14));
          if (u > 0.85) txt(g, l.m2, l.post[1][0] - 6, y - 46, 18, l.m2 === 'NA' ? C.na : C.ach);
        }
        if (l.adrenal && u > 0.78) for (let j = 0; j < 6; j++) { const v = ((j / 6) + t * 0.3) % 1; dot(g, 770 + v * 200, y + 20, 7, C.adr, { ow: 2 }); }
        if (l.motor && u > 0.82) txt(g, 'contracție', 900, y - 46, 18, C.hi);
      });
      txt(g, 'ACh', 300, 912, 18, C.ach); txt(g, '= acetilcolina', 380, 912, 16, C.cream, { w: 600 }); txt(g, 'NA', 560, 912, 18, C.na); txt(g, '= noradrenalina', 645, 912, 16, C.cream, { w: 600 });
    },
  };
}

/* =================================================== PROTEINELE G */
export function gprots() {
  const X = [140, 385, 630, 870]; const MY = 215;
  const COLS = [
    { rc: C.gq, gc: C.gq, rec: 'M1, M3, α1', g: 'Gq', steps: ['fosfolipaza C', 'PIP2 → IP3 + DAG', 'Ca²⁺ ↑ (+ PKC)'], eff: 'CONTRACȚIE', effSub: 'mușchi neted · secreție', ico: 'smooth' },
    { rc: C.gi, gc: C.gi, rec: 'M2, α2', g: 'Gi', steps: ['adenilat-ciclaza', 'AMPc ↓', 'cord: frecvență ↓', 'presinaptic: NA ↓'], eff: 'FRÂNĂ', ico: 'heart', off: true },
    { rc: C.gs, gc: C.gs, rec: 'β1, β2, β3', g: 'Gs', steps: ['adenilat-ciclaza', 'AMPc ↑ → PKA', 'cord: forță ↑ (β1)', 'mușchi neted: Ca²⁺ ↓ (β2)'], eff: 'β1 stimulare\nβ2 relaxare', ico: 'heart' },
    { rc: C.nch, rec: 'N1, N2', chan: true, steps: ['canal de Na⁺', 'fără proteină G', 'depolarizare\nîn milisecunde'], eff: 'rapid', ico: null },
  ];
  return {
    home: HOME, anchors: X.map((x, i) => (i === 3 ? [x + 70, MY - 30] : [x - 70, MY + 70])),
    phase: (i) => ['Gq: contracție, secreție', 'Gi: frână', 'Gs: AMPc ↑', 'N: canal ionic'][i] || '',
    draw(g, t, b) {
      bg(g);
      txt(g, 'în afara celulei', 508, 150, 16, C.dim, { w: 700 }); txt(g, 'citoplasma', 880, MY + 75, 16, C.dim, { w: 700 });
      membrane(g, 0, 1000, MY, { h: 52 });
      const act = b.i >= 0 ? b.i : Math.floor((REDUCED ? 0 : t) / 3.5) % 4;
      const u = b.i >= 0 ? clamp(b.bt / (b.bd * 0.8)) : loopT(t, 3.5);
      COLS.forEach((c, i) => {
        const x = X[i]; const on = i === act; const a = on ? 1 : 0.5;
        g.save(); g.globalAlpha = a;
        txt(g, c.rec, x, 108, 22, c.rc);
        g.restore();
        const lig = on ? clamp(u / 0.18) : 1;
        if (c.chan) {
          const open = on ? (u > 0.18 ? 1 : 0) : 0.4; g.save(); g.globalAlpha = a; channel(g, x, MY, open, C.nch, { s: 0.9 }); g.restore();
          ligand(g, x - 44, lerp(135, MY - 50, ease(lig)), C.ach, 'ACh', 17, { alpha: a });
          if (on && u > 0.18) for (let j = 0; j < 6; j++) { const v = ((j / 6) + t * 0.7) % 1; txt(g, 'Na⁺', x + Math.sin(j) * 6, MY - 70 + v * 170, 16, C.nch, { alpha: Math.sin(v * Math.PI) }); }
        } else {
          receptor(g, x, MY, c.rc, '', { s: 0.8, alpha: a, glow: on && u > 0.18 ? 0.8 : 0, gc: c.rc });
          ligand(g, x, lerp(135, MY - 60, ease(lig)), i === 0 ? C.ach : C.na, '', 14, { alpha: a });
          gprot(g, x - 6, MY + 70, c.gc, c.g, { s: 0.85, alpha: a, glow: on && u > 0.25 ? 1 : 0 });
        }
        c.steps.forEach((s, j) => {
          const y = 375 + j * 86; const lit = on ? clamp((u - 0.3 - j * 0.13) / 0.08) : 1;
          const pa = on ? 0.35 + 0.65 * lit : 0.5;
          if (j > 0 || !c.chan) arr(g, x, y - (j ? 62 : 70), x, y - 34, '#fff3e6', 4, pa);
          pill(g, x, y, 218, s.includes('\n') ? 66 : 52, c.chan ? '#f3e1a0' : '#fff3e0', s, { size: 17, alpha: pa, glow: on && lit > 0.2 && lit < 1 ? 1 : 0, gc: c.rc });
          if (c.off && j === 0) { txt(g, 'inhibată', x + 70, y - 38, 16, C.key, { alpha: pa }); cross(g, x + 98, y, 12, C.key, pa); }
        });
        const ey = 375 + c.steps.length * 86 + 10; const le = on ? clamp((u - 0.75) / 0.15) : 1; const ea = on ? 0.35 + 0.65 * le : 0.5;
        txt(g, c.eff, x, ey, c.eff.includes('\n') ? 20 : 24, c.rc, { alpha: ea });
        if (c.effSub) txt(g, c.effSub, x, ey + 34, 16, C.cream, { alpha: ea, w: 700 });
        if (c.ico === 'smooth') { const kk = on ? 0.5 + 0.5 * Math.sin(t * 4) * le : 0.3; myofil(g, x, ey + 125, 170, Math.max(0, kk)); }
        if (c.ico === 'heart') { const rate = i === 1 ? 1.4 : 4.2; const beat = Math.max(0, Math.sin(t * rate)) ** 6; g.save(); g.globalAlpha = ea; heart(g, x, ey + 92, 0.55, on ? beat : 0); g.restore(); txt(g, i === 1 ? 'mai rar' : 'mai tare', x, ey + 150, 16, C.cream, { alpha: ea, w: 700 }); }
      });
    },
  };
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

/* =================================================== PLACA MOTORIE (N2) */
export function n2() {
  const AX = 650, BY = 380, CL = 520;
  const CH = [470, 560, 650, 740, 830];
  const ves = [[-80, -20], [-30, 10], [30, -10], [80, 15], [0, -50], [-50, 40], [55, 45]];
  return {
    home: HOME, anchors: [[AX + 44, 120], [AX - 120, BY - 10], [CH[1], CL + 64], [880, 760]],
    phase: (i) => ['impulsul', 'ACh în fantă', 'Na⁺ intră', 'contracție · ACh degradată'][i] || '',
    draw(g, t, b) {
      bg(g);
      // faza globală 0..4 (intro = buclă)
      const ph = b.i >= 0 ? b.i + clamp(b.bt / (b.bd * 0.8)) : loopT(t, 10) * 4;
      // fibra musculară striată
      const kc = clamp(ph - 3) * (ph < 4 ? 1 : 1); const sq = 1 - 0.12 * Math.sin(Math.PI * clamp(ph - 3));
      const mf = new Path2D(); mf.roundRect(390, CL + 20, 600, 250, 30); g.save(); g.fillStyle = '#d9535f'; g.fill(mf); g.restore();
      g.save(); g.clip(mf); g.strokeStyle = 'rgba(255,220,225,.75)'; g.lineWidth = 6; for (let x = 400; x < 1000; x += 30 * sq) { g.beginPath(); g.moveTo(x + (x - 690) * (sq - 1), CL + 20); g.lineTo(x + (x - 690) * (sq - 1), CL + 270); g.stroke(); } g.restore();
      g.save(); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(mf); g.restore();
      // depolarizarea se întinde pe membrană
      const dep = clamp((ph - 2.3) / 0.7) * (ph < 3.6 ? 1 : 1 - clamp((ph - 3.6) / 0.4));
      if (dep > 0) { g.save(); g.strokeStyle = C.nch; g.shadowColor = C.nch; g.shadowBlur = 16; g.lineWidth = 7; g.beginPath(); g.moveTo(AX - 260 * dep, CL + 22); g.lineTo(AX + 300 * dep, CL + 22); g.stroke(); g.restore(); }
      // axonul cu mielină
      tube(g, [[AX, -20], [AX, BY - 60]], 40, C.nerve, { raw: true });
      for (let k = 0; k < 3; k++) { const p = new Path2D(); p.roundRect(AX - 34, 0 + k * 90, 68, 70, 20); g.save(); g.fillStyle = '#7fc7e8'; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(p); g.restore(); }
      txt(g, 'axon motor (mielinizat)', AX - 170, 170, 18, C.cream, { w: 700 });
      // terminația
      ell(g, AX, BY, 200, 110, C.nerve, { ow: 6, shade: C.nerveS });
      txt(g, 'terminația', AX + 245, BY - 70, 18, C.cream, { w: 700 });
      // impulsul (faza 0)
      if (ph < 1) { const y = lerp(-10, BY - 40, clamp(ph / 0.9)); g.save(); g.shadowColor = '#fff'; g.shadowBlur = 30; dot(g, AX, y, 18, '#fffbe0', { ow: 3 }); g.restore(); }
      // veziculele: se mută spre membrana de jos și fuzionează (faza 1)
      const fz = clamp((ph - 1) / 0.6);
      ves.forEach(([dx, dy], k) => { const tx = AX + dx * 0.9, ty = BY + 92; const x = lerp(AX + dx, tx, k < 4 ? fz : 0), y = lerp(BY + dy, ty, k < 4 ? fz : 0); if (k < 4 && ph > 1.6) return; ell(g, x, y, 22, 22, '#fff8e0', { ow: 3 }); for (let j = 0; j < 4; j++) dot(g, x - 8 + (j % 2) * 14, y - 6 + Math.floor(j / 2) * 12, 4, C.ach, { ow: 1.5 }); });
      // fanta + receptorii N2
      txt(g, 'fanta sinaptică', 300, CL - 10, 17, C.cream, { w: 700 });
      const opn = clamp((ph - 2) / 0.4) * (ph < 3.5 ? 1 : 1 - clamp((ph - 3.5) / 0.5));
      CH.forEach((x) => channel(g, x, CL + 20, opn, C.nch, { s: 0.5 }));
      txt(g, 'N2', CH[0] - 50, CL + 22, 20, C.nch);
      // ACh în fantă (faza 1.5 → 3), legată de N2, apoi tăiată de acetilcolinesterază
      if (ph > 1.4 && ph < 4) {
        CH.forEach((x, k) => {
          for (let j = 0; j < 2; j++) {
            const sx = AX + (k - 2) * 30 + j * 12, sy = BY + 110; const p = clamp((ph - 1.4 - j * 0.1) / 0.6);
            let x2 = lerp(sx, x + (j ? 12 : -12), p), y2 = lerp(sy, CL - 8, p);
            if (ph > 3) { const c = clamp((ph - 3) / 0.6); if (c >= 1) continue; x2 += (j ? 1 : -1) * 30 * c; dot(g, x2, y2 - 10 * c, 6 * (1 - c * 0.5), C.ach, { ow: 2, alpha: 1 - c }); if (j) dot(g, x2 + 10, y2, 4, '#d6f7f0', { ow: 1.5, alpha: 1 - c }); }
            else dot(g, x2, y2, 7, C.ach, { ow: 2 });
          }
        });
      }
      // Na⁺ intră în fibră (faza 2 → 3.5)
      if (opn > 0.3) CH.forEach((x, k) => { for (let j = 0; j < 2; j++) { const v = ((j / 2) + k * 0.13 + t * 0.8) % 1; txt(g, 'Na⁺', x, CL - 30 + v * 150, 15, '#fff6c8', { alpha: Math.sin(v * Math.PI) * opn }); } });
      // acetilcolinesteraza
      if (ph > 2.9) { const a = clamp((ph - 2.9) / 0.3); ell(g, 905, CL - 12, 34, 22, C.atr, { ow: 4, alpha: a }); txt(g, 'acetilcolinesteraza', 860, CL - 58, 17, C.atr, { alpha: a }); }
      txt(g, 'fibra musculară striată', 690, CL + 300, 18, C.cream, { w: 700 });
      if (ph > 3) txt(g, 'contracție', 690, CL + 150, 26, '#fff', { alpha: Math.sin(Math.PI * clamp(ph - 3)) });
    },
  };
}

/* =================================================== M2 ÎN CORD: FRÂNA VAGALĂ */
export function m2() {
  const HX = 610, HY = 520, BX = 820, BYb = 190, BR = 150;
  const ecg = (x, rr, pr) => { // x în secunde de la ultima bătaie
    const ph = x % rr; let y = 0;
    y += 0.12 * Math.exp(-((ph - 0.08) ** 2) / 0.0012); // P
    const q = 0.08 + pr; y += -0.12 * Math.exp(-((ph - q + 0.03) ** 2) / 0.00008) + 1 * Math.exp(-((ph - q) ** 2) / 0.00012) - 0.25 * Math.exp(-((ph - q - 0.03) ** 2) / 0.0001);
    y += 0.22 * Math.exp(-((ph - q - 0.25) ** 2) / 0.003); // T
    return y;
  };
  return {
    home: HOME, anchors: [[400, 150], [HX - 10, 330], [BX + 40, BYb - 40], [430, 795]],
    phase: (i) => ['ACh din vag', 'ACh → M2', 'Gi → AMPc ↓', 'frecvență ↓ · conducere AV ↓'][i] || '',
    draw(g, t, b) {
      bg(g);
      const s3 = b.i === 3 ? clamp(b.bt / (b.bd * 0.5)) : b.i > 3 ? 1 : 0;
      const rr = lerp(0.85, 1.5, s3), pr = lerp(0.12, 0.22, s3);
      const beat = Math.max(0, Math.sin((t % rr) / rr * Math.PI * 2)) ** 8;
      heart(g, HX, HY, 2.4, beat);
      // nodul sinoatrial (sus, atriul drept = stânga privitorului) și atrioventricular
      ell(g, HX - 120, HY - 150, 20, 14, '#ffe08a', { ow: 4 }); txt(g, 'nodul sinusal', HX - 120, HY - 112, 17, '#fff');
      ell(g, HX - 10, HY - 20, 18, 13, '#ffe08a', { ow: 4 }); txt(g, 'nodul AV', HX - 10, HY + 18, 17, '#fff');
      // nervul vag
      const vag = [[300, -20], [380, 140], [HX - 150, HY - 210], [HX - 120, HY - 162]];
      tube(g, vag, 18, C.nerve);
      tube(g, [[HX - 150, HY - 210], [HX - 60, HY - 120], [HX - 14, HY - 34]], 12, C.nerve);
      txt(g, 'nervul vag (X)', 250, 210, 20, C.nerve);
      const p0 = st(b, 0); const P = curve(vag);
      if (b.i === 0 || b.i < 0) for (let j = 0; j < 3; j++) { const v = ((j / 3) + t * 0.45) % 1; const [x, y] = at(P, v); g.save(); g.shadowColor = '#fff'; g.shadowBlur = 18; dot(g, x, y, 10, '#fffbe0', { ow: 3 }); g.restore(); }
      if (b.i >= 0 && p0 > 0) for (let j = 0; j < 8; j++) { const a = j / 8 * Math.PI * 2; const r = 16 + 26 * ((t * 0.8 + j * 0.1) % 1); dot(g, HX - 120 + Math.cos(a) * r, HY - 150 + Math.sin(a) * r * 0.7, 5, C.ach, { ow: 2, alpha: p0 }); dot(g, HX - 10 + Math.cos(a) * r, HY - 20 + Math.sin(a) * r * 0.7, 5, C.ach, { ow: 2, alpha: p0 }); }
      // bula mărită: celula nodală cu M2 → Gi → adenilat-ciclaza
      lead(g, HX - 110, HY - 160, BX - BR + 10, BYb + 40, 1);
      g.save(); g.beginPath(); g.arc(BX, BYb, BR, 0, 7); g.fillStyle = '#2a1d10'; g.fill(); g.clip();
      membrane(g, BX - BR, BX + BR, BYb - 10, { h: 40 });
      const p1 = st(b, 1), p2 = st(b, 2);
      receptor(g, BX - 70, BYb - 10, C.gi, '', { s: 0.6, glow: p1 > 0.6 ? 0.8 : 0, gc: C.gi });
      ligand(g, BX - 70, lerp(BYb - 120, BYb - 52, p1), C.ach, 'ACh', 15, { alpha: b.i >= 1 || b.i < 0 ? 1 : 0.3 });
      gprot(g, lerp(BX - 70, BX - 10, p2), BYb + 50, C.gi, 'Gi', { s: 0.6, glow: p2 > 0.3 && p2 < 1 ? 1 : 0, alphaOnly: true });
      enzyme(g, BX + 75, BYb - 10, '#e6e2f2', 'AC', { s: 0.6, off: p2 });
      for (let j = 0; j < 5; j++) dot(g, BX + 20 + j * 18, BYb + 70 + (j % 2) * 14, 7, C.camp, { ow: 2, alpha: 1 - 0.85 * p2 });
      txt(g, 'AMPc ↓', BX + 60, BYb + 108, 18, C.camp, { alpha: p2 });
      if (b.i === 1) { const a = clamp((b.bt - 1.5) / 1); ligand(g, BX - 110, BYb - 75, C.atr, 'A', 15, { alpha: a, shape: 'block' }); }
      g.restore();
      g.save(); g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.arc(BX, BYb, BR, 0, 7); g.stroke(); g.restore();
      txt(g, 'M2', BX - 110, BYb + 40, 20, C.gi);
      if (b.i === 1) txt(g, 'atropina se leagă aici', BX, BYb + BR + 24, 17, C.atr, { alpha: clamp((b.bt - 1.5) / 1) });
      // ECG
      const ex = 400, ew = 580, ey = 850; const p = new Path2D(); p.roundRect(ex, ey - 70, ew, 140, 14); g.save(); g.fillStyle = '#0e1a10'; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(p); g.clip(p);
      const sweep = REDUCED ? 1 : (t % 4) / 4;
      g.strokeStyle = '#7dff9a'; g.lineWidth = 3; g.beginPath();
      for (let k = 0; k <= 400; k++) { const xx = k / 400; const sec = xx * 4; const y = ey + 30 - ecg(sec + 10, rr, pr) * 80; const X = ex + xx * ew; if (k === 0) g.moveTo(X, y); else g.lineTo(X, y); }
      g.stroke(); g.fillStyle = '#0e1a10'; g.fillRect(ex + sweep * ew, ey - 70, 18, 140); g.restore();
      txt(g, s3 > 0.5 ? 'bradicardie: RR lung, PR lung' : 'ritm sinusal', ex + ew / 2, ey - 92, 18, '#7dff9a');
    },
  };
}

/* =================================================== OCHIUL: CIRCULAR (M3) vs RADIAL (α1) */
export function eye() {
  const X = 620, Y = 360, R = 230; let pr = 70;
  return {
    home: HOME, anchors: [() => [X - (pr + 14) * 0.7, Y - (pr + 14) * 0.7], () => [X + (pr + R) / 2 * 0.72, Y - (pr + R) / 2 * 0.72], () => [X, Y + pr + 44], [X - 300, Y - 180]],
    phase: (i) => ['mioză (M3)', 'midriază activă (α1)', 'reflexul fotomotor', 'atropina: midriază pasivă'][i] || '',
    draw(g, t, b) {
      bg(g);
      const u = b.i >= 0 ? clamp(b.bt / (b.bd * 0.6)) : 0;
      let target = 70, circ = 0, rad = 0;
      if (b.i === 0) { target = lerp(70, 34, ease(u)); circ = 1; }
      if (b.i === 1) { target = lerp(70, 140, ease(u)); rad = 1; }
      if (b.i === 2) { const fl = clamp((b.bt - 1) / 0.6); const back = clamp((b.bt - 3.2) / 1.5); target = 70 - 26 * ease(fl) * (1 - ease(back)); circ = fl * (1 - back); }
      if (b.i === 3) { target = lerp(70, 140, ease(u)); }
      if (b.i < 0) { const c = loopT(t, 8) * 4; const k = Math.floor(c), f = clamp((c - k) * 1.6); target = k === 0 ? lerp(70, 34, ease(f)) : k === 1 ? lerp(34, 70, ease(f)) : k === 2 ? lerp(70, 140, ease(f)) : lerp(140, 70, ease(f)); circ = k === 0 ? 1 : 0; rad = k === 2 ? 1 : 0; }
      pr = target;
      iris(g, X, Y, R, pr, { circ, rad, col: '#8a5a3a' });
      // săgeți
      if (circ > 0.3) for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI * 2 + t * 0.5; const r = pr + 22; g.save(); g.strokeStyle = C.para; g.lineWidth = 6; g.beginPath(); g.arc(X, Y, r, a, a + 0.9); g.stroke(); g.restore(); const ax = X + Math.cos(a + 0.9) * r, ay = Y + Math.sin(a + 0.9) * r; dot(g, ax, ay, 7, C.para, { ow: 2 }); }
      if (rad > 0.3) for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI * 2 + Math.PI / 4; arr(g, X + Math.cos(a) * (pr + 30), Y + Math.sin(a) * (pr + 30), X + Math.cos(a) * (pr + 85), Y + Math.sin(a) * (pr + 85), C.sym, 6); }
      if (b.i === 3) { const a = clamp(b.bt / 1.2); txt(g, 'M3 blocat', X - 210, Y - 250, 22, C.atr, { alpha: a }); cross(g, X - 210, Y - 210, 18, C.atr, a); ligand(g, X - 300, Y - 220, C.atr, 'A', 20, { alpha: a, shape: 'block' }); }
      // lumina
      if (b.i === 2 || b.i === 0) { const fl = b.i === 0 ? 1 : clamp((b.bt - 1) / 0.6) * (1 - clamp((b.bt - 3.2) / 1.5)); g.save(); g.globalAlpha = fl; g.fillStyle = '#fff6b0'; g.shadowColor = '#fff6b0'; g.shadowBlur = 40; g.beginPath(); g.arc(X + 300, Y - 270, 34, 0, 7); g.fill(); g.restore(); for (let k = 0; k < 3; k++) arr(g, X + 260 - k * 10, Y - 240 + k * 22, X + 170 - k * 10, Y - 150 + k * 22, '#fff6b0', 4, fl * 0.9); txt(g, 'lumină', X + 300, Y - 210, 18, '#fff6b0', { alpha: fl }); }
      // legenda
      const ly = 700;
      pill(g, 690, ly, 540, 64, 'rgba(95,207,122,.9)', b.i === 3 ? 'circular · M3 blocat de atropină → relaxat' : 'circular · M3 (Gq) · parasimpatic → mioză', { size: 19, glow: b.i === 0 || b.i === 2 ? 0.8 : 0, alpha: b.i === 1 ? 0.45 : 1 });
      pill(g, 690, ly + 90, 540, 64, 'rgba(255,154,74,.95)', 'radial · α1 (Gq) · simpatic → midriază activă', { size: 19, glow: b.i === 1 ? 0.8 : 0, alpha: b.i === 0 || b.i === 2 || b.i === 3 ? 0.45 : 1 });
      txt(g, `pupila: ${pr < 50 ? 'mioză' : pr > 110 ? 'midriază' : 'normală'}`, X, Y + R + 50, 22, C.cream);
    },
  };
}

/* =================================================== AGONIST vs ANTAGONIST */
export function agon() {
  const RX = 500, MY = 520;
  return {
    home: HOME, anchors: [[250, 150], [750, 150], [RX + 90, MY - 150]],
    phase: (i) => ['agonistul', 'antagonistul', 'deplasarea'][i] || '',
    draw(g, t, b) {
      bg(g);
      txt(g, 'în afara celulei', 120, MY - 70, 17, C.dim, { w: 700 }); txt(g, 'citoplasma', 120, MY + 70, 17, C.dim, { w: 700 });
      membrane(g, 0, 1000, MY, { h: 56 });
      const k = b.i >= 0 ? b.i : Math.floor(loopT(t, 15) * 3); const u = b.i >= 0 ? clamp(b.bt / (b.bd * 0.75)) : (loopT(t, 15) * 3) % 1;
      const pocket = [RX, MY - 110];
      let active = 0, pupil = 14;
      if (k === 0) {
        const p = ease(clamp(u / 0.45)); ligand(g, lerp(250, pocket[0], p), lerp(210, pocket[1], p), C.pilo, 'P', 30);
        active = clamp((u - 0.45) / 0.15); pupil = lerp(14, 6, active);
        txt(g, 'afinitate + activitate intrinsecă', 500, 110, 24, C.pilo, { alpha: active });
      } else if (k === 1) {
        const p = ease(clamp(u / 0.4)); ligand(g, lerp(750, pocket[0], p), lerp(210, pocket[1], p), C.atr, 'A', 30, { shape: 'block' });
        const q = clamp((u - 0.45) / 0.4); const bx = q < 0.5 ? lerp(250, pocket[0] - 70, q * 2) : lerp(pocket[0] - 70, 200, (q - 0.5) * 2); const by = q < 0.5 ? lerp(210, pocket[1] - 50, q * 2) : lerp(pocket[1] - 50, 160, (q - 0.5) * 2);
        if (u > 0.45) ligand(g, bx, by, C.pilo, 'P', 26, { alpha: 0.9 });
        pupil = lerp(14, 22, clamp(u / 0.5));
        txt(g, 'afinitate, fără activitate intrinsecă', 500, 110, 24, C.atr, { alpha: clamp(u / 0.4) });
        if (u > 0.6) cross(g, pocket[0] - 70, pocket[1] - 50, 16, C.key, 1);
      } else {
        const out = ease(clamp((u - 0.35) / 0.35));
        ligand(g, lerp(pocket[0], 820, out), lerp(pocket[1], 160, out), C.pilo, 'P', 30);
        for (let j = 0; j < 4; j++) { const sx = 640 + j * 80, sy = 200 + (j % 2) * 60; const p = ease(clamp(u / 0.35)); const tx = j === 0 ? pocket[0] : 560 + j * 70, ty = j === 0 ? pocket[1] : MY - 170 - (j % 2) * 40; const q = j === 0 ? ease(clamp((u - 0.3) / 0.4)) : p; ligand(g, lerp(sx, tx, q), lerp(sy, ty, q), C.atr, 'A', 26, { shape: 'block' }); }
        active = 1 - out; pupil = lerp(6, 22, out);
        txt(g, 'atropina în exces ia locul pilocarpinei', 500, 110, 24, C.atr, { alpha: clamp(u / 0.3) });
      }
      receptor(g, RX, MY, '#7ad3a0', 'receptor M', { s: 1.5, glow: active, gc: C.pilo, ly: 100, size: 20 });
      // semnalul (efectul)
      if (active > 0.05) for (let j = 0; j < 7; j++) { const a = Math.PI * (0.15 + j * 0.12); const r = 90 + ((t * 120 + j * 30) % 120); dot(g, RX + Math.cos(a) * r, MY + 40 + Math.sin(a) * r * 0.6, 7, C.hi, { ow: 2, alpha: active * (1 - (r - 90) / 120) }); }
      // efectul pe pupilă
      panel(g, 690, 640, 280, 250, {});
      icon(g, 'eye', 830, 740, 1.9, { pupil });
      txt(g, pupil < 10 ? 'mioză' : pupil > 18 ? 'midriază' : 'normală', 830, 850, 22, pupil < 10 ? C.pilo : pupil > 18 ? C.atr : C.cream);
      txt(g, 'efectul', 830, 665, 17, C.dim, { w: 700 });
      txt(g, '→ contracție, secreție, mioză', 330, 820, 20, C.hi, { alpha: active });
      txt(g, 'P = pilocarpina · A = atropina', 330, 900, 17, C.dim, { w: 700 });
    },
  };
}
