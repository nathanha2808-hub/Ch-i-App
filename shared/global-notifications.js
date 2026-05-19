/**
 * CHỊ ƠI! — Global Notifications
 * Load trên TẤT CẢ trang. Cung cấp:
 *   1. Incoming call popup (hiện cuộc gọi đến ở MỌI màn hình)
 *   2. Chat message bubble (floating notification kiểu Messenger)
 *
 * Yêu cầu: api.js phải được load trước (cung cấp API_BASE, ChiOiAuth, apiFetch)
 */
(function() {
  'use strict';

  // ===== Guard: Chỉ chạy khi đã đăng nhập =====
  if (typeof ChiOiAuth === 'undefined') return;
  var user = ChiOiAuth.getUser();
  var token = ChiOiAuth.getToken();
  if (!user || !token) return;

  // ===== Detect trang hiện tại =====
  var path = window.location.pathname.toLowerCase();
  var isChatPage = path.indexOf('chatvoitasker') !== -1 || path.indexOf('chatvoikhachhang') !== -1;
  var isCustomerSide = path.indexOf('/khachhang/') !== -1 || user.role === 'CUSTOMER';
  var isTaskerSide = path.indexOf('/giupviec/') !== -1 || user.role === 'TASKER';

  // ===== State =====
  var globalSocket = null;
  var activeCallData = null;    // { callerId, orderId }
  var unreadMessages = [];      // [{ order_id, sender_id, content, created_at }]
  var ringtoneInterval = null;
  var audioCtx = null;

  // ===== 1. INJECT CSS =====
  var css = document.createElement('style');
  css.textContent = [
    '/* ===== Global Call Popup ===== */',
    '#chioi-call-overlay{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.85);display:none;flex-direction:column;align-items:center;justify-content:center;font-family:"Be Vietnam Pro",sans-serif;animation:chioi-fade-in .3s ease}',
    '#chioi-call-overlay.active{display:flex}',
    '#chioi-call-overlay .call-card{background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:28px;padding:32px 28px;text-align:center;max-width:320px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.5)}',
    '#chioi-call-overlay .call-avatar{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#ff7e36,#a04100);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;border:3px solid rgba(255,255,255,0.2);animation:chioi-pulse 2s infinite}',
    '#chioi-call-overlay .call-avatar span{font-size:40px;color:#fff}',
    '#chioi-call-overlay .call-label{color:#ff7e36;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px}',
    '#chioi-call-overlay .call-name{color:#fff;font-size:20px;font-weight:700;margin-bottom:4px}',
    '#chioi-call-overlay .call-sub{color:rgba(255,255,255,0.6);font-size:13px;margin-bottom:28px}',
    '#chioi-call-overlay .call-actions{display:flex;gap:20px;justify-content:center}',
    '#chioi-call-overlay .call-btn{width:64px;height:64px;border-radius:50%;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .2s,box-shadow .2s}',
    '#chioi-call-overlay .call-btn:active{transform:scale(0.9)}',
    '#chioi-call-overlay .call-btn.reject{background:#ef4444;box-shadow:0 4px 20px rgba(239,68,68,0.4)}',
    '#chioi-call-overlay .call-btn.accept{background:#22c55e;box-shadow:0 4px 20px rgba(34,197,94,0.4)}',
    '#chioi-call-overlay .call-btn span{font-size:28px;color:#fff}',
    '#chioi-call-overlay .call-btn-label{color:rgba(255,255,255,0.7);font-size:11px;text-align:center;margin-top:6px}',
    '',
    '/* ===== Chat Bubble ===== */',
    '#chioi-chat-bubble{position:fixed;bottom:90px;right:16px;z-index:99998;font-family:"Be Vietnam Pro",sans-serif}',
    '#chioi-chat-bubble .bubble-icon{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#ff7e36,#a04100);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 20px rgba(160,65,0,0.35);transition:transform .2s;position:relative}',
    '#chioi-chat-bubble .bubble-icon:active{transform:scale(0.9)}',
    '#chioi-chat-bubble .bubble-icon span{font-size:26px;color:#fff}',
    '#chioi-chat-bubble .bubble-badge{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;border-radius:10px;background:#ef4444;color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 5px;border:2px solid #fff;display:none}',
    '#chioi-chat-bubble .bubble-badge.show{display:flex;animation:chioi-bounce .5s ease}',
    '',
    '#chioi-chat-toast{position:fixed;bottom:150px;right:16px;z-index:99997;background:#fff;border-radius:16px;padding:12px 16px;box-shadow:0 8px 30px rgba(0,0,0,0.15);max-width:280px;display:none;font-family:"Be Vietnam Pro",sans-serif;border-left:4px solid #ff7e36;cursor:pointer;animation:chioi-slide-up .3s ease}',
    '#chioi-chat-toast.show{display:block}',
    '#chioi-chat-toast .toast-sender{font-size:13px;font-weight:700;color:#a04100;margin-bottom:2px}',
    '#chioi-chat-toast .toast-content{font-size:13px;color:#333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:240px}',
    '#chioi-chat-toast .toast-time{font-size:10px;color:#999;margin-top:2px}',
    '',
    '/* ===== Animations ===== */',
    '@keyframes chioi-fade-in{from{opacity:0}to{opacity:1}}',
    '@keyframes chioi-pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,126,54,0.4)}50%{box-shadow:0 0 0 20px rgba(255,126,54,0)}}',
    '@keyframes chioi-bounce{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}',
    '@keyframes chioi-slide-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}'
  ].join('\n');
  document.head.appendChild(css);

  // ===== 2. INJECT HTML: Call Popup =====
  var callOverlay = document.createElement('div');
  callOverlay.id = 'chioi-call-overlay';
  callOverlay.innerHTML =
    '<div class="call-card">' +
      '<div class="call-label">📞 CUỘC GỌI ĐẾN</div>' +
      '<div class="call-avatar"><span class="material-symbols-outlined">person</span></div>' +
      '<div class="call-name" id="chioi-call-name">Đang tải...</div>' +
      '<div class="call-sub" id="chioi-call-sub">Đơn hàng</div>' +
      '<div class="call-actions">' +
        '<div style="text-align:center">' +
          '<button class="call-btn reject" id="chioi-call-reject"><span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">call_end</span></button>' +
          '<div class="call-btn-label">Từ chối</div>' +
        '</div>' +
        '<div style="text-align:center">' +
          '<button class="call-btn accept" id="chioi-call-accept"><span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">call</span></button>' +
          '<div class="call-btn-label">Nghe máy</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(callOverlay);

  // ===== 3. INJECT HTML: Chat Bubble =====
  var chatBubble = document.createElement('div');
  chatBubble.id = 'chioi-chat-bubble';
  chatBubble.style.display = 'none'; // Ẩn mặc định, hiện khi có tin nhắn
  chatBubble.innerHTML =
    '<div class="bubble-icon" id="chioi-bubble-btn">' +
      '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">chat</span>' +
      '<span class="bubble-badge" id="chioi-bubble-badge">0</span>' +
    '</div>';
  // Không hiện trên trang chat
  if (!isChatPage) {
    document.body.appendChild(chatBubble);
  }

  // Toast tin nhắn
  var chatToast = document.createElement('div');
  chatToast.id = 'chioi-chat-toast';
  chatToast.innerHTML =
    '<div class="toast-sender" id="chioi-toast-sender">Tin nhắn mới</div>' +
    '<div class="toast-content" id="chioi-toast-content"></div>' +
    '<div class="toast-time" id="chioi-toast-time"></div>';
  if (!isChatPage) {
    document.body.appendChild(chatToast);
  }

  // ===== 4. SOCKET CONNECTION =====
  function initSocket() {
    if (typeof io === 'undefined') return;
    if (window._chiOiGlobalSocket) {
      globalSocket = window._chiOiGlobalSocket;
    } else {
      var base = (typeof API_BASE !== 'undefined') ? API_BASE : window.location.origin;
      globalSocket = io(base, {
        auth: { token: token },
        transports: ['websocket', 'polling']
      });
      window._chiOiGlobalSocket = globalSocket;
    }

    // ===== CALL INCOMING =====
    if (!isChatPage) {
      globalSocket.on('call_incoming', function(data) {
        showCallPopup(data.callerId, data.orderId);
      });

      globalSocket.on('call_ended', function() {
        hideCallPopup();
      });

      globalSocket.on('call_rejected', function() {
        hideCallPopup();
      });
    }

    // ===== MESSAGE RECEIVED =====
    if (!isChatPage) {
      globalSocket.on('receive_message', function(msg) {
        if (Number(msg.sender_id) === Number(user.user_id)) return; // Bỏ qua tin mình gửi
        showMessageNotification(msg);
      });
    }
  }

  // ===== 5. CALL POPUP LOGIC =====
  function showCallPopup(callerId, orderId) {
    activeCallData = { callerId: callerId, orderId: orderId };

    // Cập nhật UI
    var nameEl = document.getElementById('chioi-call-name');
    var subEl = document.getElementById('chioi-call-sub');
    if (nameEl) nameEl.textContent = 'Đang tải...';
    if (subEl) subEl.textContent = 'Đơn #' + orderId;

    // Fetch tên người gọi từ order
    if (typeof apiFetch !== 'undefined') {
      apiFetch('/api/orders/' + orderId).then(function(order) {
        var callerName = '';
        if (isCustomerSide && order.taskers && order.taskers.users) {
          callerName = order.taskers.users.full_name || 'Tasker';
        } else if (isTaskerSide && order.customers && order.customers.users) {
          callerName = order.customers.users.full_name || 'Khách hàng';
        } else {
          callerName = 'Người dùng';
        }
        if (nameEl) nameEl.textContent = callerName;

        var serviceName = (order.services && order.services.name) || 'Dịch vụ';
        if (subEl) subEl.textContent = 'Đơn: ' + serviceName + ' · #' + orderId;
      }).catch(function() {
        if (nameEl) nameEl.textContent = isCustomerSide ? 'Tasker' : 'Khách hàng';
      });
    }

    // Hiện overlay
    callOverlay.classList.add('active');

    // Phát chuông
    playRingtone();

    // Auto-dismiss sau 30s
    setTimeout(function() {
      if (activeCallData && activeCallData.orderId === orderId) {
        hideCallPopup();
      }
    }, 30000);
  }

  function hideCallPopup() {
    callOverlay.classList.remove('active');
    activeCallData = null;
    stopRingtone();
  }

  // Nút Từ chối
  document.getElementById('chioi-call-reject').addEventListener('click', function() {
    if (activeCallData && globalSocket) {
      globalSocket.emit('call_rejected', { callerId: activeCallData.callerId });
    }
    hideCallPopup();
  });

  // Nút Nghe máy → Redirect sang trang chat + autoAcceptCall
  document.getElementById('chioi-call-accept').addEventListener('click', function() {
    if (!activeCallData) return;
    stopRingtone();

    var orderId = activeCallData.orderId;
    var callerId = activeCallData.callerId;

    // Xác định trang chat dựa theo role
    var chatPage = '';
    if (isCustomerSide) {
      chatPage = '/khachhang/chatvoitasker.html';
    } else if (isTaskerSide) {
      chatPage = '/giupviec/chatvoikhachhang.html';
    }

    // Redirect với params để auto-accept
    var url = chatPage + '?orderId=' + orderId + '&receiverId=' + callerId + '&autoAcceptCall=true&callerId=' + callerId;
    window.location.href = url;
  });

  // ===== 6. CHAT BUBBLE LOGIC =====
  var lastMessageData = null; // Lưu tin nhắn gần nhất để redirect khi click bubble
  var toastTimer = null;

  function showMessageNotification(msg) {
    lastMessageData = msg;

    // Cập nhật badge
    unreadMessages.push(msg);
    var badge = document.getElementById('chioi-bubble-badge');
    var bubbleEl = document.getElementById('chioi-chat-bubble');
    if (badge) {
      badge.textContent = unreadMessages.length > 9 ? '9+' : String(unreadMessages.length);
      badge.classList.add('show');
    }
    if (bubbleEl) {
      bubbleEl.style.display = 'block';
    }

    // Hiện toast preview
    var content = msg.content || '';
    if (content.startsWith('[IMG]')) content = '📷 Hình ảnh';

    var toastSender = document.getElementById('chioi-toast-sender');
    var toastContent = document.getElementById('chioi-toast-content');
    var toastTime = document.getElementById('chioi-toast-time');

    if (toastSender) toastSender.textContent = '💬 Tin nhắn mới';
    if (toastContent) toastContent.textContent = content;
    if (toastTime) toastTime.textContent = 'Vừa xong';

    // Fetch tên người gửi nếu có
    if (typeof apiFetch !== 'undefined' && msg.order_id) {
      apiFetch('/api/orders/' + msg.order_id).then(function(order) {
        var senderName = '';
        if (isCustomerSide && order.taskers && order.taskers.users) {
          senderName = order.taskers.users.full_name || 'Tasker';
        } else if (isTaskerSide && order.customers && order.customers.users) {
          senderName = order.customers.users.full_name || 'Khách hàng';
        }
        if (senderName && toastSender) toastSender.textContent = '💬 ' + senderName;
      }).catch(function() {});
    }

    // Hiện toast
    chatToast.classList.add('show');

    // Phát âm thông báo nhẹ
    playMessageSound();

    // Vibrate nếu mobile
    if (navigator.vibrate) {
      try { navigator.vibrate([200]); } catch(e) {}
    }

    // Tự ẩn toast sau 4 giây
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      chatToast.classList.remove('show');
    }, 4000);
  }

  // Click toast → mở chat
  chatToast.addEventListener('click', function() {
    navigateToChat();
  });

  // Click bubble → mở chat
  var bubbleBtn = document.getElementById('chioi-bubble-btn');
  if (bubbleBtn) {
    bubbleBtn.addEventListener('click', function() {
      navigateToChat();
    });
  }

  function navigateToChat() {
    if (!lastMessageData) return;
    var orderId = lastMessageData.order_id;
    var receiverId = lastMessageData.sender_id;

    var chatPage = '';
    if (isCustomerSide) {
      chatPage = '/khachhang/chatvoitasker.html';
    } else if (isTaskerSide) {
      chatPage = '/giupviec/chatvoikhachhang.html';
    }

    window.location.href = chatPage + '?orderId=' + orderId + '&receiverId=' + receiverId;
  }

  // ===== 7. SOUND HELPERS =====
  function getAudioContext() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch(e) {}
    }
    return audioCtx;
  }

  function playRingtone() {
    stopRingtone();
    var ctx = getAudioContext();
    if (!ctx) return;

    ringtoneInterval = setInterval(function() {
      try {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.setValueAtTime(600, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } catch(e) {}
    }, 1000);
  }

  function stopRingtone() {
    if (ringtoneInterval) {
      clearInterval(ringtoneInterval);
      ringtoneInterval = null;
    }
  }

  function playMessageSound() {
    var ctx = getAudioContext();
    if (!ctx) return;
    try {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.setValueAtTime(1600, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch(e) {}
  }

  // ===== 8. INIT =====
  function tryInit() {
    if (typeof io !== 'undefined') {
      initSocket();
    } else {
      // Dynamically load Socket.IO
      var script = document.createElement('script');
      script.src = 'https://cdn.socket.io/4.7.5/socket.io.min.js';
      script.onload = function() { initSocket(); };
      script.onerror = function() { console.warn('[GlobalNotif] Socket.IO CDN load failed'); };
      document.head.appendChild(script);
    }
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }
})();
