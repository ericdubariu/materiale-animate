// m2s.js · slide-urile „de ce arată așa” (mecanismul leziunii, animat) pentru preparatele 12, 14, 15, 16.
// Punctele din stânga repetă doar fapte din fișele vechi (preps.js, capcane); mecanismul în plus stă în xtra (chenarul albastru).
export const MECH2 = {
  15: [{
    scene: 'pericardFib', anim: true, beatDur: 8,
    spec: 'Secțiune prin peretele inimii, straturi orizontale: jos miocardul (roșu-roz, fibre cu nuclei, nu se schimbă), deasupra țesutul subepicardic (gălbui, cu 4 capilare tăiate transversal), apoi seroasa (șir de celule turtite), cavitatea pericardică și, sus, foița parietală. P1: capilarele se lărgesc și se înroșesc (congestie), stratul subepicardic se îngroașă, apar pe rând celulele infiltratului (granulocite, limfocite, histiocite). P2: picături gălbui de plasmă urcă din capilare spre suprafață (de jos în sus, o singură dată) și formează un strat de exsudat; o parte din celulele seroasei dispar (ulcerare). P3: din exsudat cresc, de la suprafață în sus, filamente roșu-roz legate între ele în rețea; în ochiuri apar granulocite și histiocite. P4: foița parietală coboară de 3 ori până la fibrină și se ridică la loc; la fiecare ridicare filamentele se alungesc în creste; la final foița rămâne sus, crestele rămân (aspect vilos).',
    kick: 'Lama 15 · Pericardită fibrinoasă · de ce arată așa', title: 'De la capilare congestionate la „limba de pisică”: cum ajunge fibrina pe inimă',
    hud: ['lama 15 și piesa 23 · aceeași leziune'],
    points: [
      { h: 'Țesutul de sub seroasă se inflamează', d: ['țesut subepicardic **îngroșat**, cu **numeroase capilare congestionate**', '**infiltrat inflamator**: granulocite, limfocite, histiocite'] },
      { h: 'Plasma iese din vase', d: ['plasmă extravazată → inflamație **fibrinoasă**', 'suprafața seroasă **ulcerată**'] },
      { h: 'Fibrina rămâne pe suprafață', d: ['!!exsudat fibrinos pe suprafață!!', '!!rețea de filamente grosolane, roșu-roz!!, cu granulocite și histiocite în ochiuri'] },
      { h: 'Pe piesă: suprafață mată, rugoasă', d: ['pericard cu **luciu, umiditate și transparență pierdute**', 'aspect **vilos, păros**: !!„limbă de pisică”!!'] },
    ],
    why: 'Miocardul de dedesubt rămâne cu **structura păstrată**: leziunea e pe seroasă, nu în mușchi.',
    xtra: 'Fibrinogenul din plasma extravazată se transformă în fibrină pe suprafața seroasei. Cele două foițe ale pericardului alunecă una pe alta la fiecare bătaie și trag fibrina moale în creste: de aici aspectul vilos.',
  }],
  16: [{
    scene: 'abcesForm', anim: true, beatDur: 8,
    spec: 'Câmp de hepatocite (pătrățele roz cu nucleu mov); în stânga un vas de sânge vertical în care hematiile curg în buclă, de sus în jos. P1: în centrul câmpului apar pe rând 5 colonii de microbi (grămezi albastru-violet închis, bazofile). P2: 16 granulocite (roz, nucleu lobat) ies pe rând prin peretele vasului (de la stânga spre dreapta) și se opresc în jurul coloniilor. P3: hepatocitele din focar se decolorează și dispar; în locul lor se întinde, din centru spre margine, o pată rotundă galben-verzuie cu globule (puroiul); granulocitele și coloniile rămân în ea. P4: în jurul cavității se desenează, în sensul acelor de ceas, un inel roz-cenușiu cu fibre (membrana piogenă); hepatocitele din afara inelului rămân neschimbate.',
    kick: 'Lama 16 · Abcese hepatice · de ce arată așa', title: 'Bacterii, granulocite, puroi: cum apare o cavitate acolo unde era țesut',
    hud: ['lama 16 și piesa 24 · același lanț'],
    points: [
      { h: 'Bacteriile', d: ['cauza: !!bacteriile!!', 'pe lamă: **grămezi intens bazofile** (colonii de microbi)'] },
      { h: 'Leucodiapedeza', d: ['inflamația purulentă = exsudare dominată de **leucodiapedeză**', 'în focar: !!număr mare de granulocite!!'] },
      { h: 'Puroiul ia locul țesutului', d: ['teritorii unde **lipsește țesutul hepatic**; hepatocite pe cale de necroză, **globule de puroi**', 'abcesul = !!cavitate cu conținut de puroi!!; macro: conținut vâscos, **galben-verzui**'] },
      { h: 'Membrana piogenă', d: ['în jur: parenchim cu **proliferare de țesut conjunctiv**', 'abcesul cronic: **membrană piogenă**; în rest, structura lobulară păstrată'] },
    ],
    why: 'Același lanț la piesa 24 (abces cerebral): **necroză de colicvație**, puroi în cavitate, **membrană piogenă** la periferie.',
    xtra: 'Enzimele eliberate de granulocite lichefiază țesutul necrozat; de aceea în focar nu mai rămâne arhitectură (spre deosebire de infarct, unde conturul se păstrează), ci o cavitate cu puroi.',
  }],
  14: [{
    scene: 'steatoCell', anim: true, beatDur: 8,
    spec: 'Stânga: un hepatocit mare (hexagon roz, nucleu mov în centru). Dreapta sus: un lobul hepatic (hexagon, vena centrolobulară în mijloc, 6 spații porte în colțuri). Dreapta jos: ficatul întreg. P1: în citoplasmă apar pe rând 15 vacuole mici, albe (optic goale), bine conturate. P2: vacuolele mici alunecă spre mijlocul celulei și se contopesc într-o vacuolă mare, care crește. P3: vacuola mare mai crește; nucleul e împins din centru spre marginea din stânga-sus a celulei și se turtește. P4: în lobul apar vacuole albe în hepatocite, de la periferie spre centru; conturul lobulului, vena centrolobulară și spațiile porte rămân neschimbate. P5: ficatul întreg crește, trece din brun-roșcat în gălbui, iar marginea de jos (anterioară) din ascuțită devine rotunjită.',
    kick: 'Lama 14 · Steatoză hepatică · de ce arată așa', title: 'Picături mici, apoi o vacuolă mare care împinge nucleul: de aici ficatul mărit și gălbui',
    hud: ['lama 14 și piesa 19 · aceeași leziune'],
    points: [
      { h: 'Grăsimile se acumulează în hepatocit', d: ['acumulare de !!grăsimi simple în citoplasma celulelor!!', 'în HE: !!vacuole optic goale!!, rotunde, bine conturate, de mărimi diferite'] },
      { h: 'Microvacuolele confluează', d: ['microvacuolele **confluează în macrovacuole**'] },
      { h: 'Nucleul ajunge la margine', d: ['vacuolele voluminoase **împing nucleul la periferie**'] },
      { h: 'Lobulul rămâne întreg', d: ['**structura lobulară păstrată** (spații porte, vene centrolobulare)', 'distribuția: periferolobulară, centrolobulară sau difuză'] },
      { h: 'Pe piesă: ficatul gras', d: ['ficat **mărit de volum și greutate**, de culoare **gălbuie**', 'marginea anterioară **rotunjită**; lama cuțitului are !!aspect grăsos!!'] },
    ],
    why: 'Vacuolele sunt goale pe lamă fiindcă lipidele s-au pierdut la procesare; se evidențiază cu **Sudan III**.',
    xtra: 'Aceeași grăsime explică ambele preparate: scoasă din celule la prelucrarea lamei, lasă vacuole goale; rămasă în piesa întreagă, dă culoarea gălbuie și volumul crescut. În desen, lobulul arată distribuția difuză.',
  }],
  12: [{
    scene: 'shockKidney', anim: true, beatDur: 8,
    spec: 'Rinichi secționat, cu hilul în stânga: corticala = banda de la exterior, medulara = 6 piramide cu baza spre corticală și vârful spre pelvis (gălbui, în centru-stânga). Artera renală intră prin hil, de la stânga; sângele curge în buclă. Inițial: curgerile merg din hil, printre piramide, până în corticală. P1: curgerea din artera renală se rărește și încetinește. P2: curgerile spre corticală se sting, iar corticala se decolorează din roz în alb-gălbui (palidă). P3: apar curgeri care de la baza piramidelor intră în medulară; piramidele trec din roz în roșu închis (hiperemice); o linie galbenă punctată marchează limita dintre corticală și medulară. P4: în dreapta jos apar două rinichi mici alăturați: rinichiul de șoc (toată corticala palidă) și infarctul renal (o singură zonă palidă în formă de pană, cu baza spre capsulă și vârful spre hil, conturată de un lizereu roșu, cu un dop închis la culoare în ramura arterială de la vârf).',
    kick: 'Piesa 12 · Rinichi de șoc · de ce arată așa', title: 'Sângele ocolește corticala și se adună în medulară: de aici cele două culori',
    hud: ['piesa 12 · rinichi secționat'],
    points: [
      { h: 'Șocul', d: ['!!dezechilibru major între necesarul de oxigen și aportul insuficient!! într-un organ', 'hipovolemic, cardiogen, neurogen, anafilactic, septic'] },
      { h: 'Corticala rămâne palidă', d: ['mecanism: **redistribuția sângelui** din corticală spre medulară', '**corticala renală palidă**'] },
      { h: 'Medulara se umple cu sânge', d: ['**medulara renală hiperemică**', 'corticala palidă !!bine delimitată de medulara hiperemică!!'] },
      { h: 'Nu e infarct', d: ['șocul: **toată corticala** e palidă; leziune **reversibilă** (necroză tubulară, glomeruli neafectați)', 'infarctul: **o singură zonă**, conturată de lizereu congestiv, prin obstrucția ramurii arteriale'] },
    ],
    xtra: 'În șoc, arteriolele din corticală se contractă puternic, iar sângele rămas ocolește corticala și stagnează în medulară. Săgețile din desen sunt schematice: arată doar încotro se mută sângele.',
  }],
};
