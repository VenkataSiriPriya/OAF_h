import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://oaf-h-deployment-render-express.onrender.com/api/admin/users")
      .then((res) => {
        if (res.data.success && res.data.users) {
          // Filter users who have played the quiz (i.e., have a valid played_at timestamp)
          const playedUsers = res.data.users.filter(user => user.played_at !== null);
          setUsers(playedUsers);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch leaderboard data:", err);
      });
  }, []);

  // Sort users by score (DESC), then time taken (ASC)
  const sortedUsers = [...users].sort((a, b) => {
    const scoreA = a.score ?? 0;
    const scoreB = b.score ?? 0;
    const timeA = a.time_taken ?? Number.MAX_SAFE_INTEGER;
    const timeB = b.time_taken ?? Number.MAX_SAFE_INTEGER;

    if (scoreA === scoreB) {
      return timeA - timeB; // Less time = better rank
    }
    return scoreB - scoreA; // Higher score = better rank
  });

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Time Taken (s)</th>
            <th>Played At</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.length > 0 ? (
            sortedUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.score ?? "N/A"}</td>
                <td>{user.time_taken !== null ? Math.round(user.time_taken) : "N/A"}</td>
                <td>{new Date(user.played_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No one has played the quiz yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
