const express = require('express');
const router = express.Router();
const pool = require('../db'); // Shared DB pool
require('dotenv').config();    // Optional, usually done in server.js

// ✅ POST: Admin login
router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM admins WHERE username = $1 AND password = $2';

  try {
    const result = await pool.query(sql, [username, password]);

    if (result.rows.length > 0) {
      return res.json({ success: true, message: 'Login successful', name: result.rows[0].username });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('DB Error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ DELETE: Delete admin by username
router.delete('/admin/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const result = await pool.query('DELETE FROM admins WHERE username = $1 RETURNING *', [username]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    return res.json({ success: true, message: `Admin '${username}' deleted.` });
  } catch (err) {
    console.error('Error deleting admin:', err);
    return res.status(500).json({ success: false, message: 'Server error during delete' });
  }
});

module.exports = router;
