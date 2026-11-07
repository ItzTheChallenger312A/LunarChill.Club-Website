const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ps1Content = `
$zipPath = 'C:\\Users\\The Challenger\\.gemini\\antigravity\\brain\\69412ce2-9209-47d0-9551-18763161ce5f\\.user_uploaded\\media_1793986421213_ad7845ba.zip'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$entries = $archive.Entries | Where-Object { $_.FullName -like '*harvester*' }
foreach ($e in $entries) {
    Write-Output $e.FullName
}
$archive.Dispose()
`;

fs.writeFileSync('scratch/list_harvester.ps1', ps1Content, 'utf8');
console.log('Written scratch/list_harvester.ps1');
