import { useEffect, useRef } from 'react';

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set initial canvas size
    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    setCanvasSize();
    
    // Add resize listener
    window.addEventListener('resize', setCanvasSize);

    const NUM_PARTICLES = 500;
    const TAIL_LENGTH = 15;
    const MAX_FORCE = 8;
    const FRICTION = 0.85;
    const GRAVITY = 5.81;

    const COLORS = [
      '#A27B5C',
      '#8a6b4e',
      '#755c43'
    ];

    class Particle {
      constructor(x = 0.0, y = 0.0, mass = 1.0) {
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.tail = [];
        this.radius = this.mass * 0.15;
        this.charge = Math.random() < 0.5 ? -1 : 1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.fx = this.fy = 0.0;
        this.vx = this.vy = 0.0;
      }
    }

    let particles = [];

    function init() {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      for (let i = 0; i < NUM_PARTICLES; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let m = Math.random() * 7.5 + 0.5;
        particles.push(new Particle(x, y, m));
      }

      requestAnimationFrame(animate);
    }

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function animate() {
      if (!canvas || !ctx) return;
      
      ctx.fillStyle = 'rgba(17, 17, 17, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineCap = ctx.lineJoin = 'round';

      for (let i = 0; i < NUM_PARTICLES; i++) {
        let a = particles[i];

        if (Math.random() < 0.08) a.charge = -a.charge;

        for (let j = i + 1; j < NUM_PARTICLES; j++) {
          let b = particles[j];

          let dx = b.x - a.x;
          let dy = b.y - a.y;

          let dSq = dx * dx + dy * dy;
          let dst = Math.sqrt(dSq) + 0.1;
          let rad = a.radius + b.radius;

          if (dst >= rad) {
            let len = 1.0 / dst;

            let fx = dx * len;
            let fy = dy * len;

            let f = Math.min(MAX_FORCE, (GRAVITY * a.mass * b.mass) / dSq);

            a.fx += f * fx * b.charge;
            a.fy += f * fy * b.charge;

            b.fx += -f * fx * a.charge;
            b.fy += -f * fy * a.charge;
          }
        }

        a.vx += a.fx;
        a.vy += a.fy;

        a.vx *= FRICTION;
        a.vy *= FRICTION;

        a.tail.unshift({x: a.x, y: a.y});
        if (a.tail.length > TAIL_LENGTH) a.tail.pop();

        a.x += a.vx;
        a.y += a.vy;

        a.fx = a.fy = 0.0;

        if (a.x > canvas.width + a.radius) {
          a.x = -a.radius;
          a.tail = [];
        } else if (a.x < -a.radius) {
          a.x = canvas.width + a.radius;
          a.tail = [];
        }

        if (a.y > canvas.height + a.radius) {
          a.y = -a.radius;
          a.tail = [];
        } else if (a.y < -a.radius) {
          a.y = canvas.height + a.radius;
          a.tail = [];
        }

        ctx.strokeStyle = a.color;
        ctx.lineWidth = a.radius * 2.0;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        for (let p of a.tail) {
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    }

    // Start the animation
    init();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      particles = [];
      canvas = null;
      ctx = null;
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      id="particle-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #111111, #000000)'
      }}
    />
  );
}

export default ParticleBackground;
