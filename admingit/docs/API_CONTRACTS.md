# API_CONTRACTS.md — Tài liệu API Chị Ơi!

> Phiên bản: 1.0 · Cập nhật: 2026-05-12 · Base URL: `http://127.0.0.1:3000`  
> Swagger UI: `http://127.0.0.1:3000/api/docs`  
> Auth: JWT Bearer Token — Gắn header `Authorization: Bearer <token>`

---

## Mục lục

1. [Authentication](#1-authentication)
2. [Services & Packages](#2-services--packages)
3. [Orders](#3-orders)
4. [Wallets](#4-wallets)
5. [Tasker APIs](#5-tasker-apis)
6. [Support](#6-support)
7. [Admin APIs](#7-admin-apis)
8. [WebSocket Events](#8-websocket-events)

---

## 1. Authentication

> 🔓 Không cần Token

### `POST /api/auth/login`
Đăng nhập (Customer, Tasker, Admin)

**Request:**
```json
{
  "phone": "0901234567",
  "password": "password123"
}
```

**Response 200:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "user_id": 1,
    "phone": "0901234567",
    "full_name": "Nguyễn Văn A",
    "role": "CUSTOMER",
    "status": "ACTIVE",
    "created_at": "2026-05-01T00:00:00.000Z"
  }
}
```

**Error 401:**
```json
{ "message": "Invalid phone or password", "statusCode": 401 }
```

---

### `POST /api/auth/register`
Đăng ký tài khoản mới

**Request:**
```json
{
  "phone": "0901234567",
  "password": "password123",
  "full_name": "Nguyễn Văn A",
  "role": "CUSTOMER"
}
```

**Response 201:** (Tự động đăng nhập)
```json
{
  "access_token": "eyJ...",
  "user": { "user_id": 5, "phone": "0901234567", "full_name": "Nguyễn Văn A", "role": "CUSTOMER" }
}
```

**Error 400:** `{ "message": "Phone number already exists" }`

---

### `POST /api/auth/forgot-password`
Yêu cầu OTP quên mật khẩu (MOCK)

**Request:** `{ "phone": "0901234567" }`  
**Response:** `{ "message": "OTP sent to phone number", "mock_otp": "123456" }`

---

### `POST /api/auth/reset-password`
Đặt lại mật khẩu bằng OTP

**Request:**
```json
{
  "phone": "0901234567",
  "otp": "123456",
  "new_password": "newpassword123"
}
```

**Response:** `{ "message": "Password reset successfully" }`

---

## 2. Services & Packages

> 🔒 Cần Token: CUSTOMER hoặc ADMIN

### `GET /api/services`
Lấy danh sách dịch vụ

**Response 200:**
```json
[
  {
    "service_id": 1,
    "name": "Dọn dẹp nhà",
    "description": "Dịch vụ dọn dẹp vệ sinh...",
    "base_price": "150000.00",
    "icon_url": "cleaning_services",
    "is_active": true
  },
  {
    "service_id": 2,
    "name": "Trông trẻ",
    "base_price": "200000.00",
    "icon_url": "child_care"
  },
  {
    "service_id": 3,
    "name": "Mua hộ WinMart",
    "base_price": "50000.00",
    "icon_url": "shopping_cart"
  }
]
```

---

### `GET /api/packages`
Lấy danh sách gói gia đình

**Response 200:**
```json
[
  {
    "package_id": 1,
    "name": "Gói Gia đình 30 ngày",
    "description": "Giảm 15% phí dịch vụ...",
    "price": "1500000.00",
    "duration_days": 30,
    "is_active": true
  }
]
```

---

### `GET /api/taskers/active`
> 🔒 CUSTOMER only  
Lấy danh sách Tasker đang online

**Response 200:**
```json
[
  {
    "tasker_id": 2,
    "bio": "5 năm kinh nghiệm...",
    "is_online": true,
    "average_rating": "4.80",
    "total_jobs": 125,
    "users": { "full_name": "Nguyễn Lan", "avatar_url": null }
  }
]
```

---

## 3. Orders

> 🔒 Cần Token

### `POST /api/orders/book`
> 🔒 CUSTOMER  
Đặt đơn mới

**Request:**
```json
{
  "service_id": 1,
  "scheduled_time": "2026-05-15T10:00:00Z",
  "address": "Căn A1-2003, Vinhomes Grand Park",
  "total_price": 450000,
  "notes": "Mang theo nước lau sàn",
  "longitude": 106.6297,
  "latitude": 10.8231
}
```

**Response 201:**
```json
{
  "message": "Order created and searching for taskers",
  "order": {
    "order_id": 15,
    "order_code": "DH20260515-015",
    "status": "SEARCHING",
    "customer_id": 1,
    "service_id": 1,
    "total_price": "450000.00",
    "tasker_earnings": "382500.00",
    "platform_fee": "67500.00"
  },
  "nearbyTaskersCount": 3
}
```

---

### `GET /api/orders/customer/history`
> 🔒 CUSTOMER  
Lịch sử đơn hàng khách hàng

**Response 200:**
```json
[
  {
    "order_id": 15,
    "order_code": "DH20260515-015",
    "status": "COMPLETED",
    "total_price": "450000.00",
    "scheduled_time": "2026-05-15T10:00:00.000Z",
    "address": "Căn A1-2003",
    "created_at": "2026-05-15T08:00:00.000Z",
    "updated_at": "2026-05-15T12:00:00.000Z",
    "services": { "name": "Dọn dẹp nhà", "icon_url": "cleaning_services" },
    "taskers": {
      "users": { "full_name": "Nguyễn Lan", "avatar_url": null }
    }
  }
]
```

---

### `GET /api/orders/:id`
> 🔒 CUSTOMER / TASKER  
Chi tiết đơn hàng (dùng cho trang theo dõi đơn)

---

### `PATCH /api/orders/:id/accept`
> 🔒 TASKER  
Nhận đơn

**Response 200:**
```json
{
  "order_id": 15,
  "status": "ACCEPTED",
  "tasker_id": 2
}
```

---

### `PATCH /api/orders/:id/status`
> 🔒 TASKER  
Cập nhật trạng thái đơn

**Request:** `{ "status": "TASKER_ARRIVED" }`  
**Giá trị hợp lệ:** `TASKER_ARRIVED`, `IN_PROGRESS`, `COMPLETED`

---

### `PATCH /api/orders/:id/cancel`
> 🔒 CUSTOMER  
Hủy đơn

**Response:** `{ "message": "Order cancelled successfully", "order": {...} }`

---

### `POST /api/orders/:id/review`
> 🔒 CUSTOMER  
Đánh giá Tasker

**Request:**
```json
{
  "rating": 5,
  "comment": "Làm việc rất sạch sẽ và đúng giờ"
}
```

---

### `GET /api/orders/chat/:orderId`
> 🔒 CUSTOMER / TASKER  
Lấy lịch sử chat của đơn hàng

**Response 200:**
```json
[
  {
    "message_id": 1,
    "sender_id": 1,
    "receiver_id": 2,
    "content": "Chào chị, em đang đến nhé",
    "is_read": true,
    "created_at": "2026-05-15T09:55:00.000Z"
  }
]
```

---

## 4. Wallets

> 🔒 Cần Token (bất kỳ role)

### `GET /api/wallets/balance`
Lấy số dư ví

**Response 200:**
```json
{
  "wallet_id": 1,
  "user_id": 1,
  "balance": "7000000.00",
  "updated_at": "2026-05-12T00:00:00.000Z"
}
```

> ⚠️ **Lưu ý:** Frontend Khách hàng gọi `/api/wallet/balance` (không có 's'). Cần đảm bảo route alias hoặc thống nhất endpoint.

---

### `GET /api/wallets/transactions`
Lịch sử giao dịch

**Response 200:**
```json
[
  {
    "transaction_id": 1,
    "transaction_code": "TX20260512-001",
    "amount": "500000.00",
    "type": "DEPOSIT",
    "status": "COMPLETED",
    "description": "Nạp tiền qua QR",
    "created_at": "2026-05-12T10:00:00.000Z"
  }
]
```

---

### `POST /api/wallets/deposit`
Nạp tiền vào ví

**Request:** `{ "amount": 100000 }`  
**Response:** `{ "transaction_id": 5, "balance": "7100000.00", ... }`

---

### `POST /api/wallets/withdraw`
Rút tiền từ ví

**Request:** `{ "amount": 50000 }`  
**Response:** `{ "transaction_id": 6, "status": "PENDING", ... }`

---

## 5. Tasker APIs

> 🔒 Cần Token: TASKER

### `GET /api/taskers/history`
Lịch sử đơn hàng Tasker

### `POST /api/taskers/kyc`
Nộp hồ sơ KYC

**Request:**
```json
{
  "cccd_front_url": "https://...",
  "cccd_back_url": "https://...",
  "selfie_url": "https://...",
  "bio": "5 năm kinh nghiệm giúp việc"
}
```

### `PATCH /api/taskers/status`
Bật/tắt online

**Request:** `{ "is_online": true }`

---

## 6. Support

> 🔒 CUSTOMER / TASKER

### `POST /api/support/tickets`
Tạo ticket hỗ trợ

**Request:**
```json
{
  "subject": "Tasker không đến đúng giờ",
  "description": "Đơn hàng #15, Tasker đến muộn 30 phút..."
}
```

---

## 7. Admin APIs

> 🔒 Cần Token: ADMIN

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/admin/dashboard` | Thống kê tổng quan (KPI) |
| `GET` | `/api/admin/users` | Danh sách users |
| `GET` | `/api/admin/orders` | Danh sách orders |
| `PATCH` | `/api/admin/orders/:id/cancel` | Admin hủy đơn |
| `GET` | `/api/admin/tickets` | Danh sách khiếu nại |
| `PATCH` | `/api/admin/tickets/:id/resolve` | Giải quyết ticket |
| `GET` | `/api/admin/withdrawals` | Danh sách yêu cầu rút tiền |
| `PATCH` | `/api/admin/withdrawals/:id/approve` | Duyệt rút tiền |
| `PATCH` | `/api/admin/taskers/:id/approve` | Duyệt KYC Tasker |
| `POST` | `/api/services` | Tạo dịch vụ mới |
| `PUT` | `/api/services/:id` | Cập nhật dịch vụ |
| `DELETE` | `/api/services/:id` | Xóa dịch vụ |
| `POST` | `/api/packages` | Tạo gói gia đình |
| `PUT` | `/api/packages/:id` | Cập nhật gói |
| `DELETE` | `/api/packages/:id` | Xóa gói |

### Dashboard Response mẫu:
```json
{
  "totalUsers": 150,
  "totalOrders": 580,
  "totalRevenue": 87000000,
  "activeTaskers": 25,
  "recentOrders": [...],
  "pendingTickets": 3
}
```

---

## 8. WebSocket Events

> Kết nối: `io('http://127.0.0.1:3000', { auth: { token: '<JWT>' } })`

### Server → Client Events

| Event | Nhận bởi | Payload | Mô tả |
|-------|----------|---------|-------|
| `new_order_available` | TASKER | `{ order, message }` | Đơn mới cần nhận |
| `order_accepted` | CUSTOMER | `{ order, message }` | Tasker đã nhận đơn |
| `order_status_updated` | CUSTOMER | `{ order, message }` | Trạng thái thay đổi |
| `order_cancelled` | TASKER | `{ orderId, message }` | Khách hủy đơn |
| `new_message` | CUSTOMER/TASKER | `{ message }` | Tin nhắn mới |

### Client → Server Events

| Event | Gửi bởi | Payload | Mô tả |
|-------|---------|---------|-------|
| `send_message` | CUSTOMER/TASKER | `{ order_id, receiver_id, content }` | Gửi tin nhắn |
| `join_order` | CUSTOMER/TASKER | `{ order_id }` | Join room theo đơn |

---

## 9. Error Response Format

Tất cả lỗi trả về format chuẩn NestJS:

```json
{
  "statusCode": 400,
  "message": "Mô tả lỗi cụ thể",
  "error": "Bad Request"
}
```

| Status Code | Ý nghĩa |
|-------------|---------|
| `400` | Dữ liệu không hợp lệ |
| `401` | Chưa đăng nhập / Token hết hạn |
| `403` | Không có quyền (sai role) |
| `404` | Không tìm thấy resource |
| `500` | Lỗi server |
