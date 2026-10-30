// Partea A (+ copertă, cronologie): tubul cardiac → cordul sigmoid → cordul cu 4 camere.
// CONVENȚIE pe tot deck-ul: vedere frontală = dreapta embrionului e STÂNGA ecranului; cranial = sus.
import {
  W, H, cam, HOME, C, B, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead,
  OUT, clamp, lerp, ease, paint, blob, bb, REDUCED, photo,
} from './ek.js';

/* =================================================== COPERTA: 4 părți → tot LP-ul
   Ce trebuie să se vadă: 4 rânduri (A inimă, B artere, C vene + circulația fetală, D malformații).
   Iconițe: A = tub cu 5 segmente care bate; B = sânge din sacul aortic → arcuri → aortele dorsale (în sus, apoi în jos);
   C = venele se varsă ÎN sinusul venos (particulele merg spre inimă); D = mini-inimă cu DSV: roșu VS → VD (dreapta ecranului → stânga). */
const SEGC = ['#5b7fd0', '#8a5ad0', '#d2524a', '#ef8a3a', '#e8b93a']; // sinus venos, atriu, ventricul, bulb, trunchi (culori de identitate)
export function srcIcon(g, k, x, y, t, a = 1) {
  g.save(); g.globalAlpha = a;
  ell(g, x, y, 66, 66, '#2a1c18', { ow: 5, sc: 'rgba(255,230,210,.5)' });
  if (k === 0) { // tubul cardiac (caudal jos → cranial sus) care bate
    const s = 1 + (REDUCED ? 0 : 0.06 * Math.max(0, Math.sin(t * 7)));
    for (let j = 0; j < 5; j++) tube(g, [[x, y + 44 - j * 20], [x, y + 26 - j * 20]], 22 * s, SEGC[j], { ow: 4, cap: 'butt' });
    flow(g, [[x, y + 50], [x, y - 52]], t, B.mx, 3, 0.5, 4);
  } else if (k === 1) { // sac aortic jos-centru → 3 arcuri → 2 aorte dorsale → în jos
    const L = [[x - 34, y - 46], [x - 34, y + 50]], R = [[x + 34, y - 46], [x + 34, y + 50]];
    tube(g, L, 8, '#e0443e', { ow: 3 }); tube(g, R, 8, '#e0443e', { ow: 3 });
    for (let j = 0; j < 3; j++) tube(g, [[x - 34, y - 30 + j * 22], [x + 34, y - 30 + j * 22]], 6, ['#3db06c', '#e0443e', '#4a78d6'][j], { ow: 3 });
    tube(g, [[x, y + 46], [x, y - 30]], 8, '#e8b93a', { ow: 3 });
    flow(g, [[x, y + 46], [x, y - 30], [x - 34, y - 30], [x - 34, y + 50]], t, '#fff3e6', 3, 0.4, 4);
    flow(g, [[x, y + 46], [x, y - 30], [x + 34, y - 30], [x + 34, y + 50]], t, '#fff3e6', 3, 0.4, 4);
  } else if (k === 2) { // 3 vene care se varsă în sinusul venos (spre inimă)
    ell(g, x, y - 30, 44, 18, '#d9c8f2', { ow: 4 });
    const V = [[[x - 50, y + 50], [x - 30, y - 24]], [[x, y + 54], [x, y - 20]], [[x + 50, y + 50], [x + 30, y - 24]]];
    V.forEach((p, j) => { tube(g, p, 8, j === 1 ? B.ox : B.dx, { ow: 3 }); flow(g, p, t, j === 1 ? B.oxL : B.dxL, 2, 0.45, 4); });
  } else { // mini-inimă cu DSV: VS (dreapta ecranului) → VD (stânga ecranului)
    const p = new Path2D(); p.roundRect(x - 48, y - 44, 96, 88, 18); paint(g, p, B.wall, null, null, [x - 48, y - 44, 96, 88], OUT, 4);
    g.fillStyle = B.adF; g.fillRect(x - 40, y - 36, 34, 72); g.fillStyle = B.asF; g.fillRect(x + 6, y - 36, 34, 72);
    g.fillStyle = '#efe4f7'; g.fillRect(x - 6, y + 2, 12, 16);
    flow(g, [[x + 28, y + 10], [x - 28, y + 10]], t, B.ox, 3, 0.6, 5);
  }
  g.restore();
}
export const SRC = [
  { src: 'A · Inima\n(mezoderm splanhnic)', mid: 'aria cardiogenă → tub\n→ cord sigmoid', res: 'cordul cu 4 camere\n(prin septare)', col: '#ffd6c4' },
  { src: 'B · Arterele\n(4 surse)', mid: 'arcuri I–VI, aorta dorsală,\nviteline, ombilicale', res: 'remodelare: unele\nrămân, altele dispar', col: '#ffe9a8' },
  { src: 'C · Venele +\ncirculația fetală', mid: '3 seturi de vene →\ndrenajul spre dreapta', res: '3 șunturi fetale →\nse închid la naștere', col: '#d6e4ff' },
  { src: 'D · Malformații\n+ cazul', mid: 'sept neînchis /\nșunt rămas deschis', res: 'DSV · DSA · Fallot ·\ncanal arterial · Eisenmenger', col: '#ffd0e6' },
];
export function cover({ spec }) {
  const map = (spec.sceneOpts && spec.sceneOpts.map) || null; // recapitulare: rândul tabelului → partea
  const Y = [150, 370, 590, 810];
  const hiOf = (b) => (b.i < 0 ? -1 : map ? map[b.i] : b.i);
  const k = [0, 0, 0, 0];
  return {
    home: HOME,
    cams: map ? map.map(() => HOME) : Y.map(() => HOME),
    anchors: map ? [] : Y.map((y) => [44, y - 58]),
    draw(g, t, b) {
      bg(g);
      const hi = hiOf(b); const cyc = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 2.4) % 4 : -1;
      SRC.forEach((r, i) => {
        const y = Y[i]; const act = i === hi || i === cyc; k[i] = lerp(k[i], act ? 1 : 0, 0.08);
        const dim = hi >= 0 && !act ? 0.45 : 1;
        panel(g, 14, y - 100, 972, 200, { fill: act ? 'rgba(217,101,42,.16)' : 'rgba(255,240,228,.05)', stroke: act ? 'rgba(255,180,138,.6)' : 'rgba(255,230,210,.14)' });
        srcIcon(g, i, 110, y - 18, t, dim);
        txt(g, r.src, 110, y + 70, 17, C.cream, { alpha: dim, w: 700 });
        pill(g, 420, y, 270, 92, r.col, r.mid, { size: 19, alpha: dim, glow: k[i] });
        pill(g, 790, y, 300, 92, r.col, r.res, { size: 19, alpha: dim, glow: k[i] });
        arr(g, 184, y - 18, 276, y, '#fff3e6', 6, dim);
        arr(g, 560, y, 630, y, '#fff3e6', 6, dim);
        if (act) { flow(g, [[184, y - 18], [282, y]], t, C.hi, 3, 0.6, 6); flow(g, [[558, y], [636, y]], t, C.hi, 3, 0.6, 6); }
      });
    },
  };
}

/* =================================================== CRONOLOGIA + TABELUL CARNEGIE
   Ce trebuie să se vadă: sus axa S3 → S8 → naștere, un marcaj care avansează spre dreapta (timpul curge stânga → dreapta);
   jos tabelul din LP: stadiile 13–23 pe orizontală, barele cresc de la stânga la dreapta pe măsură ce linia „acum” trece peste ele.
   Barele (start, sfârșit, partea deschisă = „începe să apară”) copiate din tabelul LP. Ordinea: st. 13 atriile → st. 22–23 corzile. */
const ROWS = [
  ['Septum primum', 13, 13, 0, '#8a5ad0'], ['Foramen primum (ostium primum)', 13, 13, 0, '#8a5ad0'],
  ['Fasciculul atrioventricular', 14, 16, 0, '#a59a94'], ['Pernițele atrioventriculare', 14, 15, 0, '#3db06c'],
  ['Crestele conotruncale', 15, 16, 0, '#ef8a3a'], ['Foramen secundum', 15, 17, 1, '#8a5ad0'], ['Valvulele semilunare', 15, 17, 1, '#ef8a3a'],
  ['Septul conotruncal; atriile', 16, 16, 0, '#ef8a3a'], ['Se închide foramen primum', 16, 18, 1, '#8a5ad0'],
  ['Fuziunea pernițelor AV', 19, 19, 0, '#3db06c'], ['Septum secundum + foramen ovale', 18, 21, 0, '#8a5ad0'],
  ['Se închide foramenul interventricular', 18, 20, 1, '#d2524a'], ['Corzile tendinoase', 22, 23, 0, '#a59a94'],
];
export function timeline() {
  const AX = { S3: 110, S4: 235, S5: 360, S6: 485, S7: 610, S8: 735, N: 880 }; const AY = 210;
  const SX = (s) => 400 + (s - 13) * 54; // coloana stadiului s (lățime 54)
  const RY = (r) => 420 + r * 37;
  // evenimentele de pe axă: [x, y eticheta, text, punctul la care apar]
  const EV = [
    [AX.S3, 112, 'aria cardiogenă\n2 tuburi endocardiace', 0], [172, 278, 'tub unic · bate\nîn zilele 21–23', 0],
    [AX.S4, 162, 'cordul sigmoid\n(bucla cardiacă)', 1], [297, 326, 'cord tetracameral\n(S4–5)', 1],
    [AX.S5, 112, 'venele: 3 seturi\nseptum primum', 2], [422, 278, 'crestele conotruncale\n→ septul spiral (S5–6)', 2],
    [AX.S7, 112, 'septum secundum\n+ foramen ovale', 3], [672, 278, 'se închide foramenul\ninterventricular', 3], [800, 326, 'corzile\ntendinoase', 3],
    [AX.N, 162, 'șunturile\nse închid', 4],
  ];
  const STOP = [AX.S3, AX.S4, AX.S5, AX.S7, AX.N]; const FROM = [AX.S3 - 20, AX.S3, AX.S4, AX.S6, AX.S8];
  const NOW = [12.4, 12.6, 18, 24, 24]; // linia „acum” pe tabel (în stadii) la sfârșitul fiecărui punct
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[AX.S3 - 40, AY - 30], [AX.S4 - 40, AY + 34], [370, RY(2)], [370, RY(10)], [AX.N - 40, AY - 30]],
    phase: (i) => ['S3', 'S4', 'S5–S6 · st. 13–17', 'S7–S8 · st. 18–23', 'nașterea'][i] || 'S3 → naștere',
    draw(g, t, b) {
      bg(g);
      // ----- axa săptămânilor
      let mx; const u = b.i < 0 ? loopT(t, 12) : ease(clamp(b.bt / (b.bd * 0.7)));
      if (b.i < 0) mx = lerp(AX.S3 - 20, AX.N, u); else mx = lerp(FROM[b.i], STOP[b.i], u);
      tube(g, [[70, AY], [950, AY]], 8, '#6b5650', { ow: 4 });
      tube(g, [[70, AY], [mx, AY]], 8, '#d9652a', { ow: 0 });
      Object.entries(AX).forEach(([k, x]) => { dot(g, x, AY, 11, x <= mx + 2 ? '#ffb48a' : '#3a2a26', { ow: 3 }); txt(g, k === 'N' ? 'naștere' : k, x, AY + 34, 20, '#ffe7d6', { w: 800 }); });
      EV.forEach(([x, y, s, k]) => {
        const vis = b.i < 0 ? (x <= mx + 30 ? 1 : 0.25) : k < b.i ? 0.6 : k > b.i ? 0.15 : (x <= mx + 40 ? 1 : 0.2);
        g.save(); g.globalAlpha = vis * 0.7; g.strokeStyle = '#fff3e6'; g.setLineDash([5, 5]); g.lineWidth = 2; g.beginPath(); g.moveTo(x, y < AY ? y + 24 : y - 24); g.lineTo(x, AY); g.stroke(); g.restore();
        txt(g, s, x, y, 17, k === b.i ? C.hi : C.cream, { alpha: vis, w: 700 });
      });
      dot(g, mx, AY, 16, C.hi, { ow: 4 });
      // ----- tabelul Carnegie
      panel(g, 14, 372, 972, 548);
      const wk = [['S5', 13, 15], ['S6', 16, 17], ['S7', 18, 19], ['S8', 20, 23]];
      wk.forEach(([s, a, c]) => { pill(g, (SX(a) + SX(c)) / 2 + 27, 392, (c - a + 1) * 54 - 8, 26, '#5a3a2c', '', { ow: 2 }); txt(g, s, (SX(a) + SX(c)) / 2 + 27, 392, 16, '#ffd2b8', { stroke: false }); });
      for (let s = 13; s <= 23; s++) { if (s % 2) { g.save(); g.fillStyle = 'rgba(255,240,228,.05)'; g.fillRect(SX(s), 410, 54, 494); g.restore(); } txt(g, String(s), SX(s) + 27, 905 - 0, 15, '#d8c4b8', { w: 700 }); }
      const now = b.i < 0 ? lerp(12.4, 24, loopT(t, 12)) : b.i < 2 ? 12.4 : lerp(b.i === 2 ? 12.4 : 18, NOW[b.i], ease(clamp(b.bt / (b.bd * 0.7))));
      ROWS.forEach(([n, a, c, light, col], r) => {
        const y = RY(r); const act = (b.i === 2 && a <= 17) || (b.i === 3 && a >= 18);
        txt(g, n, 30, y, 16, act ? '#fff3e6' : '#cdb9ad', { align: 'left', w: act ? 800 : 600 });
        const x0 = SX(a) + 3, x1 = SX(c) + 51; const xe = Math.min(x1, SX(now) + 0);
        if (xe <= x0) return;
        g.save(); g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 2.5; g.beginPath(); g.roundRect(x0, y - 12, xe - x0, 24, 8); g.fill(); g.stroke();
        if (light) { g.globalAlpha = 0.55; g.fillStyle = '#fff3e6'; g.beginPath(); g.roundRect(x0, y - 12, Math.min(48, xe - x0), 24, 8); g.fill(); }
        g.restore();
      });
      if (now > 12.5 && now < 23.95) { const xn = SX(now); g.save(); g.strokeStyle = C.hi; g.lineWidth = 4; g.shadowColor = C.hi; g.shadowBlur = 10; g.beginPath(); g.moveTo(xn, 408); g.lineTo(xn, 890); g.stroke(); g.restore(); }
      txt(g, 'stadiul Carnegie →', 200, 905, 15, '#d8c4b8', { w: 700 });
    },
  };
}

/* =================================================== S3: ARIA CARDIOGENĂ → 2 TUBURI → TUB UNIC → MEZOCARD
   Stânga (discul de sus, CRANIAL sus): celulele de mezoderm urcă din linia primitivă și se strâng în potcoava cardiogenă,
   care stă CRANIAL (deasupra) de lama precordală; septul transvers e și mai cranial.
   Dreapta (secțiune transversală, DORSAL sus): intestinul dorsal; 2 tuburi endocardiace laterale se apropie de linia mediană
   prin plierea laterală, apoi fuzionează într-un tub care bate; tubul atârnă de peretele dorsal prin mezocardul dorsal,
   care apoi se rupe → sinusul pericardic transvers. */
export function tubeForm() {
  const DX = 240, DY = 470; // centrul discului
  const SX = 735;           // centrul secțiunii
  const cells = []; for (let k = 0; k < 22; k++) cells.push([k % 2 ? 1 : -1, 0]);
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[DX - 145, 255], [SX - 200, 520], [SX + 120, 640], [SX + 120, 360]],
    phase: (i) => ['aria cardiogenă (S3)', 'cordul primordial: 2 tuburi', 'tub unic · bate (21–23 zile)', 'mezocardul dorsal'][i] || 'S3 → S4',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      panel(g, 14, 40, 470, 850); panel(g, 500, 40, 486, 850);
      txt(g, '1 · discul văzut de sus', DX, 76, 19, '#ffd2b8'); txt(g, '2–4 · secțiune transversală', SX, 76, 19, '#ffd2b8');
      // ----- disc
      ell(g, DX, DY, 190, 340, '#cfe0f6', { ow: 5 });
      txt(g, 'CRANIAL ↑', DX - 160, 118, 17, C.cream, { align: 'left' });
      tube(g, [[DX - 70, 150], [DX + 70, 150]], 18, '#3db06c', { ow: 5 }); txt(g, 'septul transvers', DX + 80, 182, 17, '#bff0d2', { align: 'left' });
      dot(g, DX, 300, 16, '#f4c34f', { ow: 4 }); txt(g, 'lama precordală', DX + 24, 300, 17, '#ffe9a8', { align: 'left' });
      tube(g, [[DX, 600], [DX, 780]], 12, '#9a8a8a', { ow: 4 }); txt(g, 'linia primitivă', DX + 20, 740, 17, C.cream, { align: 'left' });
      // celulele de mezoderm urcă din linia primitivă (jos) și se strâng în potcoava cardiogenă, CRANIAL de lama precordală
      const p0 = p(0);
      cells.forEach(([s, a], k) => {
        const th = Math.PI * (1.15 + 0.7 * (k / (cells.length - 1)));
        const tx = DX + 120 * Math.cos(th), ty = 300 + 120 * Math.sin(th);
        const d = clamp(p0 * 1.6 - k * 0.025);
        const x = lerp(DX + s * 14, tx, d), y = lerp(640, ty, d);
        if (p0 > 0 && p0 < 0.98) dot(g, x, y, 9, '#e0603f', { ow: 2.5, alpha: 0.4 + 0.6 * d });
      });
      if (p0 > 0.6) { const a = (p0 - 0.6) / 0.4; g.save(); g.globalAlpha = a; g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 34; g.beginPath(); g.arc(DX, 300, 120, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); g.strokeStyle = '#d2524a'; g.lineWidth = 26; g.stroke(); g.restore(); txt(g, 'aria cardiogenă', DX, 230, 18, '#fff', { alpha: a }); }
      // ----- secțiunea
      const oy = 120;
      const wall = new Path2D(); wall.roundRect(SX - 210, oy + 50, 420, 620, 90);
      g.save(); g.fillStyle = 'rgba(255,235,220,.06)'; g.fill(wall); g.strokeStyle = 'rgba(255,230,210,.35)'; g.lineWidth = 4; g.stroke(wall); g.restore();
      txt(g, 'DORSAL ↑', SX - 190, oy + 26, 17, C.cream, { align: 'left' }); txt(g, 'VENTRAL ↓', SX - 190, oy + 700, 17, C.cream, { align: 'left' });
      ell(g, SX, oy + 190, 62, 56, '#f4c34f', { ow: 5 }); txt(g, 'intestin', SX, oy + 190, 17, OUT, { stroke: false });
      const p1 = p(1), p2 = p(2), p3 = p(3);
      const beat = REDUCED ? 1 : 1 + 0.07 * Math.max(0, Math.sin(t * 2 * Math.PI * 1.6)) ** 3;
      const HY = oy + 420;
      if (p2 < 1) {
        // 2 tuburi: pornesc lateral, plierea laterală le aduce spre linia mediană
        const off = lerp(170, 60, p1) * (1 - p2) + 0 * p2; const r = 58;
        [-1, 1].forEach((s) => { ell(g, SX + s * off, HY, r, r, '#d2524a', { ow: 5, alpha: 1 - p2 * 0.6 }); ell(g, SX + s * off, HY, r * 0.55, r * 0.55, '#ffd6c4', { ow: 3, alpha: 1 - p2 * 0.6 }); });
        if (p1 > 0 && p1 < 1) [-1, 1].forEach((s) => arr(g, SX + s * 200, HY + 110, SX + s * 110, HY + 110, '#ffb48a', 5, 0.8));
        txt(g, '2 tuburi endocardiace', SX, HY + 160, 18, C.cream, { alpha: 1 - p2 });
      }
      if (p2 > 0) {
        // mezocardul dorsal: tubul atârnă de peretele dorsal; în punctul 4 se rupe în mijloc
        const brk = p3; const mTop = oy + 250, mBot = HY - 74 * beat;
        g.save(); g.globalAlpha = p2;
        const gap = 60 * brk; const mid = (mTop + mBot) / 2;
        tube(g, [[SX, mTop], [SX, mid - gap / 2]], 22, '#e8c9b8', { ow: 5, cap: 'butt' });
        tube(g, [[SX, mid + gap / 2], [SX, mBot]], 22, '#e8c9b8', { ow: 5, cap: 'butt' });
        g.restore();
        ell(g, SX, HY, 78 * beat, 74 * beat, '#d2524a', { ow: 6, alpha: p2 });
        ell(g, SX, HY, 40 * beat, 38 * beat, '#ffd6c4', { ow: 4, alpha: p2 });
        if (p2 > 0.4) txt(g, 'tub cardiac unic · bate\nzilele 21–23', SX, HY + 150, 19, C.hi, { alpha: (p2 - 0.4) / 0.6 });
        if (p3 > 0) { txt(g, 'mezocard dorsal', SX + 30, oy + 300, 18, '#ffe7d6', { align: 'left', alpha: p3 }); }
        if (brk > 0.6) txt(g, 'rupt → sinusul pericardic\ntransvers (în plus față de LP)', SX, oy + 650, 17, '#ffd2b8', { alpha: (brk - 0.6) / 0.4 });
      }
      if (on(b, 0)) ring(g, DX, 250, 160, 110, ease(b.bt * 1.3));
    },
  };
}

/* =================================================== CORDUL TUBULAR SIMPLU: 5 SEGMENTE
   Tubul vertical: CAUDAL jos (aici intră venele, în sinusul venos) → CRANIAL sus (trunchiul dă arcurile).
   Particulele (sânge amestecat, violet) urcă de jos în sus, adică exact sensul din LP. Fiecare punct coboară o săgeată
   de la segment spre cartonașul cu ce devine. */
export function segments() {
  const NAMES = ['sinus venos', 'atriu primitiv', 'ventricul primitiv', 'bulb cardiac', 'trunchi arterial'];
  const FATE = ['corn drept → partea netedă a AD (sinus venarum)\ncorn stâng → sinusul coronar', 'partea trabeculată a ambelor atrii\n(urechiușele)', 'partea trabeculată a VS', 'partea trabeculată a VD\n+ conul arterial (căile de ejecție)', 'aorta ascendentă + trunchiul pulmonar\n(prin septul spiral)'];
  const TX = 210; const Y = (k) => 800 - k * 150; // centrul segmentului k
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [0, 1, 2, 3, 4].map((k) => [TX - 110, Y(k)]),
    phase: (i) => NAMES[i] || 'intrare jos → ieșire sus',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5, 0.5);
      txt(g, 'CAUDAL ↓ (intrare)', TX, 912, 18, C.cream);
      // venele care intră (2 coarne) și arcurile care ies
      [-1, 1].forEach((s) => tube(g, [[TX + s * 120, 900], [TX + s * 40, 850], [TX + s * 16, 800]], 26, '#5b7fd0', { ow: 5 }));
      [-1, 0, 1].forEach((s) => tube(g, [[TX, 120], [TX + s * 60, 90], [TX + s * 120, 70]], 12, '#e8b93a', { ow: 4 }));
      txt(g, 'venele', TX + 150, 880, 17, '#c9d8ff', { align: 'left' }); txt(g, 'arcurile aortice', TX + 132, 80, 17, '#ffe9a8', { align: 'left' });
      for (let k = 0; k < 5; k++) {
        const act = b.i === k; const w = [70, 86, 104, 92, 62][k];
        tube(g, [[TX, Y(k) + 72], [TX, Y(k) - 72]], w, SEGC[k], { ow: 6, cap: 'butt', glow: act ? 0.8 : 0 });
        txt(g, NAMES[k].replace(' ', '\n'), TX, Y(k), 17, '#fff', { w: 800 });
      }
      flow(g, [[TX, 900], [TX, 70]], t, B.mx, 9, 0.12, 9);
      arr(g, 70, 820, 70, 140, '#ffb48a', 6, 0.8); txt(g, 'sensul\nsângelui', 70, 880, 16, '#ffb48a');
      for (let k = 0; k < 5; k++) {
        const a = p(k); if (a <= 0) continue;
        const y = Y(k); const act = b.i === k;
        arr(g, TX + 70, y, lerp(TX + 70, 380, a), y, '#fff3e6', 5, a);
        pill(g, 670, y, 560, 112, act ? '#ffe9a8' : '#f3e2d6', '', { alpha: a, glow: act ? 1 : 0, r: 18 });
        txt(g, FATE[k], 670, y, 19, OUT, { stroke: false, alpha: a, w: 700 });
      }
    },
  };
}

/* =================================================== S4: CORDUL SIGMOID (bucla cardiacă)
   Același tub, aceleași 5 culori, deformat 23 → 24 → 35 de zile (ca figura din LP). Sângele (violet) curge mereu
   sinus → atriu → ventricul → bulb → trunchi. La final: bulbul (→ VD) în STÂNGA ecranului = dreapta embrionului,
   ventriculul primitiv (→ VS) în dreapta ecranului, atriul urcă DORSAL și CRANIAL, deasupra ventriculilor. */
export function loop() {
  // 8 puncte de control: 0–1 sinus, 1–2 atriu, 2–4 ventricul, 4–6 bulb, 6–7 trunchi
  const A = [[560, 880], [560, 800], [560, 720], [560, 640], [560, 560], [560, 480], [560, 380], [560, 210]];
  const Cc = [[600, 400], [690, 360], [740, 480], [740, 650], [640, 760], [480, 720], [460, 520], [560, 250]];
  const Bm = A.map((q, i) => [lerp(q[0], Cc[i][0], 0.5) + [0, 0, 40, 90, 60, -10, -40, 0][i], lerp(q[1], Cc[i][1], 0.5) + [0, 0, 20, 40, 50, 30, 0, 0][i]]);
  const shape = (m) => A.map((q, i) => (m < 0.5 ? [lerp(q[0], Bm[i][0], m * 2), lerp(q[1], Bm[i][1], m * 2)] : [lerp(Bm[i][0], Cc[i][0], m * 2 - 1), lerp(Bm[i][1], Cc[i][1], m * 2 - 1)]));
  const SEGI = [[0, 1], [1, 2], [2, 4], [4, 6], [6, 7]];
  const WID = [34, 46, 72, 58, 40];
  const NM = ['sinus venos', 'atriu', 'ventricul', 'bulb', 'trunchi'];
  let morph = 0;
  return {
    home: cam(560, 470, 1), cams: [cam(560, 470, 1), cam(560, 470, 1), cam(560, 470, 1), cam(560, 470, 1)],
    anchors: [() => { const s = shape(morph); return [s[5][0] - 150, s[5][1]]; }, () => { const s = shape(morph); return [s[3][0] + 185, s[3][1]]; }, () => { const s = shape(morph); return [s[1][0] + 160, s[1][1] - 10]; }, () => { const s = shape(morph); return [s[0][0] + 205, s[0][1] + 40]; }],
    phase: (i) => ['bulbul cardiac', 'ansa bulboventriculară', 'atriul urcă · canalul AV', 'sinusul venos'][i] || '23 → 24 → 35 de zile',
    draw(g, t, b) {
      bg(g);
      // morph: punctul 0 = tub drept; 1 = 0 → 0.55; 2 = 0.55 → 1; 3 = 1; intro: buclă 0 → 1
      const k = ease(clamp(b.bt / (b.bd * 0.7)));
      morph = b.i < 0 ? (REDUCED ? 1 : 0.5 - 0.5 * Math.cos(t * 0.55)) : [0, lerp(0, 0.55, k), lerp(0.55, 1, k), 1][b.i];
      const m = morph; const S = shape(m); const PTS = curve(S, 14);
      const zile = m < 0.25 ? '23 de zile' : m < 0.75 ? '24 de zile' : '35 de zile';
      txt(g, zile, 900, 120, 26, C.hi);
      txt(g, '← dreapta embrionului', 200, 120, 17, C.cream);
      photo(g, 'loop', 70, 770, 350, 120, 'Figura din LP (UMFST): 23, 24, 35 de zile', 1);
      // atriile din spate la 35 de zile (de o parte și de alta a trunchiului)
      if (m > 0.7) { const a = (m - 0.7) / 0.3; ell(g, 450, 380, 70, 56, '#8a5ad0', { alpha: a }); ell(g, 690, 360, 70, 56, '#8a5ad0', { alpha: a }); txt(g, 'atriul drept', 360, 300, 17, '#e3d6ff', { alpha: a }); txt(g, 'atriul stâng', 790, 290, 17, '#e3d6ff', { alpha: a }); }
      // venele care intră în sinus
      const s0 = S[0];
      [-1, 1].forEach((s) => tube(g, [[s0[0] + s * 110, s0[1] + 70], [s0[0] + s * 40, s0[1] + 30], [s0[0], s0[1]]], 22, '#5b7fd0', { ow: 5, alpha: 0.9 }));
      // segmentele
      SEGI.forEach(([i0, i1], j) => {
        const seg = PTS.slice(i0 * 14, i1 * 14 + 1); const w = WID[j] * (0.75 + 0.25 * m);
        tube(g, seg, w, SEGC[j], { raw: true, ow: 6, glow: (b.i === 0 && j === 3) || (b.i === 1 && (j === 2 || j === 3)) || (b.i === 2 && j === 1) || (b.i === 3 && j === 0) ? 0.7 : 0 });
      });
      // arcurile aortice din trunchi
      const tp = S[7]; [-1, 0, 1].forEach((s) => tube(g, [[tp[0], tp[1]], [tp[0] + s * 40, tp[1] - 40], [tp[0] + s * 80, tp[1] - 60]], 10, '#e8b93a', { ow: 4 }));
      // sângele: sinus → trunchi
      flow(g, PTS, t, B.mx, 12, 0.1, 7);
      // etichete
      const L = [[S[0], 'sinus venos', 70, 40], [S[1], 'atriu', 70, -10], [S[3], 'ventricul', 70, 0], [S[5], 'bulb', -70, 0], [S[7], 'trunchi', 60, 30]];
      L.forEach(([q, s, dx, dy]) => txt(g, s, q[0] + dx, q[1] + dy, 18, '#fff', { align: dx > 0 ? 'left' : 'right' }));
      // detalii pe puncte
      if (b.i === 0 || b.i < 0) { const q = S[5], r = S[6]; g.save(); g.strokeStyle = '#ffb347'; g.lineWidth = 5; g.setLineDash([10, 7]); g.beginPath(); g.moveTo(q[0] - 12, q[1] + 30); g.lineTo(S[7][0] - 8, S[7][1] + 20); g.moveTo(q[0] + 12, q[1] + 30); g.lineTo(S[7][0] + 8, S[7][1] + 20); g.stroke(); g.restore(); txt(g, 'crestele bulbare', r[0] - 140, r[1] - 40, 17, '#ffd59a'); }
      if (b.i === 1) { const q = S[4]; txt(g, 'șanțul\nbulboventricular', q[0] + 10, q[1] + 90, 17, C.hi); ring(g, q[0], q[1], 60, 50, ease(b.bt * 1.2)); }
      if (b.i === 2) { const q = S[2]; ell(g, q[0] - 18, q[1], 14, 22, '#3db06c', { ow: 3 }); ell(g, q[0] + 18, q[1], 14, 22, '#3db06c', { ow: 3 }); txt(g, 'canal AV:\npernițe endocardice', q[0] + 70, q[1] + 60, 17, '#bff0d2', { align: 'left' }); arr(g, 820, 820, 760, 480, '#ffb48a', 6, 0.9); txt(g, 'atriul urcă\ndorsal + cranial', 870, 800, 17, '#ffb48a'); }
      if (b.i === 3) { const q = S[1]; [-1, 1].forEach((s) => tube(g, [[q[0] - 30 + s * 6, q[1] + 6], [q[0] - 14 + s * 6, q[1] - 10]], 7, '#fff3e6', { ow: 3 })); txt(g, 'orificiul sinuatrial +\nvalvulele sinuatriale', q[0] + 80, q[1] + 110, 17, C.hi, { align: 'left' }); txt(g, 'aici se varsă venele', s0[0] + 30, s0[1] + 120, 17, '#c9d8ff', { align: 'left' }); }
    },
  };
}

/* =================================================== S4–5: CORDUL TETRACAMERAL
   Interior (secțiune frontală, AD în stânga ecranului): septul interatrial COBOARĂ din tavan; septul interventricular
   muscular URCĂ de la vârf; pernițele AV (verzi) cresc din sus și din jos și fuzionează → canal AV drept + stâng; apar
   valvele (tricuspidă la dreapta embrionului = stânga ecranului, mitrală la stânga embrionului). Sângele merge din atrii
   în ventriculi (în jos). Exterior: se desenează pe rând cele 4 șanțuri. */
export function fourCh() {
  const X0 = 40, X1 = 500; const MX = 270;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[MX + 40, 200], [MX + 40, 760], [MX + 120, 470], [760, 170]],
    phase: (i) => ['septul atrial coboară', 'septul ventricular urcă', 'valvele AV', 'șanțurile externe'][i] || 'S4–5',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      panel(g, 14, 40, 500, 850); panel(g, 530, 40, 456, 850);
      txt(g, 'interior (secțiune frontală)', MX, 76, 19, '#ffd2b8'); txt(g, 'exterior', 758, 76, 19, '#ffd2b8');
      // corpul
      const body = new Path2D(); body.moveTo(X0 + 20, 140); body.lineTo(X1 - 20, 140); body.quadraticCurveTo(X1, 140, X1, 170); body.lineTo(X1, 560); body.quadraticCurveTo(X1 - 20, 760, MX, 860); body.quadraticCurveTo(X0 + 20, 760, X0, 560); body.lineTo(X0, 170); body.quadraticCurveTo(X0, 140, X0 + 20, 140); body.closePath();
      paint(g, body, B.wall, null, null, [X0, 140, 460, 720], OUT, 6);
      const room = (x, y, w, h, f) => { const r = new Path2D(); r.roundRect(x, y, w, h, 24); g.fillStyle = f; g.fill(r); };
      room(X0 + 24, 164, 412, 260, '#f4eaf4'); room(X0 + 24, 500, 412, 230, '#f4eaf4');
      g.save(); g.beginPath(); g.moveTo(X0 + 40, 700); g.quadraticCurveTo(MX, 900, X1 - 40, 700); g.lineTo(X1 - 40, 600); g.lineTo(X0 + 40, 600); g.closePath(); g.fillStyle = '#f4eaf4'; g.fill(); g.restore();
      g.fillStyle = '#f4eaf4'; g.fillRect(X0 + 60, 410, 340, 110);
      txt(g, 'AD', 130, 230, 34, '#3567b8', { stroke: false }); txt(g, 'AS', 410, 230, 34, '#c4403a', { stroke: false });
      txt(g, 'VD', 130, 640, 34, '#3567b8', { stroke: false }); txt(g, 'VS', 410, 640, 34, '#c4403a', { stroke: false });
      // 1 · septul interatrial coboară din tavan
      const s0 = p(0); if (s0 > 0) tube(g, [[MX, 164], [MX, lerp(164, 400, s0)]], 14, B.prim, { ow: 4, cap: 'butt' });
      if (b.i === 0) arr(g, MX + 50, 190, MX + 50, 330, C.hi, 5, 0.9);
      // 2 · septul interventricular muscular urcă de la vârf
      const s1 = p(1); if (s1 > 0) { const top = lerp(830, 560, s1); g.save(); g.fillStyle = B.musc; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(MX - 26, 830); g.lineTo(MX - 9, top); g.lineTo(MX + 9, top); g.lineTo(MX + 26, 830); g.closePath(); g.fill(); g.stroke(); g.restore(); }
      if (b.i === 1) arr(g, MX + 60, 800, MX + 60, 640, C.hi, 5, 0.9);
      // 3 · pernițele AV cresc din sus și din jos și fuzionează → 2 canale; valvele
      const s2 = p(2); const gap = lerp(36, 0, s2);
      ell(g, MX, 448 - gap, 70, 20, B.cush, { ow: 4 }); ell(g, MX, 482 + gap, 70, 20, B.cush, { ow: 4 });
      if (s2 > 0.6) { const a = (s2 - 0.6) / 0.4; ell(g, MX, 465, 74, 26, B.cush, { ow: 4, alpha: a });
        // tricuspida (3 cuspide) în stânga ecranului, mitrala (2) în dreapta ecranului
        [[X0 + 70, 3], [X1 - 150, 2]].forEach(([x, n]) => { for (let c = 0; c < n; c++) tube(g, [[x + c * (80 / n) + 6, 470], [x + c * (80 / n) + 18, 520]], 10, '#fff3e6', { ow: 3, alpha: a }); });
        txt(g, 'tricuspidă', 120, 545, 17, '#c9d8ff', { alpha: a }); txt(g, 'mitrală', 420, 545, 17, '#ffd0cc', { alpha: a });
        txt(g, 'canal AV drept', 120, 382, 16, '#3567b8', { stroke: false, alpha: a }); txt(g, 'canal AV stâng', 420, 382, 16, '#c4403a', { stroke: false, alpha: a }); }
      // sângele: din atrii în ventriculi (în jos), pe cele 2 canale
      if (s2 > 0.3 || b.i < 0) { flow(g, [[130, 260], [125, 470], [130, 640]], t, B.mx, 4, 0.3, 7); flow(g, [[410, 260], [415, 470], [410, 640]], t, B.mx, 4, 0.3, 7); }
      // ----- exterior: inima + șanțurile
      const hx = 758, hy = 470;
      const heart = new Path2D(); heart.moveTo(hx, 230); heart.bezierCurveTo(hx - 70, 160, hx - 200, 190, hx - 190, 330); heart.bezierCurveTo(hx - 180, 520, hx - 60, 680, hx, 780); heart.bezierCurveTo(hx + 60, 680, hx + 180, 520, hx + 190, 330); heart.bezierCurveTo(hx + 200, 190, hx + 70, 160, hx, 230); heart.closePath();
      paint(g, heart, '#e07a76', '#c25a56', '#f6b0aa', [hx - 190, 180, 380, 600], OUT, 6);
      const s3 = p(3);
      const sul = [
        ['interatrial', [[hx, 236], [hx + 4, 340]], 0, [hx + 16, 290, 'left']],
        ['coronar', [[hx - 186, 380], [hx - 60, 400], [hx + 60, 400], [hx + 186, 380]], 1, [hx + 120, 430, 'center']],
        ['interventricular', [[hx + 6, 400], [hx - 10, 560], [hx, 760]], 2, [hx + 20, 600, 'left']],
        ['bulboventricular', [[hx - 70, 400], [hx - 110, 520], [hx - 70, 640]], 3, [hx - 120, 700, 'center']],
      ];
      sul.forEach(([n, pts, k, [lx, ly, al]]) => {
        const a = b.i < 3 && b.i >= 0 ? 0 : clamp(s3 * 4 - k);
        if (a <= 0) return;
        tube(g, pts, 5, '#5a2430', { ow: 0, dash: [12, 8], u1: a });
        txt(g, n, lx, ly, 17, C.cream, { align: al, alpha: a });
      });
      txt(g, 'de afară vezi unde\nsunt septurile', hx, 840, 17, '#ffd2b8', { alpha: b.i === 3 || b.i < 0 ? 1 : 0.3 });
    },
  };
}
