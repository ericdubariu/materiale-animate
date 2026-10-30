// Scenele recapitulării Farmacologie LP 2–4: refolosite din deck-urile LP 2 (l2/), LP 3 (l3/) și LP 4 (l4/), copiate aici,
// cu prefixul folderului (l2_ph, l3_curves, l4_trace…); rc.js = coperta și formulele de la stație.
import * as L2A from './l2/sA.js';
import * as L2B from './l2/sB.js';
import * as L2C from './l2/sC.js';
import * as L3A from './l3/sA.js';
import * as L3B from './l3/sB.js';
import * as L3C from './l3/sC.js';
import * as L4A from './l4/sA.js';
import * as L4B from './l4/sB.js';
import * as L4C from './l4/sC.js';
import * as RC from './rc.js';
import { atlas, mosaic } from './atlas.js';
import { bg, HOME } from './l4/fk.js';
function fallback() { return { home: HOME, anchors: [], draw(g) { bg(g); } }; }
const pre = (p, ...Ms) => Object.fromEntries(Ms.flatMap((M) => Object.entries(M)).filter(([, v]) => typeof v === 'function').map(([k, v]) => [p + k, v]));
export const SCENES = { ...pre('l2_', L2A, L2B, L2C), ...pre('l3_', L3A, L3B, L3C), ...pre('l4_', L4A, L4B, L4C), ...pre('', RC), atlas, mosaic, fallback };
