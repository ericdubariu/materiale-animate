// Kit cartoon 2D (contur gros): celule, fibre, vase, rețele. Culorile urmează colorațiile reale (HE, van Gieson, argentic).
export const OUT = '#2a1534';
export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ease = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };
export const back = (t) => { t = clamp(t); const c = 1.6; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
let SEED = 1;
export const srand = (s) => { SEED = s; };
export const rnd = () => { SEED = (SEED * 16807) % 2147483647; return (SEED - 1) / 2147483646; };
export const rr = (a, b) => a + (b - a) * rnd();
export const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const wob = (t, k) => (REDUCED ? 0 : Math.sin(t * 1.5 + k));

export const HE = { col: '#f2a3c6', colL: '#ffd6e8', colS: '#df7dab', nuc: '#2c2490', nucS: '#1b1468', nucL: '#6b63c9', bg: '#fbe9f1', bg2: '#f4d6e4' };
export const VG = { col: '#e0223f', colL: '#ff8a9a', colS: '#a8122b', nuc: '#3a2216', nucS: '#22130b', nucL: '#7a5038', bg: '#f4e09a', bg2: '#ecd27a' };
export const AG = { fib: '#151017', bg: '#ecdcaa', bg2: '#dcc68a', cell: '#f6ead0', cellS: '#e2cfa4', cellL: '#fffaf0', nuc: '#8a7350' };

/* ---------- forme ---------- */
export function smooth(pts, closed = true) {
  const p = new Path2D(); const n = pts.length; if (!n) return p;
  const P = (i) => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  p.moveTo(P(0)[0], P(0)[1]);
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    p.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]);
  }
  if (closed) p.closePath();
  return p;
}
export function blobPts(cx, cy, rx, ry, rot = 0, t = 0, w = 0.04, n = 14, seed = 0) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + w * Math.sin(a * 3 + seed) + w * 0.6 * Math.sin(a * 5 + seed * 2) + 0.012 * wob(t, i * 1.3 + seed);
    const x = Math.cos(a) * rx * k, y = Math.sin(a) * ry * k;
    pts.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]);
  }
  return pts;
}
export const blob = (...a) => smooth(blobPts(...a));
export function spindle(cx, cy, len, w, rot = 0, t = 0, seed = 0) {
  const pts = []; const n = 20;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2; const c = Math.cos(a), s = Math.sin(a);
    const x = c * len / 2, y = s * w / 2 * (0.3 + 0.7 * Math.pow(1 - Math.abs(c), 0.55));
    const b = 0.012 * wob(t * 0.9, i + seed);
    pts.push([cx + (x * Math.cos(rot) - y * Math.sin(rot)) * (1 + b), cy + (x * Math.sin(rot) + y * Math.cos(rot)) * (1 + b)]);
  }
  return smooth(pts);
}
// celulă stelată (fibroblast): corp + prelungiri rotunjite
export function stellate(cx, cy, s, rot, t, arms) {
  const pts = []; const n = 72;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    let r = 110 + 8 * Math.sin(a * 3);
    for (const [aa, len] of arms) { const d = Math.atan2(Math.sin(a - aa), Math.cos(a - aa)); r += (len - 110) * Math.exp(-(d * d) / 0.045); }
    const x = Math.cos(a) * r, y = Math.sin(a) * r * 0.52; const b = 0.01 * wob(t, i * 0.4);
    const X = x * s * (1 + b), Y = y * s * (1 + b);
    pts.push([cx + X * Math.cos(rot) - Y * Math.sin(rot), cy + X * Math.sin(rot) + Y * Math.cos(rot)]);
  }
  return smooth(pts);
}
export function bb(cx, cy, rx, ry) { return [cx - rx, cy - ry, rx * 2, ry * 2]; }

// umplere + umbră plată + lumină + contur
export function paint(g, path, base, shade, light, box, out = OUT, ow = 6) {
  g.save();
  g.fillStyle = base; g.fill(path);
  g.save(); g.clip(path);
  const [x, y, w, h] = box;
  if (shade) { g.fillStyle = shade; g.beginPath(); g.ellipse(x + w * 0.62, y + h * 1.06, w * 0.78, h * 0.6, 0, 0, 7); g.fill(); }
  if (light) { g.globalAlpha = 0.6; g.fillStyle = light; g.beginPath(); g.ellipse(x + w * 0.3, y + h * 0.26, w * 0.2, h * 0.12, -0.3, 0, 7); g.fill(); }
  g.restore();
  if (ow > 0) { g.lineJoin = 'round'; g.strokeStyle = out; g.lineWidth = ow; g.stroke(path); }
  g.restore();
}
export function glowRing(g, x, y, rx, ry, rot, p, color = '#ffe36e', w = 6) {
  if (p <= 0) return;
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.setLineDash([20, 13]); g.lineDashOffset = REDUCED ? 0 : -performance.now() / 40;
  g.shadowColor = color; g.shadowBlur = 14; g.beginPath(); g.ellipse(x, y, rx, ry, rot, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(p)); g.stroke(); g.restore();
}

/* ---------- celule (HE, dacă nu se spune altfel) ---------- */
export function fibroblast(g, x, y, s = 1, rot = 0, t = 0, o = {}) {
  const arms = o.arms || [[-0.12, 270], [0.32, 225], [Math.PI + 0.16, 260], [Math.PI - 0.34, 205]];
  paint(g, stellate(x, y, s, rot, t, arms), '#cdbcf1', '#a891e3', '#f1eaff', bb(x, y, 280 * s, 70 * s));
  // nucleu mare, ovalar, palid (eucromatină) cu nucleol proeminent
  const nu = blob(x, y, 86 * s, 46 * s, rot - 0.05, t, 0.03, 16, 3);
  paint(g, nu, '#ece6ff', '#d8cff8', '#ffffff', bb(x, y, 86 * s, 46 * s), '#6a50c4', 4 * Math.max(0.6, s));
  g.save(); g.fillStyle = '#9d8fe6';
  for (let i = 0; i < 22; i++) { const a = i * 2.4, r = Math.sqrt((i % 9 + 1) / 10); const px = Math.cos(a) * 66 * s * r, py = Math.sin(a) * 32 * s * r; g.beginPath(); g.arc(x + px * Math.cos(rot) - py * Math.sin(rot), y + px * Math.sin(rot) + py * Math.cos(rot), 4.2 * s, 0, 7); g.fill(); }
  g.restore();
  const nx = x - 8 * s * Math.cos(rot), ny = y - 8 * s * Math.sin(rot) + 2 * s;
  paint(g, blob(nx, ny, 15 * s, 15 * s, 0, t, 0.02, 10, 9), '#2a1670', '#170b4a', '#6a52d0', bb(nx, ny, 15 * s, 15 * s), OUT, 3 * Math.max(0.6, s));
  return { nucleus: [x, y], nucleolus: [nx, ny] };
}
export function fibrocyte(g, x, y, s = 1, rot = 0, t = 0, o = {}) {
  const len = (o.len || 470) * s;
  paint(g, spindle(x, y, len, 54 * s, rot, t, 2), o.cyto || '#f6b6d2', o.cytoS || '#e48bb3', '#ffe2ee', bb(x, y, len / 2, 27 * s), OUT, 6 * Math.max(0.5, s));
  paint(g, spindle(x, y, 150 * s, 30 * s, rot, t, 5), o.nuc || '#2a1d78', o.nucS || '#160d4c', o.nucL || '#5d50c4', bb(x, y, 75 * s, 15 * s), OUT, 4 * Math.max(0.5, s));
}
export function lymphocyte(g, x, y, s = 1, t = 0) {
  // nucleu rotund, hipercrom, care ocupă aproape toată celula; citoplasma = semilună
  paint(g, blob(x + 6 * s, y, 31 * s, 31 * s, 0, t, 0.02, 12, x), '#c9cdf7', '#9aa2e6', '#eef0ff', bb(x, y, 31 * s, 31 * s), OUT, 5 * Math.max(0.5, s));
  paint(g, blob(x + 1 * s, y, 23 * s, 23 * s, 0, t, 0.02, 12, y), HE.nuc, HE.nucS, HE.nucL, bb(x, y, 24 * s, 24 * s), OUT, 3 * Math.max(0.5, s));
}
export function plasmocyte(g, x, y, s = 1, rot = 0, t = 0) {
  // citoplasmă intens bazofilă, nucleu excentric cu cromatina „în spițe de roată”, zonă clară (Golgi) lângă nucleu
  paint(g, blob(x, y, 70 * s, 54 * s, rot, t, 0.03, 14, 4), '#5a4bd0', '#3f31a8', '#8c80f0', bb(x, y, 70 * s, 54 * s), OUT, 6 * Math.max(0.5, s));
  const nx = x - 28 * s * Math.cos(rot), ny = y - 28 * s * Math.sin(rot);
  const gx = x + 8 * s * Math.cos(rot), gy = y + 8 * s * Math.sin(rot);
  g.save(); g.fillStyle = 'rgba(236,232,255,.85)'; g.beginPath(); g.ellipse(gx, gy, 22 * s, 18 * s, rot, 0, 7); g.fill(); g.restore();
  paint(g, blob(nx, ny, 31 * s, 31 * s, 0, t, 0.02, 12, 7), '#c8c1f7', '#b0a7ef', '#ffffff', bb(nx, ny, 31 * s, 31 * s), OUT, 4 * Math.max(0.5, s));
  g.save(); g.fillStyle = '#1b1258';
  for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; g.beginPath(); g.ellipse(nx + Math.cos(a) * 21 * s, ny + Math.sin(a) * 21 * s, 6 * s, 4.5 * s, a, 0, 7); g.fill(); }
  g.beginPath(); g.arc(nx, ny, 6.5 * s, 0, 7); g.fill(); g.restore();
  return { nucleus: [nx, ny], golgi: [gx, gy] };
}
export function macrophage(g, x, y, s = 1, t = 0, o = {}) {
  // formă neregulată, citoplasmă palid eozinofilă; nucleu reniform; incluziuni = material fagocitat
  const pts = blobPts(x, y, 92 * s, 74 * s, o.rot || 0.2, t, 0.13, 16, o.seed || 11);
  if (o.pseudo) { // pseudopode spre (px,py)
    const [px, py, e] = o.pseudo;
    for (const p of pts) { const dx = px - p[0], dy = py - p[1]; const d = Math.hypot(dx, dy); const f = e * Math.max(0, 1 - d / (170 * s)) * 0.55; p[0] += dx * f; p[1] += dy * f; }
  }
  paint(g, smooth(pts), '#f7c6d9', '#eba2bf', '#fff0f6', bb(x, y, 92 * s, 74 * s), OUT, 6 * Math.max(0.5, s));
  if (o.nucleus !== false) {
    const nx = x - 30 * s, ny = y - 8 * s;
    g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 30 * s; g.beginPath(); g.arc(nx, ny, 26 * s, Math.PI * 0.45, Math.PI * 1.6); g.stroke();
    g.strokeStyle = '#4a3aa8'; g.lineWidth = 23 * s; g.stroke(); g.restore();
  }
  const inc = o.inc ?? 6; srand(o.seed || 11);
  for (let k = 0; k < inc; k++) { const ix = x + rr(5, 55) * s, iy = y + rr(-40, 40) * s; paint(g, blob(ix, iy, rr(7, 12) * s, rr(6, 10) * s, 0, t, 0.05, 8, k), k % 2 ? '#b7773f' : '#8a5432', null, null, bb(ix, iy, 10 * s, 8 * s), OUT, 2.5 * Math.max(0.5, s)); }
}
export function giant(g, x, y, s = 1, t = 0) {
  paint(g, blob(x, y, 170 * s, 120 * s, 0.1, t, 0.08, 18, 21), '#f3bcd3', '#e698b8', '#fff0f6', bb(x, y, 170 * s, 120 * s), OUT, 6 * Math.max(0.5, s));
  for (let k = 0; k < 11; k++) { const a = (k / 11) * Math.PI * 2; const nx = x + Math.cos(a) * 118 * s, ny = y + Math.sin(a) * 78 * s; paint(g, blob(nx, ny, 20 * s, 13 * s, a, t, 0.03, 10, k), HE.nuc, HE.nucS, HE.nucL, bb(nx, ny, 20 * s, 13 * s), OUT, 3 * Math.max(0.5, s)); }
}
export function adipocyte(g, x, y, r = 80, t = 0, o = {}) {
  // celulă mare, o vacuolă lipidică unică (goală, albă după prelucrare), nucleu turtit lipit de membrană
  const path = blob(x, y, r, r * 0.96, 0, t, 0.02, 16, x);
  g.save(); g.fillStyle = o.fill || '#ffffff'; g.fill(path); g.lineJoin = 'round'; g.strokeStyle = o.rim || '#e48bb3'; g.lineWidth = Math.max(5, r * 0.06); g.stroke(path); g.strokeStyle = OUT; g.lineWidth = 2.5; g.stroke(path); g.restore();
  const a = o.nucAngle ?? -Math.PI / 2; const nx = x + Math.cos(a) * r * 0.9, ny = y + Math.sin(a) * r * 0.9;
  paint(g, spindle(nx, ny, r * 0.62, r * 0.17, a + Math.PI / 2, t, 3), o.nuc || HE.nuc, o.nucS || HE.nucS, null, bb(nx, ny, r * 0.3, r * 0.1), OUT, 3);
  return [nx, ny];
}
export function rbc(g, x, y, s = 1, rot = 0, t = 0, color = '#e23a4f') {
  paint(g, blob(x, y, 24 * s, 16 * s, rot, t, 0.02, 12, x), color, '#b81f38', '#ff8a96', bb(x, y, 24 * s, 16 * s), OUT, 3.5 * Math.max(0.5, s));
  g.save(); g.globalAlpha = 0.75; g.fillStyle = '#f59aa6'; g.beginPath(); g.ellipse(x, y, 9 * s, 6 * s, rot, 0, 7); g.fill(); g.restore(); // paloare centrală
}
// capilar: tub cu perete roz pal, nuclei endoteliali turtiți, hematii care curg
export function capillary(g, pts, w, t, o = {}) {
  const N = 60; const P = []; const L = [0];
  const pp = smooth(pts, false); // doar pentru stroke
  // eșantionare pe curba Catmull-Rom
  const cr = (i, u) => { const n = pts.length; const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[Math.min(n - 1, i + 1)], p3 = pts[Math.min(n - 1, i + 2)]; const u2 = u * u, u3 = u2 * u; return [0, 1].map((d) => 0.5 * ((2 * p1[d]) + (-p0[d] + p2[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * u3)); };
  for (let k = 0; k <= N; k++) { const f = k / N * (pts.length - 1); const i = Math.min(pts.length - 2, Math.floor(f)); P.push(cr(i, f - i)); if (k) L.push(L[k - 1] + Math.hypot(P[k][0] - P[k - 1][0], P[k][1] - P[k - 1][1])); }
  const at = (u) => { const d = u * L[N]; let k = 1; while (k < N && L[k] < d) k++; const f = (d - L[k - 1]) / Math.max(1e-6, L[k] - L[k - 1]); return [lerp(P[k - 1][0], P[k][0], f), lerp(P[k - 1][1], P[k][1], f), Math.atan2(P[k][1] - P[k - 1][1], P[k][0] - P[k - 1][0])]; };
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  g.strokeStyle = OUT; g.lineWidth = w + 10; g.stroke(pp);
  g.strokeStyle = o.wall || '#f5b9cf'; g.lineWidth = w + 4; g.stroke(pp);
  g.strokeStyle = o.lumen || '#fff1f6'; g.lineWidth = w - 10; g.stroke(pp);
  g.restore();
  const nn = o.nuclei ?? 3;
  for (let k = 0; k < nn; k++) { const [x, y, a] = at((k + 0.5) / nn); const ox = Math.cos(a + Math.PI / 2) * (w / 2 - 2), oy = Math.sin(a + Math.PI / 2) * (w / 2 - 2); paint(g, spindle(x - ox, y - oy, 46, 11, a, t, k), HE.nuc, HE.nucS, null, bb(x, y, 23, 5), OUT, 2.5); }
  if (o.rbcs !== false) {
    const n = o.n || 8; const sp = o.speed ?? 0.04; const s = (w - 14) / 34;
    for (let k = 0; k < n; k++) { const u = ((k / n) + (REDUCED ? 0 : t * sp)) % 1; const [x, y, a] = at(u); rbc(g, x, y, Math.max(0.35, Math.min(1, s)), a + Math.sin(k * 3 + t) * 0.4, t); }
  }
  return at;
}
// fascicul de colagen: fire paralele, ondulate împreună
export function bundle(g, pts, width, o = {}) {
  const C = o.c || HE; const n = o.n || 4; const prog = o.prog ?? 1;
  const path = (off) => { const q = pts.map((p, i) => { const a = i < pts.length - 1 ? Math.atan2(pts[i + 1][1] - p[1], pts[i + 1][0] - p[0]) : Math.atan2(p[1] - pts[i - 1][1], p[0] - pts[i - 1][0]); return [p[0] + Math.cos(a + Math.PI / 2) * off, p[1] + Math.sin(a + Math.PI / 2) * off]; }); return smooth(q, false); };
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  if (prog < 1) g.setLineDash([3000 * prog, 6000]);
  const full = path(0);
  g.strokeStyle = OUT; g.lineWidth = width + 9; g.stroke(full);
  g.strokeStyle = C.col; g.lineWidth = width; g.stroke(full);
  // fibrele din fascicul: linii fine mai deschise
  for (let k = 0; k < n; k++) { const off = (k / Math.max(1, n - 1) - 0.5) * width * 0.62; g.strokeStyle = k % 2 ? C.colL : C.colS; g.globalAlpha = 0.55; g.lineWidth = Math.max(2, width * 0.09); g.stroke(path(off)); }
  g.restore();
}
export function wavy(x0, y0, x1, y1, amp = 14, waves = 3, ph = 0, n = 16) {
  const pts = []; for (let i = 0; i <= n; i++) { const u = i / n; const x = lerp(x0, x1, u), y = lerp(y0, y1, u); const a = Math.atan2(y1 - y0, x1 - x0) + Math.PI / 2; const off = Math.sin(u * Math.PI * 2 * waves + ph) * amp; pts.push([x + Math.cos(a) * off, y + Math.sin(a) * off]); }
  return pts;
}
// rețea: noduri + muchii (ramificare, anastomoze)
export function makeNet(nodes, k = 3, maxD = 120) {
  const edges = []; const seen = new Set();
  nodes.forEach((p, i) => {
    nodes.map((q, j) => [Math.hypot(p[0] - q[0], p[1] - q[1]), j]).filter((x) => x[1] !== i && x[0] < maxD && x[0] > 4).sort((a, b) => a[0] - b[0]).slice(0, k).forEach(([, j]) => {
      const key = i < j ? i + '-' + j : j + '-' + i; if (seen.has(key)) return; seen.add(key);
      const q = nodes[j]; const m = [(p[0] + q[0]) / 2 + rr(-10, 10), (p[1] + q[1]) / 2 + rr(-10, 10)];
      edges.push([i, j, p, m, q]);
    });
  });
  return edges;
}
export function drawNet(g, edges, color, w, prog = 1, out = null) {
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  const n = Math.floor(edges.length * clamp(prog));
  const p = new Path2D(); for (let k = 0; k < n; k++) { const [, , a, m, b] = edges[k]; p.moveTo(a[0], a[1]); p.quadraticCurveTo(m[0], m[1], b[0], b[1]); }
  if (out) { g.strokeStyle = out; g.lineWidth = w + 3; g.stroke(p); }
  g.strokeStyle = color; g.lineWidth = w; g.stroke(p);
  g.restore();
}
export const qpt = (e, u) => { const [, , a, m, b] = e; const v = 1 - u; return [v * v * a[0] + 2 * v * u * m[0] + u * u * b[0], v * v * a[1] + 2 * v * u * m[1] + u * u * b[1]]; };
// tub renal în secțiune transversală: inel de celule cubice + lumen
export function tubule(g, x, y, r, o = {}) {
  const n = Math.max(7, Math.round(r / 11));
  g.save();
  g.fillStyle = o.cell || AG.cell; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
  g.fillStyle = o.lumen || '#fffdf6'; g.beginPath(); g.arc(x, y, r * 0.38, 0, 7); g.fill();
  g.strokeStyle = o.line || '#b9a274'; g.lineWidth = 2;
  for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; g.beginPath(); g.moveTo(x + Math.cos(a) * r * 0.38, y + Math.sin(a) * r * 0.38); g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); g.stroke(); }
  g.fillStyle = o.nuc || AG.nuc; for (let k = 0; k < n; k++) { const a = (k + 0.5) / n * Math.PI * 2; g.beginPath(); g.arc(x + Math.cos(a) * r * 0.72, y + Math.sin(a) * r * 0.72, Math.max(3, r * 0.07), 0, 7); g.fill(); }
  g.restore();
}
// cadru de microscop rotund (pentru câmpuri)
export function field(g, x, y, r, drawInside, ring = '#ffffff') {
  g.save(); g.beginPath(); g.arc(x, y, r, 0, 7); g.save(); g.clip(); drawInside(); g.restore();
  g.lineWidth = 10; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 4; g.strokeStyle = ring; g.globalAlpha = 0.35; g.stroke(); g.restore();
}
export function roundRect(g, x, y, w, h, r) { g.beginPath(); g.roundRect(x, y, w, h, r); }
export function antibody(g, x, y, s, rot, color = '#ffe08a') {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.lineCap = 'round';
  const Y = () => { g.beginPath(); g.moveTo(0, 14); g.lineTo(0, 0); g.lineTo(-10, -12); g.moveTo(0, 0); g.lineTo(10, -12); };
  g.strokeStyle = OUT; g.lineWidth = 9; Y(); g.stroke(); g.strokeStyle = color; g.lineWidth = 5; Y(); g.stroke(); g.restore();
}
export function arrow(g, x0, y0, x1, y1, color = '#ffffff', w = 8) {
  const a = Math.atan2(y1 - y0, x1 - x0);
  g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = w + 6; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
  g.strokeStyle = color; g.lineWidth = w; g.stroke();
  g.fillStyle = color; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(x1 + Math.cos(a) * 22, y1 + Math.sin(a) * 22); g.lineTo(x1 + Math.cos(a + 2.4) * 22, y1 + Math.sin(a + 2.4) * 22); g.lineTo(x1 + Math.cos(a - 2.4) * 22, y1 + Math.sin(a - 2.4) * 22); g.closePath(); g.stroke(); g.fill(); g.restore();
}
