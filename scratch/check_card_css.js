const fs = require('fs');
const css = fs.readFileSync('assets/css/pages/the-end.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, i) => {
  if (l.includes('.item-recipe-card')) {
    console.log(`${i+1}: ${l}`);
  }
});
