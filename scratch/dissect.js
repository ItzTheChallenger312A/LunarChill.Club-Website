const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function dissectUserImage() {
  const p = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014419997_f9481a52.png';
  const outDir = 'scratch/dissected';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Golden Saturation Outlines (y=0..8)
  // Let's examine:
  // Full saturation outline: x=26..34, y=0..8 (9x9)
  await sharp(p)
    .extract({ left: 26, top: 0, width: 9, height: 9 })
    .png()
    .toFile(path.join(outDir, 'sat_outline_full.png'));
  
  // Half saturation outline: x=17..25, y=0..8 (9x9)
  await sharp(p)
    .extract({ left: 17, top: 0, width: 9, height: 9 })
    .png()
    .toFile(path.join(outDir, 'sat_outline_half.png'));

  // Quarter / small saturation: x=8..16, y=0..8 (9x9)
  await sharp(p)
    .extract({ left: 8, top: 0, width: 9, height: 9 })
    .png()
    .toFile(path.join(outDir, 'sat_outline_quarter.png'));

  // Bone only: x=0..8, y=0..8 (9x9)
  await sharp(p)
    .extract({ left: 0, top: 0, width: 9, height: 9 })
    .png()
    .toFile(path.join(outDir, 'sat_outline_bone.png'));

  // 2. Red Exhaustion Outlines (y=9..17)
  await sharp(p)
    .extract({ left: 26, top: 9, width: 9, height: 9 })
    .png()
    .toFile(path.join(outDir, 'exhaustion_outline_full.png'));
  
  await sharp(p)
    .extract({ left: 17, top: 9, width: 9, height: 9 })
    .png()
    .toFile(path.join(outDir, 'exhaustion_outline_half.png'));

  // 3. Exhaustion Bar (y=18..26, x=0..81)
  await sharp(p)
    .extract({ left: 0, top: 18, width: 81, height: 9 })
    .png()
    .toFile(path.join(outDir, 'exhaustion_bar_full.png'));

  // Single cell of exhaustion bar (9x9)
  await sharp(p)
    .extract({ left: 0, top: 18, width: 9, height: 9 })
    .png()
    .toFile(path.join(outDir, 'exhaustion_bar_cell.png'));

  // 4. Row 3: Hunger with Saturation icons (y=27..33)
  // Let's extract 9x9 containing each of the 4 icons (or exact bounds)
  // Let's see: icon 0 is around x=0..6, icon 1 is x=7..13, icon 2 is x=14..20, icon 3 is x=21..27, icon 4 is x=28..34
  // Let's extract from y=27, height=7 (or height=9 with padding)
  for (let i = 0; i < 5; i++) {
    const left = i * 7;
    await sharp(p)
      .extract({ left, top: 27, width: 7, height: 7 })
      .png()
      .toFile(path.join(outDir, `row3_icon_${i}.png`));
  }

  // 5. Row 4: Hunger with Red Exhaustion icons (y=34..40)
  for (let i = 0; i < 5; i++) {
    const left = i * 7;
    await sharp(p)
      .extract({ left, top: 34, width: 7, height: 7 })
      .png()
      .toFile(path.join(outDir, `row4_icon_${i}.png`));
  }

  console.log('All slices extracted successfully!');
}

dissectUserImage();
