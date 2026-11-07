const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function fixUiImages() {
  const uiDir = 'assets/images/ui';

  // Vanilla 9x9 textures
  const foodFull = 'scratch/food_full.png'; // 9x9
  const foodHalf = 'scratch/food_half.png'; // 9x9
  const foodEmpty = 'scratch/food_empty.png'; // 9x9
  const foodFullHunger = 'scratch/food_full_hunger.png'; // 9x9
  const foodHalfHunger = 'scratch/food_half_hunger.png'; // 9x9

  // User image extracts (9x9)
  const userImgPath = 'C:/Users/The Challenger/.gemini/antigravity/brain/69412ce2-9209-47d0-9551-18763161ce5f/.user_uploaded/media_1794014419997_f9481a52.png';
  const satOutlineFull = await sharp(userImgPath).extract({ left: 26, top: 0, width: 9, height: 9 }).png().toBuffer();
  const satOutlineHalf = await sharp(userImgPath).extract({ left: 17, top: 0, width: 9, height: 9 }).png().toBuffer();

  const satFullComp = await sharp(foodFull).composite([{ input: satOutlineFull, blend: 'over' }]).png().toBuffer();
  const satHalfComp = await sharp(foodHalf).composite([{ input: satOutlineHalf, blend: 'over' }]).png().toBuffer();

  // Save them as 14x14 OR 18x18 OR 9x9?
  // If we save them as 18x18 (2x scale of 9x9) or 14x14 or 9x9:
  // If 14x14: width=14, height=14 matches EXACTLY the 14px slot!
  // Let's check 14x14:
  // Wait, if an image is 9x9 and we upscale it to 14x14, 14/9 is not an integer so pixel boundaries might be slightly uneven.
  // What if it is 9x9, or 18x18, with width="14" height="14" in HTML?
  // If the file is 9x9, its natural size is 9x9 (tiny!).
  // Wait! Let's check: why not save at 14x14 or 9x9?
  // Let's check what 14x14 looks like:
  const sat14 = await sharp(satFullComp).resize(14, 14, { kernel: sharp.kernel.nearest }).png().toBuffer();
  const food14 = await sharp(foodFull).resize(14, 14, { kernel: sharp.kernel.nearest }).png().toBuffer();

  // Let's inspect food_full at 9x9 vs 14x14 vs 18x18
  console.log('satFullComp is 9x9:', (await sharp(satFullComp).metadata()).width);
  
  // If we save at 14x14:
  // Intrinsic size = 14px!
  // HTML width="14" height="14" = 14px!
  // CSS width: 14px, height: 14px = 14px!
  // There is NO WAY it can ever be bigger than 14px under any circumstance!
  
  const files14 = [
    { name: 'hunger_full.png', input: foodFull },
    { name: 'hunger_half.png', input: foodHalf },
    { name: 'hunger_empty.png', input: foodEmpty },
    { name: 'hunger_effect_full.png', input: foodFullHunger },
    { name: 'hunger_effect_half.png', input: foodHalfHunger },
    { name: 'saturation_full.png', input: satFullComp },
    { name: 'saturation_half.png', input: satHalfComp },
    { name: 'saturation_outline_full.png', input: satOutlineFull },
    { name: 'saturation_outline_half.png', input: satOutlineHalf }
  ];

  for (const f of files14) {
    const p = path.join(uiDir, f.name);
    // Resize to 14x14 Nearest Neighbor
    await sharp(f.input)
      .resize(14, 14, { kernel: sharp.kernel.nearest })
      .png()
      .toFile(p);
    console.log(`Saved ${f.name} at 14x14 px`);
  }
}

fixUiImages();
