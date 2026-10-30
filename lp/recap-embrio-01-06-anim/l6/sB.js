// Partea C: malformațiile SNC — axa pe etape, encefalul, defectele de tub neural, spina bifida (occulta, meningocel, mielomeningocel), microcefalia.
// Orientări: secțiuni transversale prin coloană = SUS DORSAL (pielea spatelui sus); sagitale prin coloană = SUS CRANIAL, ANTERIOR la stânga, POSTERIOR (spatele) la dreapta.
import {
  W, H, cam, HOME, C, N, bg, panel, P, on, loopT, txt, pill, curve, at, tube, flow, dot, ell, arr, ring, lead, photo, photoCap, CR,
  crestCell, mix, OUT, clamp, lerp, ease, paint, blob, bb, REDUCED,
} from './ek.js';
import { dorsalTube } from './sA.js';

const e01 = (b, f = 0.65) => ease(clamp(b.bt / (b.bd * f)));

/* =================================================== AXA MALFORMAȚIILOR PE ETAPE */
// Ce trebuie să se vadă: axa lunilor 1 → 9 → după naștere (stânga → dreapta = timpul). Bara etapei k crește de la începutul ei
// spre sfârșit (în sensul timpului). Jos, mecanismul etapei: 0 plicile se unesc; 1 o veziculă se împarte în două;
// 2 celulele se înmulțesc; 3 neuronii pleacă de lângă ventricul SPRE suprafață (cortex); 4 mielina se înfășoară pe axon.
const STG = [
  ['Neurulația', 'S3–S4', 0.6, 1.0, 'encefalocel · mielomeningocel', N.neuro],
  ['Dezvoltarea prozencefalică', 'luna 2–3', 2, 3, 'holoprozencefalie · Dandy-Walker', '#f08a6a'],
  ['Proliferarea neuronală', 'luna 3–4', 3, 4, 'stenoza apeductului · hidrocefalie', '#4f8fe6'],
  ['Migrarea neuronală', 'luna 3–5', 3, 5, 'schizencefalie · colpocefalie · lisencefalie\nagenezia corpului calos', '#3db06c'],
  ['Organizarea', 'luna 5 → ani după naștere', 5, 11, 'leziuni perinatale · ICH / HIE · tumori · infecții ale SNC', '#a7792a'],
  ['Mielinizarea', 'naștere → ani după naștere', 9, 11, 'leziuni perinatale · ICH · tumori · infecții ale SNC', '#e0574f'],
];
export function malAxis() {
  const X = (m) => 330 + (m - 1) * 58; const Y = (k) => 100 + k * 92;
  const BEAT = [[0], [1], [2], [3], [4, 5]];
  return {
    home: HOME,
    anchors: [[28, Y(0)], [28, Y(1)], [28, Y(2)], [28, Y(3)], [28, Y(4) + 46]],
    phase: (i) => ['luna 1', 'luna 2–3', 'luna 3–4', 'luna 3–5', 'luna 5 → ani'][i] || 'ce etapă a fost ratată?',
    draw(g, t, b) {
      bg(g);
      const cur = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 3) % 5 : b.i;
      const pr = b.i < 0 ? clamp(((REDUCED ? 3 : t % 3)) / 2) : e01(b);
      tube(g, [[X(1), 640], [X(11), 640]], 5, '#6b5650', { ow: 3 });
      for (let m = 1; m <= 9; m++) txt(g, m === 1 ? 'luna 1' : m === 9 ? 'luna 9' : String(m), X(m), 668, 15, '#d8c4b8', { w: 700 });
      txt(g, 'după naștere', X(10.4), 668, 15, '#d8c4b8', { w: 700 });
      tube(g, [[X(9.4), 92], [X(9.4), 650]], 3, '#ffe36e', { ow: 0, alpha: 0.5, dash: [8, 8] }); txt(g, 'naștere', X(9.4), 78, 14, C.hi); // sub pastila de fază din colț
      STG.forEach(([n, w, a, c, mal, col], k) => {
        const gi = k === 5 ? 4 : k; const act = gi === cur; const done = b.i < 0 ? gi <= cur : gi < cur;
        const u = act ? pr : done ? 1 : 0;
        const al = act ? 1 : done ? 0.6 : 0.3;
        txt(g, n, 188, Y(k) - 14, 15, col === N.neuro ? '#d9c6ff' : col, { alpha: al });
        txt(g, w, 188, Y(k) + 12, 13, '#d8c4b8', { alpha: al, w: 600 });
        tube(g, [[X(a), Y(k)], [X(a) + Math.max(4, (X(c) - X(a)) * u), Y(k)]], 18, col, { ow: 4, alpha: Math.max(0.3, al) });
        if (u > 0.5) txt(g, mal, Math.min(X(c) + 10, 760), Y(k) + 30, 14, C.cream, { alpha: al, w: 700, align: Math.min(X(c) + 10, 760) === 760 ? 'right' : 'left' });
      });
      // mecanismul etapei curente
      panel(g, 120, 720, 760, 190);
      const mx = 500, my = 815, q = b.i < 0 ? pr : e01(b, 0.9);
      if (cur === 0) { // plicile se unesc
        [-1, 1].forEach((s) => tube(g, [[mx + s * 140, my + 50], [mx + s * 90, my + 20], [mx + s * lerp(70, 12, q), my - 40]], 22, N.neuro, { ow: 5 }));
        txt(g, 'tubul trebuie să se închidă', mx, my + 75, 16, '#d9c6ff');
      } else if (cur === 1) { // prozencefalul se împarte în 2 emisfere
        const sp = 60 * q; ell(g, mx - sp, my, 90 - 20 * q, 60, N.pros, { ow: 5 }); ell(g, mx + sp, my, 90 - 20 * q, 60, N.pros, { ow: 5 });
        txt(g, 'prozencefalul se împarte în 2 emisfere', mx, my + 78, 16, '#ffd6c4');
      } else if (cur === 2) { // proliferare
        const n = 1 + Math.floor(q * 15); for (let j = 0; j < n; j++) dot(g, mx - 150 + (j % 8) * 42, my - 30 + Math.floor(j / 8) * 46, 14, '#4f8fe6', { ow: 3 });
        txt(g, 'neuronii se înmulțesc', mx, my + 78, 16, '#cfe0ff');
      } else if (cur === 3) { // migrare: de la ventricul (stânga) spre cortex (dreapta)
        tube(g, [[mx - 260, my - 60], [mx - 260, my + 50]], 20, N.csf, { ow: 4 }); tube(g, [[mx + 230, my - 60], [mx + 230, my + 50]], 26, '#b9a7c9', { ow: 4 });
        txt(g, 'ventricul', mx - 260, my + 75, 14, '#cfe0ff'); txt(g, 'cortex', mx + 230, my + 75, 14, '#e3d6ff');
        // neuronii sunt mov (neuroectoderm), nu verzi: verde = creasta neurală în tot deck-ul
        for (let j = 0; j < 4; j++) { const u = clamp(q * 1.3 - j * 0.1); dot(g, lerp(mx - 230, mx + 200, ease(u)), my - 40 + j * 28, 11, N.neuro, { ow: 3 }); tube(g, [[mx - 240, my - 40 + j * 28], [mx + 210, my - 40 + j * 28]], 2, '#d9c6ff', { ow: 0, alpha: 0.4 }); }
        txt(g, 'neuronii migrează spre suprafață', mx, my - 80, 16, '#d9c6ff');
      } else { // organizare + mielinizare
        tube(g, [[mx - 260, my], [mx + 260, my]], 8, '#f3ecff', { ow: 3 });
        for (let j = 0; j < 5; j++) { const u = clamp(q * 1.4 - j * 0.12); if (u > 0) ell(g, mx - 200 + j * 100, my, 40 * u, 16 * u + 4, '#f7f0c8', { ow: 3 }); }
        dot(g, mx - 280, my, 22, '#b9a7c9', { ow: 4 });
        txt(g, 'conexiuni + teaca de mielină', mx, my + 70, 16, '#fff3c4');
      }
    },
  };
}

/* =================================================== ENCEFALUL (1): encefalocel, holoprozencefalie, Dandy-Walker, stenoza apeductului */
// Ce trebuie să se vadă:
// 0 encefalocel: sagital (anterior stânga) — prin defectul craniului (aici occipital, posterior) iese un sac de meninge cu encefal, spre ÎN AFARĂ.
// 1 holoprozencefalie: coronal — fisura mediană coboară normal până separă emisferele; în boală se oprește → un singur ventricul.
// 2 Dandy-Walker: sagital fosa posterioară — cerebel mic + ventriculul IV umflat chistic, apoi ventriculii de deasupra se dilată.
// 3 stenoza apeductului: LCR curge de SUS (ventriculii laterali) → ventriculul III → apeduct (blocat) ; se dilată ventriculii DINAINTEA
//   blocajului (laterali + III), ventriculul IV rămâne normal; craniul crește.
function headSag(g, x, y, s, o = {}) {
  // cap sagital: neurocraniu + față (anterior = stânga)
  const sk = new Path2D(); sk.ellipse(x + 10 * s, y - 10 * s, (o.rx || 120) * s, (o.ry || 105) * s, 0, 0, 7);
  paint(g, sk, '#f0dccb', null, null, [x - 110 * s, y - 115 * s, 240 * s, 210 * s], OUT, 6);
  const face = new Path2D(); face.moveTo(x - 90 * s, y + 20 * s); face.bezierCurveTo(x - 130 * s, y + 60 * s, x - 110 * s, y + 130 * s, x - 40 * s, y + 130 * s); face.lineTo(x + 30 * s, y + 100 * s); face.closePath();
  paint(g, face, '#f0dccb', null, null, [x - 130 * s, y + 20 * s, 160 * s, 110 * s], OUT, 5);
}
export function malBrain1() {
  const POS = [[250, 265], [750, 265], [250, 695], [750, 695]];
  const NM = ['Encefalocel', 'Holoprozencefalie', 'Dandy-Walker', 'Stenoza apeductului → hidrocefalie'];
  return {
    home: HOME,
    anchors: [[40, 90], [540, 90], [40, 520], [540, 520]],
    phase: (i) => ['tub neînchis (neuropor rostral)', 'prozencefalul nu se împarte', 'cerebel + ventriculul IV', 'LCR blocat în apeduct'][i] || '',
    draw(g, t, b) {
      bg(g);
      POS.forEach(([x, y], k) => {
        const act = b.i === k || b.i < 0; const u = b.i === k ? e01(b) : b.i < 0 ? 0.5 + 0.5 * Math.sin(t * 1.2 + k) : 1;
        panel(g, x - 235, y - 195, 470, 405, { fill: b.i === k ? 'rgba(217,101,42,.18)' : 'rgba(255,240,228,.05)', stroke: b.i === k ? 'rgba(255,180,138,.7)' : 'rgba(255,230,210,.14)' });
        g.save(); g.globalAlpha = act ? 1 : 0.45;
        txt(g, NM[k], x, y - 165, 19, C.cream);
        if (k === 0) {
          headSag(g, x - 20, y + 10, 0.95);
          ell(g, x - 10, y, 92, 80, '#e9b9c9', { ow: 4 }); // encefalul
          // defect occipital: gaura în craniu + sac care iese posterior
          const gx = x + 100, gy = y - 10;
          ell(g, gx + 18 + 40 * u, gy, 30 + 40 * u, 28 + 30 * u, N.men, { ow: 4 });
          ell(g, gx + 10 + 30 * u, gy, 18 + 26 * u, 16 + 18 * u, '#e9b9c9', { ow: 3 });
          txt(g, 'encefal + meninge\nprin defectul craniului', x + 30, y + 160, 15, '#ffd0e6');
          txt(g, 'posterior →', x + 175, y + 90, 13, '#c9b3a6', { w: 600 });
        } else if (k === 1) {
          // coronal: emisfere; fisura coboară
          const depth = b.i === 1 ? lerp(0, 0.35, u) : b.i < 0 ? 0.35 : 0.35;
          ell(g, x, y + 10, 170, 130, '#e9b9c9', { ow: 5 });
          tube(g, [[x, y - 120], [x, y - 120 + 240 * depth]], 8, '#2a1534', { ow: 0 });
          ell(g, x, y + 30, 90 - 10 * u, 34, N.csf, { ow: 4 });
          txt(g, 'un singur ventricul', x, y + 30, 15, OUT, { stroke: false });
          txt(g, 'fisura se oprește:\nnu se fac 2 emisfere', x, y + 168, 15, '#ffd6c4');
          if (b.i === 1 && u > 0.7) txt(g, '✕', x, y - 120 + 240 * depth + 22, 28, C.key);
        } else if (k === 2) {
          // sagital fosa posterioară: trunchi, cerebel mic, ventriculul IV chistic
          ell(g, x - 60, y - 40, 120, 80, '#e9b9c9', { ow: 4 });
          tube(g, [[x - 40, y], [x - 20, y + 150]], 34, '#d7b6c9', { ow: 4 });
          const cy = lerp(30, 70, u);
          ell(g, x + 60, y + 60, cy + 30, cy + 20, N.csf, { ow: 4 }); txt(g, 'ventriculul IV\nchistic', x + 60, y + 60, 14, OUT, { stroke: false });
          ell(g, x + 60, y - 30 - 10 * u, lerp(50, 34, u), lerp(22, 14, u), '#c99ad6', { ow: 4 });
          txt(g, 'cerebel hipoplazic', x + 95, y - 70 - 10 * u, 14, '#e3d6ff');
          ell(g, x - 60, y - 40, 40 + 20 * u, 22 + 10 * u, N.csf, { ow: 3 });
          txt(g, '+ hidrocefalie', x - 80, y + 165, 15, '#cfe0ff');
        } else {
          // stenoza: ventriculii laterali + III se dilată, IV normal
          const R = b.i === 3 ? u : b.i < 0 ? 0.5 + 0.5 * Math.sin(t) : 1;
          ell(g, x, y - 20, 150 + 30 * R, 120 + 22 * R, '#f0dccb', { ow: 5 });
          ell(g, x - 30, y - 50, 60 + 34 * R, 30 + 22 * R, N.csf, { ow: 4 }); txt(g, 'laterali', x - 30, y - 50, 14, OUT, { stroke: false });
          ell(g, x - 20, y + 20, 18 + 10 * R, 24 + 12 * R, N.csf, { ow: 4 }); txt(g, 'III', x - 20, y + 20, 13, OUT, { stroke: false });
          tube(g, [[x - 10, y + 48], [x + 20, y + 100]], 6, N.csf, { ow: 3 });
          ell(g, x + 40, y + 125, 22, 16, N.csf, { ow: 3 }); txt(g, 'IV', x + 40, y + 125, 12, OUT, { stroke: false });
          tube(g, [[x - 8, y + 66], [x + 12, y + 76]], 6, C.key, { ow: 0 });
          flow(g, [[x - 60, y - 60], [x - 30, y - 10], [x - 20, y + 20], [x - 10, y + 52]], t, '#2f68bd', 5, 0.35, 6);
          txt(g, 'apeduct blocat', x + 120, y + 60, 15, C.key);
          txt(g, 'cea mai frecventă cauză de hidrocefalie', x, y + 175, 14, '#cfe0ff');
        }
        g.restore();
      });
    },
  };
}

/* =================================================== ENCEFALUL (2): lisencefalie, schizencefalie, colpocefalie, agenezia corpului calos */
// Ce trebuie să se vadă:
// 0 lisencefalie: neuronii pleacă de lângă ventricul spre suprafață; normal ajung și scoarța se pliază (girusuri); în boală se opresc → suprafață netedă.
// 1 schizencefalie: o fisură (căptușită cu substanță cenușie) merge de la ventriculul lateral până la scoarță; uni- sau bilateral.
// 2 colpocefalie: coarnele OCCIPITALE (posterioare) ale ventriculilor laterali se dilată; des cu agenezia corpului calos.
// 3 agenezia corpului calos: fibrele cresc din fiecare emisferă spre linia mediană; normal o traversează; în boală se opresc la mijloc (total sau parțial).
export function malBrain2() {
  const POS = [[250, 265], [750, 265], [250, 695], [750, 695]];
  const NM = ['Lisencefalie (agirie)', 'Schizencefalie', 'Colpocefalie', 'Agenezia corpului calos'];
  return {
    home: HOME,
    anchors: [[40, 90], [540, 90], [40, 520], [540, 520]],
    phase: (i) => ['defect de migrare', 'fisuri ventricul → scoarță', 'coarnele occipitale dilatate', 'corpul calos lipsește'][i] || '',
    draw(g, t, b) {
      bg(g);
      POS.forEach(([x, y], k) => {
        const act = b.i === k || b.i < 0; const u = b.i === k ? e01(b, 0.8) : b.i < 0 ? loopT(t + k * 0.7, 4) : 1;
        panel(g, x - 235, y - 195, 470, 405, { fill: b.i === k ? 'rgba(217,101,42,.18)' : 'rgba(255,240,228,.05)', stroke: b.i === k ? 'rgba(255,180,138,.7)' : 'rgba(255,230,210,.14)' });
        g.save(); g.globalAlpha = act ? 1 : 0.45;
        txt(g, NM[k], x, y - 165, 19, C.cream);
        if (k === 0) {
          // două jumătăți: stânga normală (girusuri), dreapta lisencefalie
          [-1, 1].forEach((s) => {
            const cx = x + s * 105, cy = y + 10;
            const pts = []; for (let a = 0; a <= 40; a++) { const an = Math.PI * (1 + a / 40); const r = 95 + (s < 0 ? 6 * Math.sin(a * 1.25) * clamp(u * 1.4 - 0.4) : 0); pts.push([cx + Math.cos(an) * r, cy + Math.sin(an) * r]); }
            pts.push([cx + 95, cy]); pts.push([cx - 95, cy]);
            const pp = new Path2D(); pp.moveTo(pts[0][0], pts[0][1]); pts.forEach((p) => pp.lineTo(p[0], p[1])); pp.closePath();
            paint(g, pp, '#e9b9c9', null, null, [cx - 100, cy - 100, 200, 100], OUT, 4);
            ell(g, cx, cy - 4, 40, 14, N.csf, { ow: 3 });
            for (let j = 0; j < 5; j++) { const an = Math.PI * (1.15 + j * 0.17); const stop = s < 0 ? 0.92 : 0.45; const r = lerp(22, 88, ease(clamp(u * 1.2 - j * 0.04)) * stop); dot(g, cx + Math.cos(an) * r, cy + Math.sin(an) * r, 8, N.neuroS, { ow: 2.5 }); } // neuroni mov, nu verzi (verde = creasta)
            txt(g, s < 0 ? 'normal: girusuri' : 'neuronii se opresc\n→ creier neted', cx, cy + 70, 14, s < 0 ? '#bff0d2' : '#ffd6c4');
          });
        } else if (k === 1) {
          ell(g, x, y + 10, 175, 130, '#e9b9c9', { ow: 5 }); tube(g, [[x, y - 118], [x, y + 138]], 5, '#2a1534', { ow: 0 });
          [-1, 1].forEach((s) => { ell(g, x + s * 45, y, 26, 40, N.csf, { ow: 3 }); });
          // fisura de la ventriculul stâng (ventricul → scoarță, spre lateral)
          const end = [lerp(x - 70, x - 172, u), lerp(y, y - 20, u)];
          tube(g, [[x - 70, y], end], 22, '#b38aa0', { ow: 4 }); tube(g, [[x - 70, y], end], 8, N.csf, { ow: 0 });
          txt(g, 'fisura: ventricul → scoarță', x, y + 168, 15, '#ffd0e6');
        } else if (k === 2) {
          // vedere laterală a ventriculului lateral: anterior stânga, cornul occipital (posterior) la dreapta se dilată
          headSag(g, x - 20, y + 20, 1.05);
          const pth = new Path2D(); const oc = lerp(18, 52, u);
          pth.moveTo(x - 100, y - 10); pth.bezierCurveTo(x - 60, y - 70, x + 40, y - 70, x + 80, y - 30);
          pth.bezierCurveTo(x + 110, y - 10 - oc, x + 150 + oc * 0.4, y + 10, x + 120, y + 10 + oc * 0.6);
          pth.bezierCurveTo(x + 80, y + 20, x + 40, y - 30, x - 10, y - 20); pth.bezierCurveTo(x - 50, y - 10, x - 60, y + 30, x - 90, y + 20); pth.closePath();
          paint(g, pth, N.csf, null, null, [x - 100, y - 70, 260, 120], OUT, 4);
          txt(g, 'coarnele occipitale\ndilatate', x + 120, y + 100, 15, '#cfe0ff'); txt(g, '← anterior', x - 150, y - 140, 13, '#c9b3a6', { w: 600 });
        } else {
          // coronal: fibrele cresc spre linia mediană
          [-1, 1].forEach((s) => ell(g, x + s * 88, y + 10, 84, 120, '#e9b9c9', { ow: 5 }));
          const stop = 1; // în agenezie se opresc la linia mediană
          for (let j = 0; j < 4; j++) {
            const yy = y - 30 + j * 16; const g0 = clamp(u * 1.3 - j * 0.08);
            [-1, 1].forEach((s) => tube(g, [[x + s * 120, yy], [x + s * lerp(120, 8, g0 * stop), yy]], 6, '#f7f0c8', { ow: 3 }));
          }
          tube(g, [[x, y - 100], [x, y + 120]], 4, C.key, { ow: 0, dash: [8, 6], alpha: 0.9 });
          txt(g, 'fibrele nu traversează\nlinia mediană', x, y + 168, 15, '#fff3c4');
        }
        g.restore();
      });
    },
  };
}

/* =================================================== DEFECTELE DE TUB NEURAL (capetele rămân deschise) */
// Ce trebuie să se vadă (vedere dorsală, sus = CRANIAL): fermoarul pornește de la mijloc; pe punctul 1 frontul cranial SE OPREȘTE înainte
// de capăt → neuroporul rostral rămâne deschis (roșu); pe punctul 2 frontul caudal se oprește → neuroporul caudal deschis (lombosacrat);
// pe punctul 3 mijlocul e închis (verde) — defectul e limitat la capătul care n-a apucat să se închidă.
export function ntd() {
  return {
    home: HOME,
    anchors: [[640, 150], [640, 800], [640, 480]],
    phase: (i) => ['neuroporul rostral deschis', 'neuroporul caudal deschis', 'mijlocul s-a închis'][i] || 'S3–S4',
    draw(g, t, b) {
      bg(g);
      let ur, uc;
      const e = e01(b, 0.7);
      if (b.i < 0) { const u = loopT(t, 6); ur = 0.7 * clamp(u / 0.6); uc = 0.62 * clamp(u / 0.6); }
      else if (b.i === 0) { ur = 0.7 * e; uc = 1; }
      else if (b.i === 1) { ur = 1; uc = 0.62 * e; }
      else { ur = 0.7; uc = 0.62; }
      const r = dorsalTube(g, t, ur, uc, { redR: b.i !== 1, redC: b.i !== 0 });
      txt(g, 'CRANIAL', 500, 30, 20, '#d8c4b8');
      if (b.i !== 1) { txt(g, 'rostral rămâne deschis', 800, 130, 19, C.key); txt(g, '→ anencefalie (meroencefalie)\n→ encefalocel', 800, 180, 17, C.cream, { w: 700 }); if (b.i === 0) ring(g, 500, 180, 110, 90, e); }
      if (b.i !== 0) { txt(g, 'caudal rămâne deschis', 800, 770, 19, C.key); txt(g, '→ spina bifida deschisă\n→ mielomeningocel', 800, 820, 17, C.cream, { w: 700 }); if (b.i === 1) ring(g, 500, 790, 70, 80, e); }
      txt(g, 'mijlocul s-a închis', 800, 480, 19, '#bff0d2', { alpha: b.i === 2 || b.i < 0 ? 1 : 0.5 });
      if (b.i === 2) ring(g, 500, 480, 90, 170, e);
      txt(g, 'vedere dorsală', 140, 40, 17, '#c9b3a6', { w: 600 });
    },
  };
}

/* =================================================== SPINA BIFIDA: cele 4 secțiuni */
// Ce trebuie să se vadă (secțiune transversală, SUS = DORSAL = pielea spatelui): corpul vertebral ventral, arcul dorsal.
// normal: arcul închis. occulta: arcul are o fantă mică, NIMIC nu iese, pielea intactă + smoc de păr.
// meningocel: arcul larg deschis, meningele (roz) ies DORSAL ca un sac cu LCR (bleu), acoperit de piele; măduva (mov) rămâne în canal.
// mielomeningocel: și măduva urcă în sac. Pe punctul k, fanta se deschide și sacul se umflă (k = 0, 1, 2).
export function sbSection(g, x, y, s, kind, u, t) {
  // kind: 0 normal · 1 occulta · 2 meningocel · 3 mielomeningocel; u = progresul
  const gap = [0, 10, 46, 52][kind] * s * (kind ? u : 1);
  // corpul vertebral (ventral)
  const body = new Path2D(); body.roundRect(x - 70 * s, y + 70 * s, 140 * s, 90 * s, 16 * s); paint(g, body, N.bone, N.boneS, null, [x - 70 * s, y + 70 * s, 140 * s, 90 * s], OUT, 4);
  // arcul: două jumătăți, fiecare de la corp spre dorsal-median
  [-1, 1].forEach((k) => tube(g, [[x + k * 62 * s, y + 80 * s], [x + k * 84 * s, y + 10 * s], [x + k * 58 * s, y - 52 * s], [x + k * (6 * s + gap), y - 66 * s]], 22 * s, N.bone, { ow: 4 }));
  // sacul (meningocel / mielomeningocel), iese DORSAL
  const sac = kind >= 2 ? u : 0;
  const skinY = y - 120 * s;
  if (sac > 0) {
    const sh = 60 * s * sac, sw = 50 * s * (0.4 + 0.6 * sac);
    ell(g, x, skinY - sh * 0.6, sw + 10 * s, sh + 18 * s, kind === 3 ? '#f3ecff' : N.ecto, { ow: 4 }); // piele (mielomeningocel adesea neacoperit)
    ell(g, x, skinY - sh * 0.6, sw, sh + 6 * s, N.men, { ow: 3 });
    ell(g, x, skinY - sh * 0.6, sw - 9 * s, sh - 4 * s, N.csf, { ow: 2 });
    tube(g, [[x - 12 * s, y - 50 * s], [x - 14 * s, skinY]], 14 * s, N.men, { ow: 0 }); tube(g, [[x + 12 * s, y - 50 * s], [x + 14 * s, skinY]], 14 * s, N.men, { ow: 0 });
  }
  // pielea (albastră, deasupra)
  const sx = 98 * s;
  tube(g, [[x - sx, skinY], [x - (sac > 0 ? 30 * s : 0), skinY]], 12 * s, N.ecto, { ow: 4 });
  tube(g, [[x + (sac > 0 ? 30 * s : 0), skinY], [x + sx, skinY]], 12 * s, N.ecto, { ow: 4 });
  // meningele + LCR în canal
  ell(g, x, y + 8 * s, 46 * s, 46 * s, N.men, { ow: 3 });
  ell(g, x, y + 8 * s, 36 * s, 36 * s, N.csf, { ow: 0 });
  // măduva: în canal sau urcată în sac
  const cordUp = kind === 3 ? sac : 0;
  const cy = lerp(y + 8 * s, skinY - 60 * s * sac * 0.6, cordUp);
  if (cordUp > 0) tube(g, [[x, y + 8 * s], [x, cy]], 16 * s, N.neuro, { ow: 3 });
  ell(g, x, cy, 20 * s, 16 * s, N.neuro, { ow: 3 });
  // occulta: smoc de păr pe piele
  if (kind === 1) { g.save(); g.globalAlpha = u; g.strokeStyle = '#2b1d14'; g.lineWidth = 3 * s; for (let j = 0; j < 9; j++) { g.beginPath(); g.moveTo(x - 30 * s + j * 7 * s, skinY - 6 * s); g.quadraticCurveTo(x - 34 * s + j * 8 * s, skinY - 40 * s, x - 22 * s + j * 8 * s + Math.sin(t * 2 + j) * 3, skinY - 56 * s); g.stroke(); } g.restore(); }
}
export function sbForms() {
  const PX = [140, 380, 620, 860]; const NM = ['normal', 'spina bifida\nocculta', 'meningocel', 'mielomeningocel'];
  return {
    home: HOME,
    anchors: [[380, 160], [620, 160], [860, 160]],
    phase: (i) => ['nimic nu herniază', 'herniază doar meningele', 'meningele + măduva'][i] || 'cu cât iese mai mult, cu atât e mai grav',
    draw(g, t, b) {
      bg(g);
      PX.forEach((x, k) => {
        const act = k === 0 || b.i < 0 || b.i === k - 1; const u = b.i === k - 1 ? e01(b) : b.i < 0 ? 0.5 + 0.5 * Math.sin(t * 1.3) : b.i > k - 1 ? 1 : 0.15;
        panel(g, x - 115, 200, 230, 520, { fill: b.i === k - 1 ? 'rgba(217,101,42,.18)' : 'rgba(255,240,228,.05)', stroke: b.i === k - 1 ? 'rgba(255,180,138,.7)' : 'rgba(255,230,210,.14)' });
        g.save(); g.globalAlpha = act ? 1 : 0.55; sbSection(g, x, 500, 1.05, k, k === 0 ? 1 : u, t); g.restore();
        txt(g, NM[k], x, 770, 19, k === 0 ? '#d8c4b8' : C.cream);
      });
      txt(g, 'dorsal (pielea spatelui) ↑', 500, 120, 17, '#c9b3a6', { w: 700 });
      txt(g, 'albastru = piele · mov = măduva · roz = meninge · bleu = LCR · bej = vertebra', 500, 860, 16, '#d8c4b8', { w: 600 });
    },
  };
}

/* =================================================== OCCULTA: pielea + imagistica */
// Ce trebuie să se vadă: sus, poza punctului; jos-stânga, secțiunea axială animată: cele două lame cresc dinspre corp spre linia mediană
// dorsală; în dreapta (occulta) se opresc și rămâne o fantă, iar canalul și conținutul sunt normale.
export function occulta() {
  const PH = [['p08_x118', 'Depresiune (gropiță) lombosacrată', CR], ['p08_x119', 'Pilozitatea caracteristică', CR], ['sbo_imagistica', 'a, d: occulta S1 · b: filum terminale gras (IRM)', 'LP: doi.org/10.3389/fped.2022.903507'], ['sbo_imagistica', 'c: lombarizare + occulta pe L6 · e: occulta S2', 'LP: doi.org/10.3389/fped.2022.903507']];
  return {
    home: HOME,
    anchors: [[190, 90], [810, 90], [190, 470], [810, 470]],
    phase: (i) => ['semnul de pe piele', 'smocul de păr', 'CT + IRM', 'un nivel mai jos / L6'][i] || 'cea mai frecventă formă',
    draw(g, t, b) {
      bg(g);
      const k = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 4) % 4 : b.i;
      const [im, cap, cr] = PH[k];
      photoCap(g, im, 150, 60, 700, 440, cap, cr, 1);
      // animația axială: normal vs occulta
      const u = b.i < 0 ? loopT(t, 4) : e01(b, 0.8);
      panel(g, 60, 590, 880, 320);
      [[300, 'normal: lamele se unesc\n(apofiza spinoasă)', 0], [700, 'occulta: rămâne o fantă\npe linia mediană', 1]].forEach(([x, s2, oc]) => {
        const cx = x, cy = 760;
        const body = new Path2D(); body.ellipse(cx, cy + 50, 80, 50, 0, 0, 7); paint(g, body, N.bone, N.boneS, null, [cx - 80, cy, 160, 100], OUT, 4);
        ell(g, cx, cy - 20, 36, 32, N.csf, { ow: 3 }); ell(g, cx, cy - 20, 16, 14, N.neuro, { ow: 2 });
        const reach = oc ? lerp(0, 0.78, ease(u)) : ease(u);
        [-1, 1].forEach((sd) => tube(g, [[cx + sd * 56, cy + 20], [cx + sd * 66, cy - 40], [cx + sd * lerp(60, 6, reach), lerp(cy - 50, cy - 74, reach)]], 20, N.bone, { ow: 4 }));
        if (!oc && u > 0.9) tube(g, [[cx, cy - 74], [cx, cy - 104]], 18, N.bone, { ow: 4 });
        if (oc && u > 0.85) ring(g, cx, cy - 72, 26, 22, 1);
        txt(g, s2, cx, cy - 135, 16, oc ? '#ffd0e6' : '#d8c4b8');
      });
      txt(g, 'dorsal ↑', 500, 900, 14, '#c9b3a6', { w: 600 });
    },
  };
}

/* =================================================== MENINGOCEL / MIELOMENINGOCEL (sagital lombosacrat) */
// Ce trebuie să se vadă (sagital: SUS = CRANIAL, anterior = stânga, spatele = dreapta): corpurile vertebrale în stânga, canalul cu măduva,
// arcurile posterioare în dreapta; la nivelul defectului arcurile lipsesc și meningele ies POSTERIOR ca un sac; LCR (bleu) curge din canal ÎN sac.
// meningocel: măduva (mov) rămâne în canal, conul ei e deasupra sacului. mielomeningocel: măduva coboară și intră în sac, nervii se întind.
function spineSag(g, x, y, s, mode, u, t) {
  const VB = 7;
  for (let k = 0; k < VB; k++) { const yy = y + k * 70 * s; const p = new Path2D(); p.roundRect(x - 110 * s, yy, 70 * s, 56 * s, 12 * s); paint(g, p, N.bone, N.boneS, null, [x - 110 * s, yy, 70 * s, 56 * s], OUT, 4); txt(g, ['L1', 'L2', 'L3', 'L4', 'L5', 'S1', 'S2'][k], x - 75 * s, yy + 28 * s, 15 * s, OUT, { stroke: false }); }
  // arcurile posterioare (lipsesc la L4–L5 = defectul)
  for (let k = 0; k < VB; k++) { if (k === 3 || k === 4) continue; const yy = y + k * 70 * s + 10 * s; tube(g, [[x + 50 * s, yy], [x + 80 * s, yy + 30 * s]], 20 * s, N.bone, { ow: 4 }); }
  // pielea spatelui
  const skinX = x + 120 * s;
  // canalul (meninge + LCR)
  const top = y - 20 * s, bot = y + VB * 70 * s;
  tube(g, [[x, top], [x, bot]], 70 * s, N.men, { ow: 4 });
  tube(g, [[x, top], [x, bot]], 54 * s, N.csf, { ow: 0 });
  // sacul
  const sy = y + 3.9 * 70 * s, sh = (70 + 30 * (mode === 1 ? 1 : 0)) * s * u, sw = 100 * s * u;
  if (u > 0.02) {
    ell(g, skinX + sw * 0.55, sy, sw * 0.9 + 12 * s, sh + 10 * s, mode === 1 ? '#f6a0a8' : '#f3c29b', { ow: 4 });
    ell(g, skinX + sw * 0.55, sy, sw * 0.9, sh, N.men, { ow: 3 });
    ell(g, skinX + sw * 0.55, sy, sw * 0.9 - 10 * s, sh - 10 * s, N.csf, { ow: 0 });
    tube(g, [[x + 20 * s, sy - 50 * s], [skinX + 10 * s, sy - 50 * s]], 16 * s, N.csf, { ow: 0 });
    tube(g, [[x + 20 * s, sy + 50 * s], [skinX + 10 * s, sy + 50 * s]], 16 * s, N.csf, { ow: 0 });
    tube(g, [[x + 30 * s, sy], [skinX + 20 * s, sy]], 90 * s, N.csf, { ow: 0 });
    flow(g, [[x + 10 * s, sy - 120 * s], [x + 30 * s, sy - 30 * s], [skinX + sw * 0.5, sy]], t, '#2f68bd', 5, 0.3, 6 * s);
  }
  tube(g, [[skinX, y - 40 * s], [skinX, sy - sh * 0.75]], 12 * s, N.skin, { ow: 4 });
  tube(g, [[skinX, sy + sh * 0.75], [skinX, bot + 20 * s]], 12 * s, N.skin, { ow: 4 });
  // măduva
  if (mode === 0) {
    tube(g, [[x, top], [x, y + 1.6 * 70 * s]], 26 * s, N.neuro, { ow: 4 });
    for (let j = 0; j < 4; j++) tube(g, [[x - 6 * s + j * 4 * s, y + 1.6 * 70 * s], [x - 10 * s + j * 7 * s, bot]], 3 * s, '#d9c6ff', { ow: 0 });
  } else {
    const tip = [lerp(x, skinX + 70 * s, u), lerp(y + 1.6 * 70 * s, sy - 10 * s, u)];
    tube(g, [[x, top], [x, y + 1.6 * 70 * s], [lerp(x, x + 50 * s, u), lerp(y + 2.4 * 70 * s, sy - 60 * s, u)], tip], 26 * s, N.neuro, { ow: 4 });
    for (let j = 0; j < 4; j++) tube(g, [tip, [lerp(x, x + 30 * s, u) + j * 6 * s, lerp(bot - 40 * s, sy + 60 * s, u * 0.6) + j * 10 * s], [x + j * 5 * s, bot]], 3 * s, '#d9c6ff', { ow: 0 });
  }
}
function sagScene(mode) {
  // punctele 0..1: animația; 2..: pozele
  const PH = mode === 0
    ? [null, null, ['meningocel', 'Pe IRM: sac lombosacrat, fără țesut nervos (săgeata galbenă)', CR], ['p11_x135', 'La naștere: tumefacție pe linia mediană a spatelui', CR], ['p11_x136', 'Ecografie prenatală (23 săptămâni)', CR]]
    : [null, null, ['mielomeningocel', 'La naștere: masă lombosacrată', CR], ['p13_x147', 'IRM sagital (A, B)', CR], ['p14_x152', 'Înainte și după operație', 'LP: Corpus ID 79152393']];
  return () => ({
    home: HOME,
    anchors: [[700, 470], [430, 330], [960, 140], [960, 210], [960, 280]],
    phase: (i) => (mode === 0 ? ['sacul: meninge + LCR', 'măduva rămâne în canal', 'IRM', 'la naștere', 'ecografia prenatală'] : ['sacul: meninge + LCR', 'măduva + nervii în sac', 'la naștere', 'IRM sagital', 'înainte / după operație'])[i] || '',
    draw(g, t, b) {
      bg(g);
      const u = b.i < 0 ? 0.5 + 0.5 * Math.sin(t * 0.9) : b.i === 0 ? e01(b) : 1;
      const ph = b.i >= 2 ? PH[b.i] : null;
      g.save(); g.globalAlpha = ph ? 0.25 : 1;
      spineSag(g, 430, 160, 1.05, mode, u, t);
      txt(g, 'CRANIAL ↑', 250, 110, 17, '#c9b3a6', { w: 700 }); txt(g, 'anterior', 230, 880, 16, '#c9b3a6', { w: 700 }); txt(g, 'spatele →', 760, 880, 16, '#c9b3a6', { w: 700 });
      if (mode === 0) { txt(g, 'meninge + LCR\nacoperit de piele', 790, 300, 18, '#ffd0e6'); txt(g, 'măduva și nervii\nrămân în canal', 230, 260, 18, '#d9c6ff'); }
      else { txt(g, 'măduva și nervii\nintră în sac', 790, 280, 18, '#d9c6ff'); txt(g, 'adesea neacoperit\nde piele', 790, 680, 17, '#ffd0e6'); }
      if (b.i === 1) ring(g, mode === 0 ? 430 : 600, mode === 0 ? 250 : 520, 80, 120, e01(b));
      g.restore();
      if (ph) { const a = e01(b, 0.25); g.save(); g.globalAlpha = a; panel(g, 60, 60, 880, 780, { fill: 'rgba(20,12,10,.9)', stroke: 'rgba(255,180,138,.7)' }); g.restore(); photoCap(g, ph[0], 110, 110, 780, 600, ph[1], ph[2], a); }
    },
  });
}
export const meningo = sagScene(0);
export const mmc = sagScene(1);

/* =================================================== MICROCEFALIA */
// Ce trebuie să se vadă: creierul crește și împinge craniul să crească odată cu el (stânga, normal). În dreapta, creșterea creierului
// se oprește (o trisomie / un virus distruge neuronii) → neurocraniul rămâne mic, fața (viscerocraniul) are dimensiuni normale.
export function micro() {
  return {
    home: HOME,
    anchors: [[600, 330], [440, 70], [960, 70]],
    phase: (i) => ['neurocraniu mic, față normală', 'primară = genetică', 'secundară = mediu'][i] || '',
    draw(g, t, b) {
      bg(g);
      const u = b.i < 0 ? loopT(t, 5) : b.i === 0 ? e01(b, 0.8) : 1;
      const head = (x, grow, lab) => {
        const r = lerp(90, grow, ease(u));
        ell(g, x, 470 - r * 0.5, r, r, '#f6dcc4', { ow: 6 });           // neurocraniul
        ell(g, x, 470 - r * 0.5, r * 0.82, r * 0.8, '#e9b9c9', { ow: 3 }); // encefalul
        ell(g, x, 560, 82, 78, '#f6dcc4', { ow: 6 });                       // fața — aceeași
        dot(g, x - 28, 545, 8, '#2a1534', { ow: 0 }); dot(g, x + 28, 545, 8, '#2a1534', { ow: 0 });
        g.save(); g.strokeStyle = OUT; g.lineWidth = 4; g.beginPath(); g.arc(x, 585, 20, 0.3, Math.PI - 0.3); g.stroke(); g.restore();
        txt(g, lab, x, 690, 21, C.cream);
        return r;
      };
      head(280, 150, 'normal');
      head(720, 100, 'microcefalie');
      txt(g, 'creierul crește → craniul crește', 280, 760, 17, '#d8c4b8', { w: 700 });
      txt(g, 'creierul se oprește → craniul rămâne mic', 720, 760, 17, '#ffd0e6', { w: 700 });
      const box = (x, y, head, lines, col, glow) => { pill(g, x, y, 380, 54 + lines.length * 30, col, '', { glow, r: 18 }); txt(g, head, x, y - (lines.length * 30) / 2, 18, OUT, { stroke: false }); lines.forEach((l, j) => txt(g, l, x, y - (lines.length * 30) / 2 + 32 + j * 28, 16, OUT, { stroke: false, w: 600 })); };
      box(230, 150, 'PRIMARĂ · boli genetice', ['trisomia 13 (sindromul Patau)', 'trisomia 18 (sindromul Edwards)', 'trisomia 21 (sindromul Down)'], '#cfe0ff', b.i === 1 ? 1 : 0);
      box(770, 150, 'SECUNDARĂ · factori de mediu', ['toxoplasmoza · CMV', 'rubeola, varicela', 'virusul Zika'], '#ffd3cd', b.i === 2 ? 1 : 0);
      if (b.i === 2 || b.i < 0) for (let j = 0; j < 6; j++) { const a = j / 6 * 7 + t * 0.6; const rr = 70 + 10 * Math.sin(t * 2 + j); const x = 720 + Math.cos(a) * rr, y = 420 + Math.sin(a) * rr * 0.8; dot(g, x, y, 9, '#7fd36a', { ow: 3 }); for (let q = 0; q < 6; q++) { const aa = q / 6 * 7; tube(g, [[x + Math.cos(aa) * 9, y + Math.sin(aa) * 9], [x + Math.cos(aa) * 14, y + Math.sin(aa) * 14]], 2, '#7fd36a', { ow: 0 }); } }
      if (b.i === 1) { const x = 720, y = 420; for (let q = 0; q < 3; q++) { tube(g, [[x - 40 + q * 26, y - 22], [x - 30 + q * 26, y + 22]], 7, '#4f8fe6', { ow: 3 }); tube(g, [[x - 30 + q * 26, y - 22], [x - 40 + q * 26, y + 22]], 7, '#4f8fe6', { ow: 3 }); } txt(g, '3 copii', x, y + 50, 15, '#cfe0ff'); }
      if (b.i === 0) { ring(g, 720, 400, 120, 90, e01(b)); }
    },
  };
}

/* =================================================== MICROCEFALIA · tabelul cauzelor (grupa → curba de creștere) */
// Ce trebuie să se vadă: curba perimetrului cranian crește în timp (stânga → dreapta); linia verticală = nașterea.
// Pe rândul k, cauza se aplică: curba se aplatizează ÎNAINTE de naștere (congenitale) și, separat, DUPĂ naștere (postnatale).
const GRP = ['cromozomiale / genetice', 'traume disruptive', 'infecții', 'teratogeni / toxine', 'carențe'];
export function microCauses() {
  const X0 = 120, X1 = 900, Y0 = 640, YT = 180; const XB = 560;
  const curveY = (x, stop) => { const u = (x - X0) / (X1 - X0); const full = Y0 - (Y0 - YT) * Math.sqrt(u); if (stop === null || x <= stop) return full; const us = (stop - X0) / (X1 - X0); const ys = Y0 - (Y0 - YT) * Math.sqrt(us); return ys - (x - stop) * 0.03; };
  return {
    home: HOME,
    anchors: [0, 1, 2, 3, 4].map((k) => [180 + k * 160, 735]),
    phase: (i) => GRP[i] || 'tot ce oprește creșterea creierului',
    draw(g, t, b) {
      bg(g);
      const k = b.i < 0 ? Math.floor((REDUCED ? 0 : t) / 3) % 5 : b.i;
      const u = b.i < 0 ? clamp(((REDUCED ? 3 : t % 3)) / 2.2) : e01(b, 0.8);
      tube(g, [[X0, Y0], [X1, Y0]], 5, '#6b5650', { ow: 3 }); tube(g, [[X0, Y0], [X0, 120]], 5, '#6b5650', { ow: 3 });
      txt(g, 'perimetrul cranian', 200, 100, 17, '#d8c4b8', { w: 700 }); txt(g, 'timp →', X1 - 20, Y0 + 30, 16, '#d8c4b8', { w: 700 });
      tube(g, [[XB, 120], [XB, Y0]], 3, C.hi, { ow: 0, dash: [8, 8], alpha: 0.7 }); txt(g, 'naștere', XB, 100, 16, C.hi);
      txt(g, 'congenitale', (X0 + XB) / 2, Y0 + 30, 16, '#ffd6c4'); txt(g, 'postnatale', (XB + X1) / 2, Y0 + 30, 16, '#cfe0ff');
      const path = (stop) => { const pts = []; for (let x = X0; x <= X1; x += 10) pts.push([x, curveY(x, stop)]); return pts; };
      tube(g, path(null), 6, '#8fd9a8', { raw: true, ow: 3, alpha: 0.6 }); txt(g, 'normal', X1 - 30, YT - 20, 15, '#bff0d2');
      const c1 = path(lerp(X1, 300, u)).filter((p) => p[0] <= lerp(X0, X1, Math.min(1, u * 1.3)));
      if (c1.length > 1) tube(g, c1, 7, '#ff8a7a', { raw: true, ow: 3 });
      const c2 = path(lerp(X1, 690, u)).filter((p) => p[0] >= XB - 2);
      if (u > 0.4 && c2.length > 1) tube(g, c2, 7, '#7fb0ff', { raw: true, ow: 3, alpha: clamp((u - 0.4) * 2) });
      // pictogramele grupelor
      GRP.forEach((n, j) => {
        const x = 180 + j * 160, y = 790; const act = j === k;
        pill(g, x, y, 150, 60, act ? C.hi : '#3a2a26', '', { ow: 4, glow: act ? 1 : 0 });
        txt(g, n, x, y + 58, 14, act ? C.hi : '#c9b3a6', { w: 700 });
        const ic = act ? OUT : '#ffe7d6';
        if (j === 0) { tube(g, [[x - 14, y - 16], [x + 14, y + 16]], 6, ic, { ow: 0 }); tube(g, [[x + 14, y - 16], [x - 14, y + 16]], 6, ic, { ow: 0 }); }
        if (j === 1) { txt(g, 'O₂ ↓', x, y, 20, ic, { stroke: false }); }
        if (j === 2) { dot(g, x, y, 11, act ? '#7fd36a' : '#5a8a50', { ow: 2 }); for (let q = 0; q < 6; q++) { const aa = q / 6 * 7; tube(g, [[x + Math.cos(aa) * 11, y + Math.sin(aa) * 11], [x + Math.cos(aa) * 18, y + Math.sin(aa) * 18]], 3, ic, { ow: 0 }); } }
        if (j === 3) { txt(g, '☠', x, y, 26, ic, { stroke: false }); }
        if (j === 4) { ell(g, x, y + 4, 26, 12, 'rgba(0,0,0,0)', { ow: 3, sc: ic }); txt(g, '∅', x, y - 4, 20, ic, { stroke: false }); }
      });
    },
  };
}
