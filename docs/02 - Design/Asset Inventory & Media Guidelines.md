# LunarChillSMP — Asset Inventory & Media Guidelines

> **Tài liệu quản lý toàn diện tài nguyên hình ảnh, logo và đa phương tiện**
> Đảm bảo tính nhất quán thị giác, tối ưu hiệu năng tải trang và tuyệt đối nói không với ảnh stock AI giả tạo.

---

## 1. Danh mục Tài nguyên Chính thức (Official Assets)

| Asset Name | Vị trí lưu trữ | Định dạng & Kích thước | Mục đích sử dụng | Nguồn gốc / Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| **Lunar_Logo.png** | `/Lunar_Logo.png` & `/assets/images/logo.png` | PNG (1254x1254px, 24-bit RGB) | Huy hiệu nhận diện chính, Hero Showcase, Header icon | Chính thức từ BQT (Đã xác nhận) |
| **Favicon** | `/assets/images/favicon.ico` | ICO / PNG (32x32px, 16x16px) | Icon tab trình duyệt & Bookmark | Trích xuất từ symbol `Lunar_Logo.png` |
| **Hero Background** | `/assets/images/hero-bg.webp` | WebP (1920x1080px, nén q=80) | Nền Hero Section kết hợp gradient mờ tối `#090914` | Screenshot in-game đêm trăng từ BQT |
| **Community Showcase 1** | `/assets/images/showcase/spawn.webp` | WebP (16:9, 1280x720px) | Hình ảnh khu trung tâm Spawn của server | Chờ ảnh in-game thực tế |
| **Community Showcase 2** | `/assets/images/showcase/town.webp` | WebP (16:9, 1280x720px) | Hình ảnh thị trấn / công trình thành viên | Chờ ảnh in-game thực tế |
| **Community Showcase 3** | `/assets/images/showcase/event.webp` | WebP (16:9, 1280x720px) | Khoảnh khắc sự kiện / hoạt động cộng đồng | Chờ ảnh in-game thực tế |

---

## 2. Tiêu chuẩn Kỹ thuật Đa phương tiện (Media Guidelines)

### 2.1. Quy chuẩn Định dạng & Nén ảnh (WebP Standard)
* Toàn bộ ảnh chụp screenshot in-game và ảnh minh họa **bắt buộc chuyển đổi sang định dạng `.webp`** trước khi đưa vào thư mục `assets/images/`.
* Mức chất lượng nén (Quality level): `80%` – `85%`.
* Dung lượng tối đa:
  - Ảnh Hero background lớn: Không vượt quá `350 KB`.
  - Ảnh Showcase tỷ lệ 16:9: Không vượt quá `150 KB` / ảnh.
  - Tổng dung lượng tải toàn bộ assets hình ảnh trong lần load đầu tiên không quá `1.5 MB`.

### 2.2. Tỷ lệ Khung hình & Hiển thị Responsive (Aspect Ratios)
* **Ảnh Hero:** Khung tỷ lệ rộng điện ảnh `16:9` hoặc `21:9`, phủ lớp gradient đen `#090914` mờ dần ở chân ảnh để chữ luôn tương phản rõ ràng.
* **Ảnh Showcase Card:** Cố định `aspect-ratio: 16 / 9`, thuộc tính `object-fit: cover`.
* Luôn khai báo đầy đủ thuộc tính `loading="lazy"` và `decoding="async"` trên mọi thẻ `<img>` (ngoại trừ logo Header và ảnh Hero).

---

## 3. Nguyên tắc Sử dụng Ảnh: Minecraft Thật vs. AI Stock

* ❌ **Tuyệt đối cấm:**
  - Không tải ảnh stock Minecraft 3D render giả tạo, người que hoạt họa sến sẩm từ Google/Pinterest.
  - Không dùng AI Midjourney/DALL-E vẽ tranh phong cảnh Minecraft kỳ dị với các khối voxel biến dạng méo mó.
* ✔️ **Bắt buộc:**
  - 100% hình ảnh minh họa trên web phải là **ảnh chụp màn hình thực tế từ chính máy chủ LunarChillSMP** (dùng shader nhẹ nhàng như Complementary/BSL để giữ trọn vẹn chất game chân thật).
  - Tôn vinh công trình thật do người chơi trên máy chủ xây dựng.
