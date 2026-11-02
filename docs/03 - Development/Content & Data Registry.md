# LunarChillSMP — Content & Data Registry (Single Source of Truth)

> **Tài liệu nguồn dữ liệu chuẩn (SSOT)**
> Quản lý tập trung toàn bộ dữ liệu thực tế, thông số kết nối, nội dung cẩm nang, nội quy và người chịu trách nhiệm xác nhận thông tin cho website LunarChillSMP.

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
| **Query Server Mode** | `enable-query=true` (Port: 25572) | Chờ test phản hồi player list | BQT Server |

---

## 2. Liên kết Ngoại vi & Hệ sinh thái (External Links)

| Kênh / Dịch vụ | URL thực tế | Mục đích | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Discord Community** | `https://discord.gg/lunarchill` *(tạm thời / chờ invite vĩnh viễn)* | Tham gia cộng đồng, mở Ticket hỗ trợ | Cần link invite vĩnh viễn từ BQT |
| **Live Map (Bản đồ web)** | `https://map.lunarchill.club` (Dynmap/BlueMap) | Xem bản đồ thế giới thời gian thực | Mở tab mới (`_blank`) |
| **mcstatus.io PC (Java)** | `https://api.mcstatus.io/v2/status/java/LunarChill.club:25572` | Fetch trạng thái online & số người chơi | Sẵn sàng tích hợp |
| **mcstatus.io PE (Bedrock)**| `https://api.mcstatus.io/v2/status/bedrock/LunarChill.club:19143` | Dự phòng tra cứu Bedrock | Sẵn sàng tích hợp |

---

## 3. Bản sắc & Tính năng Gameplay Thực tế (Core Features)

1. **Sinh tồn thuần khiết (Vanilla Enhanced):**
   - Giữ nguyên trải nghiệm sinh tồn cốt lõi của Minecraft, không mod quá đà, cân bằng kinh tế và tài nguyên.
2. **Thị trấn & Giữ đất (Towny Protection):**
   - Cho phép người chơi lập thị trấn, bảo vệ công trình cá nhân/tập thể, ngăn chặn hoàn toàn nạn griefing hay phá hoại.
3. **Cộng đồng văn minh & Không Pay-to-Win (Fair Play):**
   - Tuyệt đối không bán đồ bá đạo, không có rank tạo đặc quyền áp đảo. Mọi thành viên bình đẳng.

---

## 4. Bảng Lệnh Thông dụng In-game (`/guide`)

| Nhóm lệnh | Cú pháp lệnh | Mô tả công dụng | Cho phép Copy 1-Click |
| :--- | :--- | :--- | :--- |
| **Di chuyển** | `/spawn` | Dịch chuyển tức thời về Khu vực Trung tâm (Spawn) | Có (`copy-cmd`) |
| | `/sethome [tên]` | Đặt điểm dịch chuyển tại nhà cá nhân | Có |
| | `/home [tên]` | Quay trở về điểm nhà đã lưu | Có |
| | `/tpa [tên_người_chơi]` | Gửi yêu cầu dịch chuyển tới vị trí bạn bè | Có |
| | `/tpaccept` | Chấp nhận yêu cầu dịch chuyển của người khác | Có |
| **Bảo vệ đất** | `/claim` hoặc dùng xẻng vàng | Đánh dấu ranh giới bảo vệ công trình | Có |
| | `/trust [tên_người_chơi]` | Cấp quyền xây dựng/mở rương cho bạn bè | Có |
| | `/untrust [tên_người_chơi]` | Hủy quyền truy cập của người chơi vào khu đất | Có |
| **Giao tiếp** | `/msg [tên] [nội dung]` | Nhắn tin riêng tư cho một người chơi | Có |
| | `/r [nội dung]` | Trả lời nhanh tin nhắn riêng vừa nhận | Có |
| | `/guide` | Mở menu cẩm nang tân thủ trực tiếp in-game | Có |

---

## 5. Danh mục Nội quy & Khung Kỷ luật (`/rules`)

* **Điều 1 — Chống gian lận (Zero Tolerance for Cheating):**
  - Nghiêm cấm hack, x-ray, auto-click, baritone, freecam hoặc lợi dụng lỗi game (glitch/dupe).
  - *Hình phạt:* Khóa tài khoản vĩnh viễn (Permanent Ban), không ân xá.
* **Điều 2 — Văn hóa ứng xử & Tôn trọng (Respect & Anti-toxicity):**
  - Không chửi bới, xúc phạm danh dự, phân biệt vùng miền/tôn giáo, không spam kênh chat.
  - *Hình phạt:* Cảnh cáo ➔ Mute 1 giờ ➔ Mute 24 giờ ➔ Tạm khóa tài khoản.
* **Điều 3 — Bảo vệ công trình & Cấm Griefing:**
  - Không phá hoại công trình của người khác (dù chưa kịp claim), không bẫy người chơi (trap/kill) tại khu vực cấm PvP.
  - *Hình phạt:* Rollback hoàn trả tài sản + Tạm khóa 3 đến 7 ngày.
* **Điều 4 — Quy trình Khiếu nại (Appeals Ticket):**
  - Mọi sự cố bị hại hoặc tố cáo vi phạm được tiếp nhận duy nhất qua hệ thống **Ticket trên Discord chính thức**. BQT xử lý theo bằng chứng (ảnh/video/logs CoreProtect).

---

## 6. Người Chịu Trách nhiệm Xác nhận Dữ liệu

| Hạng mục | Người phụ trách | Kênh liên hệ |
| :--- | :--- | :--- |
| Thông số IP, Port, Server DNS, Query | Server Admin | Discord / In-game Ops |
| Kịch bản Nội quy, Bảng lệnh, FAQ | Server Admin / Head Mod | Discord Ops |
| Kiểm soát nội dung trên Web so với SSOT | Lead Frontend Developer | Git Repo Maintainer |
