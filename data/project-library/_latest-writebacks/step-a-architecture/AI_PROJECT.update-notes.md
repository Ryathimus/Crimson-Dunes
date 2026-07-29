# AI_PROJECT.md — Step A Write-back Notes

Apply these changes to AI_PROJECT.md.

## Replace / update Project Goal wording

```markdown
## Project Goal
- **Purpose:** Create a static, GitHub Pages-compatible, data-driven suite of systems for designing, managing, developing, and experiencing the Crimson Dunes alternate Australian magical world.
- **Primary user:** Harley, acting as worldbuilder, author, game-master, player, tester, and encounter-engine designer.
- **Expected outcome:** A GitHub Pages-hosted data-driven application suite with Author Mode, Player Mode, and Dev Mode operating over structured world data and a shared seeded world state where appropriate.
- **Default playable start:** 1810, during the formation/founding period of Crimson Dunes School of Sorcery.
- **Historical foundation:** Pre-1810 history should be realised enough to influence current and future events.
- **Opening experience:** Exploration-first Outback/travel-route opening, before full school arrival.
- **Project type:** Static web RPG / interactive fiction / encounter simulation / worldbuilding and canon-management tool.
```

## Add to Vocabulary

```markdown
- **Author Mode** — Full-access worldbuilding, source-review, narrative design, and canon-management mode. Used to inspect, organise, edit, migrate, compare, and approve world/story data.
- **Player Mode** — Controlled interactive encounter and exploration mode. Presents the world through gameplay viewers with visibility governed by POV, discovery, character knowledge, route state, encounter state, and player intent.
- **Dev Mode** — Encounter-engine design and system-development mode. Used to modify schemas, validation rules, feature flags, generation rules, route logic, encounter mechanics, and technical behaviour. May propose draft world-data changes, but cannot canonise them.
- **Author Overworld View** — Author Mode overview interface for canon management, source-import review, source-working review, draft/canon comparison, timeline management, world flags, and structured world data.
- **Player Overworld View** — Player Mode world-state interface that shows only player-appropriate information based on discovery, gameplay context, current world state, and approved visibility rules.
- **Source-import** — Original raw imported material preserved as provenance. It is not canon and should not be overwritten.
- **Source-working** — Editable cleaned, annotated, or reviewed source layer derived from source-import material. It supports migration and comparison but does not become canon automatically.
- **Draft-to-canon Promotion** — Explicit Author Mode action that promotes reviewed draft material to canon. No generated, source-import, source-working, dev-test, or draft material becomes canon automatically.
```

## Add to Constraints

```markdown
- **Three-system architecture:** The project is organised around Author Mode, Player Mode, and Dev Mode.
- **Author Mode authority:** Only Author Mode may promote draft material to canon.
- **Player Mode visibility:** Player Mode must not expose author-only, source-import, source-working, unresolved draft, dev-test, generated, or debug data unless deliberately surfaced through approved gameplay content.
- **Dev Mode limits:** Dev Mode may propose draft world-data changes while testing systems, but it cannot promote content to canon or bypass Author Mode.
- **Source preservation:** Original source-import material should remain preserved as immutable provenance. Editable source changes should occur in source-working files or annotations.
- **Source comparison:** Author Mode should support source-import/source-working/draft/canon comparison during migration and review.
```

## Add to Decisions

```markdown
- ADR-0009 — Three-System Mode Architecture
```

## Update Current State

```markdown
- **Current slice:** Consolidate three-system architecture, source-import/source-working policy, timeline migration shape, 1788 historical foundation slice, and full markdown source import into durable project files.
- **Last completed alignment:** Confirmed Author Mode, Player Mode, Dev Mode; shared Author/Player Overworld concept; source-working layer; and Author Mode-only draft-to-canon promotion.
- **Next intended slice:** Write back architecture updates, then migrate the full world timeline into draft structured data.
- **Current blocker:** Need visibility of `SS_data` before duplicate/redundant file recommendations can be made for that folder.
```
