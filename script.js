// ========================================
// PERSONAL PROFILE WEBSITE - JAVASCRIPT
// ========================================

// ========================================
// 1. TYPEWRITER EFFECT FOR HERO ROLE
// ========================================
const roles = [
    '풀스택 개발자',
    'Frontend Engineer',
    'UI/UX 애호가',
    'Problem Solver'
];

let currentRoleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleTextElement = document.getElementById('role-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeRole() {
    const currentRole = roles[currentRoleIndex];

    if (!isDeleting) {
        // Typing
        if (charIndex < currentRole.length) {
            roleTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeRole, typingSpeed);
        } else {
            // Pause before deleting
            isDeleting = true;
            setTimeout(typeRole, pauseTime);
        }
    } else {
        // Deleting
        if (charIndex > 0) {
            roleTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeRole, deletingSpeed);
        } else {
            // Move to next role
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
        }
    }
}

// Start typewriter on page load
document.addEventListener('DOMContentLoaded', typeRole);

// ========================================
// 2. NAVBAR SCROLL BEHAVIOR
// ========================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = ['hero', 'skills', 'projects', 'contact'];

window.addEventListener('scroll', () => {
    // Add background on scroll
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let currentSection = '';

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        }
    });

    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// 3. MOBILE MENU TOGGLE
// ========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
});

// ========================================
// 4. DARK/LIGHT MODE TOGGLE
// ========================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'light') {
        htmlElement.classList.remove('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        htmlElement.classList.add('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
});

initTheme();

// ========================================
// 5. SCROLL REVEAL ANIMATION (IntersectionObserver)
// ========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// ========================================
// 6. BACK TO TOP BUTTON
// ========================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// 7. SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') return;

        e.preventDefault();

        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// 8. UPDATE FOOTER YEAR AUTOMATICALLY
// ========================================
document.getElementById('year').textContent = new Date().getFullYear();

// ========================================
// 9. PERFORMANCE: DEBOUNCE SCROLL LISTENER
// ========================================
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Any heavy operations can go here if needed
    }, 100);
}, { passive: true });

// ========================================
// 10. PRELOAD ANIMATIONS ON HERO SECTION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const heroRevealElements = document.querySelectorAll('#hero .reveal');

    heroRevealElements.forEach(el => {
        // Manually trigger reveal for hero elements since they're always visible
        setTimeout(() => {
            el.classList.add('revealed');
        }, 50);
    });

    // Trigger Intersection Observer for other sections
    revealObserver.disconnect();
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});

// ========================================
// 11. ADD TRANSITION DELAY TO CHILDREN
// ========================================
window.addEventListener('DOMContentLoaded', () => {
    const revealParents = document.querySelectorAll('[data-delay]');
    revealParents.forEach(el => {
        const delay = el.getAttribute('data-delay');
        el.style.transitionDelay = (delay * 100) + 'ms';
    });
});

// ========================================
// END OF SCRIPT
// ========================================
