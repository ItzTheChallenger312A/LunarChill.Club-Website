# LunarChill.Club — Server Status Redesign

**Date:** 2026-11-07  
**Topic:** Restructure Server Status Section (Focus on PC Server with Copy Button, Phone Info as Callout Note)  
**Scope:** Small Feature / UI Refinement  

---

## 1. Intent & The Why
- **Bối cảnh:** Hiện tại khu vực Server Status (`#server-portal`) sử dụng lưới 3 card nhỏ (`node-host`, `node-java`, `node-bedrock`) kèm 3 nút sao chép gây dư thừa và phân tán thị giác, vì cả PC và PE đều dùng chung hostname `LunarChill.club` và cổng `25572`.
- **Mục tiêu:** Tái cấu trúc khu vực này theo phong cách tối giản, trực quan:
  - Máy chủ PC là tâm điểm chính với địa chỉ, trạng thái trực tiếp và nút "Sao chép IP PC".
  - Thông tin kết nối dành cho người chơi điện thoại (Minecraft PE / Bedrock) được chuyển đổi thành một khung ghi chú (Callout Note) gọn gàng, rõ ràng bên dưới.

---

## 2. Goals & Non-Goals

### Goals
- **Cấu trúc HTML (`index.html`):**
  - Thay thế lưới `.portal-nodes-grid` (3 cards) bằng:
    1. `.portal-pc-connection`: Card kết nối PC chính chứa icon trạng thái, nhãn phiên bản, địa chỉ `LunarChill.club:25572`, trạng thái kết nối (`#java-node-status`) và nút bấm nổi bật `Sao chép IP PC` (`data-action="copy-ip" data-copy-target="pc"`).
    2. `.portal-pe-note`: Khung ghi chú dành cho người chơi điện thoại (Minecraft PE), ghi rõ Server Name `LunarChill`, Server Address `LunarChill.club`, Port `25572`, kèm nút copy nhanh hoặc text rõ ràng.
- **Tương thích JavaScript (`assets/js/status-service.js`):**
  - Giữ nguyên các ID `#java-node-status`, `#java-node-icon`, `#portal-players-online`, `#portal-players-max`, `#server-status-pill`, `#status-checked-time` để luồng hiển thị số người chơi và trạng thái thời gian thực hoạt động liên tục không bị lỗi.
  - Xử lý mượt mà khi các phần tử của node bedrock cũ không còn tồn tại trên DOM.
- **Phong cách giao diện (`assets/css/pages/home.css`):**
  - Card PC thiết kế dạng Cosmic Glassmorphism viền phát sáng nhẹ, nút sao chép kích thước lớn vừa tay trên mobile.
  - Khung ghi chú PE tinh tế, sử dụng icon 📱, font JetBrains Mono / Plus Jakarta Sans sắc nét, độ tương phản cao.

### Non-Goals
- Không thay đổi backend API endpoint (`mcstatus.io`).
- Không làm gián đoạn các trang phụ khác (`guide.html`, `towns.html`).

---

## 3. Approved Approach
- Tinh gọn thành 1 Primary PC Connection Card + 1 Mobile Note Callout.
