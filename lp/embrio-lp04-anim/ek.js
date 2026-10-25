// Kit embriologie (LP 5 urogenital): culori pe surse, tuburi cu contur gros, text cu contur, fluxuri de particule.
import { OUT, clamp, lerp, ease, paint, blob, bb, smooth, glowRing, arrow, REDUCED, spindle } from './kit2d.js';
export { OUT, clamp, lerp, ease, paint, blob, bb, smooth, glowRing, arrow, REDUCED, spindle };

export const W = 1000, H = 934;
export const cam = (x, y, z) => ({ x, y, z });
export const HOME = cam(500, 467, 1);
export const lbl = (at, html, o = {}) => ({ at, html, ...o });

// culorile surselor (aceleași în tot deck-ul)
export const C = {
  imm: '#f6b49c', immS: '#e08d72',      // mezodermul intermediar / nefrogen
  wolff: '#4f8fe6', wolffS: '#2f68bd',  // canalul mezonefric (Wolff)
  muller: '#e2569f', mullerS: '#b4337a',// ductul paramezonefric (Müller)
  bud: '#3db06c', budS: '#23824c',      // mugurele ureteric
  blast: '#ef7468', blastS: '#c64c43',  // mezodermul metanefric (blastemul)
  sinus: '#f4c34f', sinusS: '#d19a22',  // cloaca / sinusul urogenital (endoderm)
  anal: '#9a6ad6', analS: '#7146ad',    // canalul anorectal
  gonad: '#a98ae6', gonadS: '#7c5cc4',  // gonada
  cord: '#d2524a', cordS: '#a1352f',    // cordoni / tubi seminiferi
  germ: '#ffb347',                      // celulele germinale
  guber: '#ff8a3d',                     // gubernaculul
  aorta: '#e0443e', aortaS: '#a92b27',
  wall: '#e9d6bd', wallS: '#c9b08e',    // perete
  septum: '#d9483f',                    // septul urorectal (mezoderm)
  tub: '#f08a3a', tubS: '#c8651d',      // tuberculul genital
  fold: '#e0575a', foldS: '#b23a3e',    // faldurile uretrale
  swell: '#f4c34f', swellS: '#cf9c25',  // tumefacțiile labioscrotale
  skin: '#f3c29b', skinS: '#d99b72',
  cream: '#fff3e6', dim: '#8f7d74', hi: '#ffe36e', key: '#ff6b5e',
};

export function bg(g) { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#34231d'); gr.addColorStop(1, '#140c0a'); g.fillStyle = gr; g.fillRect(-3000, -3000, 7000, 7000); }
export function panel(g, x, y, w, h, o = {}) { g.save(); g.fillStyle = o.fill || 'rgba(255,240,228,.06)'; g.strokeStyle = o.stroke || 'rgba(255,230,210,.16)'; g.lineWidth = 3; g.beginPath(); g.roundRect(x, y, w, h, o.r || 26); g.fill(); g.stroke(); g.restore(); }

// progresul etapei k: înainte = 0, pe punct = animat, după = 1; pe beat-ul de intro (i<0) totul e gata
export function st(b, k, f = 0.65) { if (b.i < 0) return 1; if (b.i > k) return 1; if (b.i < k) return 0; return ease(clamp(b.bt / (b.bd * f))); }
export const on = (b, k) => b.i === k;
export const loopT = (t, p) => (REDUCED ? 0.999 : (t % p) / p);

export function txt(g, s, x, y, size = 24, col = C.cream, o = {}) {
  g.save(); g.font = `${o.w || 800} ${size}px Inter, "Segoe UI", sans-serif`; g.textAlign = o.align || 'center'; g.textBaseline = 'middle';
  if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  const L = String(s).split('\n');
  L.forEach((ln, i) => { const yy = y + (i - (L.length - 1) / 2) * size * 1.2; if (o.stroke !== false) { g.lineJoin = 'round'; g.strokeStyle = o.sc || OUT; g.lineWidth = size * 0.28; g.strokeText(ln, x, yy); } g.fillStyle = col; g.fillText(ln, x, yy); });
  g.restore();
}
export function pill(g, x, y, w, h, fill, label, o = {}) {
  const p = new Path2D(); p.roundRect(x - w / 2, y - h / 2, w, h, o.r ?? 18);
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  paint(g, p, fill, o.shade || null, null, [x - w / 2, y - h / 2, w, h], OUT, o.ow ?? 5);
  if (o.glow) { g.shadowColor = C.hi; g.shadowBlur = 24 * o.glow; g.strokeStyle = C.hi; g.lineWidth = 4; g.stroke(p); g.shadowBlur = 0; }
  g.restore();
  if (label) txt(g, label, x, y, o.size || 21, o.col || OUT, { stroke: false, alpha: o.alpha, w: o.w || 800 });
}

/* ---------- curbe ---------- */
export function curve(pts, n = 14) {
  if (pts.length < 3) { const out = []; for (let k = 0; k <= n; k++) out.push([lerp(pts[0][0], pts[1][0], k / n), lerp(pts[0][1], pts[1][1], k / n)]); return out; }
  const out = []; const m = pts.length;
  for (let i = 0; i < m - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(m - 1, i + 2)];
    for (let k = 0; k < n; k++) { const u = k / n, u2 = u * u, u3 = u2 * u; out.push([0, 1].map((d) => 0.5 * ((2 * p1[d]) + (-p0[d] + p2[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * u3))); }
  }
  out.push(pts[m - 1]); return out;
}
function lens(P) { const L = [0]; for (let k = 1; k < P.length; k++) L.push(L[k - 1] + Math.hypot(P[k][0] - P[k - 1][0], P[k][1] - P[k - 1][1])); return L; }
export function at(P, u) {
  const L = lens(P); const d = clamp(u) * L[L.length - 1]; let k = 1; while (k < P.length - 1 && L[k] < d) k++;
  const f = (d - L[k - 1]) / Math.max(1e-6, L[k] - L[k - 1]);
  return [lerp(P[k - 1][0], P[k][0], f), lerp(P[k - 1][1], P[k][1], f), Math.atan2(P[k][1] - P[k - 1][1], P[k][0] - P[k - 1][0])];
}
export function sub(P, u0, u1) {
  if (u1 <= u0) return [];
  const L = lens(P); const T = L[L.length - 1]; const a = u0 * T, b = u1 * T; const out = [at(P, u0).slice(0, 2)];
  for (let k = 1; k < P.length - 1; k++) if (L[k] > a && L[k] < b) out.push(P[k]);
  out.push(at(P, u1).slice(0, 2)); return out;
}
// tub gros cu contur: pts = puncte de control (Catmull-Rom); o.u0/o.u1 = porțiunea desenată
export function tube(g, pts, w, col, o = {}) {
  const P = o.raw ? pts : curve(pts); const Q = sub(P, o.u0 ?? 0, o.u1 ?? 1); if (Q.length < 2) return P;
  const p = new Path2D(); p.moveTo(Q[0][0], Q[0][1]); for (let k = 1; k < Q.length; k++) p.lineTo(Q[k][0], Q[k][1]);
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); g.lineCap = o.cap || 'round'; g.lineJoin = 'round';
  if (o.dash) g.setLineDash(o.dash);
  if (o.glow) { g.shadowColor = C.hi; g.shadowBlur = 26 * o.glow; g.strokeStyle = C.hi; g.lineWidth = w + 16; g.stroke(p); g.shadowBlur = 0; }
  if (o.ow !== 0) { g.strokeStyle = OUT; g.lineWidth = w + (o.ow ?? 8); g.stroke(p); }
  g.strokeStyle = col; g.lineWidth = w; g.stroke(p);
  if (o.lumen) { g.strokeStyle = o.lumen; g.lineWidth = w * 0.36; g.stroke(p); }
  g.restore(); return P;
}
// particule care curg de-a lungul unei curbe
export function flow(g, P, t, col, n = 6, speed = 0.25, r = 7, o = {}) {
  for (let k = 0; k < n; k++) {
    const u = ((k / n) + (REDUCED ? 0 : t * speed)) % 1; if (o.u1 !== undefined && u > o.u1) continue;
    const [x, y] = at(P, u);
    g.save(); g.globalAlpha = (o.alpha ?? 1) * Math.sin(u * Math.PI) ** 0.4; g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke(); g.restore();
  }
}
export function dot(g, x, y, r, col, o = {}) { g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = o.ow ?? 3; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); if (o.ow !== 0) g.stroke(); g.restore(); }
export function germ(g, x, y, s = 1, a = 1) { dot(g, x, y, 13 * s, C.germ, { alpha: a, ow: 3 }); dot(g, x + 2 * s, y - 1 * s, 5.5 * s, '#7a3fb0', { alpha: a, ow: 0 }); }
export function ell(g, x, y, rx, ry, fill, o = {}) { const p = new Path2D(); p.ellipse(x, y, rx, ry, o.rot || 0, 0, Math.PI * 2); g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); if (o.dash) { g.fillStyle = fill; g.fill(p); g.setLineDash(o.dash); g.strokeStyle = o.sc || OUT; g.lineWidth = o.ow ?? 4; g.stroke(p); } else paint(g, p, fill, o.shade || null, o.light || null, [x - rx, y - ry, rx * 2, ry * 2], o.sc || OUT, o.ow ?? 6); g.restore(); return p; }
export function arr(g, x0, y0, x1, y1, col = '#fff', w = 7, a = 1) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); arrow(g, x0, y0, x1, y1, col, w); g.restore(); }
export function ring(g, x, y, rx, ry, p, rot = 0) { glowRing(g, x, y, rx, ry, rot, p); }
// linie punctată simplă (etichetă → structură)
export function lead(g, x0, y0, x1, y1, a = 1) { g.save(); g.globalAlpha = clamp(a) * 0.8; g.strokeStyle = '#fff3e6'; g.lineWidth = 2.5; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); }
// rinichi (bob) — pentru ascensiune / malformații
export function kidney(g, x, y, s = 1, rot = 0, col = '#c9473f', o = {}) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  const p = new Path2D(); p.moveTo(0, -70); p.bezierCurveTo(48, -72, 58, -20, 52, 10); p.bezierCurveTo(46, 52, 22, 74, -4, 70); p.bezierCurveTo(-34, 66, -46, 40, -30, 18); p.bezierCurveTo(-20, 6, -20, -6, -30, -18); p.bezierCurveTo(-46, -40, -34, -68, 0, -70); p.closePath();
  if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  paint(g, p, col, o.shade || '#9e2f2a', '#f08a80', [-50, -72, 108, 144], OUT, 6 / Math.max(0.4, s));
  g.restore();
}

/* ---------- progres pe etape: intro = buclă prin toate etapele ---------- */
// P(b, t, n)(k) → 0..1 pentru etapa k. Pe beat-ul de intro, etapele rulează în buclă.
export function P(b, t, n, f = 0.6) {
  if (b.i < 0) { const cyc = n * 2.6 + 2.2; const ph = REDUCED ? n : (t % cyc) / 2.6; return (k) => ease(clamp(ph - k)); }
  return (k) => (k < b.i ? 1 : k > b.i ? 0 : ease(clamp(b.bt / (b.bd * f))));
}
/* ---------- poze reale (contain, cu ramă) ---------- */
const IMGS = {};
export function pic(n) { if (!IMGS[n]) { const i = new Image(); i.src = `img/${n}.jpg`; IMGS[n] = i; } return IMGS[n]; }
export function photo(g, n, x, y, w, h, cap, a = 1) {
  if (a <= 0.01) return; const im = pic(n);
  g.save(); g.globalAlpha = clamp(a);
  g.fillStyle = '#ffffff'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(x, y, w, h, 16); g.fill(); g.stroke();
  if (im.complete && im.naturalWidth) { const r = Math.min((w - 16) / im.naturalWidth, (h - 16) / im.naturalHeight); const iw = im.naturalWidth * r, ih = im.naturalHeight * r; g.drawImage(im, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih); }
  g.restore();
  if (cap) txt(g, cap, x + w / 2, y + h + 22, 18, C.cream, { alpha: a, w: 700 });
}

/* =================================================================================
   LP 4 · cardiovascular — culori de sânge + schema cu 4 camere (folosite în tot deck-ul)
   CONVENȚIE (verificată pe fiecare scenă): vedere frontală, dreapta pacientului = STÂNGA ecranului.
   ROȘU = sânge oxigenat · ALBASTRU = neoxigenat · VIOLET = amestecat. Particulele curg mereu
   de la presiune mare spre presiune mică / în sensul circulației.
   ================================================================================= */
export const B = {
  ox: '#e0443e', oxS: '#a92b27', oxL: '#ffb3ad',   // oxigenat
  dx: '#4a78d6', dxS: '#2f55a8', dxL: '#b9cdf5',   // neoxigenat
  mx: '#9a5fc8', mxS: '#6f3ea0',                   // amestecat
  cush: '#3db06c', cushS: '#23824c',               // pernițele endocardice
  prim: '#8a5ad0', sec: '#e07a3a',                 // septum primum / secundum
  musc: '#c0504a', memb: '#f0a040',                // sept muscular / partea membranoasă
  wall: '#e8c9b8', wallS: '#c9a08a',               // peretele inimii (schemă)
  adF: '#d6e6fb', asF: '#fbdcdc',                  // atriile/ventriculii drepți (albăstrui) vs stângi (rozalii)
  nerve: '#f4d03f', gray: '#a59a94', lig: '#bfb3a8',
};
// polilinie: particule care curg exact pe colțurile date (fără rotunjire)
export function stream(g, pts, t, col, n = 8, speed = 0.22, r = 8, o = {}) { flow(g, pts, t, col, n, speed, r, o); }
// țeavă dreptunghiulară (cot drept) cu contur
export function pipe(g, pts, w, col, o = {}) { return tube(g, pts, w, col, { raw: true, cap: o.cap || 'round', ...o }); }

// Schema cu 4 camere (ca în LP): AD stânga-sus, AS dreapta-sus, VD stânga-jos, VS dreapta-jos.
// VD → țeava din stânga urcă „spre plămâni”; VS → țeava din dreapta urcă „spre corp”.
// „din corp” intră în AD de sus; „din plămâni” intră în AS de sus.
export const H4 = {
  AD: [200, 300, 280, 220], AS: [520, 300, 280, 220], VD: [200, 560, 280, 250], VS: [520, 560, 280, 250],
  // trasee de sânge normale (polilinii)
  blue: [[340, 175], [340, 410], [340, 640], [250, 700], [150, 700], [110, 700], [110, 120], [290, 120]],
  red: [[660, 175], [660, 410], [660, 640], [750, 700], [850, 700], [890, 700], [890, 120], [710, 120]],
  pulm: [[200, 700], [110, 700], [110, 120], [300, 120]],
  aorta: [[800, 700], [890, 700], [890, 120], [700, 120]],
  vsd: [500, 650], asd: [500, 400],
};
export function heart4(g, t, o = {}) {
  const a = o.alpha ?? 1;
  g.save(); g.globalAlpha = a;
  // corpul inimii
  const body = new Path2D(); body.roundRect(170, 270, 660, 570, 70);
  paint(g, body, B.wall, null, null, [170, 270, 660, 570], OUT, 6);
  // țevile mari (desenate întâi, ca să intre în camere)
  const pw = o.pulmW ?? 46;
  pipe(g, H4.pulm, pw, o.pulmCol || B.dx, { ow: 7, cap: 'butt' });
  pipe(g, H4.aorta, o.aoW ?? 46, o.aoCol || B.ox, { ow: 7, cap: 'butt' });
  // camerele
  const room = (k, f) => { const [x, y, w, h] = H4[k]; const p = new Path2D(); p.roundRect(x + 10, y + 10, w - 20, h - 20, 26); paint(g, p, f, null, null, [x, y, w, h], 'rgba(42,21,52,.55)', 3); };
  room('AD', o.adF || B.adF); room('VD', o.vdF || B.adF); room('AS', o.asF || B.asF); room('VS', o.vsF || B.asF);
  // orificiile AV (tricuspidă / mitrală) = deschideri între atriu și ventricul
  g.fillStyle = B.wall; g.fillRect(290, 505, 100, 70); g.fillRect(610, 505, 100, 70);
  g.fillStyle = B.adF; g.fillRect(300, 500, 80, 80); g.fillStyle = B.asF; g.fillRect(620, 500, 80, 80);
  // găurile
  if (o.asd) { const k = clamp(o.asd); g.fillStyle = '#efe4f7'; g.fillRect(480, 400 - 50 * k, 40, 100 * k); }
  if (o.vsd) { const k = clamp(o.vsd); g.fillStyle = '#efe4f7'; g.fillRect(480, 650 - 45 * k, 40, 90 * k); }
  // intrările
  arr(g, 340, 170, 340, 285, B.dx, 9, 1); arr(g, 660, 170, 660, 285, B.ox, 9, 1);
  g.restore();
  const L = o.labels !== false;
  if (L) {
    txt(g, 'AD', 340, 380, 40, '#3567b8', { stroke: false, alpha: a }); txt(g, 'AS', 660, 380, 40, '#c4403a', { stroke: false, alpha: a });
    txt(g, 'VD', 340, 720, 40, '#3567b8', { stroke: false, alpha: a }); txt(g, 'VS', 660, 720, 40, '#c4403a', { stroke: false, alpha: a });
    txt(g, 'din corp', 340, 150, 20, B.dxL, { alpha: a }); txt(g, 'din plămâni', 660, 150, 20, B.oxL, { alpha: a });
    txt(g, 'spre plămâni', 200, 70, 22, B.dxL, { alpha: a }); txt(g, 'spre corp', 800, 70, 22, B.oxL, { alpha: a });
  }
}
// legenda de culori (oxigenat / neoxigenat / amestecat), jos-dreapta
export function bloodKey(g, x = 990, y = 905, mix = true) {
  const it = [[B.ox, 'oxigenat'], [B.dx, 'neoxigenat']]; if (mix) it.push([B.mx, 'amestecat']);
  let xx = x; for (let k = it.length - 1; k >= 0; k--) { const [c, s] = it[k]; g.save(); g.font = '700 17px Inter, sans-serif'; const w = g.measureText(s).width; g.restore(); xx -= w + 8; txt(g, s, xx, y, 17, C.cream, { align: 'left', w: 700 }); dot(g, xx - 16, y, 9, c, { ow: 3 }); xx -= 44; }
}
// „corpul” care arată dacă pacientul e cianotic (aorta duce sânge amestecat/neoxigenat)
export function bodyIcon(g, x, y, cyan, a = 1) {
  const col = cyan > 0.5 ? B.mx : '#f3b9a0';
  g.save(); g.globalAlpha = clamp(a);
  dot(g, x, y - 46, 24, col, { ow: 4 });
  const p = new Path2D(); p.roundRect(x - 30, y - 18, 60, 74, 22); paint(g, p, col, null, null, [x - 30, y - 18, 60, 74], OUT, 4);
  g.restore();
  txt(g, cyan > 0.5 ? 'cianoză' : 'fără cianoză', x, y + 82, 17, cyan > 0.5 ? '#d9b8ff' : '#ffd2c0', { alpha: a });
}
