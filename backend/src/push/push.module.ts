// TC-T09-025 + TC-T13-023: Web Push Module
import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { PushController } from './push.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PushController],
  providers: [PushService],
  exports: [PushService], // Export để OrdersModule & WalletsModule inject được
})
export class PushModule {}
