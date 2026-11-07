const sharp = require('sharp');
const fs = require('fs');

async function inspectRpFiles() {
  for (const f of ['scratch/rp_fluffy_hammer.png', 'scratch/rp_radiant_jewel.png']) {
    const img = sharp(f);
    const meta = await img.metadata();
    const { data } = await img.raw().toBuffer({ resolveWithObject: true });
    console.log(f, meta.width, 'x', meta.height, 'hasAlpha:', meta.hasAlpha, 'channels:', meta.channels);
    
    // Check if border pixels are transparent
    let transparentCount = 0;
    for (let i = 0; i < meta.width * meta.height; i++) {
      const a = data[i * meta.channels + 3];
      if (a === 0) transparentCount++;
    }
    console.log(f, 'transparent pixels:', transparentCount, 'out of', meta.width * meta.height);
  }
}

inspectRpFiles();
