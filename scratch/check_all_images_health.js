const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function checkAllImages(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!entry.startsWith('.') && entry !== 'node_modules') {
        await checkAllImages(full);
      }
    } else if (entry.endsWith('.png') || entry.endsWith('.webp')) {
      try {
        const meta = await sharp(full).metadata();
        const { data } = await sharp(full).raw().toBuffer({ resolveWithObject: true });
        let nonZero = 0;
        const total = meta.width * meta.height;
        for (let i = 0; i < total; i++) {
          if (data[i * meta.channels + (meta.channels - 1)] > 10) nonZero++;
        }
        const pct = (nonZero / total) * 100;
        // If 64x64 and nonZero < 600, or pct < 15%
        if (pct < 15 && total >= 256) {
          console.warn(`[POTENTIAL HOLLOW IMAGE] ${full}: ${meta.width}x${meta.height}, nonZero: ${nonZero}/${total} (${pct.toFixed(1)}%)`);
        }
      } catch (err) {
        console.error(`Error reading ${full}:`, err.message);
      }
    }
  }
}

checkAllImages('assets/images');
