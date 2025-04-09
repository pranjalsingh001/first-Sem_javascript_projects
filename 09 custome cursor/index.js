    // Enhanced Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const cursorRing = document.querySelector('.cursor-ring');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let trailCount = 0;

    // Smooth cursor movement with delay effect
    const animateCursor = () => {
      // Main cursor follows instantly
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      
      // Ring follows with slight delay for smooth effect
      const ringSpeed = 0.2;
      ringX += (mouseX - ringX) * ringSpeed;
      ringY += (mouseY - ringY) * ringSpeed;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Mouse move event with trail particles
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create trail particles every few frames
      if (trailCount % 3 === 0) {
        createTrail(e.clientX, e.clientY);
      }
      trailCount++;
    });

    // Create trail particles
    function createTrail(x, y) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      
      // Randomize color slightly
      const hue = Math.random() * 60 + 180; // Blue to pink range
      trail.style.background = `hsl(${hue}, 80%, 60%)`;
      
      document.body.appendChild(trail);
      
      // Remove after animation completes
      setTimeout(() => {
        trail.remove();
      }, 600);
    }

    // Add hover effects for interactive elements
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach((element) => {
      element.addEventListener('mouseover', () => {
        cursor.classList.add('cursor-hover');
        cursorRing.classList.add('cursor-ring-hover');
      });

      element.addEventListener('mouseout', () => {
        cursor.classList.remove('cursor-hover');
        cursorRing.classList.remove('cursor-ring-hover');
      });
    });

    // Click effects
    document.addEventListener('mousedown', () => {
      cursor.classList.add('cursor-click');
      cursorRing.classList.add('cursor-ring-click');
    });

    document.addEventListener('mouseup', () => {
      cursor.classList.remove('cursor-click');
      cursorRing.classList.remove('cursor-ring-click');
    });

    // Create floating particles
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Random size
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random color
        const hue = Math.random() * 60 + 180; // Blue to pink range
        particle.style.backgroundColor = `hsla(${hue}, 80%, 60%, ${Math.random() * 0.5 + 0.2})`;
        
        // Random animation duration and delay
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;
        particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
        
        particlesContainer.appendChild(particle);
      }
    }

    // Initialize everything when DOM loads
    document.addEventListener('DOMContentLoaded', () => {
      createParticles();
      
      // Ensure cursor is hidden even if JS takes time to load
      document.body.style.cursor = 'none';
    });

    // Fallback to hide cursor if something goes wrong
    document.addEventListener('error', () => {
      document.body.style.cursor = 'none';
    }, true);
