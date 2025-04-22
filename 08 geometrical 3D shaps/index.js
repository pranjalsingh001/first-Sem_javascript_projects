const shapesContainer = document.getElementById('shapesContainer');
        const lightRaysContainer = document.getElementById('lightRaysContainer');
        
        // Create 3D shapes
        function createShapes() {
            // Cube
            const cube = document.createElement('div');
            cube.className = 'shape cube';
            cube.style.top = '20%';
            cube.style.left = '15%';
            
            // Cube faces
            const cubeFaces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
            cubeFaces.forEach(face => {
                const cubeFace = document.createElement('div');
                cubeFace.className = `cube-face cube-${face}`;
                cube.appendChild(cubeFace);
            });
            
            shapesContainer.appendChild(cube);
            
            // Sphere
            const sphere = document.createElement('div');
            sphere.className = 'shape sphere';
            sphere.style.top = '30%';
            sphere.style.right = '20%';
            shapesContainer.appendChild(sphere);
            
            // Cone
            const cone = document.createElement('div');
            cone.className = 'shape cone';
            cone.style.bottom = '25%';
            cone.style.left = '25%';
            
            // Cone parts
            const coneBase = document.createElement('div');
            coneBase.className = 'cone-base';
            cone.appendChild(coneBase);
            
            const coneSide = document.createElement('div');
            coneSide.className = 'cone-side';
            cone.appendChild(coneSide);
            
            shapesContainer.appendChild(cone);
            
            // Cylinder
            const cylinder = document.createElement('div');
            cylinder.className = 'shape cylinder';
            cylinder.style.top = '15%';
            cylinder.style.right = '30%';
            
            // Cylinder parts
            const cylinderTop = document.createElement('div');
            cylinderTop.className = 'cylinder-top';
            cylinder.appendChild(cylinderTop);
            
            const cylinderBottom = document.createElement('div');
            cylinderBottom.className = 'cylinder-bottom';
            cylinder.appendChild(cylinderBottom);
            
            const cylinderSide = document.createElement('div');
            cylinderSide.className = 'cylinder-side';
            cylinder.appendChild(cylinderSide);
            
            shapesContainer.appendChild(cylinder);
            
            // Torus
            const torus = document.createElement('div');
            torus.className = 'shape torus';
            torus.style.bottom = '20%';
            torus.style.right = '15%';
            
            // Torus parts
            const torusInner = document.createElement('div');
            torusInner.className = 'torus-inner';
            torus.appendChild(torusInner);
            
            const torusOuter = document.createElement('div');
            torusOuter.className = 'torus-outer';
            torus.appendChild(torusOuter);
            
            shapesContainer.appendChild(torus);
        }
        
        createShapes();
        
        // Create light rays
        function createLightRays() {
            for (let i = 0; i < 10; i++) {
                const lightRay = document.createElement('div');
                lightRay.className = 'light-ray';
                lightRay.style.left = `${Math.random() * 100}%`;
                lightRay.style.animationDelay = `${Math.random() * 5}s`;
                lightRaysContainer.appendChild(lightRay);
            }
        }
        
        createLightRays();
        
        // Add animation to shapes
        function animateShapes() {
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach(shape => {
                shape.addEventListener('mousemove', (e) => {
                    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                    shape.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
                });
                
                shape.addEventListener('mouseleave', () => {
                    shape.style.transform = '';
                });
            });
        }
        
        animateShapes();