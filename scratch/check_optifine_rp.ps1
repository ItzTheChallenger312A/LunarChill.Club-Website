$zipPath = 'C:\Users\The Challenger\.gemini\antigravity\brain\69412ce2-9209-47d0-9551-18763161ce5f\.user_uploaded\media_1793986421213_ad7845ba.zip'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)

$found = @()
foreach ($entry in $archive.Entries) {
    if ($entry.FullName -like '*optifine*' -or $entry.FullName -like '*emissive*' -or $entry.FullName -like '*_e.png') {
        $found += $entry.FullName
    }
}
$archive.Dispose()
Write-Output "Found $($found.Count) optifine/emissive files"
$found | Select-Object -First 20
