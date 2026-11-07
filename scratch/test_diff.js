const fs = require('fs');
const sharp = require('sharp');

async function testDiff() {
  const rp = fs.readFileSync('scratch/rp_enderman_flesh.png');
  const user = fs.readFileSync('C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794010553373_c0fdf17e.png');
  console.log('RP Enderman Flesh size:', rp.length);
  console.log('User sent Enderman Flesh size:', user.length);
  console.log('Are they equal?', rp.equals(user));

  // Let's inspect raw pixel data
  const { data: d1 } = await sharp(rp).raw().toBuffer({ resolveWithObject: true });
  const { data: d2 } = await sharp(user).raw().toBuffer({ resolveWithObject: true });
  console.log('Raw pixel buffers equal?', d1.equals(d2));
}

testDiff();
