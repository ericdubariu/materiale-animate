// Conținutul slide-urilor Embrio LP 3 (Sistemul digestiv și respirator): textul vine din deck-ul LP 3 (lucrarea practică UMFST, 33 de pagini).
// Ce e marcat „(manual)” nu apare în LP: sursa îl notează „în plus față de LP” (Langman).

export const GLOS = [
  ['LP', 'lucrarea practică'], ['S3, S4…', 'săptămâna 3, 4… de dezvoltare'], ['EN', 'termenul în engleză'], ['LA', 'termenul în latină'],
  ['UMFST', 'Universitatea de Medicină, Farmacie, Științe și Tehnologie Târgu Mureș'],
  ['a.', 'artera'], ['lig.', 'ligamentul'], ['sup.', 'superioară'], ['inf.', 'inferioară'], ['dr.', 'dreapta'], ['stg.', 'stânga'],
  ['D1', 'prima porțiune a duodenului'], ['D2', 'a doua porțiune a duodenului'], ['D4', 'a patra porțiune a duodenului'],
  ['UG', 'sinusul urogenital'], ['AR', 'canalul anorectal'], ['AMI', 'artera mezenterică inferioară'], ['AP', 'antero-posterior'],
];
export const TERMS = [
  ['endoderm', 'endodermul', 'foița internă a embrionului; dă epiteliul tubului digestiv, al căilor respiratorii și al glandelor anexe'],
  ['mezoderm splanhnic', 'mezodermul splanhnic', 'foița de mezoderm lipită de tubul intestinal; dă mușchiul, conjunctivul, cartilajul din jurul lui'],
  ['mezogastr', 'mezogastrul', 'mezoul stomacului: o lamă dublă de peritoneu care îl leagă de perete (dorsal = în spate, ventral = în față)'],
  ['mezou', 'mezoul', 'lamă dublă de peritoneu care leagă un organ de peretele corpului'],
  ['stomodeu', 'stomodeul', 'gura primitivă, o adâncitură de ectoderm'],
  ['proctodeu', 'proctodeul', 'adâncitura de ectoderm de la capătul caudal, viitorul anus'],
  ['septul transvers', 'septul transvers', 'masă de mezoderm între inimă și sacul vitelin; dă o parte din diafragm și stroma ficatului'],
  ['alantoid', 'alantoida', 'diverticul al intestinului posterior care intră în cordonul ombilical'],
  ['vitelin', 'ductul vitelin', 'canalul care leagă intestinul mijlociu de sacul vitelin'],
  ['retroperitoneal', 'retroperitoneal', 'organ lipit de peretele posterior, acoperit de peritoneu doar în față'],
  ['polihidramnios', 'polihidramnios', 'prea mult lichid amniotic'],
  ['oligohidramnios', 'oligohidramnios', 'prea puțin lichid amniotic'],
  ['atrezie', 'atrezie', 'lumen închis complet (tubul e întrerupt)'],
  ['stenoz', 'stenoză', 'lumen îngustat, nu închis'],
  ['fistul', 'fistulă', 'comunicare anormală între două organe cavitare'],
  ['volvulus', 'volvulus', 'răsucirea intestinului în jurul mezenterului, cu ocluzie și ischemie'],
  ['surfactant', 'surfactantul', 'substanța din alveole care scade tensiunea superficială; fără el alveolele se colabează'],
  ['dihotom', 'dihotomă', 'fiecare ramură se împarte în două'],
  ['recanaliz', 'recanalizare', 'redeschiderea lumenului după ce epiteliul l-a astupat'],
  ['pericardo-peritoneal', 'canalele pericardo-peritoneale', 'cavitățile în care cresc mugurii pulmonari, viitoarele cavități pleurale'],
  ['acin', 'acinul', 'unitatea terminală a plămânului: bronșiola respiratorie cu ducturile și sacii ei'],
  ['bursa omental', 'bursa omentală', 'buzunarul de peritoneu din spatele stomacului (sacul mic)'],
  ['uncinat', 'procesul uncinat', 'cârligul capului pancreasului, care trece în spatele vaselor mezenterice'],
  ['bilio', 'bilios', 'cu bilă (vărsătura e verde-galbenă)'],
];

export const SLIDES = [
  // ---------------- COPERTA ----------------
  {
    deckName: 'Anatomie-Embriologie · LP 3 · Sistemul digestiv și respirator',
    scene: 'cover', kick: 'Anatomie-Embriologie · LP 3 · Modulul 1 · Grilă', title: 'Sistemul digestiv și respirator: totul pornește de la un singur tub de endoderm',
    hud: ['LP 3 anul acesta · LP 4 anul trecut', 'S3–S4'],
    points: [
      { h: 'Intestinul primitiv: 3 segmente, 3 artere', d: ['preenteron · mesenteron · metenteron'] },
      { h: 'Stomacul, ansa intestinală, cloaca', d: ['rotații, hernia fiziologică, septul urorectal'] },
      { h: 'Ficatul, vezica biliară, pancreasul', d: ['muguri din endoderm'] },
      { h: 'Sistemul respirator + malformații + cazuri', d: ['diverticul, ramificare, maturare, surfactant'] },
    ],
    why: 'Totul pornește de la un singur tub de **endoderm**. Dacă vezi tubul, cele !!3 segmente!! și artera fiecăruia, restul (stomacul care se rotește, ansa care face hernie, plămânul care înmugurește) se leagă singur.',
    extraText: 'S3, S4…', beatDur: 6,
  },
  // ---------------- HARTA ----------------
  {
    scene: 'map', kick: 'LP 3 · Harta LP-ului · S3–S4', title: 'Un tub de endoderm, 3 segmente, 3 artere',
    hud: ['secțiune sagitală, schematic', 'cranial = stânga · dorsal ↑'],
    points: [
      { h: 'Preenteron (EN: foregut; LA: proenteron)', d: ['membrana bucofaringiană → **diverticulul hepatic**', '!!a. celiacă!! · esofag, stomac, duoden proximal, ficat, pancreas + diverticulul respirator'] },
      { h: 'Mesenteron (EN: midgut)', d: ['duoden distal (D2–D4) → !!1/3 stângă a colonului transvers!!', '**a. mezenterică superioară** · intră în **hernia fiziologică** (S6–10)'] },
      { h: 'Metenteron (EN: hindgut)', d: ['1/3 stângă a transversului → **membrana cloacală**', '**a. mezenterică inferioară** · cloaca → canal anorectal + sinus urogenital'] },
    ],
    why: 'Tubul se formează în **S3** (gastrulație) din **endoderm**. În **S4** se împarte în 3 segmente, fiecare cu artera lui. De aceea granițele de vascularizație din adult sunt chiar granițele embrionare.',
    extraText: 'S3, S4…', beatDur: 6.5,
  },
  // ---------------- CRONOLOGIA ----------------
  {
    scene: 'chrono', kick: 'LP 3 · Cronologie', title: 'Ce se întâmplă în fiecare săptămână',
    hud: ['axa = săptămâni de dezvoltare'],
    points: [
      { h: 'S3: tubul intestinal din endoderm', d: ['+ **diverticulul hepatic** (ficatul)'] },
      { h: 'S4: 3 segmente, stomac fusiform', d: ['**diverticulul respirator** · se rupe **membrana bucofaringiană**'] },
      { h: 'S5: bronhiile lobare', d: ['!!3 dr. + 2 stg.!!'] },
      { h: 'S6: începe hernia fiziologică', d: ['S7: **membrana cloacală** se rupe → 2 orificii', 'S8: **duodenul** se recanalizează'] },
      { h: 'S10: hernia se retrage', d: ['ansa se întoarce în abdomen'] },
    ],
    why: 'Reține ordinea: **S3** tubul + ficatul → **S4** segmentele, stomacul, plămânul, gura se deschide → **S6** hernia → **S7** cloaca se deschide → !!S10 hernia se retrage!!. Aproape orice grilă de cronologie din LP se rezolvă cu axa asta.',
    extraText: 'S3, S4…', beatDur: 6,
  },
  // ---------------- PARTEA A · PREENTERONUL ----------------
  {
    scene: 'mouth', kick: 'Partea A · Preenteron · Cavitatea bucală', title: 'Gura se deschide când se rupe membrana bucofaringiană',
    hud: ['secțiune sagitală prin cap, S4', 'albastru = ectoderm · galben = endoderm'],
    points: [
      { h: 'Membrana bucofaringiană se rupe (S4)', d: ['**stomodeul** (gura primitivă, ectoderm) comunică acum cu **faringele** (endoderm)', 'cavitatea bucală se dezvoltă **împreună cu faringele**'] },
      { h: 'Fătul înghite lichid amniotic', d: ['după ce gura e deschisă, lichidul amniotic trece prin tubul digestiv', 'e absorbit în intestin → ajunge în circulație → placentă'] },
    ],
    why: 'Partea A: partea din față a tubului, vascularizată de **a. celiacă**; de aici înmuguresc și plămânul, și ficatul, și pancreasul. Legătura cu înghițitul explică o capcană clasică: dacă **esofagul e închis (atrezie)**, fătul **nu mai poate înghiți** lichidul → lichidul se adună → !!polihidramnios!!.',
    insets: [{ img: 'mouth', cap: 'Cap uman, S4 (figura din LP, UMFST)' }],
    extraText: 'S3, S4…', beatDur: 7,
  },
  {
    scene: 'stomach1', kick: 'Partea A · Preenteron · Stomacul (1)', title: 'Rotația 1: 90° în sensul acelor de ceas, pe axul longitudinal',
    hud: ['secțiune transversală, privită dinspre cap', 'posterior ↑ · dreapta embrionului = stânga ta'],
    points: [
      { h: 'S4: stomacul e o dilatare fusiformă', d: ['are un mezou în spate (**mezogastrul dorsal**) și unul în față (**ventral**)'] },
      { h: 'Mezogastrul dorsal ajunge în stânga', d: ['trage după el un buzunar în spatele stomacului → !!bursa omentală!!', 'din mezogastrul dorsal → **omentul mare**'] },
      { h: 'Partea stângă ajunge în față', d: ['de aceea !!vagul stâng e anterior!!, iar vagul drept posterior', 'peretele dorsal crește mai repede → **marea curbură**'] },
    ],
    why: 'O singură rotație de 90° explică trei lucruri din adult: **vagul stâng anterior**, **bursa omentală în spatele stomacului** și **marea curbură spre stânga**.',
    extraText: 'S3, S4…', beatDur: 7,
  },
  {
    scene: 'stomach2', kick: 'Partea A · Preenteron · Stomacul (2)', title: 'Rotația 2: pe axul antero-posterior → curburile și pilorul ajung la locul lor',
    hud: ['vedere din față', 'dreapta embrionului = stânga ta'],
    points: [
      { h: 'Axul longitudinal (A–B)', d: ['rotația de **90° în sens orar** de pe slide-ul anterior'] },
      { h: 'Apar curburile (C)', d: ['**marea curbură** (fostul perete dorsal) spre stânga', '**mica curbură** spre dreapta'] },
      { h: 'Axul antero-posterior (D)', d: ['!!pilorul urcă spre dreapta și în sus!!', '**cardia** coboară spre stânga și în jos'] },
      { h: 'Poziția finală (E)', d: ['stomacul stă oblic: cardia stânga-sus, pilorul dreapta', 'duodenul se curbează în „C” și devine **retroperitoneal**'] },
    ],
    why: 'LP-ul o scrie în 4 cuvinte: apar curburile → poziția finală a curburilor → poziția finală a cardiei și a pilorului → apare bursa omentală. Desenul îți dă ordinea.',
    warn: 'LP: „rotație **90° pe plan sagital**”. Langman (manual): rotație în jurul axului antero-posterior (pilorul spre dreapta-sus, cardia spre stânga-jos), fără valoare în grade. La grilă recunoști formularea LP-ului: !!„a doua rotație: 90° pe plan sagital”!!.',
    insets: [{ img: 'stomach', cap: 'A → E: rotațiile stomacului (figura din LP, UMFST)' }],
    beatDur: 6.5,
  },
  {
    scene: 'mesos', kick: 'Partea A · Preenteron · Mezourile', title: 'Din mezogastre ies omentul mare, omentul mic și lig. falciform',
    hud: ['secțiune transversală, privită dinspre cap', 'posterior ↑ · ficatul = dreapta embrionului'],
    points: [
      { h: 'Bursa omentală (EN: omental bursa / lesser sac)', d: ['buzunarul din spatele stomacului, creat de rotație'] },
      { h: 'Omentul mic (LA: omentum minus)', d: ['din **mezogastrul ventral**, între stomac și ficat'] },
      { h: 'Ligamentul falciform (LA: lig. falciforme)', d: ['tot din **mezogastrul ventral**, între ficat și peretele anterior'] },
      { h: 'Omentul mare (LA: omentum majus)', d: ['din **mezogastrul dorsal**, care atârnă ca un șorț de pe marea curbură', 'pe figură: **lig. gastrolienal**, tot din mezogastrul dorsal (omentul mare nu apare pe secțiune)'] },
    ],
    why: 'Regula: !!ventral → omentul mic + lig. falciform!! (ficatul crește în el, așa că îl împarte în două). !!Dorsal → omentul mare!! (+ splina).',
    insets: [{ img: 'omentum', cap: 'Mezogastrele în secțiune (figura din LP, UMFST)' }],
    beatDur: 6.5,
  },
  {
    scene: 'duodenum', kick: 'Partea A · Preenteron · Duodenul', title: 'Duodenul (și esofagul) trec printr-o fază „plină” și apoi se recanalizează',
    hud: ['secțiune transversală prin duoden', 'galben = epiteliu (endoderm)'],
    points: [
      { h: 'Lumen normal', d: ['tubul are la început un lumen deschis'] },
      { h: 'Proliferare', d: ['epiteliul crește atât de repede încât **astupă lumenul**'] },
      { h: 'Recanalizare', d: ['apar **vacuole** care se unesc → lumenul se redeschide', 'dacă nu se redeschide → !!atrezie / stenoză duodenală!!'] },
    ],
    why: 'LP-ul o spune pentru tot tubul: „prin proliferație lumenul se obstruează și apoi se recanalizează”. Locul clasic al atreziei e **D2**, de obicei imediat sub papilă → **vărsături biloase** (cazul 1 de la final). LP-ul notează recanalizarea la D1, dar fenomenul privește tot duodenul.',
    beatDur: 6.5,
  },
  // ---------------- PARTEA B · MESENTERONUL ----------------
  {
    scene: 'loop', kick: 'Partea B · Mesenteron · Ansa intestinală primară', title: 'Ansa are două brațe, iar a. mezenterică superioară e axul ei',
    hud: ['vedere laterală, S6', 'cranial ↑ · ventral = stânga ta'],
    points: [
      { h: 'Brațul cefalic (cranial)', d: ['→ duoden distal, jejun, o parte din ileon', 'dă **ansele intestinului subțire**'] },
      { h: 'Brațul caudal', d: ['→ ileonul inferior, cecul, apendicele vermiform, colonul ascendent, 2/3 proximale ale transversului', 'are **mugurele cecal** (marchează granița subțire–gros)'] },
      { h: 'Axul = a. mezenterică superioară', d: ['ansa se rotește în jurul arterei'] },
      { h: 'Ductul vitelin', d: ['leagă vârful ansei de sacul vitelin; dacă rămâne → **diverticul Meckel** (manual)'] },
    ],
    why: 'Partea B: partea din mijloc, vascularizată de **a. mezenterică superioară**, care devine și **axul** în jurul căruia se rotește ansa. **Mezenterul dorsal** → mezenterul intestinului; **mezenterul ventral** → omentul mic + lig. falciform (doar în regiunea preenteronului).',
    insets: [{ img: 'loop', cap: 'A: ansa în cordon · B: după rotație (figura din LP, UMFST)' }],
    extraText: 'S3, S4…', beatDur: 6.5,
  },
  {
    scene: 'rotation', kick: 'Partea B · Mesenteron · Rotația', title: 'Ansa se rotește 270° în sens antiorar, în jurul a. mezenterice superioare',
    hud: ['vedere din față, abdomenul embrionului', 'roșu = a. mezenterică sup. · C = mugurele cecal'],
    points: [
      { h: 'Poziția de pornire', d: ['brațul cranial sus, brațul caudal jos (plan sagital)'] },
      { h: 'Hernia fiziologică (S6–S10)', d: ['ficatul și ansa cresc mai repede decât abdomenul → ansa **iese în cordonul ombilical**', 'aici face **primii 90°**'] },
      { h: 'Retragerea (S10)', d: ['ansa se întoarce în abdomen și mai face **180°**', '!!cecul ajunge în dreapta!!, apoi coboară în fosa iliacă dreaptă'] },
    ],
    why: 'Hernia e fiziologică: **ficatul și ansa cresc mai repede** decât abdomenul, deci ansa iese temporar în cordonul ombilical (S6) și se întoarce în S10. Sensul rotației îl judeci privind embrionul din față, cu a. mezenterică superioară ca ax.',
    warn: 'LP: „rotația în două etape: **270° contra acelor de ceas** · **90° pe parcursul retragerii herniei**”. Langman (manual): 270° în total = ~90° în hernie + ~180° la retragere. La grilă, !!„270° antiorar în jurul a. mezenterice superioare”!! e adevărat.',
    extraText: 'S3, S4…', beatDur: 7.5,
  },
  {
    scene: 'result', kick: 'Partea B · Mesenteron · Rezultatul', title: 'După rotație, colonul încadrează intestinul subțire',
    hud: ['vedere din față', 'dreapta embrionului = stânga ta'],
    points: [
      { h: 'Ansa intră în abdomen', d: ['**jejunul** intră primul și se așază în stânga'] },
      { h: 'Cecul urcă, apoi coboară', d: ['cecul e ultimul: stă întâi **sub ficat**, apoi coboară în !!fosa iliacă dreaptă!!'] },
      { h: 'Cadrul colic', d: ['colon ascendent (dreapta) → transvers → descendent (stânga) → sigmoid', 'colonul ascendent și descendent devin **retroperitoneale**'] },
    ],
    why: 'Rotație de doar 90° → **colon pe stânga** (nonrotație), risc de **volvulus**. **Cec subhepatic** = rotație incompletă / cecul nu coboară. Dacă ansa nu se retrage → **omfalocel** (vezi malformațiile).',
    insets: [{ img: 'rotation_final', cap: 'C–E: retragerea și cadrul colic (figura din LP, UMFST)' }],
    beatDur: 7,
  },
  // ---------------- PARTEA C · METENTERONUL ----------------
  {
    scene: 'cloaca', kick: 'Partea C · Metenteron · Cloaca', title: 'Septul urorectal împarte cloaca: în față urinarul, în spate rectul',
    hud: ['secțiune sagitală', 'anterior = stânga ta · roșu = septul urorectal'],
    points: [
      { h: 'Cloaca', d: ['capătul dilatat al metenteronului, închis de **membrana cloacală**', 'în față primește **alantoida**'] },
      { h: 'Septul urorectal (LA: septum urorectale)', d: ['un perete de **mezoderm** care coboară spre membrana cloacală'] },
      { h: 'Rezultatul', d: ['în față: !!sinusul urogenital (UG)!! → vezica, uretra; în spate: **canalul anorectal (AR)**', '!!S7: membrana cloacală se retrage → 2 orificii!! (urogenital + anal)'] },
    ],
    why: 'Partea C: partea din spate, vascularizată de **a. mezenterică inferioară**; se termină în **cloacă**, pe care septul urorectal o împarte în două. Locul unde septul atinge membrana devine **corpul perineal**. Dacă septul nu coboară complet → fistule între rect și căile urinare/vagin (manual).',
    extraText: 'S3, S4…', beatDur: 7,
  },
  {
    scene: 'anal', kick: 'Partea C · Metenteron · Canalul anal', title: 'Canalul anal are două origini, despărțite de linia pectinată',
    hud: ['secțiune frontală prin canalul anal', 'galben = endoderm · albastru = ectoderm'],
    points: [
      { h: 'Partea superioară (2/3)', d: ['din !!endoderm (metenteron)!! · **a. rectală superioară** ← a. mezenterică inferioară', 'inervație viscerală → hemoroizii interni nu dor (manual)'] },
      { h: 'Partea inferioară (1/3)', d: ['din !!ectoderm (proctodeu)!! · ramuri din **a. rușinoasă (pudendă) internă**', 'inervație somatică → hemoroizii externi dor (manual)'] },
      { h: 'Linia pectinată (LA: linea pectinata)', d: ['marchează unde a fost **membrana anală** (după ce dispare membrana cloacală)'] },
    ],
    why: 'Două origini → două teritorii: sus **endoderm**, cu sânge din a. mezenterică inferioară; jos **ectoderm**, cu sânge din a. pudendă internă. Granița dintre ele e exact locul fostei membrane anale: **linia pectinată**.',
    warn: 'LP: „inferior – ectoderm – **a. rectalis media** din a. pudenda interna”. Corect anatomic: din a. pudendă internă vine **a. rectală inferioară**; a. rectală mijlocie vine din a. iliacă internă. La grilă, !!„partea inferioară e irigată de ramuri din a. pudendă internă”!! e adevărat.',
    beatDur: 6.5,
  },
  // ---------------- PARTEA D · GLANDELE ANEXE ----------------
  {
    scene: 'liver', kick: 'Partea D · Glandele anexe · Ficatul și vezica biliară', title: 'Ficatul crește dintr-un mugur de endoderm înfipt în septul transvers',
    hud: ['vedere laterală, S4–S5', 'cranial ↑ · ventral = stânga ta'],
    points: [
      { h: 'Mugurele hepatic (S3) (EN: liver bud / hepatic diverticulum)', d: ['din **endodermul** părții distale a preenteronului', 'celulele lui proliferează în !!septul transvers!! (mezoderm)'] },
      { h: 'Ductul biliar → vezica biliară', d: ['legătura mugurelui cu intestinul se îngustează → **ductul biliar**', 'ductul se bifurcă: !!vezica biliară + ductul cistic!!'] },
      { h: 'Mugurele pancreatic ventral', d: ['iese lângă ductul biliar (de aceea coledocul și Wirsung se deschid împreună)'] },
      { h: 'Mugurele pancreatic dorsal', d: ['iese din **peretele dorsal** al duodenului'] },
    ],
    why: 'Partea D: toate sunt **muguri de endoderm** care ies din preenteron, la granița cu mesenteronul. **Hepatocitele = endoderm**; capsula, țesutul conjunctiv și celulele Kupffer/hematopoietice = **mezoderm din septul transvers**. Septul transvers dă și o parte din **diafragm**.',
    insets: [{ img: 'buds', cap: 'Mugurii hepatic și pancreatici (figura din LP, UMFST)' }],
    extraText: 'S3, S4…', beatDur: 7,
  },
  {
    scene: 'pancreas', kick: 'Partea D · Glandele anexe · Pancreasul', title: 'Pancreasul = 2 muguri care se rotesc și fuzionează',
    hud: ['vedere din față', 'albastru = mugurele dorsal · portocaliu = ventral'],
    points: [
      { h: 'Mugurele dorsal → cea mai mare parte', d: ['!!corpul, coada și partea superioară a capului!!'] },
      { h: 'Mugurele ventral → partea de jos a capului', d: ['!!procesul uncinat și partea inferioară a capului!!'] },
      { h: 'Rotația + fuziunea', d: ['duodenul se rotește în „C” → mugurele ventral **trece în spate** și se lipește de cel dorsal', 'la început au **ducturi separate**'] },
      { h: 'Ductele după fuziune', d: ['**Wirsung** = ductul ventral + partea distală a celui dorsal', '**Santorini** (accesor) = restul ductului dorsal'] },
    ],
    why: 'Dacă mugurele ventral are două părți care înconjoară duodenul → **pancreas inelar** → obstrucție duodenală (manual, dar apare des la grile).',
    beatDur: 7,
  },
  // ---------------- PARTEA E · MALFORMAȚIILE DIGESTIVE ----------------
  {
    scene: 'esoAtresia', kick: 'Partea E · Malformații · Esofagul', title: 'Atrezia esofagiană și fistula traheo-esofagiană vin din același sept',
    hud: ['vedere din față', 'albastru = trahee · galben = esofag'],
    points: [
      { h: 'Atrezia esofagiană', d: ['esofagul se oprește într-un **fund de sac**', 'alimentele (și saliva) **nu ajung în stomac**'] },
      { h: 'Fistula traheo-esofagiană', d: ['comunicare între trahee și esofag', 'lichidul ajunge în plămâni → !!sindrom de aspirație!!'] },
      { h: 'Aer în stomac', d: ['aerul intră din trahee prin fistulă → pe radiografie !!stomacul are aer!!'] },
    ],
    why: 'Partea E: patru malformații în LP (atrezia esofagiană, fistula traheo-esofagiană, gastroschisisul, atrezia duodenală), fiecare cu un mecanism simplu. Traheea și esofagul se despart prin **septul traheo-esofagian** (S4). Dacă septul deviază sau nu se închide → cele două tuburi rămân legate (fistulă) și esofagul se întrerupe (atrezie). Bonus: fătul nu poate înghiți → **polihidramnios**.',
    warn: 'LP: „atrezie esofagiană – **absența esofagului**”. Corect: esofagul e **întrerupt**, segmentul superior se termină orb (fund de sac), de obicei cu **fistulă distală spre trahee** (cea mai frecventă formă). Dacă grila reia formularea LP-ului, o recunoști.',
    extraText: 'S3, S4…', beatDur: 7,
  },
  {
    scene: 'duoAtresia', kick: 'Partea E · Malformații · Duodenul', title: 'Atrezia duodenală: duodenul nu se recanalizează → „double bubble”',
    hud: ['radiografie abdominală, schematic', 'negru = aer · S = stânga pacientului'],
    points: [
      { h: 'Bula 1 = stomacul plin de aer', d: ['aerul înghițit nu mai trece mai departe'] },
      { h: 'Bula 2 = duodenul proximal dilatat', d: ['deasupra locului închis'] },
      { h: 'Fără aer în restul intestinului', d: ['obstrucția e completă'] },
    ],
    why: 'Mecanism: în **S5–S6** lumenul duodenal se umple de epiteliu și ar trebui să se recanalizeze. Dacă nu se redeschide → atrezie. Obstrucția e de obicei în !!D2, imediat sub papila duodenală!! → !!vărsături biloase!! la câteva ore după naștere. Schema radiografiei: negru = aer, ca pe film; stânga pacientului e în dreapta imaginii.',
    extraText: 'S3, S4…', beatDur: 6.5,
  },
  {
    scene: 'gastroschisis', kick: 'Partea E · Malformații · Peretele abdominal', title: 'Gastroschisis: intestinele ies printr-un defect al peretelui',
    hud: ['vedere din față, nou-născut', 'dreapta pacientului = stânga ta'],
    points: [
      { h: 'Gastroschisis (EN: gastroschisis)', d: ['**defect al peretelui abdominal**, de obicei !!la dreapta ombilicului!!', 'intestinele se exteriorizează, !!fără sac!!, plutesc în lichidul amniotic'] },
      { h: 'Diferențialul: omfalocelul', d: ['ansele **nu se retrag** din hernia fiziologică (S10)', 'sunt acoperite de un **sac (amnios + peritoneu)**, prin ombilic'] },
    ],
    why: 'Gastroschisis = problemă de **perete** (pliurile laterale nu se închid). Omfalocel = problemă de **retragere a herniei fiziologice**. De aceea doar omfalocelul are sac.',
    extraText: 'S3, S4…', beatDur: 7,
  },
  // ---------------- PARTEA F · SISTEMUL RESPIRATOR ----------------
  {
    scene: 'lungBud', kick: 'Partea F · Respirator · Originea (S4)', title: 'Diverticulul respirator iese din peretele ventral și se desparte de esofag',
    hud: ['secțiuni transversale prin preenteron, S4', 'dorsal ↑'],
    points: [
      { h: 'Diverticulul respirator (EN: lung bud)', d: ['iese din **peretele ventral al preenteronului**, în !!S4!!'] },
      { h: 'Pliurile se apropie', d: ['două **creste traheo-esofagiene** cresc din lateral'] },
      { h: 'Septul traheo-esofagian (LA: septum tracheoesophageale)', d: ['în față: **traheea**, în spate: **esofagul**', 'partea proximală a diverticulului → **laringe + trahee**'] },
    ],
    why: 'Partea F: plămânul nu se formează separat: e un diverticul din peretele ventral al preenteronului, care se desparte de esofag și se ramifică de ~23 de ori (~17 înainte de naștere, ~6 după). **Epiteliul căilor respiratorii = endoderm** (de aceea seamănă cu tubul digestiv). Cartilajul, mușchiul și țesutul conjunctiv = **mezoderm splanhnic** din jur.',
    extraText: 'S3, S4…', beatDur: 7,
  },
  {
    scene: 'branching', kick: 'Partea F · Respirator · Ramificarea', title: 'Mugurele se bifurcă iar și iar: ~17 generații până în luna 6, 23 în total',
    hud: ['vedere din față', 'dreapta = stânga ta'],
    points: [
      { h: 'S4: mugurele devine bifid', d: ['2 muguri = viitoarele **bronhii principale**'] },
      { h: 'S5: bronhiile lobare', d: ['!!3 în dreapta, 2 în stânga!! (ca lobii)'] },
      { h: 'S6: bronhiile segmentare', d: ['10 în dreapta, 8–9 în stânga (manual)'] },
      { h: 'S8 → luna 6', d: ['ramificare dihotomă → !!~17 generații până la sfârșitul lunii 6!!; ~6 se adaugă după naștere → **23 în total**', 'încă nu poate face schimb gazos; **surfactantul** apare abia la sfârșitul lunii a 6-a'] },
    ],
    why: 'Partea de după bifurcație → **bronhii + parenchim pulmonar**. Plămânii cresc în **canalele pericardo-peritoneale** și se învelesc în pleură (viscerală din mezoderm splanhnic, parietală din somatic).',
    insets: [{ img: 'branching', cap: 'S4, S5, S6, S8 (figura din LP, UMFST)' }],
    extraText: 'S3, S4…', beatDur: 7,
  },
  {
    scene: 'maturation', kick: 'Partea F · Respirator · Maturarea', title: 'Cele 4 stadii de maturare a plămânului',
    hud: ['un acin, în lupă', 'roșu = capilare · galben = surfactant'],
    points: [
      { h: 'Pseudoglandular · S5–S16', d: ['arbore bronșic până la **bronșiolele terminale**', '!!schimb gazos imposibil!!'] },
      { h: 'Canalicular · S16–S26', d: ['bronșiole respiratorii, ducte alveolare, capilare, **începe surfactantul**', 'prematurul poate supraviețui cu terapie intensivă'] },
      { h: 'Sacular · S26 – naștere', d: ['mulți **saci alveolari** + capilare lipite de ei', '**prematurii supraviețuiesc**'] },
      { h: 'Alveolar · 8 luni – 8 ani', d: ['alveole mature, **crește numărul lor după naștere**'] },
    ],
    why: 'De ce supraviețuiește un prematur de 7 luni (~S28–30)? E în **stadiul sacular**: are deja saci alveolari, capilare lipite de epiteliu (bariera e subțire) și **surfactant** (apare de la sfârșitul lunii 6). Înainte de !!~S24–26!! plămânul nu poate face schimb de gaze.',
    extraText: 'S3, S4…', beatDur: 7,
  },
  {
    scene: 'lungMalf', kick: 'Partea F · Malformații · Respirator', title: 'Plămâni prea mici sau trahee închisă',
    hud: ['torace, vedere din față', 'dreapta = stânga ta'],
    points: [
      { h: 'Hipoplazie pulmonară bilaterală', d: ['plămâni incomplet dezvoltați: **prea puține alveole și vase**', 'capacitate respiratorie redusă → **insuficiență respiratorie severă**'] },
      { h: 'Hipoplazie unilaterală', d: ['afectează **un singur plămân**', 'insuficiență respiratorie, adaptare dificilă la viața extrauterină'] },
      { h: 'Atrezia traheală', d: ['traheea e **închisă** → obstrucție severă a căilor respiratorii **la naștere**'] },
    ],
    why: 'Plămânul are nevoie de **spațiu** și de **lichid amniotic** ca să crească. Cauze clasice de hipoplazie (manual): **hernia diafragmatică** (intestinele ocupă toracele) și **oligohidramniosul**.',
    beatDur: 6.5,
  },
  // ---------------- PARTEA G · CAZURILE ----------------
  {
    scene: 'case1', kick: 'Partea G · Cazul 1', title: 'Nou-născută care vomită bilios la câteva ore după naștere',
    hud: ['întrebarea: diagnosticul + baza embriologică'],
    points: [
      { h: 'Cazul', d: ['o fetiță nou-născută începe să vomite la **câteva ore după naștere**'] },
      { h: 'Ce găsești', d: ['**distensie** accentuată în regiunea epigastrică · **vărsături biloase**', 'radiografie: !!aer în stomac și în duodenul proximal!!'] },
      { h: 'Diagnosticul', d: ['!!atrezie / stenoză duodenală!!'] },
      { h: 'Baza embriologică: lumenul duodenal se astupă', d: ['epiteliul proliferează (S5–S6)', 'vacuolele nu apar / nu se unesc → **duoden închis**'] },
      { h: 'Semnele', d: ['**„double bubble”**: aer în stomac + duoden', 'bila trece → vărsături biloase (închiderea e de obicei în **D2, sub papilă**)'] },
    ],
    why: 'Partea G: LP-ul se termină cu 2 cazuri și o întrebare. Le ai aici cu diagnosticul și cu baza embriologică desenată. Cheia cazului 1: **vărsături biloase** (obstrucția e sub papilă) + **„double bubble”** pe radiografie.',
    extraText: 'S3, S4…', beatDur: 6.5,
  },
  {
    scene: 'case2', kick: 'Partea G · Cazul 2', title: 'Nou-născut care tușește și se sufocă la prima masă',
    hud: ['întrebarea: diagnosticul + baza embriologică'],
    points: [
      { h: 'Cazul', d: ['un nou-născut **tușește și se sufocă**'] },
      { h: 'Ce găsești', d: ['**gura plină de salivă** · dispneic · **sonda nasogastrică nu avansează**', 'radiografie: !!aer în stomac!!'] },
      { h: 'Diagnosticul', d: ['!!atrezie esofagiană + fistulă traheo-esofagiană!!'] },
      { h: 'Baza embriologică: septul traheo-esofagian deviază', d: ['traheea și esofagul nu se despart corect (**S4**)', 'esofagul superior = **fund de sac**: saliva nu poate fi înghițită → gura plină, sonda se oprește'] },
      { h: 'Fistula esofag inferior – trahee', d: ['aerul trece în stomac', 'lichidul gastric trece în plămâni → **aspirație**'] },
    ],
    why: 'Cheia cazului 2: **sonda care se oprește** (fundul de sac) + **aer în stomac** (aerul intră din trahee prin fistulă). Același sept din S4 explică și de ce copilul se sufocă la prima masă: lichidul ajunge în trahee.',
    extraText: 'S3, S4…', beatDur: 6.5,
  },
  // ---------------- CAPCANE + RECAPITULARE ----------------
  {
    scene: 'traps', kick: 'LP 3 · Capcane', title: 'Ce se confundă ușor la grilă',
    hud: ['6 perechi'],
    points: [
      { h: 'Granița preenteron / mesenteron', d: ['nu e pilorul, ci !!diverticulul hepatic (în D2)!!', 'D1 și D2 proximal = preenteron; D2 distal–D4 = mesenteron'] },
      { h: 'Granița mesenteron / metenteron', d: ['!!1/3 stângă a colonului transvers!! (2/3 proximale = mesenteron)'] },
      { h: 'Rotația stomacului vs. a ansei', d: ['stomac: **90° ORAR** (ax longitudinal)', 'ansa: **270° ANTIORAR** (în jurul a. mezenterice sup.)'] },
      { h: 'Mezogastrul ventral vs. dorsal', d: ['ventral → **omentul mic + lig. falciform**', 'dorsal → **omentul mare** (+ splina, lig. gastrosplenic)'] },
      { h: 'Pancreasul', d: ['ventral = **uncinat + capul inferior**', 'dorsal = **capul superior + corp + coadă**. Nu invers.'] },
      { h: 'Gastroschisis vs. omfalocel', d: ['gastroschisis = **fără sac**, lângă ombilic', 'omfalocel = **cu sac**, prin ombilic (hernia nu se retrage)'] },
    ],
    beatDur: 6,
  },
  {
    scene: 'recap', kick: 'LP 3 · Recapitulare', title: 'Tot LP-ul într-un tabel',
    hud: ['rândul aprins = structura pe desen'],
    table: {
      head: ['Structura', 'Când', 'Din ce', 'Ce reții'],
      rows: [
        ['Intestinul primitiv', 'S3 → S4', 'endoderm', '3 segmente: !!a. celiacă · a. mezenterică sup. · a. mezenterică inf.!!'],
        ['Cavitatea bucală', 'S4', 'stomodeu + faringe', 'membrana bucofaringiană se rupe; fătul înghite lichid amniotic'],
        ['Stomacul', 'S4 →', 'preenteron', '**90° orar** (ax longitudinal) + ax AP → curburi, pilor dreapta, bursa omentală'],
        ['Ansa intestinală', 'S6–S10', 'mesenteron', 'hernia fiziologică; !!270° antiorar!! în jurul a. mezenterice sup.'],
        ['Cloaca', 'S4–S7', 'metenteron', 'septul urorectal → sinus urogenital + canal anorectal; **S7: 2 orificii**'],
        ['Canalul anal', 'S7 →', 'endoderm / ectoderm', 'linia pectinată; a. rectală sup. (AMI) vs. ramuri din a. pudendă int.'],
        ['Ficat + vezică', 'S3', 'endoderm în septul transvers', 'ductul biliar se bifurcă: vezica biliară + ductul cistic'],
        ['Pancreasul', 'S5 →', '2 muguri (dorsal + ventral)', 'ventral: **uncinat + capul inferior**; dorsal: restul'],
        ['Plămânul', 'S4 → 8 ani', 'diverticul respirator (endoderm)', '~17 generații până în luna 6 + ~6 postnatal = 23; 4 stadii; surfactant de la sfârșitul lunii 6'],
      ],
    },
    extraText: 'S3, S4…', beatDur: 5,
  },
];
