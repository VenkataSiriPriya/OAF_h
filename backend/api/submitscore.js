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

// Helper: format ISO datetime string to JS Date object
// (Postgres can handle ISO format directly, so no need to reformat)
router.post('/submit-score', async (req, res) => {
  const { username, score, started_at, completed_at } = req.body;

  if (!username || score === undefined || !started_at || !completed_at) {
    return res.status(400).json({ success: false, message: "Missing data" });
  }

  try {
    // Find user ID
    const userResult = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const userId = userResult.rows[0].id;

    // Insert score
    const insertQuery = `
      INSERT INTO quiz_scores (user_id, score, played_at, started_at, completed_at)
      VALUES ($1, $2, NOW(), $3, $4)
    `;

    await pool.query(insertQuery, [userId, score, started_at, completed_at]);

    res.status(200).json({ success: true, message: "Score saved successfully" });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ success: false, message: "Insert failed" });
  }
});

module.exports = router;
