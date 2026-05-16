/**
 * CHỊ ƠI! — Smart Prefetch + Instant Navigation
 * Tự động tải trước các trang user có thể navigate tới.
 * 
 * Features:
 * 1. Auto-prefetch: Tải trước tất cả link trong nav/sidebar khi browser idle
 * 2. Hover prefetch: Tải trước khi user hover link (anticipation ~200ms)
 * 3. Touch prefetch: Tải trước khi user touchstart trên mobile
 * 4. Respects: Data Saver mode, slow 2G connections
 * 
 * Sử dụng: <script src="../shared/prefetch.js" defer></script>
 */
(function() {
  'use strict';

  // Skip nếu connection yếu hoặc data saver
  var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g')) {
    console.log('[Prefetch] Skipped — slow connection or data saver');
    return;
  }

  var prefetched = {};
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // ============================================================
  // Core: Prefetch một URL
  // ============================================================
  function prefetchURL(href) {
    if (!href || prefetched[href]) return;
    // Chỉ prefetch file HTML cùng thư mục
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:')
        || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (href === currentPage) return;

    prefetched[href] = true;

    // Ưu tiên dùng <link rel="prefetch"> — browser quản lý priority
    var link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = 'document';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  // ============================================================
  // 1. Auto-prefetch: Nav links khi browser idle
  // ============================================================
  function autoPrefetchNavLinks() {
    // Ưu tiên bottom nav (mobile) + sidebar (admin)
    var navLinks = document.querySelectorAll('nav a[href], aside nav a[href]');
    var count = 0;

    navLinks.forEach(function(a) {
      var href = a.getAttribute('href');
      if (href && !href.startsWith('http')) {
        prefetchURL(href);
        count++;
      }
    });

    console.log('[Prefetch] Auto-prefetched ' + count + ' nav links');
  }

  // ============================================================
  // 2. Hover prefetch: Tải trước khi user hover (~300ms intent)
  // ============================================================
  var hoverTimer = null;

  document.addEventListener('mouseover', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href || prefetched[href]) return;

    // Chờ 65ms để xác nhận intent (không phải lướt qua)
    hoverTimer = setTimeout(function() {
      prefetchURL(href);
    }, 65);
  }, { passive: true });

  document.addEventListener('mouseout', function(e) {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
  }, { passive: true });

  // ============================================================
  // 3. Touch prefetch: Tải ngay khi touchstart (mobile)
  // ============================================================
  document.addEventListener('touchstart', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (href) prefetchURL(href);
  }, { passive: true });

  // ============================================================
  // 4. Intersection Observer: Prefetch khi link xuất hiện viewport
  // ============================================================
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var href = entry.target.getAttribute('href');
          if (href) prefetchURL(href);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });

    // Observe tất cả link có data-prefetch hoặc trong main content
    setTimeout(function() {
      document.querySelectorAll('main a[href$=".html"], [data-prefetch]').forEach(function(a) {
        observer.observe(a);
      });
    }, 1000);
  }

  // ============================================================
  // Khởi động: Chờ browser idle rồi mới prefetch
  // ============================================================
  if ('requestIdleCallback' in window) {
    requestIdleCallback(autoPrefetchNavLinks, { timeout: 3000 });
  } else {
    setTimeout(autoPrefetchNavLinks, 2000);
  }

})();
