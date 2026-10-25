// PARTEA D: LP 6 Parazitologie (paginile 57–64 ale deck-ului de examen Micro). Un slide pe pagină: principiile, clasificarea,
// protozoarele intestinale și genitale, Toxoplasma, teniile + Echinococcus, trematodele + alte cestode, nematodele pe gură, nematodele prin piele / carne / animale.

export const GL = [
  ['LP', 'lucrarea practică'], ['MGG', 'colorația May-Grünwald-Giemsa'], ['IgM', 'imunoglobulina M (apare prima)'],
  ['IgG', 'imunoglobulina G (apare mai târziu, persistă)'], ['IgG+', 'anticorpi IgG prezenți'], ['IgM−', 'anticorpi IgM absenți'],
  ['CT', 'tomografia computerizată'], ['B12', 'vitamina B12 (cobalamina)'],
  ['T. solium', 'Taenia solium (tenia porcului)'], ['T. saginata', 'Taenia saginata (tenia vitei)'], ['D. latum', 'Diphyllobothrium latum (tenia peștelui)'],
  ['săpt.', 'săptămâni'],
];
export const TM = [
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
      { h: 'Protozoa: unicelulari', d: ['paraziți unicelulari: amoeboide, ciliate, sporozoare, flagelate', 'la microscop: !!trofozoiți și chisturi!! → nativ, Lugol, MGG'] },
      { h: 'Plathelminthes: viermi plați', d: ['**helminți = plathelminți + nemathelminți**', '**trematode** (Fasciola) și **cestode** (tenii)', 'ouă, proglote → Kato-Miura, flotație'] },
      { h: 'Nemathelminthes: viermi cilindrici', d: ['Ascaris, Enterobius, Trichuris', 'ouă, larve → Kato-Miura, larvoscopie, amprentă anală'] },
      { h: 'Arthropoda: insecte', d: ['insectele parazite: păduchi, purici, acarieni'] },
    ],
    why: 'Paraziții se elimină **intermitent** și adesea în număr mic. Directul vede o picătură, iar !!stratul gros (Kato-Miura) și flotația (Willis-Hung)!! examinează mult mai multă probă. De aceea un examen negativ nu exclude: se repetă.',
    say: 'Unde trăiește parazitul, acolo îl caut; !!forma pe care o caut, trofozoit, chist, ou sau larvă, îmi dă metoda!!.',
    beatDur: 6,
  },
  // ---------------- 59 · PROTOZOARELE INTESTINALE ȘI GENITALE
  {
    scene: 'd_proto', kick: 'LP 6 · Protozoarele intestinale și genitale', title: 'Cum intră, unde trăiește, ce cauți',
    points: [
      { h: 'Entamoeba histolytica', d: ['intră ca **chist înghițit** (apă, alimente); trăiește în cec, colon (abces hepatic)', 'trofozoiții invadează mucoasa **cecului** → ulcere → **dizenterie amibiană**', 'diareic: **trofozoit cu hematii**, examinat imediat · format: !!chist cu 4 nuclei!!, nativ + Lugol'] },
      { h: 'Giardia lamblia', d: ['chist înghițit (fecal-oral); se lipește cu **discul adeziv** de duoden → **steatoree**', 'chisturile ies intermitent: !!repeți de 4 ori la 7 zile!! + lichid duodenal, biopsie'] },
      { h: 'Trichomonas vaginalis', d: ['flagelat !!fără chist → transmitere directă, sexuală!!; trăiește în vagin, uretră', 'secreția se examinează **repede**, cât parazitul se mișcă: trofozoit mobil, nativ; primele 4–5 zile postmenstrual'] },
    ],
    warn: '**Entamoeba coli** e nepatogenă și seamănă: are chist cu **8 nuclei** (histolytica are 4) și nu fagocitează hematii.',
    why: '!!Chistul transmite, trofozoitul îmbolnăvește!!. Chistul rezistă în mediu și **transmite**; trofozoitul moare repede în afara corpului, dar el **îmbolnăvește**. Scaunul format conține chisturi, cel diareic trofozoiți.',
    beatDur: 8,
  },
  // ---------------- 60 · TOXOPLASMA
  {
    scene: 'd_toxo', kick: 'LP 6 · Toxoplasma', title: 'Cum ajunge Toxoplasma la om și cum o cauți',
    points: [
      { h: 'Pisica', d: ['!!gazda definitivă!!: ciclul sexuat în intestin', 'elimină **oochiști** în fecale'] },
      { h: 'Oochiștii', d: ['sporulează în **sol**; omul îi înghite cu **legume nespălate**'] },
      { h: 'Chisturile tisulare', d: ['persistă în **mușchi și creier** (animalele; pisica le mănâncă: carnivorism)', 'omul se infectează din **carne insuficient preparată**'] },
      { h: 'Transplacentar', d: ['omul = gazdă intermediară', '!!doar primoinfecția din sarcină pune fătul în pericol!!'] },
    ],
    why: 'Diagnosticul se sprijină pe **serologie**: !!IgM apare prima → infecție recentă; IgG singure → infecție trecută!!. La gravida cu IgG+ și IgM− repeți IgG după **3 săptămâni**, ca să vezi dacă infecția e veche sau abia începe.',
    say: 'Omul se infectează pe trei căi: oochiști de la pisică, chisturi din carne și transplacentar. La gravidă contează doar primoinfecția din sarcină.',
    beatDur: 7,
  },
  // ---------------- 61 · TENIILE ȘI ECHINOCOCCUS
  {
    scene: 'd_tenia', kick: 'LP 6 · Teniile și Echinococcus', title: 'Cine e gazda definitivă decide ce găsești în scaun',
    points: [
      { h: 'Taenia: carnea crudă', d: ['porc → **T. solium**, vită → **T. saginata**', 'adultul trăiește în **intestinul omului** = !!omul e gazda definitivă!!'] },
      { h: 'Ce cauți la teniază', d: ['**proglote** în scaun, **scolexul** după tratament; amprenta anală', 'ouăle sunt **identice** la cele două specii'] },
      { h: 'Cisticercoza', d: ['omul **înghite ouăle** de T. solium și face larva', 'creier (crize epileptice), ochi, mușchi'] },
      { h: 'Echinococcus: chistul hidatic', d: ['câinele = gazda definitivă (ouă în fecale → pe blană, mâini, legume, apă)', '!!omul e gazdă intermediară (ca oaia)!!: ficat 60–70%, plămân 20–30%', 'cauți **chistul** (ecografie, CT) și **anticorpii** (antigenul 5); NU are ouă în scaun'] },
    ],
    warn: 'Chistul hidatic !!nu se puncționează „orbește”!!: lichidul hidatic e antigenic și dă **șoc anafilactic**.',
    why: 'Adultul (care face ouă) trăiește doar în gazda **definitivă**. Unde omul e gazdă definitivă (teniaza) găsești proglote și ouă; unde e gazdă **intermediară** (hidatidoza, cisticercoza) are doar larva în țesuturi și !!nu elimină ouă!!; la hidatidoză cauți chistul imagistic și anticorpii serologic.',
    beatDur: 8,
  },
  // ---------------- 62 · TREMATODE ȘI ALTE CESTODE
  {
    scene: 'd_trema', kick: 'LP 6 · Trematode și alte cestode', title: 'Fiecare are „sursa” lui: plantă, pește, om, purice',
    points: [
      { h: 'Fasciola hepatica (gălbeaza)', d: ['trematod; omul mănâncă **metacercari pe salata de creson**; adultul trăiește în **căile biliare**', 'ouă (operculate) în fecale sau aspirat duodenal !!abia după 90 de zile!!; eozinofilie, serologie'] },
      { h: 'Diphyllobothrium latum', d: ['**tenia peștelui** (pește crud, 2 gazde acvatice), cel mai lung parazit uman', 'consumă **vitamina B12** → anemie megaloblastică · ouă operculate (Willis-Hung)'] },
      { h: 'Hymenolepis nana', d: ['!!fără gazdă intermediară, cu autoinfectare!!: oul e infectant direct', 'de aceea persistă: **reexaminezi** · ouă cu filamente'] },
      { h: 'Dipylidium caninum', d: ['tenia câinelui; copilul înghite **puricele câinelui**', 'proglotele **nu se dezintegrează**, le vezi în scaun: proglote mobile „în butoiaș”'] },
    ],
    why: '!!Ouăle operculate (cu capac) sunt la Fasciola și D. latum!!. La Fasciola întâi apare **eozinofilia** (primele 3 luni), iar ouăle vin abia când adultul ajunge în căile biliare; atenție la **„ouăle de pasaj”** după ficat de vită consumat.',
    beatDur: 7,
  },
  // ---------------- 63 · NEMATODELE CARE INTRĂ PE GURĂ
  {
    scene: 'd_oral', kick: 'LP 6 · Nematodele care intră pe gură', title: 'Ascaris, Enterobius, Trichuris: oul e forma infectantă',
    points: [
      { h: 'Ascaris', d: ['ou embrionat din sol → intestin → sânge → **plămân** → înghițit → intestin', 'drumul prin plămân → **sindrom Loeffler, eozinofilie**', 'întâi **larve în spută** (primele 2 săpt.), abia după !!60–70 de zile ouă în scaun!!'] },
      { h: 'Enterobius (oxiurul)', d: ['ou de pe degete, obiecte, alimente; trăiește în cec, colon', 'femela depune ouăle **pe pielea perianală, seara**', 'amprenta anală, dimineața, înainte de toaletă: !!> 50% pozitivă, scaunul doar 10–15%!!'] },
      { h: 'Trichuris (tricocefalul)', d: ['ou din sol (geohelmint); se înfige cu **capătul efilat** în mucoasa **cecului**', 'ouă brune **„în lămâie”**, cu dopuri la poli; Kato-Miura'] },
    ],
    why: 'Oul de Ascaris are nevoie de **săptămâni în sol** ca să devină infectant (geohelmint). Oul de Enterobius devine embrionat **în câteva ore** pe piele: de aceea pruritul duce la !!autoinfecție!! și boala se întreține singură.',
    say: 'Pentru Enterobius fac amprenta anală dimineața, înainte de toaletă, pentru că !!femela își depune ouăle pe piele, nu în intestin!!.',
    beatDur: 9,
  },
  // ---------------- 64 · NEMATODELE PRIN PIELE, CARNE, DE LA ANIMALE
  {
    scene: 'd_skin', kick: 'LP 6 · Nematodele prin piele, carne, de la animale', title: 'Pe unde intră îți spune ce cauți',
    points: [
      { h: 'Ancylostoma', d: ['larva (filariformă) din **sol** străbate **pielea intactă** → plămân → duoden', 'duodenul: taie mucoasa, suge sânge → **anemie feriprivă** · ouă în scaun; larvoscopie'] },
      { h: 'Strongyloides', d: ['larva filariformă prin piele → duoden, jejun; ouăle **eclozează în intestin** → !!în scaun larve!! (și lichid duodenal)', '**autoinfecție**: la imunodeprimați → forma diseminată'] },
      { h: 'Trichinella', d: ['**carne de porc și mistreț**; larvele se închistează în **mușchi** striat', '!!biopsie (solear, deltoid) comprimată între 2 lame!!, trichineloscop'] },
      { h: 'Toxocara', d: ['parazit al **câinelui** (ouă de la câine, cățeii, pisică); la om larva **nu se maturizează**: larva migrans în ficat, plămân, ochi', 'nu există ouă în scaun → diagnostic **serologic**, eozinofilie'] },
    ],
    warn: '!!Fără ouă în scaun!!: Enterobius (amprenta), Strongyloides (larve), Toxocara și hidatidoza (serologie).',
    why: 'Unde omul nu e gazdă definitivă (Toxocara) sau unde ouăle eclozează înăuntru (Strongyloides), coproparazitologicul clasic pentru ouă nu ajută; !!schimbi produsul sau metoda!!.',
    beatDur: 9,
  },
];
