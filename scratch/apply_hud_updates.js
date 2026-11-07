const fs = require('fs');

const p = 'stellarity.html';
let html = fs.readFileSync(p, 'utf8');

const target1 = `              <li><strong>Lưu Ý Tro Tinh Tú (Starlight Soot):</strong> Với mọi công thức có Starlight Soot, <em>bắt buộc phải thả Soot vào CUỐI CÙNG</em>, nếu thả sớm vạc sẽ biến thành nước The Hallow (Consecration) và làm mất công thức nấu thuốc!</li>
            </ul>
          </div>

          <div class="item-recipe-grid">
            <!-- Cauldron 1: Golden Chorus Fruit -->`;

const replacement1 = `              <li><strong>Lưu Ý Tro Tinh Tú (Starlight Soot):</strong> Với mọi công thức có Starlight Soot, <em>bắt buộc phải thả Soot vào CUỐI CÙNG</em>, nếu thả sớm vạc sẽ biến thành nước The Hallow (Consecration) và làm mất công thức nấu thuốc!</li>
            </ul>
          </div>

          <!-- Cơ Chế Đói, Độ Bão Hòa & Hao Mòn Thể Lực (AppleSkin & Minecraft HUD Breakdown) -->
          <div class="hud-breakdown-panel">
            <div class="hud-breakdown-title">
              <img src="assets/images/ui/saturation_full.png" alt="Saturation Icon" class="hud-breakdown-title-icon">
              <span>Cơ Chế Ẩm Thực: Thức Ăn (Hunger), Độ Bão Hòa (Saturation) &amp; Kiệt Sức (Exhaustion)</span>
            </div>
            <div class="hud-breakdown-grid">
              <!-- Cột 1: Hunger -->
              <div class="hud-card">
                <div class="hud-card-header">
                  <span class="hud-card-name">
                    <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">
                    Độ Đói (Hunger Bar)
                  </span>
                  <span class="hud-card-badge">Tối đa 20 Điểm</span>
                </div>
                <div class="hud-card-icons">
                  <img src="assets/images/ui/hunger_full.png" alt="Full" class="mc-food-icon" title="Đùi gà đầy (2 điểm)">
                  <img src="assets/images/ui/hunger_half.png" alt="Half" class="mc-food-icon" title="Nửa đùi gà (1 điểm)">
                  <img src="assets/images/ui/hunger_empty.png" alt="Empty" class="mc-food-icon" title="Vỏ rỗng (0 điểm)">
                  <span style="font-size: 0.78rem; color: #a1a1aa; margin-left: 4px;">1 Đùi = 2 Điểm</span>
                </div>
                <p class="hud-card-desc">
                  Thanh thước đo sinh tồn chính. Đạt <strong>&ge; 18 điểm (9 đùi)</strong> để tự động hồi phục máu. Khi tụt về <strong>0 đùi</strong>, nhân vật sẽ mất máu liên tục vì chết đói.
                </p>
              </div>

              <!-- Cột 2: Saturation -->
              <div class="hud-card">
                <div class="hud-card-header">
                  <span class="hud-card-name">
                    <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon">
                    Độ Bão Hòa (Saturation)
                  </span>
                  <span class="hud-card-badge">AppleSkin HUD</span>
                </div>
                <div class="hud-card-icons">
                  <img src="assets/images/ui/saturation_full.png" alt="Full Saturation" class="mc-sat-icon" title="Đùi viền vàng ánh kim (AppleSkin)">
                  <img src="assets/images/ui/saturation_half.png" alt="Half Saturation" class="mc-sat-icon" title="Nửa đùi viền vàng">
                  <img src="assets/images/ui/saturation_outline_full.png" alt="Outline" class="mc-sat-icon" title="Lớp phủ Saturation Overlay">
                  <span style="font-size: 0.78rem; color: #fef08a; margin-left: 4px;">No Lâu Tiềm Ẩn</span>
                </div>
                <p class="hud-card-desc">
                  "Kho máu ngầm" bảo vệ thanh thức ăn. Mọi hành động chạy nhảy sẽ <strong>tiêu hao Saturation trước</strong>. Thức ăn có Saturation càng cao (như <em>Phở: 20</em>, <em>Thịt Enderman Nướng: 9.6</em>) thì càng giữ no siêu bền vững!
                </p>
              </div>

              <!-- Cột 3: Exhaustion -->
              <div class="hud-card">
                <div class="hud-card-header">
                  <span class="hud-card-name">
                    <img src="assets/images/ui/exhaustion_outline_full.png" alt="Exhaustion" class="mc-food-icon">
                    Kiệt Sức (Exhaustion)
                  </span>
                  <span class="hud-card-badge">0.0 – 4.0 Điểm</span>
                </div>
                <div class="hud-card-icons" style="flex-direction: column; align-items: flex-start; gap: 4px;">
                  <img src="assets/images/ui/exhaustion_bar.png" alt="Exhaustion Bar" class="mc-exhaustion-bar" title="Thước đo thể lực Exhaustion Bar">
                  <span style="font-size: 0.72rem; color: #a1a1aa;">Thanh tích lũy tiêu hao thể lực</span>
                </div>
                <p class="hud-card-desc">
                  Mỗi khi chạy nước rút, nhảy, đánh quái hay đào khoáng, Exhaustion sẽ tích lũy. Khi thước đo chạm mốc <strong>4.0 điểm</strong>, hệ thống sẽ trừ 1 điểm Saturation (hoặc Hunger).
                </p>
              </div>

              <!-- Cột 4: Hunger Effect -->
              <div class="hud-card">
                <div class="hud-card-header">
                  <span class="hud-card-name">
                    <img src="assets/images/ui/hunger_effect_full.png" alt="Hunger Debuff" class="mc-hunger-icon">
                    Hiệu Ứng Đói Khát (Hunger)
                  </span>
                  <span class="hud-card-badge" style="color: #f87171;">Debuff Độc</span>
                </div>
                <div class="hud-card-icons">
                  <img src="assets/images/ui/hunger_effect_full.png" alt="Hunger Debuff Full" class="mc-hunger-icon" title="Đùi xanh nhiễm độc">
                  <img src="assets/images/ui/hunger_effect_half.png" alt="Hunger Debuff Half" class="mc-hunger-icon" title="Nửa đùi xanh">
                  <span style="font-size: 0.78rem; color: #f87171; margin-left: 4px;">+0.005 Tích Lũy/Tick</span>
                </div>
                <p class="hud-card-desc">
                  Kích hoạt khi ăn thực phẩm sống nhiễm Hư Không như <strong>Enderman Flesh (80% dính)</strong> hay <strong>Shulker Body (30% dính)</strong>. Khiến thanh đói tụt dốc cực nhanh nếu không nấu chín khử độc!
                </p>
              </div>
            </div>
          </div>

          <div class="item-recipe-grid">
            <!-- Cauldron 1: Golden Chorus Fruit -->`;

console.log('Target1 found:', html.includes(target1));
if (html.includes(target1)) {
  html = html.replace(target1, replacement1);
  console.log('Target1 replaced successfully!');
} else {
  // Try CRLF normalize
  const normHtml = html.replace(/\r\n/g, '\n');
  const normTarget = target1.replace(/\r\n/g, '\n');
  if (normHtml.includes(normTarget)) {
    console.log('Found with normalized LF!');
    html = normHtml.replace(normTarget, replacement1.replace(/\r\n/g, '\n'));
  }
}

// 2. Enderman Flesh stats line
const targetEnderman = `<div class="item-stats-line">Hồi 4 thức ăn (2 đùi) · 0.8 Saturation · Dịch chuyển 8m · 80% Đói (Hunger) 40s</div>`;
const replaceEnderman = `<div class="item-stats-line">Hồi 4 thức ăn (2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) · 0.8 Saturation (<img src="assets/images/ui/saturation_half.png" alt="Saturation" class="mc-sat-icon">) · Dịch chuyển 8m · 80% Đói (<img src="assets/images/ui/hunger_effect_full.png" alt="Hunger Effect" class="mc-hunger-icon">) 40s</div>`;
html = html.replace(targetEnderman, replaceEnderman);

// 3. Grilled Enderman Flesh stats line
const targetGrilled = `<div class="item-stats-line">Chi phí Vạc: 1 Dragon's Breath · Hồi 6 thức ăn (3 đùi) & 9.6 Saturation · Nguyên liệu nấu Phở</div>`;
const replaceGrilled = `<div class="item-stats-line">Chi phí Vạc: 1 Dragon's Breath · Hồi 6 thức ăn (3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 9.6 Saturation (<img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon">) · Nguyên liệu nấu Phở</div>`;
html = html.replace(targetGrilled, replaceGrilled);

// 4. Phở (Pho) stats line
const targetPho = `<div class="item-stats-line">Chi phí Vạc: 4 Dragon's Breath · Hồi 13 thức ăn & 20 Saturation · Ăn khi no</div>`;
const replacePho = `<div class="item-stats-line">Chi phí Vạc: 4 Dragon's Breath · Hồi 13 thức ăn (6.5 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 20 Saturation (10 <img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon"> Full Cực Đại) · Ăn khi no</div>`;
html = html.replace(targetPho, replacePho);

// 5. Shulker Body stats line
const targetShulker = `<div class="item-stats-line">Hồi 4 thức ăn (2 đùi) · 0.8 Saturation · Dịch chuyển 16m · Ăn khi no · 30% Đói 40s</div>`;
const replaceShulker = `<div class="item-stats-line">Hồi 4 thức ăn (2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) · 0.8 Saturation (<img src="assets/images/ui/saturation_half.png" alt="Saturation" class="mc-sat-icon">) · Dịch chuyển 16m · Ăn khi no · 30% Đói (<img src="assets/images/ui/hunger_effect_full.png" alt="Hunger Effect" class="mc-hunger-icon">) 40s</div>`;
html = html.replace(targetShulker, replaceShulker);

// 6. Shepherd's Pie stats line
const targetPie = `<div class="item-stats-line">Nấu Vạc: 1 Breath · Dinh Dưỡng Cực Cao · No Lâu Dài</div>`;
const replacePie = `<div class="item-stats-line">Nấu Vạc: 1 Breath · Hồi 14 thức ăn (7 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 16.8 Saturation (<img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon">) · No Siêu Bền Vững</div>`;
html = html.replace(targetPie, replacePie);

// 7. Chorus Stew stats line
const targetStew = `<div class="item-stats-line">Chi phí Vạc: 2 Dragon's Breath · Ăn không bị dịch chuyển</div>`;
const replaceStew = `<div class="item-stats-line">Chi phí Vạc: 2 Dragon's Breath · Hồi 6 thức ăn (3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 7.2 Saturation · Ăn không bị dịch chuyển</div>`;
html = html.replace(targetStew, replaceStew);

// 8. Candied Chorus Fruit stats line
const targetCandied = `<div class="item-stats-line">Hồi 4 Điểm Đói (2 Đùi Gà) · Hồi Độ Bão Hòa Nhanh</div>`;
const replaceCandied = `<div class="item-stats-line">Hồi 4 thức ăn (2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 2.4 Saturation · Khóa tính năng dịch chuyển</div>`;
html = html.replace(targetCandied, replaceCandied);

// 9. Fried Chorus Fruit stats line
const targetFried = `<div class="item-stats-line">Hồi 6 Điểm Đói (3 Đùi Gà) · Hồi 7.2 Điểm Bão Hòa</div>`;
const replaceFried = `<div class="item-stats-line">Hồi 6 thức ăn (3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 7.2 Saturation (<img src="assets/images/ui/saturation_full.png" alt="Saturation" class="mc-sat-icon">) · Món Chiên Giòn</div>`;
html = html.replace(targetFried, replaceFried);

// 10. Frozen Carpaccio stats line
const targetCarpaccio = `<div class="item-stats-line">Hồi Máu Tức Thì · Kháng Lạnh Giá Buốt</div>`;
const replaceCarpaccio = `<div class="item-stats-line">Hồi 6 thức ăn (3 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 6.0 Saturation · Hồi Máu Tức Thì · Kháng Lạnh</div>`;
html = html.replace(targetCarpaccio, replaceCarpaccio);

// 11. Chorus Juice stats line
const targetJuice = `<div class="item-stats-line">Hồi 4 Điểm Đói · Thời Gian Uống Siêu Nhanh</div>`;
const replaceJuice = `<div class="item-stats-line">Hồi 4 thức ăn (2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">) &amp; 2.0 Saturation · Thời Gian Uống Siêu Nhanh</div>`;
html = html.replace(targetJuice, replaceJuice);

// 12. Also enhance Enderman description in Section 9
const targetEndermanDesc = `Tiêu thụ <strong>Enderman Flesh</strong> hồi phục <strong>4 điểm thức ăn (2 đùi gà)</strong> và <strong>0.8 điểm bão hòa</strong>, đồng thời <strong>dịch chuyển tức thời người chơi ngẫu nhiên tối đa 8 blocks</strong>`;
const replaceEndermanDesc = `Tiêu thụ <strong>Enderman Flesh</strong> hồi phục <strong>4 điểm thức ăn (2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">)</strong> và <strong>0.8 điểm bão hòa (<img src="assets/images/ui/saturation_half.png" alt="Saturation" class="mc-sat-icon">)</strong>, đồng thời <strong>dịch chuyển tức thời người chơi ngẫu nhiên tối đa 8 blocks</strong>`;
html = html.replace(targetEndermanDesc, replaceEndermanDesc);

// 13. Shulker Body description
const targetShulkerDesc = `Ăn vào hồi phục <strong>4 điểm thức ăn (2 đùi)</strong>, <strong>0.8 độ bão hòa</strong> và <strong>dịch chuyển tức thời ngẫu nhiên tối đa 16 blocks</strong>. Có <strong>30% tỷ lệ dính hiệu ứng Đói khát (Hunger)</strong>`;
const replaceShulkerDesc = `Ăn vào hồi phục <strong>4 điểm thức ăn (2 <img src="assets/images/ui/hunger_full.png" alt="Hunger" class="mc-food-icon">)</strong>, <strong>0.8 độ bão hòa (<img src="assets/images/ui/saturation_half.png" alt="Saturation" class="mc-sat-icon">)</strong> và <strong>dịch chuyển tức thời ngẫu nhiên tối đa 16 blocks</strong>. Có <strong>30% tỷ lệ dính hiệu ứng Đói khát (Hunger <img src="assets/images/ui/hunger_effect_full.png" alt="Hunger Debuff" class="mc-hunger-icon">)</strong>`;
html = html.replace(targetShulkerDesc, replaceShulkerDesc);

fs.writeFileSync(p, html, 'utf8');
console.log('Done applying all HUD updates to stellarity.html!');
