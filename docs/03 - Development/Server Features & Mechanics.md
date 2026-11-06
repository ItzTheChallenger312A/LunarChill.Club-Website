# Server Features & Gameplay Mechanics — LunarChill.Club

> **Nguồn dữ liệu:** Đặc tả kỹ thuật chính thức từ BQT máy chủ LunarChill.Club  
> **Cập nhật lần cuối:** 2026-11-02  
> **Phiên bản:** 2.0 (Toàn diện & Chi tiết cơ chế)  
> **Triết lý vận hành:** Sinh tồn thư thái nhưng có chiều sâu (*"Chill thôi, đừng có vội."* 🌙). Loại bỏ các thủ thuật lạm dụng lỗi game (anti-cheese), khuyến khích thám hiểm tự nhiên, tương trợ đồng đội và trải nghiệm khám phá chân thật.

---

## 1. Cơ chế Sinh tồn Đặc thù (Unique Survival Mechanics)

### 1.1. Khai khoáng & Hiệu ứng Đào Chậm (Mining Fatigue Penalty)
- **Mục tiêu cốt lõi:** Cày đủ **Level 30** để mở khóa sức mạnh đào bới bình thường!
- **Khu vực áp dụng tại Overworld:** Từ tọa độ **$Y \le 0$ trở xuống** lòng đất sâu (đã cập nhật thay đổi từ mốc $Y \le 40$ về $Y \le 0$).
- **Khối bị ảnh hưởng:** Đá thường (*Stone*), Đá bảng sâu (*Deepslate*), Đá điorit (*Diorite*), Đá anđêzit (*Andesite*), Đá hoa cương (*Granite*).
- **Hình phạt chưa đủ cấp (Dưới Level 30):** Nếu chưa đạt Level 30 mà cố tình xuống dưới độ cao $Y \le 0$ để mining, nhân vật sẽ bị dính ngay debuff **Mining Fatigue (Đào chậm) Level 4 trong 60 giây** mỗi khi phá các loại block trên.
- **Cơ chế Bảo vệ Mảnh Vỡ Cổ Đại (Ancient Debris) tại Nether:**
  - *Nether không dành cho newbie!* Nếu chưa đủ **Level 30** mà cố tình vác cúp đi cày Ancient Debris, nhân vật sẽ nhận ngay hình phạt cực gắt: debuff **Mining Fatigue Level 4 kéo dài tận 5 PHÚT (300 giây)**.
  - Hãy cày đủ cấp (Level 30+) rồi hẵng mơ đến Netherite!
- **Mở khóa sức mạnh (Đủ Level 30+):** Khi đạt và duy trì từ **Level 30 trở lên**, người chơi sẽ được giải phóng hoàn toàn, đào bới bình thường không còn bị dính debuff ở độ sâu $Y \le 0$ hay khi đào Ancient Debris.
- **Định hướng lối chơi:** Chấm dứt lối chơi cày hầm đào thẳng thủ công (strip-mining) và rush Netherite sớm khi chưa sẵn sàng. Khuyến khích người chơi mạo hiểm thám hiểm các mạng lưới hang động sâu tự nhiên khổng lồ (*Deep Dark, Mega Caves*) để khai thác quặng lộ thiên.

---

### 1.2. Cơ chế Thanh Chỉ số Nước (Water / Thirst System)
- **Tốc độ tiêu hao:** Lượng nước của nhân vật tự động giảm **3% mỗi phút** khi có các hoạt động sinh hoạt thông thường.
- **Cách hồi phục:** Người chơi cần bổ sung nước bằng các nguồn thực phẩm/đồ uống:
  - Uống chai nước (*Water Bottle*).
  - Ăn dưa hấu (*Melon Slice*).
  - Ăn các loại súp / canh hầm dinh dưỡng (*Soups & Stews* từ CropAndKettle).
  - Ăn quả mọng (*Sweet Berries*).
- **Trạng thái Treo máy (AFK Protection):** Khi nhân vật đứng yên hoàn toàn và không di chuyển, thanh nước sẽ được giữ nguyên, không bị sụt giảm.

---

### 1.3. Cơ chế Thanh Chỉ số Oxy (Oxygen System)
- **Hồi phục tự nhiên:** Nhân vật tự động nạp đầy 100% thanh oxy khi đứng trên bề mặt đất (*Overworld Surface*).
- **Các vùng môi trường thiếu khí:**
  - **Hang động sâu (Deep Caves):** Lượng oxy bắt đầu tiêu hao dần khi tiến sâu vào lòng đất.
  - **The Nether:** Không khí ngột ngạt độc hại, oxy sụt giảm **4% mỗi phút**.
  - **The End:** Không gian hư vô khắc nghiệt tột độ, oxy sụt giảm nhanh **2% mỗi 10 giây**.
- **Vật phẩm cứu sinh (Lifeline Item):**
  - Trang bị **Beacon (Đèn hiệu)** ở tay chính (*Main Hand*).
  - Khi cầm Beacon trên tay, lượng oxy của bản thân và **tất cả người chơi đứng gần** sẽ liên tục được nạp đầy.
  - *Ý nghĩa:* Tôn vinh tinh thần đồng đội và chiến thuật phối hợp thám hiểm The End / Nether.

---

### 1.4. Hệ thống Giá thị trường biến động (Dynamic Pricing)
Chính thức kích hoạt cơ chế tự cân bằng giá mua/bán theo cung - cầu thị trường thực tế:
- 🔻 **Bán ra quá nhiều (Oversupply Dump):** Khi cộng đồng xả một mặt hàng với số lượng quá lớn, giá thu mua mặt hàng đó của server sẽ tự động giảm dần nhằm chống tình trạng lạm phát tiền tệ và tích trữ farm quá mức.
- 🔺 **Mua vào liên tục (High Demand Surge):** Khi nhu cầu tiêu thụ tăng cao, giá bán ra của vật phẩm tại shop sẽ tăng nhẹ theo thời gian để phản ánh chính xác giá trị khan hiếm của tài nguyên.
- ⚖️ **Cơ chế hồi phục (Equilibrium Recovery):** Giá sẽ tự động cân bằng lại theo từng chu kỳ khi thị trường ổn định trở lại, giữ vững nền kinh tế sinh tồn lành mạnh, tuần hoàn và lâu dài.

---

### 1.5. Rương Tử Nạn (DeathChest) ở cả 3 Thế Giới
- **Khu vực kích hoạt:** Áp dụng đồng bộ tại cả 3 World: **Overworld (Thế giới thực)**, **The Nether (Địa ngục)** và **The End (Hư không)**.
- **Cơ chế lưu trữ:** Khi người chơi tử nạn, toàn bộ trang bị và vật phẩm trong túi đồ sẽ được thu gom an toàn vào một khối DeathChest tại đúng vị trí ngã xuống.
- **Thời hạn tồn tại:** DeathChest có thời hạn bảo quản **chính xác 1 giờ (60 phút)**. Sau 1 giờ, rương sẽ tự động biến mất. Người chơi cần nhanh chóng quay lại tọa độ cũ để thu hồi đồ đạc (💀📦).

---

### 1.6. Cơ chế Bảo Toàn Rune & Chính Sách Đền Bù Ticket
- **Đặc quyền Rune:** Thay vì bùa Mending, server sử dụng hệ thống Ngọc Rune bảo mệnh giúp bảo toàn trang bị khi tử nạn tại các chiều không gian nguy hiểm.
- **Bảo toàn sau cập nhật:** Dữ liệu Rune được **giữ nguyên 100% cả Cấp độ (Level) lẫn vật phẩm đính kèm** qua các đợt bảo trì và cập nhật hệ thống ✨.
- **Chính sách đền bù:** Những người chơi đã chuẩn bị sẵn nguyên liệu hoặc vật phẩm để mua Rune trước đợt cập nhật có thể **tạo Ticket tại kênh hỗ trợ Discord LunarChill** để được BQT kiểm tra và đền bù thỏa đáng.

---

### 1.7. Hệ thống Điểm Mốc Tọa Độ (BeaconWaypoint)
- **Bật lại Discovery Mode (Chế độ khám phá):** Tái hiện trải nghiệm mở map RPG thế giới mở chân thực.
  - **Cách mở khóa (Unlock):** Lần đầu tiên, người chơi chịu khó "chạy bằng cơm" tới thẳng vị trí đặt ngọn Beacon ở các ngôi làng. Khi tới nơi, chỉ cần **nhấp chuột phải vào trạm Beacon** để mở khóa điểm mốc (🗺️). Mở khóa thành công 1 lần là từ sau có thể dịch chuyển tức thời tới trạm đó vô tư bất kỳ lúc nào!
- **Chi phí đi lại (Travel Cost):** Mỗi lượt dịch chuyển qua BeaconWaypoint có **thu phí bằng điểm kinh nghiệm (EXP)** của nhân vật.
- **Tắt tính năng đi chung (Sharing disabled):** Vô hiệu hóa tính năng chia sẻ điểm Waypoint cho người khác dùng chung, bảo đảm tính công bằng và khuyến khích mỗi cá nhân tự mình thám hiểm mở bản đồ riêng.

---

### 1.8. Tiện ích Tương tác Cộng đồng: Towny Menu & GSit
- **Towny Menu (`/t menu`):** Cung cấp giao diện đồ họa (GUI) bấm chuột trực quan cho hệ thống Towny, cho phép Thị trưởng và cư dân quản lý plot, ngân sách, phân quyền dễ dàng mà không cần ghi nhớ hàng tá câu lệnh.
- **GSit - Ngồi đầu 2 tầng We Bare Bears (`/sit`):** Cho phép nhấp chuột phải vào đầu người chơi khác để ngồi lên đầu họ, hỗ trợ xếp chồng **tối đa 2 người** theo phong cách hoạt hình *Chúng Tôi Đơn Giản Là Gấu* 🐻🐻. Không cần lý do phức tạp, đơn giản là vì niềm vui giải trí lành mạnh!

---

### 1.9. Tùy biến Vật Phẩm Toàn Diện (ItemRename / ItemEdit)
- **Cơ chế:** Cho phép người chơi tự do chỉnh sửa vật phẩm đang cầm trên tay chính với đầy đủ mọi tùy biến sáng tạo bằng lệnh `/itemedit`.
- **Khả năng chỉnh sửa phong phú:**
  - **Đổi tên vật phẩm (Rename):** Đặt tên độc bản cho vũ khí, công cụ, giáp trụ hoặc quà tặng với sự hỗ trợ của bảng mã màu phong phú.
  - **Thêm và chỉnh sửa dòng mô tả (Lore):** Soạn thảo các dòng cốt truyện, trích dẫn, lời chúc tặng bạn bè hoặc ghi lại dấu ấn thám hiểm đáng nhớ.
  - **Cá nhân hóa:** Biến trang bị và tài nguyên thông thường thành những kỷ vật độc nhất vô nhị mang đậm dấu ấn phong cách riêng.

---

## 2. Đại tu Chiều không gian The End & The Nether

### 2.1. The End: Bộ đôi Nullscape & Stellarity
The End tại LunarChill không phải là một vùng hoang mạc đơn điệu, mà là tâm điểm của gameplay Endgame:
1. **Nullscape 2.0 (Datapack Đại tu Địa hình The End — bởi Starmute & Stardust Labs):**
   - Mở rộng chiều cao The End lên tới 384 blocks ($Y = -64$ đến $Y = 320$) với 5 dạng địa hình Fractal (đảo xốp tổ ong, đảo tròn xếp tầng, thung lũng trôi nổi, vành đai vỡ vụn).
   - Thiết kế lại Đảo Chính thành hình xoáy **Hố Giun (Wormhole)**, biến Small End Islands thành **Trường Thiên Thạch & Hốc Khoáng Sản (Meteor Geodes)**, bổ sung tiểu quần xã sét đánh **Voltaic Heaps** (chứa nhánh Glowstone).
   - Bổ sung 4 quần xã đặc hữu: **Crystal Peaks** (tỉ lệ rơi khối Amethyst 1/8), **Shadowlands** (San hô chết, Hài cốt Rồng lơ lửng, sinh sản Phantom tự nhiên), **Void Barrens** (không có quái vật sinh sản tự nhiên) và **The Infestation** (khối Sculk 0 EXP, Endermite và công trình **Crashed End Ship**).
2. **Stellarity & StellarityOptimizer (Datapack Đại tu Toàn diện Lối chơi The End — bởi kohara & Prismatic Shards):**
   - Bổ sung và đại tu **23 quần xã** chia theo 4 đới khí hậu, nổi bật với **The Hallow** (cây cầu vồng, dòng nước hồng tím thanh tẩy Khối Sắt thành 2 *Hallowed Ingot*, chỉ sinh ra Pixie & Allay).
   - Đại tu **Stronghold** (lớn gấp 5 lần, canh giữ bởi Illager rơi *Sharanga, Clockwork Crossbow, Book of Conveyance/Light/Updraft*), **End Cities** theo cơ chế Trial Chambers (Tinh thể bảo hộ gây hiệu ứng *Creative Shock* cấm đập/đặt khối, mở Vault bằng *Purpur Key, Gilded Purpur Key, Winged Key*), **End Villages** (có *Return Gateway*) và **Chapel of Light**.
   - 4 Hệ thống chế tạo & thu thập đặc biệt: **Altar of The Accursed** (ném nguyên liệu rèn giáp *Hallowed, Shulker, Champion, Floral*, vũ khí *Tamaris, Sabrewing, Spectral Fury, Sandstorm Trident*, khảm 9 loại ngọc vào *Void Pendant*, nhuộm vệt sáng Elytra), **Breath Cauldron Crafting** (pha loãng Hơi Thở Rồng nấu *Phở, Shepherd's Pie, Sushi* và 9 loại độc dược), **Hallow Consecration** và **Void Fishing** (12 loài cá bao gồm *Crystal Heartfish* tăng vĩnh viễn tới +5 Tim máu).
   - 2 Đại Boss: **Ender Dragon (Jean)** (bất tử khi còn trụ Crystal, kháng nổ giường, rơi *Dragonblade* độc bản và *Tamaris*) và **Empress of Light** (rơi *Kaleidoscope, Soaring Insignia, Prismatic Pearl, Stella, Prismatic Punch*).
   - Tối ưu hóa TPS máy chủ mượt mà thông qua `StellarityOptimizer`.
3. **Quy tắc & Cảnh báo The End:**
   - **Tuyệt đối KHÔNG THỂ đặt nước tại The End** (người chơi phải dùng Thuốc Rơi Chậm, Book of Updraft, Ngọc Ender, Khối Nhầy hoặc Elytra).
   - **Hiệu ứng Infestation:** Khi ở dưới The End, người chơi dính hiệu ứng Infestation (có tỉ lệ sinh ra cá bạc - Silverfish khi nhận sát thương, 0 EXP).
   - **Tiêu hao oxy 2% / 10s:** Bắt buộc trang bị Beacon ở tay chính để hồi phục dưỡng khí cho cả đội.
   - **Hệ thống 3 Chuyên trang Cẩm nang riêng biệt:**
     - [`the-end.html`](../../the-end.html): Tổng quan & Luật Sinh Tồn LunarChill.
     - [`stellarity.html`](../../stellarity.html): Chuyên đề Stellarity (23 Quần xã, Cơ chế, Boss & Khung công thức chế tạo).
     - [`nullscape.html`](../../nullscape.html): Chuyên đề Nullscape (Địa hình 384 blocks, Đảo Wormhole & 4 Quần xã).

---

## 3. Quy tắc Thế giới & Khắc chế Cheese (Anti-Exploit World Rules)

Để bảo tồn giá trị sinh tồn nguyên bản và ngăn chặn lạm phát kinh tế do các cỗ máy farm tự động vô hạn gây ra:

| Hạng mục | Cơ chế thực tế | Mục đích thiết kế |
| :--- | :--- | :--- |
| **Triệu hồi Wither Boss** | Chỉ có thể triệu hồi tại **The Nether**. Máu của Wither được tăng lên **900 HP**. | Biến Wither thành Raid Boss thực sự, không thể kẹt trong đá ngầm để farm sao Nether dễ dãi. |
| **Giường & Giấc ngủ** | **Không thể ngủ để qua đêm**. Có thể nằm lên giường để **reset Phantom** hoặc dùng lệnh `/lay`. | Giữ vững chu kỳ đêm trăng, các công trình ánh sáng và không khí tĩnh mịch của server. |
| **Dân làng (Villagers)** | **Không sinh sản**, **Không bán sách Mending**, **Không bán trang bị Kim Cương**. | Loại bỏ các trại nô dịch dân làng (Trading Hall) làm mất giá trị khai quặng và kỹ nghệ rèn. |
| **Zombie Lợn (Piglin)** | **Luôn luôn chủ động tấn công** người chơi trong Nether. | Nether là vùng đất hiểm họa, đòi hỏi chuẩn bị kỹ lưỡng trước khi bước vào. |
| **Hạn chế Nether** | **Không thể đặt Obsidian** trong Nether; **Không thể đặt block trên trần Nether** (Nether Roof). | Ngăn chặn việc đục nóc Nether để xây farm vàng / di chuyển an toàn trên trần bedrock. |
| **Farm Quái nhân tạo** | Mọi cỗ máy farm quái nhân tạo **trên không hoặc trên biển đều KHÔNG HOẠT ĐỘNG** (bao gồm cả farm Raid). | Ngăn chặn việc treo máy afk farm đồ tràn lan làm tụt TPS và phá vỡ cân bằng tài nguyên. |

---

## 4. Bảng Rơi Đồ Sinh Vật Biến Đổi (Lootable Mobs)

- **Iron Golem (Người sắt):** **KHÔNG rơi thỏi sắt**, chỉ rơi **Bí ngô (Pumpkin)**. Ngăn chặn triệt để các cỗ máy Iron Farm công nghiệp làm rác sắt.
- **Illusioner (Ảo ảnh sư - Xuất hiện trong đợt Raid):** Rơi các **khối trang trí nội thất độc lạ và tranh vẽ nghệ thuật**.
- **Evoker (Phù thủy gọi linh hồn):** Chỉ có **3% tỷ lệ rơi Totem of Undying**. Totem trở thành bùa hộ mệnh cực kỳ quý giá thay vì tích trữ hàng rương.
- **Silverfish (Bọ bạc):** **KHÔNG rơi điểm kinh nghiệm** (chống lỗi farm exp vô hạn từ khối đá bọ).

---

## 5. Danh sách Mod Client Được Hỗ Trợ Chính Thức

Server khuyến khích và hỗ trợ tối đa cho người chơi cài đặt các mod client-side sau:

1. **Xaero-Map (Xaero's World Map & Minimap):**
   - Hỗ trợ chính thức 100%, có cơ chế đồng bộ map an toàn, không lo bị đè map hay mất tọa độ các cứ điểm.
2. **Simple Voice Chat:**
   - Trò chuyện giọng nói định hướng 3D trong game, âm lượng to nhỏ theo khoảng cách, giao tiếp chân thật khi cùng nhau đi hang.
3. **ImageMap Client:**
   - Mod hiển thị hình ảnh độ phân giải cao được thêm vào qua plugin `ImageFrame`. Khuyến khích cài để thưởng lãm tranh ảnh nghệ thuật tại bảo tàng và thị trấn nét căng.
4. **PatPat:**
   - Hiển thị hoạt ảnh xoa đầu / vỗ về (PatPat) người chơi khác, tăng tính tương tác thân thiện, ấm áp.
5. **Sodium & Iris Shaders (Fabric):**
   - Tối ưu hóa FPS vượt trội và hỗ trợ các gói shader ánh trăng tuyệt đẹp.

> [!WARNING] Cảnh Báo Khẩn Về Mod Litematica
> Tạm thời **KHÔNG SỬ DỤNG** mod Litematica khi tham gia server. Việc sử dụng Litematica ở thời điểm hiện tại có thể khiến hệ thống Anti-Cheat nhận diện nhầm hành vi và tự động ban tài khoản. BQT sẽ hỗ trợ lại sau khi hoàn thiện kiểm tra tương thích. Hãy chờ thông báo chính thức, đừng thử vận may với Anti-Cheat! 😭

---

## 6. Danh mục 20 Plugins Vận hành

| Plugin | Chức năng chi tiết | Giá trị sinh tồn |
| :--- | :--- | :--- |
| **Towny** | Hệ thống thị trấn, phân quyền cư dân, giúp bảo vệ công trình và giảm đáng kể nguy cơ bị phá hoại. | Trụ cột cộng đồng |
| **Aura Skills** | 11+ kỹ năng RPG (Mining, Farming, Combat, Agility,...) tăng chỉ số tự nhiên. | Tiến trình nhân vật |
| **Mendingless** | Loại bỏ bùa Mending, khôi phục giá trị bàn rèn và đe sửa đồ. | Cân bằng kinh tế |
| **TGVNKeepInventoryRune** | Ngọc bảo mệnh giữ nguyên túi đồ khi tử nạn tại Nether / The End. | Bảo vệ tài sản rủi ro |
| **Aternum Seasons** | 4 mùa thời tiết chân thực, tuyết rơi mùa đông, chu kỳ nông nghiệp. | Môi trường sống động |
| **CropAndKettle** *(DP)* | Hàng chục món ăn nấu nướng, hầm súp dinh dưỡng từ rau củ quả. | Ẩm thực ấm cúng |
| **mini-blocks** *(DP)* | Mô hình khối thu nhỏ trang trí nhà cửa chi tiết đến từng centimet. | Nghệ thuật xây dựng |
| **BeaconWaypointsReloaded** | Ngọn đèn Beacon trở thành điểm dịch chuyển tức thời giữa các cứ điểm. | Du hành nhanh phong cách vanilla |
| **FoAuction** | Sàn đấu giá người chơi mua bán vật phẩm tự do (`/ah`). | Thị trường tự do |
| **FoOrders** | Bảng đặt hàng thu mua tài nguyên số lượng lớn (`/orders`). | Phân hóa nghề nghiệp |
| **AxShulkers** | Mở hộp Shulker trực tiếp trong túi đồ (Shift + Chuột phải) không cần đặt xuống đất. | Tiện ích chống trộm |
| **Auto Fishing** | Tự động câu cá giải trí thư thái ven sông hồ. | Thư giãn |
| **MyPet** | Nuôi dưỡng và rèn luyện kỹ năng thú cưng đồng hành (`/pet`). | Bầu bạn |
| **InteractiveChat** | Khoe trang bị (`[item]`) và túi đồ (`[inv]`) trực tiếp lên khung chat. | Tương tác cộng đồng |
| **ChunkLoader** | Đặt khối giữ chunk hoạt động cho máy móc/ruộng lúa khi đi xa. | Tự động hóa |
| **SkinRestorer** | Thay đổi ngoại trang skin tự do không giới hạn (`/skin`). | Cá nhân hóa |
| **Advanced Redeem** | Nhập mã giftcode nhận quà tân thủ và sự kiện (`/redeem`). | Quà tặng tri ân |
| **ImageFrame** | Treo tranh ảnh nghệ thuật từ URL lên khung tranh trong game. | Thẩm mỹ |
| **BoatLimiter** | Ngăn chặn spam thuyền trôi dạt giữ TPS máy chủ luôn mượt mà. | Ổn định server |
| **Chunky** | Pre-generate thế giới chống drop FPS khi người chơi mở map mới. | Hiệu năng |
| **ItemEdit / ItemRename** | Cho phép người chơi tự do chỉnh sửa vật phẩm trên tay với đủ mọi cách (đổi tên, sửa lore, định dạng màu sắc, làm kỷ vật/quà tặng). | Cá nhân hóa trang bị |
