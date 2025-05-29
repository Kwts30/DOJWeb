document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle (single instance)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');
            navLinks.classList.toggle('flex-col');
            navLinks.classList.toggle('w-full');
            navLinks.classList.toggle('py-4');
        });
    }

    // Initialize all UI components
    setActiveNavLink();
    initializeAnimations();
    initializeContentVisibility();
    initializeSmoothScrolling();
    initializeButtonEffects();
    initializePenalCodeNavigation(); // Add this line

    // Add error handling wrapper
    try {
        // Add scroll event listener for card animations
        window.addEventListener('scroll', revealDojInfoCards);
        revealDojInfoCards(); // Call once on load
    } catch (error) {
        handleError(error);
    }
});

// Animation initialization
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-fade-in, .animate-slide-in').forEach(el => {
        el.classList.remove('animate-fade-in', 'animate-slide-in');
        observer.observe(el);
    });

    // DOJ Info Card Fade-in Animation (on load, staggered)
    const cards = document.querySelectorAll('.doj-info-card-fade');
    cards.forEach(card => card.classList.remove('visible'));
    cards.forEach((card, i) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 200 + i * 250);
    });
}

// Content visibility initialization
function initializeContentVisibility() {
    // Initialize documents section
    initializeSection(
        document.querySelectorAll('.doc-title-content'),
        document.querySelectorAll('.doc-title-btn')
    );

    // Initialize rules section
    initializeSection(
        document.querySelectorAll('.rules-title-content'),
        document.querySelectorAll('.rules-title-btn')
    );
}

// Generic section initialization
function initializeSection(contents, buttons) {
    if (!contents.length || !buttons.length) return;

    // Show first content and activate first button
    contents[0].classList.remove('hidden');
    buttons[0].classList.remove('bg-[#d2bb8a]');
    buttons[0].classList.add('bg-[#c2a96e]');

    // Add click handlers
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Update button states
            buttons.forEach(btn => {
                btn.classList.remove('bg-[#c2a96e]');
                btn.classList.add('bg-[#d2bb8a]');
            });

            button.classList.remove('bg-[#d2bb8a]');
            button.classList.add('bg-[#c2a96e]');

            // Hide all content sections
            contents.forEach(content => content.classList.add('hidden'));

            // Show selected content with transition
            const targetContent = document.getElementById(button.getAttribute('data-title'));
            if (targetContent) {
                targetContent.classList.remove('hidden');
                addTransitionEffects(targetContent);
            }
        });
    });
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeButtonEffects() {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'all 0.3s ease';
        });
    });
}

// Active navigation link handling
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// DOJ Infographic Card Fade-in Animation (on scroll)
function revealDojInfoCards() {
    const cards = document.querySelectorAll('.doj-info-card-fade');
    const trigger = window.innerHeight * 0.92;
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < trigger) {
            card.classList.add('visible');
        }
    });
}

// Transition effects for content changes
function addTransitionEffects(content) {
    content.style.opacity = '0';
    setTimeout(() => {
        content.style.transition = 'opacity 0.3s ease-in-out';
        content.style.opacity = '1';
    }, 50);
}

// Error handling
function handleError(error) {
    console.error('Error in DOJ System:', error);
}

// Penal Code Navigation
function initializePenalCodeNavigation() {
    const penalButtons = document.querySelectorAll('[data-penal-title]');
    const penalContents = document.querySelectorAll('.penal-title-content');

    if (!penalButtons.length || !penalContents.length) return;

    // Show first content by default
    penalContents[0].classList.remove('hidden');
    if (penalButtons[0]) {
        penalButtons[0].classList.add('bg-[#c2a96e]');
        penalButtons[0].classList.remove('bg-[#d2bb8a]');
    }

    penalButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update button states
            penalButtons.forEach(btn => {
                btn.classList.remove('bg-[#c2a96e]');
                btn.classList.add('bg-[#d2bb8a]');
            });

            // Activate clicked button
            button.classList.remove('bg-[#d2bb8a]');
            button.classList.add('bg-[#c2a96e]');

            // Hide all content sections
            penalContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Show selected content with transition
            const targetId = button.getAttribute('data-penal-title');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                addTransitionEffects(targetContent);
            }
        });
    });
}