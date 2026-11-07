const fs = require('fs');
const html = fs.readFileSync('stellarity.html', 'utf8');
const lines = html.split('\n');

lines.forEach((l, i) => {
  if (l.includes('tim <img') || l.includes('tim (') || l.includes('DMG')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
