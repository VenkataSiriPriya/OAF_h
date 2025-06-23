// api/submitScore.js
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

// Format ISO to MySQL DATETIME
function formatToMySQL(datetime) {
  return new Date(datetime).toISOString().slice(0, 19).replace("T", " ");
}

router.post('/submit-score', (req, res) => {
  const { username, score, started_at, completed_at } = req.body;

  if (!username || score === undefined || !started_at || !completed_at) {
    return res.status(400).json({ success: false, message: "Missing data" });
  }

  const started = formatToMySQL(started_at);
  const completed = formatToMySQL(completed_at);

  const getUserIdQuery = 'SELECT id FROM users WHERE username = ?';
  db.query(getUserIdQuery, [username], (err, result) => {
    if (err || result.length === 0) {
      console.error("User lookup failed:", err);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userId = result[0].id;
    const insertQuery = `
      INSERT INTO quiz_scores (user_id, score, played_at, started_at, completed_at)
      VALUES (?, ?, NOW(), ?, ?)
    `;

    db.query(insertQuery, [userId, score, started, completed], (err) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ success: false, message: "Insert failed" });
      }
      res.status(200).json({ success: true, message: "Score saved successfully" });
    });
  });
});

module.exports = router;
