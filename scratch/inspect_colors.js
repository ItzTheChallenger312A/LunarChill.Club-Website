const sharp = require('sharp');

async function inspectColors() {
  const files = [
    ['media_1793986276119_c5496a99.png', 'c5496a99'],
    ['media_1793986276120_da66b581.png', 'da66b581'],
    ['media_1793986276123_c37d8771.png', 'c37d8771'],
    ['media_1793986276132_ac36849b.png', 'ac36849b'],
    ['media_1793986276162_91e80606.webp', '91e80606']
  ];
  for (const [f, l] of files) {
    const full = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/' + f;
    const stats = await sharp(full).stats();
    console.log(l, 'channels mean:', stats.channels.map(c => Math.round(c.mean)));
  }
}

inspectColors();
