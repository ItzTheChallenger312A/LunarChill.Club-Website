const fs = require('fs');
const html = fs.readFileSync('stellarity.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('shulker') || l.includes('Shulker')) {
    if (l.includes('<img') || l.includes('item-meta-title') || l.includes('article')) {
      console.log(`${i+1}: ${l.trim()}`);
    }
  }
});
