const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env

// PostgreSQL pool connection using env variables
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

// ========================
// Register a new user
// ========================
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (username, email, password) 
      VALUES ($1, $2, $3)
    `;
    await pool.query(query, [username, email, hashedPassword]);
    res.status(200).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('DB error:', error);
    // Check for unique violation error (Postgres error code '23505')
    if (error.code === '23505') {
      return res.status(400).json({ success: false, message: 'Email or username already registered' });
    }
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// ========================
// Login existing user
// ========================
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.status(200).json({ success: true, username: user.username });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

module.exports = router;
