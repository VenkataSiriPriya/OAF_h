import React from "react";
import "./styles/Contact.css";
import Contact from "../components/sections/Contact";

const MissionSection = () => {
  return (
    <section className="mission-section">
      <div className="mission-container">
        <div className="mission-image">
          <img src="/ContactUs.png" alt="Contact Us Visual" />
        </div>
        <div className="mission-content">
          <h2 className="mission-title">
            We are committed to delivering<br /> measurable results for our clients.
          </h2>
          <p className="mission-subtext">
            <span className="highlight">MONEY TO THE...</span><br />
            <span className="victory">CLIENT IS VICTORY TO US.</span>
          </p>
          <button className="mission-button">CONNECT WITH US</button>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
