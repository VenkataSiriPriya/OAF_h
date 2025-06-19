// src/components/Hero.jsx
import React from "react";
import "./styles/hero.css";
import Clients from "../pages/clients";
import Contact from "../pages/Contact";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/8/81/Sunrisers_Hyderabad.png"
          alt="SRH Logo"
          className="srh-logo"
        />
        <h1 className="hero-title">Orange Army</h1>
        <p className="hero-tagline">Official Fan Club of Sunrisers Hyderabad</p>
        <p className="hero-description">
          Join the heartbeat of Hyderabad cricket. The Orange Army is more than a fan base—it's a community
          driven by passion, pride, and unwavering support for Sunrisers Hyderabad. We celebrate every moment together.
        </p>
        <p className="hero-description">
          Get involved in match-day chants, exclusive events, fan meetups, and giveaways. This is the spirit of SRH—bold,
          united, and unstoppable.
        </p>
      </div>

      <div className="call-to-action">
        <h2>
          We are a dedicated cricket family from Hyderabad. <br />
          We support louder, stand stronger, and embody the Orange spirit.
        </h2>
        <a href="#contact" className="cta-button">Get in Touch</a>
      </div>

      <div className="news-ticker">
        <div className="ticker-content">
          <span>Orange Army Meetup this Sunday at Uppal Stadium</span>
          <span>Join us for the ultimate Sunrisers fan parade</span>
          <span>Free merchandise giveaway for early attendees</span>
          <span>Follow us on Instagram for real-time updates</span>
          <span>We bleed Orange. Go Sunrisers Hyderabad!</span>
        </div>
      </div>
 <Clients />
 <Contact />

    </section>
   
  );
};

export default Hero;
