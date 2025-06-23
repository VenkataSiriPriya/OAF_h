import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users")
      .then((res) => {
        if (res.data.success && res.data.users) {
          setUsers(res.data.users);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch leaderboard data:", err);
      });
  }, []);

  // Sort users by score DESC, then time_taken ASC
  const sortedUsers = [...users].sort((a, b) => {
    const scoreA = a.score ?? 0;
    const scoreB = b.score ?? 0;
    const timeA = a.time_taken ?? Number.MAX_SAFE_INTEGER;
    const timeB = b.time_taken ?? Number.MAX_SAFE_INTEGER;

    if (scoreA === scoreB) {
      return timeA - timeB; // Less time = higher rank
    }
    return scoreB - scoreA; // Higher score = higher rank
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
                <td>{user.time_taken ?? "N/A"}</td>
                <td>
                  {user.played_at
                    ? new Date(user.played_at).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
