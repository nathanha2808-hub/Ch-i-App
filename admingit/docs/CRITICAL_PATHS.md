# CRITICAL_PATHS.md — Luồng nghiệp vụ quan trọng Chị Ơi!

> Phiên bản: 1.0 · Cập nhật: 2026-05-12  
> ⚠️ Các luồng trong file này KHÔNG ĐƯỢC PHÁ VỠ. Đọc kỹ trước khi sửa code backend.

---

## 🔴 PROTECTED FILES — KHÔNG ĐƯỢC SỬA khi chưa có approval

| File | Lý do |
|------|-------|
| `chioi-backend/src/auth/auth.service.ts` | Luồng xác thực — sai = toàn bộ user không login được |
| `chioi-backend/src/auth/jwt.strategy.ts` | JWT validation — sai = mất bảo mật |
| `chioi-backend/src/auth/jwt-auth.guard.ts` | Auth guard — sai = API mở toang |
| `chioi-backend/src/auth/roles.guard.ts` | RBAC — sai = phân quyền hỏng |
| `chioi-backend/prisma/schema.prisma` | Database schema — sai = mất dữ liệu |
| `chioi-backend/.env` | Credentials — KHÔNG commit lên Git |
| `shared/api.js` | Shared client — sai = 3 frontend hỏng cùng lúc |

---

## Luồng 1: 🔐 Đăng nhập & Xác thực (CRITICAL)

**UC:** UC-KH-01, UC-T-01  
**Mức rủi ro:** 🔴 CAO — Hỏng = toàn bộ hệ thống không truy cập được

### Flow
```
1. Client gọi POST /api/auth/login { phone, password }
2. AuthService.validateUser() → tìm user theo phone
3. bcrypt.compare(password, user.password_hash)
4. Nếu đúng → JwtService.sign({ phone, sub: user_id, role })
5. Trả về { access_token, user }
6. Client lưu vào localStorage (ChiOiAuth.saveLogin)
7. Mọi request sau đều gắn header Authorization: Bearer <token>
```

### Files liên quan
| File | Vai trò |
|------|---------|
| `auth/auth.controller.ts` | Nhận request login/register |
| `auth/auth.service.ts` | Logic validate + JWT sign |
| `auth/jwt.strategy.ts` | Decode token trong mỗi request |
| `auth/jwt-auth.guard.ts` | Guard kiểm tra token hợp lệ |
| `auth/roles.guard.ts` | Guard kiểm tra role phù hợp |
| `shared/api.js` → `ChiOiAuth` | Client-side token management |

### Quy tắc
- ❌ KHÔNG thay đổi cấu trúc JWT payload (`phone`, `sub`, `role`)
- ❌ KHÔNG thay đổi tên localStorage keys (`chioi_token`, `chioi_user`)
- ❌ KHÔNG xóa auto-logout khi nhận 401

---

## Luồng 2: 📋 Đặt đơn & Matching Tasker (CRITICAL)

**UC:** UC-KH-07, UC-KH-08, UC-KH-09, UC-T-05, UC-T-06  
**Mức rủi ro:** 🔴 CAO — Core business, ảnh hưởng doanh thu trực tiếp

### Flow
```
1. Customer gọi POST /api/orders/book
2. OrdersService.bookOrder():
   a. Tạo order_code unique
   b. Tính tasker_earnings (85%) và platform_fee (15%)
   c. Insert vào bảng orders (status = SEARCHING)
   d. Insert vào order_status_history
3. OrdersService.findNearbyTaskers():
   a. Query PostGIS: Tasker online + gần nhất
   b. Filter tasker có dịch vụ phù hợp
4. OrdersGateway.notifyTaskersNewOrder():
   a. Emit 'new_order_available' tới từng Tasker qua Socket
5. Tasker nhận thông báo → PATCH /api/orders/:id/accept
6. OrdersService.acceptOrder():
   a. Kiểm tra status = SEARCHING
   b. Update tasker_id, status = ACCEPTED
7. OrdersGateway.notifyCustomerOrderAccepted():
   a. Emit 'order_accepted' tới Customer
```

### Files liên quan
| File | Vai trò |
|------|---------|
| `orders/orders.controller.ts` | REST endpoints |
| `orders/orders.service.ts` | Business logic đặt/nhận/cập nhật |
| `orders/orders.gateway.ts` | WebSocket notifications |

### Quy tắc
- ❌ KHÔNG thay đổi công thức tính phí (85/15)
- ❌ KHÔNG bỏ bước ghi `order_status_history`
- ❌ KHÔNG cho phép accept đơn có status ≠ SEARCHING
- ✅ PHẢI emit socket event khi status thay đổi

---

## Luồng 3: 💰 Ví & Giao dịch (CRITICAL)

**UC:** UC-KH-17, UC-KH-18, UC-KH-19, UC-T-12, UC-T-13  
**Mức rủi ro:** 🔴 CAO — Liên quan tiền thật

### Flow Nạp tiền
```
1. Customer gọi POST /api/wallets/deposit { amount }
2. WalletsService.deposit():
   a. Tìm wallet theo user_id (tạo mới nếu chưa có)
   b. Tạo transaction (type: DEPOSIT, status: COMPLETED)
   c. Update wallet.balance += amount
   d. Trả về wallet mới
```

### Flow Rút tiền
```
1. User gọi POST /api/wallets/withdraw { amount }
2. WalletsService.withdraw():
   a. Kiểm tra balance >= amount
   b. Tạo transaction (type: WITHDRAW, status: PENDING)
   c. Trừ balance ngay
   d. Admin duyệt → status = COMPLETED
   e. Admin từ chối → hoàn balance, status = CANCELLED
```

### Files liên quan
| File | Vai trò |
|------|---------|
| `wallets/wallets.controller.ts` | REST endpoints |
| `wallets/wallets.service.ts` | Logic nạp/rút/kiểm tra |

### Quy tắc
- ❌ KHÔNG cho phép balance âm
- ❌ KHÔNG cho rút khi `amount > balance`
- ❌ KHÔNG thay đổi transaction status flow (PENDING → COMPLETED/CANCELLED)
- ✅ PHẢI tạo transaction record cho MỌI thay đổi balance

---

## Luồng 4: 📊 Cập nhật trạng thái đơn Real-time (IMPORTANT)

**UC:** UC-KH-10, UC-T-08, UC-T-09  
**Mức rủi ro:** 🟡 TRUNG BÌNH

### Flow
```
1. Tasker gọi PATCH /api/orders/:id/status { status }
2. OrdersService.updateOrderStatus():
   a. Validate status transition hợp lệ
   b. Update orders.status
   c. Insert order_status_history
   d. Nếu COMPLETED → tính tiền Tasker + cập nhật total_jobs
3. OrdersGateway.notifyCustomerOrderStatus():
   a. Emit 'order_status_updated' tới Customer
4. Customer page auto-refresh / nhận socket event
```

### Status Transition Matrix
```
PENDING     → SEARCHING, CANCELLED
SEARCHING   → ACCEPTED, CANCELLED
ACCEPTED    → TASKER_ARRIVED, CANCELLED
TASKER_ARRIVED → IN_PROGRESS
IN_PROGRESS → COMPLETED
```

- ❌ KHÔNG cho phép transition ngược (COMPLETED → IN_PROGRESS)
- ❌ KHÔNG cho phép hủy khi IN_PROGRESS hoặc COMPLETED

---

## Luồng 5: 💬 Chat giữa Customer & Tasker (IMPORTANT)

**UC:** UC-KH-11, UC-T-11  
**Mức rủi ro:** 🟡 TRUNG BÌNH

### Flow
```
1. Client emit 'send_message' qua Socket { order_id, receiver_id, content }
2. OrdersGateway.handleMessage():
   a. Insert vào bảng messages
   b. Emit 'new_message' tới receiver
3. Lấy lịch sử: GET /api/orders/chat/:orderId
```

### Quy tắc
- ✅ Chat chỉ hoạt động trong context của 1 order
- ✅ Lưu toàn bộ chat vào DB (không chỉ in-memory)
- ❌ KHÔNG cho phép chat khi đơn đã COMPLETED/CANCELLED quá 24h

---

## Luồng 6: ⭐ Đánh giá Tasker (IMPORTANT)

**UC:** UC-KH-16  
**Mức rủi ro:** 🟢 THẤP

### Flow
```
1. Customer gọi POST /api/orders/:id/review { rating, comment }
2. OrdersService.reviewOrder():
   a. Kiểm tra đơn status = COMPLETED
   b. Kiểm tra chưa có review cho đơn này (UNIQUE constraint)
   c. Insert review
   d. Recalculate taskers.average_rating
   e. Increment taskers.total_jobs (nếu chưa tính)
```

### Quy tắc
- ❌ KHÔNG cho review đơn chưa COMPLETED
- ❌ KHÔNG cho review 2 lần cùng 1 đơn
- ✅ Rating ≤ 2 sao → tự động tạo support_ticket cho Admin review

---

## Luồng 7: 🛡️ Admin Can thiệp (IMPORTANT)

**UC:** UC-AD-03, UC-AD-04, UC-AD-06, UC-AD-07  
**Mức rủi ro:** 🟡 TRUNG BÌNH

### Flow
```
1. Admin duyệt KYC: PATCH /api/admin/taskers/:id/approve { status }
   → Update taskers.kyc_status
   → Ghi admin_audit_logs

2. Admin hủy đơn: PATCH /api/admin/orders/:id/cancel
   → Update orders.status = CANCELLED
   → Ghi order_interventions
   → Ghi admin_audit_logs

3. Admin duyệt rút tiền: PATCH /api/admin/withdrawals/:id/approve { status }
   → Update transaction status
   → Ghi admin_audit_logs
```

### Quy tắc
- ✅ MỌI hành động Admin phải ghi `admin_audit_logs`
- ❌ KHÔNG cho Admin xóa dữ liệu vĩnh viễn — chỉ soft-delete
