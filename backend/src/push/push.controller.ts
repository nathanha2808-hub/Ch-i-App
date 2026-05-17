// TC-T09-025 + TC-T13-023: Web Push Subscription Controller
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PushService } from './push.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Push Notifications')
@ApiBearerAuth()
@Controller('api/push')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PushController {
  constructor(private pushService: PushService) {}

  @Post('subscribe')
  @Roles('CUSTOMER', 'TASKER', 'ADMIN')
  @ApiOperation({ summary: 'Đăng ký nhận Push Notification (Web Push)' })
  async subscribe(@Request() req, @Body() body: { endpoint: string; keys: { p256dh: string; auth: string } }) {
    await this.pushService.saveSubscription(req.user.userId, body);
    return { message: 'Push subscription saved' };
  }

  @Post('unsubscribe')
  @Roles('CUSTOMER', 'TASKER', 'ADMIN')
  @ApiOperation({ summary: 'Hủy đăng ký Push Notification' })
  async unsubscribe(@Body('endpoint') endpoint: string) {
    await this.pushService.removeSubscription(endpoint);
    return { message: 'Push subscription removed' };
  }
}
