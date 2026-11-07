const sharp = require('sharp');

async function exactCoords() {
  const p = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014419997_f9481a52.png';
  const img = sharp(p);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  const getPixel = (x, y) => {
    if (x < 0 || x >= info.width || y < 0 || y >= info.height) return [0,0,0,0];
    const idx = (y * info.width + x) * 4;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  };

  // Header of 0..50
  let h1 = '    ', h2 = '    ';
  for (let x = 0; x <= 45; x++) {
    h1 += Math.floor(x / 10);
    h2 += x % 10;
  }
  console.log(h1);
  console.log(h2);

  for (let y = 27; y <= 33; y++) {
    let s = `${String(y).padStart(2,'0')}: `;
    for (let x = 0; x <= 45; x++) {
      const px = getPixel(x, y);
      if (px[3] === 0) s += ' ';
      else if (px[0] < 50 && px[1] < 50 && px[2] < 50) s += '#';
      else if (px[0] > 150 && px[1] > 150) s += 'Y';
      else if (px[0] > 150) s += 'R';
      else s += 'C';
    }
    console.log(s);
  }
}

exactCoords();
