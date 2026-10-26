// Scenele deck-ului Embrio LP 3 (digestiv + respirator): sA = copertă, harta, cronologia, Partea A (preenteronul);
// sB = Părțile B și C (mesenteronul, metenteronul); sC = Părțile D și E (glandele anexe, malformațiile digestive);
// sD = Partea F (respiratorul), cazurile, capcanele.
import * as SA from './sA.js';
import * as SB from './sB.js';
import * as SC from './sC.js';
import * as SD from './sD.js';
import { bg, HOME } from './kd.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const pick = (M) => Object.fromEntries(Object.entries(M).filter(([, v]) => typeof v === 'function'));
export const SCENES = { ...pick(SA), ...pick(SB), ...pick(SC), ...pick(SD), fallback };
