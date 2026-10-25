// Partea B a deck-ului Micro „Tot materialul”: LP 3 (medii de cultură, culturi celulare, oul embrionat) + LP 4 (caractere de cultură,
// tehnici de însămânțare, caractere biochimice, identificarea). Sursa: deck-ul de examen LP, paginile 19–37.

export const GL = [
  ['LP', 'lucrarea practică'], ['TSI', 'Triple Sugar Iron (mediu cu 3 zaharuri și fier)'], ['SIM', 'mediul sulfură-indol-mobilitate'],
  ['SS', 'mediul Salmonella-Shigella'], ['ABE', 'agar bilă-esculină'], ['LJ', 'mediul Löwenstein-Jensen'], ['BK', 'bacilul Koch (M. tuberculosis)'],
  ['MSA', 'Mannitol Salt Agar = mediul Chapman'], ['H₂S', 'hidrogen sulfurat'], ['CO₂', 'dioxid de carbon'], ['NaCl', 'clorură de sodiu'],
  ['NH₃', 'amoniac'], ['O₂', 'oxigen'], ['NAD', 'nicotinamid-adenin-dinucleotid (factorul V)'], ['EDTA', 'acid etilendiaminotetraacetic (versen)'],
  ['Ag', 'antigen'], ['Ac', 'anticorp'], ['PCR', 'reacția de polimerizare în lanț'], ['Fe', 'fier'], ['Pb', 'plumb'], ['H₂O₂', 'apă oxigenată'],
  ['K/A', 'pantă alcalină (roșie) / coloană acidă (galbenă)'], ['A/A', 'pantă acidă / coloană acidă (tot galben)'], ['K/K', 'tot alcalin (tot roșu)'],
  ['pH', 'măsura acidității (sub 7 = acid, peste 7 = alcalin)'],
];
export const TM = [
  ['agar', 'agarul', 'polizaharid din alge; face mediul solid, nu e hrană'],
  ['nepretențio', 'germeni nepretențioși', 'cresc pe medii simple, fără factori adăugați'],
  ['pretențio', 'germeni pretențioși', 'au nevoie de sânge, ser sau factori speciali ca să crească'],
  ['hemoliz', 'hemoliza', 'distrugerea hematiilor din mediu de către germen'],
  ['defibrinat', 'sânge defibrinat', 'sânge din care s-a scos fibrina, ca să nu se încheie'],
  ['viraj', 'virajul', 'schimbarea culorii indicatorului când se schimbă pH-ul'],
  ['fermente', 'fermentarea', 'descompunerea zahărului fără O₂, cu producere de acizi'],
  ['pepton', 'peptonele', 'fragmente de proteine din mediu; degradate dau amine alcaline'],
  ['clon', 'clona', 'grup de celule provenite din aceeași celulă, identice'],
  ['antibiogram', 'antibiograma', 'testul de sensibilitate a germenului la antibiotice'],
  ['in vitro', 'in vitro', 'în laborator, în afara organismului'],
  ['flora asociată', 'flora asociată', 'germenii care însoțesc germenul căutat în produs'],
  ['granulații', 'granulațiile Neisser', 'depozite de polifosfat la polii bacilului difteric'],
  ['verde malachit', 'verdele malachit', 'colorant care inhibă flora din spută pe LJ'],
  ['anaerostat', 'anaerostatul', 'borcan închis din care se scoate O₂'],
  ['inhibiția de contact', 'inhibiția de contact', 'celula normală se oprește din diviziune când atinge vecinele'],
  ['monostrat', 'monostratul', 'un singur strat de celule care acoperă peretele vasului'],
  ['subcultiv', 'subcultivarea', 'împarți celulele în vase noi ca să continue să crească'],
  ['pasaj', 'pasajul', 'o subcultivare'],
  ['citopatic', 'efectul citopatic', 'modificările vizibile ale celulelor produse de virus'],
  ['sinciți', 'sincițiul', 'celulă mare, cu mai mulți nuclei, din fuziunea mai multor celule'],
  ['hemadsorbți', 'hemadsorbția', 'hematiile se lipesc de celulele infectate'],
  ['interferenț', 'interferența', 'o celulă infectată nu mai poate fi infectată de alt virus'],
  ['incluzi', 'incluziile', 'agregate virale vizibile în celula infectată'],
  ['plaje', 'plajele', 'zone de celule distruse de virus într-un monostrat'],
  ['corioalantoid', 'membrana corioalantoidiană', 'membrana vascularizată de sub coaja oului'],
  ['levur', 'levurile', 'fungi unicelulari (ex. Candida)'],
  ['mucegai', 'mucegaiurile', 'fungi filamentoși'],
  ['capsul', 'capsula', 'înveliș polizaharidic în jurul bacteriei'],
  ['difuzibil', 'pigment difuzibil', 'pigment care iese din colonie și colorează mediul'],
  ['cățărar', 'cățărarea', 'Proteus se întinde în valuri pe toată placa (EN: swarming)'],
  ['confluent', 'creșterea confluentă', 'coloniile se unesc într-un strat continuu'],
  ['epuizare', 'epuizarea', 'diluarea germenilor pe suprafața plăcii, sector după sector'],
  ['flamb', 'flambarea', 'sterilizarea ansei în flacără, până la roșu'],
  ['facultativ', 'facultativ anaerob', 'crește și cu O₂, și fără'],
  ['menisc', 'meniscul', 'marginea curbată a lichidului lângă perete'],
  ['triptofan', 'triptofanul', 'aminoacid din care unii germeni fac indol'],
  ['Kovacs', 'reactivul Kovacs', 'reactiv care colorează indolul în roșu'],
  ['citratat', 'plasma citratată', 'plasmă cu citrat, care nu se coagulează spontan'],
  ['fibrinogen', 'fibrinogenul', 'proteina plasmei care devine fibrină (cheagul)'],
  ['flagel', 'flagelii', 'filamentele cu care se mișcă bacteria'],
];

export const SL = [
  /* ---------------- 19 · CE E UN MEDIU ---------------- */
  {
    scene: 'b_classify', kick: 'LP 3 · Medii de cultură', title: 'Un mediu = o bază simplă + ce adaugi cu un scop',
    hud: ['geloză simplă → 4 medii compuse'],
    points: [
      { h: 'De bază', d: ['bulion; **geloză simplă = bulion + agar**', 'germeni **nepretențioși**'] },
      { h: 'Complex', d: ['+ sânge, ser → germeni **pretențioși**; se vede **hemoliza**'] },
      { h: 'Special', d: ['pentru un germen: **Sabouraud** (fungi), **LJ** (BK), **Chocolat**'] },
      { h: 'Diferențial', d: ['!!zahăr + indicator!!: geloză lactozată, TSI, uree, SIM, Simmons'] },
      { h: 'Selectiv-diferențial', d: ['zahăr + indicator !!+ inhibitor!!: Chapman, MacConkey, SS, ABE, Levine'] },
    ],
    why: 'Mediul de cultură e un complex de substanțe care permite creșterea și multiplicarea bacteriilor. Tot ce e „compus” pornește de la o geloză sau un bulion simplu, la care adaugi ceva cu un scop. **Ce îi trebuie unui mediu:** nutrienți · !!pH 7,2–7,4!! · umiditate · sterilitate · atmosferă potrivită.',
    warn: '!!Agarul doar solidifică, NU hrănește!!.',
    beatDur: 6.5,
  },
  /* ---------------- 20 · TABLA DE LA LP ---------------- */
  {
    scene: 'b_map', kick: 'LP 3 · Tabla de la LP, redesenată', title: 'Harta mediilor: ce zahăr, ce inhibitor, ce culoare',
    hud: ['stânga: zahărul', 'dreapta: inhibitorul'],
    points: [
      { h: 'Manitol + sare NaCl 7,5% → MSA / Chapman', d: ['manitol+ → !!galben!! (roșul fenol virează la acid)'] },
      { h: 'Lactoză (+ săruri biliare)', d: ['**MacConkey** (lactoză + săruri biliare) → lactozo+ = colonii **roz**', '**geloza lactozată** (fără inhibitor) → lactozo+ = **galben**'] },
      { h: 'Glucoză + lactoză + zaharoză → TSI', d: ['TSI → **galben / roșu** (pantă și coloană citite separat)'] },
      { h: 'NEGRU = H₂S', d: ['în **TSI** și în **SIM** (SIM → negru + indol)', '**SS** (săruri biliare) → colonii **incolore / centru negru** · la **ABE** (bilă + esculină) negrul vine din !!esculină!!, nu din H₂S'] },
      { h: 'Fără zahăr', d: ['**Simmons**: citratul = sursa de carbon → !!albastru!!', '**uree** → amoniac (+ CO₂) → **roz** · **sânge**: α parțială, β completă'] },
    ],
    say: 'Zahărul face mediul **diferențial** (cine îl fermentează schimbă culoarea), inhibitorul îl face **selectiv** (sarea la Chapman, sărurile biliare la MacConkey, SS, ABE). Negrul înseamnă H₂S, cu excepția ABE, unde e esculina.',
    insets: [{ img: 'chapP', cap: 'Chapman: manitol+ → galben (LP)' }, { img: 'macP', cap: 'MacConkey: lactozo+ → roz (LP)' }, { img: 'tsi', cap: 'TSI (LP)' }, { img: 'ssSS', cap: 'SS: centru negru (LP)' }, { img: 'simmons', cap: 'Simmons + uree (LP)' }],
    beatDur: 6.5,
  },
  /* ---------------- 21 · INDICATORII DE pH ---------------- */
  {
    scene: 'b_ph', kick: 'LP 3 · Motorul mediilor diferențiale', title: 'Zahăr + indicator: acidul schimbă culoarea',
    hud: ['acid ← | → alcalin'],
    points: [
      { h: 'Albastru de bromtimol', d: ['!!galben la acid, albastru la alcalin!!', 'geloza lactozată (lactozo+ → galben), Simmons'] },
      { h: 'Roșu fenol', d: ['!!galben la acid, roșu-roz la alcalin!!', 'Chapman (manitol+ → galben), TSI, uree (uree+ → roz)'] },
      { h: 'Roșu neutru: invers', d: ['!!roșu la acid!!, galben la alcalin', 'MacConkey (lactozo+ → colonii roz), SS'] },
      { h: 'Alcalinizarea', d: ['ureaza (NH₃), citratul și peptonele fac invers: **alcalinizează** mediul', 'uree → roz · Simmons → albastru'] },
    ],
    why: 'Germenul fermentează zahărul → acizi → pH scade → indicatorul virează **exact în jurul coloniei**. Ureaza, citratul și peptonele fac invers: alcalinizează mediul.',
    say: 'Pe un mediu diferențial toți germenii cresc, dar cei care fermentează zahărul acidifică mediul și indicatorul își schimbă culoarea. Selectivul adaugă un inhibitor.',
    insets: [{ img: 'glactLN', cap: 'Geloză lactozată: albastru / galben (LP)' }, { img: 'chapP', cap: 'Chapman: manitol+ → galben (LP)' }, { img: 'macP', cap: 'MacConkey: colonii roz (LP)' }, { img: 'simmons', cap: 'Simmons albastru · uree roz (LP)' }],
    beatDur: 6.5,
  },
  /* ---------------- 22 · GELOZA-SÂNGE ---------------- */
  {
    scene: 'b_blood', kick: 'LP 3 · Geloza-sânge', title: 'Hemoliza: martorul sunt hematiile din mediu',
    hud: ['geloză-sânge'],
    points: [
      { h: 'α (alfa): verzuie, parțială', d: ['liză **incompletă**, hemoglobina devine pigment verde', 'S. pneumoniae, streptococii viridans'] },
      { h: 'β (beta): clară, completă', d: ['hematiile sparte **complet** → zonă transparentă', '!!S. pyogenes, S. aureus!!'] },
      { h: 'γ (gama): fără hemoliză', d: ['majoritatea **enterococilor**'] },
    ],
    why: 'Geloza-sânge are !!5–10% sânge defibrinat!!, adăugat la !!45–50 °C!! ca să nu coaguleze. Hematiile intacte din mediu sunt „martorul”: hemolizinele bacteriene le sparg sau nu.',
    insets: [{ img: 'hemoliza', cap: 'Hemoliza pe geloză-sânge (LP)' }, { img: 'hemoliza', cap: 'Hemoliza pe geloză-sânge (LP)' }, { img: 'gsange', cap: 'Geloză-sânge (LP)' }],
    beatDur: 7,
  },
  /* ---------------- 23 · DEFINIȚII ---------------- */
  {
    scene: 'b_pure', kick: 'LP 3 · Definiții', title: 'De la produsul patologic la cultura pură',
    hud: ['produs → colonie → cultură pură'],
    points: [
      { h: 'Însămânțarea', d: ['pui o cultură sau un produs patologic **în contact cu mediul**', 'cultivarea = creșterea bacteriilor pe medii, in vitro'] },
      { h: 'Colonia', d: ['aglomerare **vizibilă cu ochiul liber**', '!!provine dintr-o singură bacterie → o clonă!!'] },
      { h: 'Izolarea → cultura pură', d: ['repici **o singură colonie** pe alt mediu', 'cultura pură o identifici și îi faci **antibiograma**'] },
      { h: 'După consistență', d: ['**lichid**: multă cultură, fără colonii izolate · **semisolid**: mobilitatea', '!!solid în placă: singurul cu colonii izolate!!'] },
    ],
    why: 'Toate bacteriile dintr-o colonie au aceleași caractere, fiindcă vin din aceeași bacterie. De aceea identificarea și antibiograma se fac doar pe cultura pură.',
    say: 'Însămânțez produsul pe un mediu solid în placă, obțin colonii izolate, repic o singură colonie și am cultura pură pe care o identific.',
    beatDur: 7,
  },
  /* ---------------- 24 · MEDII COMPUSE ȘI SPECIALE ---------------- */
  {
    scene: 'b_special', kick: 'LP 3 · Medii compuse și speciale', title: 'Fiecare mediu are un scop: îmbogățire, transport sau un germen anume',
    hud: ['4 scopuri'],
    points: [
      { h: 'Naturale', d: ['substanțele în forma lor naturală: bilă, lapte, ouă, ser coagulat', '**Löffler** (ser coagulat) → C. diphtheriae crește repede, cu **granulații (Neisser)**'] },
      { h: 'De îmbogățire', d: ['definiția din LP: conțin **agenți selectivi** → inhibă unele bacterii și permit creșterea altora', 'bulion selenit, apă peptonată alcalină'] },
      { h: 'De transport', d: ['fără nutrienți, cu tampon: !!țin germenii vii, fără să se înmulțească!!', 'Stuart, Amies, Cary-Blair · leagă LP 3 de recoltare (LP 1)'] },
      { h: 'Speciale', d: ['**LJ** → M. tuberculosis · **Sabouraud** → fungi', '**Chocolat** → neisserii, hemofili (!!factorii X și V!!)'] },
    ],
    why: 'Pe Chocolat sângele e încălzit: hematiile sparte eliberează **hemina (X) și NAD (V)**, de care Haemophilus are nevoie. Pe LJ, **verdele malachit** oprește flora din spută.',
    warn: 'Geloza simplă **nu** e mediu natural, ci !!artificial de bază (bulion + agar)!!. Geloza-sânge e **compus (complex)**.',
    beatDur: 7,
  },
  /* ---------------- 25 · INCUBAREA ---------------- */
  {
    scene: 'b_incub', kick: 'LP 3 · Incubarea', title: 'Temperatură, timp, atmosferă: în ce condiții crește cultura',
    hud: ['termostat · ceas · borcane'],
    points: [
      { h: 'Temperatura', d: ['bacteriile patogene: !!35–37 °C!! (temperatura corpului)', 'fungii: optim **25–30 °C**'] },
      { h: 'Timpul', d: ['germenii rapizi (generație **20–30 min**) → colonii după !!18 h!!', 'levuri **24–72 h** · BK pe LJ: **săptămâni**'] },
      { h: 'Atmosfera', d: ['**aerobă**: majoritatea · **cu CO₂**: streptococi, neisserii', '**anaerobă** (anaerostat, pungi generatoare): Clostridium'] },
    ],
    why: 'Neisseriile, hemofilii și pneumococul cresc mult mai bine cu CO₂ crescut. Anaerobii stricți sunt **omorâți de oxigen**, deci au nevoie de o atmosferă fără O₂. Plăcile se incubează **întoarse (capacul jos)**.',
    say: 'Incubez la 35–37 °C, 18–24 de ore, în atmosfera pe care o tolerează germenul: aerob, cu CO₂ pentru pretențioși sau anaerob.',
    beatDur: 7,
  },
  /* ---------------- 26 · CULTURILE CELULARE ---------------- */
  {
    scene: 'b_cells', sceneOpts: { part: 0 }, kick: 'LP 3 · Culturile celulare', title: 'Virusurile cresc doar în celule vii',
    hud: ['vasele văzute de sus'],
    points: [
      { h: 'Inhibiția de contact', d: ['celulele **normale** se atașează, acoperă peretele → **monostrat**, apoi !!se opresc din multiplicare!!', '**tumorale**: se multiplică și după ce au acoperit suprafața → mai multe straturi + în suspensie'] },
      { h: 'Primare vs. linii', d: ['**primare**: direct din țesut, suportă puține subcultivări · **linii stabilizate**: derivă din primare, se mențin nelimitat (HeLa, Vero)', 'subcultivare cu **EDTA (versen) după 5–7 zile** · adulte !!4–6 pasaje!! · embrionare !!60–80!! · linii: nelimitat'] },
      { h: 'Ce le ține în viață', d: ['condiții aseptice, mediu nutritiv cu tampon, **indicator**, antibiotice', 'temperatură constantă + **10% CO₂**; subcultivezi când mediul se **acidifică**'] },
    ],
    why: 'Cultura celulară = celule izolate vii, care se pot multiplica, dar **nu se organizează în țesuturi**. Monostratul normal e „ecranul” pe care vezi efectul citopatic: orice celulă care se rotunjește iese în evidență.',
    beatDur: 7,
  },
  /* ---------------- 27 · IDENTIFICAREA IZOLATULUI VIRAL ---------------- */
  {
    scene: 'b_cells', sceneOpts: { part: 1 }, kick: 'LP 3 · Identificarea izolatului viral', title: 'Cum afli că virusul s‑a înmulțit în cultură',
    hud: ['monostratul mărit'],
    points: [
      { h: 'Monostratul normal + inocularea', d: ['normal: celule atașate, egale, una lângă alta', 'scoți mediul → **suspensia virală 1 h** → **mediu de întreținere**, mai sărac (celulele rămân vii, dar nu se mai înmulțesc intens) → urmărești zilele următoare'] },
      { h: 'Efectul citopatic', d: ['celulele **se rotunjesc, se desprind, se agregă în ciorchine, fac sinciții**'] },
      { h: 'Hemadsorbția', d: ['membrana celulelor infectate e modificată → **hematiile aderă**', 'pentru virusurile **fără efect citopatic** (ex. !!influenza!!)'] },
      { h: 'Nespecific vs. specific', d: ['**nespecifice** (efect citopatic, hemadsorbție, interferență, incluzii, plaje) arată **că** un virus se replică', '**specifice** (antigene virale prin Ag-Ac, acizi nucleici prin PCR) arată **care** virus'] },
    ],
    warn: '!!Hemadsorbția și interferența!! (o celulă deja infectată nu mai poate fi infectată cu alt virus) sunt metode !!nespecifice!!.',
    beatDur: 7.5,
  },
  /* ---------------- 28 · OUL EMBRIONAT ȘI ANIMALELE ---------------- */
  {
    scene: 'b_egg', kick: 'LP 3 · Oul embrionat și animalele', title: 'Alte două gazde vii pentru virusuri',
    hud: ['oul de găină embrionat: 5 căi'],
    points: [
      { h: 'Membrana corioalantoidiană', d: ['herpes simplex, poxvirusuri (figura din LP)'] },
      { h: 'Cavitatea alantoidiană sau amniotică', d: ['virusul !!influenza!!, virusul urlian'] },
      { h: 'Sacul vitelin', d: ['herpes simplex (figura din LP)'] },
      { h: 'Venele alantoidiene', d: ['vasele de pe membrana corioalantoidiană'] },
      { h: 'Embrionul', d: ['inoculare direct în embrion'] },
      { h: 'Animalele de laborator', d: ['când celelalte metode nu sunt satisfăcătoare; marcate, anesteziate dacă doare, locul epilat și antiseptizat', '!!7 căi!!: intradermic, subcutanat, intramuscular, intravenos, intraperitoneal, intranazal, intracerebral'] },
    ],
    why: 'Oul embrionat e un „pachet” steril de **celule vii, receptive**, cu mai multe compartimente. Alegi calea după locul în care se înmulțește virusul.',
    beatDur: 6,
  },
  /* ---------------- 29 · CARACTERE DE CULTURĂ ---------------- */
  {
    scene: 'b_colonies', kick: 'LP 4 · Caractere de cultură', title: 'Cum citești o colonie',
    hud: ['colonia = o clonă'],
    points: [
      { h: 'S (smooth): netede', d: ['rotunde, netede, bombate · **forma patogenilor**'] },
      { h: 'R (rough): rugoase', d: ['neregulate, uscate · de regulă **nepatogene**', '!!excepții: B. anthracis, M. tuberculosis, C. diphtheriae!!'] },
      { h: 'M: mucoase', d: ['lucioase, curgătoare → !!capsulă!! (Klebsiella)'] },
      { h: 'Untoase', d: ['**levuri** (Candida) · pufoase = **mucegaiuri**'] },
      { h: 'Cățărare', d: ['**Proteus** acoperă toată placa · tulpini diferite → **linia Dieneș**'] },
      { h: 'Pigment', d: ['**difuzibil**: colorează mediul (Pseudomonas) · **nedifuzibil**: doar colonia (S. aureus)'] },
    ],
    why: 'Colonii izolate obții doar prin **epuizare**. După **18 h la 35–37 °C** o singură bacterie devine o colonie vizibilă, deci colonia e o clonă.',
    insets: [{ img: 'colS', cap: 'Colonii S (LP)' }, { img: 'colR', cap: 'Colonii R (LP)' }, { img: 'macM', cap: 'Colonii M pe MacConkey (LP)' }, { img: 'untoase', cap: 'Colonii untoase (LP)' }, { img: 'catarare', cap: 'Cățărare: Proteus (LP)' }, { img: 'pigdif', cap: 'Pigment difuzibil (LP)' }],
    beatDur: 6,
  },
  /* ---------------- 31 + 32 · ANSA, EPUIZAREA, SECTORUL ---------------- */
  {
    scene: 'b_streak', kick: 'LP 4 · Ansa, epuizarea și sectorul', title: 'Epuizarea: o diluție făcută cu ansa, sector după sector',
    hud: ['placa: 4 sectoare', 'jos-dreapta: sector'],
    points: [
      { h: 'Ansa: sterilă la intrare și la ieșire', d: ['flambezi **până la roșu** (încălzire la roșu, LP 1) → o lași să se **răcească** (fierbinte, ar omorî germenii) → încarci colonia → flambezi din nou', '**ansa (bucla)**: striuri și lichid · **firul (ansa dreaptă)**: înțepare'] },
      { h: 'Sectorul 1', d: ['descarci produsul → creștere **confluentă („gazon”)**'] },
      { h: 'Sectoarele 2 și 3', d: ['ansa **flambată** duce doar ce era pe striuri → sectorul 2: colonii **lipite**', 'încă o diluție → sectorul 3: colonii **rare**'] },
      { h: 'Sectorul 4', d: ['germenii ajung câte unul → !!colonii izolate!!', 'de aici repici o colonie → **cultura pură**'] },
      { h: 'Însămânțarea în sector', d: ['tulpini **deja izolate**, câte una pe sector', '!!nu dă colonii izolate!!; compari tulpini (ex. Proteus → Dieneș)'] },
    ],
    why: 'Fiecare sector primește germeni **doar din sectorul anterior**, nu din produs, pentru că ansa se flambează între ele. Placa se incubează **întoarsă**, ca să nu picure condensul pe geloză. Pe solid: epuizare, sector, pantă, înțepare; pe lichid: omogenizarea unei colonii. !!Colonii izolate dă DOAR epuizarea!! (sectorul e tot pe placă, dar nu dă colonii izolate).',
    say: '**Scopul decide tehnica, nu mediul:** produs patologic → epuizare · tulpini deja izolate → sector · mobilitate, H₂S → înțepare · multă cultură → pantă, lichid.',
    beatDur: 7.5,
  },
  /* ---------------- 33 + 34 · OXIGENUL: PANTĂ, ÎNȚEPARE, LICHID, BULION ---------------- */
  {
    scene: 'b_oxygen', kick: 'LP 4 · Pantă, înțepare, lichid + bulion', title: 'Oxigenul decide unde crește germenul',
    hud: ['O₂ intră doar prin suprafață'],
    points: [
      { h: 'Panta (cu ansa)', d: ['striu în zigzag, **de la bază spre vârf**', 'suprafață mare, aerobă → cultură în masă, păstrezi tulpina'] },
      { h: 'Înțeparea (cu firul)', d: ['drept în centrul coloanei, retragi pe **același traiect**', 'citești **mobilitatea și H₂S** în adâncime, săracă în O₂'] },
      { h: 'Sus: aerobi stricți', d: ['creștere la suprafață · în bulion: **văl subțire** → C. diphtheriae · **membrană groasă, plisată** → !!BK (aerob strict)!!', '**inel la menisc** (pe pereți) → E. coli · **peliculă + mediu verde** → Pseudomonas (aerob + pigment difuzibil)'] },
      { h: 'Jos: depozit', d: ['anaerobi sau germeni în agregate, lanțuri', 'în bulion: **grunjos** → streptococ (lanțuri care sedimentează) · **floconos, ca vata** → B. anthracis (lanțuri lungi)'] },
      { h: 'Peste tot: tulburare difuză', d: ['germeni **facultativ anaerobi**', 'în bulion: **tulburare uniformă** → germeni dispersați: stafilococ, Salmonella'] },
    ],
    why: 'Oxigenul difuzează din aer doar în **stratul de sus**. Aerobul strict crește doar acolo, anaerobul doar jos, facultativul peste tot. Aspectul în bulion e o urmare a nevoii de oxigen și a felului în care se grupează germenii: cine vrea aer urcă la suprafață, lanțurile grele cad la fund. Aspectele și germenii sunt din LP.',
    warn: '!!Nicio tehnică în eprubetă nu dă colonii izolate!!.',
    beatDur: 7,
  },
  /* ---------------- 30 + 35 · TUBURILE BIOCHIMICE ---------------- */
  {
    scene: 'b_biochem', sceneOpts: { lite: true }, kick: 'LP 4 · Caractere biochimice + metabolismul proteic', title: 'Tuburile: ce citești în fiecare',
    hud: ['TSI: 3 zaharuri + roșu fenol + fier'],
    points: [
      { h: 'TSI K/A: doar glucoza', d: ['pantă **roșie**, coloană **galbenă** → !!Salmonella, Shigella!! · K/K = tot roșu'] },
      { h: 'TSI A/A: și lactoza / zaharoza', d: ['tot galben (E. coli), **adesea cu gaz**'] },
      { h: 'Negru = H₂S', d: ['aminoacizii cu sulf → H₂S; cu **săruri de fier sau plumb** → sulfuri negre (TSI, SIM) · Salmonella, Proteus + · Shigella, E. coli −'] },
      { h: 'Indolul', d: ['triptofanul se degradează → indol; cu **Kovacs** (hârtie la dop sau SIM) → !!inel roșu = +!!', 'E. coli indol + · Klebsiella, Salmonella indol −'] },
      { h: 'Ureaza', d: ['ureea → amoniac → alcalin → roșul fenol **roz** · **Proteus puternic +** (câteva ore)'] },
      { h: 'Simmons', d: ['citratul ca **unică sursă de carbon** → alcalin → **albastru** · Klebsiella + · E. coli −'] },
    ],
    why: 'TSI are !!glucoză de 10× mai puțină!!. Dacă germenul fermentează doar glucoza, ea se termină repede; pe pantă (cu oxigen) degradează **peptonele → amine → roșu**, iar în coloană acidul rămâne → **galben**.',
    say: 'Germenul degradează un substrat din mediu, iar produsul se vede: indolul face inel roșu cu Kovacs, H₂S-ul face precipitat negru cu sărurile de fier, amoniacul de la urează face mediul roz.',
    beatDur: 7,
  },
  /* ---------------- 36 + 35 · ENZIME ȘI MOBILITATE ---------------- */
  {
    scene: 'b_ident', sceneOpts: { part: 0 }, kick: 'LP 4 · Enzime și mobilitate', title: 'Testele rapide care împart germenii în grupe',
    hud: ['pe lamă · în tub'],
    points: [
      { h: 'Catalaza', d: ['cultura în **H₂O₂** pe lamă → **bule = +** (apa oxigenată → apă + oxigen)', '!!Staphylococcus catalază + · Streptococcus catalază −!!'] },
      { h: 'Oxidaza', d: ['colonie pe bandă umezită → **mov închis = +**, în secunde (compus colorat)', 'Pseudomonas, Neisseria oxidază + · enterobacterii oxidază −'] },
      { h: 'Coagulaza', d: ['pe lamă (picătură de plasmă) sau în tub (**plasmă citratată, 24 h**) · coaguli = + → !!S. aureus!!'] },
      { h: 'Mobilitatea', d: ['înțepare în semisolid (SIM): **mobilul tulbură tot mediul** (flageli) · imobilul crește doar pe traiect'] },
      { h: 'Substrat → enzimă → produs vizibil', d: ['fiecare specie are un **set propriu de enzime**; nu vezi enzima, ci **produsul ei** (acid, bază, indol, H₂S), care schimbă culoarea mediului sau a reactivului'] },
    ],
    why: 'Plasma trebuie să fie **citratată**: citratul oprește coagularea spontană, dar păstrează **fibrinogenul**, pe care coagulaza îl transformă în fibrină.',
    warn: 'Pentru catalază **nu** iei colonia de pe geloza-sânge: hematiile au catalază proprie → !!fals pozitiv la streptococ!!.',
    beatDur: 7,
  },
  /* ---------------- 37 · IDENTIFICAREA ---------------- */
  {
    scene: 'b_ident', sceneOpts: { part: 1 }, kick: 'LP 4 · Identificarea', title: 'Cum legi testele: de la colonie la gen (schemă din manual)',
    hud: ['colonie → Gram → test rapid → mediu'],
    points: [
      { h: 'Frotiul Gram', d: ['primul pas: **forma și culoarea** împart germenii în grupe mari'] },
      { h: 'Testele rapide pe lamă', d: ['coci Gram +: !!catalaza!! (stafilococ + / streptococ −)', 'bacili Gram −: !!oxidaza!! (Pseudomonas + / enterobacterii −)'] },
      { h: 'La coci', d: ['**coagulaza** → S. aureus · **hemoliza** → streptococi'] },
      { h: 'La bacilii Gram −', d: ['**mediile diferențiale**: lactoză, TSI, indol, H₂S, urează, citrat, mobilitate', 'Pseudomonas: pigment verde'] },
    ],
    why: 'Ordinea contează: întâi testele **rapide, pe lamă** (Gram, catalază, oxidază), apoi **mediile diferențiale**, care cer încă o noapte de incubare.',
    say: 'Pornesc de la o colonie izolată: fac Gram, apoi catalaza la coci sau oxidaza la bacili, și abia apoi mediile diferențiale ca să ajung la specie.',
    beatDur: 6.5,
  },
];
