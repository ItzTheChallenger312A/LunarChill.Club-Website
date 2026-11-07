const sharp = require('sharp');

async function renderDrumstickOutline() {
  const p = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014419997_f9481a52.png';
  const img = sharp(p);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  const getPixel = (x, y) => {
    if (x < 0 || x >= info.width || y < 0 || y >= info.height) return [0,0,0,0];
    const idx = (y * info.width + x) * 4;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  };

  console.log('=== Icon 3 in Row 0 (x=26..34, y=0..8): 9x9 Golden Saturation Outline ===');
  for (let y = 0; y <= 8; y++) {
    let s = '';
    for (let x = 26; x <= 34; x++) {
      const px = getPixel(x, y);
      s += px[3] > 0 ? '██' : '  ';
    }
    console.log(`y=${y}: |${s}|`);
  }

  console.log('\n=== Icon 2 in Row 0 (x=17..25, y=0..8): 9x9 Half/Partial Saturation Outline ===');
  for (let y = 0; y <= 8; y++) {
    let s = '';
    for (let x = 17; x <= 25; x++) {
      const px = getPixel(x, y);
      s += px[3] > 0 ? '██' : '  ';
    }
    console.log(`y=${y}: |${s}|`);
  }

  console.log('\n=== Icon 1 in Row 0 (x=8..16, y=0..8) ===');
  for (let y = 0; y <= 8; y++) {
    let s = '';
    for (let x = 8; x <= 16; x++) {
      const px = getPixel(x, y);
      s += px[3] > 0 ? '██' : '  ';
    }
    console.log(`y=${y}: |${s}|`);
  }

  console.log('\n=== Icon 0 in Row 0 (x=0..8, y=0..8) ===');
  for (let y = 0; y <= 8; y++) {
    let s = '';
    for (let x = 0; x <= 8; x++) {
      const px = getPixel(x, y);
      s += px[3] > 0 ? '██' : '  ';
    }
    console.log(`y=${y}: |${s}|`);
  }
}

renderDrumstickOutline();
