import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Projects from '../pages/Projects';
import Reads from '../pages/Reads';
import Writing from '../pages/Writing';
import Listens from '../pages/Listens';
import AboutMe from '../pages/AboutMe';
import Nodes from '../pages/Nodes';

function Layout({ particlesEnabled, onParticlesToggle }) {
  return (
    <div className="container">
      <div className="left-side">
        <div className="left-content">
          <header className="header">
            <h1 className="name">Alex Bock</h1>
            <div className="job-title">Deep Tech @ Booz Allen Ventures</div>
            <div className="bio"></div>
          </header>
          <Navbar />
        </div>
      </div>
      <main className="right-side">
        <Routes>
          <Route path="/" element={<AboutMe />} />
          <Route path="/nodes" element={<Nodes />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/reads" element={<Reads />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/listens/*" element={<Listens />} />
        </Routes>
      </main>
      <Footer particlesEnabled={particlesEnabled} onParticlesToggle={onParticlesToggle} />
    </div>
  );
}

export default Layout;
