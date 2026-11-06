# Test Matrix & Bug Tracking

> **Mục tiêu:** Ma trận kiểm thử toàn diện trên đa thiết bị, đa trình duyệt và theo dõi các lỗi phát sinh trong quá trình phát triển website LunarChill.  
> **Cập nhật:** 2026-11-04 (Giai đoạn chuyển giao Phase 03 ➔ Phase 04 QA & Review)  
> **Tiêu chuẩn kiểm nghiệm:** [`Quality Standards.md`](../Quality%20Standards.md) & [`Acceptance Criteria.md`](Acceptance%20Criteria.md)

---

## 1. Ma trận thiết bị & Trình duyệt (Test Matrix)

> **Quy ước trạng thái:**  
> • 🟢 **Đã test (Thiết bị thật):** Đã kiểm tra trực tiếp trên phần cứng thực tế.  
> • 🟡 **DevTools (Mô phỏng):** Đã kiểm tra qua DevTools Device Mode / Responsive Viewer.  
> • ⬜ **Chưa test:** Cần chạy smoke test sau khi deploy lên staging/production.

| Thiết bị / Môi trường | Trình duyệt thử nghiệm | Kích thước màn hình | Trạng thái kiểm tra | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop Windows** | Google Chrome | 1920x1080 (FHD) | 🟢 Đã test | Thiết bị thật, hiển thị chuẩn Pixel UI |
| **Desktop Windows** | Microsoft Edge | 1920x1080 (FHD) | 🟢 Đã test | Thiết bị thật, animation lửa trại mượt 60fps |
| **Desktop Windows** | Chrome Responsive | 1366x768 (Laptop) | 🟡 DevTools | Co giãn responsive tốt |
| **Desktop macOS** | Safari / Chrome | 2560x1440 (2K Retina) | ⬜ Chưa test | Chờ test sau khi deploy preview |
| **Tablet iPad** | Safari Responsive | 810x1080 / 1024x768 | 🟡 DevTools | Grid 3-node chuyển 1 cột ổn định |
| **Mobile Android** | Chrome Mobile | 390x844 (Pixel / Galaxy) | 🟡 DevTools | Drawer & inert hoạt động tốt, campsites co giãn |
| **Mobile iOS** | Safari Mobile | 375x667 (iPhone SE) | ⬜ Chưa test | Chờ test trên iPhone thực tế |

---

## 2. Kiểm thử Tính năng (Functional Test Cases)

| Mã test | Mô tả kịch bản | Kỳ vọng | Kết quả |
| :--- | :--- | :--- | :--- |
| **TC-01** | Bấm nút "Sao chép IP PC" ở Header / Hero / Portal | Copy `LunarChill.club:25572` vào clipboard, hiện Toast | ✅ Đạt |
| **TC-02** | Bấm nút "Sao chép Host PE" | Copy `LunarChill.club` vào clipboard, hiện Toast | ✅ Đạt |
| **TC-03** | Bấm vào bất kỳ lệnh nào trong Cẩm nang | Copy lệnh (VD: `/spawn`, `/claim`), hiện Toast | ✅ Đạt |
| **TC-04** | API mcstatus.io phản hồi online | Hiển thị chấm xanh + số người chơi thực dạng Big Metric | ✅ Đạt |
| **TC-05** | API mcstatus.io timeout hoặc offline | Hiển thị chấm xám/đỏ không crash giao diện, fallback an toàn | ✅ Đạt |
| **TC-06** | Mở/đóng Menu trên Mobile | Drawer trượt mượt mà, hỗ trợ phím Escape, quản lý focus | ✅ Đạt |
| **TC-07** | Nhấp link Discord | Mở tab mời Discord chính thức từ `CONFIG.DISCORD_INVITE_URL` | ✅ Đạt |
| **TC-08** | Player Count Fallback: 1 bên online, 1 bên offline | Luôn lấy số người chơi của nền tảng Online, không bị đè số 0 | ✅ Đạt |
| **TC-09** | Bộ lọc danh mục Gallery (`gallery.html`) | Bấm các nút lọc và truy cập qua hash `#filter-towns` hiển thị đúng mục | ✅ Đạt |
| **TC-10** | Animation lửa trại (The Campsite Horizon) | Sprite 8-frame chạy bập bùng bằng CSS `steps(8)` êm dịu, khói bay tự nhiên | ✅ Đạt |
| **TC-11** | Cấu trúc Towns (`towns.html`) & Gallery (`gallery.html`) | Hiển thị trung thực khung chờ dữ liệu thật từ BQT (Anti-Slop) | ✅ Đạt |
| **TC-12** | Deep QA Audit toàn bộ 8 trang HTML (Links, Assets, Drawer, Canonical, Clipboard) | 0 link hỏng, 0 asset thiếu, 0 lỗi thương hiệu cũ, clean URLs đồng bộ Vercel | ✅ Đạt |
| **TC-13** | Điều hướng và hiển thị The End Hub (`the-end.html`) | Hiển thị 4 luật sinh tồn, bảng so sánh Stellarity vs Nullscape, subnav hoạt động mượt | ✅ Đạt |
| **TC-14** | Tra cứu Stellarity (`stellarity.html`) | 12 khung cảnh, bảng 23 biome, 52 thẻ vật phẩm & công thức chế tạo hiển thị ảnh sprite phóng to và nguyên liệu chuẩn | ✅ Đạt |
| **TC-15** | Tra cứu Nullscape (`nullscape.html`) | 13 khung cảnh 384 blocks, 4 biome đặc hữu, thông số kỹ thuật và bản quyền Stardust Labs | ✅ Đạt |
| **TC-16** | Cập nhật Sprite Dragonblade v6 & Dải tiến hóa Harvester (`stellarity.html`) | Texture Dragonblade chuẩn v6 (200 OK), dải tiến hóa 5 cấp Frigid Harvester (T0 ➜ T4) và 5 cấp Molten Harvester (M0 ➜ M4) hiển thị pixelated sắc nét, co giãn responsive tốt | ✅ Đạt |

---

## 3. Kiểm thử Ranh giới Anti-Slop (Anti-Slop Compliance Audit)

- [x] **Corner Radius & Voxel UI Audit:** Toàn bộ hệ thống chuyển sang `--radius: 0px`, sử dụng `--clip-pixel-card` và `--clip-pixel-plaque`. Không có class `rounded-full` 9999px.
- [x] **Top Stripe Audit:** Không có bất kỳ thẻ nào có viền accent 2px–3px trên đỉnh.
- [x] **Aurora / Glow Audit:** Không có hiệu ứng quầng sáng cầu vồng trôi nổi vô nghĩa; vầng sáng lửa trại và đèn lồng ấm cúng có chủ đích thị giác.
- [x] **Text Clipping Audit:** Không áp dụng `background-clip: text` làm mờ chữ.
- [x] **Copywriting Audit:** Không có từ ngữ sáo rỗng AI (*"liền mạch"*, *"vô song"*, *"thế giới tuyệt mỹ"*).
- [x] **Honest Skeleton Audit:** Trang Towns và Gallery thông báo trung thực đang tổng hợp tư liệu thực tế từ cộng đồng, không dựng dữ liệu giả.

---

## 4. Bảng theo dõi Lỗi & Tồn đọng (Bug Tracking Log)

| Bug ID | Mức độ | Mô tả lỗi / Vấn đề | Giải pháp đã áp dụng | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | P0 | Domain ghi nhầm thành `play.lunarchill.club` | Thay thế toàn bộ thành `LunarChill.club` | 🟢 Đã sửa |
| **BUG-02** | P0 | Cổng kết nối PC & PE dùng port mặc định cũ | Cập nhật PC `25572`, PE `19143` | 🟢 Đã sửa |
| **BUG-03** | P0 | Status Service chỉ check Java, bỏ qua Bedrock | Triển khai Dual Promise độc lập cho cả 2 nền tảng | 🟢 Đã sửa |
| **BUG-04** | P1 | Toast clipboard sử dụng innerHTML | Đổi sang `textContent` chống XSS an toàn | 🟢 Đã sửa |
| **BUG-05** | P1 | Drawer mobile thiếu thuộc tính `inert` | Đã bổ sung `inert` và quản lý focus khi đóng mở | 🟢 Đã sửa |
| **BUG-06** | P1 | Thiếu ảnh screenshot thật cho Community Gallery | Sử dụng Honest Skeleton thông báo BQT đang tổng hợp tư liệu | 🟢 Đã đồng bộ |
| **BUG-07** | P0 | Không thể chuyển trang khi mở local / link trỏ `/guide` bị 404 | Chuyển toàn bộ internal links sang file tương đối (`guide.html`, `rules.html`, ...) kết hợp explicit rewrites trong `vercel.json` | 🟢 Đã sửa |
| **BUG-08** | P0 | Thiếu link Google Fonts cho `Plus Jakarta Sans` & `JetBrains Mono` | Bổ sung preconnect & stylesheet Google Fonts vào `<head>` toàn bộ 8 trang | 🟢 Đã sửa |
| **BUG-09** | P1 | `applyCombinedStatus` báo Offline giả khi API thiếu trường `online` | Thêm kiểm tra `typeof online === 'boolean'`, fallback an toàn về `unable` | 🟢 Đã sửa |
| **BUG-10** | P2 | Quá nhiều inline styles trong `index.html` và footer | Chuyển toàn bộ sang CSS classes trong `home.css` và `layout.css`, dùng token | 🟢 Đã sửa |
| **BUG-11** | P1 | Player count fallback lấy số 0 của Java khi Java offline đè lên Bedrock | Cập nhật logic: Ưu tiên nền tảng đang Online thực tế, dùng `Math.max` khi cross-play | 🟢 Đã sửa |
| **BUG-12** | P2 | Tiêu đề "Trạng thái các cổng kết nối" bị dính chữ do `word-spacing` âm | Đặt lại `word-spacing: normal; letter-spacing: normal;` trên font sans | 🟢 Đã sửa |
| **BUG-13** | P1 | Tên thương hiệu còn sót `LunarChillSMP` | Thay thế triệt để thành `LunarChill.Club` trên 100% tệp tin | 🟢 Đã sửa |
| **BUG-14** | P1 | `towns.html` & `gallery.html` dùng thẻ canonical có đuôi `.html` và thiếu rewrite trong `vercel.json` | Đồng bộ canonical về clean URLs (`/towns`, `/gallery`) và thêm rewrite explicit trong `vercel.json` | 🟢 Đã sửa |
| **BUG-15** | P0 | Cổng Bedrock khác cổng Java (19143 vs 25572) gây nhầm lẫn khi người chơi vào game | Đồng nhất port `25572` cho cả Java & Bedrock trên toàn bộ `config.js`, UI các thẻ kết nối và 8 trang HTML, kèm cơ chế fallback chuyển tiếp thông minh | 🟢 Đã sửa |
| **BUG-16** | P2 | Ký tự tiếng Thái thừa (`เธอ`) trong đoạn mô tả Boss Empress of Light trên `stellarity.html` | Xóa ký tự thừa, tra soát lại toàn bộ văn bản | 🟢 Đã sửa |
| **BUG-17** | P1 | Văn phong AI slop (từ ngữ sáo rỗng, tên Hán-Việt/kiếm hiệp tự chế, em-dash `—`, hover giả) trên các trang The End | Thực hiện rà soát Anti-Slop Writing & Design toàn diện: đổi tên vật phẩm/quần xã về chuẩn game, tắt hover giả trên static card, căn `tabular-nums` | 🟢 Đã sửa |
| **BUG-18** | P2 | Dragonblade còn dùng texture v5 cũ & Harvester thiếu các dải form tiến hóa theo kill score | Cập nhật URL texture v6 cho Dragonblade, trích xuất đầy đủ 10 texture (5 Frigid T0..T4 & 5 Molten M0..M4) từ repo Prismatic-Shards v6 vào showcase đa tầng | 🟢 Đã sửa |
| **BUG-19** | P1 | Thẻ Harvester bị tràn dọc làm lệch bố cục, tạo khoảng trống lớn ở thẻ Kaleidoscope bên phải; texture sprite hiển thị nhỏ | Tái cấu trúc thành 3-frame variant cùng box (T0 Băng, T4 Max Băng, Molten Max Lửa), phóng to `.item-sprite-box` (108px/88px), thiết lập `card-span-2` cho Harvester để cột phải chứa vừa vặn 2 thẻ vũ khí cân bằng chiều cao | 🟢 Đã sửa |
