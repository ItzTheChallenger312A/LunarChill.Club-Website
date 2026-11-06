# LunarChill - Content & Data Registry (Single Source of Truth)

> **Tài liệu nguồn dữ liệu chuẩn (SSOT)**  
> Quản lý tập trung toàn bộ dữ liệu thực tế, thông số kết nối, nội dung cẩm nang, nội quy, danh sách plugin/datapack, cơ chế sinh tồn đặc thù và người chịu trách nhiệm xác nhận thông tin cho website LunarChill.Club.

---

## 1. Thông số Kết nối Máy chủ (Server Connection Specs)

| Thông số | Giá trị thực tế | Tình trạng xác nhận | Người xác nhận |
| :--- | :--- | :--- | :--- |
| **Domain chính (Web & Server)** | `LunarChill.club` | Đã cấu hình DNS | BQT Server |
| **Bản PC (Java & Bedrock) IP** | `LunarChill.club` | Đang hoạt động | BQT Server |
| **PC Port** | `25572` | Đang hoạt động | BQT Server |
| **Bản PE riêng (Điện thoại) IP** | `LunarChill.club` | Đang hoạt động | BQT Server |
| **PE Port** | `25572` (đồng nhất với PC, fallback `19143`) | Đã thống nhất P0 | BQT Server |
| **Phiên bản hỗ trợ PC** | 1.21.11 đến bản mới nhất (26.3) | Đã xác nhận | BQT Server |
| **Phiên bản hỗ trợ PE** | 26.30 – 26.51 | Đã xác nhận | BQT Server |
| **Query Server Mode** | `enable-query=true` (Port: 25572) | mcstatus.io Dual Fetch | Lead Dev |

---

## 2. Liên kết Ngoại vi & Hệ sinh thái (External Links)

| Kênh / Dịch vụ | URL thực tế | Mục đích | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Discord Community** | `https://discord.gg/SM9cn8pQQH` | Tham gia cộng đồng, mở Ticket hỗ trợ | Hoạt động |
| **mcstatus.io PC (Java)** | `https://api.mcstatus.io/v2/status/java/LunarChill.club:25572` | Trạng thái online & số người chơi PC | Đã tích hợp |
| **mcstatus.io PE (Bedrock)**| `https://api.mcstatus.io/v2/status/bedrock/LunarChill.club:25572` (fallback: `:19143`) | Trạng thái online & số người chơi PE | Đã tích hợp |

---

## 3. Các Mod Client Được Hỗ Trợ Chính Thức (Recommended Client Mods)

1. **Xaero-Map (World Map & Minimap):** Khuyến khích sử dụng, hỗ trợ chính thức không lo bị đè map hay mất tọa độ cứ điểm.
2. **Simple Voice Chat:** Đàm thoại giọng nói 3D định hướng theo khoảng cách nhân vật in-game.
3. **ImageMap Client:** Mod hỗ trợ hiển thị tranh ảnh nét phân giải cao từ plugin ImageFrame.
4. **PatPat:** Hiển thị hoạt ảnh vỗ về / xoa đầu người chơi khác.
5. **Sodium & Iris Shaders (Fabric):** Tối ưu hóa rendering tăng FPS và hỗ trợ shaderpack ánh trăng.
6. ⚠️ **Cảnh báo Litematica:** Tạm thời **KHÔNG DÙNG** Litematica (tránh bị hệ thống Anti-Cheat tự động ban).

---

## 4. Cơ chế Sinh tồn Đặc thù (Unique Gameplay Mechanics)

### 4.1. Khai khoáng & Hiệu ứng Đào Chậm
- **Mục tiêu mới:** Cày đủ **Level 30** để mở khóa sức mạnh đào bới bình thường!
- **Tọa độ $Y \le 0$ (Đổi từ $Y \le 40$ thành $Y \le 0$):** Chưa đạt Level 30 mà đào *Stone, Deepslate, Diorite, Andesite, Granite* tại $Y \le 0$ bị phạt **Mining Fatigue Level 4 trong 60 giây**.
- **Bảo vệ Mảnh Vỡ Cổ Đại (Ancient Debris) tại Nether:** Chưa đủ Level 30 mà đào Ancient Debris nhận ngay hình phạt cực gắt: **Mining Fatigue Level 4 kéo dài tận 5 PHÚT**.
- **Mở khóa sức mạnh (Level 30+):** Đạt cấp 30 trở lên được đào bình thường không bị dính debuff ở $Y \le 0$ và Netherite.
- Khuyến khích thám hiểm hang động sâu tự nhiên thay vì strip mine đào hầm.

### 4.2. Thanh Chỉ số Nước (Water)
- Giảm **3% mỗi phút** khi có hoạt động.
- Hồi phục: Uống nước, ăn dưa hấu, súp hầm (*CropAndKettle*), quả mọng.
- Đứng yên hoàn toàn (AFK): Thanh nước được bảo toàn, không bị tụt.

### 4.3. Thanh Chỉ số Oxy (Oxygen)
- Tự động nạp đầy khi đứng trên bề mặt đất Overworld.
- Vùng tiêu hao: Hang sâu (giảm dần), Nether (giảm **4%/phút**), The End (giảm **2%/10 giây**).
- **Vật phẩm cứu sinh:** Cầm **Beacon (Đèn hiệu)** ở tay chính (*Main hand*) giúp liên tục hồi phục oxy cho bản thân và đồng đội đứng gần.

### 4.4. Đại tu The End & Custom Crafting
- **Nullscape 2.0 (Starmute & Stardust Labs):** Datapack đại tu địa hình The End (độ cao 384 blocks từ $Y = -64$ đến $Y = 320$, Đảo chính xoáy Hố giun Wormhole, 4 quần xã *Crystal Peaks, Shadowlands, Void Barrens, The Infestation*, Thiên thạch rỗng *Meteor Geodes*, Gò sét *Voltaic Heaps*, Tàu đắm *Crashed Ship*).
- **Stellarity & StellarityOptimizer (kohara & Prismatic Shards):** Đại tu toàn bộ lối chơi The End (23 quần xã 4 đới khí hậu, *The Hallow*, Trial End City với *Creative Shock*, 2 Đại Boss *Jean* & *Empress of Light*, 4 cơ chế *Altar of The Accursed, Breath Cauldron Crafting, Hallow Consecration, Void Fishing*).
- Tuyệt đối **không thể đặt nước ở The End**.
- **Hiệu ứng Infestation:** Dính hiệu ứng Infestation khi ở The End (có tỉ lệ sinh ra cá bạc khi nhận sát thương, 0 EXP).
- **Hệ thống 3 Trang chuyên đề độc lập:**
  - [`the-end.html`](../../the-end.html) (rewrite `/the-end`): Tổng quan & Luật Sinh Tồn LunarChill.
  - [`stellarity.html`](../../stellarity.html) (rewrite `/stellarity`): Chuyên đề Stellarity (Wiki 23 Quần xã, Cơ chế, Boss & Khung công thức chế tạo).
  - [`nullscape.html`](../../nullscape.html) (rewrite `/nullscape`): Chuyên đề Nullscape (Địa hình 384 blocks, Đảo Wormhole & 4 Quần xã).

### 4.5. Thay đổi Rơi đồ Quái vật (Lootable Mobs)
- **Iron Golem:** Không rơi sắt, chỉ rơi Bí ngô.
- **Illusioner (Raid):** Rơi khối trang trí và tranh vẽ.
- **Evoker:** Tỷ lệ rơi Totem of Undying chỉ còn **3%**.
- **Silverfish:** Không rơi điểm kinh nghiệm.

### 4.6. Quy tắc Thế giới Khắc chế Lạm dụng (Anti-Exploit)
- **Wither:** Chỉ summon được ở Nether, máu tăng lên **900 HP**.
- **Giường ngủ:** Không thể ngủ qua đêm; nằm lên giường hoặc `/lay` để reset Phantom.
- **Dân làng:** Không sinh sản, không bán Mending, không bán đồ kim cương.
- **Zombie Lợn:** Luôn chủ động tấn công người chơi trong Nether.
- **Hạn chế Nether:** Không đặt được Obsidian trong Nether; không đặt được block trên trần Nether.
- **Farm quái nhân tạo:** Mọi farm nhân tạo trên không, trên biển đều bị vô hiệu hóa (kể cả farm raid).

### 4.7. Rương Tử Nạn (DeathChest)
- Hoạt động tại **cả 3 World** (Overworld, Nether, The End).
- Thời hạn lưu trữ: **1 giờ (60 phút)** kể từ thời điểm tử nạn.

### 4.8. Bảo toàn Ngọc Rune & Hỗ trợ Đền bù
- Rune được **bảo toàn nguyên vẹn Level và vật phẩm** sau cập nhật.
- Hỗ trợ tạo ticket Discord đền bù cho người chơi đã chuẩn bị nguyên liệu mua Rune trước cập nhật.

### 4.9. Điểm Mốc Tọa Độ (BeaconWaypoint)
- **Bật lại Discovery Mode:** Lần đầu tiên đến trạm Beacon tại làng, nhấp chuột phải để mở khóa (Unlock 🗺️); sau đó tự do dịch chuyển.
- **Chi phí đi lại:** Thu phí mỗi chuyến dịch chuyển bằng điểm kinh nghiệm (EXP).
- **Tắt sharing:** Không chia sẻ waypoint đi chung, giữ trải nghiệm khám phá độc lập.

---

## 5. Bảng Lệnh Thông dụng In-game (`/guide`)

| Nhóm lệnh | Cú pháp lệnh | Mô tả công dụng | Cho phép Copy |
| :--- | :--- | :--- | :--- |
| **Di chuyển & Căn cứ** | `/spawn` | Dịch chuyển tức thời về Khu vực Trung tâm (Spawn) | Có (`copy-ip`) |
| | `/rtp` | Dịch chuyển ngẫu nhiên đến khu vực an toàn (kích hoạt qua `/redeem tanthu`) | Có |
| | `/tpa [tên_người_chơi]` | Gửi yêu cầu dịch chuyển tới bạn bè | Có |
| | `/tpaccept` | Đồng ý yêu cầu dịch chuyển | Có |
| | `/lay` | Nằm nghỉ ngơi reset Phantom mà không cần ngủ qua đêm | Có |
| | `/sit` | Ngồi xuống; nhấp chuột phải đầu bạn bè để ngồi đầu (tối đa 2 người - We Bare Bears 🐻🐻) | Có |
| | *Beacon Waypoint* | Chuột phải vào Beacon mở khóa trạm dịch chuyển (thu phí bằng EXP) | In-game |
| **Thị trấn & Đất đai (Towny)** | `/t menu` | **MỚI:** Mở giao diện Menu GUI bấm chuột quản lý thị trấn trực quan | Có |
| | `/town` | Xem thông tin thị trấn của bạn | Có |
| | `/town new [tên]` | Thành lập thị trấn mới | Có |
| | `/town claim` | Mở rộng ranh giới chunk thị trấn | Có |
| | `/plot claim` | Nhận quyền sở hữu một lô đất trong thị trấn | Có |
| | `/town deposit [tiền]` | Đóng góp tiền duy trì ngân sách thị trấn | Có |
| | `/resident friend add [tên]`| Thêm bạn bè vào danh sách tin cậy | Có |
| **Kỹ năng & Thú cưng** | `/skills` | Mở bảng cấp độ 11+ kỹ năng Aura Skills | Có |
| | `/stats` | Xem các chỉ số sức mạnh, máu, hồi phục, may mắn | Có |
| | `/pet` | Mở menu quản lý thú cưng MyPet | Có |
| | `/petcall` | Gọi thú cưng đến vị trí hiện tại | Có |
| **Giao thương & Kinh tế** | `/ah` | Mở sàn đấu giá người chơi (Auction House) | Có |
| | `/ah sell [giá]` | Đăng bán vật phẩm đang cầm trên tay | Có |
| | `/orders` | Mở bảng đặt hàng thu mua tài nguyên số lượng lớn | Có |
| | **Dynamic Pricing** | Cơ chế tự cân bằng giá mua/bán theo cung - cầu thị trường (xả nhiều giảm giá, mua nhiều tăng giá, tự hồi phục theo chu kỳ) | Hoạt động |
| **Tiện ích & Chat** | `[item]` hoặc `[i]` | Khoe vật phẩm đang cầm trên tay lên khung chat | Có |
| | `[inv]` | Hiển thị toàn bộ túi đồ hiện tại lên khung chat | Có |
| | `/itemedit` | **MỚI:** Chỉnh sửa vật phẩm trên tay với đủ mọi cách (đổi tên, sửa lore, màu sắc, làm kỷ vật) | Có |
| | `/skin [tên_skin]` | Thay đổi trang phục skin nhân vật | Có |
| | `/redeem [mã_code]` | Nhập mã giftcode nhận quà tân thủ / sự kiện | Có |
| | *AxShulkers* | Shift + Chuột phải vào Shulker trong balo để mở nhanh | In-game |

---

## 6. Danh mục Nội quy & Khung Kỷ luật (`/rules`)

* **I. Những hành vi gian lận (Hack):**
  - *1.1. Xray, Freecam, Map Mod nhìn xuyên lòng đất:* Nhắc nhở + Jail. (Ngoại lệ: Freecam chụp ảnh công trình hoặc Map Mod bản đồ mặc định được chấp nhận).
  - *1.2. Hack vận động & chiến đấu (Fly, Kill Aura, Speed, Double Jump):* Jail + Ban.
  - *1.3. Crack Seed:* Ban ngay lập tức.
  - *1.4. Lợi dụng lỗi, bug, lỗ hổng để dupe vật phẩm:* Thu hồi hoặc xóa toàn bộ vật phẩm dupe khỏi túi đồ.
  - *Cảnh báo Litematica:* Tạm thời cấm mod Litematica chống Anti-Cheat auto-ban nhầm.
* **II. Quy định về PvP và phá hoại căn cứ:**
  - *2.1. Cố tình giết người chơi không lý do:* Tịch thu/xóa hung khí + Phạt tù 1 giờ + Hoàn trả toàn bộ đồ cho nạn nhân.
  - *2.2. Trường hợp được phép PvP:* Đã thống nhất kèo đấu trước đó, HOẶC đối phương đang phá hoại base (giết pet/gia súc chưa xin phép, dắt thú cưỡi khỏi claim, trộm đồ, phá khu vực base chưa kịp claim).
  - *2.3. Báo cáo khi bị hại:* Không tự ý leo thang bạo lực, báo ngay cho Admin/Ticket để can thiệp.
* **III. Vùng đất Wilderness:**
  - Đất chưa claim là đất công cộng; tuy nhiên nếu người khác đang xây dựng căn cứ chưa kịp claim thì phải tôn trọng và tuyệt đối không phá hoại.
* **IV. Phá base và cướp bóc:**
  - Cố tình phá hoại base hoặc giết người cướp đồ: Ban thẳng, không ngoại lệ.
* **V. Giải quyết mâu thuẫn:**
  - Giải quyết nội bộ trong server, không mang drama lên Messenger hay các box trò chuyện bên ngoài; nếu không tự giải quyết được hãy inbox Admin.
* **VI. Chống gây hấn và chia rẽ:**
  - Nghiêm cấm gây hấn, lôi kéo bè phái, kích động đấu đá. Xử lý từ nhắc nhở, cảnh cáo đến Ban tùy mức độ.
* **VII. Văn hóa ứng xử:**
  - Không nói tục chửi bậy, không gửi ảnh 18+/phản cảm, không xúc phạm hay thiếu tôn trọng người khác. Xử lý: Cảnh cáo, cấm phát ngôn (Mute từ 1 đến 72 giờ) hoặc đình chỉ tài khoản.
* **VIII. Quy trình khiếu nại (Appeals Ticket):**
  - Mọi sự cố tiếp nhận qua kênh `#tạo-ticket` trên Discord chính thức (`https://discord.gg/SM9cn8pQQH`), đối soát qua logs CoreProtect.

---

## 7. Người Chịu Trách nhiệm Xác nhận Dữ liệu

| Hạng mục | Người phụ trách | Kênh liên hệ |
| :--- | :--- | :--- |
| Thông số IP, Port, Server DNS, Query | Server Admin | Discord / In-game Ops |
| Kịch bản Nội quy, Bảng lệnh, FAQ | Server Admin / Head Mod | Discord Ops |
| Kiểm soát nội dung trên Web so với SSOT | Lead Frontend Developer | Git Repo Maintainer |
