const fs = require('fs');
const sharp = require('sharp');

async function test() {
  const list = [
    ['scratch/rp_enderman_flesh.png', 'RP Enderman Flesh'],
    ['assets/images/foods/enderman_flesh.png', 'Current foods/enderman_flesh.png'],
    ['assets/images/ingredients/enderman_flesh.png', 'Current ingredients/enderman_flesh.png'],
    ['scratch/rp_grilled_enderman_flesh.png', 'RP Grilled Enderman Flesh'],
    ['assets/images/foods/grilled_enderman_flesh.png', 'Current foods/grilled_enderman_flesh.png'],
    ['scratch/rp_frozen_carpaccio.png', 'RP Frozen Carpaccio'],
    ['assets/images/foods/frozen_carpaccio.png', 'Current foods/frozen_carpaccio.png']
  ];

  for (const [p, label] of list) {
    if (!fs.existsSync(p)) {
      console.log(label, 'DOES NOT EXIST:', p);
      continue;
    }
    const meta = await sharp(p).metadata();
    console.log(label, ':', meta.width + 'x' + meta.height, 'size:', fs.statSync(p).size);
  }
}

test();
