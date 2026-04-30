# AI Epic One-Click Publish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a PowerShell one-click script that updates site data, validates it, commits whitelisted files, and pushes `main`.

**Architecture:** Keep the existing Python generator as the data source of truth. Add a PowerShell orchestration script that shells out to Python, Node.js, and Git with strict path whitelisting before commit/push.

**Tech Stack:** PowerShell, Python standard library, Node.js for JSON validation, Git.

---

## Task 1: Publish Script

**Files:**
- Create: `tools/update_publish.ps1`

- [ ] Create a PowerShell script with `Set-StrictMode -Version Latest` and `$ErrorActionPreference = 'Stop'`.
- [ ] Resolve `$RepoRoot` from `$PSScriptRoot`.
- [ ] Add helper `Invoke-Step` to run commands and stop on non-zero exit.
- [ ] Add whitelist logic for exact paths and `docs/archive/`.
- [ ] Run `python tools/update_data.py`.
- [ ] Validate `assets/data.js` with `node -e`.
- [ ] Stop on non-whitelisted changed paths.
- [ ] Stage exact whitelist paths only.
- [ ] Commit only if staged diff exists.
- [ ] Push only when not in dry-run mode.

## Task 2: README

**Files:**
- Modify: `README.md`

- [ ] Add a section documenting:
  - Dry run: `powershell -ExecutionPolicy Bypass -File tools/update_publish.ps1 -DryRun`
  - Real publish: `powershell -ExecutionPolicy Bypass -File tools/update_publish.ps1`
  - The script commits only whitelisted files.
  - Pushing `main` triggers GitHub Pages redeploy when Pages is configured for branch deploy.

## Task 3: Verification

**Files:**
- Read: `tools/update_publish.ps1`
- Read: `assets/data.js`

- [ ] Parser check:

```powershell
$script = Get-Content -Raw -LiteralPath tools/update_publish.ps1
[scriptblock]::Create($script) | Out-Null
```

- [ ] Dry-run check:

```powershell
powershell -ExecutionPolicy Bypass -File tools/update_publish.ps1 -DryRun
```

- [ ] Data validation:

```powershell
node -e "const fs=require('fs'); const prefix='window.AI_EPIC_DATA = '; const text=fs.readFileSync('assets/data.js','utf8'); if(!text.startsWith(prefix)) process.exit(1); const data=JSON.parse(text.slice(prefix.length).replace(/;\s*$/,'')); if(!data.articles.length) process.exit(1); console.log(data.articles.length, data.categories.length, data.featuredIds.length);"
```

## Self-Review

- The script uses a whitelist and never runs `git add -A`.
- The script has dry-run mode so implementation can be verified without push.
- The script does not delete, move, or rename source notes.
- The script relies on the existing GitHub Pages branch deployment model instead of adding workflows.
