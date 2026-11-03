// Scenele noi ale deck-ului „Curs Embriologie UNIX” (ce nu există în deck-urile LP): foliculii, sarcina ectopică, vezicula + cordonul,
// decidua + lichidul amniotic, placenta, formele + invazia placentei, transpoziția + vasele mari, Hirschsprung + fistulele anorectale,
// creasta mamară și coperta cu 7 miniaturi. Același stil ca LP-urile (contur gros, fundal închis), aceleași helpere.
import { OUT, clamp, lerp, ease, REDUCED } from './kit2d.js';
import { bg, txt, pill, panel, ell, tube, dot, arr, ring, lead, P, on, HOME, cam, C } from './l6/ek.js';

const CR = { cream: '#fff3e6', dim: '#a8968c', hi: '#ffe36e', red: '#ff6b5e', blood: '#d8343f', vein: '#4f7fe0', gran: '#f2b07a', granS: '#c98450', oo: '#f7e3c8', nuc: '#6a3f9e', zona: '#ff9ccf', antrum: '#9fd4f5', theca: '#c9784a', ok: '#7fd99a' };
const pulse = (t, s = 2.2) => (REDUCED ? 1 : 0.5 + 0.5 * Math.sin(t * s));
function rr(g, x, y, w, h, r, fill, o = {}) { g.save(); if (o.alpha !== undefined) g.globalAlpha = clamp(o.alpha); g.beginPath(); g.roundRect(x, y, w, h, r); g.fillStyle = fill; g.fill(); if (o.ow !== 0) { g.strokeStyle = o.sc || OUT; g.lineWidth = o.ow ?? 5; g.stroke(); } g.restore(); }
function hl(g, x, y, w, h, a) { if (a <= 0.01) return; g.save(); g.globalAlpha = clamp(a); g.strokeStyle = CR.hi; g.lineWidth = 6; g.shadowColor = CR.hi; g.shadowBlur = 22; g.beginPath(); g.roundRect(x, y, w, h, 18); g.stroke(); g.restore(); }

/* =========================================================== 1. FOLICULII: 5 tipuri
   Ce trebuie să se vadă: primordial (oocit + celule turtite) → primar (cuboid simplu + zona pellucida) → secundar (cuboid stratificat)
   → terțiar (antru, oocit excentric, teaca internă + externă) → Graaf (mare, oocitul pe cumulus). Oocitul e PRIMAR (mov) până la
   terțiar inclusiv; doar Graaf are oocit SECUNDAR (galben, metafaza II). */
function oocyte(g, x, y, r, sec) {
  ell(g, x, y, r, r, sec ? '#ffe9a0' : CR.oo, { ow: 4 });
  if (sec) { // metafaza II: placa ecuatorială în loc de nucleu
    g.save(); g.strokeStyle = CR.nuc; g.lineWidth = 4; for (let k = -2; k <= 2; k++) { g.beginPath(); g.moveTo(x - 10 + k * 5, y - r * 0.28); g.lineTo(x - 10 + k * 5, y + r * 0.28); g.stroke(); } g.restore();
  } else { dot(g, x, y, r * 0.36, CR.nuc, { ow: 3 }); dot(g, x + r * 0.08, y - r * 0.06, r * 0.1, '#2a1240', { ow: 0 }); }
}
function granLayer(g, x, y, r0, n, w, h, col = CR.gran) {
  for (let k = 0; k < n; k++) { const a = (k / n) * Math.PI * 2; const cx = x + Math.cos(a) * r0, cy = y + Math.sin(a) * r0; ell(g, cx, cy, w, h, col, { rot: a, ow: 2.5 }); }
}
function follicle(g, x, y, type) {
  if (type === 0) { oocyte(g, x, y, 30); granLayer(g, x, y, 37, 10, 4, 12); return; }
  if (type === 1) { ell(g, x, y, 47, 47, CR.zona, { ow: 3 }); oocyte(g, x, y, 38); granLayer(g, x, y, 58, 16, 9, 9); return; }
  if (type === 2) { granLayer(g, x, y, 84, 30, 9, 9); granLayer(g, x, y, 68, 24, 9, 9); ell(g, x, y, 54, 54, CR.zona, { ow: 3 }); oocyte(g, x, y, 44); return; }
  const R = type === 3 ? 125 : 175;
  ell(g, x, y, R + 22, R + 22, '#8a4f36', { ow: 5 }); // teaca externă (fibroblaști)
  ell(g, x, y, R + 10, R + 10, CR.theca, { ow: 3 }); // teaca internă (endocrină)
  ell(g, x, y, R, R, CR.gran, { ow: 4 }); // granuloasa
  ell(g, x + R * 0.12, y + R * 0.05, R * 0.72, R * 0.7, CR.antrum, { ow: 3 }); // antrul
  const ox = x - R * 0.62, oy = y - R * 0.05, ro = type === 3 ? 30 : 40;
  ell(g, ox + 6, oy, ro + 26, ro + 24, CR.gran, { ow: 0 }); // cumulus
  ell(g, ox, oy, ro + 8, ro + 8, CR.zona, { ow: 3 }); oocyte(g, ox, oy, ro, type === 4);
}
export function foll() {
  const POS = [[150, 230], [370, 230], [640, 230], [270, 640], [700, 620]];
  const NAME = ['primordial', 'primar', 'secundar', 'terțiar (cavitar)', 'matur (Graaf)'];
  const WRAP = ['epiteliu simplu scuamos', 'cuboid simplu + zona pellucida', 'cuboid stratificat', 'antru · granuloasă · 2 teci', '~20 mm · ovulul pe cumulus'];
  return {
    home: HOME, cams: [cam(400, 250, 1.35), cam(290, 640, 1.3), cam(690, 610, 1.25)],
    anchors: [[150, 150], [270, 470], [880, 470]],
    phase: (i) => ['primordial → primar → secundar', 'terțiarul: tot oocit primar', 'Graaf: oocitul secundar'][i] || '5 tipuri de folicul',
    draw(g, t, b) {
      bg(g);
      panel(g, 14, 50, 972, 380); panel(g, 14, 444, 972, 470);
      POS.forEach(([x, y], k) => {
        const act = b.i < 0 || (b.i === 0 && k <= 2) || (b.i === 1 && k === 3) || (b.i === 2 && k === 4);
        g.save(); g.globalAlpha = act ? 1 : 0.35; follicle(g, x, y, k); g.restore();
        const ly = k < 3 ? 395 : k === 3 ? 880 : 880;
        txt(g, NAME[k], x, ly - 22, 22, act ? CR.hi : CR.dim);
        txt(g, WRAP[k], x, ly + 6, 16, act ? CR.cream : CR.dim, { w: 600 });
      });
      for (let k = 0; k < 2; k++) arr(g, POS[k][0] + 62 + (k ? 30 : 0), 230, POS[k + 1][0] - 72 - (k ? 30 : 0), 230, '#fff3e6', 5, 0.8);
      arr(g, 640, 330, 380, 470, '#fff3e6', 5, 0.6); arr(g, 420, 640, 500, 630, '#fff3e6', 5, 0.8);
      pill(g, 500, 80, 300, 40, '#e8d4f5', 'oocit PRIMAR (profaza I)', { size: 17 });
      pill(g, 700, 800, 310, 40, '#ffe9a0', 'oocit SECUNDAR (metafaza II)', { size: 17 });
      txt(g, 'teaca externă', 900, 470, 15, '#e8b8a0', { w: 700 }); lead(g, 900, 482, 860, 520);
      txt(g, 'antru', 760, 640, 18, OUT, { stroke: false });
      txt(g, 'zona pellucida', 360, 310, 15, '#ffc4e2', { w: 700 });
      if (on(b, 0)) ring(g, 370, 230, 70, 70, ease(b.bt));
      if (on(b, 1)) ring(g, 230, 640, 60, 60, ease(b.bt));
      if (on(b, 2)) ring(g, 590, 615, 62, 62, ease(b.bt));
    },
  };
}

/* =========================================================== 2. SARCINA ECTOPICĂ
   Ce trebuie să se vadă: uterul + trompa (infundibul, ampulă, istm, porțiunea intramurală) + ovarul. Implantarea normală în fundul
   uterului (verde). Apoi pe rând: ampulară (evoluează cel mai mult), istmică + intramurală (pulsează roșu = ruptură precoce),
   ovariană / abdominală, cervicală (cu semnul întrebării: cursul se contrazice). */
export function ectopic() {
  const site = { norm: [470, 330], amp: [700, 250], ist: [610, 300], intra: [560, 318], inf: [840, 300], ov: [800, 420], abd: [720, 610], cerv: [470, 690] };
  return {
    home: HOME, cams: [HOME, cam(690, 300, 1.45), cam(600, 320, 1.55), cam(700, 470, 1.15), cam(480, 640, 1.4), HOME],
    anchors: [site.norm, site.amp, site.ist, site.ov, site.cerv, [150, 820]],
    phase: (i) => ['implantare normală: corpul uterin', 'tubară ampulară', 'istmică + intramurală', 'ovariană · abdominală', 'cervicală', 'FIV'][i] || 'unde se poate implanta',
    draw(g, t, b) {
      bg(g);
      // uterul (frontal), colul, vaginul
      const ut = new Path2D(); ut.moveTo(330, 260); ut.bezierCurveTo(330, 200, 610, 200, 610, 260); ut.bezierCurveTo(610, 420, 540, 520, 520, 600); ut.lineTo(520, 760); ut.lineTo(420, 760); ut.lineTo(420, 600); ut.bezierCurveTo(400, 520, 330, 420, 330, 260); ut.closePath();
      g.save(); g.fillStyle = '#e07a7a'; g.fill(ut); g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(ut); g.restore();
      const cav = new Path2D(); cav.moveTo(380, 270); cav.bezierCurveTo(400, 250, 540, 250, 560, 270); cav.bezierCurveTo(540, 380, 490, 470, 478, 590); cav.lineTo(478, 760); cav.lineTo(462, 760); cav.lineTo(462, 590); cav.bezierCurveTo(450, 470, 400, 380, 380, 270); cav.closePath();
      g.save(); g.fillStyle = '#7a2a3a'; g.fill(cav); g.restore();
      txt(g, 'col', 360, 700, 18, CR.cream); lead(g, 380, 700, 425, 700);
      txt(g, 'orificiul\ncervical intern', 300, 600, 15, CR.dim, { w: 600 }); lead(g, 345, 600, 460, 595);
      // trompa dreaptă (în imagine): intramurală → istm → ampulă → infundibul cu fimbrii
      const T = [[600, 262], [650, 278], [700, 262], [770, 250], [830, 280]];
      tube(g, T, 18, '#f0a0a0', { ow: 6 });
      tube(g, [[555, 300], [600, 262]], 8, '#f0a0a0', { ow: 4 });
      for (let k = 0; k < 6; k++) { const a = -0.9 + k * 0.36; tube(g, [[830, 280], [830 + Math.cos(a) * 46, 300 + Math.sin(a) * 46]], 6, '#f0a0a0', { ow: 3 }); }
      ell(g, 800, 420, 58, 36, '#f3d7b5', { ow: 5 }); txt(g, 'ovar', 800, 470, 17, CR.cream);
      txt(g, 'istm', 620, 220, 16, CR.cream); txt(g, 'ampulă', 730, 210, 16, CR.cream); txt(g, 'infundibul', 900, 240, 16, CR.cream); txt(g, 'intramurală', 540, 360, 14, CR.cream, { w: 700 }); lead(g, 552, 346, 572, 298);
      // peritoneul (cavitatea abdominală) — linie punctată
      g.save(); g.setLineDash([10, 10]); g.strokeStyle = 'rgba(255,230,210,.35)'; g.lineWidth = 3; g.beginPath(); g.ellipse(560, 470, 420, 330, 0, 0, Math.PI * 2); g.stroke(); g.restore();
      txt(g, 'cavitatea peritoneală', 260, 170, 15, CR.dim, { w: 600 });
      const emb = (x, y, col, r = 13, a = 1) => { dot(g, x, y, r, col, { alpha: a, ow: 3 }); dot(g, x, y, r * 0.45, '#fff3e6', { alpha: a, ow: 0 }); };
      const sh = b.i < 0;
      if (sh || b.i === 0) emb(...site.norm, CR.ok, 16);
      if (sh || b.i === 1) emb(...site.amp, '#ffb347', 15);
      if (sh || b.i === 2) { const p = pulse(t, 5); emb(...site.ist, CR.red, 13); emb(...site.intra, CR.red, 10); if (b.i === 2) ring(g, 590, 305, 52 + 8 * p, 30 + 6 * p, 0.9); }
      if (sh || b.i === 3) { emb(...site.ov, '#c79bff', 12); emb(...site.abd, '#c79bff', 14); emb(...site.inf, '#ffb347', 11); }
      if (sh || b.i === 4) emb(...site.cerv, '#ff9ccf', 13);
      if (b.i === 1) { txt(g, 'evoluează cel mai mult\n(până în trimestrul II)', 720, 140, 19, CR.hi); txt(g, 'infundibulara se comportă ca ea', 820, 340, 14, CR.cream, { w: 600 }); }
      if (b.i === 2) txt(g, 'risc maxim de ruptură precoce\n→ hemoperitoneu (urgență)', 640, 140, 19, '#ff8a80');
      if (b.i === 3) { txt(g, 'abdominală primară: extrem de rară\n(zigotul direct pe peritoneu)', 720, 700, 15, CR.cream, { w: 700 }); txt(g, 'secundară: o tubară reimplantată', 720, 760, 15, CR.cream, { w: 700 }); }
      if (b.i === 4) { txt(g, '?', 545, 690, 46, CR.hi); txt(g, 'cursul o numește și extrauterină,\nși anomalie de implantare', 680, 640, 15, CR.cream, { w: 700 }); }
      if (b.i === 5) {
        g.save(); g.fillStyle = 'rgba(20,12,10,.82)'; g.fillRect(0, 0, 1000, 934); g.restore();
        panel(g, 60, 120, 880, 700);
        // vasul Petri → morulă → cateter în uter
        ell(g, 230, 420, 130, 46, '#cfe9f5', { ow: 5 }); txt(g, 'ovul + spermii\npe mediu de cultură', 230, 520, 17, CR.cream);
        for (let k = 0; k < 8; k++) dot(g, 470 + (k % 3) * 22 - 22, 400 + Math.floor(k / 3) * 22, 11, '#f7e3c8', { ow: 3 });
        txt(g, '~8 blastomere', 470, 520, 17, CR.cream);
        arr(g, 330, 420, 410, 420, '#fff3e6', 6); arr(g, 540, 420, 620, 420, '#fff3e6', 6);
        tube(g, [[640, 420], [860, 420]], 8, '#e8e8e8', { ow: 4 }); txt(g, 'cateter fin, fără anestezie\n~0,05 ml, același ciclu', 750, 500, 16, CR.cream);
        txt(g, 'Edwards + Bavister 1968 · Louise Brown 1978', 500, 660, 20, CR.hi);
      }
    },
  };
}

/* =========================================================== 3. VEZICULA OMBILICALĂ + CORDONUL
   Ce trebuie să se vadă (4 cadrane): embrionul cu vezicula ombilicală ventral și insulele sanguine (primul organ hematopoietic);
   secțiunea prin cordon (2 artere, 1 venă, gelatina Wharton, alantoida); cele 3 inserții (centrală, marginală, velamentoasă);
   anomaliile (lungimea 30 / 150 cm, nod adevărat vs fals, arteră unică). */
export function cordS() {
  const Q = [[250, 250], [750, 250], [250, 690], [750, 690]];
  return {
    home: HOME, cams: Q.map(([x, y]) => cam(x, y, 1.55)),
    anchors: [[150, 330], [690, 200], [250, 600], [640, 760]],
    phase: (i) => ['vezicula ombilicală', 'secțiunea prin cordon', 'inserția cordonului', 'cordonul anormal'][i] || 'vezicula + cordonul',
    draw(g, t, b) {
      bg(g);
      [[14, 40], [506, 40], [14, 480], [506, 480]].forEach(([x, y], k) => { panel(g, x, y, 480, 430); hl(g, x, y, 480, 430, b.i === k ? 0.8 : 0); });
      // --- vezicula ombilicală: embrion în C + sac ventral cu insule sanguine
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 64; g.beginPath(); g.arc(250, 200, 70, Math.PI * 0.95, Math.PI * 2.25); g.stroke(); g.strokeStyle = '#f3c29b'; g.lineWidth = 52; g.stroke(); g.restore();
      tube(g, [[250, 260], [220, 300]], 14, '#f3c29b', { ow: 5 });
      ell(g, 190, 340, 56, 52, '#f4c34f', { ow: 5 });
      for (let k = 0; k < 7; k++) { const a = k * 0.9 + 0.3; dot(g, 190 + Math.cos(a) * 36, 340 + Math.sin(a) * 34, 7, '#d8343f', { ow: 2 }); }
      txt(g, 'embrion', 330, 110, 17, CR.cream); txt(g, 'vezicula\nombilicală', 110, 420, 16, CR.cream); txt(g, 'insule\nsanguine', 340, 380, 15, '#ff9a9a', { w: 700 });
      // --- secțiune prin cordon
      const cx = 750, cy = 255;
      ell(g, cx, cy, 150, 150, '#f6efd6', { ow: 6 }); // gelatina Wharton
      ell(g, cx + 40, cy - 10, 48, 48, CR.vein, { ow: 6 }); ell(g, cx + 40, cy - 10, 26, 26, '#2a3d7a', { ow: 0 });
      ell(g, cx - 60, cy - 50, 30, 30, CR.blood, { ow: 6 }); ell(g, cx - 60, cy - 50, 11, 11, '#5a1018', { ow: 0 });
      ell(g, cx - 50, cy + 66, 30, 30, CR.blood, { ow: 6 }); ell(g, cx - 50, cy + 66, 11, 11, '#5a1018', { ow: 0 });
      dot(g, cx + 30, cy + 80, 8, '#f4c34f', { ow: 3 });
      txt(g, 'vena (1)', cx + 40, cy - 92, 17, '#a9c2ff'); txt(g, '2 artere', cx - 150, cy - 110, 17, '#ff9a9a'); txt(g, 'gelatina Wharton', cx, cy + 180, 17, CR.cream); txt(g, 'alantoida', cx + 30, cy + 110, 14, '#ffe08a', { w: 700 });
      // --- inserțiile
      const ins = (x, y, kind, lab) => {
        ell(g, x, y, 62, 62, '#b8434d', { ow: 5 });
        if (kind === 2) { g.save(); g.setLineDash([6, 6]); g.strokeStyle = '#fff3e6'; g.lineWidth = 3; g.beginPath(); g.moveTo(x + 62, y); g.lineTo(x + 100, y - 30); g.stroke(); g.restore(); }
        const ix = kind === 0 ? x : kind === 1 ? x + 52 : x + 100, iy = kind === 2 ? y - 30 : y;
        tube(g, [[ix, iy], [ix + 6, iy - 70]], 12, '#f6efd6', { ow: 4 });
        dot(g, ix, iy, 9, '#ffe36e', { ow: 3 });
        txt(g, lab, x + (kind === 2 ? 20 : 0), y + 90, 16, CR.cream);
      };
      ins(110, 720, 0, 'centrală'); ins(260, 720, 1, 'marginală'); ins(390, 720, 2, 'velamentoasă');
      txt(g, 'membrane', 505, 735, 13, CR.dim, { w: 700 });
      // --- anomaliile: bare de lungime + nod adevărat / fals
      rr(g, 560, 540, 120, 22, '#f6efd6', { ow: 4 }); txt(g, 'scurt ~30 cm', 620, 590, 15, CR.cream);
      rr(g, 560, 620, 380, 22, '#f6efd6', { ow: 4 }); txt(g, 'lung până la 150 cm → circulare (gât)', 750, 670, 15, CR.cream);
      const knot = (x, y, real) => { tube(g, [[x - 60, y], [x - 20, y - 20], [x + 10, y + 20], [x + 30, y - 10], [x + 60, y]], 12, '#f6efd6', { ow: 4 }); if (real) { g.save(); g.strokeStyle = OUT; g.lineWidth = 16; g.beginPath(); g.arc(x, y, 22, 0, 7); g.stroke(); g.strokeStyle = '#f6efd6'; g.lineWidth = 10; g.stroke(); g.restore(); } else ell(g, x, y, 16, 12, CR.vein, { ow: 3 }); };
      knot(640, 780, true); knot(840, 780, false);
      txt(g, 'nod adevărat', 640, 840, 15, CR.cream); txt(g, 'nod fals = varice\nale venei', 840, 850, 14, CR.cream, { w: 700 });
    },
  };
}

/* =========================================================== 4. DECIDUA + LICHIDUL AMNIOTIC
   Ce trebuie să se vadă: uterul în secțiune sagitală cu conceptul: decidua bazală (sub viitoarea placentă), capsulară (peste concept),
   parietală (restul endometrului); cavitatea amniotică; în dreapta „termometrul” volumului: < 300–400 ml oligo, ~1000 ml la S37 SA,
   > 2000 ml poli, cu asocierile; la final, brida amniotică pe un deget. */
export function sacS() {
  return {
    home: HOME, cams: [cam(330, 470, 1.25), cam(760, 470, 1.15), cam(760, 470, 1.15), cam(330, 760, 1.6)],
    anchors: [[200, 160], [720, 230], [700, 160], [300, 790]],
    phase: (i) => ['decidua: 3 părți', '98% apă · AFP', 'poli- vs oligoamnios', 'brida amniotică'][i] || 'decidua + lichidul amniotic',
    draw(g, t, b) {
      bg(g); panel(g, 14, 40, 600, 860); panel(g, 626, 40, 360, 860);
      // uter (perete = miometru)
      ell(g, 320, 420, 270, 330, '#c0566a', { ow: 7 });
      ell(g, 320, 420, 228, 288, '#e9a3b0', { ow: 3 }); // decidua parietală
      ell(g, 320, 420, 212, 272, '#4a1f2a', { ow: 0 }); // cavitatea uterină
      // conceptul lipit de peretele de sus: decidua bazală = între el și miometru; capsulară = peste el; parietală = restul
      const ox = 320, oy = 268;
      g.save(); g.beginPath(); g.ellipse(320, 420, 228, 288, 0, 0, Math.PI * 2); g.clip();
      ell(g, 320, 150, 150, 52, '#7a1f33', { ow: 4 }); // decidua bazală (spre perete)
      g.restore();
      ell(g, ox, oy, 118, 118, '#e9a3b0', { ow: 4 }); // capsulară
      ell(g, ox, oy, 102, 102, '#f2c6a0', { ow: 3 }); // corion
      ell(g, ox, oy, 84, 84, '#9fd4f5', { ow: 3 }); // amnios + lichid
      g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 36; g.beginPath(); g.arc(ox + 5, oy + 10, 36, Math.PI * 0.9, Math.PI * 2.3); g.stroke(); g.strokeStyle = '#f3c29b'; g.lineWidth = 27; g.stroke(); g.restore();
      txt(g, 'bazală', 100, 110, 18, '#ff9ab0'); lead(g, 135, 120, 230, 150);
      txt(g, 'capsulară', 520, 250, 18, '#ffd0da'); lead(g, 480, 258, 432, 290);
      txt(g, 'parietală', 470, 640, 18, '#ffd0da'); lead(g, 450, 625, 470, 560);
      txt(g, 'cavitatea\namniotică', 320, 305, 14, OUT, { stroke: false });
      txt(g, 'miometru', 320, 790, 17, CR.dim);
      hl(g, 30, 60, 568, 760, b.i === 0 ? 0.8 : 0);
      // termometrul volumului
      const X = 720, Y0 = 820, Y1 = 140, V = (v) => lerp(Y0, Y1, v / 2600);
      rr(g, X - 34, Y1 - 10, 68, Y0 - Y1 + 20, 30, '#1c1218', { ow: 5 });
      const lv = b.i === 2 ? (0.5 + 0.5 * Math.sin(t * 0.9)) * 2400 + 150 : 1000;
      rr(g, X - 26, V(lv), 52, Y0 - V(lv), 24, '#9fd4f5', { ow: 0 });
      const mark = (v, s, col) => { g.save(); g.strokeStyle = col; g.lineWidth = 4; g.beginPath(); g.moveTo(X - 44, V(v)); g.lineTo(X + 44, V(v)); g.stroke(); g.restore(); txt(g, s, X + 140, V(v), 16, col, { w: 700 }); };
      mark(2000, '> 2000 ml\nPOLI', '#7fb8ff'); mark(1000, '~1000 ml\nS37 SA', CR.ok); mark(350, '< 300–400 ml\nOLIGO', '#ffd36e'); mark(10, '< 10 ml (8 săpt)', CR.dim);
      if (b.i === 1 || b.i < 0) txt(g, '98% apă\n+ AFP', X, 470, 18, OUT, { stroke: false });
      if (b.i === 2) { txt(g, 'SNC · tub digestiv', X + 140, V(2000) + 44, 15, '#a9d0ff'); txt(g, 'rinichi · suprapurtată', X + 140, V(350) + 44, 15, '#ffe08a'); }
      hl(g, 640, 60, 332, 820, b.i === 1 || b.i === 2 ? 0.8 : 0);
      // brida amniotică (jos-stânga, desen mic)
      if (b.i === 3) {
        g.save(); g.fillStyle = 'rgba(20,12,10,.85)'; g.fillRect(14, 600, 600, 300); g.restore();
        tube(g, [[160, 760], [440, 760]], 60, '#f3c29b', { ow: 6 });
        g.save(); g.strokeStyle = OUT; g.lineWidth = 16; g.beginPath(); g.moveTo(330, 700); g.lineTo(330, 820); g.stroke(); g.strokeStyle = '#e6f3ff'; g.lineWidth = 9; g.stroke(); g.restore();
        tube(g, [[330, 700], [420, 640], [540, 660]], 8, '#e6f3ff', { ow: 4 });
        txt(g, 'brida → strangulează degete, membre, cordon', 320, 860, 16, CR.cream);
      }
    },
  };
}

/* =========================================================== 5. PLACENTA în secțiune
   Ce trebuie să se vadă: sus lama corionică (fetală, lucioasă = amnios), cu cordonul; jos placa bazală (maternă = decidua bazală)
   cu 2 septuri placentare care NU ajung până sus (separă incomplet 3 cotiledoane maternale, fiecare cu 2 arbori fetali); între ele spațiul intervilos în care
   sângele matern țâșnește din arterele spiralate (anim: particule roșii jos → sus, se întorc la vene); arborii vilozitari
   atârnă din lama corionică; la final, vilozitatea terminală mărită cu vasele la periferie + vilozitatea de ancorare prinsă de placa bazală. */
export function placS() {
  const top = 200, base = 700;
  const trees = [140, 270, 410, 560, 700, 850];
  return {
    home: HOME, cams: [cam(500, 260, 1.3), cam(500, 680, 1.3), HOME, HOME, cam(780, 450, 1.25)],
    anchors: [[120, 205], [120, 730], [775, 625], [485, 600], [800, 330]],
    phase: (i) => ['lama corionică = fetală', 'partea bazală = maternă', 'spațiul intervilos', 'cotiledoane', 'vilozitățile terminale'][i] || 'placenta: două origini',
    draw(g, t, b) {
      bg(g);
      // placa bazală + miometru
      rr(g, 40, base, 920, 80, 10, '#7a1f33', { ow: 6 });
      rr(g, 40, base + 80, 920, 70, 10, '#c0566a', { ow: 6 });
      txt(g, 'decidua bazală (placa bazală)', 665, base + 40, 18, '#ffd0da'); txt(g, 'miometru', 665, base + 115, 17, '#ffe6ea');
      // spațiul intervilos (sânge matern)
      rr(g, 40, top + 40, 920, base - top - 40, 0, '#5a1525', { ow: 0 });
      // septuri (incomplete)
      [340, 630].forEach((x) => { const s = new Path2D(); s.moveTo(x - 22, base); s.lineTo(x, base - 280); s.lineTo(x + 22, base); s.closePath(); g.save(); g.fillStyle = '#7a1f33'; g.fill(s); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(s); g.restore(); });
      // sângele matern: artere spiralate → spațiu → înapoi
      const flowOn = b.i < 0 || b.i === 2;
      [180, 470, 860].forEach((x, k) => {
        tube(g, [[x - 18, base + 120], [x - 4, base + 60], [x - 18, base + 20], [x, base]], 7, '#ff5a5a', { ow: 3 });
        if (flowOn) for (let n = 0; n < 7; n++) { const u = ((n / 7) + (REDUCED ? 0 : t * 0.22) + k * 0.13) % 1; const yy = lerp(base - 10, top + 90, Math.sin(u * Math.PI / 2)); const xx = x + Math.sin(u * 7 + n) * 30 * u; dot(g, xx, yy, 6, '#ff6b6b', { alpha: 1 - u * 0.6, ow: 2 }); }
      });
      // arborii vilozitari (fetali) atârnă din lama corionică
      const tree = (x, a = 1) => {
        g.save(); g.globalAlpha = a;
        tube(g, [[x, top + 40], [x, top + 200]], 16, '#f2c6a0', { ow: 5 });
        [[-60, 300], [60, 300], [-30, 380], [30, 400], [0, 460]].forEach(([dx, dy]) => tube(g, [[x, top + 160], [x + dx * 0.6, top + dy * 0.6 + 60], [x + dx, top + dy]], 10, '#f2c6a0', { ow: 4 }));
        [[-60, 300], [60, 300], [-30, 380], [30, 400], [0, 460]].forEach(([dx, dy]) => ell(g, x + dx, top + dy, 14, 14, '#f7d8b8', { ow: 3 }));
        g.restore();
      };
      trees.forEach((x) => tree(x, b.i === 3 ? 1 : 0.95));
      // vilozitatea de ancorare: ajunge la placa bazală
      tube(g, [[90, top + 40], [80, 450], [92, base]], 12, '#f2c6a0', { ow: 4 });
      txt(g, 'ancorare', 100, 470, 14, '#ffe0c8', { w: 700 });
      // lama corionică
      rr(g, 40, top - 30, 920, 70, 12, '#e8c08a', { ow: 6 });
      g.save(); g.strokeStyle = '#e6f6ff'; g.lineWidth = 5; g.beginPath(); g.moveTo(52, top - 26); g.lineTo(948, top - 26); g.stroke(); g.restore();
      tube(g, [[500, top - 30], [520, 70]], 30, '#f6efd6', { ow: 6 });
      txt(g, 'lama corionică (din corionul vilos)', 500, top + 5, 18, OUT, { stroke: false });
      txt(g, 'amnios: aspect lucios', 230, top - 52, 15, '#cfefff', { w: 700 });
      txt(g, 'cordon', 600, 80, 17, CR.cream);
      // cotiledon maternal evidențiat între 2 septuri (conține 2–3 arbori fetali)
      if (b.i === 3) {
        g.save(); g.fillStyle = 'rgba(255,227,110,.16)'; g.fillRect(342, top + 40, 286, base - top - 40); g.restore();
        hl(g, 342, top + 40, 286, base - top - 40, 0.9);
        txt(g, '1 cotiledon maternal = 2–3 fetale', 760, 120, 19, CR.hi);
      }
      if (b.i === 0) hl(g, 40, top - 30, 920, 70, 0.9);
      if (b.i === 1) hl(g, 40, base, 920, 80, 0.9);
      if (b.i === 2) txt(g, '↑ sânge matern din arterele spiralate', 500, 885, 19, '#ff9a9a');
      // vilozitatea terminală mărită
      if (b.i === 4) {
        g.save(); g.fillStyle = 'rgba(20,12,10,.6)'; g.fillRect(0, 0, 1000, 934); g.restore();
        ell(g, 780, 450, 170, 170, '#f7d8b8', { ow: 7 });
        for (let k = 0; k < 7; k++) { const a = (k / 7) * Math.PI * 2; ell(g, 780 + Math.cos(a) * 128, 450 + Math.sin(a) * 128, 22, 22, k % 2 ? '#c84a4a' : '#d86a6a', { ow: 4 }); }
        txt(g, 'vasele fetale\nla PERIFERIE\n→ schimbul\ngazos', 780, 450, 18, OUT, { stroke: false });
        txt(g, '~50 µ · suprafață > 10 m²', 780, 660, 19, CR.hi);
      }
    },
  };
}

/* =========================================================== 6. FORMELE PLACENTEI · PREVIA · INVAZIA
   Ce trebuie să se vadă: sus formele (discoidală normală, succenturiată, bilobată, circumvalată); stânga-jos placenta previa față de
   orificiul cervical intern (marginală, laterală, centrală); dreapta-jos 4 coloane de perete (normal / acreta / increta / percreta):
   cât de adânc ajung vilozitățile (decidua → miometru → seroasă). */
export function placInv() {
  return {
    home: HOME, cams: [cam(500, 170, 1.45), cam(260, 600, 1.35), cam(740, 600, 1.3)],
    anchors: [[110, 110], [90, 470], [560, 470]],
    phase: (i) => ['formele placentei', 'placenta previa', 'acreta · increta · percreta'][i] || 'forme · localizare · invazie',
    draw(g, t, b) {
      bg(g);
      panel(g, 14, 40, 972, 270); panel(g, 14, 330, 480, 580); panel(g, 506, 330, 480, 580);
      [[14, 40, 972, 270], [14, 330, 480, 580], [506, 330, 480, 580]].forEach((r, k) => hl(g, ...r, b.i === k ? 0.85 : 0));
      // forme
      const disc = (x, y, rx, ry) => ell(g, x, y, rx, ry, '#b8434d', { ow: 5 });
      disc(170, 160, 80, 70); txt(g, 'discoidală\n= normală', 170, 270, 15, CR.ok);
      disc(400, 160, 75, 65); disc(490, 110, 28, 24); tube(g, [[470, 125], [440, 140]], 4, CR.vein, { ow: 2 }); txt(g, 'succenturiată', 420, 270, 15, CR.cream);
      disc(640, 160, 55, 60); disc(740, 160, 55, 60); txt(g, 'bilobată', 690, 270, 15, CR.cream);
      disc(880, 160, 70, 66); g.save(); g.strokeStyle = '#f6efd6'; g.lineWidth = 12; g.beginPath(); g.ellipse(880, 160, 48, 44, 0, 0, 7); g.stroke(); g.restore(); txt(g, 'circumvalată', 880, 270, 15, CR.cream);
      // previa: 3 uteri mici
      const ut = (x, y, kind, lab) => {
        ell(g, x, y, 62, 92, '#c0566a', { ow: 5 }); ell(g, x, y + 8, 46, 76, '#4a1f2a', { ow: 0 });
        tube(g, [[x, y + 80], [x, y + 120]], 16, '#c0566a', { ow: 5 });
        const py = kind === 0 ? y + 40 : kind === 1 ? y + 60 : y + 76; const pw = kind === 2 ? 40 : 32;
        ell(g, kind === 2 ? x : x - 22, py, pw, 16, '#ffb347', { ow: 3, rot: kind === 2 ? 0 : 0.5 });
        dot(g, x, y + 84, 6, '#ffe36e', { ow: 2 });
        txt(g, lab, x, y + 160, 16, CR.cream);
      };
      ut(100, 520, 0, 'marginală'); ut(250, 520, 1, 'laterală'); ut(400, 520, 2, 'centrală');
      txt(g, '● orificiul cervical intern', 250, 760, 15, CR.hi, { w: 700 });
      txt(g, 'aproape · parțial · complet acoperit', 250, 810, 15, CR.dim, { w: 600 });
      // invazia: 4 coloane
      const L = [['decidua', '#e9a3b0', 70], ['miometru', '#c0566a', 260], ['seroasă', '#f3e4d0', 30]];
      const col = (x, depth, lab) => {
        let y = 420; L.forEach(([n, c, h]) => { rr(g, x - 46, y, 92, h, 0, (n === 'decidua' && depth > 0) ? '#3a1a22' : c, { ow: 3 }); y += h; });
        const reach = [460, 510, 690, 790][depth];
        for (let k = -1; k <= 1; k++) tube(g, [[x + k * 22, 390], [x + k * 22 + 6, reach]], 9, '#ffb347', { ow: 3 });
        txt(g, lab, x, 830, 16, depth === 0 ? CR.ok : CR.cream);
      };
      col(570, 0, 'normal'); col(675, 1, 'acreta'); col(780, 2, 'increta'); col(885, 3, 'percreta');
      txt(g, 'decidua', 540, 390, 13, '#ffd0da', { w: 700 });
      txt(g, 'lipsește decidua bazală', 730, 870, 14, CR.dim, { w: 600 });
    },
  };
}

/* =========================================================== 7. TRANSPOZIȚIA + VASELE MARI
   Ce trebuie să se vadă: inima normală (aorta din VS, trunchiul pulmonar din VD, încrucișate) vs transpoziția (aorta anterior și la
   dreapta din VD, pulmonara din VS, paralele) cu DSA + canal arterial; apoi coarctația (îngustare pre-/postductală) și arcul aortic
   dublu (inel în jurul traheei și esofagului). */
function heart(g, x, y, tmv) {
  const vd = new Path2D(); vd.moveTo(x - 90, y - 40); vd.bezierCurveTo(x - 110, y + 60, x - 40, y + 130, x + 10, y + 150); vd.lineTo(x + 5, y - 40); vd.closePath();
  const vs = new Path2D(); vs.moveTo(x + 5, y - 40); vs.lineTo(x + 10, y + 150); vs.bezierCurveTo(x + 70, y + 110, x + 110, y + 40, x + 90, y - 40); vs.closePath();
  g.save(); g.fillStyle = '#6f8fe6'; g.fill(vd); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(vd); g.fillStyle = '#e0565a'; g.fill(vs); g.stroke(vs); g.restore();
  txt(g, 'VD', x - 45, y + 50, 22, OUT, { stroke: false }); txt(g, 'VS', x + 50, y + 50, 22, OUT, { stroke: false });
  if (!tmv) { // aorta din VS urcă în spate și arcuiește; pulmonara din VD trece în față → se încrucișează
    tube(g, [[x + 40, y - 40], [x + 10, y - 120], [x - 50, y - 170], [x - 120, y - 150]], 26, '#e0443e', { ow: 6 });
    tube(g, [[x - 40, y - 40], [x - 10, y - 110], [x + 60, y - 150]], 26, '#5b7fe0', { ow: 6 });
  } else { // paralele: aorta din VD, anterior + dreapta
    tube(g, [[x - 45, y - 40], [x - 55, y - 130], [x - 80, y - 180]], 26, '#e0443e', { ow: 6 });
    tube(g, [[x + 45, y - 40], [x + 55, y - 130], [x + 80, y - 175]], 26, '#5b7fe0', { ow: 6 });
  }
}
export function tmvS() {
  return {
    home: HOME, cams: [cam(500, 300, 1.15), cam(720, 300, 1.4), cam(270, 720, 1.5), cam(740, 720, 1.5)],
    anchors: [[690, 330], [740, 140], [180, 680], [640, 640]],
    phase: (i) => ['transpoziția marilor vase', 'DSA + canal arterial', 'coarctația de aortă', 'arcul aortic dublu'][i] || 'normal vs transpoziție',
    draw(g, t, b) {
      bg(g); panel(g, 14, 40, 972, 470); panel(g, 14, 530, 480, 380); panel(g, 506, 530, 480, 380);
      heart(g, 250, 290, false); heart(g, 740, 290, true);
      txt(g, 'NORMAL: aorta din VS', 250, 480, 18, CR.ok); txt(g, 'TRANSPOZIȚIE: aorta din VD', 740, 480, 18, CR.hi);
      txt(g, 'aorta', 645, 100, 15, '#ff9a9a', { w: 700 }); txt(g, 'pulmonara', 840, 100, 15, '#a9c2ff', { w: 700 });
      if (b.i === 1 || b.i < 0) { dot(g, 740, 230, 12, '#ffe36e', { ow: 3 }); txt(g, 'DSA', 740, 200, 15, CR.hi); tube(g, [[675, 140], [740, 130], [810, 140]], 7, '#c79bff', { ow: 3 }); txt(g, 'canal arterial', 740, 165, 14, '#e2c8ff', { w: 700 }); }
      // coarctație
      tube(g, [[100, 820], [120, 650], [250, 610], [380, 650], [400, 860]], 30, '#e0443e', { ow: 6 });
      ell(g, 330, 628, 16, 10, '#1a1015', { ow: 0, rot: 0.4 }); txt(g, 'îngustare', 430, 585, 14, CR.hi, { w: 700 }); lead(g, 400, 592, 345, 620);
      tube(g, [[300, 620], [300, 700]], 10, '#c79bff', { ow: 3 }); txt(g, 'canal\narterial', 250, 730, 14, '#e2c8ff', { w: 700 });
      txt(g, 'pre- sau postductală', 250, 880, 16, CR.cream);
      // arc dublu
      ell(g, 740, 700, 110, 90, 'rgba(0,0,0,0)', { dash: [1, 0], sc: OUT, ow: 30 }); ell(g, 740, 700, 110, 90, 'rgba(0,0,0,0)', { dash: [1, 0], sc: '#e0443e', ow: 20 });
      tube(g, [[720, 580], [720, 860]], 26, '#cfe0ee', { ow: 5 }); tube(g, [[770, 580], [770, 860]], 22, '#e8b07a', { ow: 5 });
      txt(g, 'trahee', 650, 880, 14, '#cfe0ee', { w: 700 }); txt(g, 'esofag', 840, 880, 14, '#ffd3a8', { w: 700 });
      txt(g, 'comprimă', 740, 560, 15, CR.hi);
      if (on(b, 2)) ring(g, 330, 628, 40, 30, ease(b.bt));
    },
  };
}

/* =========================================================== 8. HIRSCHSPRUNG + FISTULELE ANORECTALE
   Ce trebuie să se vadă (anim): colonul orizontal, proximal stânga → rect/anus dreapta. Pe 0, celulele crestei neurale (verzi)
   migrează în perete de la stânga la dreapta și se OPRESC la ~60%: ultimul segment (sigmoid + rect) rămâne fără ganglioni.
   Pe 1, o undă peristaltică merge stânga → dreapta și se stinge la granița segmentului aganglionar. Pe 2, colonul de DEASUPRA
   se dilată (megacolon), segmentul aganglionar rămâne îngust. Pe 3, fistulele din anusul imperforat: rectovaginală (F),
   rectovezicală (deasupra prostatei), rectouretrală (sub prostată). */
export function hirsch() {
  const X0 = 80, X1 = 920, XB = 600, Y = 330;
  return {
    home: HOME, cams: [cam(500, 330, 1.2), cam(500, 330, 1.2), cam(500, 330, 1.2), cam(500, 730, 1.35)],
    anchors: [[XB, 230], [440, 230], [250, 210], [500, 600]],
    phase: (i) => ['creasta neurală nu ajunge', 'fără ganglioni = fără peristaltică', 'se dilată colonul de deasupra', 'fistulele din anusul imperforat'][i] || 'aganglionoza parțială',
    draw(g, t, b) {
      bg(g); panel(g, 14, 120, 972, 420); panel(g, 14, 560, 972, 350);
      const p = P(b, t, 3);
      const dil = b.i < 0 ? p(2) : b.i >= 2 ? (b.i === 2 ? p(2) : 1) : 0;
      // grosimea pe x: proximal se dilată, distal îngust
      const half = (x) => (x < XB ? 52 + 46 * dil * clamp((XB - x) / 120) : 40);
      const top = []; const bot = [];
      for (let x = X0; x <= X1; x += 10) { top.push([x, Y - half(x)]); bot.push([x, Y + half(x)]); }
      const body = new Path2D(); body.moveTo(...top[0]); top.forEach((q) => body.lineTo(...q)); bot.reverse().forEach((q) => body.lineTo(...q)); body.closePath();
      g.save(); g.fillStyle = '#e88a7a'; g.fill(body); g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(body); g.restore();
      // lumen
      g.save(); g.strokeStyle = '#7a2f3a'; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(X0 + 10, Y); g.lineTo(X1 - 10, Y); g.stroke(); g.restore();
      // segmentul aganglionar marcat
      g.save(); g.setLineDash([8, 8]); g.strokeStyle = '#ffe36e'; g.lineWidth = 3; g.beginPath(); g.moveTo(XB, Y - 110); g.lineTo(XB, Y + 110); g.stroke(); g.restore();
      txt(g, 'proximal', 140, 170, 17, CR.cream); txt(g, 'sigmoid + rect\n(fără ganglioni)', 770, 190, 17, CR.hi); txt(g, 'anus', 930, 420, 15, CR.cream);
      // ganglionii (Auerbach + Meissner) — migrează stânga → dreapta, se opresc la XB
      const reach = b.i < 0 ? lerp(X0, XB, p(0)) : b.i === 0 ? lerp(X0, XB, p(0)) : XB;
      for (let x = X0 + 30; x < XB - 10; x += 46) {
        if (x > reach) continue;
        const h = half(x);
        dot(g, x, Y - h + 14, 8, '#5fd38a', { ow: 2.5 }); dot(g, x + 22, Y + h - 14, 8, '#5fd38a', { ow: 2.5 });
        dot(g, x + 10, Y - h * 0.5, 5.5, '#9ef0b8', { ow: 2 });
      }
      if (b.i === 0 || b.i < 0) { // celule în mers pe front
        for (let k = 0; k < 4; k++) { const xx = reach - 20 - k * 18 + (REDUCED ? 0 : Math.sin(t * 4 + k) * 4); dot(g, xx, Y - 70 + k * 40, 7, '#5fd38a', { ow: 2.5, alpha: b.i === 0 && p(0) >= 1 ? 0.4 : 1 }); }
        txt(g, 'celulele crestei neurale', 300, 470, 17, '#9ef0b8');
      }
      // unda peristaltică (beat 1): inel care merge și se stinge la XB
      if (b.i === 1) {
        const u = REDUCED ? 0.6 : (t * 0.35) % 1; const xx = lerp(X0 + 30, XB + 60, u); const a = xx < XB ? 1 : clamp(1 - (xx - XB) / 60);
        g.save(); g.globalAlpha = a; g.strokeStyle = '#ffe36e'; g.lineWidth = 9; g.beginPath(); g.moveTo(xx, Y - half(xx) - 8); g.lineTo(xx, Y + half(xx) + 8); g.stroke(); g.restore();
        arr(g, xx - 70, Y - 80, xx - 10, Y - 80, '#ffe36e', 5, a);
        txt(g, 'unda se oprește aici', XB, 470, 17, CR.hi);
      }
      if (b.i === 2) txt(g, 'MEGACOLON: se dilată segmentul DE DEASUPRA', 380, 470, 18, CR.hi);
      // fistulele
      const fx = [180, 500, 820];
      const lab = ['rectovaginală /\nrectovestibulară (F)', 'rectovezicală:\ndeasupra prostatei (M)', 'rectouretrală:\nsub prostată (M)'];
      fx.forEach((x, k) => {
        tube(g, [[x + 40, 620], [x + 40, 760]], 34, '#e88a7a', { ow: 5 }); // rectul, închis jos (imperforat)
        ell(g, x - 50, 650, 40, 34, k === 0 ? '#e9a3b0' : '#f4c34f', { ow: 4 }); // vezica / vagin
        if (k === 0) tube(g, [[x - 50, 690], [x - 50, 800]], 18, '#e9a3b0', { ow: 4 });
        if (k > 0) { ell(g, x - 40, 730, 24, 18, '#c79bff', { ow: 3 }); tube(g, [[x - 40, 750], [x - 40, 820]], 10, '#f4c34f', { ow: 3 }); }
        const ty = k === 0 ? 730 : k === 1 ? 660 : 790; const tx = k === 0 ? x - 30 : k === 1 ? x - 18 : x - 32;
        tube(g, [[x + 22, ty], [tx, ty]], 6, '#ffe36e', { ow: 3 });
        txt(g, lab[k], x, 870, 15, CR.cream, { w: 700 });
      });
      txt(g, 'prostata', 385, 730, 13, '#e2c8ff', { w: 700 });
    },
  };
}

/* =========================================================== 9. CREASTA MAMARĂ
   Ce trebuie să se vadă: trunchiul din față, cu linia mamară de la rădăcina membrului superior (axilă) la cea a membrului inferior
   (regiunea inghinală); persistă doar în zona pectorală; pe 1 apar mameloane / glande în plus pe linie (axilar, inghinal);
   pe 2, lipsa glandei / a mamelonului. */
export function mamma() {
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[330, 210], [300, 560], [700, 330]],
    phase: (i) => ['creasta mamară', 'politelie · polimastie', 'amastie · atelie · ginecomastie'][i] || 'linia mamară',
    draw(g, t, b) {
      bg(g);
      const tr = new Path2D(); tr.moveTo(330, 120); tr.bezierCurveTo(300, 120, 250, 160, 240, 230); tr.lineTo(250, 520); tr.bezierCurveTo(250, 640, 300, 760, 330, 820); tr.lineTo(670, 820); tr.bezierCurveTo(700, 760, 750, 640, 750, 520); tr.lineTo(760, 230); tr.bezierCurveTo(750, 160, 700, 120, 670, 120); tr.closePath();
      g.save(); g.fillStyle = '#f3c29b'; g.fill(tr); g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(tr); g.restore();
      tube(g, [[250, 230], [140, 420]], 70, '#f3c29b', { ow: 7 }); tube(g, [[750, 230], [860, 420]], 70, '#f3c29b', { ow: 7 });
      tube(g, [[360, 810], [340, 900]], 90, '#f3c29b', { ow: 7 }); tube(g, [[640, 810], [660, 900]], 90, '#f3c29b', { ow: 7 });
      const line = (s) => [[275, 230], [330, 340], [345, 520], [355, 700], [380, 800]].map(([x, y]) => [s ? 1000 - x : x, y]);
      [0, 1].forEach((s) => tube(g, line(s), 6, '#ff9ccf', { ow: 0, dash: [10, 10], alpha: 0.95 }));
      [330, 670].forEach((x) => { if (b.i === 2 && x === 670) { ell(g, x, 340, 22, 18, '#e3a07a', { ow: 3, dash: [6, 6], sc: '#fff3e6' }); return; } ell(g, x, 340, 22, 18, '#c97a5a', { ow: 4 }); });
      txt(g, 'linia mamară', 180, 600, 17, '#ffc4e2');
      txt(g, 'persistă doar pectoral', 500, 250, 17, CR.cream);
      if (b.i >= 1 || b.i < 0) { [[300, 250], [345, 560], [362, 720], [700, 560]].forEach(([x, y]) => ell(g, x, y, 10, 8, '#c97a5a', { ow: 3 })); }
      if (b.i === 1) { txt(g, 'axilar', 350, 252, 15, CR.hi); txt(g, 'inghinal', 440, 720, 15, CR.hi); }
      if (b.i === 2) txt(g, 'amastia: se vede la pubertate', 555, 300, 16, CR.hi);
      txt(g, 'identică la ambele sexe intrauterin', 500, 870, 16, CR.dim, { w: 600 });
    },
  };
}

/* =========================================================== COPERTA: 7 miniaturi vii (câte o scenă din fiecare curs)
   Ce trebuie să se vadă: o grilă 2 × 4 cu Cursurile 1–7 + caseta „UNIX · Full Match”; pe punctul k se aprinde cursul k. */
export const TILES = [
  ['1 · Reproducerea', 'l1.gameto'], ['2 · Anexele fetale', 'cu.placS'], ['3 · Cardiovascular', 'l4.fallot'], ['4 · Digestiv', 'l3.gutMap'],
  ['5 · Urogenital', 'l5.kidney3'], ['6 · Sistemul nervos', 'l6.closure'], ['7 · Simțuri, piele', 'l6.eye'],
];
export function makeCover7(POOL) {
  return function cover({ spec } = {}) {
    const map = (spec && spec.sceneOpts && spec.sceneOpts.map) || null; // tabel: rândul → cursul (0–6)
    const which = (i) => (i < 0 ? -1 : map ? map[i] : i);
    const built = {}; const get = (n) => (built[n] = built[n] || POOL[n]({ spec: {} }));
    const TW = 450, TH = 196, X = [258, 742], Y = [140, 360, 580, 800];
    const pos = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => [X[k % 2], Y[Math.floor(k / 2)]]);
    return {
      home: HOME,
      cams: (map || TILES.map((_, k) => k)).map((k) => cam(pos[k][0] * 0.4 + 300, pos[k][1] * 0.4 + 280, 1.25)),
      anchors: map ? [] : TILES.map((_, k) => [pos[k][0] - TW / 2 + 22, pos[k][1] - TH / 2 + 22]),
      phase: (i) => { const w = which(i); return w >= 0 && TILES[w] ? 'Cursul ' + TILES[w][0] : '7 cursuri · UNIX'; },
      draw(g, t, b) {
        bg(g);
        const w = which(b.i);
        TILES.forEach(([lab, n], k) => {
          const [x, y] = pos[k]; const act = w < 0 || w === k;
          g.save(); g.beginPath(); g.roundRect(x - TW / 2, y - TH / 2, TW, TH, 20); g.clip();
          g.translate(x - TW / 2, y - TH / 2); g.scale(TW / 1000, TW / 1000);
          g.translate(0, -(934 - TH * 1000 / TW) / 2);
          try { get(n).draw(g, REDUCED ? 3 : t + k * 1.7, { i: -1, bt: t, bd: 7, k: 0 }); } catch (e) { /* decor */ }
          g.restore();
          g.save(); g.globalAlpha = act ? 0 : 0.55; g.fillStyle = '#140c0a'; g.beginPath(); g.roundRect(x - TW / 2, y - TH / 2, TW, TH, 20); g.fill(); g.restore();
          g.save(); g.strokeStyle = w === k ? '#ffe36e' : 'rgba(255,220,200,.35)'; g.lineWidth = w === k ? 6 : 3; g.beginPath(); g.roundRect(x - TW / 2, y - TH / 2, TW, TH, 20); g.stroke(); g.restore();
          pill(g, x, y + TH / 2 - 24, 300, 36, w === k ? '#ffe36e' : '#f3d9c6', lab, { size: 17, ow: 4 });
        });
        const [x, y] = pos[7];
        rr(g, x - TW / 2, y - TH / 2, TW, TH, 20, 'rgba(255,240,228,.06)', { sc: 'rgba(255,220,200,.35)', ow: 3 });
        txt(g, 'UNIX · Full Match', x, y - 30, 26, CR.hi);
        txt(g, '5 variante · 2–4 corecte\nsau complement simplu', x, y + 30, 17, CR.cream, { w: 700 });
      },
    };
  };
}
