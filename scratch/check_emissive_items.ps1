$zipPath = 'C:\Users\The Challenger\.gemini\antigravity\brain\69412ce2-9209-47d0-9551-18763161ce5f\.user_uploaded\media_1793986421213_ad7845ba.zip'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)

$found = @()
foreach ($entry in $archive.Entries) {
    if ($entry.FullName -like '*fluffy_hammer*e.png' -or $entry.FullName -like '*radiant_jewel*e.png') {
        $found += $entry.FullName
    }
}
$archive.Dispose()
Write-Output "Found: $($found -join ', ')"
