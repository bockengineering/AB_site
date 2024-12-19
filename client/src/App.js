import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Apps from './pages/Apps';
import ThesisDetail from './pages/ThesisDetail';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <ParticleBackground />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/theses/:id" element={<ThesisDetail />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
