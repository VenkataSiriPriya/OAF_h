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
                <td>{user.played_at ? new Date(user.played_at).toLocaleString() : "N/A"}</td>
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
