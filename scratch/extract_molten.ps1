$zipPath = 'C:\Users\The Challenger\.gemini\antigravity\brain\69412ce2-9209-47d0-9551-18763161ce5f\.user_uploaded\media_1793986421213_ad7845ba.zip'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$entry = $archive.Entries | Where-Object { $_.FullName -eq 'assets/stellarity/items/harvester_molten.json' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$archive.Dispose()
$content | Set-Content -Path 'scratch/harvester_molten.json' -Encoding UTF8
Write-Output "Extracted harvester_molten.json"
