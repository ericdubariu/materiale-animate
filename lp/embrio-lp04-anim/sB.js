// Partea A (septarea) + Partea B (arterele). Vedere frontală: dreapta embrionului = STÂNGA ecranului; cranial = sus.
import {
  W, H, cam, HOME, C, B, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead,
  OUT, clamp, lerp, ease, paint, REDUCED, photo,
} from './ek.js';

/* =================================================== SEPTAREA ATRIALĂ
   Ce trebuie să se vadă (secțiune frontală prin atrii; AD = stânga ecranului, AS = dreapta; tavanul sus, pernițele jos):
   1. septum primum (violet) COBOARĂ din tavan spre pernițe; golul de dedesubt = ostium primum; sângele fetal trece AD → AS (stânga → dreapta ecranului) prin gol.
   2. septum primum atinge pernițele (ostium primum dispare); în partea de SUS apar perforații → ostium secundum; fluxul trece acum pe sus.
   3. septum secundum (portocaliu, mai gros) coboară din tavan LA DREAPTA (în AD = stânga ecranului) primului; marginea lui liberă lasă jos foramen ovale.
      Drumul sângelui: AD → pe sub marginea secundum (foramen ovale) → în sus între septuri → peste marginea primum (ostium secundum) → AS.
   4. făt: fluxul de mai sus; naștere: presiunea AS > AD împinge septum primum (clapeta) spre stânga ecranului, pe septum secundum → se lipesc → fosa ovală; fluxul se oprește.
   Sângele din VCI la făt = amestecat (violet). */
export function atrial() {
  const L = 120, R = 880, T = 170, BOT = 740; const XS = 430, XP = 560; // linia septum secundum / primum
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[XP + 50, 230], [XP + 50, 760], [XS - 50, 230], [XS - 210, 700]],
    phase: (i) => ['st. 13: septum primum', 'ostium primum se închide', 'st. 18–21: septum secundum', 'supapa: făt → naștere'][i] || 'septarea atrială',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4, 0.55);
      const room = new Path2D(); room.roundRect(L, T, R - L, BOT - T, 60);
      paint(g, room, B.wall, null, null, [L, T, R - L, BOT - T], OUT, 6);
      const inner = new Path2D(); inner.roundRect(L + 24, T + 24, R - L - 48, BOT - T - 48, 44);
      g.save(); g.clip(inner); g.fillStyle = B.adF; g.fillRect(L, T, 500 - L, BOT - T); g.fillStyle = B.asF; g.fillRect(500, T, R - 500, BOT - T); g.restore();
      txt(g, 'AD', 240, 300, 46, '#3567b8', { stroke: false }); txt(g, 'AS', 760, 300, 46, '#c4403a', { stroke: false });
      txt(g, 'tavanul atriului', 500, 130, 18, C.cream);
      // pernițele endocardice jos
      ell(g, 500, BOT - 20, 150, 34, B.cush, { ow: 5 }); txt(g, 'pernițele endocardice', 500, BOT + 50, 18, '#bff0d2');
      // ----- septum primum
      const s0 = p(0), s1 = p(1), s2 = p(2);
      const birth = b.i === 3 ? ease(clamp((b.bt / b.bd - 0.5) / 0.3)) : b.i < 0 ? (loopT(t, 10.4 * 2) > 0.85 ? 1 : 0) * 0 : 0;
      const xp = lerp(XP, XS + 32, birth); // la naștere clapeta e împinsă pe septum secundum
      const pBot = lerp(T + 24, BOT - 50, s0 * 0.78 + s1 * 0.22); // marginea de jos coboară; la pasul 2 atinge pernițele
      const pTop = T + 24 + 210 * s1;                                 // sus: perforațiile → ostium secundum
      if (s0 > 0) {
        tube(g, [[xp, pTop], [xp, pBot]], 18, B.prim, { ow: 5, cap: 'butt' });
        if (s1 > 0 && s1 < 1) for (let k = 0; k < 4; k++) dot(g, xp, T + 50 + k * 48, 7 * (1 - s1) + 1, B.adF, { ow: 2 });
      }
      // ----- septum secundum (mai gros, în AD)
      const sBot = lerp(T + 24, 470, s2);
      if (s2 > 0) tube(g, [[XS, T + 24], [XS, sBot]], 34, B.sec, { ow: 5, cap: 'butt' });
      // ----- drumul sângelui (AD → AS)
      let path = null; let a = 1;
      if (b.i === 0 || (b.i < 0 && s1 < 0.05)) path = [[230, 640], [500, 660], [770, 640]];               // prin ostium primum
      else if (b.i === 1 || (b.i < 0 && s2 < 0.05)) path = [[230, 330], [500, 200], [770, 330]];          // prin ostium secundum
      else if (b.i >= 2 || b.i < 0) { path = [[230, 600], [XS - 10, 620], [(XS + XP) / 2, 560], [(XS + XP) / 2, 240], [XP + 40, 210], [770, 330]]; a = 1 - birth; }
      if (path && (s0 > 0.3 || b.i < 0) && a > 0.02) { flow(g, path, t, B.mx, 8, 0.18, 9, { alpha: a }); }
      arr(g, 180, 820, 300, 820, '#c9d8ff', 5, 0.9); txt(g, 'din VCI', 140, 820, 17, '#c9d8ff', { align: 'right' });
      // etichete
      if (s0 > 0 && s1 < 0.5) txt(g, 'ostium primum', 640, 640, 19, C.hi, { align: 'left' });
      if (s1 > 0.4) txt(g, 'ostium secundum', 610, 205, 19, C.hi, { align: 'left', alpha: s2 > 0.5 ? 0.6 : 1 });
      if (s2 > 0.3) { txt(g, 'septum secundum', XS - 30, 520, 18, '#ffd59a', { align: 'right' }); txt(g, 'foramen ovale', XS - 30, 610, 19, C.hi, { align: 'right', alpha: 1 - birth }); }
      if (s0 > 0.3) txt(g, 'septum primum', xp + 24, 420, 18, '#e3d6ff', { align: 'left' });
      if (b.i === 3) {
        const st = b.bt / b.bd < 0.5;
        pill(g, 500, 860, 420, 56, st ? '#e9dcff' : '#ffe9a8', st ? 'făt: AD → AS (ocolește plămânii)' : 'naștere: AS > AD → se lipesc', { size: 19 });
        if (!st) { arr(g, 760, 470, 640, 470, '#c4403a', 7, birth); txt(g, 'presiune', 780, 430, 17, '#ffd0cc', { alpha: birth }); }
        if (birth > 0.8) { ell(g, (XS + xp) / 2 - 6, 560, 46, 30, 'rgba(255,255,255,.0)', { dash: [7, 5], sc: C.hi, ow: 4 }); txt(g, 'fosa ovală', (XS + xp) / 2, 690, 22, C.hi); }
      }
    },
  };
}

/* =================================================== SEPTUL VENTRICULAR
   1. septul muscular (roșu) URCĂ de la vârf între VD (stânga ecranului) și VS.
   2. golul dintre marginea lui și pernițe = foramenul interventricular (se închide în st. 19–20).
   3. pernițele AV (verzi, sus și jos) fuzionează → canal AV drept + stâng.
   4. 3 surse se întâlnesc în gol: septul conotruncal coboară de sus, pernițele de deasupra, septul muscular de jos → partea membranoasă (galben) — ultima. */
export function ventSep() {
  const MX = 500;
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[MX + 80, 800], [MX - 60, 600], [MX + 190, 380], [MX + 50, 610]],
    phase: (i) => ['septul muscular urcă', 'foramenul interventricular', 'pernițele fuzionează (st. 19)', 'partea membranoasă = ultima'][i] || 'septul ventricular',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4, 0.55);
      const body = new Path2D(); body.moveTo(140, 150); body.lineTo(860, 150); body.lineTo(860, 560); body.quadraticCurveTo(840, 800, MX, 900); body.quadraticCurveTo(160, 800, 140, 560); body.closePath();
      paint(g, body, B.wall, null, null, [140, 150, 720, 750], OUT, 6);
      // atriile
      const r = (x, y, w, h, f) => { const q = new Path2D(); q.roundRect(x, y, w, h, 22); g.fillStyle = f; g.fill(q); };
      r(170, 175, 300, 180, B.adF); r(530, 175, 300, 180, B.asF);
      // ventriculii (o cavitate comună, colorată pe jumătăți)
      g.save(); const v = new Path2D(); v.moveTo(175, 470); v.lineTo(825, 470); v.lineTo(825, 570); v.quadraticCurveTo(800, 760, MX, 860); v.quadraticCurveTo(200, 760, 175, 570); v.closePath(); g.clip(v); g.fillStyle = B.adF; g.fillRect(150, 460, MX - 150, 420); g.fillStyle = B.asF; g.fillRect(MX, 460, 360, 420); g.restore();
      // canalele AV (deschiderile dintre atriu și ventricul)
      r(250, 340, 140, 150, B.adF); r(610, 340, 140, 150, B.asF);
      txt(g, 'AD', 280, 240, 36, '#3567b8', { stroke: false }); txt(g, 'AS', 720, 240, 36, '#c4403a', { stroke: false });
      txt(g, 'VD', 300, 650, 40, '#3567b8', { stroke: false }); txt(g, 'VS', 700, 650, 40, '#c4403a', { stroke: false });
      // septul interatrial (deja format)
      tube(g, [[MX, 175], [MX, 350]], 14, B.prim, { ow: 4, cap: 'butt' });
      // 3 · pernițele AV: sus + jos → fuzionează
      const s2 = p(2); const gap = lerp(30, 0, s2);
      ell(g, MX, 390 - gap, 105, 22, B.cush, { ow: 4 }); ell(g, MX, 420 + gap, 105, 22, B.cush, { ow: 4 });
      if (s2 > 0.7) { ell(g, MX, 405, 108, 30, B.cush, { ow: 4, alpha: (s2 - 0.7) / 0.3 }); txt(g, 'canal AV drept', 320, 455, 16, '#3567b8', { stroke: false }); txt(g, 'canal AV stâng', 680, 455, 16, '#c4403a', { stroke: false }); }
      // 1 · septul muscular urcă de la vârf
      const s0 = p(0); const top = lerp(860, 560, s0);
      g.save(); g.fillStyle = B.musc; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.moveTo(MX - 34, 870); g.lineTo(MX - 12, top); g.lineTo(MX + 12, top); g.lineTo(MX + 34, 870); g.closePath(); g.fill(); g.stroke(); g.restore();
      if (b.i === 0) arr(g, MX + 80, 830, MX + 80, 640, C.hi, 6, 0.9);
      // 2 · foramenul interventricular = golul dintre sept și pernițe
      const s1 = p(1); const s3 = p(3);
      if (s0 > 0.9 && s3 < 1) { g.save(); g.globalAlpha = (b.i === 1 ? 0.6 + 0.4 * Math.sin(t * 5) : 0.6) * (1 - s3); g.setLineDash([8, 6]); g.strokeStyle = C.hi; g.lineWidth = 4; g.strokeRect(MX - 24, 440, 48, 120); g.restore(); }
      if (s1 > 0.2 && s3 < 0.5) txt(g, 'foramen\ninterventricular', MX + 40, 520, 18, C.hi, { align: 'left', alpha: 1 - s3 * 2 });
      if (b.i === 1) { flow(g, [[300, 580], [MX, 510], [700, 580]], t, '#fff3e6', 4, 0.3, 6, { alpha: 0.6 }); txt(g, 'se închide în st. 19–20 (~S7–8)', MX, 120, 20, C.hi); }
      // 4 · partea membranoasă: 3 surse
      if (s3 > 0) {
        const d = clamp(s3 * 1.4);
        tube(g, [[MX + 70, 60], [MX + 30, 200], [MX, lerp(260, 430, d)]], 12, '#ef8a3a', { ow: 4, alpha: 1 });
        txt(g, 'de sus: septul conotruncal', MX + 90, 80, 18, '#ffd59a', { align: 'left' });
        if (s3 > 0.5) { const a = (s3 - 0.5) / 0.5; g.save(); g.globalAlpha = a; g.fillStyle = B.memb; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(MX - 22, 432, 44, 132, 10); g.fill(); g.stroke(); g.restore(); txt(g, 'partea membranoasă', MX - 40, 520, 19, '#ffe9a8', { align: 'right', alpha: a }); }
        arr(g, MX - 150, 330, MX - 60, 410, '#bff0d2', 4, 0.8 * (1 - s3 * 0.5)); arr(g, MX - 120, 720, MX - 30, 600, '#ffb0a8', 4, 0.8 * (1 - s3 * 0.5));
      }
      if (b.i < 0 || b.i >= 2) { flow(g, [[300, 250], [320, 420], [300, 600]], t, B.mx, 3, 0.3, 7); flow(g, [[700, 250], [680, 420], [700, 600]], t, B.mx, 3, 0.3, 7); }
    },
  };
}

/* =================================================== SEPTUL SPIRAL (aortico-pulmonar)
   Stânga: 3 secțiuni prin trunchi/con, de sus în jos: crestele (portocaliu) apar pe pereți opuși, apoi fuzionează; unghiul septului
   se rotește de la 0° (sus) la ~180° (jos), deci aorta (roșu) și trunchiul pulmonar (albastru) își schimbă poziția.
   Dreapta: aorta pleacă din VS (dreapta ecranului) și urcă spre stânga ecranului, apoi face arcul; trunchiul pulmonar pleacă din VD
   (stânga ecranului) și urcă spre dreapta ecranului: se răsucesc unul în jurul celuilalt. Sângele curge DIN ventriculi ÎN SUS.
   Jos: septul spiral se unește cu septul ventricular și închide partea membranoasă. Roșu/albastru = identitatea vasului (aorta / pulmonara). */
export function spiral() {
  const SEC = [[180, 220, 0, 'trunchi (sus)'], [180, 470, 0.5, 'mijloc'], [180, 720, 1, 'con (jos)']];
  const AO = [[760, 850], [740, 700], [600, 560], [560, 420], [600, 270], [680, 190], [800, 180], [860, 260]];
  const PT = [[560, 850], [580, 700], [720, 560], [760, 420], [720, 290], [700, 200], [700, 140]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[290, 120], [50, 470], [880, 420], [660, 900]],
    phase: (i) => ['st. 15–16: crestele bulbare', 'fuziune cu rotire ~180°', 'aorta din VS · pulmonara din VD', 'se unește cu septul ventricular'][i] || 'septul spiral',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4, 0.55);
      panel(g, 14, 40, 360, 850); panel(g, 390, 40, 596, 850);
      txt(g, 'secțiuni prin trunchi', 194, 80, 19, '#ffd2b8');
      const s0 = p(0), s1 = p(1), s2 = p(2), s3 = p(3);
      SEC.forEach(([x, y, f, n], k) => {
        const ang = f * Math.PI * lerp(0.15, 1, s1); // rotirea crește odată cu fuziunea
        // jumătățile: aorta (roșu) / pulmonara (albastru), vizibile după fuziune
        g.save(); g.beginPath(); g.arc(x, y, 92, 0, 7); g.clip();
        g.fillStyle = '#f4e4dc'; g.fillRect(x - 100, y - 100, 200, 200);
        if (s1 > 0.5) { const a = (s1 - 0.5) / 0.5; g.globalAlpha = a; g.fillStyle = B.ox; g.beginPath(); g.moveTo(x, y); g.arc(x, y, 100, ang, ang + Math.PI); g.fill(); g.fillStyle = B.dx; g.beginPath(); g.moveTo(x, y); g.arc(x, y, 100, ang + Math.PI, ang + 2 * Math.PI); g.fill(); }
        g.restore();
        g.save(); g.lineWidth = 7; g.strokeStyle = OUT; g.beginPath(); g.arc(x, y, 92, 0, 7); g.stroke(); g.restore();
        // crestele: 2 umflături pe pereți opuși care cresc spre centru
        const ln = 92 * clamp(s0 * 0.45 + s1 * 0.55);
        const ca = Math.cos(ang), sa = Math.sin(ang);
        if (s0 > 0) { tube(g, [[x + ca * 92, y + sa * 92], [x + ca * (92 - ln), y + sa * (92 - ln)]], 16, '#ef8a3a', { ow: 4 }); tube(g, [[x - ca * 92, y - sa * 92], [x - ca * (92 - ln), y - sa * (92 - ln)]], 16, '#ef8a3a', { ow: 4 }); }
        txt(g, n, x + 108, y - 70, 17, C.cream, { align: 'left' });
        if (k < 2) arr(g, x, y + 104, x, y + 140, '#fff3e6', 4, 0.7);
      });
      if (s1 > 0.6) txt(g, '~180°', 300, 600, 24, C.hi, { alpha: (s1 - 0.6) / 0.4 });
      // ----- dreapta: vasele care se răsucesc
      // ventriculii jos
      const vb = new Path2D(); vb.roundRect(440, 820, 520, 90, 30); paint(g, vb, B.wall, null, null, [440, 820, 520, 90], OUT, 5);
      g.fillStyle = B.adF; g.fillRect(460, 835, 230, 60); g.fillStyle = B.asF; g.fillRect(710, 835, 230, 60);
      txt(g, 'VD', 500, 866, 24, '#3567b8', { stroke: false }); txt(g, 'VS', 900, 866, 24, '#c4403a', { stroke: false });
      // septul ventricular + închiderea părții membranoase
      tube(g, [[700, 900], [700, 840]], 14, B.musc, { ow: 4, cap: 'butt' });
      if (s3 > 0) { g.save(); g.globalAlpha = s3; g.fillStyle = B.memb; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(686, 812, 28, 34, 6); g.fill(); g.stroke(); g.restore(); if (b.i === 3) ring(g, 700, 830, 60, 40, ease(b.bt)); }
      const grow = b.i < 0 ? 1 : Math.max(s1, 0.25);
      const pv = tube(g, PT, 54, B.dx, { ow: 7, u1: grow });
      const av = tube(g, AO, 58, B.ox, { ow: 7, u1: grow });
      // pulmonara trece prin spatele aortei jos, în față sus: redesenez segmentul de jos al pulmonarei peste aortă
      tube(g, PT.slice(0, 3), 54, B.dx, { ow: 7, u1: Math.min(1, grow * 1.6) });
      if (s2 > 0 || b.i < 0) { flow(g, pv, t, B.dxL, 6, 0.18, 7, { u1: grow }); flow(g, av, t, B.oxL, 6, 0.18, 7, { u1: grow }); }
      if (s1 > 0.5 || b.i < 0) { txt(g, 'aorta', 520, 470, 22, B.oxL, { align: 'right' }); txt(g, 'trunchiul\npulmonar', 840, 470, 22, B.dxL, { align: 'left' }); }
      if (s2 > 0.3 || b.i < 0) { txt(g, 'din VD', 560, 790, 18, '#c9d8ff'); txt(g, 'din VS', 780, 790, 18, '#ffd0cc'); }
      txt(g, 'roșu = aorta · albastru = trunchiul pulmonar', 688, 80, 17, C.cream);
    },
  };
}

/* =================================================== HARTA ARTERELOR (embrion de 26 de zile, din profil; cranial sus, ventral la stânga ecranului)
   Sângele pleacă din inimă (ventral) → sacul aortic → arcurile aortice urcă DORSAL → aortele dorsale → coboară CAUDAL →
   ramurile ventrale: arterele viteline (spre sacul vitelin) și arterele ombilicale (spre ombilic / placentă).
   Culorile marchează sursa, particulele albe = sensul sângelui. */
export function arteryMap() {
  const HEART = [430, 360];
  const ARCH = [0, 1, 2].map((k) => [[400 + k * 10, 300 + k * 40], [360 + k * 10, 230 + k * 30], [420 + k * 20, 160 + k * 25], [520 + k * 15, 170 + k * 20]]);
  const DA = [[520, 180], [640, 170], [760, 250], [820, 400], [800, 560], [720, 690], [620, 730]];
  const VIT = [[700, 450], [640, 520], [560, 600], [520, 650]];
  const UMB = [[650, 720], [600, 770], [540, 790], [520, 820]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[250, 250], [700, 120], [600, 520], [640, 840]],
    phase: (i) => ['arcurile aortice', 'aorta dorsală', 'arterele viteline', 'arterele ombilicale'][i] || '26 de zile: 4 surse',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4, 0.5);
      // conturul embrionului (C)
      g.save(); g.lineWidth = 6; g.strokeStyle = 'rgba(255,230,210,.45)'; g.fillStyle = 'rgba(255,235,220,.06)';
      g.beginPath(); g.moveTo(300, 260); g.bezierCurveTo(300, 60, 700, 30, 860, 220); g.bezierCurveTo(960, 360, 940, 650, 760, 790); g.bezierCurveTo(680, 850, 560, 850, 520, 800);
      g.bezierCurveTo(600, 760, 700, 650, 720, 520); g.bezierCurveTo(730, 380, 640, 300, 540, 330); g.bezierCurveTo(470, 350, 470, 440, 420, 460); g.bezierCurveTo(330, 480, 290, 380, 300, 260); g.fill(); g.stroke(); g.restore();
      txt(g, 'cranial', 560, 40, 17, C.cream); txt(g, 'dorsal →', 930, 400, 17, C.cream);
      // sacul vitelin
      ell(g, 470, 560, 70, 60, '#f4c34f', { ow: 5 }); txt(g, 'sac vitelin', 470, 560, 16, OUT, { stroke: false });
      // inima
      ell(g, HEART[0], HEART[1], 46, 54, '#e07a76', { ow: 5 }); txt(g, 'inima', 340, 380, 17, '#ffd0cc', { align: 'right' });
      // ombilic + placenta
      ell(g, 520, 865, 90, 34, '#e2569f', { ow: 5 }); txt(g, 'spre placentă', 630, 895, 17, '#ffc0dd', { align: 'left' });
      photo(g, 'vessels26', 14, 560, 290, 140, 'Figura din LP:\nembrion de 26 de zile', 1);
      const glow = (k) => (b.i === k ? 0.9 : 0);
      const dim = (k) => (b.i < 0 || b.i === k ? 1 : 0.45);
      // 2 · aorta dorsală
      const da = tube(g, DA, 22, '#ef8a3a', { ow: 5, glow: glow(1), alpha: dim(1) });
      // 1 · arcurile
      const arcs = ARCH.map((pt) => tube(g, [HEART, ...pt], 12, '#3db06c', { ow: 4, glow: glow(0), alpha: dim(0) }));
      // 3 · viteline
      const vit = tube(g, VIT, 12, '#f0c020', { ow: 4, glow: glow(2), alpha: dim(2) });
      [-30, 30].forEach((dx) => tube(g, [[520, 650], [490 + dx, 610]], 7, '#f0c020', { ow: 3, alpha: dim(2) }));
      // 4 · ombilicale
      const umb = tube(g, [...UMB, [520, 840]], 12, '#e2569f', { ow: 4, glow: glow(3), alpha: dim(3) });
      // sensul sângelui
      arcs.forEach((a) => flow(g, a, t, '#fff', 3, 0.22, 5));
      flow(g, da, t, '#fff', 7, 0.12, 6); flow(g, vit, t, '#fff', 3, 0.25, 5); flow(g, umb, t, '#fff', 3, 0.25, 5);
      const L = [['arcurile aortice', 330, 170, 0], ['aorta dorsală', 760, 160, 1], ['a. vitelină', 610, 470, 2], ['a. ombilicală', 700, 790, 3]];
      L.forEach(([s, x, y, k]) => txt(g, s, x, y, 19, b.i === k ? C.hi : C.cream, { alpha: dim(k) }));
    },
  };
}

/* =================================================== ARCURILE AORTICE (1): I, II, III, V
   Schemă frontală: sacul aortic jos-centru → urcă pe linia mediană → fiecare arc pleacă lateral spre cele 2 aorte dorsale →
   aortele dorsale duc sângele CAUDAL (în jos). Intro: arcurile apar cranio-caudal (I → VI) și I, II dispar când apar IV și VI. */
const ACOL = ['#9a8fa8', '#c79a5a', '#3db06c', '#d2524a', '#9a8a8a', '#4a78d6'];
export function arches1() {
  const LX = 170, RX = 830, Y = (k) => 200 + k * 108;
  const DERIV = ['a. maxilară', 'a. hioidă + a. stapediană', 'carotida comună + internă (proximal)', '→ slide-ul următor', 'dispare complet', '→ slide-ul următor'];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[500, Y(0) - 40], [500, Y(1) - 40], [500, Y(2) - 40], [500, Y(4) - 40]],
    phase: (i) => ['arcul I', 'arcul II', 'arcul III', 'arcul V'][i] || 'apar cranio-caudal (S4–S5)',
    draw(g, t, b) {
      bg(g);
      // vizibilitatea fiecărui arc: pe intro, în ordine cranio-caudală, cu I–II care dispar când apar IV–VI
      const cyc = REDUCED ? 0.999 : loopT(t, 9);
      const vis = (k) => { if (b.i >= 0) return k === 4 ? (b.i === 3 ? 1 - ease(clamp(b.bt / (b.bd * 0.5))) * 0.85 : b.i > 3 ? 0.15 : 1) : 1;
        const ap = clamp((cyc * 8 - k) * 1.5); const gone = k < 2 ? clamp((cyc * 8 - 4.5 - k) * 1.2) : k === 4 ? clamp((cyc * 8 - 6.4) * 1.5) : 0; return ap * (1 - gone * 0.85); };
      // aortele dorsale (sângele coboară)
      [LX, RX].forEach((x) => { tube(g, [[x, 140], [x, 820]], 34, '#e8a59f', { ow: 6 }); flow(g, [[x, 140], [x, 820]], t, '#fff', 6, 0.12, 6); });
      txt(g, 'aorta dorsală', LX, 100, 18, C.cream); txt(g, 'aorta dorsală', RX, 100, 18, C.cream);
      // sacul aortic + tulpina mediană
      tube(g, [[500, 860], [500, Y(0)]], 26, '#e8a59f', { ow: 6 });
      ell(g, 500, 860, 80, 36, '#f0c020', { ow: 5 }); txt(g, 'sac aortic', 500, 860, 17, OUT, { stroke: false });
      flow(g, [[500, 860], [500, Y(0)]], t, '#fff', 5, 0.15, 6);
      for (let k = 0; k < 6; k++) {
        const a = vis(k); if (a <= 0.02) continue; const y = Y(k);
        const act = b.i >= 0 && [0, 1, 2, 4][b.i] === k;
        const dash = k === 4 && b.i >= 3 ? [12, 10] : null;
        [[500, LX], [500, RX]].forEach(([x0, x1]) => { const P2 = [[x0, y], [x1, y]]; tube(g, P2, 24, ACOL[k], { ow: 5, alpha: a, glow: act ? 0.8 : 0, dash }); if (a > 0.5 && !dash) flow(g, P2, t, '#fff', 3, 0.2, 5, { alpha: a }); });
        pill(g, 500, y, 56, 40, '#fff3e6', ['I', 'II', 'III', 'IV', 'V', 'VI'][k], { size: 20, alpha: Math.max(a, 0.35) });
        if (b.i >= 0 || a > 0.5) txt(g, DERIV[k], 680, y - 32, 17, act ? C.hi : C.cream, { alpha: Math.max(0.35, a), w: 700 });
      }
      // III: carotida externă = mugure din arcul III (în plus față de LP); restul carotidei interne = aorta dorsală
      if (b.i === 2 || b.i < 0) { const g2 = b.i === 2 ? ease(clamp(b.bt / (b.bd * 0.6))) : 1; tube(g, [[300, Y(2)], [290, Y(2) - 60 * g2]], 10, '#8fe0a8', { ow: 4 }); if (b.i === 2) { txt(g, 'carotida externă:\nmugure din III', 312, Y(2) - 50, 16, '#bff0d2', { align: 'left' }); tube(g, [[LX, Y(2)], [LX, 140]], 12, '#3db06c', { ow: 0, alpha: 0.9 * g2 }); txt(g, 'restul carotidei interne\n= aorta dorsală', LX + 30, 170, 15, '#bff0d2', { align: 'left', alpha: g2 }); } }
    },
  };
}

/* =================================================== ARCURILE AORTICE (2): IV și VI, stânga ≠ dreapta
   Vedere frontală (dreapta pacientului = stânga ecranului). Ce trebuie să se vadă:
   aorta ascendentă (gri, din trunchi) → arcul aortei (IV stâng, roșu) care trece spre stânga pacientului (dreapta ecranului) și coboară;
   din arc: trunchiul brahiocefalic → subclavia dreaptă (proximal = IV drept, roșu; distal gri) + carotida comună dreaptă (verde, III);
   carotida comună stângă (verde); subclavia stângă (gri, NU din arcuri).
   Trunchiul pulmonar (gri) → a. pulmonară stângă proximal (VI stâng, albastru) + canalul arterial (VI stâng) spre arc;
   a. pulmonară dreaptă proximal (VI drept, albastru); VI drept distal dispare (punctat).
   N. laringeu recurent (galben): stânga ocolește pe sub canal/arcul aortei; dreapta ocolește pe sub subclavia dreaptă. */
export function arches2() {
  const ASC = [[500, 800], [500, 600], [510, 470]];
  const ARC = [[510, 470], [560, 380], [680, 370], [740, 460], [745, 600], [745, 880]];
  const BCT = [[540, 400], [460, 300]];
  const RSUBp = [[460, 300], [360, 290]], RSUBd = [[360, 290], [170, 300]];
  const RCC = [[460, 300], [450, 110]], LCC = [[600, 375], [600, 110]];
  const LSUB = [[690, 385], [880, 260]];
  const PT = [[580, 860], [580, 700], [600, 650]];
  const LPA = [[600, 650], [880, 640]], RPA = [[600, 650], [300, 680]];
  const RPAd = [[300, 680], [250, 520]];
  const DUCT = [[690, 645], [742, 540]];
  const NL = [[810, 80], [800, 420], [790, 600], [760, 660], [720, 640], [660, 560], [630, 300], [640, 80]];
  const NR = [[300, 80], [300, 260], [320, 330], [370, 320], [380, 260], [390, 80]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[640, 330], [400, 335], [840, 590], [330, 625]],
    phase: (i) => ['IV stâng → arcul aortei', 'IV drept → subclavia dr. (proximal)', 'VI stâng → a. pulmonară stg. + canal arterial', 'VI drept → a. pulmonară dr. (proximal)'][i] || 'stânga ≠ dreapta',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4, 0.55);
      const G = B.gray; const hi = (k) => (b.i === k ? 0.85 : 0);
      txt(g, '← dreapta pacientului', 150, 905, 17, C.cream); txt(g, 'stânga pacientului →', 860, 905, 17, C.cream);
      // gri = nu din arcuri
      tube(g, PT, 46, G, { ow: 6 }); txt(g, 'trunchiul pulmonar', 600, 900, 17, C.cream);
      tube(g, ASC, 50, G, { ow: 6 }); txt(g, 'aorta ascendentă', 470, 835, 17, C.cream, { align: 'right' });
      tube(g, RSUBd, 26, G, { ow: 5 }); tube(g, LSUB, 26, G, { ow: 5 }); txt(g, 'subclavia stg.\n(nu din arcuri)', 880, 210, 16, C.cream);
      tube(g, ARC.slice(3), 44, G, { ow: 6 }); // aorta descendentă (aorta dorsală)
      // III: carotidele (verde)
      tube(g, RCC, 22, '#3db06c', { ow: 5 }); tube(g, LCC, 22, '#3db06c', { ow: 5 }); txt(g, 'carotidele (III)', 525, 90, 17, '#bff0d2');
      // IV
      tube(g, ARC.slice(0, 4), 48, '#d2524a', { ow: 6, glow: hi(0) }); txt(g, 'arcul aortei (IV stg.)', 640, 300, 18, '#ffd0cc');
      tube(g, BCT, 28, '#d2524a', { ow: 5 });
      tube(g, RSUBp, 26, '#d2524a', { ow: 5, glow: hi(1) }); txt(g, 'subclavia dr.\n(IV dr., proximal)', 250, 240, 16, '#ffd0cc');
      // VI
      tube(g, LPA, 30, B.dx, { ow: 5, glow: hi(2) }); txt(g, 'a. pulmonară stg.', 880, 690, 16, '#c9d8ff');
      tube(g, RPA, 30, B.dx, { ow: 5, glow: hi(3) }); txt(g, 'a. pulmonară dr.\n(VI dr., proximal)', 250, 750, 16, '#c9d8ff');
      const s3 = p(3);
      tube(g, RPAd, 18, B.dx, { ow: 4, dash: [10, 9], alpha: 1 - 0.75 * s3 }); if (b.i === 3) txt(g, 'VI dr. distal\ndispare', 220, 470, 16, C.hi);
      const s2 = p(2);
      tube(g, DUCT, 20, '#6f8fe0', { ow: 5, glow: hi(2) }); txt(g, 'canal arterial\n(VI stg.)', 600, 590, 16, '#c9d8ff', { align: 'right' });
      // nervii laringei recurenți (galben): animați pe punctele 2 (stânga) și 3 (dreapta)
      const nl = b.i < 0 ? 1 : b.i === 2 ? s2 : b.i > 2 ? 1 : 0.0; const nr = b.i < 0 ? 1 : b.i === 3 ? s3 : 0;
      if (nl > 0) { tube(g, NL, 8, B.nerve, { ow: 3, u1: nl }); if (nl > 0.9) txt(g, 'n. laringeu recurent stg.\nocolește arcul aortei', 860, 470, 15, '#ffeaa0'); }
      if (nr > 0) { tube(g, NR, 8, B.nerve, { ow: 3, u1: nr }); if (nr > 0.9) txt(g, 'n. laringeu recurent dr.\nsub subclavia dr.', 300, 370, 15, '#ffeaa0'); }
      // sânge: din aorta ascendentă în arc și ramuri; din trunchiul pulmonar în pulmonare
      flow(g, curve([...ASC, ...ARC.slice(1)]), t, '#fff', 9, 0.1, 6);
      flow(g, curve([...PT, [740, 646], [880, 640]]), t, '#fff', 5, 0.14, 5);
    },
  };
}

/* =================================================== AORTA DORSALĂ + VITELINE + OMBILICALE
   A (sus-stânga): două aorte dorsale paralele fuzionează treptat, ca un fermoar, într-o singură aortă descendentă.
   B (sus-dreapta): secțiune transversală prin aortă: ventral (jos, spre intestin) = ramuri viscerale impare; lateral = organe pereche;
   dorsal (sus) = intersegmentare spre peretele corpului. Sângele pleacă DIN aortă în ramuri.
   C (jos, din profil; cranial la stânga): aorta orizontală; arterele viteline coboară spre sacul vitelin, apoi rămân 3 trunchiuri
   (celiac, AMS, AMI) spre intestin; arterele ombilicale: proximal → a. iliacă, distal → lig. ombilical medial (gri, fără flux). */
export function aortaBr() {
  const AX = 175, CX = 660, CY = 250;
  const AOR = [[60, 560], [930, 560]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[AX + 110, 120], [CX, 400], [CX + 230, 150], [850, 640], [770, 870]],
    phase: (i) => ['aorte dorsale pereche', 'ventrale = viteline → celiac, AMS, AMI', 'laterale + intersegmentare', 'ombilicale proximal → iliace', 'ombilicale distal → ligament'][i] || 'aorta și ramurile ei',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5, 0.55);
      panel(g, 14, 40, 330, 440); panel(g, 360, 40, 626, 440); panel(g, 14, 495, 972, 425);
      // ----- A: fuziunea
      const s0 = p(0); const zip = lerp(430, 130, b.i < 0 ? 1 : s0);
      [-1, 1].forEach((s) => tube(g, [[AX + s * 50, 70], [AX + s * 50, zip], [AX + s * 14, zip + 40]], 26, B.mx, { ow: 5 }));
      tube(g, [[AX, zip + 30], [AX, 460]], 40, B.mx, { ow: 6 });
      flow(g, [[AX - 50, 70], [AX - 50, zip], [AX, zip + 40], [AX, 460]], t, '#fff', 4, 0.2, 5); flow(g, [[AX + 50, 70], [AX + 50, zip], [AX, zip + 40], [AX, 460]], t, '#fff', 4, 0.2, 5);
      txt(g, 'pereche', AX + 90, 100, 16, C.cream, { align: 'left' }); txt(g, 'fuziune', AX + 40, zip + 30, 16, C.hi, { align: 'left' }); txt(g, 'aorta\ndescendentă', AX + 30, 430, 15, C.cream, { align: 'left' });
      // ----- B: secțiunea transversală
      txt(g, 'secțiune transversală', CX, 64, 17, '#ffd2b8');
      txt(g, 'dorsal ↑', 420, 100, 15, C.cream, { align: 'left' }); txt(g, 'ventral ↓', 420, 460, 15, C.cream, { align: 'left' });
      const s1 = p(1), s2 = p(2);
      // dorsal: intersegmentare (în sus, în evantai)
      [-0.5, -0.15, 0.15, 0.5].forEach((d, k) => { const a = -Math.PI / 2 + d * 1.6; const L = 140 * s2; if (L > 2) { const P2 = [[CX, CY], [CX + Math.cos(a) * (40 + L), CY + Math.sin(a) * (40 + L)]]; tube(g, P2, 10, B.mx, { ow: 4 }); flow(g, P2, t, '#fff', 2, 0.35, 4); } });
      if (s2 > 0.5) { txt(g, 'intersegmentare (somatice):\nintercostale, lombare', CX, 80 + 30, 15, C.cream, { alpha: 1 }); }
      // lateral: organele pereche
      [-1, 1].forEach((s) => { const L = 170 * s2; if (L > 2) { const P2 = [[CX, CY], [CX + s * (40 + L), CY + 30]]; tube(g, P2, 12, B.mx, { ow: 4 }); flow(g, P2, t, '#fff', 2, 0.35, 4); } ell(g, CX + s * 250, CY + 34, 46, 60, '#e3c1e6', { ow: 4, alpha: Math.max(0.3, s2) }); });
      if (s2 > 0.5) txt(g, 'laterale: renale,\nsuprarenale,\ngonadale, frenice', CX - 250, CY + 150, 14, C.cream);
      // ventral: spre intestin
      const Lv = 120 * s1; if (Lv > 2) { const P2 = [[CX, CY], [CX, CY + 40 + Lv]]; tube(g, P2, 14, B.mx, { ow: 4 }); flow(g, P2, t, '#fff', 2, 0.35, 4); }
      ell(g, CX, CY + 190, 44, 36, '#f4c34f', { ow: 4, alpha: Math.max(0.3, s1) }); txt(g, 'intestin', CX, CY + 190, 14, OUT, { stroke: false });
      if (s1 > 0.5) txt(g, 'ventrale (viteline): celiac,\nAMS, AMI; bronșice, esofagiene', CX + 210, CY + 175, 14, C.cream);
      ell(g, CX, CY, 40, 40, B.mx, { ow: 5 }); txt(g, 'aorta', CX, CY, 14, '#fff');
      // ----- C: profil
      txt(g, 'din profil: cranial ←', 140, 525, 16, '#ffd2b8');
      tube(g, AOR, 34, B.mx, { ow: 6 }); txt(g, 'aorta dorsală', 120, 600, 16, C.cream);
      flow(g, AOR, t, '#fff', 8, 0.08, 5);
      tube(g, [[100, 760], [600, 760]], 40, '#f4c34f', { ow: 5 }); txt(g, 'tubul digestiv', 160, 760, 15, OUT, { stroke: false });
      // arterele viteline: la început o rețea spre sacul vitelin, apoi 3 trunchiuri spre intestin
      const vx = [250, 380, 520]; const VN = ['trunchi celiac', 'AMS', 'AMI'];
      const rem = b.i < 0 ? 1 : b.i >= 1 ? ease(clamp((b.bt / b.bd - (b.i === 1 ? 0.35 : -1)) / 0.4)) : 0;
      ell(g, 380, 880, 60, 30, '#f4c34f', { ow: 4, alpha: 1 - rem * 0.7 }); txt(g, 'sac vitelin', 380, 880, 14, OUT, { stroke: false, alpha: 1 - rem * 0.7 });
      vx.forEach((x, k) => {
        const P1 = [[x, 575], [x, 742]]; tube(g, P1, 14, B.mx, { ow: 4, glow: b.i === 1 ? 0.6 : 0 }); flow(g, P1, t, '#fff', 2, 0.3, 4);
        if (rem < 1) tube(g, [[x, 778], [380 + (x - 380) * 0.2, 856]], 10, B.mx, { ow: 3, alpha: 1 - rem, dash: rem > 0 ? [8, 6] : null });
        txt(g, VN[k], x + 10, 640, 15, b.i === 1 ? C.hi : C.cream, { align: 'left', alpha: Math.max(0.4, rem) });
      });
      // arterele ombilicale
      const s3 = p(3), s4 = p(4);
      const UP = [[760, 575], [790, 660], [830, 720]]; const UD = [[830, 720], [880, 800], [930, 880]];
      tube(g, UP, 16, B.dx, { ow: 4, glow: b.i === 3 ? 0.7 : 0 }); flow(g, UP, t, '#fff', 2, 0.3, 4);
      const ligC = s4 > 0.5 ? B.lig : B.dx;
      tube(g, UD, 14, ligC, { ow: 4, glow: b.i === 4 ? 0.7 : 0 }); if (s4 < 0.5) flow(g, UD, t, '#fff', 2, 0.3, 4);
      ell(g, 940, 890, 40, 22, '#e2569f', { ow: 4, alpha: 1 - s4 * 0.6 }); txt(g, 'placenta', 940, 860 - 0, 14, '#ffc0dd', { alpha: 1 - s4 * 0.6 });
      if (s3 > 0.3) txt(g, 'proximal →\na. iliacă (LP)', 700, 690, 15, C.hi, { align: 'right' });
      if (s4 > 0.5) txt(g, 'distal → lig.\nombilical medial', 870, 640, 15, '#e8ddd4', { align: 'right' });
      txt(g, 'a. ombilicală', 790, 610, 15, C.cream, { align: 'left', alpha: s3 > 0.3 ? 0 : 1 });
    },
  };
}
