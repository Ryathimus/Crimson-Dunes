# Source Import

This folder contains raw markdown imported from `BUNDLE.md`.

- `markdown/` preserves the original markdown documentation hierarchy.
- `index/markdown-catalog.json` lists every imported markdown file, category, title, hash, and line count.
- `index/bundle-file-index.json` lists all files seen in the bundle.
- `index/binary-assets-index.json` lists binary assets that were present but not inlined.

These are **source-import** records, not automatically accepted canon. They exist so later slices can migrate, restructure, validate, and selectively canonise the material without losing information.
