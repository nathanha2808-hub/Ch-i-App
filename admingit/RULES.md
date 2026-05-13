# Project Rules — Chị Ơi!
# Văn bản này là QUY TẮC BẮT BUỘC. AI Agent PHẢI đọc trước khi code.

---

## NGUYÊN TẮC TUYỆT ĐỐI

1. **KHÔNG BAO GIỜ** xoá hoặc viết lại code đang hoạt động mà không hỏi trước
2. **KHÔNG BAO GIỜ** dùng raw SQL — chỉ dùng ORM (Prisma)
3. **KHÔNG BAO GIỜ** skip validation đầu vào ở bất kỳ API nào
4. **KHÔNG BAO GIỜ** hardcode credentials, tokens, secrets
5. **PHẢI** đọc `docs/CRITICAL_PATHS.md` trước khi sửa bất kỳ file backend nào
6. **PHẢI** đọc `docs/DATABASE.md` trước khi thêm/sửa bảng hoặc quan hệ
7. **PHẢI** chạy build test trước khi báo "hoàn thành"

---

## PROTECTED FILES — KHÔNG ĐƯỢC SỬA khi chưa được yêu cầu rõ ràng

```
chioi-backend/src/auth/auth.service.ts       ← Luồng xác thực
chioi-backend/src/auth/jwt.strategy.ts        ← JWT validation
chioi-backend/src/auth/jwt-auth.guard.ts      ← Auth guard
chioi-backend/src/auth/roles.guard.ts         ← RBAC guard
chioi-backend/prisma/schema.prisma            ← Database schema
chioi-backend/.env                            ← Secrets & credentials
shared/api.js                                 ← Shared API client (3 frontend phụ thuộc)
```

> Cập nhật danh sách này khi có thêm file critical.

---

## QUY TẮC KHI CODE

1. Chỉ sửa đúng file và đúng function được yêu cầu
2. **KHÔNG** refactor, rename, hoặc "cải thiện" code khác
3. **KHÔNG** xoá comment hoặc code "không dùng"
4. Nếu thấy code "có vấn đề" → **BÁO** cho user, **KHÔNG** tự sửa
5. Trước khi code: liệt kê file sẽ sửa → chờ xác nhận
6. Giữ nguyên coding style hiện tại (indentation, naming convention)
7. Frontend: MỌI API call phải qua `apiFetch()` từ `shared/api.js`
8. Frontend: MỌI trang cần auth phải gọi `ChiOiAuth.requireAuth()` đầu tiên
9. Backend: MỌI controller phải có `@UseGuards(JwtAuthGuard, RolesGuard)` + `@Roles()`

---

## CẤU TRÚC DỰ ÁN

```
d:\chioi\
├── docs/                    ← Tài liệu kỹ thuật (đọc file tương ứng)
├── chioi-backend/           ← Backend NestJS (Port 3000)
├── Khachhang/               ← Frontend Khách hàng (Port 8080)
├── Giupviec/                ← Frontend Tasker (Port 8082)
├── Admin/                   ← Frontend Admin CMS (Port 8081)
├── shared/api.js            ← Code dùng chung 3 frontend
├── database/                ← SQL scripts gốc
├── start_all.ps1            ← Script khởi động toàn bộ
└── RULES.md                 ← File này
```

---

## TRƯỚC KHI BẮT ĐẦU SESSION

1. ✅ Đọc `RULES.md` (file này)
2. ✅ Đọc `docs/ARCHITECTURE.md` — hiểu kiến trúc tổng thể
3. ✅ Đọc `docs/CRITICAL_PATHS.md` nếu sửa backend
4. ✅ Đọc `docs/DATABASE.md` nếu liên quan database
5. ✅ Đọc `docs/API_CONTRACTS.md` nếu thêm/sửa API
6. ✅ Đọc `docs/SECURITY.md` nếu liên quan auth/payment

---

## TECH STACK

| Component | Công nghệ |
|-----------|-----------|
| Backend | NestJS 11 + TypeScript |
| ORM | Prisma 7 |
| Database | PostgreSQL 16 + PostGIS |
| Auth | JWT (Passport.js) + bcrypt |
| Realtime | Socket.IO 4.x |
| Frontend | HTML + TailwindCSS CDN + Vanilla JS |
| Mobile | Flutter 3.x |

---

## QUY TẮC FRONTEND

1. **Design tokens**: Orange gradient `#ff7e36` → `#a04100`, font "Be Vietnam Pro"
2. **Mobile-first**: Tất cả trang Khách hàng và Tasker phải responsive mobile
3. **No build step**: Frontend chạy trực tiếp bằng static file server
4. **API base**: `http://127.0.0.1:3000` (dev) — config trong `shared/api.js`
5. **Không hardcode data**: MỌI dữ liệu phải fetch từ API, không mockup tĩnh

---

## QUY TẮC BACKEND

1. **Module pattern**: Mỗi tính năng = 1 NestJS Module (controller + service)
2. **Guard trước Controller**: Auth → Role → Controller → Service → Prisma
3. **Error handling**: Dùng NestJS built-in exceptions (BadRequestException, etc.)
4. **Swagger**: Mọi endpoint phải có `@ApiOperation` + `@ApiBody`
5. **WebSocket**: Emit events qua `OrdersGateway` cho status changes

---

## THỨ TỰ TRIỂN KHAI MODULE (Dependency Order)

```
Layer 1 (Foundation) — PHẢI xong trước
├── Auth Module (login, register, JWT)
├── Prisma Module (database connection)
└── Database Schema (prisma migrate)

Layer 2 (Core CRUD) — Song song được
├── Services CRUD
├── Packages CRUD
├── User Profile Management
└── Wallet Module (balance, deposit, withdraw)

Layer 3 (Business Logic) — Phụ thuộc Layer 2
├── Orders Module (book, accept, status)
├── Orders Gateway (WebSocket real-time)
├── Reviews Module
└── Chat/Messages Module

Layer 4 (Admin & Support) — Phụ thuộc Layer 3
├── Admin Dashboard (thống kê)
├── Order Intervention
├── KYC Approval
├── Ticket Management
└── Withdrawal Approval

Layer 5 (Integration) — Tích hợp sau
├── VietQR / Banking Webhook
├── SMS OTP (FPT/VNPT)
├── eKYC (FPT.AI)
├── Push Notification (FCM)
└── Masked Phone Number

Layer 6 (Polish) — Cuối cùng
├── Performance Optimization
├── SEO
├── PWA Support
├── Dark Mode
└── Multi-language (VI/EN)
```

---

## SAU MỖI SESSION

1. ✅ Cập nhật `docs/CHANGELOG.md` với những gì đã thay đổi
2. ✅ Cập nhật docs nếu có thay đổi architecture/database/API
3. ✅ Báo cáo tóm tắt cho user
