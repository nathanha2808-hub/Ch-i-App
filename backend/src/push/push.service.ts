// TC-T09-025 + TC-T13-023: Web Push Notification Service
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as webpush from 'web-push';

@Injectable()
export class PushService {
  constructor(private prisma: PrismaService) {
    // VAPID keys — generate via: npx web-push generate-vapid-keys
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || 'BBOD8FqSbFjxAx-lthqPGfvJXrX3ihmmSDQqZZqQPJNjs0g5DqrwPGPoUWfEiY2kNj4R4AwO6u56ZmEHhFKWCjY';
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '9O0KcJQ--g0k-BSZsy3Aq5QCugcoryuR9MfobZei3lM';
    const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:admin@chioi.vn';

    webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
  }

  // Lưu subscription mới (hoặc cập nhật nếu endpoint đã tồn tại)
  async saveSubscription(userId: number, subscription: { endpoint: string; keys: { p256dh: string; auth: string } }) {
    return this.prisma.push_subscriptions.upsert({
      where: { endpoint: subscription.endpoint },
      update: {
        user_id: userId,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
      create: {
        user_id: userId,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
    });
  }

  // Gửi push notification tới TẤT CẢ subscription của user
  async sendPushToUser(userId: number, payload: { title: string; body: string; url?: string; icon?: string }) {
    const subscriptions = await this.prisma.push_subscriptions.findMany({
      where: { user_id: userId },
    });

    if (subscriptions.length === 0) return;

    const pushPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      url: payload.url || '/',
      icon: payload.icon || '/icons/icon-192.png',
    });

    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            pushPayload,
          );
        } catch (err: any) {
          // Subscription hết hạn hoặc bị revoke → xóa khỏi DB
          if (err.statusCode === 410 || err.statusCode === 404) {
            await this.prisma.push_subscriptions.delete({ where: { id: sub.id } }).catch(() => {});
            console.log(`[Push] Removed expired subscription ${sub.id} for user ${userId}`);
          } else {
            console.warn(`[Push] Failed to send to user ${userId}:`, err.message);
          }
        }
      }),
    );

    return { sent: results.filter((r) => r.status === 'fulfilled').length, total: subscriptions.length };
  }

  // Xóa subscription khi user unsubscribe hoặc logout
  async removeSubscription(endpoint: string) {
    return this.prisma.push_subscriptions.deleteMany({ where: { endpoint } });
  }
}
