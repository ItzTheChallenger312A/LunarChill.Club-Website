# LunarChill.Club — Quality Standards & Anti-Slop Charter
> **Tài liệu Quy chuẩn Chung (Standard Operating Guidelines)**
> Dành cho toàn bộ quá trình Thiết kế, Lập trình và Biên tập Nội dung website LunarChill.Club.
> Bắt buộc tuân thủ 100% nhằm đảm bảo chất lượng thủ công tinh tế (Human-Crafted Excellence) và triệt tiêu hoàn toàn mã nguồn / giao diện dạng "AI-Generated Slop".

---

## 1. Tuyên ngôn Triết lý & Bản sắc (Identity & Spirit)

* **Slogan cốt lõi:** *"Chill thôi, đừng có vội."* 🌙 (Bản phụ: *"Just chill, don't rush."*)
* **Phong cách chủ đạo:** **Cosmic Sanctuary & Cinematic Minecraft**
  - Đậm chất điện ảnh của Minecraft ban đêm nhưng gần gũi, đời thường, ấm cúng.
  - Tôn vinh hình khối voxel gãy gọn, sắc nét, không gượng ép biến thành các bong bóng tròn xoe hay template SaaS công nghiệp.
* **Nguyên tắc "Chất lượng hơn Tốc độ":**
  - Mọi dòng code, CSS class hay câu chữ xuất hiện trên website đều phải có lý do tồn tại rõ ràng.
  - Không phó mặc cho AI tự sinh code/giao diện chung chung mà không qua sàng lọc, định hình và mài giũa tỉ mỉ.

---

## 2. Quy chuẩn Thiết kế Giao diện (UI Design Standards)

> Áp dụng trực tiếp để khắc chế 45 lỗi Design Slop từ `slop-detect.com/docs`:

### 2.1. Quyết định Thiết kế Chính thức: Chuyển đổi sang Minecraft Voxel UI (Pixel Stepped Corners)
* ❌ **Cấm triệt để:** 
  - Không dùng bo tròn bán kính cong tròn (`border-radius: 8px`, `12px`, `16px`, `24px`...) làm mất đi bản sắc khối vuông Minecraft.
  - Không biến mọi nút bấm, tag, badge thành dạng viên thuốc tròn ủng (`rounded-full: 9999px`).
* ✔️ **Quy chuẩn Voxel Pixel UI mới (Chính thức áp dụng):**
  - **Triết lý:** `--radius: 0px` trên toàn hệ thống tokens, thay thế bằng cắt góc bậc thang pixel sắc nét (Pixel Stepped Architecture).
  - **Khung Phụ (Card, Box, Step, Feature, Command Chip):** Sử dụng `--clip-pixel-card` (cắt góc bậc thang 4px) kết hợp viền pixel sắc cạnh.
  - **Khung Chính (Plaque Connection Card, Buttons):** Sử dụng `--clip-pixel-plaque` (cắt góc 2 bậc 6px có gờ nhô đặc trưng Minecraft) kết hợp tactile shadow (`inset 0 2px 0`, `inset 0 -3px 0`).
  - **Sàn địa hình Voxel (Campsite Horizon):** Sử dụng dải texture pixel 16×16 nguyên bản của Minecraft (`grass_block_side`, `dirt`, `campfire_fire`, `item_lantern`) với `image-rendering: pixelated`.

### 2.2. Kiểm soát Màu sắc & Hiệu ứng (Colors & Glows)
* ❌ **Cấm triệt để:**
  - Không dùng màu tím/indigo đại trà (VibeCode Purple `#8B5CF6`).
  - Không thả các khối gradient tròn mờ trôi lơ lửng (Aurora Mesh Blobs).
  - Không dùng dải màu 4px ở đỉnh card (The 4px Top Accent Stripe).
  - Không lạm dụng kính mờ đục ngầu `backdrop-blur: 24px-30px` gây nhòe và tụt FPS.
* ✔️ **Quy chuẩn bắt buộc:**
  - **Bảng màu trích xuất từ `Lunar_Logo.png`:**
    - Nền gốc: Đen vô cực Deep Abyss `#090914`.
    - Bề mặt kính: Midnight Indigo mờ nhẹ `rgba(10, 14, 42, 0.75)` với `backdrop-filter: blur(12px)`.
    - Điểm nhấn chính: Waterfall Glow Blue `#688BF8` và Orbit Azure `#38BDF8`.
  - **Viền thẻ:** Viền mảnh sắc nét 1px đồng nhất 4 cạnh `1px solid rgba(104, 139, 248, 0.15)`.

### 2.3. Kiểm soát Tiêu đề & Typography (Headings & Fonts)
* ❌ **Cấm triệt để:**
  - Không dùng chữ cắt màu gradient lấp lánh (`background-clip: text; color: transparent;`).
  - Không chèn nhãn "eyebrow" chữ in hoa sáo rỗng phía trên H1 (`✨ WELCOME TO NEXT-GEN`).
  - Không dùng font mặc định cẩu thả không tinh chỉnh `line-height` hay `letter-spacing`.
* ✔️ **Quy chuẩn bắt buộc:**
  - Tiêu đề H1, H2, H3 là màu phẳng sắc nét Moon Core White `#FEFDFD`, tương phản tuyệt đối đạt chuẩn WCAG AAA.
  - Font Sans-serif hình học hiện đại (`Plus Jakarta Sans` / `Inter`) cho văn bản; Font Monospace (`JetBrains Mono`) cho bảng lệnh.

### 2.4. Kiểm soát Bố cục & Nhịp điệu (Layout & Rhythm)
* ❌ **Cấm triệt để:**
  - Không dùng lưới 3 cột đều tăm tắp với icon tròn trên đầu (The Generic 3-Up Grid).
  - Không vẽ biểu đồ dashboard giả lập hoặc số liệu thống kê không có thật.
  - Không để animation trôi nổi bồng bềnh liên tục (continuous floating).
* ✔️ **Quy chuẩn bắt buộc:**
  - Bố cục có điểm nhấn chính - phụ (Asymmetric Layout): Card nổi bật lớn hơn card phụ.
  - Chuyển động nhẹ nhàng, thời gian `150ms – 200ms`, tôn trọng `prefers-reduced-motion`.

---

## 3. Quy chuẩn Biên tập Nội dung & Văn phong (Copywriting Standards)

> Áp dụng trực tiếp để khắc chế 26 lỗi Copy Slop từ `slopdetector.org`:

### 3.1. Những thói quen văn phong cấm kỵ (Blacklisted Phrases & Habits)
* ❌ **Cấm mở đầu sáo mòn (Throat-clearing):**
  - Không viết: *"Trong thế giới ngày nay..."*, *"Trong kỷ nguyên số..."*
  - Không viết: *"Dù bạn là người mới hay kỳ cựu..."*
  - Không viết định nghĩa hiển nhiên: *"Minecraft là tựa game sinh tồn khối vuông..."*
* ❌ **Cấm cấu trúc đối lập công thức:**
  - Không viết: *"Không chỉ là một server, đây là một gia đình"* (Công thức AI kinh điển).
  - Không viết: *"Từ những cánh đồng cỏ xanh đến những đỉnh núi tuyết..."*
* ❌ **Cấm lạm dụng dấu gạch ngang Em-Dash (—):**
  - Không nhét dấu gạch ngang dài vào giữa mọi câu để cố tỏ ra triết lý, uyên thâm.
* ❌ **Cấm từ vựng bot sáo rỗng (Buzzword Infestation):**
  - Tránh triệt để: *đắm chìm (delve), bức tranh đa sắc (tapestry), ngọn hải đăng (beacon), vương quốc (realm), nâng tầm trải nghiệm, mở khóa tiềm năng, đột phá.*
* ❌ **Cấm giọng điệu "quảng cáo B2B" hoặc "sách tự lực (self-help)":**
  - Không biến web server Minecraft thành bản thuyết trình chào hàng phần mềm doanh nghiệp.

### 3.2. Giọng văn Con người LunarChill (The Human Voice of LunarChill)
* ✔️ **Gần gũi & Tự nhiên:** Dùng ngôn ngữ ấm áp, đời thường, có chút hóm hỉnh như anh em trong nhóm bạn thân rủ nhau chơi game.
* ✔️ **Trung thực & Thực tế:**
  - Cung cấp dữ liệu cụ thể: IP kết nối `LunarChill.club`, Cổng dùng chung `25572` (Java & Bedrock), phiên bản hỗ trợ.
  - Hướng dẫn ngắn gọn: 3 bước vào game, lệnh `/claim` để giữ đất, gặp lỗi mở ticket Discord.
* ✔️ **Ngắn gọn & Trực diện:** Đi thẳng vào thông tin người chơi cần, tôn trọng thời gian của người đọc.

---

## 4. Quy chuẩn Kỹ thuật Lập trình (Code Quality Standards)

### 4.1. Mã nguồn Vanilla Sạch sẽ (Zero Bloat)
* Viết HTML5 ngữ nghĩa (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* CSS tổ chức module rõ ràng: `variables.css` ➔ `base.css` ➔ `layout.css` ➔ `components.css`.
* Đặt tên class theo chuẩn BEM hoặc tiền tố có ngữ nghĩa (`lunar-card`, `lunar-btn-primary`, `lunar-status-badge`).
* JavaScript ES6+ module hóa (`config.js`, `status-service.js`, `clipboard.js`, `main.js`), không viết code spaghetti trong một file duy nhất.

### 4.2. API mcstatus.io & Quản lý Trạng thái Thực
* Phân định chặt chẽ 5 trạng thái: `Checking`, `Online`, `Offline`, `Unable to retrieve`, `Maintenance` (chỉ kích hoạt khi BQT gắn cờ chủ động).
* Đọc cache động từ trường `expires_at` do API trả về, lưu vào `sessionStorage` để không spam request (tuân thủ giới hạn 5 req/s).
* Cơ chế Graceful Degradation: Nếu API lỗi hoặc mất mạng, giao diện vẫn hiển thị nguyên vẹn địa chỉ IP kèm nút copy để người chơi tự vào game.

### 4.3. Phản hồi Tương tác (UX Feedback)
* Click nút Copy IP phải có phản hồi tức thì: nút đổi trạng thái thành `Đã sao chép! ✓` kèm Toast notification trượt nhẹ trong 2 giây.

---

## 5. Quy trình Kiểm duyệt trước khi Xuất bản (The 5-Step Pre-Commit Gate)

Trước khi commit bất kỳ thay đổi nào lên repository, mọi thành viên và agent phải đối soát qua 5 cổng kiểm định:

```
[Cổng 1: Corner Radius]
Card có bo <= 8px không? Nút bấm có bo <= 6px không? 
--> NẾU CÓ BO TRÒN 16-24px HOẶC PILL 9999px: REJECT!

[Cổng 2: Color & Glow]
Có dải màu 4px top-stripe không? Có gradient text không? Có blob tím trôi nổi không?
--> NẾU CÓ: REJECT!

[Cổng 3: Copywriting]
Có câu "Không chỉ là X, mà là Y" không? Có lạm dụng em-dash (—) không? Có từ "nâng tầm/đột phá" không?
--> NẾU CÓ: REJECT!

[Cổng 4: Data Reality]
Số liệu người chơi có lấy thật từ API không? IP và Port có rõ ràng không?
--> NẾU DỮ LIỆU FAKE / CỐ TÌNH HARDCODE: REJECT!

[Cổng 5: Performance & Mobile]
Layout có tràn viền ngang trên màn hình 360px không? Điểm Lighthouse có đạt >= 90 không?
--> NẾU LỖI RESPONSIVE: REJECT!
```

---

<div align="center">
  <sub>Quy chuẩn này là kim chỉ nam bất biến cho toàn bộ dự án LunarChill.Club-Website. 🌙</sub>
</div>
