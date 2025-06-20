import React from "react";
import "./testimonals.css";

const testimonialsData = [
  {
    quote: "Being part of this club made me love cricket more than ever!",
    name: "Arjun",
    location: "Hyderabad",
  },
  {
    quote: "The energy, the edits, the community — unmatched!",
    name: "Sneha",
    location: "Vizag",
  },
  {
    quote: "I joined for SRH, stayed for the vibe.",
    name: "Rahul",
    location: "Warangal",
  },
];

const Testimonals = () => {
  return (
    <section className="testimonials">
      <h2 className="section-title">What Fans Say</h2>
      <div className="testimonials-grid">
        {testimonialsData.map((item, index) => (
          <div key={index} className="testimonial-card">
            <p className="quote">“{item.quote}”</p>
            <div className="author">– {item.name}, {item.location}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonals;
