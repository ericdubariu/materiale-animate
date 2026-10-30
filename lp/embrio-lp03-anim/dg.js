// Kit LP 3 (digestiv + respirator): culori, harta tubului intestinal, secțiunea prin duoden, esofag/trahee, radiografia „double bubble”.
// Culori ca în celelalte deck-uri Embrio: galben = endoderm, roșu = mezoderm / artere, albastru = ectoderm / căile respiratorii.
import {
  W, H, cam, HOME, C, bg, panel, P, on, loopT, txt, pill, curve, at, sub, tube, flow, dot, ell, arr, ring, lead,
  mix, stage, photoCap, OUT, clamp, lerp, ease, paint, smooth, blob, bb, REDUCED, st,
} from './ek.js';
export {
  W, H, cam, HOME, C, bg, panel, P, on, loopT, txt, pill, curve, at, sub, tube, flow, dot, ell, arr, ring, lead,
  mix, stage, photoCap, OUT, clamp, lerp, ease, paint, smooth, blob, bb, REDUCED, st,
};

export const D = {
  endo: '#f4c34f', endoS: '#d19a22', endoL: '#fff0b8', epi: '#ffd979',
  meso: '#e0574f', mesoS: '#a92b27', mesoP: '#f2a39b', mesoPS: '#d97a70',
  ecto: '#5b9be8', ectoS: '#2f68bd', ectoL: '#cfe0ff',
  art: '#e0443e', artS: '#a92b27',
  liver: '#9a5530', liverS: '#6a3519', liverL: '#c98a5e',
  bile: '#3db06c', bileS: '#23824c',
  pancV: '#7fd0f0', pancVS: '#3f9cc4', pancD: '#e86a5a', pancDS: '#b8463a',
  colon: '#9bd36a', colonS: '#6aa63e', si: '#f4c34f', siS: '#d19a22',
  lung: '#7fb8f0', lungS: '#3f7fc4', lungL: '#d7eaff', pleura: '#f6b6c8',
  bursa: '#bfe6ff', peri: '#f6c38a', periS: '#d99a5a',
  wall: '#e9d6bd', wallS: '#c9b08e', cav: '#4a3540', skin: '#f3c29b', skinS: '#d99b72',
  amn: '#9fd8ff', vagL: '#3db06c', vagR: '#b48ae6', spleen: '#b0405a', spleenS: '#7e2a3e',
  anal: '#9a6ad6', analS: '#7146ad', septum: '#d9483f', kidney: '#c9473f',
  cream: '#fff3e6', dim: '#c9b3a6', note: '#d8c4b8',
};

// eticheta mică (alb-crem, contur) — pentru desen; fără roșu de examen
export const lab = (g, s, x, y, size = 18, col = D.cream, o = {}) => txt(g, s, x, y, size, col, { w: 700, ...o });

// fracțiunea de lungime (0..1) a primului punct de pe curbă cu x ≥ x0
export function uOfX(P0, x0) {
  const L = [0]; for (let k = 1; k < P0.length; k++) L.push(L[k - 1] + Math.hypot(P0[k][0] - P0[k - 1][0], P0[k][1] - P0[k - 1][1]));
  for (let k = 0; k < P0.length; k++) if (P0[k][0] >= x0) return L[k] / L[L.length - 1];
  return 1;
}
// arc cu săgeată (sens: dir = +1 orar pe ecran, -1 antiorar); a0, a1 în radiani (convenția canvas, y în jos)
export function arcArrow(g, x, y, r, a0, a1, col = '#ffe36e', w = 6, alpha = 1) {
  if (alpha <= 0.01) return;
  g.save(); g.globalAlpha = clamp(alpha); g.lineCap = 'round';
  const ccw = a1 < a0;
  g.strokeStyle = OUT; g.lineWidth = w + 6; g.beginPath(); g.arc(x, y, r, a0, a1, ccw); g.stroke();
  g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.arc(x, y, r, a0, a1, ccw); g.stroke();
  const ex = x + Math.cos(a1) * r, ey = y + Math.sin(a1) * r; const tg = a1 + (ccw ? -Math.PI / 2 : Math.PI / 2);
  g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 3.5; g.beginPath();
  g.moveTo(ex + Math.cos(tg) * 20, ey + Math.sin(tg) * 20); g.lineTo(ex + Math.cos(tg + 2.5) * 18, ey + Math.sin(tg + 2.5) * 18); g.lineTo(ex + Math.cos(tg - 2.5) * 18, ey + Math.sin(tg - 2.5) * 18); g.closePath(); g.stroke(); g.fill();
  g.restore();
}
export function cross(g, x, y, s = 30, col = '#ff6b5e', a = 1) {
  if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round';
  for (const [w, c] of [[s * 0.42 + 6, OUT], [s * 0.42, col]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - s, y - s); g.lineTo(x + s, y + s); g.moveTo(x + s, y - s); g.lineTo(x - s, y + s); g.stroke(); }
  g.restore();
}
// buclă de intestin (anse subțiri) într-o zonă: linie șerpuită groasă
export function coils(g, x0, y0, w, h, rows, col = D.si, prog = 1, o = {}) {
  const pts = []; const n = rows;
  for (let r = 0; r < n; r++) {
    const y = y0 + (r + 0.5) * h / n; const dir = r % 2 ? -1 : 1;
    for (let k = 0; k <= 6; k++) { const u = k / 6; const xx = dir > 0 ? x0 + u * w : x0 + w - u * w; pts.push([xx, y + Math.sin(u * Math.PI * 3 + r) * h / n * 0.22]); }
  }
  if (prog <= 0.01) return pts;
  tube(g, pts, o.w || 26, col, { u1: prog, alpha: o.alpha, glow: o.glow });
  return pts;
}

/* ===================== HARTA TUBULUI INTESTINAL (vedere laterală: cranial stânga, dorsal sus) ===================== */
export const GUT = [[125, 440], [200, 440], [290, 442], [350, 446], [420, 452], [470, 464], [528, 502], [575, 560], [622, 505], [680, 466], [760, 452], [830, 452], [868, 456]];
const GP = curve(GUT);
export const SEG = { fore: [0, uOfX(GP, 455)], mid: [uOfX(GP, 455), uOfX(GP, 700)], hind: [uOfX(GP, 700), 1] };
export const SEGX = { fore: [125, 455], mid: [455, 700], hind: [700, 912] };
export const ART = { fore: [[368, 228], [362, 330], [356, 420]], mid: [[560, 228], [566, 380], [575, 540]], hind: [[770, 228], [772, 340], [775, 438]] };
export const SEGC = { fore: '#ffcf5a', mid: '#9bd36a', hind: '#c39af0' };
// hl: { fore, mid, hind, mouth, stomach, loop, cloaca, liver, lung } → 0..1
export function gutMap(g, t, hl = {}, o = {}) {
  const k = (n) => hl[n] || 0;
  // acoladele segmentelor (sus)
  [['fore', 'PREENTERON'], ['mid', 'MESENTERON'], ['hind', 'METENTERON']].forEach(([n, s]) => {
    const [x0, x1] = SEGX[n]; const a = 0.55 + 0.45 * k(n);
    tube(g, [[x0 + 6, 132], [x1 - 6, 132]], 10, SEGC[n], { ow: 4, alpha: a, glow: k(n) });
    tube(g, [[x0 + 6, 132], [x0 + 6, 150]], 6, SEGC[n], { ow: 3, alpha: a }); tube(g, [[x1 - 6, 132], [x1 - 6, 150]], 6, SEGC[n], { ow: 3, alpha: a });
    txt(g, s, (x0 + x1) / 2, 104, 21, SEGC[n], { alpha: a });
  });
  // aorta + cele 3 artere
  tube(g, [[140, 215], [905, 215]], 26, D.art, { ow: 6 });
  lab(g, 'aorta dorsală', 215, 182, 17);
  for (const n of ['fore', 'mid', 'hind']) tube(g, ART[n], 12, D.art, { ow: 5, glow: k(n) });
  lab(g, 'a. celiacă', 290, 322, 17); lab(g, 'a. mezenterică sup.', 668, 330, 17); lab(g, 'a. mezenterică inf.', 880, 300, 17);
  // diverticulul respirator + hepatic
  tube(g, [[215, 455], [212, 520], [206, 584]], 22, D.lung, { ow: 5, glow: k('lung') });
  ell(g, 194, 592, 15, 13, D.lung, { ow: 4 }); ell(g, 220, 594, 15, 13, D.lung, { ow: 4 });
  tube(g, [[452, 470], [440, 520], [425, 562]], 20, D.liver, { ow: 5, glow: k('liver') });
  ell(g, 423, 568, 17, 15, D.liver, { ow: 4 });
  // sacul vitelin
  tube(g, [[575, 575], [575, 700]], 12, D.endoL, { ow: 4 });
  ell(g, 575, 772, 86, 70, D.endoL, { ow: 5, shade: '#f0d98a' });
  lab(g, 'sac vitelin', 575, 772, 18, OUT, { stroke: false }); lab(g, 'duct vitelin', 650, 650, 16);
  // alantoida
  tube(g, [[850, 492], [826, 580], [796, 690]], 14, D.endoL, { ow: 4 }); lab(g, 'alantoida', 770, 726, 17);
  // tubul
  tube(g, GUT, 34, D.endo, { ow: 6 });
  for (const n of ['fore', 'mid', 'hind']) if (k(n) > 0.02) tube(g, GUT, 34, SEGC[n], { ow: 0, u0: SEG[n][0], u1: SEG[n][1], alpha: k(n), glow: k(n) });
  ell(g, 350, 446, 62, 34, k('fore') > 0.5 ? SEGC.fore : D.endo, { ow: 5 });
  ell(g, 870, 458, 42, 48, k('hind') > 0.5 ? SEGC.hind : D.endo, { ow: 5 });
  // membranele
  tube(g, [[118, 410], [118, 470]], 9, '#2a1534', { ow: 0 }); tube(g, [[914, 428], [914, 488]], 9, '#2a1534', { ow: 0 });
  lab(g, 'membrana\nbucofaringiană', 108, 528, 16); lab(g, 'membrana\ncloacală', 930, 545, 16);
  lab(g, 'stomac', 348, 505, 17); lab(g, 'cloaca', 870, 395, 17);
  lab(g, 'diverticul\nrespirator (S4)', 205, 650, 16); lab(g, 'diverticul\nhepatic (S3)', 415, 625, 16);
  if (o.orient !== false) lab(g, 'DORSAL ↑\nVENTRAL ↓', 110, 870, 16, D.note);
  // inele pe structuri
  const R = { mouth: [118, 440, 34, 50], stomach: [350, 446, 84, 56], loop: [575, 520, 70, 70], cloaca: [878, 458, 66, 70], liver: [440, 525, 46, 62], lung: [210, 530, 44, 82] };
  for (const n in R) if (k(n) > 0.02) ring(g, R[n][0], R[n][1], R[n][2], R[n][3], k(n));
}

/* ===================== SECȚIUNEA PRIN DUODEN (perete + epiteliu + lumen + vacuole) ===================== */
// lum = raza lumenului (0 = astupat); vac = 0..1 creșterea vacuolelor; o.cells = densitatea celulelor desenate
export function duoSection(g, x, y, R, lum, vac, t, o = {}) {
  const a = o.alpha ?? 1;
  g.save(); g.globalAlpha = clamp(a);
  ell(g, x, y, R, R, D.mesoP, { shade: D.mesoPS, ow: 6 });
  const re = R * 0.74;
  ell(g, x, y, re, re, D.epi, { ow: 4 });
  // celulele epiteliului (texturi): puncte în inel, până la lumen
  const n = o.cells ?? 120;
  for (let k = 0; k < n; k++) {
    const ang = k * 2.39996, rr = Math.sqrt((k + 0.5) / n) * re * 0.96;
    if (rr < lum + 6) continue;
    g.fillStyle = 'rgba(160,110,20,.55)'; g.beginPath(); g.arc(x + Math.cos(ang) * rr, y + Math.sin(ang) * rr, Math.max(2.4, R * 0.022), 0, 7); g.fill();
  }
  if (vac > 0) {
    const V = [[0.0, 0.0, 0.8], [0.45, -0.25, 0.55], [-0.4, 0.3, 0.6], [0.3, 0.45, 0.5], [-0.42, -0.35, 0.5], [0.55, 0.2, 0.45], [-0.1, -0.55, 0.45], [-0.6, 0.0, 0.4]];
    V.forEach(([vx, vy, s], i) => { const r = R * 0.16 * s * clamp(vac * 1.6 - i * 0.06); if (r > 1) ell(g, x + vx * re * 0.75, y + vy * re * 0.75, r, r, '#ffffff', { ow: 3 }); });
  }
  if (lum > 1) ell(g, x, y, lum, lum, '#ffffff', { ow: 4 });
  g.restore();
}

/* ===================== ESOFAG + TRAHEE (atrezie esofagiană cu fistulă distală) ===================== */
// vedere din față, schematic. o.ng = sonda nasogastrică oprită în fundul de sac; o.air = bule de aer
export function teFistula(g, t, ox, oy, s, o = {}) {
  g.save(); g.translate(ox, oy); g.scale(s, s);
  const hl = o.hl ?? -1;
  // plămânii
  ell(g, 230, 640, 120, 170, D.pleura, { ow: 5, shade: '#e795ad', alpha: 0.9 });
  ell(g, 600, 640, 120, 170, D.pleura, { ow: 5, shade: '#e795ad', alpha: 0.9 });
  // traheea + bronhiile
  tube(g, [[415, 60], [415, 470]], 56, D.lung, { ow: 6, lumen: D.lungL });
  for (let y = 100; y < 460; y += 42) tube(g, [[392, y], [438, y]], 6, '#ffffff', { ow: 0, alpha: 0.55 });
  tube(g, [[415, 465], [330, 540], [270, 610]], 40, D.lung, { ow: 6, lumen: D.lungL });
  tube(g, [[415, 465], [500, 540], [560, 610]], 40, D.lung, { ow: 6, lumen: D.lungL });
  // esofagul superior: fund de sac
  tube(g, [[560, 40], [560, 300]], 54, D.endo, { ow: 6, lumen: D.endoL, cap: 'round', glow: hl === 0 ? 1 : 0 });
  // esofagul inferior pleacă din trahee (fistula) și coboară la stomac
  tube(g, [[440, 420], [520, 450], [575, 520], [585, 700], [600, 800]], 44, D.endo, { ow: 6, lumen: D.endoL, glow: hl === 1 ? 1 : 0 });
  // stomacul
  const sp = new Path2D(); sp.ellipse(660, 880, 140, 95, -0.25, 0, Math.PI * 2);
  paint(g, sp, D.endo, D.endoS, D.endoL, [520, 785, 280, 190], OUT, 6);
  if (o.air !== false) {
    const k = hl === 2 ? 1 : 0.85;
    g.save(); g.clip(sp); g.fillStyle = 'rgba(30,20,40,.85)'; g.beginPath(); g.ellipse(650, 838, 120, 42, -0.25, 0, 7); g.fill(); g.restore();
    lab(g, 'aer', 650, 838, 20, '#ffffff', { alpha: k });
    // bulele care trec prin fistulă
    for (let j = 0; j < 5; j++) { const u = ((j / 5) + (REDUCED ? 0 : t * 0.12)) % 1; const [x, y] = at(curve([[440, 420], [520, 450], [575, 520], [585, 700], [600, 800]]), u); dot(g, x, y, 7, '#ffffff', { ow: 2.5, alpha: 0.85 }); }
  }
  if (o.ng) { tube(g, [[560, -40], [560, 270]], 10, '#ffffff', { ow: 3 }); arcArrow(g, 560, 290, 22, -2.6, 0.5, '#ffffff', 4, 0.9); }
  if (o.saliva) for (let j = 0; j < 6; j++) dot(g, 545 + (j % 3) * 14, 200 + Math.floor(j / 3) * 22 + Math.sin(t * 2 + j) * 3, 6, '#dff4ff', { ow: 2 });
  g.restore();
  const T = (x, y) => [ox + x * s, oy + y * s];
  if (o.labels !== false) {
    lab(g, 'trahee', ...T(330, 120), 18); lab(g, 'esofag', ...T(665, 110), 18);
    lab(g, 'fund de sac', ...T(690, 300), 18); lab(g, 'fistulă\nspre trahee', ...T(330, 395), 17);
    lab(g, 'stomac', ...T(845, 905), 18);
  }
  return { pouch: T(560, 300), fist: T(470, 432), stom: T(650, 840) };
}

/* ===================== RADIOGRAFIA „DOUBLE BUBBLE” (schemă) ===================== */
export function xray(g, x, y, w, h, hl = -1, t = 0) {
  g.save();
  g.fillStyle = '#0b0b0d'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(x, y, w, h, 18); g.fill(); g.stroke();
  // abdomenul (gri) + coloana
  const cx = x + w / 2, cy = y + h / 2;
  g.fillStyle = '#7d7d82'; g.beginPath(); g.roundRect(x + w * 0.1, y + h * 0.06, w * 0.8, h * 0.9, w * 0.2); g.fill();
  g.fillStyle = '#b9b9be'; for (let k = 0; k < 7; k++) { g.beginPath(); g.roundRect(cx - w * 0.045, y + h * (0.1 + k * 0.12), w * 0.09, h * 0.09, 6); g.fill(); }
  // bulele (aer = negru)
  const b1 = [cx + w * 0.17, cy - h * 0.18, w * 0.17, h * 0.15], b2 = [cx - w * 0.15, cy - h * 0.08, w * 0.11, h * 0.1];
  for (const [bx, by, rx, ry] of [b1, b2]) { g.fillStyle = '#121216'; g.beginPath(); g.ellipse(bx, by, rx, ry, 0, 0, 7); g.fill(); g.strokeStyle = '#d9d9df'; g.lineWidth = 2.5; g.stroke(); }
  // nivelul de lichid (jos în bule)
  g.fillStyle = '#9a9aa0'; for (const [bx, by, rx, ry] of [b1, b2]) { g.save(); g.beginPath(); g.ellipse(bx, by, rx, ry, 0, 0, 7); g.clip(); g.fillRect(bx - rx, by + ry * 0.35, rx * 2, ry); g.restore(); }
  g.restore();
  if (hl === 0) ring(g, b1[0], b1[1], b1[2] + 16, b1[3] + 16, ease(clamp(t)));
  if (hl === 1) ring(g, b2[0], b2[1], b2[2] + 16, b2[3] + 16, ease(clamp(t)));
  if (hl === 2) ring(g, cx, cy + h * 0.25, w * 0.33, h * 0.17, ease(clamp(t)));
  return { b1: [b1[0], b1[1]], b2: [b2[0], b2[1]], low: [cx, cy + h * 0.25] };
}
