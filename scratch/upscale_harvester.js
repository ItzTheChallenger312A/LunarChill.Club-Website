const sharp = require('sharp');
const fs = require('fs');

async function upscaleAll() {
  for (let i = 0; i <= 4; i++) {
    const file = `assets/images/weapons/harvester_tier_${i}.png`;
    const tempFile = `scratch/harvester_tier_${i}_64.png`;
    await sharp(file)
      .resize(64, 64, { kernel: 'nearest' })
      .toFile(tempFile);
    fs.copyFileSync(tempFile, file);
    const meta = await sharp(file).metadata();
    console.log(`Upscaled ${file} -> ${meta.width}x${meta.height}`);
  }
}

upscaleAll().catch(console.error);
