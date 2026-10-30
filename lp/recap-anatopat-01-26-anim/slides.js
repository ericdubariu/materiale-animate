// Recapitulare OSPE · Anatomie patologică · cele 26 de preparate oficiale (11 lame + 15 piese).
// Sursa: recapitularea OSPE (PDF) + deck-urile de pe site anatopat-z1…z4 (sursa de adevăr pentru fișe și DD).
// Roșu (!!…!!) = ce dă puncte; 1–4 pe slide.
import { PREPS } from './preps.js';
import { TABLES } from './tables.js';
export { GLOS, TERMS } from './glos.js';

const LP = 'preparatul de la LP';
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
      { h: 'Piesele 6–12 · LP 1–2', d: ['aortă cu tromb parietal · tromb călăreț · infarct renal · infarct pulmonar · infarct miocardic acut · hemoragii intracraniene · rinichi de șoc'] },
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
      { h: 'Buline = puncte', d: ['la **descriere, cauze, complicații** fiecare idee separată = !!1 punct!! („o bulină = 1 punct”); le spui ca pe o listă, nu într-o frază lungă'] },
      { h: 'Minim 5 puncte', d: ['3 din rubrica 1 + **2 buline** și ai trecut', 'fișele de aici îți dau între **8 și 24 p** posibile pe preparat'] },
      { h: 'Rubrica 3: aspecte clinicopatologice', d: ['**cauze** + **complicații** + **diagnostic diferențial**; mecanismul n-are rubrică, îl folosești doar ca liant', 'DD: un preparat **de pe listă** (lamă cu lamă, piesă cu piesă): **1 asemănare + 3 diferențe**, plus **2 alternative**'] },
    ],
    xtra: 'Metoda din deck-uri, nu din fișă: la lamă descrii **ob. mic, apoi ob. mare**; la piesă: dimensiune, formă, culoare, consistență, suprafață, pe secțiune.',
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
      { h: '1 · Edem pulmonar acut', d: ['alveole pline cu substanță omogenă, eozinofilă, cu bule de aer'] },
      { h: '2 · Stază cronică + infarct pulmonar', d: ['septuri îngroșate, fibrozate + siderofage; !!a doua leziune!!: infarctul, alveole inundate hemoragic'] },
      { h: '3 · Infarct renal anemic', d: ['aspect fantomatic: nuclei pierduți, arhitectura păstrată; !!lizereu congestiv!!'] },
      { h: '4 · Infarct miocardic acut', d: ['fibre fără nuclei, intens eozinofile; lizereu cu granulocite'] },
      { h: '5 · Tromb mixt', d: ['lamele alternante palide și roșii: !!liniile Zahn!!'] },
      { h: '13 · Hipercheratoză', d: ['strat cornos îngroșat, fără nuclei; restul straturilor fără modificări'] },
      { h: '14 · Steatoză hepatică', d: ['vacuole clare, rotunde, nucleul împins la margine'] },
      { h: '15 · Pericardită fibrinoasă', d: ['rețea de fibrină roșu-roz pe seroasa ulcerată a epicardului'] },
      { h: '16 · Abcese hepatice', d: ['teritorii fără țesut hepatic, pline de granulocite și puroi'] },
      { h: '17 · Limfadenită TBC', d: ['!!cazeum!! în centru, epitelioide și Langhans în jur'] },
      { h: '18 · Granulom de corp străin', d: ['celule gigante cu nuclei fără ordine, în jurul cristalelor de colesterol'] },
    ],
beatDur: 4,
  },
  // ---------------------------------------------------------------- 5–6 · HARTA PIESELOR
  {
    scene: 'tiles', layout: 'script', anim: false, spec: 'Static: mozaic cu piesele (poze reale), câte una pe pătrat; pătratul punctului activ se aprinde.',
    kick: 'Recapitulare OSPE · Harta pieselor (1/2) · 6–12', title: 'Cele 7 piese de tulburări hemodinamice',
    sceneOpts: { cols: 2, tiles: [T('p6', '6 · tromb aortic'), T('p7', '7 · tromb călăreț'), T('p8', '8 · infarct renal'), T('p9', '9 · infarct pulmonar'), T('p10', '10 · IMA'), T('p11', '11 · hematom'), T('p12', '12 · rinichi de șoc')] },
    points: [
      { h: '6 · Aortă cu tromb parietal', d: ['tromb parietal, !!aderent!!, pe intima cu plăci aterosclerotice'] },
      { h: '7 · Tromb călăreț', d: ['tromb !!călare pe bifurcația aortei!!, în ambele artere iliace comune'] },
      { h: '8 · Infarct renal', d: ['zonă palidă, conturată de un lizereu congestiv'] },
      { h: '9 · Infarct pulmonar', d: ['zonă triunghiulară roșie-negricioasă, vârful spre hil'] },
      { h: '10 · Infarct miocardic acut', d: ['zonă palidă, cu halou hiperemic, în peretele VS'] },
      { h: '11 · Hemoragii intracraniene', d: ['hematom intracerebral: sânge în parenchim și în ventricul (inundare ventriculară); în LP și piese de hematom subdural și subarahnoidian'] },
      { h: '12 · Rinichi de șoc', d: ['!!corticală palidă, medulară hiperemică!!, bine delimitate'] },
    ],
beatDur: 4,
  },
  {
    scene: 'tiles', layout: 'script', anim: false, spec: 'Static: mozaic cu piesele (poze reale), câte una pe pătrat; pătratul punctului activ se aprinde.',
    kick: 'Recapitulare OSPE · Harta pieselor (2/2) · 19–26', title: 'Cele 8 piese de distrofii și inflamații',
    sceneOpts: { cols: 2, tiles: [T('p19', '19 · ficat gras'), T('p20', '20 · pancreatită acută'), T('p21', '21 · litiază renală'), T('p22', '22 · litiază biliară'), T('p23', '23 · pericardită'), T('p24', '24 · abces cerebral'), T('p25', '25 · leptomeningită'), T('p26', '26 · bronhopneumonie')] },
    points: [
      { h: '19 · Steatoză hepatică', d: ['ficat mărit, gălbui, cu marginea rotunjită și capsula tensă'] },
      { h: '20 · Pancreatită acută', d: ['structură inomogenă: !!focare gălbui-albicioase de steatonecroză!! + hemoragii negricioase'] },
      { h: '21 · Litiază renală', d: ['calculi coraliformi, calice dilatate, parenchim atrofic (hidronefroză)'] },
      { h: '22 · Litiază biliară', d: ['colecist cu calculi colesterolici (galbeni) sau pigmentari (fațetați); cu săruri de calciu: albicioși, cretoși, ca zarurile'] },
      { h: '23 · Pericardită fibrinoasă', d: ['pericard mat, rugos, cu depozite de fibrină: !!„limbă de pisică”!!'] },
      { h: '24 · Abces cerebral', d: ['cavitate rotund-ovalară, intraparenchimatoasă, cu conținut purulent'] },
      { h: '25 · Leptomeningită purulentă', d: ['exsudat purulent pe convexitate: girusuri aplatizate, șanțuri îngustate'] },
      { h: '26 · Bronhopneumonie', d: ['focare de condensare !!roșu închis!!, multiple, bilaterale'] },
    ],
beatDur: 4,
  },
];

/* ---------------------------------------------------------------- DD COMPARATIVE */
// Doar preparate și fapte din LP (S1, S2); ce e din manual stă în caseta albastră (xtra).
const DDS = [
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga edemul (poză, lama 1), dreapta un exsudat inflamator (lama 15, poză); badge pe poza punctului.',
    kick: 'Comparație · lama 1: transsudat vs. exsudat', title: 'Alveole pline: transsudat sau exsudat?',
    sceneOpts: { panels: [{ img: 'p1', cap: 'lama 1: transsudat', cred: LP }, { img: 'p15', cap: 'lama 15: exsudat fibrinos', cred: LP }], bad: [null, 0, 1] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['ce lichid e în alveolă? !!transsudat!! = sărac în proteine, densitate sub 1012 (edem) · **exsudat** = bogat în proteine, densitate peste 1012, asociat inflamației'] },
      { h: 'Edemul pulmonar acut (lama 1)', d: ['alveole pline cu **substanță omogenă, eozinofilă**, cu bule de aer; septuri ușor expandate', 'cauze: **presiunea hidrostatică ↑** sau **presiunea oncotică ↓**', 'exsudatul nu e preparat pe listă: la OSPE, DD-ul lamei 1 îl faci cu **lama 2** (stază + infarct)'] },
      { h: 'Exsudatul inflamator', d: ['tipul inflamației după extravazat: ser → seroasă · plasmă → **fibrinoasă** · neutrofile → !!purulentă!! · eritrocite → hemoragică', 'bronhopneumonia (piesa 26) = extensia alveolară a inflamației bronhiilor'] },
    ],
    xtra: 'Poza din dreapta e lama 15 (exsudat fibrinos, pe pericard): tot un lichid bogat în proteine; LP nu are lamă de pneumonie.',
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: 4 poze, sus piesele (infarct renal alb, infarct pulmonar roșu), jos lamele lor (lama 3, lama 2); se aprind perechea albă, apoi perechea roșie.',
    kick: 'DD comparativ · infarctul alb vs. roșu', title: 'Alb sau roșu? Depinde de circulația organului',
    sceneOpts: { panels: [{ img: 'p8', cap: 'piesa 8: alb', cred: LP }, { img: 'p9', cap: 'piesa 9: roșu', cred: LP }, { img: 'p3', cap: 'lama 3: aspect fantomatic', cred: LP }, { img: 'q2', cap: 'lama 2: alveole inundate hemoragic', cred: LP }], bad: [null, 0, 1], both: { 1: [0, 2], 2: [1, 3] } },
    points: [
      { h: 'Întrebarea care le desparte', d: ['rinichiul = organ parenchimatos cu **circulație unică** → !!infarct alb (anemic, ischemic)!! · plămânul = **circulație dublă**: infarctul apare doar pe **stază cronică preexistentă** → !!infarct roșu (hemoragic)!!', 'ambele: infarct = necroza unui țesut prin **aport insuficient de sânge oxigenat**'] },
      { h: 'Infarctul renal: alb (piesa 8 + lama 3)', d: ['zonă palidă, conturată de **lizereu congestiv**', 'lamă: aspect **fantomatic** (nucleii pierduți, arhitectura păstrată); lizereu: capilare congestionate + infiltrat inflamator acut'] },
      { h: 'Infarctul pulmonar: roșu (piesa 9 + lama 2)', d: ['zonă **triunghiulară, roșie-negricioasă**, cu vârful spre hil', 'lamă: alveole !!inundate hemoragic!!, septuri fără nuclei; în jur stază cronică'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: true,
    spec: 'Stânga, desen (secțiune longitudinală prin vas): hematiile curg continuu de la stânga la dreapta peste tromb; trombul crește de pe peretele de jos spre lumen, câte o lamelă la ~1,8 s, alternând palid (trombocite + fibrină; prima lamelă, pe perete, e palidă) și roșu (hematii prinse), până la 7 lamele, apoi reia de la una. Dreapta: poza statică a piesei 7 din LP (trombul călare pe bifurcația aortei). Badge 2 pe desen, 3 pe piesă.',
    kick: 'DD comparativ · lama 5 + piesele 6–7', title: 'Trombul: cum crește, unde stă și unde migrează',
    sceneOpts: { panels: [{ draw: 'tromb', cap: 'lama 5: liniile lui Zahn (desen)' }, { img: 'p7', cap: 'piesa 7: tromb călăreț', cred: LP }], bad: [null, 0, 1, null, null] },
    points: [
      { h: 'Ce este', d: ['tromboza = !!coagulare intravasculară și intravitală!!; cauze: **triada Virchow** (leziune endotelială, flux sanguin anormal, status hipercoagulant)'] },
      { h: 'La microscop (lama 5)', d: ['rețea de fibrină în ochiurile căreia se depun alternativ leucocite și trombocite, apoi eritrocite: !!liniile lui Zahn!!'] },
      { h: 'Pe piesă (piesele 6–7)', d: ['tromb **mixt stratificat, aderent, mat, friabil**', 'piesa 6: **tromb parietal** pe intima cu plăci aterosclerotice · piesa 7: !!călare pe bifurcația aortei!!, în ambele artere iliace comune'] },
      { h: 'Venos vs. arterial', d: ['venoși (TVP, membrele inferioare): cresc **în direcția fluxului**, migrează spre cord → **risc de TEP**', 'arteriali: cresc **retrograd** punctului de atașare, migrează **distal de cord**'] },
      { h: 'Evoluția', d: ['propagare · **embolizare** (embolul obstruă un ram mai mic → infarct) · dizolvare (t-PA) · organizare/recanalizare'] },
    ],
    xtra: 'Cheagul postmortem (nu e în LP): neaderent, elastic, lucios, fără straturi; trombul se formează **intravital**, în sângele care curge.',
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga abcesele hepatice (poză), dreapta granulomul TBC cu necroză cazeoasă (poză); badge pe poza punctului.',
    kick: 'DD comparativ · lama 16 vs. lama 17', title: 'Abces sau granulom? Puroi sau necroză cazeoasă?',
    sceneOpts: { panels: [{ img: 'p16', cap: 'abcese hepatice: puroi', cred: LP }, { img: 'p17', cap: 'limfadenită TBC: cazeum', cred: LP }], bad: [null, 0, 1] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['ce celulă domină? **granulocitul** (inflamație purulentă: leucodiapedeză → puroi) = abces · !!celulele epiteloide + Langhans, cu necroză cazeoasă!! = granulom tuberculos (BK inhibă migrarea granulocitelor)'] },
      { h: 'Abcesele hepatice (lama 16)', d: ['teritorii **fără țesut hepatic**, cu un număr mare de granulocite', 'colonii de microbi (grămezi intens bazofile), globule de puroi, hepatocite pe cale de necroză; delimitate de țesut conjunctiv'] },
      { h: 'Limfadenita TBC (lama 17)', d: ['!!necroză cazeoasă!! în centru: omogenă, acidofilă, fără structuri celulare', 'celule epiteloide + **Langhans**, la periferie **coroana limfocitară**'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga celula Langhans (poză, ob. mare), dreapta celula gigantă de corp străin (poză, ob. mare); badge pe poza punctului.',
    kick: 'DD comparativ · lama 17 vs. lama 18', title: 'Celula Langhans vs. celula gigantă de corp străin',
    sceneOpts: { panels: [{ img: 'p17', cap: 'lama 17: granuloame TBC', cred: LP }, { img: 'x18', cap: 'lama 18: celule gigante de corp străin', cred: LP }], bad: [null, 0, 1] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['cum stau nucleii: !!la periferie, în coroană sau potcoavă!! (Langhans) vs. **fără nicio ordine** (corp străin) · ce e în jur: necroză cazeoasă vs. **corpi străini** (cristale de colesterol)'] },
      { h: 'Langhans · limfadenita TBC (lama 17)', d: ['50–150 microni, numeroși nuclei (~100) **la periferie**', 'în granulom: necroză cazeoasă, epiteloide, coroană limfocitară'] },
      { h: 'Corp străin · granulomul (lama 18)', d: ['50–100 microni, nuclei **răspândiți fără nicio ordine** în citoplasmă abundentă, eozinofilă', 'în jurul corpilor străini care nu pot fi fagocitați; capilare de neoformație, țesut de granulație'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga steatoza (poză, ob. mare), dreapta abcesele hepatice (poză); badge pe poza punctului.',
    kick: 'DD comparativ · lama 14 vs. lama 16', title: 'Ficatul în HE: vacuole goale sau teritorii pline de granulocite?',
    sceneOpts: { panels: [{ img: 'p14', cap: 'steatoză (lama 14)', cred: LP }, { img: 'p16', cap: 'abcese hepatice (lama 16)', cred: LP }], bad: [null, 0, null, 1] },
    points: [
      { h: 'Asemănarea', d: ['ambele: ficat în HE, cu **structura lobulară păstrată**'] },
      { h: 'Ce e în hepatocite', d: ['steatoza: !!vacuole optic goale!!, rotunde, net delimitate; macrovacuolele împing nucleul la periferie · abcesele: teritorii în care **lipsește țesutul hepatic**, pline de granulocite'] },
      { h: 'Cum e distribuită leziunea', d: ['steatoza: difuz sau pe zone ale lobulului (periferolobular, centrolobular, difuz)', 'abcesele: zone mici, rotunde sau neregulate, delimitate de proliferare de țesut conjunctiv'] },
      { h: 'Puroiul', d: ['steatoza: **fără puroi**; grăsimile se evidențiază cu Sudan III', 'abcesele: !!globule de puroi, colonii de microbi!!, hepatocite pe cale de necroză'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga ficatul gras (poză, piesa 19), dreapta pancreatita acută (poza piesei 20: focare gălbui-albicioase); badge pe panoul punctului.',
    kick: 'DD comparativ · piesa 19 vs. piesa 20', title: 'Steatoză sau steatonecroză? Ficatul gras vs. pancreatita acută',
    sceneOpts: { panels: [{ img: 'p19', cap: 'steatoză hepatică (piesa 19)', cred: LP }, { img: 'p20', cap: 'pancreatită acută (piesa 20)', cred: LP }], bad: [null, 0, 1, null] },
    points: [
      { h: 'Asemănarea', d: ['ambele: organ abdominal cu leziune legată de grăsime, cu zone gălbui: **steatoza** = grăsimi în hepatocite · **steatonecroza** = necroza țesutului gras'] },
      { h: 'Ficatul gras (piesa 19)', d: ['tot ficatul !!mărit, gălbui!!, uniform; suprafață netedă, lucioasă, capsulă tensă', 'marginea anterioară rotunjită; parenchim friabil; lama cuțitului are **aspect grăsos**'] },
      { h: 'Pancreatita acută (piesa 20)', d: ['structură inomogenă: focare multiple (2–6 mm) !!gălbui-albicioase de steatonecroză!!, și în grăsimea peripancreatică', 'zone extinse de hemoragie, **negricioase după fixarea în formol**'] },
      { h: 'Mecanismul, ca liant', d: ['steatoza: grăsimi acumulate prin aport crescut sau tulburări metabolice (alcool, hipoxie, toxice)', 'pancreatita: enzimele activate intraductal → **autodigestie**; acizii grași se saponifică cu calciu → **hipocalcemie**'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga bronhopneumonia (poză, piesa 26), dreapta infarctul pulmonar (poză, piesa 9); badge pe poza punctului.',
    kick: 'DD comparativ · piesa 26 vs. piesa 9', title: 'Focare multiple sau o singură zonă triunghiulară?',
    sceneOpts: { panels: [{ img: 'p26', cap: 'bronhopneumonie (piesa 26)', cred: LP }, { img: 'p9', cap: 'infarct pulmonar (piesa 9)', cred: LP }], bad: [null, 0, 1, null] },
    points: [
      { h: 'Asemănarea', d: ['ambele: **plămân pe secțiune**, cu zone de consistență crescută, de culoare roșu închis'] },
      { h: 'Bronhopneumonia (piesa 26)', d: ['!!focare multiple, bilaterale!!, de condensare, **roșu închis**, cu diametre variabile; pornesc din jurul bronhiilor și bronhiolelor', 'între ele țesut normal aerat (uneori emfizem compensator); pot conflua (bronhopneumonie confluentă); lobii inferiori, paravertebral'] },
      { h: 'Infarctul pulmonar (piesa 9)', d: ['!!o singură zonă triunghiulară!!, roșie-negricioasă, cu vârful spre hil (vasul obstrucționat), bine delimitată', 'în jur **stază cronică** (indurație brună); cauza: obstrucția unei ramuri a arterei pulmonare (TEP)'] },
      { h: 'Nu e pe listă: pneumonia lobară', d: ['LP o leagă de **Klebsiella pneumoniae**, în **lobul superior**; evoluția stadială: congestie → hepatizație roșie → hepatizație cenușie → reparare'] },
    ],
    xtra: 'Din manual (nu e în LP): în pneumonia lobară tot lobul e consolidat uniform, iar leziunea se oprește la scizură.',
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: stânga piesa 23 (pericardul cu fibrină, poză), dreapta lama 15 (fibrina la microscop, poză); badge pe poza punctului.',
    kick: 'Aceeași leziune · piesa 23 și lama 15', title: 'Pericardita fibrinoasă: aceeași leziune, două preparate',
    sceneOpts: { panels: [{ img: 'p23', cap: 'piesa 23: „limbă de pisică”', cred: LP }, { img: 'p15', cap: 'lama 15: rețeaua de fibrină', cred: LP }], bad: [null, 0, 1] },
    points: [
      { h: 'Ce le leagă', d: ['inflamație a pericardului cu **exsudat fibrinos** pe suprafață (plasma extravazată → fibrinoasă); neutrofilele ar da !!inflamație purulentă!!, nu fibrinoasă'] },
      { h: 'Piesa 23', d: ['pericardul și-a pierdut **luciul, umiditatea și transparența**: suprafață mată, rugoasă', 'depozite neregulate, **albicioase-cenușii**, de fibrină: aspect păros de !!„limbă de pisică”!! sau „pâine unsă cu unt”', 'clinic: **frecătură pericardică**; evoluție: aderențe fibroase → pericardită constrictivă/restrictivă'] },
      { h: 'Lama 15', d: ['structura miocardului păstrată; țesut subepicardic îngroșat, capilare congestionate; infiltrat: granulocite, limfocite, histiocite', 'seroasa ulcerată, cu !!rețea de filamente grosolane roșu-roz!! și granulocite, histiocite în ochiuri'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'cmp', anim: false, spec: 'Static: 3 poze de creier (hematom, abces, leptomeningită); badge pe poza punctului.',
    kick: 'DD comparativ · piesele de creier', title: 'Hematom, abces sau leptomeningită: unde e leziunea?',
    sceneOpts: { panels: [{ img: 'p11', cap: 'hematom (piesa 11)', cred: LP }, { img: 'p24', cap: 'abces (piesa 24)', cred: LP }, { img: 'p25', cap: 'leptomeningită (piesa 25)', cred: LP }], bad: [null, 0, 1, 2, null] },
    points: [
      { h: 'Întrebarea care le desparte', d: ['întâi **unde**: în parenchim (hematom, abces) sau !!pe leptomeninge!! (leptomeningită, hemoragie subarahnoidiană) · apoi **ce**: sânge sau puroi'] },
      { h: 'Hematomul intracerebral (piesa 11)', d: ['impregnarea hematică a parenchimului prin **ruperea unei ramuri vasculare intracerebrale**', 'sângele poate inunda ventriculii (hemoragie intraventriculară)'] },
      { h: 'Abcesul cerebral (piesa 24)', d: ['**cavitate rotund-ovalară**, intraparenchimatoasă, cu conținut purulent', 'necroză de colicvație; la periferie !!membrană piogenă!!'] },
      { h: 'Leptomeningita purulentă (piesa 25)', d: ['exsudat purulent pe **convexitate** („meningită în șapcă”, pneumococ)', 'girusuri aplatizate, șanțuri îngustate'] },
      { h: 'Tot la piesa 11: subarahnoidian și subdural', d: ['LP are și piese de **hematom subarahnoidian** (între arahnoidă și pia mater, vizibil și în spațiile intergirale) și **subdural** (între dura mater și arahnoidă)'] },
    ],
    beatDur: 5,
  },
];

/* ---------------------------------------------------------------- CAPCANE */
const CAPCANE = [
  {
    scene: 'tiles', layout: 'script', anim: false, spec: 'Static: mozaic cu 8 poze reale, câte una pe capcană; pătratul punctului activ se aprinde.',
    kick: 'Capcane · LP 1–2 · tulburări hemodinamice', title: 'Unde se pierd puncte la preparatele 1–12',
    sceneOpts: { cols: 2, tiles: [T('p7', 'călăreț: bifurcația aortei'), T('p8', 'alb vs. roșu'), T('p1', 'transsudat vs. exsudat'), T('p2m', 'hiperemie ≠ congestie'), T('p11', 'între ce straturi?'), T('p12', 'șoc ≠ infarct'), T('q2', 'lama 2: două leziuni'), T('p10', 'IMA: cronologia')] },
    points: [
      { h: 'Trombul călăreț: unde stă?', d: ['în LP: !!călare pe bifurcația aortei!!, cu extensie în ambele artere iliace comune; nu e în artera pulmonară'] },
      { h: 'Alb vs. roșu', d: ['spune de ce: rinichi = **circulație unică** → alb · plămân = **circulație dublă** + !!stază cronică preexistentă!! → roșu'] },
      { h: 'Transsudat vs. exsudat', d: ['**transsudat** = sărac în proteine, densitate sub 1012 (edem) · **exsudat** = bogat în proteine, peste 1012, asociat inflamației'] },
      { h: 'Hiperemie ≠ congestie', d: ['hiperemia = proces **activ** (dilatare arteriolară, aport crescut) · congestia = proces **pasiv** (drenaj venos alterat → **stază**, ex. insuficiența cardiacă)'] },
      { h: 'Hemoragia: între ce straturi?', d: ['epidural (oase craniene–dura, de obicei traumatic) · subdural (dura–arahnoidă) · subarahnoidian (arahnoida, vizibil în spațiile intergirale) · intracerebral (parenchim)'] },
      { h: 'Rinichi de șoc ≠ infarct', d: ['șocul: !!corticala palidă, medulara hiperemică!! (redistribuția sângelui), reversibil · infarctul: o zonă de necroză conturată de **lizereu congestiv**, prin obstrucția ramurii arteriale'] },
      { h: 'Lama 2 are două leziuni', d: ['nu te opri la stază: caută și **zona de infarct** (alveole inundate hemoragic, septuri fără nuclei) și lizereul congestiv dintre ele'] },
      { h: 'Infarctul miocardic: ce vezi după cât timp', d: ['micro: vizibil după **4–6 ore** · macro: primele semne după **12–24 ore** (palid, halou hiperemic) · 2–3 zile: galben ca lutul · !!5–10 zile: miomalacie → risc de ruptură!!'] },
    ],
beatDur: 5,
  },
  {
    scene: 'tiles', layout: 'script', anim: false, spec: 'Static: mozaic cu 8 poze reale, câte una pe capcană; pătratul punctului activ se aprinde.',
    kick: 'Capcane · LP 3–4 · distrofii și inflamații', title: 'Unde se pierd puncte la preparatele 13–26',
    sceneOpts: { cols: 2, tiles: [T('p13', 'fără proliferare'), T('p14', 'infiltrație ≠ degenerare'), T('p15', 'fibrinos ≠ purulent'), T('p16', 'abces ≠ granulom'), T('x18', 'Langhans vs. corp străin'), T('p20', 'steatonecroza: pancreas'), T('p21', 'calculi: organ + tip'), T('p26', 'bronho ≠ lobară')] },
    points: [
      { h: 'Hipercheratoza: fără proliferare', d: ['cheratina crește superficial (strat cornos îngroșat, fără nuclei); !!leziunea nu se asociază cu proliferare epitelială!!; macro: placă albă, bine delimitată'] },
      { h: 'Steatoza: infiltrație ≠ degenerare', d: ['infiltrația = lipide acumulate **fără** tulburări ale metabolismului celular (aport crescut, hiperlipemie) · degenerarea = **în urma** lor (hipoxie, toxice, infecții); grăsimile se văd cu **Sudan III**'] },
      { h: 'Fibrinos ≠ purulent ≠ tromb', d: ['plasmă extravazată → **fibrinoasă** (pericardita) · neutrofile → **purulentă** (abces, leptomeningită) · fibrină în lumenul vasului, în straturi cu hematii = **tromb** (liniile lui Zahn)'] },
      { h: 'Abces ≠ granulom', d: ['abces = **granulocite + puroi**, membrană piogenă · granulom TBC = !!epiteloide + Langhans + necroză cazeoasă!!; BK inhibă migrarea granulocitelor'] },
      { h: 'Langhans vs. corp străin', d: ['Langhans: nuclei **la periferie, în coroană sau potcoavă** (TBC) · corp străin: nuclei **fără nicio ordine**, în jurul corpilor străini (cristale de colesterol)'] },
      { h: 'Petele de pe pancreas', d: ['citosteatonecroza = !!saponificarea acizilor grași cu săruri de calciu!!: focare 2–6 mm, gălbui-albicioase; spune și **hipocalcemia** (calciul sechestrat)'] },
      { h: 'Calculi: organul și tipul', d: ['renal: oxalat de Ca (80%), struvit (10%), acid uric sau cistină (6–10%); **coraliformi** = iau forma sistemului pielo-caliceal · biliar: **colesterolici** (galbeni, friabili), **pigmentari** (multipli, mici, fațetați); cu săruri de calciu: albicioși, ca zarurile'] },
      { h: 'Bronhopneumonie ≠ lobară', d: ['!!focare multiple, bilaterale, roșu închis!!, lobii inferiori (S. pneumoniae) · pneumonia lobară: Klebsiella, **lobul superior**'] },
    ],
beatDur: 5,
  },
];

const PREP_SLIDES = Array.from({ length: 26 }, (_, k) => PREPS[k + 1]).filter(Boolean);
export const SLIDES = [...INTRO, ...PREP_SLIDES, ...DDS, ...CAPCANE, ...TABLES];
