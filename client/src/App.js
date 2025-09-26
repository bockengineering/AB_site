import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Apps from './pages/Apps';
import ThesisDetail from './pages/ThesisDetail';
import PodcastDetail from './pages/PodcastDetail';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [particlesEnabled, setParticlesEnabled] = useState(true);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <ParticleBackground isEnabled={particlesEnabled} />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/theses/:id" element={<ThesisDetail />} />
          <Route path="/podcasts/:id" element={<PodcastDetail />} />
          <Route path="/*" element={<Layout particlesEnabled={particlesEnabled} onParticlesToggle={setParticlesEnabled} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
