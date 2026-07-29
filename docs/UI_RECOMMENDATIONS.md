# UI Recommendations — V8

Generated: 2026-07-29T06:41:23.671108+00:00

## Author Mode

Recommended direction: make Author Mode feel like a **Narrative / Worldbuilding Studio**, not only a timeline validator.

Suggested sections:

- Dashboard / review queue
- Timeline and history
- Characters
- Locations and regions
- Factions and institutions
- Magic systems
- Creatures, plants, materials
- Routes and encounters
- Source-import/source-working review
- World flags and continuity
- Canon promotion queue

Key UI recommendation: use a left navigation rail or internal tab set for Author Mode. Keep the source/draft/canon comparator as one workspace rather than making it dominate every Author task.

## Player Mode

Recommended direction: make Player Mode feel like a **Character / Scene Interface**.

Suggested sections:

- Character HUD: name, POV, location, route node, status flags
- Equipment / carried items
- Current scene
- Available actions
- Known facts
- Event log
- Optional narrator/agent panel

Key UI recommendation: never show raw draft timeline/source-import data in Player Mode by default. Player Mode should show current scene and character knowledge first.

## Dev Mode

Recommended direction: make Dev Mode feel like a **System Operations / Engine Workshop**.

Suggested sections:

- System health
- Feature flags
- Validation by data type
- Schema browser
- Test fixtures
- Provider/AI configuration
- Dev task board
- Project library

Key UI recommendation: Dev Mode should not duplicate Author source review. Dev Mode should report data health and system configuration.


## V9 Implementation Direction

V9 begins applying these recommendations:

- Author Mode now has a workspace navigation strip and worldbuilding dashboard cards.
- Player Mode now has a stronger scene-first layout using current route node text and character HUD fields.
- Dev Mode now has schema cards derived from structured validation results.

Recommended next UI step: turn Author Mode cards into true routed sub-workspaces, then add a dedicated Canon Promotion Queue once draft review is stable.
