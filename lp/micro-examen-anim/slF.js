// Completări din întrebările reale de la examenul LP Micro (toate secțiile și grupele, 10.2026): ce lipsea din deck.
// Slide-uri STATICE (anim: false): desen fix în img/n_*.jpg, cercuri numerotate care se aprind cu punctul curent (scena 'atlas').
// ??text?? = întrebat la examen măcar o dată (bold + subliniat, între semne de exclamare); !!text!! = roșu, ce dă puncte.

export const GL = [
  ['ELISA', 'test imunoenzimatic (Enzyme-Linked ImmunoSorbent Assay)'], ['RT-PCR', 'PCR cu revers-transcriptază (pornește de la ARN)'],
  ['qPCR', 'PCR cantitativ, citit în timp real'], ['ADNc', 'ADN complementar, copiat după ARN'],
  ['Taq', 'ADN-polimeraza termostabilă din Thermus aquaticus'], ['COVID-19', 'boala produsă de virusul SARS-CoV-2'],
  ['SARS-CoV-2', 'coronavirusul care produce COVID-19'], ['HIV', 'virusul imunodeficienței umane'],
  ['S. pyogenes', 'Streptococcus pyogenes (streptococul β-hemolitic de grup A)'], ['C. diphtheriae', 'Corynebacterium diphtheriae'],
  ['B. anthracis', 'Bacillus anthracis'], ['MGG', 'colorația May-Grünwald-Giemsa'], ['Ag', 'antigen'], ['Ac', 'anticorp'],
  ['LCR', 'lichidul cefalorahidian'], ['PCR', 'reacția de polimerizare în lanț'], ['MO', 'microscopul optic'], ['ARN', 'acidul ribonucleic'], ['ADN', 'acidul dezoxiribonucleic'],
];
export const TM = [
  ['pseudohif', 'pseudohife', 'lanțuri de celule alungite care rămân legate după înmugurire'],
  ['imunocromatograf', 'imunocromatografic', 'proba migrează pe o membrană și reacția Ag–Ac apare ca o linie colorată'],
  ['revers-transcript', 'revers-transcriptaza', 'enzima care copiază ARN-ul în ADN'],
  ['amplicon', 'amplicon', 'copia de ADN produsă de PCR'],
  ['spectrofotometr', 'spectrofotometru', 'aparat care măsoară cât de intensă e culoarea (densitatea optică)'],
  ['termolabil', 'termolabil', 'se strică la căldură'],
  ['mordant', 'mordant', 'substanță care fixează colorantul pe structură'],
];

const S = (img, kick, title, marks, points, extra = {}) => ({
  scene: 'atlas', anim: false, kick, title, hud: [],
  sceneOpts: { img, W: 1000, H: 900, marks }, points, beatDur: 7, ...extra,
});

// [titlul slide-ului după care intră, slide-ul nou]
export const INS = [
  // ---------- LP 1 · recoltarea: urina ----------
  ['Să nu omori germenul și să nu contaminezi proba', S('n_urina', 'LP 1 · Recoltarea · Urina',
    'Urina: jetul mijlociu pentru urocultură, primul jet pentru uretrită',
    // static: jetul în 3 segmente, recipientul steril 10–20 ml, ceas 2 h + frigider 4 °C, caseta uretrită
    [{ x: 170, y: 220, rx: 95, ry: 75, by: 30, lab: '', ly: -3000 }, { x: 600, y: 255, rx: 115, ry: 70, lab: '', ly: -3000 }, { x: 600, y: 440, rx: 120, ry: 95, lab: '', ly: -3000 }, { x: 260, y: 725, rx: 200, ry: 120, bx: -170, lab: '', ly: -3000 }, { x: 740, y: 725, rx: 200, ry: 120, bx: -185, lab: '', ly: -3000 }],
    [
      { h: 'Pregătirea', d: ['prima urină de dimineață, !!înainte de antibiotic!!', 'toaleta locală cu apă și săpun, clătire (antisepticul rămas ar omorî germenii din probă — manual)'] },
      { h: '??Jetul mijlociu??', d: ['primul jet se aruncă: spală **flora din uretră**', 'mijlocul jetului direct în **recipient steril**, fără să atingi interiorul · restul în toaletă'] },
      { h: '??Cât: 10–20 ml??', d: ['recipient steril, închis ermetic, etichetat, cu bilet de trimitere'] },
      { h: 'Transportul', d: ['la laborator în **≤ 2 h**; altfel la frigider, **4 °C** (max. 24 h — manual)', 'la temperatura camerei germenii se înmulțesc → bacteriurie fals crescută'] },
      { h: '??Uretrita → primul jet??', d: ['germenul e chiar în uretră, deci îl vrei în probă: !!primul jet!!, nu jetul mijlociu', 'tot primul jet la Trichomonas și la PCR pentru germenii transmiși sexual (manual)'] },
    ], {
      why: 'Uretra distală are floră proprie. Pentru o infecție a vezicii sau a rinichiului, primul jet ar contamina proba, deci îl arunci. La uretrită exact ce e în uretră cauți, deci păstrezi primul jet.',
      say: 'Pentru urocultură recoltez prima urină de dimineață, după toaleta locală, din **jetul mijlociu**, 10–20 ml într-un recipient steril, și o trimit în 2 ore sau o țin la 4 °C. La uretrită recoltez **primul jet**.',
    })],
  // ---------- LP 1 · recoltarea: exsudatul faringian + produsele irepetabile ----------
  ['Urina: jetul mijlociu pentru urocultură, primul jet pentru uretrită', S('n_faringe', 'LP 1 · Recoltarea · Exsudatul faringian',
    'Exsudatul faringian: tampon steril, amigdale + peretele posterior, nu limba',
    // static: gura deschisă cu apăsătorul pe limbă, tamponul pe amigdală, tub protector, tampon nazofaringian, 4 tuburi irepetabile
    [{ x: 795, y: 225, rx: 140, ry: 115, bx: -125, lab: '', ly: -3000 }, { x: 320, y: 360, rx: 255, ry: 225, bx: -230, dash: 1, lab: '', ly: -3000 }, { x: 205, y: 330, rx: 65, ry: 88, lab: '', ly: -3000 }, { x: 795, y: 525, rx: 150, ry: 80, bx: -125, lab: '', ly: -3000 }, { x: 500, y: 775, rx: 440, ry: 80, bx: -400, lab: '', ly: -3000 }],
    [
      { h: '??Ce tampon??', d: ['**tampon steril** (vată, dacron) pe tijă, în tub protector', 'apăsătorul de limbă ține limba jos'] },
      { h: '??Cum??', d: ['dimineața, **înainte de antibiotic**, fără gargară sau periaj înainte', 'ștergi ferm !!amigdalele și peretele posterior!!, prin rotire; NU atingi limba, obrajii, dinții'] },
      { h: '??De ce o faci??', d: ['cauți germenul anginei: **S. pyogenes** (streptococ β-hemolitic de grup A, pe geloză-sânge)', 'mai rar C. diphtheriae (Löffler), levuri (manual)'] },
      { h: '??Testul COVID-19??', d: ['tampon **nazofaringian** (și/sau faringian), tijă subțire și flexibilă', 'proba merge la **RT-PCR** (ARN viral) sau la **testul rapid de antigen**'] },
      { h: '??Ce se recoltează greu a doua oară??', d: ['!!LCR, biopsii, lichide din cavități!! (pleural, articular, peritoneal)', 'se trimit și se prelucrează **imediat**; LCR-ul bacteriologic NU la frigider'] },
    ], {
      why: 'Germenul stă pe mucoasa inflamată (amigdale, peretele posterior), nu pe limbă: atingerea limbii aduce floră din salivă care acoperă patogenul. Proba ajunge la laborator în **≤ 3 h**, ca germenul să fie viu.',
      say: 'Exsudatul faringian se recoltează cu un **tampon steril**, înainte de antibiotic, ștergând amigdalele și peretele posterior fără să ating limba; caut în principal **streptococul β-hemolitic de grup A**.',
      warn: 'Produsele irepetabile nu se pot cere din nou: le prelucrezi primele, iar LCR-ul nu stă la frig (meningococul moare la frig).',
    })],
  // ---------- LP 1 · sterilizarea: întrebarea nr. 1 ----------
  ['Uscată omoară prin oxidare, umedă prin denaturare', S('n_steril', 'LP 1 · Sterilizarea · întrebarea de la toate grupele',
    'Sterilizarea e decontaminarea completă; autoclavul: ce intră și ce nu',
    // static: borcan steril vs decontaminat, autoclavul cu încărcătura, materialele interzise cu X, oala de fiert cu sporul care rezistă
    [{ x: 655, y: 215, rx: 85, ry: 100, bx: -70, by: 20, lab: '', ly: -3000 }, { x: 845, y: 215, rx: 85, ry: 100, bx: 70, by: 20, lab: '', ly: -3000 }, { x: 275, y: 345, rx: 205, ry: 215, bx: -185, lab: '', ly: -3000 }, { x: 750, y: 640, rx: 200, ry: 205, bx: -185, lab: '', ly: -3000 }, { x: 230, y: 785, rx: 185, ry: 75, lab: '', ly: -3000 }],
    [
      { h: '??Sterilizarea??', d: ['= distrugerea sau îndepărtarea **tuturor** microorganismelor, !!inclusiv a sporilor!!', 'metode: căldură (autoclav, Poupinel), filtrare, radiații ionizante, oxid de etilen, glutaraldehidă'] },
      { h: '??Decontaminarea??', d: ['= **scăderea numărului** de germeni, ca obiectul să fie sigur de manipulat', 'curățarea, dezinfecția (obiecte), antisepsia (țesut viu): nu garantează sterilitatea și nu omoară sigur sporii · forma completă = sterilizarea'] },
      { h: '??Autoclavul: ce e, la ce îl folosim??', d: ['abur sub presiune: !!121 °C, 15–30 min!!', 'pentru **medii de cultură**, material contaminat (înainte de aruncare), instrumente, textile, sticlărie, soluții apoase'] },
      { h: '??Ce NU se autoclavează??', d: ['unde aburul nu pătrunde: **pulberi, uleiuri, vaselină** → Poupinel', 'ce nu suportă căldura/umezeala: **plastic termolabil, seruri, vaccinuri, soluții de antibiotice** → filtrare, oxid de etilen, radiații (manual)'] },
      { h: '??Fierberea: la ce o folosim??', d: ['100 °C, 30 min: omoară formele vegetative, !!nu sporii!! → NU sterilizează', 'doar decontaminare: apă, obiecte, când nu ai altceva (manual)'] },
    ], {
      why: 'Sporii sunt cele mai rezistente forme: doar sterilizarea îi omoară sigur. Aburul pătrunde și cedează multă căldură la condensare, de aceea autoclavul merge la 121 °C, nu la 160 °C ca Poupinelul; dar unde aburul nu intră (ulei, pulbere) sau materialul nu suportă căldura, alegi altă metodă.',
      say: '**Sterilizarea** înseamnă distrugerea tuturor microorganismelor, inclusiv a sporilor. Exemplu: **autoclavarea**, abur sub presiune la 121 °C, 15–30 de minute; o folosim pentru medii de cultură, material contaminat și instrumente.',
    })],
  // ---------- LP 2 · preparatul nativ ----------
  ['Tipul de preparat decide ce poți vedea', S('n_nativ', 'LP 2 · Preparatul nativ · pas cu pas',
    'Preparatul nativ: germenul viu, necolorat, între lamă și lamelă',
    // static: lama cu picătura + ansa, lamela coborâtă oblic, microscopul ×40; jos bacili mobili, trofozoit, levuri
    [{ x: 205, y: 265, rx: 140, ry: 105, lab: '', ly: -3000 }, { x: 535, y: 255, rx: 140, ry: 100, lab: '', ly: -3000 }, { x: 830, y: 265, rx: 95, ry: 150, lab: '', ly: -3000 }, { x: 500, y: 680, rx: 450, ry: 165, bx: -420, dash: 1, lab: '', ly: -3000 }],
    [
      { h: '??Cum îl faci??', d: ['pe o lamă curată: o picătură de **ser fiziologic** + puțin produs (sau o colonie, cu ansa)', 'produsele lichide (urină, LCR, lichide de puncție) se pun direct, fără ser'] },
      { h: 'Lamela', d: ['o cobori **oblic**, dintr-o margine, ca să nu prinzi bule de aer', 'excesul de lichid îl tamponezi cu hârtie de filtru'] },
      { h: 'Examinarea', d: ['**imediat**, ×10 apoi **×40 (uscat)**; condensor coborât, diafragmă închisă (contrast)', 'fond întunecat pentru spirochete'] },
      { h: '??Scopul??', d: ['germeni **vii** → !!mobilitatea!!, forma, dispoziția', 'parazitologie: **trofozoiți mobili** (Trichomonas, Giardia, amibe), chisturi, ouă · levuri, leucocite'] },
    ], {
      why: 'Nu fixezi și nu colorezi, deci germenul rămâne viu și se mișcă; de aceea preparatul se citește repede, înainte să se usuce. Fără colorant contrastul e mic, așa că reduci lumina.',
      say: 'Preparatul nativ: pun pe lamă o picătură de ser fiziologic cu produsul, acopăr cu lamela fără bule și examinez imediat la ×40; scopul e să văd **germenii vii și mobilitatea**, inclusiv paraziții mobili.',
      warn: 'Pe frotiul fixat germenii sunt morți: mobilitatea o vezi doar pe nativ.',
    })],
  // ---------- LP 2 · Giemsa, Leifson, streptobacili, Candida ----------
  ['Ce recunoști pe frotiu', S('n_colorari', 'LP 2 · Alte colorații + forme cerute la examen',
    'Giemsa, Leifson, streptobacilii și Candida pe Gram',
    // static: frotiu de sânge cu inele, bacil cu flageli, lanț de bacili violet, levuri înmugurite + pseudohife lângă coci (scară)
    [{ x: 265, y: 270, rx: 205, ry: 160, bx: -190, lab: '', ly: -3000 }, { x: 735, y: 270, rx: 205, ry: 160, bx: -190, lab: '', ly: -3000 }, { x: 265, y: 680, rx: 205, ry: 160, bx: -190, lab: '', ly: -3000 }, { x: 735, y: 680, rx: 205, ry: 160, bx: -190, lab: '', ly: -3000 }],
    [
      { h: '??Colorația Giemsa / MGG??', d: ['pentru **paraziții din sânge și frotiuri**: Plasmodium (frotiu + picătură groasă), Toxoplasma, Trichomonas', 'nucleul roșu-violet, citoplasma albastră'] },
      { h: '??Leifson??', d: ['colorație specială pentru **cili (flageli)**: un mordant îi îngroașă, ca să se vadă la MO (manual)', 'arată câți flageli are germenul și unde sunt (polari, peritrichi)'] },
      { h: '??Streptobacili Gram-pozitivi??', d: ['**bacili în lanț**: se divid în același ax și rămân legați', 'ex. !!B. anthracis!! („trestie de bambus”)'] },
      { h: '??Candida pe Gram??', d: ['!!Gram-pozitivă!!, ovală, mult **mai mare** decât bacteriile', '**înmugurire** (blastospori) ± **pseudohife**'] },
    ], {
      why: 'Forma și gruparea vin din felul în care se divide celula: în același ax → lanțuri. Candida e o celulă eucariotă cu perete gros, deci reține violetul ca un Gram-pozitiv, dar o recunoști după mărime și înmuguriri.',
      say: 'Pe frotiul Gram, **Candida** apare ca celule ovale, **Gram-pozitive**, mult mai mari decât bacteriile, cu **înmuguriri și pseudohife**.',
    })],
  // ---------- LP 5 · ELISA ----------
  ['RIF, IPO, ELISA: faci vizibil complexul Ag–Ac', S('n_elisa', 'LP 5 · ELISA · pas cu pas',
    'ELISA: culoarea apare doar dacă s-a format complexul Ag–Ac',
    // static: 4 godeuri (Ag fixat → Ac bolnav → anti-Ig cu enzimă → substrat colorat), rândul de intensități, spectrofotometrul
    [{ x: 276, y: 300, rx: 235, ry: 175, lab: '', ly: -3000 }, { x: 609, y: 290, rx: 108, ry: 175, bx: 80, lab: '', ly: -3000 }, { x: 831, y: 290, rx: 108, ry: 175, lab: '', ly: -3000 }, { x: 500, y: 715, rx: 455, ry: 140, bx: -420, lab: '', ly: -3000 }, { x: 820, y: 705, rx: 120, ry: 95, lab: '', ly: -3000 }],
    [
      { h: '??ELISA indirect: cauți Ac din serul bolnavului??', d: ['godeul are **Ag cunoscut** fixat pe plastic (suport solid)', 'pui **serul**: Ac lui se leagă de Ag → **spălare**'] },
      { h: 'Ac anti-Ig marcat cu enzimă', d: ['se leagă de Ac bolnavului → spălare: pleacă tot ce nu s-a legat'] },
      { h: 'Substratul → culoare', d: ['enzima transformă substratul incolor într-un produs **colorat**'] },
      { h: 'Citirea: !!cantitativă!!', d: ['intensitatea culorii (densitatea optică, la spectrofotometru) crește cu cantitatea de Ac', 'ELISA „sandwich” (cauți Ag): Ac de captură pe godeu → proba → Ac marcat → substrat'] },
      { h: '??Avantaje / dezavantaje??', d: ['+ **sensibil**, cantitativ, multe probe deodată, automatizabil, fără radioactivitate', '− ore + aparatură; **reacții încrucișate** → fals pozitiv; la început Ac lipsesc (fereastra) → fals negativ'] },
    ], {
      why: 'Spălările lasă în godeu doar ce s-a legat specific. Dacă bolnavul nu are anticorpi, anti-Ig-ul marcat nu are de ce să se lege, e spălat, iar substratul rămâne incolor.',
      say: '**ELISA** e o reacție Ag–Ac cu **marcaj enzimatic**: un reactant e fixat pe un suport solid, complexul format se evidențiază cu un anticorp marcat cu enzimă, care transformă un substrat într-un produs colorat; e **sensibilă și cantitativă**.',
    })],
  // ---------- LP 5 · testele rapide + fals +/− ----------
  ['ELISA: culoarea apare doar dacă s-a format complexul Ag–Ac', S('n_rapid', 'LP 5 · Testele rapide · fals pozitiv și fals negativ',
    'Testul rapid: proba migrează pe bandă; linia C trebuie să apară mereu',
    // static: banda (Ac marcați, linia T, linia C), cele 3 casete (pozitiv, negativ, invalid), caseta fals +/−
    [{ x: 320, y: 710, rx: 265, ry: 140, bx: -240, lab: '', ly: -3000 }, { x: 820, y: 280, rx: 110, ry: 180, lab: '', ly: -3000 }, { x: 340, y: 280, rx: 285, ry: 180, bx: -270, lab: '', ly: -3000 }, { x: 180, y: 285, rx: 100, ry: 170, lab: '', ly: -3000 }, { x: 795, y: 715, rx: 155, ry: 140, bx: -140, lab: '', ly: -3000 }],
    [
      { h: '??Testul rapid (imunocromatografic)??', d: ['Ac marcați cu particule colorate (aur coloidal); proba **migrează** prin capilaritate', 'dacă Ag există, complexul e prins la linia **T** → bandă colorată'] },
      { h: 'Linia de control (C)', d: ['prinde Ac-ul marcat care a trecut: !!trebuie să apară mereu!!', 'fără C → test **invalid**, îl repeți'] },
      { h: '??Testul de antigen COVID-19??', d: ['tampon nazofaringian → tub cu soluție de extracție → câteva picături în godeul S → ~15 min', '**C + T = pozitiv** · **doar C = negativ**'] },
      { h: '??Avantaje / dezavantaje??', d: ['+ rapid (15–20 min), ieftin, fără aparatură, lângă bolnav', '− doar **calitativ**, mai puțin sensibil decât PCR/ELISA → !!fals negativ!! când e puțin Ag'] },
      { h: '??Fals pozitiv / fals negativ??', d: ['**fals pozitiv** = test + la omul sănătos: reacții încrucișate, contaminare, citire după timpul indicat', '**fals negativ** = test − la bolnav: prea puțin Ag/Ac, recoltare greșită, fereastra serologică, imunodepresie'] },
    ], {
      why: 'Proba trage cu ea anticorpii marcați. Linia T are anticorpi care prind complexul doar dacă Ag există; linia C prinde anticorpul marcat oricum, ca dovadă că lichidul a migrat și reactivii merg.',
      say: 'Testul rapid de antigen e **imunocromatografic**: proba migrează pe o membrană, antigenul se leagă de anticorpi marcați cu particule colorate și e prins la **linia de test**; **linia de control** trebuie să apară mereu, altfel testul e invalid.',
    })],
  // ---------- LP 5 · PCR: ce se întreabă ----------
  ['O secvență cunoscută își caută perechea; PCR o multiplică întâi', S('n_pcr', 'LP 5 · PCR · ce se întreabă',
    'PCR: primerii aleg ce se copiază; la ARN faci întâi ADN',
    // static: dublul lanț cu secvența țintă, cei doi primeri și Taq; ARN → revers-transcriptază → ADNc; lista „de ce nu de rutină”
    [{ x: 500, y: 290, rx: 465, ry: 215, dash: 1, lab: '', ly: -3000 }, { x: 375, y: 241, rx: 85, ry: 45, lab: '', ly: -3000 }, { x: 260, y: 715, rx: 205, ry: 135, bx: -185, lab: '', ly: -3000 }, { x: 735, y: 715, rx: 205, ry: 135, bx: -200, lab: '', ly: -3000 }],
    [
      { h: '??Ce e PCR??', d: ['amplificare **in vitro** a unei secvențe de ADN: din puține copii → milioane (**2ⁿ**)', 'ai nevoie de ADN-ul probei, **primeri**, nucleotide, **Taq polimerază**, termocicler'] },
      { h: '??Primerii și funcția lor??', d: ['fragmente scurte de ADN **monocatenar**, complementare capetelor secvenței țintă', '!!delimitează ce se copiază și dau punctul de start pentru polimerază!!'] },
      { h: '??Virusuri ARN? DA → RT-PCR · tipurile de PCR??', d: ['**RT-PCR**: revers-transcriptaza copiază ARN-ul în ADNc, apoi PCR (SARS-CoV-2, HIV, gripa)', 'tipuri: clasic (gel) · **RT-PCR** · **real-time / qPCR** (cantitativ: încărcătura virală) · multiplex (mai multe ținte) · nested (manual)'] },
      { h: '??De ce nu e de rutină??', d: ['**scump**, aparatură, personal instruit; contaminarea cu ampliconi → **fals pozitiv**', 'găsește și ADN de germen **mort** · nu îți dă germenul viu → !!fără antibiogramă!! (vezi doar gene de rezistență cunoscute, ex. mecA)'] },
    ], {
      why: 'Polimeraza nu poate începe un lanț de la zero: are nevoie de un capăt de care să lege nucleotidele. Primerii îi dau acest capăt exact la marginile secvenței alese, așa că se copiază doar porțiunea dintre ei.',
      say: '**PCR** amplifică in vitro o secvență de ADN prin cicluri de denaturare, aliniere a primerilor și elongare; **primerii** sunt fragmente scurte complementare capetelor secvenței și delimitează ce se copiază. Pentru virusurile ARN se folosește **RT-PCR**.',
    })],
];
