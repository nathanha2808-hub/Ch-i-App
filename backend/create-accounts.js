const http = require('http');
function post(path, data) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
  });
}
async function create() {
  try {
    const c = await post('/api/users/register', { phone: '0901234567', password: 'password123', full_name: 'Khach Hang Test', role: 'CUSTOMER' });
    console.log('Customer:', c);
    const t = await post('/api/users/register', { phone: '0909876543', password: 'password123', full_name: 'Tasker Test', role: 'TASKER' });
    console.log('Tasker:', t);
    const a = await post('/api/users/register', { phone: '0901111111', password: 'password123', full_name: 'Admin Test', role: 'ADMIN' });
    console.log('Admin:', a);
  } catch(e) { console.error(e); }
}
create();
