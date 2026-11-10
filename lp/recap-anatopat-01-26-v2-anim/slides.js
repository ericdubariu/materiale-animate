// Recapitulare OSPE Anatomie patologică · preparatele 1–26 · varianta nouă (v2). Deck de sine stătător, FĂRĂ slide-urile recapitulării vechi:
//  scheletul stației, apoi la fiecare preparat: „de ce arată așa” (m1s/m2s/m3s.js, unde există) → 1/3 ce vezi (poza reală în vizor,
//  mărită pe cercurile vechi) → 2/3 cauze, complicații (cele două poze reale) → 3/3 DD față în față (cu poza partenerului oficial).
// Tot textul fișelor vine din preps.js (fișele recapitulării vechi), fiecare bulină o singură dată; pozele și cercurile sunt cele vechi.
import { GLOS as G0, TERMS as T0 } from './glos.js';
import { PREPS } from './preps.js';
import { MECH1 } from './m1s.js';
import { MECH2 } from './m2s.js';
import { MECH3, GLOS3 } from './m3s.js';
const MECH = { ...MECH1, ...MECH2, ...MECH3 }; // { nrPreparat: [slide, …] }

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
  2: { P: [], M: [[[2, 1], [2, 2]], [[2, 0]], ['**vase congestionate** în septuri']] },
  3: { P: [[2, 1]], M: [[[2, 0]], [[2, 2]], ['**vas congestionat** (congestie)']] },
  4: { P: [], M: [[[2, 0], [2, 2], [2, 4]], [[2, 1]], ['**fibrele normale** ale miocardului vecin; printre ele pătrunde țesutul de granulație']], skip: [[2, 3]] },
  5: { P: [[2, 1]], M: [['straturi **roșii** (bogate în hematii; roșu închis macroscopic)'], ['straturi **slab eozinofile** (trombocite + fibrină; palide macroscopic)', 'alternanța lor = !!liniile lui Zahn!!'], [[2, 0]]], skip: [[2, 2], [2, 3]] },
  13: { P: [], M: [[[2, 0], [2, 1]], [[2, 2]], [[2, 3]]] },
  14: { P: [[2, 5]], M: [[[2, 1], [2, 2], [2, 3]], [[2, 0]]] },
  15: { P: [], M: [[[2, 3], [2, 4]], [[2, 1], [2, 2]], [[2, 0]]] },
  16: { P: [[2, 1]], M: [[[2, 2], [2, 3]], [[2, 4]], ['**granulocite** (inflamația purulentă = exsudare dominată de leucodiapedeză)']] },
  17: { P: [[2, 1]], M: [[[2, 2]], [[2, 3], [2, 4]], [[2, 5]]] },
  18: { P: [[2, 5], [2, 4]], M: [[[2, 1]], [[2, 2], [2, 3]], [[2, 0]]] },
};
const cut = (s) => s.replace(/^ob\. mic: /, '');
const baseOf = (a) => a.kick.replace(/ · 1\/2$/, '');
// 1/3 · „ce vezi”: organ · leziune, definiție și TOATĂ descrierea din fișa veche, pe poza reală mărită (aceleași cercuri)
function seeSlide(n) {
  const [a] = PREPS[n]; const m = a.sceneOpts.main; const lama = a.kick.startsWith('Lama'); const map = SC[n];
  const pts = [a.points[0], a.points[1]]; const seq = [0, 0]; const allOn = [];
  if (lama) {
    const key = (x) => x.join(','); const used = new Set([...map.P, ...map.M.flat(), ...(map.skip || [])].filter((x) => typeof x !== 'string').map(key));
    const get = (x) => (typeof x === 'string' ? x : cut(a.points[x[0]].d[x[1]]));
    const rest = (pi) => a.points[pi].d.map((d, bi) => [pi, bi]).filter((x) => !used.has(key(x)));
    const P = [...map.P, ...rest(2).filter((x) => !map.P.some((y) => key(y) === key(x)))];
    if (P.length) { pts.push({ h: 'Descriere · obiectiv mic · ansamblul', d: P.map(get) }); seq.push(0); }
    m.marks.forEach((mm, k) => { pts.push({ h: 'Descriere · obiectiv mare · ' + mm.lab, d: map.M[k].map(get) }); seq.push(k + 1); });
    for (let pi = 3; pi < a.points.length; pi++) { const r = rest(pi); if (r.length) { pts.push({ h: a.points[pi].h.replace(/ · \d+ p$/, ''), d: r.map(get) }); seq.push(0); } }
  } else {
    for (let pi = 2; pi < a.points.length; pi++) { pts.push(a.points[pi]); if (pi === 2) allOn.push(pts.length - 1); seq.push(0); }
    m.marks.forEach((mm, k) => { pts.push({ h: 'De aproape · ' + mm.lab, d: [] }); seq.push(k + 1); });
  }
  const what = lama ? 'lama' : 'piesa';
  return {
    scene: 'scope', anim: true, beatDur: 5,
    spec: `Poza reală a preparatului ${n} (${what}, neatinsă) într-un vizor rotund. La organ, definiție și la ansamblu: toată poza în vizor, cu cercurile adnotărilor vechi. La fiecare structură: vizorul mărește lin, o singură dată, pe aceeași poză, până la cercul ei, care se aprinde; harta din colț arată unde ești${lama ? '; revolverul trece de pe obiectivul scurt (mic) pe cel lung (mare)' : ''}. Structurile, în ordine: ${m.marks.map((x) => x.lab).join('; ')}.`,
    kick: baseOf(a) + ' · 1/3 · ce vezi', title: a.title,
    hud: a.hud,
    sceneOpts: { img: m.img, W: m.W, H: m.H, marks: m.marks, seq, allOn, piece: !lama },
    points: pts, ...(a.xtra ? { xtra: a.xtra } : {}),
  };
}
// 2/3 · cauze + complicații, lângă cele două poze reale ale preparatului (cea principală + a doua poză din fișa veche)
function ccSlide(n) {
  const [a, b] = PREPS[n]; const o = a.sceneOpts; const lama = a.kick.startsWith('Lama'); const kind = lama ? 'lama' : 'piesa';
  const shown = (w, h, bw, bh) => { const r = Math.min(bw / w, bh / h); return w * r * h * r; };
  const wide = shown(o.main.W, o.main.H, 708, 284) + shown(o.sub.W, o.sub.H, 708, 284) >= shown(o.main.W, o.main.H, 346, 600) + shown(o.sub.W, o.sub.H, 346, 600);
  return {
    scene: 'ddFace', anim: false,
    spec: `Static: cele două poze reale ale preparatului ${n} din fișa veche: ${wide ? 'sus' : 'în stânga'} poza principală cu cercurile ei, ${wide ? 'jos' : 'în dreapta'} a doua poză („${o.sub.cap}”). Textul: cauzele și complicațiile.`,
    kick: baseOf(a) + ' · 2/3 · cauze, complicații', title: b.title.replace(/, DD$/, ''),
    hud: a.hud,
    sceneOpts: { plain: true, wide, phase: ['cauze · complicații', 'cauze', 'complicații'], cred: 'Pozele: preparatele de la LP (cum le vezi la examen).', a: { img: o.main.img, W: o.main.W, H: o.main.H, marks: o.main.marks, cap: `${kind} ${n}` }, b: { img: o.sub.img, W: o.sub.W, H: o.sub.H, marks: o.sub.marks, cap: o.sub.cap } },
    points: [b.points[0], b.points[1]], ...(b.xtra ? { xtra: b.xtra } : {}),
    beatDur: 5,
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
    kick: base + ' · 3/3 · DD față în față', title: `${lama ? 'Lama' : 'Piesa'} ${n} lângă ${pm[1]} ${pn}: o asemănare, trei diferențe`,
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

const out = [{ ...SKEL, deckName: 'Anatomie patologică · Recapitulare OSPE · preparatele 1–26 · varianta nouă',
  xtra: 'Varianta nouă: la fiecare preparat „de ce arată așa” (mecanismul, la 13 preparate) → 1/3 ce vezi (organ, leziune, definiție, descriere, pe poza reală mărită) → 2/3 cauze și complicații → 3/3 DD față în față. Hărțile, DD-urile comparative, capcanele și tabelele finale sunt în recapitularea veche.' }];
for (let n = 1; n <= 26; n++) out.push(...(MECH[n] || []), seeSlide(n), ccSlide(n), ddSlide(n));
export const SLIDES = out;
export const GLOS = [...G0, ...GLOS3].filter((x, k, arr) => arr.findIndex((y) => y[0] === x[0]) === k);
export const TERMS = T0;
