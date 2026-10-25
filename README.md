# Materiale animate · MG anul 2 · UMFST

Site static (GitHub Pages) cu deck-urile animate pentru LP-uri și examenele practice. Doar vizualizare: fără chat, fără întrebări, fără cont.

## Structură

- `index.html` — pagina de start; citește lista din `decks.json` și grupează pe materii.
- `decks.json` — `subjects` (nume + culoare) și `decks` (id, subj, title, sub, slides, path, added).
- `lp/<id>/` — câte un deck, exact fișierele din artifactul „Tutor AI animat” (`index.html`, `engine.js`, `slides.js`, `scenes2d.js`, `kit2d.js`, `atlas.js`, `data.json`, `img/`…).

## Cum se adaugă / actualizează un deck

1. Din artifactul „Tutor AI animat”, se copiază tot folderul `lp/<id>/` (fără `lib.json`).
2. Se pune în `lp/<id>/` aici (se suprascrie dacă există).
3. Pentru un deck nou se adaugă o intrare în `decks.json` (titlu fără data din calendar și fără „· animat”).
4. Commit + push pe `main`; GitHub Pages se republică singur în ~1 minut.
