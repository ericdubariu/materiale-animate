// Recapitulare OSPE Histologie LP 2–7: toate cele 19 lame pe fișa oficială de evaluare (1 p diagnostic · 6 p diagnostic pozitiv · 2 p DD · bonus).
// GENERAT de /home/claude/build/histo_build.mjs din sim_src/histo_fise.json (barem pe noțiuni; lama de reticulină = fișa oficială) + scenele și pozele
// recapitulărilor recap-histo-02-05-anim (scene 'a.*') și recap-histo-06-07-anim (scene 'b.*').
export const GLOS = [["LP","lucrarea practică"],["HE","colorația hematoxilină-eozină"],["OSPE","examen practic structurat pe stații"],["DD","diagnostic diferențial"],["MB","membrana bazală"],["ob.","obiectivul"],["EN","termenul în engleză"],["LA","termenul în latină"],["IHC","imunohistochimie"],["Ac","anticorpi"],["T3","triiodotironina"],["T4","tiroxina"],["PP","celulele cu polipeptid pancreatic (celulele F)"],["inf.","inferioară"],["SF","substanța fundamentală"],["MEC","matricea extracelulară"],["RER","reticulul endoplasmatic rugos"],["ARN","acidul ribonucleic"],["C","celule"],["F","fibre"],["p","puncte"]];
export const TERMS = [["etalat","preparat etalat","membrana întinsă întreagă pe lamă, privită de sus (nu tăiată)"],["crenelat","crenelat","cu margine în zigzag fin"],["eucrom","eucrom","intensitate intermediară a nucleului (normocrom)"],["hipocrom","hipocrom","nucleu colorat palid, deschis"],["hipercrom","hipercrom","nucleu colorat intens, închis"],["picnotic","picnotic","nucleu mic, condensat, foarte închis (celula moare)"],["bazofil","bazofil","ia hematoxilina (albastru-violet)"],["eozinofil","eozinofil","ia eozina (roz)"],["corion","corion","conjunctivul de sub epiteliul unei mucoase"],["glandilem","glandilem","membrana bazală a glandei"],["adenomer","adenomer","porțiunea secretorie a glandei"],["holocrin","holocrin","celula întreagă se dezintegrează și devine secreție"],["zimogen","zimogen","granule de secreție eozinofile, la polul apical al celulei seroase"],["cromafin","cromafine","celulele medularei suprarenalei, de origine neuroendocrină"],["lipofuscin","lipofuscină","pigment galben, în celulele zonei reticulate"],["mioepitelial","mioepiteliale","celule alungite între MB și polul bazal al celulelor acinare"],["sustentacular","sustentaculare","celule de susținere, la periferia cuiburilor de celule cromafine"],["microvilozit","microvilozități","prelungiri fine ale polului apical; formează platoul striat"],["argirofil","argirofile","fixează argintul și apar negre"],["anastomoz","anastomozate","ramurile se unesc între ele, formând o rețea"],["eucromatin","eucromatină","cromatină desfăcută, palid colorată"],["heterocromatin","heterocromatină","cromatină condensată, intens colorată"],["granulație","țesut de granulație","țesut tânăr de reparație al unei plăgi: celule + multe vase"],["tenocit","tenocite","fibrocitele tendonului"],["paniculi","paniculi adipoși","cuiburi de celule adipoase strâns unite"],["stroma","stroma","scheletul de susținere al unui organ"],["medular","zona medulară","zona profundă a nodulului limfatic, cu limfocite mai rare"],["pseudorețea","pseudorețea","rețeaua formată de prelungirile celulelor reticulare, care o dublează pe cea de fibre"]];
export const SLIDES = [
 {
  "deckName": "Histologie · Recapitulare OSPE · LP 2–7",
  "scene": "a.ospe",
  "anim": false,
  "spec": "Static: scena formatului OSPE (lama → descrierea → DD); badge-ul pe rubrica din punct.",
  "kick": "Recapitulare OSPE · Histologie · LP 2–7",
  "title": "Fișa de evaluare: 1 p diagnostic, 6 p descriere, 2 p DD",
  "hud": [
   "19 lame",
   "9 p + 1 din oficiu"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu, eliminatoriu",
    "d": [
     "!!țesut/organ + colorație + organul!!, ex.: „fibrele de reticulină, impregnație argentică, splină”",
     "fără el, stația are **0 p**"
    ]
   },
   {
    "h": "Diagnostic pozitiv · maxim 6 p",
    "d": [
     "7–10 **noțiuni scurte**, de **1 p** (cele decisive) sau **0,5 p**",
     "în ordinea descrierii: ob. mic, apoi ob. mare"
    ]
   },
   {
    "h": "Diagnostic diferențial · maxim 2 p",
    "d": [
     "!!o singură lamă-partener, cu colorația și organul: 0,5 p!!",
     "**3 caracteristici ale partenerului** care îl deosebesc: câte 0,5 p"
    ]
   },
   {
    "h": "Bonus + oficiu",
    "d": [
     "informații corecte în plus despre preparat: **0,25 p/noțiune, maxim 0,5 p**",
     "maxim 9 p + **1 p din oficiu**"
    ]
   }
  ],
  "say": "1 min citești, 6 min vorbești: contează doar ce spui cu voce tare. Spui în ordinea fișei: diagnosticul cu colorația și organul → noțiunile → partenerul de DD cu colorația și organul → cele 3 caracteristici ale lui.",
  "warn": "Pe fișa oficială, lama de fibre de reticulină are organul **splină**, iar în LP apare rinichiul: la examen spui „splină”.",
  "beatDur": 5
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "pav",
    "cap": "Pe lamă: mezenter etalat · argentic"
   },
   "dd": {
    "img": "cub",
    "cap": "DD: medulara renală · HE"
   },
   "seq": [
    {
     "img": "pav",
     "cap": "Pe lamă: mezenter etalat · argentic"
    },
    {
     "img": "z_pav_0",
     "cap": "Celulă poligonală pe lamă"
    },
    {
     "img": "z_pav_1",
     "cap": "Limită crenelată pe lamă"
    },
    {
     "img": "cub",
     "cap": "DD: medulara renală · HE"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 2 · Lama 1 din 19 · argentic · mezenter",
  "title": "Epiteliul simplu pavimentos",
  "hud": [
   "Lama 1 din 19",
   "<b>argentic</b> · mezenter etalat"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Epiteliul simplu pavimentos, impregnație argentică, mezenter!!"
    ]
   },
   {
    "h": "Ob. mic · 2,5 p",
    "d": [
     "preparat etalat, nu secțiune (0,5 p) · celule de formă neregulată (0,5 p)",
     "celule poligonale (0,5 p) · strâns unite (0,5 p)",
     "ca pietrele de pavaj (0,5 p)"
    ]
   },
   {
    "h": "Ob. mare · 3,5 p",
    "d": [
     "!!limite crenelate!! (1 p)",
     "!!argintul precipită în spațiile intercelulare!! (1 p)",
     "**nucleul și nucleolul nu se colorează** (1 p)",
     "citoplasma nu se colorează (0,5 p)",
     "★ bonus (+0,25 p fiecare): epiteliu simplu: un singur rând de celule · etalatul, privit de sus, arată forma și dispoziția celulelor"
    ]
   },
   {
    "h": "DD · 2 p · cu epiteliul simplu cubic",
    "d": [
     "!!epiteliul simplu cubic, col. hematoxilină-eozină, rinichi!! (0,5 p)",
     "la partener (câte 0,5 p): secțiune prin medulara renală, cu lumenele tubilor colectori · celule aproximativ pătrate · nucleu rotund, eucrom, central",
     "asemănarea (nepunctată): ambele epitelii simple: un singur rând de celule"
    ]
   }
  ],
  "warn": "„Secțiune prin mezenter” = greșit: e un **etalat**. „Nuclei turtiți” la argentic = greșit: nucleii nu se colorează; nu descrie ce nu se vede."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "cub",
    "cap": "Pe lamă: medulara renală · HE"
   },
   "dd": {
    "img": "pri",
    "cap": "DD: vezica biliară · HE"
   },
   "seq": [
    {
     "img": "cub",
     "cap": "Pe lamă: medulara renală · HE"
    },
    {
     "img": "z_cub_0",
     "cap": "Tub colector: un rând, lumen gol"
    },
    {
     "img": "z_cub_1",
     "cap": "Nucleu rotund, central pe lamă"
    },
    {
     "img": "pri",
     "cap": "DD: vezica biliară · HE"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 2 · Lama 2 din 19 · HE · rinichi",
  "title": "Epiteliul simplu cubic",
  "hud": [
   "Lama 2 din 19",
   "<b>HE</b> · medulara renală"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Epiteliul simplu cubic, hematoxilină-eozină, rinichi!!"
    ]
   },
   {
    "h": "Ob. mic · 3 p",
    "d": [
     "în tubii colectori din medulara renală (0,5 p)",
     "!!celule aproximativ cubice (pătrate)!! (1 p)",
     "!!un singur rând pe membrana bazală!! (1 p)",
     "polul apical delimitează lumenul (0,5 p)"
    ]
   },
   {
    "h": "Ob. mare · 3 p",
    "d": [
     "citoplasmă palid eozinofilă (0,5 p)",
     "**nuclei rotunzi** (1 p)",
     "nuclei eucromi (0,5 p) · nuclei centrali (0,5 p)",
     "limite intercelulare bine vizibile (0,5 p)",
     "★ bonus (+0,25 p fiecare): lumenul tubului colector e gol (fără coloid) · polul apical fără platou striat"
    ]
   },
   {
    "h": "DD · 2 p · cu epiteliul simplu prismatic (cilindric)",
    "d": [
     "!!epiteliul simplu prismatic (cilindric), col. hematoxilină-eozină, vezica biliară!! (0,5 p)",
     "la partener (câte 0,5 p): celule alungite, cilindrice · nucleu alungit, perpendicular pe membrana bazală, în jumătatea inferioară · limite fine doar apical și platou striat",
     "asemănarea (nepunctată): ambele epitelii simple, un singur rând pe MB, citoplasmă palid eozinofilă; HE"
    ]
   }
  ],
  "warn": "Cubic sau tiroidă? Tubul colector: lumen gol. Foliculul tiroidian: cavitate cu **coloid** eozinofil."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "pri",
    "cap": "Pe lamă: vezica biliară · HE"
   },
   "dd": {
    "img": "cub",
    "cap": "DD: medulara renală · HE"
   },
   "seq": [
    {
     "img": "pri",
     "cap": "Pe lamă: vezica biliară · HE"
    },
    {
     "img": "z_pri_3",
     "cap": "Un singur rând de celule cilindrice"
    },
    {
     "img": "z_pri_0",
     "cap": "Platoul striat pe lamă"
    },
    {
     "img": "cub",
     "cap": "DD: medulara renală · HE"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 2 · Lama 3 din 19 · HE · vezica biliară",
  "title": "Epiteliul simplu prismatic (cilindric)",
  "hud": [
   "Lama 3 din 19",
   "<b>HE</b> · vezica biliară"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Epiteliul simplu prismatic (cilindric), hematoxilină-eozină, vezica biliară!!"
    ]
   },
   {
    "h": "Ob. mic · 4,5 p",
    "d": [
     "!!celule alungite, cilindrice!! (1 p)",
     "un singur rând pe membrana bazală (0,5 p) · citoplasmă palid eozinofilă (0,5 p)",
     "nuclei alungiți (ovalari) (0,5 p) · nuclei paraleli între ei (0,5 p)",
     "nuclei perpendiculari pe membrana bazală (0,5 p)",
     "!!nucleii în jumătatea inferioară!! (1 p)"
    ]
   },
   {
    "h": "Ob. mare · 1,5 p",
    "d": [
     "limite fine numai spre polul apical (0,5 p)",
     "**pol apical cu platou striat (microvilozități)** (1 p)",
     "★ bonus (+0,25 p fiecare): fără cili și fără celule caliciforme · nucleii stau la același nivel"
    ]
   },
   {
    "h": "DD · 2 p · cu epiteliul simplu cubic",
    "d": [
     "!!epiteliul simplu cubic, col. hematoxilină-eozină, rinichi!! (0,5 p)",
     "la partener (câte 0,5 p): celule aproximativ pătrate · nucleu rotund, central · limite bine vizibile, fără platou striat",
     "asemănarea (nepunctată): ambele epitelii simple, un singur rând pe MB, citoplasmă palid eozinofilă; HE"
    ]
   }
  ],
  "warn": "Prismatic sau pseudostratificat? Prismaticul: nuclei la același nivel, platou striat, **fără cili, fără caliciforme**. Pseudostratificatul: nuclei la înălțimi diferite, cili, caliciforme."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "ps",
    "cap": "Pe lamă: trahee · HE"
   },
   "dd": {
    "img": "uro",
    "cap": "DD: vezica urinară · HE"
   },
   "seq": [
    {
     "img": "ps",
     "cap": "Pe lamă: trahee · HE"
    },
    {
     "img": "z_ps_0",
     "cap": "Nuclei la înălțimi diferite"
    },
    {
     "img": "z_ps_1",
     "cap": "Polul apical cu cili pe lamă"
    },
    {
     "img": "uro",
     "cap": "DD: vezica urinară · HE"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 3 · Lama 4 din 19 · HE · trahee",
  "title": "Epiteliul pseudostratificat",
  "hud": [
   "Lama 4 din 19",
   "<b>HE</b> · trahee"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Epiteliul pseudostratificat, hematoxilină-eozină, trahee!!"
    ]
   },
   {
    "h": "Ob. mic · 4 p",
    "d": [
     "!!toate celulele ating membrana bazală!! (1 p)",
     "înălțimi diferite, nu toate ajung la suprafață (0,5 p) · epiteliu cilindric înalt (0,5 p)",
     "nucleii în 2/3 bazale, la înălțimi diferite (0,5 p)",
     "!!falsă impresie de stratificare!! (1 p)",
     "treimea superioară cu citoplasmă eozinofilă (0,5 p)"
    ]
   },
   {
    "h": "Ob. mare · 2 p",
    "d": [
     "cili la suprafață (0,5 p) · nuclei rotunzi, rotund-ovalari, în bastonaș (0,5 p)",
     "**celule caliciforme (cupă de șampanie), fără cili** (1 p)",
     "★ bonus (+0,25 p fiecare): caliciformele: nucleu bazal, ovalar/turtit, hipercrom; mucusul supranuclear necolorat · sus, limite intercelulare foarte fine"
    ]
   },
   {
    "h": "DD · 2 p · cu uroteliul (epiteliul tranzițional)",
    "d": [
     "!!uroteliul (epiteliul tranzițional), col. hematoxilină-eozină, vezica urinară!! (0,5 p)",
     "la partener (câte 0,5 p): stratificat: bazal, celule în rachetă, umbreliforme · umbreliforme mari, intens eozinofile, fără cili · nuclei în toate straturile, hipercromi în umbreliforme",
     "asemănarea (nepunctată): nucleii pe mai multe niveluri: la ob. mic ambele par „cu multe rânduri”; HE"
    ]
   }
  ],
  "warn": "„Pseudostratificatul e stratificat” = greșit: e **epiteliu simplu** (toate celulele pe MB)."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "es",
    "cap": "Pe lamă: esofag · HE"
   },
   "dd": {
    "img": "uro",
    "cap": "DD: vezica urinară · HE"
   },
   "seq": [
    {
     "img": "es",
     "cap": "Pe lamă: esofag · HE"
    },
    {
     "img": "z_es_0",
     "cap": "Stratul bazal pe lamă"
    },
    {
     "img": "z_es_1",
     "cap": "Stratul spinocelular pe lamă"
    },
    {
     "img": "z_es_2",
     "cap": "Stratul superficial pe lamă"
    },
    {
     "img": "uro",
     "cap": "DD: vezica urinară · HE"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 3 · Lama 5 din 19 · HE · esofag",
  "title": "Epiteliul stratificat pavimentos necheratinizat",
  "hud": [
   "Lama 5 din 19",
   "<b>HE</b> · esofag"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Epiteliul stratificat pavimentos necheratinizat, hematoxilină-eozină, esofag!!"
    ]
   },
   {
    "h": "Ob. mic + stratul bazal · 2,5 p",
    "d": [
     "mai multe rânduri suprapuse (0,5 p) · membrana bazală sinuoasă (0,5 p)",
     "bazal: un rând cubo-cilindric, bazofil (0,5 p)",
     "!!bazal: nuclei hipocromi, rotunzi-ovalari!! (1 p)"
    ]
   },
   {
    "h": "Stratul mijlociu (spinocelular) · 1,5 p",
    "d": [
     "!!mijlociu: celule poligonale, strâns unite!! (1 p)",
     "mijlociu: citoplasmă eozinofilă, nuclei eucromi, centrali (0,5 p)"
    ]
   },
   {
    "h": "Stratul superficial · 2 p",
    "d": [
     "superficial: celule turtite, paralele cu membrana bazală (0,5 p) · spre suprafață, citoplasmă tot mai palidă (0,5 p)",
     "**nucleu tot mai mic, picnotic, excentric** (1 p)",
     "★ bonus (+0,25 p fiecare): membrana bazală desparte epiteliul de conjunctivul subiacent · stratul mijlociu: limite intercelulare bine vizibile"
    ]
   },
   {
    "h": "DD · 2 p · cu uroteliul (epiteliul tranzițional)",
    "d": [
     "!!uroteliul (epiteliul tranzițional), col. hematoxilină-eozină, vezica urinară!! (0,5 p)",
     "la partener (câte 0,5 p): stratul mijlociu cu celule în rachetă de tenis · un rând de umbreliforme, intens eozinofile · membrana bazală invizibilă în hematoxilină-eozină",
     "asemănarea (nepunctată): ambele stratificate, cu stratul bazal identic (un rând cubo-cilindric, bazofil, nuclei hipocromi); HE"
    ]
   }
  ],
  "warn": "Stratul bazal are nuclei **hipocromi**, nu hipercromi; hipercrom (picnotic) = stratul superficial."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "uro",
    "cap": "Pe lamă: vezica urinară · HE"
   },
   "dd": {
    "img": "es",
    "cap": "DD: esofag · HE"
   },
   "seq": [
    {
     "img": "uro",
     "cap": "Pe lamă: vezica urinară · HE"
    },
    {
     "img": "z_uro_2",
     "cap": "Stratul bazal pe lamă"
    },
    {
     "img": "z_uro_1",
     "cap": "Celule în rachetă pe lamă"
    },
    {
     "img": "z_uro_0",
     "cap": "Celule umbreliforme pe lamă"
    },
    {
     "img": "es",
     "cap": "DD: esofag · HE"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 3 · Lama 6 din 19 · HE · vezica urinară",
  "title": "Uroteliul (epiteliul tranzițional)",
  "hud": [
   "Lama 6 din 19",
   "<b>HE</b> · vezica urinară"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Uroteliul (epiteliul tranzițional), hematoxilină-eozină, vezica urinară!!"
    ]
   },
   {
    "h": "Ob. mic + stratul bazal · 2 p",
    "d": [
     "aspect stratificat (0,5 p)",
     "!!membrana bazală invizibilă în hematoxilină-eozină!! (1 p)",
     "bazal: cubo-cilindrice, bazofile, nuclei hipocromi (0,5 p)"
    ]
   },
   {
    "h": "Stratul mijlociu: rachete · 1,5 p",
    "d": [
     "!!mijlociu: celule în rachetă de tenis!! (1 p)",
     "racheta: expansiune subțire printre celulele de dedesubt (0,5 p)"
    ]
   },
   {
    "h": "Stratul superficial: umbreliforme · 2,5 p",
    "d": [
     "**superficial: umbreliforme mari, puternic eozinofile** (1 p)",
     "**o umbreliformă acoperă 2–3 rachete** (1 p)",
     "1, rar 2 nuclei hipercromi (0,5 p)",
     "★ bonus (+0,25 p fiecare): căptușește numai căile urinare · umbreliformele trimit scurte prelungiri printre rachete"
    ]
   },
   {
    "h": "DD · 2 p · cu epiteliul stratificat pavimentos necheratinizat",
    "d": [
     "!!epiteliul stratificat pavimentos necheratinizat, col. hematoxilină-eozină, esofag!! (0,5 p)",
     "la partener (câte 0,5 p): stratul mijlociu cu celule poligonale (spinocelular) · superficial: mai multe rânduri turtite, palide, nucleu picnotic · membrana bazală sinuoasă, vizibilă",
     "asemănarea (nepunctată): ambele stratificate, cu stratul bazal identic (cubo-cilindric, bazofil, nuclei hipocromi); HE"
    ]
   }
  ],
  "warn": "MB la uroteliu: **invizibilă în HE**, nu o descrie (la esofag e sinuoasă, vizibilă). Stratul mijlociu: esofag = spinocelular, uroteliu = rachete; nu le amesteca."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "tub",
    "cap": "Pe lamă: colon · HE"
   },
   "dd": {
    "img": "sub",
    "cap": "DD: submandibulara · HE"
   },
   "seq": [
    {
     "img": "tub",
     "cap": "Pe lamă: colon · HE"
    },
    {
     "img": "z_tub_0",
     "cap": "Glandă dreaptă, paralelă"
    },
    {
     "img": "z_tub_1",
     "cap": "Celulă caliciformă pe lamă"
    },
    {
     "img": "sub",
     "cap": "DD: submandibulara · HE"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 4 · Lama 7 din 19 · HE · colon",
  "title": "Glanda tubulară simplă",
  "hud": [
   "Lama 7 din 19",
   "<b>HE</b> · colon"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Glanda tubulară simplă, hematoxilină-eozină, colon!!"
    ]
   },
   {
    "h": "Ob. mic · 3,5 p",
    "d": [
     "glandele în mucoasă, spre lumen (0,5 p)",
     "!!aspect de deget de mănușă (tub)!! (1 p)",
     "!!3 segmente: fund, corp, gât!! (1 p)",
     "pe glandilem, epiteliu simplu prismatic (0,5 p) · lumen îngust (0,5 p)"
    ]
   },
   {
    "h": "Ob. mare · 2,5 p",
    "d": [
     "**celule caliciforme: cupă de șampanie** (1 p)",
     "caliciforme: nucleu bazal hipercrom, mucus necolorat (0,5 p) · absorbante: prismatice înalte, citoplasmă eozinofilă (0,5 p)",
     "absorbante: nuclei ovalari în 1/3 inferioară (0,5 p)",
     "★ bonus (+0,25 p fiecare): peretele colic: mucoasă, submucoasă, musculară, seroasă · caliciformele își varsă secreția în lumen"
    ]
   },
   {
    "h": "DD · 2 p · cu glanda tubulo-acinoasă",
    "d": [
     "!!glanda tubulo-acinoasă, col. hematoxilină-eozină, glanda submandibulară!! (0,5 p)",
     "la partener (câte 0,5 p): acini seroși, mucoși, micști · celule seroase, mucoase, semiluna Gianuzzi · celule mioepiteliale între membrana bazală și celulele acinare",
     "asemănarea (nepunctată): ambele glande exocrine: adenomer cu lumen, delimitat de MB; HE"
    ]
   }
  ],
  "warn": "„Golurile” din caliciforme nu sunt artefacte: sunt **mucus** (în colorația albastru alcian, mucusul apare albastru)."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "seb",
    "cap": "Pe lamă: buză · HE"
   },
   "dd": {
    "img": "sub",
    "cap": "DD: submandibulara · HE"
   },
   "seq": [
    {
     "img": "seb",
     "cap": "Pe lamă: buză · HE"
    },
    {
     "img": "z_seb_0",
     "cap": "Celule mari, vacuolare"
    },
    {
     "img": "z_seb_1",
     "cap": "Celulele bazale pe lamă"
    },
    {
     "img": "z_seb_2",
     "cap": "Dezintegrare spre canal"
    },
    {
     "img": "sub",
     "cap": "DD: submandibulara · HE"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 4 · Lama 8 din 19 · HE · buză",
  "title": "Glanda alveolară simplă (sebacee)",
  "hud": [
   "Lama 8 din 19",
   "<b>HE</b> · buză"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Glanda alveolară simplă (sebacee), hematoxilină-eozină, buză!!"
    ]
   },
   {
    "h": "Ob. mic + spre centru · 3,5 p",
    "d": [
     "!!săculeț!! (1 p)",
     "canal scurt, la rădăcina firului de păr (0,5 p) · spre centru: celule mari, poliedrice, limite vizibile (0,5 p)",
     "!!citoplasmă vacuolară, necolorată (sebum)!! (1 p)",
     "nucleu la început rotund, central (0,5 p)"
    ]
   },
   {
    "h": "Pe MB: celulele bazale · 1 p",
    "d": [
     "pe membrana bazală: un rând cubic, bazofil (0,5 p) · celulele bazale regenerează glanda (0,5 p)"
    ]
   },
   {
    "h": "Spre canal: dezintegrare · 1,5 p",
    "d": [
     "spre canal: nucleu picnotic, hipercrom, excentric (0,5 p)",
     "**celulele se dezintegrează: secreție holocrină** (1 p)",
     "★ bonus (+0,25 p fiecare): celulele bazale au limite greu vizibile · sebumul se dizolvă la prelucrare, de aceea nu se colorează în HE"
    ]
   },
   {
    "h": "DD · 2 p · cu glanda tubulo-acinoasă",
    "d": [
     "!!glanda tubulo-acinoasă, col. hematoxilină-eozină, glanda submandibulară!! (0,5 p)",
     "la partener (câte 0,5 p): acini seroși, mucoși, micști, cu lumen · celule mioepiteliale alungite, nucleu paralel cu membrana bazală · celule întregi, cu zimogen sau mucus",
     "asemănarea (nepunctată): ambele glande exocrine cu adenomer rotunjit (săculeț, respectiv acini); HE"
    ]
   }
  ],
  "warn": "Golurile = **sebum** dizolvat (colorația Szekely evidențiază conținutul lipidic), nu artefacte."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "sub",
    "cap": "Pe lamă: submandibulara · HE"
   },
   "dd": {
    "img": "tub",
    "cap": "DD: colon · HE"
   },
   "seq": [
    {
     "img": "sub",
     "cap": "Pe lamă: submandibulara · HE"
    },
    {
     "img": "z_sub_1",
     "cap": "Acin mucos pe lamă"
    },
    {
     "img": "z_sub_0",
     "cap": "Acini seroși pe lamă (mici, granulari, mai închiși)"
    },
    {
     "img": "sub",
     "cap": "Lama întreagă (acinul mixt nemarcat)"
    },
    {
     "img": "tub",
     "cap": "DD: colon · HE"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 4 · Lama 9 din 19 · HE · submandibulara",
  "title": "Glanda tubulo-acinoasă (submandibulară)",
  "hud": [
   "Lama 9 din 19",
   "<b>HE</b> · glanda submandibulară"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Glanda tubulo-acinoasă, hematoxilină-eozină, glanda submandibulară!!"
    ]
   },
   {
    "h": "Ob. mic + acinul mucos · 1,5 p",
    "d": [
     "aspect heterogen al acinilor (0,5 p) · acin mucos: citoplasmă palidă, lumen larg (0,5 p)",
     "mucos: nuclei hipercromi, turtiți, bazali (0,5 p)"
    ]
   },
   {
    "h": "Acinul seros · 2 p",
    "d": [
     "acin seros: cel mai mic, zimogen eozinofil supranuclear (0,5 p) · seros: nucleu rotund, eucrom, bazal (0,5 p)",
     "!!seros: lumen foarte mic, punctiform!! (1 p)"
    ]
   },
   {
    "h": "Acinul mixt + mioepiteliale · 2,5 p",
    "d": [
     "acin mixt: cel mai mare (0,5 p)",
     "!!semiluna Gianuzzi (3–5 celule seroase)!! (1 p)",
     "**celule mioepiteliale între membrana bazală și acini** (1 p)",
     "★ bonus (+0,25 p fiecare): acinul mucos: 4–6 celule; acinul seros: 6–8 celule · mioepitelialele: alungite, nucleu ovalar, hipercrom, paralel cu MB"
    ]
   },
   {
    "h": "DD · 2 p · cu glanda tubulară simplă",
    "d": [
     "!!glanda tubulară simplă, col. hematoxilină-eozină, colon!! (0,5 p)",
     "la partener (câte 0,5 p): tub (deget de mănușă) cu fund, corp, gât · celule caliciforme și absorbante · lumen îngust, cu epiteliu simplu prismatic pe glandilem",
     "asemănarea (nepunctată): ambele glande exocrine: adenomer cu lumen, delimitat de MB; HE"
    ]
   }
  ],
  "warn": "În LP, textul și eticheta pozei spun la acinul seros **nucleu situat bazal**; tabelul de DD scrie „rotund, central”. Semiluna: text **3–5** celule seroase, tabel 3–4 → spui „3–5”."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "tir",
    "cap": "Pe lamă: tiroida · HE"
   },
   "dd": {
    "img": "sr",
    "cap": "DD: suprarenala · HE"
   },
   "seq": [
    {
     "img": "tir",
     "cap": "Pe lamă: tiroida · HE"
    },
    {
     "img": "z_tir_0",
     "cap": "Coloidul pe lamă"
    },
    {
     "img": "z_tir_1",
     "cap": "Un singur rând de celule foliculare"
    },
    {
     "img": "z_tir_3",
     "cap": "Printre foliculi (celulele C: doar IHC)"
    },
    {
     "img": "sr",
     "cap": "DD: suprarenala · HE"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 5 · Lama 10 din 19 · HE · tiroida",
  "title": "Glanda tiroidă: celule endocrine în foliculi",
  "hud": [
   "Lama 10 din 19",
   "<b>HE</b> · tiroida"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Celule endocrine dispuse în foliculi, hematoxilină-eozină, glanda tiroidă!!"
    ]
   },
   {
    "h": "Ob. mic + foliculul · 3 p",
    "d": [
     "!!foliculi rotunzi-ovalari!! (1 p)",
     "de diferite mărimi și stadii de activitate (0,5 p) · epiteliu simplu (folicular) pe membrana bazală (0,5 p)",
     "!!cavitate cu coloid eozinofil!! (1 p)"
    ]
   },
   {
    "h": "Celulele foliculare · 1,5 p",
    "d": [
     "**celule turtite / cubice / cilindrice, după activitate** (1 p)",
     "nucleul are forma celulei (0,5 p)"
    ]
   },
   {
    "h": "Celulele parafoliculare (C) · 1,5 p",
    "d": [
     "**parafoliculare (C) lângă membrana bazală, nu ating coloidul** (1 p)",
     "parafoliculare: citoplasmă palidă, nucleu mare, rotund (0,5 p)",
     "★ bonus (+0,25 p fiecare): foliculare → T3, T4; parafoliculare → calcitonină · celulele C se identifică prin IHC (anticorpi anticalcitonină)"
    ]
   },
   {
    "h": "DD · 2 p · cu celule endocrine dispuse în cuiburi și cordoane",
    "d": [
     "!!celule endocrine dispuse în cuiburi și cordoane, col. hematoxilină-eozină, glanda suprarenală!! (0,5 p)",
     "la partener (câte 0,5 p): fără cavitate, fără coloid · fasciculata palidă, vacuolară (grăsimi) · corticală periferică în 3 zone și medulară centrală",
     "asemănarea (nepunctată): ambele epitelii glandulare endocrine; HE"
    ]
   }
  ],
  "warn": "Cavitatea foliculului = depozit de coloid, nu lumen de glandă exocrină. „Văd celulele C” în HE = greșit: se identifică prin **IHC**."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "sr",
    "cap": "Pe lamă: suprarenala · HE (glomerulara nu e în cadru)"
   },
   "dd": {
    "img": "tir",
    "cap": "DD: tiroida · HE"
   },
   "seq": [
    {
     "img": "sr",
     "cap": "Pe lamă (glomerulara nu e în cadru)"
    },
    {
     "img": "z_sr_0",
     "cap": "Zona fasciculată pe lamă"
    },
    {
     "img": "z_sr_1",
     "cap": "Zona reticulată pe lamă"
    },
    {
     "img": "z_sr_2",
     "cap": "Medulara pe lamă"
    },
    {
     "img": "tir",
     "cap": "DD: tiroida · HE"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 5 · Lama 11 din 19 · HE · suprarenala",
  "title": "Glanda suprarenală: cuiburi și cordoane",
  "hud": [
   "Lama 11 din 19",
   "<b>HE</b> · suprarenala"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Celule endocrine dispuse în cuiburi și cordoane, hematoxilină-eozină, glanda suprarenală!!"
    ]
   },
   {
    "h": "Ob. mic + glomerulara + fasciculata · 4 p",
    "d": [
     "!!corticală periferică, medulară centrală (20%)!! (1 p)",
     "glomerulara: cordoane scurte, arcuite (0,5 p) · glomerulara: celule mici, bazofile, nucleu hipercrom (0,5 p)",
     "!!fasciculata: cea mai groasă!! (1 p)",
     "fasciculata: cordoane lungi, perpendiculare pe medulară (0,5 p) · fasciculata: celule mari, palide, vacuolare (0,5 p)"
    ]
   },
   {
    "h": "Zona reticulată · 1 p",
    "d": [
     "reticulata: cordoane scurte, anastomozate (0,5 p) · reticulata: celule intens eozinofile, lipofuscină (0,5 p)"
    ]
   },
   {
    "h": "Medulara · 1 p",
    "d": [
     "medulara: celule cromafine, citoplasmă bazofilă (0,5 p) · celule sustentaculare la periferia cuiburilor (0,5 p)",
     "★ bonus (+0,25 p fiecare): fasciculata: nuclei mari, hipocromi, 1–2 nucleoli · reticulata: zona cea mai profundă"
    ]
   },
   {
    "h": "DD · 2 p · cu celule endocrine dispuse în foliculi",
    "d": [
     "!!celule endocrine dispuse în foliculi, col. hematoxilină-eozină, glanda tiroidă!! (0,5 p)",
     "la partener (câte 0,5 p): celule dispuse în foliculi · cavitate cu coloid eozinofil · foliculi de mărimi diferite",
     "asemănarea (nepunctată): ambele epitelii glandulare endocrine; HE"
    ]
   }
  ],
  "warn": "Periferie → centru: **glomerulară → fasciculată → reticulată → medulară**."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "pan",
    "cap": "Pe lamă: pancreas · HE"
   },
   "dd": {
    "img": "sr",
    "cap": "DD: suprarenala · HE"
   },
   "seq": [
    {
     "img": "pan",
     "cap": "Pe lamă: pancreas · HE"
    },
    {
     "img": "z_pan_0",
     "cap": "Insulă Langerhans pe lamă"
    },
    {
     "img": "z_pan_0",
     "cap": "Celule mici, palide, în cuiburi"
    },
    {
     "img": "z_pan_1",
     "cap": "Acini seroși pe lamă"
    },
    {
     "img": "sr",
     "cap": "DD: suprarenala · HE"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 5 · Lama 12 din 19 · HE · pancreas",
  "title": "Insula Langerhans (pancreasul endocrin)",
  "hud": [
   "Lama 12 din 19",
   "<b>HE</b> · pancreas"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Insulele Langerhans (pancreasul endocrin), hematoxilină-eozină, pancreas!!"
    ]
   },
   {
    "h": "Ob. mic: componenta endocrină · 2 p",
    "d": [
     "componentă endocrină și exocrină (0,5 p) · 1–3 milioane de insule, 1–2% din volum (0,5 p)",
     "!!insule rotunde-ovalare, mai palid colorate!! (1 p)"
    ]
   },
   {
    "h": "Ob. mare: celulele insulei · 3 p",
    "d": [
     "4 tipuri: α, β, δ, F (PP) (0,5 p)",
     "!!tipurile celulare nu se identifică în hematoxilină-eozină, ci imunohistochimic!! (1 p)",
     "celule mai mici decât cele acinare, în cuiburi (0,5 p) · citoplasmă granulară, palidă (0,5 p)",
     "nucleu rotund, eucrom (0,5 p)"
    ]
   },
   {
    "h": "Ob. mic: componenta exocrină · 1 p",
    "d": [
     "**exocrinul: în totalitate acini seroși** (1 p)",
     "★ bonus (+0,25 p fiecare): componenta exocrină are și canale de excreție · celulele insulei sunt poligonale"
    ]
   },
   {
    "h": "DD · 2 p · cu celule endocrine dispuse în cuiburi și cordoane",
    "d": [
     "!!celule endocrine dispuse în cuiburi și cordoane, col. hematoxilină-eozină, glanda suprarenală!! (0,5 p)",
     "la partener (câte 0,5 p): corticală și medulară, fără acini · corticală în 3 zone: glomerulară, fasciculată, reticulată · fasciculata: celule mari, vacuolare, în cordoane lungi",
     "asemănarea (nepunctată): ambele: celule endocrine dispuse în cuiburi; HE"
    ]
   }
  ],
  "warn": "„Văd celulele beta” = greșit: α, β, δ, F (PP) nu se identifică în HE; spui că e nevoie de **IHC**."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "gr",
    "cap": "Pe lamă: țesut de granulație · HE"
   },
   "dd": {
    "img": "lax",
    "cap": "DD: glanda mamară · HE (lax)"
   },
   "seq": [
    {
     "img": "gr",
     "cap": "Pe lamă: țesut de granulație · HE"
    },
    {
     "img": "z_gr_1",
     "cap": "Capilar cu o hematie pe lamă"
    },
    {
     "img": "z_gr_0",
     "cap": "Nuclei rotunzi, închiși: limfocite, plasmocite"
    },
    {
     "img": "lax",
     "cap": "DD: glanda mamară · HE (lax)"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 6 · Lama 13 din 19 · HE · țesut de granulație",
  "title": "Celulele țesutului conjunctiv: celularitate abundentă, multe vase",
  "hud": [
   "Lama 13 din 19",
   "<b>HE</b> · țesut de granulație"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Celulele țesutului conjunctiv, hematoxilină-eozină, țesut de granulație!!"
    ]
   },
   {
    "h": "Ob. mic · 3 p",
    "d": [
     "!!celularitate abundentă!! (1 p)",
     "toate tipurile de celule, proprii și migrate (0,5 p)",
     "!!vascularizație abundentă!! (1 p)",
     "doar fibre de colagen, izolate sau în fascicule (0,5 p)"
    ]
   },
   {
    "h": "Ob. mare: tipurile de celule · 3 p",
    "d": [
     "fibroblast: nucleu mare, ovalar, hipocrom, cu nucleol (0,5 p) · fibrocit: nucleu fusiform, hipercrom (0,5 p)",
     "adipocit: inel cu pecete (0,5 p) · plasmocit: nucleu în spițe de roată (0,5 p)",
     "macrofag vacuolar, celule gigante multinucleate (0,5 p) · limfocit mic, citoplasmă în semilună (0,5 p)",
     "★ bonus (+0,25 p fiecare): celule proprii (fibroblast, fibrocit, adipocit) și migrate (plasmocit, macrofag, limfocit) · celula gigantă multinucleată = macrofage contopite"
    ]
   },
   {
    "h": "DD · 2 p · cu țesutul conjunctiv lax",
    "d": [
     "!!țesutul conjunctiv lax, col. hematoxilină-eozină, glanda mamară!! (0,5 p)",
     "la partener (câte 0,5 p): celule, fibre și substanță fundamentală în proporții egale · fibroblaste și fibrocite lângă colagen, plus celule migrate · capilare: nuclei ca dinții de fierăstrău, transversal 1–2 nuclei",
     "asemănarea (nepunctată): ambele țesut conjunctiv colorat HE: celule + fibre de colagen + SF, cu vase"
    ]
   }
  ]
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "col",
    "cap": "Pe lamă: glanda mamară · van Gieson"
   },
   "dd": {
    "img": "ret",
    "cap": "DD: rinichi · argentic"
   },
   "seq": [
    {
     "img": "col",
     "cap": "Pe lamă: glanda mamară · van Gieson"
    },
    {
     "img": "z_col_0",
     "cap": "Fibre roșii, sinuoase"
    },
    {
     "img": "z_col_1",
     "cap": "Nuclei negru-cafenii pe lamă"
    },
    {
     "img": "ret",
     "cap": "DD: rinichi · argentic"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 6 · Lama 14 din 19 · van Gieson · glanda mamară",
  "title": "Fibrele de colagen: roșii, sinuoase, în fascicule",
  "hud": [
   "Lama 14 din 19",
   "<b>van Gieson</b> · glanda mamară"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Fibrele de colagen, Van Gieson, glanda mamară!!"
    ]
   },
   {
    "h": "Ob. mic · 1,5 p",
    "d": [
     "!!se colorează în roșu puternic!! (1 p)",
     "așezare dezordonată sau ordonată (0,5 p)"
    ]
   },
   {
    "h": "Ob. mare · 4,5 p",
    "d": [
     "!!linii mai mult sau mai puțin sinuoase!! (1 p)",
     "izolate sau grupate în fascicule (0,5 p) · fascicule fine sau grosiere (0,5 p)",
     "trec dintr-un fascicul în altul (0,5 p)",
     "**nu se ramifică, nu se anastomozează niciodată** (1 p)",
     "nucleii fibrocitelor negru-cafenii, ovalari, turtiți (0,5 p) · fibrocite lipite de fibre, citoplasma nu se vede (0,5 p)",
     "★ bonus (+0,25 p fiecare): van Gieson = colorația de elecție pentru colagen · în HE colagenul apare palid roz"
    ]
   },
   {
    "h": "DD · 2 p · cu fibrele de reticulină",
    "d": [
     "!!fibrele de reticulină, col. impregnație argentică, splină!! (0,5 p)",
     "la partener (câte 0,5 p): se colorează în negru · mai subțiri, nu formează fascicule · se ramifică și se anastomozează în rețea",
     "asemănarea (nepunctată): ambele fibre ale țesutului conjunctiv (reticulina = colagen tip III)"
    ]
   }
  ],
  "warn": "„Colagenul se ramifică” = greșit: fibrele trec dintr-un fascicul în altul, dar nu se ramifică și nu se anastomozează. Reticulina da."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "ret",
    "cap": "Pe lamă: rinichi · argentic"
   },
   "dd": {
    "img": "col",
    "cap": "DD: glanda mamară · van Gieson"
   },
   "seq": [
    {
     "img": "ret",
     "cap": "Pe lamă: rinichi · argentic"
    },
    {
     "img": "z_ret_0",
     "cap": "Ochi al rețelei: tub renal"
    },
    {
     "img": "z_ret_1",
     "cap": "Fibre ramificate între tubi"
    },
    {
     "img": "col",
     "cap": "DD: glanda mamară · van Gieson"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 6 · Lama 15 din 19 · argentic · splină (pe fișă)",
  "title": "Fibrele de reticulină: singura lamă neagră, o rețea",
  "hud": [
   "Lama 15 din 19",
   "<b>argentic</b> · splină pe fișă · rinichi în LP"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Fibrele de reticulină, impregnație argentică, splină!!"
    ]
   },
   {
    "h": "Ob. mic: rețeaua · 1,5 p",
    "d": [
     "!!se colorează în negru!! (1 p)",
     "formează rețele (0,5 p)"
    ]
   },
   {
    "h": "Ob. mare · 4,5 p",
    "d": [
     "linii cu traiect neregulat (0,5 p) · sunt subțiri (0,5 p)",
     "!!se ramifică!! (1 p)",
     "**se anastomozează cu alte fibre** (1 p)",
     "rețele cu ochiuri de mărimi diferite (0,5 p) · rețele cu ochiuri de forme diferite (0,5 p)",
     "nu se grupează în fascicule (0,5 p)",
     "★ bonus (+0,25 p fiecare): fibrele sunt argirofile (colagen tip III) · în HE fibrele de reticulină nu se văd"
    ]
   },
   {
    "h": "DD · 2 p · cu fibrele de colagen",
    "d": [
     "!!fibrele de colagen, col. Van Gieson, glanda mamară!! (0,5 p)",
     "la partener (câte 0,5 p): se colorează în roșu puternic · sub formă de linii sinuoase · le putem găsi ca fibre izolate sau grupate în fascicule",
     "asemănarea (nepunctată): ambele fibre ale țesutului conjunctiv (reticulina = colagen tip III)"
    ]
   }
  ],
  "warn": "Tot argentic e și epiteliul simplu pavimentos (LP 2): acolo vezi **contururi de celule** pe un etalat, aici **fibre** pe o secțiune. Organul: pe fișa oficială e **splina** (lama din LP e pe rinichi) → spui „splină”."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "lax",
    "cap": "Pe lamă: glanda mamară · HE (lax)"
   },
   "dd": {
    "img": "adi",
    "cap": "DD: glanda mamară · HE (adipos)"
   },
   "seq": [
    {
     "img": "lax",
     "cap": "Pe lamă: glanda mamară · HE (lax)"
    },
    {
     "img": "z_lax_1",
     "cap": "Laxul din lobul pe lamă"
    },
    {
     "img": "z_lax_mare_0",
     "cap": "Capilar cu hematii pe lamă"
    },
    {
     "img": "adi",
     "cap": "DD: glanda mamară · HE (adipos)"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 7 · Lama 16 din 19 · HE · glanda mamară",
  "title": "Conjunctivul lax: în lobulul mamar, proporții egale",
  "hud": [
   "Lama 16 din 19",
   "<b>HE</b> · glanda mamară"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Țesutul conjunctiv lax, hematoxilină-eozină, glanda mamară!!"
    ]
   },
   {
    "h": "Ob. mic · 1,5 p",
    "d": [
     "!!celule, fibre, substanță fundamentală în proporții egale!! (1 p)",
     "conjunctiv dens și lax, laxul în lobulul mamar (0,5 p)"
    ]
   },
   {
    "h": "Ob. mare · 4,5 p",
    "d": [
     "fibroblaste: nucleu alungit, hipocrom (0,5 p) · fibrocite: nucleu alungit, hipercrom (0,5 p)",
     "celule migrate din sânge (0,5 p) · fibre de colagen palid roz (0,5 p)",
     "!!fibre izolate sau în fascicule cu orientare variabilă!! (1 p)",
     "**capilar longitudinal: nuclei ca dinții de fierăstrău** (1 p)",
     "capilar transversal: 1, maximum 2 nuclei (0,5 p)",
     "★ bonus (+0,25 p fiecare): fibrele elastice și de reticulină nu se văd în HE · în capilarul longitudinal, hematiile stau în șir indian"
    ]
   },
   {
    "h": "DD · 2 p · cu țesutul conjunctiv adipos alb",
    "d": [
     "!!țesutul conjunctiv adipos alb, col. hematoxilină-eozină, glanda mamară!! (0,5 p)",
     "la partener (câte 0,5 p): predomină celulele · adipocite mari, optic goale, inel cu pecete · fibre reduse cantitativ",
     "asemănarea (nepunctată): pe aceeași lamă (glanda mamară, HE); ambele țesut conjunctiv"
    ]
   }
  ],
  "warn": "Laxul e **în lobul**: nu descrie densul de lângă."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "adi",
    "cap": "Pe lamă: glanda mamară · HE (adipos)"
   },
   "dd": {
    "img": "lax",
    "cap": "DD: glanda mamară · HE (lax)"
   },
   "seq": [
    {
     "img": "adi",
     "cap": "Pe lamă: glanda mamară · HE (adipos)"
    },
    {
     "img": "z_adi_0",
     "cap": "Adipocit pe lamă"
    },
    {
     "img": "z_adi_mare_1",
     "cap": "Nucleu turtit, la margine"
    },
    {
     "img": "lax",
     "cap": "DD: glanda mamară · HE (lax)"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 7 · Lama 17 din 19 · HE · glanda mamară",
  "title": "Țesutul adipos alb: celule mari, optic goale",
  "hud": [
   "Lama 17 din 19",
   "<b>HE</b> · glanda mamară"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Țesutul conjunctiv adipos alb, hematoxilină-eozină, glanda mamară!!"
    ]
   },
   {
    "h": "Ob. mic · 3,5 p",
    "d": [
     "!!predomină celulele, strâns una lângă alta!! (1 p)",
     "substanță fundamentală și fibre reduse (0,5 p) · adipocite mari, limite bine vizibile (0,5 p)",
     "!!citoplasmă incoloră, celula pare goală!! (1 p)",
     "izolate sau în cuiburi: paniculi adipoși (0,5 p)"
    ]
   },
   {
    "h": "Ob. mare · 2,5 p",
    "d": [
     "rotunde, ovalare sau poligonale (0,5 p) · o vacuolă mare, necolorată (0,5 p)",
     "citoplasmă eozinofilă în inel subțire (0,5 p)",
     "**nucleu turtit, hipercrom, excentric: inel cu pecete** (1 p)",
     "★ bonus (+0,25 p fiecare): vacuola e goală: lipidul se dizolvă la prelucrare · adiposul și laxul sunt pe aceeași lamă de glandă mamară"
    ]
   },
   {
    "h": "DD · 2 p · cu țesutul conjunctiv lax",
    "d": [
     "!!țesutul conjunctiv lax, col. hematoxilină-eozină, glanda mamară!! (0,5 p)",
     "la partener (câte 0,5 p): celule, fibre și substanță fundamentală în proporții egale · fibroblaste, fibrocite și celule migrate · colagen palid roz, cu orientare variabilă",
     "asemănarea (nepunctată): pe aceeași lamă (glanda mamară, HE); ambele țesut conjunctiv"
    ]
   }
  ],
  "warn": "Adipos sau sebacee (LP 4)? Adipos: **o vacuolă**, nucleu turtit, excentric. Sebacee: citoplasmă vacuolară, nucleu rotund central (apoi picnotic), rând de celule bazale."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "ten",
    "cap": "Pe lamă: tendon · HE"
   },
   "dd": {
    "img": "lax",
    "cap": "DD: glanda mamară · HE (lax)"
   },
   "seq": [
    {
     "img": "ten",
     "cap": "Pe lamă: tendon · HE"
    },
    {
     "img": "z_ten_0",
     "cap": "Fascicul de colagen pe lamă"
    },
    {
     "img": "z_ten_mare_0",
     "cap": "„Nuclei gemeni” pe lamă"
    },
    {
     "img": "lax",
     "cap": "DD: glanda mamară · HE (lax)"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 7 · Lama 18 din 19 · HE · tendon",
  "title": "Conjunctivul tendinos: fascicule paralele și nuclei gemeni",
  "hud": [
   "Lama 18 din 19",
   "<b>HE</b> · tendon longitudinal"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Țesutul conjunctiv tendinos, hematoxilină-eozină, tendon!!"
    ]
   },
   {
    "h": "Ob. mic · 1,5 p",
    "d": [
     "!!predomină fibrele de colagen, ordonate!! (1 p)",
     "celule puține, substanță fundamentală redusă (0,5 p)"
    ]
   },
   {
    "h": "Ob. mare · 4,5 p",
    "d": [
     "!!fibre groase, palid eozinofile!! (1 p)",
     "ușor ondulate pe secțiune longitudinală (0,5 p) · fascicule dense, paralele (0,5 p)",
     "tenocite alungite, dreptunghiulare (0,5 p) · limite și citoplasmă slab vizibile (0,5 p)",
     "nucleu ovalar, hipercrom (0,5 p)",
     "**„nuclei gemeni”, cap la cap** (1 p)",
     "★ bonus (+0,25 p fiecare): tenocitele sunt fibrocite · tenocitele stau între fascicule, lipite de fibre"
    ]
   },
   {
    "h": "DD · 2 p · cu țesutul conjunctiv lax",
    "d": [
     "!!țesutul conjunctiv lax, col. hematoxilină-eozină, glanda mamară!! (0,5 p)",
     "la partener (câte 0,5 p): fibre izolate sau în fascicule cu orientare variabilă · fibroblaste, fibrocite și celule migrate · substanță fundamentală în proporție egală, cu capilare",
     "asemănarea (nepunctată): ambele țesut conjunctiv în HE, cu fibre de colagen palid roz printre care stau celule cu nuclei alungiți"
    ]
   }
  ],
  "warn": "Nucleii „cap la cap” (**nuclei gemeni**) sunt aspectul caracteristic țesutului tendinos: spune-i pe nume."
 },
 {
  "scene": "photo",
  "sceneOpts": {
   "main": {
    "img": "rt",
    "cap": "Pe lamă: nodul limfatic · HE"
   },
   "dd": {
    "img": "ret",
    "cap": "DD: rinichi · argentic"
   },
   "seq": [
    {
     "img": "rt",
     "cap": "Pe lamă: nodul limfatic · HE"
    },
    {
     "img": "z_rt_0",
     "cap": "Limfocite rare: rețeaua se vede"
    },
    {
     "img": "z_rt_mare_0",
     "cap": "Celulă reticulară pe lamă"
    },
    {
     "img": "ret",
     "cap": "DD: rinichi · argentic"
    }
   ]
  },
  "anim": false,
  "spec": "Static: sus poza lamei de la LP, mare; jos-stânga decupajul de pe lamă al punctului activ; jos-dreapta partenerul de DD (poza de la LP); badge-ul și chenarul galben pe poza punctului.",
  "kick": "LP 7 · Lama 19 din 19 · HE · nodul limfatic",
  "title": "Conjunctivul reticular: celule stelate și limfocite în ochiuri",
  "hud": [
   "Lama 19 din 19",
   "<b>HE</b> · nodul limfatic, medulara"
  ],
  "points": [
   {
    "h": "Diagnosticul · 1 p · obligatoriu",
    "d": [
     "!!Țesutul conjunctiv reticular, hematoxilină-eozină, nodul limfatic!!"
    ]
   },
   {
    "h": "Ob. mic · 1,5 p",
    "d": [
     "celule reticulare, fibre de reticulină, puțină substanță fundamentală (0,5 p)",
     "!!zona medulară, cu limfocite rare!! (1 p)"
    ]
   },
   {
    "h": "Ob. mare · 4,5 p",
    "d": [
     "!!celule reticulare stelate!! (1 p)",
     "citoplasmă eozinofilă (0,5 p) · nucleu mare, rotund, hipocrom (0,5 p)",
     "prelungiri lungi, puține, anastomozate (0,5 p) · pseudorețea care dublează rețeaua de fibre (0,5 p)",
     "**fibrele de reticulină nu se văd în hematoxilină-eozină** (1 p)",
     "în ochiuri: limfocite mici, citoplasmă în semilună (0,5 p)",
     "★ bonus (+0,25 p fiecare): stroma nodulului limfatic = țesut conjunctiv reticular · limfocitul: nucleu rotund, hipercrom"
    ]
   },
   {
    "h": "DD · 2 p · cu fibrele de reticulină",
    "d": [
     "!!fibrele de reticulină, col. impregnație argentică, splină!! (0,5 p)",
     "la partener (câte 0,5 p): fibrele se văd, colorate în negru · fibre ramificate, anastomozate · rețele cu ochiuri de mărimi și forme diferite",
     "asemănarea (nepunctată): aceeași rețea de fibre de reticulină, cu ochiuri în care stau alte structuri"
    ]
   }
  ],
  "warn": "„Văd fibrele de reticulină” la HE = greșit: vezi celulele reticulare; fibrele negre = LP 6, argentic."
 },
 {
  "scene": "a.mosaic",
  "kick": "Recapitulare OSPE · Histologie · Capcane",
  "title": "Unde se pierd puncte: lame care seamănă între ele",
  "anim": false,
  "spec": "Mozaic fix cu pozele reale; pătratul punctului se aprinde.",
  "hud": [
   "poze reale",
   "perechi care se confundă"
  ],
  "sceneOpts": {
   "cols": 3,
   "tiles": [
    {
     "img": "pav",
     "src": [
      200,
      100,
      900,
      690
     ],
     "lab": "simplu pavimentos (argentic)"
    },
    {
     "img": "dd_reticulina",
     "lab": "fibre de reticulină (argentic)"
    },
    {
     "img": "seb",
     "lab": "glanda sebacee"
    },
    {
     "img": "sr_z2",
     "lab": "zona fasciculată"
    },
    {
     "img": "dd_adipos",
     "lab": "țesut adipos alb"
    }
   ]
  },
  "points": [
   {
    "h": "Simplu pavimentos · argentic (LP 2)",
    "d": [
     "**contururi poligonale închise, lipite**; preparat etalat"
    ]
   },
   {
    "h": "Fibrele de reticulină · tot argentic (LP 6)",
    "d": [
     "negru = reticulină? ambele sunt argentice: aici **fibre ramificate, în rețea**, pe o secțiune (rinichi în LP, splină pe fișă)"
    ]
   },
   {
    "h": "Glanda sebacee · HE",
    "d": [
     "săculeți cu **rând de celule bazale**, nucleu picnotic spre canal"
    ]
   },
   {
    "h": "Zona fasciculată · HE",
    "d": [
     "celule palide, vacuolare, **în cordoane lungi**"
    ]
   },
   {
    "h": "Țesut adipos alb · HE (LP 7)",
    "d": [
     "adipocitul: !!o singură vacuolă!!, nucleu turtit, excentric"
    ]
   }
  ],
  "xtra": "Toate „golurile” (sebacee, fasciculată, adipocit) vin din lipidele dizolvate la prelucrarea lamei. Le deosebești după **așezare și nucleu**, nu după culoare.",
  "beatDur": 5
 },
 {
  "scene": "b.mosaic",
  "kick": "Recapitulare OSPE · Histologie · Capcane",
  "title": "Unde se pierd puncte la LP 6–7",
  "hud": [
   "poze reale",
   "8 capcane"
  ],
  "anim": false,
  "spec": "Mozaic fix cu pozele capcanelor (splina, fibroblast, colagen, pavimentos argentic, glanda mamară, reticular HE, sebacee, granulație), fără cercuri.",
  "sceneOpts": {
   "cols": 3,
   "tiles": [
    {
     "img": "splina",
     "lab": "1 · splina (argentic)"
    },
    {
     "img": "c_fibroblast",
     "lab": "2 · fibroblast"
    },
    {
     "img": "col",
     "lab": "3 · colagen"
    },
    {
     "img": "pav",
     "lab": "4 · pavimentos argentic"
    },
    {
     "img": "adi",
     "lab": "5 · lax + adipos"
    },
    {
     "img": "rt",
     "lab": "6 · reticular HE"
    },
    {
     "img": "seb",
     "lab": "7 · glanda sebacee"
    },
    {
     "img": "gr",
     "lab": "8 · granulație"
    }
   ]
  },
  "points": [
   {
    "h": "Rinichi sau splină?",
    "d": [
     "în LP: !!rinichi!!, cu tubi în ochiurile rețelei; pozele din splină arată aceeași rețea; diagnosticul e același: fibre de reticulină; la OSPE spui organul de pe fișă: **splină**"
    ]
   },
   {
    "h": "Confuzie · fibroblast vs. fibrocit",
    "d": [
     "fibroblast: nucleu mare, ovalar, hipocrom, nucleol · fibrocit: fusiform, intens hipercrom; invers = greșeala clasică"
    ]
   },
   {
    "h": "Greșit · „colagenul se ramifică”",
    "d": [
     "!!niciodată!!: trec dintr-un fascicul în altul, dar nu se ramifică, nu se anastomozează; reticulina da"
    ]
   },
   {
    "h": "Confuzie · negru: reticulină sau pavimentos?",
    "d": [
     "reticulina: fibre pe o secțiune de organ · pavimentosul (LP 2): contururi de celule pe un etalat"
    ]
   },
   {
    "h": "Atenție · aceeași lamă, două diagnostice",
    "d": [
     "glanda mamară HE = lax (în lobul) și adipos (adipocitele): citește sarcina"
    ]
   },
   {
    "h": "Greșit · „văd fibrele de reticulină” la HE",
    "d": [
     "la reticularul HE vezi **celulele reticulare**; fibrele negre = LP 6, argentic"
    ]
   },
   {
    "h": "Confuzie · adipos sau sebacee?",
    "d": [
     "adipos: o vacuolă, nucleu turtit, excentric · sebacee: citoplasmă vacuolară, rând de celule bazale"
    ]
   },
   {
    "h": "Puncte · spune colorația și explicația",
    "d": [
     "van Gieson: colagen roșu, nuclei negru-cafenii · adiposul: lipidul dizolvat la prelucrare · reticularul: !!de ce medulara!!"
    ]
   }
  ],
  "beatDur": 5
 },
 {
  "scene": "a.recap",
  "sceneOpts": {
   "keys": [
    "pav",
    "cub",
    "pri",
    "ps",
    "es",
    "uro"
   ],
   "first": 1
  },
  "kick": "Recapitulare OSPE · Histologie · Tabel (1/3)",
  "title": "Epiteliile de acoperire: diagnosticul, noțiunile de 1 p, partenerul",
  "anim": false,
  "spec": "Cele 6 câmpuri desenate, fixe; miniatura rândului curent se încercuiește.",
  "hud": [
   "lamele 1–6"
  ],
  "table": {
   "head": [
    "Diagnostic · colorație · organ",
    "Noțiunile de 1 p",
    "DD cu"
   ],
   "rows": [
    [
     "!!Epiteliul simplu pavimentos, impregnație argentică, mezenter!!",
     "limite crenelate · argintul precipită în spațiile intercelulare · nucleul și nucleolul nu se colorează",
     "epiteliul simplu cubic"
    ],
    [
     "Epiteliul simplu cubic, hematoxilină-eozină, rinichi",
     "celule aproximativ cubice (pătrate) · un singur rând pe membrana bazală · nuclei rotunzi",
     "epiteliul simplu prismatic (cilindric)"
    ],
    [
     "Epiteliul simplu prismatic (cilindric), hematoxilină-eozină, vezica biliară",
     "celule alungite, cilindrice · nucleii în jumătatea inferioară · pol apical cu platou striat (microvilozități)",
     "epiteliul simplu cubic"
    ],
    [
     "!!Epiteliul pseudostratificat, hematoxilină-eozină, trahee!!",
     "toate celulele ating membrana bazală · falsă impresie de stratificare · celule caliciforme (cupă de șampanie), fără cili",
     "uroteliul (epiteliul tranzițional)"
    ],
    [
     "Epiteliul stratificat pavimentos necheratinizat, hematoxilină-eozină, esofag",
     "bazal: nuclei hipocromi, rotunzi-ovalari · mijlociu: celule poligonale, strâns unite · nucleu tot mai mic, picnotic, excentric",
     "uroteliul (epiteliul tranzițional)"
    ],
    [
     "Uroteliul (epiteliul tranzițional), hematoxilină-eozină, vezica urinară",
     "membrana bazală invizibilă în hematoxilină-eozină · mijlociu: celule în rachetă de tenis · superficial: umbreliforme mari, puternic eozinofile · o umbreliformă acoperă 2–3 rachete",
     "epiteliul stratificat pavimentos necheratinizat"
    ]
   ]
  },
  "beatDur": 5
 },
 {
  "scene": "a.recap",
  "sceneOpts": {
   "keys": [
    "tub",
    "seb",
    "sub",
    "tir",
    "sr",
    "pan"
   ],
   "first": 7
  },
  "kick": "Recapitulare OSPE · Histologie · Tabel (2/3)",
  "title": "Glandele exocrine și endocrine: diagnosticul, noțiunile de 1 p, partenerul",
  "anim": false,
  "spec": "Cele 6 câmpuri desenate, fixe; miniatura rândului curent se încercuiește.",
  "hud": [
   "lamele 7–12"
  ],
  "table": {
   "head": [
    "Diagnostic · colorație · organ",
    "Noțiunile de 1 p",
    "DD cu"
   ],
   "rows": [
    [
     "!!Glanda tubulară simplă, hematoxilină-eozină, colon!!",
     "aspect de deget de mănușă (tub) · 3 segmente: fund, corp, gât · celule caliciforme: cupă de șampanie",
     "glanda tubulo-acinoasă"
    ],
    [
     "Glanda alveolară simplă (sebacee), hematoxilină-eozină, buză",
     "săculeț · citoplasmă vacuolară, necolorată (sebum) · celulele se dezintegrează: secreție holocrină",
     "glanda tubulo-acinoasă"
    ],
    [
     "Glanda tubulo-acinoasă, hematoxilină-eozină, glanda submandibulară",
     "seros: lumen foarte mic, punctiform · semiluna Gianuzzi (3–5 celule seroase) · celule mioepiteliale între membrana bazală și acini",
     "glanda tubulară simplă"
    ],
    [
     "!!Celule endocrine dispuse în foliculi, hematoxilină-eozină, glanda tiroidă!!",
     "foliculi rotunzi-ovalari · cavitate cu coloid eozinofil · celule turtite / cubice / cilindrice, după activitate · parafoliculare (C) lângă membrana bazală, nu ating coloidul",
     "celule endocrine dispuse în cuiburi și cordoane"
    ],
    [
     "Celule endocrine dispuse în cuiburi și cordoane, hematoxilină-eozină, glanda suprarenală",
     "corticală periferică, medulară centrală (20%) · fasciculata: cea mai groasă",
     "celule endocrine dispuse în foliculi"
    ],
    [
     "Insulele Langerhans (pancreasul endocrin), hematoxilină-eozină, pancreas",
     "insule rotunde-ovalare, mai palid colorate · tipurile celulare nu se identifică în hematoxilină-eozină, ci imunohistochimic · exocrinul: în totalitate acini seroși",
     "celule endocrine dispuse în cuiburi și cordoane"
    ]
   ]
  },
  "beatDur": 5
 },
 {
  "scene": "b.recap",
  "kick": "Recapitulare OSPE · Histologie · Tabel (3/3)",
  "title": "Țesutul conjunctiv: diagnosticul, noțiunile de 1 p, partenerul",
  "hud": [
   "lamele 13–19"
  ],
  "anim": false,
  "spec": "Cele 7 câmpuri desenate, fixe; miniatura rândului curent se încercuiește.",
  "table": {
   "head": [
    "Diagnostic · colorație · organ",
    "Noțiunile de 1 p",
    "DD cu"
   ],
   "rows": [
    [
     "!!Celulele țesutului conjunctiv, hematoxilină-eozină, țesut de granulație!!",
     "celularitate abundentă · vascularizație abundentă",
     "țesutul conjunctiv lax"
    ],
    [
     "Fibrele de colagen, Van Gieson, glanda mamară",
     "se colorează în roșu puternic · linii mai mult sau mai puțin sinuoase · nu se ramifică, nu se anastomozează niciodată",
     "fibrele de reticulină"
    ],
    [
     "Fibrele de reticulină, impregnație argentică, splină",
     "se colorează în negru · se ramifică · se anastomozează cu alte fibre",
     "fibrele de colagen"
    ],
    [
     "!!Țesutul conjunctiv lax, hematoxilină-eozină, glanda mamară!!",
     "celule, fibre, substanță fundamentală în proporții egale · fibre izolate sau în fascicule cu orientare variabilă · capilar longitudinal: nuclei ca dinții de fierăstrău",
     "țesutul conjunctiv adipos alb"
    ],
    [
     "Țesutul conjunctiv adipos alb, hematoxilină-eozină, glanda mamară",
     "predomină celulele, strâns una lângă alta · citoplasmă incoloră, celula pare goală · nucleu turtit, hipercrom, excentric: inel cu pecete",
     "țesutul conjunctiv lax"
    ],
    [
     "Țesutul conjunctiv tendinos, hematoxilină-eozină, tendon",
     "predomină fibrele de colagen, ordonate · fibre groase, palid eozinofile · „nuclei gemeni”, cap la cap",
     "țesutul conjunctiv lax"
    ],
    [
     "!!Țesutul conjunctiv reticular, hematoxilină-eozină, nodul limfatic!!",
     "zona medulară, cu limfocite rare · celule reticulare stelate · fibrele de reticulină nu se văd în hematoxilină-eozină",
     "fibrele de reticulină"
    ]
   ]
  },
  "beatDur": 5
 }
];
