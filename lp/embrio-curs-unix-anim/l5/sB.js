// Partea B: sistemul genital — celulele germinale, gonada (testicul / ovar), ductele Wolff + Müller, căile, organele genitale externe.
import {
  W, H, cam, HOME, lbl, C, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, germ, ell, arr, ring, lead,
  OUT, clamp, lerp, ease, paint, blob, bb, smooth, REDUCED,
} from './ek.js';

/* =================================================== CELULELE GERMINALE: drumul (secțiune sagitală) */
export function germCells() {
  const RID = [600, 182];
  const PATH = [[640, 742], [690, 640], [640, 520], [610, 452], [600, 380], [600, 280], [600, 196]];
  const EPI = [[190, 300], [190, 360], [210, 470], [330, 610], [560, 735]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[110, 250], [700, 780], [680, 330], [470, 150]],
    phase: (i) => ['epiblast', 'până în S3: sacul vitelin', 'S4: mezenterul dorsal', 'S5 ajung · S6 intră'][i] || '',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3);
      // peretele dorsal + creasta gonadală
      tube(g, [[120, 120], [940, 120]], 44, C.wall, { ow: 6 }); txt(g, 'peretele dorsal', 420, 76, 19, '#e9d6bd');
      const rg = 0.35 + 0.65 * p3; const glow = on(b, 3) ? 0.5 + 0.5 * Math.sin(t * 4) : 0;
      ell(g, RID[0], RID[1], 100, 30, C.gonad, { ow: 5, alpha: rg });
      if (glow) ring(g, RID[0], RID[1], 120, 46, 1);
      txt(g, 'creasta gonadală', 790, 196, 20, '#d9c6ff');
      // mezenterul dorsal
      g.save(); g.fillStyle = 'rgba(233,214,189,.22)'; g.strokeStyle = 'rgba(233,214,189,.55)'; g.lineWidth = 3; g.beginPath(); g.moveTo(560, 142); g.lineTo(640, 142); g.lineTo(650, 400); g.lineTo(550, 400); g.closePath(); g.fill(); g.stroke(); g.restore();
      txt(g, 'mezenterul\ndorsal', 740, 300, 19, '#e9d6bd');
      // intestinul posterior + cloaca
      tube(g, [[260, 430], [600, 430], [850, 440]], 52, C.sinus, { ow: 6 }); ell(g, 880, 450, 52, 48, C.sinus, { ow: 6 });
      txt(g, 'intestinul posterior', 400, 372, 19, '#ffe9a8'); txt(g, 'cloaca', 880, 450, 18, OUT, { stroke: false });
      // sacul vitelin + alantoida
      tube(g, [[470, 456], [470, 520]], 30, C.sinus, { ow: 6 });
      ell(g, 470, 660, 150, 145, '#f7d77e', { ow: 6, shade: '#e4b84d', light: '#fff2c4' });
      txt(g, 'sacul vitelin', 440, 660, 21, OUT, { stroke: false });
      tube(g, [[880, 495], [820, 640], [700, 800], [600, 880]], 26, '#e9c46a', { ow: 6 }); txt(g, 'alantoida', 820, 760, 19, '#ffe9a8');
      // 1 · epiblast → creasta primitivă (gastrulație)
      g.save(); g.globalAlpha = 0.4 + 0.6 * (b.i < 0 || b.i === 0 ? 1 : 0.5);
      ell(g, 190, 250, 90, 46, '#bfa4ff', { ow: 5 }); tube(g, [[190, 214], [190, 286]], 8, '#6a3fb0', { ow: 3 });
      g.restore(); txt(g, 'epiblast →\ncreasta primitivă', 190, 180, 18, '#d9c6ff');
      if (b.i < 0 || b.i === 0) { const u = b.i === 0 ? clamp(b.bt / (b.bd * 0.8)) : loopT(t, 3); for (let j = 0; j < 4; j++) { const [x, y] = at(curve(EPI), clamp(u - j * 0.08)); germ(g, x, y, 0.8); } tube(g, EPI, 4, '#ffb347', { ow: 0, dash: [8, 8], alpha: 0.6 }); }
      // 2 · în peretele sacului vitelin, printre celulele endodermului, aproape de alantoidă
      const cluster = [[604, 742], [632, 760], [656, 732], [620, 718], [648, 704]];
      const P2 = curve(PATH);
      cluster.forEach(([x, y], j) => {
        let X = x, Y = y, a = b.i < 0 ? 1 : b.i >= 1 ? 1 : 0;
        const mv = Math.max(p2 * 0.78, p3 > 0 ? 0.78 + 0.22 * p3 : 0);
        if (mv > 0) { const u = clamp(mv - j * 0.035); const q = at(P2, u); X = lerp(x, q[0] + (j - 2) * 9, ease(clamp(u * 6))); Y = lerp(y, q[1], ease(clamp(u * 6))); }
        if (a > 0) germ(g, X, Y, 1, a);
      });
      if (on(b, 1)) ring(g, 630, 735, 70, 50, ease(b.bt * 1.4));
      if (p2 > 0 || p3 > 0) tube(g, PATH, 4, '#ffb347', { ow: 0, dash: [10, 8], alpha: 0.7 });
      if (on(b, 3) && p3 > 0.7) txt(g, 'rol inductiv: fără ele\ngonada nu se dezvoltă', 250, 820, 20, C.hi);
    },
  };
}

/* ---------- desene comune gonadă ---------- */
function oogonium(g, x, y, s = 1, foll = 1) {
  if (foll > 0) for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2; ell(g, x + Math.cos(a) * 24 * s, y + Math.sin(a) * 24 * s, 12 * s, 5 * s, '#f6d8b8', { rot: a + Math.PI / 2, ow: 2.5, alpha: foll }); }
  ell(g, x, y, 17 * s, 17 * s, C.germ, { ow: 3 }); ell(g, x, y, 7 * s, 7 * s, '#7a3fb0', { ow: 2 }); dot(g, x + 1.5 * s, y - 1.5 * s, 2.4 * s, '#2a1534', { ow: 0 });
}

/* =================================================== GONADA INDIFERENTĂ → SRY → TESTICUL */
export function testis() {
  const G = [640, 420], RX = 280, RY = 320;
  const N = 7; const cords = Array.from({ length: N }, (_, k) => G[1] - 230 + k * 76);
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[G[0] + 150, 150], [180, 300], [G[0], G[1] + 40], [G[0] + RX - 36, G[1] + 100]],
    phase: (i) => ['gonada indiferentă', 'XY: SRY → TDF', 'cordonii medulari', 'albuginee · Sertoli · Leydig'][i] || '',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3);
      const shape = new Path2D(); shape.ellipse(G[0], G[1], RX, RY, 0, 0, Math.PI * 2);
      paint(g, shape, '#cdb8f2', '#a98ae6', '#efe6ff', bb(G[0], G[1], RX, RY), OUT, 6);
      // epiteliul de suprafață (celule cubice)
      for (let k = 0; k < 46; k++) { const a = k / 46 * Math.PI * 2; dot(g, G[0] + Math.cos(a) * (RX - 10), G[1] + Math.sin(a) * (RY - 10), 9, '#8b6fd6', { ow: 2 }); }
      // tunica albuginee: bandă groasă sub epiteliu (separă cordonii de epiteliul de suprafață)
      if (p3 > 0) { g.save(); g.globalAlpha = p3; g.strokeStyle = OUT; g.lineWidth = 30; g.beginPath(); g.ellipse(G[0], G[1], RX - 38, RY - 38, 0, 0, 7); g.stroke(); g.strokeStyle = '#f3ede4'; g.lineWidth = 22; g.stroke(); g.restore(); }
      // rete testis la hil (stânga = medial, spre mezonefros)
      const HX = G[0] - RX + 70;
      // cordonii: 0 = cordoni sexuali primitivi din epiteliu; 2 = intră în medulară, potcoavă, se continuă cu rete testis
      cords.forEach((y, k) => {
        const yy = y; const deep = lerp(0.25, 1, p2);
        const outer = [G[0] + Math.sqrt(Math.max(0, 1 - ((yy - G[1]) / RY) ** 2)) * (RX - 20), yy];
        const inner = [lerp(outer[0], HX + 30, deep), yy];
        if (p2 < 0.5) {
          tube(g, [outer, [lerp(outer[0], inner[0], 0.5), yy + 6], inner], 16, C.cord, { ow: 5, u1: Math.max(0.02, p0), alpha: 1 - clamp((p2 - 0.3) / 0.2) });
        }
        if (p2 > 0.3) {
          const a = clamp((p2 - 0.3) / 0.4); const r = 26;
          const L = [HX + 30, yy - r]; const R = [HX + 30, yy + r];
          const far = G[0] + Math.sqrt(Math.max(0, 1 - ((yy - G[1]) / RY) ** 2)) * (RX - 64) * (0.75 + 0.25 * a);
          tube(g, [L, [lerp(HX + 30, far, 0.6), yy - r - 4], [far, yy], [lerp(HX + 30, far, 0.6), yy + r + 4], R], 15, C.cord, { ow: 5, alpha: a });
        }
      });
      // celule germinale în cordoni
      cords.forEach((y, k) => { for (let j = 0; j < 3; j++) germ(g, G[0] + 60 + j * 52 - (k % 2) * 20, y + (p2 > 0.3 ? -26 : 0), 0.55, 0.9); });
      if (p2 > 0.4) { const a = clamp((p2 - 0.4) / 0.4); g.save(); g.globalAlpha = a; for (let k = 0; k < N; k++) tube(g, [[HX + 30, cords[k] - 26], [HX, cords[k] - 10], [HX + 8, cords[k] + 30]], 10, '#5b2a99', { ow: 4 }); tube(g, [[HX - 6, cords[0] - 40], [HX - 10, cords[N - 1] + 40]], 18, '#5b2a99', { ow: 5 }); g.restore(); txt(g, 'rete testis (din gonadă, nu din Wolff)', HX + 150, G[1] - RY - 22, 18, '#d9c6ff', { alpha: a }); }
      if (p0 > 0.5 && p2 < 0.3) txt(g, 'cordonii sexuali\nprimitivi', G[0] + 40, G[1] + RY + 40, 19, '#ffd0c8');
      if (p2 > 0.5) txt(g, 'cordonii testiculari (L4: potcoavă)', G[0] - 80, G[1] + RY + 46, 19, '#ffd0c8');
      if (p3 > 0.4) txt(g, 'tunica albuginee', G[0] + 250, G[1] - RY + 40, 19, '#f3ede4', { alpha: p3 });
      // SRY pe Y → TDF
      const yx = 150, yy0 = 250;
      g.save(); g.globalAlpha = 0.35 + 0.65 * Math.max(p1, b.i < 0 ? 1 : 0);
      tube(g, [[yx - 24, yy0 - 60], [yx - 6, yy0 - 10], [yx, yy0 + 70]], 26, '#7ab8ff', { ow: 5 });
      tube(g, [[yx + 24, yy0 - 60], [yx + 6, yy0 - 10]], 26, '#7ab8ff', { ow: 5 });
      g.restore();
      txt(g, 'Y', yx, yy0 - 100, 34, '#cfe6ff');
      pill(g, yx, yy0 + 30, 64, 28, C.hi, 'SRY', { size: 16, alpha: 0.35 + 0.65 * Math.max(p1, b.i < 0 ? 1 : 0), glow: on(b, 1) ? 1 : 0 });
      if (p1 > 0) { for (let j = 0; j < 7; j++) { const u = loopT(t + j * 0.3, 2.1); dot(g, lerp(yx + 40, G[0] - 140, u), lerp(yy0 + 30, G[1] - 60 + (j - 3) * 30, u), 8, C.hi, { alpha: p1 * Math.sin(u * Math.PI) }); } txt(g, 'TDF', 250, 390, 24, C.hi, { alpha: p1 }); }
      // zoom: Sertoli (în cordon) + Leydig (între cordoni) → testosteron
      if (p3 > 0.2) {
        const a = clamp((p3 - 0.2) / 0.5); const zx = 860, zy = 740;
        g.save(); g.globalAlpha = a;
        ell(g, zx, zy, 120, 120, '#2a1c18', { ow: 5, sc: '#ffe7d6' });
        ell(g, zx - 30, zy - 26, 62, 62, C.cord, { ow: 5 });
        for (let k = 0; k < 6; k++) { const q = k / 6 * Math.PI * 2; ell(g, zx - 30 + Math.cos(q) * 44, zy - 26 + Math.sin(q) * 44, 9, 13, '#f3e6d8', { rot: q, ow: 2 }); }
        germ(g, zx - 54, zy - 50, 0.55); germ(g, zx - 4, zy + 2, 0.55);
        for (let k = 0; k < 3; k++) ell(g, zx + 50 + k * 16, zy + 50 - k * 22, 13, 11, '#ffb15c', { ow: 3 });
        g.restore();
        for (let j = 0; j < 5; j++) { const u = loopT(t + j * 0.4, 2); dot(g, zx + 70 + u * 70, zy + 30 - u * 100 + j * 6, 6, '#ffb15c', { alpha: a * Math.sin(u * Math.PI) }); }
        txt(g, 'Sertoli (în cordon)', zx - 20, zy - 150, 17, '#ffe7d6', { alpha: a });
        txt(g, 'Leydig → testosteron (S8)', zx - 40, zy + 140, 17, '#ffc98a', { alpha: a });
      }
      if (on(b, 0)) ring(g, G[0] + 150, G[1], 150, 260, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== OVARUL */
export function ovary() {
  const G = [610, 390], RX = 270, RY = 290;
  const MED = [[560, 330], [640, 420], [560, 470], [650, 300], [600, 520]];
  const COR = Array.from({ length: 14 }, (_, k) => k / 14 * Math.PI * 2 + 0.2);
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[G[0], G[1] - 40], [G[0] + 170, G[1] - 190], [G[0] + 210, 470], [880, 740]],
    phase: (i) => ['fără Y', 'S7: cordoanele corticale', 'L3: grupuri izolate', 'foliculul primordial'][i] || '',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3);
      const shape = new Path2D(); shape.ellipse(G[0], G[1], RX, RY, 0, 0, Math.PI * 2);
      paint(g, shape, '#cdb8f2', '#a98ae6', '#efe6ff', bb(G[0], G[1], RX, RY), OUT, 6);
      for (let k = 0; k < 44; k++) { const a = k / 44 * Math.PI * 2; dot(g, G[0] + Math.cos(a) * (RX - 10), G[1] + Math.sin(a) * (RY - 10), 9, '#8b6fd6', { ow: 2 }); }
      // medulara: grupuri neregulate cu celule germinale → degenerează, înlocuite de stromă vasculară
      MED.forEach(([x, y], k) => { const a = 1 - clamp(p0 * 1.4 - 0.3); if (a > 0) { ell(g, x, y, 40, 22, C.cord, { rot: k, ow: 4, alpha: a }); germ(g, x, y, 0.5, a); } });
      if (p0 > 0.4) { const a = clamp((p0 - 0.4) / 0.5); g.save(); g.globalAlpha = a; for (let k = 0; k < 5; k++) tube(g, [[G[0] - RX + 10, G[1] - 40 + k * 22], [G[0] - 60, G[1] - 80 + k * 40], [G[0] + 40, G[1] - 30 + k * 26]], 6, '#e0443e', { ow: 3 }); g.restore(); txt(g, 'medulara = stromă vasculară', G[0] - 20, G[1] + 60, 19, '#ffd0c8', { alpha: a }); }
      // corticala: cordoanele corticale cresc din epiteliul de suprafață (S7)
      COR.forEach((a, k) => {
        const ox = G[0] + Math.cos(a) * (RX - 14), oy = G[1] + Math.sin(a) * (RY - 14);
        const ix = G[0] + Math.cos(a) * (RX - 110), iy = G[1] + Math.sin(a) * (RY - 110);
        if (p2 < 0.6) tube(g, [[ox, oy], [ix, iy]], 22, '#e98a78', { ow: 5, u1: Math.max(0.02, p1), alpha: 1 - clamp((p2 - 0.2) / 0.4) });
        if (p2 > 0.2) { const q = clamp((p2 - 0.2) / 0.5); for (let j = 0; j < 2; j++) { const u = 0.35 + j * 0.4; oogonium(g, lerp(ox, ix, u), lerp(oy, iy, u), 0.62, q); } }
        else if (p1 > 0.4) germ(g, lerp(ox, ix, 0.6), lerp(oy, iy, 0.6), 0.5);
      });
      if (p1 > 0.5 && p2 < 0.3) txt(g, 'cordoane corticale', G[0] + 170, G[1] - RY - 20, 19, '#ffd0c8');
      if (p2 > 0.5) txt(g, 'oogonii + celule foliculare', G[0] - 60, G[1] + RY + 34, 19, '#ffe7d6');
      // foliculul primordial (mărit)
      const a3 = p3; const zx = 860, zy = 760;
      if (a3 > 0) { g.save(); g.globalAlpha = a3; ell(g, zx, zy, 118, 118, '#2a1c18', { ow: 5, sc: '#ffe7d6' }); g.restore(); oogonium(g, zx, zy, 2.4 * a3 + 0.01, a3); txt(g, 'oogoniu + 1 strat\nde celule foliculare\nturtite', zx + 45, zy - 150, 17, '#ffe7d6', { alpha: a3 }); }
      // comparația din LP (Y vs. fără Y)
      const rows = [['cordoni medulari', 'DA', 'degenerează'], ['cordoane corticale', 'NU', 'DA'], ['albuginee', 'groasă', 'fără']];
      txt(g, 'TESTICUL', 205, 98, 14, '#cfe0ff'); txt(g, 'OVAR', 290, 98, 14, '#ffd0e6');
      rows.forEach(([n, a, c], k) => { const y = 130 + k * 30; txt(g, n, 150, y, 14, C.cream, { align: 'right', w: 600 }); txt(g, a, 205, y, 14, '#cfe0ff', { w: 700 }); txt(g, c, 290, y, 14, '#ffd0e6', { w: 700 }); });
      if (on(b, 0)) ring(g, G[0], G[1] + 10, 130, 150, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== DUCTELE: stadiul indiferent → decizia hormonală */
export function ducts() {
  const side = [-1, 1]; const X = (s, x) => 500 + s * x;
  const wolff = (s) => [[X(s, 250), 150], [X(s, 250), 400], [X(s, 230), 600], [X(s, 120), 740], [X(s, 30), 806]];
  const mCran = (s) => [[X(s, 330), 140], [X(s, 330), 330], [X(s, 320), 470]];
  const mHor = (s) => [[X(s, 320), 470], [X(s, 230), 540], [X(s, 60), 610]];
  const mCaud = (s) => [[X(s, 60), 610], [X(s, 14), 700], [X(s, 8), 790]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[X(-1, 330), 90], [X(1, 250), 270], [X(-1, 170), 420], [X(1, 170), 600]],
    phase: (i) => ['Müller: 3 porțiuni', 'Wolff', 'XY: AMH + testosteron', 'XX: fără hormoni'][i] || 'stadiul indiferent',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p2 = b.i === 2 ? p(2) : 0, p3 = b.i === 3 ? p(3) : 0;
      const male = p2, fem = p3;
      // sinusul urogenital
      pill(g, 500, 830, 260, 62, C.sinus, 'sinusul urogenital', { size: 20 });
      // gonadele + mezonefrosul
      side.forEach((s) => { ell(g, X(s, 330 - 0) - s * 40, 300, 46, 92, '#f6b49c', { ow: 5, alpha: 0.75 }); ell(g, X(s, 160), 300, 44, 86, C.gonad, { ow: 5 }); });
      txt(g, 'gonadele', 500, 300, 20, '#d9c6ff'); txt(g, 'mezo-\nnefrosul', X(1, 290) + 120, 220, 18, '#ffd6c4');
      // Wolff (albastru)
      side.forEach((s) => tube(g, wolff(s), 20, C.wolff, { ow: 6, alpha: 1 - 0.8 * fem, dash: fem > 0.7 ? [10, 10] : null, glow: male > 0.4 ? male : on(b, 1) ? 0.6 : 0 }));
      // Müller (roz): verticală craniană, orizontală (trece VENTRAL de Wolff), verticală caudală (se unesc)
      const mA = 1 - 0.85 * male;
      side.forEach((s) => {
        tube(g, mCran(s), 18, C.muller, { ow: 6, alpha: male > 0 ? Math.max(mA, 0) : 1, glow: on(b, 0) ? 0.5 : fem * 0.8 });
        tube(g, mHor(s), 18, C.muller, { ow: 6, alpha: mA, glow: fem * 0.8 });
        tube(g, mCaud(s), 18, C.muller, { ow: 6, alpha: mA, glow: fem * 0.8 });
        // ostiumul abdominal (pâlnie)
        const fx = X(s, 330); g.save(); g.globalAlpha = male > 0.5 ? 1 : 1; g.fillStyle = C.muller; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.moveTo(fx - 26, 108); g.lineTo(fx + 26, 108); g.lineTo(fx + 10, 146); g.lineTo(fx - 10, 146); g.closePath(); g.fill(); g.stroke(); g.restore();
      });
      if (male > 0.6) side.forEach((s) => txt(g, 'apendicele\ntesticular', X(s, 330), 190, 16, '#ffd0e6', { alpha: male }));
      txt(g, 'ostium abdominal', 500, 90, 19, '#ffd0e6');
      txt(g, 'verticală\ncraniană', X(-1, 420), 300, 17, '#ffd0e6'); txt(g, 'orizontală', X(-1, 390), 520, 17, '#ffd0e6'); txt(g, 'verticală caudală\n(se unesc)', 500, 650, 17, '#ffd0e6', { alpha: mA });
      txt(g, 'canalul\nWolff', X(1, 420), 600, 18, '#cfe0ff', { alpha: 1 - 0.7 * fem });
      // hormonii
      if (male > 0) {
        side.forEach((s) => { for (let j = 0; j < 4; j++) { const u = loopT(t + j * 0.5, 2); const [x, y] = at(curve(mHor(s)), u); dot(g, lerp(X(s, 160), x, u), lerp(360, y, u), 8, '#7fe0ff', { alpha: male * Math.sin(u * Math.PI) }); const q = at(curve(wolff(s)), 0.3 + 0.4 * u); dot(g, lerp(X(s, 160), q[0], u), lerp(330, q[1], u), 8, '#ffb15c', { alpha: male * Math.sin(u * Math.PI) }); } });
        pill(g, 180, 860, 250, 44, '#7fe0ff', 'Sertoli → AMH (manual)', { size: 17, alpha: male });
        pill(g, 820, 860, 250, 44, '#ffb15c', 'Leydig → testosteron', { size: 17, alpha: male });
      }
      if (fem > 0) { pill(g, 180, 860, 250, 44, '#d8d0cc', 'fără AMH', { size: 17, alpha: fem }); pill(g, 820, 860, 250, 44, '#d8d0cc', 'fără testosteron', { size: 17, alpha: fem }); }
      if (on(b, 0)) ring(g, X(-1, 300), 400, 70, 280, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== CĂILE MASCULINE */
export function maleDucts() {
  const T = [300, 470];
  const EPI = []; for (let k = 0; k <= 26; k++) { const y = 300 + k * 16; EPI.push([570 + (k % 2 ? 26 : -18), y]); }
  const DEF = [[575, 720], [640, 760], [720, 700], [760, 420], [790, 210], [870, 180], [900, 300], [890, 470]];
  const EJ = [[890, 470], [880, 600], [860, 720]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[490, 250], [640, 470], [905, 250], [300, 210]],
    phase: (i) => ['canalele eferente', 'epididimul', 'ductul deferent', 'vestigiile'][i] || '',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3);
      // testiculul cu cordoni + rete testis
      ell(g, T[0], T[1], 150, 230, '#cdb8f2', { ow: 6, shade: '#a98ae6', light: '#efe6ff' });
      for (let k = 0; k < 7; k++) { const y = 300 + k * 56; tube(g, [[420, y - 18], [250, y - 22], [190, y], [250, y + 22], [420, y + 18]], 12, C.cord, { ow: 4 }); }
      tube(g, [[440, 290], [440, 650]], 22, '#5b2a99', { ow: 6 }); txt(g, 'rete testis', 440, 690, 17, '#d9c6ff');
      // mezonefrosul care regresează → canalele eferente (din tubulii epigenitali)
      const reg = Math.max(p0, b.i > 0 || b.i < 0 ? 1 : 0);
      for (let k = 0; k < 8; k++) { const y = 230 + k * 30; tube(g, [[452, 300 + k * 18], [500, y + 8], [560, y]], 9, '#f08a5a', { ow: 4, u1: k < 6 ? 1 : 1 - reg, alpha: k < 6 ? 1 : 1 - reg }); }
      txt(g, 'canale eferente\n(tubulii epigenitali)', 330, 120, 18, '#ffd6c4');
      if (b.i === 0) txt(g, 'mezonefrosul regresează', 520, 60, 18, '#ffd6c4', { alpha: 1 - p0 * 0.5 });
      // epididimul = Wolff alungit, convolut
      const P1 = curve(EPI, 4);
      tube(g, P1, 14, C.wolff, { ow: 5, raw: true, u1: Math.max(0.12, b.i < 1 && b.i >= 0 ? 0.12 : b.i === 1 ? p1 : 1) });
      txt(g, 'epididim\n(Wolff convolut)', 650, 800, 18, '#cfe0ff', { alpha: b.i < 0 || b.i >= 1 ? 1 : 0.3 });
      // ductul deferent = Wolff + strat muscular gros
      const dA = b.i < 0 || b.i > 2 ? 1 : b.i === 2 ? p2 : 0;
      if (dA > 0) {
        tube(g, DEF, 30, '#c9a4ff', { ow: 6, u1: dA }); tube(g, DEF, 14, C.wolff, { ow: 0, u1: dA });
        if (dA > 0.9) { ell(g, 952, 420, 30, 62, '#9fc4ff', { ow: 5, rot: 0.2 }); tube(g, EJ, 14, C.wolff, { ow: 5 }); pill(g, 860, 760, 130, 40, C.sinus, 'uretra', { size: 16 }); txt(g, 'veziculă\nseminală', 950, 520, 16, '#cfe0ff'); txt(g, 'duct\nejaculator', 790, 610, 16, '#cfe0ff'); }
        txt(g, 'duct deferent\n(Wolff + strat muscular)', 690, 120, 18, '#e2d0ff', { alpha: dA });
      }
      // spermatozoizi pe drum (după ce calea e completă)
      if (b.i < 0 || b.i >= 2) flow(g, curve([[440, 470], [500, 300], [560, 280], ...EPI.slice(2, 26).filter((_, k) => k % 3 === 0), [575, 720], ...DEF.slice(1), ...EJ.slice(1)]), t, '#fff3e6', 10, 0.06, 5);
      // vestigii
      const vA = b.i < 0 || b.i === 3 ? 1 : 0.35;
      ell(g, 300, 236, 22, 16, C.muller, { ow: 4, alpha: vA }); txt(g, 'apendicele testicular\n(Müller)', 150, 180, 16, '#ffd0e6', { alpha: vA });
      for (let k = 0; k < 3; k++) tube(g, [[400 + k * 22, 718], [410 + k * 22, 738], [402 + k * 22, 752]], 6, '#f08a5a', { ow: 3, alpha: vA });
      txt(g, 'paradidimul\n(tubulii paragenitali)', 370, 800, 16, '#ffd6c4', { alpha: vA });
      if (on(b, 3)) { ring(g, 300, 236, 40, 34, ease(b.bt * 1.4)); ring(g, 422, 735, 46, 30, ease(b.bt * 1.4)); }
    },
  };
}

/* =================================================== CĂILE FEMININE + VAGINUL */
function uterusPath(cx, cy, split, sep = 0) {
  // split: 0 = fuzionat complet; 1 = complet separat. Contur: fund (cu adâncitură), corp, col.
  const p = new Path2D(); const w = 120, h = 190, nd = split * h * 0.85;
  p.moveTo(cx - 34, cy + h); p.lineTo(cx - 34, cy + h - 50); p.bezierCurveTo(cx - w, cy + h - 90, cx - w - sep * 0.3, cy + 20, cx - w * 0.75 - sep * 0.4, cy - 6);
  p.bezierCurveTo(cx - w * 0.55, cy - 26, cx - 16 - sep * 0.2, cy - 16, cx - 6, cy + nd); p.lineTo(cx + 6, cy + nd);
  p.bezierCurveTo(cx + 16 + sep * 0.2, cy - 16, cx + w * 0.55, cy - 26, cx + w * 0.75 + sep * 0.4, cy - 6);
  p.bezierCurveTo(cx + w + sep * 0.3, cy + 20, cx + w, cy + h - 90, cx + 34, cy + h - 50); p.lineTo(cx + 34, cy + h); p.closePath(); return p;
}
export { uterusPath };
export function femaleDucts() {
  const VXa = 900;
  const U = [330, 300];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[60, 300], [330, 220], [580, 540], [VXa - 45, 575], [960, 760]],
    phase: (i) => ['trompele', 'uterul + colul', 'ligamentul larg', 'vaginul: placa vaginală', 'L5 · himenul'][i] || '',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3), p4 = p(4);
      panel(g, 14, 40, 610, 860); panel(g, 640, 40, 346, 860);
      // ligamentul larg: pliu transversal (crestele genitale coboară)
      if (p2 > 0) { const lg = new Path2D(); lg.moveTo(40, 230); lg.lineTo(620, 230); lg.lineTo(600, 520); lg.lineTo(60, 520); lg.closePath(); g.save(); g.globalAlpha = 0.55 * p2; g.fillStyle = '#e9d6bd'; g.fill(lg); g.restore(); txt(g, 'ligamentul larg', 160, 560, 20, '#e9d6bd', { alpha: p2 }); }
      // trompele: porțiunile verticale craniale + orizontale (rămân pereche)
      [-1, 1].forEach((s) => {
        tube(g, [[U[0] + s * 70, U[1] + 10], [U[0] + s * 160, U[1] - 60], [U[0] + s * 240, U[1] - 40], [U[0] + s * 270, U[1] + 20]], 18, C.muller, { ow: 6, glow: on(b, 0) ? 0.6 : 0 });
        // fimbrii / ostium deschis în cavitatea peritoneală
        const fx = U[0] + s * 270, fy = U[1] + 26; for (let k = 0; k < 4; k++) tube(g, [[fx, fy], [fx + s * (6 + k * 6), fy + 26 + k * 4]], 6, C.muller, { ow: 3 });
        ell(g, U[0] + s * 190, U[1] + 90, 40, 24, '#cdb8f2', { ow: 4 });
      });
      txt(g, 'trompa uterină', U[0] - 210, U[1] - 110, 18, '#ffd0e6'); txt(g, 'ovar', U[0] + 190, U[1] + 140, 17, '#d9c6ff');
      // uterul: fuziunea porțiunilor verticale caudale (animat) + mezodermul atașat (miometru + perimetru)
      const split = b.i < 0 ? 0 : b.i === 1 ? 1 - p1 : b.i > 1 ? 0 : 1;
      if (p1 > 0 || b.i < 0) { g.save(); g.globalAlpha = Math.max(p1, b.i < 0 ? 1 : 0); g.strokeStyle = OUT; g.lineWidth = 34; g.stroke(uterusPath(U[0], U[1], split)); g.strokeStyle = '#d9483f'; g.lineWidth = 26; g.stroke(uterusPath(U[0], U[1], split)); g.restore(); }
      paint(g, uterusPath(U[0], U[1], split), '#ffd0e6', '#f0a5c8', '#fff0f7', bb(U[0], U[1] + 90, 120, 110), OUT, 6);
      if (split > 0.05) tube(g, [[U[0], U[1] + 30], [U[0], U[1] + 175]], 6, C.muller, { ow: 0, alpha: split });
      txt(g, 'uter', U[0], U[1] + 80, 22, OUT, { stroke: false }); txt(g, 'col', U[0], U[1] + 168, 18, OUT, { stroke: false });
      if (p1 > 0.5) txt(g, 'miometru + perimetru =\nmezoderm atașat (roșu)', U[0], U[1] + 330, 18, '#ffb0a8', { alpha: p1 });
      // VAGINUL (dreapta): Müller atinge sinusul → bulbi sinovaginali → placă solidă → L5 tunelizată; himenul
      const VX = 900, SY = 760; const LX = 745;
      pill(g, 812, SY + 40, 300, 40, C.sinus, '', { r: 12 }); txt(g, 'sinusul urogenital', 812, SY + 96, 17, '#ffe9a8');
      const mTip = 560 + 120 * clamp(p3 * 2.2);
      tube(g, [[VX, 110], [VX, mTip]], 34, C.muller, { ow: 6 });
      if (p3 > 0.3) { const hb = lerp(0, 1, clamp((p3 - 0.3) / 0.5)); const pl = new Path2D(); pl.roundRect(VX - 22, SY + 20 - 140 * hb, 44, 140 * hb, 10); paint(g, pl, '#e3b13a', null, null, [VX - 22, SY - 120, 44, 140], OUT, 5); txt(g, 'bulbii\nsinovaginali\n→ placa\nvaginală', LX, 640, 17, '#ffe9a8', { alpha: hb }); }
      if (p4 > 0) {
        const pl = new Path2D(); pl.roundRect(VX - 13, SY - 116, 26, 124 * p4, 10); g.save(); g.fillStyle = '#2a1c18'; g.fill(pl); g.restore();
        tube(g, [[VX - 26, SY + 14], [VX + 26, SY + 14]], 7, '#fff3e6', { ow: 3, alpha: p4 });
        txt(g, 'L5: tunelizată;\nrămâne\nhimenul', LX, 420, 18, C.cream, { alpha: p4 });
      }
      txt(g, 'roz = din Müller · galben = din sinusul UG', 812, 870, 14, '#d8c4b8', { w: 600 }); txt(g, 'Müller', LX, 200, 18, '#ffd0e6');
      if (on(b, 0)) ring(g, U[0] - 200, U[1] - 40, 90, 50, ease(b.bt * 1.4));
      if (on(b, 3)) ring(g, VX, SY - 50, 60, 100, ease(b.bt * 1.4));
      if (on(b, 4)) ring(g, VX, SY + 14, 50, 26, ease(b.bt * 1.4));
    },
  };
}

/* ---------- organele genitale externe: vedere din față (perineu) ---------- */
// m: 0 = indiferent, +1 = masculin, -1 = feminin; u = progresul diferențierii
export function oge(g, cx, cy, s, m, u, t, o = {}) {
  g.save(); g.translate(cx, cy); g.scale(s, s);
  const hl = o.hl ?? -1; const G = (k) => (hl === k ? 1 : 0);
  const male = m > 0 ? u : 0, fem = m < 0 ? u : 0;
  const glow = (k) => (hl >= 0 ? (hl === k ? 1 : 0) : 0);
  const dim = (k) => (hl >= 0 && hl !== k ? 0.55 : 1);
  // tumefacțiile labioscrotale
  const swX = lerp(130, 70, male) + 10 * fem, swRY = lerp(120, 132, male) + 16 * fem;
  [-1, 1].forEach((sd) => ell(g, sd * swX, 70 + 26 * male, lerp(62, 74, male) + 8 * fem, swRY, C.swell, { ow: 6, alpha: dim(2), light: '#fff2c4' }));
  if (male > 0.5) { tube(g, [[0, -20], [0, 190]], 5, C.swellS, { ow: 0, alpha: (male - 0.5) * 2 }); }
  // faldurile uretrale (+ șanțul / sinusul între ele)
  const fh = lerp(150, 330, male); const fy0 = lerp(-60, -290, male);
  if (hl === 3) { g.save(); g.fillStyle = C.sinus; g.globalAlpha = 0.95; g.beginPath(); g.ellipse(0, 20, 22, 70, 0, 0, 7); g.fill(); g.restore(); }
  const gap = lerp(14, 2, male) + 10 * fem;
  [-1, 1].forEach((sd) => { const pth = new Path2D(); pth.ellipse(sd * (lerp(34, 22, male) + gap), fy0 + fh / 2 + 30, lerp(26, 18, male), fh / 2, 0, 0, 7); g.save(); g.globalAlpha = dim(1); paint(g, pth, C.fold, C.foldS, '#ff9a9a', [-60, fy0, 120, fh], OUT, 6); g.restore(); });
  // membrana urogenitală / șanțul uretral (se închide la bărbat)
  const slitLen = lerp(130, 0, male);
  if (slitLen > 4) tube(g, [[0, 30 - slitLen / 2 + 40 * male], [0, 30 + slitLen / 2]], lerp(10, 16, fem), m < 0 ? C.sinus : '#2a1534', { ow: 0, alpha: dim(3) });
  // tuberculul genital → falus / clitoris
  const tl = lerp(70, 300, male) + 10 * fem;
  const tub = new Path2D(); tub.roundRect(-lerp(44, 40, male), -60 - tl, lerp(88, 80, male), tl, 40);
  g.save(); g.globalAlpha = dim(0); paint(g, tub, C.tub, C.tubS, '#ffc08a', [-44, -60 - tl, 88, tl], OUT, 6); g.restore();
  if (male > 0.6) { g.save(); g.globalAlpha = (male - 0.6) * 2.5; ell(g, 0, -60 - tl + 30, 46, 40, '#f6a35c', { ow: 5 }); dot(g, 0, -60 - tl + 18, 6, '#2a1534', { ow: 0 }); g.restore(); }
  if (glow(0)) { g.save(); g.shadowColor = C.hi; g.shadowBlur = 30; g.strokeStyle = C.hi; g.lineWidth = 6; g.stroke(tub); g.restore(); }
  // faldurile anale + membrana anală
  if (o.anal !== false) { ell(g, 0, 270, 46, 34, C.anal, { ow: 5, alpha: dim(4) }); dot(g, 0, 270, 12, '#2a1534', { ow: 0 }); }
  g.restore();
}

/* =================================================== OGE · STADIUL INDIFERENT */
export function ogeIndiff() {
  const CX = 520, CY = 430;
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[CX - 110, 230], [CX + 170, 690], [CX - 240, 420]],
    phase: (i) => ['S3: faldurile cloacale', 'septul urorectal', 'tumefacțiile labioscrotale'][i] || 'S3–S7: la fel la ambele sexe',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3); const p0 = p(0), p1 = p(1), p2 = p(2);
      // membrana cloacală + mezodermul care migrează în jurul ei
      if (p1 < 0.5) tube(g, [[CX, CY - 40], [CX, CY + 290]], 16, '#2a1534', { ow: 0 });
      if (b.i === 0) for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; const r = lerp(260, 90, p0); dot(g, CX + Math.cos(a) * r * 0.7, CY + 120 + Math.sin(a) * r * 1.2, 10, '#ff9a7a', { alpha: 1 - p0 * 0.6 }); }
      // faldurile cloacale (o pereche) → cranial tuberculul genital
      const rise = Math.max(p0, b.i < 0 ? 1 : 0);
      [-1, 1].forEach((s) => { const pth = new Path2D(); pth.ellipse(CX + s * 46, CY + 120, 30, 210 * rise + 1, 0, 0, 7); paint(g, pth, p1 > 0.5 ? C.fold : '#e86f6a', C.foldS, '#ff9a9a', [CX - 80, CY - 90, 160, 420], OUT, 6); });
      if (p1 > 0.5) { // faldurile anale (posterior) separate de septul urorectal → perineul
        g.save(); g.fillStyle = '#140c0a'; g.fillRect(CX - 120, CY + 222, 240, 22); g.restore();
        tube(g, [[CX - 130, CY + 233], [CX + 130, CY + 233]], 10, C.septum, { ow: 4, dash: [16, 10] });
        ell(g, CX, CY + 300, 60, 46, C.anal, { ow: 6 }); dot(g, CX, CY + 300, 15, '#2a1534', { ow: 0 });
        tube(g, [[CX, CY - 40], [CX, CY + 200]], 14, '#2a1534', { ow: 0 });
        lead(g, CX + 70, CY + 20, CX + 250, CY - 50, 1); txt(g, 'faldurile uretrale\n(anterior)', CX + 330, CY - 80, 19, '#ffb0a8');
        txt(g, 'faldurile anale (posterior)', CX + 230, CY + 320, 19, '#e8d9ff');
        txt(g, 'perineul (septul urorectal)', CX - 320, CY + 233, 18, '#ffb0a8');
        lead(g, CX - 12, CY + 60, CX - 250, CY - 30, 1); txt(g, 'membrana\nurogenitală', CX - 320, CY - 70, 18, C.cream);
      }
      if (rise > 0.3) { const tub = new Path2D(); tub.roundRect(CX - 50, CY - 150 - 60 * rise, 100, 130 * rise + 40, 46); paint(g, tub, C.tub, C.tubS, '#ffc08a', [CX - 50, CY - 210, 100, 170], OUT, 6); txt(g, 'tuberculul genital', CX + 210, CY - 150, 20, '#ffc08a', { alpha: rise }); }
      if (b.i === 0 || (b.i < 0 && p1 < 0.5)) txt(g, 'falduri cloacale', CX - 220, CY + 140, 19, '#ffb0a8', { alpha: rise });
      // tumefacțiile labioscrotale (lateral de faldurile uretrale)
      if (p2 > 0) [-1, 1].forEach((s) => ell(g, CX + s * 170, CY + 110, 64 * p2 + 1, 130 * p2 + 1, C.swell, { ow: 6, light: '#fff2c4' }));
      if (p2 > 0.5) txt(g, 'tumefacțiile labioscrotale', CX, CY - 270, 20, '#ffe9a8', { alpha: p2 });
      if (p2 > 0.6) { txt(g, '→ scrot (♂)', CX + 260, CY + 250, 18, '#ffe9a8', { alpha: p2 }); txt(g, '→ labiile mari (♀)', CX - 290, CY + 330, 18, '#ffe9a8', { alpha: p2 }); }
      if (on(b, 1)) ring(g, CX, CY + 233, 160, 40, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== OGE · BĂRBATUL */
export function ogeMale() {
  const CX = 640, CY = 520;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[CX + 70, 160], [CX - 80, 380], [CX + 90, 230], [CX + 200, 600]],
    phase: (i) => ['falusul', 'sf. L3: uretra peniană', 'L4: meatul uretral extern', 'scrotul'][i] || 'testosteron (S8)',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3);
      const s = 0.95; const male = Math.max(p0, b.i < 0 ? 1 : 0);
      // scrotul (2 hemiscroturi + septul scrotal)
      const fuse = Math.max(p3, b.i < 0 ? 1 : 0);
      [-1, 1].forEach((sd) => ell(g, CX + sd * lerp(120, 64, fuse), CY + 160, lerp(60, 72, fuse), lerp(110, 120, fuse), C.swell, { ow: 6, light: '#fff2c4' }));
      if (fuse > 0.6) { tube(g, [[CX, CY + 50], [CX, CY + 270]], 6, C.swellS, { ow: 3, alpha: (fuse - 0.6) * 2.5 }); txt(g, 'septul scrotal', CX + 200, CY + 290, 18, '#ffe9a8', { alpha: fuse }); }
      // falusul: tuberculul se alungește și trage faldurile uretrale (pereții șanțului)
      const L = lerp(90, 360, male); const top = CY + 40 - L;
      const sh = new Path2D(); sh.roundRect(CX - 52, top, 104, L + 40, 48);
      paint(g, sh, C.tub, C.tubS, '#ffc08a', [CX - 52, top, 104, L + 40], OUT, 6);
      // șanțul uretral cu placa (endoderm, galben) + faldurile uretrale care se închid de la perineu spre gland
      const zip = b.i < 0 ? 1 : b.i < 1 ? 0 : b.i === 1 ? p1 : 1; // 0 = deschis, 1 = închis
      const gy0 = top + 70, gy1 = CY + 40;
      const closedTo = lerp(gy1, gy0, zip);
      tube(g, [[CX, gy0], [CX, gy1]], 18, C.sinus, { ow: 4 });
      [-1, 1].forEach((sd) => { tube(g, [[CX + sd * 22, gy0], [CX + sd * 22, closedTo]], 14, C.fold, { ow: 4 }); tube(g, [[CX + sd * 6, closedTo], [CX + sd * 6, gy1]], 16, C.fold, { ow: 4 }); });
      if (zip > 0.05 && zip < 0.98) dot(g, CX, closedTo, 9, C.hi, { ow: 3 });
      // glandul: celule ectodermice din vârf → cordon epitelial → lumen (meatul)
      ell(g, CX, top + 34, 60, 46, '#f6a35c', { ow: 6 });
      const mt = Math.max(p2, b.i < 0 ? 1 : 0);
      if (mt > 0) { tube(g, [[CX, top + 2], [CX, top + 2 + 66 * mt]], 12, '#ffd9b8', { ow: 4 }); if (mt > 0.7) dot(g, CX, top + 6, 7, '#2a1534', { ow: 0 }); }
      // etichete
      txt(g, 'falus', CX - 150, top + 120, 20, '#ffc08a', { alpha: male });
      txt(g, 'placa uretrală\n(endoderm)', CX - 190, CY - 80, 18, '#ffe9a8', { alpha: b.i === 1 || b.i < 0 ? 1 : 0.5 });
      txt(g, 'faldurile uretrale\nse închid →\nuretra peniană', CX + 225, CY - 120, 18, '#ffb0a8', { alpha: zip });
      if (mt > 0.3) txt(g, 'ectoderm → meat', CX + 190, top + 10, 18, '#ffd9b8', { alpha: mt });
      if (on(b, 0)) arr(g, CX + 110, CY - 40, CX + 110, top + 40, '#ffc08a', 6, 1);
      if (on(b, 1)) ring(g, CX, (gy0 + gy1) / 2, 60, (gy1 - gy0) / 2 + 20, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, CX, top + 30, 70, 56, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== OGE · FEMEIA + OMOLOGIILE */
export function ogeHomo() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[562, 214], [536, 330], [419, 323], [500, 300]],
    phase: (i) => ['tuberculul genital', 'faldurile uretrale', 'tumefacțiile labioscrotale', 'sinusul urogenital'][i] || 'aceleași structuri, alt destin',
    draw(g, t, b) {
      bg(g); const hl = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 2.4) % 4 : b.i; const map = [0, 1, 2, 3];
      const u = b.i < 0 ? 1 : 1;
      txt(g, 'INDIFERENT', 500, 40, 18, '#ffe7d6');
      oge(g, 500, 280, 0.62, 0, 0, t, { hl: map[hl] });
      txt(g, 'BĂRBAT', 250, 470, 20, '#cfe0ff'); txt(g, 'FEMEIE', 750, 470, 20, '#ffd0e6');
      arr(g, 400, 420, 300, 500, '#fff3e6', 5, 0.7); arr(g, 600, 420, 700, 500, '#fff3e6', 5, 0.7);
      oge(g, 250, 760, 0.5, 1, 1, t, { hl: map[hl], anal: false });
      oge(g, 750, 720, 0.62, -1, 1, t, { hl: map[hl], anal: false });
      const R = [['glandul + corpii cavernoși', 'clitorisul'], ['uretra peniană (se închid)', 'labiile mici (nu se unesc)'], ['scrotul (+ septul scrotal)', 'labiile mari'], ['uretra prostatică + membranoasă; prostata', 'vestibulul; gl. uretrale + parauretrale']];
      pill(g, 250, 884, 430, 50, '#cfe0ff', R[hl][0], { size: 16 });
      pill(g, 740, 884, 420, 50, '#ffd0e6', R[hl][1], { size: 16 });
    },
  };
}
