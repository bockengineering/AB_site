import React from 'react';

function Projects() {
  const projects = [
    {
      name: "RQ4-B Dynamic Mission Operations (DYNAMO)",
      description: "Northrop Grumman was awarded a contract by the United States Air Force to provide dynamic inflight rerouting for RQ-4B Global Hawk.",
      image: "/images/Global-Hawk.jpg",
      link: "https://news.northropgrumman.com/news/releases/northrop-grumman-awarded-mission-planning-contract-to-increase-global-hawk-operational-flexibility"
    },
    {
      name: "The Craft Creamery",
      description: "An ice cream tasting bar located in San Diego.",
      image: "/images/craft-creamery.jpg",
      link: "https://www.craftcreamerysd.com/about"
    },
    {
      name: "DizzyDoctor",
      description: "A FDA cleared mobile app that allows users to diagnose and treat dizziness and vertigo.",
      image: "/images/dizzydoctor.png",
      link: "https://www.accessdata.fda.gov/cdrh_docs/pdf18/K182214.pdf"
    },
    {
      name: "JB10 Jetpack",
      description: "Led the development of a personal jetpack system capable of vertical takeoff and landing (VTOL) with advanced stabilization.",
      image: "/images/jetpack.jpg",
      link: "https://www.youtube.com/watch?v=nj-Iwv5NJKg"
    },
    {
      name: "JB11 Jetpack",
      description: "Developed an advanced self stabilizing 6 turbojet personal jetpack system with thrust vectoring and enhanced flight controls.",
      image: "/images/jb11.jpg",
      link: "https://www.youtube.com/watch?v=tqS_wTu1lH4&t=239s"
    },
    {
      name: "SPEEDER",
      description: "Created a dynamically unstable propulsion system optimized for high-speed, low-altitude flight operations.",
      image: "/images/JPA-Recreational-Speeder-2021.jpg",
      link: "https://www.youtube.com/watch?v=URgznwTph6M"
    }
  ];

  return (
    <>
      <h2 className="section-header">Projects</h2>
      <div className="content-section">
        {projects.map((project, index) => (
          <div key={index} className="content-item">
            {project.image && (
              <img src={project.image} alt={project.name} className="project-image" />
            )}
            <h3 className="projects-title">{project.name}</h3>
            <p className="project-description">{project.description}</p>
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="article-link"
              >
                Read more
              </a>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Projects;
