// LP 3 (digestiv + respirator) — scene noi, desenate pentru recapitulare (LP 3 nu are încă deck animat).
// Culori: endoderm galben; preenteron / mesenteron / metenteron = galben / somon / mov; arterele roșu.
import { OUT, clamp, lerp, ease, paint, glowRing, REDUCED } from './kit2d.js';
import { HOME, cam, lbl, bg, panel, txt, pill, tube, dot, ell, arr, lead, loopT, C, N } from './l6/ek.js';

const FG = '#f4c34f', MG = '#f2937a', HG = '#a98ae6', ART = '#e0443e', LIV = '#a8643c', BUD = '#3db06c';
const CR = '#f08a9a', CO = '#f4a14f'; // brațul cranial (intestin subțire) / brațul caudal (colon)
const OFF = [-99999, -99999];
const prog = (b, k, f = 0.7) => (b.i < 0 ? 1 : b.i > k ? 1 : b.i < k ? 0 : ease(clamp(b.bt / (b.bd * f))));

/* =========================================================== HARTA: tubul intestinal, 3 segmente, 3 artere (secțiune sagitală)
   Ce trebuie să se vadă: dorsal sus (aorta), ventral jos; cranial în stânga. Tubul e colorat pe segmente;
   pe punctul k se aprinde segmentul k și artera lui; punctul 4 = mugurii (ficat, plămân). */
export function gutMap() {
  const FGp = [[120, 372], [200, 366], [280, 372]]; // faringe → esofag
  const ST = [[280, 372], [330, 392], [390, 400], [440, 386], [470, 380]];
  const MGp = [[470, 380], [500, 400], [520, 470], [548, 560], [580, 590], [612, 560], [622, 470], [640, 410], [680, 392]];
  const HGp = [[680, 392], [740, 396], [800, 410], [840, 428]];
  return {
    home: HOME,
    anchors: [[175, 368], [521, 470], [705, 393], [462, 470]],
    phase: (i) => ['preenteron · a. celiacă', 'mesenteron · a. mezenterică superioară', 'metenteron · a. mezenterică inferioară', 'mugurii: ficat, pancreas, plămân'][i] || 'S3 → S4: 3 segmente, 3 artere',
    draw(g, t, b) {
      bg(g);
      txt(g, 'DORSAL ↑ · VENTRAL ↓', 160, 880, 17, '#d8c4b8', { w: 700 }); txt(g, '← cranial · caudal →', 840, 880, 17, '#d8c4b8', { w: 700 });
      // corpul embrionului (contur simplificat)
      const body = new Path2D(); body.moveTo(90, 300); body.bezierCurveTo(200, 150, 700, 150, 900, 300); body.bezierCurveTo(960, 420, 930, 560, 860, 600); body.bezierCurveTo(760, 660, 700, 650, 660, 640); body.lineTo(520, 640); body.bezierCurveTo(380, 650, 200, 600, 110, 520); body.bezierCurveTo(60, 460, 60, 360, 90, 300); body.closePath();
      paint(g, body, 'rgba(240,220,203,.16)', null, null, [60, 150, 900, 500], 'rgba(255,230,210,.35)', 3);
      // aorta dorsală + cele 3 artere
      tube(g, [[150, 230], [500, 222], [860, 236]], 22, ART, { ow: 6 });
      txt(g, 'aorta dorsală', 500, 190, 19, '#ffb0a8');
      const arts = [[[380, 232], [390, 300], [395, 380]], [[548, 228], [548, 330], [566, 450], [580, 560]], [[748, 234], [748, 310], [752, 392]]];
      arts.forEach((pts, k) => { const on = b.i === k; tube(g, pts, on ? 14 : 10, ART, { ow: 5, glow: on ? 0.7 : 0 }); });
      txt(g, 'a. celiacă', 455, 300, 17, '#ffb0a8'); txt(g, 'a. mezenterică sup.', 650, 290, 17, '#ffb0a8'); txt(g, 'a. mezenterică inf.', 850, 330, 16, '#ffb0a8');
      // sacul vitelin + ductul vitelin; alantoida
      tube(g, [[580, 600], [580, 680]], 12, '#f6d98a', { ow: 5 }); ell(g, 580, 760, 90, 78, '#f6d98a', { ow: 6 });
      txt(g, 'sac vitelin', 580, 760, 18, OUT, { stroke: false }); txt(g, 'duct vitelin', 690, 660, 16, '#f6e3b4');
      tube(g, [[860, 450], [880, 520], [870, 610]], 12, '#f6d98a', { ow: 5 }); txt(g, 'alantoida', 905, 660, 16, '#f6e3b4');
      // tubul pe segmente
      const glow = (k) => (b.i === k ? 0.8 : 0);
      tube(g, FGp, 34, FG, { ow: 7, glow: glow(0) }); tube(g, ST, 50, FG, { ow: 7, glow: glow(0) });
      tube(g, MGp, 30, MG, { ow: 7, glow: glow(1) });
      tube(g, HGp, 30, HG, { ow: 7, glow: glow(2) }); ell(g, 852, 440, 34, 40, HG, { ow: 6 });
      // membranele
      g.save(); g.strokeStyle = '#5b9be8'; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(108, 350); g.lineTo(108, 394); g.stroke(); g.beginPath(); g.moveTo(836, 482); g.lineTo(872, 478); g.stroke(); g.restore();
      txt(g, 'membrana\nbucofaringiană', 120, 445, 15, '#cfe0ff'); txt(g, 'membrana\ncloacală', 915, 545, 15, '#cfe0ff');
      txt(g, 'stomac', 380, 452, 17, '#fff3c4'); txt(g, 'cloaca', 852, 440, 15, OUT, { stroke: false });
      // mugurii
      const g4 = b.i === 3 ? 0.8 : 0;
      tube(g, [[236, 380], [228, 430], [214, 470]], 16, BUD, { ow: 5, glow: g4 }); txt(g, 'diverticul\nrespirator (S4)', 205, 525, 15, '#c9f0d8');
      tube(g, [[462, 398], [458, 450], [446, 492]], 18, BUD, { ow: 5, glow: g4 }); ell(g, 440, 512, 30, 22, LIV, { ow: 5, alpha: 0.9 }); txt(g, 'diverticul\nhepatic (S3)', 380, 570, 15, '#c9f0d8');
      // etichetele segmentelor
      pill(g, 175, 300, 170, 38, FG, 'preenteron', { size: 17, ow: 4 });
      pill(g, 470, 615, 170, 38, MG, 'mesenteron', { size: 17, ow: 4 });
      pill(g, 730, 470, 170, 38, HG, 'metenteron', { size: 17, ow: 4 });
      if (b.i >= 0 && b.i < 3) glowRing(g, [300, 570, 770][b.i], [380, 480, 410][b.i], [210, 110, 110][b.i], [70, 150, 70][b.i], 0, ease(clamp(b.bt * 1.5)));
    },
  };
}

/* =========================================================== STOMACUL: rotația 1 (90° orar, ax longitudinal) — ANIMAT
   Ce trebuie să se vadă: secțiune transversală privită dinspre cranial: posterior sus, anterior jos, dreapta pacientului în stânga imaginii.
   Stomacul se rotește 90° în sens orar: mezogastrul dorsal ajunge în stânga pacientului (dreapta imaginii), partea stângă (vagul stâng) ajunge în față,
   ficatul (în mezogastrul ventral) ajunge în dreapta pacientului; în spatele stomacului apare bursa omentală; peretele dorsal devine marea curbură. */
export function stomachRot() {
  const CX = 500, CY = 470;
  const rot = (x, y, a) => [CX + x * Math.cos(a) - y * Math.sin(a), CY + x * Math.sin(a) + y * Math.cos(a)];
  let S = 0;
  const state = (b, t) => { if (b.i < 0) { const u = loopT(t, 9); return ease(clamp((u - 0.15) / 0.5)) * (u < 0.92 ? 1 : 1 - (u - 0.92) / 0.08); } if (b.i === 0) return 0; if (b.i === 1) return ease(clamp(b.bt / (b.bd * 0.6))); return 1; };
  return {
    home: HOME,
    // 4 = mezogastrul ventral (→ omentul mic + lig. falciform), la jumătatea drumului stomac → ficat
    anchors: [() => rot(60, -22, S * Math.PI / 2), () => { const a = S; return [CX + 40 + 120 * a, 300 - 10 * a]; }, () => rot(105, 0, S * Math.PI / 2), () => { const v = rot(0, 70, S * Math.PI / 2); return [(v[0] + lerp(CX, CX - 120, S)) / 2 - 26, (v[1] + 600) / 2]; }],
    phase: (i) => ['S4: dilatare fusiformă + 2 mezogastre', 'rotația 1: 90° orar', 'vagul stâng → anterior · marea curbură', 'rotația 2: ax antero-posterior'][i] || 'stomacul, privit dinspre cranial',
    draw(g, t, b) {
      bg(g); const s = state(b, t); S = s; const a = s * Math.PI / 2;
      // peretele corpului
      ell(g, CX, CY, 360, 360, 'rgba(243,194,155,.10)', { ow: 6, sc: 'rgba(255,220,190,.55)' });
      txt(g, 'POSTERIOR', CX, 72, 20, '#d8c4b8'); txt(g, 'ANTERIOR', CX, 872, 20, '#d8c4b8');
      txt(g, 'dr.', 92, CY, 24, '#ffe0c8'); txt(g, 'stg.', 908, CY, 24, '#ffe0c8');
      txt(g, 'secțiune transversală, privită dinspre cranial', CX, 905, 15, '#c9b3a6', { w: 600 });
      // coloana + aorta (posterior)
      ell(g, CX, 160, 62, 44, '#e6d2a8', { ow: 5 }); dot(g, CX + 70, 206, 18, ART, { ow: 4 });
      // bursa omentală (apare în spatele stomacului)
      if (s > 0.05) { g.save(); g.globalAlpha = 0.65 * s; g.setLineDash([10, 8]); g.fillStyle = 'rgba(169,138,230,.35)'; g.strokeStyle = '#d9c6ff'; g.lineWidth = 4; g.beginPath(); g.ellipse(CX - 70, 330, 120 * s + 10, 58 * s + 6, -0.2, 0, 7); g.fill(); g.stroke(); g.restore(); txt(g, 'bursa omentală', CX - 210, 265, 18, '#e3d6ff', { alpha: s }); }
      // mezogastrul dorsal: rădăcina fixă la peretele posterior, capătul pe stomac (marea curbură)
      const Sd = rot(0, -80 - 18 * s, a); const md = [CX + 40 + 120 * s, 300 - 10 * s];
      tube(g, [[CX, 210], md, Sd], 16, '#f2a39b', { ow: 5, glow: b.i === 1 ? 0.6 : 0 });
      // mezogastrul ventral + ficatul
      const Sv = rot(0, 70, a); const lv = [CX - 175 * s, 650 - 30 * s];
      tube(g, [Sv, [lerp(CX, CX - 120, s), lerp(600, 600, s)], lv, [CX, 820]], 14, '#f2a39b', { ow: 5 });
      ell(g, lv[0], lv[1], 120, 72, LIV, { ow: 6 }); txt(g, 'ficat', lv[0], lv[1], 20, '#ffe9d6');
      // stomacul (peretele dorsal crește mai repede → marea curbură)
      g.save(); g.translate(CX, CY); g.rotate(a);
      const p = new Path2D(); p.moveTo(-95, 0); p.bezierCurveTo(-95, -70 - 30 * s, 95, -70 - 30 * s, 95, 0); p.bezierCurveTo(95, 60, -95, 60, -95, 0); p.closePath();
      paint(g, p, FG, '#d19a22', '#ffe39a', [-95, -100, 190, 160], OUT, 7);
      g.restore();
      txt(g, 'stomac', CX, CY - 4, 22, OUT, { stroke: false });
      // vagii: stângul pe fața stângă, dreptul pe fața dreaptă
      const vL = rot(105, 0, a), vR = rot(-105, 0, a);
      dot(g, vL[0], vL[1], 16, '#ffe36e', { ow: 4 }); dot(g, vR[0], vR[1], 16, '#ffe36e', { ow: 4 });
      txt(g, 'vag stg.', vL[0] + 70 * Math.cos(a) + 70 * Math.sin(a), vL[1] + 30 * Math.cos(a), 17, '#fff3b0'); txt(g, 'vag dr.', vR[0] - 70 * Math.cos(a) + 70 * Math.sin(a), vR[1] - 30 * Math.cos(a), 17, '#fff3b0');
      txt(g, s > 0.6 ? 'marea curbură' : 'peretele dorsal', Sd[0] + 110 * s + 40, Sd[1] - 34 + 70 * s, 17, '#ffe39a');
      txt(g, 'mezogastru dorsal', md[0] + 120, md[1] - 40, 16, '#ffd0c8'); txt(g, 'mezogastru\nventral', CX + 120, 740, 16, '#ffd0c8');
      // săgeata de rotație
      if (b.i === 1 || b.i < 0) { g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.arc(CX, CY, 175, -Math.PI / 2, -Math.PI / 2 + Math.max(0.05, a)); g.stroke(); g.restore(); const e = [CX + 175 * Math.cos(-Math.PI / 2 + a), CY + 175 * Math.sin(-Math.PI / 2 + a)]; dot(g, e[0], e[1], 10, '#ffe36e', { ow: 3 }); txt(g, '90° orar', CX + 228, CY - 92, 22, '#ffe36e'); }
    },
  };
}

/* =========================================================== ANSA INTESTINALĂ: 270° antiorar în jurul a. mezenterice superioare — ANIMAT
   Ce trebuie să se vadă: vedere din față (dreapta pacientului = stânga imaginii). Axa a. mezenterice superioare e văzută „din capăt” (punctul roșu din centru).
   Brațul cranial (roz, intestin subțire) pornește sus, brațul caudal (portocaliu, cu mugurele cecal C) jos. Rotația e antiorară pe ecran:
   0° (S5–S6) → 90° în hernie (S6–S10: brațul caudal ajunge în stânga pacientului) → încă 180° la retragere (S10): cecul ajunge în dreapta, sub ficat;
   apoi cecul coboară în fosa iliacă dreaptă (cadrul colic). Mini-panoul din dreapta sus arată ansa în / în afara abdomenului (hernia). sceneOpts.freeze = 90 → malrotația. */
export function ansa({ spec } = {}) {
  const O = (spec && spec.sceneOpts) || {};
  const CX = 400, CY = 500, LEN = 205;
  let TH = 0, FIN = 0;
  const state = (b, t) => {
    if (O.freeze !== undefined) return { th: O.freeze, out: 0, fin: 0 };
    if (b.i < 0) { const u = loopT(t, 14); const th = u < 0.12 ? 0 : u < 0.4 ? 90 * ease((u - 0.12) / 0.28) : u < 0.7 ? 90 + 180 * ease((u - 0.4) / 0.3) : 270; return { th, out: u > 0.1 && u < 0.45 ? 1 : 0, fin: ease(clamp((u - 0.74) / 0.14)) * (u > 0.96 ? 0 : 1) }; }
    const e = ease(clamp(b.bt / (b.bd * 0.65)));
    if (b.i === 0) return { th: 0, out: 0, fin: 0 };
    if (b.i === 1) return { th: 90 * e, out: Math.min(1, e * 3), fin: 0 };
    if (b.i === 2) return { th: 90 + 180 * e, out: 1 - Math.min(1, e * 3), fin: 0 };
    return { th: 270, out: 0, fin: e };
  };
  const dirC = () => -Math.PI / 2 - TH * Math.PI / 180; // brațul cranial: sus, rotit antiorar pe ecran
  const tip = (ang, r) => [CX + Math.cos(ang) * r, CY + Math.sin(ang) * r];
  return {
    home: HOME,
    anchors: O.freeze !== undefined ? [[CX, CY - 40], () => tip(dirC() + Math.PI, LEN - 30), [CX - 150, CY - 150]] : [() => (FIN > 0.3 ? OFF : tip(dirC(), LEN * 0.55)), [790, 200], () => (FIN > 0.5 ? [250, 690] : tip(dirC() + Math.PI, LEN - 50)), () => (FIN > 0.3 ? [CX + 200, 335] : OFF)],
    phase: (i) => (O.freeze !== undefined ? 'rotația s-a oprit la 90°' : ['S5–S6: pornirea (0°)', 'S6–S10: hernia fiziologică · +90°', 'S10: retragerea · +180°', 'cadrul colic'][i] || '270° antiorar în jurul a. mezenterice superioare'),
    draw(g, t, b) {
      bg(g); const s = state(b, t); TH = s.th; FIN = s.fin;
      txt(g, 'vedere din față · dreapta pacientului = stânga imaginii', 420, 905, 16, '#c9b3a6', { w: 600 });
      txt(g, 'dr.', 70, 470, 24, '#ffe0c8'); txt(g, 'stg.', 760, 470, 24, '#ffe0c8');
      // peretele abdominal + ficatul (dreapta pacientului, sus)
      const ab = new Path2D(); ab.roundRect(110, 110, 590, 760, 120); paint(g, ab, 'rgba(243,194,155,.10)', null, null, [110, 110, 590, 760], 'rgba(255,220,190,.55)', 6);
      const lv = new Path2D(); lv.moveTo(130, 170); lv.bezierCurveTo(260, 130, 470, 140, 560, 190); lv.bezierCurveTo(470, 260, 300, 300, 150, 300); lv.closePath(); paint(g, lv, LIV, '#7e4528', null, [130, 140, 430, 160], OUT, 6);
      txt(g, 'ficat', 300, 215, 20, '#ffe9d6');
      const a0 = 1 - s.fin;
      // cordonul ombilical (în hernie ansa e acolo)
      if (s.out > 0.02) { g.save(); g.globalAlpha = s.out; g.setLineDash([12, 10]); g.strokeStyle = '#bfe6ff'; g.lineWidth = 5; g.beginPath(); g.arc(CX, CY, LEN + 40, 0, 7); g.stroke(); g.restore(); txt(g, 'în cordonul ombilical', CX, CY + LEN + 70, 19, '#bfe6ff', { alpha: s.out }); }
      if (a0 > 0.01) {
        g.save(); g.globalAlpha = a0;
        const dc = dirC(), dk = dc + Math.PI;
        // brațul cranial = anse de intestin subțire (val), brațul caudal = colon + mugurele cecal
        const coil = []; for (let k = 0; k <= 26; k++) { const u = k / 26, r = 40 + u * (LEN - 40), w = Math.sin(u * Math.PI * 5) * 32 * Math.min(1, u * 3); coil.push([CX + Math.cos(dc) * r - Math.sin(dc) * w, CY + Math.sin(dc) * r + Math.cos(dc) * w]); }
        tube(g, coil, 30, CR, { raw: true, ow: 7 });
        tube(g, [tip(dk, 30), tip(dk, LEN - 30), tip(dk, LEN)], 34, CO, { ow: 7 });
        const cb = tip(dk, LEN - 50); const n = [Math.cos(dk + Math.PI / 2), Math.sin(dk + Math.PI / 2)];
        tube(g, [cb, [cb[0] + n[0] * 44, cb[1] + n[1] * 44]], 22, BUD, { ow: 5 }); txt(g, 'C', cb[0] + n[0] * 60, cb[1] + n[1] * 60, 24, '#c9f0d8');
        const lc = tip(dc, LEN + 50), lk = tip(dk, LEN + 56);
        txt(g, 'brațul cranial', lc[0], lc[1], 17, '#ffd0d8'); // jos (0°) eticheta stă în dreapta brațului, ca să nu intre sub poza din colțul stânga-jos
        if (Math.sin(dk) > 0.7) txt(g, 'brațul caudal', lk[0] + 105, lk[1] - 70, 17, '#ffd9b0', { align: 'left' }); else txt(g, 'brațul caudal', lk[0], lk[1] + (Math.abs(Math.sin(dk)) > 0.7 ? 0 : 26), 17, '#ffd9b0');
        g.restore();
        // axul: a. mezenterică superioară, văzută din capăt
        dot(g, CX, CY, 24, ART, { ow: 6 }); dot(g, CX, CY, 9, '#ffb0a8', { ow: 0 });
        txt(g, 'a. mezenterică sup. (axul)', CX, CY + 48, 15, '#ffb0a8', { alpha: a0 });
        // săgeata antiorară + unghiul
        if (s.th > 2 && O.freeze === undefined) { g.save(); g.globalAlpha = a0; g.strokeStyle = '#ffe36e'; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.arc(CX, CY, 92, -Math.PI / 2, -Math.PI / 2 - s.th * Math.PI / 180, true); g.stroke(); g.restore(); }
        pill(g, 600, 800, 150, 46, '#ffe36e', `${Math.round(s.th)}°`, { size: 24, alpha: a0 });
      }
      if (s.fin > 0.01) {
        g.save(); g.globalAlpha = s.fin;
        const cd = lerp(470, 690, s.fin);
        tube(g, [[250, cd], [250, 470], [256, 340], [400, 330], [560, 340], [600, 470], [600, 690], [540, 760], [470, 740]], 40, CO, { ow: 7 });
        const sm = []; for (let k = 0; k < 7; k++) sm.push([330 + (k % 2) * 160, 420 + k * 42]);
        tube(g, sm, 26, CR, { ow: 6 });
        tube(g, [[250, cd + 10], [222, cd + 50]], 18, BUD, { ow: 5 });
        g.restore();
        txt(g, 'cecul → fosa iliacă dr.', 230, cd + 100, 17, '#c9f0d8', { alpha: s.fin });
        txt(g, 'colon\nascendent', 178, 560, 16, '#ffd9b0', { alpha: s.fin }); txt(g, 'colon transvers', 410, 295, 16, '#ffd9b0', { alpha: s.fin }); txt(g, 'colon\ndescendent', 652, 560, 16, '#ffd9b0', { alpha: s.fin });
      }
      if (O.freeze !== undefined) { pill(g, 400, 820, 420, 50, '#ff9f8f', 'oprită la 90°: colonul pe stânga', { size: 20 }); txt(g, 'risc de volvulus', 400, 880, 18, '#ffb0a8'); }
      // mini-panou: hernia fiziologică (secțiune sagitală schematică)
      if (O.freeze === undefined) {
        panel(g, 740, 120, 240, 250);
        txt(g, 'hernia (lateral)', 860, 148, 15, '#d8c4b8', { w: 700 });
        g.save(); g.strokeStyle = '#f3c29b'; g.lineWidth = 8; g.beginPath(); g.moveTo(860, 180); g.lineTo(860, 240); g.moveTo(860, 290); g.lineTo(860, 350); g.stroke(); g.restore();
        tube(g, [[860, 240], [930, 248], [930, 282], [860, 290]], 10, '#bfe6ff', { ow: 4 });
        const ox = lerp(800, 900, s.out);
        tube(g, [[790, 265], [ox, 255], [ox + 12, 265], [ox, 275], [790, 265]], 14, CR, { ow: 4 });
        txt(g, 'abdomen', 795, 330, 13, '#f3e2d6'); txt(g, 'cordon', 930, 330, 13, '#bfe6ff');
      }
    },
  };
}

/* =========================================================== CLOACA + CANALUL ANAL (static)
   Ce trebuie să se vadă: sus, 3 secțiuni sagitale (anterior = stânga): cloaca → septul urorectal (roșu) coboară → S7: 2 orificii.
   Jos: canalul anal, 2/3 superioare endoderm (galben) + 1/3 inferioară ectoderm (albastru), linia pectinată și arterele. */
export function cloacaLP3() {
  const P3 = [190, 500, 810];
  const sag = (x, k) => {
    // tubul: metenteronul vine din dreapta-sus, alantoida pleacă în față-sus
    tube(g0, [[x + 120, 140], [x + 60, 190], [x + 30, 250]], 34, HG, { ow: 6 });
    tube(g0, [[x - 30, 250], [x - 60, 190], [x - 110, 140]], 22, '#f6d98a', { ow: 6 });
    const dep = [0, 0.55, 1][k];
    // cloaca / cele 2 cavități
    if (k < 2) ell(g0, x, 300, 90, 70, FG, { ow: 6 });
    else { ell(g0, x - 50, 300, 55, 66, FG, { ow: 6 }); ell(g0, x + 52, 300, 50, 62, HG, { ow: 6 }); }
    if (k === 1) ell(g0, x + 40, 300, 46, 58, 'rgba(169,138,230,.6)', { ow: 0 });
    // septul urorectal
    tube(g0, [[x, 200], [x, lerp(220, 370, dep)]], 16, '#d9483f', { ow: 5 });
    // membrana cloacală / orificiile
    g0.save(); g0.strokeStyle = '#5b9be8'; g0.lineWidth = 8; g0.lineCap = 'round'; g0.beginPath();
    if (k < 2) { g0.moveTo(x - 70, 372); g0.lineTo(x + 70, 372); } else { g0.moveTo(x - 85, 372); g0.lineTo(x - 70, 372); g0.moveTo(x - 10, 380); g0.lineTo(x + 10, 380); g0.moveTo(x + 75, 372); g0.lineTo(x + 90, 372); }
    g0.stroke(); g0.restore();
    if (k === 2) { txt(g0, 'UG', x - 50, 300, 20, OUT, { stroke: false }); txt(g0, 'AR', x + 52, 300, 20, '#fff', { stroke: false }); }
    else txt(g0, k === 0 ? 'cloaca' : '', x, 300, 20, OUT, { stroke: false });
  };
  let g0 = null;
  return {
    home: HOME,
    anchors: [[P3[0], 225], [P3[1], 210], [P3[2] - 50, 230], [330, 660]],
    phase: (i) => ['cloaca + membrana cloacală', 'septul urorectal coboară', 'S7: 2 orificii', 'canalul anal: 2 origini'][i] || 'metenteronul se termină în cloacă',
    draw(g, t, b) {
      bg(g); g0 = g;
      txt(g, 'secțiuni sagitale · anterior = stânga, posterior = dreapta', 500, 910, 15, '#c9b3a6', { w: 600 });
      P3.forEach((x, k) => { panel(g, x - 150, 80, 300, 360, { fill: b.i === k ? 'rgba(255,227,110,.10)' : undefined }); sag(x, k); txt(g, ['1 · cloaca', '2 · septul coboară', '3 · S7: 2 orificii'][k], x, 420, 18, '#ffe0c8'); });
      txt(g, 'alantoida', P3[0] - 95, 112, 14, '#f6e3b4'); txt(g, 'membrana cloacală', P3[0], 398, 14, '#cfe0ff');
      // canalul anal
      panel(g, 60, 470, 880, 420, { fill: b.i === 3 ? 'rgba(255,227,110,.08)' : undefined });
      const x0 = 330;
      const up = new Path2D(); up.roundRect(x0 - 60, 500, 120, 230, 30); paint(g, up, FG, '#d19a22', null, [x0 - 60, 500, 120, 230], OUT, 6);
      const lo = new Path2D(); lo.roundRect(x0 - 60, 730, 120, 120, 30); paint(g, lo, N.ecto, N.ectoS, null, [x0 - 60, 730, 120, 120], OUT, 6);
      g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 6; g.setLineDash([12, 8]); g.beginPath(); g.moveTo(x0 - 110, 730); g.lineTo(x0 + 110, 730); g.stroke(); g.restore();
      txt(g, '2/3 sup.\nENDODERM', x0, 615, 18, OUT, { stroke: false }); txt(g, '1/3 inf.\nECTODERM', x0, 790, 17, '#fff', { stroke: false });
      txt(g, 'linia pectinată', x0 - 190, 730, 18, '#ffe36e');
      tube(g, [[690, 520], [560, 540], [x0 + 70, 590]], 12, ART, { ow: 5 }); txt(g, 'a. rectală sup. ← a. mezenterică inf.', 690, 500, 17, '#ffb0a8');
      tube(g, [[690, 830], [560, 810], [x0 + 70, 790]], 12, ART, { ow: 5 }); txt(g, 'ramuri din a. pudendă internă', 700, 860, 17, '#ffb0a8');
    },
  };
}

/* =========================================================== PLĂMÂNUL: diverticulul (S4), ramificarea și cele 4 stadii (static)
   Ce trebuie să se vadă: sus, 3 secțiuni transversale prin preenteron (dorsal sus): diverticulul ventral → pliurile se apropie → septul traheo-esofagian
   (traheea în față = jos, esofagul în spate = sus). Jos: axa celor 4 stadii, cu surfactantul de la sfârșitul lunii 6. */
export function lung() {
  const XS = [170, 410, 650];
  const ST = [['pseudoglandular', 5, 16, '#9be3b0'], ['canalicular', 16, 26, '#8fd3ff'], ['sacular', 26, 40, '#ffd77a'], ['alveolar', 40, 52, '#ff9fb4']];
  const XW = (w) => 120 + (w - 5) / (52 - 5) * 820;
  return {
    home: HOME,
    anchors: [[XS[0], 150], [880, 150], [XW(16), 560], [XW(40), 560]],
    phase: (i) => ['S4: diverticulul respirator', 'S5: bronhii lobare 3 + 2', 'pseudoglandular · canalicular', 'sacular · alveolar · surfactant'][i] || 'mugurele respirator',
    draw(g, t, b) {
      bg(g);
      txt(g, 'secțiuni transversale prin preenteron, S4 · DORSAL ↑', 500, 900, 16, '#c9b3a6', { w: 600 });
      XS.forEach((x, k) => {
        panel(g, x - 110, 70, 220, 300, { fill: b.i === 0 ? 'rgba(255,227,110,.08)' : undefined });
        if (k === 0) { ell(g, x, 170, 60, 50, FG, { ow: 6 }); tube(g, [[x, 210], [x, 290]], 40, BUD, { ow: 6 }); txt(g, 'diverticul\nventral', x, 330, 15, '#c9f0d8'); }
        else if (k === 1) { const p = new Path2D(); p.moveTo(x - 55, 130); p.bezierCurveTo(x - 70, 200, x - 30, 220, x - 50, 290); p.lineTo(x + 50, 290); p.bezierCurveTo(x + 30, 220, x + 70, 200, x + 55, 130); p.closePath(); paint(g, p, FG, '#d19a22', null, [x - 70, 130, 140, 160], OUT, 6); arr(g, x - 90, 215, x - 40, 215, '#ffe36e', 5); arr(g, x + 90, 215, x + 40, 215, '#ffe36e', 5); txt(g, 'pliurile se\napropie', x, 330, 15, '#ffe0c8'); }
        else { ell(g, x, 160, 52, 42, FG, { ow: 6 }); ell(g, x, 262, 52, 42, BUD, { ow: 6 }); g.save(); g.strokeStyle = '#d9483f'; g.lineWidth = 9; g.beginPath(); g.moveTo(x - 70, 211); g.lineTo(x + 70, 211); g.stroke(); g.restore(); txt(g, 'esofag', x, 160, 16, OUT, { stroke: false }); txt(g, 'trahee', x, 262, 16, OUT, { stroke: false }); txt(g, 'septul traheo-\nesofagian', x, 335, 15, '#ffb0a8'); }
      });
      // arborele bronșic: 3 + 2
      panel(g, 780, 70, 200, 300, { fill: b.i === 1 ? 'rgba(255,227,110,.08)' : undefined });
      tube(g, [[880, 90], [880, 170]], 22, BUD, { ow: 5 });
      tube(g, [[880, 170], [835, 210]], 16, BUD, { ow: 4 }); tube(g, [[880, 170], [925, 210]], 16, BUD, { ow: 4 });
      [[835, 210, -1], [925, 210, 1]].forEach(([x, y, s]) => { const n = s < 0 ? 3 : 2; for (let k = 0; k < n; k++) tube(g, [[x, y], [x + s * (14 + k * 6), y + 40 + k * 26]], 10, BUD, { ow: 3 }); });
      txt(g, 'dr. 3', 820, 330, 17, '#c9f0d8'); txt(g, 'stg. 2', 935, 330, 17, '#c9f0d8');
      // axa stadiilor
      txt(g, 'maturarea plămânului', 530, 430, 20, '#ffe0c8');
      ST.forEach(([n, w0, w1, col], k) => {
        const on = (b.i === 2 && k < 2) || (b.i === 3 && k >= 2) || b.i < 0;
        const x0 = XW(w0), x1 = XW(w1);
        const p = new Path2D(); p.roundRect(x0 + 3, 480, x1 - x0 - 6, 110, 18);
        g.save(); g.globalAlpha = on ? 1 : 0.45; g.fillStyle = col; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 5; g.stroke(p); g.restore();
        txt(g, n, (x0 + x1) / 2, 512, 18, OUT, { stroke: false, alpha: on ? 1 : 0.5 });
        txt(g, ['S5–S16', 'S16–S26', 'S26 → naștere', '8 luni → 8 ani'][k], (x0 + x1) / 2, 552, 16, OUT, { stroke: false, alpha: on ? 1 : 0.5, w: 700 });
      });
      g.save(); g.strokeStyle = '#ffe36e'; g.lineWidth = 6; g.beginPath(); g.moveTo(XW(24), 610); g.lineTo(XW(24), 470); g.stroke(); g.restore();
      txt(g, 'surfactant: sf. lunii 6', XW(24), 640, 18, '#ffe36e');
      txt(g, 'naștere', XW(40), 455, 15, '#ffe0c8');
      txt(g, 'schimb gazos imposibil', XW(10.5), 700, 15, '#c9f0d8'); txt(g, 'prematur: terapie intensivă', XW(21), 740, 15, '#bfe6ff'); txt(g, 'prematurul de 7 luni supraviețuiește', XW(33), 700, 15, '#ffe39a');
      txt(g, '~17 generații până în luna 6 + ~6 după naștere = 23', 530, 820, 19, '#f3e2d6');
    },
  };
}

/* =========================================================== CAZURI LP 3 (fiecare = o scenă mică, folosită în scena compusă)
   „Double bubble”: schema radiografiei (negru = aer). Pe film, stânga pacientului e în dreapta imaginii: stomacul (S) în dreapta, duodenul (D) în stânga. */
export function dbub() {
  return {
    home: HOME, anchors: [[620, 330], [380, 380], [500, 650]],
    phase: (i) => ['bula 1 = stomacul', 'bula 2 = duodenul proximal', 'fără aer mai jos'][i] || '„double bubble”',
    draw(g, t, b) {
      bg(g);
      const f = new Path2D(); f.roundRect(170, 90, 660, 760, 30); paint(g, f, '#bdb2aa', '#8f857d', null, [170, 90, 660, 760], OUT, 7);
      ell(g, 620, 330, 120, 95, '#121014', { ow: 5, sc: '#2a2030' }); ell(g, 380, 380, 75, 60, '#121014', { ow: 5, sc: '#2a2030' });
      txt(g, 'stomac', 620, 330, 22, '#f3e2d6'); txt(g, 'duoden', 380, 380, 19, '#f3e2d6');
      txt(g, 'fără aer mai jos', 500, 650, 24, OUT, { stroke: false });
      txt(g, 'D', 205, 130, 28, '#fff'); txt(g, 'S', 795, 130, 28, '#fff');
      txt(g, 'negru = aer · D / S = dreapta / stânga pacientului', 500, 890, 16, '#c9b3a6', { w: 600 });
      if (b.i >= 0) glowRing(g, [620, 380, 500][b.i], [330, 380, 650][b.i], [140, 95, 200][b.i], [115, 80, 120][b.i], 0, ease(clamp(b.bt * 1.5)));
    },
  };
}
/* Atrezie esofagiană + fistulă traheo-esofagiană distală (vedere laterală schematică: traheea în față = stânga, esofagul în spate = dreapta). */
export function eaf() {
  return {
    home: HOME, anchors: [[560, 330], [470, 520], [590, 760]],
    phase: (i) => ['esofagul superior = fund de sac', 'fistula: esofagul inferior ↔ traheea', 'aer în stomac'][i] || 'atrezie esofagiană + fistulă',
    draw(g, t, b) {
      bg(g);
      txt(g, 'anterior ← · → posterior', 230, 900, 17, '#d8c4b8', { w: 700 });
      tube(g, [[400, 100], [400, 520], [360, 640], [300, 720]], 54, '#8fd3ff', { ow: 7, lumen: '#e9f6ff' }); tube(g, [[400, 520], [450, 640], [500, 720]], 44, '#8fd3ff', { ow: 7, lumen: '#e9f6ff' });
      txt(g, 'trahee', 300, 250, 22, '#bfe6ff');
      tube(g, [[560, 100], [560, 350]], 54, FG, { ow: 7 }); ell(g, 560, 360, 34, 30, FG, { ow: 0 });
      txt(g, 'fund de sac', 700, 330, 20, '#fff3c4');
      tube(g, [[600, 830], [585, 640], [500, 510], [430, 470]], 40, FG, { ow: 7 });
      txt(g, 'fistulă spre trahee', 640, 520, 19, '#ffd0c8');
      ell(g, 640, 820, 110, 70, FG, { ow: 7 }); ell(g, 640, 800, 60, 28, '#121014', { ow: 0 });
      txt(g, 'stomac + aer', 800, 860, 19, '#fff3c4');
      if (b.i >= 0) glowRing(g, [560, 470, 640][b.i], [330, 500, 810][b.i], [70, 90, 130][b.i], [80, 60, 90][b.i], 0, ease(clamp(b.bt * 1.5)));
    },
  };
}
/* Gastroschisis vs. omfalocel (vedere din față: dreapta pacientului = stânga imaginii). */
export function gastro() {
  const belly = (g, x) => { const p = new Path2D(); p.ellipse(x, 470, 190, 260, 0, 0, 7); paint(g, p, '#f3c29b', '#d99b72', null, [x - 190, 210, 380, 520], OUT, 7); };
  const loops = (g, x, y, n) => { const pts = []; for (let k = 0; k < n; k++) pts.push([x + (k % 2 ? 50 : -50), y + k * 30]); tube(g, pts, 26, CR, { ow: 6 }); };
  return {
    home: HOME, anchors: [[175, 380], [740, 360]],
    phase: (i) => ['gastroschisis: fără sac', 'omfalocel: cu sac, prin ombilic'][i] || 'gastroschisis vs. omfalocel',
    draw(g, t, b) {
      bg(g);
      txt(g, 'vedere din față · dreapta pacientului = stânga imaginii', 500, 900, 16, '#c9b3a6', { w: 600 });
      belly(g, 270); belly(g, 730);
      // gastroschisis: cordonul în centru, ansele ies la dreapta lui (stânga imaginii), libere
      tube(g, [[290, 480], [300, 590], [330, 700]], 26, '#bfe6ff', { ow: 6 }); loops(g, 200, 380, 6);
      txt(g, 'GASTROSCHISIS', 270, 120, 26, '#ffe36e'); txt(g, 'anse libere, fără sac\nla dreapta ombilicului', 270, 800, 18, '#ffd0c8');
      // omfalocel: sacul pe ombilic, cordonul pleacă din sac
      ell(g, 730, 440, 120, 110, 'rgba(191,230,255,.45)', { ow: 6 }); loops(g, 730, 375, 5);
      tube(g, [[730, 550], [740, 640], [770, 720]], 26, '#bfe6ff', { ow: 6 });
      txt(g, 'OMFALOCEL', 730, 120, 26, '#ffe36e'); txt(g, 'sac (amnios + peritoneu)\nprin ombilic', 730, 800, 18, '#bfe6ff');
      if (b.i >= 0) glowRing(g, [200, 730][b.i], [450, 440][b.i], 110, 140, 0, ease(clamp(b.bt * 1.5)));
    },
  };
}
/* Hipoplazie pulmonară (normal / bilateral / unilateral) + atrezia traheală. */
export function hypoL() {
  const pair = (g, x, sl, sr, atr) => {
    tube(g, [[x, 230], [x, 330]], 22, '#8fd3ff', { ow: 6 }); tube(g, [[x, 330], [x - 50, 370]], 14, '#8fd3ff', { ow: 5 }); tube(g, [[x, 330], [x + 50, 370]], 14, '#8fd3ff', { ow: 5 });
    if (atr) { g.save(); g.strokeStyle = '#ff6b5e'; g.lineWidth = 8; g.beginPath(); g.moveTo(x - 30, 270); g.lineTo(x + 30, 290); g.stroke(); g.restore(); }
    ell(g, x - 70, 470, 60 * sl, 130 * sl, '#ff9fb4', { ow: 6 }); ell(g, x + 70, 470, 60 * sr, 130 * sr, '#ff9fb4', { ow: 6 });
  };
  return {
    home: HOME, anchors: [[500, 330], [820, 330], [180, 200]],
    phase: (i) => ['hipoplazie bilaterală', 'hipoplazie unilaterală', 'atrezia traheală'][i] || 'plămâni prea mici / trahee închisă',
    draw(g, t, b) {
      bg(g);
      pair(g, 180, 1, 1, b.i === 2); pair(g, 500, 0.55, 0.55, false); pair(g, 820, 1, 0.5, false);
      txt(g, b.i === 2 ? 'trahee închisă' : 'normal', 180, 680, 22, b.i === 2 ? '#ff9f8f' : '#ffe0c8'); txt(g, 'bilateral', 500, 680, 22, '#ffe0c8'); txt(g, 'unilateral', 820, 680, 22, '#ffe0c8');
      txt(g, 'prea puține alveole și vase → insuficiență respiratorie', 500, 790, 19, '#f3e2d6');
      if (b.i >= 0) glowRing(g, [500, 820, 180][b.i], [440, 440, 280][b.i], 160, 220, 0, ease(clamp(b.bt * 1.5)));
    },
  };
}
/* Pancreasul: 2 muguri; ventralul trece în spate odată cu rotația duodenului și se lipește de dorsal. */
export function panc() {
  const duo = (g, x) => tube(g, [[x - 60, 250], [x - 120, 400], [x - 80, 560], [x + 40, 600]], 46, FG, { ow: 7 });
  return {
    home: HOME, anchors: [[230, 520], [360, 330], [760, 560]],
    phase: (i) => ['mugurele ventral', 'mugurele dorsal', 'după fuziune'][i] || 'pancreasul = 2 muguri',
    draw(g, t, b) {
      bg(g);
      panel(g, 40, 120, 440, 640); panel(g, 520, 120, 440, 640);
      txt(g, 'înainte (S5)', 260, 160, 20, '#ffe0c8'); txt(g, 'după rotație + fuziune', 740, 160, 20, '#ffe0c8');
      duo(g, 300); ell(g, 360, 330, 70, 40, '#8fd3ff', { ow: 5 }); ell(g, 230, 520, 55, 36, '#ffb0e0', { ow: 5 });
      tube(g, [[180, 300], [230, 490]], 12, BUD, { ow: 4 }); txt(g, 'duct biliar', 120, 330, 15, '#c9f0d8');
      txt(g, 'dorsal', 380, 270, 17, '#bfe6ff'); txt(g, 'ventral', 200, 590, 17, '#ffd0ee');
      duo(g, 780); const p = new Path2D(); p.moveTo(700, 560); p.bezierCurveTo(760, 470, 860, 380, 930, 330); p.lineTo(940, 380); p.bezierCurveTo(880, 440, 800, 540, 760, 610); p.closePath(); paint(g, p, '#8fd3ff', null, null, [700, 330, 240, 280], OUT, 5);
      ell(g, 760, 560, 46, 34, '#ffb0e0', { ow: 5 });
      txt(g, 'uncinat + capul inferior\n= ventral', 700, 680, 16, '#ffd0ee'); txt(g, 'capul sup. + corp + coadă\n= dorsal', 840, 300, 15, '#bfe6ff');
      if (b.i >= 0) glowRing(g, [230, 360, 760][b.i], [520, 330, 520][b.i], 80, 70, 0, ease(clamp(b.bt * 1.5)));
    },
  };
}
