const fs = require('fs');

const p = 'stellarity.html';
let html = fs.readFileSync(p, 'utf8');

// 1. Remove .hud-breakdown-panel
const hudRegex = /<!-- Cơ Chế Đói, Độ Bão Hòa & Hao Mòn Thể Lực \(AppleSkin & Minecraft HUD Breakdown\) -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
if (hudRegex.test(html)) {
  html = html.replace(hudRegex, '');
  console.log('Removed hud-breakdown-panel!');
} else {
  console.log('hud-breakdown-panel regex did not match, trying string search');
  const startIdx = html.indexOf('<!-- Cơ Chế Đói');
  const endIdx = html.indexOf('<div class="item-recipe-grid">', startIdx);
  if (startIdx !== -1 && endIdx !== -1) {
    html = html.slice(0, startIdx) + html.slice(endIdx);
    console.log('Removed hud-breakdown-panel by index slice!');
  }
}

// 2. Damage to [sát thương] (heart_icon)
const damageReplacements = [
  // Dragonblade
  {
    target: `Sát thương: 4.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (9 DMG)`,
    replace: `Sát thương: 4.5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  // Tamaris
  {
    target: `Sát thương: 3.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (7 DMG)`,
    replace: `Sát thương: 3.5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  // Harvester
  {
    target: `Sát thương: 2 ➜ 8 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (4 ➜ 16 DMG)`,
    replace: `Sát thương: 2 ➜ 8 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  {
    target: `gia tăng vĩnh viễn sát thương từ 2 lên tối đa 8 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (4 ➜ 16 DMG)`,
    replace: `gia tăng vĩnh viễn sát thương từ 2 lên tối đa 8 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  {
    target: `<span class="harvester-tier-dmg dmg-tier-0">2 Tim (4 DMG)</span>`,
    replace: `<span class="harvester-tier-dmg dmg-tier-0">2 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></span>`
  },
  {
    target: `<span>Sát thương: <strong>2 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (4 DMG)</strong></span>`,
    replace: `<span>Sát thương: <strong>2 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></strong></span>`
  },
  {
    target: `<span class="harvester-tier-dmg dmg-tier-1">3.5 Tim (7 DMG)</span>`,
    replace: `<span class="harvester-tier-dmg dmg-tier-1">3.5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></span>`
  },
  {
    target: `<span>Sát thương: <strong>3.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (7 DMG)</strong></span>`,
    replace: `<span>Sát thương: <strong>3.5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></strong></span>`
  },
  {
    target: `<span class="harvester-tier-dmg dmg-tier-2">5 Tim (10 DMG)</span>`,
    replace: `<span class="harvester-tier-dmg dmg-tier-2">5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></span>`
  },
  {
    target: `<span>Sát thương: <strong>5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (10 DMG)</strong></span>`,
    replace: `<span>Sát thương: <strong>5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></strong></span>`
  },
  {
    target: `<span class="harvester-tier-dmg dmg-tier-3">6.5 Tim (13 DMG)</span>`,
    replace: `<span class="harvester-tier-dmg dmg-tier-3">6.5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></span>`
  },
  {
    target: `<span>Sát thương: <strong>6.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (13 DMG)</strong></span>`,
    replace: `<span>Sát thương: <strong>6.5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></strong></span>`
  },
  {
    target: `<span class="harvester-tier-dmg dmg-tier-4">8 Tim (16 DMG)</span>`,
    replace: `<span class="harvester-tier-dmg dmg-tier-4">8 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></span>`
  },
  {
    target: `<span>Sát thương: <strong>8 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (16 DMG)</strong></span>`,
    replace: `<span>Sát thương: <strong>8 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></strong></span>`
  },
  // The Beginning & The End
  {
    target: `Sát thương: 2.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (5 DMG)`,
    replace: `Sát thương: 2.5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  // Starless Scythe
  {
    target: `Sát thương: 5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (10 DMG)`,
    replace: `Sát thương: 5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  // Stellar Striker
  {
    target: `Sát thương: 5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (10 DMG)`,
    replace: `Sát thương: 5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  {
    target: `mỗi sao gây <strong>4.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (9 DMG, gồm 3 tim nổ) với 50% xuyên giáp</strong>`,
    replace: `mỗi sao gây <strong>4.5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (gồm 3 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> nổ) với 50% xuyên giáp</strong>`
  },
  // Kaleidoscope
  {
    target: `Sát thương: 5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> cơ bản (Xả đòn 1.65 – 15 tim / 3.3 – 30 DMG)`,
    replace: `Sát thương: 5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> cơ bản (Xả đòn 1.65 – 15 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">)`
  },
  {
    target: `gây tới 15 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (30 DMG, 70% sát thương nổ lan)`,
    replace: `gây tới 15 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (70% sát thương nổ lan)`
  },
  // Prismatic Punch
  {
    target: `Sát thương: 3.5 – 5.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (7 – 11 DMG)`,
    replace: `Sát thương: 3.5 – 5.5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  // Prismember
  {
    target: `Sát thương: 4 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (8 DMG)`,
    replace: `Sát thương: 4 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  // Fluffy Hammer
  {
    target: `Sát thương: 7.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (15 DMG)`,
    replace: `Sát thương: 7.5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  // Sharanga
  {
    target: `Sát thương: 3.25 – 5.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (6.5 – 11 DMG)`,
    replace: `Sát thương: 3.25 – 5.5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  // Spectral Fury
  {
    target: `Sát thương: 4 – 6.25 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (8 – 12.5 DMG)`,
    replace: `Sát thương: 4 – 6.25 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  // Call of The Void
  {
    target: `mỗi mảnh gây <strong>2 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (4 DMG)</strong> diện rộng`,
    replace: `mỗi mảnh gây <strong>2 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></strong> diện rộng`
  },
  // Shulker Tools & Weapons
  {
    target: `+0.25 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (+0.5 DMG)`,
    replace: `+0.25 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart">`
  },
  // Empress of Light Boss rows
  {
    target: `<strong>13 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (26 DMG)</strong>`,
    replace: `<strong>13 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></strong>`
  },
  {
    target: `<strong>7 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (14 DMG, xuyên 15% giáp)</strong>`,
    replace: `<strong>7 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (xuyên 15% giáp)</strong>`
  },
  {
    target: `<strong>7 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (14 DMG, xuyên 10% giáp)</strong>`,
    replace: `<strong>7 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (xuyên 10% giáp)</strong>`
  },
  {
    target: `<strong>16 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (32 DMG, tăng tốc độ)</strong>`,
    replace: `<strong>16 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (tăng tốc độ)</strong>`
  },
  {
    target: `<strong>8 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (16 DMG, 1.5 block/tick)</strong>`,
    replace: `<strong>8 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (1.5 block/tick)</strong>`
  },
  {
    target: `<strong>8 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (16 DMG)</strong>`,
    replace: `<strong>8 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></strong>`
  },
  {
    target: `<strong>16 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (32 DMG, xuyên 30% giáp)</strong>`,
    replace: `<strong>16 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (xuyên 30% giáp)</strong>`
  },
  {
    target: `<strong>11 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (22 DMG, triệu hồi 10 kiếm)</strong>`,
    replace: `<strong>11 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (triệu hồi 10 kiếm)</strong>`
  },
  {
    target: `<strong>8.5–9 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (17–18 DMG, kèm cháy Prismatic Inferno)</strong>`,
    replace: `<strong>8.5–9 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (kèm cháy Prismatic Inferno)</strong>`
  },
  // Mobs
  {
    target: `<div class="item-stats-line">Máu: 20 tim (40 HP) · Sát thương: 3.5–5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (7–10 DMG) · Tốc độ dịch chuyển x1.5</div>`,
    replace: `<div class="item-stats-line">Máu: 20 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> · Sát thương: 3.5–5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> · Tốc độ dịch chuyển x1.5</div>`
  },
  {
    target: `<div class="item-stats-line">Máu: 20 tim (40 HP) · Sát thương: 4 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (8 DMG) · Kháng một phần sát thương Void</div>`,
    replace: `<div class="item-stats-line">Máu: 20 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (khi thuần hóa) · Sát thương: 4 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> · Kháng một phần sát thương Void</div>`
  },
  // Shields & Skills
  {
    target: `gây <strong>7 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (14 DMG)</strong>`,
    replace: `gây <strong>7 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"></strong>`
  },
  {
    target: `gây 3 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (6 DMG) nổ lan`,
    replace: `gây 3 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> nổ lan`
  },
  {
    target: `vụ nổ 7.5 tim chuẩn <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (15 DMG)`,
    replace: `vụ nổ 7.5 <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> chuẩn`
  }
];

let appliedDmg = 0;
for (const r of damageReplacements) {
  if (html.includes(r.target)) {
    html = html.replace(r.target, r.replace);
    appliedDmg++;
  } else {
    console.log('Dmg target not found:', r.target.slice(0, 40));
  }
}
console.log(`Applied ${appliedDmg} / ${damageReplacements.length} damage replacements`);

// 3. Update Food descriptions according to user template:
// "Cấu trúc mô tả thức ăn: Hồi [số] (hunger_points) và [số] (saturation_points). Scale cái hunger points ngang với hearts."
const foodReplacements = [
  // Food 2: Enderman Flesh
  {
    target: `<div class="item-stats-line">Hồi 4 thức ăn (2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) · 0.8 Saturation (<img src="assets/images/ui/saturation_half.png" alt="Saturation" class="mc-sat-icon">) · Dịch chuyển 8m · 80% Đói (<img src="assets/images/ui/hunger_effect_full.png" alt="Hunger Effect" class="mc-hunger-icon">) 40s</div>`,
    replace: `<div class="item-stats-line">Hồi 2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 0.8 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"> · Dịch chuyển 8m · 80% Đói (<img src="assets/images/ui/hunger_effect_full.png" alt="Hunger Effect" class="mc-hunger-icon">) 40s</div>`
  },
  {
    target: `Tiêu thụ <strong>Enderman Flesh</strong> hồi phục <strong>4 điểm thức ăn (2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">)</strong> và <strong>0.8 điểm bão hòa (<img src="assets/images/ui/saturation_half.png" alt="Saturation" class="mc-sat-icon">)</strong>, đồng thời`,
    replace: `Tiêu thụ <strong>Enderman Flesh</strong> hồi <strong>2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 0.8 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"></strong>, đồng thời`
  },
  // Cauldron 2: Grilled Enderman Flesh
  {
    target: `<div class="item-stats-line">Chi phí Vạc: 1 Dragon's Breath · Hồi 6 thức ăn (3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 9.6 Saturation (<img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon">) · Nguyên liệu nấu Phở</div>`,
    replace: `<div class="item-stats-line">Chi phí Vạc: 1 Dragon's Breath · Hồi 3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 9.6 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"> · Nguyên liệu nấu Phở</div>`
  },
  {
    target: `Cung cấp <strong>6 điểm thức ăn (3 đùi)</strong> và <strong>9.6 điểm bão hòa</strong>. Là nguyên liệu cốt lõi để nấu món <strong>Phở (Pho)</strong>.`,
    replace: `Hồi <strong>3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 9.6 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"></strong>. Là nguyên liệu cốt lõi để nấu món <strong>Phở (Pho)</strong>.`
  },
  // Cauldron 3: Phở (Pho)
  {
    target: `<div class="item-stats-line">Chi phí Vạc: 4 Dragon's Breath · Hồi 13 thức ăn (6.5 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 20 Saturation (10 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"> Full Cực Đại) · Ăn khi no</div>`,
    replace: `<div class="item-stats-line">Chi phí Vạc: 4 Dragon's Breath · Hồi 6.5 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 20 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"> · Ăn khi no</div>`
  },
  {
    target: `Hồi phục 13 điểm thức ăn, 20 điểm bão hòa (Saturation) và lượng lớn Máu hấp thụ (Absorption). Có thể ăn ngay cả khi thanh thức ăn đã đầy.`,
    replace: `Hồi <strong>6.5 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 20 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"></strong>, cùng lượng lớn Máu hấp thụ (Absorption). Có thể ăn ngay cả khi thanh thức ăn đã đầy.`
  },
  // Food 4: Shulker Body
  {
    target: `<div class="item-stats-line">Hồi 4 thức ăn (2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) · 0.8 Saturation (<img src="assets/images/ui/saturation_half.png" alt="Saturation" class="mc-sat-icon">) · Dịch chuyển 16m · Ăn khi no · 30% Đói (<img src="assets/images/ui/hunger_effect_full.png" alt="Hunger Effect" class="mc-hunger-icon">) 40s</div>`,
    replace: `<div class="item-stats-line">Hồi 2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 0.8 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"> · Dịch chuyển 16m · Ăn khi no · 30% Đói (<img src="assets/images/ui/hunger_effect_full.png" alt="Hunger Effect" class="mc-hunger-icon">) 40s</div>`
  },
  {
    target: `Ăn vào hồi phục <strong>4 điểm thức ăn (2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">)</strong>, <strong>0.8 độ bão hòa (<img src="assets/images/ui/saturation_half.png" alt="Saturation" class="mc-sat-icon">)</strong> và <strong>dịch chuyển tức thời ngẫu nhiên tối đa 16 blocks</strong>. Có <strong>30% tỷ lệ dính hiệu ứng Đói khát (Hunger <img src="assets/images/ui/hunger_effect_full.png" alt="Hunger Debuff" class="mc-hunger-icon">)</strong>`,
    replace: `Ăn vào hồi <strong>2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 0.8 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"></strong>, đồng thời <strong>dịch chuyển tức thời ngẫu nhiên tối đa 16 blocks</strong>. Có <strong>30% tỷ lệ dính hiệu ứng Đói khát (<img src="assets/images/ui/hunger_effect_full.png" alt="Hunger Debuff" class="mc-hunger-icon">)</strong>`
  },
  // Cauldron 5: Shepherd's Pie
  {
    target: `<div class="item-stats-line">Nấu Vạc: 1 Breath · Hồi 14 thức ăn (7 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 16.8 Saturation (<img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon">) · No Siêu Bền Vững</div>`,
    replace: `<div class="item-stats-line">Nấu Vạc: 1 Breath · Hồi 7 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 16.8 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"> · No Lâu Dài</div>`
  },
  // Cauldron 6: Chorus Stew
  {
    target: `<div class="item-stats-line">Chi phí Vạc: 2 Dragon's Breath · Hồi 6 thức ăn (3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 7.2 Saturation · Ăn không bị dịch chuyển</div>`,
    replace: `<div class="item-stats-line">Chi phí Vạc: 2 Dragon's Breath · Hồi 3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 7.2 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"> · Ăn không bị dịch chuyển</div>`
  },
  // Cauldron 9: Candied Chorus Fruit
  {
    target: `<div class="item-stats-line">Hồi 4 thức ăn (2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 2.4 Saturation · Khóa tính năng dịch chuyển</div>`,
    replace: `<div class="item-stats-line">Hồi 2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 2.4 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"> · Khóa tính năng dịch chuyển</div>`
  },
  // Cauldron 10: Fried Chorus Fruit
  {
    target: `<div class="item-stats-line">Hồi 6 thức ăn (3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 7.2 Saturation (<img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon">) · Món Chiên Giòn</div>`,
    replace: `<div class="item-stats-line">Hồi 3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 7.2 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"> · Món Chiên Giòn</div>`
  },
  // Cauldron 11: Frozen Carpaccio
  {
    target: `<div class="item-stats-line">Hồi 6 thức ăn (3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 6.0 Saturation · Hồi Máu Tức Thì · Kháng Lạnh</div>`,
    replace: `<div class="item-stats-line">Hồi 3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 6.0 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"> · Hồi Máu Tức Thì · Kháng Lạnh</div>`
  },
  // Cauldron 12: Chorus Juice
  {
    target: `<div class="item-stats-line">Hồi 4 thức ăn (2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 2.0 Saturation · Thời Gian Uống Siêu Nhanh</div>`,
    replace: `<div class="item-stats-line">Hồi 2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon"> và 2.0 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"> · Thời Gian Uống Siêu Nhanh</div>`
  }
];

let appliedFood = 0;
for (const r of foodReplacements) {
  if (html.includes(r.target)) {
    html = html.replace(r.target, r.replace);
    appliedFood++;
  } else {
    console.log('Food target not found:', r.target.slice(0, 40));
  }
}
console.log(`Applied ${appliedFood} / ${foodReplacements.length} food replacements`);

fs.writeFileSync(p, html, 'utf8');
console.log('Saved stellarity.html!');
