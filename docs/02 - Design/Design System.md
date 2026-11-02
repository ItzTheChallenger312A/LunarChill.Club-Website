# LunarChillSMP — Design System

> Quy chuẩn hệ thống thiết kế giao diện (Design System Tokens & Components) phục vụ xây dựng mã nguồn HTML5, CSS3 hiện đại, đảm bảo tính nhất quán từ Figma Prototype đến mã nguồn thực tế, đồng bộ hoàn toàn với asset nhận diện `Lunar_Logo.png`.

---

## 1. Biến Thiết kế Giao diện (CSS Design Tokens)

Dựa trên bảng màu trích xuất từ Logo chính thức:

```css
:root {
  /* Surface & Background Colors */
  --color-bg-base: #090914;          /* Deep Abyss Black từ nền logo */
  --color-bg-surface: rgba(10, 14, 42, 0.75); /* Midnight Indigo Glass */
  --color-bg-surface-hover: rgba(30, 27, 75, 0.85);
  --color-border-subtle: rgba(104, 139, 248, 0.15); /* Orbit Blue Border */
  --color-border-active: rgba(104, 139, 248, 0.5);

  /* Brand Accent Colors */
  --color-accent-primary: #688BF8;   /* Waterfall Glow Blue */
  --color-accent-glow: #38BDF8;      /* Orbital Ring Azure */
  --color-accent-purple: #818CF8;    /* Voxel Cloud Lavender */

  /* Text & Typography Colors */
  --color-text-display: #E0EFFF;     /* Moonlight Silver */
  --color-text-heading: #FEFDFD;     /* Moon Core White */
  --color-text-body: #94A3B8;        /* Muted Sky Gray */
  --color-text-muted: #64748B;       /* Deep Muted */

  /* Functional Status Colors */
  --status-online: #10B981;
  --status-checking: #38BDF8;
  --status-offline: #EF4444;
  --status-maintenance: #F59E0B;

  /* Typography Ramp */
  --font-main: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-code: 'JetBrains Mono', monospace;

  /* Radius Tokens (Quy chuẩn Anti-Slop: Góc bo thanh thoát, không bo tròn quá mức) */
  --radius-xs: 4px;                  /* Command chip, badge */
  --radius-sm: 6px;                  /* Nút bấm (Buttons), Input */
  --radius-md: 8px;                  /* Card tính năng, Dialog */
  --radius-lg: 12px;                 /* Container lớn */
}
```

---

## 2. Thiết kế Font chữ & Thứ bậc nội dung (Typography System)

* **Font gia đình chính (Primary Font):** `Plus Jakarta Sans` hoặc `Inter` — nét chữ hình học hiện đại, hỗ trợ tiếng Việt đầy đủ và kết hợp hài hòa với khối chữ chạm khắc 3D của Logo.
* **Font hiển thị số & code / lệnh game (Monospace):** `JetBrains Mono` hoặc `Fira Code`.

### Bảng tỷ lệ Typography (Scale Hierarchy)

| Cấp bậc | Cỡ chữ (Size / Line-height) | Độ đậm (Weight) | Màu sắc áp dụng | Mục đích sử dụng |
| :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `48px / 1.15` (Mobile: `32px / 1.2`) | Bold (700) | `--color-text-display` | Tiêu đề chính Hero Section |
| **Heading 1 (H1)** | `36px / 1.25` (Mobile: `28px / 1.3`) | SemiBold (600) | `--color-text-heading` | Tiêu đề trang (`/guide`, `/rules`) |
| **Heading 2 (H2)** | `24px / 1.35` (Mobile: `20px / 1.4`) | SemiBold (600) | `--color-text-heading` | Tiêu đề các Section lớn |
| **Heading 3 (H3)** | `18px / 1.4` (Mobile: `16px / 1.4`) | Medium (500) | `--color-text-display` | Tiêu đề thẻ tính năng (Card) |
| **Body Large** | `18px / 1.6` | Regular (400) | `--color-text-body` | Đoạn văn mô tả Hero, phụ đề |
| **Body Base** | `15px / 1.6` | Regular (400) | `--color-text-body` | Nội dung văn bản, cẩm nang |
| **Body Small** | `13px / 1.5` | Regular (400) | `--color-text-muted` | Metadata, Footer, Disclaimer |
| **Code / Command**| `14px / 1.5` | Medium (500) | `--color-accent-glow` | Cú pháp lệnh Minecraft |

---

## 3. Hệ thống Khoảng cách & Lưới (Spacing & Grid System)

Áp dụng quy tắc bội số **4px / 8px**:

* `--space-1`: `4px` (Khoảng cách icon nhỏ)
* `--space-2`: `8px` (Khoảng cách giữa badge và chữ)
* `--space-3`: `12px` (Padding nút nhỏ)
* `--space-4`: `16px` (Padding nút bấm tiêu chuẩn, margin các phần tử)
* `--space-6`: `24px` (Padding trong thẻ Card)
* `--space-8`: `32px` (Khoảng cách giữa các khối nội dung)
* `--space-12`: `48px` (Khoảng cách section trên mobile)
* `--space-16`: `64px` (Padding section dọc trên tablet)
* `--space-24`: `96px` (Padding section dọc trên desktop)

### Container & Layout Max-Width
* **Max Container Width:** `1200px` (căn giữa với `margin: 0 auto; padding: 0 24px`).
* **Reading Width (Văn bản dài `/rules`, `/terms`):** Tối đa `840px` để đảm bảo độ dài dòng đọc tối ưu (65 - 75 ký tự/dòng).

---

## 4. Hệ thống Thẻ & Bề mặt (Cards, Surfaces & Glassmorphism)

Tận dụng hiệu ứng kính mờ đêm vũ trụ (Midnight Indigo Glassmorphism):

```css
/* Card Surface Token (Anti-Slop: bo góc 8px chắc chắn, không bo tròn lố bịch) */
.lunar-card {
  background: var(--color-bg-surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md); /* 8px thay vì 16px-24px */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease,
              box-shadow 0.2s ease;
}

.lunar-card:hover {
  border-color: var(--color-border-active);
  transform: translateY(-3px);
  box-shadow: 0 12px 36px -4px rgba(104, 139, 248, 0.2);
}
```

---

## 5. Hệ thống Nút bấm & Tương tác (Buttons & Actions)

### 5.1. Primary Action (Nút Copy IP & Primary CTA)
* **Visual:** Nền chuyển màu Gradient thác nước phát sáng (`linear-gradient(135deg, #688BF8, #3B82F6)`), chữ Moon White đậm, bo góc `8px` (`--radius-sm`, không dùng dạng viên thuốc tròn ủng).
* **State Hover:** Tăng nhẹ độ sáng, đổ bóng phát sáng tinh tế (`box-shadow: 0 0 16px rgba(104, 139, 248, 0.4)`).
* **State Active / Click:** Co nhẹ (`transform: scale(0.98)`).

### 5.2. Secondary Action (Nút Discord Community)
* **Visual:** Nền kính tối trong suốt (`rgba(255, 255, 255, 0.05)`), viền mỏng (`border: 1px solid rgba(255, 255, 255, 0.15)`), chữ trắng ánh bạc.
* **State Hover:** Nền sáng nhẹ hơn, viền đổi sang màu Discord Blurple nhạt (`#818CF8`) hoặc ánh trăng.

### 5.3. Interactive Command Box (Hộp sao chép lệnh)
* **Visual:** Khối nền tối màu than chì (`#060A22`), font `JetBrains Mono`, có icon copy ở góc phải.
* **Tương tác:** Nhấp một chạm sẽ tự động sao chép lệnh kèm tooltip "Đã chép!".

---

## 6. Trạng thái & Phản hồi (States & Toast Feedback)

* **Server Status Pill (Viên thuốc trạng thái):**
  - Tròn nhỏ, có chấm tròn pulsing hiển thị nhịp thở máy chủ.
  - Phân tách màu theo 5 trạng thái đã chốt: Xanh (Online), Đỏ (Offline), Xanh trời (Checking), Xám (Unable to retrieve), Vàng (Maintenance có xác nhận).
* **Toast Notification (Phản hồi sau khi Copy IP):**
  - Xuất hiện ở góc dưới trung tâm màn hình (Mobile) hoặc góc trên bên phải (Desktop).
  - Tự động trượt vào (Slide-in) và biến mất sau 2 giây.
