param(
    [string]$Path = ".\\dist",
    [switch]$Strict
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Info($message) {
    Write-Host "[INFO] $message" -ForegroundColor Cyan
}

function Write-Warn($message) {
    Write-Host "[WARN] $message" -ForegroundColor Yellow
}

function Write-Err($message) {
    Write-Host "[ERROR] $message" -ForegroundColor Red
}

if (-not (Test-Path -LiteralPath $Path)) {
    Write-Err "Path not found: $Path"
    exit 1
}

$exeFiles = @()
if ((Get-Item -LiteralPath $Path).PSIsContainer) {
    $exeFiles = Get-ChildItem -LiteralPath $Path -Recurse -Filter *.exe | Sort-Object LastWriteTime -Descending
} else {
    if ($Path -notlike "*.exe") {
        Write-Err "File path must point to an .exe file."
        exit 1
    }
    $exeFiles = @(Get-Item -LiteralPath $Path)
}

if ($exeFiles.Count -eq 0) {
    Write-Err "No .exe files found at: $Path"
    exit 1
}

$invalidCount = 0
foreach ($exe in $exeFiles) {
    $sig = Get-AuthenticodeSignature -FilePath $exe.FullName
    $status = [string]$sig.Status
    $subject = if ($sig.SignerCertificate) { $sig.SignerCertificate.Subject } else { "N/A" }

    Write-Host ""
    Write-Info "File: $($exe.FullName)"
    Write-Info "Status: $status"
    Write-Info "Signer: $subject"

    if ($status -ne "Valid") {
        $invalidCount++
        Write-Warn "Signature is not valid."
    }
}

if ($Strict -and $invalidCount -gt 0) {
    Write-Err "Signature verification failed for $invalidCount file(s)."
    exit 1
}

if ($invalidCount -gt 0) {
    Write-Warn "Verification completed with warnings."
} else {
    Write-Info "All signatures are valid."
}

exit 0
