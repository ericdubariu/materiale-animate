// Slide-uri „atlas”: poza reală de la disciplină, cu fiecare structură încercuită și numerotată (toate deodată).
import { OUT, clamp } from './kit2d.js';

const IMG = {};
function img(n) { if (!IMG[n]) { const i = new Image(); i.src = `img/${n}.jpg`; IMG[n] = i; } return IMG[n]; }
const COLS = ['#ffe36e', '#7fe8ff', '#9dff8a', '#ffa3e0', '#ffb36b', '#c9b3ff', '#ff8a8a', '#ffffff'];

function mark(g, m, k, on, t) {
  const c = m.color || COLS[k % COLS.length];
  g.save();
  g.lineWidth = 9; g.strokeStyle = OUT; g.beginPath(); g.ellipse(m.x, m.y, m.rx, m.ry ?? m.rx, m.rot || 0, 0, 7); g.stroke();
  g.lineWidth = on ? 6 : 4.5; g.strokeStyle = c; if (on) { g.shadowColor = c; g.shadowBlur = 18; }
  if (m.dash) g.setLineDash([16, 10]);
  g.beginPath(); g.ellipse(m.x, m.y, m.rx, m.ry ?? m.rx, m.rot || 0, 0, 7); g.stroke();
  g.restore();
  if (on) { g.save(); g.globalAlpha = 0.18 + 0.08 * Math.sin(t * 3); g.fillStyle = c; g.beginPath(); g.ellipse(m.x, m.y, m.rx, m.ry ?? m.rx, m.rot || 0, 0, 7); g.fill(); g.restore(); }
}
function drawCover(g, im, x, y, w, h, src) {
  const [sx, sy, sw, sh] = src || [0, 0, im.naturalWidth, im.naturalHeight];
  const r = Math.max(w / sw, h / sh); const dw = w / r, dh = h / r;
  g.drawImage(im, sx + (sw - dw) / 2, sy + (sh - dh) / 2, dw, dh, x, y, w, h);
  return { r, ox: x - (sx + (sw - dw) / 2) * r, oy: y - (sy + (sh - dh) / 2) * r };
}

// o singură poză: marks în pixeli ai pozei
export function atlas({ spec }) {
  const o = spec.sceneOpts; const W = o.W, H = o.H;
  const marks = o.marks;
  return {
    W, H, home: { x: W / 2, y: H / 2, z: 1 }, cams: null,
    anchors: marks.map((m) => [m.x + (m.bx ?? 0), m.y - (m.ry ?? m.rx) - 18 + (m.by ?? 0)]),
    labels: marks.map((m) => ({ at: [m.lx ?? m.x, m.ly ?? m.y + (m.ry ?? m.rx) + 22], html: m.lab })),
    draw(g, t, b) {
      g.fillStyle = '#100916'; g.fillRect(-4000, -4000, 8000 + W, 8000 + H);
      const im = img(o.img);
      if (im.complete && im.naturalWidth) g.drawImage(im, 0, 0, W, H);
      g.save(); g.strokeStyle = OUT; g.lineWidth = 8; g.strokeRect(0, 0, W, H); g.restore();
      marks.forEach((m, k) => mark(g, m, k, b.i === k, t));
    },
  };
}

// mozaic de poze apropiate (o celulă pe pătrat), fiecare cu celula încercuită
export function mosaic({ spec }) {
  const o = spec.sceneOpts; const tiles = o.tiles; const cols = o.cols || 4; const rows = Math.ceil(tiles.length / cols);
  const TW = 300, TH = 230, GAP = 16, LAB = 0;
  const W = cols * TW + (cols + 1) * GAP, H = rows * (TH + LAB) + (rows + 1) * GAP;
  const pos = tiles.map((_, k) => { const c = k % cols, r = Math.floor(k / cols); const n = r === rows - 1 ? tiles.length - r * cols : cols; const off = (cols - n) * (TW + GAP) / 2; return [GAP + c * (TW + GAP) + off, GAP + r * (TH + LAB + GAP)]; });
  const tr = tiles.map(() => null);
  return {
    W, H, home: { x: W / 2, y: H / 2, z: 1 }, cams: null,
    anchors: tiles.map((_, k) => [pos[k][0] + 26, pos[k][1] + 26]),
    labels: tiles.map((tl, k) => ({ at: [pos[k][0] + TW / 2, pos[k][1] + TH - 20], html: tl.lab })),
    draw(g, t, b) {
      g.fillStyle = '#100916'; g.fillRect(-4000, -4000, 8000 + W, 8000 + H);
      tiles.forEach((tl, k) => {
        const [x, y] = pos[k]; const im = img(tl.img);
        g.save(); g.beginPath(); g.roundRect(x, y, TW, TH, 14); g.clip();
        if (im.complete && im.naturalWidth) {
          const T = drawCover(g, im, x, y, TW, TH, tl.src);
          (tl.marks || []).forEach((m) => mark(g, { ...m, x: T.ox + m.x * T.r, y: T.oy + m.y * T.r, rx: m.rx * T.r, ry: (m.ry ?? m.rx) * T.r }, k, b.i === k, t));
        }
        g.restore();
        g.save(); g.strokeStyle = b.i === k ? '#ffe36e' : OUT; g.lineWidth = b.i === k ? 6 : 5; g.beginPath(); g.roundRect(x, y, TW, TH, 14); g.stroke(); g.restore();
      });
    },
  };
}
