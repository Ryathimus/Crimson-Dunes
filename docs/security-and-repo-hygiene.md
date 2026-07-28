# Security and Repository Hygiene

## Issue

The source bundle included Obsidian plugin configuration files. Before publishing this project or enabling GitHub Pages from a public repository, remove or redact private plugin settings and secrets.

## Required Actions

- Rotate/revoke any exposed API keys.
- Remove `.obsidian/plugins/copilot/data.json` from public bundles.
- Add local/private plugin configuration to `.gitignore`.
- Use `*.example.json` templates for public settings examples.
- Ensure bundle scripts exclude secrets and large generated plugin files.

## Proposed `.gitignore` Additions

```gitignore
.obsidian/plugins/copilot/data.json
.obsidian/plugins/copilot/main.js
copilot/
.env
*.local.json
*.secret.json
```
