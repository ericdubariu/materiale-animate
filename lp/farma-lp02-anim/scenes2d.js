// Scenele deck-ului Farmacologie LP 2 (farmacocinetica 2: metabolizarea, excreția, cinetica).
// s2: scenele LP 2; sF: harta, formatul OSPE, fișa, recapitularea (comune cu LP 1); sC: cardurile de capcane.
import { cards } from './sC.js';
import * as S2 from './s2.js';
import * as SF from './sF.js';
import { bg, HOME } from './fk.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([, v]) => typeof v === 'function'));
export const SCENES = { cards, ...pick(S2), ...pick(SF), fallback };
