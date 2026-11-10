// Scenele recapitulării Farmacologie LP 1–4, refolosite din deck-urile noi (copiate aici, deck de sine stătător):
// l12/ = LP 1 și LP 2 (ADME, biodisponibilitatea, proteinele, cele 4 grafice, pH-ul urinar, ordinul I/0);
// l3/ = LP 3 (coperta, harta, formatul OSPE, liganzii, proteinele G, tabelele receptorilor, canalele, glucocorticoizii, tabla generică);
// l4/ = LP 4 (cardurile); rc.js = fișa OSPE a cazurilor (antet de caz + subpunctele cu noțiunile de barem).
import { body } from './l12/sA.js';
import { auc, proteins } from './l12/s1.js';
import { graphs4, urineph, orders2 } from './l12/s2.js';
import { ligRows } from './l3/sA.js';
import { gpaths } from './l3/sB.js';
import { coverG, hartaG, ospeFmt, board, ionDist, steroid } from './l3/sD.js';
import { tiles } from './l3/sX.js';
import { cards } from './l4/sE.js';
import { fisaR } from './rc.js';
import { bg, HOME } from './l3/fk.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
export const SCENES = { body, auc, proteins, graphs4, urineph, orders2, ligRows, gpaths, coverG, hartaG, ospeFmt, board, ionDist, steroid, tiles, cards, fisaR, fallback };
