import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to homepage or quiz
    if (localStorage.getItem('isUser') === 'true') {
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await axios.post('https://oaf-h-deployment-render-express.onrender.com/api/login', form);

      if (res.data.success) {
        localStorage.setItem('user', res.data.username);
        localStorage.setItem('isUser', 'true');

        const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');

        navigate(redirectPath);
        window.location.reload();
      } else {
        setErrorMsg(res.data.message || 'Invalid credentials');
      }
    } catch (err) {
      setErrorMsg('⚠️ Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p className="register-link">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
