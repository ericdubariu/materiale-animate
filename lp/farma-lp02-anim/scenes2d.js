// Scenele deck-ului Farmacologie LP 2 (farmacocinetică): A = intro, ADME, absorbția (sA); B = cazurile 1–4 și metabolizarea (sB);
// C = eliminarea, cazul 5, formula, scripturile, capcanele și recapitularea (sC).
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import { atlas, mosaic } from './atlas.js';
import { bg, HOME } from './fk.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([, v]) => typeof v === 'function'));
export const SCENES = { ...pick(SA), ...pick(SB), ...pick(SC), window: SA.windowSc, atlas, mosaic, fallback };
