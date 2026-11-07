const sharp = require('sharp');
const fs = require('fs');

async function check(file, label) {
  const meta = await sharp(file).metadata();
  const { data } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  let nonZero = 0;
  for (let i = 0; i < meta.width * meta.height; i++) {
    const a = data[i * meta.channels + (meta.channels - 1)];
    if (a > 10) nonZero++;
  }
  console.log(label, ':', meta.width + 'x' + meta.height, 'non-transparent pixels:', nonZero, 'out of', meta.width * meta.height, '(' + (nonZero/(meta.width*meta.height)*100).toFixed(1) + '%)');
}

async function run() {
  await check('scratch/rp_fluffy_hammer.png', 'RP Fluffy Hammer');
  await check('scratch/rp_fluffy_hammer_held.png', 'RP Fluffy Hammer Held');
  await check('scratch/rp_radiant_jewel.png', 'RP Radiant Jewel');
  await check('assets/images/weapons/fluffy_hammer.png', 'Current weapons/fluffy_hammer.png');
  await check('assets/images/trinkets/radiant_jewel.png', 'Current trinkets/radiant_jewel.png');
}

run();
