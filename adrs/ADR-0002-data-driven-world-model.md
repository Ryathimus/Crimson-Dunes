# ADR-0002-data-driven-world-model — Data-Driven World Model

## Context

The Crimson Dunes Encounter Engine needs durable decisions that guide architecture, data organisation, and future implementation.

## Decision

Lore, characters, timelines, locations, encounters, and rules should be stored in structured data files outside application code where practical.

## Consequences

- This decision should be reflected in `AI_PROJECT.md`.
- Future implementation slices must honour this ADR unless it is superseded.
- If this decision changes, create a superseding ADR rather than silently editing history.
