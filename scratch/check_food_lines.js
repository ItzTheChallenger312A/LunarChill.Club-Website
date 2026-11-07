const fs = require('fs');
const html = fs.readFileSync('stellarity.html', 'utf8');
const lines = html.split('\n');

let inSec9 = false;
lines.forEach((l, i) => {
  if (l.includes('id="recipe-cauldron-food"')) inSec9 = true;
  if (l.includes('id="recipe-cauldron-potions"')) inSec9 = false;
  if (inSec9 && (l.includes('item-stats-line') || l.includes('item-meta-title'))) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
