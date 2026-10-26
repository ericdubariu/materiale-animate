// Kit LP 3 (digestiv + respirator), peste kitul LP 1 (k1.js → ek.js → kit2d.js): paleta D (o culoare pe structură, în tot deck-ul),
// tubul intestinal primitiv în secțiune sagitală, stomacul în secțiune transversală, inelul duodenal, radiografia, traheea + esofagul,
// nou-născutul, toracele, lupa, săgeata curbă (sensul rotațiilor).
export * from './k1.js';
import { C, K, txt, pill, ell, dot, tube, curve, at, sub, flow, ring, lead, arr, OUT, clamp, lerp, ease, paint, blob, bb, smooth, REDUCED, srand, rr, loopT } from './k1.js';

/* ---------- paleta: aceeași în tot deck-ul ----------
   fore = preenteron (galben, ca endodermul), mid = mesenteron (verde), hind = metenteron (mov); art = artere (roșu, cu lumen);
   ecto albastru, meso coral; liver brun-roșcat, gall verde, pancD albastru (mugurele dorsal), pancV portocaliu (ventral);
   trach albastru deschis (căile respiratorii), lung roz; septum (urorectal / traheo-esofagian) roșu; air negru (ca pe film). */
export const D = {
  fore: '#f2c14e', foreS: '#c9951f', foreL: '#fff0b8',
  mid: '#3fae6e', midS: '#247548', midL: '#bfeccf',
  hind: '#9a6ad6', hindS: '#6a46a8', hindL: '#dcc8ff',
  art: '#d93a3a', artS: '#9e2424', artL: '#ff9a9a', lum: '#5a1418',
  ecto: '#5b9bf0', ectoS: '#2f68bd', ectoL: '#cfe0ff',
  meso: '#ef6f62', mesoS: '#bf4a40', mesoL: '#ffc0b6',
  mes: '#ecd2b4', mesS: '#c9a985', mesL: '#fff2e2',      // mezenchim / mezou
  liver: '#a7452f', liverS: '#7a2e1e', liverL: '#d4765e',
  gall: '#4bb35c', gallS: '#2f7d3c', gallL: '#a8e6b0',
  pancD: '#4f8fe6', pancDS: '#2f68bd', pancDL: '#bcd6ff',
  pancV: '#f08a3a', pancVS: '#c8651d', pancVL: '#ffd2a4',
  trach: '#7fb3ff', trachS: '#4a7fd0', trachL: '#d6e6ff',
  lung: '#f2a3a3', lungS: '#d07070', lungL: '#ffd6d6',
  septum: '#d9483f', septumS: '#a12e27',
  skin: '#f3c1a6', skinS: '#d99a80', skinL: '#ffe5d6',
  bone: '#efe6d2', boneS: '#c9bb9a',
  air: '#0b0a0c', film: '#3a3a40', soft: '#8a8a92',
  yolk: '#f7d77e', yolkS: '#e4b84d',
  gutL: '#3a2620',                                        // lumenul (întunecat)
  cream: '#fff3e6', hi: '#ffe36e', key: '#ff6b5e', dim: '#8f7d74',
};

export const sp = (u, a, b) => ease(clamp((u - a) / (b - a)));

// lupă: cerc întunecat cu contur; inner(g) desenează conținutul (în coordonatele scenei), tăiat la cerc
export function lupa(g, x, y, r, a, inner, o = {}) {
  if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a);
  g.save(); g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 24; g.fillStyle = o.fill || '#1d1220'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.restore();
  g.save(); g.beginPath(); g.arc(x, y, r - 3, 0, 7); g.clip(); inner(g); g.restore();
  g.lineWidth = 7; g.strokeStyle = OUT; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.lineWidth = 3.5; g.strokeStyle = '#ffe7d6'; g.stroke();
  g.restore();
}
// săgeată curbă (arc de cerc) de la unghiul a0 la a1 (radiani, sensul ecranului: pozitiv = orar), cu vârf la capăt
export function arcArrow(g, x, y, r, a0, a1, col = D.hi, w = 7, a = 1) {
  if (a <= 0.01 || Math.abs(a1 - a0) < 0.02) return;
  g.save(); g.globalAlpha = clamp(a); g.lineCap = 'round';
  g.strokeStyle = OUT; g.lineWidth = w + 6; g.beginPath(); g.arc(x, y, r, a0, a1, a1 < a0); g.stroke();
  g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.arc(x, y, r, a0, a1, a1 < a0); g.stroke();
  const dir = a1 > a0 ? 1 : -1; const tx = x + Math.cos(a1) * r, ty = y + Math.sin(a1) * r; const ang = a1 + dir * Math.PI / 2;
  g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.moveTo(tx + Math.cos(ang) * 20, ty + Math.sin(ang) * 20); g.lineTo(tx + Math.cos(ang + 2.4) * 20, ty + Math.sin(ang + 2.4) * 20); g.lineTo(tx + Math.cos(ang - 2.4) * 20, ty + Math.sin(ang - 2.4) * 20); g.closePath(); g.fill(); g.stroke();
  g.restore();
}
// etichetă de orientare (mică, gri-cald)
export function orient(g, s, x, y, al = 'center') { txt(g, s, x, y, 15, '#d8c4b8', { w: 700, align: al }); }

/* =================================================== TUBUL INTESTINAL PRIMITIV, SECȚIUNE SAGITALĂ (ca schema din LP, slide 2)
   Orientare: CRANIAL = stânga, CAUDAL = dreapta, DORSAL = sus (aorta dorsală), VENTRAL = jos (sacul vitelin atârnă în jos).
   Tubul (endoderm) merge de la membrana bucofaringiană (capătul stâng) la membrana cloacală (capătul drept, sub cloacă).
   Segmentele, de la stânga la dreapta: PREENTERON galben (până la diverticulul hepatic), MESENTERON verde (până la 1/3 stângă a
   transversului), METENTERON mov (până la cloacă). Fiecare are artera lui din aorta dorsală: a. celiacă (stânga), a. mezenterică
   sup. (mijloc, pe axul ansei), a. mezenterică inf. (dreapta). Stomacul = dilatare fusiformă pe preenteron; diverticulul respirator
   (albastru) iese din peretele VENTRAL al preenteronului, cranial de stomac; diverticulul hepatic (galben → brun) iese ventral la granița
   preenteron/mesenteron; ductul vitelin pleacă din vârful mesenteronului în jos, spre sacul vitelin; alantoida pleacă din fața cloacei
   în jos-stânga (spre cordon). Coordonate locale: x ∈ [-440, 440], y ∈ [-250, 300]; s = 1.
   o: seg (0..1 colorarea segmentelor), segA{0,1,2} (opacitatea fiecărui segment), art[k] (0..1 cât e desenată artera k), flowA (hematii),
   liver (0..1 mugurele hepatic → ficat), gall (0..1 vezica), panc (0..1 mugurii pancreatici), lung (0..1 diverticulul), lobar (0..1 bronhiile lobare),
   stomach (0..1 dilatarea), hernia (0..1 ansa iese prin ductul vitelin în cordon), mouthOpen (0..1 membrana bucofaringiană se rupe),
   cloacaOpen (0..1 membrana cloacală se rupe), septum (0..1 septul urorectal), yolk (sacul vitelin), body (silueta embrionului), alpha.
   Întoarce reperele (coordonate globale). */
export function gutTube(g, x, y, s, t, o = {}) {
  const a = o.alpha ?? 1; const T = (px, py) => [x + px * s, y + py * s];
  const AY = -210; // aorta dorsală
  const TUBE = [[-420, -6], [-330, 2], [-240, 24], [-150, 44], [-60, 54], [40, 56], [150, 46], [250, 26], [330, 8], [400, 0]];
  const P = curve(TUBE, 10);
  const uAt = (px) => clamp((px + 420) / 820);
  const U_LIV = uAt(-150), U_MID = uAt(230); // granițele: diverticulul hepatic · 1/3 stângă a transversului
  const R = {
    mouth: T(-420, -6), cloaca: T(372, 4), cloacaMem: T(372, 54), stomach: T(-235, 20), liver: T(-150, 150), lung: T(-330, 110), lobar: T(-330, 150),
    yolk: T(60, 250), vit: T(50, 120), allant: T(300, 160), art: [T(-240, -100), T(40, -80), T(290, -100)], seg: [T(-290, 0), T(60, 50), T(300, 20)],
    aorta: T(0, AY), duo: T(-110, 48), hernia: T(50, 190),
  };
  if (a <= 0.01) return R;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s);
  const ow = 5 / s;
  // silueta embrionului (translucidă): corpul în jurul tubului, capul la stânga-sus, coada la dreapta
  if (o.body !== false) {
    const bd = smooth([[-470, -300], [-300, -330], [-100, -320], [120, -316], [320, -300], [460, -240], [470, -80], [440, 60], [360, 120], [200, 112], [60, 110], [-100, 112], [-280, 100], [-420, 80], [-480, -60], [-500, -200]]);
    g.save(); g.globalAlpha *= 0.22; paint(g, bd, D.skin, D.skinS, D.skinL, [-500, -330, 970, 450], OUT, 0); g.restore();
    g.save(); g.globalAlpha *= 0.35; g.strokeStyle = D.skinL; g.lineWidth = 3; g.stroke(bd); g.restore();
  }
  // aorta dorsală + arterele (desenate înaintea tubului, ca să iasă din spatele lui)
  tube(g, [[-400, AY], [400, AY]], 22, D.art, { ow, lumen: 'rgba(70,10,14,.5)' });
  if (o.flowA) flow(g, curve([[-400, AY], [400, AY]]), t, D.artL, 7, 0.12, 5, { alpha: o.flowA });
  const ART = [[[-240, AY], [-236, -120], [-232, 10]], [[40, AY], [44, -60], [44, 50]], [[290, AY], [292, -80], [296, 20]]];
  const artP = o.art || [1, 1, 1];
  ART.forEach((pts, k) => { const u1 = clamp(artP[k]); if (u1 <= 0.01) return; const Pk = tube(g, pts, 14, D.art, { ow, u1, lumen: 'rgba(70,10,14,.5)' }); if (o.flowA) flow(g, Pk, t + k, D.artL, 3, 0.35, 4, { alpha: o.flowA, u1 }); });
  // sacul vitelin + ductul vitelin (ventral, la mijloc)
  if (o.yolk !== false) {
    const hp = clamp(o.hernia ?? 0);
    ell(g, 60, 250, 70, 64, D.yolk, { ow, shade: D.yolkS, light: '#fff2c4' });
    tube(g, [[50, 60], [52, 120], [58, 188]], 16, D.yolk, { ow });
    // hernia fiziologică: ansa (verde) iese prin ductul vitelin în jos, spre cordon
    if (hp > 0.01) { const d = 110 * hp; tube(g, [[20, 56], [10, 60 + d * 0.5], [30, 60 + d], [70, 60 + d], [90, 60 + d * 0.5], [80, 56]], 20, D.mid, { ow, alpha: hp }); }
  }
  // alantoida: din fața cloacei, în jos-stânga (spre cordonul ombilical)
  tube(g, [[352, 30], [330, 100], [296, 160], [250, 210]], 14, D.yolk, { ow: 4 / s });
  // tubul: segmentele colorate, sau doar endoderm galben
  const seg = clamp(o.seg ?? 1); const SA = o.segA || [1, 1, 1];
  const segCol = (k) => [D.fore, D.mid, D.hind][k], segS = (k) => [D.foreS, D.midS, D.hindS][k];
  const base = tube(g, TUBE, 44, D.fore, { ow: 8 / s, lumen: D.gutL });
  if (seg > 0.01) [[0, U_LIV], [U_LIV, U_MID], [U_MID, 1]].forEach(([u0, u1], k) => { const mid = (u0 + u1) / 2, hw = (u1 - u0) / 2 * seg; tube(g, TUBE, 44, segCol(k), { ow: 0, u0: mid - hw, u1: mid + hw, lumen: D.gutL, alpha: SA[k] }); });
  // stomacul: dilatare fusiformă pe preenteron
  const stP = clamp(o.stomach ?? 1);
  if (stP > 0.02) { const [sx, sy, sa] = at(P, uAt(-235)); const e = new Path2D(); e.ellipse(sx, sy, 62 * stP, 36 * stP, sa, 0, 7); paint(g, e, D.fore, D.foreS, D.foreL, [sx - 62, sy - 36, 124, 72], OUT, ow); g.save(); g.fillStyle = D.gutL; g.beginPath(); g.ellipse(sx, sy, 46 * stP, 20 * stP, sa, 0, 7); g.fill(); g.restore(); }
  // membranele: bucofaringiană (stânga, verticală) · cloacală (sub cloacă)
  const mo = clamp(o.mouthOpen ?? 0), co = clamp(o.cloacaOpen ?? 0);
  const mem = (mx, my, len, rot, open) => { g.save(); g.translate(mx, my); g.rotate(rot); g.globalAlpha *= 1 - open; const p = new Path2D(); p.roundRect(-7, -len / 2, 14, len, 6); paint(g, p, D.ecto, null, null, [-7, -len / 2, 14, len], OUT, 3 / s); g.fillStyle = D.fore; g.fillRect(2, -len / 2 + 4, 4, len - 8); g.restore(); };
  mem(-424, -6, 70, 0, mo);
  // cloaca: dilatare la capătul metenteronului, membrana cloacală dedesubt (orizontală)
  { const e = new Path2D(); e.ellipse(372, 6, 44, 40, 0, 0, 7); paint(g, e, seg > 0.5 ? D.hind : D.fore, seg > 0.5 ? D.hindS : D.foreS, D.hindL, [328, -34, 88, 80], OUT, ow); g.save(); g.fillStyle = D.gutL; g.beginPath(); g.ellipse(372, 6, 26, 22, 0, 0, 7); g.fill(); g.restore();
    const sq = clamp(o.septum ?? 0); if (sq > 0.01) { tube(g, [[372, -30], [372, -30 + 60 * sq]], 9, D.septum, { ow: 3 / s, alpha: sq }); }
    mem(372, 50, 60, Math.PI / 2, co); if (co > 0.5) { dot(g, 358, 50, 6, D.gutL, { ow: 2 }); dot(g, 388, 50, 6, D.gutL, { ow: 2 }); } }
  // diverticulul respirator (ventral, cranial de stomac) + bronhiile lobare (3 dr. + 2 stg.)
  const lp = clamp(o.lung ?? 0);
  if (lp > 0.01) { const [lx, ly] = at(P, uAt(-330)); tube(g, [[lx, ly + 10], [lx - 4, ly + 10 + 60 * lp], [lx - 6, ly + 10 + 90 * lp]], 16, D.trach, { ow, alpha: lp });
    const lb = clamp(o.lobar ?? 0); if (lb > 0.01) { const by = ly + 100; [[-1, 3], [1, 2]].forEach(([sd, n]) => { for (let k = 0; k < n; k++) { const ex = lx - 6 + sd * (26 + k * 16) * lb, ey = by + 16 + k * 14 * lb; tube(g, [[lx - 6, by], [ex, ey]], 9, D.trach, { ow: 3 / s, alpha: lb }); } }); } }
  // diverticulul hepatic (ventral, la granița preenteron/mesenteron) → ficatul în septul transvers · vezica · mugurii pancreatici
  const lv = clamp(o.liver ?? 0);
  if (lv > 0.01) { const [hx, hy] = at(P, U_LIV); tube(g, [[hx, hy + 14], [hx - 6, hy + 40 + 30 * lv]], 16, D.fore, { ow, alpha: lv });
    const bl = blob(hx - 10, hy + 90 + 20 * lv, 60 * lv, 48 * lv, 0.2, t, 0.05, 14, 3); g.save(); g.globalAlpha *= lv; paint(g, bl, D.liver, D.liverS, D.liverL, bb(hx - 10, hy + 100, 60, 48), OUT, ow); g.restore();
    const gl = clamp(o.gall ?? 0); if (gl > 0.01) { tube(g, [[hx - 2, hy + 50], [hx - 40 * gl, hy + 70 + 10 * gl]], 8, D.gall, { ow: 3 / s, alpha: gl }); ell(g, hx - 48 * gl, hy + 80, 14 * gl, 11 * gl, D.gall, { ow: 3 / s, alpha: gl, shade: D.gallS }); }
    const pc = clamp(o.panc ?? 0); if (pc > 0.01) { ell(g, hx + 14, hy + 56 + 14 * pc, 16 * pc, 11 * pc, D.pancV, { ow: 3 / s, alpha: pc, shade: D.pancVS }); ell(g, hx + 30, hy - 34 - 10 * pc, 20 * pc, 12 * pc, D.pancD, { ow: 3 / s, alpha: pc, shade: D.pancDS, rot: 0.3 }); } }
  g.restore();
  R.P = P.map(([px, py]) => T(px, py)); R.u = { liv: U_LIV, mid: U_MID };
  return R;
}

/* =================================================== STOMACUL ÎN SECȚIUNE TRANSVERSALĂ, PRIVIT DINSPRE CAP (ca schema din LP, slide 6)
   Orientare: POSTERIOR = sus (aorta, coloana), ANTERIOR = jos (peretele ventral); DREAPTA embrionului = stânga ecranului,
   STÂNGA embrionului = dreapta ecranului. Stomacul = elipsă alungită dorso-ventral, legată de peretele dorsal prin MEZOGASTRUL DORSAL
   (sus) și de peretele ventral prin MEZOGASTRUL VENTRAL (jos). Marcajele R / L stau pe fețele dreaptă / stângă ale stomacului.
   rot = unghiul rotației (radiani, pozitiv = ORAR pe ecran): la 90° orar, fața stângă (L) ajunge ANTERIOR (jos), mezogastrul dorsal e tras
   spre stânga embrionului (dreapta ecranului) și lasă în spatele stomacului buzunarul = BURSA OMENTALĂ. Întoarce reperele. */
export function stomachSec(g, x, y, s, t, rot, o = {}) {
  const a = o.alpha ?? 1; const T = (px, py) => [x + px * s, y + py * s];
  const RW = 300; // raza peretelui
  const rx = 62, ry = 112; // stomacul
  const rl = (px, py) => [px * Math.cos(rot) - py * Math.sin(rot), px * Math.sin(rot) + py * Math.cos(rot)];
  const Lp = rl(rx + 8, 0), Rp = rl(-rx - 8, 0), Dp = rl(0, -ry), Vp = rl(0, ry);
  const R = { L: T(...Lp), R: T(...Rp), dors: T(...Dp), vent: T(...Vp), bursa: T(60, -110), wallTop: T(0, -RW), wallBot: T(0, RW), aorta: T(0, -RW + 46) };
  if (a <= 0.01) return R;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s);
  const ow = 5 / s;
  // peretele corpului (inel de piele + mezenchim)
  const wall = new Path2D(); wall.arc(0, 0, RW, 0, 7); paint(g, wall, D.mes, D.mesS, D.mesL, [-RW, -RW, RW * 2, RW * 2], OUT, 0);
  g.save(); g.strokeStyle = OUT; g.lineWidth = 26; g.stroke(wall); g.strokeStyle = D.skin; g.lineWidth = 18; g.stroke(wall); g.restore();
  // celomul (cavitatea peritoneală): disc întunecat
  const coel = new Path2D(); coel.arc(0, 0, RW - 34, 0, 7); g.save(); g.fillStyle = '#2a1c22'; g.fill(coel); g.restore();
  // coloana + aorta (posterior = sus)
  ell(g, 0, -RW + 10, 40, 24, D.bone, { ow: 3 / s, shade: D.boneS }); ell(g, 0, -RW + 50, 17, 17, D.art, { ow: 3 / s, shade: D.artS }); ell(g, 0, -RW + 50, 7, 7, D.lum, { ow: 0 });
  // mezogastrul dorsal: lamă dublă de la peretele dorsal la fața dorsală a stomacului (se rotește cu stomacul la capătul stomacului)
  const mz = (from, to, col, al = 1) => { const m = [(from[0] + to[0]) / 2 + (to[1] - from[1]) * 0.12, (from[1] + to[1]) / 2 - (to[0] - from[0]) * 0.12]; tube(g, [from, m, to], 16, col, { ow: 4 / s, alpha: al }); tube(g, [from, m, to], 5, D.mesL, { ow: 0, alpha: al * 0.8 }); };
  mz([0, -RW + 70], Dp, D.mes, o.mesA ?? 1);
  mz([0, RW - 36], Vp, D.mes, o.mesA ?? 1);
  // bursa omentală: buzunarul dintre fața dorsală a stomacului (după rotație) și peretele dorsal
  const bp = clamp(o.bursa ?? 0);
  if (bp > 0.01) { g.save(); g.globalAlpha *= bp * 0.85; const q = new Path2D(); q.moveTo(0, -RW + 70); q.quadraticCurveTo(80, -170, Dp[0] + 20, Dp[1] - 10); q.quadraticCurveTo(70, -60, 10, -20); q.closePath(); g.fillStyle = 'rgba(255,227,110,.35)'; g.fill(q); g.setLineDash([8, 7]); g.strokeStyle = D.hi; g.lineWidth = 3 / s; g.stroke(q); g.restore(); }
  // stomacul (rotit): elipsă; marea curbură = fostul perete dorsal (gros)
  g.save(); g.rotate(rot);
  const st = new Path2D(); st.ellipse(0, 0, rx, ry, 0, 0, 7); paint(g, st, D.fore, D.foreS, D.foreL, [-rx, -ry, rx * 2, ry * 2], OUT, ow);
  g.save(); g.fillStyle = D.gutL; g.beginPath(); g.ellipse(0, 0, rx - 22, ry - 24, 0, 0, 7); g.fill(); g.restore();
  const gc = clamp(o.greater ?? 0); if (gc > 0.01) { g.save(); g.globalAlpha *= gc; g.strokeStyle = D.foreS; g.lineWidth = 12 / s; g.lineCap = 'round'; g.beginPath(); g.ellipse(0, 0, rx - 4, ry - 4, 0, -Math.PI * 0.85, -Math.PI * 0.15); g.stroke(); g.restore(); }
  // marcajele R și L pe fețele stomacului + vagii (puncte) lângă ele
  pill(g, -rx - 10, 0, 34, 30, '#5b9bf0', 'R', { size: 17, ow: 3 / s, col: '#fff' });
  pill(g, rx + 10, 0, 34, 30, '#ff6fb1', 'L', { size: 17, ow: 3 / s, col: '#fff' });
  if (o.vagus) { dot(g, -rx - 32, 26, 7, '#fff0b0', { ow: 2.5 / s }); dot(g, rx + 32, 26, 7, '#fff0b0', { ow: 2.5 / s }); }
  g.restore();
  g.restore();
  return R;
}

/* =================================================== INELUL DUODENAL (secțiune transversală): perete (mezoderm) + epiteliu (endoderm) + lumen
   ph = faza: 0 lumen deschis · 1 epiteliul a proliferat și a ASTUPAT lumenul · 2 au apărut vacuole în masa plină · 3 vacuolele s-au unit → lumen RECANALIZAT.
   Fracțiile dintre faze sunt animate. o.fail = 1 → rămâne plin (atrezie). */
export function duodRing(g, x, y, r, ph, t, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a);
  const ow = o.ow ?? 5;
  const wall = new Path2D(); wall.arc(x, y, r, 0, 7); paint(g, wall, D.meso, D.mesoS, D.mesoL, [x - r, y - r, r * 2, r * 2], OUT, ow);
  // epiteliul: inel galben a cărui margine internă crește spre centru (faza 0→1), apoi se redeschide (faza 2→3)
  const f1 = clamp(ph), f2 = clamp(ph - 1), f3 = clamp(ph - 2);
  const rIn0 = r * 0.5; // lumenul normal
  const fill = o.fail ? 1 : f1 * (1 - f3); // 0 = lumen normal, 1 = plin
  const rIn = lerp(rIn0, 0, fill);
  const ep = new Path2D(); ep.arc(x, y, r * 0.8, 0, 7); paint(g, ep, D.fore, D.foreS, null, [x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.6], OUT, ow * 0.7);
  // celule epiteliale: pe inel la lumen normal, umplu masa când proliferează
  srand(5); const n = 18 + Math.round(26 * fill);
  for (let k = 0; k < n; k++) { const q = (k / n) * Math.PI * 2 + (k % 2) * 0.1; const d = k < 18 ? lerp(rIn0 + r * 0.14, r * 0.66, 0) : rr(r * 0.08, r * 0.6); const dd = lerp(d, Math.max(r * 0.1, d), 0); ell(g, x + Math.cos(q) * dd, y + Math.sin(q) * dd, r * 0.075, r * 0.06, D.foreL, { ow: 2, sc: D.foreS, rot: q }); }
  // lumenul
  if (rIn > 1) { g.save(); g.fillStyle = D.gutL; g.beginPath(); g.arc(x, y, rIn, 0, 7); g.fill(); g.strokeStyle = OUT; g.lineWidth = 2.5; g.stroke(); g.restore(); }
  // vacuolele (faza 2): apar și se unesc spre centru (faza 3)
  if (!o.fail && f2 > 0.01 && f3 < 0.99) { srand(9); const m = 7; for (let k = 0; k < m; k++) { const q = (k / m) * Math.PI * 2; const d = lerp(r * 0.3, r * 0.1, f3) * (0.6 + 0.4 * rr(0, 1)); const vr = r * (0.06 + 0.1 * f2) * (1 - f3 * 0.5); dot(g, x + Math.cos(q) * d, y + Math.sin(q) * d, vr, D.gutL, { ow: 2, alpha: f2 * (1 - f3 * 0.6) }); } }
  g.restore();
}

/* =================================================== RADIOGRAFIA ABDOMINALĂ (schematic): negru = aer, ca pe film.
   Pe film: D (dreapta pacientului) = stânga imaginii, S (stânga pacientului) = dreapta imaginii. Stomacul e pe STÂNGA pacientului → bula
   mare în dreapta imaginii; duodenul proximal e pe DREAPTA pacientului → bula a doua în stânga imaginii, mai jos. Sub ele: fără aer (gri).
   o: stomach (0..1 bula 1), duod (0..1 bula 2), ghost (intestinele punctate, fără aer), alpha. Întoarce reperele. */
export function xray(g, x, y, w, h, t, o = {}) {
  const a = o.alpha ?? 1; const sx = x + w * 0.2, sy = y - h * 0.12, dx = x - w * 0.14, dy = y + h * 0.04;
  const R = { stomach: [sx, sy], duod: [dx, dy], below: [x, y + h * 0.3], D: [x - w / 2 + 22, y - h / 2 + 22], S: [x + w / 2 - 22, y - h / 2 + 22] };
  if (a <= 0.01) return R;
  g.save(); g.globalAlpha = clamp(a);
  const fr = new Path2D(); fr.roundRect(x - w / 2, y - h / 2, w, h, 18); g.save(); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 20; g.fillStyle = D.film; g.fill(fr); g.restore(); g.strokeStyle = OUT; g.lineWidth = 6; g.stroke(fr);
  g.save(); g.clip(fr);
  // trunchiul (țesuturi moi = gri deschis), coloana la mijloc, coastele sus
  const body = smooth([[x - w * 0.34, y - h * 0.46], [x + w * 0.34, y - h * 0.46], [x + w * 0.4, y], [x + w * 0.36, y + h * 0.46], [x - w * 0.36, y + h * 0.46], [x - w * 0.4, y]]);
  g.fillStyle = D.soft; g.fill(body);
  g.strokeStyle = 'rgba(230,230,235,.55)'; g.lineWidth = 3; for (let k = 0; k < 4; k++) { g.beginPath(); g.ellipse(x, y - h * 0.4 + k * 22, w * 0.3, 14, 0, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }
  for (let k = 0; k < 7; k++) { const p = new Path2D(); p.roundRect(x - 13, y - h * 0.42 + k * (h * 0.12), 26, h * 0.09, 5); g.fillStyle = 'rgba(235,235,240,.7)'; g.fill(p); }
  // intestinele fără aer: contur punctat gri (fantomă)
  if (o.ghost) { g.save(); g.globalAlpha *= clamp(o.ghost) * 0.55; g.setLineDash([6, 6]); g.strokeStyle = '#cfcfd6'; g.lineWidth = 2.5; for (let k = 0; k < 4; k++) { g.beginPath(); g.ellipse(x + (k % 2 ? 30 : -30), y + h * 0.18 + k * 24, w * 0.22, 14, 0, 0, 7); g.stroke(); } g.restore(); }
  // bula 1 = stomacul (dreapta imaginii, sus) · bula 2 = duodenul proximal (stânga imaginii, mai jos), legate prin pilor
  const s1 = clamp(o.stomach ?? 0), s2 = clamp(o.duod ?? 0);
  if (s1 > 0.01) { const e = new Path2D(); e.ellipse(sx, sy, w * 0.19 * s1, h * 0.15 * s1, -0.2, 0, 7); g.fillStyle = D.air; g.fill(e); g.strokeStyle = '#1c1b20'; g.lineWidth = 3; g.stroke(e); }
  if (s2 > 0.01) { g.save(); g.strokeStyle = D.air; g.lineWidth = 12 * s2; g.lineCap = 'round'; g.beginPath(); g.moveTo(sx - w * 0.14, sy + h * 0.06); g.lineTo(dx + w * 0.07, dy - h * 0.03); g.stroke(); g.restore(); const e = new Path2D(); e.ellipse(dx, dy, w * 0.12 * s2, h * 0.1 * s2, 0.1, 0, 7); g.fillStyle = D.air; g.fill(e); g.strokeStyle = '#1c1b20'; g.lineWidth = 3; g.stroke(e); }
  g.restore();
  txt(g, 'D', x - w / 2 + 22, y - h / 2 + 24, 16, '#eaeaf0', { stroke: false, w: 800 }); txt(g, 'S', x + w / 2 - 22, y - h / 2 + 24, 16, '#eaeaf0', { stroke: false, w: 800 });
  g.restore();
  return R;
}

/* =================================================== TRAHEEA + ESOFAGUL + STOMACUL, VEDERE DIN FAȚĂ (atrezia esofagiană + fistula)
   Traheea (albastru, cu inele) coboară pe mijloc și se bifurcă în cele 2 bronhii principale; esofagul (galben) stă în spatele ei, ușor
   spre stânga pacientului (= dreapta ecranului), și coboară la stomac (sub diafragm, dreapta ecranului). Dreapta pacientului = stânga ecranului.
   o: atresia (0..1 esofagul se întrerupe: segmentul superior se termină orb = fund de sac), fistula (0..1 esofagul inferior se leagă
   de trahee deasupra bifurcației), air (0..1 aerul trece din trahee prin fistulă în stomac → stomac negru), saliva (0..1 picături care se
   adună în fundul de sac), reflux (0..1 lichid gastric urcă prin fistulă în trahee), probe (0..1 sonda nasogastrică care se oprește în fundul
   de sac), lungs (plămânii schematic). Coordonate locale: y ∈ [-300, 300]. Întoarce reperele. */
export function esoFig(g, x, y, s, t, o = {}) {
  const a = o.alpha ?? 1; const T = (px, py) => [x + px * s, y + py * s];
  const at_ = clamp(o.atresia ?? 0), fi = clamp(o.fistula ?? 0), air = clamp(o.air ?? 0);
  const EX = 44; // esofagul, la dreapta ecranului față de trahee
  const POUCH = -40; // fundul de sac (y)
  const FIST = 70;   // nivelul fistulei (deasupra carinei la 110)
  const R = { pouch: T(EX, POUCH), fistula: T(22, FIST), stomach: T(90, 250), carina: T(0, 110), top: T(0, -300), mouth: T(-30, -300), tr: T(0, -100) };
  if (a <= 0.01) return R;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s);
  const ow = 5 / s;
  // plămânii (schematic, în spate)
  if (o.lungs !== false) { [[-1, 1.0], [1, 0.9]].forEach(([sd, k]) => { const lg = smooth([[sd * 40, 40], [sd * 150, 90], [sd * 170, 220], [sd * 120, 300], [sd * 50, 290], [sd * 30, 160]]); g.save(); g.globalAlpha *= 0.55; paint(g, lg, D.lung, D.lungS, D.lungL, [sd > 0 ? 30 : -170, 40, 140, 260], OUT, ow); g.restore(); }); }
  // esofagul: superior (faringe → fund de sac / sau continuu) + inferior (→ stomac)
  const esoTop = [[EX - 10, -300], [EX, -200], [EX, -60]];
  const esoAll = [[EX - 10, -300], [EX, -200], [EX, -40], [EX, 60], [EX + 10, 160], [EX + 40, 220], [EX + 70, 240]];
  const esoLow = [[EX, 60], [EX + 10, 160], [EX + 40, 220], [EX + 70, 240]];
  // stomacul (galben; negru = aer)
  { const stm = smooth([[70, 230], [130, 232], [172, 262], [160, 300], [100, 312], [50, 290], [40, 256]]); paint(g, stm, lerp(0, 1, air) > 0.5 ? D.air : D.fore, D.foreS, air > 0.5 ? null : D.foreL, [40, 228, 134, 86], OUT, ow); if (air > 0.01 && air <= 0.5) { g.save(); g.globalAlpha *= air * 2; g.fillStyle = D.air; g.fill(stm); g.restore(); } }
  if (at_ < 0.5) { tube(g, esoAll, 30, D.fore, { ow, lumen: D.gutL, alpha: 1 - at_ * 2 }); }
  else { const q = sp(at_, 0.5, 1); tube(g, esoTop, 30, D.fore, { ow, lumen: D.gutL }); ell(g, EX, POUCH + 2, 19, 16, D.fore, { ow, shade: D.foreS }); ell(g, EX, POUCH - 2, 9, 7, D.gutL, { ow: 0 });
    tube(g, esoLow, 26, D.fore, { ow, lumen: D.gutL, alpha: q }); if (fi < 0.3) { ell(g, EX, 60, 15, 12, D.fore, { ow, alpha: q }); } }
  // fistula: esofagul inferior se leagă de trahee deasupra carinei
  if (fi > 0.01) tube(g, [[EX, 62], [EX - 16, 70], [6, FIST]], 20, D.fore, { ow, lumen: D.gutL, u1: fi });
  // traheea cu inele cartilaginoase + bronhiile principale
  tube(g, [[0, -300], [0, 110]], 40, D.trach, { ow, lumen: D.trachL });
  g.save(); g.strokeStyle = D.trachS; g.lineWidth = 4 / s; for (let yy = -280; yy < 100; yy += 22) { g.beginPath(); g.ellipse(0, yy, 18, 6, 0, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); } g.restore();
  [[-1, 1], [1, 1]].forEach(([sd]) => tube(g, [[0, 100], [sd * 40, 150], [sd * 80, 200]], 24, D.trach, { ow, lumen: D.trachL }));
  // sonda nasogastrică: intră pe nas (stânga-sus), coboară prin esofag și se oprește în fundul de sac
  const pr = clamp(o.probe ?? 0);
  if (pr > 0.01) { const path = curve([[-30, -300], [EX - 10, -260], [EX, -180], [EX, POUCH - 4]]); tube(g, path, 7, '#eef2f5', { ow: 2.5 / s, raw: true, u1: pr }); if (pr > 0.95) dot(g, EX, POUCH - 2, 6, '#eef2f5', { ow: 2 / s }); }
  // saliva care se adună în fundul de sac
  const sv = clamp(o.saliva ?? 0);
  if (sv > 0.01) for (let k = 0; k < 4; k++) { const u = loopT(t + k * 0.6, 2.4); const yy = lerp(-290, POUCH - 10, u); dot(g, EX + (k % 2 ? 5 : -5), yy, 5, '#cfe9ff', { alpha: sv * (1 - u * 0.5), ow: 1.5 / s }); }
  // reflux: lichid gastric urcă prin esofagul inferior și fistulă în trahee → bronhii
  const rf = clamp(o.reflux ?? 0);
  if (rf > 0.01 && fi > 0.9) { const path = curve([[80, 240], [EX + 20, 190], [EX, 90], [EX - 16, 70], [4, FIST], [0, 100], [-40, 150], [-80, 200]]); flow(g, path, t, '#b9e07a', 6, 0.22, 6, { alpha: rf }); }
  // aerul: bule din trahee, prin fistulă, în esofagul inferior → stomac
  if (air > 0.01 && fi > 0.9) { const path = curve([[0, -280], [0, 30], [4, FIST], [EX - 14, 68], [EX, 90], [EX + 20, 190], [90, 250]]); flow(g, path, t, '#ffffff', 7, 0.22, 5, { alpha: air }); }
  g.restore();
  return R;
}

/* =================================================== NOU-NĂSCUTUL, VEDERE DIN FAȚĂ (cap + trunchi, pictat)
   (x, y) = centrul abdomenului; s = scara (1 → ~520 înălțime). Dreapta pacientului = stânga ecranului. o: girl (fundiță + gene),
   cry (gura deschisă, ochi strânși), drool (salivă la gură), vomit (0..1 vărsătură bilioasă, verde-gălbuie), cough (0..1 „tuse”: liniuțe),
   distend (0..1 epigastrul bombat), cord (bontul ombilical), noBelly (nu desenează abdomenul: îl desenează scena), alpha.
   Întoarce reperele globale (gură, nas, ombilic, epigastru). */
export function baby(g, x, y, s, t, o = {}) {
  const a = o.alpha ?? 1; const T = (px, py) => [x + px * s, y + py * s];
  const R = { mouth: T(0, -186), nose: T(0, -214), umb: T(0, 30), epi: T(0, -40), head: T(0, -250), belly: T(0, 20), bellyR: T(-70, 20), bellyL: T(70, 20) };
  if (a <= 0.01) return R;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s);
  const ow = 5 / s; const sk = D.skin, skS = D.skinS, skL = D.skinL; const br = REDUCED ? 0 : Math.sin(t * 1.6) * 2;
  // brațele + picioarele (flectate, ca la nou-născut)
  [-1, 1].forEach((sd) => { tube(g, [[sd * 100, -90], [sd * 150, -20], [sd * 120, 40]], 34, sk, { ow }); ell(g, sd * 116, 50, 18, 16, sk, { ow }); tube(g, [[sd * 60, 120], [sd * 130, 150], [sd * 120, 220]], 40, sk, { ow }); ell(g, sd * 118, 232, 22, 14, sk, { ow }); });
  // trunchiul + abdomenul (epigastrul bombat când distend > 0)
  const dz = clamp(o.distend ?? 0);
  const tr = smooth([[-110, -130], [110, -130], [128 + br, -40], [120 + 14 * dz, 40 + br], [90, 130], [-90, 130], [-120 - 14 * dz, 40 + br], [-128 - br, -40]]);
  if (!o.noBelly) { paint(g, tr, sk, skS, skL, [-130, -130, 260, 260], OUT, ow);
    if (dz > 0.02) { g.save(); g.globalAlpha *= dz; const ep = new Path2D(); ep.ellipse(0, -40, 92, 56, 0, 0, 7); g.clip(tr); g.fillStyle = 'rgba(255,255,255,.22)'; g.fill(ep); g.strokeStyle = 'rgba(120,60,40,.35)'; g.lineWidth = 3 / s; g.stroke(ep); g.restore(); }
    // bontul ombilical
    if (o.cord !== false) { ell(g, 0, 30, 10, 8, '#d9b89a', { ow: 3 / s, shade: '#b3906f' }); }
    // scutecul
    const dp = smooth([[-96, 110], [96, 110], [104, 150], [60, 176], [-60, 176], [-104, 150]]); paint(g, dp, '#ffffff', '#dcdce4', null, [-104, 110, 208, 66], OUT, ow);
  }
  // gâtul + capul
  tube(g, [[0, -140], [0, -175]], 44, sk, { ow });
  const hd = new Path2D(); hd.ellipse(0, -250, 92, 86, 0, 0, 7); paint(g, hd, sk, skS, skL, [-92, -336, 184, 172], OUT, ow);
  // părul (fin) + fundița la fetiță
  g.save(); g.clip(hd); g.fillStyle = o.girl ? '#6b3a2a' : '#4a2e22'; g.beginPath(); g.ellipse(0, -300, 84, 46, 0, Math.PI, 0); g.fill(); g.restore();
  if (o.girl) { g.save(); g.translate(58, -318); [[-1], [1]].forEach(([sd]) => { const p = new Path2D(); p.moveTo(0, 0); p.lineTo(sd * 26, -14); p.lineTo(sd * 26, 14); p.closePath(); paint(g, p, '#ff6fb1', '#cf4486', '#ffc2de', [sd > 0 ? 0 : -26, -14, 26, 28], OUT, 3 / s); }); dot(g, 0, 0, 7, '#ff6fb1', { ow: 3 / s }); g.restore(); }
  // urechile
  [-1, 1].forEach((sd) => ell(g, sd * 92, -246, 14, 20, sk, { ow: 4 / s, shade: skS }));
  // ochii (închiși strâns la plâns / tuse; deschiși altfel) + genele (fetiță)
  const cry = clamp(o.cry ?? 0);
  [-1, 1].forEach((sd) => { const ex = sd * 34, ey = -262; if (cry > 0.5) { g.save(); g.strokeStyle = OUT; g.lineWidth = 4 / s; g.lineCap = 'round'; g.beginPath(); g.arc(ex, ey + 4, 13, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); g.restore(); } else { ell(g, ex, ey, 13, 11, '#ffffff', { ow: 3.5 / s }); dot(g, ex + 1, ey + 1, 6.5, '#3a2a28', { ow: 0 }); dot(g, ex - 2, ey - 3, 2.2, '#ffffff', { ow: 0 }); } if (o.girl) { g.save(); g.strokeStyle = OUT; g.lineWidth = 2.5 / s; g.lineCap = 'round'; for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(ex + sd * (4 + k * 5), ey - 11); g.lineTo(ex + sd * (8 + k * 6), ey - 18); g.stroke(); } g.restore(); } });
  // nasul + obrajii
  g.save(); g.strokeStyle = skS; g.lineWidth = 3.5 / s; g.lineCap = 'round'; g.beginPath(); g.arc(0, -214, 9, 0.2, Math.PI - 0.2); g.stroke(); g.restore();
  [-1, 1].forEach((sd) => { g.save(); g.globalAlpha *= 0.5; g.fillStyle = '#f3998a'; g.beginPath(); g.ellipse(sd * 52, -210, 16, 10, 0, 0, 7); g.fill(); g.restore(); });
  // gura: deschisă (plâns / vomă / tuse) sau închisă
  const open = clamp(Math.max(o.cry ?? 0, o.vomit ?? 0, o.cough ?? 0));
  if (open > 0.3) { const m = new Path2D(); m.ellipse(0, -186, 16, 8 + 10 * open, 0, 0, 7); paint(g, m, '#8a2f3a', '#5a1a22', null, [-16, -200, 32, 30], OUT, 3.5 / s); }
  else { g.save(); g.strokeStyle = '#b3545e'; g.lineWidth = 4 / s; g.lineCap = 'round'; g.beginPath(); g.moveTo(-12, -186); g.quadraticCurveTo(0, -178, 12, -186); g.stroke(); g.restore(); }
  // saliva care curge din gură
  const dr = clamp(o.drool ?? 0);
  if (dr > 0.01) { tube(g, [[10, -180], [14, -160], [12, -140]], 7, '#cfe9ff', { ow: 2.5 / s, alpha: dr }); dot(g, 12, -136, 6, '#cfe9ff', { ow: 2 / s, alpha: dr }); for (let k = 0; k < 2; k++) { const u = loopT(t + k * 0.9, 1.8); dot(g, 14, lerp(-130, -90, u), 4, '#cfe9ff', { alpha: dr * (1 - u), ow: 1.5 / s }); } }
  // vărsătura bilioasă (verde-gălbuie), în jet scurt, din gură, lateral
  const vm = clamp(o.vomit ?? 0);
  if (vm > 0.01) { const path = curve([[14, -184], [60, -176], [100, -140], [120, -90]]); tube(g, path, 10, '#b9d35a', { ow: 3 / s, raw: true, alpha: vm * 0.7 }); flow(g, path, t, '#d8e86a', 5, 0.4, 5, { alpha: vm }); }
  // tusea: liniuțe la gură
  const cg = clamp(o.cough ?? 0);
  if (cg > 0.01) { const u = loopT(t, 0.8); g.save(); g.globalAlpha *= cg * (1 - u); g.strokeStyle = '#ffe7d6'; g.lineWidth = 3 / s; g.lineCap = 'round'; [[-1, 0], [-1, 10], [-1, -10]].forEach(([, dy]) => { g.beginPath(); g.moveTo(-26 - u * 20, -186 + dy); g.lineTo(-40 - u * 30, -186 + dy * 1.6); g.stroke(); }); g.restore(); }
  g.restore();
  return R;
}

/* =================================================== TORACELE, VEDERE DIN FAȚĂ: traheea, cei 2 plămâni, inima (mică, la mijloc-stânga)
   Dreapta pacientului = stânga ecranului (plămânul drept, cu 3 lobi, e în stânga ecranului). o: sR / sL (0..1 scara plămânului drept /
   stâng: 1 = normal, mai mic = hipoplazie), atresia (0..1 traheea închisă pe un segment), ribs, alpha. Întoarce reperele. */
export function thorax(g, x, y, s, t, o = {}) {
  const a = o.alpha ?? 1; const T = (px, py) => [x + px * s, y + py * s];
  const R = { trach: T(0, -170), lungR: T(-120, 60), lungL: T(120, 60), heart: T(30, 110), block: T(0, -120) };
  if (a <= 0.01) return R;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s);
  const ow = 5 / s; const br = REDUCED ? 0 : 0.5 + 0.5 * Math.sin(t * 1.4);
  // cutia toracică (contur) + coastele
  const th = smooth([[-150, -230], [150, -230], [240, -120], [250, 120], [200, 260], [-200, 260], [-250, 120], [-240, -120]]);
  paint(g, th, D.skin, D.skinS, D.skinL, [-250, -230, 500, 490], OUT, ow);
  g.save(); g.clip(th); g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 7 / s; for (let k = 0; k < 7; k++) { g.beginPath(); g.ellipse(0, -140 + k * 56, 230, 40, 0, Math.PI * 0.08, Math.PI * 0.92); g.stroke(); } g.restore();
  // plămânii (fiecare scalat din hil)
  const lung = (sd, sc, lobes) => { if (sc <= 0.02) return; g.save(); const hx = sd * 40, hy = 20; g.translate(hx, hy); g.scale(sc * (1 + 0.02 * br), sc * (1 + 0.02 * br)); g.translate(-hx, -hy);
    const lg = smooth([[sd * 40, -150], [sd * 120, -140], [sd * 190, -60], [sd * 200, 80], [sd * 170, 200], [sd * 80, 220], [sd * 40, 160], [sd * 36, 0]]);
    paint(g, lg, D.lung, D.lungS, D.lungL, [sd > 0 ? 36 : -200, -150, 164, 370], OUT, ow);
    g.save(); g.clip(lg); g.strokeStyle = D.lungS; g.lineWidth = 3 / s; for (let k = 1; k < lobes; k++) { g.beginPath(); g.moveTo(sd * 36, -60 + k * 110); g.lineTo(sd * 210, -130 + k * 110); g.stroke(); } g.restore(); g.restore(); };
  lung(-1, o.sR ?? 1, 3); lung(1, o.sL ?? 1, 2);
  // inima (mică, spre stânga pacientului = dreapta ecranului)
  const beat = REDUCED ? 0 : Math.max(0, Math.sin(t * 5)) ** 6 * 0.05; g.save(); g.translate(30, 110); g.scale(0.5 + beat, 0.5 + beat); const hp = new Path2D(); hp.moveTo(0, -40); hp.bezierCurveTo(30, -78, 92, -52, 80, 2); hp.bezierCurveTo(70, 46, 22, 74, 0, 96); hp.bezierCurveTo(-22, 74, -70, 46, -80, 2); hp.bezierCurveTo(-92, -52, -30, -78, 0, -40); hp.closePath(); paint(g, hp, '#e25b6a', '#ad3646', '#ff9aa6', [-90, -78, 180, 174], OUT, 8 / s); g.restore();
  // traheea + bronhiile; atrezia = segment plin (închis)
  tube(g, [[0, -260], [0, -60]], 30, D.trach, { ow, lumen: D.trachL });
  [[-1], [1]].forEach(([sd]) => tube(g, [[0, -66], [sd * 36, -30], [sd * 70, 10]], 20, D.trach, { ow, lumen: D.trachL }));
  g.save(); g.strokeStyle = D.trachS; g.lineWidth = 3.5 / s; for (let yy = -250; yy < -70; yy += 18) { g.beginPath(); g.ellipse(0, yy, 13, 5, 0, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); } g.restore();
  const atr = clamp(o.atresia ?? 0);
  if (atr > 0.01) { const p = new Path2D(); p.roundRect(-16, -150, 32, 60 * atr, 8); paint(g, p, D.septum, D.septumS, null, [-16, -150, 32, 60], OUT, 3 / s); }
  g.restore();
  return R;
}
