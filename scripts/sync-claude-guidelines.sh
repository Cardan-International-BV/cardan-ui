#!/usr/bin/env bash
# Copies the shared Claude files (.claude/rules/cardan-guidelines.md, the
# cardan-reviewer agent, the review hook and .claude/settings.json) to the
# Cardan Nuxt projects checked out next to this repository. With --check it
# only reports the copies that differ, and exits with 1 when one does. The
# list of files lives in .claude/hooks/cardan-review.mjs.
#
#   scripts/sync-claude-guidelines.sh           update the copies
#   scripts/sync-claude-guidelines.sh --check   report differences only

set -euo pipefail

cd "$(dirname "$0")/.."
exec node .claude/hooks/cardan-review.mjs sync "$@"
