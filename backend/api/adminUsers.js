// api/adminUsers.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Latest quiz per user with time taken
router.get('/admin/users', (req, res) => {
  const query = `
    SELECT 
      u.username,
      q.score,
      q.played_at,
      q.started_at,
      q.completed_at,
      TIMESTAMPDIFF(SECOND, q.started_at, q.completed_at) AS time_taken
    FROM users u
    LEFT JOIN (
      SELECT qs1.*
      FROM quiz_scores qs1
      JOIN (
        SELECT user_id, MAX(played_at) AS latest
        FROM quiz_scores
        GROUP BY user_id
      ) qs2 ON qs1.user_id = qs2.user_id AND qs1.played_at = qs2.latest
    ) q ON u.id = q.user_id
    ORDER BY q.played_at DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    res.status(200).json({ success: true, users: results });
  });
});

module.exports = router;
