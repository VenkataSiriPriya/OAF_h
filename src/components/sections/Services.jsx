import React from "react";
import "./services.css";

export default function Services() {
  return (
    <section className="unique-services">
      <h2 className="services-title">What We Bring to the Field</h2>
      <div className="unique-cards-grid">
        {/* Card 1: Creative Design */}
        <div className="card diagonal-card">
          <div className="icon">
            <img src="/Creative Design.png" alt="Creative Design Icon" />
          </div>
          <h3>Creative Design</h3>
          <p>
            Designs that roar — from matchday banners to reel covers, all infused with SRH spirit.
          </p>
        </div>

        {/* Card 2: Video Edits */}
        <div className="card glow-card">
          <div className="icon">
            <img src="/VideoEdits.png" alt="Video Edits Icon" />
          </div>
          <h3>Video Edits</h3>
          <p>
            Match promos, fan edits, and hype reels with fiery transitions and sizzling soundtracks.
          </p>
        </div>

        {/* Card 3: Fan Engagement */}
        <div className="card glass-card">
          <div className="icon">
            <img src="/Fan Engagement.png" alt="Fan Engagement Icon" />
          </div>
          <h3>Fan Engagement</h3>
          <p>
            Polls, memes, live chats — we keep your community buzzing match after match.
          </p>
        </div>

        {/* Card 4: Brand Collabs */}
        <div className="card slanted-card">
          <div className="icon">
            <img src="/Collab.png" alt="Brand Collabs Icon" />
          </div>
          <h3>Brand Collabs</h3>
          <p> 
            We build bridges with sponsors, merch brands, and creators who love cricket.
          </p>
        </div>
      </div>
    </section>
  );
}
