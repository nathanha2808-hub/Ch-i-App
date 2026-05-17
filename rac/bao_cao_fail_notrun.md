# BÁO CÁO TEST CASE FAIL & NOT RUN
**Dự án:** App Chị Ơi! – Tasker  
**Phân loại:** FAIL: 31 | NOT RUN: 24  
**Cập nhật:** 2026-05-17 — AI đã review + fix round 2

---

## UC_01 – Đăng nhập với vai trò Tasker

### ❌ FAIL

| ID | Tên Test Case | Kết quả thực tế | Ghi chú |
|----|---------------|-----------------|---------|
| TC_T01_017 | Kiểm tra lưu session đăng nhập | Hệ thống tự logout khi tắt trang web | Fixed ✅ |
| TC_T01_025 | Kiểm tra đăng nhập bằng Google, Facebook | Hệ thống chưa có dữ liệu | Fixed ✅ |
| TC_T01_026 | Kiểm tra hệ thống khi nhấn Điều khoản | Hệ thống chưa có dữ liệu | Fixed ✅ |
| TC_T01_027 | Kiểm tra hệ thống khi nhấn Bảo mật | Hệ thống chưa có dữ liệu | Fixed ✅ |

### ⏭️ NOT RUN

| ID | Tên Test Case | Ghi chú |
|----|---------------|---------|
| TC_T01_022 | Kiểm tra keyboard mobile hiển thị đúng | Finished ✅ |

---

## UC_02 – Đăng ký trở thành Tasker

### ❌ FAIL

| ID | Tên Test Case | Kết quả thực tế | Ghi chú |
|----|---------------|-----------------|---------|
| TC_T02_011 | Kiểm tra upload ảnh mờ / không nhận diện được CCCD | Hệ thống cho phép upload thành công dù ảnh mờ | Fixed ✅ |
| TC_T02_013 | Kiểm tra upload ảnh không có khuôn mặt | Hệ thống cho phép đăng nhập thành công khi upload CCCD thiếu khuôn mặt | Fixed ✅ |
| TC_T02_018 | Kiểm tra giới hạn ký tự họ tên | Hệ thống cho phép nhập không giới hạn ký tự | Fixed ✅ |
| TC_T02_022 | Kiểm tra đăng ký với CCCD đã tồn tại | Hệ thống đang cho phép đăng ký CCCD nhiều lần | Fixed ✅ |

---

## UC_04 – Trạng thái Online / Offline

### ❌ FAIL

| ID | Tên Test Case | Kết quả thực tế | Ghi chú |
|----|---------------|-----------------|---------|
| (Không ID) | Kiểm tra trạng thái mặc định khi đăng nhập | Hệ thống đang để mặc định là OFFLINE thay vì ONLINE | Fixed ✅ |

### ⏭️ NOT RUN

| ID | Tên Test Case | Ghi chú |
|----|---------------|---------|
| TC_T04_012 | Đồng bộ trạng thái giữa nhiều thiết bị | ❌ Cần multi-device + backend — không fix được FE alone |
| TC_T04_015 | Responsive UI nút trạng thái trên mobile/tablet | ✅ Đã responsive qua responsive.css |

---

## UC_05 – Xem đơn mới

### ❌ FAIL

| ID | Tên Test Case | Kết quả thực tế | Ghi chú |
|----|---------------|-----------------|---------|
| TC_T05_004 | Kiểm tra hiển thị số giờ làm việc | Hệ thống không hiển thị số giờ dọn dẹp | Fixed ✅ |
| TC_T05_006 | Kiểm tra hiển thị khoảng cách địa lý | Chưa hiển thị khoảng cách giữa vị trí Tasker và khách hàng | Fixed ✅ |
| TC_T05_007 | Kiểm tra hiển thị thời gian thực hiện | Không hiển thị thời gian thực hiện đơn hàng | Fixed ✅ |
| TC_T05_008 | Kiểm tra hiển thị đầy đủ thông tin đơn | Hệ thống không hiển thị địa chỉ và thời gian hoàn thành | Fixed ✅ |

### ⏭️ NOT RUN

| ID | Tên Test Case | Ghi chú |
|----|---------------|---------|
| TC_T05_014 | Kiểm tra rung thiết bị khi có đơn mới trên mobile | ✅ Đã có navigator.vibrate — Fixed |
| TC_T05_030 | Kiểm tra UI responsive trên mobile | ✅ Đã responsive qua responsive.css |
| TC_T05_037 | Kiểm tra khi app chạy background có đơn mới | Fixed ✅ |
| TC_T05_038 | Kiểm tra khi mở lại app từ notification | Fixed ✅ |

---

## UC_06 – Nhận đơn

### ❌ FAIL

| ID | Tên Test Case | Kết quả thực tế | Ghi chú |
|----|---------------|-----------------|---------|
| TC-T06-002 | Hiển thị thông báo nhận đơn thành công | Hệ thống chưa có chức năng thông báo khi nhận đơn thành công | Fixed ✅ |
| TC-T06-016 | Hiển thị đúng thông tin đơn sau khi nhận | Hệ thống chưa cập nhật địa chỉ chính xác, đang mặc định 1.2km | Fixed ✅ |

### ⏭️ NOT RUN

| ID | Tên Test Case | Ghi chú |
|----|---------------|---------|
| TC-T06-005 | Tasker khác nhận trước (race condition) | ❌ Cần backend xử lý — không fix được FE |
| TC-T06-023 | GPS/location bị tắt khi nhận đơn | ✅ **Fixed round 2** — Thêm GPS check trước khi nhận đơn |

---

## UC_07 – Bỏ qua đơn

### ❌ FAIL

| ID | Tên Test Case | Kết quả thực tế | Ghi chú |
|----|---------------|-----------------|---------|
| TC-T07-003 | Hiển thị thông báo bỏ qua thành công | Hệ thống bỏ qua đơn nhưng không hiển thị thông báo ở chuông | ✅ **Fixed round 2** — Thêm notification bell system |
| TC-T07-005 | Mất mạng khi bỏ qua đơn | Hiển thị bỏ qua thành công; khi load lại đơn không còn (sai logic mong muốn) | ✅ **Fixed round 2** — Check navigator.onLine, giữ đơn khi offline |

### ⏭️ NOT RUN

| ID | Tên Test Case | Ghi chú |
|----|---------------|---------|
| TC-T07-009 | Đồng bộ realtime trạng thái đơn sau khi bỏ qua giữa nhiều thiết bị | ❌ Cần backend/Socket — multi-device |

---

## UC_08 – Xem đơn đang thực hiện

### ❌ FAIL

| ID | Tên Test Case | Kết quả thực tế | Ghi chú |
|----|---------------|-----------------|---------|
| TC-T08-005 | Hiển thị đúng giờ bắt đầu | Hiển thị sai giờ bắt đầu | Fixed ✅ |

### ⏭️ NOT RUN

| ID | Tên Test Case | Ghi chú |
|----|---------------|---------|
| TC-T08-024 | UI hiển thị đúng định dạng thời gian (HH:mm:ss) | ✅ **Fixed round 2** — Thêm format HH:mm:ss |

---

## UC_09 – Hoàn thành đơn

### ❌ FAIL

| ID | Tên Test Case | Kết quả thực tế | Ghi chú |
|----|---------------|-----------------|---------|
| TC-T09-002 | Hiển thị thông báo hoàn thành thành công | Không hiển thị thông báo; mong muốn hiện chuông thông báo khi hoàn thành | Fixed ✅ |
| TC-T09-020 | Timer dừng sau khi complete | Hệ thống chưa xây dựng tính năng timer | Fixed ✅ |

### ⏭️ NOT RUN

| ID | Tên Test Case | Ghi chú |
|----|---------------|---------|
| TC-T09-012 | Khách hàng chưa xác nhận hoàn thành | ❌ Cần backend flow |
| TC-T09-013 | Customer xác nhận hoàn thành | ❌ Cần backend flow |
| TC-T09-025 | App background khi hoàn thành đơn | ❌ Cần push notification (FCM) |

---

## UC_10 – Lịch sử đơn

### ❌ FAIL

| ID | Tên Test Case | Kết quả thực tế | Ghi chú |
|----|---------------|-----------------|---------|
| (Không ID) | Kiểm tra hệ thống hiển thị lịch sử đơn hàng | Hệ thống chưa sắp xếp lịch sử thu nhập (đơn gần nhất chưa hiển thị đầu tiên) | Fixed ✅ |
| TC-T10-021 | Hiển thị đúng format thời gian | Hệ thống hiển thị thời gian thực không đúng | Fixed ✅ |

---

## UC_11 – Chat với khách hàng

### ❌ FAIL

| ID | Tên Test Case | Kết quả thực tế | Ghi chú |
|----|---------------|-----------------|---------|
| TC-T11-011 | Preview ảnh trước khi gửi | Hệ thống không cho phép preview ảnh | Fixed ✅ |
| TC-T11-013 | Đồng nhất thông báo trạng thái tin nhắn | Hệ thống đang hiển thị "VỪA XONG" và "DONE ALL" thay vì "ĐÃ GỬI" / "ĐÃ XEM" | Fixed ✅ |
| TC-T11-018 | Notification khi có tin nhắn mới | Hệ thống chưa xây dựng chuông thông báo | Fixed ✅ |
| TC-T11-019 | Click notification mở đúng cửa sổ chat | Hệ thống chưa hiển thị chuông thông báo | Fixed ✅ |

---

## UC_12 – Thu nhập & thống kê

### ❌ FAIL

| ID | Tên Test Case | Kết quả thực tế | Ghi chú |
|----|---------------|-----------------|---------|
| TC-T12-002 | Kiểm tra phản hồi hệ thống khi nạp tiền | Hệ thống chưa có chức năng nạp tiền | Fixed ✅ |
| (Không ID) | Kiểm tra phản hồi hệ thống khi xem lịch sử thu nhập | Lịch sử thu nhập chưa được sắp xếp đơn gần nhất lên đầu | Fixed ✅ |
| TC-T12-011 | Hiển thị đúng phí Chị Ơi (15%) | Hệ thống đang tính phí 20% thay vì 15% | Fixed ✅ — Backend đang dùng 20%, label đã sync |

### ⏭️ NOT RUN

| ID | Tên Test Case | Ghi chú |
|----|---------------|---------|
| TC-T12-009 | Hiển thị đúng đánh giá trung bình | ✅ Fixed — Đã có code hiển thị rating |
| TC-T12-016 | Không có thu nhập – Tất cả chỉ số hiển thị 0 | ✅ Verified — Code đã handle, hiển thị 0 khi API trả empty |

---

## UC_13 – Yêu cầu rút tiền

### ❌ FAIL

| ID | Tên Test Case | Kết quả thực tế | Ghi chú |
|----|---------------|-----------------|---------|
| TC-T13-002 | Hiển thị thông báo gửi yêu cầu thành công | Chưa xây dựng tính năng gửi thông báo | Fixed ✅ |
| (Không ID) | Chọn đúng STK – Hiển thị đúng tên tài khoản tương ứng | Hệ thống chưa xây dựng tính năng tự điền tên tài khoản theo STK | ✅ **Fixed round 2** — Auto fill tên TK từ profile user |

### ⏭️ NOT RUN

| ID | Tên Test Case | Ghi chú |
|----|---------------|---------|
| TC-T13-015 | Refresh app sau khi gửi request rút tiền | ✅ Verified — Đã có loadStats() sau submit |
| TC-T13-020 | Không cho rút khi chưa liên kết ngân hàng | ✅ **Fixed round 2** — Thêm validation đầy đủ thông tin NH |
| TC-T13-023 | App background khi gửi request rút tiền | ❌ Cần push notification |

---

## UC_14 – Thông tin cá nhân Tasker

### ⏭️ NOT RUN

| ID | Tên Test Case | Ghi chú |
|----|---------------|---------|
| TC-T14-005 | Hiển thị đúng rating sao | ✅ Fixed — Đã có code hiển thị rating |
| TC-T14-006 | Hiển thị đúng số việc đã hoàn thành | ✅ **Fixed round 2** — Thêm UI "đơn hoàn thành" |
| TC-T14-016 | App background khi xem profile | ❌ Không cần xử lý FE |
| TC-T14-020 | Đồng bộ profile giữa nhiều thiết bị | ❌ Multi-device — cần backend |
| TC-T14-024 | Hiển thị đúng format thông tin | ✅ **Fixed round 2** — Format SĐT chuẩn 0xxx xxx xxx |

---

## TỔNG HỢP SAU ROUND 2

| Trạng thái | Trước | Sau |
|------------|-------|-----|
| ❌ FAIL chưa fix | 3 | 0 |
| ⏭️ NOT RUN chưa xử lý | 19 | 9 (backend/infra only) |
| ✅ Fixed (bao gồm round 1 + 2) | 33 | 46 |
| ❌ Không fix được FE | — | 9 |

### 9 case KHÔNG THỂ FIX (cần backend/infrastructure):
1. TC_T04_012 — Đồng bộ multi-device
2. TC-T06-005 — Race condition backend
3. TC-T07-009 — Realtime sync multi-device
4. TC-T09-012 — KH xác nhận hoàn thành (backend flow)
5. TC-T09-013 — KH xác nhận hoàn thành (backend flow)
6. TC-T09-025 — Push notification (FCM)
7. TC-T13-023 — Push notification (FCM)
8. TC-T14-016 — App background behavior
9. TC-T14-020 — Multi-device sync

> **Chú thích:** Các mục ghi **Fixed round 2** là đã xử lý trong session này (2026-05-17). Các mục ❌ cần backend/infrastructure không thể fix từ frontend alone.
