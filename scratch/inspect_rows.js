const sharp = require('sharp');

async function inspectAllRows() {
  const p = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014419997_f9481a52.png';
  const img = sharp(p);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  const getPixel = (x, y) => {
    if (x < 0 || x >= info.width || y < 0 || y >= info.height) return [0,0,0,0];
    const idx = (y * info.width + x) * 4;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  };

  // Let's print out exact colored matrix for Row 0, Row 1, Row 2, Row 3, Row 4
  console.log('--- ROW 0 (y=0..8): Saturation (Gold) ---');
  for (let y = 0; y <= 8; y++) {
    let s = '';
    for (let x = 0; x <= 36; x++) {
      const px = getPixel(x, y);
      if (px[3] === 0) s += ' ';
      else if (px[0] > 200 && px[1] > 200) s += '1'; // bright gold #e9d262
      else if (px[0] > 180 && px[1] > 180) s += '2'; // mid-bright #ddc241
      else if (px[0] > 150) s += '3'; // gold #c2a100
      else s += '4'; // dark gold #9f8609
    }
    console.log(s);
  }

  console.log('--- ROW 1 (y=9..17): Exhaustion/Hunger Penalty (Red) ---');
  for (let y = 9; y <= 17; y++) {
    let s = '';
    for (let x = 0; x <= 36; x++) {
      const px = getPixel(x, y);
      if (px[3] === 0) s += ' ';
      else if (px[0] > 220) s += '1'; // bright red
      else if (px[0] > 200) s += '2';
      else if (px[0] > 160) s += '3';
      else s += '4';
    }
    console.log(s);
  }

  console.log('--- ROW 3 & 4 (y=27..40) ---');
  for (let y = 27; y <= 40; y++) {
    let s = '';
    for (let x = 0; x <= 45; x++) {
      const px = getPixel(x, y);
      if (px[3] === 0) s += ' ';
      else if (px[0] < 50 && px[1] < 50 && px[2] < 50) s += '#'; // dark
      else if (px[0] > 150 && px[1] > 150) s += 'Y'; // gold
      else if (px[0] > 150) s += 'R'; // red
      else s += '?';
    }
    console.log(`${y}: ${s}`);
  }
}

inspectAllRows();
