// Câmpurile cartoon ale celor 12 lame (LP 2–5): epiteliile de acoperire + glandele.
// Fiecare câmp = lume 1000×934; geometria se calculează o singură dată (make*), apoi draw(g, t, st) la fiecare cadru.
import { OUT, HE, clamp, lerp, ease, srand, rnd, rr, smooth, blob, spindle, paint, bb, capillary, rbc, REDUCED } from './kit2d.js';

export const W = 1000, H = 934;
const TAU = Math.PI * 2;
const wob = (t, k) => (REDUCED ? 0 : Math.sin(t + k));

/* ---------------- unelte geometrice ---------------- */
export function bgFill(g, a, b, w = W, h = H) { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(-3000, -3000, w + 6000, h + 6000); }
function bbox(pts) { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; for (const [x, y] of pts) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); } return [x0, y0, x1 - x0, y1 - y0]; }
// poligon cu colțuri rotunjite
export function rpoly(pts, r = 7) {
  const p = new Path2D(); const n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[(i - 1 + n) % n], b = pts[i], c = pts[(i + 1) % n];
    const d1 = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, d2 = Math.hypot(c[0] - b[0], c[1] - b[1]) || 1; const q = Math.min(r, d1 / 2, d2 / 2);
    const p1 = [b[0] + (a[0] - b[0]) * q / d1, b[1] + (a[1] - b[1]) * q / d1], p2 = [b[0] + (c[0] - b[0]) * q / d2, b[1] + (c[1] - b[1]) * q / d2];
    if (i === 0) p.moveTo(p1[0], p1[1]); else p.lineTo(p1[0], p1[1]);
    p.quadraticCurveTo(b[0], b[1], p2[0], p2[1]);
  }
  p.closePath(); return p;
}
export function cellP(g, pts, fill, shade, light, ow = 4, r = 7, out = OUT) { paint(g, rpoly(pts, r), fill, shade, light, bbox(pts), out, ow); }
// Catmull-Rom eșantionat dens
export function crSample(pts, per = 14, closed = false) {
  const n = pts.length; const P = (i) => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))]; const out = [];
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) { const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2); for (let k = 0; k < per; k++) { const u = k / per, u2 = u * u, u3 = u2 * u; out.push([0, 1].map((d) => 0.5 * (2 * p1[d] + (-p0[d] + p2[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * u3))); } }
  if (!closed) out.push(pts[n - 1]);
  return out;
}
export function resample(pts, n, closed = false) {
  const P = closed ? [...pts, pts[0]] : pts; const L = [0];
  for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  const tot = L[L.length - 1]; const m = closed ? n : n - 1; const out = []; let j = 1;
  for (let k = 0; k < n; k++) { const d = tot * k / m; while (j < P.length - 1 && L[j] < d) j++; const f = (d - L[j - 1]) / Math.max(1e-6, L[j] - L[j - 1]); out.push([lerp(P[j - 1][0], P[j][0], f), lerp(P[j - 1][1], P[j][1], f)]); }
  return out;
}
const plen = (pts) => { let s = 0; for (let i = 1; i < pts.length; i++) s += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return s; };
const ellPts = (cx, cy, rx, ry, n = 120, rot = 0) => Array.from({ length: n }, (_, i) => { const a = i / n * TAU; const x = Math.cos(a) * rx, y = Math.sin(a) * ry; return [cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]; });
// un rând de celule pe o curbă (membrana bazală): side = partea lumenului
export function sheet(B, closed, hFn, side = 1) {
  const m = B.length; const N = [];
  for (let i = 0; i < m; i++) { const a = B[closed ? (i - 1 + m) % m : Math.max(0, i - 1)], c = B[closed ? (i + 1) % m : Math.min(m - 1, i + 1)]; const tx = c[0] - a[0], ty = c[1] - a[1]; const l = Math.hypot(tx, ty) || 1; N.push([-ty / l * side, tx / l * side]); }
  const n = closed ? m : m - 1; const cells = [];
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % m; const hi = hFn(i), hj = hFn(j);
    const pts = [B[i], B[j], [B[j][0] + N[j][0] * hj, B[j][1] + N[j][1] * hj], [B[i][0] + N[i][0] * hi, B[i][1] + N[i][1] * hi]];
    const mx = (B[i][0] + B[j][0]) / 2, my = (B[i][1] + B[j][1]) / 2; let nx = N[i][0] + N[j][0], ny = N[i][1] + N[j][1]; const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
    const hc = (hi + hj) / 2, w = Math.hypot(B[j][0] - B[i][0], B[j][1] - B[i][1]);
    cells.push({ i, pts, m: [mx, my], n: [nx, ny], h: hc, w, ang: Math.atan2(B[j][1] - B[i][1], B[j][0] - B[i][0]), at: (f, s = 0) => [mx + nx * hc * f + Math.cos(Math.atan2(B[j][1] - B[i][1], B[j][0] - B[i][0])) * s, my + ny * hc * f + Math.sin(Math.atan2(B[j][1] - B[i][1], B[j][0] - B[i][0])) * s] });
  }
  return cells;
}

/* ---------------- nuclei (cu nucleol unde e eucrom/palid) ---------------- */
const NK = { eu: ['#5b52c0', '#3d3499', '#9890e6'], hyper: [HE.nuc, HE.nucS, HE.nucL], hypo: ['#aaa2ee', '#8c82de', '#e2deff'], pyk: ['#1a1150', '#0f0936', null], pale: ['#d9d2fb', '#c3b9f4', '#ffffff'] };
export function nuc(g, x, y, rx, ry, rot = 0, kind = 'eu', t = 0, nucleolus = true) {
  const k = NK[kind] || NK.eu; const ow = Math.max(1.5, Math.min(3.2, Math.min(rx, ry) * 0.3));
  paint(g, blob(x, y, rx, ry, rot, t, 0.025, 12, x * 0.01 + y), k[0], k[1], k[2], bb(x, y, rx, ry), kind === 'pale' ? '#6a50c4' : OUT, ow);
  if ((kind === 'eu' || kind === 'hypo' || kind === 'pale') && Math.min(rx, ry) > 5) {
    g.save(); g.fillStyle = kind === 'eu' ? '#3a3192' : '#9b8fe6';
    for (let i = 0; i < 6; i++) { const a = i * 2.4 + x, r = Math.sqrt((i % 3 + 1) / 4) * 0.62; const px = Math.cos(a) * rx * r, py = Math.sin(a) * ry * r; g.beginPath(); g.arc(x + px * Math.cos(rot) - py * Math.sin(rot), y + px * Math.sin(rot) + py * Math.cos(rot), Math.max(1.2, Math.min(rx, ry) * 0.12), 0, 7); g.fill(); }
    if (nucleolus) { const r = Math.max(2, Math.min(rx, ry) * 0.27); g.fillStyle = '#1d1460'; g.beginPath(); g.arc(x + rx * 0.12, y - ry * 0.1, r, 0, 7); g.fill(); }
    g.restore();
  }
}
const rot2 = (c) => c.ang; // unghiul tangent al celulei

/* =========================================================== 1 · SIMPLU PAVIMENTOS (argentic, etalat, de sus) */
function makePav() {
  srand(11); const R = 82; const V = new Map(); const key = (x, y) => Math.round(x) + ',' + Math.round(y);
  const vert = (x, y) => { const k = key(x, y); if (!V.has(k)) V.set(k, [x + rr(-17, 17), y + rr(-17, 17)]); return V.get(k); };
  const cells = []; const E = new Map();
  for (let r = -1; r < 9; r++) for (let c = -1; c < 8; c++) {
    const cx = c * R * 1.732 + (((r % 2) + 2) % 2 ? R * 0.866 : 0) + 30, cy = r * R * 1.5 + 40; const ks = [];
    for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; vert(x, y); ks.push(key(x, y)); }
    const pts = ks.map((k) => V.get(k));
    cells.push({ c: [pts.reduce((s, p) => s + p[0], 0) / 6, pts.reduce((s, p) => s + p[1], 0) / 6], pts, tone: rr(0, 1) });
    for (let k = 0; k < 6; k++) { const a = ks[k], b = ks[(k + 1) % 6]; const ek = a < b ? a + '|' + b : b + '|' + a; if (!E.has(ek)) E.set(ek, [V.get(a), V.get(b)]); }
  }
  // limita crenelată: zigzag fin perpendicular pe muchie
  const edges = [...E.values()].map(([p, q]) => { const n = 12; const dx = q[0] - p[0], dy = q[1] - p[1]; const l = Math.hypot(dx, dy) || 1; const nx = -dy / l, ny = dx / l; const pts = []; for (let i = 0; i <= n; i++) { const u = i / n; const o = i === 0 || i === n ? 0 : (i % 2 ? 1 : -1) * rr(2.5, 4.5); pts.push([p[0] + dx * u + nx * o, p[1] + dy * u + ny * o]); } return { pts, d: rr(0, 0.55), mid: [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2] }; });
  const dots = Array.from({ length: 900 }, () => [rr(-20, 1020), rr(-20, 960), rr(0.8, 2.2)]);
  const juncs = [...V.values()].filter(() => rnd() < 0.35);
  const near = (arr, f, x, y) => arr.reduce((b, o) => (Math.hypot(f(o)[0] - x, f(o)[1] - y) < Math.hypot(f(b)[0] - x, f(b)[1] - y) ? o : b));
  const cHi = near(cells, (o) => o.c, 470, 400), eHi = near(edges, (o) => o.mid, 640, 300);
  const ag = Array.from({ length: 46 }, () => ({ e: edges[Math.floor(rnd() * edges.length)], u: rnd(), ph: rnd(), x0: rr(0, 1000) }));
  return {
    A: { cell: cHi.c, edge: eHi.mid, inside: [cHi.c[0], cHi.c[1]] }, cHi, eHi,
    draw(g, t, st = {}) {
      bgFill(g, '#f3e2c4', '#ecd5ae');
      for (const c of cells) { g.fillStyle = c.tone < 0.5 ? '#f6e7cd' : '#efd2a6'; g.fill(rpoly(c.pts, 3)); }
      if (st.hiCell) { g.save(); g.globalAlpha = 0.35; g.fillStyle = '#fff6a8'; g.fill(rpoly(cHi.pts, 3)); g.restore(); }
      g.save(); g.fillStyle = 'rgba(150,92,40,.22)'; for (const [x, y, r] of dots) { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); } g.restore();
      const prog = st.prog ?? 1;
      g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
      for (const e of edges) {
        const lp = clamp((prog - e.d) / 0.45); if (lp <= 0) continue;
        const m = Math.max(1, Math.round(lp * (e.pts.length - 1)));
        const p = new Path2D(); p.moveTo(e.pts[0][0], e.pts[0][1]); for (let i = 1; i <= m; i++) p.lineTo(e.pts[i][0], e.pts[i][1]);
        g.strokeStyle = 'rgba(70,40,30,.35)'; g.lineWidth = 8; g.stroke(p);
        g.strokeStyle = '#24161a'; g.lineWidth = 4.2; g.stroke(p);
      }
      g.restore();
      if (prog > 0.9) { g.save(); g.fillStyle = '#1c1013'; for (const [x, y] of juncs) { g.beginPath(); g.arc(x, y, 5, 0, 7); g.fill(); } g.restore(); }
      if (st.ag) { // ionii de argint coboară și precipită între celule
        g.save(); for (const a of ag) { const u = (t * 0.35 + a.ph) % 1; const tp = a.e.pts[Math.floor(a.u * (a.e.pts.length - 1))]; const x = lerp(a.x0, tp[0], u), y = lerp(-60, tp[1], u); g.globalAlpha = Math.sin(u * Math.PI); g.fillStyle = '#e9edf5'; g.strokeStyle = '#4a4a5a'; g.lineWidth = 2; g.beginPath(); g.arc(x, y, 7, 0, 7); g.fill(); g.stroke(); g.fillStyle = '#4a4a5a'; g.font = '800 9px Inter, sans-serif'; g.textAlign = 'center'; g.fillText('+', x, y + 3); } g.restore();
      }
    },
  };
}

/* =========================================================== 2 · SIMPLU CUBIC (HE, tubi colectori) */
function tubeRing(cx, cy, R, rl, n0) {
  const n = n0 || Math.max(7, Math.round(TAU * (R + rl) / 2 / (R - rl))); const cells = [];
  for (let k = 0; k < n; k++) {
    const a0 = k / n * TAU + 0.15, a1 = (k + 1) / n * TAU + 0.15, am = (a0 + a1) / 2; const g0 = 0.02;
    const pts = [[cx + Math.cos(a0 + g0) * rl, cy + Math.sin(a0 + g0) * rl], [cx + Math.cos(a1 - g0) * rl, cy + Math.sin(a1 - g0) * rl], [cx + Math.cos(a1 - g0) * R, cy + Math.sin(a1 - g0) * R], [cx + Math.cos(am) * R * 1.01, cy + Math.sin(am) * R * 1.01], [cx + Math.cos(a0 + g0) * R, cy + Math.sin(a0 + g0) * R]];
    cells.push({ pts, am, nuc: [cx + Math.cos(am) * (R + rl) / 2, cy + Math.sin(am) * (R + rl) / 2] });
  }
  return { cx, cy, R, rl, cells };
}
function makeCub() {
  const T = [[500, 430, 165, 82, 10], [140, 130, 125, 52], [870, 160, 130, 55], [150, 790, 125, 52], [850, 800, 135, 56], [-30, 470, 115, 48], [1040, 480, 125, 52], [520, 960, 115, 48], [500, -80, 110, 46]].map(([x, y, R, rl, n]) => tubeRing(x, y, R, rl, n));
  const caps = [[[300, -40], [306, 200], [312, 420], [300, 640], [310, 980]], [[700, -40], [694, 250], [700, 480], [692, 700], [705, 980]]];
  srand(5); const inter = Array.from({ length: 18 }, () => [rr(0, 1000), rr(0, 934), rr(0, 6.28)]).filter(([x, y]) => T.every((tb) => Math.hypot(x - tb.cx, y - tb.cy) > tb.R + 20));
  const M = T[0]; const top = M.cells.reduce((b, c) => (c.nuc[1] < b.nuc[1] ? c : b));
  return {
    A: { tube: [M.cx, M.cy - M.R - 20], cell: top.nuc, lumen: [M.cx, M.cy], cap: [700, 480] }, M, top,
    draw(g, t, st = {}) {
      bgFill(g, '#f7d9e7', '#f2cfe0');
      g.save(); g.strokeStyle = 'rgba(222,140,180,.5)'; g.lineWidth = 3; for (const [x, y, a] of inter) { g.beginPath(); g.moveTo(x - Math.cos(a) * 30, y - Math.sin(a) * 30); g.quadraticCurveTo(x, y + 8, x + Math.cos(a) * 30, y + Math.sin(a) * 30); g.stroke(); } g.restore();
      for (const [x, y, a] of inter) paint(g, spindle(x, y, 40, 11, a, t, x), HE.nuc, HE.nucS, null, bb(x, y, 20, 6), OUT, 2.5);
      caps.forEach((p, k) => capillary(g, p, 34, t + k * 3, { n: 7, nuclei: 3 }));
      for (const tb of T) {
        g.save(); g.strokeStyle = '#c2558c'; g.lineWidth = 4; g.beginPath(); g.arc(tb.cx, tb.cy, tb.R + 4, 0, 7); g.stroke(); g.restore(); // MB
        g.save(); g.fillStyle = '#fffaf2'; g.beginPath(); g.arc(tb.cx, tb.cy, tb.rl + 2, 0, 7); g.fill(); g.restore(); // lumen gol
        for (const c of tb.cells) cellP(g, c.pts, '#f6c5dc', '#ecaacb', '#ffe8f2', 4, 7);
        const s = (tb.R - tb.rl) / 83;
        for (const c of tb.cells) nuc(g, c.nuc[0], c.nuc[1], 17 * s, 17 * s, 0, 'eu', t);
      }
      if (st.measure > 0) { // înălțime ≈ lățime
        const c = top; const u = ease(st.measure); const a = c.am; const R0 = M.rl, R1 = M.R; const ox = Math.cos(a), oy = Math.sin(a);
        const px = -oy, py = ox; const cx = M.cx + ox * (R0 + R1) / 2, cy = M.cy + oy * (R0 + R1) / 2; const L = (R1 - R0) / 2 * u, Wd = 42 * u;
        g.save(); g.lineCap = 'round';
        for (const [col, w] of [[OUT, 9], ['#ffe36e', 5]]) { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(cx + px * 58 - ox * L, cy + py * 58 - oy * L); g.lineTo(cx + px * 58 + ox * L, cy + py * 58 + oy * L); g.moveTo(cx - px * Wd + ox * 54, cy - py * Wd + oy * 54); g.lineTo(cx + px * Wd + ox * 54, cy + py * Wd + oy * 54); g.stroke(); }
        g.restore();
      }
    },
  };
}

/* =========================================================== 3 · SIMPLU PRISMATIC (HE, vezica biliară) */
function makePri() {
  const BMc = crSample([[330, 1000], [334, 760], [352, 520], [400, 340], [500, 280], [600, 340], [648, 520], [666, 760], [670, 1000]], 16);
  const n = Math.round(plen(BMc) / 40); const B = resample(BMc, n + 1);
  const cells = sheet(B, false, () => 150, -1);
  srand(21); const cor = Array.from({ length: 22 }, () => [rr(390, 610), rr(380, 960), rr(0, 3)]);
  const drops = Array.from({ length: 26 }, () => ({ c: cells[2 + Math.floor(rnd() * (cells.length - 4))], ph: rnd() }));
  const near = (y, left) => cells.filter((c) => (left ? c.m[0] < 500 : c.m[0] > 500)).reduce((b, c) => (Math.abs(c.m[1] - y) < Math.abs(b.m[1] - y) ? c : b));
  const cL = near(560, true), cR = near(620, false);
  return {
    A: { border: cL.at(1.08), band: cR.at(0.3), corion: [500, 620], lumen: [120, 300] }, cL, cR, cells,
    draw(g, t, st = {}) {
      bgFill(g, '#fdf4f8', '#f9eaf2');
      // corionul (conjunctiv lax cu vase) în axul pliului
      const core = new Path2D(); core.moveTo(B[0][0], B[0][1]); B.forEach((p) => core.lineTo(p[0], p[1])); core.closePath();
      g.save(); g.fillStyle = '#f6d3e3'; g.fill(core); g.clip(core);
      g.strokeStyle = 'rgba(214,120,166,.55)'; g.lineWidth = 3; for (const [x, y, a] of cor) { g.beginPath(); g.moveTo(x - 26, y - Math.sin(a) * 10); g.quadraticCurveTo(x, y + 10, x + 26, y + Math.cos(a) * 10); g.stroke(); }
      for (const [x, y, a] of cor) paint(g, spindle(x, y, 34, 10, a, t, x), HE.nuc, HE.nucS, null, bb(x, y, 17, 5), OUT, 2.2);
      capillary(g, [[500, 1000], [490, 800], [505, 620], [495, 440]], 32, t, { n: 6 });
      g.restore();
      // celulele înalte
      for (const c of cells) cellP(g, c.pts, '#ec98c6', '#dc78ae', '#ffd2e8', 3.5, 5);
      // nuclei alungiți, paraleli, bazali, aliniați în bandă
      for (const c of cells) { const [x, y] = c.at(0.3); nuc(g, x, y, 25, 8.5, Math.atan2(c.n[1], c.n[0]), 'hyper', t); }
      // platoul striat: banda apicală cu striații fine (microvilozități)
      const apex = cells.map((c) => [c.pts[3], c.pts[2]]).flat();
      g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; const ap = new Path2D(); ap.moveTo(apex[0][0], apex[0][1]); apex.forEach((p) => ap.lineTo(p[0], p[1]));
      g.strokeStyle = OUT; g.lineWidth = 17; g.stroke(ap); g.strokeStyle = '#d4549a'; g.lineWidth = 11; g.stroke(ap);
      g.strokeStyle = 'rgba(255,230,245,.85)'; g.lineWidth = 1.6;
      for (const c of cells) for (let k = 0; k < 7; k++) { const u = (k + 0.5) / 7; const ph = REDUCED ? 0 : Math.sin(t * 3 + c.i + k) * 0.08; const bx = lerp(c.pts[3][0], c.pts[2][0], u), by = lerp(c.pts[3][1], c.pts[2][1], u); g.beginPath(); g.moveTo(bx - c.n[0] * 5, by - c.n[1] * 5); g.lineTo(bx + c.n[0] * (5 + ph * 30), by + c.n[1] * (5 + ph * 30)); g.stroke(); }
      g.restore();
      // MB fină
      g.save(); g.strokeStyle = '#b8407c'; g.lineWidth = 3; const bm = new Path2D(); bm.moveTo(B[0][0], B[0][1]); B.forEach((p) => bm.lineTo(p[0], p[1])); g.stroke(bm); g.restore();
      if (st.absorb) { // apa intră prin polul apical (bila se concentrează)
        g.save(); for (const d of drops) { const u = (t * 0.28 + d.ph) % 1; const a = d.c.at(1.0 + 0.6 * (1 - u * 2)); const b2 = d.c.at(-0.1); const [x, y] = u < 0.5 ? a : [lerp(d.c.at(1)[0], b2[0], (u - 0.5) * 2), lerp(d.c.at(1)[1], b2[1], (u - 0.5) * 2)]; g.globalAlpha = Math.sin(u * Math.PI) * 0.95; g.fillStyle = '#7fd8ff'; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.arc(x, y, 7, 0, 7); g.fill(); g.stroke(); } g.restore();
      }
    },
  };
}

/* =========================================================== 4 · PSEUDOSTRATIFICAT (HE, trahee) */
function makePs() {
  const yb = (x) => 700 + 8 * Math.sin(x / 90), ys = (x) => 300 + 6 * Math.sin(x / 120 + 1);
  const S = 76, N = 15; const X = Array.from({ length: N }, (_, i) => -10 + i * S);
  const types = ['C', 'C', 'G', 'C', 'C', 'C', 'G', 'C', 'C', 'C', 'G', 'C', 'C', 'G', 'C'];
  const gapH = X.map((_, i) => (i % 2 ? 480 : 612)); // intermediară (sus) / bazală (jos)
  const tall = X.map((x, i) => {
    const xl = x - S / 2, xr = x + S / 2, yl = i > 0 ? gapH[i - 1] : 612, yr = gapH[i];
    return { x, type: types[i], pts: [[xl, ys(xl)], [x, ys(x) - 2], [xr, ys(xr)], [xr, yr], [x + 9, yb(x + 9)], [x - 9, yb(x - 9)], [xl, yl]] };
  });
  const gaps = X.slice(0, -1).map((x, i) => { const ax = x + S / 2, ay = gapH[i]; const l = x + 9, r = X[i + 1] - 9; return { kind: ay < 560 ? 'I' : 'B', pts: [[ax, ay], [r, yb(r)], [lerp(l, r, 0.5), yb(lerp(l, r, 0.5)) + 1], [l, yb(l)]], ax, ay, l, r }; });
  srand(41); const cor = Array.from({ length: 16 }, () => [rr(0, 1000), rr(760, 930), rr(-0.5, 0.5)]);
  const bm = Array.from({ length: 51 }, (_, i) => [i * 20 - 10, yb(i * 20 - 10)]);
  const tI = gaps.find((q, i) => q.kind === 'I' && q.ax > 360), tB = gaps.find((q) => q.kind === 'B' && q.ax > 440), tG = tall.find((c) => c.type === 'G' && c.x > 420);
  return {
    A: { nucs: [tI.ax, 560], cilia: [600, 262], top: [300, 345], corion: [560, 840], bases: [500, 712], goblet: [tG.x, ys(tG.x) + 60] },
    tG, gaps, tall, yb, ys,
    draw(g, t, st = {}) {
      bgFill(g, '#fdf4f8', '#f9eaf2');
      // corion sub MB
      g.save(); g.fillStyle = '#f6d3e3'; g.beginPath(); g.moveTo(-50, 1000); bm.forEach((p) => g.lineTo(p[0], p[1])); g.lineTo(1050, 1000); g.closePath(); g.fill(); g.restore();
      g.save(); g.strokeStyle = 'rgba(214,120,166,.5)'; g.lineWidth = 3; for (const [x, y, a] of cor) { g.beginPath(); g.moveTo(x - 30, y); g.quadraticCurveTo(x, y + 12 * a, x + 30, y - 6); g.stroke(); } g.restore();
      for (const [x, y, a] of cor) paint(g, spindle(x, y, 40, 11, a, t, x), HE.nuc, HE.nucS, null, bb(x, y, 20, 6), OUT, 2.2);
      capillary(g, [[-30, 860], [300, 840], [640, 880], [1040, 850]], 30, t, { n: 7 });
      // pătura de mucus deasupra cililor (escalatorul mucociliar)
      g.save(); g.globalAlpha = 0.75; g.fillStyle = '#d9e9ff'; g.strokeStyle = 'rgba(42,21,52,.35)'; g.lineWidth = 3; g.beginPath(); g.moveTo(-40, 262); for (let x = -40; x <= 1040; x += 20) g.lineTo(x, 236 + 6 * Math.sin(x / 50 - (REDUCED ? 0 : t * 1.5))); g.lineTo(1040, 268); g.lineTo(-40, 268); g.closePath(); g.fill(); g.stroke(); g.restore();
      g.save(); for (let k = 0; k < 9; k++) { const x = ((k * 123 + (REDUCED ? 0 : t * 40)) % 1100) - 50; g.fillStyle = '#9b8a6a'; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.arc(x, 250 + (k % 3) * 4, 5 + (k % 2) * 2, 0, 7); g.fill(); g.stroke(); } g.restore();
      // celulele: toate ating MB
      for (const q of gaps) cellP(g, q.pts, q.kind === 'B' ? '#c9a6e2' : '#e7b2d6', q.kind === 'B' ? '#ad86d2' : '#d595c2', null, 3.5, 5);
      for (const c of tall) cellP(g, c.pts, c.type === 'G' ? '#f3d8ea' : '#f0a2c9', c.type === 'G' ? '#e7c1da' : '#e283b5', '#ffe0ef', 3.5, 5);
      // caliciforme: cupa palidă (mucus necolorat), nucleu turtit jos
      for (const c of tall) if (c.type === 'G') { const y0 = ys(c.x); paint(g, blob(c.x, y0 + 72, 30, 70, 0, t, 0.03, 14, c.x), '#fbf7ff', '#e9e0f7', null, bb(c.x, y0 + 72, 30, 70), '#9b7fb8', 3); g.save(); g.strokeStyle = 'rgba(160,130,200,.55)'; g.lineWidth = 1.5; for (let k = 0; k < 5; k++) { g.beginPath(); g.arc(c.x + ((k * 13) % 30) - 15, y0 + 40 + k * 18, 8, 0, 7); g.stroke(); } g.restore(); nuc(g, c.x, 478, 13, 6, 0, 'hyper', t); }
      // nucleii pe 3 niveluri: bastonaș (sus) · rotund-ovalar (mijloc) · rotund (lângă MB)
      tall.forEach((c, i) => { if (c.type === 'C') nuc(g, c.x, 452 + (i % 3) * 14, 8, 25, 0, 'hyper', t); });
      for (const q of gaps) { const cx = lerp(q.l, q.r, 0.5); if (q.kind === 'I') nuc(g, cx, 582, 10, 14, 0, 'eu', t); else nuc(g, cx, 668, 12, 11, 0, 'eu', t); }
      // cilii (bat coordonat, undă)
      g.save(); g.lineCap = 'round';
      for (const c of tall) if (c.type === 'C') for (let k = 0; k < 7; k++) { const x = c.x - 28 + k * 9.3, y = ys(x) - 1; const a = (REDUCED ? 0.1 : 0.45 * Math.sin(t * 7 - x / 45)); const ex = x + Math.sin(a) * 30, ey = y - Math.cos(a) * 30; for (const [col, w] of [[OUT, 5], ['#c75a98', 2.6]]) { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.sin(a) * 10, y - 16, ex, ey); g.stroke(); } }
      g.restore();
      // MB (abia vizibilă)
      g.save(); g.strokeStyle = '#b8407c'; g.lineWidth = 3; g.beginPath(); bm.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.stroke(); g.restore();
      if (st.bases) { // fiecare celulă atinge MB
        g.save(); const pulse = 0.5 + 0.5 * Math.sin(t * 5);
        const pts = [...tall.map((c) => c.x), ...gaps.map((q) => lerp(q.l, q.r, 0.5))];
        for (const x of pts) { g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x, yb(x), 6 + pulse * 4, 0, 7); g.fill(); g.stroke(); }
        g.restore();
      }
    },
  };
}

/* =========================================================== straturi (esofag, uroteliu) */
function rowCells(y0f, y1f, x0, x1, w, off, warp = (x, y) => [x, y]) {
  const out = []; for (let x = x0 - w + off; x < x1; x += w) { const a = x, b = x + w; const pts = []; const K = 3; for (let k = 0; k <= K; k++) { const xx = lerp(a, b, k / K); pts.push(warp(xx, y0f(xx))); } for (let k = K; k >= 0; k--) { const xx = lerp(a, b, k / K); pts.push(warp(xx, y1f(xx))); } const xm = (a + b) / 2; out.push({ pts, c: warp(xm, (y0f(xm) + y1f(xm)) / 2), w, h: y0f(xm) - y1f(xm) }); } return out;
}

/* =========================================================== 5 · STRATIFICAT PAVIMENTOS NECHERATINIZAT (HE, esofag) */
function makeEs() {
  const yb = (x) => 765 + 48 * Math.sin(x / 70 + 0.5), ys = (x) => 165 + 10 * Math.sin(x / 200);
  const L1 = (x) => yb(x) - 58, Lsup = (x) => ys(x) + 66;
  const rows = [];
  rows.push({ kind: 'bas', cells: rowCells(yb, L1, -40, 1040, 38, 0) });
  for (let k = 0; k < 5; k++) { const a = (x) => lerp(L1(x), Lsup(x), k / 5), b = (x) => lerp(L1(x), Lsup(x), (k + 1) / 5); rows.push({ kind: 'spi', cells: rowCells(a, b, -60, 1060, 88, (k % 2) * 44) }); }
  for (let k = 0; k < 3; k++) { const a = (x) => lerp(Lsup(x), ys(x), k / 3), b = (x) => lerp(Lsup(x), ys(x), (k + 1) / 3); rows.push({ kind: 'sup', cells: rowCells(a, b, -100, 1100, 175, (k * 61) % 175) }); }
  const bm = Array.from({ length: 56 }, (_, i) => [i * 20 - 30, yb(i * 20 - 30)]);
  srand(51); const cor = Array.from({ length: 12 }, () => { const x = rr(0, 1000); return [x, rr(yb(x) + 40, 930), rr(-0.6, 0.6)]; });
  const pick = (r, x) => rows[r].cells.reduce((b, c) => (Math.abs(c.c[0] - x) < Math.abs(b.c[0] - x) ? c : b));
  const cB = pick(0, 640), cS = pick(3, 560), cT = pick(8, 620);
  const tx = 470;
  return {
    A: { bas: cB.c, spi: cS.c, sup: cT.c, corion: [520, 880], rows: [800, 450] }, cB, cS, cT,
    draw(g, t, st = {}) {
      bgFill(g, '#fdf4f8', '#f9eaf2');
      g.save(); g.fillStyle = '#f5cfe0'; g.beginPath(); g.moveTo(-50, 1000); bm.forEach((p) => g.lineTo(p[0], p[1])); g.lineTo(1050, 1000); g.closePath(); g.fill(); g.restore();
      for (const [x, y, a] of cor) paint(g, spindle(x, y, 40, 11, a, t, x), HE.nuc, HE.nucS, null, bb(x, y, 20, 6), OUT, 2.2);
      capillary(g, [[-30, 900], [260, 880], [560, 910], [1040, 890]], 30, t, { n: 7 });
      for (const r of rows) for (const c of r.cells) {
        if (r.kind === 'bas') cellP(g, c.pts, '#9d80d8', '#8064c4', '#c6b4ee', 3, 5);
        else if (r.kind === 'spi') cellP(g, c.pts, '#f5d3e5', '#ebbad4', '#fff3f9', 3, 8);
        else cellP(g, c.pts, '#f0bcd6', '#e2a0c2', null, 2.5, 6);
      }
      for (const r of rows) for (const c of r.cells) {
        if (r.kind === 'bas') nuc(g, c.c[0], c.c[1] + 4, 10, 17, 0, 'hypo', t);
        else if (r.kind === 'spi') nuc(g, c.c[0], c.c[1], 15, 15, 0, 'eu', t);
        else nuc(g, c.c[0] + c.w * 0.18, c.c[1], 14, 4.5, 0, 'pyk', t); // picnotic, excentric, dar prezent
      }
      g.save(); g.strokeStyle = '#a8336f'; g.lineWidth = 5; g.beginPath(); bm.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.stroke(); g.restore();
      if (st.tracer != null) { // o celulă urcă: bazală → poligonală → turtită → se descuamează
        const u = st.tracer; const y0 = yb(tx) - 30, y1 = ys(tx) + 10; const yy = lerp(y0, y1, Math.min(1, u / 0.85)) - (u > 0.85 ? (u - 0.85) * 900 : 0);
        const w = u < 0.2 ? lerp(38, 80, u / 0.2) : u < 0.6 ? 80 : lerp(80, 170, (u - 0.6) / 0.25); const h = u < 0.2 ? lerp(55, 72, u / 0.2) : u < 0.6 ? 72 : lerp(72, 20, Math.min(1, (u - 0.6) / 0.25));
        const col = u < 0.2 ? '#9d80d8' : u < 0.6 ? '#f5d3e5' : '#f0bcd6'; const x = tx + (u > 0.85 ? (u - 0.85) * 400 : 0); const rot = u > 0.85 ? (u - 0.85) * 2 : 0;
        g.save(); g.globalAlpha = u > 0.9 ? Math.max(0, 1 - (u - 0.9) * 10) : 1; g.translate(x, yy); g.rotate(rot);
        const p = rpoly([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]], 8); g.shadowColor = '#ffe36e'; g.shadowBlur = 24; g.fillStyle = col; g.fill(p); g.shadowBlur = 0; g.lineWidth = 6; g.strokeStyle = '#ffe36e'; g.stroke(p);
        if (u < 0.2) nuc(g, 0, 0, 10, 16, 0, 'hypo', t); else if (u < 0.6) nuc(g, 0, 0, 15, 15, 0, 'eu', t); else nuc(g, w * 0.18, 0, lerp(15, 14, (u - 0.6) * 4), lerp(15, 4.5, Math.min(1, (u - 0.6) * 4)), 0, 'pyk', t);
        g.restore();
      }
    },
  };
}

/* =========================================================== 6 · UROTELIUL (HE, vezica urinară) */
function makeUro() {
  const bump = (x) => -150 * Math.exp(-(((x - 500) / 180) ** 2));
  const wp = (x, y) => [x, y + bump(x) * (y < 820 ? 1 : 1)];
  const yb = (x) => 780 + 8 * Math.sin(x / 80);
  const basal = rowCells(yb, (x) => yb(x) - 52, -40, 1040, 40, 0, wp);
  // rachete de tenis: cap rotunjit sus, coadă îngustă jos (2 rânduri)
  const racket = (x, yh, yt, dx) => { const pts = []; const r = 33; for (let k = 0; k <= 12; k++) { const a = Math.PI * 0.82 + k / 12 * Math.PI * 1.36; pts.push([x + Math.cos(a) * r, yh + Math.sin(a) * r * 0.92]); } pts.push([x + dx + 7, yt]); pts.push([x + dx - 7, yt]); return { pts: pts.map(([px, py]) => wp(px, py)), head: wp(x, yh) }; };
  const rk1 = [], rk2 = [];
  for (let x = -30; x < 1060; x += 70) rk1.push(racket(x, 600, 730, 6));
  for (let x = 5; x < 1060; x += 70) rk2.push(racket(x, 470, 640, -6));
  // umbreliforme: boltite spre lumen, fiecare acoperă 2–3 rachete; 1–2 nuclei
  const umb = []; for (let x = -100, k = 0; x < 1100; x += 210, k++) { const pts = []; const yTop = 230, yBot = 432; for (let i = 0; i <= 10; i++) { const u = i / 10; pts.push([x + u * 210, yTop - 22 * Math.sin(u * Math.PI)]); } for (let i = 10; i >= 0; i--) { const u = i / 10; pts.push([x + u * 210, yBot - 26 * Math.abs(Math.sin(u * Math.PI * 3))]); } umb.push({ pts: pts.map(([px, py]) => wp(px, py)), c: wp(x + 105, 320), two: k % 2 === 0, x }); }
  const surf = Array.from({ length: 56 }, (_, i) => wp(i * 20 - 40, 208));
  srand(61); const cor = Array.from({ length: 14 }, () => { const x = rr(0, 1000); return [x, rr(840, 930), rr(-0.6, 0.6)]; });
  const uHi = umb.reduce((b, u) => (Math.abs(u.c[0] - 610) < Math.abs(b.c[0] - 610) ? u : b)), rHi = rk2.reduce((b, u) => (Math.abs(u.head[0] - 700) < Math.abs(b.head[0] - 700) ? u : b)), bHi = basal.reduce((b, u) => (Math.abs(u.c[0] - 760) < Math.abs(b.c[0] - 760) ? u : b));
  return {
    A: { umb: uHi.c, rk: rHi.head, bas: bHi.c, lumen: [150, 120] }, uHi, rHi, bHi,
    draw(g, t, st = {}) {
      bgFill(g, '#fdf4f8', '#f9eaf2');
      g.save();
      if (st.stretch) { const s = st.stretch; g.translate(500, 560); g.scale(1 + 0.12 * s, 1 - 0.2 * s); g.translate(-500, -560); }
      g.save(); g.fillStyle = '#f2c3d9'; g.beginPath(); g.moveTo(-60, 1100); for (let x = -60; x <= 1060; x += 20) { const p = wp(x, yb(x)); g.lineTo(p[0], p[1]); } g.lineTo(1060, 1100); g.closePath(); g.fill(); g.restore();
      for (const [x, y, a] of cor) paint(g, spindle(x, y, 40, 11, a, t, x), HE.nuc, HE.nucS, null, bb(x, y, 20, 6), OUT, 2.2);
      for (const c of basal) cellP(g, c.pts, '#c7a2df', '#ab84cf', null, 3, 5);
      for (const c of basal) nuc(g, c.c[0], c.c[1], 10, 13, 0, 'hypo', t, false);
      for (const r of rk1) paint(g, smooth(r.pts), '#f1c2db', '#e4a6c8', '#fff0f7', bbox(r.pts), OUT, 3.5);
      for (const r of rk1) nuc(g, r.head[0], r.head[1], 13, 13, 0, 'eu', t);
      for (const r of rk2) paint(g, smooth(r.pts), '#f3c9df', '#e6abcb', '#fff0f7', bbox(r.pts), OUT, 3.5);
      for (const r of rk2) nuc(g, r.head[0], r.head[1], 13, 13, 0, 'eu', t);
      for (const u of umb) paint(g, smooth(u.pts), '#e45d9c', '#cc4483', '#ff9cc8', bbox(u.pts), OUT, 4.5);
      for (const u of umb) { if (u.two) { nuc(g, u.c[0] - 26, u.c[1], 15, 15, 0, 'hyper', t); nuc(g, u.c[0] + 26, u.c[1] + 4, 15, 15, 0, 'hyper', t); } else nuc(g, u.c[0], u.c[1], 16, 16, 0, 'hyper', t); }
      // plăcile apicale (membrana apicală rigidă)
      g.save(); g.lineCap = 'round'; g.strokeStyle = '#ffd1e6'; g.lineWidth = 4; g.setLineDash([22, 10]); g.beginPath(); umb.forEach((u) => { for (let i = 0; i <= 10; i++) { const p = u.pts[i]; if (i) g.lineTo(p[0], p[1] + 6); else g.moveTo(p[0], p[1] + 6); } }); g.stroke(); g.restore();
      g.restore();
    },
  };
}

/* =========================================================== 7 · GLANDA TUBULARĂ SIMPLĂ (HE, colon) */
function makeTub() {
  const CX = [215, 500, 785], hw = 112, yS = 205, yBot = 830; const cr = hw;
  const path = [[-60, yS]];
  CX.forEach((cx) => { path.push([cx - hw, yS]); for (let y = yS + 40; y <= yBot - cr; y += 60) path.push([cx - hw, y]); for (let k = 0; k <= 10; k++) { const a = Math.PI - k / 10 * Math.PI; path.push([cx + Math.cos(a) * cr, yBot - cr + Math.sin(a) * cr]); } for (let y = yBot - cr - 40; y >= yS + 40; y -= 60) path.push([cx + hw, y]); path.push([cx + hw, yS]); });
  path.push([1060, yS]);
  const P = []; for (let i = 0; i < path.length - 1; i++) { const a = path[i], b = path[i + 1]; const n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / 6)); for (let k = 0; k < n; k++) P.push([lerp(a[0], b[0], k / n), lerp(a[1], b[1], k / n)]); }
  P.push(path[path.length - 1]);
  const n = Math.round(plen(P) / 34); const B = resample(P, n + 1);
  const cells = sheet(B, false, () => 84, -1);
  cells.forEach((c, k) => { c.gob = c.m[1] > yS + 20 ? (k % 3 !== 1) : (k % 3 === 0); });
  srand(71); const cor = []; for (let k = 0; k < 70; k++) { const x = rr(-20, 1020), y = rr(yS + 30, 960); if (CX.every((cx) => Math.abs(x - cx) > hw + 14 || y > yBot + 14)) cor.push([x, y, rr(0, 6.28)]); }
  const drops = []; CX.forEach((cx, ci) => { for (let k = 0; k < 9; k++) drops.push({ cx, ph: k / 9 + ci * 0.13 }); });
  const gHi = cells.filter((c) => c.gob && c.m[0] < CX[1] && c.m[0] > CX[1] - hw - 5 && c.m[1] > 380 && c.m[1] < 520)[0] || cells[60];
  return {
    A: { crypt: [CX[1], 460], goblet: gHi.at(0.62), corion: [CX[1] + hw + 32, 560], surface: [CX[1] + 140, yS - 70], neck: [CX[1], yS - 20] }, gHi, CX, hw, yS, yBot,
    draw(g, t, st = {}) {
      bgFill(g, '#fdf6f9', '#f9edf3');
      g.save(); g.fillStyle = '#f5d6e5'; g.beginPath(); g.moveTo(B[0][0], B[0][1]); B.forEach((p) => g.lineTo(p[0], p[1])); g.lineTo(1060, 1000); g.lineTo(-60, 1000); g.closePath(); g.fill(); g.restore();
      for (const [x, y, a] of cor) nuc(g, x, y, 7, 5, a, 'hyper', t);
      capillary(g, [[CX[0] + hw + 25, 980], [CX[0] + hw + 25, 600], [CX[0] + hw + 25, 280]], 22, t, { n: 5, nuclei: 2 });
      // glandilem
      g.save(); g.strokeStyle = '#b8407c'; g.lineWidth = 3; g.beginPath(); B.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.stroke(); g.restore();
      for (const c of cells) cellP(g, c.pts, c.gob ? '#f3cfe3' : '#ec9ac6', c.gob ? '#e6b8d2' : '#dc7db0', null, 3, 4);
      for (const c of cells) {
        const ang = Math.atan2(c.n[1], c.n[0]);
        if (c.gob) { const [x, y] = c.at(0.64); paint(g, blob(x, y, c.h * 0.3, c.w * 0.44, ang, t, 0.03, 12, c.i), '#fdfaff', '#ece4f8', null, bb(x, y, c.w * 0.44, c.h * 0.3), '#9b7fb8', 2.2); const [nx, ny] = c.at(0.17); nuc(g, nx, ny, 4.5, c.w * 0.36, ang, 'hyper', t); }
        else { const [x, y] = c.at(0.27); nuc(g, x, y, 15, 6.5, ang, 'hyper', t); }
      }
      if (st.mucus) { // mucusul iese prin exocitoză și urcă spre suprafață
        g.save(); for (const d of drops) { const u = (t * 0.12 + d.ph) % 1; const y = lerp(yBot - 40, yS - 120, u), x = d.cx + Math.sin(u * 18 + d.ph * 9) * 10; g.globalAlpha = Math.min(1, Math.sin(u * Math.PI) * 1.6); g.fillStyle = '#eaf6ff'; g.strokeStyle = '#7d8fb8'; g.lineWidth = 2; g.beginPath(); g.arc(x, y, 8, 0, 7); g.fill(); g.stroke(); } g.restore();
      }
    },
  };
}

/* =========================================================== 8 · GLANDA SEBACEE (HE, buză) */
function makeSeb() {
  const C = [390, 500], RX = 300, RY = 330; const duct = [[625, 300], [690, 262], [750, 240]];
  const ring = resample(ellPts(C[0], C[1], RX, RY, 200), 46, true);
  const basal = sheet(ring, true, () => 34, 1); // spre interior
  srand(81); const cells = []; const R = 47;
  for (let r = -8; r <= 8; r++) for (let c = -8; c <= 8; c++) { const cx = C[0] + c * R * 1.73 + (r % 2 ? R * 0.87 : 0), cy = C[1] + r * R * 1.5; const e = ((cx - C[0]) / (RX - 62)) ** 2 + ((cy - C[1]) / (RY - 62)) ** 2; if (e > 1) continue; const pts = []; for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; pts.push([cx + Math.cos(a) * R * rr(0.94, 1.05), cy + Math.sin(a) * R * rr(0.94, 1.05)]); } const dd = Math.hypot(cx - duct[0][0], cy - duct[0][1]); cells.push({ c: [cx, cy], pts, m: clamp(1 - dd / 420), vac: Array.from({ length: 9 }, () => [rr(-26, 26), rr(-26, 26), rr(4, 8)]), nx: rr(-14, 14), ny: rr(-12, 12) }); }
  const hairX = 830;
  const path = [[C[0] + RX * Math.cos(3.6), C[1] + RY * Math.sin(3.6)], [C[0] - 120, C[1] + 60], [C[0] + 40, C[1] - 40], [C[0] + 170, C[1] - 150], [duct[0][0], duct[0][1]], [duct[1][0], duct[1][1]], [hairX - 30, 200], [hairX - 20, 60]];
  const trP = crSample(path, 10);
  const cPal = cells.reduce((b, c) => (Math.abs(c.m - 0.25) < Math.abs(b.m - 0.25) && c.c[1] < 620 ? c : b)), cDis = cells.reduce((b, c) => (c.m > b.m ? c : b));
  const bHi = basal.reduce((b, c) => (c.m[0] < b.m[0] ? c : b));
  return {
    A: { sac: [C[0], C[1] - RY - 20], basal: bHi.at(0.5), big: cPal.c, duct: duct[1], hair: [hairX, 600] }, cPal, cDis, bHi, C,
    draw(g, t, st = {}) {
      bgFill(g, '#fbe9f1', '#f6dcea');
      // conjunctiv + firul de păr cu teaca epitelială
      g.save(); g.strokeStyle = 'rgba(214,120,166,.45)'; g.lineWidth = 4; for (let k = 0; k < 14; k++) { const y = k * 70; g.beginPath(); g.moveTo(-40, y); g.bezierCurveTo(200, y + 30, 400, y - 30, 1040, y + 10); g.stroke(); } g.restore();
      paint(g, rpoly([[hairX - 80, -60], [hairX + 80, -60], [hairX + 86, 1000], [hairX - 86, 1000]], 30), '#efb0cf', '#e293b9', null, [hairX - 86, -60, 172, 1060], OUT, 5);
      paint(g, rpoly([[hairX - 26, -60], [hairX + 26, -60], [hairX + 30, 1000], [hairX - 30, 1000]], 20), '#d9a45a', '#bf8640', '#f3cf8e', [hairX - 30, -60, 60, 1060], OUT, 4);
      for (let k = 0; k < 12; k++) { nuc(g, hairX - 55, 40 + k * 80, 6, 11, 0, 'hyper', t); nuc(g, hairX + 55, 70 + k * 80, 6, 11, 0, 'hyper', t); }
      // canalul scurt, plin cu sebum
      g.save(); g.lineCap = 'round'; const dp = smooth(duct, false); g.strokeStyle = OUT; g.lineWidth = 70; g.stroke(dp); g.strokeStyle = '#efb0cf'; g.lineWidth = 62; g.stroke(dp); g.strokeStyle = '#fff6d9'; g.lineWidth = 34; g.stroke(dp); g.restore();
      // săculețul: fond spumos + celule mari vacuolare, fără lumen
      g.save(); g.fillStyle = '#f3dceb'; g.beginPath(); g.ellipse(C[0], C[1], RX, RY, 0, 0, 7); g.fill(); g.restore();
      for (const c of cells) {
        const dis = c.m > 0.82;
        g.save(); if (dis) { g.globalAlpha = 0.8; g.setLineDash([10, 8]); }
        g.fillStyle = dis ? '#fbf1e4' : '#f8e9f3'; const p = rpoly(c.pts, 8); g.fill(p);
        g.strokeStyle = 'rgba(190,140,190,.8)'; g.lineWidth = 1.6; for (const [vx, vy, vr] of c.vac) { g.beginPath(); g.arc(c.c[0] + vx, c.c[1] + vy, vr, 0, 7); g.stroke(); }
        g.strokeStyle = '#c47aad'; g.lineWidth = 4; g.stroke(p); g.strokeStyle = OUT; g.lineWidth = 1.6; g.stroke(p); g.restore();
        if (c.m < 0.55) nuc(g, c.c[0], c.c[1], 12, 12, 0, 'eu', t); else nuc(g, c.c[0] + c.nx, c.c[1] + c.ny, lerp(9, 5, (c.m - 0.55) / 0.45), lerp(9, 5, (c.m - 0.55) / 0.45), 0, 'pyk', t);
      }
      // rândul periferic de celule bazale (cubice, bazofile) pe MB
      for (const c of basal) cellP(g, c.pts, '#a98ad8', '#8f6fc8', null, 3, 4);
      for (const c of basal) { const [x, y] = c.at(0.5); nuc(g, x, y, 9, 9, 0, 'hyper', t); }
      g.save(); g.strokeStyle = '#b8407c'; g.lineWidth = 4; g.beginPath(); g.ellipse(C[0], C[1], RX + 1, RY + 1, 0, 0, 7); g.stroke(); g.restore();
      // sebumul curge spre firul de păr
      g.save(); for (let k = 0; k < 6; k++) { const u = ((REDUCED ? 0 : t * 0.18) + k / 6) % 1; const p = trP[Math.floor(lerp(trP.length * 0.62, trP.length - 1, u))]; g.globalAlpha = Math.sin(u * Math.PI); paint(g, blob(p[0], p[1], 11, 8, 0, t, 0.08, 8, k), '#ffe9a8', '#f3d27a', null, bb(p[0], p[1], 11, 8), OUT, 2); } g.restore();
      if (st.holo != null) { // ciclul holocrin: o celulă bazală se divide, se umple, moare = sebum
        const u = st.holo; const i = Math.min(trP.length - 1, Math.floor(u * 0.62 * (trP.length - 1) / 0.8)); const p = trP[Math.min(trP.length - 1, Math.floor(Math.min(u, 0.8) / 0.8 * trP.length * 0.62))];
        const s = lerp(0.45, 1.1, Math.min(1, u / 0.6)); const burst = clamp((u - 0.72) / 0.18);
        if (burst < 1) { g.save(); g.globalAlpha = 1 - burst; const r = 44 * s; const pp = rpoly(Array.from({ length: 6 }, (_, k) => [p[0] + Math.cos(Math.PI / 6 + k * Math.PI / 3) * r, p[1] + Math.sin(Math.PI / 6 + k * Math.PI / 3) * r]), 8); g.shadowColor = '#ffe36e'; g.shadowBlur = 22; g.fillStyle = u < 0.15 ? '#a98ad8' : '#f8e9f3'; g.fill(pp); g.shadowBlur = 0; if (u > 0.15) { g.strokeStyle = 'rgba(190,140,190,.9)'; g.lineWidth = 1.6; for (let k = 0; k < 7; k++) { g.beginPath(); g.arc(p[0] + Math.cos(k * 2.3) * r * 0.5, p[1] + Math.sin(k * 2.3) * r * 0.5, r * 0.16, 0, 7); g.stroke(); } } g.lineWidth = 6; g.strokeStyle = '#ffe36e'; g.stroke(pp); g.restore(); const nr = u < 0.5 ? 10 : lerp(10, 5, (u - 0.5) / 0.25); if (burst < 0.6) nuc(g, p[0] + (u > 0.5 ? 10 : 0), p[1], nr, nr, 0, u < 0.5 ? 'eu' : 'pyk', t); }
        if (burst > 0) { g.save(); for (let k = 0; k < 7; k++) { const a = k / 7 * TAU; const q = trP[Math.min(trP.length - 1, Math.floor(lerp(trP.length * 0.62, trP.length - 1, burst)) )]; const x = lerp(p[0] + Math.cos(a) * 30, q[0], burst), y = lerp(p[1] + Math.sin(a) * 30, q[1], burst); g.globalAlpha = 1 - burst * 0.6; paint(g, blob(x, y, 10, 8, a, t, 0.06, 8, k), '#ffe9a8', '#f3d27a', null, bb(x, y, 10, 8), OUT, 2); } g.restore(); }
        void i;
      }
    },
  };
}

/* =========================================================== acini (glande salivare, pancreas) */
function acSer(g, x, y, R, t, o = {}) {
  const n = o.n || 7; const r0 = R * 0.08; const rot = o.rot || 0;
  const gr = g.createRadialGradient(x, y, R * 0.1, x, y, R); gr.addColorStop(0, '#f0b4d8'); gr.addColorStop(0.42, '#dc8fc6'); gr.addColorStop(0.6, '#7c5cc6'); gr.addColorStop(1, '#5a3fae');
  for (let k = 0; k < n; k++) { const a0 = rot + k / n * TAU, a1 = rot + (k + 1) / n * TAU, am = (a0 + a1) / 2; const pts = [[x + Math.cos(am) * r0, y + Math.sin(am) * r0], [x + Math.cos(a0 + 0.03) * R, y + Math.sin(a0 + 0.03) * R], [x + Math.cos(am) * R * 1.03, y + Math.sin(am) * R * 1.03], [x + Math.cos(a1 - 0.03) * R, y + Math.sin(a1 - 0.03) * R]]; const p = rpoly(pts, 5); g.save(); g.fillStyle = gr; g.fill(p); g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 2.6; g.stroke(p); g.restore(); }
  g.save(); g.fillStyle = '#ffb3cf'; for (let k = 0; k < n * 4; k++) { const a = rot + k * 1.7, r = R * (0.16 + (k % 4) * 0.07); g.beginPath(); g.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, Math.max(1.6, R * 0.04), 0, 7); g.fill(); } g.restore(); // zimogen apical
  for (let k = 0; k < n; k++) { const am = rot + (k + 0.5) / n * TAU; nuc(g, x + Math.cos(am) * R * 0.6, y + Math.sin(am) * R * 0.6, R * 0.15, R * 0.15, 0, 'eu', t); }
  if (o.centro) nuc(g, x, y, R * 0.13, R * 0.09, 0.4, 'pale', t, false);
  if (o.myo) paint(g, spindle(x + Math.cos(rot + 0.3) * R * 1.02, y + Math.sin(rot + 0.3) * R * 1.02, R * 0.6, R * 0.11, rot + 0.3 + Math.PI / 2, t, 1), HE.nuc, HE.nucS, null, bb(x, y, R * 0.3, R * 0.06), OUT, 2);
  g.save(); g.fillStyle = '#fff4fa'; g.beginPath(); g.arc(x, y, Math.max(2.5, r0 * 0.9), 0, 7); g.fill(); g.restore();
}
function acMuc(g, x, y, R, t, o = {}) {
  const n = o.n || 5; const r0 = R * 0.3; const rot = o.rot || 0.3;
  for (let k = 0; k < n; k++) { const a0 = rot + k / n * TAU, a1 = rot + (k + 1) / n * TAU, am = (a0 + a1) / 2; const pts = [[x + Math.cos(a0 + 0.04) * r0, y + Math.sin(a0 + 0.04) * r0], [x + Math.cos(a1 - 0.04) * r0, y + Math.sin(a1 - 0.04) * r0], [x + Math.cos(a1 - 0.02) * R, y + Math.sin(a1 - 0.02) * R], [x + Math.cos(am) * R * 1.03, y + Math.sin(am) * R * 1.03], [x + Math.cos(a0 + 0.02) * R, y + Math.sin(a0 + 0.02) * R]]; cellP(g, pts, '#ece6f7', '#dcd2f0', '#ffffff', 2.6, 6); g.save(); g.strokeStyle = 'rgba(150,130,200,.45)'; g.lineWidth = 1.3; for (let j = 0; j < 4; j++) { const rr2 = lerp(r0 + 8, R - 14, j / 3); g.beginPath(); g.arc(x, y, rr2, a0 + 0.12, a1 - 0.12); g.stroke(); } g.restore(); }
  for (let k = 0; k < n; k++) { const am = rot + (k + 0.5) / n * TAU; nuc(g, x + Math.cos(am) * R * 0.87, y + Math.sin(am) * R * 0.87, R * 0.06, R * 0.2, am, 'hyper', t); } // turtit, bazal
  g.save(); g.fillStyle = '#fffafd'; g.beginPath(); g.arc(x, y, r0 - 2, 0, 7); g.fill(); g.restore();
}
function acMix(g, x, y, R, t, o = {}) {
  // semiluna Gianuzzi: celule seroase așezate ca o calotă peste acinul mucos
  const a0 = o.a0 ?? -2.3, span = 1.9, n = 4; const R2 = R * 1.36;
  for (let k = 0; k < n; k++) { const b0 = a0 + k / n * span, b1 = a0 + (k + 1) / n * span, bm = (b0 + b1) / 2; const pts = [[x + Math.cos(b0) * R * 0.97, y + Math.sin(b0) * R * 0.97], [x + Math.cos(bm) * R * 0.98, y + Math.sin(bm) * R * 0.98], [x + Math.cos(b1) * R * 0.97, y + Math.sin(b1) * R * 0.97], [x + Math.cos(b1 - 0.04) * R2 * (k === n - 1 ? 0.86 : 1), y + Math.sin(b1 - 0.04) * R2 * (k === n - 1 ? 0.86 : 1)], [x + Math.cos(bm) * R2 * 1.02, y + Math.sin(bm) * R2 * 1.02], [x + Math.cos(b0 + 0.04) * R2 * (k === 0 ? 0.86 : 1), y + Math.sin(b0 + 0.04) * R2 * (k === 0 ? 0.86 : 1)]]; cellP(g, pts, '#7a5ac4', '#5e43ad', '#a58be0', 3, 6); nuc(g, x + Math.cos(bm) * R * 1.18, y + Math.sin(bm) * R * 1.18, R * 0.1, R * 0.1, 0, 'eu', t); }
  acMuc(g, x, y, R, t, { n: 5, rot: a0 + span + 0.3 });
}

/* =========================================================== 9 · GLANDA TUBULO-ACINOASĂ COMPUSĂ, MIXTĂ (HE, submandibulara) */
function makeSub() {
  const MIX = [470, 430, 112], MUC = [[205, 245, 92], [800, 700, 95], [815, 210, 88], [250, 880, 80]];
  srand(91); const SER = [];
  for (let r = 0; r < 9; r++) for (let c = 0; c < 10; c++) { const x = c * 116 + (r % 2 ? 58 : 0) - 20 + rr(-12, 12), y = r * 110 - 10 + rr(-10, 10); if (Math.hypot(x - MIX[0], y - MIX[1]) < MIX[2] * 1.4 + 62) continue; if (MUC.some(([mx, my, mr]) => Math.hypot(x - mx, y - my) < mr + 60)) continue; SER.push([x, y, rr(52, 60), rr(0, 6.28)]); }
  const sHi = SER.reduce((b, s) => (Math.hypot(s[0] - 720, s[1] - 440) < Math.hypot(b[0] - 720, b[1] - 440) ? s : b));
  const gran = Array.from({ length: 14 }, (_, k) => ({ a: k / 14 * TAU, ph: (k * 0.37) % 1 }));
  return {
    A: { ser: [sHi[0], sHi[1]], muc: [MUC[2][0], MUC[2][1]], mix: [MIX[0], MIX[1]], demi: [MIX[0] + Math.cos(-1.35) * MIX[2] * 1.2, MIX[1] + Math.sin(-1.35) * MIX[2] * 1.2] }, sHi, MIX, MUC,
    draw(g, t, st = {}) {
      bgFill(g, '#e9bfdc', '#e2b3d4');
      g.save(); g.strokeStyle = 'rgba(200,90,160,.55)'; g.lineWidth = 6; g.beginPath(); g.moveTo(-20, 560); g.bezierCurveTo(300, 600, 600, 520, 1020, 580); g.stroke(); g.restore();
      const sq = st.squeeze ? 1 - 0.035 * (0.5 + 0.5 * Math.sin(t * 4)) : 1;
      for (const [x, y, R, rot] of SER) acSer(g, x, y, R, t, { rot, myo: true });
      for (const [x, y, R] of MUC) acMuc(g, x, y, R, t);
      g.save(); g.translate(MIX[0], MIX[1]); g.scale(sq, sq); g.translate(-MIX[0], -MIX[1]); acMix(g, MIX[0], MIX[1], MIX[2], t, { a0: -2.3 });
      if (st.squeeze) { for (const a of [0.6, 2.4, 3.9]) paint(g, spindle(MIX[0] + Math.cos(a) * MIX[2] * 1.03, MIX[1] + Math.sin(a) * MIX[2] * 1.03, 70, 13, a + Math.PI / 2, t, a), '#3a2a9a', '#22186e', null, bb(MIX[0], MIX[1], 35, 7), '#ffe36e', 3); }
      g.restore();
      if (st.gran) { const [x, y, R] = sHi; g.save(); for (const q of gran) { const u = (t * 0.3 + q.ph) % 1; const r = lerp(R * 0.45, 0, u); g.globalAlpha = Math.sin(u * Math.PI); g.fillStyle = '#ff7fb5'; g.strokeStyle = OUT; g.lineWidth = 1.5; g.beginPath(); g.arc(x + Math.cos(q.a) * r, y + Math.sin(q.a) * r, 4.5, 0, 7); g.fill(); g.stroke(); } g.restore(); }
    },
  };
}

/* =========================================================== 10 · TIROIDA (HE) */
function makeTir() {
  const F = [[300, 320, 185, 160, 'flat'], [720, 230, 125, 110, 'cub'], [560, 590, 78, 70, 'col'], [830, 560, 120, 105, 'cub'], [300, 750, 130, 105, 'cub'], [640, 850, 120, 85, 'cub'], [960, 850, 90, 90, 'cub'], [960, 170, 80, 95, 'col'], [40, 640, 90, 120, 'cub'], [60, 60, 110, 80, 'cub']];
  const HT = { flat: 15, cub: 32, col: 50 }, WD = { flat: 62, cub: 32, col: 24 };
  const fol = F.map(([cx, cy, rx, ry, ty]) => { const E = ellPts(cx, cy, rx, ry, 160); const n = Math.max(8, Math.round(plen([...E, E[0]]) / WD[ty])); const B = resample(E, n, true); return { cx, cy, rx, ry, ty, cells: sheet(B, true, () => HT[ty], 1), E }; });
  const cap = crSample([[680, 360], [672, 480], [668, 600], [690, 700], [760, 730], [900, 720], [1040, 700]], 10);
  const act = fol[2]; const cC = (() => { const f = fol[1]; const a = 2.6; return [f.cx + Math.cos(a) * (f.rx + 4), f.cy + Math.sin(a) * (f.ry + 4)]; })();
  srand(101); const strN = Array.from({ length: 26 }, () => [rr(0, 1000), rr(0, 934), rr(0, 6)]).filter(([x, y]) => fol.every((f) => ((x - f.cx) / (f.rx + 10)) ** 2 + ((y - f.cy) / (f.ry + 10)) ** 2 > 1));
  const scal = Array.from({ length: 9 }, (_, k) => k / 9 * TAU + 0.2);
  return {
    A: { colloid: [fol[0].cx, fol[0].cy], epi: [fol[1].cx, fol[1].cy - fol[1].ry + 16], small: [act.cx, act.cy - act.ry - 14], stroma: [540, 200], cC, flat: [fol[0].cx, fol[0].cy - fol[0].ry + 8] }, fol, act,
    draw(g, t, st = {}) {
      bgFill(g, '#f8dfeb', '#f4d4e4');
      // septul conjunctiv
      g.save(); g.lineCap = 'round'; const sp = smooth([[548, -40], [536, 120], [548, 300], [536, 470]], false); g.strokeStyle = OUT; g.lineWidth = 46; g.stroke(sp); g.strokeStyle = '#ea8fbb'; g.lineWidth = 38; g.stroke(sp); g.restore();
      for (let k = 0; k < 5; k++) paint(g, spindle(540 + (k % 2) * 6, 20 + k * 100, 40, 10, Math.PI / 2, t, k), HE.nuc, HE.nucS, null, bb(540, 20 + k * 100, 6, 20), OUT, 2);
      for (const [x, y, a] of strN) paint(g, spindle(x, y, 34, 10, a, t, x), HE.nuc, HE.nucS, null, bb(x, y, 17, 5), OUT, 2);
      capillary(g, cap, 30, t, { n: 7 });
      for (const f of fol) {
        const inner = f.cells.map((c) => c.pts[3]);
        g.save(); g.fillStyle = f.ty === 'col' ? '#f6c6de' : '#f0a7cc'; g.beginPath(); inner.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.closePath(); g.fill(); g.restore();
        if (f.ty === 'col') { g.save(); g.fillStyle = '#fff3f8'; for (const a of scal) { const p = inner[Math.floor((a / TAU) * inner.length) % inner.length]; g.beginPath(); g.arc(lerp(p[0], f.cx, 0.12), lerp(p[1], f.cy, 0.12), 8, 0, 7); g.fill(); } g.restore(); }
        for (const c of f.cells) cellP(g, c.pts, '#c99ad8', '#b07fca', null, 2.6, 3);
        for (const c of f.cells) { const [x, y] = c.at(0.5); const ang = Math.atan2(c.n[1], c.n[0]); if (f.ty === 'flat') nuc(g, x, y, 4, 13, ang, 'hyper', t); else if (f.ty === 'cub') nuc(g, x, y, 9, 9, 0, 'eu', t, false); else nuc(g, x, y, 15, 7.5, ang, 'hyper', t); }
        g.save(); g.strokeStyle = '#a8336f'; g.lineWidth = 2.5; g.beginPath(); f.E.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.closePath(); g.stroke(); g.restore();
      }
      // celula C (parafoliculară): lângă MB, nu atinge coloidul
      paint(g, blob(cC[0], cC[1], 24, 17, 2.6, t, 0.04, 12, 3), '#f3eaf7', '#e2d4ee', '#ffffff', bb(cC[0], cC[1], 24, 17), OUT, 3.5); nuc(g, cC[0], cC[1], 9, 9, 0, 'pale', t);
      if (st.hormone) { // coloidul resorbit → T3/T4 → capilar
        const f = act; g.save();
        for (let k = 0; k < 10; k++) { const u = (t * 0.22 + k / 10) % 1; const a = k * 0.63 - 0.4; const ex = f.cx + Math.cos(a) * f.rx, ey = f.cy + Math.sin(a) * f.ry; let x, y, col;
          if (u < 0.5) { x = lerp(f.cx + Math.cos(a) * 15, ex, u / 0.5); y = lerp(f.cy + Math.sin(a) * 15, ey, u / 0.5); col = '#ffb3d6'; }
          else { const p = cap[Math.min(cap.length - 1, Math.floor((u - 0.5) / 0.5 * (cap.length - 1)))]; const q = cap[2]; x = lerp(ex, p[0], Math.min(1, (u - 0.5) * 6)); y = lerp(ey, p[1], Math.min(1, (u - 0.5) * 6)); void q; col = '#ffe36e'; }
          g.globalAlpha = Math.sin(u * Math.PI) * 0.6 + 0.4; g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.arc(x, y, 6.5, 0, 7); g.fill(); g.stroke(); }
        g.restore();
      }
    },
  };
}

/* =========================================================== 11 · SUPRARENALA (HE) */
function makeSr() {
  srand(111);
  // glomerulară: cuiburi arcuite
  const arches = []; for (let x = 40; x < 1060; x += 150) { const P = []; for (let k = 0; k <= 14; k++) { const a = Math.PI + k / 14 * Math.PI; P.push([x + Math.cos(a) * 62, 196 + Math.sin(a) * 118]); } arches.push(sheet(resample(P, 10), false, () => 34, 1)); }
  // fasciculată: coloane de celule mari, palide, vacuolare
  const cols = []; for (let x = 20; x < 1040; x += 86) { const col = []; for (let y = 216, k = 0; y < 600; k++) { const h = rr(46, 56); col.push({ x, y, w: 70, h, vac: Array.from({ length: 6 }, () => [rr(-22, 22), rr(-14, 14), rr(4, 7)]) }); y += h + 3; } cols.push(col); }
  // reticulată: cordoane scurte, anastomozate
  const nodes = []; for (let k = 0; k < 26; k++) nodes.push([rr(-20, 1020), rr(615, 760)]);
  const edges = []; nodes.forEach((p, i) => { nodes.map((q, j) => [Math.hypot(p[0] - q[0], p[1] - q[1]), j]).filter(([d, j]) => j !== i && d < 170).sort((a, b) => a[0] - b[0]).slice(0, 2).forEach(([, j]) => { if (i < j) edges.push([p, nodes[j]]); }); });
  // medulara: cuiburi de celule cromafine
  const nests = []; for (let x = 60; x < 1040; x += 190) { const cx = x + rr(-20, 20), cy = rr(840, 880); const cells = []; for (let k = 0; k < 6; k++) { const a = k / 6 * TAU, r = k ? 48 : 0; cells.push([cx + Math.cos(a) * r * (k ? 1 : 0), cy + Math.sin(a) * r * 0.8]); } nests.push(cells.slice(1).concat([[cx, cy]])); }
  const pan = { y: 140 };
  return {
    A: { capsule: [820, 28], glom: [790, 140], fasc: [520, 400], ret: [600, 690], med: [770, 860] }, pan,
    draw(g, t, st = {}) {
      bgFill(g, '#f6d5e5', '#efc6da');
      // capsula
      g.save(); g.fillStyle = '#e890b9'; g.fillRect(-40, -60, 1080, 118); g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.moveTo(-40, 58); g.lineTo(1040, 58); g.stroke(); g.restore();
      for (let k = 0; k < 9; k++) paint(g, spindle(60 + k * 115, 28 + (k % 2) * 10, 54, 11, 0, t, k), HE.nuc, HE.nucS, null, bb(60 + k * 115, 30, 27, 6), OUT, 2);
      for (const a of arches) { for (const c of a) cellP(g, c.pts, '#b48fdc', '#9a74cc', null, 2.5, 4); for (const c of a) { const [x, y] = c.at(0.5); nuc(g, x, y, 7.5, 7.5, 0, 'hyper', t); } }
      // capilare (sinusoide) între coloane, cu hematii care coboară spre medulară
      for (let x = 20 - 43; x < 1080; x += 86) { g.save(); g.fillStyle = '#fbe9f1'; g.fillRect(x - 6, 214, 12, 392); g.restore(); for (let k = 0; k < 3; k++) { const u = ((REDUCED ? 0 : t * 0.06) + k / 3 + x * 0.001) % 1; rbc(g, x, lerp(220, 600, u), 0.42, Math.PI / 2, t); } }
      for (const col of cols) for (const c of col) { const pts = [[c.x - c.w / 2, c.y], [c.x + c.w / 2, c.y], [c.x + c.w / 2, c.y + c.h], [c.x - c.w / 2, c.y + c.h]]; const p = rpoly(pts, 8); g.save(); g.fillStyle = '#fbeaf3'; g.fill(p); g.strokeStyle = 'rgba(200,140,190,.75)'; g.lineWidth = 1.5; for (const [vx, vy, vr] of c.vac) { g.beginPath(); g.arc(c.x + vx, c.y + c.h / 2 + vy, vr, 0, 7); g.stroke(); } g.strokeStyle = '#d27fb0'; g.lineWidth = 3.5; g.stroke(p); g.strokeStyle = OUT; g.lineWidth = 1.5; g.stroke(p); g.restore(); nuc(g, c.x, c.y + c.h / 2, 10, 10, 0, 'eu', t); }
      g.save(); g.lineCap = 'round'; for (const [p, q] of edges) { g.strokeStyle = OUT; g.lineWidth = 40; g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(q[0], q[1]); g.stroke(); } for (const [p, q] of edges) { g.strokeStyle = '#df6ea3'; g.lineWidth = 33; g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(q[0], q[1]); g.stroke(); } g.restore();
      for (const [p, q] of edges) { const L = Math.hypot(q[0] - p[0], q[1] - p[1]); const n = Math.max(1, Math.round(L / 30)); for (let k = 0; k <= n; k++) { const x = lerp(p[0], q[0], k / n), y = lerp(p[1], q[1], k / n); nuc(g, x, y, 6.5, 6.5, 0, 'hyper', t); if (k % 2) { g.save(); g.fillStyle = '#8a5a2a'; g.beginPath(); g.arc(x + 9, y - 7, 3, 0, 7); g.fill(); g.restore(); } } }
      // medulara
      g.save(); g.fillStyle = '#ecd6ec'; g.fillRect(-40, 790, 1080, 300); g.restore();
      for (const ns of nests) for (const [x, y] of ns) { paint(g, blob(x, y, 30, 26, 0, t, 0.08, 7, x), '#a088d2', '#8a70c4', '#c8b6ee', bb(x, y, 30, 26), OUT, 3); g.save(); g.fillStyle = 'rgba(70,40,140,.45)'; for (let k = 0; k < 8; k++) { g.beginPath(); g.arc(x + Math.cos(k * 2.2) * 16, y + Math.sin(k * 2.2) * 13, 2, 0, 7); g.fill(); } g.restore(); nuc(g, x, y, 10, 10, 0, 'eu', t); }
    },
  };
}

/* =========================================================== 12 · INSULA LANGERHANS (HE, pancreas) */
function makePan() {
  const I = [560, 430, 190, 168]; srand(121);
  const inSept = (x, y) => { const ax = 650, ay = -30, bx = 1030, by = 430; const t2 = clamp(((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2)); return Math.hypot(x - lerp(ax, bx, t2), y - lerp(ay, by, t2)); };
  const AC = []; for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) { const x = c * 108 + (r % 2 ? 54 : 0) - 10 + rr(-10, 10), y = r * 98 + rr(-8, 8); if (((x - I[0]) / (I[2] + 55)) ** 2 + ((y - I[1]) / (I[3] + 55)) ** 2 < 1) continue; if (inSept(x, y) < 66) continue; AC.push([x, y, rr(46, 52), rr(0, 6.28)]); }
  const islet = []; for (let r = -12; r <= 12; r++) for (let c = -12; c <= 12; c++) { const x = I[0] + c * 30 + (r % 2 ? 15 : 0), y = I[1] + r * 26; if (((x - I[0]) / (I[2] - 14)) ** 2 + ((y - I[1]) / (I[3] - 14)) ** 2 > 1) continue; islet.push([x + rr(-3, 3), y + rr(-3, 3)]); }
  const icap = [crSample([[I[0] - 180, I[1] - 30], [I[0] - 60, I[1] - 70], [I[0] + 60, I[1] - 20], [I[0] + 200, I[1] - 60]], 10), crSample([[I[0] - 120, I[1] + 110], [I[0], I[1] + 70], [I[0] + 140, I[1] + 110]], 10)];
  const aHi = AC.reduce((b, a) => (Math.hypot(a[0] - 820, a[1] - 700) < Math.hypot(b[0] - 820, b[1] - 700) ? a : b));
  const duct = [[aHi[0], aHi[1]], [aHi[0] + 70, aHi[1] + 30], [aHi[0] + 140, aHi[1] + 25], [1060, aHi[1] + 50]];
  return {
    A: { islet: [I[0], I[1] - I[3] - 18], acin: [aHi[0], aHi[1] - aHi[2] - 16], sept: [900, 230], icap: icap[0][18] }, I, aHi, icap,
    draw(g, t, st = {}) {
      bgFill(g, '#d8b6e2', '#d0a9dc');
      // septul: fâșie albă (lobuli separați incomplet)
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 46; g.beginPath(); g.moveTo(650, -40); g.lineTo(1040, 440); g.stroke(); g.strokeStyle = '#fbf3f8'; g.lineWidth = 38; g.stroke(); g.strokeStyle = 'rgba(214,120,166,.6)'; g.lineWidth = 2; for (let k = -1; k <= 1; k++) { g.beginPath(); g.moveTo(650 + k * 10, -40); g.lineTo(1040 + k * 10, 440); g.stroke(); } g.restore();
      // canal din acin (secreția exocrină pleacă prin canal)
      g.save(); g.lineCap = 'round'; const dp = smooth(duct, false); g.strokeStyle = OUT; g.lineWidth = 36; g.stroke(dp); g.strokeStyle = '#c9a6e2'; g.lineWidth = 30; g.stroke(dp); g.strokeStyle = '#fff4fa'; g.lineWidth = 12; g.stroke(dp); g.restore();
      for (const [x, y, R, rot] of AC) acSer(g, x, y, R, t, { rot, n: 7, centro: true });
      // insula: capsulă foarte fină, celule mici, palide, în cuiburi, cu capilare
      g.save(); g.fillStyle = '#efe2f1'; g.beginPath(); g.ellipse(I[0], I[1], I[2], I[3], 0, 0, 7); g.fill(); g.restore();
      for (const p of icap) capillary(g, p, 18, t, { n: 4, nuclei: 2 });
      for (const [x, y] of islet) { paint(g, blob(x, y, 14, 12, 0, t, 0.08, 7, x), '#f4e9f5', '#e5d4ea', null, bb(x, y, 14, 12), '#a785bd', 1.6); nuc(g, x, y, 6, 6, 0, 'eu', t, false); }
      for (const p of icap) capillary(g, p, 18, t, { n: 4, nuclei: 0 });
      g.save(); g.strokeStyle = '#b28ac8'; g.lineWidth = 2.5; g.beginPath(); g.ellipse(I[0], I[1], I[2], I[3], 0, 0, 7); g.stroke(); g.restore();
      if (st.flow) {
        g.save();
        for (let k = 0; k < 8; k++) { const u = (t * 0.2 + k / 8) % 1; const P = crSample(duct, 10); const p = P[Math.floor(u * (P.length - 1))]; g.globalAlpha = Math.sin(u * Math.PI); g.fillStyle = '#ff7fb5'; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.arc(p[0], p[1], 6, 0, 7); g.fill(); g.stroke(); }
        for (let k = 0; k < 10; k++) { const u = (t * 0.18 + k / 10) % 1; const P = icap[k % 2]; const p = P[Math.floor(u * (P.length - 1))]; g.globalAlpha = Math.sin(u * Math.PI); g.fillStyle = '#ffe36e'; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.arc(p[0], p[1] - 10, 6, 0, 7); g.fill(); g.stroke(); }
        g.restore();
      }
    },
  };
}

const MAKERS = { pav: makePav, cub: makeCub, pri: makePri, ps: makePs, es: makeEs, uro: makeUro, tub: makeTub, seb: makeSeb, sub: makeSub, tir: makeTir, sr: makeSr, pan: makePan };
const CACHE = {};
export function field(k) { if (!CACHE[k]) CACHE[k] = MAKERS[k](); return CACHE[k]; }
// miniaturi statice (pentru copertă, DD, tabele): randate o singură dată
const TH = {};
export const FOCUS = { pav: [40, 0, 934], cub: [33, 0, 934], pri: [80, 60, 840], ps: [100, 150, 760], es: [80, 80, 860], uro: [100, 120, 760], tub: [70, 30, 870], seb: [40, 80, 860], sub: [33, 0, 934], tir: [33, 0, 934], sr: [33, 0, 934], pan: [33, 0, 934] };
export function thumb(k) {
  if (!TH[k]) { const c = document.createElement('canvas'); c.width = 620; c.height = 580; const x = c.getContext('2d'); x.scale(0.62, 0.62); try { field(k).draw(x, 0, {}); } catch (e) { console.error('thumb', k, e); } TH[k] = c; }
  return TH[k];
}
// desenează miniatura într-un cerc (câmp de microscop)
export function fieldThumb(g, k, x, y, r, ring = '#ffffff') {
  const th = thumb(k); const [sx, sy, sw] = FOCUS[k]; const s = 0.62;
  g.save(); g.beginPath(); g.arc(x, y, r, 0, 7); g.save(); g.clip(); g.fillStyle = '#100916'; g.fillRect(x - r, y - r, 2 * r, 2 * r);
  g.drawImage(th, sx * s, sy * s, sw * s, sw * s, x - r, y - r, 2 * r, 2 * r); g.restore();
  g.lineWidth = 10; g.strokeStyle = OUT; g.stroke(); g.lineWidth = 4; g.strokeStyle = ring; g.globalAlpha = 0.35; g.stroke(); g.restore();
}
export const fieldKeys = Object.keys(MAKERS);
void rot2; void wob;
