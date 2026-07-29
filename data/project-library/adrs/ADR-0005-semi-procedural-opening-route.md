# ADR-0005-semi-procedural-opening-route — Semi-Procedural Opening Route

## Context

The Crimson Dunes Encounter Engine needs durable decisions that guide architecture, data organisation, and future implementation.

## Decision

The opening route will use fixed narrative anchors and destination with seeded encounters, discoveries, and environmental details selected from approved pools.

## Consequences

- This decision should be reflected in `AI_PROJECT.md`.
- Future implementation slices must honour this ADR unless it is superseded.
- If this decision changes, create a superseding ADR rather than silently editing history.
