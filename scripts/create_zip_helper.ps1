function Create-Archive {
    param(
        [string]$Path,
        [string]$DestinationPath,
        [string[]]$Exclude
    )

    $files = Get-ChildItem -Path $Path -Recurse -File | Where-Object {
        $file = $_
        $excludeFile = $false
        foreach ($pattern in $Exclude) {
            if ($file.FullName -like "*\$pattern\*") {
                $excludeFile = $true
                break
            }
        }
        return -not $excludeFile
    }

    Compress-Archive -Path $files.FullName -DestinationPath $DestinationPath -Force
}
