// Scena „photo” a recapitulării OSPE Histologie (din 09.11.2026, la cererea lui Eric: ca la recapitularea de Anatopat).
// Sus: poza lamei de la LP, mare. Jos-stânga: detaliul punctului activ (decupajul de pe lamă). Jos-dreapta: partenerul de DD.
// sceneOpts: main {img, cap}, dd {img, cap}, seq: [{img, cap}] pe puncte (poza la care se referă punctul).
import { OUT, clamp } from './kit2d.js';

const IM = {};
const img = (n) => { if (!IM[n]) { const i = new Image(); i.src = `img/${n}.jpg`; IM[n] = i; } return IM[n]; };
const ready = (im) => im && im.complete && im.naturalWidth;
const fitT = (w, h, bx, by, bw, bh) => { const r = Math.min(bw / w, bh / h); return { r, ox: bx + (bw - w * r) / 2, oy: by + (bh - h * r) / 2 }; };
function photo(g, name, box) {
  const [bx, by, bw, bh] = box; const im = img(name);
  g.save(); g.beginPath(); g.roundRect(bx, by, bw, bh, 12); g.fillStyle = '#0b0610'; g.fill(); g.clip();
  if (ready(im)) { const T = fitT(im.naturalWidth, im.naturalHeight, ...box); g.drawImage(im, T.ox, T.oy, im.naturalWidth * T.r, im.naturalHeight * T.r); }
  g.restore();
}
function frame(g, box, on) { const [bx, by, bw, bh] = box; g.save(); g.lineWidth = on ? 6 : 4; g.strokeStyle = on ? '#ffe36e' : OUT; if (on) { g.shadowColor = '#ffe36e'; g.shadowBlur = 16; } g.beginPath(); g.roundRect(bx, by, bw, bh, 12); g.stroke(); g.restore(); }
function tag(g, s, x, y, maxW, col = '#f6eef7', size = 13) {
  g.save(); g.font = `700 ${size}px Inter, sans-serif`;
  let t = s; while (g.measureText(t).width > maxW - 14 && t.length > 4) t = t.slice(0, -2);
  if (t !== s) t = t.trimEnd() + '…';
  const w = g.measureText(t).width + 14;
  g.fillStyle = 'rgba(20,10,28,.86)'; g.beginPath(); g.roundRect(x, y, w, size + 10, 8); g.fill();
  g.fillStyle = col; g.textBaseline = 'middle'; g.fillText(t, x + 7, y + (size + 10) / 2 + 0.5); g.restore();
}

export function photoScene({ spec }) {
  const o = spec.sceneOpts; const SW = 724, SH = 676;
  const MB = [8, 48, 708, 356], SB = [8, 412, 350, 236], DB = [366, 412, 350, 236];
  const seq = o.seq || [];
  const where = (i) => { const s = seq[i]; if (!s) return 'm'; return s.img === o.main.img ? 'm' : s.img === o.dd.img ? 'd' : 's'; };
  // detaliul afișat la punctul i: decupajul punctului, altfel ultimul decupaj de dinainte (sau primul din listă)
  const zooms = seq.map((s, i) => (where(i) === 's' ? i : -1)).filter((i) => i >= 0);
  const subAt = (i) => { let k = -1; for (const z of zooms) if (z <= i) k = z; return seq[k >= 0 ? k : zooms[0]] || null; };
  // badge-ul stă pe poza punctului; mai multe puncte pe aceeași poză → badge-uri alăturate, nu suprapuse
  const used = { m: 0, s: 0, d: 0 };
  const anchors = seq.map((_, i) => {
    const w = where(i); const B = w === 'm' ? MB : w === 'd' ? DB : SB; const j = used[w]++;
    return [clamp(B[0] + 28 + j * 42, 18, SW - 18), B[1] + 24];
  });
  const phases = (spec.points || []).map((p) => p.h.split('·')[0].trim());
  return {
    W: SW, H: SH, home: { x: SW / 2, y: SH / 2, z: 1 }, cams: null, anchors, labels: [],
    phase: (i) => phases[i] || '',
    draw(g, t, b) {
      g.fillStyle = '#100916'; g.fillRect(-2000, -2000, 4000 + SW, 4000 + SH);
      const w = where(b.i);
      photo(g, o.main.img, MB); frame(g, MB, w === 'm'); tag(g, o.main.cap, MB[0] + 8, MB[1] + MB[3] - 31, MB[2] - 16);
      const z = subAt(b.i);
      if (z) { photo(g, z.img, SB); tag(g, z.cap, SB[0] + 8, SB[1] + SB[3] - 31, SB[2] - 16); }
      frame(g, SB, w === 's');
      photo(g, o.dd.img, DB); frame(g, DB, w === 'd'); tag(g, o.dd.cap, DB[0] + 8, DB[1] + DB[3] - 31, DB[2] - 16, '#ffe36e');
      g.save(); g.font = '500 10.5px Inter, sans-serif'; g.fillStyle = 'rgba(246,238,247,.62)'; g.fillText('Pozele: preparatele de la LP (cum le vezi la examen).', 8, 664); g.restore();
    },
  };
}
