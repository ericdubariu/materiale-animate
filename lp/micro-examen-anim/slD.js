// PARTEA D: LP 6 Parazitologie, aliniată la PDF-ul oficial (Diagnosticul de laborator al infecțiilor parazitare): principii, clasificare,
// apoi câte un slide static cu poze (fără animații) pentru Trichomonas, Giardia, Toxoplasma, P. malariae, Echinococcus, Taenia, Ascaris, Enterobius, Toxocara, Trichinella.

export const GL = [
  ['LP', 'lucrarea practică'], ['MGG', 'colorația May-Grünwald-Giemsa'], ['IgM', 'imunoglobulina M (apare prima)'],
  ['IgG', 'imunoglobulina G (apare mai târziu, persistă)'], ['IgG+', 'anticorpi IgG prezenți'], ['IgM−', 'anticorpi IgM absenți'],
  ['CT', 'tomografia computerizată'], ['B12', 'vitamina B12 (cobalamina)'],
  ['T. solium', 'Taenia solium (tenia porcului)'], ['T. saginata', 'Taenia saginata (tenia vitei)'], ['D. latum', 'Diphyllobothrium latum (tenia peștelui)'],
  ['săpt.', 'săptămâni'],
  ['ELISA', 'test imunoenzimatic'], ['RIF', 'reacția de imunofluorescență'], ['PCR', 'reacția de polimerizare în lanț (detectează ADN-ul parazitului)'],
  ['LCR', 'lichid cefalorahidian'], ['RDT', 'test rapid de diagnostic'], ['SNC', 'sistemul nervos central'], ['H-E', 'hematoxilină-eozină'],
];
export const TM = [
  ['axostil', 'axostil', 'baston de susținere care străbate celula Trichomonas'],
  ['schizont', 'schizont', 'forma care se divide în mai mulți merozoiți'],
  ['merozoit', 'merozoit', 'celulă-fiică eliberată de schizont, care invadează alte hematii'],
  ['gametocit', 'gametocit', 'forma sexuală, preluată de țânțar'],
  ['oncosfer', 'oncosferă', 'embrionul cu 6 cârlige eliberat din ou'],
  ['hexacant', 'embrion hexacant', 'embrion cu 6 cârlige'],
  ['tachizoit', 'tachizoit', 'forma de multiplicare rapidă a Toxoplasmei'],
  ['bradizoit', 'bradizoit', 'forma lentă din chistul tisular'],
  ['Sabin', 'testul Sabin-Feldman', 'tachizoiți vii + ser imun + albastru de metilen: nu se mai colorează'],
  ['cuaternar', 'acces cuaternar', 'febră la fiecare 72 h (a 4-a zi)'],
  ['Kato', 'Kato-Miura', 'strat gros de scaun, transparentizat, care arată ouăle'],
  ['vomic', 'vomică hidatică', 'chist hidatic rupt în bronhie, cu eliminare de lichid'],
  ['trofozoit', 'trofozoit', 'forma vie, activă, care se hrănește și se înmulțește; moare repede în afara gazdei'],
  ['chist', 'chist', 'forma de rezistență a protozoarelor, cu perete gros; rezistă în mediu și transmite boala'],
  ['flotați', 'flotație', 'ouăle, mai ușoare decât lichidul dens, urcă la suprafață și se adună pe lamelă'],
  ['proglot', 'proglote', 'segmentele teniei; cele mature sunt pline de ouă'],
  ['scolex', 'scolexul', 'capul teniei, cu ventuze (și croșete), cu care se fixează de intestin'],
  ['larvoscopi', 'larvoscopie', 'căutarea larvelor în scaun (prin concentrare)'],
  ['dizenteri', 'dizenterie', 'diaree cu sânge și mucus, cu crampe'],
  ['steatoree', 'steatoree', 'scaun gras: grăsimile nu se absorb'],
  ['oochist', 'oochist', 'forma eliminată de pisică, rezultată din ciclul sexuat; devine infectantă după ce sporulează'],
  ['sporuleaz', 'sporulare', 'în oochist se formează sporozoiții, abia atunci devine infectant'],
  ['primoinfecți', 'primoinfecție', 'prima infecție din viață cu acel agent'],
  ['transplacentar', 'transplacentar', 'de la mamă la făt, prin placentă'],
  ['cisticerc', 'cisticercoză', 'boala dată de larva (cisticercul) de T. solium în țesuturi'],
  ['hidatic', 'chistul hidatic', 'larva de Echinococcus: o veziculă plină cu lichid, în ficat sau plămân'],
  ['anafilactic', 'șoc anafilactic', 'reacție alergică generalizată, cu prăbușirea tensiunii'],
  ['metacercar', 'metacercari', 'larvele închistate de Fasciola, lipite de plante acvatice'],
  ['operculat', 'ou operculat', 'ou cu capac (opercul) la un pol'],
  ['megaloblastic', 'anemie megaloblastică', 'anemie cu hematii mari, prin lipsă de B12 sau acid folic'],
  ['eozinofil', 'eozinofilie', 'creșterea eozinofilelor în sânge, tipică pentru helminți în migrare'],
  ['Loeffler', 'sindromul Loeffler', 'infiltrat pulmonar trecător cu eozinofilie, când larvele trec prin plămân'],
  ['geohelmint', 'geohelmint', 'vierme al cărui ou trebuie să stea în sol ca să devină infectant'],
  ['embrionat', 'ou embrionat', 'ou cu larva formată înăuntru = infectant'],
  ['filariform', 'larva filariformă', 'larva subțire, infectantă, care străbate pielea'],
  ['feriprivă', 'anemie feriprivă', 'anemie prin lipsă de fier (aici, prin pierdere de sânge)'],
  ['imunodeprimaț', 'imunodeprimat', 'pacient cu apărarea imună scăzută'],
  ['eclozeaz', 'eclozare', 'ieșirea larvei din ou'],
  ['trichineloscop', 'trichineloscop', 'aparat care proiectează mărit fragmentul de mușchi comprimat'],
  ['migrans', 'larva migrans', 'larva rătăcește prin țesuturi fără să ajungă adult'],
];

const T = (n, lab) => ({ img: `pr_${n}`, lab });

export const SL = [
  // ---------------- 57 · PRINCIPII
  {
    scene: 'd_stool', kick: 'LP 6 · Parazitologie · Principii', title: 'Ce cauți depinde de forma parazitului',
    points: [
      { h: 'Scaunul diareic', d: ['!!examinat proaspăt!!: trofozoiții mor repede și nu se mai mișcă', 'scaun diareic, proaspăt → **trofozoiți mobili**'] },
      { h: 'Scaunul format', d: ['formele de rezistență: **chisturi** (protozoare) și **ouă** (helminți)', 'scaun format → chisturi + ouă'] },
      { h: 'Concentrarea', d: ['ouăle sunt puține → metode care le adună într-o picătură', 'concentrezi ouăle: **strat gros (Kato-Miura)** · **flotație**'] },
      { h: 'Repetarea', d: ['eliminarea e **intermitentă**: un singur examen poate rata parazitul', '!!un examen negativ NU exclude → repeți!!'] },
      { h: 'Când nu e în scaun', d: ['ex.: **chistul hidatic, toxoplasma, trichinella**', 'unii paraziți nu apar în scaun: !!serologie, biopsie, imagistică!!'] },
    ],
    why: 'Trofozoitul e forma vie, activă, care trăiește puțin în afara gazdei; **chistul și oul** sunt formele care rezistă și transmit boala. De aceea !!tipul de scaun îți spune ce formă să cauți!!.',
    beatDur: 7,
  },
  // ---------------- 58 · CLASIFICAREA
  {
    scene: 'd_classify', kick: 'LP 6 · Clasificarea', title: 'Trei încrengături: protozoare, helminți, artropode',
    points: [
      { h: '??Protozoa: unicelulari??', d: ['paraziți unicelulari: amoeboide, ciliate, sporozoare, flagelate', 'la microscop: !!trofozoiți și chisturi!! → nativ, Lugol, MGG'] },
      { h: '??Plathelminthes: viermi plați??', d: ['**helminți = plathelminți + nemathelminți**', '**trematode** (nesegmentate) și **cestode** (segmentate: tenii)', 'ouă, proglote → Kato-Miura, flotație'] },
      { h: 'Nemathelminthes: viermi cilindrici', d: ['Ascaris, Enterobius, Toxocara, Trichinella', 'ouă, larve → Kato-Miura, larvoscopie, amprentă anală'] },
      { h: 'Arthropoda: artropode', d: ['**insecte** (păduchi, purici) și **arahnide** (acarieni, căpușe)', 'LP scrie „insectele parazite: păduchi, purici, acarieni”; acarienii sunt de fapt arahnide (manual)'] },
    ],
    why: 'Paraziții se elimină **intermitent** și adesea în număr mic. Directul vede o picătură, iar !!stratul gros (Kato-Miura) și flotația (Willis-Hung)!! examinează mult mai multă probă. De aceea un examen negativ nu exclude: se repetă.',
    say: 'Unde trăiește parazitul, acolo îl caut; !!forma pe care o caut, trofozoit, chist, ou sau larvă, îmi dă metoda!!.',
    beatDur: 6,
  },
  // ---------------- TRICHOMONAS
  {
    scene: 'mosaic', sceneOpts: { cols: 2, tiles: [T(21, 'trofozoit'), T(25, 'ciclu'), T(28, 'nativ'), T(32, 'Giemsa')] },
    kick: 'LP 6 · Protozoare · Trichomonas vaginalis', title: 'Trichomonas: doar trofozoit, doar din secreții',
    points: [
      { h: '??Morfologie: fără chist??', d: ['trofozoit **ovalar, 15 × 7 μm**, capătul anterior lat, cel posterior efilat', '**un nucleu**, **3–5 flageli** (4 anteriori + 1 recurent pe membrana ondulantă), **axostil**, costa', '!!nu are formă chistică!!'] },
      { h: 'Ciclul', d: ['tract genital feminin; la bărbat **uretră și prostată**', 'diviziune binară; !!singura gazdă: omul, transmitere sexuală!!', 'boala: **tricomoniază**; nu supraviețuiește în mediul extern'] },
      { h: '??Examenul direct??', d: ['recoltezi **secreție vaginală, secreție uretrală, primul jet de urină**', '!!preparat nativ din probe proaspete: trofozoiți mobili!!'] },
      { h: 'Giemsa + restul metodelor', d: ['Giemsa: citoplasmă **albastră**, nucleu **mov**, flageli', 'cultură (**mediul Diamond**, până la 5 zile): nu e de rutină · **ELISA** pentru bărbații asimptomatici', '!!??PCR = gold standard??!!'] },
    ],
    why: 'Fără chist, trofozoitul moare repede în afara gazdei: proba trebuie examinată **proaspătă**, nativ, ca să vezi mișcarea.',
    beatDur: 7,
  },
  // ---------------- GIARDIA
  {
    scene: 'mosaic', sceneOpts: { cols: 3, tiles: [T(35, 'trofozoit'), T(39, 'chist'), T(41, 'ciclu'), T(43, 'enterotest'), T(52, 'test rapid')] },
    kick: 'LP 6 · Protozoare · Giardia lamblia', title: 'Giardia: chisturi în scaunul format, trofozoiți în cel diareic',
    points: [
      { h: '??Trofozoitul??', d: ['**piriform, 10–12 × 5–7 μm**, **2 nuclei** anteriori, **4 perechi de flageli**, disc ventral de fixare', 'în nativ: mișcare de **„frunză căzătoare”**'] },
      { h: '??Chistul??', d: ['**ovalar, 7–10 μm**, perete gros cu **„halou”** clar dedesubt', '**2 sau 4 nuclei**, flageli liniari lângă corpusculul median'] },
      { h: '??Ciclul??', d: ['ingestia **chisturilor** (apă, alimente, fecal-orală) → în intestinul subțire fiecare chist dă **2 trofozoiți**', 'diviziune binară longitudinală; închistarea în colon', '!!scaun format → chisturi · scaun diareic → trofozoiți!!'] },
      { h: 'Recoltare și examen direct', d: ['**materii fecale: 1 probă/zi, 3 zile** · lichid duodenal (sondaj sau **enterotest**) · **biopsie**', 'nativ în ser fiziologic sau **Lugol**, coloranți tricrom · în primele 3 săptămâni nu apar paraziți în scaun', '**biopsia** poate fi cea mai fidelă metodă'] },
      { h: 'Imunodiagnostic și PCR', d: ['**Ac** (IgM, IgG, IgA) · **Ag**: imunofluorescență, **ELISA**, **test imunocromatografic rapid** din scaun', '**PCR** · cultura doar în cercetare'] },
    ],
    why: 'Chisturile ies **intermitent**, așa că examenul se repetă (3 zile), iar când scaunul e negativ dar suspiciunea rămâne, cauți **trofozoiții în lichidul duodenal sau în biopsie**.',
    warn: 'Chist în scaun **format**, trofozoit în scaun **diareic**.',
    beatDur: 7,
  },
  // ---------------- TOXOPLASMA
  {
    scene: 'mosaic', sceneOpts: { cols: 3, tiles: [T(55, 'tachizoiți'), T(63, 'chist cerebral'), T(58, 'oochist'), T(60, 'ciclu'), T(66, 'screening gravide')] },
    kick: 'LP 6 · Protozoare · Toxoplasma gondii', title: 'Toxoplasma: 4 stadii, direct în țesuturi, indirect prin anticorpi',
    points: [
      { h: 'Tachizoitul', d: ['**4 stadii**: tachizoit, merozoit, bradizoit (→ chisturi tisulare), sporozoit (în oochist)', 'tachizoit: formă de **semilună, 5–8 × 5–6 μm**', 'Giemsa: citoplasmă albastru-pal, **nucleu roșu**'] },
      { h: 'Chistul tisular', d: ['aglomerare de **bradizoiți**, **~100 μm**, în **mușchi și sistem nervos**', 'se vede pe frotiu sau biopsie (**H-E**)'] },
      { h: 'Oochistul', d: ['eliminat de **pisică** (gazda definitivă): **2 sporochisturi × 4 sporozoiți**', 'în preparat nativ'] },
      { h: '??Căile de infectare??', d: ['**carne insuficient preparată**, alimente/apă cu fecale de pisică, litieră, sol', '**transfuzie, transplant**, **transplacentar**'] },
      { h: '??Diagnostic??', d: ['**direct**: tachizoiți pe frotiu (Giemsa, PAS, H-E) din sânge, LCR, lichid amniotic, biopsie; **PCR**', '**indirect**: **IgM, IgG** (ELISA, RIF) · IgM și IgA la ~1 săpt., scad în 1–6 luni · !!IgG: platou 2–3 luni, persistă toată viața!!', '**Sabin-Feldman** (referință): tachizoiții vii **nu mai fixează albastrul de metilen** în prezența serului imun; se folosește rar · **Remington**'] },
    ],
    why: '**Gravide, algoritm:** !!IgG negativ!! → evitat contactul cu pisici, carne bine prăjită, reevaluare serologică. !!IgG pozitiv!! → **IgM**: pozitiv = **infecție acută** (decizie terapeutică); negativ = **repetă după 3 săpt.**: titru **la fel** = infecție trecută, **IgG în creștere** = infecție acută.',
    beatDur: 7,
  },
  // ---------------- PLASMODIUM MALARIAE
  {
    scene: 'mosaic', sceneOpts: { cols: 3, tiles: [T(68, 'inel'), T(69, 'trofozoit matur'), T(71, 'schizont'), T(72, 'gametocit'), T(75, 'ciclu'), T(80, 'test rapid')] },
    kick: 'LP 6 · Protozoare · Plasmodium malariae', title: 'P. malariae: formă în bandă, ciclu de 72 h, frotiu + picătură groasă',
    points: [
      { h: 'Trofozoit tânăr (inelul)', d: ['inel **compact, gros**, citoplasmă densă, nucleu roșu intens', 'uneori **bandă transversală** prin hematie'] },
      { h: 'Trofozoit matur', d: ['ocupă ~1/3 din hematie, **pigment malaric** brun, granular', '!!aspect de bandă transversală = semn distinctiv!!'] },
      { h: 'Schizont matur', d: ['**6–12 merozoiți** în **rozetă** în jurul pigmentului brun central'] },
      { h: 'Gametocit', d: ['rotund/oval, citoplasmă albastră cu granule brune, nucleu mare **excentric**', 'hematia gazdă **nu se mărește**'] },
      { h: '??Ciclul??', d: ['**Anopheles** = gazda definitivă (gametocit → zigot → oochist → sporozoiți în glandele salivare)', 'om: sporozoiți → **ficat** (schizont hepatic → merozoiți) → **hematii**: inel → bandă → schizont', '!!ciclu eritrocitar de 72 h = acces cuaternar!!'] },
      { h: '??Diagnostic??', d: ['**frotiu subțire** (Giemsa, Wright): **referință**, identifică specia', '**picătura groasă**: mai sensibilă, **nu diferențiază specia**; se fac împreună', '**RDT** (pLDH sau pan-Plasmodium; 15–20 min; mai puțin sensibil la parazitemii mici) · **PCR** (cea mai sensibilă; infecții mixte)'] },
    ],
    why: 'Picătura groasă **găsește** parazitul, frotiul subțire **spune specia**: de aceea se folosesc împreună.',
    beatDur: 7,
  },
  // ---------------- HELMINȚI + ECHINOCOCCUS
  {
    scene: 'mosaic', sceneOpts: { cols: 3, tiles: [T(91, 'adult'), T(93, 'ou'), T(95, 'ciclu'), T(89, 'chisturi hidatice'), T(97, 'CT cerebral')] },
    kick: 'LP 6 · Helminți · Echinococcus granulosus', title: 'Echinococcus: omul e gazdă intermediară, chistul hidatic',
    points: [
      { h: 'Adultul (în câine)', d: ['mic: **scolex** cu **4 ventuze și 28–40 cârlige** pe 2 rânduri, gât, **3 proglote** (imatur, matur, cu uter plin de ouă)', 'helminți: **trematode** (plate, nesegmentate), **cestode** (plate, segmentate), **nematode** (cilindrice)'] },
      { h: 'Oul', d: ['**ovoid, 13–41 μm**, membrană cu **striații radiare**, embrion **hexacant**', '!!se găsește în fecalele câinelui, nu la om!!'] },
      { h: '??Ciclul??', d: ['**definitivă: câinele** (și lup, șacal, vulpe) · **intermediare: oaie, capră, porc, OM**', 'omul ingeră ouă → **oncosfere** → sânge → organe, unde se închistează'] },
      { h: 'Boala', d: ['**echinococoză = hidatidoză**: **chist hidatic** (ficat, plămân; multiplu)', 'rupere → **șoc anafilactic**; **vomică hidatică** (chist deschis în bronhie)'] },
      { h: '??Diagnostic??', d: ['!!clinic + imagistic!!: **ecografie, radiografie, CT**', '**serologie: antigenul 5** (hemaglutinare indirectă, imunelectroforeză, **ELISA**)'] },
    ],
    why: 'Omul nu elimină ouă: nu cauți nimic în scaun, ci **chistul** (imagistic) și **anticorpii**.',
    beatDur: 7,
  },
  // ---------------- TAENIA
  {
    scene: 'mosaic', sceneOpts: { cols: 3, tiles: [T(103, 'T. solium'), T(114, 'T. saginata'), T(107, 'ou'), T(112, 'ciclu'), T(109, 'cisticercoză'), T(123, 'colonoscopie')] },
    kick: 'LP 6 · Helminți · Taenia solium și T. saginata', title: 'Solium vs saginata: scolexul, proglotele și cine face cisticercoză',
    points: [
      { h: 'T. solium (porcul)', d: ['scolex **globulos, cu rostru și 2 coroane de cârlige**, 4 ventuze', '**~900 proglote**; uter cu **<10 ramificații** dendritice'] },
      { h: 'T. saginata (vita)', d: ['scolex **piriform, fără rostru și fără cârlige**', '**1000–2000 proglote**; uter cu **~20 ramificații** dicotomice'] },
      { h: 'Oul: identic', d: ['**sferic, 40 μm**, embrion **hexacant** în membrană striată, membrană vitelină', '!!nu deosebești specia după ou!!'] },
      { h: '??Ciclul??', d: ['om: **carne crudă cu cisticerci** → tenie adultă (scolexul se fixează); proglote gravide eliminate (~6/zi)', '**cisticercoză**: omul ingeră **OUĂ** de T. solium (!!fecal-oral, nu din carne!!); carnea cu cisticerci dă doar tenie intestinală'] },
      { h: 'Cisticercoza', d: ['cisticercii în **mușchi, piele, inimă, plămân, ficat, SNC**', '**neurocisticercoză** → crize epileptice'] },
      { h: '??Diagnostic??', d: ['**amprenta anală**: ouă; **proglote gravide** în scaun (ouă doar dacă s-au spart)', '!!specia: proglotele + scolexul eliminat după tratament!! · **eozinofilie** (~13%) · **radiologic baritat**: defect de umplere în panglică · colonoscopie'] },
    ],
    why: 'Oul e identic, deci specia se pune **numai** pe **scolex și proglote**: cu cârlige și <10 ramificații = solium; fără cârlige și ~20 = saginata.',
    beatDur: 7,
  },
  // ---------------- ASCARIS
  {
    scene: 'mosaic', sceneOpts: { cols: 3, tiles: [T(125, 'adulți'), T(131, 'ou fecundat'), T(141, 'fecundat / nefecundat'), T(137, 'ciclu'), T(144, 'larve în plămân')] },
    kick: 'LP 6 · Nematode · Ascaris lumbricoides', title: 'Ascaris: oul fecundat, Kato-Miura și eozinofilia',
    points: [
      { h: 'Adultul', d: ['**cel mai mare nematod intestinal**, geohelmint; sexe separate', '♀ **20–25 cm**, ambele capete drepte · ♂ **10–17 cm**, capăt posterior **încurbat ventral**'] },
      { h: 'Oul fecundat', d: ['**65–75 × 30–50 μm**, galben-brun, înveliș **albuminos mamelonat**, celulă-ou rotundă cu spațiu liber la poli', 'rezistă >1 an în sol; larvă infectantă în **3–4 săpt.**'] },
      { h: 'Oul nefecundat', d: ['**mai alungit, 88–93 × 38–40 μm**, interior = **masă de granule** (fără masculi)', 'atipic, greu de recunoscut'] },
      { h: '??Ciclul??', d: ['ou infectant ingerat → duoden → vase → **ficat → inimă → plămân (5–10 zile)** → trahee, faringe → înghițit → intestin → adult'] },
      { h: '??Diagnostic??', d: ['!!ouă în scaun!! (după **60–70 zile**), mai bine prin **Kato-Miura**; doar parazit de același sex → fără ouă', '**larve** în spută sau suc gastric (zilele 8–16) · adult eliminat · **eozinofilie**: 30–50% în faza migratorie, <10% după 60 zile'] },
    ],
    why: 'Ouăle apar abia după 60–70 de zile; până atunci diagnosticul e pe **larvele din spută** și pe **eozinofilie**.',
    beatDur: 7,
  },
  // ---------------- ENTEROBIUS
  {
    scene: 'mosaic', sceneOpts: { cols: 3, tiles: [T(146, 'adult'), T(150, 'ou'), T(153, 'ciclu'), T(155, 'amprenta anală'), T(157, 'ouă pe bandă')] },
    kick: 'LP 6 · Nematode · Enterobius vermicularis', title: 'Enterobius: amprenta anală, 7 examene la 2 zile',
    points: [
      { h: 'Adultul', d: ['mic, alb-gălbui: ♀ **8–13 mm**, coadă ascuțită · ♂ **3–5 mm**, coadă încurbată', '**buton cefalic** (fixare), esofag rabditoid'] },
      { h: 'Oul', d: ['**50 × 30 μm**, ovalar, **asimetric** (o latură plană, una convexă), transparent, dublu înveliș', 'embrion **giriform**'] },
      { h: 'Ciclul', d: ['♀ depune ouăle **noaptea, în pliurile perianale** (prurit)', '**autoinfectare** mână-gură sau ouă din lenjerie → eclozare în intestin subțire, adulți în **cec**'] },
      { h: '??Amprenta anală??', d: ['bagheta cu **bandă adezivă transparentă** pe pliurile anale → lipită pe lamă', '!!7 examene la interval de 2 zile pentru a exclude diagnosticul!!'] },
      { h: 'Rezultat', d: ['la microscop, obiectiv uscat: pozitivă în **>50%**', 'în scaun doar **10–15%** · adultul se poate vedea perianal, în vagin, în scaun'] },
    ],
    why: 'Femela depune ouăle **în afara intestinului**, deci scaunul e aproape inutil: se face **amprenta anală**.',
    beatDur: 7,
  },
  // ---------------- TOXOCARA
  {
    scene: 'mosaic', sceneOpts: { cols: 2, tiles: [T(163, 'adult (câine)'), T(169, 'ou'), T(174, 'larva migrans oculară'), T(178, 'larvă în ficat')] },
    kick: 'LP 6 · Nematode · Toxocara', title: 'Toxocara: din câine, doar larvele la om',
    points: [
      { h: 'Adultul și sursa', d: ['**♂ 4–6 cm, ♀ 6–10 cm**, cuticulă galbenă, **2 aripi laterale** anterior', '**câinele (cățeii)** = sursa principală; ouă de pe blană, sol, alimente'] },
      { h: 'Oul', d: ['sferic-ovalar, înveliș subțire, **neregulat**, celulă nesegmentată', '!!nu e infectant la eliminare (1–4 săpt. în mediu)!!; eliminat doar de câine/pisică'] },
      { h: 'Larva migrans', d: ['omul **nu găzduiește adultul** → larvele rătăcesc: **viscerală** și **oculară**', 'manifestări cutanate alergice, hepato-/splenomegalie, febră'] },
      { h: '??Diagnostic??', d: ['!!dificil: în scaun NU sunt ouă!!, biopsia rar pozitivă', '**eozinofilie, Ac anti-Toxocara, CT, ecografie** + factori de risc (câini, geofagie)', 'certitudine: **larve în spută / granuloame**; ocular: Ac în fluidele oculare'] },
    ],
    why: 'Omul e gazdă **accidentală**: nu elimină ouă, deci diagnosticul e **serologic și clinic**, nu coprologic.',
    beatDur: 7,
  },
  // ---------------- TRICHINELLA
  {
    scene: 'mosaic', sceneOpts: { cols: 3, tiles: [T(189, 'larvă închistată'), T(187, 'ciclu'), T(185, 'biopsie musculară')] },
    kick: 'LP 6 · Nematode · Trichinella spiralis', title: 'Trichinella: larve închistate în mușchi, biopsie și trichineloscop',
    points: [
      { h: 'Larva închistată', d: ['**40–1200 μm**, cuticulă groasă de 1 μm, **răsucită în celula musculară**', 'în intestin se dechistează; **în 30 h** devine adult'] },
      { h: 'Ciclul', d: ['**același organism = gazdă definitivă și intermediară**', 'ciclul se oprește în **mușchiul scheletic**; continuă doar dacă altcineva mănâncă **carne cu larve vii**'] },
      { h: '??Diagnostic??', d: ['**biopsie musculară** (solear lângă tendonul ahilian, sau deltoid), **comprimată între 2 lame**, la **trichineloscop**', '!!biopsie pozitivă confirmă; negativă NU exclude!! · anamneză (carne insuficient preparată) · **eozinofilie >500/μL**'] },
    ],
    why: 'Nu cauți ouă în scaun: larvele sunt **în mușchi**, deci **biopsia**.',
    beatDur: 6,
  },
];
