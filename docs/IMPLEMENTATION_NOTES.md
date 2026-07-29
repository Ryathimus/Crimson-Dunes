# Implementation Notes — App Shell V2

## Added Since V1

- Author Mode source/draft comparison panel.
- Read-only source-import excerpt viewer for timeline source.
- Editable source-working notes stored in local storage.
- Editable draft review notes stored in local storage.
- Review status filter.
- Exportable review patch JSON.

## Canon Safety

This shell does not promote canon and does not write back to repository files. Exported review patches are draft review artifacts for Author Mode review.

## Next Steps

1. Add source-working file import/export.
2. Add diff view between source-working note and draft event.
3. Add JSON schema validation for timeline events.
4. Add patch application workflow in Author Mode.
5. Add route and 1788 slice entities.


## Added Since V2 — Project Library

- Consolidated `source-import/`, `world/`, `docs/`, `adrs/`, `schemas/`, `AI_PROJECT.md`, and `README.md` from the uploaded durable bundle.
- Included parsed bundle inventory metadata.
- Included latest generated write-back packages under `_latest-writebacks/`.
- Added Project Library browser with search, group filter, and file viewer.

Library counts at build time:

```json
{
  "bundleIndexedFiles": 394,
  "includedLibraryFiles": 144,
  "sourceImportFiles": 88,
  "worldFiles": 15,
  "docsFiles": 8,
  "adrFiles": 8,
  "schemaFiles": 6
}
```
