# docs/ai-agent-chat.md — AI Agent / Chat Architecture Draft

## Purpose

The AI Agent / Chat function is an optional assistant layer for Crimson Dunes. It should help with worldbuilding, migration, gameplay narration, and system development while respecting the three-system architecture:

- Author Mode
- Player Mode
- Dev Mode

The agent is not a replacement for the data model, Author Mode governance, or canon promotion workflow.

## Agent Profiles

### Author Agent

Primary use:

- Query world data.
- Review source-import/source-working material.
- Compare source vs draft vs canon.
- Suggest timeline classifications.
- Suggest world flags.
- Draft 1788 historical foundation structures.
- Draft encounter templates.
- Identify contradictions or missing provenance.

Can access:

- source-import
- source-working
- draft
- canon
- generated
- dev-test summaries where relevant
- reference/deprecated data

Cannot:

- Promote draft to canon without Author Mode approval.
- Delete source-import provenance.
- Hide uncertainty.

### Player Agent

Primary use:

- Narrate encounters.
- Help interpret player-visible world state.
- Drive or assist the encounter loop.
- Support locked POV and multi-character play.

Can access:

- current player-visible state
- current POV knowledge
- discovered route data
- approved player-visible canon/draft-as-playtest content
- event log entries visible to the player

Cannot access:

- source-import
- source-working
- hidden draft
- author notes
- dev/debug state
- hidden NPC motives unless revealed
- undiscovered world flags

### Dev Agent

Primary use:

- Schema design.
- Validation rules.
- Test fixtures.
- Encounter engine design.
- Debugging data workflows.
- Feature flag suggestions.

Can access:

- schemas
- dev-test data
- draft technical docs
- engine config
- validation errors
- structured data samples

Cannot:

- Promote canon.
- Expose dev-test content to Player Mode as canon.

## Suggested UI Placement

### Author Mode

`Author Copilot Panel`

Possible commands:

- "Compare this source record to the draft timeline event."
- "Suggest world flags for this 1788 event."
- "List ambiguous timeline classifications."
- "Draft a source-working cleanup note."
- "Prepare canon-promotion review notes."

### Player Mode

`Narrator / Guide Panel`

Possible commands:

- "What can Waru infer from this?"
- "What are my options?"
- "Summarise what I know so far."
- "Continue the encounter."

### Dev Mode

`Dev Assistant Panel`

Possible commands:

- "Validate this timeline event structure."
- "Suggest a schema for world flags."
- "Generate test fixtures for route encounters."
- "Explain why this data failed validation."

## Architecture Placement

```text
Crimson Dunes App
│
├─ Author Mode
│  └─ Author Agent
│
├─ Player Mode
│  └─ Player Agent
│
├─ Dev Mode
│  └─ Dev Agent
│
├─ Agent Orchestrator
│  ├─ mode selector
│  ├─ permission filter
│  ├─ context retriever
│  ├─ prompt builder
│  ├─ provider adapter
│  └─ output classifier
│
└─ Provider Layer
   ├─ disabled/no-op provider
   ├─ local/BYO-key provider
   ├─ secure proxy provider
   └─ future Azure Static Web Apps API provider
```

## Output Status Rule

All AI output starts as:

```text
generated
```

Author Mode may save selected AI output as:

```text
draft
```

Only Author Mode may later promote draft to:

```text
canon
```

## Recommended Initial Implementation

Start with a non-networked placeholder agent shell:

- Chat panel UI placeholder.
- Mode selector: Author / Player / Dev.
- Context preview showing what would be sent.
- Disabled provider by default.
- Local transcript saved to browser storage or downloadable JSON.
- No API keys committed.

Then add a provider abstraction later.

## Open Design Questions

1. Should the first agent implementation be Author Agent only?
2. Should local BYO-key support be allowed, or should the app require a secure proxy for AI calls?
3. Should chat transcripts become event log entries, source-working annotations, or separate agent-session logs?
4. Should Player Agent be available in first playable prototype, or delayed until visibility rules are robust?
