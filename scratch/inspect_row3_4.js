const sharp = require('sharp');

async function inspectRow3and4() {
  const p = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014419997_f9481a52.png';
  const img = sharp(p);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  const getPixel = (x, y) => {
    if (x < 0 || x >= info.width || y < 0 || y >= info.height) return [0,0,0,0];
    const idx = (y * info.width + x) * 4;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  };

  for (let rIdx = 0; rIdx < 2; rIdx++) {
    const startY = rIdx === 0 ? 27 : 34;
    const endY = startY + 6; // 7 rows: 27..33 and 34..40
    console.log(`\n=================== ROW ${rIdx + 3} (y=${startY}..${endY}) ===================`);
    
    for (let cIdx = 0; cIdx < 5; cIdx++) {
      const startX = cIdx * 9;
      const endX = startX + 8;
      console.log(`--- Icon cIdx=${cIdx} (x=${startX}..${endX}) ---`);
      
      for (let y = startY; y <= endY; y++) {
        let line = '';
        for (let x = startX; x <= endX; x++) {
          const px = getPixel(x, y);
          if (px[3] === 0) {
            line += '  ';
          } else {
            const hex = '#' + ((1 << 24) + (px[0] << 16) + (px[1] << 8) + px[2]).toString(16).slice(1);
            if (px[0] < 50 && px[1] < 50 && px[2] < 50) {
              line += '##';
            } else if (px[0] > 150 && px[1] > 150) {
              line += 'YY';
            } else if (px[0] > 150 && px[1] < 100) {
              line += 'RR';
            } else {
              line += '??';
            }
          }
        }
        console.log(`y=${y}: [${line}]`);
      }
    }
  }
}

inspectRow3and4();
