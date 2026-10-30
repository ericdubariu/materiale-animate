// Scenele deck-ului Farmacologie LP 4 (SNV): A = receptorii (sA), B = cele 4 experimente (sB), C = clinica, clasificarea, recapitularea (sC).
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import { atlas, mosaic } from './atlas.js';
import { bg, HOME } from './fk.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const SKIP = ['fIleon', 'fUter', 'ILEON', 'UTER'];
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([k, v]) => typeof v === 'function' && !SKIP.includes(k)));
export const SCENES = { ...pick(SA), ...pick(SB), ...pick(SC), atlas, mosaic, fallback };
