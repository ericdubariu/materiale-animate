// Piesele 6–12 (Anatomie patologică, LP 1–2 · tulburări hemodinamice), animat.
// Textul vine din materialul OSPE al lui Eric (sinteza de morfopatologie UMFST + manual, în ordinea fișei oficiale).
// Ce e marcat „(manual)” nu apare în sinteză.

export const GLOS = [
  ['LP', 'lucrarea practică'], ['OSPE', 'examen practic structurat pe stații'], ['DD', 'diagnostic diferențial'], ['EN', 'termenul în engleză'], ['LA', 'termenul în latină'],
  ['a.', 'artera'], ['v.', 'vena'], ['VS', 'ventriculul stâng'], ['VD', 'ventriculul drept'], ['AD', 'atriul drept'], ['AS', 'atriul stâng'], ['TVP', 'tromboza venoasă profundă'],
  ['VCI', 'vena cavă inferioară'], ['HTA', 'hipertensiunea arterială'], ['HTP', 'hipertensiunea pulmonară'], ['HTIC', 'hipertensiunea intracraniană'], ['IMA', 'infarctul miocardic acut'],
  ['NTA', 'necroza tubulară acută'], ['IRA', 'insuficiența renală acută'], ['RAA', 'sistemul renină-angiotensină-aldosteron'], ['DSA', 'defect septal atrial'], ['DSV', 'defect septal ventricular'],
  ['IC', 'insuficiența cardiacă'], ['TA', 'tensiunea arterială'], ['p', 'punct(e)'], ['TEP', 'trombembolismul pulmonar'], ['t-PA', 'activatorul tisular al plasminogenului (Actilyse)'], ['FiV', 'fibrilația ventriculară'], ['UMFST', 'Universitatea de Medicină, Farmacie, Științe și Tehnologie din Târgu Mureș'], ['S1', 'seminarul 1 al disciplinei (Tulburări circulatorii)'], ['ATN', 'acute tubular necrosis (necroza tubulară acută)'], ['TISRCAIMIS', 'mnemonic pentru complicațiile IMA'],
];
export const TERMS = [
  ['friabil', 'friabil', 'se rupe, se fărâmițează ușor'],
  ['mural', 'mural (parietal)', 'lipit de perete, nu astupă tot lumenul'],
  ['obturant', 'obturant', 'astupă complet lumenul'],
  ['Zahn', 'liniile Zahn', 'straturi alternante trombocite + fibrină / hematii: dovada că trombul s-a format în sângele care circula'],
  ['cuneiform', 'cuneiform', 'în formă de pană (triunghi)'],
  ['lizereu', 'lizereu', 'margine îngustă, de altă culoare'],
  ['decapsule', 'se decapsulează', 'capsula se desprinde ușor de pe rinichi'],
  ['diapedez', 'diapedeză', 'ieșirea hematiilor prin peretele vasului intact'],
  ['miomalac', 'miomalacie', 'înmuierea miocardului necrozat sub acțiunea enzimelor proteolitice'],
  ['transmural', 'transmural', 'pe toată grosimea peretelui'],
  ['hemopericard', 'hemopericard', 'sânge în sacul pericardic'],
  ['tamponad', 'tamponadă', 'sângele din pericard comprimă inima'],
  ['hialiniz', 'hialinizat', 'perete îngroșat cu material roz omogen, rigid și fragil'],
  ['per rhexin', 'per rhexin', 'prin ruperea peretelui vasului'],
  ['efect de masă', 'efect de masă', 'hematomul împinge structurile din jur'],
  ['hernier', 'herniere', 'o porțiune de creier e împinsă printr-un orificiu (ex. tonsilele cerebeloase prin foramen magnum) și comprimă trunchiul'],
  ['anfractuos', 'anfractuos', 'cu contur neregulat, zimțat'],
  ['paradoxal', 'embolie paradoxală', 'embolul venos trece în circulația sistemică printr-un defect septal'],
  ['pielonefrit', 'pielonefrită', 'infecția bacteriană a rinichiului (bazinet + parenchim)'],
  ['hepatizați', 'hepatizație', 'plămânul consolidat devine ferm și roșu, ca ficatul'],
  ['oligurie', 'oligurie', 'urină puțină (< 400 ml/zi)'],
  ['crepit', 'crepită', 'plămânul normal „pârâie” la apăsare, din cauza aerului'],
  ['pseudochist', 'pseudochist', 'cavitate fără epiteliu, rămasă după resorbția sângelui'],
  ['coronal', 'secțiune coronală', 'secțiune frontală, din față'],
];

/* ---------- marcajele de pe pozele reale (pixeli în imaginea originală) ---------- */
const M = {
  lp_p6: [
      { x: 165, y: 245, rx: 55, ry: 40, lab: 'intima aortei' },
      { x: 262, y: 340, rx: 58, ry: 58, lab: 'plăci aterosclerotice' },
      { x: 300, y: 860, rx: 85, ry: 150, lab: 'tromb parietal' },
  ],
  lp_p7: [
      { x: 260, y: 170, rx: 135, ry: 95, lab: 'aorta abdominală' },
      { x: 150, y: 620, rx: 100, ry: 110, lab: 'a. iliacă comună' },
      { x: 385, y: 455, rx: 105, ry: 60, rot: 0.4, lab: 'tromb călare pe bifurcație' },
      { x: 520, y: 650, rx: 70, ry: 110, rot: -0.35, lab: 'trombul intră în a. iliacă' },
  ],
  lp_p8: [
      { x: 420, y: 180, rx: 150, ry: 120, lab: 'zona de infarct', ly: 30 },
      { x: 350, y: 320, rx: 140, ry: 30, rot: 0.1, dash: true, lab: 'lizereu congestiv' },
      { x: 400, y: 560, rx: 160, ry: 100, lab: 'parenchim renal normal' },
  ],
  lp_p9_b: [
      { x: 590, y: 220, rx: 250, ry: 130, lab: 'plămân cu stază cronică (indurație brună)' },
      { x: 1150, y: 250, rx: 200, ry: 120, lab: 'a doua secțiune prin plămân' },
  ],
  lp_p10_c: [
      { x: 270, y: 230, rx: 140, ry: 150, lab: 'zonă hiperemică, negricioasă' },
      { x: 420, y: 300, rx: 28, ry: 130, lab: 'peretele VS' },
      { x: 280, y: 550, rx: 90, ry: 50, lab: 'VD' },
  ],
  lp_p10_b: [
      { x: 845, y: 480, rx: 45, ry: 130, lab: 'zonă hiperemică (12–24 h)' },
      { x: 545, y: 590, rx: 60, ry: 55, lab: 'zonă hiperemică' },
  ],
  lp_p11: [
      { x: 220, y: 415, rx: 90, ry: 45, lab: 'hematom intraventricular și intracerebral' },
      { x: 270, y: 240, rx: 120, ry: 40, lab: 'sânge în ventriculii laterali' },
      { x: 430, y: 480, rx: 60, ry: 50, lab: 'creier' },
  ],
  lp_p11_b: [
      { x: 200, y: 300, rx: 70, ry: 50, lab: 'creier' },
      { x: 170, y: 600, rx: 110, ry: 130, lab: 'hematom subarahnoidian' },
  ],
  lp_p11_c: [
      { x: 488, y: 300, rx: 18, ry: 40, lab: 'craniu secționat' },
      { x: 330, y: 340, rx: 75, ry: 35, lab: 'dura mater' },
      { x: 360, y: 620, rx: 90, ry: 100, lab: 'hematom subdural' },
  ],
  lp_p12_b: [
      { x: 222, y: 700, rx: 32, ry: 72, lab: 'corticala renală palidă · 1', lx: 200, ly: 880 },
      { x: 312, y: 680, rx: 55, ry: 70, lab: 'medulara renală hiperemică · 2', ly: 590 },
      { x: 380, y: 472, rx: 70, ry: 55, lab: 'pelvis renal · 3' },
      { x: 722, y: 702, rx: 14, ry: 70, rot: 0.68, dash: true, lab: 'limita netă corticală / medulară' },
  ],
};
export const MARKS = M;
const Z = (img, k, cap) => ({ img: `z_${img}_${k}`, cap });
const SZ = { lp_p6: [435, 1110], lp_p7: [862, 880], lp_p8: [800, 820], lp_p9_b: [1430, 550], lp_p10_c: [530, 700], lp_p10_b: [1096, 822], lp_p11: [563, 608], lp_p11_b: [534, 800], lp_p11_c: [577, 771], lp_p12_b: [954, 952] };
const atlasS = (img) => ({ img, W: SZ[img][0], H: SZ[img][1], marks: M[img] });
const P = (img, cap) => ({ img, cap });
const D = (h, ...d) => ({ h, d });

export const SLIDES = [
  {
    deckName: 'Anatomie patologică · Piesele 6–12 · animat',
    scene: 'cover', kick: 'Anatomie patologică · LP 1–2 · Piesele 6–12 · OSPE', title: 'Șapte piese de tulburări hemodinamice, dintr-o privire',
    hud: ['piese macroscopice'],
    points: [
      D('6 · Aortă cu tromb parietal', 'tromb !!aderent!! pe intima cu plăci aterosclerotice'),
      D('7 · Tromb călăreț', 'tromb !!călare pe bifurcația aortei!!, în ambele a. iliace'),
      D('8 · Infarct renal', 'zonă **palidă**, conturată de **lizereu congestiv**'),
      D('9 · Infarct pulmonar', 'zonă !!triunghiulară, roșie-negricioasă!!, vârful spre hil'),
      D('10 · Infarct miocardic', '**zonă hiperemică** (12–24 h) în peretele VS'),
      D('11 · Hemoragii intracraniene', 'hematom **intracerebral + intraventricular**'),
      D('12 · Rinichi de șoc', 'corticală **palidă**, medulară **hiperemică**'),
    ],
    why: 'Descrii mereu în ordine: **dimensiune, formă, culoare, consistență, suprafață, pe secțiune**, dar spui doar ce vezi și ce scrie în LP. Pozele: preparatele de la LP (borcanele de la examen).',
    beatDur: 5,
  },
  {
    scene: 'fisaPiesa', kick: 'LP 1–2 · Formatul OSPE · Piese', title: 'Fișa oficială: cum se punctează o piesă',
    hud: ['fișa O.S.P.E. Morfopatologie'],
    points: [
      D('Rubrica 1 vine prima, mereu', '!!organ + leziune + definiție!! = 3 p, marcate **OBLIGATORIU**', 'o spui din primul minut, n-o sari niciodată'),
      D('Descrierea: buline = puncte', 'piesa: ce vezi, în ordine (formă, culoare, consistență, pe secțiune)', 'fiecare idee separată = !!1 punct!!; le spui ca pe o listă'),
      D('Cauze și complicații', 'o bulină = 1 punct; **mecanismul nu are rubrică**', 'îl folosești doar ca să legi cauza → leziunea → complicațiile'),
      D('Diagnosticul diferențial', 'un preparat de pe listă: **1 asemănare + 3 diferențe** + 2 alternative'),
      D('Stația: 7 minute', '1 de citit, 6 de vorbit; contează doar ce spui **cu voce tare**', '**minim 5 p**: 3 din rubrica 1 + 2 buline'),
    ],
    warn: 'Examinatorul tace și anunță doar ultimul minut. Nu pierde timp pe patogeneză lungă.',
    beatDur: 6,
  },

  // ======================= PIESA 6 · AORTĂ CU TROMB PARIETAL
  {
    scene: 'aortaRec', kick: 'Piesa 6 · Aortă cu tromb parietal · descrierea', title: 'Un tromb lipit de intima cu plăci aterosclerotice',
    hud: ['Piesa 6 (1 din 7)', 'aorta abdominală + iliace, deschise'],
    points: [
      D('Tromb parietal', 'masă !!aderentă de peretele aortei!!: tromb mixt stratificat'),
      D('Intima aortei', 'suprafața internă, deschisă longitudinal'),
      D('Plăci aterosclerotice', 'pe intimă: !!ateroscleroză!!; pe ele s-a format trombul'),
    ],
    why: 'Tromboza = !!coagulare intravasculară și intravitală!!. EN: aorta with atherosclerosis and mural thrombus · LA: thrombus parietalis.',
    insets: [Z('lp_p6', 2, 'Trombul parietal, piesa de la LP'), Z('lp_p6', 0, 'Intima, piesa de la LP'), Z('lp_p6', 1, 'Plăci aterosclerotice, piesa de la LP')],
    beatDur: 6.5,
    xtra: 'Trombul parietal căptușește peretele și lasă lumenul liber; dacă astupă complet vasul, se numește obturant. Pe piesa fixată culoarea e brun-cenușie.',
  },
  {
    scene: 'aortaWhy', anim: true, spec: 'Aorta în secțiune longitudinală, cu fluxul de hematii și trombocite de la stânga la dreapta. 1: placa ulcerată pe intimă; 2: deasupra plăcii fluxul devine turbulent (vârtejuri albe); 3: trombul parietal crește în straturi pe placă; 4: un fragment se desprinde și pleacă spre dreapta (distal), săgeată galbenă. Se oprește cu fragmentul ajuns în dreapta.', kick: 'Piesa 6 · De ce arată așa?', title: 'Trombul pe placa aterosclerotică: triada Virchow în aortă',
    hud: ['patogenia'],
    points: [
      D('Leziune endotelială', 'placa aterosclerotică lezează intima: primul element din !!triada Virchow!!'),
      D('Flux sanguin anormal', 'al doilea element; al treilea: **status hipercoagulant**'),
      D('Tromb parietal', 'straturi alternante de trombocite + fibrină și de hematii: **tromb mixt stratificat**'),
      D('Embolizarea', 'trombii arteriali !!migrează distal de cord!!, până într-un ram mai mic → **infarct**'),
    ],
    why: 'Trombii arteriali cresc **retrograd** față de punctul de atașare. Evoluția trombului: !!propagare · embolizare · dizolvare (t-PA) · organizare/recanalizare!!.',
    beatDur: 6.5,
    xtra: 'Aorta e largă și fluxul e rapid, așa că trombul parietal nu închide lumenul. Fragmentele desprinse ajung mai ales în membrele inferioare.',
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'aorta', b: 'embol', l: 'Aortă cu tromb parietal (piesa ta)', r: 'tromb călăreț (bifurcația aortei)' },
    kick: 'Piesa 6 · Diagnostic diferențial', title: 'Cu ce o compari: Tromb călăreț',
    hud: ['1 asemănare + 3 diferențe'],
    points: [
      D('Asemănarea', 'Ambele: aortă cu tromb aderent de perete (coagulare intravasculară și intravitală).'),
      D('Diferența 1', 'La mine trombul e !!parietal!!, pe peretele aortei; la trombul călăreț trombul stă călare pe bifurcația aortei.'),
      D('Diferența 2', 'La mine trombul e lipit de peretele aortei (parietal); la trombul călăreț intră în !!ambele artere iliace comune!!.'),
      D('Diferența 3', 'La mine se văd !!plăcile aterosclerotice!! ale intimei; la trombul călăreț piesa arată mai ales trombul mixt stratificat, mat, friabil.'),
    ],
    alt: ['**Pericardită fibrinoasă**: Depozite neregulate de fibrină pe suprafața pericardului, aspect de „limbă de pisică”; la mine trombul e pe intima aortei.', '**Hemoragii intracraniene**: Sânge extravazat (hematom) în parenchimul cerebral și în ventricul; la mine sângele a coagulat intravital, în lumenul aortei.'],
    insets: [P('lp_p6', 'Piesa 6 de la LP: Aortă cu tromb parietal'), P('lp_p7', 'Piesa 7 de la LP: Tromb călăreț'), P('lp_p7', 'Piesa 7 de la LP: Tromb călăreț'), P('lp_p7', 'Piesa 7 de la LP: Tromb călăreț')],
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'aorta' }, layout: 'script', kick: 'Piesa 6 · Fișa OSPE · aortă cu tromb', title: 'Ce spui cu voce tare: aorta cu tromb parietal',
    hud: ['răspunsul-model, în ordinea fișei'],
    script: [
      { tm: 'Organ', at: '1 p', tx: '!!Aortă!! (deschisă longitudinal).' },
      { tm: 'Leziune', at: '1 p', tx: '!!Aortă cu ateroscleroză și tromb parietal!!.' },
      { tm: 'Definiție', at: '1 p', tx: 'Tromboza = !!coagulare intravasculară și intravitală!!; trombul parietal e aderent de peretele aortei.' },
      { tm: 'Descriere', at: '3 p', tx: '● **intima aortei** ● pe intimă: **plăci aterosclerotice** ● pe perete: !!tromb parietal!!, aderent (tromb mixt stratificat).' },
      { tm: 'Cauze', at: '3 p', tx: '● triada Virchow: **leziunea endotelială** (placa aterosclerotică) ● **fluxul sanguin anormal** ● **statusul hipercoagulant**.' },
      { tm: 'Complicații', at: '4 p', tx: '● **propagarea** (trombii arteriali cresc retrograd) ● **embolizarea**: migrează distal de cord, obstruă un ram mai mic → **infarct** ● **dizolvarea** (fibrinolitici: t-PA) ● **organizarea/recanalizarea** (înglobare în perete, capilare în tromb).' },
      { tm: 'DD', at: '✓', tx: 'Cu **Tromb călăreț**. Asemănare: Ambele: aortă cu tromb aderent de perete (coagulare intravasculară și intravitală). Diferențe: ① La mine trombul e parietal, pe peretele aortei; la trombul călăreț trombul stă călare pe bifurcația aortei. ② La mine trombul e lipit de peretele aortei (parietal); la trombul călăreț intră în ambele artere iliace comune. ③ La mine se văd plăcile aterosclerotice ale intimei; la trombul călăreț piesa arată mai ales trombul mixt stratificat, mat, friabil.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **aortă cu ateroscleroză și tromb parietal**.' },
    ],
    durs: [4, 6, 12, 20, 18, 30, 40, 5],
  },
  {
    scene: 'atlas', sceneOpts: atlasS('lp_p6'), kick: 'Piesa 6 · Pe piesa de la LP', title: 'Aorta cu tromb: ce arăți',
    hud: ['piesa de la LP'],
    points: [D('Intima aortei', 'suprafața internă, deschisă'), D('Plăci aterosclerotice', 'pe intimă: !!ateroscleroză!!'), D('Trombul parietal', 'masă !!aderentă!! pe intimă')],
    why: 'Poza: piesa de la LP (preparatul de la examen).',
  },

  // ======================= PIESA 7 · TROMB CĂLĂREȚ
  {
    scene: 'embolRec', kick: 'Piesa 7 · Tromb călăreț · descrierea', title: 'Un tromb călare pe bifurcația aortei, cu câte un capăt în fiecare a. iliacă',
    hud: ['Piesa 7 (2 din 7)', 'aorta abdominală + iliace comune, deschise'],
    points: [
      D('Aorta abdominală', 'și !!bifurcația ei în cele două artere iliace comune!!'),
      D('Arterele iliace comune', 'dreaptă și stângă, deschise'),
      D('Trombul', '!!călare pe bifurcația aortei!!: intră în ambele iliace'),
      D('Aspectul trombului', '!!tromb mixt stratificat, aderent, mat, friabil!!'),
    ],
    why: 'EN: saddle thrombus · LA: thrombus equitans.',
    insets: [Z('lp_p7', 0, 'Aorta abdominală, piesa de la LP'), Z('lp_p7', 1, 'A. iliacă comună, piesa de la LP'), Z('lp_p7', 2, 'Trombul călare pe bifurcație'), Z('lp_p7', 3, 'Trombul în a. iliacă, piesa de la LP')],
    beatDur: 6.5,
    xtra: 'Numele vine de la poziție: trombul „încalecă” bifurcația, cu câte un capăt în fiecare arteră iliacă. Desenul e o schemă: pe piesa reală trombul e verde-cenușiu din cauza fixării.',
  },
  {
    scene: 'embolWhy', anim: true, spec: 'Bifurcația aortei văzută din față, cu fluxul în jos. 1: trombul pe bifurcație, fluxul arterial scade; 2: trombul crește retrograd, în sus pe aortă; 3: se prelungește în ambele artere iliace (călare); 4: un fragment se desprinde din coada iliacă stângă și coboară distal. Se oprește cu fragmentul coborât.', kick: 'Piesa 7 · De ce arată așa?', title: 'Un tromb arterial care crește în sus și trimite fragmente în jos',
    hud: ['trombul arterial'],
    points: [
      D('Tromboza', '!!coagulare intravasculară și intravitală!!: triada Virchow (leziune endotelială, flux anormal, hipercoagulabilitate)'),
      D('Crește retrograd', 'trombii arteriali cresc !!retrograd!! față de punctul de atașare (contra fluxului)'),
      D('Călare pe bifurcație', 'trombul ocupă bifurcația și intră în **ambele artere iliace comune**'),
      D('Embolizarea', 'fragmentele migrează !!distal!!, în direcția fluxului arterial, până într-un ram mai mic → **infarct**'),
    ],
    why: 'Evoluția trombului: **propagare · embolizare · dizolvare · organizare/recanalizare**.',
    beatDur: 6.5,
    xtra: 'Pe bifurcație fluxul se desparte în două, iar trombul format aici se poate întinde în ambele ramuri.',
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'embol', b: 'aorta', l: 'Tromb călăreț (piesa ta)', r: 'aortă cu tromb parietal' },
    kick: 'Piesa 7 · Diagnostic diferențial', title: 'Cu ce o compari: Aortă cu tromb parietal',
    hud: ['1 asemănare + 3 diferențe'],
    points: [
      D('Asemănarea', 'Ambele: aortă cu tromb aderent de perete (coagulare intravasculară și intravitală).'),
      D('Diferența 1', 'La mine trombul stă !!călare pe bifurcația aortei!!; la aortă trombul e parietal, pe peretele aortei.'),
      D('Diferența 2', 'La mine trombul intră în !!ambele artere iliace comune!!; la aortă trombul e lipit de peretele aortei (parietal).'),
      D('Diferența 3', 'La mine piesa arată trombul !!mixt stratificat, mat, friabil!!; la aortă se văd și plăcile aterosclerotice ale intimei.'),
    ],
    alt: ['**Infarct pulmonar**: Zonă triunghiulară, roșie-negricioasă, în plămân, cu vârful spre vasul obstrucționat; la mine trombul e în lumenul aortei.', '**Hemoragii intracraniene**: Sânge extravazat în parenchimul cerebral și în ventricul; la mine sângele a coagulat intravital, în aortă.'],
    insets: [P('lp_p7', 'Piesa 7 de la LP: Tromb călăreț'), P('lp_p6', 'Piesa 6 de la LP: Aortă cu tromb parietal'), P('lp_p6', 'Piesa 6 de la LP: Aortă cu tromb parietal'), P('lp_p6', 'Piesa 6 de la LP: Aortă cu tromb parietal')],
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'embol' }, layout: 'script', kick: 'Piesa 7 · Fișa OSPE · tromb călăreț', title: 'Ce spui cu voce tare: trombul călăreț',
    hud: ['răspunsul-model, în ordinea fișei'],
    script: [
      { tm: 'Organ', at: '1 p', tx: '!!Aorta abdominală!!, cu bifurcația în arterele iliace comune.' },
      { tm: 'Leziune', at: '1 p', tx: '!!Tromb călăreț!! (tromb călare pe bifurcația aortei).' },
      { tm: 'Definiție', at: '1 p', tx: 'Tromboza = !!coagulare intravasculară și intravitală!!; trombul călăreț stă călare pe bifurcația aortei.' },
      { tm: 'Descriere', at: '4 p', tx: '● **aorta abdominală** și **bifurcația** în cele două artere iliace comune ● trombul stă **călare pe bifurcație** ● se extinde în **ambele artere iliace comune** ● !!tromb mixt stratificat, aderent, mat, friabil!!.' },
      { tm: 'Cauze', at: '3 p', tx: '● triada Virchow: **leziunea endotelială** ● **fluxul sanguin anormal** ● **statusul hipercoagulant**.' },
      { tm: 'Complicații', at: '4 p', tx: '● **propagarea** (trombii arteriali cresc retrograd) ● **embolizarea**: fragmentele migrează distal, obstruă un ram mai mic → **infarct** ● **dizolvarea** (t-PA) ● **organizarea/recanalizarea**.' },
      { tm: 'DD', at: '✓', tx: 'Cu **Aortă cu tromb parietal**. Asemănare: Ambele: aortă cu tromb aderent de perete (coagulare intravasculară și intravitală). Diferențe: ① La mine trombul stă călare pe bifurcația aortei; la aortă trombul e parietal, pe peretele aortei. ② La mine trombul intră în ambele artere iliace comune; la aortă trombul e lipit de peretele aortei (parietal). ③ La mine piesa arată trombul mixt stratificat, mat, friabil; la aortă se văd și plăcile aterosclerotice ale intimei.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **tromb călăreț pe bifurcația aortei**.' },
    ],
    durs: [4, 6, 12, 25, 18, 28, 40, 5],
  },
  {
    scene: 'atlas', sceneOpts: atlasS('lp_p7'), kick: 'Piesa 7 · Pe piesa de la LP', title: 'Trombul călăreț pe piesa de la LP: ce arăți',
    hud: ['piesa de la LP · fixată'],
    points: [D('Aorta abdominală', 'și bifurcația ei'), D('A. iliacă comună', 'de ambele părți'), D('Trombul', '!!călare pe bifurcație!!'), D('Trombul în iliacă', '!!mixt stratificat, aderent, mat, friabil!!')],
    why: 'Poza: piesa de la LP. Culoarea verde-cenușie vine de la fixare.',
  },

  // ======================= PIESA 8 · INFARCT RENAL
  {
    scene: 'renRec', kick: 'Piesa 8 · Infarct renal · descrierea', title: 'O zonă palidă, conturată de un lizereu congestiv',
    hud: ['Piesa 8 (3 din 7)', 'rinichi secționat longitudinal'],
    points: [
      D('Zona de infarct', '!!palidă (infarct alb, anemic)!!, **bine conturată**'),
      D('Vizibilă pe suprafața externă', 'zona se vede și pe **suprafața externă** a rinichiului'),
      D('Lizereul congestiv', '!!bandă congestivă!! care conturează zona'),
      D('Parenchimul renal normal', 'restul rinichiului'),
    ],
    why: 'Rinichiul = organ parenchimatos cu !!circulație unică!! → infarct alb. EN: renal infarct · LA: infarctus renis anaemicus.',
    insets: [Z('lp_p8', 0, 'Zona de infarct, piesa de la LP'), P('lp_p8_b', 'Piesa de la LP, în borcan'), Z('lp_p8', 1, 'Lizereul congestiv, piesa de la LP'), Z('lp_p8', 2, 'Parenchim normal, piesa de la LP')],
    beatDur: 6.5,
    xtra: 'Arterele renale sunt terminale: teritoriul unei ramuri are formă de piramidă, cu baza la capsulă și vârful la vasul blocat. Cu timpul zona devine o cicatrice retractată.',
  },
  {
    scene: 'renWhy', anim: true, spec: 'Atriul stâng cu tromb + rinichiul cu teritorii conice (baza la capsulă) și arborele arterial terminal. 1: embolul pleacă din AS pe artera renală; 2: se oprește la vârful conului superior, ramurile lui devin gri („ocluzie la vârful conului”); 3: conul devine palid (infarct alb); 4: marginea lui se înroșește (lizereu congestiv). Se oprește pe starea finală.', labelText: ['AS'], kick: 'Piesa 8 · De ce arată așa?', title: 'Ramura obstruată și circulația unică: infarctul alb',
    hud: ['patogenia'],
    points: [
      D('Tromb / embol arterial', 'trombii arteriali !!migrează distal de cord!!, până într-un ram mai mic decât ei'),
      D('Ramura care deservește teritoriul', 'e obstruată: teritoriul rămâne fără sânge'),
      D('Infarct alb', 'organ parenchimatos cu !!circulație unică!! → infarct alb (anemic, ischemic)'),
      D('Lizereul congestiv', '!!capilare congestionate + infiltrat inflamator acut!! la limită'),
    ],
    why: 'Corespondentul microscopic e **lama 3**: aspect fantomatic, pierderea nucleilor cu păstrarea arhitecturii.',
    beatDur: 6.5,
    xtra: 'Pe desen embolul pleacă din atriul stâng: inima stângă e locul de unde pleacă de obicei trombii care ajung în arterele renale.',
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'ren', b: 'pulm', l: 'Infarct renal (piesa ta)', r: 'infarct pulmonar' },
    kick: 'Piesa 8 · Diagnostic diferențial', title: 'Cu ce o compari: Infarct pulmonar',
    hud: ['1 asemănare + 3 diferențe'],
    points: [
      D('Asemănarea', 'Ambele: infarct = necroza unui țesut prin aport insuficient de sânge oxigenat; zonă bine delimitată.'),
      D('Diferența 1', 'La mine infarct !!alb (anemic)!!, zonă palidă; la infarctul pulmonar zona e roșie-negricioasă (hemoragic).'),
      D('Diferența 2', 'La mine rinichiul are !!circulație unică!!; plămânul are circulație dublă, iar infarctul apare doar pe stază cronică.'),
      D('Diferența 3', 'La mine zona e conturată de un !!lizereu congestiv!!, vizibilă pe suprafața externă; la infarctul pulmonar parenchimul din jur are stază cronică (indurație brună).'),
    ],
    alt: ['**Rinichi de șoc**: Toată corticala palidă, bine delimitată de medulara hiperemică; la mine o singură zonă de infarct, cu lizereu congestiv.', '**Litiază renală**: Calculi coraliformi, calice dilatate, parenchim atrofic (hidronefroză); la mine zonă de necroză, fără calculi.'],
    insets: [P('lp_p8', 'Piesa 8 de la LP: Infarct renal'), P('lp_p9_b', 'Piesa 9 de la LP: Infarct pulmonar'), P('lp_p9_b', 'Piesa 9 de la LP: Infarct pulmonar'), P('lp_p9_b', 'Piesa 9 de la LP: Infarct pulmonar')],
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'ren' }, layout: 'script', kick: 'Piesa 8 · Fișa OSPE · infarct renal', title: 'Ce spui cu voce tare: infarctul renal',
    hud: ['răspunsul-model, în ordinea fișei'],
    script: [
      { tm: 'Organ', at: '1 p', tx: '!!Rinichi!! (secționat).' },
      { tm: 'Leziune', at: '1 p', tx: '!!Infarct renal acut (alb, anemic, ischemic)!!.' },
      { tm: 'Definiție', at: '1 p', tx: '!!Necroza unei porțiuni din parenchimul renal, datorită obstrucției ramurii arteriale care deservește teritoriul respectiv!!.' },
      { tm: 'Descriere', at: '4 p', tx: '● **zonă de infarct palidă**, bine conturată ● vizibilă și pe **suprafața externă** a rinichiului ● conturată de **lizereul congestiv** ● restul: **parenchim renal normal**.' },
      { tm: 'Cauze', at: '2 p', tx: '● **obstrucția ramurii arteriale** (tromb/embol: trombii arteriali migrează distal de cord) ● rinichiul are **circulație unică** → infarct alb.' },
      { tm: 'Complicații', at: '—', tx: 'LP nu dă complicații pentru infarctul renal.' },
      { tm: 'DD', at: '✓', tx: 'Cu **Infarct pulmonar**. Asemănare: Ambele: infarct = necroza unui țesut prin aport insuficient de sânge oxigenat; zonă bine delimitată. Diferențe: ① La mine infarct alb (anemic), zonă palidă; la infarctul pulmonar zona e roșie-negricioasă (hemoragic). ② La mine rinichiul are circulație unică; plămânul are circulație dublă, iar infarctul apare doar pe stază cronică. ③ La mine zona e conturată de un lizereu congestiv, vizibilă pe suprafața externă; la infarctul pulmonar parenchimul din jur are stază cronică (indurație brună).' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **infarct renal acut, anemic**.' },
    ],
    durs: [4, 5, 16, 22, 15, 6, 40, 4],
  },
  {
    scene: 'atlas', sceneOpts: atlasS('lp_p8'), kick: 'Piesa 8 · Pe piesa de la LP', title: 'Infarctul renal: ce arăți',
    hud: ['piesa de la LP'],
    points: [D('Zona de infarct', '!!palidă!!, bine conturată, vizibilă pe suprafața externă'), D('Lizereul', '!!congestiv!!, la margine'), D('Parenchimul normal', 'restul rinichiului')],
    why: 'Poza: piesa de la LP (preparatul de la examen).',
  },

  // ======================= PIESA 9 · INFARCT PULMONAR
  {
    scene: 'pulmRec', kick: 'Piesa 9 · Infarct pulmonar · descrierea', title: 'O zonă triunghiulară roșie-negricioasă, cu vârful spre hil',
    hud: ['Piesa 9 (4 din 7)', 'plămân secționat'],
    points: [
      D('Forma', 'pe secțiune !!triunghiulară!!, cu **vârful spre hil** (spre vasul obstrucționat)'),
      D('Culoarea și limita', '!!roșie-negricioasă!!, **margini bine delimitate**'),
      D('Plămânul din jur', '!!stază cronică (indurație brună)!!: greutate crescută, culoare brună (siderofage), consistență fermă'),
    ],
    why: 'Infarct **roșu (hemoragic)**: plămânul are circulație dublă, iar infarctul apare doar pe o stază cronică preexistentă. EN: hemorrhagic pulmonary infarct · LA: infarctus pulmonis haemorrhagicus.',
    insets: [P('lp_p9_b', 'Piesa de la LP (borcanul 002)'), P('lp_p9_b', 'Piesa de la LP (borcanul 002)'), Z('lp_p9_b', 0, 'Stază cronică, piesa de la LP')],
    beatDur: 6.5,
    xtra: 'Plămânul e lax: sângele intră în zona moartă, de aceea infarctul e roșu, nu alb. Pe piesa din LP se vede și traheea, ca reper.',
  },
  {
    scene: 'pulmWhy', anim: true, spec: 'Plămân cu stază cronică. 1: embolul coboară pe o ramură a arterei pulmonare și se oprește; 2: apare artera bronșică roșie, care aduce sânge în zona moartă; 3: zona triunghiulară, cu baza la pleură, se colorează roșu-negricios; 4: în jur rămâne staza cronică. Se oprește pe starea finală.', kick: 'Piesa 9 · De ce arată așa?', title: 'Embolul, circulația dublă și staza cronică',
    hud: ['patogenia'],
    points: [
      D('TEP', 'trombul din **TVP** migrează spre cord și obstruă !!o ramură a arterei pulmonare!!'),
      D('Circulația dublă', 'normal, **ramurile bronșice suplinesc parțial debitul**: infarctul nu se produce'),
      D('Pe stază cronică', '!!presiunea crescută împiedică vascularizarea compensatorie!! → infarct roșu, triunghiular'),
      D('Plămânul din jur', 'stază cronică = !!indurație brună!!'),
    ],
    why: 'Corespondentul microscopic: **lama 2** (stază cronică + infarct).',
    beatDur: 6.5,
    xtra: 'Sângele care inundă zona moartă vine prin arterele bronșice; de aceea zona e roșie-negricioasă.',
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'pulm', b: 'ren', l: 'Infarct pulmonar (piesa ta)', r: 'infarct renal' },
    kick: 'Piesa 9 · Diagnostic diferențial', title: 'Cu ce o compari: Infarct renal',
    hud: ['1 asemănare + 3 diferențe'],
    points: [
      D('Asemănarea', 'Ambele: infarct = necroza unui țesut prin aport insuficient de sânge oxigenat; zonă bine delimitată.'),
      D('Diferența 1', 'La mine zona e !!roșie-negricioasă!! (hemoragic); la infarctul renal zona e palidă (alb, anemic).'),
      D('Diferența 2', 'La mine plămânul are !!circulație dublă!! și infarctul apare doar pe stază cronică; rinichiul are circulație unică.'),
      D('Diferența 3', 'La mine parenchimul din jur are !!stază cronică (indurație brună)!!; la infarctul renal zona e conturată de un lizereu congestiv, restul rinichiului e normal.'),
    ],
    alt: ['**Bronhopneumonie**: Focare de condensare multiple, bilaterale, roșu închis, separate de parenchim aerat; la mine o singură zonă triunghiulară, cu vârful spre hil.', '**Tromb călăreț**: Tromb călare pe bifurcația aortei; la mine zona de necroză e în parenchimul pulmonar.'],
    insets: [P('lp_p9_b', 'Piesa 9 de la LP: Infarct pulmonar'), P('lp_p8', 'Piesa 8 de la LP: Infarct renal'), P('lp_p8', 'Piesa 8 de la LP: Infarct renal'), P('lp_p8', 'Piesa 8 de la LP: Infarct renal')],
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'pulm' }, layout: 'script', kick: 'Piesa 9 · Fișa OSPE · infarct pulmonar', title: 'Ce spui cu voce tare: infarctul pulmonar',
    hud: ['răspunsul-model, în ordinea fișei'],
    script: [
      { tm: 'Organ', at: '1 p', tx: '!!Plămân!! (secționat).' },
      { tm: 'Leziune', at: '1 p', tx: '!!Infarct pulmonar (roșu, hemoragic)!!, pe plămân cu stază cronică.' },
      { tm: 'Definiție', at: '1 p', tx: 'Infarctul = !!necroza unui țesut cauzată de aportul insuficient de sânge oxigenat!!; în plămân apare doar pe o stază cronică preexistentă.' },
      { tm: 'Descriere', at: '4 p', tx: '● zonă de infarct, pe secțiune **triunghiulară**, cu **vârful spre hil** (vasul obstrucționat) ● **margini bine delimitate** ● culoare **roșie-negricioasă** ● plămânul din jur: **stază cronică (indurație brună)**: greutate crescută, brun (siderofage), consistență fermă.' },
      { tm: 'Cauze', at: '3 p', tx: '● **obstrucția unei ramuri a arterei pulmonare (TEP)**, cu trombul migrat dintr-o TVP ● **stază pulmonară cronică preexistentă** ● presiunea crescută împiedică suplinirea prin ramurile bronșice.' },
      { tm: 'Complicații', at: '—', tx: 'LP nu dă complicații pentru infarctul pulmonar.' },
      { tm: 'DD', at: '✓', tx: 'Cu **Infarct renal**. Asemănare: Ambele: infarct = necroza unui țesut prin aport insuficient de sânge oxigenat; zonă bine delimitată. Diferențe: ① La mine zona e roșie-negricioasă (hemoragic); la infarctul renal zona e palidă (alb, anemic). ② La mine plămânul are circulație dublă și infarctul apare doar pe stază cronică; rinichiul are circulație unică. ③ La mine parenchimul din jur are stază cronică (indurație brună); la infarctul renal zona e conturată de un lizereu congestiv, restul rinichiului e normal.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **infarct pulmonar hemoragic, pe plămân de stază cronică**.' },
    ],
    durs: [4, 6, 16, 28, 20, 6, 40, 4],
  },
  {
    scene: 'atlas', sceneOpts: atlasS('lp_p9_b'), kick: 'Piesa 9 · Pe piesa de la LP', title: 'Plămânul cu stază și infarct: ce arăți',
    hud: ['piesa de la LP · borcanul 002'],
    points: [D('Plămânul cu stază cronică', '!!indurație brună!!: brun, ferm'), D('A doua secțiune', 'același aspect brun')],
    why: 'Poza: piesa de la LP (borcanul 002). Zona de infarct (triunghiulară, !!roșie-negricioasă!!, cu vârful spre hil) n-o încercuiesc: pe poza asta nu se distinge sigur. Pe piesă o cauți; legenda cu cifre e în S1, pagina 15.',
  },

  // ======================= PIESA 10 · INFARCT MIOCARDIC ACUT
  {
    scene: 'imaRec', kick: 'Piesa 10 · Infarct miocardic acut · descrierea', title: 'O zonă palidă, cu halou hiperemic, în peretele VS',
    hud: ['Piesa 10 (5 din 7)', 'cord, secțiune transversală prin ventriculi'],
    points: [
      D('Zona hiperemică (12–24 h)', 'piesa din LP: !!zona pe cale de necroză e mai palidă, înconjurată de un halou hiperemic!!'),
      D('După 2–3 zile', 'miocardul necrozat devine !!galben ca lutul!!, omogen, **moale** (desenul)'),
      D('Reperele', '**ventriculul drept, ventriculul stâng, septul interventricular**'),
      D('Extinderea', '**transmural** (toată grosimea) · **intramural** · **subendocardic** (1/3 internă)'),
    ],
    why: 'Primele semne macroscopice apar !!după 12–24 ore!!. EN: acute myocardial infarction · LA: infarctus myocardii.',
    insets: [Z('lp_p10_c', 0, 'Piesa de la LP: zona hiperemică'), null, Z('lp_p10_c', 2, 'Piesa de la LP: VD'), P('lp_p10_b', 'Piesa de la LP: felii de cord')],
    beatDur: 6.5,
    xtra: 'Desenul arată stadiul de câteva zile (galben, moale); piesa din LP arată stadiul de 12–24 h (zonă hiperemică). La examen descrii ce vezi pe piesa primită. VS are peretele gros și mușchi papilari; VD are peretele subțire.',
  },
  {
    scene: 'imaWhy', anim: true, spec: 'Peretele VS desenat în patru stadii pe o linie a timpului (12–24 ore, 2–3 zile, 5–10 zile, săptămâni); stadiul din punct se mărește și se aprinde, culoarea zonei trece de la palid cu halou hiperemic la galben, apoi la alb-sidefiu. Se oprește pe stadiul din punct.', labelText: ['VS'], kick: 'Piesa 10 · De ce arată așa?', title: 'Cum se schimbă peretele în timp (LP)',
    hud: ['cronologia'],
    points: [
      D('12–24 ore', 'zona pe cale de necroză e **mai palidă**, cu **halou hiperemic** ← **piesa din LP**'),
      D('2–3 zile', 'miocardul necrozat devine **galben ca lutul**, omogen, **moale**'),
      D('5–10 zile', '**miomalacie** (enzime proteolitice) → !!risc de ruptură, hemopericard, deces prin tamponadă!!'),
      D('Săptămâni', 'infarctul e înlocuit de !!țesut cicatriceal alb-sidefiu!!'),
    ],
    why: 'Complicațiile: Tulburări de ritm (FiV) · Insuficiență cardiacă (20%) · Șoc cardiogen (40%) · Ruptură · Complicații tromboembolice · Anevrism (pe cicatrice) · Infarctizare progresivă · Moarte subită · Insuficiențe valvulare · Sindrom Dressler.',
    beatDur: 6.5,
    xtra: 'Ca să le ții minte în ordinea din LP: inițialele formează TISRCAIMIS (Tulburări de ritm, Insuficiență cardiacă, Șoc, Ruptură, Complicații tromboembolice, Anevrism, Infarctizare, Moarte subită, Insuficiențe valvulare, Sindrom Dressler).',
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'ima', b: 'ima', bImg: 'lp_p23', l: 'Infarct miocardic acut (piesa ta)', r: 'pericardită fibrinoasă' },
    kick: 'Piesa 10 · Diagnostic diferențial', title: 'Cu ce o compari: Pericardită fibrinoasă',
    hud: ['1 asemănare + 3 diferențe', 'dreapta: piesa 23 de la LP'],
    points: [
      D('Asemănarea', 'Ambele: cord; IMA poate da chiar pericardită (pericardita epistenocardică, sindromul Dressler).'),
      D('Diferența 1', 'La mine leziunea e în !!grosimea miocardului!!; la pericardită depozitele de fibrină sunt pe suprafața pericardului.'),
      D('Diferența 2', 'La mine zona e mai palidă, cu halou hiperemic (după 2–3 zile galbenă, moale); la pericardită suprafața e !!mată, rugoasă!!, cu aspect de „limbă de pisică”.'),
      D('Diferența 3', 'La mine complicația gravă e !!ruptura!! (miomalacie) cu hemopericard; la pericardită evoluția e spre aderențe fibroase (pericardită constrictivă).'),
    ],
    alt: ['**Infarct renal**: Zonă de infarct alb, bine conturată de lizereu congestiv, în rinichi; la mine infarct în peretele ventricular.', '**Aortă cu tromb parietal**: Tromb parietal pe intima cu plăci aterosclerotice; la mine leziunea e în miocard.'],
    insets: [P('lp_p10_c', 'Piesa 10 de la LP: Infarct miocardic acut'), P('lp_p23', 'Piesa 23 de la LP: Pericardită fibrinoasă'), P('lp_p23', 'Piesa 23 de la LP: Pericardită fibrinoasă'), P('lp_p23', 'Piesa 23 de la LP: Pericardită fibrinoasă')],
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'ima' }, layout: 'script', kick: 'Piesa 10 · Fișa OSPE · infarct miocardic', title: 'Ce spui cu voce tare: infarctul miocardic acut',
    hud: ['răspunsul-model, în ordinea fișei'],
    script: [
      { tm: 'Organ', at: '1 p', tx: '!!Cord!! (secțiune prin ventriculi: VD, VS, sept interventricular).' },
      { tm: 'Leziune', at: '1 p', tx: '!!Infarct miocardic acut!!.' },
      { tm: 'Definiție', at: '1 p', tx: 'Infarctul = !!necroza unui țesut cauzată de aportul insuficient de sânge oxigenat!!; aici, a miocardului.' },
      { tm: 'Descriere', at: '4 p', tx: '● în peretele VS: **zonă hiperemică** (aspect la aprox. 12–24 h) ● zona pe cale de necroză e **mai palidă**, înconjurată de un **halou hiperemic** ● după 2–3 zile: **galben ca lutul**, omogen, consistență moale ● după câteva săptămâni: **țesut cicatriceal alb-sidefiu**.' },
      { tm: 'Cauze', at: '3 p', tx: '● **coronaroscleroza** ● **tromboza/embolia coronarelor** ● **spasmul coronarian**.' },
      { tm: 'Complicații', at: '10 p', tx: '● **tulburări de ritm** (FiV) ● **insuficiență cardiacă** ● **șoc cardiogen** ● !!ruptura cordului!! (miomalacie, 5–10 zile) → hemopericard, tamponadă ● **tromboembolii** ● **anevrism cardiac** ● **infarctizare progresivă** ● **moarte subită** ● **insuficiențe valvulare** ● **sindrom Dressler**.' },
      { tm: 'DD', at: '✓', tx: 'Cu **Pericardită fibrinoasă**. Asemănare: Ambele: cord; IMA poate da chiar pericardită (pericardita epistenocardică, sindromul Dressler). Diferențe: ① La mine leziunea e în grosimea miocardului; la pericardită depozitele de fibrină sunt pe suprafața pericardului. ② La mine zona e mai palidă, cu halou hiperemic (după 2–3 zile galbenă, moale); la pericardită suprafața e mată, rugoasă, cu aspect de „limbă de pisică”. ③ La mine complicația gravă e ruptura (miomalacie) cu hemopericard; la pericardită evoluția e spre aderențe fibroase (pericardită constrictivă).' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **infarct miocardic acut**.' },
    ],
    durs: [4, 4, 12, 28, 15, 40, 40, 4],
  },
  {
    scene: 'atlas', sceneOpts: atlasS('lp_p10_c'), kick: 'Piesa 10 · Pe piesa de la LP', title: 'Zona hiperemică din peretele VS: ce arăți',
    hud: ['piesa de la LP'],
    points: [D('Zona hiperemică', '!!aspect la aprox. 12–24 h!!: negricioasă, în jurul cavității'), D('Peretele VS', 'gros: **ventriculul stâng**'), D('Ventriculul drept', 'reper: **VD**')],
    why: 'Poza: piesa de la LP (preparatul de la examen).',
  },
  {
    scene: 'atlas', sceneOpts: atlasS('lp_p10_b'), kick: 'Piesa 10 · Pe piesa de la LP · felii', title: 'Aceeași zonă pe mai multe felii de cord',
    hud: ['piesa de la LP · felii transversale'],
    points: [D('Zona hiperemică', '!!negricioasă!!, în peretele VS'), D('Altă felie', 'aceeași zonă, mai jos')],
    why: 'Poza: piesa de la LP (preparatul de la examen).',
  },

  // ======================= PIESA 11 · HEMORAGII INTRACRANIENE
  {
    scene: 'hemRec', kick: 'Piesa 11 · Hemoragii intracraniene · descrierea', title: 'Sânge în parenchim și în ventricul: hematom intracerebral și intraventricular',
    hud: ['Piesa 11 (6 din 7)', 'creier, secțiune coronală'],
    points: [
      D('Hematom intracerebral', '!!impregnarea hematică a parenchimului cerebral!!, prin ruperea unei ramuri vasculare intracerebrale'),
      D('Hematom intraventricular', 'sânge acumulat în ventriculul lateral: !!inundare ventriculară!!'),
      D('Creierul', 'secționat; sângele e în **parenchim**, nu la suprafață'),
    ],
    why: 'Pe lista oficială scrie „hemoragii intracraniene”: știi toate tipurile (epidural, subdural, subarahnoidian, intracerebral, intraventricular). EN: intracerebral hemorrhage · LA: haemorrhagia cerebri.',
    insets: [Z('lp_p11', 0, 'Hematom intracerebral + intraventricular'), Z('lp_p11', 1, 'Sânge în ventriculii laterali'), P('lp_p11', 'Piesa de la LP (borcanul 008)')],
    beatDur: 6.5,
  },
  {
    scene: 'hem4', kick: 'Piesa 11 · Cele 4 hemoragii', title: 'Între ce straturi e sângele? Fiecare tip are locul lui',
    hud: ['os · dura · arahnoidă · pia · creier'],
    points: [
      D('Epidural', 'între !!oasele craniene și dura mater!!', 'de obicei **traumatic**'),
      D('Subdural', 'între !!dura mater și arahnoidă!!'),
      D('Subarahnoidian', 'impregnarea hematică a arahnoidei (!!între arahnoidă și pia mater!!), vizibilă și în **spațiile intergirale**'),
      D('Intracerebral + intraventricular', 'în **parenchim**, prin ruperea unei ramuri vasculare; ventriculii se inundă **direct** sau prin comunicarea cu spațiul subarahnoidian'),
    ],
    insets: [null, Z('lp_p11_c', 2, 'Subdural: piesa de la LP (borcanul 006)'), Z('lp_p11_b', 1, 'Subarahnoidian: piesa de la LP (borcanul 007)'), Z('lp_p11', 0, 'Intracerebral: piesa de la LP (borcanul 008)')],
    beatDur: 6.5,
    why: 'Hematomul = sânge acumulat **într-un țesut** (retroperitoneal, placentar, subdural…). Poate fi externă sau internă; în cavități: hemotorace, **hemopericard** (risc de tamponadă), hemoperitoneu, hematocel, hematosalpinge, hemartroză.',
  },
  {
    scene: 'hemWhy', anim: true, spec: 'Creier pe secțiune coronală. 1: arteriola intracerebrală mărită (peretele vascular); 2: peretele se rupe și sângele iese; 3: sângele impregnează parenchimul (hematomul crește); 4: hematomul împinge linia mediană; 5: sângele intră în ventricul (inundare ventriculară). Se oprește pe starea finală.', kick: 'Piesa 11 · De ce arată așa?', title: 'O ramură vasculară se rupe: sângele impregnează parenchimul',
    hud: ['patogenia'],
    points: [
      D('Hemoragia', '!!extravazarea sângelui în afara unui vas!!'),
      D('Mecanismul', '**întreruperea continuității peretelui vascular**; altfel: erodarea peretelui (proces neoplazic, tuberculom) sau **diapedeză** (peretele rămâne integru)'),
      D('Hemoragia intracerebrală', 'impregnarea hematică a parenchimului, prin **ruperea unei ramuri vasculare intracerebrale**'),
      D('Hematomul', 'sângele acumulat !!într-un țesut!! = hematom'),
      D('Inundarea ventriculară', 'hemoragia intraventriculară vine **direct** dintr-o hemoragie cerebrală adiacentă sau **prin comunicarea** cu spațiul subarahnoidian'),
    ],
    beatDur: 6.5,
    xtra: 'Cea mai cunoscută cauză a hematomului profund e hipertensiunea arterială, care slăbește peretele arteriolelor mici din nucleii bazali. LP nu o cere.',
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'hem', b: 'hem', bImg: 'lp_p24', l: 'Hemoragii intracraniene (piesa ta)', r: 'abces cerebral' },
    kick: 'Piesa 11 · Diagnostic diferențial', title: 'Cu ce o compari: Abces cerebral',
    hud: ['1 asemănare + 3 diferențe', 'dreapta: piesa 24 de la LP'],
    points: [
      D('Asemănarea', 'Ambele: creier pe secțiune, cu o leziune în parenchim.'),
      D('Diferența 1', 'La mine conținutul e !!sânge!! (hematom); la abces e puroi, într-o cavitate rotund-ovalară.'),
      D('Diferența 2', 'La mine sângele vine din !!ruperea unei ramuri vasculare!! intracerebrale; la abces țesutul suferă necroză de colicvație, cu membrană piogenă la periferie.'),
      D('Diferența 3', 'La mine sângele poate inunda !!ventriculii!! (hematom intraventricular); la abces complicația cea mai severă e hernierea tonsilelor cerebeloase.'),
    ],
    alt: ['**Leptomeningită purulentă**: Exsudat purulent pe suprafața leptomeningelui („meningită în șapcă”); la mine sânge în parenchim și în ventriculi.', '**Tromb călăreț**: Tromb (coagulare intravasculară și intravitală) călare pe bifurcația aortei; la mine sânge extravazat în creier.'],
    insets: [P('lp_p11', 'Piesa 11 de la LP: hematom intracerebral'), P('lp_p24', 'Piesa 24 de la LP: Abces cerebral'), P('lp_p24', 'Piesa 24 de la LP: Abces cerebral'), P('lp_p24', 'Piesa 24 de la LP: Abces cerebral')],
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'hem' }, layout: 'script', kick: 'Piesa 11 · Fișa OSPE · hematom intracerebral', title: 'Ce spui cu voce tare: hemoragiile intracraniene',
    hud: ['răspunsul-model, în ordinea fișei'],
    script: [
      { tm: 'Organ', at: '1 p', tx: '!!Creier!! (secționat).' },
      { tm: 'Leziune', at: '1 p', tx: '!!Hemoragie intracraniană: hematom intracerebral și intraventricular!!.' },
      { tm: 'Definiție', at: '1 p', tx: 'Hemoragia = !!extravazarea sângelui în afara unui vas!!; hemoragia intracerebrală = impregnarea hematică a parenchimului cerebral prin ruperea unei ramuri vasculare intracerebrale.' },
      { tm: 'Descriere', at: '3 p', tx: '● sânge în **parenchimul cerebral**: hematom intracerebral ● sânge în **ventriculul lateral**: hematom intraventricular (inundare ventriculară) ● ventriculii se inundă direct, dintr-o hemoragie cerebrală adiacentă, sau prin comunicarea cu spațiul subarahnoidian.' },
      { tm: 'Cauze', at: '3 p', tx: '● **întreruperea continuității peretelui vascular** (ruperea unei ramuri intracerebrale) ● **erodarea peretelui** (proces neoplazic de vecinătate, tuberculom) ● **diapedeza** (peretele rămâne integru).' },
      { tm: 'Celelalte tipuri', at: '', tx: 'LP are piese și pentru: ● **hematom subdural** (craniu secționat): între dura mater și arahnoidă ● **hematom subarahnoidian**: între arahnoidă și pia mater, vizibil și în spațiile intergirale. Fără piesă: ● **epidural**: între oasele craniene și dura mater, de obicei traumatic.' },
      { tm: 'DD', at: '✓', tx: 'Cu **Abces cerebral**. Asemănare: Ambele: creier pe secțiune, cu o leziune în parenchim. Diferențe: ① La mine conținutul e sânge (hematom); la abces e puroi, într-o cavitate rotund-ovalară. ② La mine sângele vine din ruperea unei ramuri vasculare intracerebrale; la abces țesutul suferă necroză de colicvație, cu membrană piogenă la periferie. ③ La mine sângele poate inunda ventriculii (hematom intraventricular); la abces complicația cea mai severă e hernierea tonsilelor cerebeloase.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **hematom intracerebral cu inundare ventriculară**.' },
    ],
    durs: [4, 6, 16, 24, 20, 20, 40, 5],
  },
  {
    scene: 'atlas', sceneOpts: atlasS('lp_p11'), kick: 'Piesa 11 · Pe piesa de la LP · borcanul 008', title: 'Hematomul intracerebral: ce arăți',
    hud: ['piesa de la LP · borcanul 008'],
    points: [D('Hematom intraventricular și intracerebral', '!!inundare ventriculară!!'), D('Sânge în ventriculii laterali', 'pe secțiunea de sus'), D('Creierul', 'secționat coronal')],
    why: 'Poza: piesa de la LP (preparatul de la examen).',
  },
  {
    scene: 'atlas', sceneOpts: atlasS('lp_p11_b'), kick: 'Piesa 11 · Pe piesa de la LP · borcanul 007', title: 'Hematomul subarahnoidian: sângele acoperă girusurile',
    hud: ['piesa de la LP · borcanul 007'],
    points: [D('Creierul', 'girusurile se văd prin sânge'), D('Hematom subarahnoidian', '!!între arahnoidă și pia mater!!, vizibil și în spațiile intergirale')],
    why: 'Poza: piesa de la LP (preparatul de la examen).',
  },
  {
    scene: 'atlas', sceneOpts: atlasS('lp_p11_c'), kick: 'Piesa 11 · Pe piesa de la LP · borcanul 006', title: 'Hematomul subdural: sub dura mater',
    hud: ['piesa de la LP · borcanul 006'],
    points: [D('Craniul secționat', 'reper'), D('Dura mater', 'meningele de deasupra'), D('Hematom subdural', '!!între dura mater și arahnoidă!!')],
    why: 'Poza: piesa de la LP (preparatul de la examen).',
  },

  // ======================= PIESA 12 · RINICHI DE ȘOC
  {
    scene: 'socRec', kick: 'Piesa 12 · Rinichi de șoc · descrierea', title: 'Corticală palidă, medulară hiperemică: limită netă',
    hud: ['Piesa 12 (7 din 7)', 'rinichi secționat longitudinal'],
    points: [
      D('Corticala renală', '!!palidă!!'),
      D('Medulara renală', '!!hiperemică!!'),
      D('Limita', 'corticala palidă e !!bine delimitată de medulara hiperemică!!'),
      D('Pelvisul renal', 'reper, în hil'),
    ],
    why: 'Sângele disponibil e **redistribuit din corticală spre medulară**: de aici contrastul. EN: shock kidney.',
    insets: [Z('lp_p12_b', 0, 'Corticala palidă (1), piesa de la LP'), Z('lp_p12_b', 1, 'Medulara hiperemică (2)'), Z('lp_p12_b', 3, 'Limita netă, piesa de la LP'), Z('lp_p12_b', 2, 'Pelvisul renal (3)')],
    beatDur: 6.5,
    xtra: 'Leziunea e difuză, de obicei la ambii rinichi; pe piesa fixată contrastul rămâne vizibil.',
  },
  {
    scene: 'socWhy', anim: true, spec: 'Rinichi pe secțiune. 1: „TA ↓” pulsează deasupra (șoc); 2: corticala pălește și medulara se înroșește (redistribuția sângelui); 3: un tub renal mărit: necroză tubulară, glomerulii neafectați; 4: săgeata galbenă coboară spre „reversibil: hemodializă temporară”. Se oprește pe starea finală.', labelText: ['TA'], kick: 'Piesa 12 · De ce arată așa?', title: 'Redistribuirea sângelui: corticala palidă, medulara roșie',
    hud: ['patogenia'],
    points: [
      D('Șocul', '!!dezechilibru major între necesarul de oxigen și aportul insuficient!! într-un organ'),
      D('Redistribuția sângelui', 'din **corticală spre medulară**: corticala palidă, medulara hiperemică'),
      D('Microscopic', '!!necroză tubulară renală, reversibilă!!, cu **glomeruli neafectați**'),
      D('Stare reversibilă', 'funcția de filtrare se **suplinește temporar prin hemodializă**'),
    ],
    why: 'Tipuri de șoc: **hipovolemic** (hemoragii masive), **cardiogen** (scade funcția inotropă), **neurogen** (dilatarea difuză a patului vascular), **anafilactic**, **septic** (vasodilatație ca răspuns imun la infecție). Toate organele pot avea aspect de șoc (plămân, ficat de șoc).',
    beatDur: 6.5,
    xtra: 'Corticala e palidă pentru că vasele ei se contractă, iar medulara rămâne plină de sânge. Celulele tubulare sunt cele mai sensibile la lipsa de oxigen.',
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'soc', b: 'ren', l: 'Rinichi de șoc (piesa ta)', r: 'infarct renal' },
    kick: 'Piesa 12 · Diagnostic diferențial', title: 'Cu ce o compari: Infarct renal',
    hud: ['1 asemănare + 3 diferențe'],
    points: [
      D('Asemănarea', 'Ambele: rinichi cu zone palide, în contrast cu zone congestionate.'),
      D('Diferența 1', 'La mine !!toată corticala!! e palidă; la infarct o singură zonă palidă, bine conturată.'),
      D('Diferența 2', 'La mine roșul e în !!medulara hiperemică!!, bine delimitată de corticală; la infarct roșul e lizereul congestiv din jurul zonei.'),
      D('Diferența 3', 'La mine leziunea e !!reversibilă!! (necroză tubulară, glomeruli neafectați); la infarct e necroza unei porțiuni de parenchim, prin obstrucția ramurii arteriale.'),
    ],
    alt: ['**Litiază renală**: Calculi coraliformi, calice dilatate, parenchim atrofic; la mine corticală palidă și medulară hiperemică, fără calculi.', '**Steatoză hepatică**: Ficat mărit, gălbui, cu marginea anterioară rotunjită, lama cuțitului grăsoasă; la mine rinichi cu corticala palidă.'],
    insets: [P('lp_p12_b', 'Piesa 12 de la LP: Rinichi de șoc'), P('lp_p8', 'Piesa 8 de la LP: Infarct renal'), P('lp_p8', 'Piesa 8 de la LP: Infarct renal'), P('lp_p8', 'Piesa 8 de la LP: Infarct renal')],
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'soc' }, layout: 'script', kick: 'Piesa 12 · Fișa OSPE · rinichi de șoc', title: 'Ce spui cu voce tare: rinichiul de șoc',
    hud: ['răspunsul-model, în ordinea fișei'],
    script: [
      { tm: 'Organ', at: '1 p', tx: '!!Rinichi!! (secționat).' },
      { tm: 'Leziune', at: '1 p', tx: '!!Rinichi de șoc!!.' },
      { tm: 'Definiție', at: '1 p', tx: 'Șocul = !!dezechilibru major între necesarul de oxigen și aportul insuficient într-un anumit organ!!.' },
      { tm: 'Descriere', at: '4 p', tx: '● **corticala renală palidă** ● **medulara renală hiperemică** ● corticala palidă **bine delimitată** de medulara hiperemică ● microscopic: **necroză tubulară renală reversibilă**, cu glomeruli neafectați.' },
      { tm: 'Cauze', at: '5 p', tx: '● șoc **hipovolemic** (hemoragii masive) ● **cardiogen** (scade funcția inotropă) ● **neurogen** (dilatarea difuză a patului vascular) ● **anafilactic** ● **septic** (vasodilatație la infecție); mecanism: redistribuția sângelui din corticală spre medulară.' },
      { tm: 'Complicații', at: '—', tx: 'LP nu dă complicații pentru rinichiul de șoc. Poți spune evoluția: **stare reversibilă**, funcția de filtrare se suplinește temporar prin **hemodializă**.' },
      { tm: 'DD', at: '✓', tx: 'Cu **Infarct renal**. Asemănare: Ambele: rinichi cu zone palide, în contrast cu zone congestionate. Diferențe: ① La mine toată corticala e palidă; la infarct o singură zonă palidă, bine conturată. ② La mine roșul e în medulara hiperemică, bine delimitată de corticală; la infarct roșul e lizereul congestiv din jurul zonei. ③ La mine leziunea e reversibilă (necroză tubulară, glomeruli neafectați); la infarct e necroza unei porțiuni de parenchim, prin obstrucția ramurii arteriale.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **rinichi de șoc**.' },
    ],
    durs: [4, 4, 14, 24, 24, 10, 40, 4],
  },
  {
    scene: 'atlas', sceneOpts: atlasS('lp_p12_b'), kick: 'Piesa 12 · Pe piesa de la LP', title: 'Rinichiul de șoc: ce arăți',
    hud: ['piesa de la LP'],
    points: [D('Corticala', '!!palidă!! (bulina 1)'), D('Medulara', '**hiperemică** (bulinele 2)'), D('Pelvisul renal', 'reper (bulina 3)'), D('Limita', 'corticala palidă e !!bine delimitată!! de medulara hiperemică')],
    why: 'Poza: piesa de la LP; bulinele 1–3 de pe poză corespund legendei din LP (S1).',
  },

  // ======================= FINAL
  {
    scene: 'capcane', kick: 'LP 1–2 · Capcane', title: 'Greșelile care costă puncte la OSPE',
    hud: ['8 capcane'],
    points: [
      D('Trombul', '!!mixt stratificat, aderent, mat, friabil!!; se formează intravital, în vas'),
      D('Alb vs. roșu', 'rinichi: !!circulație unică → alb!!; plămân: circulație dublă + stază cronică → **roșu**'),
      D('Transsudat vs. exsudat', '**transsudat**: sărac în proteine, sub 1012 (edem); **exsudat**: bogat în proteine, peste 1012 (inflamație)'),
      D('Siderofagele', 'pigment **brun** de hemosiderină = **celule cardiace** (stază cronică)'),
      D('Hemoragia: între ce straturi?', 'epidural (os–dura) · subdural (dura–arahnoidă) · subarahnoidian (arahnoidă–pia) · intracerebral (parenchim)'),
      D('Rinichi de șoc ≠ infarct', 'șocul: !!toată corticala palidă!! + medulară hiperemică; infarctul: o zonă **conturată de lizereu congestiv**'),
      D('Tromb călăreț: unde?', 'în LP: !!călare pe bifurcația aortei!!, în ambele artere iliace comune'),
      D('Culoarea pe piesa fixată', 'în formol culorile se schimbă: spune „**pe piesa fixată** culoarea este…”'),
    ],
    beatDur: 6,
  },
  {
    scene: 'recap', kick: 'LP 1–2 · Recapitulare', title: 'Piesele, dintr-o privire',
    hud: ['tabel de recapitulare'],
    table: { head: ['Piesa', 'O recunoști după', 'Mecanism', 'Nu o confunda cu'], rows: [
      ['Aortă cu tromb parietal', 'tromb !!aderent!! pe intima cu plăci aterosclerotice', 'triada Virchow; placa = leziune endotelială', '**Tromb călăreț** · alt.: Pericardită fibrinoasă · Hemoragii intracraniene'],
      ['Tromb călăreț', 'tromb !!călare pe bifurcația aortei!!, în ambele a. iliace; mixt stratificat, aderent, mat, friabil', 'tromb arterial: crește retrograd, embolizează distal', '**Aortă cu tromb parietal** · alt.: Infarct pulmonar · Hemoragii intracraniene'],
      ['Infarct renal', 'zonă **palidă**, bine conturată de lizereu congestiv, vizibilă pe suprafața externă', 'obstrucția ramurii arteriale; circulație unică → alb', '**Infarct pulmonar** · alt.: Rinichi de șoc · Litiază renală'],
      ['Infarct pulmonar', 'zonă !!triunghiulară, roșie-negricioasă!!, vârful spre hil; stază cronică în jur', 'TEP pe stază cronică; circulație dublă → roșu', '**Infarct renal** · alt.: Bronhopneumonie · Tromb călăreț'],
      ['Infarct miocardic acut', 'zonă **hiperemică** (12–24 h): palidă, cu halou hiperemic; 2–3 zile: galben, moale', 'coronaroscleroză, tromboză/embolie, spasm; 5–10 zile: ruptură', '**Pericardită fibrinoasă** · alt.: Infarct renal · Aortă cu tromb parietal'],
      ['Hemoragii intracraniene', 'sânge în **parenchim** (intracerebral) și în **ventricul** (intraventricular)', 'ruperea unei ramuri vasculare intracerebrale', '**Abces cerebral** · alt.: Leptomeningită purulentă · Tromb călăreț'],
      ['Rinichi de șoc', 'corticală **palidă**, bine delimitată de medulara **hiperemică**', 'redistribuția sângelui spre medulară; NTA reversibilă', '**Infarct renal** · alt.: Litiază renală · Steatoză hepatică'],
    ] },
    beatDur: 6,
  },
];

// slide-urile fără câmpul anim sunt statice (spec de o linie, după tipul scenei)
const SPEC0 = {
  cover: 'Static: miniaturile preparatelor; se aprinde preparatul din punct.', fisa: 'Static: fișa OSPE ca bare de puncte; rubricile se aprind odată cu punctul.', fisaPiesa: 'Static: fișa OSPE ca bare de puncte; rubricile se aprind odată cu punctul.',
  atlas: 'Static: poza preparatului de la LP; structura din punct e încercuită și numerotată.',
  ddPair: 'Static: desenul preparatului tău (stânga) vs. partenerul de DD (dreapta, desen sau poza de la LP); inelul arată partea din punct.',
  script: 'Static: desenul preparatului + cronometrul de 6 minute împărțit pe rubrici; segmentul rubricii curente se aprinde.',
  recap: 'Static: miniaturile preparatelor; rândul curent se aprinde.', capcane: 'Static: cardurile capcanelor; se aprinde cardul din punct.',
  hem4: 'Static: cele patru straturi (os, dură, arahnoidă, pia + creier) cu sângele în locul fiecărei hemoragii; se aprinde stratul din punct.',
};
for (const s of SLIDES) {
  if (s.anim === undefined) s.anim = false;
  if (!s.spec) s.spec = SPEC0[s.scene] || 'Static: desenul preparatului; camera merge pe structura din punct, care e încercuită și numerotată.';
}
