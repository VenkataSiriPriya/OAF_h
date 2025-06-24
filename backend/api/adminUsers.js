const express = require('express');
const router = express.Router();
const pool = require('../db');
require('dotenv').config();

// Get latest quiz per user
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

// ✅ DELETE route to remove user and scores
router.delete('/admin/users/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const userRes = await pool.query('SELECT id FROM users WHERE username = $1', [username]);

    if (userRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const userId = userRes.rows[0].id;

    await pool.query('DELETE FROM quiz_scores WHERE user_id = $1', [userId]);
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);

    return res.json({ success: true, message: `User '${username}' and scores deleted.` });
  } catch (err) {
    console.error('Error deleting user:', err);
    return res.status(500).json({ success: false, message: 'Server error during delete' });
  }
});

module.exports = router;
