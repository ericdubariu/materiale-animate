// Recapitularea de dimineață (≈30 min, 19 slide-uri): ce se uită repede și s-a cerut la examen. Toate scenele statice (anim: false).
// ??text?? = întrebat la examen măcar o dată; !!text!! = roșu, ce dă puncte.

export const GL = [
  ['AB', 'antibiotic'], ['ZN', 'colorația Ziehl-Neelsen'], ['BAAR', 'bacili acid-alcoolo-rezistenți'], ['MSA', 'Mannitol Salt Agar (Chapman)'],
  ['ABT', 'albastru de bromtimol'], ['TSI', 'Triple Sugar Iron (trei zaharuri + fier)'], ['H₂S', 'hidrogen sulfurat'], ['MH', 'Mueller-Hinton'],
  ['CMI', 'concentrația minimă inhibitorie'], ['RFC', 'reacția de fixare a complementului'], ['RIF', 'reacția de imunofluorescență'],
  ['IgM', 'imunoglobulina M (apare prima)'], ['IgG', 'imunoglobulina G (apare mai târziu, rămâne)'], ['Ag5', 'antigenul 5 al chistului hidatic'],
  ['LJ', 'mediul Löwenstein-Jensen'], ['S/I/R', 'sensibil / intermediar / rezistent'],
];
export const TM = [];

const K = (n) => `Recapitulare de dimineață · ${n} / 30`;
const AT = (n, img, title, marks, points, extra = {}) => ({
  scene: 'atlas', anim: false, kick: K(n), title, hud: [], sceneOpts: { img, W: 1000, H: 900, marks: marks.map((m) => ({ lab: '', ly: -3000, ...m })) }, points, beatDur: 6, ...extra,
});
const MO = (n, tiles, title, points, extra = {}) => ({
  scene: 'mosaic', anim: false, kick: K(n), title, hud: [], sceneOpts: { cols: tiles.length > 4 ? 3 : 2, tiles: tiles.map(([img, lab]) => ({ img, lab })) }, points, beatDur: 6, ...extra,
});
const q = (x, y, rx, ry, bx = 0, by = 0) => ({ x, y, rx, ry, ...(bx ? { bx } : {}), ...(by ? { by } : {}) });

export const SL = [
  MO(1, [['n_steril', 'LP 1'], ['r_gram', 'LP 2'], ['e_chapP', 'LP 3'], ['r_abg', 'LP 5'], ['pr_155', 'LP 6'], ['e_hemoliza', 'medii']],
    'Recapitularea de dimineață: ce se uită repede și s-a cerut', [
      { h: 'Cum o faci (≈ 40 min)', d: ['≈ 1,5 min pe slide la 2–17, ≈ 45 s pe fișele de paraziți (18–30): întâi spui cu voce tare, apoi verifici punctele'] },
      { h: '??așa?? = s-a întrebat la examen', d: ['roșu = ce dă puncte'] },
      { h: 'Ordinea', d: ['LP 1 → LP 2 → LP 3–4 → LP 5 → LP 6, apoi mediile din poze'] },
      { h: 'Dacă rămâi fără timp', d: ['sari ultimele peste Ag–Ac (15) și peste fișele mici de paraziți (29–30): !!sterilizarea, recoltarea, Gram, mediile și PCR!! se cer la toate grupele'] },
      { h: 'Formula la orice mediu', d: ['nume → tip → ce conține → ce crește → + / − și de ce'] },
      { h: 'Formula la orice metodă', d: ['ce e → cum o faci → la ce folosește'] },
    ]),
  AT(2, 'n_steril', 'LP 1 · Sterilizarea: cifrele', [q(655, 215, 85, 100, -70, 20), q(845, 215, 85, 100, 70, 20), q(275, 345, 205, 215, -185), q(750, 640, 200, 205, -185), q(230, 785, 185, 75)], [
    { h: '??Sterilizarea??', d: ['distruge tot, !!inclusiv sporii!! · control: Stearotest (B. stearothermophilus), acid benzoic (se topește la 121 °C)'] },
    { h: '??Decontaminarea??', d: ['scade numărul · dezinfecție = obiecte · antisepsie = țesut viu (alcool **70%**, iod)'] },
    { h: '??Autoclavul??', d: ['!!121 °C, 15–30 min!! (bloc operator 134 °C) · Poupinel: 160 °C / 2 h, 180 °C / 1 h'] },
    { h: '??Ce NU se autoclavează??', d: ['pulberi, uleiuri → Poupinel · termolabile → filtrare (0,22 µm), oxid de etilen'] },
    { h: '??Fierberea??', d: ['100 °C, 30 min → !!nu sporii!! · tindalizare: 3 zile · pasteurizare: sub 100 °C'] },
  ]),
  AT(3, 'n_urina', 'LP 1 · Urina: cum, cât, în cât timp', [q(170, 220, 95, 75, 0, 30), q(600, 255, 115, 70), q(600, 440, 120, 95), q(260, 725, 200, 120, -170), q(740, 725, 200, 120, -185)], [
    { h: 'Pregătirea', d: ['prima urină de dimineață, înainte de AB, toaleta cu apă și săpun'] },
    { h: '??Jetul mijlociu??', d: ['primul jet aruncat (flora uretrei) · mijlocul în recipient steril'] },
    { h: '??Cât??', d: ['!!10–20 ml!!'] },
    { h: 'Transport', d: ['**≤ 2 h**, altfel **4 °C**'] },
    { h: '??Uretrită??', d: ['!!primul jet!! (germenul e în uretră)'] },
  ]),
  AT(4, 'n_faringe', 'LP 1 · Faringe, frigul și probele irepetabile', [q(795, 225, 140, 115, -125), q(320, 360, 255, 225, -230), q(205, 330, 65, 88), q(795, 525, 150, 80, -125), q(500, 775, 440, 80, -400)], [
    { h: '??Ce tampon??', d: ['tampon steril pe tijă, în tub protector, **≤ 3 h**'] },
    { h: '??Cum??', d: ['înainte de AB, !!amigdale + perete posterior, nu limba!!'] },
    { h: '??De ce??', d: ['S. pyogenes (β-hemolitic grup A) → geloză-sânge'] },
    { h: '??COVID-19??', d: ['tampon nazofaringian → RT-PCR sau test rapid de antigen'] },
    { h: '??Frig DA / NU · irepetabile??', d: ['frig DA: urina 4 °C, virusurile −70 °C · frig NU: LCR, hemocultura, secrețiile genitale (Neisseria)', 'hemocultura: 2 locuri, aerob + anaerob, iod apoi alcool · LCR, biopsii, lichide de puncție → imediat'] },
  ]),
  AT(5, 'n_nativ', 'LP 2 · Preparatul nativ și cele 3 metode microscopice', [q(205, 265, 140, 105), q(535, 255, 140, 100), q(830, 265, 95, 150), q(500, 680, 450, 165, -420)], [
    { h: '??Cum faci nativul??', d: ['picătură de ser fiziologic + produs pe lamă'] },
    { h: 'Lamela', d: ['oblic, fără bule de aer'] },
    { h: 'Examinarea + ??3 metode microscopice??', d: ['×40, imediat · metodele: !!nativ, colorație negativă (Burri, tuș), frotiu colorat!!', 'frotiul: etalare → uscare → fixare (omoară germenii)'] },
    { h: '??Scopul??', d: ['germeni vii → **mobilitate** · trofozoiți mobili (Trichomonas, Giardia)'] },
  ]),
  AT(6, 'r_gram', 'LP 2 · Gram în 4 pași și de ce iese culoarea', [q(500, 215, 445, 115, -420), q(260, 640, 200, 190, -180), q(740, 640, 200, 190, -180), q(609, 205, 100, 70)], [
    { h: '??Etapele Gram??', d: ['!!cristal violet → Lugol → alcool → fuxină!! (2 min fiecare, clătire între ele)'] },
    { h: '??Gram + → violet??', d: ['peptidoglican gros reține complexul violet–iod'] },
    { h: '??Gram − → roșu??', d: ['membrana externă se dizolvă la alcool, violetul iese, fuxina colorează'] },
    { h: 'Alcoolul = pasul critic · ??Ziehl-Neelsen??', d: ['prea lung → fals Gram −; prea scurt → fals Gram +', 'ZN: fucsină fenicată → alcool acid → albastru de metilen: !!BAAR roșii pe fond albastru (M. tuberculosis)!!'] },
  ]),
  AT(7, 'r_forme', 'LP 2 · Formele cerute pe frotiu', [q(260, 150, 205, 110, -185), q(740, 150, 205, 110, -185), q(260, 440, 205, 110, -185), q(740, 440, 205, 110, -185), q(260, 730, 205, 110, -185), q(740, 730, 205, 110, -185)], [
    { h: '??Grămezi??', d: ['Staphylococcus (Gram +)'] },
    { h: '??Lanțuri??', d: ['Streptococcus (Gram +)'] },
    { h: 'Diplococi lanceolați', d: ['pneumococ (Gram +)'] },
    { h: 'Diplococi reniformi', d: ['Neisseria (**Gram −**)'] },
    { h: '??Streptobacili Gram +??', d: ['bacili în lanț: B. anthracis'] },
    { h: '??Candida pe Gram??', d: ['!!Gram +!!, ovală, mare, înmugurește, pseudohife'] },
  ]),
  MO(8, [['e_gsimpla', 'de bază'], ['e_gsange', 'complex'], ['e_sab', 'special'], ['e_glact0', 'diferențial'], ['e_chap0', 'selectiv-dif.']], 'LP 3 · Clasificarea mediilor, cu câte un exemplu', [
    { h: '??De bază??', d: ['geloză simplă = bulion + agar (agarul doar solidifică)'] },
    { h: '??Complex??', d: ['geloză-sânge: sânge 5–10%, germeni pretențioși, se vede hemoliza'] },
    { h: '??Special??', d: ['Sabouraud (fungi), LJ (BK), Chocolat (factorii X + V)'] },
    { h: '??Diferențial??', d: ['!!zahăr + indicator!!: geloză lactozată, TSI, uree, Simmons'] },
    { h: '??Selectiv-diferențial??', d: ['!!+ inhibitor!!: Chapman, MacConkey, SS'] },
  ]),
  AT(9, 'r_inocul', 'LP 3–4 · Definiții, epuizarea și inoculul', [q(300, 345, 230, 215, -210), q(775, 345, 165, 210, -150), q(500, 755, 445, 95, -420)], [
    { h: '??Însămânțare · cultivare · epuizare??', d: ['însămânțare = produsul pus în contact cu mediul · cultivare = creșterea in vitro', 'epuizare: 4 sectoare, ansa flambată între ele → !!colonii izolate!!'] },
    { h: '??Cultură pură vs mixtă??', d: ['colonie = o bacterie (clonă) · repici o colonie → **cultură pură** (identificare + antibiogramă)', 'mixtă = mai multe specii pe placă'] },
    { h: '??Inoculul / suspensia bacteriană??', d: ['2–3 colonii în ser fiziologic, turbiditate !!0,5 McFarland!! (comparat cu etalonul)'] },
  ]),
  MO(10, [['e_colS', 'S'], ['e_colR', 'R'], ['e_macM', 'M'], ['e_untoase', 'untoase'], ['e_catarare', 'cățărare']], 'LP 4 · Coloniile: S, R, M, untoase, cățărare', [
    { h: '??Colonii S??', d: ['netede, rotunde, bombate: patogenii (Staphylococcus)'] },
    { h: '??Colonii R??', d: ['rugoase, de regulă nepatogene · excepții: !!B. anthracis, M. tuberculosis, C. diphtheriae!!'] },
    { h: '??Colonii M (mucoase)??', d: ['lucioase, curgătoare → capsulă: Klebsiella'] },
    { h: '??Untoase??', d: ['levuri (Candida) · pufoase = mucegaiuri'] },
    { h: 'Cățărare', d: ['văl pe toată placa: Proteus'] },
  ]),
  MO(11, [['e_chapP', 'Chapman +'], ['e_macP', 'MacConkey L+'], ['e_macN', 'MacConkey L−'], ['e_ssSS', 'SS'], ['e_glactLN', 'lactozată']], 'LP 3 · Mediile colorate: ce culoare înseamnă ce', [
    { h: '??Chapman / MSA??', d: ['NaCl 7,5% + manitol + roșu fenol · !!galben = manitol + → S. aureus!!'] },
    { h: '??MacConkey: roz??', d: ['săruri biliare opresc Gram + · roz = lactozo + (E. coli, Klebsiella)'] },
    { h: 'MacConkey: incolor', d: ['lactozo − : Salmonella, Shigella, Proteus'] },
    { h: 'SS', d: ['!!centru negru = H₂S → Salmonella!! · Shigella incoloră, fără negru'] },
    { h: 'Geloză lactozată', d: ['ABT: galben = L + · albastru = L −'] },
  ]),
  MO(12, [['e_hemoliza', 'hemoliza'], ['e_mh', 'MH'], ['e_sab', 'Sabouraud'], ['e_tsi', 'TSI'], ['e_simmons', 'Simmons, uree']], 'LP 3–4 · Hemoliza, MH, Sabouraud și tuburile', [
    { h: '??Hemoliza??', d: ['!!α verzuie, parțială!! (pneumococ) · !!β clară, completă!! (S. pyogenes, S. aureus) · γ nimic (enterococ)'] },
    { h: '??Mueller-Hinton??', d: ['mediul antibiogramei: 4 mm, pH 7,2–7,4'] },
    { h: '??Sabouraud??', d: ['glucoză, pH acid, cloramfenicol → Candida, colonii untoase'] },
    { h: 'TSI', d: ['K/A (pantă roșie, coloană galbenă) = Salmonella · A/A tot galben = E. coli · negru = H₂S'] },
    { h: 'Simmons · uree', d: ['Simmons albastru = Klebsiella · uree roz = Proteus'] },
  ]),
  MO(13, [['e_pigmentate', 'colonii aurii'], ['e_hemoliza', 'β-hemoliză'], ['e_chapP', 'Chapman galben'], ['r_forme', 'grămezi']], 'LP 4 · S. aureus de la colonie la teste', [
    { h: '??Cum arată S. aureus: coloniile??', d: ['S, aurii (pigment nedifuzibil)'] },
    { h: 'Pe geloză-sânge', d: ['**β-hemoliză**'] },
    { h: '??Pe Chapman??', d: ['crește (halotolerant), mediul !!galben!! (manitol +)'] },
    { h: 'Frotiu + teste rapide', d: ['coci Gram + în grămezi · !!catalază + · coagulază +!!', 'catalaza NU de pe geloză-sânge (fals +) · oxidaza +: Pseudomonas, Neisseria'] },
  ]),
  AT(14, 'r_abg', 'LP 5 · Antibiograma: calitativ și cantitativ', [q(300, 345, 230, 215, -210), q(775, 320, 165, 180, -150), q(500, 755, 445, 90, -420)], [
    { h: '??Calitativ: Kirby-Bauer (difuzimetric)??', d: ['0,5 McFarland → MH 4 mm → discuri !!la 1,5 cm de margine, 3 cm între ele, max. 12!! → 35 °C, 16–18 h', 'diametrul zonei vs tabele → S / I / R'] },
    { h: '??Cantitativ: CMI · diluții??', d: ['în bulion (primul tub limpede) sau în agar (fără creștere / max. o colonie) · microdiluție'] },
    { h: '??E-test??', d: ['!!CMI = unde elipsa atinge banda!! · CMB ≥ CMI (omoară ≥ 99,9%)'] },
  ]),
  AT(15, 'r_agac', 'LP 5 · Reacțiile Ag–Ac într-o privire', [q(260, 285, 205, 150, -185), q(740, 285, 205, 150, -185), q(260, 700, 205, 150, -185), q(740, 700, 205, 150, -185)], [
    { h: '??Precipitarea??', d: ['Ag solubil + Ac → precipitat !!la echivalență!! (VDRL, Ascoli, Mancini)'] },
    { h: '??Aglutinarea??', d: ['Ag corpuscular → grunji (pe lamă, latex)'] },
    { h: 'RFC', d: ['!!pozitiv = fără hemoliză!! (complementul consumat)'] },
    { h: '??Direct vs indirect · ELISA, RIF??', d: ['direct: Ac cunoscut → identifici germenul · indirect: Ag cunoscut → Ac din ser (serodiagnostic)', 'RIF: fluorocrom, UV · ELISA: enzimă + substrat → culoare, cantitativ'] },
  ]),
  AT(16, 'n_rapid', 'LP 5 · Testul rapid, ELISA și fals ±', [q(320, 710, 265, 140, -240), q(820, 280, 110, 180), q(340, 280, 285, 180, -270), q(180, 285, 100, 170), q(795, 715, 155, 140, -140)], [
    { h: '??Testul rapid??', d: ['imunocromatografic: proba migrează, Ag prins la linia T'] },
    { h: 'Linia C', d: ['!!trebuie să apară mereu!!, altfel invalid'] },
    { h: '??Antigen COVID-19??', d: ['C + T = pozitiv · doar C = negativ'] },
    { h: '??Avantaje / dezavantaje (vs ELISA)??', d: ['rapid: 15 min, ieftin, fără aparatură, dar calitativ, mai puțin sensibil', 'ELISA: sensibilă, cantitativă, multe probe, dar ore + aparatură'] },
    { h: '??Fals + / fals −??', d: ['fals +: reacții încrucișate, contaminare · fals −: prea puțin Ag/Ac, recoltare greșită, fereastra serologică'] },
  ]),
  AT(17, 'n_pcr', 'LP 5 · PCR și blot-urile', [q(500, 290, 465, 215), q(375, 241, 85, 45), q(260, 715, 205, 135, -185), q(735, 715, 205, 135, -200)], [
    { h: '??PCR: ce e, pașii??', d: ['amplificare in vitro: !!denaturare 90 °C → aliniere 50 °C → elongare 70 °C!! (LP), 2ⁿ copii', '??Southern = ADN · Northern = ARN · Western = proteine??'] },
    { h: '??Primerii??', d: ['scurți, monocatenari, complementari capetelor → delimitează ce se copiază, pornesc polimeraza'] },
    { h: '??ARN? DA: RT-PCR · tipuri??', d: ['revers-transcriptaza → ADNc · tipuri: clasic, RT-PCR, real-time (qPCR), multiplex'] },
    { h: '??De ce nu de rutină??', d: ['scump, contaminare → fals +, ADN de germen mort, fără antibiogramă'] },
  ]),
  // ---------- LP 6: câte o fișă scurtă pe parazit: ce e particular + CUM AFLI (diagnosticul) ----------
  MO(18, [['pr_28', 'nativ'], ['pr_32', 'Giemsa'], ['pr_21', 'trofozoit']], 'Trichomonas vaginalis', [
    { h: '??Protozoar flagelat, FĂRĂ CHIST??', d: ['doar trofozoit → !!transmitere sexuală!!, directă · omul = singura gazdă', 'vagin, uretră, prostată'] },
    { h: '??Cum arată??', d: ['ovalar, **un nucleu anterior**, 4 flageli + membrana ondulantă, axostil'] },
    { h: '??Cum afli??', d: ['secreție vaginală / uretrală, **primul jet de urină**, examinate imediat → **nativ: trofozoiți mobili** · Giemsa', '!!gold standard: PCR!! · cultura (Diamond) nu e de rutină'] },
  ]),
  MO(19, [['pr_35', 'trofozoit'], ['pr_39', 'chist'], ['pr_43', 'enterotest']], 'Giardia lamblia', [
    { h: 'Protozoar flagelat, fecal-oral', d: ['se lipește cu **discul adeziv** de duoden → **steatoree**'] },
    { h: 'Ce e particular', d: ['trofozoit „față cu ochi” (2 nuclei), mișcare de frunză căzătoare · chist cu 2–4 nuclei', '!!chisturi în scaunul format, trofozoiți în cel diareic!!'] },
    { h: '??Cum afli??', d: ['scaun **nativ + Lugol**, 3 probe (elimină intermitent)', 'scaun negativ → **lichid duodenal** (sondaj, enterotest), biopsie · Ag în scaun: ELISA, **test rapid** · PCR'] },
  ]),
  AT(20, 'p_entamoeba', 'Entamoeba histolytica', [q(375, 290, 330, 210, -300), q(260, 705, 200, 135, -185), q(740, 705, 200, 135, -185)], [
    { h: 'Protozoar (amibă), fecal-oral', d: ['chistul înghițit · cec, colon → **ulcere, dizenterie amibiană**; abces hepatic'] },
    { h: 'Ce e particular', d: ['!!trofozoit hematofag!! (hematii în citoplasmă) = patogen', 'chist cu **4 nuclei** · E. coli (nepatogenă) are **8**'] },
    { h: 'Cum afli', d: ['scaun diareic **proaspăt, „la cald”, ≤ 1 h** → trofozoiți · scaun format → chisturi, nativ + Lugol'] },
  ]),
  MO(21, [['pr_55', 'tachizoiți'], ['pr_58', 'oochist'], ['pr_66', 'screening']], 'Toxoplasma gondii', [
    { h: 'Protozoar · pisica = gazda definitivă', d: ['omul se infectează din **carne crudă** (chisturi), legume / litieră (oochiști) sau **transplacentar**', '!!doar primoinfecția din sarcină!! afectează fătul'] },
    { h: 'Ce e particular', d: ['tachizoit în **semilună** · chisturi tisulare în mușchi și creier'] },
    { h: 'Cum afli', d: ['!!serologie: IgM = infecție recentă, IgG singure = veche!! (ELISA, RIF) · gravidă IgG+ IgM− → repeți IgG după 3 săpt.', 'direct: tachizoiți pe frotiu Giemsa (LCR, lichid amniotic, biopsie) · PCR'] },
  ]),
  MO(22, [['pr_69', 'bandă'], ['pr_71', 'schizont'], ['pr_80', 'test rapid']], 'Plasmodium (malaria)', [
    { h: 'Protozoar · țânțarul Anopheles = gazda definitivă', d: ['om: ficat → hematii · P. malariae: ciclu de **72 h** (acces cuaternar)'] },
    { h: 'Ce e particular', d: ['P. malariae: trofozoit în **bandă** prin hematie, pigment brun'] },
    { h: 'Cum afli', d: ['!!frotiu subțire + picătură groasă, Giemsa!!: picătura găsește parazitul, frotiul spune specia', 'test rapid (RDT) · PCR (cea mai sensibilă)'] },
  ]),
  MO(23, [['pr_89', 'chisturi'], ['pr_91', 'adult'], ['pr_95', 'ciclu']], 'Echinococcus granulosus', [
    { h: 'Vierme plat (cestod) · câinele = gazda definitivă', d: ['omul = gazdă intermediară (ca oaia): înghite ouă de pe blană, mâini, legume'] },
    { h: 'Ce e particular', d: ['**chist hidatic**: ficat 60–70%, plămân 20–30%', '!!NU are ouă în scaunul omului!! · nu se puncționează: șoc anafilactic'] },
    { h: 'Cum afli', d: ['**imagistic** (ecografie, CT) + **serologie: antigenul 5** (ELISA, hemaglutinare)'] },
  ]),
  MO(24, [['pr_103', 'T. solium'], ['pr_114', 'T. saginata'], ['pr_109', 'cisticercoză']], 'Taenia solium și T. saginata', [
    { h: '??Vierme plat (cestod)?? din carne crudă', d: ['solium = **porc**, saginata = **vită** · omul = gazda definitivă (tenia în intestin)'] },
    { h: 'Ce e particular', d: ['solium: scolex **cu cârlige** · saginata: **fără cârlige** · !!oul e identic!!', '!!cisticercoza = doar T. solium, din OUĂ!! → creier (crize epileptice)'] },
    { h: 'Cum afli', d: ['**proglote** în scaun, **amprenta anală** (ouă) · specia după proglote și scolexul eliminat după tratament · eozinofilie', 'cisticercoza: imagistic (manual)'] },
  ]),
  MO(25, [['pr_131', 'ou fecundat'], ['pr_141', 'fecundat / nefecundat'], ['pr_144', 'larve în plămân']], 'Ascaris lumbricoides', [
    { h: 'Nematod, geohelmint', d: ['ou din sol (devine infectant în săptămâni) · cel mai mare nematod intestinal'] },
    { h: 'Ce e particular', d: ['larvele trec prin **plămân** → sindrom Loeffler, !!eozinofilie!!', 'ou fecundat **mamelonat**, galben-brun'] },
    { h: 'Cum afli', d: ['**ouă în scaun** (abia după 60–70 de zile), **Kato-Miura** · la început: **larve în spută**', 'adultul eliminat · eozinofilie 30–50% în faza migratorie'] },
  ]),
  MO(26, [['pr_155', 'amprentă'], ['pr_157', 'ouă pe bandă'], ['pr_150', 'ou']], 'Enterobius vermicularis (oxiurul)', [
    { h: 'Nematod mic, alb · cec, colon', d: ['**femela depune ouăle noaptea perianal** → prurit → autoinfecție mână-gură'] },
    { h: 'Ce e particular', d: ['ou **asimetric** (o latură plană), transparent, embrionat'] },
    { h: '??Cum afli??', d: ['!!amprenta anală: bandă adezivă, dimineața, înainte de toaletă!! → pozitivă > 50% (scaunul doar 10–15%)', 'un examen negativ nu exclude: **7 examene la 2 zile**'] },
  ]),
  MO(27, [['pr_163', 'adult (câine)'], ['pr_169', 'ou'], ['pr_174', 'ochi']], 'Toxocara (canis)', [
    { h: 'Nematodul câinelui', d: ['omul (copilul) înghite ouă de la câini, cățeii, din sol'] },
    { h: 'Ce e particular', d: ['la om larva nu devine adult → **larva migrans** viscerală și oculară'] },
    { h: 'Cum afli', d: ['!!NU ai ouă în scaun!! → **serologie** (Ac anti-Toxocara) + **eozinofilie**, CT / ecografie', 'ocular: Ac în fluidele oculare'] },
  ]),
  MO(28, [['pr_189', 'larvă închistată'], ['pr_185', 'biopsie'], ['pr_187', 'ciclu']], 'Trichinella spiralis', [
    { h: 'Nematod din carne de **porc, mistreț**', d: ['același organism e gazdă definitivă și intermediară'] },
    { h: 'Ce e particular', d: ['larvele se **închistează în mușchiul striat** · nu apar în scaun'] },
    { h: 'Cum afli', d: ['!!biopsie musculară (solear, deltoid) comprimată între 2 lame → trichineloscop!!', 'eozinofilie > 500/µL · anamneza: carne insuficient preparată'] },
  ]),
  AT(29, 'p_plat', 'Plathelminții mici: o particularitate + cum afli', [q(260, 255, 205, 175, -185), q(740, 255, 205, 175, -185), q(260, 665, 205, 175, -185), q(740, 665, 205, 175, -185)], [
    { h: 'Fasciola hepatica (trematod)', d: ['creson · adultul în căile biliare · **eozinofilia apare întâi**', 'ouă operculate în scaun / aspirat duodenal după ~90 de zile · serologie'] },
    { h: 'Diphyllobothrium latum', d: ['pește crud · cel mai lung · !!consumă B12 → anemie megaloblastică!!', 'ouă operculate în scaun'] },
    { h: 'Hymenolepis nana', d: ['fără gazdă intermediară, **autoinfecție** → persistă', 'ouă (cu filamente) în scaun; reexaminezi'] },
    { h: 'Dipylidium caninum', d: ['copilul înghite **puricele** câinelui', 'proglote mobile „în butoiaș” în scaun'] },
  ]),
  AT(30, 'p_nem', 'Nematodele mici: o particularitate + cum afli', [q(260, 255, 205, 175, -185), q(740, 255, 205, 175, -185), q(260, 665, 205, 175, -185), q(740, 665, 205, 175, -185)], [
    { h: 'Trichuris (tricocefalul)', d: ['ou din sol · se înfige în mucoasa cecului', 'ouă **„în lămâie”**, cu dopuri la poli → Kato-Miura'] },
    { h: 'Ancylostoma duodenale', d: ['larva intră **prin piele** · suge sânge în duoden → !!anemie feriprivă!!', 'ouă în scaun; larvoscopie'] },
    { h: 'Strongyloides stercoralis', d: ['larva prin piele · ouăle eclozează în intestin → !!în scaun ai LARVE, nu ouă!!', 'larvoscopie, lichid duodenal · imunodeprimați → forma diseminată'] },
    { h: 'Fără ouă în scaun (de reținut)', d: ['Enterobius (amprenta) · Strongyloides (larve) · Toxocara și Echinococcus (serologie) · Trichinella (biopsie)'] },
  ]),
];
