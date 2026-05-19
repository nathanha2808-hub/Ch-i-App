BEGIN;

-- 1. Xóa dữ liệu liên quan đến Đơn hàng trước (để gỡ khóa ngoại)
DELETE FROM order_status_history;
DELETE FROM order_interventions;
DELETE FROM reviews;
DELETE FROM messages;
DELETE FROM transactions;
DELETE FROM support_tickets;
DELETE FROM orders;

-- 2. Xóa các gói cước đã đăng ký của khách hàng (KHÔNG xóa family_packages gốc)
DELETE FROM customer_packages;

-- 3. Xóa các dịch vụ Tasker đã đăng ký
DELETE FROM tasker_services;

-- 4. Xóa người dùng (sẽ tự động Cascade xóa Customers, Taskers, Wallets, Push_subscriptions, Otp_codes)
DELETE FROM users WHERE role != 'ADMIN';

COMMIT;
