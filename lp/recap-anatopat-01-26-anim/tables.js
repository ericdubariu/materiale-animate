// Tabelele finale: câte un rând pe preparat (semnele-cheie, diagnosticul complet, cu ce nu-l confunzi).
// Partenerul DD (bold) = cel din deck-urile de pe site; restul = alternativele din recapitularea PDF.
const T = (img, lab) => ({ img, lab });
const HEAD = ['Preparatul · organ', 'Ce vezi (semnele-cheie)', 'Diagnosticul complet', 'Nu confunda cu'];
const SPEC = 'Static: mozaic cu pozele reale ale preparatelor din tabel; pătratul rândului activ se aprinde.';

export const TABLES = [
  {
    scene: 'tiles', layout: 'script', anim: false, spec: SPEC,
    kick: 'Tabelul final (1/4) · lamele 1–5 · LP 1–2', title: 'Lamele de tulburări hemodinamice, pe un rând fiecare',
    sceneOpts: { cols: 2, tiles: [T('p1', '1 · edem'), T('p2', '2 · stază'), T('q2', '2 · infarct pulmonar'), T('p3', '3 · infarct renal'), T('p4', '4 · IMA'), T('p5', '5 · tromb mixt')] },
    table: {
      head: HEAD,
      rows: [
        ['1 Edem pulmonar acut · plămân, HE', 'alveole pline cu **transsudat roz, omogen**; bule de aer; septuri subțiri, capilare congestionate; fără neutrofile', 'edem pulmonar acut, cu congestie pulmonară acută', '**lama 2** · pneumonia acută · proteinoza alveolară'],
        ['2 Stază cronică · plămân, HE', 'septuri groase, fibroase; capilare pline; !!siderofage!! („celule cardiace”) în alveole', 'congestie pulmonară pasivă cronică (plămân de stază, indurație brună)', '**lama 1** · antracoza · hemoragia intraalveolară'],
        ['2 Infarct pulmonar · aceeași lamă', 'arie subpleurală; alveole pline cu hematii; !!septuri fără nuclei!!; plămân aerat alături', 'infarct pulmonar hemoragic (roșu), recent, subpleural', 'hemoragia intraalveolară · edemul · pneumonia'],
        ['3 Infarct renal anemic · rinichi (corticală), HE', 'contur păstrat, **nuclei absenți**; lizereu hemoragic-inflamator; parenchim viabil la margine', 'infarct renal anemic (alb), recent, cu necroză de coagulare', '**lama 4** · necroza tubulară acută · autoliza · infarctul roșu'],
        ['4 Infarct miocardic acut · miocard, HE', 'fibre hipereozinofile, fără nuclei și striații; edem; **neutrofile** cu carioreexă; lizereu congestiv', 'IMA, faza de infiltrat cu neutrofile (~3–7 zile): necroză de coagulare', '**lama 3** · miocardita · cicatricea post-infarct'],
        ['5 Tromb mixt · vas sanguin, HE', 'masă aderentă în lumen; lamele alternante trombocite + fibrină / hematii (!!liniile Zahn!!); fără organizare', 'tromb mixt (stratificat), recent, antemortem', '**lama 15** · cheagul postmortem · trombul organizat'],
      ],
    },
beatDur: 5,
  },
  {
    scene: 'tiles', layout: 'script', anim: false, spec: SPEC,
    kick: 'Tabelul final (2/4) · piesele 6–12 · LP 1–2', title: 'Piesele de tulburări hemodinamice, pe un rând fiecare',
    sceneOpts: { cols: 2, tiles: [T('p6', '6 · tromb aortic'), T('p7', '7 · tromb călăreț'), T('p8', '8 · infarct renal'), T('p9', '9 · infarct pulmonar'), T('p10', '10 · IMA'), T('p11', '11 · hematom'), T('p12', '12 · rinichi de șoc')] },
    table: {
      head: HEAD,
      rows: [
        ['6 Aorta cu tromb parietal · aortă', 'masă !!aderentă!!, friabilă, mată, cu linii Zahn, pe placă / anevrism; lumen păstrat', 'tromboză parietală (murală) a aortei, pe ateroscleroză / anevrism', '**piesa 7** · cheagul postmortem · placa de aterom · trombul obturant'],
        ['7 Trombul călăreț · plămâni + artere pulmonare', 'mase roșii-brune, cilindrice, încolăcite, friabile, mate, **neaderente**, în arterele pulmonare', 'tromboembolie pulmonară masivă: tromb călăreț („în șa”) la bifurcația a. pulmonare', '**piesa 6** · cheagul postmortem · tromboza in situ'],
        ['8 Infarct renal · rinichi', 'zonă palidă, triunghiulară, baza la capsulă, vârful la hil, lizereu roșu; capsulă deprimată', 'infarct renal anemic (alb), recent', '**piesa 9** · pielonefrita (abcese) · infarctul hemoragic · tumora'],
        ['9 Infarct pulmonar · plămân', 'zonă roșu-negricioasă, triunghiulară, fermă, baza la pleură (fibrină), vârful la hil', 'infarct pulmonar hemoragic (roșu), recent, prin tromboembolie', '**piesa 8** · pneumonia lobară · hemoragia · infarctul septic'],
        ['10 Infarct miocardic acut · cord', 'arie galben-palidă, moale, **transmurală**, cu margine hiperemică și focar hemoragic în peretele VS', 'infarct miocardic acut transmural al VS', '**piesa 23** · cicatricea post-infarct · miocardul normal'],
        ['11 Hematom intracerebral · creier', 'secțiune coronală; colecție profundă de sânge coagulat, neregulată, cu distrucție de țesut și inundație ventriculară', 'hemoragie cerebrală intraparenchimatoasă: hematom intracerebral profund', '**piesa 24** · hemoragia subarahnoidiană · hematomul subdural / epidural'],
        ['12 Rinichi de șoc · rinichi', 'rinichi mărit, moale; corticală palidă, lată; medulară congestionată; !!leziune difuză, bilaterală!!', 'rinichi de șoc: necroză tubulară acută ischemică', '**piesa 8** · pielonefrita · rinichiul de stază'],
      ],
    },
beatDur: 5,
  },
  {
    scene: 'tiles', layout: 'script', anim: false, spec: SPEC,
    kick: 'Tabelul final (3/4) · lamele 13–18 · LP 3–4', title: 'Lamele de distrofii și inflamații, pe un rând fiecare',
    sceneOpts: { cols: 2, tiles: [T('p13', '13 · hipercheratoză'), T('p14', '14 · steatoză'), T('p15', '15 · pericardită'), T('p16', '16 · abcese'), T('p17', '17 · TBC'), T('p18', '18 · corp străin')] },
    table: {
      head: HEAD,
      rows: [
        ['13 Hipercheratoză · piele, HE', 'strat cornos gros, lamelar, anucleat (orto); strat granulos proeminent; acantoză; fără atipii', 'hipercheratoză ortocheratozică cu acantoză', '**lama 18** · paracheratoza · papilomul · carcinomul scuamos'],
        ['14 Steatoză hepatică · ficat, HE', 'vacuole clare, rotunde, în hepatocite; macroveziculară: !!nucleu periferic, turtit!!; fără inflamație', 'steatoză hepatică macroveziculară difuză', '**lama 16** · balonizarea · ficatul de stază · amiloidoza'],
        ['15 Pericardită fibrinoasă · cord (epicard), HE', 'strat eozinofil, amorf, franjurat (fibrină) pe epicard; infiltrat inflamator, vase congestionate; organizare la bază', 'pericardită acută fibrinoasă', '**lama 5** · pericardita purulentă · pneumonia lobară'],
        ['16 Abcese hepatice · ficat, HE', 'colecție circumscrisă de neutrofile + detritus; **membrană piogenă**; hepatocite comprimate; fără granulom', 'abcese hepatice: inflamație purulentă circumscrisă, cu necroză de lichefiere', '**lama 17** · infarctul · tumora'],
        ['17 Limfadenită TBC · ganglion limfatic, HE', '!!necroză cazeoasă!! (roz, amorfă, fără contururi); celule epitelioide; Langhans (nuclei în potcoavă); limfocite', 'limfadenită tuberculoasă: inflamație granulomatoasă cu necroză cazeoasă', '**lama 18** · sarcoidoza · abcesul'],
        ['18 Granulom de corp străin · țesut moale, HE', 'material străin central; celule gigante de corp străin (nuclei dezordonați), macrofage, fibroză; fără cazeum', 'inflamație cronică granulomatoasă de corp străin', '**lama 17** · sarcoidoza · abcesul'],
      ],
    },
beatDur: 5,
  },
  {
    scene: 'tiles', layout: 'script', anim: false, spec: SPEC,
    kick: 'Tabelul final (4/4) · piesele 19–26 · LP 3–4', title: 'Piesele de distrofii și inflamații, pe un rând fiecare',
    sceneOpts: { cols: 2, tiles: [T('p19', '19 · ficat gras'), T('q20', '20 · pancreatită (micro)'), T('p21', '21 · litiază renală'), T('p22', '22 · litiază biliară'), T('p23', '23 · cord păros'), T('p24', '24 · abces cerebral'), T('p25', '25 · meningită'), T('p26', '26 · bronhopneumonie')] },
    table: {
      head: HEAD,
      rows: [
        ['19 Steatoză hepatică · ficat', 'ficat mult mărit, **galben uniform**, moale, margini rotunjite, unsuros la secțiune', 'steatoză hepatică difuză (ficat gras)', '**piesa 20** · ficatul de stază · ciroza · amiloidoza'],
        ['20 Pancreatită acută · pancreas', 'pancreas mărit, tumefiat; zone roșu-negricioase (hemoragie, necroză) + !!pete alb-cretoase!! (citosteatonecroză) pe pancreas și grăsime', 'pancreatită acută hemoragico-necrotică, cu citosteatonecroză', '**piesa 19** · autoliza · pancreatita cronică · carcinomul'],
        ['21 Litiază renală · rinichi', 'calculi (coraliform / multipli) în bazinet și calice; hidronefroză; parenchim atrofic; ± puroi', 'nefrolitiază cu hidronefroză secundară', '**piesa 22** · hidronefroza de altă cauză · pielonefrita cronică · TBC renală'],
        ['22 Litiază biliară · veziculă biliară', 'calculi multipli fațetați (galbeni / negri) sau unic de colesterol; perete îngroșat, fibros; mucoasă atrofică', 'colelitiază cu colecistită cronică litiazică', '**piesa 21** · colecistita acută · colesteroloza · carcinomul'],
        ['23 Pericardită fibrinoasă · cord', 'epicard mat, acoperit difuz de depozite de fibrină aspre, viloase, friabile (!!„cord păros”!!)', 'pericardită fibrinoasă (cor villosum)', '**piesa 10** · pericardita purulentă · hemoragică'],
        ['24 Abces cerebral · creier', 'cavitate rotundă cu puroi galben-verzui, capsulă alb-cenușie netedă, edem + efect de masă', 'abces cerebral încapsulat', '**piesa 11** · tumora · infarctul (pseudochist)'],
        ['25 Leptomeningită purulentă · creier (leptomeninge)', 'leptomeninge opace cu exsudat purulent galben-verzui **perivascular și în șanțuri**; vase congestionate; edem', 'leptomeningită acută purulentă (bacteriană)', '**piesa 24** · meningita TBC · hemoragia subarahnoidiană'],
        ['26 Bronhopneumonie · plămân', 'focare multiple 1–3 cm, gălbui-cenușii, ferme, **centrate pe bronhiole**, bazal, bilateral; țesut aerat între ele', 'bronhopneumonie (pneumonie lobulară, în focare)', '**piesa 9** · pneumonia lobară · TBC miliară · metastazele'],
      ],
    },
beatDur: 5,
  },
];
