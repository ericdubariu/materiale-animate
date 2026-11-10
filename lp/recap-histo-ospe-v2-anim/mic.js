// Scenele noi ale recapitulării OSPE Histologie v2 (10.11.2026):
//  mic     = „microscopul”: poza reală a lamei într-un vizor rotund; trecere de la toată poza la detalii pe ACEEAȘI poză (doar zoom de afișare),
//            apoi apare decupajul existent al punctului (cu elipsa lui din deck-ul vechi), exact la locul lui pe lamă.
//  ddface  = DD față în față: lama (sus) și partenerul (jos), ambele poze reale, nemodificate; asemănarea și cele 3 caracteristici, pe rând.
//  schelet = scheletul stației: ordinea de punctaj de pe fișa oficială.
// Pozele nu se modifică: sunt aceleași fișiere ca în recapitularea veche, doar afișate mărit / decupat.
import { OUT, clamp, lerp, ease } from './kit2d.js';

const IM = {};
const img = (n) => { if (!IM[n]) { const i = new Image(); i.src = `img/${n}.jpg`; IM[n] = i; } return IM[n]; };
const ready = (im) => im && im.complete && im.naturalWidth;
const SW = 724, SH = 676, BG = '#0d0712';
const FONT = 'Inter, "Segoe UI", sans-serif';

function tag(g, s, x, y, maxW, col = '#f6eef7', size = 13, align = 'left') {
  g.save(); g.font = `700 ${size}px ${FONT}`;
  let t = s; while (g.measureText(t).width > maxW - 14 && t.length > 4) t = t.slice(0, -2);
  if (t !== s) t = t.trimEnd() + '…';
  const w = g.measureText(t).width + 14; const x0 = align === 'right' ? x - w : x;
  g.fillStyle = 'rgba(20,10,28,.9)'; g.beginPath(); g.roundRect(x0, y, w, size + 10, 8); g.fill();
  g.fillStyle = col; g.textBaseline = 'middle'; g.textAlign = 'left'; g.fillText(t, x0 + 7, y + (size + 10) / 2 + 0.5); g.restore();
}
function wrap(g, s, maxW) { const out = []; let line = ''; for (const w of s.split(' ')) { const t = line ? line + ' ' + w : w; if (g.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t; } if (line) out.push(line); return out; }

// poza într-un cerc: umple cercul (pozele de examen sunt deja decupate pătrat pe câmpul microscopului)
function disc(g, name, cx, cy, R, a = 1, ringCol = '#c2558c') {
  const im = img(name);
  g.save(); g.globalAlpha = a; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fillStyle = '#050208'; g.fill(); g.clip();
  if (ready(im)) { const s = Math.max((2 * R) / im.naturalWidth, (2 * R) / im.naturalHeight) * 1.03; g.imageSmoothingQuality = 'high'; g.drawImage(im, cx - (im.naturalWidth * s) / 2, cy - (im.naturalHeight * s) / 2, im.naturalWidth * s, im.naturalHeight * s); }
  g.restore();
  g.save(); g.globalAlpha = a; g.lineWidth = 12; g.strokeStyle = OUT; g.beginPath(); g.arc(cx, cy, R + 3, 0, 7); g.stroke(); g.lineWidth = ringCol === '#c2558c' ? 3 : 6; g.strokeStyle = ringCol; if (ringCol !== '#c2558c') { g.shadowColor = ringCol; g.shadowBlur = 16; } g.beginPath(); g.arc(cx, cy, R + 8, 0, 7); g.stroke(); g.restore();
}
const EXPOS = { 1: [[362, 350, 278]], 2: [[186, 350, 170], [538, 350, 170]], 3: [[180, 230, 146], [544, 230, 146], [362, 482, 146]] };

/* ================================================================== MICROSCOPUL */
// sceneOpts: main {img, cap}, size [w, h] (pixelii pozei), steps: [{mode: 'full' | 'zoom' | 'swap', img, cap, rect}] (câte unul pe punct)
export function mic({ spec }) {
  const o = spec.sceneOpts; const [IW, IH] = o.size; const steps = o.steps;
  const C = [350, 338], R = 292;
  const sFull = Math.max((2 * R) / IW, (2 * R) / IH); // ansamblul umple vizorul (ca la microscop); toată poza rămâne pe harta mică și pe slide-ul fișei
  const vFull = { cx: IW / 2, cy: IH / 2, s: sFull };
  const viewOf = (st) => { if (!st || st.mode !== 'zoom') return vFull; const [x, y, w, h] = st.rect; const s = Math.max(sFull, (2 * R * 0.9) / Math.hypot(w, h)), q = R / s; return { cx: clamp(x + w / 2, q, IW - q), cy: clamp(y + h / 2, q, IH - q), s }; }; // vizorul rămâne mereu plin: nu iese din poză
  const views = steps.map(viewOf);
  const DZ = 1.5; // durata apropierii (s); apoi apare decupajul cu elipsa
  // harta mică (toată poza), jos-dreapta
  const mS = Math.min(190 / IW, 125 / IH), mW = IW * mS, mH = IH * mS, mX = SW - 8 - mW, mY = SH - 30 - mH;
  const anchors = steps.map((_, i) => [36 + i * 42, 72]);
  const exam = o.exam || []; const EP = EXPOS[Math.min(3, exam.length)] || [];
  function drawExam(g, a) { // pozele reale ale lamei de examen, toate odată (de la mărirea mică la cea mare)
    if (a <= 0.005) return;
    g.save(); g.globalAlpha = a; g.fillStyle = BG; g.fillRect(0, 44, SW, SH - 44); g.restore();
    EP.forEach(([x, y, r], k) => disc(g, exam[k], x, y, r, a));
    g.save(); g.globalAlpha = a; tag(g, o.examCap, 8, 640, SW - 16, '#ffe36e'); g.restore();
  }
  const phases = (spec.points || []).map((p) => p.h.split('·')[0].trim());
  function drawMain(g, v, a) {
    const im = img(o.main.img); if (!ready(im) || a <= 0.005) return;
    g.save(); g.globalAlpha = a; g.imageSmoothingQuality = 'high';
    g.drawImage(im, C[0] - v.cx * v.s, C[1] - v.cy * v.s, IW * v.s, IH * v.s); g.restore();
  }
  function drawCrop(g, st, v, a) { // decupajul existent, exact peste locul lui din poză
    const im = img(st.img); if (!ready(im) || a <= 0.005) return; const [x, y, w, h] = st.rect;
    g.save(); g.globalAlpha = a; g.imageSmoothingQuality = 'high';
    g.drawImage(im, C[0] + (x - v.cx) * v.s, C[1] + (y - v.cy) * v.s, w * v.s, h * v.s); g.restore();
  }
  function drawSwap(g, st, a) { // decupajul de obiectiv mare (nu are loc cunoscut pe poza lamei): umple vizorul
    const im = img(st.img); if (!ready(im) || a <= 0.005) return; const s = Math.max((2 * R) / im.naturalWidth, (2 * R) / im.naturalHeight);
    g.save(); g.globalAlpha = a; g.imageSmoothingQuality = 'high';
    g.drawImage(im, C[0] - (im.naturalWidth * s) / 2, C[1] - (im.naturalHeight * s) / 2, im.naturalWidth * s, im.naturalHeight * s); g.restore();
  }
  return {
    W: SW, H: SH, home: { x: SW / 2, y: SH / 2, z: 1 }, cams: null, anchors, labels: [],
    phase: (i) => phases[i] || '',
    draw(g, t, b) {
      g.fillStyle = BG; g.fillRect(-2000, -2000, 4000 + SW, 4000 + SH);
      const i = Math.max(0, Math.min(steps.length - 1, b.i)); const st = steps[i], pv = steps[i - 1];
      if (st.mode === 'exam') { drawExam(g, 1); tag(g, 'lama de examen · poze reale la microscop', SW - 8, 54, 360, '#ffe36e', 13, 'right'); return; }
      if (st.mode === 'ex') { // doar pozele lamei de examen: poza punctului, mare; toate pozele rămân în coloana din dreapta
        const u2 = ease(clamp((b.i < 0 ? 0 : b.bt) / 0.8)); const same = pv && pv.mode === 'ex' && pv.img === st.img;
        if (pv && pv.mode === 'exam') drawExam(g, 1 - u2);
        if (pv && pv.mode === 'ex' && !same) disc(g, pv.img, 322, 340, 276, 1 - u2);
        disc(g, st.img, 322, 340, 276, same ? 1 : u2);
        if (exam.length > 1) exam.forEach((e, k) => disc(g, e, 668, 150 + k * 108, 44, 1, e === st.img ? '#ffe36e' : '#c2558c'));
        tag(g, st.cap, 8, 640, SW - 16, '#ffe36e');
        return;
      }
      const fromExam = pv && pv.mode === 'exam';
      const bt = b.i < 0 ? 0 : b.bt; const u = ease(clamp(bt / DZ));
      const vTo = views[i], vFrom = fromExam ? vTo : i > 0 ? views[i - 1] : vFull;
      // vizorul
      g.save(); g.beginPath(); g.arc(C[0], C[1], R, 0, 7); g.fillStyle = '#050208'; g.fill(); g.clip();
      let v = vTo, mag = vTo.s / sFull;
      const swapNow = st.mode === 'swap', swapPrev = pv && pv.mode === 'swap';
      if (swapNow || swapPrev) {
        // schimbare de poză: se stinge prima, se aprinde a doua (fără zoom, ca să nu sugereze un loc pe lamă)
        const aOut = 1 - clamp(u * 2), aIn = clamp(u * 2 - 1);
        if (swapPrev) drawSwap(g, pv, aOut); else { drawMain(g, vFrom, aOut); if (pv && pv.mode === 'zoom') drawCrop(g, pv, vFrom, aOut); }
        if (swapNow) drawSwap(g, st, aIn); else { drawMain(g, vTo, aIn); if (st.mode === 'zoom') drawCrop(g, st, vTo, aIn); }
      } else {
        const k = Math.pow(vTo.s / vFrom.s, u); v = { cx: lerp(vFrom.cx, vTo.cx, u), cy: lerp(vFrom.cy, vTo.cy, u), s: vFrom.s * k }; mag = v.s / sFull;
        drawMain(g, v, 1);
        if (pv && pv.mode === 'zoom') drawCrop(g, pv, v, 1 - clamp(u * 3));
        if (st.mode === 'zoom') drawCrop(g, st, v, clamp((bt - DZ) / 0.5));
      }
      // vigneta vizorului
      const vg = g.createRadialGradient(C[0], C[1], R * 0.72, C[0], C[1], R); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.55)'); g.fillStyle = vg; g.fillRect(C[0] - R, C[1] - R, 2 * R, 2 * R);
      g.restore();
      g.save(); g.lineWidth = 14; g.strokeStyle = OUT; g.beginPath(); g.arc(C[0], C[1], R + 4, 0, 7); g.stroke(); g.lineWidth = 3; g.strokeStyle = '#c2558c'; g.beginPath(); g.arc(C[0], C[1], R + 9, 0, 7); g.stroke(); g.restore();
      // starea vizorului (sus-dreapta)
      const done = u >= 0.999;
      const state = swapNow && u > 0.5 ? 'decupaj la obiectiv mare' : st.mode === 'zoom' || (pv && pv.mode === 'zoom' && !done) ? (mag > 1.05 ? `poza de la LP, mărită ×${mag.toFixed(1).replace('.', ',')}` : 'poza de la LP, alt loc pe lamă') : 'poza de la LP · ansamblu';
      tag(g, state, SW - 8, 54, 330, '#ffe36e', 13, 'right');
      // legenda pasului (jos-stânga)
      tag(g, st.cap, 8, 630, SW - mW - 32);
      g.save(); g.font = `500 10.5px ${FONT}`; g.fillStyle = 'rgba(246,238,247,.62)'; g.fillText('Detaliile încercuite: pe pozele preparatelor de la LP.', 8, 670); g.restore();
      // harta mică: unde ești pe lamă
      const mm = img(o.main.img);
      g.save(); g.fillStyle = '#0b0610'; g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.roundRect(mX - 3, mY - 3, mW + 6, mH + 6, 8); g.fill(); g.stroke();
      if (ready(mm)) { g.globalAlpha = swapNow && u > 0.5 ? 0.45 : 1; g.drawImage(mm, mX, mY, mW, mH); g.globalAlpha = 1; }
      if (!(swapNow || swapPrev)) { g.beginPath(); g.rect(mX, mY, mW, mH); g.clip(); g.strokeStyle = '#ffe36e'; g.lineWidth = 2.5; g.shadowColor = '#ffe36e'; g.shadowBlur = 8; g.beginPath(); g.arc(mX + v.cx * mS, mY + v.cy * mS, Math.max(4, (R / v.s) * mS), 0, 7); g.stroke(); }
      g.restore();
      tag(g, 'poza de la LP · cercul = ce vezi în vizor', SW - 8, mY - 28, 270, 'rgba(246,238,247,.8)', 11, 'right');
      if (fromExam) drawExam(g, 1 - clamp(u * 2.5));
    },
  };
}

/* ================================================================== DD FAȚĂ ÎN FAȚĂ */
// sceneOpts: main {img, cap}, dd {img, cap}, items: [textul pasului] (partenerul, asemănarea, caracteristicile 1–3), heads: [titlul pasului]
export function ddface({ spec }) {
  const o = spec.sceneOpts; const L = [186, 318, 172], Rr = [538, 318, 172];
  const anchors = [[Rr[0] - 63, 112], [SW / 2, L[1]], [Rr[0] - 21, 112], [Rr[0] + 21, 112], [Rr[0] + 63, 112]];
  return {
    W: SW, H: SH, home: { x: SW / 2, y: SH / 2, z: 1 }, cams: null, anchors, labels: [],
    phase: (i) => (i < 0 ? '' : o.heads[i] || ''),
    draw(g, t, b) {
      g.fillStyle = BG; g.fillRect(-2000, -2000, 4000 + SW, 4000 + SH);
      const i = b.i; const a = i < 0 ? 0 : ease(clamp(b.bt / 0.6));
      disc(g, o.main.img, L[0], L[1], L[2], 1, i === 1 ? '#9dff8a' : '#c2558c');
      disc(g, o.dd.img, Rr[0], Rr[1], Rr[2], 1, i === 1 ? '#9dff8a' : i >= 0 ? '#ffe36e' : '#c2558c');
      g.save(); g.font = `800 15px "Plus Jakarta Sans", ${FONT}`; g.textBaseline = 'middle'; g.textAlign = 'center'; g.fillStyle = 'rgba(246,238,247,.9)'; g.fillText('lama ta', L[0], 520); g.fillStyle = '#ffe36e'; g.fillText('partenerul de DD', Rr[0], 520); g.restore();
      g.save(); g.font = `700 13px ${FONT}`; const w1 = Math.min(336, g.measureText(o.main.cap).width + 14), w2 = Math.min(336, g.measureText(o.dd.cap).width + 14); g.restore();
      tag(g, o.main.cap, L[0] - w1 / 2, 538, 340); tag(g, o.dd.cap, Rr[0] - w2 / 2, 538, 340, '#ffe36e');
      if (i >= 0 && o.items[i]) {
        g.save(); g.globalAlpha = a; g.font = `700 15px ${FONT}`; const lines = wrap(g, o.items[i], 684).slice(0, 2);
        g.fillStyle = 'rgba(20,10,28,.92)'; g.strokeStyle = i === 1 ? '#9dff8a' : '#ffe36e'; g.lineWidth = 2; g.beginPath(); g.roundRect(8, 592, 708, 44, 10); g.fill(); g.stroke();
        g.fillStyle = '#f6eef7'; g.textBaseline = 'middle'; g.textAlign = 'left'; lines.forEach((ln, k) => g.fillText(ln, 20, lines.length === 1 ? 614 : 604 + k * 19)); g.restore();
      }
      g.save(); g.font = `500 10.5px ${FONT}`; g.fillStyle = 'rgba(246,238,247,.62)'; g.fillText(o.credit, 8, 664); g.restore();
    },
  };
}

/* ================================================================== SCHELETUL STAȚIEI */
export function schelet() {
  const W = 1000, H = 934;
  const rows = [
    { t: '1 min · citești', p: '7 min în total', c: '#6d6178', sub: 'apoi 6 min vorbești: contează doar ce spui cu voce tare' },
    { t: 'Diagnosticul', p: '1 p', c: '#e07bb0', sub: 'țesut/organ + colorație + organul · obligatoriu, eliminatoriu' },
    { t: 'Diagnostic pozitiv', p: 'max 6 p', c: '#c2558c', sub: 'ob. mic, apoi ob. mare · noțiuni de 1 p sau 0,5 p' },
    { t: 'Diagnostic diferențial', p: 'max 2 p', c: '#9a2f66', sub: 'partenerul cu colorația și organul 0,5 p + 3 caracteristici × 0,5 p' },
    { t: 'Bonus', p: 'max 0,5 p', c: '#7fb8e8', sub: 'informații corecte în plus: 0,25 p/noțiune' },
  ];
  const Y0 = 70, RH = 132, GAP = 14, X0 = 150, RW = 800;
  const yOf = (k) => Y0 + k * (RH + GAP);
  const seg = [[1, '#e07bb0', '1'], [6, '#c2558c', '6'], [2, '#9a2f66', '2']];
  return {
    W, H, home: { x: 500, y: 467, z: 1 }, cams: null, anchors: rows.map((_, k) => [X0 - 62, yOf(k) + RH / 2]), labels: [],
    phase: (i) => (i < 0 ? '' : rows[i].t),
    draw(g, t, b) {
      g.fillStyle = BG; g.fillRect(-3000, -3000, 7000, 7000);
      // firul ordinii
      g.save(); g.strokeStyle = 'rgba(255,255,255,.16)'; g.lineWidth = 6; g.beginPath(); g.moveTo(X0 - 62, yOf(0) + RH / 2); g.lineTo(X0 - 62, yOf(4) + RH / 2); g.stroke(); g.restore();
      rows.forEach((r, k) => {
        const on = b.i === k; const y = yOf(k);
        g.save(); if (on) { g.shadowColor = r.c; g.shadowBlur = 26; }
        g.fillStyle = on ? '#2e1838' : '#1c1226'; g.strokeStyle = OUT; g.lineWidth = 7; g.beginPath(); g.roundRect(X0, y, RW, RH, 20); g.fill(); g.stroke(); g.shadowBlur = 0;
        g.fillStyle = r.c; g.beginPath(); g.roundRect(X0, y, 16, RH, [20, 0, 0, 20]); g.fill();
        g.fillStyle = '#fff'; g.font = `800 36px "Plus Jakarta Sans", ${FONT}`; g.textBaseline = 'middle'; g.textAlign = 'left'; g.fillText(r.t, X0 + 40, y + 46);
        g.font = `600 21px ${FONT}`; g.fillStyle = 'rgba(246,238,247,.82)'; g.fillText(r.sub, X0 + 40, y + 94, RW - 70);
        g.font = `800 28px "Plus Jakarta Sans", ${FONT}`; const pw = g.measureText(r.p).width + 36;
        g.fillStyle = r.c; g.strokeStyle = OUT; g.lineWidth = 5; g.beginPath(); g.roundRect(X0 + RW - pw - 22, y + 20, pw, 50, 25); g.fill(); g.stroke();
        g.fillStyle = k === 4 ? '#0d0712' : '#fff'; g.textAlign = 'center'; g.fillText(r.p, X0 + RW - 22 - pw / 2, y + 46);
        g.restore();
      });
      // bara punctajului: 1 + 6 + 2 = 9 p, plus 1 p din oficiu
      const by = yOf(5) + 16, bx = X0, bw = RW - 150, u = bw / 9; let x = bx;
      g.save(); g.textBaseline = 'middle'; g.textAlign = 'center';
      seg.forEach(([n, c, s], k) => { const on = b.i === k + 1; g.fillStyle = c; g.strokeStyle = OUT; g.lineWidth = 6; if (on) { g.shadowColor = c; g.shadowBlur = 22; } g.beginPath(); g.roundRect(x, by, n * u, 58, 12); g.fill(); g.stroke(); g.shadowBlur = 0; g.fillStyle = '#fff'; g.font = `800 28px "Plus Jakarta Sans", ${FONT}`; g.fillText(s + ' p', x + (n * u) / 2, by + 30); x += n * u; });
      g.fillStyle = '#4a3d58'; g.strokeStyle = OUT; g.lineWidth = 6; g.beginPath(); g.roundRect(bx + bw + 16, by, 134, 58, 12); g.fill(); g.stroke(); g.fillStyle = '#fff'; g.font = `800 20px "Plus Jakarta Sans", ${FONT}`; g.fillText('+ 1 oficiu', bx + bw + 83, by + 30);
      g.restore();
    },
  };
}
