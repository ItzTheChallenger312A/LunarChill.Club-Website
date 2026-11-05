$ErrorActionPreference = "Stop"

$ytDlp = "$PSScriptRoot\..\tools\yt-dlp.exe"
$ffmpegDir = "C:\Users\The Challenger\AppData\Local\Microsoft\WinGet\Packages\yt-dlp.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-N-127043-g5a54fcf75e-win64-gpl\bin"
$ffmpeg = "$ffmpegDir\ffmpeg.exe"
$videoUrl = "https://www.youtube.com/watch?v=DPXs4YlNl7k"
$tempRaw = "$PSScriptRoot\..\tools\raw_clip.mp4"
$outputMp4 = "$PSScriptRoot\..\assets\videos\hero-ambient-loop.mp4"
$outputPoster = "$PSScriptRoot\..\assets\images\hero-video-poster.webp"

Write-Host "==> Downloading 21.5s clip (15s to 36.5s) from $videoUrl..."
if (Test-Path $tempRaw) { Remove-Item $tempRaw -Force }

& $ytDlp --ffmpeg-location $ffmpegDir `
    --download-sections "*00:00:15.00-00:00:36.50" `
    --force-keyframes-at-cuts `
    -f "bv*[height<=1080][ext=mp4]/bv*[height<=1080]/b" `
    -o $tempRaw `
    $videoUrl

if (-not (Test-Path $tempRaw)) {
    throw "Failed to download raw video clip."
}

Write-Host "==> Processing seamless crossfade loop (duration ~20s, no audio, web-optimized)..."

# Total duration of raw_clip is ~21.5s
# We want 1.5s crossfade between the end (20s-21.5s) and start (0s-1.5s)
$filterComplex = "[0:v]split=2[vmain][vend];[vend]trim=start=20:end=21.5,setpts=PTS-STARTPTS[endfade];[vmain]trim=start=0:end=20,setpts=PTS-STARTPTS[main];[endfade][main]xfade=transition=fade:duration=1.5:offset=0[outv]"

if (Test-Path $outputMp4) { Remove-Item $outputMp4 -Force }

& $ffmpeg -y -i $tempRaw `
    -filter_complex $filterComplex `
    -map "[outv]" `
    -an `
    -c:v libx264 -crf 23 -preset slow `
    -pix_fmt yuv420p `
    -movflags +faststart `
    $outputMp4

Write-Host "==> Extracting poster image frame..."
if (Test-Path $outputPoster) { Remove-Item $outputPoster -Force }

& $ffmpeg -y -ss 00:00:01.00 -i $outputMp4 -vframes 1 -q:v 85 $outputPoster

Write-Host "==> Finished! Generated:"
Get-Item $outputMp4 | Select-Object Name, Length, LastWriteTime
Get-Item $outputPoster | Select-Object Name, Length, LastWriteTime
