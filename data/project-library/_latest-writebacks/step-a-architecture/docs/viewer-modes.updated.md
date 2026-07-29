# docs/viewer-modes.md — Proposed Updated Content

## Viewer Modes

Viewer modes are interfaces for inspecting or experiencing world state. Their permissions depend on the active top-level system mode.

## Author Overworld View

Author Mode full-access worldbuilding and canon-management overview.

Shows:

- source-import records
- source-working records
- draft structured data
- canon structured data
- generated material
- dev-test material
- deprecated/reference material
- migration status
- full route state
- hidden flags
- timeline layers
- world flags
- all relevant characters, factions, locations, and encounter ingredients
- source/draft/canon comparisons

Can support:

- source review
- draft editing
- source-working editing
- migration decisions
- draft-to-canon promotion

Must preserve:

- original source-import provenance
- distinction between raw source, cleaned source, draft, and canon

## Player Overworld View

Player Mode broad gameplay world-state interface.

Shows only player-appropriate information such as:

- discovered route state
- known locations
- visible or inferred world flags
- player-visible timeline context
- active encounters
- generated route instance details that have been discovered or are appropriate to the current gameplay mode
- player-facing event log

Must hide:

- source-import material
- source-working material
- unresolved draft data
- author-only notes
- dev-test fixtures
- debug metadata
- hidden flags not yet discovered
- other-character-only or Overworld-author-only information

## Multi-Character Viewer

Player Mode narrative exploration interface.

Shows:

- selectable character perspectives
- different interpretations of the same event
- character knowledge differences
- relationship and location context

Must respect:

- character knowledge boundaries
- reveal state
- current world state
- player-facing visibility rules

## Single Character Viewer

Locked immersive POV mode.

For the first opening route, this is locked to **Waru**.

Shows only:

- what Waru sees
- what Waru hears
- what Waru remembers
- what Waru infers
- choices Waru can reasonably take

Must hide:

- Author Overworld-only state
- Player Overworld information not available to Waru
- outsider private motives
- other-character-only knowledge
- generated data not discovered by Waru
- source-import/source-working data
- dev/debug data
