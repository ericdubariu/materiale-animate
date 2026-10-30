// Scenele deck-ului Farmacologie LP 3 (Introducere – Farmacodinamie, structura oficială): A = liganzii, cazul 2 (sA);
// B = proteinele G, cascadele cazurilor 3–4 (sB); C = cardurile (sC); D = scene noi comune LP 3 / LP 4 (sD);
// X = cazurile 5–7 (intestin, salivă, pupilă) + tabelele receptorilor (sX).
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import * as SD from './sD.js';
import * as SX from './sX.js';
import { atlas, mosaic } from './atlas.js';
import { bg, HOME } from './fk.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const SKIP = ['sig', 'cup', 'fInt'];
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([k, v]) => typeof v === 'function' && !SKIP.includes(k)));
export const SCENES = { ...pick(SA), ...pick(SB), ...pick(SC), ...pick(SD), ...pick(SX), atlas, mosaic, fallback };
