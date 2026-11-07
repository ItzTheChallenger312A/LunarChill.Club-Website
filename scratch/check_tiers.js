const fs = require('fs');
const html = fs.readFileSync('stellarity.html', 'utf8');

const regex = /class=[\"']([^\"']*tier[^\"']*)[\"']/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log(match[1]);
}
