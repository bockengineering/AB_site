import React from 'react';

const AboutMe = () => {
  return (
    <div className="content-section about-grid">
      <div className="content-item full-width">
        <h3 className="listen-title">Background</h3>
        <p className="project-description">
          Heyo I'm Alex Bock, currently a Venture Capitalist at Booz Allen Ventures leading our Deep Tech investments. My path in technology started with mechanical/aerospace engineering, driven by a fascination with how technology shapes our future. Today, I leverage my technical background and venture experience to identify and support founders building groundbreaking technologies. I work closely with ambitious teams developing transformative solutions, while maintaining my personal sanity through mountain adventures and outdoor challenges.
        </p>
      </div>

      <div className="content-item">
        <h3 className="listen-title">Areas of Focus</h3>
        <ul className="project-description">
          <li>Advanced Propulsion Systems</li>
          <li>Artificial Intelligence & Machine Learning</li>
          <li>Aerospace & Defense</li>
          <li>Autonomy & Robotics</li>
          <li>Edge/Next Gen Computing</li>
          <li>Energy Production & Storage</li>
        </ul>
      </div>

      <div className="content-item">
        <h3 className="listen-title">Quick Facts</h3>
        <ul className="project-description">
          <li>Post-Operator (survived the startup trenches—twice)</li>
          <li>Former Mechanical/Aerospace Engineer (built cool stuff, blew some things up)</li>
          <li>Based in San Diego, CA</li>
          <li>Identical Twin</li>
          <li>Consistently Hacking</li>
        </ul>
      </div>

      <div className="content-item full-width">
        <h3 className="listen-title">Experience</h3>
        <div className="experience-grid">
          <div className="experience-item">
            <img src="/images/BAV_Logo.png" alt="Booz Allen Ventures" className="company-logo" />
          </div>
          <div className="experience-item">
            <img src="/images/Northrop.svg" alt="Northrop Grumman" className="company-logo" />
          </div>
          <div className="experience-item">
            <img src="/images/Y_Combinator_logo.png" alt="Y Combinator" className="company-logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 