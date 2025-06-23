const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

// Route to get leaderboard (latest entry per user)
router.get('/leaderboard', async (req, res) => {
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

  try {
    const { rows } = await pool.query(query);
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error("Leaderboard DB Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
