// Scenele deck-ului Farmacologie LP 1 (farmacocinetica 1: absorbția și distribuția).
// sA: drumul ADME (body); sB: cazul 1 (tabel + peptidul); sC: cardurile de capcane; s1: scenele noi LP 1; sF: harta, OSPE, fișa, recapitularea.
import { body } from './sA.js';
import { case1, peptide } from './sB.js';
import { cards } from './sC.js';
import * as S1 from './s1.js';
import * as SF from './sF.js';
import { bg, HOME } from './fk.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([, v]) => typeof v === 'function'));
export const SCENES = { body, case1, peptide, cards, ...pick(S1), ...pick(SF), fallback };
