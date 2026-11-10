# Recapitulările „v2” (nou, în probă) · cum se fac

Model de urmat: `lp/recap-farma-01-04-v2-anim/` (aprobat de Eric pe 10.11.2026: „Da, același stil”).
Regulile generale rămân cele din skill-urile `materiale-animate-site` și `umfst-materiale` și din `tools/BRIEF_deck.md`. Aici e doar ce e specific recapitulărilor v2.

## Ce a cerut Eric (10.11.2026)
- Refaci DOAR recapitulările materiilor cu OSPE. Recapitulările vechi NU se șterg și NU se modifică până nu le aprobă pe cele noi: cea nouă e un deck separat, listat imediat sub cea veche, cu „(nou, în probă)” în titlu.
- **Pozele reale rămân exact cum sunt acum: aceleași poze, nemodificate, puse la fel.** Nu strica ce merge deja. La Anatopat: doar pozele reale de examen deja folosite (fără Wikimedia / internet).
- Animații mai fluide, mai detaliate, mai clare, „ca să înțeleg mecanismele dintr-o privire”; vrea să fie surprins cu lucruri care îl ajută să învețe.
- Pentru Histo și Anatopat, cu vorbele lui: vrea pozele reale care pică la examen (microscop / macroscopic) să fie acolo; un „microscop direct acolo” e binevenit, dar fără nicio greșeală; „să nu fie haos”.
- Propunerile aprobate („da, continuă cu tot”):
  7. **Microscopul**: poza reală, neatinsă, într-un vizor; trecere obiectiv mic → obiectiv mare pe ACEEAȘI poză (doar zoom/decupaj de afișare), apoi structurile se aprind pe rând în ordinea fișei.
  8. **DD față în față**: preparatul și partenerul lui, ambele poze reale, cu cele 3 diferențe arătate pe rând pe amândouă.
  9. **„De ce arată așa”**: lângă poză, o animație scurtă cu mecanismul leziunii (ex. embolul → infarctul în pană, fibrina pe pericard).
  10. **Scheletul stației**: un slide pe materie doar cu ordinea de punctaj.
- Reguli fixe: desene cartoon cu contur gros, în cod; fundal aproape negru; text în stânga, scena în dreapta; animație doar unde ajută, restul static cu aceeași structură; fără click/drag/rotate (doar săgeată dreapta / swipe); selector ascuns, buton fullscreen; roșu doar ce dă puncte (1–4 pe slide, doar în stânga); jos, gri, abrevierile + termenii grei; ce nu e în LP → `xtra` (chenarul albastru) și, pe desen, eticheta albastră `extra(...)`; totul corect științific, verificat la final, cu lista corecturilor; din când în când îi spui ce % e gata.
- La mișcare a ales: pasul se joacă o dată și rămâne pe cadrul final; doar curgerile (sânge, ioni, molecule) merg în buclă.

## Cum împaci „pozele rămân la fel” cu ideile noi
- Slide-urile existente cu poze (stațiile, atlasul, DD-ul) se copiază NESCHIMBATE din deck-ul vechi. Ideile noi se ADAUGĂ ca slide-uri noi sau ca scene desenate, nu înlocuiesc poza.
- „Microscopul” și „DD față în față” folosesc aceleași fișiere de poză, fără editare; doar le afișezi mărit/decupat. Nu încercui nimic nou pe poze decât cu coordonate luate din adnotările existente ale deck-ului vechi; la îndoială, fără cerc.
- Mecanismul din „de ce arată așa” e de regulă în afara LP-ului → text în `xtra`, etichetă albastră pe desen.

## Tehnic (exact ca la Farma v2)
1. `cp -r lp/<vechi> lp/<vechi fără -anim>-v2-anim`; în copie: `mv slides.js slides_base.js`, `mv scenes2d.js scenes_base.js`, șterge `data.json`.
2. `slides.js` nou importă `slides_base.js` și compune: `PATCH` (schimbi doar scena / `anim` / `spec` pe slide-urile existente; textul lor rămâne neschimbat) + `INS` (slide-uri noi inserate după numărul vechi dat). Vezi `lp/recap-farma-01-04-v2-anim/slides.js`.
3. `scenes2d.js` nou = scenele vechi (`scenes_base.js`) + modulele noi.
4. Copiezi `kino.js` (kitul nou) din Farma v2: `T(b,k)` = timpul de joc al punctului, `sg/ln/pop` = eased, `bgK` = fundal, `hud(g)` = strat fix când camera face zoom, `capSeq` = legenda pasului, `Path/stream/comet` = trasee, `plot/trace` = grafice desenate live, `lens` = lupa, `chain`, `tubeX`, `extra` etc. `body.js` = corpul schematic. Exemple de scene: `k1.js … k4.js`.
5. Camera: `cams` pe punct (zoom / mutare între „ecrane” așezate unul lângă altul în lume). Nu modifici `engine.js`.
6. Fundalul scenelor vechi se aliniază la cel nou: în copiile de `fk.js`, culorile `'#30230f'` / `'#120c05'` → `'#1c1226'` / `'#09050d'` (dacă deck-ul le are).
7. Cadre de verificare: `python3 tools/cap_frames.py lp/<id> /tmp/v.png S:K:T …` (slide, punct, secunda; `--full` = tot slide-ul). Verificarea automată: `python3 tools/check_deck.py lp/<id> --src lp/<vechi>/data.json`.
8. Un singur verificator independent pe deck (subagent, nu pe Fable): fapte față de sursă + direcțiile din animații + suprapuneri; raportează doar probleme.
9. Publicare: rând nou în `decks.json` imediat sub recapitularea veche (`ord` + 10, titlu cu „(nou, în probă)”, indent de 1 spațiu, fără newline la final), `git add` doar folderul tău + `decks.json`, commit, `git pull --rebase origin main` (altă sesiune poate publica în paralel: la conflict în `decks.json` păstrezi ambele rânduri), `git push origin HEAD:main`, apoi verifici live.

## Greșeli deja văzute (verifică-le explicit)
- Embolul se oprește unde vasul se îngustează (ramura din aval), nu la intrare; infarctul în pană are baza spre capsulă / pleură.
- Fluxurile merg în sensul real (v. portă: intestin → ficat; umoarea apoasă trece prin pupilă, nu prin iris).
- Text pe axonul / tubul îngust devine ilizibil: pune eticheta în interiorul formei late.
- Elementele unui „ecran” vecin nu trebuie să intre în cadrul celui curent.
- Badge-urile (ancorele) nu stau peste etichete; legenda de jos nu acoperă conținut.
