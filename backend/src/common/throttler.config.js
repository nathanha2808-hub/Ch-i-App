"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttlerConfig = void 0;
// Lỗi DB kết nối FIX: Throttler quá nghiêm → chặn user bình thường
// Global guard chỉ áp 'short' (300 req/phút/IP) — đủ cho app thực tế
// Auth/register/otp áp thêm throttler riêng qua @Throttle() decorator
exports.throttlerConfig = [
    {
        name: 'short',
        ttl: 60000,
        limit: 300, // Tăng lên 300 req/phút/IP cho user bình thường
    },
    {
        name: 'auth',
        ttl: 60000,
        limit: 20, // 20 lần login/phút — chỉ dùng khi apply @Throttle('auth')
    },
    {
        name: 'register',
        ttl: 60000,
        limit: 10, // Tăng từ 3 → 10 (3 quá thấp, block user thật)
    },
    {
        name: 'otp',
        ttl: 30 * 60000,
        limit: 5, // Tăng từ 3 → 5 OTP/30 phút
    },
];
