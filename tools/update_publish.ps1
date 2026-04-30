param(
  [switch]$DryRun,
  [string]$Message = "chore: update AI epic data"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$AllowedExact = @(
  "assets/data.js",
  "README.md",
  "tools/update_data.py",
  "tools/update_publish.ps1"
)
$AllowedPrefixes = @(
  "docs/archive/"
)

function Invoke-Step {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Label,
    [Parameter(Mandatory = $true)]
    [string]$FilePath,
    [string[]]$CommandArguments = @()
  )

  Write-Host ""
  Write-Host "==> $Label"
  & $FilePath @CommandArguments
  if ($LASTEXITCODE -ne 0) {
    throw "Step failed: $Label"
  }
}

function Convert-GitPath {
  param([Parameter(Mandatory = $true)][string]$Path)
  return $Path.Replace("\", "/")
}

function Test-AllowedPath {
  param([Parameter(Mandatory = $true)][string]$Path)

  $normalized = Convert-GitPath -Path $Path
  if ($AllowedExact -contains $normalized) {
    return $true
  }
  foreach ($prefix in $AllowedPrefixes) {
    if ($normalized.StartsWith($prefix, [System.StringComparison]::Ordinal)) {
      return $true
    }
  }
  return $false
}

function Get-ChangedPaths {
  $lines = git -C $RepoRoot status --porcelain
  if ($LASTEXITCODE -ne 0) {
    throw "Unable to read git status."
  }

  $paths = New-Object System.Collections.Generic.List[string]
  foreach ($line in $lines) {
    if ([string]::IsNullOrWhiteSpace($line)) {
      continue
    }

    $rawPath = $line.Substring(3)
    if ($rawPath.Contains(" -> ")) {
      $parts = $rawPath.Split(" -> ", [System.StringSplitOptions]::None)
      $rawPath = $parts[$parts.Length - 1]
    }
    $normalized = Convert-GitPath -Path $rawPath.Trim('"')
    $fullPath = Join-Path $RepoRoot $normalized
    if ($line.StartsWith("?? ") -and (Test-Path -LiteralPath $fullPath -PathType Container)) {
      Get-ChildItem -LiteralPath $fullPath -Recurse -File | ForEach-Object {
        $relative = $_.FullName.Substring($RepoRoot.Path.Length + 1)
        $paths.Add((Convert-GitPath -Path $relative))
      }
      continue
    }
    $paths.Add($normalized)
  }
  return $paths
}

function Assert-CleanWhitelist {
  $changedPaths = Get-ChangedPaths
  $blocked = @($changedPaths | Where-Object { -not (Test-AllowedPath -Path $_) })
  if ($blocked.Count -gt 0) {
    Write-Host ""
    Write-Host "Blocked: non-whitelisted changes are present."
    foreach ($path in $blocked) {
      Write-Host "  $path"
    }
    throw "Refusing to commit because unrelated changes exist."
  }
}

function Stage-AllowedFiles {
  foreach ($path in $AllowedExact) {
    $fullPath = Join-Path $RepoRoot $path
    if (Test-Path -LiteralPath $fullPath) {
      Invoke-Step -Label "Stage $path" -FilePath "git" -CommandArguments @("-C", $RepoRoot.Path, "add", "--", $path)
    }
  }

  $archivePath = Join-Path $RepoRoot "docs/archive"
  if (Test-Path -LiteralPath $archivePath) {
    Invoke-Step -Label "Stage docs/archive" -FilePath "git" -CommandArguments @("-C", $RepoRoot.Path, "add", "--", "docs/archive")
  }
}

function Test-StagedChanges {
  git -C $RepoRoot diff --cached --quiet
  $exitCode = $LASTEXITCODE
  if ($exitCode -eq 0) {
    return $false
  }
  if ($exitCode -eq 1) {
    return $true
  }
  throw "Unable to inspect staged diff."
}

function Assert-RemoteIsIntegrated {
  Invoke-Step -Label "Fetch origin/main" -FilePath "git" -CommandArguments @("-C", $RepoRoot.Path, "fetch", "origin", "main")

  $behind = git -C $RepoRoot rev-list --count "HEAD..origin/main"
  if ($LASTEXITCODE -ne 0) {
    throw "Unable to compare HEAD with origin/main."
  }
  if ([int]$behind -gt 0) {
    throw "origin/main has $behind commit(s) not present locally. Run: git pull --rebase origin main"
  }
}

Push-Location $RepoRoot
try {
  Invoke-Step -Label "Check git worktree" -FilePath "git" -CommandArguments @("rev-parse", "--is-inside-work-tree")

  $branch = git -C $RepoRoot branch --show-current
  if ($LASTEXITCODE -ne 0) {
    throw "Unable to read current git branch."
  }
  if ($branch -ne "main") {
    throw "Refusing to publish from branch '$branch'. Switch to 'main' first."
  }

  Invoke-Step -Label "Update data" -FilePath "python" -CommandArguments @("tools/update_data.py")
  Invoke-Step -Label "Validate generated data" -FilePath "node" -CommandArguments @("-e", "const fs=require('fs'); const prefix='window.AI_EPIC_DATA = '; const text=fs.readFileSync('assets/data.js','utf8'); if(!text.startsWith(prefix)){throw new Error('missing data prefix')} const data=JSON.parse(text.slice(prefix.length).replace(/;\s*$/,'')); if(!Array.isArray(data.articles)||data.articles.length===0){throw new Error('empty articles')} if(!Array.isArray(data.featuredIds)||data.featuredIds.length===0){throw new Error('empty featuredIds')} console.log('data ok', data.articles.length, data.categories.length, data.featuredIds.length);")

  Assert-RemoteIsIntegrated
  Assert-CleanWhitelist

  if ($DryRun) {
    Write-Host ""
    Write-Host "Dry run complete. No commit or push was executed."
    exit 0
  }

  Stage-AllowedFiles
  if (-not (Test-StagedChanges)) {
    Write-Host ""
    Write-Host "No staged changes. Nothing to commit or push."
    exit 0
  }

  Invoke-Step -Label "Commit" -FilePath "git" -CommandArguments @("-C", $RepoRoot.Path, "commit", "-m", $Message)
  Invoke-Step -Label "Push main" -FilePath "git" -CommandArguments @("-C", $RepoRoot.Path, "push", "origin", "main")

  Write-Host ""
  Write-Host "Published. GitHub Pages should redeploy from origin/main if branch deployment is configured."
}
finally {
  Pop-Location
}
