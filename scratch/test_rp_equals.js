const fs = require('fs');
const sharp = require('sharp');

async function testBuffers() {
  const rpFluffy = await sharp('scratch/rp_fluffy_hammer.png')
    .resize(64, 64, { kernel: 'nearest' })
    .png()
    .toBuffer();
  const currentFluffy = fs.readFileSync('assets/images/weapons/fluffy_hammer.png');

  const { data: d1 } = await sharp(rpFluffy).raw().toBuffer({ resolveWithObject: true });
  const { data: d2 } = await sharp(currentFluffy).raw().toBuffer({ resolveWithObject: true });

  console.log('Fluffy hammer raw pixels equal to RP 64x64?', d1.equals(d2));

  const rpRadiant = await sharp('scratch/rp_radiant_jewel.png')
    .resize(64, 64, { kernel: 'nearest' })
    .png()
    .toBuffer();
  const currentRadiant = fs.readFileSync('assets/images/trinkets/radiant_jewel.png');

  const { data: r1 } = await sharp(rpRadiant).raw().toBuffer({ resolveWithObject: true });
  const { data: r2 } = await sharp(currentRadiant).raw().toBuffer({ resolveWithObject: true });

  console.log('Radiant jewel raw pixels equal to RP 64x64?', r1.equals(r2));
}

testBuffers();
