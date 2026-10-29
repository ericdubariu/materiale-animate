import { SLIDES, GLOS, TERMS } from './slides.js';
import { SCENES } from './scenes2d.js';
import { clamp } from './kit2d.js';

const $ = (id) => document.getElementById(id);
const stage = $('stage'), well = $('well'), canvas = $('gl'), ov = $('ov');
const solo = window.parent === window;
if (solo) document.body.classList.add('solo');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const LITE = /[?&]lite\b/.test(location.search);
let QUAL = LITE ? 0.6 : 1; // scade automat dacă dispozitivul nu ține pasul

/* ---------- scalarea artboard-ului 1280×720 ---------- */
let SCALE = 1;
function fit() {
  SCALE = Math.min(innerWidth / 1280, innerHeight / 720);
  stage.style.transform = `scale(${SCALE})`;
  resize();
}

/* ---------- canvas 2D ---------- */
const g = canvas.getContext('2d');
let wellW = 724, wellH = 676, DPR = 1, lastKey = '';
const camS = { x: 500, y: 467, z: 1 };
const IMG = {};
const img = (n) => { if (!IMG[n]) { const i = new Image(); i.src = `img/${n}.jpg`; IMG[n] = i; } return IMG[n]; };
function resize() {
  wellW = well.clientWidth || 724; wellH = well.clientHeight || 676;
  DPR = Math.min(2.5, Math.max(1, (window.devicePixelRatio || 1) * SCALE * QUAL));
  const key = `${wellW}x${wellH}@${DPR.toFixed(3)}`;
  if (key === lastKey) return;
  lastKey = key;
  canvas.width = Math.round(wellW * DPR); canvas.height = Math.round(wellH * DPR);
  if (cur) frame(0);
}
/* ---------- text ---------- */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// !!text!! = ROȘU: doar ce dă puncte la examen (1–4 pe slide); **text** = bold alb obișnuit
// ??text?? = ÎNTREBAT la examen (măcar o dată): bold + subliniat, între semne de exclamare
const md = (s) => esc(s).replace(/!!(.+?)!!/g, '<b class="key">$1</b>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\?\?(.+?)\?\?/g, '<b class="ask">!\u2009$1\u2009!</b>');
const plain = (s) => String(s || '').replace(/\*\*|!!|\?\?/g, '').replace(/<[^>]+>/g, '');
function glossFor(spec) {
  const parts = [spec.kick, spec.title, spec.why, spec.say, spec.warn, spec.hud && spec.hud.join(' '), spec.extraText];
  (spec.points || []).forEach((p) => parts.push(p.h, ...(p.d || [])));
  (spec.script || []).forEach((p) => parts.push(p.tm, p.tx));
  if (spec.table) parts.push(spec.table.head.join(' '), spec.table.rows.flat().join(' '));
  (spec.photos || []).forEach((p) => parts.push(p.cap));
  (spec.labelText || []).forEach((p) => parts.push(p));
  const all = plain(parts.filter(Boolean).join(' \n '));
  const out = [];
  for (const [k, v] of GLOS) {
    const re = new RegExp('(^|[^\\p{L}\\p{N}])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\p{L}\\p{N}])', 'u');
    if (re.test(all)) out.push(`${k} = ${v}`);
  }
  const terms = [];
  for (const [stem, term, def] of TERMS) {
    const re = new RegExp('(^|[^\\p{L}])' + stem, 'iu');
    if (re.test(all) && !terms.some((x) => x[0] === term)) terms.push([term, def]);
  }
  return { abbr: out.join(' · '), terms };
}

const INSET = new Set(['granRec', 'fbfc', 'cells3', 'macro', 'colRec', 'retRec']);
let pointEls = [], secEls = [], rowEls = [];
function renderText(i) {
  const s = SLIDES[i];
  document.body.classList.toggle('script', s.layout === 'script');
  document.body.classList.toggle('wide', s.scene === 'atlas' || s.scene === 'mosaic');
  $('kick').textContent = s.kick;
  $('title').textContent = s.title;
  $('pg').textContent = `${i + 1} / ${SLIDES.length}`;
  const b = $('body'); b.innerHTML = '';
  pointEls = []; secEls = []; rowEls = [];
  if (s.points && s.points.length) {
    const ul = document.createElement('ol'); ul.id = 'pts';
    s.points.forEach((p, k) => {
      const li = document.createElement('li'); li.className = 'pt';
      li.innerHTML = `<span class="n">${k + 1}</span><div><h3>${md(p.h)}</h3>${(p.d || []).map((x) => `<p>${md(x)}</p>`).join('')}</div>`;
      ul.appendChild(li); pointEls.push(li);
    });
    b.appendChild(ul);
  }
  if (s.script) {
    const box = document.createElement('div'); box.className = 'script';
    s.script.forEach((p) => {
      const d = document.createElement('div'); d.className = 'sec';
      d.innerHTML = `<div class="tm">${esc(p.tm)}<small>${esc(p.at)}</small></div><p>${md(p.tx)}</p>`;
      box.appendChild(d); secEls.push(d);
    });
    b.appendChild(box);
  }
  if (s.table) {
    const t = document.createElement('table'); t.className = 'rt';
    t.innerHTML = `<thead><tr>${s.table.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${s.table.rows.map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
    b.appendChild(t); rowEls = [...t.querySelectorAll('tbody tr')];
  }
  for (const [cls, key, h] of [['why', 'why', 'De ce?'], ['say', 'say', 'La oral spui așa'], ['warn', 'warn', 'Capcană']]) {
    if (!s[key]) continue;
    const d = document.createElement('div'); d.className = 'box ' + cls;
    d.innerHTML = `<span class="h">${h}</span>${md(s[key])}`;
    b.appendChild(d);
  }
  const gl = glossFor(s);
  $('foot').innerHTML = (gl.abbr ? `<div>${esc(gl.abbr)}</div>` : '') + (gl.terms.length ? `<div class="terms">${gl.terms.map(([t, d]) => `<b>${esc(t)}</b> = ${esc(d)}`).join(' · ')}</div>` : '');
  $('hud').innerHTML = (s.hud || []).map((h) => `<span class="chip">${h}</span>`).join('');
  const ph = $('photos'); ph.innerHTML = '';
  if (!INSET.has(s.scene) && !s.insets) (s.photos || []).forEach((p) => {
    const d = document.createElement('div'); d.className = 'ph';
    d.innerHTML = `<img src="img/${p.img}.jpg" alt=""><span>${esc(p.cap)}</span>`;
    ph.appendChild(d);
  });
  autoFit();
}
function autoFit() {
  const body = $('body');
  let z = 1.3; body.style.zoom = z;
  let guard = 0;
  while (body.scrollHeight > body.clientHeight + 1 && z > 0.62 && guard++ < 40) { z -= 0.02; body.style.zoom = z; }
  body.dataset.zoom = z.toFixed(2);
}

/* ---------- scene ---------- */
const cache = new Map();
let cur = null; // {i, spec, sc, beats, k, bt, t}
let badgeEls = [], labelEls = [];

function buildScene(i) {
  if (cache.has(i)) return cache.get(i);
  const spec = SLIDES[i];
  let sc;
  try { sc = SCENES[spec.scene]({ spec }); } catch (e) { console.error('scene', spec.scene, e); sc = SCENES.fallback({ spec }); }
  sc.W = sc.W || 1000; sc.H = sc.H || 934;
  cache.set(i, sc);
  return sc;
}
function warmNeighbours(i) {
  // preîncarcă pozele scenelor vecine, ca trecerea să fie instantă
  for (const k of [i - 1, i + 1]) { const s = SLIDES[k]; if (!s) continue; (s.photos || []).forEach((p) => img(p.img)); (s.insets || []).forEach((p) => p && img(p.img)); const sc = buildScene(k); if (sc.inset) for (const pi of [-1, 0, 1, 2, 3]) { const r = sc.inset(pi); if (r) img(r.img); } }
}
function beatsFor(spec) {
  const n = spec.script ? spec.script.length : spec.table ? spec.table.rows.length : (spec.points || []).length;
  const list = [];
  if (!spec.noIntro) list.push({ i: -1 });
  for (let k = 0; k < n; k++) list.push({ i: k });
  return list;
}
function camFor(sc, i) { return (i >= 0 && sc.cams && sc.cams[i]) || sc.home || { x: sc.W / 2, y: sc.H / 2, z: 1 }; }

function show(i, opts = {}) {
  i = Math.max(0, Math.min(SLIDES.length - 1, i));
  const same = cur && cur.i === i;
  const spec = SLIDES[i];
  if (!same) {
    renderText(i);
    resize();
    const sc = buildScene(i);
    for (const k of [...cache.keys()]) if (Math.abs(k - i) > 2) cache.delete(k);
    cur = { i, spec, sc, beats: beatsFor(spec), k: 0, bt: 0, t: 0 };
    buildOverlay();
  }
  cur.k = opts.atEnd ? cur.beats.length - 1 : 0; cur.bt = 0;
  const c = camFor(cur.sc, cur.beats[cur.k].i);
  camS.x = c.x; camS.y = c.y; camS.z = c.z;
  setActive(cur.beats[cur.k].i);
  if (!same) {
    if (!opts.fromParent && !solo) parent.postMessage({ type: 'lp3d-nav', i }, '*');
    try { localStorage.setItem('lp3d.' + location.pathname, String(i)); } catch {}
    warmNeighbours(i);
    frame(0);
  }
}

// săgeata dreapta: punctul următor; după ultimul punct, slide-ul următor
function step(d) {
  if (!cur) return;
  const nk = cur.k + d;
  if (nk >= 0 && nk < cur.beats.length) { cur.k = nk; cur.bt = 0; setActive(cur.beats[nk].i); return; }
  if (d > 0 && cur.i < SLIDES.length - 1) show(cur.i + 1);
  else if (d < 0 && cur.i > 0) show(cur.i - 1, { atEnd: true });
}

function buildOverlay() {
  ov.innerHTML = ''; badgeEls = []; labelEls = [];
  const sc = cur.sc;
  (sc.anchors || []).forEach((a, k) => {
    if (!a) { badgeEls.push(null); return; }
    const b = document.createElement('div'); b.className = 'badge'; b.textContent = String(k + 1);
    ov.appendChild(b); badgeEls.push(b);
  });
  (sc.labels || []).forEach((l) => {
    const e = document.createElement('div'); e.className = 'lbl'; e.innerHTML = l.html;
    ov.appendChild(e); labelEls.push(e);
  });
}
function setActive(pi) {
  pointEls.forEach((e, k) => e.classList.toggle('on', k === pi));
  secEls.forEach((e, k) => e.classList.toggle('on', k === pi));
  rowEls.forEach((e, k) => e.classList.toggle('on', k === pi));
  badgeEls.forEach((e, k) => e && e.classList.toggle('on', k === pi));
  $('phase').textContent = (cur.sc.phase ? cur.sc.phase(pi) : '') || '';
  const el = pointEls[pi] || secEls[pi] || rowEls[pi];
  if (el && el.scrollIntoView) { const body = $('body'); if (el.offsetTop + el.offsetHeight > body.scrollTop + body.clientHeight) el.scrollIntoView({ block: 'nearest' }); }
  $('stepInfo').textContent = cur.beats.length > 1 ? `${Math.max(0, cur.k)} / ${cur.beats.length - 1}` : '';
}

// lume → ecran (pixeli CSS în godeu)
function view() { const s = Math.min(wellW / cur.sc.W, wellH / cur.sc.H) * camS.z; return { s, ox: wellW / 2 - camS.x * s, oy: wellH / 2 - camS.y * s }; }
function project(a) {
  const p = typeof a === 'function' ? a() : a; const v = view();
  const x = v.ox + p[0] * v.s, y = v.oy + p[1] * v.s;
  return { x, y, vis: x > -6 && x < wellW + 6 && y > -6 && y < wellH + 6 };
}
let insRect = null;
const inIns = (x, y, mx, my) => insRect && x > insRect.x - mx && x < insRect.x + insRect.w + mx && y > insRect.y - my && y < insRect.y + insRect.h + my;
function placeOverlay() {
  const sc = cur.sc; const pi = cur.beats[cur.k].i;
  (sc.anchors || []).forEach((a, k) => {
    const e = badgeEls[k]; if (!e) return;
    const p = project(a);
    const x = Math.max(18, Math.min(wellW - 18, p.x)), y = Math.max(18, Math.min(wellH - 18, p.y));
    e.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)` + (k === pi ? ' scale(1.22)' : '');
    e.style.opacity = p.vis && !inIns(x, y, 14, 14) ? 1 : 0;
  });
  (sc.labels || []).forEach((l, k) => {
    const e = labelEls[k];
    const p = project(l.at);
    const x = Math.max(70, Math.min(wellW - 70, p.x + (l.dx || 0))), y = Math.max(16, Math.min(wellH - 16, p.y + (l.dy || 0)));
    const on = p.vis && (!l.beats || l.beats.includes(pi)) && !inIns(x, y, (e.offsetWidth || 160) / 2, (e.offsetHeight || 24) / 2);
    e.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(-50%,-50%)`;
    e.classList.toggle('dim', !on);
  });
}

/* ---------- calitate adaptivă: dacă tableta nu ține 30 fps, scădem rezoluția ---------- */
let pf = { n: 0, t0: 0, slow: 0 };
function perf(now) {
  if (!pf.t0) { pf.t0 = now; pf.n = 0; return; }
  pf.n++;
  if (now - pf.t0 > 2000) {
    const fps = pf.n * 1000 / (now - pf.t0); pf.t0 = now; pf.n = 0;
    if (fps < 28 && QUAL > 0.55) { QUAL = Math.max(0.55, QUAL - 0.15); lastKey = ''; resize(); }
    else if (fps > 55 && QUAL < 1 && !LITE) { QUAL = Math.min(1, QUAL + 0.1); lastKey = ''; resize(); }
  }
}

/* ---------- bucla ---------- */
let last = performance.now(), visible = true, paused = false;
document.addEventListener('visibilitychange', () => { visible = !document.hidden; });
function frame(dt) {
  if (!cur) return;
  const b = cur.beats[cur.k], sc = cur.sc;
  const c = camFor(sc, b.i);
  const f = dt > 0 ? 1 - Math.exp(-dt * (sc.camSpeed || 3)) : 0;
  camS.x += (c.x - camS.x) * f; camS.y += (c.y - camS.y) * f; camS.z += (c.z - camS.z) * f;
  const v = view();
  g.setTransform(DPR, 0, 0, DPR, 0, 0);
  g.clearRect(0, 0, wellW, wellH);
  g.save(); g.translate(v.ox, v.oy); g.scale(v.s, v.s);
  try { sc.draw(g, cur.t, { i: b.i, bt: cur.bt, bd: cur.spec.beatDur || sc.beatDur || 7, k: cur.k }); } catch (e) { console.error(e); }
  g.restore();
  // poza reală (inset) pe slide-urile de recunoaștere
  insRect = null;
  const ins = cur.spec.insets ? (cur.spec.insets[Math.max(0, b.i)] === undefined ? cur.spec.insets[0] : cur.spec.insets[Math.max(0, b.i)]) : sc.inset ? sc.inset(b.i) : null;
  if (ins) {
    const im = img(ins.img);
    if (im.complete && im.naturalWidth) {
      const w = Math.min(250, wellW * 0.36), h = w * 0.66, x = 16, y = wellH - h - 50; insRect = { x: x - 5, y: y - 5, w: w + 10, h: h + 34 };
      g.save(); g.shadowColor = 'rgba(0,0,0,.5)'; g.shadowBlur = 18; g.fillStyle = '#2a1534'; g.beginPath(); g.roundRect(x - 5, y - 5, w + 10, h + 34, 14); g.fill(); g.shadowBlur = 0;
      g.beginPath(); g.roundRect(x, y, w, h, 10); g.save(); g.clip();
      const r = Math.max(w / im.naturalWidth, h / im.naturalHeight); g.drawImage(im, x + (w - im.naturalWidth * r) / 2, y + (h - im.naturalHeight * r) / 2, im.naturalWidth * r, im.naturalHeight * r); g.restore();
      g.fillStyle = '#f6eef7'; g.font = '600 12px Inter, sans-serif'; g.fillText(ins.cap, x + 4, y + h + 19, w - 8); g.restore();
    }
  }
  placeOverlay();
}
function loop(now) {
  requestAnimationFrame(loop);
  let dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (!cur || !visible || paused) return;
  perf(now);
  if (reduced) dt *= 0.6;
  cur.t += dt; cur.bt += dt;
  frame(dt);
}

/* ---------- navigare ---------- */
addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); step(1); }
  else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
  else if (e.key === 'f' || e.key === 'F') toggleFs();
  else if (e.key === 'e' || e.key === 'E') toggleQuiz();
  else if (e.key === 'Escape') closeSel();
  else if (e.key === 'Home') show(0);
  else if (e.key === 'End') show(SLIDES.length - 1);
});
// swipe oriunde pe slide (tabletă)
(() => {
  let x0 = null, y0 = 0;
  stage.addEventListener('touchstart', (e) => { if (e.touches.length === 1 && !e.target.closest('#sel,.ctl')) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; } else x0 = null; }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    if (x0 === null) return; const p = e.changedTouches[0]; const dx = p.clientX - x0, dy = p.clientY - y0; x0 = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1);
    else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) wake();
  }, { passive: true });
})();
addEventListener('message', (e) => {
  const d = e.data || {};
  if (d.type === 'lp3d-go' && Number.isInteger(d.i)) { if (!cur || cur.i !== d.i) show(d.i, { fromParent: true }); }
  if (d.type === 'lp3d-step' && (d.d === 1 || d.d === -1)) step(d.d);
  if (d.type === 'lp3d-pause') paused = !!d.paused;
});

/* ---------- controale ascunse: selectorul de pagini + ecran complet ---------- */
const ctl = $('ctl');
let hideT = 0;
function wake() { ctl.classList.add('show'); clearTimeout(hideT); hideT = setTimeout(() => { if (!$('sel').classList.contains('open')) ctl.classList.remove('show'); }, 2200); }
addEventListener('mousemove', wake, { passive: true });
$('pg').addEventListener('click', () => { wake(); openSel(); });
$('pg').addEventListener('touchend', (e) => { e.stopPropagation(); wake(); openSel(); });
function openSel() {
  $('selTitle').textContent = (SLIDES[0].deckName || 'Slide-uri');
  const box = $('selList'); box.innerHTML = '';
  SLIDES.forEach((s, k) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'si' + (cur && cur.i === k ? ' cur' : '');
    b.innerHTML = `<span>${k + 1}</span>${esc(plain(s.title))}<small>${esc(plain(s.kick).split(' · ').slice(0, 2).join(' · '))}</small>`;
    b.addEventListener('click', () => { closeSel(); show(k); });
    box.appendChild(b);
  });
  $('sel').classList.add('open'); $('sel').hidden = false;
  const c = box.querySelector('.cur'); if (c) c.scrollIntoView({ block: 'center' });
}
function closeSel() { $('sel').classList.remove('open'); $('sel').hidden = true; }
$('selBtn').addEventListener('click', () => ($('sel').hidden ? openSel() : closeSel()));
$('selClose').addEventListener('click', closeSel);
$('sel').addEventListener('click', (e) => { if (e.target === $('sel')) closeSel(); });
function toggleQuiz() {
  const on = document.body.classList.toggle('quiz');
  $('quizBtn').classList.toggle('on', on); $('quizBtn').setAttribute('aria-pressed', String(on));
  $('quizBtn').title = on ? 'Arată etichetele (E)' : 'Ascunde etichetele (E)';
}
$('quizBtn').addEventListener('click', toggleQuiz);
function toggleFs() {
  if (!solo) { parent.postMessage({ type: 'lp3d-fs' }, '*'); return; }
  const d = document;
  if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
  else { const el = d.documentElement; const r = el.requestFullscreen || el.webkitRequestFullscreen; if (r) { const p = r.call(el); if (p && p.catch) p.catch(() => {}); } }
}
$('fsBtn').addEventListener('click', toggleFs);

addEventListener('resize', fit);
fit();
let start = 0;
const h = (location.hash || '').match(/^#s(\d+)$/);
if (h) start = +h[1] - 1;
else if (solo) { try { start = parseInt(localStorage.getItem('lp3d.' + location.pathname) || '0', 10) || 0; } catch {} }
show(start, { fromParent: true });
requestAnimationFrame(loop);
if (!solo) parent.postMessage({ type: 'lp3d-ready', n: SLIDES.length }, '*');
window.__deck = { show, step, jumpTo: (pi) => { const k = cur.beats.findIndex((b) => b.i === pi); if (k >= 0) { cur.k = k; cur.bt = 0; setActive(pi); } }, get cur() { return cur; }, SLIDES };
