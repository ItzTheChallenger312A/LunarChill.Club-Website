# LunarChillSMP — UI Direction & Visual Principles

> Tài liệu định hướng phong cách thị giác (Visual Direction), Moodboard, và các nguyên tắc thiết kế cốt lõi định hình diện mạo trang web LunarChillSMP theo chuẩn "Cinematic Minecraft & Cosmic Sanctuary", được dẫn dắt trực tiếp từ tác phẩm huy hiệu nhận diện `Lunar_Logo.png`.

---

## 1. Định hướng ý tưởng thị giác (Visual Concept & Moodboard)

LunarChillSMP chọn định hướng phong cách **"Cosmic Sanctuary" (Vùng trú ẩn thanh bình dưới bầu trời đêm vũ trụ)**.

* **Từ khóa cảm xúc (Keywords):**
  - *Serene (Thanh bình)*
  - *Cinematic (Điện ảnh)*
  - *Moonlit & Cosmic (Ánh trăng & Huyền ảo)*
  - *Voxel Floating Islands (Đảo nổi kỳ vĩ)*
  - *Clean & Uncluttered (Gọn gàng, tinh tế)*

### Cảm hứng thị giác từ `Lunar_Logo.png`:
Tác phẩm logo chính thức mang lại một hệ sinh thái thẩm mỹ trọn vẹn:
- **Phía trên:** Vầng trăng khuyết khổng lồ phát quang trắng ngọc bích soi rọi toàn bộ không gian.
- **Ở giữa:** Khối chữ "LUNAR" 3D góc cạnh vát nhọn mạnh mẽ, viền hào quang xanh lam dạ quang (`#688BF8`).
- **Phía dưới:** Những hòn đảo nổi voxel Minecraft với thác nước xanh biếc tuôn chảy xuyên qua các tầng mây tím đêm bồng bềnh.
- **Xung quanh:** Vòng quỹ đạo ánh sáng và bụi sao 4 cánh lấp lánh.

---

## 2. Ba Trụ cột Thiết kế Cốt lõi (Core Design Pillars)

### Trụ cột 1: Cinematic Minecraft (Minecraft mang hơi thở điện ảnh)
* **Ứng dụng:**
  - Hero Section tận dụng trọn vẹn sức mạnh thị giác của `Lunar_Logo.png` hoặc phong cảnh in-game có chiều sâu lớn (vùng núi ban đêm, bầu trời sao, đảo nổi phản chiếu ánh trăng).
  - Tận dụng lớp phủ Gradient chuyển mờ đen từ `#090914` ở đáy ảnh giúp văn bản hiển thị sắc nét 100%.

### Trụ cột 2: Modern Minimalism & Glassmorphism
* **Ứng dụng:**
  - Khoảng trống (Negative space) rộng rãi, tạo cảm giác thư thái, dễ chịu (Chill).
  - Sử dụng hiệu ứng Midnight Indigo Glass (`rgba(10, 14, 42, 0.75)` với `backdrop-filter: blur(16px)`) và viền dạ quang mờ (`rgba(104, 139, 248, 0.15)`).

### Trụ cột 3: Community Storytelling (Kể câu chuyện cộng đồng)
* **Ứng dụng:**
  - Nội dung tôn vinh các khoảnh khắc chân thực của người chơi, các hòn đảo sinh tồn, các công trình thị trấn Towny.

---

## 3. Kiến trúc Giao diện các Trang chính (Page Layout Directions)

### 3.1. Trang chủ (Homepage)
```
+-----------------------------------------------------------------------------------------+
| [Header] [Lunar Logo Icon] LunarChill      [Nav: Trang chủ / Cẩm nang / Nội quy]   [Copy IP] [Discord] |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|                                     HERO SECTION                                        |
|                                [ Circular Crest Logo ]                                  |
|                                                                                         |
|                        "Nơi sinh tồn tĩnh lặng dưới ánh trăng"                          |
|                       play.lunarchill.club (Bedrock Port: 19132)                        |
|                                                                                         |
|                    [ > Sao chép IP Server < ]   [ Tham gia Discord ]                    |
|                                                                                         |
|                 +------------------------------------------------------+                |
|                 |  ● Online | 24/50 người chơi | Java & Bedrock Hỗ trợ |                |
|                 +------------------------------------------------------+                |
+-----------------------------------------------------------------------------------------+
|  [3 Bước vào game cực nhanh: 1. Mở Minecraft -> 2. Nhập IP -> 3. Bắt đầu sinh tồn]     |
+-----------------------------------------------------------------------------------------+
|  [Bản sắc máy chủ: Sinh tồn thuần khiết | Đảo nổi & Towny văn minh | Tuyệt đối không P2W]|
+-----------------------------------------------------------------------------------------+
|  [Thư viện khoảnh khắc cộng đồng: Showcase ảnh công trình & sự kiện máy chủ]            |
+-----------------------------------------------------------------------------------------+
| [Footer] Copyright LunarChillSMP | Links nhanh | Mojang EULA Disclaimer bắt buộc        |
+-----------------------------------------------------------------------------------------+
```

### 3.2. Trang Cẩm nang & Lệnh (`/guide`)
* **Thiết kế:** Bố cục 2 cột (Desktop) gồm mục lục bên trái (Sticky Table of Contents) và nội dung bên phải; trên Mobile tự động thu về dạng danh sách dọc.
* **Tương tác:** Mỗi câu lệnh được đặt trong một Command Box (nền `#060A22`), có nút nhấp-là-sao-chép tiện lợi.

### 3.3. Trang Nội quy (`/rules`)
* **Thiết kế:** Dạng thẻ danh mục (Tabs hoặc Accordion phân tầng): Gian lận (Cheating/Hacks), Ứng xử (Behavior), Bảo vệ công trình (Griefing/Towny) và Quy trình khiếu nại (Appeals Ticket).
* **Điểm nhấn:** Cuối trang có khối Callout nổi bật: *"Gặp sự cố cần can thiệp? [Mở Ticket hỗ trợ trên Discord ngay]"*.

### 3.4. Trang Điều khoản & Bảo mật (`/terms`, `/privacy`)
* **Thiết kế:** Layout văn bản tập trung (Centered Reading Layout, max-width `840px`), phân mục rõ ràng từ 1 đến 7 theo khung Luật 91/2025/QH15 và Nghị định 356/2025/NĐ-CP.
* **Trải nghiệm:** Phông chữ dịu mắt (`#94A3B8`), khoảng cách dòng thoáng (line-height 1.6), có mục lục điều hướng nhanh ở đầu trang.

---

## 4. Nguyên tắc Hiệu ứng & Chuyển động (Motion & Animation Principles)

* **Nhẹ nhàng & Tinh tế (Subtle & Natural):** Thời gian chuyển động (duration) chuẩn từ `150ms` đến `250ms`, sử dụng `cubic-bezier(0.16, 1, 0.3, 1)` cho cảm giác mượt mà không gượng ép.
* **Micro-interactions:**
  - Hover nút Copy IP: Ánh sáng Waterfall Glow Blue (`#688BF8`) phát sáng dịu dàng quanh viền.
  - Sau khi bấm Copy: Biểu tượng chuyển đổi nhanh sang dấu tick xanh kèm toast notification.
  - Server Status Dot: Hiệu ứng breathing pulse xanh lá (`#10B981`) tượng trưng cho nhịp sống máy chủ đang hoạt động.
* **Tôn trọng người dùng (Accessibility):** Tự động vô hiệu hóa hiệu ứng chuyển động nếu người dùng bật chế độ `prefers-reduced-motion` trong hệ điều hành.
