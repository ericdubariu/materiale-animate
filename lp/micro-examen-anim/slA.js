// Partea A a deck-ului Micro: coperta, „Înainte să începi” (+ separatorul Partea A) și LP 1–2 (paginile 1–18 ale deck-ului sursă).
// Roșu (!!…!!) = ce dă puncte la oral: cuvântul-cheie al principiului, cifrele cerute, excepțiile și capcanele.

export const GL = [
  ['LP', 'lucrarea practică'], ['CMI', 'concentrația minimă inhibitorie'], ['Ag', 'antigen'], ['Ac', 'anticorp'],
  ['PCR', 'reacția de polimerizare în lanț'], ['LCR', 'lichidul cefalorahidian'], ['ADN', 'acidul dezoxiribonucleic'], ['ARN', 'acidul ribonucleic'],
  ['IDR', 'intradermoreacția'], ['UV', 'radiații ultraviolete'], ['HEPA', 'filtru de aer de mare eficiență (High-Efficiency Particulate Air)'],
  ['LPS', 'lipopolizaharidul'], ['BAAR', 'bacili acid-alcoolo-rezistenți'], ['ME', 'microscopul electronic'], ['MO', 'microscopul optic'],
  ['MGG', 'colorația May-Grünwald-Giemsa'], ['B. stearothermophilus', 'Bacillus stearothermophilus'], ['E. coli', 'Escherichia coli'],
  ['S. pneumoniae', 'Streptococcus pneumoniae (pneumococul)'], ['M. tuberculosis', 'Mycobacterium tuberculosis'], ['t°', 'temperatura'],
  ['nm', 'nanometru (a miliarda parte dintr-un metru)'], ['µm', 'micrometru (a milioana parte dintr-un metru)'], ['pH', 'măsura acidității'],
];
export const TM = [
  ['spor', 'spor (endospor)', 'forma de rezistență, inactivă, formată în interiorul unor bacili (Clostridium, Bacillus)'],
  ['forme vegetative', 'forma vegetativă', 'bacteria activă, care crește și se divide (nu sporul)'],
  ['antisepsi', 'antisepsie', 'distrugerea germenilor pe țesut viu (piele, mucoase)'],
  ['bacteriostatic', 'bacteriostatic', 'oprește înmulțirea, dar nu omoară'],
  ['bacteriuri', 'bacteriurie', 'bacterii în urină'],
  ['bacteriemi', 'bacteriemie', 'bacterii în sânge'],
  ['hemocultur', 'hemocultură', 'cultura sângelui, în flacoane cu mediu lichid'],
  ['repicare', 'repicare', 'mutarea unei colonii pe un mediu nou, ca să obții cultura pură'],
  ['denatur', 'denaturare', 'proteina își pierde forma (se desface) și nu mai funcționează'],
  ['tindaliz', 'tindalizare', 'sterilizare fracționată: încălziri repetate 3 zile, cu incubare între ele'],
  ['liofiliz', 'liofilizare', 'congelare bruscă + uscare (apa pleacă direct ca vapori)'],
  ['sporicid', 'sporicid', 'omoară și sporii'],
  ['termofil', 'termofil', 'care trăiește la temperaturi mari'],
  ['peptidoglican', 'peptidoglican', 'rețeaua rigidă a peretelui bacterian'],
  ['acizi micolici', 'acizi micolici', 'lipide lungi, ca o ceară, din peretele micobacteriilor'],
  ['capsul', 'capsula', 'stratul gelatinos din jurul unor bacterii'],
  ['spirochet', 'spirochete', 'bacterii lungi, spiralate, mobile'],
  ['pleomorf', 'pleomorf', 'cu forme variate'],
  ['lanceolat', 'lanceolat', 'în formă de vârf de lance'],
  ['reniform', 'reniform', 'în formă de rinichi (boabe de cafea)'],
  ['imersie', 'imersie', 'obiectivul ×100 care lucrează cufundat într-o picătură de ulei'],
  ['refracți', 'indicele de refracție', 'cât de mult frânge un mediu lumina'],
  ['frotiu', 'frotiu', 'strat subțire de probă întins pe lamă'],
  ['trofozoi', 'trofozoit', 'forma activă, care se hrănește, a protozoarului'],
  ['chistur', 'chist', 'forma de rezistență a protozoarului'],
  ['flotați', 'flotație', 'ouăle, mai ușoare decât soluția, urcă la suprafață'],
  ['enterobioz', 'enterobioză', 'infecția cu oxiuri (Enterobius vermicularis)'],
  ['virion', 'virion', 'particula virală completă, infecțioasă'],
  ['capsid', 'capsidă', 'învelișul proteic al acidului nucleic viral'],
  ['icosaedr', 'icosaedru', 'poliedru cu 20 de fețe triunghiulare'],
  ['incluzi', 'incluzie', 'depozit de particule virale în celulă, vizibil la MO'],
  ['titrul', 'titrul', 'cea mai mare diluție a serului în care anticorpii încă reacționează'],
];

export const SL = [
  // ---------------- COPERTA ----------------
  {
    deckName: 'Microbiologie · principiile LP 1–6 + atlasul mediilor',
    scene: 'a_cover', kick: 'Microbiologie · examen LP · oral', title: 'Principii + atlasul mediilor',
    hud: ['examen oral', '2 părți'],
    points: [
      { h: 'Partea A: principiile din LP 1–6', d: ['teoria din slide-urile de LP, spusă oral', 'câte un desen pe idee'] },
      { h: 'Antibiograma: Kirby-Bauer și CMI ★', d: ['!!difuzimetric + CMI în detaliu!!', 'restul: doar principiul'] },
      { h: 'Tabla de la LP, redesenată', d: ['ce zahăr, ce inhibitor, ce culoare'] },
      { h: 'Partea B: atlasul mediilor', d: ['mediile pe care le recunoști din pozele de la LP', 'întâi poza, apoi răspunsul'] },
    ],
    why: 'Examenul are două fețe: **principiile** (de ce funcționează o metodă) și **recunoașterea mediilor** din poze. Culoarea unui mediu se schimbă mereu din același motiv: !!pH-ul!!.',
    beatDur: 6,
  },
  // ---------------- ÎNAINTE SĂ ÎNCEPI (+ separatorul Partea A) ----------------
  {
    scene: 'a_intro', kick: 'Înainte să începi', title: 'Ce intră la examen și cum răspunzi la orice mediu',
    hud: ['oral', 'teorie + practic'],
    points: [
      { h: 'Teoria: ideile generale', d: ['!!de ce funcționează ceva, nu protocoale tocite!!', 'antibiograma: difuzimetric + CMI în detaliu · restul antibiogramei, Ag-Ac, PCR: doar principiul'] },
      { h: 'Practicul: recunoașterea mediilor', d: ['îți arată placa sau tubul (mediile din poze + tabla)', 'spui ce mediu e, ce crește, + sau − și de ce'] },
      { h: 'Formula de răspuns (aceeași la fiecare mediu)', d: ['!!numele → tipul → ce conține → ce crește → + / − și de ce!!', 'nu mai improvizezi, doar completezi pașii · exemplu: MacConkey'] },
      { h: 'Partea A: principiile din LP 1–6', d: ['**fără micologie** (LP 7 nu intră)', 'fiecare slide: desenul cu numere, punctele cu aceleași numere, „De ce?” și, jos, ce spui la oral'] },
    ],
    why: 'Examenul LP propriu-zis (cu protocoalele) se dă în modulul 3. Acum contează să înțelegi principiile și să citești corect culoarea unui mediu: ea se schimbă mereu din același motiv, **pH-ul**.',
    say: 'Pe MacConkey (exemplul din animație): **numele** MacConkey → **tipul** selectiv-diferențial → **conține** săruri biliare (opresc Gram-pozitivii), lactoză și roșu neutru → **cresc** enterobacteriile → coloniile roz sunt **lactozo-pozitive**, pentru că lactoza fermentată dă acid și roșul neutru e roșu la acid.',
    labelText: ['LP'],
    beatDur: 8,
  },
  // ---------------- LP 1 · CONTROLUL CREȘTERII + CURBA ----------------
  {
    scene: 'a_kill', kick: 'LP 1 · Controlul creșterii', title: 'Cât omoară fiecare metodă și de ce sporii rezistă',
    hud: ['de jos în sus: omori tot mai mult'],
    points: [
      { h: 'Sterilizarea: omoară TOT, și sporii', d: ['!!singura care omoară sigur sporii!!', 'Poupinel !!160 °C / 2 h!! · autoclav !!121 °C / 15–30 min!!'] },
      { h: 'Dezinfecția (obiecte) și antisepsia (țesut viu)', d: ['dezinfecție: pe obiecte, suprafețe, aer; substanțe toxice pentru țesut; patogenii, **nu sporii**', 'antisepsie: pe **țesut viu** (alcool 70%, iod); doar formele vegetative'] },
      { h: 'Curățarea: doar murdăria', d: ['nu garantează nimic despre germeni: **curat ≠ steril**'] },
      { h: 'Curba de distrugere: moarte exponențială', d: ['în fiecare interval egal moare **aceeași fracțiune** (ex. 90%) → pe scară log: o linie dreaptă', 'mai mulți germeni = mai mult timp: 10⁸ germeni cer **dublul timpului** necesar pentru 10⁴'] },
      { h: 'Ce grăbește distrugerea și ce e greu de omorât', d: ['grăbesc: timpul de expunere și concentrația mai mari; contează și t°, pH-ul, stabilitatea agentului', 'greu de omorât: **endosporii** (Clostridium, Bacillus), chisturile protozoarelor, peretele micobacteriilor (acizi micolici); sângele, puroiul protejează germenii'] },
    ],
    why: 'Căldura uscată omoară prin **oxidare**, cea umedă prin **denaturarea proteinelor**: aburul pătrunde, hidratează proteinele și cedează multă căldură la condensare, deci autoclavul lucrează la t° mai mică decât Poupinelul. Instrumentele se **curăță înainte de sterilizare**: scazi numărul de germeni de la început și scurtezi drumul până la zero. De aceea nu toate metodele de decontaminare sunt și metode de sterilizare.',
    say: 'Antisepsia e pe țesut viu, dezinfecția pe obiecte și !!nu omoară sporii!!; doar sterilizarea omoară tot.',
    beatDur: 7,
  },
  // ---------------- LP 1 · RECOLTAREA (+ pe produse) ----------------
  {
    scene: 'a_sample', kick: 'LP 1 · Recoltarea', title: 'Să nu omori germenul și să nu contaminezi proba',
    hud: ['frig · gheață · t° camerei'],
    points: [
      { h: 'Regulile generale', d: ['!!recoltezi înainte de antibiotic!!', 'steril · închis ermetic · bilet de trimitere · transport rapid'] },
      { h: 'Frig DA: urina (4 °C) și virusurile (−70 °C)', d: ['urina: 4 °C dacă nu ajunge în 2 h; frigul oprește înmulțirea contaminanților, altfel bacteriuria iese fals crescută', 'virusologic: pe gheață, !!−70 °C (nu −20 °C)!!: la −20 °C își pierd viabilitatea'] },
      { h: 'Frig NU: hemocultura, LCR bacteriologic, secrețiile genitale', d: ['!!Neisseriile mor la frig!!: meningococul (LCR), gonococul (secreții)', 'hemocultura stă la t° camerei'] },
      { h: 'Sângele: hemocultura și serologia', d: ['hemocultură: înainte de antibiotic, **iod apoi alcool**, din 2 locuri, flacon aerob + anaerob, NU la frigider', 'serologie: dop roșu, t° camerei, **probe pereche la 10–14 zile** → titrul care crește = infecție acută'] },
      { h: 'Pe produse: produs → recipient → transport', d: ['faringe: ștergi amigdalele și peretele posterior, nu limba; tampon steril → tub protector, ≤ 3 h · spută: 1–2 ml purulentă (tuse supravegheată), nu salivă, nu proba din 24 h, rapid', 'LCR: puncție lombară, asepsie, tub steril; virusologic pe gheață, în primele 7 zile · urina: jet mijlociu, prima urină de dimineață, 10–20 ml, după toaletă, ≤ 2 h, altfel 4 °C · fecale: 3–5 cm³, porțiunile mucoase, sanguinolente, rapid; virusologic fără tampon; amibe „la cald”, ≤ 1 h'] },
    ],
    why: 'Toate regulile vin din două idei: germenul trebuie să rămână **viu până la laborator** și proba **nu trebuie contaminată**. Două flacoane (aerob + anaerob) prind și germenii care cresc fără oxigen; două locuri diferite deosebesc o bacteriemie reală de un contaminant de pe piele. Jetul mijlociu evită flora uretrei.',
    say: 'Recoltez înainte de antibiotic, steril, și trimit repede. Urina merge la frig dacă întârzie, LCR-ul și secrețiile genitale nu, pentru că Neisseriile mor la frig.',
    beatDur: 9,
  },
  // ---------------- LP 1 · SCHEMA DIAGNOSTICULUI ----------------
  {
    scene: 'a_diag', kick: 'LP 1 · Schema diagnosticului', title: 'Direct cauți germenul, indirect cauți urma lui',
    hud: ['direct ↓ · indirect'],
    points: [
      { h: 'Examen direct', d: ['microscop, antigen, ADN', 'rapid, dar grosier'] },
      { h: 'Cultură pură', d: ['!!o colonie = o singură bacterie inițială!!; colonie izolată → repicare', 'fără ea nu poți identifica și nu faci antibiogramă'] },
      { h: 'Identificare', d: ['caractere de cultură, morfotinctoriale, biochimice, antigenice'] },
      { h: 'Patogenitate', d: ['in vitro / in vivo', '+ antibiograma, pe cultura pură'] },
      { h: 'Indirect', d: ['anticorpii pacientului, **în dinamică** (probe pereche)', 'IDR (tuberculina)'] },
    ],
    warn: 'Căutarea !!antigenului e metodă directă!! (o bucată din germen); căutarea !!anticorpilor e indirectă!! (răspunsul gazdei).',
    beatDur: 7,
  },
  // ---------------- LP 1 · CĂLDURA ----------------
  {
    scene: 'a_heat', kick: 'LP 1 · Căldura', title: 'Uscată omoară prin oxidare, umedă prin denaturare',
    hud: ['uscată · umedă'],
    points: [
      { h: 'Căldura uscată (oxidare)', d: ['ansa la roșu, flambarea completează, incinerarea arde tot', 'Poupinel: **160 °C / 2 h · 180 °C / 1 h**; DA: sticlărie, porțelan, instrumente (metal), pulberi termostabile · NU: lichide, plastic, textile'] },
      { h: 'Fierberea și vaporii fluenți', d: ['100 °C, 30 min · vapori fluenți (vasul Koch)', '!!omoară formele vegetative, nu sporii → deci nu sterilizează!!'] },
      { h: 'Tindalizarea', d: ['încălzești, lași sporii să germineze, repeți **3 zile** la rând', 'pentru medii și alimente care nu suportă peste 100 °C'] },
      { h: 'Autoclavul (vapori sub presiune)', d: ['în spațiu închis, presiunea crește temperatura aburului', '!!121 °C, 15–30 min!! (blocul operator: 134 °C, 30 min)'] },
    ],
    why: 'Aburul **condensează** pe obiectul rece și cedează dintr-odată multă căldură, iar apa hidratează proteinele, care se denaturează ușor. Aerul transferă căldura prost, deci îi trebuie t° mai mare și timp mai lung: aer 160 °C / 2 h vs abur 121 °C / 15 min.',
    warn: 'Materialul !!contaminat din laborator merge la autoclav, nu la Poupinel!!. Poupinelul primește doar obiecte uscate și termostabile.',
    beatDur: 9,
  },
  // ---------------- LP 1 · ALTE METODE ----------------
  {
    scene: 'a_other', kick: 'LP 1 · Alte metode', title: 'Fără căldură: filtrezi, iradiezi sau folosești chimicale',
    hud: ['fără căldură · prezervare'],
    points: [
      { h: 'Pasteurizarea', d: ['denaturare sub 100 °C, pentru alimente termolabile (lapte); reduce patogenii', 'în LP: nu distruge micobacteriile și enterovirusurile → **NU e sterilizare**'] },
      { h: 'Filtrarea', d: ['!!reține germenii, nu-i omoară!! (membrane 0,22–0,8 µm; 0,22 µm pentru seruri, antibiotice)', 'lichide care nu pot fi încălzite · aer steril în hotă (HEPA)'] },
      { h: 'Radiațiile (ambele lovesc ADN-ul)', d: ['ionizante: penetrante, sterilizează instrumente **ambalate**', 'UV: nepenetrante, doar suprafețe netede și curate'] },
      { h: 'Substanțele chimice', d: ['glutaraldehida 2%, oxidul de etilen: **sporicide** · formaldehida doar dezinfectează', 'halogeni (iod), fenoli, detergenți, !!alcool 70–80%!!'] },
      { h: 'Prezervarea: vrei germenii VII', d: ['frigul de 4 °C e **bacteriostatic** (oprește creșterea) · −70 °C', 'liofilizarea = congelare bruscă + desicare, pe termen lung'] },
    ],
    why: 'Alcoolul merge la 70%, nu 100%: !!are nevoie de apă ca să denatureze proteinele!! și să intre în celulă. Alcoolul absolut coagulează doar suprafața, care apoi protejează interiorul.',
    labelText: ['ADN', 'UV', 'HEPA'],
    beatDur: 7,
  },
  // ---------------- LP 1 · CONTROLUL STERILIZĂRII ----------------
  {
    scene: 'a_ctrl', kick: 'LP 1 · Controlul sterilizării', title: 'De unde știi că sterilizarea a mers',
    hud: ['autoclav · 121 °C'],
    points: [
      { h: 'Metode fizice', d: ['termometru, manometru, timpul de expunere'] },
      { h: 'Metode chimice', d: ['substanțe cu punct de topire apropiat de t° de sterilizare', '!!acidul benzoic: 121 °C!! (se topește)'] },
      { h: 'Metode biologice', d: ['fiole **Stearotest**: !!spori de Bacillus stearothermophilus!!', 'la 121 °C sporii mor; indicatorul din fiolă virează'] },
      { h: 'Controlul sterilității', d: ['eficiența sterilizării + **menținerea sterilității**', 'metode bacteriologice: probe de pe suprafețe sterile, cultivate'] },
    ],
    why: 'De ce spori termofili: sunt !!cei mai rezistenți germeni la căldura umedă!!. Dacă au murit ei, au murit sigur și ceilalți.',
    labelText: ['B. stearothermophilus'],
    beatDur: 8,
  },
  // ---------------- LP 2 · EXAMENUL MICROSCOPIC ----------------
  {
    scene: 'a_prep', kick: 'LP 2 · Examenul microscopic', title: 'Tipul de preparat decide ce poți vedea',
    hud: ['nativ · negativ · colorat'],
    points: [
      { h: 'Preparatul nativ', d: ['germeni **vii**, lamă-lamelă → !!mobilitate!!', 'fond întunecat pentru spirochete'] },
      { h: 'Colorația negativă (Burri)', d: ['tuș de India colorează **fondul**', 'germenul și capsula rămân albe'] },
      { h: 'Frotiul colorat', d: ['simple (formă) sau compuse (Gram, Ziehl-Neelsen)'] },
      { h: 'Frotiul în 3 pași (pe tablă)', d: ['etalare (fără margini) → uscare (t° camerei) → fixare (flacără)', '!!fixarea omoară germenii și îi lipește de lamă!!'] },
    ],
    why: 'Particulele de tuș sunt prea mari ca să intre în bacterie sau în capsulă, deci umplu doar fondul și germenul apare ca un gol alb. Iar fixarea omoară germenii: !!pe frotiu nu mai vezi mobilitatea!!.',
    beatDur: 8,
  },
  // ---------------- LP 2 · GRAM + ALTE COLORAȚII ----------------
  {
    scene: 'a_gram', kick: 'LP 2 · Colorația Gram + alte colorații', title: 'Peretele decide culoarea',
    hud: ['Gram + violet', 'Gram − roșu'],
    points: [
      { h: 'Gram-pozitivii → violet', d: ['peptidoglican **gros** → alcoolul îl deshidratează, porii se strâng', '!!complexul violet–iod rămâne prins → violet!!'] },
      { h: 'Gram-negativii → roșu', d: ['membrană externă lipidică (LPS) + peptidoglican subțire → alcoolul dizolvă membrana', 'complexul iese, fuxina îi face roșii'] },
      { h: 'Pașii, cu clătire între ei', d: ['cristal violet 2 min → Lugol 2 min → alcool (decolorare) → fuxină 2 min (pe tablă: safranină, tot roșu)', 'alcoolul e pasul critic: !!prea lung → fals Gram−, prea scurt → fals Gram+!!'] },
      { h: 'Ziehl-Neelsen: BAAR', d: ['fucsină fenicată → alcool acid → albastru de metilen', 'bacili roșii pe fond albastru = **M. tuberculosis**'] },
      { h: 'Neisser (Babeș-Ernst)', d: ['corp galben, granulații albastre-negre la capete', 'Corynebacterium diphtheriae, „litere chinezești”'] },
    ],
    why: 'Lugolul leagă cristalul violet într-un **complex mare**; doar un perete gros îl poate reține când alcoolul încearcă să-l scoată. Peretele micobacteriilor e plin de ceruri (acizi micolici): fucsina intră doar ajutată de fenol și apoi !!nu mai iese nici cu alcool, nici cu acid!!.',
    say: 'Gram împarte bacteriile după perete: Gram-pozitivii rețin complexul violet–iod și apar violeți, Gram-negativii se decolorează la alcool și apar roșii.',
    labelText: ['LPS', 'BAAR'],
    beatDur: 9,
  },
  // ---------------- LP 2 · MICROSCOPUL ----------------
  {
    scene: 'a_scope', kick: 'LP 2 · Microscopul', title: 'Ulei la ×100, condensorul după preparat',
    hud: ['optic · mecanic · iluminare'],
    points: [
      { h: 'Trei sisteme', d: ['optic (mărește), mecanic (mișcă), iluminare (luminează)', 'optic: ocular, revolver, obiective · mecanic: macro/microviză, platină · iluminare: sursă, diafragmă, condensor · ocularul mărește ×10'] },
      { h: 'Obiectivele uscate: ×10, ×40', d: ['între lamă și lentilă rămâne **aer**', 'native, Kato-Miura, amprenta anală'] },
      { h: 'Obiectivul de imersie: ×100', d: ['o picătură de !!ulei de cedru!! pe lamă', 'pentru toate frotiurile colorate'] },
      { h: 'Condensorul', d: ['coborât: lumină puțină, contrast mare → !!preparate native!!', 'ridicat: lumină multă → preparate colorate'] },
    ],
    why: 'Uleiul are !!același indice de refracție ca sticla!!, deci razele nu se mai frâng în aerul dintre lamă și obiectiv. Fără ulei, la ×100 lumina se pierde și imaginea e neclară.',
    beatDur: 8,
  },
  // ---------------- LP 2 · FORMĂ ȘI DISPOZIȚIE ----------------
  {
    scene: 'a_shape', kick: 'LP 2 · Formă și dispoziție', title: 'Ce recunoști pe frotiu',
    hud: ['culorile = Gram'],
    points: [
      { h: 'Coci', d: ['!!grămezi: Staphylococcus · lanțuri: Streptococcus!!', 'diplococi reniformi: Neisseria'] },
      { h: 'Bacili', d: ['scurți, drepți: E. coli, Salmonella, Klebsiella', 'sporulați: Clostridium, Bacillus · palisade, V, L: Corynebacterium'] },
      { h: 'Cocobacili și lanceolați', d: ['Haemophilus: mici, pleomorfi', 'S. pneumoniae: **diplococ lanceolat**'] },
      { h: 'Spirilate', d: ['spirochete (Treponema, Leptospira)', 'le vezi pe nativ la fond întunecat sau pe Burri'] },
      { h: 'Colorația simplă', d: ['un singur colorant, 1–2 min: albastru de metilen, safranină, metil violet', 'arată forma și dispoziția, !!nimic despre perete!!'] },
    ],
    why: 'Dispoziția vine din cum se divide bacteria: !!în același plan → lanțuri; în planuri la întâmplare → grămezi!!. Colorațiile compuse (Gram, Ziehl-Neelsen) adaugă o decolorare ca să împartă bacteriile după perete.',
    beatDur: 8,
  },
  // ---------------- LP 2 · COPROPARAZITOLOGIC ----------------
  {
    scene: 'a_copro', kick: 'LP 2 · Examenul coproparazitologic', title: 'Fiecare metodă caută altă formă a parazitului',
    hud: ['scaun proaspăt → microscopic'],
    points: [
      { h: 'Nativ în ser, apoi Lugol', d: ['în ser: trofozoiți vii, mobili', 'Lugol: chisturile galben-brune, ouăle brun-roșcate'] },
      { h: 'Frotiul colorat MGG', d: ['trofozoiți cu nucleu roșu, citoplasmă violet-albastră', '!!singurul citit la imersie!!'] },
      { h: 'Stratul gros Kato-Miura', d: ['celofan cu glicerină + verde de malachit, 30 min', 'glicerina clarifică scaunul, ouăle se văd'] },
      { h: 'Concentrarea', d: ['soluție **hipertonă**: ouăle plutesc (flotație Willis-Hung)', 'soluție **hipotonă** + centrifugare: ouăle sedimentează'] },
      { h: 'Larvoscopice', d: ['viermii transmiși prin sol, ca larve'] },
      { h: 'Amprenta anală', d: ['bandă adezivă pe pliurile anale → ouă de Enterobius', 'pozitivă în !!peste 50%!! (scaunul doar 10–15%)'] },
    ],
    why: 'Pe lângă microscopic: macroscopic, cultivare la 37 °C, ADN prin PCR. Femela de oxiur iese **noaptea** și își depune ouăle pe pielea perianală, nu în intestin: de aceea le găsești pe bandă și rar în scaun. Un examen negativ nu exclude: pentru enterobioză se repetă !!de 7 ori, la 2 zile!!.',
    labelText: ['PCR', 'ADN', 'MGG'],
    beatDur: 8,
  },
  // ---------------- LP 2 · VIRUSURILE LA MICROSCOP ----------------
  {
    scene: 'a_virus', kick: 'LP 2 · Virusurile la microscop', title: 'Virionul se vede doar la ME; la MO vezi incluziile',
    hud: ['ME · MO'],
    points: [
      { h: 'Virionul', d: ['!!ARN sau ADN (unul singur)!! + capsidă proteică', 'înveliș doar la unele virusuri · se multiplică doar în celule vii'] },
      { h: 'Simetria capsidei', d: ['cubică (icosaedrică): herpes, adeno, polio', 'helicoidală: gripal, rabic · binară: bacteriofagul'] },
      { h: 'Microscopia electronică', d: ['20–900 nm: !!sub limita MO (≈ 200 nm)!!', 'colorare negativă cu acid fosfotungstic, 20.000–40.000×'] },
      { h: 'Incluziile, la MO', d: ['colorația Mann: incluziile **roșu strălucitor** (citoplasmă albastră, nucleu violet)', 'aglomerări de particule virale · !!Babeș-Negri în rabie!! (în neuroni)'] },
    ],
    why: 'La MO nu vezi virionul, ci efectul lui: incluzia e un depozit de particule virale destul de mare (micrometri) cât să treacă peste limita de rezoluție. Capsida are doar două așezări stabile ale subunităților: icosaedru sau spirală.',
    labelText: ['ARN', 'ADN', 'MO', 'ME'],
    beatDur: 8,
  },
];
