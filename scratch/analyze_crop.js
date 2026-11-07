const sharp = require('sharp');

async function analyzeCrop() {
  const img = sharp('scratch/user_crop1.png');
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  console.log('Info:', info);
  // find unique colors and their counts
  const colors = {};
  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const a = data[i * 4 + 3];
    const key = `${r},${g},${b},${a}`;
    colors[key] = (colors[key] || 0) + 1;
  }
  const sorted = Object.entries(colors).sort((a,b) => b[1] - a[1]);
  console.log('Top colors:', sorted.slice(0, 15));
}

analyzeCrop();
