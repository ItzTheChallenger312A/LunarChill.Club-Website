const sharp = require('sharp');

async function printCompAscii() {
  const img = sharp('scratch/food_full.png');
  const satImg = sharp('scratch/dissected/sat_outline_full.png');
  const foodData = (await img.raw().toBuffer({ resolveWithObject: true })).data;
  const satData = (await satImg.raw().toBuffer({ resolveWithObject: true })).data;

  console.log('--- food_full.png (9x9) ---');
  for (let y = 0; y < 9; y++) {
    let s = '';
    for (let x = 0; x < 9; x++) {
      const idx = (y * 9 + x) * 4;
      const a = foodData[idx + 3];
      if (a === 0) s += '  ';
      else if (foodData[idx] > 200 && foodData[idx+1] > 200 && foodData[idx+2] > 200) s += 'WW'; // bone
      else if (foodData[idx] < 60) s += 'KK'; // dark border
      else s += 'MM'; // meat
    }
    console.log(`|${s}|`);
  }

  console.log('--- Combined food_full + sat_outline_full (9x9) ---');
  for (let y = 0; y < 9; y++) {
    let s = '';
    for (let x = 0; x < 9; x++) {
      const idx = (y * 9 + x) * 4;
      const satA = satData[idx + 3];
      const foodA = foodData[idx + 3];
      if (satA > 0) s += 'YY'; // gold outline!
      else if (foodA === 0) s += '  ';
      else if (foodData[idx] > 200 && foodData[idx+1] > 200 && foodData[idx+2] > 200) s += 'WW'; // bone
      else if (foodData[idx] < 60) s += 'KK'; // dark
      else s += 'MM'; // meat
    }
    console.log(`|${s}|`);
  }
}

printCompAscii();
