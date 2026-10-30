// Scenele LP 1 Farmacologie (farmacocinetica 1: absorbția și distribuția, cazurile oficiale 1–7).
import { HOME, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, txt, pill, dot, ell, arr, cross, check, tube, curve, at,
  membrane, icon, heart, paint, blob, bb, glowRing } from './fk.js';
import { K, hiBox, mol, pac, axes, plot, liver, kidney, stomach } from './fx.js';

const L = (t, per, off = 0) => (REDUCED ? 0.5 : (((t / per) + off) % 1 + 1) % 1);
const live = (b, k) => b.i < 0 || b.i === k;
const box = (g, x, y, w, h, on, o = {}) => panel(g, x, y, w, h, { fill: on ? 'rgba(255,207,133,.13)' : (o.fill || 'rgba(255,236,200,.05)'), stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3 });
const rbox = (g, x, y, w, h, col, r = 16, ow = 5) => { const p = new Path2D(); p.roundRect(x, y, w, h, r); paint(g, p, col, null, null, [x, y, w, h], OUT, ow); return p; };
const dline = (g, x0, y0, x1, y1, col, w = 3, dash = [9, 7]) => { g.save(); g.strokeStyle = col; g.lineWidth = w; g.setLineDash(dash); g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); };
// siluetă simplă de om (față)
function person(g, x, y, s = 1, col = '#4a3a2c') {
  const P = (pts, w) => tube(g, pts.map(([a, c]) => [x + a * s, y + c * s]), w * s, col, { raw: true, ow: 6 });
  P([[-58, -95], [-88, 10], [-96, 90]], 26); P([[58, -95], [88, 10], [96, 90]], 26);
  P([[-30, 70], [-38, 190], [-40, 280]], 32); P([[30, 70], [38, 190], [40, 280]], 32);
  rbox(g, x - 62 * s, y - 120 * s, 124 * s, 210 * s, col, 36 * s, 6);
  ell(g, x, y - 160 * s, 36 * s, 40 * s, col, { ow: 6 });
}

/* =================================================== COPERTA */
export function cover1() {
  const R = [[40, 50], [520, 50], [40, 490], [520, 490]];
  const T = ['drumul ADME', 'absorbția: 3 condiții', 'biodisponibilitatea: AUC', 'distribuția: Vd, proteine'];
  return {
    home: HOME, anchors: R.map(([x, y]) => [x + 30, y + 30]),
    draw(g, t, b) {
      bg(g);
      R.forEach(([x, y], i) => {
        const act = b.i === i || (b.i < 0 && Math.floor(t / 2.4) % 4 === i);
        box(g, x, y, 440, 400, act); txt(g, T[i], x + 220, y + 360, 26, C.cream);
        const cx = x + 220, cy = y + 175;
        if (i === 0) { ['A', 'D', 'M', 'E'].forEach((l, j) => { pill(g, x + 70 + j * 100, cy - 40, 74, 74, K.stage[j], l, { size: 34, r: 37, alpha: j < 2 ? 1 : 0.45 }); if (j < 3) arr(g, x + 108 + j * 100, cy - 40, x + 132 + j * 100, cy - 40, C.cream, 5); }); txt(g, 'LP 1: A și D', cx, cy + 80, 24, C.hi); }
        if (i === 1) { membrane(g, x + 30, x + 410, cy + 10, { h: 46 }); mol(g, cx - 90, cy - 80, 'HA'); arr(g, cx - 90, cy - 50, cx - 90, cy + 70, C.gs, 6); mol(g, cx + 90, cy - 80, 'A⁻'); cross(g, cx + 90, cy + 10, 20, C.key); }
        if (i === 2) { const A = axes(g, x + 50, y + 40, 340, 270, { xmax: 12, ymax: 10, noTicks: true }); const f = (h) => 9 * (Math.exp(-h / 4) - Math.exp(-h / 0.8)) / 0.6; g.save(); g.fillStyle = 'rgba(255,160,64,.35)'; g.beginPath(); g.moveTo(A.X(0), A.Y(0)); for (let h = 0; h <= 12; h += 0.2) g.lineTo(A.X(h), A.Y(f(h))); g.lineTo(A.X(12), A.Y(0)); g.fill(); g.restore(); plot(g, A, f, 0, 12, { col: K.drug, w: 6 }); txt(g, 'AUC', A.X(4), A.Y(2.5), 28, C.hi); }
        if (i === 3) { ell(g, cx - 70, cy, 80, 52, '#ffe08a', { ow: 5 }); txt(g, 'albumină', cx - 70, cy, 18, OUT, { stroke: false }); [0, 2.1, 4.2].forEach((a) => mol(g, cx - 70 + Math.cos(a) * 80, cy + Math.sin(a) * 52, '', 13)); icon(g, 'fat', cx + 110, cy, 1.2); }
      });
    },
  };
}

/* =================================================== ABSORBȚIA: TRANSPORTUL PRIN MEMBRANĂ (anim) */
export function transport() {
  const X = [140, 380, 620, 860]; const MY = 400;
  const NAME = ['difuziune pasivă', 'difuziune facilitată', 'transport activ', 'endocitoză'];
  return {
    home: HOME, anchors: [[X[0] - 95, 95], [X[1] - 95, 95], [X[2] - 95, 95], [X[3] - 95, 95], [60, 660]],
    phase: (i) => ['difuziunea pasivă', 'difuziunea facilitată', 'transportul activ', 'endocitoza', 'factorii'][i] || '',
    draw(g, t, b) {
      bg(g);
      rbox(g, 20, 40, 960, MY - 70, '#3a2418', 24, 5); rbox(g, 20, MY + 30, 960, 170, '#7a1f2c', 24, 5);
      txt(g, 'locul de administrare', 500, 66, 20, C.cream); txt(g, 'circulația (sânge)', 500, MY + 170, 20, '#ffc9cf');
      txt(g, 'transport pasiv', (X[0] + X[1]) / 2, 140, 21, C.gs);
      g.save(); g.strokeStyle = C.gs; g.lineWidth = 3; g.beginPath(); g.moveTo(X[0] - 90, 158); g.lineTo(X[1] + 90, 158); g.stroke(); g.restore();
      membrane(g, 20, 980, MY, { h: 60 });
      X.forEach((x, k) => {
        const on = b.i === k; const lv = live(b, k) || b.i === 4; const a = lv ? 1 : 0.4;
        hiBox(g, x - 112, 84, 224, 520, on);
        txt(g, NAME[k], x, 112, 19, C.hi, { alpha: a, maxW: 220 });
        g.save(); g.globalAlpha = a;
        if (k === 0) {
          for (let j = 0; j < 4; j++) { const u = lv ? L(t, 3, j / 4) : 0.2 + j * 0.05; dot(g, x - 45 + j * 30, lerp(200, MY + 120, u), 10, '#f4efe6', { ow: 3 }); }
          for (let j = 0; j < 4; j++) dot(g, x - 60 + j * 40, 250 + (j % 2) * 40, 10, '#f4efe6', { ow: 3 });
        }
        if (k === 1) {
          for (const d of [-1, 1]) rbox(g, x + d * 22 - (d < 0 ? 26 : 0), MY - 46, 26, 92, C.gs, 9, 4);
          for (let j = 0; j < 3; j++) { const u = lv ? L(t, 3, j / 3) : 0.3; const y = u < 0.35 ? lerp(220, MY - 50, u / 0.35) : lerp(MY - 50, MY + 120, (u - 0.35) / 0.65); const xx = u < 0.35 ? lerp(x - 70 + j * 50, x, u / 0.35) : x; dot(g, xx, y, 10, '#ffd36e', { ow: 3 }); }
        }
        if (k === 2) {
          const pump = rbox(g, x - 34, MY - 50, 68, 100, '#5aa8ff', 14, 5); void pump;
          txt(g, 'ATP', x + 70, MY + 70, 18, C.hi);
          const u = lv ? L(t, 2.6) : 0.5; const y = lerp(230, MY + 120, ease(u));
          dot(g, x, y, 12, '#ff9ad0', { ow: 3 });
          for (let j = 0; j < 4; j++) dot(g, x - 60 + j * 40, MY + 90 + (j % 2) * 30, 9, '#ff9ad0', { ow: 3, alpha: 0.8 });
        }
        if (k === 3) {
          const u = lv ? L(t, 3.4) : 0.6;
          const y = u < 0.4 ? lerp(220, MY, ease(u / 0.4)) : lerp(MY, MY + 115, ease((u - 0.4) / 0.6));
          if (u > 0.25 && u < 0.6) { g.save(); g.strokeStyle = C.mem; g.lineWidth = 12; g.beginPath(); g.arc(x, MY - 20, 46, 0.1, Math.PI - 0.1); g.stroke(); g.restore(); }
          if (u >= 0.4) ell(g, x, y, 42, 42, 'rgba(243,207,138,.35)', { ow: 5, sc: C.memS });
          ell(g, x, y, 26, 22, '#c57bff', { ow: 4 });
        }
        g.restore();
      });
      // factorii
      const fa = b.i === 4 || b.i < 0;
      box(g, 20, 630, 960, 280, b.i === 4);
      txt(g, 'absorbția este influențată de:', 500, 662, 21, C.hi);
      const F = [['calea de\nadministrare', 'pill'], ['pH-ul\nmediului', 'ph'], ['proprietățile\nchimice', 'mol'], ['suprafața +\nflux sanguin', 'gut'], ['alimente sau\nalte medicamente', 'two']];
      F.forEach(([l, ic], k) => {
        const x = 110 + k * 195, y = 750; g.save(); g.globalAlpha = fa ? 1 : 0.55;
        if (ic === 'pill') icon(g, 'pill', x, y, 0.8); if (ic === 'gut') icon(g, 'gut', x, y, 0.75);
        if (ic === 'ph') txt(g, 'pH', x, y, 44, C.gi); if (ic === 'mol') { mol(g, x - 20, y, 'HA', 24); mol(g, x + 26, y, 'A⁻', 24); }
        if (ic === 'two') { icon(g, 'pill', x - 18, y - 12, 0.5, { col: K.inh }); ell(g, x + 28, y + 16, 22, 20, '#ff6b5e', { ow: 4 }); }
        g.restore();
        txt(g, l, x, 850, 17, C.cream, { w: 700, alpha: fa ? 1 : 0.6 });
      });
    },
  };
}

/* =================================================== CONDIȚIILE: LIPOSOLUBIL · NEIONIZAT · NELEGAT (anim) */
export function cond() {
  const X = [170, 500, 830]; const MY = 420;
  const H = ['LIPOSOLUBIL', 'NEIONIZAT', 'NELEGAT de proteine'];
  const S = ['coef. de repartiție\noctanol/apă', 'depinde de\npH și pKa', 'condiționează\nmărimea moleculei'];
  const bounce = (u, y0, ym) => (u < 0.5 ? lerp(y0, ym, ease(u * 2)) : lerp(ym, y0, ease((u - 0.5) * 2)));
  return {
    home: HOME, anchors: X.map((x) => [x - 135, 70]),
    phase: (i) => ['liposolubil trece', 'neionizat trece', 'nelegat trece'][i] || '',
    draw(g, t, b) {
      bg(g);
      rbox(g, 20, 40, 960, MY - 70, '#3a2418', 24, 5); rbox(g, 20, MY + 30, 960, 230, '#7a1f2c', 24, 5);
      membrane(g, 20, 980, MY, { h: 60 });
      X.forEach((x, k) => {
        const on = b.i === k; const lv = live(b, k); const a = lv ? 1 : 0.4;
        hiBox(g, x - 150, 52, 300, 640, on);
        txt(g, H[k], x, 90, 22, C.hi, { alpha: a, maxW: 290 });
        g.save(); g.globalAlpha = a;
        const u = lv ? L(t, 3.2, k * 0.2) : 0.3; const u2 = lv ? L(t, 3.2, k * 0.2 + 0.5) : 0.7;
        const yPass = lerp(170, MY + 150, ease(u));
        if (k === 0) { mol(g, x - 60, yPass, '', 24, { col: '#ffd36e' }); mol(g, x + 60, bounce(u2, 170, MY - 52), '', 24, { col: K.ion }); }
        if (k === 1) { mol(g, x - 60, yPass, 'HA', 26); mol(g, x + 60, bounce(u2, 170, MY - 52), 'A⁻', 26); }
        if (k === 2) { mol(g, x - 70, yPass, '', 20); const yb = bounce(u2, 190, MY - 70); ell(g, x + 55, yb, 62, 40, '#ffe08a', { ow: 5 }); mol(g, x + 55, yb - 40, '', 15); txt(g, 'albumină', x + 55, yb + 4, 15, OUT, { stroke: false }); }
        g.restore();
        check(g, x - 60, MY + 210, 14, C.gs, a); cross(g, x + 60, MY + 210, 14, C.key, a);
        txt(g, ['lipo', 'HA', 'liber'][k], x - 60, MY + 175, 17, C.gs, { alpha: a }); txt(g, ['hidro', 'A⁻', 'legat'][k], x + 60, MY + 175, 17, '#ffb3ab', { alpha: a });
        box(g, x - 150, 720, 300, 180, on);
        txt(g, S[k], x, 810, 20, C.cream, { w: 700, alpha: a });
      });
    },
  };
}

/* =================================================== BIODISPONIBILITATEA: AUC */
function frac(g, x, y, top, bottom, lead, col, w = 360, pct = true) {
  txt(g, lead, x - w / 2 - 10, y, 24, col, { align: 'right' });
  txt(g, top, x, y - 26, 19, C.cream, { w: 700, maxW: w }); g.save(); g.strokeStyle = C.cream; g.lineWidth = 3; g.beginPath(); g.moveTo(x - w / 2, y); g.lineTo(x + w / 2, y); g.stroke(); g.restore();
  txt(g, bottom, x, y + 26, 19, C.cream, { w: 700, maxW: w }); if (pct) txt(g, '× 100', x + w / 2 + 14, y, 21, C.cream, { align: 'left' });
}
export function auc() {
  const fiv = (h) => 10 * Math.exp(-h / 3); const fpo = (h) => 6 * (Math.exp(-h / 3) - Math.exp(-h / 0.7)) / 0.58;
  return {
    home: HOME, anchors: [[560, 110], [80, 640], [80, 790]],
    draw(g, t, b) {
      bg(g);
      const A = axes(g, 30, 40, 940, 520, { xmax: 14, ymax: 10.5, xt: [], yt: [], xl: 'timp', yl: 'concentrația plasmatică (Cp)' });
      const fill = (f, col) => { g.save(); g.fillStyle = col; g.beginPath(); g.moveTo(A.X(0), A.Y(0)); for (let h = 0; h <= 14; h += 0.1) g.lineTo(A.X(h), A.Y(f(h))); g.lineTo(A.X(14), A.Y(0)); g.closePath(); g.fill(); g.restore(); };
      fill(fiv, 'rgba(90,168,255,.18)'); fill(fpo, b.i === 0 || b.i === 1 || b.i < 0 ? 'rgba(255,160,64,.45)' : 'rgba(255,160,64,.25)');
      plot(g, A, fiv, 0, 14, { col: K.ion, w: 6 }); plot(g, A, fpo, 0, 14, { col: K.drug, w: 6 });
      txt(g, 'i.v. (referința = 100%)', A.X(2.2), A.Y(9.6), 20, K.ion, { align: 'left' });
      txt(g, 'p.o.', A.X(4.6), A.Y(4.9), 22, K.drug, { align: 'left' }); txt(g, 'AUC p.o.', A.X(3), A.Y(1.6), 22, C.hi);
      box(g, 20, 590, 960, 150, b.i === 1); frac(g, 600, 665, 'AUC (ASC) a medicamentului administrat p.o.', 'AUC (ASC) a medicamentului administrat i.v.', 'Bd abs =', C.hi, 470);
      box(g, 20, 760, 960, 150, b.i === 2); frac(g, 600, 835, 'AUC (ASC) a medicamentului testat', 'AUC (ASC) a medicamentului de referință', 'Bd r =', C.hi, 470);
    },
  };
}

/* =================================================== PRIMUL PASAJ HEPATIC (anim) */
export function pasaj() {
  const GI = curve([[170, 110], [175, 220], [200, 300], [230, 380], [210, 470], [260, 540], [200, 600], [250, 660]]);
  const POR = curve([[290, 620], [380, 590], [470, 520], [540, 450]]);
  const HEP = curve([[700, 330], [760, 260], [810, 220]]);
  const SYS = curve([[880, 250], [920, 360], [920, 520]]);
  return {
    home: HOME, anchors: [[120, 90], [460, 470], [600, 250]],
    phase: (i) => ['administrarea orală', 'vena portă → ficat', 'enzimele hepatice → circulația'][i] || '',
    draw(g, t, b) {
      bg(g);
      tube(g, GI, 26, '#f0a6a0', { raw: true, glow: b.i === 0 ? 0.6 : 0 });
      ell(g, 170, 95, 60, 34, '#e88a9a', { ow: 5 }); txt(g, '1 · gura', 290, 95, 20, C.cream);
      txt(g, '2 · intestinul', 110, 700, 20, C.cream);
      tube(g, POR, 16, '#7c4ad8', { raw: true, glow: b.i === 1 ? 0.6 : 0 }); txt(g, 'vena portă', 400, 660, 19, '#c7b1ff');
      liver(g, 620, 370, 2.0, { glow: b.i === 2 }); txt(g, '3 · ficatul', 620, 500, 22, C.cream);
      tube(g, HEP, 14, '#5b6be0', { raw: true }); heart(g, 850, 230, 0.5, Math.max(0, Math.sin(t * 6)) * 0.5);
      tube(g, SYS, 14, C.blood, { raw: true, glow: b.i === 2 ? 0.6 : 0 }); txt(g, 'circulația\nsistemică', 880, 580, 19, '#ffc9cf');
      // pastila pe tub
      if (live(b, 0)) { const [px, py] = at(GI, L(t, 4)); const pp = new Path2D(); pp.roundRect(px - 22, py - 11, 44, 22, 11); paint(g, pp, K.drug, null, '#fff', [px - 22, py - 11, 44, 22], OUT, 4); }
      // molecule pe vena portă
      if (live(b, 1) || b.i === 2) for (let k = 0; k < 5; k++) { const [x, y] = at(POR, L(t, 3, k / 5)); dot(g, x, y, 9, K.drug, { ow: 2.5 }); }
      // în ficat: medicamentul → metabolit inactiv (verde); pro-drogul (gri) → activ (portocaliu)
      const m = b.i === 2 ? L(t, 3) : b.i < 0 ? 1 : 0;
      if (b.i < 0 || b.i === 2) {
        pac(g, 560, 360, 26, C.gq, t * 5); pac(g, 680, 350, 26, C.gq, t * 5 + 1);
        for (let k = 0; k < 4; k++) dot(g, 540 + k * 40, 300, 10, m > (k + 1) / 5 ? K.met : K.drug, { ow: 2.5 });
        dot(g, 700, 300, 10, K.drug, { ow: 2.5 });
        dot(g, 600, 420, 11, m > 0.5 ? K.drug : K.grey, { ow: 2.5 }); txt(g, 'pro-drog', 660, 422, 15, C.cream, { align: 'left', w: 700 });
      }
      // ce ajunge în circulație
      if (live(b, 2)) { for (let k = 0; k < 2; k++) { const [x, y] = at(SYS, L(t, 3, k / 2)); dot(g, x, y, 9, K.drug, { ow: 2.5 }); } for (let k = 0; k < 3; k++) { const [x, y] = at(SYS, L(t, 3, k / 3 + 0.15)); dot(g, x, y, 9, K.met, { ow: 2.5 }); } }
      // legenda
      panel(g, 330, 740, 650, 170, {});
      dot(g, 370, 785, 11, K.drug); txt(g, 'medicament activ', 395, 785, 19, C.cream, { align: 'left', w: 700 });
      dot(g, 370, 830, 11, K.met); txt(g, 'metabolit inactiv', 395, 830, 19, C.cream, { align: 'left', w: 700 });
      dot(g, 370, 875, 11, K.grey); txt(g, 'pro-drog (inactiv)', 395, 875, 19, C.cream, { align: 'left', w: 700 });
      pac(g, 700, 830, 26, C.gq, t * 4); txt(g, 'enzimele hepatice', 740, 830, 19, C.cream, { align: 'left', w: 700 });
    },
  };
}

/* =================================================== FORME FARMACEUTICE, CĂI DE ADMINISTRARE, VÂRF ȘI MINIM */
function syringe(g, x, y, s = 1, rot = -0.6) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); rbox(g, -14, -50, 28, 80, '#dff0ff', 6, 4); rbox(g, -20, -58, 40, 10, '#9bb', 4, 3); g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 30); g.lineTo(0, 62); g.stroke(); g.strokeStyle = '#ddd'; g.lineWidth = 3; g.stroke(); g.restore(); }
export function routes() {
  const FORMS = ['comprimat', 'soluție', 'spray', 'unguent'];
  const RT = ['per os', 'intramuscular', 'intravenos', 'inhalator', 'nazal', 'cutanat'];
  return {
    home: HOME, anchors: [[40, 50], [40, 250], [560, 520], [600, 860], [910, 560]],
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 960, 190, b.i === 0); txt(g, 'forme farmaceutice', 860, 58, 19, C.hi);
      FORMS.forEach((f, k) => {
        const x = 170 + k * 220, y = 130;
        if (k === 0) icon(g, 'pill', x, y, 0.8);
        if (k === 1) { rbox(g, x - 26, y - 30, 52, 70, '#8f5bd6', 10, 4); rbox(g, x - 14, y - 50, 28, 22, '#ddd', 5, 3); }
        if (k === 2) { rbox(g, x - 22, y - 40, 44, 80, '#5aa8ff', 12, 4); rbox(g, x - 10, y - 60, 20, 22, '#eee', 4, 3); }
        if (k === 3) { g.save(); g.translate(x, y); g.rotate(-0.5); rbox(g, -46, -16, 92, 32, '#9be15d', 10, 4); rbox(g, 46, -9, 18, 18, '#eee', 4, 3); g.restore(); }
        txt(g, f, x, 195, 18, C.cream, { w: 700 });
      });
      box(g, 20, 230, 960, 210, b.i === 1); txt(g, 'căi de administrare', 860, 256, 19, C.hi);
      RT.forEach((r, k) => {
        const x = 110 + k * 156, y = 340;
        if (k === 0) { ell(g, x, y, 36, 22, '#e88a9a', { ow: 4 }); icon(g, 'pill', x + 6, y - 40, 0.4); }
        if (k === 1) { icon(g, 'muscle', x, y + 10, 0.6); syringe(g, x + 22, y - 30, 0.8); }
        if (k === 2) { icon(g, 'vessel', x, y + 20, 0.6); rbox(g, x - 18, y - 70, 36, 46, '#dff0ff', 8, 4); g.save(); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(x, y - 24); g.lineTo(x, y + 8); g.stroke(); g.restore(); }
        if (k === 3) { rbox(g, x - 30, y - 18, 60, 40, '#5aa8ff', 10, 4); rbox(g, x - 12, y - 52, 24, 36, '#eee', 6, 3); }
        if (k === 4) { g.save(); g.strokeStyle = OUT; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(x - 10, y - 40); g.lineTo(x + 14, y + 10); g.lineTo(x - 8, y + 18); g.stroke(); g.strokeStyle = '#f3c29b'; g.lineWidth = 4; g.stroke(); g.restore(); rbox(g, x + 18, y + 14, 16, 34, '#5aa8ff', 5, 3); }
        if (k === 5) { icon(g, 'hair', x, y, 0.6); }
        txt(g, r, x, 410, 16, C.cream, { w: 700, maxW: 150 });
      });
      // vârf și minim, din imaginea LP-ului
      const A = axes(g, 20, 460, 960, 450, { xmax: 15, ymax: 11, xt: [], yt: [], xl: 'timp', yl: 'concentrația serică' });
      const f = (h) => { let v = 0; for (const d of [0, 5, 10]) if (h >= d) { const x = h - d; v += 9 * (Math.exp(-x / 1.4) - Math.exp(-x / 0.45)) / 0.52; } return v; };
      dline(g, A.x0, A.Y(9), A.x1, A.Y(9), C.key); dline(g, A.x0, A.Y(3), A.x1, A.Y(3), C.gi);
      txt(g, 'concentrația toxică', A.x1 - 6, A.Y(9) - 16, 17, C.key, { align: 'right' }); txt(g, 'concentrația minimă eficace', A.x1 - 6, A.Y(3) + 18, 17, C.gi, { align: 'right' });
      g.save(); g.fillStyle = b.i === 4 ? 'rgba(79,209,139,.22)' : 'rgba(79,209,139,.1)'; g.fillRect(A.x0, A.Y(9), A.x1 - A.x0, A.Y(3) - A.Y(9)); g.restore();
      txt(g, 'indice terapeutic', A.X(13.6), A.Y(6), 18, C.gs);
      plot(g, A, f, 0, 15, { col: K.drug, w: 6, n: 400 });
      let hm = 0, vm = 0; for (let h = 0; h < 5; h += 0.02) if (f(h) > vm) { vm = f(h); hm = h; }
      ell(g, A.X(hm), A.Y(vm), 16, 16, 'rgba(255,107,94,.25)', { ow: 4, sc: C.key }); txt(g, 'vârf (peak)', A.X(hm) + 30, A.Y(vm) - 10, 19, C.key, { align: 'left' });
      ell(g, A.X(4.98), A.Y(f(4.98)), 16, 16, 'rgba(176,124,255,.25)', { ow: 4, sc: K.inh }); txt(g, 'minim (trough)', A.X(5.2), A.Y(f(4.98)) + 30, 19, '#d6b8ff', { align: 'left' });
      arr(g, A.X(0), A.y1 + 40, A.X(0), A.y1 + 8, C.cream, 4); arr(g, A.X(5), A.y1 + 40, A.X(5), A.y1 + 8, C.cream, 4); arr(g, A.X(10), A.y1 + 40, A.X(10), A.y1 + 8, C.cream, 4);
    },
  };
}

/* =================================================== CAZUL 2: BIOECHIVALENȚA */
export function bioeq() {
  const fo = (h) => 8 * (Math.exp(-h / 4) - Math.exp(-h / 0.8)) / 0.6; const fg = (h) => 7.6 * (Math.exp(-h / 4.2) - Math.exp(-h / 0.95)) / 0.58;
  return {
    home: HOME, anchors: [[700, 80], [170, 130], [330, 560], [420, 420], [60, 650]],
    draw(g, t, b) {
      bg(g);
      const A = axes(g, 20, 40, 660, 560, { xmax: 14, ymax: 10, xt: [], yt: [], xl: 'timp', yl: 'Cp' });
      g.save(); g.fillStyle = b.i === 3 ? 'rgba(255,160,64,.42)' : 'rgba(255,160,64,.18)'; g.beginPath(); g.moveTo(A.X(0), A.Y(0)); for (let h = 0; h <= 14; h += 0.1) g.lineTo(A.X(h), A.Y(fo(h))); g.lineTo(A.X(14), A.Y(0)); g.fill(); g.restore();
      plot(g, A, fo, 0, 14, { col: C.cream, w: 6 }); plot(g, A, fg, 0, 14, { col: K.drug, w: 5, dash: [12, 8] });
      let hm = 0, vm = 0; for (let h = 0; h < 8; h += 0.02) if (fo(h) > vm) { vm = fo(h); hm = h; }
      dline(g, A.x0, A.Y(vm), A.X(hm), A.Y(vm), b.i === 1 ? C.hi : C.dim, b.i === 1 ? 4 : 3); txt(g, 'Cmax', A.x0 + 40, A.Y(vm) - 18, 22, b.i === 1 || b.i < 0 ? C.hi : C.dim);
      dline(g, A.X(hm), A.Y(vm), A.X(hm), A.y1, b.i === 2 ? C.hi : C.dim, b.i === 2 ? 4 : 3); txt(g, 'Tmax', A.X(hm) + 10, A.y1 - 26, 22, b.i === 2 || b.i < 0 ? C.hi : C.dim, { align: 'left' });
      txt(g, 'AUC', A.X(5), A.Y(2.2), 26, b.i === 3 || b.i < 0 ? C.hi : C.dim);
      box(g, 700, 40, 280, 560, b.i === 0);
      icon(g, 'pill', 840, 140, 0.9); txt(g, 'original', 840, 200, 21, C.cream);
      txt(g, 'vs.', 840, 270, 24, C.hi);
      icon(g, 'pill', 840, 350, 0.9, { col: K.drug }); txt(g, 'generic', 840, 410, 21, K.drug);
      txt(g, 'alprazolam', 840, 490, 20, C.cream, { w: 700 }); txt(g, 'aceeași substanță', 840, 530, 17, C.dim, { w: 700 });
      // intervalul de încredere 90%
      box(g, 20, 630, 960, 280, b.i === 4);
      txt(g, 'IC 90% al raportului generic / referință (AUC și Cmax)', 500, 665, 20, C.hi, { maxW: 920 });
      const X = (p) => 80 + (p - 70) / 70 * 840;
      g.save(); g.fillStyle = 'rgba(79,209,139,.25)'; g.fillRect(X(80), 720, X(125) - X(80), 90); g.restore();
      g.save(); g.strokeStyle = C.cream; g.lineWidth = 4; g.beginPath(); g.moveTo(X(70), 810); g.lineTo(X(140), 810); g.stroke(); g.restore();
      [70, 80, 100, 125, 140].forEach((p) => { txt(g, `${p}%`, X(p), 840, 18, p === 80 || p === 125 ? C.gs : C.dim); });
      dline(g, X(80), 715, X(80), 812, C.gs, 4, []); dline(g, X(125), 715, X(125), 812, C.gs, 4, []);
      g.save(); g.strokeStyle = C.hi; g.lineWidth = 6; g.beginPath(); g.moveTo(X(91), 765); g.lineTo(X(108), 765); g.moveTo(X(91), 748); g.lineTo(X(91), 782); g.moveTo(X(108), 748); g.lineTo(X(108), 782); g.stroke(); g.restore();
      check(g, X(118), 765, 14, C.gs);
      txt(g, 'interval terapeutic îngust → limite mai stricte', 500, 885, 18, C.cream, { w: 700 });
    },
  };
}

/* =================================================== CAZUL 3: LEVOTIROXINĂ + CALCIU (anim) */
function tri(g, x, y, r, col = '#3f7fe0', a = 1) { g.save(); g.globalAlpha = clamp(a); const p = new Path2D(); p.moveTo(x, y - r); p.lineTo(x + r * 0.9, y + r * 0.7); p.lineTo(x - r * 0.9, y + r * 0.7); p.closePath(); paint(g, p, col, null, null, [x - r, y - r, 2 * r, 2 * r], OUT, 3.5); g.restore(); }
export function levo() {
  const PAN = [20, 510];
  return {
    home: HOME, anchors: [[50, 70], [540, 70], [40, 620], [520, 620]],
    phase: (i) => ['levotiroxina singură se absoarbe', 'Ca²⁺ o leagă → absorbție ↓', 'pe stomacul gol', 'la distanță de 2 ore'][i] || '',
    draw(g, t, b) {
      bg(g);
      PAN.forEach((x0, p) => {
        const on = b.i === p; const lv = live(b, p); const a = lv ? 1 : 0.45;
        hiBox(g, x0, 30, 470, 540, on);
        g.save(); g.globalAlpha = a;
        rbox(g, x0, 30, 470, 230, '#3a2418', 20, 5);
        for (let k = 0; k < 7; k++) { const x = x0 + 8 + k * 65; rbox(g, x, 270, 60, 130, '#f0a6a0', 12, 4); ell(g, x + 30, 350, 12, 12, '#d27c78', { ow: 2 }); }
        rbox(g, x0, 410, 470, 150, '#7a1f2c', 20, 5);
        txt(g, p ? 'levotiroxină + calciu simultan' : 'levotiroxină singură', x0 + 235, 92, 20, C.cream);
        for (let k = 0; k < 4; k++) {
          const x = x0 + 80 + k * 105; const u = lv ? L(t, 3.4, k / 4) : 0.4;
          if (!p) tri(g, x, lerp(140, 480, ease(u)), 18);
          else if (k === 1) tri(g, x, lerp(140, 480, ease(u)), 18);
          else { const y = u < 0.5 ? lerp(140, 240, ease(u * 2)) : lerp(240, 140, ease((u - 0.5) * 2)); tri(g, x, y, 18); dot(g, x + 20, y - 14, 12, C.gs, { ow: 3 }); txt(g, 'Ca', x + 20, y - 14, 10, OUT, { stroke: false }); }
        }
        if (p) { cross(g, x0 + 185, 268, 14, C.key); cross(g, x0 + 395, 268, 14, C.key); }
        g.restore();
        txt(g, p ? 'absorbție ↓ → efect ↓' : 'se absoarbe', x0 + 235, 530, 20, p ? '#ffb3ab' : C.gs, { alpha: a });
      });
      // consilierea
      box(g, 20, 600, 470, 310, b.i === 2); box(g, 510, 600, 470, 310, b.i === 3);
      ell(g, 120, 740, 62, 62, '#fbf3e2', { ow: 5 }); g.save(); g.strokeStyle = OUT; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(120, 740); g.lineTo(120, 700); g.moveTo(120, 740); g.lineTo(145, 755); g.stroke(); g.restore();
      txt(g, 'stomacul gol', 330, 680, 22, C.hi); txt(g, '≥ 30 min înainte\nde micul dejun', 330, 770, 20, C.cream, { w: 700 });
      icon(g, 'pill', 600, 700, 0.6, { col: '#3f7fe0' }); txt(g, '≥ 2 h', 745, 700, 30, C.hi); icon(g, 'pill', 890, 700, 0.6, { col: C.gs });
      arr(g, 640, 740, 850, 740, C.cream, 4); arr(g, 850, 740, 640, 740, C.cream, 4);
      txt(g, 'de alte medicamente / suplimente\nmai ales cu Al, Fe, Ca', 745, 830, 19, C.cream, { w: 700 });
    },
  };
}

/* =================================================== CAZUL 4: LEVODOPA + CARBIDOPA, BHE (anim) */
export function bhe() {
  const BY = 430;
  const bounceUp = (u, y0, ym) => (u < 0.5 ? lerp(y0, ym, ease(u * 2)) : lerp(ym, y0, ease((u - 0.5) * 2)));
  return {
    home: HOME, anchors: [[40, 860], [430, 280], [440, 770], [700, 640], [920, 120]],
    phase: (i) => ['levodopa + carbidopa', 'levodopa trece BHE', 'dopamina nu trece BHE', 'carbidopa nu trece BHE', 'efectul asocierii'][i] || '',
    draw(g, t, b) {
      bg(g);
      rbox(g, 20, 30, 960, BY - 60, '#2e2440', 24, 5); txt(g, 'SNC (creierul)', 140, 110, 22, '#d6b8ff');
      rbox(g, 20, BY + 40, 960, 460, '#3a1f26', 24, 5); txt(g, 'periferie', 110, BY + 80, 22, '#ffb3ab');
      // BHE
      for (let k = 0; k < 16; k++) rbox(g, 20 + k * 60, BY - 22, 58, 44, '#e9c79a', 10, 3);
      txt(g, 'bariera hemato-encefalică (BHE)', 500, BY, 19, OUT, { stroke: false });
      icon(g, 'brain', 820, 190, 1.4, {}); if (b.i === 1 || b.i === 4 || b.i < 0) glowRing(g, 820, 190, 90, 70, 0, 0.6 + 0.4 * Math.sin(t * 4), C.hi, 4);
      // DOPA-decarboxilaza în SNC: levodopa → dopamina
      pac(g, 560, 200, 34, C.gq, t * 5); txt(g, 'DOPA-decarboxilază', 560, 260, 16, C.gq);
      const u1 = live(b, 1) || b.i === 4 ? L(t, 4) : 0.0;
      if (u1 > 0) {
        const x = u1 < 0.45 ? 400 : u1 < 0.7 ? lerp(400, 560, ease((u1 - 0.45) / 0.25)) : lerp(560, 760, ease((u1 - 0.7) / 0.3));
        const y = u1 < 0.45 ? lerp(700, 200, ease(u1 / 0.45)) : 200;
        mol(g, x, y, u1 < 0.65 ? 'L' : 'D', 22, { col: u1 < 0.65 ? C.gs : K.ion });
      }
      // periferie: DDC blocată de carbidopa
      pac(g, 300, 760, 34, b.i >= 3 || b.i < 0 ? K.grey : C.gq, b.i >= 3 || b.i < 0 ? 0 : t * 5); txt(g, 'DOPA-decarboxilază', 300, 820, 16, C.dim);
      if (b.i >= 3 || b.i < 0) { rbox(g, 270, 696, 60, 30, K.inh, 8, 3); txt(g, 'C', 300, 711, 18, OUT, { stroke: false }); cross(g, 350, 712, 12, C.key); }
      // levodopa și carbidopa intră
      mol(g, 120, 640, 'L', 22, { col: C.gs }); txt(g, 'levodopa', 120, 690, 17, C.gs);
      const lv3 = live(b, 3) || b.i === 4; const u3 = lv3 ? L(t, 3) : 0.1;
      const cy = bounceUp(u3, 760, BY + 50); rbox(g, 680, cy - 16, 44, 32, K.inh, 8, 3); txt(g, 'C', 702, cy, 18, OUT, { stroke: false }); txt(g, 'carbidopa', 702, 820, 17, '#d6b8ff');
      if (lv3) cross(g, 702, BY + 30, 14, C.key, 0.9);
      // dopamina periferică nu trece
      const lv2 = live(b, 2); const u2 = lv2 ? L(t, 3) : 0.1;
      mol(g, 520, bounceUp(u2, 760, BY + 52), 'D', 22, { col: K.ion }); txt(g, 'dopamină', 520, 820, 17, K.ion); if (lv2) cross(g, 520, BY + 30, 14, C.key, 0.9);
      // rezultat
      const a4 = b.i === 4 || b.i < 0 ? 1 : 0.45;
      panel(g, 760, 520, 210, 290, { stroke: b.i === 4 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 4 ? 5 : 3 });
      txt(g, 'levodopa\nla BHE ↑', 865, 590, 19, C.gs, { alpha: a4 }); txt(g, 'efecte periferice\nale dopaminei ↓', 865, 720, 17, C.cream, { alpha: a4, w: 700 });
    },
  };
}

/* =================================================== DISTRIBUȚIA: FACTORI + Vd */
export function distf() {
  return {
    home: HOME, anchors: [[60, 95], [40, 300], [360, 300], [680, 300], [40, 690]],
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 960, 230, b.i === 0);
      rbox(g, 60, 130, 880, 70, '#b5303f', 34, 5); txt(g, 'circulație', 160, 165, 19, '#ffd9dd');
      for (let k = 0; k < 4; k++) { const u = live(b, 0) ? L(t, 2.6, k / 4) : 0.5; const x = 420 + k * 120; dot(g, x, lerp(160, 60, ease(u)), 10, K.drug, { ow: 3, alpha: 1 - u * 0.6 }); }
      arr(g, 820, 128, 820, 60, C.hi, 6); txt(g, 'țesuturi', 890, 62, 19, C.cream);
      const T = [['fluxul sanguin\nîn țesuturi', 0], ['dimensiunea și\npolaritatea moleculei', 1], ['legarea de\nproteinele plasmatice', 2]];
      T.forEach(([l, k]) => {
        const x = 20 + k * 325; box(g, x, 280, 310, 380, b.i === k + 1);
        if (k === 0) { icon(g, 'brain', x + 80, 400, 0.7); icon(g, 'kidney', x + 230, 400, 0.7); liver(g, x + 155, 510, 0.8); }
        if (k === 1) { mol(g, x + 90, 430, '', 18); ell(g, x + 210, 430, 60, 46, '#9fd3f0', { ow: 5 }); txt(g, 'mică', x + 90, 490, 17, C.dim); txt(g, 'mare, polară', x + 210, 500, 17, C.dim); }
        if (k === 2) { ell(g, x + 155, 440, 90, 55, '#ffe08a', { ow: 5 }); txt(g, 'albumină', x + 155, 440, 19, OUT, { stroke: false }); [0, 2, 4].forEach((a) => mol(g, x + 155 + Math.cos(a) * 90, 440 + Math.sin(a) * 55, '', 13)); }
        txt(g, l, x + 155, 600, 19, C.cream, { w: 700 });
      });
      box(g, 20, 680, 960, 230, b.i === 4);
      txt(g, 'volumul aparent de distribuție (Vd)', 500, 720, 24, C.hi);
      txt(g, 'măsură a lărgimii distribuției', 500, 775, 21, C.cream, { w: 700 });
      icon(g, 'liver', 360, 850, 0.6); icon(g, 'kidney', 460, 850, 0.6); arr(g, 520, 850, 580, 850, C.cream, 5); txt(g, 'proteine plasmatice', 700, 850, 19, '#ffe08a');
    },
  };
}

/* =================================================== CAZUL 5: Vd (A = 5 L, B = 100 L) */
export function vd() {
  return {
    home: HOME, anchors: [[60, 95], [60, 150], [60, 300], [520, 300], [60, 810]],
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 960, 110, b.i === 0);
      txt(g, '100 mg i.v. · distribuție rapidă · eliminare neglijabilă', 500, 85, 21, C.cream, { w: 700 });
      box(g, 20, 150, 960, 120, b.i === 1); frac(g, 560, 210, 'cantitatea administrată i.v. (Q, mg)', 'concentrația plasmatică inițială (c0, mg/L)', 'Vd =', C.hi, 440, false);
      [[0, 20, 'A', '20 mg/L', '100 / 20 = 5 L', 'în sânge'], [1, 510, 'B', '1 mg/L', '100 / 1 = 100 L', 'în țesuturi']].forEach(([k, x0, n, c, v, w]) => {
        const on = b.i === k + 2; box(g, x0, 285, 470, 510, on);
        txt(g, `medicamentul ${n} · c0 = ${c}`, x0 + 235, 320, 20, C.hi);
        person(g, x0 + 130, 560, 0.85, '#5a3a32');
        g.save(); g.strokeStyle = C.blood; g.lineWidth = 6; g.beginPath(); g.moveTo(x0 + 130, 440); g.lineTo(x0 + 130, 760); g.moveTo(x0 + 80, 500); g.lineTo(x0 + 180, 500); g.stroke(); g.restore();
        for (let j = 0; j < 14; j++) { const px = k ? x0 + 85 + (j * 37) % 95 : x0 + 130 + ((j % 3) - 1) * 3; const py = k ? 440 + (j * 53) % 300 : 450 + j * 22; dot(g, k ? px : (j % 2 ? px : x0 + 90 + (j * 7) % 80), k ? py : (j % 2 ? py : 500), 7, '#3f7fe0', { ow: 2 }); }
        txt(g, `Vd = ${v}`, x0 + 345, 520, 22, C.hi, { maxW: 240 }); txt(g, w, x0 + 345, 590, 24, C.cream);
        txt(g, k ? 'Cp mică' : 'Cp mare', x0 + 345, 650, 20, C.dim, { w: 700 });
      });
      box(g, 20, 810, 960, 100, b.i === 4);
      txt(g, 'Vd mai mare → mai mult în țesuturi, mai puțin în sânge', 500, 860, 22, C.cream);
    },
  };
}

/* =================================================== CAZUL 6: SUBSTANȚA LIPOFILĂ ȘI ȚESUTUL ADIPOS (anim) */
export function fat() {
  const FC = [[150, 560], [270, 520], [390, 570], [210, 680], [330, 690], [450, 670], [100, 700], [500, 560], [560, 690]];
  return {
    home: HOME, anchors: [[230, 110], [300, 470], [620, 470], [700, 870]],
    phase: (i) => ['pacient obez, substanță lipofilă', 'distribuție în adipos → doză ↑', 'slăbire → redistribuire', 'etapa: distribuția'][i] || '',
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 690, 160, b.i === 0);
      person(g, 110, 140, 0.32, '#5a3a32'); txt(g, 'IMC 37 · tratament cronic\ncu o substanță lipofilă', 420, 110, 21, C.cream, { w: 700 });
      rbox(g, 20, 220, 690, 120, '#7a1f2c', 40, 5); txt(g, 'sânge', 80, 250, 18, '#ffc9cf');
      const p2 = b.i === 1 ? clamp(b.bt / (b.bd * 0.8)) : b.i < 0 ? 1 : b.i > 1 ? 1 : 0;
      const p3 = b.i === 2 ? clamp(b.bt / (b.bd * 0.8)) : b.i > 2 ? 1 : 0;
      const shrink = 1 - 0.45 * ease(p3);
      FC.forEach(([x, y]) => { ell(g, x, y, 58 * shrink, 52 * shrink, '#fff6dc', { ow: 4 }); ell(g, x + 36 * shrink, y - 26 * shrink, 8, 4, '#4b3a8a', { ow: 1.5 }); });
      txt(g, 'țesut adipos', 360, 800, 22, C.cream);
      // moleculele
      const N = 14; const inFat = Math.round(N * 0.8 * ease(p2) * (1 - ease(p3)));
      for (let k = 0; k < N; k++) {
        const [fx, fy] = FC[k % FC.length]; const bx = 90 + (k * 43) % 600, by = 270 + (k % 3) * 22;
        const inF = k < inFat; const x = inF ? fx + ((k % 3) - 1) * 16 * shrink : bx; const y = inF ? fy + ((k % 2) * 2 - 1) * 12 * shrink : by;
        dot(g, x, y, 9, K.drug, { ow: 2.5 });
      }
      if (b.i === 1) arr(g, 360, 350, 360, 470, C.hi, 7);
      if (b.i === 2) arr(g, 600, 470, 600, 350, C.key, 7);
      // nivelul în sânge
      const lvl = b.i === 0 ? 0.55 : b.i === 1 ? lerp(0.55, 0.3, ease(p2)) : b.i === 2 ? lerp(0.3, 0.92, ease(p3)) : b.i === 3 ? 0.92 : 0.3;
      box(g, 730, 30, 250, 760, false);
      txt(g, 'în sânge', 855, 95, 20, C.cream);
      const y0 = 110, hh = 600; const bar = new Path2D(); bar.roundRect(905, y0 + hh * (1 - lvl), 55, hh * lvl, 10);
      paint(g, bar, lvl > 0.8 ? C.key : lvl < 0.4 ? C.gi : C.gs, null, null, [905, y0, 55, hh], OUT, 4);
      dline(g, 750, y0 + hh * 0.2, 960, y0 + hh * 0.2, C.key); txt(g, 'prag toxic', 820, y0 + hh * 0.2 - 16, 16, C.key);
      dline(g, 750, y0 + hh * 0.6, 960, y0 + hh * 0.6, C.gi); txt(g, 'prag minim\neficace', 820, y0 + hh * 0.6 + 28, 15, C.gi);
      txt(g, lvl > 0.8 ? 'supradozare' : lvl < 0.4 ? 'efect slab → doză ↑' : '', 855, 760, 17, lvl > 0.8 ? C.key : C.gi);
      box(g, 20, 830, 960, 80, b.i === 3);
      pill(g, 500, 870, 380, 54, K.stage[1], 'etapa: DISTRIBUȚIA (Vd ↑)', { size: 21 });
    },
  };
}

/* =================================================== PROTEINELE DE LEGARE */
export function proteins() {
  const P = [[230, 'albumină', '#ffe08a'], [500, 'SHBG', '#9fd3f0'], [770, 'TBG', '#d6b8ff']];
  return {
    home: HOME, anchors: [[60, 100], [40, 390], [40, 640], [520, 390]],
    draw(g, t, b) {
      bg(g);
      box(g, 20, 30, 960, 330, b.i === 0);
      P.forEach(([x, l, c]) => { ell(g, x, 170, 100, 62, c, { ow: 5 }); txt(g, l, x, 170, 21, OUT, { stroke: false }); [0.4, 2.4, 4.4].forEach((a) => mol(g, x + Math.cos(a) * 100, 170 + Math.sin(a) * 62, '', 13)); });
      for (let k = 0; k < 4; k++) dot(g, 300 + k * 140, 290 + 8 * Math.sin(t * 2 + k), 11, K.drug, { ow: 3 });
      txt(g, 'doar fracția liberă realizează efectul', 500, 330, 19, C.gs);
      txt(g, 'globuline', 635, 70, 18, C.dim, { w: 700 });
      // scădere
      box(g, 20, 380, 470, 530, b.i === 1 || b.i === 2);
      txt(g, 'proteine ↓ → fracția liberă ↑', 255, 420, 22, C.hi);
      ell(g, 120, 500, 50, 32, '#ffe08a', { ow: 4, alpha: 0.6 }); for (let k = 0; k < 5; k++) dot(g, 220 + k * 50, 490 + (k % 2) * 30, 10, K.drug, { ow: 3 });
      const CA = [['producție / aport ↓', 'ciroză, insuficiență\nhepatică, cașexie', 'liver'], ['eliminare ↑', 'boala cronică renală', 'kidney'], ['substanțe', 'androgenii ↓ SHBG', 'pill']];
      CA.forEach(([h, d, ic], k) => { const y = 600 + k * 100; g.save(); g.globalAlpha = b.i === 2 || b.i < 0 ? 1 : 0.6; icon(g, ic, 80, y, 0.55); g.restore(); txt(g, h, 140, y - 18, 18, C.hi, { align: 'left' }); txt(g, d, 140, y + 20, 16, C.cream, { align: 'left', w: 700 }); });
      // creștere
      box(g, 510, 380, 470, 530, b.i === 3);
      txt(g, 'proteine ↑ → fracția liberă ↓', 745, 420, 22, C.hi);
      [[620, 520, '#9fd3f0', 'SHBG'], [860, 520, '#d6b8ff', 'TBG']].forEach(([x, y, c, l]) => { ell(g, x, y, 80, 50, c, { ow: 5 }); txt(g, l, x, y, 19, OUT, { stroke: false }); [0.3, 1.6, 2.9, 4.2, 5.5].forEach((a) => mol(g, x + Math.cos(a) * 80, y + Math.sin(a) * 50, '', 12)); });
      icon(g, 'pill', 620, 680, 0.6, { col: '#ff8ad0' }); txt(g, 'estrogenii', 700, 680, 20, '#ff8ad0', { align: 'left' });
      txt(g, '↑ SHBG și TBG', 745, 750, 21, C.cream);
      txt(g, 'testosteron, tiroxină liberă ↓', 745, 820, 19, C.cream, { w: 700 });
      txt(g, '(în LP scrie „↑” · vezi Capcana)', 745, 870, 15, C.dim, { w: 700 });
    },
  };
}

/* =================================================== CAZUL 7: G DISLOCAT DE PE PROTEINE DE X (anim) */
function sq(g, x, y, r = 13, col = '#3f3fd6') { const p = new Path2D(); p.rect(x - r, y - r, 2 * r, 2 * r); paint(g, p, col, null, null, [x - r, y - r, 2 * r, 2 * r], OUT, 3); }
export function displace() {
  const PR = [[170, 160], [380, 120], [600, 170], [820, 130], [260, 360], [500, 380], [740, 360]];
  return {
    home: HOME, anchors: [[40, 590], [120, 90], [60, 470], [600, 600]],
    phase: (i) => ['enunțul', 'G legat de proteine', 'X dislocă G', 'G liber ↑ → hipoglicemie'][i] || '',
    draw(g, t, b) {
      bg(g);
      rbox(g, 20, 30, 960, 520, '#3a1f26', 24, 5); txt(g, 'plasmă', 70, 60, 18, '#ffb3ab');
      const px = b.i === 2 ? clamp(b.bt / (b.bd * 0.75)) : b.i === 3 || b.i < 0 ? 1 : 0;
      PR.forEach(([x, y], k) => {
        ell(g, x, y, 36, 36, '#d93b4a', { ow: 4 });
        const disp = k < 5 ? ease(clamp(px * 1.4 - k * 0.08)) : 0;
        const gx = lerp(x + 40, x + 40 + 70 * ((k % 2) * 2 - 1), disp), gy = lerp(y - 20, y + 75, disp);
        sq(g, gx, gy);
        if (k < 5 && disp > 0.05) { const tx = lerp(x - 120, x - 38, disp), ty = lerp(y + 70, y + 14, disp); tri(g, tx, ty, 18, '#ff9d3c'); }
      });
      for (let k = 0; k < 2; k++) sq(g, 300 + k * 330, 470);
      if (b.i === 2) arr(g, 60, 500, 140, 420, '#ff9d3c', 6);
      sq(g, 760, 500, 12); txt(g, 'G', 790, 500, 18, '#9fb4ff', { align: 'left' }); tri(g, 850, 500, 15, '#ff9d3c'); txt(g, 'X', 875, 500, 18, '#ff9d3c', { align: 'left' }); ell(g, 925, 500, 14, 14, '#d93b4a', { ow: 3 }); txt(g, 'proteină', 925, 530, 14, '#ffb3ab');
      // efectul
      box(g, 20, 580, 960, 330, b.i === 3 || b.i === 0);
      icon(g, 'pancreas', 140, 700, 1.1); txt(g, 'pancreas', 140, 770, 18, C.cream);
      const ins = b.i === 3 || b.i < 0 ? 1 : 0.3;
      for (let k = 0; k < 6; k++) { const u = L(t, 2.4, k / 6); dot(g, 230 + u * 220, 690 + Math.sin(k * 2) * 30, 8, '#7fe8ff', { ow: 2.5, alpha: ins * (1 - u * 0.5) }); }
      txt(g, 'insulină ↑', 340, 760, 19, '#7fe8ff', { alpha: ins });
      const gl = lerp(0.65, 0.2, b.i === 3 ? ease(clamp(b.bt / (b.bd * 0.8))) : b.i < 0 ? 1 : 0);
      rbox(g, 520, 620, 70, 240, 'rgba(255,236,200,.08)', 10, 4); const gb = new Path2D(); gb.roundRect(524, 856 - 232 * gl, 62, 232 * gl, 8); paint(g, gb, gl < 0.35 ? C.key : C.gs, null, null, [524, 620, 62, 240], OUT, 3);
      txt(g, 'glicemia', 555, 885, 17, C.cream);
      txt(g, 'hipoglicemie', 790, 640, 23, C.key, { alpha: gl < 0.35 ? 1 : 0.4 });
      txt(g, 'tahicardie · foame\ntranspirații · paloare\ntremurături', 790, 760, 18, C.cream, { w: 700, alpha: gl < 0.35 ? 1 : 0.5 });
    },
  };
}
