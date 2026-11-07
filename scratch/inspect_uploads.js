const sharp = require('sharp');

async function inspectUserUploads() {
  const meta1 = await sharp('C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014043254_47c850e1.png').metadata();
  console.log('Upload 1:', meta1.width, 'x', meta1.height);

  const meta2 = await sharp('C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014147591_df4f88f1.png').metadata();
  console.log('Upload 2:', meta2.width, 'x', meta2.height);
}

inspectUserUploads();
