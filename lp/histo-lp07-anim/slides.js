// Conținutul slide-urilor LP 7: textul vine din deck-ul Histo LP 7 (îndrumătorul UMFST + prezentarea LP 7).
// Ce e marcat „(manual)” nu apare în îndrumător.

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
    hud: ['LP 7', 'toate în HE'],
    points: [
      { h: 'Conjunctiv lax', d: ['**glanda mamară**: țesut roz pal, „aerisit”, !!în jurul lobulului mamar!!'] },
      { h: 'Țesut adipos alb', d: ['**aceeași lamă**: fagure de celule mari, goale; !!inel cu pecete!!'] },
      { h: 'Conjunctiv tendinos', d: ['**tendon**: benzi roz paralele + !!„nuclei gemeni”!!'] },
      { h: 'Conjunctiv reticular', d: ['!!nodul limfatic!!, medulara: celule stelate palide + limfocite în ochiuri'] },
    ],
    why: 'Din cutie: glanda mamară e un fragment rotund, roz pal, „pufos” (aceeași lamă pentru lax și adipos); tendonul, o fâșie cu linii roșii paralele; nodulul limfatic, un fragment mic, compact, magenta intens.',
    photos: [{ img: 'gm_box', cap: 'Glanda mamară', cr: 'notițele „Histologie LP”, anul I' }, { img: 'ten_box', cap: 'Tendon', cr: 'notițele „Histologie LP”, anul I' }, { img: 'ret_box', cap: 'Nodul limfatic', cr: 'notițele „Histologie LP”, anul I' }],
    beatDur: 6,
  },
  {
    scene: 'props', kick: 'LP 7 · Noțiuni de bază', title: 'Aceleași 3 componente, alte proporții = alt țesut',
    hud: ['celule · fibre · SF'],
    points: [
      { h: 'Lax: proporții egale', d: ['celule ≈ fibre ≈ SF; fibre cu **orientare variabilă**'] },
      { h: 'Adipos alb: predomină celulele', d: ['fibre rare, printre celule'] },
      { h: 'Tendinos: predomină fibrele', d: ['fibre **paralele, ordonate**'] },
      { h: 'Reticular: predomină celulele', d: ['rețea; !!fibrele nu se văd în HE!! (le vezi argentic, LP 6, lama 3)'] },
    ],
    why: 'Toate sunt țesuturi conjunctive **moi**: SF are consistență redusă (spre deosebire de cartilaj și os, LP 8). Regula de DD din LP: ce !!PREDOMINĂ!! (celule, fibre, SF) + !!CUM!! sunt organizate.',
    beatDur: 6,
  },
  {
    scene: 'ospe', kick: 'LP 7 · Formatul OSPE', title: 'Cum se punctează la Histologie: 3 pași, în ordinea asta',
    hud: ['Stația = 7 minute'],
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
    scene: 'laxRec', kick: 'Lama 1 · Conjunctiv lax · ' + T1, title: 'Lobuli glandulari înconjurați de un țesut roz pal, „aerisit”',
    hud: ['Lama 1 din 4', '<b>HE</b> · glanda mamară'],
    points: [
      { h: 'Lobulul mamar', d: ['structuri glandulare (violet) **grupate**'] },
      { h: 'Conjunctivul lax (din lobul)', d: ['palid, aerisit, cu celule și capilare: **aici e lama ta**'] },
      { h: 'Conjunctivul dens (între lobuli)', d: ['benzi roz intens, compacte; **fibre groase, puține celule**'] },
      { h: 'Vase sangvine', d: ['țesutul e !!bine vascularizat!!'] },
    ],
    why: 'Pe aceeași lamă ai două conjunctive: dens și lax. Se studiază !!doar laxul din lobulul mamar!!; densul e reperul cu care îl compari. EN: loose areolar connective tissue · LA: textus connectivus laxus.',
    beatDur: 6.5,
  },
  {
    scene: 'laxMare', kick: 'Lama 1 · Ob. mare · ' + T1, title: 'Fibre roz pal în toate direcțiile + nucleii celulelor',
    hud: ['<b>HE</b> · ob. mare'],
    points: [
      { h: 'Fibrele de colagen', d: ['**palid roz**, izolate sau în fascicule', '!!orientare variabilă!!'] },
      { h: 'Fibroblastul', d: ['nucleu alungit, în bastonaș, !!hipocrom!!, nucleol vizibil = celulă activă'] },
      { h: 'Fibrocitul', d: ['nucleu alungit, subțire, în bastonaș, !!hipercrom!! = celulă în repaus; lângă fascicule'] },
      { h: 'Celule migrate din sânge', d: ['**limfocite, plasmocite**'] },
    ],
    why: 'Fibrele elastice și de reticulină există și aici, dar **nu se văd în HE**. Lângă fibre stau fibroblastele/fibrocitele, care le fabrică. **Schema din îndrumător:** 1 fibre colagene · 2 fibrocit · 3 fibroblast · 4 plasmocit · 5 adipocit · 6 limfocit · 7–8 capilare (longitudinal, transversal).',
    beatDur: 6.5,
  },
  {
    scene: 'capillaries', kick: 'Lama 1 · Ob. mare · ' + T1, title: 'Capilarele: semnul unui țesut bine vascularizat',
    hud: ['capilare · SF'],
    points: [
      { h: 'Capilar longitudinal', d: ['lumen îngust, nuclei endoteliali **alternativi** pe pereți: !!„dinții unui fierăstrău”!!', 'uneori !!hematii în șir indian!!'] },
      { h: 'Capilar transversal', d: ['spațiu mic, rotund, cu !!1, maximum 2 nuclei!! care proemină în lumen', 'îl recunoști chiar fără hematii'] },
      { h: 'Multă substanță fundamentală', d: ['apă legată de **proteoglicani**; se pierde parțial la prelucrare → **aspect lax**', 'prin ea difuzează oxigenul și nutrienții spre glandă și migrează celulele de apărare'] },
      { h: 'Sub epitelii: conjunctiv lax', d: ['**corion**, cu vase și nervi'] },
    ],
    why: 'Endoteliul = epiteliu simplu pavimentos: nucleii turtiți proemină în lumen. Capilarul cu nucleii „în dinți de fierăstrău” e detaliul care arată că ai citit LP-ul.',
    beatDur: 7,
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'lax', b: 'adi', l: 'conjunctiv lax (lama ta)', r: 'adipos alb (lama 2)' }, kick: 'Lama 1 · Diagnostic diferențial', title: 'Lax vs. adipos alb: 1 asemănare, 3 diferențe',
    hud: ['stânga: lax', 'dreapta: adipos alb'],
    points: [
      { h: 'Ce predomină', d: ['lax: celule, fibre și SF în !!proporții egale!!', 'adipos: **aproape numai adipocite**'] },
      { h: 'Celulele', d: ['lax: fibroblaste și fibrocite cu !!nuclei în bastonaș!! + celule migrate', 'adipos: adipocite mari, **optic goale**, nucleu turtit la periferie (**inel cu pecete**)'] },
      { h: 'Fibrele', d: ['lax: colagen palid roz, !!orientare variabilă!!', 'adipos: doar **rare fibre de reticulină**, invizibile în HE'] },
    ],
    why: 'Asemănarea: sunt pe **aceeași lamă** (glanda mamară, HE) și ambele sunt țesut conjunctiv.',
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'lax' }, layout: 'script', kick: 'Lama 1 · La OSPE · ' + T1, title: 'Ce spui cu voce tare: conjunctivul lax',
    hud: ['script de 2–3 minute'],
    script: [
      { tm: 'Recunoașterea', at: '0:00–0:30', tx: 'Preparatul este o secțiune prin !!glanda mamară!!, colorată !!hematoxilină-eozină!!, pe care studiez !!țesutul conjunctiv lax!!: un țesut conjunctiv moale în care celulele, fibrele și SF sunt în **proporții aproximativ egale**. Îl recunosc după țesutul roz pal, „aerisit”, care înconjoară structurile glandulare ale lobulului, cu fibre subțiri, celule răzlețe și capilare.' },
      { tm: 'Ob. mic', at: '0:30–1:15', tx: 'Observ **două tipuri de țesut conjunctiv**: un țesut conjunctiv **dens** și un țesut conjunctiv **lax**, în care se găsesc structuri glandulare ce formează **lobulul mamar**; studiez conjunctivul lax din lobul.' },
      { tm: 'Ob. mare', at: '1:15–2:00', tx: 'Fibrele de colagen sunt **palid roz**, izolate sau în fascicule cu **orientare variabilă**. Fibroblastele și fibrocitele au nuclei **alungiți, în bastonaș**, **hipocromi**, respectiv **hipercromi**. Văd celule migrate: **limfocite, plasmocite**. Capilarul longitudinal are nucleii endoteliali **alternativi, ca dinții unui fierăstrău**, uneori cu **hematii în șir indian**; transversal, un spațiu mic, rotund, cu **1, maximum 2 nuclei**. Fibrele elastice și de reticulină nu se văd în HE.' },
      { tm: 'DD', at: '2:00–2:45', tx: 'Îl diferențiez de !!țesutul adipos alb!! (lama 2). Asemănarea: aceeași lamă, ambele țesut conjunctiv. Diferențe: **ce predomină** (proporții egale vs. aproape numai adipocite), **celulele** (fibroblaste, fibrocite, celule migrate vs. adipocite în inel cu pecete), **fibrele** (colagen cu orientare variabilă vs. rare fibre de reticulină).' },
      { tm: 'Concluzia', at: '2:45–3:00', tx: 'Deci: **țesut conjunctiv lax, glanda mamară, colorație HE**.' },
    ],
    durs: [12, 9, 22, 15, 5],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'lax', W: 791, H: 556, marks: [
      { x: 390, y: 228, rx: 72, ry: 82, lab: 'lobul mamar' },
      { x: 645, y: 330, rx: 58, ry: 48, lab: 'conjunctiv lax (câmp mărit)', ly: 395 },
      { x: 318, y: 338, rx: 58, ry: 42, lab: 'conjunctiv dens', ly: 395 },
      { x: 502, y: 108, rx: 20, lab: 'vas sangvin', ly: 145 },
    ] },
    kick: 'Lama 1 · Pe lama reală · Ob. mic · HE', title: 'Glanda mamară: ce încercuiești pentru laxul',
    hud: ['poză reală · ob. mic'],
    points: [
      { h: 'Lobulul mamar', d: ['grup de **acini** (violet)'] },
      { h: 'Conjunctivul lax', d: ['!!printre acini!!, în lobul: palid, aerisit'] },
      { h: 'Conjunctivul dens', d: ['!!între lobuli!!: benzi roz intens'] },
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
    kick: 'Lama 1 · Pe lama reală · Ob. mare · HE', title: 'La ob. mare: capilare, celule și fibre printre acini',
    hud: ['poză reală · ob. mare'],
    points: [
      { h: 'Capilar cu hematii', d: ['vas mic, **hematii roșii** în lumen'] },
      { h: 'Capilar transversal', d: ['spațiu mic, rotund'] },
      { h: 'Limfocit', d: ['!!celulă migrată!!: nucleu rotund, hipercrom'] },
      { h: 'Nucleu alungit', d: ['fibroblast/fibrocit: nucleu !!în bastonaș!!'] },
      { h: 'Acin', d: ['structura glandulară din lobul (reper)'] },
      { h: 'Fibre de colagen', d: ['palid roz, !!orientare variabilă!!'] },
    ],
  },
  // ---------------- LAMA 2 · ADIPOS ----------------
  {
    scene: 'adiRec', kick: 'Lama 2 · Adipos alb · ' + T1, title: 'Un fagure de celule mari și goale',
    hud: ['Lama 2 din 4', '<b>HE</b> · glanda mamară'],
    points: [
      { h: 'Celule mari, !!optic goale!!', d: ['vacuola lipidică **s-a dizolvat**; țesut **aproape numai din celule**', 'ob. mic: limite celulare bine vizibile, citoplasmă **incoloră**'] },
      { h: 'Nucleu turtit, la margine', d: ['!!hipercrom, excentric!! → !!inel cu pecete!!', 'citoplasma = **inel subțire**; membrana net conturată'] },
      { h: 'Spații intercelulare foarte înguste', d: ['!!rare fibre de reticulină!! și **numeroase capilare**'] },
      { h: 'Lobulul mamar alături', d: ['reperul: e **aceeași lamă** ca la lax'] },
    ],
    why: 'Celule rotunde/ovalare sau **poligonale** când sunt grupate; izolate sau în cuiburi → **paniculi adipoși**. EN: white adipose tissue · LA: textus adiposus albus. **Schema:** 1 celule adipoase · 2 capilare; nucleul lipit de margine, nu în centru.',
    beatDur: 6.5,
  },
  {
    scene: 'adiWhy', kick: 'Lama 2 · De ce arată așa? · ' + T1, title: 'Celula e „goală” pentru că grăsimea s-a dizolvat',
    hud: ['de la corp la lamă'],
    points: [
      { h: 'Trigliceridele sunt extrase la prelucrare', d: ['!!alcoolul și xilenul!! dizolvă lipidele → rămâne o **vacuolă goală**'] },
      { h: 'Adipocitul alb e !!uniloculat!!', d: ['o picătură uriașă **comprimă nucleul spre margine**'] },
      { h: 'Grupate → poligonale', d: ['presiunea reciprocă le deformează, ca spuma → **fagure**'] },
      { h: 'Vrei să vezi grăsimea?', d: ['**secțiuni la gheață** (fără solvenți) + colorații pentru lipide (!!Sudan, Szekely!!)', 'Szekely: LP 4, glanda sebacee'] },
    ],
    why: 'Rolurile adipocitului alb: depozit de energie, izolare termică, amortizare mecanică. Golul nu e o greșeală: e locul lipidelor.',
    beatDur: 7,
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'adi', b: 'lax', l: 'adipos alb (lama ta)', r: 'conjunctiv lax (lama 1)' }, kick: 'Lama 2 · Diagnostic diferențial', title: 'Adipos alb vs. lax: 1 asemănare, 3 diferențe',
    hud: ['stânga: adipos', 'dreapta: lax'],
    points: [
      { h: 'Ce predomină', d: ['adipos: !!aproape numai adipocite!!', 'lax: celule, fibre, SF în **proporții egale**'] },
      { h: 'Celulele', d: ['adipos: !!inel cu pecete!! (vacuolă, nucleu turtit periferic)', 'lax: fibroblaste, fibrocite + celule migrate'] },
      { h: 'Fibrele', d: ['adipos: !!rare fibre de reticulină!!, invizibile în HE', 'lax: colagen palid roz, orientare variabilă'] },
    ],
    why: 'Asemănarea: **aceeași lamă** (glanda mamară, HE), ambele țesut conjunctiv.',
    warn: 'Adipos sau glandă sebacee? Adipocit: **o vacuolă**, nucleu turtit periferic. Sebacee: **multe vacuole mici, nucleu central**, săculeți cu rând bazal.',
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'adi' }, layout: 'script', kick: 'Lama 2 · La OSPE · ' + T1, title: 'Ce spui cu voce tare: țesutul adipos alb',
    hud: ['script de 2–3 minute'],
    script: [
      { tm: 'Recunoașterea', at: '0:00–0:30', tx: 'Preparatul este o secțiune prin !!glanda mamară!!, colorată !!HE!!, pe care studiez !!țesutul conjunctiv adipos alb!!, în care **predomină celulele**, adipocitele, iar fibrele și SF sunt reduse. Îl recunosc după aspectul de **fagure de celule mari, optic goale**.' },
      { tm: 'Ob. mic', at: '0:30–1:15', tx: 'Observ un țesut format **aproape în exclusivitate din celule adipoase mari**, cu **limite celulare bine vizibile** și **citoplasmă incoloră**.' },
      { tm: 'Ob. mare', at: '1:15–2:00', tx: 'Adipocitele sunt izolate sau în cuiburi, formând **paniculi adipoși**: celule mari, rotunde, ovalare sau **poligonale** când sunt grupate, cu **membrana net conturată**. O **singură vacuolă mare**, necolorată în HE, împinge citoplasma și nucleul la periferie: citoplasma e un **inel subțire**, nucleul **turtit, hipercrom, excentric**: !!inel cu pecete!!. În spațiile intercelulare foarte înguste, **rare fibre de reticulină și numeroase capilare**. Celulele par goale pentru că **trigliceridele se dizolvă la prelucrare**.' },
      { tm: 'DD', at: '2:00–2:45', tx: 'Îl diferențiez de **conjunctivul lax** din aceeași lamă. Asemănarea: aceeași lamă, ambele țesut conjunctiv. Diferențe: **ce predomină**, **celulele** (inel cu pecete vs. fibroblaste, fibrocite, celule migrate), **fibrele** (rare fibre de reticulină vs. colagen cu orientare variabilă).' },
      { tm: 'Concluzia', at: '2:45–3:00', tx: 'Deci: **țesut conjunctiv adipos alb, glanda mamară, colorație HE**.' },
    ],
    durs: [10, 8, 24, 14, 5],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'adi', W: 791, H: 556, marks: [
      { x: 335, y: 393, rx: 62, ry: 40, lab: 'adipocit (vacuolă goală)', ly: 452 },
      { x: 555, y: 223, rx: 16, ry: 8, lab: 'nucleu turtit (pecetea)', ly: 252 },
      { x: 545, y: 418, rx: 16, lab: 'spațiu îngust între celule', lx: 600, ly: 452 },
      { x: 520, y: 60, rx: 220, ry: 55, lab: 'lobul mamar', ly: 128 },
    ] },
    kick: 'Lama 2 · Pe lama reală · Ob. mic · HE', title: 'Adiposul pe lamă: ce încercuiești',
    hud: ['poză reală · ob. mic'],
    points: [
      { h: 'Adipocit', d: ['celulă mare, !!optic goală!!'] },
      { h: 'Nucleu turtit, la margine', d: ['!!pecetea!! din „inel cu pecete”'] },
      { h: 'Spațiu intercelular îngust', d: ['aici: rare fibre de reticulină, capilare'] },
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
    hud: ['poză reală · ob. mare'],
    points: [
      { h: 'O singură vacuolă mare', d: ['necolorată în HE: celula pare goală'] },
      { h: 'Nucleul', d: ['!!turtit, hipercrom, excentric!!'] },
      { h: 'Citoplasma', d: ['un !!inel subțire!! în jurul vacuolei'] },
      { h: 'Spațiul dintre celule', d: ['**foarte îngust**'] },
    ],
  },
  // ---------------- LAMA 3 · TENDINOS ----------------
  {
    scene: 'tenRec', kick: 'Lama 3 · Conjunctiv tendinos · ' + T3, title: 'Benzi roz paralele și șiruri de nuclei subțiri',
    hud: ['Lama 3 din 4', '<b>HE</b> · tendon'],
    points: [
      { h: 'Fascicule de colagen', d: ['!!groase, palid eozinofile, paralele!!, ușor ondulate', 'predomină fibrele; celule puține, SF redusă'] },
      { h: 'Tenocitele (fibrocite)', d: ['puține, **alungite, dreptunghiulare**; limite și citoplasmă **slab vizibile** (lipite de fibre)', 'nucleu !!ovalar, hipercrom!!, în șiruri paralele cu fibrele'] },
      { h: '!!„Nucleii gemeni”!!', d: ['nuclei așezați **„cap la cap”**: aspect caracteristic tendonului'] },
      { h: 'Fante albe între fascicule', d: ['fasciculele se desprind la prelucrare: **nu e o structură de descris**'] },
    ],
    why: 'Totul curge în aceeași direcție: e singura lamă din LP 7 atât de ordonată. Conjunctiv !!dens ordonat!!. EN: dense regular connective tissue · LA: textus connectivus densus regularis; tendo. **Schema:** 1 tenocite (nuclei gemeni) · 2 fascicule de fibre de colagen.',
    beatDur: 6.5,
  },
  {
    scene: 'tenWhy', kick: 'Lama 3 · De ce arată așa? · ' + T3, title: 'Tendonul trage într-o singură direcție',
    hud: ['mușchi → tendon → os'],
    points: [
      { h: 'Fibre paralele cu forța', d: ['transmite forța mușchiului la os: !!rezistență enormă la tracțiune!! longitudinală'] },
      { h: 'Foarte puține celule și vase', d: ['țesutul e aproape numai matrice → **se vindecă greu și lent**'] },
      { h: 'Celule strivite între fibre', d: ['tenocitele stau în rânduri, capetele apropiate → !!„nuclei gemeni”!!'] },
      { h: 'Transversal (manual)', d: ['fascicule **poligonale**; tenocite stelate, **„în aripi”** între fibre', 'lama din LP e **longitudinală**'] },
    ],
    why: 'Dacă vezi nuclei gemeni între fibre paralele, spui tendon. Tenocitele doar întrețin matricea.',
    warn: 'Tendon sau mușchi neted? Mușchiul neted: celule fusiforme cu **citoplasmă proprie** și **nucleu central**. Tendonul: fibre de colagen + nuclei gemeni, !!citoplasmă invizibilă!!.',
    beatDur: 7,
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'ten', b: 'lax', l: 'tendinos (lama ta)', r: 'conjunctiv lax (lama 1)' }, kick: 'Lama 3 · Diagnostic diferențial', title: 'Tendinos vs. lax: 1 asemănare, 3 diferențe',
    hud: ['stânga: tendon', 'dreapta: lax'],
    points: [
      { h: 'Fibrele', d: ['tendon: !!groase, în fascicule dense, paralele, ordonate!!', 'lax: subțiri, izolate sau în fascicule cu **orientare variabilă**'] },
      { h: 'Celulele', d: ['tendon: !!puține tenocite!!, nuclei cap la cap: **„nuclei gemeni”**', 'lax: **mai multe celule**: fibroblaste, fibrocite + celule migrate'] },
      { h: 'Spațiul dintre fibre', d: ['tendon: !!aproape fără spațiu clar!!', 'lax: **mult spațiu clar** (SF) și capilare'] },
    ],
    why: 'Asemănarea: ambele sunt țesut conjunctiv în HE, cu **fibre de colagen palid roz** printre care stau celule cu **nuclei alungiți**.',
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'ten' }, layout: 'script', kick: 'Lama 3 · La OSPE · ' + T3, title: 'Ce spui cu voce tare: conjunctivul tendinos',
    hud: ['script de 2–3 minute'],
    script: [
      { tm: 'Recunoașterea', at: '0:00–0:30', tx: 'Preparatul este o !!secțiune longitudinală prin tendon!!, colorată !!HE!!, și reprezintă !!țesutul conjunctiv tendinos!!, un țesut fibros în care **predomină fibrele de colagen, dispuse ordonat**, cu celule puține și SF redusă. Îl recunosc după **benzile roz paralele** și șirurile de nuclei subțiri dintre ele.' },
      { tm: 'Ob. mic', at: '0:30–1:15', tx: 'Observ un țesut format **preponderent din fibre de colagen**, organizate în **fascicule ordonate**, printre care se găsesc celule conjunctive numite **tenocite**.' },
      { tm: 'Ob. mare', at: '1:15–2:00', tx: 'Fibrele sunt **groase, palid eozinofile**, ordonate; pe secțiune longitudinală au un traiect **ușor ondulat** și formează **fascicule dense, paralele**. Între fascicule, **puține tenocite**: celule alungite, dreptunghiulare, cu limite și citoplasmă **slab vizibile**, și nucleu **ovalar, hipercrom**. Nucleii sunt adesea **„cap la cap”**: !!„nuclei gemeni”!!, caracteristic tendonului. Fibrele paralele transmit forța într-o singură direcție și rezistă la tracțiune.' },
      { tm: 'DD', at: '2:00–2:45', tx: 'Îl diferențiez de **conjunctivul lax** (lama 1). Asemănarea: țesut conjunctiv în HE, colagen palid roz, celule cu nuclei alungiți. Diferențe: **fibrele** (dense, paralele vs. orientare variabilă), **celulele** (puține tenocite cu nuclei gemeni vs. multe celule), **spațiul dintre fibre** (aproape absent vs. mult spațiu clar și capilare).' },
      { tm: 'Concluzia', at: '2:45–3:00', tx: 'Deci: **țesut conjunctiv tendinos, tendon, colorație HE**.' },
    ],
    durs: [11, 8, 22, 15, 5],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'ten', W: 791, H: 556, marks: [
      { x: 450, y: 305, rx: 150, ry: 28, rot: 0.47, lab: 'fascicul de colagen', ly: 372 },
      { x: 640, y: 135, rx: 42, ry: 12, rot: 0.47, lab: 'nuclei de tenocite', ly: 172 },
      { x: 250, y: 215, rx: 72, ry: 12, rot: 0.5, lab: 'fantă albă (artefact)', ly: 255 },
    ] },
    kick: 'Lama 3 · Pe lama reală · Ob. mic · HE', title: 'Tendonul pe lamă: ce încercuiești',
    hud: ['poză reală · ob. mic'],
    points: [
      { h: 'Fascicul de colagen', d: ['benzi roz !!paralele!!, ordonate'] },
      { h: 'Nuclei de tenocite', d: ['!!în șiruri!!, paraleli cu fibrele'] },
      { h: 'Fantă albă', d: ['desprindere la prelucrare: **nu o descrii**'] },
    ],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'ten_mare', W: 550, H: 305, marks: [
      { x: 282, y: 86, rx: 40, ry: 13, rot: 0.45, lab: '„nuclei gemeni”', ly: 125 },
      { x: 282, y: 204, rx: 40, ry: 13, rot: 0.5, lab: '„nuclei gemeni”', ly: 243 },
      { x: 472, y: 212, rx: 38, ry: 12, rot: 0.45, lab: 'tenocit: citoplasmă invizibilă', ly: 250 },
      { x: 300, y: 150, rx: 150, ry: 24, rot: 0.47, dash: true, lab: 'fascicul paralel', lx: 150, ly: 160 },
    ] },
    kick: 'Lama 3 · Pe lama reală · Ob. mare · HE', title: 'La ob. mare: nucleii „cap la cap”',
    hud: ['poză reală · ob. mare'],
    points: [
      { h: '!!Nuclei gemeni!!', d: ['doi nuclei !!ovalari, hipercromi!!, cap la cap'] },
      { h: 'Nuclei gemeni', d: ['aceeași imagine pe alt rând de tenocite'] },
      { h: 'Tenocitul', d: ['citoplasma lui !!nu se vede!!: doar nucleul, lipit de fibre'] },
      { h: 'Fascicul de colagen', d: ['**palid eozinofil**, paralel cu ceilalți'] },
    ],
  },
  // ---------------- LAMA 4 · RETICULAR ----------------
  {
    scene: 'retRec', kick: 'Lama 4 · Conjunctiv reticular · ' + T4, title: 'Ochiuri clare, celule stelate palide, limfocite închise',
    hud: ['Lama 4 din 4', '<b>HE</b> · nodul limfatic'],
    points: [
      { h: 'Rețeaua (pseudorețeaua)', d: ['spații clare = **medulara**, limfocite mai rare', 'ob. mic: caută !!zona medulară, profundă!!'] },
      { h: 'Celula reticulară', d: ['!!stelată!!, citoplasmă **eozinofilă**, nucleu !!mare, rotund, hipocrom!!', 'prelungiri lungi, puțin numeroase, care **se anastomozează** → **pseudorețea**'] },
      { h: 'Limfocitul', d: ['mic, nucleu **rotund, hipercrom**; citoplasmă redusă, **în semilună**', 'stă **în ochiurile rețelei**'] },
      { h: 'Cordoanele medulare (dense)', d: ['limfocite îngrămădite: nu aici te uiți', 'ochiurile clare = **sinusurile medulare**, străbătute de celule reticulare'] },
    ],
    why: 'Țesutul reticular = celule reticulare + fibre de reticulină + SF (redusă). Formează **stroma** organelor limfoide: nodul limfatic, splină, măduvă hematogenă. !!Fibrele de reticulină nu se văd în HE.!! EN: reticular connective tissue · LA: textus connectivus reticularis; nodus lymphoideus. **Schema:** 1 celulă reticulară · 2 limfocit; fibrele nu se desenează la HE.',
    beatDur: 7,
  },
  {
    scene: 'retWhy', kick: 'Lama 4 · De ce arată așa? · ' + T4, title: 'Rețeaua se vede doar unde limfocitele sunt rare',
    hud: ['corticală vs. medulară'],
    points: [
      { h: 'Corticala: limfocite foarte dese', d: ['foliculi limfoizi + paracortex: limfocite compacte → !!ascund stroma!!'] },
      { h: 'Medulara: limfocite mai rare', d: ['aici vezi !!scheletul de celule reticulare!!'] },
      { h: 'Rețeaua = suport + filtru', d: ['celulele reticulare **fabrică fibrele de reticulină** și se așază de-a lungul lor', 'limfocitele circulă prin ochiuri'] },
    ],
    why: 'Truc de OSPE: mergi unde celulele sunt rare ca să vezi scheletul. Același țesut formează stroma la nodul, splină, măduvă (LP 9–10).',
    beatDur: 7,
  },
  {
    scene: 'ddPair', sceneOpts: { a: 'retHE', b: 'retAg', l: 'reticular · HE (lama ta)', r: 'fibre de reticulină · argentic (LP 6, lama 3)' }, kick: 'Lama 4 · Diagnostic diferențial', title: 'Reticular (HE) vs. fibrele de reticulină (argentic): 1 asemănare, 3 diferențe',
    hud: ['stânga: HE', 'dreapta: argentic'],
    points: [
      { h: 'Colorația', d: ['reticular: !!HE, roz și violet!!', 'LP 6: **impregnație argentică, negru pe fond gălbui**'] },
      { h: 'Ce vezi din rețea', d: ['reticular: !!celulele reticulare!! stelate, nucleu hipocrom; **fibrele nu se văd**', 'LP 6: **fibrele negre**, ramificate, anastomozate; celulele nu se colorează'] },
      { h: 'Organul și ochiurile', d: ['reticular: !!nodul limfatic!! (medulara), **limfocite** în ochiuri', 'LP 6: **rinichi**, tubi și capilare în ochiuri'] },
    ],
    why: 'Asemănarea: ambele arată **aceeași rețea de susținere** (stroma organelor), cu ochiuri în care stau alte structuri.',
    warn: '„Văd fibrele de reticulină” la HE = greșit. La reticularul HE vezi **celulele reticulare**; fibrele negre = LP 6 (argentic).',
    beatDur: 8,
  },
  {
    scene: 'script', sceneOpts: { f: 'ret' }, layout: 'script', kick: 'Lama 4 · La OSPE · ' + T4, title: 'Ce spui cu voce tare: conjunctivul reticular',
    hud: ['script de 2–3 minute'],
    script: [
      { tm: 'Recunoașterea', at: '0:00–0:30', tx: 'Preparatul este o secțiune prin !!nodulul limfatic!!, colorată !!HE!!, pe care studiez !!țesutul conjunctiv reticular!!, alcătuit din **celule reticulare, fibre de reticulină și SF**. Formează **stroma organelor limfoide**: nodul limfatic, splină, măduvă hematogenă.' },
      { tm: 'Ob. mic', at: '0:30–1:15', tx: 'Caut **zona medulară, profundă**, unde limfocitele sunt mai rare și se vede țesutul reticular, cu **aspect de rețea**.' },
      { tm: 'Ob. mare', at: '1:15–2:00', tx: 'Celulele reticulare sunt **stelate**, cu citoplasmă **eozinofilă** și nucleu **mare, rotund, hipocrom**. Prelungirile lor, lungi și puțin numeroase, **se anastomozează** și formează o **pseudorețea**, care dublează rețeaua de fibre de reticulină. !!Fibrele nu se observă în HE.!! În ochiuri, **limfocitele**: celule mici, nucleu rotund, hipercrom, citoplasmă în semilună. În corticală limfocitele ascund rețeaua; de aceea mă uit în medulară.' },
      { tm: 'DD', at: '2:00–2:45', tx: 'Îl diferențiez de **fibrele de reticulină în impregnație argentică** (LP 6, lama 3). Asemănarea: aceeași rețea de susținere, cu ochiuri. Diferențe: **colorația** (HE roz-violet vs. negru pe gălbui), **ce vezi** (celulele reticulare vs. fibrele negre), **organul și ochiurile** (nodul limfatic cu limfocite vs. rinichi cu tubi).' },
      { tm: 'Concluzia', at: '2:45–3:00', tx: 'Deci: **țesut conjunctiv reticular, nodul limfatic, colorație HE**.' },
    ],
    durs: [11, 7, 24, 15, 5],
  },
  {
    scene: 'atlas', sceneOpts: { img: 'ret', W: 791, H: 556, marks: [
      { x: 372, y: 214, rx: 56, ry: 46, lab: 'ochi clar (rețea)', ly: 278 },
      { x: 702, y: 403, rx: 22, lab: 'celulă reticulară', lx: 700, ly: 445 },
      { x: 633, y: 485, rx: 14, lab: 'limfocit', lx: 650, ly: 520 },
      { x: 262, y: 440, rx: 72, ry: 56, lab: 'cordon dens de limfocite', ly: 515 },
    ] },
    kick: 'Lama 4 · Pe lama reală · HE', title: 'Nodulul limfatic pe lamă: ce încercuiești',
    hud: ['poză reală · ob. mic + câmp mărit'],
    points: [
      { h: 'Ochi clar', d: ['aici se vede !!rețeaua!! (medulara)'] },
      { h: 'Celulă reticulară', d: ['nucleu !!mare, rotund, palid!!; citoplasmă roz (câmpul mărit, dreapta jos)'] },
      { h: 'Limfocit', d: ['nucleu **mic, rotund, închis**'] },
      { h: 'Cordon dens de limfocite', d: ['ascunde rețeaua: **nu aici**'] },
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
    hud: ['poză reală · ob. mare'],
    points: [
      { h: 'Celulă reticulară', d: ['!!stelată!!, citoplasmă roz (eozinofilă)'] },
      { h: 'Prelungiri anastomozate', d: ['leagă celulele vecine → !!pseudorețea!!'] },
      { h: 'Limfocit', d: ['**mic, închis**, în ochiul rețelei'] },
      { h: 'Ochi clar', d: ['spațiul dintre prelungiri'] },
      { h: 'Cordon dens', d: ['limfocite îngrămădite'] },
    ],
  },
  {
    scene: 'recap', kick: 'LP 7 · Recapitulare + capcane', title: 'Ce reții din fiecare lamă',
    hud: ['cele 4 lame'],
    table: {
      head: ['Lama', 'Ob. mic', 'Ob. mare', 'DD'],
      rows: [
        ['Lax · **HE** · glanda mamară', 'dens + lax cu **lobul mamar**', 'colagen palid roz, !!orientare variabilă!!; fibroblaste/fibrocite; capilare („fierăstrău”)', 'adipos alb (lama 2)'],
        ['Adipos alb · **HE** · glanda mamară', 'aproape numai **celule mari, goale**', 'o vacuolă; !!inel cu pecete!!; paniculi', 'lax (lama 1)'],
        ['Tendinos · **HE** · tendon', '**fascicule ordonate** + tenocite', 'fibre groase, paralele; !!nuclei gemeni!!', 'lax (lama 1)'],
        ['Reticular · **HE** · nodul limfatic', 'medulara: **rețea**, limfocite rare', 'celule reticulare stelate (nucleu hipocrom) + limfocite; !!fibrele nu se văd!!', 'fibre de reticulină (LP 6)'],
      ],
    },
    warn: 'Aceeași lamă, două diagnostice: glanda mamară HE e lama pentru **lax** și pentru **adipos**. Citește sarcina: ți se cere conjunctivul din lobul sau zona de grăsime?',
    beatDur: 6,
  },
];

// Poza reală, încercuită, pentru fiecare punct (colțul stânga-jos al animației)
const P = (img, cap) => ({ img, cap });
const INS = {
  laxRec: [P('z_lax_0', 'Lobulul mamar pe lamă'), P('z_lax_1', 'Laxul din lobul pe lamă'), P('z_lax_2', 'Conjunctivul dens pe lamă'), P('z_lax_3', 'Vas sangvin pe lamă')],
  laxMare: [P('z_lax_mare_5', 'Fibre de colagen pe lamă'), P('c_fibroblast', 'Fibroblast pe lamă (din LP 6)'), P('z_lax_mare_3', 'Fibrocit pe lamă'), P('z_lax_mare_2', 'Limfocit pe lamă')],
  capillaries: [P('z_lax_mare_0', 'Capilar cu hematii pe lamă'), P('z_lax_mare_1', 'Capilar transversal pe lamă'), P('z_lax_mare_5', 'Spații clare (SF) între fibre'), P('z_lax_1', 'Laxul din lobul pe lamă')],
  adiRec: [P('z_adi_0', 'Adipocit pe lamă'), P('z_adi_mare_1', 'Nucleu turtit pe lamă'), P('z_adi_mare_3', 'Spațiu intercelular pe lamă'), P('z_adi_3', 'Lobulul mamar alături')],
  adiWhy: [P('z_adi_mare_0', 'Vacuola goală pe lamă'), P('z_adi_mare_1', 'Nucleul împins la margine'), P('adi', 'Fagurele pe lamă · HE'), P('adi', 'Lama din LP: HE, lipide dizolvate')],
  tenRec: [P('z_ten_0', 'Fascicul de colagen pe lamă'), P('z_ten_mare_2', 'Nuclei de tenocite pe lamă'), P('z_ten_mare_0', '„Nuclei gemeni” pe lamă'), P('z_ten_2', 'Fantă albă (artefact) pe lamă')],
  tenWhy: [P('ten', 'Fibre paralele pe lamă · HE'), P('ten_mare', 'Puține celule pe lamă · ob. mare'), P('z_ten_mare_1', 'Nuclei striviți, cap la cap'), null],
  retRec: [P('z_ret_mare_3', 'Ochi clar pe lamă'), P('z_ret_mare_0', 'Celulă reticulară pe lamă'), P('z_ret_mare_2', 'Limfocit pe lamă'), P('z_ret_3', 'Cordon dens pe lamă')],
  retWhy: [P('z_ret_3', 'Limfocite dese: stroma ascunsă'), P('z_ret_0', 'Limfocite rare: rețeaua se vede'), P('z_ret_mare_1', 'Prelungire de celulă reticulară')],
};
SLIDES.forEach((s) => { if (INS[s.scene]) s.insets = INS[s.scene]; });
