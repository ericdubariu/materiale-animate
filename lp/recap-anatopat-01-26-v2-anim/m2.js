// m2.js · „de ce arată așa” (mecanismul leziunii, animat) pentru: pericardita fibrinoasă (15, servește și 23),
// abcesul (16, servește și 24), steatoza hepatică (14, servește și 19), rinichiul de șoc (12).
// Pasul se joacă o dată și rămâne pe cadrul final; doar sângele curge în buclă. Ce nu e în LP are eticheta albastră (extra).
import { K, W, H, HOME, OUT, T, sg, ln, pop, back, lp, pulse, mix, hash, clamp, lerp, ease, RED, bgK, hud, tx, chip, capSeq, Path, mol, stream, arrowK, panel, ring, ellK, rectK, extra } from './kino.js';

const done = (tt) => tt >= 1e4;
function xlab(g, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; chip(g, x, y, s, { size: o.size || 15, fill: '#0d0a1c', line: 'rgba(0,0,0,0)', col: 'rgba(0,0,0,0)', lw: 0, alpha: a, w: 700 }); extra(g, x, y, s, a, o); }
function gran(g, x, y, r, a = 1) { if (a <= 0.01) return; ellK(g, x, y, r, r, '#f7c6d6', { alpha: a, ow: 3 }); g.save(); g.globalAlpha = clamp(a); g.fillStyle = '#5b3fa8'; for (const [dx, dy] of [[-0.36, -0.12], [0.08, -0.36], [0.3, 0.22]]) { g.beginPath(); g.arc(x + dx * r, y + dy * r, r * 0.34, 0, 7); g.fill(); } g.restore(); }
function lymph(g, x, y, r, a = 1) { if (a <= 0.01) return; ellK(g, x, y, r, r, '#cdb6ee', { alpha: a, ow: 3 }); g.save(); g.globalAlpha = clamp(a); g.fillStyle = '#3a2580'; g.beginPath(); g.arc(x, y, r * 0.7, 0, 7); g.fill(); g.restore(); }
function histio(g, x, y, r, a = 1) { if (a <= 0.01) return; ellK(g, x, y, r * 1.3, r, '#f3d2c0', { alpha: a, ow: 3 }); g.save(); g.globalAlpha = clamp(a); g.fillStyle = '#6b4aa8'; g.beginPath(); g.ellipse(x - r * 0.25, y, r * 0.55, r * 0.38, 0.5, 0, 7); g.fill(); g.restore(); }
function line(g, pts, col, w, a = 1, oc = OUT, ow = 4) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round'; g.lineJoin = 'round'; const d = () => { g.beginPath(); pts.forEach((p, k) => (k ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.stroke(); }; if (ow) { g.strokeStyle = oc; g.lineWidth = w + ow; d(); } g.strokeStyle = col; g.lineWidth = w; d(); g.restore(); }

/* ================= 1. PERICARDITA FIBRINOASĂ (lama 15; servește și piesa 23) ================= */
let LI = -1; // punctul curent (pentru badge-urile care apar abia la punctul lor)
export function pericardFib() {
  const X0 = 60, X1 = 940, YM = 650, YB = 800;
  const CAPS = [190, 400, 610, 820];
  const INF = [[120, 612, 'g'], [282, 590, 'l'], [318, 622, 'h'], [486, 612, 'g'], [520, 580, 'l'], [700, 618, 'h'], [726, 584, 'g'], [900, 608, 'l'], [96, 570, 'h'], [912, 566, 'g']];
  const N = 27; const ST = Array.from({ length: N }, (_, k) => ({ x: 82 + k * 32.4 + (hash(k) - 0.5) * 12, h1: 42 + hash(k + 9) * 40, h2: 96 + hash(k + 20) * 66, lean: (hash(k + 3) - 0.5) * 26 }));
  const caps = [
    [[0, 'capilarele de sub seroasă se umplu cu sânge (congestie)'], [3.2, 'apare infiltratul inflamator: granulocite, limfocite, histiocite']],
    [[0, 'plasma iese din capilarele congestionate'], [3.4, 'seroasa se ulcerează: exsudatul ajunge pe suprafață']],
    [[0, 'pe suprafață rămâne fibrina'], [3, 'rețea de filamente grosolane, roșu-roz, cu celule în ochiuri']],
    [[0, 'în plus: la fiecare bătaie, foițele se ating și se desprind'], [3.6, 'în plus: fibrina moale e trasă în creste'], [6.4, 'aspect vilos, păros: „limbă de pisică”']],
  ];
  return {
    home: HOME, beatDur: 8, anchors: [[560, 566], [505, 470], () => (LI < 0 || LI >= 2 ? [112, 410] : [-999, -999]), () => (LI < 0 || LI >= 3 ? [880, 214] : [-999, -999])],
    phase: (i) => ['seroasa normală', 'congestie + infiltrat', 'plasma extravazează', 'fibrina în rețea', '„limbă de pisică”'][i + 1] || '',
    draw(g, t, b) { LI = b.i;
      bgK(g, [[500, 300, 560, '#ee6f8e', 0.06]]);
      const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3);
      const u0 = done(t0) ? 1 : sg(t0, 0.4, 2.6), uInf = (k) => (done(t0) ? 1 : pop(t0, 3.2 + k * 0.28));
      const u1 = done(t1) ? 1 : sg(t1, 1.6, 4.6), uUl = done(t1) ? 1 : sg(t1, 3.2, 1.6);
      const u2 = done(t2) ? 1 : sg(t2, 0.5, 4.2), uL = done(t2) ? 1 : sg(t2, 3, 2.4);
      const v = done(t3) ? 1 : sg(t3, 1.2, 5.6);
      const ys = lerp(512, 480, u0); // suprafața seroasei (țesutul subepicardic se îngroașă)
      // foița parietală: 3 atingeri, apoi rămâne sus
      let py = 150; if (t3 >= 0 && !done(t3) && !RED) { const ph = clamp((t3 - 0.5) / 6.3); py = 150 + (ys - 150 - 96) * Math.pow(Math.sin(ph * Math.PI * 3), 2) * (ph < 1 ? 1 : 0); }
      // miocardul
      rectK(g, X0, YM, X1 - X0, YB - YM, '#d9607a', { r: 6, ow: 5, shade: '#b8415f' });
      g.save(); g.beginPath(); g.rect(X0, YM, X1 - X0, YB - YM); g.clip(); g.strokeStyle = '#a8324f'; g.lineWidth = 3;
      for (let r = 0; r < 5; r++) { g.beginPath(); for (let x = X0; x <= X1; x += 20) { const y = YM + 22 + r * 30 + Math.sin(x * 0.03 + r) * 6; x === X0 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); }
      g.fillStyle = '#4b2a86'; for (let k = 0; k < 16; k++) { g.beginPath(); g.ellipse(X0 + 40 + k * 55 + (k % 2) * 16, YM + 36 + (k % 4) * 30, 13, 5, 0, 0, 7); g.fill(); } g.restore();
      tx(g, 'miocard: structura păstrată', 500, YB + 26, 19, K.ink);
      // țesutul subepicardic
      rectK(g, X0, ys, X1 - X0, YM - ys, '#f6dcc0', { r: 4, ow: 5, shade: '#e8c39c' });
      for (let k = 0; k < 9; k++) ellK(g, 100 + k * 100 + (k % 2) * 26, (ys + YM) / 2 - 22 + (k % 3) * 8, 20, 18, '#fff1c9', { ow: 2.5, alpha: 0.9 });
      tx(g, 'țesut subepicardic', 148, YM - 16, 16, '#5a3a2a', { stroke: false, w: 700 });
      CAPS.forEach((x, k) => { const r = lerp(15, 27, u0), y = (ys + YM) / 2 + 24; ellK(g, x, y, r + 5, r + 5, '#f2b8b8', { ow: 4 }); ellK(g, x, y, r, r, mix('#e89aa6', '#c8162f', u0), { ow: 3 });
        const n = Math.round(lerp(2, 6, u0)); for (let j = 0; j < n; j++) { const an = j * (6.283 / n) + (RED ? 0 : t * 0.9) + k; mol(g, x + Math.cos(an) * r * 0.5, y + Math.sin(an) * r * 0.5, lerp(4, 6, u0), '#ff6f7f', { ow: 1.5 }); } });
      INF.forEach(([x, y, tp], k) => { const a = uInf(k); (tp === 'g' ? gran : tp === 'l' ? lymph : histio)(g, x, Math.max(y, ys + 22), 12 * Math.min(1, a), a); });
      if (u0 > 0.5 && b.i === 0) tx(g, 'capilar congestionat', 400, (ys + YM) / 2 + 74, 16, '#7a1228', { stroke: false, w: 800, alpha: u0 });
      // plasma care iese (o dată), apoi stratul de exsudat
      if (t1 >= 0 && !done(t1)) CAPS.forEach((x, k) => { for (let j = 0; j < 5; j++) { const uu = ln(t1, 0.5 + j * 0.75 + k * 0.17, 1.7); if (uu <= 0 || uu >= 1) continue; const y0 = (ys + YM) / 2, y1 = ys - 16; mol(g, x + (j - 2) * 13 * ease(uu), lerp(y0, y1, ease(uu)), 9, '#ffe9a8', { ow: 2, alpha: Math.min(1, uu * 5, (1 - uu) * 5) }); } });
      if (b.i === 1) CAPS.slice(0, 2).forEach((x) => arrowK(g, [[x, (ys + YM) / 2 - 8], [x, ys - 40]], '#ffe9a8', 5, sg(t1, 0.6, 1.2), { ow: 4, alpha: 0.9 }));
      rectK(g, X0 + 4, ys - 24 * u1, X1 - X0 - 8, Math.max(0.5, 24 * u1), '#ffe9a8', { r: 6, ow: 0, alpha: 0.9 * u1 * (1 - u2) });
      // mezoteliul seroasei: se ulcerează (celule lipsă)
      for (let k = 0; k < 20; k++) { const gone = k % 3 === 1 ? uUl : 0; ellK(g, X0 + 22 + k * 44, ys, 21, 8, '#f2b8c6', { ow: 3, alpha: 1 - gone }); }
      tx(g, uUl > 0.5 ? 'seroasă ulcerată' : 'seroasa (epicardul)', 830, ys + 26, 16, '#5a3a2a', { stroke: false, w: 800 });
      // fibrina: rețea, apoi creste
      if (u2 > 0.01) {
        ST.forEach((s, k) => { const h = lerp(s.h1 * u2, s.h2, v); const sway = RED || b.i !== 3 || done(t3) ? 0 : Math.sin(t * 5 + k) * 3 * (1 - v);
          line(g, [[s.x, ys - 4], [s.x + s.lean * 0.3 * v, ys - h * 0.5], [s.x + s.lean * v + sway, ys - h]], '#ee6f8e', lerp(6, 7.5, v), 1, '#8a2444', 4); });
        for (let k = 0; k < N - 1; k++) { const a = ST[k], c = ST[k + 1]; const ya = ys - a.h1 * (0.3 + 0.5 * hash(k + 40)) , yc = ys - c.h1 * (0.3 + 0.5 * hash(k + 41)); line(g, [[a.x, ya], [c.x, yc]], '#f08aa2', 4, uL * (1 - 0.55 * v), '#8a2444', 3); }
        [[150, 0], [372, 1], [566, 0], [760, 1], [890, 0]].forEach(([x, tp], k) => { const a = done(t2) ? 1 : pop(t2, 4.6 + k * 0.3); (tp ? histio : gran)(g, x, ys - 20, 9.5 * Math.min(1, a), a); });
      }
      // cavitatea + foița parietală
      rectK(g, X0, py - 40, X1 - X0, 40, '#e9b8a8', { r: 10, ow: 5, shade: '#cf9684' });
      tx(g, 'foița parietală a pericardului', 500, py - 19, 18, '#3a1d22', { stroke: false, w: 800 });
      if (b.i < 3) tx(g, 'cavitatea pericardică', 180, 250, 17, K.dim, { w: 700 });
      if (b.i === 2) chip(g, 640, ys - 150, 'fibrină: rețea roșu-roz', { size: 18, fill: '#2a1018', line: '#ee6f8e', col: '#ffc2d0', lw: 3, alpha: uL });
      if (b.i === 3 || b.i > 3) { const a = done(t3) ? 1 : pop(t3, 6.4); chip(g, 420, 250, 'pe piesă: suprafață mată, rugoasă, „limbă de pisică”', { size: 18, fill: '#2a1018', line: K.hi, col: K.hi, lw: 3, alpha: a }); xlab(g, 420, 296, 'în plus: foițele se freacă la fiecare bătaie', done(t3) ? 1 : sg(t3, 6.8, 0.6)); }
      if (b.i === 1) xlab(g, 690, ys - 70, 'în plus: fibrinogenul din plasmă devine fibrină', sg(t1, 4.4, 0.8));
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i]); g.restore();
    },
  };
}

/* ================= 2. ABCESUL (lama 16; servește și piesa 24) ================= */
export function abcesForm() {
  const C = [585, 470], R = 168; const CS = 64;
  const cells = []; for (let r = 0; r < 11; r++) for (let c = 0; c < 12; c++) { const x = 226 + c * CS + (r % 2) * (CS / 2), y = 150 + r * CS; if (x < 215 || x > 930 || y > 800) continue; cells.push([x, y, Math.hypot(x - C[0], y - C[1])]); }
  const COL = [[-34, -22], [28, -40], [44, 26], [-18, 40], [-58, 26]].map(([dx, dy]) => [C[0] + dx, C[1] + dy]);
  const GR = Array.from({ length: 16 }, (_, k) => { const an = k * 2.4, rr = 46 + hash(k + 2) * 96; const y0 = 190 + k * 37; return new Path([[118, y0], [176, y0 + 6], [lerp(176, C[0] + Math.cos(an) * rr, 0.5), lerp(y0, C[1] + Math.sin(an) * rr, 0.5) + (hash(k) - 0.5) * 50], [C[0] + Math.cos(an) * rr, C[1] + Math.sin(an) * rr]], { n: 10 }); });
  const vessel = new Path([[108, 120], [108, 840]], { n: 4 });
  const caps = [
    [[0, 'bacteriile ajung în ficat și se înmulțesc'], [3, 'pe lamă: grămezi intens bazofile = colonii de microbi']],
    [[0, 'granulocitele trec prin peretele vasului: leucodiapedeză'], [3.6, 'se adună în număr mare în jurul coloniilor']],
    [[0, 'hepatocitele din focar se necrozează'], [2.6, 'în locul țesutului hepatic rămâne puroi'], [5.2, 'cavitate cu conținut vâscos, galben-verzui']],
    [[0, 'în jur proliferează țesut conjunctiv'], [3.4, 'abcesul cronic: membrană piogenă']],
  ];
  return {
    home: HOME, beatDur: 8, anchors: [[C[0] - 112, C[1] - 16], [178, 300], [C[0] + 96, C[1] + 60], [C[0] + R + 12, C[1] - 96]],
    phase: (i) => ['ficat normal', 'bacteriile', 'leucodiapedeza', 'puroiul', 'membrana piogenă'][i + 1] || '',
    draw(g, t, b) {
      bgK(g, [[C[0], C[1], 520, '#c9d86a', 0.05]]);
      const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3);
      const uN = done(t2) ? 1 : sg(t2, 0.4, 3.2), uP = done(t2) ? 1 : sg(t2, 2.4, 3.6), uM = done(t3) ? 1 : sg(t3, 0.5, 4.5);
      // parenchimul hepatic
      cells.forEach(([x, y, d], k) => { const dead = d < R - 8 ? uN : 0; const a = 1 - dead * clamp(1.25 - d / (R * 1.4)) * 1.0; const col = mix('#f2a9c0', '#c9b6b0', dead);
        if (dead < 0.98 || d > R * 0.5) { rectK(g, x - CS / 2 + 3, y - CS / 2 + 3, CS - 6, CS - 6, col, { r: 14, ow: 3, alpha: d < R - 8 ? 1 - dead : 1, shade: mix(col, '#000000', 0.12) }); ellK(g, x + (hash(k) - 0.5) * 10, y + (hash(k + 5) - 0.5) * 10, 9, 9, mix('#5b3fa8', '#8f86a0', dead), { ow: 0, alpha: d < R - 8 ? 1 - dead : 1 }); } });
      // puroiul
      if (uP > 0.01) { ellK(g, C[0], C[1], R * (0.35 + 0.65 * uP), R * (0.35 + 0.65 * uP), '#c9d86a', { ow: 4, alpha: 0.92 * uP, shade: '#a9b84a' }); for (let k = 0; k < 12; k++) { const an = k * 1.9, rr = 30 + hash(k + 70) * (R - 60); mol(g, C[0] + Math.cos(an) * rr, C[1] + Math.sin(an) * rr, 7, '#f4f0a0', { alpha: uP * 0.9, ow: 1.5 }); } }
      // membrana piogenă
      if (uM > 0.01) { g.save(); g.lineCap = 'round'; for (const [c, w] of [[OUT, 30], ['#c58a9a', 22]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.arc(C[0], C[1], R + 16, -1.57, -1.57 + 6.283 * uM); g.stroke(); }
        g.strokeStyle = '#7b4a63'; g.lineWidth = 3.5; const nf = Math.floor(34 * uM); for (let k = 0; k < nf; k++) { const an = -1.57 + (k / 34) * 6.283; g.beginPath(); g.arc(C[0], C[1], R + 16 + (k % 2 ? 4 : -4), an, an + 0.12); g.stroke(); } g.restore(); }
      // coloniile de microbi
      COL.forEach(([x, y], k) => { const a = done(t0) ? 1 : pop(t0, 0.6 + k * 0.45); if (a <= 0.01) return; for (let j = 0; j < 7; j++) mol(g, x + Math.cos(j * 0.9) * 10 * (j ? 1 : 0), y + Math.sin(j * 0.9) * 10 * (j ? 1 : 0), 7.5 * Math.min(1, a), '#3c2a8f', { alpha: a, ow: 2 }); });
      // vasul (sângele curge în buclă, de sus în jos)
      vessel.stroke(g, 64, '#f2b8b8', { ow: 8, cap: 'butt' }); vessel.stroke(g, 46, '#7a1228', { ow: 0, cap: 'butt' }); stream(g, vessel, t, K.blood, { n: 9, speed: 0.12, r: 8, rbc: true });
      tx(g, 'vas de sânge', 108, 866, 16, K.ink);
      // granulocitele: ies din vas și merg spre colonii
      GR.forEach((p, k) => { const uu = done(t1) ? 1 : ln(t1, 0.5 + k * 0.33, 2.6); if (uu <= 0) { if (k % 4 === 0) { const y = (150 + k * 40 + (RED ? 0 : t * 40)) % 700 + 130; gran(g, 108, y, 11, 1); } return; } const [x, y] = p.at(ease(uu)); gran(g, x, y, 12, 1); });
      if (b.i === 1) { arrowK(g, [[150, 270], [215, 270]], K.hi, 5, sg(t1, 0.3, 0.8), { ow: 4 }); chip(g, 330, 118, 'leucodiapedeză: granulocitele ies din vas', { size: 18, fill: '#2a1d10', line: K.hi, col: K.hi, lw: 3, alpha: sg(t1, 0.3, 0.6) }); }
      if (b.i === 0) chip(g, C[0], C[1] - 96, 'colonii de microbi (intens bazofile)', { size: 18, fill: '#16103a', line: '#9c8cff', col: '#d6ceff', lw: 3, alpha: done(t0) ? 1 : sg(t0, 2.6, 0.6) });
      if (b.i === 2) { chip(g, C[0], C[1] - R - 34, 'puroi: galben-verzui, vâscos', { size: 18, fill: '#232a0c', line: '#c9d86a', col: '#eef5b0', lw: 3, alpha: sg(t2, 4.4, 0.6) }); xlab(g, C[0], C[1] + R + 40, 'în plus: enzimele granulocitelor lichefiază țesutul necrozat', sg(t2, 3, 0.8)); }
      if (b.i >= 3) { chip(g, C[0], C[1] - R - 62, 'membrană piogenă (țesut conjunctiv)', { size: 18, fill: '#2a1420', line: '#e3a6b8', col: '#ffd3df', lw: 3, alpha: done(t3) ? 1 : sg(t3, 3.4, 0.6) }); chip(g, 800, 800, 'în jur: structura lobulară păstrată', { size: 16, fill: '#221528', line: 'rgba(255,255,255,.4)', col: K.ink, lw: 2.5, alpha: done(t3) ? 1 : sg(t3, 4.6, 0.6) }); }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i]); g.restore();
    },
  };
}

/* ================= 3. STEATOZA HEPATICĂ (lama 14; servește și piesa 19) ================= */
export function steatoCell() {
  const HC = [290, 440], HR = 200; const VC = [312, 452];
  const hex = (cx, cy, r, rot = 0) => { const p = new Path2D(); for (let k = 0; k < 6; k++) { const an = rot + k * 1.0472; k ? p.lineTo(cx + Math.cos(an) * r, cy + Math.sin(an) * r) : p.moveTo(cx + Math.cos(an) * r, cy + Math.sin(an) * r); } p.closePath(); return p; };
  const MV = Array.from({ length: 15 }, (_, k) => { const an = k * 2.399 + 0.4, rr = 78 + hash(k + 11) * 78; return [HC[0] + Math.cos(an) * rr, HC[1] + Math.sin(an) * rr * 0.92, 11 + hash(k + 30) * 9]; });
  const LC = [760, 290], LR = 150; const LV = []; for (let k = 0; k < 34; k++) { const an = k * 2.399, rr = 34 + hash(k + 90) * 96; LV.push([LC[0] + Math.cos(an) * rr, LC[1] + Math.sin(an) * rr, rr]); }
  const liver = (g, cx, cy, e) => { const s = lerp(0.86, 1.06, e); const P = [[-162, -8], [-124, -70], [-20, -86], [92, -62], [168, -30], [150, 2], [40, 46], [-90, 74], [-152, 52]].map(([x, y]) => [cx + x * s, cy + y * s]); const rad = [34, 44, 60, 44, lerp(8, 16, e), lerp(4, 16, e), lerp(6, 34, e), lerp(6, 40, e), lerp(8, 30, e)];
    const p = new Path2D(); const n = P.length; const m = (a, c) => [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2]; const st = m(P[n - 1], P[0]); p.moveTo(st[0], st[1]); for (let k = 0; k < n; k++) { const nx = P[(k + 1) % n]; const mm = m(P[k], nx); p.arcTo(P[k][0], P[k][1], mm[0], mm[1], rad[k]); p.lineTo(mm[0], mm[1]); } p.closePath();
    const col = mix('#8e3a2c', '#dcb35a', e); g.save(); g.fillStyle = col; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 6; g.lineJoin = 'round'; g.stroke(p); g.strokeStyle = 'rgba(255,255,255,.28)'; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx - 70 * s, cy - 50 * s); g.lineTo(cx + 50 * s, cy - 52 * s); g.stroke(); g.strokeStyle = mix('#6b2a20', '#b08a3a', e); g.lineWidth = 4; g.beginPath(); g.moveTo(cx + 8 * s, cy - 70 * s); g.lineTo(cx + 2 * s, cy + 40 * s); g.stroke(); g.restore(); return { s }; };
  const caps = [
    [[0, 'în citoplasmă apar picături mici de grăsime'], [3.4, 'în HE se văd ca vacuole optic goale, bine conturate']],
    [[0, 'microvacuolele se apropie și se unesc'], [3.6, 'rezultă o macrovacuolă']],
    [[0, 'vacuola voluminoasă crește'], [2.4, 'nucleul e împins la periferie și turtit']],
    [[0, 'hepatocitele se încarcă, dar lobulul rămâne întreg'], [3.4, 'spațiile porte și vena centrolobulară sunt la locul lor']],
    [[0, 'tot ficatul se încarcă cu grăsime'], [2.6, 'mărit, gălbui, cu marginea anterioară rotunjită']],
  ];
  return {
    home: HOME, beatDur: 8, anchors: [[HC[0] + 150, HC[1] - 150], [VC[0] + 96, VC[1] + 120], [HC[0] - 190, HC[1] - 96], [LC[0] - LR + 8, LC[1] - 100], [600, 640]],
    phase: (i) => ['hepatocit normal', 'microvacuole', 'macrovacuola', 'nucleul la periferie', 'lobulul', 'ficatul întreg'][i + 1] || '',
    draw(g, t, b) {
      bgK(g, [[300, 440, 480, '#ffe9a8', 0.05]]);
      const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3), t4 = T(b, 4);
      const u1 = done(t1) ? 1 : sg(t1, 0.5, 4.4), u2 = done(t2) ? 1 : sg(t2, 0.4, 4), e = done(t4) ? 1 : sg(t4, 0.5, 4.5);
      // hepatocitul mare
      const hp = hex(HC[0], HC[1], HR, 0.2); g.save(); g.fillStyle = '#f2a9c0'; g.fill(hp); g.strokeStyle = OUT; g.lineWidth = 7; g.lineJoin = 'round'; g.stroke(hp); g.strokeStyle = 'rgba(255,255,255,.3)'; g.lineWidth = 4; g.stroke(hex(HC[0], HC[1], HR - 12, 0.2)); g.restore();
      tx(g, 'un hepatocit, mărit', HC[0], HC[1] + HR + 34, 19, K.ink);
      // macrovacuola
      const br = lerp(0, 92, u1) + 44 * u2; if (br > 1) ellK(g, VC[0], VC[1], br, br, '#fff9fb', { ow: 5 });
      // microvacuolele: apar, apoi se strâng în macrovacuolă
      MV.forEach(([x, y, r], k) => { const a = done(t0) ? 1 : pop(t0, 0.5 + k * 0.2); if (a <= 0.01) return; const uu = done(t1) ? 1 : sg(t1, 0.4 + (k % 5) * 0.5, 2.4); if (uu >= 0.999) return; ellK(g, lerp(x, VC[0], uu), lerp(y, VC[1], uu), r * Math.min(1, a) * (1 - 0.3 * uu), r * Math.min(1, a) * (1 - 0.3 * uu), '#fff9fb', { ow: 3.5, alpha: 1 - uu * uu }); });
      // nucleul: din centru spre periferie, turtit
      const nx = lerp(HC[0] - 20, HC[0] - 140, ease(u1 * 0.25 + u2 * 0.75)), ny = lerp(HC[1] - 12, HC[1] - 92, ease(u1 * 0.25 + u2 * 0.75));
      ellK(g, nx, ny, lerp(42, 50, u2), lerp(42, 17, u2), '#5b3fa8', { ow: 5, rot: -0.95 * u2 * 1, shade: '#3a2580' }); ellK(g, nx + 8 * (1 - u2), ny - 6 * (1 - u2), 9 * (1 - 0.5 * u2), 9 * (1 - 0.6 * u2), '#2a1a66', { ow: 0, rot: -0.95 * u2 });
      if (b.i === 0) chip(g, HC[0], 190, 'vacuole optic goale (HE)', { size: 18, fill: '#221528', line: '#fff9fb', col: '#fff9fb', lw: 3, alpha: done(t0) ? 1 : sg(t0, 3.4, 0.6) });
      if (b.i === 1) chip(g, HC[0], 190, 'microvacuole → macrovacuolă', { size: 18, fill: '#221528', line: '#fff9fb', col: '#fff9fb', lw: 3, alpha: sg(t1, 3.4, 0.6) });
      if (b.i >= 2) { const a = done(t2) ? 1 : sg(t2, 2.6, 0.6); chip(g, HC[0], 190, 'nucleul: împins la periferie', { size: 18, fill: '#1c1240', line: '#b9a6ff', col: '#ddd3ff', lw: 3, alpha: a }); arrowK(g, [[HC[0] - 60, 210], [nx - 6, ny - 30]], '#b9a6ff', 4, a, { ow: 3, head: 10 }); }
      if (b.i === 0) xlab(g, HC[0], HC[1] + HR + 74, 'în plus: grăsimea e scoasă la prelucrarea lamei', sg(t0, 4.4, 0.8));
      // lobulul (dreapta sus)
      const aL = b.i < 0 || b.i >= 3 ? 1 : 0.4; g.save(); g.globalAlpha = aL; const lp2 = hex(LC[0], LC[1], LR, 0.5236); g.fillStyle = '#f2a9c0'; g.fill(lp2); g.strokeStyle = OUT; g.lineWidth = 6; g.lineJoin = 'round'; g.stroke(lp2);
      g.strokeStyle = '#d97fa0'; g.lineWidth = 3; for (let k = 0; k < 18; k++) { const an = k * 0.349; g.beginPath(); g.moveTo(LC[0] + Math.cos(an) * 26, LC[1] + Math.sin(an) * 26); g.lineTo(LC[0] + Math.cos(an) * (LR - 16), LC[1] + Math.sin(an) * (LR - 16)); g.stroke(); } g.restore();
      LV.forEach(([x, y, rr], k) => { const a = done(t3) ? 1 : pop(t3, 0.5 + (1 - rr / 130) * 2.6 + (k % 4) * 0.12); if (a > 0.01) ellK(g, x, y, 7.5 * Math.min(1, a), 7.5 * Math.min(1, a), '#fff9fb', { ow: 2.5, alpha: a * aL }); });
      ellK(g, LC[0], LC[1], 20, 20, '#8f2a3c', { ow: 5, alpha: aL }); for (let k = 0; k < 6; k++) { const an = 0.5236 + k * 1.0472, x = LC[0] + Math.cos(an) * (LR - 6), y = LC[1] + Math.sin(an) * (LR - 6); ellK(g, x, y, 13, 13, '#f6dcc0', { ow: 3, alpha: aL }); mol(g, x - 4, y - 2, 4, '#c8162f', { ow: 1, alpha: aL }); mol(g, x + 4, y - 2, 4, '#4b6fd6', { ow: 1, alpha: aL }); mol(g, x, y + 5, 3.5, '#5fbf6a', { ow: 1, alpha: aL }); }
      tx(g, 'lobulul hepatic', LC[0], LC[1] - LR - 4, 18, K.ink, { alpha: aL });
      if (b.i >= 3) { const a = done(t3) ? 1 : sg(t3, 3.4, 0.6); tx(g, 'centru: venă centrolobulară · colțuri: spații porte', LC[0], LC[1] + LR + 16, 15, '#ffe9c9', { alpha: a, w: 700 }); chip(g, LC[0], LC[1] + LR + 52, 'structura lobulară păstrată', { size: 17, fill: '#221528', line: K.hi, col: K.hi, lw: 3, alpha: a }); }
      // ficatul întreg (dreapta jos)
      const aF = b.i < 0 || b.i >= 4 ? 1 : 0.4; g.save(); g.globalAlpha = aF; const { s } = liver(g, 770, 690, e); g.restore();
      tx(g, e > 0.5 ? 'ficatul cu steatoză (piesa 19)' : 'ficatul', 770, 600 - 20 * e, 18, K.ink, { alpha: aF });
      if (b.i >= 4) { const a = done(t4) ? 1 : sg(t4, 3, 0.7); chip(g, 640, 800, 'mărit', { size: 17, fill: '#221528', line: K.hi, col: K.hi, lw: 3, alpha: a }); chip(g, 762, 800, 'gălbui', { size: 17, fill: '#2a2410', line: '#dcb35a', col: '#ffe29a', lw: 3, alpha: a }); chip(g, 900, 800, 'margine rotunjită', { size: 17, fill: '#221528', line: K.hi, col: K.hi, lw: 3, alpha: a }); }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i]); g.restore();
    },
  };
}

/* ================= 4. RINICHIUL DE ȘOC (piesa 12) ================= */
export function shockKidney() {
  const C = [350, 478], RX = 212, RY = 300; const S = [C[0] - 62, C[1]];
  const E = (deg, f = 1) => { const a = (deg * Math.PI) / 180; return [C[0] + Math.cos(a) * RX * f, C[1] + Math.sin(a) * RY * f]; };
  const mixP = (a, c, u) => [lerp(a[0], c[0], u), lerp(a[1], c[1], u)];
  const PY = [-112, -67, -22, 22, 67, 112], MID = [-90, -45, 0, 45, 90]; const JF = 0.7;
  const art = new Path([[40, 430], [150, 440], [S[0] - 20, S[1] - 6]], { n: 10 });
  const cort = MID.map((d) => new Path([S, mixP(S, E(d, JF), 0.6), E(d, JF), E(d, 0.93)], { n: 10 }));
  const med = []; MID.forEach((d, k) => { for (const sgn of [-1, 1]) { const pd = d + sgn * 22.5; med.push(new Path([S, mixP(S, E(d, JF), 0.6), E(d, JF - 0.02), E(d + sgn * 12, JF - 0.05), mixP(S, E(pd, JF), 0.72), mixP(S, E(pd, JF), 0.5)], { n: 10 })); } });
  const kidney = (g, cx, cy, s, cc, mc, o = {}) => {
    g.save(); g.translate(cx, cy); g.scale(s, s); g.translate(-C[0], -C[1]);
    ellK(g, C[0], C[1], RX, RY, cc, { ow: 6 / Math.max(0.5, s) });
    { const n = new Path2D(); const a = E(166, 1.04), c = E(194, 1.04); n.moveTo(a[0] - 14, a[1]); n.lineTo(S[0] - 30, S[1] - 46); n.lineTo(S[0] - 30, S[1] + 46); n.lineTo(c[0] - 14, c[1]); n.closePath(); g.fillStyle = '#150c1d'; g.fill(n); g.strokeStyle = OUT; g.lineWidth = 6 / Math.max(0.5, s); g.lineJoin = 'round'; g.beginPath(); g.moveTo(a[0] - 2, a[1] + 2); g.lineTo(S[0] - 30, S[1] - 46); g.moveTo(c[0] - 2, c[1] - 2); g.lineTo(S[0] - 30, S[1] + 46); g.stroke(); }
    PY.forEach((d) => { const p = new Path2D(); const a = E(d - 19, JF), c = E(d + 19, JF), ap = mixP(S, E(d, JF), 0.3); p.moveTo(a[0], a[1]); p.quadraticCurveTo(E(d, JF + 0.04)[0], E(d, JF + 0.04)[1], c[0], c[1]); p.lineTo(ap[0], ap[1]); p.closePath(); g.fillStyle = mc; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 3.5 / Math.max(0.5, s); g.lineJoin = 'round'; g.stroke(p); });
    ellK(g, S[0] - 8, S[1], 58, 96, '#f1dfb8', { ow: 4 / Math.max(0.5, s) });
    if (o.wedge) { // infarctul: pană cu baza spre capsulă, vârful spre hil; lizereu roșu
      const p = new Path2D(); const a = E(-58, 0.985), c = E(-22, 0.985), ap = E(-40, 0.5); p.moveTo(ap[0], ap[1]); p.lineTo(a[0], a[1]); p.quadraticCurveTo(E(-40, 1.0)[0], E(-40, 1.0)[1], c[0], c[1]); p.closePath(); g.fillStyle = '#f3ead8'; g.fill(p); g.strokeStyle = '#c8162f'; g.lineWidth = 12; g.lineJoin = 'round'; g.stroke(p); g.fillStyle = '#f3ead8'; g.fill(p);
      g.fillStyle = '#3a1020'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(ap[0] - 8, ap[1] + 10, 13, 0, 7); g.fill(); g.stroke(); }
    g.restore();
  };
  const caps = [
    [[0, 'în șoc, la rinichi ajunge prea puțin sânge oxigenat'], [3.6, 'necesarul de oxigen nu mai e acoperit']],
    [[0, 'sângele ocolește corticala'], [3, 'corticala rămâne palidă']],
    [[0, 'sângele se adună în medulară'], [3, 'medulara e hiperemică; limita dintre ele e netă']],
    [[0, 'șocul: toată corticala palidă, leziune reversibilă'], [3.6, 'infarctul: o singură zonă, cu lizereu, prin obstrucția unei ramuri arteriale']],
  ];
  return {
    home: HOME, beatDur: 8, anchors: [[96, 400], E(-45, 0.86), mixP(S, E(22, JF), 0.72), () => (LI < 0 || LI >= 3 ? [640, 560] : [-999, -999])],
    phase: (i) => ['rinichi normal', 'șocul', 'corticala palidă', 'medulara hiperemică', 'șoc vs. infarct'][i + 1] || '',
    draw(g, t, b) { LI = b.i;
      bgK(g, [[C[0], C[1], 560, '#e5485d', 0.05]]);
      const t0 = T(b, 0), t1 = T(b, 1), t2 = T(b, 2), t3 = T(b, 3);
      const u0 = done(t0) ? 1 : sg(t0, 0.6, 3.4), u1 = done(t1) ? 1 : sg(t1, 0.5, 3.6), u2 = done(t2) ? 1 : sg(t2, 0.5, 3.6), u3 = done(t3) ? 1 : sg(t3, 0.4, 1.2);
      kidney(g, C[0], C[1], 1, mix('#dc8f86', '#efe2d2', u1), mix('#c97880', '#9c1128', u2));
      // limita cortico-medulară
      if (u2 > 0.02) { g.save(); g.globalAlpha = u2 * (0.6 + 0.4 * pulse(t, 1.6)); g.strokeStyle = K.hi; g.lineWidth = 4; g.setLineDash([12, 9]); g.beginPath(); g.ellipse(C[0], C[1], RX * (JF + 0.035), RY * (JF + 0.035), 0, (-128 * Math.PI) / 180, (128 * Math.PI) / 180); g.stroke(); g.restore(); }
      // artera renală + curgerile
      art.stroke(g, 26, K.blood, { ow: 8, core: K.bloodL }); stream(g, art, t, '#ffd0d6', { n: Math.round(lerp(8, 3, u0)), speed: lerp(0.3, 0.16, u0), r: 6 });
      tx(g, 'a. renală', 96, 474, 17, K.ink);
      cort.forEach((p) => stream(g, p, t, K.blood, { n: 5, speed: 0.24, r: 6, alpha: (1 - u1) * lerp(1, 0.75, u0), u0: 0.1 }));
      med.forEach((p) => stream(g, p, t, '#ff8fa0', { n: 4, speed: 0.2, r: 5.5, alpha: u2, u0: 0.1 }));
      tx(g, 'pelvis', S[0] - 6, S[1] + 56, 16, '#5a3a2a', { stroke: false, w: 800 });
      // etichete (dreapta)
      if (b.i === 0) xlab(g, 760, 200, 'în plus: debitul de sânge scade', sg(t0, 1.6, 0.8));
      const aC = done(t1) ? 1 : sg(t1, 3, 0.6), aM = done(t2) ? 1 : sg(t2, 3, 0.6);
      if (aC > 0.01) { chip(g, 770, 250, 'corticala: palidă', { size: 19, fill: '#2a241c', line: '#efe2d2', col: '#fff4e2', lw: 3, alpha: aC }); line(g, [[672, 250], E(-30, 0.9)], '#efe2d2', 3, aC, OUT, 3); }
      if (aM > 0.01) { chip(g, 780, 320, 'medulara: hiperemică', { size: 19, fill: '#2a0c12', line: '#ff6f7f', col: '#ffc2c8', lw: 3, alpha: aM }); line(g, [[662, 320], mixP(S, E(-5, JF), 0.86)], '#ff6f7f', 3, aM, OUT, 3); chip(g, 760, 390, 'limită netă', { size: 19, fill: '#2a1d10', line: K.hi, col: K.hi, lw: 3, alpha: aM }); line(g, [[690, 390], E(14, JF + 0.035)], K.hi, 3, aM, OUT, 3); }
      if (b.i === 1) xlab(g, 780, 180, 'în plus: arteriolele corticalei se strâng', sg(t1, 1.2, 0.8));
      // comparația cu infarctul
      if (u3 > 0.01) { panel(g, 596, 470, 384, 370, { alpha: u3, r: 24 });
        g.save(); g.globalAlpha = u3; kidney(g, 692, 610, 0.34, '#efe2d2', '#9c1128'); kidney(g, 884, 610, 0.34, '#dc8f86', '#c97880', { wedge: true }); g.restore();
        tx(g, 'rinichi de șoc', 692, 500, 17, K.hi, { alpha: u3 }); tx(g, 'infarct renal', 884, 500, 17, '#ffc2c8', { alpha: u3 });
        tx(g, 'toată corticala palidă\nreversibil', 692, 762, 16, K.ink, { alpha: u3, w: 700 }); tx(g, 'o zonă cu lizereu,\nprin obstrucție arterială', 884, 762, 16, K.ink, { alpha: u3, w: 700 });
        xlab(g, 788, 818, 'în plus: forma de pană, cu baza spre capsulă', done(t3) ? 1 : sg(t3, 4, 0.8), { size: 15 }); }
      hud(g); if (b.i >= 0) capSeq(g, T(b, b.i), caps[b.i]); g.restore();
    },
  };
}
