// Push Notification Init — Capacitor FCM for Chị Ơi! Tasker App
// Chỉ chạy trên native mobile (Android/iOS), bỏ qua trên browser
(function() {
  'use strict';

  // Kiểm tra Capacitor có sẵn không
  if (typeof Capacitor === 'undefined' || !Capacitor.isNativePlatform()) {
    console.log('[Push] Not native platform, skipping FCM init');
    return;
  }

  const { PushNotifications } = Capacitor.Plugins;
  if (!PushNotifications) {
    console.warn('[Push] PushNotifications plugin not available');
    return;
  }

  async function initPush() {
    try {
      // 1. Xin quyền
      const permission = await PushNotifications.requestPermissions();
      if (permission.receive !== 'granted') {
        console.warn('[Push] Permission not granted');
        return;
      }

      // 2. Đăng ký nhận push
      await PushNotifications.register();

      // 3. Nhận token → gửi lên backend
      PushNotifications.addListener('registration', async (token) => {
        console.log('[Push] FCM Token:', token.value);
        const storedToken = localStorage.getItem('chioi_fcm_token');
        
        // Chỉ gửi lên server nếu token mới hoặc khác token cũ
        if (storedToken !== token.value) {
          try {
            const platform = Capacitor.getPlatform(); // 'android' | 'ios'
            await apiFetch('/api/push/register-device', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: token.value, platform: platform }),
            });
            localStorage.setItem('chioi_fcm_token', token.value);
            console.log('[Push] FCM token registered successfully');
          } catch (err) {
            console.warn('[Push] Failed to register FCM token:', err);
          }
        }
      });

      // 4. Lỗi đăng ký
      PushNotifications.addListener('registrationError', (err) => {
        console.error('[Push] Registration error:', err);
      });

      // 5. Nhận notification khi app đang mở (foreground)
      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('[Push] Notification received:', notification);
        // Hiển thị toast trong app
        if (typeof showToastMsg === 'function') {
          showToastMsg(notification.title + ': ' + notification.body, 'info');
        }
      });

      // 6. User tap vào notification
      PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
        console.log('[Push] Notification tapped:', action);
        const data = action.notification.data;
        if (data && data.order_id) {
          // Navigate tới trang theo dõi đơn hoặc trang chủ
          window.location.href = 'trangchutasker.html';
        }
      });

      console.log('[Push] FCM init completed');
    } catch (err) {
      console.error('[Push] Init error:', err);
    }
  }

  // Chờ DOM load xong và user đã đăng nhập mới init push
  if (document.readyState === 'complete') {
    setTimeout(initPush, 1000);
  } else {
    window.addEventListener('load', () => setTimeout(initPush, 1000));
  }
})();
