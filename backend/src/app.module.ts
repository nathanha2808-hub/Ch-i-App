import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';
import { OrdersModule } from './orders/orders.module';
import { WalletsModule } from './wallets/wallets.module';
import { SmsModule } from './integrations/sms/sms.module';
import { KycModule } from './integrations/kyc/kyc.module';
import { PaymentsModule } from './integrations/payments/payments.module';
import { throttlerConfig } from './common/throttler.config';

@Module({
  imports: [
    // FIX: Throttler có 4 configs nhưng APP_GUARD chỉ nên check 'short' (300 req/min)
    // Auth/register/otp routes tự apply @Throttle() decorator riêng
    ThrottlerModule.forRoot(throttlerConfig),
    PrismaModule,
    AuthModule,
    ApiModule,
    OrdersModule,
    WalletsModule,
    SmsModule,
    KycModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // FIX DB CONNECT: Xóa APP_GUARD toàn cục vì nó áp TẤT CẢ throttlers (register:3, otp:3)
    // lên MỌI route → block user sau 3 request. Auth routes tự dùng @Throttle() decorator.
    // { provide: APP_GUARD, useClass: ThrottlerGuard },  // ← ĐÃ XÓA
  ],
})
export class AppModule {}

