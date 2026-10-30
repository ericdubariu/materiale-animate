// Preparatele 1–5 (lamele de la Tulburări hemodinamice, LP 1–2). Textul vine din materialul OSPE al lui Eric
// (scripturile pe fișa oficială O.S.P.E. Morfopatologie). Ce e marcat „(manual)” nu e din sinteza disciplinei.

export const GLOS = [
  ['LP', 'lucrarea practică'], ['HE', 'colorația hematoxilină-eozină'], ['OSPE', 'examen practic structurat pe stații'],
  ['DD', 'diagnostic diferențial'], ['EN', 'termenul în engleză'], ['LA', 'termenul în latină'], ['ob.', 'obiectivul'],
  ['IC', 'insuficiența cardiacă'], ['SNC', 'sistemul nervos central'], ['VS', 'ventriculul stâng'], ['AS', 'atriul stâng'],
  ['Hb', 'hemoglobina'], ['HTA', 'hipertensiunea arterială'], ['TVP', 'tromboza venoasă profundă'], ['NTA', 'necroza tubulară acută'],
  ['MO', 'microscopul optic'], ['HTP', 'hipertensiunea pulmonară'], ['ME', 'microscopul electronic'], ['PAS', 'colorația acid periodic-Schiff'], ['P', 'presiunea'], ['a.', 'artera'], ['p', 'punct(e)'], ['TEP', 'trombembolismul pulmonar'], ['IMA', 'infarctul miocardic acut'], ['FiV', 'fibrilația ventriculară'], ['t-PA', 'activatorul tisular al plasminogenului (Actilyse)'],
];
export const TERMS = [
  ['transsudat', 'transsudat', 'lichid sărac în proteine și celule, ieșit din vas prin presiune'],
  ['exsudat', 'exsudat', 'lichid bogat în proteine și celule inflamatorii (inflamație)'],
  ['eozinofil', 'eozinofil', 'ia eozina, apare roz'],
  ['siderofag', 'siderofag', 'macrofag încărcat cu hemosiderină (pigment brun cu fier)'],
  ['hemosiderin', 'hemosiderină', 'pigment brun-auriu cu fier, rezultat din degradarea hemoglobinei'],
  ['diapedez', 'diapedeză', 'ieșirea hematiilor printre celulele endoteliale, fără ruptura vasului'],
  ['refringent', 'refringent', 'strălucitor, refractă lumina'],
  ['indurați', 'indurație', 'întărirea organului prin fibroză'],
  ['necroz', 'necroză de coagulare', 'moartea celulei cu păstrarea conturului (proteinele se denaturează)'],
  ['picnoz', 'picnoză', 'nucleul se micșorează și devine foarte închis'],
  ['carioreex', 'carioreexă', 'nucleul se rupe în fragmente'],
  ['carioliz', 'carioliză', 'nucleul se dizolvă și dispare'],
  ['cuneiform', 'cuneiform', 'în formă de con / pană'],
  ['lizereu', 'lizereu', 'bandă îngustă la marginea leziunii'],
  ['miomalaci', 'miomalacie', 'înmuierea peretelui cardiac necrozat sub acțiunea enzimelor proteolitice'],
  ['congesti', 'congestie', 'vase dilatate, pline cu sânge'],
  ['autoliz', 'autoliză', 'digestia țesutului de propriile enzime, după moarte'],
  ['Zahn', 'liniile Zahn', 'straturi alternante albe și roșii ale trombului format în sânge care curge'],
  ['Perls', 'reacția Perls', 'colorează fierul în albastru (albastru de Prusia)'],
  ['antracoz', 'antracoză', 'pigment de cărbune inhalat, negru, fără fier'],
  ['granulați', 'țesut de granulație', 'țesut tânăr de reparație: capilare noi + fibroblaste'],
];

const D = (h, ...d) => ({ h, d });
const Z = (img, k, cap) => ({ img: `z_${img}_${k}`, cap });
const P = (img, cap) => ({ img, cap });
const SCRIPT = (f, rows, durs, fo) => ({ scene: 'script', layout: 'script', sceneOpts: { f, fo }, hud: ['fișa OSPE · cu voce tare'], script: rows, durs });

export const SLIDES = [
  {
    deckName: 'Anatomie patologică · Preparatele 1–5 (lame) · animat',
    scene: 'cover', kick: 'Anatomie patologică · LP 1–2 · Tulburări hemodinamice · OSPE', title: 'Cele 5 lame de azi, fiecare cu semnul ei',
    hud: ['toate în HE'],
    points: [
      D('Edem pulmonar acut', 'alveole pline cu !!substanță omogenă, eozinofilă!!; bule de aer; vase congestionate'),
      D('Plămân de stază + infarct pulmonar', '!!siderofage!! (celule cardiace), septuri fibrozate + o zonă cu **alveole inundate hemoragic**'),
      D('Infarct renal', 'aspect !!„fantomatic”!!: nucleii dispar, arhitectura rămâne + **lizereu congestiv**'),
      D('Infarct miocardic acut', 'fibre **fără nuclei**, sarcoplasmă omogenă, intens eozinofilă + **lizereu congestiv**'),
      D('Tromb mixt', 'straturi palide / roșii = !!liniile lui Zahn!!'),
    ],
    why: 'La fiecare lamă: ob. mic → ob. mare → de ce arată așa → DD → **Fișa OSPE cu voce tare** → lama de la LP, cu tot încercuit.',
    beatDur: 5,
  },
  {
    scene: 'fisa', kick: 'LP 1–2 · Formatul OSPE · fișa oficială', title: 'Cum se punctează: rubrică cu rubrică',
    hud: ['stația: 7 min = 1 citit + 6 vorbit'],
    points: [
      D('Rubrica 1 vine prima, mereu', '!!organ + leziune + definiție = 3 p!!, marcate **OBLIGATORIU** pe fișă; le spui din primul minut'),
      D('Buline = puncte', 'la **descriere, cauze, complicații** fiecare idee separată = !!1 punct!!', 'le spui ca pe o listă; la lamă: **ob. mic, apoi ob. mare**'),
      D('Minim 5 puncte', '3 din rubrica 1 + **2 buline** și ai trecut', 'fișele de mai jos îți arată câte puncte poți strânge pe fiecare lamă'),
      D('Mecanismul n-are rubrică', 'îl folosești doar ca să legi **cauza → leziunea → complicațiile**', 'apoi **DD**: un preparat de pe listă, **1 asemănare + 3 diferențe** + 2 alternative'),
    ],
    warn: 'Contează **doar ce spui cu voce tare**; examinatorul tace și anunță doar ultimul minut.',
    beatDur: 6,
  },

  // ======================= LAMA 1 · EDEM PULMONAR ACUT
  {
    scene: 'edemMic', kick: 'Lama 1 · Edem pulmonar acut · HE · ob. mic', title: 'Alveolele sunt pline cu lichid roz, nu cu aer',
    hud: ['Lama 1 din 5', '<b>HE</b> · plămân'],
    points: [
      D('Alveole pline cu substanță omogenă, eozinofilă', '!!edem alveolar!!: lichidul de edem (**transsudat**) umple spațiile alveolare'),
      D('Septuri ușor expandate', '!!edem interstițial!!: lichid de edem în septurile interalveolare'),
    ],
    why: 'Edemul = !!acumulare de lichid interstițial în țesuturi!!. EN: acute pulmonary edema · LA: oedema pulmonum.',
    insets: [Z('lp_l1_mic', 0, 'Alveole pline cu transsudat, lama de la LP'), P('lp_l1_lama', 'Lama de la LP, la ochiul liber')],
    beatDur: 6,
    xtra: 'Lichidul e acelular; lipsa neutrofilelor și a fibrinei te ajută să nu-l confunzi cu o pneumonie. Arhitectura pulmonară e păstrată, septurile nu sunt fibrozate: leziunea e acută.',
  },
  {
    scene: 'edemMare', kick: 'Lama 1 · Edem pulmonar acut · HE · ob. mare', title: 'Capilare pline și bule de aer prinse în lichid',
    hud: ['<b>HE</b> · ob. mare'],
    points: [
      D('Lichid de edem (transsudat)', 'substanță !!omogenă, eozinofilă!!, extravazată brusc'),
      D('Vase congestionate', 'capilare **dilatate, pline cu hematii**'),
      D('Bule de aer', '!!spații optic goale!! amestecate cu lichidul, pentru că transsudatul a ieșit brusc'),
    ],
    insets: [Z('lp_l1_mic', 0, 'Transsudat, lama de la LP'), Z('lp_l1_mic', 1, 'Vas congestionat, lama de la LP'), P('lp_l1_mic', 'Lama de la LP · ob. mic')],
    beatDur: 6,
    xtra: 'Edemul acut merge împreună cu congestia: aceeași presiune venoasă care împinge apa afară dilată capilarele. Lichidul e mai palid decât citoplasma pentru că are puține proteine.',
  },
  {
    scene: 'edemWhy', anim: true, spec: 'Trei alveole (normală, în curs, plină) deasupra unui capilar. 1: capilarul pulsează și săgeți albastre urcă din el (presiune hidrostatică ↑); 2: septurile alveolelor 2 și 3 se îngroașă (edem interstițial); 3: lichidul roz urcă în alveole (pe jumătate în a 2-a, plină în a 3-a); 4: în alveola plină apar bule de aer (spumă). Se oprește pe starea finală.', kick: 'Lama 1 · De ce arată așa?', title: 'Presiunea din capilar împinge apa: întâi în sept, apoi în alveolă',
    hud: ['3 alveole vecine'],
    points: [
      D('Presiunea crește în venule', 'presiunea din **venulele postcapilare** crește → !!patul capilar se dilată!! → bariera endotelială **se permeabilizează**'),
      D('Edem interstițial', 'lichidul de edem **expandează septurile** interalveolare'),
      D('Edem alveolar', 'iese întâi !!transsudat (ser)!!: sărac în proteine, densitate **sub 1012**; apoi **proteine (plasmă)**, dacă factorul inițiator persistă'),
      D('Aer + lichid = spumă', 'pe piesă: plămâni de volum și greutate crescute; la presiune se elimină lichid !!roz, spumos, aerat!!'),
    ],
    why: 'Apa din organism: compartiment **intravascular**, **intracelular** și **extracelular** (lichid interstițial). Cauzele edemului: !!creșterea presiunii hidrostatice!! (ex. **insuficiența cardiacă**) și **scăderea presiunii coloid-osmotice (oncotice)** (ex. malnutriție, sinteză hepatică scăzută, sindrom nefrotic). Normal, presiunile sunt în echilibru și bariera endotelială e **intactă**. **Exsudatul** (peste 1012, bogat în proteine) ține de inflamație. Lichidul se strânge și în cavități: hidrotorace, hidropericard, ascită, hidrocel; edemul generalizat = **anasarca**.',
    insets: [P('lp_l1_mic', 'Rezultatul pe lama de la LP · ob. mic')],
    beatDur: 6.5,
    xtra: 'În plămân, cel mai des presiunea hidrostatică urcă brusc când ventriculul stâng cedează: sângele stagnează în venele pulmonare și filtrarea depășește drenajul limfatic. Edemul începe în septuri pentru că acolo se află capilarele.',
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'edem', b: 'staza', l: 'Edem pulmonar acut (lama ta)', r: 'plămân de stază cronică + infarct pulmonar' },
    kick: 'Lama 1 · Diagnostic diferențial', title: 'Cu ce o compari: Plămân de stază cronică + infarct pulmonar',
    hud: ['1 asemănare + 3 diferențe'],
    points: [
      D('Asemănarea', 'Ambele: plămân în HE, cu vase congestionate.'),
      D('Diferența 1', 'La mine alveolele sunt pline cu !!substanță omogenă, eozinofilă!! (transsudat), cu bule de aer; la stază alveolele conțin siderofage (celule cardiace) cu pigment brun.'),
      D('Diferența 2', 'La mine septurile sunt doar !!ușor expandate de lichid!!; la stază septurile sunt îngroșate și fibrozate.'),
      D('Diferența 3', 'La mine nu există necroză; lama 2 are și o !!zonă de infarct!!: alveole inundate hemoragic, septuri fără nuclei, cu lizereu congestiv.'),
    ],
    alt: ['**Infarctul pulmonar (zona de infarct din lama 2)**: Alveole inundate hemoragic, septuri cu alveolocite necrozate, fără nuclei; la mine lichid omogen, eozinofil, septuri viabile.', '**Pericardită fibrinoasă**: Depunere de fibrină, rețea de filamente roșu-roz, pe suprafața epicardului; la mine lichid omogen în alveole.'],
    insets: [P('lp_l1_mic', 'Lama 1 de la LP: Edem pulmonar acut'), P('lp_l2_staza', 'Lama 2 de la LP: siderofage'), P('lp_l2_lama', 'Lama 2 de la LP, la ochiul liber'), P('lp_l2_inf', 'Lama 2 de la LP: zona de infarct')],
    beatDur: 8,
  },
  {
    ...SCRIPT('edem', [
      { tm: 'Organ', at: '1 p', tx: '!!Plămân!!, colorația **HE**.' },
      { tm: 'Leziune', at: '1 p', tx: '!!Edem pulmonar acut!!.' },
      { tm: 'Definiție', at: '1 p', tx: 'Edemul = !!acumulare de lichid interstițial în țesuturi!!; în plămân, lichidul (transsudat) expandează septurile și umple alveolele.' },
      { tm: 'Descriere', at: '4 p', tx: '● ob. mic: spații alveolare pline cu o **substanță omogenă, eozinofilă** (edem alveolar) ● septuri interalveolare **ușor expandate** de lichid (edem interstițial) ● lichidul de edem (**transsudat**), extravazat brusc, amestecat cu **spații optic goale: bule de aer** ● !!vase congestionate!!.' },
      { tm: 'Cauze', at: '3 p', tx: '● **creșterea presiunii hidrostatice** (insuficiența cardiacă) ● **scăderea presiunii coloid-osmotice (oncotice)**: malnutriție, sinteză hepatică scăzută, sindrom nefrotic ● dezechilibrul presiunilor dilată patul capilar și **permeabilizează bariera endotelială** → transsudat (sărac în proteine, densitate sub 1012).' },
      { tm: 'Complicații', at: '—', tx: 'LP nu dă complicații pentru edemul pulmonar acut. Pe piesă: plămâni de volum și greutate crescute; la secțiune se elimină lichid roz, spumos, aerat.' },
      { tm: 'DD', at: '✓', tx: 'Cu **Plămân de stază cronică + infarct pulmonar**. Asemănare: Ambele: plămân în HE, cu vase congestionate. Diferențe: ① La mine alveolele sunt pline cu substanță omogenă, eozinofilă (transsudat), cu bule de aer; la stază alveolele conțin siderofage (celule cardiace) cu pigment brun. ② La mine septurile sunt doar ușor expandate de lichid; la stază septurile sunt îngroșate și fibrozate. ③ La mine nu există necroză; lama 2 are și o zonă de infarct: alveole inundate hemoragic, septuri fără nuclei, cu lizereu congestiv.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **edem pulmonar acut**.' },
    ], [8, 6, 18, 45, 30, 15, 40, 6]),
    kick: 'Lama 1 · Fișa OSPE · edem pulmonar acut', title: 'Ce spui cu voce tare (poți strânge 10 p, minim 5)',
  },
  {
    scene: 'atlas', sceneOpts: { img: 'lp_l1_mic', W: 1032, H: 425, marks: [
      { x: 680, y: 150, rx: 75, ry: 55, lab: 'alveole pline cu transsudat' },
      { x: 548, y: 248, rx: 52, ry: 46, lab: 'vas congestionat' },
    ] },
    kick: 'Lama 1 · Pe lama de la LP · ob. mic · HE', title: 'Edemul pe lama de la LP: ce încercuiești',
    hud: ['lama de la LP · ob. mic'],
    points: [D('Alveole pline', 'substanță !!omogenă, eozinofilă!! (transsudat)'), D('Vas congestionat', 'plin cu **hematii**')],
    why: 'Poza: lama de la LP (preparatul de la examen).',
  },

  // ======================= LAMA 2 · STAZĂ CRONICĂ + INFARCT PULMONAR
  {
    scene: 'stazaMic', kick: 'Lama 2 · Plămân de stază cronică · HE · ob. mic', title: 'Septuri groase și celule brune în alveole',
    hud: ['Lama 2 din 5', '<b>HE</b> · plămân · 2 leziuni'],
    points: [
      D('Siderofage în alveole', '!!celule cardiace!! cu pigment brun, **izolate sau în grupuri**'),
      D('Vase congestionate', 'în septuri, **pline cu hematii**'),
      D('Septuri îngroșate, fibrozate', '!!îngroșarea și fibrozarea septurilor interalveolare!!'),
    ],
    why: 'O singură lamă, !!două leziuni!!: întâi spui **staza cronică** (tot preparatul), apoi cauți **zona de infarct** și o descrii ca a doua leziune. EN: chronic pulmonary congestion (brown induration) · LA: induratio brunea pulmonis.',
    insets: [Z('lp_l2_staza', 0, 'Siderofage, lama de la LP'), Z('lp_l2_staza', 2, 'Vas congestionat, lama de la LP'), Z('lp_l2_staza', 1, 'Sept îngroșat, lama de la LP'), P('lp_l2_lama', 'Lama 2 de la LP, la ochiul liber')],
    beatDur: 6,
    xtra: 'Culoarea brun-aurie a celulelor e cheia recunoașterii la ob. mic.',
  },
  {
    scene: 'stazaMare', kick: 'Lama 2 · Stază · HE · ob. mare', title: 'Siderofagele: macrofage cu granule brun-aurii',
    hud: ['<b>HE</b> · ob. mare'],
    points: [
      D('Siderofage („celule cardiace”)', 'macrofage cu !!pigment brun de hemosiderină!! în citoplasmă', 'EN: heart failure cells'),
      D('Sept fibrozat', 'îngroșat, cu **vase congestionate**'),
      D('Hematii', 'în vasele congestionate; cele **extravazate** sunt fagocitate'),
    ],
    insets: [Z('lp_l2_staza', 0, 'Siderofage, lama de la LP'), Z('lp_l2_staza', 1, 'Sept îngroșat, lama de la LP'), Z('lp_l2_staza', 2, 'Hematii în vas, lama de la LP'), P('lp_l2_lama_b', 'Lama 2 de la LP, la ochiul liber')],
    beatDur: 6,
    xtra: 'Hemosiderina conține fier: cu reacția Perls se colorează albastru, iar pigmentul negru de cărbune (antracoza) nu. Pe lama ta, în HE, recunoști siderofagele după culoarea brun-aurie.',
  },
  {
    scene: 'stazaWhy', anim: true, spec: 'Atriul stâng (jos-stânga) bate și se mărește; pe vena pulmonară hematiile curg spre el din ce în ce mai încet. 1: AS dilatat; 2: săgeata galbenă urcă retrograd spre alveolă și vena se lărgește; 3: hematii ies în alveolă și un macrofag le fagocitează (siderofag brun); 4: peretele alveolei se îngroașă (fibroză). Se oprește pe starea finală.', kick: 'Lama 2 · Stază · De ce arată așa?', title: 'Siderofagele vin din staza venoasă: congestie pasivă',
    hud: ['AS → vene → capilare → alveolă'],
    points: [
      D('Congestia = proces pasiv', '!!alterarea drenajului sanguin venos → stază!! (ex. congestia din **insuficiența cardiacă**)'),
      D('Presiunea urcă retrograd', 'în **venele și capilarele pulmonare**: vase congestionate'),
      D('Hematiile ies, macrofagele le mănâncă', 'macrofagele **migrează intraalveolar** ca să fagociteze hematiile extravazate'),
      D('Hemosiderină + fibroză', 'hematiile degradate → !!hemosiderină!! → **siderofage (celule cardiace)**; septurile se îngroașă și se fibrozează'),
    ],
    why: '**Hiperemia** e un proces **activ** (dilatare arteriolară, aport crescut de sânge: inflamație, mușchi în efort); **congestia** e un proces !!pasiv!! (drenaj venos alterat). Pe piesă (piesa 9): greutate crescută, culoare brună (siderofage), consistență fermă = **indurație brună**.',
    insets: [P('lp_l2_staza', 'Rezultatul pe lama de la LP')],
    beatDur: 6.5,
    xtra: 'Pe desen, presiunea pornește din atriul stâng: când inima stângă cedează, sângele stagnează în venele pulmonare. Fibroza septurilor vine din edemul cronic și hipoxie.',
  },
  {
    scene: 'infMic', kick: 'Lama 2 · Infarct pulmonar · HE · ob. mic', title: 'A doua leziune: aria roșie de sub pleură',
    hud: ['<b>HE</b> · aceeași lamă'],
    points: [
      D('Pleura viscerală', 'la suprafața preparatului'),
      D('Zona de infarct', '!!bine delimitată!!: alveole !!inundate hemoragic!!, septuri cu alveolocite necrozate'),
      D('Plămânul din jur', '**modificări de stază cronică**; la limită: !!lizereu congestiv!!'),
    ],
    why: 'Lizereul congestiv = bandă de demarcație cu **vase congestionate, eritrocite extravazate și infiltrat inflamator acut**: un mecanism reflex/compensator al ischemiei. Un **sept conjunctiv intersegmentar** limitează pătrunderea sângelui în teritoriile vecine.',
    insets: [P('lp_l2_inf_lama', 'Lama 2 de la LP, la ochiul liber'), Z('lp_l2_inf', 0, 'Zona de infarct, lama de la LP'), Z('lp_l2_inf', 1, 'Plămânul din jur, lama de la LP')],
    beatDur: 6,
    xtra: 'Pe lamă vezi doar o parte din zona de infarct, aproape de pleură; forma întreagă (triunghiulară, cu vârful spre hil) se vede pe piesa 9.',
  },
  {
    scene: 'infMare', kick: 'Lama 2 · Infarct pulmonar · HE · ob. mare', title: 'Septuri fără nuclei: asta îl deosebește de o hemoragie',
    hud: ['<b>HE</b> · ob. mare'],
    points: [
      D('Alveole inundate hemoragic', 'pline cu **eritrocite**: de aici culoarea roșie'),
      D('Septuri necrozate', '!!arhitectura păstrată, aspect umbriform, fără nuclei!! = necroză'),
      D('Sept conjunctiv', 'limitează pătrunderea sângelui în parenchimul vecin'),
    ],
    why: '!!Septurile fără nuclei!! arată că zona e moartă, nu doar plină de sânge.',
    insets: [Z('lp_l2_inf', 0, 'Alveole inundate hemoragic, lama de la LP'), P('lp_l2_inf', 'Lama de la LP · ob. mic'), Z('lp_l2_inf', 2, 'Limita zonei de infarct, lama de la LP')],
    beatDur: 6,
    xtra: 'O hemoragie simplă umple alveolele cu sânge, dar septurile rămân vii, cu nuclei; de aceea te uiți la septuri.',
  },
  {
    scene: 'infWhy', anim: true, spec: 'Lob pulmonar cu pleura sus. 1: embolul urcă pe trunchiul arterei pulmonare și se oprește la vârful conului; ramura de după el devine gri; 2: apare artera bronșică (roșie), din care sângele intră în con; 3: conul cu baza la pleură se colorează roșu-închis (sânge în alveole); 4: textul „fără nuclei” pe con (septurile mor). Se oprește pe starea finală.', kick: 'Lama 2 · Infarct · De ce arată așa?', title: 'De ce e roșu: circulația dublă inundă țesutul mort',
    hud: ['embol + a. bronșice'],
    points: [
      D('Embol în a. pulmonară (TEP)', 'trombul venos (**TVP**, membrele inferioare) migrează spre cord și se oprește într-o **ramură a arterei pulmonare**'),
      D('Circulația dublă', 'normal, !!ramurile bronșice suplinesc parțial debitul!!: infarctul **nu** se produce'),
      D('Cu stază cronică preexistentă', '**presiunea crescută** împiedică vascularizarea compensatorie → !!infarct!!'),
      D('Infarct roșu (hemoragic)', 'alveolele se inundă cu sânge; septurile mor: **fără nuclei**'),
    ],
    why: 'Infarctul = !!necroza unui țesut cauzată de aportul insuficient de sânge oxigenat!!. Infarctul pulmonar apare **doar** dacă există deja o **stază pulmonară cronică**: de aceea, pe aceeași lamă, **stază + infarct**.',
    insets: [P('lp_l2_inf', 'Rezultatul pe lama de la LP · ob. mic')],
    beatDur: 6.5,
    xtra: 'Sângele care inundă zona vine prin arterele bronșice, într-un țesut lax și deja congestionat; de aceea infarctul pulmonar e roșu, iar cel renal e alb.',
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'staza', b: 'edem', l: 'Plămân de stază cronică + infarct pulmonar (lama ta)', r: 'edem pulmonar acut' },
    kick: 'Lama 2 · Diagnostic diferențial', title: 'Cu ce o compari: Edem pulmonar acut',
    hud: ['1 asemănare + 3 diferențe'],
    points: [
      D('Asemănarea', 'Ambele: plămân în HE, cu vase congestionate.'),
      D('Diferența 1', 'La mine, în alveole, !!siderofage (celule cardiace)!! cu pigment brun de hemosiderină; la edem alveolele sunt pline cu substanță omogenă, eozinofilă, cu bule de aer.'),
      D('Diferența 2', 'La mine septurile sunt !!îngroșate, fibrozate!!; la edem septurile sunt doar ușor expandate de lichid.'),
      D('Diferența 3', 'La mine și o !!zonă de infarct!!: alveole inundate hemoragic, septuri fără nuclei, lizereu congestiv; la edem nu există necroză.'),
    ],
    alt: ['**Infarct renal**: Infarct alb: zonă palidă, „fantomatică”, cu tubi și glomeruli fără nuclei; la mine zona de infarct e inundată hemoragic.', '**Tromb mixt**: Hematiile sunt în lumenul unui vas, în straturi alternante cu trombocite și fibrină (liniile lui Zahn); la mine hematiile umplu alveolele.'],
    insets: [P('lp_l2_staza', 'Lama 2 de la LP: stază cronică'), P('lp_l1_mic', 'Lama 1 de la LP: Edem pulmonar acut'), P('lp_l1_mic', 'Lama 1 de la LP: Edem pulmonar acut'), P('lp_l2_inf', 'Lama 2 de la LP: zona de infarct')],
    beatDur: 8,
  },
  {
    ...SCRIPT('staza', [
      { tm: 'Organ', at: '1 p', tx: '!!Plămân!!, colorația **HE**.' },
      { tm: 'Leziune', at: '1 p', tx: '!!Plămân de stază cronică (congestie pulmonară cronică) cu infarct pulmonar!! (roșu, hemoragic).' },
      { tm: 'Definiție', at: '1 p', tx: 'Congestia = !!proces pasiv, prin alterarea drenajului sanguin venos → stază!!. Infarctul = **necroza unui țesut cauzată de aportul insuficient de sânge oxigenat**.' },
      { tm: 'Descriere · staza', at: '3 p', tx: '● **septuri interalveolare îngroșate, fibrozate, cu vase congestionate** ● în spațiile alveolare: **siderofage (celule cardiace)** cu pigment brun de hemosiderină, izolate sau grupate ● hemosiderina provine din **degradarea hematiilor extravazate** din vasele congestionate.' },
      { tm: 'Descriere · infarctul', at: '4 p', tx: '● **zonă bine delimitată**, cu alveole **inundate hemoragic** și alveolocite necrozate ● **arhitectura păstrată**, aspect umbriform, **fără nuclei** ● parenchimul adiacent cu **modificări de stază cronică** ● la limită: !!lizereu congestiv!! (vase congestionate, eritrocite extravazate, infiltrat inflamator acut).' },
      { tm: 'Cauze', at: '3 p', tx: '● staza: **alterarea drenajului venos** (congestia din **insuficiența cardiacă**) ● infarctul: **obstrucția unei ramuri a arterei pulmonare (TEP)**, de obicei dintr-o TVP a membrelor inferioare ● infarctul apare **doar pe o stază cronică preexistentă**: presiunea crescută împiedică suplinirea prin ramurile bronșice.' },
      { tm: 'Complicații', at: '—', tx: 'LP nu dă complicații separate pentru staza cronică și infarctul pulmonar.' },
      { tm: 'DD', at: '✓', tx: 'Cu **Edem pulmonar acut**. Asemănare: Ambele: plămân în HE, cu vase congestionate. Diferențe: ① La mine, în alveole, siderofage (celule cardiace) cu pigment brun de hemosiderină; la edem alveolele sunt pline cu substanță omogenă, eozinofilă, cu bule de aer. ② La mine septurile sunt îngroșate, fibrozate; la edem septurile sunt doar ușor expandate de lichid. ③ La mine și o zonă de infarct: alveole inundate hemoragic, septuri fără nuclei, lizereu congestiv; la edem nu există necroză.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **plămân de stază cronică cu infarct pulmonar hemoragic**.' },
    ], [8, 10, 22, 35, 40, 30, 12, 40, 6]),
    kick: 'Lama 2 · Fișa OSPE · stază + infarct', title: 'Ce spui cu voce tare: ambele leziuni, legat (13 p, minim 5)',
    why: 'Hiperemia e un proces **activ** (dilatare arteriolară, aport crescut de sânge), congestia e un proces **pasiv** (drenaj venos alterat). Plămânul are **circulație dublă**: fără stază, ramurile bronșice suplinesc debitul și infarctul nu apare.',
    warn: 'Nu te opri la stază: caută și **zona de infarct**, cu alveole inundate hemoragic și **septuri fără nuclei**.',
  },
  {
    scene: 'atlas', sceneOpts: { img: 'lp_l2_staza', W: 1115, H: 530, marks: [
      { x: 600, y: 385, rx: 125, ry: 98, lab: 'siderofage (pigment brun)' },
      { x: 112, y: 325, rx: 42, ry: 85, lab: 'sept îngroșat' },
      { x: 805, y: 282, rx: 60, ry: 88, rot: -0.3, lab: 'vas congestionat' },
    ] },
    kick: 'Lama 2 · Stază pe lama de la LP · HE', title: 'Staza pe lama de la LP: ce încercuiești',
    hud: ['lama de la LP'],
    points: [D('Siderofage', 'grupuri !!brune!! în alveole (celule cardiace)'), D('Sept îngroșat', '**fibrozat**'), D('Vas congestionat', 'plin cu **hematii**')],
    why: 'Poza: lama de la LP (preparatul de la examen).',
  },
  {
    scene: 'atlas', sceneOpts: { img: 'lp_l2_inf', W: 1522, H: 723, marks: [
      { x: 320, y: 570, rx: 230, ry: 110, lab: 'zona de infarct: alveole inundate hemoragic' },
      { x: 1200, y: 120, rx: 230, ry: 80, lab: 'plămânul din jur (stază)' },
      { x: 1250, y: 318, rx: 230, ry: 24, dash: true, lab: 'limita zonei de infarct' },
    ] },
    kick: 'Lama 2 · Infarct pe lama de la LP · ob. mic · HE', title: 'Infarctul pe lama de la LP: zona roșie și limita ei',
    hud: ['lama de la LP · ob. mic'],
    points: [D('Zona de infarct', 'alveole !!inundate hemoragic!!'), D('Plămânul din jur', 'cu **stază cronică**'), D('Limita', 'zona de infarct e !!bine delimitată!!')],
    why: 'Poza: lama de la LP (preparatul de la examen).',
  },
  {
    scene: 'atlas', sceneOpts: { img: 'lp_l2_inf_lama', W: 459, H: 547, marks: [
      { x: 200, y: 405, rx: 125, ry: 95, lab: 'zona de infarct (roșie)' },
      { x: 275, y: 150, rx: 110, ry: 85, lab: 'plămânul din jur' },
      { x: 190, y: 302, rx: 150, ry: 16, rot: 0.05, dash: true, lab: 'limita netă' },
    ] },
    kick: 'Lama 2 · Lama de la LP · la ochiul liber', title: 'Infarctul se vede și cu ochiul liber: zona roșie de pe lamă',
    hud: ['lama de la LP · ochiul liber'],
    points: [D('Zona de infarct', 'roșie, !!bine delimitată!!'), D('Plămânul din jur', 'roz-pal, cu stază'), D('Limita', 'netă, între cele două zone')],
    why: 'Poza: lama de la LP (preparatul de la examen).',
  },

  // ======================= LAMA 3 · INFARCT RENAL
  {
    scene: 'renMic', kick: 'Lama 3 · Infarct renal · HE · ob. mic', title: 'Zona moartă păstrează desenul, dar își pierde nucleii',
    hud: ['Lama 3 din 5', '<b>HE</b> · rinichi (corticală)'],
    points: [
      D('Parenchim renal normal', 'glomeruli și tubi **cu nuclei**'),
      D('Zona de infarct', 'aspect !!„fantomatic”!!: !!pierderea nucleilor, cu păstrarea arhitecturii!!; zonă **palidă**'),
      D('Lizereu congestiv', 'la limită: !!capilare congestionate + bandă de infiltrat inflamator acut!!'),
    ],
    why: 'Rinichiul e un organ parenchimatos cu **circulație unică** → infarct **alb (anemic, ischemic)**. EN: renal infarct · LA: infarctus renis anaemicus.',
    insets: [P('lp_l3_lama', 'Lama 3 de la LP, la ochiul liber'), Z('lp_l3_mic', 0, 'Zona infarctată, lama de la LP'), Z('lp_l3_mic', 1, 'Lizereu, lama de la LP')],
    beatDur: 6,
    xtra: 'Dispariția nucleilor cu păstrarea conturului celulelor e semnătura necrozei de coagulare: proteinele se denaturează, iar forma rămâne câteva zile.',
  },
  {
    scene: 'renMare', kick: 'Lama 3 · Infarct renal · HE · ob. mare', title: 'Celulele moarte își păstrează forma câteva zile',
    hud: ['<b>HE</b> · ob. mare'],
    points: [
      D('Glomerul „fantomă”', 'ghemul se recunoaște, !!nucleii au dispărut!!'),
      D('Tub „fantomă”', '!!conturul păstrat!!, fără nuclei'),
      D('Material în lumen', 'eozinofil, în unii tubi; îl vezi pe desen, dar LP nu-l descrie: nu-l spui la fișă'),
    ],
    insets: [Z('lp_l3_mic', 0, 'Zona „fantomă”, lama de la LP'), Z('lp_l3_mic', 0, 'Tubi fără nuclei, lama de la LP'), null],
    beatDur: 6.5,
    xtra: 'Nucleul dispare în trei pași: picnoză (mic, dens), carioreexă (fragmentat), carioliză (șters). Enzimele se denaturează și ele, deci celula nu se autodigeră repede: de aici forma păstrată.',
  },
  {
    scene: 'renWhy', anim: true, spec: 'Rinichi cu arborele arterial (terminal). 1: embolul merge pe artera renală și se oprește la intrarea în ramura conului; 2: ramurile din con devin gri, cu inele galbene pe capete (artere terminale); 3: conul cu baza la capsulă devine galben-palid (infarct alb); 4: marginea conului se înroșește (lizereu). Se oprește pe starea finală.', kick: 'Lama 3 · De ce arată așa?', title: 'De ce e alb: arteră terminală într-un organ dens',
    hud: ['embol → arteră terminală → con'],
    points: [
      D('Obstrucția ramurii arteriale', '!!ramura care deservește teritoriul!! e obstruată (tromb/embol arterial)'),
      D('Circulație unică', '**fără altă sursă de sânge**: tot teritoriul rămâne neirigat'),
      D('Necroza', 'organ parenchimatos → infarct !!alb (anemic, ischemic)!!: aspect fantomatic'),
      D('Reacția la margine', '!!lizereu congestiv!!: capilare congestionate + infiltrat inflamator acut'),
    ],
    why: 'Embolizarea = un tromb (sau un fragment) e dus de fluxul sanguin până într-un ram **mai mic decât el**, pe care îl obstruează → **infarct**. Trombii arteriali migrează **distal de cord**, în direcția fluxului arterial.',
    insets: [P('lp_l3_mic', 'Rezultatul pe lama de la LP · ob. mic')],
    beatDur: 6.5,
    xtra: 'Macroscopic, același infarct e zona palidă, bine conturată de lizereul congestiv, de pe piesa 8. Cu timpul, zona necrozată e înlocuită de țesut de granulație și apoi de o cicatrice.',
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'ren', b: 'ima', l: 'Infarct renal (lama ta)', r: 'infarct miocardic acut' },
    kick: 'Lama 3 · Diagnostic diferențial', title: 'Cu ce o compari: Infarct miocardic acut',
    hud: ['1 asemănare + 3 diferențe'],
    points: [
      D('Asemănarea', 'Ambele: zonă de infarct cu pierderea nucleilor și lizereu congestiv la limită.'),
      D('Diferența 1', 'La mine se recunosc !!tubi și glomeruli „fantomă”!!; la IMA fibre musculare fără nuclei, cu sarcoplasmă omogenă, intens eozinofilă.'),
      D('Diferența 2', 'La mine lizereul e o singură bandă: capilare congestionate + infiltrat inflamator acut; la IMA lizereul are !!două benzi!!: internă de granulocite, externă de congestie.'),
      D('Diferența 3', 'La mine parenchimul din jur e renal normal; la IMA zona necrozată e delimitată de !!țesut de granulație!! care pătrunde printre fibrele normale.'),
    ],
    alt: ['**Infarctul pulmonar (zona de infarct din lama 2)**: Infarct roșu: alveole inundate hemoragic, septuri fără nuclei; la mine zona e palidă (infarct alb).', '**Abcese hepatice**: Zonă în care lipsește țesutul hepatic, plină de granulocite, colonii de microbi și globule de puroi; la mine arhitectura e păstrată.'],
    insets: [P('lp_l3_mic', 'Lama 3 de la LP: Infarct renal'), P('lp_l4_mic', 'Lama 4 de la LP: Infarct miocardic acut'), P('lp_l4_mic', 'Lama 4 de la LP: Infarct miocardic acut'), P('lp_l4_mic', 'Lama 4 de la LP: Infarct miocardic acut')],
    beatDur: 8,
  },
  {
    ...SCRIPT('ren', [
      { tm: 'Organ', at: '1 p', tx: '!!Rinichi!!, colorația **HE**.' },
      { tm: 'Leziune', at: '1 p', tx: '!!Infarct renal acut (alb, anemic, ischemic)!!.' },
      { tm: 'Definiție', at: '1 p', tx: '!!Necroza unei porțiuni din parenchimul renal, datorită obstrucției ramurii arteriale care deservește teritoriul respectiv!!.' },
      { tm: 'Descriere', at: '3 p', tx: '● **zona de infarct**: palidă, aspect **fantomatic**, prin **pierderea nucleilor, cu păstrarea arhitecturii** (necroză) ● **parenchim renal normal** alături ● la limită: !!lizereu congestiv!!: capilare congestionate, eritrocite extravazate și **bandă de infiltrat inflamator acut**.' },
      { tm: 'Cauze', at: '2 p', tx: '● **obstrucția ramurii arteriale** care deservește teritoriul (tromb/embol arterial) ● rinichiul e organ parenchimatos cu **circulație unică** → infarct alb.' },
      { tm: 'Complicații', at: '—', tx: 'LP nu dă complicații pentru infarctul renal.' },
      { tm: 'DD', at: '✓', tx: 'Cu **Infarct miocardic acut**. Asemănare: Ambele: zonă de infarct cu pierderea nucleilor și lizereu congestiv la limită. Diferențe: ① La mine se recunosc tubi și glomeruli „fantomă”; la IMA fibre musculare fără nuclei, cu sarcoplasmă omogenă, intens eozinofilă. ② La mine lizereul e o singură bandă: capilare congestionate + infiltrat inflamator acut; la IMA lizereul are două benzi: internă de granulocite, externă de congestie. ③ La mine parenchimul din jur e renal normal; la IMA zona necrozată e delimitată de țesut de granulație care pătrunde printre fibrele normale.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **infarct renal acut, anemic**.' },
    ], [8, 6, 20, 40, 20, 8, 40, 6]),
    kick: 'Lama 3 · Fișa OSPE · infarct renal', title: 'Ce spui cu voce tare (poți strânge 8 p, minim 5)',
  },
  {
    scene: 'atlas', sceneOpts: { img: 'lp_l3_mic', W: 1396, H: 664, marks: [
      { x: 1060, y: 380, rx: 210, ry: 150, lab: 'zona infarctată: tubi „fantomă”, fără nuclei' },
      { x: 520, y: 300, rx: 140, ry: 110, lab: 'lizereu: congestie + infiltrat inflamator' },
      { x: 225, y: 140, rx: 75, ry: 62, lab: 'vas congestionat' },
    ] },
    kick: 'Lama 3 · Pe lama de la LP · ob. mic · HE', title: 'Infarctul renal pe lama de la LP: zona moartă și lizereul',
    hud: ['lama de la LP · ob. mic'],
    points: [D('Zona de infarct', 'tubi !!fără nuclei!!, arhitectură păstrată'), D('Lizereu congestiv', '**capilare congestionate + infiltrat inflamator acut**'), D('Vas congestionat', 'plin cu hematii')],
    why: 'Poza: lama de la LP (preparatul de la examen).',
  },

  // ======================= LAMA 4 · INFARCT MIOCARDIC ACUT
  {
    scene: 'imaMic', kick: 'Lama 4 · Infarct miocardic acut · HE · ob. mic', title: 'O bandă de fibre roz intens, invadată de neutrofile',
    hud: ['Lama 4 din 5', '<b>HE</b> · miocard'],
    points: [
      D('Zona bine conturată', 'fibre musculare !!lipsite de nuclei!!, cu !!sarcoplasmă omogenă, intens eozinofilă!!'),
      D('Lizereu congestiv', 'la periferie: **bandă internă de granulocite**, **bandă externă de congestie**'),
      D('Miocardul învecinat', 'fibre normale; printre ele pătrunde **țesutul de granulație**'),
    ],
    why: 'Obstrucția unei ramuri coronariene → ischemia țesutului miocardic → **necroză de coagulare**, !!vizibilă microscopic după 4–6 ore!!. Zona necrozată e delimitată de **țesut de granulație** (capilare neoformate, histiocite, limfocite, fibroblaști). EN: acute myocardial infarction · LA: infarctus myocardii.',
    insets: [Z('lp_l4_mic', 0, 'Fibre necrozate, lama de la LP'), Z('lp_l4_mic', 1, 'Granulocite, lama de la LP'), Z('lp_l4_mic', 2, 'Fibre cu nuclei, lama de la LP')],
    beatDur: 6,
    xtra: 'Fibrele moarte își pierd și striațiile. Granulocitele cu nuclei fragmentați arată că infarctul are câteva zile.',
  },
  {
    scene: 'imaMare', kick: 'Lama 4 · Infarct miocardic · HE · ob. mare', title: 'Fibra moartă și neutrofilele, de aproape',
    hud: ['<b>HE</b> · ob. mare'],
    points: [
      D('Fibră necrozată', '!!fără nucleu!!, sarcoplasmă **omogenă, intens eozinofilă**'),
      D('Granulocite', 'banda internă a !!lizereului congestiv!!'),
      D('Hematii', 'în capilarele congestionate (banda externă)'),
    ],
    insets: [Z('lp_l4_mic', 0, 'Fibre necrozate, lama de la LP'), Z('lp_l4_mic', 1, 'Granulocite, lama de la LP'), P('lp_l4_lama', 'Lama 4 de la LP, la ochiul liber')],
    beatDur: 6,
    xtra: 'Neutrofilele au nucleul multilobat, iar multe sunt fragmentate (carioreexă). Interstițiul e lărgit de edem.',
  },
  {
    scene: 'imaWhy', anim: true, spec: 'Aceeași fibră miocardică în timp, cu linia timpului jos (5 opriri). 1: 4–6 ore: fibra roz intens; 2: primele zile: fibra fără nuclei, neutrofile urcă spre ea; 3: 5–10 zile: neutrofile fragmentate și celule mari în fibră, text „miomalacie → risc de ruptură”; 4: săpt. 2–6: fibra e înlocuită de capilare și fibroblaste (țesut de granulație); 5: 2–3 luni: benzi de colagen (cicatrice). Fără buclă: se oprește pe ultimul stadiu.', kick: 'Lama 4 · De ce arată așa? · cronologia', title: 'Ceasul infarctului: ce vezi la microscop după cât timp',
    hud: ['MO · aceeași fibră în timp'],
    points: [
      D('4–6 ore', 'infarctul devine !!vizibil microscopic!!; reperfuzia (tromboliză, angioplastie) în primele 4–6 ore poate preveni necroza', 'macro: primele semne după 12–24 ore (zonă palidă, halou hiperemic)'),
      D('Primele zile', 'fibre **fără nuclei**, sarcoplasmă omogenă, intens eozinofilă; **lizereu congestiv** ← **lama ta**', 'macro 2–3 zile: galben ca lutul, omogen, moale'),
      D('5–10 zile', '**miomalacie** (enzime proteolitice) → !!risc de ruptură, hemopericard, tamponadă!!'),
      D('Săptămânile 2–6', 'săpt. 2–3: **țesut de granulație** înlocuiește necroza (**1 mm/10zile**); săpt. 3–4: devine țesut conjunctiv matur, din exterior spre interior; săpt. 5–6: începe cicatrizarea'),
      D('2–3 luni', 'cicatrizarea se încheie; macro: !!țesut cicatriceal alb-sidefiu!!', 'vindecarea prin cicatrizare depinde de extinderea infarctului'),
    ],
    why: 'Etiologia: **coronaroscleroza**, **tromboza/embolia coronarelor**, **spasmul coronarian**. Factori de risc: HTA, hiperlipemie, sedentarism, diabet zaharat, stres, fumat. Extinderea: **transmural** (toată grosimea), **intramural**, **subendocardic** (1/3 internă); necroze miliare multiple (miocitoliză focală) subendocardic și în mușchii papilari.',
    insets: [null, Z('lp_l4_mic', 0, 'Lama de la LP: fibre fără nuclei'), null, null, null],
    beatDur: 6,
    xtra: 'Ruptura vine în zilele 5–10 pentru că macrofagele au digerat fibrele moarte, iar colagenul cicatricei încă nu s-a depus: peretele e cel mai slab.',
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'ima', b: 'ren', l: 'Infarct miocardic acut (lama ta)', r: 'infarct renal' },
    kick: 'Lama 4 · Diagnostic diferențial', title: 'Cu ce o compari: Infarct renal',
    hud: ['1 asemănare + 3 diferențe'],
    points: [
      D('Asemănarea', 'Ambele: zonă de infarct cu pierderea nucleilor și lizereu congestiv la limită.'),
      D('Diferența 1', 'La mine !!fibre musculare fără nuclei!!, cu sarcoplasmă omogenă, intens eozinofilă; la infarctul renal tubi și glomeruli „fantomă”.'),
      D('Diferența 2', 'La mine lizereul are !!două benzi!!: internă de granulocite, externă de congestie; la infarctul renal o bandă de capilare congestionate și infiltrat inflamator acut.'),
      D('Diferența 3', 'La mine necroza e delimitată de !!țesut de granulație!! (capilare neoformate, histiocite, limfocite, fibroblaști); la infarctul renal, alături, parenchim renal normal.'),
    ],
    alt: ['**Pericardită fibrinoasă**: Fibrina și infiltratul inflamator sunt pe suprafața epicardului, structura miocardului e păstrată; la mine fibrele miocardice sunt necrozate.', '**Abcese hepatice**: Zone în care lipsește țesutul, cu granulocite, colonii de microbi și globule de puroi; la mine fibrele moarte își păstrează conturul.'],
    insets: [P('lp_l4_mic', 'Lama 4 de la LP: Infarct miocardic acut'), P('lp_l3_mic', 'Lama 3 de la LP: Infarct renal'), P('lp_l3_mic', 'Lama 3 de la LP: Infarct renal'), P('lp_l3_mic', 'Lama 3 de la LP: Infarct renal')],
    beatDur: 8,
  },
  {
    ...SCRIPT('ima', [
      { tm: 'Organ', at: '1 p', tx: '!!Miocard!! (cord), colorația **HE**.' },
      { tm: 'Leziune', at: '1 p', tx: '!!Infarct miocardic acut!!.' },
      { tm: 'Definiție', at: '1 p', tx: 'Infarctul = !!necroza unui țesut cauzată de aportul insuficient de sânge oxigenat!!; aici, a miocardului.' },
      { tm: 'Descriere', at: '4 p', tx: '● zonă **bine conturată**: fibre musculare **lipsite de nuclei**, sarcoplasmă **omogenă, intens eozinofilă** ● la periferie: !!lizereu congestiv!!: bandă internă de **granulocite**, bandă externă de **congestie** ● zona necrozată delimitată de **țesut de granulație** (capilare neoformate, histiocite, limfocite, fibroblaști) ● țesutul de granulație pătrunde și printre **fibrele normale** ale miocardului vecin.' },
      { tm: 'Cauze', at: '3 p', tx: '● **coronaroscleroza** ● **tromboza/embolia coronarelor** ● **spasmul coronarian** (factori de risc: HTA, hiperlipemie, sedentarism, diabet zaharat, stres, fumat).' },
      { tm: 'Complicații', at: '10 p', tx: '● **tulburări de ritm și conducere** (FiV) ● **insuficiență cardiacă** (20%) ● **șoc cardiogen** (40%) ● **ruptura cordului** (miomalacie) → hemopericard, tamponadă ● **complicații tromboembolice** ● **anevrism cardiac** ● **infarctizare progresivă** ● **moarte subită** ● **insuficiențe valvulare** ● **sindrom Dressler** (pericardită).' },
      { tm: 'DD', at: '✓', tx: 'Cu **Infarct renal**. Asemănare: Ambele: zonă de infarct cu pierderea nucleilor și lizereu congestiv la limită. Diferențe: ① La mine fibre musculare fără nuclei, cu sarcoplasmă omogenă, intens eozinofilă; la infarctul renal tubi și glomeruli „fantomă”. ② La mine lizereul are două benzi: internă de granulocite, externă de congestie; la infarctul renal o bandă de capilare congestionate și infiltrat inflamator acut. ③ La mine necroza e delimitată de țesut de granulație (capilare neoformate, histiocite, limfocite, fibroblaști); la infarctul renal, alături, parenchim renal normal.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **infarct miocardic acut**.' },
    ], [8, 6, 15, 45, 20, 45, 40, 6]),
    kick: 'Lama 4 · Fișa OSPE · infarct miocardic acut', title: 'Ce spui cu voce tare (poți strânge 20 p, minim 5)',
  },
  {
    scene: 'atlas', sceneOpts: { img: 'lp_l4_mic', W: 1368, H: 650, marks: [
      { x: 900, y: 320, rx: 185, ry: 110, lab: 'fibre necrozate, intens eozinofile' },
      { x: 130, y: 565, rx: 115, ry: 60, lab: 'infiltrat de granulocite' },
      { x: 400, y: 448, rx: 120, ry: 40, lab: 'fibre cu nuclei (viabile)' },
    ] },
    kick: 'Lama 4 · Pe lama de la LP · ob. mic · HE', title: 'Infarctul miocardic pe lama de la LP',
    hud: ['lama de la LP · ob. mic'],
    points: [D('Fibre necrozate', 'intens eozinofile, !!fără nuclei!!'), D('Granulocite', 'banda internă a !!lizereului!!'), D('Fibre viabile', 'cu nuclei, la periferie')],
    why: 'Poza: lama de la LP (preparatul de la examen).',
  },

  // ======================= LAMA 5 · TROMB MIXT
  {
    scene: 'trombMic', kick: 'Lama 5 · Tromb mixt · HE · ob. mic', title: 'Lamele alternante palide și roșii, lipite de perete',
    hud: ['Lama 5 din 5', '<b>HE</b> · vas sanguin'],
    points: [
      D('Straturi roșii', '**bogate în hematii** (roșu închis macroscopic)'),
      D('Straturi slab eozinofile', '!!trombocite + fibrină!! (palide/albe macroscopic)'),
      D('Peretele de vas arterial', 'trombul e !!aderent de peretele vasului!!'),
    ],
    why: 'Straturile alternante sunt !!liniile lui Zahn!!: elementele sângelui dispuse într-o **rețea de fibrină**. Tromboza = **coagulare intravasculară și intravitală**. EN: mixed thrombus; lines of Zahn · LA: thrombus.',
    insets: [Z('lp_l5_mic', 0, 'Lamelă roșie, lama de la LP'), Z('lp_l5_mic', 1, 'Lamelă palidă, lama de la LP'), Z('lp_l5_mic', 2, 'Peretele vascular, lama de la LP')],
    beatDur: 6,
    xtra: 'Liniile lui Zahn arată că trombul s-a format în sângele care circula, nu după moarte. „Mixt” = are și straturi albe, și straturi roșii.',
  },
  {
    scene: 'trombMare', kick: 'Lama 5 · Tromb mixt · HE · ob. mare', title: 'Fibrina, trombocitele și celulele prinse între ele',
    hud: ['<b>HE</b> · ob. mare'],
    points: [
      D('Rețeaua de fibrină', 'în ochiurile ei se depun !!alternativ leucocite și trombocite, apoi eritrocite!!'),
      D('Între benzi', '**leucocite și hematii** prinse în rețea'),
      D('Marginea liberă', 'spre **lumen**'),
    ],
    insets: [Z('lp_l5_mic', 1, 'Lamelă palidă (fibrină), lama de la LP'), Z('lp_l5_mic', 0, 'Lamelă roșie, lama de la LP'), P('lp_l5_lama', 'Lama 5 de la LP, la ochiul liber')],
    beatDur: 6,
    xtra: 'Nu vezi fibroblaste sau capilare de neoformație: trombul e recent, încă neorganizat.',
  },
  {
    scene: 'trombWhy', anim: true, spec: '1: triunghiul triadei Virchow (leziune endotelială, flux anormal, hipercoagulabilitate) cu „TROMB” în centru; 2: în vas, trombocitele (violet) coboară și formează primul strat palid; 3: fibrina cu hematii formează stratul roșu; 4: straturile se repetă (liniile lui Zahn) cât sângele curge în continuare. Se oprește pe trombul stratificat.', kick: 'Lama 5 · De ce arată așa?', title: 'Cum apar straturile: sângele curge peste tromb',
    hud: ['Virchow → straturi'],
    points: [
      D('Triada Virchow', '!!leziune endotelială + flux sanguin anormal + status hipercoagulant!!'),
      D('Trombocitele', 'se depun în **ochiurile rețelei de fibrină**, cu leucocitele: **stratul palid**'),
      D('Eritrocitele', 'urmează **eritrocitele**: **stratul roșu**'),
      D('Straturi repetate', 'depunerea alternează = !!liniile lui Zahn!!'),
    ],
    why: 'Trombii **venoși** (TVP, membrele inferioare) migrează spre cord (risc de **TEP**) și cresc **în direcția fluxului**; trombii **arteriali** migrează **distal de cord** și cresc **retrograd** față de punctul de atașare. Evoluția: !!propagare · embolizare · dizolvare · organizare/recanalizare!!.',
    insets: [null, P('lp_l5_lama', 'Lama 5 de la LP: trombul lipit de perete'), P('lp_l5_mic', 'Lama 5 de la LP: straturile trombului'), P('lp_l5_mic', 'Lama 5 de la LP: liniile lui Zahn')],
    beatDur: 6.5,
    xtra: 'Trombocitele aderă unde endoteliul e lezat; peste ele, cascada coagulării depune fibrină care prinde hematii, iar sângele care continuă să curgă repetă ciclul.',
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'tromb', b: 'tromb', bImg: 'lp_l15_mic', l: 'Tromb mixt (lama ta)', r: 'pericardită fibrinoasă' },
    kick: 'Lama 5 · Diagnostic diferențial', title: 'Cu ce o compari: Pericardită fibrinoasă',
    hud: ['1 asemănare + 3 diferențe'],
    points: [
      D('Asemănarea', 'Ambele: depozit eozinofil de fibrină, cu celule ale sângelui prinse în ochiurile rețelei.'),
      D('Diferența 1', 'La mine masa e în !!lumenul unui vas arterial!!, aderentă de perete; la pericardită fibrina e pe suprafața seroasei, ulcerată.'),
      D('Diferența 2', 'La mine straturi alternante: slab eozinofile (trombocite + fibrină) și roșii (hematii) = !!liniile lui Zahn!!; la pericardită o rețea de filamente grosolane roșu-roz, cu granulocite și histiocite.'),
      D('Diferența 3', 'La mine dedesubt e !!peretele vasului!!; la pericardită țesut subepicardic îngroșat, cu capilare congestionate și infiltrat inflamator, peste miocardul păstrat.'),
    ],
    alt: ['**Infarctul pulmonar (zona de infarct din lama 2)**: Eritrocitele inundă alveolele, între septuri fără nuclei; la mine sunt în straturi, în rețeaua de fibrină, în lumenul vasului.', '**Hipercheratoză**: Strat cornos îngroșat, fără nuclei, peste epiderm; la mine straturi de trombocite, fibrină și hematii în lumenul unui vas.'],
    insets: [P('lp_l5_mic', 'Lama 5 de la LP: Tromb mixt'), P('lp_l15_mic', 'Lama 15 de la LP: Pericardită fibrinoasă'), P('lp_l15_mic', 'Lama 15 de la LP: Pericardită fibrinoasă'), P('lp_l15_mic', 'Lama 15 de la LP: Pericardită fibrinoasă')],
    beatDur: 8,
  },
  {
    ...SCRIPT('tromb', [
      { tm: 'Organ', at: '1 p', tx: '!!Vas arterial!! (perete de vas arterial), colorația **HE**.' },
      { tm: 'Leziune', at: '1 p', tx: '!!Tromb mixt stratificat!!.' },
      { tm: 'Definiție', at: '1 p', tx: 'Tromboza = !!coagulare intravasculară și intravitală!!.' },
      { tm: 'Descriere', at: '4 p', tx: '● tromb **aderent de peretele vasului arterial** ● **rețea de fibrină** în ochiurile căreia se depun alternativ leucocite și trombocite, apoi eritrocite ● straturi **slab eozinofile** (trombocite + fibrină; palide macroscopic) alternând cu straturi **roșii** (bogate în hematii; roșu închis macroscopic) ● = !!liniile lui Zahn!!.' },
      { tm: 'Cauze', at: '3 p', tx: '● triada Virchow: **leziunea endotelială** ● **fluxul sanguin anormal** ● **statusul hipercoagulant**.' },
      { tm: 'Complicații', at: '4 p', tx: '● **propagarea** (creșterea în dimensiuni) ● **embolizarea** → ram mai mic obstruat → **infarct** (trombii venoși: risc de TEP) ● **dizolvarea** (fibrinolitici endogeni sau exogeni: t-PA) ● **organizarea/recanalizarea** (endotelizare, înglobare în perete, capilare în grosimea trombului).' },
      { tm: 'DD', at: '✓', tx: 'Cu **Pericardită fibrinoasă**. Asemănare: Ambele: depozit eozinofil de fibrină, cu celule ale sângelui prinse în ochiurile rețelei. Diferențe: ① La mine masa e în lumenul unui vas arterial, aderentă de perete; la pericardită fibrina e pe suprafața seroasei, ulcerată. ② La mine straturi alternante: slab eozinofile (trombocite + fibrină) și roșii (hematii) = liniile lui Zahn; la pericardită o rețea de filamente grosolane roșu-roz, cu granulocite și histiocite. ③ La mine dedesubt e peretele vasului; la pericardită țesut subepicardic îngroșat, cu capilare congestionate și infiltrat inflamator, peste miocardul păstrat.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **tromb mixt stratificat, cu liniile lui Zahn**.' },
    ], [8, 6, 12, 45, 20, 35, 40, 6]),
    kick: 'Lama 5 · Fișa OSPE · tromb mixt', title: 'Ce spui cu voce tare (poți strânge 14 p, minim 5)',
  },
  {
    scene: 'atlas', sceneOpts: { img: 'lp_l5_mic', W: 1090, H: 518, marks: [
      { x: 470, y: 300, rx: 72, ry: 155, lab: 'lamelă roșie (hematii)' },
      { x: 250, y: 250, rx: 42, ry: 200, lab: 'lamelă palidă (trombocite, fibrină)', ly: 28 },
      { x: 895, y: 250, rx: 72, ry: 220, lab: 'peretele vascular' },
    ] },
    kick: 'Lama 5 · Pe lama de la LP · ob. mic · HE', title: 'Trombul pe lama de la LP: straturile lui Zahn',
    hud: ['lama de la LP · ob. mic'],
    points: [D('Strat roșu', '**hematii**'), D('Strat slab eozinofil', '!!trombocite + fibrină!!'), D('Peretele vasului', 'trombul e !!aderent!! de el')],
    why: 'Poza: lama de la LP (preparatul de la examen).',
  },
  {
    scene: 'atlas', sceneOpts: { img: 'lp_l5_lama', W: 419, H: 727, marks: [
      { x: 200, y: 280, rx: 110, ry: 220, lab: 'trombul' },
      { x: 335, y: 330, rx: 22, ry: 190, lab: 'peretele vascular' },
    ] },
    kick: 'Lama 5 · Lama de la LP · la ochiul liber', title: 'Cu ochiul liber: masa roșie lipită de perete',
    hud: ['lama de la LP · ochiul liber'],
    points: [D('Trombul', 'masă roșie, cu **straturi**'), D('Peretele vascular', 'trombul e !!aderent!! de el')],
    why: 'Poza: lama de la LP (preparatul de la examen).',
  },

  // ======================= RECAPITULARE
  {
    scene: 'recap', kick: 'LP 1–2 · Recapitulare · lamele (HE)', title: 'Cele 5 lame: după ce le recunoști, mecanismul, cu ce le confunzi',
    hud: ['5 lame · HE'],
    table: { head: ['Lama', 'O recunoști după', 'Mecanism', 'Nu o confunda cu'], rows: [
      ['1. Edem pulmonar acut', 'alveole cu **substanță omogenă, eozinofilă** (transsudat); bule de aer; septuri ușor expandate; vase congestionate', 'P hidrostatică ↑ / P oncotică ↓ → transsudat', '**Plămân de stază cronică + infarct pulmonar** · alt.: Infarctul pulmonar (lama 2) · Pericardită fibrinoasă'],
      ['2. Stază + infarct pulmonar', '!!septuri fibrozate + siderofage!!; zonă cu **alveole inundate hemoragic, septuri fără nuclei**, lizereu congestiv', 'drenaj venos alterat → hemosiderină; TEP + stază cronică → infarct roșu', '**Edem pulmonar acut** · alt.: Infarct renal · Tromb mixt'],
      ['3. Infarct renal', 'aspect !!fantomatic!! (fără nuclei, arhitectură păstrată); **lizereu congestiv**', 'obstrucția ramurii arteriale; circulație unică → alb', '**Infarct miocardic acut** · alt.: Infarctul pulmonar (lama 2) · Abcese hepatice'],
      ['4. Infarct miocardic acut', 'fibre !!fără nuclei!!, sarcoplasmă omogenă, intens eozinofilă; lizereu cu 2 benzi; țesut de granulație', 'coronaroscleroză, tromboză/embolie, spasm', '**Infarct renal** · alt.: Pericardită fibrinoasă · Abcese hepatice'],
      ['5. Tromb mixt', 'aderent de peretele arterial; straturi palide/roșii în rețea de fibrină = !!Zahn!!', 'triada Virchow', '**Pericardită fibrinoasă** · alt.: Infarctul pulmonar (lama 2) · Hipercheratoză'],
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
