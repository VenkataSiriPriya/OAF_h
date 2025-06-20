// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import "./styles/Hero.css";
import Clients from "../pages/clients";
import Contact from "../pages/Contact";
import BrandingCards from "./sections/BrandingCards";
import Services from "./sections/Services";
import Testimonals from "./sections/Testimonals";
import SocialMedia from "./sections/SocialMedia";
import FormModal from "./Modals/FormModal";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000); // Show modal after 10s
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
     
      
      <section className="hero-section">
        <div className="hero-main">
          <div className="hero-left">
            <h1 className="hero-title">Orange Army</h1>
            <p className="hero-tagline">Official Fan Club of Sunrisers Hyderabad</p>
            <p className="hero-description">
              Join the heartbeat of Hyderabad cricket. The Orange Army is more than a fan base—
              it's a community driven by passion, pride, and unwavering support for Sunrisers Hyderabad.
            </p>
          </div>
           <FormModal showModal={showModal} setShowModal={setShowModal} />

          <div className="hero-right">
            <img
              src="/shoutimg.png"
              alt="Shouting Fan"
              className="shout-img"
            />
          </div>
        </div>

        <div className="call-to-action">
          <h2 className="cta-heading">
            We are the Orange Army, the heartbeat of Sunrisers Hyderabad. Join us in celebrating our love for cricket and our unwavering support for SRH.
          </h2>
          <a href="#contact" className="cta-button">Get in Touch</a>
        </div>

        <Clients />

        <div className="news-ticker">
          <div className="ticker-content">
            <span>Orange Army Meetup this Sunday at Uppal Stadium</span>
            <span>Join us for the ultimate Sunrisers fan parade</span>
            <span>Free merchandise giveaway for early attendees</span>
            <span>Follow us on Instagram for real-time updates</span>
            <span>We bleed Orange. Go Sunrisers Hyderabad!</span>
          </div>
        </div>

        <BrandingCards />
        <Services />
        <Testimonals />
        <Contact />
        <SocialMedia />
      </section>
    </>
  );
};

export default Hero;
