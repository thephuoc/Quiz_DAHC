Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Info($message) { Write-Host "[INFO] $message" -ForegroundColor Cyan }
function Write-Warn($message) { Write-Host "[WARN] $message" -ForegroundColor Yellow }
function Write-Err($message) { Write-Host "[ERROR] $message" -ForegroundColor Red }

function Require-Command($name) {
    if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
        throw "Missing required command: $name"
    }
}

Write-Info "Running Electron build preflight..."

if ($env:OS -ne "Windows_NT") {
    throw "Build host must be Windows."
}

$osVersion = [Environment]::OSVersion.Version
$major = $osVersion.Major
$build = $osVersion.Build

if ($major -lt 10) {
    throw "Unsupported Windows version. Require Windows 10/11."
}

Write-Info "Windows version detected: $major.$($osVersion.Minor).$build"
if ($major -eq 10 -and $build -lt 10240) {
    throw "Windows build is too old."
}

Require-Command "node"
Require-Command "npm"

$nodeVersionText = (& node -v).Trim()
if ($nodeVersionText.StartsWith("v")) {
    $nodeVersionText = $nodeVersionText.Substring(1)
}
$nodeVersion = [Version]$nodeVersionText
if ($nodeVersion.Major -lt 18) {
    throw "Node.js >= 18 is required. Current: $nodeVersion"
}
Write-Info "Node version: $nodeVersion"

$requiredFiles = @(
    "main.js",
    "preload.js",
    "app/index.html",
    "app/history.html",
    "app/js/app.js",
    "app/js/admin.js",
    "app/js/electron-bridge.js"
)

foreach ($file in $requiredFiles) {
    if (-not (Test-Path -LiteralPath $file)) {
        throw "Missing required file: $file"
    }
}

$runningProcesses = Get-Process | Where-Object {
    $_.ProcessName -match "quiz|electron|thi"
}
if ($runningProcesses) {
    Write-Warn "Potential running app/build processes detected:"
    $runningProcesses | Select-Object ProcessName, Id | Format-Table -AutoSize | Out-Host
    Write-Warn "Please close running app instances before release build."
}

$drive = Get-PSDrive -Name ([IO.Path]::GetPathRoot((Get-Location).Path).TrimEnd('\').TrimEnd(':'))
$freeGB = [math]::Round($drive.Free / 1GB, 2)
if ($freeGB -lt 2) {
    throw "Insufficient disk space. Need >= 2 GB free, current: $freeGB GB."
}
Write-Info "Disk free space: $freeGB GB"

Write-Info "Preflight checks passed."
exit 0
