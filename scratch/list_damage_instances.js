const fs = require('fs');
const html = fs.readFileSync('stellarity.html', 'utf8');

const lines = html.split('\n');
const items = [];

lines.forEach((l, i) => {
  // Check stats line
  if (l.includes('item-stats-line') && (l.includes('Sát thương') || l.includes('sát thương') || l.includes('DMG'))) {
    items.push({ line: i + 1, type: 'stats-line', text: l.trim() });
  }
  // Check harvester tiers
  if (l.includes('harvester-tier-dmg') || l.includes('specs-row')) {
    items.push({ line: i + 1, type: 'specs/tier', text: l.trim() });
  }
});

console.log('Found', items.length, 'key damage lines:');
items.forEach(it => console.log(`[L${it.line}] (${it.type}) ${it.text}`));
