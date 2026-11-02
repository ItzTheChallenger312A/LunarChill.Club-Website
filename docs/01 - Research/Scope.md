# LunarChillSMP Website — Project Scope & Prioritization (P0 / P1 / P2)

> Xác định phạm vi dự án, tiêu chuẩn bàn giao và ma trận phân loại ưu tiên tính năng dựa trên mục tiêu tiến độ (Deadline: 2026-11-20), ngăn chặn hiện tượng phình to phạm vi (scope creep) và đảm bảo chất lượng code sạch ("không vibe-slop").

---

## 1. Phân loại mức độ ưu tiên (MoSCoW / Priority Matrix)

| Mức độ | Định nghĩa | Chiến lược triển khai |
| :--- | :--- | :--- |
| **P0 (Must Have)** | Cốt lõi bắt buộc phải có để ra mắt website. Nếu thiếu, website không thể phát hành (Blocker). | Hoàn thành và kiểm thử nghiêm ngặt trước ngày 2026-11-10. |
| **P1 (Should Have)** | Tính năng quan trọng, nâng cao trải nghiệm người dùng đáng kể nhưng không chặn ngày ra mắt nếu trễ. | Triển khai ngay sau khi P0 ổn định, hoàn thiện trước 2026-11-16. |
| **P2 (Nice to Have / Future)** | Tính năng bổ trợ, tương tác nâng cao hoặc cần hạ tầng backend phụ trợ phức tạp. | Dời vào giai đoạn phát triển tiếp theo (Post-release v1.1+). |

---

## 2. Chi tiết phân rã tính năng

### 2.1. Nhóm P0 — Must Have (Phạm vi cốt lõi v1.0)
* **P0-01: Landing Page hoàn chỉnh (Trang chủ)**
  - Hero Section với cinematic background, headline định vị phong cách LunarChill.
  - Action Click-to-Copy Server IP (Java & Bedrock) kèm Toast thông báo "Đã sao chép vào bộ nhớ tạm".
  - Nút chuyển đổi nhanh sang cộng đồng Discord chính thức.
  - Section giới thiệu định vị gameplay và bản sắc máy chủ (Towny/Survival/Community).
* **P0-02: Live Server Status Tracker (mcstatus.io Centralized Service)**
  - Tích hợp gọi REST API `https://api.mcstatus.io/v2/status/java/LunarChill.club` qua Single Status Manager tập trung (tránh trùng request, tuân thủ giới hạn 5 req/s).
  - Phân định rõ 5 trạng thái: `Checking`, `Online`, `Offline`, `Unable to retrieve status`, và `Maintenance` (chỉ kích hoạt khi BQT gắn cờ chủ động).
  - Đọc hạn cache động (`expires_at`, `X-Cache-Time-Remaining`) lưu vào `sessionStorage` thay vì hardcode 60s.
  - Graceful fallback: Nếu API timeout (> 5s) hoặc lỗi kết nối, hiển thị trạng thái "Unable to retrieve status", giữ nguyên IP để người chơi kết nối trực tiếp.
* **P0-03: Responsive Layout 100% (Mobile, Tablet, Desktop)**
  - Tương thích tốt nhất với người dùng di động (người chơi Minecraft Bedrock/Pocket Edition).
  - Navigation drawer trên mobile mượt mà, cảm ứng thân thiện.
* **P0-04: Trang Nội quy máy chủ (`/rules`)**
  - Cấu trúc văn bản mạch lạc, phân chia rõ ràng: Gian lận, Hành vi ứng xử, Xây dựng & bảo vệ tài nguyên, Khung hình phạt và quy trình mở Ticket khiếu nại.
* **P0-05: Trang Cẩm nang tân thủ (`/guide`)**
  - Địa chỉ IP & Cổng kết nối rõ ràng cho Java (mặc định 25572) và Bedrock (port 19143).
  - Bảng các câu lệnh quan trọng nhất in-game.
* **P0-06: Văn bản Pháp lý chuẩn xác (`/terms` và `/privacy`)**
  - **ToS:** Khẳng định dịch vụ phi thương mại, thỏa thuận người dùng, quyền hạn BQT, miễn trừ trách nhiệm theo Minecraft EULA; loại bỏ điều khoản donate/hoàn tiền do v1.0 chưa có hoạt động này.
  - **Privacy Policy:** Bám sát căn cứ pháp lý hiện hành tại Việt Nam — **Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15** và **Nghị định 356/2025/NĐ-CP** (hiệu lực từ 01/01/2026); làm rõ chủ thể vận hành, luồng dữ liệu web (localStorage), nhật ký Vercel Edge logs (chống DDoS), dữ liệu in-game (IGN/UUID), bên thứ ba (Vercel, Discord, mcstatus.io) và kênh Ticket xử lý quyền dữ liệu.
  - Mojang Disclaimer ở footer trên mọi trang.
* **P0-07: CI/CD & Production Deployment**
  - Cấu hình repository GitHub chuẩn, tự động deploy preview & production lên Vercel.
  - Tối ưu SEO meta tags cơ bản (OpenGraph cards để preview đẹp trên Discord/Facebook).

---

### 2.2. Nhóm P1 — Should Have (Nâng cao trải nghiệm)
* **P1-01: Thư viện ảnh tương tác (Community Showcase / Lightbox Gallery)**
  - Hiển thị các công trình xuất sắc hoặc sự kiện máy chủ qua modal phóng to ảnh (Lightbox) nhẹ nhàng không dùng thư viện nặng.
* **P1-02: Quick FAQ Accordion**
  - Thành phần Hỏi - Đáp dạng đóng/mở (accordion) giúp giải đáp nhanh các thắc mắc thường gặp tại `/guide`.
* **P1-03: Theme Toggle (Dark / Lunar Night Mode)**
  - Lưu tùy chọn giao diện vào LocalStorage người dùng.
* **P1-04: Custom 404 Not Found Page**
  - Trang báo lỗi 404 phong cách Minecraft (ví dụ: "Bạn đã lạc vào The End") với nút quay lại Trang chủ.
* **P1-05: Player List / Avatars (Conditional - Có điều kiện phụ thuộc)**
  - *Lưu ý kỹ thuật:* Chỉ triển khai khi BQT máy chủ xác nhận đã bật tính năng Query (`enable-query=true`) trên server Minecraft và kiểm thử mcstatus.io trả về danh sách player ổn định. Nếu không có query, chỉ giữ bộ đếm P0 (`online / max`).

---

### 2.3. Nhóm P2 — Nice to Have / Out of Scope v1.0 (Dành cho bản v1.1+)
* **P2-01: Tích hợp trực tiếp Live Map Web (Embedded Dynmap/BlueMap iframe)**
  - *Lý do loại khỏi v1.0:* Gây tốn băng thông, tải trang nặng nề và dễ gặp lỗi mixed content / cross-origin iframe; tạm thời ở v1.0 dẫn link ra tab mới.
* **P2-02: Cổng Vote thưởng tự động (Votifier Integration / Vote Leaderboard)**
  - *Lý do loại khỏi v1.0:* Yêu cầu plugin in-game và backend xử lý webhook, chưa cần thiết ở giai đoạn discovery.
* **P2-03: Web Store / Hệ thống nạp thẻ (Donation Store)**
  - *Lý do loại khỏi v1.0:* Server là dự án cộng đồng phi thương mại ở v1.0; chưa phát sinh nhu cầu thu phí.
* **P2-04: Tài khoản người chơi & Đăng nhập Discord OAuth2**
  - *Lý do loại khỏi v1.0:* Vượt quá kiến trúc vanilla tĩnh (HTML/CSS/JS), làm tăng độ phức tạp vận hành cơ sở dữ liệu.
* **P2-05: Blog / CMS thông báo tự động từ Discord**
  - *Lý do loại khỏi v1.0:* Đẩy thông báo qua kênh Discord hiện hữu hiệu quả và ít tốn công hơn nhiều.

---

## 3. Ranh giới dự án (In-Scope vs Out-of-Scope)

```
+--------------------------------------------------------------------------+
| IN-SCOPE (Bản v1.0)                                                      |
| - Static site hiệu năng cao (HTML5, Vanilla CSS3, Vanilla JS).           |
| - 5 trang: Home, Guide, Rules, Terms of Service, Privacy Policy.          |
| - Tích hợp Client-side mcstatus.io qua Single Status Fetcher tập trung.  |
| - Đọc cache động (expires_at) và xử lý 5 trạng thái server rõ ràng.      |
| - Tuân thủ Luật 91/2025/QH15, NĐ 356/2025/NĐ-CP và Mojang EULA.          |
| - 1-Click Copy IP với UX phản hồi tức thì (Toast).                       |
| - Host trên Vercel, kiểm soát DNS an toàn không làm gián đoạn server game.|
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
| OUT-OF-SCOPE (Không làm trong v1.0)                                      |
| - Backend database riêng biệt (PostgreSQL/MongoDB).                      |
| - Cổng thanh toán / Nạp thẻ cào / Mua hàng in-game (Chưa có donation).   |
| - Hệ thống tài khoản người dùng trên website.                            |
| - Tự viết server bot / custom status daemon.                             |
| - Giả định cứng danh sách người chơi (Player list).                       |
+--------------------------------------------------------------------------+
```
