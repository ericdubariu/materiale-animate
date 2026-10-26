# Materiale animate · MG anul 2 · UMFST

Site static (GitHub Pages) pentru colegi: materiale animate pentru învățat, simulări de examen pentru exersat și calendarul examenelor. Doar vizualizare: fără chat, fără întrebări către Claude, fără cont.

Site: https://ericdubariu.github.io/materiale-animate/

Repo-ul e sursa de adevăr: materialele animate se publică doar aici (din 25.10.2026 nu mai merg în „Tutor AI animat”).

## Structură

- `index.html` — pagina de start, cu două secțiuni:
  - **Învățat**, cu sub-secțiunile **LP** și **Curs**: deck-urile din `decks.json`, grupate pe materii (câmpul `tip` = `lp` sau `curs`).
  - **Exersat**: simulările de examen din `sim/`.
  - **Calendarul examenelor**: examenele modulului (materie, format, data, ora, locul, confirmat / de confirmat), citite din `examene.json`; examenele trecute apar estompate, următorul e evidențiat cu numărătoarea zilelor.
  Deck-urile și jocul se deschid în pagină (iframe), ca ecranul complet să rămână activ. Temă deschisă / închisă (după sistem, cu buton de schimbat). Butonul „Ecran complet” folosește Fullscreen API; pe telefon/tabletă, la intrare apare ghidul „Adaugă pe ecranul principal” (iPhone/iPad + Android; `manifest.json` cu `display: fullscreen`). Statistici anonime Umami, fără cookie-uri și fără nume.
- `decks.json` — `subjects` (nume + culoare) și `decks` (id, subj, tip, title, sub, slides, path, added, updated, ord).
- `examene.json` — calendarul examenelor; se actualizează aici când se schimbă o dată, o oră sau o sală (câmpurile `null` apar ca „de confirmat”).
- `lp/<id>/` — câte un deck animat (`index.html`, `engine.js`, `slides.js`, `scenes2d.js`, `kit2d.js`, `atlas.js`, `data.json`, `img/`…).
- `sim/` — simulările de examen (`index.html`, `pachete/`, `fonts/`); sursa și build-ul în `sim_src/` (`app.html`, `build_site.py`).
- `tools/sync_from_tutor.py` — folosit doar pentru importul inițial din artifactul „Tutor AI animat”.

## Cum se adaugă / actualizează un deck

1. Fișierele deck-ului în `lp/<id>/` (pornind de la un deck existent ca șablon).
2. O intrare în `decks.json` (titlu pentru colegi, fără date din calendar; `tip` corect).
3. Test local (`python3 -m http.server` + browser), apoi commit + push pe `main`; GitHub Pages se republică singur în ~1 minut.
