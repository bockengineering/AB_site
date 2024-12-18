import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import Footer from '../components/Footer';

function Apps() {
  const [apps, setApps] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/apps', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            navigate('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setApps(data);
      } catch (err) {
        console.error('Error fetching apps:', err);
        setError(err.message);
      }
    };

    fetchApps();
  }, [navigate]);

  return (
    <div className="apps-layout">
      <ParticleBackground />
      <main className="apps-main">
        <div className="apps-container">
          <h2 className="section-header">My Apps</h2>
          {error ? (
            <div className="error-message">
              Error loading apps: {error}
            </div>
          ) : (
            <div className="apps-grid">
              {apps.map((app) => (
                <div key={app.id} className="app-card">
                  <h3>{app.name}</h3>
                  <p>{app.description}</p>
                  <a href={app.url} target="_blank" rel="noopener noreferrer">
                    Launch App
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Apps;
