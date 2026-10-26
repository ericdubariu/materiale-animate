// Părțile C și D: șanțurile (sinusul cervical), membranele (timpanul), pungile și glandele lor.
import {
  cam, HOME, C, bg, P, on, loopT, txt, pill, curve, at, sub, tube, flow, dot, ell, arr, ring, lead, OUT, clamp, lerp, ease, paint, smooth, REDUCED, srand, rr,
  ARC, ARCS, ARCS_, ARCL, L, G, sp, nerve, artery, bar, muscle, thymus, para, tonsil, thyroid, heart, pharynxSec, pharynxGeo,
} from './ka.js';
import { lupa } from './sA.js';

/* =================================================== ȘANȚURILE → SINUSUL CERVICAL (secțiune laterală, exteriorul = stânga)
   Se vede: suprafața externă a gâtului embrionar (ECTODERM albastru) cu arcurile 1, 2, 3, 4, 6 ca proeminențe de sus în jos
   (colorate pe ARC) și, sub ele, creasta epicardică (deasupra inimii). Între arcuri, 4 șanțuri (invaginări de ectoderm spre interior).
   La dreapta, în profunzime, faringele (ENDODERM galben) cu pungile 1–4 la aceleași niveluri.
   1 = șanțurile se adâncesc; 2 = arcul 2 (roz) crește în jos ca un capac, pe dinafara arcurilor 3, 4, 6; 3 = capacul fuzionează cu
   creasta epicardică → șanțurile 2–4 rămân închise într-o cavitate căptușită cu ectoderm = SINUSUL CERVICAL; 4 = sinusul se micșorează
   până dispare (gâtul neted); șanțul 1 rămâne și se adâncește → meatul acustic extern.
   mode 'persist' (cazul): capacul a fuzionat, dar sinusul NU dispare; are un orificiu spre piele pe linia de fuziune (jos),
   prin care curge secreție; ± un traiect spre faringe la nivelul pungii 2 (fosa amigdaliană). */
const YB = [280, 395, 495, 578];
function surfPts(cl, d, cl1) {
  const c = cl * (1 - d); const tip = [lerp(400, 520, cl1), lerp(400, 458, c), lerp(400, 452, c), lerp(400, 445, c)];
  return [[390, 100], [350, 150], [302, 220], [340, 262], [392, 272], [tip[0], 280], [392, 288], [350, 300], [310, 340], [350, 378], [394, 387], [tip[1], 395], [394, 403], [360, 414], [330, 450], [360, 482], [396, 489], [tip[2], 495], [396, 501], [370, 510], [345, 540], [370, 568], [398, 573], [tip[3], 578], [398, 583], [380, 594], [362, 615], [385, 640], [398, 664], [380, 694], [330, 730], [380, 772], [398, 860]];
}
const OFF = [-9999, -9999];
export function sinusScene(mode) {
  const persist = mode === 'persist';
  return () => { let BI = -1; return {
    home: HOME, cams: (persist ? [0, 1, 2] : [0, 1, 2, 3]).map(() => HOME),
    anchors: persist ? [[250, 722], [300, 520], () => (BI === 2 || BI < 0 ? [470, 440] : OFF)] : [[250, 300], [240, 420], [250, 720], [250, 600]],
    phase: (i) => (persist ? ['orificiul extern', 'sinusul cervical persistent', 'comunicarea → fistulă'][i] || 'baza embriologică' : ['4 șanțuri de ectoderm', 'arcul 2 crește în jos', 'fuziune → sinusul cervical', 'sinusul dispare'][i] || 'arcul 2 închide șanțurile 2–4'),
    draw(g, t, b) {
      bg(g); BI = b.i;
      let cl, gr, fu, d;
      if (persist) { cl = 1; gr = 1; fu = 1; d = 0; }
      else { const p = P(b, t, 4, 0.7); cl = b.i < 0 ? 1 : lerp(0.35, 1, p(0)); gr = p(1); fu = p(2); d = p(3); }
      const cl1 = cl * 0.5 + d * 0.5;
      const S = curve(surfPts(cl, d, cl1), 6);
      // țesutul (mezenchim) + arcurile colorate
      const tis = new Path2D(); tis.moveTo(S[0][0], S[0][1]); S.forEach((q) => tis.lineTo(q[0], q[1])); tis.lineTo(1000, 860); tis.lineTo(1000, 100); tis.closePath();
      g.save(); g.fillStyle = L.mes; g.fill(tis); g.clip(tis);
      [[1, 220], [2, 340], [3, 450], [4, 540], [6, 615]].forEach(([k, y]) => { g.fillStyle = ARC[k]; g.globalAlpha = 0.85; g.beginPath(); g.ellipse(360, y, 90, k === 1 ? 46 : k === 2 ? 40 : 30, 0, 0, 7); g.fill(); });
      g.globalAlpha = 0.85; g.fillStyle = '#eaa39a'; g.beginPath(); g.ellipse(400, 732, 90, 46, 0, 0, 7); g.fill(); g.restore();
      // faringele în profunzime (dreapta) cu pungile
      const ph = curve([[900, 100], [900, 250], [900, 860]], 4);
      g.save(); g.fillStyle = 'rgba(58,38,32,.85)'; g.fillRect(900, 100, 100, 760); g.restore();
      tube(g, [[900, 100], [900, 860]], 12, L.endo, { ow: 5 });
      YB.forEach((y, j) => { tube(g, [[900, y], [lerp(900, 790, 1 - j * 0.08), y]], 22 - j * 2, L.endo, { ow: 5 }); tube(g, [[900, y], [lerp(900, 800, 1 - j * 0.08), y]], 8, '#3a2620', { ow: 0 }); });
      // ectodermul de suprafață
      const sp1 = new Path2D(); sp1.moveTo(S[0][0], S[0][1]); S.forEach((q) => sp1.lineTo(q[0], q[1]));
      g.save(); g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 16; g.stroke(sp1); g.strokeStyle = L.ecto; g.lineWidth = 10; g.stroke(sp1); g.restore();
      // capacul arcului 2 (operculul): crește în jos pe dinafara arcurilor 3, 4, 6, apoi fuzionează cu creasta epicardică
      if (gr > 0.01) {
        const tipY = lerp(372, 712, gr) + 18 * fu; const ox = (y) => 296 - 8 * Math.sin(clamp((y - 360) / 360) * Math.PI) + (y > 680 ? (y - 680) * 0.6 * fu : 0);
        const minX = (y) => { let m = 999; S.forEach((q) => { if (Math.abs(q[1] - y) < 9) m = Math.min(m, q[0]); }); return m === 999 ? 380 : m; };
        const ix = (y) => lerp(ox(y) + 30, minX(y) - 6, d);
        const out = [], inn = [];
        for (let y = 350; y <= tipY; y += 10) out.push([ox(y), y]);
        for (let y = tipY; y >= 384; y -= 10) inn.push([ix(y), y]);
        const flapPts = [[330, 300], ...out, [ox(tipY) + 14, tipY + 10], ...inn, [352, 378]];
        // cavitatea (sinusul) dintre capac și arcurile 3–6: căptușită cu ectoderm
        if (fu > 0.02 && d < 0.99) {
          const cav = [...inn.slice().reverse().map(([x, y]) => [x, y]), ...S.filter((q) => q[1] > 384 && q[1] < tipY).reverse()];
          const cp = new Path2D(); cp.moveTo(cav[0][0], cav[0][1]); cav.forEach((q) => cp.lineTo(q[0], q[1])); cp.closePath();
          g.save(); g.globalAlpha = fu * (1 - d); g.fillStyle = 'rgba(91,155,240,.30)'; g.fill(cp); g.restore();
        }
        const fp = smooth(flapPts);
        paint(g, fp, ARC[2], ARCS_[2], ARCL[2], [280, 300, 120, tipY - 290], OUT, 0);
        g.save(); g.clip(fp); g.globalAlpha = 0.25; g.fillStyle = L.mes; g.fillRect(0, 0, 1000, 934); g.restore();
        const op = new Path2D(); op.moveTo(330, 300); out.forEach((q) => op.lineTo(q[0], q[1])); op.lineTo(ox(tipY) + 14, tipY + 10);
        const ip = new Path2D(); ip.moveTo(ox(tipY) + 14, tipY + 10); inn.forEach((q) => ip.lineTo(q[0], q[1])); ip.lineTo(352, 378);
        g.save(); g.lineJoin = 'round'; g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 14; g.stroke(op); g.strokeStyle = L.ecto; g.lineWidth = 8; g.stroke(op);
        g.globalAlpha = 1 - d; g.strokeStyle = OUT; g.lineWidth = 14; g.stroke(ip); g.strokeStyle = L.ecto; g.lineWidth = 8; g.stroke(ip); g.restore();
        if (fu > 0.5 && !persist) { g.save(); g.globalAlpha = sp(fu, 0.5, 1); g.fillStyle = '#eaa39a'; g.beginPath(); g.ellipse(326, tipY + 4, 16, 12, 0, 0, 7); g.fill(); g.restore(); }
        if (persist) { // orificiul pe linia de fuziune + secreția
          const ex = ox(tipY) - 2, ey = tipY + 6; ell(g, ex, ey, 10, 8, '#2a1520', { ow: 3 });
          if (b.i >= 0) { srand(4); for (let k = 0; k < 5; k++) { const u = loopT(t + k * 0.5, 2.5); dot(g, ex - 10 - u * 120, ey + 14 + u * 40 + Math.sin(u * 6 + k) * 6, 6, '#f4e27a', { alpha: (b.i === 2 ? 1 : 0.6) * (1 - u), ow: 2 }); } }
          if (b.i === 2 || b.i < 0) { const tr = curve([[372, 430], [520, 410], [700, 398], [790, 396]], 10); g.save(); g.globalAlpha = b.i === 2 ? ease(clamp(b.bt / 2)) * 0.9 : 0.5; g.setLineDash([10, 8]); g.strokeStyle = C.hi; g.lineWidth = 5; g.beginPath(); g.moveTo(tr[0][0], tr[0][1]); tr.forEach((q) => g.lineTo(q[0], q[1])); g.stroke(); g.restore(); txt(g, '± traiect spre faringe\n(fosa amigdaliană)', 560, 350, 15, C.hi, { alpha: b.i === 2 ? 1 : 0.6 }); }
        }
      }
      // etichetele
      ARCS.forEach((k, i) => txt(g, String(k), 360, [220, 340, 450, 540, 615][i] + 2, k > 2 ? 20 : 24, OUT, { stroke: false, w: 900, alpha: k >= 3 ? 1 - 0.7 * d : 1 }));
      txt(g, 'creasta\nepicardică', 470, 760, 16, '#ffd6c4'); txt(g, 'exterior', 150, 130, 17, L.ectoL); txt(g, 'faringe\n(endoderm)', 950, 112, 15, L.endo);
      YB.forEach((y, j) => txt(g, `punga ${j + 1}`, 740, y - 26, 14, '#fff0b8', { alpha: 0.85 }));
      if (!persist) {
        if (b.i === 0 || b.i < 0) YB.forEach((y, j) => txt(g, `șanț ${j + 1}`, 200, y, 16, L.ectoL, { alpha: 1, align: 'center' }));
        if (gr > 0.2 && fu < 0.5) txt(g, 'arcul 2 crește în jos', 170, 470, 17, ARCL[2], { alpha: sp(gr, 0.2, 0.6) });
        if (fu > 0.4 && d < 0.6) { txt(g, 'sinusul cervical', 200, 500, 18, '#bcd4ff', { alpha: sp(fu, 0.4, 0.9) * (1 - d) }); lead(g, 250, 506, 330, 510, sp(fu, 0.4, 0.9) * (1 - d)); }
        if (d > 0.4) { txt(g, 'gâtul neted', 170, 520, 18, '#ffd6c4', { alpha: sp(d, 0.4, 0.9) }); txt(g, 'meatul acustic extern', 160, 232, 16, L.ectoL, { alpha: sp(d, 0.4, 0.9) }); lead(g, 300, 252, 430, 280, sp(d, 0.4, 0.9)); }
      } else {
        txt(g, 'sinusul cervical\nnu a dispărut', 170, 470, 17, '#bcd4ff'); lead(g, 230, 490, 330, 510, 1);
        txt(g, 'orificiul\n(linia de fuziune)', 150, 780, 16, C.hi);
      }
      const e = ease(b.bt * 1.4);
      if (persist) {
        if (b.i === 0) ring(g, 300, 724, 50, 40, e);
        if (b.i === 1) ring(g, 340, 545, 70, 170, e);
        if (b.i === 2) ring(g, 520, 560, 330, 230, e);
      } else {
        if (b.i === 0) ring(g, 420, 430, 110, 200, e);
        if (b.i === 1) ring(g, 300, 520, 70, 220, e);
        if (b.i === 2) ring(g, 330, 560, 80, 190, e);
        if (b.i === 3) ring(g, 360, 470, 140, 270, e);
      }
    },
  }; };
}
export const clefts = sinusScene('normal');
export const caseEmb = sinusScene('persist');

/* =================================================== MEMBRANA 1 → TIMPANUL (secțiune prin urechea în formare, exteriorul = stânga)
   Se vede: stânga, suprafața (ECTODERM albastru); șanțul 1 se adâncește ca un canal = meatul acustic extern (căptușit cu ectoderm).
   Din faringe (jos-dreapta, ENDODERM galben) urcă punga 1: partea îngustă = tuba auditivă, capătul lărgit = cavitatea timpanică.
   Unde fundul meatului atinge cavitatea: membrana = timpanul, din 3 straturi: ecto (exterior) · mezo (mijloc, subțire) · endo (interior).
   În cavitate, oscioarele: ciocanul + nicovala (arcul 1, teal), scărița (arcul 2, roz).
   1 = meatul crește spre interior; 2 = zoom: stratul de mezoderm dintre meat și pungă; 3 = zoom: stratul de endoderm (din punga 1);
   4 = punga 1 se lărgește în cavitate + tubă; oscioarele apar; timpanul complet. */
export function membrane() {
  let BI = -1; const MY = 420, MX = 540; const ZC = cam(MX + 4, MY, 2.3);
  return {
    home: HOME, cams: [HOME, ZC, ZC, HOME],
    // la zoom (punctele 2, 3) badge-urile stau lângă straturi; altfel lângă meat / tubă, departe de etichete
    anchors: [[300, MY - 90], () => (BI === 1 || BI === 2 ? [MX + 4, MY + 80] : [MX - 80, MY + 74]), () => (BI === 1 || BI === 2 ? [MX + 34, MY - 78] : [MX + 6, MY + 150]), [800, 640]],
    phase: (i) => ['ectodermul: meatul (șanțul 1)', 'mezodermul: la mijloc, subțire', 'endodermul: din punga 1', 'punga 1 → cavitatea + tuba'][i] || 'timpan = 3 straturi',
    draw(g, t, b) {
      BI = b.i;
      bg(g); const p = P(b, t, 4);
      const mg = b.i === 0 ? lerp(0.15, 1, p(0)) : 1; const cav = b.i < 0 ? 1 : p(3);
      // țesutul
      const tis = new Path2D(); tis.rect(250, 90, 750, 820); g.save(); g.fillStyle = L.mes; g.fill(tis); g.restore();
      // pavilionul (exterior, schematic)
      ell(g, 236, MY, 40, 130, '#f0b694', { shade: L.skinS, light: L.skinL, ow: 5 });
      // meatul acustic extern (ectoderm): canal din suprafață
      const xm = lerp(260, MX - 12, mg);
      g.save(); g.fillStyle = '#2a2030'; g.fillRect(250, MY - 38, xm - 250, 76); g.restore();
      tube(g, [[250, MY - 42], [xm, MY - 42]], 10, L.ecto, { ow: 5, cap: 'butt' }); tube(g, [[250, MY + 42], [xm, MY + 42]], 10, L.ecto, { ow: 5, cap: 'butt' });
      tube(g, [[250, 90], [250, MY - 42]], 10, L.ecto, { ow: 5 }); tube(g, [[250, MY + 42], [250, 900]], 10, L.ecto, { ow: 5 });
      // punga 1: tuba auditivă (de la faringe) + cavitatea timpanică
      const tubeP = [[900, 860], [800, 700], [690, 560], [MX + 70, MY + 30]];
      tube(g, tubeP, lerp(34, 46, cav), L.endo, { ow: 5 }); tube(g, tubeP, lerp(14, 22, cav), '#3a2620', { ow: 0 });
      const cv = new Path2D(); const cw = lerp(40, 150, cav), ch = lerp(40, 110, cav); cv.ellipse(MX + 22 + cw * 0.5, MY, cw * 0.5 + 6, ch * 0.5, 0, 0, 7);
      paint(g, cv, '#3a2620', null, null, [MX, MY - ch / 2, cw, ch], L.endo, 10);
      g.save(); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(cv); g.restore();
      tube(g, [[920, 830], [990, 900]], 60, L.endo, { ow: 5, alpha: 0.8 }); txt(g, 'faringe', 930, 790, 16, L.endo);
      // membrana (timpanul): 3 straturi între meat și cavitate
      if (mg > 0.95) {
        const x0 = MX - 12; const lay = [[L.ecto, 0, 1], [L.meso, 1, b.i === 1 ? 1 : b.i < 0 || b.i > 1 ? 1 : 0.7], [L.endo, 2, b.i === 2 ? 1 : b.i < 0 || b.i > 2 ? 1 : 0.7]];
        lay.forEach(([c, k, a]) => { const pp = new Path2D(); pp.roundRect(x0 + k * 11, MY - 44, 11, 88, 4); g.save(); g.globalAlpha = a; paint(g, pp, c, null, null, [x0 + k * 11, MY - 44, 11, 88], OUT, 2); g.restore(); });
        if (b.i === 1 || b.i === 2) { const k = b.i; g.save(); g.shadowColor = C.hi; g.shadowBlur = 16; g.strokeStyle = C.hi; g.lineWidth = 2.5; g.strokeRect(x0 + k * 11 - 1, MY - 46, 13, 92); g.restore(); }
      }
      // oscioarele
      if (cav > 0.4) { const a = sp(cav, 0.4, 1); g.save(); g.globalAlpha = a; const ox = MX + 30, oy = MY;
        const ml = new Path2D(); ml.moveTo(ox - 4, oy + 30); ml.lineTo(ox + 4, oy - 26); ml.quadraticCurveTo(ox + 14, oy - 46, ox + 30, oy - 34); ml.lineTo(ox + 14, oy - 14); ml.closePath(); paint(g, ml, ARC[1], ARCS_[1], ARCL[1], [ox - 4, oy - 46, 34, 76], OUT, 3);
        const ic = new Path2D(); ic.moveTo(ox + 30, oy - 36); ic.quadraticCurveTo(ox + 56, oy - 44, ox + 62, oy - 20); ic.lineTo(ox + 52, oy + 10); ic.lineTo(ox + 40, oy - 16); ic.closePath(); paint(g, ic, ARC[1], ARCS_[1], ARCL[1], [ox + 30, oy - 44, 32, 54], OUT, 3);
        const st = new Path2D(); st.moveTo(ox + 52, oy + 10); st.lineTo(ox + 104, oy - 4); st.lineTo(ox + 106, oy + 30); st.closePath(); paint(g, st, ARC[2], ARCS_[2], ARCL[2], [ox + 52, oy - 4, 54, 34], OUT, 3); g.restore();
        txt(g, 'ciocan + nicovală (arcul 1)', MX + 196, MY - 34, 15, ARCL[1], { alpha: a, align: 'left' }); txt(g, 'scărița (arcul 2)', MX + 196, MY - 6, 15, ARCL[2], { alpha: a, align: 'left' }); }
      // etichete (la zoom: mici în lume)
      const z = b.i === 1 || b.i === 2;
      if (z) { const sz = 9; txt(g, 'ecto', MX - 7, MY - 58, sz, L.ectoL); txt(g, 'mezo', MX + 4, MY + 58, sz, '#ffc0b6'); txt(g, 'endo', MX + 16, MY - 58, sz, L.endo); txt(g, 'meatul', MX - 50, MY, sz, L.ectoL); txt(g, 'punga 1', MX + 54, MY + 22, sz, L.endo); }
      else { txt(g, 'meatul acustic extern\n(șanțul 1)', 400, MY - 110, 16, L.ectoL, { alpha: mg }); txt(g, 'timpanul', MX, MY + 96, 17, C.hi, { alpha: mg > 0.95 ? 1 : 0 }); txt(g, 'cavitatea timpanică', MX + 22 + cw * 0.5, MY - ch * 0.5 - 22, 16, L.endo, { alpha: cav }); txt(g, 'tuba auditivă', 790, 610, 16, L.endo, { alpha: Math.max(0.5, cav), align: 'left' }); txt(g, 'exterior (piele)', 140, 160, 15, '#ffd6c4'); }
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, 400, MY, 160, 70, e);
      if (b.i === 1) ring(g, MX + 5, MY, 14, 52, e);
      if (b.i === 2) ring(g, MX + 16, MY, 14, 52, e);
      if (b.i === 3) ring(g, 700, 560, 220, 230, e);
    },
  };
}

/* =================================================== PUNGILE ȘI CE DAU (S5–S6, în loc): secțiune frontală, partea dreaptă mărită
   Se vede: faringele (stânga, lumen) cu pungile 1–4 de sus în jos între arcurile 1, 2, 3, 4, 6 (arcuri mai stinse, culorile ARC).
   Din fiecare pungă crește derivatul ei, în loc (încă nu au migrat): 1 = punga se alungește și se lărgește la capăt (tuba +
   cavitatea timpanică, endoderm galben); 2 = în peretele pungii apare amigdala palatină (orhidee); 3 = din capătul pungii se desprind
   paratiroida III (cyan, sus) și timusul (crem, jos, alungit); 4 = paratiroida IV (cyan) + corpul ultimobranhial (indigo). */
export function pouches() {
  const O = { cx: 150, y0: 110, step: 140, hs: 1.22, sides: [1] };
  const Gm = pharynxGeo(O); const X = (d) => Gm.cx + d;
  const pt = Gm.pTip.map((d) => X(d)); const yb = Gm.yB;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[pt[0] + 110, yb[0] - 56], [pt[1] + 90, yb[1] - 50], [pt[2] + 110, yb[2] - 56], [pt[3] + 110, yb[3] + 60]],
    phase: (i) => ['punga 1 → tuba + cavitatea timpanică', 'punga 2 → amigdala palatină', 'punga 3 → paratiroida inf. + timus', 'punga 4 → paratiroida sup. + UB'][i] || 'fiecare pungă, alt derivat',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      pharynxSec(g, t, { ...O, col: true, dim: () => 0.5, comp: 0.6 }); tube(g, [[Gm.cx - Gm.inner, 110], [Gm.cx - Gm.inner, 830]], 9, L.endo, { ow: 6 });
      ARCS.forEach((k, i) => txt(g, String(k), X((Gm.inner + Gm.out[i]) / 2 + 30), Gm.yA[i], 22, OUT, { stroke: false, w: 900, alpha: 0.7 }));
      const al = (k) => (b.i < 0 || b.i === k ? 1 : 0.55);
      // 1: tuba + cavitatea timpanică
      { const q = p(0); g.save(); g.globalAlpha = al(0); tube(g, [[pt[0] - 60, yb[0]], [pt[0] + 10 * q, yb[0] - 4]], 30, L.endo, { ow: 5 }); tube(g, [[pt[0] - 60, yb[0]], [pt[0] + 10 * q, yb[0] - 4]], 12, '#3a2620', { ow: 0 }); ell(g, pt[0] + 10 * q + 26, yb[0] - 8, 18 + 26 * q, 16 + 18 * q, L.endo, { shade: L.endoS, light: L.endoL, ow: 5 }); ell(g, pt[0] + 10 * q + 26, yb[0] - 8, 8 + 14 * q, 7 + 9 * q, '#3a2620', { ow: 0 }); g.restore(); }
      // 2: amigdala în peretele pungii 2
      { const q = p(1); [[-1], [1]].forEach(([s]) => tonsil(g, X(Gm.inner + 84), yb[1] + s * 26, 52 * q + 6, 16 * q + 3, 0, { alpha: al(1) * clamp(q * 2) })); }
      // 3: paratiroida III (sus) + timusul (jos, alungit)
      { const q = p(2); g.save(); g.globalAlpha = al(2); thymus(g, [[pt[2] - 4, yb[2] + 18], [pt[2] + 10, yb[2] + 18 + 50 * q], [pt[2] - 4, yb[2] + 18 + 110 * q]], 18 + 18 * q); para(g, pt[2] + 8, yb[2] - 30, 10 + 14 * q, { label: q > 0.6 ? 'III' : '' }); g.restore(); }
      // 4: paratiroida IV (sus) + corpul ultimobranhial (jos)
      { const q = p(3); g.save(); g.globalAlpha = al(3); para(g, pt[3] + 10, yb[3] - 28, 10 + 14 * q, { label: q > 0.6 ? 'IV' : '' }); ell(g, pt[3] + 18, yb[3] + 30, 10 + 14 * q, 9 + 11 * q, G.ub, { shade: G.ubS, ow: 4 }); g.restore(); }
      const lb = (s0, j, dy, c, k) => { const x = 640, y = yb[j] + dy; txt(g, s0, x, y, 17, c, { alpha: al(k), align: 'left' }); };
      lb('tuba auditivă +\ncavitatea timpanică', 0, -10, L.endo, 0); lead(g, 636, yb[0] - 10, pt[0] + 76, yb[0] - 8, al(0));
      lb('amigdala palatină', 1, 0, '#ffc8f4', 1); lead(g, 636, yb[1], X(Gm.inner + 140), yb[1], al(1));
      lb('paratiroida inferioară (III)\n+ timusul', 2, 0, '#bdf4fa', 2); lead(g, 636, yb[2], pt[2] + 30, yb[2] - 10, al(2));
      lb('paratiroida superioară (IV)\n+ corpul ultimobranhial', 3, 20, '#c8ceff', 3); lead(g, 636, yb[3] + 20, pt[3] + 36, yb[3] + 10, al(3));
      txt(g, 'faringe', Gm.cx, 870, 17, '#fff0b8');
      const e = ease(b.bt * 1.4);
      [0, 1, 2, 3].forEach((j) => { if (b.i === j) ring(g, pt[j] - 10, yb[j] + (j === 2 ? 30 : 0), 120, j === 2 ? 100 : 60, e); });
    },
  };
}

/* =================================================== DE CE SE INVERSEAZĂ PARATIROIDELE (vedere frontală, o parte; cranial ↑)
   Se vede: faringele (tub vertical, endoderm galben) cu punga 3 (sus) și punga 4 (jos); lângă linia mediană, lobul tiroidian (zmeuriu).
   La început (S5–S6): paratiroida III (cyan) lipită de timus, la nivelul pungii 3 = MAI SUS decât paratiroida IV (punga 4).
   1 = poziția inițială; 2 = timusul (crem) se alungește în jos spre mediastin (inima jos) și o trage pe III după el; 3 = III trece pe lângă IV
   și se oprește la POLUL INFERIOR al tiroidei; timusul continuă în mediastin; 4 = IV, netrasă de nimic, se fixează la POLUL SUPERIOR. */
export function paraSwap() {
  const PX = 330, Y3 = 300, Y4 = 430; const TX = 600, TT = 400, TB = 590; // tiroida: pol sup. ~TT, pol inf. ~TB
  const IIIa = [PX + 120, Y3 - 6], IIIb = [TX + 92, TB + 4]; const IVa = [PX + 120, Y4], IVb = [TX + 70, TT + 4];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[IIIa[0] - 60, IIIa[1] - 50], [PX + 240, 760], [IIIb[0] + 70, IIIb[1] + 30], [IVb[0] + 70, IVb[1] - 50]],
    phase: (i) => ['S5–S6: III e mai sus', 'timusul coboară', 'III → polul inferior', 'IV → polul superior'][i] || 'S5–S6 → S7–S8',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const m = b.i < 0 ? ease(clamp(((t % 9) / 9) * 1.5)) : b.i === 0 ? 0 : b.i === 1 ? p(1) * 0.55 : b.i === 2 ? lerp(0.55, 1, p(2)) : 1; // migrarea
      const iv = b.i < 0 ? m : b.i < 3 ? 0 : p(3);
      // faringele + pungile 3, 4
      tube(g, [[PX, 80], [PX, 900]], 70, L.endo, { ow: 6 }); tube(g, [[PX, 80], [PX, 900]], 34, '#3a2620', { ow: 0 });
      tube(g, [[PX, Y3], [PX + 100, Y3]], 34, L.endo, { ow: 5 }); tube(g, [[PX, Y4], [PX + 100, Y4]], 34, L.endo, { ow: 5 });
      txt(g, 'punga 3', PX - 50, Y3, 16, L.endo, { align: 'right' }); txt(g, 'punga 4', PX - 50, Y4, 16, L.endo, { align: 'right' }); txt(g, 'faringe', PX, 920, 16, L.endo);
      // tiroida (lob) lângă linia mediană + inima (mediastin) jos
      thyroid(g, TX + 40, (TT + TB) / 2, 1.25, {});
      txt(g, 'tiroida', TX + 40, (TT + TB) / 2 + 2, 18, OUT, { stroke: false });
      txt(g, 'pol superior', TX + 190, TT - 6, 15, '#ffd0de', { align: 'left' }); txt(g, 'pol inferior', TX + 190, TB + 10, 15, '#ffd0de', { align: 'left' });
      heart(g, TX - 10, 850, 0.85, t, { alpha: 0.55 }); txt(g, 'mediastin', TX + 120, 860, 16, '#ffc0b6');
      // timusul: pleacă din punga 3 și coboară în mediastin
      const thTip = [lerp(IIIa[0] + 10, TX - 30, m), lerp(Y3 + 40, 800, m)];
      thymus(g, [[IIIa[0] + 6, Y3 + 16], [lerp(IIIa[0] + 20, TX - 90, m), lerp(Y3 + 30, 560, m)], thTip], 34);
      txt(g, 'timus', thTip[0] - 60, thTip[1], 17, '#fff4dc');
      // paratiroida III: trasă de timus (pe lateral, ca să treacă pe lângă IV) până la polul inferior
      // III ocolește tiroida pe lateral: coboară pe lângă IV (x ≈ 495, între faringe și lobul tiroidian), trece SUB lob, apoi se lipește de polul inferior
      const IIIc = [495, TB + 30]; const III = m < 0.75 ? [lerp(IIIa[0], IIIc[0], sp(m, 0, 0.75)), lerp(IIIa[1], IIIc[1], sp(m, 0, 0.75))] : [lerp(IIIc[0], IIIb[0], sp(m, 0.75, 1)), lerp(IIIc[1], IIIb[1], sp(m, 0.75, 1))];
      const IV = iv < 0.5 ? [lerp(IVa[0], 560, iv * 2), lerp(IVa[1], 360, iv * 2)] : [lerp(560, IVb[0], iv * 2 - 1), lerp(360, IVb[1], iv * 2 - 1)]; // pe deasupra lobului, nu prin el
      para(g, IV[0], IV[1], 20, { label: 'IV' }); para(g, III[0], III[1], 20, { label: 'III' });
      if (m > 0.05 && m < 0.95) arr(g, III[0] + 30, III[1] - 10, III[0] + 30, III[1] + 50, '#bdf4fa', 5, 0.8);
      if (b.i === 0 || b.i < 0) txt(g, 'III e mai SUS decât IV', 690, 230, 17, C.hi, { alpha: b.i < 0 ? 1 - m : 1 });
      if (m > 0.95) txt(g, 'III → INFERIOARĂ', IIIb[0] + 120, IIIb[1] + 44, 17, '#bdf4fa', { align: 'left' });
      if (iv > 0.9) txt(g, 'IV → SUPERIOARĂ', IVb[0] + 120, IVb[1] - 44, 17, '#bdf4fa', { align: 'left' });
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, IIIa[0], (Y3 + Y4) / 2, 70, 110, e);
      if (b.i === 1) ring(g, (IIIa[0] + TX) / 2, 600, 150, 240, e);
      if (b.i === 2) ring(g, III[0], III[1], 42, 42, e);
      if (b.i === 3) ring(g, IV[0], IV[1], 42, 42, e);
    },
  };
}

/* =================================================== POZIȚIA FINALĂ (figura din LP): faringele în vedere ventrală, ambele părți
   Se vede: faringele ca o pâlnie verticală (endoderm galben), cranial ↑; pe linia mediană sus, foramen cecum (baza limbii), din care
   tiroida (zmeurie) coboară pe linia mediană (ductul tireoglos, punctat) până pe gât. De fiecare parte, cele 4 pungi și derivatele:
   1 = cavitatea timpanică primitivă + tuba auditivă (galben), cu meatul acustic extern (albastru) din afară; 2 = amigdala palatină
   (orhidee) în perete; 3 = paratiroida inferioară (cyan) + timusul (crem), care coboară și se unește median, sub tiroidă;
   4 = paratiroida superioară (cyan) + corpul ultimobranhial (indigo), care se lipesc de tiroidă. Intro: tiroida coboară în buclă. */
export function finalPos() {
  const CX = 610; const Y = [190, 330, 450, 560]; const W = 120;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[CX - W - 150, Y[0] - 90], [CX - W - 70, Y[1] + 56], [CX + W + 40, Y[2] + 150], [CX + W + 40, Y[3] - 70]],
    phase: (i) => ['punga 1', 'punga 2', 'punga 3', 'punga 4'][i] || 'tiroida coboară din foramen cecum',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const al = (k) => (b.i < 0 || b.i === k ? 1 : 0.5);
      // faringele (pâlnie)
      const ph = smooth([[CX - W - 40, 110], [CX + W + 40, 110], [CX + W, 380], [CX + 74, 640], [CX + 60, 900], [CX - 60, 900], [CX - 74, 640], [CX - W, 380]]);
      paint(g, ph, '#4a3530', null, null, [CX - W - 40, 110, (W + 40) * 2, 790], L.endo, 12); g.save(); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(ph); g.restore();
      // pungile (de ambele părți)
      [-1, 1].forEach((s) => {
        Y.forEach((y, j) => { const wx = [W + 34, W + 10, W - 10, 70][j]; tube(g, [[CX + s * (wx - 30), y], [CX + s * (wx + 40), y - 6]], 30 - j * 3, L.endo, { ow: 5 }); });
        // 1: tuba + cavitatea + meatul
        g.save(); g.globalAlpha = al(0); tube(g, [[CX + s * (W + 60), Y[0] - 6], [CX + s * (W + 120), Y[0] - 30]], 30, L.endo, { ow: 5 }); ell(g, CX + s * (W + 150), Y[0] - 36, 36, 28, L.endo, { shade: L.endoS, ow: 5 }); tube(g, [[CX + s * (W + 186), Y[0] - 36], [CX + s * (W + 250), Y[0] - 36]], 22, L.ecto, { ow: 5 }); g.restore();
        // 2: amigdala
        tonsil(g, CX + s * (W + 6), Y[1] + 4, 16, 30, 0, { alpha: al(1) });
        // 3: paratiroida inf. + timusul (coboară, se unește median)
        const m3 = b.i < 0 ? 1 : b.i === 2 ? p(2) : b.i > 2 ? 1 : 0.4;
        g.save(); g.globalAlpha = al(2); thymus(g, [[CX + s * (W - 20), Y[2] + 10], [CX + s * lerp(W, 60, m3), lerp(Y[2] + 100, 700, m3)], [CX + s * lerp(W - 10, 24, m3), lerp(Y[2] + 180, 840, m3)]], 30); g.restore();
        para(g, CX + s * lerp(W + 10, 74, m3), lerp(Y[2] - 6, 612, m3), 15, { alpha: al(2) });
        // 4: paratiroida sup. + UB → pe tiroidă
        const m4 = b.i < 0 ? 1 : b.i === 3 ? p(3) : 0.5;
        para(g, CX + s * lerp(W - 6, 80, m4), lerp(Y[3] - 30, 548, m4), 15, { alpha: al(3) });
        ell(g, CX + s * lerp(W - 2, 62, m4), lerp(Y[3] + 6, 578, m4), 12, 10, G.ub, { shade: G.ubS, ow: 4, alpha: al(3) });
      });
      // tiroida: din foramen cecum, pe linia mediană, până pe gât
      const fc = [CX, 140]; dot(g, fc[0], fc[1], 9, '#2a1520', { ow: 3 }); txt(g, 'foramen cecum', CX, 96, 16, '#ffd0de');
      const dt = b.i < 0 ? ease(clamp((t % 8) / 5)) : 1;
      g.save(); g.setLineDash([8, 7]); g.strokeStyle = 'rgba(255,208,222,.85)'; g.lineWidth = 3.5; g.beginPath(); g.moveTo(fc[0], fc[1] + 10); g.lineTo(CX, lerp(150, 560, dt)); g.stroke(); g.restore();
      thyroid(g, CX, lerp(170, 580, dt), lerp(0.35, 0.95, dt), {});
      txt(g, 'tiroida', CX, lerp(170, 580, dt) + 76 * dt + 6, 17, '#ffd0de');
      if (dt < 0.98 || b.i < 0) txt(g, 'ductul tireoglos\n(manual)', CX + 12, 300, 14, '#ffd0de', { align: 'left', alpha: 0.85 });
      // etichete
      const lb = (s0, x, y, c, k, al2 = 'center') => txt(g, s0, x, y, 16, c, { alpha: al(k), align: al2 });
      lb('cavitatea timpanică\n+ tuba auditivă', CX + W + 150, Y[0] + 40, L.endo, 0); lb('meatul acustic\nextern', CX - W - 250, Y[0] + 30, L.ectoL, 0);
      lb('amigdala palatină', CX - W - 40, Y[1] + 4, '#ffc8f4', 1, 'right');
      lb('paratiroida inf.\n+ timusul', CX + W + 60, Y[2] + 200, '#bdf4fa', 2, 'left');
      lb('paratiroida sup.\n+ corpul ultimobranhial', CX + W + 60, Y[3] - 20, '#c8ceff', 3, 'left');
      lb('timusul (mediastin)', CX + 90, 880, '#fff4dc', 2, 'left');
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, CX - W - 140, Y[0] - 30, 90, 60, e);
      if (b.i === 1) ring(g, CX - W - 6, Y[1] + 4, 40, 50, e);
      if (b.i === 2) ring(g, CX, 700, 150, 170, e);
      if (b.i === 3) ring(g, CX, 560, 130, 50, e);
    },
  };
}
