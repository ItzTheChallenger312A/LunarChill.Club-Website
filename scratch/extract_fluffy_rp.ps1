$zipPath = 'C:\Users\The Challenger\.gemini\antigravity\brain\69412ce2-9209-47d0-9551-18763161ce5f\.user_uploaded\media_1793986421213_ad7845ba.zip'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)

$files = @(
    "assets/stellarity/textures/item/fluffy_hammer.png",
    "assets/stellarity/textures/item/fluffy_hammer_held.png",
    "assets/stellarity/textures/item/radiant_jewel.png"
)

foreach ($f in $files) {
    $entry = $archive.Entries | Where-Object { $_.FullName -eq $f }
    if ($entry) {
        $name = [System.IO.Path]::GetFileName($f)
        $dest = Join-Path "scratch" ("rp_" + $name)
        [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $dest, $true)
        Write-Output "Extracted $f to $dest"
    }
}
$archive.Dispose()
