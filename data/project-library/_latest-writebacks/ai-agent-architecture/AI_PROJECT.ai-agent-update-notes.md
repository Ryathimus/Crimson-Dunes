# AI_PROJECT.md — AI Agent Update Notes

Add to Project Goal / Expected Outcome:

```markdown
- **Optional AI Agent / Chat layer:** A mode-aware assistant may support Author Mode, Player Mode, and Dev Mode, but the app must remain usable without hosted AI.
```

Add to Vocabulary:

```markdown
- **AI Agent / Chat Layer** — Optional mode-aware assistant system that can help with authoring, player narration, and development tasks while respecting mode permissions and canon rules.
- **Author Agent** — AI assistant profile for source review, migration, draft generation, canon review preparation, and worldbuilding support.
- **Player Agent** — AI assistant profile for narration, encounter facilitation, and player-visible guidance under strict visibility rules.
- **Dev Agent** — AI assistant profile for schema, validation, feature, route, encounter, and engine-development support.
- **Agent Orchestrator** — Internal layer responsible for mode selection, context retrieval, permission filtering, prompt construction, provider routing, and output classification.
```

Add to Constraints:

```markdown
- AI features are optional; the core app must work without hosted AI.
- Do not commit API keys, model provider secrets, tokens, or private configuration.
- Public JavaScript must not contain private AI provider keys.
- AI context must be filtered by mode and viewer permissions.
- Player Agent must not receive hidden Author/Dev/source/draft data unless deliberately revealed through gameplay.
- AI output is generated content until saved as draft by Author Mode.
- AI output cannot become canon automatically.
```

Add to Decisions:

```markdown
- ADR-0010 — AI Agent / Chat Integration
```

Update Slice Board with future items:

```markdown
- [ ] Add non-networked AI Agent shell with mode selector and context preview.
- [ ] Add Agent Orchestrator permission model.
- [ ] Add provider abstraction with disabled provider as default.
- [ ] Add optional secure AI backend/proxy integration.
```
