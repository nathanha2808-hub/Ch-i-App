# CHANGELOG.md — Lịch sử thay đổi Chị Ơi!

> AI Agent cập nhật file này sau MỖI session làm việc.

---

## [1.5.6] - 2026-05-21

### 🐛 Sửa lỗi Android Native (Location Access & App Logo Sync)

#### Added
- Khai báo các quyền định vị GPS thiết bị (`ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`) và tính năng phần cứng `android.hardware.location.gps` trong `AndroidManifest.xml`.
- Khai báo quyền đẩy thông báo (`POST_NOTIFICATIONS`) trong `AndroidManifest.xml` cho các thiết bị chạy Android 13+ để đảm bảo nhận đơn hàng realtime đồng bộ với iOS.
- Tích hợp thêm thuật toán tự động sinh toàn bộ launcher icons cho Android trong file script `mobile-ios/regen-icons.js`.

#### Fixed
- Sửa lỗi đường dẫn logo gốc và thư mục output của PWA trong `mobile-ios/regen-icons.js` (logo gốc chuyển từ `logo/logo.jpg` không tồn tại thành `assets/images/logo.jpg`, thư mục PWA lưu trực tiếp ở `/icons/` thay vì `/frontend/`).
- Tạo thành công 15 tệp logo Android cho 5 mức mật độ màn hình (`mdpi`, `hdpi`, `xhdpi`, `xxhdpi`, `xxxhdpi`), bao gồm:
  - Legacy vuông (`ic_launcher.png`)
  - Round tròn (`ic_launcher_round.png`) sử dụng SVG circle mask.
  - Adaptive foreground (`ic_launcher_foreground.png`) co giãn 66% an toàn trên transparent canvas.
- Hoàn thành đồng bộ cấu hình ứng dụng Android (`npx cap sync android`).

---

## [1.5.5] - 2026-05-19

### ✨ New Features — Tasker Auto-Accept Orders & Polling Optimization

#### Added
- **Frontend Tasker:** `giupviec/trangchutasker.html` — Bổ sung nút chuyển đổi (Toggle) "Tự động nhận đơn" ở phần trạng thái tìm đơn (Idle State).
- **Frontend Tasker:** `giupviec/trangchutasker.html` — Triển khai logic chạy ngầm `autoAcceptOrder()`: Tự động gọi API nhận đơn thay vì hiển thị Modal khi có đơn mới tới từ Socket hoặc thông qua Polling, giúp Tasker nhận đơn nhanh nhất mà không cần thao tác bấm. Trạng thái cấu hình được lưu cục bộ trong `localStorage`.

#### Fixed
- **Frontend Tasker:** `giupviec/trangchutasker.html` — Sửa lỗi giao diện nút bấm hành động (Action Button) đang bị gắn cứng dòng chữ "BẮT ĐẦU DỌN DẸP". Nút bấm hiện tại sẽ thay đổi văn bản linh hoạt theo đúng loại dịch vụ thực tế mà Tasker đang thực hiện (ví dụ: "BẮT ĐẦU TRÔNG TRẺ", "BẮT ĐẦU MUA HỘ").
- **Frontend Tasker:** `giupviec/trangchutasker.html` — Sửa lỗi nghiêm trọng (Race Condition & Polling Block): Xoá bỏ logic kiểm tra sai lệch khiến Tasker vĩnh viễn không nhận được đơn mới nếu đã từng hoàn thành một đơn trước đó (do vòng lặp quét đơn bị chặn bởi trạng thái `COMPLETED`).
- **Frontend Tasker:** `giupviec/trangchutasker.html` — Tối ưu hoá luồng tải dữ liệu (sử dụng cờ `isFirstLoad` để hạn chế gọi API lịch sử dư thừa) và đẩy nhanh chu kỳ quét đơn (Polling Interval) từ 15 giây xuống 3 giây, giúp việc bắt đơn (có/không bật Auto-Accept) trở nên cực kỳ nhạy bén theo thời gian thực.
- **Backend & Frontend:** Đồng bộ chuẩn hoá cấu trúc Mã đơn hàng (Order Code). Thay vì sinh ra mã chung chung (`ORD123456`) và hiển thị ID nội bộ lên giao diện (`#12`), Backend hiện tại sẽ tạo mã định danh mang nhiều thông tin hơn theo dạng `[PREFIX][DDMMYY]-[4 SỐ]` (ví dụ: `DN190526-1234` cho Dọn nhà, `TT...` cho Trông trẻ). Toàn bộ giao diện người dùng (Lịch sử, Thông báo, Chi tiết đơn) đã được quét và đồng bộ để hiển thị duy nhất mã mới này, khắc phục triệt để tình trạng một đơn hàng hiển thị nhiều mã khác nhau gây bối rối.

---

## [1.1.2] - 2026-05-19

### 🐛 Bug fixes (Platform Stabilization & Bug Fixes Phase)

#### Fixed
1. **Dịch vụ sai ID (backend/src/auth/auth.service.ts, khachhang/datdichvudonnha.html)** - Sửa logic gán nhầm service_id khi Tasker đăng ký ("Trông trẻ" bị gán vào ID 2 thay vì 4, "Mua hộ" bị gán ID 4 thay vì 7) và sửa Dọn tổng vệ sinh truyền ID 9 thay vì ID 1.
2. **Crash danh sách Tasker (backend/src/api/api.service.ts)** - Sửa câu lệnh raw SQL `ST_X` truy vấn bằng `tasker_id` thay vì `user_id`.
3. **Lỗi Upload CCCD (backend/src/main.ts)** - Tăng giới hạn `body-parser` từ 2MB lên 20MB để hỗ trợ xử lý file Base64 khi upload ảnh CCCD kích thước lớn từ điện thoại di động.
4. **Chat CSKH 10 ký tự (shared/chatadmin.html)** - Xóa đoạn mã validation cứng yêu cầu tin nhắn chat phải >= 10 ký tự. Đã trỏ đúng thư mục Nginx.
5. **Thứ tự dịch vụ (backend/src/api/api.service.ts)** - Áp dụng `orderBy: { service_id: 'asc' }` vào truy vấn lấy danh sách dịch vụ.
6. **Lỗi 500 Đặt đơn (backend/src/auth/jwt.strategy.ts)** - Sửa lỗi server sập khi token JWT cũ gửi request lên bằng cách Validate trực tiếp trong Database, trả về lỗi 401.
7. **Nạp tiền Tasker (giupviec/naptienqr.html)** - Tạo riêng trang nạp tiền cho Tasker thay vì dùng chung link trang Khách hàng.

---

## [1.5.4] — 2026-05-19

### ✨ New Features — Admin Tasker Advanced Status & GPS Tracking

#### Added
- **Backend:** `api.service.ts` — Nâng cấp API `getAdminUsers()` để query thêm thông tin từ bảng `orders`. Xác định các trạng thái: `ACCEPTED`, `TASKER_ARRIVED`, `IN_PROGRESS`. Đồng thời thêm Raw SQL query (`ST_X`, `ST_Y`) để lấy trực tiếp toạ độ GPS (`lat`, `lng`) từ trường `current_location`.
- **Admin Panel:** `admin/quanlytasker.html` — Thay thế hàm `getKycStatus` bằng `getDetailedStatus` để hiển thị 7 trạng thái chi tiết dựa trên tình trạng duyệt hồ sơ, trạng thái Online/Offline, và trạng thái nhận đơn thực tế của Tasker (ví dụ: *Đang di chuyển, Đã đến nơi, Đang làm việc, Đang rảnh*).
- **Admin Panel:** `admin/quanlytasker.html` — Bổ sung link Google Maps "📍 Vị trí GPS" dưới thông tin Khu vực nếu Tasker đang Online và có truyền toạ độ về server, giúp Admin giám sát lộ trình thực tế.

### 🐛 Bug fixes — Admin Tasker Database Loading

#### Fixed
- **Admin Panel:** `admin/quanlytasker.html` — Sửa lỗi cú pháp JavaScript (thiếu `return {`) trong hàm map danh sách `allTaskers` khiến dữ liệu danh sách Tasker bị treo ở trạng thái "Đang tải dữ liệu...".
- **Admin Panel:** `admin/quanlytasker.html` — Khắc phục thêm lỗi `SyntaxError: Invalid regular expression` ở script `CHIOI-JS-INJECT` (do regex `bg-w+-d+/d+s*text-w+-d+/g` thiếu escape backslash) khiến các chức năng lọc và load DOM script bị vô hiệu hóa.
- **Deployment:** Khắc phục lỗi sai đường dẫn upload trong phiên bản trước. File đã được copy tới toàn bộ các thư mục mà Nginx có thể map trên VPS (`/var/www/chioi.vn/admin`, `/var/www/chioi/admin`, `/var/www/app.chioi.vn/admin`, `/opt/chioi/admin`).

---

## [1.5.3] — 2026-05-18

### ✨ New Features — Admin Tasker KYC Detail Modal

#### Added
- **Backend:** `auth.service.ts` và `register.dto.ts` — Thêm `id_front_base64` vào API đăng ký `/api/auth/register` để lưu ảnh giấy tờ tuỳ thân dưới dạng JSON trong cột `bio` của bảng `taskers`, giúp bypass giới hạn lưu file.
- **Admin Panel:** `admin/quanlytasker.html` — Thêm nút "Chi tiết" ở danh sách Tasker và danh sách Chờ Duyệt. Triển khai Tasker Detail Modal để hiển thị thông tin chi tiết và hiển thị ảnh CCCD Mặt trước (từ `bio`) để Admin xác minh tính hợp lệ.
- **Frontend Customer:** `khachhang/trangchu.html` — Ẩn mã số CCCD của Tasker khỏi thông tin `bio` trên trang chủ nhằm đảm bảo quyền riêng tư.
- **Frontend Tasker:** `giupviec/dangkytasker.html` — Truyền chuỗi `cccdBase64` vào trường `id_front_base64` khi gọi API `/api/auth/register`.
- **Admin Panel UI:** Bắt buộc duy trì giao diện dạng Desktop (thêm `min-w-[1280px] overflow-x-auto`) cho toàn bộ các trang Admin để chống vỡ layout trên màn hình nhỏ.
- **Admin Panel Data:** Sửa lỗi thiếu data `bio` khi lấy danh sách Taskers từ API (`admin.controller.ts`), giúp hiển thị chính xác ảnh CCCD trong Modal chi tiết; Khôi phục toàn vẹn dữ liệu UTF-8 tiếng Việt do lỗi mã hóa trước đó.

---

## [1.5.2] — 2026-05-18

### 🐛 Bug fixes — Tasker App (CCCD Registration Validation)

#### Fixed
- **Frontend:** `giupviec/dangkytasker.html` — Cập nhật logic upload và nhận diện CCCD (Lỗi 6 FIX). Khi API OCR trả về kết quả giả lập (mock data) nhưng không có nội dung trích xuất (`full_name` và `cccd_number` rỗng) nhưng ảnh được coi là hợp lệ (`is_valid_cccd: true`), hệ thống sẽ mở khóa các ô nhập liệu cho phép người dùng tự điền thông tin thay vì báo lỗi bắt chụp lại. Đồng thời, hàm `showOCRFailed` được nâng cấp để chấp nhận hiển thị các thông báo lỗi tuỳ biến từ backend thay vì thông báo cứng nhắc.

---

## [1.5.1] — 2026-05-17

### 🐛 Bug fixes — Tasker App (GPS Permission)

#### Fixed
- **Frontend:** `giupviec/trangchutasker.html` — Yêu cầu quyền truy cập GPS/Vị trí ngay khi Tasker BẬT trạng thái hoạt động, thay vì đợi đến lúc nhận đơn mới báo lỗi.

---

## [1.5.0] — 2026-05-17

### 💰 UC-KH-19 — Rút tiền từ ví Khách hàng (9 Test Cases)

#### Added
- **Frontend:** Tạo mới `khachhang/ruttien.html` — Trang rút tiền đầy đủ UI/UX
  - Form nhập số tiền + preset amounts (100k/200k/500k/1tr)
  - Dropdown 15 ngân hàng Việt Nam
  - Form nhập STK + tên chủ TK
  - Panel xác nhận hiển thị thông tin trước khi gửi
  - Validation đầy đủ client-side + server-side

#### Changed
- **Frontend:** `khachhang/vivalichsu.html` — Nút "Rút tiền" redirect sang `ruttien.html` (trước đây chỉ hiện toast)
- **Frontend:** `khachhang/vivalichsu.html` — Thêm filter chip "Rút tiền" (WITHDRAW) trong lịch sử giao dịch

#### Test Cases Covered
| TC | Mô tả | Priority |
|----|-------|----------|
| TC-KH19-001 | Rút tiền thành công | High |
| TC-KH19-002 | Validate trống số tiền | High |
| TC-KH19-003 | Rút vượt số dư | High |
| TC-KH19-004 | Nhập số tiền không hợp lệ (chữ/âm) | Medium |
| TC-KH19-005 | Chọn tài khoản ngân hàng nhận | Medium |
| TC-KH19-006 | Chưa chọn ngân hàng → validate | High |
| TC-KH19-007 | Cập nhật số dư sau rút | High |
| TC-KH19-008 | Lịch sử giao dịch ghi nhận rút tiền | Medium |
| TC-KH19-009 | Xử lý lỗi mất mạng | Medium |

#### Files ảnh hưởng
- `frontend/khachhang/ruttien.html` (MỚI)
- `frontend/khachhang/vivalichsu.html` (SỬA)

---

## [1.3.1] — 2026-05-15

### 🔒 Tiêu chuẩn hóa chính sách bảo mật mật khẩu

#### Changed
- **Backend:** Cập nhật DTOs (`register.dto.ts`, `change-password.dto.ts`, `reset-password.dto.ts`) yêu cầu mật khẩu tối thiểu 8 ký tự, bao gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.
- **Frontend:** Đồng bộ xác thực Regex mật khẩu trên toàn bộ các form đăng ký, đặt lại mật khẩu và đổi mật khẩu cho cả Khách hàng, Tasker và Admin (`dangky.html`, `dangkytasker.html`, `quenmatkhau.html`, `taikhoan.html`, `quanlycudan.html`).
- **UI:** Cập nhật đồng bộ các thông báo lỗi và placeholder input để phản ánh chính xác yêu cầu bảo mật mới.

---

## [1.4.0] — 2026-05-15

### 📊 UC_12 — Thu nhập & Thống kê Tasker

#### Added
- **Backend:** Endpoint `GET /api/taskers/stats?period=today|week|month` — trả về tổng thu nhập, phí 15%, đánh giá TB, tỷ lệ nhận đơn, % so sánh kỳ trước, biểu đồ theo ngày.
- **Frontend:** Rewrite toàn bộ `thunhapvathongke.html` — 25 test cases UC_12.

#### Fixed (25 Test Cases)
- **TC-T12-001:** Mở màn hình Thu nhập thành công
- **TC-T12-002:** Tổng thu nhập tính đúng từ `tasker_earnings`
- **TC-T12-003:** % so sánh kỳ trước (▲/▼)
- **TC-T12-004/005:** Biểu đồ thu nhập theo ngày (T2–CN) từ API
- **TC-T12-006:** Số đơn hoàn thành chính xác
- **TC-T12-007:** Đánh giá TB từ `reviews` table
- **TC-T12-008:** Tỷ lệ nhận đơn = COMPLETED/(COMPLETED+CANCELLED)
- **TC-T12-009:** Phí nền tảng 15% hiển thị riêng
- **TC-T12-010/011/012/013:** Filter chips Hôm nay/Tuần này/Tháng + chuyển đổi liên tục
- **TC-T12-014/015:** Empty state + hiển thị 0 khi chưa có dữ liệu
- **TC-T12-016:** Nút Refresh làm mới dữ liệu
- **TC-T12-017/018:** Loading skeleton + Error state khi mất mạng/timeout
- **TC-T12-019:** Auth guard redirect login
- **TC-T12-021:** Format tiền tệ VND
- **TC-T12-022:** Loading skeleton animation
- **TC-T12-024/025:** Nút rút tiền + disable khi số dư = 0

### 💰 UC_13 — Yêu cầu rút tiền Tasker (25 TCs)

#### Added
- **Backend:** Cập nhật `WithdrawDto` thêm `bank_name`, `account_number`, `account_holder` + min 100k.
- **Frontend:** Withdraw Modal đầy đủ form (chọn ngân hàng, STK, tên chủ TK, số tiền).

#### Fixed
- **TC-T13-001~003:** Submit rút tiền thành công + thông báo + disable khi balance=0
- **TC-T13-004~007:** Validation: số tiền > balance, =0, âm, trống
- **TC-T13-008~010:** Dropdown 15 ngân hàng + validate chưa chọn
- **TC-T13-011/012:** Chống spam/double click bằng `isSubmitting` flag
- **TC-T13-013/014:** Error handling khi mất mạng/timeout
- **TC-T13-016:** Đồng bộ số dư sau khi tạo request (auto reload)
- **TC-T13-018:** Hiển thị danh sách yêu cầu "Chờ duyệt"
- **TC-T13-021:** Loading state khi gửi request
- **TC-T13-024/025:** Format tiền VND + chỉ cho nhập số

---

## [1.3.0] — 2026-05-13

### 🚨 Phase 5 — Recovery + bug fixes mới

#### Bối cảnh
Sau khi PR #1 (backend hardening) merge vào main, PR #2 (`testvps1` — chat realtime + WebRTC voice calls) merge SAU đó với conflict resolution **vô tình ghi đè toàn bộ Phase 1 hardening**:
- 15 DTOs files bị xóa
- SMS/KYC/Payment integrations bị xóa
- `common/throttler.config.ts` bị xóa
- `ValidationPipe` + `ThrottlerModule` bị revert khỏi main.ts/app.module.ts
- Controllers re-revert về `body: any` (mất DTO + @Throttle)
- 3 FE booking files revert `notes` → `note` (mismatch DTO)
- Build output `backend/dist/` (76 files) bị commit nhầm

#### Restored từ commit f3ea490 (Phase 4)
- `backend/src/auth/dto/`, `orders/dto/`, `wallets/dto/`, `api/dto/` (15 DTOs)
- `backend/src/integrations/sms/`, `integrations/kyc/`, `integrations/payments/` (17 file scaffolding + READMEs)
- `backend/src/common/throttler.config.ts`
- `backend/.env.example`
- `backend/prisma/migrations/manual_20260513_add_tasker_address.sql`
- 4 controllers + 3 services (api/orders/wallets) + schema.prisma
- npm install lại `@nestjs/throttler`, `class-validator`, `class-transformer`

#### Re-applied + integrated
- `main.ts` — re-add global `ValidationPipe` (whitelist + forbidNonWhitelisted)
- `app.module.ts` — re-add `ThrottlerModule` + `APP_GUARD` + 3 integration modules
- `api.controller.ts` — kept new endpoint `GET /api/users/profile` (từ PR #2) + restored DTO + throttler trên các endpoint khác
- `api.service.ts` — kept new method `getUserProfile()` + Phase 4 logic save tasker.address

#### Fixed regression (3 file FE)
- `datdichvudonnha.html` — `note` → `notes` (line 466)
- `datdichvumuaho.html` — `note` → `notes` (line 419)
- `datdichvutrongtre.html` — `note` → `notes` + Bug 12.3 + Bug 13.1 (xem dưới)

#### Fixed bugs mới (verify từ 11 reports + báo cáo chat)
**11/15 bugs đã fix sẵn trong PR #2** (chat realtime: Number() sender_id, client.broadcast room, cancel skip orders, login role check, …)

**4 bug fix mới trong session này:**
1. **Bug 12.3** (`datdichvutrongtre.html`) — Spam click submit → multiple orders. Thêm `isSubmitting` flag + disable button + reset on error.
2. **Bug 13.1** (`datdichvutrongtre.html`) — Hardcode address `'Địa chỉ từ ứng dụng'` → fetch từ `GET /api/users/profile.address`.
3. **Bug 12.1** (route drawing tasker → khách hàng):
   - BE `orders.service.ts` `bookOrder` — RETURN thêm `latitude`/`longitude`
   - BE `orders.service.ts` `acceptOrder` — raw SQL `ST_X/ST_Y` để extract lat/lng từ geometry, trả về cùng response
   - FE `trangchutasker.html` — thêm `drawRouteToCustomer(lat, lng)` dùng OSRM `https://router.project-osrm.org/route/v1/driving`, render polyline cam + customer marker, fallback vẽ đường thẳng dashed nếu OSRM fail. Wire vào `showActiveOrderCard`. Clear route khi `COMPLETED`.

#### Git hygiene
- Restored `backend/.gitignore` đầy đủ (dist, coverage, .env*, IDE folders)
- `git rm -r --cached backend/dist` — xóa 76 build output files khỏi tracking

#### Deferred (cần thiết kế lớn hơn, tracking trong issue riêng)

**Bug Chat-C + Chat-D — Upload ảnh chat**
- *Hiện tại:* Ảnh chỉ preview client (FileReader.readAsDataURL), gửi text `'[Hình ảnh]'` qua socket. Reload mất ảnh, người nhận thấy text/icon thay vì ảnh thật.
- *Cần:*
  1. Add multer dependency + multipart endpoint `POST /api/orders/chat/:orderId/upload-image`
  2. Storage strategy: local `backend/uploads/chat/` (đơn giản) hoặc S3/Cloudinary (production)
  3. Schema migration: thêm column `message_type` (TEXT|IMAGE) vào `messages` HOẶC convention nếu `content` bắt đầu bằng `/uploads/` → render ảnh
  4. FE: sửa `imagePicker.change` để POST FormData → nhận URL → emit `send_message` với content URL
  5. FE: sửa `appendImageMessage` thêm nhánh `else` (isMine=false) render ảnh từ URL
  6. Static serve `/uploads/chat/*` qua Nest

**Bug 14.4 — Cancel pending notifications khi tasker offline (BE edge case)**
- *Hiện tại:* `findNearbyTaskers` đã filter `is_online=true` (FIXED). FE chặn modal khi `!toggleInput.checked` (FIXED). Nhưng nếu tasker offline GIỮA chừng broadcast, gateway vẫn gửi event.
- *Cần:* Track `Map<orderId, taskerIds[]>` trong gateway, listen tasker disconnect/offline → pull pending notifications. Priority thấp vì FE đã chặn đủ.

#### Verification & Build
- `npm run build` — PASS sau cùng
- 11/15 bugs mới đã fix sẵn (verify report Phase 5 trong sub-agent log)
- 4 bug fix mới: 12.3, 13.1, 12.1, regression note→notes

---

## [1.1.0] — 2026-05-12

### 🐛 Bug fixes (reportloi3.txt — 6 lỗi)

#### Fixed
1. **Nạp tiền (naptienqr.html)** — Xóa hardcode 500.000đ, thêm 6 preset (50k→2tr), cho nhập tùy ý, hiển thị số dư mới sau nạp
2. **Chỉnh sửa hồ sơ (api.controller.ts, api.service.ts)** — Thêm endpoint `PUT /api/users/profile` với input validation
3. **Gói gia đình (goigiadinh.html)** — Sửa URL sai `/api/wallet/balance` → `/api/wallets/balance`
4. **Tài khoản (taikhoan.html)** — Thay `<select>` giới tính bằng radio button group mobile-friendly
5. **Đổi mật khẩu (auth.controller.ts, auth.service.ts)** — Thêm endpoint `POST /api/auth/change-password` với bcrypt verify + JWT guard
6. **Chat (chatvoitasker.html)** — Thêm CSS `.message-gradient`, fix chữ trắng nền trắng. Thêm handler chụp ảnh + up ảnh (file input + camera capture)

#### Files ảnh hưởng
- `Khachhang/naptienqr.html`
- `Khachhang/goigiadinh.html`
- `Khachhang/taikhoan.html`
- `Khachhang/chatvoitasker.html`
- `chioi-backend/src/api/api.controller.ts`
- `chioi-backend/src/api/api.service.ts`
- `chioi-backend/src/auth/auth.controller.ts`
- `chioi-backend/src/auth/auth.service.ts`

---

## [1.0.0] — 2026-05-12

### 🎉 Release đầu tiên — Thiết lập Technical Design

#### Added — Tài liệu kỹ thuật
- `docs/ARCHITECTURE.md` — Kiến trúc tổng thể, tech stack, sơ đồ hệ thống
- `docs/DATABASE.md` — 14 bảng database, ERD, quy tắc migration
- `docs/API_CONTRACTS.md` — 30+ API endpoints, request/response mẫu, WebSocket events
- `docs/CRITICAL_PATHS.md` — 7 luồng nghiệp vụ quan trọng, protected files
- `docs/SECURITY.md` — Quy tắc bảo mật, RBAC matrix, production checklist
- `docs/DEPLOY.md` — Hướng dẫn deploy local + VPS + Nginx
- `docs/CHANGELOG.md` — File này
- `RULES.md` — Quy tắc AI Agent bắt buộc

#### Fixed — Bug fixes (reportloi2.txt — 10 lỗi)
1. **Trang chủ** — Sửa API endpoint ví từ `/api/wallets/balance` → `/api/wallet/balance`
2. **Trang chủ** — Xóa nút "Xem tất cả" thừa
3. **Mua hộ** — Thay `prompt()` bằng inline input row + nút +/-
4. **Tài khoản** — Thêm trường Giới tính, Email, Địa chỉ vào modal chỉnh sửa hồ sơ
5. **Gói gia đình** — Sửa thanh tổng cộng từ `fixed` → `static` để không đè điều khoản
6. **Tài khoản** — Thêm form đổi mật khẩu (3 input + validation) + đăng xuất tất cả thiết bị
7. **Hoạt động** — Filter chips + Date range picker hoạt động thực tế
8. **Hoạt động** — Map service name → icon tự động từ dữ liệu API
9. **Hoạt động** — Modal chi tiết đơn hàng đầy đủ thông tin
10. **Thông báo** — Rebuild từ dữ liệu API thật, filter tabs hoạt động, xóa duplicate

#### Fixed — Bug fixes (reportloi.txt — 15 lỗi trước đó)
- Đã fix toàn bộ 15 lỗi UI/UX từ bộ report đầu tiên

#### Infrastructure
- Backend NestJS đã chạy ổn định (Port 3000)
- PostgreSQL 16 + PostGIS đã cấu hình
- Socket.IO real-time đã tích hợp cho Orders
- Swagger API docs tại `/api/docs`

---

## Quy ước ghi Changelog

- **Added** — Tính năng mới
- **Changed** — Thay đổi tính năng hiện có
- **Deprecated** — Tính năng sẽ bị loại bỏ
- **Removed** — Tính năng đã loại bỏ
- **Fixed** — Sửa lỗi
- **Security** — Cập nhật bảo mật

> Format: `[VERSION] — YYYY-MM-DD`  
> Mỗi entry phải có: **Ai thay đổi** (nếu có), **File bị ảnh hưởng**, **Lý do**
- **Frontend & Backend:** T?m ?n to�n b? giao di?n v� logic c?a t�nh nang G�i Gia ��nh (Family Package). �� ?n banner khuy?n m�i, n�t mua g�i, menu trong t�i kho?n, ph?n hi?n th? uu d�i tr�n c�c m�n h�nh d?t d?ch v?, cung nhu v� hi?u ho� logic t�nh to�n gi?m gi� 15% t?i backend (orders.service.ts).
-   * * F r o n t e n d : * *   F i x   L �i   4   t �  A p p l e   ( G i a o   d i �n   k h � n g   t �i   �u   t r � n   i P a d ) .   � p   d �n g   C S S   G r i d / T a i l w i n d   r e s p o n s i v e   ( c h i a   c �t )   c h o   c � c   m � n   h � n h   �t   d �c h   v �,   t �i   �u   k � c h   t h ��c   B o t t o m   N a v   v �   m �  r �n g   c o n t a i n e r   t �  m a x - w - m d   s a n g   m d : m a x - w - 4 x l .  
 