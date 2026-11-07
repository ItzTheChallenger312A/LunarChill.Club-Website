const sharp = require('sharp');
const fs = require('fs');

async function ensureDirectUpscale() {
  await sharp('scratch/rp_fluffy_hammer.png')
    .resize(64, 64, { kernel: 'nearest' })
    .png()
    .toFile('assets/images/weapons/fluffy_hammer.png');
  console.log('Regenerated assets/images/weapons/fluffy_hammer.png from RP');

  await sharp('scratch/rp_radiant_jewel.png')
    .resize(64, 64, { kernel: 'nearest' })
    .png()
    .toFile('assets/images/trinkets/radiant_jewel.png');
  console.log('Regenerated assets/images/trinkets/radiant_jewel.png from RP');
}

ensureDirectUpscale();
