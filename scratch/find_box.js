const sharp = require('sharp');

async function findBox() {
  const img = sharp('C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014043254_47c850e1.png');
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  // Find where brightness > 150 (the light grey square)
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;
  for (let y = 0; y < 200; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (r > 150 && g > 150 && b > 150) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log('Light box bbox:', { minX, maxX, minY, maxY, width: maxX - minX + 1, height: maxY - minY + 1 });
  if (maxX > minX && maxY > minY) {
    await img.extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
      .png()
      .toFile('scratch/user_fluffy_box.png');
    console.log('Extracted to scratch/user_fluffy_box.png');
  }
}

findBox();
