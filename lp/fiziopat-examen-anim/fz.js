// Ajutoare comune pentru scenele Fiziopat (lume 1000×934, stil cartoon cu contur gros).
import { OUT, clamp, ease, glowRing, paint, blob, bb, arrow, REDUCED } from './kit2d.js';
export const W = 1000, H = 934;
export const cam = (x, y, z) => ({ x, y, z });
export const HOME = cam(500, 467, 1);
export const lbl = (at, html, o = {}) => ({ at, html, ...o });
export const PURPLE = '#7C4FD6', PURPLE_L = '#C9B3FF', DARK = '#2e1838', DARK2 = '#140a1a';
export const bgFill = (g, a = DARK, b = DARK2, w = W, h = H) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(-2000, -2000, w + 4000, h + 4000); };
// progresul (0..1) al beat-ului curent; pe intro (b.i<0) = 1 (totul vizibil)
export const u01 = (b, k = 0.8) => (b.i >= 0 ? clamp(b.bt / (b.bd * k)) : 1);
// stadiul cumulativ: câți pași s-au „întâmplat” (b.i<0 → toți)
export const stage = (b, n) => (b.i < 0 ? n : b.i + clamp(b.bt / (b.bd * 0.6)));
export const ring = (g, b, k, x, y, rx, ry = rx, rot = 0, col) => { if (b.i === k) glowRing(g, x, y, rx, ry, rot, ease(b.bt * 1.4), col); };
export function txt(g, s, x, y, size = 28, col = '#fff', al = 'center', weight = 800) {
  g.save(); g.font = `${weight} ${size}px "Plus Jakarta Sans", Inter, sans-serif`; g.textAlign = al; g.textBaseline = 'alphabetic';
  g.lineWidth = Math.max(4, size / 4); g.strokeStyle = OUT; g.lineJoin = 'round'; g.strokeText(s, x, y); g.fillStyle = col; g.fillText(s, x, y); g.restore();
}
// etichetă-pastilă desenată pe canvas
export function pill(g, s, x, y, col = PURPLE, size = 22) {
  g.save(); g.font = `700 ${size}px Inter, sans-serif`; const w = g.measureText(s).width + size * 1.2, h = size * 1.7;
  g.fillStyle = col; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, h / 2); g.fill(); g.stroke();
  g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(s, x, y + 1); g.restore();
}
// cutie cu text (nod de schemă)
export function node(g, s, x, y, w, h, col = '#3b2d55', on = false, size = 24) {
  g.save(); if (on) { g.shadowColor = '#ffe36e'; g.shadowBlur = 24; }
  g.fillStyle = col; g.strokeStyle = on ? '#ffe36e' : OUT; g.lineWidth = on ? 7 : 6; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, 18); g.fill(); g.stroke(); g.restore();
  const lines = String(s).split('\n'); lines.forEach((l, i) => txt(g, l, x, y + size * 0.35 + (i - (lines.length - 1) / 2) * size * 1.15, size, '#fff', 'center', 800));
}
export function field(g, x, y, r, inside) {
  const c = new Path2D(); c.arc(x, y, r, 0, Math.PI * 2);
  g.save(); g.clip(c); inside(); g.restore();
  g.save(); g.lineWidth = 10; g.strokeStyle = OUT; g.stroke(c); g.lineWidth = 4; g.strokeStyle = 'rgba(255,255,255,.35)'; g.stroke(c); g.restore();
}
// termometru cartoon; f = 0..1 nivelul
export function thermometer(g, x, y, h, f, col = '#ff4d5e') {
  g.save(); g.fillStyle = '#f6eef7'; g.strokeStyle = OUT; g.lineWidth = 7;
  g.beginPath(); g.roundRect(x - 22, y - h, 44, h, 22); g.fill(); g.stroke(); g.beginPath(); g.arc(x, y + 20, 40, 0, 7); g.fill(); g.stroke();
  g.fillStyle = col; g.beginPath(); g.arc(x, y + 20, 30, 0, 7); g.fill(); const lh = (h - 30) * clamp(f); g.fillRect(x - 11, y - lh, 22, lh + 20);
  g.strokeStyle = 'rgba(42,21,52,.5)'; g.lineWidth = 3; for (let k = 1; k < 8; k++) { const yy = y - k * (h - 20) / 8; g.beginPath(); g.moveTo(x + 22, yy); g.lineTo(x + 34, yy); g.stroke(); }
  g.restore();
}
export { OUT, clamp, ease, glowRing, paint, blob, bb, arrow, REDUCED };
