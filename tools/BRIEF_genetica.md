# Brief: deck-urile animate de Genetică (Modulul 2, LP 1–7)

Completează `tools/BRIEF_deck.md` (regulile comune) și skill-ul `materiale-animate-site`. Model de urmat: `lp/genetica-lp01-anim/`.

## Sursa
- Singura sursă: îndrumătorul „Aplicații practice în genetica umană” (Pașcanu, Csép, Mureșan), 166 de pagini. Materia din deck = doar ce scrie în îndrumător; explicațiile proprii stau numai în `xtra` (chenarul albastru).
- Unde e: repo-ul PRIVAT `ericdubariu/umfst-surse-anul2`, folderul `surse_suplimentare/Genetica/` (`Carte_LP_Aplicatii_practice_in_genetica_umana.pdf` + `Carte_LP_OCR.txt`). Repo-ul e mare: `git clone --depth 1 --filter=blob:none --sparse https://github.com/ericdubariu/umfst-surse-anul2 <dir>`, apoi `git -C <dir> sparse-checkout add surse_suplimentare/Genetica`. Sursa NU se copiază în repo-ul public al site-ului.
- PDF-ul e scanat: fiecare pagină PDF = două pagini de carte alăturate, iar paginile PDF 2k−1 și 2k sunt identice. `pdftoppm -r 110 -gray -jpeg -f <n> -l <n>` și te uiți la pagini (Read) pentru figuri, tabele și cifre: OCR-ul are greșeli (ex. „27” în loc de 2²³).
- Capitolele (pagina cărții): I Citogenetica: cromozomii, mitoza, meioza, fecundarea 7–20 · II Metode de studiu al cromozomilor 21–28 · III Cariotipul uman normal 30–40 · IV Mutații genetice, trisomiile autozomale 41–50 · V Sindroamele heterozomale 51–57 · VI Anomaliile cromozomiale structurale 58–78 · VII Nomenclatura cromozomilor 79–85 · VIII Cromatina sexuală 86–96 · IX Arborele genealogic și ereditatea monogenică 97–114 · X Caractere ereditare fiziologice monogenice (grupele sanguine etc.) 115–129 · XI (tipărit „IX”) Analiza moleculară a materialului genetic 130–148 · XII Screening-ul și diagnosticul prenatal 149–158 · XIII 159–166.

## Împărțirea pe LP-uri (PROVIZORIE: ordinea cărții)
Sunt 7 LP-uri de câte 3 ore. Nu se știe sigur ce capitol s-a predat la fiecare LP; până se află, se merge în ordinea îndrumătorului:

| LP | Capitole | Pagini | id |
|---|---|---|---|
| 1 | I | 7–20 | `genetica-lp01-anim` (făcut) |
| 2 | II + III | 21–40 | `genetica-lp02-anim` |
| 3 | IV + V | 41–57 | `genetica-lp03-anim` |
| 4 | VI + VII | 58–85 | `genetica-lp04-anim` |
| 5 | VIII + IX | 86–114 | `genetica-lp05-anim` |
| 6 | X + XI | 115–148 | `genetica-lp06-anim` |
| 7 | XII + XIII | 149–166 | `genetica-lp07-anim` |

Dacă se află că la un LP s-a predat altceva, se face capitolul predat efectiv, iar titlurile și `ord` din `decks.json` se corectează (inclusiv la deck-urile deja publicate). Un capitol foarte lung (VI) se poate comprima pe părțile cu liste, dar fără să piardă fapte.

## Cum se dă examenul
- La începutul fiecărui LP poate fi un test-surpriză de 1–2 minute, grilă, din noțiunile de bază ale LP-ului trecut; contează la nota finală.
- Examenul final de LP e oral.

## Structura fiecărui deck (ca la LP 1)
1. Coperta (4 puncte = părțile deck-ului).
2. „Înainte să începi”: harta deck-ului (scena `guide`, cu intervalele de slide-uri) + aplicațiile practice ale capitolului.
3. „Test-surpriză · baza k din N”: 4–6 slide-uri cu noțiunile de bază, pe scurt și mai grosier (aceleași fapte ca în restul deck-ului, fără detalii).
4. Capitolul complet, pe părți (A, B, C…), cu „La oral spui așa” pe slide-urile de conținut.
5. „Capcane” (tabel cu perechile care se confundă) + „Recapitulare” (tabel).

Fără autoteste. Roșu = definițiile-cheie, cifrele, formulele de cariotip, listele de cromozomi, perechile care se confundă. Culoarea materiei: verde (`--histo:#2E9E5B`), `subj: "genetica"`, `tip: "lp"`, `modul: 2`, `ord: 10 × numărul LP-ului` în `decks.json`.

## Motorul și kitul
- Se copiază din `lp/genetica-lp01-anim/`: `index.html` (se schimbă doar `<title>`), `engine.js`, `kit2d.js`, `atlas.js`, `gk.js`. Se scriu `slides.js`, `scenes2d.js` și module noi de scene.
- `gk.js` = kitul de genetică: `chrom` (cromozom mono-/bicromatidic, cu p, q, sateliți, constricție secundară, telomere, vârfuri recombinate), `vchrom` (cromatidă în anafază), `cell`, `nucleus`, `chromatin`, `spindle`, `centriole`, `sperm`, `line`, `txt`, `pill`, `panel`, `arr`, `ring`, `lead`, `st`, `on`, `stage` (mașină de stări pe puncte), culorile `C` (roz = matern, albastru = patern, galben = cromozom neutru).
- Scene refolosibile din LP 1 (import din `../genetica-lp01-anim/` NU; se copiază fișierul dacă e nevoie): `sA.js` (anatomia cromozomului, cariotipul 22 + XX/XY, tipurile morfologice, telomerele), `sB.js` (ciclul celular, `mitoFrame` cu erorile `nd` / `lag`), `sC.js` (`meioFrame` cu `ndI` / `ndII` / `lagI`, fecundarea).
- Cadre la sfârșitul unui pas de animație (check_deck prinde cadrul la începutul punctului): `python3 tools/grab_frames.py lp/<id> s:k:f,s:k:f,... out.png 4` (s = slide de la 1, k = punctul de la 1 sau 0 pentru intro, f = fracțiunea din durata pasului, ex. 0.95).
