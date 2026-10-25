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

/* ===================== LP 6 (SNC, simțuri, tegument) ===================== */
// Culorile foițelor, ca în LP: albastru = ectoderm, mov = neuroectoderm, verde = creasta neurală, roșu = mezoderm, galben = endoderm.
export const N = {
  ecto: '#5b9be8', ectoS: '#2f68bd', ectoL: '#cfe0ff',
  neuro: '#9a6ad6', neuroS: '#6f45b0', neuroL: '#e3d6ff', lumen: '#f3ecff',
  crest: '#3db06c', crestS: '#23824c', crestL: '#c9f0d8',
  meso: '#e0574f', mesoS: '#a92b27', meso2: '#f2a39b', noto: '#d9483f',
  endo: '#f4c34f', endoS: '#d19a22',
  men: '#f29bc0', csf: '#bfe6ff', bone: '#e6d2a8', boneS: '#c2a676',
  skin: '#f3c29b', skinS: '#d99b72', derm: '#f6c1c4', hypo: '#f6e3b4', pig: '#2b2230',
  // veziculele (culorile din figura LP-ului)
  pros: '#f08a6a', mes: '#a98ae6', rhomb: '#5b9be8', tel: '#f4c34f', di: '#f08a6a', met: '#3fb8a8', miel: '#5b9be8', cordG: '#b9a7c9',
  alar: '#9be3b0', basal: '#f7b9a2',
};
// Placa neurală care se rulează: f = 0 plată, f = 1 tub închis (marginile se ating dorsal, pe linia mediană).
// yb = punctul ventral (fundul șanțului), L = lățimea plăcii. Întoarce punctele de la marginea stângă la cea dreaptă.
export function foldPlate(f, cx, yb, L, n = 44) {
  const out = [];
  for (let k = 0; k <= n; k++) {
    const s = -1 + 2 * k / n;
    if (f < 0.002) { out.push([cx + s * L / 2, yb]); continue; }
    const R = L / (2 * Math.PI * f), ph = s * f * Math.PI;
    out.push([cx + R * Math.sin(ph), yb - R * (1 - Math.cos(ph))]);
  }
  return out;
}
// celulă de creastă (verde, cu nucleu)
export function crestCell(g, x, y, s = 1, a = 1) { dot(g, x, y, 9 * s, N.crest, { alpha: a, ow: 2.5 }); dot(g, x + 1.5 * s, y - 1 * s, 3.6 * s, N.crestS, { alpha: a, ow: 0 }); }
// melanocit = celulă stelată verde (din creasta neurală)
export function melano(g, x, y, s = 1, a = 1) {
  g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round';
  for (let k = 0; k < 5; k++) { const an = k / 5 * Math.PI * 2 - 0.4; g.strokeStyle = OUT; g.lineWidth = 7 * s; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(an) * 20 * s, y + Math.sin(an) * 20 * s); g.stroke(); g.strokeStyle = N.crest; g.lineWidth = 3.5 * s; g.stroke(); }
  g.restore(); dot(g, x, y, 8 * s, N.crest, { alpha: a, ow: 2.5 }); dot(g, x, y, 3.5 * s, '#5a3a20', { alpha: a, ow: 0 });
}
// eticheta-fotografie: poza + legenda + creditul (sub ea)
export function photoCap(g, n, x, y, w, h, cap, cr, a = 1) {
  photo(g, n, x, y, w, h, null, a);
  if (cap) txt(g, cap, x + w / 2, y + h + 24, 18, C.cream, { alpha: a, w: 700 });
  if (cr) txt(g, cr, x + w / 2, y + h + (cap ? 50 : 24), 14, '#c9b3a6', { alpha: a, w: 600 });
}
export const CR = 'Disciplina de Anatomie-Embriologie UMFST (LP)';
// amestec de culori hex (u = 0 → a, u = 1 → b)
export function mix(a, b, u) {
  const p = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)); const A = p(a), B = p(b); u = clamp(u);
  return '#' + A.map((v, i) => Math.round(lerp(v, B[i], u)).toString(16).padStart(2, '0')).join('');
}
// stadiul curent pe intro (buclă) sau pe punct; s ∈ [0, n]
export function stage(b, t, n, f = 0.7) { if (b.i < 0) { const cyc = n * 2.8 + 2; return REDUCED ? n : Math.min(n, (t % cyc) / 2.8); } return b.i + ease(clamp(b.bt / (b.bd * f))); }
