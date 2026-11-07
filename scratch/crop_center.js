const sharp = require('sharp');

async function cropCenter() {
  await sharp('C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014043254_47c850e1.png')
    .extract({ left: 440, top: 90, width: 80, height: 80 })
    .png()
    .toFile('scratch/center_fluffy.png');
  console.log('Cropped center_fluffy.png');
}

cropCenter();
