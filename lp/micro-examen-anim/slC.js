// Partea C · LP 5 (sursa: deck-ul de examen LP, p. 38–56): antibiograma (★ Kirby-Bauer + CMI în detaliu), antibioticele,
// rezistența, reacțiile antigen–anticorp, acizii nucleici, PCR, IDR. Ce sursa marchează „(manual)” rămâne „(manual)”.

export const GL = [
  ['LP', 'lucrarea practică'], ['CMI', 'concentrația minimă inhibitorie'], ['CMB', 'concentrația minimă bactericidă'],
  ['TSA', 'testarea susceptibilității la antibiotice'], ['S/I/R', 'sensibil / intermediar / rezistent'], ['IS', 'intermediar sensibil'],
  ['CLSI', 'Clinical and Laboratory Standards Institute (standardul american)'], ['CFU', 'unități formatoare de colonii'], ['CO₂', 'dioxid de carbon'],
  ['MH', 'Mueller-Hinton'], ['AB', 'antibiotic'], ['CEF', 'disc de cefalosporină'], ['AMC', 'disc de amoxicilină + clavulanat'], ['IND', 'disc cu antibiotic inductor'], ['FOX', 'disc de cefoxitin'],
  ['ESBL', 'β-lactamaze cu spectru extins'], ['MRSA', 'S. aureus rezistent la meticilină'], ['PBP2a', 'proteina care leagă penicilina, varianta 2a (gena mecA)'],
  ['ADN', 'acidul dezoxiribonucleic'], ['ARN', 'acidul ribonucleic'], ['50S', 'subunitatea mare a ribozomului bacterian'], ['30S', 'subunitatea mică a ribozomului bacterian'],
  ['Ag', 'antigen'], ['Ac', 'anticorp'], ['RFC', 'reacția de fixare a complementului'], ['RIF', 'reacția de imunofluorescență'], ['IPO', 'metoda imunoperoxidazică'],
  ['ELISA', 'test imunoenzimatic (enzyme-linked immunosorbent assay)'], ['Ig', 'imunoglobulină (anticorp)'], ['UV', 'radiații ultraviolete'],
  ['VDRL', 'test de precipitare pentru sifilis (Venereal Disease Research Laboratory)'], ['RPR', 'test rapid de reagine plasmatice (sifilis)'],
  ['HA', 'hemaglutinina virală'], ['RHA', 'reacția de hemaglutinare'], ['HAI', 'inhibarea hemaglutinării'],
  ['PCR', 'reacția de polimerizare în lanț'], ['Taq', 'polimeraza din Thermus aquaticus'], ['IDR', 'intradermoreacția'], ['PPD', 'derivatul proteic purificat (tuberculina)'],
];
export const TM = [
  ['in vitro', 'in vitro', 'în laborator (pe placă / în tub), nu în organism'],
  ['cultură pură', 'cultură pură', 'un singur germen, crescut din aceeași colonie'],
  ['McFarland', 'etalonul McFarland', 'tub-etalon de turbiditate; 0,5 McFarland ≈ 1,5 × 10⁸ CFU/ml'],
  ['gazon', 'gazon', 'cultură confluentă, care acoperă uniform toată placa'],
  ['confluent', 'confluentă', 'coloniile se unesc într-un strat continuu'],
  ['difuz', 'difuzie', 'antibioticul se răspândește singur din disc în geloză, din zona concentrată spre cea diluată'],
  ['bactericid', 'bactericid', 'care omoară bacteria (nu doar îi oprește creșterea)'],
  ['subcultiv', 'subcultivare', 'treci o picătură pe un mediu nou, fără antibiotic, ca să vezi dacă germenul mai trăiește'],
  ['inductor', 'inductor', 'antibiotic care pornește la germen producția unui mecanism de rezistență'],
  ['β-lactamaz', 'β-lactamaze', 'enzime bacteriene care sparg inelul β-lactamic'],
  ['carbapenemaz', 'carbapenemaze', 'β-lactamaze care distrug și carbapenemele'],
  ['porin', 'porine', 'canale din membrana externă a Gram-negativilor, pe unde intră antibioticul'],
  ['eflux', 'pompe de eflux', 'proteine din membrană care scot antibioticul din celulă'],
  ['chimioterapic', 'chimioterapice', 'antibacteriene obținute prin sinteză chimică'],
  ['precipitin', 'precipitine', 'anticorpii care precipită un antigen solubil'],
  ['echivalen', 'echivalența', 'proporția Ag : Ac la care se formează rețeaua (precipitatul) maximă'],
  ['retrospectiv', 'diagnostic retrospectiv', 'pus ulterior, pe un produs deja prelevat (aici: fragmentul de organ)'],
  ['seroconversi', 'seroconversie', 'apariția / creșterea anticorpilor între prima și a doua probă de ser'],
  ['complementul', 'complementul', 'sistem de proteine din ser care se fixează pe complexele Ag–Ac și poate sparge hematiile'],
  ['hemoliz', 'hemoliză', 'spargerea hematiilor; lichidul devine roșu uniform'],
  ['efect citopatic', 'efect citopatic', 'celulele din cultură se distrug sub acțiunea virusului'],
  ['fluorocrom', 'fluorocrom', 'colorant care emite lumină vizibilă când e iluminat cu UV'],
  ['peroxidaz', 'peroxidaza', 'enzimă care transformă substratul într-un precipitat colorat'],
  ['spectrofotometr', 'spectrofotometric', 'intensitatea culorii măsurată cu un aparat → o cifră'],
  ['hibridiz', 'hibridizare', 'legarea a două catene de acid nucleic complementare'],
  ['complementarit', 'complementaritate', 'A se leagă cu T (U în ARN), G cu C'],
  ['monocatenar', 'monocatenar', 'cu o singură catenă (lanț)'],
  ['denatur', 'denaturare', 'separarea celor 2 catene ale ADN-ului prin căldură'],
  ['electrofore', 'electroforeză', 'separarea moleculelor într-un gel, în câmp electric, după mărime'],
  ['revers-transcript', 'revers-transcriptaza', 'enzimă care copiază un ARN în ADN'],
  ['primer', 'primeri', 'fragmente scurte complementare capetelor secvenței; de la ei pornește Taq'],
  ['termofil', 'termofilă', 'care trăiește la temperaturi mari'],
  ['hipersensibilitate', 'hipersensibilitate tip IV', 'reacție întârziată, făcută de limfocitele T sensibilizate'],
  ['indurați', 'indurație', 'îngroșare fermă, palpabilă, a pielii'],
  ['eritem', 'eritem', 'înroșirea pielii'],
  ['gnotobiot', 'gnotobiotice', 'animale cu flora microbiană cunoscută (sau fără floră: „germ free”)'],
];

const K = 'LP 5 · Antibiograma';
export const SL = [
  // ---------------- p. 38 + 45 ----------------
  {
    scene: 'c_abg', kick: `${K} ★`, title: 'Antibiograma: calitativă (S/I/R) sau cantitativă (CMI)',
    hud: ['TSA', 'S/I/R vs. µg/ml'],
    points: [
      { h: 'Calitativă: difuzimetrică (Kirby-Bauer)', d: ['metoda de **rutină**', 'rezultat: !!sensibil, intermediar, rezistent!!'] },
      { h: 'Cantitativă: CMI', d: ['diluții în lichid, în agar, E-test', 'rezultat: **cifra exactă** (µg/ml) · în cazuri grave sau rezultate incerte'] },
      { h: 'Când o faci: 3 condiții (toate 3 = DA)', d: ['**bacterie semnificativă clinic** (toate; nu flora normală, nu contaminanții)', '**sensibilitate nepredictibilă**: dacă specia e mereu sensibilă, n-ai ce testa (ex. S. pyogenes la penicilină, manual)', '**există standardizare** pentru specia și antibioticul testat; altfel diametrul nu poate fi interpretat'] },
      { h: 'Cine decide', d: ['!!medicul microbiolog!!, după produs și specie', 'relevanță incertă → împreună cu **medicul curant**'] },
    ],
    why: 'Antibiograma testează **in vitro** o tulpină în **cultură pură, identificată**. Are sens doar unde tulpinile au dobândit rezistență **în mod variabil**: numai atunci rezultatul schimbă tratamentul.',
    say: 'Antibiograma testează in vitro sensibilitatea unei tulpini în cultură pură. Difuzimetricul e calitativ și dă S, I sau R; CMI e cantitativă și dă cifra exactă. O fac pentru bacteriile semnificative clinic, a căror sensibilitate nu e predictibilă și pentru care există standard; !!decide medicul microbiolog!!.',
    beatDur: 7,
  },
  // ---------------- p. 39 ----------------
  {
    scene: 'c_kb', kick: `${K} ★ · Kirby-Bauer · principiul`, title: 'Zona clară se termină exact unde concentrația scade sub CMI',
    hud: ['difuzie din disc', 'AB = disc de antibiotic'],
    points: [
      { h: 'Difuzia', d: ['discul eliberează antibioticul, care **difuzează în geloză**', '!!gradient: maxim lângă disc, scade cu distanța!!'] },
      { h: 'Marginea zonei', d: ['germenul crește oriunde concentrația < CMI lui → **gazon** (cultură confluentă); zona clară = inhibiție', '!!marginea = locul unde concentrația ≈ CMI!!'] },
      { h: 'Concluzia', d: ['CMI mică → oprit și departe de disc → **zonă mare (S)**', 'CMI mare → **zonă mică sau absentă (R)**'] },
    ],
    why: 'Diametrul nu e o cifră magică: e distanța până la care antibioticul ajunge în concentrație suficientă cât să oprească **tocmai germenul acesta**.',
    say: 'Antibioticul difuzează din disc și formează un gradient; germenul crește doar unde concentrația scade sub CMI lui, deci !!o zonă mare înseamnă CMI mică, adică sensibil!!.',
    beatDur: 7.5,
  },
  // ---------------- p. 40 ----------------
  {
    scene: 'c_steps', kick: `${K} ★ · Kirby-Bauer · cei 6 pași (CLSI)`, title: 'Șase pași, cu cifrele care contează',
    hud: ['CLSI'],
    points: [
      { h: 'Inoculul', d: ['2–3 colonii în ser fiziologic, ajustat la !!0,5 McFarland!! (1,5 × 10⁸ CFU/ml)'] },
      { h: 'Însămânțarea', d: ['!!Mueller-Hinton 4 mm, pH 7,2–7,4!!', 'cu tamponul ștergi toată suprafața **de 3 ori** → gazon'] },
      { h: 'Discurile', d: ['!!la 1,5 cm de margine, 3 cm între ele, max. 12!!', '15 min la temperatura camerei'] },
      { h: 'Incubarea', d: ['!!35 °C, 16–18 h!!, aer sau CO₂', 'pretențioși 20–24 h · vancomicina 24 h'] },
      { h: 'Citirea', d: ['măsori diametrele, le compari cu **tabelele standard**'] },
      { h: 'Interpretarea', d: ['raportezi **S, IS, R**, nu diametrele'] },
    ],
    why: 'Inoculul prea dens „copleșește” antibioticul și micșorează zona; distanțele împiedică zonele să se suprapună; gazonul face marginea netă și măsurabilă.',
    beatDur: 6.5,
  },
  // ---------------- p. 41 ----------------
  {
    scene: 'c_sir', kick: `${K} ★ · Interpretarea`, title: 'S, I, R: comparăm CMI cu concentrația din ser',
    hud: ['S/I/R', 'definițiile din LP'],
    points: [
      { h: 'Rezistent', d: ['!!nu e inhibat la concentrația serică obișnuită!!', 'pot fi detectate **mecanisme de rezistență**'] },
      { h: 'Intermediar', d: ['răspuns terapeutic **posibil mai slab**', 'util în !!infecții urinare și cu doze mari!! (β-lactamine)'] },
      { h: 'Sensibil', d: ['!!inhibat la o concentrație realizabilă în ser!!'] },
    ],
    why: 'Diametrul zonei crește de la R la I la S. Antibioticul „I” se concentrează în urină mult peste nivelul din sânge, deci acolo poate depăși totuși CMI. Doar principiu: rezistența vine din enzime (β-lactamaze, ESBL), țintă modificată (MRSA), porine pierdute, pompe de eflux.',
    beatDur: 7,
  },
  // ---------------- p. 42 ----------------
  {
    scene: 'c_cmi', kick: 'LP 5 · CMI ★', title: 'CMI: cea mai mică cantitate care oprește complet creșterea',
    hud: ['diluții 64 → 0,5 µg/ml', 'MH'],
    points: [
      { h: 'Diluții în lichid', d: ['diluții succesive + **cantitate fixă de cultură**, 18 h, 35 °C', '!!CMI = cel mai mic tub limpede!! (aici 2 µg/ml); limpede = inhibat, tulbure = crește; tubul 0 = martor'] },
      { h: 'Diluții în agar', d: ['câte o placă Mueller-Hinton (MH) pe concentrație, spoturi', '!!CMI = fără creștere sau max. o colonie!!'] },
    ],
    why: 'Ceri CMI în **septicemii, endocardite, meningite** și când difuzimetricul e incert: acolo antibioticul ajunge greu la germen, iar doza trebuie să depășească sigur CMI la locul infecției.',
    say: '!!CMI e cantitatea cea mai mică de antibiotic care inhibă complet multiplicarea!!. La diluțiile în lichid e cel mai mic tub care rămâne limpede.',
    beatDur: 9,
  },
  // ---------------- p. 43 ----------------
  {
    scene: 'c_etest', kick: 'LP 5 · CMI ★ · E-test și microdiluția', title: 'Două feluri de a citi CMI direct',
    hud: ['E-test 256 → 0,016 µg/ml'],
    points: [
      { h: 'E-test', d: ['fâșie cu **gradient de antibiotic** pe placa însămânțată', 'zonă elipsoidală; !!CMI la intersecția elipsei cu fâșia!!'] },
      { h: 'Microdiluția (desenul de pe tablă)', d: ['godeurile cu diluții: limpede = inhibat', '!!CMI = ultimul godeu limpede!!'] },
      { h: 'CMB (doar principiu)', d: ['concentrația care **omoară**, nu doar oprește: omoară ≥ 99,9% (subcultivezi tuburile limpezi)', '!!CMB ≥ CMI!!'] },
    ],
    why: 'Fiecare punct al fâșiei eliberează altă concentrație: lângă capătul concentrat zona e largă, spre cel diluat se îngustează până unde concentrația scade sub CMI. Acolo elipsa atinge fâșia.',
    beatDur: 7.5,
  },
  // ---------------- p. 46 + 47 (+ caseta „ce strică” de la p. 40) ----------------
  {
    scene: 'c_plate', kick: `${K} · Ce mai vezi pe placă · Controlul de calitate`, title: 'Zone deformate, colonii în zonă și ce strică rezultatul',
    hud: ['CEF · AMC · IND · AB'],
    points: [
      { h: 'Sinergism și antagonism', d: ['**sinergism**: zona cefalosporinei (CEF) se lărgește spre amoxicilină + clavulanat (AMC) → „dop de cheie”; clavulanatul inhibă ESBL (exemplu din manual)', '**antagonism**: un inductor (IND) induce rezistența la discul vecin → zona se turtește spre el, în „D” (testul D, manual)'] },
      { h: 'Colonii în zona de inhibiție', d: ['!!subpopulații rezistente!!', 'nu le ignori: tratamentul le-ar selecta'] },
      { h: 'Variabilele (LP): ce strică rezultatul', d: ['mediul (compoziție, pH 7,2–7,4), grosimea, inoculul (0,5 McFarland), discurile (valabilitate, păstrare), timpul + temperatura (35 °C, 16–18 h), citirea (lumină, margini clare)', 'fiecare greșeală mută zona: inocul dens → **fals R** · inocul diluat → **fals S** · geloză groasă → **fals R** · disc expirat → **fals R**'] },
      { h: 'Controlul de calitate', d: ['**tulpinile de referință** au diametre cunoscute; se testează și discurile, și **fiecare lot nou de mediu**', 'referința în interval → testul e valid; în afara lui → greșeala e în mediu sau discuri, nu în germen', '!!raportezi S, IS, R, nu diametrele!!; fiecare rezultat se interpretează'] },
    ],
    why: 'LP-ul spune pe scurt: !!sinergismul și antagonismul reflectă mecanisme de rezistență!!, iar coloniile izolate din zonă sunt subpopulații rezistente; exemplele concrete sunt din manual. Antibiograma difuzimetrică e o metodă standardizată: diametrul are sens doar dacă toate condițiile sunt cele din standard. Tulpina de referință îți arată dacă au fost respectate.',
    beatDur: 8,
  },
  // ---------------- p. 44 ----------------
  {
    scene: 'c_abx', kick: 'LP 5 · Antibioticele', title: 'Ce sunt antibioticele și unde lovesc',
    hud: ['AB = antibiotic', 'perete · ADN · ribozom · membrană'],
    points: [
      { h: 'Peretele celular', d: ['**β-lactamine**: peniciline, cefalosporine, carbapeneme, monobactami', 'vancomicina'] },
      { h: 'Acizii nucleici și acidul folic', d: ['sulfamide + trimetoprim (folat) · chinolone (ADN-giraza)', 'rifampicina (ARN-polimeraza)'] },
      { h: 'Ribozomul', d: ['**50S**: macrolide, clindamicină, cloramfenicol', '**30S**: tetracicline, aminoglicozide'] },
      { h: 'Membrana', d: ['polimixinele'] },
    ],
    why: '!!Antibioticele (definiția din LP) = substanțe cu efect antibacterian produse de microorganisme + substanțe semisintetice și sintetice (chimioterapice)!!. Clasele pe ținte sunt un reper, nu o listă de tocit.',
    beatDur: 6.5,
  },
  // ---------------- p. 48 ----------------
  {
    scene: 'c_res', kick: 'LP 5 · Rezistența · Doar principiul', title: 'Patru feluri în care germenul scapă de antibiotic',
    hud: ['mecanismele: din manual'],
    points: [
      { h: 'Inactivare enzimatică', d: ['β-lactamaze, **ESBL**, carbapenemaze distrug inelul β-lactamic', 'ESBL (E. coli, Klebsiella) → inhibate de clavulanat'] },
      { h: 'Ținta modificată', d: ['**MRSA**: PBP2a (gena mecA) → rezistent la toate β-lactaminele clasice', 'se detectează cu discul de **cefoxitin** (FOX)'] },
      { h: 'Permeabilitate scăzută', d: ['pierderea **porinelor** la Gram-negativi'] },
      { h: 'Pompe de eflux', d: ['antibioticul e **scos din celulă**'] },
    ],
    warn: 'LP-ul spune doar că la tulpinile R „pot fi detectate mecanisme de rezistență specifice”. Cele 4 mecanisme sunt din manual, ca să înțelegi de ce.',
    say: 'Germenul devine rezistent dacă distruge antibioticul, își modifică ținta, nu-l mai lasă să intre sau îl pompează afară. Exemplele clasice sunt !!ESBL și MRSA!!.',
    beatDur: 6.5,
  },
  // ---------------- p. 49 ----------------
  {
    scene: 'c_ag', kick: 'LP 5 · Identificarea antigenică · Principiu', title: 'Anticorpul se leagă doar de antigenul lui',
    hud: ['complexul Ag–Ac'],
    points: [
      { h: 'Precipitare (Ag solubil)', d: ['precipitat, **maxim la echivalență**'] },
      { h: 'Aglutinare (Ag corpuscular)', d: ['grunji în 1–2 min; martorul rămâne uniform'] },
      { h: 'Neutralizare (virus / toxină)', d: ['virusul / toxina nu mai acționează (Schick)'] },
      { h: 'RFC (complement)', d: ['!!pozitiv = fără hemoliză!! (complementul a fost consumat)'] },
      { h: 'Marcaj (RIF · IPO · ELISA)', d: ['RIF: fluorescență · IPO: precipitat maroniu · ELISA: culoare, cantitativ', '**DIRECT**: Ac cunoscut + Ag? → identifici germenul · **INDIRECT**: Ag cunoscut + Ac? → !!serodiagnostic!!'] },
    ],
    why: 'Ce fel de antigen ai decide reacția: !!solubil → precipitare, particulă → aglutinare!!. Când complexul nu se vede singur, îl faci vizibil cu complement sau cu un marcaj.',
    beatDur: 6,
  },
  // ---------------- p. 50 ----------------
  {
    scene: 'c_prec', kick: 'LP 5 · Precipitarea', title: 'Antigen solubil + anticorp → precipitat, maxim la echivalență',
    hud: ['Ag solubil + precipitine'],
    points: [
      { h: 'Echivalența', d: ['Ag solubil + Ac (precipitine) → precipitat', '!!rețeaua se formează doar în proporții echivalente!!', 'Ramon (titrarea toxinei difterice), VDRL / RPR (sifilis)'] },
      { h: 'În inel: Ascoli', d: ['fragment de organ (Ag) + **ser anticărbunos** (Ac), fără amestecare', 'inel la contact → !!diagnostic retrospectiv al cărbunelui!!'] },
      { h: 'În gel: Mancini (virusologie)', d: ['Ag în agaroză, serul în godeu → cerc de precipitat; diametrul vs. curbe etalon → **cantitativ**', 'ser la 10 zile: !!cercul crește = seroconversie!!; egale → contact vechi'] },
    ],
    why: 'În exces de Ag sau de Ac complexele rămân mici și solubile. Doar la echivalență se leagă într-o rețea destul de mare ca să se vadă.',
    beatDur: 8,
  },
  // ---------------- p. 51 ----------------
  {
    scene: 'c_aggl', kick: 'LP 5 · Aglutinarea', title: 'Antigen corpuscular + anticorp → grunji vizibili',
    hud: ['Ag corpuscular'],
    points: [
      { h: 'Pe lamă (bacteriologie)', d: ['ser aglutinant polivalent + colonie → !!grunji în 1–2 min!!', 'martor cu ser fiziologic: trebuie să rămână uniform'] },
      { h: 'RHA și HAI (virusologie)', d: ['virusul cu HA face rețea din hematii („buton stelat”)', '!!HAI pozitivă = Ac blochează HA → hematiile se depun în buton compact!!'] },
      { h: 'Pe suport', d: ['latexaglutinare, **hemaglutinare pasivă**, **coaglutinare** (proteina A, stafilococul Cowan)', 'un Ag / Ac solubil devine vizibil legat de o particulă'] },
    ],
    warn: 'La HAI citești invers: !!butonul compact = pozitiv!! (anticorpii au blocat virusul). Iar dacă martorul de pe lamă face grunji (colonii R), reacția nu se poate citi.',
    beatDur: 7,
  },
  // ---------------- p. 52 ----------------
  {
    scene: 'c_rfc', kick: 'LP 5 · Neutralizarea și RFC', title: 'Reacții pe care le vezi printr-un indicator',
    hud: ['citești ce lipsește'],
    points: [
      { h: 'Neutralizarea', d: ['Ac blochează **capacitatea infectantă** (sau toxina); citești efectul care lipsește (cultură celulară, animal sau piele, Schick)', 'Ac cunoscut → identifici virusul · virus cunoscut → cauți Ac bolnavului'] },
      { h: 'RFC: sistemul de testat', d: ['Ag cunoscut + serul bolnavului + **complement**', 'dacă există Ac, complexul **consumă complementul** (se fixează)'] },
      { h: 'RFC: sistemul hemolitic', d: ['hematii + Ac anti-hematii = indicatorul', '!!pozitiv: fără hemoliză!! (hematiile se depun) · negativ: hemoliză'] },
    ],
    why: 'Complementul e unul singur. Dacă a fost „fixat” de complexul Ag–Ac din prima etapă, nu mai rămâne nimic care să spargă hematiile din a doua etapă.',
    say: 'La RFC, dacă bolnavul are anticorpi, complementul se consumă pe complexul Ag–Ac și hematiile rămân întregi: !!reacția pozitivă înseamnă lipsa hemolizei!!.',
    beatDur: 8,
  },
  // ---------------- p. 53 ----------------
  {
    scene: 'c_label', kick: 'LP 5 · Reacțiile cu marcaj', title: 'RIF, IPO, ELISA: faci vizibil complexul Ag–Ac',
    hud: ['marcajul diferă'],
    points: [
      { h: 'RIF', d: ['Ac legat covalent de un **fluorocrom** (fluoresceină, rodamină)', 'puncte fluorescente pe fond întunecat (microscop UV) · !!nu e stabilă în timp!!'] },
      { h: 'IPO', d: ['Ac marcat cu **peroxidază** + substrat → precipitat maroniu', 'se păstrează, se citește la microscopul optic'] },
      { h: 'ELISA', d: ['reactant cunoscut pe **suport solid** + Ac marcat enzimatic + substrat', 'culoare citită spectrofotometric → !!cantitativă!!'] },
      { h: 'Direct vs. indirect', d: ['direct: Ac specific marcat', 'indirect: Ac nemarcat, apoi **Ac anti-Ig marcat** · între etape: !!spălări!!'] },
    ],
    why: 'Diferența dintre cele trei e doar marcajul. Spălarea scoate tot ce nu s-a legat, așa că semnalul rămâne numai acolo unde există complexe Ag–Ac.',
    beatDur: 7,
  },
  // ---------------- p. 54 + 56 ----------------
  {
    scene: 'c_na', kick: 'LP 5 · Acizii nucleici · PCR', title: 'O secvență cunoscută își caută perechea; PCR o multiplică întâi',
    hud: ['hibridizare · Southern · PCR'],
    points: [
      { h: 'Pașii hibridizării', d: ['extragi → **denaturezi** (lanțuri monocatenare) → fixezi pe suport'] },
      { h: 'Sonda', d: ['fragment monocatenar, marcat, cu **secvență cunoscută**', 'se leagă prin !!complementaritate!!; marcaj enzimatic, fluorocrom sau radioactiv'] },
      { h: 'Southern blot', d: ['fragmentezi ADN-ul (enzime), separi prin electroforeză (după mărime), transferi pe membrană, cauți cu sonda → banda', '**Northern = ARN · Western = proteine**'] },
      { h: 'PCR: un ciclu = 3 trepte', d: ['multiplici întâi secvența, apoi o detectezi', '!!denaturare 90 °C → aliniere primeri 50 °C → elongare 70 °C!! (valorile din LP)'] },
      { h: 'PCR: amplificarea', d: ['fiecare ciclu dublează: !!2ⁿ copii!! (×1 → ×2 → ×4 → ×8)', 'vizualizare: electroforeză + UV'] },
    ],
    why: 'Dacă sonda, caracteristică unui germen, rămâne legată după spălare, perechea ei există în probă: ai găsit germenul, chiar fără să-l cultivi. La PCR, polimeraza **Taq** vine dintr-o bacterie termofilă, deci rezistă la încălzirea repetată de la fiecare ciclu.',
    warn: 'În LP scrie că !!la Northern blot e necesară revers-transcriptaza!!. Manualele spun altfel, dar la examen dai varianta din LP.',
    beatDur: 7.5,
  },
  // ---------------- p. 55 ----------------
  {
    scene: 'c_idr', kick: 'LP 5 · Intradermoreacțiile · Boala experimentală', title: 'Aceeași injecție intradermică, citire inversă',
    hud: ['Schick ↔ PPD'],
    points: [
      { h: 'IDR Schick: neutralizare', d: ['toxină difterică diluată, intradermic, antebraț', '!!fără eritem = are Ac antitoxină = protejat!! · eritem = receptiv'] },
      { h: 'IDR la tuberculină: alergică', d: ['PPD → **hipersensibilitate tip IV** (limfocite T), maxim la ~48 h', '!!indurație = a venit în contact cu Ag (bolnav sau vaccinat)!! · fără reacție → trebuie vaccinat'] },
      { h: 'Boala experimentală', d: ['animale de laborator: șoareci, cobai, iepuri · „germ free” / gnotobiotice; animalul ales după **receptivitate**', 'inoculare pe diverse căi → supraveghere → autopsie · scop: diagnostic (izolare, patogenitate), vaccinuri, cercetare'] },
    ],
    why: 'La Schick, anticorpii din sânge neutralizează toxina chiar în piele, deci lipsa reacției e semn bun. La PPD reacția o fac limfocitele T sensibilizate, deci apariția ei arată un contact anterior; e întârziată pentru că celulele trebuie să ajungă la locul injectării.',
    say: 'Schick și tuberculina se citesc invers: la Schick, fără eritem înseamnă protejat; la tuberculină, indurația înseamnă contact anterior cu bacilul sau vaccinare.',
    beatDur: 8,
  },
];
