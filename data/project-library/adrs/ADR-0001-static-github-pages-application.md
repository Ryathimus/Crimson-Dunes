# ADR-0001-static-github-pages-application — Static GitHub Pages Application

## Context

The Crimson Dunes Encounter Engine needs durable decisions that guide architecture, data organisation, and future implementation.

## Decision

The first implementation target will be a static web application deployable through GitHub Pages. Core functionality must not require a backend server.

## Consequences

- This decision should be reflected in `AI_PROJECT.md`.
- Future implementation slices must honour this ADR unless it is superseded.
- If this decision changes, create a superseding ADR rather than silently editing history.
