# LunarChill.Club — Dev's Notes

> Ghi chép kỹ thuật, nhật ký phát triển, các quyết định kiến trúc giao diện và lưu ý vận hành dành cho Ban Quản Trị & Nhà phát triển website LunarChill.Club.

---

## 📌 Thông tin tài liệu

- **Dự án:** Website chính thức LunarChill.Club
- **Tập tin:** `docs/04 - Feedbacks/Dev's Notes.md`
- **Khởi tạo:** 04/11/2026
- **Trạng thái:** Đã deploy lên Vercel, domain có sẵn, đợi xác thực, tiến hành sang công đoạn liên tục cải thiện trang web.
- **Tech Stack:** Vanilla HTML5, Modern CSS3 (GPU-accelerated, Pixel Voxel Architecture), Vanilla JavaScript (ES6+ Modules)

---

## 1. Kiến trúc Bố cục Mở đầu (Hero & Server Portal)

Giao diện đầu trang được thiết kế theo cấu trúc **2 tầng chuyển tiếp tự nhiên (Natural World Divider)**:

### 1.1. Tầng 1: Hero Căn Giữa & Góc Cắm Trại Đêm (The Campsite Horizon)
- **Định hướng thị giác:** Loại bỏ hoàn toàn bố cục 2 cột lặp logo, gom thông điệp vào trung tâm (Center Stage) tạo cảm giác không gian vũ trụ tĩnh lặng (*Cosmic Sanctuary*).
- **Slogan cốt lõi:** *"Chill thôi, đừng có vội. 🌙"* & *"Just chill, don't rush."*.
- **Ranh giới chuyển tầng (Campsite Divider):**
  - Sử dụng asset texture pixel gốc trích xuất từ Minecraft: khối cỏ `grass_block_side.png`, lớp đất `dirt.png`, đế củi lửa trại isometric `campfire_log_base.png`, đốm lửa bập bùng `campfire_fire.png`, đèn lồng `item_lantern.png`, ghế gỗ `oak_log.png`.
  - **Hoạt ảnh chuyển động tĩnh (Subtle Motion):**
    - Khúc củi lửa trại nằm vững chãi trên khối cỏ, ngọn lửa trại lồng bên trong chạy CSS Sprite animation `steps(8)` bập bùng tự nhiên.
    - Vầng sáng hào quang cam ấm (`campfire-glow`) và vàng dịu (`lantern-glow`) thở nhẹ nhàng chu kỳ 2.8s – 4s.
    - Khói pixel (`smoke-particle`) trôi lững lờ lên cao rồi mờ dần.

### 1.2. Tầng 2: Bảng Cổng Kết Nối Máy Chủ (Server Portal Card)
- **Nguồn cảm hứng:** Kế thừa bố cục tinh gọn, hiện đại từ *TheLovelyValley.org*, kết hợp ngôn ngữ thiết kế Pixel Plaque và nền tối *Midnight Indigo* của LunarChill.
- **Các thành phần chính:**
  - **Big Player Counter:** Chỉ số người chơi online kích thước lớn (`0 / 50 người đang chơi`), đặt cạnh hộp **Phiên bản hỗ trợ** (`PC 1.21.11 – 26.3 · PE 26.30 – 26.51`).
  - **Lưới 3 Cổng kết nối (3-Node Grid):** 
    - Thẻ 1: *Địa chỉ máy chủ (Host dùng chung)* — `LunarChill.club`.
    - Thẻ 2: *Bản PC (Java & Bedrock trên máy tính - Port 25572)*.
    - Thẻ 3: *Bản PE riêng (Điện thoại / Pocket Edition - Port 25572)*.
    - Mỗi thẻ tích hợp nút sao chép 1-click riêng biệt và icon sao `[✦]` phản ánh màu trạng thái mạng.
  - **Timestamp kiểm tra thời gian thực:** Đồng bộ theo định dạng `HH:mm:ss DD-MM`.

---

## 2. Dịch vụ Trạng thái Máy chủ (`status-service.js`)

- **Nguồn dữ liệu:** REST API công khai từ `mcstatus.io`.
- **Cơ chế kiểm tra song song độc lập:** Gọi đồng thời endpoint Java (`25572`) và Bedrock (`25572`, kèm cơ chế fallback `19143` thông minh bảo đảm không gián đoạn trong thời gian GeyserMC reload).
- **Dynamic Caching:**
  - Tuyệt đối không hardcode thời gian lưu cache (TTL).
  - Đọc chính xác `expires_at` trong JSON payload hoặc header `X-Cache-Time-Remaining` của API để lưu vào `sessionStorage`.
  - Khi người dùng tải lại trang trong thời hạn hợp lệ, website hiển thị ngay tức thì mà không cần gọi lại mạng.

---

## 3. Hệ thống Typography & Xử lý Khoảng cách Chữ (Typography Spacing)

- **Font hiển thị (Display / Headings):** `Space Mono` (Retro Cosmic Terminal).
  - *Lưu ý Dev:* Font monospace tiếng Việt có khoảng cách ký tự tự nhiên khá rộng. Tuyệt đối **không** áp dụng `word-spacing` âm quá lớn (< `-0.05em`) lên các tiêu đề dùng font sans (`Plus Jakarta Sans`), tránh lỗi chữ bị dính sát vào nhau.
- **Font đọc nội dung (Body):** `Plus Jakarta Sans`.
- **Font thông số kỹ thuật / IP / Lệnh:** `JetBrains Mono`.

---

## 4. Nhật ký Thay đổi (Changelog)

| Ngày | Nội dung thay đổi | Người thực hiện |
| :--- | :--- | :--- |
| **04/11/2026** | Thiết kế lại cấu trúc Homepage: Chuyển sang Hero căn giữa + Sàn cắm trại Minecraft + Bảng trạng thái TheLovelyValley. | Dev / Antigravity |
| **04/11/2026** | Trích xuất bộ texture gốc Minecraft 16×16px vào `assets/images/minecraft/`. | Dev / Antigravity |
| **04/11/2026** | Đồng bộ toàn bộ thương hiệu: Thay thế triệt để `LunarChillSMP` thành `LunarChill.Club`. | Dev / Antigravity |
| **04/11/2026** | **Xử lý P0:** Thống nhất port `25572` cho cả Java & Bedrock (PE), đồng bộ `config.js`, các nút copy, 8 trang HTML và triển khai fallback Bedrock trong `status-service.js`. | Dev / Antigravity |
| **04/11/2026** | **Cập nhật tính năng mới:** Tích hợp cơ chế **Hệ thống Giá thị trường biến động (Dynamic Pricing)** theo quy luật cung - cầu vào `index.html`, `guide.html`, `Server Features & Mechanics.md` và `Content & Data Registry.md`. | Dev / Antigravity |
| **04/11/2026** | **Nâng cấp đồ họa Lửa Trại:** Cập nhật texture đế gỗ khúc củi lửa trại Minecraft isometric (`campfire_log_base.png`) kết hợp ngọn lửa bập bùng CSS Sprite `steps(8)` và khói pixel. | Dev / Antigravity |
| **04/11/2026** | **Nâng cấp Cây cắm trại & Vòm trời trăng sao (Anti-Slop):** Trích xuất texture Minecraft gốc tạo cây thông Taiga (`spruce_tree.png`) và cây sồi (`oak_tree.png`) với hoạt ảnh đu đưa theo gió nhẹ; bổ sung mặt trăng khuyết Minecraft (`moon_crescent.png`) cùng vầng hào quang ánh trăng dịu mát (`moonlight-halo`), chùm sáng trăng (`moonlight-beam`), tinh tú nhấp nháy, hỗ trợ đầy đủ `prefers-reduced-motion` và responsive di động. | Dev / Antigravity |
| **04/11/2026** | **Chỉnh sửa cơ chế Khai khoáng (Mining Penalty & Ancient Debris):** Đổi mốc độ cao từ $Y \le 40$ về $Y \le 0$ (dưới Level 30 dính Mining Fatigue IV 60s khi phá Stone, Deepslate, Diorite, Andesite, Granite); bổ sung cơ chế bảo vệ Ancient Debris tại Nether (phạt Mining Fatigue IV tận 5 phút nếu chưa đạt Level 30); hoàn tất cày đủ Level 30 để mở khóa sức mạnh đào bới bình thường. Cập nhật đồng bộ trên `index.html`, `guide.html`, `Server Features & Mechanics.md`, `Content & Data Registry.md`. | Dev / Antigravity |
| **04/11/2026** | **Cập nhật Tính năng Bổ sung & Tiện ích:** Kích hoạt DeathChest ở cả 3 World (hạn 1 giờ); bảo toàn Rune (giữ nguyên level & đồ, hỗ trợ đền bù ticket Discord); BeaconWaypoint bật lại Discovery Mode và tắt sharing; Menu Towny `/t menu` trực quan; GSit ngồi đầu tối đa 2 người (We Bare Bears 🐻🐻); cảnh báo khẩn cấm tạm thời mod Litematica chống Anti-Cheat auto-ban. Đồng bộ trên toàn bộ 4 trang HTML và 3 tài liệu hệ thống. | Dev / Antigravity |
| **04/11/2026** | **Tính năng Tùy biến Vật phẩm (ItemRename / ItemEdit):** Mở rộng tính năng cho phép người chơi tự do chỉnh sửa vật phẩm trên tay với đủ mọi cách bằng lệnh `/itemedit` (đổi tên, thêm dòng lore, phối mã màu, sáng tạo kỷ vật cá nhân). Đã cập nhật vào `guide.html`, `Server Features & Mechanics.md`, `Content & Data Registry.md`. | Dev / Antigravity |
| **04/11/2026** | **Chi tiết Cơ chế BeaconWaypoint:** Làm rõ quy trình mở khóa trạm bằng cách đến trực tiếp Beacon ở làng và nhấp chuột phải (Unlock 🗺️, phong cách game RPG thế giới mở) cùng cơ chế thu phí dịch chuyển bằng điểm kinh nghiệm (EXP). Cập nhật vào `guide.html`, `Server Features & Mechanics.md`, `Content & Data Registry.md`. | Dev / Antigravity |
| **04/11/2026** | Khởi tạo thư mục `04 - Admin's Notes` và tệp `Dev's Notes.md`. | Dev / Antigravity |
| **05/11/2026** | **Deploy Vercel & Cập nhật Cẩm nang:** Đã deploy lên Vercel, domain có sẵn, đợi xác thực DNS, tiến hành sang công đoạn liên tục cải thiện trang web. Cập nhật cẩm nang tân thủ (`/redeem tanthu`, 3h dùng `/rtp`, loại bỏ `/sethome` và `/home`). Thay thế phong cảnh tĩnh hero bằng video nền vòng lặp tối ưu kèm nút bật/tắt chuyển động. | Dev / Antigravity |
| **05/11/2026** | **Trang Hướng dẫn chi tiết & Tính năng sâu (`advanced-guide.html`):** Thiết kế và xuất bản trang Hướng dẫn chuyên sâu toàn diện, phân tích chi tiết: Khai khoáng tầng sâu $Y \le 0$ & phạt Ancient Debris Nether, thể trạng cơn khát nước & oxy (Beacon cứu sinh đồng đội), đại tu The Nether (Wither 900 HP) & The End Nullscape 384 block / Stellarity (cấm đặt nước), kinh tế thị trường Dynamic Pricing, Mendingless, ngọc Rune, DeathChest 60p, BeaconWaypoint Discovery Mode, Towny GUI menu `/t menu`, ItemEdit `/itemedit`, và cảnh báo mod Litematica. Đồng bộ thanh điều hướng và footer trên toàn bộ 8 trang web. | Dev / Antigravity |
| **05/11/2026** | **Cập nhật Link Discord chính thức:** Cập nhật link Discord mời chính thức sang `https://discord.gg/SM9cn8pQQH` đồng bộ trên `assets/js/config.js`, toàn bộ 8 trang HTML và hệ thống tài liệu. | Dev / Antigravity |
| **05/11/2026** | **Ban hành Nội quy máy chủ chính thức (`rules.html`):** Cập nhật toàn bộ 7 điều khoản nội quy chính thức: I. Những hành vi gian lận (Xray, Fly/Killaura/Speed/Double Jump, Crack Seed, Dupe lỗi); II. Quy định PvP & Căn cứ (giết người vô cớ, trường hợp được phép PvP); III. Wilderness (tôn trọng công trình chưa kịp claim); IV. Phá base và cướp bóc (Ban thẳng); V. Giải quyết mâu thuẫn (nội bộ, không drama ra ngoài); VI. Gây chiến và chia phe; VII. Văn hóa ứng xử (văn minh, cấm tục tĩu/18+); VIII. Quy trình Ticket CoreProtect. | Dev / Antigravity |
| **05/11/2026** | **Tái cấu trúc thư mục `04 - Feedbacks` & Tạo sổ tay Góp ý người chơi:** Đổi tên thư mục `docs/04 - Admin's Notes` thành `docs/04 - Feedbacks`, khởi tạo tệp [`Player Feedback & Suggestions.md`](Player%20Feedback%20&%20Suggestions.md) tổng hợp 11 ý kiến đóng góp tiêu biểu của cộng đồng, quy trình sàng lọc 4 bước và danh sách đề xuất bị từ chối minh bạch. | Dev / Antigravity |
| **05/11/2026** | **Cải tiến Cẩm nang & Xuất bản Trang Mod máy yếu (`low-end-mods.html`):** Tinh chỉnh mô tả PatPat thành câu trực quan, loại bỏ văn phong gượng gạo; bổ sung cảnh báo cấu hình đồ họa Iris Shader trên `guide.html` & `advanced-guide.html`; tạo trang chuyên mục độc lập [`low-end-mods.html`](../../low-end-mods.html) (không nằm trên navigation của `index.html`) tổng hợp bộ mod tối ưu hiệu năng (Sodium, Lithium, FerriteCore, ImmediatelyFast, ModernFix, Entity Culling) cùng bảng thông số cài đặt đồ họa mẫu và cấu hình rewrite `/low-end-mods` trong `vercel.json`. | Dev / Antigravity |
| **05/11/2026** | **Tái cấu trúc Trang Mods thành Cẩm nang Hỗ trợ Người chơi toàn diện (`mods.html` & `low-end-mods.html`):** Viết lại toàn bộ trang mod theo cấu trúc hỗ trợ thực chiến 8 phần: Hướng dẫn cài đặt nhanh 3 bước & phân bổ RAM chuẩn; Gói mod siêu tối ưu 60+ FPS cho máy yếu; Tiện ích QoL sinh tồn siêu nhẹ; Thiết lập Video Settings tối ưu; Nhận biết mod nặng cần tránh (Iris Shader, Particle rain/leaves, AmbientSounds 81MB); Cẩm nang bắt bệnh & khắc phục sự cố (crash, tụt FPS khi cầm đuốc, spike lag); Bảng tra cứu toàn diện hơn 60 mod phổ biến; Kênh nhận hỗ trợ kỹ thuật 1-1 trên Discord. Cấu hình rewrite song song `/mods` và `/low-end-mods` trong `vercel.json`. | Dev / Antigravity |
| **05/11/2026** | **Tổng kiểm duyệt Anti-Slop toàn dự án (71 Tiêu chí):** Rà soát toàn bộ các tệp HTML theo bộ quy chuẩn `docs/02 - Design/Borderline Of Slop & Human-like.md`: Loại bỏ triệt để các dải viền trang trí `border-top: 3px solid` (Lỗi 3 The Top Accent Stripe) và `border-left: 4px solid` trên `mods.html`, `low-end-mods.html`, `guide.html`, `rules.html`; Triệt tiêu hoàn toàn các từ ngữ sáo rỗng/tính từ cực cấp (Lỗi 55: "đỉnh cao", "cứu tinh tuyệt đối"); Chuyển đổi dấu gạch ngang em-dash `—` (Lỗi 53) sang dấu phẩy và gạch nối tự nhiên; Đảm bảo 100% văn phong chân thực, mang tính hướng dẫn thực chiến cho người chơi. | Dev / Antigravity |
| **06/11/2026** | **Bổ sung Cảnh báo Hiệu ứng Infestation tại The End:** Cập nhật cảnh báo sinh tồn: *"Khi ở dưới The End, bạn sẽ dính hiệu ứng Infestation (tỉ lệ sinh ra cá bạc khi nhận sát thương)"* đồng bộ tại `guide.html`, `advanced-guide.html`, `Server Features & Mechanics.md` và `Content & Data Registry.md`. | Dev / Antigravity |
| **06/11/2026** | **Xuất bản Hệ thống 3 Chuyên trang The End (`the-end.html`, `stellarity.html`, `nullscape.html`):** Thiết kế và xuất bản kiến trúc 3 trang chuyên sâu cho chiều không gian The End kèm rewrite `/the-end`, `/stellarity`, `/nullscape` trong `vercel.json` và `sitemap.xml`: (1) [`the-end.html`](../../the-end.html) — Cổng trung tâm tổng hợp quy tắc sinh tồn LunarChill (Cấm đặt nước, Hút Oxy 2%/10s, Beacon tay chính cứu sinh, Hiệu ứng Infestation 0 EXP, DeathChest 60 phút, Totem cứu rơi Void và Checklist hành trang); (2) [`stellarity.html`](../../stellarity.html) — Chuyên đề Stellarity (bởi *kohara & Prismatic Shards / Void Realms*) với 12 Khung cảnh quan chính thức (`.scenery-frame`), bảng 23 quần xã 4 đới khí hậu, cơ chế Trial End City (Creative Shock & 3 chìa khóa Purpur/Gilded/Winged), Đàn Tế Nguyền Rủa (Altar of The Accursed), Luyện Vạc Hơi Thở Rồng (Breath Cauldron Crafting), Thanh tẩy Nước Thánh The Hallow, Câu Cá Hư Không (12 loài cá bao gồm *Crystal Heartfish* +5 Tim vĩnh viễn), Boss Rồng Jean & Empress of Light, cùng 32 Khung Vật phẩm & Công thức chế tạo (`.item-recipe-card`) hiển thị ảnh Sprite pixel-art và nguyên liệu chính xác từ tệp `.mcfunction`; (3) [`nullscape.html`](../../nullscape.html) — Chuyên đề Nullscape 2.0 (bởi *Starmute & Stardust Labs*) với 13 Khung cảnh địa hình 384 blocks ($Y = -64$ đến $Y = 320$), Đảo chính xoáy Hố giun (Wormhole), 4 quần xã đặc hữu (`Crystal Peaks` tỉ lệ 1/8 Amethyst, `Shadowlands` xương rồng lơ lửng & Phantom, `Void Barrens` 0 quái vật, `The Infestation` Sculk 0 EXP & Tàu Đắm Crashed Ship), Thiên thạch rỗng (Meteor Geodes) và Gò sét Voltaic Heaps. Ghi nhận đầy đủ bản quyền tác giả và dẫn nguồn chính thức tới GitHub, Modrinth, Wiki.gg và Miraheze Wiki. | Dev / Antigravity |
| **06/11/2026** | **Rà soát & De-Slop Toàn diện Cụm trang The End & Hướng dẫn (Anti-Slop Writing & Design):** Áp dụng nghiêm ngặt các tiêu chuẩn từ `anti-slop-writing`, `anti-slop-design` và `docs/02 - Design/Borderline Of Slop & Human-like.md` trên `the-end.html`, `stellarity.html`, `nullscape.html`, `advanced-guide.html`, `guide.html` và `the-end.css`: (1) Loại bỏ toàn bộ từ ngữ sáo rỗng AI, bỏ các tên dịch Hán-Việt/kiếm hiệp tự chế (Dragonblade, Tamaris, Kaleidoscope, Crystal Peaks, Shadowlands,...), xóa dấu gạch ngang dài `—` và emoji thừa; (2) Tắt hover giả trên các card tĩnh (.scenery-frame, .item-recipe-card, .biome-card), căn `tabular-nums` trên bảng số liệu và dòng stats, chuẩn hóa bo góc đồng tâm (8px/6px/4px). | Dev / Antigravity |

---

## 5. Các hạng mục dự kiến tiếp theo (Next Steps)

> [!NOTE]
> **Hiện trạng:** Đã deploy lên Vercel, domain có sẵn, đợi xác thực, tiến hành sang công đoạn liên tục cải thiện trang web.

1. [x] **Deploy Vercel & Domain:** Đã deploy lên Vercel, domain có sẵn, đợi hoàn tất xác thực DNS.
2. [x] **Hạ tầng mạng (P0):** Thống nhất chung port `:25572` cho cả Java và Bedrock (đồng bộ `config.js`, UI và fallback trên web).
3. [ ] **Công đoạn liên tục cải thiện trang web:**
   - [ ] Tinh chỉnh và bổ sung thêm các tương tác animation tĩnh nhẹ nhàng khi cuộn trang (Intersection Observer).
   - [ ] Hoàn thiện thư viện ảnh in-game thực tế (`gallery.html` & `assets/images/showcase/`).
   - [ ] Kiểm thử responsive trên các màn hình di động cỡ nhỏ (< 380px).
   - [ ] Hệ thống Whitelist / Đăng ký: Thiết kế luồng đăng ký bằng Email + IGN, lọc trùng email, xác thực OTP chống clone và tự động đồng bộ vào server Minecraft.
