// Scenele deck-ului Farmacologie LP 3 (Farmacodinamie): A = intro, liganzi, curbe, cazul 1 (sA); B = proteinele G, decodorul,
// cascadele cazurilor 2–4 (sB); C = anafilaxia, adrenalina, scripturile, finalul (sC).
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import { atlas, mosaic } from './atlas.js';
import { bg, HOME } from './fk.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const SKIP = ['sig', 'cup'];
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([k, v]) => typeof v === 'function' && !SKIP.includes(k)));
export const SCENES = { ...pick(SA), ...pick(SB), ...pick(SC), atlas, mosaic, fallback };
