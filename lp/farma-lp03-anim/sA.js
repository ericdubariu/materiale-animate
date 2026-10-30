// Scenele pentru intro + Partea A (liganzii, curbele) + cardurile de caz + cazul 1 (deplasarea agonistului).
import { W, H, HOME, cam, C, OUT, clamp, lerp, ease, REDUCED, bg, panel, loopT, txt, pill, dot, ell, arr, cross, check,
  ligand, membrane, receptor, gprot, enzyme, myofil, heart, icon, tri, lock, key, bronchus, vesselX, gauge, mastocyte, galpha, gbg } from './fk.js';

const hiBox = (g, x, y, w, h, on) => { if (!on) return; g.save(); g.shadowColor = C.hi; g.shadowBlur = 24; g.strokeStyle = C.hi; g.lineWidth = 6; g.beginPath(); g.roundRect(x - 4, y - 4, w + 8, h + 8, 22); g.stroke(); g.restore(); };
const KC = { full: '#5fcf7a', part: '#e7c34a', comp: '#c57bff', non: '#ff5fa2', inv: '#5aa8ff' };
export const sig = (x, x50, s = 0.09) => 1 / (1 + Math.exp(-(x - x50) / s));

/* =================================================== COPERTA */
export function cover() {
  const R = [[40, 50], [520, 50], [40, 490], [520, 490]];
  const T = ['cheia: intră? se rotește?', 'curbele doză–efect', 'Gs · Gi · Gq', 'cele 5 cazuri'];
  return {
    home: HOME, anchors: R.map(([x, y]) => [x + 30, y + 30]),
    draw(g, t, b) {
      bg(g);
      R.forEach(([x, y], i) => {
        const act = b.i === i || (b.i < 0 && Math.floor(t / 2.4) % 4 === i);
        panel(g, x, y, 440, 400, { fill: act ? 'rgba(255,207,133,.13)' : 'rgba(255,236,200,.06)', stroke: act ? C.hi : 'rgba(255,225,180,.2)', lw: act ? 5 : 3 });
        txt(g, T[i], x + 220, y + 360, 24, C.cream);
        const cx = x + 220, cy = y + 180;
        if (i === 0) { lock(g, cx, cy - 10, 1, { s: 0.9 }); key(g, cx, cy, KC.full, { s: 0.9, spin: 1 }); }
        if (i === 1) {
          const X0 = x + 50, X1 = x + 400, Y0 = y + 300, Y1 = y + 70;
          g.save(); g.strokeStyle = C.cream; g.lineWidth = 4; g.beginPath(); g.moveTo(X0, Y1); g.lineTo(X0, Y0); g.lineTo(X1, Y0); g.stroke(); g.restore();
          [[0.42, 1, KC.full], [0.62, 1, KC.comp], [0.42, 0.55, KC.non]].forEach(([m, mx, c]) => { g.save(); g.strokeStyle = OUT; g.lineWidth = 10; const P = (k) => [lerp(X0, X1, k / 60), lerp(Y0, Y1, mx * sig(k / 60, m))]; g.beginPath(); for (let k = 0; k <= 60; k++) { const [px, py] = P(k); k ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); g.strokeStyle = c; g.lineWidth = 5; g.stroke(); g.restore(); });
        }
        if (i === 2) { membrane(g, x + 30, x + 410, cy - 40, { h: 44 }); [[C.gs, 'Gs'], [C.gi, 'Gi'], [C.gq, 'Gq']].forEach(([c, l], j) => { receptor(g, x + 95 + j * 125, cy - 40, c, '', { s: 0.6 }); gprot(g, x + 85 + j * 125, cy + 50, c, l, { s: 0.7 }); }); }
        if (i === 3) { ['brain', 'bronchi', 'heart', 'gland'].forEach((n, j) => icon(g, n, x + 80 + j * 95, cy - 30, 0.8)); txt(g, 'B · D · E · alergie · șoc', cx, cy + 80, 22, C.hi); }
      });
    },
  };
}

/* =================================================== HARTA */
export function harta() {
  const R = [[40, 300], [520, 300], [40, 610], [520, 610]];
  const T = [['Liganzii', 'afinitate', 'activitate intrinsecă'], ['Curbele doză–efect', 'competitiv', 'vs necompetitiv'], ['Proteinele G', 'Gs · Gi · Gq', 'mesagerii secunzi'], ['Cele 5 cazuri', '+ decodorul', '+ 5 scripturi']];
  const CH = ['afinitate', 'activitate', 'proteina G', 'țesut', 'efect'];
  return {
    home: HOME, anchors: R.map(([x, y]) => [x + 30, y + 30]),
    draw(g, t, b) {
      bg(g);
      panel(g, 30, 40, 940, 220, { fill: 'rgba(194,122,16,.16)' });
      txt(g, 'decodorul: aceleași 5 întrebări la orice caz', 500, 85, 22, C.cream, { w: 700 });
      const run = loopT(t, 6) * 6;
      CH.forEach((c, j) => { const x = 110 + j * 195; const a = REDUCED ? 1 : clamp(run - j * 0.7) > 0 ? 1 : 0.45; pill(g, x, 175, 170, 66, ['#ffd36e', C.gs, C.gq, C.muscle, C.camp][j], c, { size: 20, alpha: a, glow: a > 0.9 && run - j * 0.7 < 1 ? 1 : 0 }); if (j < 4) arr(g, x + 88, 175, x + 110, 175, C.cream, 5, 0.9); });
      R.forEach(([x, y], i) => {
        const act = b.i === i;
        panel(g, x, y, 440, 280, { fill: act ? 'rgba(255,207,133,.14)' : 'rgba(255,236,200,.06)', stroke: act ? C.hi : 'rgba(255,225,180,.2)', lw: act ? 5 : 3 });
        txt(g, T[i][0], x + 220, y + 60, 28, C.hi);
        txt(g, T[i][1], x + 220, y + 135, 24, C.cream, { w: 700 });
        txt(g, T[i][2], x + 220, y + 185, 24, C.cream, { w: 700 });
      });
    },
  };
}

/* =================================================== FORMATUL OSPE */
export function ospe() {
  const X0 = 80, PX = 120, Y = 230;
  const SEG = [[0, 1, '#6d6178', 'citești'], [1, 1.5, '#a88a5a', 'ciornă'], [1.5, 4.5, '#C27A10', 'vorbești: scriptul'], [4.5, 7, '#4a3d58', 'completezi']];
  const ST = [['Identificarea', 'tipul de ligand\nreceptorul'], ['Descrierea', 'cascada\npas cu pas'], ['Aplicarea', 'efect, indicații\ntratament'], ['Comparația', 'cu ce se confundă\n+ DD']];
  const k = [0, 0, 0, 0];
  return {
    home: HOME, anchors: ST.map((_, i) => [140 + i * 240, 585]),
    phase: (i) => ['0:00–0:30', '0:30–1:45', '1:45–2:15', '2:15–2:45'][i] || '',
    draw(g, t, b) {
      bg(g);
      txt(g, 'stația: 7 minute', 500, 90, 30, C.cream);
      SEG.forEach(([a, c, col, l]) => { const p = new Path2D(); p.roundRect(X0 + a * PX + 2, Y - 34, (c - a) * PX - 4, 68, 12); g.save(); g.fillStyle = col; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(p); g.restore(); txt(g, l, X0 + (a + c) / 2 * PX, Y, c - a < 1 ? 16 : 20, '#fff', { maxW: (c - a) * PX - 10 }); });
      for (let m = 0; m <= 7; m++) txt(g, `${m}`, X0 + m * PX, Y + 62, 20, C.dim, { w: 700 });
      txt(g, 'minute', X0 + 7 * PX + 30, Y + 92, 16, C.dim, { w: 600 });
      g.save(); g.strokeStyle = C.key; g.lineWidth = 4; g.setLineDash([8, 6]); g.beginPath(); g.moveTo(X0 + 6 * PX, Y - 60); g.lineTo(X0 + 6 * PX, Y + 40); g.stroke(); g.restore();
      txt(g, '„mai e 1 minut” → concluzia', X0 + 6 * PX - 60, Y - 82, 19, C.key);
      const hand = REDUCED ? 3 : (t * 0.6) % 7; dot(g, X0 + hand * PX, Y - 44, 9, '#fff');
      ST.forEach(([h, s], i) => {
        const x = 140 + i * 240; const act = b.i === i; k[i] = lerp(k[i], act ? 1 : 0, 0.1);
        const hh = 250 + 30 * k[i]; const p = new Path2D(); p.roundRect(x - 105, 880 - hh, 210, hh, 18);
        g.save(); g.fillStyle = ['#7d5a1a', '#9c6c14', '#C27A10', '#d9952e'][i]; if (act) { g.shadowColor = C.hi; g.shadowBlur = 24; } g.fill(p); g.shadowBlur = 0; g.strokeStyle = act ? C.hi : OUT; g.lineWidth = act ? 6 : 5; g.stroke(p); g.restore();
        txt(g, String(i + 1), x, 880 - hh + 50, 44, '#fff');
        txt(g, h, x, 880 - hh + 110, 22, '#fff', { maxW: 200 });
        txt(g, s, x, 880 - hh + 175, 18, '#fff3e0', { w: 600, maxW: 200 });
      });
      txt(g, 'se punctează doar ce spui cu voce tare', 500, 920, 18, C.dim, { w: 700 });
    },
  };
}

/* =================================================== CHEIA ÎN BROASCĂ (5 liganzi) */
const KEYS = [
  { c: KC.full, ang: 1, eff: 1, n: 'agonist\ntotal', a: 'α = 1' },
  { c: KC.part, ang: 0.5, eff: 0.5, n: 'agonist\nparțial', a: '0 < α < 1' },
  { c: KC.comp, ang: 0, eff: 0, n: 'antagonist\ncompetitiv', a: 'α = 0', bad: true },
  { c: KC.non, ang: 0, eff: 0, n: 'antagonist\nnecompetitiv', a: 'alt situs', non: true },
  { c: KC.inv, ang: -1, eff: -0.45, n: 'agonist\ninvers', a: 'α < 0' },
];
export function keys() {
  const X = [110, 300, 500, 700, 890]; const LY = 300, BASE = 690;
  return {
    home: HOME, anchors: X.map((x) => [x - 62, 130]),
    phase: (i) => ['α = 1: efect maxim', 'α parțial', 'ocupă, nu activează', 'pană pe alt situs', 'efect opus'][i] || '',
    draw(g, t, b) {
      bg(g);
      txt(g, 'cheia = ligandul · broasca = receptorul', 500, 915, 18, C.dim, { w: 700 });
      g.save(); g.strokeStyle = 'rgba(255,243,230,.5)'; g.lineWidth = 3; g.setLineDash([8, 6]); g.beginPath(); g.moveTo(20, BASE); g.lineTo(980, BASE); g.stroke(); g.restore();
      txt(g, 'efect = 0', 975, BASE - 16, 15, C.dim, { w: 700, align: 'right' });
      KEYS.forEach((K, i) => {
        const x = X[i]; const on = b.i === i; const u = b.i < 0 || b.i > i ? 1 : b.i < i ? 0 : clamp(b.bt / (b.bd * 0.85));
        const dim = b.i >= 0 && !on ? 0.55 : 1;
        const pin = K.non ? ease(clamp(u / 0.3)) : 0;
        const desc = K.non ? ease(clamp((u - 0.3) / 0.3)) : ease(clamp(u / 0.35));
        const rot = K.non ? 0 : ease(clamp((u - 0.4) / 0.3));
        const ef = ease(clamp((u - 0.7) / 0.3));
        g.save(); g.globalAlpha = dim;
        if (on) { g.save(); g.shadowColor = C.hi; g.shadowBlur = 22; g.strokeStyle = C.hi; g.lineWidth = 4; g.beginPath(); g.roundRect(x - 92, 70, 184, 830, 22); g.stroke(); g.restore(); }
        lock(g, x, LY, K.ang * rot, { wedge: K.non ? pin : 0, pinch: K.non ? pin : 0 });
        const tipY = K.non ? lerp(80, LY - 26, desc) : lerp(90, LY + 16, desc);
        key(g, x, tipY, K.c, { spin: K.ang * rot, teeth: K.bad ? 'bad' : 'ok' });
        if (K.non && desc > 0.95) cross(g, x + 34, LY - 50, 16, C.key, 1);
        if (K.ang !== 0 && rot > 0.05) { // săgeata de rotație peste buclă
          g.save(); g.strokeStyle = K.c; g.lineWidth = 5; g.beginPath(); const s0 = -Math.PI * 0.85, s1 = s0 + K.ang * rot * Math.PI * 0.7; g.arc(x, LY - 150, 56, Math.min(s0, s1), Math.max(s0, s1)); g.stroke(); g.restore();
        }
        // bara de efect
        const h = 150 * K.eff * ef; const bw = 56;
        if (Math.abs(h) > 1) { const p = new Path2D(); p.roundRect(x - bw / 2, h > 0 ? BASE - h : BASE, bw, Math.abs(h), 8); g.save(); g.fillStyle = K.c; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(p); g.restore(); }
        else if (ef > 0.5) txt(g, '0', x, BASE - 22, 24, C.cream);
        if (K.bad && ef > 0.5) txt(g, 'ține locul', x, BASE - 60, 17, K.c, { w: 700 });
        txt(g, K.n, x, 800, 21, K.c);
        txt(g, K.a, x, 870, 19, C.cream, { w: 700 });
        g.restore();
      });
    },
  };
}

/* =================================================== TABELUL LIGANZILOR (coloana îngustă) */
export function ligRows() {
  const WW = 600, HH = 897; const RH = 140; const Y0 = 22;
  const R = [{ c: '#9be15d', ang: 1, n: 'mediator (endogen)', a: 'afinitate + α' }, { c: KC.full, ang: 1, n: 'agonist total', a: 'α = 1' }, { c: KC.part, ang: 0.5, n: 'agonist parțial', a: '0 < α < 1' },
    { c: KC.comp, ang: 0, n: 'antagonist competitiv', a: 'α = 0 · același situs', bad: true }, { c: KC.non, ang: 0, n: 'antagonist necompetitiv', a: 'alt situs', non: true }, { c: KC.inv, ang: -1, n: 'agonist invers', a: 'α < 0 · R* → R' }];
  return {
    W: WW, H: HH, home: cam(WW / 2, HH / 2, 1), anchors: R.map((_, k) => [34, Y0 + k * (RH + 6) + 26]),
    draw(g, t, b) {
      bg(g, WW, HH);
      R.forEach((r, k) => {
        const y = Y0 + k * (RH + 6); const on = b.i === k; const a = b.i < 0 || on ? 1 : 0.5;
        panel(g, 12, y, WW - 24, RH, { fill: on ? 'rgba(255,207,133,.15)' : 'rgba(255,236,200,.06)', stroke: on ? C.hi : 'rgba(255,225,180,.2)', lw: on ? 5 : 3 });
        g.save(); g.globalAlpha = a;
        lock(g, 120, y + 52, r.ang, { s: 0.52, wedge: r.non ? 1 : 0, pinch: r.non ? 1 : 0 });
        key(g, 120, r.non ? y + 34 : y + 60, r.c, { s: 0.5, spin: r.ang, teeth: r.bad ? 'bad' : 'ok' });
        if (r.non) cross(g, 140, y + 24, 10, C.key, 1);
        txt(g, r.n, 380, y + 52, 23, r.c, { maxW: 380 });
        txt(g, r.a, 380, y + 96, 19, C.cream, { w: 700, maxW: 380 });
        g.restore();
      });
    },
  };
}

/* =================================================== CURBELE DOZĂ–EFECT */
export function curves() {
  const X0 = 140, X1 = 940, Y0 = 760, Y1 = 170; // Y1 = 100%
  const CU = [{ m: 0.4, mx: 1, c: KC.full, l: 'agonist total' }, { m: 0.62, mx: 1, c: KC.comp, l: '+ antagonist competitiv' }, { m: 0.4, mx: 0.55, c: KC.non, l: '+ antagonist necompetitiv' }, { m: 0.4, mx: 0.4, c: KC.part, l: 'agonist parțial' }];
  const PX = (u) => lerp(X0, X1, u), PY = (e) => lerp(Y0, Y1, e);
  function drawC(g, m, mx, c, u1 = 1, w = 7, a = 1) {
    g.save(); g.globalAlpha = a; g.lineJoin = 'round'; g.lineCap = 'round'; const N = Math.max(2, Math.floor(120 * u1));
    for (const [cc, ww] of [[OUT, w + 6], [c, w]]) { g.strokeStyle = cc; g.lineWidth = ww; g.beginPath(); for (let k = 0; k <= N; k++) { const u = k / 120; const px = PX(u), py = PY(mx * sig(u, m)); k ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); }
    g.restore();
  }
  return {
    home: HOME, anchors: [[PX(0.4) - 40, PY(0.5) - 30], [PX(0.62) + 50, PY(0.5)], [PX(0.8), PY(0.55) + 34], [PX(0.8), PY(0.4) + 38]],
    phase: (i) => ['agonistul: maxim 100%', 'competitiv: curba → dreapta', 'necompetitiv: maximul ↓', 'parțial: maxim mic'][i] || '',
    draw(g, t, b) {
      bg(g);
      // axele
      g.save(); g.strokeStyle = C.cream; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(X0, Y1 - 60); g.lineTo(X0, Y0); g.lineTo(X1 + 30, Y0); g.stroke(); g.restore();
      arr(g, X1, Y0, X1 + 40, Y0, C.cream, 5); arr(g, X0, Y1 - 30, X0, Y1 - 70, C.cream, 5);
      [[0, '0'], [0.5, '50'], [1, '100']].forEach(([e, l]) => { txt(g, l, X0 - 40, PY(e), 22, C.cream, { w: 700 }); });
      g.save(); g.setLineDash([10, 8]); g.strokeStyle = 'rgba(255,243,230,.45)'; g.lineWidth = 2.5; for (const e of [0.5, 1]) { g.beginPath(); g.moveTo(X0, PY(e)); g.lineTo(X1, PY(e)); g.stroke(); } g.restore();
      txt(g, 'efect (%)', X0 + 10, Y1 - 90, 20, C.cream, { align: 'left' });
      txt(g, 'doza (scală logaritmică) →', 640, Y0 + 50, 21, C.cream);
      const st = (k) => (b.i < 0 || b.i > k ? 1 : b.i < k ? 0 : clamp(b.bt / (b.bd * 0.7)));
      // 1: agonistul se desenează
      const s0 = st(0); drawC(g, CU[0].m, 1, CU[0].c, ease(s0));
      if (s0 > 0.9) { g.save(); g.setLineDash([6, 6]); g.strokeStyle = CU[0].c; g.lineWidth = 3; g.beginPath(); g.moveTo(PX(0.4), PY(0.5)); g.lineTo(PX(0.4), Y0); g.stroke(); g.restore(); txt(g, 'CE50', PX(0.4), Y0 + 20, 17, CU[0].c); }
      // 2: competitivul: curba alunecă la dreapta, același maxim
      const s1 = st(1); if (s1 > 0) { const m = lerp(0.4, 0.62, ease(s1)); drawC(g, m, 1, CU[1].c, 1); if (s1 > 0.5) arr(g, PX(0.43), PY(0.5) - 2, PX(0.58), PY(0.5) - 2, CU[1].c, 6, clamp((s1 - 0.5) * 3)); }
      // 3: necompetitivul: maximul se turtește
      const s2 = st(2); if (s2 > 0) { drawC(g, 0.4, lerp(1, 0.55, ease(s2)), CU[2].c, 1); if (s2 > 0.6) { arr(g, PX(0.9), PY(0.95), PX(0.9), PY(0.6), CU[2].c, 6, clamp((s2 - 0.6) * 3)); } }
      // 4: parțialul
      const s3 = st(3); if (s3 > 0) drawC(g, 0.4, 0.4, CU[3].c, ease(s3));
      // etichete
      if (s0 > 0.9) txt(g, 'max. 100%', PX(0.94), PY(1) - 26, 19, CU[0].c);
      if (s1 > 0.9) txt(g, '→ la dreapta', PX(0.7), PY(0.75), 19, CU[1].c);
      if (s2 > 0.9) txt(g, 'max. ↓', PX(0.97), PY(0.55) - 28, 19, CU[2].c);
      if (s3 > 0.9) txt(g, 'max. mic', PX(0.97), PY(0.4) - 26, 19, CU[3].c);
      // legenda
      CU.forEach((c, k) => { const ly = 610 + k * 30; g.save(); g.globalAlpha = st(k) > 0 ? 1 : 0.35; g.strokeStyle = c.c; g.lineWidth = 7; g.beginPath(); g.moveTo(640, ly); g.lineTo(680, ly); g.stroke(); g.restore(); txt(g, c.l, 692, ly, 17, C.cream, { align: 'left', w: 700, alpha: st(k) > 0 ? 1 : 0.4 }); });
      txt(g, 'curbe orientative', 160, 900, 16, C.dim, { align: 'left', w: 600 });
    },
  };
}

/* =================================================== CELE DOUĂ BLOCĂRI */
// receptorul-cupă: buzunar sus (strâns de pinch), situs lateral dreapta
export function cup(g, x, y, col, o = {}) {
  const pinch = o.pinch || 0; const pw = 46 * (1 - 0.7 * pinch); const s = o.s || 1;
  g.save(); g.translate(x, y); g.scale(s, s);
  if (o.glow) { g.shadowColor = o.gc || C.hi; g.shadowBlur = 34 * o.glow; }
  const p = new Path2D();
  p.moveTo(-70, -40); p.lineTo(-pw / 2 - 6, -40); p.lineTo(-pw / 2, 6); p.lineTo(pw / 2, 6); p.lineTo(pw / 2 + 6, -40); p.lineTo(70, -40);
  p.lineTo(70, 20); p.lineTo(84, 26); p.lineTo(84, 62); p.lineTo(70, 68); p.lineTo(70, 130); p.quadraticCurveTo(0, 150, -70, 130); p.closePath();
  g.fillStyle = col; g.fill(p); g.shadowBlur = 0; g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(p);
  g.restore();
}
export function blocks() {
  const MY = 470; const L = 250, R = 750;
  const rnd = (k) => ((Math.sin(k * 12.9898) * 43758.5453) % 1 + 1) % 1;
  return {
    home: HOME, anchors: [[L - 200, 140], [R - 200, 140]],
    phase: (i) => ['același situs: reversibil', 'alt situs: ireversibil'][i] || '',
    draw(g, t, b) {
      bg(g);
      panel(g, 20, 100, 470, 810, { stroke: b.i === 0 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 0 ? 5 : 3 });
      panel(g, 510, 100, 470, 810, { stroke: b.i === 1 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 1 ? 5 : 3 });
      txt(g, 'competitiv', L, 140, 26, KC.comp); txt(g, 'necompetitiv', R, 140, 26, KC.non);
      membrane(g, 30, 480, MY + 30, { h: 50 }); membrane(g, 520, 970, MY + 30, { h: 50 });
      // --- stânga: competitivul
      const u = b.i < 0 || b.i > 0 ? 1 : b.i === 0 ? clamp(b.bt / (b.bd * 0.9)) : 0;
      const pocket = [L, MY + 4];
      // faze: 0–.25 agonistul în buzunar; .25–.55 antagoniștii vin, unul îl scoate; .55–1 agoniști mulți, unul reocupă
      const pA = ease(clamp((u - 0.25) / 0.25)), pB = ease(clamp((u - 0.6) / 0.3));
      const agOcc = u < 0.25 || pB > 0.6; const antOcc = !agOcc;
      cup(g, L, MY, '#7ad3a0', { glow: agOcc ? 0.8 : 0, gc: C.gs });
      // agonistul inițial
      const a0x = lerp(pocket[0], L - 140, pA), a0y = lerp(pocket[1] - 18, 220, pA);
      tri(g, a0x, a0y, 26, '#ff9a4a', 'A');
      // antagoniștii
      for (let j = 0; j < 4; j++) { const sx = 100 + j * 95, sy = 180 + (j % 2) * 50; const tx = j === 0 ? pocket[0] : 110 + j * 100, ty = j === 0 ? pocket[1] - 18 : 300 + (j % 2) * 40; let q = ease(clamp((u - 0.2 - j * 0.03) / 0.3)); let x = lerp(sx, tx, q), y = lerp(sy, ty, q); if (j === 0 && pB > 0) { x = lerp(tx, L + 150, pB); y = lerp(ty, 220, pB); } if (u > 0.18) tri(g, x, y, 24, '#e0473d', 'C'); }
      // doză mare de agonist
      for (let j = 0; j < 5; j++) { const sx = 60 + j * 90, sy = 150; const tx = j === 0 ? pocket[0] : 80 + j * 80, ty = j === 0 ? pocket[1] - 18 : 360; const q = ease(clamp((u - 0.55 - j * 0.02) / 0.3)); if (u > 0.55) tri(g, lerp(sx, tx, q), lerp(sy, ty, q), 22, '#ff9a4a', 'A'); }
      txt(g, antOcc && u > 0.45 && u < 0.7 ? 'antagonistul a luat locul' : u >= 0.7 ? 'doză mare de agonist: îl recâștigă' : 'agonistul activează', L, 640, 19, C.cream, { w: 700, maxW: 440 });
      txt(g, 'același situs · reversibil', L, 700, 21, KC.comp);
      txt(g, '→ curba la dreapta', L, 740, 21, C.cream);
      // --- dreapta: necompetitivul
      const v = b.i < 0 || b.i > 1 ? 1 : b.i === 1 ? clamp(b.bt / (b.bd * 0.9)) : 0;
      const nb = ease(clamp(v / 0.3));
      cup(g, R, MY, '#7ad3a0', { pinch: nb, glow: 0 });
      ligand(g, lerp(R + 210, R + 100, nb), MY + 44, '#ff5fa2', 'N', 22, { shape: 'block' });
      for (let j = 0; j < 5; j++) {
        const ph = clamp((v - 0.3 - j * 0.1) / 0.3); if (v < 0.3 + j * 0.1) continue;
        const sx = R - 160 + j * 75; const down = ph < 0.5 ? ease(ph * 2) : 1 - ease((ph - 0.5) * 2) * 0.8;
        const x = lerp(sx, R + (j - 2) * 10, ph < 0.5 ? ease(ph * 2) : 1), y = lerp(200 + (j % 2) * 70, MY - 60, down);
        tri(g, x + (ph > 0.5 ? (j - 2) * 60 * (ph - 0.5) : 0), y, 22, '#ff9a4a', 'A');
      }
      if (v > 0.55) cross(g, R, MY - 70, 18, C.key, 1);
      txt(g, 'situsul agonistului deformat', R, 640, 19, C.cream, { w: 700, alpha: nb });
      txt(g, 'alt situs · ireversibil', R, 700, 21, KC.non);
      txt(g, '→ maximul scade', R, 740, 21, C.cream);
      txt(g, 'A = agonist · C = antagonist competitiv · N = antagonist necompetitiv', 500, 860, 17, C.dim, { w: 700 });
    },
  };
}

/* =================================================== CARDUL DE CAZ (enunțul) */
const DEC = {
  B: [['afinitate', 'da · centrul respirator'], ['activitate intr.', 'da → agonist'], ['mesagerii', 'mesageri secunzi'], ['țesutul', 'centrul respirator'], ['tratament', 'antagonist competitiv']],
  D: [['afinitate', 'da · receptori Gs'], ['activitate intr.', 'da → agonist'], ['proteina G', 'Gs: AMPc ↑'], ['țesutul', 'bronhii + uter'], ['efect', 'bronhodilatator, tocolitic']],
  E: [['afinitate', 'da · Gs din cord'], ['activitate intr.', 'nu → antagonist'], ['proteina G', 'Gs blocată'], ['țesutul', 'cord (β1)'], ['efect', 'cardioinhibiție']],
  alergie: [['ligandul', 'histamina'], ['activitate intr.', 'da → agonist'], ['proteina G', 'Gq: IP3 + DAG'], ['țesutul', 'mușchi neted bronșic'], ['efect', 'bronhoconstricție']],
  soc: [['mecanism', 'hipersensibilitate tip I'], ['prima expunere', 'IgE pe mastocite'], ['re-expunerea', 'degranulare'], ['efecte', 'TA ↓ · dispnee'], ['tratament', 'adrenalină 0,5 mg i.m.']],
};
const Q = { B: 'Cu ce tratezi?\nExplicați!', D: 'Ce efect și ce\nindicații?', E: 'Ce efect și ce\nindicații?', alergie: 'Mecanismul\ndispneei?', soc: 'Cauza\ntabloului?' };
export function caseCard({ spec }) {
  const kd = spec.sceneOpts.kind; const rows = DEC[kd];
  const CX = 560, CW = 420, RY = 458, RH = 76;
  return {
    home: HOME, anchors: [[45, 150], [CX - 4, RY - 6], [70, 470], [CX - 4, RY + 4 * (RH + 6) + 4]],
    draw(g, t, b) {
      bg(g);
      panel(g, 20, 20, 960, 420, { stroke: b.i === 0 ? C.hi : 'rgba(255,225,180,.2)', lw: b.i === 0 ? 5 : 3 });
      const beat = Math.max(0, Math.sin(t * 3)) ** 6;
      if (kd === 'B') {
        icon(g, 'pill', 180, 140, 1.4, { col: '#ff9a4a' }); txt(g, 'medicamentul B', 180, 210, 20, '#ff9a4a');
        arr(g, 280, 160, 380, 200, C.cream, 6);
        icon(g, 'brain', 500, 210, 2.1); txt(g, 'centrul respirator bulbar', 500, 330, 20, C.cream);
        arr(g, 640, 210, 720, 210, C.cream, 6);
        const br = 0.5 + 0.08 * Math.sin(t * 0.9); icon(g, 'bronchi', 830, 190, 1.6 * br + 0.6); txt(g, 'respirație ↓↓', 830, 330, 22, C.gi);
        txt(g, 'T.E., 45 de ani · UPU · supradoză', 500, 400, 19, C.dim, { w: 700 });
      } else if (kd === 'D') {
        membrane(g, 60, 360, 230, { h: 44 }); receptor(g, 210, 230, C.gs, 'Gs', { s: 0.9, ly: 80, glow: 0.6, gc: C.gs }); ligand(g, 210, 160, C.gs, 'D', 22);
        bronchus(g, 560, 200, 110, 0.85); txt(g, 'mușchi neted traheobronșic', 560, 345, 19, C.cream);
        icon(g, 'uterus', 830, 190, 1.7); txt(g, 'mușchi neted uterin', 830, 345, 19, C.cream);
      } else if (kd === 'E') {
        membrane(g, 60, 360, 230, { h: 44 }); receptor(g, 210, 230, C.gs, 'Gs', { s: 0.9, ly: 80 }); ligand(g, 210, 160, C.gi, 'E', 22, { shape: 'block' }); cross(g, 300, 120, 14, C.key, 1); ligand(g, 330, 90, C.na, 'NA', 20);
        heart(g, 640, 210, 1.15, beat * 0.5); txt(g, 'receptori Gs din cord', 640, 345, 20, C.cream);
        txt(g, 'fără activitate\nintrinsecă', 870, 210, 22, C.gi);
      } else if (kd === 'alergie') {
        icon(g, 'pill', 120, 150, 1.2, { col: '#9fd3f0' }); txt(g, 'antibiotic', 120, 215, 19, C.cream);
        arr(g, 200, 150, 260, 150, C.cream, 5); ell(g, 330, 150, 52, 52, '#fbf3e2', { ow: 5 }); g.save(); g.strokeStyle = OUT; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(330, 150); g.lineTo(330, 115); g.moveTo(330, 150); g.lineTo(358, 162); g.stroke(); g.restore(); txt(g, 'câteva ore', 330, 230, 19, C.cream);
        arr(g, 395, 150, 440, 180, C.cream, 5);
        mastocyte(g, 540, 230, 80, 0.35 + 0.1 * Math.sin(t * 2), t); txt(g, 'mastocit → histamină', 540, 345, 19, '#d6a7ff');
        arr(g, 640, 230, 700, 230, C.cream, 5);
        bronchus(g, 830, 210, 105, 0.15); txt(g, 'bronhie strânsă (Gq)', 830, 345, 19, C.gq);
      } else if (kd === 'soc') {
        icon(g, 'pill', 110, 130, 1.1, { col: '#9fd3f0' }); txt(g, 'antibiotic X', 110, 190, 18, C.cream);
        arr(g, 180, 130, 240, 130, C.cream, 5);
        panel(g, 250, 80, 130, 110, { fill: '#fbf3e2', stroke: OUT, lw: 5, r: 14 }); txt(g, '8 luni', 315, 140, 24, OUT, { stroke: false });
        arr(g, 390, 130, 450, 130, C.cream, 5);
        icon(g, 'pill', 520, 130, 1.1, { col: '#9fd3f0' }); txt(g, 'același X', 520, 190, 18, C.cream);
        vesselX(g, 200, 320, 62, 1, { leak: 0.8 }); gauge(g, 360, 320, 62, 0.12, 'TA ↓');
        bronchus(g, 560, 320, 70, 0.1, { edema: true }); txt(g, 'dispnee', 560, 410, 18, C.gq);
        txt(g, 'se prăbușește:\nhipotensiune +\ndificultăți\nrespiratorii', 820, 260, 22, C.key);
      }
      // bula cu întrebarea
      panel(g, 40, 470, 480, 140, { fill: 'rgba(127,232,255,.10)', stroke: b.i === 2 ? C.hi : 'rgba(127,232,255,.5)', lw: b.i === 2 ? 5 : 3 });
      txt(g, '?', 100, 540, 64, C.camp);
      txt(g, Q[kd], 310, 540, 26, C.cream);
      // coloana decodorului
      rows.forEach(([h, v], k) => {
        const y = RY + k * (RH + 6); const lit = b.i < 0 || (k < 4 ? b.i >= 1 : b.i >= 3); const now = (k < 4 && b.i === 1) || (k === 4 && b.i === 3);
        panel(g, CX, y, CW, RH, { fill: lit ? (k === 4 ? 'rgba(255,107,94,.18)' : 'rgba(255,207,133,.14)') : 'rgba(255,236,200,.05)', stroke: now ? C.hi : 'rgba(255,225,180,.25)', lw: now ? 5 : 3, r: 16 });
        txt(g, h, CX + 20, y + 22, 16, C.dim, { align: 'left', w: 700, alpha: lit ? 1 : 0.5 });
        txt(g, lit ? v : '…', CX + CW / 2 + 10, y + 52, 21, k === 4 ? '#ffd0c8' : C.cream, { alpha: lit ? 1 : 0.5, maxW: CW - 30 });
      });
    },
  };
}

/* =================================================== CAZUL 1: NALOXONA DEPLASEAZĂ AGONISTUL */
export function displace() {
  const MY = 300; const RX = [230, 500, 770];
  const wave = (g, x0, x1, y, amp, fr, t, col) => { g.save(); g.lineJoin = 'round'; for (const [c, w] of [[OUT, 9], [col, 5]]) { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); for (let x = x0; x <= x1; x += 4) { const yy = y - amp * Math.sin((x - x0) / 60 * fr - t * 2 * fr); x === x0 ? g.moveTo(x, yy) : g.lineTo(x, yy); } g.stroke(); } g.restore(); };
  return {
    home: HOME, anchors: [[RX[0] - 90, MY - 150], [RX[2] + 110, MY + 150], [930, 110], [80, 690]],
    phase: (i) => ['B se leagă: agonist', 'mesageri → respirație ↓', 'naloxona deplasează B', 'respirația revine'][i] || '',
    draw(g, t, b) {
      bg(g);
      const ph = b.i < 0 ? 4 : b.i + clamp(b.bt / (b.bd * 0.8));
      const p = (k) => clamp(ph - k);
      txt(g, 'în afara celulei', 120, 80, 17, C.dim, { w: 700 });
      const cell = new Path2D(); cell.roundRect(20, MY, 960, 300, 30); g.save(); g.fillStyle = `rgba(246,227,200,${0.16 - 0.08 * clamp(p(1)) * (1 - clamp(p(3)))})`; g.fill(cell); g.restore();
      membrane(g, 20, 980, MY, { h: 50 });
      txt(g, 'neuronul centrului respirator', 500, 580, 20, C.cream);
      const bind = ease(clamp(p(0) / 0.6)); const out = ease(clamp(p(2) / 0.7)); const active = bind * (1 - out);
      RX.forEach((x, j) => {
        cup(g, x, MY - 24, '#7ad3a0', { s: 0.85, glow: active, gc: '#ff9a4a' });
        // B intră, apoi e scos în sus
        const bx = lerp(x + (j - 1) * 30, x, bind), by = lerp(80, MY - 30, bind);
        const ox = lerp(bx, x + 60 + j * 30, out), oy = lerp(by, 90 + j * 25, out);
        tri(g, ox, oy, 24, '#ff9a4a', 'B');
        // naloxona vine și ia locul
        const nq = ease(clamp((p(2) - j * 0.08) / 0.6)); if (ph >= 2) tri(g, lerp(880 + j * 30, x, nq), lerp(60 + j * 20, MY - 30, nq), 24, '#e0473d', 'N');
        // mesagerii secunzi
        const mlit = clamp(p(1) * 2) * (1 - clamp(p(2) * 1.5));
        pill(g, x, MY + 130, 200, 50, mlit > 0.1 ? '#bcdcff' : '#4a3d58', 'Gi → AMPc ↓', { size: 18, alpha: 0.4 + 0.6 * mlit, glow: mlit > 0.5 ? 1 : 0, gc: C.gi, col: mlit > 0.1 ? OUT : '#d8cde0' });
      });
      if (ph >= 2) for (let j = 0; j < 4; j++) tri(g, 650 + j * 85, 140 + (j % 2) * 40, 20, '#e0473d', 'N', { alpha: clamp(p(2) * 2) });
      txt(g, 'mesageri secunzi', 500, MY + 200, 18, C.dim, { w: 700 });
      // respirația
      panel(g, 20, 620, 960, 290, {});
      const dep = clamp(p(1)) * (1 - clamp(p(3)));
      const amp = lerp(70, 18, dep), fr = lerp(1, 0.45, dep);
      wave(g, 160, 960, 765, amp, fr, REDUCED ? 0 : t, dep > 0.5 ? C.gi : '#9be15d');
      txt(g, 'respirația', 85, 735, 20, C.cream); txt(g, dep > 0.5 ? 'rară, mică' : 'normală', 85, 790, 19, dep > 0.5 ? C.gi : '#9be15d', { w: 700 });
      txt(g, ph >= 3.2 ? 'respirația revine' : ph >= 1.3 ? 'deprimare respiratorie' : '', 560, 880, 22, ph >= 3.2 ? '#9be15d' : C.gi);
      txt(g, 'B = agonist · N = naloxona (antagonist competitiv)', 640, 650, 16, C.dim, { w: 700 });
    },
  };
}
