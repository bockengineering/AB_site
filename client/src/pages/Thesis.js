import React from 'react';

const Thesis = () => {
  const theses = [
    {
      title: "The Future of Advanced Air Mobility",
      date: "December 2023",
      summary: "An analysis of how emerging technologies in propulsion, autonomy, and materials science are reshaping the future of personal and urban air transportation.",
      tags: ["AAM", "eVTOL", "Urban Mobility"]
    },
    {
      title: "AI in Aerospace Applications",
      date: "November 2023",
      summary: "Exploring the transformative potential of artificial intelligence in aerospace design, testing, and operations, with a focus on autonomous systems.",
      tags: ["AI", "Aerospace", "Autonomy"]
    },
    {
      title: "Deep Tech Investment Thesis",
      date: "October 2023",
      summary: "A comprehensive analysis of investment opportunities in deep technology sectors, focusing on breakthrough innovations in propulsion, AI, and advanced materials.",
      tags: ["Deep Tech", "VC", "Innovation"]
    }
  ];

  return (
    <>
      <h2 className="section-header">Tech Theses</h2>
      <div className="content-section">
        {theses.map((thesis, index) => (
          <div key={index} className="content-item">
            <div className="article-meta">{thesis.date}</div>
            <h3 className="listen-title">{thesis.title}</h3>
            <p className="project-description">{thesis.summary}</p>
            <div className="article-meta">
              Tags: {thesis.tags.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Thesis; 