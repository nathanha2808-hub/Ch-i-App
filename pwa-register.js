// Chị Ơi! — PWA registration helper
// Inject vào trang nào cần PWA: <script src="/pwa-register.js" defer></script>
// Trang đầu tiên user vào sẽ tự register SW + show install prompt nếu eligible.

(function() {
  if (!('serviceWorker' in navigator)) return;

  // Register SW khi trang load xong
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(function(reg) {
        console.log('[PWA] SW registered scope:', reg.scope);

        // Check update mỗi 1 giờ
        setInterval(function() { reg.update().catch(() => {}); }, 60 * 60 * 1000);

        // TC-T09-025 FIX: Auto-subscribe Push Notification nếu đã login
        subscribePushIfLoggedIn(reg);

        // Khi có version mới: prompt user reload
        reg.addEventListener('updatefound', function() {
          var newSW = reg.installing;
          if (!newSW) return;
          newSW.addEventListener('statechange', function() {
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              if (typeof showToastMsg === 'function') {
                showToastMsg('Có phiên bản mới — tải lại để cập nhật', 5000);
              }
            }
          });
        });
      })
      .catch(function(err) { console.warn('[PWA] SW register fail:', err); });
  });

  // Install prompt — capture event để show button "Cài app"
  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    window.__chioi_install_ready = true;
    console.log('[PWA] Install prompt sẵn sàng — gọi window.__chioi_install() để hiện');
  });

  // Public function — gọi từ HTML để trigger install: <button onclick="__chioi_install()">Cài app</button>
  window.__chioi_install = function() {
    if (!deferredPrompt) {
      if (typeof showToastMsg === 'function') {
        showToastMsg('Trình duyệt chưa sẵn sàng — vui lòng thử lại sau hoặc dùng "Add to Home Screen" thủ công');
      }
      return;
    }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choice) {
      console.log('[PWA] User choice:', choice.outcome);
      deferredPrompt = null;
      window.__chioi_install_ready = false;
    });
  };

  // Track installed
  window.addEventListener('appinstalled', function() {
    console.log('[PWA] App installed');
    if (typeof showToastMsg === 'function') showToastMsg('Đã cài Chị Ơi! lên màn hình chính');
  });

  // TC-T09-025 + TC-T13-023 FIX: Subscribe Push Notification
  function subscribePushIfLoggedIn(registration) {
    // Chỉ subscribe nếu đã login (có token)
    var token = localStorage.getItem('chioi_token');
    if (!token) return;
    // Không subscribe lại nếu đã subscribe
    if (localStorage.getItem('chioi_push_subscribed') === 'true') return;

    // Xin quyền Notification
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(function(perm) {
        if (perm === 'granted') doSubscribe(registration, token);
      });
    } else if (Notification.permission === 'granted') {
      doSubscribe(registration, token);
    }
  }

  function doSubscribe(registration, token) {
    // VAPID public key — backend cần generate cặp key (TODO: thay bằng key thật)
    var vapidPublicKey = window.__CHIOI_VAPID_PUBLIC_KEY || 'BBOD8FqSbFjxAx-lthqPGfvJXrX3ihmmSDQqZZqQPJNjs0g5DqrwPGPoUWfEiY2kNj4R4AwO6u56ZmEHhFKWCjY';
    try {
      var convertedKey = urlBase64ToUint8Array(vapidPublicKey);
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey,
      }).then(function(sub) {
        // Gửi subscription info lên backend
        var API_BASE = window.__CHIOI_API_BASE || 'http://127.0.0.1:3000';
        fetch(API_BASE + '/api/push/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(sub),
        }).then(function() {
          localStorage.setItem('chioi_push_subscribed', 'true');
          console.log('[PWA] Push subscribed successfully');
        }).catch(function(err) {
          console.warn('[PWA] Failed to send push subscription to server:', err);
        });
      }).catch(function(err) {
        console.warn('[PWA] Push subscribe failed:', err);
      });
    } catch (e) {
      console.warn('[PWA] Push setup error:', e);
    }
  }

  // Helper: convert VAPID key to Uint8Array
  function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    var rawData = atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
})();
