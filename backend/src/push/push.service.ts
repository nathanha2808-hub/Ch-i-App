// TC-T09-025 + TC-T13-023: Web Push Notification Service + FCM for native mobile
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as webpush from 'web-push';
import * as admin from 'firebase-admin';

@Injectable()
export class PushService implements OnModuleInit {
  private fcmInitialized = false;

  constructor(private prisma: PrismaService) {
    // VAPID keys — generate via: npx web-push generate-vapid-keys
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || 'BBOD8FqSbFjxAx-lthqPGfvJXrX3ihmmSDQqZZqQPJNjs0g5DqrwPGPoUWfEiY2kNj4R4AwO6u56ZmEHhFKWCjY';
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '9O0KcJQ--g0k-BSZsy3Aq5QCugcoryuR9MfobZei3lM';
    const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:admin@chioi.vn';

    webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
  }

  onModuleInit() {
    // Initialize Firebase Admin SDK for FCM
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (projectId && clientEmail && privateKey) {
      try {
        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
          });
        }
        this.fcmInitialized = true;
        console.log('[FCM] Firebase Admin SDK initialized successfully');
      } catch (err) {
        console.warn('[FCM] Failed to initialize Firebase:', err.message);
      }
    } else {
      console.warn('[FCM] Firebase env vars not set — FCM push disabled');
    }
  }

  // ========== WEB PUSH (existing) ==========

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

  // ========== FCM (native mobile) ==========

  // Lưu FCM token khi device đăng ký
  async saveFcmToken(userId: number, token: string, platform: string) {
    return this.prisma.fcm_tokens.upsert({
      where: { token },
      update: { user_id: userId, platform, updated_at: new Date() },
      create: { user_id: userId, token, platform },
    });
  }

  // Xóa FCM token khi logout
  async removeFcmToken(token: string) {
    return this.prisma.fcm_tokens.deleteMany({ where: { token } });
  }

  // Gửi FCM push tới user (tất cả device)
  async sendFcmToUser(userId: number, title: string, body: string, data?: Record<string, string>) {
    if (!this.fcmInitialized) return;

    const tokens = await this.prisma.fcm_tokens.findMany({
      where: { user_id: userId },
    });

    if (tokens.length === 0) return;

    const results = await Promise.allSettled(
      tokens.map(async (t) => {
        try {
          await admin.messaging().send({
            token: t.token,
            notification: { title, body },
            data: data || {},
            android: { priority: 'high', notification: { sound: 'default', channelId: 'chioi_orders' } },
            apns: { payload: { aps: { sound: 'default', badge: 1 } } },
          });
        } catch (err: any) {
          // Token không hợp lệ → xóa khỏi DB
          if (err.code === 'messaging/registration-token-not-registered' ||
              err.code === 'messaging/invalid-registration-token') {
            await this.prisma.fcm_tokens.delete({ where: { id: t.id } }).catch(() => {});
            console.log(`[FCM] Removed invalid token ${t.id} for user ${userId}`);
          } else {
            console.warn(`[FCM] Failed to send to user ${userId}:`, err.message);
          }
        }
      }),
    );

    return { sent: results.filter((r) => r.status === 'fulfilled').length, total: tokens.length };
  }

  // Gửi FCM push tới nhiều users
  async sendFcmToMultipleUsers(userIds: number[], title: string, body: string, data?: Record<string, string>) {
    if (!this.fcmInitialized) return;
    await Promise.allSettled(
      userIds.map((id) => this.sendFcmToUser(id, title, body, data)),
    );
  }

  // Gửi push TẤT CẢ kênh (Web Push + FCM) cho 1 user
  async sendAllChannels(userId: number, payload: { title: string; body: string; url?: string; data?: Record<string, string> }) {
    await Promise.allSettled([
      this.sendPushToUser(userId, { title: payload.title, body: payload.body, url: payload.url }),
      this.sendFcmToUser(userId, payload.title, payload.body, payload.data),
    ]);
  }
}
