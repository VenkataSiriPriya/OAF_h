const express = require('express');
const router = express.Router();
const pool = require('../db'); // ✅ Use the shared connection pool
require('dotenv').config();    // Optional here (best to keep only in server.js)

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
