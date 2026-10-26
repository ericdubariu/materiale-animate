// Kit LP 1 (reproducerea): peste kitul embriologie — cromozomi (cromatide), celule, carduri, axe.
export * from './ek.js';
import { C, txt, pill, ell, dot, tube, OUT, clamp, lerp, ease, REDUCED } from './ek.js';

export const MAT = '#e8505b', PAT = '#4f8fe6', GRN = '#3db06c', YEL = '#f4c34f';
export const RED = '#e0443e', AMB = '#f2b33d', OK = '#5cc48a', BAD = '#ff6b5e';

// cromozom: dup = 2 cromatide surori unite la centromer (X); altfel o singură cromatidă
export function chromo(g, x, y, h, col, o = {}) {
  const a = o.alpha ?? 1; if (a <= 0.01) return;
  g.save(); g.globalAlpha = clamp(a); g.translate(x, y); g.rotate(o.rot || 0);
  const w = o.w || Math.max(9, h * 0.22); const c = o.cen ?? -h * 0.12; const sp = o.dup ? (o.sp ?? w * 0.55) : 0;
  const arm = (dx) => { tube(g, [[dx - sp * 0.15, -h / 2], [dx, c], [dx - sp * 0.15, h / 2]], w, col, { ow: 5, raw: false }); };
  if (o.dup) { arm(-sp); arm(sp); dot(g, 0, c, w * 0.55, '#fff3e6', { ow: 3 }); }
  else { arm(0); dot(g, 0, c, w * 0.45, '#fff3e6', { ow: 3 }); }
  // segment schimbat (crossing-over / translocație): doar pe O cromatidă (cea din dreapta), ca la schimbul între cromatide nesurori
  if (o.seg) { g.globalAlpha = clamp(a); tube(g, [[sp, o.seg[0] * h / 2], [sp, o.seg[1] * h / 2]], w + 1, o.segCol || YEL, { ow: 3 }); }
  g.restore();
}
// celulă rotundă cu membrană; inside(g) desenează conținutul
export function cell(g, x, y, r, fill = '#3a2a26', o = {}) {
  ell(g, x, y, r, o.ry || r, fill, { alpha: o.alpha, ow: o.ow ?? 6, sc: o.sc });
  if (o.glow) { g.save(); g.globalAlpha = clamp(o.glow) * (o.alpha ?? 1); g.strokeStyle = C.hi; g.lineWidth = 5; g.shadowColor = C.hi; g.shadowBlur = 22; g.beginPath(); g.ellipse(x, y, r + 8, (o.ry || r) + 8, 0, 0, 7); g.stroke(); g.restore(); }
}
// card cu titlu + subtitlu
export function card(g, x, y, w, h, title, sub, fill, o = {}) {
  pill(g, x, y, w, h, fill, '', { alpha: o.alpha, glow: o.glow, ow: 4, r: o.r ?? 18 });
  const dy = sub ? -h * 0.18 : 0;
  txt(g, title, x, y + dy, o.ts || 21, o.tc || OUT, { stroke: false, alpha: o.alpha, w: 800 });
  if (sub) txt(g, sub, x, y + h * 0.2, o.ss || 16, o.sc || '#3b2a24', { stroke: false, alpha: o.alpha, w: 600 });
}
// fundal deschis-cald pentru zona de desen
export function bgL(g, W = 1000, H = 934) { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#34231d'); gr.addColorStop(1, '#140c0a'); g.fillStyle = gr; g.fillRect(-3000, -3000, 7000, 7000); }
// alpha pentru o etapă: intro = tot vizibil, apoi doar până la etapa curentă
export const vis = (b, k, lo = 0.18) => (b.i < 0 || k <= b.i ? 1 : lo);
export const act = (b, k) => b.i === k;
export const pulse = (t, s = 3) => (REDUCED ? 1 : 0.5 + 0.5 * Math.sin(t * s));
export { lerp, ease, clamp };
