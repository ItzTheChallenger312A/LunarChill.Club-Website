# Test Matrix & Bug Tracking

> **Mục tiêu:** Ma trận kiểm thử toàn diện trên đa thiết bị, đa trình duyệt và theo dõi các lỗi phát sinh trong quá trình phát triển website LunarChill.  
> **Cập nhật:** 2026-11-02  
> **Tiêu chuẩn kiểm nghiệm:** [`Quality Standards.md`](../Quality%20Standards.md) & [`Acceptance Criteria.md`](Acceptance%20Criteria.md)

---

## 1. Ma trận thiết bị & Trình duyệt (Test Matrix)

> **Quy ước trạng thái:**  
> • 🟢 **Đã test (Thiết bị thật):** Đã kiểm tra trực tiếp trên phần cứng thực tế.  
> • 🟡 **DevTools (Mô phỏng):** Đã kiểm tra qua DevTools Device Mode / Responsive Viewer.  
> • ⬜ **Chưa test:** Cần chạy smoke test sau khi deploy lên staging/production.

| Thiết bị / Môi trường | Trình duyệt thử nghiệm | Kích thước màn hình | Trạng thái kiểm tra | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop Windows** | Google Chrome | 1920x1080 (FHD) | 🟢 Đã test | Thiết bị thật, hiển thị chuẩn 1400px |
| **Desktop Windows** | Microsoft Edge | 1920x1080 (FHD) | 🟢 Đã test | Thiết bị thật, layout đồng nhất |
| **Desktop Windows** | Chrome Responsive | 1366x768 (Laptop) | 🟡 DevTools | Co giãn responsive tốt |
| **Desktop macOS** | Safari / Chrome | 2560x1440 (2K Retina) | ⬜ Chưa test | Chờ test sau khi deploy preview |
| **Tablet iPad** | Safari Responsive | 810x1080 / 1024x768 | 🟡 DevTools | Grid chuyển 1-2 cột ổn định |
| **Mobile Android** | Chrome Mobile | 390x844 (Pixel / Galaxy) | 🟡 DevTools | Drawer & inert hoạt động tốt |
| **Mobile iOS** | Safari Mobile | 375x667 (iPhone SE) | ⬜ Chưa test | Chờ test trên iPhone thực tế |

---

## 2. Kiểm thử Tính năng (Functional Test Cases)

| Mã test | Mô tả kịch bản | Kỳ vọng | Kết quả |
| :--- | :--- | :--- | :--- |
| **TC-01** | Bấm nút "Sao chép IP PC" ở Header / Hero | Copy `LunarChill.club:25572` vào clipboard, hiện Toast | ✅ Đạt |
| **TC-02** | Bấm nút "Sao chép IP PE" | Copy `LunarChill.club` vào clipboard, hiện Toast | ✅ Đạt |
| **TC-03** | Bấm vào bất kỳ lệnh nào trong Cẩm nang | Copy lệnh (VD: `/spawn`, `/claim`), hiện Toast | ✅ Đạt |
| **TC-04** | API mcstatus.io phản hồi online | Hiển thị chấm xanh + số người chơi thực | ✅ Đạt |
| **TC-05** | API mcstatus.io timeout hoặc offline | Hiển thị chấm xám/đỏ không crash giao diện | ✅ Đạt |
| **TC-06** | Mở/đóng Menu trên Mobile | Drawer trượt mượt mà, hỗ trợ phím Escape, quản lý focus | ✅ Đạt |
| **TC-07** | Nhấp link Discord | Mở tab mời Discord chính thức | ✅ Đạt |

---

## 3. Kiểm thử Ranh giới Anti-Slop (Anti-Slop Compliance Audit)

- [x] **Corner Radius Audit:** Toàn bộ thẻ card $\le$ 8px, nút bấm $\le$ 6px, nhãn tag $\le$ 4px. Không có class `rounded-full` 9999px.
- [x] **Top Stripe Audit:** Không có bất kỳ thẻ nào có viền accent 2px–3px trên đỉnh.
- [x] **Aurora / Glow Audit:** Không có hiệu ứng quầng sáng cầu vồng trôi nổi vô nghĩa.
- [x] **Text Clipping Audit:** Không áp dụng `background-clip: text` làm mờ chữ.
- [x] **Copywriting Audit:** Không có từ ngữ sáo rỗng AI (*"liền mạch"*, *"vô song"*, *"thế giới tuyệt mỹ"*).

---

## 4. Bảng theo dõi Lỗi & Tồn đọng (Bug Tracking Log)

| Bug ID | Mức độ | Mô tả lỗi / Vấn đề | Giải pháp đã áp dụng | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | P0 | Domain ghi nhầm thành `play.lunarchill.club` | Thay thế toàn bộ thành `LunarChill.club` | 🟢 Đã sửa |
| **BUG-02** | P0 | Cổng kết nối PC & PE dùng port mặc định cũ | Cập nhật PC `25572`, PE `19143` | 🟢 Đã sửa |
| **BUG-03** | P0 | Status Service chỉ check Java, bỏ qua Bedrock | Triển khai Dual Promise độc lập cho cả 2 nền tảng | 🟢 Đã sửa |
| **BUG-04** | P1 | Toast clipboard sử dụng innerHTML | Đổi sang `textContent` chống XSS an toàn | 🟢 Đã sửa |
| **BUG-05** | P1 | Drawer mobile thiếu thuộc tính `inert` | Đã bổ sung `inert` và quản lý focus khi đóng mở | 🟢 Đã sửa |
| **BUG-06** | P1 | Thiếu ảnh screenshot thật cho Community Gallery | Đang sử dụng thẻ placeholder chuẩn chờ BQT cung cấp | 🟡 Chờ ảnh thật |
| **BUG-07** | P0 | Không thể chuyển trang khi mở local / link trỏ `/guide` bị 404 | Chuyển toàn bộ internal links sang file tương đối (`guide.html`, `rules.html`, ...) kết hợp explicit rewrites trong `vercel.json` | 🟢 Đã sửa |
| **BUG-08** | P0 | Thiếu link Google Fonts cho `Plus Jakarta Sans` & `JetBrains Mono` | Bổ sung preconnect & stylesheet Google Fonts vào `<head>` toàn bộ 6 trang | 🟢 Đã sửa |
| **BUG-09** | P1 | `applyCombinedStatus` báo Offline giả khi API thiếu trường `online` | Thêm kiểm tra `typeof online === 'boolean'`, fallback an toàn về `unable` | 🟢 Đã sửa |
| **BUG-10** | P2 | Quá nhiều inline styles trong `index.html` và footer | Chuyển toàn bộ sang CSS classes trong `home.css` và `layout.css`, dùng token | 🟢 Đã sửa |
