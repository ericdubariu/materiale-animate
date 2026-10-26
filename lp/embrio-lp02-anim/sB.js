// Partea B: derivatele arcurilor — harta (tabelul din LP), nervii + mușchii, arterele (arcurile aortice), scheletul.
import { HOME, C, bg, panel, txt, pill, tube, flow, dot, ell, arr, OUT, clamp, lerp, ease, REDUCED,
  ARC, ARCN, ECTO, MESO, CREST, ENDO, NERVE, ART, A, prog, cyc, ringAt, poly, line, arcTag, head, pulse } from './k2.js';

/* ============ HARTA ARCURILOR = tabelul din LP, desenat ============
   Rânduri de sus (cranial) în jos: arcurile 1, 2, 3, 4, apoi un rând punctat „arcul 5 nu se formează”, apoi arcul 6.
   Coloane: NERV · ARTERĂ · SCHELET · MUȘCHI. Banda din stânga are culoarea arcului (aceeași în tot deck-ul) + regiunea (fața 1–2,
   gâtul 3–4). Pentru 4 + 6, celulele SCHELET și MUȘCHI sunt unite (LP: „arcurile 4 + 6 fuzionate”).
   Fiecare punct aprinde rândul arcului lui: celulele apar de la stânga la dreapta, iar un punct luminos curge pe rând. */
export function archmap() {
  const COLX = [118, 296, 492, 690, 880], COLW = [124, 172, 200, 186, 180];
  const ROWS = [
    { k: 0, y: 196, h: 118, cells: ['V2 maxilar +\nV3 mandibular\n(+ chorda tympani*)', 'a. maxilară\n(o parte)', 'Meckel:\nciocan, nicovală', 'masticatorii'], reg: 'fața' },
    { k: 1, y: 326, h: 112, cells: ['VII facial', 'a. hioidă +\na. stapedială', 'scăriță, stiloid,\nhioidul sus', 'mimica,\nstapedius'], reg: 'fața' },
    { k: 2, y: 450, h: 106, cells: ['IX\nglosofaringian', 'a. carotidă\ncomună + internă', 'hioidul jos\n(cornul mare)', 'stilofaringian'], reg: 'gâtul' },
    { k: 3, y: 570, h: 104, cells: ['X · n. laringeu\nsuperior', 'stg: arcul aortei\ndr: a. subclavie dr.', null, null], reg: 'gâtul' },
    { k: 4, y: 760, h: 104, cells: ['X · n. laringeu\nrecurent', 'stg: ductus arteriosus\ndr: a. pulmonară dr.', null, null], reg: '' },
  ];
  const HEAD = ['NERV', 'ARTERĂ', 'SCHELET', 'MUȘCHI'];
  return {
    home: HOME, cams: ROWS.map(() => HOME),
    anchors: ROWS.map((r) => [COLX[0] + 70, r.y - r.h / 2 + 4]),
    draw(g, t, b) {
      bg(g);
      HEAD.forEach((h, j) => txt(g, h, COLX[j + 1], 112, 18, '#ffb48a'));
      const lit = (k) => (b.i < 0 ? cyc(t, 5, 2.4) === k : b.i === k);
      const rv = (k, j) => (b.i < 0 ? 1 : b.i === k ? clamp(b.bt * 1.8 - j * 0.45) : 1);
      ROWS.forEach((r) => {
        const on = lit(r.k); const a = b.i < 0 || on ? 1 : 0.42;
        pill(g, COLX[0], r.y, COLW[0], r.h - 10, ARC[r.k], '', { alpha: a, glow: on ? 1 : 0, r: 16 });
        txt(g, 'Arcul ' + ARCN[r.k], COLX[0], r.y - (r.reg ? 12 : 0), 20, OUT, { stroke: false, alpha: a });
        if (r.reg) txt(g, r.reg, COLX[0], r.y + 18, 16, OUT, { stroke: false, alpha: a, w: 700 });
        r.cells.forEach((c, j) => {
          if (c === null) return; const ca = a * rv(r.k, j + 1);
          pill(g, COLX[j + 1], r.y, COLW[j + 1], r.h - 10, '#3a2a26', '', { alpha: ca, ow: 3, r: 14 });
          if (on) { g.save(); g.globalAlpha = ca; g.strokeStyle = ARC[r.k]; g.lineWidth = 4; g.beginPath(); g.roundRect(COLX[j + 1] - COLW[j + 1] / 2 + 3, r.y - (r.h - 10) / 2 + 3, COLW[j + 1] - 6, r.h - 16, 12); g.stroke(); g.restore(); }
          txt(g, c, COLX[j + 1], r.y, c.split('\n').length > 2 ? 15 : 16, '#ffe7d6', { alpha: ca, w: 700 });
        });
        if (on && !REDUCED) { const u = (t * 0.45) % 1; dot(g, lerp(COLX[0] + 60, COLX[4] + 80, u), r.y + r.h / 2 - 8, 6, ARC[r.k], { ow: 2 }); }
      });
      // celulele unite 4 + 6 (schelet, mușchi)
      const on46 = lit(3) || lit(4); const a46 = b.i < 0 || on46 ? 1 : 0.42; const yM = (570 + 760) / 2, hM = 760 - 570 + 94;
      [[2, 'cartilajele\nlaringelui\n(4 + 6 fuzionate)'], [3, 'cricotiroidian,\nridicătorul vălului,\nconstrictorii,\nintrinsecii laringelui']].forEach(([j, s]) => {
        const ca = a46 * (b.i === 3 ? rv(3, j + 1) : 1);
        pill(g, COLX[j + 1], yM, COLW[j + 1], hM, '#3a2a26', '', { alpha: ca, ow: 3, r: 14 });
        if (on46) { g.save(); g.globalAlpha = ca; g.strokeStyle = ARC[3]; g.lineWidth = 4; g.setLineDash([10, 7]); g.beginPath(); g.roundRect(COLX[j + 1] - COLW[j + 1] / 2 + 3, yM - hM / 2 + 3, COLW[j + 1] - 6, hM - 6, 12); g.stroke(); g.restore(); }
        txt(g, s, COLX[j + 1], yM, 15, '#ffe7d6', { alpha: ca, w: 700 });
      });
      // rândul punctat: arcul 5
      const a5 = b.i < 0 || b.i === 3 ? 1 : 0.35;
      g.save(); g.globalAlpha = a5; g.setLineDash([9, 8]); g.strokeStyle = '#cdb8ab'; g.lineWidth = 3; g.beginPath(); g.roundRect(COLX[0] - COLW[0] / 2, 642, 430, 44, 12); g.stroke(); g.restore();
      txt(g, 'arcul 5 · nu se formează la om', COLX[0] - COLW[0] / 2 + 215, 664, 16, b.i === 3 ? C.hi : '#cdb8ab', { alpha: a5 });
      txt(g, '* LP; anatomic = ramură a VII', COLX[1] + 10, 880, 15, '#cdb8ab', { w: 600, alpha: A(b, 0, 0.5) });
    },
  };
}

/* ============ NERVII + MUȘCHII ============
   Capul din profil (fața spre dreapta). Fiecare arc colorează mușchii lui și nervul lui (aceeași culoare):
   arcul 1 (galben) = temporal + maseter, nervul V (V2 spre maxilă, V3 spre masticatori); arcul 2 (roz) = mușchii mimicii (frunte,
   ochi, gură, platisma pe gât), nervul VII; arcul 3 (albastru) = stilofaringianul, nervul IX; arcurile 4 + 6 = faringele și laringele,
   nervul X: laringeul superior (mov, arcul 4) și laringeul recurent (maro, arcul 6), care coboară și urcă înapoi la laringe.
   Nervii pleacă toți din trunchiul cerebral (în spatele urechii). Colțul stânga-jos e liber (pozele din LP). */
export function nervemuscle() {
  const X0 = 470, Y0 = 410, s = 1.0;
  const P = (x, y) => [X0 + x * s, Y0 + y * s];
  const BS = P(-80, -10);
  const NV = [
    [[BS, P(-10, -30), P(40, -40), P(130, -40), P(215, -25)], [P(40, -40), P(90, 0), P(125, 55)], [P(40, -40), P(50, -90), P(60, -125)]],
    [[BS, P(-40, 20), P(10, 40), P(90, 0), P(160, -60)], [P(10, 40), P(120, -100), P(165, -175)], [P(10, 40), P(150, 40), P(228, 72)], [P(10, 40), P(50, 160), P(90, 250)]],
    [[BS, P(-50, 60), P(0, 110), P(35, 150)]],
    [[BS, P(-60, 80), P(-40, 200), P(10, 270), P(95, 290)]],
    [[BS, P(-60, 80), P(-45, 240), P(-30, 400), P(10, 425), P(60, 370), P(105, 330)]],
  ];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [P(-150, -150), P(250, -230), P(-190, 130), [790, 640]],
    draw(g, t, b) {
      bg(g);
      const am = (k) => A(b, k === 4 ? 3 : k, 0.28);
      head(g, X0, Y0, s, { fill: '#f3c9a6' });
      // trunchiul cerebral
      ell(g, BS[0] - 10, BS[1], 30, 46, '#cdb8ab', { ow: 4 });
      // mușchii arcului 1
      ell(g, ...P(60, -120), 92, 66, ARC[0], { alpha: am(0) * 0.9, ow: 4 });
      g.save(); g.globalAlpha = am(0); g.translate(...P(125, 60)); g.rotate(0.25); pill(g, 0, 0, 66, 110, ARC[0], '', { r: 24 }); g.restore();
      // mușchii arcului 2 (mimica + platisma)
      ell(g, ...P(160, -178), 46, 26, ARC[1], { alpha: am(1), ow: 4, rot: 0.5 });
      g.save(); g.globalAlpha = am(1); g.strokeStyle = ARC[1]; g.lineWidth = 12; g.beginPath(); g.ellipse(...P(182, -70), 42, 30, 0, 0, 7); g.stroke(); g.beginPath(); g.ellipse(...P(236, 74), 26, 30, 0, 0, 7); g.stroke(); g.restore();
      for (let k = 0; k < 5; k++) line(g, [P(20 + k * 24, 205), P(10 + k * 30, 400)], ARC[1], 7, { alpha: am(1) * 0.85 });
      // arcul 3: stilofaringianul (de la procesul stiloid la faringe)
      line(g, [P(10, 70), P(45, 150), P(60, 225)], ARC[2], 14, { alpha: am(2), ow: 6 });
      // arcurile 4 + 6: constrictorii faringelui + laringele
      pill(g, ...P(30, 300), 44, 130, ARC[3], '', { alpha: am(3), r: 16 });
      for (let k = 0; k < 4; k++) line(g, [P(10, 250 + k * 30), P(50, 262 + k * 30)], '#6b4aa0', 4, { alpha: am(3) });
      pill(g, ...P(110, 320), 56, 76, ARC[3], '', { alpha: am(3), r: 14 }); pill(g, ...P(110, 372), 48, 24, ARC[4], '', { alpha: am(3), r: 10 });
      // nervii
      NV.forEach((L, k) => L.forEach((pts) => {
        const al = am(k); const on = b.i === (k === 4 ? 3 : k);
        const u = on ? ease(clamp(b.bt / (b.bd * 0.55))) : 1;
        tube(g, pts, 7, ARC[k], { ow: 5, alpha: al, u1: u, glow: on ? 0.6 : 0 });
        if (on) flow(g, pts, t, '#fff3b0', 3, 0.5, 5);
      }));
      // etichetele nervilor (lângă traseu) și ale mușchilor
      const NL = [['V', P(-20, -62)], ['VII', P(-50, 46)], ['IX', P(-108, 92)], ['X', P(-110, 210)]];
      NL.forEach(([s0, [x, y]], k) => { const a = am(k); pill(g, x, y, 52, 32, ARC[k], s0, { alpha: a, size: 18, r: 12 }); });
      const ML = [
        [0, 'temporal', P(60, -128)], [0, 'maseter', P(125, 60)], [0, 'V2 → maxila', P(235, -50)],
        [1, 'frontal', P(160, -222)], [1, 'orbicularul ochiului', P(250, -112)], [1, 'orbicularul gurii', P(300, 118)], [1, 'platisma', P(140, 380)],
        [2, 'stilofaringian', P(-60, 180)],
        [3, 'constrictorii', P(-10, 232)], [3, 'laringe', P(205, 320)], [3, 'laringeu sup. (4)', P(215, 268)], [3, 'laringeu recurent (6)', P(210, 440)],
      ];
      ML.forEach(([k, s0, [x, y]]) => { const a = b.i < 0 ? 0 : A(b, k, 0); if (a > 0) txt(g, s0, x, y, 16, '#fff3e6', { alpha: a }); });
      if (b.i < 0) txt(g, 'fiecare culoare = un arc: mușchii + nervul lui', 640, 880, 17, '#ffe7d6', { w: 700 });
    },
  };
}

/* ============ ARTERELE: arcurile aortice ============
   Vedere VENTRALĂ: dreapta embrionului = stânga imaginii (etichete „dr.” în stânga, „stg.” în dreapta).
   Sacul aortic jos la mijloc → rădăcinile ventrale urcă → arcurile aortice 1, 2, 3, 4, 6 (cranial → caudal) merg lateral spre cele două
   aorte dorsale verticale, care fuzionează caudal în aorta descendentă. Remodelarea pe puncte:
   pt0: 1 și 2 se subțiază (resturi: a. maxilară; a. hioidă + stapedială). pt1: arcul 3 = carotida comună + începutul carotidei interne;
   aorta dorsală dintre 3 și 4 dispare; rădăcina ventrală de deasupra 3 = carotida externă. pt2: arcul 4 stg. = arcul aortei; dr. = subclavia dr.
   (aorta dorsală dr. sub ea dispare). pt3: arcul 6 stg. = ductus arteriosus, dr. = a. pulmonară dr. proximal (segmentul distal dr. dispare).
   Galben punctat: nervii laringei recurenți agățați sub subclavia dr. și sub arcul aortei/ductus (manual). Colțul stânga-jos liber pe intro/pt0. */
export function arteries() {
  const cx = 500, XD = 250, XV = 50, YS = [168, 250, 336, 426, 528], SAC = [cx, 612];
  const arcPts = (d, k) => [[cx + d * XV, YS[k] + 22], [cx + d * 150, YS[k] - 26], [cx + d * XD, YS[k]]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[cx - 160, YS[0] - 56], [cx + 160, YS[2] - 60], [cx + 160, YS[3] - 60], [cx + 160, YS[4] - 58]],
    draw(g, t, b) {
      bg(g);
      const r = [0, 1, 2, 3].map((k) => prog(b, t, k, 0.7, 9));
      const hi = (k) => (b.i === k ? 0.7 : 0);
      txt(g, 'dreapta embrionului', 150, 92, 16, '#cdb8ab', { w: 700 }); txt(g, 'stânga embrionului', 850, 92, 16, '#cdb8ab', { w: 700 });
      // aorta descendentă (în spate)
      tube(g, [[cx + 20, 640], [cx + 20, 880]], 26, '#c9473f', { ow: 6 });
      txt(g, 'aorta\ndescendentă', cx + 120, 830, 16, '#ffc0b8');
      // aortele dorsale
      for (const d of [-1, 1]) {
        const x = cx + d * XD;
        tube(g, [[x, 120], [x, YS[2]]], 20, '#c9473f', { ow: 6 });
        const gapA = 1 - r[1]; // ductus caroticus 3–4 dispare
        tube(g, [[x, YS[2]], [x, YS[3]]], 20, '#c9473f', { ow: 6, alpha: Math.max(0.08, gapA) });
        const lowA = d < 0 ? 1 - r[2] : 1; // aorta dorsală dreaptă caudală dispare
        tube(g, [[x, YS[3]], [x, 560], [cx + d * 120, 630], [cx + 20, 660]], 20, '#c9473f', { ow: 6, alpha: Math.max(0.08, lowA) });
      }
      // rădăcinile ventrale + sacul aortic
      for (const d of [-1, 1]) {
        tube(g, [[cx + d * 30, SAC[1] - 20], [cx + d * XV, YS[3] + 20], [cx + d * XV, YS[2] + 22]], 18, '#e0443e', { ow: 6 });
        tube(g, [[cx + d * XV, YS[2] + 22], [cx + d * XV, 120]], 14, '#e0443e', { ow: 6, alpha: 1 - 0.3 * r[1] });
      }
      ell(g, SAC[0], SAC[1], 70, 40, '#e0443e', { ow: 6 });
      txt(g, 'sacul aortic', SAC[0], SAC[1] + 66, 17, '#ffc0b8');
      // arcurile aortice
      for (const d of [-1, 1]) for (let k = 0; k < 5; k++) {
        let w = 16, a = 1;
        if (k <= 1) { w = lerp(16, 7, r[0]); a = lerp(1, 0.55, r[0]); }
        const pts = arcPts(d, k);
        if (k === 4 && d < 0) { // arcul 6 drept: rămâne doar porțiunea proximală
          tube(g, [pts[0], pts[1]], 16, ARC[4], { ow: 6, glow: hi(3) });
          tube(g, [pts[1], pts[2]], 16, ARC[4], { ow: 6, alpha: Math.max(0.08, 1 - r[3]) });
          continue;
        }
        tube(g, pts, w, ARC[k], { ow: 6, alpha: a, glow: hi([0, 0, 1, 2, 3][k]) });
      }
      // subclavia dreaptă (din arcul 4 dr. + a 7-a intersegmentară), crește pe pt2
      if (r[2] > 0.01) tube(g, [[cx - XD, YS[3]], [cx - XD - 60, YS[3] + 30], [cx - XD - 150, YS[3] + 20]], 14, ARC[3], { ow: 6, u1: r[2] });
      // arterele pulmonare (din porțiunea proximală a arcului 6), cresc pe pt3
      for (const d of [-1, 1]) if (r[3] > 0.01) tube(g, [[cx + d * 150, YS[4] - 26], [cx + d * 170, YS[4] + 50], [cx + d * 210, YS[4] + 90]], 12, ARC[4], { ow: 5, u1: r[3] });
      // nervii laringei recurenți (manual)
      const nr = (d, y, a) => { if (a <= 0.01) return; const x = cx + d * (XD + 40); line(g, [[x + d * 30, 110], [x + d * 30, y - 30], [x - d * 10, y + 36], [x - d * 60, y + 30], [x - d * 90, y - 40], [x - d * 100, 150]], NERVE, 4, { dash: [8, 6], alpha: a }); };
      nr(-1, YS[3], b.i < 0 ? 0 : b.i >= 2 ? 1 : 0); nr(1, YS[4], b.i < 0 ? 0 : b.i >= 3 ? 1 : 0);
      // numerele arcurilor (pe arcul stâng al imaginii, partea dreaptă a embrionului)
      for (let k = 0; k < 5; k++) arcTag(g, cx - 150, YS[k] - 26, k, 16, 1);
      // etichetele derivatelor
      const L = [
        [0, 'a. maxilară', 860, YS[0] - 4], [0, 'a. hioidă +\na. stapedială', 870, YS[1] + 6],
        [1, 'a. carotidă internă', 150, 150], [1, 'carotida\nexternă', 500, 140], [1, 'a. carotidă comună', 870, YS[2] - 8],
        [2, 'arcul aortei', 880, YS[3] - 6], [2, 'a. subclavie dr.', 118, YS[3] + 64], [2, 'n. recurent dr.\n(manual)', 125, YS[3] - 80],
        [3, 'ductus\narteriosus', 870, YS[4] - 10], [3, 'a. pulmonară dr.', 230, YS[4] + 128], [3, 'n. recurent stg.\n(manual)', 880, YS[4] + 80],
      ];
      L.forEach(([k, s0, x, y]) => { const a = b.i < 0 ? 0 : b.i >= k ? (b.i === k ? 1 : 0.55) : 0; if (a > 0.01) txt(g, s0, x, y, 16, b.i === k ? C.hi : '#ffe7d6', { alpha: a * (k === b.i ? clamp(r[k] * 1.6) : 1) }); });
      if (b.i < 0) { txt(g, '5 perechi de arcuri aortice → remodelare', 650, 735, 17, '#ffe7d6', { w: 700 }); txt(g, 'aorta dorsală', cx + XD + 90, 200, 16, '#ffc0b8'); }
    },
  };
}

/* ============ SCHELETUL ARCURILOR (vedere laterală, fața spre dreapta) ============
   Sus-stânga urechea medie: ciocan + nicovală (galben, arcul 1), scărița (roz, arcul 2). Din ciocan coboară cartilajul Meckel (galben)
   spre bărbie, în interiorul mandibulei (contur punctat: osificare membranoasă, manual); lig. sfenomandibular și lig. anterior al
   ciocanului = resturi ale lui Meckel. Tot arcul 1: maxila, zigomaticul, o parte din temporal (contururi galbene).
   Sub ureche: procesul stiloid (roz) → lig. stilohioid (roz punctat) → cornul mic. Hioidul: sus + cornul mic = roz (2),
   jos + cornul mare = albastru (3). Dedesubt: cartilajul tiroid + cricoid (+ aritenoizi) = arcurile 4 + 6 (mov). */
export function skeleton() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[110, 300], [250, 450], [280, 770], [440, 850]],
    draw(g, t, b) {
      bg(g);
      const a = (k) => A(b, k, 0.25);
      // conturul feței (ghid, foarte palid)
            // arcul 1: temporal (o parte), zigomatic, maxila
      g.save(); g.globalAlpha = a(0);
      ell(g, 560, 130, 100, 44, 'rgba(242,179,61,.25)', { ow: 4, sc: ARC[0], dash: [8, 6] }); txt(g, 'temporal (o parte)', 560, 130, 15, '#ffe7b0');
      tube(g, [[400, 252], [520, 240], [600, 262]], 18, ARC[0], { ow: 5 }); txt(g, 'zigomatic', 500, 212, 15, '#ffe7b0');
      ell(g, 680, 340, 84, 56, 'rgba(242,179,61,.35)', { ow: 4, sc: ARC[0] }); txt(g, 'maxila', 680, 340, 16, '#ffe7b0');
      g.restore();
      // mandibula (contur punctat, osificare membranoasă în jurul Meckel)
      const mand = [[330, 300], [350, 420], [380, 560], [520, 580], [700, 570], [790, 540], [780, 470], [600, 480], [430, 470], [400, 330]];
      g.save(); g.globalAlpha = a(0); poly(g, mand, 'rgba(255,240,220,.08)', { stroke: '#fff3e6', lw: 3, dash: [9, 7] }); g.restore();
      txt(g, 'mandibula: osificare membranoasă (manual)', 600, 548, 15, '#ffe7d6', { alpha: a(0) });
      // cartilajul Meckel
      const meck = [[262, 246], [330, 340], [400, 470], [560, 520], [760, 512]];
      const um = b.i === 0 ? ease(clamp(b.bt / 2.5)) : 1;
      tube(g, meck, 22, ARC[0], { ow: 6, alpha: a(0), u1: um, glow: b.i === 0 ? 0.5 : 0 });
      txt(g, 'cartilajul Meckel', 560, 470, 16, OUT, { stroke: false, alpha: a(0) * um });
      line(g, [[440, 215], [425, 455]], ARC[0], 6, { dash: [8, 6], alpha: a(0) }); txt(g, 'lig. sfeno-\nmandibular', 520, 380, 15, '#ffe7b0', { alpha: a(0) });
      line(g, [[256, 206], [300, 158]], ARC[0], 5, { dash: [6, 5], alpha: a(0) }); txt(g, 'lig. ant. al ciocanului', 300, 136, 15, '#ffe7b0', { alpha: a(0) });
      // urechea medie
      ell(g, 240, 230, 22, 32, ARC[0], { alpha: a(0), ow: 5 }); ell(g, 278, 214, 20, 22, ARC[0], { alpha: a(0), ow: 5 });
      txt(g, 'ciocan · nicovală', 160, 190, 16, '#ffe7b0', { alpha: a(0) });
      g.save(); g.globalAlpha = a(1); g.strokeStyle = OUT; g.lineWidth = 12; g.beginPath(); g.moveTo(304, 240); g.lineTo(338, 222); g.lineTo(338, 262); g.closePath(); g.stroke(); g.strokeStyle = ARC[1]; g.lineWidth = 7; g.stroke(); g.restore();
      txt(g, 'scărița', 382, 240, 16, '#ffd0e4', { alpha: a(1) });
      // arcul 2: stiloid, lig. stilohioid, cornul mic + hioid sus
      tube(g, [[300, 300], [330, 360], [355, 420]], 12, ARC[1], { ow: 5, alpha: a(1) }); txt(g, 'proc. stiloid', 230, 380, 16, '#ffd0e4', { alpha: a(1) });
      const us = b.i === 1 ? ease(clamp(b.bt / 2)) : 1;
      tube(g, [[355, 420], [410, 540], [470, 640]], 6, ARC[1], { ow: 3, alpha: a(1), dash: [10, 8], u1: us }); txt(g, 'lig. stilohioid', 300, 560, 16, '#ffd0e4', { alpha: a(1) });
      // hioidul (văzut din lateral): corpul în 2 jumătăți + cornul mic (2) + cornul mare (3)
      pill(g, 560, 652, 140, 22, ARC[1], '', { alpha: a(1), r: 10, glow: b.i === 1 ? 0.6 : 0 });
      pill(g, 560, 676, 140, 22, ARC[2], '', { alpha: a(2), r: 10, glow: b.i === 2 ? 0.6 : 0 });
      tube(g, [[490, 652], [474, 640]], 14, ARC[1], { ow: 5, alpha: a(1) });
      tube(g, [[500, 680], [420, 704], [360, 712]], 12, ARC[2], { ow: 5, alpha: a(2) });
      txt(g, 'partea sup. + cornul mic', 648, 646, 16, '#ffd0e4', { alpha: a(1), align: 'left' });
      txt(g, 'partea inf. + cornul mare', 648, 684, 16, '#c8dcff', { alpha: a(2), align: 'left' }); txt(g, 'HIOIDUL', 560, 614, 16, '#ffe7d6');
      txt(g, 'cornul mare', 380, 744, 15, '#c8dcff', { alpha: a(2) });
      // laringele: tiroid + cricoid (+ aritenoizi) = arcurile 4 + 6
      g.save(); g.globalAlpha = a(3);
      poly(g, [[490, 730], [630, 730], [612, 800], [560, 824], [508, 800]], ARC[3], { stroke: OUT, lw: 5 });
      pill(g, 560, 860, 120, 32, ARC[4], '', { r: 14 }); dot(g, 600, 836, 9, ARC[3], { ow: 3 });
      g.restore();
      txt(g, 'cartilaj tiroid', 560, 765, 15, OUT, { stroke: false, alpha: a(3) });
      txt(g, 'cricoid (+ aritenoizi…)', 760, 860, 16, '#e3ccff', { alpha: a(3) });
      txt(g, 'arcurile 4 + 6', 760, 780, 16, '#e3ccff', { alpha: a(3) });
      [0, 1, 2, 3].forEach((k) => arcTag(g, [800, 388, 330, 462][k], [512, 412, 712, 770][k], k, 16, a(k)));
    },
  };
}
