# AI Agent Architecture Package Summary

Generated: 2026-07-28T23:05:16.422254+00:00

This package adds a draft architecture for an optional AI Agent / Chat layer.

Files:

- `adrs/ADR-0010-ai-agent-chat-integration.md`
- `docs/ai-agent-chat.md`
- `AI_PROJECT.ai-agent-update-notes.md`

No app implementation code is included.

Key decisions:

- AI Agent is optional.
- App must work without hosted AI.
- Agent must be mode-aware: Author Agent, Player Agent, Dev Agent.
- Player Agent must obey visibility rules.
- All AI output starts as generated.
- Only Author Mode can save/promote AI output into draft/canon workflow.
- Hosted AI requires secure key handling; no API keys in public JavaScript.
