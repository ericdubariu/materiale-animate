// Fișele OSPE pe preparat (generate din deck-urile de pe site: anatopat-z1…z4). Roșu (!!…!!) = organ, leziune, definiție, diferența DD.
export const PREPS = {
 "1": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga ob. mare, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 1 · Edem pulmonar acut",
  "title": "Alveolele sunt pline cu lichid roz, nu cu aer",
  "hud": [
   "lama 1 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p1",
    "W": 1200,
    "H": 794,
    "marks": [
     {
      "x": 380,
      "y": 520,
      "rx": 110,
      "ry": 80,
      "lab": "alveolă plină cu transsudat",
      "ly": 625
     },
     {
      "x": 160,
      "y": 345,
      "rx": 70,
      "ry": 40,
      "rot": -0.3,
      "lab": "sept alveolar subțire",
      "ly": 420
     }
    ]
   },
   "sub": {
    "img": "q1",
    "W": 1200,
    "H": 1019,
    "marks": [
     {
      "x": 800,
      "y": 330,
      "rx": 90,
      "ry": 80
     },
     {
      "x": 400,
      "y": 705,
      "rx": 50,
      "ry": 55
     }
    ],
    "cap": "ob. mare"
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
   "cred": "Poze (Wikimedia Commons): Yale Rosen · CC BY-SA 2.0; Amadalvarez · CC BY-SA 4.0; Dept. of Pathology, Calicut Medical College · CC BY-SA 4.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Plămân!!, colorația **HE** → !!Edem pulmonar acut!!, cu **congestie pulmonară acută**."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Acumularea de lichid (!!transsudat sărac în proteine!!) în **interstițiul pulmonar și apoi în alveole**, prin **creșterea presiunii hidrostatice** din capilarele pulmonare."
   },
   {
    "tm": "3 · Descriere",
    "at": "5 p",
    "tx": "● ob. mic: **arhitectura păstrată**, septuri subțiri, **fără fibroză** ● ob. mic: alveole pline cu **material eozinofil palid, omogen** ● ob. mare: lichid **acelular**, cu **bule de aer** rotunde (spumă) ● ob. mare: **capilare septale dilatate, pline cu hematii** (congestie acută) ● **fără neutrofile, fibrină sau siderofage** în alveole."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **insuficiența ventriculului stâng** (cea mai frecventă) ● **șocul** ● **gazele toxice** inhalate ● **leziunile SNC** (edem neurogen) și **hiperhidratarea iatrogenă**. (Manual: șocul și gazele dau edem lezional, prin permeabilitate crescută.)"
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● **insuficiență respiratorie acută**, deces prin afectarea ventilației ● **suprainfecție**: lichidul e mediu bun pentru bacterii → **bronhopneumonie** ● dacă staza persistă: **plămân de stază cronică** (indurație brună)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **stază + infarct pulmonar** (lama 2). = plămân în HE, cu capilare septale dilatate, pline cu hematii (congestie). ≠ ① La mine alveolele sunt pline cu !!lichid roz-pal!!, omogen, cu bule de aer; la stază, în afara infarctului, alveolele conțin aer. ② La mine lichidul e **acelular**, fără siderofage; la stază, în alveole, siderofage cu granule brun-aurii de hemosiderină. ③ La mine septuri subțiri, **fără fibroză**; la stază septuri îngroșate, fibroase (colagen roz). Alternative: Infarctul pulmonar (aria subpleurală din lama 2) · Pericardită fibrinoasă · Pneumonia acută (bronhopneumonia, LP 3–4)."
   }
  ]
 },
 "2": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga infarctul subpleural, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 2 · Plămân de stază cronică + infarct pulmonar hemoragic",
  "title": "Septuri groase și celule brune în alveole",
  "hud": [
   "lama 2 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p2",
    "W": 1200,
    "H": 966,
    "marks": [
     {
      "x": 540,
      "y": 620,
      "rx": 65,
      "ry": 42,
      "lab": "siderofage",
      "ly": 690
     },
     {
      "x": 665,
      "y": 205,
      "rx": 45,
      "ry": 65,
      "rot": -0.5,
      "lab": "capilar dilatat cu hematii",
      "ly": 300
     },
     {
      "x": 744,
      "y": 444,
      "rx": 58,
      "ry": 50,
      "lab": "sept îngroșat, fibros",
      "lx": 820,
      "ly": 520
     },
     {
      "x": 132,
      "y": 473,
      "rx": 70,
      "lab": "arteriolă cu perete gros",
      "ly": 570
     }
    ]
   },
   "sub": {
    "img": "q2",
    "W": 1200,
    "H": 858,
    "marks": [
     {
      "x": 360,
      "y": 64,
      "rx": 120,
      "ry": 28
     },
     {
      "x": 800,
      "y": 735,
      "rx": 170,
      "ry": 110
     }
    ],
    "cap": "infarctul subpleural"
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
     2
    ],
    [
     "s",
     1
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
   "cred": "Poze (Wikimedia Commons): Dept. of Pathology, Calicut Medical College · CC BY-SA 4.0; Nephron · CC BY-SA 3.0; Yale Rosen · CC BY-SA 2.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Plămân!!, colorația **HE** → !!Congestie pulmonară pasivă cronică!! (plămân de stază, indurație brună) **cu infarct pulmonar hemoragic recent**."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Stază venoasă cronică!! în plămân (**fibroză septală, siderofage**), pe care s-a produs o **arie de necroză ischemică inundată de sânge**, prin **ocluzia unei ramuri a arterei pulmonare**."
   },
   {
    "tm": "3 · Descriere · staza",
    "at": "5 p total",
    "tx": "● ob. mic: **septuri alveolare îngroșate, fibroase**, alveole mai mici ● ob. mic: **capilare septale dilatate, pline cu hematii** ● ob. mic: **arteriole cu perete îngroșat** (hipertensiune pulmonară) ● ob. mare: în alveole **macrofage cu granule brun-aurii de hemosiderină** = **siderofage** (celule cardiace), mai ales lângă septuri ● în septuri: **colagen și hematii extravazate**."
   },
   {
    "tm": "4 · Descriere · infarctul",
    "at": "",
    "tx": "● ob. mic: **arie subpleurală, bine delimitată** de plămânul aerat ● alveole **pline complet cu hematii** ● ob. mare: **septuri fără nuclei** („fantome”) = necroză de coagulare ● la margine: **congestie, edem, neutrofile**; **pleura cu fibrină** ● în arterele mici: **trombembolul**."
   },
   {
    "tm": "5 · Cauze",
    "at": "3 p",
    "tx": "● fond comun: **insuficiența cardiacă stângă** / **stenoza mitrală** ● **cardiopatia ischemică și HTA**, prin IC stângă (manual) ● **embol dintr-o TVP**, pe plămânul congestionat ● favorizanți TVP: **imobilizare, postoperator, sarcină, neoplazii**."
   },
   {
    "tm": "6 · Complicații",
    "at": "3 p",
    "tx": "● **indurație brună** și **hipertensiune pulmonară** ● **insuficiență cardiacă dreaptă** (cord pulmonar) (manual) ● **pleurită fibrinoasă** (junghi) și **hemoptizie** ● **abces** dacă embolul e infectat; emboli repetați → hipertensiune pulmonară."
   },
   {
    "tm": "7 · DD",
    "at": "✓",
    "tx": "Cu **edem pulmonar acut** (lama 1). = plămân în HE, cu capilare septale dilatate, pline cu hematii (congestie). ≠ ① La mine, în aria de stază, alveolele !!conțin aer!!; la edem sunt pline cu lichid roz-pal, omogen, cu bule de aer. ② La mine, în alveole, **siderofage** cu granule brun-aurii (hemosiderină); la edem lichidul e acelular, fără siderofage. ③ La mine septuri **îngroșate, fibroase** (colagen roz); la edem septuri subțiri, fără fibroză. Alternative: Infarct renal · Tromb mixt · Antracoza (LP 3–4) · Hemoragia intraalveolară · Pneumonia acută (LP 4)."
   }
  ]
 },
 "3": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga ob. mare, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 3 · Infarct renal anemic",
  "title": "Zona moartă păstrează desenul, dar își pierde nucleii",
  "hud": [
   "lama 3 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p3",
    "W": 1200,
    "H": 902,
    "marks": [
     {
      "x": 345,
      "y": 85,
      "rx": 100,
      "ry": 80,
      "lab": "parenchim viabil (glomerul cu nuclei)",
      "ly": 190
     },
     {
      "x": 1040,
      "y": 500,
      "rx": 140,
      "ry": 120,
      "lab": "zona infarctată („fantome”)",
      "lx": 1000,
      "ly": 650
     },
     {
      "x": 575,
      "y": 645,
      "rx": 95,
      "ry": 60,
      "lab": "hemoragie interstițială (lizereu)",
      "ly": 735
     }
    ]
   },
   "sub": {
    "img": "q3",
    "W": 1200,
    "H": 902,
    "marks": [
     {
      "x": 705,
      "y": 370,
      "rx": 190,
      "ry": 180
     },
     {
      "x": 144,
      "y": 649,
      "rx": 70
     }
    ],
    "cap": "ob. mare"
   },
   "dd": {
    "img": "p4",
    "cap": "DD · lama 4"
   },
   "bad": [
    [
     "m",
     1
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
   "cred": "Poze (Wikimedia Commons): Dept. of Pathology, Calicut Medical College · CC BY-SA 4.0; Mikael Häggström · CC0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Rinichi!! (corticală), colorația **HE** → !!Infarct renal anemic (alb), recent!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Arie de !!necroză ischemică de coagulare!! a parenchimului renal, prin **ocluzia unei ramuri a arterei renale**, **fără inundare cu sânge** (infarct alb)."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● ob. mic: la o margine **parenchim viabil**, cu nuclei bine colorați ● ob. mic: zonă cu **„fantome” de tubi și glomeruli**: contur păstrat ● ob. mic: zonă **palidă la mărire mică** (lipsesc nucleii bazofili), cu citoplasmă **eozinofilă** ● la limită: **lizereu hemoragic-inflamator** (congestie + neutrofile) ● ob. mare: citoplasmă **omogenă, intens eozinofilă**; nuclei **absenți sau picnotici** ● **membranele bazale păstrate**; **detritus eozinofil** în lumene."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● **embol din cordul stâng**: fibrilație atrială ● **embol din endocardită** sau din **tromb mural post-infarct** ● **tromboză pe placă de aterom** a arterei renale."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● vindecare prin **cicatrice fibroasă retractată, în „V”** ● **abces renal** dacă embolul e septic (endocardită) ● **hematurie și durere lombară** (manual) ● infarcte multiple → **scăderea funcției renale** (manual)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **infarct miocardic acut** (lama 4). = necroză de coagulare: contur păstrat, citoplasmă intens eozinofilă, nuclei absenți; neutrofile prezente. ≠ ① La mine tubi și glomeruli !!„fantomă”!!; la IMA fibre miocardice fără nuclei și fără striații. ② La mine neutrofilele sunt mai ales în **lizereul hemoragic-inflamator** de la limită; la IMA infiltrat dens de neutrofile printre fibrele moarte. ③ La mine **membrane bazale** păstrate și detritus eozinofil în lumenul tubilor; la IMA edem interstițial care lărgește spațiile dintre fibre. Alternative: Infarctul pulmonar (aria subpleurală din lama 2) · Abcese hepatice · NTA (curs) · Autoliza postmortem."
   }
  ]
 },
 "4": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga ob. mare, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 4 · Infarct miocardic acut",
  "title": "O bandă de fibre roz intens, invadată de neutrofile",
  "hud": [
   "lama 4 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p4",
    "W": 1200,
    "H": 898,
    "marks": [
     {
      "x": 936,
      "y": 377,
      "rx": 120,
      "ry": 50,
      "rot": -0.4,
      "lab": "fibre necrozate (fără nuclei)",
      "lx": 950,
      "ly": 480
     },
     {
      "x": 504,
      "y": 466,
      "rx": 110,
      "ry": 90,
      "lab": "infiltrat de neutrofile",
      "ly": 600
     }
    ]
   },
   "sub": {
    "img": "q4",
    "W": 960,
    "H": 648,
    "marks": [
     {
      "x": 520,
      "y": 262,
      "rx": 190,
      "ry": 38,
      "rot": -0.36
     },
     {
      "x": 555,
      "y": 395,
      "rx": 42
     }
    ],
    "cap": "ob. mare"
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
   "cred": "Poze (Wikimedia Commons): Mikael Häggström · CC0; Dept. of Pathology, Calicut Medical College · CC BY-SA 4.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Miocard!! (inimă), colorația **HE** → !!Infarct miocardic acut!!, faza de **infiltrat cu neutrofile** (~3–7 zile)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Arie de !!necroză ischemică (de coagulare)!! a miocardului, prin **ocluzia unei artere coronare**."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● ob. mic: fibre **hipereozinofile, omogene, fără striații, fără nuclei** ● ob. mic: **interstițiu lărgit de edem** și **infiltrat inflamator dens** ● la margine: **lizereu congestiv** (bandă internă de granulocite, externă de congestie) ● ob. mare: **nuclei absenți (carioliză)** sau picnotici ● ob. mare: **neutrofile cu nuclei fragmentați** (carioreexă) ● **hematii extravazate**, rare limfocite și macrofage."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **tromboza pe o placă de aterom coronariană** (fisurată) ● **hemoragie în placa de aterom** ● **tromboembolie coronariană** ● **vasospasm coronarian prelungit**."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **tulburări de ritm** (fibrilație ventriculară) → **moarte subită** ● **insuficiență cardiacă** și **șoc cardiogen** ● **ruptura miocardului** (zilele 5–10; Robbins: cel mai des 3–7) → hemopericard, tamponadă ● **anevrism cardiac** și **tromboembolii** din tromb mural."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **infarct renal anemic** (lama 3). = necroză de coagulare: contur păstrat, citoplasmă intens eozinofilă, nuclei absenți; neutrofile prezente. ≠ ① La mine fibre miocardice fără nuclei și !!fără striații!!; la infarctul renal tubi și glomeruli „fantomă”. ② La mine infiltrat dens de **neutrofile** (carioreexă) printre fibre; la infarctul renal neutrofilele sunt mai ales în lizereul de la limită. ③ La mine **edem interstițial** care lărgește spațiile dintre fibre; la infarctul renal membrane bazale păstrate, detritus eozinofil în lumenul tubilor. Alternative: Pericardită fibrinoasă · Abcese hepatice · Miocardita (curs) · Miocardul normal · Cicatricea post-infarct."
   }
  ]
 },
 "5": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga ob. mare, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 5 · Tromb mixt (liniile Zahn)",
  "title": "Lamele alternante palide și roșii, lipite de perete",
  "hud": [
   "lama 5 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p5",
    "W": 1200,
    "H": 900,
    "marks": [
     {
      "x": 640,
      "y": 560,
      "rx": 100,
      "ry": 140,
      "lab": "lamelă roșie (hematii)",
      "ly": 730
     },
     {
      "x": 564,
      "y": 270,
      "rx": 60,
      "ry": 140,
      "lab": "lamelă palidă (trombocite + fibrină)",
      "ly": 105
     },
     {
      "x": 1135,
      "y": 430,
      "rx": 50,
      "ry": 190,
      "lab": "atașat de perete",
      "lx": 1000,
      "ly": 660
     }
    ]
   },
   "sub": {
    "img": "q5",
    "W": 1200,
    "H": 800,
    "marks": [
     {
      "x": 282,
      "y": 296,
      "rx": 120,
      "ry": 40,
      "rot": 0.5
     },
     {
      "x": 408,
      "y": 424,
      "rx": 70
     }
    ],
    "cap": "ob. mare"
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
   "cred": "Poze (Wikimedia Commons): Yale Rosen · CC BY-SA 2.0; Nephron · CC BY-SA 3.0; Krystyna Bielnik și colab. · CC BY-SA 3.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Vas sanguin!!, colorația **HE** → !!Tromb mixt (stratificat), recent, antemortem!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Masă solidă formată în timpul vieții!! din elementele sângelui, **aderentă de peretele vasului**, cu **straturi alternante** de trombocite + fibrină și de hematii."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● ob. mic: **lumen ocupat de o masă eozinofilă aderentă de perete** ● **lamele alternante**: palide (trombocite + fibrină) și roșii (hematii) ● = **liniile lui Zahn** ● la locul de atașare **endoteliul lipsește**; peretele vasului păstrat ● ob. mare: **fibrină filamentoasă, trombocite granulare**, neutrofile și hematii prinse ● **fără fibroblaste sau capilare** → tromb neorganizat."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **leziunea endotelială**: placă ulcerată, vasculită, infarct ● **fluxul turbulent**: bifurcații, anevrisme ● **staza**: imobilizare, fibrilație atrială, stenoză mitrală ● **hipercoagulabilitatea**: neoplazii, sarcină, contraceptive, factor V Leiden."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **propagare** → ocluzia vasului ● **embolizare** → infarct (arterial) sau embolie pulmonară (venos) ● **organizare și recanalizare** ● **infectare** → slăbirea peretelui, anevrism."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **pericardită fibrinoasă** (lama 15). = material eozinofil de fibrină, cu neutrofile și hematii prinse în el. ≠ ① La mine masa e în !!lumenul!! unui vas, aderentă de perete; la pericardită fibrina e pe suprafața epicardului. ② La mine lamele alternante, palide și roșii (**linii Zahn**); la pericardită strat neregulat, franjurat, vilos. ③ La mine dedesubt e **peretele vasului**, cu endoteliul absent la atașare; la pericardită infiltrat inflamator, vase congestionate, grăsime, miocard. Alternative: Infarctul pulmonar (aria subpleurală din lama 2) · Hipercheratoză · Cheagul postmortem · Trombul organizat și recanalizat · Hemoragia (hematomul)."
   }
  ]
 },
 "6": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 6 · Aortă cu tromb parietal",
  "title": "O masă stratificată, lipită de intimă; lumenul rămâne liber",
  "hud": [
   "piesa 6 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p6",
    "W": 676,
    "H": 1200,
    "marks": [
     {
      "x": 415,
      "y": 630,
      "rx": 62,
      "ry": 290,
      "rot": 0.06,
      "lab": "tromb parietal, stratificat",
      "lx": 230,
      "ly": 560
     },
     {
      "x": 215,
      "y": 950,
      "rx": 150,
      "ry": 42,
      "rot": -0.35,
      "lab": "extensia în a. iliacă comună stângă",
      "lx": 330,
      "ly": 1060
     },
     {
      "x": 430,
      "y": 255,
      "rx": 70,
      "ry": 95,
      "lab": "intima cu plăci de aterom",
      "lx": 560,
      "ly": 160
     }
    ]
   },
   "sub": {
    "img": "d6",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): Denis Desaulniers, Bernard Têtu · CC BY-SA 4.0; Yale Rosen · CC BY-SA 2.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Aortă!! (segment deschis longitudinal) → !!Tromboză parietală (murală) aortică!!, pe ateroscleroză / anevrism."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Masă solidă formată în timpul vieții!! din elementele sângelui, **aderentă de intima** aortei, care căptușește peretele **fără să astupe lumenul** (tromb mural)."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● masă de **câțiva centimetri**, lamelară, mulată pe perete; **lumenul păstrat** ● **roșu-cenușie** (brun-cenușie pe piesa fixată), în straturi (**linii Zahn**) ● **friabilă**, suprafață **mată, neregulată** ● **aderentă de intimă**, nu se desprinde ● intima din jur cu **plăci de aterom**; perete posibil dilatat anevrismal ● trombul se poate **extinde în artera iliacă**."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **ateroscleroza**: placă de aterom ulcerată (leziune endotelială) ● **anevrismul** aortic: stază locală ● **turbulența** la bifurcații ● **hipercoagulabilitatea**."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **embolie în membrele inferioare** → ischemie, gangrenă ● **ischemie mezenterică / infarct intestinal** prin emboli ● **infarct renal, splenic** (tromb suprarenal) ● **organizare** și încorporare în perete."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **tromb călăreț** (piesa 7). = mase de tromb friabile, mate, stratificate (linii Zahn), formate în timpul vieții. ≠ ① La mine masa e !!aderentă!! de intimă; la trombul călăreț masele nu aderă de intima netedă. ② La mine masa e **lamelară**, mulată pe perete, lumenul păstrat; la trombul călăreț mase cilindrice, încolăcite, cu capete rupte. ③ La mine intima din jur are plăci de **aterom**; la trombul călăreț masele sunt în arterele pulmonare de la hil, plămânul congestionat. Alternative: Pericardită fibrinoasă · Hemoragii intracraniene (hematom intracerebral) · Cheagul postmortem · Ateroscleroza aortei (placa simplă) · Trombul obturant / embolul."
   }
  ]
 },
 "7": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 7 · Tromb călăreț",
  "title": "Mase încolăcite, neaderente, la bifurcația a. pulmonare",
  "hud": [
   "piesa 7 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p7",
    "W": 1200,
    "H": 814,
    "marks": [
     {
      "x": 420,
      "y": 375,
      "rx": 165,
      "ry": 75,
      "rot": 0.1,
      "lab": "tromboembol încolăcit",
      "lx": 300,
      "ly": 270
     },
     {
      "x": 750,
      "y": 450,
      "rx": 170,
      "ry": 38,
      "rot": 0.87,
      "lab": "tromboembol într-o ramură",
      "lx": 880,
      "ly": 640
     },
     {
      "x": 420,
      "y": 490,
      "rx": 110,
      "ry": 28,
      "rot": 0.05,
      "lab": "intima a. pulmonare, netedă",
      "lx": 400,
      "ly": 560
     },
     {
      "x": 1040,
      "y": 210,
      "rx": 100,
      "ry": 80,
      "lab": "plămân congestionat",
      "ly": 330
     }
    ]
   },
   "sub": {
    "img": "d7",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): Yale Rosen · CC BY-SA 2.0; Denis Desaulniers, Bernard Têtu · CC BY-SA 4.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Plămâni!!, cu arterele pulmonare deschise la hil → !!Tromboembolie pulmonară masivă!!, cu embol la bifurcație („**în șa**”)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Ocluzia arterei pulmonare de un tromb desprins (embol)!!, de obicei dintr-o **tromboză venoasă profundă**, oprit la bifurcația arterei pulmonare."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● în trunchi și ramuri: mase **cilindrice, încolăcite**, de câțiva centimetri ● **capete rupte**; așezate „în șa” pe bifurcație ● **roșu-brun până la negricioase**, cu striații albicioase (**linii Zahn**) ● **ferme, friabile**, suprafață **mată, uscată** ● **nu mulează lumenul și nu aderă** de intima netedă ● parenchimul din jur **congestionat**, roșu-violaceu."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **TVP a membrului inferior** (v. poplitee, femurală, iliacă) ● **imobilizare**, intervenții chirurgicale, traumatisme, arsuri ● **sarcina** (ultimul trimestru) și **postpartumul** ● **neoplasmele diseminate**."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **moarte subită** (cord pulmonar acut) ● **hipoxie, hipotensiune, insuficiență cardiacă dreaptă** ● emboli mici → **infarct sau hemoragie pulmonară** ● emboli repetați → **hipertensiune pulmonară**, cord pulmonar cronic."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **aortă cu tromb parietal** (piesa 6). = mase de tromb friabile, mate, stratificate (linii Zahn), formate în timpul vieții. ≠ ① La mine masele !!nu aderă!! de intima netedă; la aortă trombul e aderent de intimă. ② La mine mase **cilindrice, încolăcite**, cu capete rupte, „în șa” pe bifurcație; la aortă masă lamelară, mulată pe perete. ③ La mine masele sunt în **arterele pulmonare** de la hil, plămânul congestionat; la aortă intima cu plăci de aterom. Alternative: Infarct pulmonar · Hemoragii intracraniene (hematom intracerebral) · Cheagul postmortem."
   }
  ]
 },
 "8": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 8 · Infarct renal",
  "title": "Un con alb-gălbui: baza la capsulă, vârful spre hil",
  "hud": [
   "piesa 8 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p8",
    "W": 960,
    "H": 652,
    "marks": [
     {
      "x": 338,
      "y": 262,
      "rx": 100,
      "ry": 92,
      "rot": 0.3,
      "lab": "zona alb-gălbuie (infarct)",
      "lx": 220,
      "ly": 60
     },
     {
      "x": 428,
      "y": 260,
      "rx": 18,
      "ry": 95,
      "rot": 0.05,
      "lab": "lizereu roșu",
      "lx": 520,
      "ly": 400
     },
     {
      "x": 335,
      "y": 180,
      "rx": 95,
      "ry": 24,
      "lab": "baza la capsulă",
      "lx": 120,
      "ly": 170
     },
     {
      "x": 680,
      "y": 340,
      "rx": 110,
      "ry": 70,
      "lab": "parenchim viabil",
      "ly": 450
     }
    ]
   },
   "sub": {
    "img": "d8",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): Dentl college survival kit · domeniu public; Yale Rosen · CC BY-SA 2.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Rinichi!! (secționat longitudinal) → !!Infarct renal anemic (alb), recent!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Arie de necroză ischemică de coagulare!! a parenchimului renal, prin **ocluzia unei ramuri a arterei renale**, fără inundare cu sânge (infarct alb)."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● zonă de **1–3 cm**, **piramidală**: baza la capsulă, vârful spre hil ● **alb-gălbuie**, omogenă, **net delimitată** ● **lizereu roșu**, hemoragic-congestiv, la margine ● consistență **fermă** (necroză de coagulare) ● capsula de deasupra **ușor deprimată** ● **desenul cortico-medular șters** în zonă."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● **embol din cordul stâng**: fibrilație atrială ● embol din **endocardită** sau din **tromb mural post-infarct** ● **tromboză pe placă de aterom** a arterei renale."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● vindecare prin **cicatrice retractată, în „V”**, alb-sidefie ● **abces renal** dacă embolul e septic ● **hematurie și durere lombară** (manual) ● **infarcte multiple** → scăderea funcției renale (manual)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **infarct pulmonar** (piesa 9). = zonă cuneiformă, net delimitată, cu baza la suprafața organului și vârful spre hil. ≠ ① La mine zona e !!alb-gălbuie!!, cu lizereu roșu la margine; la infarctul pulmonar e roșu-negricioasă, omogenă. ② La mine baza e la **capsulă**, suprafață netedă, fără depozite; la infarctul pulmonar baza e la pleura mată, cu fibrină, iar zona bombează. ③ La mine, în zonă, desenul cortico-medular **șters**, restul parenchimului roșu-brun; la infarctul pulmonar parenchim congestionat, aerat în jur. Alternative: Rinichi de șoc · Litiază renală · Infarctul septic (abcesul) · Infarctele splenice vechi."
   }
  ]
 },
 "9": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 9 · Infarct pulmonar",
  "title": "Un con roșu-negricios, cu baza la pleură",
  "hud": [
   "piesa 9 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p9",
    "W": 1200,
    "H": 775,
    "marks": [
     {
      "x": 500,
      "y": 600,
      "rx": 330,
      "ry": 150,
      "rot": -0.05,
      "lab": "zona roșu-negricioasă (infarct)",
      "ly": 700
     },
     {
      "x": 118,
      "y": 630,
      "rx": 30,
      "ry": 125,
      "rot": -0.78,
      "lab": "baza la pleură",
      "lx": 200,
      "ly": 760
     },
     {
      "x": 830,
      "y": 200,
      "rx": 110,
      "ry": 80,
      "lab": "parenchim congestionat, aerat",
      "ly": 320
     },
     {
      "x": 915,
      "y": 545,
      "rx": 40,
      "ry": 115,
      "dash": true,
      "lab": "limita netă",
      "lx": 1010,
      "ly": 420
     }
    ]
   },
   "sub": {
    "img": "d9",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): Yale Rosen · CC BY-SA 2.0; Dentl college survival kit · domeniu public."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Plămân!! (secționat) → !!Infarct pulmonar hemoragic (roșu), recent!!, prin tromboembolie."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Arie de necroză ischemică!! a parenchimului pulmonar, prin **ocluzia unei ramuri a arterei pulmonare**, **inundată de sânge** (infarct roșu)."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● zonă de **2–5 cm**, uneori multiplă, periferic și bazal ● **cuneiformă**: baza la pleură, vârful spre hil ● **roșu-negricioasă**, omogenă, **limită netă** ● **fermă, ca ficatul**; nu crepită; **bombează** pe secțiune ● pleura de deasupra **mată, rugoasă, cu fibrină** ● parenchimul din jur **congestionat**, brun-roșu."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● **tromboembolie dintr-o TVP** a gambei ● pe un **plămân congestionat** (insuficiență cardiacă stângă) ● **factori de TVP**: imobilizare, postoperator, sarcină, neoplazii."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **pleurită fibrinoasă** (junghi) ● **hemoptizie**, dispnee ● **abces pulmonar** dacă embolul e infectat ● emboli repetați → **hipertensiune pulmonară**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **infarct renal** (piesa 8). = zonă cuneiformă, net delimitată, cu baza la suprafața organului și vârful spre hil. ≠ ① La mine zona e !!roșu-negricioasă!!, omogenă; la infarctul renal e alb-gălbuie, cu lizereu roșu la margine. ② La mine baza e la pleura mată, cu **fibrină**, iar zona bombează; la infarctul renal baza e la capsula netedă, fără depozite. ③ La mine parenchimul din jur e **congestionat, aerat**; la infarctul renal desenul cortico-medular șters în zonă, restul roșu-brun. Alternative: Bronhopneumonie · Tromb călăreț (tromboembol în a. pulmonară) · Pneumonia lobară (hepatizație roșie, LP 3–4) · Infarctul septic (abces)."
   }
  ]
 },
 "10": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 10 · Infarct miocardic acut",
  "title": "O arie galben-palidă, moale, pe toată grosimea peretelui VS",
  "hud": [
   "piesa 10 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p10",
    "W": 800,
    "H": 498,
    "marks": [
     {
      "x": 490,
      "y": 100,
      "rx": 115,
      "ry": 45,
      "rot": 0.15,
      "lab": "aria galben-palidă (infarct)",
      "lx": 300,
      "ly": 30
     },
     {
      "x": 590,
      "y": 125,
      "rx": 48,
      "ry": 60,
      "lab": "focar hemoragic",
      "lx": 700,
      "ly": 40
     },
     {
      "x": 495,
      "y": 225,
      "rx": 55,
      "ry": 70,
      "lab": "lumen VS",
      "ly": 320
     },
     {
      "x": 165,
      "y": 230,
      "rx": 80,
      "ry": 60,
      "lab": "VD",
      "ly": 320
     }
    ]
   },
   "sub": {
    "img": "d10",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): Mikael Häggström · CC0; Denis Desaulniers, Bernard Têtu · CC BY-SA 4.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Inimă!! (secțiune transversală prin ventriculi) → !!Infarct miocardic acut transmural!! al peretelui posterior al VS, cu **ruptură focală**."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Arie de necroză ischemică a miocardului!!, prin **ocluzia unei artere coronare**."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● în **peretele posterior al VS**: arie neregulată de câțiva cm ● ocupă toată grosimea peretelui: **transmurală** ● **galben-palidă, lutoasă**, consistență **moale** ● înconjurată de o **margine roșie-violacee**, hiperemică ● în grosimea ei un **focar roșu-închis, hemoragic** = ruptură focală ● restul miocardului **roșu-brun**, normal."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **tromboza pe o placă de aterom** coronariană ● **hemoragie în placa** de aterom ● **tromboembolie** coronariană ● **vasospasm** coronarian prelungit."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **ruptura peretelui** (zilele 5–10, miomalacie; Robbins: cel mai des 3–7) → hemopericard, tamponadă ● **tulburări de ritm** → moarte subită ● **insuficiență cardiacă, șoc cardiogen** ● **anevrism** ventricular, **tromboembolii**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **pericardită fibrinoasă** (piesa 23). = cord cu leziune gălbuie pe fond roșu-brun; IMA transmural poate da chiar pericardită fibrinoasă. ≠ ① La mine aria e în !!grosimea peretelui!! VS, transmurală, văzută pe secțiune; la pericardită depozitele sunt pe suprafața epicardului. ② La mine arie **galben-palidă, lutoasă**, moale, cu margine roșie; la pericardită depozite aspre, viloase, friabile („cord păros”). ③ La mine un **focar hemoragic**, roșu-închis (ruptură focală), în perete; la pericardită depozitele se desprind ușor, dedesubt suprafață congestionată. Alternative: Infarct renal · Aortă cu tromb parietal · Cicatricea post-infarct (infarct vechi) · Miocardul normal."
   }
  ]
 },
 "11": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 11 · Hemoragii intracraniene · hematom intracerebral",
  "title": "Un cheag profund care rupe țesutul și intră în ventricul",
  "hud": [
   "piesa 11 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p11",
    "W": 1200,
    "H": 967,
    "marks": [
     {
      "x": 720,
      "y": 500,
      "rx": 290,
      "ry": 220,
      "lab": "hematom profund",
      "ly": 760
     },
     {
      "x": 530,
      "y": 430,
      "rx": 95,
      "ry": 85,
      "lab": "sânge în ventriculul lateral",
      "lx": 330,
      "ly": 560
     },
     {
      "x": 638,
      "y": 220,
      "rx": 36,
      "ry": 95,
      "lab": "fisura interemisferică",
      "lx": 520,
      "ly": 80
     },
     {
      "x": 1000,
      "y": 640,
      "rx": 70,
      "ry": 90,
      "lab": "parenchim edemațiat",
      "lx": 1000,
      "ly": 770
     }
    ]
   },
   "sub": {
    "img": "d11",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): Denis Desaulniers, Bernard Têtu · CC BY-SA 4.0; Netha Hussain · CC BY-SA 3.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Creier!! (secțiune coronală) → !!Hemoragie cerebrală intraparenchimatoasă profundă!! (hematom intracerebral), cu **inundație ventriculară**."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Colecție de sânge extravazat, coagulat, în parenchimul cerebral!!."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● colecție de **câțiva cm**, **profund**, în regiunea nucleilor bazali ● formă **neregulată**, margini **anfractuoase** ● **roșu-negricioasă**, cheag **friabil** ● **distruge** substanța cenușie și albă; **efect de masă** (linia mediană împinsă) ● **sânge în ventriculii laterali** = inundație ventriculară ● parenchim din jur **moale, edemațiat**."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **HTA** (cea mai frecventă): ruptura arteriolelor perforante hialinizate ● **malformații vasculare** ● **tulburări de coagulare** (diateze hemoragice, anticoagulante) ● **tumori cerebrale**."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **hipertensiune intracraniană și herniere** (compresia trunchiului) ● **deces** prin lezarea centrilor bulbari ● **inundație ventriculară** ● dacă supraviețuiește: **pseudochist posthemoragic** brun-ruginiu (hemosiderină)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **abces cerebral** (piesa 24). = creier pe secțiune, cu leziune profundă în parenchim, edem în jur și efect de masă. ≠ ① La mine conținutul e un !!cheag roșu-negricios!! (fixat: negru-brun), friabil; la abces e puroi (pe piesa fixată: gol sau cenușiu-gălbui). ② La mine sângele **disecă țesutul**, fără perete propriu; la abces cavitatea are perete propriu (capsulă), chiar dacă e neregulată. ③ La mine sânge în ventriculi (**inundație ventriculară**); la abces ventriculul e comprimat, fără sânge. Alternative: Leptomeningită purulentă · Tromb călăreț (tromboembol în a. pulmonară) · Infarctul cerebral (ischemic) · Hemoragia subarahnoidiană, hematomul subdural / epidural."
   }
  ]
 },
 "12": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 12 · Rinichi de șoc",
  "title": "Corticală palidă și lată, medulară roșie: contrast net",
  "hud": [
   "piesa 12 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p12",
    "W": 1200,
    "H": 1161,
    "marks": [
     {
      "x": 100,
      "y": 640,
      "rx": 40,
      "ry": 150,
      "lab": "corticala palidă",
      "lx": 200,
      "ly": 840
     },
     {
      "x": 260,
      "y": 515,
      "rx": 50,
      "ry": 18,
      "rot": 0.62,
      "lab": "congestie la joncțiunea cortico-medulară",
      "lx": 330,
      "ly": 380
     },
     {
      "x": 1140,
      "y": 560,
      "rx": 22,
      "ry": 170,
      "lab": "capsula destinsă, netedă",
      "lx": 1000,
      "ly": 330
     },
     {
      "x": 600,
      "y": 540,
      "rx": 160,
      "ry": 55,
      "lab": "bazinet și hil",
      "ly": 430
     }
    ]
   },
   "sub": {
    "img": "d12",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): Amadalvarez · CC BY-SA 4.0; Dentl college survival kit · domeniu public."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Rinichi!! (secționat longitudinal) → !!Rinichi de șoc: necroză tubulară acută ischemică!! (nefroză de șoc)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Leziunea renală din șoc: !!necroza ischemică a celulelor tubulare prin hipoperfuzie sistemică!!, cu corticală palidă și medulară congestionată."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● rinichi **mărit în volum, greu, tumefiat**; formă păstrată; **bilateral** ● capsula **destinsă, netedă**, se decapsulează ușor ● consistență **moale, flască** ● corticala **lată, palidă**, alb-gălbuie (ischemie) ● medulara **roșu-închis, congestionată** ● = **contrast cortico-medular net**; fără infarcte, abcese sau cicatrici."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **șoc hipovolemic**: hemoragie, arsuri, vărsături, diaree ● **șoc cardiogen**: infarct miocardic, aritmii, tamponadă ● **șoc septic**: infecții generalizate ● **embolie pulmonară masivă** (obstrucția ejecției)."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **insuficiență renală acută** cu oligurie ● **acidoză și hiperpotasemie** (manual) ● **disfuncție multiplă de organ**, deces în șocul ireversibil ● la supraviețuire: **regenerare tubulară**, cu fază poliurică."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **infarct renal** (piesa 8). = rinichi secționat longitudinal, cu parenchim palid care contrastează cu zone roșii, congestionate. ≠ ① La mine paloarea cuprinde !!toată corticala!!, difuz, bilateral; la infarctul renal e o zonă localizată, piramidală. ② La mine roșul e în medulară, la joncțiunea cortico-medulară (**contrast cortico-medular**); la infarctul renal lizereu roșu în jurul zonei. ③ La mine rinichi **mărit, moale**, capsula destinsă, netedă; la infarctul renal rinichi de mărime obișnuită, cu zona infarctată fermă. Alternative: Litiază renală · Steatoză hepatică · Rinichiul de stază (IC)."
   }
  ]
 },
 "13": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga ob. mare, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 13 · Hipercheratoză",
  "title": "Un strat cornos enorm, fără nuclei, peste un epiderm îngroșat",
  "hud": [
   "lama 13 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p13",
    "W": 604,
    "H": 1000,
    "marks": [
     {
      "x": 300,
      "y": 430,
      "rx": 250,
      "ry": 330,
      "lab": "strat cornos foarte gros, lamelar",
      "ly": 790
     },
     {
      "x": 430,
      "y": 878,
      "rx": 120,
      "ry": 32,
      "rot": -0.12,
      "lab": "epidermul viu",
      "lx": 430,
      "ly": 935
     },
     {
      "x": 120,
      "y": 955,
      "rx": 110,
      "ry": 40,
      "lab": "dermul",
      "lx": 150,
      "ly": 985
     }
    ]
   },
   "sub": {
    "img": "q13",
    "W": 1000,
    "H": 739,
    "marks": [
     {
      "x": 230,
      "y": 250,
      "rx": 200,
      "ry": 110,
      "rot": -0.15
     },
     {
      "x": 320,
      "y": 428,
      "rx": 95,
      "ry": 24,
      "rot": -0.05
     }
    ],
    "cap": "ob. mare"
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
   "cred": "Poze (Wikimedia Commons): Mikael Häggström · CC0; Dept. of Pathology, Calicut Medical College · CC BY-SA 4.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Piele!!, colorația **HE** → !!Hipercheratoză ortocheratozică cu acantoză!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "**Îngroșarea stratului cornos** al epidermului prin **acumulare de cheratină**, o !!tulburare a cheratinizării!! (distrofie proteică)."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● ob. mic: **epiderm îngroșat**, cu **strat cornos foarte gros, lamelar** ● **stratul spinos lat**, creste interpapilare alungite: **acantoză** ● **stratul granulos bine reprezentat**, chiar îngroșat ● **dermul** cu papile, vase și infiltrat inflamator discret ● ob. mare: lamele de cheratină **eozinofile, omogene, anucleate: ortocheratoză** ● keratinocite cu **punți intercelulare, fără atipii**; fără nuclei în cornos."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **frecarea sau presiunea cronică** (bătătura) ● **inflamația cronică** a pielii ● **deficitul de vitamina A** ● boli genetice: **ihtioza**."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● pe mucoase: **leucoplazie**, plăci albe precanceroase (se biopsiază) ● **persistă** cât timp persistă stimulul; **reversibilă** la îndepărtarea lui ● **fisuri dureroase** ale stratului cornos îngroșat (manual)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **granulom de corp străin** (lama 18). = piele în HE, cu cheratină lamelară, eozinofilă, anucleată. ≠ ① La mine cheratina e !!la suprafață!!, peste epiderm; la corp străin e în derm, înconjurată de celule gigante. ② La mine cheratina e fără **celule gigante** sau macrofage în jur; la corp străin celule gigante cu nuclei dezordonați, mulate pe ea. ③ La mine dedesubt **acantoză**: epiderm îngroșat, strat granulos bine reprezentat; la corp străin fibroză și limfocite în derm, în jurul materialului. Alternative: Pericardită fibrinoasă · Tromb mixt · Papilomul scuamos / veruca · Keratoza seboreică · Carcinomul scuamos."
   }
  ]
 },
 "14": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga ob. mare, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 14 · Steatoză hepatică",
  "title": "Vacuole clare peste tot și nucleul împins la margine",
  "hud": [
   "lama 14 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p14",
    "W": 1000,
    "H": 728,
    "marks": [
     {
      "x": 355,
      "y": 372,
      "rx": 40,
      "lab": "vacuolă clară, rotundă",
      "ly": 440
     },
     {
      "x": 245,
      "y": 160,
      "rx": 45,
      "ry": 22,
      "rot": -0.3,
      "lab": "sinusoid comprimat (hematii)",
      "ly": 210
     }
    ]
   },
   "sub": {
    "img": "q14",
    "W": 1000,
    "H": 729,
    "marks": [
     {
      "x": 528,
      "y": 283,
      "rx": 44
     },
     {
      "x": 166,
      "y": 483,
      "rx": 20,
      "ry": 28
     }
    ],
    "cap": "ob. mare"
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
   "cred": "Poze (Wikimedia Commons): Dept. of Pathology, Calicut Medical College · CC BY-SA 4.0; Yale Rosen · CC BY-SA 2.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Ficat!!, colorația **HE** → !!Steatoză hepatică macroveziculară difuză!! (distrofie adipoasă)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Acumularea de **trigliceride** sub formă de **vacuole lipidice în citoplasma hepatocitelor**, o !!leziune celulară reversibilă!!."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● ob. mic: **arhitectura lobulară păstrată**, cordoane deformate de celule mărite ● **vacuole clare, rotunde, bine delimitate**, de mărimi diferite, **difuz în lobul** ● **sinusoide comprimate**; fără inflamație și fără fibroză ● ob. mare: **vacuolă mare, unică**, ocupă aproape toată citoplasma ● **nucleul împins la periferie, turtit**: steatoză macroveziculară ● vacuolele sunt **goale**: grăsimea s-a dizolvat la prelucrare."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **alcoolismul** (cauza tipică a formei difuze) ● **obezitatea și diabetul** (prea mulți acizi grași) ● **hipoxia** (centrolobular) și **toxicele**, ex. tetraclorura de carbon ● **malnutriția proteică** (lipsesc apoproteinele de export)."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● evoluție spre **steatohepatită** ● evoluție spre **ciroză** dacă stimulul persistă ● **hepatomegalie** cu ficat galben, moale."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **abcese hepatice** (lama 16). = ficat în HE (cordoane de hepatocite, sinusoide), cu leziune vizibilă de la ob. mic. ≠ ① La mine !!vacuole clare!!, rotunde, în hepatocite, cu nucleul împins la periferie; la abcese colecție de neutrofile și detritus (puroi). ② La mine leziunea e **difuză**, arhitectura păstrată; la abcese leziune focală, țesutul din centru distrus (lichefiere). ③ La mine **fără inflamație**, fără fibroză; la abcese membrană piogenă (neutrofile, fibrină) și capsulă fibroasă. Alternative: Edem pulmonar acut · Pericardită fibrinoasă (grăsimea subepicardică) · Ficatul de stază (LP 1) · Amiloidoza hepatică (LP 3)."
   }
  ]
 },
 "15": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga ob. mare, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 15 · Pericardită fibrinoasă",
  "title": "Un strat roz, franjurat, lipit pe suprafața inimii",
  "hud": [
   "lama 15 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p15",
    "W": 1000,
    "H": 799,
    "marks": [
     {
      "x": 650,
      "y": 250,
      "rx": 100,
      "ry": 62,
      "lab": "exsudat fibrinos, vilos",
      "ly": 335
     },
     {
      "x": 470,
      "y": 460,
      "rx": 120,
      "ry": 50,
      "lab": "infiltrat inflamator",
      "ly": 535
     },
     {
      "x": 300,
      "y": 680,
      "rx": 150,
      "ry": 60,
      "lab": "țesut subepicardic",
      "ly": 765
     }
    ]
   },
   "sub": {
    "img": "q15",
    "W": 1000,
    "H": 728,
    "marks": [
     {
      "x": 350,
      "y": 210,
      "rx": 115,
      "ry": 72
     },
     {
      "x": 620,
      "y": 410,
      "rx": 95,
      "ry": 48
     }
    ],
    "cap": "ob. mare"
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
   "cred": "Poze (Wikimedia Commons): Krystyna Bielnik și colab. · CC BY-SA 3.0; Yale Rosen · CC BY-SA 2.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Inimă (epicard)!!, colorația **HE** → !!Pericardită acută fibrinoasă!!, cu început de organizare."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Inflamație acută a pericardului cu **exsudat bogat în fibrină**, apărut când !!permeabilitatea vasculară crește!! atât de mult încât **trece fibrinogenul**."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● ob. mic: pe epicard, strat **eozinofil, amorf, franjurat, cu proeminențe viloase** ● **mezoteliul lipsește** sub depozit ● subepicardic: **infiltrat inflamator** și **vase dilatate, congestionate** ● ob. mare: **fibrină în rețea** sau mase roz, cu neutrofile și hematii prinse ● infiltrat cu **neutrofile, limfocite, macrofage** ● la bază: **fibroblaste și capilare de neoformație**: început de organizare."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **uremia** ● **infarctul miocardic transmural** ● **reumatismul articular acut** ● **infecțiile virale**."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **organizarea** fibrinei abundente ● **aderențe pericardice** ● **pericardită constrictivă** (limitează funcția miocardică) ● clinic: **frecătură pericardică și durere**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **tromb mixt** (lama 5). = material eozinofil de fibrină, cu neutrofile și hematii prinse în el. ≠ ① La mine fibrina e pe suprafața !!epicardului!!; la tromb masa e în lumenul unui vas, aderentă de perete. ② La mine strat **neregulat, franjurat**, vilos; la tromb lamele alternante, palide și roșii (linii Zahn). ③ La mine dedesubt **infiltrat inflamator**, vase congestionate, grăsime, miocard; la tromb peretele vasului, cu endoteliul absent la atașare. Alternative: Infarct miocardic acut · Hipercheratoză · Pericardita purulentă (LP 4) · Pneumonia lobară."
   }
  ]
 },
 "16": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga ob. mare, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 16 · Abcese hepatice",
  "title": "O colecție de puroi cu perete propriu, în ficat",
  "hud": [
   "lama 16 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p16",
    "W": 1000,
    "H": 750,
    "marks": [
     {
      "x": 220,
      "y": 400,
      "rx": 150,
      "ry": 130,
      "lab": "centrul: puroi",
      "ly": 555
     },
     {
      "x": 650,
      "y": 330,
      "rx": 60,
      "ry": 180,
      "rot": -0.6,
      "lab": "membrana piogenă",
      "lx": 640,
      "ly": 545
     },
     {
      "x": 860,
      "y": 170,
      "rx": 90,
      "ry": 70,
      "lab": "capsula fibroasă",
      "ly": 265
     }
    ]
   },
   "sub": {
    "img": "q16",
    "W": 1000,
    "H": 750,
    "marks": [
     {
      "x": 750,
      "y": 190,
      "rx": 70
     },
     {
      "x": 470,
      "y": 280,
      "rx": 80,
      "ry": 45,
      "rot": 0.5
     }
    ],
    "cap": "ob. mare"
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
   "cred": "Poze (Wikimedia Commons): Yale Rosen · CC BY-SA 2.0; Dept. of Pathology, Calicut Medical College · CC BY-SA 4.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Ficat!!, colorația **HE** → !!Abcese hepatice!!: inflamație acută **purulentă circumscrisă**, cu **necroză de lichefiere**."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Abcesul este o !!colecție circumscrisă de puroi!! (neutrofile, celule necrozate, lichid de edem), **într-o cavitate de neoformație**."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● ob. mic: parenchimul e înlocuit de o **colecție rotundă, bine delimitată** ● **centru necrotic** și perete propriu: **membrana piogenă** (neutrofile, fibrină, vase) ● la exterior: **țesut de granulație**; hepatocitele din jur **comprimate** ● pot exista **colecții multiple**, de dimensiuni diferite ● ob. mare: **neutrofile cu nuclei polilobați**; spre centru **piocite** (nuclei picnotici) ● **detritus eozinofil**, fibrină, hematii; fără epitelioide, gigante sau cazeum."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● cale biliară: **colangita** ● cale portală: **apendicita, diverticulita** ● cale arterială: **sepsisul** ● germeni piogeni: **stafilococ, streptococ, E. coli, anaerobi**."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● **ruptura în peritoneu**: peritonită ● **septicemia** ● **fibroza după drenaj** (vindecare cu cicatrice)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **limfadenită TBC** (lama 17). = arie centrală de necroză, înconjurată de un perete de celule inflamatorii. ≠ ① La mine centrul e !!puroi!!: neutrofile și detritus (lichefiere); la TBC cazeum roz, amorf, granular, fără contururi celulare. ② La mine peretele e **membrana piogenă**: neutrofile dense, fibrină; la TBC celule epitelioide, celule gigante Langhans, limfocite. ③ La mine în jur **hepatocite comprimate** (ficat); la TBC țesut limfoid restant, ganglion cu arhitectura ștearsă. Alternative: Distrofie adipoasă hepatică (steatoză) · Infarct renal · Abcesul pulmonar / cerebral."
   }
  ]
 },
 "17": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga ob. mare, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 17 · Limfadenită TBC",
  "title": "Cazeum în centru, epitelioide și Langhans în jur",
  "hud": [
   "lama 17 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p17",
    "W": 1000,
    "H": 703,
    "marks": [
     {
      "x": 720,
      "y": 380,
      "rx": 180,
      "ry": 150,
      "lab": "necroză cazeoasă",
      "ly": 560
     },
     {
      "x": 285,
      "y": 225,
      "rx": 55,
      "ry": 45,
      "lab": "granulom cu celulă gigantă",
      "ly": 300
     },
     {
      "x": 70,
      "y": 260,
      "rx": 60,
      "ry": 150,
      "lab": "țesut limfoid restant",
      "lx": 120,
      "ly": 440
     }
    ]
   },
   "sub": {
    "img": "q17",
    "W": 1000,
    "H": 750,
    "marks": [
     {
      "x": 500,
      "y": 360,
      "rx": 115,
      "ry": 85
     },
     {
      "x": 300,
      "y": 460,
      "rx": 60,
      "ry": 45
     }
    ],
    "cap": "ob. mare"
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
   "cred": "Poze (Wikimedia Commons): Dept. of Pathology, Calicut Medical College · CC BY-SA 4.0; Ed Uthman · CC BY 2.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Ganglion limfatic!!, colorația **HE** → !!Limfadenită tuberculoasă!! cu **granuloame epitelioido-gigantocelulare** și **necroză cazeoasă**."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Inflamație **cronică granulomatoasă** a ganglionului, produsă de **Mycobacterium tuberculosis**, cu granuloame și !!necroză centrală de cazeificare!!."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● ob. mic: **arhitectura ganglionului ștearsă**, țesut limfoid doar la periferie ● central: **necroză cazeoasă** roz, amorfă, granulară, fără contururi celulare ● la margine: **granuloame**: noduli de celule palide cu celule gigante, coroană de limfocite ● ob. mare: **celule epitelioide**, nucleu alungit, palid, „în talpă de pantof” ● **celule gigante Langhans**: zeci de nuclei la periferie, în potcoavă ● la exterior: **limfocite și câteva fibroblaste**."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● **Mycobacterium tuberculosis**, care supraviețuiește în macrofage ● răspunsul **limfocitelor T CD4 Th1** (interferon gama) activează macrofagele ● **hipoxia și radicalii liberi** din centrul granulomului dau cazeumul."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● granulomul **izolează bacilul, dar nu îl eradică** întotdeauna ● **diseminarea bacilului** din focar (manual) ● **fibroza focarului** (ex. pericardita constrictivă fibroasă din TBC)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **granulom de corp străin** (lama 18). = inflamație granulomatoasă cronică: macrofage, celule gigante multinucleate, limfocite, fibroză. ≠ ① La mine centrul e !!cazeum!! roz, amorf, granular; la corp străin material străin lamelar înglobat, fără necroză. ② La mine celula **Langhans**: nuclei la periferie, în potcoavă; la corp străin nuclei dezordonați, împrăștiați în citoplasmă. ③ La mine granuloame într-un **ganglion limfatic**, cu arhitectura ștearsă; la corp străin țesut moale (derm, subcutan), fără țesut limfoid. Alternative: Abcese hepatice · Infarct renal · Sarcoidoza (curs) · Limfadenita / abcesul supurat."
   }
  ]
 },
 "18": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga ob. mare, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Lama 18 · Granulom de corp străin",
  "title": "Celule gigante mulate pe un material pe care nu-l pot digera",
  "hud": [
   "lama 18 din 26 · HE"
  ],
  "sceneOpts": {
   "main": {
    "img": "p18",
    "W": 1000,
    "H": 750,
    "marks": [
     {
      "x": 560,
      "y": 270,
      "rx": 140,
      "ry": 90,
      "lab": "material străin (cheratină)",
      "ly": 120
     },
     {
      "x": 625,
      "y": 180,
      "rx": 40,
      "ry": 30,
      "lab": "celulă gigantă",
      "lx": 760,
      "ly": 150
     },
     {
      "x": 450,
      "y": 560,
      "rx": 110,
      "ry": 60,
      "lab": "infiltrat + țesut de granulație",
      "ly": 645
     },
     {
      "x": 880,
      "y": 420,
      "rx": 80,
      "ry": 90,
      "lab": "fibroză la periferie",
      "lx": 870,
      "ly": 535
     }
    ]
   },
   "sub": {
    "img": "q18",
    "W": 900,
    "H": 676,
    "marks": [
     {
      "x": 560,
      "y": 160,
      "rx": 110,
      "ry": 70
     },
     {
      "x": 430,
      "y": 250,
      "rx": 110,
      "ry": 30,
      "rot": 0.1
     }
    ],
    "cap": "ob. mare"
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
   "cred": "Poze (Wikimedia Commons): Dept. of Pathology, Calicut Medical College · CC BY-SA 4.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Țesut moale!!, colorația **HE** → !!Inflamație cronică granulomatoasă de corp străin!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "Granulom format din **macrofage și celule gigante multinucleate** în jurul unui **material străin nedigerabil**, !!fără necroză cazeoasă!!."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● ob. mic: **granulom neregulat** cu **material străin central** (fir de sutură, cheratină) ● **celule gigante multinucleate mulate pe material**, apoi macrofage, limfocite ● la exterior: **țesut de granulație și fibroză** ● **fără necroză centrală** ● ob. mare: celule gigante cu **nuclei dezordonați**, în toată citoplasma, nu în potcoavă ● în jur: **macrofage epitelioide și limfocite**; fără cazeum, fără neutrofile în masă."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **firele de sutură** ● **talcul, uleiul, siliconul** ● **cheratina** dintr-un chist rupt ● **cristalele de urat**."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● **persistă** cât timp persistă materialul ● **fibroza** în jurul granulomului ● **dispare** după îndepărtarea materialului."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **limfadenită TBC** (lama 17). = inflamație granulomatoasă cronică: macrofage, celule gigante multinucleate, limfocite, fibroză. ≠ ① La mine în centru !!material străin!! (aici cheratină lamelară), fără necroză; la TBC cazeum roz, amorf, granular. ② La mine celule gigante cu **nuclei dezordonați**, mulate pe material; la TBC celula Langhans, nuclei la periferie, în potcoavă. ③ La mine **țesut moale** (derm, subcutan), fără țesut limfoid; la TBC ganglion limfatic cu arhitectura ștearsă. Alternative: Abcese hepatice · Hipercheratoză · Sarcoidoza."
   }
  ]
 },
 "19": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 19 · Steatoză hepatică",
  "title": "Ficatul mare, galben, cu margini rotunde",
  "hud": [
   "piesa 19 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p19",
    "W": 900,
    "H": 795,
    "marks": [
     {
      "x": 300,
      "y": 420,
      "rx": 170,
      "ry": 200,
      "lab": "parenchim galben, uniform",
      "ly": 650
     },
     {
      "x": 140,
      "y": 690,
      "rx": 100,
      "ry": 75,
      "lab": "margine rotunjită",
      "lx": 300,
      "ly": 760
     },
     {
      "x": 720,
      "y": 330,
      "rx": 120,
      "ry": 150,
      "lab": "capsula netedă, lucioasă",
      "ly": 510
     }
    ]
   },
   "sub": {
    "img": "d19",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
   },
   "dd": {
    "img": "q20",
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
   "cred": "Poze (Wikimedia Commons): Denis Desaulniers, Bernard Têtu · CC BY-SA 4.0; Patho · CC BY-SA 3.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Ficat!! → !!Steatoză hepatică difuză!! (ficat gras)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Acumularea de trigliceride în citoplasma hepatocitelor!!, difuz în tot ficatul; o leziune **reversibilă**."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● ficat **mult mărit, greu**, margini **rotunjite, boante** ● culoare **galbenă, uniformă** (galben-lutoasă pe piesa fixată) ● suprafață **netedă, lucioasă**, capsulă destinsă ● consistență **moale, păstoasă** ● pe secțiune: **galben, unsuros**, lama cuțitului rămâne grasă; desen lobular șters ● **fără noduli**, cicatrici sau zone hemoragice."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **alcoolismul** (tipic formei difuze) ● **obezitatea și diabetul** ● **malnutriția proteică** ● **hipoxia** și toxicele hepatice."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● **steatohepatită** ● **ciroză** dacă stimulul persistă ● **regresează** dacă alcoolul e oprit."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **pancreatită acută** (piesa 20). = organ abdominal mărit, moale, gălbui pe alocuri, cu leziune legată de grăsime (steatoză ≠ steatonecroză). ≠ ① La mine ficatul e !!galben uniform!!, difuz, fără hemoragii; la pancreatită aspect pestriț: zone roșu-negricioase de hemoragie și necroză. ② La mine grăsimea e **în hepatocite** (vacuole), leziune reversibilă; la pancreatită grăsimea e necrozată și saponificată cu calciul: pete alb-cretoase (citosteatonecroză). ③ La mine capsula e **netedă, lucioasă**, destinsă; la pancreatită capsula e ștearsă, cu sufuziuni hemoragice, țesut friabil. Alternative: Rinichi de șoc · Infarct renal · Ciroza hepatică · Amiloidoza hepatică."
   }
  ]
 },
 "20": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus desenul piesei (pancreas pe secțiune: hemoragie + pete alb-cretoase de citosteatonecroză; nu avem poză reală), jos-stânga poza la microscop, jos-dreapta partenerul de DD.",
  "kick": "Piesa 20 · Pancreatită acută",
  "title": "Pancreas tumefiat, pestriț: hemoragie + pete alb-cretoase",
  "hud": [
   "piesa 20 din 26"
  ],
  "sceneOpts": {
   "main": {
    "draw": "pancreas",
    "W": 1000,
    "H": 934,
    "marks": []
   },
   "sub": {
    "img": "q20",
    "W": 900,
    "H": 599,
    "marks": [
     {
      "x": 620,
      "y": 440,
      "rx": 160,
      "ry": 110
     },
     {
      "x": 270,
      "y": 340,
      "rx": 70,
      "ry": 160,
      "rot": 0.45
     }
    ],
    "cap": "la microscop"
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
   "cred": "Sus: desen (pancreas pe secțiune). Poze (Wikimedia Commons): Patho · CC BY-SA 3.0; Denis Desaulniers, Bernard Têtu · CC BY-SA 4.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Pancreas!! (cu duoden) → !!Pancreatită acută hemoragico-necrotică!! cu citosteatonecroză."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Inflamație acută a pancreasului prin autodigestie enzimatică!!, cu necroză, hemoragie și necroză a grăsimii (steatonecroză)."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● pancreas **mărit în volum, greu, edemațiat**, lobulația ștearsă ● aspect **pestriț**: zone roșu-negricioase de hemoragie și necroză ● **pete alb-gălbui, cretoase**, de câțiva mm: citosteatonecroză ● petele apar și pe **grăsimea peripancreatică** și mezenter ● consistență **moale, friabilă** în zonele necrozate ● capsula ștearsă, cu **sufuziuni hemoragice**."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● **litiaza biliară**: calcul care obstruează ampula Vater ● **alcoolul**: spasm Oddi, dopuri proteice, toxicitate directă ● **activarea tripsinei** în pancreas (mecanismul comun)."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **șoc și CID** ● **insuficiență respiratorie** ● **hipocalcemie** (calciul fixat în săpunuri) ● local: **pseudochist, abces, sechestru**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **steatoză hepatică** (piesa 19). = organ abdominal mărit, moale, cu leziune legată de grăsime (steatonecroză ≠ steatoză). ≠ ① La mine aspect !!pestriț!!: zone roșu-negricioase de hemoragie și necroză; la steatoză ficatul e galben uniform. ② La mine pete alb-cretoase de **citosteatonecroză** (săpunuri de calciu), și pe grăsimea din jur; la steatoză grăsimea e în hepatocite, fără pete. ③ La mine capsula e ștearsă, cu **sufuziuni hemoragice**, țesut friabil; la steatoză capsula e netedă, lucioasă, destinsă. Alternative: Infarct pulmonar · Litiază biliară · Autoliza postmortem a pancreasului · Pancreatita cronică (litiazică)."
   }
  ]
 },
 "21": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 21 · Litiază renală",
  "title": "Calculi în bazinet, cavități dilatate: hidronefroză",
  "hud": [
   "piesa 21 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p21",
    "W": 778,
    "H": 900,
    "marks": [
     {
      "x": 400,
      "y": 470,
      "rx": 95,
      "ry": 80,
      "lab": "bazinetul dilatat",
      "ly": 575
     },
     {
      "x": 450,
      "y": 305,
      "rx": 65,
      "ry": 55,
      "lab": "calice dilatate",
      "lx": 560,
      "ly": 230
     },
     {
      "x": 130,
      "y": 560,
      "rx": 45,
      "ry": 120,
      "lab": "ureterul, cu calculi galbeni",
      "lx": 170,
      "ly": 715
     },
     {
      "x": 590,
      "y": 520,
      "rx": 60,
      "ry": 120,
      "lab": "parenchimul, subțiat pe alocuri",
      "lx": 600,
      "ly": 670
     }
    ]
   },
   "sub": {
    "img": "d21",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): Denis Desaulniers, Bernard Têtu · CC BY-SA 4.0; Emmanuelm · CC BY 3.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Rinichi!! → !!Nefrolitiază cu hidronefroză secundară!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Formarea de calculi în bazinet și calice prin precipitarea sărurilor!! dintr-o urină suprasaturată; o **distrofie minerală**."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● rinichi secționat: **calculi în bazinet și calice** ● calculi de la **mm la cm**: multipli, fațetați sau unici, **coraliformi** ● culoare **galben-brună** (oxalat, urat) sau **alb-cenușie** (fosfat) ● consistență **dură, pietroasă**; suprafață rugoasă sau netedă ● bazinet și calice **dilatate: hidronefroză** ● parenchim **subțiat, atrofic**; cu infecție, puroi: **pionefroză**."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **suprasaturarea urinei** (oxalat, calciu, urat, cistină) ● **hipercalciuria, guta, deshidratarea** ● **infecția cu germeni cu urează** (Proteus): calculi coraliformi ● **lipsa inhibitorilor** cristalizării (citratul)."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● **hidronefroza** cu atrofia parenchimului ● **pielonefrita și pionefroza** ● clinic: **colică renală și hematurie**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **litiază biliară** (piesa 22). = calculi duri, formați prin precipitarea unei soluții suprasaturate, care obstruează și favorizează infecția. ≠ ① La mine calculii sunt în !!bazinet, calice și ureter!!; la litiaza biliară sunt în vezicula biliară, cu mucoasă verzuie. ② La mine calculi de **oxalat, fosfat, urat** (galben-bruni sau alb-cenușii, adesea coraliformi); la litiaza biliară de colesterol (galbeni) sau pigmentari (negri), fațetați. ③ La mine cavități dilatate și parenchim subțiat: **hidronefroză**; la litiaza biliară peretele veziculei e îngroșat, fibros (colecistită cronică). Alternative: Rinichi de șoc · Infarct renal."
   }
  ]
 },
 "22": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 22 · Litiază biliară",
  "title": "Calculi fațetați într-o veziculă cu perete gros, fibros",
  "hud": [
   "piesa 22 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p22",
    "W": 900,
    "H": 549,
    "marks": [
     {
      "x": 620,
      "y": 260,
      "rx": 180,
      "ry": 140,
      "lab": "calculi negri-bruni, fațetați",
      "ly": 420
     },
     {
      "x": 290,
      "y": 215,
      "rx": 175,
      "ry": 90,
      "rot": -0.2,
      "lab": "calculi mari, galbeni",
      "lx": 270,
      "ly": 335
     },
     {
      "x": 830,
      "y": 330,
      "rx": 45,
      "ry": 120,
      "lab": "peretele îngroșat, fibros",
      "lx": 760,
      "ly": 480
     }
    ]
   },
   "sub": {
    "img": "d22",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): Emmanuelm · CC BY 3.0; Denis Desaulniers, Bernard Têtu · CC BY-SA 4.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Vezicula biliară!! → !!Colelitiază cu colecistită cronică litiazică!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Formarea de calculi în vezicula biliară prin precipitarea colesterolului sau a bilirubinei!! dintr-o bilă litogenă."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● veziculă deschisă: **calculi multipli, fațetați** (se presează unii pe alții) ● de la **mm la 1–2 cm**; **galben-bruni** (micști) sau **negri** (pigmentari) ● consistență **dură**; pe secțiune straturi concentrice sau cristale radiare ● perete **îngroșat, fibros**, alb-cenușiu ● mucoasă **verzuie, aplatizată, atrofică**: colecistită cronică ● uneori **calcul inclavat în col**, veziculă destinsă."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **exces de colesterol** față de sărurile biliare (femei, obezi, peste 40 de ani) ● **sarcina și estrogenii** ● **hemoliza cronică** (exces de bilirubină neconjugată): calculi pigmentari ● **staza biliară** prin hipomotilitate."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **colecistită acută, empiem, hidrops** (calcul în cistic) ● **coledocolitiază** cu icter obstructiv ● **pancreatită acută** (obstrucția ampulei) ● **fistulă bilio-digestivă**, ileus biliar; carcinom al veziculei."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **litiază renală** (piesa 21). = calculi duri, formați prin precipitarea unei soluții suprasaturate, care obstruează și favorizează infecția. ≠ ① La mine calculii sunt în !!vezicula biliară!!, cu mucoasă verzuie; la litiaza renală sunt în bazinet, calice și ureter. ② La mine calculi de **colesterol** (galbeni, mari) sau pigmentari (negri, mici), fațetați; la litiaza renală oxalat, fosfat, urat, adesea coraliformi. ③ La mine peretele e **îngroșat, fibros**, mucoasa atrofică (colecistită cronică); la litiaza renală cavitățile dilatate, parenchim subțiat (hidronefroză). Alternative: Pancreatită acută hemoragico-necrotică · Steatoză hepatică · Colecistita acută / empiemul."
   }
  ]
 },
 "23": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 23 · Pericardită fibrinoasă",
  "title": "Epicardul mat, vilos: „cordul păros”",
  "hud": [
   "piesa 23 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p23",
    "W": 515,
    "H": 900,
    "marks": [
     {
      "x": 300,
      "y": 520,
      "rx": 150,
      "ry": 200,
      "lab": "epicard mat, vilos (fibrină)",
      "ly": 740
     },
     {
      "x": 220,
      "y": 170,
      "rx": 130,
      "ry": 90,
      "lab": "baza: vasele mari",
      "ly": 40
     },
     {
      "x": 380,
      "y": 770,
      "rx": 110,
      "ry": 65,
      "lab": "vârful cordului",
      "lx": 330,
      "ly": 860
     }
    ]
   },
   "sub": {
    "img": "d23",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): Denis Desaulniers, Bernard Têtu · CC BY-SA 4.0; Mikael Häggström · CC0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Inimă!! (epicard) → !!Pericardită fibrinoasă!! (cor villosum)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Inflamație acută a pericardului cu exsudat bogat în fibrină!! depus pe foițele seroase."
   },
   {
    "tm": "3 · Descriere",
    "at": "5 p",
    "tx": "● cord de dimensiuni **normale sau ușor mărit**, formă păstrată ● epicardul și-a pierdut luciul, e **mat** ● depozite **cenușiu-gălbui, aspre, viloase, franjurate**, mai abundente la bază ● depozitele sunt **friabile**, se desprind ușor, dedesubt suprafață congestionată ● aspect de **„cord păros”** sau „pâine cu unt”."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **uremia** ● **infarctul miocardic transmural** ● **reumatismul articular acut** ● **virozele și lupusul**."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● **organizare cu aderențe** pericardice ● **pericardită constrictivă** ● clinic: **frecătură pericardică** și durere."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **infarct miocardic acut** (piesa 10). = cord cu leziune gălbuie pe fond roșu-brun; IMA transmural poate da chiar pericardită fibrinoasă. ≠ ① La mine depozitele sunt !!pe suprafața epicardului!!, difuz; la IMA aria e în grosimea peretelui VS, transmurală, văzută pe secțiune. ② La mine depozite **aspre, viloase**, friabile („cord păros”); la IMA arie galben-palidă, lutoasă, moale, cu margine roșie. ③ La mine depozitele **se desprind ușor**, dedesubt suprafață congestionată; la IMA un focar hemoragic în perete, aria nu se desprinde. Alternative: Aortă cu tromb parietal · Leptomeningită purulentă · Pericardita hemoragică · Epicardul normal."
   }
  ]
 },
 "24": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 24 · Abces cerebral",
  "title": "O cavitate cu puroi și capsulă netedă, cu edem în jur",
  "hud": [
   "piesa 24 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p24",
    "W": 675,
    "H": 900,
    "marks": [
     {
      "x": 480,
      "y": 750,
      "rx": 120,
      "ry": 90,
      "lab": "cavitatea abcesului, margini neregulate",
      "lx": 420,
      "ly": 862
     },
     {
      "x": 330,
      "y": 640,
      "rx": 110,
      "ry": 60,
      "lab": "țesut din jur palid, edemațiat",
      "lx": 300,
      "ly": 548
     },
     {
      "x": 300,
      "y": 270,
      "rx": 120,
      "ry": 110,
      "lab": "emisfera pe secțiune",
      "ly": 405
     }
    ]
   },
   "sub": {
    "img": "d24",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): Netha Hussain · CC BY-SA 3.0; Denis Desaulniers, Bernard Têtu · CC BY-SA 4.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Creier!! → !!Abces cerebral încapsulat!!."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Colecție circumscrisă de puroi în parenchimul cerebral!!, delimitată de o **capsulă fibro-glială**, cu necroză de lichefiere."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● cavitate de **câțiva cm, unică, rotund-ovalară**, bine delimitată ● sediu: **substanța albă**, la joncțiunea cu cortexul sau profund ● conținut **galben-verzui, cremos, purulent** (pe piesa fixată poate fi goală) ● perete **neted, alb-cenușiu, ferm**: capsula fibro-glială, mai subțire spre ventricul ● țesutul din jur **moale, palid, edemațiat** ● **efect de masă**: ventricul comprimat, linia mediană deviată."
   },
   {
    "tm": "4 · Cauze",
    "at": "4 p",
    "tx": "● **contiguitate**: otită, mastoidită, sinuzită ● **cale hematogenă**: endocardită, abces pulmonar ● **traumatism** ● **germeni**: streptococi, stafilococi, anaerobi."
   },
   {
    "tm": "5 · Complicații",
    "at": "3 p",
    "tx": "● **hipertensiune intracraniană** prin edem ● **herniere cerebrală** ● **ruptura în ventricul** cu ventriculită (cea mai gravă)."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **hematom intracerebral** (piesa 11). = creier pe secțiune, cu leziune profundă în parenchim, edem în jur și efect de masă. ≠ ① La mine conținut de !!puroi!! galben-verzui (pe piesa fixată gol sau cenușiu-gălbui); la hematom un cheag roșu-negricios, friabil. ② La mine cavitatea are **capsulă** proprie, netedă, alb-cenușie, fermă; la hematom sângele disecă țesutul, fără perete propriu. ③ La mine ventriculul e **comprimat**, fără sânge (risc de ruptură în ventricul); la hematom sânge în ventriculi (inundație ventriculară). Alternative: Leptomeningită purulentă · Bronhopneumonie · Infarctul cerebral (pseudochist)."
   }
  ]
 },
 "25": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 25 · Leptomeningită purulentă",
  "title": "Puroi galben-verzui pe vase și în șanțuri; meningele opace",
  "hud": [
   "piesa 25 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p25",
    "W": 604,
    "H": 900,
    "marks": [
     {
      "x": 160,
      "y": 520,
      "rx": 105,
      "ry": 120,
      "lab": "exsudat galben-verzui",
      "lx": 110,
      "ly": 740
     },
     {
      "x": 270,
      "y": 380,
      "rx": 60,
      "ry": 50,
      "lab": "dura ridicată cu pensa",
      "lx": 400,
      "ly": 450
     },
     {
      "x": 250,
      "y": 650,
      "rx": 80,
      "ry": 55,
      "lab": "puroi pe traiectul vaselor",
      "lx": 420,
      "ly": 765
     }
    ]
   },
   "sub": {
    "img": "d25",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): CDC / Edwin P. Ewing, Jr. · domeniu public; Netha Hussain · CC BY-SA 3.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Creier!! (leptomeninge) → !!Leptomeningită acută purulentă!! (bacteriană)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Inflamație acută purulentă a leptomeningelui!! (pia și arahnoida), cu exsudat de neutrofile în **spațiul subarahnoidian**."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● leziune **difuză** pe convexitatea emisferelor, posibil și la bază ● leptomeninge **opace, îngroșate, mate**, nu transparente ● exsudat **galben-verzui, cremos**, de-a lungul vaselor și în șanțuri ● vase meningeale **congestionate** ● girusuri **aplatizate**, șanțuri șterse: edem cerebral ● pe secțiune: exsudatul rămâne **la suprafață**, cortexul intact."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● **meningococul, pneumococul, Haemophilus influenzae** ● la nou-născut: **E. coli și streptococul de grup B** ● căi: **hematogenă**, contiguitate (otită, sinuzită), fractură."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **hidrocefalie** ● **vasculită cu infarcte** ● **abces cerebral** ● **surditate**; vindecare cu fibroza meningelui."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **abces cerebral** (piesa 24). = inflamație purulentă (neutrofile) în cutia craniană, cu edem cerebral; germeni piogeni (bacterii), ajunși pe aceleași căi (contiguitate, hematogen). ≠ ① La mine puroiul e !!la suprafață!!, în spațiul subarahnoidian; la abces e în parenchim. ② La mine leziunea e **difuză**, de-a lungul vaselor și în șanțuri; la abces colecție circumscrisă, rotund-ovalară. ③ La mine **fără capsulă**: meninge opace, îngroșate, cortexul intact pe secțiune; la abces cavitate cu capsulă fibro-glială netedă. Alternative: Hemoragii intracraniene (hematom intracerebral) · Pericardită fibrinoasă · Hemoragia subarahnoidiană · Meningita TBC."
   }
  ]
 },
 "26": {
  "scene": "prep",
  "layout": "script",
  "anim": false,
  "spec": "Static: sus poza reală (cum o vezi la examen) cu structurile încercuite; jos-stânga detaliu, jos-dreapta partenerul de DD; badge-ul se aprinde pe structura rubricii.",
  "kick": "Piesa 26 · Bronhopneumonie",
  "title": "Focare gălbui, centrate pe bronhiole, pe fond congestionat",
  "hud": [
   "piesa 26 din 26"
  ],
  "sceneOpts": {
   "main": {
    "img": "p26",
    "W": 900,
    "H": 593,
    "marks": [
     {
      "x": 240,
      "y": 240,
      "rx": 62,
      "ry": 52,
      "lab": "focar gălbui",
      "ly": 315
     },
     {
      "x": 600,
      "y": 470,
      "rx": 125,
      "ry": 70,
      "lab": "focare confluente",
      "ly": 562
     },
     {
      "x": 462,
      "y": 88,
      "rx": 42,
      "ry": 38,
      "lab": "bronhie",
      "lx": 560,
      "ly": 60
     },
     {
      "x": 845,
      "y": 400,
      "rx": 50,
      "ry": 150,
      "lab": "pleura",
      "lx": 840,
      "ly": 575
     }
    ]
   },
   "sub": {
    "img": "d26",
    "W": 360,
    "H": 240,
    "marks": [],
    "cap": "detaliu"
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
   "cred": "Poze (Wikimedia Commons): Yale Rosen · CC BY-SA 2.0."
  },
  "script": [
   {
    "tm": "1 · Organ · leziune",
    "at": "1 p + 1 p",
    "tx": "!!Plămân!! → !!Bronhopneumonie!! (pneumonie lobulară, în focare)."
   },
   {
    "tm": "2 · Definiție",
    "at": "1 p",
    "tx": "!!Inflamație acută purulentă a plămânului în focare lobulare multiple!!, centrate pe bronhiole, cu parenchim aerat între ele."
   },
   {
    "tm": "3 · Descriere",
    "at": "6 p",
    "tx": "● **focare multiple** de condensare, **1–3 cm**, cât un lobul, unele confluente ● **bilaterale**, predominant bazal și posterior ● **prost delimitate**, centrate pe o bronhiolă cu exsudat purulent la apăsare ● culoare **gălbui-cenușie** pe fond roșu, congestionat ● focare **ferme**, nu crepită, bombează pe secțiune; între ele plămân aerat ● pleura lucioasă sau **cu fibrină** deasupra focarelor subpleurale."
   },
   {
    "tm": "4 · Cauze",
    "at": "3 p",
    "tx": "● **germeni**: stafilococ, streptococ, Haemophilus, Pseudomonas ● **aspirația** și extensia descendentă după o viroză ● **teren**: vârstnici, copii mici, imobilizați, debilitați (tuse slabă)."
   },
   {
    "tm": "5 · Complicații",
    "at": "4 p",
    "tx": "● **abces pulmonar** ● **empiem pleural** ● **septicemie** ● vindecare cu **fibroză**."
   },
   {
    "tm": "6 · DD",
    "at": "✓",
    "tx": "Cu **infarct pulmonar** (piesa 9). = plămân cu zone consolidate, ferme, care nu crepită, pe fond congestionat. ≠ ① La mine focare !!multiple, gălbui-cenușii!!, de 1–3 cm, bilaterale; la infarct o zonă unică (sau puține), roșu-negricioasă. ② La mine focarele sunt **centrate pe bronhiole**, prost delimitate, la apăsare iese puroi; la infarct zonă cuneiformă, net delimitată, baza la pleură. ③ La mine exsudat **purulent** (neutrofile + fibrină), între focare plămân aerat; la infarct alveole pline de sânge, necroză ischemică după embol. Alternative: Tromb călăreț (tromboembol în a. pulmonară) · Abces cerebral · Pneumonia lobară · Tuberculoza miliară."
   }
  ]
 }
};
