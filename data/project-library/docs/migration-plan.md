# Migration Plan From Source Import to Structured Canon

## Principle

Raw imported markdown should be preserved first, then migrated gradually into structured canon/draft data. Do not delete or overwrite source-import records.

## Suggested Order

1. Timelines — migrate all dated events into structured timeline records and world flags.
2. Characters — migrate character sheets into character JSON profiles.
3. Locations — migrate maps, major sites, school descriptions, route nodes, and hubs.
4. Magic systems — migrate fusion magic, disciplines, ritual elements, limitations, and teaching concepts.
5. Creatures/plants/transport — migrate lists into reference/canon data sets.
6. RPG encounters — migrate encounter templates, variables, rewards, checks, reputation, logs.
7. Infinite Realm / Theory of Magic references — extract mechanics that inform the encounter engine without copying blindly into canon.
8. Media assets — review binary asset index and decide which images should be retained, renamed, credited, or removed.

## Validation Goal

Each migrated data set should eventually have a JSON Schema and a validation check before being used by the app.
