# Mode Interaction Guide — V16

This guide describes how each mode is intended to be used and what should be checked during manual testing.

## Author Mode

Use Author Mode for full-access worldbuilding and draft review. Expected interactions:

1. Open the dashboard.
2. Use the worldbuilding cards to open Author sections.
3. Use Timeline, Source Review, 1788 Slice, Decisions, Canon Queue, and Project Library tabs as needed.
4. Export review patches or validation reports only from Author/Dev workflows.

Author Mode is allowed to show source/draft/review data.

## Player Mode

Use Player Mode as a player-facing route and scene interface. Expected interactions:

1. Switch to Player Mode.
2. Confirm only Player panels are visible.
3. Read Current Scene and Character HUD.
4. Select a route node or use Previous/Next node.
5. Choose actions such as observe, interpret, withdraw, indirectly intervene, or reveal self.
6. Confirm Player-visible Knowledge updates without showing author-only/source-import data.
7. Export the player log or route state when debugging.

Player Mode must not show Author source-review, raw timelines, Dev fixtures, or hidden draft notes.

## Dev Mode

Use Dev Mode for system tests, validation, runtime contract checks, secret hygiene, route-state tests, and project library/schema inspection. Expected interactions:

1. Switch to Dev Mode.
2. Check Secret Hygiene status.
3. Check Runtime Contract status.
4. Run Route State Test Runner.
5. Run Mode Interaction Test Runner.
6. Inspect schema cards and project library files.

Dev Mode should help detect runtime drift, visibility drift, schema drift, and secret hygiene issues before deployment.
