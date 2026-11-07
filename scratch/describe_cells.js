const sharp = require('sharp');
const fs = require('fs');

async function describeCells() {
  const cells = [
    'r0_c0', 'r0_c1', 'r0_c2', 'r0_c3',
    'r1_c0', 'r1_c1', 'r1_c2', 'r1_c3',
    'r2_c0',
    'r3_c0', 'r3_c1', 'r3_c2', 'r3_c3',
    'r4_c0', 'r4_c1', 'r4_c2', 'r4_c3'
  ];

  for (const c of cells) {
    const p = `scratch/sliced_icons/cell_${c}.png`;
    if (!fs.existsSync(p)) continue;
    const img = sharp(p);
    const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
    
    // Sample colors at 9x9 (downsampled back or read raw from original coords)
    console.log(`=== Cell ${c} ===`);
  }
}

async function inspectOriginalCoords() {
  const p = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014419997_f9481a52.png';
  const img = sharp(p);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  const getPixel = (x, y) => {
    const idx = (y * info.width + x) * 4;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  };

  // Let's print out 9x9 character matrix for each cell:
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      let lines = [];
      let nonTrans = 0;
      for (let y = 0; y < 9; y++) {
        let line = '';
        for (let x = 0; x < 9; x++) {
          const px = getPixel(c * 9 + x, r * 9 + y);
          if (px[3] === 0) {
            line += '  ';
          } else {
            nonTrans++;
            // Hex color
            const hex = '#' + ((1 << 24) + (px[0] << 16) + (px[1] << 8) + px[2]).toString(16).slice(1);
            if (px[0] > 200 && px[1] > 180 && px[2] < 50) line += 'Y '; // Yellow/Gold
            else if (px[0] > 150 && px[1] < 50) line += 'R '; // Red/Orange
            else if (px[0] < 50 && px[1] < 50 && px[2] < 50) line += 'K '; // Black
            else if (px[0] > 100 && px[1] > 100 && px[2] > 100) line += 'W '; // White/Light
            else line += 'C ';
          }
        }
        lines.push(line);
      }
      if (nonTrans > 0) {
        console.log(`Cell r${r}_c${c}:`);
        console.log(lines.join('\n'));
      }
    }
  }
}

inspectOriginalCoords();
