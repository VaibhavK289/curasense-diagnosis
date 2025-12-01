/**
 * CuraSense - Minimal Library Initialization
 * Clean, performant, no unnecessary animations
 */

// Initialize Particles.js with reduced particle count
function initParticles() {
    const isDark = document.body.classList.contains('dark-mode');
    
    particlesJS('particles-js', {
        particles: {
            number: { 
                value: 40, // Reduced from 180 for better performance
                density: { enable: true, value_area: 1000 } 
            },
            color: { value: isDark ? '#475569' : '#cbd5e1' },
            shape: { type: 'circle' },
            opacity: {
                value: isDark ? 0.3 : 0.5,
                random: false
            },
            size: {
                value: 2,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: isDark ? '#475569' : '#e2e8f0',
                opacity: isDark ? 0.2 : 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1, // Slow, subtle movement
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: false }, // Disabled for performance
                onclick: { enable: false },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Initialize particles on load
initParticles();

// Toast notification utility
window.showToast = function(message, type = 'success') {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#2563eb'
    };
    
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
            background: colors[type] || colors.info,
            borderRadius: '8px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '500'
        }
    }).showToast();
};

// Loading overlay utilities
window.showLoading = function() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
};

window.hideLoading = function() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
};

// Dark mode persistence
function initializeDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
        initParticles(); // Reinitialize particles with dark colors
    }
}

window.toggleDarkMode = function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    initParticles(); // Update particle colors
};

// Initialize dark mode on page load
initializeDarkMode();

// Simple smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for cards - simple fade in
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to cards with initial hidden state
document.querySelectorAll('.card, .action-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    cardObserver.observe(card);
});

console.log('%c✓ CuraSense Dashboard Loaded', 'color: #2563eb; font-weight: 600;');
