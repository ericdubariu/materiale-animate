// Partea de început + Partea A (preenteronul): coperta, harta, cronologia, gura, cele 2 rotații ale stomacului, omentele, duodenul.
// Orientări: harta / gura = vedere laterală (cranial STÂNGA, dorsal SUS). Secțiunile transversale = privite DE SUS (dinspre cranial):
// dorsal sus, STÂNGA EMBRIONULUI = DREAPTA ECRANULUI (ca în figurile LP). Vederile din față: dreapta embrionului = stânga ecranului.
import {
  HOME, D, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead, lab,
  stage, OUT, clamp, lerp, ease, paint, smooth, REDUCED, st, gutMap, duoSection, arcArrow, cross, coils, mix,
} from './dg.js';

/* =================================================== COPERTA + RECAPITULAREA (harta cu ținte) */
const CHL = [['fore', 'mid', 'hind'], ['stomach', 'loop', 'cloaca'], ['liver'], ['lung']];
export function cover({ spec }) {
  const map = (spec.sceneOpts && spec.sceneOpts.map) || null; // recapitulare: rândul tabelului → ținte
  const sets = map || CHL;
  const k = {};
  return {
    home: HOME,
    anchors: map ? [] : [[300, 405], [520, 590], [480, 545], [255, 560]],
    phase: (i) => (map ? '' : ['3 segmente, 3 artere', 'rotații, hernie, sept', 'muguri din endoderm', 'diverticulul respirator'][i] || ''),
    draw(g, t, b) {
      bg(g);
      const cur = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 2.6) % sets.length : b.i;
      const want = {}; (sets[cur] || []).forEach((n) => (want[n] = 1));
      for (const n of ['fore', 'mid', 'hind', 'mouth', 'stomach', 'loop', 'cloaca', 'liver', 'lung']) k[n] = lerp(k[n] || 0, want[n] || 0, 0.08);
      gutMap(g, t, k);
    },
  };
}

/* =================================================== HARTA: 3 segmente, 3 artere */
export function map() {
  const k = { fore: 0, mid: 0, hind: 0 };
  return {
    home: HOME,
    anchors: [[262, 402], [640, 448], [812, 404]],
    phase: (i) => ['preenteron · a. celiacă', 'mesenteron · a. mezenterică sup.', 'metenteron · a. mezenterică inf.'][i] || 'tubul intestinal primitiv',
    draw(g, t, b) {
      bg(g);
      const cur = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 2.4) % 3 : b.i;
      ['fore', 'mid', 'hind'].forEach((n, j) => (k[n] = lerp(k[n], j === cur ? 1 : 0, 0.08)));
      gutMap(g, t, k);
    },
  };
}

/* =================================================== CRONOLOGIA S3 → S11 */
// Ce trebuie să se vadă: axa S3–S11; benzi pe sisteme; evenimentele punctului curent se aprind (cursorul galben arată doar unde ești).
export function timeline() {
  const X = (w) => 215 + (w - 3) * 92;
  const LANES = [['Tubul + gura', D.endo], ['Ficatul', D.liverL], ['Plămânul', D.lung], ['Duodenul', D.mesoP], ['Ansa intestinală', D.colon], ['Cloaca', '#c39af0']];
  const LY = LANES.map((_, i) => 150 + i * 118);
  // [bandă, w0, w1, text, punctul, dx, dy]
  const EV = [
    [0, 3, 3, 'tubul intestinal\ndin endoderm', 0, 70, -42],
    [1, 3, 3, 'diverticulul hepatic', 0, 60, -36],
    [0, 4, 4, '3 segmente · stomac fusiform\nse rupe membrana bucofaringiană', 1, 190, 40],
    [2, 4, 4, 'diverticulul respirator', 1, 40, -36],
    [2, 5, 5, 'bronhiile lobare (3 dr. + 2 stg.)', 2, 150, 34],
    [3, 5, 6, 'lumenul se astupă (S5–S6)', 2, 60, -36],
    [3, 8, 8, 'se recanalizează', 2, 20, -36],
    [4, 6, 10, 'hernia fiziologică', 2, 190, -36],
    [5, 7, 7, 'membrana cloacală se rupe\n→ 2 orificii', 2, 40, -46],
    [4, 10, 10, 'hernia se retrage', 3, -10, 38],
  ];
  const RANGE = [[3, 3.5], [3.5, 4.5], [4.5, 9.2], [9.2, 11]];
  return {
    home: HOME,
    anchors: [[X(3), 842], [X(4), 842], [X(6.6), 842], [X(10), 842]],
    phase: (i) => ['S3', 'S4', 'S5 → S8', 'S10'][i] || 'S3 → S11',
    draw(g, t, b) {
      bg(g);
      let cw;
      if (b.i < 0) cw = lerp(3, 11, loopT(t, 10));
      else { const [a, c] = RANGE[b.i]; cw = lerp(a, c, ease(clamp(b.bt / (b.bd * 0.75)))); }
      tube(g, [[X(3) - 20, 880], [X(11) + 20, 880]], 6, '#6b5650', { ow: 3 });
      for (let w = 3; w <= 11; w++) { tube(g, [[X(w), 870], [X(w), 890]], 3, '#6b5650', { ow: 0 }); txt(g, 'S' + w, X(w), 912, 16, D.note, { w: 700 }); }
      LANES.forEach(([n, c], i) => {
        g.save(); g.strokeStyle = 'rgba(255,230,210,.10)'; g.lineWidth = 2; g.setLineDash([8, 10]); g.beginPath(); g.moveTo(X(3), LY[i]); g.lineTo(X(11), LY[i]); g.stroke(); g.restore();
        txt(g, n, 98, LY[i], 17, c, { w: 800 });
      });
      EV.forEach(([ln, w0, w1, s, gi, dx, dy]) => {
        const c = LANES[ln][1]; const vis = cw >= w0 - 0.02; const act = b.i === gi || b.i < 0;
        const a = vis ? (act ? 1 : 0.5) : 0.13;
        const we = Math.min(w1, Math.max(w0, cw));
        if (w1 > w0) tube(g, [[X(w0), LY[ln]], [X(Math.max(w0 + 0.05, vis ? we : w1)), LY[ln]]], 18, c, { ow: 4, alpha: a });
        else dot(g, X(w0), LY[ln], 12, c, { alpha: a, ow: 3 });
        txt(g, s, X(w0) + dx, LY[ln] + dy, 16, D.cream, { alpha: a, w: 700 });
      });
      tube(g, [[X(cw), 70], [X(cw), 880]], 3, '#ffe36e', { ow: 0, alpha: 0.7 });
      dot(g, X(cw), 880, 12, '#ffe36e', { ow: 3 });
    },
  };
}

/* =================================================== GURA: ruperea membranei bucofaringiene */
// Ce trebuie să se vadă (secțiune sagitală, cranial stânga, dorsal sus): stomodeul (ectoderm, albastru) e închis de membrana
// bucofaringiană (ecto + endo). Pct. 1: membrana se fisurează din centru, marginile se retrag. Pct. 2: lichidul amniotic intră
// prin gură → faringe → esofag → stomac → intestin, de acolo în vase (roșu) → placentă.
const SWALLOW = [[20, 425], [140, 425], [260, 425], [350, 425], [480, 425], [600, 425], [690, 428], [760, 436], [810, 440], [880, 470], [915, 520], [935, 570]];
const BLOOD = [[935, 590], [915, 680], [870, 760], [830, 820]];
export function mouth() {
  return {
    home: HOME,
    anchors: [[318, 352], [800, 372]],
    phase: (i) => ['S4 · membrana se rupe', 'fătul înghite lichid amniotic'][i] || 'gura primitivă',
    draw(g, t, b) {
      bg(g);
      const p = P(b, t, 2); const r = p(0), f = p(1);
      // cavitatea amniotică (stânga)
      g.save(); g.fillStyle = 'rgba(159,216,255,.12)'; g.beginPath(); g.roundRect(-40, 300, 150, 250, 30); g.fill(); g.restore();
      lab(g, 'lichid\namniotic', 52, 270, 16, D.amn);
      // capul: creierul (dorsal) + proeminența cardiacă (ventral)
      ell(g, 300, 225, 205, 118, '#c9b3f0', { ow: 6, shade: '#a98ae6' }); lab(g, 'creier (prozencefal)', 300, 200, 18, OUT, { stroke: false });
      ell(g, 430, 585, 150, 88, '#f29b93', { ow: 6, shade: '#d97a70' }); lab(g, 'proeminența cardiacă', 450, 565, 16, OUT, { stroke: false });
      // ectodermul de suprafață care căptușește stomodeul (fosa dintre creier și inimă)
      tube(g, [[100, 362], [230, 372], [344, 374]], 14, D.ecto, { ow: 4 }); tube(g, [[100, 488], [230, 478], [344, 476]], 14, D.ecto, { ow: 4 });
      lab(g, 'stomodeu (ectoderm)', 215, 512, 16, D.ectoL);
      // faringe → esofag → stomac → intestin (endoderm)
      tube(g, [[358, 425], [480, 425], [600, 425]], 104, D.endo, { ow: 6, lumen: D.endoL });
      tube(g, [[600, 425], [700, 428], [745, 434]], 40, D.endo, { ow: 6, lumen: D.endoL });
      ell(g, 800, 442, 66, 46, D.endo, { ow: 6, shade: D.endoS });
      tube(g, [[856, 462], [900, 500], [925, 548], [935, 590]], 34, D.endo, { ow: 6, lumen: D.endoL });
      lab(g, 'faringe (endoderm)', 480, 500, 16); lab(g, 'esofag', 680, 390, 16); lab(g, 'stomac', 800, 506, 16); lab(g, 'intestin', 960, 520, 15);
      // membrana bucofaringiană: se rupe din centru
      const gap = 46 * ease(r);
      const memb = (y0, y1) => { if (y1 - y0 < 2) return; tube(g, [[344, y0], [344, y1]], 10, D.ecto, { ow: 3 }); tube(g, [[356, y0], [356, y1]], 10, D.endo, { ow: 3 }); };
      memb(378, 425 - gap); memb(425 + gap, 472);
      lead(g, 470, 330, 356, 384, 1);
      if (r < 0.35) lab(g, 'membrana bucofaringiană', 560, 318, 16, '#ffe36e');
      else lab(g, 'membrana s-a rupt →\ngura comunică cu faringele', 590, 310, 16, '#ffe36e');
      if (on(b, 0)) ring(g, 350, 425, 40, 64, ease(b.bt * 1.3));
      // particule: înainte de ruptură se opresc la membrană; după, curg până în intestin
      const Pp = curve(SWALLOW);
      if (r < 0.98) for (let j = 0; j < 6; j++) { const u = ((j / 6) + (REDUCED ? 0 : t * 0.15)) % 1; const x = lerp(10, 326, u); dot(g, x, 425 + Math.sin(j * 2.1 + t) * 22, 8, D.amn, { ow: 2.5, alpha: (1 - r) * Math.sin(u * Math.PI) ** 0.4 }); }
      if (f > 0.02 || (b.i < 0 && r > 0.9)) flow(g, Pp, t, D.amn, 12, 0.11, 8, { alpha: Math.max(f, b.i < 0 ? 1 : 0) });
      // absorbție → sânge → placentă
      const fa = b.i < 0 ? 1 : f;
      if (fa > 0.05) {
        tube(g, BLOOD, 16, D.art, { ow: 4, alpha: fa });
        flow(g, curve(BLOOD), t, '#ffb0a8', 5, 0.2, 7, { alpha: fa });
        ell(g, 800, 860, 120, 44, '#b0405a', { ow: 5, alpha: fa, shade: '#7e2a3e' });
        lab(g, 'placentă', 800, 860, 18, '#ffffff', { alpha: fa });
        lab(g, 'absorbit în intestin\n→ circulație', 735, 700, 16, D.cream, { alpha: fa });
      }
    },
  };
}

/* =================================================== STOMACUL (1): 90° orar pe axul longitudinal */
// Ce trebuie să se vadă: secțiune transversală privită de sus (dorsal sus, stânga embrionului = dreapta ecranului).
// Pct. 1: stomacul (galben, axul mare dorsal–ventral) între mezogastrul dorsal (spre aortă) și cel ventral (cu ficatul).
// Pct. 2: rotație 90° în sensul acelor de ceas (pe ecran tot orar): marginea dorsală ajunge la stânga (dreapta ecranului),
// în spatele stomacului apare bursa omentală. Pct. 3: vagul stâng (verde) ajunge anterior, vagul drept (mov) posterior;
// marginea dorsală crește mai repede → curbura mare.
export function stomachShape(loc, rx, ry, bulge, n = 44) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2; let x = rx * Math.cos(a), y = ry * Math.sin(a);
    if (y < 0) { const s = -Math.sin(a); x *= 1 + 0.45 * bulge * s * s; y *= 1 + 0.3 * bulge * s; }
    pts.push(loc(x, y));
  }
  return smooth(pts);
}
export function stomach1() {
  const S = { th: 0, cx: 500, cy: 520, bu: 0 };
  const RX = 62, RY = 118;
  const loc = (x, y) => { const c = Math.cos(S.th), s = Math.sin(S.th); return [S.cx + x * c - y * s, S.cy + x * s + y * c]; };
  const dMid = () => { const D0 = loc(0, -RY - S.bu * 34); const n = S.th / (Math.PI / 2); const cx = 500 + 190 * n, cy = 300; return [0.25 * 500 + 0.5 * cx + 0.25 * D0[0], 0.25 * 278 + 0.5 * cy + 0.25 * D0[1]]; };
  return {
    home: HOME,
    anchors: [() => loc(-RX * 0.2, RY * 0.35), () => { const m = dMid(); return [m[0] - 30, m[1] - 10]; }, () => loc(RX + 30, 0)],
    phase: (i) => ['S4 · stomac fusiform', 'rotație 90° orar', 'vagii + curbura mare'][i] || 'rotația 1',
    draw(g, t, b) {
      bg(g);
      const s = stage(b, t, 3, 0.7);
      const tn = ease(clamp(s - 1)); S.th = tn * Math.PI / 2; S.bu = ease(clamp(s - 2));
      S.cx = 500 + 60 * tn; S.cy = 540 + 10 * tn;
      lab(g, 'POSTERIOR (dorsal)', 500, 118, 17, D.note); lab(g, 'ANTERIOR (ventral)', 500, 905, 17, D.note);
      lab(g, 'dreapta\nembrionului', 58, 470, 16, D.note); lab(g, 'stânga\nembrionului', 942, 470, 16, D.note);
      // peretele corpului + cavitatea
      ell(g, 500, 520, 400, 360, D.wall, { ow: 6, shade: D.wallS });
      ell(g, 500, 535, 352, 310, D.cav, { ow: 4 });
      ell(g, 500, 196, 44, 34, '#e6d2a8', { ow: 5 }); ell(g, 500, 252, 28, 24, D.art, { ow: 5, shade: D.artS });
      lab(g, 'aorta', 420, 252, 16);
      // bursa omentală (în spatele stomacului)
      if (tn > 0.05) { ell(g, 606, 432, 74 * tn, 50 * tn, D.bursa, { ow: 4, alpha: tn }); if (tn > 0.6) lab(g, 'bursa\nomentală', 612, 428, 15, OUT, { stroke: false }); }
      // mezogastrul dorsal (de la peretele posterior la marginea dorsală)
      const Dp = loc(0, -RY - S.bu * 34);
      const qx = 500 + 190 * tn, qy = 300;
      const dm = []; for (let k = 0; k <= 16; k++) { const u = k / 16, v = 1 - u; dm.push([v * v * 500 + 2 * v * u * qx + u * u * Dp[0], v * v * 278 + 2 * v * u * qy + u * u * Dp[1]]); }
      tube(g, dm, 12, D.peri, { ow: 4, raw: true, glow: on(b, 1) ? 0.8 : 0 });
      // mezogastrul ventral + ficatul
      const V = loc(0, RY); const L = [lerp(500, 350, tn), lerp(760, 700, tn)];
      tube(g, [V, L, [500, 845]], 12, D.peri, { ow: 4 });
      ell(g, L[0], L[1], lerp(60, 105, tn), lerp(42, 70, tn), D.liver, { ow: 5, shade: D.liverS, light: D.liverL });
      lab(g, 'ficat', L[0], L[1], 18, '#ffffff');
      // stomacul
      const sp = stomachShape(loc, RX, RY, S.bu);
      paint(g, sp, D.endo, D.endoS, D.endoL, [S.cx - 120, S.cy - 120, 240, 240], OUT, 6);
      if (on(b, 0)) ring(g, S.cx, S.cy, 95, 150, ease(b.bt * 1.3));
      // vagii
      const vl = loc(RX + 2, 0), vr = loc(-RX - 2, 0);
      dot(g, vl[0], vl[1], 13, D.vagL, { ow: 3.5 }); dot(g, vr[0], vr[1], 13, D.vagR, { ow: 3.5 });
      const lv = loc(RX + 66, RY * 0.62), rv = loc(-RX - 52, RY * 0.72);
      lab(g, 'vag\nstâng', lv[0], lv[1], 16, '#9be3b0'); lab(g, 'vag\ndrept', rv[0], rv[1], 16, '#e3d0ff');
      if (on(b, 2)) { ring(g, vl[0], vl[1], 26, 26, ease(b.bt * 1.4)); ring(g, vr[0], vr[1], 26, 26, ease(b.bt * 1.4)); }
      // etichetele mezourilor
      lab(g, 'mezogastrul\ndorsal', lerp(410, 740, tn), lerp(360, 320, tn), 16, '#ffd8a8');
      const vm = [lerp(V[0], L[0], 0.5), lerp(V[1], L[1], 0.5)];
      lab(g, 'mezogastrul\nventral', vm[0] + lerp(100, 74, tn), vm[1] + lerp(0, 16, tn), 16, '#ffd8a8');
      lab(g, 'stomac', S.cx + lerp(0, -10, tn), S.cy + lerp(-20, 20, tn), 18, OUT, { stroke: false });
      if (S.bu > 0.3) { const gc = loc(0, -RY - 62); lab(g, 'curbura\nmare', gc[0] + 20, gc[1], 16, '#ffe36e', { alpha: S.bu }); }
      // săgeata rotației
      const ra = b.i < 0 ? (s > 1 && s < 2.2 ? 1 : 0.35) : on(b, 1) ? 1 : 0.35;
      if (s > 0.9) { arcArrow(g, S.cx, S.cy, 190, -2.0, -2.0 + 1.4, '#ffe36e', 6, ra); lab(g, '90° orar', S.cx - 120, S.cy - 210, 19, '#ffe36e', { alpha: ra }); }
    },
  };
}

/* =================================================== STOMACUL (2): curburile, apoi axul antero-posterior */
// Ce trebuie să se vadă (vedere din față, dreapta embrionului = stânga ecranului), ca figura LP A–E:
// A–B fus vertical + axul longitudinal; C peretele din dreapta ecranului (fostul dorsal) se bombează = curbura mare;
// D rotație în jurul axului antero-posterior, pe ecran în sensul acelor de ceas: pilorul urcă spre stânga ecranului
// (dreapta embrionului), cardia coboară spre dreapta ecranului (stânga embrionului); E poziția oblică finală + duodenul în „C”.
const KA = [[600, 170], [600, 300], [600, 430], [600, 560]], KC = [[600, 170], [560, 300], [548, 450], [590, 560]], KE = [[700, 190], [735, 420], [560, 545], [440, 432]];
const WA = [36, 0, 36], WB = [44, 0, 34], WC = [20, 100, 14], WE = [20, 112, 12];
const AXC = [600, 365];
const rotP = ([x, y], a) => { const dx = x - AXC[0], dy = y - AXC[1], c = Math.cos(a), s = Math.sin(a); return [AXC[0] + dx * c - dy * s, AXC[1] + dx * s + dy * c]; };
const lp2 = (A, B, k) => A.map((q, i) => (Array.isArray(q) ? [lerp(q[0], B[i][0], k), lerp(q[1], B[i][1], k)] : lerp(q, B[i], k)));
export function stomFront(s) {
  const k = (j) => ease(clamp(s - j));
  const PSI = Math.PI / 4;
  let cp, w;
  if (s < 1) { cp = KA; w = lp2(WA, WB, k(0)); }
  else if (s < 2) { cp = lp2(KA, KC, k(1)); w = lp2(WB, WC, k(1)); }
  else if (s < 3) { cp = KC.map((q) => rotP(q, PSI * k(2))); w = WC; }
  else { cp = lp2(KC.map((q) => rotP(q, PSI)), KE, k(3)); w = lp2(WC, WE, k(3)); }
  const bz = (u) => { const v = 1 - u; return [0, 1].map((d) => v * v * v * cp[0][d] + 3 * v * v * u * cp[1][d] + 3 * v * u * u * cp[2][d] + u * u * u * cp[3][d]); };
  const N = 28, C0 = [], gp = [], lpp = [], NR = [], G = [], L = [];
  for (let i = 0; i <= N; i++) C0.push(bz(i / N));
  for (let i = 0; i <= N; i++) {
    const u = i / N, a = C0[Math.max(0, i - 1)], c = C0[Math.min(N, i + 1)]; let tx = c[0] - a[0], ty = c[1] - a[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
    const nx = ty, ny = -tx; NR.push([nx, ny]);
    const sn = Math.sin(Math.PI * u);
    const gg = 24 + w[0] * Math.pow(sn, 0.8) + w[1] * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.1)), 1.1) * (1 - 0.45 * u);
    const ll = 24 + w[2] * Math.pow(sn, 0.8);
    G.push(gg); L.push(ll);
    gp.push([C0[i][0] + nx * gg, C0[i][1] + ny * gg]); lpp.push([C0[i][0] - nx * ll, C0[i][1] - ny * ll]);
  }
  const outline = smooth([...gp, ...lpp.slice().reverse()]);
  const m = 13; const tEnd = (() => { const a = C0[N - 1], c = C0[N]; const l = Math.hypot(c[0] - a[0], c[1] - a[1]) || 1; return [(c[0] - a[0]) / l, (c[1] - a[1]) / l]; })();
  return { outline, cardia: C0[0], pylorus: C0[N], tEnd, gMid: gp[m], lMid: lpp[m],
    gOut: [C0[m][0] + NR[m][0] * (G[m] + 62), C0[m][1] + NR[m][1] * (G[m] + 62)], lOut: [C0[10][0] - NR[10][0] * (L[10] + 95), C0[10][1] - NR[10][1] * (L[10] + 95)] };
}
export function stomach2() {
  let Sx = null;
  return {
    home: HOME,
    anchors: [[648, 120], () => (Sx ? [Sx.gMid[0] + 14, Sx.gMid[1] - 34] : [700, 380]), [AXC[0] + 44, AXC[1] - 40], () => (Sx ? [Sx.pylorus[0] + 6, Sx.pylorus[1] - 48] : [520, 520])],
    phase: (i) => ['A–B · axul longitudinal', 'C · apar curburile', 'D · axul antero-posterior', 'E · poziția finală'][i] || 'rotația 2',
    draw(g, t, b) {
      bg(g);
      const s = stage(b, t, 4, 0.7);
      const S = stomFront(s); Sx = S;
      lab(g, 'dreapta\nembrionului', 110, 130, 15, D.note); lab(g, 'stânga\nembrionului', 900, 130, 15, D.note);
      // axul longitudinal (A–C)
      const la = 1 - ease(clamp((s - 1.8) / 0.5));
      if (la > 0.02) { g.save(); g.globalAlpha = la; g.strokeStyle = '#ffffff'; g.lineWidth = 3; g.setLineDash([10, 9]); g.beginPath(); g.moveTo(600, 100); g.lineTo(600, 640); g.stroke(); g.restore(); lab(g, 'ax longitudinal', 700, 640, 15, '#ffffff', { alpha: la }); }
      // esofagul + duodenul
      const P0 = S.pylorus, T = S.tEnd; const e1 = ease(clamp(s - 3));
      const straight = [P0, [P0[0] + T[0] * 60, P0[1] + T[1] * 60], [P0[0] + T[0] * 120, P0[1] + T[1] * 120], [P0[0] + T[0] * 170, P0[1] + T[1] * 170]];
      const cl = [P0, [P0[0] - 60, P0[1] + 14], [P0[0] - 86, P0[1] + 100], [P0[0] - 40, P0[1] + 180]];
      const duo = straight.map((q, k) => [lerp(q[0], cl[k][0], e1), lerp(q[1], cl[k][1], e1)]);
      tube(g, duo, 38, D.endo, { ow: 6, glow: on(b, 3) ? 0.8 : 0 });
      tube(g, [[650, 30], [lerp(650, S.cardia[0], 0.5), lerp(60, S.cardia[1], 0.5)], S.cardia], 40, D.endo, { ow: 6 });
      paint(g, S.outline, D.endo, D.endoS, D.endoL, [380, 150, 420, 460], OUT, 6);
      lab(g, 'esofag', 572, 50, 16); lab(g, 'duoden', duo[3][0] + 70, duo[3][1] + 10, 16);
      lab(g, 'cardia', S.cardia[0] + 84, S.cardia[1] + 18, 16, '#ffe9a8'); lab(g, 'pilor', P0[0] + (e1 > 0.5 ? 10 : 70), P0[1] + (e1 > 0.5 ? 60 : 0), 16, '#ffe9a8');
      const ca = ease(clamp(s - 1));
      if (ca > 0.05) { lab(g, 'curbura\nmare', S.gOut[0], S.gOut[1], 17, '#ffe36e', { alpha: ca }); lab(g, 'curbura\nmică', S.lOut[0], S.lOut[1], 17, '#ffe36e', { alpha: ca }); }
      if (on(b, 1)) ring(g, S.gMid[0] - 20, S.gMid[1], 70, 130, ease(b.bt * 1.3));
      // rotația 1 (amintire) pe A–B
      if (s < 1.6) { const a = 1 - clamp((s - 1) / 0.6); arcArrow(g, 600, 120, 50, Math.PI * 0.95, Math.PI * 0.05, '#ffe36e', 5, a); lab(g, 'rotația 1:\n90° orar', 430, 128, 16, '#ffe36e', { alpha: a }); }
      // axul antero-posterior (D)
      const ap = clamp((s - 2) / 0.3) * (1 - e1);
      if (ap > 0.02) {
        dot(g, AXC[0], AXC[1], 14, '#ffffff', { ow: 4, alpha: ap }); dot(g, AXC[0], AXC[1], 5, OUT, { ow: 0, alpha: ap });
        arcArrow(g, AXC[0], AXC[1], 70, -Math.PI * 0.85, -Math.PI * 0.2, '#ffe36e', 6, ap);
        lead(g, AXC[0] + 16, AXC[1] + 10, 800, 560, ap); lab(g, 'ax antero-posterior\n(îl privești cap-coadă)', 840, 590, 15, '#ffffff', { alpha: ap });
      }
      if (s > 2.3 && s < 3.8) { const a = clamp((s - 2.3) / 0.4) * (1 - clamp((s - 3.4) / 0.4)); lab(g, '↑ pilorul: dreapta-sus', P0[0] - 20, P0[1] + 80, 16, '#ffe9a8', { alpha: a }); lab(g, 'cardia: stânga-jos ↓', S.cardia[0] + 130, S.cardia[1] - 40, 16, '#ffe9a8', { alpha: a }); }
      if (e1 > 0.5) lab(g, 'duodenul în „C”\n→ retroperitoneal', 820, 760, 16, D.cream, { alpha: e1 });
    },
  };
}

/* =================================================== MEZOURILE: omentul mic, lig. falciform, omentul mare */
// Stânga: secțiune transversală privită de sus (ca figura LP): ficatul împarte mezogastrul ventral în omentul mic + lig. falciform;
// splina apare în mezogastrul dorsal (lig. gastrolienal); bursa omentală în spatele stomacului.
// Dreapta: secțiune sagitală (cranial sus, anterior stânga): mezogastrul dorsal crește în jos de pe curbura mare ca un șorț dublu.
export function omentum() {
  let LgS = 90;
  return {
    home: HOME,
    anchors: [[268, 234], [203, 341], [200, 476], () => [612, 296 + LgS * 0.5]],
    phase: (i) => ['bursa omentală', 'omentul mic (ventral)', 'lig. falciform (ventral)', 'omentul mare (dorsal)'][i] || 'derivatele mezogastrelor',
    draw(g, t, b) {
      bg(g);
      const p = P(b, t, 4);
      // ---- stânga: secțiunea transversală
      panel(g, 14, 30, 492, 560);
      lab(g, 'secțiune transversală\n(dorsal sus)', 260, 70, 16, D.note);
      ell(g, 260, 330, 230, 215, D.wall, { ow: 6, shade: D.wallS }); ell(g, 260, 342, 198, 182, D.cav, { ow: 4 });
      ell(g, 260, 170, 22, 20, D.art, { ow: 4 }); ell(g, 196, 196, 26, 20, D.kidney, { ow: 4 }); ell(g, 326, 196, 26, 20, D.kidney, { ow: 4 });
      ell(g, 268, 262, 66, 30, D.bursa, { ow: 4, alpha: 0.9 }); lab(g, 'bursa', 250, 262, 14, OUT, { stroke: false });
      // mezogastrul dorsal: aortă → splină → stomac
      tube(g, [[262, 190], [330, 214], [372, 250]], 8, D.peri, { ow: 3 });
      tube(g, [[372, 250], [345, 300], [300, 318]], 8, D.peri, { ow: 3, glow: on(b, 3) ? 0.9 : 0 });
      ell(g, 392, 258, 30, 42, D.spleen, { ow: 4, shade: D.spleenS }); lab(g, 'splina', 436, 216, 15);
      lab(g, 'lig. gastrolienal', 400, 345, 14, '#ffd8a8');
      // ficatul + mezogastrul ventral
      tube(g, [[230, 322], [176, 360]], 9, D.peri, { ow: 3, glow: on(b, 1) ? 0.9 : 0 });
      tube(g, [[150, 430], [200, 470], [252, 522]], 9, D.peri, { ow: 3, glow: on(b, 2) ? 0.9 : 0 });
      ell(g, 150, 395, 80, 58, D.liver, { ow: 5, shade: D.liverS, light: D.liverL }); lab(g, 'ficat', 140, 400, 16, '#ffffff');
      ell(g, 280, 316, 60, 32, D.endo, { ow: 5, shade: D.endoS, rot: 0.2 }); lab(g, 'stomac', 284, 318, 14, OUT, { stroke: false });
      lab(g, 'omentul\nmic', 138, 300, 13, '#ffd8a8'); lab(g, 'lig. falciform', 312, 500, 14, '#ffd8a8');
      if (on(b, 0)) ring(g, 268, 262, 84, 46, ease(b.bt * 1.3));
      if (on(b, 1)) ring(g, 203, 340, 38, 34, ease(b.bt * 1.3));
      if (on(b, 2)) ring(g, 200, 476, 70, 40, ease(b.bt * 1.3));
      // ---- dreapta: secțiunea sagitală (cranial sus, anterior stânga)
      panel(g, 520, 30, 466, 874);
      lab(g, 'secțiune sagitală\n(cranial sus, anterior stânga)', 752, 70, 16, D.note);
      tube(g, [[548, 120], [548, 880]], 14, D.wall, { ow: 4 }); tube(g, [[960, 120], [960, 880]], 14, D.wall, { ow: 4 });
      lab(g, 'perete\nanterior', 600, 870, 14, D.note); lab(g, 'perete\nposterior', 905, 870, 14, D.note);
      ell(g, 660, 160, 95, 52, D.liver, { ow: 5, shade: D.liverS }); lab(g, 'ficat', 640, 160, 15, '#ffffff');
      // ansele (în spate)
      coils(g, 700, 430, 230, 320, 5, D.si, 1, { w: 22 });
      lab(g, 'anse intestinale', 820, 790, 15);
      ell(g, 830, 370, 46, 36, D.colon, { ow: 5, shade: D.colonS }); lab(g, 'colon\ntransvers', 900, 410, 13);
      // stomacul (secțiune) + omentul mic spre ficat
      ell(g, 760, 255, 68, 44, D.endo, { ow: 5, shade: D.endoS }); lab(g, 'stomac', 760, 255, 15, OUT, { stroke: false });
      tube(g, [[720, 222], [690, 200]], 6, D.peri, { ow: 3 });
      // omentul mare: șorț dublu care crește în jos
      const Lg = lerp(90, 500, p(3)); LgS = Lg;
      const yb = 296 + Lg;
      const ant = [[730, 298], [645, 296 + Lg * 0.45], [606, yb - 10], [614, yb]];
      const post = [[636, yb], [660, yb - 12], [676, 296 + Lg * 0.4], [760, 326], [880, 330], [952, 322]];
      const reg = curve([...ant, ...post]);
      g.save(); g.globalAlpha = 0.55; g.fillStyle = D.bursa; g.beginPath(); reg.forEach((q, k) => (k ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]))); g.closePath(); g.fill(); g.restore();
      tube(g, [...ant, [625, yb + 6], ...post], 10, D.peri, { ow: 4, glow: on(b, 3) ? 0.8 : 0 });
      lab(g, 'omentul mare', 640, Math.min(830, yb + 36), 16, '#ffd8a8');
      lab(g, 'curbura\nmare', 830, 270, 13, '#ffe36e');
    },
  };
}

/* =================================================== DUODENUL: plin, apoi recanalizat */
// Ce trebuie să se vadă: secțiune transversală prin duoden (perete mezoderm roz, epiteliu endoderm galben, lumen alb).
// Pct. 1 lumen deschis; pct. 2 epiteliul crește până astupă lumenul (S5–S6); pct. 3 apar vacuole care se unesc → lumenul revine;
// pct. 4 cele două finaluri greșite alăturate: atrezie (fără lumen) și stenoză (lumen îngust). Jos: 4 miniaturi cu stadiile.
export function duodenum() {
  return {
    home: HOME,
    anchors: [[170, 724], [390, 724], [610, 724], [505, 128]],
    phase: (i) => ['lumen normal', 'S5–S6 · lumenul se astupă', 'vacuole → recanalizare', 'atrezie vs. stenoză'][i] || 'duodenul',
    draw(g, t, b) {
      bg(g);
      const s = stage(b, t, 4, 0.75);
      const close = ease(clamp(s - 1)), vac = clamp(s - 2), open = ease(clamp((s - 2.35) / 0.65));
      const lum = s < 1 ? 92 : s < 2 ? 92 * (1 - close) : 92 * open;
      const f4 = ease(clamp(s - 3));
      // secțiunea mare
      if (f4 < 0.99) {
        duoSection(g, 500, 400, 250, lum, s >= 2 && s < 3.2 ? vac : 0, t, { alpha: 1 - f4 });
        lab(g, 'perete (mezoderm)', 500, 118, 17, '#ffd0c8', { alpha: 1 - f4 });
        lab(g, 'epiteliu (endoderm)', 760, 260, 17, '#ffe9a8', { alpha: 1 - f4 });
        lab(g, s < 1.5 ? 'lumen' : s < 2.2 ? 'lumen astupat' : 'vacuole → lumen', 500, 400, 19, OUT, { stroke: false, alpha: (1 - f4) * (s < 1.5 || s > 2.6 ? 1 : 0.9) });
      }
      if (f4 > 0.01) {
        duoSection(g, 290, 400, 190, 0, 0, t, { alpha: f4 }); cross(g, 290, 400, 40, '#ff6b5e', f4);
        duoSection(g, 720, 400, 190, 26, 0, t, { alpha: f4 });
        lab(g, 'ATREZIE\nlumen închis complet', 290, 650, 19, D.cream, { alpha: f4 }); lab(g, 'STENOZĂ\nlumen îngust', 720, 650, 19, D.cream, { alpha: f4 });
      }
      // miniaturile
      const TH = [[110, 92, 0], [330, 0, 0], [550, 26, 0.7], [770, 92, 0]];
      const TL = ['lumen normal', 'astupat (S5–S6)', 'vacuole', 'recanalizat'];
      TH.forEach(([x, l, v], k) => {
        const act = b.i < 0 ? Math.min(3, Math.floor(s)) === k : b.i === k || (b.i === 3 && k === 3);
        duoSection(g, x + 60, 800, 62, l * 0.25, v, t, { alpha: act ? 1 : 0.45, cells: 40 });
        lab(g, TL[k], x + 60, 885, 15, act ? '#ffe36e' : D.note);
        if (k < 3) arr(g, x + 132, 800, x + 190, 800, '#fff3e6', 4, 0.6);
      });
    },
  };
}
