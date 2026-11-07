const sharp = require('sharp');
const fs = require('fs');

async function inspectBoth() {
  const userPath = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794008710633_62a82acf.png';
  const currentPath = 'assets/images/entities/shulker.png';

  const userImg = sharp(userPath);
  const userMeta = await userImg.metadata();
  const { data: userData } = await userImg.raw().toBuffer({ resolveWithObject: true });

  console.log('User image hasAlpha:', userMeta.hasAlpha, 'channels:', userMeta.channels);
  // Check corner pixels of user image
  console.log('User top-left pixel (0,0):', userData[0], userData[1], userData[2], userData[3]);

  const currentImg = sharp(currentPath);
  const currentMeta = await currentImg.metadata();
  const { data: currentData } = await currentImg.raw().toBuffer({ resolveWithObject: true });
  console.log('Current image hasAlpha:', currentMeta.hasAlpha, 'channels:', currentMeta.channels);
  console.log('Current top-left pixel (0,0):', currentData[0], currentData[1], currentData[2], currentData[3]);
}

inspectBoth();
