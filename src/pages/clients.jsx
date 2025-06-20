import React from "react";
import "./styles/clients.css";

const clientsData = [
  { name: "OAF - 1" },
  { name: "OAF - 2" },
  { name: "OAF - 3" },
  { name: "OAF - 4" },
  { name: "OAF - 5" },
  { name: "OAF - 6" },
  { name: "OAF - 7" },
  { name: "OAF - 8" },
];

const Clients = () => {
  return (
    <section className="clients">
      <h2>Our Collaborators</h2>
      <p>We've partnered with brands that share our passion for the game.</p>
      <div className="clients-grid">
        {clientsData.map((client, index) => (
          <div className="client-card" key={index}>
            <img src="/OAF Client.png" alt={`${client.name} logo`} />
            <h4>{client.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
