const { execSync } = require('child_process');
const fs = require('fs');
const sharp = require('sharp');

const commits = execSync('git log --format="%H %s" -- assets/images/trinkets/radiant_jewel.png').toString().trim().split('\n');

async function testAllCommits() {
  for (const line of commits) {
    const [hash, ...rest] = line.split(' ');
    const msg = rest.join(' ');
    try {
      const buf = execSync(`git show ${hash}:assets/images/trinkets/radiant_jewel.png`);
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
