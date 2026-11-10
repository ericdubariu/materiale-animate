// Scenele recapitulării noi (v2): scenele vechi (neschimbate) + scheletul stației, microscopul, DD față în față + mecanismele („de ce arată așa”).
import { SCENES as BASE } from './scenes_base.js';
import * as v2a from './v2a.js';
import * as m1 from './m1.js';
import * as m2 from './m2.js';
import * as m3 from './m3.js';
export const SCENES = { ...BASE, ...v2a, ...m1, ...m2, ...m3 };
