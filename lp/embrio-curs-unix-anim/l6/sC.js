// Partea D: hipofiza (originea, punga Rathke, diverticulul), ochiul (+ colobomul), urechea, tegumentul; capcanele.
import {
  W, H, cam, HOME, C, N, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead, photo, photoCap, CR,
  crestCell, melano, mix, OUT, clamp, lerp, ease, paint, REDUCED,
} from './ek.js';

const e01 = (b, f = 0.65) => ease(clamp(b.bt / (b.bd * f)));

/* =================================================== HIPOFIZA (secțiune sagitală, SUS = CRANIAL, ANTERIOR = STÂNGA) */
// Ce trebuie să se vadă, în ordine (s = 0..4):
// s 0→1: punga Rathke (albastru = ectoderm oral) crește în SUS din tavanul stomodeului; infundibulul (mov = tub neural) coboară în JOS
//        din planșeul diencefalului; mezenchimul (roșu) e între ele. Punga e ANTERIOARĂ (stânga) infundibulului.
// s 1→2: gâtul pungii se îngustează și se rupe de cavitatea orală; sfenoidul (bej) se osifică între ele; canalul de migrare dispare
//        (dacă persistă = linia roșie punctată prin sfenoid, de la faringe la șaua turcească).
// s 2→3: peretele anterior al pungii crește mult (pars distalis), cel posterior puțin (pars intermedia, lipit de pars nervosa);
//        între ele rămâne o fantă (restul lumenului); pars tuberalis urcă și învelește tija infundibulară.
// s 3→4: forma matură: pars nervosa + tija (infundibulul) + eminența mediană = neurohipofiza.
export function hypoDraw(g, s, t, o = {}) {
  const NX = 565, BR = 250, OR = 730, PX = 470;
  const s1 = clamp(s), s2 = clamp(s - 1), s3 = clamp(s - 2), s4 = clamp(s - 3);
  // creierul (diencefalul) sus
  g.save(); g.fillStyle = 'rgba(154,106,214,.18)'; g.fillRect(120, 90, 780, BR - 90); g.restore();
  tube(g, [[120, BR], [NX - 40, BR], [NX - 26, BR + 6]], 22, N.neuro, { ow: 5 }); tube(g, [[NX + 26, BR + 6], [NX + 40, BR], [880, BR]], 22, N.neuro, { ow: 5 });
  txt(g, 'diencefal (tub neural)', 300, 170, 19, '#d9c6ff');
  // tavanul stomodeului / faringelui (ectoderm oral) jos
  tube(g, [[120, OR], [PX - 34, OR]], 20, N.ecto, { ow: 5 }); tube(g, [[PX + 34, OR], [880, OR]], 20, N.ecto, { ow: 5 });
  txt(g, s2 > 0.5 ? 'tavanul faringelui / cavității orale' : 'tavanul stomodeului (ectoderm oral)', 500, OR + 50, 18, '#cfe0ff');
  // mezenchimul dintre ele
  for (let k = 0; k < 16; k++) { const x = 170 + (k * 97) % 680, y = 330 + ((k * 61) % 330); if (Math.abs(x - NX) > 70 && Math.abs(x - PX) > 90) dot(g, x, y, 7, N.meso2, { ow: 2, alpha: 0.6 }); }
  // sfenoidul (se osifică după ce gâtul s-a rupt)
  const sph = clamp((s - 1.4) / 0.6);
  if (sph > 0) { g.save(); g.globalAlpha = sph; const p1 = new Path2D(); p1.roundRect(140, 600, 300, 60, 14); const p2 = new Path2D(); p2.roundRect(500, 600, 360, 60, 14); paint(g, p1, N.bone, N.boneS, null, [140, 600, 300, 60], OUT, 4); paint(g, p2, N.bone, N.boneS, null, [500, 600, 360, 60], OUT, 4); g.restore(); txt(g, 'sfenoid', 780, 630, 16, OUT, { stroke: false, alpha: sph }); }
  if (o.persist && sph > 0) { const pu = 0.6 + 0.4 * Math.sin(t * 4); g.save(); g.globalAlpha = pu; g.setLineDash([10, 8]); g.strokeStyle = C.key; g.lineWidth = 8; g.beginPath(); g.moveTo(PX, OR); g.lineTo(PX + 6, 545); g.stroke(); g.restore(); txt(g, 'canalul persistă\n= diverticul hipofizar', 270, 690, 17, C.key); }
  // infundibulul coboară
  const iL = lerp(10, 190, s1); const NY = BR + iL;
  const nr = lerp(16, 58, ease(clamp(s1 * 0.6 + s3 * 0.4)));
  tube(g, [[NX, BR], [NX, NY - nr * 0.6]], lerp(28, 30, s1), N.neuro, { ow: 5 });
  // punga Rathke: urcă, apoi se transformă
  const py = lerp(OR - 30, 495, s1), pr = lerp(24, 56, s1);
  // gâtul
  if (s < 1.9) { const w = lerp(26, 6, s2); const brk = s2 > 0.75; if (!brk) tube(g, [[PX, OR], [PX + 2, py + pr * 0.8]], w, N.ecto, { ow: 4 }); else { tube(g, [[PX, OR], [PX, OR - 26]], 6, N.ecto, { ow: 3 }); tube(g, [[PX + 2, py + pr * 0.8], [PX + 2, py + pr * 0.8 + 22]], 6, N.ecto, { ow: 3 }); } }
  const u = s3;
  const dx = lerp(PX + 12, 420, u), drx = lerp(pr, 80, u), dry = lerp(pr, 86, u);
  ell(g, dx, py, drx, dry, N.ecto, { ow: 5, shade: N.ectoS });                 // pars distalis (peretele anterior)
  ell(g, lerp(PX + 12, 480, u), py, lerp(pr - 18, 7, u), lerp(pr - 16, 58, u), N.ectoL, { ow: 3 }); // lumenul → fanta
  // neurohipofiza (pars nervosa)
  ell(g, NX, NY, nr, nr * 1.05, N.neuro, { ow: 5, shade: N.neuroS });
  // pars intermedia: perete subțire pe fața anterioară a pars nervosa
  if (u > 0) { g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 16 * u + 4; g.beginPath(); g.arc(NX, NY, nr + 8, Math.PI * 0.62, Math.PI * 1.38); g.stroke(); g.strokeStyle = N.ecto; g.lineWidth = 12 * u; g.stroke(); g.restore(); }
  // pars tuberalis urcă pe tija infundibulară (pe fața anterioară)
  if (u > 0.4) tube(g, [[dx + drx * 0.6, py - dry * 0.7], [NX - 24, NY - nr - 10], [NX - 22, BR + 20]], 13, N.ecto, { ow: 4, u1: clamp((u - 0.4) / 0.6) });
  return { NX, NY, nr, dx, py, drx, dry };
}
export function hypo() {
  return {
    home: HOME,
    anchors: [[330, 560], [500, 330], [560, 690], [180, 420]],
    phase: (i) => ['punga Rathke urcă', 'infundibulul coboară', 'canalul de migrare', 'lob anterior + lob posterior'][i] || 'S4–S5 → adult',
    draw(g, t, b) {
      bg(g);
      let s;
      if (b.i < 0) s = loopT(t, 10) * 4.2;
      else s = [e01(b) * 0.9, 0.9 + 0.1 * e01(b), 1 + e01(b, 0.8), 2 + 2 * e01(b, 0.8)][b.i];
      const r = hypoDraw(g, Math.min(4, s), t, { persist: b.i === 2 && s > 1.6 });
      txt(g, 'punga Rathke', 230, 520, 19, '#cfe0ff', { alpha: s < 2.2 ? 1 : 0 });
      txt(g, 'infundibul', 690, 330, 19, '#d9c6ff');
      if (b.i === 0 || b.i < 0 && s < 1) arr(g, 410, 690, 410, 560, '#cfe0ff', 5, 1);
      if (b.i === 1 || b.i < 0 && s < 1) arr(g, 650, 270, 650, 400, '#d9c6ff', 5, 1);
      if (s > 2.5) { txt(g, 'ADENO-\nhipofiza', r.dx - 30, r.py, 18, OUT, { stroke: false }); txt(g, 'NEURO-', r.NX + 8, r.NY, 15, '#ffffff', { stroke: false }); txt(g, 'lob anterior = ectoderm de suprafață\nlob posterior = tub neural', 500, 860, 18, C.hi); }
      txt(g, '← anterior · CRANIAL ↑', 760, 120, 16, '#e3d6ff', { w: 700 });
    },
  };
}
export function rathke() {
  // aceeași animație, mutată spre dreapta (poza din LP stă în stânga-jos), cu numele părților
  return {
    home: HOME,
    anchors: [[700, 240], [520, 690], [300, 360], [780, 360]],
    phase: (i) => ['1–2 · pornirea', '3 · punga „comprimată”', '4–5 · lobii', '6 · forma matură'][i] || 'figura din LP',
    draw(g, t, b) {
      bg(g);
      let s;
      if (b.i < 0) s = loopT(t, 10) * 4.2;
      else s = [e01(b) * 1, 1 + e01(b), 2 + e01(b), 3 + e01(b)][b.i];
      s = Math.min(4, s);
      g.save(); g.translate(150, -40); g.scale(0.85, 0.85);
      const r = hypoDraw(g, s, t, {});
      g.restore();
      const T = (x, y) => [150 + x * 0.85, -40 + y * 0.85];
      const L = (s0, x, y, tx, ty, col, a) => { if (a <= 0.02) return; const [px, py] = T(x, y); lead(g, px, py, tx, ty, a); txt(g, s0, tx, ty, 16, col, { alpha: a, align: tx < px ? 'right' : 'left' }); };
      const a1 = s < 2.3 ? 1 : 0.0, a3 = clamp((s - 2.2) * 2);
      L('punga Rathke (ectoderm oral)', 470, 520, 400, 540, '#cfe0ff', a1);
      L('procesul infundibular', 565, 340, 820, 230, '#d9c6ff', s < 3 ? 1 : 0);
      L('gâtul pungii', 472, 640, 820, 720, '#cfe0ff', s < 1.9 ? 1 : 0);
      L('pars distalis', r.dx - 40, r.py + 40, 380, 560, '#cfe0ff', a3);
      L('fanta', 480, r.py, 430, 300, C.hi, a3);
      L('pars intermedia', r.NX - r.nr - 8, r.NY + 20, 820, 640, '#cfe0ff', a3);
      L('pars tuberalis', r.NX - 23, 330, 410, 250, '#cfe0ff', clamp((s - 2.6) * 2));
      L('pars nervosa', r.NX + 20, r.NY, 830, 520, '#d9c6ff', clamp((s - 3) * 2));
      L('infundibulul (tija)', r.NX, 300, 840, 330, '#d9c6ff', clamp((s - 3) * 2));
      L('eminența mediană', r.NX, 252, 840, 160, '#d9c6ff', clamp((s - 3) * 2));
      if (s > 1 && s < 2) txt(g, 'mezodermul crește, limitat de gâtul pungii\n→ gâtul se îngustează și se rupe', 640, 840, 17, C.hi);
    },
  };
}

/* =================================================== DIVERTICULUL HIPOFIZAR */
// Ce trebuie să se vadă: IRM-ul din LP (stânga) + schema animată (dreapta): adenohipofiza urcă prin canal de la cavitatea orală
// spre diencefal; normal canalul se închide; aici rămâne deschis (linia roșie pulsează prin sfenoid, sub șaua turcească).
export function divert() {
  return {
    home: HOME,
    anchors: [[150, 560], [250, 420], [720, 160]],
    phase: (i) => ['canal prin corpul sfenoidului', 'hipofiza în șaua turcească', 'canalul persistă'][i] || '',
    draw(g, t, b) {
      bg(g);
      photoCap(g, 'diverticul_irm', 30, 80, 470, 500, 'IRM sagital T2 (săgeata = canalul)', CR, 1);
      if (b.i === 0) ring(g, 145, 450, 60, 50, e01(b)); if (b.i === 1) ring(g, 210, 410, 50, 44, e01(b));
      const s = b.i === 2 ? 4 * e01(b, 0.85) : b.i < 0 ? loopT(t, 9) * 4.2 : 4;
      g.save(); g.translate(500, 120); g.scale(0.52, 0.52); hypoDraw(g, Math.min(4, s), t, { persist: true }); g.restore();
      panel(g, 520, 120, 460, 520, { fill: 'rgba(0,0,0,0)' });
      txt(g, 'normal: gâtul se rupe, canalul se închide\npe măsură ce sfenoidul se osifică', 750, 700, 17, '#d8c4b8', { w: 700 });
      txt(g, 'aici: canalul rămâne deschis\n= canal craniofaringian persistent', 750, 790, 18, C.key);
      txt(g, 'resturi ale pungii → craniofaringiom (manual)', 750, 870, 15, C.cream, { w: 600 });
    },
  };
}

/* =================================================== OCHIUL: vezicula optică → cupa optică + cristalinul (+ colobomul) */
// Ce trebuie să se vadă (secțiune, MEDIAL = stânga = diencefalul; LATERAL = dreapta = ectodermul de suprafață):
// 1 vezicula optică (mov = neuroectoderm) iese din peretele diencefalului spre ectoderm, legată de el prin tija optică;
// 2 ectodermul de suprafață (albastru) se îngroașă exact în fața veziculei = placoda cristaliniană (indusă de veziculă);
// 3 peretele lateral al veziculei se înfundă → cupa cu 2 foițe: internă (groasă, mov) → retina; externă (subțire, devine neagră) → epiteliul pigmentar;
//   placoda se adâncește odată cu ea;
// 4 placoda se desprinde de ectoderm → vezicula cristaliniană în gura cupei; ectodermul se reface deasupra; tija → nervul optic.
// 5 colobomul: privit din față, fisura coroidă e pe fața INFERIOARĂ; normal se închide (S7); dacă nu → iris cu fantă inferioară („gaura cheii”).
function eyeDraw(g, s, t) {
  const CX = 520, CY = 440, R = 140, WX = 120, EX = 790;
  const s1 = clamp(s), s2 = clamp(s - 1), s3 = clamp(s - 2), s4 = clamp(s - 3);
  // diencefalul
  g.save(); g.fillStyle = 'rgba(154,106,214,.18)'; g.fillRect(20, 80, WX - 20, 760); g.restore();
  tube(g, [[WX, 80], [WX, CY - 40]], 26, N.neuro, { ow: 5 }); tube(g, [[WX, CY + 40], [WX, 840]], 26, N.neuro, { ow: 5 });
  txt(g, 'diencefal', 64, 120, 17, '#d9c6ff');
  // poziția veziculei: iese din perete
  const cx = lerp(WX + 40, CX, ease(s1)), rr = lerp(40, R, ease(s1));
  // tija optică
  tube(g, [[WX, CY], [cx - rr + 10, CY]], 70 * lerp(0.6, 1, s1), N.neuro, { ow: 5 });
  tube(g, [[WX - 6, CY], [cx - rr + 20, CY]], 22, mix(N.lumen, N.lumen, 0), { ow: 0 });
  // cupa: lanțul exterior (medial) + lanțul interior (fostul perete lateral)
  const a = lerp(0.001, 0.82, s3); const ri = lerp(rr - 30, R * 0.7, s3);
  const outer = [], inner = [];
  for (let k = 0; k <= 30; k++) { const th = Math.PI / 2 + Math.PI * k / 30; const ph = a + (th - Math.PI / 2) / Math.PI * (2 * Math.PI - 2 * a); const p0 = [cx + rr * Math.cos(th), CY + rr * Math.sin(th)]; const p1 = [cx + rr * Math.cos(ph), CY + rr * Math.sin(ph)]; outer.push([lerp(p0[0], p1[0], s3), lerp(p0[1], p1[1], s3)]); }
  for (let k = 0; k <= 30; k++) { const th = -Math.PI / 2 + Math.PI * k / 30; let ph; if (th <= 0) ph = -a - (Math.PI - a) * (th + Math.PI / 2) / (Math.PI / 2); else ph = Math.PI - (Math.PI - a) * th / (Math.PI / 2); const r0 = rr - 6; const p0 = [cx + r0 * Math.cos(th), CY + r0 * Math.sin(th)]; const p1 = [cx + ri * Math.cos(ph), CY + ri * Math.sin(ph)]; inner.push([lerp(p0[0], p1[0], s3), lerp(p0[1], p1[1], s3)]); }
  // lumenul veziculei (ventriculul optic) — între cele două foițe
  const lp = new Path2D(); const outerRev = outer.slice().reverse();
  lp.moveTo(outer[0][0], outer[0][1]); outer.forEach((p) => lp.lineTo(p[0], p[1]));
  // capătul de jos al exteriorului (unghi ≈ +a sau 3π/2) se leagă de capătul de jos al interiorului
  inner.forEach((p) => lp.lineTo(p[0], p[1])); lp.closePath();
  g.save(); g.fillStyle = N.lumen; g.fill(lp); g.restore();
  const pig = mix(N.neuro, '#1a1020', clamp((s - 2.3) / 0.7));
  tube(g, outer, lerp(24, 14, s3), pig, { raw: true, ow: 5 });
  tube(g, inner, lerp(24, 34, s3), N.neuro, { raw: true, ow: 5 });
  // ectodermul de suprafață + placoda / vezicula cristaliniană
  const thick = clamp(s2 * 1.2); const dip = s4 > 0.55 ? 0 : (s3 * 125 + s4 * 40);
  const ecto = []; for (let y = 60; y <= 860; y += 10) { const gss = Math.exp(-((y - CY) ** 2) / (2 * 55 ** 2)); ecto.push([EX - dip * gss, y]); }
  // grosimea: îngroșarea doar în dreptul veziculei — desenăm banda subțire + segmentul placodei peste
  tube(g, ecto, 18, N.ecto, { raw: true, ow: 5 });
  if (s4 <= 0.55) { const seg = ecto.filter((p) => Math.abs(p[1] - CY) < 70); tube(g, seg, 18 + 22 * thick, N.ecto, { raw: true, ow: 5, glow: s >= 1 && s < 2 ? 0.6 : 0 }); }
  if (s4 > 0.55) { const lx = lerp(EX - 130, cx + ri * 0.6, ease((s4 - 0.55) / 0.45)); ell(g, lx, CY, 56, 60, N.ecto, { ow: 5, shade: N.ectoS }); ell(g, lx, CY, 30, 34, N.ectoL, { ow: 3 }); }
  return { cx, rr, ri, a };
}
export function eye() {
  return {
    home: HOME,
    anchors: [[400, 280], [700, 330], [440, 640], [600, 560], [620, 60]],
    phase: (i) => ['sf. S4 (st. 10): vezicula optică', 'placoda cristaliniană', 'cupa optică: 2 foițe', 'vezicula cristaliniană', 'fisura coroidă (S7) → colobom'][i] || 'retina din creier, cristalinul din piele',
    draw(g, t, b) {
      bg(g);
      let s;
      if (b.i < 0) s = loopT(t, 10) * 4.3;
      else if (b.i < 4) s = b.i + e01(b, 0.75);
      else s = 4;
      s = Math.min(4, s);
      const fr = b.i === 4;
      g.save(); g.globalAlpha = fr ? 0.25 : 1;
      const r = eyeDraw(g, s, t);
      txt(g, 'medial', 64, 880, 15, '#c9b3a6', { w: 700 }); txt(g, 'lateral (suprafața)', 800, 900, 15, '#c9b3a6', { w: 700 });
      txt(g, 'ectoderm', 880, 160, 17, '#cfe0ff');
      if (s < 1.2) txt(g, 'vezicula optică\n(evaginare a diencefalului)', 430, 210, 17, '#d9c6ff');
      if (s >= 1 && s < 2.4) txt(g, 'placoda cristaliniană', 900, 560, 17, '#cfe0ff');
      if (s >= 2.4) { txt(g, 'foița internă → RETINA', 420, 690, 18, '#d9c6ff'); txt(g, 'foița externă (neagră)\n→ epiteliul pigmentar', 420, 160, 17, C.cream); txt(g, 'tija optică → nervul optic', 250, 380, 16, '#d9c6ff'); }
      if (s >= 3.6) txt(g, 'cristalinul\n(ectoderm de suprafață)', 860, 700, 17, '#cfe0ff');
      if (b.i === 0 || b.i === 1) arr(g, 650, CYa, 740, CYa, C.hi, 5, 0.8);
      g.restore();
      if (fr) {
        // vedere din față: fisura coroidă pe fața inferioară
        const u = e01(b, 0.8); const cx = 330, cy = 430;
        panel(g, 60, 90, 560, 720, { fill: 'rgba(20,12,10,.88)', stroke: 'rgba(255,180,138,.7)' });
        txt(g, 'privit din față', cx, 140, 18, C.cream);
        ell(g, cx, cy, 190, 190, '#1a1020', { ow: 6 });
        ell(g, cx, cy, 150, 150, '#b0682c', { ow: 4 });
        // fisura de jos: normal se închide; în colobom rămâne
        const notch = lerp(1, 0.0, b.i === 4 ? (u < 0.5 ? u * 2 : 0) : 0);
        const open = u < 0.5 ? 1 - u * 2 : (u - 0.5) * 2;   // întâi se închide (normal), apoi rămâne deschisă (colobom)
        const W2 = 22 * open + (u >= 0.5 ? 10 : 0);
        g.save(); g.fillStyle = '#120a10'; g.beginPath(); g.moveTo(cx - W2, cy + 40); g.lineTo(cx + W2, cy + 40); g.lineTo(cx + W2 * 0.8, cy + 152); g.lineTo(cx - W2 * 0.8, cy + 152); g.closePath(); g.fill(); g.restore();
        ell(g, cx, cy, 52, 52, '#120a10', { ow: 3 });
        txt(g, u < 0.5 ? 'normal: fisura coroidă se închide (S7)' : 'nu se închide → COLOBOM inferior', cx, 690, 18, u < 0.5 ? '#bff0d2' : C.key);
        txt(g, 'pupila „în gaura cheii”', cx, 740, 17, C.cream, { alpha: u >= 0.5 ? 1 : 0.3 });
        photoCap(g, 'p17_x175', 640, 110, 340, 170, 'Colobom de iris', CR, 1);
        photoCap(g, 'p17_x176', 640, 420, 340, 170, 'Colobom de iris (alt pacient)', CR, 1);
      }
    },
  };
}
const CYa = 440;

/* =================================================== URECHEA: placoda otică → foseta → vezicula otică; urechea medie + externă */
// Ce trebuie să se vadă (secțiune transversală prin cap, SUS = DORSAL): rombencefalul la mijloc; ectodermul de suprafață în jurul capului.
// 1 ectodermul se îngroașă LATERAL, în dreptul rombencefalului (ambele părți) = placoda otică;
// 2 placoda se înfundă SPRE rombencefal = foseta otică;
// 3 foseta se închide și se desprinde → vezicula otică (otocistul) stă lateral de rombencefal, sub ectoderm → urechea internă;
// 4 jos: punga faringiană 1 (galben, endoderm) merge din faringe SPRE lateral; șanțul faringian 1 (albastru) vine din afară SPRE interior;
//   între ele rămâne membrana (timpanul); arcurile 1 + 2 (roșu) dau oscioarele și pavilionul.
export function ear() {
  const CX = 500, CY = 470, RX = 360, RY = 330, RH = [500, 330];
  const th0 = 0.42; // unghiul placodei
  const surf = (th) => [CX + RX * Math.cos(th), CY - RY * Math.sin(th)];
  return {
    home: HOME,
    anchors: [[880, 330], [760, 250], [640, 420], [870, 760]],
    phase: (i) => ['placoda otică (st. 9, S4)', 'foseta otică', 'vezicula otică (otocistul)', 'urechea medie + externă'][i] || '',
    draw(g, t, b) {
      bg(g);
      let s;
      if (b.i < 0) s = loopT(t, 9) * 3.3; else s = Math.min(3, b.i < 3 ? b.i + e01(b, 0.75) : 3);
      s = Math.min(3, s);
      const s1 = clamp(s), s2 = clamp(s - 1), s3 = clamp(s - 2);
      // rombencefalul
      ell(g, RH[0], RH[1], 110, 120, N.neuro, { ow: 6 }); ell(g, RH[0], RH[1], 30, 70, N.lumen, { ow: 3 });
      txt(g, 'rombencefal', RH[0], RH[1] + 150, 18, '#d9c6ff');
      // ectodermul capului (semicerc + laturi), cu foseta care se adâncește
      const dip = s3 > 0.5 ? 0 : lerp(0, 120, s2) + s3 * 40;
      const pts = []; for (let k = 0; k <= 80; k++) { const th = Math.PI * k / 80; let [x, y] = surf(th); const d1 = Math.exp(-((th - th0) ** 2) / 0.006), d2 = Math.exp(-((th - (Math.PI - th0)) ** 2) / 0.006); const nx = Math.cos(th), ny = -Math.sin(th); const dd = dip * (d1 + d2); x -= nx * dd; y -= ny * dd; pts.unshift([x, y]); }
      const side = (sx) => [[sx, CY], [sx, 900]];
      tube(g, side(CX + RX), 18, N.ecto, { ow: 5 }); tube(g, side(CX - RX), 18, N.ecto, { ow: 5 });
      tube(g, pts, 18, N.ecto, { raw: true, ow: 5 });
      // placodele (îngroșarea)
      if (s3 <= 0.5) [th0, Math.PI - th0].forEach((th) => { const seg = []; for (let k = -6; k <= 6; k++) { const tt = th + k * 0.018; let [x, y] = surf(tt); const nx = Math.cos(tt), ny = -Math.sin(tt); const dd = dip * Math.exp(-((tt - th) ** 2) / 0.006); seg.push([x - nx * dd, y - ny * dd]); } tube(g, seg, 18 + 20 * s1, N.ecto, { raw: true, ow: 5, glow: b.i === 0 ? 0.7 : 0 }); });
      // veziculele otice după desprindere
      if (s3 > 0.5) [1, -1].forEach((k) => { const u = ease((s3 - 0.5) / 0.5); const [sx, sy] = surf(k > 0 ? th0 : Math.PI - th0); const x = lerp(sx - k * 120, CX + k * 205, u), y = lerp(sy + 50, RH[1] + 10, u); ell(g, x, y, 46, 50, N.ecto, { ow: 5 }); ell(g, x, y, 24, 28, N.ectoL, { ow: 3 }); });
      txt(g, 'ectoderm de suprafață', 500, 105, 17, '#cfe0ff');
      if (s3 > 0.6) txt(g, 'vezicula otică → urechea internă\n(labirintul membranos)', 790, 440, 16, C.hi);
      txt(g, 'dorsal ↑', 920, 60, 15, '#c9b3a6', { w: 700 });
      // 4 · urechea medie + externă
      const m = b.i === 3 ? e01(b, 0.8) : b.i < 0 ? 0.7 : 0;
      g.save(); g.globalAlpha = b.i === 3 || b.i < 0 ? 1 : 0.35;
      tube(g, [[CX - 120, 810], [CX + 120, 810]], 40, N.endo, { ow: 5 }); txt(g, 'faringe', CX, 810, 15, OUT, { stroke: false });
      tube(g, [[CX + 120, 810], [CX + 120 + 170 * Math.max(m, 0.3), 780]], 30, N.endo, { ow: 5 });
      const gx = CX + RX; tube(g, [[gx, 760], [gx - 50 * Math.max(m, 0.3), 772]], 22, N.ecto, { ow: 5 });
      ell(g, gx - 50, 700, 36, 30, N.meso, { ow: 4 }); ell(g, gx - 50, 860, 36, 30, N.meso, { ow: 4 });
      if (m > 0.7) tube(g, [[CX + 300, 760], [CX + 300, 800]], 5, C.hi, { ow: 0 });
      g.restore();
      if (b.i === 3) { txt(g, 'punga 1 → cavitatea timpanică\n+ tuba auditivă (endoderm)', 300, 700, 16, '#ffe9a8'); txt(g, 'șanțul 1 → conductul\nauditiv extern', 960, 640, 15, '#cfe0ff', { align: 'right' }); txt(g, 'arcurile 1 + 2 → oscioarele,\npavilionul', 300, 880, 16, '#ffb0a8'); }
    },
  };
}

/* =================================================== TEGUMENTUL: trei origini */
// Ce trebuie să se vadă (secțiune prin piele, SUS = suprafața):
// 1 epidermul (albastru, ectoderm): celulele se nasc în stratul bazal și urcă spre suprafață (keratinizare) — mișcarea e DE JOS ÎN SUS;
// 2 melanocitele (verzi, din creasta neurală) vin din adânc, traversează dermul și se opresc în stratul BAZAL al epidermului;
// 3 dermul (roz) + hipodermul (galben) din mezoderm (LP: dermul = mezoderm paraxial): celule mezodermice umplu dermul;
// 4 anexele: muguri de ectoderm cresc DIN epiderm ÎN JOS, în derm: foliculul pilos (apoi firul de păr iese în sus) și glanda (se încolăcește).
export function skin() {
  const EP = [190, 280], DE = [280, 620], HY = [620, 800];
  return {
    home: HOME,
    anchors: [[160, 235], [450, 300], [160, 450], [690, 500]],
    phase: (i) => ['epiderm = ectoderm', 'melanocite = creasta neurală', 'derm + hipoderm = mezoderm', 'anexele: muguri de ectoderm'][i] || 'trei origini',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      // straturile
      const band = (y0, y1, col, a) => { g.save(); g.globalAlpha = a; g.fillStyle = col; g.fillRect(60, y0, 880, y1 - y0); g.restore(); g.save(); g.strokeStyle = OUT; g.lineWidth = 4; g.strokeRect(60, y0, 880, y1 - y0); g.restore(); };
      band(HY[0], HY[1], N.hypo, 0.5 + 0.5 * (b.i === 2 || b.i < 0 ? 1 : 0.4));
      band(DE[0], DE[1], N.derm, 0.5 + 0.5 * (b.i === 2 || b.i < 0 ? 1 : 0.4));
      band(EP[0], EP[1], '#cfe0ff', 1);
      // epidermul: celule care urcă din stratul bazal
      for (let k = 0; k < 16; k++) { const x = 90 + k * 55; dot(g, x, EP[1] - 12, 12, N.ecto, { ow: 3 }); }
      if (b.i === 0 || b.i < 0) for (let k = 0; k < 14; k++) { const u = loopT(t + k * 0.37, 3.5); const x = 110 + k * 60; const y = lerp(EP[1] - 14, EP[0] + 6, u); ell(g, x, y, lerp(11, 18, u), lerp(11, 5, u), mix(N.ecto, '#e8eef8', u), { ow: 2.5 }); }
      // melanocitele: din adânc → stratul bazal
      const pm = p(1);
      [[300, 0], [520, 0.15], [740, 0.3]].forEach(([x, d]) => {
        const u = ease(clamp(pm * 1.2 - d));
        const y = lerp(HY[1] - 10, EP[1] - 8, u);
        if (u < 0.98) crestCell(g, x + Math.sin(u * 6) * 14, y, 1.3, b.i === 1 || b.i < 0 || u > 0 ? 1 : 0.4);
        else melano(g, x, EP[1] - 8, 1.2, 1);
        if ((b.i === 1) && u < 1) tube(g, [[x, HY[1] - 10], [x, y]], 3, N.crest, { ow: 0, dash: [6, 6], alpha: 0.7 });
      });
      // dermul: celule mezodermice
      const pd = p(2);
      for (let k = 0; k < 18; k++) { const x = 100 + (k * 137) % 800, y = DE[0] + 40 + ((k * 89) % 280); dot(g, x, y, 8, N.meso, { ow: 2.5, alpha: 0.35 + 0.65 * pd }); }
      // anexele: foliculul (crește în jos), firul de păr (iese în sus), glanda (încolăcită)
      const pa = p(3);
      const fl = lerp(0, 380, pa);
      if (pa > 0) {
        tube(g, [[690, EP[1] - 10], [690, EP[1] + fl]], 44, N.ecto, { ow: 5 });
        ell(g, 690, EP[1] + fl, 34, 26, N.ecto, { ow: 5 });
        if (pa > 0.6) tube(g, [[690, EP[1] + fl - 10], [690, EP[0] - lerp(0, 90, (pa - 0.6) / 0.4)]], 10, '#3a2418', { ow: 3 });
        const gl = clamp(pa * 1.3);
        tube(g, [[260, EP[1] - 10], [260, EP[1] + 220 * gl]], 22, N.ecto, { ow: 5 });
        if (gl > 0.8) { g.save(); g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 26; g.beginPath(); g.arc(260, EP[1] + 240, 26, 0, Math.PI * 2 * (gl - 0.8) * 5); g.stroke(); g.strokeStyle = N.ecto; g.lineWidth = 18; g.stroke(); g.restore(); }
        txt(g, 'folicul pilos', 820, 560, 18, C.hi, { alpha: pa }); txt(g, 'glandă', 360, 540, 18, C.hi, { alpha: pa });
      }
      // etichete straturi
      txt(g, 'EPIDERM · ectoderm', 960, 235, 17, '#cfe0ff', { align: 'right' });
      txt(g, 'DERM · mezoderm', 960, 300, 17, '#ffd0d4', { align: 'right' });
      txt(g, 'HIPODERM · mezoderm', 960, 650, 17, '#fff0c8', { align: 'right' });
      if (b.i === 1 || b.i < 0) txt(g, 'melanocit (creasta neurală)\n→ stratul bazal', 520, 140, 17, '#bff0d2');
      if (b.i === 3) { pill(g, 300, 860, 300, 50, C.hi, 'unghiile din S10', { size: 18 }); pill(g, 700, 860, 360, 50, C.hi, 'părul (lanugo) vizibil după S16', { size: 18 }); }
    },
  };
}

/* =================================================== CAPCANELE: reluarea scenei potrivite pentru fiecare pereche */
// Ce trebuie să se vadă: pe punctul k rulează în buclă (intro) scena care explică perechea k, micșorată.
export function makeTraps(SC) {
  const MAP = ['closure', 'cord', 'vesicles', 'eye', 'sbForms', 'skin'];
  return function traps() {
    const built = {};
    const get = (n) => (built[n] = built[n] || SC[n]({ spec: {} }));
    return {
      home: HOME,
      anchors: [[90, 80], [90, 80], [90, 80], [90, 80], [90, 80], [90, 80]].map((a, k) => [130 + k * 150, 70]),
      phase: (i) => ['neuroporii', 'alar vs. bazal', 'metencefal vs. mielencefal', 'două origini în același organ', 'occulta / meningocel / mielomeningocel', 'pielea + creasta'][i] || 'ce se confundă la grilă',
      draw(g, t, b) {
        bg(g);
        const k = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 5) % 6 : b.i;
        const sc = get(MAP[k]);
        g.save(); g.beginPath(); g.roundRect(40, 110, 920, 800, 26); g.clip(); g.translate(40, 110); g.scale(0.92, 0.856);
        try { sc.draw(g, t, { i: -1, bt: t, bd: 7, k: 0 }); } catch (e) { /* nimic */ }
        g.restore();
        g.save(); g.strokeStyle = 'rgba(255,180,138,.7)'; g.lineWidth = 4; g.beginPath(); g.roundRect(40, 110, 920, 800, 26); g.stroke(); g.restore();
      },
    };
  };
}
