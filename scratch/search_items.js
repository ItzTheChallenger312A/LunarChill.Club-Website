const fs = require('fs');
const html = fs.readFileSync('stellarity.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.toLowerCase().includes('enderman flesh') || l.toLowerCase().includes('carpaccio')) {
    console.log((i + 1) + ': ' + l.trim().substring(0, 140));
  }
});
