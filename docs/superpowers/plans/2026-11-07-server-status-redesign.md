# Server Status Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tái cấu trúc khu vực Server Status (`#server-portal`) để tập trung hoàn toàn vào máy chủ PC với nút sao chép nổi bật, đồng thời chuyển thông tin kết nối dành cho người chơi điện thoại (Minecraft PE) thành một khung ghi chú (Callout Note) gọn gàng bên dưới.

**Architecture:** Trong `index.html`, thay thế cụm 3 thẻ `.portal-nodes-grid` bằng 1 thẻ kết nối chính `.portal-pc-card` và 1 khung ghi chú `.portal-pe-note`. Trong `assets/css/pages/home.css`, tạo style mới cho thẻ PC và ghi chú PE, dọn bỏ CSS cũ của 3 node grid. Trong `assets/js/status-service.js`, đảm bảo luồng cập nhật trạng thái API chạy trơn tru với các phần tử DOM mới.

**Tech Stack:** HTML5 Semantic Markup, Modern CSS (Flexbox, CSS Grid, Glassmorphism, Responsive Media Queries), Vanilla JS (ES6 Modules).

**Spec:** `docs/superpowers/specs/2026-11-07-server-status-redesign.md`

## Global Constraints
- Địa chỉ máy chủ chính cho PC: `LunarChill.club` (Cổng: `25572`). Nút bấm có nhãn "Sao chép IP PC" với `data-action="copy-ip"` và `data-copy-target="pc"`.
- Khung ghi chú cho điện thoại phải nêu rõ: Tên server `LunarChill`, Địa chỉ `LunarChill.club`, Cổng (Port) `25572`, kèm nút hoặc thao tác sao chép nhanh (`data-copy-target="pe"`).
- Giữ nguyên các ID `#java-node-status`, `#java-node-icon`, `#portal-players-online`, `#portal-players-max`, `#server-status-pill`, `#status-checked-time` để trạng thái live không bị ngắt quãng.
- Bố cục responsive hoàn hảo trên Desktop (1440px), Tablet (768px) và Mobile (390px).

## Review Focus
1. Thao tác sao chép IP trên cả PC và Mobile: Nút copy hoạt động chính xác, kích hoạt tooltip hoặc feedback "Đã sao chép!".
2. Trạng thái kết nối (Checking $\rightarrow$ Online/Offline): Vẫn đồng bộ chính xác với API mcstatus.io.
3. Độ tương phản chữ và nút bấm: Đạt chuẩn WCAG AA trên nền Cosmic dark `#0A0E2A`.
4. Không còn thẻ 3 cột rời rạc gây rối mắt người dùng.

---

### Task 1: HTML Markup Redesign for Server Status Section

**Files:**
- Modify: `index.html:199-250`

- [ ] **Step 1: Replace `.portal-nodes-grid` with `.portal-pc-card` and `.portal-pe-note`**
  Trong `index.html`:
  Thay thế cụm `.portal-nodes-header` và `.portal-nodes-grid` bằng:
  1. `.portal-pc-card`: Hộp kết nối chính bản PC gồm icon trạng thái `#java-node-icon`, tiêu đề "Bản PC (Java & Bedrock)", địa chỉ máy chủ `LunarChill.club:25572`, trạng thái `#java-node-status`, và nút "Sao chép IP PC".
  2. `.portal-pe-note`: Khung ghi chú dành cho người chơi điện thoại (Minecraft PE / Bedrock Mobile), nêu rõ Server Name, Server Address và Port `25572`, kèm nút sao chép nhanh Host PE.

- [ ] **Step 2: Verify HTML syntax and accessibility**
  Đảm bảo các thuộc tính `aria-live`, `aria-hidden`, `data-action="copy-ip"` và các nhãn liên quan đầy đủ.

- [ ] **Step 3: Commit HTML changes**
  ```bash
  git add index.html
  git commit -m "feat(portal): redesign server status to focus on PC with PE callout note"
  ```

---

### Task 2: CSS Styles for Primary PC Card and PE Callout Note

**Files:**
- Modify: `assets/css/pages/home.css`

- [ ] **Step 1: Add new styles for `.portal-pc-card` and `.portal-pe-note`**
  Trong `assets/css/pages/home.css`:
  - Định nghĩa `.portal-pc-card`: layout linh hoạt (desktop dạng thanh ngang hoặc card nổi bật, mobile dạng cột), nền gradient tối viền phát sáng nhẹ, nút sao chép kích thước lớn bắt mắt.
  - Định nghĩa `.portal-pe-note`: khung viền nét đứt hoặc nét mảnh màu xanh tím mờ, icon điện thoại 📱, font rõ ràng, hỗ trợ responsive.

- [ ] **Step 2: Clean up obsolete node grid CSS**
  Gỡ bỏ các quy tắc cũ không còn dùng của `.portal-nodes-grid`, `.node-card`, `.node-host`, `.node-java`, `.node-bedrock`.

- [ ] **Step 3: Verify responsive layout on mobile screens**
  Kiểm tra màn hình <= 768px và <= 480px, đảm bảo nút sao chép và các dòng thông số không bị tràn hoặc gãy hàng xấu.

- [ ] **Step 4: Commit CSS changes**
  ```bash
  git add assets/css/pages/home.css
  git commit -m "style(portal): style primary PC connection card and PE mobile note"
  ```

---

### Task 3: JavaScript Verification & Testing

**Files:**
- Verify: `assets/js/status-service.js`
- Test: Local browser verification & API status check

- [ ] **Step 1: Check `status-service.js` DOM bindings**
  Đảm bảo code không bắn lỗi JS khi `bedrockStatusEl` hoặc `bedrockIconEl` không tồn tại hoặc được xử lý an toàn.

- [ ] **Step 2: Test copy button functionality**
  Kiểm tra sự kiện click copy IP PC và copy Host PE hoạt động trơn tru.

- [ ] **Step 3: Commit any JS adjustments if needed**
  ```bash
  git add assets/js/status-service.js
  git commit -m "refactor(status): ensure status service gracefully supports PC-focused portal layout"
  ```

---

### Task 4: Merge & Deploy to Vercel

**Files:**
- Push to GitHub `main` branch to trigger automatic Vercel deployment.

- [ ] **Step 1: Push changes to `origin main`**
- [ ] **Step 2: Verify live deployment on `https://lunarchill.vercel.app`**
