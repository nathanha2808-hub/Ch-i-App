// Push Notification Init — Capacitor FCM for Chị Ơi! Tasker App
// DEBUG VERSION — thêm alert để trace lỗi
(function() {
  'use strict';

  async function initPush() {
    // Step 1: Check Capacitor
    if (typeof Capacitor === 'undefined') {
      console.log('[Push] Capacitor undefined');
      return;
    }
    
    if (!Capacitor.isNativePlatform()) {
      console.log('[Push] Not native platform');
      return;
    }

    // Step 2: Check plugin
    var PushNotifications = null;
    try {
      PushNotifications = Capacitor.Plugins.PushNotifications;
    } catch(e) {
      alert('[Push DEBUG] Error accessing plugin: ' + e.message);
      return;
    }

    if (!PushNotifications) {
      alert('[Push DEBUG] PushNotifications plugin = null. Plugins available: ' + Object.keys(Capacitor.Plugins).join(', '));
      return;
    }

    try {
      // Step 3: Request permission
      alert('[Push DEBUG] Requesting permission...');
      var permission = await PushNotifications.requestPermissions();
      alert('[Push DEBUG] Permission result: ' + JSON.stringify(permission));
      
      if (permission.receive !== 'granted') {
        alert('[Push DEBUG] Permission NOT granted: ' + permission.receive);
        return;
      }

      // Step 4: Register
      await PushNotifications.register();
      alert('[Push DEBUG] Register called OK');

      // Step 5: Listen for token
      PushNotifications.addListener('registration', async function(token) {
        console.log('[Push] FCM Token:', token.value);
        alert('[Push DEBUG] Got token: ' + token.value.substring(0, 20) + '...');
        
        var storedToken = localStorage.getItem('chioi_fcm_token');
        if (storedToken !== token.value) {
          try {
            var platform = Capacitor.getPlatform();
            await apiFetch('/api/push/register-device', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: token.value, platform: platform }),
            });
            localStorage.setItem('chioi_fcm_token', token.value);
            alert('[Push DEBUG] Token registered with server OK!');
          } catch (err) {
            alert('[Push DEBUG] Failed to register token: ' + err.message);
          }
        }
      });

      // Lỗi đăng ký
      PushNotifications.addListener('registrationError', function(err) {
        alert('[Push DEBUG] Registration ERROR: ' + JSON.stringify(err));
      });

      // Nhận notification foreground
      PushNotifications.addListener('pushNotificationReceived', function(notification) {
        console.log('[Push] Notification received:', notification);
        if (typeof showToastMsg === 'function') {
          showToastMsg(notification.title + ': ' + notification.body, 'info');
        }
      });

      // Tap notification
      PushNotifications.addListener('pushNotificationActionPerformed', function(action) {
        console.log('[Push] Notification tapped:', action);
        var data = action.notification.data;
        if (data && data.order_id) {
          window.location.href = 'trangchutasker.html';
        }
      });

    } catch (err) {
      alert('[Push DEBUG] Init error: ' + err.message);
    }
  }

  // Đợi 3 giây cho Capacitor bridge
  function waitAndInit() {
    setTimeout(function() {
      if (typeof Capacitor !== 'undefined') {
        alert('[Push DEBUG] Capacitor found! Platform: ' + Capacitor.getPlatform() + ', Native: ' + Capacitor.isNativePlatform());
        if (Capacitor.isNativePlatform()) {
          initPush();
        }
      } else {
        alert('[Push DEBUG] Capacitor NOT found after 3s wait');
      }
    }, 3000);
  }

  if (document.readyState === 'complete') {
    waitAndInit();
  } else {
    window.addEventListener('load', waitAndInit);
  }
})();
