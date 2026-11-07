const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function testComposite() {
  const foodFull = 'scratch/food_full.png';
  const foodHalf = 'scratch/food_half.png';
  const satFull = 'scratch/dissected/sat_outline_full.png';
  const satHalf = 'scratch/dissected/sat_outline_half.png';

  // Composite food_full with sat_outline_full
  const compFull = await sharp(foodFull)
    .composite([{ input: satFull, blend: 'over' }])
    .png()
    .toBuffer();

  // Composite food_half with sat_outline_half
  const compHalf = await sharp(foodHalf)
    .composite([{ input: satHalf, blend: 'over' }])
    .png()
    .toBuffer();

  await sharp(compFull).resize(72, 72, { kernel: sharp.kernel.nearest }).toFile('scratch/test_comp_full_72.png');
  await sharp(compHalf).resize(72, 72, { kernel: sharp.kernel.nearest }).toFile('scratch/test_comp_half_72.png');

  console.log('Composites rendered!');
}

testComposite();
