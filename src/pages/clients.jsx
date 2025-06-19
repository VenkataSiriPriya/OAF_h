import React from "react";
import "./styles/clients.css";

const clientsData = [
  { name: "Red Bull", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Red_Bull.svg/1200px-Red_Bull.svg.png" },
  { name: "Nike", logo: "https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo.png" },
  { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Sony_Logo.png" },
  { name: "Paytm", logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Paytm_logo.png" },
  { name: "Jio", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Jio_Logo.svg/1200px-Jio_Logo.svg.png" },
  { name: "Pepsi", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Pepsi_logo_2014.svg/1200px-Pepsi_logo_2014.svg.png" },
  { name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_logo.png" },
  { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
];

const Clients = () => {
  return (
    <section className="clients">
      <h2>Our Collaborators</h2>
      <p>We've partnered with brands that share our passion for the game.</p>
      <div className="clients-grid">
        {clientsData.map((client, index) => (
          <div className="client-card" key={index}>
            <img src={client.logo} alt={`${client.name} logo`} />
            <h4>{client.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
