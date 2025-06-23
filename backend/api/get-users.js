const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Get username, score, time_taken from users + leaderboard
router.get('/api/users', (req, res) => {
  const query = `
    SELECT u.username, l.score, l.time_taken
    FROM users u
    JOIN leaderboard l ON u.id = l.user_id
    WHERE l.id IN (
      SELECT MAX(id)
      FROM leaderboard
      GROUP BY user_id
    )
    ORDER BY l.score DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(results);
  });
});

module.exports = router;
