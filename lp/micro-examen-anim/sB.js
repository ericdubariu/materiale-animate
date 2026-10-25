// Partea B: LP 3 (medii de cultură, harta mediilor, indicatorii de pH, hemoliza, definiții, medii speciale, incubarea, culturile celulare,
// izolatul viral, oul embrionat) + LP 4 (caractere de cultură, ansa + epuizarea, pantă / înțepare / bulion, TSI, metabolismul proteic, enzime + identificarea).
// Regula de corectitudine: înaintea fiecărei scene e scris ce TREBUIE să se vadă (de unde pleacă, încotro, unde se oprește, ce culoare, ordinea etapelor);
// desenul urmează exact comentariul.
import {
  HOME, M, bg, panel, P, loopT, txt, pill, curve, at, sub, tube, flow, dot, ell, arr, ring, lead,
  plate, colony, coccus, bacillus, loop, OUT, clamp, lerp, ease, REDUCED,
} from './mk.js';

/* ---------------------------------------------------------------- utilitare */
const hx = (c) => { const s = c.replace('#', ''); return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16)); };
const mix = (a, b, u) => { const A = hx(a), B = hx(b), v = clamp(u); return '#' + A.map((x, i) => Math.round(lerp(x, B[i], v)).toString(16).padStart(2, '0')).join(''); };
const rng = (s) => { let x = (s % 2147483646) + 1; return () => ((x = (x * 16807) % 2147483647) - 1) / 2147483646; };
const TT = (t) => (REDUCED ? 0 : t);
// panou activ: pe un punct = punctul + progresul lui; pe intro = trece pe rând prin toate
function cyc(b, t, n, per = 4.6, f = 0.7) {
  if (b.i >= 0) return { k: b.i, u: ease(clamp(b.bt / (b.bd * f))) };
  if (REDUCED) return { k: 0, u: 1 };
  return { k: Math.floor(t / per) % n, u: ease(clamp((t % per) / (per * 0.72))) };
}
function tubeP(x, y, w, h) { const p = new Path2D(); p.moveTo(x - w / 2, y); p.lineTo(x - w / 2, y + h - w / 2); p.arc(x, y + h - w / 2, w / 2, Math.PI, 0, true); p.lineTo(x + w / 2, y); return p; }
// eprubetă: x = centrul, y = gura, inner(g) desenează conținutul (decupat în sticlă)
function vial(g, x, y, w, h, inner, o = {}) {
  const body = tubeP(x, y, w, h);
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  g.save(); g.clip(body); if (inner) inner(g); g.restore();
  g.fillStyle = 'rgba(220,245,255,.10)'; g.fill(body);
  g.strokeStyle = OUT; g.lineWidth = o.ow || 6; g.lineJoin = 'round'; g.stroke(body);
  g.strokeStyle = 'rgba(255,255,255,.4)'; g.lineWidth = Math.max(2, w * 0.07); g.beginPath(); g.moveTo(x - w * 0.24, y + 10); g.lineTo(x - w * 0.24, y + h - w * 0.75); g.stroke();
  if (o.cap !== false) { g.fillStyle = o.cap || '#c9c2b5'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(x - w / 2 - 5, y - 18, w + 10, 22, 6); g.fill(); g.stroke(); }
  g.restore();
}
const fillFrom = (g, x, w, y0, col, y1 = 3000) => { g.fillStyle = col; g.fillRect(x - w / 2 - 3, y0, w + 6, y1 - y0); };
// pantă: suprafața urcă spre stânga (yL sus) și coboară spre dreapta (yR); sub ea, mediul
function slantFill(g, x, w, yL, yR, col) { g.fillStyle = col; g.beginPath(); g.moveTo(x - w / 2 - 3, yL); g.lineTo(x + w / 2 + 3, yR); g.lineTo(x + w / 2 + 3, 3000); g.lineTo(x - w / 2 - 3, 3000); g.closePath(); g.fill(); }
function plateIn(g, x, y, r, fill, inner, o = {}) {
  plate(g, x, y, r, fill, o);
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); const c = new Path2D(); c.arc(x, y, r - 2, 0, 7); g.clip(c); if (inner) inner(g); g.restore();
}
function halo(g, x, y, r, col, a = 1) {
  if (r <= 1 || a <= 0.01) return;
  g.save(); g.globalAlpha *= clamp(a); const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, col); gr.addColorStop(0.72, col); gr.addColorStop(1, col + '00');
  g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.restore();
}
function xMark(g, x, y, s, a = 1, col = '#fff3e6') { if (a <= 0.01) return; g.save(); g.globalAlpha *= clamp(a); g.lineCap = 'round'; for (const [w, c] of [[s * 0.55, OUT], [s * 0.3, col]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(x - s, y - s); g.lineTo(x + s, y + s); g.moveTo(x + s, y - s); g.lineTo(x - s, y + s); g.stroke(); } g.restore(); }
function rbcD(g, x, y, r, col = '#d8303f', a = 1) { if (a <= 0.01 || r < 1) return; ell(g, x, y, r, r, col, { ow: 2, alpha: a }); ell(g, x, y, r * 0.45, r * 0.45, mix(col, '#ffffff', 0.25), { ow: 0, alpha: a * 0.8 }); }
const hl = (g, b, k, x, y, rx, ry) => { if (b.i === k) ring(g, x, y, rx, ry, ease(b.bt * 1.4)); };

/* ================================================================ 1 · CE E UN MEDIU */
export function b_classify() {
  /* CE TREBUIE SĂ SE VADĂ
     Sus: bulionul (lichid galben-brun, eprubeta din stânga) + agarul (pulbere albă, dreapta) curg SPRE placă → placa trece din goală în
     galben-pai = geloza simplă; apar colonii crem = germeni nepretențioși. Agarul doar solidifică.
     Jos: 4 medii, fiecare = baza de sus + ceva adăugat; săgețile pleacă DE LA geloza simplă SPRE ele:
     complex: picături de sânge cad în placă → placa devine roșie, apar colonii mici cu halou clar (hemoliză);
     special: Sabouraud (crem) cu o colonie pufoasă de mucegai (LJ și Chocolat numite dedesubt);
     diferențial: geloza lactozată ALBASTRĂ; colonia lactozo+ face acid → halou GALBEN care se lărgește; colonia lactozo− rămâne pe albastru;
     selectiv-diferențial: MacConkey (roz-mov); cocii Gram + (violet) dispar (×, opriți de sărurile biliare), bacilii Gram − (roz) cresc:
     lactozo+ colonii roz, lactozo− incolore. */
  const T = [500, 240], RT = 100;
  const B = [[130, 690], [375, 690], [625, 690], [870, 690]], RB = 84;
  const ADD = ['+ sânge, ser', 'pentru un germen', '+ zahăr + indicator', '+ inhibitor'];
  const NAME = ['complex\ngeloză-sânge', 'special\nSabouraud · LJ · Chocolat', 'diferențial\ngeloză lactozată', 'selectiv-diferențial\nMacConkey'];
  const SEEDS = [[-40, -30, 'c'], [30, -40, 'r'], [-10, 8, 'c'], [42, 12, 'r'], [-36, 38, 'r'], [18, 46, 'c'], [0, -58, 'c'], [-54, 2, 'r']];
  return {
    home: HOME,
    anchors: [[T[0] + 112, T[1] - 108], ...B.map(([x, y]) => [x + 66, y - 96])],
    phase: (i) => ['de bază', 'complex', 'special', 'diferențial', 'selectiv-diferențial'][i] || 'baza + ce adaugi',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5); const tt = TT(t);
      const A = (k) => (b.i < 0 || b.i === k ? 1 : 0.45);
      const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3), p4 = p(4);
      // ---- 0 · geloza simplă = bulion + agar
      vial(g, 190, 120, 58, 170, (c) => fillFrom(c, 190, 58, 175, '#d9a441'), { alpha: A(0) });
      txt(g, 'bulion', 190, 330, 19, '#ffe2a8', { alpha: A(0) });
      ell(g, 820, 165, 52, 22, '#f4f1ea', { ow: 4, alpha: A(0) });
      txt(g, 'agar · doar solidifică', 820, 214, 18, '#f4f1ea', { alpha: A(0) });
      if (p0 > 0.02 && p0 < 0.98) { flow(g, curve([[215, 112], [320, 92], [425, 190]]), tt, '#d9a441', 6, 0.6, 7); flow(g, curve([[790, 150], [690, 112], [585, 190]]), tt, '#f4f1ea', 6, 0.6, 6); }
      plateIn(g, T[0], T[1], RT, mix('#2b2230', M.agar, clamp(p0 * 1.6)), (c) => {
        const u = clamp((p0 - 0.6) / 0.4); if (u > 0) [[-40, -20], [30, -36], [12, 30], [-22, 42]].forEach(([dx, dy]) => colony(c, T[0] + dx, T[1] + dy, 11 * u, '#f6efe0', { ow: 2 }));
      }, { alpha: A(0) });
      txt(g, 'geloză simplă', 640, 290, 20, M.cream, { align: 'left', alpha: A(0) });
      txt(g, 'germeni nepretențioși', 640, 318, 16, '#d8d0c4', { align: 'left', alpha: A(0) * clamp(p0 * 2 - 1) });
      hl(g, b, 0, T[0], T[1], RT + 22, RT + 22);
      // săgețile: DE LA geloza simplă SPRE fiecare mediu compus
      B.forEach(([x], k) => arr(g, lerp(T[0], x, 0.22), T[1] + RT + 24, lerp(T[0], x, 0.86), 516, '#fff3e6', 4, 0.6 * A(k + 1)));
      B.forEach(([x], k) => { pill(g, x, 553, 204, 38, '#fff3e6', ADD[k], { size: 16, alpha: A(k + 1) }); txt(g, NAME[k], x, 832, 17, M.cream, { alpha: A(k + 1) }); });
      // ---- 1 · complex: sângele cade în placă → roșu; colonii mici cu halou clar
      const [x1, y1] = B[0];
      plateIn(g, x1, y1, RB, mix(M.agar, M.blood, clamp(p1 * 1.5)), (c) => {
        const u = clamp((p1 - 0.6) / 0.4); if (u > 0) [[-28, -20], [26, -8], [-4, 30]].forEach(([dx, dy]) => { halo(c, x1 + dx, y1 + dy, 26 * u, '#f2c79a', 0.85); colony(c, x1 + dx, y1 + dy, 7 * u, '#ece6da', { ow: 2 }); });
      }, { alpha: A(1) });
      if (p1 > 0.02 && p1 < 0.85) for (let j = 0; j < 3; j++) { const u = loopT(tt + j * 0.33, 1); dot(g, x1 - 20 + j * 20, lerp(582, y1 - 20, u), 8, M.blood, { alpha: Math.sin(u * Math.PI) }); }
      // ---- 2 · special: Sabouraud + colonie pufoasă de mucegai
      const [x2, y2] = B[1];
      plateIn(g, x2, y2, RB, M.sab, (c) => {
        if (p2 <= 0) return;
        c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 3;
        for (let j = 0; j < 24; j++) { const a = j / 24 * 6.283; const L = 12 + 46 * p2 * (0.7 + 0.3 * Math.sin(j * 3.1)); c.beginPath(); c.moveTo(x2, y2); c.lineTo(x2 + Math.cos(a) * L, y2 + Math.sin(a) * L); c.stroke(); }
        colony(c, x2, y2, 8 + 16 * p2, '#f7f5ef', { ow: 2 });
      }, { alpha: A(2) });
      // ---- 3 · diferențial: acidul colonei lactozo+ virează bromtimolul în GALBEN, doar în jurul ei
      const [x3, y3] = B[2];
      plateIn(g, x3, y3, RB, M.lactB, (c) => {
        halo(c, x3 - 26, y3 - 14, 46 * p3, M.yellow, 0.95);
        if (p3 > 0) { colony(c, x3 - 26, y3 - 14, 4 + 9 * p3, '#f4d64a', { ow: 2 }); colony(c, x3 + 32, y3 + 28, 4 + 9 * p3, '#eef0f0', { ow: 2 }); }
      }, { alpha: A(3) });
      if (p3 > 0.6) { txt(g, 'L+', x3 - 26, y3 - 70, 15, M.yellow, { alpha: A(3) }); txt(g, 'L−', x3 + 32, y3 + 64, 15, '#cfe0ff', { alpha: A(3) }); }
      // ---- 4 · selectiv-diferențial: inhibitorul oprește cocii Gram +, bacilii Gram − cresc și diferă după lactoză
      const [x4, y4] = B[3];
      plateIn(g, x4, y4, RB, M.mac, (c) => {
        SEEDS.forEach(([dx, dy, k], j) => {
          const X = x4 + dx, Y = y4 + dy;
          if (k === 'c') { if (p4 < 1) coccus(c, X, Y, 6, M.gram, 1 - p4); xMark(c, X, Y, 7, clamp(p4 * 2 - 1) * 0.9); }
          else { const u = clamp((p4 - 0.3) / 0.7); if (u < 0.3) bacillus(c, X, Y, 16, 7, j, M.gramN, 1 - u / 0.3); if (u > 0.15) colony(c, X, Y, 10 * u, j % 2 ? '#e0305f' : '#f3e2cf', { ow: 2 }); }
        });
      }, { alpha: A(4) });
      for (let k = 1; k <= 4; k++) hl(g, b, k, B[k - 1][0], B[k - 1][1], RB + 20, RB + 20);
    },
  };
}

/* ================================================================ 2 · TABLA DE LA LP: HARTA MEDIILOR */
export function b_map() {
  /* CE TREBUIE SĂ SE VADĂ (tabla redesenată): stânga = zahărul (face mediul diferențial), dreapta = inhibitorul (face mediul selectiv),
     mijloc = mediul cu culoarea lui reală. Săgețile pleacă DE LA zahăr / inhibitor SPRE mediu. Fiecare mediu pornește la culoarea de bază
     și virează în rezultat: Chapman roșu → galben (manitol+); MacConkey roz-mov → colonii roz (lactozo+); geloza lactozată albastră → galben;
     TSI roșu → pantă roșie + coloană galbenă (K/A); NEGRU = H₂S în TSI (coloana), SS (centrul coloniei incolore), SIM (+ inel roșu indol);
     la ABE negrul vine din esculină (bilă = inhibitorul); Simmons verde → albastru; uree galben-pai → roz; geloza-sânge: halou β clar. */
  const IX = 425, LX = 470;
  const R = { chap: 120, mac: 210, glact: 295, tsi: 395, ss: 490, sim: 585, abe: 680 };
  const SUG = [['Manitol', 120], ['Lactoză', 250], ['Glucoză', 380], ['Zaharoză', 450]];
  const NEG = [880, 610];
  const ARR = [
    { a: [196, 120], b: [380, R.chap], k: 0 }, { a: [196, 250], b: [380, R.mac], k: 1 }, { a: [196, 250], b: [380, R.glact], k: 1 },
    { a: [196, 255], b: [400, R.tsi - 10], k: 2 }, { a: [196, 380], b: [400, R.tsi], k: 2 }, { a: [196, 450], b: [400, R.tsi + 10], k: 2 },
    { a: [790, 120], b: [716, R.chap], k: 0, inh: 1 }, { a: [790, 296], b: [640, R.mac + 6], k: 1, inh: 1 }, { a: [840, 322], b: [752, R.ss - 10], k: 3, inh: 1 },
    { a: [672, R.tsi], b: [808, NEG[1] - 16], k: 3, blk: 1 }, { a: [752, R.ss], b: [808, NEG[1] - 6], k: 3, blk: 1 },
    { a: [650, R.sim], b: [808, NEG[1] + 4], k: 3, blk: 1 }, { a: [688, R.abe], b: [808, NEG[1] + 14], k: 3, blk: 1 },
  ];
  const RED = '#d42c3c';
  return {
    home: HOME,
    anchors: [[IX - 62, R.chap - 30], [IX - 62, R.mac - 30], [IX - 40, R.tsi - 60], [NEG[0], NEG[1] - 52], [470, 728]],
    phase: (i) => ['manitol + sare', 'lactoză + săruri biliare', '3 zaharuri', 'negru = H₂S', 'fără zahăr'][i] || 'zahăr → culoare · inhibitor → selecție',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5); const tt = TT(t);
      const A = (...ks) => (b.i < 0 || ks.includes(b.i) ? 1 : 0.38);
      txt(g, 'ZAHĂRUL (diferențial)', 40, 72, 16, '#9ff0dd', { align: 'left' });
      txt(g, 'INHIBITORUL (selectiv)', 960, 72, 16, '#ff9a9a', { align: 'right' });
      // săgețile
      ARR.forEach((e) => {
        const a = A(e.k); g.save(); g.globalAlpha = a * (e.blk ? 0.8 : 0.7); g.strokeStyle = e.inh ? '#ff9a9a' : e.blk ? '#cfc6d6' : '#9ff0dd'; g.lineWidth = 3; g.beginPath(); g.moveTo(...e.a); g.lineTo(...e.b); g.stroke();
        const an = Math.atan2(e.b[1] - e.a[1], e.b[0] - e.a[0]); g.fillStyle = g.strokeStyle; g.beginPath(); g.moveTo(e.b[0], e.b[1]); g.lineTo(e.b[0] - 14 * Math.cos(an - 0.45), e.b[1] - 14 * Math.sin(an - 0.45)); g.lineTo(e.b[0] - 14 * Math.cos(an + 0.45), e.b[1] - 14 * Math.sin(an + 0.45)); g.closePath(); g.fill(); g.restore();
        if (b.i === e.k) flow(g, curve([e.a, e.b]), tt, e.inh ? '#ff9a9a' : e.blk ? '#1a1416' : '#9ff0dd', 4, 0.5, 5);
      });
      SUG.forEach(([n, y], k) => pill(g, 110, y, 170, 40, '#cfeee6', n, { size: 18, alpha: A([0, 1, 2, 2][k], k === 1 ? 2 : -9) }));
      pill(g, 880, 120, 180, 40, '#f6c9c9', 'Sare NaCl 7,5%', { size: 17, alpha: A(0) });
      pill(g, 880, 300, 180, 40, '#f6c9c9', 'Săruri biliare', { size: 17, alpha: A(1, 3) });
      pill(g, NEG[0], NEG[1], 140, 46, M.black, '', { alpha: A(3) }); txt(g, 'NEGRU', NEG[0], NEG[1], 20, '#ffffff', { stroke: false, alpha: A(3) });
      txt(g, 'H₂S (la ABE: esculina)', NEG[0], NEG[1] + 44, 15, '#cfc6d6', { alpha: A(3) });
      // ---- mediile (culoarea de bază → rezultatul)
      const u0 = p(0), u1 = p(1), u2 = p(2), u3 = p(3), u4 = p(4);
      plateIn(g, IX, R.chap, 32, mix(M.chapR, M.yellow, u0 * 0.7), (c) => { [[-12, -8], [10, 4], [-4, 14]].forEach(([dx, dy]) => { halo(c, IX + dx, R.chap + dy, 16 * u0, M.yellow); if (u0 > 0.05) colony(c, IX + dx, R.chap + dy, 4 * u0, '#f0c23a', { ow: 1.5 }); }); }, { alpha: A(0) });
      txt(g, 'MSA / Chapman → galben', LX, R.chap, 18, M.cream, { align: 'left', alpha: A(0) });
      plateIn(g, IX, R.mac, 32, M.mac, (c) => { [[-12, -6], [12, 2], [0, 14]].forEach(([dx, dy]) => { if (u1 > 0.05) colony(c, IX + dx, R.mac + dy, 5 * u1, '#e0305f', { ow: 1.5 }); }); }, { alpha: A(1) });
      txt(g, 'MacConkey → roz', LX, R.mac, 18, M.cream, { align: 'left', alpha: A(1) });
      plateIn(g, IX, R.glact, 32, M.lactB, (c) => { [[-10, -6], [10, 8]].forEach(([dx, dy]) => { halo(c, IX + dx, R.glact + dy, 16 * u1, M.yellow); if (u1 > 0.05) colony(c, IX + dx, R.glact + dy, 4 * u1, '#f4d64a', { ow: 1.5 }); }); }, { alpha: A(1) });
      txt(g, 'Geloză lactozată → galben', LX, R.glact, 18, M.cream, { align: 'left', alpha: A(1) });
      vial(g, IX, R.tsi - 38, 28, 76, (c) => { slantFill(c, IX, 28, R.tsi - 30, R.tsi - 12, RED); fillFrom(c, IX, 28, R.tsi - 12, mix(RED, M.yellow, u2)); if (u3 > 0) fillFrom(c, IX, 28, R.tsi + 40 - 32 * u3, M.black); }, { alpha: A(2, 3) });
      txt(g, 'TSI → galben / roșu', LX, R.tsi, 18, M.cream, { align: 'left', alpha: A(2, 3) });
      plateIn(g, IX, R.ss, 32, M.ss, (c) => { [[-12, -6], [12, 2], [0, 14]].forEach(([dx, dy]) => { if (u3 > 0.05) colony(c, IX + dx, R.ss + dy, 5.5 * u3, '#f6efe2', { ow: 1.5, center: u3 > 0.5 ? M.black : null }); }); }, { alpha: A(3) });
      txt(g, 'SS → incolor / centru negru', LX, R.ss, 18, M.cream, { align: 'left', alpha: A(3) });
      vial(g, IX, R.sim - 38, 28, 76, (c) => { fillFrom(c, IX, 28, R.sim - 26, '#e8cf8f'); if (u3 > 0) { c.fillStyle = M.black; c.beginPath(); c.ellipse(IX, R.sim + 14, 4 + 9 * u3, 30 * u3, 0, 0, 7); c.fill(); fillFrom(c, IX, 28, R.sim - 29, '#e0303a', R.sim - 29 + 7 * u3); } }, { alpha: A(3) });
      txt(g, 'SIM → negru, indol', LX, R.sim, 18, M.cream, { align: 'left', alpha: A(3) });
      vial(g, IX, R.abe - 38, 28, 76, (c) => { slantFill(c, IX, 28, R.abe - 30, R.abe - 12, mix('#c8a86a', M.black, u3 * 0.92)); }, { alpha: A(3) });
      txt(g, 'ABE → bilă + esculină', LX, R.abe, 18, M.cream, { align: 'left', alpha: A(3) });
      // ---- fără zahăr: Simmons, uree, sânge
      vial(g, 470, 762, 30, 76, (c) => { slantFill(c, 470, 30, 772, 790, mix(M.simG, M.simB, u4)); }, { alpha: A(4) });
      vial(g, 670, 762, 30, 76, (c) => { slantFill(c, 670, 30, 772, 790, mix(M.ureaY, M.urPink, u4)); }, { alpha: A(4) });
      plateIn(g, 870, 800, 32, M.blood, (c) => { halo(c, 870, 800, 20 * u4, '#f2c79a', 0.9); if (u4 > 0.05) colony(c, 870, 800, 4 * u4, '#ece6da', { ow: 1.5 }); }, { alpha: A(4) });
      txt(g, 'Simmons: citrat → C\n→ albastru', 470, 878, 15, M.cream, { alpha: A(4) });
      txt(g, 'uree → amoniac (+ CO₂)\n→ roz', 670, 878, 15, M.cream, { alpha: A(4) });
      txt(g, 'sânge: α parțială\nβ completă', 870, 878, 15, M.cream, { alpha: A(4) });
      hl(g, b, 0, IX, R.chap, 52, 52); hl(g, b, 1, IX, (R.mac + R.glact) / 2, 56, 100); hl(g, b, 2, IX, R.tsi, 40, 64); hl(g, b, 3, NEG[0], NEG[1], 100, 50); hl(g, b, 4, 670, 800, 260, 70);
    },
  };
}

/* ================================================================ 3 · MOTORUL MEDIILOR DIFERENȚIALE: INDICATORII DE pH */
export function b_ph() {
  /* CE TREBUIE SĂ SE VADĂ
     Placa (stânga sus): colonia din centru fermentează zahărul → acizii (puncte) pleacă DIN colonie SPRE exterior → indicatorul virează
     DOAR în jurul coloniei (haloul crește din colonie, nu din margine):
       1 bromtimol: mediul albastru (geloza lactozată) → halou GALBEN;  2 roșu fenol: Chapman roșu → halou GALBEN;
       3 roșu neutru: MacConkey → colonia și haloul ROȘU-ROZ (invers: roșu la acid).
     Benzile de jos: fiecare indicator de la ACID (stânga) la ALCALIN (dreapta), cu culorile reale; cursorul indicatorului activ
     merge spre ACID la punctele 1–3 și spre ALCALIN la punctul 4.
     4 alcalinizarea: Simmons verde → ALBASTRU și uree galben-pai → ROZ; culoarea nouă pornește de la pantă (unde crește germenul)
     și coboară; NH₃ / produșii alcalini urcă din pantă. */
  const PL = [300, 290], RP = 185;
  const STR = [
    { y: 650, n: 'albastru de bromtimol', c: ['#f2d23a', '#59b25a', '#2f62d6'], ex: 'geloză lactozată, Simmons' },
    { y: 750, n: 'roșu fenol', c: ['#f2d23a', '#f08a3a', '#e2365f'], ex: 'Chapman, TSI, uree' },
    { y: 850, n: 'roșu neutru', c: ['#d61f55', '#ef7b45', '#efc04a'], ex: 'MacConkey, SS' },
  ];
  const X0 = 430, X1 = 940;
  const BASE = [M.lactB, M.chapR, M.mac], ACID = ['#f2d23a', '#f2d23a', '#d61f55'], COL = ['#f4d64a', '#f0c23a', '#d81b5a'];
  return {
    home: HOME,
    anchors: [[405, 620], [405, 720], [405, 820], [800, 92]],
    phase: (i) => ['bromtimol', 'roșu fenol', 'roșu neutru', 'alcalinizarea'][i] || 'acid ← | → alcalin',
    draw(g, t, b) {
      bg(g); const tt = TT(t); const { k, u } = cyc(b, t, 4);
      const kp = Math.min(k, 2);
      // ---- placa
      const aP = k === 3 ? 0.35 : 1, hr = 30 + 120 * (k === 3 ? 1 : u);
      plateIn(g, PL[0], PL[1], RP, BASE[kp], (c) => {
        halo(c, PL[0], PL[1], hr, kp === 2 ? mix(M.mac, ACID[2], 0.8) : ACID[kp], 0.95);
        if (k < 3) for (let j = 0; j < 16; j++) { const v = loopT(tt * 0.5 + j * 0.137, 1); const an = j * 2.4; const rr = 34 + v * (hr - 34); dot(c, PL[0] + Math.cos(an) * rr, PL[1] + Math.sin(an) * rr, 5, ACID[kp], { alpha: Math.sin(v * Math.PI) * 0.9, ow: 1.5 }); }
        colony(c, PL[0], PL[1], 30, mix('#f3ece0', COL[kp], 0.3 + 0.7 * u), { ow: 4 });
      }, { alpha: aP });
      txt(g, ['geloză lactozată: lactozo+ → galben', 'Chapman: manitol+ → galben', 'MacConkey: lactozo+ → colonii roz'][kp], PL[0], PL[1] + RP + 36, 18, M.cream, { alpha: aP });
      txt(g, 'acid', PL[0] + 70, PL[1] - 70, 17, '#fff3e6', { alpha: aP * (k < 3 ? u : 0) });
      // ---- benzile indicatorilor: ACID (stânga) → ALCALIN (dreapta)
      txt(g, 'ACID', X0, 600, 16, '#ffd98a', { align: 'left' }); txt(g, 'ALCALIN', X1, 600, 16, '#9fc2ff', { align: 'right' });
      STR.forEach((s, r) => {
        const act = b.i < 0 ? k === r || (k === 3 && r < 2) : b.i === r || (b.i === 3 && r < 2);
        const a = b.i < 0 || act ? 1 : 0.42;
        g.save(); g.globalAlpha = a; const gr = g.createLinearGradient(X0, 0, X1, 0); gr.addColorStop(0, s.c[0]); gr.addColorStop(0.5, s.c[1]); gr.addColorStop(1, s.c[2]);
        g.fillStyle = gr; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(X0, s.y - 16, X1 - X0, 32, 14); g.fill(); g.stroke(); g.restore();
        txt(g, s.n, X0, s.y - 32, 18, M.cream, { align: 'left', alpha: a }); txt(g, s.ex, X1, s.y - 32, 14, '#cfc6d6', { align: 'right', alpha: a });
        let pos = 0.55; if (act) pos = (k === 3 ? lerp(0.55, 0.95, u) : lerp(0.55, 0.05, u));
        const mx = lerp(X0 + 12, X1 - 12, pos);
        g.save(); g.globalAlpha = a; g.fillStyle = '#ffffff'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(mx, s.y + 18); g.lineTo(mx - 11, s.y + 36); g.lineTo(mx + 11, s.y + 36); g.closePath(); g.fill(); g.stroke(); g.restore();
        dot(g, mx, s.y, 12, 'rgba(255,255,255,0)', { ow: 4, alpha: a });
      });
      // ---- alcalinizarea: Simmons (citrat) și ureea (NH₃)
      const ua = k === 3 ? u : 0, aT = k === 3 || b.i < 0 ? 1 : 0.4;
      [[720, M.simG, M.simB, 'Simmons\ncitrat → alcalin'], [880, M.ureaY, M.urPink, 'uree\nureaza → NH₃']].forEach(([x, c0, c1, lab]) => {
        vial(g, x, 125, 70, 320, (c) => {
          slantFill(c, x, 70, 205, 270, c0); slantFill(c, x, 70, 205, 270, c1); slantFill(c, x, 70, 205 + 330 * ua, 270 + 330 * ua, c0);
          for (let j = 0; j < 5; j++) dot(c, x - 22 + j * 11, lerp(213, 262, j / 4) - 3, 4.5, '#f6efe0', { ow: 1.5 });
        }, { alpha: aT });
        if (k === 3 && u > 0.05) for (let j = 0; j < 4; j++) { const v = loopT(tt * 0.6 + j * 0.25, 1); dot(g, x - 15 + j * 10, lerp(220, 150, v), 5, '#ffffff', { alpha: Math.sin(v * Math.PI) * 0.9, ow: 1.5 }); }
        txt(g, lab, x, 492, 16, M.cream, { alpha: aT });
      });
      if (k === 3) txt(g, 'NH₃ · citrat · peptone → alcalin', 800, 550, 16, '#9fc2ff', { alpha: u });
      hl(g, b, 3, 800, 290, 170, 200);
    },
  };
}

/* ================================================================ 4 · GELOZA-SÂNGE ȘI HEMOLIZA */
export function b_blood() {
  /* CE TREBUIE SĂ SE VADĂ
     Sus: 3 plăci de geloză-sânge (roșu închis). Colonia din centru crește; haloul pornește DE LA colonie și se lărgește spre exterior:
     α = halou VERZUI (liză incompletă), β = halou CLAR, galben-transparent (liză completă), γ = fără halou.
     Jos (zoom pe marginea coloniei, colonia în stânga cercului): hemolizinele (puncte galbene) pleacă DIN colonie SPRE dreapta și ajung întâi
     la hematiile cele mai apropiate: α → hematiile rămân ca umbre, hemoglobina devine verde; β → hematiile se sparg (cele apropiate primele)
     și fundul devine clar; γ → nicio hemolizină, hematiile rămân intacte. */
  const PX = [180, 500, 820], PY = 245, RP = 118;
  const HALO = ['#6f7c2e', '#f3cf9a', null];
  const ZC = [660, 690], ZR = 190;
  const R = rng(7); const CELLS = [];
  for (let k = 0; k < 70; k++) { const a = R() * 6.283, d = Math.sqrt(R()) * (ZR - 18); const x = ZC[0] + Math.cos(a) * d, y = ZC[1] + Math.sin(a) * d; if (Math.hypot(x - (ZC[0] - 200), y - ZC[1]) > 140) CELLS.push([x, y, R()]); }
  return {
    home: HOME,
    anchors: PX.map((x) => [x + 92, 128]),
    phase: (i) => ['α: verzuie, parțială', 'β: clară, completă', 'γ: fără hemoliză'][i] || 'martorul = hematiile din mediu',
    draw(g, t, b) {
      bg(g); const tt = TT(t); const p = P(b, t, 3); const { k, u } = cyc(b, t, 3);
      PX.forEach((x, j) => {
        const v = p(j); const a = b.i < 0 || b.i === j ? 1 : 0.5;
        plateIn(g, x, PY, RP, M.blood, (c) => { if (HALO[j]) halo(c, x, PY, 22 + 58 * v, HALO[j], 0.92); colony(c, x, PY, 6 + 12 * v, '#ece6da', { ow: 3 }); }, { alpha: a });
        txt(g, ['α (alfa)', 'β (beta)', 'γ (gama)'][j], x, PY + RP + 36, 22, M.cream, { alpha: a });
        txt(g, ['verzuie, parțială', 'clară, completă', 'fără'][j], x, PY + RP + 64, 16, '#d8d0c4', { alpha: a });
        hl(g, b, j, x, PY, RP + 22, RP + 22);
      });
      // ---- zoom
      lead(g, PX[k], PY + RP + 80, ZC[0] - 60, ZC[1] - ZR + 10, 0.8);
      txt(g, 'zoom: hematiile de lângă colonie', ZC[0] + 40, ZC[1] - ZR - 24, 17, '#ffe7d6');
      g.save(); const cp = new Path2D(); cp.arc(ZC[0], ZC[1], ZR, 0, 7); g.clip(cp);
      const front = 140 + u * 280; // cât au înaintat hemolizinele (distanța de la colonie)
      const CX = ZC[0] - 200;
      const bgc = k === 0 ? mix('#9e1b28', '#5f6a28', u * 0.85) : k === 1 ? mix('#9e1b28', '#f2cf98', u) : '#9e1b28';
      g.fillStyle = bgc; g.fillRect(ZC[0] - ZR, ZC[1] - ZR, 2 * ZR, 2 * ZR);
      CELLS.forEach(([x, y, r]) => {
        const d = Math.hypot(x - CX, y - ZC[1]); const hit = k < 2 ? clamp((front - d) / 60) : 0;
        if (k === 0) rbcD(g, x, y, 13, mix('#d8303f', '#7d8a34', hit), 1 - 0.45 * hit);
        else if (k === 1) { if (hit < 1) rbcD(g, x, y, 13 * (1 + 0.25 * hit), '#d8303f', 1 - hit); if (hit > 0.3 && hit < 1) for (let q = 0; q < 4; q++) dot(g, x + Math.cos(q * 1.6 + r * 6) * 20 * hit, y + Math.sin(q * 1.6 + r * 6) * 20 * hit, 3, '#d8303f', { ow: 0, alpha: 1 - hit }); }
        else rbcD(g, x, y, 13, '#d8303f', 1);
      });
      if (k < 2) for (let j = 0; j < 12; j++) { const v = loopT(tt * 0.45 + j * 0.083, 1); const an = -0.9 + (j % 6) * 0.36; const d = 140 + v * Math.max(30, front - 140); dot(g, CX + Math.cos(an) * d, ZC[1] + Math.sin(an) * d, 5, '#ffe36e', { ow: 1.5, alpha: Math.sin(v * Math.PI) }); }
      ell(g, CX, ZC[1], 140, 140, '#ece6da', { ow: 6 });
      g.restore();
      g.save(); g.strokeStyle = '#ffe7d6'; g.lineWidth = 6; g.beginPath(); g.arc(ZC[0], ZC[1], ZR, 0, 7); g.stroke(); g.restore();
      txt(g, 'colonia', CX + 95, ZC[1] + 110, 16, OUT, { stroke: false });
      txt(g, ['hemoglobina → pigment verde', 'hematii sparte → zonă clară', 'hematii intacte'][k], ZC[0] + 40, ZC[1] + ZR + 26, 17, ['#c9d77a', '#ffe2b0', '#ff9a9a'][k]);
    },
  };
}

/* ================================================================ 5 · DE LA PRODUSUL PATOLOGIC LA CULTURA PURĂ */
export function b_pure() {
  /* CE TREBUIE SĂ SE VADĂ
     1 Însămânțarea: ansa pleacă din eprubeta cu produsul patologic și trage un striu pe placa A (geloză simplă); pe striu rămân bacterii
       de două feluri (coci violet + bacili roz = flora amestecată).
     2 Colonia: FIECARE bacterie crește pe loc într-o colonie (colonia apare exact unde a fost bacteria); zoom-ul arată 1 → 2 → 4 → 8 → grămadă.
       Coloniile din coci = albe, cele din bacili = galbui (două clone diferite).
     3 Izolarea: ansa ia O SINGURĂ colonie de pe A și o duce pe placa B; pe B apar numai colonii identice = cultura pură → identificare + antibiogramă.
     4 Consistența: lichid (tulbure peste tot, fără colonii), semisolid (creștere pe traiectul înțepăturii), solid în placă (colonii izolate). */
  const A = [250, 330], RA = 165, Bp = [780, 330], RB = 130;
  const R = rng(11); const SEED = [];
  for (let k = 0; k < 16; k++) { const u = k / 15; const x = A[0] - 120 + u * 240 + (R() - 0.5) * 30; const y = A[1] - 70 + Math.sin(u * 9) * 55 + (R() - 0.5) * 40 + u * 60; SEED.push([x, y, R() < 0.5 ? 0 : 1]); }
  const PICK = SEED.findIndex((s) => s[2] === 1);
  const STREAK = SEED.map(([x, y]) => [x, y]);
  const ZB = [520, 120];
  return {
    home: HOME,
    anchors: [[A[0] - 150, A[1] - 175], [ZB[0] + 70, ZB[1] - 70], [Bp[0] + 110, Bp[1] - 140], [900, 630]],
    phase: (i) => ['însămânțarea', 'colonia = o clonă', 'izolarea → cultura pură', 'după consistență'][i] || 'produs → colonie → cultură pură',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4); const p0 = p(0), p1 = p(1), p2 = p(2), p3 = p(3); const tt = TT(t);
      // eprubeta cu produsul patologic
      vial(g, 62, 40, 46, 120, (c) => fillFrom(c, 62, 46, 95, '#c9b27a'));
      txt(g, 'produs\npatologic', 62, 196, 15, M.cream);
      plateIn(g, A[0], A[1], RA, M.agar, (c) => {
        const nS = Math.floor(p0 * SEED.length);
        SEED.forEach(([x, y, k], j) => {
          if (j >= nS && p0 < 1) return;
          const grow = clamp(p1);
          if (grow < 0.25) { if (k === 0) coccus(c, x, y, 4, M.gram, 1 - grow * 3); else bacillus(c, x, y, 11, 5, j, M.gramN, 1 - grow * 3); }
          if (grow > 0.05) colony(c, x, y, 4 + 10 * grow, k === 0 ? '#f8f4ea' : '#efd27a', { ow: 2 });
        });
      });
      txt(g, 'placa A: flora amestecată', A[0], A[1] + RA + 34, 17, M.cream);
      // ansa: 1 însămânțarea (eprubetă → striu), 3 izolarea (o colonie A → B)
      if (b.i === 0 || (b.i < 0 && p0 < 1)) { const n = STREAK.length - 1; const f = p0 * n; const j = Math.min(n - 1, Math.floor(f)); const [x, y] = [lerp(STREAK[j][0], STREAK[j + 1][0], f - j), lerp(STREAK[j][1], STREAK[j + 1][1], f - j)]; loop(g, p0 < 0.03 ? 62 : x, p0 < 0.03 ? 110 : y, -0.6); }
      if (b.i === 2 || (b.i < 0 && p2 > 0 && p2 < 1)) {
        const s = SEED[PICK]; const u = clamp(p2 * 1.6); const x = lerp(s[0], Bp[0] - 40, u), y = lerp(s[1], Bp[1] - 20, u) - Math.sin(u * Math.PI) * 120;
        loop(g, x, y, -0.6); if (u < 1) dot(g, x + 14, y, 6, '#efd27a', { ow: 2 });
      }
      plateIn(g, Bp[0], Bp[1], RB, M.agar, (c) => {
        const u = clamp((p2 - 0.55) / 0.45); if (u <= 0) return;
        [[-60, -40], [-20, -60], [20, -30], [60, -50], [-50, 10], [0, 10], [50, 20], [-30, 60], [30, 64]].forEach(([dx, dy]) => colony(c, Bp[0] + dx, Bp[1] + dy, 11 * u, '#efd27a', { ow: 2 }));
      });
      txt(g, 'placa B: o singură clonă', Bp[0], Bp[1] + RB + 34, 17, M.cream);
      if (p2 > 0.7) txt(g, '→ identificare + antibiogramă', Bp[0], Bp[1] + RB + 62, 16, C2, { alpha: p2 });
      // zoom: o bacterie → colonie
      const zA = b.i < 0 || b.i === 1 ? 1 : 0.4;
      g.save(); g.globalAlpha = zA; ell(g, ZB[0], ZB[1], 82, 82, '#2b2230', { ow: 4, sc: '#ffe7d6' }); g.restore();
      const gen = b.i === 1 ? Math.floor(p1 * 5.99) : b.i < 0 ? Math.floor(loopT(tt, 6) * 6) : 5;
      const n = gen >= 5 ? 0 : 1 << gen;
      if (n) for (let j = 0; j < n; j++) { const a = j * 2.4, r = 9 * Math.sqrt(j); bacillus(g, ZB[0] + Math.cos(a) * r, ZB[1] + Math.sin(a) * r, 16, 7, a, M.gramN, zA); }
      else colony(g, ZB[0], ZB[1], 44, '#efd27a', { ow: 4, alpha: zA });
      txt(g, n ? `${n} ${n === 1 ? 'bacterie' : 'bacterii'}` : 'colonie vizibilă', ZB[0], ZB[1] + 104, 16, '#ffe7d6', { alpha: zA });
      if (b.i === 1 || b.i < 0) { arr(g, ZB[0] - 92, ZB[1] + 40, A[0] + 60, A[1] - 120, '#ffe7d6', 4, 0.6 * zA); }
      // consistența
      const aC = b.i < 0 || b.i === 3 ? 1 : 0.4, v = b.i === 3 ? p3 : 1;
      panel(g, 60, 600, 880, 300, { fill: 'rgba(255,240,228,.04)' });
      txt(g, 'DUPĂ CONSISTENȚĂ', 500, 628, 16, '#9ff0dd', { alpha: aC });
      const r2 = rng(5);
      vial(g, 230, 660, 62, 170, (c) => { fillFrom(c, 230, 62, 690, mix('#efe2b0', '#d9c48a', v)); for (let j = 0; j < 40 * v; j++) dot(c, 205 + r2() * 50, 700 + r2() * 120, 2.4, '#8f7a4c', { ow: 0 }); });
      vial(g, 500, 660, 62, 170, (c) => { fillFrom(c, 500, 62, 690, '#ecd9a0'); c.fillStyle = '#b89a52'; c.beginPath(); c.ellipse(500, 760, 4 + 3 * v, 70 * v, 0, 0, 7); c.fill(); });
      plateIn(g, 780, 745, 70, M.agar, (c) => { [[-30, -20], [20, -30], [0, 10], [-24, 30], [32, 24]].forEach(([dx, dy]) => colony(c, 780 + dx, 745 + dy, 8 * v, '#f8f4ea', { ow: 2 })); }, { alpha: aC });
      [['lichid', 'multă cultură', 230], ['semisolid', 'mobilitate', 500], ['solid în placă', 'colonii izolate', 780]].forEach(([a1, a2, x]) => { txt(g, a1, x, 858, 18, M.cream, { alpha: aC }); txt(g, a2, x, 884, 15, '#d8d0c4', { alpha: aC }); });
      hl(g, b, 0, A[0], A[1], RA + 24, RA + 24); hl(g, b, 2, Bp[0], Bp[1], RB + 24, RB + 24);
    },
  };
}
const C2 = '#9ff0dd';

/* ================================================================ 6 · MEDII COMPUSE ȘI SPECIALE */
export function b_special() {
  /* CE TREBUIE SĂ SE VADĂ (4 panouri)
     1 Naturale: Löffler = ser coagulat (pantă crem-gălbuie); bacilii de difterie cresc repede; zoom: bacili cu granulații Neisser la poli.
     2 Îmbogățire (bulion selenit, apă peptonată alcalină): în lichid sunt și germenul căutat (bacili roz) și flora asociată (coci violet);
       flora e inhibată (dispare), germenul căutat se înmulțește.
     3 Transport (Stuart, Amies, Cary-Blair): tampon în gel; ceasul trece, dar NUMĂRUL de germeni rămâne același (vii, nu se înmulțesc).
     4 Speciale: Chocolat = geloză-sânge încălzită: placa trece din roșu în BRUN, hematiile se sparg și eliberează X (hemina) și V (NAD)
       care merg SPRE coloniile de Haemophilus, iar acestea cresc. LJ verde (verde malachit), Sabouraud crem, numite dedesubt. */
  const PN = [[30, 60], [510, 60], [30, 490], [510, 490]], PW = 460, PH = 400;
  return {
    home: HOME,
    anchors: PN.map(([x, y]) => [x + PW - 26, y + 26]),
    phase: (i) => ['naturale', 'de îmbogățire', 'de transport', 'speciale'][i] || 'fiecare mediu are un scop',
    draw(g, t, b) {
      bg(g); const tt = TT(t); const p = P(b, t, 4);
      PN.forEach(([x, y], k) => { panel(g, x, y, PW, PH, { fill: b.i === k ? 'rgba(14,156,134,.14)' : 'rgba(255,240,228,.05)' }); txt(g, ['1 Naturale', '2 Îmbogățire', '3 Transport', '4 Speciale'][k], x + 24, y + 30, 20, M.cream, { align: 'left' }); });
      const al = (k) => (b.i < 0 || b.i === k ? 1 : 0.45);
      // 1 · Löffler
      { const [x0, y0] = PN[0]; const u = p(0); const a = al(0); const tx = x0 + 110;
        vial(g, tx, y0 + 80, 74, 250, (c) => { slantFill(c, tx, 74, y0 + 130, y0 + 200, '#e6d39a'); for (let j = 0; j < 7; j++) colony(c, tx - 22 + j * 7, y0 + 140 + j * 9, 6 * u, '#f3efe3', { ow: 1.5 }); }, { alpha: a });
        txt(g, 'Löffler\n(ser coagulat)', tx, y0 + 365, 16, M.cream, { alpha: a });
        txt(g, 'bilă · lapte · ouă · ser\nforma naturală', x0 + 330, y0 + 90, 15, '#d8d0c4', { alpha: a });
        const Z = [x0 + 330, y0 + 240]; g.save(); g.globalAlpha = a; ell(g, Z[0], Z[1], 88, 88, '#f3ecd6', { ow: 4, sc: '#ffe7d6' }); g.restore();
        for (let j = 0; j < 7; j++) { const an = j * 0.9 + 0.3, X = Z[0] + Math.cos(j * 2.1) * 42, Y = Z[1] + Math.sin(j * 2.1) * 40; bacillus(g, X, Y, 46, 9, an, '#d9b27a', a * clamp(u * 2)); [-1, 1].forEach((s) => dot(g, X + Math.cos(an) * s * 17, Y + Math.sin(an) * s * 17, 4.5, '#2b2a6b', { ow: 0, alpha: a * clamp(u * 2 - 0.6) })); }
        txt(g, 'granulații (Neisser)', Z[0], Z[1] + 112, 15, '#ffe7d6', { alpha: a });
      }
      // 2 · îmbogățire
      { const [x0, y0] = PN[1]; const u = p(1); const a = al(1); const tx = x0 + 130;
        const r = rng(3);
        vial(g, tx, y0 + 80, 120, 290, (c) => {
          fillFrom(c, tx, 120, y0 + 130, '#f1e4b4');
          for (let j = 0; j < 14; j++) { const X = tx - 44 + r() * 88, Y = y0 + 160 + r() * 190; if (u < 1) coccus(c, X, Y, 6, M.gram, 1 - u); xMark(c, X, Y, 6, clamp(u * 2 - 1) * 0.5); }
          const n = Math.round(lerp(5, 30, u)); for (let j = 0; j < n; j++) { const X = tx - 46 + ((j * 37) % 92), Y = y0 + 150 + ((j * 53) % 200) + Math.sin(tt * 2 + j) * 3; bacillus(c, X, Y, 18, 7, j, M.gramN, 1); }
        }, { alpha: a });
        txt(g, 'bulion selenit ·\napă peptonată alcalină', x0 + 345, y0 + 110, 15, '#d8d0c4', { alpha: a });
        txt(g, 'agenți selectivi:\ninhibă flora asociată', x0 + 345, y0 + 210, 16, M.cream, { alpha: a });
        coccus(g, x0 + 290, y0 + 300, 8, M.gram, a); txt(g, 'flora', x0 + 340, y0 + 300, 15, '#d9c6ff', { alpha: a, align: 'left' });
        bacillus(g, x0 + 290, y0 + 335, 22, 9, 0, M.gramN, a); txt(g, 'germenul căutat', x0 + 315, y0 + 335, 15, '#ffc2cf', { alpha: a, align: 'left' });
      }
      // 3 · transport
      { const [x0, y0] = PN[2]; const u = p(2); const a = al(2); const tx = x0 + 130;
        vial(g, tx, y0 + 70, 90, 300, (c) => { fillFrom(c, tx, 90, y0 + 170, '#e8eef0'); for (let j = 0; j < 10; j++) bacillus(c, tx - 26 + (j % 4) * 17, y0 + 230 + Math.floor(j / 4) * 30 + Math.sin(tt * 1.5 + j) * 2, 16, 6, j, M.gramN, 1); }, { alpha: a });
        g.save(); g.globalAlpha = a; g.strokeStyle = OUT; g.lineWidth = 10; g.beginPath(); g.moveTo(tx, y0 + 52); g.lineTo(tx, y0 + 250); g.stroke(); g.strokeStyle = '#f2ead8'; g.lineWidth = 5; g.stroke(); ell(g, tx, y0 + 256, 12, 20, '#f7f1e6', { ow: 3 }); g.restore();
        const C = [x0 + 340, y0 + 150]; g.save(); g.globalAlpha = a; ell(g, C[0], C[1], 60, 60, '#f6efe0', { ow: 5 });
        const an = -Math.PI / 2 + u * Math.PI * 4; g.strokeStyle = OUT; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(C[0], C[1]); g.lineTo(C[0] + Math.cos(an) * 44, C[1] + Math.sin(an) * 44); g.stroke(); g.restore();
        txt(g, '10 germeni → 10 germeni', C[0], C[1] + 96, 16, M.cream, { alpha: a });
        txt(g, 'fără nutrienți · cu tampon\nviu, nu se înmulțește', C[0], C[1] + 160, 15, '#d8d0c4', { alpha: a });
        txt(g, 'Stuart · Amies · Cary-Blair', tx, y0 + 388, 15, M.cream, { alpha: a });
      }
      // 4 · Chocolat (+ LJ, Sabouraud)
      { const [x0, y0] = PN[3]; const u = p(3); const a = al(3); const C = [x0 + 150, y0 + 200];
        const heat = clamp(u * 2), grow = clamp(u * 2 - 1);
        plateIn(g, C[0], C[1], 110, mix(M.blood, M.choc, heat), (c) => {
          const r = rng(9); for (let j = 0; j < 18; j++) { const X = C[0] - 90 + r() * 180, Y = C[1] - 90 + r() * 180; rbcD(c, X, Y, 9, '#e0404e', 1 - heat); if (heat > 0.3) { const v = clamp((heat - 0.3) / 0.7); const tg = [[C[0] - 40, C[1]], [C[0] + 30, C[1] - 30], [C[0] + 20, C[1] + 45]][j % 3]; dot(c, lerp(X, tg[0], v * 0.8), lerp(Y, tg[1], v * 0.8), 4, j % 2 ? '#ffe36e' : '#7fe0ff', { ow: 1, alpha: 1 - grow * 0.8 }); } }
          [[-40, 0], [30, -30], [20, 45]].forEach(([dx, dy]) => colony(c, C[0] + dx, C[1] + dy, 3 + 10 * grow, '#e9e2d0', { ow: 2 }));
        }, { alpha: a });
        if (b.i === 3 && heat < 1) for (let j = 0; j < 3; j++) { const v = loopT(tt + j * 0.3, 1); txt(g, '〰', C[0] - 40 + j * 40, C[1] + 150 - v * 30, 22, '#ff9a4a', { alpha: Math.sin(v * Math.PI), stroke: false }); }
        txt(g, 'Chocolat: sânge încălzit', C[0], C[1] + 140, 16, M.cream, { alpha: a });
        dot(g, x0 + 300, y0 + 110, 6, '#ffe36e', { alpha: a }); txt(g, 'X = hemina', x0 + 314, y0 + 110, 15, '#ffe9a8', { align: 'left', alpha: a });
        dot(g, x0 + 300, y0 + 140, 6, '#7fe0ff', { alpha: a }); txt(g, 'V = NAD', x0 + 314, y0 + 140, 15, '#cfefff', { align: 'left', alpha: a });
        txt(g, 'neisserii, hemofili', x0 + 370, y0 + 180, 15, '#d8d0c4', { alpha: a });
        vial(g, x0 + 320, y0 + 225, 46, 130, (c) => slantFill(c, x0 + 320, 46, y0 + 255, y0 + 290, '#7fbf8a'), { alpha: a });
        plateIn(g, x0 + 410, y0 + 290, 36, M.sab, null, { alpha: a });
        txt(g, 'LJ → BK', x0 + 320, y0 + 378, 15, M.cream, { alpha: a }); txt(g, 'Sabouraud\n→ fungi', x0 + 410, y0 + 360, 15, M.cream, { alpha: a });
      }
      PN.forEach(([x, y], k) => hl(g, b, k, x + PW / 2, y + PH / 2, PW / 2 + 6, PH / 2 + 6));
    },
  };
}

/* ================================================================ 7 · INCUBAREA */
export function b_incub() {
  /* CE TREBUIE SĂ SE VADĂ
     1 Temperatura: mercurul URCĂ în termometru până la 35–37 °C (bacterii patogene); reperul 25–30 °C = optim pentru fungi.
     2 Timpul: acele ceasului se învârt; germenii rapizi (generație 20–30 min) se dublează 1 → 2 → 4 … și după 18 h colonia e vizibilă;
       levurile au nevoie de 24–72 h, BK pe LJ de săptămâni (paginile calendarului se rup).
     3 Atmosfera: 3 borcane cu plăci întoarse (geloza SUS, capacul JOS):
       aerob = O₂ în aer, cresc majoritatea; cu CO₂ = bule de CO₂, streptococi / neisserii; anaerob = punga generatoare ABSOARBE O₂
       (moleculele de O₂ merg SPRE pungă și dispar) → crește Clostridium. Picătura de condens cade pe capac, nu pe geloză. */
  const TH = [120, 90];
  const JX = [190, 500, 810], JY = 640;
  return {
    home: HOME,
    anchors: [[TH[0] + 60, TH[1] - 10], [560, 70], [955, 500]],
    phase: (i) => ['35–37 °C', '18 h → săptămâni', 'aerob · CO₂ · anaerob'][i] || 'temperatură · timp · atmosferă',
    draw(g, t, b) {
      bg(g); const tt = TT(t); const p = P(b, t, 3); const p0 = p(0), p1 = p(1), p2 = p(2);
      const al = (k) => (b.i < 0 || b.i === k ? 1 : 0.42);
      // ---- termometru (sus = cald)
      { const a = al(0); const x = TH[0], top = TH[1], bot = 400; const lvl = lerp(bot - 30, 175, p0);
        g.save(); g.globalAlpha = a; g.fillStyle = '#f6efe0'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(x - 16, top, 32, bot - top, 16); g.fill(); g.stroke();
        g.fillStyle = '#e0443e'; g.fillRect(x - 8, lvl, 16, bot - lvl); g.beginPath(); g.arc(x, bot + 18, 30, 0, 7); g.fill(); g.stroke(); g.restore();
        [[175, '35–37 °C bacterii'], [265, '25–30 °C fungi']].forEach(([y, s]) => { tube0(g, x + 18, y, x + 40, y, a); txt(g, s, x + 48, y, 17, M.cream, { align: 'left', alpha: a }); });
        txt(g, 'temperatura corpului', x + 48, 200, 14, '#d8d0c4', { align: 'left', alpha: a });
      }
      // ---- ceasul + timpul
      { const a = al(1); const C = [520, 200];
        g.save(); g.globalAlpha = a; ell(g, C[0], C[1], 92, 92, '#f6efe0', { ow: 6 }); const h = -Math.PI / 2 + p1 * Math.PI * 3, m = -Math.PI / 2 + p1 * Math.PI * 36;
        g.strokeStyle = OUT; g.lineCap = 'round'; g.lineWidth = 7; g.beginPath(); g.moveTo(...C); g.lineTo(C[0] + Math.cos(h) * 48, C[1] + Math.sin(h) * 48); g.stroke(); g.lineWidth = 4; g.beginPath(); g.moveTo(...C); g.lineTo(C[0] + Math.cos(m) * 72, C[1] + Math.sin(m) * 72); g.stroke(); g.restore();
        const n = Math.min(32, 1 << Math.floor(p1 * 6)); for (let j = 0; j < n; j++) { const an = j * 2.4, r = 5 * Math.sqrt(j); bacillus(g, C[0] + Math.cos(an) * r, C[1] + 140 + Math.sin(an) * r, 11, 5, an, M.gramN, a); }
        txt(g, 'generație 20–30 min', C[0], C[1] + 190, 15, '#d8d0c4', { alpha: a });
        const rows = [['18 h', 'germeni rapizi', 0.33], ['24–72 h', 'levuri', 0.66], ['săptămâni', 'BK pe LJ', 0.95]];
        rows.forEach(([h1, h2, at], j) => { const on2 = p1 >= at || b.i < 0 || b.i > 1; const y = 120 + j * 80;
          txt(g, h1, 680, y, 22, on2 ? C2 : '#6f8f88', { align: 'left', alpha: a }); txt(g, h2, 680, y + 26, 15, '#d8d0c4', { align: 'left', alpha: a });
          if (j < 2) plateIn(g, 900, y + 6, 30, j ? M.sab : M.agar, (c) => { if (on2) [[-10, -6], [10, 4], [-2, 12]].forEach(([dx, dy]) => colony(c, 900 + dx, y + 6 + dy, 6, j ? '#f7f5ef' : '#f6efe0', { ow: 1.5 })); }, { alpha: a });
          else vial(g, 900, y - 30, 30, 80, (c) => { slantFill(c, 900, 30, y - 6, y + 10, '#7fbf8a'); if (on2) for (let q = 0; q < 3; q++) colony(c, 896 + q * 4, y + q * 8, 4, '#efe6c8', { ow: 1, rough: true }); }, { alpha: a });
        });
      }
      // ---- atmosfera: 3 borcane cu plăci întoarse
      const LAB = [['aerob', 'aer obișnuit · majoritatea'], ['cu CO₂', 'streptococi, neisserii'], ['anaerob', 'fără O₂ · Clostridium']];
      JX.forEach((x, k) => { const a = al(2);
        g.save(); g.globalAlpha = a; g.fillStyle = k === 2 ? 'rgba(40,40,52,.55)' : 'rgba(220,245,255,.10)'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(x - 120, JY - 150, 240, 300, 26); g.fill(); g.stroke();
        g.fillStyle = '#8f8a96'; g.beginPath(); g.roundRect(x - 128, JY - 176, 256, 34, 10); g.fill(); g.stroke(); g.restore();
        // plăci întoarse: geloza sus (în fundul plăcii), capacul jos
        for (let s = 0; s < 2; s++) { const y = JY + 20 + s * 62; g.save(); g.globalAlpha = a;
          g.fillStyle = 'rgba(220,245,255,.25)'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(x - 92, y - 22, 184, 40, 6); g.fill(); g.stroke();
          g.fillStyle = M.agar; g.fillRect(x - 86, y - 18, 172, 13); g.restore();
          const gr = b.i === 2 ? p2 : b.i < 0 ? 1 : 0.6; for (let q = 0; q < 4; q++) dot(g, x - 54 + q * 36, y - 2, 5 * gr, '#f6efe0', { ow: 1.5, alpha: a });
          if (s === 0 && k === 0) { const v = loopT(tt * 0.8, 1); dot(g, x + 70, lerp(y - 2, y + 14, v), 3.5, '#bfe6ff', { ow: 1, alpha: a * (1 - v * 0.3) }); }
        }
        const gas = k === 1 ? 'CO₂' : 'O₂';
        for (let j = 0; j < 7; j++) { let X = x - 90 + (j * 31) % 180 + Math.sin(tt + j) * 8, Y = JY - 120 + (j * 23) % 60; let al2 = a;
          if (k === 2) { const v = b.i === 2 ? p2 : 1; X = lerp(X, x + 80, v); Y = lerp(Y, JY - 120, v); al2 = a * (1 - v); }
          if (al2 > 0.02) { dot(g, X, Y, 9, k === 1 ? '#c9c9c9' : '#8fd3ff', { ow: 2, alpha: al2 }); } }
        if (k === 2) { g.save(); g.globalAlpha = a; g.fillStyle = '#d8d0c4'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.roundRect(x + 64, JY - 140, 36, 46, 6); g.fill(); g.stroke(); g.restore(); }
        txt(g, LAB[k][0], x, JY + 186, 19, M.cream, { alpha: a }); txt(g, LAB[k][1], x, JY + 212, 14, '#d8d0c4', { alpha: a });
        txt(g, gas, x - 70, JY - 70, 14, k === 1 ? '#e6e6e6' : '#bfe6ff', { alpha: a * (k === 2 ? 1 - (b.i === 2 ? p2 : 1) : 1) });
      });
      txt(g, 'plăcile se incubează întoarse (capacul jos)', 500, 448, 16, '#d8d0c4', { alpha: al(2) });
      txt(g, 'pungă generatoare', JX[2] + 82, JY - 200, 13, '#d8d0c4', { alpha: al(2) });
      hl(g, b, 0, TH[0] + 80, 245, 140, 200); hl(g, b, 1, 640, 250, 330, 200); hl(g, b, 2, 500, JY + 20, 470, 210);
    },
  };
}
function tube0(g, x0, y0, x1, y1, a) { g.save(); g.globalAlpha = a; g.strokeStyle = '#fff3e6'; g.lineWidth = 3; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.restore(); }

/* ================================================================ 8 · CULTURILE CELULARE + IZOLATUL VIRAL */
function cellPoly(g, x, y, s, col, o = {}) {
  // celulă de monostrat: poligon turtit cu nucleu (vedere de sus)
  const r = s * (o.round ? 0.78 : 1);
  g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha);
  const p = new Path2D();
  if (o.round) p.arc(x, y, r, 0, 7); else { for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283 + 0.52; const X = x + Math.cos(a) * r, Y = y + Math.sin(a) * r * 0.92; k ? p.lineTo(X, Y) : p.moveTo(X, Y); } p.closePath(); }
  g.fillStyle = col; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(p);
  if (o.nuclei) o.nuclei.forEach(([dx, dy]) => dot(g, x + dx, y + dy, s * 0.22, '#5a4bb5', { ow: 1.5 })); else dot(g, x, y, s * 0.28, '#5a4bb5', { ow: 1.5 });
  g.restore();
}
export function b_cells({ spec } = {}) {
  /* CE TREBUIE SĂ SE VADĂ (o singură scenă, două slide-uri: part 0 = culturile celulare (sus), part 1 = izolatul viral (jos))
     PART 0 — sus, 2 vase văzute de sus:
     0 normale: celulele se atașează și se divid până acoperă peretele → monostrat → SE OPRESC (inhibiția de contact).
       tumorale: continuă să se dividă după acoperire → al doilea strat peste primul + celule care plutesc (suspensie).
     1 subcultivarea: EDTA desprinde celulele (se rotunjesc) din vasul plin și le mută ÎNTR-UN VAS NOU (săgeata merge de la vasul vechi la cel nou);
       contorul de pasaje: adulte 4–6, embrionare 60–80, linii nelimitat.
     2 mediul are indicator (roșu fenol): pe măsură ce celulele cresc, mediul se acidifică și trece din ROȘU în GALBEN → semn că trebuie subcultivat.
     PART 1 — jos, monostratul mărit:
     0 monostratul normal + inocularea, în ordine: mediul (roz) e scos → suspensia virală (puncte violet coboară pe celule) 1 h → mediul de
       întreținere (roz-pal) → urmărești zilele următoare.
     1 efectul citopatic: DOAR celulele infectate se rotunjesc, se desprind, se adună în ciorchine; două fuzionează într-un sincițiu (mai mulți nuclei).
     2 hemadsorbția (virus fără efect citopatic, ex. influenza): celulele infectate arată normal; hematiile adăugate vin de sus și se lipesc
       DOAR de celulele infectate; restul cad / sunt spălate.
     3 specificul: anticorpii (Y galbeni) se leagă doar de antigenul viral din celulele infectate (Ag-Ac); PCR → afli CARE virus. */
  const part = (spec && spec.sceneOpts && spec.sceneOpts.part) || 0;
  const F1 = [250, 200], F2 = [690, 200], FW = 300, FH = 190;
  const GRID = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) GRID.push([150 + c * 80 + (r % 2) * 40, 600 + r * 66]);
  const INF = new Set([3, 4, 12, 13, 21, 22, 23]);
  const pos = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) pos.push([-120 + c * 40 + (r % 2) * 20, -60 + r * 40]);
  return {
    home: HOME,
    anchors: part === 0 ? [[F1[0] - FW / 2 + 20, F1[1] - FH / 2 - 18], [F2[0] + FW / 2 - 10, F2[1] - FH / 2 - 18], [F1[0] + FW / 2 - 10, F1[1] + FH / 2 + 66]]
      : [[150, 520], [500, 520], [820, 520], [880, 880]],
    phase: (i) => (part === 0 ? ['inhibiția de contact', 'primare vs. linii', 'ce le ține în viață'][i] || 'virusurile cresc doar în celule vii'
      : ['monostrat → inoculare', 'efect citopatic', 'hemadsorbție', 'nespecific vs. specific'][i] || 'ce face virusul celulelor'),
    draw(g, t, b) {
      bg(g); const tt = TT(t);
      const bT = part === 0 ? b : { i: 9, bt: 0, bd: 1 }, bV = part === 1 ? b : { i: -9, bt: 0, bd: 1 };
      const pT = P(bT, t, 3), pV = P(bV, t, 4);
      const aTop = part === 0 ? 1 : 0.4, aBot = part === 1 ? 1 : 0.4;
      const alT = (...k) => aTop * (bT.i < 0 || k.includes(bT.i) || part === 1 ? 1 : 0.42);
      const flask = (C, inner, a, med) => {
        g.save(); g.globalAlpha = a; g.fillStyle = med; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(C[0] - FW / 2, C[1] - FH / 2, FW, FH, 18); g.fill(); g.stroke();
        g.fillStyle = 'rgba(220,245,255,.2)'; g.beginPath(); g.roundRect(C[0] + FW / 2 - 4, C[1] - 26, 44, 52, 8); g.fill(); g.stroke();
        g.beginPath(); g.roundRect(C[0] - FW / 2 + 6, C[1] - FH / 2 + 6, FW - 12, FH - 12, 14); g.clip(); inner(); g.restore();
      };
      // ================= SUS
      if (bT.i !== 1) {
        const g0 = bT.i === 0 ? pT(0) : 1; const acid = bT.i === 2 ? pT(2) : 0;
        flask(F1, () => { const n = Math.round(lerp(3, pos.length, g0)); pos.slice(0, n).forEach(([x, y]) => cellPoly(g, F1[0] + x, F1[1] + y, 22, '#f3dccf')); }, alT(0, 2), mix('#e86a7a', '#f2cf4a', acid));
        flask(F2, () => { const n = Math.round(lerp(3, pos.length, g0)); pos.slice(0, n).forEach(([x, y]) => cellPoly(g, F2[0] + x, F2[1] + y, 22, '#f3c7b8'));
          const up = clamp(g0 * 2 - 1); for (let j = 0; j < 14 * up; j++) cellPoly(g, F2[0] - 110 + (j * 47) % 220, F2[1] - 50 + ((j * 31) % 100), 20, '#e8a898', { round: true });
          for (let j = 0; j < 4 * up; j++) cellPoly(g, F2[0] - 90 + j * 60, F2[1] - 72 + Math.sin(tt * 2 + j) * 8, 13, '#f6d0c4', { round: true }); }, alT(0), '#e86a7a');
        txt(g, 'normale: monostrat, apoi se opresc', F1[0], F1[1] + FH / 2 + 28, 16, M.cream, { alpha: alT(0, 2) });
        txt(g, 'tumorale: mai multe straturi + suspensie', F2[0], F2[1] + FH / 2 + 28, 16, M.cream, { alpha: alT(0) });
        if (part === 0 && (bT.i === 2 || bT.i < 0)) { txt(g, 'indicator: roșu → galben = acid → subcultivezi', F1[0] + 30, F1[1] + FH / 2 + 66, 15, '#ffe9a8'); txt(g, 'aseptic · tampon · antibiotice\n37 °C constant + 10% CO₂', F2[0], F2[1] + FH / 2 + 74, 14, '#d8d0c4'); }
      } else {
        const u = pT(1);
        flask(F1, () => pos.forEach(([x, y], j) => cellPoly(g, F1[0] + x, F1[1] + y, 22, '#f3dccf', { round: u > 0.15, alpha: 1 - clamp(u * 2 - 0.8) })), 1, '#e86a7a');
        flask(F2, () => pos.slice(0, Math.round(16 * clamp(u * 2 - 0.9))).forEach(([x, y]) => cellPoly(g, F2[0] + x * 1.4, F2[1] + y * 1.3, 18, '#f3dccf', { round: true })), 1, '#e86a7a');
        if (u > 0.3 && u < 0.85) for (let j = 0; j < 5; j++) { const v = loopT(tt * 0.7 + j * 0.2, 1); cellPoly(g, lerp(F1[0] + FW / 2, F2[0] - FW / 2, v), F1[1] - 30 + j * 14, 9, '#f3dccf', { round: true }); }
        arr(g, F1[0] + FW / 2 + 40, F1[1] + 60, F2[0] - FW / 2 - 6, F2[1] + 60, '#fff3e6', 5, 1);
        txt(g, 'EDTA (versen) după 5–7 zile', 470, 60, 16, '#ffe9a8');
        txt(g, 'primare: direct din țesut', F1[0], F1[1] + FH / 2 + 28, 16, M.cream); txt(g, 'vas nou (pasaj)', F2[0], F2[1] + FH / 2 + 28, 16, M.cream);
        [['adulte', '4–6 pasaje'], ['embrionare', '60–80'], ['linii (HeLa, Vero)', 'nelimitat']].forEach(([a1, a2], j) => { const y = 370 + j * 32; txt(g, a1, 330, y, 17, M.cream, { align: 'left', alpha: clamp(u * 3 - j) }); txt(g, a2, 680, y, 17, C2, { align: 'right', alpha: clamp(u * 3 - j) }); });
      }
      // ================= JOS: monostratul mărit
      panel(g, 70, 470, 860, 440, { fill: 'rgba(255,240,228,.04)' });
      g.save(); g.globalAlpha = aBot;
      const s0 = pV(0), s1 = pV(1), s2 = pV(2), s3 = pV(3);
      // supernatantul (bara de sus): mediu → scos → suspensie virală 1 h → mediu de întreținere
      const ph = (a, z) => clamp((s0 - a) / (z - a));
      const out = ph(0.1, 0.3), vir = ph(0.3, 0.6), keep = ph(0.6, 0.85);
      const supC = keep > 0 ? mix('#c9b6e8', '#f2b6bc', keep) : vir > 0 ? '#c9b6e8' : '#e86a7a';
      const supA = vir > 0 || keep > 0 ? 0.7 : 0.7 * (1 - out);
      g.save(); g.globalAlpha *= supA; g.fillStyle = supC; g.fillRect(90, 490, 820, 56); g.restore();
      const lab0 = bV.i <= 0 ? (s0 <= 0.1 ? 'mediul de cultură' : out < 1 ? 'scoți mediul' : vir < 1 ? 'suspensie virală 1 h' : 'mediu de întreținere, mai sărac → urmărești zilele') : bV.i === 1 ? 'zilele următoare' : bV.i === 2 ? 'hematii adăugate' : 'anticorpi marcați (Ag-Ac) · PCR';
      txt(g, lab0, 500, 518, 17, M.cream);
      if (bV.i === 0 && vir > 0 && vir < 1) for (let j = 0; j < 12; j++) { const v = loopT(tt * 0.6 + j * 0.083, 1); dot(g, 120 + j * 68, lerp(500, 600, v), 5, '#8a4fd0', { ow: 1.5, alpha: Math.sin(v * Math.PI) }); }
      const cpe = bV.i === 1 ? s1 : 0;
      GRID.forEach(([x, y], j) => {
        const inf = INF.has(j);
        if (!inf || bV.i !== 1) {
          cellPoly(g, x, y, 34, inf && bV.i === 3 ? mix('#f3dccf', '#e9cfe8', s3) : '#f3dccf');
          if (inf && bV.i === 2) for (let q = 0; q < 4; q++) { const a = q * 1.57 + 0.7; const d = lerp(150, 28, s2); rbcD(g, x + Math.cos(a) * d * 0.4, lerp(470, y + Math.sin(a) * 28, s2), 10, '#d8303f', clamp(s2 * 3)); }
          if (inf && bV.i === 3) for (let q = 0; q < 3; q++) { const a = q * 2.1 + 0.4; const X = x + Math.cos(a) * 22, Y = lerp(470, y + Math.sin(a) * 22, s3); g.save(); g.strokeStyle = OUT; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(X, Y); g.lineTo(X, Y - 14); g.moveTo(X, Y - 14); g.lineTo(X - 8, Y - 24); g.moveTo(X, Y - 14); g.lineTo(X + 8, Y - 24); g.stroke(); g.strokeStyle = '#ffe36e'; g.lineWidth = 3.5; g.stroke(); g.restore(); }
          return;
        }
        if (j === 21 || j === 22) { if (j === 21) { const pth = new Path2D(); pth.ellipse(x + 40, y, 34 + 40 * cpe, 34 - 4 * cpe, 0, 0, 7); g.save(); g.fillStyle = mix('#f3dccf', '#e7bfe6', cpe); g.fill(pth); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(pth); g.restore(); [[-10, -8], [20, 8], [52, -8], [80, 6]].forEach(([dx, dy]) => dot(g, x + dx, y + dy, 7, '#5a4bb5', { ow: 1.5 })); } return; }
        const dx = (j % 3 - 1) * 16 * cpe, dy = -10 * cpe;
        cellPoly(g, x + dx, y + dy, 34 * (1 - 0.35 * cpe), mix('#f3dccf', '#e7bfe6', cpe), { round: cpe > 0.3 });
      });
      if (bV.i === 2) for (let q = 0; q < 6; q++) { const v = loopT(tt * 0.4 + q * 0.17, 1); rbcD(g, 200 + q * 110, lerp(560, 900, v), 9, '#d8303f', (1 - v) * clamp(s2 * 2)); }
      if (bV.i === 1 && cpe > 0.6) { txt(g, 'sincițiu', 330, 895, 16, '#e9cfe8'); txt(g, 'rotunjite · desprinse · ciorchine', 640, 895, 16, '#e9cfe8'); }
      if (bV.i === 3) { pill(g, 300, 890, 330, 32, '#f6efe0', 'nespecifice: arată CĂ se replică', { size: 14, alpha: s3 }); pill(g, 700, 890, 300, 32, '#9ff0dd', 'specifice: arată CARE virus', { size: 14, alpha: s3 }); }
      g.restore();
      if (part === 1) { hl(g, b, 1, 500, 690, 420, 170); hl(g, b, 2, 500, 690, 420, 170); }
      else { hl(g, b, 0, 470, 200, 470, 140); hl(g, b, 2, F1[0], F1[1], FW / 2 + 30, FH / 2 + 30); }
    },
  };
}

/* ================================================================ 9 · OUL EMBRIONAT ȘI ANIMALELE */
export function b_egg() {
  /* CE TREBUIE SĂ SE VADĂ (secțiune prin oul de găină embrionat, polul bont cu camera de aer SUS)
     Straturi de la exterior spre interior: coaja → membrana corioalantoidiană (lipită sub coajă) → cavitatea alantoidiană (lichid mare)
     → amnionul în jurul embrionului; sacul vitelin (galben) atârnă de embrion.
     Acul intră prin coajă și se OPREȘTE în compartimentul punctului: 1 pe membrana corioalantoidiană (apar plaje albe = leziuni, herpes / pox);
     2 în cavitatea alantoidiană / amniotică (influenza, urlian); 3 în sacul vitelin (herpes simplex); 4 într-o venă alantoidiană de pe membrană;
     5 în embrion. 6 Animalele: șoarecele marcat, cu cele 7 căi, de la intradermic la intracerebral (se aprind pe rând). */
  const E = [330, 470], ER = [230, 300];
  const T = [ // [ținta x,y], [punctul de intrare pe coajă]
    [[E[0] - 178, E[1] - 148], [E[0] - 222, E[1] - 186]],
    [[E[0] + 120, E[1] + 40], [E[0] + 226, E[1] + 30]],
    [[E[0] + 10, E[1] + 150], [E[0] + 60, E[1] + 296]],
    [[E[0] - 137, E[1] + 207], [E[0] - 176, E[1] + 262]],
    [[E[0] - 10, E[1] - 30], [E[0] + 150, E[1] - 230]],
  ];
  const ROUTES = ['intradermic', 'subcutanat', 'intramuscular', 'intravenos', 'intraperitoneal', 'intranazal', 'intracerebral'];
  return {
    home: HOME,
    anchors: [[E[0] - 150, E[1] - 250], [E[0] + 200, E[1] - 60], [E[0] + 110, E[1] + 230], [E[0] - 230, E[1] + 240], [E[0] + 40, E[1] - 120], [780, 120]],
    phase: (i) => ['membrana corioalantoidiană', 'cavitatea alantoidiană / amniotică', 'sacul vitelin', 'venele alantoidiene', 'embrionul', 'animalele: 7 căi'][i] || 'oul embrionat: 5 căi',
    draw(g, t, b) {
      bg(g); const tt = TT(t); const p = P(b, t, 6);
      const aE = b.i === 5 ? 0.45 : 1;
      g.save(); g.globalAlpha = aE;
      // coaja
      const shell = new Path2D(); shell.ellipse(E[0], E[1], ER[0], ER[1], 0, 0, 7);
      g.fillStyle = '#f3e3c4'; g.fill(shell); g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(shell);
      // membrana corioalantoidiană (sub coajă) + vasele ei
      const cam = new Path2D(); cam.ellipse(E[0], E[1] + 8, ER[0] - 16, ER[1] - 26, 0, 0, 7);
      g.fillStyle = '#d7ecf2'; g.fill(cam); g.strokeStyle = '#d35a6a'; g.lineWidth = 7; g.stroke(cam);
      // camera de aer (sus, la polul bont)
      g.save(); g.clip(shell); g.fillStyle = '#fbf6ec'; g.beginPath(); g.ellipse(E[0], E[1] - ER[1] + 10, ER[0] * 0.8, 70, 0, 0, 7); g.fill(); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(); g.restore();
      txt(g, 'camera de aer', E[0], E[1] - ER[1] + 40, 16, OUT, { stroke: false });
      // vene alantoidiene pe membrană
      [[-0.9, 1.2], [2.4, 3.6]].forEach(([a0, a1]) => { g.strokeStyle = '#8c2a4e'; g.lineWidth = 6; g.beginPath(); for (let k = 0; k <= 12; k++) { const a = lerp(a0, a1, k / 12) + Math.PI / 2; const X = E[0] + Math.cos(a) * (ER[0] - 24), Y = E[1] + 8 + Math.sin(a) * (ER[1] - 34); k ? g.lineTo(X, Y) : g.moveTo(X, Y); } g.stroke(); });
      // amnionul + embrionul
      ell(g, E[0] - 10, E[1] - 20, 105, 90, '#bfe3ee', { ow: 4 });
      ell(g, E[0] - 10, E[1] - 30, 46, 40, '#f2b4a6', { ow: 4 }); ell(g, E[0] - 40, E[1] - 58, 22, 20, '#f2b4a6', { ow: 4 }); dot(g, E[0] - 46, E[1] - 62, 5, '#2a1534', { ow: 0 });
      // sacul vitelin
      ell(g, E[0] + 10, E[1] + 150, 82, 64, '#f2c53a', { ow: 5 });
      tube0(g, E[0] - 4, E[1] + 8, E[0] + 6, E[1] + 90, 1);
      g.restore();
      txt(g, 'amnion', E[0] + 76, E[1] - 100, 15, '#cfefff', { alpha: aE }); txt(g, 'embrion', E[0] - 10, E[1] + 26, 14, OUT, { stroke: false, alpha: aE });
      txt(g, 'sacul vitelin', E[0] + 10, E[1] + 150, 15, OUT, { stroke: false, alpha: aE }); txt(g, 'cavitatea\nalantoidiană', E[0] + 150, E[1] + 120, 14, '#cfefff', { alpha: aE });
      txt(g, 'membrana\ncorioalantoidiană', 120, 110, 15, '#ff9fae', { alpha: aE }); lead(g, 120, 136, E[0] - 170, E[1] - 200, aE);
      // seringa: pe intro trece pe rând prin cele 5 ținte; pe punct se oprește în ținta lui
      const k = b.i >= 0 ? b.i : REDUCED ? 0 : Math.floor(t / 2.6) % 5; const u = b.i >= 0 ? p(b.i) : ease(clamp((t % 2.6) / 1.6));
      if (k < 5) { const [tg, en] = T[k]; const dx = tg[0] - en[0], dy = tg[1] - en[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
        const tipx = lerp(en[0] - ux * 60, tg[0], u), tipy = lerp(en[1] - uy * 60, tg[1], u);
        g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.moveTo(tipx, tipy); g.lineTo(tipx - ux * 120, tipy - uy * 120); g.stroke(); g.strokeStyle = '#d8dde0'; g.lineWidth = 3.5; g.stroke();
        g.lineWidth = 26; g.strokeStyle = OUT; g.beginPath(); g.moveTo(tipx - ux * 120, tipy - uy * 120); g.lineTo(tipx - ux * 230, tipy - uy * 230); g.stroke(); g.lineWidth = 19; g.strokeStyle = '#eef4f6'; g.stroke(); g.restore();
        if (u > 0.92) ring(g, tg[0], tg[1], 26, 26, 1);
        if (k === 0 && u > 0.6) [[-196, -110], [-186, -128], [-164, -166], [-150, -182], [-200, -88]].forEach(([dx, dy]) => dot(g, E[0] + dx, E[1] + dy, 6 * clamp(u * 3 - 2), '#ffffff', { ow: 2 }));
      }
      // animalele
      const aA = b.i < 0 || b.i === 5 ? 1 : 0.4;
      const MX = 760, MY = 240;
      g.save(); g.globalAlpha = aA; ell(g, MX, MY, 110, 62, '#e9e4ea', { ow: 5 }); ell(g, MX - 110, MY - 20, 50, 40, '#e9e4ea', { ow: 5 }); ell(g, MX - 98, MY - 66, 18, 22, '#f2b8c6', { ow: 4 }); dot(g, MX - 130, MY - 26, 5, OUT, { ow: 0 });
      g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.moveTo(MX + 108, MY + 10); g.quadraticCurveTo(MX + 190, MY + 60, MX + 210, MY - 10); g.stroke(); g.strokeStyle = '#f2b8c6'; g.lineWidth = 2; g.stroke();
      g.fillStyle = '#4f8fe6'; g.fillRect(MX + 20, MY - 36, 22, 14); g.restore();
      txt(g, 'marcate · anesteziate dacă doare\nlocul epilat și antiseptizat', MX, MY + 100, 14, '#d8d0c4', { alpha: aA });
      const on5 = b.i === 5 ? Math.floor(p(5) * 7.99) : b.i < 0 ? 7 : -1;
      ROUTES.forEach((r, j) => txt(g, r, 670, 420 + j * 36, 17, j <= on5 ? C2 : '#7d7488', { align: 'left', alpha: aA }));
      txt(g, 'când celelalte metode\nnu sunt satisfăcătoare', 760, 700, 14, '#d8d0c4', { alpha: aA });
      txt(g, 'oul de găină embrionat: 5 căi', E[0], E[1] + ER[1] + 40, 17, M.cream, { alpha: aE });
      hl(g, b, 5, 790, 420, 180, 330);
    },
  };
}

/* ================================================================ 10 · CUM CITEȘTI O COLONIE */
export function b_colonies() {
  /* CE TREBUIE SĂ SE VADĂ
     Sus: 6 plăci mici, câte una pe tip (se aprinde cea a punctului). Jos-dreapta: placa mare a punctului activ, unde coloniile CRESC din punct:
     0 S: geloză simplă, colonii rotunde, netede, bombate (luciu), margine regulată.
     1 R: colonii neregulate, uscate, cu margine zimțată (patogenii-excepție sunt în text).
     2 M: MacConkey (roz-mov), colonii mari, lucioase, curgătoare, roz (Klebsiella e lactozo+); zoom: bacil cu capsulă (halou clar în jur).
     3 untoase: Sabouraud, colonii crem, opace (Candida) + o colonie pufoasă de mucegai (filamente).
     4 cățărare: Proteus pe geloza lactozată albastră (lactozo−, mediul rămâne albastru): valuri concentrice pornesc din punctul de
       însămânțare și acoperă placa; două tulpini diferite din 2 puncte se întâlnesc și NU se amestecă → linia Dieneș rămâne între ele.
     5 pigment: stânga Pseudomonas: pigmentul VERDE difuzează din colonie în mediu (mediul se colorează); dreapta S. aureus: colonii
       galben-aurii, mediul rămâne necolorat (pigment nedifuzibil). */
  const SX = [95, 257, 419, 581, 743, 905], SY = 150, SR = 58;
  const BIG = [650, 590], BR = 240;
  const BASE = [M.agar, M.agar, M.mac, M.sab, M.lactB, '#e9d9a6'];
  const NM = ['S', 'R', 'M', 'untoase', 'cățărare', 'pigment'];
  const R = rng(21); const POS = []; for (let k = 0; k < 9; k++) POS.push([(R() - 0.5) * 1.3, (R() - 0.5) * 1.3, 0.7 + R() * 0.6]);
  function draw1(c, k, x, y, r, u, tt) {
    const s = r / 248;
    if (k === 0) POS.forEach(([dx, dy, q]) => colony(c, x + dx * r, y + dy * r, 22 * s * q * u + 0.1, '#f6efe0', { ow: 2.5, light: '#ffffff' }));
    if (k === 1) POS.forEach(([dx, dy, q]) => colony(c, x + dx * r, y + dy * r, 26 * s * q * u + 0.1, '#e6dcc4', { ow: 2.5, rough: true, shade: '#cbbf9f' }));
    if (k === 2) POS.slice(0, 6).forEach(([dx, dy, q]) => { const X = x + dx * r, Y = y + dy * r, rr = 34 * s * q * u + 0.1; const pth = new Path2D(); pth.ellipse(X, Y + rr * 0.25 * u, rr, rr * (1 + 0.35 * u), 0, 0, 7); c.save(); c.fillStyle = '#e45a8a'; c.fill(pth); c.strokeStyle = OUT; c.lineWidth = 2.5; c.stroke(pth); c.globalAlpha = 0.7; c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(X - rr * 0.35, Y - rr * 0.3, rr * 0.28, rr * 0.18, -0.5, 0, 7); c.fill(); c.restore(); });
    if (k === 3) { POS.slice(0, 7).forEach(([dx, dy, q]) => colony(c, x + dx * r, y + dy * r, 24 * s * q * u + 0.1, '#fbf6e6', { ow: 2.5, shade: '#e8dcbc' }));
      c.save(); c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 2.5 * s + 0.6; const X = x + 0.42 * r, Y = y + 0.45 * r; for (let j = 0; j < 30; j++) { const a = j / 30 * 6.283; const L = 60 * s * u * (0.7 + 0.3 * Math.sin(j * 2.3)); c.beginPath(); c.moveTo(X, Y); c.lineTo(X + Math.cos(a) * L, Y + Math.sin(a) * L); c.stroke(); } c.restore(); }
    if (k === 4) {
      const src = [[x - 0.45 * r, y - 0.1 * r], [x + 0.45 * r, y + 0.1 * r]];
      const lim = 0.48 * r * 2 * u; // cât a acoperit fiecare tulpină
      src.forEach(([X, Y], j) => { c.save(); c.beginPath(); if (j === 0) c.rect(x - r - 5, y - r - 5, r - 6 * s, 2 * r + 10); else c.rect(x + 6 * s, y - r - 5, r + 5, 2 * r + 10); c.clip();
        for (let w = 7; w >= 1; w--) { const rr = lim * w / 7; if (rr < 2) continue; c.fillStyle = w % 2 ? 'rgba(232,240,236,.55)' : 'rgba(150,190,200,.35)'; c.beginPath(); c.arc(X, Y, rr, 0, 7); c.fill(); }
        c.restore(); colony(c, X, Y, 8 * s + 0.5, '#eef2ee', { ow: 2 }); });
      if (u > 0.85) { c.save(); c.strokeStyle = OUT; c.lineWidth = 5 * s + 1; c.beginPath(); c.moveTo(x, y - r); c.lineTo(x, y + r); c.stroke(); c.restore(); }
    }
    if (k === 5) {
      const L = [[-0.55, -0.2], [-0.35, 0.3], [-0.6, 0.35]], Rt = [[0.4, -0.3], [0.55, 0.15], [0.3, 0.4]];
      L.forEach(([dx, dy]) => halo(c, x + dx * r, y + dy * r, 120 * s * u, '#4fae6a', 0.75));
      L.forEach(([dx, dy]) => colony(c, x + dx * r, y + dy * r, 16 * s * u + 0.1, '#b9d98a', { ow: 2.5 }));
      Rt.forEach(([dx, dy]) => colony(c, x + dx * r, y + dy * r, 18 * s * u + 0.1, '#f2b72a', { ow: 2.5, light: '#ffe08a' }));
    }
  }
  return {
    home: HOME,
    anchors: SX.map((x) => [x + 44, SY - 62]),
    phase: (i) => ['S: netede', 'R: rugoase', 'M: mucoase', 'untoase: levuri', 'cățărare: Proteus', 'pigment'][i] || 'colonia = o clonă',
    draw(g, t, b) {
      bg(g); const tt = TT(t); const { k, u } = cyc(b, t, 6, 4.2);
      SX.forEach((x, j) => { const a = j === k ? 1 : 0.5; plateIn(g, x, SY, SR, BASE[j], (c) => draw1(c, j, x, SY, SR, 1, tt), { alpha: a }); txt(g, NM[j], x, SY + SR + 30, 17, j === k ? M.hi : M.cream, { alpha: a }); });
      lead(g, SX[k], SY + SR + 46, BIG[0] - 60, BIG[1] - BR - 14, 0.7);
      plateIn(g, BIG[0], BIG[1], BR, BASE[k], (c) => draw1(c, k, BIG[0], BIG[1], BR, u, tt));
      const sub = ['geloză simplă · forma patogenilor', 'de regulă nepatogene', 'MacConkey · capsulă (Klebsiella)', 'Sabouraud · levuri; pufoase = mucegaiuri', 'geloză lactozată · 2 tulpini → linia Dieneș', 'difuzibil (Pseudomonas) | nedifuzibil (S. aureus)'];
      txt(g, sub[k], BIG[0], BIG[1] + BR + 34, 17, M.cream);
      if (k === 2 && u > 0.5) { const Z = [230, 420]; ell(g, Z[0], Z[1], 92, 92, '#2b2230', { ow: 4, sc: '#ffe7d6', alpha: u }); ell(g, Z[0], Z[1], 70, 42, 'rgba(255,255,255,.18)', { ow: 3, sc: 'rgba(255,255,255,.75)', dash: [8, 6], alpha: u }); bacillus(g, Z[0], Z[1], 84, 30, 0, M.gramN, u); txt(g, 'capsulă', Z[0], Z[1] + 118, 16, '#ffe7d6', { alpha: u }); }
      if (k === 4 && u > 0.85) txt(g, 'linia Dieneș', BIG[0] + 80, BIG[1] - BR + 40, 17, M.hi);
      if (k === 5) { txt(g, 'mediul verde', BIG[0] - 140, BIG[1] - BR - 20, 16, '#9fe0a8', { alpha: u }); txt(g, 'doar colonia', BIG[0] + 140, BIG[1] - BR - 20, 16, '#ffd36a', { alpha: u }); }
      ring(g, SX[k], SY, SR + 16, SR + 16, 1);
    },
  };
}

/* ================================================================ 11 · ANSA, EPUIZAREA ȘI SECTORUL */
function flame(g, x, y, s, t, a = 1) {
  g.save(); g.globalAlpha = clamp(a); g.fillStyle = '#7d7a86'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(x - 18 * s, y, 36 * s, 90 * s, 6); g.fill(); g.stroke();
  const f = 1 + 0.08 * Math.sin(TT(t) * 14);
  [[1, '#4f8fe6'], [0.6, '#9fd0ff']].forEach(([k, c]) => { g.fillStyle = c; g.beginPath(); g.moveTo(x - 16 * s * k, y); g.quadraticCurveTo(x - 16 * s * k, y - 60 * s * k * f, x, y - 110 * s * k * f); g.quadraticCurveTo(x + 16 * s * k, y - 60 * s * k * f, x + 16 * s * k, y); g.closePath(); g.fill(); });
  g.restore();
}
export function b_streak() {
  /* CE TREBUIE SĂ SE VADĂ
     0 Ansa sterilă: lângă flacără (dreapta sus), în ordine: flambezi (firul se înroșește) → răcești lângă flacără (redevine gri) → încarci
       colonia (bulina pe buclă) → flambezi din nou după folosire. Dedesubt: ansa (buclă) pentru striuri și lichid; firul (drept) pentru înțepare.
     1 Sectorul 1 (sus-stânga pe placă): ansa descarcă produsul în zigzag des → creștere confluentă („gazon”).
     2 Sectoarele 2 și 3: ÎNAINTE de fiecare sector ansa se flambează; primul striu al sectorului nou TRAVERSEAZĂ capătul sectorului anterior
       (de acolo ia germeni, nu din produs) → sectorul 2 colonii lipite, sectorul 3 colonii rare.
     3 Sectorul 4: germenii ajung câte unul → colonii izolate; ansa repică o colonie → cultura pură. Placa se incubează întoarsă:
       condensul picură pe capac, nu pe geloză.
     4 Sectorul (placa mică): câte o tulpină deja izolată pe fiecare sector; creștere pe striu, fără colonii izolate; 2 tulpini de Proteus
       vecine se opresc una în fața celeilalte (linia Dieneș). */
  const C = [350, 560], RP = 270;
  // sectoarele: zigzaguri (în sensul acelor de ceasornic: sus-stânga → sus-dreapta → jos-dreapta → jos-stânga)
  const zig = (x0, y0, x1, y1, n, amp, ang) => { const pts = []; for (let k = 0; k <= n; k++) { const u = k / n; const s = k % 2 ? amp : -amp; pts.push([lerp(x0, x1, u) + Math.cos(ang) * s, lerp(y0, y1, u) + Math.sin(ang) * s]); } return pts; };
  const S = [
    zig(C[0] - 200, C[1] - 40, C[0] - 40, C[1] - 210, 10, 46, 0.78),
    [[C[0] - 70, C[1] - 150], ...zig(C[0] + 20, C[1] - 210, C[0] + 210, C[1] - 40, 7, 40, 2.36)],
    [[C[0] + 150, C[1] - 70], ...zig(C[0] + 200, C[1] + 30, C[0] + 40, C[1] + 210, 6, 40, 0.78)],
    [[C[0] + 70, C[1] + 160], ...zig(C[0] - 30, C[1] + 215, C[0] - 210, C[1] + 60, 4, 46, 2.36)],
  ];
  const along = (P, n) => { const Q = curve(P, 6); const out = []; for (let k = 0; k < n; k++) { const q = at(Q, (k + 0.5) / n); out.push([q[0], q[1]]); } return out; };
  const COL = [along(S[1].slice(1), 34), along(S[2].slice(1), 14), along(S[3].slice(1), 6)];
  const PICK = COL[2][3];
  const SP = [830, 760], SR = 130;
  return {
    home: HOME,
    anchors: [[870, 70], [C[0] - 190, C[1] - 210], [C[0] + 230, C[1] - 150], [C[0] - 220, C[1] + 210], [SP[0] + 120, SP[1] - 120]],
    phase: (i) => ['ansa sterilă', 'sectorul 1: gazon', 'sectoarele 2–3', 'sectorul 4: colonii izolate', 'însămânțarea în sector'][i] || 'epuizarea = o diluție pe suprafață',
    draw(g, t, b) {
      bg(g); const tt = TT(t); const p = P(b, t, 5, 0.75); const pp = [0, 1, 2, 3, 4].map(p);
      // ---- panoul ansei (dreapta sus)
      const F = [880, 230]; flame(g, F[0], F[1], 1, t);
      const u0 = b.i === 0 ? pp[0] : b.i < 0 ? loopT(tt, 8) : 0;
      const stp = Math.min(3, Math.floor(u0 * 4)); const LBL = ['flambezi la roșu', 'răcești lângă flacără', 'încarci colonia', 'flambezi din nou'];
      let lx = F[0] - 20, ly = F[1] - 70, hot = 0;
      if (b.i === 0 || b.i < 0) { const f = u0 * 4 - stp; if (stp === 0) hot = clamp(f * 1.4); if (stp === 1) { hot = 1 - clamp(f * 1.3); lx = F[0] - 80; ly = F[1] - 40; } if (stp === 2) { lx = lerp(F[0] - 80, 700, f); ly = lerp(F[1] - 40, 380, f); } if (stp === 3) hot = clamp(f * 1.4);
        loop(g, lx, ly, -0.5, hot); if (stp >= 2 && stp < 3) dot(g, lx + 12, ly, 7, '#efd27a', { ow: 2 });
        if (stp === 2) plateIn(g, 700, 400, 40, M.agar, (c) => colony(c, 700, 400, 10, '#efd27a', { ow: 2 }));
        txt(g, LBL[stp], 820, 330, 18, M.hi); }
      const aT = b.i < 0 || b.i === 0 ? 1 : 0.45;
      loop(g, 840, 452, 0, 0, aT); txt(g, 'ansa (buclă): striuri, lichid', 760, 490, 15, M.cream, { alpha: aT });
      g.save(); g.globalAlpha = aT; g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 9; g.beginPath(); g.moveTo(640, 540); g.lineTo(880, 540); g.stroke(); g.strokeStyle = '#cfd6da'; g.lineWidth = 4; g.stroke(); g.strokeStyle = '#7b5a3a'; g.lineWidth = 10; g.beginPath(); g.moveTo(800, 540); g.lineTo(880, 540); g.stroke(); g.restore();
      txt(g, 'firul (drept): înțepare', 760, 572, 15, M.cream, { alpha: aT });
      // ---- placa de epuizare
      const aE = b.i === 4 ? 0.45 : 1;
      plateIn(g, C[0], C[1], RP, M.agar, (c) => {
        // striurile
        S.forEach((P0, k) => { const u = pp[k + 1]; if (u <= 0) return; tube(c, P0, 3, 'rgba(160,130,70,.55)', { ow: 0, u1: u }); });
        // sectorul 1: gazon (bandă confluentă de-a lungul striurilor)
        const g1 = clamp((pp[1] - 0.55) / 0.45); if (g1 > 0) tube(c, S[0], 46, mix('#efe2b0', '#e8dfc8', 1), { ow: 0, alpha: g1 * 0.95 });
        if (g1 > 0) tube(c, S[0], 30, '#f6efe0', { ow: 0, alpha: g1 });
        // 2 · lipite, 3 · rare (apar după ce striul e tras), 4 · izolate
        const gr2 = clamp((pp[2] - 0.35) / 0.3), gr3 = clamp((pp[2] - 0.75) / 0.25), gr4 = clamp((pp[3] - 0.45) / 0.35);
        COL[0].forEach(([x, y]) => colony(c, x, y, 12 * gr2 + 0.01, '#f6efe0', { ow: 2, alpha: gr2 }));
        COL[1].forEach(([x, y]) => colony(c, x, y, 11 * gr3 + 0.01, '#f6efe0', { ow: 2, alpha: gr3 }));
        COL[2].forEach(([x, y], j) => { if (j === 3 && pp[3] > 0.9 && b.i === 3) return; colony(c, x, y, 13 * gr4 + 0.01, '#f6efe0', { ow: 2.5, alpha: gr4 }); });
      }, { alpha: aE });
      [[C[0] - 120, C[1] - 120, '1'], [C[0] + 120, C[1] - 120, '2'], [C[0] + 120, C[1] + 120, '3'], [C[0] - 120, C[1] + 120, '4']].forEach(([x, y, s]) => txt(g, s, x, y, 30, 'rgba(255,255,255,.55)', { sc: 'rgba(42,21,52,.5)', alpha: aE }));
      // ansa pe placă: urmează striul sectorului activ; înainte de sectoarele 2–4 se flambează (roșie la început)
      const kk = b.i >= 1 && b.i <= 3 ? b.i : -1;
      if (kk >= 1) { const segs = kk === 2 ? [1, 2] : [kk === 1 ? 0 : 3]; const u = pp[kk];
        let si = segs[0], uu = u; if (segs.length === 2) { si = u < 0.5 ? 1 : 2; uu = u < 0.5 ? u * 2 : (u - 0.5) * 2; }
        const q = at(curve(S[si], 14), clamp(uu / 0.6)); const hot = si > 0 ? 1 - clamp(uu * 6) : 0;
        if (kk === 3 && u > 0.82) { const v = clamp((u - 0.82) / 0.18); loop(g, lerp(PICK[0], 760, v), lerp(PICK[1], 820, v) - Math.sin(v * Math.PI) * 80, -0.5); dot(g, lerp(PICK[0], 760, v) + 12, lerp(PICK[1], 820, v) - Math.sin(v * Math.PI) * 80, 7, '#f6efe0', { ow: 2 }); }
        else loop(g, q[0], q[1], -0.5, hot);
        if (hot > 0.05) txt(g, 'flambezi ansa', C[0], C[1] + RP + 40, 18, '#ffb36b', { alpha: hot });
      }
      if (b.i === 3 && pp[3] > 0.9) { txt(g, '→ cultura pură', 760, 870, 17, C2); }
      // placa întoarsă (incubare)
      if (b.i === 3 || b.i < 0) { const X = 470, Y = 880; g.save(); g.fillStyle = 'rgba(220,245,255,.25)'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(X - 70, Y - 20, 140, 34, 6); g.fill(); g.stroke(); g.fillStyle = M.agar; g.fillRect(X - 64, Y - 16, 128, 11); g.restore(); const v = loopT(tt * 0.8, 1); dot(g, X + 40, lerp(Y - 2, Y + 8, v), 3.5, '#bfe6ff', { ow: 1 }); txt(g, 'întoarsă: condensul nu picură pe geloză', X - 100, Y + 36, 13, '#d8d0c4', { align: 'left' }); }
      // ---- însămânțarea în sector
      const a4 = b.i < 0 || b.i === 4 ? 1 : 0.35;
      plateIn(g, SP[0], SP[1], SR, M.agar, (c) => {
        c.strokeStyle = OUT; c.lineWidth = 3; [0, 2.094, 4.189].forEach((a) => { c.beginPath(); c.moveTo(SP[0], SP[1]); c.lineTo(SP[0] + Math.cos(a - 1.57) * SR, SP[1] + Math.sin(a - 1.57) * SR); c.stroke(); });
        const u = b.i === 4 ? pp[4] : 1; const cols = ['#f6efe0', '#e8f0ec', '#eef2ee'];
        [-0.52, 1.57, 3.67].forEach((a, j) => { const X = SP[0] + Math.cos(a) * SR * 0.52, Y = SP[1] + Math.sin(a) * SR * 0.52; const P0 = zig(X - 26, Y - 20, X + 26, Y + 20, 4, 12, a); tube(c, P0, 12 * u + 0.1, cols[j], { ow: 2, u1: Math.max(0.02, u) }); });
      }, { alpha: a4 });
      txt(g, 'sector: o tulpină pe sector', SP[0], SP[1] + SR + 34, 16, M.cream, { alpha: a4 });
      hl(g, b, 4, SP[0], SP[1], SR + 22, SR + 22);
    },
  };
}

/* ================================================================ 12 · OXIGENUL DECIDE UNDE CREȘTE: PANTĂ, ÎNȚEPARE, LICHID, BULION */
export function b_oxygen() {
  /* CE TREBUIE SĂ SE VADĂ
     Sus-stânga: 0 panta: ansa trage un striu în zigzag DE LA BAZĂ (jos-dreapta pe pantă) SPRE VÂRF (sus-stânga) → cultură în masă pe pantă.
     1 înțeparea: firul intră drept în centrul coloanei până aproape de fund și iese pe ACELAȘI traiect.
     Sus-dreapta (eprubeta mare cu lichid): O₂ (bule albastre) intră DOAR prin suprafață și rămâne în stratul de sus.
       2 aerobii stricți cresc numai sus; 3 anaerobii numai jos, pe fund (sau agregate / lanțuri care cad); 4 facultativii peste tot.
     Jos: cele 7 aspecte în bulion (din LP): tulburare uniformă (stafilococ, Salmonella) · depozit grunjos (streptococ) · depozit floconos ca vata
       (B. anthracis) · văl subțire (C. diphtheriae) · membrană groasă plisată (BK) · inel la menisc, pe pereți (E. coli) · peliculă + mediu verde
       (Pseudomonas). Se aprind: 2 → văl, membrană, inel, peliculă (sus); 3 → depozitele (jos); 4 → tulburarea uniformă. */
  const BR = '#efe0a8';
  const BX = [92, 222, 352, 482, 612, 742, 872], BY = 520, BW = 62, BH = 270;
  const LBL = [['tulburare', 'uniformă', 'stafilococ,\nSalmonella'], ['depozit', 'grunjos', 'streptococ'], ['depozit', 'floconos', 'B. anthracis'], ['văl', 'subțire', 'C. diphtheriae'], ['membrană', 'plisată', 'BK'], ['inel', 'pe pereți', 'E. coli'], ['peliculă', '+ verde', 'Pseudomonas']];
  const GRP = [4, 3, 3, 2, 2, 2, 2];
  const r0 = rng(31); const DOTS = Array.from({ length: 60 }, () => [r0(), r0()]);
  return {
    home: HOME,
    anchors: [[175, 140], [335, 140], [690, 100], [690, 380], [930, 200]],
    phase: (i) => ['panta', 'înțeparea', 'sus: aerobi stricți', 'jos: anaerobi / lanțuri', 'peste tot: facultativi'][i] || 'O₂ intră doar prin suprafață',
    draw(g, t, b) {
      bg(g); const tt = TT(t); const p = P(b, t, 5, 0.75);
      const al = (...k) => (b.i < 0 || k.includes(b.i) ? 1 : 0.42);
      // ---- panta
      { const x = 110, y = 90, w = 76, h = 330; const u = p(0); const yL = y + 120, yR = y + 250;
        const Z = []; for (let k = 0; k <= 10; k++) { const v = k / 10; const s = k % 2 ? 14 : -14; Z.push([lerp(x + 24, x - 24, v) + s * 0.4, lerp(yR - 10, yL + 14, v) + s]); }
        vial(g, x, y, w, h, (c) => { slantFill(c, x, w, yL, yR, '#e6d39a'); if (u > 0) tube(c, Z, 9, '#f6efe0', { ow: 2, u1: Math.max(0.02, u), alpha: 1 }); }, { alpha: al(0) });
        if (b.i === 0 && u < 1) { const q = at(curve(Z), u); loop(g, q[0], q[1], -1.1); }
        txt(g, 'pantă', x, y + h + 26, 18, M.cream, { alpha: al(0) }); txt(g, 'bază → vârf', x, y + h + 50, 14, '#d8d0c4', { alpha: al(0) });
      }
      // ---- înțeparea
      { const x = 270, y = 90, w = 76, h = 330; const u = p(1); const depth = y + h - 40;
        const d = u < 0.5 ? lerp(y + 40, depth, u * 2) : lerp(depth, y + 40, (u - 0.5) * 2);
        vial(g, x, y, w, h, (c) => { fillFrom(c, x, w, y + 70, '#e6d39a'); if (u > 0) { c.fillStyle = 'rgba(150,120,60,.65)'; c.fillRect(x - 2.5, y + 70, 5, (u < 0.5 ? d : depth) - y - 70); } }, { alpha: al(1) });
        if (b.i === 1 && u < 1) { g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 8; g.beginPath(); g.moveTo(x, d); g.lineTo(x, d - 260); g.stroke(); g.strokeStyle = '#cfd6da'; g.lineWidth = 3.5; g.stroke(); g.strokeStyle = '#7b5a3a'; g.lineWidth = 10; g.beginPath(); g.moveTo(x, d - 200); g.lineTo(x, d - 260); g.stroke(); g.restore(); arr(g, x + 50, u < 0.5 ? y + 120 : depth - 30, x + 50, u < 0.5 ? y + 200 : depth - 110, '#fff3e6', 4, 0.8); }
        txt(g, 'înțepare', x, y + h + 26, 18, M.cream, { alpha: al(1) }); txt(g, 'mobilitate, H₂S', x, y + h + 50, 14, '#d8d0c4', { alpha: al(1) });
      }
      // ---- eprubeta cu lichid: O₂ doar sus
      { const x = 560, y = 70, w = 150, h = 360; const top = y + 40;
        const mode = b.i >= 2 ? b.i : b.i < 0 ? 2 + (REDUCED ? 0 : Math.floor(t / 3) % 3) : -1; const u = b.i >= 2 ? p(b.i) : 1;
        vial(g, x, y, w, h, (c) => {
          fillFrom(c, x, w, top, BR);
          const gr = c.createLinearGradient(0, top, 0, top + 120); gr.addColorStop(0, 'rgba(120,190,255,.55)'); gr.addColorStop(1, 'rgba(120,190,255,0)'); c.fillStyle = gr; c.fillRect(x - w / 2, top, w, 120);
          for (let j = 0; j < 10; j++) { const v = loopT(tt * 0.35 + j * 0.1, 1); dot(c, x - 60 + (j * 41) % 120, top - 10 + v * 110, 5, '#8fd3ff', { ow: 1.5, alpha: (1 - v) }); }
          DOTS.forEach(([a, bb2], j) => { let X = x - 62 + a * 124, Y; if (mode === 2) Y = top + 8 + bb2 * 30; else if (mode === 3) Y = y + h - 70 + bb2 * 40; else if (mode === 4) Y = top + 10 + bb2 * (h - 90); else return; if (j / 60 > u) return; bacillus(c, X, Y, 12, 5, j, M.gramN, 1); });
        }, { alpha: b.i >= 0 && b.i < 2 ? 0.45 : 1 });
        txt(g, 'O₂', x + 100, top + 20, 20, '#8fd3ff');
        if (mode >= 2) txt(g, ['suprafață: aerob strict', 'fund: anaerob', 'difuz: facultativ'][mode - 2], x, y + h + 26, 18, M.hi);
        txt(g, 'O₂ intră în lichid\ndoar prin suprafață', 830, 150, 17, '#bfe6ff');
        txt(g, 'sus = vor aer\njos = lanțuri grele\npeste tot = dispersați', 830, 300, 16, '#d8d0c4');
      }
      // ---- cele 7 aspecte în bulion
      BX.forEach((x, k) => { const on2 = b.i < 0 || b.i === GRP[k]; const a = on2 ? 1 : 0.38; const top = BY + 50;
        vial(g, x, BY, BW, BH, (c) => {
          fillFrom(c, x, BW, top, k === 6 ? mix(BR, '#5fb07a', 0.7) : k === 0 ? mix(BR, '#cdbb85', 0.9) : BR);
          const R = rng(40 + k);
          if (k === 0) for (let j = 0; j < 46; j++) dot(c, x - 26 + R() * 52, top + 10 + R() * (BH - 90), 2.6, '#8f7a4c', { ow: 0 });
          if (k === 1) for (let j = 0; j < 22; j++) dot(c, x - 22 + R() * 44, BY + BH - 32 - R() * 26, 4.5, '#cdb98a', { ow: 1.2 });
          if (k === 2) { c.strokeStyle = '#f3ecd8'; c.lineWidth = 3; for (let j = 0; j < 7; j++) { const X = x - 20 + j * 7; c.beginPath(); c.moveTo(X, BY + BH - 16); c.bezierCurveTo(X - 8, BY + BH - 40, X + 8, BY + BH - 56, X, BY + BH - 74); c.stroke(); } }
          if (k === 3) { c.fillStyle = 'rgba(245,238,220,.95)'; c.fillRect(x - BW / 2, top - 2, BW, 6); }
          if (k === 4) { c.fillStyle = '#d9c491'; c.strokeStyle = OUT; c.lineWidth = 2; c.beginPath(); c.moveTo(x - BW / 2, top + 12); for (let j = 0; j <= 6; j++) c.lineTo(x - BW / 2 + j * BW / 6, top - 4 + (j % 2) * 16); c.lineTo(x + BW / 2, top + 14); c.closePath(); c.fill(); c.stroke(); }
          if (k === 5) { c.fillStyle = 'rgba(240,232,210,.95)'; c.fillRect(x - BW / 2, top - 6, 9, 14); c.fillRect(x + BW / 2 - 9, top - 6, 9, 14); }
          if (k === 6) { c.fillStyle = '#cfe6c2'; c.fillRect(x - BW / 2, top - 3, BW, 10); }
        }, { alpha: a, ow: 5 });
        txt(g, LBL[k][0] + '\n' + LBL[k][1], x, BY + BH + 32, 14, M.cream, { alpha: a }); txt(g, LBL[k][2], x, BY + BH + 84, 14, on2 ? C2 : '#7d7488', { alpha: a });
      });
      hl(g, b, 2, 677, BY + 70, 250, 60); hl(g, b, 3, 287, BY + BH - 30, 120, 60); hl(g, b, 4, BX[0], BY + 150, 50, 140);
    },
  };
}

/* ================================================================ 13 · TUBURILE BIOCHIMICE: TSI, H₂S, INDOL, UREE, SIMMONS */
export function b_biochem() {
  /* CE TREBUIE SĂ SE VADĂ (culori reale: TSI și ureea cu roșu fenol, Simmons cu bromtimol, Kovacs → inel roșu)
     Sus-stânga: chimia punctului (substrat → produs → culoare). Sus-dreapta: raftul de referință TSI: K/A, A/A, H₂S, K/K (tot roșu).
     Jos: TSI mare (pantă sus, coloană jos), SIM, Simmons + / −, uree + / −.
     0 K/A: TSI roșu → TOT galben (acid din glucoză, care e de 10× mai puțină: bara glucozei e mică și se golește) → glucoza s-a terminat →
       pe PANTĂ (cu O₂) germenul degradează peptonele → amine → panta redevine ROȘIE de la suprafață; COLOANA (fără O₂) rămâne GALBENĂ.
     1 A/A: fermentează și lactoza / zaharoza (bare mari) → acid mult → rămâne galben peste tot; bule de gaz în coloană, mediul se crapă.
     2 H₂S: aminoacizii cu sulf → H₂S + sărurile de fier → sulfură NEAGRĂ, în coloană (de jos în sus); Salmonella (K/A + negru).
     3 indol: în SIM, triptofan → indol; picături de Kovacs cad pe suprafață → INEL ROȘU sus (E. coli +).
     4 uree: ureaza → NH₃ (urcă din pantă) → alcalin → galben-pai devine ROZ, de la pantă în jos (Proteus, în câteva ore); tubul − rămâne galben-pai.
     5 Simmons: citratul = singura sursă de C → creștere pe pantă → alcalin → VERDE devine ALBASTRU de sus în jos (Klebsiella +); E. coli − rămâne verde. */
  const RED = '#d42c3c', YEL = '#f2c62e', SL = '#e04a4a';
  const TX = 130, TY = 360, TW = 100, TH = 470, YL = TY + 110, YR = TY + 210; // panta: suprafața urcă spre stânga
  const pos = [[310, 'SIM'], [480, 'Simmons +'], [590, 'Simmons −'], [770, 'uree +'], [880, 'uree −']];
  return {
    home: HOME,
    anchors: [[TX + 76, YL + 40], [TX - 76, TY + 330], [TX + 76, TY + 420], [pos[0][0] + 56, TY + 70], [pos[3][0] + 56, YL], [pos[1][0] + 56, YL]],
    phase: (i) => ['K/A: doar glucoza', 'A/A: + lactoză / zaharoză', 'negru = H₂S', 'indol: inel roșu', 'ureaza → roz', 'citrat → albastru'][i] || 'TSI · SIM · Simmons · uree',
    draw(g, t, b) {
      bg(g); const tt = TT(t); const { k, u } = cyc(b, t, 6, 5.2, 0.8);
      const done = (j) => (b.i < 0 ? false : b.i > j);
      // ---- TSI mare
      let slant = RED, col = RED, black = 0, gas = 0;
      if (k === 0 || k === 2) { const a1 = clamp(u / 0.4), a2 = clamp((u - 0.5) / 0.4); slant = mix(mix(RED, YEL, a1), RED, a2); col = mix(RED, YEL, a1); if (k === 2) black = clamp((u - 0.45) / 0.5); }
      else if (k === 1) { slant = col = mix(RED, YEL, clamp(u / 0.45)); gas = clamp((u - 0.45) / 0.5); }
      else { slant = RED; col = YEL; black = 0; }
      vial(g, TX, TY, TW, TH, (c) => {
        slantFill(c, TX, TW, YL, YR, slant);
        // coloana = sub nivelul cel mai de jos al pantei
        c.fillStyle = col; c.fillRect(TX - TW / 2 - 3, YR + 4, TW + 6, 3000);
        if (k === 0 || k === 2) { const a2 = clamp((u - 0.5) / 0.4); c.fillStyle = mix(YEL, RED, a2); c.globalAlpha = 0; }
        c.globalAlpha = 1;
        if (black > 0) { c.fillStyle = M.black; const hgt = (TY + TH - YR - 20) * black; c.beginPath(); c.roundRect(TX - TW / 2 - 3, TY + TH - hgt, TW + 6, hgt + 10, 12); c.fill(); }
        if (gas > 0) { for (let j = 0; j < 7; j++) dot(c, TX - 30 + (j * 23) % 60, TY + TH - 40 - (j * 41) % 160, 7 * gas, 'rgba(255,255,255,.85)', { ow: 2 }); c.strokeStyle = OUT; c.lineWidth = 3; c.globalAlpha = gas; c.beginPath(); c.moveTo(TX - TW / 2, TY + 330); c.lineTo(TX - 6, TY + 342); c.lineTo(TX + 18, TY + 336); c.lineTo(TX + TW / 2, TY + 348); c.stroke(); c.globalAlpha = 1; }
        // creșterea pe pantă
        for (let j = 0; j < 6; j++) dot(c, lerp(TX - 34, TX + 34, j / 5), lerp(YL, YR, (j + 0.5) / 6) - 2, 4, '#f6efe0', { ow: 1.2 });
      });
      if ((k === 0 || k === 2) && u > 0.5) for (let j = 0; j < 4; j++) { const v = loopT(tt * 0.7 + j * 0.25, 1); dot(g, TX + 80 - v * 50, YL - 60 + v * 60 + j * 8, 5, '#8fd3ff', { ow: 1.5, alpha: Math.sin(v * Math.PI) }); }
      txt(g, 'pantă (O₂)', TX - 60, TY - 40, 15, '#bfe6ff', { align: 'left' }); txt(g, 'coloană', TX + 64, TY + 370, 15, M.cream, { align: 'left' });
      txt(g, 'TSI', TX, TY + TH + 28, 20, M.cream);
      txt(g, ['K/A', 'A/A', 'K/A + H₂S', '', '', ''][k], TX, TY + TH + 54, 17, M.hi);
      // ---- SIM: indol
      { const x = pos[0][0], a = k === 3 || b.i < 0 ? 1 : done(3) ? 1 : 0.4; const ring2 = k === 3 ? clamp((u - 0.35) / 0.4) : done(3) ? 1 : 0; const top = TY + 90;
        vial(g, x, TY, 74, TH - 40, (c) => { fillFrom(c, x, 74, top, mix('#ecd9a0', '#d6c38a', 0.6)); for (let j = 0; j < 40; j++) dot(c, x - 30 + ((j * 37) % 60), top + 30 + ((j * 53) % 300), 2.2, '#8f7a4c', { ow: 0 }); if (ring2 > 0) { c.fillStyle = '#e0303a'; c.fillRect(x - 40, top - 2, 80, 22 * ring2); } }, { alpha: a });
        if (k === 3 && u < 0.6) for (let j = 0; j < 3; j++) { const v = clamp(u * 2.4 - j * 0.3); if (v > 0 && v < 1) dot(g, x - 12 + j * 12, lerp(TY - 60, top, v), 6, '#f3e3a0', { ow: 2 }); }
        txt(g, 'SIM + Kovacs', x, TY + TH - 12, 16, M.cream, { alpha: a }); }
      // ---- Simmons + / −
      [[1, M.simB], [2, M.simG]].forEach(([j, endC]) => { const x = pos[j][0]; const v = k === 5 ? clamp(u / 0.85) : done(5) ? 1 : 0; const a = k === 5 || b.i < 0 || done(5) ? 1 : 0.4;
        vial(g, x, TY, 74, TH - 40, (c) => { slantFill(c, x, 74, YL, YR, M.simG); slantFill(c, x, 74, YL, YR, endC); slantFill(c, x, 74, YL + (TH - 40) * v, YR + (TH - 40) * v, M.simG); if (j === 1) for (let q = 0; q < 5; q++) dot(c, x - 24 + q * 12, lerp(YL, YR, (q + 0.5) / 5) - 2, 3.5 * v + 0.01, '#f6efe0', { ow: 1 }); }, { alpha: a });
        txt(g, pos[j][1], x, TY + TH - 12, 15, M.cream, { alpha: a }); });
      txt(g, 'Klebsiella', pos[1][0], TY + TH + 14, 14, '#9fc2ff', { alpha: 0.9 }); txt(g, 'E. coli', pos[2][0], TY + TH + 14, 14, '#9fe0a8', { alpha: 0.9 });
      // ---- uree + / −
      [[3, M.urPink], [4, M.ureaY]].forEach(([j, endC]) => { const x = pos[j][0]; const v = k === 4 ? clamp(u / 0.85) : done(4) ? 1 : 0; const a = k === 4 || b.i < 0 || done(4) ? 1 : 0.4;
        vial(g, x, TY, 74, TH - 40, (c) => { slantFill(c, x, 74, YL, YR, M.ureaY); slantFill(c, x, 74, YL, YR, endC); slantFill(c, x, 74, YL + (TH - 40) * v, YR + (TH - 40) * v, M.ureaY); }, { alpha: a });
        if (j === 3 && k === 4) for (let q = 0; q < 4; q++) { const w = loopT(tt * 0.6 + q * 0.25, 1); dot(g, x - 15 + q * 10, lerp(YL - 6, YL - 80, w), 5, '#ffffff', { alpha: Math.sin(w * Math.PI), ow: 1.5 }); }
        txt(g, pos[j][1], x, TY + TH - 12, 15, M.cream, { alpha: a }); });
      txt(g, 'Proteus', pos[3][0], TY + TH + 14, 14, '#ffb3d0', { alpha: 0.9 });
      // ---- chimia (sus-stânga)
      panel(g, 24, 30, 610, 270);
      const CH = [
        ['glucoză 1× · lactoză 10× · zaharoză 10×', 'acid → galben; glucoza se termină → pe pantă: peptone → amine → roșu'],
        ['lactoză / zaharoză fermentate', 'acid mult → galben peste tot · adesea gaz'],
        ['aminoacizi cu sulf → H₂S', '+ săruri de Fe / Pb → sulfură NEAGRĂ'],
        ['triptofan → indol', '+ Kovacs → inel ROȘU'],
        ['uree → NH₃ (+ CO₂)', 'alcalin → roșul fenol devine ROZ'],
        ['citrat = unica sursă de C', 'alcalin → bromtimolul devine ALBASTRU'],
      ];
      txt(g, CH[k][0], 330, 70, 19, M.cream); txt(g, CH[k][1], 330, 260, 15, '#d8d0c4');
      if (k <= 1) { // barele de zahăr: glucoza de 10× mai puțină
        const used = k === 0 ? clamp(u / 0.4) : clamp(u / 0.9);
        [['glucoză', 1, '#f2c62e'], ['lactoză', 10, '#7fe0ff'], ['zaharoză', 10, '#c9b3ff']].forEach(([n, q, c0], j) => { const y = 120 + j * 42; const w = 40 * q; const left = j === 0 ? 1 - used : k === 1 ? 1 - used * 0.6 : 1;
          txt(g, n, 110, y, 16, M.cream, { align: 'right' }); g.save(); g.strokeStyle = OUT; g.lineWidth = 3; g.strokeRect(124, y - 12, w, 24); g.fillStyle = c0; g.fillRect(124, y - 12, w * left, 24); g.restore(); });
      } else {
        const sub0 = [null, null, ['aa cu S', '#e6d39a'], ['triptofan', '#e6d39a'], ['uree', '#f3e9c6'], ['citrat', '#cfe6c2']][k];
        const prod = [null, null, ['sulfură Fe', M.black], ['indol', '#e0303a'], ['NH₃', M.urPink], ['alcalin', M.simB]][k];
        const v = loopT(tt * 0.35, 1);
        pill(g, 130, 160, 150, 50, sub0[1], sub0[0], { size: 17 });
        g.save(); const mx = 330; g.fillStyle = '#7fe0ff'; g.strokeStyle = OUT; g.lineWidth = 4; const mo = 0.35 + 0.25 * Math.sin(tt * 5); g.beginPath(); g.moveTo(mx, 160); g.arc(mx, 160, 40, mo, 6.283 - mo); g.closePath(); g.fill(); g.stroke(); g.restore();
        txt(g, 'enzima', 330, 222, 14, '#cfefff');
        dot(g, lerp(190, 300, clamp(v * 2)), 160, 10, sub0[1], { alpha: v < 0.5 ? 1 : 0, ow: 2 });
        if (v > 0.5) dot(g, lerp(370, 500, (v - 0.5) * 2), 160, 12, prod[1], { ow: 2 });
        pill(g, 540, 160, 150, 50, prod[1], prod[0], { size: 17, col: k === 2 || k === 5 ? '#ffffff' : OUT });
      }
      // ---- raftul de referință TSI
      [['K/A', RED, YEL, 0], ['A/A', YEL, YEL, 0], ['H₂S', RED, YEL, 1], ['K/K', RED, RED, 0]].forEach(([n, s0, c0, bl], j) => { const x = 700 + j * 80, y = 60; const on3 = (j === 0 && k === 0) || (j === 1 && k === 1) || (j === 2 && k === 2);
        vial(g, x, y, 40, 190, (c) => { slantFill(c, x, 40, y + 60, y + 100, s0); c.fillStyle = c0; c.fillRect(x - 24, y + 104, 48, 300); if (bl) { c.fillStyle = M.black; c.fillRect(x - 24, y + 120, 48, 300); c.fillStyle = YEL; c.fillRect(x - 24, y + 104, 48, 14); } }, { ow: 4, alpha: on3 || b.i < 0 ? 1 : 0.55 });
        txt(g, n, x, y + 218, 16, on3 ? M.hi : M.cream); });
      txt(g, 'K/K = tot roșu', 820, 312, 14, '#d8d0c4');
    },
  };
}

/* ================================================================ 14 · TESTELE RAPIDE ȘI IDENTIFICAREA */
export function b_ident() {
  /* CE TREBUIE SĂ SE VADĂ
     Sus, 4 panouri:
     0 catalaza: pe lamă, 2 picături de H₂O₂; ansa pune cultura: stafilococ → bule de O₂ urcă (2 H₂O₂ → 2 H₂O + O₂); streptococ → nimic.
       Capcana: colonia luată de pe geloza-sânge aduce hematii (catalază proprie) → bule false la streptococ.
     1 oxidaza: banda umezită; colonia întinsă pe ea → în secunde zona devine MOV ÎNCHIS (Pseudomonas, Neisseria); enterobacterii: rămâne pal.
     2 coagulaza: tubul cu plasmă citratată + S. aureus → fibrinogenul devine fibrină: plasma se încheagă; tubul se înclină și cheagul NU curge;
       tubul de control (fără coagulază) rămâne lichid și curge.
     3 mobilitatea: SIM semisolid înțepat: imobil → creștere doar pe traiect; mobil → tulbureala pornește din traiect SPRE pereți (flageli).
     Jos, 4 identificarea: o colonie izolată → Gram; jetonul coboară pe ramură: coci Gram + (violet) → catalaza (+ Staphylococcus → coagulaza + =
       S. aureus; − Streptococcus → hemoliza α / β) și bacili Gram − (roz) → oxidaza (− enterobacterii → lactoză, TSI, indol, urează;
       + Pseudomonas → pigment verde). Ordinea: întâi lamă (rapid), apoi mediile diferențiale (încă o noapte). */
  const P4 = [[30, 40], [520, 40], [30, 300], [520, 300]], PW = 450, PH = 240;
  const N = { root: [500, 590], cp: [270, 650], bn: [730, 650], cat: [270, 710], ox: [730, 710], sta: [160, 770], str: [380, 770], ent: [620, 770], pse: [840, 770], coa: [160, 860], hem: [380, 860], dif: [620, 860], pig: [840, 860] };
  const ED = [['root', 'cp'], ['root', 'bn'], ['cp', 'cat'], ['bn', 'ox'], ['cat', 'sta'], ['cat', 'str'], ['ox', 'ent'], ['ox', 'pse'], ['sta', 'coa'], ['str', 'hem'], ['ent', 'dif'], ['pse', 'pig']];
  const PATHS = [['root', 'cp', 'cat', 'sta', 'coa'], ['root', 'cp', 'cat', 'str', 'hem'], ['root', 'bn', 'ox', 'ent', 'dif'], ['root', 'bn', 'ox', 'pse', 'pig']];
  return {
    home: HOME,
    anchors: P4.map(([x, y]) => [x + PW - 24, y + 24]).concat([[N.root[0] + 150, N.root[1] - 10]]),
    phase: (i) => ['catalaza', 'oxidaza', 'coagulaza', 'mobilitatea', 'colonie → gen'][i] || 'întâi lama, apoi mediile',
    draw(g, t, b) {
      bg(g); const tt = TT(t); const p = P(b, t, 5, 0.75);
      P4.forEach(([x, y], k) => { panel(g, x, y, PW, PH, { fill: b.i === k ? 'rgba(14,156,134,.14)' : 'rgba(255,240,228,.05)' }); txt(g, ['Catalaza', 'Oxidaza', 'Coagulaza', 'Mobilitatea'][k], x + 20, y + 26, 19, M.cream, { align: 'left' }); });
      const al = (k) => (b.i < 0 || b.i === k ? 1 : 0.45);
      // 0 · catalaza
      { const [x0, y0] = P4[0]; const u = b.i === 0 ? p(0) : 1; const a = al(0);
        g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(220,245,255,.35)'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(x0 + 30, y0 + 120, 390, 54, 6); g.fill(); g.stroke(); g.restore();
        [[x0 + 130, 1, 'stafilococ +'], [x0 + 320, 0, 'streptococ −']].forEach(([x, pos2, lab]) => { ell(g, x, y0 + 130, 54, 16, 'rgba(190,230,255,.75)', { ow: 3, alpha: a });
          if (pos2 && u > 0.3) for (let j = 0; j < 9; j++) { const v = loopT(tt * 0.9 + j * 0.11, 1); dot(g, x - 36 + (j * 19) % 72, lerp(y0 + 128, y0 + 60, v), 4 + 4 * v, 'rgba(255,255,255,.9)', { ow: 1.5, alpha: a * (1 - v) * clamp(u * 2 - 0.6) }); }
          txt(g, lab, x, y0 + 202, 15, M.cream, { alpha: a }); });
        if (b.i === 0 && u < 0.35) loop(g, x0 + 130 + 10, lerp(y0 + 60, y0 + 126, u / 0.35), -0.6);
        txt(g, 'bule în H₂O₂ = +', x0 + PW / 2, y0 + 60, 15, '#d8d0c4', { alpha: a });
      }
      // 1 · oxidaza
      { const [x0, y0] = P4[1]; const u = b.i === 1 ? p(1) : 1; const a = al(1);
        [[x0 + 120, 1, 'Pseudomonas, Neisseria +'], [x0 + 330, 0, 'enterobacterii −']].forEach(([x, pos2, lab]) => { g.save(); g.globalAlpha = a; g.fillStyle = '#efe6f6'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(x - 80, y0 + 90, 160, 70, 8); g.fill(); g.stroke();
          const v = clamp(u * 1.6); g.fillStyle = pos2 ? mix('#efe6f6', '#3b1470', clamp(u * 2 - 0.5)) : '#e6dcc4'; g.beginPath(); g.ellipse(x, y0 + 125, 40 * v + 1, 18 * v + 1, 0, 0, 7); g.fill(); g.restore();
          txt(g, lab, x, y0 + 196, 14, M.cream, { alpha: a }); });
        txt(g, 'mov închis în secunde = +', x0 + PW / 2, y0 + 60, 14, '#d8d0c4', { alpha: a });
      }
      // 2 · coagulaza
      { const [x0, y0] = P4[2]; const u = b.i === 2 ? p(2) : 1; const a = al(2); const clot = clamp(u * 2), tilt = clamp(u * 2 - 1) * 1.2;
        [[x0 + 130, 1, 'S. aureus: coagul'], [x0 + 320, 0, 'fără coagulază']].forEach(([x, pos2, lab]) => { const cy = y0 + 110;
          g.save(); g.translate(x, cy); g.rotate(-tilt); g.translate(-x, -cy);
          vial(g, x, y0 + 60, 54, 140, (c) => { const plasma = '#f2c98a'; if (pos2 || tilt < 0.05) { const lvl = pos2 ? y0 + 120 : y0 + 120; c.fillStyle = pos2 ? mix(plasma, '#d9a35a', clot) : plasma; c.fillRect(x - 40, lvl, 80, 300); if (pos2 && clot > 0.5) { c.strokeStyle = 'rgba(120,70,20,.6)'; c.lineWidth = 2; for (let q = 0; q < 5; q++) { c.beginPath(); c.moveTo(x - 24, y0 + 135 + q * 12); c.lineTo(x + 24, y0 + 130 + q * 13); c.stroke(); } } }
            else { // lichidul rămâne orizontal: în cadrul tubului rotit apare înclinat → desenăm nivelul rotit invers
              c.save(); c.translate(x, cy + 60); c.rotate(tilt); c.fillStyle = plasma; c.fillRect(-120, -8, 240, 300); c.restore(); } }, { alpha: a, ow: 5 });
          g.restore(); txt(g, lab, x, y0 + 222, 14, M.cream, { alpha: a }); });
        txt(g, 'plasmă citratată (tub, 24 h) · lamă', x0 + PW / 2 + 60, y0 + 26, 13, '#d8d0c4', { alpha: a });
      }
      // 3 · mobilitatea
      { const [x0, y0] = P4[3]; const u = b.i === 3 ? p(3) : 1; const a = al(3);
        [[x0 + 130, 0, 'imobil: doar pe traiect'], [x0 + 320, 1, 'mobil: se tulbură']].forEach(([x, mob, lab]) => {
          vial(g, x, y0 + 50, 60, 160, (c) => { fillFrom(c, x, 60, y0 + 76, '#ecd9a0'); c.fillStyle = 'rgba(140,110,55,.85)'; c.fillRect(x - 2.5, y0 + 80, 5, 110);
            if (mob) { c.fillStyle = 'rgba(140,110,55,.4)'; c.beginPath(); c.ellipse(x, y0 + 140, 4 + 34 * u, 70, 0, 0, 7); c.fill(); for (let j = 0; j < 8; j++) { const v = loopT(tt * 0.5 + j * 0.125, 1); bacillus(c, x + (j % 2 ? 1 : -1) * v * 30 * u, y0 + 96 + j * 12, 9, 4, j, M.gramN, 1); } } }, { alpha: a, ow: 5 });
          txt(g, lab, x, y0 + 230, 14, M.cream, { alpha: a }); });
        txt(g, 'SIM semisolid · flageli', x0 + PW / 2 + 40, y0 + 26, 14, '#d8d0c4', { alpha: a });
      }
      // ---- arborele identificării
      const a4 = b.i < 0 || b.i === 4 ? 1 : 0.5;
      ED.forEach(([s, e]) => { g.save(); g.globalAlpha = a4 * 0.75; g.strokeStyle = '#cfc6d6'; g.lineWidth = 3; g.beginPath(); g.moveTo(N[s][0], N[s][1] + 14); g.lineTo(N[e][0], N[e][1] - 14); g.stroke(); g.restore(); });
      const NL = { root: ['colonie izolată → Gram', '#9ff0dd'], cp: ['coci Gram +', '#c9a7f2'], bn: ['bacili Gram −', '#ffb3c4'], cat: ['catalaza', '#f6efe0'], ox: ['oxidaza', '#f6efe0'], sta: ['+ Staphylococcus', '#f6efe0'], str: ['− Streptococcus', '#f6efe0'], ent: ['− enterobacterii', '#f6efe0'], pse: ['+ Pseudomonas', '#f6efe0'], coa: ['coagulază + = S. aureus', '#e6dcc4'], hem: ['hemoliza α · β', '#e6dcc4'], dif: ['lactoză, TSI, indol, urează', '#e6dcc4'], pig: ['pigment verde', '#bfe6c4'] };
      Object.entries(NL).forEach(([kk, [s, c0]]) => pill(g, N[kk][0], N[kk][1], kk === 'root' ? 250 : kk.length === 3 && ['coa', 'dif'].includes(kk) ? 214 : 196, 30, c0, s, { size: 14, alpha: a4, ow: 3, r: 10 }));
      coccus(g, N.cp[0] - 120, N.cp[1], 9, M.gram, a4); coccus(g, N.cp[0] - 104, N.cp[1] + 4, 9, M.gram, a4); bacillus(g, N.bn[0] + 120, N.bn[1], 30, 10, 0.3, M.gramN, a4);
      if (b.i === 4 || b.i < 0) { const v = b.i === 4 ? p(4) : loopT(tt, 8); const q = Math.min(3, Math.floor(v * 4)); const f = v * 4 - q; const path = PATHS[q].map((n) => N[n]); const Q = curve(path, 6); const pt = at(Q, clamp(f / 0.8));
        dot(g, pt[0], pt[1], 12, M.hi, { ow: 3 }); }
      txt(g, 'întâi lama (rapid) → apoi mediile (încă o noapte)', 500, 915, 15, '#d8d0c4', { alpha: a4 });
    },
  };
}
