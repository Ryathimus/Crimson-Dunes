# ADR-0004-canon-draft-generated-separation — Canon/Draft/Generated Content Separation

## Context

The Crimson Dunes Encounter Engine needs durable decisions that guide architecture, data organisation, and future implementation.

## Decision

Content must be labelled as canon, draft, generated, deprecated, or reference; generated content does not become canon automatically.

## Consequences

- This decision should be reflected in `AI_PROJECT.md`.
- Future implementation slices must honour this ADR unless it is superseded.
- If this decision changes, create a superseding ADR rather than silently editing history.
