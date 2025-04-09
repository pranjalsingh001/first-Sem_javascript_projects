// Initialize Lucide icons
lucide.createIcons();

// State Management
const state = {
    template: 'standard',
    personal: {
        name: '',
        email: '',
        phone: '',
        location: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: []
};

// Dark Mode Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    const themeIcon = document.querySelector('#theme-toggle i');
    const themeText = document.querySelector('#theme-toggle span');
    
    if (isDarkMode) {
        themeIcon.setAttribute('data-lucide', 'sun');
        themeText.textContent = 'Light Mode';
    } else {
        themeIcon.setAttribute('data-lucide', 'moon');
        themeText.textContent = 'Dark Mode';
    }
    lucide.createIcons();
});

// Smooth scroll from landing to builder
document.querySelector('.landing-cta a').addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
    });
});

// Template Selection
document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        state.template = card.dataset.template;
        updatePreview();
    });
});

// Personal Information
['name', 'email', 'phone', 'location'].forEach(field => {
    document.getElementById(field).addEventListener('input', (e) => {
        state.personal[field] = e.target.value;
        updatePreview();
    });
});

// Professional Summary
document.getElementById('summary').addEventListener('input', (e) => {
    state.summary = e.target.value;
    updatePreview();
});

// Suggestion Pills
document.querySelectorAll('.suggestion-pill').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.dataset.text;
        // Find the nearest input or textarea within the same section
        const section = btn.closest('.card');
        const input = section.querySelector('textarea') || section.querySelector('input');
        
        if (input) {
            if (input.tagName === 'TEXTAREA') {
                // For textareas (like summary), replace content
                input.value = text;
            } else {
                // For inputs (like skills), add the skill
                const skillsContainer = document.getElementById('skills-items');
                const skillItem = createSkillItem(text);
                skillsContainer.appendChild(skillItem);
                lucide.createIcons();
                updateSkills();
            }
            
            // Trigger input event to update state
            input.dispatchEvent(new Event('input'));
        }
    });
});

// Experience Section
function createExperienceItem(data = { title: '', company: '', period: '', description: '' }) {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
        <div class="grid gap-4">
            <input type="text" placeholder="Job Title" class="input-field" value="${data.title}">
            <input type="text" placeholder="Company" class="input-field" value="${data.company}">
            <input type="text" placeholder="Period (e.g., 2020 - Present)" class="input-field" value="${data.period}">
            <textarea placeholder="Job Description" rows="3" class="input-field">${data.description}</textarea>
            <button class="remove-btn">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
                Remove
            </button>
        </div>
    `;

    const inputs = div.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', updateExperience);
    });

    div.querySelector('.remove-btn').addEventListener('click', () => {
        div.remove();
        updateExperience();
    });

    return div;
}

function updateExperience() {
    state.experience = Array.from(document.querySelectorAll('#experience-items > div')).map(item => ({
        title: item.querySelector('input:nth-child(1)').value,
        company: item.querySelector('input:nth-child(2)').value,
        period: item.querySelector('input:nth-child(3)').value,
        description: item.querySelector('textarea').value
    }));
    updatePreview();
}

document.getElementById('add-experience').addEventListener('click', () => {
    const container = document.getElementById('experience-items');
    container.appendChild(createExperienceItem());
    lucide.createIcons();
});

// Education Section
function createEducationItem(data = { degree: '', school: '', year: '', description: '' }) {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
        <div class="grid gap-4">
            <input type="text" placeholder="Degree" class="input-field" value="${data.degree}">
            <input type="text" placeholder="School" class="input-field" value="${data.school}">
            <input type="text" placeholder="Year" class="input-field" value="${data.year}">
            <textarea placeholder="Description" rows="2" class="input-field">${data.description}</textarea>
            <button class="remove-btn">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
                Remove
            </button>
        </div>
    `;

    const inputs = div.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', updateEducation);
    });

    div.querySelector('.remove-btn').addEventListener('click', () => {
        div.remove();
        updateEducation();
    });

    return div;
}

function updateEducation() {
    state.education = Array.from(document.querySelectorAll('#education-items > div')).map(item => ({
        degree: item.querySelector('input:nth-child(1)').value,
        school: item.querySelector('input:nth-child(2)').value,
        year: item.querySelector('input:nth-child(3)').value,
        description: item.querySelector('textarea').value
    }));
    updatePreview();
}

document.getElementById('add-education').addEventListener('click', () => {
    const container = document.getElementById('education-items');
    container.appendChild(createEducationItem());
    lucide.createIcons();
});

// Skills Section
function createSkillItem(skill = '') {
    const div = document.createElement('div');
    div.className = 'flex gap-4 item-card';
    div.innerHTML = `
        <input type="text" placeholder="Skill" class="input-field flex-1" value="${skill}">
        <button class="remove-btn">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
    `;

    div.querySelector('input').addEventListener('input', updateSkills);
    div.querySelector('.remove-btn').addEventListener('click', () => {
        div.remove();
        updateSkills();
    });

    return div;
}

function updateSkills() {
    state.skills = Array.from(document.querySelectorAll('#skills-items input')).map(input => input.value);
    updatePreview();
}

document.getElementById('add-skill').addEventListener('click', () => {
    const container = document.getElementById('skills-items');
    container.appendChild(createSkillItem());
    lucide.createIcons();
});

// Preview Generation
function updatePreview() {
    const preview = document.getElementById('resume-preview');
    preview.className = `bg-white text-black min-h-[1056px] preview-${state.template}`;

    // Different template layouts
    switch(state.template) {
        case 'modern':
            renderModernTemplate(preview);
            break;
        case 'standard':
        default:
            renderStandardTemplate(preview);
            break;
    }
}

function renderStandardTemplate(container) {
    let html = '';

    // Header
    html += `
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold mb-2">${state.personal.name || 'Your Name'}</h1>
            <div class="text-gray-600">
                ${state.personal.email ? `<span>${state.personal.email}</span>` : ''}
                ${state.personal.email && state.personal.phone ? ' | ' : ''}
                ${state.personal.phone ? `<span>${state.personal.phone}</span>` : ''}
                ${(state.personal.email || state.personal.phone) && state.personal.location ? ' | ' : ''}
                                ${state.personal.location ? `<span>${state.personal.location}</span>` : ''}
            </div>
        </div>
    `;

    // Summary
    if (state.summary) {
        html += `
            <div class="mb-6">
                <h2 class="text-xl font-bold border-b pb-1 mb-2">Summary</h2>
                <p class="text-gray-700">${state.summary}</p>
            </div>
        `;
    }

    // Experience
    if (state.experience.length > 0) {
        html += `<div class="mb-6"><h2 class="text-xl font-bold border-b pb-1 mb-2">Experience</h2>`;
        state.experience.forEach(exp => {
            if (exp.title || exp.company || exp.period || exp.description) {
                html += `
                    <div class="mb-4">
                        <div class="flex justify-between">
                            <h3 class="font-bold">${exp.title || 'Job Title'}</h3>
                            <span class="text-gray-600">${exp.period || 'Period'}</span>
                        </div>
                        <div class="text-gray-600 mb-1">${exp.company || 'Company'}</div>
                        <p class="text-gray-700">${exp.description || 'Job description'}</p>
                    </div>
                `;
            }
        });
        html += `</div>`;
    }

    // Education
    if (state.education.length > 0) {
        html += `<div class="mb-6"><h2 class="text-xl font-bold border-b pb-1 mb-2">Education</h2>`;
        state.education.forEach(edu => {
            if (edu.degree || edu.school || edu.year || edu.description) {
                html += `
                    <div class="mb-4">
                        <div class="flex justify-between">
                            <h3 class="font-bold">${edu.degree || 'Degree'}</h3>
                            <span class="text-gray-600">${edu.year || 'Year'}</span>
                        </div>
                        <div class="text-gray-600 mb-1">${edu.school || 'School'}</div>
                        ${edu.description ? `<p class="text-gray-700">${edu.description}</p>` : ''}
                    </div>
                `;
            }
        });
        html += `</div>`;
    }

    // Skills
    if (state.skills.length > 0 && state.skills.some(skill => skill.trim() !== '')) {
        html += `<div class="mb-6"><h2 class="text-xl font-bold border-b pb-1 mb-2">Skills</h2>`;
        html += `<div class="flex flex-wrap gap-2">`;
        state.skills.forEach(skill => {
            if (skill.trim() !== '') {
                html += `<span class="bg-gray-100 px-3 py-1 rounded-full">${skill}</span>`;
            }
        });
        html += `</div></div>`;
    }

    container.innerHTML = html;
}



function renderModernTemplate(container) {
    let html = `
        <div class="p-8">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-4xl font-bold mb-1">${state.personal.name || 'Your Name'}</h1>
                    ${state.personal.email ? `<div class="text-lg">${state.personal.email}</div>` : ''}
                </div>
                <div class="text-right">
                    ${state.personal.phone ? `<div class="text-lg">${state.personal.phone}</div>` : ''}
                    ${state.personal.location ? `<div class="text-lg">${state.personal.location}</div>` : ''}
                </div>
            </div>
    `;

    // Summary
    if (state.summary) {
        html += `
            <div class="mb-8 bg-gray-100 p-4 rounded-lg">
                <h2 class="text-xl font-bold mb-2">About</h2>
                <p class="text-gray-700">${state.summary}</p>
            </div>
        `;
    }

    // Two-column layout for experience and education
    html += `<div class="grid grid-cols-2 gap-8">`;

    // Experience
    if (state.experience.length > 0) {
        html += `<div><h2 class="text-2xl font-bold border-b pb-1 mb-4">Experience</h2>`;
        state.experience.forEach(exp => {
            if (exp.title || exp.company || exp.period || exp.description) {
                html += `
                    <div class="mb-6">
                        <h3 class="text-lg font-bold">${exp.title || 'Job Title'}</h3>
                        <div class="flex justify-between text-gray-600 mb-1">
                            <span>${exp.company || 'Company'}</span>
                            <span>${exp.period || 'Period'}</span>
                        </div>
                        <p class="text-gray-700">${exp.description || 'Job description'}</p>
                    </div>
                `;
            }
        });
        html += `</div>`;
    }

    // Education and Skills
    html += `<div>`;

    // Education
    if (state.education.length > 0) {
        html += `<div class="mb-8"><h2 class="text-2xl font-bold border-b pb-1 mb-4">Education</h2>`;
        state.education.forEach(edu => {
            if (edu.degree || edu.school || edu.year || edu.description) {
                html += `
                    <div class="mb-4">
                        <h3 class="text-lg font-bold">${edu.degree || 'Degree'}</h3>
                        <div class="flex justify-between text-gray-600 mb-1">
                            <span>${edu.school || 'School'}</span>
                            <span>${edu.year || 'Year'}</span>
                        </div>
                        ${edu.description ? `<p class="text-gray-700">${edu.description}</p>` : ''}
                    </div>
                `;
            }
        });
        html += `</div>`;
    }

    // Skills
    if (state.skills.length > 0 && state.skills.some(skill => skill.trim() !== '')) {
        html += `<div><h2 class="text-2xl font-bold border-b pb-1 mb-4">Skills</h2>`;
        html += `<div class="grid grid-cols-2 gap-2">`;
        state.skills.forEach(skill => {
            if (skill.trim() !== '') {
                html += `<div class="flex items-center gap-2">
                    <i data-lucide="check" class="w-4 h-4"></i>
                    <span>${skill}</span>
                </div>`;
            }
        });
        html += `</div></div>`;
    }

    html += `</div></div></div>`;
    container.innerHTML = html;
    lucide.createIcons();
}

// Export Functions
document.getElementById("download-pdf").addEventListener("click", () => {
    const element = document.getElementById("resume-preview");

    const opt = {
        margin: 10, // Optional margin inside the A4 page
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true, // handles images/fonts from CDN
            scrollY: 0,
            scrollX: 0
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
    };

    html2pdf().set(opt).from(element).save();
});
// Initialize
updatePreview();