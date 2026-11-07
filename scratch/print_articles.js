const fs = require('fs');
const html = fs.readFileSync('stellarity.html', 'utf8');
const lines = html.split('\n');

function printRange(startPattern, endPattern) {
  const start = lines.findIndex(l => l.includes(startPattern));
  const end = lines.findIndex((l, i) => i > start && l.includes(endPattern));
  console.log(`=== ${startPattern} (lines ${start+1} - ${end+1}) ===`);
  console.log(lines.slice(start, end + 1).join('\n'));
}

printRange('<!-- Food 2: Enderman Flesh -->', '</article>');
printRange('<!-- Cauldron 2: Grilled Enderman Flesh -->', '</article>');
printRange('<!-- Cauldron 11: Frozen Carpaccio -->', '</article>');
