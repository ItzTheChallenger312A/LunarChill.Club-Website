const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateAllAssets() {
  const userImgPath = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014419997_f9481a52.png';
  const uiDir = 'assets/images/ui';
  if (!fs.existsSync(uiDir)) fs.mkdirSync(uiDir, { recursive: true });

  // 1. Load vanilla textures
  const foodFullBuf = await sharp('scratch/food_full.png').raw().toBuffer({ resolveWithObject: true });
  const foodHalfBuf = await sharp('scratch/food_half.png').raw().toBuffer({ resolveWithObject: true });
  const foodEmptyBuf = await sharp('scratch/food_empty.png').raw().toBuffer({ resolveWithObject: true });
  const foodFullHungerBuf = await sharp('scratch/food_full_hunger.png').raw().toBuffer({ resolveWithObject: true });
  const foodHalfHungerBuf = await sharp('scratch/food_half_hunger.png').raw().toBuffer({ resolveWithObject: true });

  // 2. Extract overlays from user's image
  // Saturation full outline: x=26..34, y=0..8 (9x9)
  const satOutlineFullBuf = await sharp(userImgPath)
    .extract({ left: 26, top: 0, width: 9, height: 9 })
    .png()
    .toBuffer();

  // Saturation half outline: x=17..25, y=0..8 (9x9)
  const satOutlineHalfBuf = await sharp(userImgPath)
    .extract({ left: 17, top: 0, width: 9, height: 9 })
    .png()
    .toBuffer();

  // Red Exhaustion full outline: x=26..34, y=9..17 (9x9)
  const exhOutlineFullBuf = await sharp(userImgPath)
    .extract({ left: 26, top: 9, width: 9, height: 9 })
    .png()
    .toBuffer();

  // Red Exhaustion half outline: x=17..25, y=9..17 (9x9)
  const exhOutlineHalfBuf = await sharp(userImgPath)
    .extract({ left: 17, top: 9, width: 9, height: 9 })
    .png()
    .toBuffer();

  // Exhaustion bar: x=0..81, y=18..26 (81x9)
  const exhBarBuf = await sharp(userImgPath)
    .extract({ left: 0, top: 18, width: 81, height: 9 })
    .png()
    .toBuffer();

  // 3. Composite Food + Saturation
  const satFullCompBuf = await sharp('scratch/food_full.png')
    .composite([{ input: satOutlineFullBuf, blend: 'over' }])
    .png()
    .toBuffer();

  const satHalfCompBuf = await sharp('scratch/food_half.png')
    .composite([{ input: satOutlineHalfBuf, blend: 'over' }])
    .png()
    .toBuffer();

  // 4. Save 9x9 base files AND upscale files (upscaled 36x36 for crisp retina rendering)
  // Let's create an array of targets to save:
  const targets = [
    { name: 'hunger_full.png', buf: 'scratch/food_full.png' },
    { name: 'hunger_half.png', buf: 'scratch/food_half.png' },
    { name: 'hunger_empty.png', buf: 'scratch/food_empty.png' },
    { name: 'hunger_effect_full.png', buf: 'scratch/food_full_hunger.png' },
    { name: 'hunger_effect_half.png', buf: 'scratch/food_half_hunger.png' },
    { name: 'saturation_full.png', buf: satFullCompBuf },
    { name: 'saturation_half.png', buf: satHalfCompBuf },
    { name: 'saturation_outline_full.png', buf: satOutlineFullBuf },
    { name: 'saturation_outline_half.png', buf: satOutlineHalfBuf },
    { name: 'exhaustion_outline_full.png', buf: exhOutlineFullBuf },
    { name: 'exhaustion_outline_half.png', buf: exhOutlineHalfBuf },
    { name: 'exhaustion_bar.png', buf: exhBarBuf }
  ];

  for (const t of targets) {
    const filePath = path.join(uiDir, t.name);
    // Upscale 4x with Nearest Neighbor so pixel art is ultra sharp on 4K/Retina/Mobile screens!
    const meta = await sharp(t.buf).metadata();
    const upscaled = await sharp(t.buf)
      .resize(meta.width * 4, meta.height * 4, { kernel: sharp.kernel.nearest })
      .png()
      .toFile(filePath);
    console.log(`Saved ${t.name}: ${meta.width * 4}x${meta.height * 4}`);
  }
}

generateAllAssets();
