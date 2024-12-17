import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <Router>
      <ParticleBackground />
      <Layout />
    </Router>
  );
}

export default App;
