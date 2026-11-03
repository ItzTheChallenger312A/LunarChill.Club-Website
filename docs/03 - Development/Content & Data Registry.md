# LunarChill - Content & Data Registry (Single Source of Truth)

> **Tài liệu nguồn dữ liệu chuẩn (SSOT)**  
> Quản lý tập trung toàn bộ dữ liệu thực tế, thông số kết nối, nội dung cẩm nang, nội quy, danh sách plugin/datapack, cơ chế sinh tồn đặc thù và người chịu trách nhiệm xác nhận thông tin cho website LunarChillSMP.

---

## 1. Thông số Kết nối Máy chủ (Server Connection Specs)

| Thông số | Giá trị thực tế | Tình trạng xác nhận | Người xác nhận |
| :--- | :--- | :--- | :--- |
| **Domain chính (Web & Server)** | `LunarChill.club` | Đã cấu hình DNS | BQT Server |
| **PC (Java Edition) IP** | `LunarChill.club` | Đang hoạt động | BQT Server |
| **PC Port** | `25572` | Đang hoạt động | BQT Server |
| **PE (Bedrock Edition) IP** | `LunarChill.club` | Đang hoạt động | BQT Server |
| **PE Port** | `19143` (bắt buộc nhập) | Đang hoạt động | BQT Server |
| **Phiên bản hỗ trợ PC** | 1.21.11 đến bản mới nhất (26.3) | Đã xác nhận | BQT Server |
| **Phiên bản hỗ trợ PE** | 26.30 – 26.51 | Đã xác nhận | BQT Server |
| **Query Server Mode** | `enable-query=true` (Port: 25572) | mcstatus.io Dual Fetch | Lead Dev |

---

## 2. Liên kết Ngoại vi & Hệ sinh thái (External Links)

| Kênh / Dịch vụ | URL thực tế | Mục đích | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Discord Community** | `https://discord.gg/lunarchill` | Tham gia cộng đồng, mở Ticket hỗ trợ | Hoạt động |
| **mcstatus.io PC (Java)** | `https://api.mcstatus.io/v2/status/java/LunarChill.club:25572` | Trạng thái online & số người chơi PC | Đã tích hợp |
| **mcstatus.io PE (Bedrock)**| `https://api.mcstatus.io/v2/status/bedrock/LunarChill.club:19143` | Trạng thái online & số người chơi PE | Đã tích hợp |

---

## 3. Các Mod Client Được Hỗ Trợ Chính Thức (Recommended Client Mods)

1. **Xaero-Map (World Map & Minimap):** Khuyến khích sử dụng, hỗ trợ chính thức không lo bị đè map hay mất tọa độ cứ điểm.
2. **Simple Voice Chat:** Đàm thoại giọng nói 3D định hướng theo khoảng cách nhân vật in-game.
3. **ImageMap Client:** Mod hỗ trợ hiển thị tranh ảnh nét phân giải cao từ plugin ImageFrame.
4. **PatPat:** Hiển thị hoạt ảnh vỗ về / xoa đầu người chơi khác.
5. **Sodium & Iris Shaders (Fabric):** Tối ưu hóa rendering tăng FPS và hỗ trợ shaderpack ánh trăng.

---

## 4. Cơ chế Sinh tồn Đặc thù (Unique Gameplay Mechanics)

### 4.1. Khai khoáng & Hiệu ứng Đào Chậm
- Tọa độ $Y \le 0$: Đào Deepslate, Diorite, Andesite, Granite bị **Đào chậm 1 phút**.
- **Miễn trừ:** Giữ **30 level kinh nghiệm trở lên** được đào bình thường không bị phạt.
- **Ancient Debris:** Luôn bị **Đào chậm 1 phút, không thể miễn trừ**.
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
- **Nullscape:** Datapack đại tu địa hình The End (độ cao 384 block, vách đá hư không).
- **Stellarity & StellarityOptimizer:** Đại tu toàn bộ lối chơi The End (biome, đền đài, Boss mới, cổ vật). Có **Custom Crafting**.
- Tuyệt đối **không thể đặt nước ở The End**.

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

---

## 5. Bảng Lệnh Thông dụng In-game (`/guide`)

| Nhóm lệnh | Cú pháp lệnh | Mô tả công dụng | Cho phép Copy |
| :--- | :--- | :--- | :--- |
| **Di chuyển & Căn cứ** | `/spawn` | Dịch chuyển tức thời về Khu vực Trung tâm (Spawn) | Có (`copy-ip`) |
| | `/sethome [tên]` | Đặt điểm dịch chuyển tại nhà cá nhân | Có |
| | `/home [tên]` | Quay trở về điểm nhà đã lưu | Có |
| | `/tpa [tên_người_chơi]` | Gửi yêu cầu dịch chuyển tới bạn bè | Có |
| | `/tpaccept` | Đồng ý yêu cầu dịch chuyển | Có |
| | `/lay` | Nằm nghỉ ngơi reset Phantom mà không cần ngủ qua đêm | Có |
| | *Beacon Waypoint* | Tương tác với Beacon để dịch chuyển tức thời | In-game |
| **Thị trấn & Đất đai (Towny)** | `/town` | Xem thông tin thị trấn của bạn | Có |
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
| **Tiện ích & Chat** | `[item]` hoặc `[i]` | Khoe vật phẩm đang cầm trên tay lên khung chat | Có |
| | `[inv]` | Hiển thị toàn bộ túi đồ hiện tại lên khung chat | Có |
| | `/skin [tên_skin]` | Thay đổi trang phục skin nhân vật | Có |
| | `/redeem [mã_code]` | Nhập mã giftcode nhận quà tân thủ / sự kiện | Có |
| | *AxShulkers* | Shift + Chuột phải vào Shulker trong balo để mở nhanh | In-game |

---

## 6. Danh mục Nội quy & Khung Kỷ luật (`/rules`)

* **Điều 1: Chống gian lận (Zero Tolerance for Cheating):**
  - Nghiêm cấm hack, x-ray, auto-click, baritone, freecam hoặc lợi dụng lỗi game (glitch/dupe).
  - *Hình phạt:* Khóa tài khoản vĩnh viễn (Permanent Ban), không ân xá.
* **Điều 2: Văn hóa ứng xử & Tôn trọng (Respect & Anti-toxicity):**
  - Không chửi bới, xúc phạm danh dự, phân biệt vùng miền/tôn giáo, không spam kênh chat.
  - *Hình phạt:* Cảnh cáo ➔ Mute 1 giờ ➔ Mute 24 giờ ➔ Tạm khóa tài khoản.
* **Điều 3: Bảo vệ công trình & Cấm Griefing:**
  - Không phá hoại công trình của người khác (dù chưa kịp claim), không bẫy người chơi (trap/kill) tại khu vực cấm PvP.
  - *Hình phạt:* Rollback hoàn trả tài sản qua CoreProtect + Tạm khóa 3 đến 7 ngày.
* **Điều 4: Quy trình Khiếu nại (Appeals Ticket):**
  - Mọi sự cố bị hại hoặc tố cáo vi phạm được tiếp nhận duy nhất qua hệ thống **Ticket trên Discord chính thức**. BQT xử lý theo bằng chứng (ảnh/video/logs CoreProtect).

---

## 7. Người Chịu Trách nhiệm Xác nhận Dữ liệu

| Hạng mục | Người phụ trách | Kênh liên hệ |
| :--- | :--- | :--- |
| Thông số IP, Port, Server DNS, Query | Server Admin | Discord / In-game Ops |
| Kịch bản Nội quy, Bảng lệnh, FAQ | Server Admin / Head Mod | Discord Ops |
| Kiểm soát nội dung trên Web so với SSOT | Lead Frontend Developer | Git Repo Maintainer |
