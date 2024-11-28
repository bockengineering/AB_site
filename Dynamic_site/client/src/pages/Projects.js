import React, { useEffect, useState } from 'react';

function Projects() {
  const [projects, setProjects] = useState([
    {
      name: "RQ4-B Dynamic Mission Operations (DYNAMO)",
      description: "Northrop Grumman was awarded a contract by the United States Air Force to provide dynamic inflight rerouting for RQ-4B Global Hawk.",
      image: "images/Global-Hawk.jpg",
      link: "https://news.northropgrumman.com/news/releases/northrop-grumman-awarded-mission-planning-contract-to-increase-global-hawk-operational-flexibility"
    },
    {
      name: "Microturbine Jetpack for Red Bull Air Race",
      description: "We developed and flew a cutting-edge microturbine jetpack for the Red Bull Air Race. We the first to fly a turbine powered manned VTOL device safely and successfully",
      image: "images/jetpack.jpg",
      link: "https://www.youtube.com/watch?v=GFadyUqRKek"
    }
  ]);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const username = 'yourgithubusername';
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();
        
        repos.forEach(repo => {
          const existingProject = projects.find(p => p.github === repo.html_url);
          if (!existingProject) {
            setProjects(prev => [...prev, {
              name: repo.name,
              description: repo.description || "No description available.",
              technologies: repo.topics || [],
              github: repo.html_url,
              image: "images/default-project-image.jpg"
            }]);
          }
        });
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
      }
    };

    fetchGitHubRepos();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <ul className="projects-list">
        {projects.map((project, index) => (
          <li key={index} className="project-box">
            <img src={project.image} alt={project.name} className="project-image" />
            <h3>{project.name}</h3>
            <p className="project-description">{project.description}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                Read more
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
