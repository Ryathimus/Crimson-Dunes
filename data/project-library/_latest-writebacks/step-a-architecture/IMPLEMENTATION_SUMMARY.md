# Crimson Dunes Step A Implementation Summary

## Completed in this write-back package

This package drafts the architecture/data write-back for the newly confirmed three-system architecture:

- Author Mode
- Player Mode
- Dev Mode

It includes proposed durable updates for:

- `adrs/ADR-0009-three-system-mode-architecture.md`
- `AI_PROJECT.md` update notes
- `docs/architecture.md`
- `docs/data-model.md`
- `docs/viewer-modes.md`

## Confirmed decisions captured

1. The project is a multi-system suite, not only a player-facing encounter engine.
2. Author Mode is responsible for worldbuilding, source review, and canon management.
3. Player Mode runs controlled encounter/exploration experiences.
4. Dev Mode designs and tests the encounter engine and may propose draft world-data changes.
5. Only Author Mode may promote draft content to canon.
6. Overworld View has both Author and Player variants.
7. Source-import must remain separate from draft/canon views.
8. Original source-import should be preserved as provenance.
9. Editable source work occurs in `source-working`.
10. Content promotion follows `source-import/source-working/generated/dev-test/manual draft → draft → canon`.

## Still blocked

`SS_data` is not present in the current uploaded bundle/index visibility, so duplicate/redundant file review for that folder cannot be completed yet.

## Recommended next step

After repository write-back of Step A, proceed to Timeline Migration Shape:

- Review `world/canon/timelines/full-world-timeline.raw.md`.
- Review `world/canon/timelines/full-world-timeline.json`.
- Produce cleaned draft structured timeline records.
- Keep canonStatus as `draft` unless preserving raw source as `source-import`.
- List ambiguous events for user classification.
