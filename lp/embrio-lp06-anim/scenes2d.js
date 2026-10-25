// Scenele deck-ului Embrio LP 6 (SNC, simțuri, tegument): A+B = neurulația, creasta, veziculele, măduva (sA); C = malformațiile SNC (sB); D = hipofiza, ochiul, urechea, pielea, capcanele (sC).
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import { bg, HOME } from './ek.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const SKIP = ['neuruXS', 'closureState', 'dorsalTube', 'sbSection', 'hypoDraw', 'makeTraps'];
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([k, v]) => typeof v === 'function' && !SKIP.includes(k)));
export const SCENES = { ...pick(SA), ...pick(SB), ...pick(SC), recap: SA.cover, fallback };
SCENES.traps = SC.makeTraps(SCENES);
