const sharp = require('sharp');
const fs = require('fs');

async function checkWebp(file) {
  console.log('Checking:', file, 'exists:', fs.existsSync(file));
  if (!fs.existsSync(file)) return;
  const meta = await sharp(file).metadata();
  console.log(meta);
  const { data, info } = await sharp(file).resize(16, 16, { kernel: 'nearest' }).raw().toBuffer({ resolveWithObject: true });
  console.log('Ascii for', file);
  for (let y = 0; y < 16; y++) {
    let row = '';
    for (let x = 0; x < 16; x++) {
      const idx = (y * 16 + x) * info.channels;
      const a = data[idx + 3];
      if (a < 50) row += '  ';
      else row += '██';
    }
    console.log(row);
  }
}

async function run() {
  await checkWebp('assets/images/weapons/fluffy_hammer.webp');
  await checkWebp('assets/images/trinkets/radiant_jewel.webp');
}

run();
