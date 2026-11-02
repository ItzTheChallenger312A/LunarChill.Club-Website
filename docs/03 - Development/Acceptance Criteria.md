# LunarChillSMP Website — Acceptance Criteria (Tiêu chí Nghiệm thu Chất lượng)

> Bộ tiêu chuẩn và danh mục kiểm thử (Checklist) dùng để nghiệm thu toàn bộ tính năng, giao diện và hiệu năng của website LunarChillSMP trước khi xuất bản bản phát hành chính thức (Release Candidate).

---

## 1. Tiêu chí Nghiệm thu Chức năng (Functional Acceptance Criteria)

### AC-01: Hệ thống Hiển thị Trạng thái Máy chủ (Live Server Status)
- [ ] **AC-01.1 (Kiểm soát 5 trạng thái):**
  - Trạng thái `Checking`: Hiển thị animation shimmer/pulsing nhẹ trong lúc fetch API, không làm giật khung layout.
  - Trạng thái `Online`: Hiển thị chấm tròn xanh lá (`#10B981`), hiển thị đúng số lượng người chơi dạng `{online}/{max} người chơi` và nhãn hỗ trợ Java & Bedrock.
  - Trạng thái `Offline`: Khi API trả về `online: false`, giao diện hiển thị trạng thái `Ngoại tuyến` rõ ràng, không hiển thị sai lệch sang bảo trì.
  - Trạng thái `Unable to retrieve status`: Khi ngắt mạng hoặc API timeout > 5s, badge chuyển sang màu xám trung tính thông báo không thể lấy trạng thái, nút Copy IP vẫn giữ nguyên để người dùng tự kết nối trực tiếp in-game.
  - Trạng thái `Maintenance`: Chỉ hiển thị khi có cờ cấu hình chủ động từ BQT.
- [ ] **AC-01.2 (Quản lý Cache động):**
  - Đọc chính xác trường `expires_at` do `mcstatus.io` trả về và lưu vào `sessionStorage`.
  - Khi reload trang hoặc chuyển tab trong khoảng thời gian cache còn hiệu lực (`Date.now() < expires_at`), dữ liệu hiển thị tức thì mà không tạo ra bất kỳ request mạng mới nào.
- [ ] **AC-01.3 (Kiểm soát Rate Limit & Single Service):**
  - Chỉ có duy nhất một module fetch trạng thái trên toàn trang web, không xảy ra hiện tượng nhiều component gọi API trùng lặp.

### AC-02: Cơ chế Sao chép Địa chỉ Máy chủ 1-Click (Click-to-Copy)
- [ ] **AC-02.1 (Tương tác nhanh & Phản hồi):**
  - Khi người dùng click vào nút `[ Sao chép IP Server ]` tại Hero hoặc Header:
    - Clipboard hệ thống nhận được chính xác chuỗi `LunarChill.club`.
    - Trạng thái nút bấm chuyển đổi thị giác sang `Đã sao chép! ✓` trong 2 giây.
    - Xuất hiện Toast Notification trượt từ đáy màn hình thông báo rõ ràng cho người dùng.
- [ ] **AC-02.2 (Khả năng tương thích thiết bị di động):**
  - Hoạt động trơn tru trên cả Safari (iOS) và Chrome (Android). Có fallback an toàn nếu trình duyệt chặn quyền clipboard.
- [ ] **AC-02.3 (Thông số Bedrock):**
  - Cung cấp tùy chọn hoặc ghi chú rõ ràng cổng kết nối Bedrock mặc định `19143` để người chơi điện thoại không bị nhầm lẫn.

### AC-03: Cổng Điều hướng & Liên kết Ngoại vi
- [ ] **AC-03.1 (Discord Community):** Nút Discord mở liên kết mời chính thức trong tab mới với đầy đủ thuộc tính bảo mật `target="_blank" rel="noopener noreferrer"`.
- [ ] **AC-03.2 (Live Map):** Nút mở bản đồ thế giới mở tab mới độc lập, không dùng iframe nhúng trực tiếp ở bản v1.0.

### AC-04: Cẩm nang Tân thủ & Bảng Lệnh (`/guide`)
- [ ] **AC-04.1 (Copy lệnh nhanh):** Người dùng có thể click trực tiếp vào từng ô lệnh (`/spawn`, `/home`, `/claim`, `/tpa`) để sao chép cú pháp vào clipboard kèm tooltip xác nhận.
- [ ] **AC-04.2 (FAQ Accordion):** Các câu hỏi thường gặp đóng/mở mượt mà, chuyển động tự nhiên dưới 250ms.

### AC-05: Nội quy Máy chủ & Quy trình Khiếu nại (`/rules`)
- [ ] **AC-05.1 (Phân loại rõ ràng):** Nội quy được phân chia mạch lạc theo 4 nhóm: Gian lận, Ứng xử, Xây dựng & bảo vệ đất, Khung hình phạt.
- [ ] **AC-05.2 (Kênh Khiếu nại):** Chân trang có hộp Callout hướng dẫn mở Ticket hỗ trợ tại Discord khi xảy ra sự cố tranh chấp hoặc bị grief.

---

## 2. Tiêu chí Nghiệm thu Nhận diện & Thẩm mỹ (Brand & UI Acceptance Criteria)

### AC-06: Thể hiện Nhận diện Thương hiệu & Slogan
- [ ] **AC-06.1 (Slogan chính thức):** Slogan trung tâm tại Hero Section phải là: **"Chill thôi, đừng có vội."** 🌙 (tiếng Anh phụ: *"Just chill, don't rush."*). Tuyệt đối không dùng lại slogan cũ *"A serene survival under the moonlit sky"*.
- [ ] **AC-06.2 (Ứng dụng Logo):**
  - Logo `Lunar_Logo.png` hiển thị với kích thước chuẩn xác, thanh thoát trên Header (chiều cao 36px–40px, không chiếm diện tích navbar).
  - Huy hiệu tròn hiển thị lớn và sắc nét ở Hero Section (240px Desktop / 160px Mobile) với hiệu ứng hào quang mờ dịu mắt.
- [ ] **AC-06.3 (Độ chuẩn xác Bảng màu):** Sử dụng chuẩn xác các biến CSS trích xuất từ logo: Nền đen vô cực `#090914`, Kính mờ Indigo `#0A0E2A`, Ánh sáng thác nước `#688BF8`, Ánh trăng `#FEFDFD` / `#E0EFFF`.

---

## 3. Tiêu chí Nghiệm thu Pháp lý & Tuân thủ (Compliance & Legal Acceptance Criteria)

### AC-07: Điều khoản Dịch vụ & Chính sách Bảo mật (`/terms` & `/privacy`)
- [ ] **AC-07.1 (Tuân thủ Luật Việt Nam):** Trang `/privacy` trích dẫn và tuân thủ đúng **Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15** và **Nghị định số 356/2025/NĐ-CP** (hiệu lực từ 01/01/2026).
- [ ] **AC-07.2 (Minh bạch Luồng dữ liệu):** Làm rõ website tĩnh chỉ lưu tùy chọn tại `localStorage`, Vercel ghi nhận access log chống DDoS, dữ liệu in-game lưu trên server game, và quyền yêu cầu xử lý dữ liệu qua Ticket Discord.
- [ ] **AC-07.3 (Loại bỏ quy định nạp tiền ở v1.0):** Không có điều khoản quy định mua bán/hoàn tiền do máy chủ v1.0 chưa có hoạt động donate.
- [ ] **AC-07.4 (Mojang Disclaimer bắt buộc):** Chân trang (Footer) trên toàn bộ mọi trang hiển thị đầy đủ dòng tuyên bố:
  > *"Not an official Minecraft product. We are not approved by or associated with Mojang or Microsoft."*

---

## 4. Tiêu chí Nghiệm thu Phi chức năng (Non-Functional Acceptance Criteria)

### AC-08: Hiệu năng & Tối ưu Tốc độ (Performance)
- [ ] **AC-08.1 (Google Lighthouse):** Đạt điểm số **≥ 90** trên cả 4 hạng mục: Performance, Accessibility, Best Practices và SEO (đo trên môi trường Vercel Preview với chế độ giả lập Mobile 4G tiêu chuẩn).
- [ ] **AC-08.2 (Tốc độ hiển thị ban đầu):** First Contentful Paint (FCP) < 1.2 giây; Largest Contentful Paint (LCP) < 2.0 giây.
- [ ] **AC-08.3 (Dung lượng tải trang):** Tổng dung lượng toàn bộ trang (bao gồm HTML, CSS, JS, Fonts, Ảnh logo nén) không vượt quá 2.5 MB trong lần tải đầu tiên.

### AC-09: Khả năng Tương thích & Responsive (Cross-Device & Browser Support)
- [ ] **AC-09.1 (Màn hình kiểm thử):**
  - Mobile nhỏ: `360px` – `390px` (iPhone SE, iPhone 14/15/16, Android tiêu chuẩn) — không có thanh cuộn ngang ngoài ý muốn (`overflow-x: hidden`).
  - Tablet: `768px` – `1024px` (iPad, Galaxy Tab).
  - Desktop: `1280px` – `1920px`.
- [ ] **AC-09.2 (Trình duyệt hỗ trợ):** Kiểm thử hoạt động mượt mà trên Google Chrome, Mozilla Firefox, Apple Safari (iOS/macOS), Microsoft Edge.
- [ ] **AC-09.3 (Khả năng tiếp cận Motion):** Tự động tắt hoặc giảm thiểu các chuyển động nếu người dùng kích hoạt cài đặt hệ điều hành `prefers-reduced-motion: reduce`.
