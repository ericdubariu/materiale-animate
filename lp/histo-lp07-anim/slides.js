// Conținutul slide-urilor LP 7: textul vine din LP 7 oficial (Histo_LP, UMFST).
// `xtra` = explicație proprie, nu e în LP (chenarul albastru).

export const GLOS = [
  ['LP', 'lucrarea practică'], ['HE', 'colorația hematoxilină-eozină'], ['OSPE', 'examen practic structurat pe stații'],
  ['DD', 'diagnostic diferențial'], ['SF', 'substanța fundamentală'], ['EN', 'termenul în engleză'], ['LA', 'termenul în latină'], ['ob.', 'obiectivul'],
];
export const TERMS = [
  ['hipocrom', 'hipocrom', 'se colorează slab, apare palid'],
  ['hipercrom', 'hipercrom', 'se colorează intens, apare închis'],
  ['eozinofil', 'eozinofil', 'ia eozina (roz)'],
  ['excentric', 'excentric', 'așezat lateral, nu în centrul celulei'],
  ['anastomoz', 'anastomozare', 'prelungirile se unesc între ele și formează o rețea'],
  ['pseudorețea', 'pseudorețea', 'rețea formată din celule (nu din fibre)'],
  ['stroma', 'stroma', 'scheletul de țesut conjunctiv care susține un organ'],
  ['uniloculat', 'uniloculat', 'cu o singură vacuolă de grăsime'],
  ['triglicerid', 'trigliceride', 'grăsimile depozitate în adipocit'],
  ['proteoglican', 'proteoglicani', 'molecule mari din SF care leagă multă apă'],
  ['endoteli', 'endoteliu', 'stratul de celule turtite care căptușește vasele'],
  ['corion', 'corion', 'conjunctivul lax de sub un epiteliu'],
  ['paniculi', 'paniculi adipoși', 'grupuri de adipocite strânse în cuiburi'],
  ['acin', 'acin', 'unitate secretorie rotundă a glandei'],
  ['tenocit', 'tenocite', 'fibrocitele tendonului'],
  ['medular', 'medulara', 'zona profundă (centrală, spre hil) a nodulului limfatic'],
  ['cortical', 'corticala', 'zona periferică a nodulului limfatic'],
  ['optic goal', 'optic goale', 'par goale pentru că lipidele s-au dizolvat'],
  ['artefact', 'artefact', 'aspect produs de prelucrarea lamei, nu de țesut'],
  ['argirofil', 'argirofil', 'leagă argintul și devine negru'],
];

const T1 = 'HE · glanda mamară', T3 = 'HE · tendon', T4 = 'HE · nodul limfatic';

export const SLIDES = [
  {
    deckName: 'Histologie · LP 7 · Țesutul conjunctiv (II)',
    scene: 'cover', kick: 'Histologie · LP 7 · Modulul 1 · OSPE', title: 'Țesutul conjunctiv (II): patru lame, patru semne-cheie',
    hud: ['LP 7', 'toate în HE'], anim: false, spec: 'Coperta fixă: cele patru câmpuri desenate; câmpul punctului se încercuiește.',
    points: [
      { h: 'Conjunctiv lax', d: ['**glanda mamară**: celule, fibre, SF în proporții egale, !!în lobulul mamar!!, printre structurile glandulare'] },
      { h: 'Țesut adipos alb', d: ['**aceeași lamă**: adipocite mari, optic goale; !!inel cu pecete!!'] },
      { h: 'Conjunctiv tendinos', d: ['**tendon**: fascicule de colagen ordonate + !!„nuclei gemeni”!!'] },
      { h: 'Conjunctiv reticular', d: ['!!nodul limfatic!!, zona medulară: celule reticulare stelate + limfocite în ochiuri'] },
    ],
    xtra: 'Din cutie (notițele anilor trecuți): glanda mamară e un fragment rotund, roz pal, „pufos” (aceeași lamă pentru lax și adipos); tendonul, o fâșie cu linii roșii paralele; nodulul limfatic, un fragment mic, compact, magenta intens.',
    photos: [{ img: 'gm_box', cap: 'Glanda mamară', cr: 'notițele „Histologie LP”, anul I' }, { img: 'ten_box', cap: 'Tendon', cr: 'notițele „Histologie LP”, anul I' }, { img: 'ret_box', cap: 'Nodul limfatic', cr: 'notițele „Histologie LP”, anul I' }],
    beatDur: 6,
  },
  {
    scene: 'props', kick: 'LP 7 · Noțiuni de bază', title: 'Aceleași 3 componente, alte proporții = alt țesut',
    hud: ['celule · fibre · SF'], anim: false, spec: 'Patru bare fixe de proporții (celule, fibre, SF) pentru lax, adipos, tendinos, reticular; bara punctului se aprinde.',
    points: [
      { h: 'Lax: proporții egale', d: ['celule ≈ fibre ≈ SF; fibre cu **orientare variabilă**'] },
      { h: 'Adipos alb: predomină celulele', d: ['SF și fibre **reduse cantitativ**'] },
      { h: 'Tendinos: predomină fibrele', d: ['fibre de colagen **ordonate**; celule puține, SF redusă'] },
      { h: 'Reticular: celule + fibre de reticulină', d: ['celule reticulare, fibre de reticulină, SF **redusă**; !!fibrele nu se văd în HE!!'] },
    ],
    why: 'Laxul e un țesut conjunctiv **moale**. Ce le deosebește: ce predomină (celule, fibre, SF) și cum sunt organizate.',
    beatDur: 6,
  },
  {
    scene: 'ospe', kick: 'LP 7 · Formatul OSPE', title: 'Cum se punctează la Histologie: 3 pași, în ordinea asta',
    hud: ['Stația = 7 minute'], anim: false, spec: 'Cronometrul de 7 minute, fix: segmentul punctului se aprinde.',
    points: [
      { h: 'Recunoașterea · primele 30 de secunde', d: ['!!lama (organul) + colorația + țesutul!!'] },
      { h: 'Descrierea', d: ['**ob. mic**: ce predomină și cum e așezat · **ob. mare**: celula (formă, citoplasmă, nucleu) + fibrele'] },
      { h: 'Diagnosticul diferențial', d: ['**o singură lamă**: !!1 asemănare + 3 diferențe!!'] },
    ],
    why: 'Se punctează doar ce spui cu voce tare. Examinatorul tace, tu nu pui întrebări; ce ai scris pe ciornă = 0 puncte. Începe să vorbești devreme: tot ce ai spus rămâne punctat.',
    beatDur: 6,
  },
  // ---------------- LAMA 1 · LAX ----------------
  {
    scene: 'laxRec', kick: 'Lama 1 · Conjunctiv lax · ' + T1, title: 'Laxul e în lobulul mamar, printre structurile glandulare',
    hud: ['Lama 1 din 4', '<b>HE</b> · glanda mamară'], anim: false, spec: 'Câmp fix de glandă mamară (lobul cu acini în conjunctiv lax, conjunctiv dens alături, capilar); zona punctului se încercuiește.',
    points: [
      { h: 'Lobulul mamar', d: ['**structuri glandulare** grupate, în conjunctiv lax'] },
      { h: 'Conjunctivul lax (din lobul)', d: ['celule, fibre și SF în !!proporții aproximativ egale!!: **aici e lama ta**'] },
      { h: 'Conjunctivul dens', d: ['al doilea tip de conjunctiv de pe lamă: îl vezi, dar **nu îl descrii**'] },
      { h: 'Vase sangvine', d: ['**capilare** în conjunctivul lax'] },
    ],
    why: 'La ob. mic vezi două tipuri de țesut conjunctiv: dens și lax. Pe acest preparat se studiază !!doar laxul din lobulul mamar!!.',
    xtra: 'Densul e compact, roz intens, cu fibre groase și puține celule; laxul e palid, „aerisit”. EN: loose areolar connective tissue · LA: textus connectivus laxus.',
    beatDur: 6.5,
  },
  {
    scene: 'laxMare', kick: 'Lama 1 · Ob. mare · ' + T1, title: 'Fibre roz pal cu orientare variabilă + nucleii celulelor',
    hud: ['<b>HE</b> · ob. mare'], anim: false, spec: 'Câmp fix la ob. mare: fibre de colagen în toate direcțiile, fibroblast, fibrocit, limfocit, plasmocit; structura punctului se încercuiește.',
    points: [
      { h: 'Fibrele de colagen', d: ['**palid roz**, izolate sau în fascicule cu !!orientare variabilă!!', 'printre ele: celule conjunctive și substanță fundamentală'] },
      { h: 'Fibroblastul', d: ['nucleu **alungit**, !!hipocrom!!; lângă fasciculele de colagen'] },
      { h: 'Fibrocitul', d: ['nucleu **alungit**, !!hipercrom!!; lângă fasciculele de colagen'] },
      { h: 'Celule migrate din sânge', d: ['ex. **limfocite, plasmocite**'] },
    ],
    why: 'Laxul conține și fibre elastice și de reticulină, dar !!nu sunt vizibile în HE!!. În alte localizări (ex. adventiția) laxul conține și adipocite.',
    beatDur: 6.5,
  },
  {
    scene: 'capillaries', kick: 'Lama 1 · Ob. mare · ' + T1, title: 'Capilarele: longitudinal „în fierăstrău”, transversal 1–2 nuclei',
    hud: ['capilare'], anim: false, spec: 'Capilar longitudinal (sus) și transversal (jos), ficși; structura punctului se încercuiește.',
    points: [
      { h: 'Capilar în secțiune longitudinală', d: ['lumen îngust; nucleii endoteliali **alungiți, hipercromi**, proemină alternativ pe cei doi pereți: !!„dinții unui fierăstrău”!!', 'uneori !!hematii în șir indian!!'] },
      { h: 'Capilar în secțiune transversală', d: ['spațiu mic, rotund, cu !!1, maximum 2 nuclei!! care proemină în lumen'] },
    ],
    xtra: 'Endoteliul e un epiteliu simplu pavimentos; capilarul transversal îl recunoști chiar fără hematii. Conjunctivul lax e bogat în SF, prin care difuzează oxigenul și nutrienții spre glandă.',
    beatDur: 7,
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'lax', b: 'adi', l: 'conjunctiv lax (lama ta)', r: 'adipos alb (lama 2)' }, kick: 'Lama 1 · Diagnostic diferențial', title: 'Lax vs. adipos alb: 1 asemănare, 3 diferențe',
    hud: ['stânga: lax', 'dreapta: adipos alb'], anim: false, spec: 'Două câmpuri fixe față în față; criteriul punctului se încercuiește.',
    points: [
      { h: 'Ce predomină', d: ['lax: celule, fibre și SF în !!proporții egale!!', 'adipos: **predomină celulele**, fibre și SF reduse'] },
      { h: 'Celulele', d: ['lax: fibroblaste și fibrocite cu **nuclei alungiți** + celule migrate', 'adipos: adipocite mari, **optic goale**, nucleu turtit, excentric (!!inel cu pecete!!)'] },
      { h: 'Fibrele', d: ['lax: colagen palid roz, !!orientare variabilă!!', 'adipos: fibre **reduse cantitativ**'] },
    ],
    why: 'Asemănarea: sunt pe **aceeași lamă** (glanda mamară, HE) și ambele sunt țesut conjunctiv.',
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'lax' }, layout: 'script', kick: 'Lama 1 · La OSPE · ' + T1, title: 'Ce spui cu voce tare: conjunctivul lax',
    hud: ['script de 2–3 minute'], anim: false, spec: 'Câmpul desenat, fix, lângă scriptul cronometrat.',
    script: [
      { tm: 'Recunoașterea', at: '0:00–0:30', tx: 'Preparatul este o secțiune prin !!glanda mamară!!, colorată !!hematoxilină-eozină!!, pe care studiez !!țesutul conjunctiv lax!!: un țesut conjunctiv moale în care celulele, fibrele și substanța fundamentală sunt în **proporții aproximativ egale**.' },
      { tm: 'Ob. mic', at: '0:30–1:15', tx: 'Observ **două tipuri de țesut conjunctiv**: un țesut conjunctiv **dens** și un țesut conjunctiv **lax**, în care se găsesc structuri glandulare ce formează **lobulul mamar**; studiez doar conjunctivul lax din lobul.' },
      { tm: 'Ob. mare', at: '1:15–2:00', tx: 'Recunosc **fibroblastele** (nucleu alungit, **hipocrom**) și **fibrocitele** (nucleu alungit, **hipercrom**), în vecinătatea fasciculelor de colagen, și diferite **celule migrate din sânge**. Fibrele de colagen sunt **palid roz**, izolate sau în fascicule cu **orientare variabilă**; fibrele elastice și de reticulină nu se văd în HE. Capilarul longitudinal are nucleii endoteliali **alternativi, ca dinții unui fierăstrău**, uneori cu **hematii în șir indian**; transversal, un spațiu mic, rotund, cu **1, maximum 2 nuclei**.' },
      { tm: 'DD', at: '2:00–2:45', tx: 'Îl diferențiez de !!țesutul adipos alb!! (lama 2). Asemănarea: aceeași lamă, ambele țesut conjunctiv. Diferențe: **ce predomină** (proporții egale vs. celulele), **celulele** (fibroblaste, fibrocite, celule migrate vs. adipocite în inel cu pecete), **fibrele** (colagen cu orientare variabilă vs. fibre reduse cantitativ).' },
      { tm: 'Concluzia', at: '2:45–3:00', tx: 'Deci: **țesut conjunctiv lax, glanda mamară, colorație HE**.' },
    ],
    durs: [11, 9, 23, 15, 5],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'lax', W: 791, H: 556, marks: [
      { x: 390, y: 228, rx: 72, ry: 82, lab: 'lobul mamar' },
      { x: 645, y: 330, rx: 58, ry: 48, lab: 'conjunctiv lax (câmp mărit)', ly: 395 },
      { x: 318, y: 338, rx: 58, ry: 42, lab: 'conjunctiv dens', ly: 395 },
      { x: 502, y: 108, rx: 20, lab: 'vas sangvin', ly: 145 },
    ] },
    kick: 'Lama 1 · Pe lama reală · Ob. mic · HE', title: 'Glanda mamară: ce încercuiești pentru laxul',
    hud: ['poză reală · ob. mic'], anim: false, spec: 'Poza reală a lamei, fixă, cu 4 cercuri aprinse pe rând.',
    points: [
      { h: 'Lobulul mamar', d: ['structuri glandulare (violet)'] },
      { h: 'Conjunctivul lax', d: ['!!în lobul!!, printre structurile glandulare'] },
      { h: 'Conjunctivul dens', d: ['alături de lobul: nu îl descrii'] },
      { h: 'Vas sangvin', d: ['cu **hematii** în lumen'] },
    ],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'lax_mare', W: 880, H: 360, marks: [
      { x: 470, y: 95, rx: 46, lab: 'capilar cu hematii', lx: 440, ly: 158 },
      { x: 290, y: 55, rx: 30, lab: 'capilar transversal', lx: 200, ly: 110 },
      { x: 345, y: 92, rx: 14, lab: 'limfocit', lx: 360, ly: 135 },
      { x: 550, y: 145, rx: 18, ry: 8, rot: 0.4, lab: 'nucleu alungit (fibrocit)', lx: 610, ly: 184 },
      { x: 612, y: 60, rx: 62, lab: 'acin (lobul mamar)', ly: 140 },
      { x: 450, y: 250, rx: 150, ry: 40, rot: -0.1, lab: 'fibre de colagen' },
    ] },
    kick: 'Lama 1 · Pe lama reală · Ob. mare · HE', title: 'La ob. mare: capilare, celule și fibre',
    hud: ['poză reală · ob. mare'], anim: false, spec: 'Poza reală la ob. mare, fixă, cu 6 cercuri aprinse pe rând.',
    points: [
      { h: 'Capilar cu hematii', d: ['secțiune longitudinală: **hematii în șir indian**'] },
      { h: 'Capilar transversal', d: ['spațiu mic, rotund, 1–2 nuclei'] },
      { h: 'Limfocit', d: ['!!celulă migrată!!: nucleu rotund, hipercrom'] },
      { h: 'Nucleu de fibrocit', d: ['!!alungit, hipercrom!!'] },
      { h: 'Structură glandulară', d: ['din lobulul mamar (reper)'] },
      { h: 'Fibre de colagen', d: ['palid roz, !!orientare variabilă!!'] },
    ],
  },
  // ---------------- LAMA 2 · ADIPOS ----------------
  {
    scene: 'adiRec', kick: 'Lama 2 · Adipos alb · ' + T1, title: 'Adipocite mari, optic goale, strâns una lângă alta',
    hud: ['Lama 2 din 4', '<b>HE</b> · glanda mamară'], anim: false, spec: 'Câmp fix de adipocite (fagure) cu lobulul mamar sus; structura punctului se încercuiește.',
    points: [
      { h: 'Celule mari, !!optic goale!!', d: ['ob. mic: țesut **aproape numai din celule**, limite celulare bine vizibile, citoplasmă **incoloră**', 'ob. mare: rotunde, ovalare sau poligonale (grupate), membrana net conturată; o singură vacuolă mare, necolorată în HE'] },
      { h: 'Nucleu turtit, la margine', d: ['!!hipercrom, excentric!!; citoplasma eozinofilă = **inel subțire** → !!inel cu pecete!!'] },
      { h: 'Celule strâns una lângă alta', d: ['izolate sau în cuiburi = **paniculi adipoși**; SF și fibre reduse'] },
      { h: 'Lobulul mamar alături', d: ['reperul: e **aceeași lamă** ca la lax'] },
    ],
    why: 'Vacuola împinge citoplasma și nucleul la periferie; celula pare goală în centru pentru că vacuola nu se colorează în HE.',
    xtra: 'Lipidele (trigliceridele) se dizolvă în alcool și xilen la prelucrare; adipocitul alb are o singură picătură (uniloculat), care turtește nucleul. Grupate, celulele se deformează reciproc → poligonale, ca un fagure. Pe secțiuni la gheață, colorații pentru lipide (Sudan, Szekely) arată grăsimea. EN: white adipose tissue · LA: textus adiposus albus.',
    beatDur: 6.5,
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'adi', b: 'lax', l: 'adipos alb (lama ta)', r: 'conjunctiv lax (lama 1)' }, kick: 'Lama 2 · Diagnostic diferențial', title: 'Adipos alb vs. lax: 1 asemănare, 3 diferențe',
    hud: ['stânga: adipos', 'dreapta: lax'], anim: false, spec: 'Două câmpuri fixe față în față; criteriul punctului se încercuiește.',
    points: [
      { h: 'Ce predomină', d: ['adipos: !!celulele!!, fibre și SF reduse', 'lax: celule, fibre, SF în **proporții egale**'] },
      { h: 'Celulele', d: ['adipos: !!inel cu pecete!! (vacuolă, nucleu turtit, excentric)', 'lax: fibroblaste, fibrocite + celule migrate'] },
      { h: 'Fibrele', d: ['adipos: **reduse cantitativ**', 'lax: colagen palid roz, orientare variabilă'] },
    ],
    why: 'Asemănarea: **aceeași lamă** (glanda mamară, HE), ambele țesut conjunctiv.',
    warn: 'Adipos sau glandă sebacee (LP 4)? Adipocit: **o vacuolă**, nucleu turtit, excentric. Sebacee: citoplasmă vacuolară, nucleu rotund, central (spre canal picnotic), rând de celule bazale.',
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'adi' }, layout: 'script', kick: 'Lama 2 · La OSPE · ' + T1, title: 'Ce spui cu voce tare: țesutul adipos alb',
    hud: ['script de 2–3 minute'], anim: false, spec: 'Câmpul desenat, fix, lângă scriptul cronometrat.',
    script: [
      { tm: 'Recunoașterea', at: '0:00–0:30', tx: 'Preparatul este o secțiune prin !!glanda mamară!!, colorată !!HE!!, pe care studiez !!țesutul conjunctiv adipos alb!!, în care **predomină celulele**, dispuse strâns una lângă cealaltă, iar substanța fundamentală și fibrele sunt reduse cantitativ.' },
      { tm: 'Ob. mic', at: '0:30–1:15', tx: 'Observ un țesut format **aproape în exclusivitate din celule**, adipocite albe mari, cu **limite celulare bine vizibile** și **citoplasmă incoloră**.' },
      { tm: 'Ob. mare', at: '1:15–2:00', tx: 'Adipocitele sunt izolate sau în cuiburi, formând **paniculi adipoși**: celule mari, rotunde, ovalare sau **poligonale** când sunt grupate, cu **membrana net conturată**. O **singură vacuolă mare**, necolorată în HE, ocupă cea mai mare parte a celulei, care pare goală în centru, și împinge citoplasma și nucleul la periferie: citoplasma eozinofilă e un **inel subțire**, nucleul **turtit, hipercrom, excentric**: !!inel cu pecete!!.' },
      { tm: 'DD', at: '2:00–2:45', tx: 'Îl diferențiez de **conjunctivul lax** din aceeași lamă. Asemănarea: aceeași lamă, ambele țesut conjunctiv. Diferențe: **ce predomină** (celulele vs. proporții egale), **celulele** (inel cu pecete vs. fibroblaste, fibrocite, celule migrate), **fibrele** (reduse cantitativ vs. colagen cu orientare variabilă).' },
      { tm: 'Concluzia', at: '2:45–3:00', tx: 'Deci: **țesut conjunctiv adipos alb, glanda mamară, colorație HE**.' },
    ],
    durs: [10, 8, 22, 14, 5],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'adi', W: 791, H: 556, marks: [
      { x: 335, y: 393, rx: 62, ry: 40, lab: 'adipocit (vacuolă goală)', ly: 452 },
      { x: 555, y: 223, rx: 16, ry: 8, lab: 'nucleu turtit (pecetea)', ly: 252 },
      { x: 545, y: 418, rx: 16, lab: 'spațiu îngust între celule', lx: 600, ly: 452 },
      { x: 520, y: 60, rx: 220, ry: 55, lab: 'lobul mamar', ly: 128 },
    ] },
    kick: 'Lama 2 · Pe lama reală · Ob. mic · HE', title: 'Adiposul pe lamă: ce încercuiești',
    hud: ['poză reală · ob. mic'], anim: false, spec: 'Poza reală a lamei, fixă, cu 4 cercuri aprinse pe rând.',
    points: [
      { h: 'Adipocit', d: ['celulă mare, !!optic goală!!'] },
      { h: 'Nucleu turtit, la margine', d: ['!!pecetea!! din „inel cu pecete”'] },
      { h: 'Celule strâns una lângă alta', d: ['fibre și SF reduse'] },
      { h: 'Lobulul mamar', d: ['reper: aceeași lamă ca laxul'] },
    ],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'adi_mare', W: 940, H: 372, marks: [
      { x: 250, y: 265, rx: 105, ry: 100, lab: 'o vacuolă mare' },
      { x: 90, y: 90, rx: 12, ry: 30, lab: 'nucleu turtit, lipit de membrană', lx: 190, ly: 60 },
      { x: 450, y: 112, rx: 92, ry: 14, rot: 0.08, lab: 'citoplasma = inel subțire', ly: 150 },
      { x: 330, y: 165, rx: 18, lab: 'spațiu intercelular', lx: 400, ly: 200 },
    ] },
    kick: 'Lama 2 · Pe lama reală · Ob. mare · HE', title: 'Inelul cu pecete, pe micrografie',
    hud: ['poză reală · ob. mare'], anim: false, spec: 'Poza reală la ob. mare, fixă, cu 4 cercuri aprinse pe rând.',
    points: [
      { h: 'O singură vacuolă mare', d: ['necolorată în HE: celula pare goală'] },
      { h: 'Nucleul', d: ['!!turtit, hipercrom, excentric!!'] },
      { h: 'Citoplasma', d: ['eozinofilă, un !!inel subțire!! în jurul vacuolei'] },
      { h: 'Membrana', d: ['**net conturată**; celulele strâns una lângă alta'] },
    ],
  },
  // ---------------- LAMA 3 · TENDINOS ----------------
  {
    scene: 'tenRec', kick: 'Lama 3 · Conjunctiv tendinos · ' + T3, title: 'Fascicule paralele de colagen și șiruri de nuclei',
    hud: ['Lama 3 din 4', '<b>HE</b> · tendon'], anim: false, spec: 'Câmp fix de tendon (fascicule oblice paralele, tenocite în șiruri); structura punctului se încercuiește.',
    points: [
      { h: 'Fascicule de colagen', d: ['!!groase, palid eozinofile, ordonate!!; pe secțiune longitudinală, ușor ondulate, în fascicule dense, paralele', 'predomină fibrele; celule puține, SF redusă'] },
      { h: 'Tenocitele (fibrocite)', d: ['puține, între fascicule și fibre: **alungite, dreptunghiulare**; limite și citoplasmă **slab vizibile** (lipite de fibre)', 'nucleu !!ovalar, hipercrom!!'] },
      { h: '!!„Nucleii gemeni”!!', d: ['nuclei așezați deseori **„cap la cap”**: aspect caracteristic țesutului tendinos'] },
      { h: 'Fante albe între fascicule', d: ['nu apar în descrierea din LP: **nu le descrii**'] },
    ],
    xtra: 'Fantele albe apar pentru că fasciculele se desprind la prelucrare (artefact). Fibrele paralele transmit forța mușchiului la os într-o singură direcție; tendonul are puține celule și vase, deci se vindecă greu. Pe secțiune transversală (manual) fasciculele sunt poligonale. EN: dense regular connective tissue · LA: textus connectivus densus regularis; tendo.',
    beatDur: 6.5,
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'ten', b: 'lax', l: 'tendinos (lama ta)', r: 'conjunctiv lax (lama 1)' }, kick: 'Lama 3 · Diagnostic diferențial', title: 'Tendinos vs. lax: 1 asemănare, 3 diferențe',
    hud: ['stânga: tendon', 'dreapta: lax'], anim: false, spec: 'Două câmpuri fixe față în față; criteriul punctului se încercuiește.',
    points: [
      { h: 'Fibrele', d: ['tendon: !!groase, în fascicule dense, paralele, ordonate!!', 'lax: izolate sau în fascicule cu **orientare variabilă**'] },
      { h: 'Celulele', d: ['tendon: !!puține tenocite!!, nuclei cap la cap: **„nuclei gemeni”**', 'lax: fibroblaste, fibrocite + celule migrate'] },
      { h: 'SF și vasele', d: ['tendon: **SF redusă**', 'lax: SF în proporție egală cu celulele și fibrele; **capilare**'] },
    ],
    why: 'Asemănarea: ambele sunt țesut conjunctiv în HE, cu **fibre de colagen palid roz** printre care stau celule cu **nuclei alungiți**.',
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'ten' }, layout: 'script', kick: 'Lama 3 · La OSPE · ' + T3, title: 'Ce spui cu voce tare: conjunctivul tendinos',
    hud: ['script de 2–3 minute'], anim: false, spec: 'Câmpul desenat, fix, lângă scriptul cronometrat.',
    script: [
      { tm: 'Recunoașterea', at: '0:00–0:30', tx: 'Preparatul este o secțiune prin !!tendon!!, colorată !!HE!!, și reprezintă !!țesutul conjunctiv tendinos!!, în care **predomină fibrele de colagen, dispuse ordonat**, cu celule puține și substanță fundamentală redusă.' },
      { tm: 'Ob. mic', at: '0:30–1:15', tx: 'Observ un țesut format **preponderent din fibre de colagen**, organizate în **fascicule ordonate**, printre care se găsesc celule conjunctive numite **tenocite**.' },
      { tm: 'Ob. mare', at: '1:15–2:00', tx: 'Fibrele sunt **groase, palid eozinofile**, ordonate; pe secțiune longitudinală au un traiect **ușor ondulat** și formează **fascicule dense, paralele**. Între fascicule și între fibre, **puține tenocite**: celule alungite, dreptunghiulare, cu limite și citoplasmă **slab vizibile**, lipite de fibre, și nucleu **ovalar, hipercrom**. Nucleii sunt deseori **„cap la cap”**: !!„nuclei gemeni”!!, aspect caracteristic țesutului tendinos.' },
      { tm: 'DD', at: '2:00–2:45', tx: 'Îl diferențiez de **conjunctivul lax** (lama 1). Asemănarea: țesut conjunctiv în HE, colagen palid roz, celule cu nuclei alungiți. Diferențe: **fibrele** (dense, paralele vs. orientare variabilă), **celulele** (puține tenocite cu nuclei gemeni vs. fibroblaste, fibrocite, celule migrate), **SF** (redusă vs. în proporție egală, cu capilare).' },
      { tm: 'Concluzia', at: '2:45–3:00', tx: 'Deci: **țesut conjunctiv tendinos, tendon, colorație HE**.' },
    ],
    durs: [10, 8, 21, 15, 5],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'ten', W: 791, H: 556, marks: [
      { x: 450, y: 305, rx: 150, ry: 28, rot: 0.47, lab: 'fascicul de colagen', ly: 372 },
      { x: 640, y: 135, rx: 42, ry: 12, rot: 0.47, lab: 'nuclei de tenocite', ly: 172 },
      { x: 250, y: 215, rx: 72, ry: 12, rot: 0.5, lab: 'fantă albă (artefact)', ly: 255 },
    ] },
    kick: 'Lama 3 · Pe lama reală · Ob. mic · HE', title: 'Tendonul pe lamă: ce încercuiești',
    hud: ['poză reală · ob. mic'], anim: false, spec: 'Poza reală a lamei, fixă, cu 3 cercuri aprinse pe rând.',
    points: [
      { h: 'Fascicul de colagen', d: ['fascicule !!ordonate!!, paralele'] },
      { h: 'Nuclei de tenocite', d: ['!!printre fibre!!, puțini'] },
      { h: 'Fantă albă', d: ['nu apare în descrierea din LP: **nu o descrii**'] },
    ],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'ten_mare', W: 550, H: 305, marks: [
      { x: 282, y: 86, rx: 40, ry: 13, rot: 0.45, lab: '„nuclei gemeni”', ly: 125 },
      { x: 282, y: 204, rx: 40, ry: 13, rot: 0.5, lab: '„nuclei gemeni”', ly: 243 },
      { x: 472, y: 212, rx: 38, ry: 12, rot: 0.45, lab: 'tenocit: citoplasmă slab vizibilă', ly: 250 },
      { x: 300, y: 150, rx: 150, ry: 24, rot: 0.47, dash: true, lab: 'fascicul paralel', lx: 150, ly: 160 },
    ] },
    kick: 'Lama 3 · Pe lama reală · Ob. mare · HE', title: 'La ob. mare: nucleii „cap la cap”',
    hud: ['poză reală · ob. mare'], anim: false, spec: 'Poza reală la ob. mare, fixă, cu 4 cercuri aprinse pe rând.',
    points: [
      { h: '!!Nuclei gemeni!!', d: ['doi nuclei !!ovalari, hipercromi!!, cap la cap'] },
      { h: 'Nuclei gemeni', d: ['aceeași imagine pe alt rând de tenocite'] },
      { h: 'Tenocitul', d: ['citoplasma lui e **slab vizibilă**: celula e lipită de fibre'] },
      { h: 'Fascicul de colagen', d: ['**palid eozinofil**, paralel cu ceilalți'] },
    ],
  },
  // ---------------- LAMA 4 · RETICULAR ----------------
  {
    scene: 'retRec', kick: 'Lama 4 · Conjunctiv reticular · ' + T4, title: 'Ochiuri clare, celule stelate palide, limfocite închise',
    hud: ['Lama 4 din 4', '<b>HE</b> · nodul limfatic'], anim: false, spec: 'Câmp fix de medulară (celule reticulare stelate, limfocite, zone dense); structura punctului se încercuiește.',
    points: [
      { h: 'Rețeaua', d: ['ob. mic: caută !!zona medulară, profundă!!: limfocitele sunt mai rare, se vede rețeaua'] },
      { h: 'Celula reticulară', d: ['!!stelată!!, citoplasmă **eozinofilă**, nucleu !!mare, rotund, hipocrom!!', 'prelungiri lungi, puțin numeroase, care **se anastomozează** → **pseudorețea** ce dublează rețeaua de fibre'] },
      { h: 'Limfocitul', d: ['mic, nucleu **rotund, hipercrom**; citoplasmă redusă, **în semilună**', 'stă **în ochiurile rețelei**, care formează stroma nodulului limfatic'] },
      { h: 'Zone dense de limfocite', d: ['aici rețeaua nu se vede: nu aici te uiți'] },
    ],
    why: 'Țesutul reticular = celule reticulare + fibre de reticulină + SF (în cantitate redusă). !!Fibrele de reticulină nu se observă în HE.!!',
    xtra: 'Zonele dense sunt cordoanele medulare; ochiurile clare sunt sinusurile medulare, străbătute de celule reticulare. Același țesut formează stroma și în splină și în măduva hematogenă. EN: reticular connective tissue · LA: textus connectivus reticularis; nodus lymphoideus.',
    beatDur: 7,
  },
  {
    scene: 'retWhy', kick: 'Lama 4 · De ce în medulară? · ' + T4, title: 'Rețeaua se vede doar unde limfocitele sunt rare',
    hud: ['limfocite dese vs. rare'], anim: false, spec: 'Două câmpuri fixe: stânga limfocite dese (rețeaua ascunsă), dreapta medulara cu rețeaua vizibilă; pe punctul 3 se aprind prelungirile anastomozate.',
    points: [
      { h: 'Unde limfocitele sunt dese', d: ['ele !!ascund rețeaua!!'] },
      { h: 'Zona medulară, profundă', d: ['limfocite mai rare: aici vezi !!rețeaua de celule reticulare!!'] },
      { h: 'Pseudorețeaua', d: ['prelungirile celulelor reticulare se anastomozează și **dublează rețeaua de fibre de reticulină**, care nu se vede în HE'] },
    ],
    xtra: 'Spre periferie (corticala, cu foliculi limfoizi) limfocitele sunt compacte; în medulară sunt mai rare. Celulele reticulare produc fibrele de reticulină și se așază de-a lungul lor; limfocitele circulă prin ochiuri.',
    beatDur: 7,
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'retHE', b: 'retAg', l: 'reticular · HE (lama ta)', r: 'fibre de reticulină · argentic (LP 6, lama 3)' }, kick: 'Lama 4 · Diagnostic diferențial', title: 'Reticular (HE) vs. fibrele de reticulină (argentic): 1 asemănare, 3 diferențe',
    hud: ['stânga: HE', 'dreapta: argentic'], anim: false, spec: 'Două câmpuri fixe față în față (HE, argentic); criteriul punctului se încercuiește.',
    points: [
      { h: 'Colorația', d: ['reticular: !!HE!!', 'LP 6: **impregnație argentică**, fibre negre'] },
      { h: 'Ce vezi din rețea', d: ['reticular: !!celulele reticulare!! stelate, nucleu hipocrom; **fibrele nu se văd**', 'LP 6: **fibrele negre**, ramificate, anastomozate'] },
      { h: 'Organul și ochiurile', d: ['reticular: !!nodul limfatic!! (medulara), **limfocite** în ochiuri', 'LP 6: **rinichi**, tubi renali în ochiuri'] },
    ],
    why: 'Asemănarea: ambele au la bază **rețeaua de fibre de reticulină**, cu ochiuri în care stau alte structuri (în HE fibrele nu se văd, dar pseudorețeaua celulelor reticulare o dublează).',
    warn: '„Văd fibrele de reticulină” la HE = greșit. La reticularul HE vezi **celulele reticulare**; fibrele negre = LP 6 (argentic).',
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'ret' }, layout: 'script', kick: 'Lama 4 · La OSPE · ' + T4, title: 'Ce spui cu voce tare: conjunctivul reticular',
    hud: ['script de 2–3 minute'], anim: false, spec: 'Câmpul desenat, fix, lângă scriptul cronometrat.',
    script: [
      { tm: 'Recunoașterea', at: '0:00–0:30', tx: 'Preparatul este o secțiune prin !!nodulul limfatic!!, colorată !!HE!!, pe care studiez !!țesutul conjunctiv reticular!!, alcătuit din **celule reticulare, fibre de reticulină și substanță fundamentală** în cantitate redusă.' },
      { tm: 'Ob. mic', at: '0:30–1:15', tx: 'Caut **zona medulară, profundă**, a nodulului limfatic, unde limfocitele sunt mai rare și se vede țesutul reticular, cu **aspect de rețea**.' },
      { tm: 'Ob. mare', at: '1:15–2:00', tx: 'Celulele reticulare sunt **stelate**, cu citoplasmă **eozinofilă** și nucleu **mare, rotund, hipocrom**. Prelungirile lor, lungi și puțin numeroase, **se anastomozează** cu ale celulelor vecine și formează o **pseudorețea**, care dublează rețeaua de fibre de reticulină. !!Fibrele nu se observă în HE.!! În ochiurile rețelei, care formează stroma nodulului limfatic, recunosc **limfocitele**: celule mici, nucleu rotund, hipercrom, citoplasmă redusă, în semilună.' },
      { tm: 'DD', at: '2:00–2:45', tx: 'Îl diferențiez de **fibrele de reticulină în impregnație argentică** (LP 6, lama 3). Asemănarea: aceeași rețea de fibre de reticulină, cu ochiuri. Diferențe: **colorația** (HE vs. argentic, fibre negre), **ce vezi** (celulele reticulare vs. fibrele negre), **organul și ochiurile** (nodul limfatic cu limfocite vs. rinichi cu tubi).' },
      { tm: 'Concluzia', at: '2:45–3:00', tx: 'Deci: **țesut conjunctiv reticular, nodul limfatic, colorație HE**.' },
    ],
    durs: [11, 7, 23, 15, 5],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'ret', W: 791, H: 556, marks: [
      { x: 372, y: 214, rx: 56, ry: 46, lab: 'ochi clar (rețea)', ly: 278 },
      { x: 702, y: 403, rx: 22, lab: 'celulă reticulară', lx: 700, ly: 445 },
      { x: 633, y: 485, rx: 14, lab: 'limfocit', lx: 650, ly: 520 },
      { x: 262, y: 440, rx: 72, ry: 56, lab: 'cordon dens de limfocite', ly: 515 },
    ] },
    kick: 'Lama 4 · Pe lama reală · HE', title: 'Nodulul limfatic pe lamă: ce încercuiești',
    hud: ['poză reală · ob. mic + câmp mărit'], anim: false, spec: 'Poza reală a lamei, fixă, cu 4 cercuri aprinse pe rând.',
    points: [
      { h: 'Ochi clar', d: ['aici se vede !!rețeaua!! (medulara)'] },
      { h: 'Celulă reticulară', d: ['nucleu !!mare, rotund, hipocrom!!; citoplasmă eozinofilă (câmpul mărit, dreapta jos)'] },
      { h: 'Limfocit', d: ['nucleu **mic, rotund, hipercrom**'] },
      { h: 'Zonă densă de limfocite', d: ['ascunde rețeaua: **nu aici**'] },
    ],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'ret_mare', W: 600, H: 445, marks: [
      { x: 88, y: 158, rx: 28, lab: 'celulă reticulară', lx: 82, ly: 108, bx: -48, by: 46 },
      { x: 135, y: 166, rx: 25, ry: 8, rot: -0.08, lab: 'prelungire (anastomozată)', lx: 140, ly: 205 },
      { x: 175, y: 175, rx: 13, lab: 'limfocit în ochi', lx: 230, ly: 160 },
      { x: 440, y: 170, rx: 45, ry: 35, lab: 'ochi clar', ly: 220 },
      { x: 330, y: 280, rx: 120, ry: 70, lab: 'cordon dens', ly: 365 },
    ] },
    kick: 'Lama 4 · Pe lama reală · Ob. mare · HE', title: 'La ob. mare: celulele reticulare și limfocitele',
    hud: ['poză reală · ob. mare'], anim: false, spec: 'Poza reală la ob. mare, fixă, cu 5 cercuri aprinse pe rând.',
    points: [
      { h: 'Celulă reticulară', d: ['!!stelată!!, citoplasmă eozinofilă'] },
      { h: 'Prelungiri anastomozate', d: ['cu ale celulelor vecine → !!pseudorețea!!'] },
      { h: 'Limfocit', d: ['**mic**, nucleu hipercrom, în ochiul rețelei'] },
      { h: 'Ochi clar', d: ['spațiul dintre prelungiri'] },
      { h: 'Zonă densă', d: ['limfocite îngrămădite'] },
    ],
  },
  {
    scene: 'recap', kick: 'LP 7 · Recapitulare + capcane', title: 'Ce reții din fiecare lamă',
    hud: ['cele 4 lame'], anim: false, spec: 'Cele 4 câmpuri desenate, fixe; rândul curent se încercuiește.',
    table: {
      head: ['Lama', 'Ob. mic', 'Ob. mare', 'DD'],
      rows: [
        ['Lax · **HE** · glanda mamară', 'dens + lax cu **lobul mamar**', 'colagen palid roz, !!orientare variabilă!!; fibroblaste/fibrocite; capilare („fierăstrău”)', 'adipos alb (lama 2)'],
        ['Adipos alb · **HE** · glanda mamară', 'aproape numai **celule mari, optic goale**', 'o vacuolă; !!inel cu pecete!!; paniculi', 'lax (lama 1)'],
        ['Tendinos · **HE** · tendon', '**fascicule ordonate** + tenocite', 'fibre groase, paralele; !!nuclei gemeni!!', 'lax (lama 1)'],
        ['Reticular · **HE** · nodul limfatic', 'medulara: **rețea**, limfocite rare', 'celule reticulare stelate (nucleu hipocrom) + limfocite; !!fibrele nu se văd!!', 'fibre de reticulină (LP 6)'],
      ],
    },
    warn: 'Aceeași lamă, două diagnostice: glanda mamară HE e lama pentru **lax** și pentru **adipos**. Citește sarcina: ți se cere conjunctivul din lobul sau adiposul?',
    beatDur: 6,
  },
];

// Poza reală, încercuită, pentru fiecare punct (colțul stânga-jos al animației)
const P = (img, cap) => ({ img, cap });
const INS = {
  laxRec: [P('z_lax_0', 'Lobulul mamar pe lamă'), P('z_lax_1', 'Laxul din lobul pe lamă'), P('z_lax_2', 'Conjunctivul dens pe lamă'), P('z_lax_3', 'Vas sangvin pe lamă')],
  laxMare: [P('z_lax_mare_5', 'Fibre de colagen pe lamă'), P('c_fibroblast', 'Fibroblast pe lamă (din LP 6)'), P('z_lax_mare_3', 'Fibrocit pe lamă'), P('z_lax_mare_2', 'Limfocit pe lamă')],
  capillaries: [P('z_lax_mare_0', 'Capilar cu hematii pe lamă'), P('z_lax_mare_1', 'Capilar transversal pe lamă')],
  adiRec: [P('z_adi_0', 'Adipocit pe lamă'), P('z_adi_mare_1', 'Nucleu turtit pe lamă'), P('z_adi_mare_3', 'Celule strâns una lângă alta pe lamă'), P('z_adi_3', 'Lobulul mamar alături')],
  adiWhy: [P('z_adi_mare_0', 'Vacuola goală pe lamă'), P('z_adi_mare_1', 'Nucleul împins la margine'), P('adi', 'Fagurele pe lamă · HE'), P('adi', 'Lama din LP: HE, lipide dizolvate')],
  tenRec: [P('z_ten_0', 'Fascicul de colagen pe lamă'), P('z_ten_mare_2', 'Nuclei de tenocite pe lamă'), P('z_ten_mare_0', '„Nuclei gemeni” pe lamă'), P('z_ten_2', 'Fantă albă pe lamă (nu o descrii)')],
  tenWhy: [P('ten', 'Fibre paralele pe lamă · HE'), P('ten_mare', 'Puține celule pe lamă · ob. mare'), P('z_ten_mare_1', 'Nuclei striviți, cap la cap'), null],
  retRec: [P('z_ret_mare_3', 'Ochi clar pe lamă'), P('z_ret_mare_0', 'Celulă reticulară pe lamă'), P('z_ret_mare_2', 'Limfocit pe lamă'), P('z_ret_3', 'Zonă densă de limfocite pe lamă')],
  retWhy: [P('z_ret_3', 'Limfocite dese: stroma ascunsă'), P('z_ret_0', 'Limfocite rare: rețeaua se vede'), P('z_ret_mare_1', 'Prelungire de celulă reticulară')],
};
SLIDES.forEach((s) => { if (INS[s.scene]) s.insets = INS[s.scene]; });
