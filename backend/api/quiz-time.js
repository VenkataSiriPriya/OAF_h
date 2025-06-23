// api/quiz-time.js
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

// GET quiz start time
router.get('/quiz-time', (req, res) => {
  db.query('SELECT start_time FROM quiz_settings LIMIT 1', (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    if (results.length === 0) return res.json({ success: true, start_time: null });
    return res.json({ success: true, start_time: results[0].start_time });
  });
});

// POST update quiz start time
router.post('/admin/quiz-time', (req, res) => {
  const { start_time } = req.body;
  if (!start_time) return res.status(400).json({ success: false, message: "Start time required." });

  db.query('REPLACE INTO quiz_settings (id, start_time) VALUES (1, ?)', [start_time], (err) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    return res.json({ success: true, message: "Quiz start time updated." });
  });
});

module.exports = router;
