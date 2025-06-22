import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={handleLinkClick}>orange 𝘼rmy </Link>
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
          <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
          <li><Link to="/WhatWedo" onClick={handleLinkClick}>What We Do</Link></li>
          <li><Link to="/works" onClick={handleLinkClick}>Gallery</Link></li>
          <li><Link to="/blog" onClick={handleLinkClick}>Blog</Link></li>
          <li><Link to="/contact" onClick={handleLinkClick}>Join Us</Link></li>
          <li><Link to="/quiz" onClick={handleLinkClick}>Quiz</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
