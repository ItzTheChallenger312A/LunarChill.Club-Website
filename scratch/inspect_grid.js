const sharp = require('sharp');
const fs = require('fs');

async function inspectSprites() {
  const p = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014419997_f9481a52.png';
  const img = sharp(p);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  
  // Let's print out what colors exist and how things are spaced.
  // In Minecraft icons.png:
  // Each icon is typically 9x9 pixels!
  // Let's check 9x9 grids or see where sprites are located.
  console.log(`Image dimensions: ${info.width}x${info.height}`);
  
  // Let's print rows from y = 0 to 41, columns x = 0 to 81
  for (let y = 0; y <= 41; y++) {
    let row = '';
    for (let x = 0; x <= 81; x++) {
      const idx = (y * info.width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      if (a === 0) {
        row += ' ';
      } else if (r > 240 && g > 240 && b > 240) {
        row += '.';
      } else if (r > 150 && g > 150 && b < 50) {
        row += 'Y'; // yellow / gold
      } else if (r > 150 && g < 100 && b < 100) {
        row += 'R'; // red
      } else if (r < 80 && g < 80 && b < 80) {
        row += '#'; // dark / black / grey
      } else {
        row += 'C'; // color
      }
    }
    console.log(`${String(y).padStart(2, '0')}: ${row}`);
  }
}

inspectSprites();
