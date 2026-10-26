// Scenele deck-ului Embrio LP 2 (arcurile faringiene): A = copertă, aparat, cronologie, origine (sA); B = derivatele arcurilor (sB);
// C = șanțuri, pungi, malformații, caz, capcane, recapitulare (sC).
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import { bg, HOME } from './ek.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([, v]) => typeof v === 'function'));
export const SCENES = { ...pick(SA), ...pick(SB), ...pick(SC), fallback };
