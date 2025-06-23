import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users")
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.users);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      });
  }, []);

  // Helper to format datetime in IST
  const formatIST = (datetimeStr) => {
    return new Date(datetimeStr).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="admin-users-container">
      <h2>👨‍💼 Admin Panel - User Scores</h2>
      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
            <th>Time Taken (s)</th>
            <th>Played At</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.username}</td>
                <td>{user.score ?? "N/A"}</td>
                <td>{user.time_taken ?? "N/A"}</td>
                <td>{user.played_at ? formatIST(user.played_at) : "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">No user data available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
