// Fișele OSPE pe preparat, generate din fișele deck-urilor anatopat-z1…z4 (aliniate la LP: S1, S2). Roșu (!!…!!) = ce dă puncte.
// Din 09.11.2026: fiecare preparat = 2 slide-uri în layoutul recapitulării de Histo (1/2 organ·leziune·definiție·descriere, 2/2 cauze·complicații·DD).
export const PREPS = {
 "1": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Lama 1 · Edem pulmonar acut · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Plămân!!, colorația **HE** → !!Edem pulmonar acut!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Edemul = !!acumulare de lichid interstițial în țesuturi!!; în plămân, lichidul (transsudat) expandează septurile și umple alveolele."
     ]
    },
    {
     "h": "Descriere · 5 p",
     "d": [
      "ob. mic: spații alveolare pline cu o **substanță omogenă, eozinofilă** (edem alveolar)",
      "septuri interalveolare **ușor expandate** de lichid (edem interstițial)",
      "lichidul de edem (**transsudat**), extravazat brusc, amestecat cu **spații optic goale: bule de aer**",
      "!!vase congestionate!!",
      "pe piesă: plămâni de **volum și greutate crescute**; la secțiune se elimină lichid **roz, spumos, aerat**."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Lama 1 · Edem pulmonar acut · 2/2",
   "title": "Edem pulmonar acut: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 3 p",
     "d": [
      "!!creșterea presiunii hidrostatice!! (insuficiența cardiacă)",
      "**scăderea presiunii coloid-osmotice (oncotice)**: malnutriție, sinteză hepatică scăzută, sindrom nefrotic",
      "dezechilibrul presiunilor dilată patul capilar și **permeabilizează bariera endotelială** → transsudat (sărac în proteine, densitate sub 1012)."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**insuficiență respiratorie acută** (alveolele pline cu lichid fac greu schimbul de gaze)",
      "**suprainfecție → bronhopneumonie** (preparatul 26)",
      "dacă insuficiența cardiacă stângă persistă: **stază pulmonară cronică cu fibroză** (preparatul 2). (nu sunt în LP)"
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **stază cronică + infarct pulmonar** (lama 2)",
      "asemănarea: plămân în HE, cu vase congestionate",
      "① în alveole transsudat omogen, eozinofil, cu bule de aer, nu siderofage cu pigment brun",
      "② septuri doar ușor expandate de lichid, nu îngroșate, fibrozate",
      "③ fără necroză; lama 2 are și zonă de infarct (alveole inundate hemoragic, septuri fără nuclei, lizereu congestiv).",
      "alternative: **zona de infarct din lama 2** (septuri necrozate, fără nuclei; la mine septuri viabile) · **pericardită fibrinoasă** (lama 15: fibrină pe epicard, nu lichid în alveole)."
     ]
    }
   ]
  }
 ],
 "2": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga zona de infarct, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Lama 2 · Plămân de stază cronică + infarct pulmonar hemoragic · 1/2",
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
     "Descriere · infarctul"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Plămân!!, colorația **HE** → !!Plămân de stază cronică (congestie pulmonară cronică) cu infarct pulmonar!! (roșu, hemoragic)."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Congestia = !!proces pasiv, prin alterarea drenajului sanguin venos → stază!!. Infarctul = **necroza unui țesut cauzată de aportul insuficient de sânge oxigenat**."
     ]
    },
    {
     "h": "Descriere · staza · 3 p",
     "d": [
      "**septuri interalveolare îngroșate, fibrozate, cu vase congestionate**",
      "în spațiile alveolare: **siderofage (celule cardiace)** cu pigment brun de hemosiderină, izolate sau grupate",
      "hemosiderina provine din **degradarea hematiilor extravazate** din vasele congestionate."
     ]
    },
    {
     "h": "Descriere · infarctul · 5 p",
     "d": [
      "**zonă bine delimitată**, cu alveole **inundate hemoragic** și alveolocite necrozate",
      "**arhitectura păstrată**, aspect umbriform, **fără nuclei**",
      "parenchimul adiacent cu **modificări de stază cronică**",
      "la limită: !!lizereu congestiv!! (vase congestionate, eritrocite extravazate, infiltrat inflamator acut)",
      "un **sept conjunctiv intersegmentar** limitează pătrunderea sângelui în teritoriile vecine."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga zona de infarct, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Lama 2 · Plămân de stază cronică + infarct pulmonar hemoragic · 2/2",
   "title": "Plămân de stază cronică + infarct pulmonar hemoragic: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 3 p",
     "d": [
      "staza: !!alterarea drenajului venos!! (congestia din **insuficiența cardiacă**)",
      "infarctul: **obstrucția unei ramuri a arterei pulmonare (TEP)**, de obicei dintr-o TVP a membrelor inferioare",
      "infarctul apare **doar pe o stază cronică preexistentă**: presiunea crescută împiedică suplinirea prin ramurile bronșice."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**hemoptizie** (sânge în spută)",
      "**pleurită fibrinoasă** deasupra infarctului (ca pericardita fibrinoasă, preparatele 15, 23)",
      "**suprainfecție → abces pulmonar** (ca abcesele hepatice, preparatul 16). (nu sunt în LP)"
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **edem pulmonar acut** (lama 1)",
      "asemănarea: plămân în HE, cu vase congestionate",
      "① în alveole siderofage (celule cardiace) cu pigment brun, nu substanță omogenă cu bule de aer",
      "② septuri îngroșate, fibrozate, nu doar ușor expandate",
      "③ am și zonă de infarct (alveole inundate hemoragic, septuri fără nuclei, lizereu congestiv); edemul nu are necroză.",
      "alternative: **infarct renal** (lama 3: infarct alb, palid, nu inundat hemoragic) · **tromb mixt** (lama 5: hematiile stau în straturi, în lumenul vasului, nu în alveole)."
     ]
    }
   ]
  }
 ],
 "3": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Lama 3 · Infarct renal anemic · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Rinichi!!, colorația **HE** → !!Infarct renal acut (alb, anemic, ischemic)!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "!!Necroza unei porțiuni din parenchimul renal, datorită obstrucției ramurii arteriale care deservește teritoriul respectiv!!."
     ]
    },
    {
     "h": "Descriere · 3 p",
     "d": [
      "**zona de infarct**: palidă, aspect **fantomatic**, prin **pierderea nucleilor, cu păstrarea arhitecturii** (necroză)",
      "**parenchim renal normal** alături",
      "la limită: !!lizereu congestiv!!: capilare congestionate, eritrocite extravazate și **bandă de infiltrat inflamator acut**."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Lama 3 · Infarct renal anemic · 2/2",
   "title": "Infarct renal anemic: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "xtra": "Evoluția (nu e în LP): zona necrozată e înlocuită de țesut de granulație, apoi de o cicatrice.",
   "points": [
    {
     "h": "Cauze · 2 p",
     "d": [
      "!!obstrucția ramurii arteriale!! care deservește teritoriul (tromb/embol arterial)",
      "rinichiul e organ parenchimatos cu **circulație unică** → infarct alb."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**hematurie** (sânge în urină)",
      "uneori **hipertensiune arterială** (zona ischemică din jurul infarctului secretă renină)",
      "infarcte multiple, **bilaterale** → **insuficiență renală** (ca la rinichiul de șoc, preparatul 12). (nu sunt în LP)"
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **infarct miocardic acut** (lama 4)",
      "asemănarea: zonă de infarct fără nuclei, cu lizereu congestiv la limită",
      "① tubi și glomeruli „fantomă”, nu fibre musculare cu sarcoplasmă intens eozinofilă",
      "② lizereul are o bandă (capilare congestionate + infiltrat acut), nu două (granulocite intern, congestie extern)",
      "③ alături parenchim renal normal, nu țesut de granulație printre fibre.",
      "alternative: **zona de infarct din lama 2** (infarct roșu, inundat hemoragic, nu palid) · **abcese hepatice** (lama 16: țesutul lipsește, înlocuit de puroi; la mine arhitectura rămâne)."
     ]
    }
   ]
  }
 ],
 "4": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Lama 4 · Infarct miocardic acut · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Miocard!! (cord), colorația **HE** → !!Infarct miocardic acut!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Infarctul = !!necroza unui țesut cauzată de aportul insuficient de sânge oxigenat!!; aici, a miocardului."
     ]
    },
    {
     "h": "Descriere · 5 p",
     "d": [
      "zonă **bine conturată**: fibre musculare **lipsite de nuclei**, sarcoplasmă **omogenă, intens eozinofilă**",
      "la periferie: !!lizereu congestiv!!: bandă internă de **granulocite**, bandă externă de **congestie**",
      "zona necrozată delimitată de **țesut de granulație** (capilare neoformate, histiocite, limfocite, fibroblaști)",
      "țesutul de granulație pătrunde și printre **fibrele normale** ale miocardului vecin",
      "necroza e **vizibilă microscopic după 4–6 ore**."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Lama 4 · Infarct miocardic acut · 2/2",
   "title": "Infarct miocardic acut: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 3 p",
     "d": [
      "!!coronaroscleroza!!",
      "**tromboza/embolia coronarelor**",
      "**spasmul coronarian** (factori de risc: HTA, hiperlipemie, sedentarism, diabet zaharat, stres, fumat)."
     ]
    },
    {
     "h": "Complicații · 10 p",
     "d": [
      "**tulburări de ritm și conducere** (FiV)",
      "**insuficiență cardiacă** (20%)",
      "**șoc cardiogen** (40%)",
      "**ruptura cordului** (miomalacie) → hemopericard, tamponadă",
      "**complicații tromboembolice**",
      "**anevrism cardiac**",
      "**infarctizare progresivă**",
      "**moarte subită**",
      "**insuficiențe valvulare**",
      "**sindrom Dressler** (pericardită)."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **infarct renal** (lama 3)",
      "asemănarea: zonă de infarct fără nuclei, cu lizereu congestiv la limită",
      "① fibre musculare fără nuclei, sarcoplasmă omogenă, intens eozinofilă, nu tubi și glomeruli „fantomă”",
      "② lizereul are două benzi (granulocite intern, congestie extern), nu una",
      "③ necroza e delimitată de țesut de granulație, nu de parenchim normal.",
      "alternative: **pericardită fibrinoasă** (lama 15: fibrină pe epicard, miocardul păstrat) · **abcese hepatice** (lama 16: țesutul lipsește, cu puroi; la mine fibrele își păstrează conturul)."
     ]
    }
   ]
  }
 ],
 "5": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Lama 5 · Tromb mixt (liniile Zahn) · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Vas arterial!! (perete de vas arterial), colorația **HE** → !!Tromb mixt stratificat!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Tromboza = !!coagulare intravasculară și intravitală!!."
     ]
    },
    {
     "h": "Descriere · 4 p",
     "d": [
      "tromb **aderent de peretele vasului arterial**",
      "**rețea de fibrină** în ochiurile căreia se depun alternativ leucocite și trombocite, apoi eritrocite",
      "straturi **slab eozinofile** (trombocite + fibrină; palide macroscopic) alternând cu straturi **roșii** (bogate în hematii; roșu închis macroscopic)",
      "= !!liniile lui Zahn!!."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Lama 5 · Tromb mixt (liniile Zahn) · 2/2",
   "title": "Tromb mixt (liniile Zahn): cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 3 p",
     "d": [
      "triada Virchow: !!leziunea endotelială!!",
      "!!fluxul sanguin anormal!!",
      "!!statusul hipercoagulant!!."
     ]
    },
    {
     "h": "Complicații · 4 p",
     "d": [
      "**propagarea** (creșterea în dimensiuni)",
      "**embolizarea** → ram mai mic obstruat → **infarct** (trombii venoși: risc de TEP)",
      "**dizolvarea** (fibrinolitici endogeni sau exogeni: t-PA)",
      "**organizarea/recanalizarea** (endotelizare, înglobare în perete, capilare în grosimea trombului)."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **pericardită fibrinoasă** (lama 15)",
      "asemănarea: fibrină eozinofilă în rețea, cu celule prinse în ochiuri",
      "① masa e în lumenul unui vas arterial, aderentă de perete, nu pe seroasa ulcerată",
      "② straturi alternante palide (trombocite + fibrină) și roșii (hematii) = liniile lui Zahn, nu filamente grosolane cu granulocite și histiocite",
      "③ dedesubt peretele vasului, nu țesut subepicardic îngroșat peste miocard.",
      "alternative: **zona de infarct din lama 2** (hematiile inundă alveolele, nu stau în straturi) · **hipercheratoză** (lama 13: straturi de cheratină fără nuclei, peste epiderm)."
     ]
    }
   ]
  }
 ],
 "6": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: trombul, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 6 · Aortă cu tromb parietal · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Aortă!! (deschisă longitudinal) → !!Aortă cu ateroscleroză și tromb parietal!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Tromboza = !!coagulare intravasculară și intravitală!!; trombul parietal e aderent de peretele aortei."
     ]
    },
    {
     "h": "Descriere · 3 p",
     "d": [
      "**intima aortei**",
      "pe intimă: **plăci aterosclerotice**",
      "pe perete: !!tromb parietal!!, aderent (tromb mixt stratificat)."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: trombul, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 6 · Aortă cu tromb parietal · 2/2",
   "title": "Aortă cu tromb parietal: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 3 p",
     "d": [
      "triada Virchow: !!leziunea endotelială!! (placa aterosclerotică)",
      "**fluxul sanguin anormal**",
      "**statusul hipercoagulant**."
     ]
    },
    {
     "h": "Complicații · 4 p",
     "d": [
      "**propagarea** (trombii arteriali cresc retrograd)",
      "**embolizarea**: migrează distal de cord, obstruă un ram mai mic → **infarct**",
      "**dizolvarea** (fibrinolitici: t-PA)",
      "**organizarea/recanalizarea** (înglobare în perete, capilare în tromb)."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **tromb călăreț** (piesa 7)",
      "asemănarea: aortă cu tromb aderent de perete (coagulare intravasculară și intravitală)",
      "① tromb parietal, pe peretele aortei, nu călare pe bifurcație",
      "② rămâne lipit de perete, nu intră în ambele artere iliace comune",
      "③ se văd plăcile aterosclerotice ale intimei; la piesa 7 se vede mai ales trombul mixt stratificat, mat, friabil.",
      "alternative: **pericardită fibrinoasă** (piesa 23: fibrină pe pericard, „limbă de pisică”) · **hemoragii intracraniene** (piesa 11: sânge extravazat în creier, nu coagulat intravital în aortă)."
     ]
    }
   ]
  }
 ],
 "7": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: trombul, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 7 · Tromb călăreț · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Aorta abdominală!!, cu bifurcația în arterele iliace comune → !!Tromb călăreț!! (tromb călare pe bifurcația aortei)."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Tromboza = !!coagulare intravasculară și intravitală!!; trombul călăreț stă călare pe bifurcația aortei."
     ]
    },
    {
     "h": "Descriere · 4 p",
     "d": [
      "**aorta abdominală** și **bifurcația** în cele două artere iliace comune",
      "trombul stă **călare pe bifurcație**",
      "se extinde în **ambele artere iliace comune**",
      "!!tromb mixt stratificat, aderent, mat, friabil!!."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: trombul, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 7 · Tromb călăreț · 2/2",
   "title": "Tromb călăreț: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 3 p",
     "d": [
      "triada Virchow: !!leziunea endotelială!!",
      "!!fluxul sanguin anormal!!",
      "!!statusul hipercoagulant!!."
     ]
    },
    {
     "h": "Complicații · 4 p",
     "d": [
      "**propagarea** (trombii arteriali cresc retrograd)",
      "**embolizarea**: fragmentele migrează distal, obstruă un ram mai mic → **infarct**",
      "**dizolvarea** (t-PA)",
      "**organizarea/recanalizarea**."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **aortă cu tromb parietal** (piesa 6)",
      "asemănarea: aortă cu tromb aderent de perete (coagulare intravasculară și intravitală)",
      "① trombul stă călare pe bifurcația aortei, nu parietal",
      "② intră în ambele artere iliace comune, nu rămâne lipit de perete",
      "③ se vede trombul mixt stratificat, mat, friabil; la piesa 6 se văd și plăcile aterosclerotice.",
      "alternative: **infarct pulmonar** (piesa 9: zonă triunghiulară roșie-negricioasă, în plămân) · **hemoragii intracraniene** (piesa 11: sânge extravazat, nu coagulat intravital)."
     ]
    }
   ]
  }
 ],
 "8": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga în borcan, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 8 · Infarct renal · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Rinichi!! (secționat) → !!Infarct renal acut (alb, anemic, ischemic)!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "!!Necroza unei porțiuni din parenchimul renal, datorită obstrucției ramurii arteriale care deservește teritoriul respectiv!!."
     ]
    },
    {
     "h": "Descriere · 4 p",
     "d": [
      "**zonă de infarct palidă**, bine conturată",
      "vizibilă și pe **suprafața externă** a rinichiului",
      "conturată de !!lizereul congestiv!!",
      "restul: **parenchim renal normal**."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga în borcan, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 8 · Infarct renal · 2/2",
   "title": "Infarct renal: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "xtra": "Evoluția (nu e în LP): zona necrozată devine, cu timpul, o cicatrice retractată.",
   "points": [
    {
     "h": "Cauze · 2 p",
     "d": [
      "!!obstrucția ramurii arteriale!! (tromb/embol: trombii arteriali migrează distal de cord)",
      "rinichiul are **circulație unică** → infarct alb."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**hematurie** (sânge în urină)",
      "uneori **hipertensiune arterială** (zona ischemică din jurul infarctului secretă renină)",
      "infarcte multiple, **bilaterale** → **insuficiență renală** (ca la rinichiul de șoc, preparatul 12). (nu sunt în LP)"
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **infarct pulmonar** (piesa 9)",
      "asemănarea: infarct (necroză prin aport insuficient de sânge oxigenat), zonă bine delimitată",
      "① zonă palidă, infarct alb (anemic), nu roșie-negricioasă",
      "② rinichiul are circulație unică; plămânul are circulație dublă, cu infarct doar pe stază cronică",
      "③ zona e conturată de lizereu congestiv, vizibilă pe suprafața externă; în jurul infarctului pulmonar e stază cronică.",
      "alternative: **rinichi de șoc** (piesa 12: toată corticala palidă, nu o singură zonă) · **litiază renală** (piesa 21: calculi, calice dilatate, fără necroză)."
     ]
    }
   ]
  }
 ],
 "9": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: stază, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 9 · Infarct pulmonar · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Plămân!! (secționat) → !!Infarct pulmonar (roșu, hemoragic)!!, pe plămân cu stază cronică."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Infarctul = !!necroza unui țesut cauzată de aportul insuficient de sânge oxigenat!!; în plămân apare doar pe o stază cronică preexistentă."
     ]
    },
    {
     "h": "Descriere · 4 p",
     "d": [
      "zonă de infarct, pe secțiune !!triunghiulară, cu vârful spre hil!! (vasul obstrucționat)",
      "**margini bine delimitate**",
      "culoare **roșie-negricioasă**",
      "plămânul din jur: **stază cronică (indurație brună)**: greutate crescută, brun (siderofage), consistență fermă."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: stază, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 9 · Infarct pulmonar · 2/2",
   "title": "Infarct pulmonar: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 3 p",
     "d": [
      "!!obstrucția unei ramuri a arterei pulmonare (TEP)!!, cu trombul migrat dintr-o TVP",
      "**stază pulmonară cronică preexistentă**",
      "presiunea crescută împiedică suplinirea prin ramurile bronșice."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**hemoptizie** (sânge în spută)",
      "**pleurită fibrinoasă** deasupra infarctului (ca pericardita fibrinoasă, preparatele 15, 23)",
      "**suprainfecție → abces pulmonar** (ca abcesele hepatice, preparatul 16). (nu sunt în LP)"
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **infarct renal** (piesa 8)",
      "asemănarea: infarct (necroză prin aport insuficient de sânge oxigenat), zonă bine delimitată",
      "① zonă roșie-negricioasă (hemoragic), nu palidă",
      "② plămânul are circulație dublă, infarctul apare doar pe stază cronică; rinichiul are circulație unică",
      "③ în jur stază cronică (indurație brună), nu lizereu congestiv cu parenchim normal.",
      "alternative: **bronhopneumonie** (piesa 26: focare multiple, bilaterale, nu o singură zonă triunghiulară) · **tromb călăreț** (piesa 7: tromb pe bifurcația aortei, nu necroză în plămân)."
     ]
    }
   ]
  }
 ],
 "10": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga felii de cord, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 10 · Infarct miocardic acut · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Cord!! (secțiune prin ventriculi: VD, VS, sept interventricular) → !!Infarct miocardic acut!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Infarctul = !!necroza unui țesut cauzată de aportul insuficient de sânge oxigenat!!; aici, a miocardului."
     ]
    },
    {
     "h": "Descriere · 5 p",
     "d": [
      "în peretele VS: **zonă hiperemică** (aspect la aprox. 12–24 h)",
      "zona pe cale de necroză e **mai palidă**, înconjurată de un **halou hiperemic**",
      "după 2–3 zile: **galben ca lutul**, omogen, consistență moale",
      "după câteva săptămâni: **țesut cicatriceal alb-sidefiu**",
      "extinderea: **transmural** (toată grosimea), **intramural** sau **subendocardic** (1/3 internă)."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga felii de cord, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 10 · Infarct miocardic acut · 2/2",
   "title": "Infarct miocardic acut: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 3 p",
     "d": [
      "**coronaroscleroza**",
      "**tromboza/embolia coronarelor**",
      "**spasmul coronarian**."
     ]
    },
    {
     "h": "Complicații · 10 p",
     "d": [
      "**tulburări de ritm** (FiV)",
      "**insuficiență cardiacă**",
      "**șoc cardiogen**",
      "!!ruptura cordului!! (miomalacie, 5–10 zile) → hemopericard, tamponadă",
      "**tromboembolii**",
      "**anevrism cardiac**",
      "**infarctizare progresivă**",
      "**moarte subită**",
      "**insuficiențe valvulare**",
      "**sindrom Dressler**."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **pericardită fibrinoasă** (piesa 23)",
      "asemănarea: cord; IMA poate da chiar pericardită (epistenocardică, sindromul Dressler)",
      "① leziunea e în grosimea miocardului, nu pe suprafața pericardului",
      "② zonă mai palidă, cu halou hiperemic (2–3 zile: galbenă, moale), nu suprafață mată, „limbă de pisică”",
      "③ complicația gravă e ruptura (miomalacie) cu hemopericard, nu aderențele fibroase.",
      "alternative: **infarct renal** (piesa 8: infarct alb, cu lizereu, în rinichi) · **aortă cu tromb parietal** (piesa 6: tromb pe intimă, nu leziune în miocard)."
     ]
    }
   ]
  }
 ],
 "11": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga subdural (006), jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 11 · Hemoragii intracraniene · hematom intracerebral · 1/2",
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
      "m"
     ],
     null,
     [
      "m",
      0
     ],
     [
      "s"
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere",
     "Descriere · alt borcan"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Creier!! (secționat) → !!Hemoragie intracraniană: hematom intracerebral și intraventricular!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Hemoragia = !!extravazarea sângelui în afara unui vas!!; hemoragia intracerebrală = impregnarea hematică a parenchimului cerebral prin ruperea unei ramuri vasculare intracerebrale."
     ]
    },
    {
     "h": "Descriere · 3 p",
     "d": [
      "sânge în **parenchimul cerebral**: hematom intracerebral",
      "sânge în **ventriculul lateral**: hematom intraventricular (!!inundare ventriculară!!)",
      "ventriculii se inundă direct, dintr-o hemoragie cerebrală adiacentă, sau prin comunicarea cu spațiul subarahnoidian."
     ]
    },
    {
     "h": "Descriere · alt borcan · ",
     "d": [
      "Dacă primești alt borcan (LP are piese și pentru):",
      "**hematom subdural** (craniu secționat): între dura mater și arahnoidă",
      "**hematom subarahnoidian**: între arahnoidă și pia mater, vizibil și în spațiile intergirale. Fără piesă:",
      "**epidural**: între oasele craniene și dura mater, de obicei traumatic."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga subdural (006), jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 11 · Hemoragii intracraniene · hematom intracerebral · 2/2",
   "title": "Hemoragii intracraniene · hematom intracerebral: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 3 p",
     "d": [
      "!!întreruperea continuității peretelui vascular!! (ruperea unei ramuri intracerebrale)",
      "**erodarea peretelui** (proces neoplazic de vecinătate, tuberculom)",
      "**diapedeza** (peretele rămâne integru)."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**hipertensiune intracraniană → herniere cerebrală** (în final a tonsilelor cerebeloase în foramen magnum, ca la abcesul cerebral, preparatul 24)",
      "**hidrocefalie** (sângele din ventriculi blochează circulația LCR)",
      "**sechele neurologice** (hemiplegie, afazie) sau **deces**. (nu sunt în LP)"
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **abces cerebral** (piesa 24)",
      "asemănarea: creier pe secțiune, cu o leziune în parenchim",
      "① conținutul e sânge, nu puroi într-o cavitate rotund-ovalară",
      "② vine din ruperea unei ramuri vasculare intracerebrale, nu din necroză de colicvație cu membrană piogenă",
      "③ sângele poate inunda ventriculii; la abces complicația cea mai severă e hernierea tonsilelor cerebeloase.",
      "alternative: **leptomeningită purulentă** (piesa 25: puroi pe leptomeninge, nu sânge în parenchim) · **tromb călăreț** (piesa 7: sânge coagulat intravital, în aortă)."
     ]
    }
   ]
  }
 ],
 "12": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga borcanul 004, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 12 · Rinichi de șoc · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Rinichi!! (secționat) → !!Rinichi de șoc!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Șocul = !!dezechilibru major între necesarul de oxigen și aportul insuficient într-un anumit organ!!."
     ]
    },
    {
     "h": "Descriere · 4 p",
     "d": [
      "**corticala renală palidă**",
      "**medulara renală hiperemică**",
      "corticala palidă !!bine delimitată de medulara hiperemică!!",
      "microscopic: **necroză tubulară renală reversibilă**, cu glomeruli neafectați."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga borcanul 004, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 12 · Rinichi de șoc · 2/2",
   "title": "Rinichi de șoc: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 5 p",
     "d": [
      "șoc !!hipovolemic!! (hemoragii masive)",
      "**cardiogen** (scade funcția inotropă)",
      "**neurogen** (dilatarea difuză a patului vascular)",
      "**anafilactic**",
      "**septic** (vasodilatație la infecție); mecanism: redistribuția sângelui din corticală spre medulară."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**insuficiență renală acută** (necroză tubulară acută, ca în pancreatita acută, preparatul 20)",
      "**hiperkaliemie → tulburări de ritm** (ca în IMA, preparatele 4, 10)",
      "**supraîncărcare cu lichide → edem pulmonar acut** (preparatul 1). (nu sunt în LP) Evoluția: **stare reversibilă**, funcția de filtrare se suplinește temporar prin **hemodializă**."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **infarct renal** (piesa 8)",
      "asemănarea: rinichi cu zone palide, în contrast cu zone congestionate",
      "① toată corticala e palidă, nu o singură zonă conturată",
      "② roșul e medulara hiperemică, nu lizereul congestiv din jurul zonei",
      "③ leziune reversibilă (necroză tubulară, glomeruli neafectați), nu necroza unei porțiuni de parenchim prin obstrucție arterială.",
      "alternative: **litiază renală** (piesa 21: calculi coraliformi, calice dilatate) · **steatoză hepatică** (piesa 19: ficat mărit, gălbui, grăsos la secțiune)."
     ]
    }
   ]
  }
 ],
 "13": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Lama 13 · Hipercheratoză · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Piele!!, colorația **HE** → !!Hipercheratoză!! (clavus)."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Proces patologic al pielii: !!îngroșarea ei ca urmare a unei acțiuni mecanice prelungite!! asupra țesutului cutanat."
     ]
    },
    {
     "h": "Descriere · 5 p",
     "d": [
      "epiderm cu !!strat cornos îngroșat!!: creșterea cantității de cheratină, superficial",
      "strat cornos **fără nuclei**",
      "restul straturilor **fără modificări** (pe una din imagini: acantoză moderată); **fără proliferare epitelială**",
      "**derm și hipoderm normale**",
      "macro: **leziune albă, relativ bine delimitată, sub formă de placă**."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Lama 13 · Hipercheratoză · 2/2",
   "title": "Hipercheratoză: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 1 p",
     "d": [
      "!!acțiunea mecanică prelungită!! asupra pielii (frecare, presiune)."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**durere** la presiune și la mers",
      "**fisuri** ale pielii → **suprainfecție** bacteriană",
      "**ulcerație** (mai ales la diabetici, pe picior). (nu sunt în LP)"
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **granulom de corp străin** (lama 18)",
      "asemănarea: leziune bine delimitată (placa, respectiv formațiunea nodulară)",
      "① la suprafața pielii (strat cornos îngroșat), nu în țesutul mamar",
      "② s-a acumulat cheratină fără nuclei, nu cristale de colesterol",
      "③ fără celule gigante, dermul normal; la lama 18 celule gigante de corp străin, infiltrat cronic, fibroză.",
      "alternative: **pericardită fibrinoasă** (lama 15: fibrină cu granulocite, pe seroasă) · **tromb mixt** (lama 5: straturi de trombocite + fibrină și hematii, în lumenul unui vas)."
     ]
    }
   ]
  }
 ],
 "14": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Lama 14 · Steatoză hepatică · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Ficat!!, colorația **HE** → !!Distrofie adipoasă hepatică (steatoză hepatică)!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Acumularea de !!grăsimi simple în citoplasma celulelor care în condiții fiziologice nu conțin grăsimi vizibile!!."
     ]
    },
    {
     "h": "Descriere · 6 p",
     "d": [
      "**structura lobulară păstrată** (spații porte, vene centrolobulare)",
      "hepatocite cu !!vacuole optic goale!!, rotunde, bine conturate, net delimitate, de mărimi diferite",
      "microvacuolele **confluează în macrovacuole**",
      "vacuolele voluminoase **împing nucleul la periferie**",
      "vacuolele sunt goale: lipidele s-au pierdut la procesare (se evidențiază cu **Sudan III**)",
      "distribuția în lobul: **periferolobulară, centrolobulară sau difuză**."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Lama 14 · Steatoză hepatică · 2/2",
   "title": "Steatoză hepatică: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 5 p",
     "d": [
      "!!consumul cronic de alcool!! (cea mai frecventă)",
      "**intoxicații**: ciuperci, droguri, anumite anestezice",
      "**șoc, hipoxie prelungită**",
      "**aport crescut de grăsimi**",
      "**deficite enzimatice**."
     ]
    },
    {
     "h": "Complicații · 4 p",
     "d": [
      "patologie **reversibilă** la încetarea factorului",
      "dacă persistă: **steatohepatită**",
      "**ciroză**",
      "**carcinom hepatocelular**."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **abcese hepatice** (lama 16)",
      "asemănarea: ficat în HE, cu structura lobulară păstrată",
      "① vacuole optic goale în hepatocite, nucleul împins la periferie, nu teritorii fără țesut hepatic, pline de granulocite",
      "② difuz sau pe zone ale lobulului, nu focare mici delimitate de țesut conjunctiv",
      "③ fără puroi; la abcese globule de puroi, colonii de microbi, hepatocite pe cale de necroză.",
      "alternative: **edem pulmonar acut** (lama 1: lichid omogen, eozinofil, în alveole) · **pericardită fibrinoasă** (lama 15: țesut adipos epicardic, nu vacuole în hepatocite)."
     ]
    }
   ]
  }
 ],
 "15": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Lama 15 · Pericardită fibrinoasă · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Cord (pericard visceral / epicard)!!, colorația **HE** → !!Pericardită fibrinoasă!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Inflamație a pericardului cu apariția unui !!exsudat fibrinos pe suprafață!!; cea mai frecventă formă de tip non-infecțios."
     ]
    },
    {
     "h": "Descriere · 5 p",
     "d": [
      "**structura miocardului păstrată**",
      "țesut subepicardic **îngroșat**, cu **numeroase capilare congestionate**",
      "celule conjunctive și **infiltrat inflamator**: granulocite, limfocite, histiocite",
      "suprafața seroasă **ulcerată**, cu abundentă depunere de fibrină",
      "fibrina: !!rețea de filamente grosolane, roșu-roz!!, cu granulocite și histiocite în ochiuri."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Lama 15 · Pericardită fibrinoasă · 2/2",
   "title": "Pericardită fibrinoasă: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 7 p",
     "d": [
      "**infecții virale**",
      "!!IMA!! (pericardita epistenocardică)",
      "!!uremia!!",
      "**sindromul Dressler**",
      "**RAA** (pancardita reumatică)",
      "**post-radioterapie**",
      "**metastaze tumorale**."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**liza** exsudatului fibrinos",
      "**aderențe fibroase**",
      "**pericardită constrictivă/restrictivă**. Clinic: frecătură pericardică, modificări ECG."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **tromb mixt** (lama 5)",
      "asemănarea: fibrină eozinofilă în rețea, cu celule prinse în ochiuri",
      "① fibrina e pe seroasa ulcerată a epicardului, nu în lumenul unui vas arterial",
      "② filamente grosolane cu granulocite și histiocite, nu straturi alternante (liniile lui Zahn)",
      "③ dedesubt țesut subepicardic îngroșat, congestionat, cu infiltrat, apoi miocardul, nu peretele vasului.",
      "alternative: **infarct miocardic acut** (lama 4: fibre fără nuclei; la mine miocardul e păstrat) · **hipercheratoză** (lama 13: cheratină fără nuclei, peste epiderm)."
     ]
    }
   ]
  }
 ],
 "16": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Lama 16 · Abcese hepatice · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Ficat!!, colorația **HE** → !!Abcese hepatice!!: inflamație purulentă."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Abcesul = !!cavitate cu conținut de puroi!!; inflamația purulentă = exsudare dominată de leucodiapedeză."
     ]
    },
    {
     "h": "Descriere · 5 p",
     "d": [
      "macro: în grosimea ficatului **cavități mici, cu conținut vâscos, galben-verzui**",
      "**structura lobulară păstrată**",
      "teritorii mici, rotunde sau neregulate, unde **lipsește țesutul hepatic**, cu !!număr mare de granulocite!!",
      "**grămezi intens bazofile** (colonii de microbi), **globule de puroi**, hepatocite pe cale de necroză",
      "delimitate de parenchim cu **proliferare de țesut conjunctiv** (abcesul cronic: membrană piogenă)."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Lama 16 · Abcese hepatice · 2/2",
   "title": "Abcese hepatice: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 2 p",
     "d": [
      "!!bacteriile!! (pe lamă: colonii de microbi; puroiul conține bacterii)",
      "**inflamația purulentă**: exsudare dominată de **leucodiapedeză** → puroi (granulocite, globule de puroi, ser, fibrină, detritus, hematii, enzime, bacterii)."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**ruptură în peritoneu → peritonită**",
      "**septicemie** (diseminarea germenilor pe cale sanguină)",
      "extindere prin diafragm → **empiem pleural** (ca la bronhopneumonie, preparatul 26). (nu sunt în LP) Abcesul recent: limite imprecise; abcesul cronic: bine delimitat, cu membrană piogenă."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **limfadenită tuberculoasă** (lama 17)",
      "asemănarea: leziuni focale cu necroză în centru, delimitate de țesutul din jur",
      "① în centru granulocite, globule de puroi, colonii de microbi, nu necroză cazeoasă",
      "② delimitate de membrana piogenă și țesut conjunctiv, nu de epiteloide, Langhans și coroana limfocitară",
      "③ în jur parenchim hepatic cu lobul păstrat, nu țesut limfoid cu foliculi.",
      "alternative: **steatoză hepatică** (lama 14: vacuole optic goale, fără granulocite) · **infarct renal** (lama 3: necroză cu arhitectura păstrată, nu țesut înlocuit de puroi)."
     ]
    }
   ]
  }
 ],
 "17": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Lama 17 · Limfadenită TBC · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Nodul limfatic (ganglion)!!, colorația **HE** → !!Limfadenită tuberculoasă!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Inflamația specifică produsă de **Mycobacterium tuberculosis** (bacilul Koch), cu formarea de !!granuloame specifice: tuberculi, foliculi tuberculoși!!."
     ]
    },
    {
     "h": "Descriere · 6 p",
     "d": [
      "macro: pe secțiune **focare alb-gălbui**",
      "structura **parțial înlocuită de granuloame** izolate sau confluente",
      "în centru: !!necroză cazeoasă!! (omogenă sau fin granulară, acidofilă, fără structuri)",
      "**strat gros de celule epiteloide**",
      "**celule gigante Langhans** (50–150 microni, ~100 nuclei la periferie, coroană sau potcoavă)",
      "la periferie: **coroana limfocitară**; țesut limfoid restant, cu foliculi."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga la ochiul liber, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Lama 17 · Limfadenită TBC · 2/2",
   "title": "Limfadenită TBC: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 2 p",
     "d": [
      "!!Mycobacterium tuberculosis!! (bacilul Koch)",
      "BK transformă histiocitele în epiteloide, **inhibă migrarea granulocitelor și proliferarea capilarelor**."
     ]
    },
    {
     "h": "Complicații · 4 p",
     "d": [
      "**vindecare** clinică: fibroză + calcificare (BK în microbioză latentă)",
      "**propagare directă**: ftizie primară",
      "**propagare hematogenă**: TBC miliară, septicemie Landouzy",
      "**propagare limfogenă**: limfadenită (scrofuloză, ganglionii cervicali)."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **granulom de corp străin** (lama 18)",
      "asemănarea: inflamație cu granuloame și celule gigante multinucleate",
      "① în centru necroză cazeoasă, nu cristale de colesterol",
      "② celula Langhans: nuclei la periferie, în coroană sau potcoavă, nu răspândiți fără ordine",
      "③ granuloamele sunt într-un nodul limfatic, cu țesut limfoid restant, nu în țesut mamar.",
      "alternative: **abcese hepatice** (lama 16: granulocite și puroi, fără epiteloide și Langhans) · **infarct renal** (lama 3: arhitectura păstrată; în cazeum nu mai sunt structuri)."
     ]
    }
   ]
  }
 ],
 "18": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga celule gigante, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Lama 18 · Granulom de corp străin · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Glandă mamară (țesut mamar)!!, colorația **HE** → !!Granulom de corp străin!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "!!Reacție inflamatorie cronică cauzată de pătrunderea în organism a unor corpi străini!!, substanțe organice sau anorganice, care nu pot fi fagocitate de macrofage."
     ]
    },
    {
     "h": "Descriere · 6 p",
     "d": [
      "**formațiune nodulară bine delimitată** de un proces de fibroză",
      "**cristale de colesterol**: spații aciculare optic goale",
      "**celule gigante multinucleate de corp străin** (50–100 microni), din fuziunea macrofagelor",
      "nuclei numeroși, !!răspândiți fără nicio ordine!! în citoplasma abundentă, eozinofilă",
      "**infiltrat inflamator cronic**, macrofage, capilare de neoformație, țesut de granulație",
      "în jur: **țesut mamar normal**."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga celule gigante, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Lama 18 · Granulom de corp străin · 2/2",
   "title": "Granulom de corp străin: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 2 p",
     "d": [
      "!!corpi străini!!, substanțe organice sau anorganice",
      "pe care **macrofagele nu le pot fagocita** (aici: cristale de colesterol)."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**fibroză** → nodul dur, palpabil, care poate fi **confundat cu o tumoră**",
      "**suprainfecție → abces**",
      "**calcificare** (ca în limfadenita TBC vindecată, preparatul 17), vizibilă pe mamografie. (nu sunt în LP)"
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **limfadenită tuberculoasă** (lama 17)",
      "asemănarea: inflamație cu granuloame și celule gigante multinucleate",
      "① în centru cristale de colesterol (spații aciculare optic goale), nu necroză cazeoasă",
      "② nuclei fără nicio ordine, în citoplasmă abundentă, eozinofilă, nu în coroană sau potcoavă (Langhans)",
      "③ în țesut mamar, delimitat de fibroză, nu într-un nodul limfatic.",
      "alternative: **abcese hepatice** (lama 16: granulocite și puroi, fără celule gigante) · **hipercheratoză** (lama 13: strat cornos îngroșat, la suprafața pielii)."
     ]
    }
   ]
  }
 ],
 "19": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga marginea rotunjită, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 19 · Steatoză hepatică · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Ficat!! → !!Steatoză hepatică!! (ficat gras, distrofie adipoasă hepatică)."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Acumularea de !!grăsimi simple în citoplasma celulelor!! care în condiții fiziologice nu conțin grăsimi vizibile."
     ]
    },
    {
     "h": "Descriere · 6 p",
     "d": [
      "ficat **mărit de volum și greutate**",
      "suprafața **netedă, lucioasă**, capsula **tensă**",
      "marginea anterioară **rotunjită**",
      "parenchim **friabil**, de culoare **gălbuie**",
      "pe suprafața de secțiune parenchimul **prolabează peste capsulă**",
      "după secțiune, lama cuțitului are !!aspect grăsos!!."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga marginea rotunjită, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 19 · Steatoză hepatică · 2/2",
   "title": "Steatoză hepatică: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 5 p",
     "d": [
      "!!consumul cronic de alcool!! (cauza cea mai frecventă)",
      "**intoxicații**: ciuperci, droguri, anumite anestezice",
      "**stări de șoc, hipoxie prelungită**",
      "**aport crescut de grăsimi**",
      "**deficite enzimatice**."
     ]
    },
    {
     "h": "Complicații · 4 p",
     "d": [
      "patologie **reversibilă** la încetarea factorului declanșator",
      "dacă factorul persistă: **steatohepatită**",
      "**ciroză**",
      "**carcinom hepatocelular**."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **pancreatită acută** (piesa 20)",
      "asemănarea: organ abdominal cu leziune legată de grăsime, cu zone gălbui (steatoza = grăsimi în hepatocite; steatonecroza = necroza țesutului gras)",
      "① tot ficatul e mărit, gălbui, uniform, nu inomogen, cu focare gălbui-albicioase de 2–6 mm",
      "② suprafață netedă, lucioasă, fără hemoragii, nu zone negricioase de hemoragie",
      "③ lama cuțitului are aspect grăsos, parenchimul prolabează; la pancreatită focarele trec în grăsimea peripancreatică.",
      "alternative: **rinichi de șoc** (piesa 12: corticală palidă, în rinichi) · **infarct renal** (piesa 8: zonă palidă localizată; la mine leziunea e difuză)."
     ]
    }
   ]
  }
 ],
 "20": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga hemoragie (bulina 2), jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 20 · Pancreatită acută · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Pancreas!! (secțiune longitudinală) → !!Pancreatită acută!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Afecțiune !!inflamatorie reversibilă!!: edem local, steatonecroză → necroză parenchimatoasă hemoragică."
     ]
    },
    {
     "h": "Descriere · 4 p",
     "d": [
      "țesut pancreatic cu **structură inomogenă**",
      "!!focare multiple de steatonecroză!! (2–6 mm), **gălbui-albicioase**",
      "focarele se extind și în **țesutul adipos peripancreatic**",
      "**zone extinse de hemoragie**, cu aspect negricios după fixarea în formol."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga hemoragie (bulina 2), jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 20 · Pancreatită acută · 2/2",
   "title": "Pancreatită acută: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 6 p",
     "d": [
      "**metabolice**: !!consumul cronic de alcool!! (cel mai frecvent), hiperlipoproteinemie, hipercalcemie, hipertrigliceridemie, medicamente (azatioprina, diuretice tiazidice, anticonvulsivante)",
      "**genetice**: mutații ale genelor care codifică inhibitori ai tripsinei/tripsinogenului",
      "**mecanice**: obstrucții biliare (calculi migrați, sd. Bouveret), traumatisme, leziuni iatrogene",
      "**vasculare**: șoc, poliarteritis nodosa",
      "**infecțioase**: virusul urlian, Coxsackie",
      "**altele**: neoplasme periampulare, pancreas divisum."
     ]
    },
    {
     "h": "Complicații · 6 p",
     "d": [
      "**colaps vascular, hTA, șoc**",
      "**CID** (activarea cascadei coagulării)",
      "**sindrom de detresă respiratorie acută**",
      "**necroză tubulară acută → insuficiență renală**",
      "**silentium intestinal**: semn de gravitate (ileus, șoc septic, abdomen acut)",
      "**hipocalcemie** (calciul sechestrat în citosteatonecroză)."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **steatoză hepatică** (piesa 19)",
      "asemănarea: organ abdominal cu leziune legată de grăsime, cu zone gălbui (steatonecroza = necroza țesutului gras; steatoza = grăsimi în hepatocite)",
      "① focare multiple, mici (2–6 mm), gălbui-albicioase, pe țesut inomogen, nu ficat gălbui uniform",
      "② zone extinse de hemoragie, negricioase după fixare, nu suprafață netedă, lucioasă",
      "③ focarele trec și în țesutul adipos peripancreatic; la steatoză grăsimea e în hepatocite.",
      "alternative: **infarct pulmonar** (piesa 9: zonă hemoragică în plămân, fără steatonecroză) · **litiază biliară** (piesa 22: calculi în colecist; cauză a pancreatitei în 35–60% din cazuri)."
     ]
    }
   ]
  }
 ],
 "21": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: calculi, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 21 · Litiază renală · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Rinichi!! (secționat) → !!Litiază renală cu hidronefroză!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Formarea de calculi !!la nivelul calicelor renale sau al bazinetului!!."
     ]
    },
    {
     "h": "Descriere · 5 p",
     "d": [
      "rinichi secționat, cu țesut adipos perirenal",
      "!!calculi renali coraliformi!!: ocupă și preiau forma sistemului pielo-caliceal",
      "adesea **mai mulți calculi** în același rinichi",
      "**calice dilatate**",
      "**parenchim renal atrofic** (subțiat): hidronefroză."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: calculi, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 21 · Litiază renală · 2/2",
   "title": "Litiază renală: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 4 p",
     "d": [
      "!!creșterea concentrației substanțelor dizolvate!! (hipercalcemie)",
      "**modificările pH-ului urinar**",
      "**infecțiile bacteriene**",
      "**predispoziția familială**."
     ]
    },
    {
     "h": "Complicații · 4 p",
     "d": [
      "calculii mici migrează în ureter: **colică renală** (durere paroxistică în flanc, iradiere inghinală, hematurie macroscopică)",
      "obstrucție totală → presiune retrogradă → **hidronefroză / uretero-hidronefroză**",
      "hidronefroza trenantă → **insuficiență renală** prin subțierea corticalei",
      "calculii = **factor iritativ local**."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **litiază biliară** (piesa 22)",
      "asemănarea: calculi formați în cavitățile unui organ, care pot migra și pot produce obstrucție",
      "① calculii sunt în calice și bazinet, nu în colecist",
      "② coraliformi, preiau forma sistemului pielo-caliceal, nu colesterolici galbeni sau pigmentari fațetați",
      "③ dau hidronefroză (calice dilatate, parenchim atrofic), nu stază biliară și empiem.",
      "alternative: **rinichi de șoc** (piesa 12: corticală palidă, fără calculi) · **infarct renal** (piesa 8: zonă palidă cu lizereu, în parenchim)."
     ]
    }
   ]
  }
 ],
 "22": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga borcanul 019, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 22 · Litiază biliară · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Colecist!! (vezicula biliară), deschis → !!Litiază biliară!! (colecistolitiază)."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Formarea de !!calculi în vezicula biliară!!, colesterolici sau pigmentari: colesterolul cristalizează când capacitatea de solubilizare a bilei e depășită."
     ]
    },
    {
     "h": "Descriere · 4 p",
     "d": [
      "colecist deschis, cu **calculi** în lumen",
      "calculi **colesterolici**: galbeni, friabili, cu centrul mai negricios",
      "calculi **pigmentari**: multipli, mai mici, până la câteva zeci, **fațetați**",
      "cu săruri de calciu depuse: !!albicioși, cretoși, ca zarurile!!."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga borcanul 019, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 22 · Litiază biliară · 2/2",
   "title": "Litiază biliară: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 11 p",
     "d": [
      "!!hipomotilitatea!! veziculei",
      "**hipersecreția de mucus**",
      "**dieta bogată în grăsimi**",
      "**sexul feminin**",
      "**originea etnică/geografică**",
      "**factori familiali** (deficiențe hormonale moștenite)",
      "**factori de mediu**",
      "**obezitatea**",
      "**medicamente** (clofibrat)",
      "**sarcina**",
      "**scăderea rapidă în greutate**."
     ]
    },
    {
     "h": "Complicații · 6 p",
     "d": [
      "calcul migrat în **ductul cistic**: stază biliară, infectare (**empiem**)",
      "**perforație, fistule**",
      "calcul migrat în **ampula Vater**: sd. Bouveret",
      "**colecistită acută**",
      "**colangită**",
      "iritația cronică a mucoasei → **risc de transformare malignă**."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **litiază renală** (piesa 21)",
      "asemănarea: calculi formați în cavitățile unui organ, care pot migra și pot produce obstrucție",
      "① calculii sunt în colecist, nu în calice și bazinet",
      "② pigmentari multipli, fațetați sau colesterolici galbeni, friabili (cu calciu: albicioși, ca zarurile), nu coraliformi",
      "③ calculul migrat în cistic dă stază biliară, empiem, perforație, fistule, nu hidronefroză.",
      "alternative: **pancreatită acută** (piesa 20: steatonecroză și hemoragii; litiaza biliară îi e cauză) · **steatoză hepatică** (piesa 19: ficat gras, fără calculi)."
     ]
    }
   ]
  }
 ],
 "23": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: fibrina, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 23 · Pericardită fibrinoasă · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Cord!! (pericard) → !!Pericardită fibrinoasă!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Inflamație a pericardului cu apariția unui !!exsudat fibrinos pe suprafață!!; cea mai frecventă formă de tip non-infecțios."
     ]
    },
    {
     "h": "Descriere · 5 p",
     "d": [
      "pericard cu **luciu, umiditate și transparență pierdute**, aspect uscat",
      "suprafață **mată, rugoasă**",
      "**depozite albicioase-cenușii**, neregulate, formate din **fibrină** (falsă membrană)",
      "aspect **vilos, păros**: !!„limbă de pisică”!! sau „pâine unsă cu unt”",
      "la bază, **vasele mari**."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: fibrina, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 23 · Pericardită fibrinoasă · 2/2",
   "title": "Pericardită fibrinoasă: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 7 p",
     "d": [
      "**infecții virale**",
      "!!IMA!! (pericardita epistenocardică)",
      "!!uremia!! (pericardită, pleurită)",
      "**sindromul Dressler** (după IMA)",
      "**RAA** (pancardita reumatică)",
      "**post-radioterapie**",
      "**metastaze tumorale**."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**liza** exsudatului fibrinos",
      "**aderențe fibroase**",
      "**pericardită constrictivă/restrictivă**. Clinic: frecătură pericardică, modificări ECG."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **infarct miocardic acut** (piesa 10)",
      "asemănarea: cord cu leziune vizibilă macroscopic; IMA e și cauză de pericardită (epistenocardică, sindromul Dressler)",
      "① leziunea e pe suprafața pericardului, difuză, nu în peretele VS",
      "② depozite albicioase-cenușii de fibrină („limbă de pisică”), nu zonă palidă cu halou hiperemic",
      "③ pericardul și-a pierdut luciul, umiditatea, transparența; la IMA miocardul devine galben ca lutul, moale.",
      "alternative: **aortă cu tromb parietal** (piesa 6: tromb pe intima aortei) · **leptomeningită purulentă** (piesa 25: exsudat purulent pe leptomeninge, nu fibrinos)."
     ]
    }
   ]
  }
 ],
 "24": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: cavitatea, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 24 · Abces cerebral · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Creier!! (pe secțiune) → !!Abces cerebral!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Proces !!localizat, bine delimitat, înlocuitor de spațiu!!, în care țesutul cerebral suferă necroză de colicvație și e înlocuit cu puroi, înconjurat la periferie de o membrană piogenă."
     ]
    },
    {
     "h": "Descriere · 4 p",
     "d": [
      "cavitate **intraparenchimatoasă**",
      "**rotund-ovalară**, bine delimitată",
      "**conținut purulent**",
      "la periferie, !!membrana piogenă!! (micro: exsudat granulocitar și detritusuri, delimitate printr-o membrană fibroasă)."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: cavitatea, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 24 · Abces cerebral · 2/2",
   "title": "Abces cerebral: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 5 p",
     "d": [
      "!!malformații cardiace cianogene!!",
      "**inflamații cronice supurative**",
      "**bronșiectazie**",
      "**infecții de vecinătate**: abces dentar, mastoidite, otite, sinuzite (diseminare directă)",
      "**endocardita bacteriană acută** (diseminare hematogenă)."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**hipertensiune intracraniană**: redoare de ceafă, vărsături neprecedate de greață, cefalee severă",
      "**hernierea tonsilelor cerebeloase** în foramen magnum",
      "**deces prin stop respirator central** (compresia centrilor respiratori bulbari)."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **hemoragii intracraniene · hematom intracerebral** (piesa 11)",
      "asemănarea: creier pe secțiune, cu o leziune intraparenchimatoasă care ocupă spațiu",
      "① cavitate rotund-ovalară cu puroi, nu sânge care impregnează parenchimul",
      "② e delimitată de membrana piogenă; hematomul vine din ruperea unei ramuri vasculare",
      "③ țesutul a suferit necroză de colicvație; hematomul poate inunda ventriculii.",
      "alternative: **leptomeningită purulentă** (piesa 25: puroi difuz, pe meninge, fără membrană piogenă) · **bronhopneumonie** (piesa 26: focare de condensare în plămân, care se pot complica cu abcese)."
     ]
    }
   ]
  }
 ],
 "25": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: exsudatul, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 25 · Leptomeningită purulentă · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Encefal!! (leptomeninge: arahnoidă + pia mater) → !!Leptomeningită purulentă!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "!!Acumularea de puroi în spațiul meningeal!!: inflamația purulentă difuză acută (flegmonoasă) a leptomeningelui (arahnoidă + pia mater)."
     ]
    },
    {
     "h": "Descriere · 4 p",
     "d": [
      "exsudat purulent care **acoperă suprafața leptomeningelui**",
      "!!girusuri aplatizate!!",
      "**șanțuri îngustate**, prin edemațierea leptomeningelui pe seama puroiului",
      "puroi pe convexitate: „**meningită în șapcă**”."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: exsudatul, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 25 · Leptomeningită purulentă · 2/2",
   "title": "Leptomeningită purulentă: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 4 p",
     "d": [
      "!!inflamații perifocale!!: otite, sinuzite, rinite",
      "**bacteriemie, septicemie**",
      "**pneumococul**: exsudat pe convexitate („în șapcă”)",
      "**meningococul**: puroi la baza creierului (M. tuberculosis: unghiul pontocerebelos)."
     ]
    },
    {
     "h": "Complicații · 4 p",
     "d": [
      "**meningoencefalită**",
      "**piocefalie** (puroi în ventriculi)",
      "**HT intracraniană**: puncția spinală contraindicată",
      "**fibroza meningelui** (rară) → pahimeningită."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **abces cerebral** (piesa 24)",
      "asemănarea: inflamație purulentă în cutia craniană, cu semne de hipertensiune intracraniană",
      "① puroiul e în spațiul meningeal, pe suprafața creierului, nu în parenchim",
      "② inflamație difuză (flegmonoasă): girusuri aplatizate, șanțuri îngustate, nu proces localizat",
      "③ nu există membrană piogenă; abcesul e o cavitate înconjurată de membrană piogenă.",
      "alternative: **hemoragii intracraniene** (piesa 11: sânge în parenchim, nu puroi pe meninge) · **pericardită fibrinoasă** (piesa 23: exsudat fibrinos pe pericard)."
     ]
    }
   ]
  }
 ],
 "26": [
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: condensare, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 1/2: organ, leziune, definiție, descriere.",
   "kick": "Piesa 26 · Bronhopneumonie · 1/2",
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
     ]
    ],
    "descRows": [
     2
    ],
    "phase": [
     "Organ · leziune",
     "Definiție",
     "Descriere"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Organ · leziune · 1 p + 1 p · obligatoriu",
     "d": [
      "!!Plămân!! (pe secțiune) → !!Bronhopneumonie!!."
     ]
    },
    {
     "h": "Definiție · 1 p · obligatoriu",
     "d": [
      "Inflamație a parenchimului pulmonar de etiologie infecțioasă: !!extensia alveolară a unui proces inflamator al bronhiilor și bronhiolelor!!."
     ]
    },
    {
     "h": "Descriere · 7 p",
     "d": [
      "leziune !!multifocală, bilaterală!!",
      "pe secțiune, **mai multe focare de condensare**, de **consistență crescută**",
      "culoare **roșu închis**, diametre variabile",
      "inițial **în jurul bronhiilor și bronhiolelor**, apoi în spațiile alveolare adiacente",
      "focare separate de **țesut pulmonar normal aerat**, uneori cu emfizem compensator",
      "focarele pot **conflua**: bronhopneumonie confluentă",
      "cel mai frecvent **lobii inferiori**, bilateral, și zonele paravertebrale."
     ]
    }
   ]
  },
  {
   "scene": "prep",
   "anim": false,
   "spec": "Static: sus poza preparatului de la LP cu structurile încercuite; jos-stânga detaliu: condensare, jos-dreapta partenerul de DD (tot poza de la LP); badge-ul se aprinde pe structura rubricii. Partea 2/2: cauze, complicații, DD (badge-ul DD pe partener).",
   "kick": "Piesa 26 · Bronhopneumonie · 2/2",
   "title": "Bronhopneumonie: cauze, complicații, DD",
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
     null,
     null,
     [
      "d"
     ]
    ],
    "descRows": [],
    "phase": [
     "Cauze",
     "Complicații",
     "DD"
    ],
    "cred": "Pozele: preparatele de la LP (cum le vezi la examen)."
   },
   "points": [
    {
     "h": "Cauze · 5 p",
     "d": [
      "!!Streptococcus pneumoniae!! (cel mai frecvent)",
      "pacienți **imobilizați la pat** (bronhopneumonie hipostatică)",
      "**tulburări de deglutiție**",
      "**extremele de vârstă**",
      "**imunodeprimați**."
     ]
    },
    {
     "h": "Complicații · 3 p",
     "d": [
      "**abcese** (distrucție tisulară și necroză)",
      "**empiem toracic** (material purulent în cavitatea toracică)",
      "**diseminarea infecției**: meningită, artrită, endocardită infecțioasă."
     ]
    },
    {
     "h": "DD · 1 asemănare + 3 diferențe",
     "d": [
      "Cu **infarct pulmonar** (piesa 9)",
      "asemănarea: plămân pe secțiune, cu zone de consistență crescută, roșu închis",
      "① focare multiple, bilaterale, de diametre variabile, nu o singură zonă bine delimitată",
      "② pornesc din jurul bronhiilor și bronhiolelor, nu din teritoriul unei ramuri obstruate a arterei pulmonare (TEP)",
      "③ între focare țesut normal aerat, focarele pot conflua; la infarct, în jur, stază cronică.",
      "alternative: **leptomeningită purulentă** (piesa 25: puroi pe meninge; tot pneumococul e cauza) · **abces cerebral** (piesa 24: cavitate cu puroi; bronhopneumonia se poate complica cu abcese)."
     ]
    }
   ]
  }
 ]
};
