const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function inspectCells() {
  const p = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014419997_f9481a52.png';
  const outDir = 'scratch/sliced_icons';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const img = sharp(p);
  const metadata = await img.metadata();

  // Let's inspect where non-empty 9x9 (or other size) regions are.
  // Let's test slicing at 9x9 grid intervals:
  // x: 0, 9, 18, 27, 36, 45, 54, 63, 72
  // y: 0, 9, 18, 27, 36, 45...
  
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 9; col++) {
      const left = col * 9;
      const top = row * 9;
      const cell = await sharp(p)
        .extract({ left, top, width: 9, height: 9 })
        .png()
        .toBuffer();
      
      // Check if not completely empty
      const { data } = await sharp(cell).raw().toBuffer({ resolveWithObject: true });
      const hasPixels = data.some((val, idx) => idx % 4 === 3 && val > 0);
      if (hasPixels) {
        // Also upscale to 72x72 for easy visual viewing
        await sharp(cell)
          .resize(72, 72, { kernel: sharp.kernel.nearest })
          .toFile(path.join(outDir, `cell_r${row}_c${col}.png`));
        console.log(`Cell r${row}_c${col} (left=${left}, top=${top}) saved.`);
      }
    }
  }
}

inspectCells();
