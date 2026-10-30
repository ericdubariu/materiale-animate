// Recapitulare OSPE Histologie · LP 6–7 (țesutul conjunctiv). Textul vine din LP-urile oficiale 6 și 7
// (Histo_LP, UMFST). Roșu (!!…!!) = ce dă puncte; 1–4 pe slide. `xtra` = explicație proprie, nu e în LP.

export const GLOS = [
  ['LP', 'lucrarea practică'], ['HE', 'colorația hematoxilină-eozină'], ['OSPE', 'examen practic structurat pe stații'],
  ['DD', 'diagnostic diferențial'], ['ob.', 'obiectivul'], ['SF', 'substanța fundamentală'], ['MEC', 'matricea extracelulară'],
  ['RER', 'reticulul endoplasmatic rugos'], ['ARN', 'acidul ribonucleic'], ['EN', 'termenul în engleză'], ['LA', 'termenul în latină'],
  ['C', 'celule'], ['F', 'fibre'],
];
export const TERMS = [
  ['hipocrom', 'hipocrom', 'nucleu palid (cromatină desfăcută)'],
  ['hipercrom', 'hipercrom', 'nucleu colorat intens, închis'],
  ['bazofil', 'bazofil', 'ia hematoxilina (albastru-violet)'],
  ['eozinofil', 'eozinofil', 'ia eozina (roz)'],
  ['argirofil', 'argirofile', 'fixează argintul și apar negre'],
  ['anastomoz', 'anastomozate', 'ramurile se unesc între ele, formând o rețea'],
  ['eucromatin', 'eucromatină', 'cromatină desfăcută, palid colorată'],
  ['heterocromatin', 'heterocromatină', 'cromatină condensată, intens colorată'],
  ['granulație', 'țesut de granulație', 'țesut tânăr de reparație al unei plăgi: celule + multe vase'],
  ['tenocit', 'tenocite', 'fibrocitele tendonului'],
  ['paniculi', 'paniculi adipoși', 'cuiburi de celule adipoase strâns unite'],
  ['stroma', 'stroma', 'scheletul de susținere al unui organ'],
  ['medular', 'zona medulară', 'zona profundă a nodulului limfatic, cu limfocite mai rare'],
  ['pseudorețea', 'pseudorețea', 'rețeaua formată de prelungirile celulelor reticulare, care o dublează pe cea de fibre'],
];

const DDH = (who) => `DD · cu ${who}`;

export const SLIDES = [
  // ---------------------------------------------------------------- 1 · HARTA
  {
    deckName: 'Histologie · Recapitulare LP 6–7 · Țesutul conjunctiv (OSPE)',
    scene: 'cover', kick: 'Histologie · Recapitulare LP 6–7 · OSPE', title: 'Cele 7 lame din LP 6–7, dintr-o privire',
    hud: ['7 lame', '3 colorații'], anim: false, spec: 'Harta: cele 7 câmpuri desenate, pe două rânduri (LP 6, LP 7); rândul punctului se încercuiește, apoi lamele roșie și neagră.',
    points: [
      { h: 'LP 6 · Țesutul conjunctiv (I): trei lame, trei colorații', d: ['**1** celulele țesutului conjunctiv · HE · țesut de granulație: celularitate abundentă + multe vase', '**2** fibre de colagen · van Gieson · glanda mamară: roșii, izolate sau în fascicule, neramificate', '**3** fibre de reticulină · impregnație cu nitrat de argint · rinichi: rețea neagră, ramificată'] },
      { h: 'LP 7 · Țesutul conjunctiv (II): patru lame, toate HE', d: ['**4** conjunctiv lax · glanda mamară: în lobulul mamar, fibre cu orientare variabilă, capilare', '**5** adipos alb · glanda mamară: celule optic goale, inel cu pecete', '**6** conjunctiv tendinos · tendon: fascicule paralele, nuclei gemeni', '**7** conjunctiv reticular · nodul limfatic: celule reticulare stelate + limfocite'] },
      { h: 'Prima propoziție la OSPE: colorația', d: ['colorația îți spune jumătate din diagnostic: !!negru = reticulină · roșu = colagen!!', 'HE: restul de 5 lame, la care te uiți ce predomină'] },
    ],
    why: 'Privești lama, spui cu voce tare colorația, organul, semnele și scheletul scriptului, în ordinea de punctaj. DD cu **o singură lamă** (1 asemănare + 3 diferențe).',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 2 · FORMATUL OSPE
  {
    scene: 'ospe', kick: 'Recapitulare LP 6–7 · Formatul OSPE', title: 'La fiecare lamă spui 3 lucruri, în ordinea asta',
    hud: ['Stația = 7 minute'], anim: false, spec: 'Cronometrul de 7 minute, fix: segmentul punctului se aprinde; jos, coloanele 1–2–3 ale ordinii de punctaj.',
    points: [
      { h: 'Recunoașterea · primele 30 de secunde', d: ['!!lama (organul) + colorația + diagnosticul!!', 'la LP 6 colorația e jumătate din recunoaștere: trei lame, trei colorații'] },
      { h: 'Descrierea', d: ['**ob. mic**: arhitectura · **ob. mare**: celula (formă, citoplasmă, nucleu)'] },
      { h: 'Diagnosticul diferențial', d: ['**o singură lamă** care se confundă: !!1 asemănare + 3 diferențe!!'] },
      { h: 'Concluzia', d: ['examinatorul: „mai e 1 minut” → spui concluzia'] },
    ],
    say: '7 minute: 1 citești sarcina (ciornă) + 6 răspunzi: spui scriptul (2–3 min), **începi devreme**, apoi completezi. Se punctează doar ce spui cu voce tare; examinatorul tace.',
    warn: 'Recunoaștere → descriere → DD = **ordinea de punctaj** la Histologie: ce spui în afara ordinii riscă să nu fie bifat.',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 3 · ARBORELE DE DECIZIE
  {
    scene: 'tree', kick: 'Recapitulare LP 6–7 · Arborele de decizie', title: 'Două întrebări și ai lama: colorația, apoi ce predomină',
    hud: ['negru · roșu · HE'], anim: false, spec: 'Arbore fix: colorația (negru / roșu / HE) → cele 7 lame ca miniaturi; ramurile punctului se aprind.',
    points: [
      { h: 'Întrebarea 1: ce colorație vezi?', d: ['!!negru!! (impregnație argentică) → fibre de reticulină (LP 6, lama 3): rețea de fibre subțiri, ramificate (rinichi)', '!!roșu!! (van Gieson) → fibre de colagen (LP 6, lama 2): roșii, sinuoase, izolate sau în fascicule, nu se ramifică', 'roz-violet (HE) → 5 lame: treci la întrebarea 2'] },
      { h: 'Întrebarea 2 (HE): ce predomină și cum e organizat?', d: ['**țesut de granulație** (LP 6, lama 1): celularitate abundentă, vascularizație abundentă', '**lax** (LP 7, lama 1): celule ≈ fibre ≈ SF, în lobulul mamar, capilare', '**adipos alb** (LP 7, lama 2): predomină celulele: adipocite mari, optic goale, inel cu pecete'] },
      { h: 'Tot HE, organizare diferită', d: ['**tendinos** (LP 7, lama 3): predomină fibrele, ordonate; nuclei gemeni, puține celule', '**reticular** (LP 7, lama 4): celule reticulare stelate + limfocite, în zona medulară'] },
    ],
    why: 'Negru și roșu sunt câte o singură lamă. La HE (5 lame) te uiți la proporția celulelor, fibrelor și SF și la modul lor de organizare.',
    warn: 'Lax și adipos sunt pe **aceeași lamă** de glandă mamară: citește sarcina.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- 4 · BAZELE
  {
    scene: 'props', kick: 'Recapitulare LP 6–7 · Noțiunile de bază', title: 'Aceleași 3 componente, alte proporții = alt țesut',
    hud: ['celule + fibre + SF'], anim: false, spec: 'Trei cercuri fixe (celule, fibre, SF) încercuite pe rând; jos, barele de proporții pentru lax, adipos, tendinos, reticular (fibrele reticularului punctate: nu se văd în HE).',
    points: [
      { h: 'Celulele: elementul inițial', d: ['cele mai bine reprezentate țesuturi; celulele !!elaborează fibrele și SF!!', '**proprii**, mereu prezente: fibroblast/fibrocit, condroblast/condrocit, osteoblast/osteocit, celula adipoasă · **migrate din sânge**, inconstante: macrofag, plasmocit, limfocit, granulocit'] },
      { h: 'Fibrele: 3 tipuri', d: ['colagen · !!reticulină (= colagen tip III)!! · elastice; în HE se colorează (palid roz) doar colagenul'] },
      { h: 'Substanța fundamentală', d: ['fibrele + SF = **matricea extracelulară (MEC)**'] },
      { h: 'Proporțiile decid țesutul (LP 7)', d: ['proporții aproximativ egale → !!conjunctiv lax!!', 'predomină celulele, fibre și SF reduse → **adipos alb** · celule reticulare + fibre de reticulină + SF redusă → **reticular**', 'predomină fibrele de colagen, ordonate, celule puține → !!tendinos!!'] },
    ],
    why: 'Țesutul conjunctiv = celule + fibre + substanță fundamentală, în proporții diferite. Barele: C, F, SF. Bara punctată la reticular: fibrele de reticulină există, dar nu se văd în HE.',
    xtra: 'EN: connective tissue · LA: textus connectivus.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- 5 · CELULELE (poze reale)
  {
    scene: 'mosaic', kick: 'Recapitulare LP 6–7 · Celulele', title: 'Fiecare celulă are un semn de recunoaștere: îl vezi, îl spui',
    hud: ['poze reale', 'lama 1 din LP 6'], anim: false, spec: 'Mozaic fix cu cele 7 celule pe pozele de la disciplină; pătratul punctului se aprinde.',
    sceneOpts: { cols: 4, tiles: [] },
    points: [
      { h: '1 · Fibroblast · proprie', d: ['alungit, talie medie · nucleu !!mare, ovalar, hipocrom!!, nucleol proeminent, central · citoplasmă palid bazofilă'] },
      { h: '2 · Fibrocit · proprie', d: ['fusiform · nucleu !!fusiform, intens hipercrom!!, central · citoplasmă puțină, eozinofilă, greu vizibilă'] },
      { h: '3 · Adipocit · proprie', d: ['mare, rotund/poligonal · vacuolă lipidică unică (dizolvată la prelucrare) · nucleu turtit, hipercrom, excentric: inel cu pecete'] },
      { h: '4 · Plasmocit · migrată', d: ['ovalar/rotund, citoplasmă **intens bazofilă** · nucleu rotund, excentric, „spițe de roată”'] },
      { h: '5 · Macrofag · migrată', d: ['formă neregulată, mărime după materialul fagocitat · citoplasmă palid eozinofilă, vacuolară'] },
      { h: '6 · Celulă gigantă multinucleată', d: ['macrofage contopite: talie mare, citoplasmă abundentă, mai mulți nuclei'] },
      { h: '7 · Limfocit · migrată', d: ['**mic**, nucleu rotund, hipercrom · citoplasmă bazofilă, redusă, în semilună'] },
    ],
    why: 'Pentru fiecare celulă spui **forma → nucleul** (mărime, formă, poziție, culoare) **→ citoplasma**. Le cauți toate pe lama 1 din LP 6 (țesut de granulație).',
    beatDur: 4,
  },
  // ---------------------------------------------------------------- 6 · NUCLEUL PALID / ÎNCHIS
  {
    scene: 'chrom', kick: 'Recapitulare LP 6–7 · Nucleul decide', title: 'Fibroblastul are nucleul palid, fibrocitul nucleul închis',
    hud: ['cromatina decide culoarea'], anim: true,
    spec: 'Celula din centru trece lent din fibroblast (corp mare, nucleu ovalar palid cu granule de cromatină și nucleol) în fibrocit (corp subțire, nucleu fusiform închis: cromatina se condensează) și înapoi, ciclu de ~6 s pe intro; pe punctul 1 se oprește pe fibroblast, pe punctul 2 pe fibrocit; jos, plasmocitul și macrofagele → celula gigantă stau fixe și se încercuiesc pe punctele 3–4.',
    points: [
      { h: 'Fibroblastul', d: ['nucleu mare, ovalar, !!hipocrom!!, nucleol proeminent, central', 'celulă alungită, citoplasmă palid bazofilă'] },
      { h: 'Fibrocitul', d: ['nucleu ovalar, fusiform, !!intens hipercrom!!, central', 'celulă fusiformă, citoplasmă puțină, eozinofilă, greu vizibilă'] },
      { h: 'Plasmocitul', d: ['citoplasmă intens bazofilă · nucleu rotund, excentric', 'heterocromatina (intens colorată) și eucromatina (palidă) alternează radiar: **spițe de roată**'] },
      { h: 'Macrofagul', d: ['formă neregulată, citoplasmă vacuolară (material fagocitat) · se contopesc → **celula gigantă multinucleată**'] },
    ],
    xtra: 'Cromatina decide culoarea nucleului: desfăcută (eucromatină) = celulă care transcrie activ → palid; condensată (heterocromatină) = inactivă → închis. Fibroblastul e forma activă, fibrocitul forma de repaus; la o plagă fibrocitul se poate reactiva. Plasmocitul e bazofil pentru că are mult RER (ARN).',
    warn: 'Inversarea fibroblast / fibrocit e !!greșeala clasică!!.',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 7 · CELE 3 FIBRE
  {
    scene: 'fibers', kick: 'Recapitulare LP 6–7 · Cele 3 fibre', title: 'Trei fibre: în HE se vede doar colagenul',
    hud: ['colagen · reticulină · elastice'], anim: false, spec: 'Trei câmpuri fixe (van Gieson roșu, argentic negru, al treilea, HE roz pal, cu fibrele elastice abia schițate: nu se colorează în HE și nu au lamă în LP 6–7); jos, fascicul neramificat vs. rețea ramificată, încercuite pe punctul 4.',
    points: [
      { h: 'Fibre de colagen', d: ['!!van Gieson → roșu puternic!! (colorația de elecție), nucleii negru-cafenii; în HE palid roz', 'linii sinuoase, izolate sau în fascicule fine / grosiere; **nu se ramifică, nu se anastomozează**'] },
      { h: 'Fibre de reticulină (colagen tip III)', d: ['argirofile: !!impregnație argentică → negru!!; în HE nu se văd', 'linii neregulate, mai subțiri decât colagenul, **se ramifică + anastomozează** în rețele; nu formează fascicule'] },
      { h: 'Fibre elastice', d: ['al treilea tip de fibre; **nu se colorează cu HE**; în LP 6–7 nu au lamă proprie'] },
      { h: 'La OSPE', d: ['colagenul și reticulina sunt lame separate: spune întâi colorația, apoi criteriul decisiv !!„se ramifică / nu se ramifică”!!'] },
    ],
    why: 'De aceea LP 6 are trei colorații: HE (celulele), van Gieson (colagen), impregnație argentică (reticulină).',
    xtra: 'Colagenul rezistă la tracțiune, ca un cablu; reticulina face scheletul fin al organelor. EN: collagen fibres; reticular fibres · LA: fibra collagena; fibra reticularis.',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 8 · FIBRELE, CRITERIU CU CRITERIU
  {
    scene: 'fibers', sceneOpts: { table: true }, kick: 'Recapitulare LP 6–7 · Cele 3 fibre', title: 'Cum deosebești fibrele: criteriu cu criteriu',
    hud: ['5 criterii'], anim: false, spec: 'Aceleași trei câmpuri fixe; pe rândul „Ramificare” se încercuiește jos fasciculul neramificat vs. rețeaua.',
    table: {
      head: ['Criteriu', 'Colagen', 'Reticulină', 'Elastice'],
      rows: [
        ['În HE', 'se văd, palid roz', 'nu se văd', 'nu se văd'],
        ['Colorația', '!!van Gieson → roșu!!', '!!impregnație argentică → negru!!', 'fără lamă în LP 6–7'],
        ['Grosime', 'fine sau grosiere', 'mai subțiri decât colagenul', '—'],
        ['Ramificare', '!!nu se ramifică, nu se anastomozează!!', 'se ramifică și se anastomozează (rețea)', '—'],
        ['Fascicule', 'izolate sau în fascicule', 'nu se grupează în fascicule', '—'],
      ],
    },
    beatDur: 5,
  },
  // ---------------------------------------------------------------- LAMA 1 · GRANULAȚIE
  {
    scene: 'lama', sceneOpts: { k: 'gr', dd: 'lax' }, kick: 'LP 6 · Lama 1 din 3 · HE · țesut de granulație', title: 'Celulele țesutului conjunctiv: celularitate abundentă, multe vase',
    hud: ['Lama 1 din 7', '<b>HE</b> · țesut de granulație'], anim: false, spec: 'Câmp fix de țesut de granulație; încercuiește vasul cu hematii (ob. mic), apoi fibroblastul și plasmocitul (ob. mare); la DD, față în față cu laxul.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · **țesut de granulație** · !!celulele țesutului conjunctiv!!'] },
      { h: 'Ob. mic', d: ['**celularitate abundentă**: toate tipurile de celule, proprii și migrate', '!!vascularizația abundentă e caracteristică!!', 'dintre fibre, doar **colagen**, izolat sau în fascicule'] },
      { h: 'Ob. mare: tipurile de celule', d: ['fibroblast (nucleu mare, ovalar, hipocrom, nucleol) · fibrocit (nucleu fusiform, hipercrom) · adipocit (inel cu pecete)', 'plasmocit (spițe de roată) · macrofag (vacuolar) / celulă gigantă multinucleată · limfocit (mic, citoplasmă în semilună)'] },
      { h: DDH('conjunctivul lax (LP 7, lama 1)'), d: ['= ambele **țesut conjunctiv colorat HE**: celule + fibre de colagen + SF, cu vase', '≠ **ce predomină**: !!celulele (celularitate abundentă)!! · lax: celule, fibre și SF în proporții aproximativ egale', '≠ **celulele**: toate tipurile, proprii și migrate · lax: fibroblaste și fibrocite lângă fasciculele de colagen + celule migrate', '≠ **vasele**: vascularizație abundentă, caracteristică · lax: capilare (longitudinal: nuclei ca dinții de fierăstrău; transversal: 1–2 nuclei)'] },
    ],
    say: 'Concluzia: „Deci: **celulele țesutului conjunctiv, țesut de granulație, HE**.”',
    xtra: 'Țesutul de granulație nu e un organ, ci un țesut de reparație: aici „vânezi” celulele una câte una, după nucleu și citoplasmă. EN: granulation tissue.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 2 · COLAGEN
  {
    scene: 'lama', sceneOpts: { k: 'col', dd: 'ret' }, kick: 'LP 6 · Lama 2 din 3 · van Gieson · glanda mamară', title: 'Fibrele de colagen: roșii, sinuoase, în fascicule',
    hud: ['Lama 2 din 7', '<b>van Gieson</b> · glanda mamară'], anim: false, spec: 'Câmp fix în van Gieson; încercuiește fasciculul grosier și adipocitele (ob. mic), apoi un nucleu turtit de fibrocit (ob. mare); la DD, față în față cu reticulina.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!van Gieson!! (colorația de elecție pentru colagen) · **glanda mamară** · !!fibre de colagen!!', 'colagen **roșu puternic**, nucleii celulelor conjunctive **negru-cafenii**'] },
      { h: 'Ob. mic', d: ['fibre de colagen **roșii**, cu așezare dezordonată sau ordonată'] },
      { h: 'Ob. mare', d: ['linii mai mult sau mai puțin **sinuoase**, izolate sau în fascicule fine / grosiere', 'trec dintr-un fascicul în altul, dar **nu se ramifică, nu se anastomozează niciodată**', 'nucleii fibrocitelor **negru-cafenii, ovalari, turtiți**, lipiți de fibre: citoplasma și limitele nu se văd'] },
      { h: DDH('fibrele de reticulină (LP 6, lama 3)'), d: ['= ambele **fibre ale țesutului conjunctiv** (reticulina = colagen tip III)', '≠ **colorația**: van Gieson, fibre roșii · reticulina: impregnație argentică, fibre negre', '≠ **grosimea și gruparea**: fine sau grosiere, izolate sau în fascicule · reticulina: mai subțiri, nu formează fascicule', '≠ **ramificarea**: !!nu se ramifică și nu se anastomozează!! · reticulina: se ramifică și se anastomozează, rețea cu ochiuri de mărimi diferite'] },
    ],
    say: 'Concluzia: „Deci: **fibre de colagen, van Gieson, glanda mamară**.”',
    why: 'Spui colorația și ce colorează: colagen roșu, nuclei negru-cafenii.',
    xtra: 'Spațiile albe rotunde dintre fibre sunt adipocite: te ajută să recunoști glanda mamară. EN: collagen fibres · LA: fibra collagena; glandula mammaria.',
    warn: '„Colagenul se ramifică” = greșit: fibrele trec dintr-un fascicul în altul, dar nu se ramifică și nu se anastomozează. Reticulina da.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 3 · RETICULINĂ
  {
    scene: 'lama', sceneOpts: { k: 'ret', dd: 'col' }, kick: 'LP 6 · Lama 3 din 3 · argentic · rinichi', title: 'Fibrele de reticulină: singura lamă neagră, o rețea',
    hud: ['Lama 3 din 7', '<b>argentic</b> · rinichi'], anim: false, spec: 'Câmp fix argentic (tubi renali + rețea neagră); încercuiește un tub în ochiul rețelei (ob. mic), apoi o ramificare cu anastomoze (ob. mare); la DD, față în față cu colagenul.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!impregnație cu nitrat de argint!! · **rinichi** · !!fibre de reticulină!!', 'fibrele sunt **argirofile** (colagen tip III), de aceea se colorează în negru'] },
      { h: 'Ob. mic', d: ['o **rețea de fibre negre**; în ochiurile ei, tubii renali'] },
      { h: 'Ob. mare', d: ['linii cu **traiect neregulat**, **mai subțiri decât colagenul**', '**se ramifică și se anastomozează**: rețele cu ochiuri de mărimi și forme diferite; **nu se grupează în fascicule**'] },
      { h: DDH('fibrele de colagen (LP 6, lama 2)'), d: ['= ambele fibre ale țesutului conjunctiv (reticulina = colagen tip III)', '≠ **colorația**: impregnație argentică, fibre negre · colagen: van Gieson, fibre roșii', '≠ **grosimea și gruparea**: mai subțiri, fără fascicule · colagen: fine sau grosiere, izolate sau în fascicule', '≠ **ramificarea**: !!rețea ramificată, anastomozată!! · colagen: nu se ramifică niciodată'] },
    ],
    say: 'Concluzia: „Deci: **fibre de reticulină, impregnație argentică, rinichi**.”',
    xtra: 'Reticulina face scheletul fin (stroma) al organelor. În LP apar și poze din splină: aceeași rețea neagră, mai deasă, fără tubi; pe lamele din cutie poate scrie „Splina”, diagnosticul rămâne fibre de reticulină. EN: reticular fibres · LA: fibra reticularis; ren.',
    warn: 'Tot argentic e și epiteliul simplu pavimentos (LP 2): acolo vezi **contururi de celule** pe un etalat, aici **fibre** pe o secțiune.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 4 · LAX
  {
    scene: 'lama', sceneOpts: { k: 'lax', dd: 'adi' }, kick: 'LP 7 · Lama 1 din 4 · HE · glanda mamară', title: 'Conjunctivul lax: în lobulul mamar, proporții egale',
    hud: ['Lama 4 din 7', '<b>HE</b> · glanda mamară'], anim: false, spec: 'Câmp fix de glandă mamară (lobuli + conjunctiv dens între ei); încercuiește lobulul (ob. mic), apoi un fibroblast și un capilar transversal (ob. mare); la DD, față în față cu adiposul.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · **glanda mamară** · !!țesut conjunctiv lax!!', 'celule, fibre, SF în !!proporții aproximativ egale!!'] },
      { h: 'Ob. mic', d: ['două tipuri: **conjunctiv dens** și **conjunctiv lax**, în care stau structurile glandulare ale **lobulului mamar**', 'studiezi doar laxul din lobul'] },
      { h: 'Ob. mare', d: ['**celule**: fibroblaste și fibrocite lângă fasciculele de colagen + celule migrate (în alte locuri, ex. adventiția, și adipocite)', '**fibre**: colagen palid roz, izolat sau în fascicule cu **orientare variabilă**; elasticele și reticulina nu se văd în HE', '**capilare**: longitudinal, nuclei endoteliali alternativi, ca dinții de fierăstrău (hematii în șir indian); transversal, 1, maximum 2 nuclei'] },
      { h: DDH('țesutul adipos alb (LP 7, lama 2)'), d: ['= pe **aceeași lamă** (glanda mamară, HE); ambele țesut conjunctiv', '≠ **ce predomină**: proporții egale · adipos: predomină celulele, fibre și SF reduse', '≠ **celulele**: fibroblaste, fibrocite cu nuclei alungiți + celule migrate · adipos: adipocite mari, optic goale, inel cu pecete', '≠ **fibrele**: colagen palid roz, orientare variabilă · adipos: fibre reduse cantitativ'] },
    ],
    say: 'Concluzia: „Deci: **țesut conjunctiv lax, glanda mamară, HE**.”',
    xtra: 'Laxul e palid, „aerisit”, în lobul; densul e compact, roz intens, în jurul lobulului. EN: loose areolar connective tissue · LA: textus connectivus laxus.',
    warn: 'Laxul e **în lobul**: nu descrie densul de lângă.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 5 · ADIPOS ALB
  {
    scene: 'lama', sceneOpts: { k: 'adi', dd: 'lax' }, kick: 'LP 7 · Lama 2 din 4 · HE · glanda mamară', title: 'Țesutul adipos alb: celule mari, optic goale',
    hud: ['Lama 5 din 7', '<b>HE</b> · glanda mamară'], anim: false, spec: 'Fagure fix de adipocite; încercuiește un capilar dintre celule (ob. mic), apoi nucleul turtit al unei celule (ob. mare); la DD, față în față cu laxul.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · **glanda mamară** (aceeași lamă ca laxul) · !!țesut conjunctiv adipos alb!!', 'predomină celulele, strâns una lângă alta; SF și fibre reduse'] },
      { h: 'Ob. mic', d: ['aproape numai celule: adipocite albe **mari**, **limite bine vizibile**, citoplasmă incoloră', 'izolate sau strâns, în cuiburi = **paniculi adipoși**'] },
      { h: 'Ob. mare', d: ['rotunde, ovalare sau poligonale (grupate), membrana net conturată; o vacuolă mare, necolorată în HE (celula pare goală)', 'citoplasmă eozinofilă în **inel subțire** + nucleu **turtit, hipercrom, excentric** = !!inel cu pecete!!'] },
      { h: DDH('conjunctivul lax (LP 7, lama 1)'), d: ['= pe aceeași lamă (glanda mamară, HE); ambele țesut conjunctiv', '≠ **ce predomină**: celulele · lax: proporții egale', '≠ **celulele**: adipocite mari, optic goale, inel cu pecete · lax: fibroblaste, fibrocite + celule migrate', '≠ **fibrele**: !!reduse cantitativ!! · lax: colagen palid roz, orientare variabilă'] },
    ],
    say: 'Concluzia: „Deci: **țesut conjunctiv adipos alb, glanda mamară, HE**.”',
    why: 'Vacuola e goală: lipidul se dizolvă în timpul prelucrării histologice și nu se colorează cu HE.',
    xtra: 'EN: white adipose tissue · LA: textus adiposus albus.',
    warn: 'Adipos sau sebacee (LP 4)? Adipos: **o vacuolă**, nucleu turtit, excentric. Sebacee: citoplasmă vacuolară, nucleu rotund central (apoi picnotic), rând de celule bazale.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 6 · TENDINOS
  {
    scene: 'lama', sceneOpts: { k: 'ten', dd: 'lax' }, kick: 'LP 7 · Lama 3 din 4 · HE · tendon', title: 'Conjunctivul tendinos: fascicule paralele și nuclei gemeni',
    hud: ['Lama 6 din 7', '<b>HE</b> · tendon longitudinal'], anim: false, spec: 'Câmp fix de tendon (fascicule oblice paralele); încercuiește o fantă albă (ob. mic), apoi o pereche de nuclei gemeni (ob. mare); la DD, față în față cu laxul.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · **tendon** · !!țesut conjunctiv tendinos!!', 'predomină fibrele de colagen, ordonate; celule puține, SF redusă'] },
      { h: 'Ob. mic', d: ['preponderent **fibre de colagen în fascicule ordonate**; printre fibre, celule conjunctive = **tenocite**'] },
      { h: 'Ob. mare', d: ['fibre **groase, palid eozinofile**, ușor ondulate pe secțiune longitudinală, în fascicule dense, paralele', 'tenocite (fibrocite) puține: alungite, dreptunghiulare, citoplasmă slab vizibilă, nucleu ovalar, hipercrom; cap la cap: !!„nuclei gemeni”!!'] },
      { h: DDH('conjunctivul lax (LP 7, lama 1)'), d: ['= ambele țesut conjunctiv în HE, cu fibre de colagen palid roz printre care stau celule cu nuclei alungiți', '≠ **fibrele**: groase, în fascicule dense, paralele, ordonate · lax: izolate sau în fascicule cu orientare variabilă', '≠ **celulele**: puține tenocite, nuclei gemeni · lax: fibroblaste, fibrocite + celule migrate', '≠ **SF și vasele**: SF redusă · lax: SF în proporție egală, capilare'] },
    ],
    say: 'Concluzia: „Deci: **țesut conjunctiv tendinos, tendon, HE**.”',
    xtra: 'Fantele albe dintre fascicule sunt artefacte de prelucrare: nu le descrii. Fibrele paralele rezistă la tracțiune într-o singură direcție. EN: dense regular connective tissue · LA: textus connectivus densus regularis; tendo.',
    warn: 'Nucleii „cap la cap” (**nuclei gemeni**) sunt aspectul caracteristic țesutului tendinos: spune-i pe nume.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 7 · RETICULAR
  {
    scene: 'lama', sceneOpts: { k: 'rt', dd: 'ret' }, kick: 'LP 7 · Lama 4 din 4 · HE · nodul limfatic', title: 'Conjunctivul reticular: celule stelate și limfocite în ochiuri',
    hud: ['Lama 7 din 7', '<b>HE</b> · nodul limfatic, medulara'], anim: false, spec: 'Câmp fix de medulară (celule reticulare stelate + limfocite); încercuiește un cordon dens (ob. mic), apoi o celulă reticulară și un limfocit (ob. mare); la DD, față în față cu fibrele de reticulină.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · **nodul limfatic** · !!țesut conjunctiv reticular!!', 'celule reticulare + fibre de reticulină + SF redusă'] },
      { h: 'Ob. mic', d: ['cauți **zona medulară**, profundă: limfocitele sunt mai rare, se vede rețeaua'] },
      { h: 'Ob. mare', d: ['**celule reticulare stelate**, citoplasmă eozinofilă, nucleu mare, rotund, **hipocrom**; prelungiri lungi, puține, anastomozate = **pseudorețea** care dublează rețeaua de fibre', '!!fibrele de reticulină nu se văd în HE!! · în ochiuri (stroma nodulului): **limfocite** mici, nucleu rotund, hipercrom, citoplasmă în semilună'] },
      { h: DDH('fibrele de reticulină (LP 6, lama 3)'), d: ['= aceeași **rețea de fibre de reticulină**, cu ochiuri în care stau alte structuri', '≠ **colorația**: HE · fibrele: impregnație argentică, negre', '≠ **ce vezi din rețea**: !!celulele reticulare stelate!!, nucleu hipocrom; fibrele nu se văd · argentic: fibrele negre, ramificate, anastomozate', '≠ **organul și ochiurile**: nodul limfatic (medulara), limfocite în ochiuri · rinichi: tubi în ochiuri'] },
    ],
    say: 'Concluzia: „Deci: **țesut conjunctiv reticular, nodul limfatic, HE**.”',
    why: 'De ce medulara? Acolo limfocitele sunt mai rare și rețeaua se vede.',
    xtra: 'Unde limfocitele sunt dese (cordoane), rețeaua e acoperită. EN: reticular connective tissue · LA: textus connectivus reticularis; nodus lymphoideus.',
    warn: '„Văd fibrele de reticulină” la HE = greșit: vezi celulele reticulare; fibrele negre = LP 6, argentic.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- MOZAIC: CELE 7 POZE
  {
    scene: 'mosaic', kick: 'Recapitulare LP 6–7 · Pe lamele reale', title: 'Cele 7 lame, pe pozele de la disciplină',
    hud: ['poze reale', 'semnul încercuit'], anim: false, spec: 'Mozaic fix cu cele 7 lame reale; pe fiecare e încercuit semnul-cheie (localizat din pozele adnotate de la disciplină).',
    sceneOpts: { cols: 4, tiles: [] },
    points: [
      { h: '1 · Celulele țesutului conjunctiv · HE', d: ['granulație: celularitate abundentă + multe vase'] },
      { h: '2 · Fibre de colagen · !!van Gieson!!', d: ['fibre roșii, sinuoase, în fascicule'] },
      { h: '3 · Fibre de reticulină · !!argentic!!', d: ['rețea neagră, ramificată, între tubi'] },
      { h: '4 · Conjunctiv lax · HE', d: ['în lobulul mamar, fibre cu orientare variabilă'] },
      { h: '5 · Adipos alb · HE', d: ['celule optic goale, inel cu pecete'] },
      { h: '6 · Conjunctiv tendinos · HE', d: ['fascicule paralele, nuclei gemeni'] },
      { h: '7 · Conjunctiv reticular · HE', d: ['celule stelate + limfocite în ochiuri'] },
    ],
    beatDur: 4,
  },
  // ---------------------------------------------------------------- CAPCANE
  {
    scene: 'mosaic', kick: 'Recapitulare LP 6–7 · Capcane', title: 'Unde se pierd puncte la LP 6–7',
    hud: ['poze reale', '8 capcane'], anim: false, spec: 'Mozaic fix cu pozele capcanelor (splina, fibroblast, colagen, pavimentos argentic, glanda mamară, reticular HE, sebacee, granulație), fără cercuri.',
    sceneOpts: { cols: 3, tiles: [] },
    points: [
      { h: 'Rinichi sau splină?', d: ['în LP: !!rinichi!!, cu tubi în ochiurile rețelei; pozele din splină arată aceeași rețea; diagnosticul e același: fibre de reticulină'] },
      { h: 'Confuzie · fibroblast vs. fibrocit', d: ['fibroblast: nucleu mare, ovalar, hipocrom, nucleol · fibrocit: fusiform, intens hipercrom; invers = greșeala clasică'] },
      { h: 'Greșit · „colagenul se ramifică”', d: ['!!niciodată!!: trec dintr-un fascicul în altul, dar nu se ramifică, nu se anastomozează; reticulina da'] },
      { h: 'Confuzie · negru: reticulină sau pavimentos?', d: ['reticulina: fibre pe o secțiune de organ · pavimentosul (LP 2): contururi de celule pe un etalat'] },
      { h: 'Atenție · aceeași lamă, două diagnostice', d: ['glanda mamară HE = lax (în lobul) și adipos (adipocitele): citește sarcina'] },
      { h: 'Greșit · „văd fibrele de reticulină” la HE', d: ['la reticularul HE vezi **celulele reticulare**; fibrele negre = LP 6, argentic'] },
      { h: 'Confuzie · adipos sau sebacee?', d: ['adipos: o vacuolă, nucleu turtit, excentric · sebacee: citoplasmă vacuolară, rând de celule bazale'] },
      { h: 'Puncte · spune colorația și explicația', d: ['van Gieson: colagen roșu, nuclei negru-cafenii · adiposul: lipidul dizolvat la prelucrare · reticularul: !!de ce medulara!!'] },
    ],
    beatDur: 5,
  },
  // ---------------------------------------------------------------- TABELUL FINAL
  {
    scene: 'recap', kick: 'Tabelul final · LP 6–7', title: 'Toate cele 7 lame: tot ce spui, pe un rând',
    hud: ['lamele 1–7'], anim: false, spec: 'Cele 7 câmpuri desenate, fixe; miniatura rândului curent se încercuiește.',
    table: {
      head: ['Lama · colorație · organ', 'Semnul-cheie', 'Ob. mare: ce spui', 'DD: o singură lamă'],
      rows: [
        ['1 Celulele țesutului conjunctiv · HE · țesut de granulație', 'celularitate abundentă + multe vase', 'fibroblast · fibrocit · adipocit · plasmocit · macrofag (gigantă) · limfocit', 'conjunctivul lax (LP 7, lama 1)'],
        ['2 Fibre de colagen · !!van Gieson!! · glanda mamară', 'fibre roșii, izolate sau în fascicule', 'linii sinuoase; nu se ramifică; nuclei negru-cafenii', 'fibrele de reticulină (LP 6, lama 3)'],
        ['3 Fibre de reticulină · !!impregnație cu nitrat de argint!! · rinichi', 'rețea neagră', 'subțiri, ramificate, anastomozate; fără fascicule', 'fibrele de colagen (LP 6, lama 2)'],
        ['4 Conjunctiv lax · HE · glanda mamară', 'în lobul; proporții egale', 'colagen palid, orientare variabilă; fibroblaste / fibrocite; capilare', 'țesutul adipos alb (LP 7, lama 2)'],
        ['5 Adipos alb · HE · glanda mamară', 'adipocite mari, optic goale', 'o vacuolă; nucleu turtit, hipercrom, excentric = inel cu pecete', 'conjunctivul lax (LP 7, lama 1)'],
        ['6 Conjunctiv tendinos · HE · tendon', 'fascicule ordonate, paralele', 'fibre groase, ondulate; tenocite, nuclei gemeni', 'conjunctivul lax (LP 7, lama 1)'],
        ['7 Conjunctiv reticular · HE · nodul limfatic', 'medulara: rețea + limfocite', 'celule reticulare stelate, nucleu hipocrom; !!fibrele nu se văd!!', 'fibrele de reticulină (LP 6, lama 3)'],
      ],
    },
    beatDur: 5,
  },
];

/* ---------- pozele reale: inset pe fiecare punct (colțul stânga-jos al animației) ---------- */
const P = (img, cap) => ({ img, cap });
const FULL = { gr: 'țesut de granulație · HE', col: 'glanda mamară · van Gieson', ret: 'rinichi · argentic', lax: 'glanda mamară · HE (lax)', adi: 'glanda mamară · HE (adipos)', ten: 'tendon · HE', rt: 'nodul limfatic · HE' };
const DDP = (k) => P(k, 'Partenerul de DD pe lamă: ' + FULL[k]);
const INS = {
  gr: [P('gr', 'Pe lamă: ' + FULL.gr), P('z_gr_1', 'Capilar cu o hematie pe lamă'), P('z_gr_0', 'Nuclei rotunzi, închiși: limfocite, plasmocite'), DDP('lax')],
  col: [P('col', 'Pe lamă: ' + FULL.col), P('z_col_0', 'Fibre roșii, sinuoase'), P('z_col_1', 'Nuclei negru-cafenii pe lamă'), DDP('ret')],
  ret: [P('ret', 'Pe lamă: ' + FULL.ret), P('z_ret_0', 'Ochi al rețelei: tub renal'), P('z_ret_1', 'Fibre ramificate între tubi'), DDP('col')],
  lax: [P('lax', 'Pe lamă: ' + FULL.lax), P('z_lax_1', 'Laxul din lobul pe lamă'), P('z_lax_mare_0', 'Capilar cu hematii pe lamă'), DDP('adi')],
  adi: [P('adi', 'Pe lamă: ' + FULL.adi), P('z_adi_0', 'Adipocit pe lamă'), P('z_adi_mare_1', 'Nucleu turtit, la margine'), DDP('lax')],
  ten: [P('ten', 'Pe lamă: ' + FULL.ten), P('z_ten_0', 'Fascicul de colagen pe lamă'), P('z_ten_mare_0', '„Nuclei gemeni” pe lamă'), DDP('lax')],
  rt: [P('rt', 'Pe lamă: ' + FULL.rt), P('z_rt_0', 'Limfocite rare: rețeaua se vede'), P('z_rt_mare_0', 'Celulă reticulară pe lamă'), DDP('ret')],
};
SLIDES.forEach((s) => { if (s.scene === 'lama') s.insets = INS[s.sceneOpts.k]; });

/* ---------- celulele: câte o poză reală pe pătrat (fără cercuri) ---------- */
const CEL = SLIDES.find((s) => s.kick.includes('Celulele'));
CEL.sceneOpts.tiles = [['c_fibroblast', 'fibroblast'], ['c_fibrocit', 'fibrocit'], ['c_adipocit', 'adipocite'], ['c_plasmocit', 'plasmocit'], ['c_macrofag', 'macrofag'], ['c_gigant', 'celulă gigantă'], ['c_limfocit', 'limfocit']]
  .map(([img, n], i) => ({ img, lab: `${i + 1} · ${n}` }));

/* ---------- mozaicul: câte o lamă pe pătrat, cu semnul-cheie încercuit (poziții din pozele adnotate) ---------- */
const TILE = [
  ['gr', [120, 260, 340, 260], { x: 268, y: 380, rx: 62, ry: 48 }],
  ['col', [240, 0, 340, 260], { x: 405, y: 82, rx: 120, ry: 34 }],
  ['ret', [500, 180, 300, 230], { x: 647, y: 288, rx: 55, ry: 42 }],
  ['lax', [230, 100, 330, 250], { x: 378, y: 222, rx: 70, ry: 60 }],
  ['adi', [180, 280, 330, 250], { x: 340, y: 393, rx: 72, ry: 40 }],
  ['ten', [380, 260, 300, 230], { x: 490, y: 344, rx: 110, ry: 26, rot: 0.47 }],
  ['rt', [560, 260, 231, 177], { x: 676, y: 368, rx: 38, ry: 38 }],
];
const MZ = SLIDES.find((s) => s.kick.includes('Pe lamele reale'));
const SH = ['Celulele (granulație)', 'Fibre de colagen', 'Fibre de reticulină', 'Conjunctiv lax', 'Adipos alb', 'Conjunctiv tendinos', 'Conjunctiv reticular'];
MZ.sceneOpts.tiles = TILE.map(([img, src, m], i) => ({ img, src, marks: [m], lab: `${i + 1} · ${SH[i]}` }));

/* ---------- capcanele: poze de comparație (fără cercuri) ---------- */
const CV = SLIDES.find((s) => s.kick.includes('Capcane'));
CV.sceneOpts.tiles = [
  { img: 'splina', lab: '1 · splina (argentic)' }, { img: 'c_fibroblast', lab: '2 · fibroblast' }, { img: 'col', lab: '3 · colagen' },
  { img: 'pav', lab: '4 · pavimentos argentic' }, { img: 'adi', lab: '5 · lax + adipos' }, { img: 'rt', lab: '6 · reticular HE' },
  { img: 'seb', lab: '7 · glanda sebacee' }, { img: 'gr', lab: '8 · granulație' },
];
