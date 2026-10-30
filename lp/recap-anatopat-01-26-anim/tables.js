// Tabelele finale: câte un rând pe preparat (semnele-cheie, diagnosticul complet, cu ce nu-l confunzi).
// Partenerul DD (bold) și cele 2 alternative = cele din deck-urile anatopat-z1…z4 (preparate de pe listă); faptele = din LP (S1, S2).
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
        ['1 Edem pulmonar acut · plămân, HE', 'alveole pline cu **substanță omogenă, eozinofilă** (transsudat), cu bule de aer; septuri ușor expandate; vase congestionate', 'edem pulmonar acut', '**lama 2** · infarctul pulmonar (lama 2) · pericardita fibrinoasă'],
        ['2 Stază cronică · plămân, HE', 'septuri îngroșate, fibrozate; !!siderofage!! (celule cardiace) cu hemosiderină în alveole', 'plămân de stază cronică (congestie pulmonară cronică)', '**lama 1** · infarctul renal · trombul mixt'],
        ['2 Infarct pulmonar · aceeași lamă', 'zonă bine delimitată: alveole inundate hemoragic, !!septuri fără nuclei!!; lizereu congestiv spre stază', 'infarct pulmonar roșu (hemoragic), pe stază cronică', '**lama 1** · infarctul renal (lama 3) · trombul mixt'],
        ['3 Infarct renal · rinichi, HE', 'aspect **fantomatic**: nuclei pierduți, arhitectura păstrată; **lizereu congestiv** (capilare congestionate + infiltrat inflamator acut)', 'infarct renal alb (anemic, ischemic)', '**lama 4** · infarctul pulmonar (lama 2) · abcesele hepatice'],
        ['4 Infarct miocardic acut · miocard, HE', 'fibre !!fără nuclei!!, sarcoplasmă omogenă, intens eozinofilă; lizereu: bandă internă de granulocite, externă de congestie; țesut de granulație la limită', 'infarct miocardic acut', '**lama 3** · pericardita fibrinoasă · abcesele hepatice'],
        ['5 Tromb mixt · vas arterial, HE', 'aderent de perete; rețea de fibrină cu straturi alternante (leucocite + trombocite / eritrocite): !!liniile lui Zahn!!', 'tromb mixt stratificat', '**lama 15** · infarctul pulmonar (lama 2) · hipercheratoza'],
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
        ['6 Aortă cu tromb parietal · aortă abdominală', 'tromb parietal, **aderent**, pe intima cu **plăci aterosclerotice**', 'aortă cu ateroscleroză și tromb parietal', '**piesa 7** · pericardita fibrinoasă · hemoragiile intracraniene'],
        ['7 Tromb călăreț · aorta abdominală + iliacele comune', 'tromb !!călare pe bifurcația aortei!!, în ambele artere iliace comune; mixt stratificat, aderent, mat, friabil', 'tromb călăreț (pe bifurcația aortei)', '**piesa 6** · infarctul pulmonar · hemoragiile intracraniene'],
        ['8 Infarct renal · rinichi', 'zonă palidă, conturată de !!lizereu congestiv!!, vizibilă și pe suprafața externă', 'infarct renal alb (anemic)', '**piesa 9** · rinichiul de șoc · litiaza renală'],
        ['9 Infarct pulmonar · plămân', 'zonă **triunghiulară, roșie-negricioasă**, cu vârful spre hil, bine delimitată; în jur **stază cronică**', 'infarct pulmonar roșu (hemoragic)', '**piesa 8** · bronhopneumonia · trombul călăreț'],
        ['10 Infarct miocardic acut · cord', 'zonă palidă cu !!halou hiperemic!! în peretele VS (12–24 h); la 2–3 zile galben ca lutul, moale', 'infarct miocardic acut', '**piesa 23** · infarctul renal · aorta cu tromb parietal'],
        ['11 Hemoragii intracraniene · creier', 'hematom intracerebral: sânge în **parenchim** (impregnare hematică) și în **ventricul** (inundare ventriculară); în LP și hematom subdural, subarahnoidian', 'hemoragie intracerebrală, cu hemoragie intraventriculară', '**piesa 24** · leptomeningita purulentă · trombul călăreț'],
        ['12 Rinichi de șoc · rinichi', '!!corticala palidă, medulara hiperemică!!, bine delimitate; micro: necroză tubulară reversibilă, glomeruli neafectați', 'rinichi de șoc', '**piesa 8** · litiaza renală · steatoza hepatică'],
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
        ['13 Hipercheratoză · piele, HE', 'strat cornos !!îngroșat, fără nuclei!!; restul straturilor fără modificări (uneori acantoză moderată); derm și hipoderm normale', 'hipercheratoză (clavus)', '**lama 18** · pericardita fibrinoasă · trombul mixt'],
        ['14 Steatoză hepatică · ficat, HE', 'structura lobulară păstrată; vacuole !!optic goale, rotunde, net delimitate!!; macrovacuolele împing nucleul la periferie', 'distrofie adipoasă hepatică (steatoză)', '**lama 16** · edemul pulmonar acut · pericardita (țesutul adipos epicardic)'],
        ['15 Pericardită fibrinoasă · cord (epicard), HE', 'miocard păstrat; țesut subepicardic îngroșat, capilare congestionate, infiltrat (granulocite, limfocite, histiocite); pe seroasa ulcerată **rețea de fibrină roșu-roz**', 'pericardită fibrinoasă', '**lama 5** · infarctul miocardic acut · hipercheratoza'],
        ['16 Abcese hepatice · ficat, HE', 'teritorii **fără țesut hepatic**, cu multe granulocite, globule de puroi, colonii de microbi; delimitate de țesut conjunctiv', 'abcese hepatice (inflamație purulentă)', '**lama 17** · steatoza (lama 14) · infarctul renal'],
        ['17 Limfadenită TBC · nodul limfatic, HE', 'granuloame cu !!necroză cazeoasă!! în centru, celule epiteloide + Langhans, coroană limfocitară', 'limfadenită tuberculoasă', '**lama 18** · abcesele hepatice · infarctul renal'],
        ['18 Granulom de corp străin · glandă mamară, HE', 'macrofage și celule gigante cu nuclei !!fără nicio ordine!!, în jurul cristalelor de colesterol; țesut de granulație', 'granulom de corp străin', '**lama 17** · abcesele hepatice · hipercheratoza'],
      ],
    },
beatDur: 5,
  },
  {
    scene: 'tiles', layout: 'script', anim: false, spec: SPEC,
    kick: 'Tabelul final (4/4) · piesele 19–26 · LP 3–4', title: 'Piesele de distrofii și inflamații, pe un rând fiecare',
    sceneOpts: { cols: 2, tiles: [T('p19', '19 · ficat gras'), T('p20', '20 · pancreatită acută'), T('p21', '21 · litiază renală'), T('p22', '22 · litiază biliară'), T('p23', '23 · pericardită'), T('p24', '24 · abces cerebral'), T('p25', '25 · leptomeningită'), T('p26', '26 · bronhopneumonie')] },
    table: {
      head: HEAD,
      rows: [
        ['19 Steatoză hepatică · ficat', 'ficat **mărit, gălbui**, suprafață netedă, lucioasă, capsulă tensă, marginea rotunjită; friabil; lama cuțitului grăsoasă', 'steatoză hepatică (ficat gras)', '**piesa 20** · rinichiul de șoc · infarctul renal'],
        ['20 Pancreatită acută · pancreas', 'structură inomogenă: focare (2–6 mm) !!gălbui-albicioase de steatonecroză!!, și în grăsimea peripancreatică; hemoragii negricioase după fixare', 'pancreatită acută', '**piesa 19** · infarctul pulmonar · litiaza biliară'],
        ['21 Litiază renală · rinichi', 'calculi (coraliformi) în sistemul pielo-caliceal; calice dilatate, parenchim atrofic: **hidronefroză**', 'litiază renală cu hidronefroză', '**piesa 22** · rinichiul de șoc · infarctul renal'],
        ['22 Litiază biliară · colecist', 'colecist deschis cu calculi: **colesterolici** (galbeni, friabili) și **pigmentari** (**multipli, mici, fațetați**); cu săruri de calciu: albicioși, ca zarurile', 'litiază biliară', '**piesa 21** · pancreatita acută · steatoza hepatică'],
        ['23 Pericardită fibrinoasă · cord', 'pericard mat, rugos, fără luciu; depozite neregulate de fibrină, albicioase-cenușii: !!„limbă de pisică”!!', 'pericardită fibrinoasă', '**piesa 10** · aorta cu tromb parietal · leptomeningita purulentă'],
        ['24 Abces cerebral · creier', 'cavitate **rotund-ovalară**, intraparenchimatoasă, cu conținut purulent; membrană piogenă', 'abces cerebral', '**piesa 11** · leptomeningita purulentă · bronhopneumonia'],
        ['25 Leptomeningită purulentă · creier (leptomeninge)', 'exsudat purulent pe convexitate: girusuri aplatizate, șanțuri îngustate (!!„meningită în șapcă”!!)', 'leptomeningită purulentă', '**piesa 24** · hemoragiile intracraniene · pericardita fibrinoasă'],
        ['26 Bronhopneumonie · plămân', 'focare de condensare !!roșu închis!!, multiple, bilaterale, în jurul bronhiilor; între ele țesut aerat; pot conflua', 'bronhopneumonie', '**piesa 9** · leptomeningita purulentă · abcesul cerebral'],
      ],
    },
beatDur: 5,
  },
];
