
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = 'C:\Users\The Challenger\.gemini\antigravity\brain\69412ce2-9209-47d0-9551-18763161ce5f\.user_uploaded\media_1793986421213_ad7845ba.zip'
$archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$archive.Entries | Where-Object { $_.FullName -like '*food*' -or $_.FullName -like '*icon*' -or $_.FullName -like '*hud*' -or $_.FullName -like '*gui*' } | ForEach-Object { $_.FullName }
$archive.Dispose()
