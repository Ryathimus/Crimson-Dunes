# ADR-0010-ai-agent-chat-integration — AI Agent / Chat Integration

## Status
Draft, pending Author Mode review.

## Context
The Crimson Dunes project is a static, data-driven suite with Author Mode, Player Mode, and Dev Mode. The user wants an AI Agent / Chat function that can help design, refine, migrate, query, and play through the world.

A static GitHub Pages deployment can host the front-end, but it should not contain private API keys or secrets. Any hosted AI service that requires a secret key needs either a secure backend/proxy or a bring-your-own-key local-only workflow.

## Decision
The project will support an optional AI Agent / Chat layer, but it must be designed as a mode-aware assistant rather than an uncontrolled global chat.

The AI Agent should have separate behaviour profiles for:

1. **Author Agent**
   - Helps review source-import/source-working/draft/canon data.
   - Helps migrate structured data.
   - Helps compare source vs draft vs canon.
   - Suggests world flags, timeline classifications, encounter templates, and canon promotion candidates.
   - Cannot promote draft to canon without explicit Author Mode action.

2. **Player Agent**
   - Acts as narrator, guide, or encounter facilitator.
   - Must obey Player Mode visibility rules.
   - Cannot reveal Author Mode, Dev Mode, source-import, source-working, hidden draft, or debug data unless explicitly surfaced through gameplay.

3. **Dev Agent**
   - Helps design schemas, validation, test fixtures, feature flags, encounter logic, route generation, and debugging workflows.
   - May propose draft data for testing.
   - Cannot promote content to canon.

## Deployment Strategy
AI integration should support multiple implementation tiers:

### Tier 0 — No Hosted AI
The app works without AI. All core data browsing, editing, migration, and player-mode features remain available.

### Tier 1 — Local / BYO Key AI
A user may optionally provide an API key locally in browser storage for personal/private use. This is useful for local development but is not recommended for public deployment.

### Tier 2 — Secure Backend Proxy
A backend endpoint proxies AI requests and stores API keys server-side. This is the preferred option for deployed AI features.

### Tier 3 — Azure Static Web Apps + Managed API
If the project moves beyond pure GitHub Pages, Azure Static Web Apps can provide authentication and integrated serverless API endpoints for secure AI calls.

## Security Rules
- Do not commit API keys, provider secrets, tokens, or private plugin configuration to the public repo.
- Do not expose hosted AI provider keys in public JavaScript.
- AI requests must be mode-aware and permission scoped.
- Player Agent must pass through visibility filtering before sending context to the model.
- Author Agent can see broader data but must preserve canon/draft/source boundaries.
- Dev Agent can see schemas and debug data but cannot canonise world content.
- All AI output is `generated` unless saved as draft by Author Mode.

## Data / Context Rules
The agent must retrieve context from structured data layers rather than raw global prompt dumps wherever practical.

Recommended context sources:

- `AI_PROJECT.md`
- ADRs
- `docs/architecture.md`
- `docs/data-model.md`
- source-import index
- source-working files
- draft data
- canon data
- current route/session state
- current viewer visibility state

## Consequences
- The architecture gains an AI Agent layer but the core application remains usable without it.
- App implementation should include a provider abstraction so AI can be disabled, local-only, proxied, or hosted via Azure later.
- AI Agent must be treated as an assistant to the mode workflow, not as the authority over canon.
- AI-generated content must never become canon automatically.
