const sharp = require('sharp');
const fs = require('fs');

async function checkShulker() {
  const currentPath = 'assets/images/entities/shulker.png';
  const userPath = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794008710633_62a82acf.png';

  console.log('Current on disk exists:', fs.existsSync(currentPath));
  const currentMeta = await sharp(currentPath).metadata();
  console.log('Current shulker.png:', currentMeta.width, 'x', currentMeta.height, 'size:', fs.statSync(currentPath).size);

  console.log('User image exists:', fs.existsSync(userPath));
  const userMeta = await sharp(userPath).metadata();
  console.log('User shulker image:', userMeta.width, 'x', userMeta.height, 'size:', fs.statSync(userPath).size);

  // Check if current is equal to user
  const bufCurrent = fs.readFileSync(currentPath);
  const bufUser = fs.readFileSync(userPath);
  console.log('Byte-for-byte identical?', bufCurrent.equals(bufUser));
}

checkShulker();
