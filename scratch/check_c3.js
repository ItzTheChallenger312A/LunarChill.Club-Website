const sharp = require('sharp');

async function checkC3() {
  const { data, info } = await sharp('C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1793986276123_c37d8771.png')
    .resize(16, 16, { kernel: 'nearest' })
    .raw().toBuffer({ resolveWithObject: true });
  console.log('c37d8771 (16x16):');
  for (let y = 0; y < 16; y++) {
    let row = '';
    for (let x = 0; x < 16; x++) {
      const idx = (y * 16 + x) * info.channels;
      const a = data[idx + 3];
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (a < 50) row += '  ';
      else if (g > r && g > b) row += '🟩';
      else if (r > g && b > g) row += '🟪';
      else row += '⬛';
    }
    console.log(row);
  }
}

checkC3();
