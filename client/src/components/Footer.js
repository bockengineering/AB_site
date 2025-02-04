import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ particlesEnabled, onParticlesToggle }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const isLoggedIn = localStorage.getItem('token');

  return (
    <footer className="footer">
      <div className="footer-content">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="login-link">Logout</button>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}
        <div className="social-links">
          <a href="https://x.com/lexBock" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://github.com/bockengineering" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/alexbock" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className="particle-toggle">
          <label htmlFor="particle-toggle" style={{ userSelect: 'none', marginRight: '8px' }}>Particles</label>
          <label className="switch">
            <input
              id="particle-toggle"
              type="checkbox"
              checked={particlesEnabled}
              onChange={(e) => onParticlesToggle(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
