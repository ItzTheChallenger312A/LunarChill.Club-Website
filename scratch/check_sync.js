const fs = require('fs');
const sharp = require('sharp');

async function checkSync() {
  const userPng = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794010553373_c0fdf17e.png';
  const upscaledBuffer = await sharp(userPng)
    .resize(64, 64, { kernel: 'nearest' })
    .png()
    .toBuffer();

  const foodBuf = fs.readFileSync('assets/images/foods/enderman_flesh.png');
  const ingBuf = fs.readFileSync('assets/images/ingredients/enderman_flesh.png');

  const { data: dUser } = await sharp(upscaledBuffer).raw().toBuffer({ resolveWithObject: true });
  const { data: dFood } = await sharp(foodBuf).raw().toBuffer({ resolveWithObject: true });
  const { data: dIng } = await sharp(ingBuf).raw().toBuffer({ resolveWithObject: true });

  console.log('User upscaled matches food?', dUser.equals(dFood));
  console.log('User upscaled matches ing?', dUser.equals(dIng));
  console.log('Food matches ing?', dFood.equals(dIng));
}

checkSync();
