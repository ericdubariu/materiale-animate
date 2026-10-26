// Kit LP 1 (reproducerea), peste kitul de embriologie: cromozomi cu cromatide, celule organice, gameți,
// stadiile embrionului, fătul, bazinul gravid în secțiune sagitală, silueta umană, mâna.
export * from './ek.js';
import { C, txt, pill, ell, dot, tube, curve, at, sub, OUT, clamp, lerp, ease, paint, blob, bb, smooth, REDUCED } from './ek.js';
import { srand, rnd, rr, blobPts } from './kit2d.js';
export { srand, rnd, rr, blobPts };

// aceleași culori în tot deck-ul
export const K = {
  mat: '#ef5a6a', matS: '#b8344a',      // cromozom matern
  pat: '#5b9bf0', patS: '#2f68bd',      // cromozom patern
  dad: '#4cc27a', dadS: '#23824c',      // cromozomul 21 al tatălui (cazul)
  cgp: '#5fd38d', cgpS: '#2f9a5c',      // celulele germinale primordiale
  cyt: '#ffe4cf', cytS: '#f0bf9e', cytL: '#fff6ee',   // citoplasma (celule somatice / spermatogeneză)
  ooc: '#ffd2e1', oocS: '#efa2bf', oocL: '#fff0f6',   // citoplasma ovocitului
  zona: '#fff3c9', corona: '#f6c79c',
  nuc: '#efe4ff', nucS: '#b9a3ea',      // nucleul (anvelopa)
  spH: '#dfeaff', spA: '#8fb8ff',       // capul spermatozoidului, acrozomul
  skin: '#f6bd9c', skinS: '#df9473', skinL: '#ffe0cc',
  endo: '#ec8796', endoS: '#c95a6c',    // endometru
  myo: '#cf5f74', myoS: '#a2405a',      // miometru
  fluid: '#a9dcf3', fluidS: '#79bfe2',  // lichid amniotic
  plac: '#b03852', placS: '#7f2238',    // placenta / vilozități
  cord: '#e9dcf5', cordS: '#b9a3d6',    // cordonul ombilical
  blad: '#f4d36b', bladS: '#cfa634',    // vezica urinară
  bone: '#efe6d2', boneS: '#c9bb9a',
  chor: '#ef6b5e', amn: '#5b9bf0', emb: '#ffa24d', // gemeni: corion / amnios / embrion
  ecto: '#5b9bf0', meso: '#ef5a6a', endoL: '#f4c34f', // cele 3 foițe
  bad: '#ff6b5e', ok: '#5cc48a', warnY: '#ffd166',
  boy: '#6fb2ff', girl: '#ff8fc2',
};

/* ---------- cromozomi ---------- */
// o cromatidă: braț p (sus, scurt) + braț q (jos, lung), unite la centromer; segs = [[u0,u1,culoare]] de-a lungul ei (0 = vârful p)
function chromatid(g, A, Cn, B, w, col, segs, sc) {
  const P = curve([A, Cn, B], 10);
  const p = new Path2D(); p.moveTo(P[0][0], P[0][1]); for (let k = 1; k < P.length; k++) p.lineTo(P[k][0], P[k][1]);
  g.lineCap = 'round'; g.lineJoin = 'round';
  g.strokeStyle = OUT; g.lineWidth = w + 6; g.stroke(p);
  g.strokeStyle = col; g.lineWidth = w; g.stroke(p);
  // lumină pe chromatidă
  g.save(); g.globalAlpha *= 0.35; g.strokeStyle = '#ffffff'; g.lineWidth = w * 0.28; g.translate(-w * 0.18, 0); g.stroke(p); g.restore();
  (segs || []).forEach(([u0, u1, c]) => {
    const Q = sub(P, u0, u1); if (Q.length < 2) return;
    const q = new Path2D(); q.moveTo(Q[0][0], Q[0][1]); for (let k = 1; k < Q.length; k++) q.lineTo(Q[k][0], Q[k][1]);
    g.save(); g.lineCap = (u0 <= 0.01 || u1 >= 0.99) ? 'round' : 'butt'; g.strokeStyle = c; g.lineWidth = w; g.stroke(q); g.restore();
  });
  if (sc) { g.save(); g.lineCap = 'round'; g.strokeStyle = sc; g.lineWidth = 3; g.setLineDash([2, 7]); g.stroke(p); g.restore(); }
}
// cromozom: o.dup = 2 cromatide surori (X dublat), altfel 1 cromatidă; h = lungimea; o.cen = poziția centromerului (0 = sus)
// o.segL / o.segR = segmente pe cromatida stângă / dreaptă; o.seg = pe cromatida simplă
export function chromo(g, x, y, h, col, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(o.rot || 0); if (o.s) g.scale(o.s, o.s);
  const w = o.w || Math.max(9, h * 0.2); const cy = -h / 2 + h * (o.cen ?? 0.36);
  const spl = o.splay ?? w * 0.35; const sep = o.sep ?? w * 0.62;
  if (o.dup) {
    [-1, 1].forEach((s) => chromatid(g, [s * (sep + spl), -h / 2], [s * sep * 0.82, cy], [s * (sep + spl * 1.3), h / 2], w, col, s < 0 ? o.segL : o.segR, o.sc));
    ell(g, 0, cy, w * 0.78, w * 0.5, o.cenCol || '#fff3e6', { ow: 3 });
  } else {
    chromatid(g, [0, -h / 2], [o.bend || 0, cy], [0, h / 2], w, col, o.seg, o.sc);
    ell(g, 0, cy, w * 0.5, w * 0.38, o.cenCol || '#fff3e6', { ow: 3 });
  }
  if (o.label) txt(g, o.label, 0, h / 2 + 22, o.ls || 17, o.lc || C.cream, { w: 800 });
  if (o.glow) { g.save(); g.globalAlpha = clamp(o.glow) * a; g.strokeStyle = C.hi; g.lineWidth = 4; g.shadowColor = C.hi; g.shadowBlur = 18; g.setLineDash([10, 8]); g.beginPath(); g.ellipse(0, 0, w * 2.4 + 10, h / 2 + 16, 0, 0, 7); g.stroke(); g.restore(); }
  g.restore();
}

/* ---------- celule ---------- */
// celulă organică (membrană ușor ondulată), opțional nucleu; o.fill / o.shade / o.light
export function cellB(g, x, y, rx, ry, t, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return null;
  const p = blob(x, y, rx, ry, o.rot || 0, t, o.wob ?? 0.025, 18, o.seed || 0);
  g.save(); g.globalAlpha = clamp(a);
  paint(g, p, o.fill || K.cyt, o.shade || K.cytS, o.light || K.cytL, bb(x, y, rx, ry), OUT, o.ow ?? 5);
  if (o.nuc) { const [nx, ny, nr] = o.nuc; const q = blob(nx, ny, nr, nr * 0.92, 0, t, 0.03, 14, 3); g.fillStyle = o.nucFill || K.nuc; g.fill(q); g.setLineDash(o.nucDash ? [7, 6] : []); g.strokeStyle = K.nucS; g.lineWidth = 3; g.stroke(q); g.setLineDash([]); }
  if (o.glow) { g.strokeStyle = C.hi; g.lineWidth = 4; g.shadowColor = C.hi; g.shadowBlur = 20 * o.glow; g.globalAlpha = clamp(o.glow) * a; g.stroke(p); }
  g.restore(); return p;
}
// fibrele fusului de diviziune: de la pol la fiecare țintă
export function spindleFib(g, pole, targets, a = 1, col = '#fff3e6') {
  if (a <= 0.01) return; g.save(); g.globalAlpha = 0.45 * a; g.strokeStyle = col; g.lineWidth = 2;
  targets.forEach(([x, y]) => { g.beginPath(); g.moveTo(pole[0], pole[1]); g.quadraticCurveTo((pole[0] + x) / 2 + (y - pole[1]) * 0.08, (pole[1] + y) / 2, x, y); g.stroke(); });
  g.globalAlpha = a; dot(g, pole[0], pole[1], 7, '#fff3e6', { ow: 3 }); g.restore();
}
// diviziune: o celulă care se strangulează (furrow 0 = rotundă, 1 = două celule); axa orizontală
export function dividing(g, x, y, r, f0, t, o = {}) {
  const f = Math.min(f0, 0.97); {
    // corpul cu șanț de clivaj
    const k = ease(f); const pts = [];
    for (let i = 0; i < 40; i++) { const a = (i / 40) * Math.PI * 2; const c = Math.cos(a), s = Math.sin(a); const pinch = 1 - 0.55 * k * Math.pow(Math.abs(s), 3) * (1 - Math.abs(c)) * 2.2; pts.push([x + c * r * (1 + 0.45 * k), y + s * r * clamp(pinch, 0.2, 1) * (1 - 0.1 * k)]); }
    paint(g, smooth(pts), o.fill || K.cyt, o.shade || K.cytS, o.light || K.cytL, bb(x, y, r * 1.45, r), OUT, 5);
  }
}

/* ---------- gameții ---------- */
// spermatozoid: cap ovoid (acrozom), piesa intermediară, coadă ondulată animată; kind: normal | twohead | giant | tiny | coil | twotail | bighead
export function sperm(g, x, y, s, rot, t, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  const kind = o.kind || 'normal'; const S = s * (kind === 'giant' ? 1.7 : kind === 'tiny' ? 0.55 : 1);
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(rot); g.scale(S, S);
  const ph = REDUCED ? 0 : t * 9;
  const tail = [];
  const L = kind === 'coil' ? 70 : 150;
  for (let k = 0; k <= 24; k++) { const u = k / 24; tail.push([-30 - u * L, Math.sin(u * 8 - ph) * 10 * u + (kind === 'coil' ? Math.cos(u * 14) * 18 * u : 0)]); }
  const draw = (pts) => { const p = new Path2D(); p.moveTo(pts[0][0], pts[0][1]); pts.forEach((q) => p.lineTo(q[0], q[1])); g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = OUT; g.lineWidth = 7; g.stroke(p); g.strokeStyle = o.tail || '#fff3e6'; g.lineWidth = 3.2; g.stroke(p); };
  draw(tail); if (kind === 'twotail') draw(tail.map(([u, v], k) => [u, -v - k * 0.9]));
  tube(g, [[-34, 0], [-14, 0]], 8, '#d9c6ff', { ow: 4 });
  const head = (hx, hy, hs) => { const p = new Path2D(); p.ellipse(hx, hy, 20 * hs, 13 * hs, 0, 0, 7); paint(g, p, o.col || K.spH, '#b9cdf0', '#ffffff', bb(hx, hy, 20 * hs, 13 * hs), OUT, 4 / S); g.save(); g.clip(p); g.fillStyle = K.spA; g.beginPath(); g.ellipse(hx + 12 * hs, hy, 12 * hs, 14 * hs, 0, 0, 7); g.fill(); g.restore(); g.strokeStyle = OUT; g.lineWidth = 4 / S; g.stroke(p); };
  if (kind === 'twohead') { head(4, -12, 0.85); head(4, 12, 0.85); } else head(0, 0, kind === 'bighead' ? 1.5 : 1);
  g.restore();
}
// ovocit: zona pellucida + (opțional) coroana radiata + citoplasma; o.inner(g) desenează conținutul în coordonate locale
export function oocyte(g, x, y, r, t, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a);
  if (o.corona) { srand(7); for (let k = 0; k < 26; k++) { const q = (k / 26) * Math.PI * 2 + rr(-0.08, 0.08); const d = r * 1.32 + rr(-4, 6); ell(g, x + Math.cos(q) * d, y + Math.sin(q) * d, r * 0.16, r * 0.11, K.corona, { rot: q, ow: 3 }); } }
  if (o.zona !== false) { g.save(); g.fillStyle = 'rgba(255,243,201,.55)'; g.beginPath(); g.arc(x, y, r * 1.16, 0, 7); g.fill(); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(); g.restore(); }
  cellB(g, x, y, r, r, t, { fill: o.fill || K.ooc, shade: K.oocS, light: K.oocL, ow: 5, seed: 2 });
  if (o.inner) { g.save(); g.translate(x, y); o.inner(g); g.restore(); }
  if (o.glow) { g.strokeStyle = C.hi; g.lineWidth = 5; g.shadowColor = C.hi; g.shadowBlur = 22; g.globalAlpha = clamp(o.glow) * a; g.beginPath(); g.arc(x, y, r * 1.24, 0, 7); g.stroke(); }
  g.restore();
}
// globul polar
export function polar(g, x, y, r, t, a = 1) { cellB(g, x, y, r, r, t, { fill: K.ooc, shade: K.oocS, light: K.oocL, ow: 4, alpha: a, seed: 5 }); }

/* ---------- conceptusul: segmentare + blastocist ---------- */
export function cleave(g, x, y, r, n, t, o = {}) {
  // n = 1 (zigot cu 2 pronuclei) | 2 | 4 | 8 | 16 (morula)
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a);
  g.fillStyle = 'rgba(255,243,201,.55)'; g.beginPath(); g.arc(x, y, r * 1.12, 0, 7); g.fill(); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke();
  if (n <= 1) { cellB(g, x, y, r, r, t, { fill: K.ooc, shade: K.oocS, light: K.oocL }); ell(g, x - r * 0.25, y, r * 0.22, r * 0.22, '#d9c6ff', { ow: 3 }); ell(g, x + r * 0.25, y, r * 0.22, r * 0.22, '#bfe0ff', { ow: 3 }); }
  else {
    const pos = n === 2 ? [[-0.42, 0], [0.42, 0]] : n === 4 ? [[-0.4, -0.38], [0.4, -0.38], [-0.4, 0.38], [0.4, 0.38]] : null;
    const P = pos || (() => { const out = []; const m = n >= 16 ? 16 : 8; for (let k = 0; k < m; k++) { const q = (k / m) * Math.PI * 2; const d = m === 16 && k % 2 ? 0.32 : 0.55; out.push([Math.cos(q) * d, Math.sin(q) * d]); } if (m === 16) out.push([0, 0]); return out; })();
    const cr = r * (n === 2 ? 0.55 : n === 4 ? 0.46 : n === 8 ? 0.4 : 0.32);
    P.forEach(([u, v], k) => cellB(g, x + u * r, y + v * r, cr, cr, t, { fill: K.ooc, shade: K.oocS, light: K.oocL, ow: 4, seed: k }));
  }
  g.restore();
}
// blastocist: trofoblast (inel), embrioblastul (butonul embrionar) sus, cavitatea; hatch = 0..1 ieșirea din zona
export function blastocyst(g, x, y, r, t, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a);
  if (o.zona !== false) { g.fillStyle = 'rgba(255,243,201,.45)'; g.beginPath(); g.arc(x, y, r * 1.1, 0, 7); g.fill(); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(); }
  const p = blob(x, y, r, r * 0.96, 0, t, 0.02, 18, 1); paint(g, p, '#cfeaff', null, '#ffffff', bb(x, y, r, r), OUT, 5);
  // trofoblastul: celule turtite pe margine
  for (let k = 0; k < 22; k++) { const q = (k / 22) * Math.PI * 2; ell(g, x + Math.cos(q) * r * 0.9, y + Math.sin(q) * r * 0.9, r * 0.16, r * 0.07, o.troph || K.chor, { rot: q + Math.PI / 2, ow: 2.5 }); }
  // butonul embrionar
  const ic = o.icm ?? 1; for (let k = 0; k < 7; k++) { const q = Math.PI * 1.5 + (k - 3) * 0.22; const d = k % 2 ? 0.55 : 0.68; ell(g, x + Math.cos(q) * r * d, y + Math.sin(q) * r * d, r * 0.15, r * 0.14, K.emb, { ow: 3, alpha: ic }); }
  g.restore();
}

/* ---------- embrion + făt (profil) ---------- */
// embrion S4–S8 în formă de C (profil; dorsal = în afară, ventral = în interiorul C-ului): tub cu grosime variabilă de-a lungul
// axei (capul mare sus, coada subțire jos), somitele pe spate, arcurile faringiene + proeminența cardiacă ventral,
// (stage > 0) mugurii membrelor și ochiul. EMB.pt(nume) dă poziția organelor în coordonate locale.
const SPN = [[-38, -88], [0, -122], [58, -112], [100, -62], [112, 6], [96, 70], [56, 108], [6, 116], [-30, 98], [-44, 78]];
const SPW = [96, 98, 80, 66, 62, 58, 50, 34, 18, 6];
const EMBG = (() => {
  const n = SPN.length; const nor = SPN.map((p, k) => { const a = SPN[Math.max(0, k - 1)], c = SPN[Math.min(n - 1, k + 1)]; const dx = c[0] - a[0], dy = c[1] - a[1]; const L = Math.hypot(dx, dy) || 1; return [dy / L, -dx / L]; });
  // nor = spre exterior (dorsal) pentru un C deschis spre stânga
  const out = SPN.map((p, k) => [p[0] + nor[k][0] * SPW[k] / 2, p[1] + nor[k][1] * SPW[k] / 2]);
  const inn = SPN.map((p, k) => [p[0] - nor[k][0] * SPW[k] / 2, p[1] - nor[k][1] * SPW[k] / 2]);
  return { nor, out, inn };
})();
export const EMB = {
  pt: (k) => ({ SNC: [-14, -104], cord: [EMBG.inn[3][0] - 6, EMBG.inn[3][1]], membre: [EMBG.inn[4][0] - 18, EMBG.inn[4][1] + 6], ochi: [-46, -96], ureche: [14, -96], palat: [EMBG.inn[1][0] - 4, EMBG.inn[1][1] + 10], dinti: [EMBG.inn[1][0] + 8, EMBG.inn[1][1] + 14], OGE: [EMBG.inn[7][0] + 4, EMBG.inn[7][1] - 8] }[k]),
};
export function embryoC(g, x, y, s, t, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return; const k = o.stage ?? 0; // 0 = S4, 1 = S8
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s); g.rotate(o.rot || 0);
  const ow = 5 / s; const br = REDUCED ? 0 : Math.sin(t * 1.3) * 1.2;
  // conturul: exterior de la cap la coadă, apoi interior înapoi
  const pts = [...EMBG.out, ...EMBG.inn.slice().reverse()];
  // capul: rotunjit în față
  const head = new Path2D(); head.ellipse(-22, -100, 52 + br * 0.3, 50, -0.4, 0, 7);
  const bodyP = smooth(pts);
  paint(g, bodyP, '#ffc9a6', '#efa07c', '#ffe9da', [-90, -150, 220, 280], OUT, ow);
  paint(g, head, '#ffc9a6', '#efa07c', '#ffe9da', [-74, -150, 104, 100], OUT, ow);
  // reacoperă îmbinarea cap–corp (fără contur)
  g.save(); g.fillStyle = '#ffc9a6'; g.beginPath(); g.ellipse(4, -104, 30, 34, 0, 0, 7); g.fill(); g.restore();
  // creierul (veziculele) vizibil prin transparență
  g.save(); g.globalAlpha *= 0.35; g.fillStyle = '#e7849a'; g.beginPath(); g.ellipse(-20, -112, 30, 22, -0.3, 0, 7); g.fill(); g.beginPath(); g.ellipse(18, -114, 22, 16, 0.2, 0, 7); g.fill(); g.restore();
  // somitele pe spate (dorsal)
  for (let j = 2; j < 9; j += 0.5) { const i0 = Math.floor(j), f = j - i0; const P0 = EMBG.out[i0], P1 = EMBG.out[Math.min(9, i0 + 1)]; const N0 = EMBG.nor[i0]; const px = lerp(P0[0], P1[0], f) - N0[0] * 11, py = lerp(P0[1], P1[1], f) - N0[1] * 11; const sz = lerp(10, 4, (j - 2) / 7); ell(g, px, py, sz, sz * 0.75, '#ef9a7a', { rot: Math.atan2(N0[1], N0[0]), ow: 2.2 / s }); }
  // arcurile faringiene (sub cap, ventral)
  for (let j = 0; j < 3; j++) { const q = EMBG.inn[1]; g.save(); g.strokeStyle = '#d9826a'; g.lineWidth = 3.5 / s; g.beginPath(); g.arc(q[0] + 18 + j * 12, q[1] + 18 + j * 14, 11, Math.PI * 0.6, Math.PI * 1.5); g.stroke(); g.restore(); }
  // proeminența cardiacă
  const hc = EMB.pt('cord'); ell(g, hc[0] + 6, hc[1] - 4, 24, 26, '#e0606a', { ow: 4 / s, light: '#ff9aa2' });
  // ochiul (apare spre S5–S6)
  if (k > 0.2) ell(g, -46, -96, 9, 8, '#3a2340', { ow: 0, alpha: clamp((k - 0.2) * 2.5) });
  // mugurii membrelor (S4 → S8 se alungesc)
  if (k > 0) {
    const L = 8 + 40 * k;
    const bud = (P, dir) => { const e = [P[0] + dir[0] * L, P[1] + dir[1] * L]; tube(g, [P, [lerp(P[0], e[0], 0.6), lerp(P[1], e[1], 0.6) + 4], e], 18, '#ffc9a6', { ow: ow }); if (k > 0.6) ell(g, e[0], e[1], 12, 10, '#ffc9a6', { ow: ow * 0.8 }); };
    bud([EMBG.inn[4][0] + 4, EMBG.inn[4][1]], [-0.85, 0.35]); bud([EMBG.inn[6][0] + 2, EMBG.inn[6][1] - 6], [-0.6, -0.55]);
  }
  g.restore();
}
// fătul ghemuit, profil (fața spre stânga); o.headDown = rotit cu capul în jos
export function fetus(g, x, y, s, t, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s * (o.flip ? -1 : 1), s); g.rotate(o.rot || 0);
  const br = REDUCED ? 0 : Math.sin(t * 1.4) * 0.012;
  const sk = o.skin || K.skin, skS = K.skinS, skL = K.skinL;
  // spatele + trunchiul (bob)
  const trunk = new Path2D();
  trunk.moveTo(-10, -40); trunk.bezierCurveTo(60, -70, 120, -10, 104, 60); trunk.bezierCurveTo(92, 112, 30, 130, -16, 100); trunk.bezierCurveTo(-46, 80, -40, 20, -10, -40); trunk.closePath();
  g.save(); g.scale(1 + br, 1 - br); paint(g, trunk, sk, skS, skL, [-46, -70, 160, 200], OUT, 6 / s); g.restore();
  // piciorul flectat
  tube(g, [[70, 92], [10, 120], [-34, 96], [-50, 120]], 30, sk, { ow: 6 / s });
  ell(g, -56, 124, 20, 12, sk, { ow: 5 / s, rot: 0.3 });
  // brațul
  tube(g, [[10, -8], [-24, 30], [-40, 4]], 22, sk, { ow: 6 / s });
  ell(g, -44, 0, 12, 11, sk, { ow: 5 / s });
  // capul
  const head = new Path2D(); head.ellipse(-30, -86, 66, 60, -0.2, 0, 7); paint(g, head, sk, skS, skL, [-96, -146, 132, 120], OUT, 6 / s);
  // ochi închis, nas, urechea
  g.strokeStyle = OUT; g.lineWidth = 4 / s; g.lineCap = 'round'; g.beginPath(); g.arc(-64, -92, 10, 0.2, Math.PI - 0.2); g.stroke();
  g.beginPath(); g.moveTo(-94, -76); g.quadraticCurveTo(-102, -66, -92, -62); g.stroke();
  g.beginPath(); g.ellipse(-12, -86, 10, 15, 0.2, 0, 7); g.stroke();
  // ombilicul (punctul de plecare al cordonului) în coordonate globale
  g.restore();
  const ux = x + (o.flip ? -1 : 1) * 30 * s, uy = y + 60 * s;
  return [ux, uy];
}

/* ---------- bazinul gravid, secțiune sagitală (anterior = stânga) ---------- */
// o.early = uter mic cu sac gestațional (ecografie timpurie); altfel sarcină avansată, făt cu capul în jos
// întoarce punctele utile (pentru ace / sonde)
export function pelvis(g, t, o = {}) {
  const X = o.x ?? 520, Y = o.y ?? 470, S = o.s ?? 1; const a = o.alpha ?? 1;
  g.save(); g.globalAlpha = clamp(a); g.translate(X, Y); g.scale(S, S);
  const early = !!o.early;
  // coloana / sacrul (posterior, dreapta)
  for (let k = 0; k < 6; k++) { const yy = -330 + k * 78 + (k > 3 ? (k - 3) * 10 : 0); const xx = 330 + (k > 3 ? -(k - 3) * 26 : 0); const p = new Path2D(); p.roundRect(xx - 34, yy - 30, 70, 60, 16); paint(g, p, K.bone, K.boneS, '#ffffff', [xx - 34, yy - 30, 70, 60], OUT, 4); }
  // rectul (posterior)
  tube(g, [[250, -60], [262, 150], [230, 290], [200, 400]], 40, '#c98a6a', { ow: 5, lumen: '#8a5a44' });
  // peretele abdominal (anterior, stânga)
  const wall = new Path2D();
  if (early) { wall.moveTo(-360, -380); wall.bezierCurveTo(-380, -150, -380, 100, -330, 300); wall.lineTo(-290, 300); wall.bezierCurveTo(-336, 100, -336, -150, -318, -380); wall.closePath(); }
  else { wall.moveTo(-200, -420); wall.bezierCurveTo(-470, -330, -480, 40, -330, 300); wall.lineTo(-290, 300); wall.bezierCurveTo(-430, 40, -420, -300, -165, -400); wall.closePath(); }
  paint(g, wall, K.skin, K.skinS, K.skinL, [-480, -420, 300, 720], OUT, 5);
  // simfiza pubiană
  ell(g, -250, 300, 34, 50, K.bone, { ow: 5, shade: K.boneS, rot: 0.3 });
  // vezica urinară (anterior, jos)
  const bl = early ? (o.fullBladder ? [-150, 190, 120, 84] : [-170, 230, 70, 46]) : [-170, 280, 70, 40];
  ell(g, bl[0], bl[1], bl[2], bl[3], K.blad, { ow: 5, shade: K.bladS, light: '#fff2c4' });
  // uterul
  let pts;
  if (early) {
    const ut = new Path2D(); ut.ellipse(40, 120, 150, 120, -0.5, 0, 7); paint(g, ut, K.myo, K.myoS, '#ee96a6', bb(40, 120, 150, 120), OUT, 6);
    const ca = new Path2D(); ca.ellipse(40, 120, 104, 78, -0.5, 0, 7); paint(g, ca, K.endo, null, null, bb(40, 120, 104, 78), OUT, 3);
    // sacul gestațional + embrionul
    ell(g, 10, 96, 46, 40, '#1d1220', { ow: 4, sc: '#fff3e6' }); ell(g, 18, 104, 12, 8, '#ffc9a6', { ow: 3 });
    tube(g, [[110, 230], [150, 300], [170, 420]], 40, '#e7a0ac', { ow: 5, lumen: '#b55a6c' }); // colul + vaginul
    pts = { sac: [10, 96], cervix: [120, 240], vagina: [170, 410], bladder: [bl[0], bl[1]], wall: [-350, -40] };
  } else {
    const ut = new Path2D(); ut.ellipse(-20, -40, 270, 300, 0.08, 0, 7); paint(g, ut, K.myo, K.myoS, '#ee96a6', bb(-20, -40, 270, 300), OUT, 6);
    const ca = new Path2D(); ca.ellipse(-20, -40, 236, 266, 0.08, 0, 7); paint(g, ca, K.fluid, K.fluidS, '#e3f5ff', bb(-20, -40, 236, 266), OUT, 4);
    // placenta pe peretele posterior / fundic
    const pl = new Path2D(); pl.ellipse(-20, -40, 236, 266, 0.08, -1.25, 0.55); pl.ellipse(-20, -40, 190, 222, 0.08, 0.55, -1.25, true); pl.closePath();
    paint(g, pl, K.plac, K.placS, '#d4607a', [40, -300, 220, 400], OUT, 5);
    pts = { plac: [170, -170], cervix: [10, 250], vagina: [60, 400], bladder: [bl[0], bl[1]], wall: [-420, -120], fluid: [-150, -170] };
    // colul + vaginul
    tube(g, [[10, 236], [40, 300], [70, 420]], 38, '#e7a0ac', { ow: 5, lumen: '#b55a6c' });
    // punctele fătului (în coordonatele bazinului): fătul e desenat cu translate(-60,30) · scale(-1.1, 1.1) · rotate(0.92π)
    const FR = Math.PI * 0.92; const F = (x, y) => { const rx = x * Math.cos(FR) - y * Math.sin(FR), ry = x * Math.sin(FR) + y * Math.cos(FR); return [-60 - 1.1 * rx, 30 + 1.1 * ry]; };
    const umb = F(36, 78);
    // cordonul ombilical: de la placentă la ombilicul fătului (spiralat)
    const cordP = curve([[160, -110], [150, -20], [lerp(150, umb[0], 0.6), lerp(-20, umb[1], 0.6)], umb], 16);
    tube(g, cordP, 18, K.cord, { ow: 5, raw: true });
    g.save(); g.strokeStyle = '#d84b5b'; g.lineWidth = 3; g.beginPath(); cordP.forEach(([u, v], k) => { const q = Math.sin(k * 1.3) * 5; k ? g.lineTo(u + q, v) : g.moveTo(u + q, v); }); g.stroke(); g.restore();
    pts.cord = [150, -30]; pts.umb = umb; pts.back = F(104, 30); pts.liver = F(40, 30);
    // fătul, capul în jos
    fetus(g, -60, 30, 1.1, t, { rot: Math.PI * 0.92, flip: true });
  }
  g.restore();
  const T = (p) => [X + p[0] * S, Y + p[1] * S]; const out = {}; for (const k in pts) out[k] = T(pts[k]); return out;
}

/* ---------- silueta umană (față) ---------- */
// o: h = înălțimea (scală pe verticală), fem, shortNeck, broadChest, longLimbs, gyneco, hipFat, beard
export function body(g, x, y, s, t, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.scale(s, s * (o.h || 1));
  const sk = o.skin || K.skin; const L = o.longLimbs ? 1.22 : 1; const ow = 5 / s;
  const neck = o.shortNeck ? 10 : 26; const sh = o.broadChest ? 74 : 62;
  // picioarele
  [-1, 1].forEach((d) => tube(g, [[d * 26, 120], [d * 30, 120 + 130 * L], [d * 32, 128 + 250 * L]], 34, sk, { ow }));
  [-1, 1].forEach((d) => ell(g, d * 40, 132 + 250 * L, 22, 10, sk, { ow: ow * 0.9 }));
  // brațele
  [-1, 1].forEach((d) => tube(g, [[d * (sh - 8), -88 + neck], [d * (sh + 12), -88 + neck + 110 * L], [d * (sh + 18), -88 + neck + 210 * L]], 24, sk, { ow }));
  // trunchiul
  const tr = new Path2D(); const hip = o.hipFat ? 66 : 50;
  tr.moveTo(-sh, -96 + neck); tr.bezierCurveTo(-sh - 4, -30, -hip + 6, 40, -hip, 130); tr.lineTo(hip, 130); tr.bezierCurveTo(hip - 6, 40, sh + 4, -30, sh, -96 + neck);
  tr.bezierCurveTo(30, -112 + neck, -30, -112 + neck, -sh, -96 + neck); tr.closePath();
  paint(g, tr, sk, K.skinS, K.skinL, [-sh, -110, sh * 2, 240], OUT, ow);
  if (o.fem || o.gyneco) [-1, 1].forEach((d) => { g.save(); g.strokeStyle = OUT; g.lineWidth = 3 / s; g.beginPath(); g.arc(d * 24, -32 + neck * 0.3, o.gyneco ? 16 : 18, 0.2, Math.PI - 0.2); g.stroke(); g.restore(); });
  // gâtul + capul
  tube(g, [[0, -96 + neck], [0, -110]], 26, sk, { ow });
  const hd = new Path2D(); hd.ellipse(0, -150, 34, 42, 0, 0, 7); paint(g, hd, sk, K.skinS, K.skinL, [-34, -192, 68, 84], OUT, ow);
  // părul
  g.save(); g.fillStyle = o.hair || '#5a3a2a'; g.beginPath(); g.ellipse(0, -172, 36, 22, 0, Math.PI, 0); g.fill(); g.restore();
  if (o.fem) { g.save(); g.fillStyle = o.hair || '#5a3a2a'; g.beginPath(); g.roundRect(-38, -176, 14, 64, 8); g.roundRect(24, -176, 14, 64, 8); g.fill(); g.restore(); }
  g.restore();
}
