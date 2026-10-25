// Scenele recapitulării Histo LP 2–5: harta lamelor, formatul OSPE, arborele, câte o scenă pe lamă (+ DD), mozaic, tabele.
import { OUT, clamp, lerp, ease, glowRing, roundRect } from './kit2d.js';
import { atlas, mosaic } from './atlas.js';
import { W, H, bgFill, field, fieldThumb } from './fields.js';

const cam = (x, y, z) => ({ x, y, z });
const HOME = cam(500, 467, 1);
const lbl = (at, html, o = {}) => ({ at, html, ...o });
const ring = (g, b, i, x, y, rx, ry = rx, rot = 0) => { if (b.i === i) glowRing(g, x, y, rx, ry, rot, ease(b.bt * 1.5)); };
export const NAMES = { pav: 'simplu pavimentos', cub: 'simplu cubic', pri: 'simplu prismatic', ps: 'pseudostratificat', es: 'stratificat pavimentos necheratinizat', uro: 'uroteliul', tub: 'glanda tubulară simplă', seb: 'glanda sebacee', sub: 'glanda tubulo-acinoasă', tir: 'tiroida', sr: 'suprarenala', pan: 'insula Langerhans' };
const SHORT = { pav: 'pavimentos', cub: 'cubic', pri: 'prismatic', ps: 'pseudostrat.', es: 'strat. pav. nech.', uro: 'uroteliu', tub: 'tubulară', seb: 'sebacee', sub: 'tubulo-acinoasă', tir: 'tiroida', sr: 'suprarenala', pan: 'Langerhans' };
const ORDER = ['pav', 'cub', 'pri', 'ps', 'es', 'uro', 'tub', 'seb', 'sub', 'tir', 'sr', 'pan'];

/* =========================================================== 1 · HARTA CELOR 12 LAME */
function cover() {
  const rows = [115, 340, 565, 790], cols = [300, 560, 820];
  const pos = ORDER.map((k, i) => [cols[i % 3], rows[Math.floor(i / 3)]]); const kk = ORDER.map(() => 0);
  return {
    home: HOME, cams: rows.map((y) => cam(540, clamp(y, 300, 634), 1.3)),
    anchors: rows.map((y) => [95, y]),
    labels: [...ORDER.map((k, i) => { const r = Math.floor(i / 3); return lbl([pos[i][0], pos[i][1] + 104], `${i + 1} · ${NAMES[k]}`, { beats: [-1, r - 1, r, r + 1] }); }), ...['LP 2', 'LP 3', 'LP 4', 'LP 5'].map((s, r) => lbl([95, rows[r] + 46], s))],
    draw(g, t, b) {
      bgFill(g, '#3a1d47', '#160b1d');
      g.save(); g.strokeStyle = 'rgba(255,255,255,.12)'; g.lineWidth = 3; rows.forEach((y) => { g.beginPath(); g.moveTo(150, y); g.lineTo(940, y); g.stroke(); }); g.restore();
      pos.forEach(([x, y], i) => {
        const row = Math.floor(i / 3); kk[i] = lerp(kk[i], b.i === row ? 1 : 0, 0.08);
        const bob = b.i === row ? Math.sin(t * 2 + i) * 3 : 0;
        fieldThumb(g, ORDER[i], x, y + bob, 90 + kk[i] * 6);
        if (kk[i] > 0.05) glowRing(g, x, y + bob, 104, 104, 0, kk[i]);
      });
      if (b.i < 0) { const i = Math.floor(t * 0.8) % 12; glowRing(g, pos[i][0], pos[i][1], 102, 102, 0, (t * 0.8) % 1); }
    },
  };
}

/* =========================================================== 2 · FORMATUL OSPE (cronometrul de 7 minute) */
function ospe() {
  const R = 250, C0 = [500, 330];
  const segs = [[0, 1, '#6d6178'], [1, 1.5, '#e07bb0'], [1.5, 3, '#c2558c'], [3, 3.75, '#9a2f66'], [3.75, 4, '#ff9fd0'], [4, 7, '#4a3d58']];
  const ang = (m) => -Math.PI / 2 + (m / 7) * Math.PI * 2;
  const clk = (m, out) => [C0[0] + Math.cos(ang(m)) * (R + out), C0[1] + Math.sin(ang(m)) * (R + out)];
  const pil = [[330, 150], [500, 210], [670, 270]]; const tA = [0.5, 1.25, 2.4, 3.4, 3.9];
  return {
    home: HOME, cams: [cam(500, 700, 1.25), cam(500, 690, 1.25), cam(500, 680, 1.25), cam(500, 420, 1.05)], anchors: [...pil.map(([x, h]) => [x, 900 - h - 30]), clk(3.85, 60)],
    labels: [lbl(clk(0, 50), '0:00 · 7 min'), lbl(clk(0.5, 70), '1 min: citești'), lbl(clk(2.4, 90), 'scriptul: 2–3 min'), lbl(clk(6, 80), '6:00 · „mai e 1 minut”'), lbl(clk(3.9, 100), 'concluzia', { beats: [3] })],
    phase: (i) => ['Recunoașterea', 'Descrierea', 'Diagnosticul diferențial', 'Concluzia'][i] || '',
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      g.save(); segs.forEach(([a, c, col], k) => { const on = (b.i === 0 && k === 1) || (b.i === 1 && k === 2) || (b.i === 2 && k === 3) || (b.i === 3 && k === 4); g.strokeStyle = OUT; g.lineWidth = 48; g.beginPath(); g.arc(C0[0], C0[1], R, ang(a), ang(c)); g.stroke(); g.strokeStyle = col; g.lineWidth = 38; if (on) { g.shadowColor = col; g.shadowBlur = 22; } g.beginPath(); g.arc(C0[0], C0[1], R, ang(a) + 0.01, ang(c) - 0.01); g.stroke(); g.shadowBlur = 0; }); g.restore();
      const tm = b.i < 0 ? (t * 0.9) % 7 : tA[b.i] + clamp(b.bt / b.bd) * ((tA[b.i + 1] ?? 4) - tA[b.i]);
      g.save(); g.strokeStyle = OUT; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(C0[0], C0[1]); g.lineTo(...clk(tm, -60)); g.stroke(); g.strokeStyle = '#fff'; g.lineWidth = 9; g.stroke(); g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.arc(C0[0], C0[1], 20, 0, 7); g.fill(); g.stroke(); g.restore();
      pil.forEach(([x, h], i) => { const on = b.i === i; const hh = h * (on ? 1.08 : 1); const p = new Path2D(); p.roundRect(x - 62, 900 - hh, 124, hh, 14); g.save(); g.fillStyle = ['#e07bb0', '#c2558c', '#9a2f66'][i]; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(p); g.fillStyle = '#fff'; g.font = '800 46px "Plus Jakarta Sans", Inter, sans-serif'; g.textAlign = 'center'; g.fillText(String(i + 1), x, 900 - hh / 2 + 16); g.restore(); });
    },
  };
}

/* =========================================================== 3 · ARBORELE EPITELIILOR */
function tree() {
  const N = { root: [500, 70, 'EPITELIUL'], cov: [265, 190, 'de acoperire'], gla: [745, 190, 'glandular'], s: [95, 330, 'simplu'], p: [265, 330, 'pseudostrat.'], st: [435, 330, 'stratificat'], ex: [640, 330, 'exocrin'], en: [880, 330, 'endocrin'] };
  const E = [['root', 'cov'], ['root', 'gla'], ['cov', 's'], ['cov', 'p'], ['cov', 'st'], ['gla', 'ex'], ['gla', 'en']];
  const L = { pav: ['s', 0], cub: ['s', 1], pri: ['s', 2], ps: ['p', 0], es: ['st', 0], uro: ['st', 1], tub: ['ex', 0], seb: ['ex', 1], sub: ['ex', 2], tir: ['en', 0], sr: ['en', 1], pan: ['en', 2] };
  const LP = (k) => [N[L[k][0]][0], 470 + L[k][1] * 150];
  const grp = [['cov', 's', 'p', 'st', 'pav', 'cub', 'pri', 'ps', 'es', 'uro'], ['ex', 'tub', 'seb', 'sub'], ['en', 'tir', 'sr', 'pan'], ['p', 'st', 'ps', 'uro']];
  const on = (b, id) => b.i >= 0 && grp[b.i].includes(id);
  return {
    home: HOME, cams: [cam(330, 520, 1.2), cam(660, 560, 1.3), cam(720, 560, 1.3), cam(420, 480, 1.15)],
    anchors: [[N.cov[0], N.cov[1] - 50], [N.ex[0], N.ex[1] - 50], [N.en[0], N.en[1] - 50], [N.p[0] + 75, N.p[1] + 60]],
    labels: ORDER.map((k, i) => lbl([LP(k)[0], LP(k)[1] + 66], `${i + 1} · ${SHORT[k]}`)),
    draw(g, t, b) {
      bgFill(g, '#2e1838', '#140a1a');
      g.save(); g.lineCap = 'round';
      for (const [a, c] of E) { const A = N[a], C = N[c]; const hi = on(b, c); g.strokeStyle = OUT; g.lineWidth = 12; g.beginPath(); g.moveTo(A[0], A[1] + 26); g.bezierCurveTo(A[0], (A[1] + C[1]) / 2 + 10, C[0], (A[1] + C[1]) / 2 - 10, C[0], C[1] - 26); g.stroke(); g.strokeStyle = hi ? '#ff9fd0' : '#7d5f8e'; g.lineWidth = 6; g.stroke(); }
      for (const k of ORDER) { const P = LP(k), A = N[L[k][0]]; g.strokeStyle = on(b, k) ? '#ff9fd0' : 'rgba(125,95,142,.7)'; g.lineWidth = 4; g.setLineDash([8, 8]); g.beginPath(); g.moveTo(A[0], A[1] + 26); g.lineTo(P[0], P[1] - 52); g.stroke(); g.setLineDash([]); }
      g.restore();
      for (const [id, [x, y, s]] of Object.entries(N)) {
        const hi = on(b, id) || id === 'root'; const w = Math.max(116, s.length * 12 + 34);
        g.save(); roundRect(g, x - w / 2, y - 26, w, 52, 26); g.fillStyle = hi ? '#c2558c' : '#4a3a5a'; g.fill(); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke();
        g.fillStyle = '#fff'; g.font = '800 20px "Plus Jakarta Sans", Inter, sans-serif'; g.textAlign = 'center'; g.fillText(s, x, y + 7); g.restore();
      }
      ORDER.forEach((k, i) => { const [x, y] = LP(k); const hi = on(b, k); const bob = hi ? Math.sin(t * 2.5 + i) * 3 : 0; fieldThumb(g, k, x, y + bob, 50); if (hi) glowRing(g, x, y + bob, 60, 60, 0, ease(b.bt * 1.5)); });
      if (b.i === 3) { g.save(); g.fillStyle = 'rgba(20,10,28,.85)'; g.strokeStyle = '#ff9fd0'; g.lineWidth = 4; roundRect(g, 120, 880, 760, 46, 14); g.fill(); g.stroke(); g.fillStyle = '#fff'; g.font = '700 22px Inter, sans-serif'; g.textAlign = 'center'; g.fillText('pseudostratificat = SIMPLU · uroteliu = stratificat special', 500, 910); g.restore(); }
    },
  };
}

/* =========================================================== DD: cele două lame, față în față */
function drawDD(g, t, b, k, p) {
  const a = ease(b.bt * 1.4);
  g.save(); g.globalAlpha = 0.9 * a; g.fillStyle = '#140a1a'; g.fillRect(-3000, -3000, 7000, 7000); g.restore();
  if (a < 0.02) return;
  g.save(); g.globalAlpha = a;
  const xl = lerp(120, 265, a), xr = lerp(880, 735, a);
  fieldThumb(g, k, xl, 460, 222); fieldThumb(g, p, xr, 460, 222);
  glowRing(g, xl, 460, 234, 234, 0, a); glowRing(g, xr, 460, 234, 234, 0, a, '#7fe8ff');
  g.fillStyle = '#fff'; g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.arc(500, 460, 44, 0, 7); g.fill(); g.stroke();
  g.fillStyle = OUT; g.font = '800 34px "Plus Jakarta Sans", Inter, sans-serif'; g.textAlign = 'center'; g.fillText('vs', 500, 472);
  // 1 asemănare + 3 diferențe: puncte care se aprind pe rând
  const n = Math.min(4, Math.floor(b.bt * 1.1)); for (let i = 0; i < 4; i++) { const x = 560 + i * 80; g.fillStyle = i < n ? (i === 0 ? '#9dff8a' : '#ffe36e') : '#3a2e45'; g.beginPath(); g.arc(x, 860, 22, 0, 7); g.fill(); g.lineWidth = 5; g.stroke(); g.fillStyle = OUT; g.font = '800 22px Inter, sans-serif'; g.fillText(i === 0 ? '=' : String(i), x, 868); }
  g.restore();
}

/* =========================================================== SCENA UNEI LAME */
// cams/anchors/labels pentru punctele de descriere; ultimul punct = DD (scena trece în „față în față”)
const CFG = {
  pav: (F) => ({
    cams: [cam(500, 467, 1.0), cam(F.A.cell[0], F.A.cell[1], 1.8), cam(F.A.edge[0], F.A.edge[1], 2.8)],
    anchors: [[150, 120], [F.A.cell[0], F.A.cell[1] - 60], [F.A.edge[0] + 30, F.A.edge[1] - 30]],
    labels: [lbl([500, 860], 'ionii de argint precipită doar între celule', { beats: [-1, 0] }), lbl([F.A.cell[0], F.A.cell[1] + 100], 'celulă poligonală · interior „gol”', { beats: [1] }), lbl([F.A.edge[0], F.A.edge[1] + 46], 'limită crenelată, negru-brună', { beats: [2] })],
    st: (b) => ({ prog: b.i <= 0 ? clamp(0.15 + b.bt / 3.5) : 1, ag: b.i <= 0, hiCell: b.i === 1 }),
    ring: (g, b) => { ring(g, b, 1, F.A.cell[0], F.A.cell[1], 92); ring(g, b, 2, F.A.edge[0], F.A.edge[1], 40, 26); },
  }),
  cub: (F) => ({
    cams: [cam(500, 467, 1.0), cam(F.M.cx, F.M.cy, 1.55), cam(F.A.cell[0], F.A.cell[1] + 20, 2.6)],
    anchors: [[700, 300], [F.M.cx - F.M.R - 10, F.M.cy], [F.A.cell[0] + 70, F.A.cell[1] - 20]],
    labels: [lbl([700, 380], 'capilar cu hematii (nu e epiteliu)', { beats: [-1, 0] }), lbl([F.M.cx, F.M.cy], 'lumen mic, gol', { beats: [1] }), lbl([F.M.cx, F.M.cy + F.M.R + 30], 'un singur rând de celule pe MB', { beats: [1] }), lbl([F.A.cell[0], F.A.cell[1] - 70], 'nucleu rotund, eucrom, central', { beats: [2] })],
    st: (b) => ({ measure: b.i === 2 ? clamp(b.bt / 1.5) : 0 }),
    ring: (g, b) => { ring(g, b, 1, F.M.cx, F.M.cy, F.M.R + 14); ring(g, b, 2, F.A.cell[0], F.A.cell[1], 28); },
  }),
  pri: (F) => ({
    cams: [cam(500, 500, 1.0), cam(500, 560, 1.35), cam(F.A.border[0] + 40, F.A.border[1] + 20, 2.5)],
    anchors: [[500, 230], [F.A.band[0] + 20, F.A.band[1] - 30], [F.A.border[0] - 20, F.A.border[1] - 30]],
    labels: [lbl([150, 700], 'lumen', { beats: [-1, 0, 1] }), lbl([500, 760], 'corion în axul pliului', { beats: [1] }), lbl([F.A.band[0] - 30, F.A.band[1] + 80], 'nuclei în bandă, bazali', { beats: [1] }), lbl([F.A.border[0] - 10, F.A.border[1] + 60], 'platou striat = microvilozități', { beats: [2] })],
    st: (b) => ({ absorb: b.i === 2 || b.i < 0 }),
    ring: (g, b) => { ring(g, b, 2, F.A.border[0], F.A.border[1], 30, 60, 0.15); },
  }),
  ps: (F) => ({
    cams: [cam(500, 480, 1.0), cam(500, 560, 1.5), cam(F.tG.x, 400, 2.1)],
    anchors: [[150, 200], [F.A.nucs[0], F.A.nucs[1] - 70], [F.A.cilia[0], F.A.cilia[1] - 40]],
    labels: [lbl([800, 200], 'pătura de mucus urcă spre faringe', { beats: [-1, 0] }), lbl([500, 760], 'toate celulele ating MB', { beats: [1] }), lbl([F.A.nucs[0] + 160, F.A.nucs[1]], 'nuclei pe 3 niveluri', { beats: [1] }), lbl([F.tG.x, 230], 'cili', { beats: [2] }), lbl([F.tG.x + 120, 420], 'caliciformă: cupă palidă', { beats: [2] })],
    st: (b) => ({ bases: b.i === 1 }),
    ring: (g, b) => { ring(g, b, 2, F.tG.x, F.ys(F.tG.x) + 72, 44, 84); },
  }),
  es: (F) => ({
    cams: [cam(500, 470, 1.0), cam(F.A.bas[0], F.A.bas[1] - 40, 2.2), cam(F.A.spi[0], F.A.spi[1], 2.2), cam(F.A.sup[0], F.A.sup[1] + 20, 2.3)],
    anchors: [[150, 120], [F.A.bas[0] + 50, F.A.bas[1] + 30], [F.A.spi[0] + 30, F.A.spi[1] - 30], [F.A.sup[0] + 60, F.A.sup[1] - 30]],
    labels: [lbl([800, 500], 'reînnoire: de jos în sus', { beats: [-1, 0] }), lbl([F.A.bas[0], F.A.bas[1] + 80], 'bazal: bazofil, nuclei hipercromi · MB sinuoasă', { beats: [1] }), lbl([F.A.spi[0], F.A.spi[1] + 60], 'spinocelular: poligonale, nucleu central', { beats: [2] }), lbl([F.A.sup[0], F.A.sup[1] + 46], 'superficial: turtite, nucleu picnotic păstrat', { beats: [3] })],
    st: (b, t) => ({ tracer: b.i <= 0 ? (t * 0.09) % 1 : null }),
    ring: (g, b) => { ring(g, b, 1, F.A.bas[0], F.A.bas[1], 34, 40); ring(g, b, 2, F.A.spi[0], F.A.spi[1], 54, 44); ring(g, b, 3, F.A.sup[0], F.A.sup[1], 96, 22); },
  }),
  uro: (F) => ({
    cams: [cam(500, 470, 1.0), cam(F.A.bas[0], F.A.bas[1] - 60, 2.0), cam(F.A.rk[0], F.A.rk[1] - 30, 1.9), cam(F.A.umb[0], F.A.umb[1], 2.1)],
    anchors: [[150, 80], [F.A.bas[0] + 40, F.A.bas[1] + 40], [F.A.rk[0] + 50, F.A.rk[1] - 10], [F.A.umb[0], F.A.umb[1] - 70]],
    labels: [lbl([160, 140], 'lumen (vezica goală: pliuri)', { beats: [-1, 0] }), lbl([F.A.bas[0], F.A.bas[1] + 90], 'bazal cubo-cilindric · MB invizibilă', { beats: [1] }), lbl([F.A.rk[0], F.A.rk[1] + 70], 'rachetă de tenis', { beats: [2] }), lbl([F.A.umb[0], F.A.umb[1] + 110], 'umbreliformă: 1–2 nuclei', { beats: [3] })],
    st: (b, t) => ({ stretch: b.i <= 0 ? 0.5 + 0.5 * Math.sin(t * 1.3) : 0 }),
    ring: (g, b) => { ring(g, b, 2, F.A.rk[0], F.A.rk[1] + 40, 42, 88); ring(g, b, 3, F.A.umb[0], F.A.umb[1] - 10, 112, 70); },
  }),
  tub: (F) => ({
    cams: [cam(500, 470, 1.0), cam(F.CX[1], 500, 1.3), cam(F.A.goblet[0], F.A.goblet[1], 2.6)],
    anchors: [[F.A.surface[0], F.A.surface[1]], [F.CX[1], F.yBot + 30], [F.A.goblet[0] - 30, F.A.goblet[1] - 50]],
    labels: [lbl([F.CX[1], 70], 'mucusul iese la suprafață', { beats: [-1, 0] }), lbl([F.CX[1] + 270, 820], 'fund', { beats: [1] }), lbl([F.CX[1] + 270, 230], 'gât', { beats: [1] }), lbl([F.A.corion[0] + 20, F.A.corion[1]], 'corion', { beats: [1] }), lbl([F.A.goblet[0] + 10, F.A.goblet[1] + 60], 'caliciformă: cupă de șampanie', { beats: [2] })],
    st: (b) => ({ mucus: b.i <= 0 || b.i === 2 }),
    ring: (g, b) => { ring(g, b, 1, F.CX[1], 520, F.hw + 30, 350); ring(g, b, 2, F.A.goblet[0], F.A.goblet[1], 30, 38); },
  }),
  seb: (F) => ({
    cams: [cam(500, 470, 1.0), cam(F.A.big[0], F.A.big[1], 1.9), cam(F.A.basal[0] + 30, F.A.basal[1], 2.4), cam(F.cDis.c[0] + 60, F.cDis.c[1] - 40, 1.9)],
    anchors: [[F.A.sac[0], F.A.sac[1]], [F.A.big[0] + 40, F.A.big[1] - 50], [F.A.basal[0], F.A.basal[1] - 50], [F.cDis.c[0], F.cDis.c[1] - 60]],
    labels: [lbl([F.A.hair[0], 900], 'firul de păr', { beats: [-1, 0] }), lbl([F.A.duct[0], F.A.duct[1] - 60], 'canal scurt', { beats: [-1, 0, 3] }), lbl([F.A.big[0], F.A.big[1] + 70], 'celulă mare, vacuolară', { beats: [1] }), lbl([F.A.basal[0] + 80, F.A.basal[1] + 50], 'rând bazal, bazofil', { beats: [2] }), lbl([F.cDis.c[0], F.cDis.c[1] + 60], 'nucleu picnotic → sebum', { beats: [3] })],
    st: (b) => ({ holo: b.i === 3 ? (b.bt * 0.16) % 1 : null }),
    ring: (g, b) => { ring(g, b, 1, F.A.big[0], F.A.big[1], 55); ring(g, b, 2, F.A.basal[0], F.A.basal[1], 30, 40); },
  }),
  sub: (F) => ({
    cams: [cam(500, 467, 1.0), cam(F.A.muc[0], F.A.muc[1], 2.1), cam(F.A.ser[0], F.A.ser[1], 2.1), cam(F.MIX[0], F.MIX[1], 1.9)],
    anchors: [[150, 120], [F.A.muc[0], F.A.muc[1] - 110], [F.A.ser[0], F.A.ser[1] - 75], [F.MIX[0] + 150, F.MIX[1] - 110]],
    labels: [lbl([F.A.muc[0], F.A.muc[1] + 112], 'acin mucos: palid', { beats: [1] }), lbl([F.A.ser[0], F.A.ser[1] + 78], 'acin seros: închis, lumen punctiform', { beats: [2] }), lbl([F.MIX[0], F.MIX[1] + 140], 'acin mixt', { beats: [3] }), lbl([F.MIX[0] - 40, F.MIX[1] - 175], 'semiluna Gianuzzi (seroase)', { beats: [3] })],
    st: (b) => ({ gran: b.i === 2, squeeze: b.i === 3 }),
    ring: (g, b) => { ring(g, b, 2, F.A.ser[0], F.A.ser[1], 64); ring(g, b, 3, F.MIX[0], F.MIX[1] - 20, 160, 160); },
  }),
  tir: (F) => ({
    cams: [cam(500, 467, 1.0), cam(500, 467, 1.1), cam(F.A.epi[0], F.A.epi[1] + 10, 2.4), cam(F.A.cC[0] + 40, F.A.cC[1] - 10, 2.0)],
    anchors: [[F.A.colloid[0], F.A.colloid[1]], [F.A.small[0], F.A.small[1]], [F.A.epi[0] + 40, F.A.epi[1] - 40], [F.A.cC[0] + 10, F.A.cC[1] - 46]],
    labels: [lbl([F.A.colloid[0], F.A.colloid[1] + 40], 'coloid roz, omogen', { beats: [-1, 0] }), lbl([F.act.cx, F.act.cy + F.act.ry + 30], 'folicul mic: epiteliu înalt', { beats: [1] }), lbl([F.A.flat[0], F.A.flat[1] + 34], 'folicul mare: celule turtite', { beats: [1] }), lbl([F.A.epi[0], F.A.epi[1] + 54], 'un singur rând (cubic)', { beats: [2] }), lbl([F.A.cC[0] + 20, F.A.cC[1] + 44], 'celulă C (sigur doar prin IHC)', { beats: [3] }), lbl([760, 760], 'capilar', { beats: [3] })],
    st: (b) => ({ hormone: b.i === 1 || b.i < 0 }),
    ring: (g, b) => { ring(g, b, 0, F.A.colloid[0], F.A.colloid[1], 160, 140); ring(g, b, 1, F.act.cx, F.act.cy, F.act.rx + 40, F.act.ry + 40); ring(g, b, 2, F.A.epi[0], F.A.epi[1], 46, 30); ring(g, b, 3, F.A.cC[0], F.A.cC[1], 34); },
  }),
  sr: (F) => ({
    cams: [cam(500, 467, 1.0), cam(500, 400, 1.7), cam(500, 690, 1.8), cam(500, 860, 1.8)],
    anchors: [[F.A.glom[0], F.A.glom[1] - 30], [F.A.fasc[0], F.A.fasc[1] - 40], [F.A.ret[0], F.A.ret[1] - 40], [F.A.med[0], F.A.med[1] - 50]],
    labels: [lbl([760, 30], 'capsula', { beats: [-1, 0] }), lbl([200, 150], 'glomerulară: cuiburi arcuite', { beats: [-1, 0] }), lbl([300, 410], 'fasciculată: coloane, celule palide', { beats: [1] }), lbl([300, 690], 'reticulată: cordoane eozinofile', { beats: [2] }), lbl([300, 880], 'medulara: celule cromafine', { beats: [3] })],
    st: () => ({}),
    ring: (g, b) => { ring(g, b, 0, 500, 140, 520, 80); ring(g, b, 1, 500, 410, 300, 180); ring(g, b, 2, 500, 690, 300, 80); ring(g, b, 3, 500, 860, 300, 70); },
  }),
  pan: (F) => ({
    cams: [cam(500, 467, 1.0), cam(F.I[0], F.I[1], 1.55), cam(F.aHi[0] + 40, F.aHi[1], 2.3), cam(870, 220, 1.8)],
    anchors: [[F.A.islet[0] - 120, F.A.islet[1] + 20], [F.A.islet[0], F.A.islet[1]], [F.A.acin[0], F.A.acin[1]], [F.A.sept[0] - 55, F.A.sept[1] - 30]],
    labels: [lbl([F.I[0], F.I[1] + F.I[3] + 30], 'insulă palidă, fără lumen', { beats: [-1, 0, 1] }), lbl([F.I[0], F.I[1] - 20], 'capilare', { beats: [1] }), lbl([F.aHi[0] + 60, F.aHi[1] + 76], 'acin seros → canal', { beats: [2] }), lbl([900, 300], 'sept: fâșie albă', { beats: [3] })],
    st: (b) => ({ flow: b.i <= 0 || b.i === 1 || b.i === 2 }),
    ring: (g, b) => { ring(g, b, 1, F.I[0], F.I[1], F.I[2] + 16, F.I[3] + 16); ring(g, b, 2, F.aHi[0], F.aHi[1], 62); },
  }),
};

function lama({ spec }) {
  const { k, dd } = spec.sceneOpts; const F = field(k); const C = CFG[k](F);
  const n = spec.points.length; const ddI = n - 1; let cur = -1; const OFF = [-9999, -9999];
  return {
    home: HOME, cams: [...C.cams.slice(0, ddI), HOME],
    // pe beat-ul DD ascundem badge-urile descrierii; badge-ul DD apare doar pe beat-ul lui
    anchors: [...C.anchors.slice(0, ddI).map((a) => () => (cur === ddI ? OFF : a)), () => (cur === ddI ? [500, 300] : OFF)],
    labels: [...C.labels, lbl([265, 222], 'lama ta: ' + NAMES[k], { beats: [ddI] }), lbl([735, 222], 'DD: ' + NAMES[dd], { beats: [ddI] })],
    phase: (i) => (i === ddI ? '1 asemănare + 3 diferențe' : ''),
    draw(g, t, b) {
      cur = b.i;
      F.draw(g, t, C.st(b, t));
      C.ring(g, b);
      if (b.i === ddI) drawDD(g, t, b, k, dd);
    },
  };
}

/* =========================================================== RECAPITULARE (tabel) */
function recap({ spec }) {
  const keys = spec.sceneOpts.keys; const pos = keys.map((_, i) => [300 + (i % 2) * 400, 160 + Math.floor(i / 2) * 300]); const kk = keys.map(() => 0);
  return {
    home: HOME, cams: pos.map(([x, y]) => cam(lerp(500, x, 0.4), lerp(467, y, 0.4), 1.12)), anchors: [],
    labels: keys.map((k, i) => lbl([pos[i][0], pos[i][1] + 148], `${spec.sceneOpts.first + i} · ${NAMES[k]}`)),
    draw(g, t, b) {
      bgFill(g, '#3a1d47', '#160b1d');
      pos.forEach(([x, y], i) => { kk[i] = lerp(kk[i], b.i === i ? 1 : 0, 0.08); const bob = b.i === i ? Math.sin(t * 2) * 3 : 0; fieldThumb(g, keys[i], x, y + bob, 125 + kk[i] * 8); if (kk[i] > 0.05) glowRing(g, x, y + bob, 140, 140, 0, kk[i]); });
      if (b.i < 0) { const i = Math.floor(t * 0.7) % keys.length; glowRing(g, pos[i][0], pos[i][1], 138, 138, 0, (t * 0.7) % 1); }
    },
  };
}

function fallback() { return { home: HOME, anchors: [], draw(g) { bgFill(g, '#2e1838', '#140a1a'); } }; }
void W; void H;
export const SCENES = { atlas, mosaic, cover, ospe, tree, lama, recap, fallback };
