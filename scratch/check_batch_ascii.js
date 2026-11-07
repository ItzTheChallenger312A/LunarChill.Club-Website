const sharp = require('sharp');

async function dumpAsciiAuto(file, label) {
  const { data, info } = await sharp(file).resize(16, 16, { kernel: 'nearest' }).raw().toBuffer({ resolveWithObject: true });
  console.log(`=== ${label} (${info.width}x${info.height}) ===`);
  for (let y = 0; y < 16; y++) {
    let row = '';
    for (let x = 0; x < 16; x++) {
      const idx = (y * 16 + x) * info.channels;
      const a = data[idx + 3];
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // if white
      if (r > 240 && g > 240 && b > 240) {
        row += '⬜';
      } else if (a < 50) {
        row += '  ';
      } else {
        row += '██';
      }
    }
    console.log(row);
  }
}

async function run() {
  const files = [
    ['media_1793986276119_c5496a99.png', 'c5496a99'],
    ['media_1793986276120_da66b581.png', 'da66b581'],
    ['media_1793986276123_c37d8771.png', 'c37d8771'],
    ['media_1793986276132_ac36849b.png', 'ac36849b'],
    ['media_1793986276162_91e80606.webp', '91e80606']
  ];
  for (const [f, l] of files) {
    await dumpAsciiAuto('C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/' + f, l);
  }
}

run();
