import React from 'react';

// Array of media items
const listens = [
    {
        type: 'youtube',
        embedId: 'tBU5UPI03Rg',
        title: 'Ep19. State of Venture, AI Scaling, Elections | BG2 w/ Bill Gurley, Brad Gerstner, & Jamin Ball',
        host: 'BG2 Pod'
    },
    {
        type: 'spotify',
        embedId: '6mvT6nqdjXEGQ83dRrWIKp',
        title: 'The Trajectory of Model Capability Improvements: Will Scaling Laws Continue',
        host: 'The Twenty Minute VC (20VC)',
        date: 'Nov 3'
    }
];

function ListenItem({ item }) {
  const renderEmbed = () => {
    switch (item.type) {
      case 'youtube':
        return (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${item.embedId}`}
            title={item.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      case 'spotify':
        return (
          <iframe 
            style={{ borderRadius: '12px' }} 
            src={`https://open.spotify.com/embed/episode/${item.embedId}`}
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="content-item listen-item">
      <h3 className="listen-title">{item.title}</h3>
      <div className="listen-subtitle">{item.host}</div>
      {item.date && <div className="listen-meta">{item.date}</div>}
      <div className="embed-container">
        {renderEmbed()}
      </div>
    </div>
  );
}

function Listens() {
  return (
    <>
      <h2 className="section-header">Listens</h2>
      <div className="content-section">
        {listens.map((item, index) => (
          <ListenItem key={index} item={item} />
        ))}
      </div>
    </>
  );
}

export default Listens;
