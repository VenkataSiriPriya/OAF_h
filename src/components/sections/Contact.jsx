import React, { useState } from 'react';
import './Contact.css'; // Create this for custom styling if needed

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setStatus(data.message || 'Email sent!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });
    } catch (err) {
      setStatus('Failed to send email');
      console.error(err);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2>Connect With Orange Army</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
          <input type="text" name="company" placeholder="Company/Organization" value={formData.company} onChange={handleChange} />
          
          <select name="service" required value={formData.service} onChange={handleChange}>
            <option value="">Select a Service</option>
            <option value="branding">Branding & Identity</option>
            <option value="marketing">Marketing Campaigns</option>
            <option value="partnerships">Fan Engagement/Partnerships</option>
            <option value="event">Event Collaboration</option>
            <option value="other">Other</option>
          </select>

          <textarea name="message" placeholder="Additional Message" rows="4" value={formData.message} onChange={handleChange} />

          <button type="submit">Send Message</button>
          {status && <p className="status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
