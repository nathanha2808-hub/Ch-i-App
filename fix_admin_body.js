const fs = require('fs');
const path = require('path');
const dir = 'admin';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'dangnhapadmin.html');
for (const f of files) {
  const p = path.join(dir, f);
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/<body class="([^"]*)"/, (match, classes) => {
    if (!classes.includes('min-w-[1280px]')) {
      return `<body class="${classes} min-w-[1280px] overflow-x-auto"`;
    }
    return match;
  });
  fs.writeFileSync(p, c, 'utf8');
}
console.log('Fixed body tags in admin HTML files.');
