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

// Route to get leaderboard (latest entry per user)
router.get('/leaderboard', (req, res) => {
  const query = `
    SELECT 
      u.username, 
      l.score, 
      l.started_at, 
      l.completed_at,
      l.time_taken
    FROM leaderboard l
    JOIN users u ON l.user_id = u.id
    INNER JOIN (
      SELECT user_id, MAX(id) AS latest_id
      FROM leaderboard
      GROUP BY user_id
    ) latest ON latest.latest_id = l.id
    ORDER BY l.score DESC, l.time_taken ASC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Leaderboard DB Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    res.status(200).json({ success: true, data: results });
  });
});

module.exports = router;
