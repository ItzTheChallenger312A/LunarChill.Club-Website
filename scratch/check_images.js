const sharp = require('sharp');
const fs = require('fs');

async function check() {
  for (let i = 0; i <= 4; i++) {
    const file = 'assets/images/weapons/harvester_tier_' + i + '.png';
    const meta = await sharp(file).metadata();
    console.log(file, meta.width, 'x', meta.height, meta.format);
  }
}
check();
