document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
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

    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-link');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });

    // Intersection Observer for animations
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

    // Add scroll event listener for card animations
    window.addEventListener('scroll', revealDojInfoCards);
    window.addEventListener('DOMContentLoaded', revealDojInfoCards);

    // Add active state to current navigation link
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

    // Call setActiveNavLink on page load
    document.addEventListener('DOMContentLoaded', setActiveNavLink);
}); 