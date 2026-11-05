# LunarChill.Club Website — Acceptance Criteria (Tiêu chí Nghiệm thu Chất lượng)

> Bộ tiêu chuẩn và danh mục kiểm thử (Checklist) dùng để nghiệm thu toàn bộ tính năng, giao diện và hiệu năng của website LunarChill.Club trước khi xuất bản bản phát hành chính thức (Release Candidate).
> **Nguyên tắc nghiệm thu:** Chỉ đánh dấu `[x]` khi đã xác minh thực tế trên code hoặc môi trường chạy thật; các hạng mục cần trình duyệt thật, thiết bị di động thật hoặc môi trường Vercel Preview được giữ `[ ]` kèm trạng thái rõ ràng.

---

## 1. Tiêu chí Nghiệm thu Chức năng (Functional Acceptance Criteria)

### AC-01: Hệ thống Hiển thị Trạng thái Máy chủ (Live Server Status)
- [x] **AC-01.1 (Kiểm soát 5 trạng thái — Đã xác minh logic trong `status-service.js`):**
  - Trạng thái `Checking`: Hiển thị animation pulsing nhẹ trong lúc fetch API, không làm giật khung layout (`tabular-nums`).
  - Trạng thái `Online`: Hiển thị chấm tròn xanh lá (`#10B981`), hiển thị đúng số lượng người chơi dạng `{online}/{max} người chơi` và nhãn hỗ trợ Java & Bedrock.
  - Trạng thái `Offline`: Khi API trả về `online: false` ở cả hai cổng, giao diện hiển thị trạng thái `Máy chủ ngoại tuyến` rõ ràng, không hiển thị sai lệch sang bảo trì.
  - Trạng thái `Unable to retrieve status`: Khi ngắt mạng hoặc API timeout > 5s, badge chuyển sang màu xám trung tính thông báo không thể lấy trạng thái, nút Copy IP vẫn giữ nguyên để người dùng tự kết nối trực tiếp in-game.
  - Trạng thái `Maintenance`: Chỉ hiển thị khi cờ cấu hình `CONFIG.FORCE_MAINTENANCE` được bật chủ động từ BQT.
- [x] **AC-01.2 (Quản lý Cache động — Đã kiểm chứng runtime với `mcstatus.io` trên Chrome):**
  - API `mcstatus.io` trả về trường `expires_at` (epoch ms, dài hơn `retrieved_at` đúng 60,000 ms; lưu ý header `x-cache-time-remaining` không được expose qua CORS nên việc ưu tiên đọc `data.expires_at` là hoàn toàn chính xác).
  - Khi reload trang hoặc chuyển tab trong khoảng thời gian cache còn hiệu lực (`Date.now() < expiresAt`), dữ liệu hiển thị tức thì từ `sessionStorage` mà không tạo ra request mạng mới.
- [x] **AC-01.3 (Kiểm soát Rate Limit & Single Service):**
  - Chỉ có duy nhất một module `StatusService` fetch trạng thái trên trang chủ, không xảy ra hiện tượng nhiều component gọi API trùng lặp.

### AC-02: Cơ chế Sao chép Địa chỉ Máy chủ 1-Click (Click-to-Copy)
- [x] **AC-02.1 (Tương tác nhanh, SSOT & Phản hồi chống kẹt nhãn):**
  - Khi người dùng click vào nút `[ Sao chép IP Server ]` (`data-copy-target="java"`):
    - Clipboard nhận chuỗi `LunarChill.club:25572` lấy từ `CONFIG.COPY_TARGETS.java` (giữ kèm port để đảm bảo kết nối khi chưa có SRV record).
    - Trạng thái nút bấm chuyển đổi thị giác sang `✓ Đã sao chép!` trong 2 giây (quản lý timeout riêng bằng `WeakMap`, không lỗi khi double-click nhanh).
    - Xuất hiện Toast Notification trượt từ đáy màn hình thông báo rõ ràng cho người dùng.
- [ ] **AC-02.2 (Khả năng tương thích thiết bị di động — Chờ test thiết bị iOS/Android thật):**
  - Hoạt động trơn tru trên cả Safari (iOS) và Chrome (Android). Có fallback an toàn nếu trình duyệt chặn quyền clipboard.
- [x] **AC-02.3 (Thông số Bản PC & Bản PE riêng — Đã đồng nhất P0):**
  - Cung cấp rõ ràng `data-copy-target="pc"` (`LunarChill.club:25572`) cho bản PC (Java & Bedrock trên máy tính) và `data-copy-target="pe"` (`LunarChill.club`, Cổng: `25572`, kèm fallback `:19143`) cho bản PE riêng trên điện thoại.

### AC-03: Cổng Điều hướng & Liên kết Ngoại vi
- [x] **AC-03.1 (Discord Community & Active State):**
  - Nút Discord mở liên kết mời chính thức từ `CONFIG.DISCORD_INVITE_URL` trong tab mới với đầy đủ thuộc tính bảo mật `target="_blank" rel="noopener noreferrer"`.
  - Các liên kết điều hướng của trang hiện hành có thuộc tính `aria-current="page"`.

### AC-04: Cẩm nang Tân thủ & Bảng Lệnh (`/guide`)
- [x] **AC-04.1 (Copy lệnh nhanh & Hỗ trợ bàn phím):**
  - Toàn bộ 26 ô lệnh sử dụng phần tử `<button type="button" class="command-chip">`, hỗ trợ đầy đủ cả click chuột và phím `Tab` / `Enter` / `Space` để sao chép cú pháp đầy đủ (kèm đối số gợi ý như `/sethome [tên]`, `/town new [tên]`).
- [x] **AC-04.2 (FAQ Accordion Native):**
  - Các câu hỏi thường gặp được triển khai bằng `<details class="faq-item">` và `<summary class="faq-question">`, đóng/mở tự nhiên bằng cả chuột và bàn phím mà không phụ thuộc JS.

### AC-05: Nội quy Máy chủ & Quy trình Khiếu nại (`/rules`)
- [x] **AC-05.1 (Phân loại rõ ràng):** Nội quy được phân chia mạch lạc theo 4 nhóm: Gian lận, Ứng xử, Xây dựng & bảo vệ đất, Quy trình khiếu nại.
- [x] **AC-05.2 (Kênh Khiếu nại):** Có hướng dẫn và nút mở Ticket hỗ trợ tại Discord khi xảy ra sự cố tranh chấp hoặc bị grief.

---

## 2. Tiêu chí Nghiệm thu Nhận diện & Thẩm mỹ (Brand & UI Acceptance Criteria)

### AC-06: Thể hiện Nhận diện Thương hiệu, Slogan & Anti-Slop
- [x] **AC-06.1 (Slogan chính thức):** Slogan trung tâm tại Hero Section là: **"Chill thôi, đừng có vội."** 🌙 kèm dòng phụ tiếng Anh *"Just chill, don't rush."*.
- [x] **AC-06.2 (Ứng dụng Logo & OpenGraph Image):**
  - Logo `logo-small.webp` (`64×64px`, `2.41 KB`) hiển thị kích thước `36×36px` trên Header và `28×28px` dưới Footer.
  - Huy hiệu tròn `logo.webp` (`240×240px`, `12.55 KB`) hiển thị sắc nét ở Hero Section (`240px` Desktop / `160px` Mobile).
  - Biểu tượng `apple-touch-icon.png` (`180×180px`, `61.00 KB`) dùng riêng cho iOS.
  - Ảnh chia sẻ mạng xã hội `og-banner.jpg` (`1200×630px`, `87.47 KB`) và `og-banner.webp` (`1200×630px`, `49.66 KB`) thay thế hoàn toàn việc trỏ `og:image` vào file `logo.png` (`1.71 MB`). Giữ nguyên `logo.png` (`1254×1254px`) làm master asset.
- [x] **AC-06.3 (Độ chuẩn xác Bảng màu, Contrast WCAG AA & Quyết định Chuyển đổi Pixel Voxel UI):**
  - Giữ bản sắc Deep Abyss Black (`#090914`), Midnight Indigo (`rgba(10, 14, 42, 0.88)`), Waterfall Glow Blue (`#688BF8`), Moon Core White (`#FEFDFD`).
  - Độ tương phản đạt chuẩn WCAG AA+: chữ trên nút Primary CTA đạt `6.26:1`, chữ `--color-text-muted` (`#8899B0`) đạt `6.45:1`.
  - **Quyết định Thiết kế Chính thức (Design Decision Record):** Chuyển từ thang bo góc tròn truyền thống (`8px`) sang **Minecraft Voxel UI (Pixel Stepped Corners)** thuần chất voxel: `--radius: 0px`, sử dụng `--clip-pixel-card` (cắt góc bậc thang 4px) và `--clip-pixel-plaque` (cắt góc 2 bậc 6px có gờ đỉnh/đáy) kết hợp tactile shadow (`inset 0 2px 0`, `inset 0 -3px 0`).
  - Phần **Community Showcase** hiển thị thông báo trung thực đang cập nhật ảnh chụp thực tế từ BQT, không dùng placeholder giả lập hay ảnh stock (Anti-Slop).

### AC-10: Cấu trúc Homepage Mới & Góc Cắm Trại (The Campsite Horizon & Server Portal)
- [x] **AC-10.1 (Hero Căn Giữa & Campsite Divider):**
  - Bố cục Hero căn giữa trang trọng, loại bỏ khung 2 cột lặp logo.
  - Ranh giới chuyển tầng (Campsite Divider) sử dụng asset texture gốc Minecraft 16×16px: khối cỏ `grass_block_side.png`, đất `dirt.png`, đốm lửa trại bập bùng bằng CSS sprite `steps(8)`, khói pixel trôi lên và đèn lồng vàng tỏa sáng dịu.
- [x] **AC-10.2 (Server Portal Card — Phong cách TheLovelyValley):**
  - Bộ đếm người chơi lớn (`0 / 50 người đang chơi`), ưu tiên nền tảng đang Online trước để tránh việc Java offline trả về 0 đè lên Bedrock.
  - Lưới 3 thẻ cổng kết nối (Host dùng chung, Java Port 25572, Bedrock Port 25572) có icon `[✦]` chuyển màu động theo trạng thái mạng.
  - Timestamp kiểm tra thời gian thực định dạng `HH:mm:ss DD-MM`.

### AC-11: Danh Bạ Thị Trấn (`/towns` — Honest Skeleton & Zero-Slop)
- [x] **AC-11.1 (Cấu trúc Chờ dữ liệu Thực tế):**
  - Tuân thủ nguyên tắc Anti-Slop: Không dựng danh sách thị trấn giả hoặc số liệu cư dân ảo.
  - Hiển thị thông báo minh bạch BQT đang tổng hợp hồ sơ thị trấn thực tế từ máy chủ.
- [x] **AC-11.2 (Cẩm nang Lập thị trấn & Tra cứu Lệnh Towny):**
  - Cung cấp hướng dẫn 4 giai đoạn phát triển thị trấn (Khai hoang -> Cắm cờ -> Thu nạp cư dân -> Liên minh quốc gia).
  - Bảng lệnh Towny trực quan, nút sao chép 1-click có phản hồi toast.

### AC-12: Triển Lãm Cộng Đồng (`/gallery` — Honest Skeleton & Filter Logic)
- [x] **AC-12.1 (Cấu trúc Chờ Ảnh Thực tế từ In-game):**
  - Thông báo minh bạch đang thu thập ảnh chụp công trình và khoảnh khắc sinh tồn thực tế từ người chơi qua Discord.
- [x] **AC-12.2 (Bộ lọc Danh mục & Hỗ trợ URL Hash):**
  - Hệ thống nút lọc 4 danh mục (`Tất cả`, `Thị trấn`, `Công trình`, `Khoảnh khắc`) đã có sẵn logic JavaScript xử lý `data-gallery-filter` và tự động kích hoạt bộ lọc khi truy cập qua URL hash (ví dụ: `gallery.html#filter-towns`).

---

## 3. Tiêu chí Nghiệm thu Pháp lý & Tuân thủ (Compliance & Legal Acceptance Criteria)

### AC-07: Điều khoản Dịch vụ & Chính sách Bảo mật (`/terms` & `/privacy`)
- [x] **AC-07.1 (Tuân thủ Luật Việt Nam):** Trang `/privacy` trích dẫn **Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15** và **Nghị định số 356/2025/NĐ-CP**. *(Cần Operator/BQT rà soát xác nhận lần cuối trước khi phát hành).*
- [x] **AC-07.2 (Minh bạch Luồng dữ liệu thực tế):** Mô tả chính xác website chỉ dùng `sessionStorage` để lưu tạm cache trạng thái máy chủ, nêu rõ kết nối tải phông chữ tới `Google Fonts`, truy vấn API `mcstatus.io`, nhật ký hạ tầng `Vercel Inc.` và dữ liệu in-game.
- [x] **AC-07.3 (Loại bỏ quy định nạp tiền ở v1.0):** Không có điều khoản quy định mua bán/hoàn tiền do máy chủ v1.0 phi thương mại.
- [x] **AC-07.4 (Mojang Disclaimer bắt buộc):** Chân trang (Footer) trên toàn bộ các trang hiển thị đầy đủ dòng tuyên bố:
  > *"Not an official Minecraft product. We are not approved by or associated with Mojang or Microsoft."*

---

## 4. Tiêu chí Nghiệm thu Phi chức năng (Non-Functional Acceptance Criteria)

### AC-08: Hiệu năng & Tối ưu Tốc độ (Performance)
- [ ] **AC-08.1 (Google Lighthouse — Chờ đo trên trình duyệt / Vercel Preview):** Đạt điểm số **≥ 90** trên cả 4 hạng mục: Performance, Accessibility, Best Practices và SEO.
- [ ] **AC-08.2 (Tốc độ hiển thị ban đầu — Chờ đo thực tế):** First Contentful Paint (FCP) < 1.2 giây; Largest Contentful Paint (LCP) < 2.0 giây.
- [x] **AC-08.3 (Dung lượng tải trang):** Tổng dung lượng tải lần đầu đã giảm hơn **98%** phần hình ảnh (từ `1.71 MB` xuống còn `~15 KB` cho cả `logo.webp` + `logo-small.webp`), tổng toàn trang chỉ khoảng `~100 KB` (vượt xa ngưỡng yêu cầu `< 2.5 MB`).

### AC-09: Khả năng Tương thích & Responsive (Cross-Device & Browser Support)
- [ ] **AC-09.1 (Màn hình kiểm thử — Đã rà soát CSS breakpoints, chờ kiểm thử trình duyệt thật ở 360px–1920px):**
  - Mobile nhỏ: `360px` – `390px` (iPhone SE, iPhone 14/15/16, Android tiêu chuẩn).
  - Tablet: `768px` – `1024px`.
  - Desktop: `1280px` – `1920px`.
- [ ] **AC-09.2 (Trình duyệt hỗ trợ — Chờ test thực tế):** Kiểm thử trên Google Chrome, Mozilla Firefox, Apple Safari (iOS/macOS), Microsoft Edge.
- [x] **AC-09.3 (Khả năng tiếp cận Motion & Dark Mode):** Khai báo `color-scheme: dark` và tự động tắt chuyển động khi hệ điều hành bật `prefers-reduced-motion: reduce`.
