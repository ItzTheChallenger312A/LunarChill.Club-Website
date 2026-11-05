# LunarChill.Club — Homepage Looping Video Background Design

**Date:** 2026-11-05  
**Topic:** Replace fragmented hero sprite elements with an indefinitely looping ambient background video  
**Scope:** Small Feature / UI Enhancement  

---

## 1. Intent & The Why
- **Bối cảnh:** Phần Hero hiện tại của trang chủ đang sử dụng nhiều sprite ảnh Minecraft nhỏ lẻ (cây thông, khúc gỗ sồi, khối cỏ/đất, hiệu ứng khói/lửa trại thủ công bằng CSS), gây tốn thời gian hoàn thiện và chưa đạt độ thẩm mỹ điện ảnh (cinematic) mong muốn.
- **Mục tiêu:** Thay thế toàn bộ cụm sprite ảnh này bằng một video nền quay cảnh đêm Minecraft yên bình chạy lặp vô tận (indefinitely looping video), mang lại trải nghiệm êm dịu, ấm áp đúng tinh thần *"Cosmic Sanctuary — Chill thôi, đừng có vội. 🌙"*.

---

## 2. Goals & Non-Goals

### Goals
- **Nguồn video:** Trích xuất từ video *"Minecraft: Peaceful Night | Relaxing Music & Ambience"* (Ambient Worlds, ID: `DPXs4YlNl7k`).
- **Ghi nhận bản quyền (Credits & Attribution):** Thêm credit rõ ràng cho tác giả video ("Ambient Worlds in partnership with @CozyCraftYT", link gốc YouTube `DPXs4YlNl7k` và ghi chú tôn trọng bản quyền *"We do not own this video / Nguồn tư liệu video thuộc về Ambient Worlds"*) tại góc tinh tế của Hero hoặc trong mục Văn bản / Footer của trang web.
- **Phân đoạn & Xử lý lặp (Seamless Loop):** Trích đoạn mốc ~15s với độ dài khoảng 20s (~15s - 35s). Xử lý kỹ thuật crossfade hòa tan ~1–1.5s ở 2 đầu để video khi lặp lại không bị giật khựng (jump cut / hitch).
- **Tối ưu Web Performance:**
  - Định dạng MP4 (H.264, Web-optimized) & WebM nếu cần.
  - Loại bỏ hoàn toàn audio track (giảm dung lượng, triệt tiêu nguy cơ bị trình duyệt chặn autoplay).
  - Nén độ phân giải và bitrate hợp lý (khoảng 3–6MB) đặt tại `assets/videos/hero-ambient-loop.mp4`.
  - Tạo một ảnh poster tĩnh đại diện đặt tại `assets/images/hero-video-poster.webp` để hiển thị tức thì khi video đang nạp hoặc trên thiết bị bật chế độ tiết kiệm dữ liệu.
- **Giao diện & Cấu trúc:**
  - Thay thế khối `.hero-celestial-sky` và `.hero-campsite-divider` bằng thẻ `<video>` nền có thuộc tính `autoplay muted loop playsinline`.
  - Thiết lập lớp phủ tối (gradient overlay) đa tầng đảm bảo độ tương phản cho tiêu đề chính, nút bấm CTA và khối trạng thái máy chủ (`#server-portal`).
  - Đảm bảo giao diện responsive hoàn hảo trên Desktop (1440px), Tablet (768px) và Mobile (390px).

### Non-Goals & Anti-Goals
- **Không nhúng Iframe YouTube:** Tránh độ trễ đệm (buffering), không dính watermark/logo YouTube và không bị lỗi chặn autoplay trên iOS.
- **Không bật âm thanh tự động:** Tuân thủ tiêu chuẩn trình duyệt và trải nghiệm người dùng không gây giật mình.
- **Không chồng chéo sprite phẳng:** Loại bỏ các phần tử pixel cây/cỏ giả lập để không xung đột thẩm mỹ với đồ họa shader 3D thực tế của video.

---

## 3. Approaches Considered

1. **Hướng 1 (Được chọn): Video cục bộ xử lý crossfade loop + CSS Background Overlay**
   - *Lý do chọn:* Kiểm soát 100% chất lượng, loop mượt mà không khựng, thời gian tải nhanh và tương thích hoàn toàn trên mọi thiết bị.
2. **Hướng 2: Nhúng iframe YouTube API**
   - *Lý do loại:* Bị khựng giật 0.5s–1s mỗi khi seek về đầu, không thể làm hiệu ứng crossfade, dễ bị lỗi giao diện trên mobile.
3. **Hướng 3: Giữ một phần sprite CSS kết hợp video**
   - *Lý do loại:* Xung đột phong cách thị giác giữa đồ họa pixel phẳng và đồ họa shader 3D của video ambient.

---

## 4. Chi tiết triển khai kỹ thuật (For Implementation)
- **File video đầu ra:** `assets/videos/hero-ambient-loop.mp4` (và poster `assets/images/hero-video-poster.webp`).
- **Markup (`index.html`):**
  - Thêm container `.hero-video-backdrop` chứa thẻ `<video>` và `.hero-video-overlay`.
  - Dọn sạch các thẻ markup campsite cũ trong `#hero`.
- **Styling (`assets/css/pages/home.css`):**
  - Cập nhật `.hero-video-backdrop` với `position: absolute; inset: 0; z-index: 1; overflow: hidden;`.
  - `.hero-video-element` với `width: 100%; height: 100%; object-fit: cover;`.
  - Lớp phủ chuyển màu gradient từ trên xuống dưới mượt mà hòa vào nền của section `#server-portal`.
