#!/usr/bin/env python3
from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[1]
paths=[root/'BUNDLE.md',root/'bundle.md',root/'SS_data']
removed=[]
for p in paths:
  if p.exists():
    if p.is_dir(): shutil.rmtree(p)
    else: p.unlink()
    removed.append(str(p.relative_to(root)))
for p in list(root.rglob('data.json')):
  if '.obsidian' in str(p) or 'copilot' in str(p).lower():
    p.unlink(); removed.append(str(p.relative_to(root)))
print('\n'.join(removed) if removed else 'No known secret paths found.')
