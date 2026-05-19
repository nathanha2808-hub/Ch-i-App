const fs = require('fs');
const files = fs.readdirSync('khachhang').filter(f => f.endsWith('.html'));
const searchRegex = /<span\s+class=.absolute -top-1 left-1\/2 ml-1 bg-secondary text-white text-\[8px\] w-4 h-4 rounded-full flex items-center justify-center font-bold.>\s*3\s*<\/span>/g;
const replaceStr = '<span id=\"global-notif-badge\" style=\"display:none\" class=\"absolute -top-1 left-1/2 ml-1 bg-secondary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold\">0</span>';
let count = 0;
files.forEach(f => {
  const path = 'khachhang/' + f;
  let content = fs.readFileSync(path, 'utf8');
  if (searchRegex.test(content)) {
    content = content.replace(searchRegex, replaceStr);
    fs.writeFileSync(path, content);
    console.log('Fixed ' + f);
    count++;
  }
});
console.log('Total fixed: ' + count);
