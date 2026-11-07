const sharp = require('sharp');
const fs = require('fs');

const files = [
  'media_1793986276119_c5496a99.png',
  'media_1793986276120_da66b581.png',
  'media_1793986276123_c37d8771.png',
  'media_1793986276132_ac36849b.png',
  'media_1793986276162_91e80606.webp'
];

async function check() {
  for (const f of files) {
    const full = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/' + f;
    const meta = await sharp(full).metadata();
    console.log(f, meta.width, 'x', meta.height, meta.format);
  }
}

check();
