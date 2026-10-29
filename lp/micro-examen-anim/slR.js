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

const K = (n) => `Recapitulare de dimineață · ${n} / 19`;
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
      { h: 'Cum o faci (30 min)', d: ['≈ 1,5 min pe slide: întâi spui cu voce tare, apoi verifici punctele'] },
      { h: '??așa?? = s-a întrebat la examen', d: ['roșu = ce dă puncte'] },
      { h: 'Ordinea', d: ['LP 1 → LP 2 → LP 3–4 → LP 5 → LP 6, apoi mediile din poze'] },
      { h: 'Dacă rămâi fără timp', d: ['sari peste Ag–Ac (15) și paraziții (18–19) ultimii: !!sterilizarea, recoltarea, Gram, mediile și PCR!! se cer la toate grupele'] },
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
  MO(18, [['pr_32', 'Trichomonas'], ['pr_35', 'Giardia'], ['pr_55', 'Toxoplasma'], ['pr_69', 'Plasmodium']], 'LP 6 · Protozoarele: forma și diagnosticul', [
    { h: '??Trichomonas vaginalis??', d: ['ovalar, !!un nucleu!!, 4 flageli anteriori + 1 pe membrana ondulantă, axostil; fără chist', 'nativ din secreție / primul jet · Giemsa · !!gold standard: PCR!!'] },
    { h: 'Giardia', d: ['trofozoit piriform, 2 nuclei, disc adeziv · chist 2–4 nuclei în scaunul format · 3 probe'] },
    { h: 'Toxoplasma', d: ['pisica = gazda definitivă · IgM = recentă, IgG singure = veche'] },
    { h: 'Plasmodium', d: ['Giemsa: picătura groasă găsește parazitul, frotiul subțire spune specia'] },
  ]),
  MO(19, [['pr_103', 'Taenia'], ['pr_89', 'Echinococcus'], ['pr_131', 'Ascaris'], ['pr_155', 'Enterobius'], ['pr_189', 'Trichinella']], 'LP 6 · Helminții: numește unul și cum îl cauți', [
    { h: '??Vierme plat (cestod)??: Taenia', d: ['solium (porc) = scolex cu cârlige · saginata (vită) = fără · oul identic → specia după scolex și proglote'] },
    { h: 'Echinococcus', d: ['câinele = gazda definitivă, omul = intermediară → chist hidatic · !!fără ouă în scaun!!: imagistică + serologie (Ag5)'] },
    { h: 'Ascaris (nematod)', d: ['ou mamelonat · Kato-Miura · larve în spută + eozinofilie'] },
    { h: '??Enterobius??', d: ['!!amprenta anală, dimineața!! (> 50%, scaunul 10–15%) · 7 examene la 2 zile'] },
    { h: 'Trichinella', d: ['larve în mușchi → biopsie (solear, deltoid), trichineloscop'] },
  ]),
];
