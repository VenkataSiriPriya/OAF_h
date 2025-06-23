const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,  // Default PostgreSQL port
});

// POST /api/admin-login
router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM admins WHERE username = $1 AND password = $2';

  try {
    const result = await pool.query(sql, [username, password]);

    if (result.rows.length > 0) {
      return res.json({ success: true, message: 'Login successful', name: result.rows[0].username });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('DB Error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
