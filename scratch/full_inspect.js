const sharp = require('sharp');
const fs = require('fs');

async function fullInspection() {
  const p = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014419997_f9481a52.png';
  const img = sharp(p);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  console.log(`Image size: ${info.width}x${info.height}`);

  // Let's find distinct connected components or distinct horizontal/vertical regions
  // Let's examine:
  // Region 1: y = 0 to 8 (top icons)
  // Region 2: y = 9 to 17 (second row icons)
  // Region 3: y = 18 to 26 (checkerboard bar)
  // Region 4: y = 27 to 33 (third row icons)
  // Region 5: y = 34 to 40 (fourth row icons)
  
  // Let's check non-empty bounds for each:
  const getPixel = (x, y) => {
    if (x < 0 || x >= info.width || y < 0 || y >= info.height) return [0,0,0,0];
    const idx = (y * info.width + x) * 4;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  };

  // Check unique colors in the image:
  const colors = new Map();
  for (let y = 0; y < 45; y++) {
    for (let x = 0; x < 90; x++) {
      const px = getPixel(x, y);
      if (px[3] > 0) {
        const hex = `#${px[0].toString(16).padStart(2,'0')}${px[1].toString(16).padStart(2,'0')}${px[2].toString(16).padStart(2,'0')} (a=${px[3]})`;
        colors.set(hex, (colors.get(hex) || 0) + 1);
      }
    }
  }
  console.log('Unique colors count:', colors.size);
  for (const [col, cnt] of colors.entries()) {
    console.log(`  ${col}: ${cnt}px`);
  }
}

fullInspection();
