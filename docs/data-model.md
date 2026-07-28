# Data Model Draft

## Core Object Categories

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

## Timeline Layers

```text
historicalFoundation = pre-1810 realised history
playable = interactive timeline starting in 1810
futureProjection = generated or planned future possibilities
```

## Content Status Values

```text
canon
draft
generated
deprecated
reference
```

## Reveal State Values

```text
hidden
suspected
indirectly_interacting
revealed
trusted
opposed
```

## Route Generation Principle

A Route Template constrains generation. A Route Instance records what was generated for one world seed.

No procedural output becomes canon automatically.
