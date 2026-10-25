// Recapitulare OSPE Histologie · LP 2–5 (epiteliile de acoperire + glandele). Textul vine din recapitularea LP 2–5
// (îndrumătorul UMFST + deck-urile LP 2–5). Roșu (!!…!!) = ce dă puncte; 1–4 pe slide.

export const GLOS = [
  ['LP', 'lucrarea practică'], ['HE', 'colorația hematoxilină-eozină'], ['OSPE', 'examen practic structurat pe stații'],
  ['DD', 'diagnostic diferențial'], ['MB', 'membrana bazală'], ['ob.', 'obiectivul'], ['EN', 'termenul în engleză'], ['LA', 'termenul în latină'],
  ['IHC', 'imunohistochimie'], ['RER', 'reticulul endoplasmatic rugos'], ['ADN', 'acidul dezoxiribonucleic'], ['PAS', 'colorația acid periodic-Schiff'],
  ['T3', 'triiodotironina'], ['T4', 'tiroxina'], ['PP', 'celulele cu polipeptid pancreatic'], ['inf.', 'inferioară'],
];
export const TERMS = [
  ['etalat', 'preparat etalat', 'membrana întinsă întreagă pe lamă, privită de sus (nu tăiată)'],
  ['crenelat', 'crenelat', 'cu margine în zigzag fin'],
  ['eucrom', 'eucrom', 'intensitate intermediară a nucleului (normocrom)'],
  ['hipercrom', 'hipercrom', 'nucleu colorat intens, închis'],
  ['picnotic', 'picnotic', 'nucleu mic, condensat, foarte închis (celula moare)'],
  ['bazofil', 'bazofil', 'ia hematoxilina (albastru-violet)'],
  ['eozinofil', 'eozinofil', 'ia eozina (roz)'],
  ['corion', 'corion', 'conjunctivul lax de sub un epiteliu'],
  ['glandilem', 'glandilem', 'membrana bazală a glandei'],
  ['adenomer', 'adenomer', 'porțiunea secretorie a glandei'],
  ['holocrin', 'holocrin', 'toată celula devine secreție'],
  ['merocrin', 'merocrin', 'secreție prin exocitoză, celula rămâne'],
  ['zimogen', 'zimogen', 'granule cu enzime (proteine), la polul apical'],
  ['cromafin', 'cromafine', 'celulele medularei, cu granule de catecolamine'],
  ['lipofuscin', 'lipofuscină', 'pigment brun de uzură'],
  ['mioepitelial', 'mioepiteliale', 'celule contractile în jurul acinilor'],
  ['centroacinoas', 'centroacinoase', 'celule palide în centrul acinului pancreatic'],
  ['tiroglobulin', 'tiroglobulina', 'proteina coloidului, din care se eliberează T3 și T4'],
  ['microvilozit', 'microvilozități', 'prelungiri fine ale polului apical (absorbție)'],
];

const DDH = (who) => `DD · cu ${who}`;

export const SLIDES = [
  // ---------------------------------------------------------------- 1 · HARTA
  {
    deckName: 'Histologie · Recapitulare LP 2–5 · Epiteliile (OSPE)',
    scene: 'cover', kick: 'Histologie · Recapitulare LP 2–5 · OSPE', title: 'Cele 12 lame din LP 2–5, dintr-o privire',
    hud: ['12 lame', 'LP 2–5'],
    points: [
      { h: 'LP 2 · Epiteliile de acoperire I', d: ['**1** simplu pavimentos · !!impregnație argentică!!: contururi negre, crenelate, fără nuclei', '**2** simplu cubic · HE: lumen mic, gol; nucleu rotund, central', '**3** simplu prismatic · HE: nuclei în bandă bazală + platou striat'] },
      { h: 'LP 3 · Epiteliile de acoperire II', d: ['**4** pseudostratificat · HE: nuclei etajați + cili + caliciforme', '**5** stratificat pavimentos necheratinizat · HE: turtite sus, cu nuclei păstrați', '**6** uroteliul · HE: umbreliforme roz sus, rachete la mijloc'] },
      { h: 'LP 4 · Glandele exocrine', d: ['**7** tubulară simplă · HE: tuburi paralele, pline de caliciforme palide', '**8** sebacee · HE: săculeț de celule spumoase → holocrin', '**9** tubulo-acinoasă · HE: acini seroși închiși + mucoși palizi + Gianuzzi'] },
      { h: 'LP 5 · Glandele endocrine', d: ['**10** tiroida · HE: foliculi de mărimi diferite, plini cu coloid roz', '**11** suprarenala · HE: corticală în 3 zone (fasciculata palidă, în coloane) + medulară', '**12** insula Langerhans · HE: insule palide, fără lumen, printre acini seroși'] },
    ],
    why: 'Un singur material: cum le recunoști dintr-o privire, scheletul răspunsului în ordinea de punctaj și DD-ul cu **o singură lamă** (1 asemănare + 3 diferențe). Scripturile complete rămân în deck-urile LP. **Singura lamă care nu e HE: lama 1 (argentic).**',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 2 · FORMATUL OSPE
  {
    scene: 'ospe', kick: 'Recapitulare LP 2–5 · Formatul OSPE', title: 'La fiecare lamă spui 3 lucruri, în ordinea asta',
    hud: ['Stația = 7 minute'],
    points: [
      { h: 'Recunoașterea · primele 30 de secunde', d: ['!!lama (organul) + colorația + diagnosticul!!'] },
      { h: 'Descrierea', d: ['**ob. mic**: arhitectura · **ob. mare**: celula (formă, citoplasmă, nucleu, pol apical)'] },
      { h: 'Diagnosticul diferențial', d: ['**o singură lamă** care se confundă: !!1 asemănare + 3 diferențe!!'] },
      { h: 'Concluzia', d: ['examinatorul: „mai e 1 minut” → spui concluzia'] },
    ],
    say: '1 min citești sarcina (ciornă) · 6 min răspunzi: spui scriptul (2–3 min), **începi DEVREME**, apoi completezi. Contează doar ce spui cu voce tare.',
    why: 'Cum lucrezi cu recapitularea: te uiți la imagine, spui cu voce tare scheletul (recunoaștere → ob. mic → ob. mare → DD) și abia apoi citești. Pornește cronometrul: 2–3 minute pe lamă.',
    warn: '= **ORDINEA DE PUNCTAJ** la Histologie: ce spui în afara ordinii riscă să nu fie bifat.',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 3 · ARBORELE
  {
    scene: 'tree', kick: 'Recapitulare LP 2–5 · Arborele epiteliilor', title: 'Unde stă fiecare lamă: 2 ramuri, 4 grupe, 12 lame',
    hud: ['de acoperire · glandular'],
    points: [
      { h: 'De acoperire (LP 2–3): 2 întrebări', d: ['**câte rânduri?** 1 rând, toate pe MB → simplu · nuclei la înălțimi diferite → pseudostratificat (există doar în varianta „înaltă”) · mai multe rânduri → stratificat (numele = stratul de sus)', '**ce formă are celula?** turtită → pavimentos · pătrată → cubic · înaltă → prismatic (cilindric); forma nucleului copiază forma celulei'] },
      { h: 'Exocrin (LP 4): păstrează canalul · 3 întrebări', d: ['**câte celule?** 1, fără canal = celula caliciformă · multe + canal = lamele LP 4', '**canalul:** !!neramificat → simplă · ramificat → compusă!! (nu numărul de rânduri)', '**adenomerul:** tub → tubulară · săculeț → alveolară · boabă cu lumen mic → acinoasă; tuburi + acini → tubulo-acinoasă'] },
      { h: 'Endocrin (LP 5): fără canal, lângă capilare', d: ['capsulă cu septe · stromă cu multe capilare · parenchim în **foliculi** (tiroida), **cordoane, cuiburi** (suprarenala), **insule** (pancreas)', 'truc la ob. mic: !!lumen + canal = exocrin; fără lumen = endocrin!!; excepția: cavitatea tiroidei = depozit de coloid, nu canal'] },
      { h: 'Trucul de OSPE', d: ['epiteliul stă mereu pe o **membrană bazală** (EN: basement membrane; LA: membrana basalis)', 'pseudostratificatul e **simplu**: toate celulele ating MB · uroteliul = stratificat special, cu umbreliforme'] },
    ],
    why: 'Holocrin (sebacee) = toată celula devine secreție; merocrin = exocitoză. Numerele = lamele din recapitulare (LP 4: 1–3 = 7–9; LP 5: 1–3 = 10–12).',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 1 · SIMPLU PAVIMENTOS
  {
    scene: 'lama', sceneOpts: { k: 'pav', dd: 'cub' }, kick: 'LP 2 · Lama 1 din 12 · argentic · mezenter', title: 'Epiteliul simplu pavimentos',
    hud: ['Lama 1 din 12', '<b>argentic</b> · mezenter etalat'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!epiteliu simplu pavimentos!! (mezoteliu) · mezenter, **preparat etalat** · !!impregnație argentică!!', 'singura lamă din LP 2 care nu e HE: începi cu colorația'] },
      { h: 'Ob. mic', d: ['celule **poligonale, strâns unite**, ca pietrele de pavaj; le vezi de sus'] },
      { h: 'Ob. mare', d: ['limite **crenelate, negru-brune** = argint precipitat în spațiile intercelulare', '!!nucleul, nucleolul, citoplasma nu se colorează!!: interiorul „gol”', 'un rând de celule turtite: **căptușire și schimburi**'] },
      { h: DDH('simplu cubic (LP 2, lama 2)'), d: ['= ambele **epitelii simple**: un singur rând de celule pe MB', '≠ **colorația**: argentic, linii negre pe fond gălbui · cubic: HE, roz-violet', '≠ **preparatul**: !!etalat, privit de sus!! · cubic: secțiune prin medulara renală, cu lumenele tubilor colectori', '≠ **celula și nucleul**: contururi poligonale, crenelate, fără nuclei vizibili · cubic: celule „pătrate”, nucleu rotund, central'] },
    ],
    why: 'Argintul pătrunde în spațiile intercelulare și precipită ca argint metalic negru: **colorație de contur** (formă + limite, fără organite). EN: simple squamous epithelium; mesothelium · LA: epithelium simplex squamosum.',
    warn: '„Secțiune prin mezenter” = greșit: e un **etalat**. „Nuclei turtiți” la argentic = greșit: nucleii nu se colorează; nu descrie ce nu se vede.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 2 · SIMPLU CUBIC
  {
    scene: 'lama', sceneOpts: { k: 'cub', dd: 'pri' }, kick: 'LP 2 · Lama 2 din 12 · HE · rinichi', title: 'Epiteliul simplu cubic',
    hud: ['Lama 2 din 12', '<b>HE</b> · medulara renală'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin **medulara rinichiului** · !!epiteliu simplu cubic!! în **tubii colectori**'] },
      { h: 'Ob. mic', d: ['lumene **mici, rotunde, goale**, tapetate de **un singur rând** de celule pe MB', 'hematiile printre tubi = capilarele, nu epiteliul'] },
      { h: 'Ob. mare', d: ['celule **pătrate**: înălțime ≈ lățime; citoplasmă **palid eozinofilă**', '!!nucleu rotund, eucrom, central!!; pol apical **fără specializări**', 'rol: absorbție, secreție, căptușire'] },
      { h: DDH('simplu prismatic (LP 2, lama 3)'), d: ['= ambele **epitelii simple**, un singur rând pe MB, colorate HE', '≠ **forma celulei**: cubică (înălțimea ≈ lățimea) · prismatic: !!celule înalte!!', '≠ **nucleul**: rotund, central · prismatic: ovalar, alungit, în jumătatea bazală, nucleii aliniați în bandă', '≠ **polul apical**: fără platou striat · prismatic: platou striat (microvilozități)'] },
    ],
    why: 'HE: hematoxilina colorează albastru-violet ce e acid (ADN → nucleii); eozina, roz proteinele citoplasmei. Forma nucleului copiază forma celulei. EN: simple cuboidal epithelium; collecting duct · LA: epithelium simplex cuboideum; tubulus colligens.',
    warn: 'Cubic sau tiroidă? Tubul colector: **lumen mic și gol**. Foliculul tiroidian: cavitate mare, cu coloid roz.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 3 · SIMPLU PRISMATIC
  {
    scene: 'lama', sceneOpts: { k: 'pri', dd: 'cub' }, kick: 'LP 2 · Lama 3 din 12 · HE · vezica biliară', title: 'Epiteliul simplu prismatic (cilindric)',
    hud: ['Lama 3 din 12', '<b>HE</b> · vezica biliară'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin peretele **vezicii biliare** · !!epiteliu simplu prismatic cu platou striat!!'] },
      { h: 'Ob. mic', d: ['mucoasă cu **pliuri**, **un singur rând** de celule înalte', 'corionul (sub MB): conjunctiv cu vase, în axul pliurilor; lumenul dintre pliuri'] },
      { h: 'Ob. mare', d: ['nuclei **alungiți, paraleli, perpendiculari pe MB**, în jumătatea inferioară: !!nucleii în „bandă”!!', 'limite celulare doar spre polul apical', '**platou striat**: pol apical îngroșat, striat = microvilozități → absorbție, concentrează bila'] },
      { h: DDH('simplu cubic (LP 2, lama 2)'), d: ['= ambele **epitelii simple**, un singur rând pe MB, colorate HE', '≠ **forma celulei**: prismatică, celule înalte · cubic: înălțimea ≈ lățimea', '≠ **nucleul**: ovalar, alungit, bazal, în bandă · cubic: rotund, central', '≠ **polul apical**: !!platou striat!! · cubic: fără platou striat'] },
    ],
    why: 'Vezica biliară concentrează bila: celulă de absorbție, cu microvilozități. EN: simple columnar epithelium; striated border · LA: epithelium simplex columnare; vesica biliaris.',
    warn: 'Prismatic sau pseudostratificat? Prismaticul: nuclei la același nivel, platou striat, **fără cili, fără caliciforme**. Pseudostratificatul: nuclei la înălțimi diferite, cili, caliciforme.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 4 · PSEUDOSTRATIFICAT
  {
    scene: 'lama', sceneOpts: { k: 'ps', dd: 'uro' }, kick: 'LP 3 · Lama 4 din 12 · HE · trahee', title: 'Epiteliul pseudostratificat',
    hud: ['Lama 4 din 12', '<b>HE</b> · trahee'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin peretele **traheei** · !!epiteliu pseudostratificat cilindric ciliat!! cu celule caliciforme (epiteliul respirator)'] },
      { h: 'Ob. mic', d: ['**un singur rând**: toate celulele pe MB, nu toate ajung sus', 'nuclei în **2/3 bazale**, la înălțimi diferite → falsă stratificare; treimea superioară: citoplasmă eozinofilă, fără nuclei', 'corionul: conjunctiv lax cu vase, sub MB'] },
      { h: 'Ob. mare', d: ['nuclei **rotunzi** (lângă MB) · **rotund-ovalari** (mijloc) · **în bastonaș** (sus)', '**cili**: margine fină „în perie” la polul apical; **caliciforme** palide → escalatorul mucociliar'] },
      { h: DDH('uroteliul (LP 3, lama 3)'), d: ['= nucleii pe mai multe niveluri: la ob. mic ambele par „cu multe rânduri”; HE', '≠ **câte rânduri**: !!un singur rând, toate celulele ating MB!! · uroteliu: stratificat real (bazal, rachete, umbreliforme)', '≠ **suprafața**: cili + caliciforme palide · uroteliu: umbreliforme mari, intens eozinofile, 1–2 nuclei, fără cili', '≠ **organul și rolul**: traheea, escalatorul mucociliar · vezica urinară: barieră impermeabilă care se destinde'] },
    ],
    why: 'Bazalele sunt celule de rezervă (refac ciliatele și caliciformele). Caliciforma e „goală” în HE: mucusul nu reține coloranții (magenta în PAS). EN: pseudostratified ciliated columnar epithelium · LA: epithelium pseudostratificatum columnare ciliatum.',
    warn: '„Pseudostratificatul e stratificat” = greșit: e **epiteliu simplu**. Citește sarcina: aceeași lamă de trahee apare la LP 8 pentru cartilajul hialin.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 5 · STRATIFICAT PAVIMENTOS NECHERATINIZAT
  {
    scene: 'lama', sceneOpts: { k: 'es', dd: 'uro' }, kick: 'LP 3 · Lama 5 din 12 · HE · esofag', title: 'Epiteliul stratificat pavimentos necheratinizat',
    hud: ['Lama 5 din 12', '<b>HE</b> · esofag'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin peretele **esofagului** · !!epiteliu stratificat pavimentos necheratinizat!!: fără strat cornos, nucleii păstrați sus', 'ob. mic: multe rânduri suprapuse pe o **MB sinuoasă**'] },
      { h: 'Stratul bazal', d: ['**un rând** cubo-cilindric, **bazofil**, nuclei **hipercromi**; celule mici'] },
      { h: 'Stratul spinocelular', d: ['celule **poligonale, eozinofile**, nucleu **rotund, central**'] },
      { h: 'Stratul superficial', d: ['celule **turtite**, paralele cu MB, citoplasmă palidă', '!!nucleu picnotic, excentric, dar prezent!!'] },
      { h: DDH('uroteliul (LP 3, lama 3)'), d: ['= ambele **stratificate**, cu stratul bazal identic (cubo-cilindric, citoplasmă bazofilă); HE', '≠ **stratul mijlociu**: poligonale (spinocelular) · uroteliu: rachete de tenis', '≠ **stratul superficial**: turtite, palide, nucleu picnotic, excentric · uroteliu: !!umbreliforme intens eozinofile, 1–2 nuclei!!', '≠ **MB**: sinuoasă, vizibilă · uroteliu: invizibilă în HE'] },
    ],
    why: 'Reînnoire de jos în sus: bazalul se divide, celulele urcă, se turtesc, se descuamează. Suprafața umedă → fără cheratină; stratificarea rezistă la frecare (bolul alimentar). EN: non-keratinized stratified squamous epithelium · LA: epithelium stratificatum squamosum noncornificatum; oesophagus.',
    warn: 'Nuclei sus = cheratinizat? **Invers.** Necheratinizat (esofag) = nuclei picnotici păstrați sus. Cheratinizat (epiderm) = strat cornos fără nuclei.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 6 · UROTELIUL
  {
    scene: 'lama', sceneOpts: { k: 'uro', dd: 'es' }, kick: 'LP 3 · Lama 6 din 12 · HE · vezica urinară', title: 'Uroteliul (epiteliul tranzițional)',
    hud: ['Lama 6 din 12', '<b>HE</b> · vezica urinară'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin peretele **vezicii urinare** · !!uroteliu (epiteliu tranzițional)!!: stratificat particular, numai în căile urinare', 'ob. mic: aspect stratificat; lumen + pliuri (vezica goală)'] },
      { h: 'Stratul bazal', d: ['celule **cubo-cilindrice**', '!!MB invizibilă în HE!!'] },
      { h: 'Celulele în rachetă de tenis', d: ['cap rotunjit sus, coadă îngustă; nucleu **rotund, eucrom, central**'] },
      { h: 'Celulele umbreliforme', d: ['mari, **intens eozinofile**, **1–2 nuclei**; fiecare acoperă **2–3 rachete**', '→ distensie + barieră impermeabilă'] },
      { h: DDH('stratificat pavimentos necheratinizat (LP 3, lama 2)'), d: ['= ambele **stratificate**, cu stratul bazal identic (cubo-cilindric, bazofil); HE', '≠ **stratul mijlociu**: !!rachete de tenis!! · esofag: poligonale (spinocelular)', '≠ **stratul superficial**: umbreliforme, intens eozinofile, 1–2 nuclei · esofag: turtite, palide, picnotic', '≠ **MB**: invizibilă în HE · esofag: sinuoasă, vizibilă'] },
    ],
    why: 'Vezica plină: peretele se întinde, celulele se turtesc; membrana apicală a umbreliformelor are plăci rigide (uroplachine) → barieră la urină. EN: urothelium; transitional epithelium · LA: urothelium; vesica urinaria.',
    warn: 'MB la uroteliu: **invizibilă în HE**, nu o descrie (la esofag e sinuoasă, vizibilă). Stratul mijlociu: esofag = spinocelular, uroteliu = rachete; nu le amesteca.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 7 · GLANDA TUBULARĂ SIMPLĂ
  {
    scene: 'lama', sceneOpts: { k: 'tub', dd: 'sub' }, kick: 'LP 4 · Lama 7 din 12 · HE · colon', title: 'Glanda tubulară simplă (Lieberkühn)',
    hud: ['Lama 7 din 12', '<b>HE</b> · colon'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin peretele **colonului** · !!glandă tubulară simplă (glanda Lieberkühn)!!: tuburi drepte, paralele'] },
      { h: 'Ob. mic', d: ['invaginarea epiteliului: **fund, corp, gât**; degete de mănușă, perpendiculare pe suprafață', 'MB = **glandilem**; lumen îngust; corionul dintre glande; gâturile se deschid la suprafața mucoasei'] },
      { h: 'Ob. mare', d: ['**caliciforme**: !!cupă de șampanie!!, nucleu bazal **turtit, hipercrom**, mucus necolorat (palide în HE)', '**absorbante**: înalte, eozinofile, nuclei în 1/3 inferioară'] },
      { h: DDH('glanda tubulo-acinoasă (LP 4, lama 3)'), d: ['= ambele **exocrine**, cu adenomeri care au lumen, delimitați de MB; HE', '≠ **adenomerul**: !!tuburi drepte, paralele!! (deget de mănușă) · tubulo-acinoasa: acini rotunzi, în lobuli', '≠ **celulele**: caliciforme + absorbante · tubulo-acinoasa: acini seroși, mucoși, micști (Gianuzzi)', '≠ **canalul**: simplă, gâtul se deschide direct la suprafață · compusă: canal ramificat'] },
    ],
    why: 'Colonul absoarbe apa: mucusul ușurează trecerea conținutului. Caliciforma = glandă unicelulară, secreție merocrină (exocitoză). EN: simple tubular gland; intestinal crypt · LA: glandula tubulosa simplex; glandula intestinalis.',
    warn: '„Golurile” nu sunt artefacte: sunt **mucus** (albastru alcian +). „Simplă” nu înseamnă un singur strat: simplă / compusă = canal neramificat / ramificat.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 8 · GLANDA SEBACEE
  {
    scene: 'lama', sceneOpts: { k: 'seb', dd: 'sub' }, kick: 'LP 4 · Lama 8 din 12 · HE · buză', title: 'Glanda alveolară simplă (sebacee)',
    hud: ['Lama 8 din 12', '<b>HE</b> · buză'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin **buză** · !!glandă alveolară simplă = glanda sebacee!!, secreție **holocrină**', 'ob. mic: săculeți + canal de excreție scurt, la rădăcina firului de păr'] },
      { h: 'Celule mari, poliedrice, vacuolare', d: ['citoplasmă **spumoasă**, limite clare (sebumul se dizolvă la prelucrare)'] },
      { h: 'Periferia: celulele bazale', d: ['un rând de celule **cubice, mici, bazofile**, pe MB → regenerarea'] },
      { h: 'Spre canal: dezintegrare', d: ['nucleu **picnotic, excentric**, celula se dezintegrează = **sebum** (holocrin)'] },
      { h: DDH('glanda tubulo-acinoasă (LP 4, lama 3)'), d: ['= ambele **exocrine**, cu adenomeri rotunjiți (săculeți, respectiv acini); HE', '≠ **lumenul**: !!fără lumen: săculeț plin de celule!! · acini cu lumen (punctiform la seroși, larg la mucoși)', '≠ **celulele**: mari, spumoase, nucleu picnotic spre canal · seroase (bazofile bazal, zimogen) și mucoase (palide, nucleu turtit)', '≠ **secreția**: !!holocrin!!, toată celula devine sebum · merocrin: exocitoză, celula rămâne'] },
    ],
    why: 'O singură lamă = tot ciclul celulei: bazala se divide → se încarcă cu sebum → nucleu picnotic → membrana se rupe → sebum în canal. EN: sebaceous gland; holocrine secretion · LA: glandula sebacea; labium oris.',
    warn: 'Holocrin = toată celula devine secreție (sebacee). Merocrin = exocitoză, celula rămâne (caliciforma, acinii salivari). Golurile = **lipide** (Szekely +), nu artefacte.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 9 · GLANDA TUBULO-ACINOASĂ COMPUSĂ
  {
    scene: 'lama', sceneOpts: { k: 'sub', dd: 'tub' }, kick: 'LP 4 · Lama 9 din 12 · HE · submandibulara', title: 'Glanda tubulo-acinoasă compusă (mixtă)',
    hud: ['Lama 9 din 12', '<b>HE</b> · glanda submandibulară'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin **glanda submandibulară** · !!glandă tubulo-acinoasă compusă, mixtă (seromucoasă)!!', 'ob. mic: aspect **heterogen**: acini diferiți ca formă, mărime, culoare'] },
      { h: 'Acinul mucos', d: ['**mijlociu**, 4–6 celule mucoase; citoplasmă **palidă**, discret bazofilă', 'nucleu **turtit, bazal**; lumen **larg**'] },
      { h: 'Acinul seros', d: ['**cel mai mic**, 6–8 celule; bazofil subnuclear, eozinofil apical (granule de zimogen)', 'nucleu **rotund, central**; lumen **punctiform** · în submandibulară, pancreas (doar seroși), parotidă'] },
      { h: 'Acinul mixt', d: ['**cel mai mare**: 4–6 mucoase + !!semiluna Gianuzzi (3–5 celule seroase)!!; lumen larg', '**celule mioepiteliale** (la toți acinii, între MB și celule): contractile, expulzează saliva'] },
      { h: DDH('glanda tubulară simplă (LP 4, lama 1)'), d: ['= ambele **exocrine**, cu adenomeri care au lumen, delimitați de MB; HE', '≠ **adenomerul**: !!acini rotunzi, grupați în lobuli!! · tubulara: tuburi drepte, paralele', '≠ **celulele**: acini seroși, mucoși, micști (Gianuzzi) · tubulara: caliciforme + absorbante', '≠ **canalul**: compusă, canal ramificat · simplă: gâtul direct la suprafață'] },
    ],
    why: 'Culoarea arată ce fabrică celula: seroasa face enzime (RER bazofil, zimogen eozinofil), mucoasa face mucus (palidă, nucleul turtit de mucus). EN: compound tubuloacinar gland; submandibular gland · LA: glandula submandibularis.',
    warn: 'Îndrumătorul: text 3–5 celule seroase în semilună, tabel 3–4 → spui **„3–5”**. Eticheta imaginii LP scrie la seros „nucleu bazal”; îndrumătorul: **rotund, central** (varianta de spus).',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 10 · TIROIDA
  {
    scene: 'lama', sceneOpts: { k: 'tir', dd: 'sr' }, kick: 'LP 5 · Lama 10 din 12 · HE · tiroida', title: 'Glanda tiroidă (foliculi)',
    hud: ['Lama 10 din 12', '<b>HE</b> · tiroida'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin **glanda tiroidă** · glandă endocrină cu celulele în !!foliculi plini cu coloid roz, omogen!!'] },
      { h: 'Ob. mic', d: ['capsulă, septe; foliculi de **mărimi diferite** = stadii de activitate', 'mici, cu epiteliu mai înalt = **mai activi** · stroma: conjunctiv fin, capilare fenestrate'] },
      { h: 'Ob. mare: epiteliul + coloidul', d: ['**un singur rând**: turtit (repaus) / cubic (secretă coloidul) / cilindric (îl reabsoarbe) → T4, T3', 'coloid **eozinofil** (tiroglobulina)'] },
      { h: 'Celulele C', d: ['lângă MB, **nu ating coloidul** → calcitonina', 'se identifică sigur **doar prin IHC**'] },
      { h: DDH('glanda suprarenală (LP 5, lama 2)'), d: ['= ambele **endocrine**: fără canal, capsulă conjunctivă, capilare bogate; HE', '≠ **așezarea**: !!foliculi!! (sfere tapetate de un rând de celule) · suprarenala: cuiburi și cordoane', '≠ **conținutul**: cavitate cu coloid roz, omogen · fără cavitate, fără coloid; fasciculata spumoasă (lipide)', '≠ **arhitectura**: lobuli cu foliculi de mărimi diferite · corticală în 3 zone + medulară'] },
    ],
    why: 'Singura glandă care își stochează hormonul extracelular (coloidul). Celula care resoarbe coloidul devine înaltă. EN: thyroid gland; thyroid follicle · LA: glandula thyroidea; folliculus thyroideus.',
    warn: 'Cavitatea = „lumen”, deci exocrină? **Nu**: e un depozit de coloid, nu un canal; hormonii pleacă în capilare. „Văd celulele C” = greșit: doar IHC.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 11 · SUPRARENALA
  {
    scene: 'lama', sceneOpts: { k: 'sr', dd: 'tir' }, kick: 'LP 5 · Lama 11 din 12 · HE · suprarenala', title: 'Glanda suprarenală (cuiburi și cordoane)',
    hud: ['Lama 11 din 12', '<b>HE</b> · suprarenala'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin **glanda suprarenală** · endocrină cu celule în cuiburi și cordoane · !!corticală în 3 zone + medulară!!', 'ob. mic: capsulă fină, corticala periferică (cea mai mare parte), medulara centrală (~20%)', '**glomerulară** (sub capsulă): cuiburi arcuite, mici, bazofile'] },
      { h: 'Zona fasciculată', d: ['**cea mai groasă**; coloane; celule **mari, palide, vacuolare** = lipide'] },
      { h: 'Zona reticulată', d: ['**cea mai profundă**; cordoane scurte, anastomozate; celule mici, intens eozinofile; lipofuscină'] },
      { h: 'Medulara', d: ['celule **cromafine**, bazofile, granulare, în cuiburi'] },
      { h: DDH('glanda tiroidă (LP 5, lama 1)'), d: ['= ambele **endocrine**: fără canal, capsulă conjunctivă, capilare bogate; HE', '≠ **așezarea**: !!cuiburi și cordoane!! · tiroida: foliculi', '≠ **conținutul**: fără cavitate, fără coloid; fasciculata spumoasă · tiroida: cavitate cu coloid roz', '≠ **arhitectura**: corticală în 3 zone + medulară · tiroida: lobuli cu foliculi de mărimi diferite'] },
    ],
    why: 'Lipidele (colesterol → hormoni steroizi, cortizol) se dizolvă la prelucrare → fasciculata „spumoasă”; granulele cromafine (catecolamine) rămân. EN: adrenal gland · LA: glandula suprarenalis; cortex et medulla.',
    warn: 'Ordinea, de la capsulă: !!glomerulară → fasciculată → reticulată → medulara!!. Fasciculata = cea mai groasă, reticulata = cea mai profundă.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 12 · INSULA LANGERHANS
  {
    scene: 'lama', sceneOpts: { k: 'pan', dd: 'sr' }, kick: 'LP 5 · Lama 12 din 12 · HE · pancreas', title: 'Insula Langerhans (pancreasul endocrin)',
    hud: ['Lama 12 din 12', '<b>HE</b> · pancreas'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · secțiune prin **pancreas**, glandă mixtă · !!insulele Langerhans!!: pete rotunde, palide printre acinii seroși', 'ob. mic: capsulă, septe, lobuli; exocrin **numai din acini seroși** + canale'] },
      { h: 'Insula', d: ['rotund-ovalară, palidă; celule **mici, în cuiburi**, citoplasmă palidă, capilare; **fără lumen**', 'α, β, δ, PP !!nu se deosebesc în HE → IHC!!'] },
      { h: 'Acinii seroși', d: ['6–8 celule; **bazofil subnuclear**, **zimogen supranuclear**; celule centroacinoase', 'fondul violet = pancreasul exocrin'] },
      { h: 'Septul conjunctiv', d: ['fâșie albă: lobuli separați **incomplet**'] },
      { h: DDH('glanda suprarenală (LP 5, lama 2)'), d: ['= ambele **țesut endocrin**: celule în cuiburi, fără lumen și fără canal, lângă capilare; HE', '≠ **tipul de glandă**: !!pancreasul e glandă mixtă!!, insule printre acini seroși · suprarenala: numai endocrină, fără acini', '≠ **arhitectura**: insula fără zone, cuib rotund cu capsulă foarte fină · corticală în 3 zone + medulară', '≠ **celulele**: mici, palide, α/β/δ/PP la fel în HE · fasciculata: celule mari, spumoase, în coloane lungi, paralele'] },
    ],
    why: 'Acinii sunt plini de RER (bazofil) și zimogen → închiși; insula e mai palidă: o găsești din prima privire. β → insulină · α → glucagon · δ → somatostatină. EN: pancreatic islet, islet of Langerhans · LA: insula pancreatica.',
    warn: '„Văd celulele beta” = greșit: α, β, δ, PP nu se deosebesc sigur în HE; spune că se identifică prin **IHC**.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- MOZAIC: CELE 12 POZE
  {
    scene: 'mosaic', kick: 'Recapitulare LP 2–5 · Pe lamele reale', title: 'Cele 12 lame, pe pozele de la disciplină',
    hud: ['poze reale', 'câte una pe pătrat'],
    sceneOpts: { cols: 4, tiles: [] },
    points: [
      { h: '1 · Simplu pavimentos · !!argentic!!', d: ['contururi negre, crenelate, fără nuclei'] },
      { h: '2 · Simplu cubic · HE', d: ['lumen mic, gol; nucleu rotund, central'] },
      { h: '3 · Simplu prismatic · HE', d: ['nuclei în bandă bazală + platou striat'] },
      { h: '4 · Pseudostratificat · HE', d: ['nuclei etajați + cili + caliciforme'] },
      { h: '5 · Stratificat pavimentos necheratinizat · HE', d: ['turtite sus, cu nuclei păstrați'] },
      { h: '6 · Uroteliul · HE', d: ['umbreliforme roz sus, rachete la mijloc'] },
      { h: '7 · Tubulară simplă · HE', d: ['tuburi paralele, pline de caliciforme palide'] },
      { h: '8 · Sebacee · HE', d: ['săculeț de celule spumoase → holocrin'] },
      { h: '9 · Tubulo-acinoasă · HE', d: ['acini seroși închiși + mucoși palizi'] },
      { h: '10 · Tiroida · HE', d: ['foliculi de mărimi diferite, coloid roz'] },
      { h: '11 · Suprarenala · HE', d: ['fasciculata palidă, în coloane'] },
      { h: '12 · Insula Langerhans · HE', d: ['insule palide, fără lumen, printre acini'] },
    ],
    beatDur: 4,
  },
  // ---------------------------------------------------------------- CAPCANE VIZUALE
  {
    scene: 'mosaic', kick: 'Recapitulare LP 2–5 · Capcane vizuale', title: 'Unde se pierd puncte: lame care seamănă între ele',
    hud: ['poze reale', 'perechi care se confundă'],
    sceneOpts: { cols: 4, tiles: [] },
    points: [
      { h: 'Simplu pavimentos · argentic', d: ['**contururi poligonale închise, lipite**; preparat etalat'] },
      { h: 'Fibrele de reticulină · tot argentic', d: ['negru = reticulină? ambele sunt argentice: aici **fibre ramificate, pe o secțiune de organ**'] },
      { h: 'Esofag · necheratinizat', d: ['sus: celule turtite cu !!nuclei picnotici păstrați!!'] },
      { h: 'Epiderm · cheratinizat (LP 12)', d: ['sus: **strat cornos** roz, **fără nuclei**: invers față de esofag'] },
      { h: 'Glanda sebacee · HE', d: ['săculeți cu **strat bazal**, nuclei picnotici spre canal; celule cu multe vacuole mici (manual)'] },
      { h: 'Zona fasciculată · HE', d: ['celule spumoase **în coloane** (lipide dizolvate)'] },
      { h: 'Țesut adipos alb · HE (LP 7)', d: ['adipocitul: **o singură vacuolă**, nucleu turtit periferic'] },
    ],
    why: 'Toate „golurile” (sebacee, fasciculată, adipocit) vin din lipidele extrase de solvenți (alcool, xilen) la prelucrare. Le deosebești după **așezare și nucleu**, nu după culoare.',
    beatDur: 5,
  },
  // ---------------------------------------------------------------- TABELUL FINAL 1/2
  {
    scene: 'recap', sceneOpts: { keys: ['pav', 'cub', 'pri', 'ps', 'es', 'uro'], first: 1 }, kick: 'Tabelul final (1/2) · LP 2–3', title: 'Epiteliile de acoperire: tot ce spui, pe un rând',
    hud: ['lamele 1–6'],
    table: {
      head: ['Lama · colorație · organ', 'Ob. mic', 'Ob. mare', 'DD'],
      rows: [
        ['1 Simplu pavimentos · !!argentic!! · mezenter (etalat)', 'celule poligonale, strâns unite, pavaj', 'limite crenelate negre; nucleu și citoplasmă necolorate', 'simplu cubic (LP 2, lama 2)'],
        ['2 Simplu cubic · HE · rinichi (medulară)', 'tubi colectori, un rând pe MB, lumen mic, gol', 'celule pătrate, palid eozinofile, nucleu rotund, central', 'simplu prismatic (LP 2, lama 3)'],
        ['3 Simplu prismatic · HE · vezica biliară', 'pliuri; celule înalte; nuclei în bandă bazală', 'limite doar apical; platou striat; fără cili, fără caliciforme', 'simplu cubic (LP 2, lama 2)'],
        ['4 Pseudostratificat · HE · trahee', 'cilindric înalt; nuclei în 2/3 bazale, la înălțimi diferite', '3 forme de nuclei; cili; caliciforme palide', 'uroteliul (LP 3, lama 3)'],
        ['5 Stratificat pavimentos necheratinizat · HE · esofag', 'multe rânduri pe MB sinuoasă', 'bazal bazofil, hipercrom · spinocelular poligonal · superficial turtit, picnotic', 'uroteliul (LP 3, lama 3)'],
        ['6 Uroteliul · HE · vezica urinară', 'stratificat; MB invizibilă', 'bazal · rachetă de tenis · umbreliforme eozinofile (1–2 nuclei)', 'stratificat pavimentos necheratinizat (LP 3, lama 2)'],
      ],
    },
    beatDur: 5,
  },
  // ---------------------------------------------------------------- TABELUL FINAL 2/2
  {
    scene: 'recap', sceneOpts: { keys: ['tub', 'seb', 'sub', 'tir', 'sr', 'pan'], first: 7 }, kick: 'Tabelul final (2/2) · LP 4–5', title: 'Glandele exocrine și endocrine: tot ce spui, pe un rând',
    hud: ['lamele 7–12'],
    table: {
      head: ['Lama · colorație · organ', 'Ob. mic', 'Ob. mare', 'DD'],
      rows: [
        ['7 Glanda tubulară simplă (Lieberkühn) · HE · colon', 'glande paralele: fund, corp, gât; lumen îngust', 'caliciforme (cupă de șampanie) + absorbante (nuclei în 1/3 inf.)', 'tubulo-acinoasă (LP 4, lama 3)'],
        ['8 Glanda alveolară simplă (sebacee) · HE · buză', 'săculeț + canal scurt spre firul de păr', 'bazale bazofile → celule vacuolare → dezintegrare (!!holocrin!!)', 'tubulo-acinoasă (LP 4, lama 3)'],
        ['9 Glanda tubulo-acinoasă compusă, mixtă · HE · submandibulară', 'aspect heterogen: acini diferiți', 'seros (lumen punctiform) · mucos (palid) · mixt (Gianuzzi 3–5) · mioepiteliale', 'tubulară simplă (LP 4, lama 1)'],
        ['10 Glanda tiroidă · HE · tiroida', 'capsulă + septe; foliculi de mărimi diferite', 'epiteliu turtit / cubic / cilindric + celule C (IHC); coloid eozinofil', 'suprarenala (LP 5, lama 2)'],
        ['11 Glanda suprarenală · HE · suprarenala', 'corticală periferică + medulară centrală (~20%)', 'glomerulară arcuită · fasciculată palidă, în coloane · reticulată eozinofilă · medulară cromafină', 'tiroida (LP 5, lama 1)'],
        ['12 Insula Langerhans · HE · pancreas', 'acini seroși închiși + insule palide', 'acini cu zimogen + centroacinoase; insule în cuiburi, fără lumen; α/β/δ/PP doar IHC', 'suprarenala (LP 5, lama 2)'],
      ],
    },
    beatDur: 5,
  },
];

/* ---------- pozele reale: inset pe fiecare punct (colțul stânga-jos al animației) ---------- */
const P = (img, cap) => ({ img, cap });
const FULL = { pav: 'mezenter etalat · argentic', cub: 'medulara renală · HE', pri: 'vezica biliară · HE', ps: 'trahee · HE', es: 'esofag · HE', uro: 'vezica urinară · HE', tub: 'colon · HE', seb: 'buză · HE', sub: 'submandibulara · HE', tir: 'tiroida · HE', sr: 'suprarenala · HE', pan: 'pancreas · HE' };
const DDP = (k) => P(k, 'Partenerul de DD pe lamă: ' + FULL[k]);
const INS = {
  pav: [P('pav', 'Pe lamă: ' + FULL.pav), P('z_pav_0', 'Celulă poligonală pe lamă'), P('z_pav_1', 'Limită crenelată pe lamă'), DDP('cub')],
  cub: [P('cub', 'Pe lamă: ' + FULL.cub), P('z_cub_0', 'Tub colector: un rând, lumen gol'), P('z_cub_1', 'Nucleu rotund, central pe lamă'), DDP('pri')],
  pri: [P('pri', 'Pe lamă: ' + FULL.pri), P('z_pri_3', 'Lumenul dintre pliuri, un rând de celule'), P('z_pri_0', 'Platoul striat pe lamă'), DDP('cub')],
  ps: [P('ps', 'Pe lamă: ' + FULL.ps), P('z_ps_0', 'Nuclei la înălțimi diferite'), P('z_ps_1', 'Polul apical cu cili pe lamă'), DDP('uro')],
  es: [P('es', 'Pe lamă: ' + FULL.es), P('z_es_0', 'Stratul bazal pe lamă'), P('z_es_1', 'Stratul spinocelular pe lamă'), P('z_es_2', 'Stratul superficial pe lamă'), DDP('uro')],
  uro: [P('uro', 'Pe lamă: ' + FULL.uro), P('z_uro_2', 'Stratul bazal pe lamă'), P('z_uro_1', 'Celule în rachetă pe lamă'), P('z_uro_0', 'Celule umbreliforme pe lamă'), DDP('es')],
  tub: [P('tub', 'Pe lamă: ' + FULL.tub), P('z_tub_0', 'Glandă dreaptă, paralelă'), P('z_tub_1', 'Celulă caliciformă pe lamă'), DDP('sub')],
  seb: [P('seb', 'Pe lamă: ' + FULL.seb), P('z_seb_0', 'Celule mari, vacuolare'), P('z_seb_1', 'Celulele bazale pe lamă'), P('z_seb_2', 'Dezintegrare spre canal'), DDP('sub')],
  sub: [P('sub', 'Pe lamă: ' + FULL.sub), P('z_sub_1', 'Acin mucos pe lamă'), P('z_sub_0', 'Acin seros pe lamă'), P('sub', 'Lama întreagă (acinul mixt nemarcat)'), DDP('tub')],
  tir: [P('z_tir_0', 'Coloidul pe lamă'), P('z_tir_2', 'Folicul mic, activ'), P('z_tir_1', 'Un singur rând de celule'), P('z_tir_3', 'Stroma (celulele C: doar IHC)'), DDP('sr')],
  sr: [P('sr', 'Pe lamă (glomerulara nu e în cadru)'), P('z_sr_0', 'Zona fasciculată pe lamă'), P('z_sr_1', 'Zona reticulată pe lamă'), P('z_sr_2', 'Medulara pe lamă'), DDP('tir')],
  pan: [P('pan', 'Pe lamă: ' + FULL.pan), P('z_pan_0', 'Insulă Langerhans pe lamă'), P('z_pan_1', 'Acini seroși pe lamă'), P('z_pan_2', 'Septul conjunctiv pe lamă'), DDP('sr')],
};
SLIDES.forEach((s) => { if (s.scene === 'lama') s.insets = INS[s.sceneOpts.k]; });

/* ---------- mozaicul: câte o poză pe pătrat, cu structura-cheie încercuită ---------- */
const TILE = [
  ['pav', [300, 120, 450, 345], { x: 520, y: 280, rx: 72, ry: 118 }],
  ['cub', [130, 170, 400, 307], { x: 312, y: 322, rx: 140, ry: 88 }],
  ['pri', [20, 280, 520, 400], { x: 230, y: 470, rx: 30, ry: 90, rot: 0.12 }],
  ['ps', [300, 330, 560, 300], { x: 640, y: 455, rx: 95, ry: 55 }],
  ['es', [560, 40, 540, 420], { x: 880, y: 200, rx: 140, ry: 26, rot: 0.76 }],
  ['uro', [180, 60, 500, 383], { x: 418, y: 230, rx: 24, ry: 110 }],
  ['tub', [300, 60, 700, 537], { x: 650, y: 215, rx: 250, ry: 42, rot: -0.36 }],
  ['seb', [150, 230, 580, 400], { x: 445, y: 395, rx: 70, ry: 55 }],
  ['sub', [560, 40, 543, 590], { x: 960, y: 262, rx: 45 }],
  ['tir', [0, 0, 1103, 630], { x: 330, y: 440, rx: 95, ry: 85 }],
  ['sr', [0, 0, 1103, 630], { x: 800, y: 200, rx: 120, ry: 85 }],
  ['pan', [0, 0, 1103, 630], { x: 275, y: 200, rx: 120, ry: 110 }],
];
const MZ = SLIDES.find((s) => s.scene === 'mosaic');
const SH = ['Simplu pavimentos', 'Simplu cubic', 'Simplu prismatic', 'Pseudostratificat', 'Strat. pav. necheratinizat', 'Uroteliul', 'Tubulară simplă', 'Sebacee', 'Tubulo-acinoasă', 'Tiroida', 'Suprarenala', 'Insula Langerhans'];
MZ.sceneOpts.tiles = TILE.map(([img, src, m], i) => ({ img, src, marks: [m], lab: `${i + 1} · ${SH[i]}` }));

/* ---------- capcanele vizuale: pozele de comparație din biblioteca recapitulării (fără cercuri) ---------- */
const CV = SLIDES.find((s) => s.kick.includes('Capcane vizuale'));
CV.sceneOpts.tiles = [
  { img: 'pav', src: [200, 100, 900, 690], lab: 'simplu pavimentos (argentic)' },
  { img: 'dd_reticulina', lab: 'fibre de reticulină (argentic)' },
  { img: 'es', src: [560, 40, 540, 420], lab: 'esofag: nuclei păstrați sus' },
  { img: 'dd_epiderm', lab: 'epiderm: strat cornos, fără nuclei' },
  { img: 'seb', lab: 'glanda sebacee' },
  { img: 'sr_z2', lab: 'zona fasciculată' },
  { img: 'dd_adipos', lab: 'țesut adipos alb' },
];
