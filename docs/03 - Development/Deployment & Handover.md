# Deployment & Handover Guide

> **Mục tiêu:** Hướng dẫn toàn diện quy trình triển khai website LunarChill lên Internet qua Vercel, cấu hình DNS an toàn không ảnh hưởng máy chủ Minecraft, và quy trình bàn giao vận hành.  
> **Cập nhật:** 2026-11-05  
> **Trạng thái:** Đã deploy lên Vercel, domain có sẵn, đợi xác thực, tiến hành sang công đoạn liên tục cải thiện trang web.  
> **Phiên bản:** 1.1 (Phase 03 Continuous Improvement)

> [!NOTE]
> **Hiện trạng:** Dự án đã deploy lên Vercel, domain có sẵn, đợi xác thực, tiến hành sang công đoạn liên tục cải thiện trang web.

---

## 1. Cấu hình Vercel & Clean URLs

Website LunarChill là dự án tĩnh (Static HTML/CSS/Vanilla JS) với file cấu hình [`vercel.json`](../../vercel.json):

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

### Các đường dẫn điều hướng sau khi bật Clean URLs:
- `https://LunarChill.club/` ➔ `index.html`
- `https://LunarChill.club/guide` ➔ `guide.html`
- `https://LunarChill.club/rules` ➔ `rules.html`
- `https://LunarChill.club/terms` ➔ `terms.html`
- `https://LunarChill.club/privacy` ➔ `privacy.html`
- Bất kỳ URL không hợp lệ nào ➔ `404.html`

---

## 2. Quy trình liên kết GitHub và Deploy tự động

1. **Đăng nhập Vercel** bằng tài khoản GitHub quản trị repo `LunarChill.Club-Website`.
2. **Import Project** từ GitHub:
   - Framework Preset: **Other** (hoặc để trống, thuần HTML).
   - Root Directory: `./`
   - Build Command: Không cần (bỏ trống).
   - Output Directory: `./` (bỏ trống).
3. **Kiểm tra File loại trừ ([`.vercelignore`](../../.vercelignore)):**
   - Đảm bảo các thư mục nội bộ `.obsidian/`, `docs/`, `link.txt` không bị public lên CDN.
4. Nhấn **Deploy**. Mỗi lần `git push` lên branch `main`, Vercel sẽ tự động tạo bản build mới trong ~15 giây.

---

## 3. Cấu hình DNS Tên miền `LunarChill.club` (Đặc biệt lưu ý)

> [!CAUTION]
> **Checklist bảo vệ DNS máy chủ Minecraft:**  
> Tuyệt đối không xóa hoặc ghi đè các bản ghi SRV (`_minecraft._tcp.LunarChill.club`) hoặc bản ghi A/CNAME đang trỏ về máy chủ Minecraft!

### Bảng phân phối bản ghi DNS khuyến nghị:

| Loại Record | Tên (Name / Host) | Giá trị trỏ đến (Value / Target) | Mục đích |
| :--- | :--- | :--- | :--- |
| **A / CNAME** | `@` (Root: `LunarChill.club`) | `76.76.21.21` (hoặc `cname.vercel-dns.com`) | Trỏ Website chính về Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com` | Redirect về website |
| **SRV** | `_minecraft._tcp` | Trỏ về IP VPS game với Port `25572` | Kết nối Java Minecraft |
| **A** | `mc` (nếu dùng subdomain) | IP VPS máy chủ Minecraft | Dự phòng kết nối game |

---

## 4. Kiểm tra sau khi triển khai (Post-Deployment Smoke Test)

- [ ] Truy cập `https://LunarChill.club/` hiển thị đúng giao diện Dark Theme Cosmic Sanctuary.
- [ ] Bấm nút "Sao chép IP Server" hiển thị toast thông báo thành công.
- [ ] Live Status Pill tự động gọi API `mcstatus.io` hiển thị số người chơi thực tế.
- [ ] Truy cập thử `https://LunarChill.club/guide`, `/rules`, `/terms`, `/privacy` hoạt động sạch (Clean URL).
- [ ] Truy cập thử `https://LunarChill.club/khong-ton-tai` kích hoạt trang `404.html` The End.
- [ ] Thử kết nối Minecraft PC và PE vào `LunarChill.club` xem game có bị ảnh hưởng không.

---

## 5. Quy trình Bàn giao & Cập nhật nội dung sau này

1. **Sửa nội dung văn bản:**
   - Mở file HTML tương ứng (`index.html`, `guide.html`,...), chỉnh sửa nội dung văn bản nằm trong các thẻ HTML.
   - Cam kết tuân thủ [`docs/02 - Design/Borderline Of Slop & Human-like.md`](../02%20-%20Design/Borderline%20Of%20Slop%20&%20Human-like.md).
2. **Cập nhật thông số kết nối hoặc Link Discord:**
   - Chỉ cần sửa tại một nơi duy nhất: [`assets/js/config.js`](../../assets/js/config.js).
3. **Commit và đẩy code:**
   ```bash
   git add .
   git commit -m "feat(content): cập nhật nội dung mới"
   git push origin main
   ```
   Website trên Vercel sẽ tự động cập nhật ngay lập tức.
