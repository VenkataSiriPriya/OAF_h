import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  // ✅ Fetch users
  const fetchUsers = () => {
    axios
      .get("https://oaf-h-deployment-render-express.onrender.com/api/admin/users")
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.users);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Format datetime in IST
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

  // ✅ Delete user
  const deleteUser = async (username) => {
    if (!window.confirm(`Are you sure you want to delete ${username}?`)) return;

    try {
      const res = await axios.delete(
        `https://oaf-h-deployment-render-express.onrender.com/api/admin/users/${username}`
      );
      if (res.data.success) {
        alert(`Deleted user: ${username}`);
        fetchUsers(); // Refresh list
      } else {
        alert(`Failed to delete: ${res.data.message}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting the user.");
    }
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
            <th>Action</th>
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
                <td>
                  <button
                    onClick={() => deleteUser(user.username)}
                    style={{ background: "#e74c3c", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No user data available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
