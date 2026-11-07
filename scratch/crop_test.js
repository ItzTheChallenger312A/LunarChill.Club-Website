const sharp = require('sharp');

async function crop() {
  // In Upload 1 (917 x 472), the top image is roughly in the center top: x: 400-550, y: 180-360
  // Let's find where the non-black rectangle is in the top half
  const meta = await sharp('C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014043254_47c850e1.png').metadata();
  console.log('Metadata:', meta);
  
  // Crop the box around x: 420-530, y: 190-340
  await sharp('C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014043254_47c850e1.png')
    .extract({ left: 430, top: 190, width: 80, height: 140 })
    .toFile('scratch/user_crop1.png');
  console.log('Cropped user_crop1.png');
}

crop();
