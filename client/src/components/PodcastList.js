import React, { useState, useEffect } from 'react';
import './PodcastList.css';
import { Link } from 'react-router-dom';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_URL || '';
        const response = await fetch(`${baseUrl}/api/podcasts`);
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        const data = await response.json();
        setPodcasts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  if (loading) {
    return <div className="content-item full-width">Loading...</div>;
  }

  if (error) {
    return <div className="content-item full-width">Error: {error}</div>;
  }

  return (
    <div className="content-item full-width">
      <h3 className="listen-title">Recent Podcast Notes</h3>
      <div className="podcast-list">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-item">
            <div className="podcast-icon">
              {podcast.icon?.type === 'emoji' ? (
                <div className="show-icon emoji-icon">
                  {podcast.icon.emoji}
                </div>
              ) : podcast.icon?.type === 'file' || podcast.icon?.type === 'external' ? (
                <img 
                  src={podcast.icon.url} 
                  alt={podcast.show} 
                  className="show-icon"
                />
              ) : null}
            </div>
            <div className="podcast-main">
              <h3 className="podcast-title">{podcast.title}</h3>
              <div className="podcast-meta">
                <span className="date">
                  {podcast.date ? new Date(podcast.date).toLocaleDateString() : 'No date'}
                </span>
                <span className="show">{podcast.show}</span>
                {podcast.snips > 0 && <span className="snips">Notes: {podcast.snips}</span>}
              </div>
            </div>
            {(podcast.link || podcast.showNotesLink) && (
              <div className="podcast-links">
                {podcast.link && (
                  <a href={podcast.link} className="podcast-link" target="_blank" rel="noopener noreferrer">
                    Listen →
                  </a>
                )}
                {podcast.showNotesLink && (
                  <Link 
                    to={`/podcasts/${podcast.id}`} 
                    className="podcast-link"
                  >
                    View Notes →
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastList; 