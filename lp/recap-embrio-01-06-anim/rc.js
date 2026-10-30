// Recapitularea Embrio LP 1–6: scena compusă (refolosește desenele din deck-urile LP), coperta (6 miniaturi vii) și axa comună S1–S10.
import { OUT, clamp, lerp, ease, glowRing, REDUCED } from './kit2d.js';
import { bg, txt, pill, panel, HOME, cam } from './l6/ek.js';

const val = (a) => (typeof a === 'function' ? a() : a);
const OFF = [-99999, -99999];

/* =========================================================== SCENA COMPUSĂ
   parts[k] = { s: 'l4.dsv', i: beat-ul din scena sursă (implicit k), a: ancora din scena sursă (implicit i; null = fără badge) }
   Pe punctul k se desenează (la scară 1:1, cu etichetele și camera ei) scena sursă a punctului k, pe beat-ul i.
   Badge-ul k stă pe ancora a a scenei sursă și se vede doar cât timp e afișată scena aceea. */
export function makeSw(POOL, parts, o = {}) {
  const built = {};
  const get = (n) => {
    if (!built[n]) { if (!POOL[n]) throw new Error('scena lipsă: ' + n); built[n] = POOL[n]({ spec: { sceneOpts: (o.opts && o.opts[n]) || {} } }); built[n].W = built[n].W || 1000; built[n].H = built[n].H || 934; }
    return built[n];
  };
  const P = parts.map((p, k) => { const i = p.i ?? k; return { ...p, i, a: p.a === undefined ? i : p.a }; });
  const part = (bi) => (bi < 0 ? (o.intro ? { s: o.intro.s, i: o.intro.i ?? -1 } : { s: P[0].s, i: -1 }) : P[Math.min(bi, P.length - 1)]);
  let curS = part(-1).s;
  const sub0 = get(part(-1).s);
  const anchors = P.map((p) => (p.a === null ? null : () => {
    if (curS !== p.s) return OFF;
    const sc = get(p.s); const a = sc.anchors && sc.anchors[p.a];
    return a ? val(a) : OFF;
  }));
  const labels = [];
  const names = [...new Set([part(-1).s, ...P.map((p) => p.s)])];
  names.forEach((n) => {
    const sc = get(n);
    (sc.labels || []).forEach((l) => {
      const beats = [];
      const ok = (i) => !l.beats || l.beats.includes(i);
      if (part(-1).s === n && ok(part(-1).i)) beats.push(-1);
      P.forEach((p, k) => { if (p.s === n && ok(p.i)) beats.push(k); });
      if (beats.length) labels.push({ ...l, beats });
    });
  });
  const camOf = (p) => { const sc = get(p.s); return (p.i >= 0 && sc.cams && sc.cams[p.i]) || sc.home || HOME; };
  return {
    home: camOf(part(-1)), cams: P.map(camOf), anchors, labels,
    camSpeed: sub0.camSpeed, beatDur: sub0.beatDur,
    phase: (i) => { const p = part(i); if (i >= 0 && P[i] && P[i].ph) return P[i].ph; if (i < 0 && o.ph0) return o.ph0; const sc = get(p.s); return sc.phase ? sc.phase(p.i) : ''; },
    inset: (bi) => { const p = part(bi); const sc = get(p.s); return sc.inset ? sc.inset(p.i) : null; },
    draw(g, t, b) {
      const p = part(b.i); curS = p.s;
      get(p.s).draw(g, t, { i: p.i, bt: b.bt, bd: b.bd, k: b.k });
    },
  };
}

/* =========================================================== COPERTA: 6 miniaturi vii (câte o scenă reprezentativă din fiecare LP)
   Ce trebuie să se vadă: o grilă 2 × 3 cu LP 1–6; pe punctul k se aprinde (inel + zoom) miniatura LP-ului k. */
export const COVER_TILES = [
  ['LP 1 · Reproducerea', 'l1.nondis'], ['LP 2 · Arcurile faringiene', 'l2.apparatus'], ['LP 3 · Digestiv + respirator', 'l3.gutMap'],
  ['LP 4 · Cardiovascular', 'l4.segments'], ['LP 5 · Urogenital', 'l5.kidney3'], ['LP 6 · SNC, simțuri, piele', 'l6.closure'],
];
export function makeCover(POOL) {
  return function cover({ spec } = {}) {
    const map = (spec && spec.sceneOpts && spec.sceneOpts.map) || null; // tabel: rândul → LP-ul (0–5)
    const built = {};
    const get = (n) => (built[n] = built[n] || POOL[n]({ spec: {} }));
    const TW = 430, TH = 250, X = [278, 722], Y = [205, 485, 765];
    const pos = COVER_TILES.map((_, k) => [X[k % 2], Y[Math.floor(k / 2)]]);
    const kk = COVER_TILES.map(() => 0);
    const which = (i) => (i < 0 ? -1 : map ? map[i] : i);
    return {
      home: HOME,
      cams: (map || COVER_TILES.map((_, k) => k)).map((k) => (k >= 0 ? cam(pos[k][0] * 0.5 + 250, pos[k][1] * 0.5 + 233, 1.32) : HOME)),
      anchors: map ? [] : pos.map(([x, y]) => [x - TW / 2 + 22, y - TH / 2 + 22]),
      phase: (i) => { const w = which(i); return w >= 0 ? COVER_TILES[w][0] : 'Recapitulare · LP 1–6'; },
      draw(g, t, b) {
        bg(g);
        const w = which(b.i);
        pos.forEach(([x, y], k) => {
          kk[k] = lerp(kk[k], w === k ? 1 : 0, 0.1);
          const act = w < 0 || w === k;
          g.save(); g.beginPath(); g.roundRect(x - TW / 2, y - TH / 2, TW, TH, 22); g.clip();
          g.translate(x - TW / 2, y - TH / 2); g.scale(TW / 1000, TH / 934 * 1.0);
          // miniatura: scena sursă în bucla ei de intro (fără overlay)
          const sc = get(COVER_TILES[k][1]);
          try { sc.draw(g, REDUCED ? 3 : t + k * 1.7, { i: -1, bt: t, bd: 7, k: 0 }); } catch (e) { /* miniatura e doar decor */ }
          g.restore();
          g.save(); g.globalAlpha = act ? 0 : 0.55; g.fillStyle = '#140c0a'; g.beginPath(); g.roundRect(x - TW / 2, y - TH / 2, TW, TH, 22); g.fill(); g.restore();
          g.save(); g.strokeStyle = w === k ? '#ffe36e' : 'rgba(255,220,200,.35)'; g.lineWidth = w === k ? 6 : 3; g.beginPath(); g.roundRect(x - TW / 2, y - TH / 2, TW, TH, 22); g.stroke(); g.restore();
          pill(g, x, y + TH / 2 - 26, 330, 40, w === k ? '#ffe36e' : '#f3d9c6', COVER_TILES[k][0], { size: 19, ow: 4 });
        });
      },
    };
  };
}

/* =========================================================== AXA COMUNĂ S1–S10 (toate LP-urile)
   Ce trebuie să se vadă: săptămânile S1–S10 pe orizontală, câte un rând pe LP; pe punctul k, rândul LP k+1 se aprinde și camera se apropie. */
const AX0 = 175, AX1 = 975, WK = (w) => AX0 + ((w - 1) / 10) * (AX1 - AX0); // începutul săptămânii w
const ROWY = (r) => 245 + r * 112;
export const AXIS_EV = [
  // [LP, săptămâna (poate fi fracționară), text, culoare, banda 0/1]
  [0, 1.5, 'morula →\nblastocist', '#f6b49c', 0], [0, 2.5, 'implantare ·\ndisc bilaminar', '#f6b49c', 1], [0, 3.5, 'gastrulație ·\ndisc trilaminar', '#f6b49c', 0], [0, 4.5, 'plicaturare ·\ntub neural', '#f6b49c', 1], [0, 5.6, 'CGP în\ncrestele genitale', '#f6b49c', 0], [0, 8.5, 'S8: sf. perioadei\nembrionare', '#f6b49c', 1], [0, 10.4, 'fetal →', '#f6b49c', 0],
  [1, 4.5, 'apar arcurile', '#8fd3ff', 0], [1, 5.5, 'aproape\ngata', '#8fd3ff', 1], [1, 6.9, 'migrare ·\ndiferențiere', '#8fd3ff', 0], [1, 8.5, 'totul la locul lui ·\ntimusul coboară', '#8fd3ff', 1],
  [2, 3.5, 'tubul +\ndiverticul hepatic', '#f4c34f', 0], [2, 4.5, '3 segmente ·\nplămân · gura', '#f4c34f', 1], [2, 5.5, 'bronhii lobare ·\nduoden astupat', '#f4c34f', 0], [2, 6.5, 'începe\nhernia', '#f4c34f', 1], [2, 7.5, 'cloaca:\n2 orificii', '#f4c34f', 0], [2, 8.5, 'duodenul se\nrecanalizează', '#f4c34f', 1], [2, 10.4, 'hernia se\nretrage', '#f4c34f', 0],
  [3, 3.4, 'aria cardiogenă ·\nbate (z. 21–23)', '#ff8f87', 0], [3, 4.5, 'cord sigmoid ·\nîncepe septarea', '#ff8f87', 1], [3, 5.5, 'septum primum ·\n3 seturi de vene', '#ff8f87', 0], [3, 7.0, 'septum secundum', '#ff8f87', 1], [3, 7.9, 'foramenul IV\nse închide', '#ff8f87', 0],
  [4, 4.5, 'pronefros\n(dispare S5)', '#f6b49c', 0], [4, 5.5, 'metanefros ·\nCGP ajung', '#f6b49c', 1], [4, 6.5, 'germinalele\nintră în creste', '#f6b49c', 0], [4, 7.4, 'ovar: cordoane\ncorticale', '#f6b49c', 1], [4, 8.5, 'Leydig →\ntestosteron', '#f6b49c', 0], [4, 10.4, 'S12: prostata →', '#f6b49c', 1],
  [5, 3.5, 'Z18: placa ·\nDTN S3–S4', '#c6a8ff', 0], [5, 4.5, 'neuropori Z29/30 ·\n3 vezicule', '#c6a8ff', 1], [5, 5.5, '5 vezicule', '#c6a8ff', 0], [5, 7.5, 'fisura coroidă\nse închide', '#c6a8ff', 1], [5, 10.4, 'S10 unghii ·\nS13 măduva', '#c6a8ff', 0],
];
export const AXIS_ROWS = ['LP 1', 'LP 2', 'LP 3', 'LP 4', 'LP 5', 'LP 6'];
const ROWN = ['reproducere', 'arcuri', 'digestiv +\nrespirator', 'cardio-\nvascular', 'urogenital', 'SNC · simțuri'];
export function axis({ spec } = {}) {
  const map = (spec && spec.sceneOpts && spec.sceneOpts.map) || null; // tabel: rândul → LP-ul
  const which = (i) => (i < 0 ? -1 : map ? map[i] : i);
  const kk = AXIS_ROWS.map(() => 0);
  return {
    home: HOME,
    cams: (map || AXIS_ROWS.map((_, k) => k)).map((r) => (r >= 0 ? cam(545, clamp(ROWY(r), 400, 560), 1.22) : HOME)),
    anchors: map ? [] : AXIS_ROWS.map((_, r) => [36, ROWY(r) - 30]),
    phase: (i) => { const r = which(i); return r >= 0 ? `${AXIS_ROWS[r]} pe axa S1–S10` : 'S1 → S10, toate LP-urile'; },
    draw(g, t, b) {
      bg(g);
      const r0 = which(b.i);
      // perioadele critice
      const band = (w0, w1, col, s) => { g.save(); g.fillStyle = col; g.beginPath(); g.roundRect(WK(w0) + 2, 92, WK(w1) - WK(w0) - 4, 44, 14); g.fill(); g.strokeStyle = OUT; g.lineWidth = 4; g.stroke(); g.restore(); txt(g, s, (WK(w0) + WK(w1)) / 2, 114, 16, OUT, { stroke: false }); };
      band(1, 3, '#9fd8b0', 'tot sau nimic'); band(3, 9, '#ff9f8f', 'S3–S8: organogeneza → malformații MAJORE'); band(9, 11, '#ffd77a', 'fetal: minore');
      txt(g, 'săptămâni de la fecundație (SA = +2)', 560, 56, 18, '#d8c4b8', { w: 700 });
      for (let w = 1; w <= 10; w++) {
        g.save(); g.strokeStyle = 'rgba(255,230,210,.13)'; g.lineWidth = 2; g.beginPath(); g.moveTo(WK(w), 150); g.lineTo(WK(w), 905); g.stroke(); g.restore();
        txt(g, 'S' + w, WK(w) + (WK(w + 1) - WK(w)) / 2, 170, 19, '#ffe0c8');
      }
      AXIS_ROWS.forEach((name, r) => {
        kk[r] = lerp(kk[r], r0 === r ? 1 : 0, 0.1);
        const y = ROWY(r); const act = r0 < 0 || r0 === r;
        g.save(); g.fillStyle = r0 === r ? 'rgba(255,227,110,.10)' : 'rgba(255,240,228,.04)'; g.beginPath(); g.roundRect(8, y - 52, 984, 104, 18); g.fill(); g.restore();
        txt(g, name, 92, y - 16, 22, act ? '#ffe36e' : '#a8968c');
        txt(g, ROWN[r], 92, y + 20, 14, act ? '#f3e2d6' : '#8a7a72', { w: 700 });
        AXIS_EV.filter((e) => e[0] === r).forEach(([, w, s, col, lane]) => {
          const x = WK(Math.floor(w)) + (w % 1) * (WK(2) - WK(1)); const yy = y + (lane ? 22 : -22);
          const lines = s.split('\n'); const wd = Math.max(...lines.map((l) => l.length)) * 7.4 + 18;
          g.save(); g.globalAlpha = act ? 1 : 0.35;
          const p = new Path2D(); p.roundRect(x - wd / 2, yy - (lines.length * 15 + 8) / 2, wd, lines.length * 15 + 8, 10);
          g.fillStyle = col; g.fill(p); g.strokeStyle = OUT; g.lineWidth = 3; g.stroke(p); g.restore();
          txt(g, s, x, yy, 13, OUT, { stroke: false, alpha: act ? 1 : 0.35 });
        });
      });
    },
  };
}
