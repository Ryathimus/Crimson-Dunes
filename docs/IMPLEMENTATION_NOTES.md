# Implementation Notes — App Shell V2

## Added Since V1

- Author Mode source/draft comparison panel.
- Read-only source-import excerpt viewer for timeline source.
- Editable source-working notes stored in local storage.
- Editable draft review notes stored in local storage.
- Review status filter.
- Exportable review patch JSON.

## Canon Safety

This shell does not promote canon and does not write back to repository files. Exported review patches are draft review artifacts for Author Mode review.

## Next Steps

1. Add source-working file import/export.
2. Add diff view between source-working note and draft event.
3. Add JSON schema validation for timeline events.
4. Add patch application workflow in Author Mode.
5. Add route and 1788 slice entities.


## Added Since V2 — Project Library

- Consolidated `source-import/`, `world/`, `docs/`, `adrs/`, `schemas/`, `AI_PROJECT.md`, and `README.md` from the uploaded durable bundle.
- Included parsed bundle inventory metadata.
- Included latest generated write-back packages under `_latest-writebacks/`.
- Added Project Library browser with search, group filter, and file viewer.

Library counts at build time:

```json
{
  "bundleIndexedFiles": 394,
  "includedLibraryFiles": 144,
  "sourceImportFiles": 88,
  "worldFiles": 15,
  "docsFiles": 8,
  "adrFiles": 8,
  "schemaFiles": 6
}
```


## Added Since V3 — Validation + Patch Workflow

- Added runtime timeline validation checks.
- Added validation dashboard.
- Added review patch import.
- Added ready-for-draft-save queue export.
- Added validation report export.
- Added `data/timeline-event.schema.json` as a draft reference schema.

Validation remains client-side only; it does not promote canon or write repository files.


## Added Since V4 — 1788 Historical Foundation Workspace

- Added `data/slices/1788-historical-foundation.draft.json`.
- Added 1788 slice workspace to Author Mode shell.
- Added export for 1788 slice draft.
- Added copy/export world flags action.
- 1788 structure remains draft and requires Author Mode review before canon promotion.


## Added Since V5 — Player / Dev Preview + Decision Queue

- Added `data/decision-queues/1788-decision-queue.draft.json`.
- Added `data/player/opening-route-waru.draft.json`.
- Added `data/dev/dev-mode-config.draft.json`.
- Added basic Player Mode preview with Waru route nodes, action buttons, and local player event log.
- Added basic Dev Mode preview with feature flags, dev tasks, and validation summary.
- Added documentation updates: APP_PROGRESS, AI_PROJECT_CURRENT_STATE, SLICE_BOARD, WORKFLOW_STATUS.


## Added Since V6 — V7 Consolidated Workspaces

- Added `data/workspace-config.v7.json`.
- Reduced cross-over by hiding raw draft timeline/source review in Player Mode.
- Reduced cross-over by hiding Author source/draft review in Dev Mode.
- Added Player-visible Knowledge panel as the Player Mode replacement for raw draft/source browsing.
- Added editable 1788 decision queue UI.
- Added local decision patch export.
- Updated progress/current-state/slice-board/workflow documentation.


## Added Since V7 — V8 Visibility + UI Improvements

- Added `data/player/waru-character-preview.draft.json`.
- Added route node selector and current route node persistence.
- Added Player character HUD and Player-visible Knowledge panel.
- Added 1788 decision patch import.
- Added source-working patch export/import.
- Added structured validation for slice, route, character, decision queue, and dev config.
- Added `docs/UI_RECOMMENDATIONS.md` and `data/ui-recommendations.v8.json`.


## Added Since V8 — V9 Mode UI Refinement

- Added `data/author-worldbuilding-index.v9.json`.
- Added Author workspace navigation and dashboard cards.
- Added Player current scene card and richer character HUD.
- Added Dev Mode schema cards from structured validation.
- Updated UI recommendation docs to reflect implemented V9 direction.


## Added Since V9 — V10 Mode Visibility Fix

- Added `data/author/canon-promotion-queue.v10.json`.
- Added Canon Promotion Queue panel.
- Fixed workspace visibility by adding all major panel IDs to `applyWorkspaceVisibility()`.
- Updated `applyAuthorSectionVisibility()` to only run Author sub-workspace logic when in Author Mode.
- Updated workspace config so Player and Dev modes do not inherit Author panels.


## Added Since V10 — V11 Player Visibility Restore

- Fixed static hidden attributes on Player/Dev panels.
- Updated header version label to V11.
- Added Player route previous/next controls.
- Added player action outcomes and discovered facts persistence.
- Added diagnostic text for Player Mode allowed panels.


## Added Since V11 — V12 Route State Workspaces

- Added `data/player/route-state-machine.v12.json`.
- Added `data/author-section-detail-index.v12.json`.
- Added Player Route State panel and export.
- Added Author section detail panel.
- Added clickable Dev schema card details.


## Added Since V12 — V13 Runtime Fix + Route Tests

- Added missing `loadV10Data`, `renderCanonQueue`, and `exportCanonQueue` functions.
- Added `data/build-manifest.json`.
- Added `data/player/route-test-fixture.v13.json`.
- Added Dev Mode Route State Test Runner panel.


## Added Since V13 — V14 Runtime Contract Repair

- Added `data/runtime-comparison.v14.json`.
- Fixed `loadV9Data is not defined`.
- Restored `renderAuthorDashboard`, `setAuthorSection`, `applyAuthorSectionVisibility`, and `openLibraryPath`.
- Added Dev Mode Runtime Contract panel and self-check.
