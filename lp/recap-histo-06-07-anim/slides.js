// Recapitulare OSPE Histologie · LP 6–7 (țesutul conjunctiv). Textul vine din recapitularea LP 6–7
// (îndrumătorul UMFST + deck-urile LP 6 și LP 7). Roșu (!!…!!) = ce dă puncte; 1–4 pe slide.

export const GLOS = [
  ['LP', 'lucrarea practică'], ['HE', 'colorația hematoxilină-eozină'], ['OSPE', 'examen practic structurat pe stații'],
  ['DD', 'diagnostic diferențial'], ['ob.', 'obiectivul'], ['SF', 'substanța fundamentală'], ['MEC', 'matricea extracelulară'],
  ['RER', 'reticulul endoplasmatic rugos'], ['ARN', 'acidul ribonucleic'], ['EN', 'termenul în engleză'], ['LA', 'termenul în latină'],
  ['UMFST', 'Universitatea de Medicină, Farmacie, Științe și Tehnologie Târgu Mureș'], ['C', 'celule'], ['F', 'fibre'],
];
export const TERMS = [
  ['hipocrom', 'hipocrom', 'nucleu palid (cromatină desfăcută)'],
  ['hipercrom', 'hipercrom', 'nucleu colorat intens, închis'],
  ['bazofil', 'bazofil', 'ia hematoxilina (albastru-violet)'],
  ['eozinofil', 'eozinofil', 'ia eozina (roz)'],
  ['argirofil', 'argirofile', 'fixează argintul și apar negre'],
  ['anastomoz', 'anastomozate', 'ramurile se unesc între ele, formând o rețea'],
  ['metacromatic', 'metacromatice', 'colorate în altă nuanță decât colorantul folosit'],
  ['eucromatin', 'eucromatină', 'cromatină desfăcută, activă'],
  ['heterocromatin', 'heterocromatină', 'cromatină condensată, inactivă'],
  ['granulație', 'țesut de granulație', 'țesut tânăr de reparație al unei plăgi: celule + multe vase'],
  ['tenocit', 'tenocite', 'fibrocitele tendonului'],
  ['paniculi', 'paniculi adipoși', 'lobuli de celule adipoase'],
  ['stroma', 'stroma', 'scheletul de susținere al unui organ'],
  ['medular', 'zona medulară', 'zona profundă a nodulului limfatic, cu limfocite mai rare'],
];

const DDH = (who) => `DD · cu ${who}`;

export const SLIDES = [
  // ---------------------------------------------------------------- 1 · HARTA
  {
    deckName: 'Histologie · Recapitulare LP 6–7 · Țesutul conjunctiv (OSPE)',
    scene: 'cover', kick: 'Histologie · Recapitulare LP 6–7 · OSPE', title: 'Cele 7 lame din LP 6–7, dintr-o privire',
    hud: ['7 lame', '3 colorații'], anim: false, spec: 'Harta: cele 7 câmpuri desenate, pe două rânduri (LP 6, LP 7); rândul punctului se încercuiește, apoi lamele roșie și neagră.',
    points: [
      { h: 'LP 6 · Țesutul conjunctiv (I): trei lame, trei colorații', d: ['**1** celulele țesutului conjunctiv · HE · țesut de granulație: amestec de celule + multe vase', '**2** fibre de colagen · van Gieson · glanda mamară: roșii, în fascicule, neramificate', '**3** fibre de reticulină · impregnație argentică · rinichi: rețea neagră, ramificată'] },
      { h: 'LP 7 · Țesutul conjunctiv (II): patru lame, toate HE', d: ['**4** conjunctiv lax · glanda mamară: roz pal, „aerisit”, capilare', '**5** adipos alb · glanda mamară: celule goale, inel cu pecete', '**6** conjunctiv tendinos · tendon: fibre paralele, nuclei gemeni', '**7** conjunctiv reticular · nodul limfatic: celule stelate + limfocite'] },
      { h: 'Prima propoziție la OSPE: colorația', d: ['colorația îți spune jumătate din diagnostic: !!negru = reticulină · roșu = colagen!!', 'HE: restul de 5 lame, la care te uiți ce predomină'] },
    ],
    why: '~45–60 de minute, din imagini: privești lama, spui cu voce tare colorația, organul, semnele și scheletul scriptului, în ordinea de punctaj. DD cu **o singură lamă** (1 asemănare + 3 diferențe). Scripturile complete sunt în deck-urile LP 6 și LP 7.',
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
    say: '7 minute: 1 citești sarcina (ciornă) + 6 răspunzi: spui scriptul (2–3 min), **începi devreme**, apoi completezi. Cronometrul: 0:00–1:00 citești, 1:00–7:00 răspunzi. Se punctează doar ce spui cu voce tare; examinatorul tace.',
    warn: '= **ordinea de punctaj** la Histologie: ce spui în afara ordinii riscă să nu fie bifat.',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 3 · ARBORELE DE DECIZIE
  {
    scene: 'tree', kick: 'Recapitulare LP 6–7 · Arborele de decizie', title: 'Două întrebări și ai lama: colorația, apoi ce predomină',
    hud: ['negru · roșu · HE'], anim: false, spec: 'Arbore fix: colorația (negru / roșu / HE) → cele 7 lame ca miniaturi; ramurile punctului se aprind.',
    points: [
      { h: 'Întrebarea 1: ce colorație vezi?', d: ['!!negru!! (impregnație argentică) → fibre de reticulină (LP 6, lama 3): rețea fină, ramificată, în jurul tubilor (rinichi)', '!!roșu!! (van Gieson) → fibre de colagen (LP 6, lama 2): fascicule roșii, sinuoase, nu se ramifică', 'roz-violet (HE) → 5 lame: treci la întrebarea 2'] },
      { h: 'Întrebarea 2 (HE): ce predomină și cum e organizat?', d: ['**țesut de granulație** (LP 6, lama 1): amestec de celule + multe vase, colagen dezordonat', '**lax** (LP 7, lama 1): celule ≈ fibre ≈ SF, „aerisit”, capilare, în lobulul mamar', '**adipos alb** (LP 7, lama 2): celule mari, goale, inel cu pecete, aspect de fagure'] },
      { h: 'Tot HE, organizare diferită', d: ['**tendinos** (LP 7, lama 3): fibre paralele, nuclei gemeni, puține celule', '**reticular** (LP 7, lama 4): celule stelate, palide + limfocite, în medulară'] },
    ],
    why: 'Negru și roșu sunt câte o singură lamă. La HE (5 lame) te uiți la proporția celulelor, fibrelor și SF și la modul lor de organizare: exact regula de DD din îndrumător.',
    warn: 'Lax și adipos sunt pe **aceeași lamă** de glandă mamară: citește sarcina.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- 4 · BAZELE
  {
    scene: 'props', kick: 'Recapitulare LP 6–7 · Noțiunile de bază', title: 'Aceleași 3 componente, alte proporții = alt țesut',
    hud: ['celule + fibre + SF'], anim: false, spec: 'Trei cercuri fixe (celule, fibre, SF) încercuite pe rând; jos, barele de proporții pentru lax, adipos, tendinos, reticular (fibrele reticularului punctate: nu se văd în HE).',
    points: [
      { h: 'Celulele', d: ['**proprii**, mereu prezente: fibroblast / fibrocit, celula adipoasă (+ condro-, osteoblaste: LP 8)', '**migrate din sânge**, inconstante: macrofag, plasmocit, limfocit, granulocit'] },
      { h: 'Fibrele: 3 tipuri', d: ['colagen (roz în HE) · !!reticulină (= colagen tip III)!! · elastice'] },
      { h: 'Substanța fundamentală', d: ['gel amorf, hidratat; în HE palid, aproape necolorat', 'fibrele + SF = **matricea extracelulară (MEC)**: celula produce matricea'] },
      { h: 'Proporțiile decid țesutul (LP 7)', d: ['proporții egale → !!conjunctiv lax!! (fibre cu orientare variabilă)', 'predomină celulele → **adipos** (fibre rare, printre celule) și **reticular** (rețea; fibrele nu se văd în HE)', 'predomină fibrele, ordonate → !!tendinos!! (fibre paralele)'] },
    ],
    why: 'Țesutul conjunctiv = celule + fibre + substanță fundamentală. EN: connective tissue · LA: textus connectivus. Barele: C, F, SF. Bara punctată la reticular: fibrele de reticulină există, dar nu se văd în HE.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- 5 · CELULELE (poze reale)
  {
    scene: 'mosaic', kick: 'Recapitulare LP 6–7 · Celulele', title: 'Fiecare celulă are un semn de recunoaștere: îl vezi, îl spui',
    hud: ['poze reale', 'lama 1 din LP 6'], anim: false, spec: 'Mozaic fix cu cele 7 celule pe pozele de la disciplină; pătratul punctului se aprinde.',
    sceneOpts: { cols: 4, tiles: [] },
    points: [
      { h: '1 · Fibroblast · proprie', d: ['nucleu !!mare, ovalar, hipocrom!!, nucleol · citoplasmă palid bazofilă'] },
      { h: '2 · Fibrocit · proprie', d: ['nucleu !!fusiform, hipercrom!! · citoplasmă puțină, eozinofilă'] },
      { h: '3 · Adipocit · proprie', d: ['o vacuolă lipidică unică (lipidul dizolvat) · nucleu turtit, periferic'] },
      { h: '4 · Plasmocit · migrată', d: ['citoplasmă **intens bazofilă** · nucleu excentric, „spițe de roată”'] },
      { h: '5 · Macrofag · migrată', d: ['formă neregulată, palid eozinofil · incluzii = material fagocitat'] },
      { h: '6 · Celulă gigantă · migrată', d: ['multinucleată = macrofage contopite'] },
      { h: '7 · Limfocit · migrată', d: ['**mic**, nucleu rotund hipercrom · citoplasmă în semilună'] },
    ],
    why: 'Pentru fiecare celulă spui **forma → nucleul** (mărime, formă, poziție, culoare) **→ citoplasma**. Le cauți toate pe lama 1 din LP 6 (țesut de granulație). Mastocitul (plin de granule metacromatice) e din manuale: nu e cerut la lama din LP.',
    beatDur: 4,
  },
  // ---------------------------------------------------------------- 6 · NUCLEUL PALID / ÎNCHIS
  {
    scene: 'chrom', kick: 'Recapitulare LP 6–7 · De ce arată așa', title: 'Nucleul palid = celulă activă; nucleul închis = repaus',
    hud: ['cromatina decide culoarea'], anim: true,
    spec: 'Celula din centru trece lent din fibroblast (corp mare, nucleu ovalar palid cu granule de cromatină și nucleol) în fibrocit (corp subțire, nucleu fusiform închis: cromatina se condensează) și înapoi (plagă: reactivare), ciclu de ~6 s pe intro; pe punctul 1 se oprește pe fibroblast, pe punctul 2 pe fibrocit; jos, plasmocitul și macrofagele → celula gigantă stau fixe și se încercuiesc pe punctele 3–4.',
    points: [
      { h: 'Fibroblastul · activ', d: ['nucleu mare, ovalar, !!hipocrom!!, nucleol proeminent', 'citoplasmă palid bazofilă: **fabrică colagen + SF**'] },
      { h: 'Fibrocitul · repaus', d: ['nucleu fusiform, !!intens hipercrom!! · citoplasmă puțină, greu vizibilă', 'la o plagă se **reactivează** (redevine fibroblast)'] },
      { h: 'Plasmocitul', d: ['citoplasmă intens bazofilă (**RER, ARN**) · nucleu excentric, „spițe de roată”'] },
      { h: 'Macrofagul', d: ['formă neregulată, material fagocitat · se contopesc → **celula gigantă**'] },
    ],
    why: 'Cromatina decide culoarea nucleului: **desfăcută (eucromatină)** = transcrie activ → palid; **condensată (heterocromatină)** = inactivă → intens colorat.',
    warn: 'Inversarea fibroblast / fibrocit e !!greșeala clasică!!.',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 7 · CELE 3 FIBRE
  {
    scene: 'fibers', kick: 'Recapitulare LP 6–7 · Cele 3 fibre', title: 'Trei fibre, trei colorații: în HE se vede doar colagenul',
    hud: ['colagen · reticulină · elastice'], anim: false, spec: 'Trei câmpuri fixe (van Gieson roșu, argentic negru, elastice brune); jos, fascicul neramificat vs. rețea ramificată, încercuite pe punctul 4.',
    points: [
      { h: 'Fibre de colagen', d: ['!!van Gieson → roșu!!: groase, ondulate, în fascicule, **nu se ramifică**', 'HE: se văd, roz pal · rol: rezistență la tracțiune (ca un cablu)'] },
      { h: 'Fibre de reticulină', d: ['!!impregnație argentică → negru!! (argirofile): subțiri, neregulate, rețea fără fascicule, **se ramifică + anastomozează**', 'HE: nu se văd · rol: stroma organelor (schelet fin)'] },
      { h: 'Fibre elastice (nu e lamă în LP 6)', d: ['rezorcină-fuxină (Weigert) → albastru închis (îndrumător) · orceină → brun (din manuale)', 'subțiri, ondulate, se ramifică · HE: nu se văd · rol: elasticitate'] },
      { h: 'La OSPE', d: ['colagenul și reticulina sunt lame separate: spune întâi colorația, apoi criteriul decisiv !!„se ramifică / nu se ramifică”!!'] },
    ],
    why: 'De aceea LP 6 are trei colorații: HE (celulele), van Gieson (colagen), impregnație argentică (reticulină). EN: collagen fibres; reticular fibres · LA: fibra collagena; fibra reticularis.',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 8 · FIBRELE, CRITERIU CU CRITERIU
  {
    scene: 'fibers', sceneOpts: { table: true }, kick: 'Recapitulare LP 6–7 · Cele 3 fibre', title: 'Cum deosebești fibrele: criteriu cu criteriu',
    hud: ['6 criterii'], anim: false, spec: 'Aceleași trei câmpuri fixe; pe rândul „Ramificare” se încercuiește jos fasciculul neramificat vs. rețeaua.',
    table: {
      head: ['Criteriu', 'Colagen', 'Reticulină', 'Elastice'],
      rows: [
        ['În HE', 'se văd, palid roz', 'nu se văd', 'nu se văd'],
        ['Colorația de elecție', '!!van Gieson → roșu!!', '!!impregnație argentică → negru!!', 'rezorcină-fuxină (îndrumător) / orceină (din manuale)'],
        ['Grosime', 'groase', 'subțiri', 'subțiri'],
        ['Ramificare', '!!nu se ramifică, nu se anastomozează!!', 'se ramifică și se anastomozează (rețea)', 'se ramifică'],
        ['Fascicule', 'da', 'nu', 'nu'],
        ['Rol', 'rezistență la tracțiune (ca un cablu)', 'stroma organelor (schelet fin)', 'elasticitate'],
      ],
    },
    beatDur: 5,
  },
  // ---------------------------------------------------------------- LAMA 1 · GRANULAȚIE
  {
    scene: 'lama', sceneOpts: { k: 'gr', dd: 'lax' }, kick: 'LP 6 · Lama 1 din 3 · HE · țesut de granulație', title: 'Celulele țesutului conjunctiv: amestec de celule, multe vase',
    hud: ['Lama 1 din 7', '<b>HE</b> · țesut de granulație'], anim: false, spec: 'Câmp fix de țesut de granulație; încercuiește vasul cu hematii (ob. mic), apoi fibroblastul și plasmocitul (ob. mare); la DD, față în față cu laxul.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin **țesut de granulație** · !!celulele țesutului conjunctiv!!', 'țesut de reparație, faza proliferativă'] },
      { h: 'Ob. mic', d: ['**celularitate abundentă**: amestec de celule proprii + migrate', '**numeroase vase, cu hematii**: vascularizația abundentă e caracteristică', 'colagen roz pal, **dezordonat**: fibre izolate sau în fascicule dezordonate'] },
      { h: 'Ob. mare', d: ['fibroblast (nucleu mare, hipocrom, nucleol) · fibrocit (fusiform, hipercrom) · adipocit', 'plasmocit (spițe de roată) · macrofag / celulă gigantă · limfocit (citoplasmă în semilună)', 'nuclei rotunzi, închiși = limfocite, plasmocite'] },
      { h: DDH('conjunctivul lax (LP 7, lama 1)'), d: ['= ambele **țesut conjunctiv colorat HE**: celule + fibre de colagen + SF, cu vase', '≠ **ce predomină**: !!celulele (celularitate abundentă)!! · lax: celule, fibre și SF în proporții aproximativ egale', '≠ **tipurile de celule**: amestec (fibroblaste, fibrocite, plasmocite, macrofage, limfocite, adipocite) · lax: mai ales fibroblaste și fibrocite, puține celule migrate', '≠ **vasele**: foarte multe vase, semnul lamei · lax: mai puține, capilare în jurul lobulului mamar'] },
    ],
    say: 'Concluzia: „Deci: **celulele țesutului conjunctiv, țesut de granulație, HE**.”',
    why: 'Nu e un organ, ci un **țesut de reparație**: aici „vânezi” celulele una câte una, după nucleu și citoplasmă. EN: granulation tissue.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 2 · COLAGEN
  {
    scene: 'lama', sceneOpts: { k: 'col', dd: 'ret' }, kick: 'LP 6 · Lama 2 din 3 · van Gieson · glanda mamară', title: 'Fibrele de colagen: totul e roșu, fibre ondulate în fascicule',
    hud: ['Lama 2 din 7', '<b>van Gieson</b> · glanda mamară'], anim: false, spec: 'Câmp fix în van Gieson; încercuiește fasciculul grosier și adipocitele (ob. mic), apoi un nucleu turtit de fibrocit (ob. mare); la DD, față în față cu reticulina.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!van Gieson!! (fucsină acidă) · secțiune prin **glanda mamară** · !!fibre de colagen!!', 'colagen roșu; epiteliu și nuclei negru-cafeniu'] },
      { h: 'Ob. mic', d: ['din cele 3 fibre, în HE se vede doar colagenul (palid roz); aici **fibre roșii**, ordonate sau dezordonate', '**spații albe rotunde** = adipocite: reperul glandei mamare'] },
      { h: 'Ob. mare', d: ['linii **sinuoase**, izolate sau în fascicule fine / grosiere', '**nu se ramifică, nu se anastomozează**', 'nucleii fibrocitelor **negru-cafenii, turtiți**, lipiți de fibre; citoplasma și limitele nu se văd'] },
      { h: DDH('fibrele de reticulină (LP 6, lama 3)'), d: ['= ambele **fibre ale țesutului conjunctiv** (reticulina = colagen tip III); ambele cer o colorație specială, nu HE', '≠ **colorația**: van Gieson, fibre roșii · reticulina: impregnație argentică, fibre negre', '≠ **grosimea și gruparea**: groase, izolate sau în fascicule · reticulina: subțiri, nu formează fascicule', '≠ **ramificarea**: !!nu se ramifică și nu se anastomozează niciodată!! · reticulina: se ramifică și se anastomozează, rețea cu ochiuri inegale'] },
    ],
    say: 'Concluzia: „Deci: **fibre de colagen, van Gieson, glanda mamară**.”',
    why: 'Spui colorația și explicația ei: colagen roșu, nuclei negru-cafeniu. EN: collagen fibres · LA: fibra collagena; glandula mammaria.',
    warn: '„Colagenul se ramifică” = greșit: fibrele trec dintr-un fascicul în altul, dar nu se ramifică și nu se anastomozează. Reticulina da.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 3 · RETICULINĂ
  {
    scene: 'lama', sceneOpts: { k: 'ret', dd: 'col' }, kick: 'LP 6 · Lama 3 din 3 · argentic · rinichi', title: 'Fibrele de reticulină: singura lamă neagră, o rețea în jurul tubilor',
    hud: ['Lama 3 din 7', '<b>argentic</b> · rinichi („Splina”)'], anim: false, spec: 'Câmp fix argentic (tubi renali + rețea neagră); încercuiește un tub în ochiul rețelei (ob. mic), apoi o ramificare cu anastomoze (ob. mare); la DD, față în față cu colagenul.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!impregnație argentică!! (nitrat de argint) · secțiune prin **rinichi** · !!fibre de reticulină!!', 'argirofile, colagen tip III · pe lama din cutie scrie „Splina”'] },
      { h: 'Ob. mic', d: ['în HE nu se văd; aici **rețea neagră** pe fond gălbui, **în jurul tubilor**', 'în ochiuri: tubii renali'] },
      { h: 'Ob. mare', d: ['traiect neregulat, **mai subțiri decât colagenul**', '**se ramifică și se anastomozează**: ochiuri de mărimi diferite, fără fascicule', 'rol: stroma organelor'] },
      { h: DDH('fibrele de colagen (LP 6, lama 2)'), d: ['= ambele fibre ale țesutului conjunctiv (reticulina = colagen tip III); ambele cer o colorație specială, nu HE', '≠ **colorația**: impregnație argentică, fibre negre · colagen: van Gieson, fibre roșii', '≠ **grosimea și gruparea**: subțiri, fără fascicule · colagen: groase, izolate sau în fascicule', '≠ **ramificarea**: !!rețea ramificată, anastomozată!! · colagen: nu se ramifică niciodată'] },
    ],
    say: 'Concluzia: „Deci: **fibre de reticulină, impregnație argentică, rinichi**.”',
    why: 'Fibrele de reticulină formează **scheletul fin (stroma)** organelor. EN: reticular fibres · LA: fibra reticularis; ren.',
    warn: 'Pe lamă scrie „Splina”, în LP: rinichi. Tubi în ochiurile rețelei = rinichi; rețea deasă, fără tubi = splină. Diagnosticul (fibre de reticulină) e **același**.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 4 · LAX
  {
    scene: 'lama', sceneOpts: { k: 'lax', dd: 'adi' }, kick: 'LP 7 · Lama 1 din 4 · HE · glanda mamară', title: 'Conjunctivul lax: roz pal, „aerisit”, în jurul glandelor',
    hud: ['Lama 4 din 7', '<b>HE</b> · glanda mamară'], anim: false, spec: 'Câmp fix de glandă mamară (lobuli + conjunctiv dens între ei); încercuiește lobulul (ob. mic), apoi un fibroblast și un capilar transversal (ob. mare); la DD, față în față cu adiposul.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin **glanda mamară** · !!țesut conjunctiv lax!!', 'celule, fibre, SF în **proporții aproximativ egale**'] },
      { h: 'Ob. mic', d: ['reperul: **lobulul mamar** (structuri glandulare grupate); **laxul e în lobul**: palid, aerisit, celule răzlețe + capilare', 'între lobuli: **conjunctiv dens**, benzi roz intens, compacte, puține celule'] },
      { h: 'Ob. mare', d: ['colagen palid roz, orientare variabilă · fibroblaste (hipocrome) / fibrocite (hipercrome) · celule migrate', 'capilare: longitudinal „dinți de fierăstrău”, hematii în șir indian; transversal 1–2 nuclei', 'elasticele și reticulina nu se văd în HE'] },
      { h: DDH('țesutul adipos alb (LP 7, lama 2)'), d: ['= pe **aceeași lamă** (glanda mamară, HE); ambele țesut conjunctiv', '≠ **ce predomină**: !!proporții egale!! · adipos: aproape numai adipocite', '≠ **celulele**: fibroblaste și fibrocite cu nuclei în bastonaș + celule migrate · adipos: adipocite mari, optic goale, nucleu turtit la periferie (inel cu pecete)', '≠ **fibrele**: colagen palid roz, în fascicule cu orientare variabilă · adipos: doar rare fibre de reticulină, invizibile în HE'] },
    ],
    say: 'Concluzia: „Deci: **țesut conjunctiv lax, glanda mamară, HE**.”',
    why: 'EN: loose areolar connective tissue · LA: textus connectivus laxus.',
    warn: 'Laxul e **în lobul**, densul **între lobuli**: nu le inversa.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 5 · ADIPOS ALB
  {
    scene: 'lama', sceneOpts: { k: 'adi', dd: 'lax' }, kick: 'LP 7 · Lama 2 din 4 · HE · glanda mamară', title: 'Țesutul adipos alb: un fagure de celule mari și goale',
    hud: ['Lama 5 din 7', '<b>HE</b> · glanda mamară'], anim: false, spec: 'Fagure fix de adipocite; încercuiește un capilar dintre celule (ob. mic), apoi nucleul turtit al unei celule (ob. mare); la DD, față în față cu laxul.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · **glanda mamară** (aceeași lamă ca laxul) · !!țesut conjunctiv adipos alb!!', 'predomină celulele; fibre și SF reduse'] },
      { h: 'Ob. mic', d: ['aproape numai celule, **limite bine vizibile**, citoplasmă incoloră: **fagure**', 'grupate în paniculi adipoși; spații intercelulare înguste, cu capilare + rare fibre de reticulină'] },
      { h: 'Ob. mare', d: ['o singură vacuolă, citoplasmă în **inel subțire**', 'nucleu **turtit, hipercrom, excentric** = !!inel cu pecete!!', 'vacuola e goală: trigliceridele dizolvate la prelucrare'] },
      { h: DDH('conjunctivul lax (LP 7, lama 1)'), d: ['= pe aceeași lamă (glanda mamară, HE); ambele țesut conjunctiv', '≠ **ce predomină**: aproape numai adipocite · lax: proporții egale', '≠ **celulele**: adipocite mari, optic goale, inel cu pecete · lax: fibroblaste, fibrocite + celule migrate', '≠ **fibrele**: !!rare fibre de reticulină, invizibile în HE!! · lax: colagen palid roz, orientare variabilă'] },
    ],
    say: 'Concluzia: „Deci: **țesut conjunctiv adipos alb, glanda mamară, HE**.”',
    why: 'Spune și explicația: lipidele s-au dizolvat la prelucrare. EN: white adipose tissue · LA: textus adiposus albus.',
    warn: 'Adipos sau sebacee (LP 4)? Adipos: **o vacuolă**, nucleu turtit periferic. Sebacee: multe vacuole, nucleu central, rând bazal.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 6 · TENDINOS
  {
    scene: 'lama', sceneOpts: { k: 'ten', dd: 'lax' }, kick: 'LP 7 · Lama 3 din 4 · HE · tendon', title: 'Conjunctivul tendinos: benzi roz paralele și nuclei gemeni',
    hud: ['Lama 6 din 7', '<b>HE</b> · tendon longitudinal'], anim: false, spec: 'Câmp fix de tendon (fascicule oblice paralele); încercuiește o fantă albă (ob. mic), apoi o pereche de nuclei gemeni (ob. mare); la DD, față în față cu laxul.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune **longitudinală** prin **tendon** · !!țesut conjunctiv tendinos!!', 'predomină fibrele, ordonat'] },
      { h: 'Ob. mic', d: ['**fascicule de colagen ordonate**, groase, roz, paralele, ușor ondulate + **tenocite puține**', 'fante albe între fascicule = artefact de prelucrare: nu se descrie'] },
      { h: 'Ob. mare', d: ['fibre groase, palid eozinofile, ușor ondulate, paralele', 'tenocite alungite, dreptunghiulare, citoplasmă slab vizibilă, nucleu ovalar, hipercrom, cap la cap: !!„nuclei gemeni”!!', 'rezistă la tracțiune într-o singură direcție'] },
      { h: DDH('conjunctivul lax (LP 7, lama 1)'), d: ['= ambele țesut conjunctiv în HE, cu fibre de colagen palid roz printre care stau celule cu nuclei alungiți', '≠ **fibrele**: groase, în fascicule dense, paralele, ordonate · lax: subțiri, izolate sau în fascicule cu orientare variabilă', '≠ **celulele**: puține tenocite, nuclei cap la cap · lax: multe celule, fibroblaste, fibrocite + celule migrate', '≠ **spațiul dintre fibre**: aproape fără spațiu clar · lax: mult spațiu clar (SF) și capilare'] },
    ],
    say: 'Concluzia: „Deci: **țesut conjunctiv tendinos, tendon, HE**.”',
    why: 'EN: dense regular connective tissue · LA: textus connectivus densus regularis; tendo.',
    warn: 'Tendon sau mușchi neted? Neted: celule fusiforme, citoplasmă proprie, nucleu central. Tendon: **fibre + nuclei gemeni**.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 7 · RETICULAR
  {
    scene: 'lama', sceneOpts: { k: 'rt', dd: 'ret' }, kick: 'LP 7 · Lama 4 din 4 · HE · nodul limfatic', title: 'Conjunctivul reticular: celule stelate și limfocite în ochiuri',
    hud: ['Lama 7 din 7', '<b>HE</b> · nodul limfatic, medulara'], anim: false, spec: 'Câmp fix de medulară (celule reticulare stelate + limfocite); încercuiește un cordon dens (ob. mic), apoi o celulă reticulară și un limfocit (ob. mare); la DD, față în față cu fibrele de reticulină.',
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin **nodul limfatic** · !!țesut conjunctiv reticular!!', 'stroma organelor limfoide'] },
      { h: 'Ob. mic', d: ['**zona medulară**: limfocite mai rare → se vede rețeaua (ochiuri clare)', 'unde limfocitele sunt dese (cordoane), rețeaua e acoperită'] },
      { h: 'Ob. mare', d: ['**celule reticulare stelate**, citoplasmă eozinofilă, nucleu mare, rotund, **hipocrom**; prelungiri anastomozate = pseudorețea', '**limfocite** în ochiuri: mici, nucleu rotund, hipercrom, citoplasmă în semilună', '!!fibrele de reticulină nu se văd în HE!!'] },
      { h: DDH('fibrele de reticulină (LP 6, lama 3)'), d: ['= aceeași **rețea de susținere** (stroma organelor), cu ochiuri în care stau alte structuri', '≠ **colorația**: HE, roz și violet · fibrele: impregnație argentică, negru pe fond gălbui', '≠ **ce vezi din rețea**: !!celulele reticulare stelate!!, nucleu hipocrom; fibrele nu se văd · argentic: fibrele negre, ramificate, anastomozate; celulele nu se colorează', '≠ **organul și ochiurile**: nodul limfatic (medulara), limfocite în ochiuri · rinichi: tubi și capilare în ochiuri'] },
    ],
    say: 'Concluzia: „Deci: **țesut conjunctiv reticular, nodul limfatic, HE**.”',
    why: 'De ce medulara? Acolo limfocitele sunt mai rare și rețeaua se vede. EN: reticular connective tissue · LA: textus connectivus reticularis; nodus lymphoideus.',
    warn: '„Văd fibrele de reticulină” la HE = greșit: vezi celulele reticulare; fibrele negre = LP 6, argentic.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- MOZAIC: CELE 7 POZE
  {
    scene: 'mosaic', kick: 'Recapitulare LP 6–7 · Pe lamele reale', title: 'Cele 7 lame, pe pozele de la disciplină',
    hud: ['poze reale', 'semnul încercuit'], anim: false, spec: 'Mozaic fix cu cele 7 lame reale; pe fiecare e încercuit semnul-cheie (localizat din pozele adnotate de la disciplină).',
    sceneOpts: { cols: 4, tiles: [] },
    points: [
      { h: '1 · Celulele țesutului conjunctiv · HE', d: ['granulație: amestec de celule + multe vase'] },
      { h: '2 · Fibre de colagen · !!van Gieson!!', d: ['totul roșu: fibre sinuoase, în fascicule'] },
      { h: '3 · Fibre de reticulină · !!argentic!!', d: ['rețea neagră, ramificată, între tubi'] },
      { h: '4 · Conjunctiv lax · HE', d: ['roz pal, „aerisit”, în lobulul mamar'] },
      { h: '5 · Adipos alb · HE', d: ['fagure de celule goale, inel cu pecete'] },
      { h: '6 · Conjunctiv tendinos · HE', d: ['benzi roz paralele, nuclei gemeni'] },
      { h: '7 · Conjunctiv reticular · HE', d: ['celule stelate + limfocite în ochiuri'] },
    ],
    beatDur: 4,
  },
  // ---------------------------------------------------------------- CAPCANE
  {
    scene: 'mosaic', kick: 'Recapitulare LP 6–7 · Capcane', title: 'Unde se pierd puncte la LP 6–7',
    hud: ['poze reale', '9 capcane'], anim: false, spec: 'Mozaic fix cu pozele capcanelor (splina, celule, colagen, pavimentos argentic, glanda mamară, reticular HE, mușchi neted, sebacee, granulație), fără cercuri.',
    sceneOpts: { cols: 3, tiles: [] },
    points: [
      { h: 'Erata · pe lamă scrie „Splina”', d: ['în LP: !!rinichi!!; tubi în ochiurile rețelei = rinichi; rețea deasă, fără tubi = splină; diagnosticul e același'] },
      { h: 'Confuzie · fibroblast vs. fibrocit', d: ['fibroblast: nucleu mare, hipocrom, nucleol (activ) · fibrocit: fusiform, hipercrom (repaus); invers = greșeala clasică'] },
      { h: 'Greșit · „colagenul se ramifică”', d: ['!!niciodată!!: trec dintr-un fascicul în altul, dar nu se ramifică, nu se anastomozează; reticulina da'] },
      { h: 'Confuzie · negru: reticulină sau pavimentos?', d: ['reticulina: fibre pe o secțiune de organ · pavimentosul (LP 2): contururi de celule pe un etalat'] },
      { h: 'Atenție · aceeași lamă, două diagnostice', d: ['glanda mamară HE = lax (conjunctivul din lobul) și adipos (zona de grăsime): citește sarcina'] },
      { h: 'Greșit · „văd fibrele de reticulină” la HE', d: ['la reticularul HE vezi **celulele reticulare**; fibrele negre = LP 6, argentic'] },
      { h: 'Confuzie · tendon sau mușchi neted?', d: ['neted: celule fusiforme, citoplasmă proprie, nucleu central · tendon: fibre + nuclei gemeni'] },
      { h: 'Confuzie · adipos sau sebacee?', d: ['adipos: o vacuolă, nucleu turtit periferic · sebacee: multe vacuole, nucleu central, rând bazal'] },
      { h: 'Puncte · spune colorația și explicația', d: ['van Gieson: colagen roșu, nuclei negru-cafeniu · granulația: țesut de reparație · adiposul: lipide dizolvate · reticularul: !!de ce medulara!!'] },
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
        ['1 Celulele țesutului conjunctiv · HE · țesut de granulație', 'amestec de celule + multe vase', 'fibroblast · fibrocit · adipocit · plasmocit · macrofag (gigantă) · limfocit', 'conjunctivul lax (LP 7, lama 1)'],
        ['2 Fibre de colagen · !!van Gieson!! · glanda mamară', 'fibre roșii în fascicule', 'linii sinuoase; nu se ramifică; nuclei negru-cafenii', 'fibrele de reticulină (LP 6, lama 3)'],
        ['3 Fibre de reticulină · !!argentic!! · rinichi (lama: „Splina”)', 'rețea neagră', 'subțiri, ramificate, anastomozate; fără fascicule', 'fibrele de colagen (LP 6, lama 2)'],
        ['4 Conjunctiv lax · HE · glanda mamară', 'roz pal, „aerisit”, în lobul', 'colagen palid, orientare variabilă; fibroblaste / fibrocite; capilare', 'țesutul adipos alb (LP 7, lama 2)'],
        ['5 Adipos alb · HE · glanda mamară', 'fagure de celule goale', 'o vacuolă; nucleu turtit, excentric = inel cu pecete', 'conjunctivul lax (LP 7, lama 1)'],
        ['6 Conjunctiv tendinos · HE · tendon', 'fibre paralele', 'fibre groase, ondulate; nuclei gemeni', 'conjunctivul lax (LP 7, lama 1)'],
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
  { img: 'splina', lab: '1 · eticheta „Splina”' }, { img: 'c_fibroblast', lab: '2 · fibroblast' }, { img: 'col', lab: '3 · colagen' },
  { img: 'pav', lab: '4 · pavimentos argentic' }, { img: 'adi', lab: '5 · lax + adipos' }, { img: 'rt', lab: '6 · reticular HE' },
  { img: 'neted', lab: '7 · mușchi neted' }, { img: 'seb', lab: '8 · glanda sebacee' }, { img: 'gr', lab: '9 · granulație' },
];
