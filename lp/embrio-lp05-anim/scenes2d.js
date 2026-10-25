// Scenele deck-ului Embrio LP 5 (sistemul urogenital): A = urinar (sA), B = genital (sB), C/D = malformații + întrebări (sC).
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import { bg, HOME } from './ek.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([k, v]) => typeof v === 'function' && !['srcIcon', 'oge', 'uterusPath'].includes(k)));
export const SCENES = { ...pick(SA), ...pick(SB), ...pick(SC), recap: SA.cover, fallback };
