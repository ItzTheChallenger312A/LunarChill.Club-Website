const fs = require('fs');
const css = fs.readFileSync('assets/css/pages/the-end.css', 'utf8');
console.log('column-span in css:', css.includes('column-span'));
