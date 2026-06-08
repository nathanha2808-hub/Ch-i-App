/**
 * Chị Ơi! — Sync Frontend → Capacitor www/
 * Copy tất cả frontend files (giupviec, khachhang, shared, assets) vào www/
 * Chạy TRƯỚC `npx cap sync` để bundle frontend vào app.
 *
 * Usage: node sync-frontend.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');  // Ch-i-App/
const WWW  = path.resolve(__dirname, 'www'); // mobile-ios/www/

// Danh sách thư mục/file cần copy
const COPY_MAP = [
  // { src: relative from ROOT, dest: relative from WWW }
  { src: 'giupviec',       dest: 'giupviec' },
  { src: 'khachhang',      dest: 'khachhang' },
  { src: 'shared',         dest: 'shared' },
  { src: 'assets/images',  dest: 'assets/images' },
  { src: 'icons',          dest: 'icons' },
  { src: 'sw.js',          dest: 'sw.js' },
  { src: 'pwa-register.js', dest: 'pwa-register.js' },
  { src: 'manifest.json',  dest: 'manifest.json' },
  { src: 'favicon.ico',    dest: 'favicon.ico' },
  { src: 'favicon-32.png', dest: 'favicon-32.png' },
  { src: 'apple-touch-icon.png', dest: 'apple-touch-icon.png' },
];

// Tạo thư mục đệ quy
function mkdirSafe(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copy file hoặc thư mục đệ quy
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`  ⚠️ Skip (not found): ${src}`);
    return 0;
  }

  const stat = fs.statSync(src);

  if (stat.isFile()) {
    mkdirSafe(path.dirname(dest));
    fs.copyFileSync(src, dest);
    return 1;
  }

  if (stat.isDirectory()) {
    mkdirSafe(dest);
    let count = 0;
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      // Skip node_modules, .git, hidden files
      if (entry.startsWith('.') || entry === 'node_modules') continue;
      count += copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return count;
  }
  return 0;
}

// ====== MAIN ======
console.log('🔄 Sync Frontend → www/');
console.log(`   ROOT: ${ROOT}`);
console.log(`   WWW:  ${WWW}`);
console.log('');

// Xóa www/ cũ (trừ capacitor files)
if (fs.existsSync(WWW)) {
  const keep = ['capacitor_plugins.js', 'native-bridge.js'];
  const entries = fs.readdirSync(WWW);
  for (const entry of entries) {
    if (keep.includes(entry)) continue;
    const fullPath = path.join(WWW, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(fullPath);
    }
  }
  console.log('🗑️  Cleaned old www/ (kept Capacitor native files)');
}

mkdirSafe(WWW);

// Copy từng item
let totalFiles = 0;
for (const item of COPY_MAP) {
  const srcPath = path.join(ROOT, item.src);
  const destPath = path.join(WWW, item.dest);
  const count = copyRecursive(srcPath, destPath);
  console.log(`  ✅ ${item.src} → www/${item.dest} (${count} files)`);
  totalFiles += count;
}

// Tạo index.html redirect
const indexHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Chị Ơi!</title>
<style>
body { margin:0; background:linear-gradient(135deg,#ff7e36,#a04100); height:100vh; display:flex; align-items:center; justify-content:center; font-family:-apple-system,sans-serif; color:#fff; }
.box { text-align:center; }
.spinner { width:48px; height:48px; border:4px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.8s linear infinite; margin:0 auto 16px; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
</head>
<body>
<div class="box">
<div class="spinner"></div>
<h2>Chị Ơi! Người giúp việc</h2>
<p>Đang khởi động...</p>
</div>
<script>
// Redirect tới trang chính
window.location.replace('giupviec/trangchutasker.html');
</script>
</body>
</html>`;
fs.writeFileSync(path.join(WWW, 'index.html'), indexHtml);
totalFiles++;

console.log('');
console.log(`✅ Sync hoàn thành! ${totalFiles} files → www/`);
