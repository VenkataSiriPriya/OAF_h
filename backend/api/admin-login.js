const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// POST /api/admin-login
router.post('/admin-login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM admins WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (results.length > 0) {
      return res.json({ success: true, message: 'Login successful', name: results[0].username });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

module.exports = router;
