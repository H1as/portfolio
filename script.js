// script.js - Enhanced with section-specific 3D functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all 3D systems
    initBackground3D();
    initSkills3D();
    initPortfolio3D();
    initCertificates3D();
    initContact3D();
    
    // Set current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
        
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // 3D Toggle functionality
    const threeDToggle = document.querySelector('.toggle-3d');
    if (threeDToggle) {
        threeDToggle.addEventListener('click', function() {
            document.body.classList.toggle('3d-enabled');
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (document.body.classList.contains('3d-enabled')) {
                icon.classList.replace('fa-cube', 'fa-cubes');
                enableAll3DEffects();
            } else {
                icon.classList.replace('fa-cubes', 'fa-cube');
                disableAll3DEffects();
            }
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        }
        
        // Update active section detection
        updateActiveSection();
    });

    // ========== 3D BACKGROUND SYSTEM ==========
    function initBackground3D() {
        createParticles();
        create3DBackground();
    }
    
    function createParticles() {
        const container = document.getElementById('particles-container');
        const particleCount = 100;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = 15 + Math.random() * 20;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
            
            container.appendChild(particle);
        }
    }
    
    function create3DBackground() {
        const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const nodes = [];
        const nodeCount = 50;
        
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * 100,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                vz: (Math.random() - 0.5) * 0.1
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connections
            ctx.strokeStyle = 'rgba(79, 70, 229, 0.05)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            // Update and draw nodes
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                node.z += node.vz;
                
                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                if (node.z < 0 || node.z > 100) node.vz *= -1;
                
                // Draw node
                const radius = 2 + (node.z / 100) * 3;
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(79, 70, 229, ${0.1 + (node.z / 100) * 0.2})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // ========== SKILLS SECTION 3D ==========
    function initSkills3D() {
        createSkillSphere();
        setupSkillInteractions();
        animateSkillBars();
    }
    
    function createSkillSphere() {
        const sphere = document.querySelector('.skill-sphere-3d');
        if (!sphere) return;
        
        const points = 30;
        const radius = 80;
        
        for (let i = 0; i < points; i++) {
            const phi = Math.acos(-1 + (2 * i) / points);
            const theta = Math.sqrt(points * Math.PI) * phi;
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            const point = document.createElement('div');
            point.className = 'skill-point';
            point.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            point.style.opacity = 0.3 + (z / radius) * 0.7;
            
            sphere.appendChild(point);
        }
    }
    
    function setupSkillInteractions() {
        const skillCategories = document.querySelectorAll('.skill-category');
        const detailPanel = document.querySelector('.skills-detail-panel');
        const detailContent = detailPanel.querySelector('.detail-content');
        const detailClose = detailPanel.querySelector('.detail-close');
        
        skillCategories.forEach(category => {
            const front = category.querySelector('.category-front');
            const back = category.querySelector('.category-back');
            
            category.addEventListener('mouseenter', function() {
                if (!document.body.classList.contains('3d-enabled')) return;
                
                const categoryType = this.getAttribute('data-category');
                const skillData = getSkillData(categoryType);
                
                // Update detail panel
                detailContent.innerHTML = `
                    <h4>${skillData.title}</h4>
                    <p>${skillData.description}</p>
                    <div class="skill-breakdown">
                        <h5>Tools & Technologies:</h5>
                        <ul>
                            ${skillData.tools.map(tool => `<li>${tool}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="skill-projects">
                        <h5>Related Projects:</h5>
                        <p>${skillData.projects}</p>
                    </div>
                `;
            });
            
            category.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    this.querySelector('.category-3d-inner').style.transform = 
                        this.querySelector('.category-3d-inner').style.transform.includes('180deg') 
                            ? 'rotateY(0deg)' 
                            : 'rotateY(180deg)';
                }
            });
            
            category.addEventListener('dblclick', function() {
                if (document.body.classList.contains('3d-enabled')) {
                    detailPanel.classList.add('active');
                }
            });
        });
        
        detailClose.addEventListener('click', () => {
            detailPanel.classList.remove('active');
        });
        
        // Close panel when clicking outside
        detailPanel.addEventListener('click', (e) => {
            if (e.target === detailPanel) {
                detailPanel.classList.remove('active');
            }
        });
    }
    
    function getSkillData(category) {
        const data = {
            programming: {
                title: "Programming & Development",
                description: "Expertise in modern programming languages and development practices.",
                tools: ["Java", "HTML5/CSS3", "JavaScript", "Python", "Git", "REST APIs"],
                projects: "Developed multiple web applications with secure backend systems and responsive frontends."
            },
            security: {
                title: "Cybersecurity Tools",
                description: "Proficient in industry-standard security assessment and penetration testing tools.",
                tools: ["Wireshark", "Metasploit", "Nmap", "Burp Suite", "Hashcat", "John the Ripper"],
                projects: "Conducted security assessments for enterprise clients, identifying and mitigating vulnerabilities."
            },
            networking: {
                title: "Networking & Infrastructure",
                description: "Comprehensive networking knowledge with hands-on experience in network design and security.",
                tools: ["Cisco Packet Tracer", "Wireshark", "Linux", "TCP/IP", "VPN", "Firewalls"],
                projects: "Designed and implemented secure network infrastructures for small to medium businesses."
            }
        };
        
        return data[category] || data.programming;
    }
    
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-level');
                    entry.target.style.width = `${level}%`;
                    
                    // Add glow effect if 3D enabled
                    if (document.body.classList.contains('3d-enabled')) {
                        entry.target.style.boxShadow = '0 0 15px rgba(79, 70, 229, 0.5)';
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillLevels.forEach(skill => {
            skill.style.width = '0%';
            observer.observe(skill);
        });
    }

    // ========== PORTFOLIO SECTION 3D ==========
    function initPortfolio3D() {
        createPortfolioScene();
        setupPortfolioInteractions();
    }
    
    function createPortfolioScene() {
        const container = document.querySelector('.project-container-3d');
        if (!container) return;
        
        // Create 3D project models
        const projects = [
            { id: 'web-security', name: 'Web Security', icon: 'fa-globe', color: '#4f46e5' },
            { id: 'network-security', name: 'Network Security', icon: 'fa-network-wired', color: '#10b981' },
            { id: 'cryptography', name: 'Cryptography', icon: 'fa-lock', color: '#8b5cf6' }
        ];
        
        projects.forEach((project, index) => {
            const model = document.createElement('div');
            model.className = 'project-3d-model';
            model.setAttribute('data-project', project.id);
            model.style.transform = `translateZ(${index * 50}px) rotateY(${index * 120}deg)`;
            
            model.innerHTML = `
                <div class="model-content">
                    <i class="fas ${project.icon}"></i>
                    <h4>${project.name}</h4>
                </div>
            `;
            
            container.appendChild(model);
        });
        
        // Setup scene controls
        const rotateBtn = document.querySelector('.scene-rotate');
        const zoomInBtn = document.querySelector('.scene-zoom-in');
        const zoomOutBtn = document.querySelector('.scene-zoom-out');
        
        let rotation = 0;
        let zoom = 1;
        
        rotateBtn.addEventListener('click', () => {
            rotation += 120;
            container.style.transform = `rotateY(${rotation}deg) scale(${zoom})`;
        });
        
        zoomInBtn.addEventListener('click', () => {
            zoom = Math.min(zoom + 0.1, 1.5);
            container.style.transform = `rotateY(${rotation}deg) scale(${zoom})`;
        });
        
        zoomOutBtn.addEventListener('click', () => {
            zoom = Math.max(zoom - 0.1, 0.5);
            container.style.transform = `rotateY(${rotation}deg) scale(${zoom})`;
        });
    }
    
    function setupPortfolioInteractions() {
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        const sceneModels = document.querySelectorAll('.project-3d-model');
        
        portfolioCards.forEach(card => {
            const projectId = card.getAttribute('data-project');
            
            card.addEventListener('mouseenter', () => {
                if (!document.body.classList.contains('3d-enabled')) return;
                
                // Highlight corresponding 3D model
                sceneModels.forEach(model => {
                    if (model.getAttribute('data-project') === projectId) {
                        model.style.transform += ' scale(1.2)';
                        model.style.zIndex = '10';
                    }
                });
            });
            
            card.addEventListener('mouseleave', () => {
                sceneModels.forEach(model => {
                    model.style.transform = model.style.transform.replace(' scale(1.2)', '');
                    model.style.zIndex = '';
                });
            });
            
            card.addEventListener('click', function() {
                if (document.body.classList.contains('3d-enabled')) {
                    // Center the corresponding model
                    sceneModels.forEach(model => {
                        if (model.getAttribute('data-project') === projectId) {
                            model.style.transform = 'translateZ(100px) rotateY(0deg) scale(1.5)';
                            model.style.transition = 'transform 0.5s ease';
                            
                            setTimeout(() => {
                                model.style.transform = model.style.transform.replace(' scale(1.5)', '');
                            }, 2000);
                        }
                    });
                }
            });
        });
    }

    // ========== CERTIFICATES SECTION 3D ==========
    function initCertificates3D() {
        createCertificateWall();
        setupCertificateInteractions();
    }
    
    function createCertificateWall() {
        const wallContainer = document.querySelector('.cert-wall-container');
        if (!wallContainer) return;
        
        const certificates = [
            { title: 'CCNA', issuer: 'Cisco', year: '2025' },
            { title: 'Cybersecurity', issuer: 'Simpli Learn', year: '2025' },
            { title: 'OOP', issuer: 'Simpli Learn', year: '2025' },
            { title: 'Leadership', issuer: 'TUT', year: '2025' },
            { title: 'Network+', issuer: 'CompTIA', year: '2024' },
            { title: 'Security+', issuer: 'CompTIA', year: '2024' }
        ];
        
        // Create duplicate set for seamless scrolling
        [...certificates, ...certificates].forEach((cert, index) => {
            const certItem = document.createElement('div');
            certItem.className = 'certificate-3d-item';
            certItem.innerHTML = `
                <i class="fas fa-certificate" style="color: #4f46e5; font-size: 40px; margin-bottom: 10px;"></i>
                <h4 style="font-size: 14px; margin-bottom: 5px;">${cert.title}</h4>
                <p style="font-size: 12px; color: #94a3b8;">${cert.issuer}</p>
                <p style="font-size: 11px; color: #64748b;">${cert.year}</p>
            `;
            wallContainer.appendChild(certItem);
        });
    }
    
    function setupCertificateInteractions() {
        const certificateCards = document.querySelectorAll('.certificate-card');
        
        certificateCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (!document.body.classList.contains('3d-enabled')) return;
                
                this.style.transform = 'translateY(-10px) rotateX(10deg)';
                this.style.boxShadow = '0 20px 40px rgba(79, 70, 229, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
            
            card.addEventListener('click', function() {
                if (document.body.classList.contains('3d-enabled')) {
                    const certType = this.getAttribute('data-cert-3d');
                    showCertificateModal(certType);
                }
            });
        });
    }
    
    function showCertificateModal(certType) {
        // Create modal for certificate details
        const modal = document.createElement('div');
        modal.className = 'certificate-modal';
        
        const certData = {
            ccna: {
                title: 'CCNA Certification',
                details: 'Complete Cisco Certified Network Associate certification covering enterprise networking, security, and automation.'
            },
            cybersecurity: {
                title: 'Cybersecurity Foundations',
                details: 'Comprehensive cybersecurity fundamentals covering threat analysis, security protocols, and best practices.'
            },
            java: {
                title: 'Object-Oriented Programming',
                details: 'Comprehensive Understanding Of OOP Concepts, Design Patterns and Java Programming Principles.'
            }
        };
        
        const data = certData[certType] || { title: 'Certificate Details', details: 'Detailed information about this certification.' };
        
        modal.innerHTML = `
            <div class="modal-header">
                <h3>${data.title}</h3>
                <button class="modal-close">×</button>
            </div>
            <div class="modal-content">
                <p>${data.details}</p>
                <div class="modal-actions">
                    <button class="btn btn-primary">Download PDF</button>
                    <button class="btn btn-secondary">Share</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles for modal
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            border: 2px solid rgba(79, 70, 229, 0.3);
            border-radius: 15px;
            padding: 30px;
            z-index: 10000;
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        `;
        
        // Animate in
        setTimeout(() => {
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
            modal.style.opacity = '1';
        }, 10);
        
        // Close button
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        });
        
        // Close when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
                modal.style.opacity = '0';
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    // ========== CONTACT SECTION 3D ==========
    function initContact3D() {
        setupContactMap();
    }
    
    function setupContactMap() {
        const map = document.querySelector('.contact-3d-map');
        if (!map) return;
        
        map.addEventListener('mousemove', (e) => {
            if (!document.body.classList.contains('3d-enabled')) return;
            
            const rect = map.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            
            map.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
        });
        
        map.addEventListener('mouseleave', () => {
            map.style.transform = '';
        });
    }

    // ========== UTILITY FUNCTIONS ==========
    function enableAll3DEffects() {
        document.querySelectorAll('[data-3d-type]').forEach(el => {
            el.style.animationPlayState = 'running';
        });
        
        // Update background grid
        document.querySelector('.grid-overlay-3d').style.animationPlayState = 'running';
    }
    
    function disableAll3DEffects() {
        document.querySelectorAll('[data-3d-type]').forEach(el => {
            el.style.animationPlayState = 'paused';
            el.style.transform = '';
        });
        
        document.querySelector('.grid-overlay-3d').style.animationPlayState = 'paused';
    }
    
    function updateActiveSection() {
        const sections = document.querySelectorAll('section');
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        // Update navigation
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        // Update 3D effects based on section
        updateSection3DEffects(currentSection);
    }
    
    function updateSection3DEffects(sectionId) {
        if (!document.body.classList.contains('3d-enabled')) return;
        
        // Adjust 3D intensity based on active section
        const sections3D = {
            'skills': { intensity: 1.5, color: '#4f46e5' },
            'portfolio': { intensity: 2, color: '#10b981' },
            'certificates': { intensity: 1, color: '#8b5cf6' },
            'contact': { intensity: 0.8, color: '#f59e0b' }
        };
        
        const config = sections3D[sectionId] || { intensity: 1, color: '#4f46e5' };
        
        // Update CSS variables for section-specific effects
        document.documentElement.style.setProperty('--3d-intensity', config.intensity);
        document.documentElement.style.setProperty('--section-color', config.color);
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(20px, -20px) rotate(90deg);
        }
        50% {
            transform: translate(0, -40px) rotate(180deg);
        }
        75% {
            transform: translate(-20px, -20px) rotate(270deg);
        }
    }
`;
document.head.appendChild(style);

// Fix for smooth scroll offset
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 100;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Fix certificate modal with real data
function showCertificateModal(certType) {
    const certData = {
        'ccna': {
            title: 'CCNA: Enterprise Networking, Security, and Automation',
            details: 'Complete Cisco certification covering enterprise networking, security protocols, VLANs, routing, switching, and network automation. Validated skills in network infrastructure design and security implementation.',
            issuer: 'Cisco Networking Academy',
            date: 'November 2025',
            skills: ['Network Architecture', 'Security Protocols', 'VLAN Configuration', 'Routing & Switching', 'Network Automation']
        },
        'cybersecurity': {
            title: 'Cybersecurity Foundations',
            details: 'Comprehensive certification covering threat analysis, security protocols, vulnerability assessment, penetration testing methodologies, and security best practices.',
            issuer: 'SimpliLearn',
            date: '2025',
            skills: ['Threat Analysis', 'Vulnerability Assessment', 'Security Protocols', 'Penetration Testing']
        },
        'java': {
            title: 'Object-Oriented Programming Certification',
            details: 'Comprehensive understanding of OOP concepts including inheritance, polymorphism, encapsulation, design patterns, and Java programming principles with practical application in security tools development.',
            issuer: 'SimpliLearn',
            date: 'November 2025',
            skills: ['Java Programming', 'Design Patterns', 'OOP Principles', 'Software Architecture']
        }
    };
    
    const data = certData[certType] || {
        title: 'Professional Certification',
        details: 'Validated expertise in specialized technical domain.',
        issuer: 'Professional Institution',
        date: '2025',
        skills: ['Technical Skills', 'Professional Knowledge']
    };
    
    // Modal creation code (as existing but with enhanced content)
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    
    modal.innerHTML = `
        <div class="modal-header">
            <h3><i class="fas fa-certificate"></i> ${data.title}</h3>
            <button class="modal-close">×</button>
        </div>
        <div class="modal-content">
            <div class="cert-details-grid">
                <div class="cert-detail">
                    <strong>Issuer:</strong> ${data.issuer}
                </div>
                <div class="cert-detail">
                    <strong>Date:</strong> ${data.date}
                </div>
                <div class="cert-detail">
                    <strong>Status:</strong> <span class="status-active">Active</span>
                </div>
            </div>
            <p class="cert-description">${data.details}</p>
            <div class="skills-covered">
                <h4>Skills Validated:</h4>
                <div class="skills-tags">
                    ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="window.open('Assets/Certificates/CCNA-_Enterprise_Networking-_Security-_and_Automation_certificate_230988641-tut4life-ac-za_e8c63a26-6cde-4674-85db-da6393a824ee.pdf', '_blank')">
                    <i class="fas fa-download"></i> View Certificate
                </button>
                <button class="btn btn-secondary modal-close-btn">Close</button>
            </div>
        </div>
    `;
    
    // Rest of modal code...
}

// Fix mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        const isActive = mainNav.classList.contains('active');
        
        // Toggle aria-expanded for accessibility
        this.setAttribute('aria-expanded', isActive);
        
        // Change icon
        const icon = this.querySelector('i');
        if (isActive) {
            icon.classList.replace('fa-bars', 'fa-times');
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on links
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = '';
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            mainNav.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = '';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Enhanced skills data
function getSkillData(category) {
    const data = {
        programming: {
            title: "Programming & Development",
            description: "Expertise in modern programming languages with focus on secure coding practices and robust application development.",
            tools: ["Java", "HTML5/CSS3", "JavaScript", "Python", "Git", "REST APIs", "Secure Coding"],
            projects: "Developed secure web applications with authentication systems, implemented security best practices in code, and created automated testing suites.",
            proficiency: "Advanced",
            years: "3+ years"
        },
        security: {
            title: "Cybersecurity & Penetration Testing",
            description: "Proficient in identifying, assessing, and mitigating security vulnerabilities across web applications and networks.",
            tools: ["Wireshark", "Metasploit", "Nmap", "Burp Suite", "Hashcat", "OWASP Top 10", "Kali Linux"],
            projects: "Conducted security assessments for enterprise clients, identified critical vulnerabilities, and provided remediation strategies.",
            proficiency: "Expert",
            years: "2+ years"
        },
        networking: {
            title: "Network Infrastructure & Security",
            description: "Comprehensive networking knowledge with hands-on experience in network design, implementation, and security hardening.",
            tools: ["Cisco IOS", "VLANs", "Routing Protocols", "Firewalls", "VPN", "Network Monitoring", "Packet Analysis"],
            projects: "Designed and implemented secure network infrastructures, configured enterprise-grade firewalls, and optimized network performance.",
            proficiency: "Advanced",
            years: "3+ years"
        }
    };
    
    return data[category] || data.programming;
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Enhanced contact form functionality (if you add a form)
function setupContactForm() {
    const contactForm = document.createElement('form');
    contactForm.id = 'contact-form';
    contactForm.innerHTML = `
        <div class="form-group">
            <input type="text" placeholder="Your Name" required>
        </div>
        <div class="form-group">
            <input type="email" placeholder="Your Email" required>
        </div>
        <div class="form-group">
            <textarea placeholder="Your Message" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send Message</button>
    `;
    
    // You can add this to contact section
}