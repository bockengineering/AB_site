import React from 'react';
import PodcastList from '../components/PodcastList';

const AboutMe = () => {
  return (
    <div className="content-section about-grid">
      <div className="content-item full-width">
        <h3 className="listen-title">Background</h3>
        <p className="project-description">
          Heyo! I'm Alex Bock, a Venture Capitalist at Booz Allen Ventures with a focus on Deep Tech. 
          My journey in the tech world has been driven by a deep curiosity about how 
          technology can shape our future.
        </p>
        <p className="project-description">
          With extensive experience in aerospace engineering and deep tech ventures, I focus on identifying and supporting 
          groundbreaking technologies and ambitious founders who are building the next 
          generation of transformative companies. I thrive on projects that challenge boundaries and drive real-world impact. Beyond work, I pursue adventure in 
          the mountains and outdoors, always seeking my next challenge.
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
      <PodcastList />
    </div>
  );
};

export default AboutMe; 