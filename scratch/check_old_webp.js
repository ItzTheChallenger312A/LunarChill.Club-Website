const { execSync } = require('child_process');
const fs = require('fs');
const sharp = require('sharp');

const buf1 = execSync('git show b147f74:assets/images/weapons/fluffy_hammer.webp');
fs.writeFileSync('scratch/old_fluffy.webp', buf1);
const buf2 = execSync('git show b147f74:assets/images/trinkets/radiant_jewel.webp');
fs.writeFileSync('scratch/old_radiant.webp', buf2);

async function checkOld() {
  const meta1 = await sharp('scratch/old_fluffy.webp').metadata();
  const { data: d1 } = await sharp('scratch/old_fluffy.webp').raw().toBuffer({ resolveWithObject: true });
  let nonZero1 = 0;
  for (let i = 0; i < meta1.width * meta1.height; i++) {
    if (d1[i * meta1.channels + 3] > 10) nonZero1++;
  }
  console.log('Old fluffy.webp:', meta1.width + 'x' + meta1.height, 'nonZero:', nonZero1);

  const meta2 = await sharp('scratch/old_radiant.webp').metadata();
  const { data: d2 } = await sharp('scratch/old_radiant.webp').raw().toBuffer({ resolveWithObject: true });
  let nonZero2 = 0;
  for (let i = 0; i < meta2.width * meta2.height; i++) {
    if (d2[i * meta2.channels + 3] > 10) nonZero2++;
  }
  console.log('Old radiant.webp:', meta2.width + 'x' + meta2.height, 'nonZero:', nonZero2);
}

checkOld();
