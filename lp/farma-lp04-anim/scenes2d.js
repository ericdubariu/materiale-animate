// Scenele deck-ului Farmacologie LP 4 (Introducere – Farmacodinamie. Farmacotoxicologie, structura oficială):
// A = placa motorie N2 (sA, din deck-ul vechi); D = scene noi comune LP 3 / LP 4 (sD); E = alergia / anafilaxia + cardurile (sE).
import * as SA from './sA.js';
import * as SD from './sD.js';
import * as SE from './sE.js';
import { atlas, mosaic } from './atlas.js';
import { bg, HOME } from './fk.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const SKIP = [];
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([k, v]) => typeof v === 'function' && !SKIP.includes(k)));
export const SCENES = { ...pick(SA), ...pick(SD), ...pick(SE), atlas, mosaic, fallback };
