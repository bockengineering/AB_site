import React from 'react';

function Listens() {
  const listens = [
    {
      type: 'youtube',
      embedId: 'tBU5UPI03Rg',
      title: 'Ep19. State of Venture, AI Scaling, Elections | BG2 w/ Bill Gurley, Brad Gerstner, & Jamin Ball',
      host: 'Bg2 Pod'
    },
    {
      type: 'spotify',
      embedId: '6mvT6nqdjXEGQ83dRrWIKp',
      title: 'Your Spotify Episode Title',
      host: 'Podcast Name'
    }
  ];

  return (
    <div>
      <h2>Listens</h2>
      <ul className="listens-list">
        {listens.map((media, index) => (
          <li key={index} className="media-box">
            <div className="video-container">
              {media.type === 'youtube' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${media.embedId}`}
                  title={media.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={`https://open.spotify.com/embed/episode/${media.embedId}`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              )}
            </div>
            <div className="media-content">
              <h3>{media.title}</h3>
              <p className="media-host">On {media.host}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listens;
