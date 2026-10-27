// Conținutul deck-ului Micro „Tot materialul”: principiile LP 1–6 + atlasul mediilor (sursa: deck-ul de examen LP, 117 pagini).
import * as A from './slA.js';
import * as B from './slB.js';
import * as C from './slC.js';
import * as D from './slD.js';
import * as E from './slE.js';
const P = [A, B, C, D, E];
// LP 6 (parazitologia) vine imediat după copertă, nu la final.
const uniq = (arr) => { const seen = new Set(); return arr.filter((x) => (seen.has(x[0]) ? false : (seen.add(x[0]), true))); };
export const GLOS = uniq(P.flatMap((m) => m.GL || []));
export const TERMS = uniq(P.flatMap((m) => m.TM || []));
export const SLIDES = [A.SL[0], ...D.SL, ...A.SL.slice(1), ...B.SL, ...C.SL, ...E.SL];
