// m1s.js · slide-urile „de ce arată așa” ale tulburărilor hemodinamice (scenele din m1.js).
// Faptele din puncte vin din fișele vechi (preps.js) și din DD-urile comparative; mecanismul în plus stă în xtra.
export const MECH1 = {
  5: [{
    scene: 'thrombusBuild', anim: true, beatDur: 8,
    spec: 'Arteră în secțiune longitudinală: perete sus și jos, lumenul la mijloc; hematiile curg în buclă de la stânga la dreapta, pe 5 fire. Pe peretele de jos, o leziune endotelială (gălbuie). P1: leziunea pulsează, apar cele 3 cauze (triada Virchow). P2: din leziune cresc fire de fibrină (roz-deschis); trombocite (mici, gălbui) și leucocite (albe) vin din curent și se prind în ele; se formează primul strat, palid. P3: hematii din curent se prind peste el; crește al doilea strat, roșu. P4: încă un strat palid, apoi unul roșu; apar numele straturilor și „liniile lui Zahn”; trombul rămâne lipit de perete, iar firele de sânge îl ocolesc pe deasupra, prin lumenul rămas. P5: un fragment de pe versantul din aval se rupe și pleacă spre dreapta (în sensul curgerii), ieșind din cadru.',
    kick: 'Lama 5 · Tromb mixt (liniile Zahn) · de ce arată așa', title: 'Trombul se clădește strat cu strat, în sângele care curge',
    hud: ['arteră, secțiune longitudinală', 'servește și piesele 6–7'],
    points: [
      { h: 'De ce apare: triada Virchow', d: ['**leziunea endotelială** (la piesa 6: placa aterosclerotică)', '**fluxul sanguin anormal**', '**statusul hipercoagulant**'] },
      { h: 'Stratul palid', d: ['**rețea de fibrină** în ochiurile căreia se depun leucocite și trombocite', 'strat **slab eozinofil** (trombocite + fibrină); palid macroscopic'] },
      { h: 'Stratul roșu', d: ['apoi se depun **eritrocitele**', 'strat **roșu**, bogat în hematii; roșu închis macroscopic'] },
      { h: 'Alternanța = liniile lui Zahn', d: ['straturile palide și roșii alternează: !!liniile lui Zahn!! → tromb mixt stratificat', 'trombul e !!aderent de peretele vasului arterial!!'] },
      { h: 'De aici pleacă embolul', d: ['**embolizarea**: fragmentul migrează distal de cord și obstruă un ram mai mic → **infarct**'] },
    ],
    why: 'Tromboza = !!coagulare intravasculară și intravitală!!: straturile se pot forma doar în sângele care curge.',
    xtra: 'Fiecare strat e un „val” de depunere: întâi se lipesc trombocitele și se întinde fibrina (palid), apoi în ochiurile ei rămân prinse hematiile din curent (roșu). Cheagul format după moarte nu are straturi.',
  }],
  3: [{
    scene: 'renalWedge', anim: true, beatDur: 8,
    spec: 'Rinichi în secțiune, cu hilul în stânga și capsula (marginea convexă) în dreapta. Artera renală (roșie) intră prin hil din stânga și se împarte în 3 ramuri, fiecare în câte 2 ramuri mici, tot mai înguste; sângele curge în buclă dinspre hil spre capsulă. P1: doar curgerea. P2: embolul (bilă roșu-închis) vine din stânga prin trunchiul larg, intră pe ramura mijlocie și se oprește la capătul ei, unde se desparte în ramurile mici (mai înguste decât el); curgerea din cele două ramuri mici de dincolo de el se oprește (✕). P3: teritoriul lor, o pană cu vârful la embol și baza pe capsulă, pălește (alb-gălbui): infarct alb. P4: pe cele două laturi ale penei, la limita cu țesutul viu, apare o bandă roșie: lizereul congestiv; restul rinichiului rămâne normal.',
    kick: 'Lama 3 · Infarct renal anemic · de ce arată așa', title: 'O ramură astupată, un teritoriu mort: de aceea infarctul renal e alb și bine conturat',
    hud: ['rinichi, secțiune', 'servește și piesa 8'],
    points: [
      { h: 'Rinichiul are circulație unică', d: ['organ parenchimatos cu !!circulație unică!!'] },
      { h: 'Embolul astupă ramura arterială', d: ['!!obstrucția ramurii arteriale!! care deservește teritoriul (tromb / embol arterial)', 'trombii arteriali migrează **distal de cord**'] },
      { h: 'Teritoriul ei moare: infarct alb', d: ['necroza unei porțiuni din parenchimul renal', 'zonă **palidă, bine conturată**, vizibilă și pe suprafața externă → !!infarct alb (anemic, ischemic)!!'] },
      { h: 'La limită: lizereul congestiv', d: ['!!lizereu congestiv!!: capilare congestionate, eritrocite extravazate, bandă de infiltrat inflamator acut', 'alături: **parenchim renal normal**'] },
    ],
    xtra: 'Embolul trece de trunchiul larg și se oprește abia unde ramura devine mai îngustă decât el. Fiecare ramură hrănește singură un con de țesut, de aceea zona moartă are formă de pană: vârful spre vasul obstruat, baza spre capsulă. Fără altă sursă de sânge, zona rămâne palidă.',
  }],
  9: [{
    scene: 'lungWedge', anim: true, beatDur: 8,
    spec: 'Plămân în secțiune, brun (stază cronică), cu hilul în stânga și pleura (marginea laterală) în dreapta. Artera pulmonară (albastră) intră prin hil și se împarte în 3 ramuri, fiecare în câte 2 ramuri mici, tot mai înguste; arterele bronșice (roșii, subțiri) merg pe lângă ele; ambele curg în buclă dinspre hil spre pleură. P1: cele două curgeri. P2: embolul (bilă roșu-închis) vine din stânga prin trunchiul a. pulmonare, intră pe ramura mijlocie și se oprește la capătul ei, unde se desparte în ramurile mici; curgerea albastră de dincolo de el se oprește (✕). P3: artera bronșică aduce în continuare sânge în teritoriu: hematii apar pe rând în pana cu vârful la embol și baza pe pleură, apoi zona se închide la culoare (roșu-negricios). P4: marginile penei se conturează net; etichete: infarct roșu, vârful spre hil, baza spre pleură (albastru = în plus).',
    kick: 'Piesa 9 · Infarct pulmonar · de ce arată așa', title: 'Două circulații și o stază veche: de aceea infarctul pulmonar e roșu',
    hud: ['plămân, secțiune', 'servește și lama 2'],
    points: [
      { h: 'Plămânul are circulație dublă', d: ['!!circulație dublă!!; aici, pe un plămân cu **stază cronică (indurație brună)**: brun (siderofage), consistență fermă'] },
      { h: 'Embolul astupă o ramură a arterei pulmonare', d: ['!!obstrucția unei ramuri a arterei pulmonare (TEP)!!, cu trombul migrat dintr-o TVP'] },
      { h: 'Ramurile bronșice nu pot suplini', d: ['infarctul apare doar pe o **stază pulmonară cronică preexistentă**', 'presiunea crescută împiedică suplinirea prin ramurile bronșice', 'alveolele sunt **inundate hemoragic**'] },
      { h: 'Infarct roșu, triunghiular', d: ['zonă !!triunghiulară, cu vârful spre hil!! (vasul obstrucționat), cu margini bine delimitate', 'culoare **roșie-negricioasă** → !!infarct roșu (hemoragic)!!'] },
    ],
    xtra: 'În plămânul fără stază, ramurile bronșice țin în viață teritoriul rămas fără artera pulmonară și infarctul nu apare. Pe stază, sângele bronșic tot ajunge în zonă, dar nu o mai poate hrăni: se adună în țesutul necrozat și îl inundă, de aceea infarctul e roșu. Baza triunghiului e spre pleură.',
  }],
  2: [{
    scene: 'lungStasis', anim: true, beatDur: 8,
    spec: 'Sus, circuitul: capilarele pulmonare (stânga) → venele pulmonare (tub orizontal) → atriul stâng → ventriculul stâng → spre aortă (dreapta); sângele curge în buclă de la stânga la dreapta. Jos, mărit: trei alveole (spații deschise la culoare) despărțite de două septuri roz, fiecare cu un capilar vertical prin care trec hematii; în alveole stau 5 macrofage (celule rotunde, palide). P1: curgere normală, rapidă. P2: ventriculul stâng bate slab și se decolorează (insuficiență cardiacă); curgerea încetinește, tubul venelor pulmonare se lărgește și se închide la culoare, capilarele pulmonare la fel; o săgeată albastră arată că presiunea crește înapoi, de la inimă spre plămân (etichetă albastră = în plus). P3: capilarele din septuri se lărgesc (vase congestionate); 15 hematii ies din capilare în alveole. P4: hematiile intră în macrofage și dispar; macrofagele devin brune, cu granule (siderofage). P5: septurile se îngroașă și apar fibre de colagen în ele (fibroză).',
    kick: 'Lama 2 · Plămân de stază cronică + infarct pulmonar hemoragic · de ce arată așa', title: 'Sângele nedrenat rămâne în plămân: de aici vasele pline, siderofagele și septurile groase',
    hud: ['sus: plămân → inimă', 'jos: alveolele, mărit'],
    points: [
      { h: 'Congestia = drenaj venos alterat', d: ['!!proces pasiv, prin alterarea drenajului sanguin venos → stază!!'] },
      { h: 'Cauza: insuficiența cardiacă', d: ['staza apare în congestia din **insuficiența cardiacă**'] },
      { h: 'Vase congestionate, hematii extravazate', d: ['septuri cu **vase congestionate**', 'hematii **extravazate** din vasele congestionate'] },
      { h: 'Siderofagele (celulele cardiace)', d: ['în spațiile alveolare: !!siderofage (celule cardiace)!! cu pigment brun de hemosiderină, izolate sau grupate', 'hemosiderina provine din **degradarea hematiilor extravazate**'] },
      { h: 'Septuri îngroșate, fibrozate', d: ['!!septuri interalveolare îngroșate, fibrozate!!', 'pe piesă: **indurație brună**: greutate crescută, brun (siderofage), consistență fermă'] },
    ],
    xtra: 'Ventriculul stâng nu mai împinge tot sângele înainte, așa că presiunea crește înapoi: atriul stâng → venele pulmonare → capilarele din septuri. Macrofagele din alveole înghit hematiile ieșite din capilare și le transformă hemoglobina în hemosiderină, pigmentul brun. Pe aceeași lamă cauți apoi a doua leziune, infarctul (vezi mecanismul de la piesa 9).',
  }],
};
