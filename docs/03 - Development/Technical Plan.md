# LunarChillSMP Website — Technical Plan

> Kế hoạch kỹ thuật chi tiết phục vụ triển khai mã nguồn Phase 03: Thiết kế website bằng code sạch (Vanilla HTML5, CSS3, JavaScript ES6+), tối ưu hiệu năng tải trang, responsive toàn diện và tích hợp API trạng thái máy chủ chuẩn mực.

---

## 1. Triết lý Kỹ thuật & Nguyên tắc Mã nguồn (Core Technical Principles)

* **Vanilla-First & Zero Bloat:** Không sử dụng các framework nặng nề (như React, Vue) hay thư viện UI bên thứ ba cồng kềnh. Toàn bộ mã nguồn viết bằng HTML5 ngữ nghĩa, CSS3 hiện đại (CSS Variables, Flexbox, CSS Grid) và Vanilla JavaScript (ES6+).
* **Nói không với "Vibe-Slop":** Mã nguồn được cấu trúc module rõ ràng, đặt tên biến nhất quán theo Design Tokens (`--color-bg-base`, `--color-accent-primary`), có chú thích đầy đủ, dễ đọc và dễ bảo trì.
* **Mobile-First & Fluid Responsiveness:** Thiết kế responsive mượt mà từ màn hình nhỏ nhất (360px cho người chơi Minecraft PE) đến màn hình lớn (1440px+ Desktop), đảm bảo các điểm chạm (touch targets) tối thiểu 44x44px.
* **Graceful Degradation:** Nếu API bên thứ ba (`mcstatus.io`) không phản hồi hoặc người dùng tắt JavaScript, cấu trúc trang web tĩnh và địa chỉ IP kết nối vẫn hiển thị nguyên vẹn để người dùng lấy IP vào game.

---

## 2. Kiến trúc Thư mục Mã nguồn (Project File Architecture)

Toàn bộ mã nguồn trang web được bố trí trực tiếp tại thư mục gốc của repository phục vụ triển khai tự động (Zero-config Deployment) trên Vercel:

```
LunarChill.Club-Website/
├── index.html                 # Trang chủ (Homepage: Hero, Status, Quick Join, Features, Community)
├── guide.html                 # Cẩm nang tân thủ & Bảng tra cứu lệnh in-game (/guide)
├── rules.html                 # Nội quy máy chủ & Hướng dẫn mở Ticket khiếu nại (/rules)
├── terms.html                 # Điều khoản dịch vụ phi thương mại (/terms)
├── privacy.html               # Chính sách bảo mật tuân thủ Luật 91/2025 & NĐ 356/2025 (/privacy)
├── 404.html                   # Trang báo lỗi 404 phong cách lạc lối vũ trụ Minecraft
│
├── assets/
│   ├── css/
│   │   ├── variables.css      # Hệ thống CSS Design Tokens (màu sắc, typography, spacing, shadows)
│   │   ├── base.css           # Reset CSS, typography cơ bản, utility classes
│   │   ├── components.css     # Nút bấm, cards kính mờ, badge trạng thái, toast notification
│   │   ├── layout.css         # Header navbar, mobile drawer, footer, container grid
│   │   └── pages/             # Style đặc thù cho từng trang (home.css, guide.css, legal.css)
│   │       ├── home.css
│   │       ├── guide.css
│   │       └── legal.css
│   ├── js/
│   │   ├── config.js          # Cấu hình địa chỉ IP server, port, link Discord, API endpoint
│   │   ├── status-service.js  # Module quản lý trạng thái máy chủ (mcstatus.io, cache, 5 states)
│   │   ├── clipboard.js       # Module 1-Click Copy IP và Toast notification phản hồi
│   │   └── main.js            # Khởi tạo navigation, mobile drawer toggle, accordions
│   └── images/
│       ├── Lunar_Logo.png     # Asset huy hiệu logo tròn chính thức
│       ├── favicon.ico        # Icon tab trình duyệt
│       └── screenshots/       # Thư mục ảnh chụp in-game / Community Showcase (định dạng WebP)
│
├── docs/                      # Hệ thống tài liệu dự án (Obsidian Vault)
└── vercel.json                # Cấu hình định tuyến sạch (Clean URLs: /guide, /rules, /terms)
```

---

## 3. Module Kỹ thuật Cốt lõi (Core Modules Implementation)

### 3.1. Cấu hình tập trung (`assets/js/config.js`)
Quản lý toàn bộ hằng số môi trường để khi máy chủ đổi IP, port hoặc link Discord chỉ cần sửa tại 1 vị trí duy nhất:

```javascript
export const CONFIG = {
  SERVER_IP_JAVA: 'play.lunarchill.club',
  SERVER_PORT_JAVA: 25565,
  SERVER_IP_BEDROCK: 'play.lunarchill.club',
  SERVER_PORT_BEDROCK: 19132,
  DISCORD_INVITE_URL: 'https://discord.gg/lunarchill', // Thay bằng link invite chính thức
  LIVE_MAP_URL: 'https://map.lunarchill.club',
  API_STATUS_URL: 'https://api.mcstatus.io/v2/status/java/play.lunarchill.club',
  API_TIMEOUT_MS: 5000,
  STORAGE_CACHE_KEY: 'lunarchill_status_cache'
};
```

### 3.2. Quản lý trạng thái máy chủ (`assets/js/status-service.js`)
Hiện thực hóa đầy đủ vòng đời 5 trạng thái và bộ nhớ đệm động (Dynamic Cache) theo đặc tả đã chốt:
1. **Kiểm tra Cache:** Đọc `sessionStorage`. Nếu `Date.now() < cachedData.expires_at`, tái sử dụng dữ liệu ngay lập tức (không gọi mạng).
2. **State `Checking`:** Hiển thị skeleton hoặc nhịp thở mờ lơ lửng.
3. **Gọi API bất đồng bộ:** Gọi `fetch()` với `AbortController` (timeout 5s).
4. **Phân tích kết quả:**
   - Nếu `online === true`: Kích hoạt state `Online`, render `{online}/{max}` người chơi.
   - Nếu `online === false`: Kích hoạt state `Offline` (không tự suy diễn là Maintenance).
   - Nếu lỗi mạng / timeout / HTTP 429: Kích hoạt state `Unable to retrieve status`, giữ nguyên IP để người chơi kết nối trực tiếp.
   - State `Maintenance`: Chỉ kích hoạt nếu cờ cấu hình `CONFIG.FORCE_MAINTENANCE` được bật chủ động bởi BQT.
5. **Cập nhật Cache:** Trích xuất trường `expires_at` (epoch timestamp) từ payload JSON của `mcstatus.io` để thiết lập thời gian sống cho cache.

### 3.3. Module Sao chép 1-Click (`assets/js/clipboard.js`)
- Hỗ trợ `navigator.clipboard.writeText()` chuẩn hiện đại.
- Cơ chế Fallback `document.execCommand('copy')` với textarea ẩn dành cho trình duyệt di động cũ.
- Kích hoạt Toast notification với animation slide-in mượt mà trong `2000ms`, đồng thời đổi trạng thái nhãn nút thành `Đã sao chép! ✓`.

### 3.4. Hệ thống CSS Design Tokens (`assets/css/variables.css`)
Hiện thực hóa 100% bảng màu trích xuất từ `Lunar_Logo.png`:
- `--color-bg-base: #090914` (Deep Abyss Black)
- `--color-bg-surface: rgba(10, 14, 42, 0.75)` (Midnight Indigo Glass)
- `--color-accent-primary: #688BF8` (Waterfall Glow Blue)
- `--color-accent-glow: #38BDF8` (Orbit Azure)
- `--color-text-heading: #FEFDFD` (Moon Core White)
- `--color-text-body: #94A3B8` (Muted Sky)
- `--status-online: #10B981` / `--status-offline: #EF4444` / `--status-caution: #F59E0B`

---

## 4. Kế hoạch Định tuyến & Triển khai Vercel (`vercel.json`)

Thiết lập cấu hình định tuyến sạch (Clean URLs) để người dùng truy cập trực tiếp các đường dẫn như `/guide`, `/rules`, `/terms`, `/privacy` mà không cần đuôi `.html`:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 5. Trình tự Triển khai Mã nguồn (Development Implementation Steps)

1. **Bước 1 — Nền tảng & Cấu trúc (Foundations & Token Setup):**
   - Thiết lập cấu trúc thư mục `assets/` (css, js, images).
   - Viết `variables.css`, `base.css`, `layout.css`, `components.css`.
2. **Bước 2 — Xây dựng Trang chủ (`index.html` & `home.css`):**
   - Dựng Sticky Header & Mobile Drawer.
   - Dựng Hero Section với slogan *"Chill thôi, đừng có vội."* 🌙 và nút Copy IP.
   - Tích hợp `status-service.js` và `clipboard.js`.
   - Dựng Quick Join Steps, Server Features Cards và Global Footer.
3. **Bước 3 — Xây dựng các trang nội dung phụ (`guide.html`, `rules.html`):**
   - Dựng trang Cẩm nang tân thủ với bảng lệnh tương tác (click-to-copy cú pháp lệnh) và FAQ Accordion.
   - Dựng trang Nội quy máy chủ phân mục minh bạch kèm hộp Callout mở ticket Discord.
4. **Bước 4 — Xây dựng các trang pháp lý (`terms.html`, `privacy.html`):**
   - Trình bày bố cục tập trung (Centered Reading 840px), nội dung chuẩn xác theo Luật 91/2025/QH15 và Mojang EULA.
5. **Bước 5 — Tối ưu hóa, Kiểm thử & Đưa lên Vercel:**
   - Tinh chỉnh responsive trên giả lập thiết bị di động (iPhone/Android).
   - Kiểm thử hiệu năng Lighthouse audit (mục tiêu ≥ 90 điểm).
   - Kiểm thử trường hợp API status ngoại tuyến hoặc mạng yếu.
