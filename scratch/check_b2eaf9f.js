const { execSync } = require('child_process');
const fs = require('fs');
const sharp = require('sharp');

const bufFluffy = execSync('git show b2eaf9f:assets/images/weapons/fluffy_hammer.png');
fs.writeFileSync('scratch/b2eaf9f_fluffy.png', bufFluffy);

const bufRadiant = execSync('git show b2eaf9f:assets/images/trinkets/radiant_jewel.png');
fs.writeFileSync('scratch/b2eaf9f_radiant.png', bufRadiant);

async function dumpAsciiExact(file, label) {
  const { data, info } = await sharp(file).resize(16, 16, { kernel: 'nearest' }).raw().toBuffer({ resolveWithObject: true });
  console.log(`=== ${label} (${info.width}x${info.height}) ===`);
  for (let y = 0; y < 16; y++) {
    let row = '';
    for (let x = 0; x < 16; x++) {
      const idx = (y * 16 + x) * info.channels;
      const a = data[idx + 3];
      if (a < 50) row += '  ';
      else row += '██';
    }
    console.log(row);
  }
}

async function run() {
  await dumpAsciiExact('scratch/b2eaf9f_fluffy.png', 'Commit b2eaf9f Fluffy Hammer');
  await dumpAsciiExact('scratch/b2eaf9f_radiant.png', 'Commit b2eaf9f Radiant Jewel');
}

run();
