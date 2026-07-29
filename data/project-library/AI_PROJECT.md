# AI_PROJECT.md

## Project Goal

- **Purpose:** Create a static web-based GUI interactive encounter system for exploring and simulating the Crimson Dunes alternate Australian magical world.
- **Primary user:** Harley, acting as worldbuilder, game-master, player, and tester.
- **Expected outcome:** A GitHub Pages-hosted data-driven app with an Overworld View, Multi-Character Viewer, and Single Character Viewer operating on the same seeded world state.
- **Default playable start:** 1810, during the formation/founding period of Crimson Dunes School of Sorcery.
- **Historical foundation:** Pre-1810 history should be realised enough to influence current and future events.
- **Opening experience:** Exploration-first Outback/travel-route opening, before full school arrival.
- **Project type:** Static web RPG / interactive fiction / encounter simulation tool.

## Vocabulary

- **Crimson Dunes** — Alternate Australian magical setting combining First Fleet-era wizarding arrivals with Australian Indigenous magical traditions.
- **Historical Foundation** — The realised pre-1810 timeline whose events are treated as already happened and may influence playable world state from 1810 onward.
- **Playable Timeline** — The interactive timeline beginning in 1810, where user choices, encounters, and character actions can alter future world state.
- **World Seed** — Deterministic seed used to generate repeatable world and encounter outcomes across all viewer modes.
- **World Flag** — Durable state marker created by history, encounters, or decisions that can influence future events.
- **Overworld View** — Omniscient control view for timeline, encounters, locations, and world state.
- **Multi-Character Viewer** — View mode that allows switching between characters and comparing perspectives.
- **Single Character Viewer** — Locked POV mode where the user can only act through one character’s knowledge and options.
- **POV Character** — The character whose knowledge, perception, choices, and limitations determine what the Single Character Viewer shows.
- **Waru** — First locked POV character for the 1810 opening route; a local initiate connected to land-based magical practice and not yet fully connected to Crimson Dunes School.
- **Local Initiate** — A character with partial training, obligations, and perception within a local magical tradition, but who is still learning and not yet a full authority.
- **Opening Route** — The initial 1810 exploration-first travel path through the Outback, used to introduce characters, world state, magical history, and the journey toward Crimson Dunes School.
- **Semi-Procedural Route** — A route with fixed narrative anchors and destination, but seeded encounters, discoveries, environmental conditions, and character-specific reveals.
- **Route Template** — Authored route definition that constrains what can be generated.
- **Route Instance** — The generated version of a route for a specific world seed.
- **Route Node** — A point along a route where characters may travel, discover, rest, encounter, or make decisions.
- **Encounter Template** — Reusable encounter definition containing conditions, choices, variables, outcomes, and rewards.
- **Encounter Instance** — A specific generated or triggered occurrence of an encounter inside a world seed.
- **Encounter Slot** — A controlled position in a route where a suitable encounter may be selected from an approved pool.
- **Discovery Slot** — A controlled position in a route where lore, location clues, character insight, or historical consequences may be revealed.
- **Canon State** — Approved source-of-truth world data.
- **Draft State** — Non-final content not yet accepted as canon.
- **Reveal State** — Tracks whether a character is hidden, suspected, indirectly interacting, revealed, trusted, or opposed by another character/group.
- **Outsiders** — Characters or groups travelling through the opening route who are not local to Waru’s immediate magical/social context and may be connected to the emerging Crimson Dunes School.
- **Observation-first Gameplay** — Gameplay where the player watches, tracks, interprets, avoids detection, and decides when or whether to intervene.
- **Event Log** — Durable record of actions, choices, outcomes, and state changes.

## Constraints

- **Hosting:** Must work on GitHub Pages as a static web application.
- **Server:** No required backend server for core functionality.
- **Persistence:** Initial persistence should use browser local storage and/or downloadable save JSON.
- **Data:** Lore, characters, encounters, timelines, locations, and rules should be stored outside application code where practical.
- **AI reliability:** Chat is disposable; durable files are source of truth.
- **Canon control:** Generated content must not become canon unless explicitly accepted.
- **Content status:** Major content should be labelled as canon, draft, generated, deprecated, or reference.
- **Default playable start date:** 1810.
- **Historical foundation:** Pre-1810 events may influence 1810 starting state through world flags, character knowledge, faction conditions, relationship history, location state, magical anomalies, and available encounters.
- **Opening route:** Semi-procedural Outback/travel route.
- **Opening focus:** Exploration, world discovery, character discovery, and gradual revelation.
- **Crimson Dunes School:** Initially a destination / anchor hub rather than the first active interface.
- **First locked Single Character POV:** Waru.
- **Waru’s opening role:** Local initiate.
- **Waru’s immediate opening situation:** Cautiously observing outsiders from a distance.
- **Outsider group for opening route:** Mixed group connected to the emerging Crimson Dunes School.
- **Observation-first support:** Early choices should include stealth, observation, interpretation, indirect intervention, withdrawal, and possible reveal.
- **Viewer separation:** Single Character Viewer must not expose Overworld-only or other-character-only information.
- **Security:** Do not expose API keys or private plugin config in public bundles.

## What Must Never Happen

- Do not overwrite canon content without review.
- Do not treat generated ideas as canon automatically.
- Do not begin implementation before architecture, decisions, and slices are agreed.
- Do not expose API keys, private Obsidian plugin settings, or local-only secrets in public artifacts.
- Do not collapse real-world cultural reference, fictional adaptation, generated content, and canon into one unlabelled bucket.

## Decisions

- ADR-0001 — Static GitHub Pages Application
- ADR-0002 — Data-Driven World Model
- ADR-0003 — Shared World Seed Across Viewer Modes
- ADR-0004 — Canon/Draft/Generated Content Separation
- ADR-0005 — Semi-Procedural Opening Route
- ADR-0006 — Waru as First Locked POV
- ADR-0007 — Mixed School-Connected Outsiders as Opening Observed Group
- ADR-0008 — 1788 Historical Foundation Slice

## Current State

- **Current slice:** Consolidate architecture, vocabulary, data organisation, 1810 opening route, 1788 historical foundation slice, and full markdown source import into durable project files.
- **Last completed slice:** Alignment decisions captured for default timeline, opening mode, route type, first POV, Waru role, Waru opening situation, and outsider group.
- **Next intended slice:** Answer remaining alignment questions, then finalise Slice Board and begin shaping Slice 1.
- **Current blocker:** Need decisions on the 1788 stowaway identity, investigation style, relationship to Indigenous groups, and level of historical branching allowed.
- **Last updated:** 2026-07-28

## Slice Board

- [ ] 01. Architecture consolidation, durable data structure draft, and full markdown source import.
- [ ] 02. 1788 historical foundation slice: original magical stowaway, First Fleet arrival, investigation of Indigenous magical world, and integration with muggle settlement.
- [ ] 03. 1810 opening route data model: Waru observes mixed school-connected outsiders from distance.
- [ ] 04. Static app shell with no game logic: Overworld, Multi-Character, Single Character placeholders.
- [ ] 05. Load canonical world data from local JSON files.
- [ ] 06. Generate one semi-procedural route instance from fixed seed.
- [ ] 07. Display route differently in Overworld, Multi-Character, and Waru-locked Single Character views.
- [ ] 08. Add one seeded observation-first exploration encounter.
- [ ] 09. Record encounter results into shared world state and event log.
- [ ] 10. Add save/load world state.
- [ ] 11. Add validation checks for world, character, route, encounter, and event log data.
- [ ] 12. Polish documentation and handover workflow.

## Definition of Done

A slice is not done until:

- It honours this `AI_PROJECT.md`.
- It follows relevant ADRs.
- It uses agreed vocabulary.
- It has been tested or manually validated.
- It handles expected failure cases.
- It is understandable at the public/user interface.
- Any new assumptions were written back into durable files.


## Source Import Status

- Imported markdown files from bundle: 83.
- Indexed binary files from bundle: 60.
- Source-import records are not automatically canon.
- Full World Timelines source has been preserved and parsed into structured timeline data.
