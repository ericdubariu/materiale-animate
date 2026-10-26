// Scenele deck-ului Embrio LP 2 (arcurile faringiene): sA = copertă, harta, cronologia, Partea A; sB = Partea B (derivatele);
// sC = Părțile C și D (șanțuri, membrane, pungi); sD = Partea E (malformații), cazul, capcanele.
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import * as SD from './sD.js';
import { bg, HOME } from './ka.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([, v]) => typeof v === 'function'));
export const SCENES = { ...pick(SA), ...pick(SB), ...pick(SC), ...pick(SD), fallback };
