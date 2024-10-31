class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// This is the bio text that is scrambled but is not used right now.
function scrambleBio() {
    const bioElement = document.getElementById('bio');
    const fx = new TextScramble(bioElement);
    const bioText = `I’m a hardware innovator and jetpack developer with a passion for groundbreaking technology. From developing autonomy software at Northrop Grumman to building and piloting jetpacks for RedBull, I’m always on the hunt for the next frontier in tech. When I’m not deep in code or trying to understand new, outlandish possibilities, you can find me on the slopes.`;
    fx.setText(bioText);
}

const reads = [
    {
        title: "The Future of AI in Healthcare",
        author: "Jane Doe",
        publication: "Tech Health Journal",
        date: "2023-05-15",
        link: "https://example.com/ai-healthcare",
        description: "An insightful look into how AI is revolutionizing the healthcare industry."
    },
    {
        title: "Quantum Computing: A Beginner's Guide",
        author: "John Smith",
        publication: "Quantum Quarterly",
        date: "2023-04-22",
        link: "https://example.com/quantum-computing-guide",
        description: "A comprehensive introduction to the principles of quantum computing."
    },
    // Add more articles here
];

const projects = [
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
    },
    // Add more projects as needed
];

function loadContent(section) {
    const content = document.getElementById('content');
    let html = '';

    switch(section) {
        case 'projects':
            html = `
                <h2>Projects</h2>
                <ul class="projects-list">
                    ${projects.map(project => `
                        <li class="project-box">
                            <img src="${project.image}" alt="${project.name}" class="project-image">
                            <h3>${project.name}</h3>
                            <p class="project-description">${project.description}</p>
                            ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">Read more</a>` : ''}
                        </li>
                    `).join('')}
                </ul>
            `;
            break;
        case 'reads':
            html = `
                <h2>What I'm Reading:</h2>
                <ul class="reads-list">
                    ${reads.map(article => `
                        <li class="article-box">
                            <a href="${article.link}" target="_blank" class="article-link">
                                <h3>${article.title}</h3>
                                <p class="article-meta">By ${article.author} in ${article.publication}</p>
                                <p class="article-description">${article.description}</p>
                                <p class="article-date">${formatDate(article.date)}</p>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            `;
            break;
        case 'interviews':
            // ... existing interviews code ...
            break;
    }

    content.innerHTML = html;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function handleScroll() {
    const contentItems = document.querySelectorAll('.content-item:not(.visible)');
    contentItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
            item.classList.add('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const bioElement = document.getElementById('bio');
    bioElement.innerText = `Venture capital investor and mechanical engineer with a career rooted in hardware innovation and high-stakes tech. From building autonomy software at Northrop Grumman to designing and building jetpacks for Red Bull, I’m drawn to cutting-edge projects that push limits. Outside the shop, I channel the same intensity into the mountains and outdoors, constantly seeking new, adrenaline-fueled challenges. I focus on transformative technologies with real-world impact and mission.`;

    loadContent('projects');

    document.querySelectorAll('.menu li').forEach(item => {
        item.addEventListener('click', (e) => {
            document.querySelectorAll('.menu li').forEach(el => el.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const section = e.currentTarget.dataset.section;
            loadContent(section);
        });
    });

    // Set social media links
    document.getElementById('twitter-link').href = 'https://twitter.com/lexBock';
    document.getElementById('github-link').href = 'https://github.com/yourgithubhandle';
    document.getElementById('linkedin-link').href = 'https://www.linkedin.com/in/alexbock';
    document.getElementById('contact-link').href = 'mailto:alex11bock@gmail.com'; // Or link to a contact form

    // Initialize particle effect
    demo.start();

    // Function to fetch GitHub repositories
    async function fetchGitHubRepos() {
        const username = 'yourgithubusername';
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();
        
        // Process and update the projects array with GitHub data
        repos.forEach(repo => {
            const existingProject = projects.find(p => p.github === repo.html_url);
            if (existingProject) {
                existingProject.description = repo.description || existingProject.description;
                existingProject.technologies = repo.topics || existingProject.technologies;
            } else {
                projects.push({
                    name: repo.name,
                    description: repo.description || "No description available.",
                    technologies: repo.topics || [],
                    github: repo.html_url,
                    image: "path/to/default-project-image.jpg" // You might want to set a default image
                });
            }
        });

        // Reload the projects section if it's currently active
        if (document.querySelector('.menu li.active').dataset.section === 'projects') {
            loadContent('projects');
        }
    }

    // Call this function when the page loads
    fetchGitHubRepos();
});