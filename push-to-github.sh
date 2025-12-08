#!/usr/bin/env bash
set -euo pipefail

# Helper to push current branch to the target GitHub repo
# Usage: ./push-to-github.sh [branch]

REPO_URL="https://github.com/global-professional-certifications/GPC-Website.git"
BRANCH="${1:-$(git rev-parse --abbrev-ref HEAD)}"

echo "Repository target: $REPO_URL"
echo "Branch to push: $BRANCH"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not in a git repository. Run this from the project root." >&2
  exit 2
fi

echo
echo "Working tree status (short):"
git status --short || true
echo
read -r -p "Proceed with preparing remote and pushing branch? (y/N) " confirm
if [[ "$confirm" != "y" ]]; then
  echo "Aborted by user."; exit 1
fi

if git remote | grep -q "^origin$"; then
  current_url=$(git remote get-url origin || true)
  if [[ "$current_url" != "$REPO_URL" ]]; then
    echo "Remote 'origin' exists and points to: $current_url"
    read -r -p "Replace origin URL with $REPO_URL ? (y/N) " replace
    if [[ "$replace" == "y" ]]; then
      git remote set-url origin "$REPO_URL"
      echo "origin URL updated."
    else
      echo "Keeping existing origin URL. Pushing to current origin (may fail if you don't have permission)."
    fi
  else
    echo "origin remote already set to target repo.";
  fi
else
  echo "Adding origin -> $REPO_URL"
  git remote add origin "$REPO_URL"
fi

echo "Pushing branch '$BRANCH' to origin..."
git push --set-upstream origin "$BRANCH"

echo "Push complete — if there were authentication issues, check your GitHub credentials (PAT for HTTPS or SSH key)."

echo "You can verify by visiting: https://github.com/global-professional-certifications/GPC-Website"
