param(
    [switch]$AllowMissingCert
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Resolve-SigningCertPath {
    if ($env:CSC_LINK) {
        return $env:CSC_LINK
    }
    if ($env:SIGN_CERT_PATH) {
        return $env:SIGN_CERT_PATH
    }
    return $null
}

function Write-Info($message) {
    Write-Host "[INFO] $message" -ForegroundColor Cyan
}

function Write-Warn($message) {
    Write-Host "[WARN] $message" -ForegroundColor Yellow
}

function Write-Err($message) {
    Write-Host "[ERROR] $message" -ForegroundColor Red
}

function Test-LocalPfx {
    param(
        [Parameter(Mandatory = $true)][string]$PathValue,
        [Parameter(Mandatory = $true)][string]$Password
    )

    if (-not (Test-Path -LiteralPath $PathValue)) {
        throw "Certificate file not found: $PathValue"
    }

    $cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2
    $cert.Import($PathValue, $Password, "Exportable,PersistKeySet")
    return $cert
}

Write-Info "Checking code signing prerequisites..."

$certPath = Resolve-SigningCertPath
$certPassword = $env:CSC_KEY_PASSWORD

if (-not $certPath) {
    if ($AllowMissingCert) {
        Write-Warn "No certificate path in CSC_LINK or SIGN_CERT_PATH (allowed)."
        exit 0
    }
    Write-Err "Missing CSC_LINK/SIGN_CERT_PATH."
    exit 1
}

if (-not $certPassword) {
    if ($AllowMissingCert) {
        Write-Warn "Missing CSC_KEY_PASSWORD (allowed)."
        exit 0
    }
    Write-Err "Missing CSC_KEY_PASSWORD."
    exit 1
}

if ($certPath -match "^https?://") {
    Write-Info "CSC_LINK points to URL; local preflight cannot validate PFX content."
    Write-Info "URL: $certPath"
    Write-Info "Timestamp server: $($env:WIN_CSC_TIMESTAMP_URL)"
    exit 0
}

$localPath = $certPath
if ($certPath -like "file://*") {
    $localPath = $certPath.Substring(7)
}

try {
    $certificate = Test-LocalPfx -PathValue $localPath -Password $certPassword
    Write-Info "Certificate subject: $($certificate.Subject)"
    Write-Info "Thumbprint: $($certificate.Thumbprint)"
    Write-Info "Valid from: $($certificate.NotBefore.ToString("u"))"
    Write-Info "Valid to  : $($certificate.NotAfter.ToString("u"))"

    $remainingDays = [math]::Floor(($certificate.NotAfter - (Get-Date)).TotalDays)
    if ($remainingDays -lt 0) {
        Write-Err "Certificate has expired."
        exit 1
    }

    if ($remainingDays -lt 30) {
        Write-Warn "Certificate expires in $remainingDays days."
    } else {
        Write-Info "Certificate validity remaining: $remainingDays days."
    }

    if (-not $env:WIN_CSC_TIMESTAMP_URL) {
        Write-Warn "WIN_CSC_TIMESTAMP_URL is not set. Recommended: http://timestamp.digicert.com"
    }

    Write-Info "Preflight passed."
    exit 0
}
catch {
    if ($AllowMissingCert) {
        Write-Warn "Preflight warning (allowed): $($_.Exception.Message)"
        exit 0
    }

    Write-Err $_.Exception.Message
    exit 1
}
