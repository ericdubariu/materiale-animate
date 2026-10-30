// Recapitulare OSPE Histologie · LP 2–5 (epiteliile de acoperire + glandele). Textul vine din LP-urile oficiale 2–5
// (Histo_LP, UMFST). Roșu (!!…!!) = ce dă puncte; 1–4 pe slide. `xtra` = explicație proprie, nu e în LP.

export const GLOS = [
  ['LP', 'lucrarea practică'], ['HE', 'colorația hematoxilină-eozină'], ['OSPE', 'examen practic structurat pe stații'],
  ['DD', 'diagnostic diferențial'], ['MB', 'membrana bazală'], ['ob.', 'obiectivul'], ['EN', 'termenul în engleză'], ['LA', 'termenul în latină'],
  ['IHC', 'imunohistochimie'], ['Ac', 'anticorpi'], ['T3', 'triiodotironina'], ['T4', 'tiroxina'], ['PP', 'celulele cu polipeptid pancreatic (celulele F)'], ['inf.', 'inferioară'],
];
export const TERMS = [
  ['etalat', 'preparat etalat', 'membrana întinsă întreagă pe lamă, privită de sus (nu tăiată)'],
  ['crenelat', 'crenelat', 'cu margine în zigzag fin'],
  ['eucrom', 'eucrom', 'intensitate intermediară a nucleului (normocrom)'],
  ['hipocrom', 'hipocrom', 'nucleu colorat palid, deschis'],
  ['hipercrom', 'hipercrom', 'nucleu colorat intens, închis'],
  ['picnotic', 'picnotic', 'nucleu mic, condensat, foarte închis (celula moare)'],
  ['bazofil', 'bazofil', 'ia hematoxilina (albastru-violet)'],
  ['eozinofil', 'eozinofil', 'ia eozina (roz)'],
  ['corion', 'corion', 'conjunctivul de sub epiteliul unei mucoase'],
  ['glandilem', 'glandilem', 'membrana bazală a glandei'],
  ['adenomer', 'adenomer', 'porțiunea secretorie a glandei'],
  ['holocrin', 'holocrin', 'celula întreagă se dezintegrează și devine secreție'],
  ['zimogen', 'zimogen', 'granule de secreție eozinofile, la polul apical al celulei seroase'],
  ['cromafin', 'cromafine', 'celulele medularei suprarenalei, de origine neuroendocrină'],
  ['lipofuscin', 'lipofuscină', 'pigment galben, în celulele zonei reticulate'],
  ['mioepitelial', 'mioepiteliale', 'celule alungite între MB și polul bazal al celulelor acinare'],
  ['sustentacular', 'sustentaculare', 'celule de susținere, la periferia cuiburilor de celule cromafine'],
  ['microvilozit', 'microvilozități', 'prelungiri fine ale polului apical; formează platoul striat'],
];

const DDH = (who) => `DD · cu ${who}`;

export const SLIDES = [
  // ---------------------------------------------------------------- 1 · HARTA
  {
    deckName: 'Histologie · Recapitulare LP 2–5 · Epiteliile (OSPE)',
    scene: 'cover', kick: 'Histologie · Recapitulare LP 2–5 · OSPE', title: 'Cele 12 lame din LP 2–5, dintr-o privire',
    anim: false, spec: 'Harta fixă: cele 12 câmpuri desenate pe 4 rânduri (LP 2–5); rândul punctului se încercuiește.',
    hud: ['12 lame', 'LP 2–5'],
    points: [
      { h: 'LP 2 · Epiteliile de acoperire I', d: ['**1** simplu pavimentos · !!impregnație argentică!!, mezenter: contururi negre, crenelate, fără nuclei', '**2** simplu cubic · HE, rinichi: tubi colectori, nucleu rotund, central', '**3** simplu prismatic (cilindric) · HE, vezica biliară: nuclei alungiți bazali + platou striat'] },
      { h: 'LP 3 · Epiteliile de acoperire II', d: ['**4** pseudostratificat · HE, trahee: nuclei la înălțimi diferite + cili + caliciforme', '**5** stratificat pavimentos necheratinizat · HE, esofag: turtite sus, cu nuclei picnotici', '**6** uroteliul · HE, vezica urinară: umbreliforme sus, rachete la mijloc'] },
      { h: 'LP 4 · Epiteliile glandulare exocrine', d: ['**7** tubulară simplă · HE, colon: tuburi cu caliciforme + absorbante', '**8** alveolară simplă (sebacee) · HE, buză: săculeț de celule vacuolare → holocrin', '**9** tubulo-acinoasă · HE, glanda submandibulară: acini seroși, mucoși, micști'] },
      { h: 'LP 5 · Epiteliile glandulare endocrine', d: ['**10** tiroida · HE: foliculi de mărimi diferite, cu coloid', '**11** suprarenala · HE: cuiburi și cordoane; corticală în 3 zone + medulară', '**12** insula Langerhans · HE, pancreas: insule palide printre acini seroși'] },
    ],
    why: 'Un singur material: cum le recunoști, scheletul răspunsului în ordinea de punctaj și DD-ul cu **o singură lamă** (1 asemănare + 3 diferențe). **Singura lamă care nu e HE: lama 1 (impregnație argentică).**',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 2 · FORMATUL OSPE
  {
    scene: 'ospe', kick: 'Recapitulare LP 2–5 · Formatul OSPE', title: 'La fiecare lamă spui 3 lucruri, în ordinea asta',
    anim: false, spec: 'Cronometrul de 7 minute, fix: segmentul punctului se aprinde.',
    hud: ['Stația = 7 minute'],
    points: [
      { h: 'Recunoașterea · primele 30 de secunde', d: ['!!lama (organul) + colorația + diagnosticul!!'] },
      { h: 'Descrierea', d: ['**ob. mic**: arhitectura · **ob. mare**: celula (formă, citoplasmă, nucleu, pol apical)'] },
      { h: 'Diagnosticul diferențial', d: ['**o singură lamă** care se confundă: !!1 asemănare + 3 diferențe!!'] },
      { h: 'Concluzia', d: ['examinatorul: „mai e 1 minut” → spui concluzia'] },
    ],
    say: '1 min citești sarcina (ciornă) · 6 min răspunzi: spui scriptul (2–3 min), **începi devreme**, apoi completezi. Contează doar ce spui cu voce tare.',
    why: 'Cum lucrezi cu recapitularea: te uiți la imagine, spui cu voce tare scheletul (recunoaștere → ob. mic → ob. mare → DD) și abia apoi citești. Pornește cronometrul: 2–3 minute pe lamă.',
    warn: 'Recunoaștere → descriere → DD = **ordinea de punctaj** la Histologie: ce spui în afara ordinii riscă să nu fie bifat.',
    beatDur: 6,
  },
  // ---------------------------------------------------------------- 3 · ARBORELE
  {
    scene: 'tree', kick: 'Recapitulare LP 2–5 · Arborele epiteliilor', title: 'Unde stă fiecare lamă: 2 ramuri, 4 grupe, 12 lame',
    anim: false, spec: 'Arbore fix: epiteliu → de acoperire / glandular → grupe → cele 12 miniaturi; ramurile punctului se aprind.',
    hud: ['de acoperire · glandular'],
    points: [
      { h: 'De acoperire (LP 2–3): 2 întrebări', d: ['**câte rânduri?** un rând pe MB → simplu · nuclei la înălțimi diferite, dar toate celulele pe MB → pseudostratificat · mai multe rânduri suprapuse → stratificat', '**ce formă are celula?** turtită → pavimentos · pătrată → cubic · înaltă → prismatic (cilindric); nucleii iau forma celulelor'] },
      { h: 'Exocrin (LP 4): adenomer + canal', d: ['!!epitelii specializate să sintetizeze și să secrete!!; se formează prin !!invaginarea epiteliului!! în corionul mucoasei', 'alcătuire: **adenomerul** (partea secretorie, celulele secretoare) + **canalul (ductul) de secreție/excreție**', 'adenomerul: tub (deget de mănușă) → tubulară · săculeț → alveolară · tuburi + acini → tubulo-acinoasă'] },
      { h: 'Endocrin (LP 5): cum se așază celulele', d: ['**foliculi** (tiroida) · **cuiburi și cordoane** (suprarenala) · **insule** (pancreasul endocrin)'] },
      { h: 'Trucul de OSPE', d: ['epiteliul stă pe o **membrană bazală** (EN: basement membrane; LA: membrana basalis)', 'pseudostratificatul e !!epiteliu simplu!!: toate celulele ating MB · uroteliul = stratificat cu aspect particular'] },
    ],
    why: 'Holocrin (sebacee): celulele de lângă canal se dezintegrează și devin secreția (sebumul). Numerele = lamele din recapitulare (LP 4: 1–3 = 7–9; LP 5: 1–3 = 10–12).',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 1 · SIMPLU PAVIMENTOS
  {
    scene: 'lama', sceneOpts: { k: 'pav', dd: 'cub' }, kick: 'LP 2 · Lama 1 din 12 · argentic · mezenter', title: 'Epiteliul simplu pavimentos',
    anim: true, spec: 'Pe recunoaștere, ionii de argint (puncte negre) coboară și precipită doar în spațiile dintre celule, până se închid toate contururile crenelate (≈3,5 s), apoi rămân fixe; ob. mic încercuiește o celulă poligonală, ob. mare o limită crenelată.',
    hud: ['Lama 1 din 12', '<b>argentic</b> · mezenter etalat'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!epiteliu simplu pavimentos!! · mezenter · !!impregnație argentică!!', '!!nu e secțiune!!: mezenterul e **etalat pe lamă**; vezi forma și dispoziția celulelor'] },
      { h: 'Ob. mic', d: ['celule de formă **neregulată, poligonală, strâns unite**, ca pietrele de pavaj'] },
      { h: 'Ob. mare', d: ['**limite crenelate**, puse în evidență prin precipitarea argintului în spațiile intercelulare', 'nucleul, nucleolul, citoplasma **nu se colorează** în impregnația argentică'] },
      { h: DDH('simplu cubic (LP 2, lama 2)'), d: ['= ambele **epitelii simple**: un singur rând de celule', '≠ **colorația**: impregnație argentică · cubic: HE', '≠ **preparatul**: etalat, privit de sus · cubic: secțiune prin medulara renală, cu lumenele tubilor colectori', '≠ **celula și nucleul**: contururi poligonale, crenelate, nucleu necolorat · cubic: celule pătrate, nucleu rotund, eucrom, central'] },
    ],
    xtra: 'Argintul precipită doar între celule, ca o colorație de contur: vezi forma și limitele, nu organitele. EN: simple squamous epithelium · LA: epithelium simplex squamosum.',
    warn: '„Secțiune prin mezenter” = greșit: e un **etalat**. „Nuclei turtiți” la argentic = greșit: nucleii nu se colorează; nu descrie ce nu se vede.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 2 · SIMPLU CUBIC
  {
    scene: 'lama', sceneOpts: { k: 'cub', dd: 'pri' }, kick: 'LP 2 · Lama 2 din 12 · HE · rinichi', title: 'Epiteliul simplu cubic',
    anim: true, spec: 'Tub colector fix; pe ob. mare o riglă măsoară o celulă: înălțimea crește până egalează lățimea (≈1,5 s) și se oprește; badge-urile pe lumen și pe nucleul rotund, central.',
    hud: ['Lama 2 din 12', '<b>HE</b> · medulara renală'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · rinichi · !!epiteliu simplu cubic!!, studiat în **tubii colectori din medulara rinichiului**'] },
      { h: 'Ob. mic', d: ['celule aproximativ cubice, **un singur rând pe MB**; cu polul apical delimitează **lumenul** tubului renal'] },
      { h: 'Ob. mare', d: ['celule **aproximativ pătrate** (laturi aproximativ egale); citoplasmă **palid eozinofilă**', '!!nuclei rotunzi, eucromi, centrali!!; **limite intercelulare bine vizibile**'] },
      { h: DDH('simplu prismatic (LP 2, lama 3)'), d: ['= ambele **epitelii simple**, un singur rând pe MB, citoplasmă palid eozinofilă; HE', '≠ **forma celulei**: aproximativ pătrată · prismatic: !!celule alungite, cilindrice!!', '≠ **nucleul**: rotund, central · prismatic: alungit (ovalar), perpendicular pe MB, în jumătatea inferioară', '≠ **limite și pol apical**: limite bine vizibile · prismatic: limite fine doar apical + platou striat'] },
    ],
    xtra: 'Forma nucleului urmează forma celulei: celulă pătrată → nucleu rotund. Hematiile printre tubi sunt în capilare, nu în epiteliu. EN: simple cuboidal epithelium; collecting duct · LA: epithelium simplex cuboideum; tubulus colligens.',
    warn: 'Cubic sau tiroidă? Tubul colector: lumen gol. Foliculul tiroidian: cavitate cu **coloid** eozinofil.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 3 · SIMPLU PRISMATIC
  {
    scene: 'lama', sceneOpts: { k: 'pri', dd: 'cub' }, kick: 'LP 2 · Lama 3 din 12 · HE · vezica biliară', title: 'Epiteliul simplu prismatic (cilindric)',
    anim: false, spec: 'Câmp fix de epiteliu cilindric pe pliuri; încercuiește banda de nuclei bazali (ob. mic), apoi platoul striat (ob. mare).',
    hud: ['Lama 3 din 12', '<b>HE</b> · vezica biliară'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · vezica biliară · !!epiteliu simplu prismatic (cilindric)!!'] },
      { h: 'Ob. mic', d: ['celule **alungite, cilindrice**, într-un singur rând pe MB; citoplasmă **palid eozinofilă**', 'nuclei **alungiți (ovalari), paraleli între ei, perpendiculari pe MB**, în !!jumătatea inferioară!! a celulelor'] },
      { h: 'Ob. mare', d: ['**fine limite intercelulare numai spre polul apical**, nu și jos, unde nucleii sunt aglomerați', 'pol apical **îngroșat și striat**: !!platoul striat (microvilozități)!!'] },
      { h: DDH('simplu cubic (LP 2, lama 2)'), d: ['= ambele **epitelii simple**, un singur rând pe MB, citoplasmă palid eozinofilă; HE', '≠ **forma celulei**: alungită, cilindrică · cubic: aproximativ pătrată', '≠ **nucleul**: alungit, perpendicular pe MB, în jumătatea inferioară · cubic: rotund, central', '≠ **limite și pol apical**: limite doar apical, platou striat · cubic: limite bine vizibile, fără platou striat'] },
    ],
    xtra: 'Pe lamă epiteliul tapetează pliurile mucoasei; sub MB e corionul. EN: simple columnar epithelium; striated border · LA: epithelium simplex columnare; vesica biliaris.',
    warn: 'Prismatic sau pseudostratificat? Prismaticul: nuclei la același nivel, platou striat, **fără cili, fără caliciforme**. Pseudostratificatul: nuclei la înălțimi diferite, cili, caliciforme.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 4 · PSEUDOSTRATIFICAT
  {
    scene: 'lama', sceneOpts: { k: 'ps', dd: 'uro' }, kick: 'LP 3 · Lama 4 din 12 · HE · trahee', title: 'Epiteliul pseudostratificat',
    anim: true, spec: 'Câmp de epiteliu pseudostratificat; pe ob. mic fiecare celulă se luminează de la suprafață până la MB (toate ating MB), apoi fix; pe ob. mare încercuiește cilii și o caliciformă.',
    hud: ['Lama 4 din 12', '<b>HE</b> · trahee'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · trahee (căptușește lumenul) · !!epiteliu pseudostratificat!!: tip particular de epiteliu cilindric, un singur rând', 'toate celulele pe MB (deci **simplu**), dar au înălțimi diferite: nu toate ajung la suprafață'] },
      { h: 'Ob. mic', d: ['epiteliu **cilindric înalt**; nucleii în **2/3 bazale**, la înălțimi diferite → !!falsă impresie de stratificare!!', 'treimea superioară: **citoplasmă eozinofilă**; la suprafață: **cili**'] },
      { h: 'Ob. mare', d: ['nuclei **rotunzi** (lângă MB) · **rotund-ovalari** (mijloc) · **în bastonaș** (jumătatea superioară); sus, **limite intercelulare foarte fine**', '**cili** la celulele care ajung la suprafață · **caliciforme**: cupă de șampanie, nucleu bazal ovalar/turtit, hipercrom; supranuclear globuloase, necolorate (mucus); fără cili'] },
      { h: DDH('uroteliul (LP 3, lama 3)'), d: ['= nucleii pe mai multe niveluri: la ob. mic ambele par „cu multe rânduri”; HE', '≠ **câte rânduri**: !!un singur rând, toate celulele ating MB!! · uroteliu: stratificat (bazal, rachete, umbreliforme)', '≠ **suprafața**: cili + caliciforme · uroteliu: umbreliforme mari, intens eozinofile, fără cili', '≠ **nucleii**: rotunzi, rotund-ovalari, în bastonaș, doar în 2/3 bazale · uroteliu: nuclei în toate straturile, hipercromi în umbreliforme'] },
    ],
    why: 'Caliciforma pare „goală” în HE: granulele de mucus nu se colorează cu HE.',
    xtra: 'EN: pseudostratified ciliated columnar epithelium · LA: epithelium pseudostratificatum columnare ciliatum.',
    warn: '„Pseudostratificatul e stratificat” = greșit: e **epiteliu simplu** (toate celulele pe MB).',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 5 · STRATIFICAT PAVIMENTOS NECHERATINIZAT
  {
    scene: 'lama', sceneOpts: { k: 'es', dd: 'uro' }, kick: 'LP 3 · Lama 5 din 12 · HE · esofag', title: 'Epiteliul stratificat pavimentos necheratinizat',
    anim: true, spec: 'Pe recunoaștere, o celulă urcă din stratul bazal prin spinocelular până sus, se turtește, nucleul devine picnotic și se descuamează; ciclul se reia; pe straturi animația se oprește și se încercuiește stratul punctului.',
    hud: ['Lama 5 din 12', '<b>HE</b> · esofag'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['**HE** · esofag · !!epiteliu stratificat pavimentos necheratinizat!!', 'ob. mic: mai multe rânduri suprapuse pe o **MB sinuoasă**, care desparte epiteliul de conjunctivul subiacent'] },
      { h: 'Stratul bazal (germinativ)', d: ['**un singur rând** de celule cubo-cilindrice, citoplasmă **bazofilă**, nuclei !!hipocromi!!, rotunzi-ovalari'] },
      { h: 'Stratul mijlociu (spinocelular)', d: ['mai multe rânduri de celule **poligonale, strâns unite**, citoplasmă **eozinofilă**, limite bine vizibile', 'nuclei **eucromi, rotunzi, centrali**'] },
      { h: 'Stratul superficial', d: ['mai multe rânduri de celule **turtite**, cu axul lung paralel cu MB', 'spre suprafață: tot mai turtite, citoplasmă tot mai palidă, !!nucleu tot mai mic, hipercrom (picnotic), excentric!!'] },
      { h: DDH('uroteliul (LP 3, lama 3)'), d: ['= ambele **stratificate**, cu stratul bazal identic (un rând cubo-cilindric, bazofil, nuclei hipocromi); HE', '≠ **stratul mijlociu**: poligonale (spinocelular) · uroteliu: celule în rachetă de tenis', '≠ **stratul superficial**: mai multe rânduri turtite, palide, nucleu picnotic · uroteliu: !!un rând de umbreliforme, intens eozinofile!!', '≠ **MB**: sinuoasă, vizibilă · uroteliu: invizibilă în HE'] },
    ],
    xtra: 'Gândește-l ca o reînnoire de jos în sus: stratul bazal (germinativ) dă celule care urcă, se turtesc și pălesc. EN: non-keratinized stratified squamous epithelium · LA: epithelium stratificatum squamosum noncornificatum; oesophagus.',
    warn: 'Stratul bazal are nuclei **hipocromi**, nu hipercromi; hipercrom (picnotic) = stratul superficial.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 6 · UROTELIUL
  {
    scene: 'lama', sceneOpts: { k: 'uro', dd: 'es' }, kick: 'LP 3 · Lama 6 din 12 · HE · vezica urinară', title: 'Uroteliul (epiteliul tranzițional)',
    anim: true, spec: 'Pe recunoaștere, peretele se întinde și revine lent (umbreliformele se turtesc la întindere); pe straturi animația se oprește și se încercuiește stratul bazal, rachetele, apoi umbreliformele.',
    hud: ['Lama 6 din 12', '<b>HE</b> · vezica urinară'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · vezica urinară · !!uroteliu (epiteliu tranzițional)!!: stratificat cu aspect particular, căptușește **numai căile urinare**', 'ob. mic: aspect stratificat, pe o MB !!invizibilă în HE!!'] },
      { h: 'Stratul bazal (germinativ)', d: ['un rând de celule **cubo-cilindrice**, citoplasmă bazofilă, nuclei **hipocromi, rotunzi-ovalari**'] },
      { h: 'Stratul mijlociu: celule în rachetă', d: ['mai multe rânduri; sus **rotunjită**, cu nucleu **rotund, eucrom, central**', 'jos: expansiune subțire care se insinuează printre celulele stratului subiacent (rachetă de tenis)'] },
      { h: 'Stratul superficial: umbreliforme', d: ['un rând de celule **de talie mare**, axul lung paralel cu MB, citoplasmă **puternic eozinofilă**', 'o celulă acoperă !!2–3 celule în rachetă!!, între care trimite scurte prelungiri; 1, rar 2 nuclei rotunzi sau alungiți, **hipercromi**'] },
      { h: DDH('stratificat pavimentos necheratinizat (LP 3, lama 2)'), d: ['= ambele **stratificate**, cu stratul bazal identic (cubo-cilindric, bazofil, nuclei hipocromi); HE', '≠ **stratul mijlociu**: rachete de tenis · esofag: poligonale (spinocelular)', '≠ **stratul superficial**: un rând de umbreliforme, puternic eozinofile · esofag: mai multe rânduri turtite, palide, nucleu picnotic', '≠ **MB**: invizibilă în HE · esofag: sinuoasă, vizibilă'] },
    ],
    xtra: 'Vezica goală are pliuri; când se umple, peretele se întinde și umbreliformele se turtesc. EN: urothelium; transitional epithelium · LA: urothelium; vesica urinaria.',
    warn: 'MB la uroteliu: **invizibilă în HE**, nu o descrie (la esofag e sinuoasă, vizibilă). Stratul mijlociu: esofag = spinocelular, uroteliu = rachete; nu le amesteca.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 7 · GLANDA TUBULARĂ SIMPLĂ
  {
    scene: 'lama', sceneOpts: { k: 'tub', dd: 'sub' }, kick: 'LP 4 · Lama 7 din 12 · HE · colon', title: 'Glanda tubulară simplă',
    anim: true, spec: 'Pe recunoaștere și pe ob. mare, picături de mucus ies din caliciforme în lumenul îngust și urcă spre suprafață; pe ob. mic fix, încercuiește glanda (fund, corp, gât).',
    hud: ['Lama 7 din 12', '<b>HE</b> · colon'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · colon · !!glandă tubulară simplă!!', 'ob. mic: peretele colic (mucoasă, submucoasă, musculară, seroasă); glandele în **mucoasă**, spre lumen'] },
      { h: 'Ob. mic: glanda', d: ['aspect de **deget de mănușă** (tub), cu 3 segmente: !!fund, corp, gât!!', 'MB = **glandilem**; pe ea, **epiteliu simplu prismatic** din 2 tipuri de celule; lumen **îngust**, în care caliciformele își varsă secreția'] },
      { h: 'Ob. mare', d: ['**caliciforme**: cupă de șampanie; pol bazal îngust, nucleu ovalar/turtit, **hipercrom**, puțină citoplasmă ușor bazofilă; supranuclear globuloase, citoplasmă necolorată (mucus)', '**absorbante**: prismatice înalte, citoplasmă eozinofilă, nuclei ovalari, hipercromi, în **1/3 inferioară**'] },
      { h: DDH('glanda tubulo-acinoasă (LP 4, lama 3)'), d: ['= ambele **glande exocrine**: adenomer cu lumen, delimitat de MB; HE', '≠ **adenomerul**: !!tub (deget de mănușă): fund, corp, gât!! · tubulo-acinoasa: acini seroși, mucoși, micști', '≠ **celulele**: caliciforme + absorbante · tubulo-acinoasa: seroase (zimogen), mucoase, semiluna Gianuzzi', '≠ **celulele mioepiteliale**: nedescrise aici · tubulo-acinoasa: între MB și polul bazal al celulelor acinare'] },
    ],
    xtra: 'EN: simple tubular gland; intestinal crypt · LA: glandula tubulosa simplex.',
    warn: '„Golurile” din caliciforme nu sunt artefacte: sunt **mucus** (în colorația albastru alcian, mucusul apare albastru).',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 8 · GLANDA SEBACEE
  {
    scene: 'lama', sceneOpts: { k: 'seb', dd: 'sub' }, kick: 'LP 4 · Lama 8 din 12 · HE · buză', title: 'Glanda alveolară simplă (sebacee)',
    anim: true, spec: 'Pe punctul „spre canal”, o celulă bazală se umple de vacuole, nucleul devine picnotic și celula se dezintegrează în canal = sebum (ciclu lent); restul punctelor fix, încercuite.',
    hud: ['Lama 8 din 12', '<b>HE</b> · buză'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · buză · !!glandă alveolară simplă (sebacee)!!', 'ob. mic: **săculeț** + canal de excreție scurt, care se deschide la rădăcina firului de păr'] },
      { h: 'Spre centru: celule mari, poliedrice', d: ['limite **bine vizibile**; citoplasmă **vacuolară**: sebumul se dizolvă la prelucrare, nu se colorează cu HE', 'nucleu la început rotund, central'] },
      { h: 'Pe MB: celulele bazale', d: ['un rând de celule **cubice, bazofile**, cu limite greu vizibile → **regenerarea glandei**'] },
      { h: 'Spre canal: dezintegrare', d: ['citoplasmă tot mai vacuolară, palidă; nucleu tot mai mic, **picnotic, hipercrom, excentric**', 'celulele își pierd membrana și nucleii = **sebum**: !!secreție holocrină!!'] },
      { h: DDH('glanda tubulo-acinoasă (LP 4, lama 3)'), d: ['= ambele **glande exocrine** cu adenomer rotunjit (săculeț, respectiv acini); HE', '≠ **adenomerul**: !!săculeț plin de celule vacuolare!! · acini seroși, mucoși, micști, cu lumen', '≠ **periferia**: celule bazale cubice, bazofile (regenerare) · celule mioepiteliale alungite, nucleu paralel cu MB', '≠ **secreția**: celulele se dezintegrează (holocrin), devin sebum · acini: celule întregi, cu zimogen sau mucus'] },
    ],
    why: 'O singură lamă = drumul celulei: bazala (regenerare) → celulă mare, încărcată cu sebum → nucleu picnotic → își pierde membrana și nucleul → sebum.',
    xtra: 'EN: sebaceous gland; holocrine secretion · LA: glandula sebacea.',
    warn: 'Golurile = **sebum** dizolvat (colorația Szekely evidențiază conținutul lipidic), nu artefacte.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 9 · GLANDA TUBULO-ACINOASĂ
  {
    scene: 'lama', sceneOpts: { k: 'sub', dd: 'tub' }, kick: 'LP 4 · Lama 9 din 12 · HE · submandibulara', title: 'Glanda tubulo-acinoasă (submandibulară)',
    anim: true, spec: 'Pe acinul seros, granule de zimogen (roz) se aprind la polul apical și pălesc în ciclu; restul fix, cu acinul mucos, seros, apoi mixtul cu semiluna încercuite pe rând.',
    hud: ['Lama 9 din 12', '<b>HE</b> · glanda submandibulară'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · glanda submandibulară · !!glandă tubulo-acinoasă!!', 'ob. mic: aspect **heterogen**: acini diferiți ca formă, mărime, aspect citologic; ob. mare: 3 tipuri de acini + celule mioepiteliale'] },
      { h: 'Acinul mucos', d: ['**mijlociu**; 4–6 celule înalte pe MB; citoplasmă **palidă** (mucus)', 'nuclei **hipercromi, turtiți, împinși bazal**, paraleli cu MB; lumen **larg**, bine vizibil'] },
      { h: 'Acinul seros', d: ['**cel mai mic**; 6–8 celule înalte; citoplasmă **bazofilă subnuclear**, **eozinofilă supranuclear** (granule de zimogen)', 'nucleu **rotund, eucrom, situat bazal**; lumen !!foarte mic, punctiform!!'] },
      { h: 'Acinul mixt + mioepiteliale', d: ['**cel mai mare**: acin mucos care are atașată la un pol, ca un capișon, !!semiluna Gianuzzi (3–5 celule seroase)!!; lumen larg, delimitat numai de mucoase', '**celule mioepiteliale**: între MB și polul bazal al celulelor acinare; alungite, nucleu ovalar, hipercrom, paralel cu MB'] },
      { h: DDH('glanda tubulară simplă (LP 4, lama 1)'), d: ['= ambele **glande exocrine**: adenomer cu lumen, delimitat de MB; HE', '≠ **adenomerul**: acini de 3 tipuri · tubulara: tub cu fund, corp, gât', '≠ **celulele**: seroase, mucoase, semiluna Gianuzzi · tubulara: caliciforme + absorbante', '≠ **celulele mioepiteliale**: prezente, între MB și acini · tubulara: nedescrise'] },
    ],
    why: 'Culoarea arată conținutul: seroasa are granule de zimogen eozinofile sus, mucoasa e palidă pentru că e plină de mucus, care îi împinge nucleul la bază.',
    xtra: 'EN: tubuloacinar gland; submandibular gland · LA: glandula submandibularis.',
    warn: 'În LP, textul și eticheta pozei spun la acinul seros **nucleu situat bazal**; tabelul de DD scrie „rotund, central”. Semiluna: text **3–5** celule seroase, tabel 3–4 → spui „3–5”.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 10 · TIROIDA
  {
    scene: 'lama', sceneOpts: { k: 'tir', dd: 'sr' }, kick: 'LP 5 · Lama 10 din 12 · HE · tiroida', title: 'Glanda tiroidă: celule endocrine în foliculi',
    anim: true, spec: 'Pe recunoaștere și pe folicul, picături pornesc din coloid prin celulele foliculare spre capilar (T3, T4), în ciclu; pe celulele foliculare și C fix, încercuite.',
    hud: ['Lama 10 din 12', '<b>HE</b> · tiroida'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · glanda tiroidă · !!celule endocrine dispuse în foliculi!!', 'ob. mic: foliculi rotunzi-ovalari, **de diferite mărimi, în diferite stadii de activitate**'] },
      { h: 'Ob. mare: foliculul', d: ['structură globuloasă; tapetat de un **epiteliu simplu (folicular)** pe MB, care delimitează o cavitate', 'cavitatea: masă gelatinoasă, **eozinofilă = coloidul**'] },
      { h: 'Celulele foliculare → T3, T4', d: ['un rând pe MB; !!turtite (repaus) / cubice (secretă coloidul) / cilindrice (absorb coloidul, cele mai active)!!', 'nucleul are forma corelată cu forma celulei'] },
      { h: 'Celulele parafoliculare (C)', d: ['izolate sau grupate, printre foliculare, **lângă MB**; !!nu ajung la lumen, nu ating coloidul!!', 'relativ mari, citoplasmă palidă, nucleu mare, rotund, palid · secretă **calcitonină** · se identifică prin **IHC (Ac anticalcitonină)**'] },
      { h: DDH('glanda suprarenală (LP 5, lama 2)'), d: ['= ambele **epitelii glandulare endocrine**; HE', '≠ **așezarea celulelor**: foliculi · suprarenala: cuiburi și cordoane', '≠ **conținutul**: cavitate cu coloid eozinofil · fără cavitate; fasciculata palidă, vacuolară (grăsimi)', '≠ **arhitectura**: foliculi de mărimi diferite · corticală periferică în 3 zone + medulară centrală'] },
    ],
    why: 'Celula care absoarbe coloidul e cea mai activă și cea mai înaltă (cilindrică); în repaus se turtește.',
    xtra: 'EN: thyroid gland; thyroid follicle · LA: glandula thyroidea; folliculus thyroideus.',
    warn: 'Cavitatea foliculului = depozit de coloid, nu lumen de glandă exocrină. „Văd celulele C” în HE = greșit: se identifică prin **IHC**.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 11 · SUPRARENALA
  {
    scene: 'lama', sceneOpts: { k: 'sr', dd: 'tir' }, kick: 'LP 5 · Lama 11 din 12 · HE · suprarenala', title: 'Glanda suprarenală: cuiburi și cordoane',
    anim: false, spec: 'Coloană fixă capsulă → glomerulară → fasciculată → reticulată → medulară; zona punctului se încercuiește.',
    hud: ['Lama 11 din 12', '<b>HE</b> · suprarenala'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · glanda suprarenală · celule endocrine în **cuiburi și cordoane**', 'ob. mic: **corticala** periferică (cea mai mare parte) + **medulara** centrală, înconjurată complet de corticală (!!20%!!)', '**glomerulara**: bandă subțire, cuiburi/cordoane scurte, arcuite; celule mici, cubice/cilindrice, bazofile, nucleu mic, hipercrom'] },
      { h: 'Zona fasciculată', d: ['!!cea mai groasă!!; cordoane lungi, ca niște coloane perpendiculare pe medulară', 'celule mari, citoplasmă **palidă, vacuolară** (grăsimi); 1, rar 2 nuclei mari, hipocromi, 1–2 nucleoli'] },
      { h: 'Zona reticulată', d: ['**cea mai profundă**; cordoane foarte scurte, anastomozate; celule mai mici, **intens eozinofile**, unele cu lipofuscină (galben)'] },
      { h: 'Medulara', d: ['**celule cromafine** (origine neuroendocrină): cuiburi sau cordoane scurte, anastomozate; mari, poligonale, citoplasmă abundentă, bazofilă, granulară; nuclei variabili (talie, formă, localizare)', '**celule sustentaculare**: la periferia cuiburilor, nuclei alungiți, hipercromi, mai mari decât ai celulelor endoteliale'] },
      { h: DDH('glanda tiroidă (LP 5, lama 1)'), d: ['= ambele **epitelii glandulare endocrine**; HE', '≠ **așezarea celulelor**: !!cuiburi și cordoane!! · tiroida: foliculi', '≠ **conținutul**: fără cavitate, fără coloid; fasciculata palidă, vacuolară · tiroida: cavitate cu coloid eozinofil', '≠ **arhitectura**: corticală în 3 zone + medulară · tiroida: foliculi de mărimi diferite'] },
    ],
    why: 'Fasciculata e palidă, vacuolară pentru că e plină de grăsimi.',
    xtra: 'Grăsimile se dizolvă la prelucrarea lamei, de aceea rămân vacuole. EN: adrenal gland · LA: glandula suprarenalis; cortex et medulla.',
    warn: 'Ordinea, de la periferie spre centru: **glomerulară → fasciculată → reticulată → medulară**. Fasciculata = cea mai groasă, reticulata = cea mai profundă.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- LAMA 12 · INSULA LANGERHANS
  {
    scene: 'lama', sceneOpts: { k: 'pan', dd: 'sr' }, kick: 'LP 5 · Lama 12 din 12 · HE · pancreas', title: 'Insula Langerhans (pancreasul endocrin)',
    anim: true, spec: 'Pe recunoaștere și pe ob. mic, secreția acinilor curge spre canal în ciclu; pe insulă fix, încercuită; la DD, față în față cu suprarenala.',
    hud: ['Lama 12 din 12', '<b>HE</b> · pancreas'],
    points: [
      { h: 'Recunoașterea · lama + colorația', d: ['!!HE!! · pancreas: organ parenchimatos cu componentă **endocrină și exocrină** · !!insulele Langerhans!!'] },
      { h: 'Ob. mic: componenta endocrină', d: ['insule Langerhans: **1–3 milioane**, **1–2% din volumul** pancreasului', 'la ob. mare: structuri **rotunde sau ovalare, mai palid colorate**'] },
      { h: 'Ob. mare: celulele insulei', d: ['4 tipuri: **α, β, δ, F (PP)**, mai mici decât celulele acinilor; !!nu se identifică în HE → IHC!!', 'poligonale, **în cuiburi**; citoplasmă granulară, palidă; nucleu rotund, eucrom'] },
      { h: 'Ob. mic: componenta exocrină', d: ['formată !!în totalitate din acini seroși!! și canale de excreție'] },
      { h: DDH('glanda suprarenală (LP 5, lama 2)'), d: ['= ambele: **celule endocrine dispuse în cuiburi**; HE', '≠ **organul**: componentă endocrină + exocrină, insule printre acini seroși · suprarenala: corticală + medulară, fără acini', '≠ **arhitectura**: insule rotunde-ovalare, palide · corticală în 3 zone (glomerulară, fasciculată, reticulată) + medulară', '≠ **celulele**: mici, palide, nucleu rotund, eucrom · fasciculata: celule mari, vacuolare, în cordoane lungi'] },
    ],
    xtra: 'Acinii seroși au citoplasmă bazofilă jos și zimogen eozinofil sus, deci sunt mai închiși: insula palidă se vede din prima privire. EN: pancreatic islet · LA: insula pancreatica.',
    warn: '„Văd celulele beta” = greșit: α, β, δ, F (PP) nu se identifică în HE; spui că e nevoie de **IHC**.',
    beatDur: 7,
  },
  // ---------------------------------------------------------------- MOZAIC: CELE 12 POZE
  {
    scene: 'mosaic', kick: 'Recapitulare LP 2–5 · Pe lamele reale', title: 'Cele 12 lame, pe pozele de la disciplină',
    anim: false, spec: 'Mozaic fix cu pozele reale; pătratul punctului se aprinde.',
    hud: ['poze reale', 'câte una pe pătrat'],
    sceneOpts: { cols: 4, tiles: [] },
    points: [
      { h: '1 · Simplu pavimentos · !!argentic!!', d: ['contururi negre, crenelate, fără nuclei'] },
      { h: '2 · Simplu cubic · HE', d: ['tubi colectori; nucleu rotund, central'] },
      { h: '3 · Simplu prismatic · HE', d: ['nuclei alungiți bazali + platou striat'] },
      { h: '4 · Pseudostratificat · HE', d: ['nuclei la înălțimi diferite + cili + caliciforme'] },
      { h: '5 · Stratificat pavimentos necheratinizat · HE', d: ['turtite sus, cu nuclei picnotici'] },
      { h: '6 · Uroteliul · HE', d: ['umbreliforme eozinofile sus, rachete la mijloc'] },
      { h: '7 · Tubulară simplă · HE', d: ['tuburi cu caliciforme palide'] },
      { h: '8 · Sebacee · HE', d: ['săculeț de celule vacuolare → holocrin'] },
      { h: '9 · Tubulo-acinoasă · HE', d: ['acini seroși, mucoși palizi, micști'] },
      { h: '10 · Tiroida · HE', d: ['foliculi de mărimi diferite, coloid eozinofil'] },
      { h: '11 · Suprarenala · HE', d: ['fasciculata palidă, în coloane'] },
      { h: '12 · Insula Langerhans · HE', d: ['insule palide printre acini seroși'] },
    ],
    beatDur: 4,
  },
  // ---------------------------------------------------------------- CAPCANE VIZUALE
  {
    scene: 'mosaic', kick: 'Recapitulare LP 2–5 · Capcane vizuale', title: 'Unde se pierd puncte: lame care seamănă între ele',
    anim: false, spec: 'Mozaic fix cu pozele reale; pătratul punctului se aprinde.',
    hud: ['poze reale', 'perechi care se confundă'],
    sceneOpts: { cols: 3, tiles: [] },
    points: [
      { h: 'Simplu pavimentos · argentic (LP 2)', d: ['**contururi poligonale închise, lipite**; preparat etalat'] },
      { h: 'Fibrele de reticulină · tot argentic (LP 6)', d: ['negru = reticulină? ambele sunt argentice: aici **fibre ramificate, în rețea**, pe o secțiune de rinichi'] },
      { h: 'Glanda sebacee · HE', d: ['săculeți cu **rând de celule bazale**, nucleu picnotic spre canal'] },
      { h: 'Zona fasciculată · HE', d: ['celule palide, vacuolare, **în cordoane lungi**'] },
      { h: 'Țesut adipos alb · HE (LP 7)', d: ['adipocitul: !!o singură vacuolă!!, nucleu turtit, excentric'] },
    ],
    xtra: 'Toate „golurile” (sebacee, fasciculată, adipocit) vin din lipidele dizolvate la prelucrarea lamei. Le deosebești după **așezare și nucleu**, nu după culoare.',
    beatDur: 5,
  },
  // ---------------------------------------------------------------- TABELUL FINAL 1/2
  {
    scene: 'recap', sceneOpts: { keys: ['pav', 'cub', 'pri', 'ps', 'es', 'uro'], first: 1 }, kick: 'Tabelul final (1/2) · LP 2–3', title: 'Epiteliile de acoperire: tot ce spui, pe un rând',
    anim: false, spec: 'Cele 6 câmpuri desenate, fixe; miniatura rândului curent se încercuiește.',
    hud: ['lamele 1–6'],
    table: {
      head: ['Lama · colorație · organ', 'Ob. mic', 'Ob. mare', 'DD'],
      rows: [
        ['1 Simplu pavimentos · !!impregnație argentică!! · mezenter (etalat)', 'celule poligonale, strâns unite, pavaj', 'limite crenelate (argint precipitat); nucleu și citoplasmă necolorate', 'simplu cubic (LP 2, lama 2)'],
        ['2 Simplu cubic · HE · rinichi (tubii colectori)', 'un rând pe MB, delimitează lumenul tubului', 'celule pătrate, palid eozinofile, nucleu rotund, eucrom, central; limite vizibile', 'simplu prismatic (LP 2, lama 3)'],
        ['3 Simplu prismatic · HE · vezica biliară', 'celule cilindrice; nuclei alungiți, perpendiculari pe MB, în jumătatea inf.', 'limite doar apical; platou striat (microvilozități)', 'simplu cubic (LP 2, lama 2)'],
        ['4 Pseudostratificat · HE · trahee', 'cilindric înalt; nuclei în 2/3 bazale, la înălțimi diferite; cili', 'nuclei rotunzi, rotund-ovalari, în bastonaș; cili; caliciforme', 'uroteliul (LP 3, lama 3)'],
        ['5 Stratificat pavimentos necheratinizat · HE · esofag', 'multe rânduri pe MB sinuoasă', 'bazal bazofil, nuclei hipocromi · spinocelular poligonal, eucrom · superficial turtit, picnotic, excentric', 'uroteliul (LP 3, lama 3)'],
        ['6 Uroteliul · HE · vezica urinară', 'stratificat; MB invizibilă', 'bazal · rachetă de tenis · umbreliforme eozinofile (1, rar 2 nuclei), acoperă 2–3 rachete', 'stratificat pavimentos necheratinizat (LP 3, lama 2)'],
      ],
    },
    beatDur: 5,
  },
  // ---------------------------------------------------------------- TABELUL FINAL 2/2
  {
    scene: 'recap', sceneOpts: { keys: ['tub', 'seb', 'sub', 'tir', 'sr', 'pan'], first: 7 }, kick: 'Tabelul final (2/2) · LP 4–5', title: 'Glandele exocrine și endocrine: tot ce spui, pe un rând',
    anim: false, spec: 'Cele 6 câmpuri desenate, fixe; miniatura rândului curent se încercuiește.',
    hud: ['lamele 7–12'],
    table: {
      head: ['Lama · colorație · organ', 'Ob. mic', 'Ob. mare', 'DD'],
      rows: [
        ['7 Glanda tubulară simplă · HE · colon', 'deget de mănușă: fund, corp, gât; lumen îngust', 'caliciforme (cupă de șampanie) + absorbante (nuclei în 1/3 inf.)', 'tubulo-acinoasă (LP 4, lama 3)'],
        ['8 Glanda alveolară simplă (sebacee) · HE · buză', 'săculeț + canal scurt la rădăcina firului de păr', 'bazale bazofile → celule vacuolare → dezintegrare (!!holocrin!!)', 'tubulo-acinoasă (LP 4, lama 3)'],
        ['9 Glanda tubulo-acinoasă · HE · glanda submandibulară', 'aspect heterogen: acini diferiți', 'seros (lumen punctiform) · mucos (palid) · mixt (Gianuzzi 3–5) · mioepiteliale', 'tubulară simplă (LP 4, lama 1)'],
        ['10 Glanda tiroidă · HE · tiroida', 'foliculi de mărimi diferite', 'epiteliu turtit / cubic / cilindric + celule C (IHC); coloid eozinofil', 'suprarenala (LP 5, lama 2)'],
        ['11 Glanda suprarenală · HE · suprarenala', 'corticală periferică + medulară centrală (20%)', 'glomerulară arcuită · fasciculată palidă, în coloane · reticulată eozinofilă · medulară cromafină + sustentaculare', 'tiroida (LP 5, lama 1)'],
        ['12 Insula Langerhans · HE · pancreas', 'acini seroși + insule palide (1–2% din volum)', 'α, β, δ, F (PP) doar prin IHC; celule mici, în cuiburi, nucleu rotund, eucrom', 'suprarenala (LP 5, lama 2)'],
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
  pri: [P('pri', 'Pe lamă: ' + FULL.pri), P('z_pri_3', 'Un singur rând de celule cilindrice'), P('z_pri_0', 'Platoul striat pe lamă'), DDP('cub')],
  ps: [P('ps', 'Pe lamă: ' + FULL.ps), P('z_ps_0', 'Nuclei la înălțimi diferite'), P('z_ps_1', 'Polul apical cu cili pe lamă'), DDP('uro')],
  es: [P('es', 'Pe lamă: ' + FULL.es), P('z_es_0', 'Stratul bazal pe lamă'), P('z_es_1', 'Stratul spinocelular pe lamă'), P('z_es_2', 'Stratul superficial pe lamă'), DDP('uro')],
  uro: [P('uro', 'Pe lamă: ' + FULL.uro), P('z_uro_2', 'Stratul bazal pe lamă'), P('z_uro_1', 'Celule în rachetă pe lamă'), P('z_uro_0', 'Celule umbreliforme pe lamă'), DDP('es')],
  tub: [P('tub', 'Pe lamă: ' + FULL.tub), P('z_tub_0', 'Glandă dreaptă, paralelă'), P('z_tub_1', 'Celulă caliciformă pe lamă'), DDP('sub')],
  seb: [P('seb', 'Pe lamă: ' + FULL.seb), P('z_seb_0', 'Celule mari, vacuolare'), P('z_seb_1', 'Celulele bazale pe lamă'), P('z_seb_2', 'Dezintegrare spre canal'), DDP('sub')],
  sub: [P('sub', 'Pe lamă: ' + FULL.sub), P('z_sub_1', 'Acin mucos pe lamă'), P('z_sub_0', 'Acini seroși pe lamă (mici, granulari, mai închiși)'), P('sub', 'Lama întreagă (acinul mixt nemarcat)'), DDP('tub')],
  tir: [P('z_tir_2', 'Foliculi de mărimi diferite'), P('z_tir_0', 'Coloidul pe lamă'), P('z_tir_1', 'Un singur rând de celule foliculare'), P('z_tir_3', 'Printre foliculi (celulele C: doar IHC)'), DDP('sr')],
  sr: [P('sr', 'Pe lamă (glomerulara nu e în cadru)'), P('z_sr_0', 'Zona fasciculată pe lamă'), P('z_sr_1', 'Zona reticulată pe lamă'), P('z_sr_2', 'Medulara pe lamă'), DDP('tir')],
  pan: [P('pan', 'Pe lamă: ' + FULL.pan), P('z_pan_0', 'Insulă Langerhans pe lamă'), P('z_pan_0', 'Celule mici, palide, în cuiburi'), P('z_pan_1', 'Acini seroși pe lamă'), DDP('sr')],
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
  ['sub', [300, 20, 543, 590], { x: 515, y: 310, rx: 55, ry: 72 }],
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
  { img: 'seb', lab: 'glanda sebacee' },
  { img: 'sr_z2', lab: 'zona fasciculată' },
  { img: 'dd_adipos', lab: 'țesut adipos alb' },
];
