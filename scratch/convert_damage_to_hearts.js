const fs = require('fs');

const p = 'stellarity.html';
let html = fs.readFileSync(p, 'utf8');

// Let's create an array of replacements:
const replacements = [
  // 1. Dragonblade
  {
    target: `<div class="item-stats-line">Sát thương: 9 (4.5 tim) · Tốc đánh: 1.1 · Độ bền: Bất tử (Unbreakable)</div>`,
    replace: `<div class="item-stats-line">Sát thương: 4.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (9 DMG) · Tốc đánh: 1.1 · Độ bền: Bất tử (Unbreakable)</div>`
  },
  // 2. Tamaris
  {
    target: `<div class="item-stats-line">Sát thương: 7 (3.5 tim) · Tốc đánh: 1.6 · Độ bền: 1561 · Sửa bằng Netherite Ingot</div>`,
    replace: `<div class="item-stats-line">Sát thương: 3.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (7 DMG) · Tốc đánh: 1.6 · Độ bền: 1561 · Sửa bằng Netherite Ingot</div>`
  },
  // 3. Harvester
  {
    target: `<div class="item-stats-line">Sát thương: 4 ➜ 16 (Max +12) · Tốc đánh: 1.0 ➜ 0.75 · Tốc chạy: 0% ➜ -20% · Độ bền: 1562 / Unbreakable</div>`,
    replace: `<div class="item-stats-line">Sát thương: 2 ➜ 8 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (4 ➜ 16 DMG) · Tốc đánh: 1.0 ➜ 0.75 · Tốc chạy: 0% ➜ -20% · Độ bền: 1562 / Unbreakable</div>`
  },
  {
    target: `gia tăng vĩnh viễn sát thương từ 4 lên tối đa 16`,
    replace: `gia tăng vĩnh viễn sát thương từ 2 lên tối đa 8 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (4 ➜ 16 DMG)`
  },
  // Harvester Tier Badges & Stats
  {
    target: `<span class="harvester-tier-dmg dmg-tier-0">4 DMG</span>`,
    replace: `<span class="harvester-tier-dmg dmg-tier-0">2 Tim (4 DMG)</span>`
  },
  {
    target: `<span>Sát thương: <strong>4 (2 tim)</strong></span>`,
    replace: `<span>Sát thương: <strong>2 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (4 DMG)</strong></span>`
  },
  {
    target: `<span class="harvester-tier-dmg dmg-tier-1">7 DMG (+3)</span>`,
    replace: `<span class="harvester-tier-dmg dmg-tier-1">3.5 Tim (7 DMG)</span>`
  },
  {
    target: `<span>Sát thương: <strong>7 (3.5 tim)</strong></span>`,
    replace: `<span>Sát thương: <strong>3.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (7 DMG)</strong></span>`
  },
  {
    target: `<span class="harvester-tier-dmg dmg-tier-2">10 DMG (+6)</span>`,
    replace: `<span class="harvester-tier-dmg dmg-tier-2">5 Tim (10 DMG)</span>`
  },
  {
    target: `<span>Sát thương: <strong>10 (5 tim)</strong></span>`,
    replace: `<span>Sát thương: <strong>5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (10 DMG)</strong></span>`
  },
  {
    target: `<span class="harvester-tier-dmg dmg-tier-3">13 DMG (+9)</span>`,
    replace: `<span class="harvester-tier-dmg dmg-tier-3">6.5 Tim (13 DMG)</span>`
  },
  {
    target: `<span>Sát thương: <strong>13 (6.5 tim)</strong></span>`,
    replace: `<span>Sát thương: <strong>6.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (13 DMG)</strong></span>`
  },
  {
    target: `<span class="harvester-tier-dmg dmg-tier-4">16 DMG (+12)</span>`,
    replace: `<span class="harvester-tier-dmg dmg-tier-4">8 Tim (16 DMG)</span>`
  },
  {
    target: `<span>Sát thương: <strong>16 (8 tim)</strong></span>`,
    replace: `<span>Sát thương: <strong>8 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (16 DMG)</strong></span>`
  },
  // 4. The Beginning and The End
  {
    target: `<div class="item-stats-line">Sát thương: 5 (2.5 tim) · Tốc đánh: 2.0 · Độ bền: 496 · Sửa bằng Netherite Ingot</div>`,
    replace: `<div class="item-stats-line">Sát thương: 2.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (5 DMG) · Tốc đánh: 2.0 · Độ bền: 496 · Sửa bằng Netherite Ingot</div>`
  },
  // 5. Starless Scythe
  {
    target: `<div class="item-stats-line">Sát thương: 10 (5 tim) · Tốc đánh: 0.9 · Độ bền: 1232 · Sửa bằng Netherite Ingot</div>`,
    replace: `<div class="item-stats-line">Sát thương: 5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (10 DMG) · Tốc đánh: 0.9 · Độ bền: 1232 · Sửa bằng Netherite Ingot</div>`
  },
  // 6. Stellar Striker
  {
    target: `<div class="item-stats-line">Sát thương: 10 (5 tim) · Tốc đánh: 0.9 · Độ bền: 2031 · Sửa bằng Netherite Ingot</div>`,
    replace: `<div class="item-stats-line">Sát thương: 5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (10 DMG) · Tốc đánh: 0.9 · Độ bền: 2031 · Sửa bằng Netherite Ingot</div>`
  },
  {
    target: `mỗi sao gây <strong>9 sát thương (6 sát thương nổ với 50% xuyên giáp)</strong>`,
    replace: `mỗi sao gây <strong>4.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (9 DMG, gồm 3 tim nổ với 50% xuyên giáp)</strong>`
  },
  // 7. Kaleidoscope
  {
    target: `<div class="item-stats-line">Sát thương: 10 cơ bản (Xả đòn 3.3 – 30) · Tốc đánh: 0.8 · Độ bền: Bất tử (Unbreakable)</div>`,
    replace: `<div class="item-stats-line">Sát thương: 5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> cơ bản (Xả đòn 1.65 – 15 tim / 3.3 – 30 DMG) · Tốc đánh: 0.8 · Độ bền: Bất tử (Unbreakable)</div>`
  },
  {
    target: `gây tới 30 sát thương (70% sát thương nổ lan)`,
    replace: `gây tới 15 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (30 DMG, 70% sát thương nổ lan)`
  },
  // 8. Prismatic Punch
  {
    target: `<div class="item-stats-line">Sát thương: 7 – 11 · Độ bền: 365 · Tốc độ đạn 120 block/s</div>`,
    replace: `<div class="item-stats-line">Sát thương: 3.5 – 5.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (7 – 11 DMG) · Độ bền: 365 · Tốc độ đạn 120 block/s</div>`
  },
  // 9. Prismember
  {
    target: `<div class="item-stats-line">Sát thương: 8 (4 tim) · Tốc đánh: 1.6 · Độ bền: 2031 · Sửa bằng Netherite Ingot</div>`,
    replace: `<div class="item-stats-line">Sát thương: 4 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (8 DMG) · Tốc đánh: 1.6 · Độ bền: 2031 · Sửa bằng Netherite Ingot</div>`
  },
  // 10. Fluffy Hammer of Justice
  {
    target: `<div class="item-stats-line">Sát thương: 15 (7.5 tim) · Tốc đánh: 0.2 · Độ bền: 1562</div>`,
    replace: `<div class="item-stats-line">Sát thương: 7.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (15 DMG) · Tốc đánh: 0.2 · Độ bền: 1562</div>`
  },
  // 11. Sharanga
  {
    target: `<div class="item-stats-line">Sát thương: 6.5 – 11 · Độ bền: 385 · 25% Giữ lại mũi tên</div>`,
    replace: `<div class="item-stats-line">Sát thương: 3.25 – 5.5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (6.5 – 11 DMG) · Độ bền: 385 · 25% Giữ lại mũi tên</div>`
  },
  // 12. Spectral Fury
  {
    target: `<div class="item-stats-line">Sát thương: 8 – 12.5 · Độ bền: 636 · Sửa bằng Cung thông thường</div>`,
    replace: `<div class="item-stats-line">Sát thương: 4 – 6.25 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (8 – 12.5 DMG) · Độ bền: 636 · Sửa bằng Cung thông thường</div>`
  },
  // 13. Call of The Void
  {
    target: `mỗi mảnh gây <strong>4 sát thương (2 tim)</strong> diện rộng.`,
    replace: `mỗi mảnh gây <strong>2 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (4 DMG)</strong> diện rộng.`
  },
  // 14. Shulker Tools & Weapons
  {
    target: `<div class="item-stats-line">Bộ 6 món: Kiếm, Giáo, Rìu, Cúp, Xẻng, Cuốc · +0.5 Sát thương · Độ bền: 2701</div>`,
    replace: `<div class="item-stats-line">Bộ 6 món: Kiếm, Giáo, Rìu, Cúp, Xẻng, Cuốc · +0.25 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (+0.5 DMG) · Độ bền: 2701</div>`
  },
  // 15. Empress of Light Boss Stats (Mục 4)
  {
    target: `<div class="specs-row"><span>Sát thương Dash</span><strong>26 Sát thương</strong></div>`,
    replace: `<div class="specs-row"><span>Sát thương Dash</span><strong>13 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (26 DMG)</strong></div>`
  },
  {
    target: `<div class="specs-row"><span>Ethereal Lance</span><strong>14 Sát thương (xuyên 15% giáp)</strong></div>`,
    replace: `<div class="specs-row"><span>Ethereal Lance</span><strong>7 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (14 DMG, xuyên 15% giáp)</strong></div>`
  },
  {
    target: `<div class="specs-row"><span>Prismatic Bolts</span><strong>14 Sát thương (xuyên 10% giáp)</strong></div>`,
    replace: `<div class="specs-row"><span>Prismatic Bolts</span><strong>7 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (14 DMG, xuyên 10% giáp)</strong></div>`
  },
  {
    target: `<div class="specs-row highlight-max"><span>Sát thương Dash</span><strong>32 Sát thương (Tăng tốc độ)</strong></div>`,
    replace: `<div class="specs-row highlight-max"><span>Sát thương Dash</span><strong>16 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (32 DMG, tăng tốc độ)</strong></div>`
  },
  {
    target: `<div class="specs-row"><span>Ethereal Lance</span><strong>16 Sát thương (tốc độ bay 1.5 block/tick)</strong></div>`,
    replace: `<div class="specs-row"><span>Ethereal Lance</span><strong>8 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (16 DMG, 1.5 block/tick)</strong></div>`
  },
  {
    target: `<div class="specs-row"><span>Prismatic Bolts</span><strong>16 Sát thương</strong></div>`,
    replace: `<div class="specs-row"><span>Prismatic Bolts</span><strong>8 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (16 DMG)</strong></div>`
  },
  {
    target: `<div class="specs-row highlight-max"><span>Sát thương Dash</span><strong>32 Sát thương (Xuyên 30% giáp, kèm Lance/Bolt)</strong></div>`,
    replace: `<div class="specs-row highlight-max"><span>Sát thương Dash</span><strong>16 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (32 DMG, xuyên 30% giáp)</strong></div>`
  },
  {
    target: `<div class="specs-row"><span>Ethereal Lance</span><strong>22 Sát thương (triệu hồi thêm 10 kiếm, xuyên 33% giáp)</strong></div>`,
    replace: `<div class="specs-row"><span>Ethereal Lance</span><strong>11 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (22 DMG, triệu hồi 10 kiếm)</strong></div>`
  },
  {
    target: `<div class="specs-row"><span>Prismatic Bolts</span><strong>17–18 Sát thương, kèm cháy Prismatic Inferno</strong></div>`,
    replace: `<div class="specs-row"><span>Prismatic Bolts</span><strong>8.5–9 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (17–18 DMG, kèm cháy Prismatic Inferno)</strong></div>`
  },
  // 16. Mobs
  {
    target: `<div class="item-stats-line">Máu: 40 HP · Sát thương: 7–10 · Tốc độ dịch chuyển x1.5</div>`,
    replace: `<div class="item-stats-line">Máu: 20 tim (40 HP) · Sát thương: 3.5–5 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (7–10 DMG) · Tốc độ dịch chuyển x1.5</div>`
  },
  {
    target: `<div class="item-stats-line">Máu: 40 HP (khi thuần hóa) · Sát thương: 8 · Kháng một phần sát thương Void</div>`,
    replace: `<div class="item-stats-line">Máu: 20 tim (40 HP) · Sát thương: 4 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (8 DMG) · Kháng một phần sát thương Void</div>`
  },
  // 17. Shields / Skills
  {
    target: `kích hoạt nổ chấn động AoE bán kính 4 khối gây <strong>14 sát thương</strong>`,
    replace: `kích hoạt nổ chấn động AoE bán kính 4 khối gây <strong>7 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (14 DMG)</strong>`
  },
  {
    target: `gây 6 sát thương nổ lan.`,
    replace: `gây 3 tim <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (6 DMG) nổ lan.`
  },
  {
    target: `vụ nổ 15 sát thương chuẩn`,
    replace: `vụ nổ 7.5 tim chuẩn <img src="assets/images/ui/heart_full.png" alt="Heart" class="mc-heart"> (15 DMG)`
  }
];

let applied = 0;
for (const r of replacements) {
  if (html.includes(r.target)) {
    html = html.replace(r.target, r.replace);
    applied++;
  } else {
    console.log('Target NOT found:', r.target.slice(0, 50));
  }
}

fs.writeFileSync(p, html, 'utf8');
console.log(`Successfully applied ${applied} / ${replacements.length} damage-to-hearts replacements!`);
