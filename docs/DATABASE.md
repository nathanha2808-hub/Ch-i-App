# DATABASE.md — Thiết kế Cơ sở Dữ liệu Chị Ơi!

> Phiên bản: 1.0 · Cập nhật: 2026-05-12 · ORM: Prisma 7 · DBMS: PostgreSQL 16 + PostGIS

---

## 1. Tổng quan

Hệ thống gồm **14 bảng chính**, chia theo 4 domain:

| Domain | Bảng | Mô tả |
|--------|------|-------|
| **Identity** | `users`, `customers`, `taskers`, `admins` | Quản lý tài khoản đa vai trò |
| **Orders** | `orders`, `order_status_history`, `order_interventions`, `reviews`, `messages` | Luồng đặt/thực hiện đơn |
| **Finance** | `wallets`, `transactions`, `vouchers` | Ví điện tử & thanh toán |
| **Platform** | `services`, `family_packages`, `customer_packages`, `tasker_services`, `notifications`, `support_tickets`, `admin_audit_logs` | Dịch vụ, gói, hỗ trợ |

---

## 2. Chi tiết từng bảng

### 2.1 `users` — Bảng người dùng gốc (3 vai trò)

| Cột | Kiểu | Constraint | Mô tả |
|-----|------|-----------|-------|
| `user_id` | `SERIAL` | **PK**, Auto-increment | ID người dùng |
| `phone` | `VARCHAR(20)` | **UNIQUE**, NOT NULL | Số điện thoại đăng nhập |
| `password_hash` | `VARCHAR(255)` | NOT NULL | Bcrypt hash mật khẩu |
| `full_name` | `VARCHAR(100)` | NOT NULL | Họ và tên |
| `avatar_url` | `VARCHAR(255)` | NULL | URL ảnh đại diện |
| `role` | `VARCHAR(20)` | NOT NULL, CHECK | `CUSTOMER` / `TASKER` / `ADMIN` |
| `status` | `VARCHAR(20)` | DEFAULT `'ACTIVE'` | `ACTIVE` / `SUSPENDED` / `DELETED` |
| `created_at` | `TIMESTAMP` | DEFAULT `now()` | Ngày tạo |
| `updated_at` | `TIMESTAMP` | DEFAULT `now()` | Ngày cập nhật |

**Relations:**
- 1:1 → `customers` (nếu role = CUSTOMER)
- 1:1 → `taskers` (nếu role = TASKER)
- 1:1 → `admins` (nếu role = ADMIN)
- 1:1 → `wallets`
- 1:N → `notifications`, `support_tickets`, `messages`

---

### 2.2 `customers` — Thông tin riêng Khách hàng

| Cột | Kiểu | Constraint | Mô tả |
|-----|------|-----------|-------|
| `customer_id` | `INT` | **PK**, FK → `users.user_id` ON DELETE CASCADE | ID khách hàng = user_id |
| `default_address` | `TEXT` | NULL | Địa chỉ mặc định (căn hộ Vinhomes) |
| `loyalty_points` | `INT` | DEFAULT `0` | Điểm tích lũy |

**Relations:** 1:N → `orders`, `reviews`, `customer_packages`

---

### 2.3 `taskers` — Thông tin riêng Tasker (Giúp việc)

| Cột | Kiểu | Constraint | Mô tả |
|-----|------|-----------|-------|
| `tasker_id` | `INT` | **PK**, FK → `users.user_id` ON DELETE CASCADE | ID tasker = user_id |
| `bio` | `TEXT` | NULL | Mô tả bản thân |
| `kyc_status` | `VARCHAR(20)` | DEFAULT `'UNVERIFIED'` | `UNVERIFIED` / `PENDING` / `VERIFIED` / `REJECTED` |
| `average_rating` | `DECIMAL(3,2)` | DEFAULT `0.00` | Điểm đánh giá trung bình (0-5) |
| `total_jobs` | `INT` | DEFAULT `0` | Tổng số đơn hoàn thành |
| `is_online` | `BOOLEAN` | DEFAULT `false` | Trạng thái nhận việc |
| `last_heartbeat` | `TIMESTAMP` | NULL | Lần ping cuối (auto-offline nếu > 5 phút) |
| `current_location` | `GEOMETRY(Point)` | NULL | Vị trí GPS hiện tại (PostGIS) |

**Relations:** 1:N → `orders`, `reviews`, `tasker_services`

---

### 2.4 `admins` — Thông tin riêng Admin

| Cột | Kiểu | Constraint | Mô tả |
|-----|------|-----------|-------|
| `admin_id` | `INT` | **PK**, FK → `users.user_id` ON DELETE CASCADE | ID admin = user_id |
| `department` | `VARCHAR(100)` | NULL | Phòng ban |
| `access_level` | `VARCHAR(20)` | DEFAULT `'SUPPORT'` | `SUPPORT` / `MANAGER` / `SUPER_ADMIN` |

**Relations:** 1:N → `admin_audit_logs`, `order_interventions`, `support_tickets`

---

### 2.5 `services` — Danh sách dịch vụ

| Cột | Kiểu | Constraint | Mô tả |
|-----|------|-----------|-------|
| `service_id` | `SERIAL` | **PK** | ID dịch vụ |
| `name` | `VARCHAR(100)` | NOT NULL | Tên: "Dọn dẹp nhà", "Trông trẻ", "Mua hộ WinMart" |
| `description` | `TEXT` | NULL | Mô tả chi tiết |
| `base_price` | `DECIMAL(12,2)` | NOT NULL | Giá cơ bản (VNĐ) |
| `icon_url` | `VARCHAR(255)` | NULL | URL icon material |
| `is_active` | `BOOLEAN` | DEFAULT `true` | Đang hoạt động |
| `created_at` | `TIMESTAMP` | DEFAULT `now()` | Ngày tạo |

---

### 2.6 `orders` — Đơn hàng

| Cột | Kiểu | Constraint | Mô tả |
|-----|------|-----------|-------|
| `order_id` | `SERIAL` | **PK** | ID đơn |
| `order_code` | `VARCHAR(50)` | **UNIQUE**, NOT NULL | Mã đơn hiển thị (VD: `DH20261020-001`) |
| `customer_id` | `INT` | FK → `customers`, NOT NULL | Khách đặt |
| `tasker_id` | `INT` | FK → `taskers`, NULL | Tasker nhận (NULL = đang tìm) |
| `service_id` | `INT` | FK → `services`, NOT NULL | Dịch vụ |
| `voucher_id` | `INT` | FK → `vouchers`, NULL | Mã giảm giá |
| `status` | `VARCHAR(20)` | DEFAULT `'PENDING'` | Trạng thái (xem bảng bên dưới) |
| `scheduled_time` | `TIMESTAMP` | NOT NULL | Thời gian hẹn |
| `address` | `TEXT` | NOT NULL | Địa chỉ thực hiện |
| `location` | `GEOMETRY(Point)` | NULL | Tọa độ GPS |
| `total_price` | `DECIMAL(12,2)` | NOT NULL | Tổng tiền |
| `discount_amount` | `DECIMAL(12,2)` | DEFAULT `0` | Số tiền giảm |
| `tasker_earnings` | `DECIMAL(12,2)` | NOT NULL | Thu nhập Tasker (85%) |
| `platform_fee` | `DECIMAL(12,2)` | NOT NULL | Phí nền tảng (15%) |
| `payment_method` | `VARCHAR(20)` | DEFAULT `'CASH'` | `CASH` / `WALLET` / `BANK` |
| `payment_status` | `VARCHAR(20)` | DEFAULT `'UNPAID'` | `UNPAID` / `PAID` / `REFUNDED` |
| `notes` | `TEXT` | NULL | Ghi chú khách hàng |
| `cancel_reason` | `TEXT` | NULL | Lý do hủy |
| `created_at` | `TIMESTAMP` | DEFAULT `now()` | |
| `updated_at` | `TIMESTAMP` | DEFAULT `now()` | |

**Trạng thái đơn hàng (Order Status Flow):**
```
PENDING → SEARCHING → ACCEPTED → TASKER_ARRIVED → IN_PROGRESS → COMPLETED
    │         │           │                                          
    └── CANCELLED ←───────┘ (Khách/Admin hủy)
```

---

### 2.7 `wallets` — Ví điện tử

| Cột | Kiểu | Constraint | Mô tả |
|-----|------|-----------|-------|
| `wallet_id` | `SERIAL` | **PK** | ID ví |
| `user_id` | `INT` | **UNIQUE**, FK → `users` ON DELETE CASCADE | 1 user = 1 ví |
| `balance` | `DECIMAL(15,2)` | DEFAULT `0.00` | Số dư hiện tại |
| `updated_at` | `TIMESTAMP` | DEFAULT `now()` | |

---

### 2.8 `transactions` — Lịch sử giao dịch ví

| Cột | Kiểu | Constraint | Mô tả |
|-----|------|-----------|-------|
| `transaction_id` | `SERIAL` | **PK** | |
| `transaction_code` | `VARCHAR(50)` | **UNIQUE** | Mã giao dịch |
| `wallet_id` | `INT` | FK → `wallets` | |
| `amount` | `DECIMAL(12,2)` | NOT NULL | Số tiền |
| `type` | `VARCHAR(20)` | NOT NULL | `DEPOSIT` / `WITHDRAW` / `PAYMENT` / `EARNING` / `REFUND` |
| `status` | `VARCHAR(20)` | DEFAULT `'PENDING'` | `PENDING` / `COMPLETED` / `FAILED` / `CANCELLED` |
| `order_id` | `INT` | FK → `orders`, NULL | Đơn liên quan (nếu có) |
| `description` | `TEXT` | NULL | Mô tả giao dịch |
| `created_at` | `TIMESTAMP` | DEFAULT `now()` | |

---

### 2.9 `order_status_history` — Lịch sử trạng thái đơn

| Cột | Kiểu | Constraint | Mô tả |
|-----|------|-----------|-------|
| `history_id` | `SERIAL` | **PK** | |
| `order_id` | `INT` | FK → `orders` ON DELETE CASCADE | |
| `status` | `VARCHAR(20)` | NOT NULL | Trạng thái tại thời điểm |
| `location_at_time` | `GEOMETRY(Point)` | NULL | Vị trí tại thời điểm |
| `created_at` | `TIMESTAMP` | DEFAULT `now()` | |

---

### 2.10 `messages` — Chat giữa Khách và Tasker

| Cột | Kiểu | Constraint | Mô tả |
|-----|------|-----------|-------|
| `message_id` | `SERIAL` | **PK** | |
| `order_id` | `INT` | FK → `orders` ON DELETE CASCADE | Chat theo đơn |
| `sender_id` | `INT` | FK → `users` | Người gửi |
| `receiver_id` | `INT` | FK → `users` | Người nhận |
| `content` | `TEXT` | NOT NULL | Nội dung tin nhắn |
| `is_read` | `BOOLEAN` | DEFAULT `false` | Đã đọc |
| `created_at` | `TIMESTAMP` | DEFAULT `now()` | |

---

### 2.11 `reviews` — Đánh giá Tasker

| Cột | Kiểu | Constraint | Mô tả |
|-----|------|-----------|-------|
| `review_id` | `SERIAL` | **PK** | |
| `order_id` | `INT` | **UNIQUE**, FK → `orders` ON DELETE CASCADE | 1 đơn = 1 review |
| `customer_id` | `INT` | FK → `customers` | |
| `tasker_id` | `INT` | FK → `taskers` | |
| `rating` | `INT` | CHECK `1-5` | Số sao |
| `comment` | `TEXT` | NULL | Nhận xét |
| `created_at` | `TIMESTAMP` | DEFAULT `now()` | |

---

### 2.12 Các bảng phụ trợ

#### `family_packages` — Gói gia đình
| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `package_id` | `SERIAL PK` | |
| `name` | `VARCHAR(100)` | "Gói 30 ngày", "Gói VIP" |
| `description` | `TEXT` | Mô tả quyền lợi |
| `price` | `DECIMAL(12,2)` | Giá gói |
| `duration_days` | `INT DEFAULT 30` | Thời hạn |
| `is_active` | `BOOLEAN DEFAULT true` | |

#### `customer_packages` — Đăng ký gói
| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `customer_package_id` | `SERIAL PK` | |
| `customer_id` | `INT FK` | |
| `package_id` | `INT FK` | |
| `start_date` | `DATE` | Ngày bắt đầu |
| `end_date` | `DATE` | Ngày hết hạn |
| `status` | `VARCHAR(20)` | `ACTIVE` / `EXPIRED` / `CANCELLED` |

#### `tasker_services` — Dịch vụ Tasker đăng ký
| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `tasker_id` | `INT` | **Composite PK** |
| `service_id` | `INT` | **Composite PK** |
| `status` | `VARCHAR(20)` | `PENDING_APPROVAL` / `APPROVED` / `REJECTED` |

#### `vouchers` — Mã giảm giá
| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `voucher_id` | `SERIAL PK` | |
| `code` | `VARCHAR(50) UNIQUE` | Mã: `CHIOI20` |
| `discount_amount` | `DECIMAL(12,2)` | Số tiền giảm |
| `conditions` | `TEXT` | Điều kiện áp dụng |
| `valid_from` / `valid_until` | `TIMESTAMP` | Hiệu lực |
| `is_active` | `BOOLEAN` | |

#### `notifications` — Thông báo
| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `notification_id` | `SERIAL PK` | |
| `user_id` | `INT FK → users` | |
| `title` | `VARCHAR(255)` | Tiêu đề |
| `content` | `TEXT` | Nội dung |
| `is_read` | `BOOLEAN DEFAULT false` | |
| `created_at` | `TIMESTAMP` | |

#### `support_tickets` — Khiếu nại/Hỗ trợ
| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `ticket_id` | `SERIAL PK` | |
| `ticket_code` | `VARCHAR(50) UNIQUE` | Mã ticket |
| `user_id` | `INT FK → users` | Người tạo |
| `admin_id` | `INT FK → admins NULL` | Admin xử lý |
| `order_id` | `INT FK → orders NULL` | Đơn liên quan |
| `subject` | `VARCHAR(255)` | Chủ đề |
| `description` | `TEXT` | Nội dung |
| `status` | `VARCHAR(20)` | `OPEN` / `IN_PROGRESS` / `RESOLVED` / `CLOSED` |
| `priority` | `VARCHAR(20)` | `LOW` / `MEDIUM` / `HIGH` / `URGENT` |

#### `admin_audit_logs` — Log hành động Admin
| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `log_id` | `SERIAL PK` | |
| `admin_id` | `INT FK → admins` | Admin thực hiện |
| `action` | `VARCHAR(255)` | Hành động (VD: `APPROVE_KYC`) |
| `target_table` | `VARCHAR(50)` | Bảng bị ảnh hưởng |
| `target_id` | `INT` | ID record bị ảnh hưởng |
| `old_data` / `new_data` | `JSONB` | Dữ liệu trước/sau |
| `ip_address` | `VARCHAR(45)` | IP admin |
| `created_at` | `TIMESTAMP` | |

---

## 3. Sơ đồ quan hệ (ERD)

```
┌──────────┐    1:1    ┌────────────┐    1:N    ┌──────────┐
│  users   │──────────►│ customers  │──────────►│  orders  │
│          │           │            │           │          │
│ user_id  │    1:1    │customer_id │    1:N    │ order_id │
│ phone    │──────────►│default_addr│◄──────────│tasker_id │
│ role     │           └────────────┘   reviews │service_id│
│ status   │    1:1    ┌────────────┐           │ status   │
│          │──────────►│  taskers   │──────────►│ address  │
│          │           │ tasker_id  │    1:N    │total_price│
│          │    1:1    │ kyc_status │           └────┬─────┘
│          │──────────►│ is_online  │                │
│          │           │ avg_rating │           1:N  │ 1:N
│          │    1:1    └────────────┘                │
│          │──────────►┌────────────┐     ┌──────────┴───────┐
│          │           │  wallets   │     │    messages       │
│          │           │ wallet_id  │     │ order_status_hist │
└──────┬───┘           │  balance   │     │ order_interventions│
       │               └─────┬──────┘     │    reviews        │
       │ 1:N                 │ 1:N        │ support_tickets   │
       │               ┌────┴──────┐     │  transactions     │
       │               │transactions│     └──────────────────┘
       │               │ type       │
  ┌────┴──────┐        │ amount     │     ┌──────────────────┐
  │notifications│      │ status     │     │   services       │
  │support_tickets│    └───────────┘     │  service_id      │
  └───────────┘                          │  name, base_price│
                                         └────────┬─────────┘
  ┌───────────────────┐                           │ N:N
  │ family_packages   │                  ┌────────┴─────────┐
  │ package_id, name  │                  │ tasker_services   │
  │ price, duration   │                  │ (tasker_id,       │
  └────────┬──────────┘                  │  service_id)      │
           │ 1:N                         └──────────────────┘
  ┌────────┴──────────┐
  │customer_packages  │
  │ start/end_date    │
  │ status            │
  └───────────────────┘
```

---

## 4. Quy tắc Migration

1. **KHÔNG BAO GIỜ** chỉnh sửa `schema.prisma` mà không đọc file này trước
2. **PHẢI** tạo migration trước khi deploy: `npx prisma migrate dev --name <mô_tả>`
3. **KHÔNG** xóa cột/bảng đang có dữ liệu production — chỉ đánh dấu `is_active = false`
4. **PHẢI** seed data test sau migration: `npx prisma db seed`
5. Khi thêm bảng mới → cập nhật file DATABASE.md này + ERD

---

## 5. Indexes quan trọng

| Bảng | Index | Lý do |
|------|-------|-------|
| `users` | `UNIQUE(phone)` | Tìm kiếm đăng nhập nhanh |
| `orders` | `UNIQUE(order_code)` | Tra cứu mã đơn |
| `orders` | `INDEX(customer_id, status)` | Lịch sử đơn khách hàng |
| `orders` | `INDEX(tasker_id, status)` | Đơn đang làm của Tasker |
| `transactions` | `UNIQUE(transaction_code)` | Tra cứu giao dịch |
| `transactions` | `INDEX(wallet_id, created_at)` | Lịch sử giao dịch ví |
| `taskers` | `GIST(current_location)` | Tìm Tasker gần nhất (PostGIS) |
