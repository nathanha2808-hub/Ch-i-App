// Push Notification Init — Capacitor FCM for Chị Ơi! Tasker App
// Chỉ chạy trên native mobile (Android/iOS), bỏ qua trên browser
(function() {
  'use strict';

  async function initPush() {
    // Kiểm tra Capacitor có sẵn không (đợi bridge inject xong)
    if (typeof Capacitor === 'undefined' || !Capacitor.isNativePlatform()) {
      console.log('[Push] Not native platform, skipping FCM init');
      return;
    }

    const { PushNotifications } = Capacitor.Plugins;
    if (!PushNotifications) {
      console.warn('[Push] PushNotifications plugin not available');
      return;
    }

    try {
      // 1. Xin quyền
      console.log('[Push] Requesting permissions...');
      const permission = await PushNotifications.requestPermissions();
      console.log('[Push] Permission result:', JSON.stringify(permission));
      if (permission.receive !== 'granted') {
        console.warn('[Push] Permission not granted');
        return;
      }

      // 2. Đăng ký nhận push
      await PushNotifications.register();
      console.log('[Push] Register called');

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
        console.error('[Push] Registration error:', JSON.stringify(err));
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

  // Đợi 2 giây cho Capacitor bridge inject xong (remote URL cần thêm thời gian)
  function waitAndInit() {
    setTimeout(function() {
      if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform()) {
        initPush();
      } else {
        console.log('[Push] Capacitor not available after wait, skipping');
      }
    }, 2500);
  }

  if (document.readyState === 'complete') {
    waitAndInit();
  } else {
    window.addEventListener('load', waitAndInit);
  }
})();
