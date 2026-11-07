const fs = require('fs');
const sharp = require('sharp');

async function testGrilled() {
  const rp = fs.readFileSync('scratch/rp_grilled_enderman_flesh.png');
  const current = fs.readFileSync('assets/images/foods/grilled_enderman_flesh.png');
  const { data: d1 } = await sharp(rp).resize(64, 64, { kernel: 'nearest' }).raw().toBuffer({ resolveWithObject: true });
  const { data: d2 } = await sharp(current).raw().toBuffer({ resolveWithObject: true });
  console.log('Grilled Enderman Flesh match RP?', d1.equals(d2));

  const rpCarpaccio = fs.readFileSync('scratch/rp_frozen_carpaccio.png');
  const currentCarpaccio = fs.readFileSync('assets/images/foods/frozen_carpaccio.png');
  const { data: c1 } = await sharp(rpCarpaccio).resize(64, 64, { kernel: 'nearest' }).raw().toBuffer({ resolveWithObject: true });
  const { data: c2 } = await sharp(currentCarpaccio).raw().toBuffer({ resolveWithObject: true });
  console.log('Frozen Carpaccio match RP?', c1.equals(c2));
}

testGrilled();
