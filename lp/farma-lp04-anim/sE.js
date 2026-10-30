// Scenele LP 4 preluate din deck-ul LP 3 vechi: alergia / anafilaxia (sensibilizare + degranulare) și cardurile (capcane, recapitulare).
import { W, H, HOME, cam, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, loopT, txt, pill, dot, ell, arr, cross, check,
  heart, icon, bronchus, vesselX, gauge, mastocyte, antiY, galpha } from './fk.js';
import { lymphocyte as lymph, plasmocyte as plasma } from './kit2d.js';

const star = (g, x, y, r, a = 1) => { g.save(); g.globalAlpha = clamp(a); const p = new Path2D(); for (let k = 0; k < 16; k++) { const rr = k % 2 ? r * 0.45 : r; const an = k / 16 * Math.PI * 2; k ? p.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : p.moveTo(x + rr, y); } p.closePath(); g.fillStyle = '#ffd34a'; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(p); g.restore(); };

/* =================================================== ANAFILAXIA: SENSIBILIZARE + DEGRANULARE */
export function anaph() {
  const MC = [830, 200]; const MB = [330, 640];
  return {
    home: HOME, anchors: [[30, 110], [MB[0] - 140, MB[1] - 150], [600, 455], [950, 700]],
    phase: (i) => ['expunerea: IgE pe mastocit', 'reexpunerea: degranulare', 'vase: H1 + H2', 'bronhii: H1'][i] || '',
    draw(g, t, b) {
      bg(g);
      const ph = b.i < 0 ? 4 : b.i + clamp(b.bt / (b.bd * 0.8));
      const p = (k) => clamp(ph - k);
      panel(g, 15, 15, 970, 360, { stroke: b.i === 0 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 0 ? 5 : 3 });
      txt(g, 'expunerea la alergen: limfocitele B produc IgE', 420, 355, 18, C.dim, { w: 700 });
      // sus: antigen → limfocit B → plasmocit → IgE → mastocit
      const s1 = p(0);
      for (let j = 0; j < 3; j++) { const q = ease(clamp(s1 / 0.3)); star(g, lerp(70 + j * 25, 250, q), lerp(150 + j * 40, 190, q), 16, 1 - 0.7 * clamp((s1 - 0.3) * 3)); }
      txt(g, 'alergen', 85, 300, 17, '#ffd34a');
      const toP = clamp((s1 - 0.3) / 0.2);
      if (toP < 1) { g.save(); g.globalAlpha = 1 - toP; lymph(g, 320, 190, 1.6, t); g.restore(); }
      if (toP > 0) { g.save(); g.globalAlpha = toP; plasma(g, 320, 190, 0.95, 0, t); g.restore(); }
      txt(g, 'limfocitul B → IgE', 320, 300, 18, '#c8c1f7');
      const fly = clamp((s1 - 0.5) / 0.4);
      for (let j = 0; j < 7; j++) { const a = -Math.PI * 0.95 + j * Math.PI * 0.95 / 6; const tx = MC[0] + Math.cos(a) * 86, ty = MC[1] + Math.sin(a) * 86; const q = ease(clamp(fly * 1.4 - j * 0.06)); if (fly > 0) antiY(g, lerp(400 + j * 18, tx, q), lerp(200 + (j % 3) * 30, ty, q), lerp(0, a + Math.PI / 2, q)); }
      if (fly > 0 && fly < 1) txt(g, 'IgE', 520, 140, 22, '#7fd36a');
      mastocyte(g, MC[0], MC[1], 80, 0, t, { ige: fly >= 1 ? 1 : 0 });
      txt(g, 'mastocit (sau bazofil)', MC[0], 330, 18, '#d6a7ff');
      // jos: re-expunere
      panel(g, 15, 395, 970, 520, { stroke: b.i >= 1 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i >= 1 ? 5 : 3 });
      txt(g, 'reexpunerea la alergen', 330, 425, 20, C.cream, { w: 700 });
      const s2 = p(1); const deg = clamp((s2 - 0.35) / 0.5);
      mastocyte(g, MB[0], MB[1], 92, deg, t, { ige: 1 });
      for (let j = 0; j < 4; j++) { const a = -Math.PI * 0.8 + j * 0.45; const q = ease(clamp(s2 / 0.35)); star(g, lerp(80 + j * 40, MB[0] + Math.cos(a) * 128, q), lerp(470, MB[1] + Math.sin(a) * 128, q), 15, ph >= 1 ? 1 : 0); }
      txt(g, deg > 0.3 ? 'degranulare: histamină + alți mediatori' : 'antigenul leagă IgE', MB[0], 880, 19, '#d6a7ff');
      // efecte
      const s3 = p(2), s4 = p(3);
      const hist = (x1, y1, q) => { for (let j = 0; j < 6; j++) { const qq = clamp(q * 1.4 - j * 0.08); dot(g, lerp(MB[0] + 90, x1 + (j % 3) * 14, qq), lerp(MB[1] - 20 + j * 8, y1 + (j % 2) * 16, qq), 7, '#b06ad0', { ow: 2, alpha: qq > 0 && qq < 1 ? 1 : 0 }); } };
      hist(600, 560, s3); hist(840, 760, s4);
      const vd = ease(clamp((s3 - 0.3) / 0.6));
      vesselX(g, 620, 560, 62 + 14 * vd, vd, { leak: vd }); gauge(g, 770, 560, 58, lerp(0.75, 0.12, vd), 'TA');
      txt(g, vd > 0.5 ? 'H1 (Gq) + H2 (Gs): vasodilatație,\nTA ↓, colaps, edem al mucoaselor' : 'vasul', 700, 665, 17, vd > 0.5 ? C.key : C.cream, { w: 700 });
      const bc = ease(clamp((s4 - 0.3) / 0.6));
      bronchus(g, 860, 780, 72, lerp(0.85, 0.1, bc), { edema: bc > 0.3 });
      txt(g, bc > 0.5 ? 'H1 (Gq):\nbronhoconstricție' : 'bronhia', 680, 790, 18, bc > 0.5 ? C.gq : C.cream, { w: 700 });
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
