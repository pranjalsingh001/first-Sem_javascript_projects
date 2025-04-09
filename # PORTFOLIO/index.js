    // DOM Elements
    const cursor = document.querySelector('.cursor');
    const cursorRing = document.querySelector('.cursor-ring');
    const shapesContainer = document.getElementById('shapesContainer');
    const nameElement = document.getElementById('name');
    const nameReflection = document.getElementById('nameReflection');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const lightRaysContainer = document.getElementById('lightRaysContainer');
    const navCards = document.querySelectorAll('.nav-card');
    
    //It Create 3D shapes
    function createShapes() {
      // cube
      const cube = document.createElement('div');
      cube.className = 'shape cube';
      cube.style.top = '20%';
      cube.style.left = '15%';
      
      //  cube faces
      const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
      faces.forEach(face => {
        const cubeFace = document.createElement('div');
        cubeFace.className = `cube-face cube-${face}`;
        cube.appendChild(cubeFace);
      });
      
      shapesContainer.appendChild(cube);
      
      // sphere
      const sphere = document.createElement('div');
      sphere.className = 'shape sphere';
      sphere.style.top = '30%';
      sphere.style.right = '20%';
      shapesContainer.appendChild(sphere);
      
      // cone
      const cone = document.createElement('div');
      cone.className = 'shape cone';
      cone.style.bottom = '25%';
      cone.style.left = '25%';
      shapesContainer.appendChild(cone);
      
      // cylinder
      const cylinder = document.createElement('div');
      cylinder.className = 'shape cylinder';
      cylinder.style.top = '15%';
      cylinder.style.right = '30%';
      shapesContainer.appendChild(cylinder);
      
      // torus
      const torus = document.createElement('div');
      torus.className = 'shape torus';
      torus.style.bottom = '20%';
      torus.style.right = '15%';
      shapesContainer.appendChild(torus);
    }
    
    createShapes();
    
    // It Create light rays
    function createLightRays() {
      for (let i = 0; i < 10; i++) {
        const lightRay = document.createElement('div');
        lightRay.className = 'light-ray';
        lightRay.style.left = `${Math.random() * 100}%`;
        lightRaysContainer.appendChild(lightRay);
      }
    }
    
    createLightRays();
    
    // Animate light rays
    function animateLightRays() {
      const lightRays = document.querySelectorAll('.light-ray');
      
      lightRays.forEach((ray, index) => {
        setTimeout(() => {
          ray.style.opacity = '0.7';
          ray.style.transition = 'opacity 2s ease';
          
          setTimeout(() => {
            ray.style.opacity = '0';
            ray.style.left = `${Math.random() * 100}%`;
            
            setTimeout(() => {
              animateLightRay(ray);
            }, Math.random() * 5000);
          }, 2000);
        }, index * 1000);
      });
    }
    
    function animateLightRay(ray) {
      ray.style.opacity = '0.7';
      ray.style.transition = 'opacity 2s ease';
      
      setTimeout(() => {
        ray.style.opacity = '0';
        ray.style.left = `${Math.random() * 100}%`;
        
        setTimeout(() => {
          animateLightRay(ray);
        }, Math.random() * 5000 + 2000);
      }, 2000);
    }
    
    animateLightRays();
    
    // Custom cursor
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Delayed cursor ring movement for trailing effect
      setTimeout(() => {
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
      }, 50);
      
      // Interact with 3D shapes
      const shapes = document.querySelectorAll('.shape');
      shapes.forEach(shape => {
        const rect = shape.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 300) {
          const angle = Math.atan2(distanceY, distanceX);
          const force = (300 - distance) / 30;
          const moveX = Math.cos(angle) * -force;
          const moveY = Math.sin(angle) * -force;
          
          // Apply movement based on shape type
          if (shape.classList.contains('cube')) {
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${moveY}deg) rotateY(${-moveX}deg)`;
          } else if (shape.classList.contains('sphere')) {
            shape.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force/50})`;
            shape.style.boxShadow = `0 0 ${20 + force}px rgba(176, 38, 255, ${0.3 + force/30})`;
          } else if (shape.classList.contains('cone')) {
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${moveY}deg)`;
          } else if (shape.classList.contains('cylinder')) {
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotateZ(${moveX/10}deg)`;
          } else if (shape.classList.contains('torus')) {
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${moveY/2}deg) rotateY(${-moveX/2}deg)`;
          }
          
          // Change color intensity based on proximity
          if (distance < 150) {
            if (shape.classList.contains('cube')) {
              const faces = shape.querySelectorAll('.cube-face');
              faces.forEach(face => {
                face.style.background = `rgba(14, 165, 233, ${0.1 + (150-distance)/500})`;
                face.style.boxShadow = `0 0 ${15 + (150-distance)/10}px rgba(14, 165, 233, ${0.2 + (150-distance)/500})`;
              });
            } else if (shape.classList.contains('sphere')) {
              shape.style.background = `radial-gradient(circle at 30% 30%, rgba(176, 38, 255, ${0.3 + (150-distance)/500}), rgba(176, 38, 255, ${0.1 + (150-distance)/1000}))`;
            } else if (shape.classList.contains('cone')) {
              shape.style.borderBottomColor = `rgba(255, 45, 146, ${0.2 + (150-distance)/500})`;
              shape.style.filter = `drop-shadow(0 0 ${15 + (150-distance)/10}px rgba(255, 45, 146, ${0.3 + (150-distance)/500}))`;
            } else if (shape.classList.contains('cylinder')) {
              shape.style.background = `rgba(0, 255, 157, ${0.15 + (150-distance)/500})`;
              shape.style.boxShadow = `0 0 ${15 + (150-distance)/10}px rgba(0, 255, 157, ${0.2 + (150-distance)/500})`;
            } else if (shape.classList.contains('torus')) {
              shape.style.borderColor = `rgba(0, 200, 255, ${0.2 + (150-distance)/500})`;
              shape.style.boxShadow = `0 0 ${20 + (150-distance)/10}px rgba(0, 200, 255, ${0.3 + (150-distance)/500})`;
            }
          }
        } else {
          // Reset shape position and color when cursor is far away
          shape.style.transform = '';
          
          if (shape.classList.contains('cube')) {
            const faces = shape.querySelectorAll('.cube-face');
            faces.forEach(face => {
              face.style.background = 'rgba(14, 165, 233, 0.1)';
              face.style.boxShadow = '0 0 15px rgba(14, 165, 233, 0.2)';
            });
          } else if (shape.classList.contains('sphere')) {
            shape.style.background = 'radial-gradient(circle at 30% 30%, rgba(176, 38, 255, 0.3), rgba(176, 38, 255, 0.1))';
            shape.style.boxShadow = '0 0 20px rgba(176, 38, 255, 0.3)';
          } else if (shape.classList.contains('cone')) {
            shape.style.borderBottomColor = 'rgba(255, 45, 146, 0.2)';
            shape.style.filter = 'drop-shadow(0 0 15px rgba(255, 45, 146, 0.3))';
          } else if (shape.classList.contains('cylinder')) {
            shape.style.background = 'rgba(0, 255, 157, 0.15)';
            shape.style.boxShadow = '0 0 15px rgba(0, 255, 157, 0.2)';
          } else if (shape.classList.contains('torus')) {
            shape.style.borderColor = 'rgba(0, 200, 255, 0.2)';
            shape.style.boxShadow = '0 0 20px rgba(0, 200, 255, 0.3)';
          }
        }
      });
      
      // Name interaction effect
      const nameRect = nameElement.getBoundingClientRect();
      const nameCenterX = nameRect.left + nameRect.width / 2;
      const nameCenterY = nameRect.top + nameRect.height / 2;
      const nameDistanceX = e.clientX - nameCenterX;
      const nameDistanceY = e.clientY - nameCenterY;
      const nameDistance = Math.sqrt(nameDistanceX * nameDistanceX + nameDistanceY * nameDistanceY);
      
      if (nameDistance < 300) {
        const nameAngle = Math.atan2(nameDistanceY, nameDistanceX);
        const nameForce = (300 - nameDistance) / 30;
        const nameMoveX = Math.cos(nameAngle) * -nameForce / 5;
        const nameMoveY = Math.sin(nameAngle) * -nameForce / 5;
        
        nameElement.style.transform = `translate(${nameMoveX}px, ${nameMoveY}px) rotateY(${nameMoveX}deg)`;
        nameReflection.style.transform = `rotateX(180deg) translateY(20px) translate(${nameMoveX}px, ${-nameMoveY}px)`;
        
        // Increase glow based on proximity
        const glowIntensity = Math.min(0.8 + (300 - nameDistance) / 300, 1);
        nameElement.style.textShadow = `
          0 0 ${10 + nameForce}px rgba(255, 255, 255, ${glowIntensity}),
          0 0 ${20 + nameForce}px rgba(14, 165, 233, ${glowIntensity}),
          0 0 ${30 + nameForce}px rgba(14, 165, 233, ${glowIntensity * 0.8}),
          0 0 ${40 + nameForce}px rgba(14, 165, 233, ${glowIntensity * 0.6})
        `;
      } else {
        nameElement.style.transform = '';
        nameReflection.style.transform = 'rotateX(180deg) translateY(20px)';
        nameElement.style.textShadow = `
          0 0 10px rgba(255, 255, 255, 0.8),
          0 0 20px rgba(14, 165, 233, 0.8),
          0 0 30px rgba(14, 165, 233, 0.6),
          0 0 40px rgba(14, 165, 233, 0.4)
        `;
      }
    });
    
    // Light trail effect
    const trails = [];
    const maxTrails = 15;
    
    function createTrail(x, y) {
      const trail = document.createElement('div');
      trail.classList.add('trail');
      trail.style.left = x + 'px';
      trail.style.top = y + 'px';
      document.body.appendChild(trail);
      
      // Random size and color for variety
      const size = Math.random() * 10 + 5;
      const hue = Math.random() * 60 + 180; // Blue to cyan range
      
      trail.style.width = size + 'px';
      trail.style.height = size + 'px';
      trail.style.backgroundColor = `hsla(${hue}, 80%, 60%, 0.7)`;
      
      trails.push({
        element: trail,
        x: x,
        y: y,
        size: size,
        opacity: 0.7,
        hue: hue
      });
      
      if (trails.length > maxTrails) {
        const oldestTrail = trails.shift();
        oldestTrail.element.remove();
      }
    }
    
    let lastX = 0;
    let lastY = 0;
    
    document.addEventListener('mousemove', (e) => {
      // Only create trail if mouse moved some distance
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 20) {
        createTrail(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    });
    
    // Animate trails
    function animateTrails() {
      trails.forEach(trail => {
        trail.opacity -= 0.02;
        trail.size -= 0.2;
        
        if (trail.opacity > 0 && trail.size > 0) {
          trail.element.style.opacity = trail.opacity;
          trail.element.style.width = trail.size + 'px';
          trail.element.style.height = trail.size + 'px';
        } else {
          trail.opacity = 0;
        }
      });
      
      requestAnimationFrame(animateTrails);
    }
    animateTrails();
    
    // Cursor effects on interactive elements
    document.querySelectorAll('a, button, .nav-card').forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = 'rgba(14, 165, 233, 0.8)';
        cursorRing.style.width = '50px';
        cursorRing.style.height = '50px';
        cursorRing.style.borderColor = 'rgba(14, 165, 233, 0.5)';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'rgba(14, 165, 233, 0.5)';
        cursorRing.style.width = '40px';
        cursorRing.style.height = '40px';
        cursorRing.style.borderColor = 'rgba(14, 165, 233, 0.3)';
      });
    });
    
    // Click effect
    document.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.classList.add('trail');
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      ripple.style.width = '5px';
      ripple.style.height = '5px';
      ripple.style.backgroundColor = 'rgba(14, 165, 233, 1)';
      document.body.appendChild(ripple);
      
      // Animate ripple
      let size = 5;
      let opacity = 1;
      
      const rippleAnimation = setInterval(() => {
        size += 10;
        opacity -= 0.05;
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.opacity = opacity;
        ripple.style.transform = 'translate(-50%, -50%)';
        
        if (opacity <= 0) {
          clearInterval(rippleAnimation);
          ripple.remove();
        }
      }, 20);
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
    
    // Navbar card hover effects
    navCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        // Create shine effect
        const shine = document.createElement('div');
        shine.style.position = 'absolute';
        shine.style.top = '0';
        shine.style.left = '-100%';
        shine.style.width = '100%';
        shine.style.height = '100%';
        shine.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)';
        shine.style.transform = 'skewX(-25deg)';
        shine.style.transition = 'left 0.5s ease';
        shine.style.zIndex = '1';
        
        card.appendChild(shine);
        
        setTimeout(() => {
          shine.style.left = '100%';
          
          setTimeout(() => {
            shine.remove();
          }, 500);
        }, 10);
      });
    });
    
    // Initial animations
    window.addEventListener('load', () => {
      // Animate shapes with random delays
      const shapes = document.querySelectorAll('.shape');
      shapes.forEach((shape, index) => {
        setTimeout(() => {
          shape.style.opacity = '1';
          shape.style.transform = 'scale(1)';
        }, index * 200);
      });
      
      // Animate name with letter-by-letter reveal
      const nameText = nameElement.textContent;
      nameElement.textContent = '';
      nameReflection.textContent = '';
      
      for (let i = 0; i < nameText.length; i++) {
        setTimeout(() => {
          nameElement.textContent = nameText.substring(0, i + 1);
          nameReflection.textContent = nameText.substring(0, i + 1);
        }, i * 100);
      }
    });

    document.addEventListener("DOMContentLoaded", () => {
        const navCards = document.querySelectorAll(".nav-card");
      
        navCards.forEach((card) => {
          card.addEventListener("click", (event) => {
            const link = card.getAttribute("data-link");
            if (link) {
              event.preventDefault(); // Prevent immediate navigation
              document.body.classList.add("fade-out"); // Add fade-out class
      
              // Wait for the animation to complete, then navigate
              setTimeout(() => {
                window.location.href = link;
              }, 500); // Match the duration of the CSS transition
            }
          });
        });

    });
      


