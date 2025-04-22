document.addEventListener('DOMContentLoaded', function() {
    // Generate floating background shapes
    const background = document.getElementById('background');
    const shapeTypes = ['cube', 'sphere', 'pyramid'];
    const neonColors = ['--neon-blue', '--neon-purple', '--neon-pink', '--neon-green'];
    
    // Create 15 random shapes
    for (let i = 0; i < 15; i++) {
      createRandomShape();
    }
    
    function createRandomShape() {
      const shape = document.createElement('div');
      const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      shape.classList.add('shape');
      
      // Random position
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      const zPos = Math.random() * 100 - 50;
      
      shape.style.left = `${xPos}%`;
      shape.style.top = `${yPos}%`;
      shape.style.zIndex = Math.floor(zPos);
      
      // Random animation duration and delay
      const duration = 15 + Math.random() * 20;
      const delay = Math.random() * 10;
      
      if (shapeType === 'cube') {
        shape.classList.add('cube');
        for (let j = 0; j < 6; j++) {
          const face = document.createElement('div');
          face.classList.add('cube-face');
          face.style.transform = getTransform(j);
          shape.appendChild(face);
        }
        shape.style.animation = `rotateCube ${duration}s linear infinite`;
      } else if (shapeType === 'sphere') {
        shape.classList.add('sphere');
        const color = getComputedStyle(document.documentElement).getPropertyValue(neonColors[Math.floor(Math.random() * neonColors.length)]);
        shape.style.background = `radial-gradient(circle at 30% 30%, ${color}, transparent)`;
        shape.style.animation = `floatingSphere ${duration}s ease-in-out infinite`;
      } else if (shapeType === 'pyramid') {
        shape.classList.add('pyramid');
        const color = getComputedStyle(document.documentElement).getPropertyValue(neonColors[Math.floor(Math.random() * neonColors.length)]);
        shape.style.borderBottomColor = color;
        shape.style.animation = `rotatePyramid ${duration}s linear infinite`;
      }
      
      shape.style.animationDelay = `-${delay}s`;
      background.appendChild(shape);
    }
    
    function getTransform(faceIndex) {
      switch(faceIndex) {
        case 0: return 'translateZ(30px)';
        case 1: return 'rotateY(180deg) translateZ(30px)';
        case 2: return 'rotateY(90deg) translateZ(30px)';
        case 3: return 'rotateY(-90deg) translateZ(30px)';
        case 4: return 'rotateX(90deg) translateZ(30px)';
        case 5: return 'rotateX(-90deg) translateZ(30px)';
      }
    }
    
    // Scroll animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    const projectDescriptions = document.querySelectorAll('.project-description');
    
    // Check if description needs scrolling animation
    projectDescriptions.forEach(desc => {
      if (desc.scrollHeight > desc.clientHeight) {
        desc.classList.add('scrolling');
      }
    });
    
    // Intersection Observer to detect when cards enter viewport
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Slight delay between each card animation
          setTimeout(() => {
            entry.target.style.transitionDelay = '0s';
          }, 300);
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, options);
    
    // Set different transition delays for staggered animation
    projectCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(card);
    });
  });