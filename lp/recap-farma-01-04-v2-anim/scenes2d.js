// Scenele recapitulării noi: scenele vechi (statice: fișe, hărți, tabele) + scenele noi animate (kino).
import { SCENES as BASE } from './scenes_base.js';
import * as k1 from './k1.js';
import * as k2 from './k2.js';
import * as k3 from './k3.js';
import * as k4 from './k4.js';
export const SCENES = { ...BASE, ...k1, ...k2, ...k3, ...k4 };
