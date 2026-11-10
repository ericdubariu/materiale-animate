// Recapitulare OSPE Histologie LP 2–7 · varianta nouă (v2, 10.11.2026; refăcută la cererea lui Eric: fără slide-urile identice cu cea veche).
// Deck-ul are DOAR slide-uri noi: scheletul stației + pentru fiecare dintre cele 19 lame:
//  1) „la microscop” = fișa completă a lamei (diagnosticul + toate noțiunile cu punctajul lor + bonusul + capcana), pe poza reală din vizor;
//  2) „DD față în față” = rândurile de DD ale fișei, pe rând, cu cele două poze reale.
// Textul vine NESCHIMBAT din fișele recapitulării vechi (slides_base.js = copia slides.js din recap-histo-ospe-anim), la fel pozele și legendele
// (sceneOpts.main / seq / dd). Pozițiile decupajelor pe lamă: rects.js. Capcanele finale și tabelele rămân în recapitularea veche.
import { GLOS as G0, TERMS as T0, SLIDES as S0 } from './slides_base.js';
import { RECTS } from './rects.js';

// Pozele reale ale lamelor de examen (din notițele „Histology LP”, 10.11.2026): decupate pe câmpul microscopului, în ordinea mărire mică → mare.
// La cererea lui Eric (10.11, 14:10): se arată DOAR pozele lamelor de examen, fără cele de la LP. Excepție: lama 1 (mezenter, argentic) nu are
// poză de examen în notițe, deci rămâne cu poza de la LP; la adipos e poza de adipocite din notițe.
const EXN = { cub: 3, pri: 3, ps: 3, es: 3, uro: 3, tub: 2, seb: 3, sub: 3, tir: 2, sr: 2, pan: 3, gr: 1, col: 3, ret: 2, lax: 3, adi: 1, ten: 1, rt: 1 };
const EXREP = { cub: 1, pri: 2, ps: 1, es: 1, uro: 1, tub: 1, seb: 2, sub: 2, tir: 0, sr: 1, pan: 2, gr: 0, col: 2, ret: 1, lax: 2, adi: 0, ten: 0, rt: 0 }; // poza reprezentativă, pentru DD
const exList = (k) => Array.from({ length: EXN[k] || 0 }, (_, j) => `ex_${k}_${j}`);
const organOf = (s) => s.kick.split(' · ').slice(2).join(' · ');
const exSide = (k, s, lp) => (EXN[k] ? { img: `ex_${k}_${EXREP[k]}`, cap: k === 'adi' ? 'Examen: adipocite · HE' : `Examen: ${organOf(s)}` } : { img: lp.img, cap: lp.cap.replace(/^(Pe lamă|DD): /, 'Poza de la LP: ') });
const BYKEY = {};
const strip = (s) => s.replace(/!{2}|\*{2}/g, '');
const short = (t) => t.split(':')[0].trim();

function micSlide(s) {
  const o = s.sceneOpts; const n = s.points.length; const m = RECTS[o.seq[1].img] || Object.values(RECTS).find((r) => r.img === o.main.img);
  const ex = exList(o.main.img);
  const steps = [{ mode: ex.length ? 'exam' : 'full', img: o.main.img, cap: o.main.cap }];
  const points = [s.points[0]]; // fișa, neschimbată: punctul i al fișei = pasul i din vizor
  for (let i = 1; i < n - 1; i++) {
    if (ex.length) { // doar pozele lamei de examen: punctele merg de la poza cu mărirea mică la cea cu mărirea mare
      const m = n - 2; const j = m === 1 ? ex.length - 1 : Math.round(((i - 1) * (ex.length - 1)) / (m - 1));
      steps.push({ mode: 'ex', img: ex[j], cap: ex.length === 1 ? 'Lama de examen · poză reală la microscop' : `Lama de examen · poza ${j + 1} din ${ex.length} (de la mărire mică la mare)` });
    } else {
      const e = o.seq[i]; const r = RECTS[e.img];
      const mode = e.img === o.main.img ? 'full' : r && r.img === o.main.img ? 'zoom' : 'swap';
      steps.push({ mode, img: e.img, cap: e.cap, rect: r && r.rect });
    }
    points.push(s.points[i]);
  }
  return {
    scene: 'mic', sceneOpts: { main: o.main, size: m.size, steps, exam: ex, examCap: o.main.img === 'adi' ? 'Examen: adipocite · HE (poză reală la microscop)' : `Lama de examen: ${organOf(s)} (${ex.length === 1 ? 'poză reală' : ex.length + ' poze reale, de la mărire mică la mare'})` }, anim: true, beatDur: 4,
    spec: ex.length ? 'Doar pozele reale ale lamei de examen (fără pozele de la LP, fără cercuri). P1 (diagnosticul): toate pozele lamei odată, în vizoare rotunde, de la mărirea mică la cea mare. Pe punctele următoare: una dintre poze, mare, în vizor (în ordine, de la mărirea mică spre cea mare), cu trecere prin stingere/aprindere; celelalte rămân mici în dreapta, cu cea curentă încercuită galben. Se joacă o dată și rămâne pe cadrul final.' : 'Lama 1 nu are poză de examen: vizor rotund cu poza de la LP; pe fiecare punct camera se apropie de decupajul existent al punctului și apare elipsa lui din recapitularea veche. Se joacă o dată și rămâne pe cadrul final.',
    kick: s.kick, title: s.title,
    hud: s.hud, points,
    ...(s.warn ? { warn: s.warn } : {}),
  };
}

function ddSlide(s) {
  const o = s.sceneOpts; const dd = s.points[s.points.length - 1];
  const partner = dd.d[0]; const feats = dd.d[1].replace(/^la partener \(câte 0,5 p\): /, '').split(' · '); const same = dd.d[2].replace(/^asemănarea \(nepunctată\): /, '');
  if (feats.length !== 3 || !/^la partener/.test(dd.d[1]) || !/^asemănarea/.test(dd.d[2])) throw new Error('DD neașteptat: ' + s.title);
  const heads = ['Partenerul · 0,5 p', 'Asemănarea (nepunctată)', 'La partener · 1 · 0,5 p', 'La partener · 2 · 0,5 p', 'La partener · 3 · 0,5 p'];
  const items = [strip(partner).replace(/\s*\(0,5 p\)$/, ''), 'Asemănarea: ' + same, ...feats.map((f, k) => `La partener (${k + 1}): ${f}`)];
  return {
    scene: 'ddface', sceneOpts: { main: exSide(o.main.img, s, o.main), dd: exSide(o.dd.img, BYKEY[o.dd.img], o.dd), items, heads, credit: 'Pozele: lamele de examen la microscop (unde nu există, poza de la LP).' }, anim: false, beatDur: 4,
    spec: 'Static: două vizoare alăturate, stânga lama, dreapta partenerul de DD, cu pozele reale ale lamelor de examen (fără cercuri; lama 1 are poza de la LP). Inelul galben pe partener la P1 și P3–P5, verde pe ambele la asemănare; jos apare textul pasului.',
    kick: s.kick.replace(/(Lama \d+ din 19).*/, '$1 · DD față în față'), title: `${short(s.title)} față în față cu partenerul de DD`,
    hud: [s.hud[0], 'DD · 2 p'],
    points: [
      { h: heads[0], d: [partner] },
      { h: heads[1], d: [same] },
      ...feats.map((f, k) => ({ h: `La partener · caracteristica ${k + 1} · 0,5 p`, d: [`**${f}**`] })),
    ],
    ...(o.dd.img === 'ret' ? { warn: S0[0].warn } : {}),
  };
}

const SCHELET = {
  deckName: S0[0].deckName, scene: 'schelet', anim: false, beatDur: 4,
  spec: 'Static: cinci trepte în ordinea de punctaj a fișei (citire, diagnostic, diagnostic pozitiv, DD, bonus), cu punctajul fiecăreia; treapta punctului se aprinde; jos, bara 1 + 6 + 2 = 9 p și 1 p din oficiu.',
  kick: 'Recapitulare OSPE · Histologie · Scheletul stației', title: 'Scheletul stației: aceeași ordine la toate cele 19 lame',
  hud: ['7 min', '9 p + 1 din oficiu'],
  points: [
    { h: '1 min citești, 6 min vorbești', d: ['contează doar ce spui **cu voce tare**'] },
    { h: 'Diagnosticul · 1 p', d: ['!!țesut/organ + colorație + organul!!, ex.: „fibrele de reticulină, impregnație argentică, splină”', 'obligatoriu și eliminatoriu: fără el, stația are **0 p**'] },
    { h: 'Diagnostic pozitiv · maxim 6 p', d: ['întâi **ob. mic**, apoi **ob. mare**', '7–10 noțiuni scurte, de 1 p (cele decisive) sau 0,5 p'] },
    { h: 'Diagnostic diferențial · maxim 2 p', d: ['!!o singură lamă-partener, cu colorația și organul: 0,5 p!!', '3 caracteristici ale partenerului: câte 0,5 p'] },
    { h: 'Bonus · maxim 0,5 p', d: ['informații corecte în plus despre preparat: 0,25 p/noțiune', 'total: maxim 9 p + 1 p din oficiu'] },
  ],
  say: S0[0].say, warn: S0[0].warn,
};

S0.forEach((s) => { if (s.scene === 'photo') BYKEY[s.sceneOpts.main.img] = s; });
const out = [SCHELET];
S0.forEach((s) => { if (s.scene === 'photo') out.push(micSlide(s), ddSlide(s)); });
export const SLIDES = out;
export const GLOS = G0;
// „zona medulară” din glosar e a nodulului limfatic: o legăm doar de formularea de pe lama 19, ca să nu apară la medulara renală / suprarenală
export const TERMS = T0.map((x) => (x[0] === 'medular' ? ['zona medulară, cu', x[1], x[2]] : x));
