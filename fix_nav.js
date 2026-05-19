const fs = require('fs');
const path = require('path');
const dirs = ['khachhang', 'giupviec'];
for (const dir of dirs) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  for (const file of files) {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf-8');
    if (content.includes('<nav-w-md')) {
      content = content.replace(/<nav-w-md md:max-w-4xl/g, '<nav class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md md:max-w-4xl');
      fs.writeFileSync(p, content);
      console.log('Fixed nav in ' + p);
    }
  }
}
