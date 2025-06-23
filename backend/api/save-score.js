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

// Utility to format ISO string to MySQL DATETIME
function formatDateToMySQL(datetime) {
  const date = new Date(datetime);
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

// Route to handle quiz score submission
router.post('/submit-score', (req, res) => {
  const { username, score, started_at, completed_at } = req.body;

  if (!username || score === undefined || !started_at || !completed_at) {
    return res.status(400).json({ success: false, message: 'Missing data in request' });
  }

  const startedFormatted = formatDateToMySQL(started_at);
  const completedFormatted = formatDateToMySQL(completed_at);

  // Get user ID
  const getUserQuery = 'SELECT id FROM users WHERE username = ?';
  db.query(getUserQuery, [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const userId = results[0].id;

    // Insert into quiz_scores table
    const insertScoreQuery = `
      INSERT INTO quiz_scores (user_id, score, played_at, started_at, completed_at)
      VALUES (?, ?, NOW(), ?, ?)
    `;
    db.query(insertScoreQuery, [userId, score, startedFormatted, completedFormatted], (err) => {
      if (err) {
        console.error("Insert into quiz_scores failed:", err);
        return res.status(500).json({ success: false, message: 'Could not save score' });
      }

      // Insert into leaderboard table
      const insertLeaderboardQuery = `
        INSERT INTO leaderboard (user_id, score, started_at, completed_at, time_taken)
        VALUES (?, ?, ?, ?, TIMESTAMPDIFF(SECOND, ?, ?))
      `;
      db.query(insertLeaderboardQuery, [
        userId, score, startedFormatted, completedFormatted, startedFormatted, completedFormatted
      ], (err) => {
        if (err) {
          console.error("Insert into leaderboard failed:", err);
          return res.status(500).json({ success: false, message: 'Could not save leaderboard entry' });
        }

        res.status(200).json({ success: true, message: 'Score and leaderboard saved' });
      });
    });
  });
});

module.exports = router;
