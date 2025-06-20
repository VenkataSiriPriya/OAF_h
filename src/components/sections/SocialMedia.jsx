import React from "react";
import "./socialmedia.css";

const SocialMedia = () => {
  return (
    <section className="social-media">
      <h2 className="social-title">Connect with Us</h2>
      <p className="social-subtitle">
        Be part of the Orange Army online – join our journey, share the fire, and never miss a moment.
      </p>

      <div className="social-grid">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/orangearmyforever/?hl=en"
          className="social-card instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
         
          {/* <img src="/https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png" alt="Instagram" /> */}
          <img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/198px-Instagram_logo_2016.svg.png"
  alt="Instagram"
/>

          <div className="social-content">
            <h3>@orangearmy_official</h3>
            <p>
              Experience the passion of cricket like never before. Daily posts, fiery reels,
              behind-the-scenes training, locker room vibes, and the heartbeat of our fans.
              <br /><br />
              Follow us to celebrate every win, every wicket, and every warrior wearing orange.
            </p>
          </div>
        </a>

        {/* YouTube */}
        <a
          href="https://www.youtube.com/@OrangeArmyInsiderlive"
          className="social-card youtube"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
  alt="Facebook"
/>
          <div className="social-content">
            <h3>Orange Army TV</h3>
            <p>
              Dive deep into SRH spirit with cinematic match edits, player interviews, fan chants, and unforgettable moments.
              <br /><br />
              This is your front-row seat to the Orange storm — curated for die-hard fans and future legends alike.
            </p>
          </div>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com"
          className="social-card facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/198px-Instagram_logo_2016.svg.png"
  alt="YouTube"
/>
          <div className="social-content">
            <h3>Orange Army Fans</h3>
            <p>
              Join our digital cheering squad — a community where fans unite, discuss match strategy,
              relive iconic games, and show off their fandom with memes, polls, and watch parties.
              <br /><br />
              Share the fire. Spread the Orange.
            </p>
          </div>
        </a>
      </div>
    </section>
  );
};

export default SocialMedia;
