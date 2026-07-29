# Crimson Dunes App Progress

Generated: 2026-07-29T06:30:39.061454+00:00

## Current Build

**App Shell V7 — Consolidated Workspaces + Editable 1788 Decisions**

## Implemented So Far

- Author / Player / Dev mode navigation.
- V7 workspace consolidation to reduce overlap between modes.
- Author Mode now owns timeline/source review, 1788 workspace, decision queue, review patches, and project library.
- Player Mode now focuses on Waru route preview, player-visible facts, and local player event log. Raw draft timeline is hidden in Player Mode.
- Dev Mode now focuses on validation summary, feature flags, dev tasks, schemas, and project library. Source/draft author review is hidden in Dev Mode.
- Draft timeline viewer using V4 direct-ICW-envoy timeline candidate.
- Source-import excerpt viewer and source-working notes.
- Project Library browser containing source-import, world, docs, ADRs, schemas, AI_PROJECT, README, and latest write-back packages.
- Timeline validation dashboard and validation report export.
- AI Agent disabled/no-op placeholder with mode-aware context preview.
- 1788 Historical Foundation Workspace.
- Editable 1788 decision queue with local decision patch export.
- Basic Player Mode preview with Waru opening route and event log.
- Basic Dev Mode preview with feature flags, dev tasks, and validation summary.

## Canon Safety

No app shell currently promotes canon, mutates source-import, writes repository files directly, or makes real AI provider calls.


## V8 Additions

- Added Player character HUD data and UI.
- Added route node selector/progression for Player Mode.
- Added Player-visible knowledge panel based on character/route state.
- Added 1788 decision patch import.
- Added source-working patch export/import.
- Added structured validation summary for slice, route, character, decision queue, and dev config.
- Added UI recommendations document and data file.


## V9 Additions

- Added Author workspace navigation.
- Added Author Narrative / Worldbuilding Dashboard cards.
- Added current scene card to Player Mode.
- Added richer Waru HUD fields: objective, equipment, status, known factions.
- Added Dev Mode schema cards.
- Added `data/author-worldbuilding-index.v9.json`.


## V10 Additions

- Fixed mode visibility issue where Author panels could remain visible in Player/Dev Mode.
- Added robust workspace panel visibility mapping for all major panels.
- Added Author-only Canon Promotion Queue draft panel and data file.
- Updated workspace configuration so Player Mode only shows Player preview/knowledge panels and Dev Mode only shows Dev/system panels.


## V11 Additions

- Fixed missing Player/Dev panels caused by static `hidden` attributes.
- Visibility now toggles both `.workspace-hidden` and the HTML `hidden` property.
- Updated visible app version name to V11.
- Added Player route previous/next controls.
- Added action outcome text and discovered facts tracking in Player Mode.


## V12 Additions

- Added route state machine data and Route State panel.
- Added route state export.
- Added Author section detail sub-workspaces from dashboard cards.
- Added clickable Dev schema cards with JSON detail output.
- Updated visible version label to V12.
