# Materiale animate · MG anul 2 · UMFST

Site static (GitHub Pages) cu deck-urile animate pentru LP-uri și examenele practice. Doar vizualizare: fără chat, fără întrebări, fără cont.

## Structură

- `index.html` — pagina de start; citește lista din `decks.json` și grupează pe materii.
- `decks.json` — `subjects` (nume + culoare) și `decks` (id, subj, title, sub, slides, path, added).
- `lp/<id>/` — câte un deck, exact fișierele din artifactul „Tutor AI animat” (`index.html`, `engine.js`, `slides.js`, `scenes2d.js`, `kit2d.js`, `atlas.js`, `data.json`, `img/`…).

## Cum se adaugă / actualizează un deck

1. Din artifactul „Tutor AI animat” se descarcă `index.html` și toate folderele `lp/<id>/` ale deck-urilor animate (fără `lib.json`) într-un folder temporar SRC.
2. `python3 tools/sync_from_tutor.py SRC` — copiază deck-urile, șterge ce nu mai e în tutor și rescrie `decks.json` (păstrează titlurile deja curățate).
3. Commit + push pe `main`; GitHub Pages se republică singur în ~1 minut.

Site-ul rămâne doar de vizualizare: fără chat, fără `window.claude`, fără `lib.json` (scriptul se oprește dacă găsește așa ceva).
