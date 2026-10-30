#!/usr/bin/env python3
"""Construiește „Simulări de examen” pentru site (GitHub Pages).

Intrare
  sim_src/app.html            aplicația (un singur fișier HTML, fără date)
  sim_src/fonts/*.woff2       fonturile (Inter, Plus Jakarta Sans)
  pachetele de întrebări      fișierele <id>.js + index.js produse de build-ul Triviadorului
                              (TRV.pack({...}) / TRV.index([...])); se copiază neschimbate
  lp/fiziopat-examen-anim/    lista oficială de 22 de întrebări cu răspunsurile model (slide-urile „Răspuns model”)
  lp/anatopat-z1-anim/ … z4   fișele OSPE oficiale (organ, leziune, definiție, descriere, cauze, complicații, DD)
  lp/recap-histo-02-05-anim/, lp/recap-histo-06-07-anim/
                              cele 19 lame de Histologie (poza, descrierea) + sim_src/histo_fise.json (fișa de evaluare oficială pe noțiuni)
  sim_src/farma_fise.json     banca de subiecte pentru fișa OSPE de Farmacologie (cazurile din LP 1–4, modelul oficial, variante, teorie)

Ieșire
  sim/index.html, sim/fonts/, sim/pachete/index.js, sim/pachete/<id>.js,
  sim/pachete/fiziopat_lista22.js, sim/pachete/anatopat_fise.js

Rulare (din rădăcina site-ului)
  python3 sim_src/build_site.py                  # refolosește pachetele deja publicate din sim/pachete
  python3 sim_src/build_site.py --packs DIR      # ia pachetele dintr-un build nou al Triviadorului
Are nevoie de Node (pentru citirea slide-urilor deck-urilor).
"""
import argparse, json, re, shutil, subprocess, sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
SRC = SITE / "sim_src"
OUT = SITE / "sim"

# pachetele folosite de simulări (restul nu se publică)
KEEP = re.compile(r"^(unix_.+|anatopat_lp\d+|micro_lp0[1-6]b?|fizio_lp\d+|embrio_lp\d+)$")
# Histologie și Farmacologie: fișele OSPE se construiesc din deck-urile aliniate la LP-urile oficiale (vezi build_fise)
ORDER = {"histo": 0, "anatopat": 1, "farma": 2, "micro": 3, "fizio": 4, "fiziopat": 5, "embrio": 6}

# Fiziopatologie: „una de mecanism, una din definiții / clasificări”. Împărțirea după formularea întrebării:
# mecanism = „explicați / descrieți modificările, mecanismul, bazele, consecințele, efectele”;
# definiții = „definiți / enumerați / prezentați definiția, clasificarea, tipurile, stadiile / DD”.
FP_MEC = {1, 2, 4, 6, 9, 11, 12, 17, 18, 19, 22}


# fișele OSPE din deck-urile de Anatomie patologică → tema (topic) din pachetul de întrebări
SHEET_MAP = {
    ("anatopat-z1-anim", "edem"): ("anatopat_lp0102", [0]),
    ("anatopat-z1-anim", "staza"): ("anatopat_lp0102", [1, 2]),   # aceeași lamă: stază + infarct pulmonar
    ("anatopat-z1-anim", "ren"): ("anatopat_lp0102", [3]),
    ("anatopat-z1-anim", "ima"): ("anatopat_lp0102", [4]),
    ("anatopat-z1-anim", "tromb"): ("anatopat_lp0102", [5]),
    ("anatopat-z2-anim", "aorta"): ("anatopat_lp0102", [6]),
    ("anatopat-z2-anim", "embol"): ("anatopat_lp0102", [7]),
    ("anatopat-z2-anim", "ren"): ("anatopat_lp0102", [8]),
    ("anatopat-z2-anim", "pulm"): ("anatopat_lp0102", [9]),
    ("anatopat-z2-anim", "ima"): ("anatopat_lp0102", [10]),
    ("anatopat-z2-anim", "hem"): ("anatopat_lp0102", [11]),
    ("anatopat-z2-anim", "soc"): ("anatopat_lp0102", [12]),
    ("anatopat-z3-anim", "hk"): ("anatopat_lp0304", [0]),    # hipercheratoza
    ("anatopat-z3-anim", "st"): ("anatopat_lp0304", [1]),    # steatoza hepatică
    ("anatopat-z3-anim", "pc"): ("anatopat_lp0304", [2]),    # pericardita fibrinoasă
    ("anatopat-z3-anim", "ab"): ("anatopat_lp0304", [3]),    # abcesele hepatice
    ("anatopat-z3-anim", "tb"): ("anatopat_lp0304", [4]),    # limfadenita tuberculoasă
    ("anatopat-z3-anim", "cs"): ("anatopat_lp0304", [5]),    # granulomul de corp străin
    ("anatopat-z4-anim", "fg"): ("anatopat_lp0304", [6]),    # steatoza hepatică (piesa)
    ("anatopat-z4-anim", "pa"): ("anatopat_lp0304", [7]),    # pancreatita acută
    ("anatopat-z4-anim", "lr"): ("anatopat_lp0304", [8]),    # litiaza renală
    ("anatopat-z4-anim", "lb"): ("anatopat_lp0304", [9]),    # litiaza biliară
    ("anatopat-z4-anim", "cp"): ("anatopat_lp0304", [10]),   # pericardita fibrinoasă (piesa)
    ("anatopat-z4-anim", "ac"): ("anatopat_lp0304", [11]),   # abcesul cerebral
    ("anatopat-z4-anim", "lm"): ("anatopat_lp0304", [12]),   # leptomeningita purulentă
    ("anatopat-z4-anim", "bp"): ("anatopat_lp0304", [13]),   # bronhopneumonia
}

# Histologie: poze curate în plus (fără etichete), pe (LP, lama din LP)
HISTO_CLEAN = {
    (6, 2): [("col_mare", "Ob. mare")],
    (6, 3): [("ret_mare", "Ob. mare"), ("splina", "Alt câmp · aceeași colorație")],
    (7, 1): [("lax_mare", "Ob. mare")],
    (7, 2): [("adi_mare", "Ob. mare")],
    (7, 3): [("ten_mare", "Ob. mare")],
}

# Anatomie patologică: la stații doar pozele reale ale preparatelor de la LP (cele din deck-uri, lp_*.jpg).
# tema din pachet → (deck, [pozele, prima = cea principală])
def _L(d, n): return (d, [f"lp_l{n}_mic", f"lp_l{n}_lama"])
ANA_IMG = {
    "anatopat_lp0102": [_L("z1", 1), ("z1", ["lp_l2_staza", "lp_l2_lama"]), ("z1", ["lp_l2_inf", "lp_l2_inf_lama"]),
                        _L("z1", 3), _L("z1", 4), _L("z1", 5),
                        ("z2", ["lp_p6"]), ("z2", ["lp_p7"]), ("z2", ["lp_p8", "lp_p8_b"]), ("z2", ["lp_p9_b"]),
                        ("z2", ["lp_p10_c", "lp_p10_b"]), ("z2", ["lp_p11", "lp_p11_b", "lp_p11_c"]), ("z2", ["lp_p12_b"])],
    "anatopat_lp0304": [_L("z3", 13), _L("z3", 14), _L("z3", 15), _L("z3", 16), _L("z3", 17), _L("z3", 18),
                        ("z4", ["lp_p19"]), ("z4", ["lp_p20", "lp_p20_b"]), ("z4", ["lp_p21"]), ("z4", ["lp_p22", "lp_p22_b"]),
                        ("z4", ["lp_p23"]), ("z4", ["lp_p24"]), ("z4", ["lp_p25"]), ("z4", ["lp_p26"])],
}
def ana_caption(name):
    if name.startswith("z_"): return "Detaliu mărit · aceeași lamă"
    if name.endswith("_lama"): return "Lama la ochiul liber"
    if "_mic" in name or name in ("lp_l2_staza", "lp_l2_inf"): return "La microscop · HE"
    return "Piesa" if not name.endswith(("_b", "_c")) else "Piesa · altă imagine"
def ana_rewrite(p):
    """Înlocuiește pozele stațiilor cu pozele reale de la LP; câte o stație pe preparat."""
    plan = ANA_IMG[p["id"]]
    imgs, keep, seen = {}, [], set()
    for q in p["questions"]:
        if not (q.get("station") and q.get("img")):
            continue
        t = q["topic"]
        if t in seen:
            continue
        seen.add(t)
        deck, names = plan[t]
        files = []
        for n in names:
            f = SITE / "lp" / f"anatopat-{deck}-anim" / "img" / f"{n}.jpg"
            if f.exists():
                files.append((n, f"../lp/anatopat-{deck}-anim/img/{n}.jpg"))
        assert files, (p["id"], t, names)
        # detalii mărite din aceeași poză la microscop (decupaje curate din deck), doar la lame
        import hashlib
        seenh = set()
        for n, u in list(files):
            if not (n.endswith("_mic") or n in ("lp_l2_staza", "lp_l2_inf")):
                continue
            for z in sorted((SITE / "lp" / f"anatopat-{deck}-anim" / "img").glob(f"z_{n}_*.jpg")):
                h = hashlib.md5(z.read_bytes()).hexdigest()
                from PIL import Image as _I
                if h in seenh or _I.open(z).width < 300:
                    continue
                seenh.add(h)
                files.append((z.stem, f"../lp/anatopat-{deck}-anim/img/{z.name}"))
        k0 = f"t{t}_0"
        imgs[k0] = files[0][1]
        q["img"] = k0
        q["more"] = [{"src": u, "cap": ana_caption(n)} for n, u in files[1:]]
        q["imgcap"] = ana_caption(files[0][0])
        q["q"] = "Recunoașteți preparatul (organul / țesutul, leziunea și definiția ei), descrieți modificările patologice, apoi cauzele, complicațiile și diagnosticul diferențial."
        keep.append(q)
    assert len(seen) == len(plan), (p["id"], sorted(seen))
    p["questions"], p["imgs"] = keep, imgs
    return p

NODE_JS = r"""
const site = process.argv[process.argv.length - 1];
const out = { fp: [], sheets: [] };
const fp = await import(site + '/lp/fiziopat-examen-anim/slides.js');
for (const s of fp.SLIDES) {
  if (!/Răspuns model/.test(s.kick || '')) continue;
  const m = /^Întrebarea (\d+) · (.+?) · Răspuns model/.exec(s.kick);
  const kw = (s.boxes || []).find(b => b.h === 'Cuvintele de punctaj');
  const mn = (s.boxes || []).find(b => b.h === 'Ține minte');
  out.fp.push({ n: +m[1], ch: m[2], q: s.title, ans: (s.points || []).map(p => ({ h: p.h, d: p.d })),
    kw: kw ? kw.tx.split(' · ').map(x => x.replace(/\*\*/g, '').trim()).filter(Boolean) : [],
    mn: mn ? mn.tx : '', words: s.sceneOpts.words, min: s.sceneOpts.min });
}
for (const d of ['anatopat-z1-anim', 'anatopat-z2-anim', 'anatopat-z3-anim', 'anatopat-z4-anim']) {
  const m = await import(site + '/lp/' + d + '/slides.js');
  for (const s of m.SLIDES) if (s.script && s.sceneOpts && s.sceneOpts.f) out.sheets.push({ deck: d, f: s.sceneOpts.f, kick: s.kick, rows: s.script });
}
out.histo = [];
for (const d of ['recap-histo-02-05-anim', 'recap-histo-06-07-anim']) {
  const m = await import(site + '/lp/' + d + '/slides.js');
  for (const s of m.SLIDES) if (s.scene === 'lama') out.histo.push({ deck: d, kick: s.kick, title: s.title, points: s.points, insets: s.insets || [], dd: (s.sceneOpts || {}).dd });
}
console.log(JSON.stringify(out));
"""


def read_pack(path):
    s = path.read_text(encoding="utf-8").strip()
    assert s.startswith("TRV.pack(") and s.endswith(");"), path
    return json.loads(s[len("TRV.pack("):-2])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--packs", help="folderul cu pachetele Triviadorului (index.js + <id>.js)")
    a = ap.parse_args()
    src = Path(a.packs).resolve() if a.packs else OUT / "pachete"
    if not (src / "index.js").exists():
        sys.exit(f"Nu găsesc {src}/index.js. Dă --packs <folderul cu pachetele>.")
    idx_s = (src / "index.js").read_text(encoding="utf-8").strip()
    index = json.loads(idx_s[len("TRV.index("):-2])

    dst = OUT / "pachete"
    dst.mkdir(parents=True, exist_ok=True)
    (OUT / "fonts").mkdir(parents=True, exist_ok=True)

    units, keep_files = [], set()
    for u in index:
        if not KEEP.match(u["id"]):
            continue
        f = src / u["file"]
        p = read_pack(f)
        if u["id"] in ANA_IMG:
            p = ana_rewrite(p)
        assert p["id"] == u["id"], f
        q = []
        for x in p["questions"]:
            t = {"mcq": "m", "open": "o", "calc": "c", "graph": "g"}[x["type"]]
            q.append([x["id"], x["topic"], x["diff"], t, 1 if x.get("station") else 0, 1 if x.get("img") else 0,
                      len(x.get("opts", [])), len(x.get("ok", [])),
                      0,
                      1 if x.get("hot") else 0])  # hot = a picat la examen → șansă mai mare la tragere (oral)
        units.append({"id": u["id"], "subject": u["subject"], "unit": u["unit"], "title": u["title"],
                      "short": u.get("short", ""), "topics": u["topics"], "file": u["file"], "q": q})
        if u["id"] in ANA_IMG:
            (dst / u["file"]).write_text("TRV.pack(" + json.dumps(p, ensure_ascii=False, separators=(",", ":")) + ");\n", encoding="utf-8")
        elif src != dst:
            shutil.copyfile(f, dst / u["file"])
        keep_files.add(u["file"])
    units.sort(key=lambda u: (ORDER.get(u["subject"], 9), not u["id"].startswith("unix_"), u["id"]))

    # lista de 22 (Fiziopatologie) și fișele OSPE (Anatomie patologică), citite din deck-uri
    r = subprocess.run(["node", "--input-type=module", "-e", NODE_JS, "--", str(SITE)], capture_output=True, text=True)
    if r.returncode:
        sys.exit("Node a eșuat:\n" + r.stderr)
    ext = json.loads(r.stdout)
    fp = sorted(ext["fp"], key=lambda x: x["n"])
    assert [x["n"] for x in fp] == list(range(1, 23)), "lista de Fiziopatologie trebuie să aibă exact 22 de întrebări"
    for x in fp:
        assert x["kw"] and x["ans"], f"Î {x['n']}: lipsesc cuvintele de punctaj sau răspunsul model"
        x["id"] = f"fp22_{x['n']:02d}"
        x["cat"] = "mec" if x["n"] in FP_MEC else "def"
    (dst / "fiziopat_lista22.js").write_text("TRV.pack(" + json.dumps({"id": "fiziopat_lista22", "questions": fp},
                                             ensure_ascii=False, separators=(",", ":")) + ");\n", encoding="utf-8")
    keep_files.add("fiziopat_lista22.js")

    sheets = {}
    for s in ext["sheets"]:
        k = (s["deck"], s["f"])
        if k not in SHEET_MAP:
            sys.exit(f"Fișă OSPE fără corespondent: {k}")
        unit, topics = SHEET_MAP[k]
        for t in topics:
            sheets[f"{unit}|{t}"] = {"kick": s["kick"], "rows": s["rows"]}
    assert len(sheets) == 27, len(sheets)
    (dst / "anatopat_fise.js").write_text("TRV.pack(" + json.dumps({"id": "anatopat_fise", "sheets": sheets},
                                          ensure_ascii=False, separators=(",", ":")) + ");\n", encoding="utf-8")
    keep_files.add("anatopat_fise.js")

    # ---------- Histologie: o stație pe lamă, din recapitulările OSPE (aliniate la LP-urile oficiale 2–7) ----------
    by_lp = {}
    for x in ext["histo"]:
        m = re.match(r"LP (\d+) · Lama (\d+) din (\d+) · ([^·]+?) · (.+)$", x["kick"])
        assert m, x["kick"]
        lp, nr, col, org = int(m[1]), int(m[2]), m[4].strip(), m[5].strip()
        img = x["insets"][0]["img"] if x["insets"] else None
        kp = []
        for pnt in x["points"]:
            h = pnt["h"]
            if h.startswith("Recunoa"): st = "Recunoașterea · lama + colorația"
            elif h.startswith("Ob. mic"): st = "Descrierea · ob. mic"
            elif h.startswith("Ob. mare"): st = "Descrierea · ob. mare"
            elif h.startswith("DD"): st = "DD · " + h.split("·", 1)[1].strip() + " · 1 asemănare + 3 diferențe"
            else: st = h
            for d in pnt["d"]:
                t = d.strip()
                if t.startswith("= "): t = "Asemănare: " + t[2:]
                elif t.startswith("≠ "): t = "Diferență: " + t[2:]
                kp.append({"s": st, "t": t})
        by_lp.setdefault(lp, []).append({"nr": nr, "title": x["title"], "col": col, "org": org, "deck": x["deck"], "img": img, "kp": kp})
    HF = {(z["lp"], z["nr"]): z for z in json.loads((SRC / "histo_fise.json").read_text(encoding="utf-8"))["lame"]}
    for lp, lames in sorted(by_lp.items()):
        uid = f"histo_f{lp:02d}"
        lames.sort(key=lambda z: z["nr"])
        imgs, qs = {}, []
        for i, z in enumerate(lames):
            key = None
            if z["img"]:
                f = next((f for f in (SITE / "lp" / z["deck"] / "img").glob(z["img"] + ".*")), None)
                assert f, (z["deck"], z["img"])
                key = f"l{i}"
                imgs[key] = f"../lp/{z['deck']}/img/{f.name}"
            local = z["nr"] - {2: 0, 3: 3, 4: 6, 5: 9}.get(lp, 0)
            annot = []
            for f in sorted((OUT / "img" / "histo").glob(f"h{lp}_{local}_*.jpg"), key=lambda f: (0 if "_mic" in f.name else 1, f.name)):
                annot.append({"src": f"img/histo/{f.name}", "cap": ("Ob. mic" if "_mic" in f.name else "Ob. mare") + " · poza de la disciplină, cu structurile marcate"})
            more = []
            for extra in HISTO_CLEAN.get((lp, local), []):
                ff = next((SITE / "lp").glob(f"*/img/{extra[0]}.jpg"), None)
                if ff: more.append({"src": f"../lp/{ff.parent.parent.name}/img/{ff.name}", "cap": extra[1]})
            qs.append({"id": f"{uid}_l{i+1}", "topic": i, "diff": 0, "imgcap": "Poza de ansamblu", "more": more, "annot": annot, "type": "open", "station": 1, "img": key,
                       "q": "Recunoașteți lama și colorația, descrieți preparatul (obiectiv mic, apoi obiectiv mare) și faceți diagnosticul diferențial cu o singură altă lamă.",
                       "kp": z["kp"], "ev": HF[(lp, z["nr"])], "src": f"Recapitularea OSPE de Histologie · LP {lp}, {z['title']} ({z['col']} · {z['org']})"})
        titles = {2: "Epiteliile de acoperire (I)", 3: "Epiteliile de acoperire (II)", 4: "Epiteliile glandulare exocrine (III)",
                  5: "Epiteliile glandulare endocrine (IV)", 6: "Țesutul conjunctiv (I)", 7: "Țesutul conjunctiv (II)"}
        (dst / f"{uid}.js").write_text("TRV.pack(" + json.dumps({"id": uid, "questions": qs, "imgs": imgs}, ensure_ascii=False, separators=(",", ":")) + ");\n", encoding="utf-8")
        keep_files.add(f"{uid}.js")
        units.append({"id": uid, "subject": "histo", "unit": f"LP {lp}", "title": titles[lp], "short": titles[lp], "file": f"{uid}.js",
                      "topics": [z["title"] for z in lames], "q": [[q["id"], q["topic"], 2, "o", 1, 1 if q["img"] else 0, 0, 0, 0, 0, 0] for q in qs]})
    assert sum(len(v) for v in by_lp.values()) == 19, "Histologie LP 2–7 trebuie să aibă 19 lame"
    for z in HF.values():
        assert abs(sum(n["p"] for n in z["poz"]) - 6) < 1e-9 and len(z["dd"]["f"]) == 3, (z["lp"], z["nr"])

    # ---------- Farmacologie: banca de subiecte pentru fișa OSPE (sim_src/farma_fise.json) ----------
    FB = json.loads((SRC / "farma_fise.json").read_text(encoding="utf-8"))
    ftitles = {1: "Absorbția și distribuția", 2: "Metabolizarea și excreția", 3: "Farmacodinamie", 4: "Farmacodinamie. Farmacotoxicologie"}
    ids = set()
    for lp in (1, 2, 3, 4):
        uid = f"farma_f{lp:02d}"
        subs = [x for x in FB["subjects"] if x["lp"][0] == lp]
        qs = []
        for i, x in enumerate(subs):
            assert x["id"] not in ids, x["id"]; ids.add(x["id"])
            assert x["items"] and all(it["barem"] and all(b["p"] > 0 for b in it["barem"]) for it in x["items"]), x["id"]
            q = {"id": "farma_" + x["id"], "topic": i, "diff": 2, "type": "open", "station": 1, **{k: v for k, v in x.items() if k != "id"}}
            qs.append(q)
        (dst / f"{uid}.js").write_text("TRV.pack(" + json.dumps({"id": uid, "questions": qs, "imgs": {}}, ensure_ascii=False, separators=(",", ":")) + ");\n", encoding="utf-8")
        keep_files.add(f"{uid}.js")
        units.append({"id": uid, "subject": "farma", "unit": f"LP {lp}", "title": ftitles[lp], "short": ftitles[lp], "file": f"{uid}.js",
                      "topics": [x["title"] for x in subs],
                      "q": [[q["id"], q["topic"], 2, "o", 1, 0, 0, 0, 1 if q["kind"] == "caz" else 0, 0, 1 if q.get("variant") else 0] for q in qs]})
    for m in ("model_s1", "model_s2", "model_s3"):
        assert m in ids, f"lipsește {m} (modelul oficial)"
    units.sort(key=lambda u: (ORDER.get(u["subject"], 9), not u["id"].startswith("unix_"), u["id"]))

    (dst / "index.js").write_text("TRV.index(" + json.dumps(units, ensure_ascii=False, separators=(",", ":")) + ");\n", encoding="utf-8")
    keep_files.add("index.js")
    for old in dst.glob("*.js"):
        if old.name not in keep_files:
            old.unlink()

    for f in (SRC / "fonts").glob("*.woff2"):
        shutil.copyfile(f, OUT / "fonts" / f.name)
    shutil.copyfile(SRC / "app.html", OUT / "index.html")

    n = sum(len(u["q"]) for u in units)
    size = sum(p.stat().st_size for p in OUT.rglob("*") if p.is_file())
    print(f"Gata: {len(units)} pachete, {n} întrebări + 22 (Fiziopatologie) + {len(sheets)} fișe Anatopat · sim/ = {size/1e6:.1f} MB")


if __name__ == "__main__":
    main()
