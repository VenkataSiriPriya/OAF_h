import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/WhatWedo.css';

export default function WhatWedo() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="whatwedo-wrapper">

      {/* Section 1: Introduction */}
      <div className="wwd-hero" data-aos="fade-up">
        <div className="wwd-hero-content">
          <h1>What We Do</h1>
          <p>
            We are a passionate community of Sunrisers Hyderabad supporters, united by our love for cricket and our dedication to the Orange Army. From cheering in the stands to celebrating online, we turn every match into a celebration of energy, unity, and pride.
          </p>
        </div>
      </div>

      {/* Section 2: Matchday Engagement */}
      <div className="wwd-section matchday" data-aos="fade-right">
        <h2>Live Matchday Buzz</h2>
        <p>
          Whether at the stadium or from home, we keep the spirit high with real-time updates, reactions, and live discussions. Our digital fanwalls and chatrooms ignite the thrill of the game, uniting voices across the world.
        </p>
      </div>

      {/* Section 3: Creative Campaigns */}
      <div className="wwd-section campaigns" data-aos="fade-left">
        <h2>Creative Fan Campaigns</h2>
        <p>
          From jersey days and themed hashtags to online challenges and fan-made videos, our campaigns echo our loyalty and creativity. We don’t just support the team — we amplify its legacy through our actions.
        </p>
      </div>

      {/* Section 4: Community Connect */}
      <div className="wwd-section community" data-aos="zoom-in-up">
        <h2>Community Building</h2>
        <p>
          We host fan meetups, watch parties, and charitable drives under the banner of cricket. The Orange Army isn't just a fandom — it's a family. And every new member strengthens our bond.
        </p>
      </div>

      {/* Section 5: Player Appreciation */}
      <div className="wwd-section players" data-aos="fade-up">
        <h2>Player Tributes</h2>
        <p>
          We honor our heroes with fan-made posters, interviews, and birthday specials. We spotlight every performance and back our squad through highs and lows — because loyalty goes beyond the scoreboard.
        </p>
      </div>

    </section>
  );
}
