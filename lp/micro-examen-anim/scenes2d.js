// Scenele deck-ului Micro „Tot materialul”: A = LP 1–2, B = LP 3–4, C = LP 5, D = LP 6, E = atlasul mediilor.
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import * as SD from './sD.js';
import * as SE from './sE.js';
import { atlas, mosaic } from './atlas.js';
import { bg, HOME } from './mk.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([k, v]) => typeof v === 'function' && /^[a-e]_/.test(k)));
export const SCENES = { atlas, mosaic, ...pick(SA), ...pick(SB), ...pick(SC), ...pick(SD), ...pick(SE), fallback };
