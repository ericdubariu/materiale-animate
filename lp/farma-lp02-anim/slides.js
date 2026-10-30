// Conținutul slide-urilor Farmacologie LP 2 (Introducere · Farmacocinetică, partea 2: metabolizarea, excreția, cinetica).
// Sursa: LP 2 oficial al disciplinei (M1 MED2, 17 pagini). Formatul OSPE: modelul oficial (ultima pagină din LP 4).
// Absorbția, distribuția și cazul peptidului sunt în LP 1 (farma-lp01-anim). Ce e explicație proprie stă în `xtra`.

export const GLOS = [
  ['LP', 'lucrarea practică'], ['OSPE', 'examen practic structurat pe stații'], ['ADME', 'absorbție, distribuție, metabolizare, excreție (eliminare)'],
  ['EN', 'termenul în engleză'], ['LA', 'termenul în latină'],
  ['Bd', 'biodisponibilitatea'], ['F', 'biodisponibilitatea (simbolul din engleză)'], ['Vd', 'volumul aparent de distribuție'], ['Cp', 'concentrația plasmatică'],
  ['Cl', 'clearance-ul'], ['T½', 'timpul de înjumătățire'], ['t½', 'timpul de înjumătățire'], ['Ke', 'constanta de eliminare'],
  ['CYP450', 'citocromul P450'], ['P450', 'citocromul P450'], ['CYP', 'citocromul P450'], ['CYP3A4', 'izoforma 3A4 a citocromului P450'], ['CYP2C19', 'izoforma 2C19 a citocromului P450'],
  ['CBZ', 'carbamazepina'], ['HTA', 'hipertensiunea arterială'], ['GI', 'gastrointestinal'],
  ['pH', 'aciditatea mediului'], ['pKa', 'constanta de aciditate a substanței'], ['HA', 'acid slab, forma neionizată'], ['A⁻', 'acid slab, forma ionizată'],
  ['BH⁺', 'bază slabă, forma ionizată (B = baza slabă, forma neionizată)'], ['H⁺', 'ionul de hidrogen'], ['ATP', 'adenozin-trifosfatul (energia pompei)'], ['T1', 'momentul primei recoltări folosite'], ['T2', 'momentul celei de-a doua recoltări'], ['c1', 'concentrația la T1'], ['c2', 'concentrația la T2'],
  ['NaHCO₃', 'bicarbonatul de sodiu'], ['ln', 'logaritmul natural'], ['c0', 'concentrația inițială'], ['Δt', 'intervalul de timp'],
  ['mg/L', 'miligrame pe litru'], ['ng/mL', 'nanograme pe mililitru'], ['µg/mL', 'micrograme pe mililitru'],
];
export const TERMS = [
  ['farmacocinetic', 'farmacocinetica', 'ce face organismul cu medicamentul: absorbție, distribuție, metabolizare, excreție'],
  ['pro-drog', 'pro-drog (prodrug)', 'substanță inactivă ca atare, care devine activă abia după metabolizare'],
  ['prodrug', 'prodrug (pro-drog)', 'substanță inactivă ca atare, care devine activă abia după metabolizare'],
  ['inductor', 'inductor enzimatic', 'substanță care crește rata sintezei enzimelor de metabolizare'],
  ['inhibitor enzimatic', 'inhibitor enzimatic', 'substanță care scade rata sintezei / activitatea enzimelor de metabolizare'],
  ['autoinduc', 'autoinducția enzimatică', 'medicamentul induce chiar enzima care îl metabolizează'],
  ['microzomial', 'enzimele microzomiale', 'enzimele citocromului P450 din reticulul endoplasmatic'],
  ['xenobiotic', 'xenobiotice', 'substanțe străine organismului (inclusiv medicamentele)'],
  ['conjugare', 'conjugarea', 'atașarea unei grupări sau a unei substanțe (ex. acid glucuronic) la medicament sau la metabolit'],
  ['endogen', 'compuși endogeni', 'substanțe produse chiar de organism'],
  ['enterohepatic', 'circuitul enterohepatic', 'substanța trece din ficat în bilă, apoi în intestin, se reabsoarbe și revine la ficat'],
  ['peritubular', 'capilarele peritubulare', 'capilarele din jurul tubilor renali'],
  ['miopatie', 'miopatia', 'afectarea mușchilor scheletici'],
  ['rabdomioliz', 'rabdomioliza', 'distrugerea fibrelor musculare, cu eliberarea conținutului lor în sânge'],
  ['retard', 'formă retard', 'formă farmaceutică cu eliberare prelungită a substanței'],
  ['lipofil', 'lipofil', 'are afinitate pentru grăsimi: trece ușor prin membrane'],
  ['hidrofil', 'hidrofil', 'are afinitate pentru apă: trece greu prin membrane'],
];

const D = (h, ...d) => ({ h, d });
const FISA = (o, rows) => ({ scene: 'fisa', layout: 'script', anim: false, sceneOpts: o, script: rows, beatDur: 8,
  spec: 'Static: fișa cazului (iconița, titlul, enunțul scurt) cu subpunctele a, b, c…; sub fiecare câte o bulină pentru fiecare noțiune; subpunctul activ se colorează galben, cele trecute primesc ✓.' });

export const SLIDES = [
  // ---------------- COPERTA · HARTA · FORMATUL ----------------
  {
    deckName: 'Farmacologie · LP 2 · Farmacocinetică: metabolizarea și excreția',
    scene: 'cover2', anim: false, spec: 'Static: 4 carduri (ficatul cu faza I / faza II, enzimele ↑ cu inductorul și enzima gri ↓ cu inhibitorul, rinichiul cu capsulele polare/nepolare și „pH”, curba exponențială cu T½); cardul punctului se aprinde, pe intro rând pe rând.',
    kick: 'Farmacologie · LP 2 · Modulul 1 · OSPE', title: 'Metabolizarea și excreția: 7 cazuri de farmacocinetică',
    hud: ['LP 2 = M + E', 'cazurile 1–7'],
    points: [
      D('Metabolizarea: faza I și II, citocromul P450', 'enzime microzomiale (inductibile) vs. nemicrozomiale'),
      D('Inductor / inhibitor × drug / prodrug', 'cele 4 grafice; cazurile 1–4'),
      D('Excreția: căile, rinichiul în 3 pași, pH-ul urinar', 'cazul 5: fenobarbitalul'),
      D('Cinetica de ordinul I și 0, T½', 'cazurile 6–7 + fișa OSPE pentru fiecare caz'),
    ],
    xtra: 'Introducerea din LP 2 (definiția farmacocineticii, etapele ADME) este aceeași ca în LP 1 și e explicată în deck-ul LP 1.',
    beatDur: 5,
  },
  {
    scene: 'harta', anim: false, spec: 'Static: 4 pastile A → D → M → E; A și D estompate cu „LP 1”; sub M cazurile 1–4, sub E cazurile 5–7; coloana punctului se aprinde.',
    sceneOpts: { cols: [
      { l: 'A', n: 'Absorbție', other: true, cases: [['LP 1', 'transport, Bd, primul pasaj']] },
      { l: 'D', n: 'Distribuție', other: true, cases: [['LP 1', 'Vd, proteinele de legare']] },
      { l: 'M', n: 'Metabolizare', cases: [['Caz 1', 'carbamazepină + contraceptive'], ['Caz 2', 'autoinducția'], ['Caz 3', 'simvastatină + claritromicină'], ['Caz 4', 'clopidogrel + omeprazol']] },
      { l: 'E', n: 'Excreție', cases: [['Caz 5', 'fenobarbital, pH urinar'], ['Caz 6', 'T½ = 3 h, prize, retard'], ['Caz 7', 'tabelul: Ke, T½']] },
    ] },
    kick: 'Harta LP-ului', title: 'LP 2 = metabolizarea și excreția: 7 cazuri',
    hud: ['etapele sus', 'cazurile dedesubt'],
    points: [
      D('Absorbția', 'LP 1'),
      D('Distribuția', 'LP 1'),
      D('Metabolizarea', 'transformarea substanței medicamentoase în metaboliți !!în vederea excreției!!', 'cazurile 1–4'),
      D('Excreția (eliminarea)', 'îndepărtarea substanței medicamentoase din organism', 'cazurile 5–7'),
    ],
    why: 'Parametrii farmacocinetici: primari: biodisponibilitatea (Bd sau F), volumul aparent de distribuție (Vd), concentrația plasmatică (Cp), clearance-ul (Cl); secundar: timpul de înjumătățire (T½), care depinde de Cl și Vd.',
    beatDur: 5,
  },
  {
    scene: 'ospeOff', anim: false, spec: 'Static: stânga fișa studentului (subiectele 1–3 cu subpunctele și punctajul lor, „max 9 p + 1 p din oficiu”); dreapta sus baremul (2 noțiuni × 0,75 p), dreapta jos regula +50% (8 noțiuni, primele 4 verzi, 5–6 galbene, 7–8 tăiate); jos bara de 7 minute; zona punctului se încadrează.',
    kick: 'Formatul OSPE · Farmacologie', title: 'Fișă cu subpuncte, barem pe noțiuni: 9 puncte + 1 din oficiu',
    hud: ['7 minute', '9 p + 1 p'],
    points: [
      D('Fișa studentului', '2–3 subiecte (cazuri sau întrebări scurte), fiecare cu subpuncte a, b, c…', 'fiecare subpunct are punctajul lui (ex. 1a 1,5 p · 1b 0,5 p); subiectele combină LP-uri diferite'),
      D('Baremul: pe noțiuni', 'un subpunct = 1–2 noțiuni punctate (0 / parțial / maxim)', 'ex. 1a: „se distribuie în țesutul adipos” 0,75 p + „în sânge rămâne mai puțin, doze mai mari până la echilibrare” 0,75 p'),
      D('Regula +50%', 'poți răspunde cu maximum 50% mai multe noțiuni decât se cer', '!!se iau în considerare doar primele!!: la 4 noțiuni cerute, primele 6'),
      D('Timpul și punctajul', '!!7 minute · maximum 9 p + 1 p din oficiu!!', 'nu pui întrebări suplimentare examinatorului; se punctează ce spui'),
    ],
    why: 'Modelul oficial (ultima pagină din LP 4): subiectul 1 este cazul pacientului obez cu substanța lipofilă (LP 1): a. de ce e necesară creșterea dozei (1,5 p), b. ce etapă farmacocinetică este influențată (0,5 p).',
    warn: 'Spune !!întâi noțiunile de barem!!, scurt, pe fiecare subpunct. Dacă înșiri multe noțiuni, cele de la final nu mai sunt citite.',
    beatDur: 6,
  },
  // ---------------- PARTEA A · METABOLIZAREA ----------------
  {
    scene: 'metab', anim: true,
    spec: 'Două panouri. Stânga (majoritatea): o bilă portocalie (medicament activ, „efect”) coboară pe traseu, trece prin ficat și iese verde (metabolit), apoi coboară la vezică („excreție”). Dreapta (pro-drog): o bilă gri intră în ficatul 1 și iese portocalie strălucitoare (forma activă), merge la cercul verde „efect” (punctul 3); apoi intră în ficatul 2, iese verde și coboară la vezică (punctul 4). Punctul 1: static, bilele la start. Punctul 2: se animă doar stânga, în buclă. Intro: ambele trasee în buclă.',
    kick: 'Partea A · Metabolizarea', title: 'Metabolizarea: de obicei inactivează, la pro-drog activează',
    hud: ['stânga: medicament activ', 'dreapta: pro-drog'],
    points: [
      D('Definiția', '!!transformarea substanței medicamentoase în metaboliți în vederea excreției!!'),
      D('În majoritatea cazurilor', 'medicamentele active ca atare → !!metaboliți mai puțin activi sau inactivi!!, apoi excretați'),
      D('Pro-drogul (EN: prodrug)', 'unele substanțe se administrează în formă inactivă și !!necesită metabolizare în forma activă!! înainte de a-și produce efectul'),
      D('Apoi, la pro-drog', 'forma activă este transformată mai departe în forme inactive și excretată'),
    ],
    beatDur: 7,
  },
  {
    scene: 'phases', anim: false,
    spec: 'Static: stânga ficatul mare („predominant”) și dedesubt plămânul, rinichiul, intestinul („în măsură mult mai mică”); dreapta sus FAZA I (oxidare, hidroliză, reducere, citocromul P450, molecula → metabolit mai polar); dreapta jos FAZA II (conjugare: metilare, acetilare, sulfatare, glutation, acid glucuronic); jos cei 6 factori; panoul punctului se încadrează.',
    kick: 'Metabolizarea · Unde și cum', title: 'Ficatul face faza I (citocromul P450) și faza II (conjugarea)',
    hud: ['ficat · faza I · faza II'],
    points: [
      D('Unde', '!!predominant în ficat!!', 'în măsură mult mai mică: plămâni, rinichi, peretele intestinului subțire'),
      D('Faza I: oxidare, hidroliză, reducere', 'mediată de enzimele citocromului P450'),
      D('Faza II: reacții de conjugare', 'se adaugă la substanță sau la metabolit o grupare sau o substanță', 'metilare, acetilare, sulfatare, !!conjugare cu glutationul, conjugare cu acidul glucuronic!!'),
      D('Metabolizarea este influențată de', 'fondul genetic, vârstă, patologii hepatice, medicamente, alimente și suplimente alimentare'),
    ],
    why: 'În LP: reacțiile de metabolizare !!duc la formarea de metaboliți mai polari și mai ușor solubili în apă!!.',
    beatDur: 6,
  },
  {
    scene: 'enzymes', anim: false,
    spec: 'Static: stânga enzimele microzomiale: hepatocitul cu reticulul endoplasmatic și mitocondria (localizarea), enzima pac-man cu 5 forme diferite (specificitate redusă), 3 enzime cu „inductor ↑” și una gri cu „inhibitor ↓” (INDUCTIBILE); dreapta enzimele nemicrozomiale: enzime libere în plasmă, enzima care acceptă o singură formă (✓) și refuză alta (✕), „NU sunt inductibile”; panoul punctului se încadrează.',
    kick: 'Metabolizarea · Enzimele', title: 'Enzimele citocromului P450 sunt inductibile, enzimele libere nu',
        points: [
      D('Enzimele citocromului P450 (microzomiale)', 'localizate în reticulul endoplasmatic sau în membrana internă a mitocondriilor'),
      D('Specificitate de substrat redusă', 'metabolizează xenobiotice cu structuri extrem de diferite'),
      D('Inductibile', 'rata sintezei lor !!crește sub acțiunea inductorilor enzimatici și scade sub acțiunea inhibitorilor enzimatici!!'),
      D('Enzimele nemicrozomiale', 'enzime libere (plasmă, ficat, alte țesuturi), cu specificitate de substrat înaltă', 'enzime ale metabolismului intermediar: compuși endogeni și substanțe cu structură asemănătoare', '!!nu sunt inductibile!!'),
    ],
    beatDur: 6,
  },
  {
    scene: 'induct2', anim: true,
    spec: 'Două hepatocite cu câte 4 enzime CYP450 (pac-man portocalii). Stânga, punctul 1: inductorul (romb verde) coboară în nucleu și din nucleu ies pe rând 4 enzime noi (4 → 8). Dreapta, punctul 2: inhibitorul (bloc mov) coboară în celulă, iar 3 dintre enzime se micșorează și dispar pe rând (4 → 1). Punctul 3 (stânga): bilele albastre ale medicamentului intră de sus și dispar repede, bara Cp coboară sub linia „risc de ineficacitate”. Punctul 4 (dreapta): bilele se adună în celulă, bara Cp urcă peste linia „risc de toxicitate”. Intro: starea finală, bilele curg în buclă.',
    kick: 'Metabolizarea · Inducție și inhibiție', title: 'Inductorul crește sinteza enzimelor, inhibitorul o scade',
    hud: ['enzima CYP450 = pac-man', 'albastru = medicamentul activ'],
    points: [
      D('Inductorul enzimatic', '!!rata sintezei enzimelor crește!! → viteza de metabolizare crește', 'exemplul din LP: carbamazepina'),
      D('Inhibitorul enzimatic', '!!rata sintezei scade!! → viteza de metabolizare scade', 'exemplele din LP: claritromicina, omeprazolul'),
      D('Medicament activ + inductor', 'concentrația plasmatică scade → !!risc de ineficacitate terapeutică!!', 'creșterea dozei pentru același efect sau evitarea asocierii (alternative)'),
      D('Medicament activ + inhibitor', 'concentrația plasmatică crește → !!risc de toxicitate la doze terapeutice!!', 'scăderea dozei pentru același efect sau evitarea asocierii (alternative)'),
    ],
    xtra: 'Desenul arată numărul de molecule de enzimă: cu inductorul sunt mai multe, cu inhibitorul mai puține. În multe manuale inhibitorul apare ca blocând direct enzima; în LP scrie că scade rata sintezei, deci la examen spui varianta din LP.',
    beatDur: 7,
  },
  {
    scene: 'graphs4', anim: false,
    spec: 'Static: 4 grafice concentrație–timp (ca în LP), fiecare cu linia toxică roșie punctată, linia minimă eficace albă punctată și curba fără interacțiune (albă): drug + inductor (curba galbenă sub pragul minim), drug + inhibitor (curba roșie peste pragul toxic), prodrug + inductor (curba portocalie a metabolitului activ, peste prag), prodrug + inhibitor (curba albăstruie sub prag); graficul punctului se încadrează.',
    kick: 'Metabolizarea · Cele 4 grafice', title: 'Drug sau prodrug, inductor sau inhibitor: 4 rezultate',
    hud: ['la prodrug: curba metabolitului activ'],
    points: [
      D('Drug + inductor', 'viteza de metabolizare ↑, Cp ↓ → !!risc de ineficacitate terapeutică!!', 'doza ↑ pentru același efect sau evitarea asocierii (alternative)'),
      D('Drug + inhibitor', 'viteza ↓, Cp ↑ → !!risc de toxicitate la doze terapeutice!!', 'doza ↓ pentru același efect sau evitarea asocierii'),
      D('Prodrug + inductor', 'viteza ↑ → formarea metabolitului activ ↑ → Cp a metabolitului activ ↑', 'eficacitatea (și toxicitatea) ↑ → doza de prodrug ↓ sau evitarea asocierii'),
      D('Prodrug + inhibitor', 'viteza ↓ → formarea metabolitului activ ↓ → !!risc de ineficacitate la doze terapeutice!!', 'doza de prodrug ↑ sau evitarea asocierii'),
    ],
    xtra: 'La orice caz de interacțiune pui două întrebări: medicamentul afectat e drug (activ) sau prodrug? Celălalt e inductor sau inhibitor? Răspunsul îți arată graficul.',
    beatDur: 6,
  },
  // ---------------- CAZUL 1 ----------------
  {
    scene: 'c1carba', anim: false,
    spec: 'Static: stânga sus carbamazepina (pastilă verde) și contraceptivele orale (blister); stânga jos hepatocitul cu multe enzime „CYP3A4 ↑”; dreapta sus graficul contraceptivului: curba punctată fără inductor peste „nivel eficient”, curba galbenă cu carbamazepină sub el; dreapta jos prezervativul și steriletul; panoul punctului se încadrează.',
    kick: 'Cazul 1 · Carbamazepină + contraceptive orale', title: 'Cazul 1: carbamazepina induce CYP3A4, iar eficacitatea contraceptivelor orale poate fi compromisă',
    hud: ['drug + inductor'],
    points: [
      D('Enunțul', 'pacientă cu tratament cronic cu carbamazepină (antiepileptic cu acțiune inductoare enzimatică)', 'ca măsură contraceptivă: contraceptive orale'),
      D('Mecanismul', 'acțiunea inductoare enzimatică → !!expresia enzimei CYP3A4 crește!!'),
      D('Consecința', 'contraceptivele orale sunt metabolizate mai repede → !!eficacitatea lor poate fi compromisă!!'),
      D('Recomandarea', '!!se preferă alte metode contraceptive!!: prezervativ, sterilet'),
    ],
    why: 'Întrebarea din LP: „Ce comentarii / recomandări puteți face în acest caz?”',
    beatDur: 6,
  },
  {
    ...FISA({ title: 'Cazul 1 · carbamazepină', sub: '+ contraceptive orale', ico: 'pill', stage: 2, rows: [{ l: 'a', t: 'Ce comentarii faceți?', n: 3 }, { l: 'b', t: 'Ce recomandați?', n: 1 }, { l: 'c', t: 'Etapa (dacă se cere)', n: 1 }] }, [
      { tm: 'a · Ce comentarii faceți?', at: '3 noțiuni', tx: 'Carbamazepina este inductor enzimatic: !!crește expresia CYP3A4!!; contraceptivele orale sunt metabolizate mai repede, deci !!eficacitatea lor poate fi compromisă!!.' },
      { tm: 'b · Ce recomandați?', at: '1 noțiune', tx: '!!Alte metode contraceptive!!: prezervativ, sterilet.' },
      { tm: 'c · Dacă se cere etapa', at: '1 noțiune', tx: 'Metabolizarea (drug + inductor enzimatic).' },
    ]),
    kick: 'La OSPE · Cazul 1 · Carbamazepină + contraceptive', title: 'Răspunsul-model: inductor → CYP3A4 ↑ → altă metodă contraceptivă',
  },
  // ---------------- CAZUL 2 ----------------
  {
    scene: 'autoind', anim: false,
    spec: 'Static: sus enunțul (500 mg/zi, probe la 4, 8, 12 h, apoi după 3 săptămâni); stânga tabelul din LP (inițial vs. după 3 săptămâni, coloana a doua cu roșu); dreapta graficul celor două serii și bucla „carbamazepina își induce propria enzimă”; panoul punctului se încadrează.',
    kick: 'Cazul 2 · Autoinducția', title: 'Cazul 2: carbamazepina își induce chiar enzima care o metabolizează',
    hud: ['tabelul din LP'],
    points: [
      D('Enunțul', 'prima criză epileptică; carbamazepină (antiepileptic cu efect inductor enzimatic) 500 mg/zi', 'probe de sânge la 4, 8 și 12 ore; după 3 săptămâni, alte probe pentru ajustarea tratamentului'),
      D('Tabelul (mg/L)', 'inițial: 8,65 · 7,42 · 6,32', 'după 3 săptămâni: !!6,12 · 4,35 · 3,17!! → concentrații mai mici la toți timpii'),
      D('Explicația', 'carbamazepina este un puternic inductor enzimatic', 'este indusă inclusiv enzima responsabilă de metabolizarea ei: !!autoinducție enzimatică!!'),
    ],
    why: 'Cerința din LP: „Propuneți o explicație pentru modificările farmacocinetice observate la 3 săptămâni de la debutul terapiei.”',
    xtra: 'Din tabel se vede și că, după 3 săptămâni, concentrația scade mai repede între 4 și 12 h: medicamentul e metabolizat mai rapid.',
    beatDur: 6,
  },
  {
    ...FISA({ title: 'Cazul 2 · carbamazepină', sub: 'concentrații mai mici după 3 săptămâni', ico: 'pill', stage: 2, rows: [{ l: 'a', t: 'Ce explicație propuneți?', n: 2 }, { l: 'b', t: 'Etapa (dacă se cere)', n: 1 }] }, [
      { tm: 'a · Ce explicație propuneți?', at: '2 noțiuni', tx: 'Carbamazepina este un puternic inductor enzimatic; !!este indusă inclusiv enzima care o metabolizează (autoinducție enzimatică)!!, deci după 3 săptămâni concentrațiile sunt mai mici.' },
      { tm: 'b · Dacă se cere etapa', at: '1 noțiune', tx: 'Metabolizarea.' },
    ]),
    kick: 'La OSPE · Cazul 2 · Autoinducția', title: 'Răspunsul-model: inductor puternic → își induce propria enzimă',
  },
  // ---------------- CAZUL 3 ----------------
  {
    scene: 'simva', anim: false,
    spec: 'Static: stânga sus simvastatina și claritromicina; stânga jos hepatocitul cu CYP3A4 gri sub blocul mov al inhibitorului și mușchiul cu fulger roșu („miopatie: miozită, rabdomioliză”); dreapta sus graficul drug + inhibitor (curba roșie peste pragul toxic); dreapta jos „risc de toxicitate → scăderea dozei sau evitarea asocierii”; panoul punctului se încadrează.',
    kick: 'Cazul 3 · Simvastatină + claritromicină', title: 'Cazul 3: claritromicina încetinește metabolizarea simvastatinei → toxicitate musculară',
    hud: ['drug + inhibitor'],
    points: [
      D('Enunțul', 'simvastatină în doză maximă pentru hipercolesterolemie severă; pentru o infecție, medicul ia în considerare claritromicina'),
      D('Informațiile din LP', 'simvastatina e metabolizată de !!CYP3A4!!; poate cauza toxicitate musculară (miopatie): !!miozită, rabdomioliză!!', 'claritromicina este inhibitor enzimatic'),
      D('Explicația', 'simvastatina e metabolizată mai lent → !!concentrația crește → apar reacțiile adverse specifice!!'),
      D('Graficul: drug + inhibitor', 'risc de toxicitate la doze terapeutice → scăderea dozei sau evitarea asocierii (alternative)'),
    ],
    why: 'Întrebarea din LP: „Ce consecințe poate avea asocierea celor două medicamente?”',
    beatDur: 6,
  },
  {
    ...FISA({ title: 'Cazul 3 · simvastatină', sub: '+ claritromicină', ico: 'muscle', stage: 2, rows: [{ l: 'a', t: 'Ce consecințe are asocierea?', n: 3 }, { l: 'b', t: 'Ce faceți? (dacă se cere)', n: 1 }, { l: 'c', t: 'Etapa (dacă se cere)', n: 1 }] }, [
      { tm: 'a · Ce consecințe are asocierea?', at: '3 noțiuni', tx: 'Claritromicina, inhibitor enzimatic, încetinește metabolizarea simvastatinei (CYP3A4): !!concentrația de simvastatină crește → reacții adverse: miopatie (miozită, rabdomioliză)!!.' },
      { tm: 'b · Dacă se cere ce faceți', at: '1 noțiune', tx: 'Scăderea dozei sau evitarea asocierii (alternative).' },
      { tm: 'c · Dacă se cere etapa', at: '1 noțiune', tx: 'Metabolizarea (drug + inhibitor enzimatic).' },
    ]),
    kick: 'La OSPE · Cazul 3 · Simvastatină + claritromicină', title: 'Răspunsul-model: inhibitor → Cp ↑ → miopatie',
  },
  // ---------------- CAZUL 4 ----------------
  {
    scene: 'prodrug2', anim: true,
    spec: 'Două benzi. Sus (clopidogrel singur): punctul 1: bila gri „clopidogrel (inactiv)” intră din stânga în ficat; punctul 2: enzima CYP2C19 (pac-man portocaliu) o face portocalie strălucitoare („metabolit activ”), bila merge pe vas spre ținta „efect”, unde apare ✓. Jos (+ omeprazol): CYP2C19 e gri, cu blocul mov al omeprazolului și ✕; punctul 3: bila gri trece neschimbată și ajunge la ținta roșie „ineficacitate”. Punctul 4: ambele benzi în starea finală și eticheta roșie „se evită asocierea”. Intro: ambele benzi în buclă.',
    kick: 'Cazul 4 · Clopidogrel + omeprazol', title: 'Cazul 4: omeprazolul scade activarea clopidogrelului (pro-drog)',
    hud: ['sus: clopidogrel singur', 'jos: + omeprazol'],
    points: [
      D('Enunțul', 'HTA, angină pectorală, hipercolesterolemie, ulcer gastric', '!!clopidogrel (pro-drog) + omeprazol (inhibitor enzimatic)!!'),
      D('Pro-drogul are nevoie de metabolizare', 'clopidogrelul este transformat în metabolitul activ de !!enzima CYP2C19!!'),
      D('Omeprazolul', 'dintre inhibitorii pompei de protoni, e considerat inhibitor enzimatic → !!scade rata de bioactivare a clopidogrelului!!', 'graficul: prodrug + inhibitor → risc de ineficacitate'),
      D('Recomandarea', '!!se evită asocierea clopidogrel + omeprazol!!'),
    ],
    why: 'Cerința din LP: „Comentați asocierea clopidogrelului cu omeprazolul.” În LP: în cazul utilizării concomitente de inhibitori enzimatici, activarea pro-drug-urilor este redusă.',
    warn: 'Formularea din LP este „se evită asocierea”, nu „contraindicată”.',
    beatDur: 7,
  },
  {
    ...FISA({ title: 'Cazul 4 · clopidogrel', sub: '+ omeprazol', ico: 'liver', stage: 2, rows: [{ l: 'a', t: 'Comentați asocierea', n: 3 }, { l: 'b', t: 'Ce recomandați?', n: 1 }, { l: 'c', t: 'Etapa (dacă se cere)', n: 1 }] }, [
      { tm: 'a · Comentați asocierea', at: '3 noțiuni', tx: 'Clopidogrelul este pro-drog, !!activat de CYP2C19!!; omeprazolul este inhibitor enzimatic → !!scade rata de bioactivare a clopidogrelului!!, deci activarea pro-drogului e redusă (risc de ineficacitate).' },
      { tm: 'b · Ce recomandați?', at: '1 noțiune', tx: '!!Se evită asocierea!! clopidogrel + omeprazol.' },
      { tm: 'c · Dacă se cere etapa', at: '1 noțiune', tx: 'Metabolizarea (prodrug + inhibitor enzimatic).' },
    ]),
    kick: 'La OSPE · Cazul 4 · Clopidogrel + omeprazol', title: 'Răspunsul-model: pro-drog + inhibitor → activare ↓ → se evită asocierea',
  },
  // ---------------- PARTEA B · EXCREȚIA ----------------
  {
    scene: 'excr', anim: false,
    spec: 'Static: 5 panouri: urina (rinichii și vezica, „majoritatea”), fecalele (intestinul, 1 neabsorbite → 2 direct în fecale), bila (ficatul legat de intestin, 1 absorbite → 2 circuitul enterohepatic → 3 în fecale), aerul expirat (bronhiile, anestezicele inhalatorii), alte căi (lapte, transpirație, salivă, lacrimi); panoul punctului se încadrează.',
    kick: 'Partea B · Excreția', title: 'Excreția: majoritatea medicamentelor pe rinichi, unele și pe alte căi',
    hud: ['5 căi'],
    points: [
      D('Definiția', '!!îndepărtarea substanței medicamentoase din organism!!', '!!majoritatea medicamentelor sunt excretate la nivel renal!! (urina)'),
      D('Fecale', 'substanțele neabsorbite din tractul gastrointestinal sunt eliminate direct în fecale'),
      D('Bilă', 'substanțele absorbite din tractul gastrointestinal intră în circuitul enterohepatic, apoi sunt eliminate în fecale'),
      D('Aer expirat', '!!anestezicele inhalatorii se elimină la nivel pulmonar!!'),
      D('Alte căi', 'lapte, transpirație, salivă, lacrimi'),
    ],
    beatDur: 6,
  },
  {
    scene: 'nephron', anim: true,
    spec: 'Glomerulul (stânga) cu tubul orizontal (proximal, apoi distal) și dedesubt capilarul peritubular; capsule verzi = polare, hidrofile, capsule maro = nepolare, lipofile. Punctul 1: capsulele pleacă din glomerul și curg spre dreapta prin tub (filtrarea). Punctul 2: în dreptul tubului proximal, o capsulă verde urcă din capilar în tub prin pompa albastră „ATP” (secreție activă), iar una maro urcă direct (difuzie pasivă). Punctul 3: în tubul distal sunt multe capsule; cele maro coboară înapoi în capilar (difuzie pasivă), una verde curge spre „urină →”. Jos legenda statică. Intro: toate în buclă.',
    kick: 'Excreția · Rinichiul', title: 'Rinichiul în 3 pași: filtrare, secreție, reabsorbție',
    hud: ['verde = polar, hidrofil', 'maro = nepolar, lipofil'],
    points: [
      D('1 · Filtrarea glomerulară'),
      D('2 · Secreția tubulară (tubul contort proximal)', 'substanțele polare, hidrofile → !!secreție activă!!', 'substanțele nepolare, lipofile → difuzie pasivă'),
      D('3 · Reabsorbția tubulară (tubul contort distal)', 'nepolare, lipofile → !!pot trece înapoi în circulația peritubulară prin difuzie pasivă!!', 'polare, hidrofile → rămân în urină'),
    ],
    why: 'În LP: pe măsură ce substanțele sunt filtrate și secretate în urină, concentrația lor crește, iar la nivelul tubului contort distal devine mai mare decât în capilarele peritubulare.',
    xtra: 'La filtrarea glomerulară, substanța trece din sângele glomerulului în tub (urina primară); de aici începe drumul spre urină.',
    beatDur: 7,
  },
  {
    scene: 'urineph', anim: true,
    spec: 'Două panouri: stânga urina alcalină (verde închis) cu acid slab, dreapta urina acidă (maro) cu bază slabă; la mijloc peretele tubului (membrana), jos sângele. Punctul 1: în cartonașul de jos, o bilă HA coboară prin perete în sânge (neionizat = trece), A⁻ e oprit (✕). Punctul 2 (stânga): fiecare HA pierde un H⁺ (punct galben care urcă) și devine A⁻ albastru, care coboară la perete și ricoșează (✕). Punctul 3 (dreapta): fiecare B primește un H⁺ (punct galben care coboară pe el) și devine BH⁺, care ricoșează. Punctul 4: ambele panouri cu formele ionizate ricoșând + cartonașul „rămâne în urină → se elimină”. Intro: toate în buclă.',
    kick: 'Excreția · pH-ul urinar', title: 'pH-ul urinar decide: forma ionizată rămâne în urină',
    hud: ['stânga: acid slab', 'dreapta: bază slabă'],
    points: [
      D('Regula', 'forma neionizată = !!mai lipofilă!! → poate trece înapoi prin peretele tubului', 'forma ionizată = !!mai hidrofilă!! → nu trece'),
      D('Acid slab (HA) în urină alcalină', 'pH > pKa, H⁺ ↓ → HA devine !!A⁻ (ionizat)!!'),
      D('Bază slabă (B) în urină acidă', 'pH < pKa, H⁺ ↑ → B devine !!BH⁺ (ionizat)!!'),
      D('Consecința', 'forma ionizată nu se reabsoarbe tubular → rămâne în urină și se elimină (cazul 5)'),
    ],
    beatDur: 7,
  },
  // ---------------- CAZUL 5 ----------------
  {
    scene: 'pheno', anim: false,
    spec: 'Static: stânga sus persoana întinsă, inconștientă, cu blisterele goale; dreapta sus cele 3 date (HA = slab acid, rinichiul, săgeata de reabsorbție) și cărbunele activat; stânga jos flaconul NaHCO₃ → urina cu „pH ↑”; dreapta jos peretele tubului cu A⁻ oprite (✕) și „eliminare ↑”; panoul punctului se încadrează.',
    kick: 'Cazul 5 · Fenobarbital', title: 'Cazul 5: bicarbonatul alcalinizează urina, iar fenobarbitalul ionizat se elimină',
    hud: ['acid slab + urină alcalină'],
    points: [
      D('Enunțul', 'persoană găsită inconștientă, lângă blistere goale de fenobarbital', 'la spital: doze multiple de cărbune activat; cum crești eliminarea?'),
      D('Datele', 'fenobarbitalul are !!caracter slab acid!!, se excretă la nivel renal, se reabsoarbe tubular'),
      D('Propunerea', '!!bicarbonat de sodiu → alcalinizarea urinii!!'),
      D('Mecanismul', 'în mediu alcalin fenobarbitalul e predominant !!în formă ionizată!! → se evită reabsorbția → eliminarea crește'),
    ],
    why: 'Cerința din LP: „Propuneți o modalitate prin care se poate crește eliminarea fenobarbitalului.”',
    beatDur: 6,
  },
  {
    ...FISA({ title: 'Cazul 5 · fenobarbital', sub: 'slab acid, reabsorbit tubular', ico: 'kidney', stage: 3, rows: [{ l: 'a', t: 'Cum creșteți eliminarea?', n: 2 }, { l: 'b', t: 'Etapa (dacă se cere)', n: 1 }] }, [
      { tm: 'a · Cum creșteți eliminarea?', at: '2 noțiuni', tx: '!!Bicarbonat de sodiu, pentru alcalinizarea urinii!!. În mediu alcalin, fenobarbitalul (acid slab) este predominant !!în formă ionizată!!, deci nu se mai reabsoarbe tubular.' },
      { tm: 'b · Dacă se cere etapa', at: '1 noțiune', tx: 'Excreția (reabsorbția tubulară, influența pH-ului urinar).' },
    ]),
    kick: 'La OSPE · Cazul 5 · Fenobarbital', title: 'Răspunsul-model: bicarbonat → urină alcalină → ionizat → nu se reabsoarbe',
  },
  // ---------------- PARTEA C · CINETICA ----------------
  {
    scene: 'orders2', anim: true,
    spec: 'Două grafice cu Cp inițial 100 mg/L, timp 0–5 h. Stânga (ordinul I, portocaliu): curba exponențială 100 → 50 → 25 → 12,5 → 6,25; punctul 1: la fiecare oră apare pe rând o săgeată verticală cu cât s-a eliminat (50, 25, 12,5, 6,25: tot mai scurte). Dreapta (ordinul 0, albastru): dreapta 100 → 75 → 50 → 25 → 0; punctul 2: săgețile apar pe rând, toate egale (25). Punctul 3: pe ambele grafice apar t½ (stânga: 1 h, 1 h, 1 h; dreapta: 2 h, 1 h, 0,5 h) și se încadrează definiția de jos. Sub grafice, cele 4 proprietăți ale fiecărei cinetici (statice). Intro: totul desenat.',
    kick: 'Partea C · Cinetica de eliminare', title: 'Ordinul I: aceeași fracție pe oră; ordinul 0: aceeași cantitate pe oră',
    hud: ['stânga: ordinul I', 'dreapta: ordinul 0'],
    points: [
      D('Cinetica de ordinul I', 'neliniară, exponențială; cantitatea eliminată variază proporțional cu Cp', 'rata de eliminare constantă; !!timpul de înjumătățire este constant!!', 'exemplul din LP: 100 mg/L, se elimină 50% pe oră'),
      D('Cinetica de ordinul 0', 'liniară; !!cantitatea eliminată este constantă în timp!!', 'rata de eliminare variază; !!timpul de înjumătățire variază!!', 'exemplul din LP: 100 mg/L, se elimină 25 mg/L pe oră → t½ = 2 h, apoi 1 h, apoi 0,5 h'),
      D('Timpul de înjumătățire (t½)', '!!timpul în care concentrația plasmatică a substanței se reduce la jumătate!!'),
    ],
    beatDur: 8,
  },
  // ---------------- CAZUL 6 ----------------
  {
    scene: 'c6', anim: false,
    spec: 'Static: stânga graficul (10 ng/mL la 1 h, 5 ng/mL la 4 h, acolada „T½ = 3 h”, banda verde 15–21 h „5–7 × T½”); dreapta cele 5 variante, D verde; jos axa de 24 h cu 8 pastile la fiecare 3 h; jos-stânga „T½ lung → administrări mai rare”, jos-dreapta forma retard; zona punctului se încadrează.',
    kick: 'Cazul 6 · Timpul de înjumătățire', title: 'Cazul 6: T½ = 3 h → eliminat în 15–21 h, 8 prize pe zi, soluția: retard',
    hud: ['ordinul 1', 'T½ = 3 h'],
    points: [
      D('Enunțul', 'doză unică: pic plasmatic !!10 ng/mL la o oră!!; după 4 ore: 5 ng/mL; epurare de ordinul 1'),
      D('1 · Practic eliminat după…', 'T½ = 3 h; eliminarea completă se realizează după 5–7 T½: 5 × 3 = 15, 7 × 3 = 21 → !!D. 15–21 h!!'),
      D('2 · În câte prize zilnice?', 'pentru majoritatea medicamentelor, intervalul dintre doze este 1–2 T½ (concentrații în intervalul terapeutic)', 'cu interval = 1 T½: 24 h : 3 = !!8 administrări pe zi!!'),
      D('3 · T½ mai lung → administrări?', 'numărul de administrări ar fi mai mic: T½ scurt → administrări mai dese, T½ lung → mai rare'),
      D('4 · Cum reduci numărul de administrări?', '!!forme farmaceutice retard / cu eliberare prelungită!!'),
    ],
    why: 'Întrebările din LP: 1. după cât timp e practic eliminată (A. 6–8 h, B. 10–14 h, C. 5–7 h, D. 15–21 h, E. 14–16 h)? 2. în câte prize zilnice? 3. dacă T½ ar fi mai lung, numărul de administrări ar fi mai mare sau mai mic? 4. ce s-ar putea face pentru a reduce numărul de administrări?',
    warn: 'T½ se măsoară între 1 h și 4 h (10 → 5 ng/mL): 3 ore, nu 4 ore.',
    beatDur: 6,
  },
  {
    ...FISA({ title: 'Cazul 6 · T½', sub: '10 ng/mL la 1 h, 5 ng/mL la 4 h', ico: 'pill', stage: 3, rows: [{ l: '1', t: 'Practic eliminat după?', n: 1 }, { l: '2', t: 'Câte prize pe zi?', n: 2 }, { l: '3', t: 'T½ mai lung?', n: 1 }, { l: '4', t: 'Mai puține administrări?', n: 1 }] }, [
      { tm: '1 · Practic eliminat după?', at: '1 noțiune', tx: '!!Răspuns: D (15–21 h)!!. T½ = 3 h; eliminarea completă se realizează după 5–7 T½: 5 × 3 = 15, 7 × 3 = 21.' },
      { tm: '2 · În câte prize zilnice?', at: '2 noțiuni', tx: 'Intervalul dintre doze este 1–2 T½; cu un interval de un T½: 24 : 3 = !!8 administrări pe zi!!.' },
      { tm: '3 · Dacă T½ ar fi mai lung?', at: '1 noțiune', tx: 'Numărul de administrări ar fi !!mai mic!! (T½ lung → administrări mai rare).' },
      { tm: '4 · Cum reduci numărul de administrări?', at: '1 noțiune', tx: 'Forme farmaceutice retard / cu eliberare prelungită.' },
    ]),
    kick: 'La OSPE · Cazul 6 · T½', title: 'Răspunsul-model: D (15–21 h), 8 prize, mai rar, retard',
  },
  // ---------------- CAZUL 7 ----------------
  {
    scene: 'c7', anim: false, sceneOpts: { part: 1 },
    spec: 'Static: stânga graficul punctelor din tabel (0–12 h), cu dreapta punctată „nu scade liniar”, cercul mov la începutul curbei („2 ore? distribuție”) și cercul verde pe ultimele puncte; dreapta tabelul din LP (25 și 12,5 evidențiate); jos-stânga „practic completă după 5–7 × T½”, jos-dreapta calculul Ke și T½; zona punctului se încadrează.',
    kick: 'Cazul 7 · Tabelul de concentrații', title: 'Cazul 7: din tabel, T½ = 3 h, calculat cu valorile de la final',
    hud: ['valorile de la final'],
    points: [
      D('Enunțul', 'doză unică; probe la 0, 1, 2, 5, 6, 9, 12 h', '100 · 70 · 50 · 35 · 25 · 12,5 · 6,25 µg/mL'),
      D('1 · Tipul de cinetică', 'concentrația plasmatică nu scade liniar → !!cinetică de ordinul I!!'),
      D('2 · Când e practic completă eliminarea?', 'eliminarea depinde de T½: !!completă după 5–7 T½!!'),
      D('3 · T½: atenție la prima fază', 'la început au loc procese de distribuție și redistribuție (sânge ⇄ țesuturi): T½ aparent poate să nu fie corect („2 ore?”)', 'se iau în calcul valori dinspre sfârșitul monitorizării'),
      D('Calculul', 'c = c0 · e^(−Ke·Δt) → Ke = (ln c1 − ln c2) : (T2 − T1)', 'Ke = (ln 25 − ln 12,5) : (9 − 6) = (3,21 − 2,52) : 3 = 0,23 → !!T½ = 0,693 / 0,23 = 3 ore!!'),
    ],
    beatDur: 7,
  },
  {
    scene: 'c7', anim: false, sceneOpts: { part: 2 },
    spec: 'Static: sus proteina plasmatică (elipsă galbenă) cu moleculele legate și „legarea de proteine → T½ crește”; jos-stânga rinichiul cu „insuficiență renală → eliminare renală ↓”; jos-dreapta pastilele „Cl ↓” și „T½ ↑”; panoul punctului se încadrează.',
    kick: 'Cazul 7 · Proteinele și rinichiul', title: 'Cazul 7 (continuare): legarea de proteine și insuficiența renală cresc T½',
    hud: ['întrebările 4–6'],
    points: [
      D('4 · Legarea de proteinele plasmatice', '!!crește timpul de înjumătățire!!'),
      D('5 · Insuficiența renală', 'eliminarea pe cale renală este !!scăzută!!'),
      D('6 · Ce parametri se schimbă', '!!Cl scade, T½ crește!!'),
    ],
    xtra: 'Fracția legată de proteine nu poate fi eliminată renal, de aceea medicamentul rămâne mai mult în organism.',
    beatDur: 6,
  },
  {
    ...FISA({ title: 'Cazul 7 · tabelul', sub: '100 → 6,25 µg/mL în 12 h', ico: 'kidney', stage: 3, rows: [{ l: '1', t: 'Tipul de cinetică', n: 1 }, { l: '2', t: 'Când e completă eliminarea?', n: 1 }, { l: '3', t: 'T½', n: 2 }, { l: '4', t: 'Proteinele și T½', n: 1 }, { l: '5', t: 'Insuficiența renală', n: 1 }, { l: '6', t: 'Ce parametri?', n: 2 }] }, [
      { tm: '1 · Ce tip de cinetică?', at: '1 noțiune', tx: 'Cp nu scade liniar → cinetică de ordinul I.' },
      { tm: '2 · Când e practic completă eliminarea?', at: '1 noțiune', tx: 'Eliminarea depinde de T½: este completă după 5–7 T½.' },
      { tm: '3 · Care este T½?', at: '2 noțiuni', tx: '!!T½ = 0,693 / Ke = 0,693 / 0,23 = 3 h!!, calculat cu valori dinspre sfârșitul monitorizării: Ke = (ln 25 − ln 12,5) : (9 − 6) = 0,23. În prima fază au loc distribuția și redistribuția, deci T½ aparent („2 ore?”) poate să nu fie corect.' },
      { tm: '4 · Legarea de proteine și T½?', at: '1 noțiune', tx: '!!Legarea de proteinele plasmatice crește T½!!.' },
      { tm: '5 · Eliminarea renală în insuficiența renală?', at: '1 noțiune', tx: 'Este scăzută.' },
      { tm: '6 · Ce parametri și cum?', at: '2 noțiuni', tx: '!!Cl scade, T½ crește!!.' },
    ]),
    kick: 'La OSPE · Cazul 7 · Tabelul', title: 'Răspunsul-model: ordinul I, 5–7 T½, T½ = 3 h, Cl ↓ și T½ ↑',
  },
  // ---------------- FINAL ----------------
  {
    scene: 'cards', anim: false,
    spec: 'Static: 8 carduri „✕ greșit / ✓ corect”; cardul punctului se aprinde.',
    sceneOpts: { cols: 2, items: [
      { t: '1 · drug + inductor', w: 'efect mai mare', r: 'Cp ↓ → ineficacitate' }, { t: '2 · prodrug + inhibitor', w: 'toxicitate', r: 'activare ↓ → ineficacitate' },
      { t: '3 · clopidogrel + omeprazol', w: '„contraindicată”', r: '„se evită asocierea”' }, { t: '4 · autoinducția', w: 'eliminare renală ↑', r: 'își induce propria enzimă' },
      { t: '5 · enzimele nemicrozomiale', w: 'inductibile', r: 'nu sunt inductibile' }, { t: '6 · fenobarbitalul (acid slab)', w: 'acidifiezi urina', r: 'bicarbonat: alcalinizezi' },
      { t: '7 · T½ în cazul 6', w: '4 h (de la 0)', r: '3 h (de la 1 h la 4 h)' }, { t: '8 · T½ în cazul 7', w: 'din primele ore', r: 'din valorile de la final' },
    ] },
    kick: 'Capcane', title: 'Unde se pierd puncte la LP 2',
    points: [
      D('Drug + inductor', 'nu crește efectul: !!Cp scade → risc de ineficacitate!!'),
      D('Prodrug + inhibitor', 'invers față de drug: metabolitul activ se formează mai puțin → ineficacitate'),
      D('Clopidogrel + omeprazol', 'formularea din LP: „se evită asocierea”'),
      D('Autoinducția (cazul 2)', 'carbamazepina induce chiar enzima care o metabolizează'),
      D('Enzimele nemicrozomiale', 'libere, specificitate înaltă, !!nu sunt inductibile!!'),
      D('Fenobarbitalul', 'acid slab → urina se alcalinizează (bicarbonat de sodiu) → formă ionizată → nu se reabsoarbe'),
      D('T½ în cazul 6', 'vârful e la 1 h, deci T½ = 4 − 1 = 3 h → 15–21 h'),
      D('T½ în cazul 7', 'prima fază e distribuție / redistribuție: calculezi cu valorile de la final (25 → 12,5 între 6 și 9 h)'),
    ],
    beatDur: 5,
  },
  {
    scene: 'recapT', layout: 'script', anim: false,
    spec: 'Static (coloana îngustă): 9 benzi = cele 9 rânduri ale tabelului, fiecare cu litera etapei (M mov, E verde) și numele; banda rândului se aprinde.',
    sceneOpts: { rows: [[2, 'M', '1 · carbamazepină + contraceptive'], [2, 'M', '2 · autoinducția'], [2, 'M', '3 · simvastatină + claritromicină'], [2, 'M', '4 · clopidogrel + omeprazol'], [3, 'E', '5 · fenobarbital'], [3, 'E', '6 · T½ = 3 h'], [3, 'E', '7 · tabelul: Ke, T½'], [2, 'M', 'faza I / faza II, enzimele'], [3, 'E', 'ordinul I vs. ordinul 0']] },
    kick: 'Recapitulare', title: 'Tot LP 2 într-un tabel',
    table: { head: ['Cazul / tema', 'Etapa', 'Mecanismul', 'Concluzia'], rows: [
      ['1. Carbamazepină + contraceptive', 'M', 'inductor → CYP3A4 ↑', 'eficacitate compromisă → !!prezervativ, sterilet!!'],
      ['2. Carbamazepină, 3 săptămâni', 'M', 'autoinducție enzimatică', 'concentrații mai mici'],
      ['3. Simvastatină + claritromicină', 'M', 'inhibitor → metabolizare mai lentă', 'Cp ↑ → miopatie'],
      ['4. Clopidogrel + omeprazol', 'M', 'prodrug + inhibitor (CYP2C19)', 'activare ↓ → !!se evită asocierea!!'],
      ['5. Fenobarbital', 'E', 'acid slab, reabsorbit tubular', 'bicarbonat → urină alcalină → ionizat → eliminare ↑'],
      ['6. T½ = 3 h', 'E', '10 → 5 ng/mL între 1 h și 4 h', '15–21 h (D); 8 prize/zi; retard'],
      ['7. Tabelul', 'E', 'ordinul I; valorile de la final', '!!T½ = 3 h!!; proteine → T½ ↑; insuficiență renală: Cl ↓, T½ ↑'],
      ['Fazele, enzimele', 'M', 'faza I (CYP450) / faza II (conjugare)', 'CYP450 inductibile; nemicrozomiale nu'],
      ['Ordinul I vs. 0', 'E', 'fracție constantă vs. cantitate constantă', '!!t½ constant vs. t½ variabil!!'],
    ] },
    beatDur: 6,
  },
];
