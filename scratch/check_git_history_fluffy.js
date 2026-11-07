const { execSync } = require('child_process');
const fs = require('fs');
const sharp = require('sharp');

// Get all commits that touched fluffy_hammer.png
const commits = execSync('git log --format="%H %s" -- assets/images/weapons/fluffy_hammer.png').toString().trim().split('\n');

async function testAllCommits() {
  for (const line of commits) {
    const [hash, ...rest] = line.split(' ');
    const msg = rest.join(' ');
    try {
      const buf = execSync(`git show ${hash}:assets/images/weapons/fluffy_hammer.png`);
      const meta = await sharp(buf).metadata();
      const { data } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
      let nonZero = 0;
      for (let i = 0; i < meta.width * meta.height; i++) {
        if (data[i * meta.channels + 3] > 10) nonZero++;
      }
      console.log(hash.substring(0, 7), meta.width + 'x' + meta.height, 'nonZero:', nonZero, msg);
    } catch(e) {
      console.log(hash.substring(0, 7), 'error:', e.message);
    }
  }
}

testAllCommits();
