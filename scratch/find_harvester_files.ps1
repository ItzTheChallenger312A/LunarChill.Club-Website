$zipPath = 'C:\Users\The Challenger\.gemini\antigravity\brain\69412ce2-9209-47d0-9551-18763161ce5f\.user_uploaded\media_1793986421213_ad7845ba.zip'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)

$results = @()
foreach ($entry in $archive.Entries) {
    if ($entry.FullName -like '*harvester*' -and ($entry.FullName.EndsWith('.json') -or $entry.FullName.EndsWith('.mcfunction'))) {
        $results += $entry.FullName
    }
}
$archive.Dispose()
$results | Out-File -FilePath 'scratch/harvester_functions.txt' -Encoding UTF8
Write-Output "Found $($results.Count) files"
