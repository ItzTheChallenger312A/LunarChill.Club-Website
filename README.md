# LunarChill.Club — Official Website

<div align="center">
  <img src="assets/images/logo.png" alt="LunarChill Logo" width="180" height="180" style="border-radius: 50%;" />
  <h3>🌙 "Chill thôi, đừng có vội."</h3>
  <p><em>Just chill, don't rush.</em></p>
  <p>Website chính thức của máy chủ Minecraft <strong>LunarChill.Club</strong> — Cổng thông tin, cẩm nang sinh tồn và kết nối cộng đồng.</p>

  <p>
    <a href="https://lunarchill.club"><strong>Khám phá Website »</strong></a>
    <br />
    <br />
    <a href="docs/00 - Project Overview/Overview.md">Project Overview</a>
    ·
    <a href="docs/Quality Standards.md">Quality Standards (Anti-Slop)</a>
    ·
    <a href="docs/03 - Development/Content & Data Registry.md">Content Registry (SSOT)</a>
    ·
    <a href="docs/02 - Design/Design System.md">Design System</a>
  </p>
</div>

---

## 🌟 Giới thiệu về LunarChill.Club

**LunarChill.Club** là một máy chủ sinh tồn Minecraft (Survival MultiPlayer) hướng tới trải nghiệm thư thái, cân bằng và gắn kết:
- **Thông số kết nối:**
  - **Địa chỉ kết nối dùng chung:** `LunarChill.club` (Cổng duy nhất: `25572`)
  - **Bản PC (Java & Bedrock trên máy tính):** `LunarChill.club:25572` (Hỗ trợ 1.21.11 đến 26.3)
  - **Bản PE riêng (Điện thoại / Pocket Edition):** `LunarChill.club` (Port: `25572` | Hỗ trợ 26.30 đến 26.51)
- **Không áp lực chạy đua:** Tôn vinh lối chơi thong thả, sáng tạo, thị trấn Towny văn minh và tạo dựng kỷ niệm cùng bạn bè.
- **Công bằng & Văn minh:** Môi trường hoàn toàn phi thương mại, không pay-to-win, tôn trọng quyền riêng tư và tinh thần fair-play.

---

## 🎯 Mục tiêu của Website

1. **Khám phá máy chủ (Discovery):** Giúp người chơi mới nắm bắt ngay bản sắc máy chủ, kiểm tra trạng thái hoạt động tức thì cho cả PC & PE và sao chép IP chỉ với 1 click.
2. **Cổng thông tin & Cẩm nang (Information Portal):** Cung cấp bảng tra cứu lệnh, hướng dẫn kết nối Bedrock/Java và nội quy minh bạch.
3. **Bộ mặt thương hiệu (Brand Identity):** Thể hiện phong cách *"Cosmic Sanctuary"* — mang hơi thở điện ảnh (Cinematic Minecraft), tối giản hiện đại (Modern Minimalism), vừa sâu lắng vừa gần gũi và ấm áp.

---

## 🛠️ Công nghệ & Hạ tầng (Tech Stack)

- **Frontend Core:** Vanilla HTML5, Modern CSS3 (CSS Variables, Flexbox/Grid, Glassmorphism 8px), Vanilla JavaScript (ES6+ Modules).
- **Trạng thái máy chủ thời gian thực:** Tích hợp REST API từ `mcstatus.io` với cơ chế kiểm tra song song độc lập cho PC (Java: 25572) và PE (Bedrock: 25572, hỗ trợ fallback 19143 chuyển tiếp), đọc chính xác `X-Cache-Time-Remaining` và `expires_at`.
- **Lưu trữ & Triển khai (Hosting & CI/CD):** Vercel Edge Network (`vercel.json` clean URLs).
- **Thiết kế & Prototype:** Figma ([LunarChill.Club Website Prototype](https://www.figma.com/design/Hjdn5UhKT2D8ucSxTig4hy)).

---

## 📂 Cấu trúc Repository & Mã nguồn

```
LunarChill.Club-Website/
├── index.html                     # Trang chủ (Homepage hoàn chỉnh: Campsite Horizon & Server Portal)
├── guide.html                     # Cẩm nang tân thủ (/guide)
├── towns.html                     # Danh bạ thị trấn & lãnh thổ (/towns)
├── gallery.html                   # Triển lãm ảnh cộng đồng (/gallery)
├── rules.html                     # Nội quy máy chủ (/rules)
├── terms.html                     # Điều khoản dịch vụ (/terms)
├── privacy.html                   # Chính sách bảo mật (/privacy)
├── 404.html                       # Trang lỗi 404 phong cách Minecraft (The End)
├── vercel.json                    # Cấu hình Clean URLs, Rewrites và Header caching
├── .vercelignore                  # Loại trừ docs và workspace khỏi deployment output
│
├── assets/
│   ├── css/
│   │   ├── variables.css          # CSS Design Tokens, Pixel Stepped Clip-Paths (0px radius)
│   │   ├── base.css               # Reset, WCAG AAA, typography phẳng sắc nét
│   │   ├── components.css         # Lunar Cards, Buttons, Status Pill, Toast, Plaque
│   │   ├── layout.css             # Sticky Header, Accessible Mobile Drawer, Footer
│   │   └── pages/home.css         # Hero Centered, Minecraft Campsite, Server Portal
│   ├── js/
│   │   ├── config.js              # Hằng số cấu hình tập trung (SSOT)
│   │   ├── status-service.js      # Module kiểm tra PC & PE độc lập + Dynamic Cache + Fallback an toàn
│   │   ├── clipboard.js           # 1-Click Copy IP có kiểm tra kết quả thực tế
│   │   └── main.js                # App bootstrap, drawer accessibility & gallery filters
│   └── images/
│       ├── logo.png               # Asset huy hiệu nhận diện chính (Master 1254x1254)
│       ├── logo.webp              # Huy hiệu WebP nén siêu nhẹ
│       ├── logo-small.webp        # Logo nhỏ cho Header và Footer (64x64)
│       ├── minecraft/             # Bộ asset texture gốc Minecraft 16x16 (lửa trại, đèn lồng, cỏ, đất)
│       ├── favicon.ico            # Favicon định dạng chuẩn đa kích thước
│       ├── favicon.png            # Favicon PNG 32x32
│       └── showcase/              # Thư mục ảnh chụp in-game thực tế (BQT tổng hợp)
│
├── docs/                          # Hệ thống tài liệu dự án (Obsidian Vault: 00 đến 04)
└── README.md                      # Giới thiệu tổng quan dự án
```

> 💡 **Lưu ý về tài liệu (`docs/`):** Hệ thống tài liệu trong thư mục `docs/` được liên kết phục vụ bạn đọc trực tiếp trên GitHub repository. Do được liệt kê trong `.vercelignore`, thư mục này không xuất hiện trên website live Vercel nhằm tối ưu hiệu năng tải trang và bảo vệ cấu trúc tĩnh sạch.

---

## 🗺️ Lộ trình triển khai (Project Roadmap)

| Giai đoạn | Thời gian | Trọng tâm | Trạng thái |
| :--- | :--- | :--- | :--- |
| **01 — Research & Requirements** | 17/10 – 30/10 | Nghiên cứu, đặc tả yêu cầu, sitemap, ma trận scope | **Hoàn thành (Đóng)** |
| **02 — Brand & UI Design** | 30/10 – 02/11 | Brand guidelines, design system, chuyển đổi Minecraft Voxel UI | **Hoàn thành (Đóng)** |
| **03 — Development** | 02/11 – 04/11 | Lập trình giao diện tĩnh responsive (HTML/CSS/JS) | **Hoàn thành (Đủ 8 trang tĩnh)** |
| **04 — QA & Review** | 04/11 – 18/11 | Kiểm thử đa thiết bị, kiểm tra hiệu năng, API & Vercel Clean URLs | **Đang tiến hành** |
| **05 — Handover & Launch** | 19/11 – 20/11 | Deploy Vercel Production, bàn giao chính thức | Dự kiến |

---

## ⚖️ Tuân thủ & Pháp lý

- **Quy chuẩn Minecraft (Mojang EULA):** Website và máy chủ LunarChill.Club là dự án cộng đồng độc lập, **KHÔNG PHẢI LÀ SẢN PHẨM MINECRAFT CHÍNH THỨC, KHÔNG ĐƯỢC PHÊ DUYỆT HOẶC LIÊN KẾT VỚI MOJANG HOẶC MICROSOFT**.
- **Bảo vệ dữ liệu cá nhân tại Việt Nam:** Toàn bộ chính sách bảo mật tuân thủ nghiêm ngặt **Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15** và **Nghị định số 356/2025/NĐ-CP** (hiệu lực từ 01/01/2026).
- **Phạm vi thương mại:** Máy chủ vận hành phi thương mại ở phiên bản hiện tại, không thu phí ép buộc hay nạp thẻ pay-to-win.

---

<div align="center">
  <sub>Được phát triển với niềm đam mê dành cho cộng đồng LunarChill.Club. 🌙</sub>
</div>
