// Partea B (mesenteronul: ansa, rotația 270°, cecul), Partea C (cloaca, canalul anal), Partea D (ficatul, pancreasul).
import {
  HOME, D, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead, lab,
  stage, OUT, clamp, lerp, ease, paint, smooth, REDUCED, st, arcArrow, cross, coils,
} from './dg.js';

/* =================================================== ANSA INTESTINALĂ PRIMARĂ (desen fix) */
// Vedere laterală stângă (cranial sus, ventral = dreapta, spre ombilic): brațul cranial galben sus, brațul caudal verde jos
// cu mugurele cecal, a. mezenterică superioară roșie pe axul ansei, ductul vitelin de la vârf la sacul vitelin.
export function loop() {
  const CR = [[480, 120], [486, 250], [600, 300], [760, 380], [880, 470]];
  const CA = [[880, 470], [790, 560], [640, 620], [520, 640], [480, 720], [470, 900]];
  return {
    home: HOME,
    anchors: [[660, 300], [690, 660], [600, 398], [950, 520]],
    phase: (i) => ['brațul cranial', 'brațul caudal', 'axul: a. mezenterică sup.', 'ductul vitelin'][i] || 'ansa intestinală primară',
    draw(g, t, b) {
      bg(g);
      tube(g, [[410, 60], [410, 900]], 30, D.art, { ow: 6 }); lab(g, 'aorta', 355, 90, 17);
      // mezenterul (zona dintre brațe)
      const mz = curve([...CR.slice(1), ...CA.slice(1, 4).reverse().slice(0)]);
      g.save(); g.globalAlpha = 0.35; g.fillStyle = D.peri; g.beginPath(); [[420, 330], ...CR.slice(1), ...CA.slice(1, 4), [420, 600]].forEach((q, k) => (k ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]))); g.closePath(); g.fill(); g.restore();
      lab(g, 'mezenter', 560, 520, 15, '#ffd8a8');
      // artera mezenterică superioară, cu ramuri
      tube(g, [[410, 340], [600, 420], [860, 472]], 14, D.art, { ow: 5, glow: on(b, 2) ? 0.9 : 0 });
      for (const [x0, y0, x1, y1] of [[520, 386, 560, 320], [640, 428, 680, 345], [740, 448, 780, 395], [540, 395, 560, 620], [660, 432, 690, 600], [760, 452, 790, 556]]) tube(g, [[x0, y0], [x1, y1]], 6, D.art, { ow: 3 });
      // brațele
      tube(g, CR, 44, D.si, { ow: 6, glow: on(b, 0) ? 0.9 : 0 });
      tube(g, CA, 44, D.colon, { ow: 6, glow: on(b, 1) ? 0.9 : 0 });
      ell(g, 700, 610, 30, 24, D.colon, { ow: 5, shade: D.colonS, rot: -0.4 }); lab(g, 'mugurele\ncecal', 760, 690, 15, '#d9f7c0');
      ell(g, 490, 130, 70, 46, D.endo, { ow: 5, shade: D.endoS }); lab(g, 'stomac', 490, 130, 16, OUT, { stroke: false });
      lab(g, 'duoden', 548, 226, 15); lab(g, 'brațul cranial\n(cefalic)', 690, 230, 17, '#ffe9a8'); lab(g, 'brațul caudal', 610, 715, 17, '#d9f7c0');
      lab(g, 'a. mezenterică sup.', 640, 470, 15, '#ffb0a8');
      // ductul vitelin + sacul
      tube(g, [[880, 470], [905, 560], [915, 640]], 12, D.endoL, { ow: 4, glow: on(b, 3) ? 0.9 : 0 });
      ell(g, 915, 720, 70, 70, D.endoL, { ow: 5, shade: '#f0d98a' }); lab(g, 'sac\nvitelin', 915, 720, 15, OUT, { stroke: false });
      lab(g, 'duct vitelin', 960, 600, 14);
      lab(g, 'spre metenteron', 560, 880, 15, D.note);
    },
  };
}

/* =================================================== ROTAȚIA 270° antiorar în jurul a. mezenterice superioare */
// Ce trebuie să se vadă: vedere din față (dreapta embrionului = stânga ecranului). Artera e punctul roșu din centru (axul,
// văzut cap-coadă). Brațul cranial (galben) pornește la ora 12, cel caudal (verde, cu mugurele cecal C) la ora 6.
// Pct. 2: ansa e în cordonul ombilical (disc albastru punctat) și se rotește 90° antiorar: cranialul ajunge la ora 9 (dreapta
// embrionului), caudalul la ora 3. Pct. 3: discul dispare (retragerea, S10) și ansa mai face 180°: cranialul ajunge la ora 3
// (stânga embrionului), caudalul trece pe sus (viitorul transvers) și ajunge la ora 9 → cecul în dreapta, sub ficat.
export function rotation() {
  const cx = 520, cy = 470; let phi = 0;
  const pos = (base, r, k = 1) => { const a = (base + phi) * Math.PI / 180 - 0.35 * k; return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; };
  const limb = (base) => [0, 1, 2, 3, 4].map((k) => pos(base, 60 * k, k / 4));
  return {
    home: HOME,
    anchors: [() => { const q = pos(90, 175, 0.65); return [q[0], q[1]]; }, [cx + 228, cy - 236], () => { const q = pos(270, 128, 0.5); return [q[0] + 30, q[1] - 34]; }],
    phase: (i) => ['S5–S6 · 0°', 'hernia (S6–S10) · 90°', 'retragerea (S10) · +180° = 270°'][i] || 'rotația ansei',
    draw(g, t, b) {
      bg(g);
      const s = stage(b, t, 3, 0.75);
      phi = s < 1 ? 0 : s < 2 ? 90 * ease(s - 1) : 90 + 180 * ease(clamp(s - 2));
      const her = s < 1 ? 0 : s < 2 ? clamp((s - 1) * 4) : 1 - ease(clamp((s - 2) * 1.6));
      lab(g, 'dreapta embrionului', 150, 92, 15, D.note); lab(g, 'stânga embrionului', 880, 92, 15, D.note);
      // abdomenul + ficatul (context)
      g.save(); g.strokeStyle = 'rgba(255,230,210,.25)'; g.lineWidth = 4; g.beginPath(); g.roundRect(150, 110, 740, 760, 120); g.stroke(); g.restore();
      ell(g, 330, 190, 150, 62, D.liver, { ow: 5, shade: D.liverS, alpha: 0.9 }); lab(g, 'ficat', 330, 190, 16, '#ffffff');
      // hernia: ansa în cordonul ombilical
      if (her > 0.02) { g.save(); g.globalAlpha = her * 0.3; g.fillStyle = D.amn; g.beginPath(); g.arc(cx, cy, 320, 0, 7); g.fill(); g.restore(); g.save(); g.globalAlpha = her; g.strokeStyle = D.amn; g.lineWidth = 4; g.setLineDash([14, 10]); g.beginPath(); g.arc(cx, cy, 320, 0, 7); g.stroke(); g.restore(); lab(g, 'în cordonul ombilical\n(hernia fiziologică)', cx + 230, cy - 290, 16, D.amn, { alpha: her }); }
      // brațele (caudalul trece în față când e sus)
      const cr = limb(90), ca = limb(270);
      tube(g, cr, 40, D.si, { ow: 6 });
      tube(g, ca, 40, D.colon, { ow: 6 });
      const cb = pos(270, 128, 0.5); ell(g, cb[0], cb[1], 24, 24, D.colon, { ow: 5, shade: D.colonS }); lab(g, 'C', cb[0], cb[1], 20, OUT, { stroke: false });
      // axul: artera văzută cap-coadă
      dot(g, cx, cy, 26, D.art, { ow: 5 }); dot(g, cx, cy, 9, '#ffd0c8', { ow: 0 });
      lab(g, 'a. mezenterică sup.\n(axul)', cx - 125, cy + 70, 15, '#ffb0a8');
      const ce = pos(90, 270, 1), ke = pos(270, 270, 1);
      lab(g, 'brațul cranial', ce[0] + (ce[0] < cx - 40 ? -10 : ce[0] > cx + 40 ? 10 : 110), ce[1] + (ce[1] < cy ? 44 : 50), 17, '#ffe9a8');
      lab(g, 'brațul caudal', ke[0] + (ke[0] < cx - 40 ? -10 : ke[0] > cx + 40 ? 10 : -110), ke[1] + (ke[1] < cy ? -44 : 50), 17, '#d9f7c0');
      // săgeata antiorar, în urma brațului cranial
      if (s > 0.9) { const a = -((90 + phi) * Math.PI / 180); arcArrow(g, cx, cy, 300, a + 0.75, a + 0.15, '#ffe36e', 6, 0.9); }
      txt(g, Math.round(phi) + '°', 840, 790, 46, '#ffe36e');
      lab(g, 'antiorar, privit din față', 800, 840, 16, '#ffe36e');
      if (phi > 265) lab(g, 'cecul ajunge în dreapta, sub ficat\n→ apoi coboară (slide-ul următor)', 330, 800, 16, D.cream);
    },
  };
}

/* =================================================== REZULTATUL: cecul coboară, cadrul colic */
// Ce trebuie să se vadă (vedere din față, dreapta embrionului = stânga ecranului): pct. 1 ansele jejunului intră primele și se
// strâng în stânga embrionului (dreapta ecranului, sus); pct. 2 cecul (verde, cu apendicele) apare sub ficat și coboară până în
// fosa iliacă dreaptă (stânga-jos pe ecran), iar colonul ascendent se alungește; pct. 3 cadrul colic se aprinde în ordine
// (ascendent → transvers → descendent → sigmoid); ascendentul și descendentul = retroperitoneale (contur punctat).
export function cecum() {
  let yc = 330;
  const TR = [[478, 300], [600, 336], [730, 344], [890, 296]], DE = [[892, 296], [916, 500], [910, 700]], SI = [[910, 700], [880, 790], [790, 800], [730, 850], [712, 905]];
  return {
    home: HOME,
    anchors: [[836, 380], () => [530, yc + 6], [700, 300]],
    phase: (i) => ['jejunul intră primul', 'cecul: sub ficat → fosa iliacă dreaptă', 'cadrul colic'][i] || 'după rotație',
    draw(g, t, b) {
      bg(g);
      const p = P(b, t, 3); const p0 = b.i < 0 ? 1 : p(0), d = p(1), c3 = p(2);
      yc = lerp(330, 760, ease(d));
      g.save(); g.strokeStyle = 'rgba(255,230,210,.25)'; g.lineWidth = 4; g.beginPath(); g.roundRect(392, 40, 590, 880, 90); g.stroke(); g.restore();
      lab(g, 'dreapta\nembrionului', 230, 150, 15, D.note);
      ell(g, 560, 150, 160, 86, D.liver, { ow: 5, shade: D.liverS, light: D.liverL }); lab(g, 'ficat', 560, 140, 17, '#ffffff');
      ell(g, 850, 160, 88, 58, D.endo, { ow: 5, shade: D.endoS, rot: 0.4 }); lab(g, 'stomac', 850, 160, 15, OUT, { stroke: false });
      tube(g, [[790, 214], [660, 236], [628, 296], [664, 350], [760, 346]], 26, D.endo, { ow: 5 });
      // colonul (transvers, descendent, sigmoid)
      const seg = (k) => (b.i < 0 ? 1 : c3 > k / 4 ? 1 : 0.5);
      const gl = (k) => (on(b, 2) && Math.floor(clamp(b.bt / (b.bd * 0.7)) * 4) === k ? 0.9 : 0);
      tube(g, TR, 40, D.colon, { ow: 6, alpha: seg(1), glow: gl(1) });
      tube(g, DE, 40, D.colon, { ow: 6, alpha: seg(2), glow: gl(2) });
      tube(g, SI, 40, D.colon, { ow: 6, alpha: seg(3), glow: gl(3) });
      // intestinul subțire: jejunul (sus, stânga embrionului) intră primul, ileonul ajunge la cec
      const pts = [[760, 346], [850, 395]];
      for (let r = 0; r < 5; r++) { const y = 420 + r * 66; const xs = r % 2 ? [570, 860] : [860, 570]; for (let k = 0; k <= 5; k++) { const u = k / 5; pts.push([lerp(xs[0], xs[1], u), y + Math.sin(u * Math.PI * 3 + r) * 16]); } }
      pts.push([560, Math.max(yc + 10, 700)], [500, yc + 14]);
      tube(g, pts, 24, D.si, { ow: 5, u1: Math.max(0.02, p0) });
      lab(g, 'jejun', 900, 440, 15, '#ffe9a8'); if (p0 > 0.8) lab(g, 'ileon', 610, 770, 15, '#ffe9a8');
      // colonul ascendent + cecul + apendicele
      tube(g, [[478, 300], [470, (300 + yc) / 2], [466, yc]], 40, D.colon, { ow: 6, glow: gl(0) || (on(b, 1) ? 0.6 : 0) });
      ell(g, 466, yc + 18, 36, 40, D.colon, { ow: 6, shade: D.colonS });
      tube(g, [[452, yc + 52], [436, yc + 86], [446, yc + 112]], 11, D.colon, { ow: 4 });
      lab(g, 'cec', 520, yc + 40, 16, '#d9f7c0'); lab(g, 'apendice', 520, yc + 112, 14, '#d9f7c0');
      if (yc < 420) lab(g, 'subhepatic', 470, 255, 15, '#ffe36e');
      if (d > 0.6) lab(g, 'fosa iliacă\ndreaptă', 455, 870, 15, '#ffe36e', { alpha: d });
      if (on(b, 1)) arr(g, 420, 360, 420, 360 + 330 * ease(clamp(b.bt / (b.bd * 0.6))), '#ffe36e', 6, 0.9);
      // etichetele colonului + retroperitoneal
      const ca = b.i < 0 ? 1 : c3;
      if (ca > 0.05) {
        lab(g, 'ascendent', 410, 560, 15, '#d9f7c0', { alpha: ca }); lab(g, 'transvers', 700, 380, 15, '#d9f7c0', { alpha: ca });
        lab(g, 'descendent', 955, 520, 15, '#d9f7c0', { alpha: ca }); lab(g, 'sigmoid', 820, 850, 15, '#d9f7c0', { alpha: ca });
        g.save(); g.globalAlpha = ca * 0.8; g.strokeStyle = '#ffe36e'; g.lineWidth = 3; g.setLineDash([8, 8]);
        g.beginPath(); g.roundRect(436, 300, 64, Math.max(40, yc - 300), 20); g.stroke(); g.beginPath(); g.roundRect(880, 300, 64, 400, 20); g.stroke(); g.restore();
        lab(g, 'contur punctat\n= retroperitoneal', 200, 470, 16, '#ffe36e', { alpha: ca });
      }
    },
  };
}

/* =================================================== CLOACA: septul urorectal */
// Ce trebuie să se vadă (secțiune sagitală, anterior stânga, posterior dreapta, cranial sus): cloaca (galben, endoderm)
// închisă jos de membrana cloacală; în față intră alantoida, în spate metenteronul. Pct. 2: septul urorectal (roșu, mezoderm)
// coboară din unghiul alantoidă–intestin spre membrană; în spatele lui apare canalul anorectal (mov), în față sinusul urogenital.
// Pct. 3: septul atinge membrana (corpul perineal), membrana dispare (S7) → 2 orificii.
export function cloaca() {
  let sy = 440;
  const sx = (y) => 528 + (y - 420) * 0.02;
  return {
    home: HOME,
    anchors: [[330, 560], () => [sx(Math.max(470, sy - 60)) + 40, Math.max(470, sy - 60)], [372, 776]],
    phase: (i) => ['cloaca', 'septul urorectal coboară', 'S7 · 2 orificii'][i] || 'cloaca',
    draw(g, t, b) {
      bg(g);
      const p = P(b, t, 3); const p1 = p(1), p2 = p(2);
      sy = lerp(440, 772, ease(p1));
      lab(g, 'anterior ←', 120, 900, 18, D.note); lab(g, '→ posterior', 880, 900, 18, D.note);
      tube(g, [[290, 50], [340, 260], [430, 445]], 34, D.endoL, { ow: 6 }); lab(g, 'alantoida', 200, 160, 18, '#ffe9a8');
      tube(g, [[740, 50], [720, 250], [640, 440]], 54, D.endo, { ow: 6 }); lab(g, 'metenteron', 860, 160, 18, '#ffe9a8');
      const bag = new Path2D(); bag.ellipse(528, 610, 200, 172, 0, 0, Math.PI * 2);
      paint(g, bag, D.endo, D.endoS, D.endoL, [328, 438, 400, 344], OUT, 6);
      if (p1 > 0.01) { g.save(); g.clip(bag); g.globalAlpha = clamp(p1 * 1.5); g.fillStyle = D.anal; g.beginPath(); g.moveTo(sx(400), 380); g.lineTo(sx(sy), sy); g.lineTo(760, sy + 20); g.lineTo(760, 380); g.closePath(); g.fill(); g.restore(); }
      if (on(b, 0)) ring(g, 528, 610, 220, 192, ease(b.bt * 1.3));
      // septul urorectal
      if (p1 > 0.01) { const sp = new Path2D(); sp.moveTo(sx(420) - 30, 432); sp.lineTo(sx(420) + 30, 432); sp.lineTo(sx(sy) + 7, sy); sp.lineTo(sx(sy) - 7, sy); sp.closePath(); paint(g, sp, D.septum, D.mesoS, null, [490, 430, 70, sy - 430], OUT, 5); }
      // membrana cloacală + orificiile
      const ma = 1 - ease(p2);
      if (ma > 0.02) { g.save(); g.globalAlpha = ma; tube(g, [[420, 776], [636, 776]], 11, '#2a1534', { ow: 0 }); g.restore(); }
      if (p2 > 0.05) {
        g.save(); g.globalAlpha = p2; g.fillStyle = '#20141f'; g.beginPath(); g.ellipse(445, 776, 42, 18, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(612, 776, 42, 18, 0, 0, 7); g.fill(); g.restore();
        arr(g, 445, 760, 430, 860, D.endoL, 5, p2); arr(g, 612, 760, 630, 860, '#c9b3ff', 5, p2);
        dot(g, sx(772), 776, 13, D.septum, { ow: 3.5, alpha: p2 }); lab(g, 'corpul perineal', 528, 905, 15, '#ffb0a8', { alpha: p2 });
        lab(g, 'orificiul\nurogenital', 330, 850, 15, '#ffe9a8', { alpha: p2 }); lab(g, 'orificiul\nanal', 735, 850, 15, '#e3d6ff', { alpha: p2 });
      }
      if (ma > 0.3) lab(g, 'membrana cloacală', 528, 812, 16, D.cream, { alpha: ma });
      if (p1 > 0.5) { lab(g, 'sinus\nurogenital', 420, 640, 19, OUT, { stroke: false }); lab(g, 'canal\nanorectal', 640, 560, 19, '#ffffff'); lab(g, 'septul\nurorectal', 528, 340, 17, '#ffb0a8'); }
      else lab(g, 'cloaca', 528, 640, 22, OUT, { stroke: false });
    },
  };
}

/* =================================================== CANALUL ANAL (desen fix) */
// Secțiune frontală: 2/3 superioare galbene (endoderm, a. rectală superioară din a. mezenterică inferioară), 1/3 inferioară
// albastră (ectoderm, ramuri din a. rușinoasă internă); linia pectinată în zig-zag la granița lor.
export function anal() {
  return {
    home: HOME,
    anchors: [[352, 260], [352, 720], [652, 584]],
    phase: (i) => ['2/3 superioare · endoderm', '1/3 inferioară · ectoderm', 'linia pectinată'][i] || 'canalul anal',
    draw(g, t, b) {
      bg(g);
      // artera rectală superioară (sus) + arterele rectale inferioare (laterale, jos)
      tube(g, [[500, 30], [440, 90], [380, 200], [370, 470]], 12, D.art, { ow: 4, glow: on(b, 0) ? 0.7 : 0 });
      tube(g, [[500, 30], [560, 90], [620, 200], [630, 470]], 12, D.art, { ow: 4, glow: on(b, 0) ? 0.7 : 0 });
      tube(g, [[110, 700], [300, 704], [372, 700]], 12, D.art, { ow: 4, glow: on(b, 1) ? 0.7 : 0 });
      tube(g, [[890, 700], [700, 704], [628, 700]], 12, D.art, { ow: 4, glow: on(b, 1) ? 0.7 : 0 });
      lab(g, 'a. rectală superioară\n(din a. mezenterică inf.)', 700, 50, 16, '#ffb0a8');
      lab(g, 'a. rectală inferioară\n(din a. rușinoasă internă)', 190, 650, 15, '#ffb0a8');
      // pereții canalului
      g.save(); g.fillStyle = '#20141f'; g.fillRect(440, 100, 120, 760); g.restore();
      tube(g, [[420, 100], [420, 594]], 56, D.endo, { ow: 6, cap: 'butt', glow: on(b, 0) ? 0.7 : 0 }); tube(g, [[580, 100], [580, 594]], 56, D.endo, { ow: 6, cap: 'butt', glow: on(b, 0) ? 0.7 : 0 });
      tube(g, [[420, 606], [420, 860]], 56, D.ecto, { ow: 6, cap: 'butt', glow: on(b, 1) ? 0.7 : 0 }); tube(g, [[580, 606], [580, 860]], 56, D.ecto, { ow: 6, cap: 'butt', glow: on(b, 1) ? 0.7 : 0 });
      // linia pectinată
      g.save(); g.lineJoin = 'round'; for (const [w, c] of [[11, OUT], [5, '#ffffff']]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); for (let k = 0; k <= 14; k++) { const x = 380 + k * 17.2, y = 600 + (k % 2 ? -12 : 12); k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); } g.restore();
      if (on(b, 2)) ring(g, 500, 600, 150, 40, ease(b.bt * 1.3));
      lab(g, 'ENDODERM\n(din metenteron)', 500, 330, 18, '#ffe9a8'); lab(g, 'ECTODERM\n(din proctodeu)', 500, 740, 18, D.ectoL);
      lab(g, 'linia pectinată\n= fosta membrană anală', 790, 600, 16, '#ffffff');
      lab(g, 'inervație viscerală →\nhemoroizii interni nu dor', 800, 330, 15, D.note); lab(g, 'inervație somatică →\nhemoroizii externi dor', 800, 790, 15, D.note);
      lab(g, '2/3', 300, 330, 26, '#ffe9a8'); lab(g, '1/3', 300, 760, 26, D.ectoL);
      lab(g, 'orificiul anal', 500, 900, 16, D.note);
    },
  };
}

/* =================================================== FICATUL + VEZICA BILIARĂ + MUGURII PANCREATICI */
// Ce trebuie să se vadă (vedere laterală: ventral = stânga ecranului, cranial sus), ca figura LP: tubul (galben) vertical;
// septul transvers = bloc de mezoderm roz în față. Pct. 1: din peretele ventral iese mugurele hepatic (S3) și cordoanele lui
// cresc ramificat în septul transvers (maro). Pct. 2: legătura se îngustează → ductul biliar (verde) care se bifurcă: vezica
// biliară + ductul cistic. Pct. 3: lângă ductul biliar iese mugurele pancreatic ventral (albastru). Pct. 4: din peretele dorsal
// (dreapta ecranului) iese mugurele pancreatic dorsal (roșu).
const TREE = [
  [0, 500, 430, 420, 335], [1, 420, 335, 330, 268], [1, 420, 335, 400, 212], [2, 330, 268, 240, 225], [2, 330, 268, 262, 330],
  [2, 400, 212, 330, 160], [2, 400, 212, 462, 150], [3, 240, 225, 168, 190], [3, 240, 225, 192, 276], [3, 262, 330, 200, 384],
  [3, 262, 330, 312, 400], [3, 330, 160, 268, 128], [3, 330, 160, 368, 120], [3, 462, 150, 490, 132],
];
export function liverBuds() {
  return {
    home: HOME,
    anchors: [[300, 222], [452, 520], [566, 610], [740, 380]],
    phase: (i) => ['S3 · mugurele hepatic', 'ductul biliar → vezica biliară', 'mugurele pancreatic ventral', 'mugurele pancreatic dorsal'][i] || 'mugurii din endoderm',
    draw(g, t, b) {
      bg(g);
      const p = P(b, t, 4);
      lab(g, '← ventral', 80, 560, 16, D.note); lab(g, 'dorsal →', 920, 600, 16, D.note);
      // septul transvers
      g.save(); paint(g, (() => { const q = new Path2D(); q.roundRect(80, 90, 440, 380, 60); return q; })(), D.mesoP, D.mesoPS, null, [80, 90, 440, 380], OUT, 5); g.restore();
      lab(g, 'septul transvers (mezoderm)', 300, 492, 16, D.mesoP);
      // tubul (stomac sus → duoden)
      ell(g, 690, 150, 120, 100, D.endo, { ow: 6, shade: D.endoS }); lab(g, 'stomac', 720, 150, 17, OUT, { stroke: false });
      tube(g, [[650, 240], [640, 420], [630, 640], [620, 900]], 110, D.endo, { ow: 6 });
      lab(g, 'duoden', 640, 800, 17, OUT, { stroke: false });
      // mugurele hepatic + cordoanele
      const p0 = p(0);
      for (const [gn, x0, y0, x1, y1] of TREE) { const f = clamp(p0 * 4 - gn); if (f <= 0) continue; tube(g, [[x0, y0], [lerp(x0, x1, f), lerp(y0, y1, f)]], 26 - gn * 4, D.liver, { ow: 4 }); }
      // tulpina: întâi lată (endoderm), apoi îngustă = ductul biliar (verde)
      const p1 = p(1);
      tube(g, [[588, 500], [540, 470], [500, 432]], lerp(36, 18, p1), p1 > 0.4 ? D.bile : D.liver, { ow: 5, glow: on(b, 1) ? 0.7 : 0 });
      if (p1 > 0.02) { tube(g, [[540, 472], [500, 520], [470, 540]], 12 * p1 + 2, D.bile, { ow: 4 }); ell(g, 440, 560, 54 * p1 + 1, 34 * p1 + 1, D.bile, { ow: 5, shade: D.bileS, rot: -0.4 }); }
      if (p1 > 0.5) { lab(g, 'vezica biliară', 390, 615, 16, '#c9f0d8'); lab(g, 'ductul biliar', 560, 420, 15, '#c9f0d8'); lab(g, 'ductul cistic', 455, 495, 13, '#c9f0d8'); }
      if (p0 > 0.3) lab(g, 'mugurele hepatic\n(cordoane de hepatocite)', 175, 425, 15, '#ffffff');
      // mugurele pancreatic ventral
      const p2 = p(2); if (p2 > 0.02) { ell(g, 560, 570, 34 * p2, 30 * p2, D.pancV, { ow: 5, shade: D.pancVS }); if (p2 > 0.5) lab(g, 'pancreatic\nventral', 470, 690, 15, '#d6f2ff'); }
      // mugurele pancreatic dorsal
      const p3 = p(3); if (p3 > 0.02) { ell(g, 740, 460, 58 * p3, 74 * p3, D.pancD, { ow: 5, shade: D.pancDS }); for (let k = 0; k < 9; k++) dot(g, 728 + (k % 3) * 16 * p3, 430 + Math.floor(k / 3) * 26 * p3, 5 * p3, '#ffb0a8', { ow: 0 }); if (p3 > 0.5) lab(g, 'pancreatic\ndorsal', 860, 470, 15, '#ffd0c8'); }
    },
  };
}

/* =================================================== PANCREASUL: rotația mugurelui ventral + fuziunea + ductele */
// Stânga: secțiune transversală prin duoden privită de sus (dorsal sus, stânga embrionului = dreapta ecranului). Mugurele dorsal
// (roșu) e dorsal; mugurele ventral (albastru) + ductul biliar (verde) sunt ventral. Pct. 3: duodenul se rotește spre dreapta
// (orar pe ecran, ca stomacul): mugurele ventral + ductul biliar trec pe partea DREAPTĂ a duodenului (stânga ecranului) și ajung
// dorsal, lângă mugurele dorsal, apoi se lipesc. Dreapta: pancreasul format, din față: albastru = capul inferior + uncinatul,
// roșu = capul superior + corp + coadă; pct. 4: Wirsung (alb) = ductul ventral + partea distală a ductului dorsal, deschis cu
// coledocul la papila mare; Santorini (punctat) = restul ductului dorsal, la papila mică.
export function pancreas() {
  const cx = 250, cy = 330; let ang = 90;
  const vb = () => { const a = ang * Math.PI / 180; return [cx + 112 * Math.cos(a), cy + 112 * Math.sin(a)]; };
  const DORS = smooth([[612, 344], [700, 318], [800, 298], [900, 288], [962, 300], [952, 346], [862, 356], [764, 378], [694, 424], [644, 452], [604, 432]]);
  const VENT = smooth([[604, 446], [652, 456], [704, 476], [724, 540], [694, 594], [642, 604], [608, 566], [598, 504]]);
  return {
    home: HOME,
    anchors: [[850, 260], [668, 540], () => { const q = vb(); return [q[0] - 54, q[1] - 30]; }, [905, 360]],
    phase: (i) => ['mugurele dorsal', 'mugurele ventral', 'rotația + fuziunea', 'ductele: Wirsung + Santorini'][i] || 'pancreasul',
    draw(g, t, b) {
      bg(g);
      const p = P(b, t, 4); const r = ease(p(2)); ang = lerp(90, 213, r);
      const gD = on(b, 0) ? 0.9 : 0, gV = on(b, 1) ? 0.9 : 0;
      // ---- stânga: secțiunea
      panel(g, 14, 30, 480, 590);
      lab(g, 'secțiune prin duoden, privită de sus', 254, 66, 15, D.note);
      lab(g, 'dorsal ↑', 254, 100, 15, D.note); lab(g, 'ventral ↓', 254, 594, 15, D.note); lab(g, 'dreapta\nembrionului', 64, 470, 14, D.note);
      ell(g, cx, cy - 122, 74, 48, D.pancD, { ow: 5, shade: D.pancDS }); if (gD) ring(g, cx, cy - 122, 90, 64, ease(b.bt * 1.3));
      lab(g, 'dorsal', cx + 120, cy - 150, 15, '#ffd0c8');
      ell(g, cx, cy, 70, 70, D.endo, { ow: 6, shade: D.endoS }); ell(g, cx, cy, 30, 30, '#ffffff', { ow: 4 }); lab(g, 'duoden', cx + 112, cy + 10, 14, '#ffe9a8');
      const q = vb(); const a = ang * Math.PI / 180;
      const bd = [cx + 66 * Math.cos(a - 0.35), cy + 66 * Math.sin(a - 0.35)];
      tube(g, [bd, [q[0] + 30 * Math.cos(a - 0.7), q[1] + 30 * Math.sin(a - 0.7)]], 12, D.bile, { ow: 4 });
      ell(g, q[0], q[1], 46 + 6 * r, 40 + 4 * r, D.pancV, { ow: 5, shade: D.pancVS }); if (gV) ring(g, q[0], q[1], 64, 58, ease(b.bt * 1.3));
      lab(g, 'ventral', q[0] + (r > 0.5 ? -10 : 82), q[1] + (r > 0.5 ? 64 : 10), 15, '#d6f2ff');
      if (r > 0.02 || b.i < 0) arcArrow(g, cx, cy, 168, Math.PI * 0.55, Math.PI * 1.15, '#ffe36e', 5, b.i < 0 ? 0.8 : 0.4 + 0.6 * (on(b, 2) ? 1 : 0));
      if (r > 0.9) lab(g, 'se lipesc', 110, 190, 16, '#ffe36e');
      // ---- dreapta: pancreasul format (din față)
      panel(g, 508, 30, 478, 874);
      lab(g, 'pancreasul format, din față', 746, 66, 15, D.note);
      tube(g, [[640, 240], [584, 320], [566, 450], [584, 580], [656, 652], [770, 640]], 46, D.endo, { ow: 6 }); lab(g, 'duoden', 548, 700, 15, '#ffe9a8');
      paint(g, DORS, D.pancD, D.pancDS, null, [600, 288, 360, 170], OUT, 5); if (gD) { g.save(); g.shadowColor = '#ffe36e'; g.shadowBlur = 24; g.strokeStyle = '#ffe36e'; g.lineWidth = 4; g.stroke(DORS); g.restore(); }
      paint(g, VENT, D.pancV, D.pancVS, null, [596, 446, 130, 160], OUT, 5); if (gV) { g.save(); g.shadowColor = '#ffe36e'; g.shadowBlur = 24; g.strokeStyle = '#ffe36e'; g.lineWidth = 4; g.stroke(VENT); g.restore(); }
      lab(g, 'coada', 925, 255, 15, '#ffd0c8'); lab(g, 'corpul', 800, 255, 15, '#ffd0c8'); lab(g, 'capul (sus)', 700, 280, 15, '#ffd0c8');
      lab(g, 'capul (jos) +\nprocesul uncinat', 800, 560, 15, '#d6f2ff');
      // coledocul + ductele
      tube(g, [[640, 110], [622, 300], [604, 440], [592, 520]], 12, D.bile, { ow: 4 }); lab(g, 'coledoc', 690, 130, 15, '#c9f0d8');
      const p3 = p(3);
      if (p3 > 0.02) {
        tube(g, [[944, 318], [860, 326], [770, 350], [690, 432], [628, 500], [592, 522]], 9, '#ffffff', { ow: 3, u1: p3 });
        if (p3 > 0.6) { g.save(); g.globalAlpha = clamp((p3 - 0.6) * 2.5); g.strokeStyle = '#ffffff'; g.lineWidth = 6; g.setLineDash([10, 8]); g.beginPath(); g.moveTo(700, 420); g.lineTo(640, 430); g.lineTo(588, 446); g.stroke(); g.restore(); }
        lab(g, 'Wirsung', 830, 412, 16, '#ffffff', { alpha: p3 }); lab(g, 'Santorini', 492, 398, 15, '#ffffff', { alpha: clamp((p3 - 0.6) * 2.5) });
        lab(g, 'papila mare', 492, 540, 14, D.cream, { alpha: p3 }); lab(g, 'papila mică', 492, 448, 14, D.cream, { alpha: clamp((p3 - 0.6) * 2.5) });
      }
      if (b.i >= 0 && b.i < 2) lab(g, 'la început: 2 muguri, 2 ducturi separate', 254, 650, 15, D.cream);
    },
  };
}
