// Scene noi (comune LP 3 și LP 4, structura oficială 2026): coperta și harta generice, formatul OSPE oficial, fișa „La OSPE”,
// tabla generică (casete + săgeți), distribuția ionilor / receptorul-canal, eficacitate vs potență, insulina (receptor-enzimă),
// cei 3 iepuri, glaucomul cu unghi deschis / închis, GABA-A, placa motorie (anticolinesterazice, curarizante), efedrina,
// down- / up-regulation, acatalazia, glucocorticoizii (receptori intracelulari), adrenalina în șocul anafilactic.
import { W, H, HOME, cam, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, loopT, txt, pill, dot, ell, arr, lead, cross, check, tube, curve, at, flow,
  ligand, membrane, receptor, gprot, enzyme, channel, myofil, heart, iris, icon, glowRing, blob, paint, bb, tri, bronchus, vesselX, gauge, mastocyte } from './fk.js';

const hi = (g, x, y, w, h, on, r = 22) => { if (!on) return; g.save(); g.shadowColor = C.hi; g.shadowBlur = 24; g.strokeStyle = C.hi; g.lineWidth = 6; g.beginPath(); g.roundRect(x - 4, y - 4, w + 8, h + 8, r); g.stroke(); g.restore(); };
const stp = (b, k, f = 0.7) => (b.i < 0 || b.i > k ? 1 : b.i < k ? 0 : ease(clamp(b.bt / (b.bd * f))));
const litK = (b, k) => k === undefined || b.i < 0 || (Array.isArray(k) ? k.some((x) => x <= b.i) : k <= b.i);
const nowK = (b, k) => k !== undefined && (Array.isArray(k) ? k.includes(b.i) : k === b.i);

/* =================================================== COPERTA GENERICĂ (4 carduri cu iconițe) */
export function coverG({ spec }) {
  const o = spec.sceneOpts; const R = [[40, 50], [520, 50], [40, 490], [520, 490]];
  return {
    home: HOME, anchors: R.map(([x, y]) => [x + 30, y + 30]),
    draw(g, t, b) {
      bg(g);
      o.cards.forEach((c, i) => {
        const [x, y] = R[i]; const act = b.i === i || (b.i < 0 && Math.floor(t / 2.4) % 4 === i);
        panel(g, x, y, 440, 400, { fill: act ? 'rgba(255,207,133,.13)' : 'rgba(255,236,200,.06)', stroke: act ? C.hi : 'rgba(255,225,180,.2)', lw: act ? 5 : 3 });
        const n = c.icons.length; c.icons.forEach((ic, j) => icon(g, ic, x + 220 + (j - (n - 1) / 2) * (n > 3 ? 92 : 120), y + 165, n > 3 ? 0.78 : 1, c.io ? c.io[j] : {}));
        txt(g, c.t, x + 220, y + 300, 25, C.hi, { maxW: 410 });
        if (c.sub) txt(g, c.sub, x + 220, y + 352, 19, C.cream, { w: 700, maxW: 410 });
      });
    },
  };
}

/* =================================================== HARTA GENERICĂ (lanțul sus + 4 carduri) */
export function hartaG({ spec }) {
  const o = spec.sceneOpts; const R = [[40, 300], [520, 300], [40, 610], [520, 610]];
  const CC = ['#ffd36e', C.gs, C.gq, C.muscle, C.camp];
  return {
    home: HOME, anchors: R.map(([x, y]) => [x + 30, y + 30]),
    draw(g, t, b) {
      bg(g);
      panel(g, 30, 40, 940, 220, { fill: 'rgba(194,122,16,.16)' });
      txt(g, o.top, 500, 85, 22, C.cream, { w: 700 });
      const run = loopT(t, 6) * 6; const n = o.chain.length; const sx = 900 / n;
      o.chain.forEach((c, j) => { const x = 50 + sx * (j + 0.5); const a = REDUCED ? 1 : clamp(run - j * 0.7) > 0 ? 1 : 0.45; pill(g, x, 175, sx - 26, 66, CC[j % 5], c, { size: 19, alpha: a, glow: a > 0.9 && run - j * 0.7 < 1 ? 1 : 0 }); if (j < n - 1) arr(g, x + sx / 2 - 12, 175, x + sx / 2 + 8, 175, C.cream, 5, 0.9); });
      o.cards.forEach(([h, l1, l2], i) => {
        const [x, y] = R[i]; const act = b.i === i;
        panel(g, x, y, 440, 280, { fill: act ? 'rgba(255,207,133,.14)' : 'rgba(255,236,200,.06)', stroke: act ? C.hi : 'rgba(255,225,180,.2)', lw: act ? 5 : 3 });
        txt(g, h, x + 220, y + 60, 27, C.hi, { maxW: 410 });
        txt(g, l1, x + 220, y + 135, 22, C.cream, { w: 700, maxW: 410 });
        txt(g, l2, x + 220, y + 190, 22, C.cream, { w: 700, maxW: 410 });
      });
    },
  };
}

/* =================================================== FORMATUL OSPE OFICIAL (fișa model) */
export function ospeFmt() {
  const SUB = [
    ['1. Pacient obez, substanță lipofilă', [['a', 'de ce doze mai mari?', '1,5 p'], ['b', 'ce etapă farmacocinetică?', '0,5 p']]],
    ['2. Picături de ochi: β2, fără activ. intr.', [['a', 'tipul de ligand', '0,5 p'], ['b', 'ce fel de receptori?', '1 p'], ['c', 'efect pe PIO + cum?', '1 + 1 p'], ['d', 'vase + contraindicație', '1,5 p']]],
    ['3. Dependența psihică', [['', 'explicați', '2 p']]],
  ];
  return {
    home: HOME, anchors: [[52, 60], [568, 60], [568, 470], [568, 690]],
    phase: (i) => ['fișa: subiecte cu subpuncte', 'baremul: pe noțiuni', 'regula +50%', '7 min · 9 + 1 p'][i] || '',
    draw(g, t, b) {
      bg(g);
      // fișa
      const sp = new Path2D(); sp.roundRect(30, 40, 500, 860, 16); paint(g, sp, '#fbf3e2', null, null, [30, 40, 500, 860], OUT, 6); hi(g, 30, 40, 500, 860, b.i === 0, 16);
      txt(g, 'O.S.P.E. · fișa studentului', 280, 82, 22, OUT, { stroke: false });
      let y = 140;
      SUB.forEach(([h, rows]) => {
        txt(g, h, 50, y, 18, '#5a3a10', { stroke: false, align: 'left', maxW: 460 }); y += 40;
        rows.forEach(([l, q, p]) => { if (l) { dot(g, 70, y, 15, '#ffd36e', { ow: 3 }); txt(g, l, 70, y, 16, OUT, { stroke: false }); } txt(g, q, 96, y, 17, '#3a2a1a', { stroke: false, align: 'left', w: 600, maxW: 300 }); pill(g, 462, y, 82, 32, '#bfe8c8', p, { size: 15, ow: 3, r: 10 }); y += 46; });
        y += 22;
      });
      txt(g, 'timp 7 minute · nu puneți întrebări', 280, 790, 17, '#7a2a1a', { stroke: false, w: 700 });
      txt(g, 'maxim 9 p + 1 p din oficiu', 280, 830, 19, '#7a2a1a', { stroke: false });
      // baremul pe noțiuni
      panel(g, 560, 40, 410, 390, { stroke: b.i === 1 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 1 ? 5 : 3 });
      txt(g, 'baremul: puncte pe noțiuni', 765, 78, 20, C.hi);
      [['receptori membranari', '0,5'], ['cuplați cu proteine Gs', '0,5'], ['scade presiunea intraoc.', '1'], ['↓ sinteza umorii apoase', '1']].forEach(([n, p], j) => { pill(g, 720, 140 + j * 66, 300, 48, '#fff3e0', n, { size: 16 }); pill(g, 910, 140 + j * 66, 70, 40, '#bfe8c8', p, { size: 16, r: 10 }); });
      txt(g, '0 · parțial · maxim pe subpunct', 765, 400, 17, C.dim, { w: 700 });
      // regula +50%
      panel(g, 560, 450, 410, 210, { stroke: b.i === 2 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 2 ? 5 : 3 });
      txt(g, 'max. +50% noțiuni', 765, 488, 20, C.key);
      for (let j = 0; j < 8; j++) { const ok = j < 6; const x = 600 + j * 47; pill(g, x, 560, 38, 46, ok ? (j < 4 ? '#bfe8c8' : '#ffe9a8') : '#5a4a4a', String(j + 1), { size: 16, col: ok ? OUT : '#bbb', r: 10 }); if (!ok) cross(g, x, 560, 12, C.key, 1); }
      txt(g, 'se cer 4 → contează primele 6', 765, 625, 18, C.cream, { w: 700 });
      // timpul
      panel(g, 560, 680, 410, 220, { stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3 });
      const X0 = 590, PX = 50;
      for (let m = 0; m < 7; m++) { const p = new Path2D(); p.roundRect(X0 + m * PX + 2, 730, PX - 4, 46, 8); g.save(); g.fillStyle = m === 0 ? '#6d6178' : '#C27A10'; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(p); g.restore(); txt(g, String(m + 1), X0 + m * PX + PX / 2, 800, 16, C.dim, { w: 700 }); }
      const hand = REDUCED ? 3 : (t * 0.6) % 7; dot(g, X0 + hand * PX, 722, 8, '#fff');
      txt(g, '7 minute la stație', 765, 845, 20, C.cream); txt(g, 'contează ce spui cu voce tare', 765, 878, 16, C.dim, { w: 700 });
    },
  };
}

/* =================================================== FIȘA „LA OSPE” (coloana îngustă): subpuncte + noțiunile de barem */
export function fisa({ spec }) {
  const o = spec.sceneOpts; const WS = 600, HS = 897; const R = o.rows; const n = R.length;
  const top = 122, bot = 778; const rh = (bot - top) / n;
  let lay = null;
  const layout = (g) => {
    g.save(); g.font = '800 16px Inter, "Segoe UI", sans-serif';
    lay = R.map((r) => { const items = []; let x = 0, line = 0; r.n.forEach((s) => { const w = Math.min(440, g.measureText(s).width + 30); if (x + w > 450) { x = 0; line++; } items.push([x, line, w, s]); x += w + 8; }); return items; });
    g.restore();
  };
  return {
    W: WS, H: HS, home: cam(300, 448, 1), anchors: [],
    phase: (i) => (i >= 0 && spec.script[i] ? `${spec.script[i].tm} · ${spec.script[i].at}` : ''),
    draw(g, t, b) {
      bg(g, WS, HS); if (!lay) layout(g);
      const sp = new Path2D(); sp.roundRect(20, 20, 560, 780, 16); paint(g, sp, '#fbf3e2', null, null, [20, 20, 560, 780], OUT, 6);
      txt(g, o.title, 300, 88, 21, OUT, { stroke: false, maxW: 530 });
      R.forEach((r, k) => {
        const y = top + k * rh; const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.55;
        if (on) { const hp = new Path2D(); hp.roundRect(30, y + 4, 540, rh - 8, 14); g.save(); g.fillStyle = 'rgba(255,211,110,.35)'; g.fill(hp); g.strokeStyle = '#C27A10'; g.lineWidth = 4; g.stroke(hp); g.restore(); }
        dot(g, 62, y + 34, 20, on ? '#ffd36e' : '#e8d9bd', { ow: 3, alpha: a }); txt(g, r.l, 62, y + 34, 18, OUT, { stroke: false, alpha: a });
        txt(g, r.q, 96, y + 34, 16, '#5a3a10', { stroke: false, align: 'left', alpha: a, maxW: 470 });
        lay[k].forEach(([x, line, w, s], j) => pill(g, 100 + x + w / 2, y + 74 + line * 40, w, 32, j < (r.key || 99) ? '#ffcfc4' : '#d9eedd', s, { size: 15, ow: 3, r: 10, alpha: a, col: OUT }));
      });
      txt(g, 'noțiunile de barem întâi · scurt', 300, 830, 18, C.hi);
      txt(g, o.foot || 'max. +50% noțiuni: contează doar primele', 300, 866, 16, C.dim, { w: 700, maxW: 560 });
    },
  };
}

/* =================================================== TABLA GENERICĂ: panouri, casete, săgeți, note, iconițe */
export function board({ spec }) {
  const o = spec.sceneOpts; const WW = o.narrow ? 600 : 1000, HH = o.narrow ? 897 : 934;
  return {
    W: WW, H: HH, home: cam(WW / 2, HH / 2, 1), anchors: o.anchors || [],
    phase: (i) => (o.phase ? o.phase[i] || '' : ''),
    draw(g, t, b) {
      bg(g, WW, HH);
      (o.panels || []).forEach((p) => { const on = nowK(b, p.k), a = litK(b, p.k) ? 1 : 0.45; panel(g, p.x, p.y, p.w, p.h, { fill: p.fill || (on ? 'rgba(255,207,133,.13)' : 'rgba(255,236,200,.05)'), stroke: on ? C.hi : p.stroke || 'rgba(255,225,180,.2)', lw: on ? 5 : 3, alpha: a }); if (p.t) txt(g, p.t, p.x + p.w / 2, p.y + (p.ty || 30), p.ts || 20, p.tc || C.hi, { alpha: a, maxW: p.w - 20 }); });
      (o.edges || []).forEach((e) => { const a = litK(b, e.k) ? 1 : 0.3; arr(g, e.a[0], e.a[1], e.b[0], e.b[1], e.col || C.cream, e.w || 5, a * 0.9); if (o.flow && nowK(b, e.k)) for (let j = 0; j < 3; j++) { const v = ((j / 3) + t * 0.6) % 1; dot(g, lerp(e.a[0], e.b[0], v), lerp(e.a[1], e.b[1], v), 6, e.col || C.hi, { ow: 2 }); } });
      (o.nodes || []).forEach((n) => {
        const a = litK(b, n.k) ? 1 : 0.35; const on = nowK(b, n.k);
        if (n.ico) icon(g, n.ico, n.x, n.y, n.s || 0.8, { alpha: a, ...(n.io || {}) });
        else pill(g, n.x, n.y, n.w || 200, n.h || 50, n.c || '#fff3e0', n.t, { size: n.size || 17, alpha: a, glow: on ? 1 : 0, col: n.tc || OUT, r: n.r });
      });
      (o.notes || []).forEach((n) => txt(g, n.t, n.x, n.y, n.size || 18, n.col || C.cream, { alpha: litK(b, n.k) ? 1 : 0.4, w: n.w || 700, align: n.align, maxW: n.maxW }));
      (o.crosses || []).forEach((c) => cross(g, c.x, c.y, c.s || 14, C.key, litK(b, c.k) ? 1 : 0));
      (o.checks || []).forEach((c) => check(g, c.x, c.y, c.s || 14, C.gs, litK(b, c.k) ? 1 : 0));
    },
  };
}

/* =================================================== DISTRIBUȚIA IONILOR · POMPE vs CANALE · RECEPTORUL-CANAL */
export function ionDist() {
  const CX = 200, CY = 245, CR = 165; const MY = 690, CHX = 500;
  return {
    home: HOME, anchors: [[CX - 120, CY - 150], [530, 300], [770, 300], [CHX - 120, MY - 120]],
    phase: (i) => ['în celulă vs în afara ei', 'pompa: activ, cu ATP', 'canalul: pasiv', 'receptorul-canal'][i] || '',
    draw(g, t, b) {
      bg(g);
      // 1. celula
      panel(g, 20, 30, 450, 420, { stroke: b.i === 0 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 0 ? 5 : 3 });
      ell(g, CX, CY, CR, CR, 'rgba(246,227,200,.16)', { ow: 6, sc: C.mem });
      const p = new Path2D(); p.roundRect(CX - 120, CY - 15, 100, 70, 12); g.save(); g.strokeStyle = C.cream; g.lineWidth = 3; g.stroke(p); g.restore();
      txt(g, 'Ca²⁺', CX - 70, CY + 8, 26, C.ca); txt(g, 'depozite', CX - 70, CY + 38, 13, C.cream, { w: 700 });
      [['A⁻', CX + 60, CY - 80, 44, '#c8b6ff'], ['K⁺', CX + 60, CY + 30, 44, '#7fe8ff'], ['Na⁺', CX - 40, CY - 95, 18, C.na], ['Cl⁻', CX + 5, CY - 50, 18, '#9fe0ff'], ['Ca²⁺', CX + 70, CY + 100, 18, C.ca]].forEach(([s, x, y, z, c]) => txt(g, s, x, y, z, c));
      [['Na⁺', 410, 120, 40, C.na], ['Cl⁻', 410, 210, 40, '#9fe0ff'], ['K⁺', 410, 290, 18, '#7fe8ff'], ['Ca²⁺', 410, 370, 38, C.ca]].forEach(([s, x, y, z, c]) => txt(g, s, x, y, z, c));
      txt(g, 'în celulă', CX, CY + CR + 22, 17, C.dim, { w: 700 }); txt(g, 'în afară', 410, 425, 17, C.dim, { w: 700 });
      // 2–3. pompa și canalul
      [[490, 'pompă', 'transport activ', 1], [730, 'canal', 'transport pasiv', 2]].forEach(([x, h, s, k]) => {
        const on = b.i === k; panel(g, x, 30, 230, 420, { stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3 });
        txt(g, h, x + 115, 68, 24, C.hi); txt(g, s, x + 115, 100, 17, C.cream, { w: 700 });
        membrane(g, x + 10, x + 220, 265, { h: 40 });
        txt(g, k === 1 ? 'puțini' : 'mulți', x + 115, 140, 16, C.dim, { w: 700 }); txt(g, k === 1 ? 'mulți' : 'puțini', x + 115, 420, 16, C.dim, { w: 700 });
        for (let j = 0; j < (k === 1 ? 2 : 7); j++) dot(g, x + 40 + (j * 37) % 150, 170 + (j % 2) * 26, 7, C.na, { ow: 2 });
        for (let j = 0; j < (k === 1 ? 7 : 2); j++) dot(g, x + 40 + (j * 37) % 150, 350 + (j % 2) * 26, 7, C.na, { ow: 2 });
        if (k === 1) { const pp = new Path2D(); pp.roundRect(x + 85, 230, 60, 70, 14); paint(g, pp, '#7fe8ff', null, null, [x + 85, 230, 60, 70], OUT, 4); pill(g, x + 182, 320, 60, 30, '#ffe7a0', 'ATP', { size: 14, r: 10, ow: 3 }); }
        else channel(g, x + 115, 265, 0.8, C.nch, { s: 0.55 });
        const mv = on ? 1 : 0.35; for (let j = 0; j < 2; j++) { const v = ((j / 2) + t * 0.5) % 1; dot(g, x + 115, k === 1 ? lerp(340, 190, v) : lerp(190, 340, v), 9, C.na, { ow: 2.5, alpha: mv * Math.sin(v * Math.PI) }); }
        arr(g, x + 205, k === 1 ? 330 : 200, x + 205, k === 1 ? 200 : 330, k === 1 ? C.key : C.gs, 5, 0.9);
        txt(g, k === 1 ? 'împotriva\ngradientului' : 'cu\ngradientul', x + 48, 265, 14, C.cream, { w: 700 });
      });
      // 4. receptorul-canal
      panel(g, 20, 470, 960, 440, { stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3 });
      txt(g, 'receptor cuplat cu canal ionic', 270, 505, 20, C.hi);
      const u = b.i === 3 ? clamp(b.bt / (b.bd * 0.8)) : b.i < 0 ? loopT(t, 8) : 0;
      membrane(g, 40, 720, MY, { h: 52, alpha: 1 });
      const lg = ease(clamp(u / 0.25)); const op = clamp((u - 0.25) / 0.12);
      channel(g, CHX, MY, op, C.nch, { s: 0.85 });
      ligand(g, lerp(CHX - 160, CHX - 48, lg), lerp(530, MY - 52, lg), C.ach, 'L', 20);
      for (let j = 0; j < 9; j++) dot(g, 90 + j * 70, 590 + (j % 2) * 30, 8, C.na, { ow: 2 });
      if (op > 0.5) for (let j = 0; j < 4; j++) { const v = ((j / 4) + t * 0.6) % 1; dot(g, CHX + Math.sin(j) * 5, lerp(MY - 60, MY + 120, v), 8, C.na, { ow: 2, alpha: Math.sin(v * Math.PI) }); }
      const ch = clamp((u - 0.5) / 0.2); g.save(); g.globalAlpha = ch * 0.5; g.fillStyle = C.nch; g.fillRect(60, MY + 40, 640, 10); g.restore();
      txt(g, 'sarcinile electrice din celulă se schimbă', 380, MY + 90, 17, C.nch, { alpha: ch, w: 700 });
      ['ligandul se atașează', 'canalul se deschide', 'ionii circulă cu gradientul', 'sarcini electrice modificate', 'răspuns'].forEach((s, j) => { pill(g, 850, 540 + j * 72, 230, 52, '#fff3e0', s, { size: 15, alpha: b.i === 3 ? 0.35 + 0.65 * clamp(u * 5 - j * 0.9) : b.i < 0 ? 1 : 0.5 }); if (j < 4) txt(g, '↓', 850, 576 + j * 72, 16, C.cream, { stroke: false }); });
    },
  };
}

/* =================================================== CAZUL 1 · EFICACITATE vs POTENȚĂ */
const sig = (x, m, s = 0.07) => 1 / (1 + Math.exp(-(x - m) / s));
export function effpot() {
  const X0 = 150, X1 = 900, Y0 = 760, Y1 = 220; const PX = (u) => lerp(X0, X1, u), PY = (e) => lerp(Y0, Y1, e);
  const A = { m: 0.28, mx: 0.55, c: '#5aa8ff', l: 'drug A' }, B = { m: 0.66, mx: 1, c: '#ff9a4a', l: 'drug B' };
  const drawC = (g, cv, u1) => { g.save(); g.lineJoin = 'round'; g.lineCap = 'round'; const N = Math.max(2, Math.floor(120 * u1)); for (const [cc, ww] of [[OUT, 13], [cv.c, 7]]) { g.strokeStyle = cc; g.lineWidth = ww; g.beginPath(); for (let k = 0; k <= N; k++) { const u = k / 120; const px = PX(u), py = PY(cv.mx * sig(u, cv.m)); k ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); } g.restore(); };
  const xAt = (cv, e) => cv.m + 0.07 * Math.log((e / cv.mx) / (1 - e / cv.mx));
  return {
    home: HOME, anchors: [[PX(0.55), PY(0.7)], [312, 100], [PX(0.6) + 30, PY(0.3) + 22], [PX(0.96) + 10, PY(0.78)]],
    phase: (i) => ['cele două curbe', 'același efect, altă doză', 'potența (y)', 'eficacitatea (x)'][i] || '',
    draw(g, t, b) {
      bg(g);
      g.save(); g.strokeStyle = C.cream; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(X0, Y1 - 50); g.lineTo(X0, Y0); g.lineTo(X1 + 30, Y0); g.stroke(); g.restore();
      arr(g, X1, Y0, X1 + 40, Y0, C.cream, 5); arr(g, X0, Y1 - 20, X0, Y1 - 60, C.cream, 5);
      txt(g, 'răspuns biologic', X0 + 10, Y1 - 85, 20, C.cream, { align: 'left' }); txt(g, 'log doza →', 760, Y0 + 45, 21, C.cream);
      const s0 = stp(b, 0);
      drawC(g, A, s0); drawC(g, B, s0);
      if (s0 > 0.9) { txt(g, A.l, PX(0.2), PY(0.55) - 34, 21, A.c); txt(g, B.l, PX(0.83), PY(1) + 40, 21, B.c); }
      // linia „același efect”
      const s1 = stp(b, 1); const e = 0.3;
      if (s1 > 0) { g.save(); g.globalAlpha = s1; g.setLineDash([10, 8]); g.strokeStyle = C.hi; g.lineWidth = 3; g.beginPath(); g.moveTo(X0, PY(e)); g.lineTo(PX(0.8), PY(e)); g.stroke(); g.restore(); txt(g, 'același efect', PX(0.03), PY(e) - 22, 17, C.hi, { align: 'left', alpha: s1 }); }
      panel(g, 330, 40, 470, 120, { stroke: b.i === 1 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 1 ? 5 : 3 });
      txt(g, 'doză mai mică pentru același efect = ?', 565, 100, 21, C.cream, { maxW: 440 });
      // potența: săgeata orizontală (y)
      const s2 = stp(b, 2); const xa = xAt(A, e), xb = xAt(B, e);
      if (s2 > 0) { arr(g, PX(xb), PY(e) + 22, PX(lerp(xb, xa, s2)), PY(e) + 22, C.gs, 7); txt(g, 'y = diferența de POTENȚĂ', PX((xa + xb) / 2), PY(e) + 64, 21, C.gs, { alpha: s2 }); }
      // eficacitatea: bara verticală (x)
      const s3 = stp(b, 3);
      g.save(); g.setLineDash([8, 8]); g.strokeStyle = 'rgba(255,243,230,.5)'; g.lineWidth = 2.5; for (const v of [A.mx, B.mx]) { g.beginPath(); g.moveTo(PX(0.45), PY(v)); g.lineTo(PX(0.98), PY(v)); g.stroke(); } g.restore();
      if (s3 > 0) { const xx = PX(0.93); arr(g, xx, PY(A.mx), xx, PY(lerp(A.mx, B.mx, s3)), C.key, 7); txt(g, 'x = diferența de\nEFICACITATE', PX(0.78), PY(0.78), 20, C.key, { alpha: s3 }); }
      txt(g, 'graficul din LP (redesenat)', 800, 905, 15, C.dim, { w: 600 });
    },
  };
}

/* =================================================== RECEPTORUL-ENZIMĂ: INSULINA */
export function insulin() {
  const MY = 520, RX = 230, PX2 = 420;
  const dia = (g, x, y, r, a = 1) => { g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(Math.PI / 4); const p = new Path2D(); p.rect(-r, -r, 2 * r, 2 * r); paint(g, p, '#8fd3f5', null, '#e8f8ff', [-r, -r, 2 * r, 2 * r], OUT, 4); g.restore(); };
  const rec = (g, x, glow, ph) => {
    for (const d of [-1, 1]) { const p = new Path2D(); p.roundRect(x + d * 22 - 13, MY - 30, 26, 120, 10); paint(g, p, '#a9a3e8', null, null, [x - 40, MY - 30, 80, 120], OUT, 4); ell(g, x + d * 26, MY - 80, 28, 40, '#c8c1f7', { ow: 4 }); txt(g, 'α', x + d * 26, MY - 80, 18, OUT, { stroke: false }); txt(g, 'β', x + d * 22, MY + 60, 16, OUT, { stroke: false }); }
    if (glow) glowRing(g, x, MY, 80, 130, 0, glow);
    if (ph > 0) for (let k = 0; k < 4; k++) { const d = k < 2 ? -1 : 1; dot(g, x + d * 48, MY + 40 + (k % 2) * 30, 13 * ph, '#ffd34a', { ow: 3 }); if (ph > 0.6) txt(g, 'P', x + d * 48, MY + 40 + (k % 2) * 30, 13, OUT, { stroke: false }); }
  };
  return {
    home: HOME, anchors: [[RX - 110, MY - 160], [RX + 90, MY + 120], [560, 590], [800, 720], [880, 360]],
    phase: (i) => ['insulina se leagă', 'autofosforilare (tirozină)', 'IRS → PI3K → Akt', 'translocarea GLUT4', 'glucoza intră'][i] || '',
    draw(g, t, b) {
      bg(g);
      const s = (k) => stp(b, k, 0.75);
      // vasul cu insulină
      const vp = new Path2D(); vp.roundRect(-20, 50, 1040, 170, 80); paint(g, vp, '#e6707e', '#c94a5a', '#ffb3bc', [0, 50, 1000, 170], OUT, 6);
      for (let j = 0; j < 6; j++) { const x = (j * 190 + t * 40) % 1100 - 50; ell(g, x, 150 + (j % 2) * 30, 30, 18, '#c9283d', { ow: 3 }); }
      for (let j = 0; j < 5; j++) dia(g, 330 + j * 140, 110 + (j % 2) * 40, 16);
      txt(g, 'insulină în sânge', 140, 135, 19, '#fff');
      txt(g, 'în afara celulei', 880, 300, 16, C.dim, { w: 700 }); txt(g, 'citoplasma', 880, 880, 16, C.dim, { w: 700 });
      membrane(g, 0, 1000, MY, { h: 54 });
      // 1. legarea
      const s1 = s(0); dia(g, lerp(330, RX, s1), lerp(150, MY - 135, s1), 20);
      rec(g, RX, b.i === 0 ? s1 : 0, 0); txt(g, 'receptor tirozin-kinazic', RX, MY + 150, 16, '#c8c1f7', { w: 700 });
      // 2. autofosforilare
      const s2 = s(1); dia(g, PX2, MY - 135, 20, s2 > 0 ? 1 : 0.3); rec(g, PX2, 0, s2); txt(g, 'autofosforilare', PX2, MY + 150, 16, '#ffd34a', { w: 700, alpha: 0.3 + 0.7 * s2 }); arr(g, RX + 70, MY - 90, PX2 - 70, MY - 90, C.cream, 5, 0.5 + 0.5 * s2);
      // 3. IRS → PI3K → Akt
      const s3 = s(2); ['IRS', 'PI3K', 'Akt'].forEach((n, j) => { const q = clamp(s3 * 3 - j); pill(g, 560, 620 + j * 80, 110, 48, ['#bcdcff', '#c8c1f7', '#ffc4c4'][j], n, { size: 18, alpha: 0.3 + 0.7 * q, glow: q > 0 && q < 1 ? 1 : 0 }); if (j < 2) arr(g, 560, 646 + j * 80, 560, 676 + j * 80, C.cream, 4, 0.3 + 0.7 * q); });
      arr(g, PX2 + 60, MY + 80, 505, 610, C.cream, 4, 0.3 + 0.7 * s3);
      // 4. veziculele cu GLUT4 urcă și fuzionează
      const s4 = s(3); const GX = [760, 860];
      arr(g, 620, 780, 700, 790, C.cream, 4, 0.3 + 0.7 * s4);
      GX.forEach((x, j) => { const y = lerp(800 - j * 20, MY + 40, s4); if (s4 < 0.95) { ell(g, x, y, 44, 44, 'rgba(230,220,255,.85)', { ow: 4 }); for (let q = 0; q < 2; q++) { const p = new Path2D(); p.roundRect(x - 16 + q * 18, y - 22, 12, 44, 5); paint(g, p, '#ff7a7a', null, null, [x - 16, y - 22, 30, 44], OUT, 3); } } else { for (let q = 0; q < 2; q++) { const p = new Path2D(); p.roundRect(x - 16 + q * 18, MY - 40, 12, 80, 5); paint(g, p, '#ff7a7a', null, null, [x - 16, MY - 40, 30, 80], OUT, 3); } } });
      txt(g, s4 > 0.9 ? 'GLUT4 în membrană' : 'vezicule cu GLUT4', 810, s4 > 0.9 ? MY + 75 : 870, 16, '#ff9a9a', { w: 700 });
      // 5. glucoza intră
      const s5 = s(4);
      for (let j = 0; j < 6; j++) { const x0 = 780 + (j % 3) * 60, y0 = 330 + Math.floor(j / 3) * 60; const tx = GX[j % 2] + 2, v = s5 > 0 ? clamp(((t * 0.4 + j / 6) % 1) * (b.i === 4 ? 1 : 0) + (b.i > 4 || b.i < 0 ? j / 6 : 0)) : 0; const y = v < 0.5 ? lerp(y0, MY - 50, v * 2) : lerp(MY - 50, MY + 140 + (j % 3) * 30, (v - 0.5) * 2); const x = v < 0.5 ? lerp(x0, tx, v * 2) : tx + (j - 3) * 12 * (v - 0.5) * 2; dot(g, s5 > 0 ? x : x0, s5 > 0 ? y : y0, 14, '#8a4bc9', { ow: 3 }); }
      txt(g, 'glucoză', 900, 290, 17, '#c49aff');
      if (s5 > 0.5) txt(g, '↑ captarea glucozei', 810, MY + 230, 20, C.gs, { alpha: s5 });
    },
  };
}

/* =================================================== CAZUL 7 · CEI 3 IEPURI */
function rabbitHead(g, cy, a = 1) {
  g.save(); g.globalAlpha = a;
  for (const d of [-1, 1]) { g.save(); g.translate(500 + d * 120, cy - 100); g.rotate(d * 0.45); ell(g, 0, -30, 22, 48, '#efe9e4', { ow: 4 }); ell(g, 0, -30, 9, 32, '#f2b6c0', { ow: 0 }); g.restore(); }
  ell(g, 500, cy, 310, 118, '#efe9e4', { ow: 5, shade: '#d8cfc8' });
  ell(g, 500, cy + 62, 18, 12, '#f28aa0', { ow: 3 });
  g.restore();
}
export function rabbits3() {
  const Y = [175, 480, 785]; const ODx = 360, OSx = 640, R = 66;
  const SUB = [['pilocarpină', 'agonist M', C.pilo, 11], ['atropină', 'antagonist M', C.atr, 50], ['adrenalină', 'agonist α1', C.adr, 50]];
  return {
    home: HOME, anchors: [[OSx + 92, Y[0] - 60], [ODx - 92, Y[0] - 60], [ODx - 92, Y[1] - 60], [ODx - 92, Y[2] - 60]],
    phase: (i) => ['OS = martor', 'pilocarpină → mioză', 'atropină → midriază', 'adrenalină → midriază'][i] || '',
    draw(g, t, b) {
      bg(g);
      let flash = 0; if (b.i === 0) flash = clamp((b.bt - 0.6) / 0.4) * (1 - clamp((b.bt - 2.6) / 0.8));
      Y.forEach((y, r) => {
        const [nm, cls, col, pt] = SUB[r]; const k = r + 1; const on = b.i === k;
        rabbitHead(g, y, 1);
        const q = b.i < 0 || b.i > k ? 1 : on ? ease(clamp((b.bt - 0.7) / 2)) : 0;
        const pr = lerp(26, pt, q);
        iris(g, ODx, y, R, pr, { col: '#7a4a2a', circ: r === 0 && on ? q : 0, rad: r === 2 && on ? q : 0 });
        iris(g, OSx, y, R, 26 - 10 * flash, { col: '#7a4a2a' });
        if (on || b.i === 0) glowRing(g, on ? ODx : OSx, y, R + 32, R + 32, 0, 1);
        txt(g, 'OD', ODx, y + R + 44, 15, OUT, { stroke: false }); txt(g, 'OS · martor', OSx, y + R + 44, 15, OUT, { stroke: false });
        txt(g, `iepurele ${r + 1}`, 90, y - 40, 19, C.hi); txt(g, nm, 90, y - 6, 18, col); txt(g, cls, 90, y + 24, 15, C.cream, { w: 700 });
        if (q > 0.6) txt(g, pt < 26 ? 'mioză' : 'midriază', 900, y, 21, pt < 26 ? C.para : C.sym, { alpha: q });
        if (on && b.bt < 1.2) { const v = clamp(b.bt / 0.9); dot(g, ODx + 50, lerp(y - 160, y - 40, v), 10, col, { ow: 3 }); }
      });
      if (flash > 0) Y.forEach((y) => { g.save(); g.globalAlpha = flash * 0.85; g.fillStyle = '#fff6b0'; g.beginPath(); g.moveTo(OSx + 200, y - 110); g.lineTo(OSx + 30, y - 30); g.lineTo(OSx + 30, y + 30); g.closePath(); g.fill(); g.restore(); });
      if (b.i === 0) txt(g, 'lumina → reflexul fotomotor', 830, 335, 17, '#fff6b0', { alpha: flash });
    },
  };
}

/* =================================================== GLAUCOM: UNGHI DESCHIS vs ÎNCHIS */
function angleDraw(g, px, py, closed, t, o = {}) {
  const A = [px + 360, py + 250];
  // sclera + cornee
  tube(g, [[px + 40, py + 70], [px + 200, py + 120], [A[0] - 10, A[1] - 40], [A[0] + 30, A[1] + 30], [px + 440, py + 470]], 30, '#f4efe6', {});
  tube(g, [[px + 40, py + 70], [px + 200, py + 120], [A[0] - 30, A[1] - 60]], 20, 'rgba(200,230,255,.95)', { raw: true });
  // corpul ciliar
  const cb = new Path2D(); cb.moveTo(A[0] + 10, A[1] + 50); cb.quadraticCurveTo(A[0] + 70, A[1] + 90, A[0] + 50, A[1] + 170); cb.quadraticCurveTo(A[0] - 10, A[1] + 120, A[0] + 10, A[1] + 50); paint(g, cb, '#c75b3f', '#a4432c', null, [A[0] - 10, A[1] + 50, 80, 120], OUT, 4);
  // cristalinul
  ell(g, px + 170, py + 470, closed ? 150 : 120, closed ? 85 : 65, 'rgba(230,240,255,.6)', { ow: 4 });
  if (o.lens) glowRing(g, px + 170, py + 470, 165, 100, 0, 1);
  // irisul
  const ir = closed ? [[A[0] - 10, A[1] + 30], [A[0] - 40, A[1] - 10], [px + 200, py + 250], [px + 70, py + 330]] : [[A[0] - 10, A[1] + 40], [px + 250, py + 330], [px + 70, py + 360]];
  tube(g, ir, 22, '#8a5a3a', {});
  if (o.vessels) { g.save(); g.strokeStyle = '#ff4a5a'; g.lineWidth = 3; for (let j = 0; j < 5; j++) { const x = px + 110 + j * 45; const y = closed ? py + 300 - j * 10 : py + 330; g.beginPath(); g.moveTo(x, y - 12); g.quadraticCurveTo(x + 12, y - 26, x + 22, y - 12); g.stroke(); } g.restore(); }
  // rețeaua trabeculară + Schlemm
  ell(g, A[0] + 12, A[1] - 40, 15, 10, '#9fd3f0', { ow: 3 });
  g.save(); g.strokeStyle = '#e8dcc0'; g.lineWidth = 2.5; for (let j = 0; j < 5; j++) { g.beginPath(); g.moveTo(A[0] - 30 + j * 6, A[1] - 20); g.lineTo(A[0] - 18 + j * 6, A[1] + 10); g.stroke(); } g.restore();
  if (o.clog) [[0, '#ffffff'], [1, '#e23a4f'], [2, '#9fbf8a'], [3, '#ffffff'], [4, '#e23a4f']].forEach(([j, c]) => dot(g, A[0] - 32 + j * 9, A[1] - 6 + (j % 2) * 10, 6, c, { ow: 2 }));
}
export function angle() {
  const P1 = [20, 120], P2 = [510, 120];
  return {
    home: HOME, anchors: [[P1[0] + 360, P1[1] + 200], [P2[0] + 150, P2[1] + 400], [P2[0] + 100, P2[1] + 260]],
    phase: (i) => ['unghi deschis: rețeaua blocată', 'unghi închis primar', 'unghi închis secundar'][i] || '',
    draw(g, t, b) {
      bg(g);
      panel(g, P1[0], 20, 470, 890, { stroke: b.i === 0 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 0 ? 5 : 3 });
      panel(g, P2[0], 20, 470, 890, { stroke: b.i >= 1 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i >= 1 ? 5 : 3 });
      txt(g, 'glaucom cu unghi DESCHIS', P1[0] + 235, 80, 21, C.hi); txt(g, 'glaucom cu unghi ÎNCHIS', P2[0] + 235, 80, 21, C.hi);
      angleDraw(g, P1[0], P1[1], false, t, { clog: true });
      angleDraw(g, P2[0], P2[1], true, t, { lens: b.i === 1, vessels: b.i === 2 || b.i < 0 });
      // umoarea apoasă care nu se mai scurge
      const fl = (px, py) => { const P = curve([[px + 300, py + 420], [px + 300, py + 330], [px + 340, py + 270]]); flow(g, P, t, '#4f9fe6', 5, 0.12, 7, { u1: 0.9 }); cross(g, px + 352, py + 226, 13, C.key, 1); };
      fl(P1[0], P1[1]);
      txt(g, 'cornee', P1[0] + 110, P1[1] + 50, 16, '#cfe8ff'); txt(g, 'iris', P1[0] + 120, P1[1] + 395, 16, '#e0b08a'); txt(g, 'cristalin', P1[0] + 170, P1[1] + 470, 16, OUT, { stroke: false });
      txt(g, 'rețeaua trabeculară', P1[0] + 330, P1[1] + 140, 15, C.cream, { w: 700 });
      txt(g, 'leucocite · hematii ·\nelemente retiniene', P1[0] + 235, 800, 18, C.cream, { w: 700 });
      txt(g, 'cristalin mărit / împins\ncătre iris (primar)', P2[0] + 235, 735, 17, b.i === 1 || b.i < 0 ? C.cream : C.dim, { w: 700 });
      txt(g, 'neovascularizație → irisul\nîmpins anterior (secundar)', P2[0] + 235, 830, 17, b.i === 2 || b.i < 0 ? '#ff8a96' : C.dim, { w: 700 });
      txt(g, 'irisul închide unghiul', P2[0] + 330, P2[1] + 140, 15, C.cream, { w: 700 });
    },
  };
}

/* =================================================== LP 4 · CAZUL 1 · GABA-A (canal de Cl⁻) */
export function gabaA() {
  const MY = 430, RX = 560;
  return {
    home: HOME, anchors: [[330, 110], [RX - 150, MY - 150], [RX + 110, MY + 120], [130, 700]],
    phase: (i) => ['A traversează BHE', 'A se leagă de GABA-A', 'Cl⁻ intră', 'hiperpolarizare (PPSI)'][i] || '',
    draw(g, t, b) {
      bg(g);
      const ph = b.i < 0 ? 4 : b.i + clamp(b.bt / (b.bd * 0.8)); const p = (k) => clamp(ph - k);
      // capilarul + BHE
      const cp = new Path2D(); cp.roundRect(30, 40, 260, 120, 50); paint(g, cp, '#e6707e', '#c94a5a', null, [30, 40, 260, 120], OUT, 5);
      g.save(); g.strokeStyle = '#f3cf8a'; g.lineWidth = 10; g.beginPath(); g.moveTo(30, 172); g.lineTo(290, 172); g.stroke(); g.restore();
      txt(g, 'sânge', 90, 100, 17, '#fff'); txt(g, 'BHE', 320, 172, 16, C.mem);
      const a1 = ease(clamp(p(0) / 0.8)); const a2 = ease(clamp(p(1) / 0.5));
      const ax = a1 < 1 ? lerp(180, 300, a1) : lerp(300, RX - 70, a2), ay = a1 < 1 ? lerp(100, 250, a1) : lerp(250, MY - 70, a2);
      ligand(g, ax, ay, '#ffb347', 'A', 22);
      txt(g, 'lipofil → trece', 200, 230, 15, C.cream, { w: 700, alpha: clamp(p(0) * 2) * (1 - clamp(p(1))) });
      txt(g, 'neuron din SNC', 900, MY - 120, 16, C.dim, { w: 700 });
      membrane(g, 0, 1000, MY, { h: 56 });
      // receptorul GABA-A: canal din 5 subunități (2 vizibile)
      const op = clamp((p(1) - 0.45) / 0.3);
      channel(g, RX, MY, op, '#9fe0ff', { s: 1.05 });
      ell(g, RX + 70, MY - 70, 20, 16, '#5aa8ff', { ow: 3 }); txt(g, 'GABA-A', RX + 150, MY - 40, 20, '#9fe0ff');
      // Cl⁻ afară mult, înăuntru puțin
      for (let j = 0; j < 10; j++) txt(g, 'Cl⁻', 80 + j * 90, MY - 140 - (j % 2) * 40, 18, '#9fe0ff', { alpha: 0.85 });
      if (op > 0.4) for (let j = 0; j < 5; j++) { const v = ((j / 5) + t * 0.55) % 1; txt(g, 'Cl⁻', RX + Math.sin(j * 2) * 6, lerp(MY - 90, MY + 170, v), 18, '#9fe0ff', { alpha: Math.sin(v * Math.PI) * clamp(p(2) * 3 + 0.3) }); }
      txt(g, 'în interior: puțin Cl⁻', 820, MY + 70, 16, C.dim, { w: 700 });
      // potențialul membranar
      panel(g, 30, 640, 940, 270, { stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3 });
      const Y70 = 740, k = 2.2; const dip = clamp(p(2) / 0.8);
      g.save(); g.setLineDash([8, 7]); g.strokeStyle = 'rgba(255,243,230,.4)'; g.lineWidth = 2; g.beginPath(); g.moveTo(140, Y70); g.lineTo(940, Y70); g.stroke(); g.restore();
      txt(g, '−70 mV', 90, Y70, 16, C.cream, { w: 700 }); txt(g, '−90', 90, Y70 + 20 * k * 2, 16, C.cream, { w: 700 });
      g.save(); g.lineJoin = 'round'; for (const [c, w] of [[OUT, 10], ['#9fe0ff', 5]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); for (let x = 140; x <= 940; x += 5) { const u = (x - 140) / 800; const d = Math.exp(-((u - 0.5) ** 2) / 0.02) * dip; const yy = Y70 + d * 20 * k * 2; x === 140 ? g.moveTo(x, yy) : g.lineTo(x, yy); } g.stroke(); } g.restore();
      txt(g, dip > 0.5 ? 'hiperpolarizare = potențial post-sinaptic inhibitor' : 'potențialul membranar', 540, 880, 20, dip > 0.5 ? '#9fe0ff' : C.cream);
    },
  };
}

/* =================================================== LP 4 · CAZUL 2 · ANTICOLINESTERAZICE, CURARIZANTE */
export function nmj3() {
  const X = [170, 500, 830]; const TY = 210, MY = 430;
  const H3 = [['inhibitor de\ncolinesterază', C.atr], ['curarizant\nantidepolarizant', C.prop], ['curarizant\ndepolarizant', '#ffb347']];
  return {
    home: HOME, anchors: [[X[0] - 135, 150], [X[1] - 135, 150], [X[2] - 135, 150], [205, 720]],
    phase: (i) => ['ACh rămâne mai mult', 'N2 blocat', 'antirepolarizant', 'supradoza: întrebarea 4'][i] || '',
    draw(g, t, b) {
      bg(g);
      X.forEach((x, k) => {
        const on = b.i === k || (b.i === 3 && k > 0); const a = b.i < 0 || on ? 1 : 0.45;
        panel(g, x - 155, 40, 310, 620, { stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3 });
        g.save(); g.globalAlpha = a;
        txt(g, H3[k][0], x, 90, 19, H3[k][1]);
        ell(g, x, TY, 110, 60, C.nerve, { ow: 5, shade: C.nerveS });
        const mf = new Path2D(); mf.roundRect(x - 140, MY, 280, 170, 22); paint(g, mf, '#d9535f', '#b03a46', null, [x - 140, MY, 280, 170], OUT, 5);
        g.save(); g.clip(mf); g.strokeStyle = 'rgba(255,220,225,.7)'; g.lineWidth = 5; for (let xx = x - 140; xx < x + 140; xx += 26) { g.beginPath(); g.moveTo(xx, MY); g.lineTo(xx, MY + 170); g.stroke(); } g.restore();
        const opn = k === 2 ? 0.9 : 0.05;
        [x - 60, x + 60].forEach((cx) => channel(g, cx, MY, k === 0 ? 0.7 : opn, C.nch, { s: 0.42 }));
        if (k === 0) { for (let j = 0; j < 10; j++) dot(g, x - 90 + (j * 41) % 180, TY + 85 + (j % 3) * 22 + Math.sin(t * 2 + j) * 4, 6, C.ach, { ow: 1.5 }); ell(g, x + 105, MY - 40, 26, 17, '#9b7ad6', { ow: 3 }); cross(g, x + 105, MY - 40, 12, C.key, 1); txt(g, 'AChE', x + 105, MY - 72, 15, '#c8b6ff'); }
        if (k === 1) { [x - 60, x + 60].forEach((cx) => { ligand(g, cx, MY - 46, C.prop, '', 16, { shape: 'block' }); dot(g, cx + 30, MY - 90, 6, C.ach, { ow: 1.5 }); cross(g, cx + 30, MY - 70, 9, C.key, 1); }); }
        if (k === 2) { [x - 60, x + 60].forEach((cx) => ligand(g, cx, MY - 46, '#ffb347', '', 15)); g.save(); g.strokeStyle = C.nch; g.lineWidth = 6; g.shadowColor = C.nch; g.shadowBlur = 12 * (0.6 + 0.4 * Math.sin(t * 3)); g.beginPath(); g.moveTo(x - 135, MY + 6); g.lineTo(x + 135, MY + 6); g.stroke(); g.restore(); }
        txt(g, k === 0 ? 'ACh rămâne în fantă' : k === 1 ? 'N2 ocupat, închis' : 'membrana rămâne\ndepolarizată', x, MY + 215, 17, C.cream, { w: 700 });
        txt(g, k === 0 ? 'efect prelungit' : 'relaxare musculară', x, MY + 100, 20, '#fff');
        g.restore();
      });
      panel(g, 170, 690, 660, 200, { fill: 'rgba(127,232,255,.08)', stroke: b.i === 3 ? C.hi : 'rgba(127,232,255,.4)', lw: b.i === 3 ? 5 : 3 });
      txt(g, '?', 230, 790, 60, C.camp);
      txt(g, 'supradoză de curarizant\nantidepolarizant? dar depolarizant?', 530, 770, 21, C.cream);
      txt(g, 'răspunsul nu e în LP (chenarul albastru)', 530, 850, 16, C.dim, { w: 700 });
    },
  };
}

/* =================================================== LP 4 · CAZUL 3 · EFEDRINA ȘI TAHIFILAXIA */
export function ephedrine() {
  const TX = 520, TY = 200, MY = 470;
  return {
    home: HOME, anchors: [[60, 210], [TX - 250, TY - 40], [TX - 260, MY + 70], [600, 700]],
    phase: (i) => ['picături repetate', 'NA eliberată + efect direct', 'α1 (Gq) → vasoconstricție', 'stocurile de NA se epuizează'][i] || '',
    draw(g, t, b) {
      bg(g);
      const ph = b.i < 0 ? 4 : b.i + clamp(b.bt / (b.bd * 0.8)); const p = (k) => clamp(ph - k);
      // picurătorul
      g.save(); g.translate(120, 120); const pp = new Path2D(); pp.roundRect(-14, -80, 28, 110, 8); paint(g, pp, 'rgba(230,240,255,.85)', null, null, [-14, -80, 28, 110], OUT, 4); const bulb = new Path2D(); bulb.ellipse(0, -100, 22, 26, 0, 0, 7); paint(g, bulb, '#ff9a4a', null, null, [-22, -126, 44, 52], OUT, 4); g.restore();
      const dv = ((t * 0.7) % 1); dot(g, 120, lerp(160, 260, dv), 8, '#ffb347', { ow: 2, alpha: b.i <= 0 ? 1 - dv : 0.3 });
      txt(g, 'efedrină\nnazal', 120, 300, 17, '#ffb347');
      // terminația presinaptică
      ell(g, TX, TY, 230, 110, C.nerve, { ow: 6, shade: C.nerveS }); tube(g, [[TX, -20], [TX, TY - 100]], 36, C.nerve, { raw: true });
      txt(g, 'terminație simpatică', TX + 300, TY - 70, 17, C.cream, { w: 700 });
      const dep = clamp(p(3) / 0.9); const nv = Math.round(lerp(6, 0, dep));
      for (let j = 0; j < 6; j++) { const x = TX - 150 + j * 60, y = TY + (j % 2 ? 20 : -20); const full = j < nv; ell(g, x, y, 24, 24, full ? '#fff8e0' : 'rgba(255,248,224,.25)', { ow: 3 }); if (full) for (let q = 0; q < 3; q++) dot(g, x - 8 + q * 8, y + (q % 2) * 6 - 3, 4.5, C.sym, { ow: 1.5 }); }
      txt(g, `vezicule cu NA: ${nv}/6`, TX, TY + 140, 17, C.sym, { alpha: ph >= 3 ? 1 : 0.6 });
      // efedrina intră + NA eliberată
      const e1 = ease(clamp(p(1) / 0.5));
      if (ph >= 1) { ligand(g, lerp(200, TX - 60, e1), lerp(260, TY + 20, e1), '#ffb347', 'E', 18); ligand(g, lerp(250, TX + 140, e1), lerp(300, MY - 50, e1), '#ffb347', 'E', 18); }
      const rel = ph >= 1.3 ? (1 - dep) : 0;
      for (let j = 0; j < 8; j++) { const v = ((j / 8) + t * 0.45) % 1; if (rel > 0) dot(g, TX - 160 + j * 45, lerp(TY + 80, MY - 40, v), 7, C.sym, { ow: 2, alpha: rel * Math.sin(v * Math.PI) }); }
      txt(g, 'NA', TX - 210, TY + 190, 18, C.sym, { alpha: rel });
      // celula musculară netedă vasculară cu α1
      membrane(g, 140, 960, MY, { h: 46 });
      [TX - 200, TX - 40, TX + 140].forEach((x) => receptor(g, x, MY, C.gq, '', { s: 0.6, glow: ph >= 2 ? 0.7 * (1 - dep * 0.8) : 0, gc: C.gq }));
      txt(g, 'α1 (Gq)', TX + 320, MY - 50, 20, C.gq); txt(g, 'mușchi neted vascular', TX + 320, MY + 60, 16, C.dim, { w: 700 });
      // vasul din mucoasa nazală + efectul la 3 doze
      const vc = ph >= 2 ? ease(clamp(p(2) / 0.6)) * (1 - 0.85 * dep) : 0;
      vesselX(g, 200, 720, 80, 1 - vc, { leak: (1 - vc) * 0.6 });
      txt(g, vc > 0.4 ? 'vasoconstricție →\ndecongestionare' : 'mucoasă congestionată', 200, 850, 17, vc > 0.4 ? C.gs : C.cream, { w: 700 });
      panel(g, 420, 600, 540, 300, { stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3 });
      txt(g, 'efectul la doze repetate (la câteva ore)', 690, 635, 17, C.cream, { w: 700 });
      [1, 0.45, 0.12].forEach((v, j) => { const hh = 190 * (b.i === 3 ? (j === 0 ? 1 : lerp(1, v, clamp(b.bt / (b.bd * 0.6)))) : j === 0 || b.i < 0 ? v : 0); const x = 520 + j * 170; const pb = new Path2D(); pb.roundRect(x - 40, 860 - hh, 80, Math.max(2, hh), 10); paint(g, pb, C.gs, null, null, [x - 40, 670, 80, 190], OUT, 4); txt(g, `doza ${j + 1}`, x, 885, 16, C.cream, { w: 700 }); });
    },
  };
}

/* =================================================== LP 4 · CAZURILE 4 și 5 · DOWN- / UP-REGULATION */
export function regul({ spec }) {
  const up = spec.sceneOpts.kind === 'up'; const CXs = [200, 500, 800], CY = 270, R = 105;
  const N = up ? [3, 6, 9] : [9, 6, 3];
  return {
    home: HOME, anchors: up ? [[CXs[0] - 120, CY - 140], [CXs[2] + 50, CY - 150], [130, 520], [560, 520]] : [[CXs[0] - 120, CY - 140], [60, 520], [CXs[2] + 50, CY - 150], [560, 520]],
    phase: (i) => (up ? ['β-blocant cronic', 'up-regulation', 'oprire bruscă → rebound', 'scădere treptată'] : ['D: β2-agonist', 'autoinducție enzimatică', 'down-regulation', 'doză ↑ · corticosteroid'])[i] || '',
    draw(g, t, b) {
      bg(g);
      const kR = up ? 1 : 2; const sR = stp(b, kR, 0.8);
      CXs.forEach((x, c) => {
        const vis = c === 0 ? 1 : sR > c / 3 ? 1 : 0.25;
        g.save(); g.globalAlpha = vis; ell(g, x, CY, R, R, '#f6e3c8', { ow: 5, shade: '#e3c7a0' }); ell(g, x, CY + 10, 34, 28, '#b18ad6', { ow: 3 });
        const n = c === 0 ? N[0] : Math.round(lerp(N[0], N[c], clamp(sR * 3 - c + 1)));
        for (let j = 0; j < n; j++) { const a = -Math.PI * 0.95 + (j + 0.5) * Math.PI * 0.95 * 2 / Math.max(n, 1); const rx = x + Math.cos(a) * (R + 2), ry = CY + Math.sin(a) * (R + 2); g.save(); g.translate(rx, ry); g.rotate(a + Math.PI / 2); const p = new Path2D(); p.roundRect(-7, -16, 14, 26, 5); paint(g, p, C.gs, null, null, [-7, -16, 14, 26], OUT, 3); g.restore(); if (up && (b.i === 0 || b.i === 1) && j % 2 === 0) { const lx = x + Math.cos(a) * (R + 26), ly = CY + Math.sin(a) * (R + 26); ligand(g, lx, ly, C.prop, '', 9, { shape: 'block' }); } if (!up && b.i === 0 && c === 0) ligand(g, x + Math.cos(a) * (R + 26), CY + Math.sin(a) * (R + 26), C.gs, '', 8); }
        g.restore();
        txt(g, `${n} receptori`, x, CY + R + 32, 17, C.cream, { w: 700, alpha: vis });
      });
      arr(g, 120, CY + R + 70, 880, CY + R + 70, C.cream, 5, 0.8); txt(g, 'timp (tratament cronic)', 500, CY + R + 100, 17, C.dim, { w: 700 });
      txt(g, up ? 'antagonist β cronic → densitatea receptorilor ↑' : 'agonist β2 cronic → mai puțini receptori', 500, 78, 20, up ? C.prop : C.gs);
      // jos: panourile
      const P1 = [30, 500, 450, 410], P2 = [510, 500, 460, 410];
      if (!up) {
        panel(g, ...P1, { stroke: b.i === 1 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 1 ? 5 : 3 });
        txt(g, 'autoinducție enzimatică', 255, 535, 19, C.hi); txt(g, '(mecanism farmacocinetic)', 255, 565, 15, C.dim, { w: 700 });
        icon(g, 'liver', 120, 660, 1); txt(g, 'enzime ↑', 120, 740, 16, C.cream, { w: 700 });
        const s1 = stp(b, 1, 0.8); g.save(); g.strokeStyle = C.cream; g.lineWidth = 4; g.beginPath(); g.moveTo(220, 610); g.lineTo(220, 840); g.lineTo(450, 840); g.stroke(); g.restore();
        g.save(); for (const [c, w] of [[OUT, 10], [C.camp, 5]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); for (let k = 0; k <= 40; k++) { const u = k / 40; const y = 640 + 170 * (1 - Math.exp(-u * 3)) * s1; k ? g.lineTo(230 + u * 210, y) : g.moveTo(230, y); } g.stroke(); } g.restore();
        txt(g, 'concentrația\nplasmatică a lui D ↓', 335, 875, 15, C.camp, { w: 700 });
        panel(g, ...P2, { stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3 });
        txt(g, 'ce faci', 740, 535, 19, C.hi);
        pill(g, 740, 620, 360, 56, '#fff3e0', 'doza ↑ → același efect', { size: 18, alpha: 0.4 + 0.6 * stp(b, 3) });
        pill(g, 740, 710, 360, 56, '#c8f0d4', '+ corticosteroid (atenuează\ndown-regulation-ul)', { size: 16, alpha: 0.4 + 0.6 * stp(b, 3) });
        bronchus(g, 740, 830, 48, lerp(0.85, 0.35, stp(b, 2)) + 0.4 * stp(b, 3) * 0.5); txt(g, 'efect bronhodilatator', 880, 830, 15, C.cream, { w: 700 });
      } else {
        panel(g, ...P1, { stroke: b.i === 2 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 2 ? 5 : 3 });
        txt(g, 'oprire bruscă', 255, 535, 19, C.hi);
        const s2 = stp(b, 2, 0.8);
        ell(g, 150, 690, 80, 80, '#f6e3c8', { ow: 4 }); if (s2 > 0.02) for (let j = 0; j < 9; j++) { const a = -Math.PI * 0.95 + (j + 0.5) * Math.PI * 1.9 / 9; ligand(g, 150 + Math.cos(a) * (96 + (1 - s2) * 40), 690 + Math.sin(a) * (96 + (1 - s2) * 40), C.na, '', 8, { alpha: s2 }); }
        txt(g, 'NA, adrenalina\n(mediatori endogeni)', 150, 820, 15, C.na, { w: 700 });
        gauge(g, 360, 680, 66, lerp(0.6, 0.98, s2), 'TA'); txt(g, s2 > 0.5 ? 'rebound:\ncriză hipertensivă' : '', 360, 810, 17, C.key);
        panel(g, ...P2, { stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3 });
        txt(g, 'reducerea treptată a dozelor', 740, 535, 19, C.hi);
        const s3 = stp(b, 3, 0.8); g.save(); g.strokeStyle = C.cream; g.lineWidth = 4; g.beginPath(); g.moveTo(570, 600); g.lineTo(570, 850); g.lineTo(940, 850); g.stroke(); g.restore();
        for (let j = 0; j < 5; j++) { const hh = 220 * (1 - j / 5); const x = 600 + j * 68; const q = clamp(s3 * 5 - j); const p = new Path2D(); p.roundRect(x, 850 - hh * q, 54, Math.max(1, hh * q), 6); paint(g, p, C.prop, null, null, [x, 630, 54, 220], OUT, 3); }
        txt(g, 'doza β-blocantului în timp', 760, 880, 15, C.dim, { w: 700 });
      }
    },
  };
}

/* =================================================== LP 4 · CAZUL 6 · ACATALAZIA */
export function catalase() {
  const L = [30, 60], Rr = [510, 60];
  return {
    home: HOME, anchors: [[Rr[0] + 40, 110], [L[0] + 40, 110], [500, 790]],
    phase: (i) => ['sângele devine negru-cenușiu', 'catalaza lipsește', 'idiosincrazie'][i] || '',
    draw(g, t, b) {
      bg(g);
      const s0 = b.i < 0 ? 1 : b.i === 0 ? clamp(b.bt / (b.bd * 0.8)) : 1;
      [[L, 'normal: catalaza activă', true], [Rr, 'I.M.: acatalazie', false]].forEach(([[x, y], h, ok]) => {
        const on = (ok && b.i === 1) || (!ok && (b.i === 0 || b.i === 1));
        panel(g, x, y, 460, 640, { stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3 });
        txt(g, h, x + 230, y + 36, 21, ok ? C.gs : C.key);
        // sticla de apă oxigenată
        g.save(); g.translate(x + 120, y + 170); g.rotate(0.6); const bt = new Path2D(); bt.roundRect(-34, -90, 68, 130, 14); paint(g, bt, '#cfe8ff', null, null, [-34, -90, 68, 130], OUT, 4); const nk = new Path2D(); nk.roundRect(-14, -120, 28, 34, 6); paint(g, nk, '#5a8ac8', null, null, [-14, -120, 28, 34], OUT, 4); g.restore();
        txt(g, 'H₂O₂', x + 110, y + 175, 18, OUT, { stroke: false });
        for (let j = 0; j < 4; j++) { const v = ((j / 4) + t * 0.6) % 1; dot(g, x + 175 + v * 40, lerp(y + 230, y + 420, v), 7, '#cfe8ff', { ow: 2 }); }
        // rana cu sânge
        const dark = ok ? 0 : s0; const col = `rgb(${Math.round(lerp(210, 70, dark))},${Math.round(lerp(40, 66, dark))},${Math.round(lerp(55, 70, dark))})`;
        ell(g, x + 230, y + 480, 150, 70, '#f3c29b', { ow: 5 }); paint(g, blob(x + 230, y + 480, 95, 40, 0, t * 0.2, 0.08, 14, 3), col, null, null, bb(x + 230, y + 480, 95, 40), OUT, 4);
        if (ok) for (let j = 0; j < 12; j++) { const v = ((j / 12) + t * 0.35) % 1; ell(g, x + 160 + (j * 37) % 140, y + 470 - v * 200, 8 + (j % 3) * 4, 8 + (j % 3) * 4, 'rgba(255,255,255,.75)', { ow: 2.5, alpha: 1 - v }); }
        txt(g, ok ? 'O₂ (gaz): spumă' : 'fără gaz · negru-cenușiu', x + 230, y + 590, 18, ok ? '#fff' : '#bbb', { w: 700 });
      });
      pill(g, 270, 750, 420, 60, '#c8f0d4', 'catalaza: H₂O₂ → H₂O + O₂', { size: 18, alpha: b.i < 0 || b.i >= 1 ? 1 : 0.4 });
      pill(g, 740, 750, 400, 60, '#ffd0c8', 'catalaza lipsește / extrem de redusă', { size: 17, alpha: b.i < 0 || b.i >= 1 ? 1 : 0.4 }); cross(g, 950, 730, 13, C.key, b.i < 0 || b.i >= 1 ? 1 : 0);
      panel(g, 140, 820, 720, 90, { stroke: b.i === 2 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 2 ? 5 : 3, alpha: b.i < 0 || b.i >= 2 ? 1 : 0.4 });
      txt(g, 'deficit enzimatic genetic = idiosincrazie (intoleranță înnăscută)', 500, 865, 19, C.hi, { alpha: b.i < 0 || b.i >= 2 ? 1 : 0.4, maxW: 690 });
    },
  };
}

/* =================================================== LP 4 · RECEPTORI INTRACELULARI · GLUCOCORTICOIZII */
export function steroid() {
  const MX = 80, NX = 340, NY = 430;
  const hex = (g, x, y, r, a = 1) => { g.save(); g.globalAlpha = clamp(a); const p = new Path2D(); for (let k = 0; k < 6; k++) { const an = k / 6 * Math.PI * 2; k ? p.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r) : p.moveTo(x + r, y); } p.closePath(); paint(g, p, '#ffd34a', null, '#fff3b0', [x - r, y - r, 2 * r, 2 * r], OUT, 3.5); g.restore(); };
  return {
    home: HOME, anchors: [[MX + 40, 270], [NX - 60, NY - 230], [770, 210], [700, 760]],
    phase: (i) => ['difuzie → receptorul steroidic', 'nucleu: transcripție → proteină', 'PLA2 blocată', 'leucotriene ↓'][i] || '',
    draw(g, t, b) {
      bg(g);
      const ph = b.i < 0 ? 4 : b.i + clamp(b.bt / (b.bd * 0.8)); const p = (k) => clamp(ph - k);
      // membrana (verticală) + nucleul
      g.save(); g.translate(MX, 467); g.rotate(Math.PI / 2); membrane(g, -440, 440, 0, { h: 50 }); g.restore();
      txt(g, 'hormon steroid\n(lipofil)', 175, 130, 15, '#ffd34a');
      ell(g, NX, NY, 140, 190, 'rgba(200,180,255,.25)', { ow: 5, sc: '#b8a4ec' }); txt(g, 'nucleu', NX, NY - 165, 17, '#c8b6ff');
      // ADN
      g.save(); for (const ph2 of [0, Math.PI]) { g.strokeStyle = ph2 ? '#7fd36a' : '#5aa8ff'; g.lineWidth = 5; g.beginPath(); for (let x = NX - 110; x <= NX + 40; x += 4) { const yy = NY + 60 + 14 * Math.sin((x - NX) / 14 + ph2); x === NX - 110 ? g.moveTo(x, yy) : g.lineTo(x, yy); } g.stroke(); } g.restore();
      txt(g, 'ADN (HRE)', NX - 40, NY + 110, 15, C.cream, { w: 700 });
      // 1. difuzie + receptor
      const d1 = ease(clamp(p(0) / 0.6)); const bnd = clamp((p(0) - 0.6) / 0.3);
      const rx = 200, ry = 700;
      if (ph < 1) { hex(g, lerp(20, rx, d1), lerp(200, ry - 30, d1), 16); ell(g, rx, ry, 30, 26, '#b18ad6', { ow: 4 }); txt(g, bnd > 0.5 ? 'complex activ' : 'receptor (inactiv)', rx, ry + 50, 15, '#d6a7ff', { w: 700 }); }
      // 2. translocare + transcripție + proteină
      const tr = ease(clamp(p(1) / 0.35)); const tx = clamp((p(1) - 0.35) / 0.3); const pr = clamp((p(1) - 0.65) / 0.35);
      if (ph >= 1) { const cx = lerp(rx, NX - 60, tr), cy = lerp(ry, NY + 40, tr); ell(g, cx, cy, 30, 26, '#b18ad6', { ow: 4 }); hex(g, cx, cy - 22, 14); }
      if (tx > 0) { g.save(); g.strokeStyle = '#ff6fa8'; g.lineWidth = 5; g.beginPath(); const ex = lerp(NX - 20, NX + 220, Math.max(tx, pr)); for (let x = NX - 20; x <= ex; x += 4) { const yy = NY - 20 + 6 * Math.sin(x / 9); x === NX - 20 ? g.moveTo(x, yy) : g.lineTo(x, yy); } g.stroke(); g.restore(); txt(g, 'mRNA', NX + 30, NY - 50, 15, '#ff9ac4'); }
      ell(g, 560, NY - 10, 34, 24, '#9fb8e8', { ow: 4 }); ell(g, 560, NY + 18, 26, 16, '#9fb8e8', { ow: 4 }); txt(g, 'ribozom', 560, NY + 60, 15, C.cream, { w: 700 });
      if (pr > 0) { paint(g, blob(lerp(560, 600, pr), lerp(NY - 40, 250, pr), 26, 22, 0, t, 0.12, 10, 9), '#5aa8ff', null, null, bb(600, 250, 26, 22), OUT, 4); txt(g, 'proteină\nspecifică', 520, 220, 15, '#9fd3f0', { alpha: pr }); }
      txt(g, 'citoplasmă', 240, 860, 16, C.dim, { w: 700 });
      // 3–4. calea acidului arahidonic
      const AX = 820;
      pill(g, AX, 110, 270, 50, '#f3cf8a', 'fosfolipide membranare', { size: 16 });
      arr(g, AX, 138, AX, 260, C.cream, 5); pill(g, AX + 70, 200, 80, 40, '#f3e7ff', 'PLA2', { size: 16 });
      const blk = clamp(p(2) / 0.5);
      if (blk > 0) { arr(g, 630, 245, AX - 20, 205, '#5aa8ff', 5, blk); ell(g, AX, 200, 22, 22, '#fff', { ow: 3, alpha: blk }); cross(g, AX, 200, 13, C.key, blk); }
      const dim = 1 - 0.6 * blk;
      pill(g, AX, 290, 220, 50, '#ffe7a0', 'acid arahidonic', { size: 16, alpha: dim });
      arr(g, AX - 40, 318, AX - 100, 440, C.cream, 4, dim); arr(g, AX + 40, 318, AX + 100, 440, C.cream, 4, dim);
      txt(g, 'LOX', AX - 100, 370, 16, C.cream, { alpha: dim }); txt(g, 'COX', AX + 100, 370, 16, C.cream, { alpha: dim });
      pill(g, AX - 95, 490, 175, 76, '#ffd0c8', 'leucotriene\nLTC4, D4, E4', { size: 15, alpha: dim }); pill(g, AX + 100, 490, 160, 60, '#ffd0c8', 'prosta-\nglandine', { size: 15, alpha: dim });
      panel(g, 600, 590, 380, 300, { stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3 });
      txt(g, 'S-RSA (numele vechi)', 790, 625, 15, C.dim, { w: 700 });
      pill(g, 790, 680, 250, 46, C.gq, 'Rp CysLT1 (Gq)', { size: 17, alpha: dim });
      bronchus(g, 700, 790, 54, lerp(0.15, 0.7, blk)); txt(g, 'bronho-\nconstricție', 850, 775, 17, C.gq, { alpha: dim }); txt(g, 'debut lent,\nefect îndelungat', 850, 845, 14, C.cream, { w: 700, alpha: dim });
    },
  };
}

/* =================================================== LP 4 · ȘOCUL ANAFILACTIC: ADRENALINA (α1 + β2) + LINIA A DOUA */
export function adren2() {
  const CEN = [500, 330]; const TG = [[200, 230], [800, 230]];
  return {
    home: HOME, anchors: [[TG[0][0] - 160, TG[0][1] - 150], [TG[1][0] + 100, TG[1][1] - 150], [60, 560], [540, 560]],
    phase: (i) => ['α1 (Gq): vasoconstricție', 'β2 (Gs): bronhodilatație', 'doza: i.m.', 'linia a doua'][i] || '',
    draw(g, t, b) {
      bg(g);
      const s = (k) => stp(b, k, 0.8);
      g.save(); g.translate(CEN[0], CEN[1]); g.rotate(-0.25);
      const body = new Path2D(); body.roundRect(-30, -100, 60, 180, 14); paint(g, body, 'rgba(230,240,255,.9)', null, null, [-30, -100, 60, 180], OUT, 5);
      const liq = new Path2D(); liq.roundRect(-24, -40, 48, 114, 10); g.fillStyle = 'rgba(255,111,74,.7)'; g.fill(liq);
      const pl = new Path2D(); pl.roundRect(-10, -160, 20, 64, 6); paint(g, pl, '#d8d0c8', null, null, [-10, -160, 20, 64], OUT, 4);
      g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.moveTo(0, 80); g.lineTo(0, 150); g.stroke(); g.strokeStyle = '#ddd'; g.lineWidth = 2.5; g.stroke();
      g.restore();
      txt(g, 'ADRENALINĂ', CEN[0], CEN[1] - 200, 26, C.na);
      const path = (k, q, col) => { const [x, y] = TG[k]; arr(g, CEN[0] + (x - CEN[0]) * 0.2, CEN[1] + (y - CEN[1]) * 0.2, CEN[0] + (x - CEN[0]) * 0.55, CEN[1] + (y - CEN[1]) * 0.55, col, 6, 0.5 + 0.5 * q); if (q > 0 && q < 1) for (let j = 0; j < 4; j++) { const v = ((j / 4) + t * 0.6) % 1; dot(g, lerp(CEN[0], x, v * 0.7), lerp(CEN[1], y, v * 0.7), 8, C.na, { ow: 2 }); } };
      const a1 = s(0); path(0, a1, C.gq);
      vesselX(g, TG[0][0] - 40, TG[0][1], 72, 1 - 0.85 * ease(a1), { leak: 1 - ease(a1) }); gauge(g, TG[0][0] + 100, TG[0][1] + 110, 50, lerp(0.12, 0.75, ease(a1)), 'TA');
      txt(g, 'α1 (Gq) · vase', TG[0][0], TG[0][1] - 120, 21, C.gq); txt(g, a1 > 0.5 ? 'vasoconstricție' : '', TG[0][0] - 40, TG[0][1] + 105, 18, C.cream, { w: 700 });
      const b2 = s(1); path(1, b2, C.gs);
      bronchus(g, TG[1][0], TG[1][1], 82, lerp(0.12, 0.85, ease(b2)), { edema: b2 < 0.5 });
      txt(g, 'β2 (Gs) · bronhii', TG[1][0], TG[1][1] - 120, 21, C.gs); txt(g, b2 > 0.5 ? 'bronhodilatație' : '', TG[1][0], TG[1][1] + 110, 18, C.cream, { w: 700 });
      // doza
      panel(g, 30, 520, 450, 380, { stroke: b.i === 2 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 2 ? 5 : 3, alpha: b.i < 0 || b.i >= 2 ? 1 : 0.45 });
      txt(g, 'prima linie', 255, 555, 19, C.hi);
      [['0,01 mg/kg', '#ffd0c8'], ['maximum 0,5 mg', '#ffd0c8'], ['intramuscular (i.m.)', '#fff3e0'], ['repeți la 5 min dacă\nrăspunsul nu e adecvat', '#fff3e0']].forEach(([s2, c], j) => pill(g, 255, 620 + j * 72, 380, j === 3 ? 62 : 50, c, s2, { size: 17, alpha: b.i < 0 || b.i >= 2 ? 1 : 0.4 }));
      // linia a doua
      panel(g, 510, 520, 460, 380, { stroke: b.i === 3 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 3 ? 5 : 3, alpha: b.i < 0 || b.i >= 3 ? 1 : 0.45 });
      txt(g, 'linia a doua (simptome reziduale)', 740, 555, 18, C.hi);
      const a4 = b.i < 0 || b.i >= 3 ? 1 : 0.4;
      pill(g, 740, 630, 400, 50, '#fff3e0', 'prurit, urticarie', { size: 17, alpha: a4 }); txt(g, '↓', 740, 670, 18, C.cream, { alpha: a4 }); pill(g, 740, 710, 400, 50, '#d6a7ff', 'antihistaminic H1-blocant', { size: 17, alpha: a4 });
      pill(g, 740, 780, 400, 50, '#fff3e0', 'bronhospasm', { size: 17, alpha: a4 }); txt(g, '↓', 740, 820, 18, C.cream, { alpha: a4 }); pill(g, 740, 860, 400, 50, '#c8f0d4', 'glucocorticoid', { size: 17, alpha: a4 });
    },
  };
}
