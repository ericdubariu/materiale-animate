// Partea C (venele, circulația fetală) + Partea D (malformațiile, cazul).
// Vedere frontală: dreapta pacientului = STÂNGA ecranului. ROȘU = oxigenat, ALBASTRU = neoxigenat, VIOLET = amestecat.
// Regula fluxului pe toate scenele: particulele merg spre inimă în vene, dinspre inimă în artere; prin orice gaură de la presiune mare la mică.
import {
  W, H, cam, HOME, C, B, H4, heart4, bloodKey, bodyIcon, pipe, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring,
  OUT, clamp, lerp, ease, paint, REDUCED, photo,
} from './ek.js';

const st = (b, k, f = 0.6) => (b.i < 0 ? 1 : b.i > k ? 1 : b.i < k ? 0 : ease(clamp(b.bt / (b.bd * f))));

/* =================================================== 3 SETURI DE VENE (S5)
   Sinusul venos sus, cu cornul drept în STÂNGA ecranului și cornul stâng în dreapta. În fiecare corn intră:
   - lateral: cardinala comună = cardinala anterioară (vine de SUS) + cardinala posterioară (vine de JOS) — neoxigenat (albastru);
   - mijloc: vena ombilicală (vine de jos, de la placentă) — OXIGENAT (roșu);
   - medial: vena vitelină (vine de jos, din sacul vitelin, prin septul transvers) — neoxigenat.
   Particulele merg toate SPRE sinusul venos. Punctul 4: venele din stânga (dreapta ecranului) se sting, sângele trece spre dreapta,
   cornul stâng se micșorează (→ sinusul coronar), cornul drept crește. */
export function veins3() {
  const SY = 170; const HR = 330, HL = 670; // cornul drept (stânga ecranului), cornul stâng
  const side = [[-1, HR], [1, HL]];
  const CARD = (s, x) => ({ ant: [[x + s * 290, 90], [x + s * 290, 230], [x + s * 220, 230], [x + s * 70, SY + 10]], post: [[x + s * 290, 820], [x + s * 290, 230]] });
  const UMB = (s, x) => [[x + s * 210, 840], [x + s * 200, 330], [x + s * 140, 230], [x + s * 40, SY + 20]];
  const VIT = (s, x) => [[500 + s * 20, 760], [x + s * -60, 420], [x - s * 20, 250], [x, SY + 24]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[420, 560], [HL + 250, 600], [HL + 290, 380], [500, 120]],
    phase: (i) => ['venele viteline', 'venele ombilicale', 'venele cardinale comune', 'remodelarea spre dreapta'][i] || 'S5: 3 perechi de vene',
    draw(g, t, b) {
      bg(g);
      const rem = st(b, 3) * (b.i < 0 ? (0.5 - 0.5 * Math.cos(t * 0.5)) : 1); // intro: remodelarea se face și se desface lent
      // septul transvers (ficatul crește aici)
      g.save(); g.fillStyle = 'rgba(244,195,79,.18)'; g.fillRect(60, 400, 880, 90); g.restore(); txt(g, 'septul transvers (→ ficat)', 500, 445, 17, '#ffe9a8');
      ell(g, 500, 800, 66, 50, '#f4c34f', { ow: 5 }); txt(g, 'sac vitelin', 500, 800, 15, OUT, { stroke: false });
      txt(g, '← dreapta embrionului', 150, 905, 16, C.cream);
      const dim = (k) => (b.i < 0 || b.i === k || b.i === 3 ? 1 : 0.4);
      side.forEach(([s, x]) => {
        const fade = s > 0 ? rem : 0; // venele din stânga (dreapta ecranului) se închid / își trimit sângele spre dreapta
        const a = (k) => dim(k) * (1 - 0.7 * fade);
        const cd = CARD(s, x);
        // cardinalele
        const ant = tube(g, cd.ant, 26, B.dx, { ow: 5, alpha: a(2), glow: b.i === 2 ? 0.5 : 0 });
        const post = tube(g, cd.post, 26, B.dx, { ow: 5, alpha: a(2), glow: b.i === 2 ? 0.5 : 0 });
        flow(g, ant, t, B.dxL, 4, 0.2, 6, { alpha: a(2) }); flow(g, [...cd.post, ...cd.ant.slice(2)], t, B.dxL, 7, 0.14, 6, { alpha: a(2) });
        // ombilicala (oxigenat). EXCEPȚIE (manual): la remodelare dispare cea DREAPTĂ; cea stângă rămâne, dar se varsă în ficat (→ ductul venos → VCI).
        const ua = dim(1) * (s < 0 ? 1 - 0.8 * rem : 1); const uu = s > 0 ? 1 - 0.45 * rem : 1;
        const um = tube(g, UMB(s, x), 22, B.ox, { ow: 5, alpha: ua, u1: uu, glow: b.i === 1 ? 0.6 : 0 }); flow(g, um, t, B.oxL, 5, 0.18, 6, { alpha: ua, u1: uu });
        // vitelina
        const vi = tube(g, VIT(s, x), 18, '#3d5fae', { ow: 5, alpha: a(0), glow: b.i === 0 ? 0.6 : 0 }); flow(g, vi, t, B.dxL, 5, 0.18, 5, { alpha: a(0) });
      });
      // remodelarea: sângele din stânga trece spre dreapta (dreapta ecranului → stânga ecranului)
      if (rem > 0.05) { const P2 = [[HL + 120, 280], [500, 300], [HR + 60, 260]]; tube(g, P2, 20, B.dx, { ow: 5, alpha: rem }); flow(g, P2, t, B.dxL, 4, 0.25, 6, { alpha: rem }); }
      // sinusul venos cu cele 2 coarne
      const rw = lerp(150, 190, rem), lw = lerp(150, 70, rem);
      ell(g, HR + 20, SY, rw, 62, '#d9c8f2', { ow: 6 }); ell(g, HL - 20 + (150 - lw) * 0.6, SY, lw, lerp(62, 40, rem), '#d9c8f2', { ow: 6 });
      txt(g, 'corn drept', HR, SY, 19, OUT, { stroke: false }); txt(g, rem > 0.6 ? '→ sinus\ncoronar' : 'corn stâng', HL - 20 + (150 - lw) * 0.6, SY, rem > 0.6 ? 15 : 19, OUT, { stroke: false });
      txt(g, 'sinusul venos', 500, 82, 20, '#e3d6ff');
      // etichete
      txt(g, 'cardinală anterioară', 60, 70, 15, '#c9d8ff', { align: 'left', alpha: dim(2) }); txt(g, 'cardinală posterioară', 60, 860, 15, '#c9d8ff', { align: 'left', alpha: dim(2) });
      txt(g, 'ombilicală\n(de la placentă)', HL + 210, 880, 15, '#ffd0cc', { alpha: dim(1) }); txt(g, 'viteline', 500, 700, 16, '#c9d8ff', { alpha: dim(0) });
      if (b.i === 3) { txt(g, 'drenajul se mută spre dreapta → atriul drept', 500, 920, 19, C.hi); txt(g, 'excepție (manual): v. ombilicală stg.\nrămâne și se varsă în ficat', HL + 150, 560, 15, '#ffd0cc', { alpha: rem, align: 'right' }); }
    },
  };
}

/* =================================================== CARDINALELE + SISTEMUL AZYGOS
   Sus: cardinala anterioară dreaptă (stânga ecranului) și stângă coboară spre cardinalele comune → sinusul venos / AD.
   1. vena subclavie intră în cardinala anterioară. 2. apare anastomoza oblică dinspre stânga (dreapta ecranului) spre dreapta → v. brahiocefalică stg.;
   sângele merge pe ea spre dreapta pacientului. 3. VCS = cardinala anterioară dreaptă (sub anastomoză) + cardinala comună dreaptă; cardinala ant. stg.
   sub anastomoză regresează. 4. venele abdomenului (VCI…) urcă din cardinala posterioară (LP).
   Jos: 5. două linii azygos cu vene intercostale; dreapta → v. azygos (urcă spre VCS); stânga se rupe în hemiazygos (jos) și hemiazygos accesorie (sus),
   care trec linia mediană și se varsă în azygos. Particulele urcă spre inimă. */
export function cardinals() {
  const RX = 360, LX = 640; // cardinala dreaptă (stânga ecranului), stângă
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[RX - 150, 195], [500, 150], [RX - 50, 300], [RX + 70, 470], [500, 560]],
    phase: (i) => ['v. subclavie → cardinala ant.', 'anastomoza → brahiocefalica stg.', 'VCS = 2 părți', 'venele abdomenului', 'sistemul azygos'][i] || 'totul se mută spre dreapta',
    draw(g, t, b) {
      bg(g);
      panel(g, 14, 30, 972, 500); panel(g, 14, 545, 972, 375);
      const s0 = st(b, 0), s1 = st(b, 1), s2 = st(b, 2), s3 = st(b, 3), s4 = st(b, 4, 0.7);
      // ---------- sus: cardinalele
      ell(g, 500, 400, 120, 40, '#d9c8f2', { ow: 5, alpha: 1 - s2 * 0.5 }); txt(g, s2 > 0.5 ? 'AD' : 'sinus venos', 500, 400, 17, OUT, { stroke: false });
      // cardinalele comune (orizontale spre sinus) + anterioare (vin de sus)
      const regL = s2; // cardinala ant. stg. sub anastomoză regresează
      const RA = [[RX, 60], [RX, 300], [RX, 400], [400, 400]]; const LA = [[LX, 60], [LX, 220]]; const LAlow = [[LX, 220], [LX, 400], [600, 400]];
      tube(g, RA, 28, B.dx, { ow: 5, glow: b.i === 2 ? 0.7 : 0 });
      tube(g, LA, 28, B.dx, { ow: 5 });
      tube(g, LAlow, 28, B.dx, { ow: 5, alpha: 1 - 0.8 * regL, dash: regL > 0.5 ? [10, 8] : null });
      flow(g, RA, t, B.dxL, 6, 0.16, 6); if (regL < 0.5) flow(g, [...LA, ...LAlow.slice(1)], t, B.dxL, 6, 0.16, 6);
      // 1 · subclaviile
      [[RX, -1], [LX, 1]].forEach(([x, s]) => { const Pp = [[x + s * 280, 150], [x + s * 14, 150]]; tube(g, Pp, 18, B.dx, { ow: 4, glow: b.i === 0 ? 0.7 : 0, alpha: Math.max(0.5, s0) }); flow(g, Pp, t, B.dxL, 3, 0.25, 5, { alpha: Math.max(0.5, s0) }); });
      txt(g, 'v. subclavie', RX - 160, 120, 16, '#c9d8ff');
      // 2 · anastomoza (dinspre stânga pacientului spre dreapta)
      if (s1 > 0) { const An = [[LX, 200], [RX, 290]]; tube(g, An, 22, B.dx, { ow: 5, u1: s1, glow: b.i === 1 ? 0.7 : 0 }); if (s1 > 0.6) flow(g, An, t, B.dxL, 4, 0.25, 6); if (s1 > 0.6) txt(g, 'v. brahiocefalică stg.', 560, 300, 16, C.hi, { align: 'left' }); }
      // 3 · VCS
      if (s2 > 0.3) { g.save(); g.globalAlpha = (s2 - 0.3) / 0.7; g.strokeStyle = C.hi; g.lineWidth = 4; g.setLineDash([8, 6]); g.strokeRect(RX - 30, 285, 70, 130); g.restore(); txt(g, 'VCS', RX - 60, 350, 24, C.hi, { align: 'right', alpha: (s2 - 0.3) / 0.7 }); }
      // 4 · venele abdomenului urcă (din cardinala posterioară)
      if (s3 > 0) { const Pv = [[RX + 120, 520], [RX + 120, 450], [440, 425]]; tube(g, Pv, 26, B.dx, { ow: 5, u1: s3, glow: b.i === 3 ? 0.7 : 0 }); flow(g, Pv, t, B.dxL, 3, 0.2, 6, { u1: s3 }); if (s3 > 0.6) txt(g, 'venele abdomenului\n(VCI, renale, gonadale)\nLP: din cardinala post.', RX + 150, 480, 15, '#c9d8ff', { align: 'left' }); }
      // ---------- jos: azygos
      const AY0 = 600, AY1 = 900; const ZR = 420, ZL = 580;
      const sp = s4; // 0 = două linii, 1 = azygos + hemiazygos
      txt(g, 'VCS ←', ZR - 80, AY0, 18, C.cream);
      const Rl = [[ZR, AY1], [ZR, AY0 + 10], [ZR - 40, AY0]];
      tube(g, Rl, 24, B.dx, { ow: 5, glow: b.i === 4 ? 0.5 : 0 }); flow(g, Rl, t, B.dxL, 6, 0.14, 6);
      const gapY = 760;
      if (sp < 0.5) { const Ll = [[ZL, AY1], [ZL, AY0 + 10], [ZL + 40, AY0]]; tube(g, Ll, 24, B.dx, { ow: 5, alpha: 1 - sp }); flow(g, Ll, t, B.dxL, 6, 0.14, 6, { alpha: 1 - sp * 2 }); txt(g, 'spre cardinala\nposterioară', ZL + 120, AY0, 15, C.cream, { alpha: 1 - sp * 2 }); }
      else {
        const a = (sp - 0.5) / 0.5;
        const Hz = [[ZL, AY1], [ZL, gapY + 30], [ZR + 10, gapY + 60]]; const Ha = [[ZL, AY0 + 30], [ZL, gapY - 30], [ZR + 10, gapY - 60]];
        tube(g, Hz, 22, B.dx, { ow: 5, alpha: a }); tube(g, Ha, 22, B.dx, { ow: 5, alpha: a });
        flow(g, Hz, t, B.dxL, 4, 0.2, 5, { alpha: a }); flow(g, Ha, t, B.dxL, 3, 0.2, 5, { alpha: a });
        txt(g, 'hemiazygos', ZL + 140, 860, 17, '#c9d8ff', { align: 'left', alpha: a }); txt(g, 'hemiazygos accesorie', ZL + 140, 640, 17, '#c9d8ff', { align: 'left', alpha: a });
        txt(g, 'azygos', ZR + 22, 662, 19, C.hi, { align: 'left', alpha: a });
      }
      // venele intercostale
      for (let k = 0; k < 6; k++) { const y = 640 + k * 45; tube(g, [[ZR - 120, y + 10], [ZR - 12, y]], 7, '#6f8fe0', { ow: 3 }); tube(g, [[ZL + 120, y + 10], [ZL + 12, y]], 7, '#6f8fe0', { ow: 3, alpha: sp > 0.5 && y > gapY - 30 && y < gapY + 30 ? 0.3 : 1 }); }
      txt(g, 'vv. intercostale', 180, 900, 15, '#c9d8ff');
    },
  };
}

/* =================================================== CIRCULAȚIA FETALĂ (+ variantă „la naștere”)
   Trasee (vedere frontală, dreapta pacientului = stânga ecranului), particulele merg în sensul real:
   placenta → v. ombilicală (ROȘU) → ficat → ductul venos ocolește ficatul → VCI (roșu-violet) → AD → foramen ovale → AS → VS → aorta ascendentă (roșu-violet, spre cap)
   VCS (albastru) → AD → VD → trunchiul pulmonar (albastru) → puțin spre plămâni, restul prin canalul arterial → aorta descendentă (violet)
   aorta descendentă → aa. iliace interne → arterele ombilicale (albastru) → placenta.
   La naștere (closed[k] 0..1): 0 v. ombilicală → lig. rotund; 1 ductul venos → lig. venos; 2 foramen ovale → fosa ovală; 3 canalul arterial → lig. arterial; 4 arterele ombilicale → lig. ombilicale mediale.
   După naștere plămânii primesc tot debitul VD și venele pulmonare (roșu) duc sângele în AS. */
const FG = {
  RA: [390, 270, 140, 130], LA: [540, 270, 140, 130], RV: [390, 410, 140, 150], LV: [540, 410, 140, 150],
  UV: [[150, 850], [280, 880], [420, 820], [480, 730]],
  DV: [[480, 730], [430, 690], [370, 640]],
  IVC: [[370, 640], [350, 520], [350, 360], [395, 330]],
  SVC: [[440, 40], [440, 200], [440, 280]],
  FO: [[470, 335], [560, 320]],
  LAtoLV: [[610, 330], [610, 480]],
  AO: [[670, 500], [730, 500], [730, 120], [800, 80], [860, 140], [860, 760]],
  RVout: [[460, 480], [460, 380], [300, 380], [300, 150], [600, 150]],
  RAtoRV: [[440, 330], [440, 480]],
  PA: [[520, 150], [520, 90]],
  DA: [[600, 150], [700, 170], [860, 230]],
  IL: [[860, 760], [800, 840], [620, 900], [320, 905], [180, 880]],
  PV: [[560, 70], [600, 160], [640, 280]],
};
function fetalScene(g, t, o) {
  const cl = o.closed || [0, 0, 0, 0, 0]; const hi = o.hi ?? -1; const lungs = o.lungs || 0;
  const LIG = B.lig;
  const mix = (a, b2, u) => { const A = parseInt(a.slice(1), 16), Bc = parseInt(b2.slice(1), 16); const r = Math.round(lerp(A >> 16, Bc >> 16, u)), gg = Math.round(lerp((A >> 8) & 255, (Bc >> 8) & 255, u)), bl = Math.round(lerp(A & 255, Bc & 255, u)); return `rgb(${r},${gg},${bl})`; };
  const shunt = Math.min(1 - cl[2], 1 - cl[3]);
  const aoC = mix('#c0457a', B.ox, 1 - shunt); const descC = mix(B.mx, B.ox, 1 - shunt); const ivcC = mix('#c0457a', B.dx, cl[0]);
  // placenta
  ell(g, 120, 870, 80, 50, '#e8a0b8', { ow: 5, alpha: 1 - 0.6 * cl[0] }); txt(g, 'placenta', 120, 870, 16, OUT, { stroke: false, alpha: 1 - 0.6 * cl[0] });
  // ficatul
  ell(g, 470, 690, 150, 70, '#d9a46a', { ow: 5 }); txt(g, 'ficat', 560, 700, 17, OUT, { stroke: false });
  // plămânii
  ell(g, 560, 50, 120, 34, '#f2b3c4', { ow: 4 }); txt(g, 'plămâni', 560, 50, 16, OUT, { stroke: false });
  // arterele: aorta descendentă + iliace + ombilicale
  const glow = (k) => (hi === k ? 0.85 : 0);
  tube(g, FG.IL, 18, cl[4] > 0.6 ? LIG : B.dx, { raw: true, ow: 5, glow: glow(4) });
  // trunchiul pulmonar + canalul arterial
  tube(g, FG.DA, 20, cl[3] > 0.6 ? LIG : B.dx, { ow: 5, glow: glow(3) });
  pipe(g, FG.RVout, 30, B.dx, { ow: 6 });
  tube(g, FG.PA, lerp(12, 26, lungs), B.dx, { ow: 4, cap: 'butt' });
  // venele pulmonare (doar după naștere contează)
  if (lungs > 0.05) { tube(g, FG.PV, 16, B.ox, { ow: 4, alpha: lungs }); }
  // aorta
  pipe(g, FG.AO, 34, aoC, { ow: 6 });
  tube(g, [[860, 300], [860, 760]], 34, descC, { ow: 0, cap: 'butt' });
  // vene
  tube(g, FG.UV, 20, cl[0] > 0.6 ? LIG : B.ox, { ow: 5, glow: glow(0) });
  tube(g, FG.DV, 16, cl[1] > 0.6 ? LIG : B.ox, { ow: 5, glow: glow(1) });
  tube(g, FG.IVC, 26, ivcC, { ow: 5 });
  tube(g, FG.SVC, 26, B.dx, { ow: 5 });
  // inima
  const hb = new Path2D(); hb.roundRect(380, 260, 310, 310, 40); paint(g, hb, B.wall, null, null, [380, 260, 310, 310], OUT, 6);
  const room = (r, f) => { const [x, y, w, h] = r; const q = new Path2D(); q.roundRect(x + 6, y + 6, w - 12, h - 12, 18); g.fillStyle = f; g.fill(q); };
  room(FG.RA, B.adF); room(FG.LA, B.asF); room(FG.RV, B.adF); room(FG.LV, B.asF);
  g.fillStyle = B.adF; g.fillRect(420, 380, 40, 50); g.fillStyle = B.asF; g.fillRect(590, 380, 40, 50);
  // foramen ovale
  g.fillStyle = cl[2] > 0.6 ? '#bfb3a8' : '#efe4f7'; g.fillRect(520, 305, 30, 40);
  if (hi === 2) ring(g, 535, 325, 40, 34, 1);
  txt(g, 'AD', 430, 300, 20, '#3567b8', { stroke: false }); txt(g, 'AS', 650, 300, 20, '#c4403a', { stroke: false }); txt(g, 'VD', 430, 540, 20, '#3567b8', { stroke: false }); txt(g, 'VS', 650, 540, 20, '#c4403a', { stroke: false });
  // ----- fluxul
  const sp = 0.16;
  if (cl[0] < 0.9) flow(g, curve(FG.UV), t, B.oxL, 5, sp, 6, { alpha: 1 - cl[0] });
  if (cl[1] < 0.9) flow(g, curve(FG.DV), t, B.oxL, 3, sp, 5, { alpha: 1 - cl[1] });
  flow(g, curve(FG.IVC), t, cl[0] > 0.6 ? B.dxL : '#f0a0c8', 5, sp, 6);
  flow(g, curve(FG.SVC), t, B.dxL, 4, sp, 6);
  if (shunt > 0.05) flow(g, FG.FO, t, '#f0a0c8', 3, 0.3, 6, { alpha: 1 - cl[2] });
  flow(g, FG.LAtoLV, t, lungs > 0.5 ? B.oxL : '#f0a0c8', 3, 0.25, 6);
  flow(g, FG.RAtoRV, t, B.dxL, 3, 0.25, 6);
  flow(g, FG.AO, t, lungs > 0.5 && shunt < 0.3 ? B.oxL : '#f0a0c8', 10, 0.1, 6);
  flow(g, FG.RVout, t, B.dxL, 7, 0.14, 6);
  flow(g, FG.PA, t, B.dxL, lungs > 0.5 ? 3 : 1, 0.3, 5);
  if (cl[3] < 0.9) flow(g, curve(FG.DA), t, B.dxL, 4, 0.2, 6, { alpha: 1 - cl[3] });
  if (lungs > 0.5) flow(g, curve(FG.PV), t, B.oxL, 3, 0.25, 5);
  if (cl[4] < 0.9) flow(g, FG.IL, t, B.dxL, 8, 0.1, 6, { alpha: 1 - cl[4] });
}
const FLBL = [
  ['ductul venos', 'lig. venos', 330, 610, 'right'],
  ['v. ombilicală', 'lig. rotund al ficatului', 300, 830, 'center'],
  ['foramen ovale', 'fosa ovală', 535, 225, 'center'],
  ['canal arterial', 'lig. arterial', 700, 215, 'center'],
  ['aa. ombilicale', 'lig. ombilicale mediale', 440, 862, 'center'],
];
export function fetal() {
  const HI = [1, 2, 3, 0];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[300, 660], [535, 380], [760, 250], [240, 790]],
    phase: (i) => ['ductul venos: ocolește ficatul', 'foramen ovale: AD → AS', 'canalul arterial: pulmonar → aortă', 'vena și arterele ombilicale'][i] || 'făt: 3 șunturi',
    draw(g, t, b) {
      bg(g);
      const hi = b.i < 0 ? -1 : HI[b.i];
      fetalScene(g, t, { hi: b.i === 3 ? 4 : hi });
      if (b.i === 3) { ring(g, 330, 850, 150, 50, ease(b.bt)); }
      // etichetele cu numele fetale
      const PT = [0, 3, 1, 2, 3]; // FLBL[k] e explicat la punctul PT[k]
      FLBL.forEach(([n, , x, y, al], k) => txt(g, n, x, y, 17, b.i === PT[k] ? C.hi : C.cream, { align: al }));
      txt(g, 'VCI', 330, 470, 16, C.cream, { align: 'right' }); txt(g, 'VCS', 460, 60, 16, C.cream, { align: 'left' }); txt(g, 'aorta', 880, 500, 16, C.cream, { align: 'left' });
      if (b.i === 2) txt(g, 'plămânii fetali:\nrezistență mare', 760, 40, 16, '#ffd0dd');
      photo(g, 'fetal', 20, 165, 250, 300, 'Figura din LP\n(Langman 19.25)', 1);
      bloodKey(g, 990, 905);
    },
  };
}
export function birth() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[300, 790], [300, 650], [535, 180], [760, 250], [640, 870]],
    phase: (i) => ['v. ombilicală → lig. rotund', 'ductul venos → lig. venos', 'foramen ovale → fosa ovală', 'canalul arterial → lig. arterial', 'aa. ombilicale → lig. ombilicale mediale'][i] || 'prima respirație',
    draw(g, t, b) {
      bg(g);
      let cl, lungs;
      if (b.i < 0) { const u = REDUCED ? 1 : 0.5 - 0.5 * Math.cos(t * 0.45); cl = [0, 1, 2, 3, 4].map((k) => clamp(u * 6 - k - 0.5)); lungs = clamp(u * 3); }
      else { cl = [0, 1, 2, 3, 4].map((k) => (k < b.i ? 1 : k > b.i ? 0 : ease(clamp(b.bt / (b.bd * 0.6))))); lungs = 1; }
      fetalScene(g, t, { closed: cl, hi: b.i, lungs });
      const ord = [1, 0, 2, 3, 4]; // FLBL este în ordinea: ductul venos, v. ombilicală, ...
      ord.forEach((fi, k) => { const [n, l, x, y, al] = FLBL[fi]; const c = cl[k]; txt(g, c > 0.6 ? l : n, x, y, c > 0.6 ? 18 : 16, c > 0.6 ? '#f0e6dc' : C.cream, { align: al, alpha: b.i === k ? 1 : 0.85 }); });
      if (b.i === 2) { arr(g, 640, 360, 560, 340, B.ox, 6, 1); txt(g, 'AS > AD', 700, 380, 18, '#ffd0cc'); }
      if (b.i === 3) txt(g, 'O₂ ↑ · prostaglandine ↓', 760, 120, 17, C.hi);
      if (b.i < 0) txt(g, 'prima respirație → plămânii se destind', 330, 108, 16, '#ffd0dd');
      txt(g, 'gri = ligament', 100, 40, 16, '#e8ddd4');
      bloodKey(g, 990, 905);
    },
  };
}

/* =================================================== FRECVENȚA (tabelul din LP) + harta OMS
   Barele cresc de la 0 spre dreapta; DSV cea mai lungă. Punctul 4: două grupuri de țări: acces la chirurgia cardiacă → puține decese,
   acces greu → multe decese (ideea hărții OMS din LP, desenată simbolic). */
export function freq() {
  const D = [['Defect septal ventricular', 25, 0], ['Defect septal atrial', 12, 1], ['Canal arterial persistent', 12, 1], ['Stenoză pulmonară', 9, -1], ['Tetralogia Fallot', 8, 2], ['Coarctația aortei', 7, -1], ['Stenoză aortică', 5, -1], ['Transpoziția vaselor mari', 5, -1]];
  const X0 = 400, SC = 20;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[X0 + 25 * SC + 60, 110], [X0 + 12 * SC + 90, 200], [X0 + 8 * SC + 60, 380], [70, 700]],
    phase: (i) => ['DSV 25%', 'DSA + canal arterial: 12%', 'Fallot 8%', 'harta OMS (2012)'][i] || '% din malformațiile cardiace',
    draw(g, t, b) {
      bg(g);
      const gr = b.i < 0 ? ease(clamp((REDUCED ? 9 : t % 9) / 3)) : 1;
      D.forEach(([n, v, k], r) => {
        const y = 110 + r * 60; const act = b.i >= 0 && k === b.i; const main = k >= 0;
        txt(g, n, X0 - 16, y, 18, act ? C.hi : main ? C.cream : '#a8968c', { align: 'right', w: act ? 800 : 600 });
        const grow = b.i < 0 ? gr : k >= 0 && k > b.i ? 0.15 : k === b.i ? ease(clamp(b.bt / (b.bd * 0.5))) : 1;
        const w = v * SC * grow;
        g.save(); g.fillStyle = main ? '#d9652a' : '#a59a94'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.roundRect(X0, y - 18, Math.max(4, w), 36, 10); g.fill(); g.stroke();
        if (act) { g.shadowColor = C.hi; g.shadowBlur = 18; g.strokeStyle = C.hi; g.stroke(); } g.restore();
        if (grow > 0.9) txt(g, v + '%', X0 + w + 34, y, 18, C.cream);
      });
      txt(g, '% din malformațiile cardiace congenitale (tabelul din LP)', 500, 600, 16, C.cream);
      if (b.i === 0) txt(g, '2,62 / 1000 de nașteri (28,8%)', X0 + 300, 140, 16, C.hi);
      if (b.i === 1) txt(g, 'DSA 1,64 / 1000 · canal arterial 0,87 / 1000', X0 + 300, 260, 16, C.hi);
      if (b.i === 2) txt(g, 'cea mai frecventă cianogenă', X0 + 330, 350, 17, C.hi);
      // harta OMS (simbolic)
      const s3 = st(b, 3);
      panel(g, 40, 640, 920, 270, { fill: b.i === 3 ? 'rgba(217,101,42,.14)' : 'rgba(255,240,228,.05)' });
      txt(g, 'Harta OMS din LP: decese prin malformații cardiace (2012, la 1 milion)', 500, 672, 17, '#ffd2b8');
      const grp = [[260, 'chirurgie cardiacă accesibilă', 3, '#e8c8b0'], [740, 'chirurgie cardiacă greu accesibilă', 11, '#d2524a']];
      grp.forEach(([x, n, k, col], j) => {
        txt(g, n, x, 715, 17, C.cream);
        for (let q = 0; q < 12; q++) { const xx = x - 165 + q * 30; const dead = q < k; const show = b.i < 0 || b.i === 3 ? clamp(s3 * 14 - q) : 0.3;
          dot(g, xx, 780, 11, dead ? col : '#5a4a44', { ow: 3, alpha: Math.max(0.3, show) }); g.save(); g.globalAlpha = Math.max(0.3, show); g.fillStyle = dead ? col : '#5a4a44'; g.strokeStyle = OUT; g.lineWidth = 3; g.beginPath(); g.roundRect(xx - 10, 796, 20, 34, 8); g.fill(); g.stroke(); g.restore(); }
        txt(g, j ? 'multe decese' : 'puține decese', x, 870, 19, j ? '#ffb0a8' : '#f0e0d0', { alpha: Math.max(0.3, s3) });
      });
    },
  };
}

/* =================================================== REGULA ȘUNTULUI
   Schema cu 4 camere (ca LP). Fluxul normal: albastru din corp → AD → VD → spre plămâni; roșu din plămâni → AS → VS → spre corp.
   1. apar presiunile; săgeți potențiale stânga → dreapta (AS → AD, VS → VD).
   2. o gaură (DSV): particule ROȘII trec VS → VD și pleacă spre plămâni (pulmonara devine violet = amestec); aorta rămâne roșie → fără cianoză.
   3. prima jumătate: pulmonara se umflă (prea mult sânge); a doua: obstacol pe dreapta (stenoză pulmonară) → particule ALBASTRE VD → VS → aorta violet → cianoză. */
export function shuntRule() {
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[500, 330], [500, 560], [110, 400]],
    phase: (i) => ['presiunea: stânga > dreapta', 'stânga → dreapta = fără cianoză', 'prea mult sânge în plămâni · obstacol pe dreapta'][i] || 'regula șuntului',
    draw(g, t, b) {
      bg(g);
      const s1 = st(b, 1), u2 = b.i === 2 ? b.bt / b.bd : b.i < 0 ? 0 : 0;
      const half2 = b.i === 2 && u2 > 0.5; const ob = half2 ? ease(clamp((u2 - 0.5) / 0.25)) : 0;
      const over = b.i === 2 ? ease(clamp(u2 / 0.3)) * (1 - ob) : 0;
      heart4(g, t, { vsd: b.i >= 1 || b.i < 0 ? 1 : 0, pulmW: 46 + 18 * over - 22 * ob, pulmCol: b.i === 1 || (b.i === 2 && !half2) || b.i < 0 ? B.mx : B.dx, aoCol: ob > 0.5 ? B.mx : B.ox });
      // presiunile
      [['5 mmHg', 340, 430], ['8 mmHg', 660, 430], ['25 mmHg', 340, 770], ['120 mmHg', 660, 770]].forEach(([s, x, y]) => txt(g, s, x, y, 20, OUT, { stroke: false, w: 700 }));
      flow(g, H4.blue, t, B.dxL, 10, 0.1, 7); flow(g, H4.red, t, B.oxL, 10, 0.1, 7);
      if (b.i === 0) { arr(g, 590, 410, 410, 410, '#ffe36e', 6, 0.9); arr(g, 590, 640, 410, 640, '#ffe36e', 6, 0.9); txt(g, 'presiune mare → mică', 500, 245, 18, C.hi); }
      // șuntul
      if (!half2 && (b.i >= 1 || b.i < 0)) flow(g, [[660, 640], [500, 610], [340, 640], [250, 700], [110, 700], [110, 120], [290, 120]], t, B.ox, 6, 0.14, 8, { alpha: Math.max(s1, b.i < 0 ? 1 : 0) });
      if (ob > 0) { flow(g, [[340, 660], [500, 610], [660, 660], [800, 700], [890, 700], [890, 120], [710, 120]], t, B.dx, 6, 0.14, 8, { alpha: ob }); g.save(); g.globalAlpha = ob; g.fillStyle = OUT; g.fillRect(84, 400, 52, 18); g.restore(); txt(g, 'stenoză', 150, 380, 17, C.hi, { align: 'left', alpha: ob }); }
      if (over > 0.3) txt(g, 'prea mult sânge →\nhipertensiune pulmonară', 230, 230, 17, C.hi, { alpha: over });
      bodyIcon(g, 950, 820, ob > 0.5 ? 1 : 0, 0.95);
      bloodKey(g, 900, 905);
    },
  };
}

/* =================================================== DSV
   Gaura în partea MEMBRANOASĂ (sus în septul ventricular, sub valvele AV). Particule roșii VS → VD → a. pulmonară (violet).
   3. defect mare: pulmonara se umflă, VD/VS se dilată (insuficiență cardiacă) + HTP. 4. clinic: ♂, cianoză doar la DSV mare/Eisenmenger. */
export function dsv() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[560, 560], [500, 690], [110, 420], [870, 600]],
    phase: (i) => ['orificiu în partea membranoasă', 'șunt VS → VD', 'defect mare: insuficiență cardiacă + HTP', 'clinic: ♂, cea mai frecventă'][i] || 'DSV',
    draw(g, t, b) {
      bg(g);
      const s0 = st(b, 0), s1 = st(b, 1), s2 = st(b, 2);
      heart4(g, t, { vsd: s0 * (1 + 0.6 * s2), pulmW: 46 + 20 * s2, pulmCol: s1 > 0.3 ? B.mx : B.dx });
      flow(g, H4.blue, t, B.dxL, 10, 0.1, 7); flow(g, H4.red, t, B.oxL, 10, 0.1, 7);
      if (s1 > 0) flow(g, [[680, 680], [500, 610], [340, 650], [250, 700], [110, 700], [110, 120], [290, 120]], t, B.ox, Math.round(5 + 4 * s2), 0.14, 8, { alpha: s1 });
      if (s0 > 0.4) txt(g, 'partea membranoasă', 500, 560, 17, C.hi);
      if (s1 > 0.5) txt(g, 'VS → VD', 500, 690, 22, '#ffd0cc');
      if (s2 > 0.3) { txt(g, 'HTP', 60, 300, 24, C.hi, { alpha: s2 }); txt(g, 'insuficiență\ncardiacă', 500, 870, 18, C.hi, { alpha: s2 }); }
      if (b.i === 3 || b.i < 0) { txt(g, '♂', 940, 600, 60, '#9cc0ff'); txt(g, 'mai frecventă\nla sexul masculin', 940, 680, 15, C.cream); }
      bodyIcon(g, 950, 820, 0, b.i === 3 || b.i < 0 ? 1 : 0.4);
      bloodKey(g, 880, 905);
    },
  };
}

/* =================================================== DSA
   Gaura la nivelul fosei ovale (mijlocul septului atrial). Particule roșii AS → AD → VD → a. pulmonară. AD și VD se dilată (supraîncărcare).
   3. clinic: ♀, mic = asimptomatic; mare = dispnee de efort, astenie, fatigabilitate, aritmii (puls neregulat). */
export function dsa() {
  return {
    home: HOME, cams: [HOME, HOME, HOME],
    anchors: [[560, 330], [340, 560], [870, 420]],
    phase: (i) => ['orificiu la nivelul fosei ovale', 'șunt AS → AD · AD + VD supraîncărcate', 'clinic: ♀, poate fi asimptomatic'][i] || 'DSA',
    draw(g, t, b) {
      bg(g);
      const s0 = st(b, 0), s1 = st(b, 1);
      const pump = REDUCED ? 0 : 0.5 + 0.5 * Math.sin(t * 4);
      heart4(g, t, { asd: s0, pulmCol: s1 > 0.3 ? B.mx : B.dx, pulmW: 46 + 10 * s1, adF: s1 > 0.5 ? '#c4d8f6' : B.adF, vdF: s1 > 0.5 ? '#c4d8f6' : B.adF });
      if (s1 > 0.5) { ring(g, 340, 410, 150, 110, 1); ring(g, 340, 685, 150, 120, 1); }
      flow(g, H4.blue, t, B.dxL, 10, 0.1, 7); flow(g, H4.red, t, B.oxL, 10, 0.1, 7);
      if (s1 > 0) flow(g, [[660, 420], [500, 410], [360, 430], [340, 640], [250, 700], [110, 700], [110, 120], [290, 120]], t, B.ox, 6, 0.13, 8, { alpha: s1 });
      if (s0 > 0.4) txt(g, 'fosa ovală', 500, 330, 18, C.hi);
      if (s1 > 0.5) txt(g, 'AS → AD', 500, 470, 22, '#ffd0cc');
      if (b.i === 2 || b.i < 0) {
        txt(g, '♀', 940, 420, 60, '#ffb0d0'); txt(g, 'mai frecventă\nla sexul feminin', 940, 500, 15, C.cream);
        // aritmie: un traseu ECG neregulat
        g.save(); g.strokeStyle = C.hi; g.lineWidth = 4; g.beginPath(); for (let x = 0; x <= 200; x += 4) { const ph = (x + (REDUCED ? 0 : t * 120)) % 200; const sp = [30, 95, 125, 180]; const y = 590 - sp.reduce((a, s) => a + 40 * Math.exp(-((ph - s) ** 2) / 20), 0); if (x === 0) g.moveTo(840 + x, y); else g.lineTo(840 + x, y); } g.stroke(); g.restore();
        txt(g, 'aritmii', 940, 620, 16, C.hi);
      }
      bodyIcon(g, 950, 820, 0, 0.9);
      bloodKey(g, 880, 905);
      void pump;
    },
  };
}

/* =================================================== TETRALOGIA FALLOT
   Doar ventriculii (VD stânga ecranului, VS dreapta). Sânge intră: albastru în VD (din AD), roșu în VS (din AS).
   1. ieșirea VD (trunchiul pulmonar) se îngustează (stenoză) → puține particule spre plămâni.
   2. septul ventricular are gaura sus (DSV), sub aortă.
   3. aorta largă pornește deasupra găurii („călare”), primește și din VD → aorta violet.
   4. peretele VD se îngroașă (hipertrofie). Corpul devine cianotic: șunt dreapta → stânga. */
export function fallot() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[250, 300], [500, 560], [640, 200], [180, 760]],
    phase: (i) => ['1 · stenoza pulmonară', '2 · DSV', '3 · aorta călare (dextropoziție)', '4 · hipertrofia VD'][i] || 'septul conotruncal deplasat anterior',
    draw(g, t, b) {
      bg(g);
      const s0 = st(b, 0), s1 = st(b, 1), s2 = st(b, 2), s3 = st(b, 3);
      const hyp = 10 + 26 * s3;
      // ventriculii
      const body = new Path2D(); body.moveTo(150, 520); body.lineTo(850, 520); body.lineTo(850, 700); body.quadraticCurveTo(820, 880, 500, 900); body.quadraticCurveTo(180, 880, 150, 700); body.closePath();
      paint(g, body, B.wall, null, null, [150, 520, 700, 380], OUT, 6);
      // peretele VD (hipertrofie): bandă groasă roșu-închis
      g.save(); g.strokeStyle = '#8a3a34'; g.lineWidth = hyp; g.lineJoin = 'round'; g.beginPath(); g.moveTo(480, 540 + hyp / 2); g.lineTo(170 + hyp / 2, 540 + hyp / 2); g.lineTo(170 + hyp / 2, 700); g.quadraticCurveTo(200, 860, 480, 880 - hyp / 2); g.stroke(); g.restore();
      const vd = new Path2D(); vd.roundRect(170 + hyp, 540 + hyp, 300 - hyp, 320 - hyp * 1.2, 30); g.fillStyle = B.adF; g.fill(vd);
      const vs = new Path2D(); vs.roundRect(525, 540, 305, 320, 30); g.fillStyle = B.asF; g.fill(vs);
      // septul ventricular, cu DSV sus
      const dsvH = 70 * Math.max(s1, b.i < 0 ? 1 : 0.0);
      g.fillStyle = B.musc; g.fillRect(478, 540 + dsvH, 46, 340 - dsvH);
      txt(g, 'VD', 330, 760, 40, '#3567b8', { stroke: false }); txt(g, 'VS', 680, 760, 40, '#c4403a', { stroke: false });
      // intrările
      arr(g, 90, 640, 200, 640, B.dx, 9, 1); txt(g, 'din AD', 80, 600, 17, B.dxL); arr(g, 910, 640, 800, 640, B.ox, 9, 1); txt(g, 'din AS', 920, 600, 17, B.oxL);
      // trunchiul pulmonar din VD, îngustat
      const nar = lerp(54, 18, s0);
      tube(g, [[300, 530], [300, 420]], 54, B.dx, { ow: 6, cap: 'butt' }); tube(g, [[300, 420], [300, 370]], nar, B.dx, { ow: 6, cap: 'butt' }); tube(g, [[300, 370], [300, 240], [230, 160]], 50, B.dx, { ow: 6 });
      txt(g, 'a. pulmonară', 230, 120, 18, B.dxL);
      if (s0 > 0.5) txt(g, 'stenoză', 360, 395, 18, C.hi, { align: 'left' });
      // aorta: largă, deplasată spre dreapta (pacientului) peste DSV
      const ax = lerp(680, 520, Math.max(s2, b.i < 0 ? 1 : 0)); const aw = lerp(56, 92, Math.max(s2, b.i < 0 ? 1 : 0));
      const AOp = [[ax, 530], [ax, 260], [ax + 60, 150], [760, 120], [860, 200], [880, 320]];
      tube(g, AOp, aw, s2 > 0.5 || b.i < 0 ? B.mx : B.ox, { ow: 7 });
      txt(g, s2 > 0.5 || b.i < 0 ? 'aorta (călare)' : 'aorta', 730, 290, 20, '#e3c6ff');
      // fluxul
      const pulmN = Math.round(lerp(6, 2, s0));
      flow(g, [[120, 640], [300, 640], [300, 530], [300, 240], [230, 160]], t, B.dxL, pulmN, 0.15, 7);
      flow(g, [[880, 640], [680, 660], [ax, 520], ...AOp.slice(1)], t, B.oxL, 7, 0.12, 7);
      if (s1 > 0.5 || b.i < 0) flow(g, [[200, 700], [380, 620], [500, 580], [ax, 500], ...AOp.slice(1)], t, B.dx, 6, 0.12, 8, { alpha: Math.max(s2, 0.6) });
      if (s1 > 0.5) txt(g, 'DSV', 500, 505, 18, C.hi);
      if (s3 > 0.4) txt(g, 'hipertrofie VD', 220, 920, 18, C.hi, { alpha: s3 });
      bodyIcon(g, 940, 450, s2 > 0.5 || b.i < 0 ? 1 : 0, 1);
      txt(g, '← dreapta pacientului', 150, 40, 16, C.cream);
      bloodKey(g, 990, 905);
    },
  };
}

/* =================================================== CANAL ARTERIAL PERSISTENT
   Schema cu 4 camere + canalul (violet) între țeava pulmonară (sus-stânga) și aortă (sus-dreapta).
   Intro + punctul 1 (prima jumătate): la făt fluxul merge pulmonar → aortă (albastru, de la stânga la dreapta ecranului).
   Punctul 1 (a doua jumătate) și 2: după naștere canalul nu se închide; presiunea aortei > pulmonarei → particule ROȘII aortă → pulmonară (dreapta → stânga ecranului).
   3: pulmonara devine violet și mai groasă: sângele recirculă a. pulmonară → plămâni → AS → VS → aortă (traseu evidențiat).
   4: Doppler în a. pulmonară: canal închis = flux doar spre plămâni; deschis = un jet în plus, invers, în a. pulmonară. */
export function pda() {
  const DUCT = [[690, 100], [310, 100]]; // aortă → pulmonară (sensul după naștere)
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[615, 55], [800, 235], [890, 420], [500, 470]],
    phase: (i) => ['canalul (arcul VI stâng) nu se închide', 'după naștere: aortă → a. pulmonară', 'sângele recirculă prin plămâni', 'ecografie Doppler'][i] || 'făt: pulmonar → aortă',
    draw(g, t, b) {
      bg(g);
      const fetalPh = b.i < 0 || (b.i === 0 && b.bt / b.bd < 0.45);
      const s2 = st(b, 2);
      if (b.i !== 3) {
        heart4(g, t, { pulmCol: !fetalPh && b.i >= 1 ? B.mx : B.dx, pulmW: 46 + 14 * s2 });
        tube(g, DUCT, 30, '#9a5fc8', { ow: 6, cap: 'butt' }); txt(g, 'canal arterial', 500, 50, 19, '#e3c6ff');
        flow(g, H4.blue, t, B.dxL, 10, 0.1, 7); flow(g, H4.red, t, B.oxL, 10, 0.1, 7);
        if (fetalPh) { flow(g, [[310, 100], [690, 100]], t, B.dx, 5, 0.25, 8); txt(g, 'făt: trunchiul pulmonar → aortă', 500, 235, 17, '#c9d8ff'); }
        else { flow(g, DUCT, t, B.ox, 5, 0.25, 8); txt(g, 'după naștere: aortă → a. pulmonară', 500, 235, 17, '#ffd0cc'); }
        if (b.i === 2) { const loopP = [[290, 120], [200, 50], [60, 50]]; tube(g, loopP, 10, C.hi, { ow: 0, alpha: 0.6 }); txt(g, 'plămâni', 60, 30, 16, C.hi); flow(g, [[690, 100], [310, 100], [290, 120]], t, B.ox, 3, 0.3, 7); ring(g, 660, 400, 150, 110, ease(b.bt)); ring(g, 660, 680, 150, 120, ease(b.bt)); }
        bodyIcon(g, 950, 820, 0, 0.9); bloodKey(g, 880, 905);
      } else {
        // Doppler: secțiune prin a. pulmonară, canal închis vs deschis
        const box = (x, title, open) => {
          panel(g, x - 220, 160, 440, 600);
          txt(g, title, x, 200, 21, open ? '#ffd0cc' : '#c9d8ff');
          tube(g, [[x, 720], [x, 280]], 120, '#3a2a48', { ow: 6, cap: 'butt' });
          txt(g, 'a. pulmonară principală', x, 750, 16, C.cream);
          for (let k = 0; k < 4; k++) flow(g, [[x - 40 + k * 26, 700], [x - 40 + k * 26, 290]], t + k * 0.3, B.dx, 3, 0.25, 7);
          if (open) { tube(g, [[x + 180, 300], [x + 50, 300]], 26, '#9a5fc8', { ow: 4, cap: 'butt' }); for (let k = 0; k < 3; k++) flow(g, [[x + 180, 300], [x + 40, 310], [x + 10 - k * 20, 420 + k * 40]], t + k * 0.4, B.ox, 3, 0.3, 7); txt(g, 'jet din canal', x + 140, 260, 16, '#ffd0cc'); }
        };
        box(270, 'canal închis', false); box(730, 'canal deschis', true);
        txt(g, 'LP: fluxul în a. pulmonară principală (Doppler)', 500, 860, 19, C.hi);
      }
    },
  };
}

/* =================================================== SINDROMUL EISENMENGER
   1. DSV mare, mult roșu VS → VD → plămâni (pulmonara groasă, violet).
   2. vasele pulmonare (căsuța sus-stânga) își îngroașă peretele, lumenul scade → HTP ireversibilă.
   3. peretele VD se îngroașă; manometrele: VD urcă de la 25 peste VS (120).
   4. șuntul se inversează: ALBASTRU VD → VS → aorta violet → cianoză tardivă. */
export function eisen() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[500, 560], [200, 230], [340, 830], [600, 610]],
    phase: (i) => ['DSV mare: VS → VD', 'HTP ireversibilă', 'presiunea VD > VS', 'șunt inversat: VD → VS'][i] || 'ani de evoluție',
    draw(g, t, b) {
      bg(g);
      const s1 = st(b, 1), s2 = st(b, 2), s3 = st(b, 3);
      heart4(g, t, { vsd: 1.5, pulmW: 64 - 10 * s1, pulmCol: s3 > 0.5 ? B.dx : B.mx, aoCol: s3 > 0.5 ? B.mx : B.ox, vdF: s2 > 0.5 ? '#b9cdf0' : B.adF });
      if (s2 > 0) { g.save(); g.strokeStyle = '#8a3a34'; g.lineWidth = 26 * s2; g.strokeRect(215, 575, 250, 220); g.restore(); }
      flow(g, H4.blue, t, B.dxL, 10, 0.1, 7); flow(g, H4.red, t, B.oxL, 10, 0.1, 7);
      if (s3 < 0.5) flow(g, [[680, 680], [500, 610], [340, 650], [250, 700], [110, 700], [110, 120], [290, 120]], t, B.ox, Math.round(lerp(9, 3, s2)), 0.14, 8, { alpha: 1 - s3 * 2 });
      else flow(g, [[330, 660], [500, 610], [660, 660], [800, 700], [890, 700], [890, 120], [710, 120]], t, B.dx, 7, 0.14, 8, { alpha: (s3 - 0.5) * 2 });
      // vasul pulmonar în secțiune: peretele se îngroașă
      const vx = 200, vy = 230; ell(g, vx, vy, 70, 70, '#e8a59f', { ow: 5 }); ell(g, vx, vy, lerp(52, 16, s1), lerp(52, 16, s1), '#3a1f24', { ow: 3 });
      txt(g, 'arteriolă pulmonară', vx, vy - 95, 15, C.cream); if (s1 > 0.5) txt(g, 'HTP', vx, vy + 100, 26, C.hi);
      // manometrele
      const vdP = Math.round(lerp(25, 130, s2)); txt(g, vdP + ' mmHg', 340, 770, 20, vdP > 120 ? C.hi : OUT, { stroke: vdP > 120, w: 800 }); txt(g, '120 mmHg', 660, 770, 20, OUT, { stroke: false, w: 800 });
      if (s3 > 0.5) txt(g, 'VD → VS', 500, 690, 22, '#c9d8ff');
      bodyIcon(g, 950, 820, s3 > 0.5 ? 1 : 0, 0.95);
      if (s3 > 0.5) txt(g, 'cianoză tardivă', 940, 700, 16, '#d9b8ff');
      bloodKey(g, 880, 905);
    },
  };
}

/* =================================================== CAZUL DIN LP
   Stânga: fișa cazului (copil de 7 ani, obosește la efort) → diagnostic DSV (dif. DSA).
   Dreapta: schema cu 4 camere micșorată. 3. apare gaura în partea membranoasă. 4. un singur „pachet” de sânge parcurge bucla
   VS → DSV → VD → a. pulmonară → plămâni → AS → VS (în ordine). 5. bara „spre mușchi” scade, bara „spre plămâni” crește. */
export function caseLP() {
  const S = 0.6, TX = 360, TY = 140; const T = (p) => [TX + p[0] * S, TY + p[1] * S];
  const LOOP = [[660, 660], [500, 612], [340, 650], [250, 700], [110, 700], [110, 120], [300, 120], [400, 60], [600, 60], [710, 120], [660, 175], [660, 410], [660, 640]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[40, 80], [40, 460], T([560, 560]), T([110, 300]), [690, 760]],
    phase: (i) => ['cazul', 'diagnosticul: DSV (dif. DSA)', 'partea membranoasă nu se închide (S7–8)', 'traiectoria sângelui', 'de ce obosește la efort'][i] || 'cazul din LP',
    draw(g, t, b) {
      bg(g);
      const s0 = st(b, 0), s1 = st(b, 1), s2 = st(b, 2), s3 = st(b, 3), s4 = st(b, 4);
      // fișa
      panel(g, 14, 40, 330, 860, { fill: b.i === 0 || b.i === 1 ? 'rgba(217,101,42,.14)' : 'rgba(255,240,228,.05)' });
      txt(g, 'CAZUL', 180, 80, 20, '#ffd2b8');
      // copilul obosit
      const tired = REDUCED ? 0 : Math.sin(t * 2) * 4;
      dot(g, 180, 170 + tired * 0.5, 34, '#f3c29b', { ow: 4 }); const bd = new Path2D(); bd.roundRect(140, 210, 80, 100, 26); paint(g, bd, '#7ab0e0', null, null, [140, 210, 80, 100], OUT, 4);
      txt(g, '7 ani', 260, 180, 22, C.hi, { align: 'left' }); { const dy = REDUCED ? 0 : (t * 30) % 40; dot(g, 224, 140 + dy, 7, '#9cd0ff', { ow: 2, alpha: 1 - dy / 40 }); }
      txt(g, 'obosește excesiv\nla efort', 180, 360, 19, C.cream);
      txt(g, 'examen: defect cardiac,\nunul dintre cele mai\nfrecvente la copii', 180, 450, 17, C.cream, { alpha: Math.max(0.4, s0) });
      // diagnosticul
      pill(g, 180, 570, 280, 64, '#ffe9a8', 'DSV', { size: 30, alpha: Math.max(0.3, s1), glow: b.i === 1 ? 1 : 0 });
      txt(g, '„cea mai frecventă”', 180, 625, 16, C.cream, { alpha: Math.max(0.3, s1) });
      pill(g, 180, 700, 240, 50, '#e6dbff', 'diferențial: DSA', { size: 19, alpha: Math.max(0.3, s1) });
      txt(g, 'intoleranță la efort la\nvârsta școlară; LP: se\ndescoperă tipic mai târziu', 180, 790, 15, C.cream, { alpha: Math.max(0.3, s1) });
      // inima
      g.save(); g.translate(TX, TY); g.scale(S, S);
      heart4(g, t, { vsd: Math.max(s2, b.i < 0 ? 1 : 0), pulmW: 46 + 16 * s4, pulmCol: B.mx });
      flow(g, H4.blue, t, B.dxL, 8, 0.1, 9); flow(g, H4.red, t, B.oxL, 8, 0.1, 9);
      ell(g, 500, 50, 120, 30, '#f2b3c4', { ow: 4 }); txt(g, 'plămâni', 500, 50, 20, OUT, { stroke: false });
      if (b.i === 3) { const u = loopT(b.bt, b.bd); const [x, y] = at(LOOP, u); tube(g, LOOP, 10, C.hi, { raw: true, ow: 0, alpha: 0.45 }); dot(g, x, y, 22, B.ox, { ow: 5 }); }
      else if (s2 > 0 || b.i < 0) flow(g, LOOP.slice(0, 7), t, B.ox, 5, 0.14, 10, { alpha: Math.max(s2, b.i < 0 ? 1 : 0) });
      if (s2 > 0.4) txt(g, 'S7–8: partea\nmembranoasă', 500, 540, 22, C.hi);
      g.restore();
      // 5 · debitul VS: spre mușchi vs spre plămâni
      const bars = [['spre mușchi', lerp(1, 0.62, s4), B.ox, 470], ['spre plămâni', lerp(1, 1.5, s4), B.mx, 820]];
      bars.forEach(([n, v, c, x]) => { const h = 110 * v; g.save(); g.fillStyle = c; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(x - 50, 880 - h, 100, h, 10); g.fill(); g.stroke(); g.restore(); txt(g, n, x + 70, 860, 17, C.cream, { align: 'left', alpha: Math.max(0.4, s4) }); });
      if (s4 > 0.5) { txt(g, '→ oboseală la efort', 470, 690, 18, C.hi, { alpha: s4 }); txt(g, '→ dispnee', 820, 690, 18, C.hi, { alpha: s4 }); }
    },
  };
}
