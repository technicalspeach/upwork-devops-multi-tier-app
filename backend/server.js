const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 5000;

const pool = new Pool({
  host: process.env.DB_HOST || '192.168.141.129',
  user: process.env.DB_USER || 'devops_user',
  password: process.env.DB_PASSWORD || 'SecurePass123!',
  database: process.env.DB_NAME || 'upwork_db',
  port: 5432,
});

app.get('/api/status', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW()');
    res.json({ status: 'Healthy', database_time: dbRes.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'Database Connection Error', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
