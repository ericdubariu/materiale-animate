// Recapitulare OSPE · Anatomie patologică · cele 26 de preparate oficiale (11 lame + 15 piese).
// Sursa: recapitularea OSPE (PDF) + deck-urile de pe site anatopat-z1…z4 (sursa de adevăr pentru fișe și DD).
// Roșu (!!…!!) = ce dă puncte; 1–4 pe slide.
import { PREPS } from './preps.js';
import { TABLES } from './tables.js';
export { GLOS, TERMS } from './glos.js';

const CAL = 'Dept. of Pathology, Calicut Medical College · CC BY-SA 4.0', YR = 'Yale Rosen · CC BY-SA 2.0', MH = 'Mikael Häggström · CC0', DT = 'Denis Desaulniers, Bernard Têtu · CC BY-SA 4.0';
const T = (img, lab) => ({ img, lab });

const INTRO = [
  // ---------------------------------------------------------------- 1 · COPERTA
  {
    deckName: 'Anatomie patologică · Recapitulare OSPE · preparatele 1–26',
    scene: 'cover', anim: false, spec: 'Static: cele 26 de poze reale, pe 4 rânduri (lame LP 1–2, piese LP 1–2, lame LP 3–4, piese LP 3–4); rândul punctului activ se aprinde.',
    kick: 'Anatomie patologică · Recapitulare OSPE · 1–26', title: 'Toate cele 26 de preparate, stație cu stație',
    hud: ['11 lame · 15 piese'],
    points: [
      { h: 'Lamele 1–5 · LP 1–2 · HE', d: ['edem pulmonar acut · stază cronică + infarct pulmonar (aceeași lamă) · infarct renal anemic · infarct miocardic acut · tromb mixt'] },
      { h: 'Piesele 6–12 · LP 1–2', d: ['aortă cu tromb parietal · tromb călăreț · infarct renal · infarct pulmonar · infarct miocardic acut · hematom intracerebral · rinichi de șoc'] },
      { h: 'Lamele 13–18 · LP 3–4 · HE', d: ['hipercheratoză · steatoză hepatică · pericardită fibrinoasă · abcese hepatice · limfadenită TBC · granulom de corp străin'] },
      { h: 'Piesele 19–26 · LP 3–4', d: ['steatoză hepatică · pancreatită acută · litiază renală · litiază biliară · pericardită fibrinoasă · abces cerebral · leptomeningită purulentă · bronhopneumonie'] },
    ],
    why: 'Cum lucrezi: pornești cronometrul (7 min), te uiți la poza preparatului ca la stație și spui fișa **cu voce tare**, rubrică cu rubrică; abia apoi treci cu săgeata și verifici. Ordinea: fișele 1→26, apoi DD-urile comparative, capcanele și tabelele.',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 2 · FIȘA OFICIALĂ
  {
    scene: 'fisa', anim: false, spec: 'Static: rubricile fișei oficiale ca buline-punct (organ, leziune, definiție = 3 p obligatorii; descriere, cauze, complicații; DD) și contorul „minim 5 p”.',
    kick: 'Recapitulare OSPE · Formatul · fișa oficială', title: 'Cum se punctează: rubrică cu rubrică',
    hud: ['stația: 7 min = 1 citit + 6 vorbit'],
    points: [
      { h: 'Rubrica 1 vine prima, mereu', d: ['!!organ + leziune + definiție = 3 p!!, marcate **OBLIGATORIU** pe fișă; le spui din primul minut, n-o sari niciodată'] },
      { h: 'Buline = puncte', d: ['la **descriere, cauze, complicații** fiecare idee separată = !!1 punct!!; le spui ca pe o listă, nu într-o frază lungă', 'lama: **ob. mic, apoi ob. mare** · piesa: **dimensiune, formă, culoare, consistență, suprafață, pe secțiune**'] },
      { h: 'Minim 5 puncte', d: ['3 din rubrica 1 + **2 buline** și ai trecut', 'fișele de aici îți dau **14–17 p** posibile pe preparat'] },
      { h: 'Mecanismul n-are rubrică', d: ['îl folosești doar ca să legi **cauza → leziunea → complicațiile**', 'apoi **DD**: un preparat de pe listă, !!1 asemănare + 3 diferențe!! + **2 alternative**'] },
    ],
    warn: 'Contează **doar ce spui cu voce tare**; examinatorul tace și anunță doar ultimul minut. Nu pierde timp pe patogeneză lungă.',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 3 · PLANUL STAȚIEI
  {
    scene: 'plan', anim: false, spec: 'Static: diagramă pe 7 minute (o bară pe etapă, linia roșie punctată la 6:00 = „mai e 1 minut”); bara etapei active se aprinde.',
    kick: 'Recapitulare OSPE · Planul stației', title: 'Cele 7 minute: 1 de citit, 6 de vorbit',
    hud: ['propunere de împărțire'],
    points: [
      { h: '0:00–1:30 · Citești + ciornă', d: ['1 minut de citit sarcina', 'pe ciornă scrii doar **5 cuvinte-cheie**, în ordinea fișei (ciorna nu se punctează)'] },
      { h: '1:30–2:00 · Organ · leziune · definiție', d: ['!!3 puncte obligatorii!!: le spui primele, câte o frază'] },
      { h: '2:00–3:30 · Descrierea', d: ['lama: **ob. mic → ob. mare** · piesa: **dimensiune, formă, culoare, consistență, suprafață, pe secțiune**', 'spui „**pe piesa fixată**, culoarea este…”'] },
      { h: '3:30–4:30 · Cauze + complicații', d: ['buline scurte; mecanismul doar ca liant'] },
      { h: '4:30–5:30 · DD', d: ['partenerul de pe listă: **1 asemănare + 3 diferențe**, apoi **2 alternative**'] },
      { h: '5:30–7:00 · Completezi + concluzia', d: ['revii la detaliile sărite', 'la „mai e 1 minut”: !!repeți diagnosticul într-o frază!!'] },
    ],
    say: 'Începi să vorbești **devreme**: tot ce ai spus rămâne punctat. Dacă nu știi un detaliu, treci mai departe și revii în minutele de completare.',
    warn: 'Depășirea timpului sau refuzul de a părăsi stația = **excludere și nota 4** la disciplină (regulamentul OSPE).',
    beatDur: 5,
  },
  // ---------------------------------------------------------------- 4 · HARTA LAMELOR
  {
    scene: 'tiles', layout: 'script', anim: false, spec: 'Static: mozaic cu cele 11 lame (poze reale), câte una pe pătrat; pătratul punctului activ se aprinde.',
    kick: 'Recapitulare OSPE · Harta lamelor', title: 'Cele 11 lame, fiecare cu semnul ei',
    sceneOpts: { cols: 3, tiles: [T('p1', '1 · edem'), T('p2', '2 · stază + infarct'), T('p3', '3 · infarct renal'), T('p4', '4 · IMA'), T('p5', '5 · tromb mixt'), T('p13', '13 · hipercheratoză'), T('p14', '14 · steatoză'), T('p15', '15 · pericardită'), T('p16', '16 · abces'), T('p17', '17 · TBC'), T('p18', '18 · corp străin')] },
    points: [
      { h: '1 · Edem pulmonar acut', d: ['alveole pline cu lichid roz, acelular, cu bule de aer'] },
      { h: '2 · Stază cronică + infarct pulmonar', d: ['septuri groase + siderofage; sub pleură: !!a doua leziune!!, alveole pline cu sânge'] },
      { h: '3 · Infarct renal anemic', d: ['contur păstrat, nuclei absenți („fantome”), lizereu hemoragic'] },
      { h: '4 · Infarct miocardic acut', d: ['fibre roz intens, fără nuclei, invadate de neutrofile'] },
      { h: '5 · Tromb mixt', d: ['lamele alternante palide și roșii: !!liniile Zahn!!'] },
      { h: '13 · Hipercheratoză', d: ['strat cornos enorm, fără nuclei, peste un epiderm îngroșat'] },
      { h: '14 · Steatoză hepatică', d: ['vacuole clare, rotunde, nucleul împins la margine'] },
      { h: '15 · Pericardită fibrinoasă', d: ['strat roz, franjurat, pe suprafața inimii'] },
      { h: '16 · Abcese hepatice', d: ['colecție de puroi cu perete propriu (membrana piogenă)'] },
      { h: '17 · Limfadenită TBC', d: ['!!cazeum!! în centru, epitelioide și Langhans în jur'] },
      { h: '18 · Granulom de corp străin', d: ['celule gigante mulate pe un material nedigerabil'] },
    ],
beatDur: 4,
  },
  // ---------------------------------------------------------------- 5–6 · HARTA PIESELOR
  {
    scene: 'tiles', layout: 'script', anim: false, spec: 'Static: mozaic cu piesele (poze reale), câte una pe pătrat; pătratul punctului activ se aprinde.',
    kick: 'Recapitulare OSPE · Harta pieselor (1/2) · 6–12', title: 'Cele 7 piese de tulburări hemodinamice',
    sceneOpts: { cols: 2, tiles: [T('p6', '6 · tromb aortic'), T('p7', '7 · tromb călăreț'), T('p8', '8 · infarct renal'), T('p9', '9 · infarct pulmonar'), T('p10', '10 · IMA'), T('p11', '11 · hematom'), T('p12', '12 · rinichi de șoc')] },
    points: [
      { h: '6 · Aortă cu tromb parietal', d: ['masă stratificată, !!aderentă de intimă!!; lumenul rămâne liber'] },
      { h: '7 · Tromb călăreț', d: ['mase încolăcite, neaderente, la bifurcația a. pulmonare'] },
      { h: '8 · Infarct renal', d: ['con alb-gălbui: baza la capsulă, vârful spre hil'] },
      { h: '9 · Infarct pulmonar', d: ['con roșu-negricios, cu baza la pleură'] },
      { h: '10 · Infarct miocardic acut', d: ['arie galben-palidă, moale, pe toată grosimea peretelui VS'] },
      { h: '11 · Hematom intracerebral', d: ['cheag profund care rupe țesutul și intră în ventricul'] },
      { h: '12 · Rinichi de șoc', d: ['corticală palidă și lată, medulară roșie: !!leziune difuză!!'] },
    ],
beatDur: 4,
  },
  {
    scene: 'tiles', layout: 'script', anim: false, spec: 'Static: mozaic cu piesele (poze reale), câte una pe pătrat; pătratul punctului activ se aprinde.',
    kick: 'Recapitulare OSPE · Harta pieselor (2/2) · 19–26', title: 'Cele 8 piese de distrofii și inflamații',
    sceneOpts: { cols: 2, tiles: [T('p19', '19 · ficat gras'), T('q20', '20 · pancreatită (micro)'), T('p21', '21 · litiază renală'), T('p22', '22 · litiază biliară'), T('p23', '23 · cord păros'), T('p24', '24 · abces cerebral'), T('p25', '25 · meningită'), T('p26', '26 · bronhopneumonie')] },
    points: [
      { h: '19 · Steatoză hepatică', d: ['ficat mare, galben, cu margini rotunde'] },
      { h: '20 · Pancreatită acută', d: ['pancreas tumefiat, pestriț: hemoragie + !!pete alb-cretoase!!'] },
      { h: '21 · Litiază renală', d: ['calculi în bazinet, cavități dilatate (hidronefroză)'] },
      { h: '22 · Litiază biliară', d: ['calculi fațetați într-o veziculă cu perete gros, fibros'] },
      { h: '23 · Pericardită fibrinoasă', d: ['epicard mat, vilos: !!„cordul păros”!!'] },
      { h: '24 · Abces cerebral', d: ['cavitate cu puroi și capsulă netedă, edem în jur'] },
      { h: '25 · Leptomeningită purulentă', d: ['puroi galben-verzui pe vase și în șanțuri'] },
      { h: '26 · Bronhopneumonie', d: ['focare gălbui, !!centrate pe bronhiole!!'] },
    ],
beatDur: 4,
  },
];

/* ---------------------------------------------------------------- DD COMPARATIVE */
const DDS = [
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga siderofagele pe lama 2 (poză, ob. mare), dreapta antracoza (poză); badge-ul se aprinde pe poza despre care vorbești.',
    kick: 'DD comparativ · lama 2 vs. antracoză', title: 'Pigment brun sau negru? Siderofage vs. antracoză',
    sceneOpts: { panels: [{ img: 'p2m', cap: 'stază: siderofage', cred: CAL }, { img: 'x_antra', cap: 'antracoză', cred: MH }], bad: [null, 0, 1] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['ce culoare are pigmentul și ce dă **reacția Perls**: !!brun-auriu + Perls pozitiv!! = hemosiderină (stază, hemoragie veche) · **negru + Perls negativ** = cărbune (antracoză)'] },
      { h: 'Plămânul de stază (lama 2)', d: ['pigment **brun-auriu, refringent**, în macrofage din alveole (siderofage)', 'Perls pozitiv (fier); septuri fibroase'] },
      { h: 'Antracoza pulmonară', d: ['pigment **negru**, în septuri și în jurul vaselor', '!!Perls negativ!! (cărbune, fără fier)'] },
    ],
    why: 'Hemosiderina vine din hematiile ieșite din capilarele congestionate și digerate de macrofage (are fier); cărbunele e inhalat (fără fier).',
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga edemul (poză, lama 1), dreapta exsudatul din pneumonie (poză); badge pe poza punctului.',
    kick: 'DD comparativ · lama 1 vs. pneumonia', title: 'Alveole pline: edem sau exsudat?',
    sceneOpts: { panels: [{ img: 'p1', cap: 'edem: transsudat', cred: YR }, { img: 'x_pneumo', cap: 'pneumonie: exsudat', cred: 'Nephron · CC BY-SA 3.0' }], bad: [null, 0, 1] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['ce e în alveolă? lichid fără celule = !!transsudat!! (edem) · **neutrofile + fibrină** = exsudat inflamator (pneumonie)'] },
      { h: 'Edemul pulmonar acut (lama 1)', d: ['lichid **roz-pal, omogen, acelular**, cu bule de aer', 'septuri subțiri, capilare pline'] },
      { h: 'Pneumonia acută (bronhopneumonia, piesa 26)', d: ['exsudat: !!neutrofile + fibrină!!', 'septuri congestionate, dar viabile'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: 4 poze, sus piesele (infarct renal alb, infarct pulmonar roșu), jos lamele lor (lama 3, lama 2); se aprind perechea albă, apoi perechea roșie.',
    kick: 'DD comparativ · infarctul alb vs. roșu', title: 'Alb sau roșu? Depinde de organ, nu de cauză',
    sceneOpts: { panels: [{ img: 'p8', cap: 'piesa 8: alb', cred: 'Dentl college survival kit · domeniu public' }, { img: 'p9', cap: 'piesa 9: roșu', cred: YR }, { img: 'p3', cap: 'lama 3: fantome, fără sânge', cred: CAL }, { img: 'q2', cap: 'lama 2: alveole cu hematii', cred: 'Nephron · CC BY-SA 3.0' }], bad: [null, 0, 1], both: { 1: [0, 2], 2: [1, 3] } },
    points: [
      { h: 'Întrebarea care le desparte', d: ['spune **de ce**: organ dens + !!artere terminale = alb!! (rinichi, splină, cord) · țesut lax + **circulație dublă + congestie prealabilă = roșu** (plămân, intestin)', 'ambele: **necroză de coagulare**'] },
      { h: 'Infarctul renal: alb (piesa 8 + lama 3)', d: ['con **alb-gălbui**, baza la capsulă, lizereu roșu', 'lamă: tubi și glomeruli „fantomă”, fără sânge în aria moartă'] },
      { h: 'Infarctul pulmonar: roșu (piesa 9 + lama 2)', d: ['con **roșu-negricios**, baza la pleură (fibrină)', 'lamă: alveole !!pline cu hematii!!, septuri fără nuclei'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: true,
    spec: 'Stânga, desen (secțiune longitudinală prin vas): hematiile curg continuu de la stânga la dreapta peste tromb; trombul crește de pe peretele de jos spre lumen, câte o lamelă la ~1,8 s, alternând palid (trombocite + fibrină; prima lamelă, pe perete, e palidă) și roșu (hematii prinse), până la 7 lamele, apoi reia de la una. Dreapta: poza statică a cheagului postmortem. Badge 2 pe tromb, 3 pe cheag.',
    kick: 'DD comparativ · lama 5 + piesele 6–7 vs. cheagul', title: 'Trombul crește în sânge care curge; cheagul, în sânge oprit',
    sceneOpts: { panels: [{ draw: 'tromb', cap: 'trombul: lamele în flux (desen)' }, { img: 'x_cheag', cap: 'cheagul postmortem', cred: MH }], bad: [null, 0, 1] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['trombul s-a format în **sângele care curgea**: de aceea are straturi și e lipit de perete · cheagul, în **sânge oprit**: hematiile jos, plasma sus, !!fără linii Zahn!!'] },
      { h: 'Trombul (antemortem): lama 5, piesele 6–7', d: ['!!aderent!! de perete, **mat, friabil, uscat**', 'liniile Zahn: straturi albe (trombocite + fibrină) / roșii (hematii)', 'la piesa 7: embolul **nu aderă** și nu mulează artera în care stă'] },
      { h: 'Cheagul postmortem', d: ['**neaderent, elastic, lucios, umed**', '„jeleu de coacăze” (hematii, jos) + „grăsime de pui” (plasmă, sus), fără straturi'] },
    ],
    beatDur: 7,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga abcesul (poză), dreapta granulomul TBC cu cazeum (poză); badge pe poza punctului.',
    kick: 'DD comparativ · lama 16 vs. lama 17', title: 'Abces sau granulom? Puroi sau cazeum?',
    sceneOpts: { panels: [{ img: 'p16', cap: 'abces: puroi', cred: YR }, { img: 'p17', cap: 'granulom TBC: cazeum', cred: CAL }], bad: [null, 0, 1] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['ce celulă domină? **neutrofilul** (inflamație acută purulentă) = abces · !!macrofagul activat!! (epitelioide, celule gigante) = granulom; cazeumul central spune TBC'] },
      { h: 'Abcesul (lama 16)', d: ['**lichefiere**: țesut digerat, neutrofile în masă, puroi', 'membrană piogenă; fără epitelioide, fără Langhans'] },
      { h: 'Granulomul TBC (lama 17)', d: ['!!cazeum!! roz, amorf + epitelioide + Langhans', 'coroană de limfocite; fără neutrofile în masă'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga celula Langhans (poză, ob. mare), dreapta celula gigantă de corp străin (poză, ob. mare); badge pe poza punctului.',
    kick: 'DD comparativ · lama 17 vs. lama 18', title: 'Celula Langhans vs. celula gigantă de corp străin',
    sceneOpts: { panels: [{ img: 'q17', cap: 'Langhans: nuclei în potcoavă', cred: 'Ed Uthman · CC BY 2.0' }, { img: 'q18', cap: 'corp străin: nuclei dezordonați', cred: CAL }], bad: [null, 0, 1] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['celula gigantă singură nu dă diagnosticul: privești **cum stau nucleii** (!!potcoavă vs. dezordine!!) și **ce e în centru** (cazeum vs. material străin, birefringent în lumină polarizată)'] },
      { h: 'Langhans · granulomul TBC (lama 17)', d: ['nuclei **la periferie, în potcoavă**', 'cazeum central; granulom !!imun!! (hipersensibilitate de tip IV)'] },
      { h: 'Corp străin (lama 18)', d: ['nuclei **dezordonați**, în toată citoplasma', 'material străin înglobat; fără cazeum (granulom **neimun**)'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: 3 panouri: steatoza (poză, ob. mare), balonizarea (desen: celule umflate, citoplasmă floconoasă, nucleu central), ficatul de stază (desen: vena centrolobulară cu sinusoide pline de sânge); badge pe panoul punctului.',
    kick: 'DD comparativ · lama 14 la microscop', title: 'Steatoza vs. balonizarea vs. ficatul de stază',
    sceneOpts: { panels: [{ img: 'q14', cap: 'steatoză', cred: CAL }, { draw: 'balon', cap: 'balonizare (desen)' }, { draw: 'stazaHep', cap: 'ficat de stază (desen)' }], bad: [null, 0, 1, 2] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['**vacuola goală, rotundă**, cu nucleul împins = grăsime dizolvată la prelucrare (steatoză; confirmi cu **Sudan III / Oil Red O** pe secțiuni la gheață)', 'citoplasmă floconoasă, nucleu central = **apă** (balonizare) · sânge centrolobular = **stază**'] },
      { h: 'Steatoza (lama 14)', d: ['vacuolă !!rotundă, net delimitată!!, goală', 'nucleul împins la periferie, în semilună'] },
      { h: 'Balonizarea (distrofia hidropică)', d: ['celulă umflată, citoplasmă **clară, floconoasă**', 'nucleul !!rămâne central!!'] },
      { h: 'Ficatul de stază', d: ['sinusoide dilatate, pline cu sânge, în jurul **venei centrolobulare**', 'hepatocite atrofiate, fără vacuole'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: 3 panouri: ficatul gras (poză, piesa 19), ficatul „în nucșoară” (desen: puncte roșii pe fond galben), ciroza (desen: noduli separați de septuri albe); badge pe panoul punctului.',
    kick: 'DD comparativ · piesa 19', title: 'Ficatul gras vs. ficatul de stază vs. ciroza, pe piesă',
    sceneOpts: { panels: [{ img: 'p19', cap: 'steatoză (piesa 19)', cred: DT }, { draw: 'nutmeg', cap: '„în nucșoară” (desen)' }, { draw: 'ciroza', cap: 'ciroză (desen)' }], bad: [null, 0, 1, 2] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['culoare **uniform galbenă** + organ mare, moale = steatoză · desen **pestriț roșu/galben** = stază cronică · !!noduli + fibroză!!, organ mic și dur = ciroză'] },
      { h: 'Steatoza hepatică (piesa 19)', d: ['!!mare, galben, moale!!, margini rotunjite', 'pe secțiune unsuros; desen lobular șters'] },
      { h: 'Ficatul de stază („în nucșoară”)', d: ['pe secțiune: puncte roșii (**centrolobular**)', 'pe fond galben (periferia lobulului)'] },
      { h: 'Ciroza hepatică', d: ['mic, dur, suprafață **nodulară**', 'noduli separați de septuri fibroase'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga bronhopneumonia (poză, piesa 26), dreapta pneumonia lobară (desen: lobul inferior consolidat în întregime); badge pe panoul punctului.',
    kick: 'DD comparativ · piesa 26 vs. pneumonia lobară', title: 'Focare în mai mulți lobi sau un lob întreg?',
    sceneOpts: { panels: [{ img: 'p26', cap: 'bronhopneumonie (piesa 26)', cred: YR }, { draw: 'lobar', cap: 'pneumonie lobară (desen)' }], bad: [null, 0, 1] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['**focare separate**, în jurul bronhiolelor, în mai mulți lobi = bronhopneumonie · !!un lob întreg, uniform!!, cu limită la scizură = pneumonie lobară (pneumococ, adult sănătos)'] },
      { h: 'Bronhopneumonia (piesa 26)', d: ['focare **lobulare, gălbui**, centrate pe bronhiole', 'multiple, bilaterale, bazale; vârstnici, copii'] },
      { h: 'Pneumonia lobară', d: ['un lob întreg, omogen, oprit la scizură', 'stadii: congestie → **hepatizație roșie → cenușie**'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga piesa 23 („cordul păros”, poză), dreapta lama 15 (fibrina la microscop, poză); badge pe poza punctului.',
    kick: 'DD comparativ · piesa 23 și lama 15', title: 'Pericardita fibrinoasă: aceeași leziune, două preparate',
    sceneOpts: { panels: [{ img: 'p23', cap: 'piesa 23: „cordul păros”', cred: DT }, { img: 'p15', cap: 'lama 15: fibrina', cred: 'Krystyna Bielnik și colab. · CC BY-SA 3.0' }], bad: [null, 0, 1] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['pe piesă spui **„cord păros”** și explici fibrina care se depune și se rupe la frecare; pe lamă arăți **fibrina eozinofilă + infiltratul**', '!!neutrofile în masă = purulentă!!, nu fibrinoasă'] },
      { h: 'Piesa 23: „cordul păros”', d: ['epicard **mat, aspru, vilos**, cenușiu-gălbui', '„pâine cu unt” desprinsă: foițele se lipesc și se dezlipesc la fiecare bătaie · clinic: **frecătură pericardică** · evoluție: aderențe → constricție'] },
      { h: 'Lama 15: fibrina la microscop', d: ['strat **roz, franjurat** pe epicard', 'infiltrat + vase congestionate dedesubt'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: 3 poze de creier (hematom, abces, leptomeningită); badge pe poza punctului.',
    kick: 'DD comparativ · piesele de creier', title: 'Hematom, abces sau leptomeningită: unde e leziunea?',
    sceneOpts: { panels: [{ img: 'p11', cap: 'hematom (piesa 11)', cred: DT }, { img: 'p24', cap: 'abces (piesa 24)', cred: 'Netha Hussain · CC BY-SA 3.0' }, { img: 'p25', cap: 'leptomeningită (piesa 25)', cred: 'CDC / Edwin P. Ewing, Jr. · domeniu public' }], bad: [null, 0, 1, 2, null] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['întâi **unde**: în parenchim (hematom, abces) sau !!pe suprafață!! (HSA, leptomeningită) · apoi **ce**: sânge (roșu-negricios) sau puroi (galben-verzui, capsulă)'] },
      { h: 'Hematomul intracerebral (piesa 11)', d: ['cheag **roșu-negricios, profund**, în parenchim', 'HTA, ganglionii bazali; inundă ventriculul'] },
      { h: 'Abcesul cerebral (piesa 24)', d: ['cavitate cu **capsulă**, conținut purulent', 'edem în jur; nu e sânge proaspăt'] },
      { h: 'Leptomeningita purulentă (piesa 25)', d: ['puroi galben-verzui **pe suprafață, pe vase**', 'meninge opace; parenchim sub ele'] },
      { h: 'DD fără piesă: hemoragia subarahnoidiană', d: ['sânge pe suprafață, **în șanțuri**; parenchimul intact (anevrism rupt)'] },
    ],
    beatDur: 5,
  },
];

/* ---------------------------------------------------------------- CAPCANE */
const CAPCANE = [
  {
    scene: 'tiles', layout: 'script', anim: false, spec: 'Static: mozaic cu 8 poze reale, câte una pe capcană; pătratul punctului activ se aprinde.',
    kick: 'Capcane · LP 1–2 · tulburări hemodinamice', title: 'Unde se pierd puncte la preparatele 1–12',
    sceneOpts: { cols: 2, tiles: [T('p5', 'tromb ≠ cheag'), T('p8', 'alb vs. roșu'), T('p1', 'edem vs. pneumonie'), T('x_antra', 'pigment brun vs. negru'), T('p11', 'între ce straturi?'), T('p12', 'șoc ≠ infarct'), T('q2', 'lama 2: două leziuni'), T('p6', 'piesa fixată')] },
    points: [
      { h: 'Tromb = cheag?', d: ['Nu. Trombul e antemortem: !!aderent, friabil, mat, cu linii Zahn!!; cheagul postmortem e **elastic, lucios, neaderent**'] },
      { h: 'Alb vs. roșu', d: ['spune de ce: organ !!dens + artere terminale = alb!! (rinichi, splină, cord); **lax + circulație dublă + congestie = roșu** (plămân, intestin)'] },
      { h: 'Edem vs. pneumonie', d: ['edemul = **lichid acelular**, roz palid, cu bule de aer; **neutrofile + fibrină** = exsudat (pneumonie, piesa 26)'] },
      { h: 'Siderofage vs. antracoză', d: ['!!brun-auriu, refringent, Perls +!! = hemosiderină (stază); **negru, Perls −** = antracoză'] },
      { h: 'Hemoragia: între ce straturi?', d: ['epidural (os–dura) · subdural (dura–arahnoidă) · subarahnoidian (în șanțuri) · intracerebral (parenchim)'] },
      { h: 'Rinichi de șoc ≠ infarct', d: ['șocul: !!paloare difuză!! a corticalei + medulară roșie, bilateral; infarctul: zonă **localizată, piramidală**, cu lizereu'] },
      { h: 'Lama 2 are două leziuni', d: ['nu te opri la stază: caută și **aria subpleurală** (infarctul) cu alveole pline de sânge și septuri fără nuclei'] },
      { h: 'Culoarea pe piesa fixată', d: ['în formol roșul devine **brun-cenușiu**: spune „**pe piesa fixată** culoarea este…”, nu inventa culoarea proaspătă'] },
    ],
beatDur: 5,
  },
  {
    scene: 'tiles', layout: 'script', anim: false, spec: 'Static: mozaic cu 8 poze reale, câte una pe capcană; pătratul punctului activ se aprinde.',
    kick: 'Capcane · LP 3–4 · distrofii și inflamații', title: 'Unde se pierd puncte la preparatele 13–26',
    sceneOpts: { cols: 2, tiles: [T('q13', 'orto vs. para'), T('q14', 'steatoză vs. balonizare'), T('p15', 'fibrinos ≠ purulent'), T('p16', 'abces ≠ granulom'), T('q17', 'Langhans vs. corp străin'), T('q20', 'petele albe: pancreas'), T('p21', 'calculi: organ + tip'), T('p26', 'bronho ≠ lobară')] },
    points: [
      { h: 'Orto- vs. paracheratoză', d: ['orto: cornos **fără nuclei**, granulos prezent (bătătura, hipercheratoza simplă); para: !!nuclei în cornos!!, granulos absent (psoriazis)'] },
      { h: 'Steatoză vs. balonizare', d: ['steatoza: vacuolă **rotundă, net delimitată**, nucleu împins; balonizarea: citoplasmă clară, floconoasă, **nucleu central**'] },
      { h: 'Fibrinos ≠ purulent ≠ tromb', d: ['fibrină pe seroasă = **pericardită fibrinoasă**; neutrofile în masă = purulentă; fibrină în lumen, în straturi = **tromb**'] },
      { h: 'Abces ≠ granulom', d: ['abces = **neutrofile + lichefiere** + membrană piogenă; granulom = epitelioide + celule gigante; TBC adaugă **cazeum**'] },
      { h: 'Langhans vs. corp străin', d: ['Langhans: nuclei **în potcoavă** (TBC, imun); corp străin: nuclei dezordonați, în jurul materialului (neimun, fără cazeum)'] },
      { h: 'Petele albe de pe pancreas', d: ['citosteatonecroza = !!acizi grași + calciu!! (săpunuri); doar pancreatita acută le dă, autoliza postmortem nu; spune și **hipocalcemia**'] },
      { h: 'Calculi: organul și tipul', d: ['renal: oxalat (brun, spiculat), struvit (alb, coraliform), urat (neted); biliar: colesterol (galben, mare), pigmentari (negri, mici); spune **de ce s-au format**'] },
      { h: 'Bronhopneumonie ≠ lobară', d: ['focare **multiple, lobulare, bilaterale, bazale** (vârstnici, copii) vs. !!lob întreg, omogen, în stadii!! (adult sănătos)'] },
    ],
beatDur: 5,
  },
];

const PREP_SLIDES = Array.from({ length: 26 }, (_, k) => PREPS[k + 1]).filter(Boolean);
export const SLIDES = [...INTRO, ...PREP_SLIDES, ...DDS, ...CAPCANE, ...TABLES];
