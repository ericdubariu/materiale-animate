// Coperta, harta, cronologia și Partea A (arcurile: cum arată embrionul, de unde vin, rețeta unui arc, câte sunt).
import {
  cam, HOME, C, bg, P, st, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead, OUT, clamp, lerp, ease, paint, blob, bb, smooth, REDUCED, srand, rr,
  ARC, ARCS, ARCS_, ARCL, L, G, sp, nerve, artery, bar, muscle, thymus, para, thyroid, embryoLat, pharynxSec, pharynxGeo, childHead, ridge, skullLat,
} from './ka.js';

// lupă: cerc întunecat cu contur; inner(g) desenează conținutul (în coordonatele scenei), tăiat la cerc
export function lupa(g, x, y, r, a, inner, o = {}) {
  if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a);
  g.save(); g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 24; g.fillStyle = o.fill || '#1d1220'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.restore();
  g.save(); g.beginPath(); g.arc(x, y, r - 3, 0, 7); g.clip(); inner(g); g.restore();
  g.lineWidth = 7; g.strokeStyle = OUT; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.lineWidth = 3.5; g.strokeStyle = '#ffe7d6'; g.stroke();
  g.restore();
}

/* =================================================== COPERTA: de la arcurile embrionului la fața și gâtul copilului
   Se vede: stânga, embrionul de ~32 de zile (vedere laterală, ventral = dreapta) cu arcurile colorate pe ARC; creasta neurală (mov)
   curge din spate în arcuri, în buclă. Dreapta-sus: lupa cu „felia” (secțiune frontală: arcuri, șanțuri = ectoderm albastru
   pe exterior, pungi = endoderm galben pe interior, membrane). Dreapta-jos: copilul în profil (fața spre stânga), cu gâtul.
   Teme (punctele copertei + rândurile recapitulării): slice = lupa; arcs = arcurile aprinse + pe copil mandibula (1), hioidul (2/3),
   laringele (4+6); a1 / a2 / a346 = doar acel arc; cleft = arcul 2 crește peste 3–4 (sinusul) + pavilionul urechii; mem = urechea
   copilului; pouch = pe copil, prin transparență, tiroida cu paratiroidele + timusul; fist = orificiul fistulei pe gâtul copilului;
   syn = copilul cu mandibula mică și urechea malformată, arcul 1 al embrionului sărac în creastă. */
const COVER_PTS = [['slice'], ['arcs'], ['cleft', 'mem', 'pouch'], ['fist', 'syn']];
export function cover({ spec } = {}) {
  const map = (spec && spec.sceneOpts && spec.sceneOpts.map) || null;
  const LIST = map || COVER_PTS;
  const PH = { slice: 'arc · șanț · membrană · pungă', arcs: 'cele 5 arcuri', a1: 'arcul 1', a2: 'arcul 2', a346: 'arcurile 3, 4, 6', cleft: 'șanțurile → sinusul cervical', mem: 'urechea', pouch: 'pungile → glande', fist: 'fistula branhială', syn: 'sindroamele' };
  const EX = 285, EY = 500, ES = 0.82; const LX = 790, LY = 222, LR = 132; const KX = 790, KY = 560, KS = 0.6;
  return {
    home: HOME, cams: LIST.map(() => HOME),
    anchors: map ? [] : [[LX - LR - 10, LY + 40], [EX + 40, EY - 250], [EX - 200, EY - 40], [KX - 160, KY + 120]],
    phase: (i) => (i < 0 ? 'aparatul faringian' : LIST[i].map((k) => PH[k]).join(' · ')),
    draw(g, t, b) {
      bg(g);
      const th = b.i < 0 ? [] : LIST[b.i]; const has = (k) => th.includes(k);
      const pr = b.i < 0 ? 1 : ease(clamp(b.bt / (b.bd * 0.6)));
      const A = (k) => (b.i < 0 ? 1 : has(k) ? pr : 0);
      const hiList = has('a1') ? [1] : has('a2') ? [2] : has('a346') ? [3, 4] : [];
      const over = has('cleft') ? pr : 0; const syn = has('syn') ? pr : 0;
      const R = embryoLat(g, EX, EY, ES, t, { col: true, nc: 1, nc1: 1 - 0.7 * syn, over: over * 0.9, ear: over, hi: hiList, dimArc: 0.35 });
      // lupa: felia
      const sl = b.i < 0 ? 1 : has('slice') ? pr : 0.45;
      lead(g, R.neck[0] + 30, R.neck[1] - 10, LX - LR + 10, LY + 40, sl);
      lupa(g, LX, LY, LR, Math.max(0.45, sl), () => { g.save(); g.translate(LX, LY); g.scale(0.36, 0.36); g.translate(-500, -470); pharynxSec(g, t, { col: true, comp: 1, step: 124 }); g.restore(); });
      if (sl > 0.5) { txt(g, 'arc · șanț · membrană · pungă', LX, LY + LR + 24, 16, '#ffd6c4', { alpha: sl }); }
      // copilul
      const m = 0.75 * syn; const KR = childHead(g, KX, KY, KS, t, { neck: true, mand: m, ear: 0.7 * syn, low: 0.6 * syn });
      const hz = (k) => (has(k) ? pr : 0); const ar = hz('arcs'); const a1 = Math.max(ar, hz('a1')), a2 = Math.max(ar, hz('a2')), a3 = Math.max(ar, hz('a346'));
      if (a1 > 0) { g.save(); g.globalAlpha = a1; tube(g, [[KX + 10 * KS, KY + 140 * KS], [KX - 70 * KS, KY + 162 * KS], [KX - 140 * KS + 40 * m * KS, KY + 140 * KS]], 16, ARC[1], { ow: 4 }); g.restore(); }
      if (a2 > 0 || a3 > 0) { const hx = KX - 40 * KS, hy = KY + 214 * KS; g.save(); g.globalAlpha = Math.max(a2, a3); tube(g, [[hx - 36, hy - 4], [hx + 10, hy - 6]], 10, ARC[2], { ow: 3 }); tube(g, [[hx - 36, hy + 6], [hx + 10, hy + 4], [hx + 44, hy - 4]], 10, ARC[3], { ow: 3, alpha: a3 / Math.max(0.01, Math.max(a2, a3)) }); g.restore(); }
      if (a3 > 0) { const lx = KX - 50 * KS, ly = KY + 262 * KS; g.save(); g.globalAlpha = a3; const lp = new Path2D(); lp.moveTo(lx - 26, ly - 16); lp.lineTo(lx + 22, ly - 16); lp.lineTo(lx + 14, ly + 22); lp.lineTo(lx - 20, ly + 22); lp.closePath(); const gr = g.createLinearGradient(lx, ly - 16, lx, ly + 22); gr.addColorStop(0, ARC[4]); gr.addColorStop(1, ARC[6]); paint(g, lp, gr, null, null, [lx - 26, ly - 16, 48, 38], OUT, 3); g.restore(); }
      const po = has('pouch') ? pr : 0; if (po > 0) { const tx = KX - 30 * KS, ty = KY + 300 * KS; thyroid(g, tx, ty, 0.3, { alpha: po * 0.9 }); [[-18, -10], [18, -10], [-18, 12], [18, 12]].forEach(([dx, dy]) => para(g, tx + dx, ty + dy, 5, { alpha: po })); thymus(g, [[tx - 10, ty + 30], [tx - 6, ty + 60]], 22, { alpha: po * 0.9 }); }
      const ft = has('fist') ? pr : 0; if (ft > 0) { const fx = KR.scmBot[0] + (KR.scmTop[0] - KR.scmBot[0]) * 0.3, fy = KR.scmBot[1] + (KR.scmTop[1] - KR.scmBot[1]) * 0.3; ell(g, fx, fy, 14, 10, '#f08a8a', { alpha: ft * 0.7, ow: 0 }); dot(g, fx, fy, 4.5, '#5a1a1a', { alpha: ft, ow: 2 }); const u = loopT(t, 1.8); dot(g, fx - 2, fy + 8 + u * 30, 5, '#f4e27a', { alpha: ft * (1 - u), ow: 2 }); }
      const e = ease(b.bt * 1.4);
      if (has('slice')) ring(g, LX, LY, LR + 12, LR + 12, e);
      if (has('arcs') || hiList.length) ring(g, R.arch(2)[0] - 10, R.arch(2)[1] + 10, 175, 150, e);
      if (has('cleft')) ring(g, R.arch(3)[0] - 30, R.arch(3)[1], 150, 100, e);
      if (has('mem')) ring(g, KR.ear[0], KR.ear[1], 46, 54, e);
      if (has('fist') || has('syn')) ring(g, KX - 40, KY + 90, 150, 150, e);
      if (b.i < 0) { txt(g, 'embrion ~32 de zile', EX, 905, 17, '#ffd6c4', { w: 700 }); txt(g, 'copil', KX + 70, KY + 215, 17, '#ffd6c4', { w: 700 }); }
    },
  };
}
export function recap({ spec }) { return cover({ spec: { ...spec, sceneOpts: { map: [['slice', 'arcs'], ['a1'], ['a2'], ['a346'], ['cleft'], ['mem'], ['pouch'], ['fist'], ['syn']] } } }); }

/* =================================================== HARTA: aparatul faringian în secțiune frontală
   Se vede: faringele la mijloc; de fiecare parte 5 arcuri (1, 2, 3, 4, 6) de sus în jos (cranial ↑), colorate pe ARC;
   ECTODERMUL (albastru) pe fața externă, cu 4 șanțuri între arcuri; ENDODERMUL (galben) pe fața internă, cu 4 pungi între arcuri;
   membranele = punțile subțiri dintre vârful unui șanț și vârful pungii. 1 = arcurile se umplu cu mezoderm (coral) + creasta neurală
   (mov); 2 = șanțurile se adâncesc din afară; 3 = zoom pe membrana 1 din stânga: 3 straturi; 4 = pungile se adâncesc dinspre faringe. */
export function apparatus() {
  const G0 = pharynxGeo({ step: 124, y0: 150 }); const mx = G0.cx - (G0.cTip[0] + G0.pTip[0]) / 2, my = G0.yB[0];
  return {
    home: HOME, cams: [HOME, HOME, cam(mx, my, 2.6), HOME],
    anchors: [[G0.cx - G0.out[0] - 30, G0.yA[0] - 50], [G0.cx - G0.out[1] - 36, G0.yB[1]], [mx, my - 48], [G0.cx + G0.pTip[2] - 10, G0.yB[2] - 40]],
    phase: (i) => ['arcul: mezoderm + creasta neurală', 'șanțul: ectoderm, extern', 'membrana: 3 straturi', 'punga: endoderm, intern'][i] || 'aparatul faringian = 4 componente',
    draw(g, t, b) {
      bg(g);
      const p = (k) => (b.i < 0 ? 1 : b.i > k ? 1 : b.i < k ? (k === 1 || k === 3 ? 1 : 0) : ease(clamp(b.bt / (b.bd * 0.6))));
      const cd = b.i === 1 ? lerp(0.25, 1, p(1)) : 1, pd = b.i === 3 ? lerp(0.2, 1, p(3)) : 1;
      const Gm = pharynxSec(g, t, { col: true, comp: b.i < 0 ? 1 : Math.max(p(0), b.i > 0 ? 1 : 0), step: 124, y0: 150, cleftD: cd, pouchD: pd, ectoA: b.i === 1 ? 0.6 + 0.4 * Math.abs(Math.sin(t * 3)) : 1, endoA: b.i === 3 ? 0.6 + 0.4 * Math.abs(Math.sin(t * 3)) : 1 });
      const { cx, yA, yB, out } = Gm;
      // numerele arcurilor (pe arcurile din stânga) + etichetele
      ARCS.forEach((k, i) => txt(g, String(k), cx - (out[i] + 64) / 2 - 20, yA[i], 26, OUT, { stroke: false, w: 900 }));
      [0, 1, 2, 3].forEach((j) => { txt(g, `pungă ${j + 1}`, cx + 146, yB[j] - 30, 15, '#fff0b8', { alpha: b.i === 3 || b.i < 0 ? 1 : 0.55 }); txt(g, `șanț ${j + 1}`, cx + out[j] + 58, yB[j], 15, L.ectoL, { alpha: b.i === 1 || b.i < 0 ? 1 : 0.55, align: 'left' }); });
      txt(g, 'faringe', cx, 828, 18, '#fff0b8');
      txt(g, 'ectoderm', cx - 410, 840, 16, L.ectoL, { align: 'left' }); txt(g, 'endoderm', cx - 60, 870, 16, L.endo); txt(g, 'mezoderm + creasta neurală', cx + 250, 870, 16, '#ffd6c4');
      // membrana 1 (stânga): zoom, 3 straturi
      if (b.i === 2) {
        const q = p(2); const x0 = cx - Gm.cTip[0], x1 = cx - Gm.pTip[0]; const w = x1 - x0;
        g.save(); g.globalAlpha = q; [[L.ecto, 0], [L.meso, 1], [L.endo, 2]].forEach(([c, k]) => { const pp = new Path2D(); pp.roundRect(x0 + k * w / 3, my - 16, w / 3, 32, 3); paint(g, pp, c, null, null, [x0, my - 16, w, 32], OUT, 1.2); }); g.restore();
        txt(g, 'ecto', x0 - 2, my - 30, 8, L.ectoL, { alpha: q, align: 'right' }); txt(g, 'mezo', (x0 + x1) / 2, my + 30, 8, '#ffc0b6', { alpha: q }); txt(g, 'endo', x1 + 2, my - 30, 8, L.endo, { alpha: q, align: 'left' });
        txt(g, 'șanțul 1', x0 - 40, my + 6, 8, L.ectoL, { alpha: q, align: 'right' }); txt(g, 'punga 1', x1 + 40, my + 6, 8, L.endo, { alpha: q, align: 'left' });
      }
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, cx - (out[0] + 64) / 2, (yA[0] + yA[4]) / 2, 150, 340, e);
      if (b.i === 1) ring(g, cx - out[1] - 10, (yB[0] + yB[3]) / 2, 60, 250, e);
      if (b.i === 3) ring(g, cx + 140, (yB[0] + yB[3]) / 2, 110, 250, e);
    },
  };
}

/* =================================================== CRONOLOGIA: același embrion, săptămână cu săptămână (S3 → S8)
   Se vede: jos, axa S3 → S10; cursorul se oprește ÎN intervalul punctului. Deasupra, o singură etapă desenată odată:
   S3 = placa trilaminară în secțiune (ectoderm sus, mezoderm, endoderm jos); S4 = embrionul lateral, arcurile apar (cresc de la 0),
   la sfârșitul S4 se rupe membrana bucofaringiană (cerc punctat la gura primitivă care se deschide); S5 = arcurile aproape complete,
   arcul 2 începe să acopere șanțurile 2–4; S6–S7 = arcul 2 a acoperit 3–4 (gâtul neted), apare pavilionul urechii; S8 = totul
   format, arcurile colorate = derivatele la locul lor. */
export function chrono() {
  const X0 = 90, X1 = 930; const wx = (w) => lerp(X0, X1, (w - 3) / 7);
  const RANGE = [[3, 3.9], [4, 4.92], [5, 5.92], [6, 7.9], [8, 8.95]];
  const STG = [[3, 'S3: placa trilaminară'], [4, 'S4: apar arcurile faringiene'], [5, 'S5: arcurile aproape complet dezvoltate'], [6, 'S6–S7: țesuturile migrează, se diferențiază'], [8, 'S8: totul e la locul lui']];
  const EX = 540, EY = 370; const AY = 790;
  return {
    home: HOME, cams: RANGE.map(() => HOME),
    anchors: RANGE.map(([a, c]) => [wx((a + c) / 2), AY + 96]),
    phase: (i) => ['S3', 'S4', 'S5', 'S6–S7', 'S8'][i] || 'S3 → S8',
    draw(g, t, b) {
      bg(g);
      let w; if (b.i < 0) w = 3 + 6.95 * loopT(t, 20); else { const [a, c] = RANGE[b.i]; w = lerp(a, c, ease(clamp(b.bt / (b.bd * 0.8)))); }
      let si = 0; STG.forEach(([s0], k) => { if (w >= s0) si = k; });
      const ain = ease(clamp((w - STG[si][0]) / 0.12));
      if (si === 0) {
        // placa trilaminară în secțiune
        g.save(); g.globalAlpha = ain; const disc = new Path2D(); disc.ellipse(EX, EY, 300, 90, 0, 0, 7); g.save(); g.clip(disc);
        g.fillStyle = L.ecto; g.fillRect(EX - 310, EY - 92, 620, 64); g.fillStyle = L.meso; g.fillRect(EX - 310, EY - 28, 620, 56); g.fillStyle = L.endo; g.fillRect(EX - 310, EY + 28, 620, 64);
        srand(3); for (let k = 0; k < 46; k++) { const x = EX - 290 + k * 13; dot(g, x, EY - 60 + rr(-5, 5), 4.5, L.ectoS, { ow: 0, alpha: 0.6 }); dot(g, x + 5, EY + rr(-10, 10), 4, L.mesoS, { ow: 0, alpha: 0.6 }); dot(g, x + 3, EY + 60 + rr(-5, 5), 4.5, L.endoS, { ow: 0, alpha: 0.6 }); }
        g.restore(); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(disc); g.restore();
        [['ectoderm', -60, L.ectoL], ['mezoderm', 0, '#ffc0b6'], ['endoderm', 60, L.endo]].forEach(([n, dy, c]) => txt(g, n, EX + 320, EY + dy, 19, c, { alpha: ain, align: 'left' }));
      } else {
        const archP = si === 1 ? ease(clamp((w - 4) / 0.6)) : 1;
        const over = si <= 1 ? 0 : si === 2 ? 0.45 * ease(clamp((w - 5.3) / 0.6)) : si === 3 ? lerp(0.45, 1, ease(clamp((w - 6) / 1.2))) : 1;
        const ear = si >= 3 ? ease(clamp((w - 6.6) / 0.9)) : 0;
        g.save(); g.globalAlpha = ain; const R = embryoLat(g, EX, EY + 10, 0.68, t, { col: false, archP, over, ear }); g.restore();
        if (si === 1) { // membrana bucofaringiană se rupe la sfârșitul S4
          const rp = ease(clamp((w - 4.6) / 0.25)); const [mx, my] = [EX + 192 * 0.68, EY + 10 - 104 * 0.68];
          g.save(); g.globalAlpha = ain; g.setLineDash([5, 5]); g.strokeStyle = C.hi; g.lineWidth = 3; g.beginPath(); g.arc(mx, my, 16 + rp * 10, 0.4 + rp, Math.PI * 2 - 0.4 - rp); g.stroke(); g.restore();
          txt(g, rp > 0.5 ? 'membrana bucofaringiană\ns-a rupt' : 'membrana\nbucofaringiană', mx + 70, my - 70, 16, C.hi, { alpha: ain, align: 'left' }); lead(g, mx + 66, my - 56, mx + 14, my - 8, ain);
        }
        if (si === 2 || si === 3) { txt(g, 'arcul 2 acoperă\nșanțurile 2–4', R.arch(3)[0] + 150, R.arch(3)[1] + 40, 16, ARCL[2], { alpha: ain, align: 'left' }); lead(g, R.arch(3)[0] + 146, R.arch(3)[1] + 40, R.arch(3)[0] + 40, R.arch(3)[1] + 10, ain); }
        if (si === 3 && ear > 0.3) { txt(g, 'pavilionul urechii', R.ear[0] - 60, R.ear[1] - 110, 16, '#ffd6c4', { alpha: ear }); lead(g, R.ear[0] - 50, R.ear[1] - 96, R.ear[0] - 10, R.ear[1] - 30, ear); }
        if (si === 4) txt(g, 'nervi · mușchi · glande · schelet: la locul lor', EX, 128 + 0, 18, '#ffd6c4', { alpha: ain });
      }
      pill(g, EX, 92, 560, 46, '#3a2a26', '', { ow: 3 }); txt(g, STG[si][1], EX, 92, 20, C.cream, { stroke: false });
      // axa
      const band = (a, c, col, lab, act) => { const p = new Path2D(); p.roundRect(wx(a) + 2, AY - 42, wx(c) - wx(a) - 4, 30, 10); g.save(); g.globalAlpha = act; paint(g, p, col, null, null, [wx(a), AY - 42, wx(c) - wx(a), 30], OUT, 3); g.restore(); txt(g, lab, (wx(a) + wx(c)) / 2, AY - 27, 15, OUT, { stroke: false, alpha: act }); };
      band(3, 9, '#f7c3a8', 'perioada embrionară = S3–S8', 1);
      { const act = b.i === 1 || b.i === 2 || b.i < 0 ? 1 : 0.5; const p2 = new Path2D(); p2.roundRect(wx(4) + 2, AY - 78, wx(6) - wx(4) - 4, 28, 10); g.save(); g.globalAlpha = act; paint(g, p2, ARC[2], null, null, [wx(4), AY - 78, wx(6) - wx(4), 28], OUT, 3); g.restore(); txt(g, 'arcurile: S4–S5', (wx(4) + wx(6)) / 2, AY - 64, 15, OUT, { stroke: false, alpha: act }); }
      tube(g, [[X0, AY], [X1, AY]], 6, '#6b5650', { ow: 3 });
      for (let k = 3; k <= 10; k++) { g.save(); g.strokeStyle = '#d8c4b8'; g.lineWidth = 3; g.beginPath(); g.moveTo(wx(k), AY - 8); g.lineTo(wx(k), AY + 8); g.stroke(); g.restore(); txt(g, 'S' + k, wx(k), AY + 32, 18, '#ffe7d6', { w: 700 }); }
      txt(g, 'săptămâni de dezvoltare →', X1, AY + 62, 16, '#d8c4b8', { w: 600, align: 'right' });
      dot(g, wx(w), AY, 14, C.hi, { ow: 4 });
    },
  };
}

/* =================================================== CUM ARATĂ EMBRIONUL (stadiul 14, ~32 de zile; ca poza UNSW din LP)
   Se vede: embrionul mare, lateral (dorsal = stânga, ventral = dreapta), arcurile colorate pe ARC, numerotate 1–4 de sus în jos.
   1 = arcurile cresc ca benzi pe fața externă (de la 0 la forma finală); 2 = arcul 1: procesul maxilar (sus, spre ochi) și cel
   mandibular (jos) se aprind; 3 = șanțurile dintre benzi pulsează (adâncituri de ectoderm); 4 = inima bate; din sacul aortic
   (sus pe inimă) sângele curge spre fiecare arc (săgeți roșii). Arcul 6 nu se vede: e ascuns caudal, lângă arcul 4. */
export function embryo() {
  const EX = 600, EY = 470, ES = 0.98;
  const R0 = embryoLat(null, EX, EY, ES, 0, { alpha: 0 });
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[R0.archD(2)[0] - 46, R0.archD(2)[1] - 4], [R0.max[0] - 40, R0.max[1] - 40], [R0.cleft(1)[0] - 80, R0.cleft(1)[1] + 30], [R0.heart[0] + 40, R0.heart[1] + 96]],
    phase: (i) => ['benzi pe fața externă', 'arcul 1: maxilar + mandibular', 'șanțurile', 'inima → sacul aortic'][i] || 'stadiul 14 · ~32 de zile',
    draw(g, t, b) {
      bg(g);
      const p = P(b, t, 4);
      const archP = b.i === 0 ? lerp(0.15, 1, p(0)) : 1;
      const R = embryoLat(g, EX, EY, ES, t, { col: true, archP, hi: b.i === 1 ? [1, 'max'] : [], dimArc: 0.45 });
      [1, 2, 3, 4].forEach((k) => { const [x, y] = R.archV(k); txt(g, String(k), x - 24, y + 2, k === 1 ? 26 : 22, OUT, { stroke: false, w: 900, alpha: archP }); });
      // procesele arcului 1
      const q1 = b.i < 0 ? 1 : b.i >= 1 ? (b.i === 1 ? p(1) : 1) : 0;
      if (q1 > 0) { txt(g, 'proces\nmaxilar', 930, R.max[1] - 70, 17, ARCL[1], { alpha: q1 }); lead(g, 920, R.max[1] - 48, R.max[0] + 50, R.max[1] - 6, q1); txt(g, 'proces\nmandibular', 930, R.mand[1] + 40, 17, ARCL[1], { alpha: q1 }); lead(g, 912, R.mand[1] + 24, R.mand[0] + 90, R.mand[1] + 10, q1); }
      // șanțurile
      if (b.i === 2 || b.i < 0) { const q = b.i < 0 ? 1 : p(2); [0, 1, 2].forEach((j) => { const c = R.cleft(j); dot(g, c[0] - 30, c[1], 7, L.ecto, { alpha: q * (0.5 + 0.5 * Math.abs(Math.sin(t * 3 + j))), ow: 2 }); }); txt(g, 'șanțuri (ectoderm)', R.cleft(1)[0] - 150, R.cleft(1)[1] + 120, 17, L.ectoL, { alpha: q }); lead(g, R.cleft(1)[0] - 130, R.cleft(1)[1] + 104, R.cleft(1)[0] - 40, R.cleft(1)[1] + 6, q); }
      // inima → sacul aortic → arcuri
      const q4 = b.i === 3 ? p(3) : b.i < 0 ? 1 : 0;
      if (q4 > 0) { [1, 2, 3, 4].forEach((k, j) => { const v = R.archV(k); const path = curve([R.sac, [lerp(R.sac[0], v[0], 0.5) + 30, lerp(R.sac[1], v[1], 0.5)], [v[0] - 6, v[1]]], 10); tube(g, path, 6, L.art, { raw: true, ow: 3, alpha: q4, u1: q4 }); flow(g, path, t + j * 0.3, '#ffd0d0', 3, 0.5, 4, { alpha: q4, u1: q4 }); }); txt(g, 'sacul\naortic', 940, R.sac[1] + 30, 17, '#ffc0b6', { alpha: q4 }); lead(g, 920, R.sac[1] + 30, R.sac[0] + 20, R.sac[1] + 6, q4); txt(g, 'inima', R.heart[0] + 60, R.heart[1] + 110, 17, '#ffc0b6', { alpha: q4 }); }
      // arcul 6: ascuns, caudal de 4
      if (b.i === 0 || b.i < 0) { const v = R.arch(4); txt(g, 'arcul 6: ascuns, caudal', v[0] - 60, v[1] + 80, 16, '#d8c4b8', { alpha: b.i < 0 ? 1 : p(0) }); }
      txt(g, 'ochi', R.eye[0], R.eye[1] - 50, 16, '#ffd6c4'); txt(g, 'mugurele membrului superior', R.limb[0] + 30, R.limb[1] + 66, 16, '#ffd6c4'); txt(g, 'ficat', R.liver[0] + 70, R.liver[1] + 60, 16, '#ffd6c4');
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, R.arch(2)[0], R.arch(2)[1] + 20, 190, 150, e);
      if (b.i === 1) ring(g, R.mand[0] + 10, R.mand[1] - 26, 150, 66, e, -0.1);
      if (b.i === 2) ring(g, R.cleft(1)[0] - 30, R.cleft(1)[1], 120, 110, e);
      if (b.i === 3) ring(g, R.heart[0], R.heart[1], 100, 104, e);
    },
  };
}

/* =================================================== DE UNDE VIN: secțiune transversală prin embrionul plicaturat (S4, dorsal ↑)
   Se vede: ovalul corpului acoperit de ECTODERM (albastru); sus la mijloc tubul neural (inel cu lumen), dedesubt notocorda;
   de o parte și de alta mezodermul: paraxial (somitul, mare, lângă tub) → intermediar (mic) → placa laterală (2 foițe: una sub ectoderm,
   una în jurul intestinului, cu celomul între ele); jos la mijloc intestinul (ENDODERM galben, cu lumen).
   1 = faldurile neurale se ridică și se închid în tub (ectodermul de suprafață se reface deasupra); 2 = cele 3 părți ale mezodermului
   se aprind pe rând (paraxial → intermediar → lateral); 3 = celulele crestei neurale (mov) pleacă de pe marginea dorsală a tubului
   și coboară DORSO-VENTRAL, între ectoderm și somit, pe lateral, spre ventral (spre arcuri) — totul în interiorul corpului;
   4 = lupa: craniul în profil, cu oasele feței (din creasta neurală) colorate mov. */
export function origin() {
  const CX = 540, CY = 350, RX = 310, RY = 236;
  const ncPath = (s) => curve([[CX + s * 46, CY - 196], [CX + s * 120, CY - 196], [CX + s * 236, CY - 150], [CX + s * 292, CY - 40], [CX + s * 288, CY + 90], [CX + s * 220, CY + 190], [CX + s * 120, CY + 232]], 10);
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[CX - 110, CY - 230], [CX - 150, CY - 40], [CX + 330, CY + 40], [690, 660]],
    phase: (i) => ['ectoderm + tub neural', 'mezodermul: 3 părți', 'creasta: dorso-ventral', 'scheletul craniofacial'][i] || 'trei foițe + creasta neurală',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const close = b.i === 0 ? p(0) : 1;
      // corpul (mezenchim) + ectodermul de suprafață
      const body = new Path2D(); body.ellipse(CX, CY, RX, RY, 0, 0, 7);
      paint(g, body, L.mes, L.mesS, L.mesL, [CX - RX, CY - RY, RX * 2, RY * 2], OUT, 0);
      g.save(); g.strokeStyle = OUT; g.lineWidth = 24; g.stroke(body); g.strokeStyle = L.ecto; g.lineWidth = 16; g.stroke(body); g.restore();
      // celomul (cavitate) între cele 2 foițe ale plăcii laterale
      const coel = new Path2D(); coel.ellipse(CX, CY + 95, RX - 70, RY - 120, 0, 0, Math.PI); coel.ellipse(CX, CY + 95, RX - 120, 40, 0, Math.PI, 0, true);
      // tubul neural (faldurile se închid)
      const ty = CY - 150 + 30 * (1 - close);
      if (close < 0.98) { // jgheabul neural deschis
        [-1, 1].forEach((sd) => tube(g, [[CX + sd * 80, CY - 238], [CX + sd * (64 - 40 * close), CY - 210 + 10 * close], [CX + sd * (40 - 30 * close), ty - 60 * close]], 26, L.ectoL, { ow: 5 }));
      }
      const nt = new Path2D(); nt.ellipse(CX, ty, 56 * (0.6 + 0.4 * close), 66 * close + 10, 0, 0, 7); g.save(); g.globalAlpha = close; paint(g, nt, L.ectoL, '#9cc0f5', '#ffffff', [CX - 56, ty - 76, 112, 152], OUT, 5); ell(g, CX, ty, 11, 30 * close + 4, '#2a1d30', { ow: 3 }); g.restore();
      ell(g, CX, CY - 52, 17, 17, '#cfc2e8', { ow: 4 }); // notocorda
      // mezodermul
      const q2 = (k) => (b.i < 0 || b.i > 1 ? 1 : b.i === 1 ? Math.max(0.35, sp(p(1), k * 0.28, k * 0.28 + 0.4)) : 0.35);
      [-1, 1].forEach((sd) => {
        ell(g, CX + sd * 150, CY - 110, 74, 62, L.meso, { shade: L.mesoS, light: L.mesoL, alpha: q2(0) });
        ell(g, CX + sd * 236, CY - 22, 30, 26, L.meso, { shade: L.mesoS, light: L.mesoL, alpha: q2(1) });
        tube(g, [[CX + sd * 262, CY + 20], [CX + sd * 292, CY + 110], [CX + sd * 230, CY + 196], [CX + sd * 120, CY + 228]], 18, L.meso, { ow: 4, alpha: q2(2) });
        tube(g, [[CX + sd * 222, CY + 30], [CX + sd * 210, CY + 100], [CX + sd * 150, CY + 140], [CX + sd * 104, CY + 120]], 18, L.meso, { ow: 4, alpha: q2(2) });
      });
      // intestinul (endoderm)
      ell(g, CX, CY + 92, 98, 64, L.endo, { shade: L.endoS, light: L.endoL, ow: 5 }); ell(g, CX, CY + 92, 46, 26, '#3a2620', { ow: 3 });
      const lab = (s0, x, y, c, a, al = 'center', sz = 16) => txt(g, s0, x, y, sz, c, { alpha: a, align: al });
      lab('tub neural', CX + 80, CY - 236, L.ectoL, 1, 'left'); lead(g, CX + 76, CY - 230, CX + 44, CY - 186, 1);
      lab('ectoderm', CX - RX - 14, CY + 40, L.ectoL, 1, 'right'); lab('notocorda', CX, CY - 22, '#e6dcff', 1, 'center', 14); lab('endoderm', CX, CY + 182, L.endo, 1);
      lab('paraxial\n(somitic)', CX - 150, CY - 110, OUT, q2(0) > 0.5 ? 1 : 0.6, 'center', 15); lab('intermediar', CX - 236, CY + 26, '#ffd6c4', q2(1), 'center', 14); lab('placa laterală', CX - 330, CY + 200, '#ffc0b6', q2(2), 'right');
      // creasta neurală: celulele de pe marginea dorsală a tubului; migrează dorso-ventral, în interiorul corpului
      const mig = b.i < 0 ? 1 : b.i >= 2 ? (b.i === 2 ? p(2) : 1) : 0;
      [-1, 1].forEach((sd) => {
        const path = ncPath(sd);
        if (close > 0.9) for (let k = 0; k < 3; k++) dot(g, CX + sd * (30 + k * 12), ty - 70 + k * 4, 8, L.nc, { ow: 2.5 });
        if (mig > 0) for (let k = 0; k < 9; k++) { const u = ((k / 9) + (REDUCED ? 0 : t * 0.16)) % 1; if (u > mig) continue; const [x, y] = at(path, u); dot(g, x, y, 8, L.nc, { ow: 2.5, alpha: Math.sin(u * Math.PI) ** 0.25 }); }
      });
      lab('creasta neurală', CX + 160, CY - 268, L.ncL, close, 'left'); lead(g, CX + 156, CY - 262, CX + 50, CY - 222, close);
      if (mig > 0) { arr(g, CX + 330, CY - 120, CX + 344, CY + 40, L.nc, 6, mig); lab('dorso-\nventral', CX + 400, CY - 40, L.ncL, mig, 'center', 17); lab('→ ventral, spre arcurile faringiene', CX - 40, CY + RY + 34, L.ncL, mig, 'center', 16); }
      // 4: craniul cu oasele feței din creasta neurală (mov)
      const q4 = b.i < 0 ? 0.75 : b.i === 3 ? p(3) : 0;
      lupa(g, 820, 760, 130, q4, () => skullLat(g, 830, 760, 0.6, { face: L.nc, faceS: L.ncS }));
      if (q4 > 0.2) txt(g, 'oasele feței = creasta neurală', 760, 915, 16, L.ncL, { alpha: q4 });
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, CX, CY - 160, 120, 100, e);
      if (b.i === 1) ring(g, CX - 200, CY - 30, 150, 190, e);
      if (b.i === 2) ring(g, CX + 250, CY, 110, 250, e);
      if (b.i === 3) ring(g, 820, 760, 140, 140, e);
    },
  };
}

/* =================================================== REȚETA UNUI ARC: secțiune printr-un singur arc
   Se vede (ca schema din LP): un oval mare; pe marginea stângă-sus ECTODERMUL (albastru, exteriorul), pe marginea dreaptă
   ENDODERMUL (galben, spre faringe); înăuntru mezenchimul (mezoderm coral + creasta neurală mov). 1 = celulele crestei (mov) se
   strâng la centru → bara de cartilaj; 2 = celulele mezodermului (coral) se aliniază jos-dreapta → mușchiul striat; 3 = nervul
   (cordon galben-pai, în secțiune: fascicule) jos-stânga; impulsuri pleacă din nerv spre mușchiul acestui arc; 4 = artera arcului
   (inel roșu cu lumen) sus-dreapta; sângele pulsează (vine din sacul aortic). */
export function recipe() {
  const CX = 520, CY = 470, RX = 360, RY = 270;
  const CART = [CX - 30, CY - 20], MUS = [CX + 140, CY + 110], NER = [CX - 190, CY + 100], ART = [CX + 150, CY - 130];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[CART[0] - 160, CART[1] - 50], [MUS[0] + 140, MUS[1] - 50], [NER[0] - 70, NER[1] - 70], [ART[0] + 84, ART[1] + 10]],
    phase: (i) => ['cartilaj ← creasta neurală', 'mușchi ← mezoderm', 'nervul arcului', 'artera arcului'][i] || '4 primordii',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const ov = new Path2D(); ov.ellipse(CX, CY, RX, RY, 0, 0, 7);
      paint(g, ov, L.mes, L.mesS, L.mesL, [CX - RX, CY - RY, RX * 2, RY * 2], OUT, 0);
      // marginile: ectoderm (stânga-sus) + endoderm (dreapta)
      g.save(); g.lineCap = 'round'; g.lineWidth = 26; g.strokeStyle = OUT; g.beginPath(); g.ellipse(CX, CY, RX, RY, 0, Math.PI * 0.62, Math.PI * 1.62); g.stroke(); g.strokeStyle = L.ecto; g.lineWidth = 18; g.stroke();
      g.strokeStyle = OUT; g.lineWidth = 26; g.beginPath(); g.ellipse(CX, CY, RX, RY, 0, -Math.PI * 0.38, Math.PI * 0.62); g.stroke(); g.strokeStyle = L.endo; g.lineWidth = 18; g.stroke(); g.restore();
      txt(g, 'ECTODERM (exterior)', CX - 270, CY - 300, 18, L.ectoL); txt(g, 'ENDODERM (spre faringe)', CX + 260, CY + 300, 18, L.endo);
      // celule libere: creasta (mov) + mezoderm (coral); se strâng în primordii
      srand(17);
      const cN = 26, mN = 22; const cg = b.i < 0 ? 1 : b.i >= 0 ? (b.i === 0 ? p(0) : 1) : 0; const mg = b.i < 0 ? 1 : b.i >= 1 ? (b.i === 1 ? p(1) : 1) : 0;
      for (let k = 0; k < cN; k++) { const x0 = CX + rr(-280, 260), y0 = CY + rr(-190, 190); const u = (k + 0.5) / cN; const x1 = CART[0] - 120 + u * 240, y1 = CART[1] + Math.sin(u * 9) * 14; dot(g, lerp(x0, x1, cg), lerp(y0, y1, cg), 9, L.nc, { ow: 2.5, alpha: 1 - cg * 0.8 }); }
      for (let k = 0; k < mN; k++) { const x0 = CX + rr(-280, 260), y0 = CY + rr(-190, 190); const col = k % 4; const x1 = MUS[0] - 90 + (k % 6) * 36, y1 = MUS[1] - 30 + Math.floor(k / 6) * 20; dot(g, lerp(x0, x1, mg), lerp(y0, y1, mg), 9, L.meso, { ow: 2.5, alpha: 1 - mg * 0.8 }); }
      // 1 cartilajul (mov, din creasta neurală)
      if (cg > 0.3) { g.save(); g.globalAlpha = sp(cg, 0.3, 1); const cb = new Path2D(); cb.roundRect(CART[0] - 130, CART[1] - 36, 260, 72, 34); paint(g, cb, L.nc, L.ncS, L.ncL, [CART[0] - 130, CART[1] - 36, 260, 72], OUT, 5); for (let k = 0; k < 7; k++) { ell(g, CART[0] - 100 + k * 33, CART[1] + (k % 2 ? 8 : -8), 9, 8, '#efe4ff', { ow: 2 }); } g.restore(); txt(g, 'cartilaj', CART[0], CART[1] - 60, 19, L.ncL, { alpha: sp(cg, 0.3, 1) }); }
      // 2 mușchiul (coral, din mezoderm)
      if (mg > 0.3) { muscle(g, MUS[0], MUS[1], 230, 92, -0.12, L.meso, { alpha: sp(mg, 0.3, 1), shade: L.mesoS }); txt(g, 'mușchi', MUS[0], MUS[1] + 74, 19, '#ffc0b6', { alpha: sp(mg, 0.3, 1) }); }
      // 3 nervul (în secțiune: fascicule)
      const ng = b.i < 0 ? 1 : b.i >= 2 ? (b.i === 2 ? p(2) : 1) : 0;
      if (ng > 0) { g.save(); g.globalAlpha = ng; ell(g, NER[0], NER[1], 62 * (0.5 + 0.5 * ng), 56 * (0.5 + 0.5 * ng), L.nerve, { shade: L.nerveS, ow: 5 }); [[-20, -14], [16, -18], [-6, 16], [24, 14], [-28, 14]].forEach(([dx, dy]) => ell(g, NER[0] + dx * ng, NER[1] + dy * ng, 12 * ng, 11 * ng, '#fffbe2', { ow: 2.5, sc: L.nerveS })); g.restore(); txt(g, 'nerv', NER[0], NER[1] - 80, 19, L.nerve, { alpha: ng });
        if (mg > 0.5) { const path = curve([[NER[0] + 50, NER[1] - 10], [CX - 20, CY + 150], [MUS[0] - 110, MUS[1] + 10]], 10); g.save(); g.globalAlpha = ng * 0.7; g.setLineDash([8, 8]); g.strokeStyle = L.nerve; g.lineWidth = 4; g.beginPath(); g.moveTo(path[0][0], path[0][1]); path.forEach((q) => g.lineTo(q[0], q[1])); g.stroke(); g.restore(); flow(g, path, t, '#fff7c8', 3, 0.6, 6, { alpha: ng }); } }
      // 4 artera arcului
      const ag = b.i < 0 ? 1 : b.i === 3 ? p(3) : 0;
      if (ag > 0) { const pulse = REDUCED ? 0 : Math.max(0, Math.sin(t * 6)) ** 4 * 5; g.save(); g.globalAlpha = ag; ell(g, ART[0], ART[1], 52 * ag + pulse, 52 * ag + pulse, L.art, { shade: L.artS, light: '#ff8a8a', ow: 5 }); ell(g, ART[0], ART[1], 26 * ag + pulse * 0.6, 26 * ag + pulse * 0.6, L.lum, { ow: 3 }); for (let k = 0; k < 4; k++) { const a = t * 2 + k * 1.6; dot(g, ART[0] + Math.cos(a) * 12, ART[1] + Math.sin(a) * 12, 5, '#ff9a9a', { ow: 1.5 }); } g.restore(); txt(g, 'arteră\n(arc aortic)', ART[0] - 74, ART[1] - 4, 18, '#ffc0b6', { alpha: ag, align: 'right' }); }
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, CART[0], CART[1], 160, 70, e);
      if (b.i === 1) ring(g, MUS[0], MUS[1], 140, 70, e);
      if (b.i === 2) ring(g, NER[0], NER[1], 80, 76, e);
      if (b.i === 3) ring(g, ART[0], ART[1], 74, 74, e);
    },
  };
}

/* =================================================== CÂTE SUNT: coloana arcurilor (cranial ↑) → fața și gâtul copilului
   Se vede: stânga, 6 „sloturi” de sus în jos (1, 2, 3, 4, 5, 6), arcurile colorate pe ARC; slotul 5 = contur punctat gri.
   Dreapta, copilul în profil (fața spre stânga). 1 = slotul 5 se micșorează și dispare (X) → rămân 5 arcuri; 2 = particule teal și
   roz curg din arcurile 1 și 2 spre fața copilului; pe față se aprind mandibula + maxila (teal) și oscioarele (roz, lângă ureche);
   3 = particule verzi și portocalii spre gât: hioidul (roz sus / verde jos) și faringele; 4 = arcurile 4 și 6 alunecă unul spre altul
   și se unesc; pe gât se aprind cartilajele laringelui (portocaliu → maro). */
export function count() {
  const COLX = 210; const Y = { 1: 190, 2: 300, 3: 400, 4: 490, 5: 570, 6: 650 }; const HX = 700, HY = 380, HS = 0.95;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[COLX + 150, Y[5]], [COLX + 160, (Y[1] + Y[2]) / 2], [COLX + 160, (Y[3] + Y[4]) / 2 - 10], [COLX - 150, (Y[4] + Y[6]) / 2]],
    phase: (i) => ['1, 2, 3, 4, 6 (arcul 5 lipsește)', 'arcurile 1 + 2 → fața', 'arcurile 3 + 4 → gâtul', 'arcurile 4 + 6 → laringele'][i] || '5 arcuri',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const K = childHead(null, HX, HY, HS, t, { alpha: 0, neck: true });
      childHead(g, HX, HY, HS, t, { neck: true });
      const merge = b.i < 0 ? 1 : b.i === 3 ? p(3) : b.i > 3 ? 1 : 0;
      const gone = b.i < 0 ? 1 : b.i === 0 ? p(0) : 1;
      [1, 2, 3, 4, 6].forEach((k) => {
        let y = Y[k]; if (k === 4) y = lerp(Y[4], (Y[4] + Y[6]) / 2 - 22, merge); if (k === 6) y = lerp(Y[6], (Y[4] + Y[6]) / 2 + 22, merge);
        const w = { 1: 230, 2: 210, 3: 190, 4: 170, 6: 150 }[k];
        const pp = new Path2D(); pp.roundRect(COLX - w / 2, y - 32, w, 64, 32); paint(g, pp, ARC[k], ARCS_[k], ARCL[k], [COLX - w / 2, y - 32, w, 64], OUT, 5);
        txt(g, k === 1 ? 'Arcul 1 · maxilar + mandibular' : 'Arcul ' + k, COLX, y, k === 1 ? 16 : 19, OUT, { stroke: false });
      });
      // arcul 5: nu se formează
      const a5 = 1 - gone * 0.85; g.save(); g.globalAlpha = a5; g.setLineDash([10, 8]); g.strokeStyle = '#bfaea6'; g.lineWidth = 4; g.beginPath(); g.roundRect(COLX - 80 * (1 - gone * 0.4), Y[5] - 22, 160 * (1 - gone * 0.4), 44, 22); g.stroke(); g.restore();
      txt(g, 'arcul 5: nu se formează', COLX, Y[5], 14, '#d8c4b8', { alpha: Math.max(0.5, a5) * (1 - merge) });
      if (gone > 0.5 && merge < 0.99) { g.save(); g.globalAlpha = sp(gone, 0.5, 1) * (1 - merge); g.strokeStyle = '#ff6b5e'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(COLX + 96, Y[5] - 20); g.lineTo(COLX + 128, Y[5] + 20); g.moveTo(COLX + 128, Y[5] - 20); g.lineTo(COLX + 96, Y[5] + 20); g.stroke(); g.restore(); }
      txt(g, 'cranial', COLX - 170, 150, 15, '#d8c4b8'); txt(g, 'caudal', COLX - 170, 700, 15, '#d8c4b8'); arr(g, COLX - 170, 170, COLX - 170, 676, '#bfaea6', 4, 0.7);
      // fluxuri spre copil
      const fa = b.i < 0 ? 1 : b.i === 1 ? p(1) : b.i > 1 ? 1 : 0, ne = b.i < 0 ? 1 : b.i === 2 ? p(2) : b.i > 2 ? 1 : 0;
      const stream = (k, tgt, a) => { if (a <= 0.01) return; const path = curve([[COLX + 120, Y[k]], [lerp(COLX + 120, tgt[0], 0.5), lerp(Y[k], tgt[1], 0.5) - 40], tgt], 10); g.save(); g.globalAlpha = a * 0.35; g.setLineDash([6, 8]); g.strokeStyle = ARC[k]; g.lineWidth = 3; g.beginPath(); g.moveTo(path[0][0], path[0][1]); path.forEach((q) => g.lineTo(q[0], q[1])); g.stroke(); g.restore(); flow(g, path, t + k, ARC[k], 4, 0.3, 7, { alpha: a }); };
      stream(1, [K.chin[0] + 60, K.chin[1] - 20], fa); stream(2, [K.ear[0] - 20, K.ear[1] + 10], fa);
      stream(3, [K.throat[0] + 40, K.throat[1] - 10], ne); stream(4, [K.throat[0] + 30, K.throat[1] + 30], ne);
      // fața: mandibula + maxila (1), oscioarele lângă ureche (2)
      if (fa > 0) { g.save(); g.globalAlpha = fa; tube(g, [[HX + 10 * HS, HY + 150 * HS], [HX - 70 * HS, HY + 164 * HS], [HX - 144 * HS, HY + 138 * HS]], 18, ARC[1], { ow: 4 }); dot(g, K.ear[0] - 34, K.ear[1] + 4, 9, ARC[2], { ow: 3 }); dot(g, K.ear[0] - 52, K.ear[1] + 6, 8, ARC[1], { ow: 3 }); g.restore(); txt(g, 'FAȚA: fălci, oasele urechii medii,\nmasticatori, mimica', HX - 30, HY - 290, 17, '#ffd6c4', { alpha: fa }); }
      // gâtul: hioidul (2 sus + 3 jos), faringele
      if (ne > 0) { const hx = HX - 40 * HS, hy = HY + 214 * HS; g.save(); g.globalAlpha = ne; tube(g, [[hx - 40, hy - 6], [hx + 14, hy - 8]], 11, ARC[2], { ow: 3 }); tube(g, [[hx - 40, hy + 6], [hx + 14, hy + 4], [hx + 56, hy - 6]], 11, ARC[3], { ow: 3 }); g.restore(); txt(g, 'hioid', hx - 80, hy, 16, '#ffd6c4', { alpha: ne, align: 'right' }); txt(g, 'GÂTUL: hioid, faringe, laringe', HX + 40, HY + 400, 17, '#ffd6c4', { alpha: ne }); }
      // 4 + 6 → cartilajele laringelui
      if (merge > 0) { const lx = HX - 46 * HS, ly = HY + 270 * HS; g.save(); g.globalAlpha = merge; const lp = new Path2D(); lp.moveTo(lx - 32, ly - 22); lp.lineTo(lx + 28, ly - 22); lp.lineTo(lx + 18, ly + 28); lp.lineTo(lx - 24, ly + 28); lp.closePath(); const gr = g.createLinearGradient(lx, ly - 22, lx, ly + 28); gr.addColorStop(0, ARC[4]); gr.addColorStop(1, ARC[6]); paint(g, lp, gr, null, null, [lx - 32, ly - 22, 60, 50], OUT, 4); g.restore(); txt(g, 'cartilajele laringelui', lx - 60, ly + 4, 16, ARCL[4], { alpha: merge, align: 'right' }); txt(g, '4 + 6 fuzionează', COLX, (Y[4] + Y[6]) / 2 + 80, 16, ARCL[4], { alpha: merge }); }
      const e = ease(b.bt * 1.4);
      if (b.i === 0) ring(g, COLX, Y[5], 150, 42, e);
      if (b.i === 1) ring(g, COLX, (Y[1] + Y[2]) / 2, 150, 110, e);
      if (b.i === 2) ring(g, COLX, (Y[3] + Y[4]) / 2, 140, 100, e);
      if (b.i === 3) ring(g, COLX, (Y[4] + Y[6]) / 2, 130, 90, e);
    },
  };
}
