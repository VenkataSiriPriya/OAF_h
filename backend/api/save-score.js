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

router.post('/submit-score', (req, res) => {
  const { username, score } = req.body;

  if (!username || score === undefined) {
    return res.status(400).json({ success: false, message: 'Missing username or score' });
  }

  const getUserQuery = 'SELECT id FROM users WHERE username = ?';
  db.query(getUserQuery, [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const userId = results[0].id;

    const insertScoreQuery = 'INSERT INTO quiz_scores (user_id, score, played_at) VALUES (?, ?, NOW())';
    db.query(insertScoreQuery, [userId, score], (err) => {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ success: false, message: 'Could not save score' });
      }

      res.status(200).json({ success: true, message: 'Score saved' });
    });
  });
});

module.exports = router;
