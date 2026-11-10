// m3s.js · slide-urile „de ce arată așa” pentru preparatele 17, 18, 21, 25, 26 (scenele sunt în m3.js).
// Punctele din stânga = doar fapte din fișele vechi (preps.js); mecanismul în plus stă în chenarul albastru (xtra) și pe desen cu etichetă albastră.
export const MECH3 = {
  17: [{
    scene: 'gran', anim: true, beatDur: 8, sceneOpts: { kind: 'tbc' },
    spec: 'Granulomul TBC, construit din centru spre periferie. P1: 9 bacili Koch (bastonașe roșii) în centru; 12 macrofage (rotunde, mov, cu nucleu) vin dinspre margine și se opresc în cerc în jurul lor; apar două ✕ (nu îi pot distruge). P2: macrofagele se alungesc și devin roz (celule epiteloide), apoi apare al doilea rând = strat gros. P3: trei epiteloide din dreapta-sus se unesc într-o celulă gigantă Langhans; cei 13 nuclei apar pe rând la periferie, în potcoavă. P4: în centru crește necroza cazeoasă (roz, omogenă, fin granulară) și acoperă bacilii. P5: la periferie apar pe rând limfocitele (mici, nucleu albastru închis) = coroana limfocitară. Ordinea finală: cazeum (centru) → epiteloide + Langhans → limfocite.',
    kick: 'Lama 17 · Limfadenită TBC · de ce arată așa', title: 'Granulomul TBC se construiește din centru spre periferie',
    hud: ['lama 17 · mecanismul'],
    points: [
      { h: 'Bacilul Koch ajunge în ganglion', d: ['!!Mycobacterium tuberculosis!! (bacilul Koch)', 'inhibă migrarea granulocitelor și proliferarea capilarelor'] },
      { h: 'Histiocitele devin epiteloide', d: ['BK transformă histiocitele în **celule epiteloide**: strat gros'] },
      { h: 'Celula gigantă Langhans', d: ['50–150 microni, ~100 nuclei !!la periferie, în coroană sau potcoavă!!'] },
      { h: 'Centrul: necroza cazeoasă', d: ['!!necroză cazeoasă!!: omogenă sau fin granulară, acidofilă, fără structuri'] },
      { h: 'Periferia: coroana limfocitară', d: ['**coroana limfocitară**; în jur, țesut limfoid restant, cu foliculi'] },
    ],
    xtra: 'Epiteloidele și celula Langhans sunt macrofage transformate; celula gigantă apare prin unirea lor (în LP, fuziunea e scrisă la granulomul de corp străin). Ordinea pașilor din animație e didactică.',
  }],
  18: [{
    scene: 'gran', anim: true, beatDur: 8, sceneOpts: { kind: 'fb' },
    spec: 'Granulomul de corp străin. P1: în centru apar 6 cristale de colesterol (fante aciculare albe, optic goale); 12 macrofage (rotunde, mov) vin dinspre margine și se opresc lângă ele; două ✕ (nu le pot fagocita). P2: macrofagele se strâng și se topesc în 3 celule gigante roz, așezate pe cristale; nucleii (12 pe celulă) apar pe rând, împrăștiați fără ordine. P3: în jur apar limfocite (infiltrat cronic) și 6 capilare (inele roșii) = țesut de granulație. P4: trei benzi roz ondulate se desenează de jur împrejur (fibroza care delimitează nodulul); în colțuri apar acini = țesut mamar normal.',
    kick: 'Lama 18 · Granulom de corp străin · de ce arată așa', title: 'Ce nu poate fi fagocitat este înconjurat: celule gigante, apoi fibroză',
    hud: ['lama 18 · mecanismul'],
    points: [
      { h: 'Corpul străin nu poate fi fagocitat', d: ['!!corpi străini!! pe care **macrofagele nu îi pot fagocita**', 'aici: **cristale de colesterol** = spații aciculare optic goale'] },
      { h: 'Macrofagele fuzionează', d: ['**celule gigante multinucleate de corp străin** (50–100 microni)', 'nuclei numeroși, !!răspândiți fără nicio ordine!! în citoplasma abundentă, eozinofilă'] },
      { h: 'Inflamația rămâne cronică', d: ['**infiltrat inflamator cronic**, macrofage, capilare de neoformație, țesut de granulație'] },
      { h: 'Fibroza închide nodulul', d: ['**formațiune nodulară bine delimitată** de un proces de fibroză', 'în jur: **țesut mamar normal**'] },
    ],
    xtra: 'Fantele sunt goale pentru că colesterolul se dizolvă la prelucrarea lamei: rămâne doar locul cristalului.',
  }],
  21: [{
    scene: 'lith', anim: true, beatDur: 8,
    spec: 'Rinichi în secțiune frontală (hilul în dreapta): 5 piramide cu papila în câte un calice, calicele se unesc în bazinet, ureterul coboară. Urina = picături galbene care curg în buclă papilă → calice → bazinet → ureter. P1: curgerea normală, apoi apar 4 calculi mici (în două calice și în bazinet). P2: calculul crește din bazinet în toate calicele și le ia forma (coraliform, bej). P3: un ✕ la ieșirea din bazinet; picăturile din ureter dispar, cele din calice încetinesc; cavitățile se colorează galben intens (urina se adună); trei săgeți roșii pleacă din bazinet spre calice (presiune retrogradă, în amonte). P4: calicele și bazinetul se dilată, piramidele se turtesc, parenchimul dintre calice și capsulă se subțiază (două săgeți galbene îl măsoară).',
    kick: 'Piesa 21 · Litiază renală · de ce arată așa', title: 'Calculul astupă ieșirea: urina rămâne în amonte și dilată calicele',
    hud: ['piesa 21 · mecanismul'],
    points: [
      { h: 'Calculii se formează în calice sau în bazinet', d: ['calculi !!la nivelul calicelor renale sau al bazinetului!!', 'cauze: creșterea concentrației substanțelor dizolvate, pH-ul urinar, infecțiile'] },
      { h: 'Calculul coraliform', d: ['!!calculi renali coraliformi!!: ocupă și preiau forma sistemului pielo-caliceal'] },
      { h: 'Obstrucție → presiune retrogradă', d: ['obstrucție totală → **presiune retrogradă**'] },
      { h: 'Hidronefroza', d: ['**calice dilatate**', '!!parenchim renal atrofic!! (subțiat) → insuficiență renală prin subțierea corticalei'] },
    ],
    xtra: 'Sensul normal al urinei: papilă → calice → bazinet → ureter. Dilatarea apare în amonte de obstacol, adică spre rinichi, nu sub el.',
  }],
  25: [{
    scene: 'lepto', anim: true, beatDur: 8,
    spec: 'Secțiune prin învelișurile creierului, de sus în jos: os (bej), dura mater (gri-albastru), arahnoida (linie mov), spațiul meningeal cu lichid (albăstrui) și 4 vase, pia mater (linie roz, lipită de creier, intră în șanțuri), creierul cu 4 girusuri și 3 șanțuri. P1: etichetele; acolada galbenă „leptomeningele” cuprinde arahnoida + pia. P2: din vase ies neutrofile (bile gălbui), apoi spațiul dintre arahnoidă și pia se colorează galben-verzui (puroi), până în fundul șanțurilor. P3: girusurile se turtesc și șanțurile se îngustează (suprafața creierului se deformează lin, o dată). P4: apare un panou cu două creiere mici: pe primul puroiul e o bandă galbenă pe convexitate („în șapcă”, pneumococ), pe al doilea la bază (meningococ).',
    kick: 'Piesa 25 · Leptomeningită purulentă · de ce arată așa', title: 'Puroiul stă între arahnoidă și pia mater: de aceea acoperă șanțurile',
    hud: ['piesa 25 · mecanismul'],
    points: [
      { h: 'Leptomeningele', d: ['**arahnoida + pia mater**'] },
      { h: 'Puroiul se adună în spațiul meningeal', d: ['!!acumularea de puroi în spațiul meningeal!!: inflamație purulentă difuză acută (flegmonoasă)', 'cauze: inflamații perifocale (otite, sinuzite, rinite), bacteriemie'] },
      { h: 'Suprafața creierului se schimbă', d: ['exsudatul **acoperă suprafața leptomeningelui**', '!!girusuri aplatizate!!, **șanțuri îngustate**, prin edemațierea leptomeningelui pe seama puroiului'] },
      { h: 'Unde stă puroiul', d: ['**pneumococul**: pe convexitate, „meningită în șapcă”', '**meningococul**: la baza creierului'] },
    ],
    xtra: 'Puroiul înseamnă neutrofile ieșite din vasele leptomeningelui. Spațiul meningeal din fișă este spațiul subarahnoidian (între arahnoidă și pia mater).',
  }],
  26: [{
    scene: 'bronho', anim: true, beatDur: 8,
    spec: 'Cei doi plămâni din față, cu traheea, bronhiile și câte 7 bronhiole. P1: microbii (bile mov) coboară o dată pe trahee → bronhii → bronhiole și se opresc la capetele lor. P2: la capătul a 4 bronhiole din jumătatea de jos apare câte un focar mic, roșu închis, care apoi crește în alveolele vecine. P3: apar și celelalte focare (10 în total, raze diferite, în ambii plămâni, 8 în jumătatea de jos); între ele plămânul rămâne roz (aerat). P4: câte două focare vecine din fiecare plămân cresc și se unesc (confluare). P5: în colțul din stânga-sus apare comparația: un plămân mic cu o singură zonă triunghiulară (infarct), cu baza pe marginea plămânului (pleura) și vârful spre hil.',
    kick: 'Piesa 26 · Bronhopneumonie · de ce arată așa', title: 'Infecția coboară pe bronhii: focarele apar în jurul bronhiolelor, în mai multe locuri',
    hud: ['piesa 26 · mecanismul'],
    points: [
      { h: 'Infecția pornește din bronhii', d: ['!!extensia alveolară a unui proces inflamator al bronhiilor și bronhiolelor!!', '**Streptococcus pneumoniae** (cel mai frecvent)'] },
      { h: 'Focarele apar în jurul bronhiolelor', d: ['inițial **în jurul bronhiilor și bronhiolelor**, apoi în spațiile alveolare adiacente', 'focare de condensare **roșu închis**, de consistență crescută'] },
      { h: 'Multe, în ambii plămâni', d: ['leziune !!multifocală, bilaterală!!, diametre variabile', 'cel mai frecvent **lobii inferiori** și zonele paravertebrale', 'între focare: **țesut pulmonar normal aerat**'] },
      { h: 'Focarele pot conflua', d: ['**bronhopneumonie confluentă**'] },
      { h: 'Nu e infarct', d: ['infarctul pulmonar: **o singură zonă** bine delimitată, triunghiulară, cu vârful spre hil'] },
    ],
    xtra: 'Exsudatul inflamator umple alveolele și ia locul aerului: de aceea focarul e „condensat” și mai tare la palpare.',
  }],
};
export const GLOS3 = [['BK', 'bacilul Koch (Mycobacterium tuberculosis)']];
