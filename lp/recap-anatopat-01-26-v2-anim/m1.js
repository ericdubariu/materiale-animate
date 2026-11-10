// m1.js · „de ce arată așa” · tulburările hemodinamice: trombul mixt (thrombusBuild), infarctul renal alb (renalWedge),
// infarctul pulmonar roșu (lungWedge), plămânul de stază cronică (lungStasis).
// Pasul se joacă o dată și rămâne pe cadrul final; doar sângele curge în buclă.
import { K, HOME, OUT, T, sg, ln, pop, lp, pulse, mix, hash, clamp, lerp, ease, RED, bgK, hud, tx, chip, capSeq, Path, mol, stream, arrowK, crossK, panel, ring, extra } from './kino.js';
import { smooth } from './kit2d.js';

const TT = (b, k) => (b.i < 0 ? 1e4 : T(b, k)); // la intro se vede cadrul final
const fillP = (g, p, c, a = 1) => { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.fillStyle = c; g.fill(p); g.restore(); };
const strokeP = (g, p, c, w, a = 1, o = {}) => { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.lineJoin = 'round'; g.lineCap = 'round'; if (o.glow) { g.shadowColor = c; g.shadowBlur = o.glow; } if (o.dash) g.setLineDash(o.dash); g.strokeStyle = c; g.lineWidth = w; g.stroke(p); g.restore(); };
function rbcK(g, x, y, r, rot = 0, a = 1, col = '#e5485d') { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(rot); g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = Math.max(1.5, r * 0.22); g.beginPath(); g.ellipse(0, 0, r * 1.25, r * 0.82, 0, 0, 7); g.fill(); g.stroke(); g.fillStyle = 'rgba(110,15,35,.45)'; g.beginPath(); g.ellipse(0, 0, r * 0.5, r * 0.3, 0, 0, 7); g.fill(); g.restore(); }
// linie de indicare de la etichetă la structură
function lead(g, x0, y0, x1, y1, c = '#fff3e6', a = 1) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.strokeStyle = c; g.lineWidth = 2.5; g.stroke(); g.fillStyle = c; g.beginPath(); g.arc(x1, y1, 5, 0, 7); g.fill(); g.restore(); }

/* ================= 1. TROMBUL MIXT: straturile se depun pe rând (liniile lui Zahn) ================= */
export function thrombusBuild() {
  const YT = 208, YB = 640, CX = 500; // lumenul: între y 208 și 640; trombul crește pe peretele de jos
  const D = [[150, 72], [200, 132], [245, 190], [288, 246]]; // cupolele straturilor (semilățime, înălțime)
  const PALE = '#f0c7d4', PALES = '#d79ab0', REDL = '#c62a40', REDS = '#8f1a2c';
  const dome = (a, h) => { const p = new Path2D(); p.moveTo(CX - a, YB); p.bezierCurveTo(CX - a * 0.9, YB - h * 1.15, CX - a * 0.42, YB - h, CX, YB - h); p.bezierCurveTo(CX + a * 0.42, YB - h, CX + a * 0.9, YB - h * 1.15, CX + a, YB); p.closePath(); return p; };
  const caps = [
    [[0, 'sângele curge prin arteră; pe perete, endoteliul e lezat'], [3.2, 'cauzele trombozei: triada Virchow']],
    [[0, 'pe leziune se întinde o rețea de fibrină'], [2.6, 'în ochiuri se prind trombocite și leucocite'], [5, 'primul strat: palid']],
    [[0, 'peste el se prind hematiile din curent'], [3.6, 'al doilea strat: roșu']],
    [[0, 'depunerea se repetă: palid, apoi roșu'], [5.4, 'alternanța straturilor = liniile lui Zahn']],
    [[0, 'un fragment se rupe din tromb'], [2.2, 'pleacă odată cu sângele, în aval'], [5, 'se oprește într-un ram mai mic → infarct']],
  ];
  let LI = -1; const OFF = [-999, -999];
  return {
    home: HOME, beatDur: 8,
    anchors: [[378, 668], () => (LI < 0 || LI >= 1 ? [CX - 118, YB - 24] : OFF), () => (LI < 0 || LI >= 2 ? [CX - 170, YB - 52] : OFF), () => (LI < 0 || LI >= 3 ? [CX, YB - 272] : OFF), () => (LI === 4 ? [612, 330] : OFF)],
    phase: (i) => ['trombul mixt', 'peretele + leziunea', 'stratul palid', 'stratul roșu', 'liniile lui Zahn', 'embolizarea'][i + 1] || '',
    draw(g, t, b) {
      const t0 = TT(b, 0), t1 = TT(b, 1), t2 = TT(b, 2), t3 = TT(b, 3), t4 = TT(b, 4); LI = b.i;
      bgK(g, [[500, 430, 560, '#e5485d', 0.07]]);
      // cât a crescut fiecare strat
      const u = [sg(t1, 4.4, 2.4), sg(t2, 2.6, 3), sg(t3, 0.6, 2.2), sg(t3, 3, 2.2)];
      const cur = D.map(([a, h], k) => { const [pa, ph] = k ? D[k - 1] : [40, 6]; return [lerp(pa, a, u[k]), lerp(ph, h, u[k])]; });
      const hTop = Math.max(8, ...cur.map(([, h], k) => (u[k] > 0.01 ? h : 0)));
      // lumenul
      g.save(); g.fillStyle = '#3a0f1c'; g.fillRect(-40, YT, 1080, YB - YT); g.restore();
      // curentul: 5 fire care ocolesc trombul pe deasupra
      const free = YB - hTop - YT;
      for (let k = 0; k < 5; k++) { const y0 = YT + 44 + k * 84; const yb = Math.min(y0, YT + 26 + (k + 0.5) * ((free - 40) / 5)); const w = cur[3][0] * (u[3] > 0.01 ? 1 : u[2] > 0.01 ? 0.86 : u[1] > 0.01 ? 0.7 : 0.55);
        const P = new Path([[-30, y0], [CX - w - 170, y0], [CX - w * 0.5, yb], [CX, yb], [CX + w * 0.5, yb], [CX + w + 170, y0], [1030, y0]], { n: 8 });
        stream(g, P, t + k * 0.37, K.blood, { n: 7, speed: 0.11, r: 9, rbc: true }); }
      // pereții arterei
      for (const [y, h] of [[YT - 52, 52], [YB, 52]]) { g.save(); g.fillStyle = '#e7a3a8'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.rect(-40, y, 1080, h); g.fill(); g.stroke(); g.fillStyle = 'rgba(160,70,90,.35)'; for (let x = 10; x < 1000; x += 46) { g.beginPath(); g.ellipse(x + (y < 300 ? 0 : 23), y + h / 2, 15, 5, 0, 0, 7); g.fill(); } g.restore(); }
      tx(g, 'peretele arterei', 150, YT - 26, 19, '#3a1020', { stroke: false });
      arrowK(g, [[60, 118], [250, 118]], K.bloodL, 6, 1); tx(g, 'sensul curgerii', 155, 92, 18, K.bloodL);
      // leziunea endotelială (pe peretele de jos)
      const les = new Path2D(); les.moveTo(CX - 120, YB + 3); les.quadraticCurveTo(CX, YB - 40, CX + 120, YB + 3); les.closePath();
      g.save(); g.fillStyle = '#f1d98a'; g.strokeStyle = OUT; g.lineWidth = 4; g.fill(les); g.stroke(les); g.restore();
      if (b.i === 0) ring(g, CX, YB - 8, 70 + 10 * pulse(t, 1.4), K.hi, 0.5 * sg(t0, 0.3, 0.6), 4);
      // rețeaua de fibrină (înaintea primului strat)
      const fu = ln(t1, 0.3, 2.2);
      if (fu > 0 && u[0] < 0.999) { g.save(); g.globalAlpha = 1 - u[0] * 0.6; g.strokeStyle = '#ffd9e6'; g.lineWidth = 3; g.lineCap = 'round';
        for (let k = 0; k < 9; k++) { const x0 = CX - 104 + k * 26, an = -Math.PI / 2 + (k - 4) * 0.2, L = (52 + 22 * hash(k)) * fu; g.beginPath(); g.moveTo(x0, YB - 12); g.quadraticCurveTo(x0 + Math.cos(an) * L * 0.5 + 12 * Math.sin(k), YB - 12 + Math.sin(an) * L * 0.5, x0 + Math.cos(an) * L, YB - 12 + Math.sin(an) * L); g.stroke(); }
        for (let k = 0; k < 4; k++) { const yy = YB - 22 - k * 13; if (fu > 0.3 + k * 0.15) { g.beginPath(); g.moveTo(CX - 100 + k * 10, yy); g.quadraticCurveTo(CX, yy - 12, CX + 100 - k * 10, yy); g.stroke(); } }
        g.restore(); }
      // trombocitele și leucocitele care se prind în rețea
      if (t1 >= 0 && u[0] < 0.999) for (let k = 0; k < 12; k++) { const uu = sg(t1, 2.2 + k * 0.17, 1.5); if (uu <= 0) continue; const ex = CX - 96 + hash(k + 3) * 192, ey = YB - 20 - hash(k + 9) * 42; const x = lerp(-30 + k * 12, ex, uu), y = lerp(YT + 150 + (k % 4) * 60, ey, uu); if (k % 5 === 4) mol(g, x, y, 13, '#f3f0ff', { ow: 3, alpha: 1 - u[0] }); else mol(g, x, y, 6, '#ffe3a1', { ow: 2, alpha: 1 - u[0] }); }
      // hematiile care se prind peste stratul palid
      if (t2 >= 0 && u[1] < 0.999) for (let k = 0; k < 12; k++) { const uu = sg(t2, 0.4 + k * 0.2, 1.6); if (uu <= 0) continue; const an = Math.PI * (0.1 + 0.8 * hash(k + 21)); const ex = CX - Math.cos(an) * 172, ey = YB - 8 - Math.sin(an) * 100; rbcK(g, lerp(-30 + k * 10, ex, uu), lerp(YT + 120 + (k % 5) * 56, ey, uu), 9, k, 1 - u[1]); }
      // straturile (de la cel mai mare la cel mai mic)
      for (let k = 3; k >= 0; k--) { if (u[k] <= 0.01) continue; const [a, h] = cur[k]; const p = dome(a, h); const red = k % 2 === 1;
        g.save(); g.fillStyle = red ? REDL : PALE; g.fill(p); g.clip(p);
        for (let m = 0; m < (red ? 90 : 70); m++) { const x = CX - a + hash(m * 3 + k * 50) * 2 * a, y = YB - hash(m * 7 + k * 31) * h; if (red) { g.fillStyle = REDS; g.beginPath(); g.ellipse(x, y, 7, 4.4, hash(m) * 3, 0, 7); g.fill(); } else { g.fillStyle = PALES; g.beginPath(); g.arc(x, y, 2.6, 0, 7); g.fill(); } }
        if (!red) { g.strokeStyle = 'rgba(190,110,140,.55)'; g.lineWidth = 2; for (let m = 0; m < 7; m++) { const hh = h * (0.25 + 0.12 * m); g.beginPath(); g.moveTo(CX - a, YB - hh * 0.3); g.quadraticCurveTo(CX, YB - hh * 1.5, CX + a, YB - hh * 0.3); g.stroke(); } }
        g.restore(); strokeP(g, p, OUT, 5); }
      // numele straturilor (în interiorul lor)
      const la = sg(t3, 5.4, 0.8);
      if (u[0] > 0.9) tx(g, 'trombocite + fibrină', CX, YB - 34, 17, '#4a1830', { stroke: false, alpha: b.i === 1 ? sg(t1, 6.8, 0.6) : 1 });
      if (u[1] > 0.9) tx(g, 'hematii', CX, YB - 100, 18, '#fff3e6', { stroke: false, alpha: b.i === 2 ? sg(t2, 5.6, 0.6) : 1 });
      if (u[2] > 0.9) tx(g, 'trombocite + fibrină', CX, YB - 160, 17, '#4a1830', { stroke: false, alpha: la });
      if (u[3] > 0.9) tx(g, 'hematii', CX, YB - 216, 18, '#fff3e6', { stroke: false, alpha: la });
      // fragmentul care se rupe (embolizarea)
      if (t4 >= 0 && t4 < 1e3) { const ex = 706, ey = 430; const mv = sg(t4, 2, 4.2); const x = lerp(ex, 1060, mv), y = lerp(ey, 300, Math.min(1, mv * 2.2)); ring(g, ex, ey, 44, K.hi, (1 - sg(t4, 1.4, 0.8)) * sg(t4, 0.2, 0.5), 4);
        const p = new Path2D(); p.ellipse(x, y, 34, 24, 0.5 + mv * 2, 0, 7); g.save(); g.fillStyle = REDL; g.fill(p); g.clip(p); g.fillStyle = PALE; g.beginPath(); g.arc(x - 16, y + 22, 28, 0, 7); g.fill(); g.restore(); strokeP(g, p, OUT, 5); }
      // etichetele de sub arteră
      const tri = b.i === 0;
      if (tri) { tx(g, 'triada Virchow', 500, 742, 22, K.hi, { alpha: sg(t0, 3.2, 0.5) }); [['leziunea endotelială', 190], ['fluxul sanguin anormal', 500], ['statusul hipercoagulant', 815]].forEach(([s, x], k) => chip(g, x, 796, s, { size: 18, fill: '#221528', line: K.hi, col: K.ink, lw: 3, alpha: sg(t0, 3.6 + k * 0.9, 0.5), scale: 0.9 + 0.1 * pop(t0, 3.6 + k * 0.9) })); lead(g, 190, 776, CX - 70, YB + 4, K.hi, sg(t0, 3.9, 0.5)); }
      if (b.i === 1 || b.i === 2) chip(g, 500, 760, b.i === 1 ? 'strat palid: trombocite + fibrină (și leucocite)' : 'strat roșu: bogat în hematii', { size: 20, fill: '#221528', line: b.i === 1 ? PALE : '#ff8fa0', col: b.i === 1 ? PALE : '#ff8fa0', lw: 3, alpha: b.i === 1 ? sg(t1, 5, 0.6) : sg(t2, 3.6, 0.6) });
      if (b.i < 0 || b.i >= 3) { const a = sg(t3, 5.4, 0.7); chip(g, 500, 742, 'straturi palide și roșii, alternativ = liniile lui Zahn', { size: 21, fill: '#2a1d10', line: K.hi, col: K.hi, lw: 3, alpha: a }); chip(g, 500, 800, 'trombul rămâne aderent de peretele arterei', { size: 18, fill: '#221528', line: 'rgba(255,255,255,.35)', col: K.ink, lw: 2.5, alpha: a }); }
      if (b.i === 4) chip(g, 730, 118, 'embolul pleacă în aval', { size: 19, fill: '#221528', line: '#ff8fa0', col: '#ff8fa0', lw: 3, alpha: sg(t4, 2.2, 0.6) });
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i]); g.restore();
    },
  };
}

/* ================= 2. INFARCTUL RENAL: embolul → ramura din aval → pană albă cu lizereu ================= */
// arbore arterial comun celor două scene de infarct: trunchi → 3 ramuri → câte 2 ramuri mici
function tree(hx, hy, x0, sx) {
  const main = new Path([[x0, hy], [hx - 120, hy], [hx, hy]], { n: 8 });
  const br = [[[hx, hy], [hx + 100 * sx, hy - 130], [hx + 180 * sx, hy - 220]], [[hx, hy], [hx + 140 * sx, hy], [hx + 250 * sx, hy - 8]], [[hx, hy], [hx + 100 * sx, hy + 130], [hx + 180 * sx, hy + 220]]].map((p) => new Path(p, { n: 10 }));
  const sub = [
    [[hx + 180 * sx, hy - 220], [hx + 270 * sx, hy - 262]], [[hx + 180 * sx, hy - 220], [hx + 150 * sx, hy - 300]],
    [[hx + 250 * sx, hy - 8], [hx + 360 * sx, hy - 76]], [[hx + 250 * sx, hy - 8], [hx + 366 * sx, hy + 66]],
    [[hx + 180 * sx, hy + 220], [hx + 270 * sx, hy + 262]], [[hx + 180 * sx, hy + 220], [hx + 150 * sx, hy + 300]],
  ].map((p) => new Path(p, { n: 6 }));
  return { main, br, sub, stop: [hx + 250 * sx, hy - 8] };
}
export function renalWedge() {
  const HX = 400, HY = 462; const A = tree(HX, HY, 30, 1);
  const kid = smooth([[520, 128], [690, 160], [806, 290], [836, 462], [806, 634], [690, 764], [520, 796], [410, 742], [352, 628], [392, 530], [414, 462], [392, 394], [352, 296], [410, 182]]);
  const sinus = smooth([[440, 400], [520, 372], [566, 462], [520, 552], [440, 524], [424, 462]]);
  const [SX, SY] = A.stop; // aici se oprește embolul: capătul ramurii mijlocii, unde se desparte în ramuri mai înguste
  const wedge = new Path2D(); wedge.moveTo(SX - 10, SY); wedge.lineTo(960, 176); wedge.lineTo(960, 736); wedge.closePath();
  const sides = new Path2D(); sides.moveTo(960, 176); sides.lineTo(SX - 10, SY); sides.lineTo(960, 736);
  const emb = new Path([[30, HY], [HX - 120, HY], [HX, HY], [HX + 140, HY], [SX - 4, SY]], { n: 12 });
  const caps = [
    [[0, 'sângele intră prin artera renală și se împarte pe ramuri'], [3.4, 'fiecare ramură hrănește singură teritoriul ei']],
    [[0, 'un embol vine odată cu sângele'], [2.6, 'trece de trunchiul larg'], [4.6, 'în plus: se oprește în ramura din aval, unde vasul se îngustează']],
    [[0, 'dincolo de embol nu mai ajunge sânge'], [2.6, 'teritoriul ramurii moare și rămâne palid: infarct alb']],
    [[0, 'la limita cu țesutul viu: vase congestionate'], [3, 'banda roșie din jurul zonei palide = lizereul congestiv']],
  ];
  let LI = -1; const OFF = [-999, -999];
  return {
    home: HOME, beatDur: 8,
    anchors: [[150, HY - 44], () => (LI < 0 || LI >= 1 ? [SX - 34, SY - 44] : OFF), () => (LI < 0 || LI >= 2 ? [800, 540] : OFF), () => (LI < 0 || LI >= 3 ? [716, 352] : OFF)],
    phase: (i) => ['infarctul renal', 'circulația unică', 'embolul', 'infarct alb', 'lizereul congestiv'][i + 1] || '',
    draw(g, t, b) {
      const t0 = TT(b, 0), t1 = TT(b, 1), t2 = TT(b, 2), t3 = TT(b, 3); LI = b.i;
      bgK(g, [[560, 460, 560, '#c4574b', 0.09]]);
      const eu = b.i >= 1 || b.i < 0 ? sg(t1, 0.6, 4.6) : 0; const blocked = eu >= 0.999; const pal = sg(t2, 1.6, 3.6), liz = sg(t3, 0.6, 2.6);
      // rinichiul
      g.save(); g.fillStyle = '#b9544a'; g.fill(kid); g.clip(kid);
      g.fillStyle = 'rgba(120,40,40,.28)'; for (let k = 0; k < 7; k++) { const an = -1.25 + k * 0.42; g.beginPath(); g.moveTo(560 + Math.cos(an) * 60, 462 + Math.sin(an) * 80); g.lineTo(560 + Math.cos(an - 0.14) * 215, 462 + Math.sin(an - 0.14) * 285); g.lineTo(560 + Math.cos(an + 0.14) * 215, 462 + Math.sin(an + 0.14) * 285); g.closePath(); g.fill(); }
      // teritoriul fără sânge: pălește
      if (pal > 0.01) { g.save(); g.globalAlpha = pal; g.fillStyle = '#f2e3c2'; g.fill(wedge); g.restore(); }
      if (liz > 0.01) { g.save(); g.globalAlpha = liz; g.shadowColor = '#ff5a6e'; g.shadowBlur = 14; g.strokeStyle = '#d92b45'; g.lineWidth = 15; g.lineJoin = 'round'; g.stroke(sides); g.restore(); }
      g.restore(); strokeP(g, kid, OUT, 7);
      g.save(); g.fillStyle = '#edd3a4'; g.strokeStyle = OUT; g.lineWidth = 4; g.fill(sinus); g.stroke(sinus); g.restore();
      // arterele: trunchi larg → ramuri → ramuri mici (tot mai înguste)
      A.main.stroke(g, 30, K.blood, { ow: 9, core: K.bloodL });
      A.br.forEach((p) => p.stroke(g, 17, K.blood, { ow: 7 }));
      A.sub.forEach((p, k) => p.stroke(g, 8, k === 2 || k === 3 ? mix(K.blood, '#8d7f86', pal) : K.blood, { ow: 6 }));
      // sângele curge (în buclă); dincolo de embol se oprește
      stream(g, A.main, t, K.bloodL, { n: 6, speed: 0.22, r: 6 });
      A.br.forEach((p, k) => stream(g, p, t + k * 0.3, K.bloodL, { n: 4, speed: 0.3, r: 4.5 }));
      A.sub.forEach((p, k) => { if ((k === 2 || k === 3) && blocked) return; stream(g, p, t + k * 0.2, K.bloodL, { n: 3, speed: 0.5, r: 3 }); });
      // embolul
      if (eu > 0) { const [x, y] = emb.at(eu); mol(g, x, y, 10.5, '#5a0f1e', { ow: 3.5, glow: blocked ? 0 : 0.6, gc: '#ff8fa0' }); if (blocked && b.i === 1) ring(g, SX, SY, 30 + 6 * pulse(t, 1.3), K.hi, 0.8, 4); }
      if (blocked) { crossK(g, SX + 62, SY - 44, 11, b.i === 1 ? sg(t1, 5.6, 0.5) : 1); crossK(g, SX + 66, SY + 38, 11, b.i === 1 ? sg(t1, 5.8, 0.5) : 1); }
      // etichetele
      tx(g, 'a. renală', 150, HY + 44, 20, K.bloodL); tx(g, 'hil', 420, HY + 122, 18, K.dim); lead(g, 420, HY + 108, 430, HY + 62, K.dim);
      tx(g, 'capsulă', 900, 120, 19, K.ink); lead(g, 874, 134, 752, 210, K.ink);
      if (b.i === 0) { chip(g, 690, 842, 'circulație unică: o ramură = un teritoriu', { size: 19, fill: '#221528', line: K.hi, col: K.hi, lw: 3, alpha: sg(t0, 3.4, 0.6) }); }
      if (b.i === 1) { chip(g, 250, 330, 'embol', { size: 19, fill: '#221528', line: '#ff8fa0', col: '#ff8fa0', lw: 3, alpha: sg(t1, 0.4, 0.5) * (1 - sg(t1, 4.4, 0.6)) }); chip(g, 500, 842, 'în plus: oprit în ramura din aval (mai îngustă decât el)', { size: 19, fill: '#221528', line: K.hi, col: K.hi, lw: 3, alpha: sg(t1, 5.2, 0.6) }); lead(g, 560, 822, SX - 6, SY + 16, K.hi, sg(t1, 5.4, 0.5)); }
      if (pal > 0.5) tx(g, 'infarct alb', 772, 446, 22, '#5a2a1a', { stroke: false, alpha: sg(t2, 4.6, 0.7) });
      if (pal > 0.5) tx(g, '(zonă palidă)', 776, 472, 15, '#5a2a1a', { stroke: false, alpha: sg(t2, 4.6, 0.7), w: 700 });
      if (b.i === 2) extra(g, 500, 842, 'în plus: pană cu baza spre capsulă, vârful spre vasul obstruat', sg(t2, 5.4, 0.6), { size: 17 });
      if (liz > 0.3) { const a = sg(t3, 2.6, 0.6); chip(g, 885, 236, 'lizereu congestiv', { size: 20, fill: '#2a1014', line: '#ff6b7e', col: '#ff9aa8', lw: 3, alpha: a }); lead(g, 850, 256, 800, 316, '#ff9aa8', a); }
      if (b.i === 3 || b.i < 0) { const a = sg(t3, 3.6, 0.6); tx(g, 'parenchim renal normal', 690, 668, 18, K.ink, { alpha: a }); }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: 900 }); g.restore();
    },
  };
}

/* ================= 3. INFARCTUL PULMONAR: embol + circulație dublă + stază → pană roșie ================= */
export function lungWedge() {
  const HX = 330, HY = 462; const A = tree(HX, HY, 30, 1); const [SX, SY] = A.stop;
  const lung = smooth([[430, 120], [590, 150], [740, 280], [830, 440], [862, 620], [820, 770], [640, 812], [440, 800], [330, 740], [290, 600], [322, 524], [336, 462], [322, 400], [290, 320], [330, 190]]);
  const wedge = new Path2D(); wedge.moveTo(SX - 10, SY); wedge.lineTo(990, 236); wedge.lineTo(990, 700); wedge.closePath();
  const sides = new Path2D(); sides.moveTo(990, 236); sides.lineTo(SX - 10, SY); sides.lineTo(990, 700);
  const emb = new Path([[30, HY], [HX - 120, HY], [HX, HY], [HX + 140, HY], [SX - 4, SY]], { n: 12 });
  // arterele bronșice (subțiri, roșii): merg pe lângă ramurile a. pulmonare; una ajunge în teritoriul astupat
  const BR = [new Path([[30, 520], [200, 512], [338, 496], [470, 488], [590, 482], [680, 474], [770, 462]], { n: 10 }), new Path([[338, 496], [420, 600], [500, 690]], { n: 8 }), new Path([[338, 496], [400, 380], [470, 290]], { n: 8 })];
  const inW = (x, y) => { const dx = x - (SX - 10); if (dx < 20) return false; const up = SY + (236 - SY) * (dx / (990 - SX + 10)), dn = SY + (700 - SY) * (dx / (990 - SX + 10)); return y > up + 12 && y < dn - 12; };
  const dots = []; for (let k = 0; dots.length < 150 && k < 4000; k++) { const x = 590 + hash(k * 3 + 1) * 270, y = 290 + hash(k * 7 + 5) * 370; if (inW(x, y)) dots.push([x, y]); }
  const caps = [
    [[0, 'plămânul primește sânge pe două căi'], [2.6, 'a. pulmonară (albastru) și arterele bronșice (roșu, subțiri)'], [5.2, 'aici plămânul are deja stază cronică: e brun']],
    [[0, 'embolul vine prin artera pulmonară'], [2.6, 'trece de trunchiul larg'], [4.6, 'în plus: se oprește în ramura din aval, unde vasul se îngustează']],
    [[0, 'ramurile bronșice aduc în continuare sânge'], [2.6, 'pe stază nu pot suplini: țesutul moare'], [4.6, 'sângele se adună în zona moartă și o inundă']],
    [[0, 'zona necrozată, plină de sânge: infarct roșu'], [3, 'triunghi cu vârful spre hil, la vasul obstruat']],
  ];
  let LI = -1; const OFF = [-999, -999];
  return {
    home: HOME, beatDur: 8,
    anchors: [[120, HY - 46], () => (LI < 0 || LI >= 1 ? [SX - 34, SY - 46] : OFF), () => (LI < 0 || LI >= 2 ? [640, 520] : OFF), () => (LI < 0 || LI >= 3 ? [780, 560] : OFF)],
    phase: (i) => ['infarctul pulmonar', 'circulația dublă', 'embolul (TEP)', 'bronșicele nu suplinesc', 'infarct roșu'][i + 1] || '',
    draw(g, t, b) {
      const t0 = TT(b, 0), t1 = TT(b, 1), t2 = TT(b, 2), t3 = TT(b, 3); LI = b.i;
      bgK(g, [[560, 460, 560, '#8a5a4a', 0.1]]);
      const eu = b.i >= 1 || b.i < 0 ? sg(t1, 0.6, 4.6) : 0; const blocked = eu >= 0.999; const fl = ln(t2, 2.2, 4.6), dk = sg(t2, 4.4, 3), edge = sg(t3, 0.4, 2);
      // plămânul cu stază cronică (brun)
      g.save(); g.fillStyle = '#9b6652'; g.fill(lung); g.clip(lung);
      g.fillStyle = 'rgba(90,45,30,.38)'; for (let k = 0; k < 150; k++) { g.beginPath(); g.arc(290 + hash(k * 5 + 2) * 580, 120 + hash(k * 11 + 3) * 700, 7 + hash(k) * 7, 0, 7); g.fill(); }
      // sângele care inundă teritoriul
      if (dk > 0.01) { g.save(); g.globalAlpha = dk; g.fillStyle = '#6a0e1f'; g.fill(wedge); g.restore(); }
      dots.forEach(([x, y], k) => { const a = clamp((fl * 1.25 - k / dots.length) * 6); if (a > 0.01) rbcK(g, x, y, 7.5, k, a * (1 - dk * 0.75), '#c9243c'); });
      if (edge > 0.01) strokeP(g, sides, '#2a0710', 6, edge);
      g.restore(); strokeP(g, lung, OUT, 7);
      // a. pulmonară (albastră): trunchi → ramuri → ramuri mici
      const VB = K.vein, VL = '#a9c4ff';
      A.main.stroke(g, 30, VB, { ow: 9, core: VL });
      A.br.forEach((p) => p.stroke(g, 17, VB, { ow: 7 }));
      A.sub.forEach((p, k) => p.stroke(g, 8, k === 2 || k === 3 ? mix(VB, '#56506a', blocked ? 1 : 0) : VB, { ow: 6 }));
      stream(g, A.main, t, VL, { n: 6, speed: 0.22, r: 6 });
      A.br.forEach((p, k) => stream(g, p, t + k * 0.3, VL, { n: 4, speed: 0.3, r: 4.5 }));
      A.sub.forEach((p, k) => { if ((k === 2 || k === 3) && blocked) return; stream(g, p, t + k * 0.2, VL, { n: 3, speed: 0.5, r: 3 }); });
      // arterele bronșice (roșii, subțiri)
      BR.forEach((p, k) => { p.stroke(g, 5, K.blood, { ow: 4 }); stream(g, p, t + k * 0.4, K.bloodL, { n: k ? 3 : 7, speed: k ? 0.3 : 0.16, r: 3 }); });
      // embolul
      if (eu > 0) { const [x, y] = emb.at(eu); mol(g, x, y, 10.5, '#5a0f1e', { ow: 3.5, glow: blocked ? 0 : 0.6, gc: '#ff8fa0' }); if (blocked && b.i === 1) ring(g, SX, SY, 30 + 6 * pulse(t, 1.3), K.hi, 0.8, 4); }
      if (blocked) { crossK(g, SX + 62, SY - 46, 11, b.i === 1 ? sg(t1, 5.6, 0.5) : 1); crossK(g, SX + 66, SY + 26, 11, b.i === 1 ? sg(t1, 5.8, 0.5) : 1); }
      // etichetele
      tx(g, 'a. pulmonară', 130, HY - 120, 20, VL); tx(g, '(ramură)', 130, HY - 96, 16, VL, { w: 700 });
      tx(g, 'a. bronșice', 130, 556, 19, K.bloodL);
      tx(g, 'hil', 250, 640, 18, K.dim); lead(g, 262, 626, 318, 540, K.dim);
      tx(g, 'pleură', 900, 250, 19, K.ink); lead(g, 878, 264, 770, 318, K.ink);
      tx(g, 'stază cronică', 700, 640, 19, '#ffe2c9'); tx(g, '(indurație brună)', 700, 664, 16, '#ffe2c9', { w: 700 });
      if (b.i === 0) chip(g, 560, 846, 'circulație dublă: a. pulmonară + a. bronșice', { size: 19, fill: '#221528', line: K.hi, col: K.hi, lw: 3, alpha: sg(t0, 2.6, 0.6) });
      if (b.i === 1) { chip(g, 230, 330, 'embol (dintr-o TVP)', { size: 18, fill: '#221528', line: '#ff8fa0', col: '#ff8fa0', lw: 3, alpha: sg(t1, 0.4, 0.5) * (1 - sg(t1, 4.4, 0.6)) }); chip(g, 500, 846, 'în plus: oprit în ramura din aval (mai îngustă decât el)', { size: 19, fill: '#221528', line: K.hi, col: K.hi, lw: 3, alpha: sg(t1, 5.2, 0.6) }); lead(g, 540, 826, SX - 6, SY + 16, K.hi, sg(t1, 5.4, 0.5)); }
      if (b.i === 2) extra(g, 500, 846, 'în plus: sângele bronșic ajunge, dar nu poate hrăni zona', sg(t2, 2.6, 0.6), { size: 17 });
      if (dk > 0.5) { const a = b.i === 2 ? sg(t2, 7, 0.6) : 1; tx(g, 'infarct roșu', 786, 404, 20, '#ffd9df', { alpha: a }); tx(g, '(hemoragic)', 790, 428, 16, '#ffd9df', { alpha: a, w: 700 }); }
      if (b.i === 3 || b.i < 0) { const a = sg(t3, 3, 0.6); chip(g, 360, 846, 'vârful spre hil', { size: 19, fill: '#221528', line: K.hi, col: K.hi, lw: 3, alpha: a }); lead(g, 400, 826, SX - 2, SY + 20, K.hi, a); extra(g, 760, 846, 'în plus: baza spre pleură', sg(t3, 4.2, 0.6), { size: 17 }); lead(g, 800, 826, 838, 640, '#8fb6ff', sg(t3, 4.4, 0.6)); }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: 902 }); g.restore();
    },
  };
}

/* ================= 4. PLĂMÂNUL DE STAZĂ CRONICĂ: inima nu drenează → capilare congestionate → siderofage → fibroză ================= */
export function lungStasis() {
  const FLOW = new Path([[96, 236], [180, 236], [262, 216], [640, 216], [700, 196], [742, 262], [770, 306], [850, 310], [972, 310]], { n: 10 });
  const VEIN = new Path([[250, 216], [648, 216]], { n: 4 });
  const SEP = [350, 650]; const BY0 = 418, BY1 = 850;
  const MAC = [[196, 528], [232, 728], [500, 612], [804, 548], [776, 742]];
  const RB = []; MAC.forEach(([mx, my], m) => { for (let j = 0; j < 3; j++) { const an = j * 2.1 + m; const sx = Math.abs(mx - 350) < Math.abs(mx - 650) ? 350 : 650; RB.push({ sx, sy: lerp(480, 800, hash(m * 3 + j + 1)), ex: mx + Math.cos(an) * 52, ey: my + Math.sin(an) * 46, mx, my }); } });
  const caps = [
    [[0, 'drumul normal: plămân → venele pulmonare → atriul stâng'], [4, 'inima împinge sângele mai departe: plămânul e drenat']],
    [[0, 'în plus: inima nu mai împinge tot sângele'], [3, 'sângele rămâne în urmă: venele pulmonare se umplu'], [5.4, 'drenajul venos e alterat = stază (proces pasiv)']],
    [[0, 'în septuri, capilarele se dilată: vase congestionate'], [2.6, 'hematiile ies din capilare în alveole']],
    [[0, 'în plus: macrofagele din alveole fagocitează hematiile'], [3.2, 'în plus: hemoglobina devine hemosiderină, pigment brun'], [5.6, 'siderofage = „celule cardiace”']],
    [[0, 'cu timpul, septurile se îngroașă și se fibrozează'], [4.4, 'plămânul devine brun și ferm: indurație brună']],
  ];
  return {
    home: HOME, beatDur: 8,
    anchors: [[64, 128], [640, 318], [350, 470], [562, 556], [650, 470]],
    phase: (i) => ['plămânul de stază', 'drenajul venos', 'insuficiența cardiacă', 'vase congestionate', 'siderofagele', 'septuri fibrozate'][i + 1] || '',
    draw(g, t, b) {
      const t0 = TT(b, 0), t1 = TT(b, 1), t2 = TT(b, 2), t3 = TT(b, 3), t4 = TT(b, 4);
      bgK(g, [[500, 220, 460, '#e5485d', 0.06]]);
      const fail = sg(t1, 0.6, 2.4), cong = sg(t1, 2.6, 3.4), cg = clamp(cong * 0.35 + sg(t2, 0.3, 2) * 0.65), brown = sg(t3, 3, 3.2), fib = sg(t4, 0.5, 4.2);
      /* ---- sus: circuitul plămân → inimă ---- */
      panel(g, 50, 122, 212, 188, { r: 26, fill: mix('#3a2030', '#5a1626', cong), line: 'rgba(255,200,210,.45)' });
      tx(g, 'capilarele', 156, 150, 17, K.ink, { stroke: false }); tx(g, 'pulmonare', 156, 172, 17, K.ink, { stroke: false });
      for (let k = 0; k < 3; k++) { const p = new Path([[76, 208 + k * 30], [130, 196 + k * 30], [186, 220 + k * 30], [240, 208 + k * 30]], { n: 6 }); p.stroke(g, lerp(7, 13, cong), mix(K.blood, '#8f1a2c', cong), { ow: 4 }); }
      VEIN.stroke(g, lerp(30, 54, cong), mix(K.blood, '#8f1a2c', cong), { ow: 9, core: mix(K.bloodL, '#c9485a', cong), cap: 'butt' });
      tx(g, 'venele pulmonare', 446, 272 + cong * 10, 19, K.bloodL);
      // inima stângă
      const beat = 1 + lerp(0.07, 0.012, fail) * (RED ? 0 : Math.sin(t * 5.2));
      const as = new Path2D(); as.ellipse(726, 186, 82, 54, 0, 0, 7); g.save(); g.fillStyle = mix('#e0728a', '#b54a62', cong); g.fill(as); g.restore(); strokeP(g, as, OUT, 6);
      g.save(); g.translate(752, 300); g.scale(beat, beat); const vs = new Path2D(); vs.ellipse(0, 0, 104, 58, 0, 0, 7); g.fillStyle = mix('#e5485d', '#8a5560', fail); g.fill(vs); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(vs); g.restore();
      tx(g, 'atriul stâng', 726, 186, 17, '#3a1020', { stroke: false }); tx(g, 'ventriculul stâng', 752, 300, 17, '#fff3e6', { stroke: false });
      arrowK(g, [[862, 310], [960, 310]], mix(K.blood, '#8a5560', fail), lerp(12, 6, fail), 1); tx(g, 'spre aortă', 912, 276, 17, K.dim);
      stream(g, FLOW, t, K.bloodL, { n: 10, speed: 0.15, r: 6, alpha: 1 - fail * 0.9 });
      if (fail > 0.01) stream(g, FLOW, t, '#ff9aa8', { n: 14, speed: 0.035, r: 6, alpha: fail });
      if (b.i === 0) arrowK(g, [[300, 160], [600, 160]], K.bloodL, 6, sg(t0, 0.6, 2.4));
      if (fail > 0.3) chip(g, 880, 150, 'insuficiență cardiacă', { size: 17, fill: '#2a1014', line: '#ff6b7e', col: '#ff9aa8', lw: 3, alpha: b.i === 1 ? sg(t1, 1.4, 0.6) : 1 });
      if (cong > 0.01) { arrowK(g, [[610, 160], [290, 160]], '#7fb0ff', 6, cong); extra(g, 450, 124, 'în plus: presiunea crește înapoi, spre plămân', cong, { size: 16 }); }
      if (b.i >= 2) { g.save(); g.fillStyle = 'rgba(9,5,13,.5)'; g.fillRect(0, 84, 1000, 300); g.restore(); }
      /* ---- jos: septul interalveolar, mărit ---- */
      tx(g, 'în plămân, mărit: alveolele și septurile dintre ele', 500, 396, 17, K.dim);
      const s = lerp(46, 104, fib); const band = new Path2D(); band.roundRect(50, BY0, 900, BY1 - BY0, 30);
      g.save(); g.fillStyle = mix('#e79bb0', '#d98aa6', fib); g.fill(band); g.clip(band);
      // alveolele (spații cu aer)
      [[50 + s / 2, SEP[0] - s / 2], [SEP[0] + s / 2, SEP[1] - s / 2], [SEP[1] + s / 2, 950 - s / 2]].forEach(([x0, x1]) => { g.fillStyle = '#fff4f7'; g.beginPath(); g.roundRect(x0, BY0 + s / 2, x1 - x0, BY1 - BY0 - s, 44); g.fill(); g.strokeStyle = '#c9788f'; g.lineWidth = 3; g.stroke(); });
      // fibrele de colagen din septuri (fibroza)
      if (fib > 0.02) { g.globalAlpha = fib; g.strokeStyle = '#8f2f58'; g.lineWidth = 3; for (const sx of SEP) for (let k = -2; k <= 2; k++) { if (k === 0) continue; g.beginPath(); for (let y = BY0; y <= BY1; y += 12) { const x = sx + k * s * 0.19 + Math.sin(y * 0.05 + k) * 4; if (y === BY0) g.moveTo(x, y); else g.lineTo(x, y); } g.stroke(); } g.globalAlpha = 1; }
      // capilarele din septuri
      SEP.forEach((sx, k) => { const p = new Path([[sx, BY0 - 10], [sx, BY1 + 10]], { n: 6 }); p.stroke(g, lerp(12, 28, cg), mix(K.blood, '#b3182f', cg), { ow: 5 }); stream(g, p, t * (1 - 0.7 * cg) + k * 0.5, '#7a1020', { n: Math.round(lerp(5, 11, cg)), speed: 0.1, r: lerp(4, 6.5, cg), rbc: true }); });
      g.restore(); strokeP(g, band, OUT, 6);
      // hematiile extravazate → apoi înghițite de macrofage
      RB.forEach((r, k) => { const u = sg(t2, 2.4 + k * 0.22, 1.7); if (u <= 0) return; const e = sg(t3, 0.8 + k * 0.14, 1.6); const x = lerp(lerp(r.sx, r.ex, u), r.mx, e), y = lerp(lerp(r.sy, r.ey, u), r.my, e); rbcK(g, x, y, 8.5, k, 1 - e); });
      // macrofagele alveolare → siderofage (brune)
      MAC.forEach(([x, y], k) => { const p = new Path2D(); const R = 33 + brown * 5; p.ellipse(x, y, R, R * 0.9, 0, 0, 7); g.save(); g.fillStyle = mix('#efe0cf', '#9a6a34', brown); g.fill(p); g.clip(p); if (brown > 0.02) { g.globalAlpha = brown; g.fillStyle = '#5e3a12'; for (let m = 0; m < 16; m++) { g.beginPath(); g.arc(x - R + hash(k * 20 + m) * 2 * R, y - R + hash(k * 31 + m * 3) * 2 * R, 3.6, 0, 7); g.fill(); } g.globalAlpha = 1; } g.fillStyle = '#6a4a9a'; g.beginPath(); g.ellipse(x + 8, y - 6, 11, 9, 0.4, 0, 7); g.fill(); g.restore(); strokeP(g, p, OUT, 4); });
      // etichetele din bandă
      tx(g, 'alveolă', 500, 470, 18, '#8a5a6c', { stroke: false }); tx(g, 'sept', SEP[0], 438, 15, '#5a1a30', { stroke: false, alpha: 1 - cg });
      if (b.i === 2) { chip(g, 196, 640, 'vas congestionat', { size: 17, fill: '#2a1014', line: '#ff6b7e', col: '#ff9aa8', lw: 3, alpha: sg(t2, 1.4, 0.5) }); lead(g, 262, 630, 338, 600, '#ff9aa8', sg(t2, 1.5, 0.5)); chip(g, 500, 800, 'hematii extravazate', { size: 17, fill: '#2a1014', line: '#ff6b7e', col: '#ff9aa8', lw: 3, alpha: sg(t2, 5, 0.5) }); }
      if (b.i === 3 || b.i < 0 || b.i === 4) { const a = b.i === 3 ? sg(t3, 5.6, 0.6) : 1; chip(g, 500, 700, 'siderofag (celulă cardiacă)', { size: 17, fill: '#2a1d10', line: '#d9a35a', col: '#ffd9a0', lw: 3, alpha: a }); lead(g, 500, 682, 500, 650, '#ffd9a0', a); tx(g, 'hemosiderină brună', 500, 736, 15, '#6a3f10', { stroke: false, alpha: a }); }
      if (b.i === 4 || b.i < 0) { const a = sg(t4, 3.6, 0.6); chip(g, 500, 800, 'sept îngroșat, fibrozat', { size: 17, fill: '#221528', line: K.hi, col: K.hi, lw: 3, alpha: a }); lead(g, 590, 800, 640, 790, K.hi, a); }
      if (b.i === 0 || b.i === 1) { g.save(); g.fillStyle = 'rgba(9,5,13,.5)'; g.fillRect(0, 380, 1000, 490); g.restore(); }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: 902 }); g.restore();
    },
  };
}
