// Prevent zoom on double-tap and pinch
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Initialize EmailJS
(function() {
    emailjs.init("XDFcH490Lm11vYHzR");
})();

// Typing Effect for Name
const typingText = document.getElementById('typingText');
const nameToType = "Pottabathini Sidhu";
let charIndex = 0;

function typeEffect() {
    if (charIndex < nameToType.length) {
        typingText.textContent += nameToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 500);
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const closeMenu = document.getElementById('closeMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Theme Toggle (Dark/Light)
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    
    if (body.classList.contains('light-theme')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// Color Picker
const colorPicker = document.getElementById('colorPicker');
const colorOptions = document.querySelector('.color-options');
const colorOptionButtons = document.querySelectorAll('.color-option');

colorPicker.addEventListener('click', (e) => {
    e.stopPropagation();
    colorOptions.classList.toggle('active');
});

// Close color options when clicking outside
document.addEventListener('click', (e) => {
    if (!colorPicker.contains(e.target)) {
        colorOptions.classList.remove('active');
    }
});

// Check for saved color preference
const currentColor = localStorage.getItem('themeColor') || 'teal';
body.setAttribute('data-theme-color', currentColor);

// Color option selection
colorOptionButtons.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const color = option.getAttribute('data-color');
        body.setAttribute('data-theme-color', color);
        localStorage.setItem('themeColor', color);
        colorOptions.classList.remove('active');
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateOnScroll = [
    '.about-content',
    '.skill-category',
    '.project-card',
    '.timeline-item',
    '.education-card',
    '.cert-card',
    '.achievement-card'
];

animateOnScroll.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Certifications Filter
const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
const certCards = document.querySelectorAll('.cert-card');

certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        certFilterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        certCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.style.animation = `fadeInUp 0.5s ease forwards`;
                }, index * 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Contact Form with EmailJS
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.sendForm('service_ykyz4wx', 'template_z7skcqi', contactForm)
        .then(() => {
            // Success
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status success';
            contactForm.reset();
            
            // Reset button
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                formStatus.style.display = 'none';
            }, 5000);
        })
        .catch((error) => {
            // Error
            console.error('EmailJS Error:', error);
            formStatus.textContent = 'Failed to send message. Please try again or contact me directly.';
            formStatus.className = 'form-status error';
            
            // Reset button
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                formStatus.style.display = 'none';
            }, 5000);
        });
});

// Scroll to Top on Page Load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Add smooth reveal for sections as user scrolls
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// Enhanced scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide scroll indicator when scrolling down
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// Add loading animation for cards
const cards = document.querySelectorAll('.skill-category, .project-card, .education-card, .achievement-card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.08}s`;
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.cert-filter-btn, .submit-btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Add floating particles background effect
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: var(--primary-color);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
    
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-50px) translateX(30px);
            }
            50% {
                transform: translateY(-100px) translateX(-30px);
            }
            75% {
                transform: translateY(-50px) translateX(30px);
            }
        }
    `;
    document.head.appendChild(particleStyle);
};

// Initialize particles
createParticles();

// Add console message
console.log('%c👋 Hi there!', 'font-size: 24px; font-weight: bold; color: #14b8a6;');
console.log('%cWelcome to my portfolio! Feel free to reach out.', 'font-size: 14px; color: #94a3b8;');
console.log('%c📧 Email: pottabathinisidhu45@gmail.com', 'font-size: 12px; color: #14b8a6;');
