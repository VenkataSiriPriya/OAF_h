// frontend/components/UpdateQuiz.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateQuiz.css';

export default function UpdateQuiz() {
  const [startTime, setStartTime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('https://oaf-h-deployment-render-express.onrender.com/api/quiz-time')
      .then(res => {
        if (res.data.success && res.data.start_time) {
          const local = new Date(res.data.start_time);
          const tzOffset = local.getTimezoneOffset() * 60000;
          const localTime = new Date(local.getTime() - tzOffset).toISOString().slice(0, 16);
          setStartTime(localTime);
        }
      })
      .catch(err => console.error("Error fetching quiz time:", err));
  }, []);

  const handleSave = async () => {
    if (!startTime) return alert("⛔ Please select a time.");
    if (new Date(startTime) < new Date()) return alert("⛔ Time must be in the future.");

    setLoading(true);
    try {
      const utcTime = new Date(startTime).toISOString(); // Save as UTC
      await axios.post('https://oaf-h-deployment-render-express.onrender.com/api/admin/quiz-time', {
        start_time: utcTime
      });
      setMessage("✅ Time saved successfully.");
    } catch (err) {
      console.error("Failed to save time:", err);
      setMessage("❌ Failed to save time.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-quiz-container">
      <h2>🛠️ Set Quiz Start Time</h2>
      <label>Start Time (IST):</label>
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
