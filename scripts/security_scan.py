#!/usr/bin/env python3
from pathlib import Path
import re, json, hashlib
root=Path(__file__).resolve().parents[1]
patterns={
  "google_api_key": re.compile(r"AIza[0-9A-Za-z_-]{20,}"),
  "private_key_block": re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
  "env_assignment": re.compile(r"(?im)^\s*(GOOGLE_API_KEY|GEMINI_API_KEY|API_KEY|OPENAI_API_KEY|ANTHROPIC_API_KEY)\s*=\s*.+")
}
findings=[]
for p in root.rglob('*'):
  if '.git' in p.parts or not p.is_file() or p.stat().st_size>5_000_000:
    continue
  try: txt=p.read_text(errors='ignore')
  except Exception: continue
  hits={name:len(rx.findall(txt)) for name,rx in patterns.items()}
  if sum(hits.values()):
    findings.append({"path":str(p.relative_to(root)),"hits":hits,"sha256":hashlib.sha256(txt.encode('utf-8','ignore')).hexdigest()[:16]})
print(json.dumps({"findingCount":len(findings),"findings":findings},indent=2))
raise SystemExit(1 if findings else 0)
