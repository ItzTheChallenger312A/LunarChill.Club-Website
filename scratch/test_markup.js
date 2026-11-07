const html = `
              <!-- Harvester 5-Tier Evolution Progression -->
              <div class="harvester-evolution-section">
                <div class="specs-header-banner">
                  <span class="specs-header-title">Tiến Trình 5 Cấp Tiến Hóa (Tier 0 ➜ Tier 4)</span>
                  <span class="specs-header-sub">Hấp thụ linh hồn quái vật để tăng kích thước &amp; sát thương</span>
                </div>

                <div class="harvester-tiers-list">
                  <!-- Tier 0 -->
                  <div class="harvester-tier-card">
                    <div class="harvester-tier-sprite" data-mc-tooltip="Harvester - Tier 0">
                      <img src="assets/images/weapons/harvester_tier_0.png" alt="Harvester Tier 0" loading="lazy">
                    </div>
                    <div class="harvester-tier-details">
                      <div class="harvester-tier-title-row">
                        <span class="harvester-tier-badge">Tier 0</span>
                        <strong class="harvester-tier-name">Khởi Đầu (Fresh Blade)</strong>
                        <span class="harvester-tier-dmg dmg-tier-0">4 DMG</span>
                      </div>
                      <div class="harvester-tier-stats">
                        <span>Sát thương: <strong>4 (2 tim)</strong></span>
                        <span>Tốc đánh: <strong>1.0</strong></span>
                        <span>Phạt tốc: <strong>0%</strong></span>
                        <span>Độ bền: <strong>1562</strong> (Sửa: Băng Xanh)</span>
                      </div>
                      <p class="harvester-tier-lore">
                        &ldquo;Absorbs souls of slain mobs and permanently increases its size and damage. Certain souls imbue it with magical abilities.&rdquo;
                      </p>
                      <div class="harvester-tier-visual">Đại đao băng xám nguyên sơ, chưa hấp thụ linh hồn quái vật.</div>
                    </div>
                  </div>

                  <!-- Tier 1 -->
                  <div class="harvester-tier-card">
                    <div class="harvester-tier-sprite" data-mc-tooltip="Harvester - Tier 1">
                      <img src="assets/images/weapons/harvester_tier_1.png" alt="Harvester Tier 1" loading="lazy">
                    </div>
                    <div class="harvester-tier-details">
                      <div class="harvester-tier-title-row">
                        <span class="harvester-tier-badge">Tier 1</span>
                        <strong class="harvester-tier-name">Bộc Lộ (Awakening)</strong>
                        <span class="harvester-tier-dmg dmg-tier-1">7 DMG (+3)</span>
                      </div>
                      <div class="harvester-tier-stats">
                        <span>Sát thương: <strong>7 (3.5 tim)</strong></span>
                        <span>Tốc đánh: <strong>0.95</strong></span>
                        <span>Phạt tốc: <strong class="stat-penalty">-5%</strong></span>
                        <span>Độ bền: <strong>1562</strong></span>
                      </div>
                      <p class="harvester-tier-lore">
                        &ldquo;I'm telling you, it DOES GET EXTRA DAMAGE. You really didn't need to check.&rdquo;
                      </p>
                      <div class="harvester-tier-visual">Lưỡi đao phình to nhẹ, xuất hiện vệt ánh hồng tím đầu tiên dọc sống đao.</div>
                    </div>
                  </div>

                  <!-- Tier 2 -->
                  <div class="harvester-tier-card">
                    <div class="harvester-tier-sprite" data-mc-tooltip="Harvester - Tier 2">
                      <img src="assets/images/weapons/harvester_tier_2.png" alt="Harvester Tier 2" loading="lazy">
                    </div>
                    <div class="harvester-tier-details">
                      <div class="harvester-tier-title-row">
                        <span class="harvester-tier-badge">Tier 2</span>
                        <strong class="harvester-tier-name">Thì Thầm (Whispering)</strong>
                        <span class="harvester-tier-dmg dmg-tier-2">10 DMG (+6)</span>
                      </div>
                      <div class="harvester-tier-stats">
                        <span>Sát thương: <strong>10 (5 tim)</strong></span>
                        <span>Tốc đánh: <strong>0.9</strong></span>
                        <span>Phạt tốc: <strong class="stat-penalty">-10%</strong></span>
                        <span>Độ bền: <strong>1562</strong></span>
                      </div>
                      <p class="harvester-tier-lore">
                        &ldquo;It's whispering to you... It wants more. It's getting heavier with every soul it absorbs.&rdquo;
                      </p>
                      <div class="harvester-tier-visual">Ánh sáng tím lan tỏa rộng lên mũi kiếm, thanh đao bắt đầu trĩu nặng trên tay.</div>
                    </div>
                  </div>

                  <!-- Tier 3 -->
                  <div class="harvester-tier-card">
                    <div class="harvester-tier-sprite" data-mc-tooltip="Harvester - Tier 3">
                      <img src="assets/images/weapons/harvester_tier_3.png" alt="Harvester Tier 3" loading="lazy">
                    </div>
                    <div class="harvester-tier-details">
                      <div class="harvester-tier-title-row">
                        <span class="harvester-tier-badge">Tier 3</span>
                        <strong class="harvester-tier-name">Khát Vọng (Yearning)</strong>
                        <span class="harvester-tier-dmg dmg-tier-3">13 DMG (+9)</span>
                      </div>
                      <div class="harvester-tier-stats">
                        <span>Sát thương: <strong>13 (6.5 tim)</strong></span>
                        <span>Tốc đánh: <strong>0.8</strong></span>
                        <span>Phạt tốc: <strong class="stat-penalty">-15%</strong></span>
                        <span>Độ bền: <strong>1562</strong></span>
                      </div>
                      <p class="harvester-tier-lore">
                        &ldquo;But it is still far from done doing so. It's getting really heavy, yet it is still yearning for more.&rdquo;
                      </p>
                      <div class="harvester-tier-visual">Đại đao to lớn hùng vĩ, chuôi kiếm và toàn bộ ngạnh bảo vệ hóa tinh thể tím rực sáng.</div>
                    </div>
                  </div>

                  <!-- Tier 4 -->
                  <div class="harvester-tier-card tier-max">
                    <div class="harvester-tier-sprite" data-mc-tooltip="Harvester - Tier 4 (Cực Hạn)">
                      <img src="assets/images/weapons/harvester_tier_4.png" alt="Harvester Tier 4" loading="lazy">
                    </div>
                    <div class="harvester-tier-details">
                      <div class="harvester-tier-title-row">
                        <span class="harvester-tier-badge badge-max-tier">Tier 4 · MAX</span>
                        <strong class="harvester-tier-name highlight-purple">Cực Hạn (-273.15&deg;C)</strong>
                        <span class="harvester-tier-dmg dmg-tier-4">16 DMG (+12)</span>
                      </div>
                      <div class="harvester-tier-stats">
                        <span>Sát thương: <strong>16 (8 tim)</strong></span>
                        <span>Tốc đánh: <strong>0.75</strong></span>
                        <span>Phạt tốc: <strong class="stat-penalty">-20%</strong></span>
                        <span>Độ bền: <strong class="stat-unbreakable">Unbreakable (Bất tử)</strong></span>
                      </div>
                      <p class="harvester-tier-lore">
                        &ldquo;-273.15&deg;C: It is done growing in power, but it still has a taste for... a few specific souls. Even the grim power of this ice sword has its limits...&rdquo;
                      </p>
                      <div class="harvester-tier-visual highlight-frost-text">Đạt độ không tuyệt đối (-273.15&deg;C). Kích thước khổng lồ cực đại, hào quang linh hồn tím rực bao phủ trọn vẹn, không bao giờ bị phá hủy.</div>
                    </div>
                  </div>
                </div>
              </div>
`;
console.log('Valid test markup length:', html.length);
