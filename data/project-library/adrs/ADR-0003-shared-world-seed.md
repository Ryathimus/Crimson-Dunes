# ADR-0003-shared-world-seed — Shared World Seed Across Viewer Modes

## Context

The Crimson Dunes Encounter Engine needs durable decisions that guide architecture, data organisation, and future implementation.

## Decision

Overworld, Multi-Character, and Single Character viewers must read from the same world seed and world state.

## Consequences

- This decision should be reflected in `AI_PROJECT.md`.
- Future implementation slices must honour this ADR unless it is superseded.
- If this decision changes, create a superseding ADR rather than silently editing history.
