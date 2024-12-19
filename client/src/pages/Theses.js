import React from 'react';
import { Link } from 'react-router-dom';

const Theses = () => {
  const theses = [
    {
      id: "advanced-air-mobility",
      title: "The Future of Advanced Air Mobility",
      date: "December 2023",
      summary: "An analysis of how emerging technologies in propulsion, autonomy, and materials science are reshaping the future of personal and urban air transportation.",
      tags: ["AAM", "eVTOL", "Urban Mobility"]
    },
    {
      id: "ai-aerospace",
      title: "AI in Aerospace Applications",
      date: "November 2023",
      summary: "Exploring the transformative potential of artificial intelligence in aerospace design, testing, and operations, with a focus on autonomous systems.",
      tags: ["AI", "Aerospace", "Autonomy"]
    },
    {
      id: "deep-tech-investment",
      title: "Deep Tech Investment Thesis",
      date: "October 2023",
      summary: "A comprehensive analysis of investment opportunities in deep technology sectors, focusing on breakthrough innovations in propulsion, AI, and advanced materials.",
      tags: ["Deep Tech", "VC", "Innovation"]
    }
  ];

  return (
    <div className="content-section theses-grid">
      <h2 className="section-header full-width">Tech Theses</h2>
      {theses.map((thesis, index) => (
        <Link 
          to={`/theses/${thesis.id}`} 
          key={index} 
          className="content-item"
          style={{ textDecoration: 'none' }}
        >
          <div className="article-meta">{thesis.date}</div>
          <h3 className="listen-title">{thesis.title}</h3>
          <p className="project-description">{thesis.summary}</p>
          <div className="article-meta">
            Tags: {thesis.tags.join(', ')}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Theses; 