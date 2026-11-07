const sharp = require('sharp');
sharp('assets/images/ingredients/enderman_flesh.png').metadata().then(m => {
  console.log('ingredients/enderman_flesh.png metadata:', m);
});
