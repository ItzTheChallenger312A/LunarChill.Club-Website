const fs = require('fs');

// 1. Update the-end.css link with cache buster
const p = 'stellarity.html';
let html = fs.readFileSync(p, 'utf8');

// Replace the-end.css link
html = html.replace(
  '<link rel="stylesheet" href="assets/css/pages/the-end.css">',
  '<link rel="stylesheet" href="assets/css/pages/the-end.css?v=6.0.4">'
);
html = html.replace(
  '<link rel="stylesheet" href="assets/css/pages/the-end.css?v=6.0.3">',
  '<link rel="stylesheet" href="assets/css/pages/the-end.css?v=6.0.4">'
);

// 2. Add width="14" height="14" and ?v=6.0.4 to hunger_full.png, saturation_full.png, hunger_effect_full.png, heart_full.png
// Let's replace:
// src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"
// with:
// src="assets/images/ui/hunger_full.png?v=6.0.4" alt="Hunger" class="mc-food-icon" width="14" height="14"

html = html.replace(/src="assets\/images\/ui\/hunger_full\.png(\?v=[\d\.]+)*"/g, 'src="assets/images/ui/hunger_full.png?v=6.0.4" width="14" height="14"');
html = html.replace(/src="assets\/images\/ui\/hunger_half\.png(\?v=[\d\.]+)*"/g, 'src="assets/images/ui/hunger_half.png?v=6.0.4" width="14" height="14"');
html = html.replace(/src="assets\/images\/ui\/hunger_empty\.png(\?v=[\d\.]+)*"/g, 'src="assets/images/ui/hunger_empty.png?v=6.0.4" width="14" height="14"');
html = html.replace(/src="assets\/images\/ui\/saturation_full\.png(\?v=[\d\.]+)*"/g, 'src="assets/images/ui/saturation_full.png?v=6.0.4" width="14" height="14"');
html = html.replace(/src="assets\/images\/ui\/saturation_half\.png(\?v=[\d\.]+)*"/g, 'src="assets/images/ui/saturation_half.png?v=6.0.4" width="14" height="14"');
html = html.replace(/src="assets\/images\/ui\/hunger_effect_full\.png(\?v=[\d\.]+)*"/g, 'src="assets/images/ui/hunger_effect_full.png?v=6.0.4" width="14" height="14"');
html = html.replace(/src="assets\/images\/ui\/hunger_effect_half\.png(\?v=[\d\.]+)*"/g, 'src="assets/images/ui/hunger_effect_half.png?v=6.0.4" width="14" height="14"');
html = html.replace(/src="assets\/images\/ui\/heart_full\.png(\?v=[\d\.]+)*"/g, 'src="assets/images/ui/heart_full.png?v=6.0.4" width="14" height="14"');
html = html.replace(/src="assets\/images\/ui\/heart_half\.png(\?v=[\d\.]+)*"/g, 'src="assets/images/ui/heart_half.png?v=6.0.4" width="14" height="14"');

// Clean up any double width or height attributes if they were already present
html = html.replace(/(width="14"\s*height="14"\s*)+width="14"\s*height="14"/g, 'width="14" height="14"');

fs.writeFileSync(p, html, 'utf8');
console.log('stellarity.html updated with cache-busted 14x14 icons!');
