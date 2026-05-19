import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super-secret',
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: payload.sub }
    });
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại hoặc đã bị xóa');
    }
    let isBannedGracePeriod = false;
    if (user.status === 'LOCKED' || user.status === 'BANNED' || user.status === 'INACTIVE') {
      if (user.role === 'TASKER') {
        const activeOrders = await this.prisma.orders.count({
          where: {
            tasker_id: user.user_id,
            status: { in: ['ACCEPTED', 'TASKER_ARRIVED', 'IN_PROGRESS', 'PENDING_COMPLETION'] }
          }
        });
        if (activeOrders > 0) {
          isBannedGracePeriod = true;
        } else {
          throw new UnauthorizedException('Tài khoản của bạn đã bị khóa');
        }
      } else {
        throw new UnauthorizedException('Tài khoản của bạn đã bị khóa');
      }
    }

    return { userId: payload.sub, phone: payload.phone, role: payload.role, isBannedGracePeriod };
  }
}
