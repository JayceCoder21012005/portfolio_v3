/* =========================================
   MODERN PORTFOLIO WEBSITE - JAVASCRIPT
   Author: Jayce Lord
   Description: Interactive functionality for portfolio
   ========================================= */

'use strict';

/* =========================================
   DOM ELEMENTS SELECTION
   ========================================= */

const body = document.body;
const header = document.getElementById('header');
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const backToTop = document.getElementById('backToTop');
const loadingScreen = document.getElementById('loadingScreen');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

/* =========================================
   LOADING SCREEN
   ========================================= */

/**
 * Hide loading screen after page loads
 * Adds a smooth fade-out effect
 */
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 500);
});

/* =========================================
   MOBILE MENU TOGGLE
   ========================================= */

/**
 * Toggle mobile navigation menu
 * Changes menu icon between hamburger and X
 */
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
});

/**
 * Close mobile menu when clicking on nav links
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    });
});

/**
 * Close mobile menu when clicking outside
 */
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
});

/* =========================================
   SMOOTH SCROLLING
   ========================================= */

/**
 * Smooth scroll to section when clicking nav links
 * Handles anchor links with hash
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* =========================================
   ACTIVE NAVIGATION LINK
   ========================================= */

/**
 * Highlight active navigation link based on scroll position
 * Uses Intersection Observer API for better performance
 */
const sections = document.querySelectorAll('.section');

const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -70% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to corresponding nav link
            const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

/* =========================================
   HEADER SCROLL EFFECT
   ========================================= */

/**
 * Add/remove 'scrolled' class to header on scroll
 * Creates a more compact header with shadow
 */
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when scrolling down
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

/* =========================================
   BACK TO TOP BUTTON
   ========================================= */

/**
 * Show/hide back to top button based on scroll position
 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

/**
 * Scroll to top when clicking back to top button
 */
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* =========================================
   THEME TOGGLE (DARK/LIGHT MODE)
   ========================================= */

/**
 * Toggle between dark and light theme
 * Saves preference to localStorage
 */
const toggleTheme = () => {
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
        localStorage.setItem('theme', 'dark');
    }
};

themeToggle.addEventListener('click', toggleTheme);

/**
 * Load saved theme preference from localStorage
 */
const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    } else {
        body.classList.add('dark-mode');
        themeIcon.classList.add('bx-moon');
    }
};

// Load theme on page load
loadTheme();

/* =========================================
   SCROLL ANIMATIONS
   ========================================= */

/**
 * Animate elements when they come into view
 * Uses Intersection Observer for performance
 */
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .about-container');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });
};

// Initialize scroll animations
animateOnScroll();

/* =========================================
   CONTACT FORM HANDLING
   ========================================= */

/**
 * Handle contact form submission
 * Validates inputs and displays success/error message
 */
const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate inputs
    if (!fullName || !email || !subject || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Disable submit button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        document.getElementById('fullName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';
        
        // Show success message
        showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }, 2000);
};

/**
 * Display form message (success or error)
 * @param {string} message - Message to display
 * @param {string} type - 'success' or 'error'
 */
const showFormMessage = (message, type) => {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
};

// Attach form submit handler
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

/* =========================================
   SKILL CARDS INTERACTION
   ========================================= */

/**
 * Add click interaction to skill cards
 * Creates a ripple effect on click
 */
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Create ripple effect
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
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

/* =========================================
   PROJECT CARDS INTERACTION
   ========================================= */

/**
 * Add hover effect to project cards
 * Enhances user interaction feedback
 */
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

/* =========================================
   TYPING EFFECT (OPTIONAL)
   ========================================= */

/**
 * Create typing effect for hero subtitle
 * Cycles through different job titles
 */
const createTypingEffect = () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const titles = [
        'Full Stack Software Engineer',
        'Web Developer',
        'UI/UX Designer',
        'Problem Solver'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    const type = () => {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            heroSubtitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before starting new word
        }
        
        setTimeout(type, typingSpeed);
    };
    
    // Start typing effect after a short delay
    setTimeout(type, 1000);
};

// Uncomment to enable typing effect
// createTypingEffect();

/* =========================================
   PARALLAX EFFECT
   ========================================= */

/**
 * Add subtle parallax scrolling effect to floating elements
 */
const addParallaxEffect = () => {
    const floatingElements = document.querySelectorAll('.animate-float');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
};

// Initialize parallax effect
addParallaxEffect();

/* =========================================
   CURSOR GLOW EFFECT (OPTIONAL)
   ========================================= */

/**
 * Create a glowing cursor effect that follows mouse movement
 * Adds a premium, interactive feel to the website
 */
const createCursorGlow = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    cursor.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(239, 213, 255, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    // Only show on desktop
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
    }
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 15 + 'px';
        cursor.style.top = e.clientY - 15 + 'px';
    });
    
    // Scale up cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
};

// Uncomment to enable cursor glow effect
// createCursorGlow();

/* =========================================
   PERFORMANCE OPTIMIZATION
   ========================================= */

/**
 * Debounce function to limit how often a function is called
 * Improves performance for scroll and resize events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function to limit function execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/* =========================================
   WINDOW RESIZE HANDLER
   ========================================= */

/**
 * Handle window resize events
 * Adjusts layout and closes mobile menu if needed
 */
const handleResize = debounce(() => {
    if (window.innerWidth > 768) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
}, 250);

window.addEventListener('resize', handleResize);

/* =========================================
   KEYBOARD NAVIGATION
   ========================================= */

/**
 * Enable keyboard navigation for accessibility
 * ESC key closes mobile menu
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
});

/* =========================================
   CONSOLE MESSAGE
   ========================================= */

/**
 * Display a creative message in the browser console
 */
console.log('%c👋 Hello Developer!', 'color: #efd5ff; font-size: 24px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'color: #515ada; font-size: 16px;');
console.log('%cFeel free to reach out if you want to collaborate!', 'color: #8b7ec8; font-size: 14px;');

/* =========================================
   INITIALIZATION
   ========================================= */

/**
 * Initialize all features when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website initialized successfully! ✨');
});

/* =========================================
   END OF SCRIPT
   ========================================= */