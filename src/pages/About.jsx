import React from "react";
import "./styles/About.css";

const About = () => {
  return (
    <section className="about-page">
      <div className="about-hero">
        <h1>We Are Orange Army</h1>
        <p>The heartbeat of SRH — where fandom turns into fire.</p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          To unite Sunrisers fans across the globe and build a creative, passionate, and unstoppable community that brings energy online and in the stadium.
        </p>
      </div>

      <div className="about-section">
        <h2>What We Do</h2>
        <div className="about-cards">
          <div className="about-card">
            <h3>Creative Force</h3>
            <p>Matchday designs, video edits, posters & reels that ignite emotions and celebrate every moment.</p>
          </div>
          <div className="about-card">
            <h3>Fan Community</h3>
            <p>Memes, polls, contests, and live chats that keep the SRH family buzzing match after match.</p>
          </div>
        </div>
      </div>

      <div className="about-section join">
        <h2>Join the Orange Army</h2>
        <p>
          If you live and breathe cricket, and love the orange flame — this is your home. Come join us in cheering louder and shining brighter!
        </p>
        <button className="join-btn">Become a Member</button>
      </div>
    </section>
  );
};

export default About;
