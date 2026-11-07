$zipPath = 'C:\Users\The Challenger\.gemini\antigravity\brain\69412ce2-9209-47d0-9551-18763161ce5f\.user_uploaded\media_1793986421213_ad7845ba.zip'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)

$destDir = 'assets\images\weapons'
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

for ($i = 0; $i -le 4; $i++) {
    $entryName = "assets/stellarity/textures/item/harvester/tier_$i.png"
    $entry = $archive.Entries | Where-Object { $_.FullName -eq $entryName }
    if ($entry) {
        $destFile = Join-Path $destDir "harvester_tier_$i.png"
        [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $destFile, $true)
        Write-Output "Extracted $entryName to $destFile"
    } else {
        Write-Warning "Could not find $entryName"
    }
}

$archive.Dispose()
Write-Output "Done extracting Harvester tier textures."
