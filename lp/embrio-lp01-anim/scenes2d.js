// Scenele deck-ului Embrio LP 1 (reproducerea): sA = copertă, cronologie, generalități; sB = CGP, gametogeneză, ciclu,
// fecundație, teratom; sC = anomaliile cromozomiale; sD = gameți anormali, gemeni, diagnostic prenatal, cazul, capcane, recapitulare.
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import * as SD from './sD.js';
import { bg, HOME } from './ek.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([, v]) => typeof v === 'function'));
export const SCENES = { ...pick(SA), ...pick(SB), ...pick(SC), ...pick(SD), fallback };
