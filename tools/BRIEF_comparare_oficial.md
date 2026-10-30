# Brief comun: comparare deck-uri de pe site cu materialele OFICIALE ale disciplinei

Context: Eric (anul 2 MG, UMFST) are pe site (`/home/claude/materiale-animate`, GitHub Pages) deck-uri animate făcute din materialele anilor trecuți. Acum a primit materialele OFICIALE ale disciplinei. Cerința lui, cuvânt cu cuvânt: „verifică dacă avem informații în plus sau în minus. Dacă avem în plus, tai. Dacă nu avem, scrii. Apoi îmi dai un raport.”

## Ce înseamnă „în plus” / „în minus”
- **În minus** = orice fapt/caz/definiție/clasificare/cifră din sursa oficială care lipsește din deck → îl adaugi (pe slide-ul potrivit sau slide nou), cu aceeași calitate și stil.
- **În plus** = fapte examinabile din deck care NU apar în sursa oficială (cazuri vechi, liste, cifre, clasificări, „(manual)”, materie din anii trecuți) → le TAI.
- NU tai „lipiciul” didactic care doar explică un fapt oficial fără să aducă fapte noi (slide-ul de format al examenului, „De ce?” care explică mecanismul unui fapt din sursă, capcanele derivate din sursă, recapitulările, scripturile „La oral”). Dacă un „De ce?” aduce fapte noi examinabile care nu sunt în sursă, le scoți.
- Dacă sursa oficială contrazice deck-ul: dai varianta din sursa oficială. Dacă sursa oficială pare să aibă o greșeală evidentă, păstrezi varianta oficială în deck („În LP scrie X…”) și o treci la DUBII în raport; nu alegi în tăcere.
- Când un slide rămâne fără conținut după tăiere, îl scoți (ai grijă la numerotarea „Partea…”/hărți/recapitulări care îl pomenesc).

## Reguli fixe ale deck-urilor (respectă-le la orice slide atins)
- Format: `slides.js` exportă `GLOS`, `TERMS`, `SLIDES`; scene în `scenes2d.js` (+ module). Câmpuri slide: `kick`, `title`, `hud`, `scene`, `points:[{h,d:[]}]`, `why`, `say`, `warn`, `table`, `script`, `insets`, `anim`, `spec`. Pentru un tip de scenă te uiți cu grep la una similară din alt deck din `lp/*/`, nu citești deck-uri întregi. Motorul (`engine.js`, `kit2d.js`) NU se modifică. Detalii: `/home/claude/materiale-animate/tools/BRIEF_deck.md`.
- Text în stânga, scena în dreapta, stil cartoon cu contur gros desenat în Canvas 2D. Animație DOAR unde ajută (procese/mecanisme cu direcție); altfel scenă statică cu badge-uri numerotate. Fiecare slide nou: `anim: true/false`; la `anim:true` câmpul `spec` scris ÎNAINTE de cod (ce se mișcă, de unde până unde, unde se oprește).
- ROȘU `!!text!!` = doar ce dă puncte la examen, 1–4 pe slide, doar în textul din stânga (puncte, De ce?, La oral, Capcană, tabel, script), niciodată în kicker/titlu/HUD/etichete. `**text**` = bold alb.
- Jos gri: orice abreviere nouă intră în `GLOS`; termenii grei în `TERMS`.
- Română cu ș/ț (virgulă), nu ş/ţ. Ton persoana a II-a, clar, fără emoji. Termeni cu EN/LA în paranteză unde există termen consacrat.
- Corectitudine științifică în desene și text. Fapte doar din sursa oficială.
- Fără autoteste/quiz în deck.

## Lucru
- Lucrezi DOAR în folderele deck-urilor tale (`lp/<id>/`). NU faci commit/push, NU atingi `decks.json`, `index.html` din rădăcină sau alte deck-uri. Altcineva publică.
- Citești sursa oficială integral (text în `/home/claude/src/txt/`, originalele în `/home/claude/src/`; pentru o pagină cu desen/tabel neclar în text, randezi pagina cu `pdftoppm -r 80 -f N -l N` și te uiți).
- Pentru comparare: întâi `data.json` al deck-ului (texts + outline) ca să vezi ce e pe fiecare slide, apoi editezi `slides.js` țintit.

## Verificare (obligatoriu)
1. `cd /home/claude/materiale-animate && python3 tools/check_deck.py lp/<id> --src <sursa.txt>` → repari tot ce raportează (consolă, text tăiat, roșu 1–4, abrevieri lipsă, anim/spec, suprapuneri, cifre din sursă lipsă). Abrevierile fals-pozitive le poți ignora (spune-le).
2. Pe slide-urile noi/modificate: `python3 tools/check_deck.py lp/<id> --only <lista> --sheet /tmp/<id>_sheet.png` și te UIȚI la foaie (Read pe PNG): nimic tăiat/suprapus, badge-uri pe structura bună, desen corect. Pe `anim:true` cu risc: `--frames s:k,...`.
3. La final rulezi o dată complet, fără `--only` (scrie `data.json`).

## Raport final (scurt, în română, fără recapitularea pașilor)
Pentru fiecare deck:
- **În plus (tăiat):** listă scurtă, cu slide-ul vechi.
- **În minus (adăugat):** listă scurtă, cu slide-ul nou.
- **Corectat (contrazicea sursa oficială):** listă.
- **Dubii** (sursa oficială pare greșită / ambiguă): câte un rând.
- Numărul final de slide-uri, câte `anim:true`, outline pe părți (intervale), și titlu + subtitlu propuse pentru site dacă s-au schimbat.

## REGULĂ NOUĂ (Eric, 30.10, se aplică imediat și la tot ce există deja în deck-urile tale)
Orice explicație/informație adăugată de noi care NU apare în materialele oficiale de LP nu se mai amestecă cu materia: merge într-un chenar albastru separat, cu eticheta-filă „Explicație în plus · nu e în LP”, ca Eric să știe că nu trebuie învățată neapărat.
- Tehnic: câmpul nou pe slide `xtra: '…'` (string, același markdown ca `why`; motorul și CSS-ul sunt deja actualizate în toate deck-urile; dacă ai copiat motorul înainte de 17:35, rulează `python3 tools/patch_xtra.py lp/<id>/`).
- „De ce?” (`why`) rămâne DOAR pentru explicații care sunt în LP-ul oficial. Tot ce e explicație proprie (mecanism detaliat, analogie, context, „(manual)”) → `xtra`. Dacă un `why` e amestecat, îl împarți: partea din LP rămâne în `why`, restul în `xtra`.
- Asta înlocuiește „tai” pentru EXPLICAȚII: o explicație bună care ajută înțelegerea nu se taie, se mută în `xtra`. Se taie în continuare FAPTELE examinabile în plus din materialele vechi (cazuri vechi, liste, cifre, clasificări, preparate/lame care nu sunt în LP-ul oficial).
- Puncte (`points`), „La oral”, fișa OSPE, scripturile și tabelele conțin doar materie din LP; nimic din afara LP-ului acolo.
- În `xtra` NU pui roșu (`!!`) — nu dă puncte. Scurt: 1–3 fraze.
- În raport adaugi o secțiune „**Mutat în chenarul albastru:**” (slide → ce).
