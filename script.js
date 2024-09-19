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

function scrambleBio() {
    const bioElement = document.getElementById('bio');
    const fx = new TextScramble(bioElement);
    const bioText = `I'm a deep tech investor at Booz Allen Ventures,
focusing on AI, quantum computing, and cybersecurity.
Previously, I led product at Cylance (acq. by Blackberry)
and was an early employee at Palantir Technologies.`;
    fx.setText(bioText);
}

function loadContent(section) {
    const content = document.getElementById('content');
    let html = '';
    let number = '';

    switch(section) {
        case 'projects':
            number = '01';
            html = `
                <div class="content-item">
                    <div class="content-icon">▶</div>
                    <div class="content-text">
                        <h2>Prismic Studio</h2>
                        <div class="meta">Prismic Studio — with Sadek Drobi</div>
                        <div class="date">OCTOBER 15, 2019</div>
                    </div>
                </div>
            `;
            break;
        case 'talks':
            number = '02';
            html = `
                <div class="content-item">
                    <div class="content-icon">▶</div>
                    <div class="content-text">
                        <h2>Utility-First CSS</h2>
                        <div class="meta">This Dot Media — with Rob Ocel, Jake Dohm, Adam Wathan</div>
                        <div class="date">JULY 9, 2019</div>
                    </div>
                </div>
            `;
            break;
        case 'interviews':
            number = '03';
            html = `
                <div class="content-item">
                    <div class="content-icon">🎙</div>
                    <div class="content-text">
                        <h2>My JavaScript Story</h2>
                        <div class="meta">Devchat.tv — with Charles Max Wood</div>
                        <div class="date">JUNE 24, 2019</div>
                    </div>
                </div>
            `;
            break;
    }

    content.innerHTML = html;

    setTimeout(() => {
        document.querySelectorAll('.content-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        });
    }, 100);
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
    scrambleBio();
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
    document.getElementById('twitter-link').href = 'https://twitter.com/yourtwitterhandle';
    document.getElementById('github-link').href = 'https://github.com/yourgithubhandle';

    // Initialize particle effect
    demo.start();
});