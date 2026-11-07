const sharp = require('sharp');

async function inspectCenter() {
  const img = sharp('scratch/center_fluffy.png');
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  console.log('Center info:', info);
  const colors = {};
  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const a = data[i * 4 + 3];
    // ignore pure dark background (r < 20, g < 20, b < 20)
    if (r < 20 && g < 20 && b < 20) continue;
    const key = `${r},${g},${b}`;
    colors[key] = (colors[key] || 0) + 1;
  }
  console.log('Colors inside center box (total unique:', Object.keys(colors).length, ')');
  const sorted = Object.entries(colors).sort((a,b) => b[1] - a[1]);
  console.log(sorted.slice(0, 20));
}

inspectCenter();
