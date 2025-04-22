// Create geometric shapes that fall from the top
const createGeometricShapes = () => {
    const shapeTypes = ['cube', 'sphere', 'pyramid', 'prism'];
    const container = document.getElementById('geoShapes');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Clear existing shapes
    container.innerHTML = '';
    
    // Create new shapes
    for (let i = 0; i < 20; i++) {
      const shape = document.createElement('div');
      const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const size = Math.random() * 30 + 10; // 10-40px
      const startX = Math.random() * containerWidth;
      const endX = startX + (Math.random() * 200 - 100); // Random horizontal drift
      const rotX = Math.random() * 360;
      const rotY = Math.random() * 360;
      const rotZ = Math.random() * 360;
      const delay = Math.random() * 10; // 0-10s delay
      const duration = Math.random() * 15 + 10; // 10-25s duration
      
      shape.classList.add('geo-shape', shapeType);
      shape.style.setProperty('--size', `${size}px`);
      shape.style.setProperty('--startX', `${startX}px`);
      shape.style.setProperty('--endX', `${endX}px`);
      shape.style.setProperty('--rotX', `${rotX}deg`);
      shape.style.setProperty('--rotY', `${rotY}deg`);
      shape.style.setProperty('--rotZ', `${rotZ}deg`);
      shape.style.left = `${startX}px`;
      shape.style.top = `-${size}px`;
      shape.style.animationDelay = `${delay}s`;
      shape.style.animationDuration = `${duration}s`;
      
      container.appendChild(shape);
      
      // Remove and recreate shape when animation ends
      shape.addEventListener('animationend', () => {
        shape.remove();
        createSingleShape();
      });
    }
  };
  
  const createSingleShape = () => {
    const shapeTypes = ['cube', 'sphere', 'pyramid', 'prism'];
    const container = document.getElementById('geoShapes');
    const containerWidth = container.offsetWidth;
    
    const shape = document.createElement('div');
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const size = Math.random() * 30 + 10; // 10-40px
    const startX = Math.random() * containerWidth;
    const endX = startX + (Math.random() * 200 - 100); // Random horizontal drift
    const rotX = Math.random() * 360;
    const rotY = Math.random() * 360;
    const rotZ = Math.random() * 360;
    const delay = 0; // Start immediately
    const duration = Math.random() * 15 + 10; // 10-25s duration
    
    shape.classList.add('geo-shape', shapeType);
    shape.style.setProperty('--size', `${size}px`);
    shape.style.setProperty('--startX', `${startX}px`);
    shape.style.setProperty('--endX', `${endX}px`);
    shape.style.setProperty('--rotX', `${rotX}deg`);
    shape.style.setProperty('--rotY', `${rotY}deg`);
    shape.style.setProperty('--rotZ', `${rotZ}deg`);
    shape.style.left = `${startX}px`;
    shape.style.top = `-${size}px`;
    shape.style.animationDelay = `${delay}s`;
    shape.style.animationDuration = `${duration}s`;
    
    container.appendChild(shape);
    
    // Remove and recreate shape when animation ends
    shape.addEventListener('animationend', () => {
      shape.remove();
      createSingleShape();
    });
  };
  
  // Parallax effect for background
  document.addEventListener('mousemove', (e) => {
    const card = document.getElementById('aboutCard');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
    
    // Add subtle tilt effect in addition to the floating animation
    card.style.transform = `translateY(0) rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
    
    // Move shapes for parallax effect
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      const factor = (index + 1) * 0.02;
      const xMove = e.pageX * factor;
      const yMove = e.pageY * factor;
      shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
  });
  
  // Reset card transform when mouse leaves
  document.addEventListener('mouseleave', () => {
    const card = document.getElementById('aboutCard');
    // Reset to the normal floating animation
    card.style.transform = '';
  });
  
  // Check if a file upload input exists to handle profile photo uploads
  const setUpPhotoUpload = () => {
    const photoPlaceholder = document.getElementById('profilePhoto');
    
    // This is a placeholder function - in a real implementation, you'd handle file uploads
    // For now, we'll just provide a way to display the photo
    photoPlaceholder.addEventListener('click', () => {
      alert("In a real implementation, clicking this would open a file upload dialog to add your photo.");
    });
  };
  
  // Scroll reveal animation
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize geometric shapes
    createGeometricShapes();
    
    // Set up photo placeholder
    setUpPhotoUpload();
    
    // Reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    setTimeout(() => {
      revealElements.forEach(el => {
        el.classList.add('active');
      });
    }, 300);
    
    // Set the width for typing animation after a delay
    setTimeout(() => {
      document.querySelector('.typing-text').style.width = '100%';
    }, 500);
  });
  
  // Highlight words on hover
  const highlights = document.querySelectorAll('.highlight');
  highlights.forEach(highlight => {
    highlight.addEventListener('mouseover', () => {
      highlight.style.transform = 'scale(1.1)';
    });
    
    highlight.addEventListener('mouseout', () => {
      highlight.style.transform = 'scale(1)';
    });
  });

  function scrollToProjects() {
      // Add a fade-out effect before navigating
      document.body.classList.add('fade-out');

      // Redirect to the projects page after the animation
      setTimeout(() => {
          window.location.href = 'project section.html';
      }, 500); // Match the duration of the fade-out animation
  }