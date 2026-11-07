const sharp = require('sharp');

async function analyzeAppleSkin() {
  const p = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014419997_f9481a52.png';
  const img = sharp(p);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  // Let's print out exact RGBA of all non-transparent pixels in the first 45 rows
  console.log('Analyzing non-empty blocks...');

  // Let's check columns:
  // In row 0-8:
  // Col 0: x=0..8 -> wait, in Col 0, where are the pixels?
  for (let y = 0; y <= 8; y++) {
    let str = '';
    for (let x = 0; x <= 36; x++) {
      const idx = (y * info.width + x) * 4;
      str += data[idx + 3] > 0 ? 'X' : ' ';
    }
    console.log(`y=${String(y).padStart(2,'0')}: [${str}]`);
  }
}

analyzeAppleSkin();
