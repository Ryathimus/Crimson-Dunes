# Secret Remediation and Hygiene — V15

## Immediate response

1. Revoke the exposed Google API key in Google Cloud / Google AI Studio.
2. Create a fresh key only if still required.
3. Restrict any replacement key by application, referrer, IP, and allowed APIs where possible.
4. Check Google Cloud usage, billing, quota, and audit logs for abnormal access.
5. Remove secret-bearing files from the public branch.
6. Close the GitHub secret scanning alert only after the key is revoked and the current branch is clean.

## What V15 changed

- Removed known sensitive import paths if present: `BUNDLE.md`, `bundle.md`, `SS_data/`, Obsidian Copilot plugin `data.json`, and imported Copilot conversation source folder.
- Added `data/security/secret-scan-report.v15.json`.
- Added `.gitignore` entries for known secret-bearing paths.
- Added `.gitleaks.toml` with Google API key and common API key patterns.
- Added `scripts/security_scan.py`.
- Added `scripts/sanitize_known_secret_paths.py`.

## Important limitation

This package fixes the generated app package. It cannot revoke the leaked Google API key, and it cannot remove the secret from old Git commits already pushed to GitHub. Provider-side revocation/rotation is still required.
