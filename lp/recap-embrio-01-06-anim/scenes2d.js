// Scenele recapitulării Embrio LP 1–6. Desenele vin din deck-urile LP (copiate în l1/, l2/, l4/, l5/, l6/, cu importuri relative proprii);
// LP 3 are scene noi (l3.js). Scena „sw” compune, punct cu punct, scene din LP-uri (cazuri, capcane, mecanisme pe mai multe desene).
import * as A1 from './l1/sA.js'; import * as B1 from './l1/sB.js'; import * as C1 from './l1/sC.js'; import * as D1 from './l1/sD.js';
import * as A2 from './l2/sA.js'; import * as B2 from './l2/sB.js'; import * as C2 from './l2/sC.js'; import * as D2 from './l2/sD.js';
import * as A4 from './l4/sA.js'; import * as B4 from './l4/sB.js'; import * as C4 from './l4/sC.js';
import * as A5 from './l5/sA.js'; import * as B5 from './l5/sB.js'; import * as C5 from './l5/sC.js';
import * as A6 from './l6/sA.js'; import * as B6 from './l6/sB.js'; import * as C6 from './l6/sC.js';
import * as L3 from './l3.js';
import { makeSw, makeCover, axis } from './rc.js';
import { bg, HOME } from './l6/ek.js';

const SKIP = new Set(['srcIcon', 'oge', 'uterusPath', 'neuruXS', 'closureState', 'dorsalTube', 'sbSection', 'hypoDraw', 'makeTraps', 'lupa', 'sinusScene']);
const pick = (pre, ...Ms) => { const o = {}; Ms.forEach((M) => Object.entries(M).forEach(([k, v]) => { if (typeof v === 'function' && !SKIP.has(k) && /^[a-z]/.test(k)) o[`${pre}.${k}`] = v; })); return o; };

const POOL = {
  ...pick('l1', A1, B1, C1, D1), ...pick('l2', A2, B2, C2, D2), ...pick('l3', L3),
  ...pick('l4', A4, B4, C4), ...pick('l5', A5, B5, C5), ...pick('l6', A6, B6, C6),
};
// capcanele LP 6 = scena perechii, reluată (funcția din deck-ul LP 6, cu numele scenelor lui)
const L6 = Object.fromEntries(Object.entries(POOL).filter(([k]) => k.startsWith('l6.')).map(([k, v]) => [k.slice(3), v]));
POOL['l6.traps'] = C6.makeTraps(L6);

function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
export const SCENES = {
  ...POOL,
  cover: makeCover(POOL),
  axis,
  sw: ({ spec }) => makeSw(POOL, spec.sw, spec.swOpts || {}),
  fallback,
};
