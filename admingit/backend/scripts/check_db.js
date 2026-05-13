const { Pool } = require('pg');
const pool = new Pool({
  connectionString: "postgresql://postgres:postgres@127.0.0.1:5432/chioi?schema=public"
});
pool.query('SELECT 1', (err, res) => {
  if (err) {
    console.error('Connection error:', err);
  } else {
    console.log('Connection successful:', res.rows);
  }
  pool.end();
});
