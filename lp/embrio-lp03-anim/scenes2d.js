// Scenele deck-ului Embrio LP 3 (digestiv + respirator): intro + preenteronul (sA); mesenteronul, metenteronul, glandele anexe (sB);
// malformațiile, respiratorul, cazurile, capcanele (sC).
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import { bg, HOME } from './dg.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const SKIP = ['stomachShape', 'stomFront', 'makeTraps'];
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([k, v]) => typeof v === 'function' && !SKIP.includes(k)));
export const SCENES = { ...pick(SA), ...pick(SB), ...pick(SC), recap: SA.cover, fallback };
SCENES.traps = SC.makeTraps(SCENES);
