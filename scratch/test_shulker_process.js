const sharp = require('sharp');
const fs = require('fs');

async function processShulker() {
  const userPath = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794008710633_62a82acf.png';
  const img = sharp(userPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Exact bg is 230, 239, 244
  const isBg = (x, y) => {
    const idx = (y * width + x) * 4;
    const r = data[idx];
    const g = data[idx+1];
    const b = data[idx+2];
    const dist = Math.abs(r - 230) + Math.abs(g - 239) + Math.abs(b - 244);
    return dist <= 3;
  };

  const visited = new Uint8Array(width * height);
  const queue = [];

  // Seed borders
  for (let x = 0; x < width; x++) {
    if (isBg(x, 0)) { visited[0 * width + x] = 1; queue.push(x, 0); }
    if (isBg(x, height - 1)) { visited[(height - 1) * width + x] = 1; queue.push(x, height - 1); }
  }
  for (let y = 0; y < height; y++) {
    if (isBg(0, y)) { visited[y * width + 0] = 1; queue.push(0, y); }
    if (isBg(width - 1, y)) { visited[y * width + (width - 1)] = 1; queue.push(width - 1, y); }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const neighbors = [
      [cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]
    ];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nidx = ny * width + nx;
        if (!visited[nidx] && isBg(nx, ny)) {
          visited[nidx] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  // Create new RGBA buffer
  const outData = Buffer.from(data);
  let transparentCount = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (visited[idx]) {
        const pIdx = idx * 4;
        outData[pIdx + 3] = 0; // Alpha 0
        transparentCount++;
      }
    }
  }

  console.log(`Flood filled ${transparentCount} bg pixels out of ${width * height} (${(transparentCount/(width*height)*100).toFixed(1)}%)`);

  // Find bounding box of foreground
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pIdx = (y * width + x) * 4;
      if (outData[pIdx + 3] > 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log('Foreground bbox:', { minX, maxX, minY, maxY, w: maxX - minX + 1, h: maxY - minY + 1 });

  const fgWidth = maxX - minX + 1;
  const fgHeight = maxY - minY + 1;

  // Extract foreground to PNG buffer
  const fgBuffer = await sharp(outData, { raw: { width, height, channels: 4 } })
    .extract({ left: minX, top: minY, width: fgWidth, height: fgHeight })
    .png()
    .toBuffer();

  const targetSize = 512;
  const maxDim = Math.max(fgWidth, fgHeight);
  const scale = (targetSize * 0.92) / maxDim;
  const scaledW = Math.round(fgWidth * scale);
  const scaledH = Math.round(fgHeight * scale);

  const resizedFg = await sharp(fgBuffer)
    .resize(scaledW, scaledH, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  const leftPad = Math.round((targetSize - scaledW) / 2);
  const topPad = Math.round((targetSize - scaledH) / 2);

  await sharp({
    create: {
      width: targetSize,
      height: targetSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: resizedFg, left: leftPad, top: topPad }])
  .png({ compressionLevel: 9 })
  .toFile('scratch/new_shulker_512.png');

  console.log('Successfully saved scratch/new_shulker_512.png');
}

processShulker();
