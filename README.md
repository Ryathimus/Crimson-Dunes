# Crimson Dunes Encounter Engine — Architecture Draft

This package is a **non-code architecture and data-organisation draft** for the Crimson Dunes web-based interactive encounter system.

It consolidates the agreed direction so far:

- GitHub Pages-compatible static web app.
- Data-driven Crimson Dunes world model.
- Default playable timeline starts in **1810**.
- Pre-1810 events act as a realised **Historical Foundation**.
- Opening experience starts on a **semi-procedural Outback travel route**.
- First locked Single Character POV is **Waru**, a **local initiate**.
- Waru begins by cautiously observing a **mixed outsider group connected to the emerging Crimson Dunes School**.
- Separate canon, draft, generated, deprecated, and reference content.
- No implementation/code yet.

## How to use this draft

1. Read `AI_PROJECT.md` first.
2. Review `docs/architecture.md`, `docs/data-model.md`, and `docs/viewer-modes.md`.
3. Review ADRs in `adrs/`.
4. Review structured data under `world/`.
5. Answer the questions in `docs/next-alignment-questions.md` before implementation begins.

## Current status

Architecture/outline stage only. This package is intended to become the durable source of truth before coding starts.


## Bundle Import Update

This revision imports all markdown documentation from `BUNDLE.md` as raw source data.

- Markdown files imported: 83
- Binary assets indexed: 60
- Full World Timelines markdown extracted to `world/canon/timelines/full-world-timeline.raw.md`.
- Full parsed timeline extracted to `world/canon/timelines/full-world-timeline.json` and `world/canon/timelines.json`.

The source-import layer is intentionally separate from canon so nothing becomes accepted canon by accident.
