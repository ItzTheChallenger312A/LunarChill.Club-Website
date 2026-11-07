const sharp = require('sharp');

async function verify() {
  const meta = await sharp('scratch/new_shulker_512.png').metadata();
  console.log('New shulker meta:', meta);

  const { data, info } = await sharp('scratch/new_shulker_512.png').raw().toBuffer({ resolveWithObject: true });
  // check corner pixels
  console.log('Top-left (0,0):', data[0], data[1], data[2], data[3]);
  console.log('Top-right (511,0):', data[(511)*4], data[(511)*4+1], data[(511)*4+2], data[(511)*4+3]);

  // check if there are non-transparent pixels
  let nonZero = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i+3] > 0) nonZero++;
  }
  console.log('Non-zero alpha pixels:', nonZero, 'Total:', info.width * info.height);
}
verify();
