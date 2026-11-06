// Scenele recapitulării OSPE Histologie LP 2–7: 'a.*' = scenele recapitulării LP 2–5 (s25.js), 'b.*' = ale recapitulării LP 6–7 (h67/).
import { SCENES as A } from './s25.js';
import { SCENES as B } from './h67/scenes2d.js';
export const SCENES = { fallback: A.fallback };
Object.entries(A).forEach(([k, v]) => { SCENES['a.' + k] = v; });
Object.entries(B).forEach(([k, v]) => { SCENES['b.' + k] = v; });
