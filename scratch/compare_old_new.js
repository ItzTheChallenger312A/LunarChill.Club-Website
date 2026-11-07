const sharp = require('sharp');

async function test() {
  const img1 = sharp('scratch/old_ing_enderman_flesh.png');
  const img2 = sharp('assets/images/foods/enderman_flesh.png');
  const stats1 = await img1.stats();
  const stats2 = await img2.stats();
  console.log('Old ing colors:', stats1.channels.map(c => Math.round(c.mean)));
  console.log('Current foods/enderman_flesh colors:', stats2.channels.map(c => Math.round(c.mean)));
}

test();
