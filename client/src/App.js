import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Apps from './pages/Apps';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <Router>
      <ParticleBackground />
      <Routes>
        {/* Auth and Apps routes without Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/apps" element={<Apps />} />

        {/* Main site routes with Layout */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
