import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateQuiz.css'; // Optional styling

export default function UpdateQuiz() {
  const [startTime, setStartTime] = useState('');
  const [message, setMessage] = useState('');

  // Fetch current quiz time
  useEffect(() => {
    axios.get("https://oaf-h-deployment-render-express.onrender.com/api/quiz-time")

      .then((res) => {
        if (res.data.success && res.data.start_time) {
          setStartTime(res.data.start_time.slice(0, 16)); // format for input
        }
      });
  }, []);

  const handleSave = async () => {
    if (!startTime) return alert("Please select a start time.");
    try {
      await axios.post("http://localhost:5000/api/admin/quiz-time", {
        start_time: startTime
      });
      setMessage("✅ Quiz start time has been updated.");
    } catch (err) {
      setMessage("❌ Failed to update quiz time.");
    }
  };

  return (
    <div className="update-quiz-container">
      <h2>🛠️ Set Quiz Start Time</h2>
      <label htmlFor="quiz-time">Quiz Start Time:</label>
      <input
        type="datetime-local"
        id="quiz-time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      {message && <p>{message}</p>}
    </div>
  );
}
