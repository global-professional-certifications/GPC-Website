#Requires -Version 5.1
<#
.SYNOPSIS
    git-flow.ps1 - Interactive helper for safely pushing, pulling, and merging
    branches on this repo (local + remote), with safety rails and next-step hints.

.DESCRIPTION
    A single-file, dependency-light assistant for everyday git work on the
    GPC-Website repo. Run it with no arguments to get an interactive menu:

        Status  - what branch you're on, clean/dirty, ahead/behind remote
        Push    - push current work to a chosen branch (safely)
        Pull    - pull a chosen branch into your working tree (merge or rebase)
        Merge   - merge/promote one branch into another, locally OR via a PR
        Sync    - fetch + show the promotion chain at a glance

    Uses only `git` (required) and `gh` (optional, for opening Pull Requests).

.NOTES
    Protected branches (Main, staging) require an extra typed confirmation
    before any direct push/merge. A recovery backup ref is created before every
    merge/rebase so nothing is ever unrecoverable.
#>

[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

# ----------------------------------------------------------------------------
# Configuration - adjust here if your branch model changes
# ----------------------------------------------------------------------------
$Script:Remote = 'origin'
$Script:DefaultBranch = 'Main'
$Script:ProtectedBranches = @('Main', 'staging')

# Promotion chain: "from -> to". Used only for next-action suggestions.
$Script:PromotionChain = [ordered]@{
    'development' = 'staging'
    'staging'     = 'Main'
}
# Any branch not listed above and not protected is assumed to flow into:
$Script:DefaultPromotionTarget = 'development'

# ----------------------------------------------------------------------------
# Low-level git helpers
# ----------------------------------------------------------------------------

# Run a git command quietly and return its trimmed stdout (errors swallowed).
function Git-Query {
    param([Parameter(Mandatory)][string[]]$GitArgs)
    $out = & git @GitArgs 2>$null
    return ($out | Out-String).Trim()
}

# Run a git command interactively (output streams to console). Returns $true on success.
function Git-Run {
    param([Parameter(Mandatory)][string[]]$GitArgs)
    Write-Host "  > git $($GitArgs -join ' ')" -ForegroundColor DarkGray
    & git @GitArgs
    return ($LASTEXITCODE -eq 0)
}

function Test-InRepo {
    & git rev-parse --is-inside-work-tree *> $null
    return ($LASTEXITCODE -eq 0)
}

function Test-CommandExists {
    param([string]$Name)
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Get-CurrentBranch { return (Git-Query @('rev-parse', '--abbrev-ref', 'HEAD')) }

function Test-Dirty {
    return -not [string]::IsNullOrWhiteSpace((Git-Query @('status', '--porcelain')))
}

function Get-LocalBranches {
    return (Git-Query @('for-each-ref', '--format=%(refname:short)', 'refs/heads')) -split "`n" |
    ForEach-Object { $_.Trim() } | Where-Object { $_ }
}

function Get-RemoteBranches {
    return (Git-Query @('for-each-ref', '--format=%(refname:short)', "refs/remotes/$Script:Remote")) -split "`n" |
    ForEach-Object { $_.Trim() } |
    Where-Object { $_ -and $_ -ne "$Script:Remote/HEAD" } |
    ForEach-Object { $_ -replace "^$Script:Remote/", '' } |
    Select-Object -Unique
}

function Get-AllBranches {
    return (@(Get-LocalBranches) + @(Get-RemoteBranches)) | Select-Object -Unique | Sort-Object
}

function Test-RefExists {
    param([string]$Ref)
    & git rev-parse --verify --quiet $Ref *> $null
    return ($LASTEXITCODE -eq 0)
}

# Returns object with .Ahead / .Behind for $Local relative to $Compare, or $null.
function Get-AheadBehind {
    param([string]$Local, [string]$Compare)
    if (-not (Test-RefExists $Local) -or -not (Test-RefExists $Compare)) { return $null }
    $res = Git-Query @('rev-list', '--left-right', '--count', "$Compare...$Local")
    if (-not $res) { return $null }
    $parts = $res -split '\s+'
    if ($parts.Count -lt 2) { return $null }
    return [pscustomobject]@{ Behind = [int]$parts[0]; Ahead = [int]$parts[1] }
}

function Test-Protected {
    param([string]$Branch)
    return ($Script:ProtectedBranches -contains $Branch)
}

# ----------------------------------------------------------------------------
# UI helpers
# ----------------------------------------------------------------------------

function Write-Title {
    param([string]$Text)
    Write-Host ""
    Write-Host "=== $Text ===" -ForegroundColor Cyan
}

function Write-Info { param([string]$m) Write-Host "  $m" -ForegroundColor Yellow }
function Write-Good { param([string]$m) Write-Host "  $m" -ForegroundColor Green }
function Write-Warn { param([string]$m) Write-Host "  ! $m" -ForegroundColor Yellow }
function Write-Bad { param([string]$m) Write-Host "  x $m" -ForegroundColor Red }
function Write-Hint { param([string]$m) Write-Host "  -> $m" -ForegroundColor Magenta }

function Confirm-Action {
    param([string]$Message, [switch]$Strong)
    if ($Strong) {
        Write-Host "  ! $Message" -ForegroundColor Yellow
        $ans = Read-Host "  Type 'yes' to confirm"
        return ($ans -eq 'yes')
    }
    $ans = Read-Host "  $Message (y/N)"
    return ($ans -match '^(y|yes)$')
}

# Show a numbered list of branches and return the chosen one (or $null if cancelled).
function Select-Branch {
    param([string]$Prompt, [string[]]$Branches, [string]$Default)
    Write-Host ""
    Write-Host "  $Prompt" -ForegroundColor Cyan
    for ($i = 0; $i -lt $Branches.Count; $i++) {
        $marker = ''
        if ($Branches[$i] -eq $Default) { $marker = '  (default - press Enter)' }
        if (Test-Protected $Branches[$i]) { $marker += '  [protected]' }
        Write-Host ("    [{0}] {1}{2}" -f ($i + 1), $Branches[$i], $marker)
    }
    Write-Host "    [0] Cancel"
    while ($true) {
        $sel = Read-Host "  Choose"
        if ([string]::IsNullOrWhiteSpace($sel) -and $Default) { return $Default }
        if ($sel -eq '0') { return $null }
        $n = 0
        if ([int]::TryParse($sel, [ref]$n) -and $n -ge 1 -and $n -le $Branches.Count) {
            return $Branches[$n - 1]
        }
        Write-Warn "Invalid choice, try again."
    }
}

# ----------------------------------------------------------------------------
# Safety helpers
# ----------------------------------------------------------------------------

function Sync-Fetch {
    Write-Info "Fetching latest from '$Script:Remote'..."
    & git fetch --prune $Script:Remote *> $null
    if ($LASTEXITCODE -ne 0) { Write-Warn "Fetch failed (offline or auth issue?). Continuing with local data." }
}

# Create a recoverable backup ref pointing at a branch's current tip.
function New-BackupRef {
    param([string]$Branch)
    $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    $name = "backup/$Branch-$stamp"
    & git branch -f $name $Branch *> $null
    if ($LASTEXITCODE -eq 0) {
        Write-Good "Safety backup created: $name  (restore with: git reset --hard $name)"
    }
    return $name
}

# All backup/* branches this tool has created.
function Get-BackupRefs {
    return (Git-Query @('for-each-ref', '--format=%(refname:short)', 'refs/heads/backup')) -split "`n" |
    ForEach-Object { $_.Trim() } | Where-Object { $_ } | Sort-Object
}

# Stash everything (including untracked). Returns $true on success.
function Invoke-AutoStash {
    return (Git-Run @('stash', 'push', '-u', '-m', 'git-flow-autostash'))
}

# If the tree is dirty, offer to commit. Returns $true if it's safe to proceed.
function Resolve-DirtyForPush {
    if (-not (Test-Dirty)) { return $true }
    Write-Warn "You have uncommitted changes:"
    & git status --short
    Write-Host ""
    Write-Host "    [1] Commit them now (recommended before pushing)"
    Write-Host "    [2] Cancel"
    $c = Read-Host "  Choose"
    if ($c -ne '1') { Write-Info "Cancelled."; return $false }
    if (-not (Git-Run @('add', '-A'))) { Write-Bad "git add failed."; return $false }
    $msg = Read-Host "  Commit message"
    if ([string]::IsNullOrWhiteSpace($msg)) { Write-Bad "Empty message, aborting."; return $false }
    if (-not (Git-Run @('commit', '-m', $msg))) { Write-Bad "Commit failed."; return $false }
    Write-Good "Changes committed."
    return $true
}

# ----------------------------------------------------------------------------
# Actions
# ----------------------------------------------------------------------------

function Show-Status {
    Write-Title "Repository status"
    $branch = Get-CurrentBranch
    Write-Info "Current branch : $branch"
    Write-Info "Remote         : $Script:Remote ($(Git-Query @('remote','get-url',$Script:Remote)))"

    if (Test-Dirty) {
        Write-Warn "Working tree has uncommitted changes:"
        & git status --short
    }
    else {
        Write-Good "Working tree is clean."
    }

    $upstream = "$Script:Remote/$branch"
    $ab = Get-AheadBehind -Local $branch -Compare $upstream
    if ($ab) {
        Write-Info "vs $upstream : $($ab.Ahead) ahead, $($ab.Behind) behind"
    }
    else {
        Write-Info "vs $upstream : no upstream tracking yet"
    }
    Suggest-NextAction
}

function Invoke-Push {
    Write-Title "Push"
    Sync-Fetch
    if (-not (Resolve-DirtyForPush)) { return }

    $current = Get-CurrentBranch
    $target = Select-Branch -Prompt "Push your '$current' work TO which remote branch?" `
        -Branches (Get-AllBranches) -Default $current
    if (-not $target) { Write-Info "Cancelled."; return }

    if ((Test-Protected $target) -or ($target -eq $Script:DefaultBranch)) {
        if (-not (Confirm-Action -Strong "'$target' is a protected branch. Pushing directly can affect production/shared environments.")) {
            Write-Info "Cancelled."; return
        }
    }

    $ok = Git-Run @('push', '--set-upstream', $Script:Remote, "$($current):$target")
    if ($ok) { Write-Good "Pushed '$current' -> $Script:Remote/$target" }
    else { Write-Bad  "Push failed. Check auth (PAT/SSH) or whether the remote moved ahead (try Pull first)." }
    Suggest-NextAction
}

function Invoke-Pull {
    Write-Title "Pull"
    Sync-Fetch
    $current = Get-CurrentBranch

    $source = Select-Branch -Prompt "Pull which branch INTO your current '$current'?" `
        -Branches (Get-RemoteBranches) -Default $current
    if (-not $source) { Write-Info "Cancelled."; return }

    $stashed = $false
    if (Test-Dirty) {
        Write-Warn "Working tree is dirty."
        if (Confirm-Action "Stash changes, pull, then restore them?") {
            if (Git-Run @('stash', 'push', '-u', '-m', 'git-flow-autostash')) { $stashed = $true }
            else { Write-Bad "Stash failed, aborting."; return }
        }
        else { Write-Info "Cancelled."; return }
    }

    Write-Host ""
    Write-Host "    [1] Merge  (keeps a merge commit; safer for shared history)"
    Write-Host "    [2] Rebase (linear history; rewrites your local commits)"
    $mode = Read-Host "  Choose"
    $pullArgs = @('pull', '--no-rebase', $Script:Remote, $source)
    if ($mode -eq '2') { $pullArgs = @('pull', '--rebase', $Script:Remote, $source) }

    $ok = Git-Run $pullArgs
    if (-not $ok) {
        Write-Bad "Pull hit conflicts or failed. Resolve conflicts, then 'git add' + finish, or run 'git merge --abort' / 'git rebase --abort'."
    }
    else {
        Write-Good "Pulled $Script:Remote/$source into $current."
    }

    if ($stashed) {
        Write-Info "Restoring your stashed changes..."
        if (-not (Git-Run @('stash', 'pop'))) {
            Write-Warn "Stash pop hit a conflict - your changes are safe in 'git stash list'."
        }
    }
    Suggest-NextAction
}

function Invoke-Merge {
    Write-Title "Merge / Promote"
    Sync-Fetch
    $all = Get-AllBranches

    $from = Select-Branch -Prompt "Merge FROM which branch?" -Branches $all -Default (Get-CurrentBranch)
    if (-not $from) { Write-Info "Cancelled."; return }
    $into = Select-Branch -Prompt "Merge INTO which branch?" -Branches $all -Default $Script:DefaultPromotionTarget
    if (-not $into) { Write-Info "Cancelled."; return }
    if ($from -eq $into) { Write-Bad "'from' and 'into' are the same branch."; return }

    # Preview using remote-tracking refs where available so the picture is current.
    $fromRef = if (Test-RefExists "$Script:Remote/$from") { "$Script:Remote/$from" } else { $from }
    $intoRef = if (Test-RefExists "$Script:Remote/$into") { "$Script:Remote/$into" } else { $into }

    Write-Host ""
    Write-Info "Commits in '$from' not yet in '$into':"
    $log = Git-Query @('log', '--oneline', "$intoRef..$fromRef")
    if ([string]::IsNullOrWhiteSpace($log)) {
        Write-Good "Nothing to merge - '$into' already contains '$from'."
        return
    }
    Write-Host $log
    Write-Host ""
    Write-Info "Files that would change:"
    & git diff --stat "$intoRef...$fromRef"

    Write-Host ""
    Write-Host "  How do you want to apply this?"
    Write-Host "    [1] Local merge + push   (fast, no review)"
    Write-Host "    [2] Open a Pull Request  (review/CI before merge - recommended for shared branches)"
    Write-Host "    [0] Cancel"
    $how = Read-Host "  Choose"

    switch ($how) {
        '1' { Invoke-LocalMerge -From $from -Into $into }
        '2' { Invoke-PullRequest -From $from -Into $into }
        default { Write-Info "Cancelled." }
    }
    Suggest-NextAction
}

function Invoke-LocalMerge {
    param([string]$From, [string]$Into)

    if (Test-Dirty) { Write-Bad "Commit or stash your changes before a local merge."; return }

    if (Test-Protected $Into) {
        if (-not (Confirm-Action -Strong "'$Into' is protected. A direct local merge skips review/CI.")) {
            Write-Info "Cancelled."; return
        }
    }

    $startBranch = Get-CurrentBranch
    try {
        if (-not (Git-Run @('checkout', $Into))) { Write-Bad "Could not checkout '$Into'."; return }
        # Make sure we're merging onto the latest remote tip of $Into.
        Git-Run @('pull', '--ff-only', $Script:Remote, $Into) | Out-Null
        $backup = New-BackupRef -Branch $Into

        Write-Info "Merging '$From' into '$Into'..."
        if (Git-Run @('merge', '--no-ff', $From)) {
            Write-Good "Merged locally."
            $pushed = $false
            if (Confirm-Action "Push '$Into' to $Script:Remote now?") {
                if (Git-Run @('push', $Script:Remote, $Into)) { Write-Good "Pushed $Script:Remote/$Into."; $pushed = $true }
                else { Write-Bad "Push failed." }
            }
            Resolve-PostMerge -Into $Into -Backup $backup -Pushed:$pushed
        }
        else {
            Write-Bad "Merge conflicts detected - aborting cleanly (nothing committed)."
            Git-Run @('merge', '--abort') | Out-Null
            Write-Hint "To resolve manually: checkout '$Into', run 'git merge $From', fix conflicts, commit."
            Write-Info "Removing unused backup '$backup'."
            Git-Run @('branch', '-D', $backup) | Out-Null
        }
    }
    finally {
        if ((Get-CurrentBranch) -ne $startBranch) {
            Git-Run @('checkout', $startBranch) | Out-Null
            Write-Info "Returned to '$startBranch'."
        }
    }
}

function Invoke-PullRequest {
    param([string]$From, [string]$Into)

    # Ensure the source branch is on the remote first.
    Write-Info "Ensuring '$From' is pushed to $Script:Remote..."
    Git-Run @('push', '--set-upstream', $Script:Remote, "$($From):$From") | Out-Null

    if (Test-CommandExists 'gh') {
        $title = Read-Host "  PR title"
        if ([string]::IsNullOrWhiteSpace($title)) { $title = "Merge $From into $Into" }
        Write-Info "Opening Pull Request via gh..."
        & gh pr create --base $Into --head $From --title $title --fill
        if ($LASTEXITCODE -eq 0) { Write-Good "Pull Request created." }
        else { Write-Bad "gh failed - open it manually (URL below)." }
    }
    else {
        Write-Warn "'gh' CLI not found. Open the PR in your browser:"
        $repoPath = (Git-Query @('remote', 'get-url', $Script:Remote)) -replace '\.git$', '' -replace '^https://github.com/', ''
        Write-Hint "https://github.com/$repoPath/compare/$Into...$From?expand=1"
    }
}

# After a successful local merge: keep, delete, or undo (using the backup we made).
function Resolve-PostMerge {
    param([string]$Into, [string]$Backup, [bool]$Pushed)
    Write-Host ""
    Write-Host "  Post-merge - pre-merge backup of '$Into' is: $Backup" -ForegroundColor Cyan
    Write-Host "    [1] Keep the backup branch (default - safest)"
    Write-Host "    [2] Delete the backup branch (merge looks good)"
    Write-Host "    [3] Undo the merge - hard reset '$Into' back to the backup"
    $pm = Read-Host "  Choose"
    switch ($pm) {
        '2' {
            if (Git-Run @('branch', '-D', $Backup)) { Write-Good "Backup '$Backup' deleted." }
            else { Write-Bad "Could not delete backup." }
        }
        '3' {
            if (-not (Confirm-Action -Strong "Undo merge: hard reset '$Into' to '$Backup'? This drops the merge commit.")) {
                Write-Info "Kept the merge. Backup retained: $Backup"; return
            }
            if (Git-Run @('reset', '--hard', $Backup)) {
                Write-Good "Merge undone - '$Into' restored to its pre-merge state."
                if ($Pushed) {
                    Write-Warn "You already pushed the merge, so the remote still has it."
                    if (Confirm-Action "Overwrite the remote to match (git push --force-with-lease)?") {
                        if (Git-Run @('push', '--force-with-lease', $Script:Remote, $Into)) { Write-Good "Remote '$Into' rolled back." }
                        else { Write-Bad "Force-push failed (someone else may have pushed). Resolve manually." }
                    }
                }
                Write-Info "Backup '$Backup' kept in case you need it again."
            }
            else { Write-Bad "Undo failed - backup is still at: $Backup" }
        }
        default { Write-Info "Backup kept: $Backup" }
    }
}

function Invoke-Switch {
    Write-Title "Switch branch (checkout)"
    Sync-Fetch
    $current = Get-CurrentBranch
    $branch = Select-Branch -Prompt "Checkout which branch?" -Branches (Get-AllBranches) -Default $current
    if (-not $branch) { Write-Info "Cancelled."; return }
    if ($branch -eq $current) { Write-Info "Already on '$branch'."; Suggest-NextAction; return }

    $stashed = $false
    if (Test-Dirty) {
        Write-Warn "Working tree is dirty."
        Write-Host "    [1] Stash my changes, then switch (restore later with: git stash pop)"
        Write-Host "    [2] Carry changes over to '$branch' (git refuses if they'd conflict)"
        Write-Host "    [3] Cancel"
        $c = Read-Host "  Choose"
        switch ($c) {
            '1' { if (Invoke-AutoStash) { $stashed = $true } else { Write-Bad "Stash failed."; return } }
            '2' { }
            default { Write-Info "Cancelled."; return }
        }
    }

    if ((Get-LocalBranches) -contains $branch) {
        Git-Run @('checkout', $branch) | Out-Null
    }
    else {
        # Remote-only branch: create a local tracking branch for it.
        Write-Info "'$branch' is remote-only - creating a local tracking branch."
        Git-Run @('checkout', '-b', $branch, '--track', "$Script:Remote/$branch") | Out-Null
    }

    if ((Get-CurrentBranch) -eq $branch) {
        Write-Good "Now on '$branch'."
        if ($stashed) { Write-Hint "Your earlier changes are stashed - run 'git stash pop' to bring them onto this branch." }
    }
    else {
        Write-Bad "Checkout failed (likely uncommitted changes would be overwritten)."
        if ($stashed) { Write-Hint "Your changes are safe in the stash - 'git stash pop' to restore." }
    }
    Suggest-NextAction
}

function Invoke-Rollback {
    Write-Title "Rollback / Recover"
    $branch = Get-CurrentBranch
    Write-Info "Current branch: $branch"
    Write-Host ""
    Write-Host "    [1] Reset this branch to a backup        (undo a merge/bad state)"
    Write-Host "    [2] Undo a recent commit/merge via reflog (pick from history)"
    Write-Host "    [3] Discard ALL uncommitted changes       (back to last commit)"
    Write-Host "    [4] Manage backups                        (list / delete backup/*)"
    Write-Host "    [0] Cancel"
    $c = Read-Host "  Choose"
    switch ($c) {
        '1' { Invoke-ResetToBackup -Branch $branch }
        '2' { Invoke-ReflogUndo -Branch $branch }
        '3' { Invoke-DiscardChanges }
        '4' { Invoke-ManageBackups }
        default { Write-Info "Cancelled." }
    }
    Suggest-NextAction
}

function Invoke-ResetToBackup {
    param([string]$Branch)
    $backups = Get-BackupRefs
    if (-not $backups) { Write-Warn "No backup branches found (backup/* are made before each merge)."; return }
    $sel = Select-Branch -Prompt "Reset '$Branch' to which backup?" -Branches $backups
    if (-not $sel) { Write-Info "Cancelled."; return }

    Write-Info "Commits currently on '$Branch' that would be DROPPED:"
    $log = Git-Query @('log', '--oneline', "$sel..$Branch")
    if ([string]::IsNullOrWhiteSpace($log)) { Write-Info "(none - '$Branch' is already at or behind that backup)" }
    else { Write-Host $log }

    if (-not (Confirm-Action -Strong "Hard reset '$Branch' to '$sel'? This rewrites local history.")) { Write-Info "Cancelled."; return }
    # Snapshot the current state first so even the rollback is reversible.
    New-BackupRef -Branch $Branch | Out-Null
    if (Git-Run @('reset', '--hard', $sel)) {
        Write-Good "'$Branch' reset to '$sel'."
        Write-Warn "If '$Branch' was already pushed, the remote is now ahead. Overwrite it with: git push --force-with-lease"
    }
    else { Write-Bad "Reset failed." }
}

function Invoke-ReflogUndo {
    param([string]$Branch)
    Write-Info "Recent HEAD history (most recent first):"
    $entries = (Git-Query @('reflog', '-n', '15', '--format=%h  %gd  %gs')) -split "`n" | Where-Object { $_ }
    if (-not $entries) { Write-Warn "No reflog entries."; return }
    for ($i = 0; $i -lt $entries.Count; $i++) { Write-Host ("    [{0}] {1}" -f ($i + 1), $entries[$i]) }
    Write-Host "    [0] Cancel"
    $sel = Read-Host "  Reset '$Branch' to which entry?"
    $n = 0
    if (-not ([int]::TryParse($sel, [ref]$n)) -or $n -lt 1 -or $n -gt $entries.Count) { Write-Info "Cancelled."; return }
    $target = ($entries[$n - 1].Trim() -split '\s+')[0]
    if (-not (Confirm-Action -Strong "Hard reset '$Branch' to $target?")) { Write-Info "Cancelled."; return }
    New-BackupRef -Branch $Branch | Out-Null
    if (Git-Run @('reset', '--hard', $target)) { Write-Good "'$Branch' reset to $target." }
    else { Write-Bad "Reset failed." }
}

function Invoke-DiscardChanges {
    if (-not (Test-Dirty)) { Write-Good "Nothing to discard - working tree is already clean."; return }
    Write-Warn "This will PERMANENTLY discard all uncommitted changes below:"
    & git status --short
    if (-not (Confirm-Action -Strong "Discard everything above and reset to the last commit?")) { Write-Info "Cancelled."; return }
    Git-Run @('reset', '--hard', 'HEAD') | Out-Null
    # Remove untracked files/dirs too (ignored files like node_modules are preserved).
    Git-Run @('clean', '-fd') | Out-Null
    Write-Good "Working tree reset to the last commit."
}

function Invoke-ManageBackups {
    $backups = Get-BackupRefs
    if (-not $backups) { Write-Info "No backup branches to manage."; return }
    Write-Info "Backup branches:"
    for ($i = 0; $i -lt $backups.Count; $i++) { Write-Host ("    [{0}] {1}" -f ($i + 1), $backups[$i]) }
    Write-Host "    [A] Delete ALL backups"
    Write-Host "    [0] Cancel"
    $sel = Read-Host "  Delete which?"
    if ([string]::IsNullOrWhiteSpace($sel) -or $sel -eq '0') { Write-Info "Cancelled."; return }
    if ($sel.ToUpper() -eq 'A') {
        if (Confirm-Action -Strong "Delete all $($backups.Count) backup branches?") {
            foreach ($b in $backups) { Git-Run @('branch', '-D', $b) | Out-Null }
            Write-Good "All backups deleted."
        }
        return
    }
    $n = 0
    if ([int]::TryParse($sel, [ref]$n) -and $n -ge 1 -and $n -le $backups.Count) {
        if (Git-Run @('branch', '-D', $backups[$n - 1])) { Write-Good "Deleted $($backups[$n - 1])." }
        else { Write-Bad "Delete failed." }
    }
    else { Write-Warn "Invalid choice." }
}

function Show-Sync {
    Write-Title "Promotion chain"
    Sync-Fetch
    foreach ($from in $Script:PromotionChain.Keys) {
        $to = $Script:PromotionChain[$from]
        $fromRef = "$Script:Remote/$from"
        $toRef = "$Script:Remote/$to"
        if ((Test-RefExists $fromRef) -and (Test-RefExists $toRef)) {
            $cnt = (Git-Query @('rev-list', '--count', "$toRef..$fromRef"))
            if ([int]$cnt -gt 0) { Write-Warn "$from -> $to : $cnt commit(s) waiting to promote" }
            else { Write-Good "$from -> $to : up to date" }
        }
    }
    Suggest-NextAction
}

# ----------------------------------------------------------------------------
# "Senior engineer" next-action suggestions
# ----------------------------------------------------------------------------

function Suggest-NextAction {
    Write-Host ""
    Write-Host "  Suggested next step:" -ForegroundColor Magenta
    $branch = Get-CurrentBranch

    if (Test-Dirty) {
        Write-Hint "You have uncommitted changes - use Push (it'll offer to commit) to save your work."
        return
    }

    $upstream = "$Script:Remote/$branch"
    $ab = Get-AheadBehind -Local $branch -Compare $upstream
    if (-not (Test-RefExists $upstream)) {
        Write-Hint "'$branch' has no remote yet - use Push to create it and set tracking."
        return
    }
    if ($ab -and $ab.Behind -gt 0) {
        Write-Hint "'$branch' is $($ab.Behind) behind $upstream - Pull before doing more work."
        return
    }
    if ($ab -and $ab.Ahead -gt 0) {
        Write-Hint "'$branch' is $($ab.Ahead) ahead of $upstream - Push to back it up."
        return
    }

    # Branch is in sync with its own remote: suggest a promotion if one is pending.
    $target = $Script:PromotionChain[$branch]
    if (-not $target -and -not (Test-Protected $branch)) { $target = $Script:DefaultPromotionTarget }
    if ($target -and $target -ne $branch) {
        $targetRef = "$Script:Remote/$target"
        if (Test-RefExists $targetRef) {
            $cnt = Git-Query @('rev-list', '--count', "$targetRef..$Script:Remote/$branch")
            if ([int]$cnt -gt 0) {
                Write-Hint "'$branch' has $cnt commit(s) not in '$target' - consider Merge to promote $branch -> $target."
                return
            }
        }
    }
    Write-Hint "Everything is in sync. Nothing to do."
}

# ----------------------------------------------------------------------------
# Main menu
# ----------------------------------------------------------------------------

function Show-Menu {
    Write-Host ""
    Write-Host "|               git-flow                |" -ForegroundColor Blue
    Write-Host "-----------------------------------------" -ForegroundColor Blue
    $branch = Get-CurrentBranch
    $dirty = if (Test-Dirty) { 'dirty' } else { 'clean' }
    Write-Host "  On branch: $branch  ($dirty)" -ForegroundColor White
    Write-Host ""
    Write-Host "    [1] Status   - show state + next-step hint"
    Write-Host "    [2] Switch   - checkout another branch"
    Write-Host "    [3] Push     - push current work to a branch"
    Write-Host "    [4] Pull     - pull a branch into your tree"
    Write-Host "    [5] Merge    - merge/promote a branch (local or PR)"
    Write-Host "    [6] Rollback - reset / recover / manage backups"
    Write-Host "    [7] Sync     - fetch + show promotion chain"
    Write-Host "    [Q] Quit"
}

function Main {
    if (-not (Test-CommandExists 'git')) {
        Write-Host "git is not installed or not on PATH." -ForegroundColor Red
        return
    }
    if (-not (Test-InRepo)) {
        Write-Host "Not inside a git repository. Run this from the project root." -ForegroundColor Red
        return
    }

    while ($true) {
        Show-Menu
        $choice = Read-Host "  Select"
        switch ($choice.ToUpper()) {
            '1' { Show-Status }
            '2' { Invoke-Switch }
            '3' { Invoke-Push }
            '4' { Invoke-Pull }
            '5' { Invoke-Merge }
            '6' { Invoke-Rollback }
            '7' { Show-Sync }
            'Q' { Write-Host "  Bye." -ForegroundColor Cyan; return }
            default { Write-Warn "Unknown option." }
        }
    }
}

Main
