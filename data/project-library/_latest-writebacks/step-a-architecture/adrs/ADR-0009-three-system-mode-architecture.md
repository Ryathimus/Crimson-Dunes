# ADR-0009-three-system-mode-architecture — Three-System Mode Architecture

## Status
Accepted draft pending repository write-back.

## Context
The Crimson Dunes Encounter Engine is no longer framed as a single encounter interface only. The project needs separate operating contexts for worldbuilding/canon management, player-facing exploration, and encounter-engine development.

Existing decisions remain in force:

- ADR-0001 — Static GitHub Pages Application.
- ADR-0002 — Data-Driven World Model.
- ADR-0003 — Shared World Seed Across Viewer Modes.
- ADR-0004 — Canon/Draft/Generated Content Separation.
- ADR-0005 — Semi-Procedural Opening Route.
- ADR-0006 — Waru as First Locked POV.
- ADR-0007 — Mixed School-Connected Outsiders.
- ADR-0008 — 1788 Historical Foundation Slice.

This ADR clarifies the top-level application/system architecture above the existing viewer-mode decisions.

## Decision
The Crimson Dunes project is organised around three major systems:

1. **Author Mode**
   - Full-access worldbuilding, source review, narrative design, and canon-management mode.
   - Used to inspect, organise, edit, migrate, compare, and approve world/story data.
   - Has access to canon, draft, source-import, source-working, generated, dev-test, reference, and deprecated material, clearly labelled.
   - Is the only mode that may promote draft material to canon.

2. **Player Mode**
   - Controlled interactive encounter and exploration mode.
   - Runs player-facing experiences through appropriate viewers such as Player Overworld View, Multi-Character Viewer, and Single Character Viewer.
   - Visibility is governed by POV, discovery, character knowledge, route state, encounter state, and approved player-visible context.
   - Must not expose author-only, source-import, source-working, dev-test, unresolved draft, or debug data unless deliberately surfaced through approved gameplay content.

3. **Dev Mode**
   - Encounter-engine design and system-development mode.
   - Used to modify schemas, validation rules, feature flags, generation rules, route logic, encounter mechanics, and technical behaviours.
   - May propose draft world-data changes while testing mechanics.
   - Cannot promote content to canon and cannot bypass Author Mode.

## Overworld View Rule
Overworld View is not exclusive to Player Mode.

- **Author Overworld View** is a full-access canon/source/world-management interface.
- **Player Overworld View** is a controlled gameplay world-state interface.

Both may share underlying data structures, but they must enforce different visibility and edit permissions.

## Source Handling Rule
Author Mode must show source-import separately from draft and canon data.

The project distinguishes:

- **source-import** — original raw imported material, preserved as provenance.
- **source-working** — editable cleaned, annotated, or reviewed source layer.
- **draft** — proposed structured data.
- **canon** — approved source of truth.

Original source-import records should not be overwritten. Editable source work should occur in source-working files or source annotations.

## Canon Promotion Rule
Canon promotion follows this lifecycle:

```text
source-import / source-working / generated / dev-test / manual draft
→ draft
→ canon
```

Only Author Mode may perform the final `draft → canon` promotion, and only after explicit approval.

## Consequences
- AI_PROJECT.md must describe the project as a multi-system suite, not only an encounter interface.
- docs/architecture.md must include Author Mode, Player Mode, and Dev Mode as top-level systems.
- docs/viewer-modes.md must distinguish Author Overworld View from Player Overworld View.
- docs/data-model.md must include `source-working` and clarify the content lifecycle.
- Timeline and 1788 historical foundation migration outputs must remain draft until explicitly promoted in Author Mode.
- Dev Mode test fixtures and generated proposals must never be treated as canon by default.
