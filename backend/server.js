const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 📩 Email route
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

// ✅ Use your routes (make sure these route files are updated to use pg)
app.use('/api', require('./api/admin-login'));     // PostgreSQL version
app.use('/api', require('./api/user-login'));      // PostgreSQL version
app.use('/api', require('./api/submitscore'));     // PostgreSQL version
app.use('/api', require('./api/leaderboard'));     // PostgreSQL version
app.use('/api', require('./api/adminUsers'));      // PostgreSQL version
app.use('/api', require('./api/quiz-time'));       // PostgreSQL version

// ✅ Serve frontend (Vite build output)
const root = path.join(__dirname, '..', 'dist');
app.use(express.static(root));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
