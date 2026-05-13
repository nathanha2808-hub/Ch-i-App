# ARCHITECTURE.md — Kiến trúc hệ thống Chị Ơi!

> Phiên bản: 1.0 · Cập nhật: 2026-05-12 · Hệ thống đặt dịch vụ giúp việc cho cư dân Vinhomes

---

## 1. Tech Stack

| Layer | Công nghệ | Lý do chọn |
|-------|-----------|------------|
| **Backend API** | NestJS 11 + TypeScript | Framework enterprise-grade, module-based, hỗ trợ tốt WebSocket, Swagger, DI container |
| **ORM** | Prisma 7 | Type-safe, migration tự động, introspect từ DB có sẵn, hỗ trợ PostgreSQL |
| **Database** | PostgreSQL 16 + PostGIS | Quan hệ phức tạp, ACID, hỗ trợ geo-location cho matching Tasker |
| **Authentication** | JWT (Passport.js) + bcrypt | Stateless, phù hợp multi-frontend, hash mật khẩu an toàn |
| **Realtime** | Socket.IO 4.x (via @nestjs/websockets) | Thông báo đơn hàng, chat, cập nhật trạng thái real-time |
| **API Docs** | Swagger (OpenAPI 3.0) | Tự generate từ NestJS decorators, truy cập `/api/docs` |
| **Frontend Khách hàng** | HTML + TailwindCSS CDN + Vanilla JS | Lightweight, mobile-first, không cần build step, deploy tĩnh |
| **Frontend Tasker** | HTML + TailwindCSS CDN + Vanilla JS | Đồng bộ UI với Khách hàng |
| **Frontend Admin** | HTML + TailwindCSS CDN + Vanilla JS | CMS nội bộ, không cần SEO |
| **Flutter App** | Flutter 3.x (Dart) | Cross-platform mobile (Android APK), dùng chung API |
| **Web Server** | http-server (Node) hoặc Nginx | Serve static files cho 3 frontend |

---

## 2. Sơ đồ kiến trúc tổng thể

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENTS                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │  Khách hàng  │  │    Tasker    │  │  Admin CMS   │  │ Flutter  │ │
│  │  (HTML/JS)   │  │  (HTML/JS)   │  │  (HTML/JS)   │  │  (Dart)  │ │
│  │  Port 8080   │  │  Port 8082   │  │  Port 8081   │  │  Mobile  │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └────┬─────┘ │
│         │                 │                 │                │       │
│         └────────────┬────┴─────────────────┘────────────────┘       │
│                      │  HTTP + WebSocket                             │
│                      ▼                                               │
│  ┌─────────────────────────────────────────────────────────────┐     │
│  │              SHARED API CLIENT (shared/api.js)              │     │
│  │  • apiFetch() — JWT auto-attach                             │     │
│  │  • ChiOiAuth — Token management                             │     │
│  │  • connectSocket() — Socket.IO wrapper                      │     │
│  │  • formatVND(), showToastMsg() — Utilities                  │     │
│  └─────────────────────────┬───────────────────────────────────┘     │
└────────────────────────────┼─────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND (NestJS — Port 3000)                      │
│  ┌─────────────────────────────────────────────────────────────┐     │
│  │  AppModule                                                   │     │
│  │  ├── AuthModule     → /api/auth/*       (Login, Register)   │     │
│  │  ├── ApiModule      → /api/*            (Services, Admin)   │     │
│  │  ├── OrdersModule   → /api/orders/*     (CRUD + Gateway)   │     │
│  │  ├── WalletsModule  → /api/wallets/*    (Balance, Deposit)  │     │
│  │  └── PrismaModule   → Database layer                        │     │
│  └─────────────────────────┬───────────────────────────────────┘     │
│                            │                                         │
│  ┌──────────────────────┐  │  ┌───────────────────────────────┐     │
│  │  JWT Auth Guard      │  │  │  Socket.IO Gateway            │     │
│  │  + Roles Guard       │──┤  │  (OrdersGateway)              │     │
│  │  + JWT Strategy      │  │  │  • new_order_available        │     │
│  └──────────────────────┘  │  │  • order_accepted             │     │
│                            │  │  • order_status_updated        │     │
│  ┌──────────────────────┐  │  │  • new_message                │     │
│  │  Swagger UI          │  │  └───────────────────────────────┘     │
│  │  /api/docs           │  │                                         │
│  └──────────────────────┘  │                                         │
└────────────────────────────┼─────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                DATABASE (PostgreSQL 16 + PostGIS)                    │
│                                                                      │
│  users ─┬─ customers ──── orders ──── reviews                       │
│         ├─ taskers ───┘        └──── messages                       │
│         ├─ admins              └──── order_status_history            │
│         └─ wallets ──── transactions                                │
│                                                                      │
│  services ── tasker_services    family_packages ── customer_packages │
│  vouchers    support_tickets    notifications    admin_audit_logs    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Cấu trúc thư mục dự án

```
d:\chioi\
├── docs/                          ← 📄 Tài liệu kỹ thuật (file này)
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── API_CONTRACTS.md
│   ├── CRITICAL_PATHS.md
│   ├── SECURITY.md
│   ├── DEPLOY.md
│   └── CHANGELOG.md
│
├── chioi-backend/                 ← 🖥️ Backend NestJS
│   ├── src/
│   │   ├── main.ts               ← Entry point (port 3000)
│   │   ├── app.module.ts          ← Root module
│   │   ├── auth/                  ← 🔐 Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── roles.decorator.ts
│   │   ├── api/                   ← 📦 General API module
│   │   │   ├── api.controller.ts
│   │   │   └── api.service.ts
│   │   ├── orders/                ← 📋 Orders module + WebSocket
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.service.ts
│   │   │   └── orders.gateway.ts
│   │   ├── wallets/               ← 💰 Wallet module
│   │   │   ├── wallets.controller.ts
│   │   │   └── wallets.service.ts
│   │   └── prisma/                ← Database client
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   ├── prisma/
│   │   ├── schema.prisma          ← ⚠️ PROTECTED — Database schema
│   │   └── seed.ts                ← Seed data
│   ├── package.json
│   ├── .env                       ← ⚠️ PROTECTED — Secrets
│   └── tsconfig.json
│
├── Khachhang/                     ← 📱 Frontend Khách hàng (16 trang)
│   ├── trangchu.html              ← M04: Trang chủ
│   ├── dangnhap.html              ← M01: Đăng nhập
│   ├── dangky.html                ← M02: Đăng ký
│   ├── datdichvudonnha.html       ← M05: Dọn nhà
│   ├── datdichvutrongtre.html     ← M06: Trông trẻ
│   ├── datdichvumuaho.html        ← M07: Mua hộ
│   ├── theodoidon.html            ← M08: Theo dõi đơn
│   ├── lichsuhoatdong.html        ← M09: Lịch sử
│   ├── chatvoitasker.html         ← M10: Chat
│   ├── thongbao.html              ← M11: Thông báo
│   ├── danhgiatasker.html         ← M12: Đánh giá
│   ├── vivalichsu.html            ← M13: Ví & Giao dịch
│   ├── naptienqr.html             ← M14: Nạp tiền QR
│   ├── taikhoan.html              ← M15: Tài khoản
│   ├── goigiadinh.html            ← M-pkg: Gói gia đình
│   └── quenmatkhau.html           ← M03: Quên mật khẩu
│
├── Giupviec/                      ← 📱 Frontend Tasker (9 trang)
│   ├── trangchutasker.html        ← M16: Dashboard Tasker
│   ├── dangnhaptasker.html        ← Đăng nhập
│   ├── dangkytasker.html          ← Đăng ký KYC
│   ├── lichsudonhang.html         ← Lịch sử đơn
│   ├── thunhapvathongke.html      ← M17: Thu nhập
│   ├── hosocanhan.html            ← Hồ sơ
│   ├── chatvoikhachhang.html      ← Chat
│   └── quenmatkhau.html           ← Quên MK
│
├── Admin/                         ← 🖥️ Frontend Admin CMS (9 trang)
│   ├── bangdieukhien.html         ← M18: Dashboard
│   ├── quanlydonhang.html         ← Quản lý đơn
│   ├── quanlycudan.html           ← Quản lý cư dân
│   ├── quanlytasker.html          ← Quản lý Tasker
│   ├── quanlyvigiaodich.html      ← Quản lý ví
│   ├── xulykhieunai.html          ← Xử lý khiếu nại
│   ├── canthiepdonhang.html       ← Can thiệp đơn
│   ├── baocaodoanhthu.html        ← Báo cáo
│   └── hopthu.html                ← Hộp thư
│
├── shared/                        ← 🔗 Code dùng chung
│   └── api.js                     ← API client, auth, socket, utilities
│
├── database/                      ← 📊 SQL scripts
│   ├── chioi_database_schema.sql
│   ├── chioi_postgres_schema.sql
│   └── seed_dummy_data.sql
│
├── tailieu/                       ← 📚 Tài liệu nghiệp vụ
├── scripts/                       ← 🔧 Scripts hỗ trợ
├── start_all.ps1                  ← 🚀 Khởi động toàn bộ hệ thống
└── RULES.md                       ← 📋 Quy tắc AI Agent
```

---

## 4. Luồng dữ liệu tổng thể

### 4.1 Luồng đặt dịch vụ (Core Flow)
```
Khách hàng                    Backend                      Tasker
    │                            │                            │
    ├── POST /orders/book ──────►│                            │
    │   {service_id, address,    │                            │
    │    scheduled_time}         │── Tìm Tasker gần ────────►│
    │                            │   (PostGIS query)          │
    │                            │── Socket: new_order ──────►│
    │                            │                            │
    │                            │◄── PATCH /orders/:id/accept│
    │◄── Socket: order_accepted──│                            │
    │                            │                            │
    │                            │◄── PATCH /orders/:id/status│
    │◄── Socket: status_updated──│   {TASKER_ARRIVED,         │
    │                            │    IN_PROGRESS,             │
    │                            │    COMPLETED}               │
    │                            │                            │
    │── POST /orders/:id/review─►│                            │
```

### 4.2 Luồng thanh toán
```
Khách hàng            Backend                 Admin
    │                    │                      │
    ├── POST /wallets/   │                      │
    │   deposit ────────►│── Tạo transaction    │
    │   {amount}         │   PENDING            │
    │                    │                      │
    │                    │── Admin duyệt ──────►│
    │                    │   hoặc Webhook QR    │
    │                    │                      │
    │◄── Số dư updated──│                      │
```

---

## 5. Dịch vụ bên ngoài (External Services)

| Service | Mục đích | Trạng thái |
|---------|----------|------------|
| **PostgreSQL + PostGIS** | Database + Geo queries | ✅ Đang dùng |
| **Socket.IO** | Real-time notifications | ✅ Đang dùng |
| **VietQR / Banking Webhook** | Tự động ghi nhận nạp tiền | 🔲 Chưa tích hợp |
| **SMS OTP (FPT/VNPT)** | Xác thực SĐT | 🔲 Mock (hardcode 123456) |
| **eKYC (FPT.AI)** | Xác minh danh tính Tasker | 🔲 Chưa tích hợp |
| **Push Notification (FCM)** | Thông báo đẩy mobile | 🔲 Chưa tích hợp |

---

## 6. Quy tắc Development

- **Backend**: Chỉ dùng Prisma ORM, không raw SQL
- **Frontend**: Tất cả gọi API qua `apiFetch()` từ `shared/api.js`
- **Auth**: Mọi request cần JWT, kiểm tra bằng `JwtAuthGuard` + `RolesGuard`
- **Real-time**: Dùng `OrdersGateway` để emit events, client dùng `connectSocket()`
- **Styling**: TailwindCSS CDN + Design tokens nhất quán (orange gradient `#ff7e36 → #a04100`)
