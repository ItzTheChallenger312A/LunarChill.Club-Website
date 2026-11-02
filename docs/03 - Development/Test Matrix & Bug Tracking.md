# Test Matrix & Bug Tracking

> **Mục tiêu:** Ma trận kiểm thử toàn diện trên đa thiết bị, đa trình duyệt và theo dõi các lỗi phát sinh trong quá trình phát triển website LunarChill.  
> **Cập nhật:** 2026-11-02  
> **Tiêu chuẩn kiểm nghiệm:** [`docs/Quality Standards.md`](file:///c:/Users/The%20Challenger/Documents/GitHub/LunarChill.Club-Website/docs/Quality%20Standards.md) & [`docs/03 - Development/Acceptance Criteria.md`](file:///c:/Users/The%20Challenger/Documents/GitHub/LunarChill.Club-Website/docs/03%20-%20Development/Acceptance%20Criteria.md)

---

## 1. Ma trận thiết bị & Trình duyệt (Test Matrix)

| Thiết bị / Môi trường | Trình duyệt thử nghiệm | Kích thước màn hình | Trạng thái kiểm tra | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop Windows** | Chrome / Edge | 1920x1080 (FHD) | ✅ Đạt | Bố cục chuẩn Figma 1400px |
| **Desktop Windows** | Chrome / Edge | 1366x768 (Laptop) | ✅ Đạt | Responsive linh hoạt |
| **Desktop macOS** | Safari / Chrome | 2560x1440 (2K Retina) | ✅ Đạt | Chữ sắc nét, không vỡ layout |
| **Tablet iPad** | Safari | 810x1080 / 1024x768 | ✅ Đạt | Grid chuyển 1-2 cột mượt |
| **Mobile Android** | Chrome Mobile | 390x844 (Pixel / Galaxy) | ✅ Đạt | Mobile Drawer & inert chuẩn |
| **Mobile iOS** | Safari Mobile | 375x667 (iPhone SE) | ✅ Đạt | Không bị tràn ngang, touch mượt |

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
| **TC-07** | Nhấp link Bản đồ Live Map | Mở tab mới với `rel="noopener noreferrer"` | ✅ Đạt |
| **TC-08** | Nhấp link Discord | Mở tab mời Discord chính thức | ✅ Đạt |

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
