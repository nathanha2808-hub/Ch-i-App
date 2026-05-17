import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { PushModule } from '../push/push.module';

@Module({
  imports: [PushModule],
  providers: [ApiService],
  controllers: [ApiController]
})
export class ApiModule {}
