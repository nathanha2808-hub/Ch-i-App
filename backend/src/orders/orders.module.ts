import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersGateway } from './orders.gateway';
import { JwtModule } from '@nestjs/jwt';
import { WalletsModule } from '../wallets/wallets.module';
import { PushModule } from '../push/push.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret',
    }),
    WalletsModule,
    PushModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersGateway],
})
export class OrdersModule {}
