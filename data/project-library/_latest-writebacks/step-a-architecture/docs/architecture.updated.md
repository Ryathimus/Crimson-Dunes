# docs/architecture.md — Proposed Updated Content

## Architecture

### System Name

**Crimson Dunes Encounter Engine**

### Architectural Goal

Create a static, data-driven, GitHub Pages-compatible suite of systems for designing, managing, developing, and experiencing encounter-based narrative play inside the Crimson Dunes world.

The application code should not be the lore source of truth. Lore and encounter data should live in structured data files wherever practical.

## Top-Level Systems

### Author Mode

Full-access worldbuilding, source-review, narrative design, and canon-management mode.

Author Mode supports:

- Author Overworld View.
- Canon, draft, source-import, source-working, generated, dev-test, reference, and deprecated data review.
- Source/draft/canon comparison.
- Timeline and historical foundation review.
- Character, faction, location, magic system, route, and encounter ingredient management.
- Draft-to-canon promotion.

Author Mode is the only system allowed to promote draft material to canon.

### Player Mode

Controlled interactive encounter and exploration mode.

Player Mode supports:

- Player Overworld View.
- Multi-Character Viewer.
- Single Character Viewer.
- Route exploration.
- Encounter running.
- Character-knowledge-limited discovery.
- Event log and player-facing world state.

Player Mode must not expose author-only, dev-only, source-import, source-working, unresolved draft, generated, dev-test, or debug data unless deliberately surfaced through approved gameplay content.

### Dev Mode

Encounter-engine design and system-development mode.

Dev Mode supports:

- Schema design.
- Validation rules.
- Encounter engine configuration.
- Feature flags.
- Generation rules.
- Route and encounter mechanics.
- Debug/test tools.
- Dev-test fixtures.

Dev Mode may propose draft world-data changes while testing systems, but cannot promote any content to canon.

## Source Review Architecture

Author Mode should show source material separately from draft and canon data.

```text
source-import
  original raw imported material, preserved as provenance

source-working
  editable cleaned, annotated, or reviewed source layer

draft
  proposed structured data

canon
  approved source of truth
```

Canonical lifecycle:

```text
source-import / source-working / generated / dev-test / manual draft
→ draft
→ canon
```

Only Author Mode may perform the final `draft → canon` promotion.

## Layers

```text
Crimson Dunes Encounter Engine
│
├─ System Modes
│  ├─ Author Mode
│  ├─ Player Mode
│  └─ Dev Mode
│
├─ Data Layer
│  ├─ Source-import
│  ├─ Source-working
│  ├─ World canon
│  ├─ Draft world data
│  ├─ Characters
│  ├─ Locations
│  ├─ Timeline events
│  ├─ Magic systems
│  ├─ Encounter templates
│  ├─ Encounter instances
│  └─ Rules / validation schemas
│
├─ Simulation Layer
│  ├─ World seed
│  ├─ Time controller
│  ├─ Location state
│  ├─ Character state
│  ├─ Encounter generator
│  ├─ Outcome resolver
│  └─ History / event log
│
├─ Viewer Layer
│  ├─ Author Overworld View
│  ├─ Player Overworld View
│  ├─ Multi-Character Viewer
│  └─ Single Character Viewer
│
└─ Persistence Layer
   ├─ Canon data files in repo
   ├─ Draft/source-working data files in repo
   ├─ Browser local storage
   ├─ Downloadable save JSON
   └─ Optional exported session log
```

## Core Rule

Lore, source material, draft data, canon data, engine config, and generated/test data must remain explicitly labelled and separated. Generated, source-import, source-working, dev-test, and draft content must not become canon automatically.
