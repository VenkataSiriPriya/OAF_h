import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users")
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.users);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch leaderboard data:", err);
      });
  }, []);

  // Sort by score descending, then by time_taken ascending
  const sortedUsers = [...users].sort((a, b) => {
    if (b.score === a.score) {
      return a.time_taken - b.time_taken;
    }
    return b.score - a.score;
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
            <tr><td colSpan="5">No data available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
