const { execSync } = require('child_process');
const fs = require('fs');
const sharp = require('sharp');

const buf = execSync('git show b2eaf9f29c38656e7aff6f5a0a5c6812087a8587:assets/images/ingredients/enderman_flesh.png');
fs.writeFileSync('scratch/old_ing_enderman_flesh.png', buf);
sharp('scratch/old_ing_enderman_flesh.png').metadata().then(m => {
  console.log('Old ing enderman flesh:', m.width, 'x', m.height, 'size:', buf.length);
});
