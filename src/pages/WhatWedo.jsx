import React from "react";
import "./styles/WhatWedo.css";

const WhatWedo = () => {
  return (
    <section className="whatwedo-section">
      <div className="whatwedo-container">
        <h1 className="whatwedo-title">What We Do</h1>
        <p className="whatwedo-intro">
          At Orange Army, we don't just support — we amplify. We’re a collective of creators,
          strategists, and superfans who transform passion into unforgettable digital energy.
        </p>

        <div className="whatwedo-block">
          <h2>Creative Content</h2>
          <p>
            Our strength lies in crafting moments that live beyond the match. Whether it’s a matchday countdown,
            a nostalgic throwback, or a victory post that lights up the timeline — we turn emotion into visual language.
            Through banners, match posters, quotes, and captions, we tell the story of SRH in our own voice.
          </p>
        </div>

        <div className="whatwedo-block">
          <h2>🎥 High-Energy Video Edits</h2>
          <p>
            We specialize in short-form video content: hype reels, match promos, cinematic edits, and fan tributes.
            Every cut, transition, and drop of music is tuned to one mission — hype up the Orange Army.
            Whether you're watching on Instagram, YouTube Shorts, or Twitter — you’ll feel the fire.
          </p>
        </div>

        <div className="whatwedo-block">
          <h2>🤝 Community Engagement</h2>
          <p>
            We don't just create content — we create conversations. Our memes, fan polls, trivia threads, and
            real-time reactions keep the fanbase buzzing on and off season. We believe in celebrating our community
            just as much as we celebrate cricket.
          </p>
        </div>

        <div className="whatwedo-block">
          <h2>📣 Brand & Creator Collaborations</h2>
          <p>
            We build bridges — with creators, influencers, and brands who want to engage the cricket world.
            From fan jersey launches to campaign takeovers, we bring authentic cricket emotion to every collab.
          </p>
        </div>

        <div className="whatwedo-block highlight">
          <h2>🔥 Always Orange. Always On.</h2>
          <p>
            The Orange Army never sleeps. Win or lose, we stand loud, proud, and united. If you're looking for
            a fan club that creates, connects, and celebrates — you're already one of us.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWedo;
