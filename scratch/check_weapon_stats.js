const fs = require('fs');
const html = fs.readFileSync('stellarity.html', 'utf8');

const regex = /<article class="item-recipe-card">[\s\S]*?<\/article>/g;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
  const card = match[0];
  if (card.includes('recipe-weapons') || card.includes('Sát thương') || card.includes('sát thương') || card.includes('DMG')) {
    const titleMatch = card.match(/<h3 class="item-meta-title">(.*?)<\/h3>/);
    const statsMatch = card.match(/<div class="item-stats-line">(.*?)<\/div>/);
    if (titleMatch && statsMatch && (statsMatch[1].includes('Sát thương') || statsMatch[1].includes('sát thương') || statsMatch[1].includes('DMG'))) {
      count++;
      console.log(`[${count}] ${titleMatch[1]}`);
      console.log(`    Stats: ${statsMatch[1]}`);
    }
  }
}
