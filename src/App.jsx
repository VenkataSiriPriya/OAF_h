import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

// Pages
import Hero from "./components/Hero";
import About from "./pages/About";
import Services from "./pages/Services";
import Works from "./pages/Works";
import Clients from "./pages/clients";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import WhatWedo from "./pages/WhatWedo";
import Quiz from "./pages/Quiz";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AdminLogin from "./Admin/AdminLogin";
import AdminUsers from "./Admin/AdminUsers";
import Leaderboard from "./components/sections/Leaderboard";
import UpdateQuiz from "./Admin/UpdateQuiz";

// 🔐 Route Guard
const ProtectedAdminUsers = () => {
  const location = useLocation();
  return location.state?.fromClick ? <AdminUsers /> : <Navigate to="/" replace />;
};

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
          <Route path="/WhatWedo" element={<WhatWedo />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/users" element={<ProtectedAdminUsers />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/updatequiz" element={<UpdateQuiz />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
