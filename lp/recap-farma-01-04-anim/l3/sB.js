// Scenele pentru Partea C (proteinele G) și cascadele cazurilor 2, 3, 4 + decodorul.
import { W, H, HOME, cam, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, loopT, txt, pill, dot, ell, arr, cross, check,
  ligand, membrane, receptor, gprot, enzyme, channel, myofil, heart, icon, blob, paint, bb, tri, lock, key, bronchus, mastocyte, galpha, gbg } from './fk.js';

/* =================================================== RECEPTORUL ÎN SERPENTINĂ (static) */
export function gpcr() {
  const MT = 330, MB = 450; const HX = [330, 385, 440, 495, 550, 605, 660];
  return {
    home: HOME, anchors: [[440, 190], [HX[0] - 50, 300], [300, 560], [880, 700]],
    draw(g, t, b) {
      bg(g);
      txt(g, 'exterior', 120, 200, 22, C.dim, { w: 700 }); txt(g, 'citoplasma', 120, 560, 22, C.dim, { w: 700 });
      g.save(); g.fillStyle = '#f7e7c4'; g.fillRect(0, MT, 1000, MB - MT); g.restore();
      for (const yy of [MT + 8, MB - 8]) for (let x = 8; x < 1000; x += 16) dot(g, x, yy, 7, C.mem, { ow: 2 });
      txt(g, 'membrana', 900, (MT + MB) / 2, 20, '#8a6a30', { stroke: false });
      // lanțul: N-terminal sus-stânga, 7 helixuri, C-terminal jos-dreapta
      const col = '#7ad3a0';
      g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
      const path = new Path2D(); path.moveTo(230, 190); path.quadraticCurveTo(280, 220, HX[0], MT - 30);
      HX.forEach((x, k) => {
        const down = k % 2 === 0; path.lineTo(x, down ? MB + 30 : MT - 30);
        if (k < 6) { const nx = HX[k + 1]; const yy = down ? MB + 30 : MT - 30; path.quadraticCurveTo((x + nx) / 2, down ? yy + 50 : yy - 50, nx, yy); }
      });
      path.quadraticCurveTo(720, MB + 90, 760, MB + 70);
      for (const [c, w] of [[OUT, 30], [col, 20]]) { g.strokeStyle = c; g.lineWidth = w; g.stroke(path); }
      g.restore();
      HX.forEach((x, k) => txt(g, String(k + 1), x, (MT + MB) / 2, 18, OUT, { stroke: false }));
      txt(g, 'N', 215, 175, 22, C.cream); txt(g, 'C', 785, MB + 70, 22, C.cream);
      // agonistul în situsul de sus
      tri(g, 495, 205, 30, '#ff9a4a', 'A'); txt(g, 'situsul de legare', 660, 175, 20, C.hi);
      // proteina G pe fața internă
      galpha(g, 420, 600, '#ffb86b', 'α', 'GDP'); gbg(g, 505, 585);
      txt(g, 'proteina G: α + βγ', 470, 700, 21, C.cream);
      txt(g, '7 helixuri,\nun singur lanț', 870, 230, 20, col);
      // medalia
      ell(g, 880, 780, 70, 70, '#f2c14e', { ow: 6 }); txt(g, 'Nobel\n2012', 880, 780, 22, OUT, { stroke: false });
      txt(g, 'β2 + Gs · PDB 3SN6', 760, 880, 19, C.cream, { w: 700 });
    },
  };
}

/* =================================================== CICLUL PROTEINEI G */
export function gcycle() {
  const MY = 250, RX = 250, EX = 760; const AH = [RX - 20, MY + 110], BG = [RX + 70, MY + 90];
  const ST = ['repaus', 'GDP → GTP', 'α-GTP activ', 'GTP → GDP'];
  return {
    home: HOME, anchors: [[BG[0] + 40, BG[1] - 40], [RX - 100, MY - 110], [EX + 70, MY - 70], [AH[0] - 80, AH[1] + 40]],
    phase: (i) => ['repaus', 'agonistul: GDP → GTP', 'α-GTP → enzima', 'GTP → GDP: oprire'][i] || '',
    draw(g, t, b) {
      bg(g);
      const ph = b.i < 0 ? loopT(t, 14) * 4 : b.i + clamp(b.bt / (b.bd * 0.8));
      const p = (k) => clamp(ph - k);
      txt(g, 'în afara celulei', 880, 110, 18, C.dim, { w: 700 }); txt(g, 'citoplasma', 880, 400, 18, C.dim, { w: 700 });
      membrane(g, 0, 1000, MY, { h: 54 });
      const lg = ph >= 1 && ph < 3.6 ? ease(clamp(p(1) / 0.35)) : ph >= 3.6 ? 1 : 0;
      receptor(g, RX, MY, '#7ad3a0', 'receptor', { s: 1.1, glow: ph >= 1.35 && ph < 3 ? 1 : 0, gc: C.hi, ly: -122, size: 22 });
      tri(g, RX, lerp(60, MY - 74, lg), 26, '#ff9a4a', 'A', { alpha: ph >= 1 ? 1 : 0.35 });
      const enzOn = ph >= 2.5 && ph < 3.3;
      enzyme(g, EX, MY, '#f3e7ff', 'AC / PLC', { glow: enzOn ? 1 : 0, size: 20 });
      // α: drumul
      let ax = AH[0], ay = AH[1];
      if (ph >= 2 && ph < 3) { const q = ease(clamp(p(2) / 0.5)); ax = lerp(AH[0], EX, q); ay = lerp(AH[1], MY + 95, q); }
      else if (ph >= 3) { const q = ease(clamp((p(3) - 0.3) / 0.6)); ax = lerp(EX, AH[0], q); ay = lerp(MY + 95, AH[1], q); }
      const tok = ph < 1.6 ? 'GDP' : ph < 3.15 ? 'GTP' : 'GDP';
      gbg(g, BG[0], BG[1]);
      galpha(g, ax, ay, '#ffb86b', 'α', tok, { glow: ph >= 2 && ph < 3.2 ? 1 : 0 });
      // GDP pleacă, GTP vine (punctul 2)
      if (ph >= 1.35 && ph < 1.7) { const q = clamp((ph - 1.35) / 0.35); pill(g, lerp(AH[0], AH[0] - 140, q), lerp(AH[1] + 40, AH[1] + 160, q), 66, 28, '#c9a77a', 'GDP', { size: 15, alpha: 1 - q, r: 12 }); }
      if (ph >= 1.5 && ph < 1.6) { const q = clamp((ph - 1.5) / 0.1); pill(g, AH[0] + 4, lerp(AH[1] + 200, AH[1] + 40, q), 66, 28, '#7fe8ff', 'GTP', { size: 15, r: 12 }); }
      // mesagerul secund
      if (ph >= 2.5 && ph < 3.3) for (let j = 0; j < 8; j++) { const v = ((j / 8) + t * 0.5) % 1; dot(g, EX - 50 + (j % 4) * 34, MY + 60 + v * 220, 8, C.ca, { ow: 2, alpha: Math.sin(v * Math.PI) }); }
      if (ph >= 2.5 && ph < 3.3) txt(g, 'mesagerul secund\nAMPc / IP3 + DAG', EX + 120, MY + 230, 18, C.ca, { w: 700 });
      if (ph >= 3 && ph < 3.4) { const q = clamp((ph - 3.1) / 0.3); dot(g, lerp(EX + 30, EX + 120, q), lerp(MY + 130, MY + 210, q), 9, '#fff', { ow: 2.5, alpha: 1 - q }); txt(g, 'Pi', lerp(EX + 30, EX + 120, q) + 22, lerp(MY + 130, MY + 210, q), 16, C.cream, { alpha: 1 - q }); }
      txt(g, 'βγ rămâne', BG[0] + 30, BG[1] + 75, 17, C.dim, { w: 700 });
      // inelul etapelor
      const RC = [500, 760], RR = 115; const cur = Math.min(3, Math.floor(ph));
      g.save(); g.strokeStyle = 'rgba(255,243,230,.35)'; g.lineWidth = 6; g.beginPath(); g.arc(RC[0], RC[1], RR, 0, 7); g.stroke(); g.restore();
      ST.forEach((s, k) => { const a = -Math.PI / 2 + k * Math.PI / 2; const x = RC[0] + Math.cos(a) * RR * 1.6, y = RC[1] + Math.sin(a) * RR; const on = k === cur; pill(g, x, y, 190, 50, on ? '#ffe36e' : '#4a3d58', s, { size: 18, col: on ? OUT : '#e8dcef', glow: on ? 1 : 0 }); });
      txt(g, 'ciclul', RC[0], RC[1], 22, C.cream);
    },
  };
}

/* =================================================== CELE 3 CĂI + CANALUL */
export function gpaths() {
  const X = [140, 385, 630, 870]; const MY = 215;
  const COLS = [
    { rc: C.gs, rec: 'β1, β2, β3 · H2', g: 'Gs', steps: ['adenilat-ciclaza ↑', 'ATP → AMPc ↑', 'PKA'], eff: 'cord: contracție ↑\nm. neted: relaxare', ico: 'heart', fast: true },
    { rc: C.gi, rec: 'α2 · M2', g: 'Gi', steps: ['adenilat-ciclaza ↓', 'AMPc ↓', 'cord: frecvență ↓', '↓ eliberarea de NA'], eff: 'FRÂNĂ', ico: 'heart', off: true },
    { rc: C.gq, rec: 'α1 · M1,3 · H1', g: 'Gq', steps: ['fosfolipaza C ↑', 'PIP2 → IP3 + DAG', 'Ca²⁺ ↑ · PKC'], eff: 'm. neted:\nCONTRACȚIE', ico: 'smooth' },
    { rc: C.nch, rec: 'N1, N2 · GABA-A', chan: true, steps: ['N1, N2 → Na⁺', 'GABA-A → Cl⁻', 'fără proteină G'], eff: 'rapid' },
  ];
  return {
    home: HOME, anchors: X.map((x, i) => (i === 3 ? [x + 70, MY - 30] : [x - 70, MY + 70])),
    phase: (i) => ['Gs: AMPc ↑', 'Gi: AMPc ↓', 'Gq: IP3 + DAG', 'receptor-canal'][i] || '',
    draw(g, t, b) {
      bg(g);
      txt(g, 'în afara celulei', 508, 150, 16, C.dim, { w: 700 }); txt(g, 'citoplasma', 880, MY + 75, 16, C.dim, { w: 700 });
      membrane(g, 0, 1000, MY, { h: 52 });
      const act = b.i >= 0 ? b.i : Math.floor((REDUCED ? 0 : t) / 3.5) % 4;
      const u = b.i >= 0 ? clamp(b.bt / (b.bd * 0.8)) : loopT(t, 3.5);
      COLS.forEach((c, i) => {
        const x = X[i]; const on = i === act; const a = on ? 1 : 0.5;
        txt(g, c.rec, x, 108, 21, c.rc, { alpha: a, maxW: 235 });
        const lig = on ? clamp(u / 0.18) : 1;
        if (c.chan) {
          const open = on ? (u > 0.18 ? 1 : 0) : 0.4; g.save(); g.globalAlpha = a; channel(g, x, MY, open, C.nch, { s: 0.9 }); g.restore();
          ligand(g, x - 44, lerp(135, MY - 50, ease(lig)), C.ach, '', 15, { alpha: a });
          if (on && u > 0.18) for (let j = 0; j < 6; j++) { const v = ((j / 6) + t * 0.7) % 1; txt(g, j % 2 ? 'Cl⁻' : 'Na⁺', x + Math.sin(j) * 6, MY - 70 + v * 170, 16, j % 2 ? '#9fe0ff' : C.nch, { alpha: Math.sin(v * Math.PI) }); }
        } else {
          receptor(g, x, MY, c.rc, '', { s: 0.8, alpha: a, glow: on && u > 0.18 ? 0.8 : 0, gc: c.rc });
          ligand(g, x, lerp(135, MY - 60, ease(lig)), [C.adr, '#9fd3f0', '#c57bff'][i], '', 14, { alpha: a });
          gprot(g, x - 6, MY + 70, c.rc, c.g, { s: 0.85, alpha: a, glow: on && u > 0.25 ? 1 : 0 });
        }
        c.steps.forEach((s, j) => {
          const y = 375 + j * 86; const lit = on ? clamp((u - 0.3 - j * 0.13) / 0.08) : 1;
          const pa = on ? 0.35 + 0.65 * lit : 0.5;
          if (j > 0 || !c.chan) arr(g, x, y - (j ? 62 : 70), x, y - 34, '#fff3e6', 4, pa);
          pill(g, x, y, 218, 52, c.chan ? '#f3e1a0' : '#fff3e0', s, { size: 17, alpha: pa, glow: on && lit > 0.2 && lit < 1 ? 1 : 0, gc: c.rc });
          if (c.off && j === 0) { txt(g, 'inhibată', x + 70, y - 38, 16, C.key, { alpha: pa }); cross(g, x + 98, y, 12, C.key, pa); }
        });
        const ey = 375 + c.steps.length * 86 + 10; const le = on ? clamp((u - 0.75) / 0.15) : 1; const ea = on ? 0.35 + 0.65 * le : 0.5;
        txt(g, c.eff, x, ey, c.eff.includes('\n') ? 19 : 24, c.rc, { alpha: ea });
        if (c.ico === 'smooth') { const kk = on ? 0.5 + 0.5 * Math.sin(t * 4) * le : 0.3; g.save(); g.globalAlpha = ea; myofil(g, x, ey + 125, 170, Math.max(0, kk)); g.restore(); }
        if (c.ico === 'heart') { const rate = c.fast ? 4.2 : 1.4; const beat = Math.max(0, Math.sin(t * rate)) ** 6; g.save(); g.globalAlpha = ea; heart(g, x, ey + 112, 0.55, on ? beat : 0); g.restore(); txt(g, c.fast ? 'mai tare' : 'mai rar', x, ey + 172, 16, C.cream, { alpha: ea, w: 700 }); }
      });
    },
  };
}

/* =================================================== ACEEAȘI Gs: MUȘCHI NETED vs CORD */
export function gsTwo() {
  const CH = ['agonist β', 'Gs: αs-GTP', 'adenilat-ciclaza', 'AMPc ↑']; const CY = 115; const PK = [500, 225];
  const LM = 455; // membrana celulelor
  const caL = Array.from({ length: 10 }, (_, j) => [70 + (j % 5) * 80, 540 + Math.floor(j / 5) * 60]);
  return {
    home: HOME, anchors: [[PK[0] - 90, PK[1] - 30], [40, LM - 40], [960, LM - 40]],
    phase: (i) => ['calea comună → PKA', 'm. neted: Ca²⁺ iese → relaxare', 'cord: Ca²⁺ intră → contracție'][i] || '',
    draw(g, t, b) {
      bg(g);
      const s = (k) => (b.i < 0 || b.i > k ? 1 : b.i < k ? 0 : clamp(b.bt / (b.bd * 0.8)));
      const s0 = s(0), s1 = s(1), s2 = s(2);
      CH.forEach((c, j) => { const x = 130 + j * 245; const lit = clamp(s0 * 5 - j); pill(g, x, CY, 210, 58, j === 0 ? '#ffb38a' : j === 1 ? C.gs : '#fff3e0', c, { size: 19, alpha: 0.4 + 0.6 * lit, glow: lit > 0.1 && lit < 1 ? 1 : 0, gc: C.gs }); if (j < 3) arr(g, x + 110, CY, x + 134, CY, C.cream, 5, 0.8); });
      arr(g, 130 + 3 * 245, CY + 34, PK[0] + 80, PK[1] - 20, C.cream, 5, 0.4 + 0.6 * clamp(s0 * 5 - 3.5));
      const pkl = clamp(s0 * 5 - 4); ell(g, PK[0], PK[1], 78, 46, '#a8f0c8', { ow: 5, alpha: 0.35 + 0.65 * pkl }); txt(g, 'PKA', PK[0], PK[1], 26, OUT, { stroke: false, alpha: 0.35 + 0.65 * pkl });
      arr(g, PK[0] - 70, PK[1] + 30, 330, 310, C.cream, 6, 0.3 + 0.7 * pkl); arr(g, PK[0] + 70, PK[1] + 30, 670, 310, C.cream, 6, 0.3 + 0.7 * pkl);
      // panouri
      panel(g, 15, 300, 478, 620, { fill: 'rgba(95,207,122,.08)', stroke: b.i === 1 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 1 ? 5 : 3 });
      panel(g, 507, 300, 478, 620, { fill: 'rgba(255,111,74,.08)', stroke: b.i === 2 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 2 ? 5 : 3 });
      txt(g, 'mușchi neted (β2)', 130, 335, 21, C.gs); txt(g, 'cord (β1)', 870, 335, 21, C.na);
      membrane(g, 25, 483, LM, { h: 40 }); membrane(g, 517, 975, LM, { h: 40 });
      // stânga: pompa + reticulul
      channel(g, 120, LM, s1 > 0.1 ? 0.6 : 0.15, '#7fe8ff', { s: 0.55 }); txt(g, 'Ca²⁺-ATPaza', 120, LM + 52, 16, C.camp);
      const er = blob(370, 650, 85, 50, 0, t, 0.1, 12, 4); paint(g, er, C.er, C.erS, '#e9e0ff', bb(370, 650, 85, 50), OUT, 4); txt(g, 'reticul: calsechestrina', 370, 718, 15, C.er);
      caL.forEach(([x0, y0], j) => { const q = ease(clamp(s1 * 1.6 - j * 0.06)); const toPump = j % 2 === 0; const tx = toPump ? 120 : 330 + (j % 3) * 35, ty = toPump ? 400 : 640 + (j % 2) * 18; let x = lerp(x0, tx, q), y = lerp(y0, ty, q); if (toPump && q >= 1) { y = 395 - (j % 4) * 6; x = 170 + j * 26; } dot(g, x, y, 9, C.ca, { ow: 2.5 }); });
      const relax = s1; myofil(g, 230, 800, 300, (1 - relax) * 0.8);
      txt(g, relax > 0.6 ? 'Ca²⁺ ↓ → RELAXARE' : 'Ca²⁺ citosolic', 254, 895, 21, relax > 0.6 ? C.gs : C.ca);
      // dreapta: calciductina
      const op = s2; channel(g, 746, LM, 0.1 + 0.9 * op, C.nch, { s: 0.7 }); txt(g, 'calciductina', 746, LM + 62, 17, C.nch);
      for (let j = 0; j < 8; j++) { const v = ((j / 8) + t * 0.6) % 1; const y = op > 0.1 ? lerp(395, 620, v) : 395 + (j % 2) * 10; dot(g, 680 + (j % 4) * 40 + (op > 0.1 ? (746 - 680 - (j % 4) * 40) * Math.sin(v * Math.PI) * 0.8 : 0), y, 9, C.ca, { ow: 2.5, alpha: op > 0.1 ? Math.sin(v * Math.PI) : 1 }); }
      const beat = Math.max(0, Math.sin(t * (2.5 + 2 * op))) ** 6; heart(g, 746, 730, 0.8 + 0.12 * op, beat * (0.4 + 0.8 * op));
      txt(g, op > 0.6 ? 'Ca²⁺ intră → CONTRACȚIE ↑' : 'Ca²⁺ în afara celulei', 746, 895, 21, op > 0.6 ? C.na : C.ca);
    },
  };
}

/* =================================================== DECODORUL (static) */
export function decoder() {
  const CX = [110, 300, 500, 700, 890]; const T = ['afinitate?', 'activitate\nintrinsecă?', 'ce proteină G?', 'ce țesut?', 'efect +\nindicație'];
  return {
    home: HOME, anchors: CX.map((x) => [x - 70, 120]),
    draw(g, t, b) {
      bg(g);
      CX.forEach((x, k) => {
        const on = b.i === k || b.i < 0; const a = on ? 1 : 0.5;
        panel(g, x - 90, 100, 180, 560, { fill: b.i === k ? 'rgba(255,207,133,.15)' : 'rgba(255,236,200,.06)', stroke: b.i === k ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === k ? 5 : 3 });
        txt(g, String(k + 1), x, 150, 40, C.hi, { alpha: a });
        txt(g, T[k], x, 230, 21, C.cream, { alpha: a, maxW: 170 });
        g.save(); g.globalAlpha = a;
        if (k === 0) { lock(g, x, 420, 0, { s: 0.7 }); key(g, x, 430, '#5fcf7a', { s: 0.7 }); txt(g, 'intră?', x, 600, 19, C.cream); }
        if (k === 1) { lock(g, x, 420, 1, { s: 0.7 }); key(g, x, 430, '#5fcf7a', { s: 0.7, spin: 1 }); txt(g, 'se rotește?', x, 600, 19, C.cream); }
        if (k === 2) { [['Gs', C.gs], ['Gi', C.gi], ['Gq', C.gq]].forEach(([l, c], j) => pill(g, x, 360 + j * 80, 120, 52, c, l, { size: 22 })); txt(g, 'AMPc ↑ · ↓ · Ca²⁺ ↑', x, 600, 16, C.cream, { maxW: 170 }); }
        if (k === 3) { icon(g, 'bronchi', x - 40, 360, 0.6); icon(g, 'uterus', x + 40, 360, 0.6); icon(g, 'heart', x - 40, 470, 0.6); icon(g, 'gland', x + 40, 470, 0.6); txt(g, 'm. neted · cord\nglande', x, 600, 16, C.cream); }
        if (k === 4) { icon(g, 'pill', x, 400, 1.1, { col: C.key }); txt(g, '→ boala\n→ exemplu', x, 500, 19, C.cream); }
        g.restore();
        if (k < 4) arr(g, x + 92, 380, x + 108, 380, C.cream, 5, 0.8);
      });
      panel(g, 20, 690, 960, 220, { fill: 'rgba(127,232,255,.08)' });
      txt(g, 'exemplu: Gq în bronhii, fără activitate intrinsecă', 500, 725, 20, C.camp);
      ['se leagă', 'antagonist', 'Gq (ar contracta)', 'bronhii', 'bronhodilatator'].forEach((s, j) => { const x = 110 + j * 195; pill(g, x, 800, 178, 56, j === 4 ? '#ffd0c8' : '#fff3e0', s, { size: 17 }); if (j < 4) arr(g, x + 90, 800, x + 104, 800, C.cream, 4, 0.8); });
      txt(g, 'ex. ipratropiu / tiotropiu (M3) → astm, BPOC', 500, 875, 19, C.cream, { w: 700 });
    },
  };
}

/* =================================================== CASCADELE CAZURILOR 2 (smooth), 3 (heart), 4 (gq) */
export function casc({ spec }) {
  const kind = spec.sceneOpts.kind; const MY = 250, RX = 230, EX = 500;
  const col = kind === 'gq' ? C.gq : C.gs;
  const anchors = {
    smooth: [[RX + 80, 90], [EX - 70, MY - 70], [965, MY + 80], [830, 470]],
    heart: [[RX + 80, 90], [545, 380], [30, 440], [560, 830]],
    gq: [[30, 215], [EX - 70, MY - 70], [140, 560], [800, 560]],
  }[kind];
  const phases = {
    smooth: ['S se leagă de β2', 'Gs → AC → AMPc → PKA', 'Ca²⁺ ↓ → relaxare', 'bronhodilatație · tocolitic'],
    heart: ['M ocupă β1', 'cascada blocată', 'Ca²⁺ ↓ → contracție ↓', 'cardioinhibiție'],
    gq: ['histamina → H1', 'Gq → PLC → IP3 + DAG', 'Ca²⁺ ↑ + PKC', 'bronhoconstricție'],
  }[kind];
  const AH = [RX - 20, MY + 105], BG = [RX + 70, MY + 85];
  return {
    home: HOME, anchors, phase: (i) => phases[i] || '',
    draw(g, t, b) {
      bg(g);
      const ph = b.i >= 0 ? b.i + clamp(b.bt / (b.bd * 0.8)) : kind === 'heart' ? 4 : loopT(t, 14) * 4;
      const p = (k) => clamp(ph - k);
      txt(g, 'în afara celulei', kind === 'gq' ? 880 : 120, kind === 'gq' ? 200 : 110, 17, C.dim, { w: 700 }); txt(g, 'citoplasma', 80, MY + 60, 17, C.dim, { w: 700 });
      membrane(g, 0, 1000, MY, { h: 54 });
      const recLab = { smooth: 'β2', heart: 'β1', gq: 'H1' }[kind];
      // ---- ligandul
      if (kind === 'heart') {
        const e = ease(clamp(p(0) / 0.4));
        receptor(g, RX, MY, col, recLab, { s: 1.05, ly: -120, size: 26 });
        ligand(g, RX, lerp(60, MY - 66, e), C.gi, 'M', 24, { shape: 'block' });
        const na = clamp((p(0) - 0.4) / 0.5); const nx = na < 0.5 ? lerp(420, RX + 30, ease(na * 2)) : lerp(RX + 30, 420, ease((na - 0.5) * 2)); const ny = na < 0.5 ? lerp(70, MY - 120, ease(na * 2)) : lerp(MY - 120, 90, ease((na - 0.5) * 2));
        if (ph >= 0.4) { ligand(g, nx, ny, C.na, 'NA', 22); if (na > 0.45) cross(g, RX + 45, MY - 95, 16, C.key, 1); }
      } else {
        const lp = ease(clamp(p(0) / 0.6));
        receptor(g, RX, MY, col, kind === 'gq' ? '' : recLab, { s: 1.05, glow: p(0) > 0.6 ? 1 : 0, gc: col, ly: -120, size: 26 }); if (kind === 'gq') txt(g, recLab, RX + 85, MY - 70, 26, col);
        if (kind === 'smooth') ligand(g, RX, lerp(50, MY - 66, lp), C.gs, 'S', 24);
        else {
          mastocyte(g, 75, 120, 48, clamp(p(0) * 1.5) * 0.6, t); txt(g, 'mastocit', 75, 186, 16, '#d6a7ff');
          for (let j = 0; j < 5; j++) dot(g, 160 + j * 22, 90 + (j % 2) * 30, 8, '#b06ad0', { ow: 2, alpha: clamp(p(0) * 2) });
          ligand(g, lerp(160, RX, lp), lerp(130, MY - 66, lp), '#b06ad0', 'H', 22);
        }
      }
      // ---- proteina G
      gbg(g, BG[0], BG[1]);
      let ax = AH[0], ay = AH[1], tok = 'GDP';
      if (kind !== 'heart' && ph >= 1) { const q = ease(clamp((p(1) - 0.25) / 0.4)); tok = p(1) > 0.2 ? 'GTP' : 'GDP'; ax = lerp(AH[0], EX - 10, q); ay = lerp(AH[1], MY + 95, q); }
      galpha(g, ax, ay, col, kind === 'gq' ? 'αq' : 'αs', tok, { glow: kind !== 'heart' && ph >= 1.2 && ph < 2.5 ? 1 : 0 });
      if (kind === 'heart' && ph >= 1) cross(g, AH[0] + 50, AH[1] + 40, 14, C.key, clamp(p(1) * 5));
      // ---- enzima
      enzyme(g, EX, MY, '#f3e7ff', kind === 'gq' ? 'PLC' : 'adenilat-\nciclaza', { glow: kind !== 'heart' && p(1) > 0.6 ? 1 : 0, size: kind === 'gq' ? 26 : 16, off: kind === 'heart' ? clamp(p(1) * 5 - 1) : 0 });
      if (kind === 'smooth') {
        const cp = clamp((p(1) - 0.55) / 0.45);
        for (let j = 0; j < 6; j++) { const q = clamp(cp * 1.5 - j * 0.08); dot(g, lerp(EX - 20 + j * 8, 560 + (j % 3) * 40, q), lerp(MY + 40, 400 + Math.floor(j / 3) * 40, q), 10, q > 0.3 ? C.camp : '#ffe7a0', { ow: 2.5, alpha: ph >= 1.5 ? 1 : 0.25 }); }
        txt(g, 'ATP → AMPc ↑', 600, 505, 19, C.camp, { alpha: 0.3 + 0.7 * cp });
        ell(g, 740, 410, 56, 40, '#a8f0c8', { ow: 5, alpha: 0.3 + 0.7 * cp }); txt(g, 'PKA', 740, 410, 22, OUT, { stroke: false, alpha: 0.3 + 0.7 * cp });
        // pompa + reticul
        channel(g, 900, MY, p(2) > 0.1 ? 0.6 : 0.15, '#7fe8ff', { s: 0.55 }); txt(g, 'Ca²⁺-ATPaza', 880, MY + 58, 16, C.camp);
        const er = blob(210, 640, 150, 70, -0.05, t, 0.1, 14, 4); paint(g, er, C.er, C.erS, '#e9e0ff', bb(210, 640, 150, 70), OUT, 5); txt(g, 'reticul · calsechestrina', 210, 735, 17, C.er);
        const rl = clamp(p(2) / 0.7); arr(g, 790, 400, 880, MY + 75, C.cream, 4, rl); arr(g, 690, 430, 360, 600, C.cream, 4, rl);
        for (let j = 0; j < 10; j++) { const x0 = 560 + (j % 5) * 70, y0 = 560 + Math.floor(j / 5) * 50; const toPump = j % 2 === 0; const q = ease(clamp(rl * 1.4 - j * 0.04)); let x = lerp(x0, toPump ? 780 + (j % 5) * 40 : 150 + (j % 5) * 30, q), y = lerp(y0, toPump ? MY - 52 - (j % 3) * 18 : 640, q); dot(g, x, y, 9, C.ca, { ow: 2.5 }); }
        myofil(g, 740, 820, 280, (1 - rl) * (0.75 + 0.15 * Math.sin(t * 4)));
        txt(g, rl > 0.5 ? 'Ca²⁺ ↓ → RELAXARE' : 'miofilamente', 740, 905, 22, rl > 0.5 ? C.gs : C.cream);
        const e4 = clamp(p(3) / 0.6);
        if (ph >= 3) { bronchus(g, 905, 530, 55, 0.3 + 0.6 * e4); txt(g, 'bronhodilatație', 905, 600, 17, C.gs, { alpha: e4 }); icon(g, 'uterus', 905, 668, 0.75); txt(g, 'tocolitic', 905, 728, 17, C.gs, { alpha: e4 }); }
      } else if (kind === 'heart') {
        // cascada normală estompată, cu ✕ pe fiecare verigă
        const CH = ['αs-GTP', 'adenilat-ciclaza', 'AMPc ↑', 'PKA', 'canale Ca²⁺ tip L'];
        CH.forEach((c, j) => { const y = 340 + j * 62; pill(g, 660, y, 200, 46, '#4a3d58', c, { size: 17, col: '#d8cde0' }); cross(g, 770, y, 12, C.key, clamp(p(1) * 6 - j)); if (j < 4) arr(g, 660, y + 24, 660, y + 38, '#d8cde0', 3, 0.6); });
        txt(g, 'normal', 660, 305, 16, C.dim, { w: 700 });
        channel(g, 880, MY, 0.05, C.nch, { s: 0.6 }); txt(g, 'canal de Ca²⁺', 880, MY - 52, 16, C.nch); cross(g, 925, MY + 40, 11, C.key, clamp(p(1) * 6 - 4));
        const e3 = clamp(p(2) / 0.6);
        for (let j = 0; j < 2; j++) { const v = ((j / 2) + t * 0.3) % 1; dot(g, 880, lerp(MY - 40, MY + 140, v), 9, C.ca, { ow: 2.5, alpha: ph >= 2 ? Math.sin(v * Math.PI) : 0 }); }
        const beat = Math.max(0, Math.sin(t * lerp(4.2, 2, e3))) ** 6; heart(g, 330, 690, lerp(1, 0.85, e3), beat * lerp(1, 0.35, e3));
        ['forță ↓', 'frecvență ↓', 'Ca²⁺ intracelular ↓', 'renină ↓'].forEach((c, j) => pill(g, 120 + (j % 2) * 210, 480 + Math.floor(j / 2) * 62, 190, 48, '#bcdcff', c, { size: 17, alpha: 0.25 + 0.75 * e3 }));
        const e4 = clamp(p(3) / 0.6);
        txt(g, 'CARDIOSTIMULARE', 330, 830, 24, '#ff9a8a', { alpha: 0.4 + 0.6 * e4 }); if (e4 > 0.2) { g.save(); g.strokeStyle = C.key; g.lineWidth = 6; g.beginPath(); g.moveTo(200, 830); g.lineTo(460, 830); g.stroke(); g.restore(); }
        txt(g, 'CARDIOINHIBIȚIE', 760, 830, 30, C.gi, { alpha: 0.3 + 0.7 * e4 });
        txt(g, 'schema din LP', 760, 880, 17, C.dim, { alpha: e4, w: 700 });
      } else {
        // Gq: PIP2 → IP3 + DAG
        const sp = clamp((p(1) - 0.6) / 0.4);
        if (ph < 1.6) pill(g, 700, MY, 84, 40, '#ffd6a0', 'PIP2', { size: 18 });
        else { pill(g, lerp(700, 770, sp), MY, 80, 40, '#ffe08a', 'DAG', { size: 18 }); }
        const pk = clamp(p(2) / 0.5); ell(g, 860, 420, 52, 40, '#d6a7ff', { ow: 5, alpha: 0.3 + 0.7 * pk }); txt(g, 'PKC', 860, 420, 20, OUT, { stroke: false, alpha: 0.3 + 0.7 * pk }); arr(g, 790, MY + 26, 835, 385, '#fff3e6', 4, pk * 0.8);
        txt(g, 'contracție tonică', 860, 480, 17, '#d6a7ff', { alpha: pk });
        const er = blob(230, 640, 180, 75, -0.05, t, 0.12, 14, 4); paint(g, er, C.er, C.erS, '#e9e0ff', bb(230, 640, 180, 75), OUT, 5);
        txt(g, 'reticul endoplasmatic', 230, 745, 18, C.er);
        pill(g, 330, 572, 44, 30, '#ff6b5e', '', { r: 8 }); txt(g, 'receptor IP3', 420, 548, 15, C.cream, { w: 700 });
        if (ph >= 1.6) { const ip = clamp((ph - 1.6) / 1.0); pill(g, lerp(690, 330, ip), lerp(MY + 30, 540, ip), 70, 40, '#9fe0ff', 'IP3', { size: 18 }); }
        const ca = clamp((p(2) - 0.3) / 0.6);
        const kk = ph >= 2.4 ? clamp((ph - 2.4) / 0.5) * (0.8 + 0.2 * Math.sin(t * 5)) : 0;
        myofil(g, 740, 820, 280, kk);
        for (let j = 0; j < 10; j++) { const s0 = [180 + (j % 5) * 28, 625 + Math.floor(j / 5) * 25]; const tgt = [630 + (j % 5) * 55, 745 + Math.floor(j / 5) * 22]; const q = clamp(ca * 1.4 - j * 0.04); dot(g, lerp(s0[0], tgt[0], q), lerp(s0[1], tgt[1], q), 9, C.ca, { ow: 2.5 }); }
        txt(g, 'Ca²⁺ ↑', 470, 650, 20, C.ca, { alpha: ph >= 2 ? 1 : 0.4 });
        txt(g, kk > 0.2 ? 'contracție fazică (Ca²⁺)' : 'miofilamente', 740, 905, 20, kk > 0.2 ? C.hi : C.cream);
        const e4 = ph >= 3 ? clamp(p(3) / 0.6) : 0;
        bronchus(g, 880, 625, 62, lerp(0.85, 0.12, e4), { alpha: ph >= 3 ? 1 : 0.35 }); txt(g, e4 > 0.5 ? 'BRONHOCONSTRICȚIE' : 'bronhia', 860, 712, 18, e4 > 0.5 ? C.gq : C.cream, { alpha: ph >= 3 ? 1 : 0.4 });
      }
    },
  };
}
