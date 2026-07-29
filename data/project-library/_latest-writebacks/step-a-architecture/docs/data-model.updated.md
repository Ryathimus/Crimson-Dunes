# docs/data-model.md — Proposed Updated Content

## Data Model Draft

### Core Object Categories

- World
- Timeline Event
- World Flag
- Character
- Character Knowledge
- Location
- Route Template
- Route Instance
- Encounter Template
- Encounter Instance
- Discovery
- Event Log Entry
- Source Import Record
- Source Working Record
- Draft Structured Record
- Canon Structured Record
- Dev-Test Fixture

### Timeline Layers

- `historicalFoundation` = pre-1810 realised history.
- `playable` = interactive timeline starting in 1810.
- `futureReference` = post-1810 future reference or playable-era reference that is not automatically fixed gameplay canon.

### Content Status Values

- `source-import` — Original raw imported material, preserved as provenance. Not editable directly.
- `source-working` — Editable cleaned, annotated, or reviewed source layer derived from source-import material.
- `draft` — Proposed structured material not yet accepted as canon.
- `canon` — Approved source-of-truth world data.
- `generated` — AI/system-created material not yet reviewed.
- `dev-test` — Test material created in Dev Mode while developing or validating mechanics.
- `reference` — Useful supporting material not directly accepted as canon.
- `deprecated` — Retained but superseded, rejected, or no longer active.

### Content Lifecycle

```text
source-import → source-working → draft → canon
source-import → draft → canon
generated → draft → canon
dev-test → draft → canon
reference → draft → canon, if adapted and approved
```

Only Author Mode may perform `draft → canon` promotion.

### View Permission Principles

- Author Mode can inspect all statuses.
- Author Mode is the only mode that can promote draft to canon.
- Player Mode should only access canon or approved player-visible gameplay state.
- Dev Mode can create generated/dev-test/draft proposals, but cannot canonise them.

### Reveal State Values

- hidden
- suspected
- indirectly_interacting
- revealed
- trusted
- opposed

### Route Generation Principle

A Route Template constrains generation. A Route Instance records what was generated for one world seed.

No procedural output becomes canon automatically.
