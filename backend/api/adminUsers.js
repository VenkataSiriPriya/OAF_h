// api/adminUsers.js
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

// Latest quiz per user with time taken
router.get('/admin/users', async (req, res) => {
  const query = `
    SELECT 
      u.username,
      q.score,
      q.played_at,
      q.started_at,
      q.completed_at,
      EXTRACT(EPOCH FROM (q.completed_at - q.started_at)) AS time_taken
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

  try {
    const { rows } = await pool.query(query);
    res.status(200).json({ success: true, users: rows });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
