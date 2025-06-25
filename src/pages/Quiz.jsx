import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Quiz.css";

export default function Quiz() {
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

  // State variables
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const [isLocked, setIsLocked] = useState(true);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [countdown, setCountdown] = useState("");

  // Auth check
  useEffect(() => {
    const isUser = localStorage.getItem("isUser") === "true";
    if (!isUser) {
      alert("⚠️ Please login first to access the quiz!");
      localStorage.setItem("redirectAfterLogin", "/quiz");
      window.location.href = "/login";
    }
  }, []);

  // Quiz unlock logic
  useEffect(() => {
    axios.get("https://oaf-h-deployment-render-express.onrender.com/api/quiz-time")
      .then((res) => {
        if (res.data.success && res.data.start_time) {
          const start = new Date(res.data.start_time);
          setQuizStartTime(start);

          const checkEligibility = () => {
            const now = new Date();
            if (now >= start) {
              setIsLocked(false);
              setCountdown("");
            } else {
              const diff = Math.floor((start - now) / 1000);
              const mins = Math.floor(diff / 60);
              const secs = diff % 60;
              setCountdown(`Quiz unlocks in ${mins}m ${secs}s`);
            }
          };

          checkEligibility();
          const timer = setInterval(checkEligibility, 1000);
          return () => clearInterval(timer);
        } else {
          setIsLocked(false); // fallback
        }
      })
      .catch(() => {
        setIsLocked(false); // fallback on error
      });
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const startQuiz = () => {
    setStarted(true);
    const now = new Date();
    setStartTime(now);

    const id = setInterval(() => setTimer((prev) => prev + 1), 1000);
    setIntervalId(id);
  };

  const handleOptionChange = (e) => setSelected(e.target.value);

  const handleSubmit = () => {
    if (!selected) return;
    setShowAnswer(true);
    if (selected === questions[current].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setSelected("");
      setShowAnswer(false);
    } else {
      const end = new Date();
      setEndTime(end);
      clearInterval(intervalId);
      setFinished(true);
      submitScore(score, startTime, end);
    }
  };

  const submitScore = async (finalScore, startedAt, completedAt) => {
    const username = localStorage.getItem("user");
    if (!username) {
      alert("User not logged in.");
      return;
    }

    try {
      await axios.post("https://oaf-h-deployment-render-express.onrender.com/api/submit-score", {
        username,
        score: finalScore,
        started_at: startedAt,
        completed_at: completedAt,
      });
      console.log("✅ Score submitted");
    } catch (err) {
      console.error("❌ Error saving score:", err);
    }
  };

  return (
    <div className="quiz-container">
      {!started ? (
        <div className="quiz-intro">
          <h2>🏏 SRH Quiz Challenge</h2>
          <p>Welcome to the official Sunrisers Hyderabad fan quiz!</p>
          <ul>
            <li>🔥 3 exciting SRH questions</li>
            <li>⏱️ Timer will start when you begin</li>
            <li>💾 Your score and time will be saved</li>
          </ul>
          <button
            className="start-button"
            onClick={startQuiz}
            disabled={isLocked}
            title={isLocked && quizStartTime ? `Quiz starts at ${quizStartTime.toLocaleString()}` : ""}
          >
            Start Quiz
          </button>
          {isLocked && countdown && <p className="countdown-msg">⏳ {countdown}</p>}
        </div>
      ) : !finished ? (
        <div>
          <h2>Q{current + 1}. {questions[current].question}</h2>
          <form>
            {questions[current].options.map((option, index) => (
              <div key={index}>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selected === option}
                    onChange={handleOptionChange}
                    disabled={showAnswer}
                  />
                  {option}
                </label>
              </div>
            ))}
          </form>

          {!showAnswer ? (
            <button onClick={handleSubmit}>Submit</button>
          ) : (
            <div>
              {selected === questions[current].answer ? (
                <p className="correct">✅ Correct!</p>
              ) : (
                <p className="incorrect">❌ Correct answer: {questions[current].answer}</p>
              )}
              <button onClick={handleNext}>Next</button>
            </div>
          )}

          <p className="quiz-timer">⏱️ Time: {formatTime(timer)}</p>
        </div>
      ) : (
        <div className="quiz-results">
          <h3>🎉 Quiz Complete!</h3>
          <p>✅ Score: {score} / {questions.length}</p>
          <p>⏱️ Time Taken: {formatTime(timer)}</p>
          <p>📅 Played At: {startTime?.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}