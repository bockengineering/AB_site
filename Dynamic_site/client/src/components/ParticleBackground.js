import React, { useEffect } from 'react';

function ParticleBackground() {
  useEffect(() => {
    const COLOURS = ['#A27B5C', '#8a6b4e', '#755c43'];
    const canvas = document.getElementById('particle-canvas');
    
    if (canvas) {
      const sketch = Sketch.create({
        container: canvas,
        autopause: false,
        autoclear: false
      });

      sketch.setup = function() {
        this.particles = [];
        for (let i = 0; i < 50; i++) {
          this.particles.push({
            x: this.random(this.width),
            y: this.random(this.height),
            vx: this.random(-0.5, 0.5),
            vy: this.random(-0.5, 0.5),
            size: this.random(2, 4),
            color: COLOURS[Math.floor(this.random(0, COLOURS.length))]
          });
        }
      };

      sketch.update = function() {
        this.particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0) particle.x = this.width;
          if (particle.x > this.width) particle.x = 0;
          if (particle.y < 0) particle.y = this.height;
          if (particle.y > this.height) particle.y = 0;
        });
      };

      sketch.draw = function() {
        this.globalCompositeOperation = 'source-over';
        this.fillStyle = 'rgba(17, 17, 17, 0.1)';
        this.fillRect(0, 0, this.width, this.height);
        this.globalCompositeOperation = 'lighter';

        this.particles.forEach(particle => {
          this.beginPath();
          this.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          this.fillStyle = particle.color;
          this.fill();
        });
      };
    }
  }, []);

  return null;
}

export default ParticleBackground;
