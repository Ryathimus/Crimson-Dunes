# AI_PROJECT Current State Update — V7

Generated: 2026-07-29T06:30:39.061454+00:00

## Current State

The project is now a static prototype shell for a three-system suite with clearer workspace boundaries:

- **Author Mode:** worldbuilding, source/draft review, 1788 slice, decision queue, project library, review patch exports.
- **Player Mode:** Waru-route preview, player-visible facts, local player event log, and no raw draft/source browsing by default.
- **Dev Mode:** validation dashboard, feature flags, schemas/project library, dev tasks, and system exports.

## Current Draft Data

- `data/timelines/full-world-timeline.draft.json`
- `data/slices/1788-historical-foundation.draft.json`
- `data/decision-queues/1788-decision-queue.draft.json`
- `data/player/opening-route-waru.draft.json`
- `data/dev/dev-mode-config.draft.json`
- `data/workspace-config.v7.json`

## Current Timeline Decision

1810 Crimson Dunes is locally founded but not yet ICW-recognised. First formal ICW contact after founding is drafted as direct ICW envoy/correspondence.

## Current UI Consolidation Decision

Player Mode no longer duplicates the Author draft timeline/source review. Dev Mode no longer duplicates Author source-working review. Author Mode remains the primary place for source/draft/canon review and decisions.

## Next Tasks

1. Add persisted import/export for 1788 decision patches.
2. Add full Player Mode visibility filter based on route state and POV knowledge.
3. Add schema validation for 1788 slice, route, dev config, and decision queue.
4. Add route node selection/state progression.
5. Add source-working file import/export.
6. Add controlled patch application workflow.
7. Add optional secure AI provider integration later.


## V8 Current State Addendum

V8 improves mode separation by turning Player Mode into a character/scene interface and adding route node state. Author Mode gains source-working import/export and decision patch import/export. Dev Mode gains structured validation summary and UI recommendation notes.


## V9 Current State Addendum

V9 starts turning the app from a single long review page into mode-specific workspaces. Author Mode now has internal navigation and a worldbuilding dashboard. Player Mode is scene-first and character-first. Dev Mode now exposes schema cards for structured validation.


## V10 Current State Addendum

V10 addresses the screenshot issue where the UI appeared unchanged from Author Mode after switching modes. The mode visibility system now explicitly controls every major workspace panel. Player Mode should now hide Author dashboard/timeline/source panels, and Dev Mode should hide Author dashboard/source panels.


## V11 Current State Addendum

V11 fixes the Player/Dev panel issue by ensuring mode switching controls the HTML `hidden` attribute as well as CSS classes. Player Mode now has route progression controls, action outcomes, and discovered facts.


## V12 Current State Addendum

V12 adds route-state structure, author sub-workspace detail panels, and clickable Dev schema details. Player Mode now has a route state panel that can export current route state, discovered facts, and player log.


## V13 Current State Addendum

V13 fixes the V12 startup failure caused by missing canon queue runtime functions. V13 also adds `data/build-manifest.json` and the first route-state test fixture for Dev Mode.
