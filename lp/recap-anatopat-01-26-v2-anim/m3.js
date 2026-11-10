// m3.js · „de ce arată așa” (mecanismele): granulomul TBC și granulomul de corp străin (gran), litiaza renală → hidronefroză (lith),
// bronhopneumonia (bronho), leptomeningita purulentă (lepto). Pasul se joacă o dată și rămâne pe cadrul final; doar curgerile merg în buclă.
import { K, W, H, HOME, OUT, T, sg, ln, pop, back, lp, pulse, mix, hash, clamp, lerp, ease, RED, bgK, hud, tx, chip, capSeq, Path, mol, comet, stream, arrowK, crossK, panel, ellK, extra } from './kino.js';

const TAU = Math.PI * 2;
const lead = (g, x0, y0, x1, y1, a = 1) => { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a) * 0.8; g.strokeStyle = '#fff3e6'; g.lineWidth = 2.5; g.setLineDash([6, 5]); g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); };
const lab = (g, x, y, s, a = 1, c = K.ink, size = 17) => chip(g, x, y, s, { size, alpha: a, col: c, line: c === K.ink ? 'rgba(255,255,255,.3)' : c, lw: 2.5 });
// celulă cu nucleu (macrofag rotund → epiteloidă alungită, e = 0..1)
function cell(g, x, y, rot, e, a = 1, s = 1) {
  if (a <= 0.01) return; const rx = lerp(30, 50, e) * s, ry = lerp(30, 21, e) * s;
  ellK(g, x, y, rx, ry, mix('#c9a6e0', '#f4bcd2', e), { rot, alpha: a, ow: 4, shade: mix('#a783c4', '#dd95b4', e) });
  ellK(g, x, y, lerp(12, 20, e) * s, lerp(12, 9, e) * s, '#4a3fa8', { rot, alpha: a, ow: 2.5 });
}
const lymph = (g, x, y, a = 1, r = 12) => { if (a <= 0.01) return; ellK(g, x, y, r, r, '#d9d2f5', { alpha: a, ow: 3 }); ellK(g, x, y, r * 0.72, r * 0.72, '#3b3192', { alpha: a, ow: 0 }); };

/* ================= 1. GRANULOMUL: TBC (Langhans, cazeum) și de corp străin (cristale de colesterol) ================= */
export function gran({ spec }) {
  const tbc = spec.sceneOpts.kind === 'tbc'; const CX = 500, CY = 446;
  const N = 12; const ang = (k, n = N, o = 0) => (k / n) * TAU + o;
  const caps = tbc ? [
    [[0, 'bacilii Koch ajung în ganglion; macrofagele (histiocitele) vin spre ei'], [3.4, 'nu îi pot distruge: inflamația devine cronică']],
    [[0, 'histiocitele se transformă în celule epiteloide'], [2.6, 'se așază în strat gros în jurul bacililor']],
    [[0, 'apare celula gigantă Langhans'], [2.6, 'nucleii stau la periferie: coroană sau potcoavă']],
    [[0, 'centrul granulomului moare: necroză cazeoasă'], [3, 'omogenă, acidofilă, fără structuri']],
    [[0, 'la periferie se adună limfocitele: coroana limfocitară']],
  ] : [
    [[0, 'cristalele de colesterol: corpi străini în țesutul mamar'], [2.6, 'macrofagele vin, dar nu le pot fagocita']],
    [[0, 'macrofagele fuzionează în celule gigante'], [2.8, 'nucleii: mulți, răspândiți fără nicio ordine']],
    [[0, 'în jur: infiltrat inflamator cronic și capilare noi'], [3, '= țesut de granulație']],
    [[0, 'fibroza delimitează nodulul'], [3, 'în afara lui: țesut mamar normal']],
  ];
  // corp străin: cristale (x, y, rot, lungime) și cele 3 celule gigante
  const CR = [[-70, -70, 0.5, 190], [60, -95, -0.3, 170], [95, 20, 1.1, 180], [-20, 40, -0.9, 200], [-110, 60, 0.2, 150], [20, 125, 0.15, 170]];
  const GC = [[-92, -62, 84], [98, -34, 80], [-4, 104, 86]];
  const G1 = [CX + 262 * Math.cos(-0.72), CY + 262 * Math.sin(-0.72)];
  return {
    home: HOME, beatDur: 8, anchors: [],
    phase: (i) => (i < 0 ? 'granulomul, gata format' : (tbc ? ['bacilul Koch', 'celule epiteloide', 'celula Langhans', 'necroza cazeoasă', 'coroana limfocitară'] : ['corpul străin', 'celule gigante', 'infiltrat cronic', 'fibroza'])[i]),
    draw(g, t, b) {
      bgK(g, [[CX, CY, 560, tbc ? '#c57bff' : '#ff8fa0', 0.07]]);
      const P = (k, t0 = 0, d = 1) => (b.i < 0 ? 1 : sg(T(b, k), t0, d)); const PP = (k, t0 = 0) => (b.i < 0 ? 1 : pop(T(b, k), t0));
      if (tbc) {
        const cz = P(3, 0.4, 3);
        // limfocitele (coroana, la periferie)
        for (let k = 0; k < 46; k++) { const a = ang(k, 46, 0.07), r = 338 + (k % 2) * 34; lymph(g, CX + Math.cos(a) * r, CY + Math.sin(a) * r, PP(4, 0.3 + k * 0.07), 15); }
        // al doilea rând de epiteloide („strat gros”)
        const fz = P(2, 0.3, 2);
        for (let k = 0; k < 16; k++) { const a = ang(k, 16, 0.2); let x = CX + Math.cos(a) * 262, y = CY + Math.sin(a) * 262; let al = PP(1, 1.6 + k * 0.08); const near = Math.hypot(x - G1[0], y - G1[1]) < 110; if (near) { x = lerp(x, G1[0], fz); y = lerp(y, G1[1], fz); al *= 1 - fz; } cell(g, x, y, a + Math.PI / 2, 1, al, 0.92); }
        // macrofagele → epiteloide (rândul din interior)
        for (let k = 0; k < N; k++) { const a = ang(k); const r = lerp(455, 196, P(0, 0.3 + k * 0.12, 2.2)); const e = P(1, 0.2 + k * 0.08, 1.6); cell(g, CX + Math.cos(a) * r, CY + Math.sin(a) * r, a + Math.PI / 2, e, P(0, k * 0.12, 0.5)); }
        // bacilii
        for (let k = 0; k < 9; k++) { const a = hash(k + 3) * TAU, r = 18 + hash(k + 11) * 62; const x = CX + Math.cos(a) * r, y = CY + Math.sin(a) * r; g.save(); g.globalAlpha = 1 - 0.85 * cz; g.translate(x, y); g.rotate(hash(k) * 3 + (RED ? 0 : Math.sin(t * 1.3 + k) * 0.25)); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 15; g.beginPath(); g.moveTo(-15, 0); g.lineTo(15, 0); g.stroke(); g.strokeStyle = '#ff5d6c'; g.lineWidth = 9; g.stroke(); g.restore(); }
        if (b.i === 0) { crossK(g, CX - 40, CY - 30, 20, pop(T(b, 0), 3.4)); crossK(g, CX + 46, CY + 34, 20, pop(T(b, 0), 3.8)); }
        // necroza cazeoasă
        if (cz > 0.01) { ellK(g, CX, CY, 150 * cz, 142 * cz, '#f6c3cf', { ow: 4, alpha: Math.min(1, cz * 1.6) }); g.save(); g.globalAlpha = cz * 0.55; g.fillStyle = '#d98aa0'; for (let k = 0; k < 70; k++) { const a = hash(k * 3 + 1) * TAU, r = Math.sqrt(hash(k * 7 + 2)) * 132 * cz; g.beginPath(); g.arc(CX + Math.cos(a) * r, CY + Math.sin(a) * r, 2.2, 0, 7); g.fill(); } g.restore(); tx(g, 'necroză\ncazeoasă', CX, CY, 24, '#5a1830', { stroke: false, alpha: P(3, 2.6, 0.8) }); }
        // celula Langhans
        if (fz > 0.01) { const R = 82 * back(fz); ellK(g, G1[0], G1[1], R, R * 0.92, '#f4bcd2', { ow: 5, alpha: Math.min(1, fz * 2) , glow: b.i === 2 ? 0.5 : 0, gc: K.hi }); for (let k = 0; k < 13; k++) { const a = 0.5 + (k / 12) * 4.5; const al = PP(2, 2.2 + k * 0.12); ellK(g, G1[0] + Math.cos(a) * R * 0.74, G1[1] + Math.sin(a) * R * 0.68, 11, 8, '#3b3192', { rot: a + 1.57, alpha: al, ow: 2 }); } }
        // etichete
        lead(g, 842, 150, G1[0] + 50, G1[1] - 56, P(2, 3)); lab(g, 820, 132, 'celula gigantă Langhans', P(2, 3), K.hi);
        extra(g, 826, 92, 'din macrofage transformate', P(2, 3.6));
        lead(g, 150, 824, CX - 215, CY + 150, P(1, 3)); lab(g, 150, 842, 'celule epiteloide', P(1, 3));
        lead(g, 160, 102, CX - 270, CY - 232, P(4, 2.5)); lab(g, 160, 84, 'coroana limfocitară', P(4, 2.5));
        if (b.i === 0) lab(g, CX, CY + 120, 'bacilul Koch', pop(T(b, 0), 0.6), '#ff9aa5');
      } else {
        // țesutul mamar din jur (acini) + fibroza
        const fb = P(3, 0.3, 3);
        [[96, 262], [112, 760], [888, 760], [900, 250]].forEach(([x, y], q) => { const al = P(3, 3 + q * 0.2, 0.8); for (let k = 0; k < 6; k++) { const a = ang(k, 6, q); ellK(g, x + Math.cos(a) * 30, y + Math.sin(a) * 30, 17, 17, '#e9b7dc', { alpha: al, ow: 3.5 }); ellK(g, x + Math.cos(a) * 30, y + Math.sin(a) * 30, 6, 6, '#1a1022', { alpha: al, ow: 0 }); } });
        for (let j = 0; j < 3; j++) { const r = 318 + j * 17; g.save(); g.lineCap = 'round'; for (const [c, w] of [[OUT, 13], [['#f08fb0', '#e67aa0', '#f4a3bf'][j], 8]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); const n = Math.floor(160 * fb); for (let k = 0; k <= n; k++) { const a = (k / 160) * TAU - 1.57 + j * 0.4; const rr = r + Math.sin(a * 9 + j * 2) * 6; const x = CX + Math.cos(a) * rr, y = CY + Math.sin(a) * rr; k ? g.lineTo(x, y) : g.moveTo(x, y); } if (n > 0) g.stroke(); } g.restore(); }
        // infiltratul cronic + capilare de neoformație
        for (let k = 0; k < 30; k++) { const a = ang(k, 30, 0.1), r = 222 + hash(k * 5) * 66; lymph(g, CX + Math.cos(a) * r, CY + Math.sin(a) * r, PP(2, 0.3 + k * 0.08), 12); }
        for (let k = 0; k < 6; k++) { const a = ang(k, 6, 0.55), r = 258; const x = CX + Math.cos(a) * r, y = CY + Math.sin(a) * r; const al = PP(2, 3 + k * 0.2); ellK(g, x, y, 21, 17, '#ffd9dd', { alpha: al, ow: 4 }); ellK(g, x, y, 13, 10, K.blood, { alpha: al, ow: 2 }); }
        // celulele gigante (sub cristale)
        const fz = P(1, 0.3, 2.4);
        GC.forEach(([dx, dy, R], q) => { const s = back(clamp(fz * 1.2 - q * 0.08)); ellK(g, CX + dx, CY + dy, R * s, R * 0.9 * s, '#f2a3c0', { ow: 5, alpha: Math.min(1, fz * 2), glow: b.i === 1 ? 0.4 : 0, gc: K.hi }); });
        // macrofagele: vin, apoi fuzionează (se topesc în celula gigantă cea mai apropiată)
        for (let k = 0; k < N; k++) { const a = ang(k, N, 0.26); const r = lerp(455, 188, P(0, 1 + k * 0.12, 2.2)); let x = CX + Math.cos(a) * r, y = CY + Math.sin(a) * r; let best = GC[0]; GC.forEach((c) => { if (Math.hypot(CX + c[0] - x, CY + c[1] - y) < Math.hypot(CX + best[0] - x, CY + best[1] - y)) best = c; }); x = lerp(x, CX + best[0], fz); y = lerp(y, CY + best[1], fz); cell(g, x, y, a, 0, P(0, 0.8 + k * 0.12, 0.5) * (1 - fz)); }
        // cristalele de colesterol: fante aciculare, optic goale
        CR.forEach(([dx, dy, rot, L], k) => { const al = PP(0, 0.2 + k * 0.15); if (al <= 0.01) return; g.save(); g.globalAlpha = clamp(al); g.translate(CX + dx, CY + dy); g.rotate(rot); const p = new Path2D(); p.moveTo(-L / 2, 0); p.quadraticCurveTo(0, -17, L / 2, 0); p.quadraticCurveTo(0, 17, -L / 2, 0); g.fillStyle = '#fbf7f2'; g.strokeStyle = OUT; g.lineWidth = 5; g.lineJoin = 'round'; g.stroke(p); g.fill(p); g.restore(); });
        // nucleii celulelor gigante: fără nicio ordine
        GC.forEach(([dx, dy, R], q) => { for (let k = 0; k < 12; k++) { const a = hash(q * 40 + k * 3 + 1) * TAU, r = Math.sqrt(hash(q * 17 + k * 7 + 5)) * R * 0.72; ellK(g, CX + dx + Math.cos(a) * r, CY + dy + Math.sin(a) * r * 0.9, 10, 7.5, '#3b3192', { rot: hash(k + q) * 3, alpha: PP(1, 2.6 + k * 0.1 + q * 0.2), ow: 2 }); } });
        if (b.i === 0) { crossK(g, CX - 150, CY - 150, 20, pop(T(b, 0), 4)); crossK(g, CX + 160, CY + 96, 20, pop(T(b, 0), 4.4)); }
        // etichete
        lead(g, 190, 96, CX - 120, CY - 96, PP(0, 1.2)); lab(g, 196, 78, 'cristale de colesterol', PP(0, 1.2));
        extra(g, 196, 118, 'fante goale: colesterolul s-a dizolvat', PP(0, 1.8));
        lead(g, 800, 110, CX + 120, CY - 80, P(1, 3.6)); lab(g, 770, 92, 'celulă gigantă de corp străin', P(1, 3.6), K.hi);
        lab(g, 500, 826, 'fibroză: nodul bine delimitat', P(3, 2.4));
        lead(g, 150, 640, CX - 235, CY + 60, P(2, 4)); lab(g, 138, 658, 'țesut de granulație', P(2, 4));
        lab(g, 866, 838, 'țesut mamar normal', P(3, 4));
      }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i]); g.restore();
    },
  };
}

/* ================= 2. LITIAZA RENALĂ → HIDRONEFROZĂ ================= */
export function lith() {
  const KC = [430, 430], PV = [585, 430]; const AN = [118, 150, 180, 210, 242].map((d) => (d * Math.PI) / 180);
  const U = new Path([[PV[0], PV[1] + 30], [664, 528], [700, 650], [694, 760], [692, 842]], { n: 12 });
  const caps = [
    [[0, 'urina curge: papilă → calice → bazinet → ureter'], [3.2, 'în calice și în bazinet se formează calculi']],
    [[0, 'calculul crește și ia forma sistemului pielo-caliceal'], [3.4, '= calcul coraliform']],
    [[0, 'calculul astupă ieșirea spre ureter'], [2.6, 'urina se adună în amonte: presiune retrogradă']],
    [[0, 'calicele se dilată'], [2.8, 'parenchimul se subțiază, atrofic: hidronefroză']],
  ];
  return {
    home: HOME, beatDur: 8, anchors: [],
    phase: (i) => (i < 0 ? 'litiază cu hidronefroză' : ['calculii se formează', 'calcul coraliform', 'obstrucție', 'hidronefroză'][i]),
    draw(g, t, b) {
      bgK(g, [[430, 430, 560, '#f6dd6a', 0.06]]);
      const P = (k, t0 = 0, d = 1) => (b.i < 0 ? 1 : sg(T(b, k), t0, d)); const PP = (k, t0 = 0) => (b.i < 0 ? 1 : pop(T(b, k), t0));
      const D = P(3, 0.3, 4), ob = P(2, 0.6, 1.4), sG = P(1, 0.3, 3.2), acc = P(2, 1.6, 3);
      const rc = lerp(30, 86, D), RK = 205 + 26 * D; const C = AN.map((a) => [PV[0] + Math.cos(a) * RK, PV[1] + Math.sin(a) * RK, Math.cos(a), Math.sin(a)]);
      // rinichiul (bob) + hilul
      ellK(g, KC[0], KC[1], 255, 350, K.kidney, { ow: 7 });
      g.save(); g.fillStyle = '#120b19'; g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.ellipse(712, 430, 78, 118, 0, 0, 7); g.fill(); g.restore();
      g.save(); g.beginPath(); g.ellipse(KC[0], KC[1], 255, 350, 0, 0, 7); g.clip(); g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.ellipse(712, 430, 78, 118, 0, 0, 7); g.stroke(); g.restore();
      // piramidele (medulara), cu vârful (papila) în calice
      const L = lerp(100, 46, D);
      C.forEach(([x, y, dx, dy]) => { const ax = x + dx * rc * 0.55, ay = y + dy * rc * 0.55, bx = x + dx * (rc + L), by = y + dy * (rc + L), hw = lerp(52, 62, D); g.save(); g.beginPath(); g.moveTo(ax, ay); g.lineTo(bx - dy * hw, by + dx * hw); g.lineTo(bx + dy * hw, by - dx * hw); g.closePath(); g.fillStyle = '#8f3a34'; g.strokeStyle = OUT; g.lineWidth = 4; g.lineJoin = 'round'; g.stroke(); g.fill(); g.restore(); });
      // sistemul pielo-caliceal + ureterul: întâi conturul, apoi umplerea (formă unită)
      const cav = (grow, col) => { g.save(); g.fillStyle = col; g.strokeStyle = col; g.lineCap = 'round'; C.forEach(([x, y]) => { g.lineWidth = 30 + grow; g.beginPath(); g.moveTo(x, y); g.lineTo(PV[0], PV[1]); g.stroke(); g.beginPath(); g.arc(x, y, rc + grow / 2, 0, 7); g.fill(); }); g.beginPath(); g.ellipse(PV[0] + 8, PV[1], lerp(52, 70, D) + grow / 2, lerp(74, 100, D) + grow / 2, 0, 0, 7); g.fill(); g.restore(); };
      U.stroke(g, 24, '#f4e3b0', { ow: 9 }); cav(11, OUT); cav(0, mix('#f4e3b0', '#f6d84a', acc * 0.8)); U.stroke(g, 24, '#f4e3b0', { ow: 0, u0: 0, u1: 0.12 });
      // urina: papilă → calice → bazinet → ureter (în buclă); după obstrucție nu mai trece în ureter
      C.forEach(([x, y, dx, dy], k) => { const pth = new Path([[x + dx * rc * 0.5, y + dy * rc * 0.5], [x, y], [lerp(x, PV[0], 0.6), lerp(y, PV[1], 0.6)], [PV[0], PV[1]]], { n: 8 }); stream(g, pth, t + k * 0.37, K.urine, { n: 3, r: 6, speed: lerp(0.3, 0.1, ob), alpha: 1 - 0.5 * sG }); });
      stream(g, U, t, K.urine, { n: 6, r: 6, speed: 0.22, alpha: 1 - ob });
      // calculii mici, apoi calculul coraliform (ia forma calicelor și a bazinetului)
      [[C[1][0], C[1][1]], [C[3][0], C[3][1]], [PV[0] - 6, PV[1] - 24], [PV[0] + 10, PV[1] + 26]].forEach(([x, y], k) => { const al = PP(0, 3.4 + k * 0.4); ellK(g, x, y, 13 * al, 10 * al, '#cdb98a', { ow: 4, alpha: Math.min(1, al), rot: k }); });
      if (sG > 0.01) { const st = (grow, col) => { g.save(); g.globalAlpha = Math.min(1, sG * 1.5); g.fillStyle = col; g.strokeStyle = col; g.lineCap = 'round'; C.forEach(([x, y]) => { const xe = lerp(PV[0], x, sG), ye = lerp(PV[1], y, sG); g.lineWidth = 15 + grow; g.beginPath(); g.moveTo(PV[0], PV[1]); g.lineTo(xe, ye); g.stroke(); g.beginPath(); g.arc(xe, ye, 19 * sG + grow / 2, 0, 7); g.fill(); }); g.beginPath(); g.ellipse(PV[0] + 6, PV[1], 36 * sG + grow / 2, 54 * sG + grow / 2, 0, 0, 7); g.fill(); g.restore(); }; st(9, OUT); st(0, '#cdb98a'); g.save(); g.globalAlpha = sG * 0.5; g.fillStyle = '#9c8656'; for (let k = 0; k < 16; k++) { g.beginPath(); g.arc(PV[0] + 6 + (hash(k) - 0.5) * 50, PV[1] + (hash(k + 9) - 0.5) * 84, 2.6, 0, 7); g.fill(); } g.restore(); }
      // obstrucția + presiunea retrogradă (săgeți spre amonte = spre calice)
      crossK(g, 640, 500, 22, PP(2, 1));
      const pr = P(2, 2.6, 1.2); [1, 2, 3].forEach((k) => { const [x, y] = C[k]; arrowK(g, [[lerp(PV[0], x, 0.2), lerp(PV[1], y, 0.2) - 26], [lerp(PV[0], x, 0.72), lerp(PV[1], y, 0.72) - 26]], K.warn, 5, pr, { alpha: b.i === 2 || b.i < 0 ? 1 : 0.35 }); });
      // etichete
      lead(g, 800, 250, PV[0] + 46, PV[1] - 50, 1); lab(g, 822, 232, 'bazinet', 1);
      lead(g, 760, 716, 712, 690, 1); lab(g, 800, 734, 'ureter', 1);
      lead(g, 120, 150, C[0][0] - 10, C[0][1] - 8, 1); lab(g, 108, 132, 'calice', 1);
      lead(g, 106, 716, C[4][0] + C[4][2] * (rc + 30), C[4][1] + C[4][3] * (rc + 30), 1); lab(g, 104, 734, 'papilă (piramidă)', 1);
      lab(g, 842, 318, 'calcul coraliform', P(1, 3.4), '#e6d3a4'); lead(g, 800, 334, PV[0] + 30, PV[1] - 10, P(1, 3.4));
      lab(g, 836, 500, 'obstrucție', PP(2, 1.2), K.warn);
      lab(g, 812, 560, 'presiune retrogradă', P(2, 3), K.warn);
      const tw0 = C[2][0] - rc; if (D > 0.02) { arrowK(g, [[tw0 - 8, 430], [KC[0] - 249, 430]], K.hi, 4, P(3, 4.2, 0.8), { head: 9 }); arrowK(g, [[KC[0] - 240, 446], [tw0 - 14, 446]], K.hi, 4, P(3, 4.2, 0.8), { head: 9 }); }
      lab(g, 150, 836, 'parenchim subțiat', P(3, 4.6), K.hi); lead(g, 150, 818, (tw0 + KC[0] - 255) / 2, 452, P(3, 4.6));
      lab(g, 126, 200, 'calice dilatate', P(3, 2.6), K.hi);
      extra(g, 470, 822, 'dilatarea apare în amonte de calcul', P(2, 3.6));
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: 898 }); g.restore();
    },
  };
}

/* ================= 3. BRONHOPNEUMONIA ================= */
export function bronho() {
  const HUB = [[352, 372], [648, 372]];
  // capetele bronhiolelor în plămânul din stânga imaginii (se oglindesc pentru celălalt): [x, y]
  const E = [[236, 300], [176, 430], [310, 492], [196, 580], [332, 640], [232, 716], [366, 756]];
  const mir = ([x, y]) => [1000 - x, y];
  const TR = new Path([[500, 70], [500, 250]], { n: 6 });
  const BR = [0, 1].map((s) => new Path([[500, 250], [s ? 590 : 410, 318], HUB[s]], { n: 8 }));
  const BL = [0, 1].map((s) => E.map((e) => { const p = s ? mir(e) : e; const h = HUB[s]; return new Path([h, [lerp(h[0], p[0], 0.5) + (s ? -1 : 1) * 14, lerp(h[1], p[1], 0.5) - 12], p], { n: 8 }); }));
  // focarele: [plămân, capăt, raza finală, punctul la care apare]
  const F = [[0, 3, 44, 1], [0, 4, 58, 2], [0, 5, 40, 1], [0, 6, 50, 2], [0, 2, 32, 2], [1, 3, 54, 1], [1, 4, 38, 2], [1, 5, 60, 2], [1, 6, 42, 1], [1, 1, 30, 2]];
  const caps = [
    [[0, 'microbii coboară pe trahee, bronhii și bronhiole'], [3.4, 'inflamația pornește din bronhii și bronhiole']],
    [[0, 'primele focare: în jurul bronhiolelor'], [2.8, 'apoi exsudatul umple alveolele vecine']],
    [[0, 'focare multe, de mărimi diferite, în ambii plămâni'], [3, 'mai ales în lobii inferiori; între ele, plămân aerat']],
    [[0, 'focarele vecine se unesc: bronhopneumonie confluentă']],
    [[0, 'infarctul pulmonar: o singură zonă, triunghiulară'], [3, 'bronhopneumonia: focare multiple, bilaterale']],
  ];
  return {
    home: HOME, beatDur: 8, anchors: [],
    phase: (i) => (i < 0 ? 'bronhopneumonie' : ['de la bronhii', 'în jurul bronhiolelor', 'multifocal, bilateral', 'confluare', 'nu e infarct'][i]),
    draw(g, t, b) {
      bgK(g, [[500, 500, 600, '#ff8fa0', 0.06]]);
      const P = (k, t0 = 0, d = 1) => (b.i < 0 ? 1 : sg(T(b, k), t0, d)); const PP = (k, t0 = 0) => (b.i < 0 ? 1 : pop(T(b, k), t0));
      // plămânii (aerați: roz, cu desen alveolar)
      [0, 1].forEach((s) => { const cx = s ? 716 : 284; ellK(g, cx, 540, 206, 300, K.lung, { ow: 7 }); g.save(); g.beginPath(); g.ellipse(cx, 540, 200, 294, 0, 0, 7); g.clip(); g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 2; for (let k = 0; k < 90; k++) { g.beginPath(); g.arc(cx - 200 + hash(k + s * 100) * 400, 246 + hash(k * 3 + 7 + s) * 590, 9, 0, 7); g.stroke(); } g.restore(); });
      // focarele de condensare (roșu închis), sub arborele bronșic
      const cf = P(3, 0.4, 3);
      F.forEach(([s, e, R, at], k) => { const p = s ? mir(E[e]) : E[e]; const g1 = at === 1 ? P(1, 0.3 + k * 0.1, 1.2) : 0, g2 = at === 1 ? P(1, 3 + k * 0.1, 2.4) : P(2, 0.3 + k * 0.15, 2.4), g3 = P(2, 0.6, 3); let r = at === 1 ? 15 * g1 + (R * 0.6 - 15) * g2 + R * 0.4 * g3 : R * g2; const join = (s === 0 && (e === 5 || e === 6)) || (s === 1 && (e === 3 || e === 5)); if (join) r += 26 * cf; if (r > 1) ellK(g, p[0], p[1], r, r * 0.92, '#8e1f2d', { ow: 4 }); });
      if (cf > 0.02) { [[E[5], E[6]], [mir(E[3]), mir(E[5])]].forEach(([p, q]) => { g.save(); g.globalAlpha = Math.min(1, cf * 1.4); g.strokeStyle = OUT; g.lineCap = 'round'; g.lineWidth = 70 * cf + 8; g.beginPath(); g.moveTo(...p); g.lineTo(...q); g.stroke(); g.strokeStyle = '#8e1f2d'; g.lineWidth = 70 * cf; g.stroke(); g.restore(); }); F.forEach(([s, e, R]) => { const join = (s === 0 && (e === 5 || e === 6)) || (s === 1 && (e === 3 || e === 5)); if (join) { const p = s ? mir(E[e]) : E[e]; ellK(g, p[0], p[1], R + 26 * cf - 3, (R + 26 * cf) * 0.92 - 3, '#8e1f2d', { ow: 0 }); } }); }
      // arborele bronșic
      [0, 1].forEach((s) => BL[s].forEach((p) => p.stroke(g, 9, '#f6e7d2', { ow: 6 })));
      BR.forEach((p) => p.stroke(g, 22, '#f6e7d2', { ow: 8 })); TR.stroke(g, 34, '#f6e7d2', { ow: 8 }); BR.forEach((p) => p.stroke(g, 22, '#f6e7d2', { ow: 0 }));
      g.save(); g.strokeStyle = 'rgba(42,21,52,.5)'; g.lineWidth = 3; for (let y = 92; y < 240; y += 24) { g.beginPath(); g.moveTo(486, y); g.lineTo(514, y); g.stroke(); } g.restore();
      // microbii coboară (o dată), apoi rămân la capetele bronhiolelor
      if (b.i === 0) [0, 1].forEach((s) => BL[s].forEach((p, k) => { const tt = T(b, 0); const d0 = 0.3 + k * 0.18 + s * 0.09; comet(g, TR, ln(tt, d0, 1), '#b58cff', 8, { glow: 0.6 }); comet(g, BR[s], ln(tt, d0 + 1, 0.9), '#b58cff', 8, { glow: 0.6 }); comet(g, p, ln(tt, d0 + 1.9, 1.1), '#b58cff', 7, { glow: 0.6, hold: true }); }));
      // etichete
      lab(g, 500, 44, 'trahee', 1, K.ink, 16); lab(g, 500, 318, 'bronhii', 1, K.ink, 16);
      if (b.i === 0) { lab(g, 760, 150, 'Streptococcus pneumoniae', pop(T(b, 0), 0.6), '#c9b3ff'); }
      const f0 = E[3]; lead(g, 96, 842, f0[0] - 20, f0[1] + 30, P(1, 3.4)); lab(g, 132, 860, 'focar de condensare', P(1, 3.4), '#ff9aa5');
      lead(g, 850, 842, 800, 470, P(2, 3.4)); lab(g, 850, 860, 'parenchim aerat', P(2, 3.4));
      lab(g, 500, 800, 'lobii inferiori', P(2, 3.8), K.hi);
      extra(g, 500, 846, 'exsudatul ia locul aerului din alveole', P(1, 4.2));
      lead(g, 500, 716, 320, 734, P(3, 2.6)); lab(g, 500, 700, 'confluare', P(3, 2.6), K.hi);
      // comparația cu infarctul (colț stânga-sus): o singură zonă triunghiulară, baza spre pleură, vârful spre hil
      const ci = P(4, 0.3, 0.8); if (ci > 0.01) { panel(g, 22, 44, 262, 178, { alpha: ci, fill: 'rgba(12,7,17,.92)', line: K.hi, lw: 3 }); ellK(g, 96, 138, 56, 70, K.lung, { ow: 5, alpha: ci }); const w = P(4, 1, 1.4); g.save(); g.globalAlpha = w; g.beginPath(); g.ellipse(96, 138, 54, 68, 0, 0, 7); g.clip(); g.beginPath(); g.moveTo(132, 140); g.lineTo(30, 104); g.lineTo(30, 176); g.closePath(); g.fillStyle = '#7a1524'; g.strokeStyle = OUT; g.lineWidth = 4; g.lineJoin = 'round'; g.stroke(); g.fill(); g.restore(); tx(g, 'infarct', 216, 84, 19, K.hi, { alpha: ci }); tx(g, 'o singură zonă,\ntriunghiulară,\nvârful spre hil', 216, 144, 15, K.ink, { alpha: P(4, 1.6, 0.8), w: 700 }); }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: 902 }); g.restore();
    },
  };
}

/* ================= 4. LEPTOMENINGITA PURULENTĂ ================= */
export function lepto() {
  const X0 = 40, X1 = 960, YA = 250, YS = 348, PER = 230;
  const caps = [
    [[0, 'sub os și dura mater: arahnoida, apoi pia mater, lipită de creier'], [3.6, 'arahnoida + pia mater = leptomeningele']],
    [[0, 'neutrofilele ies din vasele leptomeningelui'], [2.8, 'puroiul se adună în spațiul meningeal și intră în șanțuri']],
    [[0, 'exsudatul acoperă suprafața creierului'], [2.8, 'girusurile se aplatizează, șanțurile se îngustează']],
    [[0, 'pneumococul: puroi pe convexitate, „în șapcă”'], [3, 'meningococul: puroi la baza creierului']],
  ];
  return {
    home: HOME, beatDur: 8, anchors: [],
    phase: (i) => (i < 0 ? 'leptomeningită purulentă' : ['leptomeningele', 'puroiul', 'girusuri · șanțuri', 'unde stă puroiul'][i]),
    draw(g, t, b) {
      bgK(g, [[500, 400, 600, '#d8d36a', 0.05]]);
      const P = (k, t0 = 0, d = 1) => (b.i < 0 ? 1 : sg(T(b, k), t0, d)); const PP = (k, t0 = 0) => (b.i < 0 ? 1 : pop(T(b, k), t0));
      const Fn = P(2, 0.6, 3.6), pus = P(1, 1.4, 3.6);
      // suprafața creierului: girusuri (bombate) și șanțuri (adânci); Fn = aplatizare + îngustare
      const surf = (x) => { const u = (x - X0) / PER; const fr = u - Math.floor(u); const dS = Math.min(fr, 1 - fr) * PER; const wS = lerp(30, 13, Fn); return YS - lerp(30, 7, Fn) * Math.pow(Math.sin(Math.PI * fr), 0.7) + 210 * Math.exp(-((dS / wS) ** 2)); };
      const sp = () => { const p = new Path2D(); p.moveTo(X0, 860); for (let x = X0; x <= X1; x += 4) p.lineTo(x, surf(x)); p.lineTo(X1, 860); p.closePath(); return p; };
      g.save(); g.beginPath(); g.rect(X0, 96, X1 - X0, 764); g.clip();
      // os + dura
      g.fillStyle = '#e9dcc0'; g.fillRect(X0, 100, X1 - X0, 96); g.fillStyle = 'rgba(160,140,100,.5)'; for (let k = 0; k < 60; k++) { g.beginPath(); g.ellipse(X0 + hash(k) * (X1 - X0), 112 + hash(k + 5) * 72, 9, 5, 0, 0, 7); g.fill(); }
      g.fillStyle = '#8fa3c8'; g.fillRect(X0, 196, X1 - X0, 40); g.strokeStyle = OUT; g.lineWidth = 5; for (const y of [100, 196, 236]) { g.beginPath(); g.moveTo(X0, y); g.lineTo(X1, y); g.stroke(); }
      // spațiul meningeal: lichid (albăstrui) → puroi (galben-verzui), de la arahnoidă până în fundul șanțurilor
      const space = new Path2D(); space.moveTo(X0, YA); space.lineTo(X1, YA); for (let x = X1; x >= X0; x -= 4) space.lineTo(x, surf(x)); space.closePath();
      g.fillStyle = '#12202e'; g.fill(space); g.globalAlpha = 0.5 * (1 - pus); g.fillStyle = '#bfe3f5'; g.fill(space); g.globalAlpha = pus; g.fillStyle = '#d8d36a'; g.fill(space); g.globalAlpha = 1;
      // trabeculele arahnoidei + arahnoida
      g.strokeStyle = 'rgba(201,179,255,.75)'; g.lineWidth = 3; for (let x = X0 + 30; x < X1; x += 46) { const ys = surf(x); if (ys < YS + 30) { g.beginPath(); g.moveTo(x, YA); g.lineTo(x + 8, ys); g.stroke(); } }
      g.strokeStyle = OUT; g.lineWidth = 11; g.beginPath(); g.moveTo(X0, YA); g.lineTo(X1, YA); g.stroke(); g.strokeStyle = '#c9b3ff'; g.lineWidth = 6; g.stroke();
      // creierul + pia mater (urmează suprafața, intră în șanțuri)
      const br = sp(); g.fillStyle = '#f2b0c8'; g.fill(br); g.strokeStyle = OUT; g.lineWidth = 10; g.stroke(br); g.strokeStyle = '#ff7fc2'; g.lineWidth = 4.5; g.stroke(br);
      g.restore();
      // vasele din spațiul meningeal + neutrofilele care ies (puroiul)
      [0, 1, 2, 3].forEach((j) => { const x = X0 + PER * (j + 0.5), y = lerp(288, 296, Fn); ellK(g, x, y, 15, 12, K.blood, { ow: 4 }); for (let k = 0; k < 9; k++) { const a = hash(j * 20 + k) * TAU, r = 22 + hash(j * 9 + k * 3) * 70; const u = P(1, 0.3 + k * 0.16, 1.6); const px = x + Math.cos(a) * r * u * 1.3, py = clamp(y + Math.abs(Math.sin(a)) * r * 0.2 * u + 4, YA + 12, 318); mol(g, px, py, 7, '#f1f0c0', { alpha: u * (1 - 0.4 * pus), ow: 2 }); } });
      // etichetele straturilor (în stânga, pe strat)
      const L = (y, s, a = 1, c = K.ink) => chip(g, 150, y, s, { size: 16, alpha: a, col: c, line: c === K.ink ? 'rgba(255,255,255,.3)' : c, lw: 2.5 });
      L(148, 'os'); L(216, 'dura mater'); lab(g, 800, 250, 'arahnoida', 1, '#c9b3ff', 16);
      lead(g, 800, 420, X0 + PER * 3 + 34, 400, 1); lab(g, 838, 438, 'pia mater', 1, '#ff9dd0', 16);
      lab(g, 500, 826, 'creier', 1, K.ink, 16);
      lab(g, X0 + PER * 1.5, 440, 'girus', 1, K.ink, 16); lead(g, 150, 590, X0 + PER - 4, 500, 1); lab(g, 140, 606, 'șanț', 1, K.ink, 16);
      if (b.i <= 0) { const a = b.i < 0 ? 1 : P(0, 3.6, 0.8); g.save(); g.globalAlpha = a; g.strokeStyle = K.hi; g.lineWidth = 4; g.beginPath(); g.moveTo(928, 244); g.lineTo(944, 244); g.lineTo(944, 420); g.lineTo(928, 420); g.stroke(); g.restore(); lab(g, 800, 334, 'leptomeningele', a, K.hi, 17); }
      lead(g, 500, 546, X0 + PER * 2, 452, P(1, 4.2)); lab(g, 500, 562, 'puroi în spațiul meningeal', P(1, 4.2), '#f1f0a0', 17);
      extra(g, 520, 66, 'spațiul meningeal = subarahnoidian', P(1, 4.6));
      if (Fn > 0.02) { lab(g, X0 + PER * 2.5, 480, 'girus aplatizat', P(2, 3.6), K.hi, 16); lab(g, 850, 600, 'șanț îngustat', P(2, 4), K.hi, 16); lead(g, 850, 584, X0 + PER * 3 + 6, 520, P(2, 4)); }
      // unde stă puroiul: două creiere mici (secțiune frontală)
      const ci = P(3, 0.3, 0.8); if (ci > 0.01) { panel(g, 220, 606, 560, 190, { alpha: ci, fill: 'rgba(12,7,17,.94)', line: K.hi, lw: 3 }); [[360, 0], [640, 1]].forEach(([cx, base]) => { const cy = 690; const a2 = base ? P(3, 3, 1.2) : P(3, 0.8, 1.2); g.save(); g.globalAlpha = ci; const dome = new Path2D(); dome.moveTo(cx - 84, cy + 44); dome.bezierCurveTo(cx - 96, cy - 70, cx + 96, cy - 70, cx + 84, cy + 44); dome.quadraticCurveTo(cx, cy + 62, cx - 84, cy + 44); g.fillStyle = '#f2b0c8'; g.strokeStyle = OUT; g.lineWidth = 5; g.fill(dome); g.stroke(dome); g.strokeStyle = 'rgba(42,21,52,.6)'; g.lineWidth = 3; g.beginPath(); g.moveTo(cx, cy - 40); g.lineTo(cx, cy + 20); g.stroke(); g.globalAlpha = ci * a2; g.strokeStyle = '#d8d36a'; g.lineWidth = 13; g.lineCap = 'round'; g.beginPath(); if (base) { g.moveTo(cx - 70, cy + 50); g.quadraticCurveTo(cx, cy + 66, cx + 70, cy + 50); } else { g.moveTo(cx - 80, cy - 4); g.bezierCurveTo(cx - 70, cy - 62, cx + 70, cy - 62, cx + 80, cy - 4); } g.stroke(); g.restore(); tx(g, base ? 'meningococ: la bază' : 'pneumococ: „în șapcă”', cx, 770, 17, base ? K.ink : K.hi, { alpha: ci * a2 }); }); }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: 902 }); g.restore();
    },
  };
}
