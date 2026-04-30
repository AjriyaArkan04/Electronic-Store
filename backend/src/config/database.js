const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => console.log('PostgreSQL connected'))
  .catch((err) => console.error('DB error:', err));

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};