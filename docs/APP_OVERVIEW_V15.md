# Crimson Dunes App Overview — V15

Crimson Dunes is a static, data-driven app shell for developing, reviewing, and eventually playing through the Crimson Dunes world and encounter engine. The app is intentionally split into Author, Player, and Dev modes so that worldbuilding authority, player-visible experience, and engine/debug tools remain separate.

## Author Mode

Purpose: full-access worldbuilding, source/draft review, timeline review, decision queues, and future canon promotion review. Author Mode can inspect source-import, draft objects, validation warnings, 1788 slice material, project library files, and canon queue scaffolding.

Current alignment: good. Author Mode now functions as a worldbuilding dashboard rather than only a timeline. It still needs richer edit forms and true persisted draft-write workflows.

## Player Mode

Purpose: player-facing route and scene interface. Player Mode should expose only current character, route node, approved knowledge, player log, route state, action results, and discovered facts.

Current alignment: good. The latest screenshot confirms Player Mode is now showing the intended scene/HUD layout. It still needs guarded transition rules, terminal states, and stronger action unlock logic.

## Dev Mode

Purpose: validation, runtime contract checking, route-state tests, schema inspection, feature flags, and system/debug work. Dev Mode should not duplicate Author review or Player play surfaces.

Current alignment: improving. V14 repaired runtime contract drift, and V15 adds security hygiene. Dev Mode should next gain automated smoke tests for mode switching, panel visibility, and secret scan status.

## Security posture

V15 adds secret hygiene tooling and removes known sensitive imported paths from the generated package. Provider-side key revocation remains mandatory for any secret that reached GitHub history.
