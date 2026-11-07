const fs = require('fs');
const html = fs.readFileSync('stellarity.html', 'utf8');
const lines = html.split('\n');
for (let i = 3900; i < 4450; i++) {
  if (lines[i].includes('<!-- Food') || lines[i].includes('<!-- Cauldron')) {
    console.log((i + 1) + ': ' + lines[i]);
  }
}
