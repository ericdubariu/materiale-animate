// k2.js · scenele LP 2 (farmacocinetica 2): cele 4 grafice desenate live (graphs4Live), nefronul și pH-ul urinar (nephron),
// ordinul I vs ordinul 0 (ordersLive), T½ în cazurile 6–7 (halfLife).
import { K, W, H, HOME, OUT, T, sg, ln, pop, back, lp, pulse, mix, hash, clamp, lerp, ease, RED, bgK, glowAt, hud, tx, tw, chip, cap, capSeq, Path, mol, comet, stream, arrowK, crossK, tick, panel, ring, shape, ellK, rectK, plot, trace, hline, pt, lens, bilayer, meter, dial, blob, bb } from './kino.js';
const cam = (x, y, z) => ({ x, y, z });

// enzimă mică („pac-man”): mușcă în buclă; blocked = 0..1 pune un ✕
function enz(g, x, y, r, t, o = {}) { const a = o.alpha ?? 1; if (a <= 0.01) return; const bite = o.blocked ? 0.12 : 0.2 + 0.25 * pulse(t + x, 0.6); g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(o.s ?? 1, o.s ?? 1); g.fillStyle = o.col || '#ffd36e'; g.strokeStyle = OUT; g.lineWidth = 3.5; g.lineJoin = 'round'; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, r, bite, Math.PI * 2 - bite); g.closePath(); g.fill(); g.stroke(); g.restore(); if (o.blocked) crossK(g, x, y, r * 0.8, o.blocked); }

/* ================= 1. DRUG / PRODRUG × INDUCTOR / INHIBITOR ================= */
export function graphs4Live() {
  const Q = [[30, 62], [510, 62], [30, 482], [510, 482]];
  const base = (pk) => (x) => pk * 1.36 * (Math.exp(-0.28 * x) - Math.exp(-1.4 * x));
  const cfg = [
    { t: 'drug + inductor', ind: true, pk: 0.27, col: '#ffe36e', yl: 'Cp', v: 'Cp ↓ → ineficacitate', vc: '#ffe36e', lab: 'cu inductor' },
    { t: 'drug + inhibitor', ind: false, pk: 1.04, col: '#ff8a7a', yl: 'Cp', v: 'Cp ↑ → toxicitate', vc: '#ff8a7a', lab: 'cu inhibitor' },
    { t: 'prodrug + inductor', ind: true, pk: 0.98, col: '#ffa23e', yl: 'Cp metabolit activ', v: 'metabolit activ ↑', vc: '#ffa23e', lab: 'cu inductor' },
    { t: 'prodrug + inhibitor', ind: false, pk: 0.25, col: '#8fd0ff', yl: 'Cp metabolit activ', v: 'metabolit activ ↓ → ineficacitate', vc: '#8fd0ff', lab: 'cu inhibitor' },
  ];
  const caps = [
    [[0, 'fără interacțiune: curba stă între cele două praguri'], [2.8, 'inductorul înmulțește enzimele: metabolizare mai rapidă'], [4.2, 'Cp scade sub minimul eficace']],
    [[0, 'fără interacțiune: curba stă între cele două praguri'], [2.8, 'inhibitorul blochează enzimele: metabolizare mai lentă'], [4.2, 'Cp urcă peste pragul toxic']],
    [[0, 'prodrogul e inactiv: urmărim metabolitul activ'], [2.8, 'inductorul: se formează mai mult metabolit activ'], [4.2, 'efect mai mare, până la toxicitate']],
    [[0, 'prodrogul e inactiv: urmărim metabolitul activ'], [2.8, 'inhibitorul: se formează mai puțin metabolit activ'], [4.2, 'rămâne sub minimul eficace']],
  ];
  return {
    home: HOME, beatDur: 8, camSpeed: 2.6,
    cams: Q.map(([x, y]) => cam(x + 230, y + 208, 1.9)),
    anchors: Q.map(([x, y]) => [x + 30, y + 150]),
    phase: (i) => (i < 0 ? 'cele 4 interacțiuni' : cfg[i].t),
    draw(g, t, b) {
      bgK(g, [[500, 467, 600, '#5c8dff', 0.06]]);
      Q.forEach(([qx, qy], k) => { const c = cfg[k]; const tt = T(b, k); const done = b.i < 0 || tt >= 1e4; const on = b.i === k; const a = b.i < 0 || on || b.i > k ? 1 : 0.4;
        panel(g, qx, qy, 460, 392, { alpha: a, glow: on ? 0.35 : 0, gc: c.col, line: on ? c.col : undefined, r: 26 });
        chip(g, qx + 150, qy + 36, c.t, { size: 19, fill: '#221528', line: c.col, col: c.col, lw: 3, alpha: a });
        // enzimele (dreapta sus)
        const u = done ? 1 : sg(tt, 2.8, 1); for (let m = 0; m < 3; m++) enz(g, qx + 316 + m * 40, qy + 36, 14, t, { alpha: a, blocked: c.ind ? 0 : u }); if (c.ind) for (let m = 0; m < 3; m++) enz(g, qx + 336 + m * 40, qy + 66, 14, t + 1, { alpha: a * u, s: back(u) });
        const pl = plot(g, { x: qx + 64, y: qy + 118, w: 360, h: 200, xmax: 12, ymax: 1.18, xl: 'timp', yl: c.yl, alpha: a, box: false, fs: 13 });
        hline(g, pl, 0.88, K.warn, 'prag toxic', { alpha: a, size: 13 }); hline(g, pl, 0.36, '#e9e2f2', 'minim eficace', { alpha: a, size: 13 });
        const u1 = done ? 1 : sg(tt, 0.7, 1.9), u2 = done ? 1 : sg(tt, 4.2, 2.2);
        trace(g, pl, base(0.62), 0, 12, u1, '#e9e2f2', { w: 4, alpha: a * 0.9, dash: u2 > 0.02 ? [9, 7] : null, pen: u1 < 1 });
        if (u1 >= 1) tx(g, 'fără', pl.X(5.4), pl.Y(0.36) - 30, 13, '#e9e2f2', { alpha: a * (1 - u2 * 0.4), w: 700, align: 'left' });
        trace(g, pl, base(c.pk), 0, 12, u2, c.col, { w: 6, alpha: a, fill: c.col + '2e' });
        if (u2 >= 1) chip(g, qx + 230, qy + 366, c.v, { size: 16, fill: '#160d1c', line: c.vc, col: c.vc, lw: 3, alpha: a * (done ? 1 : pop(tt, 6.3)) });
      });
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i]); g.restore();
    },
  };
}

/* ================= 2. NEFRONUL + pH-ul URINAR (capcana ionică) ================= */
export function nephron() {
  const tub = new Path([[168, 196], [250, 150], [330, 196], [380, 150], [430, 230], [430, 300], [470, 300], [470, 220], [540, 150], [620, 196], [690, 150], [760, 200], [800, 250], [800, 320]], { n: 12 });
  const capil = new Path([[60, 120], [120, 170], [200, 250], [330, 250], [420, 330], [520, 330], [560, 240], [660, 250], [740, 290], [900, 300]], { n: 10 });
  const PX = [30, 520], PY = 372, PW = 450, PH = 448;
  const caps = [[[0, 'neionizat = lipofil: trece prin perete înapoi în sânge'], [3.6, 'ionizat = hidrofil: nu trece, rămâne în tub']], [[0, 'urina alcalină: H⁺ puțin'], [1.8, 'HA cedează H⁺ și devine A⁻ (ionizat)'], [4.6, 'A⁻ nu se mai reabsoarbe']], [[0, 'urina acidă: H⁺ mult'], [1.8, 'baza primește H⁺ și devine BH⁺ (ionizat)'], [4.6, 'BH⁺ nu se mai reabsoarbe']], [[0, 'forma ionizată rămâne în urină și se elimină'], [3, 'cazul 5: bicarbonat → urină alcalină → fenobarbitalul iese']]];
  // o moleculă în panou: ionizarea io (0..1), mișcarea: neutră = coboară prin perete în sânge (buclă); ionizată = lovește peretele și ricoșează
  function molecule(g, t, px, k, io, neutralS, ionS, colN, colI, active) {
    const x0 = px + 70 + k * 100, ph = lp(t + k * 1.3, 4.2); const wy = PY + 214;
    let x = x0, y;
    if (io < 0.5) { if (active) { y = lerp(PY + 90, PY + 400, ease(clamp(ph / 0.8))); x = x0 + Math.sin(ph * 6) * 6; } else y = PY + 110 + Math.sin(t * 0.9 + k) * 22; }
    else { const d = ph < 0.4 ? ease(ph / 0.4) : 1 - 0.6 * ease((ph - 0.4) / 0.6); y = lerp(PY + 84, wy - 46, d); x = x0 + ph * 34 - 10; }
    const a = io < 0.5 && active ? Math.min(1, ph * 8, (1 - ph) * 6) : 1;
    mol(g, x, y, 20, mix(colN, colI, io), { s: io < 0.5 ? neutralS : ionS, alpha: a, glow: io > 0.5 ? 0.5 : 0.2, fs: 15 });
    if (io >= 0.5 && ph > 0.34 && ph < 0.58) crossK(g, x, wy - 16, 12, 1 - Math.abs(ph - 0.46) * 8);
    return [x, y];
  }
  return {
    home: HOME, beatDur: 8, anchors: [[PX[0] + 34, PY + 252], [PX[0] + 34, PY + 30], [PX[1] + 34, PY + 30], [930, 330]],
    phase: (i) => ['regula', 'acid slab · urină alcalină', 'bază slabă · urină acidă', 'consecința'][i] || 'excreția renală',
    draw(g, t, b) {
      const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3), intro = b.i < 0;
      bgK(g, [[250, 600, 380, '#57d0a8', 0.07], [750, 600, 380, '#ffb347', 0.07]]);
      // ---- nefronul (sus): 1 filtrare, 2 secreție, 3 reabsorbție
      capil.stroke(g, 16, K.blood, { ow: 6, alpha: 0.75 });
      tub.stroke(g, 34, '#e9c9a0', { ow: 7 }); tub.stroke(g, 16, K.urine, { ow: 0, alpha: 0.85 });
      ellK(g, 140, 196, 52, 50, '#f3d9c0', { ow: 5, shade: '#dcb893' }); new Path([[70, 150], [120, 176], [150, 170], [164, 200], [140, 222], [112, 208], [126, 190], [150, 214], [110, 236], [64, 250]], { n: 10 }).stroke(g, 10, K.blood, { ow: 5 });
      stream(g, tub, t, (u, k) => (k % 2 ? K.met : K.drug), { n: 7, speed: 0.06, r: 6.5 });
      const tag = (n, s, x, y) => { mol(g, x - tw(g, s, 15, 700) / 2 - 16, y, 11, '#3a2a12', { s: String(n), tc: K.hi, oc: K.hi, ow: 2, fs: 13 }); tx(g, s, x + 6, y, 15, K.ink, { w: 700 }); };
      tag(1, 'filtrare', 150, 104); tag(2, 'secreție', 300, 104); tag(3, 'reabsorbție', 640, 104); tx(g, 'urină', 846, 316, 15, '#ffe9a8', { w: 800 });
      arrowK(g, [[300, 244], [296, 214], [290, 190]], K.ink, 4, 1, { head: 9, alpha: 0.8 }); arrowK(g, [[640, 172], [650, 206], [660, 240]], K.ink, 4, 1, { head: 9, alpha: 0.8 });
      // legătura cu panourile: tubul distal mărit
      g.save(); g.strokeStyle = 'rgba(255,227,110,.4)'; g.lineWidth = 2; g.setLineDash([7, 7]); g.beginPath(); g.moveTo(610, 214); g.lineTo(PX[0] + 20, PY); g.moveTo(700, 190); g.lineTo(PX[1] + PW - 20, PY); g.stroke(); g.restore(); ring(g, 655, 186, 44, K.hi, 0.7, 3);
      // ---- cele două panouri
      const alk = intro ? 1 : sg(t1, 0.2, 1.4), acd = intro ? 1 : sg(t2, 0.2, 1.4);
      [0, 1].forEach((p) => { const px = PX[p]; const on = intro || b.i === 3 || (p === 0 ? b.i <= 1 : b.i === 2); const a = on ? 1 : 0.42; const tint = p === 0 ? mix('#3b3340', '#1f5a4a', alk) : mix('#3b3340', '#6b4a1a', acd);
        g.save(); g.globalAlpha = a; const clipP = new Path2D(); clipP.roundRect(px, PY, PW, PH, 26); g.save(); g.clip(clipP); g.fillStyle = tint; g.fillRect(px, PY, PW, 200); g.fillStyle = K.bloodS; g.fillRect(px, PY + 300, PW, 160); g.fillStyle = '#7a2436'; g.fillRect(px, PY + 310, PW, 140);
        stream(g, new Path([[px - 10, PY + 380], [px + PW + 10, PY + 384]], { raw: true }), t + p * 3, K.bloodL, { n: 4, speed: 0.07, r: 14, rbc: true, alpha: 0.5 });
        for (let k = 0; k < 5; k++) { rectK(g, px + 6 + k * 90, PY + 200, 82, 100, K.cell, { r: 14, shade: K.cellS, ow: 4 }); ellK(g, px + 47 + k * 90, PY + 262, 16, 14, '#8a63c9', { ow: 3 }); }
        g.restore(); g.strokeStyle = on && b.i >= 0 ? (p === 0 ? '#57d0a8' : '#ffb347') : 'rgba(255,230,200,.2)'; g.lineWidth = 3.5; g.stroke(clipP); g.restore();
        tx(g, p === 0 ? 'acid slab (HA)' : 'bază slabă (B)', px + PW / 2 + 10, PY + 30, 19, K.ink, { alpha: a }); tx(g, 'lumenul tubului', px + PW - 16, PY + 68, 14, K.dim, { alpha: a, w: 700, align: 'right' }); tx(g, 'sânge', px + PW - 16, PY + 430, 15, '#ffb3be', { alpha: a, w: 800, align: 'right' });
        const phA = p === 0 ? alk : acd; chip(g, px + 118, PY + 68, p === 0 ? 'urină alcalină · pH > pKa' : 'urină acidă · pH < pKa', { size: 14, fill: '#160d1c', line: p === 0 ? '#57d0a8' : '#ffb347', col: p === 0 ? '#8ff0d0' : '#ffd08a', alpha: a * phA, wd: 196 });
        // H⁺ liberi în urină: puțini la alcalin, mulți la acid
        const nh = p === 0 ? Math.round(lerp(5, 1, alk)) : Math.round(lerp(5, 12, acd)); for (let k = 0; k < nh; k++) mol(g, px + 30 + hash(k + p * 9) * (PW - 60) + Math.sin(t + k) * 8, PY + 90 + hash(k * 3 + p) * 90 + Math.cos(t * 0.8 + k) * 6, 9, '#ffe36e', { s: 'H⁺', fs: 9, alpha: a * 0.9, ow: 2 });
        // moleculele
        for (let k = 0; k < 4; k++) { let io, active = true; if (p === 0) { if (intro) io = 1; else if (b.i === 0) { io = k === 3 ? 1 : 0; active = k !== 2; } else io = k === 3 ? 1 : sg(t1, 1.8 + k * 0.6, 0.9); if (b.i > 1 && !intro) io = 1; } else { if (intro || b.i === 3) io = 1; else if (b.i === 2) io = sg(t2, 1.8 + k * 0.6, 0.9); else { io = 0; active = false; } }
          const [mx, my] = molecule(g, t, px, k, io, p === 0 ? 'HA' : 'B', p === 0 ? 'A⁻' : 'BH⁺', p === 0 ? K.drug : K.x, '#7fc8ff', active && a > 0.9);
          // H⁺ care pleacă (stânga) / vine (dreapta) în momentul ionizării
          if (io > 0.02 && io < 0.98) { const d = p === 0 ? io : 1 - io; mol(g, mx + 26 + d * 30, my - 20 - d * 46, 9, '#ffe36e', { s: 'H⁺', fs: 9, alpha: 1 - Math.abs(io - 0.5) * 1.6, ow: 2 }); } }
        if (p === 0 && b.i === 0) { tx(g, 'se reabsoarbe', px + 120, PY + 430, 15, K.ok, { alpha: sg(t0, 1.6, 0.5) }); }
        // săgeata de ieșire: rămâne în urină → se elimină
        const ex = intro ? 1 : p === 0 ? (b.i === 1 ? sg(t1, 4.6, 0.8) : b.i > 1 ? 1 : 0) : (b.i === 2 ? sg(t2, 4.6, 0.8) : b.i > 2 ? 1 : 0); arrowK(g, [[px + 300, PY + 134], [px + 370, PY + 130], [px + 432, PY + 132]], '#7fc8ff', 7, ex, { alpha: a }); tx(g, 'rămâne în urină', px + 356, PY + 166, 14, '#bfe6ff', { alpha: a * ex, w: 700 });
      });
      if (b.i === 3 || intro) chip(g, PX[0] + PW / 2, PY + PH - 26, 'ex.: fenobarbital (acid slab) + NaHCO₃', { size: 15, fill: '#10301e', line: K.ok, col: '#bff5d6', alpha: intro ? 1 : pop(t3, 3) });
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: 344 }); g.restore();
    },
  };
}

/* ================= 3. ORDINUL I vs ORDINUL 0 ================= */
export function ordersLive() {
  const f1 = (x) => 100 * Math.pow(0.5, x), f0 = (x) => Math.max(0, 100 - 25 * x);
  const col = [K.drug, '#6fb4ff']; const PXs = [86, 586];
  const elim = [[50, 25, 12.5, 6.25], [25, 25, 25, 25]]; const lab = [['50', '25', '12,5', '6,25'], ['25', '25', '25', '25']];
  const half = [[[0, 1, '1 h'], [1, 2, '1 h'], [2, 3, '1 h']], [[0, 2, '2 h'], [2, 3, '1 h'], [3, 3.5, '0,5 h']]];
  const caps = [[[0, 'în fiecare oră se elimină jumătate din ce a rămas'], [5.4, 'aceeași fracție (50%), cantități tot mai mici']], [[0, 'în fiecare oră se elimină aceeași cantitate: 25 mg/L'], [5.4, 'aceeași cantitate, indiferent de concentrație']], [[0, 't½: de la 100 la 50, de la 50 la 25, de la 25 la 12,5'], [3.2, 'ordinul I: mereu 1 h · ordinul 0: 2 h, 1 h, 0,5 h']]];
  return {
    home: HOME, beatDur: 8, anchors: [[60, 96], [560, 96], [60, 792]],
    phase: (i) => ['ordinul I', 'ordinul 0', 'timpul de înjumătățire'][i] || 'cinetica de eliminare',
    draw(g, t, b) {
      const intro = b.i < 0; bgK(g, [[250, 400, 420, '#ffa23e', 0.08], [750, 400, 420, '#5c8dff', 0.08]]);
      const t2 = T(b, 2);
      [0, 1].forEach((p) => { const tt = T(b, p); const done = intro || tt >= 1e4; const on = b.i === p; const a = intro || on || b.i > p ? 1 : 0.4; const px = PXs[p]; const c = col[p]; const f = p ? f0 : f1;
        tx(g, p ? 'Cinetica de ordinul 0' : 'Cinetica de ordinul I', px + 170, 96, 23, c, { alpha: a }); tx(g, 'Cp inițial = 100 mg/L', px + 170, 126, 15, K.dim, { alpha: a, w: 600 });
        const pl = plot(g, { x: px, y: 176, w: 350, h: 250, xmax: 5.2, ymax: 108, xl: 'timp (h)', yl: 'mg/L', alpha: a, xt: [[0], [1], [2], [3], [4], [5]], yt: [[25], [50], [75], [100]], grid: true });
        const u = done ? 1 : ln(tt, 0.6, 5); const xe = 5 * u; trace(g, pl, f, 0, 5, u, c, { w: 6, alpha: a, fill: c + '22' });
        // la fiecare oră: cât s-a eliminat (săgeată pe grafic + bară dedesubt)
        const by = 690; tx(g, 'eliminat în fiecare oră', px + 170, 520, 16, K.dim, { alpha: a, w: 700 });
        g.save(); g.globalAlpha = a; g.strokeStyle = 'rgba(255,243,230,.35)'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(px, by); g.lineTo(px + 350, by); g.stroke(); g.restore();
        for (let k = 0; k < 4; k++) { const q = done ? 1 : pop(tt, 0.6 + (k + 1), 0.4); if (q <= 0) continue; const x1 = pl.X(k + 1), yA = pl.Y(f(k)), yB = pl.Y(f(k + 1)); g.save(); g.globalAlpha = a * clamp(q); g.strokeStyle = '#fff3e6'; g.lineWidth = 2; g.setLineDash([5, 5]); g.beginPath(); g.moveTo(pl.X(k), yA); g.lineTo(x1, yA); g.stroke(); g.restore(); arrowK(g, [[x1, yA + 3], [x1, yB - 9]], '#fff3e6', 4, clamp(q), { alpha: a, head: 8, ow: 4 });
          tx(g, lab[p][k], x1 + 8, (yA + yB) / 2, 14, '#fff3e6', { alpha: a * clamp(q), align: 'left' });
          const h = elim[p][k] * 2.5 * clamp(q); rectK(g, px + 30 + k * 82, by - h, 58, h, c, { r: 8, ow: 4, alpha: a, shade: mix(c, '#000000', 0.25) }); tx(g, '−' + lab[p][k], px + 59 + k * 82, by - h - 16, 16, c, { alpha: a * clamp(q) }); tx(g, 'ora ' + (k + 1), px + 59 + k * 82, by + 20, 14, K.dim, { alpha: a, w: 600 }); }
        if (done || tt > 5.6) chip(g, px + 170, 742, p ? 'aceeași cantitate' : 'aceeași fracție: 50%', { size: 17, fill: '#160d1c', line: c, col: c, lw: 3, alpha: a * (done ? 1 : pop(tt, 5.6)) });
        // t½ pe axa timpului (punctul 3)
        if (t2 >= 0 || intro) half[p].forEach(([x0, x1, s], k) => { const q = intro ? 1 : pop(t2, 0.5 + k * 0.8, 0.4); if (q <= 0) return; const y = 176 + 250 + 54; const xa = pl.X(x0) + 3, xb = pl.X(x1) - 3; g.save(); g.globalAlpha = clamp(q); g.strokeStyle = OUT; g.lineWidth = 15; g.lineCap = 'round'; g.beginPath(); g.moveTo(xa + 6, y); g.lineTo(xb - 6, y); g.stroke(); g.strokeStyle = K.hi; g.lineWidth = 9; g.stroke(); g.restore(); chip(g, (xa + xb) / 2, y, s, { size: 13, fill: '#3a2a12', line: K.hi, col: K.hi, lw: 2, alpha: clamp(q) }); pt(g, pl, x1, f(x1), K.hi, { alpha: clamp(q), r: 7 }); });
        if (t2 >= 0 || intro) tx(g, p ? 't½ variabil' : 't½ constant', px + 170, 790, 20, K.hi, { alpha: intro ? 1 : sg(t2, 3.2, 0.6) });
      });
      panel(g, 150, 818, 700, 46, { alpha: intro ? 1 : sg(t2, 0.2, 0.6), line: K.hi, r: 23 }); tx(g, 't½ = timpul în care Cp scade la jumătate', 500, 842, 19, K.ink, { alpha: intro ? 1 : sg(t2, 0.2, 0.6), w: 700 });
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], { y: 898, size: 19 }); g.restore();
    },
  };
}

/* ================= 4. T½ ÎN CAZURILE 6–7 ================= */
export function halfLife() {
  const X2 = 1000; const f6 = (x) => (x < 1 ? 10 * Math.sin((x * Math.PI) / 2) : 10 * Math.pow(0.5, (x - 1) / 3));
  const D7 = [[0, 100], [1, 70], [2, 50], [5, 35], [6, 25], [9, 12.5], [12, 6.25]];
  const f7 = (x) => { let k = 0; while (k < D7.length - 2 && x > D7[k + 1][0]) k++; const [x0, y0] = D7[k], [x1, y1] = D7[k + 1]; const u = clamp((x - x0) / (x1 - x0)); return Math.exp(lerp(Math.log(y0), Math.log(y1), u)); };
  const pct = ['50%', '25%', '12,5%', '6,25%', '3,1%', '1,6%', '0,8%'];
  const caps = [[[0, 'vârf 10 ng/mL la 1 h; la 4 h a rămas jumătate: 5 ng/mL'], [4.2, 'de la 1 h la 4 h = 3 ore → T½ = 3 h']], [[0, 'la fiecare T½ rămâne jumătate din ce era'], [5, 'practic eliminat după 5–7 T½: 5 × 3 = 15 h, 7 × 3 = 21 h']], [[0, 'intervalul dintre doze: 1–2 T½'], [1.6, 'la un T½: 24 : 3 = 8 administrări pe zi'], [5.4, 'formele retard: mai puține administrări']], [[0, 'la început curba cade mai repede: distribuție și redistribuție'], [3.6, 'T½ se ia de la final: 25 → 12,5 între 6 h și 9 h'], [6.6, 'Ke = 0,23 → T½ = 0,693 : 0,23 = 3 h']]];
  return {
    home: HOME, beatDur: 9, camSpeed: 2.2, cams: [HOME, HOME, HOME, cam(X2 + 500, 467, 1)],
    anchors: [[60, 96], [60, 500], [60, 760], [X2 + 60, 96]],
    phase: (i) => ['cazul 6 · T½', 'cazul 6 · 5–7 T½', 'cazul 6 · prizele', 'cazul 7 · T½ de la final'][i] || 'timpul de înjumătățire',
    draw(g, t, b) {
      const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3), intro = b.i < 0;
      bgK(g, [[500, 300, 520, '#ffa23e', 0.08], [X2 + 500, 320, 520, '#c57bff', 0.08]]);
      // ---- ecranul 1: cazul 6
      tx(g, 'Cazul 6 · doză unică, epurare de ordinul I', 500, 96, 21, K.ink, {});
      const pl = plot(g, { x: 110, y: 150, w: 790, h: 240, xmax: 24, ymax: 11.4, xl: 'timp (h)', yl: 'ng/mL', xt: [[1], [4], [7], [10], [13], [16], [19], [22]], yt: [[5], [10]], grid: false });
      // banda 15–21 h
      const band = intro ? 1 : sg(t1, 5, 0.9); if (band > 0) { g.save(); g.globalAlpha = band * 0.3; g.fillStyle = K.hi; g.fillRect(pl.X(15), pl.Y(11), pl.X(21) - pl.X(15), pl.Y(0) - pl.Y(11)); g.restore(); tx(g, '5–7 T½', (pl.X(15) + pl.X(21)) / 2, pl.Y(7.4), 20, K.hi, { alpha: band }); tx(g, '15–21 h', (pl.X(15) + pl.X(21)) / 2, pl.Y(5.9), 18, K.ink, { alpha: band }); }
      const u = intro || b.i > 1 ? 1 : b.i === 0 ? 0.19 * ln(t0, 0.5, 3.2) : 0.19 + 0.81 * ln(t1, 0.4, 4.4);
      trace(g, pl, f6, 0, 24, u, K.drug, { w: 6, fill: 'rgba(255,162,62,.18)', n: 140 });
      const qa = intro ? 1 : pop(t0, 1.2), qb = intro ? 1 : pop(t0, 3.7); pt(g, pl, 1, 10, K.hi, { alpha: clamp(qa), label: '10', dx: 18, dy: -12, align: 'left' }); pt(g, pl, 4, 5, K.hi, { alpha: clamp(qb), label: '5', dx: 16, dy: -14, align: 'left' });
      const qc = intro ? 1 : sg(t0, 4.2, 0.8); if (qc > 0) { const y = pl.Y(0) - 26; g.save(); g.globalAlpha = qc; g.strokeStyle = OUT; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(pl.X(1) + 8, y); g.lineTo(pl.X(4) - 8, y); g.stroke(); g.strokeStyle = K.hi; g.lineWidth = 8; g.stroke(); g.restore(); tx(g, '3 h', (pl.X(1) + pl.X(4)) / 2, y - 20, 17, K.hi, { alpha: qc }); chip(g, 400, 196, 'T½ = 3 h', { size: 22, fill: '#3a2a12', line: K.hi, col: K.hi, lw: 3.5, alpha: intro ? 1 : pop(t0, 5), glow: b.i === 0 ? 0.6 : 0 }); }
      // ---- cât rămâne după fiecare T½ (punctul 2)
      const by = 640; tx(g, 'cât rămâne după fiecare T½', 500, 476, 17, K.dim, { w: 700, alpha: intro ? 1 : b.i >= 1 ? sg(t1, 0.2, 0.6) : 0.3 });
      for (let k = 0; k < 7; k++) { const q = intro || b.i > 1 ? 1 : b.i === 1 ? pop(t1, 0.5 + k * 0.6, 0.4) : 0; const h = 130 * Math.pow(0.5, k + 1) * clamp(q); const x = 150 + k * 104; const last = k >= 4; rectK(g, x, by - Math.max(h, 3), 64, Math.max(h, 3), last ? K.hi : K.drug, { r: 6, ow: 4, alpha: clamp(q) }); tx(g, pct[k], x + 32, by - Math.max(h, 3) - 16, 16, last ? K.hi : K.drug, { alpha: clamp(q) }); tx(g, (k + 1) + ' T½', x + 32, by + 20, 15, K.dim, { w: 700, alpha: 0.4 + 0.6 * clamp(q) }); }
      { const q = intro ? 1 : b.i === 1 ? sg(t1, 5, 0.8) : b.i > 1 ? 1 : 0; if (q > 0) { g.save(); g.globalAlpha = q; g.strokeStyle = K.hi; g.lineWidth = 3; g.setLineDash([8, 6]); g.beginPath(); g.roundRect(552, by - 60, 300, 96, 16); g.stroke(); g.restore(); tx(g, 'practic eliminat', 702, by - 78, 16, K.hi, { alpha: q }); } }
      // ---- prizele pe 24 h (punctul 3)
      { const a = intro ? 1 : b.i >= 2 ? 1 : 0.3; const y = 762; g.save(); g.globalAlpha = a; g.strokeStyle = OUT; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(150, y); g.lineTo(850, y); g.stroke(); g.strokeStyle = '#4a3a5c'; g.lineWidth = 9; g.stroke(); g.restore(); tx(g, '0 h', 132, y + 30, 14, K.dim, { w: 700, alpha: a }); tx(g, '24 h', 868, y + 30, 14, K.dim, { w: 700, alpha: a });
        for (let k = 0; k < 8; k++) { const q = intro || b.i > 2 ? 1 : b.i === 2 ? pop(t2, 1.6 + k * 0.4, 0.4) : 0; if (q <= 0) continue; const x = 150 + k * 87.5; g.save(); g.translate(x, y); g.scale(back(clamp(q)), back(clamp(q))); rectK(g, -18, -9, 36, 18, '#fff6ea', { r: 9, ow: 3.5 }); rectK(g, -18, -9, 18, 18, K.drug, { r: 9, ow: 3.5 }); g.restore(); tx(g, k * 3 + ' h', x, y - 26, 13, K.dim, { w: 700, alpha: clamp(q) }); }
        chip(g, 330, y + 62, '24 : 3 = 8 administrări pe zi', { size: 17, fill: '#3a2410', line: K.drug, col: K.drug, lw: 3, alpha: intro ? 1 : b.i === 2 ? pop(t2, 4.8) : b.i > 2 ? 1 : 0 });
        const rq = intro ? 1 : b.i === 2 ? pop(t2, 5.6) : b.i > 2 ? 1 : 0; if (rq > 0) { g.save(); g.translate(600, y + 62); g.scale(back(clamp(rq)), back(clamp(rq))); rectK(g, -34, -15, 68, 30, '#dff1ff', { r: 15, ow: 4 }); rectK(g, -34, -15, 34, 30, K.met, { r: 15, ow: 4 }); g.restore(); tx(g, 'retard: mai rar', 652, y + 62, 17, K.met, { alpha: clamp(rq), align: 'left' }); } }
      // ---- ecranul 2: cazul 7
      tx(g, 'Cazul 7 · doză unică, probe la 0–12 h', X2 + 500, 96, 21, K.ink, {});
      const p7 = plot(g, { x: X2 + 120, y: 150, w: 770, h: 330, xmax: 12.6, ymax: 108, xl: 'timp (h)', yl: 'µg/mL', xt: D7.map((d) => [d[0]]), yt: [[25], [50], [100]] });
      const d1 = intro ? 1 : sg(t3, 0.6, 1); if (d1 > 0) { g.save(); g.globalAlpha = d1 * 0.28; g.fillStyle = K.x; g.fillRect(p7.X(0), p7.Y(104), p7.X(2) - p7.X(0), p7.Y(0) - p7.Y(104)); g.restore(); tx(g, 'distribuție +\nredistribuție', p7.X(1) + 4, p7.Y(18), 15, '#e3c6ff', { alpha: d1, w: 700 }); }
      const d2 = intro ? 1 : sg(t3, 3.6, 0.9); if (d2 > 0) { g.save(); g.globalAlpha = d2 * 0.26; g.fillStyle = K.hi; g.fillRect(p7.X(6), p7.Y(104), p7.X(9) - p7.X(6), p7.Y(0) - p7.Y(104)); g.restore(); }
      trace(g, p7, f7, 0, 12, intro ? 1 : ln(t3, 0.3, 3), '#e9e2f2', { w: 5, n: 160 });
      D7.forEach(([x, y], k) => { const q = intro ? 1 : pop(t3, 0.3 + (x / 12) * 3, 0.35); pt(g, p7, x, y, k === 4 || k === 5 ? K.hi : K.drug, { alpha: clamp(q), label: String(y).replace('.', ','), dx: 14, dy: -16, align: 'left', size: 15 }); });
      if (d2 > 0) { const y = p7.Y(0) - 26; g.save(); g.globalAlpha = d2; g.strokeStyle = OUT; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(p7.X(6) + 8, y); g.lineTo(p7.X(9) - 8, y); g.stroke(); g.strokeStyle = K.hi; g.lineWidth = 8; g.stroke(); g.restore(); tx(g, '25 → 12,5 în 3 h', (p7.X(6) + p7.X(9)) / 2, p7.Y(86), 16, K.hi, { alpha: d2 }); }
      { const q = intro ? 1 : sg(t3, 2.2, 0.6); tx(g, '„T½ = 2 h”?', p7.X(2.4), p7.Y(92), 16, K.warn, { alpha: q, align: 'left' }); crossK(g, p7.X(2.4) + 118, p7.Y(92), 10, q); }
      const fa = (k) => (intro ? 1 : sg(t3, 5.4 + k * 1.2, 0.7));
      panel(g, X2 + 90, 580, 820, 190, { alpha: fa(0), line: K.hi }); tx(g, 'Ke = (ln c1 − ln c2) : (T2 − T1)', X2 + 500, 616, 21, K.ink, { alpha: fa(0), w: 700 }); tx(g, '= (ln 25 − ln 12,5) : (9 − 6) = (3,21 − 2,52) : 3 = 0,23', X2 + 500, 664, 22, K.ink, { alpha: fa(1) }); tx(g, 'T½ = 0,693 : Ke = 0,693 : 0,23 = 3 h', X2 + 500, 722, 26, K.hi, { alpha: fa(2) });
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i], b.i === 3 ? { y: 836 } : { y: 884 }); g.restore();
    },
  };
}
