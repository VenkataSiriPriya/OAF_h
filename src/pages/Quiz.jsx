// frontend/components/Quiz.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Quiz.css';

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState('');
  const [canStart, setCanStart] = useState(false);
  const [countdown, setCountdown] = useState('');

  const questions = [
    {
      question: "When was Sunrisers Hyderabad (SRH) founded?",
      options: ["2008", "2011", "2012", "2013"],
      answer: "2012",
    },
    {
      question: "Who was the captain of SRH when they won the IPL in 2016?",
      options: ["David Warner", "Kane Williamson", "Shikhar Dhawan", "Bhuvneshwar Kumar"],
      answer: "David Warner",
    },
    {
      question: "What is the home ground of SRH?",
      options: [
        "M. A. Chidambaram Stadium",
        "Wankhede Stadium",
        "Rajiv Gandhi International Cricket Stadium",
        "Eden Gardens",
      ],
      answer: "Rajiv Gandhi International Cricket Stadium",
    },
  ];

  useEffect(() => {
    const isUser = localStorage.getItem("isUser") === "true";
    if (!isUser) {
      alert("⚠️ Please login first to access the quiz!");
      localStorage.setItem("redirectAfterLogin", "/quiz");
      window.location.href = "/login";
    }
  }, []);

  // Fetch quiz start time (already in correct format)
  useEffect(() => {
    axios.get('https://oaf-h-deployment-render-express.onrender.com/api/quiz-time')
      .then(res => {
        if (res.data.success && res.data.start_time) {
          setQuizStartTime(res.data.start_time); // 'YYYY-MM-DDTHH:mm'
        }
      })
      .catch(err => console.error("Error fetching quiz time:", err));
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!quizStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const quizTime = new Date(quizStartTime);

      if (now >= quizTime) {
        setCanStart(true);
        setCountdown('');
        clearInterval(interval);
      } else {
        const diff = Math.floor((quizTime - now) / 1000);
        const min = Math.floor(diff / 60);
        const sec = diff % 60;
        setCountdown(`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [quizStartTime]);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const startQuiz = () => {
    if (started || !canStart) return;
    setStarted(true);
    const now = new Date();
    setStartTime(now);
    const id = setInterval(() => setTimer(prev => prev + 1), 1000);
    setIntervalId(id);
  };

  const handleOptionChange = (e) => setSelected(e.target.value);

  const handleSubmit = () => {
    if (!selected) return;
    setShowAnswer(true);
    if (selected === questions[current].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(prev => prev + 1);
      setSelected('');
      setShowAnswer(false);
    } else {
      clearInterval(intervalId);
      setFinished(true);
      const endTime = new Date();
      submitScore(score, startTime, endTime);
    }
  };

  const submitScore = async (finalScore, startedAt, completedAt) => {
    const username = localStorage.getItem("user");
    if (!username) return;
    try {
      await axios.post("https://oaf-h-deployment-render-express.onrender.com/api/submit-score", {
        username,
        score: finalScore,
        started_at: startedAt,
        completed_at: completedAt,
      });
    } catch (err) {
      console.error("Score submission failed:", err);
    }
  };

  return (
    <div className="quiz-container">
      {!started ? (
        <div className="quiz-intro">
          <h2>🏏 SRH Quiz Challenge</h2>
          <p>🔥 3 exciting questions</p>
          <p>⏱️ Timer starts when you begin</p>
          <p>💾 Your score & time will be saved</p>
          {quizStartTime && (
            <p>🕒 Scheduled at:{" "}
              {new Date(quizStartTime).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              })}
            </p>
          )}
          {!canStart && countdown && (
            <p>⏳ Unlocks in: {countdown}</p>
          )}
          <button className="start-button" onClick={startQuiz} disabled={!canStart}>
            Start Quiz
          </button>
        </div>
      ) : !finished ? (
        <div>
          <h2>Q{current + 1}. {questions[current].question}</h2>
          <form>
            {questions[current].options.map((option, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  value={option}
                  checked={selected === option}
                  onChange={handleOptionChange}
                  disabled={showAnswer}
                />
                {option}
              </label>
            ))}
          </form>
          {!showAnswer ? (
            <button onClick={handleSubmit}>Submit</button>
          ) : (
            <>
              <p className={selected === questions[current].answer ? "correct" : "incorrect"}>
                {selected === questions[current].answer ? "✅ Correct!" : `❌ Correct: ${questions[current].answer}`}
              </p>
              <button onClick={handleNext}>Next</button>
            </>
          )}
          <p>⏱️ Time: {formatTime(timer)}</p>
        </div>
      ) : (
        <div className="quiz-results">
          <h3>🎉 Quiz Complete!</h3>
          <p>✅ Score: {score} / {questions.length}</p>
          <p>⏱️ Time Taken: {formatTime(timer)}</p>
          <p>📅 Played At: {startTime?.toLocaleString("en-IN")}</p>
        </div>
      )}
    </div>
  );
}
