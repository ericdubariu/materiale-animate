// Partea E (malformațiile digestive), Partea F (respiratorul), Partea G (cazurile), capcanele.
import {
  HOME, D, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead, lab,
  stage, OUT, clamp, lerp, ease, paint, smooth, REDUCED, st, arcArrow, cross, coils, teFistula, xray, duoSection,
} from './dg.js';

/* =================================================== ATREZIA ESOFAGIANĂ + FISTULA (desen fix) */
// Vedere din față, schematic: traheea (albastru) + bronhiile; esofagul superior se termină orb (fund de sac); esofagul inferior
// pleacă din trahee (fistula) și duce la stomac, care are aer. Badge 1 = fundul de sac, 2 = fistula, 3 = aerul din stomac.
export function esoAtresia() {
  let A = null;
  return {
    home: HOME,
    anchors: [() => (A ? [A.pouch[0] + 52, A.pouch[1] - 20] : [610, 280]), () => (A ? [A.fist[0] - 8, A.fist[1] - 44] : [470, 380]), () => (A ? [A.stom[0] + 90, A.stom[1] - 60] : [720, 740])],
    phase: (i) => ['fund de sac', 'fistula traheo-esofagiană', 'aer în stomac'][i] || 'atrezie + fistulă',
    draw(g, t, b) {
      bg(g);
      A = teFistula(g, t, 60, 10, 0.92, { hl: b.i });
      if (on(b, 0)) ring(g, A.pouch[0], A.pouch[1] - 30, 48, 70, ease(b.bt * 1.3));
      if (on(b, 1)) ring(g, A.fist[0], A.fist[1], 60, 40, ease(b.bt * 1.3));
      if (on(b, 2)) ring(g, A.stom[0], A.stom[1], 130, 60, ease(b.bt * 1.3));
    },
  };
}

/* =================================================== ATREZIA DUODENALĂ: „double bubble” (desen fix) */
// Schema unei radiografii (desenată): aerul e negru; bula 1 = stomacul (dreapta imaginii = stânga pacientului), bula 2 = duodenul
// proximal (stânga imaginii), nimic negru mai jos.
export function doubleBubble() {
  let X = null;
  return {
    home: HOME,
    anchors: [() => (X ? [X.b1[0], X.b1[1] - 150] : [640, 160]), () => (X ? [X.b2[0], X.b2[1] - 110] : [380, 250]), () => (X ? [X.low[0] + 250, X.low[1]] : [700, 600])],
    phase: (i) => ['bula 1: stomacul', 'bula 2: duodenul proximal', 'fără aer mai jos'][i] || '„double bubble”',
    draw(g, t, b) {
      bg(g);
      X = xray(g, 150, 70, 700, 740, b.i, b.bt);
      lab(g, 'stomac', X.b1[0], X.b1[1] + 120, 18, '#ffffff'); lab(g, 'duoden', X.b2[0], X.b2[1] + 92, 18, '#ffffff');
      lab(g, 'fără aer mai jos', X.low[0], X.low[1] + 30, 18, '#ffffff');
      lab(g, 'dreapta\npacientului', 80, 440, 15, D.note); lab(g, 'stânga\npacientului', 920, 440, 15, D.note);
      lab(g, 'schemă desenată (nu radiografie reală): negru = aer', 500, 860, 16, D.note);
    },
  };
}

/* =================================================== GASTROSCHISIS vs. OMFALOCEL (desen fix) */
// Vedere din față (dreapta pacientului = stânga imaginii). Stânga: gastroschisis = anse libere, fără sac, printr-un defect la
// dreapta ombilicului; cordonul intact alături. Dreapta: omfalocel = anse într-un sac (amnios + peritoneu); cordonul pleacă din sac.
function cord(g, pts) { tube(g, pts, 30, '#d9e2f0', { ow: 5 }); const P0 = curve(pts); for (let k = 1; k < 9; k++) { const [x, y, a] = at(P0, k / 9); g.save(); g.strokeStyle = '#8fa3c4'; g.lineWidth = 4; g.beginPath(); g.moveTo(x - Math.sin(a) * 12, y + Math.cos(a) * 12 - 6); g.lineTo(x + Math.sin(a) * 12, y - Math.cos(a) * 12 + 6); g.stroke(); g.restore(); } }
function trunk(g, x0) { const q = new Path2D(); q.roundRect(x0 + 50, 120, 340, 540, 120); paint(g, q, D.skin, D.skinS, '#ffe2c8', [x0 + 50, 120, 340, 540], OUT, 6); }
export function wall() {
  return {
    home: HOME,
    anchors: [[150, 600], [872, 470]],
    phase: (i) => ['gastroschisis: fără sac', 'omfalocel: cu sac'][i] || 'peretele abdominal',
    draw(g, t, b) {
      bg(g);
      // gastroschisis
      trunk(g, 20); ell(g, 240, 470, 14, 14, D.skinS, { ow: 4 });
      cord(g, [[240, 480], [290, 600], [330, 760], [360, 900]]);
      ell(g, 168, 480, 26, 40, '#5a2a2a', { ow: 4 });
      const lp = [[168, 500], [120, 560], [70, 620], [120, 680], [190, 640], [210, 720], [140, 780], [80, 760]];
      tube(g, lp, 30, '#f08a5a', { ow: 6, glow: on(b, 0) ? 0.8 : 0 });
      lab(g, 'GASTROSCHISIS', 220, 90, 22, '#ffd0b0');
      lab(g, 'anse libere,\nfără sac', 110, 860, 17, D.cream); lab(g, 'cordonul\nintact, alături', 390, 820, 15, D.note);
      lab(g, 'defect la dreapta\nombilicului', 205, 400, 15, OUT, { stroke: false });
      // omfalocel
      trunk(g, 520);
      const sac = new Path2D(); sac.ellipse(740, 520, 130, 120, 0, 0, Math.PI * 2);
      coils(g, 650, 440, 180, 160, 3, D.si, 1, { w: 24 });
      g.save(); g.globalAlpha = 0.45; g.fillStyle = '#e8f4ff'; g.fill(sac); g.restore();
      g.save(); g.strokeStyle = OUT; g.lineWidth = 8; g.stroke(sac); g.strokeStyle = '#e8f4ff'; g.lineWidth = 4; g.stroke(sac); if (on(b, 1)) { g.shadowColor = '#ffe36e'; g.shadowBlur = 22; g.strokeStyle = '#ffe36e'; g.stroke(sac); } g.restore();
      cord(g, [[740, 640], [770, 740], [800, 900]]);
      lab(g, 'OMFALOCEL', 720, 90, 22, '#d6f2ff');
      lab(g, 'sac (amnios + peritoneu)', 740, 380, 16, OUT, { stroke: false }); lab(g, 'cordonul pleacă din sac', 880, 860, 15, D.note);
    },
  };
}

/* =================================================== DIVERTICULUL RESPIRATOR + SEPTUL TRAHEO-ESOFAGIAN */
// Dreapta: vedere laterală (cranial sus, ventral = stânga ecranului): din peretele ventral al preenteronului (galben) iese
// diverticulul respirator (albastru) care crește caudal și se bifurcă; septul traheo-esofagian (roșu) urcă de jos în sus între
// el și esofag și lasă legătura doar sus (laringele). Stânga: o secțiune transversală (dorsal sus): pct. 1 prelungirea ventrală;
// pct. 2 crestele traheo-esofagiene cresc din lateral; pct. 3 se unesc → sept: dorsal esofagul (galben), ventral traheea (albastru).
export function lungBud() {
  return {
    home: HOME,
    anchors: [[796, 262], [140, 360], [770, 520]],
    phase: (i) => ['S4 · diverticulul respirator', 'crestele se apropie', 'septul: trahee în față, esofag în spate'][i] || 'originea plămânului',
    draw(g, t, b) {
      bg(g);
      const p = P(b, t, 3); const p0 = p(0), p1 = p(1), p2 = p(2);
      // ---- dreapta: vedere laterală
      panel(g, 520, 30, 466, 874);
      lab(g, 'vedere laterală\n(cranial sus, ventral ←)', 640, 120, 15, D.note);
      tube(g, [[850, 120], [850, 880]], 70, D.endo, { ow: 6, lumen: D.endoL }); lab(g, 'esofag\n(dorsal)', 930, 700, 15, '#ffe9a8');
      ell(g, 850, 140, 70, 40, D.endo, { ow: 5 }); lab(g, 'faringe', 940, 130, 14, '#ffe9a8');
      const BUD = [[818, 300], [752, 336], [712, 420], [700, 560], [698, 640]];
      if (p0 > 0.02) tube(g, BUD, 48, D.lung, { ow: 6, lumen: D.lungL, u1: Math.max(0.05, p0), glow: on(b, 0) ? 0.7 : 0 });
      if (p0 > 0.85) { const a = clamp((p0 - 0.85) / 0.15); tube(g, [[698, 640], [660, 700]], 36 * a + 1, D.lung, { ow: 5, lumen: D.lungL }); tube(g, [[698, 640], [736, 704]], 36 * a + 1, D.lung, { ow: 5, lumen: D.lungL }); }
      if (p0 > 0.5) lab(g, 'diverticul\nrespirator', 610, 470, 15, D.lungL);
      // septul urcă de jos (caudal) în sus
      if (p2 > 0.02) { const top = lerp(620, 350, p2); tube(g, [[782, 640], [784, top]], 16, D.septum, { ow: 4, glow: on(b, 2) ? 0.7 : 0 }); }
      if (p2 > 0.6) { lab(g, 'septul traheo-\nesofagian', 620, 790, 15, '#ffb0a8'); lab(g, 'laringe', 735, 290, 15, D.lungL); lab(g, 'trahee', 640, 600, 15, D.lungL); }
      // ---- stânga: secțiunea transversală
      panel(g, 14, 30, 492, 600);
      lab(g, 'secțiune transversală · dorsal ↑', 260, 70, 15, D.note);
      const cx = 260;
      if (p2 < 0.02) {
        const ry = lerp(150, 190, p0);
        const ov = new Path2D(); ov.ellipse(cx, 340, 110, ry, 0, 0, Math.PI * 2);
        paint(g, ov, D.endo, D.endoS, null, [cx - 110, 340 - ry, 220, ry * 2], OUT, 6);
        if (p0 > 0.02) { g.save(); g.clip(ov); g.globalAlpha = p0; g.fillStyle = D.lung; g.fillRect(cx - 120, 340 + 10, 240, 300); g.restore(); g.save(); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(ov); g.restore(); }
        ell(g, cx, 340, 60, ry - 50, '#ffffff', { ow: 4 });
        const rw = 58 * ease(p1);
        if (rw > 1) for (const sgn of [-1, 1]) { const q = new Path2D(); q.moveTo(cx + sgn * 112, 312); q.lineTo(cx + sgn * (112 - rw - 10), 340); q.lineTo(cx + sgn * 112, 368); q.closePath(); paint(g, q, D.septum, D.mesoS, null, [cx - 120, 310, 240, 60], OUT, 4); }
        if (p1 > 0.4) lab(g, 'creste traheo-esofagiene', cx, 560, 15, '#ffb0a8');
      } else {
        const d = ease(p2);
        g.save(); g.globalAlpha = d; const band = new Path2D(); band.roundRect(cx - 90, 330, 180, 36, 14); paint(g, band, D.mesoP, D.mesoPS, null, [cx - 90, 330, 180, 36], OUT, 4); g.restore();
        ell(g, cx, lerp(255, 225, d), lerp(110, 84, d), lerp(95, 80, d), D.endo, { ow: 6, shade: D.endoS }); ell(g, cx, lerp(255, 225, d), 34, 26, '#ffffff', { ow: 4 });
        ell(g, cx, lerp(430, 475, d), lerp(110, 80, d), lerp(95, 78, d), D.lung, { ow: 6, shade: D.lungS }); ell(g, cx, lerp(430, 475, d), 34, 30, D.lungL, { ow: 4 });
        lab(g, 'esofag (dorsal)', cx + 150, 200, 15, '#ffe9a8', { alpha: d }); lab(g, 'trahee (ventral)', cx + 150, 520, 15, D.lungL, { alpha: d }); lab(g, 'sept', cx + 130, 348, 15, '#ffb0a8', { alpha: d });
      }
      lab(g, 'galben = endoderm digestiv · albastru = endoderm respirator · roșu = mezoderm', 500, 920, 14, D.note);
    },
  };
}

/* =================================================== RAMIFICAREA BRONȘICĂ */
// Ce trebuie să se vadă (vedere din față, dreapta embrionului = stânga ecranului): pct. 1 (S4) mugurele se bifurcă → 2 bronhii
// principale; pct. 2 (S5) 3 bronhii lobare în dreapta (stânga ecranului), 2 în stânga; pct. 3 (S6) segmentare 10 / 8–9;
// pct. 4 ramificare dihotomă repetată, contorul urcă până la ~17 generații; „+ ~6 după naștere = 23”. Plămânii (roz) cresc în jur.
function buildTree() {
  const segs = [];
  const add = (gen, x0, y0, x1, y1) => segs.push({ gen, x0, y0, x1, y1 });
  const C0 = [520, 210];
  const MR = [432, 296], ML = [610, 290];
  add(0, ...C0, ...MR); add(0, ...C0, ...ML);
  const lob = [[MR, [352, 248]], [MR, [338, 344]], [MR, [418, 430]], [ML, [698, 244]], [ML, [656, 428]]];
  lob.forEach(([a, c]) => add(1, ...a, ...c));
  const segN = [3, 2, 5, 4, 4];
  const tips = [];
  lob.forEach(([a, c], i) => {
    const th = Math.atan2(c[1] - a[1], c[0] - a[0]); const n = segN[i];
    for (let k = 0; k < n; k++) { const t2 = th + (n === 1 ? 0 : (k / (n - 1) - 0.5) * 1.5); const e = [c[0] + Math.cos(t2) * 58, c[1] + Math.sin(t2) * 58]; add(2, ...c, ...e); tips.push([e, t2, 44]); }
  });
  let cur = tips;
  for (let gen = 3; gen <= 6; gen++) {
    const nx = [];
    cur.forEach(([p0, th, L]) => { for (const s of [-0.5, 0.5]) { const t2 = th + s; const e = [p0[0] + Math.cos(t2) * L, p0[1] + Math.sin(t2) * L]; add(gen, ...p0, ...e); nx.push([e, t2, L * 0.74]); } });
    cur = nx;
  }
  return segs;
}
export function branching() {
  const SEGS = buildTree();
  return {
    home: HOME,
    anchors: [[476, 230], [300, 290], [330, 480], [760, 520]],
    phase: (i) => ['S4 · mugure bifid', 'S5 · lobare: 3 + 2', 'S6 · segmentare: 10 + 8–9', 'S8 → luna 6 · ~17 generații'][i] || 'ramificarea',
    draw(g, t, b) {
      bg(g);
      const s = stage(b, t, 4, 0.75);
      lab(g, 'dreapta embrionului', 100, 100, 16, D.note); lab(g, 'stânga embrionului', 900, 100, 16, D.note);
      // plămânii + pleura
      const lg = clamp(s / 4);
      ell(g, 380, 380, 90 + 80 * lg, 120 + 110 * lg, D.pleura, { ow: 5, alpha: 0.35 + 0.4 * lg });
      ell(g, 660, 380, 80 + 75 * lg, 115 + 105 * lg, D.pleura, { ow: 5, alpha: 0.35 + 0.4 * lg });
      tube(g, [[520, 50], [520, 214]], 34, D.lung, { ow: 6, lumen: D.lungL }); lab(g, 'trahee', 600, 90, 16, D.lungL);
      // segmentele arborelui: generația g crește pe etapa ei
      const grow = (gen) => (gen === 0 ? clamp(s) : gen === 1 ? clamp(s - 1) : gen === 2 ? clamp(s - 2) : clamp((s - 3) * 4 - (gen - 3)));
      SEGS.forEach((q) => {
        const f = ease(grow(q.gen)); if (f <= 0.01) return;
        const w = [26, 18, 11, 7, 5, 4, 3][q.gen];
        const hl = (on(b, 0) && q.gen === 0) || (on(b, 1) && q.gen === 1) || (on(b, 2) && q.gen === 2) || (on(b, 3) && q.gen >= 3);
        tube(g, [[q.x0, q.y0], [lerp(q.x0, q.x1, f), lerp(q.y0, q.y1, f)]], w, hl ? '#a9d4ff' : D.lung, { ow: q.gen > 3 ? 2 : 4 });
        if (f > 0.98 && q.gen <= 2) dot(g, q.x1, q.y1, w * 0.62, D.lung, { ow: 3 });
      });
      if (s > 0.6) { lab(g, 'bronhia principală\ndreaptă', 300, 140, 15, D.lungL, { alpha: clamp(s - 0.6) }); lab(g, 'bronhia principală\nstângă', 770, 140, 15, D.lungL, { alpha: clamp(s - 0.6) }); }
      if (s > 1.6) { lab(g, '3 lobare', 220, 380, 18, '#ffe36e', { alpha: clamp(s - 1.6) }); lab(g, '2 lobare', 830, 380, 18, '#ffe36e', { alpha: clamp(s - 1.6) }); }
      if (s > 2.6) { lab(g, '10 segmentare', 220, 430, 16, '#ffe9a8', { alpha: clamp(s - 2.6) }); lab(g, '8–9 segmentare', 840, 430, 16, '#ffe9a8', { alpha: clamp(s - 2.6) }); }
      const gn = s < 1 ? 1 : s < 2 ? 2 : s < 3 ? 3 : Math.min(17, 3 + Math.round(14 * clamp((s - 3) / 0.9)));
      txt(g, 'generații: ' + gn, 760, 700, 30, '#ffe36e');
      if (s > 3.85) lab(g, '+ ~6 după naștere = 23', 760, 750, 18, D.cream);
      if (s > 3.4) lab(g, 'plămânii cresc în canalele\npericardo-peritoneale (pleura)', 760, 820, 15, '#ffd0dc');
    },
  };
}

/* =================================================== CELE 4 STADII DE MATURARE (desen fix) */
// Patru panouri: pseudoglandular (tubuli, vase departe), canalicular (bronhiole respiratorii + capilare aproape), sacular (saci
// cu capilare lipite + surfactant), alveolar (alveole mature, multe). Panoul punctului curent se aprinde.
export function stagesLung() {
  const XS = [130, 375, 620, 865];
  const NAMES = [['Pseudoglandular', 'S5–S16'], ['Canalicular', 'S16–S26'], ['Sacular', 'S26 – naștere'], ['Alveolar', '8 luni – 8 ani']];
  const NOTE = ['schimb gazos\nimposibil', 'începe surfactantul;\nprematur: terapie intensivă', 'saci + capilare lipite\n→ prematurii trăiesc', 'alveole mature,\nnumărul crește'];
  function cap(g, pts) { tube(g, pts, 6, D.art, { ow: 2 }); }
  return {
    home: HOME,
    anchors: XS.map((x) => [x - 86, 120]),
    phase: (i) => (NAMES[i] ? NAMES[i][0] + ' · ' + NAMES[i][1] : 'maturarea plămânului'),
    draw(g, t, b) {
      bg(g);
      XS.forEach((x, k) => {
        const act = b.i < 0 || b.i === k;
        g.save(); g.globalAlpha = act ? 1 : 0.45;
        const q = new Path2D(); q.roundRect(x - 115, 100, 230, 620, 26);
        g.fillStyle = '#f7e1d6'; g.fill(q); g.strokeStyle = act && b.i >= 0 ? '#ffe36e' : OUT; g.lineWidth = act && b.i >= 0 ? 7 : 5; g.stroke(q);
        g.save(); g.clip(q);
        tube(g, [[x, 90], [x, 220]], 30, D.lung, { ow: 4, lumen: D.lungL });
        if (k === 0) { for (const [dx, dy] of [[-60, 330], [-20, 400], [30, 360], [70, 430], [-50, 520], [40, 560]]) tube(g, [[x, 220], [x + dx, dy]], 26, D.lung, { ow: 4, lumen: '#9fc8f0' }); for (const [dx, dy] of [[-90, 640], [90, 300], [80, 650]]) dot(g, x + dx, dy, 7, D.art, { ow: 2 }); }
        if (k === 1) { for (const [dx, dy] of [[-60, 380], [0, 450], [60, 380]]) { tube(g, [[x, 220], [x + dx, dy]], 30, D.lung, { ow: 4, lumen: D.lungL }); ell(g, x + dx, dy + 20, 30, 26, D.lungL, { ow: 4 }); } cap(g, [[x - 100, 430], [x - 60, 420], [x - 20, 480], [x + 30, 470], [x + 100, 430]]); cap(g, [[x - 90, 560], [x, 520], [x + 90, 560]]); }
        if (k === 2) { for (const [dx, dy] of [[-55, 380], [5, 470], [60, 380], [-30, 560], [50, 570]]) { tube(g, [[x, 220], [x + dx, dy - 30]], 16, D.lung, { ow: 3 }); ell(g, x + dx, dy, 40, 36, D.lungL, { ow: 4 }); g.save(); g.strokeStyle = D.art; g.lineWidth = 6; g.beginPath(); g.arc(x + dx, dy, 44, 0.2, 2.6); g.stroke(); g.restore(); for (let j = 0; j < 3; j++) dot(g, x + dx - 14 + j * 14, dy + 8, 4.5, '#ffd34d', { ow: 0 }); } }
        if (k === 3) { for (let j = 0; j < 22; j++) { const a = j * 2.4, r = 30 + (j % 6) * 24; const ax = x + Math.cos(a) * Math.min(90, r), ay = 450 + Math.sin(a) * r * 1.3; tube(g, [[x, 300], [ax, ay]], 6, D.lung, { ow: 2 }); ell(g, ax, ay, 22, 20, D.lungL, { ow: 3 }); } cap(g, [[x - 100, 360], [x - 30, 430], [x + 40, 380], [x + 100, 470]]); cap(g, [[x - 100, 560], [x, 520], [x + 100, 600]]); }
        g.restore(); g.restore();
        lab(g, NAMES[k][0], x, 760, 19, act ? '#ffe36e' : D.dim); lab(g, NAMES[k][1], x, 795, 17, D.cream, { alpha: act ? 1 : 0.5 });
        lab(g, NOTE[k], x, 860, 14, D.note, { alpha: act ? 1 : 0.5 });
      });
      lab(g, 'albastru = căile aeriene · roșu = capilare · galben = surfactant', 500, 912, 15, D.note);
    },
  };
}

/* =================================================== MALFORMAȚII RESPIRATORII (desen fix) */
function thorax(g, x, y, lr, ll, o = {}) {
  const q = new Path2D(); q.roundRect(x - 170, y - 150, 340, 300, 80); paint(g, q, '#3a2b33', null, null, [x - 170, y - 150, 340, 300], OUT, 5);
  tube(g, [[x, y - 160], [x, y - 40]], 22, D.lung, { ow: 4 });
  tube(g, [[x, y - 40], [x - 50, y - 10]], 14, D.lung, { ow: 3 }); tube(g, [[x, y - 40], [x + 50, y - 10]], 14, D.lung, { ow: 3 });
  ell(g, x - 80, y + 20, 70 * lr, 110 * lr, D.pleura, { ow: 5, shade: '#e795ad' });
  ell(g, x + 80, y + 20, 70 * ll, 110 * ll, D.pleura, { ow: 5, shade: '#e795ad' });
  if (o.atresia) cross(g, x, y - 100, 24);
}
export function lungMal() {
  const PT = [[260, 270], [740, 270], [260, 690], [740, 690]];
  return {
    home: HOME,
    anchors: [[740, 104], [260, 524], [740, 524]],
    phase: (i) => ['hipoplazie bilaterală', 'hipoplazie unilaterală', 'atrezia traheală'][i] || 'malformații respiratorii',
    draw(g, t, b) {
      bg(g);
      thorax(g, ...PT[0], 1, 1); lab(g, 'normal', PT[0][0], PT[0][1] + 180, 18, D.cream);
      thorax(g, ...PT[1], 0.48, 0.48); lab(g, 'hipoplazie bilaterală', PT[1][0], PT[1][1] + 180, 18, on(b, 0) ? '#ffe36e' : D.cream);
      thorax(g, ...PT[2], 1, 0.45); lab(g, 'hipoplazie unilaterală', PT[2][0], PT[2][1] + 180, 18, on(b, 1) ? '#ffe36e' : D.cream);
      thorax(g, ...PT[3], 0.9, 0.9, { atresia: true }); lab(g, 'atrezia traheală', PT[3][0], PT[3][1] + 180, 18, on(b, 2) ? '#ffe36e' : D.cream);
      [1, 2, 3].forEach((k, j) => { if (on(b, j)) ring(g, PT[k][0], PT[k][1], 190, 170, ease(b.bt * 1.3)); });
    },
  };
}

/* =================================================== CAZUL 1: atrezie duodenală */
// Stânga sus: schema radiografiei „double bubble”. Dreapta sus: secțiunea prin duoden, plin, fără vacuole (✕). Jos: stomac →
// duoden; papila (verde) e DEASUPRA locului închis (✕), deci bila urcă în stomac → vărsături biloase.
export function case1() {
  return {
    home: HOME,
    anchors: [[205, 612], [60, 90], [700, 630], [870, 120]],
    phase: (i) => ['cazul', 'ce găsești', 'diagnosticul', 'baza embriologică'][i] || 'cazul 1',
    draw(g, t, b) {
      bg(g);
      const X = xray(g, 40, 70, 440, 470, -1, 0);
      lab(g, 'stomac', X.b1[0], X.b1[1] + 76, 15, '#ffffff'); lab(g, 'duoden', X.b2[0], X.b2[1] + 62, 15, '#ffffff');
      if (on(b, 1)) ring(g, 260, 305, 240, 250, ease(b.bt * 1.3));
      duoSection(g, 760, 300, 170, 0, 0, t); cross(g, 760, 300, 34);
      lab(g, 'lumenul nu se redeschide', 760, 500, 16, D.cream);
      if (on(b, 3)) ring(g, 760, 300, 190, 190, ease(b.bt * 1.3));
      // jos: stomac → duoden → ✕ (sub papilă)
      ell(g, 260, 720, 120, 78, D.endo, { ow: 6, shade: D.endoS }); lab(g, 'stomac', 260, 720, 17, OUT, { stroke: false });
      tube(g, [[372, 712], [500, 690], [610, 716], [660, 780]], 44, D.endo, { ow: 6, lumen: D.endoL });
      tube(g, [[660, 800], [680, 860], [760, 900], [900, 890]], 30, '#8f7d74', { ow: 4, dash: [14, 10] });
      tube(g, [[590, 560], [600, 650], [606, 696]], 14, D.bile, { ow: 4 }); dot(g, 606, 704, 11, D.bile, { ow: 3 }); lab(g, 'papila (bila)', 520, 600, 15, '#c9f0d8');
      cross(g, 662, 800, 26); lab(g, 'închis (D2)', 800, 790, 15, D.cream);
      flow(g, curve([[606, 706], [520, 694], [420, 704], [300, 690], [230, 640]]), t, D.bile, 6, 0.18, 7);
      arr(g, 190, 664, 150, 610, D.bile, 6, 0.9); lab(g, 'vărsături\nbiloase', 80, 590, 16, '#c9f0d8');
      if (on(b, 2)) ring(g, 662, 800, 54, 54, ease(b.bt * 1.3));
      if (on(b, 0)) ring(g, 120, 610, 80, 60, ease(b.bt * 1.3));
    },
  };
}

/* =================================================== CAZUL 2: atrezie esofagiană + fistulă */
export function case2() {
  let A = null;
  return {
    home: HOME,
    anchors: [() => (A ? [A.pouch[0] - 70, A.pouch[1] - 130] : [480, 150]), () => (A ? [A.pouch[0] + 60, A.pouch[1] - 10] : [620, 280]), () => (A ? [A.fist[0] - 10, A.fist[1] - 44] : [470, 380]), () => (A ? [A.stom[0] + 90, A.stom[1] - 60] : [720, 740])],
    phase: (i) => ['cazul', 'ce găsești', 'diagnosticul', 'baza embriologică'][i] || 'cazul 2',
    draw(g, t, b) {
      bg(g);
      A = teFistula(g, t, 60, 40, 0.88, { ng: true, saliva: true, hl: b.i === 1 ? 0 : b.i === 2 ? 1 : b.i === 3 ? 2 : -1 });
      lab(g, 'sonda nasogastrică\nse oprește', A.pouch[0] + 250, A.pouch[1] - 60, 15, '#ffffff');
      lab(g, 'gura plină de salivă', A.pouch[0] - 210, A.pouch[1] - 210, 15, '#dff4ff');
      if (on(b, 0)) ring(g, A.pouch[0], A.pouch[1] - 120, 60, 80, ease(b.bt * 1.3));
      if (on(b, 1)) ring(g, A.pouch[0], A.pouch[1] - 20, 50, 50, ease(b.bt * 1.3));
      if (on(b, 2)) ring(g, A.fist[0], A.fist[1], 60, 40, ease(b.bt * 1.3));
      if (on(b, 3)) ring(g, A.stom[0], A.stom[1], 120, 56, ease(b.bt * 1.3));
    },
  };
}

/* =================================================== CAPCANELE: scena perechii, din nou */
export function makeTraps(SC) {
  const MAP = ['map', 'map', 'rotation', 'omentum', 'pancreas', 'wall'];
  return function traps() {
    const built = {};
    const get = (n) => (built[n] = built[n] || SC[n]({ spec: {} }));
    return {
      home: HOME,
      anchors: [0, 1, 2, 3, 4, 5].map((k) => [130 + k * 150, 70]),
      phase: (i) => ['preenteron / mesenteron', 'mesenteron / metenteron', 'stomac vs. ansă', 'ventral vs. dorsal', 'pancreasul', 'gastroschisis vs. omfalocel'][i] || 'ce se confundă la grilă',
      draw(g, t, b) {
        bg(g);
        const k = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 5) % 6 : b.i;
        const sc = get(MAP[k]);
        g.save(); g.beginPath(); g.roundRect(40, 110, 920, 800, 26); g.clip(); g.translate(40, 110); g.scale(0.92, 0.856);
        try { sc.draw(g, t, { i: k === 0 ? 0 : k === 1 ? 2 : -1, bt: t, bd: 7, k: 0 }); } catch (e) { /* nimic */ }
        g.restore();
        g.save(); g.strokeStyle = 'rgba(255,180,138,.7)'; g.lineWidth = 4; g.beginPath(); g.roundRect(40, 110, 920, 800, 26); g.stroke(); g.restore();
      },
    };
  };
}
