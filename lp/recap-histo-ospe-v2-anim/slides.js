// Recapitulare OSPE Histologie LP 2–7 · varianta nouă (v2, 10.11.2026).
// Cele 25 de slide-uri vechi vin NESCHIMBATE din slides_base.js (text, poze, scene). Aici se ADAUGĂ doar:
//  1) „scheletul stației” (ordinea de punctaj), după slide-ul 1;
//  2) pentru fiecare dintre cele 19 lame: „la microscop” ÎNAINTE de fișă și „DD față în față” DUPĂ fișă.
// Slide-urile noi nu aduc fapte noi: textul lor e luat automat din fișa aceleiași lame (diagnosticul, noțiunile de 1 p, rândurile de DD),
// iar pozele și legendele sunt cele din slide-ul vechi (sceneOpts.main / seq / dd). Pozițiile decupajelor pe lamă: rects.js.
import { GLOS as G0, TERMS as T0, SLIDES as S0 } from './slides_base.js';
import { RECTS } from './rects.js';

const strip = (s) => s.replace(/!{2}|\*{2}/g, '');
const noPts = (h) => h.replace(/ · [\d,]+ p( · obligatoriu)?$/, '');
const short = (t) => t.split(':')[0].trim();
// noțiunile de 1 p dintr-un punct al fișei (fără marcaje)
const onePt = (p) => p.d.flatMap((x) => x.split(' · ')).filter((x) => /\(1 p\)\s*$/.test(x)).map((x) => strip(x).replace(/\s*\(1 p\)\s*$/, ''));

function micSlide(s) {
  const o = s.sceneOpts; const n = s.points.length; const m = RECTS[o.seq[1].img] || Object.values(RECTS).find((r) => r.img === o.main.img);
  const steps = [{ mode: 'full', img: o.main.img, cap: o.main.cap }];
  const points = [{ h: 'Ansamblul · întâi spui diagnosticul', d: [s.points[0].d[0]] }];
  for (let i = 1; i < n - 1; i++) {
    const e = o.seq[i]; const r = RECTS[e.img];
    const mode = e.img === o.main.img ? 'full' : r && r.img === o.main.img ? 'zoom' : 'swap';
    steps.push({ mode, img: e.img, cap: e.cap, rect: r && r.rect });
    const one = onePt(s.points[i]);
    const d = [`pe poză: **${e.cap}**` + (mode === 'swap' ? ' (decupaj la obiectiv mare)' : '')];
    if (one.length) d.push(`noțiunile de 1 p ale punctului: ${one.join(' · ')}`);
    points.push({ h: noPts(s.points[i].h), d });
  }
  return {
    scene: 'mic', sceneOpts: { main: o.main, size: m.size, steps }, anim: true, beatDur: 4,
    spec: 'Vizor rotund cu poza reală a lamei (același fișier ca în fișă, nemodificat). P1: vedere de ansamblu (poza umple vizorul; toată poza e pe harta mică din colț, unde cercul galben arată ce se vede în vizor). Pe fiecare punct următor camera se apropie, pe aceeași poză, de locul decupajului existent al punctului (poziția din rects.js), se oprește acolo și apare decupajul cu elipsa lui din recapitularea veche; Dacă decupajul vine din altă poză (obiectiv mare), poza se schimbă prin stingere/aprindere, fără zoom. Se joacă o dată și rămâne pe cadrul final.',
    kick: s.kick.replace(/(Lama \d+ din 19).*/, '$1 · la microscop'), title: `${short(s.title)} · la microscop`,
    hud: [s.hud[0], steps.some((x) => x.mode === 'swap') ? 'poza lamei + decupaj la obiectiv mare' : 'aceeași poză, doar mărită'], points,
    ...(o.main.img === 'ret' ? { warn: S0[0].warn } : {}),
  };
}

function ddSlide(s) {
  const o = s.sceneOpts; const dd = s.points[s.points.length - 1];
  const partner = dd.d[0]; const feats = dd.d[1].replace(/^la partener \(câte 0,5 p\): /, '').split(' · '); const same = dd.d[2].replace(/^asemănarea \(nepunctată\): /, '');
  if (feats.length !== 3 || !/^la partener/.test(dd.d[1]) || !/^asemănarea/.test(dd.d[2])) throw new Error('DD neașteptat: ' + s.title);
  const heads = ['Partenerul · 0,5 p', 'Asemănarea (nepunctată)', 'La partener · 1 · 0,5 p', 'La partener · 2 · 0,5 p', 'La partener · 3 · 0,5 p'];
  const items = [strip(partner).replace(/\s*\(0,5 p\)$/, ''), 'Asemănarea: ' + same, ...feats.map((f, k) => `La partener (${k + 1}): ${f}`)];
  return {
    scene: 'ddface', sceneOpts: { main: o.main, dd: o.dd, items, heads }, anim: false, beatDur: 4,
    spec: 'Static: sus poza lamei, jos poza partenerului de DD (aceleași fișiere și legende ca în fișă, nemodificate, fără cercuri). Chenarul galben pe partener la P1 și P3–P5, verde pe ambele la asemănare; jos apare textul pasului.',
    kick: s.kick.replace(/(Lama \d+ din 19).*/, '$1 · DD față în față'), title: `${short(s.title)} față în față cu partenerul de DD`,
    hud: [s.hud[0], 'DD · 2 p'],
    points: [
      { h: heads[0], d: [partner] },
      { h: heads[1], d: [same] },
      ...feats.map((f, k) => ({ h: `La partener · caracteristica ${k + 1} · 0,5 p`, d: [`**${f}**`] })),
    ],
    ...(o.dd.img === 'ret' || o.main.img === 'ret' ? { warn: S0[0].warn } : {}),
  };
}

const SCHELET = {
  scene: 'schelet', anim: false, beatDur: 4,
  spec: 'Static: cinci trepte în ordinea de punctaj a fișei (citire, diagnostic, diagnostic pozitiv, DD, bonus), cu punctajul fiecăreia; treapta punctului se aprinde; jos, bara 1 + 6 + 2 = 9 p și 1 p din oficiu.',
  kick: 'Recapitulare OSPE · Histologie · Scheletul stației', title: 'Scheletul stației: aceeași ordine la toate cele 19 lame',
  hud: ['7 min', '9 p + 1 din oficiu'],
  points: [
    { h: '1 min citești, 6 min vorbești', d: ['contează doar ce spui **cu voce tare**'] },
    { h: 'Diagnosticul · 1 p', d: ['!!țesut/organ + colorație + organul!!', 'obligatoriu și eliminatoriu: fără el, stația are **0 p**'] },
    { h: 'Diagnostic pozitiv · maxim 6 p', d: ['întâi **ob. mic**, apoi **ob. mare**', 'noțiuni scurte, de 1 p (cele decisive) sau 0,5 p'] },
    { h: 'Diagnostic diferențial · maxim 2 p', d: ['!!o singură lamă-partener, cu colorația și organul: 0,5 p!!', '3 caracteristici ale partenerului: câte 0,5 p'] },
    { h: 'Bonus · maxim 0,5 p', d: ['informații corecte în plus despre preparat: 0,25 p/noțiune', 'total: maxim 9 p + 1 p din oficiu'] },
  ],
  say: 'La fiecare lamă urmează trei slide-uri, în ordinea asta: la microscop (ce vezi) → fișa (ce spui, cu punctajul) → DD față în față.',
};

const out = [];
S0.forEach((s, i) => {
  const lama = s.scene === 'photo';
  if (lama) out.push(micSlide(s));
  out.push(s);
  if (lama) out.push(ddSlide(s));
  if (i === 0) out.push(SCHELET);
});
export const SLIDES = out;
export const GLOS = G0;
// „zona medulară” din glosar e a nodulului limfatic: o legăm doar de formularea de pe lama 19, ca să nu apară la medulara renală / suprarenală
export const TERMS = T0.map((x) => (x[0] === 'medular' ? ['zona medulară, cu', x[1], x[2]] : x));
