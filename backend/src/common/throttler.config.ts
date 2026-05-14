import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const throttlerConfig: ThrottlerModuleOptions = [
  {
    name: 'short',
    ttl: 60_000,
    limit: 200, // 200 req/phút/IP cho general API (đủ cho 1 user heavy use)
  },
  {
    name: 'auth',
    ttl: 60_000,
    limit: 30, // 30 lần/phút/IP login (đủ cho user gõ sai pass + test; chống brute force ở nginx layer)
  },
  {
    name: 'register',
    ttl: 60_000,
    limit: 5, // 5 lần/phút (chống spam đăng ký từ bot)
  },
  {
    name: 'otp',
    ttl: 30 * 60_000,
    limit: 5, // 5 lần/30 phút (chống spam SMS phí $)
  },
];
