const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, phone, company, service, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `New Inquiry from ${name} - ${service || 'General'}`,
      text: `
You have a new client inquiry:

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Company: ${company || 'N/A'}
Service: ${service || 'N/A'}

Message:
${message || 'N/A'}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email failed:', err);
    res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
});


// 🔐 Admin Login Route
const adminLoginRoute = require('./api/admin-login'); // ✅ points to your folder
app.use('/api', adminLoginRoute);  

const userLoginRoute = require('./api/user-login');
app.use('/api', userLoginRoute);

const getUsersRoute = require('./api/get-users');
app.use('/api', getUsersRoute);

const saveScoreRoute = require('./api/save-score');
app.use('/api', saveScoreRoute);

const leaderboardRoute = require('./api/leaderboard');
app.use('/api', leaderboardRoute);


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});