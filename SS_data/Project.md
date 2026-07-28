### Project Goal
- Purpose: Create a static web-based GUI interactive encounter system for exploring the Crimson Dunes alternate Australian magical world.
- Primary user: Harley, acting as worldbuilder, game-master, and player/tester.
- Expected outcome: A GitHub Pages-hosted data-driven app with an Overworld View, Multi-Character Viewer, and Single Character Viewer operating on the same seeded world state. Starting in 1810, with pre-1810 history realised enough to influence current and future events.
- Project type:
  - General software feature
  - Other: Static web RPG / interactive fiction / encounter simulation tool

### Vocabulary
- Crimson Dunes — Alternate Australian magical setting combining First Fleet-era wizarding arrivals with Australian Indigenous magical traditions.
- World Seed — Deterministic seed used to generate repeatable world and encounter outcomes.
- Overworld View — Omniscient control view for timeline, encounters, locations, and world state.
- Multi-Character Viewer — View mode that allows switching between characters and comparing perspectives.
- Single Character Viewer — Locked POV mode where the user can only act through one character’s knowledge and options.
- Encounter Template — Reusable encounter definition containing conditions, choices, variables, outcomes, and rewards.
- Encounter Instance — A specific generated or triggered occurrence of an encounter inside a world seed.
- Canon State — Approved source-of-truth world data.
- Draft State — Non-final content not yet accepted as canon.
- Event Log — Durable record of actions, choices, outcomes, and state changes.
- Historical Foundation — The realised pre-1810 timeline whose events are treated as already happened and may influence playable world state from 1810 onward.
- Playable Timeline — The interactive timeline beginning in 1810, where user choices, encounters, and character actions can alter future world state.
- World Seed — Deterministic seed used to generate repeatable world and encounter outcomes across all viewer modes.
- Canon State — Approved source-of-truth world data.
- World Flag — A durable state marker created by history, encounters, or decisions that can influence future events.

### Constraints
- Hosting: Must work on GitHub Pages as a static web application.
- Server: No required backend server for core functionality.
- Persistence: Initial persistence should use browser local storage and/or downloadable save JSON.
- Data: Lore, characters, encounters, timelines, locations, and rules should be stored outside application code where practical.
- AI reliability: Chat is disposable; durable files are source of truth.
- Canon control: Generated content must not become canon unless explicitly accepted.
- Cultural handling: Indigenous-inspired content must be clearly tracked, respectfully handled, and separated between factual reference, fictional adaptation, draft, and canon.
- What must never happen:
  - Do not overwrite canon content without review.
  - Do not treat generated ideas as canon automatically.
  - Do not expose API keys or private plugin config in public bundles.
  - Do not begin implementation before architecture, decisions, and slices are agreed.
- Default playable start date: 1810.
- Pre-1810 history must be modelled as durable historical foundation data, not discarded backstory.
- Pre-1810 events may influence 1810 starting state through world flags, character knowledge, faction conditions, relationship history, location state, magical anomalies, and available encounters.
- The app must distinguish between historical foundation, active playable timeline, and future simulated/generated events.

### Decisions
- ADR-0001 — Static GitHub Pages application
- ADR-0002 — Data-driven canon/world model
- ADR-0003 — Shared world seed across all viewer modes
- ADR-0004 — Canon/draft/generated content separation

### Current State
- Current slice: Align architecture and vocabulary.
- Last completed slice: Initial bundle review.
- Next intended slice: Decide key architectural choices before shaping implementation slices.
- Current blocker: Need confirmation of intended first playable era and initial user workflow.
- Last updated: 2026-07-27

### Slice Board
- 01. Define durable project architecture, vocabulary, and data organisation.
- 02. Create minimal static app shell with no game logic.
- 03. Load canonical world data from local JSON files.
- 04. Display Overworld timeline/location/character snapshot.
- 05. Add seeded encounter template selection.
- 06. Add Multi-Character Viewer.
- 07. Add Single Character locked POV mode.
- 08. Add save/load world state.
- 09. Add validation checks for data files.
- 10. Polish documentation and handover workflow.
