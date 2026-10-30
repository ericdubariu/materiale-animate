# Brief: deck animat nou pentru site (materiale-animate)

Publicul: studenți anul 2 Medicină Generală, UMFST. Învață prin mecanisme, memorie vizuală, nu poate toci. Totul în română (ș/ț cu virgulă, nu ş/ţ). Ton: persoana a II-a, prietenos, clar, fără emoji, fără umplutură.

Repo: `/home/claude/materiale-animate` (site GitHub Pages). NU faci commit/push și NU atingi `decks.json`, `index.html` din rădăcină sau deck-urile altora: lucrezi DOAR în folderul tău `lp/<id>/`. Altcineva publică.

## Pornire
- Șablon: copiezi din `lp/embrio-lp06-anim/`: `index.html`, `engine.js`, `kit2d.js`, `atlas.js` (motorul NU se modifică). Schimbi în `index.html` doar `<title>` și variabilele de culoare ale materiei (`--histo`, `--histo-ink`, `--histo-tint` și rgba-urile lor din `.badge`, `#phase`, `.tb:hover` — păstrezi numele variabilelor, schimbi valorile). Culoarea pe fundal închis trebuie să se citească bine.
- Scrii `slides.js` (export `GLOS`, `TERMS`, `SLIDES`) + `scenes2d.js` (export `SCENES`) + eventual module de scene (ca `sA.js` / `ek.js` din embrio-lp06-anim). Înveți formatul uitându-te la `lp/embrio-lp06-anim/slides.js` (câmpuri: `deckName`, `scene`, `kick`, `title`, `hud`, `points:[{h,d:[]}]`, `why`, `say`, `warn`, `table`, `script`, `insets`, `beatDur` etc.), la `engine.js` (cum citește câmpurile și scenele: `home`, `anchors`, `labels`, `draw(g,t,{i,bt,bd,k})`, `phase`, `cam`) și la `kit2d.js` (helperii de desen). Pentru un tip de scenă te uiți cu grep la una similară în alt deck (`lp/*/`), nu citești deck-uri întregi.
- Pozele: le pui în `lp/<id>/img/` (JPEG ≤1600 px, q85) și le folosești ca `insets` / în atlas, cu creditul în caption.

## Reguli fixe (fixe)
- **Text în stânga, scena în dreapta.** Fundal text închis (#231A2B, deja în șablon). Mai puține slide-uri, dar dense. Tot conținutul sursei ajunge în deck (comprimi formularea, nu pierzi fapte).
- **Stil cartoon cu contur gros**, desenat în cod (Canvas 2D). Fără imagini generate, fără 3D, fără aplicații externe.
- **Animație doar unde ajută** (procese/mecanisme în timp sau cu direcție: cascade de semnalizare, fluxuri, rotații embrionare, migrări, contracție/relaxare pe înregistrare, septare…). Fiecare slide are `anim: true/false`. La `anim: true`, câmpul `spec` e OBLIGATORIU și scris ÎNAINTE de cod: ce se mișcă, de unde până unde, unde se oprește, ce culoare/structură (ex.: „ansa intestinală: rotație 270° antiorar văzută din față, axul = a. mezenterică superioară; 90° în hernie, 180° la reintrare; cecul ajunge sub ficat apoi coboară în fosa iliacă dreaptă”). Scenele statice (tabele, clasificări, liste, DD, capcane, recapitulări, scripturi „La oral”): desen fix sau poză reală, cu badge-uri care se aprind odată cu punctul, și `spec` de o linie (ce arată, ce încercuiește). La îndoială: static.
- **Badge-urile numerotate** pe desen stau exact pe lucrul despre care vorbește punctul cu același număr.
- **Navigare**: doar săgeată dreapta / swipe (gata în motor). Fără click/drag/rotire de scene.
- **Jos, gri**: `GLOS` = TOATE abrevierile folosite (orice abreviere nouă intră în GLOS), `TERMS` = termenii medicali grei explicați (doar cei grei).
- **ROȘU = ce dă puncte la examen**: `!!text!!` (randat roșu bold), `**text**` = bold alb. **1–4 pe slide** (inclusiv coperta e OK fără), DOAR în textul din stânga (puncte, De ce?, La oral, Capcană, tabel, script); NICIODATĂ în kicker, titlu, HUD, etichete pe desen, legende. Roșu = cuvintele care aduc puncte: cifrele, originile, excepțiile, perechile care se confundă, cuvintele de punctaj din răspunsul-model.
- Termeni de specialitate cu EN și LA în paranteză unde există termen consacrat (nu inventa latină).
- Corectitudine științifică în desene și text (direcții, sensuri de rotație, culori, receptori). Fapte doar din sursă; ce vine din manual se marchează „(manual)”. Dacă sursa contrazice manualul: „În LP scrie X; în manuale apare Y. La examen dai varianta din LP.”
- Fără autoteste/quiz/grile în deck. La final: capcane + recapitulare (tabel).
- Titlu de slide = ideea, nu doar tema. Kicker scurt.

## Verificare (obligatoriu, înainte să predai)
1. `cd /home/claude/materiale-animate && python3 tools/check_deck.py lp/<id> --src <sursa>` → repari TOT ce raportează (consolă, text tăiat, roșu 1–4, abrevieri lipsă din GLOS, anim/spec, badge-uri/etichete suprapuse, font mic, cifre lipsă din sursă). Rulezi până iese curat (abrevierile fals-pozitive de tip cuvânt românesc scris cu majuscule le poți ignora, dar spune-le).
2. `python3 tools/check_deck.py lp/<id> --sheet /tmp/<id>_sheet.png` și te UIȚI la foi (Read pe PNG): desene corecte, nimic suprapus, badge-urile pe structura potrivită. Pe slide-urile `anim:true` cu risc (direcții, rotații, fluxuri) randezi 2–4 cadre cu `--frames s:k,...` și verifici mișcarea față de `spec`.
3. Scriptul scrie și `lp/<id>/data.json` (necesar pentru site și calendar) — rulează-l o ultimă dată complet, fără `--only`, după ultima corectură.

## Predare (raportul tău final, scurt)
- id-ul deck-ului, numărul de slide-uri, câte `anim:true`, titlul propus pentru colegi (fără date din calendarul personal) + subtitlu scurt.
- Lista cu `outline` pe părți (intervale de slide-uri: ex. „1–3 intro · 4–12 Partea A …”), utilă pentru calendar.
- Ce a rămas nerezolvat din check_deck și orice dubiu științific (sursa vs manual) într-un rând.
