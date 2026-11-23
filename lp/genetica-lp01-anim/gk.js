// Kit genetică (LP 1): cromozomi cartoon cu contur gros, celule, fus de diviziune, text cu contur.
import { OUT, clamp, lerp, ease, paint, glowRing, arrow, REDUCED } from './kit2d.js';
export { OUT, clamp, lerp, ease, REDUCED };

export const W = 1000, H = 934;
export const cam = (x, y, z) => ({ x, y, z });
export const HOME = cam(500, 467, 1);
export const lbl = (at, html, o = {}) => ({ at, html, ...o });

export const C = {
  mat: '#f0688c', matS: '#c2416a',   // cromozom de origine maternă
  pat: '#58a6f2', patS: '#2f78c6',   // cromozom de origine paternă
  chr: '#f4c34f', chrS: '#cf9a22',   // cromozom „neutru”
  cen: '#fff3e6', tel: '#ff8a3d', sat: '#b99cf5',
  fib: '#bfe8cc', mem: '#7fd6a0', cyto: 'rgba(127,214,160,.10)',
  nuc: 'rgba(180,160,235,.16)', nucS: '#b4a0eb', nucleol: '#8f78d8',
  cream: '#f1fff5', dim: '#7f9a89', hi: '#ffe36e', key: '#ff6b5e', ok: '#7fe0a0', bad: '#ff7c90',
  x: '#f0688c', y: '#58a6f2', stem: '#cfd8d2', diff: '#f4c34f',
};

export function bg(g) { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#1b2f24'); gr.addColorStop(1, '#0a130e'); g.fillStyle = gr; g.fillRect(-3000, -3000, 7000, 7000); }
export function panel(g, x, y, w, h, o = {}) { g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); g.fillStyle = o.fill || 'rgba(230,255,240,.05)'; g.strokeStyle = o.stroke || 'rgba(200,255,225,.16)'; g.lineWidth = o.lw || 3; g.beginPath(); g.roundRect(x, y, w, h, o.r || 26); g.fill(); g.stroke(); g.restore(); }

// progresul etapei k: înainte = 0, pe punct = animat, după = 1; pe intro (i<0) totul e gata
export function st(b, k, f = 0.65) { if (b.i < 0) return 1; if (b.i > k) return 1; if (b.i < k) return 0; return ease(clamp(b.bt / (b.bd * f))); }
export const on = (b, k) => b.i === k;
export const loopT = (t, p) => (REDUCED ? 0.999 : (t % p) / p);

export function txt(g, s, x, y, size = 24, col = C.cream, o = {}) {
  g.save(); g.font = `${o.w || 800} ${size}px Inter, "Segoe UI", sans-serif`; g.textAlign = o.align || 'center'; g.textBaseline = 'middle';
  if (o.alpha !== undefined) g.globalAlpha *= clamp(o.alpha);
  const L = String(s).split('\n');
  L.forEach((ln, i) => { const yy = y + (i - (L.length - 1) / 2) * size * 1.2; if (o.stroke !== false) { g.lineJoin = 'round'; g.strokeStyle = o.sc || OUT; g.lineWidth = size * 0.28; g.strokeText(ln, x, yy); } g.fillStyle = col; g.fillText(ln, x, yy); });
  g.restore();
}
export function pill(g, x, y, w, h, fill, label, o = {}) {
  const p = new Path2D(); p.roundRect(x - w / 2, y - h / 2, w, h, o.r ?? 18);
  g.save(); if (o.alpha !== undefined) g.globalAlpha *= clamp(o.alpha);
  paint(g, p, fill, o.shade || null, null, [x - w / 2, y - h / 2, w, h], OUT, o.ow ?? 5);
  if (o.glow) { g.shadowColor = C.hi; g.shadowBlur = 24 * o.glow; g.strokeStyle = C.hi; g.lineWidth = 4; g.stroke(p); g.shadowBlur = 0; }
  if (label) txt(g, label, x, y, o.size || 21, o.col || OUT, { stroke: false, w: o.w || 800 });
  g.restore();
}
export function dot(g, x, y, r, col, o = {}) { g.save(); if (o.alpha !== undefined) g.globalAlpha *= clamp(o.alpha); g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = o.ow ?? 3; g.beginPath(); g.arc(x, y, Math.max(0.5, r), 0, 7); g.fill(); if ((o.ow ?? 3) > 0) g.stroke(); g.restore(); }
export function ell(g, x, y, rx, ry, fill, o = {}) { rx = Math.max(0.5, rx); ry = Math.max(0.5, ry); g.save(); if (o.alpha !== undefined) g.globalAlpha *= clamp(o.alpha); g.beginPath(); g.ellipse(x, y, rx, ry, o.rot || 0, 0, Math.PI * 2); if (fill) { g.fillStyle = fill; g.fill(); } if (o.dash) g.setLineDash(o.dash); if ((o.ow ?? 5) > 0) { if (o.out !== false) { g.strokeStyle = OUT; g.lineWidth = (o.ow ?? 5) + 4; g.stroke(); } g.strokeStyle = o.stroke || OUT; g.lineWidth = o.ow ?? 5; g.stroke(); } g.restore(); }
export function arr(g, x0, y0, x1, y1, col = '#fff', w = 7, a = 1) { if (a <= 0.01) return; g.save(); g.globalAlpha *= clamp(a); arrow(g, x0, y0, x1, y1, col, w); g.restore(); }
export function ring(g, x, y, rx, ry, p, rot = 0) { glowRing(g, x, y, rx, ry, rot, p); }
export function lead(g, x0, y0, x1, y1, a = 1) { g.save(); g.globalAlpha *= clamp(a) * 0.8; g.strokeStyle = '#eafff1'; g.lineWidth = 2.5; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); }

// linie groasă cu contur (braț de cromozom)
export function line(g, pts, w, col, noOut = false) {
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  const P = () => { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); };
  if (!noOut) { g.strokeStyle = OUT; g.lineWidth = w + Math.max(5, w * 0.32); P(); g.stroke(); }
  g.strokeStyle = col; g.lineWidth = w; P(); g.stroke();
  g.restore();
}
const gloss = (g, pts, w) => { g.save(); g.lineCap = 'round'; g.strokeStyle = 'rgba(255,255,255,.30)'; g.lineWidth = Math.max(1.5, w * 0.2); g.beginPath(); g.moveTo(pts[0][0] - w * 0.2, pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0] - w * 0.2, pts[i][1]); g.stroke(); g.restore(); };

// Cromozom: centromerul în (x, y), brațul scurt p în sus, brațul lung q în jos.
// bi = bicromatidic (formă de X), altfel o singură cromatidă. tipL/tipR = culoarea segmentului distal al brațului q (recombinare).
export function chrom(g, x, y, o = {}) {
  const { p = 40, q = 80, w = 16, rot = 0, col = C.chr, bi = true, open = 0.24, sat = false, alpha = 1, s = 1, tipL = null, tipR = null, tel = false, cen = true, sec = 0, cenCol = C.cen } = o;
  if (alpha <= 0.01) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.globalAlpha *= clamp(alpha);
  const gap = bi ? w * 0.52 : 0;
  for (const sd of (bi ? [-1, 1] : [0])) {
    const top = [sd * (gap + open * p), -p], mid = [sd * gap, 0], bot = [sd * (gap + open * q), q];
    if (sat) { const sx = top[0] + sd * w * 0.25, sy = top[1] - w * 1.25; line(g, [top, [sx, sy]], w * 0.3, col); dot(g, sx, sy, w * 0.52, C.sat, { ow: Math.max(3, w * 0.16) }); }
    line(g, [top, mid, bot], w, col);
    if (sec) { const u = sec; const a = [lerp(mid[0], bot[0], u - 0.07), lerp(mid[1], bot[1], u - 0.07)], c = [lerp(mid[0], bot[0], u + 0.07), lerp(mid[1], bot[1], u + 0.07)]; line(g, [a, c], w * 0.5, '#fff7d6', true); }
    const tip = sd < 0 ? tipL : tipR;
    if (tip) { const a = [lerp(mid[0], bot[0], 0.58), lerp(mid[1], bot[1], 0.58)]; line(g, [a, bot], w, tip, true); }
    gloss(g, [top, mid, bot], w);
    if (tel) { for (const e of [top, bot]) dot(g, e[0], e[1], w * 0.56, C.tel, { ow: Math.max(3, w * 0.14) }); }
  }
  if (cen) { g.fillStyle = cenCol; g.strokeStyle = OUT; g.lineWidth = Math.max(3, w * 0.2); g.beginPath(); g.ellipse(0, 0, gap + w * 0.62, w * 0.42, 0, 0, 7); g.fill(); g.stroke(); }
  g.restore();
}
// cromozom monocromatidic în anafază: centromerul în frunte (spre pol), brațele rămân în urmă
export function vchrom(g, x, y, dir, o = {}) {
  const { p = 30, q = 60, w = 14, col = C.chr, alpha = 1, tip = null, bend = 1 } = o;
  if (alpha <= 0.01) return;
  g.save(); g.translate(x, y); g.globalAlpha *= clamp(alpha);
  const bx = -dir * bend;
  const top = [bx * p * 0.75, -p * 0.75], bot = [bx * q * 0.75, q * 0.75];
  line(g, [top, [0, 0], bot], w, col);
  if (tip) { const a = [lerp(0, bot[0], 0.55), lerp(0, bot[1], 0.55)]; line(g, [a, bot], w, tip, true); }
  dot(g, 0, 0, w * 0.42, C.cen, { ow: Math.max(2.5, w * 0.2) });
  g.restore();
}
export function cell(g, x, y, rx, ry, o = {}) { ell(g, x, y, rx, ry, o.fill || C.cyto, { stroke: o.stroke || C.mem, ow: o.ow ?? 5, alpha: o.alpha, dash: o.dash }); }
export function nucleus(g, x, y, rx, ry, a = 1, dashed = false) { if (a <= 0.01) return; ell(g, x, y, rx, ry, C.nuc, { stroke: C.nucS, ow: 4, alpha: a, dash: dashed ? [14, 12] : null, out: false }); }
// cromatină despiralizată: fire ondulate, deterministe
export function chromatin(g, x, y, r, a = 1, col = '#d9c9ff', n = 7, seed = 1) {
  if (a <= 0.01) return;
  g.save(); g.globalAlpha *= clamp(a) * 0.85; g.strokeStyle = col; g.lineWidth = 3.2; g.lineCap = 'round';
  for (let k = 0; k < n; k++) { const a0 = k * 2.4 + seed, rr = r * (0.25 + 0.55 * ((k * 37 + seed * 11) % 10) / 10); const cx = x + Math.cos(a0) * rr, cy = y + Math.sin(a0) * rr * 0.9; g.beginPath(); for (let j = 0; j <= 10; j++) { const u = j / 10; const px = cx + (u - 0.5) * r * 0.55 * Math.cos(a0 + 1.2), py = cy + (u - 0.5) * r * 0.55 * Math.sin(a0 + 1.2) + Math.sin(u * 9 + k) * r * 0.07; j ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); }
  g.restore();
}
// fusul de diviziune între doi poli + centriolii
export function spindle(g, ax, ay, bx, by, o = {}) {
  const { n = 4, bulge = 46, alpha = 1, cent = true } = o;
  if (alpha <= 0.01) return;
  g.save(); g.globalAlpha *= clamp(alpha);
  const mx = (ax + bx) / 2, my = (ay + by) / 2, dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  g.strokeStyle = C.fib; g.lineWidth = 2.6; g.globalAlpha *= 0.6;
  for (let k = -n; k <= n; k++) { g.beginPath(); g.moveTo(ax, ay); g.quadraticCurveTo(mx + nx * k * bulge, my + ny * k * bulge, bx, by); g.stroke(); }
  g.restore();
  if (cent) { for (const [x, y] of [[ax, ay], [bx, by]]) centriole(g, x, y, alpha); }
}
export function centriole(g, x, y, a = 1) { g.save(); g.globalAlpha *= clamp(a); g.fillStyle = C.hi; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.roundRect(x - 9, y - 5, 18, 10, 4); g.fill(); g.stroke(); g.beginPath(); g.roundRect(x - 4, y - 12, 8, 9, 3); g.fill(); g.stroke(); g.restore(); }
// spermatozoid simplu: capul în (x, y), coada ondulează în spate
export function sperm(g, x, y, ang, t, col = '#eafff1', s = 1, a = 1) {
  if (a <= 0.01) return;
  g.save(); g.translate(x, y); g.rotate(ang); g.scale(s, s); g.globalAlpha *= clamp(a);
  g.strokeStyle = OUT; g.lineWidth = 8; g.lineCap = 'round';
  const tail = () => { g.beginPath(); g.moveTo(-14, 0); for (let j = 1; j <= 12; j++) { const u = j / 12; g.lineTo(-14 - u * 70, Math.sin(u * 7 - (REDUCED ? 0 : t * 9)) * 9 * u); } };
  tail(); g.stroke(); g.strokeStyle = col; g.lineWidth = 4; tail(); g.stroke();
  g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.ellipse(0, 0, 17, 11, 0, 0, 7); g.fill(); g.stroke();
  g.restore();
}
export function mix(a, b, u) {
  const pa = [1, 3, 5].map((k) => parseInt(a.slice(k, k + 2), 16)), pb = [1, 3, 5].map((k) => parseInt(b.slice(k, k + 2), 16));
  return '#' + pa.map((v, k) => Math.round(lerp(v, pb[k], clamp(u))).toString(16).padStart(2, '0')).join('');
}
// valoarea etapei pentru o scenă „mașină de stări”: stg = [[de la, până la], …] pe puncte; pe intro rulează tot intervalul în buclă
export function stage(b, t, stg, loop = 9) {
  if (b.i < 0) { const a = stg[0][0], z = stg[stg.length - 1][1]; if (REDUCED) return z; const u = (t % (loop + 1.5)) / loop; return lerp(a, z, clamp(u)); }
  const s = stg[Math.min(b.i, stg.length - 1)]; return lerp(s[0], s[1], ease(clamp(b.bt / (b.bd * 0.75))));
}
