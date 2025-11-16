// Navigation scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would normally send the data to a server
    // For now, we'll just show an alert
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('메시지가 성공적으로 전송되었습니다!\n\n실제 구현에서는 서버로 데이터를 전송합니다.');
    
    // Reset form
    contactForm.reset();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe contact form
const contactFormElement = document.querySelector('.contact-form');
if (contactFormElement) {
    contactFormElement.style.opacity = '0';
    contactFormElement.style.transform = 'translateY(30px)';
    contactFormElement.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(contactFormElement);
}

// Observe about section
const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    aboutContent.style.opacity = '0';
    aboutContent.style.transform = 'translateY(30px)';
    aboutContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(aboutContent);
}

// Parallax effect for hero section and fade out scroll indicator/button
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroBtn = document.querySelector('.hero-btn');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
    
    // Fade out scroll indicator and button when scrolling
    const fadeStart = 100; // Start fading after 100px scroll
    const fadeEnd = 300; // Completely faded at 300px scroll
    
    if (scrollIndicator) {
        if (scrolled > fadeStart) {
            const opacity = Math.max(0, 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart));
            scrollIndicator.style.opacity = opacity;
            if (scrolled > fadeEnd) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        } else {
            scrollIndicator.style.opacity = 1;
            scrollIndicator.classList.remove('hidden');
        }
    }
    
    if (heroBtn) {
        if (scrolled > fadeStart) {
            const opacity = Math.max(0, 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart));
            heroBtn.style.opacity = opacity;
            if (scrolled > fadeEnd) {
                heroBtn.classList.add('hidden');
            } else {
                heroBtn.classList.remove('hidden');
            }
        } else {
            heroBtn.style.opacity = 1;
            heroBtn.classList.remove('hidden');
        }
    }
});

// Skills progress bar animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const percentage = progressBar.getAttribute('data-percentage');
            setTimeout(() => {
                progressBar.style.width = percentage + '%';
            }, 100);
            skillObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillObserver.observe(bar);
});

// Project modal functionality
const projectData = {
    1: {
        title: '프로젝트 1',
        description: '모던한 웹 애플리케이션 개발 프로젝트입니다. 사용자 경험을 최우선으로 고려한 디자인과 성능 최적화에 중점을 두었습니다.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        mainImage: '<svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#667eea"/><circle cx="400" cy="300" r="150" fill="#764ba2" opacity="0.7"/><rect x="250" y="200" width="300" height="200" rx="10" fill="white" opacity="0.9"/></svg>',
        designConcept: '미니멀하면서도 세련된 디자인을 추구했습니다. 사용자의 시선을 방해하지 않으면서도 필요한 정보를 명확하게 전달하는 것이 목표였습니다.',
        planningIntent: '사용자 중심의 경험을 제공하기 위해 심층적인 사용자 리서치를 진행했습니다. 다양한 사용자 그룹의 니즈를 분석하여 최적의 솔루션을 설계했습니다.',
        colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
        features: '반응형 디자인, 빠른 로딩 속도, 직관적인 네비게이션, 접근성 고려, SEO 최적화 등의 특징을 가지고 있습니다.',
        ideaSketch: '<svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#f7fafc" stroke="#e2e8f0" stroke-width="2"/><rect x="100" y="100" width="200" height="150" rx="5" fill="none" stroke="#667eea" stroke-width="2" stroke-dasharray="5,5"/><rect x="350" y="100" width="200" height="150" rx="5" fill="none" stroke="#667eea" stroke-width="2" stroke-dasharray="5,5"/><rect x="600" y="100" width="150" height="150" rx="5" fill="none" stroke="#667eea" stroke-width="2" stroke-dasharray="5,5"/></svg>',
        bwImage: '<svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a202c"/><circle cx="200" cy="200" r="80" fill="#718096"/><rect x="450" y="120" width="300" height="160" rx="5" fill="#4a5568"/></svg>'
    },
    2: {
        title: '프로젝트 2',
        description: '반응형 웹 디자인을 적용한 포트폴리오 사이트입니다. 모든 디바이스에서 최적의 경험을 제공하도록 설계되었습니다.',
        tags: ['CSS', 'JavaScript', 'Responsive'],
        mainImage: '<svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#f093fb"/><circle cx="400" cy="300" r="150" fill="#f5576c" opacity="0.7"/><rect x="250" y="200" width="300" height="200" rx="10" fill="white" opacity="0.9"/></svg>',
        designConcept: '화려한 색감과 모던한 레이아웃을 결합하여 시각적으로 강렬한 인상을 주는 디자인입니다.',
        planningIntent: '포트폴리오를 통해 작품을 효과적으로 전시할 수 있도록 정보 구조를 체계적으로 설계했습니다.',
        colors: ['#f093fb', '#f5576c', '#4facfe', '#00f2fe'],
        features: '모바일 최적화, 부드러운 애니메이션, 이미지 갤러리, 프로젝트 필터링 기능 등을 포함합니다.',
        ideaSketch: '<svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#f7fafc" stroke="#e2e8f0" stroke-width="2"/><circle cx="150" cy="200" r="60" fill="none" stroke="#f093fb" stroke-width="2" stroke-dasharray="5,5"/><circle cx="400" cy="200" r="60" fill="none" stroke="#f093fb" stroke-width="2" stroke-dasharray="5,5"/><circle cx="650" cy="200" r="60" fill="none" stroke="#f093fb" stroke-width="2" stroke-dasharray="5,5"/></svg>',
        bwImage: '<svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a202c"/><rect x="100" y="100" width="250" height="200" rx="5" fill="#718096"/><rect x="450" y="100" width="250" height="200" rx="5" fill="#4a5568"/></svg>'
    },
    3: {
        title: '프로젝트 3',
        description: '인터랙티브한 UI/UX를 갖춘 웹 애플리케이션입니다. 사용자와의 상호작용을 강화하는 다양한 애니메이션 효과를 구현했습니다.',
        tags: ['JavaScript', 'Animation', 'UI/UX'],
        mainImage: '<svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#4facfe"/><circle cx="400" cy="300" r="150" fill="#00f2fe" opacity="0.7"/><rect x="250" y="200" width="300" height="200" rx="10" fill="white" opacity="0.9"/></svg>',
        designConcept: '동적이고 유기적인 형태를 활용하여 사용자에게 생동감 있는 경험을 제공합니다.',
        planningIntent: '마이크로 인터랙션과 애니메이션을 통해 사용자의 행동에 즉각적인 피드백을 제공하는 것을 목표로 했습니다.',
        colors: ['#4facfe', '#00f2fe', '#667eea', '#764ba2'],
        features: '인터랙티브 애니메이션, 실시간 데이터 업데이트, 부드러운 페이지 전환, 사용자 맞춤형 인터페이스 등을 특징으로 합니다.',
        ideaSketch: '<svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#f7fafc" stroke="#e2e8f0" stroke-width="2"/><path d="M 100 300 Q 200 100, 300 200 T 500 200 T 700 250" stroke="#4facfe" stroke-width="3" fill="none" stroke-dasharray="5,5"/><path d="M 100 250 Q 200 150, 300 250 T 500 150 T 700 200" stroke="#4facfe" stroke-width="2" fill="none" stroke-dasharray="5,5"/></svg>',
        bwImage: '<svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="#1a202c"/><path d="M 150 200 L 300 100 L 450 250 L 650 150" stroke="#718096" stroke-width="3" fill="none"/><circle cx="400" cy="200" r="50" fill="#4a5568"/></svg>'
    }
};

const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Open modal when project card is clicked
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            const colorsHtml = project.colors.map(color => `<div class="color-chip" style="background-color: ${color};" title="${color}"></div>`).join('');
            
            modalBody.innerHTML = `
                <!-- 상단: 작품 이미지 + 작품 정보 -->
                <div class="project-hero">
                    <div class="project-main-image">
                        ${project.mainImage}
                    </div>
                    <div class="project-hero-info">
                        <h2>${project.title}</h2>
                        <div class="project-tags">${tagsHtml}</div>
                        <p class="project-description">${project.description}</p>
                    </div>
                </div>

                <!-- 디자인 컨셉 -->
                <div class="project-section">
                    <h3 class="section-label">디자인 컨셉</h3>
                    <p>${project.designConcept}</p>
                </div>

                <!-- 기획의도 -->
                <div class="project-section">
                    <h3 class="section-label">기획의도</h3>
                    <p>${project.planningIntent}</p>
                </div>

                <!-- 컬러칩 -->
                <div class="project-section">
                    <h3 class="section-label">컬러칩</h3>
                    <div class="color-chips">
                        ${colorsHtml}
                    </div>
                </div>

                <!-- 특징 -->
                <div class="project-section">
                    <h3 class="section-label">특징</h3>
                    <p>${project.features}</p>
                </div>

                <!-- 아이디어 스케치 -->
                <div class="project-section">
                    <h3 class="section-label">아이디어 스케치</h3>
                    <div class="project-sketch">
                        ${project.ideaSketch}
                    </div>
                </div>

                <!-- B&W -->
                <div class="project-section">
                    <h3 class="section-label">B&W</h3>
                    <div class="project-bw">
                        ${project.bwImage}
                    </div>
                </div>
            `;
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Slime click animation - 웃는 표정
const slimeContainer = document.getElementById('slimeContainer');
const slimeSmile = document.getElementById('slimeSmile');
const slimeEyeLeft = document.getElementById('slimeEyeLeft');
const slimeEyeRight = document.getElementById('slimeEyeRight');
const slimePupilLeft = document.getElementById('slimePupilLeft');
const slimePupilRight = document.getElementById('slimePupilRight');

if (slimeContainer) {
    slimeContainer.style.cursor = 'pointer';
    slimeContainer.addEventListener('click', function() {
        // 웃는 표정으로 변경
        slimeSmile.setAttribute('d', 'M 85 115 Q 100 128 115 115');
        slimeSmile.setAttribute('stroke-width', '4');
        
        // 눈을 웃는 눈으로 변경
        const eyeLeftD = `M 82 95 Q 85 100 82 105 M 82 95 Q 85 100 82 105`;
        const eyeRightD = `M 118 95 Q 115 100 118 105 M 118 95 Q 115 100 118 105`;
        
        // 눈을 선으로 변경 (웃는 눈)
        const smileLeftEye = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        smileLeftEye.setAttribute('class', 'slime-smile-eye');
        smileLeftEye.setAttribute('d', 'M 82 95 Q 85 100 82 105');
        smileLeftEye.setAttribute('stroke', 'white');
        smileLeftEye.setAttribute('stroke-width', '3');
        smileLeftEye.setAttribute('fill', 'none');
        smileLeftEye.setAttribute('stroke-linecap', 'round');
        
        const smileRightEye = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        smileRightEye.setAttribute('class', 'slime-smile-eye');
        smileRightEye.setAttribute('d', 'M 118 95 Q 115 100 118 105');
        smileRightEye.setAttribute('stroke', 'white');
        smileRightEye.setAttribute('stroke-width', '3');
        smileRightEye.setAttribute('fill', 'none');
        smileRightEye.setAttribute('stroke-linecap', 'round');
        
        // 기존 눈과 동공 숨기기
        slimeEyeLeft.style.opacity = '0';
        slimeEyeRight.style.opacity = '0';
        slimePupilLeft.style.opacity = '0';
        slimePupilRight.style.opacity = '0';
        
        const svg = document.getElementById('slimeAnimation');
        svg.insertBefore(smileLeftEye, slimeSmile);
        svg.insertBefore(smileRightEye, slimeSmile);
        
        // 2초 후 원래대로 복귀
        setTimeout(() => {
            slimeSmile.setAttribute('d', 'M 90 110 Q 100 118 110 110');
            slimeSmile.setAttribute('stroke-width', '3');
            slimeEyeLeft.style.opacity = '1';
            slimeEyeRight.style.opacity = '1';
            slimePupilLeft.style.opacity = '1';
            slimePupilRight.style.opacity = '1';
            
            const smileEyes = svg.querySelectorAll('.slime-smile-eye');
            smileEyes.forEach(eye => eye.remove());
        }, 2000);
        
        // 클릭 시 확대 효과
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
}

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

