# Homepage Looping Video Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thay thế toàn bộ cụm sprite ảnh rời rạc ở Hero section bằng video nền lặp vô tận (indefinitely looping video) trích từ YouTube `DPXs4YlNl7k` (Ambient Worlds), áp dụng crossfade loop mượt mà, tối ưu dung lượng web và bổ sung credit bản quyền rõ ràng.

**Architecture:** Sử dụng pipeline xử lý video (cắt mốc 15s–35s, crossfade 1.2s nối vòng lặp, loại bỏ audio, nén H.264 MP4 ~3–5MB) lưu trữ cục bộ tại `assets/videos/hero-ambient-loop.mp4` kèm poster fallback `assets/images/hero-video-poster.webp`. Trong `index.html`, thay thế `.hero-campsite-divider` và `.hero-celestial-sky` bằng `.hero-video-backdrop` chứa thẻ `<video>` (`autoplay muted loop playsinline`) và lớp gradient overlay đa tầng (`.hero-video-overlay`), cùng huy hiệu credit tác giả ("Ambient Worlds — I do not own this video") và ghi chú ở chân trang.

**Tech Stack:** HTML5 Video API, Modern CSS (CSS Grid, Flexbox, Object-fit, backdrop-filter, linear-gradient), FFmpeg / yt-dlp pipeline, Vanilla JavaScript.

**Spec:** `docs/superpowers/specs/2026-11-05-homepage-looping-video-design.md`

## Global Constraints
- Nguồn video: YouTube video ID `DPXs4YlNl7k` (Minecraft: Peaceful Night by Ambient Worlds in partnership with @CozyCraftYT).
- Video bắt đầu từ mốc 15s, thời lượng ~20s, có hiệu ứng crossfade hòa trộn 1.0s – 1.5s để loop vô hình không giật khựng.
- Thẻ video phải luôn có thuộc tính `autoplay muted loop playsinline` để đảm bảo trình duyệt di động (iOS Safari, Android Chrome) không chặn phát.
- Phải có huy hiệu/dòng credit ghi nhận bản quyền rõ ràng ("Video by Ambient Worlds in partnership with @CozyCraftYT — I do not own this video").
- Độ tương phản chữ và các nút CTA chính (`Copy IP`, `Discord`) phải đạt chuẩn WCAG AA trên nền video.

## Review Focus
1. Tải trang trên kết nối chậm hoặc khi video chưa kịp nạp: Phải có ảnh tĩnh poster `hero-video-poster.webp` hiển thị tức thì, không để lại khoảng trống màu đen.
2. Trình duyệt di động bật chế độ tiết kiệm pin hoặc Low Power Mode (ngừng autoplay): Poster vẫn hiển thị đẹp mắt, bố cục không bị vỡ.
3. Điểm giao giữa video nền và section `#server-portal`: Gradient chuyển màu mượt mà xuống nền đen vũ trụ (`#090914`), không bị viền cắt sắc cạnh.
4. Nút bấm CTA và text tiêu đề trên mọi kích thước màn hình (Desktop 1440px, Tablet 768px, Mobile 390px): Luôn hiển thị nổi bật và tương phản rõ ràng.
5. Loop transition test: Khi phát hết 20s và quay lại đầu, chuyển động không bị khựng (zero hitch).

---

### Task 1: Video Retrieval, Crossfade Loop Processing & Asset Optimization

**Files:**
- Create: `assets/videos/hero-ambient-loop.mp4`
- Create: `assets/images/hero-video-poster.webp`
- Create (temporary tool): `scripts/process-hero-video.ps1`

**Interfaces:**
- Produces: `assets/videos/hero-ambient-loop.mp4` (H.264, no audio, 1080p/720p, ~20s duration with crossfade loop)
- Produces: `assets/images/hero-video-poster.webp` (Poster frame at 0s for instant rendering)

- [ ] **Step 1: Download segment from YouTube video DPXs4YlNl7k**
  Tải đoạn từ 15s đến 36.5s của video `https://youtu.be/DPXs4YlNl7k` bằng công cụ tải video chuyên dụng.

- [ ] **Step 2: Process crossfade loop and remove audio with FFmpeg**
  Áp dụng bộ lọc crossfade nối 1.2s cuối vào đầu đoạn video để tạo vòng lặp vô hình, loại bỏ track âm thanh và tối ưu thông số web (`-movflags +faststart`, `-crf 24`, `-pix_fmt yuv420p`).

- [ ] **Step 3: Export poster image frame**
  Trích xuất 1 khung hình đại diện ở mốc 0s thành `assets/images/hero-video-poster.webp`.

- [ ] **Step 4: Verify video integrity and seamless looping**
  Kiểm tra dung lượng file (< 6MB), độ dài (~19-20s), và mở xem thử để kiểm chứng điểm chuyển giao loop êm mượt.

- [ ] **Step 5: Commit video assets**
  ```bash
  git add assets/videos/hero-ambient-loop.mp4 assets/images/hero-video-poster.webp
  git commit -m "assets: add seamless looping hero ambient video and poster"
  ```

---

### Task 2: Homepage Hero HTML Markup & Attribution Integration

**Files:**
- Modify: `index.html:95-197`
- Modify: `index.html:395-443`

**Interfaces:**
- Consumes: `assets/videos/hero-ambient-loop.mp4`, `assets/images/hero-video-poster.webp`
- Produces: HTML structure with `<div class="hero-video-backdrop">`, `<video>`, `<div class="hero-video-overlay">`, credit badge `.hero-video-credit` and footer attribution.

- [ ] **Step 1: Replace campsite and celestial sky elements with video backdrop markup**
  Trong `index.html` phần `<section class="hero-section hero-centered" id="hero">`:
  Xóa bỏ `.hero-celestial-sky` và `.hero-campsite-divider`.
  Thêm:
  ```html
  <div class="hero-video-backdrop" aria-hidden="true">
    <video class="hero-video-element" autoplay loop muted playsinline poster="assets/images/hero-video-poster.webp" preload="auto">
      <source src="assets/videos/hero-ambient-loop.mp4" type="video/mp4">
    </video>
    <div class="hero-video-overlay"></div>
  </div>
  ```

- [ ] **Step 2: Add video attribution credit badge in Hero**
  Thêm một badge credit tinh tế ở góc dưới Hero:
  ```html
  <div class="hero-video-credit">
    <span>Background ambience: <a href="https://youtu.be/DPXs4YlNl7k" target="_blank" rel="noopener noreferrer">Ambient Worlds</a> &middot; <em>I do not own this video</em></span>
  </div>
  ```

- [ ] **Step 3: Add attribution note in Global Footer**
  Thêm ghi chú ghi nhận tác giả và bản quyền video vào mục Footer (`index.html`) bên cạnh Mojang disclaimer.

- [ ] **Step 4: Verify HTML markup validation**
  Kiểm tra tính hợp lệ của cấu trúc HTML, đảm bảo không có thẻ đóng mở sai và accessibility labels đầy đủ.

- [ ] **Step 5: Commit HTML changes**
  ```bash
  git add index.html
  git commit -m "feat(home): replace hero sprite scenery with looping video background and attribution"
  ```

---

### Task 3: CSS Stylesheet Refinement & Cosmic Gradient Overlay

**Files:**
- Modify: `assets/css/pages/home.css`

**Interfaces:**
- Consumes: Markup classes `.hero-video-backdrop`, `.hero-video-element`, `.hero-video-overlay`, `.hero-video-credit`
- Produces: Modern CSS styling for responsive video background, gradient blend, and cleanup of unused campsite sprite CSS rules.

- [ ] **Step 1: Add video backdrop and overlay CSS rules**
  Trong `assets/css/pages/home.css`:
  - Định nghĩa `.hero-video-backdrop` absolute inset 0, z-index 0, overflow hidden.
  - `.hero-video-element` width 100%, height 100%, object-fit cover, opacity điều chỉnh ~0.85 để hài hòa.
  - `.hero-video-overlay` phủ linear-gradient từ trên xuống: ánh xanh tím mờ nhẹ ở đỉnh, tối dần ở giữa và chuyển mượt sang `#090914` ở chân Hero.

- [ ] **Step 2: Style video attribution credit badge**
  Tạo kiểu dáng cho `.hero-video-credit`: font JetBrains Mono / Plus Jakarta Sans nhỏ gọn (12px), nền kính tối mờ (glassmorphism), viền mảnh, đặt ở góc dưới cùng bên phải hoặc căn giữa tinh tế.

- [ ] **Step 3: Remove obsolete campsite sprite CSS**
  Dọn dẹp các selector sprite không còn sử dụng (`.pixel-spruce-tree`, `.pixel-oak-tree`, `.campsite-prop`, `.campfire-smoke`, `.grass-block-strip`, v.v.) giúp file CSS gọn gàng và tải nhanh hơn.

- [ ] **Step 4: Ensure responsive behavior and contrast on Mobile & Tablet**
  Cấu hình media queries (<= 768px và <= 480px) để Hero có chiều cao tối thiểu hợp lý, text và nút CTA không bị chèn lấn và tương phản rõ ràng.

- [ ] **Step 5: Commit CSS changes**
  ```bash
  git add assets/css/pages/home.css
  git commit -m "style(home): style hero video backdrop, cosmic gradient overlay and attribution"
  ```

---

### Task 4: Verification, Cross-Device Polish & Branch Completion

**Files:**
- Verify: `index.html`, `assets/css/pages/home.css`, `assets/videos/hero-ambient-loop.mp4`

- [ ] **Step 1: Test local server preview**
  Khởi động server tĩnh cục bộ hoặc kiểm tra hiển thị trực tiếp trang chủ trên trình duyệt.

- [ ] **Step 2: Verify video playback behavior**
  Xác nhận:
  1. Video tự động phát (autoplay) mà không cần click.
  2. Video lặp lại êm ái, chuyển cảnh nối vòng crossfade mượt mà không khựng.
  3. Khi tua hoặc ngắt kết nối mạng, poster ảnh hiển thị đúng.
  4. Nút bấm Sao chép IP Server, Tham gia Discord và bảng Server Portal hoạt động bình thường, dễ đọc.

- [ ] **Step 3: Final commit and summary documentation**
  Cập nhật ghi chú phát triển và hoàn tất nhánh.
