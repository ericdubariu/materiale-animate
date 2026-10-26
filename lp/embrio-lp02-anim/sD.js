// Partea E (malformațiile), cazul clinic (1), capcanele.
import {
  cam, HOME, C, K, bg, P, on, loopT, txt, pill, curve, at, sub, tube, flow, dot, ell, arr, ring, lead, OUT, clamp, lerp, ease, paint, smooth, REDUCED, srand, rr,
  ARC, ARCS, ARCS_, ARCL, L, G, sp, nerve, artery, bar, muscle, thymus, para, tonsil, thyroid, heart, embryoLat, childHead, sagHead, skullLat, chromo, pharynxSec,
} from './ka.js';
import { lupa } from './sA.js';

// punctul curent al scenei desenate (pentru badge-urile care apar doar când structura lor e desenată)
let BI = -1; const OFF = [-9999, -9999];

/* =================================================== CHISTUL ȘI FISTULA BRANHIALĂ (secțiune schematică prin gât)
   Se vede: stânga pielea (ECTODERM albastru), dreapta faringele (ENDODERM galben) cu fosa amigdaliană (amigdala, orhidee) sus;
   între ele țesutul gâtului; sus-stânga unghiul mandibulei (os), jos-stânga SCM (bandă oblică, coral). Restul sinusului cervical
   (căptușit cu epiteliu, albastru) se transformă: 1 = CHIST: cavitate închisă sub unghiul mandibulei, pielea bombează deasupra
   (tumefacție laterală); 2 = FISTULĂ SPRE EXTERIOR: chistul se continuă cu un traiect care iese pe piele, pe marginea anterioară a SCM
   (jos); secreția picură; 3 = FISTULĂ COMPLETĂ: traiectul continuă în sus și înăuntru până în faringe; 4 = deschiderea în faringe,
   în fosa amigdaliană (punga 2). Totul rămâne în interiorul gâtului (între piele și faringe). */
export function fistula() {
  const SK = 250, PH = 800; const CY = [430, 470]; const OPN = [SK, 720]; const INN = [PH, 300];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[CY[0] - 20, CY[1] - 96], () => (BI < 0 || BI >= 1 ? [SK - 50, OPN[1] - 40] : OFF), () => (BI < 0 || BI >= 2 ? [600, 318] : OFF), [PH + 60, INN[1] - 70]],
    phase: (i) => ['chist (închis)', 'fistulă spre exterior', 'fistulă completă', 'deschiderea: fosa amigdaliană'][i] || 'sinusul cervical care nu dispare',
    draw(g, t, b) {
      BI = b.i;
      bg(g); const p = P(b, t, 4);
      const cy = b.i < 0 ? 1 : b.i === 0 ? p(0) : 1; const ex = b.i < 0 ? 1 : b.i >= 1 ? (b.i === 1 ? p(1) : 1) : 0; const ix = b.i < 0 ? 1 : b.i >= 2 ? (b.i === 2 ? p(2) : 1) : 0;
      // țesutul gâtului
      const bulge = 26 * cy * (1 - 0.6 * ex);
      const skin = curve([[SK, 90], [SK, 330], [SK - bulge, CY[1]], [SK, 600], [SK, 900]], 10);
      const tis = new Path2D(); tis.moveTo(skin[0][0], skin[0][1]); skin.forEach((q) => tis.lineTo(q[0], q[1])); tis.lineTo(PH, 900); tis.lineTo(PH, 90); tis.closePath();
      g.save(); g.fillStyle = L.mes; g.fill(tis); g.restore();
      // mandibula (unghiul) + SCM
      paint(g, smooth([[SK + 10, 120], [SK + 170, 130], [SK + 220, 230], [SK + 190, 300], [SK + 120, 300], [SK + 20, 250]]), L.bone, L.boneS, '#ffffff', [SK, 120, 220, 180], OUT, 4);
      txt(g, 'unghiul mandibulei', SK + 130, 210, 15, OUT, { stroke: false });
      const scm = new Path2D(); scm.moveTo(SK + 20, 560); scm.lineTo(SK + 90, 540); scm.lineTo(SK + 160, 900); scm.lineTo(SK + 60, 900); scm.closePath(); paint(g, scm, '#e48a7c', '#c0645a', null, [SK + 20, 540, 140, 360], OUT, 3);
      txt(g, 'SCM', SK + 110, 860, 16, OUT, { stroke: false });
      // pielea + faringele
      tube(g, skin, 12, L.ecto, { raw: true, ow: 5 });
      g.save(); g.fillStyle = '#3a2620'; g.fillRect(PH, 90, 200, 820); g.restore(); tube(g, [[PH, 90], [PH, 900]], 12, L.endo, { ow: 5 });
      tonsil(g, PH - 6, INN[1], 22, 50, 0, {});
      // chistul (cavitate închisă, epiteliu albastru)
      const r = lerp(16, 60, cy) * (1 - 0.55 * ex);
      ell(g, CY[0], CY[1], r * 1.2, r, '#3a2a44', { ow: 0 }); g.save(); g.strokeStyle = OUT; g.lineWidth = 12; g.beginPath(); g.ellipse(CY[0], CY[1], r * 1.2, r, 0, 0, 7); g.stroke(); g.strokeStyle = L.ecto; g.lineWidth = 7; g.stroke(); g.restore();
      // traiectul extern (spre piele, marginea anterioară a SCM) + intern (spre fosa amigdaliană)
      // traiectul extern coboară pe MARGINEA ANTERIOARĂ a SCM (în fața lui, spre piele), nu prin mușchi
      const tE = curve([[CY[0], CY[1] + r * 0.8], [322, 520], [262, 600], [255, 680], OPN], 10);
      const tI = curve([[CY[0] + r, CY[1] - 10], [560, 380], [700, 320], INN], 10);
      const tract = (P0, u1, a) => { if (u1 <= 0.01) return; tube(g, P0, 22, L.ecto, { raw: true, u1, ow: 5, alpha: a }); tube(g, P0, 10, '#3a2a44', { raw: true, u1, ow: 0, alpha: a }); };
      tract(tE, ex, 1); tract(tI, ix, 1);
      if (ex > 0.95) { srand(3); for (let k = 0; k < 4; k++) { const u = loopT(t + k * 0.6, 2.4); dot(g, OPN[0] - 8 - u * 90, OPN[1] + u * 60, 6, '#f4e27a', { alpha: 1 - u, ow: 2 }); } flow(g, tE, t, '#f4e27a', 3, 0.3, 5, { alpha: 0.8 }); }
      if (ix > 0.95) flow(g, tI, t, '#f4e27a', 3, -0.0001 + 0.3, 5, { alpha: 0.6 });
      // etichete
      txt(g, 'piele (ectoderm)', SK - 20, 120, 15, L.ectoL, { align: 'right' }); txt(g, 'faringe\n(endoderm)', PH + 100, 860, 15, L.endo);
      txt(g, 'fosa amigdaliană', PH + 100, INN[1] + 90, 15, '#ffc8f4');
      if (b.i === 0 || b.i < 0) { txt(g, 'chist', CY[0], CY[1], 18, '#bcd4ff', { alpha: cy }); txt(g, 'tumefacție\nlaterală', SK - 70, CY[1], 15, '#ffd6c4', { alpha: cy }); }
      if (ex > 0.5) { txt(g, 'orificiu: marginea\nanterioară a SCM', SK - 30, OPN[1] + 80, 15, C.hi, { alpha: sp(ex, 0.5, 1), align: 'right' }); }
      if (ix > 0.5) txt(g, 'traiect complet:\npiele → faringe', 590, 470, 16, '#bcd4ff', { alpha: sp(ix, 0.5, 1) });
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, CY[0] - 30, CY[1], 110, 90, e);
      if (b.i === 1) ring(g, SK + 60, 620, 90, 150, e);
      if (b.i === 2) ring(g, 560, 420, 300, 160, e, -0.3);
      if (b.i === 3) ring(g, PH, INN[1], 50, 70, e);
    },
  };
}

/* =================================================== MECANISMUL SINDROAMELOR PRIMULUI ARC (embrionul lateral + lupa)
   Se vede: embrionul lateral; pe spate, tubul neural cu creasta neurală (mov). 1 = creasta (banda mov de pe marginea tubului)
   pulsează: celulele stau încă pe loc; 2 = celulele migrează (fluxuri mov) în toate arcurile; 3 = lupa: arcul 1 normal → craniul cu
   oasele arcului 1 (teal: mandibula, maxila, zigomaticul) + oscioarele ciocan/nicovală și urechea externă; 4 = fluxul spre arcul 1
   se oprește la jumătate (X: „nu ajung”), arcul 1 rămâne mic și palid; în lupă oasele arcului 1 se micșorează (maxilar și mandibulă mici)
   și urechea e mică, malformată. */
export function crestMech() {
  const EX = 330, EY = 470, ES = 0.72; const LX = 770, LY = 470, LR = 200;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[EX - 230, EY - 200], [EX - 60, EY - 160], [LX - LR + 10, LY - 150], [EX + 30, EY - 60]],
    phase: (i) => ['creasta neurală', 'migrarea în arcuri', 'arcul 1 normal', 'arcul 1 sărac în creastă'][i] || 'creasta → arcul 1 → fața',
    draw(g, t, b) {
      BI = b.i;
      bg(g); const p = P(b, t, 4);
      const mig = b.i < 0 ? 1 : b.i === 0 ? 0 : b.i === 1 ? p(1) : 1; const poor = b.i === 3 ? p(3) : 0;
      const R = embryoLat(g, EX, EY, ES, t, { col: true, tube: 1, nc: mig > 0.02 ? mig : 0.001, nc1: 1 - 0.75 * poor, a1: 1 - 0.38 * poor, hi: b.i === 3 ? [1] : [], dimArc: 0.6 });
      // banda crestei (pulsează pe punctul 1)
      if (b.i === 0 || b.i < 0) { const q = b.i < 0 ? 1 : p(0); g.save(); g.globalAlpha = q * (0.6 + 0.4 * Math.abs(Math.sin(t * 3))); tube(g, [[EX - 205 * ES, EY - 175 * ES], [EX - 214 * ES, EY - 110 * ES], [EX - 222 * ES, EY - 30 * ES], [EX - 222 * ES, EY + 60 * ES]], 16, L.nc, { ow: 3, glow: 0.6 }); g.restore(); }
      txt(g, 'creasta neurală', EX - 120, EY - 290, 16, L.ncL); lead(g, EX - 140, EY - 276, EX - 205 * ES + 6, EY - 150 * ES, 1);
      txt(g, 'tub neural', EX - 240, EY + 120, 15, L.ectoL, { align: 'left' });
      if (poor > 0.4) { const [x, y] = [EX - 120 * ES, EY - 112 * ES]; g.save(); g.globalAlpha = sp(poor, 0.4, 0.8); g.strokeStyle = '#ff6b5e'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(x - 12, y - 12); g.lineTo(x + 12, y + 12); g.moveTo(x + 12, y - 12); g.lineTo(x - 12, y + 12); g.stroke(); g.restore(); txt(g, 'nu ajung', x - 10, y - 34, 16, '#ff9a90', { alpha: sp(poor, 0.4, 0.8) }); }
      // lupa: craniul cu derivatele arcului 1
      const la = b.i < 0 ? 0.85 : b.i >= 2 ? 1 : 0.35;
      lead(g, R.arch(1)[0] + 40, R.arch(1)[1], LX - LR + 6, LY, la);
      lupa(g, LX, LY, LR, la, () => {
        skullLat(g, LX + 6, LY - 10, 0.95, { face: ARC[1], faceS: ARCS_[1], hypo: poor });
        // urechea externă (pavilion), lângă meat; poor → mică, malformată
        const ex = LX + 6 + 96 * 0.95, ey = LY - 10 + 20 * 0.95; const es = 1 - 0.5 * poor;
        g.save(); g.translate(ex + 10, ey); g.scale(es, es); const au = new Path2D(); au.moveTo(-6, -40); au.bezierCurveTo(30, -50, 40, -8, 26, 16); au.bezierCurveTo(18, 34, 6, 44, -4, 40); au.bezierCurveTo(-14, 36, -10, 24, -16, 18); au.bezierCurveTo(-26, 2, -26, -30, -6, -40); au.closePath(); g.globalAlpha = 0.85; paint(g, au, '#f0b694', L.skinS, L.skinL, [-26, -50, 66, 94], OUT, 3); g.restore();
      });
      if (la > 0.5) { txt(g, poor > 0.5 ? 'maxilar + mandibulă mici\nurechi malformate' : 'mandibula, maxila, zigomaticul\n+ ciocan, nicovală, urechea externă', LX, LY + LR + 44, 16, poor > 0.5 ? '#ff9a90' : ARCL[1]); }
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, EX - 215 * ES, EY - 60 * ES, 40, 110, e);
      if (b.i === 1) ring(g, EX - 40, EY - 30, 170, 110, e);
      if (b.i === 2) ring(g, LX, LY, LR + 10, LR + 10, e);
      if (b.i === 3) ring(g, R.arch(1)[0], R.arch(1)[1], 110, 50, e, 0.2);
    },
  };
}

/* =================================================== TREACHER COLLINS: același copil (profil, fața spre stânga), normal → afectat
   Se vede: capul de copil mare; fiecare punct schimbă o trăsătură, iar cele de dinainte rămân: 1 = fanta palpebrală coboară lateral
   (unghiul dinspre ureche în jos); 2 = pometele (zigomaticul) se turtește; 3 = mandibula se micșorează, bărbia se retrage (conturul
   normal rămâne punctat); 4 = urechea devine mică și malformată; în lupă, palatul văzut de jos, cu despicătura (inserția din figura LP). */
export function treacher() {
  const HX = 610, HY = 400, HS = 1.15;
  const K0 = childHead(null, HX, HY, HS, 0, { alpha: 0 });
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[K0.eye[0] - 20, K0.eye[1] - 70], [K0.zyg[0] - 104, K0.zyg[1] + 30], [K0.chin[0] + 74, K0.chin[1] + 6], [K0.ear[0] + 80, K0.ear[1] - 60]],
    phase: (i) => ['ochi înclinați în jos', 'pometele turtit', 'mandibula mică', 'urechea malformată'][i] || 'arcul 1 afectat',
    draw(g, t, b) {
      BI = b.i;
      bg(g); const p = P(b, t, 4);
      const K = childHead(g, HX, HY, HS, t, { slant: p(0), zyg: p(1), mand: p(2), ear: p(3), low: 0.8 * p(3), ghost: p(2) > 0.05, zygGhost: p(1) > 0.05 });
      const lb = (s0, x, y, a, al = 'center') => txt(g, s0, x, y, 17, '#ffd6c4', { alpha: a, align: al });
      lb('fanta coboară lateral', K.eye[0] - 40, K.eye[1] - 120, p(0)); if (p(0) > 0.1) lead(g, K.eye[0] - 20, K.eye[1] - 104, K.eye[0] + 10, K.eye[1] - 8, p(0));
      lb('zigomatic hipoplazic', K.zyg[0] + 24, K.zyg[1] + 40, p(1), 'center');
      lb('hipoplazie mandibulară', K.chin[0] + 110, K.chin[1] + 130, p(2)); lb('punctat = normal', K.chin[0] + 110, K.chin[1] + 156, p(2) * 0.8);
      lb('urechi mici, malformate', K.ear[0] + 40, K.ear[1] + 110, p(3));
      // lupa: palatul despicat (± , inserția din figură)
      const la = b.i < 0 ? 0.8 : b.i === 3 ? p(3) : 0;
      lupa(g, 880, 800, 92, la, () => {
        const x = 880, y = 806; g.translate(x, y); g.scale(0.85, 0.85); g.translate(-x, -y); const pal = new Path2D(); pal.moveTo(x - 80, y + 70); pal.bezierCurveTo(x - 90, y - 40, x - 40, y - 90, x, y - 92); pal.bezierCurveTo(x + 40, y - 90, x + 90, y - 40, x + 80, y + 70); pal.closePath();
        paint(g, pal, '#ef8a96', '#c95f6e', '#ffc4cc', [x - 90, y - 92, 180, 162], OUT, 4);
        const cl = new Path2D(); cl.moveTo(x - 10, y - 30); cl.quadraticCurveTo(x - 20, y + 40, x, y + 72); cl.quadraticCurveTo(x + 20, y + 40, x + 10, y - 30); cl.closePath(); paint(g, cl, '#3a1a22', null, null, [x - 20, y - 30, 40, 102], OUT, 3);
        for (let k = 0; k < 8; k++) { const a = Math.PI * (0.15 + 0.7 * k / 7); dot(g, x - Math.cos(a) * 74, y - Math.sin(a) * 78 + 10, 7, '#fff8ec', { ow: 2 }); }
      });
      if (la > 0.3) txt(g, '± palat despicat', 880, 686, 16, '#ffc4cc', { alpha: la });
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, K.eye[0], K.eye[1], 56, 40, e);
      if (b.i === 1) ring(g, K.zyg[0], K.zyg[1], 60, 40, e);
      if (b.i === 2) ring(g, K.chin[0] + 20, K.chin[1] - 10, 90, 60, e);
      if (b.i === 3) ring(g, K.ear[0], K.ear[1], 56, 70, e);
    },
  };
}

/* =================================================== PIERRE ROBIN: capul de nou-născut în secțiune sagitală (fața spre stânga)
   Se vede: cavitatea nazală, palatul, limba, mandibula, calea aeriană (nas → faringe → trahee, față) și esofagul (spate). Aerul curge
   (particule albe). 1 = mandibula se micșorează, bărbia se retrage (normalul = punctat); 2 = limba nu mai are loc și cade înapoi spre
   faringe: aerul se oprește la baza limbii (obstrucție → dificultăți respiratorii); 3 = lupa (secțiune frontală prin gură): limba stă
   între cele 2 lame palatine și nu le lasă să se unească → palat despicat (manual) → dificultăți de alimentare. */
export function robin() {
  const HX = 620, HY = 380, HS = 1.12;
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[HX - 190 * HS, HY + 180 * HS], [HX + 120, HY + 110], () => (BI < 0 || BI === 2 ? [330, 170] : OFF)],
    phase: (i) => ['mandibula mică', 'limba cade înapoi', 'palatul despicat'][i] || 'secvența Pierre Robin',
    draw(g, t, b) {
      BI = b.i;
      bg(g); const p = P(b, t, 3);
      const m = p(0), tg = p(1);
      const R = sagHead(g, HX, HY, HS, t, { mand: 0.85 * m, tongue: tg, ghost: m > 0.05 });
      // aerul: nas → nazofaringe → faringe → trahee; blocat la baza limbii când limba cade înapoi
      const air = curve([R.noseIn, [HX - 150 * HS, HY + 12 * HS], [HX - 40 * HS, HY - 6 * HS], [HX + 40 * HS, HY + 14 * HS], [HX + 66 * HS, HY + 80 * HS], [HX + 62 * HS, HY + 200 * HS], [HX + 44 * HS, HY + 330 * HS]], 10);
      const lim = lerp(1, 0.56, tg);
      for (let k = 0; k < 9; k++) { const u = ((k / 9) + (REDUCED ? 0 : t * 0.22)) % 1; if (u > lim) continue; const [x, y] = at(air, u); dot(g, x, y, 6, '#eef6ff', { alpha: 0.9 * (u > lim - 0.06 ? 0.4 : 1), ow: 2 }); }
      if (tg > 0.5) { const [x, y] = at(air, lim); g.save(); g.globalAlpha = sp(tg, 0.5, 1); g.strokeStyle = '#ff6b5e'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + 18, y - 14); g.lineTo(x + 42, y + 10); g.moveTo(x + 42, y - 14); g.lineTo(x + 18, y + 10); g.stroke(); g.restore(); }
      const lb = (s0, x, y, c, a, al = 'center') => txt(g, s0, x, y, 16, c, { alpha: a, align: al });
      lb('mandibula mică (micrognație)', HX - 110, HY + 300, '#ffd6c4', Math.max(0.6, m)); lb('punctat = normal', HX - 110, HY + 326, '#d8c4b8', m);
      lb('limba', R.tongue[0] + 4, R.tongue[1] - 4, '#fff0f2', 1); lb('palat', HX - 70, HY + 22, OUT, 0.9); lb('cavitatea nazală', HX - 60, HY - 24, '#ffd6c4', 0.9);
      if (tg > 0.3) { lb('limba cade înapoi → obstrucția căilor aeriene', 690, 830, '#ff9a90', sp(tg, 0.3, 0.8)); lb('→ dificultăți respiratorii', 690, 860, '#ffd6c4', sp(tg, 0.5, 1)); }
      lb('trahee', HX + 40, HY + 390, '#d8c4b8', 1); lb('esofag', HX + 150, HY + 390, '#d8c4b8', 1);
      // lupa: palatul despicat (secțiune frontală prin gură): limba între lamele palatine
      const la = b.i < 0 ? 0.8 : b.i === 2 ? p(2) : 0;
      lupa(g, 200, 270, 120, la, () => {
        const x = 200, y = 280; const gap = lerp(8, 44, b.i === 2 ? p(2) : 1);
        paint(g, smooth([[x - 110, y - 90], [x + 110, y - 90], [x + 110, y - 30], [x - 110, y - 30]]), '#3a2228', null, null, [x - 110, y - 90, 220, 60], OUT, 3);
        [-1, 1].forEach((s) => { const pl = new Path2D(); pl.roundRect(s > 0 ? x + gap / 2 : x - gap / 2 - 90, y - 26, 90, 22, 10); paint(g, pl, '#ef8a96', '#c95f6e', null, [x - 120, y - 26, 240, 22], OUT, 3); });
        const tn = new Path2D(); tn.moveTo(x - 70, y + 90); tn.bezierCurveTo(x - 80, y + 10, x - 30, y - 30, x, y - 36); tn.bezierCurveTo(x + 30, y - 30, x + 80, y + 10, x + 70, y + 90); tn.closePath(); paint(g, tn, '#f08f9c', '#c95f6e', '#ffc4cc', [x - 80, y - 36, 160, 126], OUT, 4);
        txt(g, 'limba între\nlamele palatine', x, y + 50, 14, OUT, { stroke: false });
      });
      if (la > 0.3) txt(g, 'palat despicat, ogival\n→ dificultăți de alimentare', 200, 430, 16, '#ffc4cc', { alpha: la });
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, HX - 120 * HS, HY + 160 * HS, 70, 60, e);
      if (b.i === 1) ring(g, HX + 30, HY + 110, 90, 90, e);
      if (b.i === 2) ring(g, 200, 270, 130, 130, e);
    },
  };
}

/* =================================================== DIGEORGE: lanțul din figura LP, desenat pe corp
   Se vede: stânga-sus perechea de cromozomi 22 (unul cu segmentul 22q11.2 care dispare); la mijloc gâtul și toracele, vedere frontală:
   traheea, tiroida (zmeurie) cu cele 4 paratiroide (cyan) pe fața ei, timusul (crem) în mediastinul superior, inima jos cu tractul de
   ejecție (aorta + trunchiul pulmonar, spiralate). 1 = deleția (segmentul pâlpâie și dispare; puncte mov = creasta neurală care se
   rărește); 2 = timusul se micșorează, limfocitele T (puncte albe) se răresc; 3 = paratiroidele se micșorează, ionii de Ca²⁺ dintr-un vas
   se răresc → hipocalcemie; 4 = tractul de ejecție: septul nu se formează bine (defect conotruncal); 5 = lupa: fața (micrognație,
   urechi jos inserate, fante palpebrale oblice). */
export function digeorge() {
  const CX = 560; const THY = [CX, 300], THM = [CX, 520], HRT = [CX + 10, 760];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[60, 200], [THM[0] - 72, THM[1] - 10], [CX + 140, THY[1] - 60], [CX + 150, HRT[1] - 60], [730, 120]],
    phase: (i) => ['deleția 22q11.2', 'timusul hipoplazic', 'paratiroidele hipoplazice', 'defecte conotruncale', 'fața'][i] || 'timus + paratiroide + inimă',
    draw(g, t, b) {
      BI = b.i;
      bg(g); const p = P(b, t, 5);
      const del = p(0), th = p(1), pt = p(2), ht = p(3), fc = p(4);
      // cromozomii 22
      const cx0 = 140, cy0 = 210;
      chromo(g, cx0 - 30, cy0, 130, '#e9dcff', { dup: true, w: 13, cen: 0.2 });
      chromo(g, cx0 + 34, cy0, 130, '#e9dcff', { dup: true, w: 13, cen: 0.2, segL: [[0.36, 0.48, del > 0.5 ? '#1a1018' : '#ffb15c']], segR: [[0.36, 0.48, del > 0.5 ? '#1a1018' : '#ffb15c']] });
      txt(g, '22', cx0, cy0 + 96, 18, C.cream); txt(g, '22q11.2', cx0 + 120, cy0 + 4, 17, del > 0.5 ? '#ff9a90' : '#ffd6a4', { alpha: Math.max(0.6, del), align: 'left' });
      if (del > 0) { srand(9); for (let k = 0; k < 12; k++) { const a = rr(0, 6.28), r0 = rr(30, 90); dot(g, cx0 + Math.cos(a) * r0 + 10, cy0 + 170 + Math.sin(a) * r0 * 0.4, 6, L.nc, { alpha: (k / 12 > del * 0.7 ? 1 : 0.15), ow: 1.5 }); } txt(g, 'creasta neurală afectată', cx0 + 10, cy0 + 236, 15, L.ncL, { alpha: del }); }
      // corpul: gât + torace (contur)
      const bd = smooth([[CX - 80, 100], [CX + 80, 100], [CX + 90, 380], [CX + 260, 470], [CX + 280, 900], [CX - 280, 900], [CX - 260, 470], [CX - 90, 380]]);
      paint(g, bd, '#3d2a2a', null, null, [CX - 280, 100, 560, 800], '#6b5650', 4);
      tube(g, [[CX, 110], [CX, 640]], 40, '#e9dcc8', { ow: 4 }); for (let k = 0; k < 11; k++) tube(g, [[CX - 18, 150 + k * 44], [CX + 18, 150 + k * 44]], 6, '#c9b79a', { ow: 0 });
      // tiroida + paratiroidele
      thyroid(g, THY[0], THY[1], 1.0, {});
      const ps = lerp(1, 0.45, pt); [[-70, -40], [70, -40], [-70, 40], [70, 40]].forEach(([dx, dy]) => para(g, THY[0] + dx, THY[1] + dy, 15 * ps, {}));
      // Ca2+ într-un vas (lateral)
      artery(g, [[CX - 200, 160], [CX - 200, 460]], 26, t, { flow: 0 });
      srand(5); const nCa = Math.round(lerp(8, 2, pt)); for (let k = 0; k < nCa; k++) { const u = ((k / 8) + (REDUCED ? 0 : t * 0.12)) % 1; dot(g, CX - 200, 160 + u * 300, 5, '#e8f4ff', { ow: 1.5 }); }
      txt(g, 'Ca²⁺', CX - 252, 300, 16, '#e8f4ff');
      // timusul (bilobat) + limfocitele T
      const ts = lerp(1, 0.4, th);
      [-1, 1].forEach((s) => thymus(g, [[THM[0] + s * 30 * ts, THM[1] - 70 * ts], [THM[0] + s * 50 * ts, THM[1]], [THM[0] + s * 36 * ts, THM[1] + 70 * ts]], 60 * ts));
      srand(7); const nT = Math.round(lerp(10, 2, th)); for (let k = 0; k < nT; k++) { const u = loopT(t + k * 0.7, 4); dot(g, THM[0] + 90 + u * 120, THM[1] - 40 + k * 9, 6, '#ffffff', { alpha: 1 - u, ow: 1.5 }); }
      txt(g, 'limfocite T', THM[0] + 220, THM[1] - 70, 15, '#ffffff', { align: 'left' });
      // inima cu tractul de ejecție
      heart(g, HRT[0], HRT[1] + 30, 1.05, t, {});
      const sep = 1 - ht; // septul spiral
      artery(g, [[HRT[0] - 10, HRT[1] - 40], [HRT[0] - 30, HRT[1] - 120], [HRT[0] + 40, HRT[1] - 150], [HRT[0] + 110, HRT[1] - 110]], 30, t, { col: '#e35a5a' });
      artery(g, [[HRT[0] + 20, HRT[1] - 40], [HRT[0] + 40, HRT[1] - 110], [HRT[0] - 30, HRT[1] - 150], [HRT[0] - 110, HRT[1] - 120]], 26, t, { col: '#7aa6e8', alpha: lerp(1, 0.25, ht) });
      if (ht > 0.4) { g.save(); g.globalAlpha = sp(ht, 0.4, 1); g.setLineDash([6, 5]); g.strokeStyle = C.hi; g.lineWidth = 3; g.beginPath(); g.ellipse(HRT[0], HRT[1] - 100, 50, 40, 0, 0, 7); g.stroke(); g.restore(); }
      txt(g, 'tractul de ejecție', HRT[0] + 170, HRT[1] - 160, 15, '#ffc0b6', { align: 'left' });
      // etichete
      txt(g, 'tiroida + paratiroidele', THY[0] + 110, THY[1] + 104, 15, '#bdf4fa', { align: 'left' }); txt(g, 'timus', THM[0] - 110, THM[1] + 80, 16, '#fff4dc');
      if (pt > 0.5) txt(g, 'PTH ↓ → hipocalcemie', CX - 200, 500, 16, '#ff9a90', { alpha: sp(pt, 0.5, 1) });
      if (th > 0.5) txt(g, 'imunodeficiență celulară', THM[0] + 220, THM[1] + 40, 15, '#ff9a90', { alpha: sp(th, 0.5, 1), align: 'left' });
      if (ht > 0.5) txt(g, 'defecte conotruncale\n(ex. Fallot, manual)', HRT[0] + 170, HRT[1] - 100, 15, '#ff9a90', { alpha: sp(ht, 0.5, 1), align: 'left' });
      // lupa: fața
      const la = b.i < 0 ? 0.8 : b.i === 4 ? fc : 0;
      lupa(g, 860, 205, 120, la, () => { childHead(g, 870, 205, 0.4, t, { mand: 0.75 * fc, low: fc, slant: 0.6 * fc, mouth: fc, ghost: fc > 0.1 }); });
      if (la > 0.3) txt(g, 'micrognație · gură mică\nurechi jos inserate', 860, 360, 15, '#ffd6c4', { alpha: la });
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, cx0 + 34, cy0 - 10, 50, 40, e);
      if (b.i === 1) ring(g, THM[0], THM[1], 100, 100, e);
      if (b.i === 2) ring(g, THY[0], THY[1], 120, 80, e);
      if (b.i === 3) ring(g, HRT[0], HRT[1] - 100, 90, 70, e);
      if (b.i === 4) ring(g, 860, 205, 130, 130, e);
    },
  };
}

/* =================================================== CAZUL (1): copilul de 1,5 ani (profil, fața spre stânga, cu gâtul)
   Se vede: copilul; pe gât SCM (de la mastoidă, după ureche, oblic în jos și înainte spre stern). Pe MARGINEA ANTERIOARĂ a SCM,
   la joncțiunea 1/3 mijlocii cu 1/3 inferioară, o mică deschidere. 1 = secreția de puroi iese intermitent din orificiu (picături);
   2 = zona din jur se înroșește și se umflă; o riglă pe marginea anterioară a SCM arată cele 3 treimi și locul orificiului;
   3 = diagnosticul: prin transparență apare traiectul (punctat) de la orificiu, în sus și înăuntru, spre fosa amigdaliană. */
export function caseClin() {
  const HX = 600, HY = 300, HS = 1.0;
  const K0 = childHead(null, HX, HY, HS, 0, { alpha: 0, neck: true });
  const f = (u) => [lerp(K0.scmTop[0], K0.scmBot[0], u) - 22 * HS, lerp(K0.scmTop[1], K0.scmBot[1], u)]; // marginea anterioară
  const OP = f(2 / 3);
  return {
    home: HOME, cams: [HOME, cam(OP[0] + 10, OP[1] - 40, 1.6), HOME],
    anchors: [[OP[0] + 40, OP[1] - 40], [OP[0] + 62, OP[1] + 36], () => (BI < 0 || BI === 2 ? [OP[0] - 34, OP[1] - 96] : OFF)],
    phase: (i) => ['secreție intermitentă de puroi', 'marginea anterioară a SCM, 1/3 inferioară', 'fistulă branhială infectată'][i] || 'copil de 1,5 ani',
    draw(g, t, b) {
      BI = b.i;
      bg(g); const p = P(b, t, 3);
      childHead(g, HX, HY, HS, t, { neck: true, scm: 1 });
      const red = b.i < 0 ? 1 : b.i >= 1 ? (b.i === 1 ? p(1) : 1) : 0.35;
      ell(g, OP[0], OP[1], 26 + 8 * red, 20 + 6 * red, '#f07a7a', { ow: 0, alpha: 0.35 + 0.4 * red });
      ell(g, OP[0], OP[1], 6, 4.5, '#4a1418', { ow: 2 });
      // puroiul: picături intermitente
      const pu = b.i === 0 ? p(0) : 1;
      for (let k = 0; k < 2; k++) { const u = loopT(t + k * 1.4, 2.8); if (u < 0.55) { const uu = u / 0.55; dot(g, OP[0] - 2, OP[1] + 6 + uu * 26, 5 + 2 * (1 - uu), '#f2df6e', { alpha: pu * (1 - uu * 0.6), ow: 1.5 }); } }
      // rigla pe marginea anterioară: cele 3 treimi
      if (b.i === 1 || b.i < 0) { const a = b.i < 0 ? 0.7 : p(1); [0, 1 / 3, 2 / 3, 1].forEach((u, k) => { const [x, y] = f(u); g.save(); g.globalAlpha = a; g.strokeStyle = C.hi; g.lineWidth = 3; g.beginPath(); g.moveTo(x - 12, y + 4); g.lineTo(x + 4, y - 10); g.stroke(); g.restore(); }); ['1/3 sup.', '1/3 mijl.', '1/3 inf.'].forEach((s, k) => { const [x, y] = f((k + 0.5) / 3); txt(g, s, x - 40, y, 13, C.hi, { alpha: a, align: 'right' }); }); txt(g, 'marginea anterioară a SCM', OP[0] + 46, OP[1] + 92, 13, '#ffd6c4', { alpha: a }); }
      // traiectul (diagnosticul)
      const tr = b.i < 0 ? 0.8 : b.i === 2 ? p(2) : 0;
      if (tr > 0) { const P0 = curve([OP, [OP[0] + 20, OP[1] - 80], [HX - 50, HY + 120], [HX - 70, HY + 90]], 10); g.save(); g.globalAlpha = tr; g.setLineDash([9, 7]); g.strokeStyle = '#bcd4ff'; g.lineWidth = 4.5; g.beginPath(); P0.slice(0, Math.max(2, Math.round(P0.length * tr))).forEach((q, k) => (k ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]))); g.stroke(); g.restore(); tonsil(g, HX - 74, HY + 86, 14, 22, 0, { alpha: tr * 0.85 }); txt(g, 'fosa amigdaliană', HX - 250, HY + 150, 15, '#ffc8f4', { alpha: tr }); lead(g, HX - 200, HY + 140, HX - 84, HY + 90, tr); txt(g, 'fistulă branhială\n(cervicală laterală)', OP[0] - 150, OP[1] + 120, 17, '#bcd4ff', { alpha: tr }); }
      if (b.i === 0 || b.i < 0) txt(g, 'puroi intermitent', OP[0] - 140, OP[1] + 4, 16, '#f2df6e', { alpha: pu });
      txt(g, 'SCM', K0.scmTop[0] + 20, K0.scmTop[1] + 120, 16, '#ffc4b8');
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, OP[0], OP[1] + 10, 46, 44, e);
      if (b.i === 1) ring(g, OP[0], OP[1], 30, 26, e);
      if (b.i === 2) ring(g, OP[0] - 20, OP[1] - 80, 90, 130, e, 0.3);
    },
  };
}

/* =================================================== CAPCANELE: 6 carduri, fiecare cu o mini-schemă (culorile deck-ului) */
export function traps() {
  const CELL = [[255, 215], [745, 215], [255, 490], [745, 490], [255, 765], [745, 765]];
  const T0 = ['arc vs. șanț vs. pungă', 'câte sunt', 'paratiroidele', 'oscioarele și hioidul', 'nervii', 'ce supraviețuiește'];
  return {
    home: HOME, cams: CELL.map(() => HOME),
    anchors: CELL.map(([x, y]) => [x - 238, y]),
    phase: (i) => T0[i] || 'ce se confundă',
    draw(g, t, b) {
      BI = b.i;
      bg(g);
      CELL.forEach(([x, y], k) => {
        const act = b.i === k || b.i < 0; const a = act ? 1 : 0.55;
        g.save(); g.fillStyle = b.i === k ? 'rgba(217,101,42,.16)' : 'rgba(255,240,228,.05)'; g.strokeStyle = b.i === k ? 'rgba(255,180,138,.7)' : 'rgba(255,230,210,.14)'; g.lineWidth = 3; g.beginPath(); g.roundRect(x - 222, y - 122, 444, 244, 26); g.fill(); g.stroke(); g.restore();
        txt(g, T0[k], x, y - 96, 18, b.i === k ? C.hi : '#ffd6c4', { alpha: a });
        g.save(); g.globalAlpha = a;
        if (k === 0) { // ecto (afară) · arc (mezo + creastă) · endo (înăuntru)
          const pp = new Path2D(); pp.roundRect(x - 60, y - 40, 120, 110, 30); paint(g, pp, ARCL[2], null, null, [x - 60, y - 40, 120, 110], OUT, 0); g.save(); g.lineWidth = 10; g.strokeStyle = L.ecto; g.beginPath(); g.moveTo(x - 60, y - 40); g.lineTo(x - 60, y + 70); g.stroke(); g.strokeStyle = L.endo; g.beginPath(); g.moveTo(x + 60, y - 40); g.lineTo(x + 60, y + 70); g.stroke(); g.restore();
          dot(g, x - 16, y + 10, 8, L.meso, { ow: 2 }); dot(g, x + 16, y + 20, 8, L.nc, { ow: 2 });
          txt(g, 'șanț\necto', x - 130, y + 14, 15, L.ectoL); txt(g, 'arc', x, y - 16, 15, OUT, { stroke: false }); txt(g, 'pungă\nendo', x + 130, y + 14, 15, L.endo);
        } else if (k === 1) {
          [1, 2, 3, 4, 6].forEach((n, j) => { const pp = new Path2D(); pp.roundRect(x - 190 + j * 76, y - 26, 66, 52, 24); paint(g, pp, ARC[n], null, null, [x - 190 + j * 76, y - 26, 66, 52], OUT, 4); txt(g, String(n), x - 157 + j * 76, y, 20, OUT, { stroke: false }); });
          txt(g, 'arcul 5 nu există · 4 șanțuri · 4 perechi de pungi', x, y + 66, 14, '#d8c4b8');
        } else if (k === 2) {
          thyroid(g, x + 20, y + 16, 0.7, {}); para(g, x - 40, y - 26, 14, { label: 'IV' }); para(g, x - 40, y + 60, 14, { label: 'III' });
          txt(g, 'punga 4 → sus', x + 130, y - 26, 15, '#bdf4fa'); txt(g, 'punga 3 → jos', x + 130, y + 60, 15, '#bdf4fa');
          thymus(g, [[x - 70, y + 70], [x - 80, y + 110]], 22, {}); txt(g, '+ timus', x - 140, y + 100, 14, '#fff4dc');
        } else if (k === 3) {
          const ml = new Path2D(); ml.roundRect(x - 190, y - 30, 40, 70, 12); paint(g, ml, ARC[1], null, null, [x - 190, y - 30, 40, 70], OUT, 3); const ic = new Path2D(); ic.roundRect(x - 144, y - 30, 36, 60, 12); paint(g, ic, ARC[1], null, null, [x - 144, y - 30, 36, 60], OUT, 3); const st = new Path2D(); st.moveTo(x - 96, y - 10); st.lineTo(x - 50, y - 26); st.lineTo(x - 48, y + 18); st.closePath(); paint(g, st, ARC[2], null, null, [x - 96, y - 26, 48, 44], OUT, 3);
          txt(g, 'ciocan · nicovală · scăriță', x - 120, y + 66, 13, '#d8c4b8');
          const t1 = new Path2D(); t1.roundRect(x + 10, y - 16, 160, 18, 8); paint(g, t1, ARC[2], null, null, [x + 10, y - 16, 160, 18], OUT, 3); const t2 = new Path2D(); t2.roundRect(x + 10, y + 2, 160, 18, 8); paint(g, t2, ARC[3], null, null, [x + 10, y + 2, 160, 18], OUT, 3);
          txt(g, 'hioid: sus 2, jos 3', x + 90, y + 66, 13, '#d8c4b8');
        } else if (k === 4) {
          [['V2/V3', 1], ['VII', 2], ['IX', 3], ['X sup.', 4], ['X rec.', 6]].forEach(([s, n], j) => pill(g, x - 162 + j * 84, y + 4, 76, 40, ARC[n], s, { size: 14 }));
          txt(g, 'mimica = VII (nu V)', x, y + 66, 15, '#ff9a90');
        } else {
          const sk = new Path2D(); sk.rect(x - 200, y - 50, 30, 120); paint(g, sk, L.mes, null, null, [x - 200, y - 50, 30, 120], OUT, 0);
          tube(g, [[x - 170, y + 6], [x - 40, y + 6]], 30, L.ecto, { ow: 4 }); tube(g, [[x - 170, y + 6], [x - 44, y + 6]], 14, '#2a2030', { ow: 0 });
          [[L.ecto, 0], [L.meso, 1], [L.endo, 2]].forEach(([c, j]) => { const pp = new Path2D(); pp.roundRect(x - 38 + j * 8, y - 18, 8, 48, 3); paint(g, pp, c, null, null, [x - 38 + j * 8, y - 18, 8, 48], OUT, 1.5); });
          txt(g, 'șanțul 1 → meat', x - 110, y - 36, 14, L.ectoL); txt(g, 'membrana 1 → timpan', x + 90, y + 6, 14, C.hi);
          txt(g, 'șanțurile 2–4 → sinusul cervical (dispare)', x, y + 70, 13, '#d8c4b8');
        }
        g.restore();
      });
    },
  };
}
