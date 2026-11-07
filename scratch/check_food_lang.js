const fs = require('fs');
const lang = JSON.parse(fs.readFileSync('scratch/en_us.json', 'utf8').replace(/^\uFEFF/, ''));
const keys = Object.keys(lang).filter(k => k.includes('flesh') || k.includes('carpaccio'));
const res = {};
for (const k of keys) {
  res[k] = lang[k];
}
console.log(JSON.stringify(res, null, 2));
