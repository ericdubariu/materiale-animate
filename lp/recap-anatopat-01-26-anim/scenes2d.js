// Scenele recapitulării OSPE Anatomie patologică (preparatele 1–26): copertă, fișa, planul stației,
// câte o scenă-poză pe preparat (poza reală + detaliul + partenerul DD), DD comparative, mozaicuri.
import { OUT, clamp, lerp, ease, glowRing, srand, rnd, rr, REDUCED } from './kit2d.js';
import { mosaic } from './atlas.js';
import { FIELDS } from './dz1.js';
import { DDF } from './dz2.js';
import { drawPancreas } from './dz4.js';

const W = 1000, H = 934;
const cam = (x, y, z) => ({ x, y, z });
const HOME = cam(500, 467, 1);
const lbl = (at, html, o = {}) => ({ at, html, ...o });
const bgFill = (g, a = '#2e1838', b = '#140a1a', w = W, h = H) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(-3000, -3000, w + 6000, h + 6000); };
function txt(g, s, x, y, size = 26, col = '#fff', align = 'center', wt = 800) {
  g.save(); g.font = `${wt} ${size}px "Plus Jakarta Sans", Inter, sans-serif`; g.textAlign = align; g.lineJoin = 'round';
  g.strokeStyle = OUT; g.lineWidth = Math.max(4, size * 0.22); g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); g.restore();
}
const IM = {};
const img = (n) => { if (!IM[n]) { const i = new Image(); i.src = `img/${n}.jpg`; IM[n] = i; } return IM[n]; };
const ready = (im) => im.complete && im.naturalWidth;
const COLS = ['#ffe36e', '#7fe8ff', '#9dff8a', '#ffa3e0', '#ffb36b', '#c9b3ff'];

// transformarea unei poze (W×H în coordonatele marcajelor) într-o cutie: contain sau cover
function fitT(w, h, bx, by, bw, bh, cover) { const r = cover ? Math.max(bw / w, bh / h) : Math.min(bw / w, bh / h); return { r, ox: bx + (bw - w * r) / 2, oy: by + (bh - h * r) / 2 }; }
function photo(g, name, box, T, w, h, rad = 12) {
  const [bx, by, bw, bh] = box; const im = img(name);
  g.save(); g.beginPath(); g.roundRect(bx, by, bw, bh, rad); g.fillStyle = '#0b0610'; g.fill(); g.clip();
  if (ready(im)) g.drawImage(im, T.ox, T.oy, w * T.r, h * T.r);
  g.restore();
}
function frame(g, box, on, rad = 12) { const [bx, by, bw, bh] = box; g.save(); g.lineWidth = on ? 6 : 4; g.strokeStyle = on ? '#ffe36e' : OUT; if (on) { g.shadowColor = '#ffe36e'; g.shadowBlur = 16; } g.beginPath(); g.roundRect(bx, by, bw, bh, rad); g.stroke(); g.restore(); }
function mark(g, m, T, k, on, t, clip) {
  const x = T.ox + m.x * T.r, y = T.oy + m.y * T.r, rx = m.rx * T.r, ry = (m.ry ?? m.rx) * T.r, c = m.color || COLS[k % COLS.length];
  g.save(); if (clip) { g.beginPath(); g.roundRect(...clip, 12); g.clip(); }
  g.lineWidth = 6; g.strokeStyle = OUT; g.beginPath(); g.ellipse(x, y, rx, ry, m.rot || 0, 0, 7); g.stroke();
  g.lineWidth = on ? 4.5 : 3; g.strokeStyle = c; if (on) { g.shadowColor = c; g.shadowBlur = 14; }
  if (m.dash) g.setLineDash([12, 8]);
  g.beginPath(); g.ellipse(x, y, rx, ry, m.rot || 0, 0, 7); g.stroke(); g.shadowBlur = 0;
  if (on) { g.globalAlpha = 0.16 + (REDUCED ? 0.04 : 0.06 * Math.sin(t * 3)); g.fillStyle = c; g.fill(); }
  g.restore();
}
function tag(g, s, x, y, col = '#f6eef7', size = 13) {
  g.save(); g.font = `700 ${size}px Inter, sans-serif`; const w = g.measureText(s).width + 14;
  g.fillStyle = 'rgba(20,10,28,.86)'; g.beginPath(); g.roundRect(x, y, w, size + 10, 8); g.fill();
  g.fillStyle = col; g.textBaseline = 'middle'; g.fillText(s, x + 7, y + (size + 10) / 2 + 0.5); g.restore();
}
function wrapText(g, s, x, y, maxW, lh, size = 10.5, col = 'rgba(246,238,247,.62)') {
  g.save(); g.font = `500 ${size}px Inter, sans-serif`; g.fillStyle = col; g.textBaseline = 'alphabetic';
  const words = s.split(' '); let line = '', yy = y;
  for (const w of words) { const tt = line ? line + ' ' + w : w; if (g.measureText(tt).width > maxW && line) { g.fillText(line, x, yy); line = w; yy += lh; } else line = tt; }
  if (line) g.fillText(line, x, yy); g.restore();
}

/* =========================================================== PREPARATUL (o scenă pe preparat, layout „script”) */
// sceneOpts: main {img,W,H,marks}, sub {img,W,H,marks,cap}, dd {img,cap}, bad: [null|['m',k]|['s',k]|['s']|['d']] (pe rânduri), phase, cred
function prep({ spec }) {
  const o = spec.sceneOpts; const SW = 452, SH = 676;
  const MB = [6, 48, 440, 352], SB = [6, 410, 216, 214], DB = [230, 410, 216, 214];
  const m = o.main, s = o.sub, d = o.dd;
  const TM = fitT(m.W, m.H, ...MB, false);
  const TS = s ? fitT(s.W, s.H, ...SB, true) : null;
  const dIm = img(d.img); // dimensiunile partenerului vin după încărcare
  const TD = () => (ready(dIm) ? fitT(dIm.naturalWidth, dIm.naturalHeight, ...DB, true) : null);
  const mpos = (mm, T) => [T.ox + mm.x * T.r, T.oy + (mm.y - (mm.ry ?? mm.rx)) * T.r - 8];
  const anchors = o.bad.map((b) => {
    if (!b) return null;
    if (b[0] === 'm') return b[1] != null ? mpos(m.marks[b[1]], TM) : [MB[0] + MB[2] / 2, MB[1] + 22];
    if (b[0] === 's') return b[1] != null ? mpos(s.marks[b[1]], TS) : [SB[0] + SB[2] / 2, SB[1] + 16];
    return [DB[0] + DB[2] - 20, DB[1] + 20];
  }).map((p) => (p ? [clamp(p[0], 18, SW - 18), clamp(p[1], 58, SH - 18)] : null));
  const labels = (m.marks || []).filter((mm) => mm.lab).map((mm) => {
    const x = mm.lx != null ? TM.ox + mm.lx * TM.r : TM.ox + mm.x * TM.r;
    const y = mm.ly != null ? TM.oy + mm.ly * TM.r : TM.oy + (mm.y + (mm.ry ?? mm.rx)) * TM.r + 14;
    return lbl([clamp(x, 90, SW - 90), clamp(y, MB[1] + 14, MB[1] + MB[3] - 12)], mm.lab, { beats: mm.beats });
  });
  // etichetele nu au voie să se suprapună: lățimea aproximată din numărul de litere, apoi împingem pe verticală
  const wOf = (l) => l.html.length * 6.6 + 20;
  for (let pass = 0; pass < 6; pass++) labels.forEach((a, i) => labels.forEach((c, j) => {
    if (j <= i) return; const dx = Math.abs(a.at[0] - c.at[0]), dy = Math.abs(a.at[1] - c.at[1]);
    if (dx < (wOf(a) + wOf(c)) / 2 + 4 && dy < 28) { const up = c.at[1] < a.at[1]; c.at = [c.at[0], clamp(c.at[1] + (up ? -1 : 1) * (28 - dy + 2), MB[1] + 14, MB[1] + MB[3] - 12)]; if (Math.abs(c.at[1] - a.at[1]) < 28) c.at = [c.at[0], clamp(a.at[1] + (up ? 30 : -30), MB[1] + 14, MB[1] + MB[3] - 12)]; }
  }));
  return {
    W: SW, H: SH, home: { x: SW / 2, y: SH / 2, z: 1 }, cams: null, anchors, labels,
    phase: (i) => (o.phase || [])[i] || '',
    draw(g, t, b) {
      g.fillStyle = '#100916'; g.fillRect(-2000, -2000, 4000 + SW, 4000 + SH);
      if (m.draw) { g.save(); g.beginPath(); g.roundRect(...MB, 12); g.clip(); g.translate(TM.ox, TM.oy); g.scale(TM.r, TM.r); DRAW[m.draw](g, t); g.restore(); }
      else photo(g, m.img, MB, TM, m.W, m.H);
      frame(g, MB, (o.bad[b.i] || [])[0] === 'm' && (o.bad[b.i] || [])[1] == null);
      const cur = o.bad[b.i] || [];
      (m.marks || []).forEach((mm, k) => mark(g, mm, TM, k, (cur[0] === 'm' && cur[1] === k) || (o.descRows || []).includes(b.i), t, MB));
      if (s) {
        photo(g, s.img, SB, TS, s.W, s.H); (s.marks || []).forEach((mm, k) => mark(g, mm, TS, k + 2, cur[0] === 's' && (cur[1] === k || cur[1] == null), t, SB));
        frame(g, SB, cur[0] === 's'); tag(g, s.cap, SB[0] + 8, SB[1] + SB[3] - 31);
      }
      const T = TD(); if (T) photo(g, d.img, DB, T, dIm.naturalWidth, dIm.naturalHeight);
      frame(g, DB, cur[0] === 'd'); tag(g, d.cap, DB[0] + 8, DB[1] + DB[3] - 31, '#ffe36e');
      wrapText(g, o.cred, 8, 640, 380, 13);
    },
  };
}

/* =========================================================== COPERTA: cele 26 de preparate pe 4 rânduri */
const GROUPS = [[1, 5, 'Lamele 1–5 · LP 1–2 · HE'], [6, 12, 'Piesele 6–12 · LP 1–2'], [13, 18, 'Lamele 13–18 · LP 3–4 · HE'], [19, 26, 'Piesele 19–26 · LP 3–4']];
function cover() {
  const TW = 112, TH = 128, G = 10, ROWY = [70, 290, 510, 730];
  const tiles = []; GROUPS.forEach(([a, z], r) => { const n = z - a + 1; const x0 = (W - (n * TW + (n - 1) * G)) / 2; for (let k = 0; k < n; k++) tiles.push({ n: a + k, r, x: x0 + k * (TW + G), y: ROWY[r] + 40 }); });
  return {
    home: HOME, anchors: ROWY.map((y) => [40, y + 18]),
    draw(g, t, b) {
      bgFill(g);
      GROUPS.forEach(([, , s], r) => txt(g, s, 70, ROWY[r] + 28, 26, b.i === r ? '#ffe36e' : '#f3ecf6', 'left'));
      tiles.forEach((tl) => {
        const nm = tl.n === 20 ? 'q20' : 'p' + tl.n; const box = [tl.x, tl.y, TW, TH]; const im = img(nm);
        const T = ready(im) ? fitT(im.naturalWidth, im.naturalHeight, ...box, true) : null;
        if (T) photo(g, nm, box, T, im.naturalWidth, im.naturalHeight, 10);
        frame(g, box, b.i === tl.r, 10); tag(g, String(tl.n), tl.x + 6, tl.y + 6, '#ffe36e', 14);
      });
      if (b.i < 0) { const k = Math.abs(Math.floor(t * 1.2)) % tiles.length; const tl = tiles[k]; if (tl) glowRing(g, tl.x + TW / 2, tl.y + TH / 2, TW * 0.62, TH * 0.62, 0, (t * 1.2) % 1); }
    },
  };
}

/* =========================================================== FIȘA OFICIALĂ (desenul din LP 1–2, adaptat) */
function fisa() {
  const rows = [['Organ', 1, '#ffd36e'], ['Leziune', 1, '#ffd36e'], ['Definiție', 1, '#ffd36e'], ['Descriere', 6, '#ff9fc6'], ['Cauze', 4, '#c9b3ff'], ['Complicații', 4, '#7fe8ff'], ['DD', 1, '#9dff8a']];
  return {
    home: HOME, anchors: [[60, 60], [60, 330], [860, 510], [60, 730]],
    phase: (i) => ['3 puncte obligatorii', 'o bulină = 1 punct', 'minim 5 puncte', 'mecanismul = liantul'][i] || '',
    draw(g, t, b) {
      bgFill(g);
      rows.forEach(([nm, n, col], r) => {
        const y = 110 + r * 100; const on = (b.i === 0 && r < 3) || (b.i === 1 && r >= 3 && r <= 5) || (b.i === 3 && r >= 4);
        txt(g, nm, 330, y + 12, 30, on ? '#fff' : '#d9c8e4', 'right');
        for (let j = 0; j < n; j++) { const x = 380 + j * 74; const a = r < 3 || b.i !== 0 ? 1 : 0.35; g.save(); g.globalAlpha = 0.3 + 0.7 * a; g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.arc(x, y, on ? 30 : 26, 0, 7); g.fill(); g.stroke(); g.restore(); txt(g, r === 6 ? '✓' : '1', x, y + 10, 24, '#ffffff'); }
        if (r === 2) { g.save(); g.strokeStyle = '#ffd36e'; g.lineWidth = 4; g.setLineDash([10, 8]); g.strokeRect(345, 60, 75, 270); g.restore(); txt(g, 'OBLIGATORIU · 3 p', 445, 210, 26, '#ffd36e', 'left'); }
      });
      const tot = b.i === 2 ? Math.min(5, Math.floor(b.bt * 2.2)) : b.i > 2 || b.i < 0 ? 5 : 0;
      const cx = 860, cy = 650; g.save(); g.strokeStyle = OUT; g.lineWidth = 34; g.beginPath(); g.arc(cx, cy, 90, 0, 7); g.stroke(); g.strokeStyle = tot >= 5 ? '#9dff8a' : '#ff9fc6'; g.lineWidth = 24; g.beginPath(); g.arc(cx, cy, 90, -1.57, -1.57 + 6.283 * tot / 5); g.stroke(); g.restore(); txt(g, `${tot}/5`, cx, cy + 14, 40); txt(g, 'minim 5 p', cx, cy + 140, 26, '#ffe36e');
      if (b.i === 3) txt(g, 'cauză → leziune → complicație', 500, 880, 30, '#7fe8ff');
    },
  };
}

/* =========================================================== PLANUL STAȚIEI: cele 7 minute, ca diagramă Gantt */
const PLAN = [[0, 1.5, '#8d7fa0', 'citești + ciornă'], [1.5, 2, '#ffd36e', 'organ · leziune · definiție'], [2, 3.5, '#ff9fc6', 'descriere'], [3.5, 4.5, '#c9b3ff', 'cauze + complicații'], [4.5, 5.5, '#9dff8a', 'DD'], [5.5, 7, '#7fe8ff', 'completezi · concluzia']];
function plan() {
  const X = (m) => 90 + m * 120, Y = (k) => 170 + k * 112;
  return {
    home: HOME, anchors: PLAN.map(([a], k) => [X(a) + 16, Y(k) - 22]),
    labels: [[420, 0], [480, 1], [660, 2], [780, 3], [820, 4], [600, 5]].map(([x, k]) => lbl([x, Y(k) + 30], PLAN[k][3])),
    phase: (i) => ['0:00–1:30', '1:30–2:00', '2:00–3:30', '3:30–4:30', '4:30–5:30', '5:30–7:00'][i] || '',
    draw(g, t, b) {
      bgFill(g);
      for (let m = 0; m <= 7; m++) { g.save(); g.strokeStyle = m === 6 ? 'rgba(255,124,144,.8)' : 'rgba(255,255,255,.14)'; g.lineWidth = m === 6 ? 4 : 2; if (m === 6) g.setLineDash([12, 10]); g.beginPath(); g.moveTo(X(m), 110); g.lineTo(X(m), 860); g.stroke(); g.restore(); txt(g, `${m}:00`, X(m), 90, 22, '#d9c8e4'); }
      txt(g, '„mai e 1 minut”', X(6), 900, 24, '#ff9fb0');
      PLAN.forEach(([a, z, col], k) => {
        const on = b.i === k; const y = Y(k);
        g.save(); g.fillStyle = col; g.globalAlpha = b.i < 0 || on ? 1 : 0.5; g.strokeStyle = OUT; g.lineWidth = 6; if (on) { g.shadowColor = col; g.shadowBlur = 20; }
        g.beginPath(); g.roundRect(X(a) + 3, y, X(z) - X(a) - 6, 60, 14); g.fill(); g.stroke(); g.restore();
      });
    },
  };
}

/* =========================================================== DD COMPARATIV: 2–4 panouri (poză reală sau desen) */
// sceneOpts.panels: [{img | draw, cap, cred}], bad: [null | indexul panoului] pe puncte, grid: 2|3|4
const DRAW = {
  tromb: (g, t) => FIELDS.tromb(g, t, { layers: 1 + (REDUCED ? 6 : Math.floor((t * 0.55) % 7)) }),
  pneumo: (g, t) => FIELDS.pneumo(g, t), lobar: (g, t) => DDF.lobar(g, t),
  balon: (g, t) => hepCells(g, t, 'balon'), stazaHep: (g, t) => hepCells(g, t, 'staza'),
  pancreas: (g, t) => drawPancreas(g, t),
  nutmeg: (g, t) => liverCut(g, t, 'nutmeg'), ciroza: (g, t) => liverCut(g, t, 'ciroza'),
};
function boxes(n) {
  if (n === 2) return [[20, 120, 470, 690], [510, 120, 470, 690]];
  if (n === 3) return [[14, 150, 316, 600], [342, 150, 316, 600], [670, 150, 316, 600]];
  return [[20, 100, 470, 340], [510, 100, 470, 340], [20, 545, 470, 340], [510, 545, 470, 340]];
}
function cmp({ spec }) {
  const o = spec.sceneOpts; const P = o.panels; const B = boxes(P.length);
  return {
    home: HOME,
    anchors: o.bad.map((k) => (k == null ? null : [B[k][0] + B[k][2] - 26, B[k][1] + 26])),
    labels: P.map((p, k) => lbl([B[k][0] + B[k][2] / 2, B[k][1] - 26], p.cap)),
    draw(g, t, b) {
      bgFill(g);
      P.forEach((p, k) => {
        const box = B[k]; const on = o.bad[b.i] === k || (o.both && o.both[b.i] && o.both[b.i].includes(k));
        if (p.img) { const im = img(p.img); if (ready(im)) photo(g, p.img, box, fitT(im.naturalWidth, im.naturalHeight, ...box, true), im.naturalWidth, im.naturalHeight, 16); }
        else { g.save(); g.beginPath(); g.roundRect(...box, 16); g.clip(); const s = Math.max(box[2] / W, box[3] / H); g.translate(box[0] + (box[2] - W * s) / 2, box[1] + (box[3] - H * s) / 2); g.scale(s, s); DRAW[p.draw](g, t); g.restore(); }
        frame(g, box, on, 16);
        if (p.cred) wrapText(g, p.cred, box[0] + 4, box[1] + box[3] + 20, box[2] - 8, 16, 14);
        if (p.note) tag(g, p.note, box[0] + 10, box[1] + box[3] - 36, '#ffe36e', 15);
      });
    },
  };
}
// desene simple (cartoon) pentru ce nu are poză: hepatocite balonizate / ficat de stază la microscop
function hepCells(g, t, kind) {
  g.fillStyle = kind === 'staza' ? '#f3c6d8' : '#f7dbe7'; g.fillRect(-50, -50, W + 100, H + 100);
  srand(kind === 'staza' ? 21 : 12);
  if (kind === 'staza') {
    // vena centrolobulară + sinusoide dilatate, pline cu hematii; hepatocite atrofiate
    const cx = 500, cy = 467;
    for (let a = 0; a < 12; a++) {
      const an = a / 12 * 6.283; g.save(); g.translate(cx, cy); g.rotate(an);
      g.fillStyle = '#c8264a'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(90, -26, 420, 52, 26); g.fill(); g.stroke();
      g.fillStyle = '#ff5d77'; for (let k = 0; k < 9; k++) { g.beginPath(); g.ellipse(120 + k * 44, rr(-10, 10), 14, 9, 0, 0, 7); g.fill(); }
      g.fillStyle = '#ea9fc0'; g.strokeStyle = OUT; g.lineWidth = 3; for (let k = 0; k < 5; k++) { const x = 140 + k * 80; g.beginPath(); g.roundRect(x, 34, 46, 30, 8); g.fill(); g.stroke(); g.fillStyle = '#2c2490'; g.beginPath(); g.arc(x + 23, 49, 6, 0, 7); g.fill(); g.fillStyle = '#ea9fc0'; }
      g.restore();
    }
    g.fillStyle = '#fff0f5'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.arc(cx, cy, 80, 0, 7); g.fill(); g.stroke();
    g.fillStyle = '#e23a4f'; for (let k = 0; k < 10; k++) { g.beginPath(); g.ellipse(cx + rr(-45, 45), cy + rr(-45, 45), 13, 8, rr(0, 3), 0, 7); g.fill(); }
    return;
  }
  // balonizare: celule mari, citoplasmă clară, floconoasă, nucleu CENTRAL
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    const x = 140 + c * 240 + (r % 2) * 30, y = 130 + r * 225;
    g.save(); g.fillStyle = '#fbf4f8'; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(x - 100, y - 92, 200, 184, 40); g.fill(); g.stroke();
    g.strokeStyle = '#e6a9c6'; g.lineWidth = 3; for (let k = 0; k < 14; k++) { const a = rr(0, 6.28), d = rr(20, 80); g.beginPath(); g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.8, rr(5, 12), 0, 4); g.stroke(); }
    g.fillStyle = '#2c2490'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.arc(x, y, 24, 0, 7); g.fill(); g.stroke(); g.restore();
  }
}
// suprafața de secțiune a ficatului: „în nucșoară” (stază) / noduli + septuri (ciroză)
function liverCut(g, t, kind) {
  bgFill(g, '#2a1534', '#140a1a');
  const p = new Path2D(); p.moveTo(90, 300); p.bezierCurveTo(200, 120, 700, 110, 930, 260); p.bezierCurveTo(960, 420, 760, 760, 420, 800); p.bezierCurveTo(220, 820, 60, 520, 90, 300); p.closePath();
  g.save(); g.fillStyle = kind === 'nutmeg' ? '#d9a93f' : '#c98a3a'; g.fill(p); g.clip(p); srand(kind === 'nutmeg' ? 5 : 9);
  if (kind === 'nutmeg') {
    for (let k = 0; k < 120; k++) { const x = rr(80, 940), y = rr(120, 820); g.fillStyle = '#8e1a2e'; g.beginPath(); g.arc(x, y, rr(10, 18), 0, 7); g.fill(); g.strokeStyle = '#a3263c'; g.lineWidth = 4; for (let j = 0; j < 3; j++) { const a = rr(0, 6.28); g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * 34, y + Math.sin(a) * 34); g.stroke(); } }
  } else {
    g.fillStyle = '#f1ece4'; g.fillRect(0, 0, W, H);
    for (let k = 0; k < 70; k++) { const x = rr(80, 940), y = rr(120, 820), r = rr(30, 52); g.fillStyle = k % 3 ? '#c98a3a' : '#a8702c'; g.strokeStyle = '#f7f3ec'; g.lineWidth = 8; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke(); }
  }
  g.restore(); g.save(); g.strokeStyle = OUT; g.lineWidth = 8; g.stroke(p); g.restore();
}

/* =========================================================== FALLBACK */
function fallback() { return { home: HOME, anchors: [], draw(g) { bgFill(g); } }; }

// mozaicul din atlas.js + o bandă jos cu creditul pozelor
function tiles(a) {
  const sc = mosaic(a); const d = sc.draw; sc.H += 46; sc.home = { x: sc.W / 2, y: sc.H / 2, z: 1 };
  sc.draw = (g, t, b) => { d(g, t, b); wrapText(g, 'Poze: Wikimedia Commons (autorii: pe slide-ul preparatului)', 18, sc.H - 20, sc.W - 36, 22, 18); };
  return sc;
}
export const SCENES = { prep, cover, fisa, plan, cmp, mosaic, tiles, fallback };
