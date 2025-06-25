const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET: Return UTC time string as-is
router.get('/quiz-time', async (req, res) => {
  try {
    const result = await pool.query('SELECT start_time FROM quiz_settings WHERE id = 1');
    const startTime = result.rows[0]?.start_time;

    return res.json({
      success: true,
      start_time: startTime ? new Date(startTime).toISOString() : null,
    });
  } catch (err) {
    console.error('Error fetching quiz time:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST: Save already UTC time string
router.post('/admin/quiz-time', async (req, res) => {
  const { start_time } = req.body;

  if (!start_time || isNaN(new Date(start_time))) {
    return res.status(400).json({ success: false, message: 'Invalid time.' });
  }

  try {
    await pool.query(
      `INSERT INTO quiz_settings (id, start_time)
       VALUES (1, $1)
       ON CONFLICT (id) DO UPDATE SET start_time = EXCLUDED.start_time`,
      [start_time]
    );

    res.json({ success: true, message: 'Time saved successfully.' });
  } catch (err) {
    console.error('Error saving time:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
