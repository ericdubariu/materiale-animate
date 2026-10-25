#!/usr/bin/env python3
"""Construiește „Simulări de examen” pentru site (GitHub Pages).

Intrare
  sim_src/app.html            aplicația (un singur fișier HTML, fără date)
  sim_src/fonts/*.woff2       fonturile (Inter, Plus Jakarta Sans)
  pachetele de întrebări      fișierele <id>.js + index.js produse de build-ul Triviadorului
                              (TRV.pack({...}) / TRV.index([...])); se copiază neschimbate
  lp/fiziopat-examen-anim/    lista oficială de 22 de întrebări cu răspunsurile model (slide-urile „Răspuns model”)
  lp/anatopat-z1-anim/, lp/anatopat-z2-anim/
                              fișele OSPE oficiale (organ, leziune, definiție, descriere, cauze, complicații, DD)

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
KEEP = re.compile(r"^(unix_.+|histo_lp0[2-7]|anatopat_lp\d+|farma_lp\d+|micro_lp0[1-6]b?|fizio_lp\d+|embrio_lp\d+)$")
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
}

NODE_JS = r"""
const [,, site] = process.argv;
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
for (const d of ['anatopat-z1-anim', 'anatopat-z2-anim']) {
  const m = await import(site + '/lp/' + d + '/slides.js');
  for (const s of m.SLIDES) if (s.script && s.sceneOpts && s.sceneOpts.f) out.sheets.push({ deck: d, f: s.sceneOpts.f, kick: s.kick, rows: s.script });
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
        assert p["id"] == u["id"], f
        q = []
        for x in p["questions"]:
            t = {"mcq": "m", "open": "o", "calc": "c", "graph": "g"}[x["type"]]
            q.append([x["id"], x["topic"], x["diff"], t, 1 if x.get("station") else 0, 1 if x.get("img") else 0,
                      len(x.get("opts", [])), len(x.get("ok", []))])
        units.append({"id": u["id"], "subject": u["subject"], "unit": u["unit"], "title": u["title"],
                      "short": u.get("short", ""), "topics": u["topics"], "file": u["file"], "q": q})
        if src != dst:
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
    assert len(sheets) == 13, len(sheets)
    (dst / "anatopat_fise.js").write_text("TRV.pack(" + json.dumps({"id": "anatopat_fise", "sheets": sheets},
                                          ensure_ascii=False, separators=(",", ":")) + ");\n", encoding="utf-8")
    keep_files.add("anatopat_fise.js")

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
    print(f"Gata: {len(units)} pachete, {n} întrebări + 22 (Fiziopatologie) + {len(sheets)} fișe OSPE · sim/ = {size/1e6:.1f} MB")


if __name__ == "__main__":
    main()
