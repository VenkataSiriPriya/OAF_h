// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

// Pages
// import Hero from "./pages/Hero";
import Hero from "./components/Hero";
import About from "./pages/About";
import Services from "./pages/Services";
import Works from "./pages/Works";
import Clients from "./pages/clients";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";


const App = () => {
  return (
    <Router>
      <Navbar />

      <main>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/works" element={<Works />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
