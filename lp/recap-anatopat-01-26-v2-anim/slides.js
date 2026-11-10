// Recapitulare OSPE Anatomie patologică · preparatele 1–26 · varianta nouă (v2).
// Cele 74 de slide-uri vechi vin NESCHIMBATE din slides_base.js (aceleași poze, același text). Aici se ADAUGĂ:
//  (10) scheletul stației (un slide, după planul stației);
//  (9)  „de ce arată așa”: mecanismul leziunii, animat, înaintea stației (m1s/m2s/m3s.js; ce nu e în LP stă în chenarul albastru);
//  (7)  microscopul: poza reală a lamei într-un vizor, obiectiv mic → obiectiv mare pe aceeași poză (înaintea stației, la cele 11 lame);
//  (8)  DD față în față: preparatul și partenerul oficial, ambele poze reale (după stație, la toate cele 26).
// Textul slide-urilor noi de microscop și de DD e luat din fișele vechi (preps.js); cercurile = adnotările vechi.
import { SLIDES as S0 } from './slides_base.js';
import { GLOS as G0, TERMS as T0 } from './glos.js';
import { PREPS } from './preps.js';
import { MECH1 } from './m1s.js';
import { MECH2 } from './m2s.js';
import { MECH3, GLOS3 } from './m3s.js';
const MECH = { ...MECH1, ...MECH2, ...MECH3 }; // { nrPreparat: [slide, …] }

const firstOld = (n) => 7 + 2 * (n - 1);
const redCap = (arr, max) => { let c = 0; return arr.map((s) => s.replace(/!!(.+?)!!/g, (m, x) => (++c <= max ? m : `**${x}**`))); };

/* ---------- (10) scheletul stației ---------- */
const SKEL = {
  scene: 'skel', anim: false, spec: 'Static: cei 7 pași ai fișei oficiale, de sus în jos, pe o coloană (1 organ, 2 leziune, 3 definiție = chenarul „obligatoriu · 3 p”; 4 descriere, 5 cauze, 6 complicații, 7 DD); pasul punctului activ se aprinde. Jos: „minim 5 p”.',
  kick: 'Recapitulare OSPE · Scheletul stației', title: 'Ordinea fișei: aceeași la toate cele 26 de preparate',
  hud: ['spui în ordinea asta'],
  points: [
    { h: 'Organ → leziune → definiție', d: ['!!3 puncte obligatorii!!: le spui primele, câte o frază'] },
    { h: 'Descrierea', d: ['pe buline: !!o bulină = 1 punct!!', 'lama: **ob. mic → ob. mare** · piesa: **dimensiune, formă, culoare, consistență, suprafață, pe secțiune**'] },
    { h: 'Cauzele', d: ['buline scurte, câte **1 punct** fiecare'] },
    { h: 'Complicațiile', d: ['tot pe buline, câte **1 punct** fiecare'] },
    { h: 'Diagnosticul diferențial', d: ['un preparat **de pe listă** (lamă cu lamă, piesă cu piesă)', '!!1 asemănare + 3 diferențe!!, apoi **2 alternative**'] },
  ],
  why: 'Minim **5 puncte**: cele 3 obligatorii + 2 buline. Contează doar ce spui **cu voce tare**.',
  beatDur: 5,
};

/* ---------- (7) microscopul: ce bulină din descriere ține de fiecare cerc ---------- */
// P = bulinele de la „obiectiv mic” (ansamblul), M[k] = bulinele structurii k (în ordinea adnotărilor vechi). [punct, bulină] în fișa 1/2; un text = frază scurtă scoasă din aceeași fișă.
const SC = {
  1: { P: [[2, 0], [2, 1]], M: [[[2, 2]], [[2, 3]]] },
  2: { P: ['pe aceeași lamă cauți și **zona de infarct** (a doua leziune): alveole inundate hemoragic, septuri fără nuclei'], M: [[[2, 1], [2, 2]], [[2, 0]], ['**vase congestionate** în septuri']] },
  3: { P: [[2, 1]], M: [[[2, 0]], [[2, 2]], ['**vas congestionat** (congestie)']] },
  4: { P: [], M: [[[2, 0], [2, 2], [2, 4]], [[2, 1]], ['**fibrele normale** ale miocardului vecin; printre ele pătrunde țesutul de granulație']] },
  5: { P: [[2, 1]], M: [['straturi **roșii** (bogate în hematii; roșu închis macroscopic)'], ['straturi **slab eozinofile** (trombocite + fibrină; palide macroscopic)', 'alternanța lor = !!liniile lui Zahn!!'], [[2, 0]]] },
  13: { P: [], M: [[[2, 0], [2, 1]], [[2, 2]], [[2, 3]]] },
  14: { P: [[2, 5]], M: [[[2, 1], [2, 2], [2, 3]], [[2, 0]]] },
  15: { P: [], M: [[[2, 3], [2, 4]], [[2, 1], [2, 2]], [[2, 0]]] },
  16: { P: [[2, 1]], M: [[[2, 2], [2, 3]], [[2, 4]], ['**granulocite** (inflamația purulentă = exsudare dominată de leucodiapedeză)']] },
  17: { P: [[2, 1]], M: [[[2, 2]], [[2, 3], [2, 4]], [[2, 5]]] },
  18: { P: [[2, 5], [2, 4]], M: [[[2, 1]], [[2, 2], [2, 3]], [[2, 0]]] },
};
const cut = (s) => s.replace(/^ob\. mic: /, '').replace(/\.$/, '');
function scopeSlide(n) {
  const [a] = PREPS[n]; const m = a.sceneOpts.main; const base = a.kick.replace(/ · 1\/2$/, ''); const map = SC[n];
  const get = (x) => (typeof x === 'string' ? x : cut(a.points[x[0]].d[x[1]]));
  let pts = [{ h: 'Obiectiv mic · ansamblul lamei', d: [cut(a.points[0].d[0]), ...map.P.map(get)] }, ...m.marks.map((mm, k) => ({ h: 'Obiectiv mare · ' + mm.lab, d: map.M[k].map(get) }))];
  // roșu: cel mult 4 pe slide (restul rămân bold)
  let c = 0; pts = pts.map((p) => ({ h: p.h, d: p.d.map((s) => s.replace(/!!(.+?)!!/g, (mt, x) => (++c <= 4 ? mt : `**${x}**`))) }));
  return {
    scene: 'scope', anim: true, beatDur: 5,
    spec: `Poza reală a lamei ${n} (aceeași ca la stație, neatinsă) într-un vizor rotund. P1: obiectiv mic = toată lama în vizor, cu cercurile adnotărilor vechi abia vizibile. Apoi, câte un punct pe structură: vizorul mărește (zoom lin, o singură dată) pe aceeași poză până la cercul structurii, care se aprinde; revolverul din dreapta trece de pe obiectivul scurt (mic) pe cel lung (mare), iar harta din colț arată unde ești pe lamă. Structurile, în ordine: ${m.marks.map((x) => x.lab).join('; ')}.`,
    kick: base + ' · la microscop', title: 'Obiectiv mic, apoi obiectiv mare: ce cauți pe lama ' + n,
    hud: [`lama ${n} din 26 · HE`],
    sceneOpts: { img: m.img, W: m.W, H: m.H, marks: m.marks },
    points: pts,
  };
}

/* ---------- (8) DD față în față ---------- */
function ddSlide(n) {
  const [a, b] = PREPS[n]; const o = a.sceneOpts; const base = a.kick.replace(/ · 1\/2$/, ''); const lama = a.kick.startsWith('Lama');
  const dd = b.points[b.points.length - 1].d; const pm = o.dd.cap.match(/(lama|piesa) (\d+)/); const pn = +pm[2]; const pmain = PREPS[pn][0].sceneOpts.main;
  if (dd.length !== 6 || !dd[1].startsWith('asemănarea: ') || !dd[5].startsWith('alternative: ') || !/^① /.test(dd[2]) || !/^② /.test(dd[3]) || !/^③ /.test(dd[4])) throw new Error('DD format ' + n);
  const samePhoto = pmain.img === o.dd.img;
  const kind = lama ? 'lama' : 'piesa';
  // așezarea: una sub alta sau una lângă alta, după cum ies pozele mai mari pe ecran
  const shown = (w, h, bw, bh) => { const r = Math.min(bw / w, bh / h); return w * r * h * r; };
  const wide = shown(o.main.W, o.main.H, 708, 284) + shown(pmain.W, pmain.H, 708, 284) >= shown(o.main.W, o.main.H, 346, 600) + shown(pmain.W, pmain.H, 346, 600);
  return {
    scene: 'ddFace', anim: false,
    spec: `Static: ${wide ? 'sus' : 'în stânga'} poza reală a preparatului ${n}, ${wide ? 'jos' : 'în dreapta'} poza reală a partenerului oficial de DD (${pm[1]} ${pn}), ambele cu cercurile din fișele lor. La asemănare ramele se aprind verde („=”); la fiecare diferență, galben („≠ ①②③”); la alternative rămân stinse.`,
    kick: base + ' · DD față în față', title: `${lama ? 'Lama' : 'Piesa'} ${n} lângă ${pm[1]} ${pn}: o asemănare, trei diferențe`,
    hud: [`${kind} ${n} vs. ${pm[1]} ${pn}`],
    sceneOpts: { wide, a: { img: o.main.img, W: o.main.W, H: o.main.H, marks: o.main.marks, cap: `${kind} ${n} · a ta` }, b: { img: o.dd.img, W: samePhoto ? pmain.W : 0, H: samePhoto ? pmain.H : 0, marks: samePhoto ? pmain.marks : [], cap: `${pm[1]} ${pn} · partenerul de DD` } },
    points: [
      { h: 'Partenerul și asemănarea', d: [dd[0].replace(/\*\*(.+?)\*\*/, '!!$1!!'), dd[1].replace(/^asemănarea: /, '')] },
      { h: 'Diferența ①', d: [dd[2].replace(/^① /, '')] },
      { h: 'Diferența ②', d: [dd[3].replace(/^② /, '')] },
      { h: 'Diferența ③', d: [dd[4].replace(/^③ /, '')] },
      { h: 'Două alternative', d: dd[5].replace(/^alternative: /, '').split(' · ') },
    ],
    beatDur: 5,
  };
}

const INS = { 3: [SKEL] };
for (let n = 1; n <= 26; n++) {
  const f = firstOld(n); const lama = PREPS[n][0].kick.startsWith('Lama');
  INS[f - 1] = [...(INS[f - 1] || []), ...(MECH[n] || []), ...(lama ? [scopeSlide(n)] : [])];
  INS[f + 1] = [ddSlide(n)];
}
const out = [];
S0.forEach((s, i) => { out.push(s); (INS[i + 1] || []).forEach((x) => out.push(x)); });
// coperta: spune ce e nou și în ce ordine vin slide-urile unui preparat (restul textului rămâne cel vechi)
out[0] = { ...out[0], xtra: 'Varianta nouă (în probă): la fiecare preparat, înaintea stației vin „de ce arată așa” (mecanismul, unde ajută) și, la lame, „la microscop” (aceeași poză, obiectiv mic → mare); după stație vine „DD față în față”. Pozele și fișele sunt cele din recapitularea veche.' };
export const SLIDES = out;
export const GLOS = [...G0, ...GLOS3].filter((x, k, arr) => arr.findIndex((y) => y[0] === x[0]) === k);
export const TERMS = T0;
