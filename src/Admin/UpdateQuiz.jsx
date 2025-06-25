// frontend/components/UpdateQuiz.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateQuiz.css';

export default function UpdateQuiz() {
  const [startTime, setStartTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('https://oaf-h-deployment-render-express.onrender.com/api/quiz-time')
      .then((res) => {
        if (res.data.success && res.data.start_time) {
          setStartTime(res.data.start_time.slice(0, 16)); // datetime-local format
        }
      });
  }, []);

  const handleSave = async () => {
    if (!startTime) return alert("⛔ Please pick a time.");

    try {
      await axios.post('https://oaf-h-deployment-render-express.onrender.com/api/admin/quiz-time', {
        start_time: startTime,
      });
      setMessage("✅ Time saved successfully.");
    } catch {
      setMessage("❌ Failed to save time.");
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
      <button onClick={handleSave}>Save</button>
      {message && <p>{message}</p>}
    </div>
  );
}
