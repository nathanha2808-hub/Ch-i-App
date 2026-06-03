// Push Notification Init — Chị Ơi! Tasker App
// Nhận FCM token từ native AppDelegate và gửi về backend
(function() {
  'use strict';

  var registered = false;

  function sendTokenToBackend(token, platform) {
    if (registered) return;
    
    // Lấy auth token từ localStorage
    var authToken = localStorage.getItem('chioi_token');
    if (!authToken) {
      console.log('[Push] No auth token, retry in 5s');
      setTimeout(function() { sendTokenToBackend(token, platform); }, 5000);
      return;
    }

    var apiBase = window.__CHIOI_API_BASE || '';
    
    fetch(apiBase + '/api/push/register-device', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
      body: JSON.stringify({ token: token, platform: platform })
    })
    .then(function(res) {
      if (res.ok) {
        registered = true;
        localStorage.setItem('chioi_fcm_token', token);
        console.log('[Push] FCM token registered with backend OK');
      } else {
        console.warn('[Push] Backend register failed:', res.status);
      }
    })
    .catch(function(err) {
      console.error('[Push] Register error:', err);
      // Retry
      setTimeout(function() { sendTokenToBackend(token, platform); }, 10000);
    });
  }

  // Callback khi native inject FCM token
  window.__onFcmToken = function(token) {
    console.log('[Push] Received FCM token from native');
    sendTokenToBackend(token, 'ios');
  };

  // Check nếu token đã được inject trước khi script chạy
  if (window.__CHIOI_FCM_TOKEN) {
    console.log('[Push] FCM token already available');
    sendTokenToBackend(window.__CHIOI_FCM_TOKEN, 'ios');
  }

  // Fallback: dùng Capacitor plugin nếu có
  function tryCapacitorPush() {
    if (typeof Capacitor === 'undefined' || !Capacitor.isNativePlatform()) return;
    
    var PushNotifications = null;
    try {
      PushNotifications = Capacitor.Plugins.PushNotifications;
    } catch(e) { return; }
    
    if (!PushNotifications) return;

    // Listen for notifications (foreground)
    PushNotifications.addListener('pushNotificationReceived', function(notification) {
      console.log('[Push] Notification received:', notification.title);
      if (typeof showToastMsg === 'function') {
        showToastMsg(notification.title + ': ' + notification.body, 'info');
      }
    });

    // Tap notification
    PushNotifications.addListener('pushNotificationActionPerformed', function(action) {
      console.log('[Push] Notification tapped');
      var data = action.notification.data;
      if (data && data.order_id) {
        window.location.href = 'trangchutasker.html';
      }
    });
  }

  // Init sau khi page load
  function init() {
    setTimeout(function() {
      tryCapacitorPush();
      
      // Poll cho native FCM token nếu chưa có
      if (!window.__CHIOI_FCM_TOKEN && !registered) {
        var attempts = 0;
        var poll = setInterval(function() {
          attempts++;
          if (window.__CHIOI_FCM_TOKEN) {
            clearInterval(poll);
            sendTokenToBackend(window.__CHIOI_FCM_TOKEN, 'ios');
          }
          if (attempts > 30) clearInterval(poll); // Stop after 5 minutes
        }, 10000);
      }
    }, 3000);
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();
