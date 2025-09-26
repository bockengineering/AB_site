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
    },
    {
      id: 'nuclear-blocks',
      title: 'Nuclear Blocks',
      date: "January 2024",
      summary: "An exploration of nuclear technology innovations and their potential impact on clean energy production and climate change mitigation.",
      tags: ["Nuclear", "Clean Energy", "Innovation"],
      externalLink: 'https://app.heptabase.com/w/0570b1a0a8d845fa4588bfec2ae780471d7edacb33ee8bd69e38800e383c0b09'
    }
  ];

  return (
    <>
      <h2 className="section-header">Tech Theses</h2>
      <div className="content-section">
        {theses.map((thesis, index) => (
          <div key={index} className="content-item">
            <div className="article-meta">{thesis.date}</div>
            <h3 className="thesis-title">{thesis.title}</h3>
            <p className="project-description">{thesis.summary}</p>
            <div className="article-meta">
              Tags: {thesis.tags.join(', ')}
            </div>
            {thesis.externalLink ? (
              <a 
                href={thesis.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
              >
                Read More →
              </a>
            ) : (
              <Link 
                to={`/theses/${thesis.id}`}
                className="read-more"
              >
                Read More →
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Theses; 