# LunarChill.Club — Dev's Notes

> Ghi chép kỹ thuật, nhật ký phát triển, các quyết định kiến trúc giao diện và lưu ý vận hành dành cho Ban Quản Trị & Nhà phát triển website LunarChill.Club.

---

## 📌 Thông tin tài liệu

- **Dự án:** Website chính thức LunarChill.Club
- **Tập tin:** `docs/04 - Admin's Notes/Dev's Notes.md`
- **Khởi tạo:** 04/11/2026
- **Trạng thái:** Tài liệu mở (Living Document)
- **Tech Stack:** Vanilla HTML5, Modern CSS3 (GPU-accelerated, Pixel Voxel Architecture), Vanilla JavaScript (ES6+ Modules)

---

## 1. Kiến trúc Bố cục Mở đầu (Hero & Server Portal)

Giao diện đầu trang được thiết kế theo cấu trúc **2 tầng chuyển tiếp tự nhiên (Natural World Divider)**:

### 1.1. Tầng 1: Hero Căn Giữa & Góc Cắm Trại Đêm (The Campsite Horizon)
- **Định hướng thị giác:** Loại bỏ hoàn toàn bố cục 2 cột lặp logo, gom thông điệp vào trung tâm (Center Stage) tạo cảm giác không gian vũ trụ tĩnh lặng (*Cosmic Sanctuary*).
- **Slogan cốt lõi:** *"Chill thôi, đừng có vội. 🌙"* & *"Just chill, don't rush."*.
- **Ranh giới chuyển tầng (Campsite Divider):**
  - Sử dụng asset texture pixel gốc 16×16 trích xuất trực tiếp từ bản cài đặt Minecraft: khối cỏ `grass_block_side.png`, lớp đất `dirt.png`, đốm lửa trại `campfire_fire.png`, đèn lồng `item_lantern.png`, ghế gỗ `oak_log.png`.
  - **Hoạt ảnh chuyển động tĩnh (Subtle Motion):**
    - Đốm lửa trại chạy CSS Sprite animation `steps(8)` bập bùng tự nhiên.
    - Vầng sáng hào quang cam ấm (`campfire-glow`) và vàng dịu (`lantern-glow`) thở nhẹ nhàng chu kỳ 2.8s – 4s.
    - Khói pixel (`smoke-particle`) trôi lững lờ lên cao rồi mờ dần.

### 1.2. Tầng 2: Bảng Cổng Kết Nối Máy Chủ (Server Portal Card)
- **Nguồn cảm hứng:** Kế thừa bố cục tinh gọn, hiện đại từ *TheLovelyValley.org*, kết hợp ngôn ngữ thiết kế Pixel Plaque và nền tối *Midnight Indigo* của LunarChill.
- **Các thành phần chính:**
  - **Big Player Counter:** Chỉ số người chơi online kích thước lớn (`0 / 50 người đang chơi`), đặt cạnh hộp **Phiên bản hỗ trợ** (`PC 1.21.11 – 26.3 · PE 26.30 – 26.51`).
  - **Lưới 3 Cổng kết nối (3-Node Grid):** 
    - Thẻ 1: *Địa chỉ máy chủ (Host dùng chung)*.
    - Thẻ 2: *Java Edition (PC - Port 25572)*.
    - Thẻ 3: *Bedrock / PE (Điện thoại & Win 10/11 - Port 19143)*.
    - Mỗi thẻ tích hợp nút sao chép 1-click riêng biệt và icon sao `[✦]` phản ánh màu trạng thái mạng.
  - **Timestamp kiểm tra thời gian thực:** Đồng bộ theo định dạng `HH:mm:ss DD-MM`.

---

## 2. Dịch vụ Trạng thái Máy chủ (`status-service.js`)

- **Nguồn dữ liệu:** REST API công khai từ `mcstatus.io`.
- **Cơ chế kiểm tra song song độc lập:** Gọi đồng thời endpoint Java (`25572`) và Bedrock (`19143`).
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
| **04/11/2026** | Khởi tạo thư mục `04 - Admin's Notes` và tệp `Dev's Notes.md`. | Dev / Antigravity |

---

## 5. Các hạng mục dự kiến tiếp theo (Next Steps)

1. [ ] **Hạ tầng mạng:** Chuẩn bị gộp chung port `:25572` cho cả Java và Bedrock (cấu hình GeyserMC và đồng bộ `config.js` trên web).
2. [ ] **Hệ thống Whitelist / Đăng ký:** Thiết kế luồng đăng ký bằng Email + IGN, lọc trùng email, xác thực OTP chống clone và tự động đồng bộ vào server Minecraft.
3. [ ] Tinh chỉnh và bổ sung thêm các tương tác animation tĩnh nhẹ nhàng khi cuộn trang (Intersection Observer).
4. [ ] Hoàn thiện thư viện ảnh in-game thực tế (`gallery.html` & `assets/images/showcase/`).
5. [ ] Kiểm thử responsive trên các màn hình di động cỡ nhỏ (< 380px).
