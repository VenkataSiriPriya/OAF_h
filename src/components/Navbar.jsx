import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Navbar.css";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [userName, setUserName] = useState('');

  const location = useLocation();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("isAdmin") === "true";
    const userLoggedIn = localStorage.getItem("isUser") === "true";

    setIsAdmin(adminLoggedIn);
    setIsUser(userLoggedIn);

    const adminUsername = localStorage.getItem("adminUsername");
    const userUsername = localStorage.getItem("user");

    if (adminUsername) {
      setAdminName(capitalize(adminUsername));
    }

    if (userUsername) {
      setUserName(capitalize(userUsername));
    }
  }, [location]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setShowLoginDropdown(false);
  };

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={handleLinkClick}>orange 𝘼rmy</Link>
        </div>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>

        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          {isAdmin ? (
            <>
              <li><Link to="/upgrade-quiz" onClick={handleLinkClick}>Upgrade Quiz</Link></li>
             <li>
  <Link to="/users" state={{ fromClick: true }} onClick={handleLinkClick}>
    Users
  </Link>
</li>

              <li>
                <Link to="/" onClick={() => { handleLinkClick(); handleLogout(); }}>Logout</Link>
              </li>
              <li><span className="user-profile">👑 {adminName}</span></li>
            </>
          ) : isUser ? (
            <>
              <li><Link to="/quiz" onClick={handleLinkClick}>Play Quiz</Link></li>
              <li>
                <Link to="/" onClick={() => { handleLinkClick(); handleLogout(); }}>Logout</Link>
              </li>
              <li><span className="user-profile">🧑 {userName}</span></li>
            </>
          ) : (
            <>
              <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
              <li><Link to="/WhatWedo" onClick={handleLinkClick}>What We Do</Link></li>
              <li><Link to="/works" onClick={handleLinkClick}>Gallery</Link></li>
              <li><Link to="/blog" onClick={handleLinkClick}>Blog</Link></li>
              <li><Link to="/contact" onClick={handleLinkClick}>Join Us</Link></li>
             <li>
  <Link
    to="#"
    onClick={() => {
      const isUser = localStorage.getItem("isUser") === "true";
      if (!isUser) {
        alert("⚠️ Please login first to play the quiz!");
        localStorage.setItem("redirectAfterLogin", "/quiz");
        window.location.href = "/login";
      } else {
        window.location.href = "/quiz";
      }
    }}
    style={{ cursor: "pointer" }}
  >
    Quiz
  </Link>
</li>


              <li className="dropdown">
                <button className="login-button" onClick={toggleLoginDropdown}>
                  <FaUser style={{ marginRight: "5px" }} /> Login
                </button>
                {showLoginDropdown && (
                  <ul className="dropdown-menu">
                    <li><Link to="/login" onClick={handleLinkClick}>User Login</Link></li>
                    <li><Link to="/adminlogin" onClick={handleLinkClick}>Admin Login</Link></li>
                  </ul>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
