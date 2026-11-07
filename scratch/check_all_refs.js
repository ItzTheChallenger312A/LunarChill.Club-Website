const fs = require('fs');

const files = ['stellarity.html', 'index.html', 'guide.html'];
for (const file of files) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((l, i) => {
      if (l.includes('fluffy_hammer') || l.includes('radiant_jewel')) {
        console.log(`${file}:${i+1}: ${l.trim()}`);
      }
    });
  }
}
