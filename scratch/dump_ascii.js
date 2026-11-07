const sharp = require('sharp');

async function dumpAscii(file, label) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  console.log(`=== ${label} (${info.width}x${info.height}) ===`);
  for (let y = 0; y < info.height; y++) {
    let row = '';
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const a = data[idx + 3];
      if (a < 50) {
        row += '  ';
      } else {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        if (g > r && g > b) row += '🟩';
        else if (r > g && b > g) row += '🟪';
        else if (r > 150 && g < 100) row += '🟥';
        else row += '⬛';
      }
    }
    console.log(row);
  }
}

async function run() {
  await dumpAscii('scratch/rp_fluffy_hammer.png', 'RP Fluffy Hammer');
  await dumpAscii('scratch/rp_radiant_jewel.png', 'RP Radiant Jewel');
}

run();
