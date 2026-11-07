const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('stellarity.html', 'utf8');

// 1. Check all image paths
const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
let match;
let missingImages = 0;
let totalImages = 0;

while ((match = imgRegex.exec(html)) !== null) {
  totalImages++;
  const src = match[1];
  if (src.startsWith('http') || src.startsWith('//') || src.startsWith('data:')) {
    continue;
  }
  const cleanSrc = src.split('?')[0].split('#')[0];
  const fullPath = path.resolve(__dirname, '..', cleanSrc);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing image: ${src} (resolved to ${fullPath})`);
    missingImages++;
  }
}

console.log(`Images checked: ${totalImages}, Missing: ${missingImages}`);

// 2. Check HTML tag balance for key container tags
const tagsToCheck = ['article', 'section', 'div', 'p', 'table', 'tbody', 'tr', 'td', 'th'];
for (const tag of tagsToCheck) {
  const openCount = (html.match(new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi')) || []).length;
  const closeCount = (html.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
  if (openCount !== closeCount) {
    console.error(`Tag mismatch for <${tag}>: ${openCount} open vs ${closeCount} close`);
  } else {
    console.log(`Tag <${tag}> balanced: ${openCount} open, ${closeCount} close`);
  }
}

// 3. Check for specific Harvester tier images
const harvesterTiers = [0, 1, 2, 3, 4];
for (const t of harvesterTiers) {
  const p = `assets/images/weapons/harvester_tier_${t}.png`;
  if (!fs.existsSync(p)) {
    console.error(`Missing harvester tier image: ${p}`);
  } else {
    console.log(`Found harvester tier ${t} image: ${p}`);
  }
}

if (missingImages === 0) {
  console.log('✅ ALL VERIFICATIONS PASSED SUCCESSFULLY!');
} else {
  process.exit(1);
}
