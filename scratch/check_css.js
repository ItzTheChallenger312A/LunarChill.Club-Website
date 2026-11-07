const fs = require('fs');
const css = fs.readFileSync('assets/css/pages/the-end.css', 'utf8');
const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('specs-') || line.includes('highlight-')) {
    console.log(`${idx + 1}: ${line}`);
  }
});
