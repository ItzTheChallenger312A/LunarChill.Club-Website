const sharp = require('sharp');

async function inspectUpload2() {
  const img = sharp('C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014147591_df4f88f1.png');
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  console.log('Upload 2 info:', info);
  const colors = {};
  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const a = data[i * 4 + 3];
    if (r < 20 && g < 20 && b < 20) continue;
    const key = `${r},${g},${b}`;
    colors[key] = (colors[key] || 0) + 1;
  }
  const sorted = Object.entries(colors).sort((a,b) => b[1] - a[1]);
  console.log('Upload 2 colors:', sorted.slice(0, 15));
}

inspectUpload2();
