#!/usr/bin/env python3
"""Pune DD-urile noi (din dd.json) în deck-urile animate de Anatomie patologică.

Folosire: python3 tools/apply_dd.py DD_JSON LIBS_DIR [deck ...]
  DD_JSON  = dd.json (26 de intrări: principal 1 asemănare + 3 diferențe, 2 alternative)
  LIBS_DIR = folder cu lib.json-urile Anatopat (pozele preparatelor din alte deck-uri)
  deck     = anatopat-z1-anim, anatopat-z2-anim, ... (implicit z1 și z2)

Ce face, în fiecare deck:
  - înlocuiește slide-ul „Diagnostic diferențial” (scena ddPair) al fiecărui preparat:
    stânga desenul preparatului, dreapta partenerul (desenul din același deck sau poza reală),
    punctele: asemănarea + 3 diferențe, caseta „Dacă nu-ți vine” cu cele 2 alternative;
  - înlocuiește rândul „DD” din Fișa OSPE și îi dă mai mult timp;
  - înlocuiește coloana „Nu o confunda cu” din tabelul de recapitulare;
  - adaugă în motor caseta „alt” și suportul pentru roșu (!!…!!) dacă lipsește;
  - adaugă în scena ddPair suportul pentru poză (bImg) în locul desenului.
"""
import base64, io, json, re, sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

# preparatele fiecărui deck, în ordinea din deck: (cheia din dd.json, „Lama N”/„Piesa N”, desenul propriu, poza proprie)
DECKS = {
    'anatopat-z1-anim': {'unit': 'Lama', 'mine': 'lama ta', 'preps': [
        ('L1', 1, 'edem', 'edem'), ('L2', 2, 'staza', 'staza'), ('L3', 3, 'ren', 'ren'),
        ('L4', 4, 'ima', 'ima'), ('L5', 5, 'tromb', 'tromb')]},
    'anatopat-z2-anim': {'unit': 'Piesa', 'mine': 'piesa ta', 'preps': [
        ('P6', 6, 'aorta', 'aorta'), ('P7', 7, 'embol', 'embol'), ('P8', 8, 'ren', 'ren'),
        ('P9', 9, 'pulm', 'pulm'), ('P10', 10, 'ima', 'ima'), ('P11', 11, 'hem', 'hem'), ('P12', 12, 'soc', 'soc')]},
    # 13–18: DD-ul era la finalul slide-ului „De ce arată așa?”; îl scoatem de acolo într-un slide propriu
    'anatopat-z3-anim': {'unit': 'Lama', 'mine': 'lama ta', 'split': True, 'preps': [
        ('L_hiperk', 13, 'hk', 'hk_mic'), ('L_steatoza', 14, 'st', 'st_mic'), ('L_pericard', 15, 'pc', 'pc_mic'),
        ('L_abcese', 16, 'ab', 'ab_mic'), ('L_tbc', 17, 'tb', 'tb_mic'), ('L_corpstrain', 18, 'cs', 'cs_mic')]},
    # 19–26: piesele LP 3–4 (deck nou, 30.10.2026); desenul și poza au același nume
    'anatopat-z4-anim': {'unit': 'Piesa', 'mine': 'piesa ta', 'preps': [
        ('P_steatoza', 19, 'fg', 'fg'), ('P_pancreatita', 20, 'pa', 'pa'), ('P_litrenal', 21, 'lr', 'lr'),
        ('P_litbil', 22, 'lb', 'lb'), ('P_pericard', 23, 'cp', 'cp'), ('P_abcescerebral', 24, 'ac', 'ac'),
        ('P_leptomening', 25, 'lm', 'lm'), ('P_bronhopn', 26, 'bp', 'bp')]},
}
# poza de facultate a fiecărui preparat, din deck-ul lui (preferată pozelor din lib.json)
SIBLING = {k: (deck, photo) for deck, c in DECKS.items() for k, _, _, photo in c['preps']}
# pozele preparatelor din afara deck-ului (din lib.json-urile Anatopat)
LIBPHOTO = {
    'L1': 'ap1_edem_micro', 'L2': 'ap1_plaman_staza_4x', 'L3': 'ap2_infarct_renal_4x', 'L4': 'ap2_ima_karyo', 'L5': 'ap2_tromb_zahn_c',
    'L_hiperk': 'n_hiperk_1', 'L_steatoza': 'ap3_steatoza_10x', 'L_pericard': 'ap4_pericard_micro', 'L_abcese': 'n_abces_pulm_micro',
    'L_tbc': 'ap4_tb_ln_4x_e', 'L_corpstrain': 'ap4_corp_strain',
    'P6': 'n_aorta_tromb', 'P7': 'ap2_embol_sa', 'P8': 'ap2_infarct_renal_macro', 'P9': 'ap2_infarct_pulm_macro', 'P10': 'ap2_ima_macro',
    'P11': 'ap1_hematom_cerebral', 'P12': 'n_soc_rinichi',
    'P_steatoza': 'ap3_ficat_gras_macro', 'P_pancreatita': 'ap3_steatonecroza', 'P_litrenal': 'n_litiaza_renala', 'P_litbil': 'n_litiaza_bil',
    'P_pericard': 'ap4_pericard_macro_e', 'P_abcescerebral': 'n_abces_cerebral', 'P_leptomening': 'n_meningita', 'P_bronhopn': 'n_bronhopn',
}

RED_CSS = "/* roșu = ce dă puncte la examen */\n:root{--key:#FF4D4D}\nb.key,#body b.key,.pt b.key,.box b.key,.say b.key,.script b.key,.rt b.key{color:var(--key)!important;font-weight:800}\nbody.quiz b.key{color:inherit!important}\n"
ALT_CSS = ".alt{background:#1D2A22;color:#DDEFE3;box-shadow:inset 3px 0 0 #9dff8a}\n.alt .h{color:#9dff8a}\n.alt b{color:#fff}\n"
PHOTO_DISC = """
/* poza reală a partenerului de DD, decupată în cerc (când nu există desen în deck) */
const _DDIMG = {};
function photoDisc(g, x, y, r, n) {
  let im = _DDIMG[n]; if (!im) { im = new Image(); im.src = `img/${n}.jpg`; _DDIMG[n] = im; }
  g.save(); g.beginPath(); g.arc(x, y, r, 0, 7); g.clip(); g.fillStyle = '#21122a'; g.fillRect(x - r, y - r, 2 * r, 2 * r);
  if (im.complete && im.naturalWidth) { const s = Math.max(2 * r / im.naturalWidth, 2 * r / im.naturalHeight); g.drawImage(im, x - im.naturalWidth * s / 2, y - im.naturalHeight * s / 2, im.naturalWidth * s, im.naturalHeight * s); }
  g.restore(); g.save(); g.lineWidth = 10; g.strokeStyle = OUT; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.lineWidth = 4; g.strokeStyle = 'rgba(255,255,255,.35)'; g.stroke(); g.restore();
}
"""


def lc(s):
    return s[:1].lower() + s[1:]


def js(s):
    return "'" + str(s).replace('\\', '\\\\').replace("'", "\\'").replace('\n', ' ') + "'"


def lib_index(libs_dir):
    out = {}
    for f in Path(libs_dir).rglob('lib.json'):
        try:
            for x in json.loads(f.read_text(encoding='utf-8')):
                if x.get('id') and str(x.get('src', '')).startswith('data:image'):
                    out[x['id']] = x
        except Exception:
            pass
    return out


def credit_short(c):
    parts = [p.strip() for p in str(c or '').split('·')]
    if not parts or not parts[0]:
        return ''
    who = parts[0].split(',')[0].strip()
    if len(who) > 28:
        who = who[:26].rstrip() + '…'
    return who + (f' · {parts[1]}' if len(parts) > 1 else '')


def save_photo(entry, dest):
    b = base64.b64decode(entry['src'].split(',', 1)[1])
    im = Image.open(io.BytesIO(b)).convert('RGB')
    im.thumbnail((900, 900))
    im.save(dest, 'JPEG', quality=85, optimize=True)


def find_obj(s, start):
    """Granițele obiectului de slide care conține poziția start: de la '\\n  {' până la '\\n  },'."""
    a = s.rfind('\n  {', 0, start)
    b = s.find('\n  },', start)
    return a + 1, b + len('\n  },')


def split_items(txt):
    """Elementele de pe primul nivel dintr-o listă JS (fără parantezele drepte), respectând ghilimelele."""
    out, depth, cur, q, esc_ = [], 0, '', None, False
    for ch in txt:
        cur += ch
        if q:
            if esc_: esc_ = False
            elif ch == '\\': esc_ = True
            elif ch == q: q = None
            continue
        if ch in "'\"`": q = ch
        elif ch in '([{': depth += 1
        elif ch in ')]}': depth -= 1
        elif ch == ',' and depth == 0:
            out.append(cur[:-1]); cur = ''
    if cur.strip(): out.append(cur)
    return [x for x in out if x.strip()]


def split_why(obj):
    """Scoate punctele de DD (de la dd.from încolo) din slide-ul „De ce arată așa?”."""
    F = int(re.search(r"dd: \{ from: (\d+)", obj).group(1))
    i = obj.index('points: [') + len('points: [')
    depth, j, q, esc_ = 1, i, None, False
    while depth:
        ch = obj[j]
        if q:
            if esc_: esc_ = False
            elif ch == '\\': esc_ = True
            elif ch == q: q = None
        elif ch in "'\"`": q = ch
        elif ch in '([{': depth += 1
        elif ch in ')]}': depth -= 1
        j += 1
    items = split_items(obj[i:j - 1])
    keep = items[:F]
    body = ','.join(keep).rstrip() + ',\n    '
    obj = obj[:i] + body + obj[j - 1:]
    mi = re.search(r"insets: \[", obj)
    if mi:
        k, depth, q, esc_ = mi.end(), 1, None, False
        while depth:
            ch = obj[k]
            if q:
                if esc_: esc_ = False
                elif ch == '\\': esc_ = True
                elif ch == q: q = None
            elif ch in "'\"`": q = ch
            elif ch in '([{': depth += 1
            elif ch in ')]}': depth -= 1
            k += 1
        ins = split_items(obj[mi.end():k - 1])[:F]
        obj = obj[:mi.end()] + ','.join(x.strip() and x for x in ins).strip() + obj[k - 1:]
    obj = re.sub(r"(kick: '[^']*?) · DD'", r"\1'", obj, count=1)
    obj = re.sub(r"(title: '[^']*?) și cu ce [^']*'", r"\1'", obj, count=1)
    return obj


def patch_engine(d):
    e = d / 'engine.js'; s = e.read_text(encoding='utf-8')
    if '!!(.+?)!!' not in s:
        s = s.replace("const md = (s) => esc(s).replace(/\\*\\*(.+?)\\*\\*/g, '<b>$1</b>');",
                      "// !!text!! = ROȘU: doar ce dă puncte la examen; **text** = bold alb obișnuit\nconst md = (s) => esc(s).replace(/!!(.+?)!!/g, '<b class=\"key\">$1</b>').replace(/\\*\\*(.+?)\\*\\*/g, '<b>$1</b>');")
        s = s.replace("const plain = (s) => String(s || '').replace(/\\*\\*/g, '').replace(/<[^>]+>/g, '');",
                      "const plain = (s) => String(s || '').replace(/\\*\\*|!!/g, '').replace(/<[^>]+>/g, '');")
        assert '!!(.+?)!!' in s, 'nu am putut adăuga roșul în ' + str(e)
    if "['alt', 'alt'," not in s:
        s = s.replace("['warn', 'warn', 'Capcană']]", "['warn', 'warn', 'Capcană'], ['alt', 'alt', 'Dacă nu-ți vine']]")
        s = s.replace("d.innerHTML = `<span class=\"h\">${h}</span>${md(s[key])}`;",
                      "d.innerHTML = `<span class=\"h\">${h}</span>${[].concat(s[key]).map((x) => md(x)).join('<br>')}`;")
        s = s.replace("const parts = [spec.kick, spec.title, spec.why, spec.say, spec.warn,",
                      "const parts = [spec.kick, spec.title, spec.why, spec.say, spec.warn, [].concat(spec.alt || []).join(' '),")
        assert "['alt', 'alt'," in s and "[].concat(s[key])" in s, 'nu am putut adăuga caseta alt în ' + str(e)
    e.write_text(s, encoding='utf-8')
    h = d / 'index.html'; t = h.read_text(encoding='utf-8')
    if '--key' not in t:
        t = t.replace('</style>', RED_CSS + '</style>', 1)
    if '.alt{' not in t:
        t = t.replace('</style>', ALT_CSS + '</style>', 1)
    h.write_text(t, encoding='utf-8')


def patch_scene(d):
    f = d / 'scenes2d.js'; s = f.read_text(encoding='utf-8')
    if 'function photoDisc' in s:
        return
    i = s.index('function ddPair(')
    s = s[:i] + PHOTO_DISC.lstrip('\n') + s[i:]
    m1 = re.search(r"mini\(g, 740, 470, 225, FIELDS\[o\.b\][^;]*\);", s)
    if m1:
        s = s[:m1.start()] + "if (o.bImg) photoDisc(g, 740, 470, 225, o.bImg); else " + m1.group(0) + s[m1.end():]
    else:
        m = re.search(r"\n(\s*)field\(g, 740, 470, 225, \(\) => \{.*?DDF\[o\.b\]\(g, t\);.*?\}\);", s)
        assert m, 'nu găsesc desenul din dreapta în ddPair: ' + str(f)
        ind = m.group(1)
        s = s[:m.start()] + f"\n{ind}if (o.bImg) photoDisc(g, 740, 470, 225, o.bImg);\n{ind}else " + m.group(0).lstrip('\n').lstrip() + s[m.end():]
    f.write_text(s, encoding='utf-8')


def main():
    dd = {x['key']: x for x in json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))}
    lib = lib_index(sys.argv[2])
    decks = sys.argv[3:] or list(DECKS)
    for name in decks:
        cfg = DECKS[name]; d = ROOT / 'lp' / name
        patch_engine(d); patch_scene(d)
        sl = d / 'slides.js'; s = sl.read_text(encoding='utf-8')
        in_deck = {k: (draw, photo) for k, _, draw, photo in cfg['preps']}
        for k, n, draw, photo in cfg['preps']:
            e = dd[k]; P = e['principal']; pk = P['key']
            # partenerul: desenul din același deck sau poza reală
            cr = ''
            if pk in in_deck:
                b, bimg, pphoto = in_deck[pk][0], None, in_deck[pk][1]
                r_lab = lc(P['nume'])
                pcap = f"{P['nume']}: poza reală"
            else:
                bimg = f'dd_{pk.lower()}'
                sib = SIBLING.get(pk)
                src = ROOT / 'lp' / sib[0] / 'img' / f'{sib[1]}.jpg' if sib else None
                if src and src.exists():
                    im = Image.open(src).convert('RGB'); im.thumbnail((900, 900)); im.save(d / 'img' / f'{bimg}.jpg', 'JPEG', quality=85, optimize=True)
                else:
                    ent = lib.get(LIBPHOTO[pk]); assert ent, f'lipsește poza pentru {pk}'
                    save_photo(ent, d / 'img' / f'{bimg}.jpg')
                    cr = credit_short(ent.get('credit'))
                b, pphoto = draw, None
                r_lab = lc(P['nume'])
                pcap = None
            unit = cfg['unit']
            insets = [f"{{ img: {js(photo)}, cap: {js(unit + ' ' + str(n) + ': ' + e['nume'])} }}"]
            insets += [f"{{ img: {js(pphoto)}, cap: {js(pcap)} }}" if pphoto else f"{{ img: {js(photo)}, cap: {js(unit + ' ' + str(n) + ': ' + e['nume'])} }}"] * 3
            alts = [f"**{a['nume']}**: {a['cheia']}" for a in e['alternative']]
            so = f"{{ a: {js(draw)}, b: {js(b)}" + (f", bImg: {js(bimg)}" if bimg else '') + f", l: {js(e['nume'] + ' (' + cfg['mine'] + ')')}, r: {js(r_lab)} }}"
            new = (
                "  {\n"
                f"    scene: 'ddPair', sceneOpts: {so},\n"
                f"    kick: {js(unit + ' ' + str(n) + ' · Diagnostic diferențial')}, title: {js('Cu ce o compari: ' + P['nume'])},\n"
                f"    hud: ['1 asemănare + 3 diferențe'{', ' + js('foto dreapta: ' + cr) if cr else ''}],\n"
                "    points: [\n"
                f"      D('Asemănarea', {js(P['asemanare'])}),\n"
                f"      D('Diferența 1', {js(P['diferente'][0])}),\n"
                f"      D('Diferența 2', {js(P['diferente'][1])}),\n"
                f"      D('Diferența 3', {js(P['diferente'][2])}),\n"
                "    ],\n"
                f"    alt: [{', '.join(js(x) for x in alts)}],\n"
                f"    insets: [{', '.join(insets)}],\n"
                "    beatDur: 8,\n"
                "  },"
            )
            m = re.search(r"kick: '" + re.escape(f'{unit} {n} · Diagnostic diferențial') + "'", s)
            if m:
                a0, b0 = find_obj(s, m.start())
                assert "scene: 'ddPair'" in s[a0:b0], f'slide-ul DD pentru {unit} {n} nu e ddPair'
                s = s[:a0] + new + s[b0:]
            else:
                assert cfg.get('split'), f'nu găsesc slide-ul DD pentru {unit} {n} în {name}'
                mw = re.search(r"kick: '" + re.escape(f'{unit} {n} · De ce arată așa?') + r"[^']*'", s)
                assert mw, f'nu găsesc slide-ul „De ce arată așa?” pentru {unit} {n}'
                wa, wb = find_obj(s, mw.start())
                obj = split_why(s[wa:wb])
                s = s[:wa] + obj + '\n' + new + s[wb:]
                a0 = wa + len(obj) + 1
            # rândul DD din fișa OSPE (primul rând DD după slide-ul DD)
            dd_txt = (f"Cu **{P['nume']}**. Asemănare: {P['asemanare']} Diferențe: "
                      f"① {P['diferente'][0]} ② {P['diferente'][1]} ③ {P['diferente'][2]}")
            m2 = re.compile(r"\{ tm: 'DD', at: '✓', tx: '(?:[^'\\]|\\.)*' \}").search(s, a0 + len(new))
            assert m2, f'nu găsesc rândul DD din fișa pentru {unit} {n}'
            s = s[:m2.start()] + f"{{ tm: 'DD', at: '✓', tx: {js(dd_txt)} }}" + s[m2.end():]
            # durata rândului DD (index 6) în durs
            m3 = re.compile(r"(\], \[|durs: \[)([\d, ]+)\]").search(s, m2.start())
            nums = [int(x) for x in m3.group(2).split(',')]
            if len(nums) >= 7:
                nums[6] = max(nums[6], 40)
                s = s[:m3.start(2)] + ', '.join(map(str, nums)) + s[m3.end(2):]
        # coloana „Nu o confunda cu” din recapitulare: rândurile sunt în ordinea preparatelor din deck
        mh = re.search(r"head: \[[^\]]*'Nu o confunda cu'\]", s)
        if mh:
            mrows = re.compile(r"rows: \[").search(s, mh.end())
            pos = mrows.end()
            for k, n, draw, photo in cfg['preps']:
                e = dd[k]
                cell = f"**{e['principal']['nume']}** · alt.: {e['alternative'][0]['nume']} · {e['alternative'][1]['nume']}"
                rx = re.compile(r"\[\s*'(?:[^'\\]|\\.)*',\s*'(?:[^'\\]|\\.)*',\s*'(?:[^'\\]|\\.)*',\s*('(?:[^'\\]|\\.)*')\s*\]")
                mr = rx.search(s, pos)
                assert mr, f'nu găsesc rândul de recapitulare pentru {e["nume"]}'
                s = s[:mr.start(1)] + js(cell) + s[mr.end(1):]
                pos = mr.start(1) + len(js(cell))
        else:
            print(f'  ! n-am găsit tabelul de recapitulare în {name}')
        s = s.replace("'apoi **DD**: o entitate + diferența-cheie'", "'apoi **DD**: un preparat de pe listă, **1 asemănare + 3 diferențe**'")
        s = s.replace("D('Diagnosticul diferențial', 'o entitate + diferența-cheie')", "D('Diagnosticul diferențial', 'un preparat de pe listă: **1 asemănare + 3 diferențe**')")
        sl.write_text(s, encoding='utf-8')
        # pozele vechi de DD care nu mai sunt folosite
        used = s + (d / 'scenes2d.js').read_text(encoding='utf-8')
        for f in (d / 'img').glob('dd_*.jpg'):
            if f.stem not in used:
                f.unlink(); print('  - șters', f.name)
        print('ok', name)


if __name__ == '__main__':
    main()
