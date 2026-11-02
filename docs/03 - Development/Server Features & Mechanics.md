# Server Features & Gameplay Mechanics — LunarChillSMP

> **Nguồn dữ liệu:** Đặc tả kỹ thuật chính thức từ BQT máy chủ LunarChillSMP  
> **Cập nhật lần cuối:** 2026-11-02  
> **Phiên bản:** 2.0 (Toàn diện & Chi tiết cơ chế)  
> **Triết lý vận hành:** Sinh tồn thư thái nhưng có chiều sâu (*"Chill thôi, đừng có vội."* 🌙). Loại bỏ các thủ thuật lạm dụng lỗi game (anti-cheese), khuyến khích thám hiểm tự nhiên, tương trợ đồng đội và trải nghiệm khám phá chân thật.

---

## 1. Cơ chế Sinh tồn Đặc thù (Unique Survival Mechanics)

### 1.1. Khai khoáng & Hiệu ứng Đào Chậm (Mining Fatigue Penalty)
- **Khu vực áp dụng:** Từ tọa độ **$Y \le 0$ trở xuống** lòng đất sâu.
- **Khối bị ảnh hưởng:** Đá bảng sâu (*Deepslate*), Đá hoa cương (*Granite*), Đá điorit (*Diorite*), Đá anđêzit (*Andesite*).
- **Hình phạt:** Khi đào các khối đá trên ở độ sâu $Y \le 0$, nhân vật sẽ bị dính hiệu ứng **Đào chậm (Mining Fatigue) kéo dài trong 1 phút**.
- **Điều kiện miễn trừ (Exemption):** Khi người chơi duy trì từ **30 cấp độ kinh nghiệm (Level 30+)** trở lên, nhân vật sẽ được miễn trừ hoàn toàn và có thể đào đá sâu bình thường.
- **Quy tắc Ancient Debris:** Khối **Mảnh vỡ cổ đại (Ancient Debris)** khi đào sẽ **LUÔN LUÔN bị hiệu ứng Đào chậm 1 phút**, tuyệt đối **KHÔNG THỂ MIỄN TRỪ** kể cả khi đạt cấp 30+.
- **Định hướng lối chơi:** Chấm dứt lối chơi cày hầm đào thẳng thủ công (strip-mining) nhàm chán. Khuyến khích người chơi mạo hiểm thám hiểm các mạng lưới hang động sâu tự nhiên khổng lồ (*Deep Dark, Mega Caves*) để khai thác quặng lộ thiên.

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

## 2. Đại tu Chiều không gian The End & The Nether

### 2.1. The End: Bộ đôi Nullscape & Stellarity
The End tại LunarChill không phải là một vùng hoang mạc đơn điệu, mà là tâm điểm của gameplay đỉnh cao:
1. **Nullscape (Datapack Đại tu Địa hình The End):**
   - Mở rộng chiều cao The End lên tới 384 block.
   - Kiến tạo những hòn đảo hư không lơ lửng khổng lồ, các vết nứt không gian, vực thẳm và địa hình hiểm trở ngoạn mục.
2. **Stellarity & StellarityOptimizer (Datapack Đại tu Toàn diện Lối chơi The End):**
   - Đem đến hệ thống biome huyền ảo, đền đài bí ẩn ngoài không gian.
   - Thử thách Boss độc bản mới, trang bị và cổ vật thần thoại với cơ chế chiến đấu riêng biệt.
   - Hệ thống chế tạo đặc biệt (**Custom Crafting**).
   - Tối ưu hóa TPS máy chủ mượt mà thông qua `StellarityOptimizer`.
3. **Quy tắc The End:**
   - **Tuyệt đối KHÔNG THỂ đặt nước tại The End** (người chơi phải dùng kỹ năng nhảy, ngọc Ender hoặc elytra).
   - Tiêu hao oxy 2% / 10s (bắt buộc mang Beacon đi cùng).

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
| **ItemEdit** | Quản lý tên/lore cho các vật phẩm lưu niệm giải đấu, lễ hội. | Quản trị sự kiện |
