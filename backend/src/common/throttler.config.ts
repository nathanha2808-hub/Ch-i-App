import { ThrottlerModuleOptions } from '@nestjs/throttler';

// Lỗi DB kết nối FIX: Throttler quá nghiêm → chặn user bình thường
// Global guard chỉ áp 'short' (300 req/phút/IP) — đủ cho app thực tế
// Auth/register/otp áp thêm throttler riêng qua @Throttle() decorator
export const throttlerConfig: ThrottlerModuleOptions = [
  {
    name: 'short',
    ttl: 60_000,
    limit: 300, // Tăng lên 300 req/phút/IP cho user bình thường
  },
  {
    name: 'auth',
    ttl: 60_000,
    limit: 20, // 20 lần login/phút — chỉ dùng khi apply @Throttle('auth')
  },
  {
    name: 'register',
    ttl: 60_000,
    limit: 10, // Tăng từ 3 → 10 (3 quá thấp, block user thật)
  },
  {
    name: 'otp',
    ttl: 30 * 60_000,
    limit: 5, // Tăng từ 3 → 5 OTP/30 phút
  },
];

