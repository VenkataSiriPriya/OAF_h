const express = require('express');
const router = express.Router();
const pool = require('../db'); // PostgreSQL pool connection

// GET /api/leaderboard
router.get('/leaderboard', async (req, res) => {
  const query = `
    SELECT 
      u.username, 
      q.score, 
      q.started_at, 
      q.completed_at,
      EXTRACT(EPOCH FROM (q.completed_at - q.started_at)) AS time_taken
    FROM quiz_scores q
    JOIN users u ON q.user_id = u.id
    INNER JOIN (
      SELECT user_id, MAX(played_at) AS latest_play
      FROM quiz_scores
      GROUP BY user_id
    ) latest ON latest.user_id = q.user_id AND latest.latest_play = q.played_at
    ORDER BY q.score DESC, time_taken ASC;
  `;

  try {
    const { rows } = await pool.query(query);
    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error("Leaderboard DB Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message // Show exact DB error
    });
  }
});

module.exports = router;
