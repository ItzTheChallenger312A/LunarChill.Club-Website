const fs = require('fs');
const html = fs.readFileSync('stellarity.html', 'utf8');
const lines = html.split('\n');

for (let i = 3920; i < 4430; i++) {
  const line = lines[i];
  if (line.includes('<img src="assets/images/')) {
    console.log((i + 1) + ': ' + line.trim());
  }
}
