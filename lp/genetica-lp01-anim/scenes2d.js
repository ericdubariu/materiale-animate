// Scenele deck-ului Genetică LP 1: A = cromozomii (sA), B = ciclul celular și mitoza (sB), C + D = meioza, gametogeneza, fecundarea (sC).
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import { bg, HOME } from './gk.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const SKIP = ['mitoFrame', 'meioFrame'];
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([k, v]) => typeof v === 'function' && !SKIP.includes(k)));
export const SCENES = { ...pick(SA), ...pick(SB), ...pick(SC), fallback };
