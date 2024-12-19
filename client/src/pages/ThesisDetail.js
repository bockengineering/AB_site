import React from 'react';
import { useParams } from 'react-router-dom';

const ThesisDetail = () => {
  const { id } = useParams();

  const thesesContent = {
    "advanced-air-mobility": {
      title: "The Future of Advanced Air Mobility",
      date: "December 2023",
      content: `
        <h3>Introduction</h3>
        <p>The landscape of urban transportation is on the cusp of a revolutionary transformation. Advanced Air Mobility (AAM) represents not just a new mode of transport, but a fundamental shift in how we conceive of urban and regional mobility.</p>

        <h3>Key Technologies</h3>
        <p>Several critical technologies are converging to make AAM possible:</p>
        <ul>
          <li>Electric Propulsion Systems</li>
          <li>Advanced Composite Materials</li>
          <li>Autonomous Flight Systems</li>
          <li>Battery Technology</li>
        </ul>

        <h3>Market Analysis</h3>
        <p>The global AAM market is projected to reach $115 billion by 2035, driven by:</p>
        <ul>
          <li>Urban Air Mobility (UAM) services</li>
          <li>Regional air mobility</li>
          <li>Cargo and logistics applications</li>
        </ul>

        <h3>Challenges and Opportunities</h3>
        <p>While the potential is immense, several challenges need to be addressed:</p>
        <ul>
          <li>Regulatory frameworks</li>
          <li>Infrastructure development</li>
          <li>Public acceptance</li>
          <li>Safety and certification</li>
        </ul>
      `
    },
    "ai-aerospace": {
      title: "AI in Aerospace Applications",
      date: "November 2023",
      content: `
        <h3>Introduction</h3>
        <p>Artificial Intelligence is revolutionizing aerospace engineering, from design and manufacturing to operations and maintenance.</p>

        <h3>Key Applications</h3>
        <ul>
          <li>Autonomous Navigation Systems</li>
          <li>Predictive Maintenance</li>
          <li>Design Optimization</li>
          <li>Flight Control Systems</li>
        </ul>

        <h3>Case Studies</h3>
        <p>Recent implementations have shown remarkable results:</p>
        <ul>
          <li>Reduced design iteration time by 60%</li>
          <li>Improved fuel efficiency by 15%</li>
          <li>Enhanced safety protocols</li>
        </ul>

        <h3>Future Implications</h3>
        <p>The integration of AI in aerospace will continue to accelerate, leading to:</p>
        <ul>
          <li>Fully autonomous aircraft systems</li>
          <li>Real-time optimization</li>
          <li>Advanced safety features</li>
        </ul>
      `
    },
    "deep-tech-investment": {
      title: "Deep Tech Investment Thesis",
      date: "October 2023",
      content: `
        <h3>Introduction</h3>
        <p>Deep Tech represents the frontier of innovation, where breakthrough technologies create fundamental advantages and transformative solutions.</p>

        <h3>Investment Focus Areas</h3>
        <ul>
          <li>Advanced Materials</li>
          <li>Quantum Computing</li>
          <li>Robotics and Automation</li>
          <li>Clean Energy Technologies</li>
        </ul>

        <h3>Market Dynamics</h3>
        <p>The Deep Tech sector presents unique opportunities and challenges:</p>
        <ul>
          <li>Longer development cycles</li>
          <li>Higher capital requirements</li>
          <li>Significant barriers to entry</li>
          <li>Strong IP protection</li>
        </ul>

        <h3>Investment Strategy</h3>
        <p>Success in Deep Tech investing requires:</p>
        <ul>
          <li>Technical due diligence expertise</li>
          <li>Patient capital deployment</li>
          <li>Strong academic partnerships</li>
          <li>Strategic industry relationships</li>
        </ul>
      `
    }
  };

  const thesis = thesesContent[id];

  if (!thesis) {
    return <div>Thesis not found</div>;
  }

  return (
    <div className="container">
      <div className="content-section">
        <div className="article-meta">{thesis.date}</div>
        <h2 className="section-header">{thesis.title}</h2>
        <div 
          className="thesis-content"
          dangerouslySetInnerHTML={{ __html: thesis.content }}
        />
      </div>
    </div>
  );
};

export default ThesisDetail; 