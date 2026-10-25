// Partea E: atlasul mediilor (paginile 65–117 ale deck-ului de examen Micro).
// e_media  = poza reală de la LP (versiunea curată, fără badge-uri: img/e_*.jpg) + elipsele DOAR pe ce se vede sigur + mini-animația
//            mecanismului în panoul de jos. Pe beat-ul de intro: doar poza goală + întrebarea; textul din stânga arată doar cele 4
//            întrebări (sincronizare DOM, limitată la slide-urile e_media: totul stă într-un element .eQ din #body, care dispare
//            singur când motorul redesenează textul altui slide).
// e_simabe = SIM și ABE de pe tablă (fără poză) · e_recap = recapitularea tuturor mediilor · e_formula = separatorul cu formula de răspuns.
import { HOME, M, OUT, clamp, lerp, ease, REDUCED, txt, pill, panel, plate, colony, testTube, coccus, bacillus, dot, ell, pic, P, paint, loop } from './mk.js';

const PH = { x: 16, y: 12, w: 968, h: 560 };   // zona pozei
const PN = { x: 16, y: 588, w: 968, h: 334 };  // panoul cu mecanismul
const TAU = Math.PI * 2;
const seg = (u, a, b) => ease(clamp((u - a) / (b - a)));
const rgb = (c) => { const s = c.replace('#', ''); return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16)); };
function mix(a, b, u) { const A = rgb(a), B = rgb(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(u))).toString(16).padStart(2, '0')).join(''); }
const rgba = (c, a) => { const [r, g, b] = rgb(c); return `rgba(${r},${g},${b},${a})`; };
const cyc = (bt, L) => (REDUCED ? 0.95 : (bt % L) / L);
const rnd = (k) => { const s = Math.sin(k * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const KEYC = ['#ffe36e', '#7fe8ff', '#9dff8a', '#ffa3e0', '#ffb36b', '#c9b3ff'];
function lab(g, s, x, y, size = 18, col = M.cream, a = 1) { if (s && a > 0.01) txt(g, s, x, y, size, col, { w: 700, alpha: a }); }

/* ---------------- piese mici ---------------- */
function cross(g, x, y, r, a = 1) {
  if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round';
  [[r * 0.6, OUT], [r * 0.34, '#ff4d4d']].forEach(([w, c]) => { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - r, y - r); g.lineTo(x + r, y + r); g.moveTo(x + r, y - r); g.lineTo(x - r, y + r); g.stroke(); });
  g.restore();
}
function tick(g, x, y, r, a = 1) {
  if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round'; g.lineJoin = 'round';
  [[r * 0.6, OUT], [r * 0.34, '#5fe08a']].forEach(([w, c]) => { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - r, y); g.lineTo(x - r * 0.3, y + r * 0.7); g.lineTo(x + r, y - r * 0.7); g.stroke(); });
  g.restore();
}
function hexM(g, x, y, r, col, a = 1) {
  if (a <= 0.01 || r <= 0.5) return; const p = new Path2D();
  for (let k = 0; k < 6; k++) { const an = Math.PI / 6 + k * Math.PI / 3; const px = x + r * Math.cos(an), py = y + r * Math.sin(an); if (k) p.lineTo(px, py); else p.moveTo(px, py); }
  p.closePath(); g.save(); g.globalAlpha = clamp(a); g.fillStyle = col; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 3.5; g.stroke(p); g.restore();
}
function dropI(g, x, y, r, col, a = 1) {
  if (a <= 0.01) return; const p = new Path2D(); p.moveTo(x, y - r * 1.4); p.bezierCurveTo(x + r * 0.9, y - r * 0.3, x + r, y + r * 0.9, x, y + r); p.bezierCurveTo(x - r, y + r * 0.9, x - r * 0.9, y - r * 0.3, x, y - r * 1.4); p.closePath();
  g.save(); g.globalAlpha = clamp(a); g.fillStyle = col; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 3.5; g.stroke(p); g.restore();
}
function rbc(g, x, y, r, col, a = 1) {
  if (a <= 0.01) return; ell(g, x, y, r, r * 0.8, col, { alpha: a, ow: 2.5 });
  g.save(); g.globalAlpha = clamp(a) * 0.5; g.fillStyle = mix(col, '#ffffff', 0.35); g.beginPath(); g.ellipse(x, y, r * 0.42, r * 0.32, 0, 0, TAU); g.fill(); g.restore();
}
function yeastC(g, x, y, s = 1, a = 1, bud = 1, col = '#f6ecd0') {
  if (a <= 0.01) return; ell(g, x, y, 15 * s, 11 * s, col, { alpha: a, ow: Math.max(1.5, 3 * Math.min(1, s)) });
  if (bud > 0.05) ell(g, x + 15 * s, y - 7 * s, 7 * s * bud, 6 * s * bud, col, { alpha: a, ow: Math.max(1.5, 3 * Math.min(1, s)) });
}
// germenii ca la microscop (colorați Gram): coci violet = Gram +, bacili roz-roșii = Gram −; levurile = celule ovale cu mugure
function germ(g, type, x, y, s = 1, a = 1) {
  if (a <= 0.01) return;
  if (type === 'staph') [[0, 0], [-15, -5], [14, -8], [-6, 13], [11, 12], [-20, 10], [3, -17]].forEach(([dx, dy]) => coccus(g, x + dx * s, y + dy * s, 8 * s, M.gram, a));
  else if (type === 'strep') for (let k = 0; k < 6; k++) coccus(g, x + (k - 2.5) * 14 * s, y + Math.sin(k * 1.1) * 6 * s, 7 * s, M.gram, a);
  else if (type === 'pneumo') [-1, 1].forEach((d) => ell(g, x + d * 10 * s, y, 10 * s, 6.5 * s, M.gram, { alpha: a, ow: 2.5 }));
  else if (type === 'entero') [[-17, 0], [-4, 0], [9, 7], [22, 7]].forEach(([dx, dy]) => coccus(g, x + dx * s, y + dy * s, 6.5 * s, M.gram, a));
  else if (type === 'gneg') { bacillus(g, x - 12 * s, y - 8 * s, 42 * s, 15 * s, 0.4, M.gramN, a); bacillus(g, x + 13 * s, y + 9 * s, 42 * s, 15 * s, -0.3, M.gramN, a); }
  else if (type === 'yeast') { yeastC(g, x - 10 * s, y + 4 * s, s, a, 1); yeastC(g, x + 12 * s, y - 12 * s, 0.75 * s, a, 0.6); }
}
function cell(g, type, x, y, t) {
  const bob = REDUCED ? 0 : Math.sin(t * 2) * 3;
  if (type === 'staph') germ(g, 'staph', x, y + bob, 1.5);
  else if (type === 'yeast') yeastC(g, x, y + bob, 2.2, 1, 1);
  else if (type === 'entero') germ(g, 'entero', x, y + bob, 1.6);
  else bacillus(g, x, y + bob, 92, 36, 0.12 * Math.sin(t * 1.3), M.gramN);
}
// colonie văzută din profil (cupolă) pe linia agarului
function dome(g, x, base, w, h, col, a = 1) {
  if (a <= 0.01 || w < 1) return; const p = new Path2D(); p.moveTo(x - w, base); p.bezierCurveTo(x - w, base - h * 1.33, x + w, base - h * 1.33, x + w, base); p.closePath();
  g.save(); g.globalAlpha = clamp(a); paint(g, p, col, null, null, [x - w, base - h, 2 * w, h], OUT, 4); g.restore();
}
function shine(g, x, y, r, a = 1) { g.save(); g.globalAlpha = 0.75 * clamp(a); g.strokeStyle = '#ffffff'; g.lineWidth = 4; g.lineCap = 'round'; g.beginPath(); g.arc(x, y, r, Math.PI * 1.15, Math.PI * 1.45); g.stroke(); g.restore(); }
function divider(g, x, y0, y1) { g.save(); g.strokeStyle = 'rgba(255,230,210,.18)'; g.lineWidth = 2; g.setLineDash([8, 8]); g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke(); g.restore(); }
function arrowR(g, x0, y, x1, a = 1, col = '#fff3e6') { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y); g.lineTo(x1 - 12, y); g.stroke(); g.beginPath(); g.moveTo(x1, y); g.lineTo(x1 - 16, y - 10); g.lineTo(x1 - 16, y + 10); g.closePath(); g.fill(); g.restore(); }

/* =========================================================================================
   WIDGETS de mecanism. Fiecare primește R = dreptunghiul din panou, u = progresul ciclului (0..1, se reia), t = timpul.
   Deasupra fiecăruia: ce TREBUIE să se vadă (direcție, ordine, culori), apoi exact asta e desenat.
   ========================================================================================= */
const W = {};

// BASAL. Se vede: din pastilele bulionului (peptonă, extract de carne, NaCl) curg particule spre placă (dreapta → stânga, în placă);
// apoi apare pastila „agar” și o rețea albă peste placă (agarul doar solidifică). În dreapta: zahărul, apoi indicatorul apar și
// sunt tăiați cu ✗ (pe rând), apoi concluzia „nu există + / −”. Placa rămâne galben-pai (fără indicator nu virează nimic).
W.basal = (g, R, u) => {
  const cx = R.x + R.w * 0.16, cy = R.y + R.h * 0.42, r = Math.min(100, R.h * 0.3);
  plate(g, cx, cy, r, M.agar);
  const xi = R.x + R.w * 0.45;
  ['peptonă', 'extract de carne', 'NaCl'].forEach((s, k) => {
    const y = R.y + 48 + k * 60;
    pill(g, xi, y, 200, 44, '#f6dfa8', s, { size: 18 });
    for (let j = 0; j < 4; j++) { const p = clamp((u - 0.03 - k * 0.07 - j * 0.03) / 0.18); if (p > 0 && p < 1) dot(g, lerp(xi - 100, cx + (j - 1.5) * 22, p), lerp(y, cy + (k - 1) * 22, p), 7, '#e2b25a', { alpha: Math.sin(p * Math.PI) }); }
  });
  const pa = seg(u, 0.36, 0.5);
  pill(g, xi, R.y + 48 + 3 * 60, 200, 44, '#ffffff', 'agar', { size: 18, alpha: seg(u, 0.3, 0.38) });
  if (pa > 0) {
    g.save(); g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.clip(); g.globalAlpha = 0.55 * pa; g.strokeStyle = '#ffffff'; g.lineWidth = 2;
    for (let k = -7; k <= 7; k++) { g.beginPath(); g.moveTo(cx + k * 17 - r, cy - r); g.lineTo(cx + k * 17 + r, cy + r); g.stroke(); g.beginPath(); g.moveTo(cx + k * 17 + r, cy - r); g.lineTo(cx + k * 17 - r, cy + r); g.stroke(); }
    g.restore();
  }
  lab(g, 'agarul doar solidifică,\nnu hrănește', cx, cy + r + 46, 17, M.cream, pa);
  const xr = R.x + R.w * 0.82;
  hexM(g, xr - 62, R.y + 80, 28, '#fff1c9', seg(u, 0.5, 0.56)); lab(g, 'zahăr', xr - 62, R.y + 130, 17, M.cream, seg(u, 0.5, 0.56)); cross(g, xr - 62, R.y + 80, 26, seg(u, 0.58, 0.64));
  dropI(g, xr + 62, R.y + 84, 24, '#7aa6ff', seg(u, 0.6, 0.66)); lab(g, 'indicator', xr + 62, R.y + 130, 17, M.cream, seg(u, 0.6, 0.66)); cross(g, xr + 62, R.y + 82, 26, seg(u, 0.68, 0.74));
  lab(g, '→ nu există + / −', xr, R.y + 200, 22, M.hi, seg(u, 0.74, 0.82));
};

// GROW. Se vede (zoom pe agar): o singură celulă se divide 1 → 2 → 4 → 8 → 16 (celule necolorate, cum sunt pe placă);
// grămada se contopește într-o colonie rotundă care crește. În dreapta (dacă există): germenii tipici, colorați Gram.
W.grow = (g, R, u, t, o) => {
  const hasG = o.germs && o.germs.length;
  const cx = R.x + R.w * (hasG ? 0.22 : 0.5), cy = R.y + R.h * 0.4;
  plate(g, cx, cy, Math.min(112, R.h * 0.33), o.agar || M.agar);
  const pd = seg(u, 0.04, 0.48), pc = seg(u, 0.5, 0.78);
  const n = Math.pow(2, Math.floor(pd * 4.99));
  const cc = o.col || '#f3e8c8';
  if (pc < 1) for (let k = 0; k < n; k++) {
    const an = k * 2.4, rr = 9 * Math.sqrt(k); const x = cx + rr * Math.cos(an), y = cy + rr * Math.sin(an); const a = 1 - pc;
    if (o.cell === 'yeast') yeastC(g, x, y, 0.5, a, 0.5, cc); else if (o.cell === 'staph') dot(g, x, y, 5, cc, { alpha: a, ow: 2 }); else bacillus(g, x, y, 15, 6, an, cc, a);
  }
  if (pc > 0) { colony(g, cx, cy, lerp(18, 56, pc), cc, { alpha: pc, ow: 4 }); shine(g, cx, cy, lerp(18, 56, pc) * 0.7, pc); }
  lab(g, o.lab, cx, R.y + R.h - 38, 19, M.cream);
  if (hasG) {
    lab(g, o.gh || 'germeni nepretențioși', R.x + R.w * 0.71, R.y + 34, 19, M.hi, seg(u, 0.12, 0.22));
    o.germs.forEach(([ty, s], k) => { const x = R.x + R.w * (0.53 + k * 0.18), y = cy - 4; const a = seg(u, 0.2 + k * 0.1, 0.3 + k * 0.1); germ(g, ty, x, y, 1.3, a); lab(g, s, x, y + 58, 17, M.cream, a); });
  }
};

// PROFILE (colonia S sau R). Se vede: colonia din profil pe agar, crește. S = cupolă mică, netedă, lucioasă (reflex alb).
// R = colonie mare, plată, cu margine neregulată și creste (zbârcită), mată. Apoi săgeata „în ser fiziologic” și eprubeta:
// S → germenii se răspândesc uniform, lichidul devine uniform tulbure (suspensie omogenă);
// R → germenii se strâng în grămezi care cad spre fund, lichidul rămâne clar (aglutinare spontană).
W.profile = (g, R, u, t, o) => {
  const S = o.S, x0 = R.x + R.w * 0.2, base = R.y + R.h * 0.42;
  g.save(); g.fillStyle = M.agar; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(x0 - 165, base, 330, 44, 8); g.fill(); g.stroke(); g.restore();
  const pg = seg(u, 0.02, 0.3);
  if (S) { dome(g, x0, base, 8 + 56 * pg, 4 + 46 * pg, '#f4e6b8'); shine(g, x0 - 6, base - 30 * pg, 30 * pg, pg); }
  else {
    const w = 8 + 140 * pg, h = 2 + 20 * pg; const p = new Path2D(); p.moveTo(x0 - w, base);
    for (let k = 0; k <= 24; k++) { const f = k / 24; const x = x0 - w + 2 * w * f; const edge = Math.pow(Math.sin(Math.PI * f), 0.35); p.lineTo(x, base - h * edge * (0.75 + 0.25 * Math.sin(k * 1.9)) - (k % 3 === 0 ? 3 : 0) * pg); }
    p.lineTo(x0 + w, base); p.closePath(); g.save(); paint(g, p, '#e6dcb6', null, null, [x0 - w, base - h, 2 * w, h], OUT, 4); g.restore();
    g.save(); g.globalAlpha = 0.6 * pg; g.strokeStyle = '#9c8d63'; g.lineWidth = 2.5; for (let k = -3; k <= 3; k++) { g.beginPath(); g.moveTo(x0 + k * 30 * pg - 8, base - h * 0.35); g.lineTo(x0 + k * 30 * pg + 4, base - h * 0.85); g.lineTo(x0 + k * 30 * pg + 14, base - h * 0.4); g.stroke(); } g.restore();
  }
  lab(g, S ? 'mici · rotunde · netede\nbombate · lucioase' : 'mari · plate · uscate · margini\nneregulate · suprafață zbârcită', x0, base + 92, 17, M.cream, seg(u, 0.15, 0.3));
  const tx = R.x + R.w * 0.62, ty = R.y + 44, th = 210, tw = 78;
  arrowR(g, x0 + 175, base - 40, tx - 52, seg(u, 0.3, 0.38)); lab(g, 'în ser\nfiziologic', (x0 + 175 + tx - 52) / 2, base - 84, 16, M.cream, seg(u, 0.3, 0.38));
  const pm = seg(u, 0.42, 0.78);
  testTube(g, tx, ty, tw, th, S ? mix('#e6f2f5', '#d9cfa4', pm) : '#e6f2f5', { level: 0.72 });
  const top = ty + th * 0.3, bot = ty + th - 14;
  g.save(); const clipP = new Path2D(); clipP.rect(tx - tw / 2 + 4, top, tw - 8, bot - top); g.clip(clipP);
  for (let j = 0; j < 28; j++) {
    const sx = tx + (rnd(j) - 0.5) * (tw - 18), sy = lerp(top + 6, bot - 6, rnd(j + 40));
    let x = sx, y = sy;
    if (S) { x += Math.sin(t * 2 + j) * 3; y += Math.cos(t * 1.7 + j * 2) * 3; }
    else { const c = j % 3; const cxl = tx + (c - 1) * 18, cyl = lerp(top + 40 + c * 20, bot - 10 - (c === 1 ? 10 : 0), pm); x = lerp(sx, cxl + (rnd(j + 7) - 0.5) * 12, pm); y = lerp(sy, cyl + (rnd(j + 9) - 0.5) * 12, pm); }
    dot(g, x, y, 4, '#b9a46a', { ow: 1.5 });
  }
  g.restore();
  const xr = R.x + R.w * 0.86;
  lab(g, S ? 'suspensie\nomogenă' : 'aglutinare\nspontană', xr, R.y + 90, 21, M.hi, seg(u, 0.7, 0.8));
  lab(g, S ? 'forma normală\na patogenilor' : 'de regulă\nnepatogene', xr, R.y + 170, 17, M.cream, seg(u, 0.75, 0.85));
  if (!S) lab(g, 'excepții patogene: B. anthracis · M. tuberculosis · C. diphtheriae', R.x + R.w / 2, R.y + R.h - 22, 17, '#ff9a9a', seg(u, 0.8, 0.9));
};

// PIGMENT. Se vede: secțiune prin placă (agar galben-pai) cu o colonie deasupra; puncte de pigment apar în colonie.
// difuzibil: punctele ies din colonie ÎN agar (în jos și lateral) și mediul se colorează treptat în jurul coloniei (pata se lărgește).
// nedifuzibil: punctele rămân în colonie (se mișcă doar înăuntru), colonia capătă culoarea, agarul rămâne galben-pai.
W.pigment = (g, R, u, t, o) => {
  const cx = R.x + R.w * 0.5, top = R.y + R.h * 0.42, sw = Math.min(R.w * 0.8, 520), sh = 78;
  const p = seg(u, 0.12, 0.8);
  const slab = new Path2D(); slab.roundRect(cx - sw / 2, top, sw, sh, 10);
  g.save(); g.fillStyle = '#efe3b4'; g.fill(slab);
  if (o.diff && p > 0) { g.clip(slab); const gr = g.createRadialGradient(cx, top, 10, cx, top, 30 + p * sw * 0.55); gr.addColorStop(0, rgba(o.pig, 0.95)); gr.addColorStop(0.7, rgba(o.pig, 0.6)); gr.addColorStop(1, rgba(o.pig, 0)); g.fillStyle = gr; g.fillRect(cx - sw / 2, top, sw, sh); }
  g.restore(); g.save(); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(slab); g.restore();
  const cw = 58, ch = 40;
  dome(g, cx, top, cw, ch, o.diff ? mix('#f0e6c4', o.pig, 0.35 * p) : mix('#f0e6c4', o.pig, p));
  for (let j = 0; j < 18; j++) {
    if (o.diff) {
      const ph = (u * 1.3 + rnd(j)) % 1; const an = Math.PI * (0.08 + 0.84 * rnd(j + 3)); const d = ph * sw * 0.45 * (0.4 + 0.6 * p);
      const x = cx + Math.cos(an) * d * (rnd(j + 5) < 0.5 ? -1 : 1), y = top + 8 + Math.sin(an) * Math.min(d, sh - 16) * 0.9;
      dot(g, x, Math.min(y, top + sh - 8), 4.5, o.pig, { alpha: p * Math.sin(ph * Math.PI) ** 0.5, ow: 1.5 });
    } else {
      const x = cx + (rnd(j) - 0.5) * 80 + (REDUCED ? 0 : Math.sin(t * 3 + j) * 5), y = top - 8 - rnd(j + 9) * 26 * (1 - Math.abs(rnd(j) - 0.5) * 1.4) + (REDUCED ? 0 : Math.cos(t * 2.4 + j) * 3);
      dot(g, x, y, 4, mix(o.pig, '#7a4a00', 0.25), { alpha: p, ow: 1.2 });
    }
  }
  lab(g, o.mini || (o.diff ? 'pigment difuzibil' : 'pigment nedifuzibil'), cx, R.y + 32, 20, M.hi);
  lab(g, o.diff ? 'solubil în apă → difuzează în geloză\n→ mediul din jur se colorează' : 'nesolubil → rămâne în colonie\n→ mediul din jur NU se colorează', cx, top + sh + 50, 17, M.cream, seg(u, 0.5, 0.65));
};

// PSEUDO. Se vede: bacili Gram − (roz) cu un flagel polar ondulat, care înoată; eprubeta cu bulion: la SUPRAFAȚA lichidului
// se formează o peliculă verde care se îngroașă (lichidul de dedesubt rămâne). Ordine: germenul → bulionul → pelicula.
W.pseudo = (g, R, u, t) => {
  const cx = R.x + R.w * 0.27, cy = R.y + R.h * 0.36;
  for (let k = 0; k < 3; k++) {
    const x = cx - 90 + k * 90 + (REDUCED ? 0 : Math.sin(t * 1.5 + k) * 8), y = cy + (k - 1) * 46;
    g.save(); g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); for (let s = 0; s <= 20; s++) { const xx = x + 36 + s * 3.2, yy = y + Math.sin(s * 0.8 - t * 9) * 6; if (s) g.lineTo(xx, yy); else g.moveTo(xx, yy); } g.stroke(); g.restore();
    bacillus(g, x, y, 70, 26, 0, M.gramN);
  }
  lab(g, 'Pseudomonas aeruginosa', cx, R.y + R.h - 72, 19, M.hi);
  lab(g, 'pigment: piocianina', cx, R.y + R.h - 44, 17, M.cream);
  const tx = R.x + R.w * 0.72, ty = R.y + 44, th = 210, tw = 80;
  testTube(g, tx, ty, tw, th, '#ead9a0', { level: 0.75 });
  const lt = ty + th * 0.25, pf = seg(u, 0.25, 0.75);
  g.save(); g.fillStyle = '#3f9a5a'; g.strokeStyle = OUT; g.lineWidth = 2; g.beginPath(); g.roundRect(tx - tw / 2 + 4, lt - 2, tw - 8, 4 + 16 * pf, 3); g.globalAlpha = 0.3 + 0.7 * pf; g.fill(); g.stroke(); g.restore();
  lab(g, 'în bulion: peliculă verde', tx, R.y + R.h - 30, 19, M.cream, seg(u, 0.5, 0.6));
};

// SWARM (cățărare). Se vede: placă de sus; din 2 puncte însămânțate (stânga și dreapta) pleacă valuri concentrice succesive —
// un văl subțire care acoperă placa (nu colonii separate). Vălurile celor 2 tulpini NU se contopesc: la mijloc rămâne o linie
// clară = linia Dieneș. Lângă: bacil Proteus cu flageli peritrichi (de jur împrejur) care se mișcă.
W.swarm = (g, R, u, t) => {
  const cx = R.x + R.w * 0.25, cy = R.y + R.h * 0.46, r = Math.min(R.h * 0.4, 130);
  plate(g, cx, cy, r, '#4f8f8a');
  const p = seg(u, 0.05, 0.75);
  g.save(); g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.clip();
  [[cx - r * 0.55, -1], [cx + r * 0.55, 1]].forEach(([sx, side]) => {
    g.save(); g.beginPath(); if (side < 0) g.rect(cx - r - 5, cy - r - 5, r, 2 * r + 10); else g.rect(cx + 5, cy - r - 5, r, 2 * r + 10); g.clip();
    const mr = p * r * 1.5;
    g.fillStyle = 'rgba(236,246,242,.32)'; g.beginPath(); g.arc(sx, cy, mr, 0, TAU); g.fill();
    g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 3; for (let k = 0; k < 6; k++) { const rk = mr - k * 22; if (rk > 4) { g.beginPath(); g.arc(sx, cy, rk, 0, TAU); g.stroke(); } }
    g.restore();
    dot(g, sx, cy, 6, '#ffffff', { ow: 2 });
  });
  g.restore();
  const pl = seg(u, 0.72, 0.82);
  lab(g, 'linia Dieneș', cx, cy + r + 34, 18, M.hi, pl);
  g.save(); g.globalAlpha = pl; g.strokeStyle = M.hi; g.lineWidth = 3; g.setLineDash([6, 5]); g.beginPath(); g.moveTo(cx, cy + r + 20); g.lineTo(cx, cy + r * 0.5); g.stroke(); g.restore();
  const bx = R.x + R.w * 0.66, by = R.y + 64 + (REDUCED ? 0 : Math.sin(t * 2) * 4);
  g.save(); g.strokeStyle = OUT; g.lineWidth = 2.5; for (let k = 0; k < 10; k++) { const an = k / 10 * TAU; const x0 = bx + Math.cos(an) * 34, y0 = by + Math.sin(an) * 13; g.beginPath(); for (let s = 0; s <= 10; s++) { const d = s * 3; const xx = x0 + Math.cos(an) * d + Math.sin(s - t * 8) * 2 * -Math.sin(an), yy = y0 + Math.sin(an) * d + Math.sin(s - t * 8) * 2 * Math.cos(an); if (s) g.lineTo(xx, yy); else g.moveTo(xx, yy); } g.stroke(); } g.restore();
  bacillus(g, bx, by, 74, 26, 0, M.gramN);
  lab(g, 'Proteus: foarte mobil', bx, by + 52, 18, M.hi);
  const xs = R.x + R.w * 0.66;
  ['văl subțire, în valuri succesive', 'pe toată placa: fără colonii izolate', 'tulpini diferite nu se contopesc'].forEach((s, k) => lab(g, s, xs, R.y + 170 + k * 44, 17, M.cream, seg(u, 0.25 + k * 0.15, 0.35 + k * 0.15)));
};

// BLOOD (geloză-sânge). Se vede: din eprubeta înclinată curge un fir de sânge (roșu) în balonul cu geloză topită (galben-pai) →
// amestecul devine treptat roșu opac. Lupa: hematii intacte (discuri roșii cu centru mai deschis) care plutesc = martorul hemolizei.
// Dreapta: germenii pretențioși: streptococi (lanț) și pneumococ (diplococi lanceolați), coci violet = Gram +.
W.blood = (g, R, u, t) => {
  const fx = R.x + R.w * 0.14, fy = R.y + R.h * 0.56, pr = seg(u, 0.12, 0.45);
  const fl = new Path2D(); fl.moveTo(fx - 18, fy - 120); fl.lineTo(fx - 18, fy - 70); fl.lineTo(fx - 80, fy + 40); fl.quadraticCurveTo(fx - 84, fy + 56, fx - 66, fy + 56); fl.lineTo(fx + 66, fy + 56); fl.quadraticCurveTo(fx + 84, fy + 56, fx + 80, fy + 40); fl.lineTo(fx + 18, fy - 70); fl.lineTo(fx + 18, fy - 120);
  g.save(); g.clip(fl); g.fillStyle = mix('#efdfa6', '#b8281f', pr); g.fillRect(fx - 90, fy - 30, 180, 90); g.restore();
  g.save(); g.fillStyle = M.glass; g.fill(fl); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(fl); g.restore();
  // eprubeta cu sânge: gura (jos-stânga) deasupra gâtului balonului, corpul în sus-dreapta; firul de sânge cade din gură în balon
  g.save(); g.translate(fx + 34, fy - 116); g.rotate(-2.2); testTube(g, 0, 0, 34, 92, '#9e1b20', { level: 0.6 }); g.restore();
  const ps = u > 0.1 && u < 0.45 ? 1 : 0;
  if (ps) { g.save(); g.strokeStyle = '#9e1b20'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(fx + 24, fy - 110); g.quadraticCurveTo(fx + 6, fy - 90, fx + 2, fy - 20); g.stroke(); g.restore(); }
  lab(g, 'geloză + sânge\ndefibrinat 5–10%', fx, R.y + R.h - 40, 17, M.cream);
  const mx = R.x + R.w * 0.47, my = R.y + R.h * 0.4, mr = 96, pa = seg(u, 0.4, 0.55);
  g.save(); g.beginPath(); g.arc(mx, my, mr, 0, TAU); g.clip(); g.fillStyle = '#8f1a17'; g.fillRect(mx - mr, my - mr, 2 * mr, 2 * mr);
  for (let k = 0; k < 16; k++) { const x = mx + (rnd(k) - 0.5) * 170 + (REDUCED ? 0 : Math.sin(t * 0.6 + k) * 6), y = my + (rnd(k + 20) - 0.5) * 170 + (REDUCED ? 0 : Math.cos(t * 0.5 + k) * 6); rbc(g, x, y, 15, '#d63a2e', pa); }
  g.restore(); g.save(); g.strokeStyle = OUT; g.lineWidth = 8; g.beginPath(); g.arc(mx, my, mr, 0, TAU); g.stroke(); g.strokeStyle = '#d9e4ea'; g.lineWidth = 4; g.stroke(); g.restore();
  lab(g, 'hematii intacte =\nmartorul hemolizei', mx, R.y + R.h - 40, 17, M.cream, pa);
  const gx = R.x + R.w * 0.8, pg = seg(u, 0.6, 0.72);
  lab(g, 'germeni pretențioși', gx, R.y + 32, 19, M.hi, pg);
  germ(g, 'strep', gx, R.y + 82, 1.3, pg); lab(g, 'streptococi', gx, R.y + 116, 17, M.cream, pg);
  germ(g, 'pneumo', gx, R.y + 160, 1.4, pg); lab(g, 'pneumococ', gx, R.y + 192, 17, M.cream, pg);
  lab(g, 'roșu opac, uniform\n= nesămânțată', gx, R.y + R.h - 40, 17, M.cream, seg(u, 0.75, 0.85));
};

// HEMO (α / β / γ). Se vede: lupă pe geloza-sânge, o colonie albă în centru și hematii roșii în jur. Efectul pornește LÂNGĂ
// colonie și înaintează spre exterior. α: hematiile își păstrează forma dar devin brun-verzui, zona devine verzuie și opacă.
// β: hematiile se umflă și se sparg în fragmente care dispar; zona devine clară, transparentă (galben-pai deschis).
// γ: nimic nu se schimbă: hematiile rămân roșii, intacte, mediul rămâne roșu.
const HEMO = {
  a: { t: 'α · liză parțială', l: ['brun-verzui, opac', 'hemoglobina → pigment verde\n(methemoglobina)'], gm: [['pneumo', 'S. pneumoniae'], ['strep', 'viridans']] },
  b: { t: 'β · liză completă', l: ['clar, transparent', 'hematiile sparte complet'], gm: [['strep', 'S. pyogenes'], ['staph', 'S. aureus']] },
  g: { t: 'γ · fără hemoliză', l: ['mediul rămâne roșu', 'hematiile rămân intacte'], gm: [['entero', 'enterococi']] },
};
W.hemo = (g, R, u, t, o) => {
  const T = o.type, H = HEMO[T];
  const cx = R.x + R.w * 0.24, cy = R.y + R.h * 0.48, r = Math.min(R.h * 0.44, 140);
  g.save(); g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.clip(); g.fillStyle = '#a8231c'; g.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  const zr = r * 1.15 * seg(u, 0.12, 0.75);
  if (T !== 'g' && zr > 1) { const gr = g.createRadialGradient(cx, cy, 0, cx, cy, zr); const zc = T === 'a' ? '#6c6a32' : '#efcf9e'; gr.addColorStop(0, rgba(zc, 0.95)); gr.addColorStop(0.85, rgba(zc, 0.8)); gr.addColorStop(1, rgba(zc, 0)); g.fillStyle = gr; g.fillRect(cx - r, cy - r, 2 * r, 2 * r); }
  for (let iy = -5; iy <= 5; iy++) for (let ix = -5; ix <= 5; ix++) {
    const x = cx + ix * 28 + (iy % 2 ? 14 : 0), y = cy + iy * 25; const d = Math.hypot(x - cx, y - cy); if (d < 34 || d > r + 12) continue;
    const pi = clamp((u - 0.12 - (d / r) * 0.5) / 0.22);
    if (T === 'a') rbc(g, x, y, 11, mix('#d8382c', '#7a7a38', pi));
    else if (T === 'b') {
      if (pi < 0.5) rbc(g, x, y, 11 * (1 + pi * 0.6), '#d8382c');
      else { const q = (pi - 0.5) * 2; g.save(); g.globalAlpha = 1 - q; g.strokeStyle = '#d8382c'; g.lineWidth = 3; for (let k = 0; k < 4; k++) { const an = k * Math.PI / 2 + 0.6; g.beginPath(); g.arc(x + Math.cos(an) * 10 * (1 + q), y + Math.sin(an) * 10 * (1 + q), 5, an, an + 1.4); g.stroke(); } g.restore(); }
    } else rbc(g, x + (REDUCED ? 0 : Math.sin(t * 1.5 + ix) * 1.2), y, 11, '#d8382c');
  }
  colony(g, cx, cy, 22, '#f3ecdc');
  g.restore();
  g.save(); g.strokeStyle = OUT; g.lineWidth = 8; g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.stroke(); g.strokeStyle = '#d9e4ea'; g.lineWidth = 4; g.stroke(); g.restore();
  const xs = R.x + R.w * 0.68;
  lab(g, H.t, xs, R.y + 40, 26, M.hi);
  H.l.forEach((s, k) => lab(g, s, xs, R.y + 92 + k * 52, 18, M.cream, seg(u, 0.4 + k * 0.1, 0.5 + k * 0.1)));
  H.gm.forEach(([ty, s], k) => { const x = xs + (k - (H.gm.length - 1) / 2) * 170; const a = seg(u, 0.65, 0.75); germ(g, ty, x, R.y + R.h - 76, 1.1, a); lab(g, s, x, R.y + R.h - 34, 17, M.cream, a); });
};

// ABG (Mueller-Hinton). Se vede: placa MH de sus cu un disc de antibiotic în centru; antibioticul difuzează radial din disc
// (inele care se lărgesc); bacteriile cresc ca un covor de puncte DOAR în afara zonei de inhibiție (cerc clar în jurul discului).
// Mijloc: secțiune prin geloză cu cota 4 mm și pH 7,2–7,4. Dreapta: de ce e standard (apar pe rând).
W.abg = (g, R, u) => {
  const cx = R.x + R.w * 0.18, cy = R.y + R.h * 0.44, r = Math.min(R.h * 0.38, 120);
  plate(g, cx, cy, r, '#e9dcb0');
  const pd = seg(u, 0.05, 0.4), pl = seg(u, 0.35, 0.7), rz = r * 0.46;
  g.save(); g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.clip();
  for (let k = 1; k <= 3; k++) { const rk = pd * rz * k / 3 * 1.1; g.strokeStyle = 'rgba(120,170,255,.45)'; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, rk, 0, TAU); g.stroke(); }
  for (let j = 0; j < 170; j++) { const an = rnd(j) * TAU, d = Math.sqrt(rnd(j + 300)) * (r - 6); if (d < rz + 4) continue; dot(g, cx + Math.cos(an) * d, cy + Math.sin(an) * d, 2.8, '#b8a160', { alpha: pl, ow: 0 }); }
  g.restore();
  dot(g, cx, cy, 14, '#ffffff', { ow: 3 });
  const pz = seg(u, 0.6, 0.7);
  lab(g, 'zona de inhibiție', cx, cy + r + 30, 17, M.hi, pz);
  const sx = R.x + R.w * 0.47, sy = R.y + R.h * 0.36;
  g.save(); g.fillStyle = '#e9dcb0'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(sx - 80, sy, 160, 48, 6); g.fill(); g.stroke(); g.restore();
  g.save(); g.strokeStyle = M.hi; g.lineWidth = 3; g.beginPath(); g.moveTo(sx + 100, sy); g.lineTo(sx + 100, sy + 48); g.moveTo(sx + 92, sy); g.lineTo(sx + 108, sy); g.moveTo(sx + 92, sy + 48); g.lineTo(sx + 108, sy + 48); g.stroke(); g.restore();
  lab(g, '4 mm', sx + 140, sy + 24, 18, M.hi); lab(g, 'pH 7,2–7,4', sx, sy + 86, 18, M.cream); lab(g, 'standardizat,\nreproductibil', sx, sy - 52, 17, M.cream);
  const xs = R.x + R.w * 0.81;
  ['puțină timidină\n(altfel anulează sulfamidele)', 'cationi controlați\n(schimbă aminoglicozidele)', 'fără inhibitori:\naceeași difuzie de fiecare dată', 'cu sânge → pentru pretențioși'].forEach((s, k) => lab(g, s, xs, R.y + 44 + k * 76, 15.5, M.cream, seg(u, 0.4 + k * 0.1, 0.5 + k * 0.1)));
};

// SEL (inhibitor). Se vede: pastila inhibitorului (stânga) trimite particule spre dreapta, spre germeni; fiecare germen
// SENSIBIL e atins, se stinge și primește ✗; cei REZISTENȚI rămân, primesc ✓ și se înmulțesc (apare o a doua copie).
// Fără inhibitor: nicio particulă, toți germenii cresc.
W.sel = (g, R, u, t, o) => {
  const xi = R.x + R.w * 0.17, cy = R.y + R.h * 0.4;
  const gs = o.germs, n = gs.length;
  const xs = (k) => R.x + R.w * (0.44 + (n === 1 ? 0.25 : (k / (n - 1)) * 0.46));
  const pw = Math.min(R.w * 0.3, 230);
  if (o.inh) {
    const nl = o.inh.split('\n').length;
    pill(g, xi, cy, pw, 30 + 20 * nl, '#bfe3ff', o.inh, { size: 15 });
    if (u < 0.7) for (let j = 0; j < 14; j++) { const p = (u * 1.6 + j / 14) % 1; const x = lerp(xi + pw / 2, xs(n - 1) + 30, p), y = cy + Math.sin(j * 2.3) * 40; dot(g, x, y, 4.5, '#9fd4ff', { alpha: Math.sin(p * Math.PI) * (1 - seg(u, 0.55, 0.7)), ow: 1.5 }); }
  } else pill(g, xi, cy, pw, 54, '#e8e1d6', 'fără inhibitor', { size: 17 });
  gs.forEach((G, k) => {
    const x = xs(k), th = 0.22 + k * 0.08;
    if (G.dies && o.inh) { const a = 1 - 0.72 * seg(u, th, th + 0.15); germ(g, G.type, x, cy, 1.1, a); cross(g, x, cy, 22, seg(u, th + 0.05, th + 0.15)); }
    else { const gr = seg(u, 0.5, 0.75); germ(g, G.type, x - 10 * gr, cy - 6 * gr, 1.1); if (gr > 0.02) germ(g, G.type, x + 14 * gr, cy + 10 * gr, 1.1, gr); tick(g, x + 32, cy - 34, 12, seg(u, 0.55, 0.65)); }
    lab(g, G.lab, x, cy + 68, 16, M.cream);
  });
  if (o.foot) lab(g, o.foot, R.x + R.w / 2, R.y + R.h - 24, 17, M.hi, seg(u, 0.7, 0.8));
};

// SCALE (indicator de pH). Se vede: bara de culori a indicatorului, acid în STÂNGA → alcalin în DREAPTA; cursorul pleacă din
// capătul acid, merge până la capătul alcalin, apoi revine și se oprește la culoarea mediului nesămânțat; placa mică din
// dreapta are mereu exact culoarea de sub cursor.
W.scale = (g, R, u, t, o) => {
  const x0 = R.x + R.w * 0.08, x1 = R.x + R.w * 0.62, y = R.y + R.h * 0.42, hh = 38, ma = o.midAt ?? 0.5;
  const colAt = (m) => (m < ma ? mix(o.acid, o.mid, m / ma) : mix(o.mid, o.alk, (m - ma) / (1 - ma)));
  const gr = g.createLinearGradient(x0, 0, x1, 0); gr.addColorStop(0, o.acid); gr.addColorStop(ma, o.mid); gr.addColorStop(1, o.alk);
  g.save(); g.fillStyle = gr; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(x0, y - hh / 2, x1 - x0, hh, 12); g.fill(); g.stroke(); g.restore();
  lab(g, o.ind, (x0 + x1) / 2, y - 66, 18, M.hi);
  lab(g, o.acidLab, x0 + 40, y + 50, 15, M.cream); lab(g, o.alkLab, x1 - 40, y + 50, 15, M.cream);
  const m = u < 0.3 ? seg(u, 0, 0.3) : u < 0.55 ? 1 - seg(u, 0.3, 0.55) * (1 - o.pos) : o.pos;
  const mx = lerp(x0 + 8, x1 - 8, m);
  g.save(); g.fillStyle = '#ffffff'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.moveTo(mx, y - hh / 2 - 4); g.lineTo(mx - 11, y - hh / 2 - 22); g.lineTo(mx + 11, y - hh / 2 - 22); g.closePath(); g.fill(); g.stroke(); g.restore();
  const px = R.x + R.w * 0.83, pr = Math.min(R.h * 0.26, R.w * 0.11);
  plate(g, px, y, pr, colAt(m));
  lab(g, o.note, px, y + pr + 52, 16, M.cream, seg(u, 0.55, 0.65));
};

// REACT (reacția biochimică). Se vede, de la stânga la dreapta: substratele (hexagoane) → germenul → produsul → mediul.
// Substrat FOLOSIT: hexagonul merge în germen și dispare. Substrat NEFOLOSIT: se apropie, primește ✗ și se întoarce.
// Dacă germenul folosește ceva și există produs: particulele produsului curg spre mediu, iar mediul își schimbă culoarea
// din „from” în „to” (local = doar colonia + un halou mic; altfel culoarea pornește din colonii și cuprinde toată placa / tubul).
// black = H₂S: centrul coloniei / fundul tubului se înnegrește. Dacă nimic nu e folosit: nicio schimbare de culoare.
W.react = (g, R, u, t, o) => {
  const cy = R.y + R.h * 0.42;
  const xi = R.x + R.w * 0.09, xc = R.x + R.w * 0.31, xp = R.x + R.w * 0.53, xv = R.x + R.w * 0.8;
  const ins = o.ins || []; const anyOk = ins.some((i) => i.ok);
  cell(g, o.cell || 'bac', xc, cy, t);
  if (o.enz) pill(g, xc, cy - 64, Math.min(170, R.w * 0.28), 32, '#c9b3ff', o.enz, { size: 15 });
  lab(g, o.cellLab, xc, cy + 58, 16, M.hi);
  const n = ins.length;
  ins.forEach((it, k) => {
    const y0 = cy + (k - (n - 1) / 2) * 66;
    lab(g, it.lab, xi, y0 + 34, 14, M.cream);
    if (it.ok) { const p = seg(u, 0.05 + k * 0.05, 0.3 + k * 0.05); hexM(g, lerp(xi, xc - 20, p), lerp(y0, cy, p), 19 * (1 - 0.6 * p), '#fff1c9', 1 - seg(u, 0.28 + k * 0.05, 0.36 + k * 0.05)); }
    else { const p1 = seg(u, 0.05, 0.24), p2 = seg(u, 0.3, 0.45); const x = lerp(xi, xc - 66, p1 * (1 - p2)); hexM(g, x, lerp(y0, cy, p1 * (1 - p2) * 0.6), 19, '#fff1c9'); cross(g, xc - 52, lerp(y0, cy, 0.6), 14, seg(u, 0.22, 0.28) * (1 - seg(u, 0.75, 0.9))); }
  });
  const flowOn = (anyOk && o.prod) || o.black;
  const pv = anyOk && o.prod ? seg(u, 0.45, 0.82) : 0;
  const pb = o.black ? seg(u, 0.45, 0.82) : 0;
  if (flowOn) {
    const pa = seg(u, 0.3, 0.4);
    if (u > 0.3 && u < 0.85) for (let j = 0; j < 8; j++) { const q = ((u - 0.3) * 2.2 + j / 8) % 1; dot(g, lerp(xc + 50, xv - 70, q), cy + Math.sin(j * 1.7 + q * 6) * 12, 5, o.prodCol || '#ffffff', { alpha: Math.sin(q * Math.PI), ow: 1.5 }); }
    pill(g, xp, cy - 46, Math.min(150, R.w * 0.2), 34, o.prodCol || '#ffffff', o.prod || 'H₂S', { size: 16, alpha: pa, col: o.prodTxt || OUT });
  }
  const p = anyOk && o.prod ? pv : 0;
  if (o.vis === 'tube' || o.vis === 'slant') {
    const sl = o.vis === 'slant';
    const butt = mix(o.from, o.to, p), top = mix(o.from, o.toTop || o.to, p);
    testTube(g, xv, R.y + 40, 64, 206, butt, { level: 0.8, slant: sl ? 1 : 0, top: sl ? top : undefined, black: pb > 0.03, blackH: 0.42 * pb });
  } else {
    const r = Math.min(R.h * 0.3, R.w * 0.13), C = [[-0.38, -0.22], [0.32, -0.3], [0.04, 0.36]];
    plate(g, xv, cy, r, o.from);
    if (!o.local && p > 0) { g.save(); g.beginPath(); g.arc(xv, cy, r, 0, TAU); g.clip(); g.fillStyle = o.to; C.forEach(([dx, dy]) => { g.beginPath(); g.arc(xv + dx * r, cy + dy * r, p * r * 1.7, 0, TAU); g.fill(); }); g.restore(); }
    C.forEach(([dx, dy]) => {
      const x = xv + dx * r, y = cy + dy * r, cr = r * 0.15;
      if (o.local && p > 0 && o.to !== o.from) { g.save(); g.globalAlpha = 0.5 * p; g.fillStyle = o.to; g.beginPath(); g.arc(x, y, cr * 1.7, 0, TAU); g.fill(); g.restore(); }
      const cc = o.local ? mix(o.colCol, o.to, p) : mix(o.colCol, o.colTo || o.colCol, p);
      colony(g, x, y, cr, cc);
      if (o.black) dot(g, x, y, cr * 0.55 * pb, M.black, { ow: 0 });
    });
  }
  lab(g, o.ind, xv, R.y + R.h - 58, 15, M.cream);
  lab(g, o.res, R.x + R.w * 0.5, R.y + R.h - 22, 19, o.resCol || M.hi, flowOn ? seg(u, 0.7, 0.82) : seg(u, 0.45, 0.6));
};

// TUBES. Se vede: eprubete care pornesc din culoarea inițială și ajung la culoarea finală, separat pe pantă și pe coloană
// (ex. K/A: coloana devine galbenă, panta RĂMÂNE roșie).
W.tubes = (g, R, u, t, o) => {
  const L = o.list, n = L.length;
  lab(g, o.title, R.x + R.w / 2, R.y + 26, 18, M.hi);
  L.forEach((T, k) => {
    const x = R.x + R.w * ((k + 1) / (n + 1)), p = seg(u, 0.2, 0.7);
    testTube(g, x, R.y + 64, 66, 200, mix(T.from, T.butt, p), { level: 0.8, slant: T.slant ? 1 : 0, top: T.slant ? mix(T.from, T.top, p) : undefined });
    lab(g, T.lab, x, R.y + R.h - 40, 16, M.cream);
    if (T.l2) lab(g, T.l2, x, R.y + R.h - 16, 15, M.cream, seg(u, 0.6, 0.7));
  });
};

// PRECIP (H₂S negru). Se vede: germenul (stânga) eliberează bule gri de H₂S care merg spre dreapta; din mediu urcă ioni de fier
// (puncte ruginii) de jos în sus; unde se întâlnesc apare un precipitat negru care se adună; tubul din dreapta se înnegrește
// de JOS în sus. Ordine: H₂S → întâlnirea cu fierul → negru.
W.precip = (g, R, u, t, o) => {
  const xc = R.x + R.w * 0.14, cy = R.y + R.h * 0.38, xm = R.x + R.w * 0.46;
  cell(g, 'bac', xc, cy, t); lab(g, o.cellLab, xc, cy + 52, 16, M.hi);
  if (u < 0.8) for (let j = 0; j < 8; j++) { const q = (u * 1.5 + j / 8) % 1; dot(g, lerp(xc + 50, xm - 10, q), cy + Math.sin(j * 2 + q * 6) * 14, 6, '#c9c9c9', { alpha: Math.sin(q * Math.PI), ow: 1.5 }); }
  lab(g, 'H₂S', (xc + xm) / 2, cy - 40, 18, '#e6e6e6');
  if (u < 0.8) for (let j = 0; j < 6; j++) { const q = (u * 1.4 + j / 6) % 1; dot(g, xm + Math.sin(j * 3) * 16, lerp(R.y + R.h - 70, cy + 14, q), 5.5, '#b5652a', { alpha: Math.sin(q * Math.PI), ow: 1.5 }); }
  lab(g, 'fier din mediu', xm + 8, R.y + R.h - 54, 16, '#f0b080');
  const pp = seg(u, 0.25, 0.75); for (let j = 0; j < 22; j++) { if (j / 22 > pp) break; dot(g, xm + (rnd(j) - 0.5) * 40, cy + 18 + rnd(j + 5) * 18, 5, M.black, { ow: 1 }); }
  const tx = R.x + R.w * 0.78, pb = seg(u, 0.45, 0.85);
  arrowR(g, xm + 40, cy, tx - 50, seg(u, 0.4, 0.5));
  testTube(g, tx, R.y + 40, 64, 206, o.tubeCol || '#e8dcb8', { level: 0.82, black: pb > 0.02, blackH: 0.45 * pb });
  lab(g, o.lab || 'H₂S + fier → sulfură de fier (neagră)', R.x + R.w * 0.5, R.y + R.h - 22, 18, M.hi, seg(u, 0.6, 0.75));
};

// CAPSULE. Se vede: bacil Gram − cu o capsulă groasă, translucidă, care pulsează; în dreapta, colonia M din profil: mare,
// bombată, lucioasă (reflex), roz (lactozo +), din care se prelinge o picătură în jos (curgătoare).
W.capsule = (g, R, u, t) => {
  const bx = R.x + R.w * 0.2, by = R.y + R.h * 0.38, pc = seg(u, 0.05, 0.35);
  g.save(); g.globalAlpha = 0.45 * pc; g.fillStyle = '#eef6ff'; g.strokeStyle = '#ffffff'; g.lineWidth = 3; g.setLineDash([7, 6]); g.beginPath(); g.roundRect(bx - 66 - 8 * pc, by - 34 - 8 * pc, 132 + 16 * pc, 68 + 16 * pc, 40); g.fill(); g.stroke(); g.restore();
  bacillus(g, bx, by, 96, 36, 0, M.gramN);
  lab(g, 'capsulă de polizaharid', bx, by + 82, 18, M.hi, pc);
  lab(g, 'Klebsiella', bx, by + 112, 17, M.cream);
  const cx = R.x + R.w * 0.66, base = R.y + R.h * 0.56, pg = seg(u, 0.25, 0.6);
  g.save(); g.fillStyle = '#c4605a'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(cx - 190, base, 380, 40, 8); g.fill(); g.stroke(); g.restore();
  const w = 40 + 90 * pg, h = 30 + 58 * pg;
  dome(g, cx, base, w, h, '#d4507e'); shine(g, cx - 10, base - h * 0.55, h * 0.6, pg);
  const pdr = seg(u, 0.6, 0.95);
  if (pdr > 0) { const dx = cx + w * 0.92, dy = base + 6 + pdr * 30; g.save(); g.fillStyle = '#d4507e'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.moveTo(dx - 8, base - 4); g.quadraticCurveTo(dx - 9, dy - 6, dx, dy + 8); g.quadraticCurveTo(dx + 9, dy - 6, dx + 8, base - 4); g.closePath(); g.fill(); g.stroke(); g.restore(); }
  lab(g, 'colonie M: mare, lucioasă,\nbombată, curgătoare', cx, R.y + R.h - 50, 18, M.cream, seg(u, 0.45, 0.6));
};

// TYPES. Se vede: trei colonii din profil, pe rând evidențiate: untoasă (cupolă mată, crem), pufoasă (cupolă cu filamente
// fine care se mișcă), mucoasă (cupolă mare, lucioasă, cu picătură care se prelinge).
W.types = (g, R, u, t) => {
  const T = [['untoase = levuri', 0], ['pufoase = mucegaiuri', 1], ['mucoase (M) = capsulă', 2]];
  const act = Math.floor(clamp(u * 3, 0, 2.999));
  T.forEach(([s, k]) => {
    const x = R.x + R.w * (k + 0.5) / 3, base = R.y + R.h * 0.5, on = k === act;
    g.save(); g.globalAlpha = on ? 1 : 0.55;
    g.fillStyle = M.agar; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.roundRect(x - 70, base, 140, 24, 6); g.fill(); g.stroke();
    if (k === 0) dome(g, x, base, 44, 32, '#efe2c2');
    if (k === 1) { dome(g, x, base, 40, 28, '#e9e9e4'); g.strokeStyle = '#f7f7f2'; g.lineWidth = 2; for (let j = 0; j < 16; j++) { const an = Math.PI * (1.05 + 0.9 * j / 15); const x0 = x + Math.cos(an) * 40, y0 = base - 4 + Math.sin(an) * 36; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + Math.cos(an) * 16 + (REDUCED ? 0 : Math.sin(t * 3 + j) * 3), y0 + Math.sin(an) * 16); g.stroke(); } }
    if (k === 2) { dome(g, x, base, 50, 40, '#e7d9c9'); shine(g, x - 6, base - 22, 22); g.fillStyle = '#e7d9c9'; g.strokeStyle = OUT; g.lineWidth = 3; const dy = 8 + 14 * (on ? (REDUCED ? 1 : (t % 1.5) / 1.5) : 0.5); g.beginPath(); g.moveTo(x + 42, base - 4); g.quadraticCurveTo(x + 40, base + dy, x + 48, base + dy + 6); g.quadraticCurveTo(x + 56, base + dy, x + 52, base - 4); g.closePath(); g.fill(); g.stroke(); }
    g.restore();
    lab(g, s, x, base + 62, 16, on ? M.hi : M.cream);
  });
};

// FOREIGN. Se vede: placă de sus cu multe colonii crem (levurile) și 2 puncte roșii mici care clipesc = alte colonii.
W.foreign = (g, R, u, t) => {
  const cx = R.x + R.w * 0.5, cy = R.y + R.h * 0.4, r = Math.min(R.h * 0.33, 110);
  plate(g, cx, cy, r, '#e9dfb8');
  for (let j = 0; j < 22; j++) { const an = rnd(j) * TAU, d = Math.sqrt(rnd(j + 50)) * (r - 16); colony(g, cx + Math.cos(an) * d, cy + Math.sin(an) * d, 7 + rnd(j + 9) * 5, '#f1e4bf'); }
  const bl = 0.5 + 0.5 * Math.sin(t * 5);
  [[0.35, -0.45], [-0.4, 0.5]].forEach(([dx, dy]) => { const x = cx + dx * r, y = cy + dy * r; colony(g, x, y, 6, '#c8452e'); g.save(); g.globalAlpha = bl; g.strokeStyle = M.hi; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 16, 0, TAU); g.stroke(); g.restore(); });
  lab(g, 'punctele roșii = alte colonii,\nnu fac parte din cultura de levuri', cx, R.y + R.h - 46, 16, M.cream);
};

// MALDI. Se vede: placa cu colonii mici albastru-verzui; ansa ia o colonie și o duce spre dreapta în aparat; pe ecran cresc
// vârfurile unui spectru (spectrometrie de masă) → confirmarea identificării.
W.maldi = (g, R, u, t) => {
  const cx = R.x + R.w * 0.2, cy = R.y + R.h * 0.4, r = Math.min(R.h * 0.3, 96);
  plate(g, cx, cy, r, '#ece2bb');
  for (let j = 0; j < 26; j++) { const x = cx - r * 0.7 + (j % 9) * r * 0.17, y = cy - r * 0.45 + Math.floor(j / 9) * r * 0.42 + (j % 2) * 6; dot(g, x, y, 4, '#2f8f8a', { ow: 1.2 }); }
  lab(g, 'colonii mici albastru-verzui\n= de regulă enterococ', cx, R.y + R.h - 46, 15, M.cream);
  const bx = R.x + R.w * 0.68, by = R.y + 40, bw = Math.min(250, R.w * 0.42), bh = 170;
  g.save(); g.fillStyle = '#1b2a2a'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(bx - bw / 2, by, bw, bh, 12); g.fill(); g.stroke();
  g.strokeStyle = '#9fb7b0'; g.lineWidth = 2; g.beginPath(); g.moveTo(bx - bw / 2 + 16, by + bh - 20); g.lineTo(bx + bw / 2 - 12, by + bh - 20); g.moveTo(bx - bw / 2 + 16, by + 14); g.lineTo(bx - bw / 2 + 16, by + bh - 20); g.stroke();
  const pk = seg(u, 0.5, 0.85); g.strokeStyle = '#7fe3cf'; g.lineWidth = 3; for (let k = 0; k < 12; k++) { const x = bx - bw / 2 + 30 + k * (bw - 46) / 11; const h = (20 + rnd(k + 3) * 110) * pk; g.beginPath(); g.moveTo(x, by + bh - 20); g.lineTo(x, by + bh - 20 - h); g.stroke(); }
  g.restore();
  const pm = seg(u, 0.1, 0.45); const lx = lerp(cx + 10, bx - bw / 2 - 10, pm), ly = lerp(cy - 4, by + bh / 2, pm);
  g.save(); g.translate(lx, ly); g.scale(0.55, 0.55); loop(g, 0, 0, -0.5, 0, u < 0.5 ? 1 : 1 - seg(u, 0.45, 0.5)); g.restore();
  if (u > 0.1 && u < 0.5) dot(g, lx + 8, ly, 4, '#2f8f8a', { ow: 1 });
  lab(g, 'MALDI-TOF → confirmarea\n(scris pe placă)', bx, R.y + R.h - 46, 15, M.cream);
};

function drawMech(g, mech, R, u, t) {
  const list = Array.isArray(mech) ? mech : [mech];
  const w = R.w / list.length;
  list.forEach((m, k) => { const r = { x: R.x + k * w, y: R.y, w, h: R.h }; if (k) divider(g, r.x, R.y + 16, R.y + R.h - 16); const f = W[m.k]; if (f) f(g, r, u, t, m); });
}

/* =================================================== sincronizarea textului din stânga (doar pe e_media) */
const QHTML = '<ol class="eQl">' + [
  ['Ce mediu e și de ce tip?', 'de bază · complex · special · diferențial · selectiv-diferențial'],
  ['Ce conține care contează?', 'zahăr, indicator, inhibitor'],
  ['Ce crește, ce germen?', ''],
  ['+ sau − și de ce s-a schimbat culoarea?', ''],
].map(([h, d], k) => `<li class="pt"><span class="n">${k + 1}</span><div><h3>${h}</h3>${d ? `<p>${d}</p>` : ''}</div></li>`).join('') + '</ol><div class="box why"><span class="h">Cum lucrezi</span>Spui cu voce tare în ordinea asta, apoi apeși →: pe aceeași poză apar încercuirile și răspunsul, punct cu punct.</div>';
let styled = false;
function ensureStyle() {
  if (styled || typeof document === 'undefined') return; styled = true;
  const s = document.createElement('style');
  s.textContent = '#body>.eQ{display:none}#body>.eQ.on{display:flex;flex-direction:column;gap:10px}#body:has(>.eQ.on)>:not(.eQ){display:none!important}#txt:has(.eQ.on) #foot{visibility:hidden}'
    + '.eQl{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}.eQ .pt h3{font-size:15.5px}'
    + '#body:has(>.eQ) #pts .pt.on~.pt{opacity:0;pointer-events:none}#body:has(>.eQ.mid)>.box{opacity:0}#body>.box,#pts .pt{transition:opacity .35s}';
  document.head.appendChild(s);
}
function syncDom(spec, b, n) {
  if (typeof document === 'undefined') return;
  ensureStyle();
  const body = document.getElementById('body'); if (!body) return;
  let q = body.querySelector(':scope > .eQ');
  if (!q) { q = document.createElement('div'); q.className = 'eQ'; q.innerHTML = QHTML; body.prepend(q); }
  q.classList.toggle('on', b.i < 0); q.classList.toggle('mid', b.i >= 0 && b.i < n - 1);
  const tt = document.getElementById('title'); const want = b.i < 0 ? 'Ce mediu e și ce vezi pe el?' : spec.title;
  if (tt && tt.textContent !== want) tt.textContent = want;
}

/* =================================================== SCENA: poza reală + elipse + mecanism */
// Ce se vede: intro = poza goală (o lupă se plimbă peste ea, fără niciun marcaj) + întrebarea în panou.
// Punctul k: elipsele punctului k se desenează progresiv (contur care se închide), cele de la punctele anterioare rămân estompate;
// panoul de jos rulează în buclă mecanismul punctului k.
export function e_media({ spec }) {
  const o = spec.sceneOpts; const n = (spec.points || []).length;
  const r = Math.min(PH.w / o.W, PH.h / o.H); const T = { r, w: o.W * r, h: o.H * r }; T.ox = PH.x + (PH.w - T.w) / 2; T.oy = PH.y + (PH.h - T.h) / 2;
  const S = { i: -1 };
  const marks = o.marks.map((m) => ({ ...m, X: T.ox + m.x * r, Y: T.oy + m.y * r, RX: m.rx * r, RY: (m.ry ?? m.rx) * r }));
  const anchors = Array.from({ length: n }, (_, k) => {
    const m = marks.find((mm) => mm.pt === k); if (!m) return null;
    const ax = clamp(m.X + (m.bx || 0) * r, T.ox + 22, T.ox + T.w - 22), ay = clamp(m.Y - m.RY - 4 + (m.by || 0) * r, T.oy + 20, T.oy + T.h - 20);
    return () => (S.i < 0 ? [-999, -999] : [ax, ay]);
  });
  const labels = marks.filter((m) => m.lab).map((m) => ({ at: [clamp(m.X + (m.lx || 0) * r, T.ox + 70, T.ox + T.w - 70), clamp(m.Y + m.RY + 20 + (m.ly || 0) * r, T.oy + 16, T.oy + T.h - 16)], html: m.lab, beats: [m.pt] }));
  return {
    home: HOME, anchors, labels,
    draw(g, t, b) {
      S.i = b.i; syncDom(spec, b, n);
      g.fillStyle = '#120b18'; g.fillRect(-3000, -3000, 7000, 7000);
      const im = pic(o.img);
      g.save(); g.beginPath(); g.roundRect(T.ox, T.oy, T.w, T.h, 18); g.clip();
      if (im.complete && im.naturalWidth) g.drawImage(im, T.ox, T.oy, T.w, T.h);
      if (b.i < 0 && im.complete && im.naturalWidth) {
        const lx = T.ox + T.w * (0.5 + 0.27 * Math.sin(t * 0.55)), ly = T.oy + T.h * (0.5 + 0.24 * Math.sin(t * 0.41 + 1)), lr = 70;
        g.save(); g.beginPath(); g.arc(lx, ly, lr, 0, TAU); g.clip(); g.translate(lx, ly); g.scale(1.7, 1.7); g.translate(-lx, -ly); g.drawImage(im, T.ox, T.oy, T.w, T.h); g.restore();
        g.save(); g.strokeStyle = OUT; g.lineWidth = 10; g.beginPath(); g.arc(lx, ly, lr, 0, TAU); g.stroke(); g.strokeStyle = '#d9e4ea'; g.lineWidth = 5; g.stroke();
        g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 18; g.beginPath(); g.moveTo(lx + lr * 0.72, ly + lr * 0.72); g.lineTo(lx + lr * 1.35, ly + lr * 1.35); g.stroke(); g.strokeStyle = '#7b5a3a'; g.lineWidth = 11; g.stroke(); g.restore();
      }
      if (b.i >= 0) marks.forEach((m) => {
        if (m.pt > b.i) return; const on = m.pt === b.i; const c = KEYC[m.pt % KEYC.length];
        const pr = on ? seg(b.bt, 0.05, 0.9) : 1;
        g.save();
        if (on) { g.globalAlpha = 0.14 + 0.06 * Math.sin(t * 3); g.fillStyle = c; g.beginPath(); g.ellipse(m.X, m.Y, m.RX, m.RY, m.rot || 0, 0, TAU); g.fill(); g.globalAlpha = 1; }
        else g.globalAlpha = 0.55;
        if (m.dash) g.setLineDash([18, 12]);
        g.lineCap = 'round';
        g.strokeStyle = OUT; g.lineWidth = on ? 10 : 7; g.beginPath(); g.ellipse(m.X, m.Y, m.RX, m.RY, m.rot || 0, -Math.PI / 2, -Math.PI / 2 + TAU * pr); g.stroke();
        g.strokeStyle = c; g.lineWidth = on ? 6 : 4; if (on) { g.shadowColor = c; g.shadowBlur = 16; } g.beginPath(); g.ellipse(m.X, m.Y, m.RX, m.RY, m.rot || 0, -Math.PI / 2, -Math.PI / 2 + TAU * pr); g.stroke();
        g.restore();
      });
      g.restore();
      g.save(); g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(T.ox, T.oy, T.w, T.h, 18); g.stroke(); g.restore();
      panel(g, PN.x, PN.y, PN.w, PN.h, { fill: 'rgba(255,240,228,.05)' });
      if (b.i < 0) {
        const pulse = REDUCED ? 1 : 1 + 0.04 * Math.sin(t * 3);
        g.save(); g.translate(PN.x + 90, PN.y + PN.h / 2); g.scale(pulse, pulse); dot(g, 0, 0, 46, M.hi, { ow: 5 }); g.restore();
        lab(g, '?', PN.x + 90, PN.y + PN.h / 2 + 2, 54, OUT);
        txt(g, 'Ce mediu e și ce vezi pe el?', PN.x + 170, PN.y + PN.h / 2 - 40, 36, M.cream, { align: 'left' });
        txt(g, 'spune cu voce tare: mediul și tipul · ce conține ·\nce crește · + sau − și de ce, apoi apasă →', PN.x + 170, PN.y + PN.h / 2 + 40, 21, M.dim, { align: 'left', w: 600 });
      } else {
        const mech = o.mech && o.mech[b.i]; if (mech) drawMech(g, mech, PN, cyc(b.bt, o.L || 6.5), t);
      }
    },
  };
}

/* =================================================== SIM și ABE de pe tablă */
// Ce se vede (exact ca desenul de pe tablă, de la stânga la dreapta): SIM nesămânțat (bej, înțepătura curată) · SIM H₂S + (se
// înnegrește de JOS în sus, partea de sus rămâne bej) · SIM indol + (picăturile de Kovacs cad deasupra și formează un INEL ROȘU
// la suprafață; în jurul înțepăturii apare tulbureală = mobil) · ABE − (pantă bej) · ABE + (panta se înnegrește de sus în jos).
// Punctul 1 → negrul în SIM; punctul 2 → inelul roșu + tulbureala; punctul 3 → negrul în ABE. Intro: toate rulează pe rând.
export function e_simabe({ spec }) {
  const X = [130, 280, 430, 680, 840], TY = 96, TH = 360, TW = 92;
  return {
    home: HOME,
    anchors: [[X[1] + TW / 2 + 20, TY + 40], [X[2] + TW / 2 + 20, TY + 40], [X[4] + TW / 2 + 20, TY + 40]],
    draw(g, t, b) {
      g.fillStyle = '#120b18'; g.fillRect(-3000, -3000, 7000, 7000);
      const pp = P(b, t, 3);
      const p0 = pp(0), p1 = pp(1), p2 = pp(2);
      const beige = '#e8dcb8';
      testTube(g, X[0], TY, TW, TH, beige, { level: 0.82 });
      testTube(g, X[1], TY, TW, TH, beige, { level: 0.82, black: p0 > 0.02, blackH: 0.5 * p0 });
      testTube(g, X[2], TY, TW, TH, beige, { level: 0.82 });
      const top = TY + TH * 0.18;
      [0, 1, 2].forEach((k) => { g.save(); g.strokeStyle = 'rgba(90,70,40,.7)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(X[k], top + 4); g.lineTo(X[k], TY + TH * 0.85); g.stroke(); g.restore(); });
      if (p1 > 0) {
        g.save(); g.globalAlpha = 0.55 * seg(p1, 0.3, 1); const gr = g.createLinearGradient(X[2] - TW / 2, 0, X[2] + TW / 2, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, 'rgba(255,255,255,.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(X[2] - TW / 2 + 5, top + 14, TW - 10, TH * 0.6); g.restore();
        const ring = seg(p1, 0.35, 0.8);
        g.save(); g.fillStyle = '#e0283c'; g.globalAlpha = ring; g.fillRect(X[2] - TW / 2 + 4, top - 2, TW - 8, 18); g.restore();
        for (let j = 0; j < 3; j++) { const q = clamp(p1 * 2.2 - j * 0.3); if (q > 0 && q < 1) dropI(g, X[2] + (j - 1) * 14, lerp(TY - 60, top - 6, q), 8, '#f1d36a', 1 - q * 0.3); }
      }
      testTube(g, X[3], TY, TW, TH, beige, { level: 0.82, slant: 1 });
      testTube(g, X[4], TY, TW, TH, beige, { level: 0.82, slant: 1, top: mix(beige, M.black, p2) });
      if (p2 > 0) { g.save(); const cl = new Path2D(); cl.rect(X[4] - TW / 2 + 4, top - 60, TW - 8, TH); g.clip(cl); g.fillStyle = M.black; g.globalAlpha = 0.95; g.beginPath(); g.moveTo(X[4] - TW / 2, top - TH * 0.25); g.lineTo(X[4] + TW / 2, top + TH * 0.12); g.lineTo(X[4] + TW / 2, top + TH * 0.12 + TH * 0.62 * p2); g.lineTo(X[4] - TW / 2, top - TH * 0.25 + TH * 0.75 * p2); g.closePath(); g.fill(); g.restore(); }
      [['nesăm.', 0], ['H₂S +', 1], ['indol +', 2], ['ABE −', 3], ['ABE +', 4]].forEach(([s, k]) => lab(g, s, X[k], TY + TH + 34, 21, M.cream));
      lab(g, 'SIM', X[1], TY + TH + 84, 30, M.hi); lab(g, 'ABE', (X[3] + X[4]) / 2, TY + TH + 84, 30, M.hi);
      if (p1 > 0.6) lab(g, '← inel roșu', X[2] + 112, top + 8, 18, '#ff8a9a', seg(p1, 0.6, 0.9));
      if (p1 > 0.5) lab(g, '← tulbure =\n   mobil', X[2] + 110, TY + TH * 0.5, 17, M.cream, seg(p1, 0.5, 0.8));
      const R = { x: 16, y: 600, w: 968, h: 322 };
      panel(g, R.x, R.y, R.w, R.h, { fill: 'rgba(255,240,228,.05)' });
      const u = cyc(b.bt, 6.5);
      if (b.i === 0) W.precip(g, R, u, t, { cellLab: 'germenul', lab: 'H₂S + fierul din mediu → sulfură de fier (neagră)' });
      else if (b.i === 1) kovacs(g, R, u, t);
      else if (b.i === 2) drawMech(g, [{ k: 'sel', inh: 'bilă', germs: [{ type: 'strep', lab: 'majoritatea\nstreptococilor', dies: 1 }, { type: 'entero', lab: 'Enterococcus' }] }, { k: 'react', ins: [{ lab: 'esculină', ok: 1 }], cell: 'entero', cellLab: 'Enterococcus', prod: '+ fier', prodCol: '#b5652a', vis: 'slant', from: beige, to: beige, toTop: M.black, ind: 'esculina hidrolizată + fier', res: 'negru = ABE +', resCol: M.hi }], R, u, t);
      else { lab(g, 'Pe tablă: ABE → esculină + bilă → negru;  SIM → negru și banda de hârtie de la dop (indolul)', R.x + R.w / 2, R.y + R.h / 2, 19, M.cream); }
    },
  };
}
// KOVACS. Se vede: două eprubete cu cultură; în ambele cad picături de reactiv Kovacs (galbene) DEASUPRA; în cea cu indol stratul
// de sus devine roșu (inel roșu = indol +), în cealaltă rămâne galben (= indol −).
function kovacs(g, R, u, t) {
  [[0.3, true], [0.62, false]].forEach(([fx, pos]) => {
    const x = R.x + R.w * fx, ty = R.y + 56, th = 200, top = ty + th * 0.2;
    testTube(g, x, ty, 70, th, '#e8dcb8', { level: 0.8 });
    const q = seg(u, 0.1, 0.4), rr = seg(u, 0.4, 0.7);
    for (let j = 0; j < 3; j++) { const qq = clamp(q * 1.6 - j * 0.25); if (qq > 0 && qq < 1) dropI(g, x + (j - 1) * 12, lerp(ty - 40, top - 4, qq), 7, '#f1d36a'); }
    if (q > 0.5) { g.save(); g.fillStyle = pos ? mix('#f1d36a', '#e0283c', rr) : '#f1d36a'; g.fillRect(x - 31, top - 2, 62, 16); g.restore(); }
    lab(g, pos ? 'indol +: inel roșu' : 'indol −: rămâne galben', x, R.y + R.h - 40, 18, pos ? '#ff8a9a' : '#f1d36a', seg(u, 0.6, 0.75));
  });
  lab(g, 'reactiv Kovacs', R.x + R.w * 0.46, R.y + 30, 18, M.hi);
  lab(g, 'tulbure din\nînțepătură = mobil', R.x + R.w * 0.87, R.y + R.h / 2, 17, M.cream);
}

/* =================================================== RECAPITULAREA */
// Ce se vede: 12 pictograme (o placă sau un tub pentru fiecare rând din tabel), cu culorile reale. Rândul activ e evidențiat și
// își rulează în buclă trecerea din aspectul negativ în cel pozitiv (ex. Chapman roșu → galben, Simmons verde → albastru).
const RECAP = [
  ['Geloză simplă', (g, x, y, p) => { plate(g, x, y, 72, M.agar); [[-20, -10], [22, -18], [5, 24]].forEach(([dx, dy]) => colony(g, x + dx, y + dy, 9 * p + 1, '#f3e6bf')); }],
  ['Geloză-sânge', (g, x, y, p) => { plate(g, x, y, 72, '#b8281f'); colony(g, x, y, 10, '#f3ecdc', { halo: rgba('#efcf9e', 0.9 * p), haloK: 3.2 }); }],
  ['Mueller-Hinton', (g, x, y, p) => { plate(g, x, y, 72, '#e9dcb0'); for (let j = 0; j < 60; j++) { const an = rnd(j) * TAU, d = Math.sqrt(rnd(j + 9)) * 64; if (d > 30 * p + 8) dot(g, x + Math.cos(an) * d, y + Math.sin(an) * d, 2.2, '#b8a160', { ow: 0 }); } dot(g, x, y, 8, '#ffffff', { ow: 2 }); }],
  ['Sabouraud', (g, x, y, p) => { plate(g, x, y, 72, '#efe2b2'); [[-22, -8], [18, -20], [4, 22], [28, 16]].forEach(([dx, dy]) => colony(g, x + dx, y + dy, 11 * p + 1, '#f4ead0')); }],
  ['Chapman / MSA', (g, x, y, p) => { plate(g, x, y, 72, mix('#ec6a5e', '#f2d23a', p)); [[-20, -10], [22, -18], [5, 24]].forEach(([dx, dy]) => colony(g, x + dx, y + dy, 8, mix('#f5eedc', '#f2c81a', p))); }],
  ['MacConkey', (g, x, y, p) => { plate(g, x, y, 72, '#c4605a'); [[-20, -10], [22, -18], [5, 24]].forEach(([dx, dy]) => colony(g, x + dx, y + dy, 9, mix('#efe0d0', '#a8244f', p))); }],
  ['Geloză lactozată', (g, x, y, p) => { plate(g, x, y, 72, mix('#3d86b0', '#f2d23a', p)); [[-20, -10], [22, -18], [5, 24]].forEach(([dx, dy]) => colony(g, x + dx, y + dy, 8, mix('#e8eef0', '#f0c020', p))); }],
  ['SS', (g, x, y, p) => { plate(g, x, y, 72, '#d48a3a'); [[-20, -10], [22, -18], [5, 24]].forEach(([dx, dy]) => { colony(g, x + dx, y + dy, 10, '#f1e6d6'); dot(g, x + dx, y + dy, 5 * p, M.black, { ow: 0 }); }); }],
  ['TSI', (g, x, y, p) => testTube(g, x, y - 92, 54, 184, mix('#c8203a', '#d6ac1c', p), { level: 0.8, slant: 1, top: mix('#c8203a', '#d6ac1c', p) })],
  ['Simmons', (g, x, y, p) => testTube(g, x, y - 92, 54, 184, mix('#2e7d4f', '#1d4fd0', p), { level: 0.8, slant: 1, top: mix('#2e7d4f', '#1d4fd0', p) })],
  ['Uree', (g, x, y, p) => testTube(g, x, y - 92, 54, 184, mix('#f0a07a', '#e0399a', p), { level: 0.75 })],
  ['SIM · ABE', (g, x, y, p) => { testTube(g, x - 36, y - 92, 48, 184, '#e8dcb8', { level: 0.82, black: p > 0.02, blackH: 0.45 * p, ring: p > 0.5 ? '#e0283c' : undefined }); testTube(g, x + 36, y - 92, 48, 184, '#e8dcb8', { level: 0.82, slant: 1, top: mix('#e8dcb8', M.black, p) }); }],
];
export function e_recap() {
  const pos = RECAP.map((_, k) => [125 + (k % 4) * 250, 150 + Math.floor(k / 4) * 300]);
  return {
    home: HOME,
    anchors: pos.map(([x, y]) => [x - 92, y - 104]),
    draw(g, t, b) {
      g.fillStyle = '#120b18'; g.fillRect(-3000, -3000, 7000, 7000);
      const auto = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 2.6) % RECAP.length : -1;
      RECAP.forEach(([name, f], k) => {
        const [x, y] = pos[k]; const act = k === b.i || k === auto;
        panel(g, x - 116, y - 120, 232, 286, { fill: act ? 'rgba(14,156,134,.22)' : 'rgba(255,240,228,.04)', stroke: act ? 'rgba(127,227,207,.8)' : 'rgba(255,230,210,.12)' });
        const p = act ? seg(cyc(b.i < 0 ? t : b.bt, b.i < 0 ? 2.6 : 4), 0.15, 0.7) : 1;
        f(g, x, y, p);
        lab(g, name, x, y + 132, 20, act ? M.hi : M.cream);
      });
    },
  };
}

/* =================================================== SEPARATORUL: formula de răspuns */
// Ce se vede: o placă în centru și 4 etape în colțuri, în ordinea răspunsului: 1 apare numele mediului și tipul (eticheta peste
// placă) → 2 cad în placă zahărul (manitol), indicatorul (roșu fenol) și inhibitorul (NaCl 7,5%) → 3 cresc coloniile →
// 4 mediul virează din roșu în galben pornind din colonii și apare „+”. Exemplu: Chapman pozitiv.
export function e_formula() {
  const C4 = [[160, 150], [840, 150], [160, 820], [840, 820]];
  return {
    home: HOME,
    anchors: C4.map(([x, y]) => [x, y - 76]),
    draw(g, t, b) {
      g.fillStyle = '#120b18'; g.fillRect(-3000, -3000, 7000, 7000);
      const s = P(b, t, 4); const s0 = s(0), s1 = s(1), s2 = s(2), s3 = s(3);
      const cx = 500, cy = 470, r = 200;
      plate(g, cx, cy, r, mix(M.agar, '#ec6a5e', s0));
      if (s3 > 0) { g.save(); g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.clip(); g.fillStyle = '#f2d23a'; [[-70, -40], [60, -70], [10, 80], [90, 50], [-90, 60]].forEach(([dx, dy]) => { g.beginPath(); g.arc(cx + dx, cy + dy, s3 * 260, 0, TAU); g.fill(); }); g.restore(); }
      [[-70, -40], [60, -70], [10, 80], [90, 50], [-90, 60]].forEach(([dx, dy]) => colony(g, cx + dx, cy + dy, 3 + 15 * s2, mix('#f5eedc', '#d9a400', s3), { alpha: s2 }));
      pill(g, cx, cy - r - 46, 360, 54, '#ffffff', 'Chapman · selectiv-diferențial', { size: 21, alpha: s0 });
      [['manitol', 'hex', -120], ['roșu fenol', 'drop', 0], ['NaCl 7,5%', 'salt', 120]].forEach(([nm, sh, dx], k) => {
        const q = clamp(s1 * 1.6 - k * 0.3); if (q <= 0) return; const x = lerp(840 + dx * 0.4, cx + dx * 0.6, q), y = lerp(230, cy - 40, q); const a = 1 - seg(q, 0.85, 1);
        if (sh === 'hex') hexM(g, x, y, 22, '#fff1c9', a); else if (sh === 'drop') dropI(g, x, y, 18, '#e8546a', a); else { g.save(); g.globalAlpha = a; g.fillStyle = '#f4f8ff'; g.strokeStyle = OUT; g.lineWidth = 3; g.fillRect(x - 14, y - 14, 28, 28); g.strokeRect(x - 14, y - 14, 28, 28); g.restore(); }
        lab(g, nm, x, y + 34, 16, M.cream, a);
      });
      if (s3 > 0.6) lab(g, '+', cx + r + 40, cy, 70, M.hi, seg(s3, 0.6, 0.9));
      const L = [['1 · mediul + tipul', 'de bază · complex · special ·\ndiferențial · selectiv-diferențial'], ['2 · ce conține', 'zahăr · indicator · inhibitor'], ['3 · ce crește', 'colonia, germenul'], ['4 · + sau − și de ce', 'de ce s-a schimbat culoarea']];
      L.forEach(([h, d], k) => { const [x, y] = C4[k]; const on = b.i === k || (b.i < 0 && s(k) > 0 && s(k) < 1); panel(g, x - 150, y - 60, 300, 120, { fill: on ? 'rgba(14,156,134,.24)' : 'rgba(255,240,228,.05)', stroke: on ? 'rgba(127,227,207,.8)' : 'rgba(255,230,210,.14)' }); lab(g, h, x, y - 26, 21, on ? M.hi : M.cream); lab(g, d, x, y + 20, 15, M.cream); });
      lab(g, 'exemplu: Chapman pozitiv', cx, 905, 18, M.dim);
    },
  };
}
