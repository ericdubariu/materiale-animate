import re,sys
f='/home/claude/materiale-animate/lp/anatopat-z4-anim/slides.js'; s=open(f,encoding='utf-8').read()
EX={
19:"**Din material, și**: **Ficatul de stază („în nucșoară”)** (LP 1): secțiune pestriță, puncte roșii-brune centrolobulare pe fond galben; nu galben uniform. **Ciroza hepatică**: suprafață nodulară, septuri fibroase, consistență dură; ficatul adesea mic. **Amiloidoza hepatică**: ficat mărit, ferm, ceros, palid-cenușiu („lardaceu”), elastic; nu galben și moale.",
20:"**Din material, și**: **Autoliza postmortem a pancreasului**: moale, pătat difuz, fără hemoragie organizată și fără pete albe de steatonecroză; nu e inflamație. **Pancreatita cronică (litiazică)**: pancreas dur, fibros, atrofic, cu calculi în ducte și calcificări; fără hemoragie proaspătă, fără pete cretoase. **Carcinomul pancreatic** (din tabelul de recapitulare).",
21:"**Din material, și**: **Hidronefroza de altă cauză** (stenoză de joncțiune, tumoră, adenom de prostată): cavitățile sunt dilatate, dar nu există calcul în ele. **Pielonefrita cronică**, **TBC renală** (din tabelul de recapitulare).",
22:"**Din material, și**: **Colecistita acută / empiemul**: perete roșu, edemațiat, cu fibrină și puroi în lumen, calcul inclavat în cistic, fără fibroză; cronica = perete fibros, alb. **Carcinomul veziculei biliare** (complicație tardivă): masă dură, albicioasă, infiltrativă în perete, adesea cu calculi; mucoasa ulcerată, neregulată. **Colesteroloza** (din tabelul de recapitulare).",
23:"**Din material, și**: **Pericardita purulentă** (LP 4): exsudat cremos, galben-verzui (puroi), adesea cu lichid tulbure în sac; infecții bacteriene. **Pericardita hemoragică**: exsudat amestecat cu sânge, roșu-brun; tipic metastaze, TBC, după chirurgie cardiacă. **Epicardul normal**: neted, lucios, transparent, cu grăsime subepicardică vizibilă.",
24:"**Din material, și**: **Tumora cerebrală** (glioblastom, metastază): masă solidă cu necroză neregulată, fără capsulă netedă și fără puroi. **Infarctul cerebral (pseudochist)**: zonă moale, apoi cavitate cu lichid clar, în teritoriul unei artere (ACM), fără perete purulent.",
25:"**Din material, și**: **Hemoragia subarahnoidiană**: în șanțuri e sânge roșu, nu exsudat purulent galben-verzui; de obicei la bază (anevrism rupt). **Meningita TBC**: exsudat gelatinos, la bază.",
26:"**Din material, și**: **Pneumonia lobară**: un lob întreg, omogen, consolidat, delimitat de scizură; stadii (hepatizație roșie → cenușie). **Tuberculoza miliară**: noduli mici (1–2 mm), uniformi, albicioși, „ca boabele de mei”, în tot plămânul; nu sunt purulenți, nu sunt centrați pe bronhiole. **Metastazele** (din tabelul de recapitulare).",
}
js=lambda x:"'"+x.replace('\\','\\\\').replace("'","\\'")+"'"
for n,t in EX.items():
  m=re.search(r"kick: 'Piesa %d · Diagnostic diferențial'"%n,s); assert m,n
  a=s.index('alt: [',m.end()); b=s.index('],\n',a)
  body=s[a+6:b]
  if 'Din material' in body: continue
  s=s[:b]+', '+js(t)+s[b:]
# DD din fișă: fără roșu (roșul e deja pe rubricile 1–3; maxim 4 pe slide)
s=re.sub(r"\{ tm: 'DD', at: '✓', tx: '((?:[^'\\]|\\.)*)' \}", lambda m:"{ tm: 'DD', at: '✓', tx: '"+m.group(1).replace('!!','')+"' }", s)
open(f,'w',encoding='utf-8').write(s); print('ok')
s=open(f,encoding='utf-8').read()
CR={23:'Mikael Häggström · CC0',24:'Denis Desaulniers et Berna… · CC BY-SA 4.0',26:'Yale Rosen · CC BY-SA 2.0'}
for n,c in CR.items():
  k="kick: 'Piesa %d · Diagnostic diferențial'"%n; i=s.index(k); j=s.find("hud: ['1 asemănare + 3 diferențe']",i)
  if 0<=j-i<300: s=s[:j]+"hud: ['1 asemănare + 3 diferențe', 'foto dreapta: %s']"%c+s[j+len("hud: ['1 asemănare + 3 diferențe']"):]
open(f,'w',encoding='utf-8').write(s); print('cr ok')
s=open(f,encoding='utf-8').read()
s=s.replace("{ img: 'pa', cap: 'Pancreatită acută hemoragico-necrotică: poza reală' }","{ img: 'pa', cap: 'Pancreatita: citosteatonecroza la microscop' }")
s=s.replace("{ img: 'pa', cap: 'Piesa 20: Pancreatită acută hemoragico-necrotică' }","{ img: 'pa', cap: 'Piesa 20: citosteatonecroza (microscop)' }")
open(f,'w',encoding='utf-8').write(s); print('caps ok')
