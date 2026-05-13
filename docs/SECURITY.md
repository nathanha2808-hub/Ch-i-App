# SECURITY.md — Quy tắc Bảo mật Chị Ơi!

> Phiên bản: 1.0 · Cập nhật: 2026-05-12  
> ⚠️ File này là BẮT BUỘC đọc trước khi phát triển bất kỳ tính năng liên quan xác thực, thanh toán, hoặc dữ liệu người dùng.

---

## 1. 🔐 Xác thực & Phân quyền (Authentication & Authorization)

### 1.1 JWT Token
| Quy tắc | Chi tiết |
|---------|---------|
| Thuật toán | HS256 |
| Secret | Từ `process.env.JWT_SECRET` — **KHÔNG hardcode** |
| Payload | `{ phone, sub: user_id, role }` |
| Thời hạn | Mặc định 7 ngày (cần giảm xuống 24h cho production) |
| Lưu trữ client | `localStorage` — cân nhắc chuyển `httpOnly cookie` cho production |

### 1.2 Phân quyền RBAC

| Endpoint | CUSTOMER | TASKER | ADMIN |
|----------|----------|--------|-------|
| `/api/orders/book` | ✅ | ❌ | ❌ |
| `/api/orders/:id/accept` | ❌ | ✅ | ❌ |
| `/api/orders/:id/status` | ❌ | ✅ | ❌ |
| `/api/orders/:id/cancel` | ✅ | ❌ | ❌ |
| `/api/wallets/*` | ✅ | ✅ | ✅ |
| `/api/admin/*` | ❌ | ❌ | ✅ |
| `/api/taskers/kyc` | ❌ | ✅ | ❌ |
| `/api/services` (GET) | ✅ | ❌ | ✅ |
| `/api/services` (POST/PUT/DELETE) | ❌ | ❌ | ✅ |

### 1.3 Quy tắc mật khẩu
- Hash bằng `bcrypt` với `saltRounds = 10`
- Mật khẩu tối thiểu 6 ký tự (frontend validation)
- **KHÔNG BAO GIỜ** lưu mật khẩu dạng plain text
- **KHÔNG BAO GIỜ** trả về `password_hash` trong response API
- OTP quên mật khẩu: hiện tại MOCK `123456` — **PHẢI** thay thế bằng SMS thật trước production

---

## 2. 🛡️ Bảo vệ API

### 2.1 Middleware & Guards
```
Request → CORS → JwtAuthGuard → RolesGuard → Controller
```

| Guard | File | Chức năng |
|-------|------|-----------|
| `JwtAuthGuard` | `auth/jwt-auth.guard.ts` | Verify JWT token |
| `RolesGuard` | `auth/roles.guard.ts` | Check user role |
| `@Roles()` | `auth/roles.decorator.ts` | Decorator khai báo role |

### 2.2 CORS
- Hiện tại: `app.enableCors()` — cho phép mọi origin
- **Production**: Chỉ cho phép domain cụ thể:
```typescript
app.enableCors({
  origin: ['https://chioi.vn', 'https://admin.chioi.vn'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
});
```

### 2.3 Rate Limiting (CẦN TRIỂN KHAI)
- Login: Max 5 lần/phút/IP
- Register: Max 3 lần/phút/IP
- OTP: Max 3 lần/30 phút/SĐT
- API chung: Max 100 requests/phút/user

---

## 3. 💰 Bảo mật Tài chính

### 3.1 Quy tắc Ví
- **KHÔNG BAO GIỜ** cho phép balance âm
- **PHẢI** kiểm tra `balance >= amount` trước khi rút
- **PHẢI** tạo transaction record cho MỌI thay đổi balance
- **PHẢI** dùng database transaction cho thao tác tài chính
- Rút tiền: Cần Admin duyệt (status PENDING → COMPLETED)

### 3.2 Audit Trail
- Mọi hành động Admin → ghi `admin_audit_logs` (action, old_data, new_data, IP)
- Mọi giao dịch ví → ghi `transactions` (type, amount, status)
- Mọi thay đổi đơn hàng → ghi `order_status_history`

---

## 4. 🔒 Bảo vệ Dữ liệu

### 4.1 Dữ liệu nhạy cảm
| Dữ liệu | Xử lý |
|----------|--------|
| Mật khẩu | Bcrypt hash, KHÔNG trả về API |
| SĐT | Hiển thị đầy đủ cho user sở hữu, mask cho người khác |
| Địa chỉ | Chỉ hiển thị cho Customer + Tasker được assign |
| GPS Location | Chỉ dùng server-side cho matching, KHÔNG expose ra API |
| CCCD/KYC | Lưu URL, truy cập cần auth Admin |

### 4.2 Input Validation (CẦN BỔ SUNG)
- **PHẢI** validate input tại controller level
- **KHÔNG** trust bất kỳ input nào từ client
- Cần triển khai DTO + `class-validator` cho NestJS:
```typescript
// Ví dụ:
class CreateOrderDto {
  @IsInt() service_id: number;
  @IsDateString() scheduled_time: string;
  @IsString() @MinLength(5) address: string;
  @IsNumber() @Min(10000) total_price: number;
}
```

### 4.3 SQL Injection
- ✅ Đã dùng Prisma ORM → tự động parameterized queries
- ❌ **KHÔNG BAO GIỜ** dùng `prisma.$queryRaw` với string interpolation
- ❌ **KHÔNG BAO GIỜ** dùng raw SQL queries

---

## 5. 🌐 Bảo mật Frontend

### 5.1 Token Management
| Quy tắc | Hiện tại | Cần cải thiện |
|---------|---------|---------------|
| Lưu token | `localStorage` | `httpOnly cookie` (chống XSS) |
| Auto-logout | Khi nhận 401 | Thêm token refresh mechanism |
| Clear data | `ChiOiAuth.logout()` | Xóa cả sessionStorage, cache |

### 5.2 XSS Prevention
- **KHÔNG** dùng `innerHTML` với dữ liệu từ API chưa sanitize
- **KHÔNG** eval() hoặc Function() với user input
- Dùng `textContent` thay `innerHTML` khi hiển thị text
- Escape HTML entities khi render nội dung chat

### 5.3 CSRF
- Hiện tại dùng JWT Bearer → không cần CSRF token
- Nếu chuyển sang cookie-based auth → **PHẢI** thêm CSRF protection

---

## 6. 🚨 Secrets Management

### 6.1 Danh sách Secrets

| Secret | File | Giá trị hiện tại | Production |
|--------|------|-------------------|------------|
| `DATABASE_URL` | `.env` | `postgresql://postgres:postgres@...` | Đổi password mạnh |
| `JWT_SECRET` | `.env` | `super-secret-key-123` | **PHẢI** đổi thành random 64 chars |
| `PORT` | `.env` | `3000` | Giữ nguyên hoặc đổi |

### 6.2 Quy tắc
- ❌ **KHÔNG BAO GIỜ** commit `.env` lên Git
- ❌ **KHÔNG BAO GIỜ** hardcode secret trong code
- ✅ Dùng environment variables
- ✅ File `.gitignore` đã có `.env`

---

## 7. 📋 Checklist trước Production

- [ ] Đổi `JWT_SECRET` thành random string mạnh (≥ 64 chars)
- [ ] Đổi PostgreSQL password
- [ ] Giảm JWT expiration xuống 24h + implement refresh token
- [ ] Triển khai rate limiting (express-rate-limit hoặc @nestjs/throttler)
- [ ] Triển khai input validation (class-validator + class-transformer)
- [ ] Chuyển token sang httpOnly cookie
- [ ] Cấu hình CORS chỉ cho phép domain production
- [ ] Bật HTTPS (SSL certificate)
- [ ] Triển khai SMS OTP thật (thay mock 123456)
- [ ] Triển khai eKYC thật cho Tasker
- [ ] Thiết lập backup database tự động
- [ ] Thiết lập monitoring + logging (PM2, Sentry)
- [ ] Penetration testing
