const express = require('express');
const router = express.Router();

require('dotenv').config();
const pool = require('../db');



// GET quiz start time
router.get('/quiz-time', async (req, res) => {
  try {
    const result = await pool.query('SELECT start_time FROM quiz_settings LIMIT 1');
    if (result.rows.length === 0) {
      return res.json({ success: true, start_time: null });
    }
    return res.json({ success: true, start_time: result.rows[0].start_time });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST update quiz start time
router.post('/admin/quiz-time', async (req, res) => {
  const { start_time } = req.body;
  if (!start_time) return res.status(400).json({ success: false, message: "Start time required." });

  try {
    // PostgreSQL doesn't have REPLACE INTO.
    // Use INSERT ... ON CONFLICT for upsert instead.
    const query = `
      INSERT INTO quiz_settings (id, start_time) VALUES (1, $1)
      ON CONFLICT (id) DO UPDATE SET start_time = EXCLUDED.start_time
    `;
    await pool.query(query, [start_time]);
    return res.json({ success: true, message: "Quiz start time updated." });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;