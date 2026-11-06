# LunarChill.Club — Feature Backlog & Future Improvements

> Nơi lưu trữ ý tưởng mới, các tính năng dự kiến mở rộng và những hạng mục cần cải tiến trong tương lai cho website và máy chủ LunarChill.Club.

> [!NOTE]
> **Hiện trạng dự án:** Đã deploy lên Vercel, domain có sẵn, đợi xác thực, tiến hành sang công đoạn liên tục cải thiện trang web.

---

## 📌 Phân loại mức độ ưu tiên (Priority Levels)

- **🔥 P0 — Cần thiết / Quan trọng:** Ảnh hưởng trực tiếp đến trải nghiệm vào game hoặc độ hoàn thiện của trang web.
- **⚡ P1 — Ưu tiên cao:** Gia tăng đáng kể tính tiện dụng và sự hấp dẫn của cộng đồng.
- **✨ P2 — Nâng cao / Trải nghiệm:** Giúp trang web tinh tế, độc đáo và giàu cảm xúc hơn.
- **🧊 P3 — Hộp ý tưởng (Icebox):** Các ý tưởng đột phá cần thời gian nghiên cứu hoặc phụ thuộc vào quy mô máy chủ sau này.

---

## 1. 🌟 Giao diện & Trải nghiệm Thị giác (UI / UX & Motion)

| Mức độ | Tính năng / Hạng mục cải tiến                 | Mô tả chi tiết                                                                                                                                                               |        Trạng thái         |
| :----: | :-------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------: |
| **P1** | **Scroll Animations (Chuyển động tĩnh)**      | Sử dụng `Intersection Observer` để các thẻ và section nhẹ nhàng trượt lên (`fade-in-up`) khi người chơi cuộn chuột tới, giữ nguyên tinh thần nhẹ tênh và 0KB thư viện ngoài. |        ⏳ Đang chờ         |
| **P2** | **Audio Player Ambient / Lofi Toggle**        | Một nút nhỏ xíu cạnh status bar: `[ 🎵 Nghe chút nhạc chill ]`. Bấm vào phát nhẹ nhàng một bản nhạc Minecraft lofi không lời với âm lượng 15-20%.                            |        💡 Ý tưởng         |
| **P2** | **Canvas Stardust & Fireflies (Đom đóm đêm)** | Khoảng 10-15 hạt bụi sao/đom đóm phát sáng bay lơ lửng rất chậm quanh đốm lửa trại và vầng trăng khuyết để tạo chiều sâu thị giác điện ảnh.                                  | Cân nhắc ở các trang khác |
| **P2** | **Interactive Hotspots Mini-tour**            | Tích hợp lại các điểm ghim tương tác (`Quảng trường Spawn`, `Bến câu ngắm sao`, `Thị trấn Towny`) khi người dùng bấm vào các cọc mốc trên sàn cắm trại.                      |           Đã bỏ           |

---

## 2. 🎮 Cổng Kết Nối & Tương Tác Máy Chủ (Server Portal)

| Mức độ | Tính năng / Hạng mục cải tiến                    | Mô tả chi tiết                                                                                                                                                                                                                        |   Trạng thái    |
| :----: | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------: |
| **P0** | **Đồng nhất Port 25572 cho cả Java & Bedrock**   | Thống nhất chung port `:25572` cho cả hai nền tảng Java và Bedrock (cấu hình GeyserMC UDP lắng nghe trên port 25572). Đã cập nhật toàn bộ `config.js`, các nút copy, header, drawer và thẻ kết nối trên website kèm fallback an toàn. | ✅ Đã hoàn thành |
| **P1** | **Mã QR kết nối 1-chạm cho Mobile (Bedrock/PE)** | Hiển thị mã QR hoặc deep link `minecraft://?addExternalServer=...` để người chơi trên điện thoại chỉ cần chạm là tự mở Minecraft và thêm máy chủ.                                                                                     |     Từ chối     |
| **P2** | **Biểu đồ Người chơi trực tuyến trong ngày**     | Hiển thị một sparkline / mini graph nhỏ thể hiện khung giờ đông người chơi nhất trong 24h để anh em biết lúc nào đông vui để vào.                                                                                                     |   💡 Ý tưởng    |
| **P2** | **Tra cứu Ping thời gian thực theo khu vực**     | Bổ sung hiển thị độ trễ mạng thực tế từ 3 miền (Hà Nội, Đà Nẵng, TP.HCM) như phong cách của TheLovelyValley.                                                                                                                          |   💡 Ý tưởng    |

---

## 3. 🏰 Thị Trấn, Bản Đồ & Cộng Đồng (Towny & Community)

| Mức độ | Tính năng / Hạng mục cải tiến                             | Mô tả chi tiết                                                                                                           |   Trạng thái    |
| :----: | :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :-------------: |
| **P1** | **Tích hợp Bản đồ vệ tinh trực tuyến (BlueMap / Dynmap)** | Mở một khung modal hoặc trang riêng để người chơi xem bản đồ 3D thế giới in-game trực tiếp từ trình duyệt.               |     Từ chối     |
| **P1** | **Bộ sưu tập ảnh chụp in-game thực tế (`gallery.html`)**  | Tổng hợp ảnh chụp từ các thị trấn, công trình và khoảnh khắc sinh tồn của người chơi để đưa vào trang Triển lãm thực tế. | ⏳ Đang tổng hợp |
| **P2** | **Hồ sơ riêng cho từng Thị trấn (Town Profile Cards)**    | Bấm vào từng thị trấn xem được tên Thị trưởng, số lượng cư dân, ảnh chụp công trình tiêu biểu và tọa độ warp.            |   💡 Ý tưởng    |
| **P3** | **Form gửi ảnh đóng góp cộng đồng**                       | Cho phép người chơi tải ảnh kỷ niệm của mình lên thông qua Discord Webhook tự động gửi về kênh xét duyệt của BQT.        |    🧊 Icebox    |

---

## 4. 📖 Cẩm Nang, Lệnh & Hỗ Trợ (Guide & Tooling)

| Mức độ | Tính năng / Hạng mục cải tiến | Mô tả chi tiết | Trạng thái |
| :---: | :--- | :--- | :---: |
| **P0** | **Bộ 3 Chuyên trang The End (Stellarity & Nullscape)** | Xuất bản cổng The End (`/the-end`), wiki Stellarity 23 biome & 32 công thức chế tạo (`/stellarity`), cấu trúc Nullscape 384 blocks (`/nullscape`). | ✅ Đã hoàn thành |
| **P1** | **Thanh tìm kiếm lệnh nhanh (Instant Command Search)** | Cho phép gõ từ khóa (ví dụ: `/t new`, `/pet`, `/rtp`) để lọc tức thì các câu lệnh trong `guide.html`. | ⏳ Đang chờ |
| **P2** | **Máy tính nạp oxy & độ sâu (Deepslate Mining Calculator)** | Công cụ nhỏ giúp người chơi tra cứu độ sâu nào cần đèn hiệu Beacon và cách nạp oxy an toàn. | 💡 Ý tưởng |

---

## 5. 🛡️ Hệ Thống Đăng Ký, Xác Thực & Chống Clone (Whitelist & Anti-Clone)

| Mức độ | Tính năng / Hạng mục cải tiến | Mô tả chi tiết | Trạng thái |
| :---: | :--- | :--- | :---: |
| **P1** | **Form đăng ký tham gia bằng Email & IGN** | Người chơi nhập **Tên nhân vật (In-Game Name - IGN)** và **Địa chỉ Email** trên website để đăng ký vào máy chủ. | 💡 Đã ghi nhận |
| **P1** | **Cơ chế lọc trùng Email (Email Deduplication)** | Hệ thống kiểm tra nghiêm ngặt: Mỗi Email chỉ được gắn với duy nhất 1 IGN (và ngược lại 1 IGN chỉ dùng 1 Email). Chặn việc 1 người dùng cùng email đăng ký nhiều tài khoản. | 💡 Đã ghi nhận |
| **P1** | **Cơ chế chống Clone & Spam Bot (Anti-Clone & Bot Defense)** | - **Xác thực OTP:** Gửi mã xác nhận 6 số hoặc link kích hoạt về email để đảm bảo email có thật và chính chủ.<br>- **Bảo vệ biểu mẫu:** Tích hợp Cloudflare Turnstile / hCaptcha vô hình để chặn bot spam.<br>- **Rate-limit IP:** Giới hạn số lượt gửi yêu cầu từ một dải IP trong khoảng thời gian nhất định.<br>- **Đồng bộ Whitelist tự động:** Sau khi xác thực email thành công, API tự động thêm IGN vào danh sách Whitelist máy chủ Minecraft (qua RCON / Database plugin). | 💡 Đã ghi nhận |

> 🛠️ **Ghi chú kỹ thuật cho Dev:** Tính năng này cần một tầng Backend nhẹ (Vercel Serverless Function `/api/register`), cơ sở dữ liệu lưu tài khoản (Neon Postgres / Supabase / Upstash Redis miễn phí) và dịch vụ gửi mail transactional (Resend API miễn phí 3.000 mail/tháng).

---

## 6. 💡 Khu Vực Ghi Chép Ý Tưởng Nhanh (Admin Scratchpad)

> *Ghi chú nhanh bất kỳ ý tưởng nào vừa nảy ra vào bảng dưới đây trước khi phân loại chi tiết.*

- [ ] **Ý tưởng 1:** ...
- [ ] **Ý tưởng 2:** ...
- [ ] **Ý tưởng 3:** ...
