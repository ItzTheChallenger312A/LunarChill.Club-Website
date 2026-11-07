const fs = require('fs');
const html = fs.readFileSync('stellarity.html', 'utf8');
const lines = html.split('\n');

let inWeapons = false;
lines.forEach((l, i) => {
  if (l.includes('id="recipe-weapons"')) inWeapons = true;
  if (l.includes('id="trinkets-and-buffs"')) inWeapons = false;
  if (inWeapons && (l.includes('Sát thương') || l.includes('sát thương') || l.includes('DMG') || l.includes('Damage') || l.includes('tim'))) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
