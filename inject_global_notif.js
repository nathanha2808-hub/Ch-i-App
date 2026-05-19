/**
 * Script inject global-notifications.js vào tất cả trang HTML
 * Chạy: node inject_global_notif.js
 */
const fs = require('fs');
const path = require('path');

const dirs = ['khachhang', 'giupviec'];
const scriptTag = '<script src="../shared/global-notifications.js" defer></script>';
let count = 0;

for (const dir of dirs) {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) continue;

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Skip nếu đã có
    if (content.includes('global-notifications.js')) {
      console.log('  [SKIP] ' + dir + '/' + file + ' (đã có)');
      continue;
    }

    // Chèn trước </body>
    if (content.includes('</body>')) {
      content = content.replace('</body>', scriptTag + '\n</body>');
      fs.writeFileSync(filePath, content);
      console.log('  [OK]   ' + dir + '/' + file);
      count++;
    } else {
      console.log('  [WARN] ' + dir + '/' + file + ' (không tìm thấy </body>)');
    }
  }
}

console.log('\nĐã inject vào ' + count + ' file.');
