// v2a.js · scenele noi „fără desen”: scheletul stației (skel), microscopul (scope), DD față în față (ddFace).
// Pozele sunt cele din deck-ul vechi, neatinse: aici doar se afișează mărit / decupat. Cercurile folosesc DOAR coordonatele
// din adnotările deck-ului vechi (sceneOpts.main.marks din preps.js).
import { OUT, clamp, lerp, ease } from './kit2d.js';
import { K, W, H, HOME, T, sg, pop, pulse, bgK, tx, chip, panel, RED } from './kino.js';

const SW = 724, SH = 676;
const IM = {};
const img = (n) => { if (!IM[n]) { const i = new Image(); i.src = `img/${n}.jpg`; IM[n] = i; } return IM[n]; };
const ready = (im) => im.complete && im.naturalWidth;
const COLS = ['#ffe36e', '#7fe8ff', '#9dff8a', '#ffa3e0', '#ffb36b', '#c9b3ff'];
const lbl = (at, html, o = {}) => ({ at, html, ...o });
function fitT(w, h, bx, by, bw, bh) { const r = Math.min(bw / w, bh / h); return { r, ox: bx + (bw - w * r) / 2, oy: by + (bh - h * r) / 2 }; }
function dark(g) { const gr = g.createRadialGradient(SW / 2, SH * 0.4, 30, SW / 2, SH / 2, SH); gr.addColorStop(0, '#1c1226'); gr.addColorStop(1, '#09050d'); g.fillStyle = gr; g.fillRect(-3000, -3000, SW + 6000, SH + 6000); }
function ell(g, x, y, rx, ry, rot, c, on, a = 1, dash = false) {
  if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a);
  g.lineWidth = on ? 8 : 6; g.strokeStyle = OUT; g.beginPath(); g.ellipse(x, y, rx, ry, rot || 0, 0, 7); g.stroke();
  g.lineWidth = on ? 5 : 3; g.strokeStyle = c; if (on) { g.shadowColor = c; g.shadowBlur = 16; } if (dash) g.setLineDash([12, 8]);
  g.beginPath(); g.ellipse(x, y, rx, ry, rot || 0, 0, 7); g.stroke(); g.restore();
}
function tag(g, s, x, y, col = '#f6eef7', size = 13, a = 1) {
  if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.font = `700 ${size}px Inter, sans-serif`; const w = g.measureText(s).width + 14;
  g.fillStyle = 'rgba(20,10,28,.88)'; g.beginPath(); g.roundRect(x, y, w, size + 10, 8); g.fill();
  g.fillStyle = col; g.textBaseline = 'middle'; g.textAlign = 'left'; g.fillText(s, x + 7, y + (size + 10) / 2 + 0.5); g.restore();
}
function small(g, s, x, y, size = 11, col = 'rgba(246,238,247,.62)', align = 'left', wt = 500) { g.save(); g.font = `${wt} ${size}px Inter, sans-serif`; g.fillStyle = col; g.textAlign = align; g.textBaseline = 'middle'; g.fillText(s, x, y); g.restore(); }

/* =========================================================== SCHELETUL STAȚIEI */
export function skel() {
  const ROWS = [
    ['1', 'Organul', '1 p', 0], ['2', 'Leziunea', '1 p', 0], ['3', 'Definiția', '1 p', 0],
    ['4', 'Descrierea', 'o bulină = 1 p', 1], ['5', 'Cauzele', 'o bulină = 1 p', 2], ['6', 'Complicațiile', 'o bulină = 1 p', 3],
    ['7', 'Diagnosticul diferențial', '1 asemănare + 3 diferențe + 2 alternative', 4],
  ];
  const Y0 = 150, DY = 96, X0 = 150;
  return {
    home: HOME, anchors: [],
    phase: (i) => ['ordinea fișei', 'obligatoriu · 3 p', 'descrierea', 'cauzele', 'complicațiile', 'DD'][i + 1] || '',
    draw(g, t, b) {
      bgK(g, [[500, 300, 620, '#C2558C', 0.08]]);
      tx(g, 'Fișa oficială, de sus în jos', 500, 70, 30, K.ink);
      // coloana („scheletul”)
      g.save(); g.strokeStyle = 'rgba(255,243,230,.22)'; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(X0, Y0 - 20); g.lineTo(X0, Y0 + 6 * DY + 20); g.stroke(); g.restore();
      // acolada „obligatoriu”
      const ob = b.i === 0 || b.i < 0;
      panel(g, X0 - 52, Y0 - 46, 760, 2 * DY + 92, { r: 28, fill: ob ? 'rgba(255,90,90,.10)' : 'rgba(255,255,255,.03)', line: ob ? '#ff6b6b' : 'rgba(255,255,255,.14)', lw: 3 });
      chip(g, X0 + 596, Y0 - 46, 'OBLIGATORIU · 3 p', { size: 17, fill: '#2a1014', line: '#ff6b6b', col: '#ffb3b3', lw: 3 });
      ROWS.forEach(([n, name, pts, pk], k) => {
        const y = Y0 + k * DY; const on = b.i < 0 || b.i === pk; const seen = b.i > pk; const a = on ? 1 : seen ? 0.78 : 0.38;
        const c = k < 3 ? '#ff8f8f' : COLS[(k - 3) % COLS.length];
        g.save(); g.globalAlpha = a; if (on && b.i >= 0) { g.shadowColor = c; g.shadowBlur = 22; }
        g.fillStyle = on ? c : '#3a2a4a'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.arc(X0, y, 30, 0, 7); g.fill(); g.stroke(); g.restore();
        tx(g, n, X0, y + 1, 28, on ? '#20102a' : K.ink, { stroke: false, alpha: a });
        tx(g, name, X0 + 58, y - (k === 6 ? 14 : 0), 30, K.ink, { align: 'left', alpha: a });
        if (k === 6) tx(g, pts, X0 + 58, y + 22, 21, c, { align: 'left', alpha: a, w: 700 });
        else chip(g, X0 + 560, y, pts, { size: 20, fill: '#1a1022', line: c, col: c, lw: 3, alpha: a, wd: 250 });
      });
      panel(g, 120, 800, 760, 84, { r: 26, fill: 'rgba(255,227,110,.08)', line: 'rgba(255,227,110,.6)', lw: 3 });
      tx(g, 'minim 5 p = cele 3 obligatorii + 2 buline', 500, 842, 27, K.hi);
    },
  };
}

/* =========================================================== MICROSCOPUL */
// sceneOpts: { img, W, H, marks: [{x,y,rx,ry,rot,lab}] } = poza principală a lamei și adnotările ei din deck-ul vechi
export function scope({ spec }) {
  const o = spec.sceneOpts; const CX = 292, CY = 346, R = 266;
  const s0 = ((2 * R) / Math.hypot(o.W, o.H)) * 1.1;
  const views = [{ x: o.W / 2, y: o.H / 2, s: s0 }];
  o.marks.forEach((m) => {
    const s = clamp((0.44 * R) / Math.max(m.rx, m.ry ?? m.rx), s0 * 1.7, 1.9); const hw = (0.72 * R) / s;
    views.push({ x: clamp(m.x, Math.min(o.W / 2, hw), Math.max(o.W / 2, o.W - hw)), y: clamp(m.y, Math.min(o.H / 2, hw), Math.max(o.H / 2, o.H - hw)), s });
  });
  const viewAt = (b) => {
    const vi = Math.max(0, b.i), pv = views[Math.max(0, vi - 1)], cv = views[vi];
    const u = b.i <= 0 ? 1 : RED ? 1 : ease(clamp(b.bt / 1.5));
    return { x: lerp(pv.x, cv.x, u), y: lerp(pv.y, cv.y, u), s: Math.exp(lerp(Math.log(pv.s), Math.log(cv.s), u)), u };
  };
  // badge-ul structurii active o urmărește pe ecran (în vizor); celelalte stau ascunse, ca să nu se calce
  let LV = views[0], LI = -1;
  const anchors = [[CX - R * 0.7, CY - R * 0.7 - 6], ...o.marks.map((m, k) => () => { if (LI !== k + 1) return [-999, -999]; const x = CX + (m.x - LV.x) * LV.s, y = CY + (m.y - (m.ry ?? m.rx) - LV.y) * LV.s - 14; return Math.hypot(x - CX, y - CY) < R - 12 ? [x, y] : [-999, -999]; })];
  const TB = [586, 92, 130, 96]; const TT = fitT(o.W, o.H, ...TB);
  return {
    W: SW, H: SH, home: { x: SW / 2, y: SH / 2, z: 1 }, anchors,
    phase: (i) => (i <= 0 ? 'obiectiv mic' : 'obiectiv mare'),
    draw(g, t, b) {
      dark(g); const im = img(o.img); const v = viewAt(b); const big = b.i >= 1; LV = v; LI = b.i;
      // vizorul
      g.save(); g.beginPath(); g.arc(CX, CY, R, 0, 7); g.fillStyle = '#05030a'; g.fill(); g.clip();
      if (ready(im)) g.drawImage(im, CX - v.x * v.s, CY - v.y * v.s, o.W * v.s, o.H * v.s);
      o.marks.forEach((m, k) => {
        const on = b.i === k + 1; const a = on ? (RED ? 1 : sg(b.bt, 1.2, 0.5)) : b.i <= 0 ? 0.55 : 0.3;
        ell(g, CX + (m.x - v.x) * v.s, CY + (m.y - v.y) * v.s, m.rx * v.s, (m.ry ?? m.rx) * v.s, m.rot, COLS[k % COLS.length], on, a);
      });
      const vg = g.createRadialGradient(CX, CY, R * 0.72, CX, CY, R); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.62)'); g.fillStyle = vg; g.fillRect(CX - R, CY - R, 2 * R, 2 * R);
      g.restore();
      g.save(); g.strokeStyle = '#0b0610'; g.lineWidth = 18; g.beginPath(); g.arc(CX, CY, R + 6, 0, 7); g.stroke(); g.strokeStyle = '#6b5a7c'; g.lineWidth = 4; g.beginPath(); g.arc(CX, CY, R + 14, 0, 7); g.stroke(); g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.arc(CX, CY, R - 10, -2.5, -1.95); g.stroke(); g.restore();
      // eticheta structurii (sub vizor)
      const lab = b.i >= 1 ? o.marks[b.i - 1].lab : 'ansamblul lamei';
      g.save(); g.font = '700 16px Inter, sans-serif'; const lw = g.measureText(lab).width + 14; g.restore();
      tag(g, lab, CX - lw / 2, CY + R + 26, b.i >= 1 ? COLS[(b.i - 1) % COLS.length] : '#f6eef7', 16);
      // harta lamei (unde ești)
      small(g, 'unde ești pe lamă', TB[0] + TB[2] / 2, TB[1] - 14, 12, 'rgba(246,238,247,.8)', 'center', 700);
      g.save(); g.beginPath(); g.roundRect(TT.ox, TT.oy, o.W * TT.r, o.H * TT.r, 6); g.fillStyle = '#05030a'; g.fill(); g.clip();
      if (ready(im)) g.drawImage(im, TT.ox, TT.oy, o.W * TT.r, o.H * TT.r);
      g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(TT.ox, TT.oy, o.W * TT.r, o.H * TT.r);
      g.strokeStyle = '#ffe36e'; g.lineWidth = 2.5; g.beginPath(); g.arc(TT.ox + v.x * TT.r, TT.oy + v.y * TT.r, Math.max(5, (R / v.s) * TT.r), 0, 7); g.stroke(); g.restore();
      g.save(); g.strokeStyle = 'rgba(255,255,255,.3)'; g.lineWidth = 1.5; g.beginPath(); g.roundRect(TT.ox, TT.oy, o.W * TT.r, o.H * TT.r, 6); g.stroke(); g.restore();
      // revolverul cu obiective: cel scurt = mic, cel lung = mare
      const ox = 651, oy = 286; const u = b.i <= 0 ? 0 : b.i === 1 ? v.u : 1;
      g.save(); g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 5;
      g.fillStyle = '#4a3b5a'; g.beginPath(); g.roundRect(ox - 58, oy, 116, 26, 10); g.fill(); g.stroke();
      const barrel = (x, len, wd, onK) => { const c = onK > 0.5 ? '#ffe36e' : '#8d7fa0'; g.save(); if (onK > 0.5) { g.shadowColor = '#ffe36e'; g.shadowBlur = 18; } g.fillStyle = c; g.beginPath(); g.roundRect(x - wd / 2, oy + 26, wd, len, 6); g.fill(); g.restore(); g.beginPath(); g.roundRect(x - wd / 2, oy + 26, wd, len, 6); g.stroke(); g.fillStyle = '#20102a'; g.fillRect(x - wd / 2 + 4, oy + 26 + len - 12, wd - 8, 4); };
      barrel(ox - 28, 46, 36, 1 - u); barrel(ox + 28, 86, 26, u); g.restore();
      small(g, 'ob. mic', ox - 28, oy + 90, 12, u < 0.5 ? '#ffe36e' : 'rgba(246,238,247,.6)', 'center', 700);
      small(g, 'ob. mare', ox + 28, oy + 130, 12, u >= 0.5 ? '#ffe36e' : 'rgba(246,238,247,.6)', 'center', 700);
      small(g, 'Aceeași poză ca la stație', 651, 470, 11, 'rgba(246,238,247,.62)', 'center');
      small(g, '(preparatul de la LP),', 651, 485, 11, 'rgba(246,238,247,.62)', 'center');
      small(g, 'doar mărită pe ecran.', 651, 500, 11, 'rgba(246,238,247,.62)', 'center');
      small(g, big ? 'cerc = adnotarea din fișă' : 'cercuri = ce urmează', 651, 530, 11, 'rgba(246,238,247,.62)', 'center');
    },
  };
}

/* =========================================================== DD FAȚĂ ÎN FAȚĂ */
// sceneOpts: { wide, a: {img,W,H,marks,cap}, b: {img,W,H,marks,cap} }; puncte: 0 = asemănarea, 1–3 = diferențele, 4 = alternativele
export function ddFace({ spec }) {
  const o = spec.sceneOpts; const BA = o.wide ? [8, 50, 708, 284] : [8, 50, 346, 600], BB = o.wide ? [8, 372, 708, 284] : [370, 50, 346, 600];
  const MID = o.wide ? [362, 353] : [358, 350];
  const TA = fitT(o.a.W, o.a.H, ...BA);
  const bIm = img(o.b.img); const TBf = () => (o.b.W ? fitT(o.b.W, o.b.H, ...BB) : ready(bIm) ? fitT(bIm.naturalWidth, bIm.naturalHeight, ...BB) : null);
  const labels = [];
  const mk = (side, B, Tr) => {
    const L = (side.marks || []).filter((m) => m.lab).map((m) => lbl([clamp(Tr.ox + m.x * Tr.r, B[0] + Math.min(B[2] / 2, (m.lab.length * 6.6 + 28) / 2), B[0] + B[2] - Math.min(B[2] / 2, (m.lab.length * 6.6 + 28) / 2)), clamp(Tr.oy + (m.y + (m.ry ?? m.rx)) * Tr.r + 14, B[1] + 44, B[1] + B[3] - 14)], m.lab));
    const wOf = (l) => l.html.length * 6.6 + 20;
    for (let pass = 0; pass < 6; pass++) L.forEach((a, i) => L.forEach((c, j) => { if (j <= i) return; const dx = Math.abs(a.at[0] - c.at[0]), dy = Math.abs(a.at[1] - c.at[1]); if (dx < (wOf(a) + wOf(c)) / 2 + 4 && dy < 28) { const up = c.at[1] < a.at[1]; c.at = [c.at[0], clamp(a.at[1] + (up ? -30 : 30), B[1] + 44, B[1] + B[3] - 14)]; } }));
    labels.push(...L);
  };
  mk(o.a, BA, TA); if (o.b.W) mk(o.b, BB, fitT(o.b.W, o.b.H, ...BB));
  const box = (g, B, name, Tr, w, h, marks, on, c, t) => {
    g.save(); g.beginPath(); g.roundRect(...B, 12); g.fillStyle = '#0b0610'; g.fill(); g.clip(); const im = img(name);
    if (Tr && ready(im)) g.drawImage(im, Tr.ox, Tr.oy, w * Tr.r, h * Tr.r); g.restore();
    if (Tr) (marks || []).forEach((m, k) => { g.save(); g.beginPath(); g.roundRect(...B, 12); g.clip(); ell(g, Tr.ox + m.x * Tr.r, Tr.oy + m.y * Tr.r, m.rx * Tr.r, (m.ry ?? m.rx) * Tr.r, m.rot, COLS[k % COLS.length], false, 0.9, m.dash); g.restore(); });
    g.save(); g.lineWidth = on ? 6 : 4; g.strokeStyle = on ? c : OUT; if (on) { g.shadowColor = c; g.shadowBlur = 14 + (RED ? 0 : 6 * pulse(t, 1.6)); } g.beginPath(); g.roundRect(...B, 12); g.stroke(); g.restore();
  };
  return {
    W: SW, H: SH, home: { x: SW / 2, y: SH / 2, z: 1 }, anchors: [], labels,
    phase: (i) => ['față în față', 'asemănarea', 'diferența 1', 'diferența 2', 'diferența 3', 'alternativele'][i + 1] || '',
    draw(g, t, b) {
      dark(g); const same = b.i === 0, dif = b.i >= 1 && b.i <= 3; const c = same ? '#9dff8a' : '#ffe36e'; const Tb = TBf();
      box(g, BA, o.a.img, TA, o.a.W, o.a.H, o.a.marks, same || dif, c, t);
      box(g, BB, o.b.img, Tb, o.b.W || bIm.naturalWidth, o.b.H || bIm.naturalHeight, o.b.W ? o.b.marks : [], same || dif, c, t);
      tag(g, o.a.cap, BA[0] + 8, BA[1] + 8, '#ffffff', 14); tag(g, o.b.cap, BB[0] + 8, BB[1] + 8, '#ffe36e', 14);
      const s = b.i < 0 ? 'DD' : same ? '=' : dif ? '≠ ' + '①②③'[b.i - 1] : '+2';
      g.save(); g.font = '800 24px Inter, sans-serif'; const w = Math.max(54, g.measureText(s).width + 30); g.fillStyle = '#160d1c'; g.strokeStyle = b.i < 0 || b.i > 3 ? 'rgba(255,255,255,.5)' : c; g.lineWidth = 4; g.beginPath(); g.roundRect(MID[0] - w / 2, MID[1] - 23, w, 46, 23); g.fill(); g.stroke();
      g.fillStyle = b.i < 0 || b.i > 3 ? '#f6eef7' : c; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, MID[0], MID[1] + 1); g.restore();
      small(g, 'Pozele: preparatele de la LP (cum le vezi la examen); cercurile = adnotările din fișele celor două preparate.', 10, 666, 10.5);
    },
  };
}
