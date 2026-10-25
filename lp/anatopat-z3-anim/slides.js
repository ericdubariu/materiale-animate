// Preparatele 13–18 (lamele de la Distrofii / Inflamații, LP 3–4). Textul vine din materialul OSPE al lui Eric
// (scripturile pe fișa oficială O.S.P.E. Morfopatologie). Ce e marcat „(manual)” nu e din sinteza disciplinei.

export const GLOS = [
  ['LP', 'lucrarea practică'], ['HE', 'colorația hematoxilină-eozină'], ['OSPE', 'examen practic structurat pe stații'],
  ['DD', 'diagnostic diferențial'], ['EN', 'termenul în engleză'], ['LA', 'termenul în latină'], ['ob.', 'obiectivul'],
  ['TBC', 'tuberculoza'], ['IL', 'interleukina'], ['IFN', 'interferonul'], ['CD4', 'limfocitele T helper (purtătoare de CD4)'],
  ['Th1', 'limfocitele T helper de tip 1'], ['BAAR', 'bacili acid-alcoolo-rezistenți'], ['CCl4', 'tetraclorura de carbon'],
  ['v.', 'vena'], ['RAA', 'reumatismul articular acut'], ['IMA', 'infarctul miocardic acut'], ['β-ox', 'β-oxidarea acizilor grași (în mitocondrii)'], ['p', 'punct(e)'],
];
export const TERMS = [
  ['acantoz', 'acantoză', 'îngroșarea stratului spinos, cu creste interpapilare alungite'],
  ['ortocheratoz', 'ortocheratoză', 'cheratinizare completă: stratul cornos fără nuclei'],
  ['paracheratoz', 'paracheratoză', 'cheratinizare incompletă: nuclei rămași în stratul cornos, granulos absent'],
  ['keratohialin', 'keratohialină', 'granule bazofile din stratul granulos, precursoare ale cheratinei'],
  ['leucoplazi', 'leucoplazie', 'placă albă pe o mucoasă (hipercheratoză), uneori precanceroasă'],
  ['ihtioz', 'ihtioză', 'boală genetică cu piele uscată, solzoasă'],
  ['macrovezicular', 'macroveziculară', 'o singură vacuolă mare de grăsime care împinge nucleul'],
  ['balonizar', 'balonizare', 'celulă umflată de apă, cu citoplasmă clară, floconoasă'],
  ['apoprotein', 'apoproteine', 'proteinele care „îmbracă” lipidele ca să iasă din celulă (lipoproteine)'],
  ['sinusoid', 'sinusoid', 'capilar larg al ficatului, între cordoanele de hepatocite'],
  ['fibrinogen', 'fibrinogen', 'proteină plasmatică mare; ieșită din vas, devine fibrină'],
  ['mezoteli', 'mezoteliu', 'epiteliul turtit care căptușește seroasele'],
  ['organizar', 'organizare', 'înlocuirea fibrinei cu țesut de granulație, apoi fibros'],
  ['piogen', 'piogen', 'care produce puroi'],
  ['piocit', 'piocite', 'neutrofile moarte din puroi'],
  ['detritus', 'detritus', 'resturi de celule moarte'],
  ['lichefier', 'necroză de lichefiere', 'țesutul mort e digerat de enzime și devine lichid (puroi)'],
  ['pileflebit', 'pileflebită', 'tromboflebită infectată a venei porte'],
  ['colangit', 'colangită', 'infecția căilor biliare'],
  ['cazeificar', 'cazeificare', 'necroză cu aspect de brânză: roz, amorfă, fără contururi'],
  ['cazeoas', 'necroză cazeoasă', 'necroză cu aspect de brânză: roz, amorfă, fără contururi'],
  ['epitelioid', 'celule epitelioide', 'macrofage activate, alungite, cu aspect de epiteliu'],
  ['Langhans', 'celula Langhans', 'celulă gigantă cu nucleii în potcoavă, la periferie'],
  ['Ziehl', 'Ziehl-Neelsen', 'colorație care arată bacilii TBC în roșu'],
  ['birefringent', 'birefringent', 'strălucește în lumină polarizată'],
  ['granulom', 'granulom', 'nodul de macrofage activate (epitelioide), ± celule gigante'],
  ['empiem', 'empiem', 'puroi într-o cavitate preexistentă'],
  ['flegmon', 'flegmon', 'supurație difuză, nedelimitată'],
  ['amiloid', 'amiloid', 'proteină anormală depusă extracelular, roz, omogenă'],
];

const D = (h, ...d) => ({ h, d });
const Z = (img, k, cap) => ({ img: `z_${img}_${k}`, cap });
const P = (img, cap) => ({ img, cap });
const SCRIPT = (f, rows, durs) => ({ scene: 'script', layout: 'script', sceneOpts: { f }, hud: ['fișa OSPE · cu voce tare'], script: rows, durs });

export const SLIDES = [
  {
    deckName: 'Anatomie patologică · Preparatele 13–18 (lame) · animat',
    scene: 'cover', kick: 'Anatomie patologică · LP 3–4 · Distrofii · Inflamații · OSPE', title: 'Cele 6 lame de azi, fiecare cu semnul ei',
    hud: ['26.10 · 15:30–16:45', 'toate în HE'],
    points: [
      D('13 · Hipercheratoză', 'strat cornos **gros, lamelar, fără nuclei**; acantoză'),
      D('14 · Distrofie adipoasă hepatică', '**vacuole clare** în hepatocite; **nucleu împins**'),
      D('15 · Pericardită fibrinoasă', '**fibrină roz, franjurată**, pe epicard'),
      D('16 · Abcese hepatice', 'colecție de **neutrofile**; **membrană piogenă**'),
      D('17 · Limfadenită TBC', '**cazeum + epitelioide + Langhans**'),
      D('18 · Granulom de corp străin', '**celule gigante** în jurul **materialului străin**'),
    ],
    why: 'La fiecare lamă: recunoașterea (ob. mic → ob. mare) → de ce arată așa + DD → poza reală cu tot încercuit → **Fișa OSPE cu voce tare**.',
    beatDur: 5,
  },
  {
    scene: 'fisa', kick: 'LP 3–4 · Formatul OSPE · fișa oficială', title: 'Cum se punctează: rubrică cu rubrică',
    hud: ['stația: 7 min = 1 citit + 6 vorbit'],
    points: [
      D('Rubrica 1 vine prima, mereu', '!!organ + leziune + definiție = 3 p!!, marcate **OBLIGATORIU** pe fișă; le spui din primul minut, n-o sari niciodată'),
      D('Buline = puncte', 'la **descriere, cauze, complicații** fiecare idee separată = !!1 punct!!', 'le spui ca pe o listă, nu într-o frază lungă; la lamă: **ob. mic, apoi ob. mare**'),
      D('Minim 5 puncte', '3 din rubrica 1 + **2 buline** și ai trecut', 'materialul îți dă ~**12–15 p** posibile pe preparat (fișele de mai jos: 15–17)'),
      D('Mecanismul n-are rubrică', 'îl folosești doar ca să legi **cauza → leziunea → complicațiile**; nu pierde timp pe patogeneză lungă', 'apoi **DD**: o entitate + diferența-cheie'),
    ],
    say: 'Începi cu **organul și leziunea din prima frază**: fără ele, rubrica obligatorie e pierdută. Apoi descrii ob. mic → ob. mare.',
    warn: 'Contează **doar ce spui cu voce tare**; examinatorul tace și anunță doar ultimul minut.',
    why: 'Cum exersezi: **cronometru pe 6 minute**, spui fișa legat. Fiecare bulină spusă = 1 punct, deci le spui pe rând, clar, ca pe o listă. Ce e marcat „manual” e din manual, nu din sinteză.',
    beatDur: 6,
  },

  // ======================= LAMA 13 · HIPERCHERATOZĂ
  {
    scene: 'hkRec', kick: 'Lama 13 · Hipercheratoză · HE · piele', title: 'Un strat cornos enorm, fără nuclei, peste un epiderm îngroșat',
    hud: ['Lama 13 din 18', '<b>HE</b> · piele'],
    points: [
      D('Strat cornos foarte gros', 'ob. mic: **lamele roz** de cheratină, compacte, **mai gros decât tot epidermul viu**', 'ob. mare: omogenă, eozinofilă, !!fără nuclei = ortocheratoză!!'),
      D('Stratul granulos', '**granule bazofile de keratohialină**; bine reprezentat, chiar îngroșat (hipergranuloză)'),
      D('Stratul spinos lat (acantoză)', '**creste interpapilare alungite**; punți intercelulare, **nuclei normali, fără atipii**'),
      D('Dermul', 'papile cu vase; **papila dermică** secționată transversal, între crestele alungite; infiltrat **discret sau absent**'),
    ],
    why: 'Pe lista oficială e la **distrofii**: !!tulburare a cheratinizării!! (distrofie proteică). Epidermul e îngroșat pe seama stratului cornos (hipercheratoză) și a stratului spinos (acantoză). EN: hyperkeratosis (orthokeratotic); acanthosis · LA: hyperkeratosis.',
    insets: [Z('hk_mic', 0, 'Strat cornos gros, pe lamă'), Z('hk_mare', 1, 'Stratul granulos, pe lamă'), Z('hk_mare', 2, 'Stratul spinos lat, pe lamă'), Z('hk_mare', 3, 'Papilă dermică, pe lamă')],
    beatDur: 6,
  },
  {
    scene: 'hkWhy', dd: { from: 4, a: 'hk', b: 'para', l: 'ortocheratoză (lama 13)', r: 'paracheratoză (psoriazis)', ka: 'cornos FĂRĂ nuclei · granulos PREZENT', kb: 'nuclei în cornos · granulos ABSENT' },
    kick: 'Lama 13 · De ce arată așa? · DD', title: 'De ce se îngroașă stratul cornos și cu ce îl confunzi',
    hud: ['normal → hipercheratoză'],
    points: [
      D('Strat cornos gros, lamelar', '**producție ↑ de cheratină + descuamare întârziată** → cheratina se acumulează'),
      D('Strat granulos prezent', 'keratinocitele își termină maturarea normal: **cheratinizare completă = ortocheratoză**'),
      D('Acantoza', 'stimul cronic: **frecare, presiune** (bătătura); **inflamație cronică, deficit de vitamina A, ihtioză** → bazalele se divid mai mult'),
      D('Dermul', 'normal sau ușor inflamat; **fără atipii, fără invazie**'),
      D('DD: ortocheratoză vs. paracheratoză', 'paracheratoza (psoriazis, mucoase): !!nuclei reținuți în cornos, granulos absent!!; pe mucoasa bucală e normală (sinteza)'),
      D('Alte DD (imagini)', '**papilomul / veruca**: tot hipercheratoză, dar pe **axe papilare digitiforme**, exofitic; hipercheratoza simplă e plată', '**keratoza seboreică**: celule bazaloide + **chisturi cornoase**, leziune „lipită” pe piele; **carcinomul scuamos**: **atipii, mitoze, invazie** în derm (în hipercheratoză celulele sunt normale)', 'palma și planta: cornos gros **fiziologic**, fără acantoză'),
    ],
    why: 'Pe **mucoase** (care nu cheratinizează normal), hipercheratoza apare ca plăci albe: **leucoplazia** (sinteza), uneori precanceroasă, deci se biopsiază. Leziunea în sine e **benignă, reversibilă** dacă dispare stimulul.',
    insets: [null, null, null, null, Z('hk_mare', 0, 'Ortocheratoză: cornos fără nuclei'), P('dd_papilom', 'Papilom scuamos (Nephron, CC BY-SA 3.0)')],
    beatDur: 6.5,
  },
  {
    scene: 'atlas', sceneOpts: {
      a: { img: 'hk_mic', W: 604, H: 1000, marks: [
        { x: 300, y: 430, rx: 250, ry: 330, lab: 'strat cornos foarte gros, lamelar', ly: 790 },
        { x: 430, y: 878, rx: 120, ry: 32, rot: -0.12, lab: 'epidermul viu', lx: 430, ly: 935 },
        { x: 120, y: 955, rx: 110, ry: 40, lab: 'dermul', lx: 150, ly: 985 },
      ] },
      b: { img: 'hk_mare', W: 1000, H: 739, marks: [
        { x: 230, y: 250, rx: 200, ry: 110, rot: -0.15, lab: 'cheratină compactă, anucleată', ly: 215 },
        { x: 320, y: 428, rx: 95, ry: 24, rot: -0.05, lab: 'stratul granulos', lx: 330, ly: 470 },
        { x: 200, y: 610, rx: 120, ry: 70, lab: 'strat spinos lat (acantoză)', ly: 700 },
        { x: 658, y: 545, rx: 42, ry: 66, lab: 'papilă dermică', ly: 630 },
      ] },
    },
    kick: 'Lama 13 · Pe lama reală · ob. mic → ob. mare · HE', title: 'Hipercheratoza pe lamă: ce încercuiești',
    hud: ['poze reale · ob. mic, apoi ob. mare'],
    points: [D('Ob. mic: strat cornos', 'gros, **lamelar**'), D('Ob. mic: epidermul viu', 'straturile cu nuclei'), D('Ob. mic: dermul', 'papile, vase'), D('Ob. mare: cheratina', '!!fără nuclei!!'), D('Ob. mare: stratul granulos', 'granule **bazofile**'), D('Ob. mare: stratul spinos', 'lat = !!acantoză!!'), D('Ob. mare: papila dermică', 'între creste')],
    why: 'Pozele: Mikael Häggström · CC0 · Wikimedia Commons (badge-urile vechi șterse digital pe ob. mic).',
  },
  {
    ...SCRIPT('hk', [
      { tm: 'Organ', at: '1 p', tx: '!!Piele!!, colorația **HE**.' },
      { tm: 'Leziune', at: '1 p', tx: '!!Hipercheratoză ortocheratozică cu acantoză!!.' },
      { tm: 'Definiție', at: '1 p', tx: '**Îngroșarea stratului cornos** al epidermului prin **acumulare de cheratină**, o !!tulburare a cheratinizării!! (distrofie proteică).' },
      { tm: 'Descriere', at: '6 p', tx: '● ob. mic: **epiderm îngroșat**, cu **strat cornos foarte gros, lamelar** ● **stratul spinos lat**, creste interpapilare alungite: **acantoză** ● **stratul granulos bine reprezentat**, chiar îngroșat ● **dermul** cu papile, vase și infiltrat inflamator discret ● ob. mare: lamele de cheratină **eozinofile, omogene, anucleate: ortocheratoză** ● keratinocite cu **punți intercelulare, fără atipii**; fără nuclei în cornos.' },
      { tm: 'Cauze', at: '4 p', tx: '● **frecarea sau presiunea cronică** (bătătura) ● **inflamația cronică** a pielii ● **deficitul de vitamina A** ● boli genetice: **ihtioza**.' },
      { tm: 'Complicații', at: '3 p', tx: '● pe mucoase: **leucoplazie**, plăci albe precanceroase (se biopsiază) ● **persistă** cât timp persistă stimulul; **reversibilă** la îndepărtarea lui ● **fisuri dureroase** ale stratului cornos îngroșat (manual).' },
      { tm: 'DD', at: '✓', tx: '!!Paracheratoza!! (ex. psoriazis): la paracheratoză stratul cornos **păstrează nuclei** și **stratul granulos lipsește**; aici cornosul e anucleat și granulosul prezent.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **hipercheratoză ortocheratozică cu acantoză**.' },
    ], [8, 8, 22, 60, 30, 30, 25, 6]),
    kick: 'Lama 13 · Fișa OSPE · hipercheratoză', title: 'Ce spui cu voce tare (poți strânge 16 p, minim 5)',
  },

  // ======================= LAMA 14 · STEATOZĂ HEPATICĂ
  {
    scene: 'stRec', kick: 'Lama 14 · Distrofie adipoasă hepatică · HE · ficat', title: 'Vacuole clare peste tot și nucleul împins la margine',
    hud: ['Lama 14 din 18', '<b>HE</b> · ficat'],
    points: [
      D('Vacuole clare, rotunde', 'ob. mic: **în hepatocite**, nu între ele; mărimi diferite, **difuz în lobul**', '**arhitectura lobulară păstrată**; cordoane deformate de hepatocitele mărite'),
      D('Sinusoide comprimate', 'hematii în sinusoide strâmtate; **fără inflamație, fără fibroză**'),
      D('Vacuolă mare, unică', 'ob. mare: ocupă aproape toată celula: !!macroveziculară!!; e **goală**: grăsimea s-a dizolvat la prelucrare'),
      D('Nucleu împins la periferie', '!!turtit, în semilună!!'),
      D('Hepatocit fără grăsime', 'citoplasmă roz, **nucleu central** (comparație)'),
    ],
    why: '**Macro**: o vacuolă, nucleu periferic (alcool, obezitate, diabet). **Micro**: multe vacuole mici, nucleu central (steatoza acută de sarcină, sindromul Reye, medicamente). EN: hepatic steatosis; fatty change of the liver · LA: steatosis hepatis.',
    insets: [Z('st_mic', 0, 'Vacuolă clară, pe lamă'), Z('st_mic', 1, 'Sinusoid cu hematii, pe lamă'), Z('st_mare', 0, 'Vacuolă mare, pe lamă'), Z('st_mare', 1, 'Nucleu împins, pe lamă'), Z('st_mare', 2, 'Hepatocit fără grăsime, pe lamă')],
    beatDur: 6,
  },
  {
    scene: 'stWhy', dd: { from: 4, a: 'st', b: 'balon', l: 'steatoză (lama 14)', r: 'balonizare (distrofie hidropică)', ka: 'vacuolă ROTUNDĂ, nucleu împins', kb: 'citoplasmă CLARĂ, nucleu central' },
    kick: 'Lama 14 · De ce arată așa? · DD', title: 'De ce se umple hepatocitul de grăsime și cu ce îl confunzi',
    hud: ['hepatocit + lobul hepatic'],
    points: [
      D('Prea mulți acizi grași', '**obezitate, diabet, inaniție**; **alcoolul** crește sinteza'),
      D('Prea puțină ardere', '**β-oxidarea ↓**: hipoxie, alcool, toxice'),
      D('Export blocat', 'lipsesc **apoproteinele**: malnutriție proteică, CCl4 → trigliceridele nu ies ca lipoproteine'),
      D('Distribuția în lobul (sinteza)', '**centrolobulară**: hipoxie · **periferolobulară**: metabolic, obezitate · **difuză**: alcoolism'),
      D('DD: balonizarea', 'celulă umflată, citoplasmă !!clară, floconoasă, reticulată!!; nu o vacuolă rotundă; **nucleul rămâne central**', 'ambele sunt **leziuni celulare reversibile** (sinteza); balonizarea = pompele ionice cedează, intră apă'),
      D('Alte DD (imagini)', '**ficatul de stază**: sinusoide centrolobulare dilatate, pline cu hematii; steatoza doar periportal, asociată', '**amiloidoza hepatică**: depozite **roz, omogene, acelulare** în spațiul Disse, hepatocite atrofiate; nu vacuole goale'),
    ],
    why: 'Picăturile mici **confluează** într-o vacuolă mare care împinge nucleul. Vacuola e **goală pe HE**: grăsimea s-a dizolvat la prelucrare (o confirmi cu **Sudan III / Oil Red O**). Leziune **reversibilă**; cu alcool continuu → **steatohepatită → ciroză**.',
    insets: [null, null, null, null, P('dd_balon', 'Balonizare (Nephron, CC BY-SA 3.0)'), P('dd_amiloid', 'Amiloidoză hepatică (Nephron, CC BY-SA 3.0)')],
    beatDur: 6.5,
  },
  {
    scene: 'atlas', sceneOpts: {
      a: { img: 'st_mic', W: 1000, H: 728, marks: [
        { x: 355, y: 372, rx: 40, lab: 'vacuolă clară, rotundă', ly: 440 },
        { x: 245, y: 160, rx: 45, ry: 22, rot: -0.3, lab: 'sinusoid comprimat (hematii)', ly: 210 },
      ] },
      b: { img: 'st_mare', W: 1000, H: 729, marks: [
        { x: 528, y: 283, rx: 44, lab: 'vacuolă mare, unică', ly: 350 },
        { x: 166, y: 483, rx: 20, ry: 28, lab: 'nucleu împins, turtit', ly: 540 },
        { x: 392, y: 405, rx: 40, ry: 34, lab: 'hepatocit fără grăsime', ly: 465 },
      ] },
    },
    kick: 'Lama 14 · Pe lama reală · ob. mic → ob. mare · HE', title: 'Steatoza pe lamă: ce încercuiești',
    hud: ['poze reale · ob. mic, apoi ob. mare'],
    points: [D('Ob. mic: vacuole clare', 'rotunde, **în hepatocite**'), D('Ob. mic: sinusoide', 'comprimate, cu hematii'), D('Ob. mare: vacuola', '!!mare, unică!!, **goală**'), D('Ob. mare: nucleul', '!!împins la periferie!!'), D('Ob. mare: hepatocit fără grăsime', 'nucleu **central**')],
    why: 'Pozele: Department of Pathology, Calicut Medical College · CC BY-SA 4.0 · Wikimedia Commons (badge-urile vechi șterse digital pe ob. mare).',
  },
  {
    ...SCRIPT('st', [
      { tm: 'Organ', at: '1 p', tx: '!!Ficat!!, colorația **HE**.' },
      { tm: 'Leziune', at: '1 p', tx: '!!Steatoză hepatică macroveziculară difuză!! (distrofie adipoasă).' },
      { tm: 'Definiție', at: '1 p', tx: 'Acumularea de **trigliceride** sub formă de **vacuole lipidice în citoplasma hepatocitelor**, o !!leziune celulară reversibilă!!.' },
      { tm: 'Descriere', at: '6 p', tx: '● ob. mic: **arhitectura lobulară păstrată**, cordoane deformate de celule mărite ● **vacuole clare, rotunde, bine delimitate**, de mărimi diferite, **difuz în lobul** ● **sinusoide comprimate**; fără inflamație și fără fibroză ● ob. mare: **vacuolă mare, unică**, ocupă aproape toată citoplasma ● **nucleul împins la periferie, turtit**: steatoză macroveziculară ● vacuolele sunt **goale**: grăsimea s-a dizolvat la prelucrare.' },
      { tm: 'Cauze', at: '4 p', tx: '● **alcoolismul** (cauza tipică a formei difuze) ● **obezitatea și diabetul** (prea mulți acizi grași) ● **hipoxia** (centrolobular) și **toxicele**, ex. tetraclorura de carbon ● **malnutriția proteică** (lipsesc apoproteinele de export).' },
      { tm: 'Complicații', at: '3 p', tx: '● evoluție spre **steatohepatită** ● evoluție spre **ciroză** dacă stimulul persistă ● **hepatomegalie** cu ficat galben, moale.' },
      { tm: 'DD', at: '✓', tx: '!!Balonizarea hepatocitelor!!: la balonizare citoplasma e **clară, floconoasă**, fără o vacuolă rotundă care împinge nucleul la periferie.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **steatoză hepatică macroveziculară**.' },
    ], [8, 8, 20, 60, 30, 25, 25, 6]),
    kick: 'Lama 14 · Fișa OSPE · steatoză hepatică', title: 'Ce spui cu voce tare (poți strânge 16 p, minim 5)',
  },

  // ======================= LAMA 15 · PERICARDITĂ FIBRINOASĂ
  {
    scene: 'pcRec', kick: 'Lama 15 · Pericardită fibrinoasă · HE · cord (epicard)', title: 'Un strat roz, franjurat, lipit pe suprafața inimii',
    hud: ['Lama 15 din 18', '<b>HE</b> · cord (epicard)'],
    points: [
      D('Exsudat fibrinos pe epicard', 'ob. mic: strat **neregulat, eozinofil, amorf**, cu !!proeminențe viloase!! (franjurat)', 'ob. mare: **fibrină în rețea sau mase amorfe, roz**, cu neutrofile și hematii prinse'),
      D('Mezoteliul lipsește', 'sub depozit; fibrina stă direct pe țesut'),
      D('Infiltrat inflamator', 'sub fibrină și în ea: **neutrofile, limfocite**, + macrofage, câteva hematii; **vase dilatate, congestionate**'),
      D('La bază: organizarea', '**fibroblaste + capilare de neoformație** = !!început de organizare!!'),
      D('Țesut subepicardic', 'fibroblaste; mai profund: **grăsime și miocard**'),
    ],
    why: 'Spațiul liber de deasupra e **cavitatea pericardică**. Recunoști seroasa după ce e dedesubt: **țesut adipos și miocard**. Sinteza: fibrina extravasculară apare pe HE ca **rețea eozinofilă sau masă amorfă**. EN: fibrinous pericarditis · LA: pericarditis fibrinosa.',
    insets: [Z('pc_mic', 0, 'Fibrină viloasă, pe lamă'), P('pc_mic', 'Fibrina stă direct pe țesut (ob. mic)'), Z('pc_mic', 1, 'Infiltrat inflamator, pe lamă'), Z('pc_mare', 2, 'Baza: organizare, pe lamă'), Z('pc_mic', 2, 'Țesut subepicardic, pe lamă')],
    beatDur: 6,
  },
  {
    scene: 'pcWhy', dd: { from: 4, a: 'pc', b: 'pur', l: 'fibrinoasă (lama 15)', r: 'purulentă', ka: 'rețea roz de FIBRINĂ, viloasă', kb: 'strat cremos de NEUTROFILE' },
    kick: 'Lama 15 · De ce arată așa? · DD', title: 'De ce se depune fibrină pe seroasă și cu ce o confunzi',
    hud: ['inima bate: foițele se separă'],
    points: [
      D('Fibrina viloasă', 'permeabilitatea crește **foarte mult** → trece și **fibrinogenul** → fibrină extravasculară'),
      D('Neutrofile prinse', 'exsudatul are și celule; **mezoteliul e distrus**'),
      D('Vase congestionate', 'cauze: **uremia, IMA transmural, RAA, viroze**, după chirurgie cardiacă'),
      D('Organizarea', 'fibrina abundentă **nu se resoarbe complet** → fibroblaste + vase → **aderențe, pericardită constrictivă**'),
      D('DD: pericardita purulentă', 'strat de !!neutrofile (puroi), lichefiat!!, nu rețea de fibrină; exsudat cremos, galben-verzui; **infecții bacteriene**'),
      D('Alte DD (imagini)', '**pneumonia lobară**: tot exsudat fibrinos, dar **în alveole** (hepatizație), cu neutrofile; nu pe o seroasă', '**trombul** (mural): fibrină + trombocite **stratificate** (linii Zahn), **în lumenul** unei cavități sau al unui vas'),
    ],
    why: 'Marginea e **franjurată** pentru că la fiecare bătaie foițele pericardului se separă și trag de fibrină („**pâine cu unt**”, piesa 5). Fibrina puțină se resoarbe prin **fibrinoliză și macrofage**.',
    insets: [null, null, null, null, P('dd_pcpur', 'Pericardită purulentă, piesă (CC BY-SA 3.0)'), P('dd_pneumo', 'Pneumonie lobară (Calicut, CC BY-SA 4.0)')],
    beatDur: 6.5,
  },
  {
    scene: 'atlas', sceneOpts: {
      a: { img: 'pc_mic', W: 1000, H: 799, marks: [
        { x: 650, y: 250, rx: 100, ry: 62, lab: 'exsudat fibrinos, vilos', ly: 335 },
        { x: 470, y: 460, rx: 120, ry: 50, lab: 'infiltrat inflamator', ly: 535 },
        { x: 300, y: 680, rx: 150, ry: 60, lab: 'țesut subepicardic', ly: 765 },
      ] },
      b: { img: 'pc_mare', W: 1000, H: 728, marks: [
        { x: 350, y: 210, rx: 115, ry: 72, lab: 'fibrina (mase roz)', ly: 305 },
        { x: 620, y: 410, rx: 95, ry: 48, lab: 'neutrofile și limfocite', ly: 485 },
        { x: 450, y: 650, rx: 120, ry: 50, lab: 'baza: organizare', ly: 712 },
      ] },
    },
    kick: 'Lama 15 · Pe lama reală · ob. mic → ob. mare · HE', title: 'Pericardita fibrinoasă pe lamă: ce încercuiești',
    hud: ['poze reale · ob. mic, apoi ob. mare (zoom digital)'],
    points: [D('Ob. mic: fibrina', 'strat !!roz, vilos!!'), D('Ob. mic: infiltratul', 'sub fibrină'), D('Ob. mic: subepicardic', 'fibroblaste'), D('Ob. mare: fibrina', 'rețea / mase **amorfe**'), D('Ob. mare: celulele', '**neutrofile**, limfocite'), D('Ob. mare: baza', 'fibroblaste + capilare noi')],
    why: 'Poza: dr n. med. Krystyna Bielnik, lek. med. Dariusz Młoczkowski, dr n. med. Tadeusz M · CC BY-SA 3.0 · Wikimedia Commons. Ob. mare = zoom digital al aceleiași micrografii.',
  },
  {
    ...SCRIPT('pc', [
      { tm: 'Organ', at: '1 p', tx: '!!Inimă (epicard)!!, colorația **HE**.' },
      { tm: 'Leziune', at: '1 p', tx: '!!Pericardită acută fibrinoasă!!, cu început de organizare.' },
      { tm: 'Definiție', at: '1 p', tx: 'Inflamație acută a pericardului cu **exsudat bogat în fibrină**, apărut când !!permeabilitatea vasculară crește!! atât de mult încât **trece fibrinogenul**.' },
      { tm: 'Descriere', at: '6 p', tx: '● ob. mic: pe epicard, strat **eozinofil, amorf, franjurat, cu proeminențe viloase** ● **mezoteliul lipsește** sub depozit ● subepicardic: **infiltrat inflamator** și **vase dilatate, congestionate** ● ob. mare: **fibrină în rețea** sau mase roz, cu neutrofile și hematii prinse ● infiltrat cu **neutrofile, limfocite, macrofage** ● la bază: **fibroblaste și capilare de neoformație**: început de organizare.' },
      { tm: 'Cauze', at: '4 p', tx: '● **uremia** ● **infarctul miocardic transmural** ● **reumatismul articular acut** ● **infecțiile virale**.' },
      { tm: 'Complicații', at: '4 p', tx: '● **organizarea** fibrinei abundente ● **aderențe pericardice** ● **pericardită constrictivă** (limitează funcția miocardică) ● clinic: **frecătură pericardică și durere**.' },
      { tm: 'DD', at: '✓', tx: '**Pericardita purulentă**: exsudatul purulent e **dominat de neutrofile, lichefiat**, fără rețeaua de fibrină predominantă.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **pericardită fibrinoasă**.' },
    ], [8, 8, 22, 60, 25, 30, 25, 6]),
    kick: 'Lama 15 · Fișa OSPE · pericardită fibrinoasă', title: 'Ce spui cu voce tare (poți strânge 17 p, minim 5)',
  },

  // ======================= LAMA 16 · ABCESE HEPATICE
  {
    scene: 'abRec', kick: 'Lama 16 · Abcese hepatice · HE · ficat', title: 'O colecție de puroi cu perete propriu, în ficat',
    hud: ['Lama 16 din 18', '<b>HE</b> · ficat'],
    points: [
      D('Centrul abcesului', 'ob. mic: **puroi**: neutrofile + detritus; țesutul inițial **a dispărut** (!!necroză de lichefiere!!)'),
      D('Membrana piogenă', 'perete propriu: **neutrofile dense, fibrină, vase congestionate**'),
      D('Capsula fibroasă', 'la exterior: **țesut de granulație → fibroză**'),
      D('Ficatul din jur', '**hepatocite comprimate**, sinusoide congestionate; pot fi **mai multe colecții** (abcese multiple)'),
      D('Neutrofile', 'ob. mare: nuclei !!polilobați!!, citoplasmă puțină; spre centru degenerate (**piocite**, nuclei picnotici)'),
      D('Detritus necrotic', 'resturi celulare **eozinofile, fibrină, hematii**; nu mai vezi hepatocite viabile în centru'),
    ],
    why: '**Nu vezi** celule epitelioide, celule gigante sau cazeum: nu e granulom. Micrografia de ob. mic e de la un **abces pulmonar** (nu există una liberă de abces hepatic): structura abcesului e identică; pe lama ta, în jurul puroiului vezi **hepatocite**. EN: liver abscess · LA: abscessus hepatis.',
    insets: [Z('ab_mic', 0, 'Centrul abcesului, pe lamă'), Z('ab_mic', 1, 'Membrana piogenă, pe lamă'), Z('ab_mic', 2, 'Capsula fibroasă, pe lamă'), P('ab_piemic', 'Abcese hepatice multiple, piesă (CC BY-SA 3.0)'), Z('ab_mare', 0, 'Neutrofile, pe lamă'), Z('ab_mare', 1, 'Detritus, pe lamă')],
    beatDur: 6,
  },
  {
    scene: 'abWhy', dd: { from: 5, a: 'ab', b: 'coag', l: 'abces: lichefiere (lama 16)', r: 'infarct: coagulare (LP 1–2)', ka: 'țesut digerat, neutrofile, puroi', kb: 'contururi păstrate, fără nuclei' },
    kick: 'Lama 16 · De ce arată așa? · pe piesă · DD', title: 'Pe unde ajung bacteriile în ficat și cu ce confunzi abcesul',
    hud: ['ficat cu abcese'],
    points: [
      D('Calea biliară', '**colangită** (obstrucție biliară infectată)'),
      D('Calea portală', '**apendicită, diverticulită** (pileflebită)'),
      D('Calea arterială', '**sepsis**: abcese **multiple, mici**'),
      D('Contiguitate sau direct', 'organe vecine, traumatisme'),
      D('Pe piesă', '**abcese piemice** (diseminare septică): cavități multiple, cu puroi', '**abcesul amibian**: cavitate **unică, mare**, perete neregulat, conținut galben-brun, „ca **pasta de anșoa**”'),
      D('DD: abces vs. infarct', 'abces: țesutul **dispare**, înlocuit de **neutrofile și puroi**', 'infarct: !!conturul celulelor păstrat!! („fantome”), fără nuclei, **fără puroi**'),
      D('Alte DD (imagini)', '**granulomul TBC**: cazeum omogen, **epitelioide și Langhans**, fără mase de neutrofile', '**abcesul pulmonar / cerebral**: aceeași structură; spui organul după țesutul din jur'),
    ],
    why: 'Bacteriile **piogene** (stafilococ, streptococ, E. coli, anaerobi) atrag neutrofile; enzimele lor **lichefiază** țesutul → puroi; organismul îl **delimitează** cu membrana piogenă, apoi capsulă fibroasă. **Abcesul** = puroi circumscris într-o cavitate nouă · **flegmonul** = supurație difuză · **empiemul** = puroi într-o cavitate preexistentă (sinteza).',
    insets: [null, null, null, null, P('ab_amib', 'Abces amibian, piesă (domeniu public)'), P('dd_infarct', 'Infarct: necroză de coagulare (Calicut, CC BY-SA 4.0)'), P('dd_tbgran', 'Granulom TBC (Calicut, CC BY-SA 4.0)')],
    beatDur: 6.5,
  },
  {
    scene: 'atlas', sceneOpts: {
      a: { img: 'ab_mic', W: 1000, H: 750, marks: [
        { x: 220, y: 400, rx: 150, ry: 130, lab: 'centrul: puroi', ly: 555 },
        { x: 650, y: 330, rx: 60, ry: 180, rot: -0.6, lab: 'membrana piogenă', lx: 640, ly: 545 },
        { x: 860, y: 170, rx: 90, ry: 70, lab: 'capsula fibroasă', ly: 265 },
      ] },
      b: { img: 'ab_mare', W: 1000, H: 750, marks: [
        { x: 750, y: 190, rx: 70, lab: 'neutrofile', ly: 285 },
        { x: 470, y: 280, rx: 80, ry: 45, rot: 0.5, lab: 'detritus eozinofil', ly: 360 },
      ] },
    },
    kick: 'Lama 16 · Pe lama reală · ob. mic → ob. mare · HE', title: 'Abcesul pe lamă: ce încercuiești',
    hud: ['poze reale · ob. mic, apoi ob. mare'],
    points: [D('Ob. mic: centrul', '!!puroi!!, țesut dispărut'), D('Ob. mic: membrana piogenă', '!!neutrofile dense!!'), D('Ob. mic: capsula', 'fibroasă'), D('Ob. mare: neutrofile', 'nuclei **polilobați**'), D('Ob. mare: detritus', '**eozinofil**')],
    why: 'Pozele: Yale Rosen · CC BY-SA 2.0 (ob. mic) și Department of Pathology, Calicut Medical College · CC BY-SA 4.0 (ob. mare) · Wikimedia Commons. Ob. mic e un abces pulmonar (structura e identică): pe lama ta, în jur sunt hepatocite.',
  },
  {
    ...SCRIPT('ab', [
      { tm: 'Organ', at: '1 p', tx: '!!Ficat!!, colorația **HE**.' },
      { tm: 'Leziune', at: '1 p', tx: '!!Abcese hepatice!!: inflamație acută **purulentă circumscrisă**, cu **necroză de lichefiere**.' },
      { tm: 'Definiție', at: '1 p', tx: 'Abcesul este o !!colecție circumscrisă de puroi!! (neutrofile, celule necrozate, lichid de edem), **într-o cavitate de neoformație**.' },
      { tm: 'Descriere', at: '6 p', tx: '● ob. mic: parenchimul e înlocuit de o **colecție rotundă, bine delimitată** ● **centru necrotic** și perete propriu: **membrana piogenă** (neutrofile, fibrină, vase) ● la exterior: **țesut de granulație**; hepatocitele din jur **comprimate** ● pot exista **colecții multiple**, de dimensiuni diferite ● ob. mare: **neutrofile cu nuclei polilobați**; spre centru **piocite** (nuclei picnotici) ● **detritus eozinofil**, fibrină, hematii; fără epitelioide, gigante sau cazeum.' },
      { tm: 'Cauze', at: '4 p', tx: '● cale biliară: **colangita** ● cale portală: **apendicita, diverticulita** ● cale arterială: **sepsisul** ● germeni piogeni: **stafilococ, streptococ, E. coli, anaerobi**.' },
      { tm: 'Complicații', at: '3 p', tx: '● **ruptura în peritoneu**: peritonită ● **septicemia** ● **fibroza după drenaj** (vindecare cu cicatrice).' },
      { tm: 'DD', at: '✓', tx: '!!Granulomul tuberculos!!: granulomul are **celule epitelioide, celule gigante Langhans și cazeum omogen**, fără masă de neutrofile.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **abcese hepatice**.' },
    ], [8, 10, 20, 60, 30, 25, 25, 6]),
    kick: 'Lama 16 · Fișa OSPE · abcese hepatice', title: 'Ce spui cu voce tare (poți strânge 16 p, minim 5)',
  },

  // ======================= LAMA 17 · LIMFADENITĂ TUBERCULOASĂ
  {
    scene: 'tbRec', kick: 'Lama 17 · Limfadenită tuberculoasă · HE · ganglion limfatic', title: 'Cazeum în centru, epitelioide și Langhans în jur',
    hud: ['Lama 17 din 18', '<b>HE</b> · ganglion limfatic'],
    points: [
      D('Țesut limfoid restant', 'ob. mic: **arhitectura ganglionului e ștearsă**; țesut limfoid doar la periferie'),
      D('Necroza cazeoasă', 'central: !!roz, amorfă, granulară!!, **fără contururi celulare**'),
      D('Granuloame la marginea ei', 'noduli de **celule palide + celule gigante**, cu coroană de limfocite'),
      D('Celule epitelioide', 'ob. mare: **macrofage activate**: nucleu **alungit, palid**, „în talpă de pantof”; citoplasmă eozinofilă, granulară, limite neclare'),
      D('Celula gigantă Langhans', 'foarte mare, **zeci de nuclei**, dispuși !!la periferie, în potcoavă!!'),
      D('Limfocite', 'la periferia granulomului; + **fibroblaste** în cele vechi'),
    ],
    why: 'Spre deosebire de coagulare, în **cazeum** structura e **complet distrusă**; aspectul friabil, ca de **brânză**, dă numele (sinteza). EN: tuberculous lymphadenitis; caseating granuloma · LA: lymphadenitis tuberculosa.',
    insets: [Z('tb_mic', 2, 'Țesut limfoid restant, pe lamă'), Z('tb_mic', 0, 'Necroză cazeoasă, pe lamă'), Z('tb_mic', 1, 'Granulom, pe lamă'), Z('tb_mare', 1, 'Celule epitelioide, pe lamă'), Z('tb_mare', 0, 'Celula Langhans, pe lamă'), Z('tb_mare', 2, 'Limfocite, pe lamă')],
    beatDur: 6,
  },
  {
    scene: 'tbWhy', dd: { from: 4, a: 'tb', b: 'ab', l: 'granulom TBC (lama 17)', r: 'abces (lama 16)', ka: 'cazeum + epitelioide + Langhans', kb: 'neutrofile + puroi lichefiat' },
    kick: 'Lama 17 · De ce arată așa? · DD', title: 'Cum se construiește granulomul tuberculos și cu ce îl confunzi',
    hud: ['macrofag → granulom'],
    points: [
      D('Mycobacterium tuberculosis', 'fagocitat de macrofage, dar **supraviețuiește în ele**'),
      D('Limfocitele T CD4 Th1', 'secretă **IFN-γ** → **activează macrofagele**'),
      D('Epitelioide → Langhans', 'macrofagele activate devin **epitelioide**; prin **fuziune** → celule gigante **Langhans**'),
      D('Cazeificarea', 'în centru: **hipoxie + radicali liberi** (sinteza)'),
      D('DD: granulom vs. abces', 'granulom: !!cazeum roz, omogen + epitelioide + Langhans!!; limfocite la periferie', 'abces: **neutrofile + puroi lichefiat**; fără epitelioide, fără Langhans'),
      D('Alte DD (imagini)', '**sarcoidoza**: granuloame **compacte, necazeificate**, puține limfocite; uneori corpi asteroizi în celulele gigante', '**corpul străin**: material străin (birefringent), gigante cu **nuclei dezordonați**, fără cazeum; **limfadenita supurată**: neutrofile, lichefiere'),
    ],
    why: 'Granulomul **izolează bacilul, dar nu îl eradică întotdeauna**. Confirmarea: **Ziehl-Neelsen** (BAAR roșii). **Calcificarea distrofică** a cazeumului poate transforma ganglionul într-un **nodul calcificat** (sinteza).',
    insets: [null, null, P('tb_epit', 'Epitelioide în jurul cazeumului, stânga (ArkhipovSergey, CC BY-SA 4.0)'), null, P('dd_supur', 'Limfadenită supurată (CoRus13, CC BY-SA 4.0)'), P('dd_sarc', 'Sarcoidoză (Calicut, CC BY-SA 4.0)')],
    beatDur: 6.5,
  },
  {
    scene: 'atlas', sceneOpts: {
      a: { img: 'tb_mic', W: 1000, H: 703, marks: [
        { x: 720, y: 380, rx: 180, ry: 150, lab: 'necroză cazeoasă', ly: 560 },
        { x: 285, y: 225, rx: 55, ry: 45, lab: 'granulom cu celulă gigantă', ly: 300 },
        { x: 70, y: 260, rx: 60, ry: 150, lab: 'țesut limfoid restant', lx: 120, ly: 440 },
      ] },
      b: { img: 'tb_mare', W: 1000, H: 750, marks: [
        { x: 500, y: 360, rx: 115, ry: 85, lab: 'celula gigantă Langhans', ly: 470 },
        { x: 300, y: 460, rx: 60, ry: 45, lab: 'celule epitelioide', ly: 530 },
        { x: 480, y: 60, rx: 120, ry: 40, lab: 'limfocite', ly: 125 },
      ] },
    },
    kick: 'Lama 17 · Pe lama reală · ob. mic → ob. mare · HE', title: 'Limfadenita TBC pe lamă: ce încercuiești',
    hud: ['poze reale · ob. mic, apoi ob. mare'],
    points: [D('Ob. mic: cazeum', '!!roz, amorf!!'), D('Ob. mic: granulom', 'celule palide + **gigantă**'), D('Ob. mic: țesut limfoid', 'restant'), D('Ob. mare: Langhans', 'nuclei !!în potcoavă!!'), D('Ob. mare: epitelioide', 'nucleu **alungit, palid**'), D('Ob. mare: limfocite', 'la periferie')],
    why: 'Pozele: Department of Pathology, Calicut Medical College · CC BY-SA 4.0 (ob. mic); Ed Uthman · CC BY 2.0 (ob. mare: un granulom **fără cazeum**, ales pentru că arată cel mai clar celula Langhans; în TBC aceleași celule înconjoară cazeumul).',
  },
  {
    ...SCRIPT('tb', [
      { tm: 'Organ', at: '1 p', tx: '!!Ganglion limfatic!!, colorația **HE**.' },
      { tm: 'Leziune', at: '1 p', tx: '!!Limfadenită tuberculoasă!! cu **granuloame epitelioido-gigantocelulare** și **necroză cazeoasă**.' },
      { tm: 'Definiție', at: '1 p', tx: 'Inflamație **cronică granulomatoasă** a ganglionului, produsă de **Mycobacterium tuberculosis**, cu granuloame și !!necroză centrală de cazeificare!!.' },
      { tm: 'Descriere', at: '6 p', tx: '● ob. mic: **arhitectura ganglionului ștearsă**, țesut limfoid doar la periferie ● central: **necroză cazeoasă** roz, amorfă, granulară, fără contururi celulare ● la margine: **granuloame**: noduli de celule palide cu celule gigante, coroană de limfocite ● ob. mare: **celule epitelioide**, nucleu alungit, palid, „în talpă de pantof” ● **celule gigante Langhans**: zeci de nuclei la periferie, în potcoavă ● la exterior: **limfocite și câteva fibroblaste**.' },
      { tm: 'Cauze', at: '3 p', tx: '● **Mycobacterium tuberculosis**, care supraviețuiește în macrofage ● răspunsul **limfocitelor T CD4 Th1** (interferon gama) activează macrofagele ● **hipoxia și radicalii liberi** din centrul granulomului dau cazeumul.' },
      { tm: 'Complicații', at: '3 p', tx: '● granulomul **izolează bacilul, dar nu îl eradică** întotdeauna ● **diseminarea bacilului** din focar (manual) ● **fibroza focarului** (ex. pericardita constrictivă fibroasă din TBC).' },
      { tm: 'DD', at: '✓', tx: '**Granulomul de corp străin**: are celule gigante cu **nuclei dezordonați** în jurul unui **material străin** și **fără cazeum**.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **limfadenită tuberculoasă cazeoasă**.' },
    ], [8, 10, 22, 60, 25, 25, 25, 6]),
    kick: 'Lama 17 · Fișa OSPE · limfadenită tuberculoasă', title: 'Ce spui cu voce tare (poți strânge 15 p, minim 5)',
  },

  // ======================= LAMA 18 · GRANULOM DE CORP STRĂIN
  {
    scene: 'csRec', kick: 'Lama 18 · Granulom de corp străin · HE · țesut moale', title: 'Celule gigante mulate pe un material pe care nu-l pot digera',
    hud: ['Lama 18 din 18', '<b>HE</b> · țesut moale (derm / subcutan)'],
    points: [
      D('Materialul străin', 'ob. mic: în centrul unui granulom neregulat; **omogen / lamelar**, străin de țesut (aici **cheratină**, dintr-un chist rupt)'),
      D('Celule gigante multinucleate', '!!mulate pe material!!'),
      D('Infiltrat', '**macrofage, limfocite**'),
      D('Țesut de granulație + fibroză', 'la periferie; **fără necroză centrală**'),
      D('Nuclei dezordonați', 'ob. mare: !!împrăștiați în toată citoplasma!!, nu în potcoavă (Langhans); celula gigantă **înconjoară** materialul; în jur fragmente de material, macrofage și limfocite'),
    ],
    why: 'Firul de sutură, talcul, siliciul sunt **birefringente în lumină polarizată**; cheratina e **lamelară, eozinofilă**. **Nu vezi cazeum** și nu vezi neutrofile în masă (nu e abces). EN: foreign body granuloma; foreign body giant cell · LA: granuloma e corpore alieno.',
    insets: [Z('cs_mic', 0, 'Material străin, pe lamă'), Z('cs_mic', 1, 'Celulă gigantă, pe lamă'), Z('cs_mic', 2, 'Infiltrat, pe lamă'), Z('cs_mic', 3, 'Fibroză la periferie, pe lamă'), Z('cs_mare', 0, 'Nuclei dezordonați, pe lamă')],
    beatDur: 6,
  },
  {
    scene: 'csWhy', dd: { from: 4, a: 'cs', b: 'tb', l: 'corp străin (lama 18)', r: 'TBC (lama 17)', ka: 'nuclei dezordonați; material în centru', kb: 'Langhans în potcoavă; cazeum' },
    kick: 'Lama 18 · De ce arată așa? · DD', title: 'Ce face macrofagul cu ce nu poate digera și cu ce îl confunzi',
    hud: ['material → granulom'],
    points: [
      D('Material nedigerabil', '**sutură, talc, cheratină** (chist rupt), ulei, silicon, **urați** (gută)'),
      D('Fagocitoză „frustrată”', 'materialul e **prea mare sau inert**'),
      D('Fuziunea (IL-4, IL-13)', 'macrofagele fuzionează → **celule gigante de corp străin**; nucleii rămân **dezordonați**'),
      D('Granulom + fibroză', '**persistă cât persistă materialul**; dispare după îndepărtarea lui'),
      D('DD: corp străin vs. TBC', 'TBC: celulă !!Langhans cu nuclei în potcoavă!! + **cazeum central** + epitelioide', 'corp străin: nuclei **dezordonați**, material în centru, **fără cazeum**'),
      D('Alte DD (imagini)', '**sarcoidoza**: granuloame epitelioide, **necazeificate**, bine delimitate, **fără material străin**; corpi asteroizi/Schaumann', '**abcesul**: **neutrofile și puroi**, lichefiere; nu macrofage și celule gigante'),
    ],
    why: 'Granulomul de corp străin e **neimun**: fără hipersensibilitate de tip IV, deci **fără cazeum** și fără limfocite T specifice. Clasificarea: **imune** (TBC, sarcoidoză, lepră, sifilis) vs. **neimune** (corp străin). Regula: celula gigantă singură nu dă diagnosticul; caută **centrul** granulomului și **forma** în care stau nucleii.',
    insets: [null, null, null, null, P('tb_mare', 'Langhans: nuclei în potcoavă (Ed Uthman, CC BY 2.0)'), P('dd_sarc', 'Sarcoidoză (Calicut, CC BY-SA 4.0)')],
    beatDur: 6.5,
  },
  {
    scene: 'atlas', sceneOpts: {
      a: { img: 'cs_mic', W: 1000, H: 750, marks: [
        { x: 560, y: 270, rx: 140, ry: 90, lab: 'material străin (cheratină)', ly: 120 },
        { x: 625, y: 180, rx: 40, ry: 30, lab: 'celulă gigantă', lx: 760, ly: 150 },
        { x: 450, y: 560, rx: 110, ry: 60, lab: 'infiltrat + țesut de granulație', ly: 645 },
        { x: 880, y: 420, rx: 80, ry: 90, lab: 'fibroză la periferie', lx: 870, ly: 535 },
      ] },
      b: { img: 'cs_mare', W: 900, H: 676, marks: [
        { x: 560, y: 160, rx: 110, ry: 70, lab: 'nuclei dezordonați', ly: 60 },
        { x: 430, y: 250, rx: 110, ry: 30, rot: 0.1, lab: 'material înglobat', ly: 300 },
        { x: 320, y: 470, rx: 100, ry: 50, lab: 'fragmente de material', ly: 545 },
      ] },
    },
    kick: 'Lama 18 · Pe lama reală · ob. mic → ob. mare · HE', title: 'Granulomul de corp străin pe lamă: ce încercuiești',
    hud: ['poze reale · ob. mic, apoi ob. mare'],
    points: [D('Ob. mic: materialul', '!!material străin!! **lamelar**, central'), D('Ob. mic: celula gigantă', 'mulată pe material'), D('Ob. mic: infiltratul', 'macrofage, limfocite'), D('Ob. mic: fibroza', 'la periferie'), D('Ob. mare: nucleii', '!!dezordonați!!'), D('Ob. mare: material înglobat', 'în celula gigantă'), D('Ob. mare: fragmente', 'în jur')],
    why: 'Pozele: Department of Pathology, Calicut Medical College · CC BY-SA 4.0 · Wikimedia Commons.',
  },
  {
    ...SCRIPT('cs', [
      { tm: 'Organ', at: '1 p', tx: '!!Țesut moale!!, colorația **HE**.' },
      { tm: 'Leziune', at: '1 p', tx: '!!Inflamație cronică granulomatoasă de corp străin!!.' },
      { tm: 'Definiție', at: '1 p', tx: 'Granulom format din **macrofage și celule gigante multinucleate** în jurul unui **material străin nedigerabil**, !!fără necroză cazeoasă!!.' },
      { tm: 'Descriere', at: '6 p', tx: '● ob. mic: **granulom neregulat** cu **material străin central** (fir de sutură, cheratină) ● **celule gigante multinucleate mulate pe material**, apoi macrofage, limfocite ● la exterior: **țesut de granulație și fibroză** ● **fără necroză centrală** ● ob. mare: celule gigante cu **nuclei dezordonați**, în toată citoplasma, nu în potcoavă ● în jur: **macrofage epitelioide și limfocite**; fără cazeum, fără neutrofile în masă.' },
      { tm: 'Cauze', at: '4 p', tx: '● **firele de sutură** ● **talcul, uleiul, siliconul** ● **cheratina** dintr-un chist rupt ● **cristalele de urat**.' },
      { tm: 'Complicații', at: '3 p', tx: '● **persistă** cât timp persistă materialul ● **fibroza** în jurul granulomului ● **dispare** după îndepărtarea materialului.' },
      { tm: 'DD', at: '✓', tx: '**Granulomul tuberculos**: TBC are **cazeum central** și celule **Langhans cu nuclei în potcoavă**; aici nuclei dezordonați și material străin, fără necroză.' },
      { tm: 'Concluzia', at: '', tx: 'Deci: **granulom de corp străin**.' },
    ], [8, 8, 22, 60, 25, 25, 25, 6]),
    kick: 'Lama 18 · Fișa OSPE · granulom de corp străin', title: 'Ce spui cu voce tare (poți strânge 16 p, minim 5)',
  },

  // ======================= RECAPITULARE
  {
    scene: 'recap', kick: 'LP 3–4 · Recapitulare · lamele (HE)', title: 'Cele 6 lame: după ce le recunoști, mecanismul, cu ce le confunzi',
    hud: ['6 lame · HE'],
    table: { head: ['Lama', 'O recunoști după', 'Mecanismul, într-un rând', 'Nu o confunda cu'], rows: [
      ['13. Hipercheratoză', 'piele; strat cornos gros, lamelar, **anucleat** (orto); granulos proeminent; acantoză; fără atipii', 'frecare / inflamație cronică → cheratina se acumulează (distrofie proteică)', 'paracheratoza · papilomul · carcinomul scuamos'],
      ['14. Distrofie adipoasă hepatică', 'vacuole clare, rotunde, în hepatocite; macroveziculară: !!nucleu periferic, turtit!!; fără inflamație', 'acizi grași ↑, ardere ↓, export ↓ → trigliceride în hepatocit', 'balonizarea · ficatul de stază · amiloidoza'],
      ['15. Pericardită fibrinoasă', 'strat eozinofil, amorf, **franjurat** (fibrină) pe epicard; infiltrat, vase congestionate; organizare la bază', 'permeabilitate mult ↑ → fibrinogen → fibrină pe seroasă', 'pericardita purulentă · pneumonia lobară · trombul'],
      ['16. Abcese hepatice', 'ficat; colecție circumscrisă de **neutrofile + detritus**; membrană piogenă; hepatocite comprimate; fără granulom', 'bacterii piogene → neutrofile → lichefiere → membrană piogenă', 'granulomul TBC · infarctul · tumora'],
      ['17. Limfadenită tuberculoasă', '**necroză cazeoasă** (roz, amorfă, fără contururi); epitelioide; **Langhans** (!!nuclei în potcoavă!!); limfocite', 'Th1 → IFN-γ → epitelioide → Langhans; hipoxie → cazeum', 'sarcoidoza · corpul străin · abcesul'],
      ['18. Granulom de corp străin', 'țesut moale; material străin central; gigante cu !!nuclei dezordonați!!, macrofage, fibroză; fără cazeum', 'fagocitoză frustrată → fuziune (IL-4, IL-13); neimun', 'granulomul TBC · sarcoidoza · abcesul'],
    ] },
    beatDur: 6,
  },
];
