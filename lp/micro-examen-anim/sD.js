// Partea D: LP 6 Parazitologie (paginile 57–64 ale deck-ului de examen Micro): principiile, clasificarea, protozoarele intestinale
// și genitale, Toxoplasma, teniile + Echinococcus, trematodele + alte cestode, nematodele care intră pe gură, nematodele prin piele / carne / animale.
// Regula de corectitudine: înaintea fiecărei scene e scris ce TREBUIE să se vadă (gazde, pe unde intră, drumul prin corp, unde se oprește,
// ce ajunge în scaun, ordinea etapelor). Desenul urmează exact comentariul.
// Corpul uman e desenat din față: dreapta pacientului = stânga privitorului (ficatul și cecul sunt în stânga desenului).
import {
  HOME, cam, bg, panel, P, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead, testTube,
  OUT, clamp, lerp, ease, paint, smooth, REDUCED,
} from './mk.js';
import { field, blobPts } from './kit2d.js';

/* ------------------------------------------------------------------ utilitare */
const K = {
  skin: '#f3c29b', gut: '#f2b9a0', colon: '#d99a6b', liver: '#9c3b2f', lung: '#f4a7b3', heart: '#d2453f', brain: '#f2a7b5',
  worm: '#f4ead8', egg: '#c9963e', blood: '#d23a3a', lugol: '#e2a94a', pale: '#f3e6c4', soil: '#7a5634', leaf: '#5bb860',
  muc: '#f2b2a6', sub: '#e9938c', fat: '#ffd84a', red: '#ff6b5e', ok: '#4fc27a', cream: '#fff3e6', dim: '#c9b9ad', hi: '#ffe36e',
};
const A = (b, k) => b.i < 0 || b.i === k;
const vis = (b, k) => (b.i < 0 || b.i === k ? 1 : b.i > k ? 0.6 : 0.35);
function hl(g, x, y, w, h, act, o = {}) {
  panel(g, x, y, w, h, { r: 22, fill: o.fill || (act ? 'rgba(255,200,120,.13)' : 'rgba(255,240,228,.05)'), stroke: o.stroke || (act ? 'rgba(255,214,140,.8)' : 'rgba(255,230,210,.16)') });
}
const sm = (u, a, b2) => ease(clamp((u - a) / (b2 - a)));
// motor de timp „viu”: avansează doar cât e viu (live 0..1), ca organismele să se oprească pe loc când mor
function clock() { let last = null, m = 0; return (t, live = 1) => { const dt = last === null ? 0 : clamp(t - last, 0, 0.1); last = t; m += dt * live; return m; }; }
function cross(g, x, y, r, col = K.red, a = 1) { g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round'; for (const [c, w] of [[OUT, 14], [col, 8]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - r, y - r); g.lineTo(x + r, y + r); g.moveTo(x + r, y - r); g.lineTo(x - r, y + r); g.stroke(); } g.restore(); }
function check(g, x, y, r, col = K.ok, a = 1) { g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round'; g.lineJoin = 'round'; for (const [c, w] of [[OUT, 14], [col, 8]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - r, y); g.lineTo(x - r * 0.25, y + r * 0.7); g.lineTo(x + r, y - r * 0.8); g.stroke(); } g.restore(); }
function dash(g, pts, col, w = 4, a = 1, d = [10, 9]) { tube(g, pts, w, col, { ow: 0, dash: d, alpha: a }); }

/* ------------------------------------------------------------------ paraziți */
// trofozoit amoeboid: pseudopod spre direcția de mers; mort = rotund, cenușiu, nemișcat; o.rbc = hematii fagocitate (histolytica)
function amoeba(g, x, y, s, t, live, o = {}) {
  const n = 22, pts = []; const dir = o.dir ?? 0; const sd = o.seed || 0;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2; const d = Math.cos(a - dir);
    let r = 30 * s * (1 + 0.09 * Math.sin(a * 3 + t * 1.6 + sd));
    r *= 1 + 0.6 * Math.max(0, d) ** 6 * (0.75 + 0.25 * Math.sin(t * 2.4 + sd));
    r = lerp(27 * s, r, live);
    pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r]);
  }
  const p = smooth(pts);
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  paint(g, p, live > 0.4 ? (o.col || '#cfe3c8') : '#c8c2b2', null, '#f4fff0', [x - 30 * s, y - 30 * s, 60 * s, 60 * s], OUT, Math.max(2.5, 4 * s));
  const nx = x - Math.cos(dir) * 8 * s, ny = y - Math.sin(dir) * 8 * s;
  ell(g, nx, ny, 8.5 * s, 8.5 * s, '#eef6e8', { ow: Math.max(1.5, 2.5 * s) }); dot(g, nx, ny, 2.4 * s, OUT, { ow: 0 });
  (o.rbc || []).forEach(([dx, dy]) => dot(g, x + dx * s, y + dy * s, 6.5 * s, K.blood, { ow: Math.max(1.5, 2 * s) }));
  g.restore();
}
// chist: perete gros + n nuclei (inel cu cariozom central); o.col = culoarea (Lugol = galben-brun)
function cyst(g, x, y, r, n, o = {}) {
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  ell(g, x, y, r, r * (o.oval || 1), o.col || K.lugol, { ow: Math.max(3, r * 0.14), rot: o.rot || 0 });
  const shown = o.shown ?? n; const pos = [];
  if (n === 4) [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, c2]) => pos.push([a * r * 0.34, c2 * r * 0.34]));
  else if (n === 2) [[-1, 0], [1, 0]].forEach(([a]) => pos.push([a * r * 0.32, -r * 0.2]));
  else for (let k = 0; k < n; k++) { const a = (k / n) * Math.PI * 2 - Math.PI / 2; pos.push([Math.cos(a) * r * 0.58, Math.sin(a) * r * 0.58]); }
  pos.slice(0, Math.ceil(shown)).forEach(([dx, dy], k) => {
    const a = clamp(shown - k);
    ell(g, x + dx, y + dy, r * 0.15, r * 0.15, o.nuc || '#fbe7b6', { ow: Math.max(1.5, r * 0.05), sc: '#5a3410', alpha: a });
    dot(g, x + dx, y + dy, r * 0.045, '#5a3410', { ow: 0, alpha: a });
  });
  g.restore();
}
// Giardia: trofozoit în formă de pară, 2 nuclei („ochi”), discul adeziv în față, 4 perechi de flageli spre spate
function giardia(g, x, y, s, rot, t, a = 1) {
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.lineCap = 'round';
  for (let k = 0; k < 4; k++) { // flageli (perechi), spre posterior (−x)
    for (const sd of [-1, 1]) {
      const y0 = sd * (k === 3 ? 4 : 6 + k * 4), x0 = k === 3 ? -34 : -8 - k * 8; const pts = [];
      for (let j = 0; j <= 8; j++) { const u = j / 8; pts.push([x0 - u * 34, y0 + sd * u * (k === 3 ? 4 : 10) + Math.sin(u * 7 - t * 9 + k) * 4]); }
      g.strokeStyle = '#f4ead8'; g.lineWidth = 2.2; g.beginPath(); pts.forEach(([px, py], j) => (j ? g.lineTo(px, py) : g.moveTo(px, py))); g.stroke();
    }
  }
  const p = new Path2D(); p.moveTo(28, 0); p.bezierCurveTo(28, -22, 2, -26, -14, -16); p.bezierCurveTo(-28, -8, -36, -3, -38, 0); p.bezierCurveTo(-36, 3, -28, 8, -14, 16); p.bezierCurveTo(2, 26, 28, 22, 28, 0); p.closePath();
  paint(g, p, '#d8ecf2', null, '#ffffff', [-38, -24, 66, 48], OUT, 3.5);
  g.save(); g.setLineDash([4, 4]); g.strokeStyle = '#7fb0c0'; g.lineWidth = 2; g.beginPath(); g.ellipse(10, 0, 15, 17, 0, 0, 7); g.stroke(); g.restore(); // discul adeziv
  for (const sd of [-1, 1]) { ell(g, 10, sd * 8, 6, 5, '#f1f8fb', { ow: 2 }); dot(g, 10, sd * 8, 1.8, OUT, { ow: 0 }); }
  g.strokeStyle = '#7fb0c0'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, -2); g.lineTo(-34, -1); g.moveTo(0, 2); g.lineTo(-34, 1); g.stroke();
  g.restore();
}
// Trichomonas: pară, 4 flageli anteriori, membrana ondulantă pe o latură, axostilul iese posterior, 1 nucleu; NU are chist
function tricho(g, x, y, s, rot, t, a = 1) {
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.lineCap = 'round';
  for (let k = 0; k < 4; k++) { const pts = []; for (let j = 0; j <= 8; j++) { const u = j / 8; pts.push([26 + u * 36, (k - 1.5) * 4 + (k - 1.5) * u * 9 + Math.sin(u * 6 - t * 12 + k) * 4]); } g.strokeStyle = '#f4ead8'; g.lineWidth = 2.2; g.beginPath(); pts.forEach(([px, py], j) => (j ? g.lineTo(px, py) : g.moveTo(px, py))); g.stroke(); }
  g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(-26, 0); g.lineTo(-50, 0); g.stroke(); g.strokeStyle = '#e6eef0'; g.lineWidth = 2; g.stroke(); // axostil
  const p = new Path2D(); p.moveTo(28, 0); p.bezierCurveTo(28, -20, 0, -22, -16, -12); p.bezierCurveTo(-30, -4, -30, 4, -16, 12); p.bezierCurveTo(0, 22, 28, 20, 28, 0); p.closePath();
  paint(g, p, '#e7dcf6', null, '#ffffff', [-30, -22, 58, 44], OUT, 3.5);
  g.strokeStyle = '#9b7fd0'; g.lineWidth = 2.6; g.beginPath(); for (let j = 0; j <= 14; j++) { const u = j / 14; const px = 22 - u * 34; const py = -17 + u * 4 + Math.sin(u * 9 - t * 10) * 3; j ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); // membrana ondulantă
  ell(g, 12, 2, 8, 6, '#f6f0ff', { ow: 2 }); dot(g, 12, 2, 2, OUT, { ow: 0 });
  g.restore();
}
// ouă (dimensiune r): asc = Ascaris (coajă mamelonată brună), lemon = Trichuris (brun, dopuri la poli), oxy = Enterobius (asimetric, transparent),
// oper = operculat (capac la un pol), taenia = rotund, coajă striată radiar, embrion cu 6 croșete, hnana = Hymenolepis (filamente polare), hook = Ancylostoma (subțire, blastomere)
function egg(g, x, y, kind, r = 20, o = {}) {
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); g.translate(x, y); g.rotate(o.rot || 0);
  const ow = Math.max(2, r * 0.12);
  if (kind === 'asc') {
    const pts = []; for (let k = 0; k < 28; k++) { const a = (k / 28) * Math.PI * 2; const rr = 1 + 0.08 * Math.sin(a * 14); pts.push([Math.cos(a) * r * rr, Math.sin(a) * r * 0.8 * rr]); }
    paint(g, smooth(pts), '#a8742c', null, null, [-r, -r, 2 * r, 2 * r], OUT, ow);
    ell(g, 0, 0, r * 0.68, r * 0.52, '#e9cf8e', { ow: ow * 0.6 });
    if (o.larva) { g.strokeStyle = '#8a5a2b'; g.lineWidth = r * 0.12; g.beginPath(); g.ellipse(0, 0, r * 0.4, r * 0.26, 0, 0.3, 5.9); g.stroke(); }
    else ell(g, 0, 0, r * 0.36, r * 0.3, '#c99a4e', { ow: 0 });
  } else if (kind === 'lemon') {
    const p = new Path2D(); p.moveTo(-r, 0); p.bezierCurveTo(-r * 0.7, -r * 0.62, r * 0.7, -r * 0.62, r, 0); p.bezierCurveTo(r * 0.7, r * 0.62, -r * 0.7, r * 0.62, -r, 0); p.closePath();
    paint(g, p, '#9a5a22', null, '#c9874a', [-r, -r * 0.6, 2 * r, r * 1.2], OUT, ow);
    ell(g, 0, 0, r * 0.6, r * 0.3, '#c78a4a', { ow: 0 });
    for (const sd of [-1, 1]) ell(g, sd * r * 1.04, 0, r * 0.15, r * 0.17, '#f3e3b0', { ow: ow * 0.7 });
  } else if (kind === 'oxy') {
    const p = new Path2D(); p.moveTo(-r, 0); p.bezierCurveTo(-r, -r * 0.62, r, -r * 0.62, r, 0); p.bezierCurveTo(r, r * 0.4, -r, r * 0.4, -r, 0); p.closePath();
    paint(g, p, 'rgba(238,245,232,.92)', null, null, [-r, -r * 0.6, 2 * r, r], OUT, ow);
    if (o.larva) { g.strokeStyle = '#b08a5a'; g.lineWidth = r * 0.13; g.lineCap = 'round'; g.beginPath(); g.moveTo(-r * 0.6, 0); g.bezierCurveTo(-r * 0.2, -r * 0.45, r * 0.3, r * 0.25, r * 0.6, -r * 0.12); g.stroke(); }
    else ell(g, 0, -r * 0.08, r * 0.45, r * 0.24, '#d9cfb8', { ow: 0 });
  } else if (kind === 'oper') {
    const lift = o.open || 0;
    ell(g, 0, 0, r, r * 0.64, '#c99a3e', { ow: ow, light: '#f0c875' });
    ell(g, -r * 0.1, 0, r * 0.62, r * 0.4, '#e0b866', { ow: 0 });
    g.save(); g.translate(r * 0.78, 0); g.rotate(-lift * 0.8); g.translate(lift * r * 0.2, -lift * r * 0.2);
    g.strokeStyle = OUT; g.lineWidth = ow; g.beginPath(); g.moveTo(0, -r * 0.4); g.quadraticCurveTo(r * 0.36, 0, 0, r * 0.4); g.stroke(); g.restore();
  } else if (kind === 'taenia') {
    ell(g, 0, 0, r, r, '#8a5a2b', { ow: ow });
    g.strokeStyle = '#c99a5e'; g.lineWidth = Math.max(1, r * 0.06); for (let k = 0; k < 26; k++) { const a = (k / 26) * Math.PI * 2; g.beginPath(); g.moveTo(Math.cos(a) * r * 0.66, Math.sin(a) * r * 0.66); g.lineTo(Math.cos(a) * r * 0.92, Math.sin(a) * r * 0.92); g.stroke(); }
    ell(g, 0, 0, r * 0.6, r * 0.6, '#e8d5a8', { ow: ow * 0.5 });
    g.strokeStyle = OUT; g.lineWidth = Math.max(1, r * 0.06); for (const [dx, dy] of [[-0.2, -0.2], [0, -0.26], [0.2, -0.2]]) { g.beginPath(); g.moveTo(dx * r, dy * r); g.lineTo(dx * r * 1.4, dy * r * 1.9); g.stroke(); g.beginPath(); g.moveTo(dx * r, -dy * r); g.lineTo(dx * r * 1.4, -dy * r * 1.9); g.stroke(); }
  } else if (kind === 'hnana') {
    ell(g, 0, 0, r, r * 0.84, 'rgba(240,244,230,.92)', { ow: ow });
    g.strokeStyle = '#a8946a'; g.lineWidth = Math.max(1, r * 0.05); for (const sd of [-1, 1]) for (let k = -2; k <= 2; k++) { g.beginPath(); g.moveTo(0, sd * r * 0.42); g.quadraticCurveTo(k * r * 0.3, sd * r * 0.62, k * r * 0.45, sd * r * 0.2 * (k % 2 ? 1 : 0.4)); g.stroke(); }
    ell(g, 0, 0, r * 0.46, r * 0.4, '#e3d6aa', { ow: ow * 0.6 });
    for (const sd of [-1, 1]) dot(g, 0, sd * r * 0.42, r * 0.07, '#a8946a', { ow: 0 });
  } else if (kind === 'hook') {
    ell(g, 0, 0, r, r * 0.6, 'rgba(240,244,236,.92)', { ow: ow });
    for (const [dx, dy] of [[-0.3, -0.15], [0, -0.18], [0.3, -0.15], [-0.15, 0.15], [0.15, 0.15]]) ell(g, dx * r, dy * r, r * 0.17, r * 0.17, '#bdb6a6', { ow: ow * 0.5 });
  }
  g.restore();
}
// vierme cilindric cu capete subțiri; pts = puncte de control; o.thin = fracția anterioară subțire (Trichuris)
function worm(g, pts, w, col = K.worm, o = {}) {
  const Pc = curve(pts, 10); const n = Pc.length;
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); g.lineCap = 'round';
  const wid = (u) => (o.thin ? (u < o.thin ? 0.32 : 0.32 + 0.68 * sm(u, o.thin, o.thin + 0.12)) * (0.6 + 0.4 * Math.sin(Math.PI * Math.min(1, u * 0.5 + 0.5))) : 0.3 + 0.7 * Math.sin(Math.PI * u) ** 0.45);
  for (const pass of [0, 1]) for (let k = 1; k < n; k++) {
    const u = k / (n - 1); const ww = w * wid(u);
    g.strokeStyle = pass ? col : OUT; g.lineWidth = pass ? ww : ww + (o.ow ?? 5);
    g.beginPath(); g.moveTo(Pc[k - 1][0], Pc[k - 1][1]); g.lineTo(Pc[k][0], Pc[k][1]); g.stroke();
  }
  g.restore(); return Pc;
}
function larva(g, x, y, len, rot, t, col = '#f4ead8', a = 1) {
  const pts = []; for (let k = 0; k <= 6; k++) { const d = (k / 6 - 0.5) * len; const off = Math.sin(k * 1.3 + t * 9) * len * 0.09; pts.push([x + Math.cos(rot) * d - Math.sin(rot) * off, y + Math.sin(rot) * d + Math.cos(rot) * off]); }
  worm(g, pts, Math.max(4, len * 0.13), col, { alpha: a, ow: 3 });
}
// larvă de Trichinella închistată: capsulă „în lămâie” cu larva spiralată
function trichCyst(g, x, y, r, t, a = 1) {
  g.save(); g.globalAlpha = clamp(a);
  const p = new Path2D(); p.moveTo(x - r * 1.5, y); p.bezierCurveTo(x - r, y - r, x + r, y - r, x + r * 1.5, y); p.bezierCurveTo(x + r, y + r, x - r, y + r, x - r * 1.5, y); p.closePath();
  paint(g, p, 'rgba(250,240,220,.92)', null, null, [x - r, y - r, 2 * r, 2 * r], OUT, 3);
  g.strokeStyle = OUT; g.lineWidth = r * 0.22 + 2.5; const sp = () => { g.beginPath(); for (let k = 0; k <= 40; k++) { const u = k / 40; const a2 = u * Math.PI * 4 + t * 0.6; const rr = r * 0.55 * (0.35 + 0.65 * u); const px = x + Math.cos(a2) * rr * 1.15, py = y + Math.sin(a2) * rr * 0.6; k ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); };
  sp(); g.strokeStyle = '#f0d9a8'; g.lineWidth = r * 0.22; sp();
  g.restore();
}
// teniă: scolex la u=0 (ventuze), proglote din ce în ce mai mari spre capătul liber
function strobila(g, Pc, u1, o = {}) {
  const N = o.n || 20; const W0 = o.w || 14;
  for (let k = N - 1; k >= 1; k--) {
    const u = (k / N) * u1; if (u <= 0) continue; const [x, y, a] = at(Pc, u); const f = k / N;
    const w = lerp(W0 * 0.35, W0, f), l = lerp(W0 * 0.2, W0 * (o.long || 0.9), f);
    g.save(); g.translate(x, y); g.rotate(a); const p = new Path2D(); p.roundRect(-l / 2, -w / 2, l, w, 3); paint(g, p, o.col || K.worm, null, null, [-l / 2, -w / 2, l, w], OUT, 2.5); g.restore();
  }
  const [x0, y0] = at(Pc, 0); ell(g, x0, y0, W0 * 0.42, W0 * 0.42, o.col || K.worm, { ow: 2.5 }); dot(g, x0 - 2, y0 - 2, W0 * 0.1, '#b9a07a', { ow: 0 }); dot(g, x0 + 2, y0 + 2, W0 * 0.1, '#b9a07a', { ow: 0 });
}
// gălbeaza (trematod): frunză cu ventuză orală și ventrală
function fluke(g, x, y, s, rot, t) {
  g.save(); g.translate(x, y); g.rotate(rot + Math.sin(t * 2) * 0.06); g.scale(s, s);
  const p = new Path2D(); p.moveTo(40, 0); p.bezierCurveTo(36, -8, 26, -10, 22, -14); p.bezierCurveTo(4, -22, -30, -16, -40, 0); p.bezierCurveTo(-30, 16, 4, 22, 22, 14); p.bezierCurveTo(26, 10, 36, 8, 40, 0); p.closePath();
  paint(g, p, '#d9a77c', null, '#f3d0ad', [-40, -22, 80, 44], OUT, 3.5);
  g.strokeStyle = '#b07a52'; g.lineWidth = 1.6; for (let k = -3; k <= 3; k++) { g.beginPath(); g.moveTo(14, 0); g.quadraticCurveTo(-10, k * 4, -30, k * 3); g.stroke(); }
  dot(g, 34, 0, 3.5, '#f3d0ad', { ow: 2 }); dot(g, 18, 0, 4.5, '#f3d0ad', { ow: 2 });
  g.restore();
}

/* ------------------------------------------------------------------ animale + obiecte (desen din profil, spre dreapta) */
function legs(g, xs, y0, len, col, w = 12) { xs.forEach((x) => tube(g, [[x, y0], [x, y0 + len]], w, col, { ow: 5 })); }
function cat(g, x, y, s, t) {
  g.save(); g.translate(x, y); g.scale(s, s);
  tube(g, [[-62, -6], [-92, -30], [-96, -70 + Math.sin(t * 2) * 6]], 13, '#e9a55a', { ow: 6 });
  legs(g, [-42, -20, 26, 46], 22, 32, '#e9a55a', 14);
  ell(g, 0, 0, 70, 38, '#e9a55a', { ow: 6, light: '#ffd29a' });
  for (const k of [-30, -8, 14]) { g.strokeStyle = '#c47a32'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(k, -34); g.lineTo(k + 6, -12); g.stroke(); }
  for (const ex of [52, 88]) { g.fillStyle = '#e9a55a'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.moveTo(ex - 13, -50); g.lineTo(ex, -80); g.lineTo(ex + 13, -50); g.closePath(); g.fill(); g.stroke(); }
  ell(g, 70, -36, 36, 31, '#e9a55a', { ow: 6, light: '#ffd29a' });
  dot(g, 62, -42, 4.5, OUT, { ow: 0 }); dot(g, 86, -42, 4.5, OUT, { ow: 0 }); dot(g, 96, -30, 4, '#e2569f', { ow: 0 });
  g.restore();
}
function dog(g, x, y, s, t, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s); const c = o.col || '#b9814e';
  tube(g, [[-66, -14], [-84, -40], [-80, -62 + Math.sin(t * 6) * 6]], 11, c, { ow: 6 });
  legs(g, [-48, -24, 30, 52], 20, 40, c, 16);
  ell(g, 0, 0, 76, 38, c, { ow: 6, light: '#e0b080' });
  ell(g, 82, -34, 34, 30, c, { ow: 6, light: '#e0b080' }); ell(g, 112, -26, 22, 15, c, { ow: 5 });
  dot(g, 130, -30, 6, OUT, { ow: 0 }); dot(g, 88, -42, 4.5, OUT, { ow: 0 });
  ell(g, 68, -30, 11, 24, '#7a4f2a', { ow: 5, rot: 0.3 });
  g.restore();
}
function pig(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.strokeStyle = OUT; g.lineWidth = 9; g.beginPath(); g.arc(-84, -10, 10, 0.5, 5.6); g.stroke(); g.strokeStyle = '#f4a6b8'; g.lineWidth = 4; g.stroke();
  legs(g, [-46, -22, 26, 50], 26, 28, '#f4a6b8', 16);
  ell(g, 0, 0, 80, 48, '#f4a6b8', { ow: 6, light: '#ffd4de' });
  ell(g, 76, -12, 36, 34, '#f4a6b8', { ow: 6 });
  g.fillStyle = '#f4a6b8'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.moveTo(58, -38); g.lineTo(66, -62); g.lineTo(80, -40); g.closePath(); g.fill(); g.stroke();
  ell(g, 110, -8, 12, 16, '#e98aa0', { ow: 5 }); dot(g, 108, -13, 2.5, OUT, { ow: 0 }); dot(g, 108, -3, 2.5, OUT, { ow: 0 }); dot(g, 82, -22, 4, OUT, { ow: 0 });
  g.restore();
}
function cow(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  tube(g, [[-80, -20], [-92, 20]], 7, '#ffffff', { ow: 5 });
  legs(g, [-56, -30, 30, 56], 24, 38, '#ffffff', 16);
  ell(g, 0, 0, 84, 46, '#ffffff', { ow: 6 });
  for (const [dx, dy, r] of [[-30, -12, 18], [20, 10, 14], [44, -20, 12]]) ell(g, dx, dy, r, r * 0.8, '#2a2226', { ow: 0 });
  ell(g, 92, -30, 28, 34, '#ffffff', { ow: 6 }); ell(g, 100, -6, 22, 16, '#f2a6b0', { ow: 5 });
  for (const sd of [-1, 1]) tube(g, [[92 + sd * 14, -58], [92 + sd * 26, -74]], 7, '#efe2c2', { ow: 4 });
  dot(g, 88, -36, 4, OUT, { ow: 0 });
  g.restore();
}
function mouse(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  tube(g, [[-36, 4], [-62, 10], [-80, -2]], 4, '#d79aa4', { ow: 3 });
  ell(g, 0, 0, 40, 23, '#b8b0a8', { ow: 5 }); ell(g, 36, -8, 22, 17, '#b8b0a8', { ow: 5 }); ell(g, 28, -26, 12, 12, '#e8b7bf', { ow: 4 });
  dot(g, 44, -12, 3, OUT, { ow: 0 }); dot(g, 58, -6, 3.5, '#e2569f', { ow: 0 });
  g.restore();
}
function fish(g, x, y, s, t) {
  g.save(); g.translate(x, y); g.scale(s, s); g.rotate(Math.sin(t * 2) * 0.05);
  g.fillStyle = '#4f8fd0'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.moveTo(-60, 0); g.lineTo(-92, -26); g.lineTo(-92, 26); g.closePath(); g.fill(); g.stroke();
  ell(g, 0, 0, 70, 30, '#6aa8d8', { ow: 6, light: '#c8e4f6' }); dot(g, 46, -6, 5, '#fff', { ow: 3 }); dot(g, 47, -6, 2, OUT, { ow: 0 });
  g.restore();
}
function flea(g, x, y, s, t) {
  g.save(); g.translate(x, y); g.scale(s, s); g.lineCap = 'round';
  for (const [x0, x1, y1] of [[-6, -26, 32], [6, 0, 30], [14, 24, 28]]) { g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(x0, 8); g.lineTo((x0 + x1) / 2 - 6, 20); g.lineTo(x1, y1); g.stroke(); g.strokeStyle = '#8a5a2e'; g.lineWidth = 3; g.stroke(); }
  ell(g, 0, 0, 26, 18, '#7a4a24', { ow: 4, rot: -0.2, light: '#b07a48' }); ell(g, 26, -8, 9, 8, '#7a4a24', { ow: 3 });
  g.restore();
}
function louse(g, x, y, s, t) {
  g.save(); g.translate(x, y); g.scale(s, s); g.lineCap = 'round';
  for (let k = 0; k < 3; k++) for (const sd of [-1, 1]) { const w = Math.sin(t * 8 + k * 2 + sd) * 4; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(sd * 8, -6 + k * 9); g.lineTo(sd * 26, -12 + k * 12 + w); g.lineTo(sd * 30, -2 + k * 12 + w); g.stroke(); g.strokeStyle = '#c9a27a'; g.lineWidth = 3; g.stroke(); }
  ell(g, 0, 18, 18, 26, '#c9a27a', { ow: 4 }); ell(g, 0, -8, 12, 10, '#c9a27a', { ow: 4 }); ell(g, 0, -24, 8, 9, '#c9a27a', { ow: 4 });
  for (let k = 0; k < 3; k++) { g.strokeStyle = '#9a744a'; g.lineWidth = 2; g.beginPath(); g.moveTo(-14, 10 + k * 10); g.lineTo(14, 10 + k * 10); g.stroke(); }
  g.restore();
}
function lettuce(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  for (const [dx, dy, r, c] of [[-22, 6, 26, '#4fae5a'], [22, 6, 26, '#4fae5a'], [0, -8, 28, '#6cc86f'], [0, 14, 22, '#8ad87f']]) { const pts = []; for (let k = 0; k < 16; k++) { const a = (k / 16) * Math.PI * 2; const rr = r * (1 + 0.12 * Math.sin(a * 6)); pts.push([dx + Math.cos(a) * rr, dy + Math.sin(a) * rr * 0.8]); } paint(g, smooth(pts), c, null, null, [dx - r, dy - r, 2 * r, 2 * r], OUT, 4); }
  g.restore();
}
function cress(g, x, y, s, dots = 0) {
  g.save(); g.translate(x, y); g.scale(s, s);
  for (let k = -2; k <= 2; k++) { tube(g, [[k * 10, 40], [k * 18, -10]], 4, '#3c8a3e', { ow: 3 }); ell(g, k * 18, -16, 14, 11, '#5bb860', { ow: 3 }); ell(g, k * 14 + 8, 8, 10, 8, '#5bb860', { ow: 3 }); }
  for (let k = 0; k < dots; k++) dot(g, -34 + (k * 23) % 70, -20 + (k * 13) % 34, 4, '#fffbe6', { ow: 2 });
  g.restore();
}
function meat(g, x, y, s, cysts = 0, t = 0) {
  g.save(); g.translate(x, y); g.scale(s, s);
  const p = new Path2D(); p.moveTo(-46, -20); p.bezierCurveTo(-20, -40, 30, -36, 48, -14); p.bezierCurveTo(56, 10, 30, 32, 0, 30); p.bezierCurveTo(-34, 30, -56, 8, -46, -20); p.closePath();
  paint(g, p, '#d8505a', null, '#f08a90', [-50, -36, 100, 66], OUT, 5);
  g.strokeStyle = '#fbe3d6'; g.lineWidth = 5; g.beginPath(); g.moveTo(-36, -14); g.bezierCurveTo(-10, -26, 24, -22, 38, -8); g.stroke();
  for (let k = 0; k < cysts; k++) ell(g, -26 + k * 18, 8 + (k % 2) * 8, 6, 5, '#fffbe6', { ow: 2 });
  g.restore();
}
function cup(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); const p = new Path2D(); p.moveTo(-24, -30); p.lineTo(24, -30); p.lineTo(18, 30); p.lineTo(-18, 30); p.closePath(); g.fillStyle = 'rgba(200,235,255,.25)'; g.fill(p); g.fillStyle = '#7cc2ea'; g.fillRect(-21, -8, 42, 36); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(p); g.restore(); }
function hand(g, x, y, s, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  for (let k = 0; k < 4; k++) tube(g, [[-12 + k * 9, -6], [-14 + k * 9, -34 + Math.abs(k - 1.5) * 4]], 9, K.skin, { ow: 5 });
  tube(g, [[-20, 6], [-34, -10]], 10, K.skin, { ow: 5 });
  ell(g, 0, 10, 26, 22, K.skin, { ow: 5 });
  g.restore();
}
function slideGlass(g, x, y, w, h, a = 1) { g.save(); g.globalAlpha = clamp(a); const p = new Path2D(); p.roundRect(x - w / 2, y - h / 2, w, h, 5); g.fillStyle = 'rgba(210,240,255,.35)'; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(p); g.restore(); }
function stool(g, x, y, s, a = 1) { g.save(); g.globalAlpha = clamp(a); for (const [dx, dy, r] of [[0, 10, 26], [-4, -8, 19], [2, -22, 12]]) ell(g, x + dx * s, y + dy * s, r * s * 1.3, r * s * 0.75, '#8a5a2e', { ow: 4 }); g.restore(); }

/* ------------------------------------------------------------------ corpul uman (din față) */
const BODY = {
  mouth: [0, 104], brain: [0, 46], eye: [-20, 76], pharynx: [0, 124], trachBot: [0, 212],
  lungR: [-58, 255], lungL: [58, 255], heart: [22, 298], liver: [-55, 330], stomach: [55, 333], duo: [-16, 372],
  jej: [20, 440], cecum: [-86, 500], anus: [0, 548], calf: [-66, 745], deltoid: [-138, 205], footR: [-84, 852], footL: [84, 852], vena: [6, 420],
};
const GI = [[0, 106], [8, 135], [12, 230], [38, 300], [55, 333], [22, 350], [-4, 356], [-18, 372], [-6, 388], [16, 390]];
const SI = [[16, 390], [42, 420], [-36, 432], [42, 452], [-44, 466], [34, 482], [-52, 490], [-76, 496]];
const bp = (B, p) => [B.x + (typeof p === 'string' ? BODY[p] : p)[0] * B.s, B.y + (typeof p === 'string' ? BODY[p] : p)[1] * B.s];
const bpath = (B, pts) => curve(pts.map((p) => bp(B, p)));
function body(g, B, o = {}) {
  g.save(); g.globalAlpha = o.alpha ?? 1; g.translate(B.x, B.y); g.scale(B.s, B.s);
  const sk = o.skin || K.skin; const S = (pts, w, c, oo = {}) => tube(g, pts, w, c, { ow: 7, ...oo });
  [-1, 1].forEach((s) => {
    S([[s * 120, 192], [s * 158, 340], [s * 172, 492]], 44, sk); ell(g, s * 176, 510, 24, 27, sk, { ow: 6 });
    S([[s * 62, 520], [s * 68, 690], [s * 72, 830]], 66, sk); ell(g, s * 86, 852, 42, 18, sk, { ow: 6 });
  });
  const tor = new Path2D(); tor.roundRect(-136, 160, 272, 392, [70, 70, 56, 56]); paint(g, tor, sk, null, null, [-136, 160, 272, 392], OUT, 7);
  const nk = new Path2D(); nk.rect(-24, 112, 48, 56); g.fillStyle = sk; g.fill(nk);
  ell(g, 0, 66, 56, 64, sk, { ow: 7 });
  if (o.organs !== false) {
    ell(g, 0, 44, 40, 26, K.brain, { ow: 4, alpha: 0.9 });
    for (const sd of [-1, 1]) { ell(g, sd * 20, 78, 9, 7, '#ffffff', { ow: 3 }); dot(g, sd * 20, 78, 3.5, '#3a5a8a', { ow: 0 }); }
    g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(0, 98, 10, 0.3, Math.PI - 0.3); g.stroke();
    ell(g, -58, 255, 46, 72, K.lung, { ow: 5 }); ell(g, 58, 255, 44, 70, K.lung, { ow: 5 });
    S([[8, 128], [12, 230], [38, 300]], 11, '#e6a08e', { ow: 5 });
    ell(g, 22, 298, 25, 23, K.heart, { ow: 5 });
    S([[0, 124], [0, 214]], 13, '#f6dccd', { ow: 5 }); S([[0, 212], [-30, 236]], 9, '#f6dccd', { ow: 4 }); S([[0, 212], [30, 236]], 9, '#f6dccd', { ow: 4 });
    ell(g, -55, 330, 70, 30, K.liver, { ow: 5, light: '#c45a4a' });
    ell(g, 55, 333, 34, 26, '#e9a07f', { ow: 5, rot: -0.4 });
    S([[-86, 505], [-86, 405], [86, 405], [86, 488], [40, 508], [0, 518], [0, 540]], 20, K.colon, { ow: 5 });
    ell(g, -86, 502, 17, 15, K.colon, { ow: 5 });
    S(SI, 13, K.gut, { ow: 5 });
    S([[22, 350], [-4, 356], [-18, 372], [-6, 388], [16, 390]], 13, '#f0a87e', { ow: 5 });
  }
  g.restore();
}

/* ==================================================================== D1 · PRINCIPII
CE TREBUIE SĂ SE VADĂ
 1 Scaun DIAREIC proaspăt: în câmpul microscopic, trofozoiți (amibe) care scot pseudopode și se deplasează; ceasul avansează și,
   pe măsură ce trece timpul, ei se rotunjesc, devin cenușii și se OPRESC pe loc (mor) → de aceea se examinează imediat.
 2 Scaun FORMAT: chisturi rotunde cu perete gros și 4 nuclei (se colorează galben-brun când picurăm Lugol) + ouă de helminți (ou de Ascaris,
   coajă mamelonată brună). Nimic nu se mișcă: sunt formele de rezistență.
 3 Concentrarea: direct = o picătură cu 1 ou; strat gros (Kato-Miura) = mai multă probă, mai multe ouă; flotație (Willis-Hung) = ouăle URCĂ
   din sediment la suprafața lichidului și se lipesc de lamelă.
 4 Repetarea: axa zilelor 1–7; ouăle ies în pulsuri (zilele 2 și 5). Examenul din ziua 1 și 3 cad între pulsuri = negativ (✗), cel din ziua 5 = pozitiv (✓).
 5 Unde NU e în scaun: chistul hidatic (ficat) → sonda de ecografie (imagistică); Toxoplasma → eprubetă cu sânge și anticorpi (serologie);
   Trichinella → mușchi striat cu larva spiralată în capsulă (biopsie). */
export function d_stool() {
  const TR = [[150, 165, 0.3, 0.2], [228, 140, 2.5, 1.7], [196, 238, 4.1, 3.1], [262, 214, 5.6, 4.4]];
  const mc = clock();
  return {
    home: HOME,
    anchors: [[46, 48], [536, 48], [46, 378], [536, 378], [46, 692]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5);
      // 1 · DIAREIC
      hl(g, 20, 20, 470, 320, A(b, 0));
      txt(g, 'SCAUN DIAREIC, PROASPĂT', 260, 50, 20, '#ffd9a8');
      const age = b.i === 0 ? clamp(b.bt / (b.bd * 0.85)) : loopT(t, 9);
      const live = 1 - sm(age, 0.45, 0.85); const m = mc(t, live);
      field(g, 200, 196, 116, () => {
        g.fillStyle = '#efe0bd'; g.fillRect(70, 70, 260, 260);
        TR.forEach(([x, y, dir, ph], j) => { const s = Math.sin(m * 0.45 + ph); const d = Math.cos(m * 0.45 + ph) >= 0 ? dir : dir + Math.PI; amoeba(g, x + Math.cos(dir) * s * 30, y + Math.sin(dir) * s * 22, 0.95, m * 2, live, { dir: d, seed: j, rbc: j % 2 ? [[8, 8]] : [] }); });
      });
      // ceasul: acul se rotește cu timpul
      const cx = 400, cy = 150; ell(g, cx, cy, 44, 44, '#fff3e6', { ow: 5 });
      g.save(); g.strokeStyle = OUT; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx, cy); const ang = -Math.PI / 2 + age * Math.PI * 2; g.lineTo(cx + Math.cos(ang) * 32, cy + Math.sin(ang) * 32); g.stroke(); g.restore();
      txt(g, live > 0.5 ? 'proaspăt' : 'după un timp', cx, 218, 19, live > 0.5 ? K.ok : K.red);
      txt(g, live > 0.5 ? 'se mișcă' : 'nu se mai\nmișcă', cx, 262, 18, K.cream, { w: 700 });
      txt(g, '→ trofozoiți mobili', 200, 322, 20, K.hi);
      // 2 · FORMAT
      hl(g, 510, 20, 470, 320, A(b, 1));
      txt(g, 'SCAUN FORMAT', 745, 50, 20, '#ffd9a8');
      const lug = b.i === 1 ? sm(b.bt / b.bd, 0.15, 0.55) : b.i < 0 ? sm(loopT(t, 7), 0.2, 0.5) : 1;
      const lc = lug > 0.5 ? K.lugol : '#e9ecdf';
      field(g, 680, 196, 116, () => {
        g.fillStyle = '#e8dcc0'; g.fillRect(560, 70, 260, 260);
        cyst(g, 628, 150, 26, 4, { col: lc }); cyst(g, 700, 250, 24, 4, { col: lc }); cyst(g, 615, 245, 22, 4, { col: lc });
        egg(g, 718, 150, 'asc', 34);
      });
      if (lug > 0 && lug < 1) { const dy = lerp(70, 130, lug); dot(g, 680, dy, 9, '#7a4a14', { alpha: 1 - lug }); }
      lead(g, 752, 150, 850, 130); lead(g, 724, 250, 850, 240);
      txt(g, 'ou\n(helminți)', 905, 130, 18, K.cream, { w: 700 }); txt(g, 'chist\n(protozoare)', 905, 240, 18, K.cream, { w: 700 });
      txt(g, '+ Lugol', 905, 190, 17, '#e9b25a', { alpha: lug });
      txt(g, '→ chisturi + ouă', 680, 322, 20, K.hi);
      // 3 · CONCENTRAREA
      hl(g, 20, 350, 470, 300, A(b, 2));
      txt(g, 'CONCENTRAREA', 255, 378, 20, '#ffd9a8');
      const c3 = p(2);
      field(g, 105, 488, 66, () => { g.fillStyle = '#ece0c2'; g.fillRect(30, 410, 150, 150); egg(g, 110, 492, 'asc', 20); });
      txt(g, 'direct:\no picătură', 105, 590, 17, K.cream, { w: 700 });
      field(g, 245, 488, 66, () => { g.fillStyle = '#c9ad7e'; g.fillRect(170, 410, 150, 150); [[220, 462], [270, 470], [236, 520], [278, 516]].forEach(([x, y], j) => egg(g, x, y, 'asc', 17, { alpha: clamp(c3 * 4 - j) })); });
      txt(g, 'strat gros\n(Kato-Miura)', 245, 590, 17, K.cream, { w: 700 });
      testTube(g, 395, 420, 64, 150, '#dcefee', { level: 0.86 });
      ell(g, 395, 548, 24, 12, '#8a5a2e', { ow: 0 });
      g.save(); g.fillStyle = 'rgba(200,240,255,.7)'; g.strokeStyle = OUT; g.lineWidth = 3; g.fillRect(358, 425, 74, 7); g.strokeRect(358, 425, 74, 7); g.restore();
      for (let j = 0; j < 4; j++) { const u = clamp(c3 * 1.4 - j * 0.12); egg(g, 381 + j * 9, lerp(540, 446 + (j % 2) * 7, ease(u)), 'asc', 9); }
      txt(g, 'flotație\n(Willis-Hung)', 395, 612, 17, K.cream, { w: 700 });
      // 4 · REPETAREA
      hl(g, 510, 350, 470, 300, A(b, 3));
      txt(g, 'REPETAREA', 745, 378, 20, '#ffd9a8');
      const dx = (d) => 550 + ((d - 1) / 6) * 390; const Y0 = 560;
      g.save(); g.strokeStyle = '#e8d8c8'; g.lineWidth = 4; g.beginPath(); g.moveTo(535, Y0); g.lineTo(955, Y0); g.stroke(); g.restore();
      for (let d = 1; d <= 7; d++) { dot(g, dx(d), Y0, 4, '#e8d8c8', { ow: 0 }); txt(g, `${d}`, dx(d), Y0 + 24, 16, K.dim, { w: 700 }); }
      txt(g, 'zile', 958, Y0 + 24, 15, K.dim, { w: 600 });
      [2, 5].forEach((d) => { const x = dx(d); g.save(); g.fillStyle = 'rgba(201,150,62,.35)'; g.beginPath(); g.moveTo(x - 34, Y0); g.quadraticCurveTo(x, Y0 - 150, x + 34, Y0); g.fill(); g.restore(); egg(g, x - 8, Y0 - 28, 'asc', 9); egg(g, x + 9, Y0 - 44, 'asc', 9); egg(g, x + 2, Y0 - 66, 'asc', 9); });
      const cur = b.i === 3 ? 1 + 6 * clamp(b.bt / (b.bd * 0.8)) : b.i < 0 ? 1 + 6 * loopT(t, 8) : 7;
      g.save(); g.strokeStyle = K.hi; g.lineWidth = 3; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(dx(cur), 410); g.lineTo(dx(cur), Y0); g.stroke(); g.restore();
      [[1, false], [3, false], [5, true]].forEach(([d, pos], k) => { const a = cur >= d ? 1 : 0.18; pill(g, dx(d), 432, 64, 40, '#fff3e6', '', { alpha: a, ow: 4 }); txt(g, `ex. ${k + 1}`, dx(d), 404, 15, K.cream, { alpha: a, w: 700 }); if (cur >= d) (pos ? check : cross)(g, dx(d), 432, 11); });
      txt(g, 'negativ ≠ absent → repeți', 745, 622, 19, K.hi);
      // 5 · NU E ÎN SCAUN
      hl(g, 20, 665, 960, 250, A(b, 4));
      txt(g, 'UNII PARAZIȚI NU APAR ÎN SCAUN', 500, 694, 20, '#ffd9a8');
      stool(g, 70, 790, 0.9); cross(g, 70, 790, 24, K.red);
      // chistul hidatic în ficat + sonda de ecografie
      const L = new Path2D(); L.moveTo(150, 760); L.bezierCurveTo(200, 720, 300, 730, 320, 770); L.bezierCurveTo(320, 820, 250, 840, 200, 830); L.bezierCurveTo(150, 820, 130, 790, 150, 760); L.closePath();
      paint(g, L, K.liver, null, '#c45a4a', [130, 720, 190, 120], OUT, 5);
      ell(g, 250, 785, 34, 30, '#f6efd2', { ow: 4 }); for (const [ax, ay] of [[240, 778], [258, 792], [252, 772]]) ell(g, ax, ay, 7, 7, '#efe2b0', { ow: 2 });
      g.save(); const py = 728 + Math.sin(t * 3) * 3; const pr = new Path2D(); pr.roundRect(282, py - 46, 26, 46, 8); g.fillStyle = '#d7dde2'; g.fill(pr); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(pr); g.restore();
      for (let k = 0; k < 3; k++) { const u = ((REDUCED ? 0.5 : t * 0.8) + k / 3) % 1; g.save(); g.globalAlpha = 1 - u; g.strokeStyle = '#9fe0ff'; g.lineWidth = 3; g.beginPath(); g.arc(295, 734, 14 + u * 40, Math.PI * 0.55, Math.PI * 0.95); g.stroke(); g.restore(); }
      txt(g, 'chistul hidatic\n→ imagistică', 235, 875, 18, K.cream, { w: 700 });
      // Toxoplasma: eprubetă cu sânge + anticorpi
      testTube(g, 470, 728, 40, 110, K.blood, { level: 0.75, top: '#f3d36a', topH: 0.32 });
      for (let k = 0; k < 4; k++) { const u = (t * 0.3 + k / 4) % 1; const ax = 530 + k * 22, ay = 780 + Math.sin(t * 2 + k) * 14; g.save(); g.translate(ax, ay); g.rotate(Math.sin(t + k) * 0.4); g.lineCap = 'round'; for (const [c, w] of [[OUT, 8], ['#ffe08a', 4]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(0, 12); g.lineTo(0, 0); g.lineTo(-8, -10); g.moveTo(0, 0); g.lineTo(8, -10); g.stroke(); } g.restore(); void u; }
      txt(g, 'toxoplasma\n→ serologie', 520, 875, 18, K.cream, { w: 700 });
      // Trichinella: mușchi striat + larva închistată
      g.save(); const mu = new Path2D(); mu.roundRect(690, 740, 230, 90, 16); g.fillStyle = '#d8505a'; g.fill(mu); g.clip(mu); g.strokeStyle = '#b83a46'; g.lineWidth = 2; for (let x = 690; x < 920; x += 9) { g.beginPath(); g.moveTo(x, 740); g.lineTo(x, 830); g.stroke(); } g.restore();
      g.save(); g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(690, 740, 230, 90, 16); g.stroke(); g.restore();
      trichCyst(g, 805, 785, 26, t);
      txt(g, 'trichinella\n→ biopsie', 805, 875, 18, K.cream, { w: 700 });
    },
  };
}

/* ==================================================================== D2 · CLASIFICAREA
CE TREBUIE SĂ SE VADĂ
 Rădăcina „Paraziții” la stânga; din ea cresc 4 ramuri spre 4 încrengături, de sus în jos: Protozoa (trofozoit amoeboid care se mișcă + chist),
 Plathelminthes (gălbeaza = vierme plat în formă de frunză + o bucată de tenie cu scolex și proglote), Nemathelminthes (vierme cilindric care se
 unduiește + ou), Arthropoda (păduche cu 6 picioare care se mișcă). Rândurile 2 și 3 sunt încadrate împreună = „helminți”.
 Din fiecare rând, o săgeată duce (particule) la forma căutată + metoda: trofozoit + chist → nativ, Lugol, MGG; ouă, proglote → Kato-Miura, flotație;
 ouă, larve → Kato-Miura, larvoscopie, amprentă anală; păduchi, purici, acarieni. */
export function d_classify() {
  const Y = [125, 345, 565, 785];
  const NAME = [['Protozoa', 'unicelulari'], ['Plathelminthes', 'viermi plați'], ['Nemathelminthes', 'viermi cilindrici'], ['Arthropoda', 'artropode']];
  const MET = ['trofozoit + chist\n→ nativ, Lugol, MGG', 'ouă, proglote\n→ Kato-Miura, flotație', 'ouă, larve → Kato-Miura,\nlarvoscopie,\namprentă anală', 'păduchi, purici,\nacarieni'];
  const COL = ['#d6f0e0', '#ffe2c4', '#ffd6d6', '#e6dcf5'];
  return {
    home: HOME,
    anchors: Y.map((y) => [262, y - 74]),
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      // încadrarea „helminți”
      g.save(); g.strokeStyle = 'rgba(255,107,94,.85)'; g.lineWidth = 4; g.setLineDash([12, 8]); g.beginPath(); g.roundRect(236, Y[1] - 104, 360, Y[2] - Y[1] + 208, 26); g.stroke(); g.restore();
      pill(g, 520, Y[1] - 104, 150, 36, '#ff8a7e', 'helminți', { size: 19, ow: 4 });
      pill(g, 105, 455, 160, 84, '#fff3e6', 'Paraziții', { size: 24, ow: 5 });
      Y.forEach((y, k) => {
        const u = b.i < 0 ? p(k) : b.i >= k ? 1 : 0.35; const act = A(b, k); const a = vis(b, k);
        tube(g, [[185, 455], [215, lerp(455, y, 0.6)], [250, y]], 8, '#e8d8c8', { ow: 4, u1: b.i < 0 ? Math.max(0.05, p(k)) : 1, alpha: a });
        hl(g, 250, y - 92, 330, 184, act);
        g.save(); g.globalAlpha = a;
        if (k === 0) { amoeba(g, 320, y + 5, 1.15, t, 1, { dir: Math.sin(t * 0.5) > 0 ? 0 : Math.PI, seed: 1 }); cyst(g, 390, y + 50, 20, 4); }
        if (k === 1) { fluke(g, 320, y - 15, 0.95, -0.3, t); strobila(g, curve([[300, y + 55], [350, y + 48 + Math.sin(t * 2) * 6], [400, y + 60]]), 1, { n: 9, w: 13 }); }
        if (k === 2) { const w = (x) => y + 5 + Math.sin(x * 0.05 + t * 3) * 14; worm(g, [[285, w(285)], [315, w(315)], [345, w(345)], [375, w(375)]], 15, '#f4e3cf'); egg(g, 395, y + 55, 'asc', 18); }
        if (k === 3) louse(g, 335, y + 8, 1.4, t);
        g.restore();
        txt(g, NAME[k][0], 495, y - 22, 21, '#ffffff', { alpha: a }); txt(g, NAME[k][1], 495, y + 12, 18, K.dim, { alpha: a, w: 700 });
        arr(g, 590, y, 636, y, '#fff3e6', 5, a);
        if (act || b.i < 0) flow(g, curve([[590, y], [640, y]]), t, K.hi, 2, 0.7, 5);
        pill(g, 815, y, 330, k === 2 ? 122 : 100, COL[k], MET[k], { size: 19, alpha: a, glow: b.i === k ? 1 : 0 });
        void u;
      });
    },
  };
}

/* ==================================================================== D3 · PROTOZOARELE INTESTINALE ȘI GENITALE
CE TREBUIE SĂ SE VADĂ (3 coloane: cum intră → unde trăiește → ce cauți; jos capcana)
 1 Entamoeba histolytica: intră ca CHIST înghițit (apă). În cec/colon: trofozoitul coboară din lumen în mucoasă, săpă un ulcer, ia o hematie din capilar
   (o fagocitează); săgeata pleacă din capilar spre ficat = abces hepatic. Ce cauți: diareic = trofozoit cu hematii; format = chist cu 4 nuclei (Lugol).
 2 Giardia: chist înghițit (fecal-oral). În duoden: trofozoiți-pară cu 2 nuclei se LIPESC cu discul adeziv de vilozități; picăturile de grăsime
   trec neabsorbite în jos = steatoree. Ce cauți: chisturile ies intermitent → 4 examene la 7 zile (zilele 0, 7, 14, 21) + lichid duodenal, biopsie.
 3 Trichomonas: intră pe cale sexuală, chistul e tăiat (NU are chist). Înoată printre celulele scuamoase (vagin, uretră). Ce cauți: trofozoit mobil, nativ, repede.
 Capcana: chistul de histolytica = 4 nuclei, trofozoitul ei înghite hematia; Entamoeba coli = 8 nuclei, hematia ricoșează (nu o fagocitează). */
export function d_proto() {
  const X = [175, 500, 825];
  const NM = ['Entamoeba\nhistolytica', 'Giardia\nlamblia', 'Trichomonas\nvaginalis'];
  const CO = ['#ffd9c6', '#d6f0e0', '#e3d6ff'];
  const mc = clock();
  return {
    home: HOME,
    anchors: [[56, 40], [381, 40], [706, 40]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3); const m = mc(t, 1);
      X.forEach((x, k) => {
        const a = vis(b, k);
        hl(g, x - 158, 18, 316, 688, A(b, k));
        pill(g, x, 60, 270, 64, CO[k], NM[k], { size: 20, alpha: a, glow: b.i === k ? 1 : 0 });
      });
      // ---- rândul „cum intră”
      const yE = 150;
      g.save(); g.globalAlpha = vis(b, 0); cup(g, X[0] - 105, yE, 0.9); cyst(g, X[0] - 72, yE - 22, 13, 4); g.restore();
      txt(g, 'chist înghițit\n(apă, alimente)', X[0] + 32, yE, 18, K.cream, { alpha: vis(b, 0), w: 700 });
      g.save(); g.globalAlpha = vis(b, 1); hand(g, X[1] - 105, yE + 6, 0.9); cyst(g, X[1] - 100, yE - 26, 13, 4, { oval: 0.75 }); g.restore();
      txt(g, 'chist înghițit\n(fecal-oral)', X[1] + 32, yE, 18, K.cream, { alpha: vis(b, 1), w: 700 });
      g.save(); g.globalAlpha = vis(b, 2); cyst(g, X[2] - 105, yE, 20, 4, { col: '#d8d0c0' }); cross(g, X[2] - 105, yE, 22); g.restore();
      txt(g, 'pe cale sexuală\n(NU are chist)', X[2] + 32, yE, 18, K.cream, { alpha: vis(b, 2), w: 700 });
      // ---- rândul „unde trăiește”
      const T0 = 205, T1 = 478;
      // 1 · cec: lumen sus, epiteliu, submucoasă cu capilar; ulcer + fagocitarea unei hematii; săgeată spre ficat
      {
        const x0 = X[0] - 145, w = 290, u = b.i < 0 ? loopT(t, 8) : b.i === 0 ? clamp(b.bt / (b.bd * 0.85)) : 1;
        g.save(); g.globalAlpha = vis(b, 0); const box = new Path2D(); box.roundRect(x0, T0, w, T1 - T0, 16); g.save(); g.clip(box);
        g.fillStyle = '#f3e3c0'; g.fillRect(x0, T0, w, 130); g.fillStyle = K.sub; g.fillRect(x0, T0 + 168, w, 200);
        for (let k = 0; k < 13; k++) { const cx = x0 + 11 + k * 22; ell(g, cx, T0 + 149, 10, 19, K.muc, { ow: 2.5 }); dot(g, cx, T0 + 156, 4, '#8a4a7a', { ow: 0 }); }
        const uc = X[0] - 20; const gr = sm(u, 0.25, 0.65);
        if (gr > 0) { g.fillStyle = '#f3e3c0'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.moveTo(uc - 12, T0 + 128); g.lineTo(uc - 10, T0 + 170); g.bezierCurveTo(uc - 50 * gr, T0 + 172, uc - 54 * gr, T0 + 170 + 50 * gr, uc, T0 + 172 + 52 * gr); g.bezierCurveTo(uc + 54 * gr, T0 + 170 + 50 * gr, uc + 50 * gr, T0 + 172, uc + 10, T0 + 170); g.lineTo(uc + 12, T0 + 128); g.fill(); g.stroke(); }
        tube(g, [[x0 - 10, T0 + 245], [x0 + w + 10, T0 + 245]], 16, '#e0443e', { ow: 4 });
        const ty = lerp(T0 + 60, T0 + 195, sm(u, 0, 0.35)); const got = u > 0.82;
        const rx = lerp(uc + 40, uc + 10, sm(u, 0.65, 0.82)), ry = lerp(T0 + 245, T0 + 205, sm(u, 0.65, 0.82));
        if (!got) dot(g, rx, ry, 7, K.blood, { ow: 2 });
        amoeba(g, uc, ty, 0.85, m * 2, 1, { dir: Math.PI / 2, seed: 2, rbc: got ? [[6, 6]] : [] });
        g.restore(); g.strokeStyle = 'rgba(255,230,210,.4)'; g.lineWidth = 3; g.stroke(box); g.restore();
        txt(g, 'cec, colon', X[0] - 85, T0 + 26, 18, '#ffd9a8', { alpha: vis(b, 0) });
        ell(g, X[0] + 105, T0 + 60, 34, 18, K.liver, { ow: 4, alpha: vis(b, 0) }); txt(g, 'abces\nhepatic', X[0] + 25, T0 + 62, 15, K.cream, { alpha: vis(b, 0), w: 700 });
        arr(g, X[0] + 110, T0 + 236, X[0] + 110, T0 + 140, '#ff9a8a', 5, vis(b, 0) * (u > 0.85 || b.i !== 0 ? 1 : 0.25));
      }
      // 2 · duoden: vilozități, Giardia lipite cu discul, grăsimea trece neabsorbită (steatoree)
      {
        const x0 = X[1] - 145, w = 290; g.save(); g.globalAlpha = vis(b, 1); const box = new Path2D(); box.roundRect(x0, T0, w, T1 - T0, 16); g.save(); g.clip(box);
        g.fillStyle = '#f6eccd'; g.fillRect(x0, T0, w, T1 - T0);
        const VX = [-105, -35, 35, 105]; VX.forEach((dx) => { const p2 = new Path2D(); p2.roundRect(X[1] + dx - 24, T0 + 120, 48, 220, 24); paint(g, p2, K.muc, null, null, [X[1] + dx - 24, T0 + 120, 48, 220], OUT, 3.5); });
        g.fillStyle = K.sub; g.fillRect(x0, T1 - 22, w, 30);
        for (let k = 0; k < 7; k++) { const u = (m * 0.12 + k / 7) % 1; dot(g, X[1] + (k % 2 ? -70 : 70) + Math.sin(k) * 6, lerp(T0 + 40, T1 - 26, u), 7, K.fat, { ow: 2, alpha: Math.sin(u * Math.PI) }); }
        const u = b.i < 0 ? loopT(t, 7) : b.i === 1 ? clamp(b.bt / (b.bd * 0.8)) : 1;
        giardia(g, X[1] - 35, T0 + 100, 0.85, Math.PI / 2, t); giardia(g, X[1] + 105, T0 + 100, 0.85, Math.PI / 2, t + 1); giardia(g, X[1] - 51, T0 + 200, 0.8, Math.PI, t + 2);
        const gx = lerp(X[1] + 20, X[1] + 35, sm(u, 0, 0.6)), gy = lerp(T0 + 30, T0 + 100, sm(u, 0, 0.6));
        giardia(g, gx, gy, 0.85, Math.PI / 2 + (1 - sm(u, 0.4, 0.6)) * Math.sin(t * 5) * 0.5, t + 3);
        g.restore(); g.strokeStyle = 'rgba(255,230,210,.4)'; g.lineWidth = 3; g.stroke(box); g.restore();
        txt(g, 'duoden (disc adeziv)', X[1], T0 + 24, 18, '#ffd9a8', { alpha: vis(b, 1) });
        txt(g, 'grăsime neabsorbită → steatoree', X[1], T1 + 18, 16, K.fat, { alpha: vis(b, 1) });
      }
      // 3 · vagin, uretră: celule scuamoase, Trichomonas înoată sacadat
      {
        const x0 = X[2] - 145, w = 290; g.save(); g.globalAlpha = vis(b, 2); const box = new Path2D(); box.roundRect(x0, T0, w, T1 - T0, 16); g.save(); g.clip(box);
        g.fillStyle = '#efe2d6'; g.fillRect(x0, T0, w, T1 - T0);
        [[-90, 90, 0.3], [20, 80, -0.4], [110, 130, 0.2], [-60, 200, -0.2], [70, 220, 0.5], [-110, 250, 0.1]].forEach(([dx, dy, r]) => { const pts = blobPts(X[2] + dx, T0 + dy, 56, 40, r, 0, 0.12, 7, dx); paint(g, smooth(pts), '#f5d6c8', null, null, [0, 0, 1, 1], '#c99a8a', 2.5); dot(g, X[2] + dx, T0 + dy, 6, '#8a6aa6', { ow: 0 }); });
        for (let k = 0; k < 3; k++) { const ph = m * 0.5 + k * 2.1; const jx = Math.sin(t * 7 + k) * 3; tricho(g, X[2] + Math.sin(ph) * 90 + jx, T0 + 90 + k * 75 + Math.sin(ph * 1.7) * 18, 0.9, Math.cos(ph) > 0 ? 0 : Math.PI, t + k); }
        g.restore(); g.strokeStyle = 'rgba(255,230,210,.4)'; g.lineWidth = 3; g.stroke(box); g.restore();
        txt(g, 'vagin, uretră', X[2], T0 + 24, 18, '#ffd9a8', { alpha: vis(b, 2) });
      }
      // ---- rândul „ce cauți”
      const yF = 590;
      txt(g, 'diareic', X[0] - 75, yF - 82, 16, '#ffd9a8', { alpha: vis(b, 0) }); txt(g, 'format', X[0] + 75, yF - 82, 16, '#ffd9a8', { alpha: vis(b, 0) });
      g.save(); g.globalAlpha = vis(b, 0);
      field(g, X[0] - 75, yF, 58, () => { g.fillStyle = '#efe0bd'; g.fillRect(X[0] - 140, yF - 60, 130, 120); amoeba(g, X[0] - 75, yF, 1, m * 2, 1, { dir: 0.5 + Math.sin(t) * 0.3, seed: 4, rbc: [[6, 8], [-6, 6]] }); });
      field(g, X[0] + 75, yF, 58, () => { g.fillStyle = '#e8dcc0'; g.fillRect(X[0] + 10, yF - 60, 130, 120); cyst(g, X[0] + 75, yF, 32, 4); });
      g.restore();
      txt(g, 'trofozoit cu\nhematii, imediat', X[0] - 75, yF + 92, 15, K.cream, { alpha: vis(b, 0), w: 700 });
      txt(g, 'chist cu 4 nuclei\n(Lugol)', X[0] + 75, yF + 92, 15, K.cream, { alpha: vis(b, 0), w: 700 });
      // Giardia: eliminare intermitentă + 4 examene la 7 zile
      {
        const a = vis(b, 1); const x0 = X[1] - 130, x1 = X[1] + 130, yB = yF + 20;
        g.save(); g.globalAlpha = a; g.strokeStyle = '#e8d8c8'; g.lineWidth = 4; g.beginPath(); g.moveTo(x0, yB); g.lineTo(x1, yB); g.stroke();
        g.fillStyle = 'rgba(226,169,74,.35)'; g.beginPath(); g.moveTo(x0, yB); for (let x = x0; x <= x1; x += 4) g.lineTo(x, yB - Math.max(0, Math.sin((x - x0) * 0.055 + 0.6)) ** 3 * 60); g.lineTo(x1, yB); g.fill(); g.restore();
        const cu = b.i === 1 ? clamp(b.bt / (b.bd * 0.8)) : b.i < 0 ? loopT(t, 7) : 1;
        [0, 7, 14, 21].forEach((d, k) => { const x = lerp(x0 + 10, x1 - 10, d / 21); const on2 = cu >= d / 21 - 0.01; cyst(g, x, yB - 34, 13, 4, { oval: 0.75, alpha: a * (on2 ? 1 : 0.25) }); txt(g, `ziua ${d}`, x, yB + 22, 14, K.dim, { alpha: a, w: 700 }); void k; });
        txt(g, '4 examene la 7 zile\n+ lichid duodenal, biopsie', X[1], yF + 92, 16, K.cream, { alpha: a, w: 700 });
        txt(g, 'chisturi eliminate intermitent', X[1], yF - 82, 15, '#ffd9a8', { alpha: a });
      }
      // Trichomonas: frotiu nativ, repede
      g.save(); g.globalAlpha = vis(b, 2);
      field(g, X[2], yF, 62, () => { g.fillStyle = '#efe6dc'; g.fillRect(X[2] - 70, yF - 70, 140, 140); tricho(g, X[2] + Math.sin(t * 1.3) * 20, yF + Math.sin(t * 2.1) * 10, 1.05, Math.sin(t * 1.3 + 1.57) > 0 ? 0 : Math.PI, t); });
      g.restore();
      txt(g, 'trofozoit mobil, nativ', X[2], yF - 82, 15, '#ffd9a8', { alpha: vis(b, 2) });
      txt(g, 'repede · primele 4–5 zile\npostmenstrual', X[2], yF + 92, 15, K.cream, { alpha: vis(b, 2), w: 700 });
      // ---- CAPCANA: 4 nuclei vs 8 nuclei; histolytica fagocitează hematii, Entamoeba coli nu
      hl(g, 18, 716, 964, 200, false, { fill: 'rgba(255,107,94,.10)', stroke: 'rgba(255,107,94,.6)' });
      txt(g, 'CAPCANA', 500, 740, 18, K.red);
      const c = b.i < 0 ? loopT(t, 6) : (b.bt % 6) / 6;
      cyst(g, 110, 830, 44, 4, { shown: clamp(c * 2.2) * 4 }); txt(g, '4 nuclei', 110, 895, 17, K.cream);
      txt(g, 'Entamoeba histolytica\n(patogenă)', 290, 772, 16, '#ffd9a8');
      { const rx = lerp(390, 330, sm(c, 0.4, 0.7)); amoeba(g, 300, 840, 1.1, t * 2, 1, { dir: 0, seed: 5, rbc: c > 0.7 ? [[8, 4]] : [] }); if (c <= 0.7) dot(g, rx, 840, 8, K.blood, { ow: 2 }); }
      txt(g, 'vs', 500, 830, 26, '#ffffff');
      cyst(g, 875, 826, 44, 8, { shown: clamp(c * 2.2) * 8 }); txt(g, '8 nuclei', 875, 890, 17, K.cream);
      txt(g, 'Entamoeba coli\n(nepatogenă)', 710, 772, 16, '#ffd9a8');
      { const u = sm(c, 0.4, 0.7), back = sm(c, 0.7, 0.9); const rx = lerp(lerp(800, 742, u), 812, back); amoeba(g, 710, 840, 1.1, t * 2, 1, { dir: 0, seed: 6 }); dot(g, rx, 840 + back * 20, 8, K.blood, { ow: 2 }); if (c > 0.72) cross(g, 760, 800, 10, K.red, 1 - back * 0.3); }
      void p;
    },
  };
}

/* ==================================================================== D4 · TOXOPLASMA
CE TREBUIE SĂ SE VADĂ (ciclu)
 1 PISICA (sus) = gazda definitivă: ciclul sexuat în intestin → OOCHIȘTI în fecale (ies din fecalele pisicii) → săgeată spre sol.
 2 OOCHIȘTII în sol: oochistul nesporulat (o masă) se împarte în 2 sporochiști cu câte 4 sporozoiți = sporulează. De aici: omul îi înghite cu
   legume nespălate (săgeată spre om); și animalele îi înghit (săgeată punctată spre animale).
 3 ANIMALE (porc, șoarece): chisturi tisulare în mușchi și creier. Omul mănâncă carne puțin prelucrată (săgeată spre om); pisica mănâncă
   animalul (carnivorism, săgeată înapoi spre pisică) → ciclul se închide.
 4 OMUL = gazdă intermediară (nu elimină oochiști). Gravida → săgeată roșie, transplacentar, spre făt: DOAR primoinfecția din sarcină.
 Graficul (De ce?): IgM urcă prima și apoi scade; IgG urcă mai târziu și rămâne. */
export function d_toxo() {
  const E0 = curve([[410, 200], [270, 220], [190, 290]]);
  const E1 = curve([[262, 380], [500, 392], [726, 380]]);
  const E2 = curve([[860, 290], [800, 175], [610, 128]]);
  const E3 = curve([[180, 470], [260, 585], [430, 600]]);
  const E4 = curve([[820, 470], [740, 585], [570, 600]]);
  const E5 = curve([[500, 708], [500, 752]]);
  return {
    home: HOME,
    anchors: [[350, 40], [80, 300], [930, 280], [610, 860]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      const ed = (Pc, k, col, dsh) => { const a = A(b, k) ? 1 : 0.35; if (dsh) dash(g, Pc, col, 5, a); else tube(g, Pc, 7, col, { ow: 4, alpha: a, raw: true }); const [x1, y1] = Pc[Pc.length - 1], [x0, y0] = Pc[Pc.length - 3]; arr(g, x0, y0, x1, y1, col, 4, a); };
      ed(E0, 0, '#e8d8c8'); ed(E1, 1, '#e8d8c8', true); ed(E2, 2, '#e8d8c8'); ed(E3, 1, '#9be08a'); ed(E4, 2, '#ff9a8a'); ed(E5, 3, K.red);
      if (A(b, 0)) flow(g, E0, t, '#f6efd2', 4, 0.35, 7);
      if (A(b, 1)) { flow(g, E3, t, '#f6efd2', 4, 0.3, 7); flow(g, E1, t, '#f6efd2', 4, 0.25, 6); }
      if (A(b, 2)) { flow(g, E4, t, '#f6efd2', 4, 0.3, 7); flow(g, E2, t, '#ffd0d0', 3, 0.3, 6); }
      if (A(b, 3)) flow(g, E5, t, '#ffd0d0', 2, 0.5, 7);
      txt(g, 'oochiști ingerați', 500, 362, 17, K.dim, { w: 700 });
      txt(g, 'carnivorism', 800, 110, 18, K.dim, { w: 700 });
      // 1 · pisica
      g.save(); g.globalAlpha = vis(b, 0); cat(g, 510, 150, 0.95, t); stool(g, 420, 200, 0.6); g.restore();
      txt(g, 'PISICA = gazda definitivă', 510, 40, 21, '#ffd9a8', { alpha: vis(b, 0) });
      txt(g, 'ciclul sexuat\nîn intestin', 690, 200, 16, K.cream, { alpha: vis(b, 0), w: 700 });
      // 2 · oochiștii în sol: sporulează
      {
        const a = vis(b, 1); const sp = b.i < 0 ? sm(loopT(t, 6), 0.2, 0.7) : b.i === 1 ? sm(b.bt / b.bd, 0.15, 0.6) : b.i > 1 ? 1 : 0;
        g.save(); g.globalAlpha = a; ell(g, 175, 382, 88, 76, '#3a2a1e', { ow: 5 }); g.save(); g.beginPath(); g.ellipse(175, 382, 85, 73, 0, 0, 7); g.clip(); g.fillStyle = K.soil; g.fillRect(80, 410, 200, 60); g.restore();
        ell(g, 175, 372, 48, 36, '#f2ebc8', { ow: 4 });
        if (sp < 0.5) ell(g, 175, 372, 30 * (1 - sp), 22 * (1 - sp), '#cdbf88', { ow: 0 });
        for (const sd of [-1, 1]) { ell(g, 175 + sd * 21, 372, 18, 24, '#e2d39a', { ow: 2.5, alpha: sm(sp, 0.3, 0.6) }); for (let k = 0; k < 4; k++) { g.save(); g.globalAlpha = a * sm(sp, 0.55, 0.95); g.strokeStyle = '#8a6a2a'; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.arc(175 + sd * 21 + (k % 2 ? 5 : -5), 360 + Math.floor(k / 2) * 18, 6, 0.3, 2.6); g.stroke(); g.restore(); } }
        g.restore();
        txt(g, sp > 0.5 ? 'sporulat' : 'nesporulat', 175, 428, 16, '#f6efd2', { alpha: a });
        txt(g, 'oochiști în fecale\n→ sol, legume', 175, 278, 17, K.cream, { alpha: a, w: 700 });
        g.save(); g.globalAlpha = a; lettuce(g, 250, 540, 0.75); g.restore();
        txt(g, 'legume\nnespălate', 150, 590, 17, '#9be08a', { alpha: a });
      }
      // 3 · animale: chisturi tisulare în mușchi, creier
      {
        const a = vis(b, 2); g.save(); g.globalAlpha = a; pig(g, 850, 360, 0.62); mouse(g, 900, 448, 0.6); g.restore();
        txt(g, 'animale:\nchisturi în\nmușchi, creier', 905, 225, 16, K.cream, { alpha: a, w: 700 });
        g.save(); g.globalAlpha = a; ell(g, 745, 470, 44, 44, '#d8505a', { ow: 4 }); g.save(); g.beginPath(); g.arc(745, 470, 42, 0, 7); g.clip(); g.strokeStyle = '#b83a46'; g.lineWidth = 2; for (let x = 700; x < 790; x += 8) { g.beginPath(); g.moveTo(x, 425); g.lineTo(x, 515); g.stroke(); } g.restore();
        const gr = b.i === 2 ? sm(b.bt / b.bd, 0.05, 0.5) : 1; ell(g, 745, 470, 24 * gr, 18 * gr, '#f4ecd2', { ow: 3 });
        for (let k = 0; k < 7; k++) { const aa = k / 7 * 6.28; dot(g, 745 + Math.cos(aa) * 12 * gr, 470 + Math.sin(aa) * 8 * gr, 3, '#8a6aa6', { ow: 0 }); }
        g.restore();
        txt(g, 'chist\ntisular', 745, 535, 15, K.cream, { alpha: a, w: 700 });
        g.save(); g.globalAlpha = a; meat(g, 760, 600, 0.55, 3); g.restore();
        txt(g, 'carne puțin\nprelucrată', 860, 600, 17, '#ff9a8a', { alpha: a });
      }
      // omul
      body(g, { x: 500, y: 452, s: 0.27 }, { organs: false });
      txt(g, 'OMUL = gazdă intermediară', 500, 432, 19, '#ffd9a8');
      // 4 · fătul: transplacentar
      {
        const a = vis(b, 3); g.save(); g.globalAlpha = a;
        ell(g, 500, 838, 76, 72, '#f2a6b0', { ow: 5 }); ell(g, 500, 838, 62, 58, '#fde3d8', { ow: 0 });
        ell(g, 448, 812, 20, 34, '#c0505a', { ow: 3, rot: 0.4 });
        ell(g, 512, 850, 30, 36, '#f6c8a8', { ow: 4 }); ell(g, 512, 806, 20, 18, '#f6c8a8', { ow: 4 });
        g.restore();
        txt(g, 'transplacentar', 395, 732, 16, K.red, { alpha: a });
        txt(g, 'doar primoinfecția\ndin sarcină', 608, 732, 16, K.red, { alpha: a });
      }
      // De ce? serologia: IgM prima, IgG mai târziu și persistă
      {
        const x0 = 745, y0 = 862, w = 220, h = 140; const u = b.i < 0 ? loopT(t, 7) : b.i === 3 ? clamp(b.bt / (b.bd * 0.8)) : 1;
        hl(g, x0 - 20, y0 - h - 30, w + 40, h + 58, false);
        g.save(); g.strokeStyle = '#e8d8c8'; g.lineWidth = 3; g.beginPath(); g.moveTo(x0, y0 - h); g.lineTo(x0, y0); g.lineTo(x0 + w, y0); g.stroke(); g.restore();
        const fM = (v) => Math.exp(-((v - 0.28) ** 2) / 0.018); const fG = (v) => sm(v, 0.22, 0.6) * 0.85;
        for (const [f, col, lab] of [[fM, '#ffb347', 'IgM'], [fG, '#7fc8ff', 'IgG']]) { const pts = []; for (let k = 0; k <= 40; k++) { const v = (k / 40) * u; pts.push([x0 + v * w, y0 - f(v) * (h - 14)]); } if (pts.length > 1) tube(g, pts, 5, col, { ow: 3, raw: true }); const [lx, ly] = pts[pts.length - 1]; if (u > 0.15) txt(g, lab, Math.min(lx + 22, x0 + w), ly - 14, 15, col); }
        txt(g, 'timp →', x0 + w - 30, y0 + 16, 14, K.dim, { w: 700 });
      }
      void p;
    },
  };
}

/* ==================================================================== D5 · TENIILE ȘI ECHINOCOCCUS
CE TREBUIE SĂ SE VADĂ (stânga TAENIA, dreapta ECHINOCOCCUS)
 1 Taenia: porcul (T. solium) și vaca (T. saginata) au cisticerci (vezicule albe) în carne → carnea crudă intră pe gura OMULUI → coboară pe tubul
   digestiv → în intestinul subțire scolexul se fixează și tenia adultă crește (proglote tot mai mari spre capătul liber). OMUL = gazda definitivă.
 2 Ce cauți: proglotele se desprind și ies prin anus → în scaun (proglote); scolexul după tratament; cele 2 ouă (solium, saginata) sunt identice.
 3 Cisticercoza: omul înghite OUĂLE de T. solium (de pe mână) → în intestin ies larvele → prin sânge ajung în creier, ochi, mușchi → acolo apar
   vezicule (cisticerci). Nu se face tenie adultă.
 4 Echinococcus: CÂINELE = gazda definitivă, elimină ouă în fecale → ouăle ajung pe blană, mâini, legume, apă → omul le înghite → larva ajunge în
   ficat (chistul mare, 60–70%) și în plămân (20–30%) și crește chistul hidatic. OMUL = gazdă intermediară → în scaun NU are ouă (scaunul barat).
   Capcana: acul de puncție spre chist e barat (șoc anafilactic). */
export function d_tenia() {
  const BL = { x: 250, y: 236, s: 0.6 }, BR = { x: 750, y: 236, s: 0.6 };
  const mouthL = bp(BL, 'mouth'), mouthR = bp(BR, 'mouth');
  const giL = bpath(BL, GI), giR = bpath(BR, GI.concat(SI.slice(1, 3)));
  const siL = bpath(BL, SI.slice().reverse().concat([[-80, 498]]).reverse());
  const tapeL = bpath(BL, [[16, 392], ...SI.slice(1)]);
  const meatIn = curve([[150, 196], [200, 220], [mouthL[0], mouthL[1]]]);
  const outL = curve([bp(BL, 'anus'), [BL.x, 772], [160, 800], [100, 828]]);
  const cysto = [bpath(BL, [[20, 440], [6, 380], [8, 230], [0, 130], [0, 46]]), bpath(BL, [[20, 440], [6, 380], [8, 230], [-4, 130], [-20, 76]]), bpath(BL, [[20, 440], [0, 500], [-40, 560], [-66, 745]])];
  const echL = bpath(BR, [[42, 420], [10, 400], [-40, 345]]), echLu = bpath(BR, [[42, 420], [8, 380], [22, 300], [60, 250]]);
  return {
    home: HOME,
    anchors: [[40, 120], [40, 790], [330, 230], [560, 600]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      g.save(); g.strokeStyle = 'rgba(255,230,210,.18)'; g.lineWidth = 3; g.beginPath(); g.moveTo(500, 20); g.lineTo(500, 915); g.stroke(); g.restore();
      txt(g, 'TAENIA', 250, 34, 22, '#ffd9a8'); txt(g, 'ECHINOCOCCUS', 750, 34, 22, '#ffd9a8');
      // ---------- TAENIA
      const a1 = vis(b, 0), a2 = vis(b, 1), a3 = vis(b, 2), a4 = vis(b, 3);
      g.save(); g.globalAlpha = a1; pig(g, 95, 130, 0.48); cow(g, 230, 130, 0.42); meat(g, 150, 196, 0.5, 3); g.restore();
      txt(g, 'porc → solium', 95, 80, 15, K.cream, { alpha: a1, w: 700 }); txt(g, 'vită → saginata', 240, 80, 15, K.cream, { alpha: a1, w: 700 });
      body(g, BL);
      const pe = b.i < 0 ? loopT(t, 9) : b.i === 0 ? clamp(b.bt / (b.bd * 0.85)) : 1;
      if (A(b, 0)) { const u = sm(pe, 0, 0.3); const [x, y] = at(meatIn, u); if (u < 1) meat(g, x, y, 0.22, 1); const u2 = sm(pe, 0.3, 0.55); if (u2 > 0 && u2 < 1) { const [x2, y2] = at(giL, u2); dot(g, x2, y2, 7, '#fffbe6', { ow: 2 }); } }
      const grow = A(b, 0) ? sm(pe, 0.5, 1) : 1;
      strobila(g, tapeL, grow, { n: 30, w: 12, long: 0.75 });
      txt(g, 'OMUL =\ngazda\ndefinitivă', 70, 400, 17, '#ffd9a8', { alpha: a1 });
      // 2 · proglote ies prin anus în scaun
      if (A(b, 1)) { for (let k = 0; k < 3; k++) { const u = ((REDUCED ? 0.5 : t * 0.35) + k / 3) % 1; const [x, y] = at(outL, u); g.save(); g.translate(x, y); const pr = new Path2D(); pr.roundRect(-9, -6, 18, 12, 3); paint(g, pr, K.worm, null, null, [-9, -6, 18, 12], OUT, 2.5); g.restore(); } }
      hl(g, 30, 792, 440, 122, b.i === 1);
      stool(g, 95, 856, 0.8, a2);
      for (let k = 0; k < 3; k++) { g.save(); g.globalAlpha = a2; g.translate(81 + k * 15, 838 - k * 6); g.rotate(-0.3); const pr = new Path2D(); pr.roundRect(-11, -7, 22, 14, 3); paint(g, pr, K.worm, null, null, [-11, -7, 22, 14], OUT, 2.5); g.restore(); }
      txt(g, 'proglote în scaun\nscolexul, după tratament', 270, 830, 16, K.cream, { alpha: a2, w: 700 });
      egg(g, 225, 885, 'taenia', 15, { alpha: a2 }); txt(g, '=', 255, 885, 20, K.cream, { alpha: a2 }); egg(g, 285, 885, 'taenia', 15, { alpha: a2 });
      txt(g, 'ouă identice', 380, 885, 15, K.dim, { alpha: a2, w: 700 });
      // 3 · cisticercoza: ouăle de T. solium înghițite → larve în creier, ochi, mușchi
      {
        const u = b.i < 0 ? loopT(t, 8) : b.i === 2 ? clamp(b.bt / (b.bd * 0.85)) : b.i > 2 ? 1 : 0;
        g.save(); g.globalAlpha = a3; hand(g, 420, 215, 0.6, -0.5); egg(g, 408, 190, 'taenia', 9); g.restore();
        txt(g, 'omul înghite\nOUĂLE de T. solium', 410, 130, 15, '#ff9a8a', { alpha: a3 });
        if (A(b, 2)) {
          const ein = curve([[408, 190], [340, 240], mouthL]); const u1 = sm(u, 0, 0.25); if (u1 < 1) egg(g, ...at(ein, u1).slice(0, 2), 'taenia', 7);
          const u2 = sm(u, 0.25, 0.45); if (u2 > 0 && u2 < 1) dot(g, ...at(giL, u2).slice(0, 2), 5, '#fffbe6', { ow: 2 });
          const u3 = sm(u, 0.45, 0.8); cysto.forEach((Pc) => { if (u3 > 0 && u3 < 1) larva(g, ...at(Pc, u3).slice(0, 2), 12, 0, t, '#fffbe6'); });
        }
        const vz = b.i > 2 ? 1 : b.i === 2 || b.i < 0 ? sm(u, 0.78, 0.95) : 0;
        if (vz > 0) { ell(g, ...bp(BL, [12, 42]), 8 * vz, 7 * vz, '#fffbe6', { ow: 2.5 }); ell(g, ...bp(BL, [-14, 54]), 6 * vz, 5 * vz, '#fffbe6', { ow: 2.5 }); ell(g, ...bp(BL, [-26, 76]), 5 * vz, 5 * vz, '#fffbe6', { ow: 2.5 }); ell(g, ...bp(BL, [-66, 745]), 7 * vz, 6 * vz, '#fffbe6', { ow: 2.5 }); }
        txt(g, 'cisticercoză:\ncreier, ochi,\nmușchi', 420, 300, 15, '#ff9a8a', { alpha: a3 });
      }
      // ---------- ECHINOCOCCUS
      g.save(); g.globalAlpha = a4; dog(g, 640, 132, 0.62, t); g.restore();
      txt(g, 'CÂINELE =\ngazda definitivă', 660, 70, 16, '#ffd9a8', { alpha: a4 });
      const ue = b.i < 0 ? loopT(t, 9) : b.i === 3 ? clamp(b.bt / (b.bd * 0.85)) : 0;
      // ouăle cad din câine pe blană, mâini, legume, apă
      g.save(); g.globalAlpha = a4; hand(g, 875, 80, 0.55); lettuce(g, 935, 130, 0.45); cup(g, 875, 170, 0.55); g.restore();
      txt(g, 'ouă pe blană,\nmâini,\nlegume, apă', 920, 218, 14, K.cream, { alpha: a4, w: 700 });
      if (A(b, 3)) {
        for (let k = 0; k < 3; k++) { const u = (loopT(t, 3) + k / 3) % 1; const s0 = curve([[600, 150], [720, 100], [860, 80 + k * 45]]); egg(g, ...at(s0, u).slice(0, 2), 'taenia', 7, { alpha: Math.sin(u * Math.PI) }); }
        const ein = curve([[860, 170], [820, 230], mouthR]); const u1 = sm(ue, 0.05, 0.25); if (u1 > 0 && u1 < 1) egg(g, ...at(ein, u1).slice(0, 2), 'taenia', 7);
        const u2 = sm(ue, 0.25, 0.5); if (u2 > 0 && u2 < 1) dot(g, ...at(giR, u2).slice(0, 2), 5, '#fffbe6', { ow: 2 });
        const u3 = sm(ue, 0.5, 0.65); if (u3 > 0 && u3 < 1) { larva(g, ...at(echL, u3).slice(0, 2), 12, 0, t, '#fffbe6'); larva(g, ...at(echLu, u3).slice(0, 2), 12, 0, t, '#fffbe6'); }
      }
      body(g, BR);
      const cg = b.i > 3 ? 1 : A(b, 3) ? sm(ue, 0.62, 0.9) : 0;
      const LV = bp(BR, [-62, 330]), LU = bp(BR, [58, 262]);
      if (cg > 0) { ell(g, LV[0], LV[1], 24 * cg, 20 * cg, '#f6efd2', { ow: 3 }); for (const [dx, dy] of [[-6, -4], [6, 4], [4, -7]]) ell(g, LV[0] + dx * cg, LV[1] + dy * cg, 4 * cg, 4 * cg, '#efe2b0', { ow: 1.5 }); ell(g, LU[0], LU[1], 13 * cg, 12 * cg, '#f6efd2', { ow: 3 }); }
      lead(g, LV[0] - 20, LV[1], 590, 470, a4); lead(g, LU[0] + 12, LU[1], 920, 330, a4);
      txt(g, 'ficat\n60–70%', 570, 490, 16, K.cream, { alpha: a4, w: 700 }); txt(g, 'plămân\n20–30%', 925, 360, 16, K.cream, { alpha: a4, w: 700 });
      txt(g, 'OMUL =\ngazdă\nintermediară', 930, 470, 17, '#ffd9a8', { alpha: a4 });
      txt(g, '(ca oaia)', 930, 530, 14, K.dim, { alpha: a4, w: 700 });
      // capcana: nu puncționa orbește
      if (cg > 0.9 || b.i < 0) { const nx = LV[0] - 70, ny = LV[1] + 60; g.save(); g.globalAlpha = a4; g.lineCap = 'round'; for (const [c, w] of [[OUT, 9], ['#d7dde2', 4]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(nx - 30, ny + 30); g.lineTo(LV[0] - 22, LV[1] + 16); g.stroke(); } g.restore(); cross(g, nx, ny, 12, K.red, a4); }
      hl(g, 530, 792, 440, 122, b.i === 3);
      egg(g, 590, 850, 'taenia', 18, { alpha: a4 }); cross(g, 590, 850, 18, K.red, a4);
      txt(g, 'NU are ouă în scaun:\nimagistică + serologie\n(antigenul 5)', 780, 852, 17, K.cream, { alpha: a4, w: 700 });
      void p;
    },
  };
}

/* ==================================================================== D6 · TREMATODE ȘI ALTE CESTODE
CE TREBUIE SĂ SE VADĂ (4 rânduri: sursa → în om → ce cauți)
 1 Fasciola: metacercarii (puncte albe) pe frunzele de creson → omul → gălbeaza (frunză) înaintează prin căile biliare (verzi) din ficat.
   Bara de timp: eozinofilia apare întâi (primele 3 luni); ouăle operculate apar în scaun abia la 90 de zile.
 2 D. latum: pește crud → teniă foarte lungă, cutată în intestin; particulele de B12 merg spre tenie, nu spre om → hematii mari = anemie megaloblastică.
   Ce cauți: ou operculat (capacul se deschide), Willis-Hung.
 3 H. nana: oul e infectant direct (fără gazdă intermediară): oul intră pe gură; în intestin face viermi; ouăle reiau ciclul înăuntru (autoinfectare,
   săgeată în buclă) → persistă. Ce cauți: ou cu filamente polare; reexaminări repetate.
 4 Dipylidium: puricele câinelui ajunge în gura copilului; în scaun proglote mobile „în butoiaș” care se târăsc (nu se dezintegrează). */
export function d_trema() {
  const Y = [146, 352, 558, 764];
  const NM = ['Fasciola hepatica', 'Diphyllobothrium latum', 'Hymenolepis nana', 'Dipylidium caninum'];
  return {
    home: HOME,
    anchors: Y.map((y) => [44, y - 70]),
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      txt(g, 'cum se infectează', 160, 30, 16, K.dim, { w: 700 }); txt(g, 'în om', 480, 30, 16, K.dim, { w: 700 }); txt(g, 'ce cauți', 820, 30, 16, K.dim, { w: 700 });
      Y.forEach((y, k) => { hl(g, 18, y - 96, 964, 196, A(b, k)); txt(g, NM[k], 180, y - 72, 18, '#ffd9a8', { alpha: vis(b, k) }); arr(g, 290, y + 10, 322, y + 10, '#fff3e6', 5, vis(b, k)); arr(g, 640, y + 10, 672, y + 10, '#fff3e6', 5, vis(b, k)); });
      const U = (k, per = 6) => (b.i < 0 ? loopT(t + k, per) : b.i === k ? clamp(b.bt / (b.bd * 0.85)) : 1);
      // 1 · Fasciola
      {
        const y = Y[0], a = vis(b, 0), u = U(0);
        g.save(); g.globalAlpha = a; cress(g, 110, y + 15, 1.05, 6); g.restore();
        txt(g, 'metacercari\npe creson', 220, y + 40, 15, K.cream, { alpha: a, w: 700 });
        g.save(); g.globalAlpha = a; const L = new Path2D(); L.moveTo(345, y - 30); L.bezierCurveTo(420, y - 70, 600, y - 60, 620, y); L.bezierCurveTo(615, y + 60, 470, y + 80, 400, y + 60); L.bezierCurveTo(340, y + 40, 320, y, 345, y - 30); L.closePath(); paint(g, L, K.liver, null, '#c45a4a', [330, y - 70, 290, 150], OUT, 5);
        const duct = [[600, y + 50], [520, y + 20], [450, y - 10], [380, y - 25]]; tube(g, duct, 9, '#5aa84a', { ow: 3 }); tube(g, [[520, y + 20], [500, y - 30]], 6, '#5aa84a', { ow: 3 }); tube(g, [[450, y - 10], [440, y + 40]], 6, '#5aa84a', { ow: 3 });
        const Pd = curve(duct); const [fx, fy, fa] = at(Pd, lerp(0.05, 0.75, sm(u, 0, 0.6))); fluke(g, fx, fy, 0.55, fa + Math.PI, t); g.restore();
        txt(g, 'căile biliare', 480, y + 82, 15, K.cream, { alpha: a, w: 700 });
        // timpul: eozinofilia întâi, ouăle la 90 de zile
        const x0 = 690, x1 = 965, yb = y + 50; g.save(); g.globalAlpha = a; g.strokeStyle = '#e8d8c8'; g.lineWidth = 3; g.beginPath(); g.moveTo(x0, yb); g.lineTo(x1, yb); g.stroke(); g.restore();
        const xt = lerp(x0, x1, u); const x90 = lerp(x0, x1, 0.72);
        g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(255,154,138,.6)'; g.fillRect(x0, yb - 18, Math.min(xt, x90) - x0, 14); g.restore();
        txt(g, 'eozinofilie', (x0 + x90) / 2, yb - 34, 14, '#ff9a8a', { alpha: a });
        dot(g, x90, yb, 6, K.hi, { alpha: a }); txt(g, '90 zile', x90, yb + 20, 14, K.hi, { alpha: a });
        egg(g, 900, y - 22, 'oper', 26, { alpha: a * (u >= 0.72 ? 1 : 0.2), open: u > 0.85 ? Math.sin(t * 2) * 0.5 + 0.5 : 0 });
        txt(g, 'ouă operculate\n+ serologie', 770, y - 26, 15, K.cream, { alpha: a, w: 700 });
      }
      // 2 · D. latum
      {
        const y = Y[1], a = vis(b, 1), u = U(1);
        g.save(); g.globalAlpha = a; fish(g, 140, y + 8, 0.85, t); g.restore();
        txt(g, 'pește crud\n(2 gazde acvatice)', 160, y + 66, 15, K.cream, { alpha: a, w: 700 });
        g.save(); g.globalAlpha = a; tube(g, [[340, y - 50], [620, y - 50], [620, y + 20], [340, y + 20], [340, y + 80], [620, y + 80]], 34, K.gut, { ow: 5 });
        strobila(g, curve([[345, y - 50], [615, y - 50], [615, y + 20], [345, y + 20], [345, y + 80], [600, y + 80]]), 1, { n: 60, w: 12, long: 0.5 });
        for (let k = 0; k < 4; k++) { const v = (loopT(t + k * 0.6, 2.4)); dot(g, lerp(390, 400 + k * 45, v), lerp(y - 82, y - 52, v), 7, '#e2569f', { ow: 2, alpha: Math.sin(v * Math.PI) }); }
        g.restore();
        txt(g, 'B12 → tenia', 340, y - 80, 14, '#ff8ac0', { alpha: a });
        const mg = b.i === 1 ? sm(u, 0.3, 0.8) : 1;
        g.save(); g.globalAlpha = a; ell(g, 615, y - 78, 10 + 8 * mg, 7 + 6 * mg, K.blood, { ow: 3 }); g.restore();
        txt(g, 'anemie megaloblastică', 500, y - 80, 14, '#ff9a8a', { alpha: a * (0.3 + 0.7 * mg) });
        egg(g, 820, y, 'oper', 30, { alpha: a, open: Math.sin(t * 2) * 0.5 + 0.5 });
        txt(g, 'ouă operculate (Willis-Hung)', 820, y + 56, 15, K.cream, { alpha: a, w: 700 });
      }
      // 3 · H. nana
      {
        const y = Y[2], a = vis(b, 2), u = U(2);
        g.save(); g.globalAlpha = a; hand(g, 110, y + 30, 0.8); egg(g, 108, y - 8, 'hnana', 16); g.restore();
        txt(g, 'oul e infectant\ndirect, fără gazdă\nintermediară', 220, y + 30, 14, K.cream, { alpha: a, w: 700 });
        g.save(); g.globalAlpha = a; tube(g, [[340, y], [620, y]], 70, K.gut, { ow: 5 }); g.restore();
        for (let k = 0; k < 3; k++) strobila(g, curve([[370 + k * 80, y - 12 + k * 10], [410 + k * 80, y - 5 + Math.sin(t * 2 + k) * 6], [440 + k * 80, y + 8]]), 1, { n: 10, w: 8 });
        const loopP = curve([[580, y + 40], [600, y + 80], [480, y + 92], [360, y + 80], [372, y + 40]]);
        dash(g, loopP, K.hi, 4, a); arr(g, ...loopP[loopP.length - 3].slice(0, 2), ...loopP[loopP.length - 1].slice(0, 2), K.hi, 3, a);
        if (A(b, 2)) egg(g, ...at(loopP, (u * 2) % 1).slice(0, 2), 'hnana', 9);
        txt(g, 'autoinfectare → persistă', 480, y - 62, 15, K.hi, { alpha: a });
        egg(g, 820, y - 10, 'hnana', 30, { alpha: a });
        txt(g, 'ouă cu filamente;\nreexaminări repetate', 820, y + 56, 15, K.cream, { alpha: a, w: 700 });
      }
      // 4 · Dipylidium
      {
        const y = Y[3], a = vis(b, 3), u = U(3);
        g.save(); g.globalAlpha = a; dog(g, 100, y + 30, 0.55, t); g.restore();
        const fp = curve([[120, y], [190, y - 70], [255, y + 10]]); const fu = A(b, 3) ? sm(u, 0, 0.5) : 0;
        flea(g, ...at(fp, fu).slice(0, 2), 0.7, t);
        g.save(); g.globalAlpha = a; ell(g, 262, y + 30, 26, 26, K.skin, { ow: 4 }); dot(g, 254, y + 26, 3, OUT, { ow: 0 }); g.restore();
        txt(g, 'copilul înghite\npuricele câinelui', 160, y + 74, 14, K.cream, { alpha: a, w: 700 });
        g.save(); g.globalAlpha = a; tube(g, [[340, y], [620, y]], 70, K.gut, { ow: 5 }); g.restore();
        strobila(g, curve([[360, y - 6], [480, y + Math.sin(t * 2) * 8], [610, y + 4]]), 1, { n: 22, w: 14, long: 1.4 });
        // proglote „în butoiaș” care se târăsc (mobile)
        g.save(); g.globalAlpha = a; stool(g, 760, y + 30, 0.9); g.restore();
        for (let k = 0; k < 2; k++) { const v = (REDUCED ? 0.5 : (t * 0.25 + k * 0.5)) % 1; const x = lerp(820, 940, v), yy = y - 10 + k * 46; const sq = 1 + Math.sin(t * 6 + k) * 0.15; g.save(); g.globalAlpha = a; g.translate(x, yy); g.scale(sq, 1 / sq); const pr = new Path2D(); pr.ellipse(0, 0, 22, 12, 0, 0, 7); paint(g, pr, K.worm, null, '#ffffff', [-22, -12, 44, 24], OUT, 3); g.strokeStyle = '#c9b48e'; g.lineWidth = 2; g.beginPath(); g.moveTo(-10, -10); g.lineTo(-10, 10); g.moveTo(10, -10); g.lineTo(10, 10); g.stroke(); g.restore(); }
        txt(g, 'proglote mobile „în butoiaș”', 830, y + 80, 15, K.cream, { alpha: a, w: 700 });
      }
      void p;
    },
  };
}

/* ==================================================================== D7 · NEMATODELE CARE INTRĂ PE GURĂ
CE TREBUIE SĂ SE VADĂ
 1 Ascaris (corpul din stânga): oul embrionat din sol intră pe GURĂ → coboară pe esofag, stomac, duoden → în intestinul subțire iese larva → trece în
   SÂNGE (traseu roșu) → inimă → PLĂMÂN → urcă pe trahee → la faringe e ÎNGHIȚITĂ → coboară din nou pe esofag → în intestinul subțire devine adult.
   Bara de timp: larve în spută în primele 2 săptămâni; ouă în scaun abia la 60–70 de zile.
 2 Enterobius (sus-dreapta, regiunea perianală privită din spate): seara (luna) femela iese prin anus și depune ouăle pe pielea perianală; în câteva ore
   oul devine embrionat (larva apare în ou); degetele (prurit) duc ouăle la gură = autoinfecție. Dimineața (soarele), înainte de toaletă: banda
   adezivă pe pielea perianală = amprenta anală. Barele: amprenta > 50% pozitivă, scaunul 10–15%.
 3 Trichuris (jos-dreapta): mucoasa cecului; viermele are partea anterioară subțire (efilată) înfiptă în mucoasă și partea posterioară groasă liberă
   în lumen. Oul brun „în lămâie” cu dopuri la poli; vine din sol (geohelmint); Kato-Miura. */
export function d_oral() {
  const B = { x: 250, y: 40, s: 0.86 };
  const down1 = bpath(B, GI.concat(SI.slice(1, 3)));
  const blood = bpath(B, [[-36, 432], [-10, 420], [6, 380], [8, 330], [22, 298], [50, 270], [52, 248], [20, 222], [0, 205], [0, 160], [0, 124]]);
  const down2 = bpath(B, GI.concat(SI.slice(1, 4)));
  return {
    home: HOME,
    cams: [cam(255, 470, 1.08), cam(740, 250, 1.75), cam(740, 700, 1.75)],
    anchors: [[400, 340], [560, 60], [560, 500]],
    phase: (i) => ['Ascaris: intestin → sânge → plămân → înghițit → intestin', 'Enterobius: femela iese seara perianal', 'Trichuris: înfipt în mucoasa cecului'][i] || '',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 3);
      // ---------- 1 · ASCARIS
      hl(g, 18, 18, 470, 896, A(b, 0));
      txt(g, 'ASCARIS', 120, 46, 21, '#ffd9a8');
      body(g, B);
      ell(g, 90, 795, 52, 18, K.soil, { ow: 4 }); egg(g, 92, 772, 'asc', 16, { larva: true }); txt(g, 'ou embrionat\ndin sol', 92, 730, 15, K.cream, { w: 700 });
      const u = b.i < 0 ? loopT(t, 10) : b.i === 0 ? clamp(b.bt / (b.bd * 0.9)) : 1;
      dash(g, blood, '#ff6b6b', 4, A(b, 0) ? 0.9 : 0.35);
      if (A(b, 0) && u < 0.98) {
        const e1 = curve([[92, 760], [150, 140], bp(B, 'mouth')]);
        if (u < 0.12) egg(g, ...at(e1, u / 0.12).slice(0, 2), 'asc', 10, { larva: true });
        else if (u < 0.36) larva(g, ...at(down1, (u - 0.12) / 0.24).slice(0, 2), 16, 1.2, t);
        else if (u < 0.62) larva(g, ...at(blood, (u - 0.36) / 0.26).slice(0, 2), 18, -1.4, t, '#ffd0d0');
        else if (u < 0.86) larva(g, ...at(down2, (u - 0.62) / 0.24).slice(0, 2), 20, 1.2, t);
      }
      const ad = b.i > 0 ? 1 : A(b, 0) ? sm(u, 0.84, 1) : 0;
      if (ad > 0) { const J = bp(B, [-30, 450]); const w = (k) => J[1] + Math.sin(k * 0.8 + t * 2) * 6; worm(g, [[J[0] - 30 * ad, w(0)], [J[0], w(1) + 8], [J[0] + 34 * ad, w(2)], [J[0] + 60 * ad, w(3) - 6]], 11 * ad + 2, '#f4dccc'); }
      const LU = bp(B, 'lungL'); txt(g, 'plămân:\nLoeffler,\neozinofilie', 440, LU[1] - 20, 15, '#ff9a8a', { w: 700 });
      lead(g, LU[0] + 30, LU[1], 400, LU[1] - 20);
      txt(g, 'sânge', 410, 420, 15, '#ff6b6b', { w: 700 });
      // bara de timp
      const x0 = 50, x1 = 455, yb = 872; g.save(); g.strokeStyle = '#e8d8c8'; g.lineWidth = 4; g.beginPath(); g.moveTo(x0, yb); g.lineTo(x1, yb); g.stroke(); g.restore();
      const xs = lerp(x0, x1, 0.2), xo = lerp(x0, x1, 0.9); const tu = b.i < 0 ? loopT(t, 8) : b.i === 0 ? clamp(b.bt / b.bd) : 1;
      g.save(); g.fillStyle = 'rgba(255,154,138,.6)'; g.fillRect(x0, yb - 16, Math.min(lerp(x0, x1, tu), xs) - x0, 12); g.restore();
      txt(g, 'larve în spută\n(primele 2 săpt.)', (x0 + xs) / 2 + 40, yb - 44, 14, '#ff9a8a', { w: 700 });
      dot(g, xo, yb, 8, tu >= 0.9 ? K.hi : '#6a5a50'); txt(g, 'ouă în scaun:\n60–70 zile', xo - 20, yb - 44, 14, K.hi, { w: 700 });
      // ---------- 2 · ENTEROBIUS (regiunea perianală)
      hl(g, 506, 18, 476, 470, A(b, 1));
      txt(g, 'ENTEROBIUS (oxiurul)', 740, 46, 20, '#ffd9a8');
      const e = b.i < 0 ? loopT(t, 10) : b.i === 1 ? clamp(b.bt / (b.bd * 0.9)) : 1;
      const night = e < 0.62;
      for (const sd of [-1, 1]) ell(g, 700 + sd * 70, 240, 82, 110, K.skin, { ow: 5 });
      g.save(); g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.moveTo(700, 130); g.lineTo(700, 228); g.stroke(); g.restore();
      ell(g, 700, 238, 12, 10, '#b5605a', { ow: 4 });
      if (night) { g.save(); g.fillStyle = '#f6efc0'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(560, 100, 26, 0.6, 5.7); g.arc(572, 92, 22, 5.4, 0.9, true); g.closePath(); g.fill(); g.stroke(); g.restore(); txt(g, 'seara', 560, 146, 16, '#f6efc0'); }
      else { dot(g, 560, 100, 22, '#ffd34a', { ow: 4 }); for (let k = 0; k < 8; k++) { const aa = k / 8 * 6.28; tube(g, [[560 + Math.cos(aa) * 30, 100 + Math.sin(aa) * 30], [560 + Math.cos(aa) * 42, 100 + Math.sin(aa) * 42]], 4, '#ffd34a', { ow: 2 }); } txt(g, 'dimineața', 560, 146, 16, '#ffd34a'); }
      // femela iese din anus și depune ouăle pe piele
      const fo = sm(e, 0.05, 0.3); const fe = sm(e, 0.3, 0.5);
      if (e < 0.62) { const hx = 700 + 60 * fo, hy = 238 + 50 * fo; const wq = (k) => Math.sin(t * 4 + k) * 4; worm(g, [[700 + wq(0), 238], [700 + 30 * fo + wq(1), 238 + 26 * fo], [hx + wq(2), hy]], 9, '#f8f2e6', { ow: 4 }); }
      const EG = [[742, 278], [760, 300], [728, 300], [776, 276], [748, 322], [668, 282], [650, 300]];
      EG.forEach(([x, y], k) => { const a = b.i > 1 ? 1 : clamp(fe * 7 - k); if (a > 0) egg(g, x, y, 'oxy', 11, { alpha: a, larva: e > 0.45 || b.i > 1, rot: k }); });
      txt(g, 'în câteva ore: ou embrionat', 740, 360, 15, K.cream, { w: 700, alpha: sm(e, 0.42, 0.5) });
      // degetele → gura (autoinfecție)
      const hu = sm(e, 0.48, 0.62); if (e > 0.45 && e < 0.65) { hand(g, lerp(800, 900, hu), lerp(310, 170, hu), 0.6, -0.4); egg(g, lerp(790, 890, hu), lerp(290, 150, hu), 'oxy', 7, { larva: true }); }
      txt(g, 'prurit → degete\n→ gură: autoinfecție', 900, 110, 14, '#ff9a8a', { w: 700, alpha: e > 0.45 ? 1 : 0.35 });
      // dimineața: banda adezivă (amprenta anală)
      const tp = sm(e, 0.66, 0.82); if (e >= 0.62) { g.save(); g.globalAlpha = 0.85; g.fillStyle = 'rgba(220,245,255,.55)'; g.strokeStyle = OUT; g.lineWidth = 3; g.translate(lerp(900, 712, tp), lerp(420, 290, tp)); g.rotate(-0.25); g.fillRect(-60, -16, 120, 32); g.strokeRect(-60, -16, 120, 32); g.restore(); }
      txt(g, 'amprenta anală:\ndimineața, înainte\nde toaletă', 590, 400, 14, K.hi, { w: 700, alpha: e >= 0.62 || b.i > 1 ? 1 : 0.35 });
      // barele: amprenta > 50% vs scaun 10–15%
      { const bx = 860, by = 450, bh = 110; const gr = b.i > 1 ? 1 : sm(e, 0.8, 0.98); for (const [dx, v, lab, col] of [[-36, 0.55, '> 50%', K.ok], [36, 0.125, '10–15%', '#ff9a8a']]) { const hh = bh * v * gr; g.save(); g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 3; g.fillRect(bx + dx - 20, by - hh, 40, hh); g.strokeRect(bx + dx - 20, by - hh, 40, hh); g.restore(); txt(g, lab, bx + dx, by - hh - 14, 13, col); } txt(g, 'amprentă · scaun', bx, by + 16, 12, K.dim, { w: 700 }); }
      // ---------- 3 · TRICHURIS
      hl(g, 506, 506, 476, 408, A(b, 2));
      txt(g, 'TRICHURIS (tricocefalul)', 740, 534, 20, '#ffd9a8');
      g.save(); g.fillStyle = '#f3e3c0'; g.fillRect(526, 560, 436, 140); g.fillStyle = K.sub; g.fillRect(526, 740, 436, 80); g.restore();
      for (let k = 0; k < 20; k++) { const cx = 536 + k * 22; ell(g, cx, 720, 10, 19, K.muc, { ow: 2.5 }); dot(g, cx, 728, 4, '#8a4a7a', { ow: 0 }); }
      txt(g, 'mucoasa cecului', 610, 790, 15, OUT, { stroke: false });
      const wq = (k) => Math.sin(t * 2 + k) * 5;
      const tw = b.i === 2 ? sm(b.bt / b.bd, 0, 0.5) : 1;
      worm(g, [[700, 742], [690, 728], [700, 705], [740, 690 - 30 * tw + wq(0)], [800, 640 + wq(1)], [850, 620 + wq(2)], [880, 650 + wq(3)]], 14, '#f4dccc', { thin: 0.5, ow: 4 });
      lead(g, 690, 735, 600, 650); txt(g, 'capătul efilat\nînfipt în mucoasă', 600, 620, 14, K.cream, { w: 700 });
      g.save(); g.fillStyle = K.soil; g.fillRect(526, 830, 140, 64); g.restore(); txt(g, 'ou din sol\n(geohelmint)', 596, 862, 14, '#fff3e6', { w: 700 });
      egg(g, 800, 862, 'lemon', 34, { rot: Math.sin(t) * 0.1 });
      txt(g, '„în lămâie” · Kato-Miura', 870, 905, 14, K.cream, { w: 700 });
      void p;
    },
  };
}

/* ==================================================================== D8 · NEMATODELE PRIN PIELE, CARNE, DE LA ANIMALE
CE TREBUIE SĂ SE VADĂ (corpul în stânga, fișele „ce cauți” în dreapta, capcana jos)
 1 Ancylostoma: larva filariformă din SOL străbate pielea intactă a piciorului → urcă prin sânge → PLĂMÂN → trahee → înghițită → DUODEN; acolo
   viermele mușcă mucoasa, picături de sânge = anemie feriprivă. Fișa: ouă în scaun; larvoscopie.
 2 Strongyloides: larva filariformă prin piele (celălalt picior), același drum → duoden, jejun; OUĂLE ECLOZEAZĂ în intestin → în scaun coboară LARVE
   (nu ouă); bucla de autoinfecție. Fișa: LARVE în scaun, lichid duodenal.
 3 Trichinella: carnea de porc / mistreț intră pe gură → intestin → larvele merg prin sânge în MUȘCHIUL STRIAT (gambă, deltoid) și se închistează
   (spirală în capsulă). Fișa: biopsia comprimată între 2 lame → trichineloscop.
 4 Toxocara: ouă de la câine (cățel) → gura → intestin → larva migrează în ficat, plămân, ochi și NU se maturizează (rămâne larvă) → fără ouă la om.
   Fișa: serologie, eozinofilie.
 Capcana (jos): Enterobius, Strongyloides, Toxocara, hidatidoza → oul barat = fără ouă în scaun. */
export function d_skin() {
  const B = { x: 230, y: 34, s: 0.86 };
  const skin1 = bpath(B, [[-84, 846], [-70, 700], [-58, 540], [-10, 470], [6, 420], [8, 330], [22, 298], [50, 268], [30, 230], [0, 205], [0, 124]]);
  const skin2 = bpath(B, [[84, 846], [70, 700], [58, 540], [20, 470], [6, 420], [8, 330], [22, 298], [50, 268], [30, 230], [0, 205], [0, 124]]);
  const toDuo = bpath(B, GI.slice(0, 9));
  const toJej = bpath(B, GI.concat(SI.slice(1, 3)));
  const mus = [bpath(B, [[20, 440], [0, 500], [-50, 560], [-66, 745]]), bpath(B, [[20, 440], [6, 380], [8, 260], [-80, 200], [-138, 205]])];
  const tox = [bpath(B, [[20, 440], [-20, 390], [-55, 335]]), bpath(B, [[20, 440], [6, 380], [8, 300], [58, 258]]), bpath(B, [[20, 440], [6, 380], [8, 230], [-4, 130], [-20, 78]])];
  const C = [[780, 105], [780, 290], [780, 475], [780, 660]];
  const CT = [['Ancylostoma', 'ouă în scaun;\nlarvoscopie'], ['Strongyloides', 'LARVE (nu ouă):\nscaun, lichid duodenal'], ['Trichinella', 'biopsie musculară,\ntrichineloscop'], ['Toxocara', 'fără ouă la om:\nserologie, eozinofilie']];
  return {
    home: HOME,
    anchors: [[100, 760], [370, 760], [572, 400], [572, 585]],
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      g.save(); g.fillStyle = K.soil; g.fillRect(20, 790, 440, 46); g.restore(); txt(g, 'sol', 440, 812, 15, '#fff3e6', { w: 700 });
      body(g, B);
      const U = (k, per = 8) => (b.i < 0 ? loopT(t + k * 2, per) : b.i === k ? clamp(b.bt / (b.bd * 0.9)) : 1);
      const D = bp(B, 'duo');
      // 1 · Ancylostoma
      { const u = U(0); dash(g, skin1, '#ff9a8a', 3, A(b, 0) ? 0.85 : 0.2);
        if (A(b, 0)) { if (u < 0.55) larva(g, ...at(skin1, u / 0.55).slice(0, 2), 26, -1.3, t); else if (u < 0.8) larva(g, ...at(toDuo, (u - 0.55) / 0.25).slice(0, 2), 18, 1.2, t); }
        const bite = b.i > 0 ? 1 : A(b, 0) ? sm(u, 0.78, 0.9) : 0;
        if (bite > 0) { worm(g, [[D[0] - 22, D[1] + 4], [D[0] - 8, D[1] - 6], [D[0] + 10, D[1] + 2]], 8, '#f4dccc', { ow: 3, alpha: vis(b, 0) }); if (A(b, 0)) for (let k = 0; k < 3; k++) { const v = (t * 0.8 + k / 3) % 1; dot(g, D[0] - 26 - k * 4, D[1] + 8 + v * 26, 4, K.blood, { ow: 1.5, alpha: 1 - v }); } }
        if (A(b, 0)) larva(g, 62, 812, 22, 0.2 + Math.sin(t) * 0.2, t);
      }
      // 2 · Strongyloides
      { const u = U(1); dash(g, skin2, '#ffd09a', 3, A(b, 1) ? 0.85 : 0.2);
        if (A(b, 1)) { if (u < 0.45) larva(g, ...at(skin2, u / 0.45).slice(0, 2), 26, -1.3, t, '#fff0c8'); else if (u < 0.65) larva(g, ...at(toJej, (u - 0.45) / 0.2).slice(0, 2), 18, 1.2, t, '#fff0c8');
          // ouăle eclozează în intestin → larve coboară spre anus
          const J = bp(B, [20, 452]); if (u > 0.62 && u < 0.78) egg(g, J[0], J[1], 'hook', 9, { alpha: 1 - sm(u, 0.7, 0.78) });
          const down = curve([J, bp(B, [-86, 480]), bp(B, [0, 530]), bp(B, 'anus'), [B.x, 788]]); if (u > 0.72) larva(g, ...at(down, sm(u, 0.72, 1)).slice(0, 2), 14, 1.5, t, '#fff0c8');
          const loopA = curve([bp(B, [40, 470]), bp(B, [90, 500]), bp(B, [60, 430]), bp(B, [30, 440])]); dash(g, loopA, K.hi, 3, 0.9);
          txt(g, 'autoinfecție', 460, bp(B, [60, 470])[1], 14, K.hi, { w: 700 }); }
        if (A(b, 1)) larva(g, 360, 812, 22, 2.9 + Math.sin(t) * 0.2, t, '#fff0c8');
        txt(g, 'larva filariformă\nprin PIELE', 230, 868, 15, '#ffd09a', { alpha: A(b, 0) || A(b, 1) ? 1 : 0.4, w: 700 });
      }
      // 3 · Trichinella: carne → gură → intestin → sânge → mușchi striat (închistare)
      { const u = U(2); const a = vis(b, 2);
        g.save(); g.globalAlpha = a; meat(g, 470, 118, 0.45, 2); g.restore(); txt(g, 'CARNE porc,\nmistreț', 470, 62, 14, '#ff9a8a', { alpha: a });
        if (A(b, 2)) { const ein = curve([[450, 118], [340, 110], bp(B, 'mouth')]); if (u < 0.15) meat(g, ...at(ein, u / 0.15).slice(0, 2), 0.18, 0); else if (u < 0.4) dot(g, ...at(toJej, (u - 0.15) / 0.25).slice(0, 2), 5, '#fffbe6', { ow: 2 }); else if (u < 0.7) mus.forEach((Pc) => larva(g, ...at(Pc, (u - 0.4) / 0.3).slice(0, 2), 12, 0, t, '#f0d9a8')); }
        const ec = b.i > 2 ? 1 : A(b, 2) ? sm(u, 0.68, 0.85) : 0;
        if (ec > 0) { trichCyst(g, ...bp(B, 'calf'), 9 * ec + 0.1, t, a); trichCyst(g, ...bp(B, 'deltoid'), 8 * ec + 0.1, t, a); }
        lead(g, ...bp(B, 'calf'), 430, 712, a); txt(g, 'mușchi striat\n(solear)', 470, 730, 14, K.cream, { alpha: a, w: 700 });
        lead(g, ...bp(B, 'deltoid'), 60, 300, a); txt(g, 'deltoid', 60, 320, 14, K.cream, { alpha: a, w: 700 });
      }
      // 4 · Toxocara: ouă de la câine → larva migrans (ficat, plămân, ochi), nu se maturizează
      { const u = U(3); const a = vis(b, 3);
        g.save(); g.globalAlpha = a; dog(g, 70, 95, 0.42, t); g.restore(); txt(g, 'ouă de la\nCÂINE (cățeii)', 85, 30, 14, '#c9a0ff', { alpha: a });
        if (A(b, 3)) { const ein = curve([[110, 120], [160, 150], bp(B, 'mouth')]); if (u < 0.15) egg(g, ...at(ein, u / 0.15).slice(0, 2), 'asc', 8, { larva: true }); else if (u < 0.4) dot(g, ...at(toJej, (u - 0.15) / 0.25).slice(0, 2), 5, '#fffbe6', { ow: 2 }); else tox.forEach((Pc) => larva(g, ...at(Pc, sm(u, 0.4, 0.75)).slice(0, 2), 11, Math.sin(t * 3), t, '#e3d0ff')); }
        txt(g, 'larva migrans:\nficat, plămân, ochi', 478, 300, 14, '#c9a0ff', { alpha: a, w: 700 });
      }
      txt(g, 'duoden', 450, D[1] + 34, 14, K.cream, { w: 700 }); lead(g, D[0] + 18, D[1] + 10, 418, D[1] + 34);
      // fișele „ce cauți”
      C.forEach(([x, y], k) => {
        const a = vis(b, k); hl(g, x - 200, y - 80, 400, 160, A(b, k));
        txt(g, CT[k][0], x - 90, y - 52, 18, '#ffd9a8', { alpha: a });
        txt(g, CT[k][1], x + 40, y + 16, 16, K.cream, { alpha: a, w: 700 });
        g.save(); g.globalAlpha = a;
        if (k === 0) egg(g, x - 140, y + 16, 'hook', 26);
        if (k === 1) { stool(g, x - 140, y + 26, 0.75); larva(g, x - 140, y + 4, 34, 0.2, t, '#fff0c8'); }
        if (k === 2) { const sq = A(b, 2) ? sm((b.i < 0 ? loopT(t, 4) : clamp(b.bt / b.bd)), 0, 0.6) : 1; slideGlass(g, x - 140, y + 16 - 24 + 10 * sq, 90, 18); slideGlass(g, x - 140, y + 16 + 24 - 10 * sq, 90, 18); g.save(); g.fillStyle = '#d8505a'; g.fillRect(x - 170, y + 16 - 14 + 10 * sq, 60, 28 - 20 * sq); g.restore(); }
        if (k === 3) { egg(g, x - 140, y + 16, 'asc', 22); cross(g, x - 140, y + 16, 20, K.red); }
        g.restore();
      });
      // capcana: fără ouă în scaun
      hl(g, 540, 746, 442, 150, false, { fill: 'rgba(255,107,94,.12)', stroke: 'rgba(255,107,94,.65)' });
      txt(g, 'CAPCANA: fără ouă în scaun', 761, 772, 16, K.red);
      [['Enterobius', '(amprenta)'], ['Strongyloides', '(larve)'], ['Toxocara', '(serologie)'], ['hidatidoza', '(serologie)']].forEach(([n, m], k) => { const x = 580 + (k % 2) * 215, y = 815 + Math.floor(k / 2) * 46; egg(g, x, y, 'asc', 10); cross(g, x, y, 10, K.red); txt(g, n + ' ' + m, x + 96, y, 13, K.cream, { w: 700 }); });
      void p;
    },
  };
}
