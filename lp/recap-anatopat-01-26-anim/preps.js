// Fișele OSPE pe preparat, generate din fișele deck-urilor anatopat-z1…z4 (aliniate la LP: S1, S2). Roșu (!!…!!) = ce dă puncte.
export const PREPS = {
 "1": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 1 · Edem pulmonar acut",
  "title": "Alveolele sunt pline cu lichid roz, nu cu aer",
  "hud": [
   "lama 1 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p1",
    "W": 1032,
    "H": 425,
    "marks": [
     {
      "x": 680,
      "y": 150,
      "rx": 75,
      "ry": 55,
      "lab": "alveole pline cu transsudat"
     },
     {
      "x": 548,
      "y": 248,
      "rx": 52,
      "ry": 46,
      "lab": "vas congestionat"
     }
    ]
   },
   "sub": {
    "img": "q1",
    "W": 666,
    "H": 736,
    "marks": [],
    "cap": "la ochiul liber"
   },
   "dd": {
    "img": "p2",
    "cap": "DD · lama 2"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Plămân!!, colorația **HE** → !!Edem pulmonar acut!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Edemul = !!acumulare de lichid interstițial în țesuturi!!; în plămân, lichidul (transsudat) expandează septurile și umple alveolele."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● ob. mic: spații alveolare pline cu o **substanță omogenă, eozinofilă** (edem alveolar) ● septuri interalveolare **ușor expandate** de lichid (edem interstițial) ● lichidul de edem (**transsudat**), extravazat brusc, amestecat cu **spații optic goale: bule de aer** ● !!vase congestionate!!."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● **creșterea presiunii hidrostatice** (insuficiența cardiacă) ● **scăderea presiunii coloid-osmotice (oncotice)**: malnutriție, sinteză hepatică scăzută, sindrom nefrotic ● dezechilibrul presiunilor dilată patul capilar și **permeabilizează bariera endotelială** → transsudat (sărac în proteine, densitate sub 1012)."
   },
   {
    "tm": "5 · Complicații",
    "at": "",
    "tx": "LP nu dă complicații pentru edemul pulmonar acut. Pe piesă: plămâni de volum și greutate crescute; la secțiune se elimină lichid roz, spumos, aerat."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Plămân de stază cronică + infarct pulmonar** (lama 2). = Ambele: plămân în HE, cu vase congestionate. ≠ ① La mine alveolele sunt pline cu substanță omogenă, eozinofilă (transsudat), cu bule de aer; la stază alveolele conțin siderofage (celule cardiace) cu pigment brun. ② La mine septurile sunt doar ușor expandate de lichid; la stază septurile sunt îngroșate și fibrozate. ③ La mine nu există necroză; lama 2 are și o zonă de infarct: alveole inundate hemoragic, septuri fără nuclei, cu lizereu congestiv. Alternative: Infarctul pulmonar (zona de infarct din lama 2) · Pericardită fibrinoasă."
   }
  ]
 },
 "2": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga zona de infarct, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 2 · Plămân de stază cronică + infarct pulmonar hemoragic",
  "title": "Septuri groase, siderofage și, sub pleură, a doua leziune: infarctul",
  "hud": [
   "lama 2 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p2",
    "W": 1115,
    "H": 530,
    "marks": [
     {
      "x": 600,
      "y": 385,
      "rx": 125,
      "ry": 98,
      "lab": "siderofage (pigment brun)"
     },
     {
      "x": 112,
      "y": 325,
      "rx": 42,
      "ry": 85,
      "lab": "sept îngroșat"
     },
     {
      "x": 805,
      "y": 282,
      "rx": 60,
      "ry": 88,
      "lab": "vas congestionat",
      "rot": -0.3
     }
    ]
   },
   "sub": {
    "img": "q2",
    "W": 1522,
    "H": 723,
    "marks": [
     {
      "x": 320,
      "y": 570,
      "rx": 230,
      "ry": 110
     },
     {
      "x": 1200,
      "y": 120,
      "rx": 230,
      "ry": 80
     },
     {
      "x": 1250,
      "y": 318,
      "rx": 230,
      "ry": 24,
      "dash": true
     }
    ],
    "cap": "zona de infarct"
   },
   "dd": {
    "img": "p1",
    "cap": "DD · lama 1"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "m",
     1
    ],
    [
     "s",
     0
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2,
    3
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere · staza",
    "Descriere · infarctul",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Plămân!!, colorația **HE** → !!Plămân de stază cronică (congestie pulmonară cronică) cu infarct pulmonar!! (roșu, hemoragic)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Congestia = !!proces pasiv, prin alterarea drenajului sanguin venos → stază!!. Infarctul = **necroza unui țesut cauzată de aportul insuficient de sânge oxigenat**."
   },
   {
    "tm": "3 · Descriere · staza",
    "at": "3 p",
    "tx": "● **septuri interalveolare îngroșate, fibrozate, cu vase congestionate** ● în spațiile alveolare: **siderofage (celule cardiace)** cu pigment brun de hemosiderină, izolate sau grupate ● hemosiderina provine din **degradarea hematiilor extravazate** din vasele congestionate."
   },
   {
    "tm": "4 · Descriere · infarctul",
    "at": "4 p",
    "tx": "● **zonă bine delimitată**, cu alveole **inundate hemoragic** și alveolocite necrozate ● **arhitectura păstrată**, aspect umbriform, **fără nuclei** ● parenchimul adiacent cu **modificări de stază cronică** ● la limită: !!lizereu congestiv!! (vase congestionate, eritrocite extravazate, infiltrat inflamator acut)."
   },
   {
    "tm": "5 · Cauze",
    "at": "3 p",
    "tx": "● staza: **alterarea drenajului venos** (congestia din **insuficiența cardiacă**) ● infarctul: **obstrucția unei ramuri a arterei pulmonare (TEP)**, de obicei dintr-o TVP a membrelor inferioare ● infarctul apare **doar pe o stază cronică preexistentă**: presiunea crescută împiedică suplinirea prin ramurile bronșice."
   },
   {
    "tm": "6 · Complicații",
    "at": "",
    "tx": "LP nu dă complicații separate pentru staza cronică și infarctul pulmonar."
   },
   {
    "tm": "7 · DD",
    "at": "✓",
    "tx": "Cu **Edem pulmonar acut** (lama 1). = Ambele: plămân în HE, cu vase congestionate. ≠ ① La mine, în alveole, siderofage (celule cardiace) cu pigment brun de hemosiderină; la edem alveolele sunt pline cu substanță omogenă, eozinofilă, cu bule de aer. ② La mine septurile sunt îngroșate, fibrozate; la edem septurile sunt doar ușor expandate de lichid. ③ La mine și o zonă de infarct: alveole inundate hemoragic, septuri fără nuclei, lizereu congestiv; la edem nu există necroză. Alternative: Infarct renal · Tromb mixt."
   }
  ]
 },
 "3": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 3 · Infarct renal anemic",
  "title": "Zona moartă păstrează desenul, dar își pierde nucleii",
  "hud": [
   "lama 3 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p3",
    "W": 1396,
    "H": 664,
    "marks": [
     {
      "x": 1060,
      "y": 380,
      "rx": 210,
      "ry": 150,
      "lab": "zona infarctată: tubi „fantomă”, fără nuclei"
     },
     {
      "x": 520,
      "y": 300,
      "rx": 140,
      "ry": 110,
      "lab": "lizereu: congestie + infiltrat inflamator"
     },
     {
      "x": 225,
      "y": 140,
      "rx": 75,
      "ry": 62,
      "lab": "vas congestionat"
     }
    ]
   },
   "sub": {
    "img": "q3",
    "W": 454,
    "H": 642,
    "marks": [],
    "cap": "la ochiul liber"
   },
   "dd": {
    "img": "p4",
    "cap": "DD · lama 4"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Rinichi!!, colorația **HE** → !!Infarct renal acut (alb, anemic, ischemic)!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Necroza unei porțiuni din parenchimul renal, datorită obstrucției ramurii arteriale care deservește teritoriul respectiv!!."
   },
   {
    "tm": "3 · Descriere",
    "at": "3 p",
    "tx": "● **zona de infarct**: palidă, aspect **fantomatic**, prin **pierderea nucleilor, cu păstrarea arhitecturii** (necroză) ● **parenchim renal normal** alături ● la limită: !!lizereu congestiv!!: capilare congestionate, eritrocite extravazate și **bandă de infiltrat inflamator acut**."
   },
   {
    "tm": "4 · Cauze",
    "at": "2 p",
    "tx": "● **obstrucția ramurii arteriale** care deservește teritoriul (tromb/embol arterial) ● rinichiul e organ parenchimatos cu **circulație unică** → infarct alb."
   },
   {
    "tm": "5 · Complicații",
    "at": "",
    "tx": "LP nu dă complicații pentru infarctul renal."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Infarct miocardic acut** (lama 4). = Ambele: zonă de infarct cu pierderea nucleilor și lizereu congestiv la limită. ≠ ① La mine se recunosc tubi și glomeruli „fantomă”; la IMA fibre musculare fără nuclei, cu sarcoplasmă omogenă, intens eozinofilă. ② La mine lizereul e o singură bandă: capilare congestionate + infiltrat inflamator acut; la IMA lizereul are două benzi: internă de granulocite, externă de congestie. ③ La mine parenchimul din jur e renal normal; la IMA zona necrozată e delimitată de țesut de granulație care pătrunde printre fibrele normale. Alternative: Infarctul pulmonar (zona de infarct din lama 2) · Abcese hepatice."
   }
  ]
 },
 "4": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 4 · Infarct miocardic acut",
  "title": "Fibre fără nuclei, intens eozinofile, cu lizereu de granulocite",
  "hud": [
   "lama 4 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p4",
    "W": 1368,
    "H": 650,
    "marks": [
     {
      "x": 900,
      "y": 320,
      "rx": 185,
      "ry": 110,
      "lab": "fibre necrozate, intens eozinofile"
     },
     {
      "x": 130,
      "y": 565,
      "rx": 115,
      "ry": 60,
      "lab": "infiltrat de granulocite"
     },
     {
      "x": 400,
      "y": 448,
      "rx": 120,
      "ry": 40,
      "lab": "fibre cu nuclei (viabile)"
     }
    ]
   },
   "sub": {
    "img": "q4",
    "W": 606,
    "H": 722,
    "marks": [],
    "cap": "la ochiul liber"
   },
   "dd": {
    "img": "p3",
    "cap": "DD · lama 3"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Miocard!! (cord), colorația **HE** → !!Infarct miocardic acut!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Infarctul = !!necroza unui țesut cauzată de aportul insuficient de sânge oxigenat!!; aici, a miocardului."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● zonă **bine conturată**: fibre musculare **lipsite de nuclei**, sarcoplasmă **omogenă, intens eozinofilă** ● la periferie: !!lizereu congestiv!!: bandă internă de **granulocite**, bandă externă de **congestie** ● zona necrozată delimitată de **țesut de granulație** (capilare neoformate, histiocite, limfocite, fibroblaști) ● țesutul de granulație pătrunde și printre **fibrele normale** ale miocardului vecin."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● **coronaroscleroza** ● **tromboza/embolia coronarelor** ● **spasmul coronarian** (factori de risc: HTA, hiperlipemie, sedentarism, diabet zaharat, stres, fumat)."
   },
   {
    "tm": "5 · Complicații",
    "at": "10 p",
    "tx": "● **tulburări de ritm și conducere** (FiV) ● **insuficiență cardiacă** (20%) ● **șoc cardiogen** (40%) ● **ruptura cordului** (miomalacie) → hemopericard, tamponadă ● **complicații tromboembolice** ● **anevrism cardiac** ● **infarctizare progresivă** ● **moarte subită** ● **insuficiențe valvulare** ● **sindrom Dressler** (pericardită)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Infarct renal** (lama 3). = Ambele: zonă de infarct cu pierderea nucleilor și lizereu congestiv la limită. ≠ ① La mine fibre musculare fără nuclei, cu sarcoplasmă omogenă, intens eozinofilă; la infarctul renal tubi și glomeruli „fantomă”. ② La mine lizereul are două benzi: internă de granulocite, externă de congestie; la infarctul renal o bandă de capilare congestionate și infiltrat inflamator acut. ③ La mine necroza e delimitată de țesut de granulație (capilare neoformate, histiocite, limfocite, fibroblaști); la infarctul renal, alături, parenchim renal normal. Alternative: Pericardită fibrinoasă · Abcese hepatice."
   }
  ]
 },
 "5": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 5 · Tromb mixt (liniile Zahn)",
  "title": "Lamele alternante palide și roșii, lipite de perete",
  "hud": [
   "lama 5 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p5",
    "W": 1090,
    "H": 518,
    "marks": [
     {
      "x": 470,
      "y": 300,
      "rx": 72,
      "ry": 155,
      "lab": "lamelă roșie (hematii)"
     },
     {
      "x": 250,
      "y": 250,
      "rx": 42,
      "ry": 200,
      "lab": "lamelă palidă (trombocite, fibrină)",
      "ly": 28
     },
     {
      "x": 895,
      "y": 250,
      "rx": 72,
      "ry": 220,
      "lab": "peretele vascular"
     }
    ]
   },
   "sub": {
    "img": "q5",
    "W": 419,
    "H": 727,
    "marks": [
     {
      "x": 200,
      "y": 280,
      "rx": 110,
      "ry": 220
     },
     {
      "x": 335,
      "y": 330,
      "rx": 22,
      "ry": 190
     }
    ],
    "cap": "la ochiul liber"
   },
   "dd": {
    "img": "p15",
    "cap": "DD · lama 15"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s",
     0
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Vas arterial!! (perete de vas arterial), colorația **HE** → !!Tromb mixt stratificat!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Tromboza = !!coagulare intravasculară și intravitală!!."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● tromb **aderent de peretele vasului arterial** ● **rețea de fibrină** în ochiurile căreia se depun alternativ leucocite și trombocite, apoi eritrocite ● straturi **slab eozinofile** (trombocite + fibrină; palide macroscopic) alternând cu straturi **roșii** (bogate în hematii; roșu închis macroscopic) ● = !!liniile lui Zahn!!."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● triada Virchow: **leziunea endotelială** ● **fluxul sanguin anormal** ● **statusul hipercoagulant**."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **propagarea** (creșterea în dimensiuni) ● **embolizarea** → ram mai mic obstruat → **infarct** (trombii venoși: risc de TEP) ● **dizolvarea** (fibrinolitici endogeni sau exogeni: t-PA) ● **organizarea/recanalizarea** (endotelizare, înglobare în perete, capilare în grosimea trombului)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Pericardită fibrinoasă** (lama 15). = Ambele: depozit eozinofil de fibrină, cu celule ale sângelui prinse în ochiurile rețelei. ≠ ① La mine masa e în lumenul unui vas arterial, aderentă de perete; la pericardită fibrina e pe suprafața seroasei, ulcerată. ② La mine straturi alternante: slab eozinofile (trombocite + fibrină) și roșii (hematii) = liniile lui Zahn; la pericardită o rețea de filamente grosolane roșu-roz, cu granulocite și histiocite. ③ La mine dedesubt e peretele vasului; la pericardită țesut subepicardic îngroșat, cu capilare congestionate și infiltrat inflamator, peste miocardul păstrat. Alternative: Infarctul pulmonar (zona de infarct din lama 2) · Hipercheratoză."
   }
  ]
 },
 "6": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: trombul, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 6 · Aortă cu tromb parietal",
  "title": "Un tromb lipit de intima cu plăci aterosclerotice",
  "hud": [
   "piesa 6 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p6",
    "W": 435,
    "H": 1110,
    "marks": [
     {
      "x": 165,
      "y": 245,
      "rx": 55,
      "ry": 40,
      "lab": "intima aortei"
     },
     {
      "x": 262,
      "y": 340,
      "rx": 58,
      "ry": 58,
      "lab": "plăci aterosclerotice"
     },
     {
      "x": 300,
      "y": 860,
      "rx": 85,
      "ry": 150,
      "lab": "tromb parietal"
     }
    ]
   },
   "sub": {
    "img": "d6",
    "W": 435,
    "H": 330,
    "marks": [],
    "cap": "detaliu: trombul"
   },
   "dd": {
    "img": "p7",
    "cap": "DD · piesa 7"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Aortă!! (deschisă longitudinal) → !!Aortă cu ateroscleroză și tromb parietal!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Tromboza = !!coagulare intravasculară și intravitală!!; trombul parietal e aderent de peretele aortei."
   },
   {
    "tm": "3 · Descriere",
    "at": "3 p",
    "tx": "● **intima aortei** ● pe intimă: **plăci aterosclerotice** ● pe perete: !!tromb parietal!!, aderent (tromb mixt stratificat)."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● triada Virchow: **leziunea endotelială** (placa aterosclerotică) ● **fluxul sanguin anormal** ● **statusul hipercoagulant**."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **propagarea** (trombii arteriali cresc retrograd) ● **embolizarea**: migrează distal de cord, obstruă un ram mai mic → **infarct** ● **dizolvarea** (fibrinolitici: t-PA) ● **organizarea/recanalizarea** (înglobare în perete, capilare în tromb)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Tromb călăreț** (piesa 7). = Ambele: aortă cu tromb aderent de perete (coagulare intravasculară și intravitală). ≠ ① La mine trombul e parietal, pe peretele aortei; la trombul călăreț trombul stă călare pe bifurcația aortei. ② La mine trombul e lipit de peretele aortei (parietal); la trombul călăreț intră în ambele artere iliace comune. ③ La mine se văd plăcile aterosclerotice ale intimei; la trombul călăreț piesa arată mai ales trombul mixt stratificat, mat, friabil. Alternative: Pericardită fibrinoasă · Hemoragii intracraniene."
   }
  ]
 },
 "7": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: trombul, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 7 · Tromb călăreț",
  "title": "Un tromb călare pe bifurcația aortei, cu câte un capăt în fiecare a. iliacă",
  "hud": [
   "piesa 7 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p7",
    "W": 862,
    "H": 880,
    "marks": [
     {
      "x": 260,
      "y": 170,
      "rx": 135,
      "ry": 95,
      "lab": "aorta abdominală"
     },
     {
      "x": 150,
      "y": 620,
      "rx": 100,
      "ry": 110,
      "lab": "a. iliacă comună"
     },
     {
      "x": 385,
      "y": 455,
      "rx": 105,
      "ry": 60,
      "lab": "tromb călare pe bifurcație",
      "rot": 0.4
     },
     {
      "x": 520,
      "y": 650,
      "rx": 70,
      "ry": 110,
      "lab": "trombul intră în a. iliacă",
      "rot": -0.35
     }
    ]
   },
   "sub": {
    "img": "d7",
    "W": 231,
    "H": 154,
    "marks": [],
    "cap": "detaliu: trombul"
   },
   "dd": {
    "img": "p6",
    "cap": "DD · piesa 6"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Aorta abdominală!!, cu bifurcația în arterele iliace comune → !!Tromb călăreț!! (tromb călare pe bifurcația aortei)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Tromboza = !!coagulare intravasculară și intravitală!!; trombul călăreț stă călare pe bifurcația aortei."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● **aorta abdominală** și **bifurcația** în cele două artere iliace comune ● trombul stă **călare pe bifurcație** ● se extinde în **ambele artere iliace comune** ● !!tromb mixt stratificat, aderent, mat, friabil!!."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● triada Virchow: **leziunea endotelială** ● **fluxul sanguin anormal** ● **statusul hipercoagulant**."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **propagarea** (trombii arteriali cresc retrograd) ● **embolizarea**: fragmentele migrează distal, obstruă un ram mai mic → **infarct** ● **dizolvarea** (t-PA) ● **organizarea/recanalizarea**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Aortă cu tromb parietal** (piesa 6). = Ambele: aortă cu tromb aderent de perete (coagulare intravasculară și intravitală). ≠ ① La mine trombul stă călare pe bifurcația aortei; la aortă trombul e parietal, pe peretele aortei. ② La mine trombul intră în ambele artere iliace comune; la aortă trombul e lipit de peretele aortei (parietal). ③ La mine piesa arată trombul mixt stratificat, mat, friabil; la aortă se văd și plăcile aterosclerotice ale intimei. Alternative: Infarct pulmonar · Hemoragii intracraniene."
   }
  ]
 },
 "8": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga în borcan, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 8 · Infarct renal",
  "title": "O zonă palidă, conturată de un lizereu congestiv",
  "hud": [
   "piesa 8 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p8",
    "W": 800,
    "H": 820,
    "marks": [
     {
      "x": 420,
      "y": 180,
      "rx": 150,
      "ry": 120,
      "lab": "zona de infarct",
      "ly": 30
     },
     {
      "x": 350,
      "y": 320,
      "rx": 140,
      "ry": 30,
      "lab": "lizereu congestiv",
      "rot": 0.1,
      "dash": true
     },
     {
      "x": 400,
      "y": 560,
      "rx": 160,
      "ry": 100,
      "lab": "parenchim renal normal"
     }
    ]
   },
   "sub": {
    "img": "d8",
    "W": 1110,
    "H": 833,
    "marks": [],
    "cap": "în borcan"
   },
   "dd": {
    "img": "p9",
    "cap": "DD · piesa 9"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Rinichi!! (secționat) → !!Infarct renal acut (alb, anemic, ischemic)!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Necroza unei porțiuni din parenchimul renal, datorită obstrucției ramurii arteriale care deservește teritoriul respectiv!!."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● **zonă de infarct palidă**, bine conturată ● vizibilă și pe **suprafața externă** a rinichiului ● conturată de **lizereul congestiv** ● restul: **parenchim renal normal**."
   },
   {
    "tm": "4 · Cauze",
    "at": "2 p",
    "tx": "● **obstrucția ramurii arteriale** (tromb/embol: trombii arteriali migrează distal de cord) ● rinichiul are **circulație unică** → infarct alb."
   },
   {
    "tm": "5 · Complicații",
    "at": "",
    "tx": "LP nu dă complicații pentru infarctul renal."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Infarct pulmonar** (piesa 9). = Ambele: infarct = necroza unui țesut prin aport insuficient de sânge oxigenat; zonă bine delimitată. ≠ ① La mine infarct alb (anemic), zonă palidă; la infarctul pulmonar zona e roșie-negricioasă (hemoragic). ② La mine rinichiul are circulație unică; plămânul are circulație dublă, iar infarctul apare doar pe stază cronică. ③ La mine zona e conturată de un lizereu congestiv, vizibilă pe suprafața externă; la infarctul pulmonar parenchimul din jur are stază cronică (indurație brună). Alternative: Rinichi de șoc · Litiază renală."
   }
  ]
 },
 "9": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: stază, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 9 · Infarct pulmonar",
  "title": "O zonă triunghiulară roșie-negricioasă, cu vârful spre hil",
  "hud": [
   "piesa 9 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p9",
    "W": 1430,
    "H": 550,
    "marks": [
     {
      "x": 590,
      "y": 220,
      "rx": 250,
      "ry": 130,
      "lab": "plămân cu stază cronică (indurație brună)"
     },
     {
      "x": 1150,
      "y": 250,
      "rx": 200,
      "ry": 120,
      "lab": "a doua secțiune prin plămân"
     }
    ]
   },
   "sub": {
    "img": "d9",
    "W": 550,
    "H": 367,
    "marks": [],
    "cap": "detaliu: stază"
   },
   "dd": {
    "img": "p8",
    "cap": "DD · piesa 8"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Plămân!! (secționat) → !!Infarct pulmonar (roșu, hemoragic)!!, pe plămân cu stază cronică."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Infarctul = !!necroza unui țesut cauzată de aportul insuficient de sânge oxigenat!!; în plămân apare doar pe o stază cronică preexistentă."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● zonă de infarct, pe secțiune **triunghiulară**, cu **vârful spre hil** (vasul obstrucționat) ● **margini bine delimitate** ● culoare **roșie-negricioasă** ● plămânul din jur: **stază cronică (indurație brună)**: greutate crescută, brun (siderofage), consistență fermă."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● **obstrucția unei ramuri a arterei pulmonare (TEP)**, cu trombul migrat dintr-o TVP ● **stază pulmonară cronică preexistentă** ● presiunea crescută împiedică suplinirea prin ramurile bronșice."
   },
   {
    "tm": "5 · Complicații",
    "at": "",
    "tx": "LP nu dă complicații pentru infarctul pulmonar."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Infarct renal** (piesa 8). = Ambele: infarct = necroza unui țesut prin aport insuficient de sânge oxigenat; zonă bine delimitată. ≠ ① La mine zona e roșie-negricioasă (hemoragic); la infarctul renal zona e palidă (alb, anemic). ② La mine plămânul are circulație dublă și infarctul apare doar pe stază cronică; rinichiul are circulație unică. ③ La mine parenchimul din jur are stază cronică (indurație brună); la infarctul renal zona e conturată de un lizereu congestiv, restul rinichiului e normal. Alternative: Bronhopneumonie · Tromb călăreț."
   }
  ]
 },
 "10": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga felii de cord, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 10 · Infarct miocardic acut",
  "title": "O zonă palidă, cu halou hiperemic, în peretele VS",
  "hud": [
   "piesa 10 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p10",
    "W": 530,
    "H": 700,
    "marks": [
     {
      "x": 270,
      "y": 230,
      "rx": 140,
      "ry": 150,
      "lab": "zonă hiperemică, negricioasă"
     },
     {
      "x": 420,
      "y": 300,
      "rx": 28,
      "ry": 130,
      "lab": "peretele VS"
     },
     {
      "x": 280,
      "y": 550,
      "rx": 90,
      "ry": 50,
      "lab": "VD"
     }
    ]
   },
   "sub": {
    "img": "d10",
    "W": 1096,
    "H": 822,
    "marks": [],
    "cap": "felii de cord"
   },
   "dd": {
    "img": "p23",
    "cap": "DD · piesa 23"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Cord!! (secțiune prin ventriculi: VD, VS, sept interventricular) → !!Infarct miocardic acut!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Infarctul = !!necroza unui țesut cauzată de aportul insuficient de sânge oxigenat!!; aici, a miocardului."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● în peretele VS: **zonă hiperemică** (aspect la aprox. 12–24 h) ● zona pe cale de necroză e **mai palidă**, înconjurată de un **halou hiperemic** ● după 2–3 zile: **galben ca lutul**, omogen, consistență moale ● după câteva săptămâni: **țesut cicatriceal alb-sidefiu**."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● **coronaroscleroza** ● **tromboza/embolia coronarelor** ● **spasmul coronarian**."
   },
   {
    "tm": "5 · Complicații",
    "at": "10 p",
    "tx": "● **tulburări de ritm** (FiV) ● **insuficiență cardiacă** ● **șoc cardiogen** ● !!ruptura cordului!! (miomalacie, 5–10 zile) → hemopericard, tamponadă ● **tromboembolii** ● **anevrism cardiac** ● **infarctizare progresivă** ● **moarte subită** ● **insuficiențe valvulare** ● **sindrom Dressler**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Pericardită fibrinoasă** (piesa 23). = Ambele: cord; IMA poate da chiar pericardită (pericardita epistenocardică, sindromul Dressler). ≠ ① La mine leziunea e în grosimea miocardului; la pericardită depozitele de fibrină sunt pe suprafața pericardului. ② La mine zona e mai palidă, cu halou hiperemic (după 2–3 zile galbenă, moale); la pericardită suprafața e mată, rugoasă, cu aspect de „limbă de pisică”. ③ La mine complicația gravă e ruptura (miomalacie) cu hemopericard; la pericardită evoluția e spre aderențe fibroase (pericardită constrictivă). Alternative: Infarct renal · Aortă cu tromb parietal."
   }
  ]
 },
 "11": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga subdural (006), jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 11 · Hemoragii intracraniene · hematom intracerebral",
  "title": "Sânge în parenchim și în ventricul: hematom intracerebral și intraventricular",
  "hud": [
   "piesa 11 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p11",
    "W": 563,
    "H": 608,
    "marks": [
     {
      "x": 220,
      "y": 415,
      "rx": 90,
      "ry": 45,
      "lab": "hematom intraventricular și intracerebral"
     },
     {
      "x": 270,
      "y": 240,
      "rx": 120,
      "ry": 40,
      "lab": "sânge în ventriculii laterali"
     },
     {
      "x": 430,
      "y": 480,
      "rx": 60,
      "ry": 50,
      "lab": "creier"
     }
    ]
   },
   "sub": {
    "img": "d11",
    "W": 577,
    "H": 771,
    "marks": [],
    "cap": "subdural (006)"
   },
   "dd": {
    "img": "p24",
    "cap": "DD · piesa 24"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Celelalte tipuri",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Creier!! (secționat) → !!Hemoragie intracraniană: hematom intracerebral și intraventricular!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Hemoragia = !!extravazarea sângelui în afara unui vas!!; hemoragia intracerebrală = impregnarea hematică a parenchimului cerebral prin ruperea unei ramuri vasculare intracerebrale."
   },
   {
    "tm": "3 · Descriere",
    "at": "3 p",
    "tx": "● sânge în **parenchimul cerebral**: hematom intracerebral ● sânge în **ventriculul lateral**: hematom intraventricular (inundare ventriculară) ● ventriculii se inundă direct, dintr-o hemoragie cerebrală adiacentă, sau prin comunicarea cu spațiul subarahnoidian."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● **întreruperea continuității peretelui vascular** (ruperea unei ramuri intracerebrale) ● **erodarea peretelui** (proces neoplazic de vecinătate, tuberculom) ● **diapedeza** (peretele rămâne integru)."
   },
   {
    "tm": "5 · Celelalte tipuri",
    "at": "",
    "tx": "LP are piese și pentru: ● **hematom subdural** (craniu secționat): între dura mater și arahnoidă ● **hematom subarahnoidian**: între arahnoidă și pia mater, vizibil și în spațiile intergirale. Fără piesă: ● **epidural**: între oasele craniene și dura mater, de obicei traumatic."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Abces cerebral** (piesa 24). = Ambele: creier pe secțiune, cu o leziune în parenchim. ≠ ① La mine conținutul e sânge (hematom); la abces e puroi, într-o cavitate rotund-ovalară. ② La mine sângele vine din ruperea unei ramuri vasculare intracerebrale; la abces țesutul suferă necroză de colicvație, cu membrană piogenă la periferie. ③ La mine sângele poate inunda ventriculii (hematom intraventricular); la abces complicația cea mai severă e hernierea tonsilelor cerebeloase. Alternative: Leptomeningită purulentă · Tromb călăreț."
   }
  ]
 },
 "12": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga borcanul 004, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 12 · Rinichi de șoc",
  "title": "Corticală palidă, medulară hiperemică: limită netă",
  "hud": [
   "piesa 12 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p12",
    "W": 954,
    "H": 952,
    "marks": [
     {
      "x": 222,
      "y": 700,
      "rx": 32,
      "ry": 72,
      "lab": "corticala renală palidă · 1",
      "lx": 200,
      "ly": 880
     },
     {
      "x": 312,
      "y": 680,
      "rx": 55,
      "ry": 70,
      "lab": "medulara renală hiperemică · 2",
      "ly": 590
     },
     {
      "x": 380,
      "y": 472,
      "rx": 70,
      "ry": 55,
      "lab": "pelvis renal · 3"
     },
     {
      "x": 722,
      "y": 702,
      "rx": 14,
      "ry": 70,
      "lab": "limita netă corticală / medulară",
      "rot": 0.68,
      "dash": true
     }
    ]
   },
   "sub": {
    "img": "d12",
    "W": 800,
    "H": 1112,
    "marks": [],
    "cap": "borcanul 004"
   },
   "dd": {
    "img": "p8",
    "cap": "DD · piesa 8"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Rinichi!! (secționat) → !!Rinichi de șoc!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Șocul = !!dezechilibru major între necesarul de oxigen și aportul insuficient într-un anumit organ!!."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● **corticala renală palidă** ● **medulara renală hiperemică** ● corticala palidă **bine delimitată** de medulara hiperemică ● microscopic: **necroză tubulară renală reversibilă**, cu glomeruli neafectați."
   },
   {
    "tm": "4 · Cauze",
    "at": "5 p",
    "tx": "● șoc **hipovolemic** (hemoragii masive) ● **cardiogen** (scade funcția inotropă) ● **neurogen** (dilatarea difuză a patului vascular) ● **anafilactic** ● **septic** (vasodilatație la infecție); mecanism: redistribuția sângelui din corticală spre medulară."
   },
   {
    "tm": "5 · Complicații",
    "at": "",
    "tx": "LP nu dă complicații pentru rinichiul de șoc. Poți spune evoluția: **stare reversibilă**, funcția de filtrare se suplinește temporar prin **hemodializă**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Infarct renal** (piesa 8). = Ambele: rinichi cu zone palide, în contrast cu zone congestionate. ≠ ① La mine toată corticala e palidă; la infarct o singură zonă palidă, bine conturată. ② La mine roșul e în medulara hiperemică, bine delimitată de corticală; la infarct roșul e lizereul congestiv din jurul zonei. ③ La mine leziunea e reversibilă (necroză tubulară, glomeruli neafectați); la infarct e necroza unei porțiuni de parenchim, prin obstrucția ramurii arteriale. Alternative: Litiază renală · Steatoză hepatică."
   }
  ]
 },
 "13": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 13 · Hipercheratoză",
  "title": "Un strat cornos îngroșat, fără nuclei, peste un epiderm fără alte modificări",
  "hud": [
   "lama 13 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p13",
    "W": 1266,
    "H": 601,
    "marks": [
     {
      "x": 500,
      "y": 160,
      "rx": 260,
      "ry": 90,
      "lab": "strat cornos îngroșat"
     },
     {
      "x": 600,
      "y": 400,
      "rx": 130,
      "ry": 55,
      "lab": "epidermul (straturile vii)"
     },
     {
      "x": 800,
      "y": 540,
      "rx": 200,
      "ry": 45,
      "lab": "dermul"
     }
    ]
   },
   "sub": {
    "img": "q13",
    "W": 682,
    "H": 618,
    "marks": [],
    "cap": "la ochiul liber"
   },
   "dd": {
    "img": "p18",
    "cap": "DD · lama 18"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Piele!!, colorația **HE** → !!Hipercheratoză!! (clavus)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Proces patologic al pielii: !!îngroșarea ei ca urmare a unei acțiuni mecanice prelungite!! asupra țesutului cutanat."
   },
   {
    "tm": "3 · Descriere",
    "at": "5 p",
    "tx": "● epiderm cu **strat cornos îngroșat**: creșterea cantității de cheratină, superficial ● strat cornos **fără nuclei** ● restul straturilor **fără modificări** (pe una din imagini: acantoză moderată); **fără proliferare epitelială** ● **derm și hipoderm normale** ● macro: **leziune albă, relativ bine delimitată, sub formă de placă**."
   },
   {
    "tm": "4 · Cauze",
    "at": "1 p",
    "tx": "● **acțiunea mecanică prelungită** asupra pielii (frecare, presiune)."
   },
   {
    "tm": "5 · Complicații",
    "at": "",
    "tx": "LP nu dă complicații pentru hipercheratoză."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Granulom de corp străin** (lama 18). = Ambele: leziune bine delimitată (placa de hipercheratoză, respectiv formațiunea nodulară a granulomului). ≠ ① La mine leziunea e la suprafața pielii: strat cornos îngroșat; la corp străin formațiunea e în țesutul mamar. ② La mine materialul acumulat e cheratină, fără nuclei; la corp străin cristale de colesterol (spații aciculare optic goale). ③ La mine fără celule gigante, dermul normal; la corp străin celule gigante multinucleate de corp străin și infiltrat inflamator cronic, delimitate de fibroză. Alternative: Pericardită fibrinoasă · Tromb mixt."
   }
  ]
 },
 "14": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 14 · Steatoză hepatică",
  "title": "Vacuole clare peste tot și nucleul împins la margine",
  "hud": [
   "lama 14 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p14",
    "W": 1536,
    "H": 730,
    "marks": [
     {
      "x": 1000,
      "y": 350,
      "rx": 200,
      "ry": 150,
      "lab": "hepatocite cu vacuole optic goale"
     },
     {
      "x": 370,
      "y": 250,
      "rx": 320,
      "ry": 170,
      "lab": "vase sanguine mari"
     }
    ]
   },
   "sub": {
    "img": "q14",
    "W": 577,
    "H": 716,
    "marks": [],
    "cap": "la ochiul liber"
   },
   "dd": {
    "img": "p16",
    "cap": "DD · lama 16"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Ficat!!, colorația **HE** → !!Distrofie adipoasă hepatică (steatoză hepatică)!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Acumularea de !!grăsimi simple în citoplasma celulelor care în condiții fiziologice nu conțin grăsimi vizibile!!."
   },
   {
    "tm": "3 · Descriere",
    "at": "5 p",
    "tx": "● **structura lobulară păstrată** (spații porte, vene centrolobulare) ● hepatocite cu **vacuole optic goale**, rotunde, bine conturate, net delimitate, de mărimi diferite ● microvacuolele **confluează în macrovacuole** ● vacuolele voluminoase **împing nucleul la periferie** ● vacuolele sunt goale: lipidele s-au pierdut la procesare (se evidențiază cu **Sudan III**)."
   },
   {
    "tm": "4 · Cauze",
    "at": "5 p",
    "tx": "● **consumul cronic de alcool** (cea mai frecventă) ● **intoxicații**: ciuperci, droguri, anumite anestezice ● **șoc, hipoxie prelungită** ● **aport crescut de grăsimi** ● **deficite enzimatice**."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● patologie **reversibilă** la încetarea factorului ● dacă persistă: **steatohepatită** ● **ciroză** ● **carcinom hepatocelular**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Abcese hepatice** (lama 16). = Ambele: ficat în HE, cu structura lobulară păstrată. ≠ ① La mine vacuole optic goale în hepatocite, nucleul împins la periferie; la abcese teritorii în care lipsește țesutul hepatic, pline de granulocite. ② La mine leziunea cuprinde hepatocitele, difuz sau pe zone ale lobulului; la abcese zone mici, rotunde sau neregulate, delimitate de proliferare de țesut conjunctiv. ③ La mine nu există puroi; la abcese globule de puroi, colonii de microbi (grămezi intens bazofile) și hepatocite pe cale de necroză. Alternative: Edem pulmonar acut · Pericardită fibrinoasă (țesutul adipos epicardic)."
   }
  ]
 },
 "15": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 15 · Pericardită fibrinoasă",
  "title": "O rețea roz de fibrină pe seroasa ulcerată a inimii",
  "hud": [
   "lama 15 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p15",
    "W": 1469,
    "H": 664,
    "marks": [
     {
      "x": 250,
      "y": 300,
      "rx": 220,
      "ry": 200,
      "lab": "depozit de fibrină (rețea roșu-roz)"
     },
     {
      "x": 780,
      "y": 250,
      "rx": 130,
      "ry": 160,
      "lab": "epicard: țesut adipos și vase"
     },
     {
      "x": 1200,
      "y": 350,
      "rx": 150,
      "ry": 180,
      "lab": "miocard"
     }
    ]
   },
   "sub": {
    "img": "q15",
    "W": 590,
    "H": 668,
    "marks": [],
    "cap": "la ochiul liber"
   },
   "dd": {
    "img": "p5",
    "cap": "DD · lama 5"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Cord (pericard visceral / epicard)!!, colorația **HE** → !!Pericardită fibrinoasă!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Inflamație a pericardului cu apariția unui !!exsudat fibrinos pe suprafață!!; cea mai frecventă formă de tip non-infecțios."
   },
   {
    "tm": "3 · Descriere",
    "at": "5 p",
    "tx": "● **structura miocardului păstrată** ● țesut subepicardic **îngroșat**, cu **numeroase capilare congestionate** ● celule conjunctive și **infiltrat inflamator**: granulocite, limfocite, histiocite ● suprafața seroasă **ulcerată**, cu abundentă depunere de fibrină ● fibrina: **rețea de filamente grosolane, roșu-roz**, cu granulocite și histiocite în ochiuri."
   },
   {
    "tm": "4 · Cauze",
    "at": "7 p",
    "tx": "● **infecții virale** ● **IMA** (pericardita epistenocardică) ● **uremia** ● **sindromul Dressler** ● **RAA** (pancardita reumatică) ● **post-radioterapie** ● **metastaze tumorale**."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● **liza** exsudatului fibrinos ● **aderențe fibroase** ● **pericardită constrictivă/restrictivă**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Tromb mixt** (lama 5). = Ambele: fibrină eozinofilă în rețea, cu celule prinse în ochiuri. ≠ ① La mine fibrina e pe suprafața seroasă (epicard), ulcerată; la tromb masa e în lumenul unui vas arterial, aderentă de perete. ② La mine rețea de filamente grosolane cu granulocite și histiocite; la tromb straturi alternante de trombocite + fibrină și hematii (liniile lui Zahn). ③ La mine dedesubt țesut subepicardic îngroșat, cu capilare congestionate și infiltrat, apoi miocardul; la tromb peretele vasului arterial. Alternative: Infarct miocardic acut · Hipercheratoză."
   }
  ]
 },
 "16": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 16 · Abcese hepatice",
  "title": "Teritorii fără țesut hepatic, pline de granulocite",
  "hud": [
   "lama 16 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p16",
    "W": 1341,
    "H": 606,
    "marks": [
     {
      "x": 500,
      "y": 285,
      "rx": 170,
      "ry": 150,
      "lab": "abces: teritoriu plin de granulocite"
     },
     {
      "x": 1050,
      "y": 470,
      "rx": 180,
      "ry": 80,
      "lab": "parenchimul hepatic din jur"
     },
     {
      "x": 245,
      "y": 430,
      "rx": 60,
      "ry": 80,
      "lab": "infiltrat inflamator"
     }
    ]
   },
   "sub": {
    "img": "q16",
    "W": 534,
    "H": 624,
    "marks": [],
    "cap": "la ochiul liber"
   },
   "dd": {
    "img": "p17",
    "cap": "DD · lama 17"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Ficat!!, colorația **HE** → !!Abcese hepatice!!: inflamație purulentă."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Abcesul = !!cavitate cu conținut de puroi!!; inflamația purulentă = exsudare dominată de leucodiapedeză."
   },
   {
    "tm": "3 · Descriere",
    "at": "5 p",
    "tx": "● macro: în grosimea ficatului **cavități mici, cu conținut vâscos, galben-verzui** ● **structura lobulară păstrată** ● teritorii mici, rotunde sau neregulate, unde **lipsește țesutul hepatic**, cu **număr mare de granulocite** ● **grămezi intens bazofile** (colonii de microbi), **globule de puroi**, hepatocite pe cale de necroză ● delimitate de parenchim cu **proliferare de țesut conjunctiv** (abcesul cronic: membrană piogenă)."
   },
   {
    "tm": "4 · Cauze",
    "at": "2 p",
    "tx": "● **bacteriile** (pe lamă: colonii de microbi; puroiul conține bacterii) ● **inflamația purulentă**: exsudare dominată de **leucodiapedeză** → puroi (granulocite, globule de puroi, ser, fibrină, detritus, hematii, enzime, bacterii)."
   },
   {
    "tm": "5 · Complicații",
    "at": "",
    "tx": "LP nu dă complicații pentru abcesele hepatice. Abcesul recent: limite imprecise; abcesul cronic: bine delimitat, cu membrană piogenă."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Limfadenită tuberculoasă** (lama 17). = Ambele: leziuni focale cu necroză în centru, delimitate de țesutul din jur. ≠ ① La mine în centru granulocite, globule de puroi, colonii de microbi; la TBC necroză cazeoasă (teritoriu omogen sau fin granular, acidofil, fără structuri). ② La mine leziunea e delimitată de membrana piogenă și proliferare de țesut conjunctiv; la TBC strat gros de celule epiteloide și celule gigante Langhans, apoi coroana limfocitară. ③ La mine în jur parenchim hepatic cu structura lobulară păstrată; la TBC nodul limfatic cu țesut limfoid restant, cu foliculi. Alternative: Distrofie adipoasă hepatică (steatoză) · Infarct renal."
   }
  ]
 },
 "17": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 17 · Limfadenită TBC",
  "title": "Cazeum în centru, epitelioide și Langhans în jur",
  "hud": [
   "lama 17 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p17",
    "W": 1214,
    "H": 549,
    "marks": [
     {
      "x": 460,
      "y": 320,
      "rx": 140,
      "ry": 110,
      "lab": "necroză cazeoasă (centru)"
     },
     {
      "x": 645,
      "y": 190,
      "rx": 70,
      "ry": 90,
      "lab": "celule epitelioide"
     },
     {
      "x": 130,
      "y": 280,
      "rx": 90,
      "ry": 120,
      "lab": "limfocite (periferie)"
     }
    ]
   },
   "sub": {
    "img": "q17",
    "W": 620,
    "H": 570,
    "marks": [],
    "cap": "la ochiul liber"
   },
   "dd": {
    "img": "p18",
    "cap": "DD · lama 18"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Nodul limfatic (ganglion)!!, colorația **HE** → !!Limfadenită tuberculoasă!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Inflamația specifică produsă de **Mycobacterium tuberculosis** (bacilul Koch), cu formarea de !!granuloame specifice: tuberculi, foliculi tuberculoși!!."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● macro: pe secțiune **focare alb-gălbui** ● structura **parțial înlocuită de granuloame** izolate sau confluente ● în centru: **necroză cazeoasă** (omogenă sau fin granulară, acidofilă, fără structuri) ● **strat gros de celule epiteloide** ● **celule gigante Langhans** (50–150 microni, ~100 nuclei la periferie, coroană sau potcoavă) ● la periferie: **coroana limfocitară**; țesut limfoid restant, cu foliculi."
   },
   {
    "tm": "4 · Cauze",
    "at": "2 p",
    "tx": "● **Mycobacterium tuberculosis** (bacilul Koch) ● BK transformă histiocitele în epiteloide, **inhibă migrarea granulocitelor și proliferarea capilarelor**."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **vindecare** clinică: fibroză + calcificare (BK în microbioză latentă) ● **propagare directă**: ftizie primară ● **propagare hematogenă**: TBC miliară, septicemie Landouzy ● **propagare limfogenă**: limfadenită (scrofuloză, ganglionii cervicali)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Granulom de corp străin** (lama 18). = Ambele: inflamație cu granuloame și celule gigante multinucleate. ≠ ① La mine în centru necroză cazeoasă; la corp străin cristale de colesterol (spații aciculare optic goale). ② La mine celula Langhans: nuclei la periferie, în coroană sau potcoavă; la corp străin nuclei răspândiți fără nicio ordine în citoplasma abundentă, eozinofilă. ③ La mine granuloamele sunt într-un nodul limfatic, cu țesut limfoid restant; la corp străin în țesutul mamar, delimitate de fibroză. Alternative: Abcese hepatice · Infarct renal."
   }
  ]
 },
 "18": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga celule gigante, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 18 · Granulom de corp străin",
  "title": "Celule gigante în jurul unui material pe care nu-l pot fagocita",
  "hud": [
   "lama 18 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p18",
    "W": 1007,
    "H": 479,
    "marks": [
     {
      "x": 600,
      "y": 250,
      "rx": 120,
      "ry": 60,
      "lab": "cristale de colesterol (fante goale)"
     },
     {
      "x": 735,
      "y": 355,
      "rx": 40,
      "ry": 40,
      "lab": "celule gigante de corp străin"
     },
     {
      "x": 150,
      "y": 110,
      "rx": 140,
      "ry": 80,
      "lab": "țesut fibros"
     }
    ]
   },
   "sub": {
    "img": "q18",
    "W": 180,
    "H": 120,
    "marks": [],
    "cap": "celule gigante"
   },
   "dd": {
    "img": "p17",
    "cap": "DD · lama 17"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Glandă mamară (țesut mamar)!!, colorația **HE** → !!Granulom de corp străin!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Reacție inflamatorie cronică cauzată de pătrunderea în organism a unor corpi străini!!, substanțe organice sau anorganice, care nu pot fi fagocitate de macrofage."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● **formațiune nodulară bine delimitată** de un proces de fibroză ● **cristale de colesterol**: spații aciculare optic goale ● **celule gigante multinucleate de corp străin** (50–100 microni), din fuziunea macrofagelor ● nuclei numeroși, **răspândiți fără nicio ordine** în citoplasma abundentă, eozinofilă ● **infiltrat inflamator cronic**, macrofage, capilare de neoformație, țesut de granulație ● în jur: **țesut mamar normal**."
   },
   {
    "tm": "4 · Cauze",
    "at": "2 p",
    "tx": "● **corpi străini**, substanțe organice sau anorganice ● pe care **macrofagele nu le pot fagocita** (aici: cristale de colesterol)."
   },
   {
    "tm": "5 · Complicații",
    "at": "",
    "tx": "LP nu dă complicații pentru granulomul de corp străin."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Limfadenită tuberculoasă** (lama 17). = Ambele: inflamație cu granuloame și celule gigante multinucleate. ≠ ① La mine în centru cristale de colesterol (spații aciculare optic goale); la TBC necroză cazeoasă. ② La mine nuclei răspândiți fără nicio ordine în citoplasma abundentă, eozinofilă; la TBC celula Langhans, nuclei la periferie, în coroană sau potcoavă. ③ La mine formațiunea e în țesutul mamar, delimitată de fibroză; la TBC granuloame într-un nodul limfatic, cu țesut limfoid restant. Alternative: Abcese hepatice · Hipercheratoză."
   }
  ]
 },
 "19": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga marginea rotunjită, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 19 · Steatoză hepatică",
  "title": "Ficat mărit, gălbui, cu marginea rotunjită și capsula tensă",
  "hud": [
   "piesa 19 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p19",
    "W": 620,
    "H": 1000,
    "marks": [
     {
      "x": 380,
      "y": 400,
      "rx": 110,
      "ry": 100,
      "lab": "parenchimul hepatic"
     },
     {
      "x": 520,
      "y": 670,
      "rx": 50,
      "ry": 110,
      "lab": "marginea rotunjită",
      "rot": -0.4
     }
    ]
   },
   "sub": {
    "img": "d19",
    "W": 364,
    "H": 242,
    "marks": [],
    "cap": "marginea rotunjită"
   },
   "dd": {
    "img": "p20",
    "cap": "DD · piesa 20"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Ficat!! → !!Steatoză hepatică!! (ficat gras, distrofie adipoasă hepatică)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Acumularea de !!grăsimi simple în citoplasma celulelor!! care în condiții fiziologice nu conțin grăsimi vizibile."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● ficat **mărit de volum și greutate** ● suprafața **netedă, lucioasă**, capsula **tensă** ● marginea anterioară **rotunjită** ● parenchim **friabil**, de culoare **gălbuie** ● pe suprafața de secțiune parenchimul **prolabează peste capsulă** ● după secțiune, lama cuțitului are **aspect grăsos**."
   },
   {
    "tm": "4 · Cauze",
    "at": "5 p",
    "tx": "● **consumul cronic de alcool** (cauza cea mai frecventă) ● **intoxicații**: ciuperci, droguri, anumite anestezice ● **stări de șoc, hipoxie prelungită** ● **aport crescut de grăsimi** ● **deficite enzimatice**."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● patologie **reversibilă** la încetarea factorului declanșator ● dacă factorul persistă: **steatohepatită** ● **ciroză** ● **carcinom hepatocelular**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Pancreatită acută** (piesa 20). = Ambele: organ abdominal cu leziune legată de grăsime, cu zone gălbui (steatoză = grăsimi în hepatocite; steatonecroză = necroza țesutului gras). ≠ ① La mine tot ficatul e mărit, gălbui, uniform; la pancreatită țesut cu structură inomogenă, cu focare multiple (2–6 mm) gălbui-albicioase de steatonecroză. ② La mine suprafața e netedă, lucioasă, capsula tensă, fără hemoragii; la pancreatită zone extinse de hemoragie, negricioase după fixare. ③ La mine după secțiune lama cuțitului are aspect grăsos, parenchimul prolabează peste capsulă; la pancreatită focarele se extind și în țesutul adipos peripancreatic. Alternative: Rinichi de șoc · Infarct renal."
   }
  ]
 },
 "20": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga hemoragie (bulina 2), jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 20 · Pancreatită acută",
  "title": "Pancreas inomogen: focare gălbui de steatonecroză, zone negricioase de hemoragie",
  "hud": [
   "piesa 20 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p20",
    "W": 740,
    "H": 710,
    "marks": [
     {
      "x": 500,
      "y": 420,
      "rx": 110,
      "ry": 120,
      "lab": "focare gălbui-albicioase de steatonecroză"
     },
     {
      "x": 480,
      "y": 190,
      "rx": 100,
      "ry": 35,
      "lab": "țesut adipos peripancreatic"
     }
    ]
   },
   "sub": {
    "img": "q20",
    "W": 556,
    "H": 915,
    "marks": [
     {
      "x": 295,
      "y": 560,
      "rx": 170,
      "ry": 140
     },
     {
      "x": 405,
      "y": 300,
      "rx": 70,
      "ry": 110
     }
    ],
    "cap": "hemoragie (bulina 2)"
   },
   "dd": {
    "img": "p19",
    "cap": "DD · piesa 19"
   },
   "bad": [
    [
     "m"
    ],
    null,
    [
     "s",
     0
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Pancreas!! (secțiune longitudinală) → !!Pancreatită acută!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Afecțiune !!inflamatorie reversibilă!!: edem local, steatonecroză → necroză parenchimatoasă hemoragică."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● țesut pancreatic cu **structură inomogenă** ● **focare multiple de steatonecroză** (2–6 mm), **gălbui-albicioase** ● focarele se extind și în **țesutul adipos peripancreatic** ● **zone extinse de hemoragie**, cu aspect negricios după fixarea în formol."
   },
   {
    "tm": "4 · Cauze",
    "at": "6 p",
    "tx": "● **metabolice**: consumul cronic de alcool (cel mai frecvent), hiperlipoproteinemie, hipercalcemie, hipertrigliceridemie, medicamente (azatioprina, diuretice tiazidice, anticonvulsivante) ● **genetice**: mutații ale genelor care codifică inhibitori ai tripsinei/tripsinogenului ● **mecanice**: obstrucții biliare (calculi migrați, sd. Bouveret), traumatisme, leziuni iatrogene ● **vasculare**: șoc, poliarteritis nodosa ● **infecțioase**: virusul urlian, Coxsackie ● **altele**: neoplasme periampulare, pancreas divisum."
   },
   {
    "tm": "5 · Complicații",
    "at": "6 p",
    "tx": "● **colaps vascular, hTA, șoc** ● **CID** (activarea cascadei coagulării) ● **sindrom de detresă respiratorie acută** ● **necroză tubulară acută → insuficiență renală** ● **silentium intestinal**: semn de gravitate (ileus, șoc septic, abdomen acut) ● **hipocalcemie** (calciul sechestrat în citosteatonecroză)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Steatoză hepatică** (piesa 19). = Ambele: organ abdominal cu leziune legată de grăsime, cu zone gălbui (steatonecroză = necroza țesutului gras; steatoză = grăsimi în hepatocite). ≠ ① La mine focare multiple, mici (2–6 mm), gălbui-albicioase de steatonecroză pe un țesut inomogen; la steatoză ficatul e gălbui uniform. ② La mine zone extinse de hemoragie, negricioase după fixare; la steatoză suprafața e netedă, lucioasă, fără hemoragii. ③ La mine focarele se extind și în țesutul adipos peripancreatic; la steatoză grăsimea e în citoplasma hepatocitelor, lama cuțitului are aspect grăsos. Alternative: Infarct pulmonar · Litiază biliară."
   }
  ]
 },
 "21": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: calculi, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 21 · Litiază renală",
  "title": "Calculi coraliformi, calice dilatate, parenchim atrofic: hidronefroză",
  "hud": [
   "piesa 21 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p21",
    "W": 830,
    "H": 700,
    "marks": [
     {
      "x": 490,
      "y": 520,
      "rx": 70,
      "ry": 55,
      "lab": "calculi în calice"
     },
     {
      "x": 320,
      "y": 170,
      "rx": 60,
      "ry": 55,
      "lab": "calice dilatate (hidronefroză)"
     },
     {
      "x": 70,
      "y": 360,
      "rx": 30,
      "ry": 80,
      "lab": "parenchim renal subțiat"
     }
    ]
   },
   "sub": {
    "img": "d21",
    "W": 181,
    "H": 121,
    "marks": [],
    "cap": "detaliu: calculi"
   },
   "dd": {
    "img": "p22",
    "cap": "DD · piesa 22"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Rinichi!! (secționat) → !!Litiază renală cu hidronefroză!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Formarea de calculi !!la nivelul calicelor renale sau al bazinetului!!."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● rinichi secționat, cu țesut adipos perirenal ● **calculi renali coraliformi**: ocupă și preiau forma sistemului pielo-caliceal ● **calice dilatate** ● **parenchim renal atrofic** (subțiat): hidronefroză."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **creșterea concentrației substanțelor dizolvate** (hipercalcemie) ● **modificările pH-ului urinar** ● **infecțiile bacteriene** ● **predispoziția familială**."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● calculii mici migrează în ureter: **colică renală** (durere paroxistică în flanc, iradiere inghinală, hematurie macroscopică) ● obstrucție totală → presiune retrogradă → **hidronefroză / uretero-hidronefroză** ● hidronefroza trenantă → **insuficiență renală** prin subțierea corticalei ● calculii = **factor iritativ local**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Litiază biliară** (piesa 22). = Ambele: calculi formați în cavitățile unui organ (litiază), care pot migra și pot produce obstrucție. ≠ ① La mine calculii sunt în calice și bazinet; la litiaza biliară sunt în colecist. ② La mine calculi coraliformi, care preiau forma sistemului pielo-caliceal; la litiaza biliară calculi colesterolici galbeni sau pigmentari multipli, mici, fațetați. ③ La mine calice dilatate și parenchim renal atrofic: hidronefroză; la litiaza biliară calculul migrat în cistic dă stază biliară, empiem. Alternative: Rinichi de șoc · Infarct renal."
   }
  ]
 },
 "22": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga borcanul 019, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 22 · Litiază biliară",
  "title": "Colecistul deschis, cu calculi: colesterolici și pigmentari",
  "hud": [
   "piesa 22 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p22",
    "W": 578,
    "H": 1007,
    "marks": [
     {
      "x": 330,
      "y": 450,
      "rx": 150,
      "ry": 230,
      "lab": "colecistul deschis · 1"
     },
     {
      "x": 380,
      "y": 900,
      "rx": 160,
      "ry": 70,
      "lab": "calculi · 2"
     }
    ]
   },
   "sub": {
    "img": "d22",
    "W": 490,
    "H": 620,
    "marks": [],
    "cap": "borcanul 019"
   },
   "dd": {
    "img": "p21",
    "cap": "DD · piesa 21"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Colecist!! (vezicula biliară), deschis → !!Litiază biliară!! (colecistolitiază)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Formarea de !!calculi în vezicula biliară!!, colesterolici sau pigmentari: colesterolul cristalizează când capacitatea de solubilizare a bilei e depășită."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● colecist deschis, cu **calculi** în lumen ● calculi **colesterolici**: galbeni, friabili, cu centrul mai negricios ● calculi **pigmentari**: multipli, mai mici, până la câteva zeci, **fațetați** ● cu săruri de calciu depuse: **albicioși, cretoși, ca zarurile**."
   },
   {
    "tm": "4 · Cauze",
    "at": "11 p",
    "tx": "● **hipomotilitatea** veziculei ● **hipersecreția de mucus** ● **dieta bogată în grăsimi** ● **sexul feminin** ● **originea etnică/geografică** ● **factori familiali** (deficiențe hormonale moștenite) ● **factori de mediu** ● **obezitatea** ● **medicamente** (clofibrat) ● **sarcina** ● **scăderea rapidă în greutate**."
   },
   {
    "tm": "5 · Complicații",
    "at": "6 p",
    "tx": "● calcul migrat în **ductul cistic**: stază biliară, infectare (**empiem**) ● **perforație, fistule** ● calcul migrat în **ampula Vater**: sd. Bouveret ● **colecistită acută** ● **colangită** ● iritația cronică a mucoasei → **risc de transformare malignă**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Litiază renală** (piesa 21). = Ambele: calculi formați în cavitățile unui organ (litiază), care pot migra și pot produce obstrucție. ≠ ① La mine calculii sunt în colecist; la litiaza renală sunt în calice și bazinet. ② La mine calculi pigmentari multipli, fațetați sau colesterolici galbeni, friabili (cu săruri de calciu: albicioși, ca zarurile); la litiaza renală calculi coraliformi. ③ La mine calculul migrat în cistic dă stază biliară, empiem, perforație, fistule; la litiaza renală obstrucția dă hidronefroză. Alternative: Pancreatită acută · Steatoză hepatică."
   }
  ]
 },
 "23": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: fibrina, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 23 · Pericardită fibrinoasă",
  "title": "Pericardul mat, cu depozite de fibrină: „limbă de pisică”",
  "hud": [
   "piesa 23 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p23",
    "W": 820,
    "H": 880,
    "marks": [
     {
      "x": 180,
      "y": 520,
      "rx": 90,
      "ry": 160,
      "lab": "depozite neregulate de fibrină"
     },
     {
      "x": 640,
      "y": 140,
      "rx": 90,
      "ry": 90,
      "lab": "vasele mari de la bază"
     },
     {
      "x": 460,
      "y": 620,
      "rx": 80,
      "ry": 80,
      "lab": "suprafață mată, rugoasă"
     }
    ]
   },
   "sub": {
    "img": "d23",
    "W": 528,
    "H": 352,
    "marks": [],
    "cap": "detaliu: fibrina"
   },
   "dd": {
    "img": "p10",
    "cap": "DD · piesa 10"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Cord!! (pericard) → !!Pericardită fibrinoasă!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Inflamație a pericardului cu apariția unui !!exsudat fibrinos pe suprafață!!; cea mai frecventă formă de tip non-infecțios."
   },
   {
    "tm": "3 · Descriere",
    "at": "5 p",
    "tx": "● pericard cu **luciu, umiditate și transparență pierdute**, aspect uscat ● suprafață **mată, rugoasă** ● **depozite albicioase-cenușii**, neregulate, formate din **fibrină** (falsă membrană) ● aspect **vilos, păros**: „**limbă de pisică**” sau „pâine unsă cu unt” ● la bază, **vasele mari**."
   },
   {
    "tm": "4 · Cauze",
    "at": "7 p",
    "tx": "● **infecții virale** ● **IMA** (pericardita epistenocardică) ● **uremia** (pericardită, pleurită) ● **sindromul Dressler** (după IMA) ● **RAA** (pancardita reumatică) ● **post-radioterapie** ● **metastaze tumorale**."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● **liza** exsudatului fibrinos ● **aderențe fibroase** ● **pericardită constrictivă/restrictivă**. Clinic: frecătură pericardică, modificări ECG."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Infarct miocardic acut** (piesa 10). = Ambele: cord cu leziune vizibilă macroscopic; IMA e și o cauză a pericarditei (pericardita epistenocardică, sindromul Dressler). ≠ ① La mine leziunea e pe suprafața pericardului, difuză; la IMA zona e în peretele ventriculului stâng, văzută pe secțiune. ② La mine depozite albicioase-cenușii de fibrină, suprafață mată, rugoasă („limbă de pisică”); la IMA zonă mai palidă, cu halou hiperemic (12–24 h). ③ La mine pericardul și-a pierdut luciul, umiditatea și transparența; la IMA modificarea e în miocard (după 2–3 zile galben ca lutul, moale). Alternative: Aortă cu tromb parietal · Leptomeningită purulentă."
   }
  ]
 },
 "24": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: cavitatea, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 24 · Abces cerebral",
  "title": "O cavitate rotund-ovalară cu puroi, în parenchimul cerebral",
  "hud": [
   "piesa 24 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p24",
    "W": 760,
    "H": 540,
    "marks": [
     {
      "x": 190,
      "y": 170,
      "rx": 100,
      "ry": 95,
      "lab": "cavitatea abcesului"
     },
     {
      "x": 190,
      "y": 170,
      "rx": 150,
      "ry": 135,
      "lab": "peretele cavității",
      "dash": true
     },
     {
      "x": 560,
      "y": 200,
      "rx": 110,
      "ry": 90,
      "lab": "emisfera opusă, fără leziune"
     }
    ]
   },
   "sub": {
    "img": "d24",
    "W": 313,
    "H": 209,
    "marks": [],
    "cap": "detaliu: cavitatea"
   },
   "dd": {
    "img": "p11",
    "cap": "DD · piesa 11"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Creier!! (pe secțiune) → !!Abces cerebral!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Proces !!localizat, bine delimitat, înlocuitor de spațiu!!, în care țesutul cerebral suferă necroză de colicvație și e înlocuit cu puroi, înconjurat la periferie de o membrană piogenă."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● cavitate **intraparenchimatoasă** ● **rotund-ovalară**, bine delimitată ● **conținut purulent** ● la periferie, **membrana piogenă** (micro: exsudat granulocitar și detritusuri, delimitate printr-o membrană fibroasă)."
   },
   {
    "tm": "4 · Cauze",
    "at": "5 p",
    "tx": "● **malformații cardiace cianogene** ● **inflamații cronice supurative** ● **bronșiectazie** ● **infecții de vecinătate**: abces dentar, mastoidite, otite, sinuzite (diseminare directă) ● **endocardita bacteriană acută** (diseminare hematogenă)."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● **hipertensiune intracraniană**: redoare de ceafă, vărsături neprecedate de greață, cefalee severă ● **hernierea tonsilelor cerebeloase** în foramen magnum ● **deces prin stop respirator central** (compresia centrilor respiratori bulbari)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Hemoragii intracraniene (hematom intracerebral)** (piesa 11). = Ambele: creier pe secțiune, cu o leziune intraparenchimatoasă care ocupă spațiu. ≠ ① La mine cavitate rotund-ovalară cu conținut purulent; la hematom impregnarea hematică a parenchimului (sânge). ② La mine leziunea e delimitată de o membrană piogenă; la hematom sângele provine din ruperea unei ramuri vasculare intracerebrale. ③ La mine țesutul cerebral a suferit necroză de colicvație, înlocuit cu puroi; la hematom sângele poate inunda și ventriculii (hemoragie intraventriculară). Alternative: Leptomeningită purulentă · Bronhopneumonie."
   }
  ]
 },
 "25": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: exsudatul, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 25 · Leptomeningită purulentă",
  "title": "Puroi pe convexitate: girusuri aplatizate, șanțuri îngustate",
  "hud": [
   "piesa 25 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p25",
    "W": 650,
    "H": 680,
    "marks": [
     {
      "x": 370,
      "y": 320,
      "rx": 150,
      "ry": 150,
      "lab": "exsudat purulent pe leptomeninge"
     },
     {
      "x": 150,
      "y": 420,
      "rx": 80,
      "ry": 120,
      "lab": "girusuri aplatizate, șanțuri îngustate"
     }
    ]
   },
   "sub": {
    "img": "d25",
    "W": 495,
    "H": 330,
    "marks": [],
    "cap": "detaliu: exsudatul"
   },
   "dd": {
    "img": "p24",
    "cap": "DD · piesa 24"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Encefal!! (leptomeninge: arahnoidă + pia mater) → !!Leptomeningită purulentă!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Acumularea de puroi în spațiul meningeal!!: inflamația purulentă difuză acută (flegmonoasă) a leptomeningelui (arahnoidă + pia mater)."
   },
   {
    "tm": "3 · Descriere",
    "at": "4 p",
    "tx": "● exsudat purulent care **acoperă suprafața leptomeningelui** ● **girusuri aplatizate** ● **șanțuri îngustate**, prin edemațierea leptomeningelui pe seama puroiului ● puroi pe convexitate: „**meningită în șapcă**”."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **inflamații perifocale**: otite, sinuzite, rinite ● **bacteriemie, septicemie** ● **pneumococul**: exsudat pe convexitate („în șapcă”) ● **meningococul**: puroi la baza creierului (M. tuberculosis: unghiul pontocerebelos)."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **meningoencefalită** ● **piocefalie** (puroi în ventriculi) ● **HT intracraniană**: puncția spinală contraindicată ● **fibroza meningelui** (rară) → pahimeningită."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Abces cerebral** (piesa 24). = Ambele: inflamație purulentă în cutia craniană, cu semne de hipertensiune intracraniană (redoare de ceafă, vărsături). ≠ ① La mine puroiul e în spațiul meningeal, pe suprafața creierului; la abces e în parenchim. ② La mine inflamația e difuză (flegmonoasă): girusuri aplatizate, șanțuri îngustate, „meningită în șapcă”; la abces proces localizat, bine delimitat. ③ La mine nu există membrană piogenă; la abces cavitate rotund-ovalară înconjurată de membrană piogenă. Alternative: Hemoragii intracraniene (hematom intracerebral) · Pericardită fibrinoasă."
   }
  ]
 },
 "26": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: condensare, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 26 · Bronhopneumonie",
  "title": "Focare de condensare roșu închis, multiple, bilaterale",
  "hud": [
   "piesa 26 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p26",
    "W": 542,
    "H": 877,
    "marks": [
     {
      "x": 330,
      "y": 240,
      "rx": 60,
      "ry": 50,
      "lab": "zonă de condensare pulmonară · 1"
     },
     {
      "x": 310,
      "y": 530,
      "rx": 70,
      "ry": 55,
      "lab": "parenchim pulmonar aerat · 2"
     },
     {
      "x": 65,
      "y": 455,
      "rx": 30,
      "ry": 35,
      "lab": "bronhie"
     }
    ]
   },
   "sub": {
    "img": "d26",
    "W": 180,
    "H": 120,
    "marks": [],
    "cap": "detaliu: condensare"
   },
   "dd": {
    "img": "p9",
    "cap": "DD · piesa 9"
   },
   "bad": [
    [
     "m",
     0
    ],
    null,
    [
     "s"
    ],
    null,
    null,
    [
     "d"
    ]
   ],
   "descRows": [
    2
   ],
   "phase": [
    "Organ · leziune",
    "Definiție",
    "Descriere",
    "Cauze",
    "Complicații",
    "DD"
   ],
   "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Plămân!! (pe secțiune) → !!Bronhopneumonie!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Inflamație a parenchimului pulmonar de etiologie infecțioasă: !!extensia alveolară a unui proces inflamator al bronhiilor și bronhiolelor!!."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● leziune **multifocală, bilaterală** ● pe secțiune, **mai multe focare de condensare**, de **consistență crescută** ● culoare **roșu închis**, diametre variabile ● inițial **în jurul bronhiilor și bronhiolelor**, apoi în spațiile alveolare adiacente ● focare separate de **țesut pulmonar normal aerat**, uneori cu emfizem compensator ● focarele pot **conflua**: bronhopneumonie confluentă."
   },
   {
    "tm": "4 · Cauze",
    "at": "5 p",
    "tx": "● **Streptococcus pneumoniae** (cel mai frecvent) ● pacienți **imobilizați la pat** (bronhopneumonie hipostatică) ● **tulburări de deglutiție** ● **extremele de vârstă** ● **imunodeprimați**."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● **abcese** (distrucție tisulară și necroză) ● **empiem toracic** (material purulent în cavitatea toracică) ● **diseminarea infecției**: meningită, artrită, endocardită infecțioasă."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **Infarct pulmonar** (piesa 9). = Ambele: plămân pe secțiune cu zone de consistență crescută, de culoare roșu închis. ≠ ① La mine focare multiple, bilaterale, cu diametre variabile; la infarct o zonă de infarct roșu (hemoragic), bine delimitată. ② La mine focarele sunt în jurul bronhiilor și bronhiolelor, apoi în alveolele adiacente; la infarct zona corespunde ramurii obstruate a arterei pulmonare (TEP). ③ La mine focarele sunt separate de țesut pulmonar normal aerat și pot conflua; la infarct parenchimul din jur are modificări de stază cronică. Alternative: Leptomeningită purulentă · Abces cerebral."
   }
  ]
 }
};
