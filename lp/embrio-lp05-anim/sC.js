// Partea C + D: malformațiile din LP, rinichiul ectopic vs. nefroptoza, coborârea testiculului + criptorhidia, recapitularea.
import {
  W, H, cam, HOME, lbl, C, bg, panel, P, on, loopT, txt, pill, curve, at, sub, tube, flow, dot, germ, ell, arr, ring, lead, kidney, photo,
  OUT, clamp, lerp, ease, paint, blob, bb, smooth, REDUCED,
} from './ek.js';
import { uterusPath } from './sB.js';

/* =================================================== MUGURELE URETERIC: 4 greșeli + Wilms */
function miniKidney(g, x, y, mode, t, u) {
  // mode: 0 agenezie · 1 displazie · 2 duplex · 3 ectopic · 4 Wilms
  const DX = x - 120;
  tube(g, [[DX, y - 110], [DX, y + 120]], 14, C.wolff, { ow: 5 });
  if (mode === 0) {
    ell(g, x + 40, y - 40, 62, 50, '#4a3a36', { dash: [8, 6], sc: '#c9b3a6', ow: 3 }); txt(g, 'blastem\nneindus', x + 40, y - 40, 16, '#c9b3a6');
    txt(g, 'fără mugure →\nfără inducție', x + 30, y + 70, 17, '#ffb0a8');
    return;
  }
  if (mode === 1) {
    tube(g, [[DX, y + 90], [x - 40, y + 60], [x, y]], 12, C.bud, { ow: 5, u1: u });
    ell(g, x + 40, y - 40, 70, 56, '#f2a39b', { ow: 5 });
    [[10, -60, 16], [56, -52, 20], [30, -20, 14], [70, -14, 12], [0, -30, 10]].forEach(([a, c, r]) => ell(g, x + a, y + c, r * u + 1, r * u + 1, '#fff3e6', { ow: 3 }));
    for (let k = 0; k < 12; k++) dot(g, x + 40 + Math.cos(k * 2.1) * 50, y - 40 + Math.sin(k * 2.1) * 36, 4, '#a1352f', { ow: 0 });
    txt(g, 'chisturi + celule\nnediferențiate', x + 30, y + 70, 17, '#ffb0a8');
    return;
  }
  if (mode === 2) {
    const sp = u;
    tube(g, [[DX, y + 100], [x - 60, y + 80], [x - 20, y + 40]], 12, C.bud, { ow: 5 });
    tube(g, [[x - 20, y + 40], [x + 10, y - 10], [x + 40, y - 60]], 11, C.bud, { ow: 5, u1: 1 });
    tube(g, [[x - 20 - 30 * sp, y + 40 + 30 * sp], [x + 20, y + 30], [x + 60, y + 10]], 11, C.bud, { ow: 5, alpha: 1 });
    ell(g, x + 50, y - 70, 50, 34, '#f2a39b', { ow: 5 }); ell(g, x + 70, y + 10, 50, 34, '#f2a39b', { ow: 5 });
    txt(g, 'despicare timpurie', x + 20, y + 100, 17, '#bff0d2');
    return;
  }
  if (mode === 3) {
    ell(g, x + 40, y - 70, 52, 40, '#f2a39b', { ow: 5 });
    pill(g, x - 30, y + 90, 100, 44, C.sinus, 'vezica', { size: 15 });
    tube(g, [[x + 30, y - 40], [x + 40, y + 20], [x + 70, y + 110]], 9, C.bud, { ow: 4, dash: [10, 8], u1: u });
    txt(g, 'vagin /\nuretră /\nvestibul', x + 100, y + 60, 15, '#bff0d2', { align: 'left' });
    return;
  }
}
export function budMal() {
  const POS = [[240, 210], [740, 210], [240, 610], [740, 610]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[60, 80], [560, 80], [60, 480], [945, 470], [880, 870]],
    phase: (i) => ['agenezia renală', 'rinichiul displazic multichistic', 'ureter duplex', 'ureter ectopic', 'tumora Wilms (WT1)'][i] || '4 greșeli ale mugurelui',
    draw(g, t, b) {
      bg(g);
      const NM = ['Agenezia renală', 'Rinichi displazic multichistic', 'Ureter duplex', 'Ureter ectopic'];
      POS.forEach(([x, y], k) => {
        const act = b.i === k || b.i < 0; const u = b.i === k ? ease(clamp(b.bt / (b.bd * 0.6))) : 1;
        panel(g, x - 220, y - 170, 450, 360, { fill: b.i === k ? 'rgba(217,101,42,.18)' : 'rgba(255,240,228,.05)', stroke: b.i === k ? 'rgba(255,180,138,.7)' : 'rgba(255,230,210,.14)' });
        g.save(); g.globalAlpha = b.i === 4 ? 0.35 : act ? 1 : 0.55; txt(g, NM[k], x, y - 140, 20, C.cream); miniKidney(g, x, y, k, t, u); g.restore();
      });
      if (b.i === 4 || b.i < 0) {
        const a = b.i === 4 ? ease(clamp(b.bt / 1.2)) : 0.0;
        if (a > 0) { g.save(); g.globalAlpha = a; panel(g, 120, 160, 760, 620, { fill: 'rgba(20,12,10,.92)', stroke: 'rgba(255,180,138,.7)' }); g.restore(); photo(g, 'wilms', 180, 200, 640, 430, 'Tumora Wilms (LP, UMFST)', a); txt(g, 'WT1 mutat → nefroblastom', 500, 700, 22, C.hi, { alpha: a }); }
      }
      if (on(b, 0)) ring(g, POS[0][0], POS[0][1], 200, 160, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== POZIȚIA RINICHIULUI: ascensiune, pelvin, potcoavă + ectopic vs. nefroptoză */
function vessels(g, cx, top, bif, o = {}) {
  tube(g, [[cx, top], [cx, bif]], 26, C.aorta, { ow: 6 });
  tube(g, [[cx, bif], [cx - 110, bif + 190]], 20, C.aorta, { ow: 6 }); tube(g, [[cx, bif], [cx + 110, bif + 190]], 20, C.aorta, { ow: 6 });
  if (o.ima !== false) { tube(g, [[cx, o.imaY], [cx + 6, o.imaY + 40]], 12, C.aorta, { ow: 4 }); }
}
export function kidneyPos() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[60, 200], [440, 580], [600, 160], [600, 400], [940, 860]],
    phase: (i) => ['ascensiunea normală', 'rinichiul pelvin (ectopic)', 'rinichiul în potcoavă', 'nefroptoza', 'artera + ureterul decid'][i] || '',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5); const p0 = p(0);
      const left = b.i <= 1 || b.i === 4 || b.i < 0; // panoul stâng: normal / pelvin
      panel(g, 14, 40, 480, 860); panel(g, 506, 40, 480, 860);
      // ----- STÂNGA: ascensiunea normală + rinichiul pelvin
      vessels(g, 300, 80, 560, { imaY: 400 });
      txt(g, 'aorta', 350, 110, 18, '#ffb0a8');
      pill(g, 300, 850, 120, 44, C.sinus, 'vezica', { size: 16 });
      // normal: urcă din pelvis spre lombar (stânga aortei)
      const ky = lerp(700, 260, b.i < 0 ? 1 : b.i === 0 ? p0 : 1);
      ell(g, 150, 260, 54, 72, 'rgba(0,0,0,0)', { dash: [8, 8], sc: '#d8c4b8', ow: 3 });
      tube(g, [[150, ky + 60], [200, (ky + 830) / 2], [270, 830]], 8, C.bud, { ow: 3 });
      tube(g, [[178, ky], [288, ky - 10]], 9, C.aorta, { ow: 3 });
      kidney(g, 150, ky, 0.8);
      txt(g, 'poziția normală\n(lombară)', 120, 140, 17, '#d8c4b8');
      if (b.i === 0) arr(g, 70, 700, 70, 300, '#fff3e6', 5, p0);
      // pelvin: nu urcă → lângă vasele iliace; arteră din a. iliacă; ureter scurt
      const pa = b.i < 0 || b.i >= 1 ? 1 : 0.15;
      g.save(); g.globalAlpha = pa;
      tube(g, [[410, 660], [446, 760], [330, 830]], 8, C.bud, { ow: 3 });
      tube(g, [[390, 630], [370, 700]], 8, C.aorta, { ow: 3 });
      kidney(g, 420, 650, 0.62, Math.PI);
      g.restore();
      txt(g, 'rinichi pelvin:\nlângă vasele iliace', 400, 520, 17, '#ffb0a8', { alpha: pa });
      if (b.i === 4) { txt(g, 'artera: din a. iliacă\nureter scurt', 370, 760, 16, C.hi); }
      // ----- DREAPTA SUS: potcoava blocată sub a. mezenterică inferioară
      const cx = 746, imaY = 300;
      g.save(); g.globalAlpha = b.i === 3 || b.i === 4 ? 0.3 : 1;
      vessels(g, cx, 70, 470, { imaY });
      const hu = b.i === 2 ? p(2) : 1;
      const hy = lerp(480, imaY + 66, hu);
      const hs = new Path2D(); hs.moveTo(cx - 150, hy - 140); hs.bezierCurveTo(cx - 160, hy + 10, cx - 70, hy + 70, cx, hy + 70); hs.bezierCurveTo(cx + 70, hy + 70, cx + 160, hy + 10, cx + 150, hy - 140);
      g.lineCap = 'round'; g.strokeStyle = OUT; g.lineWidth = 84; g.stroke(hs); g.strokeStyle = '#c9473f'; g.lineWidth = 72; g.stroke(hs);
      tube(g, [[cx, imaY], [cx + 14, imaY + 50]], 14, '#ff7a6e', { ow: 5, glow: b.i === 2 ? 0.7 : 0 });
      g.restore();
      txt(g, 'a. mezenterică inf.', cx + 150, imaY - 30, 17, '#ffb0a8');
      txt(g, 'polii inferiori uniți (istmul)\n→ lombar inferior', cx, 640, 17, '#ffd0c8', { alpha: b.i === 3 || b.i === 4 ? 0.3 : 1 });
      // ----- DREAPTA (beat 3–4): nefroptoza — a urcat normal, apoi coboară în ortostatism
      if (b.i === 3 || b.i === 4 || b.i < 0) {
        const a = b.i < 0 ? 0 : 1;
        if (a) {
          g.save(); g.fillStyle = 'rgba(20,12,10,.8)'; g.fillRect(510, 44, 472, 852); g.restore();
          tube(g, [[860, 80], [860, 820]], 24, C.aorta, { ow: 6 });
          ell(g, 700, 230, 54, 72, 'rgba(0,0,0,0)', { dash: [8, 8], sc: '#d8c4b8', ow: 3 });
          const drop = b.i === 3 ? 0.5 + 0.5 * Math.sin(t * 1.4) : 1; const yy = lerp(250, 520, drop);
          tube(g, [[740, yy - 30], [800, (yy + 160) / 2 - 40], [850, 150]], 9, C.aorta, { ow: 3, glow: b.i === 4 ? 0.7 : 0 });
          tube(g, [[690, yy + 70], [640, yy + 160], [720, yy + 220], [660, 790], [700, 840]], 8, C.bud, { ow: 3, glow: b.i === 4 ? 0.7 : 0 });
          kidney(g, 700, yy, 0.8);
          pill(g, 720, 860, 120, 40, C.sinus, 'vezica', { size: 15 });
          txt(g, b.i === 3 ? 'ortostatism ↓ · decubit ↑' : 'artera: din aortă, alungită\nureter lung, cudat', 700, 110, 18, C.hi);
          txt(g, 'NEFROPTOZĂ (dobândită)', 700, 66, 18, '#ffd0c8');
        }
      }
      if (on(b, 1)) ring(g, 420, 650, 80, 70, ease(b.bt * 1.4));
      if (on(b, 2)) ring(g, cx, imaY + 30, 60, 50, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== EXSTROFIA + EPISPADIAS + HIPOSPADIAS + MICROPENIS */
export function exstro() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[180, 360], [400, 160], [610, 470], [780, 300], [880, 860]],
    phase: (i) => ['exstrofia vezicii', 'exstrofia cloacei', 'hipospadias', 'epispadias', 'micropenis'][i] || '',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5);
      panel(g, 14, 40, 420, 860); panel(g, 446, 40, 540, 860);
      // ----- STÂNGA: secțiune sagitală — mezodermul nu ajunge în jurul membranei cloacale
      const u = b.i === 0 ? p(0) : 1;
      txt(g, 'perete\nabdominal', 80, 120, 17, '#e9d6bd');
      tube(g, [[110, 160], [110, 330]], 22, C.wall, { ow: 5 });
      ell(g, 110, 350, 16, 16, '#e9c46a', { ow: 4 }); txt(g, 'ombilic', 50, 350, 16, '#ffe9a8');
      // mezodermul care ar trebui să închidă peretele (nu ajunge)
      if (b.i === 0) for (let k = 0; k < 6; k++) { const y = 380 + k * 40; const x = lerp(110, 130, u) + Math.sin(t * 3 + k) * 4; dot(g, x, y, 9, '#ff9a7a', { alpha: 1 - u * 0.5 }); }
      // vezica deschisă la exterior (mucoasa expusă)
      const bl = new Path2D(); bl.moveTo(110, 380); bl.bezierCurveTo(300, 380, 320, 600, 150, 600); bl.lineTo(150, 600); bl.closePath();
      paint(g, bl, '#e98a78', '#c45c4c', '#ffc2b2', [110, 380, 210, 220], OUT, 6);
      for (let k = 0; k < 5; k++) dot(g, 150 + k * 22, 420 + k * 30, 6, '#ff5a4e', { ow: 0 });
      txt(g, 'mucoasa vezicii\nexpusă', 250, 340, 17, '#ffc2b2');
      // epispadias: uretra deschisă pe fața dorsală a penisului (în continuarea vezicii)
      tube(g, [[150, 620], [110, 700], [70, 760]], 26, C.tub, { ow: 6 });
      tube(g, [[150, 620], [110, 700], [70, 760]], 8, '#ff5a4e', { ow: 0, alpha: 0.9 });
      txt(g, 'epispadias', 170, 760, 17, '#ffc08a');
      // rectul (exstrofia cloacei: și septul urorectal e afectat)
      const cl = b.i === 1 ? p(1) : b.i < 0 ? 0 : 0;
      tube(g, [[360, 120], [350, 500], [310, 800]], 30, C.anal, { ow: 6 });
      txt(g, 'rect', 380, 820, 17, '#e8d9ff');
      if (b.i === 1) { tube(g, [[300, 800], [270, 820]], 30, C.anal, { ow: 6, alpha: cl }); g.save(); g.globalAlpha = cl; g.strokeStyle = '#ff4d4d'; g.lineWidth = 8; g.beginPath(); g.moveTo(250, 790); g.lineTo(300, 840); g.moveTo(300, 790); g.lineTo(250, 840); g.stroke(); g.restore(); txt(g, 'imperforație anală', 230, 870, 17, '#ff8a80', { alpha: cl }); }
      if (b.i === 0 || b.i === 1) { photo(g, 'exstro', 520, 120, 420, 440, 'Exstrofia vezicii (foto LP, UMFST)', 1); txt(g, b.i === 0 ? 'tractul urinar deschis: de pe fața\ndorsală a penisului, prin vezică,\npână la ombilic' : 'exstrofia cloacei = mai severă:\n+ septul urorectal (imperforație anală,\nmalformații ale canalului anal)', 716, 690, 19, C.cream); }
      if (b.i >= 2 || b.i < 0) {
      // ----- DREAPTA: penisul (lateral): unde se oprește închiderea faldurilor, acolo rămâne orificiul
      const PX = 520, PY = 330;
      const sh = new Path2D(); sh.roundRect(PX, PY, 330, 110, 50); paint(g, sh, C.skin, C.skinS, '#ffe2c8', [PX, PY, 330, 110], OUT, 6);
      ell(g, PX + 340, PY + 55, 62, 58, '#eaa77d', { ow: 6 });
      ell(g, PX + 40, PY + 220, 90, 76, C.skin, { ow: 6 });
      txt(g, 'DORSAL ↑', 600, 270, 17, '#d8c4b8'); txt(g, 'VENTRAL ↓', 760, 520, 17, '#d8c4b8');
      txt(g, 'scrot', PX + 40, PY + 232, 16, OUT, { stroke: false });
      const H4 = [[PX + 390, PY + 52, 'normal'], [PX + 320, PY + 110, 'gland'], [PX + 190, PY + 110, 'trunchi'], [PX + 70, PY + 140, 'penoscrotal'], [PX + 40, PY + 296, 'perineal']];
      const hp = b.i === 2 || b.i < 0 ? loopT(t, 6) : 0;
      if (b.i === 2 || b.i < 0) { const k = Math.min(4, Math.floor(hp * 5)); H4.forEach(([x, y, n], j) => { dot(g, x, y, j === k ? 12 : 7, j === 0 ? '#2a1534' : j === k ? C.hi : '#ff8a5a', { ow: 3 }); if (j === k) txt(g, n, x, y + 34, 17, C.hi); }); txt(g, 'hipospadias = orificiul pe fața ventrală', 770, 690, 18, '#ffd0c8'); }
      if (b.i === 3) { tube(g, [[PX + 60, PY], [PX + 300, PY]], 12, '#ff5a4e', { ow: 4, u1: p(3) }); txt(g, 'epispadias = orificiul pe fața dorsală', 720, 200, 18, '#ffd0c8'); }
      if (b.i === 4 || b.i < 0) { const m = new Path2D(); m.roundRect(760, 740, 120, 46, 22); paint(g, m, C.skin, C.skinS, null, [760, 740, 120, 46], OUT, 5); ell(g, 890, 763, 26, 24, '#eaa77d', { ow: 5 }); txt(g, 'micropenis', 820, 820, 18, '#ffe2c8'); }
      }
      if (on(b, 0)) ring(g, 200, 490, 130, 140, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== UTERUL DUBLU: grade de fuziune */
export function uterusDbl() {
  const F = [{ s: 1, sep: 70, n: 'didelf', cer: 2 }, { s: 0.12, sep: 0, n: 'arcuat', cer: 1 }, { s: 0.65, sep: 10, n: 'bicorn', cer: 1 }];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[150, 120], [500, 120], [840, 120], [912, 390]],
    phase: (i) => ['fuziune absentă', 'fuziune aproape completă', 'fuziune incompletă sus', 'alte forme (figura LP)'][i] || 'arcuat < bicorn < didelf',
    draw(g, t, b) {
      bg(g);
      const X = [170, 500, 830];
      F.forEach((f, k) => {
        const act = b.i === k || b.i < 0; const u = b.i === k ? ease(clamp(b.bt / (b.bd * 0.6))) : 1;
        const x = X[k], y = 300; const split = lerp(0, f.s, u);
        g.save(); g.globalAlpha = b.i === 3 ? 0.25 : act ? 1 : 0.45;
        if (f.cer === 2) {
          [-1, 1].forEach((sd) => { const pth = new Path2D(); pth.ellipse(x + sd * 58 * u, y + 90, 46, 110, sd * 0.12, 0, 7); paint(g, pth, '#ffd0e6', '#f0a5c8', '#fff0f7', [x - 50, y, 100, 220], OUT, 6); tube(g, [[x + sd * 58 * u, y + 190], [x + sd * 58 * u, y + 250]], 30, '#ffd0e6', { ow: 6 }); });
          [-1, 1].forEach((sd) => tube(g, [[x + sd * 70 * u, y + 10], [x + sd * 120, y - 40], [x + sd * 140, y]], 14, C.muller, { ow: 5 }));
        } else {
          paint(g, uterusPath(x, y, split, f.sep * u), '#ffd0e6', '#f0a5c8', '#fff0f7', bb(x, y + 90, 120, 110), OUT, 6);
          [-1, 1].forEach((sd) => tube(g, [[x + sd * 90, y - 4], [x + sd * 130, y - 50], [x + sd * 150, y - 10]], 14, C.muller, { ow: 5 }));
        }
        g.restore();
        txt(g, f.n, x, 600, 26, act ? C.hi : '#c9b3a6');
        txt(g, ['2 uteri, 2 coluri\n(± vagin dublu)', 'ușor divizat\n(o adâncitură)', '2 coarne, un col'][k], x, 670, 18, C.cream, { alpha: act ? 1 : 0.5 });
      });
      if (b.i !== 3) txt(g, 'arcuat  <  bicorn  <  didelf', 500, 770, 24, '#ffb48a');
      if (b.i === 3) { const a = ease(clamp(b.bt / 1.2)); g.save(); g.globalAlpha = a; panel(g, 60, 90, 880, 680, { fill: 'rgba(20,12,10,.94)', stroke: 'rgba(255,180,138,.7)' }); g.restore(); photo(g, 'uterus', 120, 120, 760, 520, 'Figura din LP (UMFST): A–F', a); txt(g, 'D: corn rudimentar · E: atrezia colului · F: atrezia vaginului', 500, 720, 18, C.hi, { alpha: a }); }
      if (b.i >= 0 && b.i < 3) ring(g, X[b.i], 380, 170, 230, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== SEXUL AMBIGUU */
export function sexAmbig() {
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME],
    anchors: [[200, 140], [330, 610], [560, 120], [580, 720]],
    phase: (i) => ['ovotestis', '46,XX · uter', 'hiperplazia adrenală congenitală', 'androgeni ↑ + ovare'][i] || 'hermafroditism vs. pseudo',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 4);
      panel(g, 14, 40, 400, 860); panel(g, 426, 40, 560, 860);
      txt(g, 'HERMAFRODITISM', 214, 80, 20, '#d9c6ff'); txt(g, 'PSEUDOHERMAFRODITISM\nFEMININ (46,XX)', 706, 90, 19, '#ffd0c8');
      // ovotestis: jumătate ovarian (foliculi), jumătate testicular (cordoni)
      const G = [214, 300];
      ell(g, G[0], G[1], 150, 120, '#cdb8f2', { ow: 6, shade: '#a98ae6' });
      g.save(); g.beginPath(); g.rect(G[0], G[1] - 130, 160, 260); g.clip();
      for (let k = 0; k < 5; k++) tube(g, [[G[0] + 10, G[1] - 80 + k * 40], [G[0] + 110, G[1] - 86 + k * 40], [G[0] + 130, G[1] - 70 + k * 40]], 12, C.cord, { ow: 4 });
      g.restore();
      [[150, 250], [120, 310], [170, 350], [160, 290], [110, 260]].forEach(([x, y]) => { ell(g, x, y, 18, 18, '#f6d8b8', { ow: 3 }); ell(g, x, y, 8, 8, C.germ, { ow: 2 }); });
      tube(g, [[G[0], G[1] - 120], [G[0], G[1] + 120]], 4, '#fff3e6', { ow: 0, dash: [8, 6] });
      txt(g, 'țesut ovarian', 130, 450, 17, '#ffe7d6'); txt(g, 'testicular', 300, 450, 17, '#ffd0c8');
      txt(g, 'OVOTESTIS', G[0], 500, 22, C.hi);
      const ua = b.i < 0 || b.i >= 1 ? 1 : 0.3;
      g.save(); g.globalAlpha = ua; paint(g, uterusPath(214, 600, 0), '#ffd0e6', '#f0a5c8', '#fff0f7', bb(214, 690, 120, 110), OUT, 6); g.restore();
      txt(g, 'de obicei are uter · OGE ambigue sau feminine', 214, 850, 15, '#ffd0e6', { alpha: ua });
      // CAH: bucla hormonală
      const BX = 690; const p2 = p(2), p3 = p(3);
      const box = (y, s, col, k) => pill(g, BX, y, 400, 60, col, s, { size: 18, glow: k });
      box(210, 'suprarenala: steroizi (cortizol) ↓', '#ffd9c6', on(b, 2) && p2 < 0.4 ? 1 : 0);
      box(350, 'hipofiza: ACTH ↑ (lipsește frâna)', '#e6e0dc', on(b, 2) && p2 >= 0.4 && p2 < 0.8 ? 1 : 0);
      box(490, 'suprarenala stimulată: androgeni ↑', '#ffd9c6', on(b, 2) && p2 >= 0.8 ? 1 : 0);
      box(630, 'ovare normale, dar OGE masculinizate', '#e3d6ff', on(b, 3) ? 1 : 0);
      [[245, 315], [385, 455], [525, 595]].forEach(([a, c]) => arr(g, BX, a, BX, c, '#fff3e6', 5, 0.8));
      g.save(); g.strokeStyle = '#fff3e6'; g.globalAlpha = 0.7; g.lineWidth = 5; g.beginPath(); g.moveTo(BX + 200, 490); g.bezierCurveTo(BX + 290, 460, BX + 290, 240, BX + 200, 210); g.stroke(); g.restore();
      if (b.i === 2 || b.i < 0) { const P2 = curve([[BX, 240], [BX, 330], [BX, 460]]); flow(g, P2, t, C.hi, 4, 0.4, 7); }
      if (p3 > 0 || b.i < 0) { const a = b.i < 0 ? 1 : p3; g.save(); g.globalAlpha = a; ell(g, BX - 60, 790, 30, 20, '#f08a3a', { ow: 4 }); [-1, 1].forEach((s) => ell(g, BX + 40 + s * 34, 800, 30, 44, C.swell, { ow: 4 })); g.restore(); txt(g, 'clitoris hipertrofic · labii mari parțial\nfuzionate (ca un scrot) · sinus UG persistent', BX, 870, 15, C.cream, { alpha: a }); }
      if (on(b, 0)) ring(g, G[0], G[1], 170, 140, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== COBORÂREA TESTICULULUI + CRIPTORHIDIA */
export function descent({ spec }) {
  const O = spec.sceneOpts || {};
  // vedere sagitală: peretele abdominal posterior (sus) → canalul inghinal → scrot (jos)
  const WALL = [[150, 80], [150, 560], [230, 640], [440, 650]];
  const TRACK = [[300, 170], [300, 420], [330, 600], [470, 720], [560, 830]];
  return {
    home: HOME, cams: [HOME, HOME, HOME, HOME, HOME],
    anchors: [[230, 170], [440, 600], [640, 800], [520, 760], [200, 420]],
    phase: (i) => ['~S7–S12: sus, retroperitoneal', 'S12 → S28: canalul inghinal', '~S33: în scrot', 'procesul vaginal', 'criptorhidia'][i] || 'coborârea testiculului',
    draw(g, t, b) {
      bg(g); const p = P(b, t, 5, 0.75);
      const TP = curve(TRACK);
      // peretele abdominal + canalul inghinal + scrotul
      tube(g, WALL, 30, C.wall, { ow: 6 });
      tube(g, [[440, 650], [700, 650]], 30, C.wall, { ow: 6 });
      ell(g, 580, 830, 110, 90, '#f3c29b', { ow: 6, alpha: 0.85 });
      txt(g, 'perete abdominal', 180, 95, 18, '#e9d6bd', { align: 'left' }); txt(g, 'scrot', 425, 850, 18, '#ffe2c8');
      // poziția: beat 0 sus; 1 → canal; 2 → scrot; 3,4 = scrot
      let u = 0;
      if (b.i < 0) u = loopT(t, 8) * 1.1; else if (b.i === 0) u = 0.02; else if (b.i === 1) u = lerp(0, 0.62, p(1)); else u = b.i === 2 ? lerp(0.62, 1, p(2)) : 1;
      u = clamp(u);
      const crypt = b.i === 4 || !!O.crypt;
      const uu = crypt ? 0.55 + 0.05 * Math.sin(t) : u;
      const [tx, ty] = at(TP, uu);
      // procesul vaginal (evaginarea peritoneului înaintea testiculului)
      const pv = b.i === 3 ? p(3) : b.i > 3 || b.i < 0 ? 1 : 0;
      tube(g, TRACK.slice(1), 50, 'rgba(150,195,255,.18)', { ow: 0, u1: Math.min(1, uu + 0.12) });
      g.save(); const PV = curve(TRACK.slice(1)); g.setLineDash([12, 10]); g.strokeStyle = '#6ea9ff'; g.lineWidth = 4; g.globalAlpha = 0.9;
      [-1, 1].forEach((s) => { const pp = new Path2D(); const steps = 30; for (let k = 0; k <= steps; k++) { const q = at(PV, Math.min(1, uu + 0.1) * k / steps); const x = q[0] + Math.cos(q[2] + Math.PI / 2) * 32 * s, y = q[1] + Math.sin(q[2] + Math.PI / 2) * 32 * s; k ? pp.lineTo(x, y) : pp.moveTo(x, y); } g.stroke(pp); }); g.restore();
      if (b.i === 3) { const cl = clamp((p(3) - 0.5) * 2); g.save(); g.globalAlpha = cl; tube(g, [[330, 470], [400, 660]], 10, '#6ea9ff', { ow: 3 }); g.restore(); txt(g, 'se închide → tunica vaginală\ndeschis → hernie / hidrocel', 760, 560, 18, '#cfe0ff', { alpha: Math.max(0.4, cl) }); }
      // gubernaculul: de la polul caudal până în tumefacția labioscrotală; nu se alungește
      const GP = [...sub(TP, Math.min(0.98, uu + 0.04), 1), [575, 872]]; if (GP.length > 1) tube(g, GP, 16, C.guber, { ow: 5, raw: true });
      // testiculul
      ell(g, tx, ty, 40, 52, C.gonad, { ow: 6, rot: -0.3 });
      // criptorhidia: pozițiile posibile pe traiect + ectopic în afara traiectului
      if (crypt) {
        const pos = [[0.12, 'abdominal'], [0.55, 'inghinal'], [0.78, 'la intrarea în scrot']];
        pos.forEach(([q, n]) => { const [x, y] = at(TP, q); ell(g, x, y, 30, 38, C.gonad, { ow: 4, alpha: 0.6 }); txt(g, n, x + 140, y, 17, '#d9c6ff', { align: 'left' }); });
        ell(g, 760, 700, 32, 40, 'rgba(0,0,0,0)', { dash: [8, 6], sc: '#ff8a80', ow: 4 }); txt(g, 'ectopic: în afara\ntraiectului', 840, 770, 16, '#ff8a80');
        txt(g, 'scrot gol', 580, 830, 20, OUT, { stroke: false });
      }
      // timeline mic
      const st = ['~S7–S12\npe peretele posterior', '~S12 regiunea inghinală\n~S28 prin canal', '~S33\nîn scrot'];
      if (b.i >= 0 && b.i <= 2) pill(g, 780, 140, 330, 84, '#ffd9c6', st[b.i], { size: 18 });
      if (b.i === 2) txt(g, 'gubernacul + presiunea\nintraabdominală ↑\ncontrol: androgeni (și AMH)', 780, 290, 18, C.cream);
      if (crypt) { pill(g, 780, 140, 330, 84, '#ffd9c6', 'androgeni insuficienți\n→ coborârea se oprește', { size: 18, glow: 1 }); txt(g, 'temperatura mai mare →\ninfertilitate + risc de tumoră', 780, 260, 18, '#ff8a5a'); }
      if (crypt) { for (let j = 0; j < 4; j++) { const q = loopT(t + j * 0.5, 2); txt(g, '~', tx + 50 + j * 12, ty - 20 - q * 60, 30, '#ff8a5a', { alpha: Math.sin(q * Math.PI) }); } }

      txt(g, 'portocaliu = gubernaculul · albastru punctat = procesul vaginal', 500, 912, 15, '#d8c4b8', { w: 600 });
      if (on(b, 0)) ring(g, 300, 170, 70, 80, ease(b.bt * 1.4));
    },
  };
}

/* =================================================== RECAPITULARE: cele 4 surse, rândul activ */
export { cover as recapSrc } from './sA.js';
