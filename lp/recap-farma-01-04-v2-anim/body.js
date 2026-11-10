// body.js · corpul schematic văzut din față (ficatul în stânga imaginii = dreapta pacientului) + traseele medicamentului.
// Folosit de: drumul medicamentului (ADME), reacțiile adverse pe organ.
import { K, OUT, Path, tx, shape, ellK, clamp, lerp, mix, RED, blob, bb, paint, glowAt } from './kino.js';

// traseele (coordonate de lume 1000×934)
export const R = {
  oral: new Path([[310, 40], [310, 150], [312, 232], [328, 330], [352, 378], [394, 402], [402, 442], [372, 468], [338, 468]]),
  eso: new Path([[310, 166], [312, 240], [327, 330], [351, 376]]),
  gut: new Path([[338, 468], [300, 480], [268, 500], [258, 524], [276, 542], [330, 540], [360, 552], [364, 576], [344, 592], [284, 590], [258, 604], [258, 628], [282, 642], [338, 640], [362, 654], [358, 680], [330, 692], [292, 690]]),
  portal: new Path([[300, 512], [293, 486], [281, 462], [262, 440]]),
  hep: new Path([[262, 392], [282, 350], [314, 320]]),
  aorta: new Path([[322, 330], [319, 420], [317, 520], [317, 600], [316, 710]]),
  arm: new Path([[338, 272], [362, 246], [420, 246], [470, 272], [498, 350], [506, 428]]),
  brain: new Path([[330, 268], [318, 222], [312, 170], [310, 122]]),
  renL: new Path([[317, 598], [272, 604], [236, 610]]),
  renR: new Path([[317, 598], [360, 604], [386, 610]]),
  urL: new Path([[232, 632], [262, 720], [296, 788]]),
  urR: new Path([[390, 632], [360, 720], [324, 788]]),
};
// trasee compuse pentru bilele care curg
export const ROUTE = {
  absorb: new Path([[380, 440], [338, 468], [300, 480], [268, 500], [258, 524], [276, 542], [300, 528], [300, 512], [293, 486], [281, 462], [262, 440]], { n: 10 }),
  toHeart: new Path([[262, 440], [250, 410], [262, 392], [282, 350], [314, 320], [332, 300]], { n: 10 }),
  toArm: new Path([[332, 300], [338, 272], [362, 246], [420, 246], [470, 272], [498, 350], [506, 428]], { n: 10 }),
  toBrain: new Path([[332, 300], [330, 268], [318, 222], [312, 170], [310, 112]], { n: 10 }),
  toKidL: new Path([[332, 300], [322, 330], [319, 420], [317, 520], [317, 598], [272, 604], [228, 610]], { n: 10 }),
  toKidR: new Path([[332, 300], [322, 330], [319, 420], [317, 520], [317, 598], [360, 604], [394, 610]], { n: 10 }),
};
export const ORG = { mouth: [310, 150], brain: [310, 98], heart: [332, 300], liver: [248, 410], stomach: [384, 430], gut: [312, 590], kidL: [222, 610], kidR: [400, 610], bladder: [310, 806], muscle: [506, 440], lungL: [246, 300], lungR: [392, 300], fat: [196, 720], pancreas: [352, 506] };

function heartPath(x, y, s) { const p = new Path2D(); p.moveTo(x, y + 30 * s); p.bezierCurveTo(x - 46 * s, y + 2 * s, x - 34 * s, y - 38 * s, x, y - 14 * s); p.bezierCurveTo(x + 34 * s, y - 38 * s, x + 46 * s, y + 2 * s, x, y + 30 * s); p.closePath(); return p; }
export function heartK(g, x, y, s, o = {}) { const p = heartPath(x, y, s); shape(g, p, o.col || K.heart, { shade: K.heartS, light: '#ffffff', box: [x - 40 * s, y - 36 * s, 80 * s, 70 * s], ow: o.ow ?? 5, alpha: o.alpha, glow: o.glow, gc: o.gc }); }
export function kidneyK(g, x, y, s, flip, o = {}) { g.save(); g.translate(x, y); g.scale(flip ? -s : s, s); const p = new Path2D(); p.moveTo(0, -42); p.bezierCurveTo(-30, -44, -34, -10, -30, 8); p.bezierCurveTo(-26, 36, -8, 46, 6, 42); p.bezierCurveTo(22, 38, 24, 22, 14, 12); p.bezierCurveTo(8, 4, 8, -4, 14, -12); p.bezierCurveTo(24, -24, 20, -40, 0, -42); p.closePath(); shape(g, p, o.col || K.kidney, { shade: K.kidneyS, light: '#ffffff', box: [-34, -44, 60, 90], ow: (o.ow ?? 5) / s, alpha: o.alpha, glow: o.glow, gc: o.gc }); g.restore(); }
export function liverK(g, o = {}) { const p = new Path2D(); p.moveTo(168, 396); p.bezierCurveTo(190, 358, 282, 350, 332, 372); p.bezierCurveTo(354, 382, 354, 400, 332, 414); p.bezierCurveTo(292, 442, 232, 464, 190, 454); p.bezierCurveTo(166, 442, 158, 416, 168, 396); p.closePath(); shape(g, p, o.col || K.liver, { shade: K.liverS, light: '#ffffff', box: [160, 352, 196, 110], ow: 5, alpha: o.alpha, glow: o.glow, gc: o.gc }); return p; }
export function stomachK(g, o = {}) { const p = new Path2D(); p.moveTo(350, 370); p.bezierCurveTo(400, 360, 434, 400, 420, 452); p.bezierCurveTo(408, 492, 358, 494, 336, 472); p.lineTo(334, 452); p.bezierCurveTo(356, 462, 386, 452, 386, 424); p.bezierCurveTo(386, 400, 366, 392, 348, 394); p.closePath(); shape(g, p, K.stomach, { shade: K.stomachS, light: '#ffffff', box: [334, 362, 92, 130], ow: 5, alpha: o.alpha, glow: o.glow, gc: o.gc }); return p; }

// corpul întreg. o.hl = { organ: 0..1 } luminează organul; o.dim = estompează restul; o.bladder = nivelul urinei 0..1; o.beat = pulsul inimii (t)
export function drawBody(g, t, o = {}) {
  const hl = o.hl || {}; const A = (n) => (o.dim ? lerp(1 - o.dim * 0.72, 1, clamp(hl[n] || 0)) : 1); const G = (n) => (hl[n] || 0) * 0.9;
  // silueta: contur comun (întâi tușa, apoi umplerea)
  const torso = new Path2D(); torso.moveTo(176, 238); torso.quadraticCurveTo(310, 196, 444, 238); torso.bezierCurveTo(470, 330, 440, 520, 428, 600); torso.bezierCurveTo(424, 680, 448, 760, 452, 860); torso.lineTo(452, 990); torso.lineTo(168, 990); torso.lineTo(168, 860); torso.bezierCurveTo(172, 760, 196, 680, 192, 600); torso.bezierCurveTo(180, 520, 150, 330, 176, 238); torso.closePath();
  const head = new Path2D(); head.arc(310, 112, 64, 0, 7); const neck = new Path2D(); neck.roundRect(284, 160, 52, 74, 10);
  const armL = new Path2D(); armL.moveTo(170, 268); armL.quadraticCurveTo(128, 420, 112, 612); const armR = new Path2D(); armR.moveTo(450, 268); armR.quadraticCurveTo(492, 420, 508, 612);
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  g.strokeStyle = K.bodyL; g.lineWidth = 9; for (const p of [torso, head, neck]) g.stroke(p); g.lineWidth = 74 + 9; g.stroke(armL); g.stroke(armR);
  g.fillStyle = K.body; for (const p of [torso, head, neck]) g.fill(p); g.strokeStyle = K.body; g.lineWidth = 74; g.stroke(armL); g.stroke(armR);
  // o lumină blândă pe trunchi
  g.save(); g.clip(torso); glowAt(g, 300, 360, 260, '#6b4f8a', 0.35); g.restore();
  g.restore();
  // gura
  ellK(g, 310, 150, 13, 6, '#4a2238', { ow: 3, oc: K.bodyL });
  // plămânii (discreți)
  if (o.lungs !== false) for (const [x, fl] of [[246, 1], [394, -1]]) { g.save(); g.translate(x, 300); g.scale(fl, 1); const p = new Path2D(); p.moveTo(34, -62); p.bezierCurveTo(-10, -70, -44, -20, -42, 40); p.bezierCurveTo(-40, 66, 10, 70, 36, 50); p.closePath(); shape(g, p, K.lung, { shade: K.lungS, box: [-44, -66, 82, 136], ow: 4, alpha: (o.lungA ?? 0.3) + G('lungs') * 0.7, glow: G('lungs') }); g.restore(); }
  // aorta descendentă + esofagul (în spate)
  R.aorta.stroke(g, 11, K.blood, { ow: 6, alpha: A('vessels') });
  R.eso.stroke(g, 13, mix(K.gut, '#000000', 0.15), { ow: 6, alpha: A('stomach') });
  // creierul
  shape(g, blob(310, 98, 44, 33, 0, 0, 0.07, 14, 3), K.brain, { shade: K.brainS, light: '#ffffff', box: bb(310, 98, 44, 33), ow: 4.5, alpha: A('brain'), glow: G('brain') });
  g.save(); g.globalAlpha = 0.5 * A('brain'); g.strokeStyle = '#a04f72'; g.lineWidth = 2.5; g.lineCap = 'round'; for (const [a, b2, c, d] of [[284, 92, 300, 104], [310, 76, 320, 96], [330, 100, 344, 110], [292, 114, 312, 120]]) { g.beginPath(); g.moveTo(a, b2); g.quadraticCurveTo((a + c) / 2 + 6, (b2 + d) / 2 - 8, c, d); g.stroke(); } g.restore();
  // rinichii + arterele renale + ureterele + vezica
  R.renL.stroke(g, 7, K.blood, { ow: 5, alpha: A('kidney') }); R.renR.stroke(g, 7, K.blood, { ow: 5, alpha: A('kidney') });
  R.urL.stroke(g, 5, K.urine, { ow: 4.5, alpha: A('kidney') }); R.urR.stroke(g, 5, K.urine, { ow: 4.5, alpha: A('kidney') });
  kidneyK(g, 222, 610, 0.7, true, { alpha: A('kidney'), glow: G('kidney') }); kidneyK(g, 400, 610, 0.7, false, { alpha: A('kidney'), glow: G('kidney') });
  // intestinul subțire
  R.gut.stroke(g, 21, K.gut, { ow: 7, alpha: A('gut'), glow: G('gut') * 0.8, core: 'rgba(255,255,255,.14)' });
  // pancreasul (sub stomac) și, la cerere, un petic de țesut adipos pe flanc
  ellK(g, 348, 502, 46, 13, '#f2c48a', { ow: 4, rot: -0.12, shade: '#d49e5c', alpha: A('pancreas'), glow: G('pancreas'), gc: K.hi });
  if (hl.fat) for (const [fx, fy, fr] of [[188, 706, 17], [208, 730, 15], [186, 742, 14]]) ellK(g, fx, fy, fr, fr, K.fat, { ow: 3.5, shade: K.fatS, glow: G('fat'), gc: K.hi });
  // vena portă + venele hepatice
  R.portal.stroke(g, 11, '#8a78f2', { ow: 6, alpha: A('portal'), glow: G('portal') });
  R.hep.stroke(g, 10, K.vein, { ow: 6, alpha: A('vessels') });
  // ficatul, stomacul
  liverK(g, { alpha: A('liver'), glow: G('liver') }); stomachK(g, { alpha: A('stomach'), glow: G('stomach') });
  // arcul aortei spre braț, carotida
  R.arm.stroke(g, 9, K.blood, { ow: 6, alpha: A('vessels') }); R.brain.stroke(g, 7, K.blood, { ow: 5, alpha: A('vessels') });
  // inima (bate)
  const hb = RED ? 0 : Math.pow(Math.max(0, Math.sin((t * (o.hr || 1.15)) * Math.PI * 2)), 6) * 0.09;
  heartK(g, 332, 302, 1.3 + hb, { alpha: A('heart'), glow: G('heart') });
  // mușchiul din braț (țesutul-țintă)
  { const [mx, my] = ORG.muscle; const p = new Path2D(); p.ellipse(mx, my, 22, 62, 0.05, 0, 7); shape(g, p, K.muscle, { shade: K.muscleS, box: [mx - 22, my - 62, 44, 124], ow: 4.5, alpha: A('muscle'), glow: G('muscle') }); g.save(); g.globalAlpha = 0.5 * A('muscle'); g.strokeStyle = '#ffd9dd'; g.lineWidth = 2; for (let k = -2; k <= 2; k++) { g.beginPath(); g.moveTo(mx + k * 7, my - 50 + Math.abs(k) * 8); g.lineTo(mx + k * 7, my + 50 - Math.abs(k) * 8); g.stroke(); } g.restore(); }
  // vezica + urina
  { const lvl = clamp(o.bladder ?? 0.15); const p = new Path2D(); p.ellipse(310, 806, 40, 34, 0, 0, 7); g.save(); g.globalAlpha = A('bladder'); if (G('bladder')) { g.shadowColor = K.urine; g.shadowBlur = 26 * G('bladder'); } g.fillStyle = '#5a3a4a'; g.fill(p); g.shadowBlur = 0; g.save(); g.clip(p); g.fillStyle = K.urine; const yy = 840 - 68 * lvl; g.beginPath(); g.moveTo(260, yy); for (let x = 260; x <= 360; x += 10) g.lineTo(x, yy + (RED ? 0 : Math.sin(t * 2 + x * 0.1) * 2)); g.lineTo(360, 850); g.lineTo(260, 850); g.closePath(); g.fill(); g.restore(); g.strokeStyle = OUT; g.lineWidth = 8; g.stroke(p); g.strokeStyle = '#f0c9a0'; g.lineWidth = 4; g.stroke(p); g.restore(); }
  // etichetele organelor
  if (o.names !== false) { const N = (s, x, y, n, al = 'center') => tx(g, s, x, y, 15, K.dim, { w: 700, alpha: A(n) * (o.nameA ?? 1), align: al });
    N('ficat', 150, 372, 'liver', 'right'); N('stomac', 446, 384, 'stomach', 'left'); N('intestin', 312, 716, 'gut'); N('rinichi', 172, 640, 'kidney', 'right'); N('vezică', 310, 858, 'bladder'); N('inimă', 384, 300, 'heart', 'left'); N('v. portă', 228, 490, 'portal', 'right'); N('țesut', 506, 520, 'muscle'); }
}
