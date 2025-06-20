import React from 'react';
import './brandingCards.css';

const cards = [
  {
    title: "Team Branding",
    description: "Crafting bold identities that rally fans behind the Orange Army.",
    icon: "🔥",
  },
  {
    title: "Social Media",
    description: "Amplify your reach with engaging reels, stories, and match-day hype.",
    icon: "📱",
  },
  {
    title: "Merch Design",
    description: "From tees to badges — we design merchandise fans wear with pride.",
    icon: "🧢",
  },
  {
    title: "Match Campaigns",
    description: "Strategic campaigns that turn every game into a celebration.",
    icon: "🎯",
  },
];

export default function BrandingCards() {
  return (
    <section className="branding-section">
      <h2 className="branding-heading">Our Creative Arsenal</h2>
      <div className="branding-grid">
        {cards.map((card, index) => (
          <div key={index} className="branding-card">
            <div className="branding-icon">{card.icon}</div>
            <h3 className="branding-title">{card.title}</h3>
            <p className="branding-description">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
