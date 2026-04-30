# AI Epic One-Click Publish Design

## Goal

Add a Windows-friendly one-click publish tool for `mydata/web/AI史诗纪实`. The tool should run the existing Python data updater, validate the generated data, commit only approved project files, push to GitHub, and rely on GitHub Pages branch deployment to redeploy the static site.

## Approved Choices

- Tool format: PowerShell script.
- Script path: `tools/update_publish.ps1`.
- Commit strategy: whitelist only.
- Branch: current `main` branch.
- Remote: `origin`.
- Deployment trigger: `git push origin main`.
- The assistant will create and verify the script, but will not run the publishing push unless explicitly asked.

## Commit Whitelist

The script may stage only these paths:

- `assets/data.js`
- `README.md`
- `tools/update_data.py`
- `tools/update_publish.ps1`
- files under `docs/archive/`

If any other tracked or untracked path has changes, the script must stop and print those paths. This prevents accidental publication of unrelated work.

## Execution Flow

1. Resolve the repository root from the script location.
2. Confirm the script is running inside a git worktree.
3. Confirm the current branch is `main`.
4. Run `python tools/update_data.py`.
5. Validate `assets/data.js` with Node.js by parsing the `window.AI_EPIC_DATA = ...;` wrapper.
6. Inspect `git status --porcelain`.
7. Stop if any changed path is outside the whitelist.
8. Stage only whitelist paths that exist.
9. Stop without commit or push if staging produces no diff.
10. Commit with a default message: `chore: update AI epic data`.
11. Push with `git push origin main`.
12. Print that GitHub Pages should redeploy from the pushed `main` branch.

## Error Handling

- Any failed command stops the script.
- Missing Python or Node.js causes validation to fail before commit.
- White-list violations stop before staging and print the offending paths.
- If there are no generated changes, the script exits successfully without commit or push.
- The script does not delete, move, or rename any source note files.

## Safety Notes

The script must not use `git add -A`. It must stage exact paths only. It must not call destructive git commands such as `reset --hard`, `checkout --`, or branch deletion.

## Verification

Local verification should include:

- PowerShell parser check using `[scriptblock]::Create(...)`.
- Dry-run mode to execute update and validation while skipping commit and push.
- Confirm dry-run reports either allowed pending changes or no changes.

## Out Of Scope

- Creating GitHub Actions workflows.
- Polling GitHub Pages deployment status.
- Changing repository Pages settings.
- Running the actual push during implementation.
