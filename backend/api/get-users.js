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

// Route to get all users and their quiz scores
router.get('/admin/users', (req, res) => {
  const query = `
    SELECT u.username, q.score, q.played_at
    FROM users u
    LEFT JOIN quiz_scores q ON u.id = q.user_id
    ORDER BY q.played_at DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    res.status(200).json({ success: true, users: results });
  });
});

module.exports = router;
