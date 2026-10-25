// PARTEA E: atlasul mediilor (paginile 65–117 ale deck-ului de examen Micro): formula de răspuns, 25 de poze de la LP
// (intro = poza goală + cele 4 întrebări; punctele = răspunsul, cu încercuiri pe poză și mecanismul animat), SIM/ABE de pe tablă,
// recapitularea tuturor mediilor. Pozele sunt versiunile curate (fără badge-uri) din deck-ul sursă: img/e_*.jpg.
import { M } from './mk.js';

export const GL = [
  ['NaCl', 'clorură de sodiu'], ['MSA', 'Mannitol Salt Agar = mediul Chapman'], ['CMI', 'concentrația minimă inhibitorie'],
  ['SS', 'mediul Salmonella-Shigella'], ['H₂S', 'hidrogen sulfurat'], ['ABT', 'albastru de bromtimol'], ['NH₃', 'amoniac'],
  ['TSI', 'Triple Sugar Iron (mediu cu 3 zaharuri și fier)'], ['K/A', 'pantă alcalină (roșie) / coloană acidă (galbenă)'],
  ['A/A', 'pantă acidă / coloană acidă (tot galben)'], ['K/K', 'tot alcalin (tot roșu)'], ['MALDI-TOF', 'identificare prin spectrometrie de masă'],
  ['SIM', 'mediul sulfură-indol-mobilitate'], ['ABE', 'agar bilă-esculină'], ['pH', 'aciditatea mediului'],
  ['L+', 'lactozo-pozitiv'], ['L−', 'lactozo-negativ'],
  ['S. aureus', 'Staphylococcus aureus'], ['S. epidermidis', 'Staphylococcus epidermidis'], ['S. pneumoniae', 'Streptococcus pneumoniae'],
  ['S. pyogenes', 'Streptococcus pyogenes'], ['E. coli', 'Escherichia coli'], ['B. anthracis', 'Bacillus anthracis'],
  ['M. tuberculosis', 'Mycobacterium tuberculosis'], ['C. diphtheriae', 'Corynebacterium diphtheriae'],
];
export const TM = [
  ['nepretenți', 'germen nepretențios', 'crește pe medii simple, fără factori de creștere adăugați'],
  ['pretenți', 'germen pretențios', 'are nevoie de factori de creștere în plus (ex. sânge)'],
  ['aglutin', 'aglutinare', 'germenii se lipesc în grămezi vizibile'],
  ['piocianin', 'piocianina', 'pigmentul albastru-verzui, solubil, al lui Pseudomonas aeruginosa'],
  ['difuzibil', 'pigment difuzibil', 'pigment solubil în apă, care trece din colonie în mediu'],
  ['defibrinat', 'sânge defibrinat', 'sânge din care s-a scos fibrina, ca să nu se coaguleze'],
  ['hemoliz', 'hemoliza', 'distrugerea hematiilor din geloza-sânge de către germen'],
  ['methemoglobin', 'methemoglobina', 'hemoglobină oxidată, de culoare brun-verzuie'],
  ['viridans', 'streptococi viridans', 'streptococi α-hemolitici („verzi”) din flora orală'],
  ['difuzimetric', 'antibiograma difuzimetrică', 'antibioticul difuzează din disc în geloză; măsori zona de inhibiție'],
  ['timidin', 'timidina', 'nucleozid care, în exces, anulează efectul sulfamidelor'],
  ['aminoglicozid', 'aminoglicozide', 'clasă de antibiotice (ex. gentamicina), sensibile la cationii din mediu'],
  ['levur', 'levuri', 'fungi unicelulari care se înmulțesc prin înmugurire (ex. Candida)'],
  ['halotoler', 'halotolerant', 'germen care suportă concentrații mari de sare'],
  ['coliform', 'coliformi', 'enterobacterii lactozo-pozitive din intestin (ex. E. coli)'],
  ['cromogen', 'substrat cromogen', 'substanță incoloră care, tăiată de o enzimă, eliberează un colorant'],
  ['prezumtiv', 'identificare prezumtivă', 'identificare probabilă, care se confirmă apoi'],
  ['esculin', 'esculina', 'glicozid; hidrolizat, reacționează cu fierul și dă negru'],
  ['Kovacs', 'reactivul Kovacs', 'reactiv care se colorează în roșu în prezența indolului'],
  ['Dieneș', 'linia Dieneș', 'linia clară dintre două tulpini de Proteus care nu se contopesc'],
  ['capsul', 'capsula', 'înveliș de polizaharid în jurul peretelui bacterian'],
];

const Q = 'Ce mediu e și ce vezi pe el?';
const RF = { acid: '#f2d23a', mid: '#ec6a5e', alk: '#e0399a' };      // roșu fenol
const RN = { acid: '#b8285a', mid: '#c4605a', alk: '#e3a43c' };      // roșu neutru (MacConkey)
const BT = { acid: '#f2d23a', mid: '#3fa56a', alk: '#2f62d6' };      // albastru de bromtimol
const MAC = '#c4605a', SSC = '#d48a3a', RED = '#c8203a', YEL = '#e2bb24', SIMG = '#2e7d4f', SIMB = '#1d4fd0', SOMON = '#f0a07a', FUX = '#e0399a';

const scaleRF = (pos, note) => ({ k: 'scale', ind: 'roșu fenol', acidLab: 'acid: galben', alkLab: 'alcalin: roz-fucsia', ...RF, pos, note });
const scaleRN = (pos, note) => ({ k: 'scale', ind: 'roșu neutru', acidLab: 'acid: roșu', alkLab: 'alcalin: galben', ...RN, pos, note });
const scaleBT = (pos, note) => ({ k: 'scale', ind: 'albastru de bromtimol', acidLab: 'acid: galben', alkLab: 'alcalin: albastru', ...BT, midAt: 0.5, pos, note });
const growNP = (lab) => ({ k: 'grow', cell: 'bac', lab, germs: [['staph', 'stafilococi'], ['gneg', 'enterobacterii'], ['gneg', 'Pseudomonas']] });
const lactLocal = (cellLab) => ({ k: 'react', ins: [{ lab: 'lactoză', ok: 1 }], cellLab, prod: 'acid', prodCol: RN.acid, prodTxt: '#ffffff', vis: 'plate', local: 1, from: MAC, to: '#a8244f', colCol: '#efe0d0', ind: 'roșu neutru: roșu la acid', res: 'lactoză fermentată → acid → colonii roz' });
const bile = (foot) => ({ k: 'sel', inh: 'săruri biliare', germs: [{ type: 'staph', lab: 'Gram-pozitivi', dies: 1 }, { type: 'gneg', lab: 'enterobacterii\n(Gram-negativi)' }], foot });

const A = (k, title, img, W, H, points, marks, mech, extra = {}) => ({
  scene: 'e_media', kick: `Atlasul mediilor · Atlas ${k} / 25`, title, hud: [`Atlas ${k} / 25`],
  sceneOpts: { img: 'e_' + img, W, H, marks, mech }, points, beatDur: 7, ...extra,
});

export const SL = [
  /* ---------- separatorul: formula de răspuns ---------- */
  {
    scene: 'e_formula', kick: 'Microbiologie · Partea B · Atlasul mediilor', title: 'Atlasul mediilor: întâi poza goală, apoi răspunsul',
    hud: ['25 de poze de la LP', 'formula de răspuns'],
    points: [
      { h: 'Ce mediu e și de ce tip?', d: ['de bază · complex · special · diferențial · selectiv-diferențial'] },
      { h: 'Ce conține care contează?', d: ['zahăr, indicator, inhibitor'] },
      { h: 'Ce crește, ce germen?', d: ['colonia: cum arată, ce germen tipic'] },
      { h: '+ sau − și de ce s-a schimbat culoarea?', d: ['zahăr folosit → acid / substrat folosit → alcalin → indicatorul virează'] },
    ],
    why: 'La examen ți se arată placa sau tubul. Întâi vezi **poza goală, exact cum o vezi la examen**, și spui cu voce tare în ordinea 1 → 4. Apoi, cu →, pe aceeași poză apar încercuirile și răspunsul, punct cu punct.',
    say: 'Exemplu: Este !!Chapman, mediu selectiv-diferențial!!; conține NaCl 7,5%, manitol și roșu fenol; cresc stafilococii; mediul e galben, deci !!manitol pozitiv → S. aureus!!.',
    beatDur: 6,
  },

  /* ---------- 1 · geloză simplă ---------- */
  A(1, 'Geloză simplă', 'gsimpla', 544, 576, [
    { h: '!!Geloză simplă · mediu de bază!!', d: ['bulion (peptonă, extract de carne, NaCl) + agar', 'fără zahăr, fără indicator → nu există + / −'] },
    { h: 'O colonie izolată', d: ['germen nepretențios: stafilococi, enterobacterii, Pseudomonas'] },
  ], [
    { pt: 0, x: 272, y: 296, rx: 236, ry: 236, dash: 1, lab: 'geloză simplă', ly: -60 },
    { pt: 1, x: 110, y: 262, rx: 24, ry: 24, lab: 'colonie izolată', lx: 60 },
  ], [{ k: 'basal' }, growNP('o celulă → o colonie izolată')], {
    why: 'Agarul doar solidifică mediul, nu îl hrănește. Pe tablă: geloză simplă.',
    say: 'Este o geloză simplă, mediu artificial de bază, pe care cresc germenii nepretențioși; nu are indicator, deci !!nu citesc + sau −!!.',
  }),

  /* ---------- 2 · colonii S ---------- */
  A(2, 'Colonii S', 'colS', 912, 768, [
    { h: 'Geloză simplă', d: ['cresc germeni nepretențioși'] },
    { h: '!!Colonii S (smooth)!!', d: ['mici, rotunde, netede, bombate, lucioase', 'în ser fiziologic: !!suspensie omogenă!!', 'forma normală a **patogenilor** (ex. Staphylococcus)'] },
  ], [
    { pt: 0, x: 456, y: 345, rx: 395, ry: 340, dash: 1, lab: 'geloză simplă', ly: -80 },
    { pt: 1, x: 200, y: 185, rx: 120, ry: 85, rot: -0.3, lab: 'colonii S' },
    { pt: 1, x: 300, y: 505, rx: 90, ry: 75 },
  ], [growNP('germen nepretențios → colonie'), { k: 'profile', S: 1 }], {
    why: 'Coloniile S au structura antigenică și patogenitatea optime: sunt colonia „normală” a germenului patogen.',
  }),

  /* ---------- 3 · colonii R ---------- */
  A(3, 'Colonii R', 'colR', 1000, 985, [
    { h: 'Geloză simplă', d: ['mediu de bază'] },
    { h: '!!Colonii R (rough)!!', d: ['mari, plate, uscate, margini neregulate, suprafață zbârcită', 'în ser fiziologic: !!aglutinare spontană!!', 'de regulă nepatogene'] },
  ], [
    { pt: 0, x: 505, y: 495, rx: 445, ry: 435, dash: 1, lab: 'geloză simplă', ly: -120 },
    { pt: 1, x: 590, y: 735, rx: 255, ry: 105, rot: -0.12, lab: 'colonii R' },
  ], [{ k: 'basal' }, { k: 'profile', S: 0 }], {
    warn: 'Colonia R nu înseamnă automat „nepatogen”: verifici cele 3 excepții.',
    why: 'Ține minte cele 3 excepții patogene cu colonii R: !!B. anthracis, M. tuberculosis, C. diphtheriae!!.',
  }),

  /* ---------- 4 · pigment difuzibil ---------- */
  A(4, 'Pigment difuzibil', 'pigdif', 937, 1000, [
    { h: 'Mediul din jur e colorat', d: ['verzui-gălbui, nu doar coloniile → !!pigment difuzibil!!'] },
    { h: 'Cultura', d: ['germen tipic: !!Pseudomonas aeruginosa!! (piocianină)', 'în bulion: peliculă verde'] },
  ], [
    { pt: 0, x: 440, y: 540, rx: 400, ry: 400, dash: 1, lab: 'mediul colorat', ly: -150 },
    { pt: 1, x: 185, y: 715, rx: 125, ry: 75, rot: 0.55, lab: 'cultura', lx: 60 },
  ], [{ k: 'pigment', diff: 1, pig: '#9fbf3a' }, { k: 'pseudo' }], {
    why: 'Pigmentul e solubil în apă, deci difuzează din colonie în geloză și colorează mediul. Pigmentul nedifuzibil rămâne doar în colonie.',
  }),

  /* ---------- 5 · colonii pigmentate ---------- */
  A(5, 'Colonii pigmentate', 'pigmentate', 961, 1000, [
    { h: 'Colonii cu culoare proprie', d: ['mai închise decât mediul'] },
    { h: 'Mediul din jur', d: ['nu se colorează → !!pigment nedifuzibil!!', 'ex. !!S. aureus: colonii aurii!!'] },
  ], [
    { pt: 0, x: 280, y: 395, rx: 125, ry: 115, lab: 'colonie pigmentată' },
    { pt: 0, x: 490, y: 430, rx: 70, ry: 85 },
    { pt: 1, x: 560, y: 730, rx: 210, ry: 120, dash: 1, lab: 'mediul din jur' },
  ], [{ k: 'pigment', diff: 0, pig: '#e8a317', mini: 'culoarea stă în colonie' }, [{ k: 'pigment', diff: 0, pig: '#e8a317', mini: 'nedifuzibil: S. aureus' }, { k: 'pigment', diff: 1, pig: '#9fbf3a', mini: 'difuzibil: comparație' }]], {
    why: 'Culoarea e în colonie, nu în mediu: pigmentul nu e solubil, deci nu difuzează. E un caracter de cultură folosit la identificare.',
  }),

  /* ---------- 6 · cățărare ---------- */
  A(6, 'Fenomenul de cățărare', 'catarare', 1000, 939, [
    { h: 'Văl subțire, în valuri, pe toată placa', d: ['nu ai colonii izolate', 'germen: !!Proteus (foarte mobil)!!', 'tulpini diferite nu se contopesc → !!linia Dieneș!!'] },
  ], [
    { pt: 0, x: 525, y: 330, rx: 430, ry: 275, dash: 1, lab: 'văl pe toată placa', ly: -110 },
  ], [{ k: 'swarm' }], {
    why: 'Proteus e atât de mobil încât „urcă” peste tot mediul din punctul însămânțat, în valuri succesive. Cheia e **vălul, nu culoarea mediului**. Proteus e și urează +, H₂S +, lactozo −.',
  }),

  /* ---------- 7 · geloză-sânge ---------- */
  A(7, 'Geloză-sânge', 'gsange', 1000, 974, [
    { h: '!!Geloză-sânge · mediu compus complex!!', d: ['geloză + !!sânge defibrinat 5–10%!!', 'pentru germeni **pretențioși** (streptococi, pneumococ)', 'roșu opac, uniform = nesămânțată'] },
  ], [
    { pt: 0, x: 505, y: 480, rx: 445, ry: 440, dash: 1, lab: 'roșu opac, uniform', ly: -120 },
  ], [{ k: 'blood' }], {
    why: 'Sângele aduce factori de creștere, iar hematiile intacte sunt „martorul” hemolizei: le vezi lizate sau nu în jurul coloniei.',
  }),

  /* ---------- 8 · hemoliza ---------- */
  A(8, 'Hemoliza: α, β, γ', 'hemoliza', 1000, 996, [
    { h: '!!α · stânga!!', d: ['brun-verzui, opac: liză **parțială**', 'S. pneumoniae, viridans'] },
    { h: '!!β · jos!!', d: ['clar, transparent: liză **completă**', 'S. pyogenes, S. aureus'] },
    { h: '!!γ · sus!!', d: ['mediul a rămas roșu: **fără** hemoliză', 'enterococi'] },
  ], [
    { pt: 0, x: 230, y: 450, rx: 125, ry: 255, rot: 0.08, lab: 'α' },
    { pt: 1, x: 640, y: 715, rx: 270, ry: 150, rot: -0.3, lab: 'β' },
    { pt: 2, x: 590, y: 290, rx: 225, ry: 140, rot: -0.25, lab: 'γ' },
  ], [{ k: 'hemo', type: 'a' }, { k: 'hemo', type: 'b' }, { k: 'hemo', type: 'g' }], {
    why: 'La α hemoglobina devine pigment verde (methemoglobină), la β hematiile sunt sparte complet. Exact ca pe tablă: α parțială, β completă.',
    say: 'Pe geloza-sânge văd trei tipuri de hemoliză: α parțială, verzuie; β completă, clară; și γ, fără hemoliză.',
  }),

  /* ---------- 9 · Mueller-Hinton ---------- */
  A(9, 'Mueller-Hinton', 'mh', 1000, 936, [
    { h: '!!Mueller-Hinton · mediul antibiogramei!!', d: ['standardizat, reproductibil', 'pentru **antibiograma difuzimetrică** și CMI în agar', '4 mm grosime, pH 7,2–7,4; cu sânge pentru pretențioși'] },
  ], [
    { pt: 0, x: 500, y: 475, rx: 435, ry: 425, dash: 1, lab: 'Mueller-Hinton', ly: -120 },
  ], [{ k: 'abg' }], {
    why: 'Are puțină timidină (care ar anula sulfamidele) și cationi controlați (care schimbă efectul aminoglicozidelor), fără inhibitori: antibioticul difuzează la fel de fiecare dată.',
  }),

  /* ---------- 10 · Sabouraud ---------- */
  A(10, 'Sabouraud', 'sab', 744, 704, [
    { h: '!!Sabouraud · mediu special pentru fungi!!', d: ['**glucoză multă, pH acid**', '+ cloramfenicol (oprește bacteriile)', 'cresc !!levurile (Candida)!! în 24–72 h'] },
  ], [
    { pt: 0, x: 360, y: 292, rx: 255, ry: 255, dash: 1, lab: 'Sabouraud', ly: -60 },
  ], [[{ k: 'sel', inh: 'cloramfenicol\n+ pH acid', germs: [{ type: 'gneg', lab: 'bacterii', dies: 1 }, { type: 'yeast', lab: 'levuri\n(Candida)' }] }, { k: 'grow', cell: 'yeast', col: '#fffdf6', agar: '#e6d49a', lab: 'Candida: 24–72 h' }]], {
    why: 'pH-ul acid și zahărul mult favorizează fungii și frânează bacteriile. Pe tablă: Sabouraud → levuri.',
  }),

  /* ---------- 11 · colonii untoase ---------- */
  A(11, 'Colonii untoase', 'untoase', 1000, 927, [
    { h: '!!Colonii untoase!!', d: ['mari, rotunde, mate, crem-albicioase', '= !!levuri (Candida)!!'] },
    { h: 'Punctele roșii', d: ['alte colonii, nu fac parte din cultura de levuri'] },
  ], [
    { pt: 0, x: 300, y: 660, rx: 150, ry: 95, rot: -0.15, lab: 'colonii untoase' },
    { pt: 1, x: 772, y: 707, rx: 38, ry: 32, lab: 'punct roșu' },
    { pt: 1, x: 570, y: 238, rx: 30, ry: 28 },
  ], [{ k: 'types' }, { k: 'foreign' }], {
    why: 'Untoase = levuri, pufoase = mucegaiuri, mucoase (M) = capsulă. Nu le încurca.',
  }),

  /* ---------- 12 · Chapman nesămânțat ---------- */
  A(12, 'Chapman / MSA (nesămânțat)', 'chap0', 1000, 886, [
    { h: '!!Chapman · selectiv-diferențial!!', d: ['!!NaCl 7,5%!! → selectează stafilococii', '**manitol + roșu fenol** → diferențiază', 'roz-roșu = nimic fermentat'] },
  ], [
    { pt: 0, x: 490, y: 440, rx: 400, ry: 400, dash: 1, lab: 'roz-roșu', ly: -120 },
  ], [[{ k: 'sel', inh: 'NaCl 7,5%', germs: [{ type: 'strep', lab: 'streptococi', dies: 1 }, { type: 'gneg', lab: 'enterobacterii', dies: 1 }, { type: 'staph', lab: 'stafilococi' }], foot: 'stafilococii: halotoleranți' }, scaleRF(0.55, 'nesămânțat: roz-roșu')]], {
    why: 'Sarea multă oprește aproape toate bacteriile; stafilococii o tolerează (halotoleranți). Pe tablă: sare NaCl + manitol → MSA.',
  }),

  /* ---------- 13 · Chapman pozitiv ---------- */
  A(13, 'Chapman pozitiv', 'chapP', 816, 768, [
    { h: 'Mediul a devenit galben', d: ['!!manitol fermentat → acid → roșul fenol virează galben!!'] },
    { h: 'Colonii galbene', d: ['!!S. aureus!! (stafilococ patogen, manitol +)', 'negativ: mediul rămâne roșu (S. epidermidis)'] },
  ], [
    { pt: 0, x: 410, y: 385, rx: 345, ry: 335, dash: 1, lab: 'mediul galben', ly: -110 },
    { pt: 1, x: 650, y: 440, rx: 95, ry: 210, rot: 0.1, lab: 'colonii galbene' },
  ], [
    { k: 'react', ins: [{ lab: 'manitol', ok: 1 }], cell: 'staph', cellLab: 'S. aureus', prod: 'acid', prodCol: RF.acid, vis: 'plate', from: RF.mid, to: RF.acid, colCol: '#f5eedc', colTo: '#f2c81a', ind: 'roșu fenol: roșu → galben', res: 'manitol + → mediul galben' },
    [
      { k: 'react', ins: [{ lab: 'manitol', ok: 1 }], cell: 'staph', cellLab: 'S. aureus', prod: 'acid', prodCol: RF.acid, vis: 'plate', from: RF.mid, to: RF.acid, colCol: '#f5eedc', colTo: '#f2c81a', ind: 'roșu fenol', res: '+ : galben' },
      { k: 'react', ins: [{ lab: 'manitol', ok: 0 }], cell: 'staph', cellLab: 'S. epidermidis', vis: 'plate', from: RF.mid, to: RF.mid, colCol: '#f5eedc', ind: 'roșu fenol', res: '− : rămâne roșu', resCol: '#ff9a9a' },
    ],
  ], {
    why: 'Sarea îi alege (stafilococii), manitolul îi desparte. „Aur” (aureus) = galben.',
    say: 'Este Chapman, mediu selectiv-diferențial; mediul galben arată manitol pozitiv, deci Staphylococcus aureus.',
  }),

  /* ---------- 14 · MacConkey nesămânțat ---------- */
  A(14, 'MacConkey (nesămânțat)', 'mac0', 803, 768, [
    { h: '!!MacConkey · selectiv-diferențial!!', d: ['!!săruri biliare → opresc Gram-pozitivii!!', '**lactoză + roșu neutru** → diferențiază', 'cresc enterobacteriile'] },
  ], [
    { pt: 0, x: 398, y: 390, rx: 335, ry: 335, dash: 1, lab: 'MacConkey', ly: -100 },
  ], [[bile(), scaleRN(0.42, 'nesămânțat')]], {
    why: 'Pe tablă: săruri biliare → McConkey → roz. Roșul neutru e roșu la acid, deci lactozo-pozitivii vor fi roz.',
  }),

  /* ---------- 15 · MacConkey lactozo-pozitiv ---------- */
  A(15, 'MacConkey lactozo-pozitiv', 'macP', 1000, 937, [
    { h: 'MacConkey', d: ['selectiv pentru Gram-negativi'] },
    { h: 'Colonii roz-roșii', d: ['!!lactoză fermentată → acid → roșul neutru devine roșu!!', '!!E. coli!!, Klebsiella'] },
  ], [
    { pt: 0, x: 470, y: 420, rx: 420, ry: 400, dash: 1, lab: 'MacConkey', ly: -110 },
    { pt: 1, x: 760, y: 330, rx: 115, ry: 310, rot: -0.3, lab: 'colonii roz', lx: -60 },
  ], [bile('cresc doar Gram-negativii'), lactLocal('E. coli')], {
    why: 'Acidul se concentrează în colonie și în jurul ei, deci exact colonia se colorează.',
    say: 'Este MacConkey; coloniile roz sunt lactozo-pozitive, de exemplu E. coli.',
  }),

  /* ---------- 16 · MacConkey lactozo-negativ ---------- */
  A(16, 'MacConkey lactozo-negativ', 'macN', 1000, 934, [
    { h: 'Mediul galben-portocaliu', d: ['germenul folosește peptonele → !!mediul se alcalinizează!!'] },
    { h: 'Colonii incolore, palide', d: ['!!lactozo −!!: Salmonella, Shigella, Proteus'] },
  ], [
    { pt: 0, x: 455, y: 455, rx: 420, ry: 415, dash: 1, lab: 'galben-portocaliu', ly: -120 },
    { pt: 1, x: 600, y: 590, rx: 150, ry: 150, lab: 'colonii incolore' },
  ], [
    { k: 'react', ins: [{ lab: 'lactoză', ok: 0 }, { lab: 'peptone', ok: 1 }], cellLab: 'lactozo −', prod: 'alcalin', prodCol: RN.alk, vis: 'plate', from: MAC, to: '#d98a2e', colCol: '#efe6d6', ind: 'roșu neutru: galben la alcalin', res: 'peptone folosite → alcalin → galben-portocaliu' },
    { k: 'grow', cell: 'bac', col: '#efe6d6', agar: '#d98a2e', lab: 'colonii incolore', gh: 'lactozo −', germs: [['gneg', 'Salmonella'], ['gneg', 'Shigella'], ['gneg', 'Proteus']] },
  ], {
    why: 'Patogenii intestinali (!!Salmonella, Shigella!!) sunt lactozo-negativi: de aceea MacConkey îi separă de coliformii nepatogeni.',
  }),

  /* ---------- 17 · MacConkey colonii M ---------- */
  A(17, 'MacConkey: colonii M', 'macM', 905, 1000, [
    { h: 'MacConkey', d: ['lactozo + → roz'] },
    { h: '!!Colonii M (mucoase)!!', d: ['mari, lucioase, bombate, curgătoare', '= germen **capsulat** → !!Klebsiella!!'] },
  ], [
    { pt: 0, x: 450, y: 510, rx: 380, ry: 375, dash: 1, lab: 'MacConkey', ly: -110, by: 770 },
    { pt: 1, x: 420, y: 215, rx: 265, ry: 75, rot: 0.02, lab: 'colonii M' },
  ], [lactLocal('Klebsiella'), { k: 'capsule' }], {
    why: 'Capsula de polizaharid face colonia lucioasă și curgătoare. Klebsiella e și lactozo-pozitivă, deci colonia e roz.',
  }),

  /* ---------- 18 · geloză lactozată nesămânțată ---------- */
  A(18, 'Geloză lactozată (nesămânțată)', 'glact0', 863, 736, [
    { h: '!!Geloză lactozată · diferențial!!', d: ['**lactoză + albastru de bromtimol**', '!!fără inhibitor!!', 'albastru-verzui = nimic fermentat'] },
  ], [
    { pt: 0, x: 418, y: 300, rx: 350, ry: 315, dash: 1, lab: 'albastru-verzui', ly: -100 },
  ], [[scaleBT(0.72, 'nesămânțat: albastru-verzui'), { k: 'sel', germs: [{ type: 'staph', lab: 'Gram-pozitivi' }, { type: 'gneg', lab: 'Gram-negativi' }], foot: 'cresc toți: nu selectează' }]], {
    why: 'Pe tablă: lactoză → geloză lactozată. Albastrul de bromtimol e galben la acid și albastru la alcalin.',
  }),

  /* ---------- 19 · geloză lactozată L− / L+ ---------- */
  A(19, 'Geloză lactozată: L− și L+', 'glactLN', 1000, 750, [
    { h: '!!L− · mijloc!!', d: ['mediul rămâne **albastru**', 'Salmonella, Shigella, Proteus'] },
    { h: '!!L+ · dreapta sus!!', d: ['colonii și mediu **galbene**', '!!E. coli!!'] },
  ], [
    { pt: 0, x: 510, y: 393, rx: 212, ry: 212, lab: 'L−', ly: -60 },
    { pt: 1, x: 860, y: 190, rx: 145, ry: 190, lab: 'L+', lx: -40 },
  ], [
    { k: 'react', ins: [{ lab: 'lactoză', ok: 0 }], cellLab: 'Salmonella, Shigella', vis: 'plate', from: '#2f6fb0', to: '#2f6fb0', colCol: '#e8eef0', ind: 'albastru de bromtimol', res: 'nefermentată → rămâne albastru' },
    { k: 'react', ins: [{ lab: 'lactoză', ok: 1 }], cellLab: 'E. coli', prod: 'acid', prodCol: BT.acid, vis: 'plate', from: '#2f6fb0', to: '#f0d040', colCol: '#e8eef0', colTo: '#f0c020', ind: 'albastru de bromtimol: → galben', res: 'lactoză fermentată → acid → galben' },
  ], {
    why: 'Lactoza fermentată → acid → albastrul de bromtimol devine galben. Fără fermentare, mediul rămâne albastru.',
  }),

  /* ---------- 20 · SS nesămânțat ---------- */
  A(20, 'SS · Salmonella-Shigella (nesămânțat)', 'ss0', 1000, 929, [
    { h: '!!SS · selectiv-diferențial!!', d: ['**săruri biliare + verde briliant + citrat** → selectiv', 'lactoză + roșu neutru → diferențial', '!!tiosulfat + citrat feric → H₂S!!'] },
  ], [
    { pt: 0, x: 505, y: 460, rx: 445, ry: 425, dash: 1, lab: 'mediul SS', ly: -120 },
  ], [[{ k: 'sel', inh: 'săruri biliare\nverde briliant\ncitrat', germs: [{ type: 'staph', lab: 'Gram-pozitivi', dies: 1 }, { type: 'gneg', lab: 'mulți\ncoliformi', dies: 1 }, { type: 'gneg', lab: 'Salmonella,\nShigella' }] }, { k: 'precip', cellLab: 'tiosulfat', lab: 'H₂S + citrat feric → negru' }]], {
    why: 'E făcut pentru enterice: inhibă Gram-pozitivii și o mare parte din coliformi. Pe tablă: săruri biliare → SS → negru.',
  }),

  /* ---------- 21 · SS Salmonella vs. Shigella ---------- */
  A(21, 'SS: Salmonella vs. Shigella', 'ssSS', 986, 1000, [
    { h: '!!Salmonella · sus!!', d: ['colonii incolore cu **centru negru**', 'lactozo −, H₂S +'] },
    { h: '!!Shigella · jos!!', d: ['colonii incolore, **fără negru**', 'lactozo −, H₂S −'] },
  ], [
    { pt: 0, x: 400, y: 215, rx: 255, ry: 105, rot: 0.12, lab: 'Salmonella' },
    { pt: 1, x: 500, y: 680, rx: 290, ry: 160, rot: 0.25, dash: 1, lab: 'Shigella' },
  ], [
    { k: 'react', ins: [{ lab: 'lactoză', ok: 0 }], cellLab: 'Salmonella', black: 1, prodCol: '#c9c9c9', vis: 'plate', from: SSC, to: SSC, colCol: '#f1e6d6', ind: 'H₂S + fier → sulfură de fier', res: 'incoloră + centru negru' },
    { k: 'react', ins: [{ lab: 'lactoză', ok: 0 }], cellLab: 'Shigella', vis: 'plate', from: SSC, to: SSC, colCol: '#f1e6d6', ind: 'fără H₂S', res: 'incoloră, fără negru' },
  ], {
    why: 'Negrul e sulfura de fier: !!H₂S produs de Salmonella + fierul din mediu!!. Ambele sunt incolore pentru că nu fermentează lactoza.',
    say: 'Este mediul SS; ambele colonii sunt incolore, deci lactozo-negative; Salmonella are centrul negru prin H₂S, Shigella nu.',
  }),

  /* ---------- 22 · mediu cromogen ---------- */
  A(22, 'Mediu cromogen (urocultură)', 'cromogen', 960, 960, [
    { h: '!!Mediu cromogen!!', d: ['conține **substraturi cromogene**', 'enzimele specifice speciei le clivează → !!colonia ia o culoare!!'] },
    { h: 'Colonii mici albastru-verzui', d: ['pe mediile de urocultură uzuale, de regulă !!enterococ!!', 'confirmarea: **MALDI-TOF** (scris pe placă)'] },
  ], [
    { pt: 0, x: 470, y: 500, rx: 420, ry: 420, dash: 1, lab: 'mediu cromogen', ly: -130 },
    { pt: 1, x: 430, y: 620, rx: 300, ry: 150, rot: -0.35, lab: 'colonii albastru-verzui' },
  ], [
    { k: 'react', ins: [{ lab: 'substrat\ncromogen', ok: 1 }], enz: 'enzimă specifică', cell: 'entero', cellLab: 'specia', prod: 'culoare', prodCol: '#2f8f8a', prodTxt: '#ffffff', vis: 'plate', local: 1, from: '#ece2bb', to: '#2f8f8a', colCol: '#f3ecd6', ind: 'colonia ia culoarea', res: 'identificare prezumtivă pe placă' },
    { k: 'maldi' },
  ], {
    why: 'Culoarea coloniei îți dă o identificare prezumtivă direct pe placă, fără teste biochimice separate.',
  }),

  /* ---------- 23 · TSI ---------- */
  A(23, 'TSI', 'tsi', 949, 1000, [
    { h: 'Tuburile roșii', d: ['!!K/K: niciun zahăr fermentat!! (sau nesămânțat)'] },
    { h: 'Tuburile galbene', d: ['!!A/A: fermentează lactoza / zaharoza (E. coli)!!', 'K/A ar fi pantă roșie + coloană galbenă (Salmonella)'] },
  ], [
    { pt: 0, x: 170, y: 610, rx: 45, ry: 70, lab: 'roșii', lx: 65 },
    { pt: 0, x: 300, y: 600, rx: 45, ry: 70 },
    { pt: 1, x: 410, y: 615, rx: 45, ry: 70, lab: 'galbene', lx: 130 },
    { pt: 1, x: 540, y: 600, rx: 45, ry: 70 },
    { pt: 1, x: 660, y: 590, rx: 45, ry: 70 },
  ], [
    [{ k: 'react', ins: [{ lab: 'glucoză', ok: 0 }, { lab: 'lactoză', ok: 0 }, { lab: 'zaharoză', ok: 0 }], cellLab: 'germen', vis: 'slant', from: RED, to: RED, ind: 'roșu fenol', res: 'nimic fermentat → rămâne roșu' }, { k: 'tubes', title: 'K/K = tot roșu', list: [{ from: RED, butt: RED, top: RED, slant: 1, lab: 'K/K' }] }],
    [{ k: 'react', ins: [{ lab: 'glucoză', ok: 1 }, { lab: 'lactoză', ok: 1 }, { lab: 'zaharoză', ok: 1 }], cellLab: 'E. coli', prod: 'acid', prodCol: RF.acid, vis: 'slant', from: RED, to: YEL, toTop: YEL, ind: 'roșu fenol → galben', res: 'A/A: tot galben' }, { k: 'tubes', title: 'pantă / coloană', list: [{ from: RED, butt: YEL, top: YEL, slant: 1, lab: 'A/A', l2: 'E. coli' }, { from: RED, butt: YEL, top: RED, slant: 1, lab: 'K/A', l2: 'Salmonella' }] }],
  ], {
    why: 'TSI: glucoză de 10× mai puțină + lactoză + zaharoză + roșu fenol + fier. Galben peste tot = acid din zaharurile multe; negru = H₂S.',
  }),

  /* ---------- 24 · Simmons și uree ---------- */
  A(24, 'Simmons și uree', 'simmons', 1000, 808, [
    { h: 'Simmons verde', d: ['!!negativ!!: nu folosește citratul (E. coli)'] },
    { h: 'Simmons albastru', d: ['!!pozitiv: citrat → alcalin → ABT albastru!! (Klebsiella)'] },
    { h: 'Uree somon', d: ['negativ'] },
    { h: 'Uree roz-fucsia', d: ['!!pozitiv: ureaza → NH₃ → roz!! (Proteus)'] },
  ], [
    { pt: 0, x: 112, y: 610, rx: 55, ry: 105, lab: 'verde' },
    { pt: 0, x: 285, y: 600, rx: 55, ry: 105, dash: 1 },
    { pt: 1, x: 462, y: 615, rx: 50, ry: 85, lab: 'albastru' },
    { pt: 2, x: 655, y: 610, rx: 55, ry: 95, lab: 'somon' },
    { pt: 3, x: 875, y: 570, rx: 60, ry: 165, lab: 'roz-fucsia' },
  ], [
    { k: 'react', ins: [{ lab: 'citrat', ok: 0 }], cellLab: 'E. coli', vis: 'slant', from: SIMG, to: SIMG, ind: 'ABT: verde', res: 'Simmons −: rămâne verde' },
    { k: 'react', ins: [{ lab: 'citrat', ok: 1 }], cellLab: 'Klebsiella', prod: 'alcalin', prodCol: BT.alk, prodTxt: '#ffffff', vis: 'slant', from: SIMG, to: SIMB, ind: 'ABT: verde → albastru', res: 'Simmons +: albastru' },
    { k: 'react', ins: [{ lab: 'uree', ok: 0 }], cellLab: 'germen urează −', vis: 'tube', from: SOMON, to: SOMON, ind: 'roșu fenol', res: 'uree −: rămâne somon' },
    { k: 'react', ins: [{ lab: 'uree', ok: 1 }], enz: 'urează', cellLab: 'Proteus', prod: 'NH₃', prodCol: '#cfe8ff', vis: 'tube', from: SOMON, to: FUX, ind: 'roșu fenol: → roz-fucsia', res: 'uree +: NH₃ → alcalin → roz' },
  ], {
    why: 'Pe tablă: citrat → C → albastru; uree → amoniac → roz. Ambele virează **spre alcalin**.',
  }),

  /* ---------- 25 · stativul ---------- */
  A(25, 'Stativul de tuburi', 'rack', 1000, 766, [
    { h: 'Galben-maronii', d: ['tuburi cu zahăr fermentat → !!acid!! (TSI)'] },
    { h: 'Albastru', d: ['Simmons +'] },
    { h: 'Negru', d: ['!!H₂S +!! (sulfură de fier)'] },
    { h: 'Verde', d: ['Simmons −'] },
    { h: 'Somon', d: ['uree − (roz în spate = uree +)'] },
  ], [
    { pt: 0, x: 220, y: 365, rx: 165, ry: 105, lab: 'galben-maronii' },
    { pt: 1, x: 396, y: 345, rx: 38, ry: 75, lab: 'albastru' },
    { pt: 2, x: 510, y: 340, rx: 50, ry: 100, lab: 'negru' },
    { pt: 3, x: 625, y: 320, rx: 32, ry: 85, lab: 'verde' },
    { pt: 4, x: 693, y: 370, rx: 55, ry: 100, lab: 'somon' },
    { pt: 4, x: 128, y: 225, rx: 32, ry: 70, dash: 1, lab: 'roz în spate', ly: -150 },
  ], [
    { k: 'react', ins: [{ lab: 'zahăr', ok: 1 }], cellLab: 'germen', prod: 'acid', prodCol: RF.acid, vis: 'tube', from: RED, to: '#c8901c', ind: 'roșu fenol → galben', res: 'zahăr fermentat → acid → galben' },
    { k: 'react', ins: [{ lab: 'citrat', ok: 1 }], cellLab: 'Simmons +', prod: 'alcalin', prodCol: BT.alk, prodTxt: '#ffffff', vis: 'tube', from: SIMG, to: SIMB, ind: 'ABT: albastru = alcalin', res: 'albastru = Simmons +' },
    { k: 'precip', cellLab: 'germen H₂S +', lab: 'negru = H₂S + (sulfură de fier)' },
    { k: 'react', ins: [{ lab: 'citrat', ok: 0 }], cellLab: 'Simmons −', vis: 'tube', from: SIMG, to: SIMG, ind: 'ABT: verde', res: 'verde = Simmons −' },
    [{ k: 'react', ins: [{ lab: 'uree', ok: 0 }], cellLab: 'uree −', vis: 'tube', from: SOMON, to: SOMON, ind: 'roșu fenol', res: 'somon = uree −' }, { k: 'react', ins: [{ lab: 'uree', ok: 1 }], enz: 'urează', cellLab: 'uree +', prod: 'NH₃', prodCol: '#cfe8ff', vis: 'tube', from: SOMON, to: FUX, ind: 'roșu fenol', res: 'roz = uree +' }],
  ], {
    why: 'Citești tub cu tub: culoarea → ce reacție → + sau −. !!Albastru și roz = alcalin; galben = acid; negru = H₂S!!.',
  }),

  /* ---------- SIM și ABE de pe tablă ---------- */
  {
    scene: 'e_simabe', kick: 'Atlasul mediilor · de pe tablă (fără poză)', title: 'SIM și ABE: le recunoști după desen',
    hud: [],
    points: [
      { h: 'SIM: negru', d: ['!!H₂S +!! (fierul din mediu precipită sulfura)'] },
      { h: 'SIM: inel roșu Kovacs', d: ['!!indol +!! (galben = −) · tulbure din înțepătură = **mobil**'] },
      { h: 'ABE: negru', d: ['bila oprește majoritatea streptococilor', 'esculina hidrolizată + fier → negru → !!Enterococcus!!'] },
    ],
    why: 'Pe tablă: ABE → esculină + bilă → negru; SIM → negru și banda de hârtie de la dop (indolul).',
    beatDur: 7,
  },

  /* ---------- recapitularea ---------- */
  {
    scene: 'e_recap', kick: 'Atlasul mediilor · Recapitulare', title: 'Toate mediile, într-un tabel',
    hud: [],
    table: {
      head: ['Mediu', 'Tip', 'Cheia', 'Pozitiv', 'Germen tipic'],
      rows: [
        ['Geloză simplă', 'de bază', 'bulion + agar', '—', 'nepretențioși'],
        ['Geloză-sânge', 'complex', 'sânge 5–10%', 'α verde · β clar · γ nimic', 'streptococi, pneumococ'],
        ['Mueller-Hinton', 'standard', 'antibiogramă', 'zone de inhibiție', '—'],
        ['Sabouraud', 'special', 'glucoză, pH acid', 'colonii untoase', 'Candida'],
        ['Chapman / MSA', 'selectiv-dif.', 'NaCl 7,5% + manitol + roșu fenol', '!!galben!!', '!!S. aureus!!'],
        ['MacConkey', 'selectiv-dif.', 'săruri biliare + lactoză + roșu neutru', 'colonii roz', 'E. coli, Klebsiella (M)'],
        ['Geloză lactozată', 'diferențial', 'lactoză + ABT', 'galben (− albastru)', 'E. coli'],
        ['SS', 'selectiv-dif.', 'săruri biliare, verde briliant, fier', '!!centru negru (H₂S)!!', 'Salmonella (Shigella incoloră)'],
        ['TSI', 'diferențial', '3 zaharuri + roșu fenol + fier', 'galben = acid · negru = H₂S', 'A/A E. coli · K/A Salmonella'],
        ['Simmons', 'diferențial', 'citrat + ABT', '!!albastru!!', 'Klebsiella'],
        ['Uree', 'diferențial', 'uree + roșu fenol', 'roz', 'Proteus'],
        ['SIM · ABE', 'dif. · selectiv-dif.', 'fier, Kovacs · bilă + esculină', 'negru, inel roșu · negru', 'Enterococcus (ABE)'],
      ],
    },
    beatDur: 5,
  },
];
