import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/styles/Quiz.css";

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
    {
      question: "Which bowler has taken the most wickets for SRH?",
      options: ["Rashid Khan", "Bhuvneshwar Kumar", "T. Natarajan", "Dale Steyn"],
      answer: "Bhuvneshwar Kumar",
    },
    {
      question: "Who is the current head coach of SRH (as of IPL 2024)?",
      options: ["Tom Moody", "Brian Lara", "Daniel Vettori", "Stephen Fleming"],
      answer: "Daniel Vettori",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const now = new Date();
    setStartTime(now);

    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    setIntervalId(id);
    return () => clearInterval(id);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleOptionChange = (e) => {
    setSelected(e.target.value);
  };

  const handleSubmit = () => {
    if (!selected) return;
    setShowAnswer(true);
    if (selected === questions[current].answer) {
      setScore(score + 1);
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
      clearInterval(intervalId); // stop timer
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
      await axios.post("http://localhost:5000/api/submit-score", {
        username,
        score: finalScore,
        started_at: startedAt,
        completed_at: completedAt,
      });
      console.log("✅ Score and time saved");
    } catch (err) {
      console.error("❌ Failed to save score:", err);
    }
  };

  return (
    <div className="quiz-container">
      <h2>🏏 SRH Quiz</h2>
      <p className="quiz-timer">⏱️ Time: {formatTime(timer)}</p>

      {!finished ? (
        <div>
          <h4>Q{current + 1}. {questions[current].question}</h4>
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
                <p className="incorrect">
                  ❌ Incorrect. Correct answer: {questions[current].answer}
                </p>
              )}
              <button onClick={handleNext}>Next</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3>🎉 Quiz Complete!</h3>
          <p>Your Score: {score} / {questions.length}</p>
          <p>Total Time Taken: {formatTime(timer)}</p>
          <p>Started At: {startTime.toLocaleTimeString()}</p>
          <p>Completed At: {endTime.toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
}
