document.addEventListener('DOMContentLoaded', () => {
    // Initialize hamburger menu
    initializeHamburgerMenu();

    // Mobile menu toggle (single instance) - Keep for backwards compatibility
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
    }    // Initialize all UI components
    setActiveNavLink();
    initializeAnimations();
    initializeContentVisibility();    initializeSmoothScrolling();
    initializeButtonEffects();
    initializePenalCodeNavigation();
    initializePenalCodes(); // Initialize penal codes functionality
    initializeRules(); // Initialize rules functionality
    initializeRules(); // Initialize rules functionality

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

// Hamburger Menu Functionality
function initializeHamburgerMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const hamburgerIcon = menuToggle?.querySelector('.hamburger-icon');

    if (!menuToggle || !mobileMenu || !menuOverlay) return;

    // Open menu
    function openMenu() {
        mobileMenu.classList.add('open');
        mobileMenu.classList.remove('translate-x-full');
        menuOverlay.classList.add('visible');
        menuOverlay.classList.remove('opacity-0', 'invisible');
        hamburgerIcon?.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close menu
    function closeMenu() {
        mobileMenu.classList.remove('open');
        mobileMenu.classList.add('translate-x-full');
        menuOverlay.classList.remove('visible');
        menuOverlay.classList.add('opacity-0', 'invisible');
        hamburgerIcon?.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (mobileMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuClose?.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
    });

    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on menu links
    const menuLinks = mobileMenu.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMenu, 150); // Small delay for better UX
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });
}

// Initialize penal code card click handlers
function initializePenalCodeCards() {
    const cards = document.querySelectorAll('.penal-code-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const codeType = card.getAttribute('data-code');
            openPenalCodeModal(codeType);
        });
    });
}

// Initialize penal code modal
function initializePenalCodeModal() {
    const modal = document.getElementById('penalCodeModal');
    const closeBtn = document.getElementById('closePenalModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closePenalCodeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePenalCodeModal();
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closePenalCodeModal();
        }
    });
}

// Open penal code modal using existing HTML content
function openPenalCodeModal(codeType) {
    const modal = document.getElementById('penalCodeModal');
    const modalTitle = document.getElementById('penalModalTitle');
    const modalContent = document.getElementById('penalModalContent');
    
    if (!modal || !modalTitle || !modalContent) return;
    
    // Get the existing HTML section based on code type
    const sourceSection = document.getElementById(codeType);
    if (!sourceSection) {
        console.error(`No section found for code type: ${codeType}`);
        return;
    }
    
    // Extract the title from the source section's h3 element
    const titleElement = sourceSection.querySelector('h3');
    const sectionTitle = titleElement ? titleElement.textContent.trim() : codeType.toUpperCase();
    
    // Clone the inner content (not the wrapper div)
    const clonedContent = sourceSection.cloneNode(true);
    
    // Remove the wrapper classes that hide content
    clonedContent.classList.remove('penal-title-content', 'hidden');
    
    // Remove the title from cloned content since it goes in the modal header
    const clonedTitle = clonedContent.querySelector('h3');
    if (clonedTitle) {
        clonedTitle.remove();
    }
    
    // Set modal title and content
    modalTitle.textContent = sectionTitle;
    modalContent.innerHTML = '';
    modalContent.appendChild(clonedContent);
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close penal code modal
function closePenalCodeModal() {
    const modal = document.getElementById('penalCodeModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// ===== RULES FUNCTIONALITY =====
function initializeRules() {
    // Initialize rules page if it exists
    if (document.getElementById('rules-grid')) {
        renderRulesCards();
        setupRulesModal();
        setupRulesSearch();
        setupRulesFilter();
    }
}

// Rules data structure with complete content preserved from original file
const rulesData = [    {
        id: 'rule1',
        title: 'Court Decorum',
        fullTitle: 'Court Decorum and Professional Conduct',
        description: 'The efficient and impartial administration of justice in Los Santos relies heavily on the respectful and professional conduct of all individuals within our courtrooms.',
        category: 'court',
        icon: '⚖️',
        color: 'bg-blue-500',        content: `
            <div class="max-w-7xl mx-auto">
                <!-- Hero Section -->
                <div class="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white rounded-2xl p-8 mb-10 relative overflow-hidden">
                    <div class="absolute inset-0 bg-black/20"></div>
                    <div class="relative z-10">
                        <div class="flex items-center justify-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mr-4">
                                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5zM6.75 12.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                        <h2 class="text-4xl font-bold mb-4 font-serif">Court Decorum & Professional Conduct</h2>
                        <p class="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                            Establishing the foundation for respectful, professional, and effective legal proceedings in the Los Santos Department of Justice
                        </p>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="mb-8">
                    <div class="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl">
                        <button onclick="showSection('general')" class="tab-btn active px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="general">
                            General Principles
                        </button>
                        <button onclick="showSection('attorneys')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="attorneys">
                            Attorney Conduct
                        </button>
                        <button onclick="showSection('witnesses')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="witnesses">
                            Witnesses & Litigants
                        </button>
                        <button onclick="showSection('consequences')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="consequences">
                            Consequences
                        </button>
                    </div>
                </div>

                <!-- General Principles Section -->
                <div id="general-section" class="content-section">
                    <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2L3 7v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7l-7-5z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">General Principles of Courtroom Decorum</h3>
                                <p class="text-gray-600 mt-1">Fundamental standards applicable to all courtroom participants</p>
                            </div>
                        </div>
                        
                        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <!-- Respect Card -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-amber-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-amber-600 transition-colors">Respect for the Court</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Show respect for the presiding judge, court staff, and judicial process. Stand when the judge enters or exits, and when addressing the court.</p>
                            </div>

                            <!-- Silence Card -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Silence & Attention</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Maintain silence and give full attention. No side conversations, unnecessary movements, or distractions during proceedings.</p>
                            </div>

                            <!-- Electronic Devices Card -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3z"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">Electronic Devices</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">All devices must be silenced. Use for calls, texting, or recording is prohibited unless expressly permitted.</p>
                            </div>

                            <!-- Dress Code Card -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4z"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">Professional Dress</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Business attire reflecting the court's dignity. Casual, revealing, or offensive clothing is not permitted.</p>
                            </div>

                            <!-- No Personal Remarks Card -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors">Professional Decorum</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">No disparaging remarks, gestures, or emotional displays. Focus must remain on legal issues.</p>
                            </div>

                            <!-- Photography Card -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">Recording Prohibited</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">No photography, video, or audio recording without express judicial permission.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Attorney Conduct Section -->
                <div id="attorneys-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Professional Conduct for Attorneys</h3>
                                <p class="text-gray-600 mt-1">Heightened standards for officers of the court</p>
                            </div>
                        </div>

                        <div class="bg-gradient-to-br from-amber-100 to-orange-100 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
                            <div class="flex items-center">
                                <svg class="w-6 h-6 text-amber-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                </svg>
                                <p class="text-amber-800 font-medium italic">Attorneys, as officers of the court, bear heightened responsibility to uphold the integrity and dignity of the legal profession.</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-6">
                            ${[
                                {
                                    title: "Addressing the Court",
                                    content: "Always address remarks to the court, not opposing counsel. Begin by stating your name and party representation.",
                                    icon: "💬",
                                    color: "blue"
                                },
                                {
                                    title: "Stand When Speaking",
                                    content: "Stand when addressing the court, examining witnesses, or making statements, unless permitted otherwise.",
                                    icon: "🧍",
                                    color: "green"
                                },
                                {
                                    title: "Request Permission",
                                    content: "Request permission before approaching the bench, witnesses, or presenting exhibits.",
                                    icon: "✋",
                                    color: "purple"
                                },
                                {
                                    title: "Exhibit Handling",
                                    content: "Present exhibits in orderly fashion with proper identification before tendering to witnesses.",
                                    icon: "📄",
                                    color: "amber"
                                },
                                {
                                    title: "Making Objections",
                                    content: "State only legal grounds for objections. Elaborate only if requested by the court.",
                                    icon: "⚖️",
                                    color: "red"
                                },
                                {
                                    title: "Witness Examination",
                                    content: "Avoid repeating or 'echoing' witness answers during examination proceedings.",
                                    icon: "❓",
                                    color: "indigo"
                                },
                                {
                                    title: "Candor & Honesty",
                                    content: "Exhibit utmost candor and good faith. Deliberately misleading the court may result in disciplinary action.",
                                    icon: "🤝",
                                    color: "emerald"
                                },
                                {
                                    title: "Professional Respect",
                                    content: "Maintain respectful demeanor toward opposing counsel at all times, even in contentious matters.",
                                    icon: "🤵",
                                    color: "cyan"
                                }
                            ].map(item => `
                                <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-${item.color}-500">
                                    <div class="flex items-center mb-4">
                                        <span class="text-2xl mr-3">${item.icon}</span>
                                        <h4 class="text-lg font-bold text-gray-800">${item.title}</h4>
                                    </div>
                                    <p class="text-gray-600 text-sm leading-relaxed">${item.content}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Witnesses & Litigants Section -->
                <div id="witnesses-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Conduct for Litigants & Witnesses</h3>
                                <p class="text-gray-600 mt-1">Essential guidelines for testimony and courtroom behavior</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${[
                                {
                                    title: "Truthfulness",
                                    content: "All testimony under oath must be truthful. Perjury is a serious criminal offense under Los Santos Penal Code.",
                                    icon: "✅",
                                    color: "green"
                                },
                                {
                                    title: "Clear Responses",
                                    content: "Answer questions clearly, directly, and respectfully. Do not argue with counsel or the judge.",
                                    icon: "💭",
                                    color: "blue"
                                },
                                {
                                    title: "Maintain Order",
                                    content: "Stay silent when not testifying. Do not interrupt proceedings or make audible comments.",
                                    icon: "🤫",
                                    color: "purple"
                                },
                                {
                                    title: "Appropriate Dress",
                                    content: "Dress appropriately for court proceedings, following the same standards as all participants.",
                                    icon: "👔",
                                    color: "amber"
                                },
                                {
                                    title: "Respectful Demeanor",
                                    content: "Show respect for the court, attorneys, and all participants throughout proceedings.",
                                    icon: "🙏",
                                    color: "indigo"
                                },
                                {
                                    title: "Privacy Protection",
                                    content: "Limit personal identifying information when testifying unless specifically required by the court.",
                                    icon: "🛡️",
                                    color: "red"
                                }
                            ].map(item => `
                                <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-${item.color}-500">
                                    <div class="flex items-center mb-4">
                                        <span class="text-2xl mr-3">${item.icon}</span>
                                        <h4 class="text-lg font-bold text-gray-800">${item.title}</h4>
                                    </div>
                                    <p class="text-gray-600 text-sm leading-relaxed">${item.content}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Consequences Section -->
                <div id="consequences-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Consequences of Non-Compliance</h3>
                                <p class="text-gray-600 mt-1">Sanctions for violations of courtroom decorum</p>
                            </div>
                        </div>

                        <div class="bg-red-100 border-l-4 border-red-500 rounded-lg p-6 mb-8">
                            <div class="flex items-center">
                                <svg class="w-6 h-6 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                </svg>
                                <p class="text-red-800 font-medium">Failure to adhere to these standards may result in various sanctions, including:</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${[
                                {
                                    title: "Verbal Warning",
                                    description: "Initial admonishment from the presiding judge",
                                    severity: "Low",
                                    icon: "⚠️",
                                    bgColor: "bg-yellow-500"
                                },
                                {
                                    title: "Contempt of Court",
                                    description: "Formal finding leading to fines, sanctions, or imprisonment",
                                    severity: "High",
                                    icon: "⚖️",
                                    bgColor: "bg-red-500"
                                },
                                {
                                    title: "Courtroom Exclusion",
                                    description: "Removal from proceedings for disruptive behavior",
                                    severity: "Medium",
                                    icon: "🚪",
                                    bgColor: "bg-orange-500"
                                },
                                {
                                    title: "Attorney Discipline",
                                    description: "Bar association referral potentially leading to suspension",
                                    severity: "High",
                                    icon: "📋",
                                    bgColor: "bg-red-600"
                                },
                                {
                                    title: "Case Sanctions",
                                    description: "Adverse rulings or penalties affecting case outcome",
                                    severity: "Critical",
                                    icon: "⛔",
                                    bgColor: "bg-red-700"
                                },
                                {
                                    title: "Criminal Charges",
                                    description: "Potential prosecution for serious violations or contempt",
                                    severity: "Critical",
                                    icon: "🚔",
                                    bgColor: "bg-red-800"
                                }
                            ].map(item => `
                                <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group">
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center">
                                            <span class="text-2xl">${item.icon}</span>
                                        </div>
                                        <span class="px-3 py-1 text-xs font-semibold rounded-full ${
                                            item.severity === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                                            item.severity === 'Medium' ? 'bg-orange-100 text-orange-800' :
                                            item.severity === 'High' ? 'bg-red-100 text-red-800' :
                                            'bg-red-200 text-red-900'
                                        }">${item.severity}</span>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">${item.title}</h4>
                                    <p class="text-gray-600 text-sm leading-relaxed">${item.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="mt-12 bg-gradient-to-br from-slate-800 to-gray-900 text-white rounded-2xl p-8 text-center">
                    <div class="flex justify-center mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 011.414 1.414L10 8.586l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                    <h3 class="text-3xl font-bold mb-4 font-serif">Commitment to Excellence</h3>
                    <p class="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                        The Los Santos Department of Justice is dedicated to maintaining the highest standards of professionalism, 
                        ensuring fair and orderly proceedings for all participants in our justice system.
                    </p>
                </div>        `
    },    {
        id: 'rule2',
        title: 'Legal Process',
        fullTitle: 'Legal Process and Procedures',
        description: 'Understanding the legal process can be daunting. This section provides a clear, step-by-step overview of how different types of legal cases typically proceed through the Los Santos court system.',
        category: 'legal',
        icon: '📋',
        color: 'bg-green-500',
        content: `
            <div class="max-w-7xl mx-auto">
                <!-- Hero Section -->
                <div class="bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white rounded-2xl p-8 mb-10 relative overflow-hidden">
                    <div class="absolute inset-0 bg-black/20"></div>
                    <div class="relative z-10 text-center">
                        <div class="flex items-center justify-center mb-6">
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-4xl font-bold text-gray-800 font-serif">Legal Process & Procedures</h3>
                                <p class="text-gray-600 mt-1">Comprehensive guide to Los Santos court system processes</p>
                            </div>
                        </div>
                        <h2 class="text-4xl font-bold mb-4 font-serif">Legal Process & Procedures</h2>
                        <p class="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed">
                            Understanding how different types of legal cases proceed through the Los Santos court system, providing clear roadmaps for criminal, civil, family, and traffic proceedings
                        </p>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="mb-8">
                    <div class="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl">
                        <button onclick="showSection('criminal')" class="tab-btn active px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="criminal">
                            Criminal Cases
                        </button>
                        <button onclick="showSection('civil')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="civil">
                            Civil Cases
                        </button>
                        <button onclick="showSection('family')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="family">
                            Family Court
                        </button>
                        <button onclick="showSection('traffic')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="traffic">
                            Traffic Court
                        </button>
                    </div>
                </div>

                <!-- Criminal Case Process Section -->
                <div id="criminal-section" class="content-section">
                    <div class="flex items-center mb-8">
                        <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.94l1-4H9.03z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-3xl font-bold text-gray-800 font-serif">Criminal Case Process</h3>
                            <p class="text-gray-600 mt-1">Investigation, prosecution, and adjudication of penal code violations</p>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                        <!-- Investigation and Arrest -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Investigation and Arrest</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Reporting:</strong> Citizens report criminal activity to law enforcement</div>
                                <div><strong>Investigation:</strong> Police gather evidence, interview witnesses, identify suspects</div>
                                <div><strong>Arrest:</strong> If probable cause exists, individual may be arrested with or without warrant</div>
                                <div><strong>Booking:</strong> Processing at police station - fingerprinting, mugshot, personal information collection</div>
                            </div>
                        </div>

                        <!-- Initial Appearance -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Initial Appearance / Arraignment</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Charging Decision:</strong> District Attorney reviews evidence and decides on formal charges</div>
                                <div><strong>First Appearance:</strong> Individual brought before judge, informed of charges and rights</div>
                                <div><strong>Bail Hearing:</strong> Judge may set bail considering crime severity, flight risk, public safety</div>
                                <div><strong>Plea:</strong> Defendant enters plea of Guilty, Not Guilty, or Nolo Contendere</div>
                            </div>
                        </div>

                        <!-- Preliminary Hearing -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Preliminary Hearing / Grand Jury</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Purpose:</strong> Determine if sufficient probable cause exists to proceed to trial</div>
                                <div><strong>Preliminary Hearing:</strong> Judge hears prosecution evidence; defense can cross-examine</div>
                                <div><strong>Grand Jury:</strong> Citizens hear evidence in secret and decide on indictment</div>
                                <div><strong>Result:</strong> Formal accusation if evidence supports proceeding to trial</div>
                            </div>
                        </div>

                        <!-- Discovery -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Discovery & Pre-Trial</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Information Exchange:</strong> Both sides exchange relevant evidence and information</div>
                                <div><strong>Pre-Trial Motions:</strong> Address legal issues before trial (suppress evidence, dismiss, venue change)</div>
                                <div><strong>Plea Bargaining:</strong> Discussions to resolve case without trial through plea agreement</div>
                                <div><strong>Fairness:</strong> Ensures no surprises at trial and promotes fair proceedings</div>
                            </div>
                        </div>

                        <!-- Trial -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Trial Process</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Jury Selection:</strong> Voir dire process to ensure impartial jury for jury trials</div>
                                <div><strong>Opening Statements:</strong> Both sides present case overview and what they intend to prove</div>
                                <div><strong>Evidence Presentation:</strong> Witnesses testify and physical evidence is presented</div>
                                <div><strong>Closing Arguments:</strong> Both sides summarize case and persuade jury/judge</div>
                                <div><strong>Verdict:</strong> Jury deliberation or bench decision resulting in Guilty or Not Guilty</div>
                            </div>
                        </div>

                        <!-- Sentencing -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Sentencing & Appeals</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Sentencing:</strong> Judge determines appropriate punishment based on Penal Code and case factors</div>
                                <div><strong>Penalties:</strong> May include fines, probation, community service, or incarceration</div>
                                <div><strong>Appeal Rights:</strong> Defendant may appeal conviction or sentence to higher court</div>
                                <div><strong>Grounds:</strong> Appeals based on legal errors occurring during trial proceedings</div>
                            </div>
                        </div>
                    </div>
                </div>                <!-- Civil Case Process Section -->
                <div id="civil-section" class="content-section hidden">
                    <div class="flex items-center mb-8">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-3xl font-bold text-gray-800 font-serif">Civil Case Process</h3>
                            <p class="text-gray-600 mt-1">Disputes between individuals or entities seeking monetary damages or specific actions rather than criminal penalties</p>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                        <!-- Pre-Filing Considerations -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-cyan-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Pre-Filing Considerations</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Demand Letter:</strong> Aggrieved party often sends demand letter to other party, attempting to resolve dispute before initiating litigation. This can sometimes lead to out-of-court settlement.</div>
                            </div>
                        </div>

                        <!-- Filing the Complaint -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Filing the Complaint</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Pleading:</strong> Plaintiff (party initiating lawsuit) files formal document called "Complaint" with appropriate Los Santos court (Superior Court, Municipal Court), outlining their claims and requested relief.</div>
                                <div><strong>Filing Fees:</strong> Plaintiff typically pays a filing fee.</div>
                            </div>
                        </div>

                        <!-- Service of Process -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-pink-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Service of Process</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Formal Notification:</strong> Defendant (party being sued) is formally notified of lawsuit by receiving copy of Complaint and Summons, which is court order to respond.</div>
                                <div><strong>Jurisdiction:</strong> Proper service is crucial for court to have jurisdiction over defendant.</div>
                            </div>
                        </div>

                        <!-- Responsive Pleading / Answer -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Responsive Pleading / Answer</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Answer Required:</strong> Defendant must file "Answer" with court within specified timeframe, responding to allegations in Complaint and stating any defenses or counterclaims.</div>
                                <div><strong>Default Risk:</strong> Failure to respond can result in default judgment against defendant.</div>
                            </div>
                        </div>

                        <!-- Discovery -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-teal-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Discovery</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Information Exchange:</strong> Parties exchange information and evidence relevant to dispute through various tools like interrogatories (written questions), requests for production of documents (physical evidence, emails, etc.), depositions (out-of-court sworn testimony), and requests for admissions.</div>
                                <div><strong>Critical Phase:</strong> This phase is critical for preparing for trial and understanding strengths and weaknesses of each side's case.</div>
                            </div>
                        </div>

                        <!-- Pre-Trial Motions and Conferences -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-amber-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.94l1-4H9.03z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Pre-Trial Motions and Conferences</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Motions:</strong> Parties may file various motions to resolve specific legal issues or aspects of case before trial (e.g., motions for summary judgment to resolve case without trial if there are no material facts in dispute, or motions to compel discovery if party isn't cooperating).</div>
                                <div><strong>Pre-Trial Conference:</strong> Parties and attorneys meet with judge to narrow down issues, explore settlement possibilities, set deadlines, and prepare for trial if settlement isn't reached.</div>
                            </div>
                        </div>

                        <!-- Mediation/Arbitration (Alternative Dispute Resolution) -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Mediation/Arbitration (Alternative Dispute Resolution)</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Encouraged/Required:</strong> Many civil cases in Los Santos are encouraged, or sometimes required, to attempt alternative dispute resolution methods to settle case out of court.</div>
                                <div><strong>Mediation:</strong> Neutral third party facilitates discussion to help parties reach agreement.</div>
                                <div><strong>Arbitration:</strong> Neutral third party hears evidence and makes binding or non-binding decision.</div>
                            </div>
                        </div>

                        <!-- Trial -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Trial</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Trial Process:</strong> If no settlement is reached, case proceeds to trial. Process generally mirrors criminal trial with opening statements, presentation of evidence, witness testimony, cross-examination, closing arguments, and ultimately, judgment by judge or jury.</div>
                            </div>
                        </div>

                        <!-- Judgment -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-gray-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Judgment</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Final Decision:</strong> Court issues "Judgment" or "Order" outlining final decision, which may include monetary awards, injunctions (court orders to do or not do something), or other relief.</div>
                            </div>
                        </div>

                        <!-- Enforcement of Judgment -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v6a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Enforcement of Judgment</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Compliance:</strong> If losing party does not comply with judgment, prevailing party can initiate legal steps to enforce court's order (e.g., wage garnishment, property liens, bank account levies).</div>
                            </div>
                        </div>

                        <!-- Appeal -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-violet-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Appeal</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Appeal Rights:</strong> Either party may appeal judgment to higher court if there are legal grounds to do so, typically based on errors of law or procedure.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Family Court Process Section -->
                <div id="family-section" class="content-section hidden">
                    <div class="flex items-center mb-8">
                        <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-3xl font-bold text-gray-800 font-serif">Family Court Process</h3>
                            <p class="text-gray-600 mt-1">Sensitive domestic matters with emphasis on best interests of children</p>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                        <!-- Filing Petition -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-rose-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Filing a Petition</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Petition Types:</strong> Divorce, Child Custody, Child Support, Domestic Relations</div>
                                <div><strong>Initiating Documents:</strong> Cases begin with filing appropriate petition form</div>
                                <div><strong>Service Required:</strong> Other party must be formally served with petition and summons</div>
                                <div><strong>Response:</strong> Responding party files "Answer" outlining their position</div>
                            </div>
                        </div>

                        <!-- Temporary Orders -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Temporary Orders Hearings</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Early Process:</strong> Court may issue temporary orders early in proceedings</div>
                                <div><strong>Coverage:</strong> Child custody, visitation, financial support during case</div>
                                <div><strong>Interim Relief:</strong> Governs parties' conduct while case is pending</div>
                                <div><strong>Modification:</strong> Can be modified as circumstances change during proceedings</div>
                            </div>
                        </div>

                        <!-- Discovery and Mediation -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Discovery & Mediation</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Financial Information:</strong> Parties exchange financial details and child care information</div>
                                <div><strong>Document Exchange:</strong> Relevant documents about assets, income, and family matters</div>
                                <div><strong>Mediation/Conciliation:</strong> Often mandated for custody and visitation disputes</div>
                                <div><strong>Child Focus:</strong> Emphasis on resolving disputes amicably for children's benefit</div>
                            </div>
                        </div>

                        <!-- Hearings and Final Orders -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Hearings & Final Orders</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Contested Matters:</strong> Court holds hearings if agreements cannot be reached</div>
                                <div><strong>Evidence Review:</strong> Court takes testimony and reviews evidence on custody, support, property</div>
                                <div><strong>Complex Cases:</strong> Full trial may be necessary for heavily contested matters</div>
                                <div><strong>Final Orders:</strong> Court issues final judgment legally resolving all issues</div>
                                <div><strong>Enforcement/Modification:</strong> Court can enforce orders or modify based on changed circumstances</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Traffic Court Process Section -->
                <div id="traffic-section" class="content-section hidden">
                    <div class="flex items-center mb-8">
                        <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-3xl font-bold text-gray-800 font-serif">Traffic Court Process</h3>
                            <p class="text-gray-600 mt-1">Violations of traffic laws from minor infractions to serious moving violations</p>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                        <!-- Citation Issuance -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Issuance of Citation/Ticket</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Traffic Stop:</strong> Law enforcement officer observes traffic violation</div>
                                <div><strong>Citation Details:</strong> Officer issues citation detailing alleged traffic violation</div>
                                <div><strong>Information Recorded:</strong> Date, time, location, violation code, and officer information</div>
                                <div><strong>Driver Copy:</strong> Driver receives copy with court date and fine information</div>
                            </div>
                        </div>

                        <!-- Plea Options -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Plea Options</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Pay Fine:</strong> Many minor infractions resolved by paying listed fine by due date</div>
                                <div><strong>Admission of Guilt:</strong> Paying fine generally constitutes admission of guilt</div>
                                <div><strong>Plead Not Guilty:</strong> Contest ticket by pleading not guilty, requires court appearance</div>
                                <div><strong>Guilty with Explanation:</strong> Explain circumstances to judge or enter nolo contendere plea</div>
                            </div>
                        </div>

                        <!-- Court Appearance -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Court Appearance</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Scheduled Date:</strong> Court date set for not guilty plea, both officer and defendant expected</div>
                                <div><strong>Pre-Trial Discussions:</strong> Prosecutors may offer plea bargains before hearing</div>
                                <div><strong>Negotiation:</strong> Possible reduced charges, lower fines, or alternative penalties</div>
                                <div><strong>Preparation:</strong> Gather evidence, witnesses, and documentation for defense</div>
                            </div>
                        </div>

                        <!-- Hearing and Verdict -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Hearing & Verdict</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Officer Testimony:</strong> Issuing officer testifies about observed violation</div>
                                <div><strong>Defense Opportunity:</strong> Defendant presents their side, offers evidence, cross-examines officer</div>
                                <div><strong>Judge Decision:</strong> Judge renders verdict based on evidence presented</div>
                                <div><strong>Penalties:</strong> If found responsible, judge issues fine and may assess license points</div>
                                <div><strong>Additional Options:</strong> Traffic school or other penalties may be ordered</div>
                                <div><strong>Appeal Rights:</strong> May appeal traffic court decision to higher court</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary Section -->
                <div class="mt-12 bg-gradient-to-r from-slate-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                    <h3 class="text-3xl font-bold mb-4 font-serif">Understanding Legal Processes</h3>
                    <p class="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                        While each case is unique, these process outlines provide a general roadmap for navigating the Los Santos court system. 
                        Understanding these procedures helps ensure proper preparation and participation in legal proceedings.
                    </p>
                </div>
            </div>
        `
    },    {
        id: 'rule3',
        title: 'Evidence Handling',
        fullTitle: 'Evidence Handling Protocols',
        description: 'The integrity of any investigation and subsequent legal proceeding in Los Santos hinges upon the meticulous and proper handling of evidence.',
        category: 'legal',
        icon: '🔍',
        color: 'bg-purple-500',
        content: `
            <div class="max-w-7xl mx-auto">
                <!-- Hero Section -->
                <div class="bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white rounded-2xl p-8 mb-10 relative overflow-hidden">
                    <div class="absolute inset-0 bg-black/20"></div>
                    <div class="relative z-10 text-center">
                        <div class="flex items-center justify-center mb-6">
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-4xl font-bold text-gray-800 font-serif">Evidence Handling Protocols</h3>
                                <p class="text-gray-600 mt-1">Ensuring integrity from collection to courtroom presentation</p>
                            </div>
                        </div>
                        <h2 class="text-4xl font-bold mb-4 font-serif">Evidence Handling Protocols</h2>
                        <p class="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
                            Comprehensive guidelines for collecting, preserving, documenting, and presenting evidence to ensure reliability and admissibility in Los Santos courts
                        </p>
                    </div>
                </div>                <!-- Navigation Tabs -->
                <div class="mb-8">
                    <div class="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl">
                        <button onclick="showSection('general-principles')" class="tab-btn active px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="general-principles">
                            General Principles
                        </button>
                        <button onclick="showSection('collection')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="collection">
                            Collection & Documentation
                        </button>
                        <button onclick="showSection('storage')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="storage">
                            Storage & Analysis
                        </button>
                        <button onclick="showSection('digital')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="digital">
                            Digital Evidence
                        </button>
                        <button onclick="showSection('custody')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="custody">
                            Chain of Custody
                        </button>
                    </div>
                </div>

                <!-- General Principles Section -->
                <div id="general-principles-section" class="content-section">
                    <div class="flex items-center mb-8">
                        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-3xl font-bold text-gray-800 font-serif">General Principles of Evidence Handling</h3>
                            <p class="text-gray-600 mt-1">Core principles ensuring evidence integrity and admissibility</p>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                        <!-- Preservation of Integrity -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Preservation of Integrity</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Primary Goal:</strong> Preserve evidence in original state as much as possible, preventing contamination, alteration, or degradation.</div>
                                <div><strong>Critical for:</strong> Maintaining evidentiary value and ensuring court admissibility.</div>
                            </div>
                        </div>

                        <!-- Chain of Custody -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Chain of Custody</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Documentation:</strong> Continuous, documented record of who had possession of evidence, at what time, and for what purpose.</div>
                                <div><strong>From Collection to Court:</strong> Unbroken chain from initial collection until presentation in court proceedings.</div>
                                <div><strong>Vital for Admissibility:</strong> Essential for evidence to be accepted in legal proceedings.</div>
                            </div>
                        </div>

                        <!-- Documentation -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Documentation Requirements</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Comprehensive Records:</strong> Thorough and accurate documentation required at every step of evidence handling process.</div>
                                <div><strong>Every Transfer:</strong> All movements and handling must be meticulously recorded.</div>
                            </div>
                        </div>

                        <!-- Contamination Prevention -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v6a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Minimizing Contamination</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Strict Procedures:</strong> Must be followed to prevent cross-contamination of evidence.</div>
                                <div><strong>Critical Areas:</strong> Especially important at crime scenes and during forensic analysis.</div>
                            </div>
                        </div>

                        <!-- Safety -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Safety Protocols</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Personnel Safety:</strong> Must prioritize own safety and safety of others when handling evidence.</div>
                                <div><strong>Hazardous Materials:</strong> Special precautions required when dealing with dangerous substances.</div>
                                <div><strong>Protective Equipment:</strong> Appropriate safety gear mandatory for all evidence handling.</div>
                            </div>
                        </div>

                        <!-- Mandatory Compliance -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Mandatory Compliance</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>All Personnel:</strong> Adherence mandatory for law enforcement, forensic specialists, and legal professionals.</div>
                                <div><strong>DOJ Standards:</strong> Required within entire Los Santos Department of Justice system.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Collection & Documentation Section -->
                <div id="collection-section" class="content-section hidden">
                    <div class="flex items-center mb-8">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-3xl font-bold text-gray-800 font-serif">Evidence Collection at Crime Scenes</h3>
                            <p class="text-gray-600 mt-1">Proper collection techniques and documentation procedures</p>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                        <!-- Securing the Scene -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Securing the Scene</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>First Responder Duty:</strong> First responding officer must immediately secure scene to prevent unauthorized access.</div>
                                <div><strong>Perimeter Establishment:</strong> Establish clear boundaries to prevent disturbance or contamination of potential evidence.</div>
                                <div><strong>Access Control:</strong> Only authorized personnel allowed within secured perimeter.</div>
                            </div>
                        </div>

                        <!-- Photography and Sketching -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Photography and Sketching</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Before Movement:</strong> Scene and individual evidence items must be thoroughly photographed before anything is touched or moved.</div>
                                <div><strong>Multiple Angles:</strong> Comprehensive photography from various perspectives to capture complete scene.</div>
                                <div><strong>Detailed Sketches:</strong> Create diagrams illustrating scene layout and precise evidence locations.</div>
                            </div>
                        </div>

                        <!-- Documentation of Discovery -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Documentation of Discovery</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Detailed Records:</strong> Each evidence item documented with precise location, date, time of discovery.</div>
                                <div><strong>Discovery Personnel:</strong> Record who discovered each piece of evidence.</div>
                                <div><strong>Comprehensive Log:</strong> Maintain detailed evidence log at scene for all collected items.</div>
                            </div>
                        </div>

                        <!-- Protective Equipment -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v6a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Protective Equipment</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Required PPE:</strong> Always wear appropriate personal protective equipment (gloves, masks, shoe covers).</div>
                                <div><strong>Dual Purpose:</strong> Prevents contamination by collector and protects collector from hazards.</div>
                                <div><strong>Mandatory Use:</strong> No evidence handling without proper protective gear.</div>
                            </div>
                        </div>

                        <!-- Individual Packaging -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Individual Packaging</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Separate Packaging:</strong> Each evidence item must be packaged separately to prevent cross-contamination.</div>
                                <div><strong>Appropriate Materials:</strong> Use packaging suitable for evidence type (paper bags for biological evidence, plastic for non-biological, sealed containers for liquids).</div>
                                <div><strong>Clear Labeling:</strong> Each package labeled with case number, date/time, item number, description, collector's initials/signature.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Storage & Analysis Section -->
                <div id="storage-section" class="content-section hidden">
                    <div class="flex items-center mb-8">
                        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-3xl font-bold text-gray-800 font-serif">Transportation, Storage & Analysis</h3>
                            <p class="text-gray-600 mt-1">Secure handling from scene to laboratory and beyond</p>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                        <!-- Secure Transportation -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Secure Transportation</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Secure Transfer:</strong> Evidence must be transported securely to designated evidence storage facility or laboratory.</div>
                                <div><strong>Integrity Maintenance:</strong> Ensure evidence remains intact and undisturbed during transport.</div>
                                <div><strong>Temporary Storage:</strong> If immediate transport impossible, secure in temporary, restricted-access location.</div>
                            </div>
                        </div>

                        <!-- Evidence Storage -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Evidence Storage</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Secure Facilities:</strong> Items immediately placed into secure, limited-access lockers or vaults upon arrival.</div>
                                <div><strong>Designated Custodian:</strong> Responsible for overall management, security, and integrity of evidence storage facility.</div>
                                <div><strong>Environmental Controls:</strong> Certain evidence (biological samples) requires specific conditions (refrigeration, humidity control).</div>
                            </div>
                        </div>

                        <!-- Laboratory Requests -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"/>
                                        <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v3a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h1V6a1 1 0 011-1h6a1 1 0 011 1v1z"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Laboratory Analysis</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Formal Requests:</strong> Law enforcement or prosecuting attorneys submit formal requests for forensic analysis.</div>
                                <div><strong>Specific Analysis:</strong> Clearly specify type of analysis needed and questions to be answered.</div>
                                <div><strong>Secure Transfer:</strong> Evidence transferred to Los Santos Forensic Laboratory following strict chain of custody protocols.</div>
                            </div>
                        </div>

                        <!-- Forensic Examination -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Forensic Examination</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Trained Scientists:</strong> Forensic analysis conducted by trained forensic scientists.</div>
                                <div><strong>Various Analyses:</strong> DNA analysis, fingerprint comparison, drug identification, ballistics examination.</div>
                                <div><strong>Comprehensive Documentation:</strong> All analysis, methods used, and results meticulously documented in laboratory reports.</div>
                                <div><strong>Post-Analysis:</strong> Evidence returned to secure storage or retained by laboratory per established protocols.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Digital Evidence Section -->
                <div id="digital-section" class="content-section hidden">
                    <div class="flex items-center mb-8">
                        <div class="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-3xl font-bold text-gray-800 font-serif">Digital Evidence Handling</h3>
                            <p class="text-gray-600 mt-1">Specialized procedures for electronic devices and digital data</p>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                        <!-- Electronic Device Preservation -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-cyan-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Electronic Device Preservation</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Data Protection:</strong> Electronic devices (computers, phones, external drives) must be handled to prevent data alteration.</div>
                                <div><strong>Specialized Tools:</strong> Often requiring specialized forensic tools for proper data acquisition.</div>
                                <div><strong>Immediate Isolation:</strong> Devices isolated from networks to prevent remote data destruction or alteration.</div>
                            </div>
                        </div>

                        <!-- Forensic Imaging -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM3 15a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zm7-11a1 1 0 011-1h4a1 1 0 011 1v5a3 3 0 01-3 3h-1a3 3 0 01-3-3V4zm2 0v5a1 1 0 001 1h1a1 1 0 001-1V4h-3z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Forensic Imaging</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Bit-for-Bit Copy:</strong> Create forensic image (exact copy) of original digital media.</div>
                                <div><strong>Analysis on Copy:</strong> All analysis performed on forensic image, preserving original data.</div>
                                <div><strong>Original Preservation:</strong> Original digital media remains untouched and unaltered.</div>
                            </div>
                        </div>

                        <!-- Cryptographic Hashing -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Cryptographic Hashing</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Hash Values:</strong> Cryptographic hash values generated for digital evidence to ensure integrity.</div>
                                <div><strong>Integrity Verification:</strong> Confirms no data has been altered since acquisition.</div>
                                <div><strong>Court Admissibility:</strong> Essential for proving digital evidence authenticity in legal proceedings.</div>
                            </div>
                        </div>

                        <!-- Secure Digital Storage -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Secure Digital Storage</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Controlled Environment:</strong> Digital evidence and forensic images stored in secure, climate-controlled environment.</div>
                                <div><strong>Multiple Backups:</strong> Create redundant copies to prevent data loss.</div>
                                <div><strong>Access Controls:</strong> Strict access controls and logging for all digital evidence storage areas.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Chain of Custody Section -->
                <div id="custody-section" class="content-section hidden">
                    <div class="flex items-center mb-8">
                        <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                            <svg class="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-3xl font-bold text-gray-800 font-serif">Chain of Custody & Compliance</h3>
                            <p class="text-gray-600 mt-1">Documentation, release procedures, and training requirements</p>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                        <!-- Evidence Documentation -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Evidence Documentation</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Unique Identifiers:</strong> Each piece of evidence assigned unique identifier for tracking.</div>
                                <div><strong>Evidence Tags/Forms:</strong> Movement tracked using evidence tags or forms throughout custody chain.</div>
                                <div><strong>Transfer Documentation:</strong> Every transfer between individuals documented with signatures, dates, times, and reasons.</div>
                            </div>
                        </div>

                        <!-- Access Control -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Access Control</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Restricted Access:</strong> Access to evidence storage areas strictly controlled and logged.</div>
                                <div><strong>Periodic Audits:</strong> Regular audits of evidence inventories conducted to verify compliance.</div>
                                <div><strong>Accountability:</strong> All evidence accounted for and compliance with protocols verified.</div>
                            </div>
                        </div>

                        <!-- Evidence Release -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Evidence Release and Disposal</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Court Orders:</strong> Evidence released from custody only upon valid court order or proper legal authorization.</div>
                                <div><strong>Return to Owner:</strong> If no longer needed and legally permissible, efforts made to return to rightful owner.</div>
                                <div><strong>Proper Disposal:</strong> Contraband, dangerous items, or unneeded evidence disposed of per strict legal and environmental regulations with comprehensive documentation.</div>
                            </div>
                        </div>

                        <!-- Training and Compliance -->
                        <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                            <div class="flex items-center mb-4">
                                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                    </svg>
                                </div>
                                <h4 class="text-xl font-semibold text-gray-800">Training and Compliance</h4>
                            </div>
                            <div class="space-y-3 text-sm text-gray-600">
                                <div><strong>Regular Training:</strong> All personnel involved in evidence handling receive regular training on protocols and best practices.</div>
                                <div><strong>From Collection to Court:</strong> Training covers entire process from initial collection to presentation in court.</div>
                                <div><strong>Compliance Monitoring:</strong> Compliance routinely monitored to ensure highest standards of evidence integrity.</div>
                                <div><strong>DOJ Standards:</strong> Maintained within entire Los Santos Department of Justice.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary Section -->
                <div class="mt-12 bg-gradient-to-r from-purple-50 to-indigo-100 rounded-2xl p-8 border border-purple-200">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                    <h3 class="text-3xl font-bold mb-4 font-serif">Evidence Integrity Assurance</h3>
                    <p class="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                        These comprehensive protocols ensure that all evidence, whether physical, digital, or testimonial, 
                        maintains its integrity and admissibility throughout the entire legal process in Los Santos.
                    </p>
                </div>
            </div>
        `
    },    {
        id: 'rule4',
        title: 'Witness Testimony',
        fullTitle: 'Witness Testimony Guidelines',
        description: 'Witness testimony is a cornerstone of the justice system in Los Santos, providing crucial information and firsthand accounts that help judges and juries understand the facts of a case.',
        category: 'court',
        icon: '👤',
        color: 'bg-indigo-500',
        content: `
            <div class="max-w-7xl mx-auto">
                <!-- Hero Section -->
                <div class="bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white rounded-2xl p-8 mb-10 relative overflow-hidden">
                    <div class="absolute inset-0 bg-black/20"></div>
                    <div class="relative z-10 text-center">
                        <div class="flex items-center justify-center mb-6">
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                                </svg>
                            </div>
                        </div>
                        <h2 class="text-4xl font-bold mb-4 font-serif">Witness Testimony Guidelines</h2>
                        <p class="text-xl text-indigo-100 max-w-4xl mx-auto leading-relaxed">
                            Comprehensive guidance for witnesses to ensure clarity, fairness, and the effective presentation of truth in Los Santos courts
                        </p>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="mb-8">
                    <div class="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl">
                        <button onclick="showSection('witness-role')" class="tab-btn active px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="witness-role">
                            Your Role as a Witness
                        </button>
                        <button onclick="showSection('preparation')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="preparation">
                            Preparing to Testify
                        </button>
                        <button onclick="showSection('courtroom')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="courtroom">
                            During Testimony
                        </button>
                        <button onclick="showSection('examination')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="examination">
                            Types of Examination
                        </button>
                        <button onclick="showSection('post-testimony')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="post-testimony">
                            After Your Testimony
                        </button>
                    </div>
                </div>

                <!-- Your Role as a Witness Section -->
                <div id="witness-role-section" class="content-section">
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Your Role as a Witness</h3>
                                <p class="text-gray-600 mt-1">Fundamental responsibilities and duties when called to testify</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-6">
                            <!-- To Tell the Truth -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-colors">To Tell the Truth</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Paramount Duty:</strong> Tell the complete truth, to the best of your knowledge and recollection, under oath.</div>
                                    <div><strong>Criminal Offense:</strong> Perjury (giving false testimony under oath) is a serious criminal offense under the Los Santos Penal Code.</div>
                                    <div><strong>Oath Obligation:</strong> Your sworn promise to tell the truth is legally binding and morally imperative.</div>
                                </div>
                            </div>

                            <!-- To Provide Facts -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">To Provide Facts</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Factual Information:</strong> You are in court to provide factual information only.</div>
                                    <div><strong>Avoid Speculation:</strong> Do not speculate, guess, or offer opinions unless specifically qualified as an expert witness.</div>
                                    <div><strong>Stick to Evidence:</strong> Testify only to what you personally observed or experienced.</div>
                                </div>
                            </div>

                            <!-- To Be Objective -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">To Be Objective</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Neutral Presentation:</strong> Present facts as you experienced or observed them, without bias or personal feelings.</div>
                                    <div><strong>Avoid Emotion:</strong> Keep personal opinions and emotional reactions separate from factual testimony.</div>
                                    <div><strong>Fair Representation:</strong> Provide balanced, unbiased account of events.</div>
                                </div>
                            </div>

                            <!-- To Be Responsive -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.894A1 1 0 0018 16V3z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">To Be Responsive</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Listen Carefully:</strong> Pay close attention to each question before responding.</div>
                                    <div><strong>Direct Answers:</strong> Answer questions clearly and directly without unnecessary elaboration.</div>
                                    <div><strong>Clear Communication:</strong> Ensure your responses are understandable and relevant to the question asked.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Preparing to Testify Section -->
                <div id="preparation-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Preparing to Testify</h3>
                                <p class="text-gray-600 mt-1">Essential steps to prepare for your court appearance</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-6">
                            <!-- Review Your Knowledge -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Review Your Knowledge</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Recall Details:</strong> Before your court date, try to recall all relevant details of the event or situation.</div>
                                    <div><strong>Review Notes:</strong> If you made notes or statements at the time, review them to refresh your memory (only if permitted by your attorney).</div>
                                    <div><strong>Mental Preparation:</strong> Organize your thoughts and the sequence of events in your mind.</div>
                                </div>
                            </div>

                            <!-- Discuss with Attorney -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">Discuss with the Attorney</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Pre-Meeting:</strong> The calling attorney will typically meet with you before your appearance.</div>
                                    <div><strong>Question Review:</strong> Discuss the questions they will ask and understand the court process.</div>
                                    <div><strong>Normal Practice:</strong> This preparation is a normal and ethical part of the testimony process.</div>
                                </div>
                            </div>

                            <!-- Dress Appropriately -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4z"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Dress Appropriately</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Business Attire:</strong> Dress in clean, neat, and conservative clothing. Business attire is generally recommended.</div>
                                    <div><strong>Avoid Distractions:</strong> Avoid anything overly casual, distracting, or revealing.</div>
                                    <div><strong>Professional Appearance:</strong> Your appearance should reflect the seriousness and dignity of the court proceedings.</div>
                                </div>
                            </div>

                            <!-- Arrive Early -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Arrive Early</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Plan Ahead:</strong> Plan to arrive at the courthouse well in advance of your scheduled testimony time.</div>
                                    <div><strong>Security Checks:</strong> Allow time for security screening and metal detectors.</div>
                                    <div><strong>Find Courtroom:</strong> Locate the correct courtroom and familiarize yourself with the building layout.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- During Testimony Section -->
                <div id="courtroom-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">During Testimony in the Courtroom</h3>
                                <p class="text-gray-600 mt-1">Guidelines for effective and proper testimony delivery</p>
                            </div>
                        </div>

                        <div class="space-y-6">
                            <!-- Taking the Oath -->
                            <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-red-500">
                                <h4 class="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                                    <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    Taking the Oath
                                </h4>
                                <p class="text-gray-600">When called to testify, you will be asked to take an oath or affirmation to tell the truth. This is a solemn promise with legal and moral significance.</p>
                            </div>

                            <!-- Communication Guidelines -->
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
                                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Speaking Clearly</h4>
                                    <ul class="space-y-2 text-sm text-gray-600">
                                        <li>• Speak loudly and clearly for all to hear</li>
                                        <li>• Include judge, jury, court reporter, and attorneys</li>
                                        <li>• Avoid mumbling or speaking too quickly</li>
                                        <li>• Project your voice with confidence</li>
                                    </ul>
                                </div>

                                <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
                                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Listening Carefully</h4>
                                    <ul class="space-y-2 text-sm text-gray-600">
                                        <li>• Listen to the entire question before answering</li>
                                        <li>• Ask for clarification if you don't understand</li>
                                        <li>• Say "I don't know" if you truly don't know</li>
                                        <li>• Never guess or invent answers</li>
                                    </ul>
                                </div>

                                <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
                                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Answering Questions</h4>
                                    <ul class="space-y-2 text-sm text-gray-600">
                                        <li>• Pause briefly before answering</li>
                                        <li>• Direct answers to jury or judge</li>
                                        <li>• Answer only what was asked</li>
                                        <li>• Stop after answering - don't elaborate</li>
                                    </ul>
                                </div>

                                <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-500">
                                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Handling Objections</h4>
                                    <ul class="space-y-2 text-sm text-gray-600">
                                        <li>• Stop speaking immediately when "objection" is called</li>
                                        <li>• Wait for judge's ruling</li>
                                        <li>• "Sustained" = don't answer</li>
                                        <li>• "Overruled" = you may answer</li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Important Reminders -->
                            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                                <h4 class="text-lg font-semibold text-gray-800 mb-4">Critical Reminders</h4>
                                <div class="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div><strong>Correcting Mistakes:</strong> If you realize you made an error, inform the judge immediately and explain the correction.</div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div><strong>Avoid Arguments:</strong> Do not argue with attorneys. Answer respectfully even if questions seem challenging.</div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div><strong>No Speculation:</strong> Only testify to what you personally saw, heard, or experienced.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Types of Examination Section -->
                <div id="examination-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Types of Examination</h3>
                                <p class="text-gray-600 mt-1">Understanding the different phases of testimony</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-6">
                            <!-- Direct Examination -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Direct Examination</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Calling Attorney:</strong> This is when the attorney who called you to testify asks you questions.</div>
                                    <div><strong>Open-Ended Questions:</strong> They will typically ask broad questions to allow you to tell your story.</div>
                                    <div><strong>Narrative Style:</strong> You'll have opportunity to explain events in your own words.</div>
                                    <div><strong>Comfortable Atmosphere:</strong> Usually the most comfortable phase as the attorney is supportive.</div>
                                </div>
                            </div>

                            <!-- Cross-Examination -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Cross-Examination</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Opposing Attorney:</strong> After direct examination, the opposing attorney will question you.</div>
                                    <div><strong>Pointed Questions:</strong> Questions may be more challenging or designed to test your testimony.</div>
                                    <div><strong>Stay Calm:</strong> Remain calm and answer truthfully, even if questions seem aggressive.</div>
                                    <div><strong>Test Accuracy:</strong> Purpose is to test accuracy and completeness of your testimony.</div>
                                </div>
                            </div>

                            <!-- Re-Direct Examination -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Re-Direct Examination</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Follow-Up Questions:</strong> The calling attorney may ask follow-up questions after cross-examination.</div>
                                    <div><strong>Clarification:</strong> Used to clarify or address issues raised during cross-examination.</div>
                                    <div><strong>Limited Scope:</strong> Questions usually limited to topics covered in cross-examination.</div>
                                    <div><strong>Rehabilitation:</strong> Opportunity to restore credibility if it was challenged.</div>
                                </div>
                            </div>

                            <!-- Re-Cross Examination -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L3 7.348V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.652l-1.254.736a1 1 0 11-.992-1.736L14.984 6l-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.652V12a1 1 0 11-2 0v-1.348l-1.246-.716a1 1 0 01-.372-1.364zm2.236 6.364a1 1 0 01-.992 0l-1.75-1a1 1 0 11.992-1.736L10 12.848l1.254-.716a1 1 0 11.992 1.736l-1.75 1z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">Re-Cross Examination</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Final Questions:</strong> The opposing attorney may follow up again after re-direct examination.</div>
                                    <div><strong>Limited Scope:</strong> Questions limited to new topics raised in re-direct.</div>
                                    <div><strong>Brief Phase:</strong> Usually shorter than initial cross-examination.</div>
                                    <div><strong>Conclusion:</strong> Typically the final phase of your testimony.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- After Your Testimony Section -->
                <div id="post-testimony-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">After Your Testimony</h3>
                                <p class="text-gray-600 mt-1">Important steps and obligations following your court appearance</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                            <!-- Do Not Discuss Testimony -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-colors">Confidentiality Requirements</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>No Discussion:</strong> Do not discuss your testimony or the case with anyone until the case is completely over.</div>
                                    <div><strong>Limited Exceptions:</strong> Only discuss with attorneys involved in the case or your own attorney if you have one.</div>
                                    <div><strong>Complete Case:</strong> Restriction remains until the entire case concludes, not just your testimony.</div>
                                    <div><strong>Attorney Guidance:</strong> Follow specific instructions from the attorney who called you regarding any communications.</div>
                                </div>
                            </div>

                            <!-- Release by Court -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Formal Release Process</h4>
                                </div>
                                <div class="space-y-3 text-sm text-gray-600">
                                    <div><strong>Official Release:</strong> You will be formally released by the court or the attorney who called you once your testimony is complete.</div>
                                    <div><strong>Wait for Permission:</strong> Do not leave the courthouse until you receive permission to do so.</div>
                                    <div><strong>Possible Recall:</strong> In some cases, you may need to remain available in case additional questions arise.</div>
                                    <div><strong>Final Instructions:</strong> Listen carefully to any final instructions given by the court or attorney.</div>
                                </div>
                            </div>

                            <!-- Additional Considerations -->
                            <div class="col-span-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    Additional Post-Testimony Considerations
                                </h4>
                                <div class="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div><strong>Emotional Support:</strong> Testifying can be emotionally draining. Seek appropriate support if needed.</div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div><strong>Documentation:</strong> Keep any court papers or subpoenas until officially told they are no longer needed.</div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div><strong>Future Contact:</strong> Inform the attorney if your contact information changes before the case concludes.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary Section -->
                <div class="mt-12 bg-gradient-to-r from-indigo-50 to-purple-100 rounded-2xl p-8 border border-indigo-200">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                    <h3 class="text-3xl font-bold mb-4 font-serif">Truth and Justice</h3>
                    <p class="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                        By following these guidelines, witnesses help ensure that the Los Santos justice system operates with 
                        integrity, fairness, and effectiveness. Your testimony, delivered truthfully and professionally, 
                        serves the cause of justice and protects the rights of all citizens.
                    </p>
                </div>
            </div>
        `
    },
    {
        id: 'rule5',
        title: 'Documentation',
        fullTitle: 'Legal Documentation Standards',
        description: 'Standards for preparing and maintaining legal documentation.',
        category: 'legal',
        icon: '📄',
        color: 'bg-teal-500',        content: `
            <!-- Hero Section -->
            <div class="relative bg-gradient-to-br from-teal-600 to-emerald-700 text-white p-8 rounded-lg shadow-xl mb-8">
                <div class="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
                <div class="relative z-10 text-center">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                        <span class="text-3xl">📄</span>
                    </div>
                    <h1 class="text-3xl font-bold mb-2">Legal Documentation Standards</h1>
                    <p class="text-xl opacity-90">Professional Standards for Legal Document Preparation and Filing</p>
                </div>
            </div>

            <!-- Tab Navigation -->
            <div class="flex flex-wrap gap-2 mb-8 p-2 bg-gray-100 rounded-lg">
                <button onclick="showTabContent('rule5', 'formatting')" 
                        class="tab-button px-4 py-3 rounded-md font-medium transition-all duration-200 flex-1 min-w-0 text-sm
                               bg-teal-600 text-white shadow-md transform scale-105"
                        data-tab="formatting">
                    <span class="hidden sm:inline">📐 </span>Formatting
                </button>
                <button onclick="showTabContent('rule5', 'content')" 
                        class="tab-button px-4 py-3 rounded-md font-medium transition-all duration-200 flex-1 min-w-0 text-sm
                               bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        data-tab="content">
                    <span class="hidden sm:inline">📋 </span>Content
                </button>
                <button onclick="showTabContent('rule5', 'language')" 
                        class="tab-button px-4 py-3 rounded-md font-medium transition-all duration-200 flex-1 min-w-0 text-sm
                               bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        data-tab="language">
                    <span class="hidden sm:inline">✍️ </span>Language
                </button>
                <button onclick="showTabContent('rule5', 'citations')" 
                        class="tab-button px-4 py-3 rounded-md font-medium transition-all duration-200 flex-1 min-w-0 text-sm
                               bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        data-tab="citations">
                    <span class="hidden sm:inline">📚 </span>Citations
                </button>
                <button onclick="showTabContent('rule5', 'efiling')" 
                        class="tab-button px-4 py-3 rounded-md font-medium transition-all duration-200 flex-1 min-w-0 text-sm
                               bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        data-tab="efiling">
                    <span class="hidden sm:inline">💻 </span>E-Filing
                </button>
            </div>

            <!-- Tab Content -->
            <div id="rule5-formatting" class="tab-content space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-xl font-bold text-teal-700 mb-4 flex items-center">
                            <span class="mr-2">📏</span> Paper & Layout
                        </h3>
                        <div class="space-y-3 text-gray-700">
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Paper Size:</strong> 8.5" x 11" white paper
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Margins:</strong> 1" on all sides minimum
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Orientation:</strong> Portrait layout unless specifically authorized
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Binding:</strong> Single-sided printing with secure binding
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-xl font-bold text-emerald-700 mb-4 flex items-center">
                            <span class="mr-2">🔤</span> Typography & Text
                        </h3>
                        <div class="space-y-3 text-gray-700">
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Font:</strong> Times New Roman or Arial, 12-point minimum
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Line Spacing:</strong> Double-spaced for pleadings, 1.5x for briefs
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Justification:</strong> Left-aligned, no full justification
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Page Numbers:</strong> Bottom center or top right
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-lg border border-teal-200">
                    <h3 class="text-xl font-bold text-teal-800 mb-4 flex items-center">
                        <span class="mr-2">⚠️</span> Critical Formatting Requirements
                    </h3>
                    <div class="grid md:grid-cols-3 gap-4 text-sm">
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <strong class="text-teal-700">Headers & Footers</strong>
                            <p class="text-gray-600 mt-1">Include case number, document title, and attorney information</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <strong class="text-teal-700">Line Numbering</strong>
                            <p class="text-gray-600 mt-1">Required for all pleadings and court filings</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <strong class="text-teal-700">Pagination</strong>
                            <p class="text-gray-600 mt-1">Consecutive numbering, starting from page 1</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="rule5-content" class="tab-content space-y-6 hidden">
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-xl font-bold text-teal-700 mb-4 flex items-center">
                            <span class="mr-2">📝</span> Document Captions
                        </h3>
                        <div class="space-y-3 text-gray-700">
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Court Name:</strong> Full official name of the court
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Case Number:</strong> Complete case number as assigned
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Party Names:</strong> Exact legal names of all parties
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Document Title:</strong> Specific and descriptive title
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-xl font-bold text-emerald-700 mb-4 flex items-center">
                            <span class="mr-2">✍️</span> Signatures & Authentication
                        </h3>
                        <div class="space-y-3 text-gray-700">
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Attorney Signature:</strong> Handwritten or electronic as permitted
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Bar Number:</strong> State bar license number required
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Date:</strong> Date of signing clearly indicated
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Verification:</strong> Sworn statements require notarization
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                        <span class="mr-2">📎</span> Exhibits & Attachments
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="space-y-3">
                            <h4 class="font-semibold text-blue-700">Organization Requirements</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Sequential lettering (Exhibit A, B, C...)
                                </li>
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Tab dividers for each exhibit
                                </li>
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Cover page listing all exhibits
                                </li>
                            </ul>
                        </div>
                        <div class="space-y-3">
                            <h4 class="font-semibold text-blue-700">Content Standards</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Clear, legible copies only
                                </li>
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Authentication certificates
                                </li>
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Proper foundation established
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span class="mr-2">👤</span> Attorney Information Block
                    </h3>
                    <div class="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                        <div class="space-y-1 text-gray-700">
                            <div>[Attorney Name], Esq.</div>
                            <div>State Bar No. [Number]</div>
                            <div>[Law Firm Name]</div>
                            <div>[Street Address]</div>
                            <div>[City, State ZIP]</div>
                            <div>Tel: [Phone Number]</div>
                            <div>Email: [Email Address]</div>
                            <div class="mt-2">Attorney for [Party Name]</div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="rule5-language" class="tab-content space-y-6 hidden">
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-xl font-bold text-teal-700 mb-4 flex items-center">
                            <span class="mr-2">🎯</span> Clarity & Precision
                        </h3>
                        <div class="space-y-3 text-gray-700">
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Plain Language:</strong> Use clear, accessible legal language
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Defined Terms:</strong> Define technical terms on first use
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Active Voice:</strong> Prefer active over passive construction
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Conciseness:</strong> Eliminate unnecessary words and phrases
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-xl font-bold text-emerald-700 mb-4 flex items-center">
                            <span class="mr-2">⚖️</span> Legal Accuracy
                        </h3>
                        <div class="space-y-3 text-gray-700">
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Factual Accuracy:</strong> Verify all facts and dates
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Legal Standards:</strong> Apply current law and precedents
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Consistency:</strong> Use terms consistently throughout
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Completeness:</strong> Address all relevant legal issues
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
                    <h3 class="text-xl font-bold text-amber-800 mb-4 flex items-center">
                        <span class="mr-2">🎭</span> Professional Tone Guidelines
                    </h3>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <h4 class="font-semibold text-green-700 mb-2">✅ Preferred Language</h4>
                            <ul class="text-sm text-gray-700 space-y-1">
                                <li>• Respectful address</li>
                                <li>• Formal tone</li>
                                <li>• Objective presentation</li>
                                <li>• Professional courtesy</li>
                            </ul>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <h4 class="font-semibold text-red-700 mb-2">❌ Avoid</h4>
                            <ul class="text-sm text-gray-700 space-y-1">
                                <li>• Inflammatory language</li>
                                <li>• Personal attacks</li>
                                <li>• Colloquialisms</li>
                                <li>• Emotional appeals</li>
                            </ul>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <h4 class="font-semibold text-blue-700 mb-2">📝 Best Practices</h4>
                            <ul class="text-sm text-gray-700 space-y-1">
                                <li>• Third-person reference</li>
                                <li>• Factual statements</li>
                                <li>• Legal terminology</li>
                                <li>• Measured arguments</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span class="mr-2">📖</span> Grammar & Style Requirements
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-3">Essential Elements</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Proper punctuation and capitalization
                                </li>
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Complete sentences and paragraphs
                                </li>
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Logical organization and flow
                                </li>
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Thorough proofreading required
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-3">Style Guidelines</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li class="flex items-start">
                                    <span class="text-green-500 mr-2">•</span>
                                    Follow The Bluebook citation format
                                </li>
                                <li class="flex items-start">
                                    <span class="text-green-500 mr-2">•</span>
                                    Use gender-neutral language when possible
                                </li>
                                <li class="flex items-start">
                                    <span class="text-green-500 mr-2">•</span>
                                    Maintain consistent verb tenses
                                </li>
                                <li class="flex items-start">
                                    <span class="text-green-500 mr-2">•</span>
                                    Spell out numbers one through nine
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div id="rule5-citations" class="tab-content space-y-6 hidden">
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-xl font-bold text-teal-700 mb-4 flex items-center">
                            <span class="mr-2">📚</span> Legal Authorities
                        </h3>
                        <div class="space-y-4">
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-2">Constitutional Citations</h4>
                                <div class="bg-gray-50 p-3 rounded text-sm font-mono">
                                    U.S. Const. art. I, § 8, cl. 3
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-2">Federal Statutes</h4>
                                <div class="bg-gray-50 p-3 rounded text-sm font-mono">
                                    42 U.S.C. § 1983 (2018)
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-2">Federal Regulations</h4>
                                <div class="bg-gray-50 p-3 rounded text-sm font-mono">
                                    29 C.F.R. § 1630.2(g) (2020)
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-xl font-bold text-emerald-700 mb-4 flex items-center">
                            <span class="mr-2">⚖️</span> Case Law Citations
                        </h3>
                        <div class="space-y-4">
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-2">Supreme Court</h4>
                                <div class="bg-gray-50 p-3 rounded text-sm font-mono">
                                    Brown v. Board of Educ., 347 U.S. 483 (1954)
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-2">Federal Appellate</h4>
                                <div class="bg-gray-50 p-3 rounded text-sm font-mono">
                                    Smith v. Jones, 123 F.3d 456 (9th Cir. 2019)
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-2">Federal District</h4>
                                <div class="bg-gray-50 p-3 rounded text-sm font-mono">
                                    Doe v. Roe, 789 F. Supp. 2d 123 (S.D.N.Y. 2020)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                        <span class="mr-2">🏛️</span> Los Santos Specific Citations
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <div>
                                <h4 class="font-semibold text-blue-700 mb-2">Los Santos Statutes</h4>
                                <div class="bg-white p-3 rounded text-sm font-mono shadow-sm">
                                    L.S. Code § 12-345 (2023)
                                </div>
                                <p class="text-xs text-gray-600 mt-1">Include section number and year of last amendment</p>
                            </div>
                            <div>
                                <h4 class="font-semibold text-blue-700 mb-2">Local Ordinances</h4>
                                <div class="bg-white p-3 rounded text-sm font-mono shadow-sm">
                                    Los Santos Mun. Code § 8.04.010 (2023)
                                </div>
                                <p class="text-xs text-gray-600 mt-1">Municipal code citations with full section reference</p>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div>
                                <h4 class="font-semibold text-blue-700 mb-2">Los Santos Cases</h4>
                                <div class="bg-white p-3 rounded text-sm font-mono shadow-sm">
                                    People v. Anderson, 45 L.S.2d 678 (2023)
                                </div>
                                <p class="text-xs text-gray-600 mt-1">Los Santos Reports citation format</p>
                            </div>
                            <div>
                                <h4 class="font-semibold text-blue-700 mb-2">Administrative Rules</h4>
                                <div class="bg-white p-3 rounded text-sm font-mono shadow-sm">
                                    L.S. Admin. R. 15.3.2 (2023)
                                </div>
                                <p class="text-xs text-gray-600 mt-1">Administrative regulations and rules</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span class="mr-2">📋</span> Citation Best Practices
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-3">Format Requirements</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Use proper abbreviations per The Bluebook
                                </li>
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Include pinpoint citations for specific pages
                                </li>
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Use parenthetical information when helpful
                                </li>
                                <li class="flex items-start">
                                    <span class="text-blue-500 mr-2">•</span>
                                    Italicize case names and book titles
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-3">Citation Placement</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li class="flex items-start">
                                    <span class="text-green-500 mr-2">•</span>
                                    Cite immediately after quoted material
                                </li>
                                <li class="flex items-start">
                                    <span class="text-green-500 mr-2">•</span>
                                    Use signal words appropriately (e.g., "See")
                                </li>
                                <li class="flex items-start">
                                    <span class="text-green-500 mr-2">•</span>
                                    Group multiple citations by hierarchy
                                </li>
                                <li class="flex items-start">
                                    <span class="text-green-500 mr-2">•</span>
                                    Use string citations sparingly
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <h3 class="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                        <span class="mr-2">⚠️</span> Common Citation Errors to Avoid
                    </h3>
                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                        <div class="space-y-2">
                            <div class="font-semibold text-red-700">Formatting Mistakes</div>
                            <ul class="text-gray-700 space-y-1">
                                <li>• Incorrect abbreviations</li>
                                <li>• Missing parenthetical dates</li>
                                <li>• Improper punctuation</li>
                                <li>• Inconsistent citation style</li>
                            </ul>
                        </div>
                        <div class="space-y-2">
                            <div class="font-semibold text-red-700">Substantive Issues</div>
                            <ul class="text-gray-700 space-y-1">
                                <li>• Citing overturned cases</li>
                                <li>• Inadequate authority support</li>
                                <li>• Missing subsequent history</li>
                                <li>• Incorrect legal propositions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div id="rule5-efiling" class="tab-content space-y-6 hidden">
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-xl font-bold text-teal-700 mb-4 flex items-center">
                            <span class="mr-2">💻</span> Digital Submission
                        </h3>
                        <div class="space-y-3 text-gray-700">
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>File Format:</strong> PDF/A format preferred for archival
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>File Size:</strong> Maximum 25MB per document
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Text Recognition:</strong> All documents must be OCR-searchable
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Digital Signature:</strong> Valid electronic signature required
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-xl font-bold text-emerald-700 mb-4 flex items-center">
                            <span class="mr-2">🔒</span> Redaction & Privacy
                        </h3>
                        <div class="space-y-3 text-gray-700">
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Personal Information:</strong> Redact SSNs, account numbers
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Minor Information:</strong> Protect children's full names/details
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Medical Records:</strong> Comply with HIPAA requirements
                                </div>
                            </div>
                            <div class="flex items-start">
                                <span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <div>
                                    <strong>Sealed Documents:</strong> Follow confidentiality protocols
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                    <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                        <span class="mr-2">📅</span> Filing Deadlines & Procedures
                    </h3>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <h4 class="font-semibold text-blue-700 mb-2">Submission Times</h4>
                            <ul class="text-sm text-gray-700 space-y-1">
                                <li>• 11:59 PM filing deadline</li>
                                <li>• Time zone: Los Santos Standard</li>
                                <li>• Emergency filings: Call clerk</li>
                                <li>• Weekend/holiday restrictions</li>
                            </ul>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <h4 class="font-semibold text-blue-700 mb-2">Confirmation Process</h4>
                            <ul class="text-sm text-gray-700 space-y-1">
                                <li>• Automatic receipt confirmation</li>
                                <li>• Clerk review within 24 hours</li>
                                <li>• Email notification of acceptance</li>
                                <li>• Rejection notifications with reasons</li>
                            </ul>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow-sm">
                            <h4 class="font-semibold text-blue-700 mb-2">Technical Requirements</h4>
                            <ul class="text-sm text-gray-700 space-y-1">
                                <li>• Secure browser required</li>
                                <li>• Two-factor authentication</li>
                                <li>• Attorney portal access</li>
                                <li>• System maintenance windows</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span class="mr-2">📂</span> Record Keeping & Management
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-3">Document Retention</h4>
                            <div class="space-y-3">
                                <div class="bg-gray-50 p-3 rounded">
                                    <div class="font-medium text-gray-800">Active Cases</div>
                                    <div class="text-sm text-gray-600">Retain all documents until case conclusion + 7 years</div>
                                </div>
                                <div class="bg-gray-50 p-3 rounded">
                                    <div class="font-medium text-gray-800">Closed Cases</div>
                                    <div class="text-sm text-gray-600">Electronic archive for 15 years minimum</div>
                                </div>
                                <div class="bg-gray-50 p-3 rounded">
                                    <div class="font-medium text-gray-800">Appeals</div>
                                    <div class="text-sm text-gray-600">Extended retention during appellate process</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-3">Access & Security</h4>
                            <div class="space-y-3">
                                <div class="bg-blue-50 p-3 rounded border border-blue-200">
                                    <div class="font-medium text-blue-800">Public Access</div>
                                    <div class="text-sm text-blue-700">Most court records available online to registered users</div>
                                </div>
                                <div class="bg-yellow-50 p-3 rounded border border-yellow-200">
                                    <div class="font-medium text-yellow-800">Restricted Access</div>
                                    <div class="text-sm text-yellow-700">Sealed documents require court order for access</div>
                                </div>
                                <div class="bg-red-50 p-3 rounded border border-red-200">
                                    <div class="font-medium text-red-800">Confidential</div>
                                    <div class="text-sm text-red-700">Mental health, juvenile records strictly protected</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 class="text-xl font-bold text-green-800 mb-4 flex items-center">
                        <span class="mr-2">✅</span> E-Filing Checklist
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold text-green-700 mb-3">Before Filing</h4>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" disabled>
                                    <span class="text-sm">Document meets formatting requirements</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" disabled>
                                    <span class="text-sm">All personal information redacted</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" disabled>
                                    <span class="text-sm">Digital signature applied</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" disabled>
                                    <span class="text-sm">File size under 25MB</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" disabled>
                                    <span class="text-sm">PDF is OCR-searchable</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold text-green-700 mb-3">After Filing</h4>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" disabled>
                                    <span class="text-sm">Receipt confirmation received</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" disabled>
                                    <span class="text-sm">Service of process completed</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" disabled>
                                    <span class="text-sm">Case management system updated</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" disabled>
                                    <span class="text-sm">Client notification sent</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2" disabled>
                                    <span class="text-sm">Calendar deadlines updated</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Summary Section -->
            <div class="mt-12 bg-gradient-to-r from-teal-600 to-emerald-700 text-white p-6 rounded-lg shadow-xl">
                <h3 class="text-xl font-bold mb-3 flex items-center">
                    <span class="mr-2">📋</span> Documentation Standards Summary
                </h3>
                <p class="mb-4 opacity-90">
                    Adherence to these Legal Documentation Standards ensures professional presentation, 
                    legal compliance, and efficient court processing of all legal documents.
                </p>
                <div class="flex flex-wrap gap-3">
                    <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Professional Formatting</span>
                    <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Accurate Content</span>
                    <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Proper Citations</span>
                    <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Secure E-Filing</span>
                </div>
            </div>
        `
    },    {
        id: 'rule6',
        title: 'Court Security',
        fullTitle: 'Court Security Protocols',
        description: 'The Los Santos Department of Justice is committed to providing a safe and secure environment for all individuals within our courthouses.',
        category: 'security',
        icon: '🛡️',        color: 'bg-red-500',
        content: `
            <style>
                .tab-btn {
                    background-color: #f3f4f6;
                    color: #6b7280;
                }
                .tab-btn.active {
                    background-color: #dc2626;
                    color: white;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .tab-btn:hover {
                    background-color: #e5e7eb;
                }
                .tab-btn.active:hover {
                    background-color: #b91c1c;
                }
                .content-section.hidden {
                    display: none;
                }
            </style>
            <div class="max-w-7xl mx-auto">
                <!-- Hero Section -->
                <div class="relative bg-gradient-to-br from-red-600 to-red-800 text-white p-8 rounded-lg shadow-xl mb-8">
                    <div class="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
                    <div class="relative z-10 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                            <span class="text-3xl">🛡️</span>
                        </div>
                        <h1 class="text-3xl font-bold mb-2">Court Security Protocols</h1>
                        <p class="text-xl opacity-90">Comprehensive Security Measures for Los Santos Court Facilities</p>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="mb-8">
                    <div class="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl">
                        <button onclick="showSection('entry-screening')" class="tab-btn active px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="entry-screening">
                            Entry & Screening
                        </button>
                        <button onclick="showSection('courthouse-conduct')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="courthouse-conduct">
                            Courthouse Conduct
                        </button>
                        <button onclick="showSection('courtroom-security')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="courtroom-security">
                            Courtroom Security
                        </button>
                        <button onclick="showSection('personnel-security')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="personnel-security">
                            Personnel Security
                        </button>
                        <button onclick="showSection('emergency-procedures')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="emergency-procedures">
                            Emergency Procedures
                        </button>
                    </div>
                </div>

                <!-- Entry and Screening Procedures Section -->
                <div id="entry-screening-section" class="content-section">
                    <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-red-900 mb-2">Entry and Screening Procedures</h2>
                                <p class="text-lg text-red-700">Controlled access and security screening for all courthouse visitors</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Access Control -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-red-100">
                                <h3 class="text-xl font-bold text-red-800 mb-4 flex items-center">
                                    <span class="mr-2">🚪</span> Controlled Access Points
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-red-700">Designated Entrances:</strong>
                                            <p class="text-gray-700 mt-1">All public entrances to Los Santos courthouses are controlled. Visitors must use designated entry points only.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-red-700">Security Checkpoints:</strong>
                                            <p class="text-gray-700 mt-1">All individuals must pass through security checkpoints before entering the courthouse.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-red-700">Identification Requirements:</strong>
                                            <p class="text-gray-700 mt-1">Court security personnel may request valid photo identification from all visitors.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Security Screening -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-red-100">
                                <h3 class="text-xl font-bold text-red-800 mb-4 flex items-center">
                                    <span class="mr-2">🔍</span> Security Screening Process
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-red-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-red-700 mb-2">Mandatory Screening includes:</h4>
                                        <ul class="space-y-2 text-gray-700">
                                            <li class="flex items-center">
                                                <span class="text-red-500 mr-2">•</span>
                                                Walk-through metal detector passage
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-red-500 mr-2">•</span>
                                                X-ray screening of all belongings
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-red-500 mr-2">•</span>
                                                Secondary screening if necessary
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-red-500 mr-2">•</span>
                                                Hand-held metal detector scans
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                        <p class="text-orange-800"><strong>Note:</strong> All individuals, including attorneys, litigants, witnesses, and the public, are subject to security screening.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Prohibited Items -->
                        <div class="mt-8 bg-red-100 border border-red-300 rounded-xl p-6">
                            <h3 class="text-xl font-bold text-red-800 mb-4 flex items-center">
                                <span class="mr-2">🚫</span> Strictly Prohibited Items
                            </h3>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 class="font-semibold text-red-700 mb-3">Weapons & Dangerous Items</h4>
                                    <ul class="space-y-2 text-gray-700">
                                        <li class="flex items-start">
                                            <span class="text-red-500 mr-2 mt-1">•</span>
                                            Firearms, knives, sharp objects, weapons
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-red-500 mr-2 mt-1">•</span>
                                            Explosives and flammable materials
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-red-500 mr-2 mt-1">•</span>
                                            Any hazardous substances
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-red-700 mb-3">Controlled Substances & Equipment</h4>
                                    <ul class="space-y-2 text-gray-700">
                                        <li class="flex items-start">
                                            <span class="text-red-500 mr-2 mt-1">•</span>
                                            Illegal drugs or controlled substances
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-red-500 mr-2 mt-1">•</span>
                                            Alcoholic beverages
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-red-500 mr-2 mt-1">•</span>
                                            Recording devices (unless authorized)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mt-4 bg-yellow-100 border border-yellow-300 rounded-lg p-4">
                                <p class="text-yellow-800"><strong>Law Enforcement Exception:</strong> Only on-duty, uniformed law enforcement officers with official court business and designated Judges are authorized to carry weapons within the premises.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Courthouse Conduct Section -->
                <div id="courthouse-conduct-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-blue-900 mb-2">Conduct Within the Courthouse</h2>
                                <p class="text-lg text-blue-700">Behavioral expectations and guidelines for all courthouse visitors</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Behavioral Standards -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                                <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                    <span class="mr-2">👥</span> Behavioral Standards
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-blue-700">Respectful Behavior:</strong>
                                            <p class="text-gray-700 mt-1">Maintain a respectful and orderly demeanor at all times. Disruptive behavior, shouting, or engaging in arguments is strictly prohibited.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-blue-700">Following Directives:</strong>
                                            <p class="text-gray-700 mt-1">Obey all instructions from court security officers, bailiffs, and court staff immediately and without question.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-blue-700">Cooperation Required:</strong>
                                            <p class="text-gray-700 mt-1">Full cooperation with security personnel is mandatory. Non-compliance may result in removal and legal action.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Access Restrictions -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                                <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                    <span class="mr-2">🚷</span> Restricted Areas & Activities
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-blue-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-blue-700 mb-2">Prohibited Areas:</h4>
                                        <ul class="space-y-2 text-gray-700">
                                            <li class="flex items-center">
                                                <span class="text-blue-500 mr-2">•</span>
                                                Judges' chambers and offices
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-blue-500 mr-2">•</span>
                                                Staff-only work areas
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-blue-500 mr-2">•</span>
                                                Prisoner holding areas
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-blue-500 mr-2">•</span>
                                                "Authorized Personnel Only" zones
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
                                        <h4 class="font-semibold text-amber-700 mb-2">Electronic Device Rules:</h4>
                                        <p class="text-gray-700">Cell phones must be silenced. Use within courtrooms is restricted per Court Decorum guidelines. Photography, video, and audio recording is strictly prohibited without judicial approval.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Reporting Requirements -->
                        <div class="mt-8 bg-green-100 border border-green-300 rounded-xl p-6">
                            <h3 class="text-xl font-bold text-green-800 mb-4 flex items-center">
                                <span class="mr-2">📢</span> Reporting Suspicious Activity
                            </h3>
                            <div class="grid md:grid-cols-3 gap-4">
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <strong class="text-green-700">Suspicious Behavior</strong>
                                    <p class="text-gray-600 mt-1">Report any unusual or threatening behavior immediately</p>
                                </div>
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <strong class="text-green-700">Unattended Items</strong>
                                    <p class="text-gray-600 mt-1">Alert security to any unattended packages or belongings</p>
                                </div>
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <strong class="text-green-700">Security Concerns</strong>
                                    <p class="text-gray-600 mt-1">Contact the nearest court security officer or staff member</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Courtroom Security Section -->
                <div id="courtroom-security-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-purple-900 mb-2">Courtroom Security</h2>
                                <p class="text-lg text-purple-700">Specialized security measures within active courtrooms</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Security Personnel -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-purple-100">
                                <h3 class="text-xl font-bold text-purple-800 mb-4 flex items-center">
                                    <span class="mr-2">👮</span> Bailiffs & Security Officers
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-purple-700">Trained Personnel:</strong>
                                            <p class="text-gray-700 mt-1">Each courtroom is staffed by trained bailiffs or court security officers responsible for maintaining order and protecting all participants.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-purple-700">Emergency Response:</strong>
                                            <p class="text-gray-700 mt-1">Security officers are trained to respond to medical emergencies, security threats, and disruptions.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-purple-700">Seating Management:</strong>
                                            <p class="text-gray-700 mt-1">Follow all directions from bailiffs regarding seating arrangements. Certain areas may be reserved or restricted.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Courtroom Protocols -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-purple-100">
                                <h3 class="text-xl font-bold text-purple-800 mb-4 flex items-center">
                                    <span class="mr-2">⚖️</span> Courtroom Protocols
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-purple-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-purple-700 mb-2">Mandatory Requirements:</h4>
                                        <ul class="space-y-2 text-gray-700">
                                            <li class="flex items-center">
                                                <span class="text-purple-500 mr-2">•</span>
                                                Absolute silence when court is in session
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-purple-500 mr-2">•</span>
                                                Maintain proper decorum at all times
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-purple-500 mr-2">•</span>
                                                No communication with in-custody individuals
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-purple-500 mr-2">•</span>
                                                Follow emergency instructions immediately
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Emergency Procedures in Courtroom -->
                        <div class="mt-8 bg-red-100 border border-red-300 rounded-xl p-6">
                            <h3 class="text-xl font-bold text-red-800 mb-4 flex items-center">
                                <span class="mr-2">🚨</span> Courtroom Emergency Procedures
                            </h3>
                            <div class="grid md:grid-cols-3 gap-4">
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <strong class="text-red-700">Medical Emergency</strong>
                                    <p class="text-gray-600 mt-1">Remain seated, do not interfere, allow medical personnel access</p>
                                </div>
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <strong class="text-red-700">Fire Alarm</strong>
                                    <p class="text-gray-600 mt-1">Follow bailiff instructions for orderly evacuation</p>
                                </div>
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <strong class="text-red-700">Security Threat</strong>
                                    <p class="text-gray-600 mt-1">Follow security personnel directions immediately</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Personnel Security Section -->
                <div id="personnel-security-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-green-900 mb-2">Judicial and Personnel Security</h2>
                                <p class="text-lg text-green-700">Specialized protection measures for judges and court staff</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Physical Security Measures -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-green-100">
                                <h3 class="text-xl font-bold text-green-800 mb-4 flex items-center">
                                    <span class="mr-2">🏢</span> Physical Security Infrastructure
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-green-700">Separate Circulation:</strong>
                                            <p class="text-gray-700 mt-1">Separate access routes are maintained for judges, court staff, and in-custody defendants to minimize contact with the general public.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-green-700">Secured Spaces:</strong>
                                            <p class="text-gray-700 mt-1">Judges' chambers and court offices are secured with restricted access controls and monitoring systems.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-green-700">Duress Alarms:</strong>
                                            <p class="text-gray-700 mt-1">Courtrooms and judicial offices are equipped with duress alarms to alert security personnel in emergencies.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Threat Assessment -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-green-100">
                                <h3 class="text-xl font-bold text-green-800 mb-4 flex items-center">
                                    <span class="mr-2">🎯</span> Threat Assessment & Intelligence
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-green-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-green-700 mb-2">Ongoing Assessment:</h4>
                                        <p class="text-gray-700">The Los Santos DOJ, in coordination with law enforcement, conducts ongoing threat assessments to identify and mitigate potential risks to judges, court personnel, and the courthouse.</p>
                                    </div>
                                    <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <h4 class="font-semibold text-blue-700 mb-2">Intelligence Coordination:</h4>
                                        <p class="text-gray-700">Regular coordination with LSPD Intelligence Division and federal agencies to monitor and assess potential threats.</p>
                                    </div>
                                    <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
                                        <h4 class="font-semibold text-amber-700 mb-2">Risk Mitigation:</h4>
                                        <p class="text-gray-700">Proactive measures are implemented based on threat assessments to ensure the safety of all personnel.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Emergency Preparedness Section -->
                <div id="emergency-procedures-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-orange-900 mb-2">Emergency Preparedness</h2>
                                <p class="text-lg text-orange-700">Comprehensive emergency response and evacuation procedures</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Evacuation Procedures -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-orange-100">
                                <h3 class="text-xl font-bold text-orange-800 mb-4 flex items-center">
                                    <span class="mr-2">🚪</span> Evacuation Plans
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-orange-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-orange-700 mb-2">Multiple Scenarios:</h4>
                                        <ul class="space-y-2 text-gray-700">
                                            <li class="flex items-center">
                                                <span class="text-orange-500 mr-2">•</span>
                                                Fire emergency evacuation routes
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-orange-500 mr-2">•</span>
                                                Bomb threat evacuation procedures
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-orange-500 mr-2">•</span>
                                                Active threat response protocols
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-orange-500 mr-2">•</span>
                                                Natural disaster evacuation plans
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <h4 class="font-semibold text-blue-700 mb-2">Regular Training:</h4>
                                        <p class="text-gray-700">Evacuation plans are regularly reviewed and practiced by all court personnel to ensure rapid, orderly response.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Shelter-in-Place -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-orange-100">
                                <h3 class="text-xl font-bold text-orange-800 mb-4 flex items-center">
                                    <span class="mr-2">🏠</span> Shelter-in-Place Protocols
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                                        <h4 class="font-semibold text-red-700 mb-2">When to Shelter:</h4>
                                        <p class="text-gray-700 mb-2">Protocols are established to protect individuals during certain security incidents where evacuation may not be safe.</p>
                                        <ul class="space-y-1 text-gray-700">
                                            <li class="flex items-center">
                                                <span class="text-red-500 mr-2">•</span>
                                                Active shooter situations
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-red-500 mr-2">•</span>
                                                External hazardous material incidents
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-red-500 mr-2">•</span>
                                                Severe weather conditions
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                        <h4 class="font-semibold text-yellow-700 mb-2">Shelter Procedures:</h4>
                                        <p class="text-gray-700">Lock doors, turn off lights, move away from windows, remain quiet, and await further instructions from authorities.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Emergency Coordination -->
                        <div class="mt-8 bg-blue-100 border border-blue-300 rounded-xl p-6">
                            <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                <span class="mr-2">🤝</span> Emergency Services Coordination
                            </h3>
                            <div class="grid md:grid-cols-3 gap-4">
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <strong class="text-blue-700">Los Santos Police</strong>
                                    <p class="text-gray-600 mt-1">Direct coordination with LSPD for security incidents and law enforcement response</p>
                                </div>
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <strong class="text-blue-700">Fire Department</strong>
                                    <p class="text-gray-600 mt-1">Coordination with LSFD for fire emergencies and hazardous material incidents</p>
                                </div>
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <strong class="text-blue-700">Emergency Medical</strong>
                                    <p class="text-gray-600 mt-1">Established protocols with emergency medical services for medical emergencies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary Section -->
                <div class="mt-12 bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-lg shadow-xl">
                    <h3 class="text-xl font-bold mb-3 flex items-center">
                        <span class="mr-2">🛡️</span> Security Protocol Summary
                    </h3>
                    <p class="mb-4 opacity-90">
                        The safety and security of all who enter our courthouses are paramount. By adhering to these protocols, 
                        everyone contributes to maintaining a secure and effective environment for the administration of justice in Los Santos.
                    </p>
                    <div class="flex flex-wrap gap-3">
                        <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Controlled Access</span>
                        <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Security Screening</span>
                        <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Emergency Preparedness</span>
                        <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Professional Security</span>
                    </div>
                </div>
            </div>
            </div>
        `
    },    {
        id: 'rule7',
        title: 'Media Relations',
        fullTitle: 'Media Relations Policy',
        description: 'Guidelines for media interaction and public communications in accordance with transparency principles and legal obligations.',
        category: 'legal',
        icon: '📺',
        color: 'bg-orange-500',
        content: `
            <style>
                .tab-btn {
                    background-color: #f3f4f6;
                    color: #6b7280;
                }
                .tab-btn.active {
                    background-color: #ea580c;
                    color: white;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .tab-btn:hover {
                    background-color: #e5e7eb;
                }
                .tab-btn.active:hover {
                    background-color: #c2410c;
                }
                .content-section.hidden {
                    display: none;
                }
            </style>
            <div class="max-w-7xl mx-auto">
                <!-- Hero Section -->
                <div class="relative bg-gradient-to-br from-orange-600 to-red-700 text-white p-8 rounded-lg shadow-xl mb-8">
                    <div class="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
                    <div class="relative z-10 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                            <span class="text-3xl">📺</span>
                        </div>
                        <h1 class="text-3xl font-bold mb-2">Media Relations Policy</h1>
                        <p class="text-xl opacity-90">Transparent Communications & Public Information Guidelines</p>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="mb-8">
                    <div class="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl">
                        <button onclick="showSection('guiding-principles')" class="tab-btn active px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="guiding-principles">
                            Guiding Principles
                        </button>
                        <button onclick="showSection('contacts-authorization')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="contacts-authorization">
                            Contacts & Authorization
                        </button>
                        <button onclick="showSection('information-guidelines')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="information-guidelines">
                            Information Guidelines
                        </button>
                        <button onclick="showSection('media-protocols')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="media-protocols">
                            Media Protocols
                        </button>
                        <button onclick="showSection('social-media')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="social-media">
                            Social Media & Violations
                        </button>
                    </div>
                </div>

                <!-- Guiding Principles Section -->
                <div id="guiding-principles-section" class="content-section">
                    <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-orange-900 mb-2">Guiding Principles</h2>
                                <p class="text-lg text-orange-700">Core principles governing DOJ media relations and public communications</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Transparency & Legal Limits -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-orange-100">
                                <h3 class="text-xl font-bold text-orange-800 mb-4 flex items-center">
                                    <span class="mr-2">🔍</span> Transparency within Legal Limits
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-orange-700">Public Information:</strong>
                                            <p class="text-gray-700 mt-1">Committed to providing information to the public through media, consistent with legal and ethical obligations.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-orange-700">Protected Information:</strong>
                                            <p class="text-gray-700 mt-1">Protecting classified information, individual privacy, and investigation integrity.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-orange-700">Democratic Society:</strong>
                                            <p class="text-gray-700 mt-1">Recognizing the vital role of a free and informed press in a democratic society.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Accuracy & Fairness -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-orange-100">
                                <h3 class="text-xl font-bold text-orange-800 mb-4 flex items-center">
                                    <span class="mr-2">⚖️</span> Accuracy & Fairness Standards
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-orange-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-orange-700 mb-2">Required Standards:</h4>
                                        <ul class="space-y-2 text-gray-700">
                                            <li class="flex items-center">
                                                <span class="text-orange-500 mr-2">•</span>
                                                All information must be accurate and factual
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-orange-500 mr-2">•</span>
                                                Information presented fairly and without bias
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-orange-500 mr-2">•</span>
                                                Speculation strictly prohibited
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-orange-500 mr-2">•</span>
                                                Personal opinions not permitted
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Protection Principles -->
                        <div class="mt-8 grid lg:grid-cols-3 gap-6">
                            <div class="bg-amber-100 border border-amber-300 rounded-xl p-6">
                                <h3 class="text-lg font-bold text-amber-800 mb-3 flex items-center">
                                    <span class="mr-2">🛡️</span> Fair Trial Rights
                                </h3>
                                <p class="text-gray-700 text-sm">No information shall be released that could prejudice an individual's right to a fair trial or impartial adjudication, especially in pending criminal matters.</p>
                            </div>
                            <div class="bg-blue-100 border border-blue-300 rounded-xl p-6">
                                <h3 class="text-lg font-bold text-blue-800 mb-3 flex items-center">
                                    <span class="mr-2">🔒</span> Privacy Protection
                                </h3>
                                <p class="text-gray-700 text-sm">Information about individuals, particularly victims, witnesses, or juveniles, must be handled with utmost sensitivity and in strict compliance with privacy laws.</p>
                            </div>
                            <div class="bg-green-100 border border-green-300 rounded-xl p-6">
                                <h3 class="text-lg font-bold text-green-800 mb-3 flex items-center">
                                    <span class="mr-2">🔐</span> Investigation Confidentiality
                                </h3>
                                <p class="text-gray-700 text-sm">Information about ongoing investigations carefully managed to prevent jeopardizing investigations or endangering personnel and witnesses.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contacts & Authorization Section -->
                <div id="contacts-authorization-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-blue-900 mb-2">Designated Points of Contact & Authorization</h2>
                                <p class="text-lg text-blue-700">Official spokespersons and authorization protocols for media communications</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Official Spokespersons -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                                <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                    <span class="mr-2">🎤</span> Official Spokespersons
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-blue-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-blue-700 mb-2">Public Information Officer (PIO)</h4>
                                        <p class="text-gray-700 text-sm">The Los Santos DOJ designates a primary Public Information Officer or Office of Public Affairs (OPA) to serve as the central point of contact for all media inquiries.</p>
                                    </div>
                                    <div class="bg-indigo-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-indigo-700 mb-2">Component-Specific PIOs</h4>
                                        <p class="text-gray-700 text-sm">Each major component or division within the Los Santos DOJ (e.g., District Attorney's Office, Sheriff's Department's Major Crimes Unit liaison) may designate a media contact who coordinates closely with the central DOJ PIO.</p>
                                    </div>
                                    <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                                        <h4 class="font-semibold text-red-700 mb-2">Authorization Required</h4>
                                        <p class="text-gray-700 text-sm">Only authorized personnel are permitted to speak on behalf of the Los Santos Department of Justice regarding official matters.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Authorization Protocols -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                                <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                    <span class="mr-2">✅</span> Authorization for Release
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-blue-700">Advance Approval Required:</strong>
                                            <p class="text-gray-700 mt-1">Any communication with media relating to pending investigations or cases must be approved in advance by the appropriate Division Head, District Attorney, or their designated PIO.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-blue-700">Emergency Circumstances:</strong>
                                            <p class="text-gray-700 mt-1">Where immediate response is required, information release may occur before full approval, but notification to the appropriate authority must be made as soon as practicable.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-blue-700">Public Record Information:</strong>
                                            <p class="text-gray-700 mt-1">Only information contained in the public record (indictments, public pleadings, court transcripts) should generally be shared regarding pending cases after formal charges but before conviction.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Information Guidelines Section -->
                <div id="information-guidelines-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-green-900 mb-2">Information Release Guidelines</h2>
                                <p class="text-lg text-green-700">What information may and may not be released to media</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Information That May Be Released -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-green-100">
                                <h3 class="text-xl font-bold text-green-800 mb-4 flex items-center">
                                    <span class="mr-2">✅</span> Information That May Be Released
                                </h3>
                                <div class="space-y-4">
                                    <p class="text-gray-700 text-sm italic mb-4">When authorized, the following types of information may generally be released:</p>
                                    <div class="space-y-3">
                                        <div class="flex items-start">
                                            <span class="text-green-500 mr-2 mt-1">•</span>
                                            <div>
                                                <strong class="text-green-700">Arrest Information:</strong>
                                                <p class="text-gray-700 text-sm">Name and identifying information of arrested persons, provided charges have been formally filed</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start">
                                            <span class="text-green-500 mr-2 mt-1">•</span>
                                            <div>
                                                <strong class="text-green-700">Charges Filed:</strong>
                                                <p class="text-gray-700 text-sm">The specific charge(s) filed against an individual</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start">
                                            <span class="text-green-500 mr-2 mt-1">•</span>
                                            <div>
                                                <strong class="text-green-700">Investigation Details:</strong>
                                                <p class="text-gray-700 text-sm">Identity of the investigating agency and time/place of arrest</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start">
                                            <span class="text-green-500 mr-2 mt-1">•</span>
                                            <div>
                                                <strong class="text-green-700">Court Information:</strong>
                                                <p class="text-gray-700 text-sm">Amount of bail (if set) and scheduling of court proceedings (public record)</p>
                                            </div>
                                        </div>
                                        <div class="flex items-start">
                                            <span class="text-green-500 mr-2 mt-1">•</span>
                                            <div>
                                                <strong class="text-green-700">General Description:</strong>
                                                <p class="text-gray-700 text-sm">General description of the offense charged, without compromising investigation or defendant rights</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Information NOT Released -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-red-100">
                                <h3 class="text-xl font-bold text-red-800 mb-4 flex items-center">
                                    <span class="mr-2">🚫</span> Information Generally NOT Released
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                                        <h4 class="font-semibold text-red-700 mb-2">Protected Information:</h4>
                                        <ul class="space-y-2 text-gray-700 text-sm">
                                            <li class="flex items-start">
                                                <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Information violating federal/state laws (HIPAA, FERPA)
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Sensitive personal information (SSNs, financial details)
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Identity of juvenile offenders, certain crime victims
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Identity of confidential informants
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                        <h4 class="font-semibold text-orange-700 mb-2">Investigation Details:</h4>
                                        <ul class="space-y-2 text-gray-700 text-sm">
                                            <li class="flex items-start">
                                                <span class="text-orange-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Details compromising investigative techniques
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-orange-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Identity of uncharged suspects
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-orange-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Information endangering witnesses or law enforcement
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-orange-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Grand jury proceedings information
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                        <h4 class="font-semibold text-purple-700 mb-2">Legal Protections:</h4>
                                        <ul class="space-y-2 text-gray-700 text-sm">
                                            <li class="flex items-start">
                                                <span class="text-purple-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Attorney-client privilege information
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-purple-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Information violating court orders or gag orders
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-purple-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Statements about defendant character or criminal history
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-purple-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Information that could identify or locate fugitives
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Media Protocols Section -->
                <div id="media-protocols-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-purple-900 mb-2">Media Inquiries & Interview Protocols</h2>
                                <p class="text-lg text-purple-700">Professional procedures for media interactions and communications</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Inquiry Procedures -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-purple-100">
                                <h3 class="text-xl font-bold text-purple-800 mb-4 flex items-center">
                                    <span class="mr-2">📞</span> Inquiry Routing & Procedures
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-purple-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-purple-700 mb-2">Routing Inquiries</h4>
                                        <p class="text-gray-700 text-sm">All media inquiries should be directed to the designated DOJ PIO or their component-specific counterpart.</p>
                                    </div>
                                    <div class="bg-indigo-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-indigo-700 mb-2">On the Record / Off the Record</h4>
                                        <p class="text-gray-700 text-sm">All communications with media representatives should be presumed "on the record" unless explicitly agreed otherwise by the authorized DOJ official and the journalist in advance. "Off the record" communications are discouraged and require clear mutual understanding.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Communication Standards -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-purple-100">
                                <h3 class="text-xl font-bold text-purple-800 mb-4 flex items-center">
                                    <span class="mr-2">🎯</span> Communication Standards
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-purple-700">Press Conferences:</strong>
                                            <p class="text-gray-700 mt-1 text-sm">Reserved for significant, newsworthy actions or where an important law enforcement purpose would be served. Coordination with affected components is required.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-purple-700">Prepared Statements:</strong>
                                            <p class="text-gray-700 mt-1 text-sm">For complex or sensitive matters, prepared statements are preferred to ensure accuracy and consistency.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-purple-700">Verdict/Sentence Commentary:</strong>
                                            <p class="text-gray-700 mt-1 text-sm">DOJ personnel should generally refrain from commenting on specific facts of verdicts or sentences beyond what is stated in the public record.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Social Media & Violations Section -->
                <div id="social-media-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-red-900 mb-2">Social Media Guidelines & Policy Violations</h2>
                                <p class="text-lg text-red-700">Digital communications standards and enforcement policies</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Social Media Guidelines -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-red-100">
                                <h3 class="text-xl font-bold text-red-800 mb-4 flex items-center">
                                    <span class="mr-2">📱</span> Social Media Guidelines
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <h4 class="font-semibold text-blue-700 mb-2">Official Channels</h4>
                                        <p class="text-gray-700 text-sm">Official DOJ social media accounts are managed by the PIO's office or authorized personnel only.</p>
                                    </div>
                                    <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
                                        <h4 class="font-semibold text-amber-700 mb-2">Personal Accounts</h4>
                                        <p class="text-gray-700 text-sm">DOJ personnel should exercise extreme caution when discussing any DOJ-related matters on personal social media accounts.</p>
                                    </div>
                                    <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                                        <h4 class="font-semibold text-red-700 mb-2">Prohibited Content</h4>
                                        <ul class="space-y-1 text-gray-700 text-sm">
                                            <li class="flex items-start">
                                                <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Comments compromising investigations
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Privacy violations
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                                Information prejudicing cases
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p class="text-gray-700 text-sm"><strong>Important:</strong> The same rules for public statements apply to personal social media accounts.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Policy Violations -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-red-100">
                                <h3 class="text-xl font-bold text-red-800 mb-4 flex items-center">
                                    <span class="mr-2">⚠️</span> Violations of Policy
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-red-100 p-4 rounded-lg border border-red-300">
                                        <h4 class="font-semibold text-red-800 mb-2">Unauthorized Disclosure</h4>
                                        <p class="text-gray-700 text-sm">Any unauthorized disclosure of information or violation of this Media Relations Policy by DOJ personnel may result in disciplinary action.</p>
                                    </div>
                                    <div class="bg-orange-100 p-4 rounded-lg border border-orange-300">
                                        <h4 class="font-semibold text-orange-800 mb-2">Potential Consequences</h4>
                                        <ul class="space-y-2 text-gray-700 text-sm">
                                            <li class="flex items-start">
                                                <span class="text-orange-500 mr-2 mt-1">•</span>
                                                <strong>Administrative Action:</strong> Disciplinary measures up to and including termination
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-orange-500 mr-2 mt-1">•</span>
                                                <strong>Criminal Prosecution:</strong> Potential criminal prosecution for serious violations
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-orange-500 mr-2 mt-1">•</span>
                                                <strong>Professional Impact:</strong> Impact on career advancement and professional standing
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Commitment Statement -->
                        <div class="mt-8 bg-gradient-to-r from-orange-600 to-red-700 text-white p-6 rounded-lg shadow-xl">
                            <h3 class="text-xl font-bold mb-3 flex items-center">
                                <span class="mr-2">🤝</span> Department Commitment
                            </h3>
                            <p class="mb-4 opacity-90 leading-relaxed">
                                The Los Santos Department of Justice is dedicated to serving the public and the media responsibly and effectively. 
                                By adhering to these protocols, we ensure that justice is administered fairly and transparently while protecting 
                                the rights of all individuals involved in the legal process.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Transparency</span>
                                <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Accountability</span>
                                <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Fair Justice</span>
                                <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Public Service</span>                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

      {
        id: 'rule8',
        title: 'Case Management',
        fullTitle: 'Case Management Protocols',
        description: 'Comprehensive protocols for systematic oversight and progression of legal matters from initial investigation through final resolution.',
        category: 'legal',
        icon: '📋',
        color: 'bg-teal-500',
        content: `
            <style>
                .tab-btn {
                    background-color: #f3f4f6;
                    color: #6b7280;
                }
                .tab-btn.active {
                    background-color: #0d9488;
                    color: white;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .tab-btn:hover {
                    background-color: #e5e7eb;
                }
                .tab-btn.active:hover {
                    background-color: #0f766e;
                }
                .content-section.hidden {
                    display: none;
                }
            </style>
            <div class="max-w-7xl mx-auto">
                <!-- Hero Section -->
                <div class="relative bg-gradient-to-br from-teal-600 to-cyan-700 text-white p-8 rounded-lg shadow-xl mb-8">
                    <div class="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
                    <div class="relative z-10 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                            <span class="text-3xl">📋</span>
                        </div>
                        <h1 class="text-3xl font-bold mb-2">Case Management Protocols</h1>
                        <p class="text-xl opacity-90">Systematic Oversight & Progression of Legal Matters</p>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="mb-8">
                    <div class="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl">
                        <button onclick="showSection('core-objectives')" class="tab-btn active px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="core-objectives">
                            Core Objectives
                        </button>
                        <button onclick="showSection('case-stages')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="case-stages">
                            Case Stages
                        </button>
                        <button onclick="showSection('management-tools')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="management-tools">
                            Management Tools
                        </button>
                        <button onclick="showSection('roles-responsibilities')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="roles-responsibilities">
                            Roles & Responsibilities
                        </button>
                    </div>
                </div>

                <!-- Core Objectives Section -->
                <div id="core-objectives-section" class="content-section">
                    <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-teal-900 mb-2">Core Objectives of Case Management</h2>
                                <p class="text-lg text-teal-700">Essential principles guiding systematic legal matter oversight</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Primary Objectives -->
                            <div class="space-y-6">
                                <div class="bg-white rounded-xl p-6 shadow-md border border-teal-100">
                                    <div class="flex items-start mb-4">
                                        <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                                            <span class="text-lg">⚡</span>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-bold text-teal-800 mb-2">Efficiency</h3>
                                            <p class="text-gray-700 text-sm">Move cases through the legal system as expeditiously as possible, avoiding unnecessary delays and streamlining processes.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-white rounded-xl p-6 shadow-md border border-teal-100">
                                    <div class="flex items-start mb-4">
                                        <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                                            <span class="text-lg">📊</span>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-bold text-teal-800 mb-2">Accountability</h3>
                                            <p class="text-gray-700 text-sm">Maintain clear records of all actions taken, decisions made, and individuals responsible for each stage of a case.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-white rounded-xl p-6 shadow-md border border-teal-100">
                                    <div class="flex items-start mb-4">
                                        <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                                            <span class="text-lg">🎯</span>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-bold text-teal-800 mb-2">Resource Optimization</h3>
                                            <p class="text-gray-700 text-sm">Effectively allocate personnel, time, and financial resources to manage caseloads efficiently and maximize impact.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Secondary Objectives -->
                            <div class="space-y-6">
                                <div class="bg-white rounded-xl p-6 shadow-md border border-teal-100">
                                    <div class="flex items-start mb-4">
                                        <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                                            <span class="text-lg">⚖️</span>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-bold text-teal-800 mb-2">Consistency</h3>
                                            <p class="text-gray-700 text-sm">Ensure that similar cases are handled with consistent procedures and legal standards across all divisions.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-white rounded-xl p-6 shadow-md border border-teal-100">
                                    <div class="flex items-start mb-4">
                                        <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                                            <span class="text-lg">🛡️</span>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-bold text-teal-800 mb-2">Integrity</h3>
                                            <p class="text-gray-700 text-sm">Safeguard the integrity of evidence, information, and legal processes throughout the lifecycle of a case.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-white rounded-xl p-6 shadow-md border border-teal-100">
                                    <div class="flex items-start mb-4">
                                        <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                                            <span class="text-lg">👁️</span>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-bold text-teal-800 mb-2">Internal Transparency</h3>
                                            <p class="text-gray-700 text-sm">Provide relevant personnel with timely access to case status and details as needed for their roles.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Case Stages Section -->
                <div id="case-stages-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-blue-900 mb-2">Stages of Case Management</h2>
                                <p class="text-lg text-blue-700">Comprehensive workflow from initial intake through final resolution</p>
                            </div>
                        </div>

                        <div class="space-y-8">
                            <!-- Stage 1: Intake and Assignment -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                                <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                    <span class="mr-2">1️⃣</span> Intake and Assignment
                                </h3>
                                <div class="grid md:grid-cols-3 gap-4">
                                    <div class="bg-blue-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-blue-700 mb-2">Referral/Initiation</h4>
                                        <p class="text-gray-700 text-sm">Cases initiated through law enforcement referrals, citizen complaints, or internal investigations.</p>
                                    </div>
                                    <div class="bg-indigo-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-indigo-700 mb-2">Initial Review</h4>
                                        <p class="text-gray-700 text-sm">Assessment to determine jurisdiction, severity, and necessary resources for proper handling.</p>
                                    </div>
                                    <div class="bg-purple-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-purple-700 mb-2">Case Assignment</h4>
                                        <p class="text-gray-700 text-sm">Assignment based on complexity, specialization, and current caseload distribution.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Stage 2: Investigation Oversight -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                                <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                    <span class="mr-2">2️⃣</span> Investigation Oversight (Criminal Cases)
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-blue-700">Law Enforcement Collaboration:</strong>
                                            <p class="text-gray-700 mt-1 text-sm">DOJ prosecutors and investigators work closely with LSPD and Sheriff's Department from investigation inception.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-blue-700">Evidence Collection Guidance:</strong>
                                            <p class="text-gray-700 mt-1 text-sm">Legal guidance on proper evidence collection, warrant applications, and investigative techniques.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-blue-700">Charging Decisions:</strong>
                                            <p class="text-gray-700 mt-1 text-sm">Review of investigative findings to determine appropriate charges under Los Santos Penal Code.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Stage 3: Pre-Trial Management -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                                <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                    <span class="mr-2">3️⃣</span> Pleading and Pre-Trial Management
                                </h3>
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div class="space-y-3">
                                        <div class="bg-green-50 p-3 rounded-lg border border-green-200">
                                            <h4 class="font-semibold text-green-700 mb-1">Document Preparation</h4>
                                            <p class="text-gray-700 text-sm">Drafting and filing complaints, indictments, motions, and discovery responses.</p>
                                        </div>
                                        <div class="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                            <h4 class="font-semibold text-yellow-700 mb-1">Discovery Management</h4>
                                            <p class="text-gray-700 text-sm">Systematic exchange of information and evidence between parties with timeline compliance.</p>
                                        </div>
                                    </div>
                                    <div class="space-y-3">
                                        <div class="bg-orange-50 p-3 rounded-lg border border-orange-200">
                                            <h4 class="font-semibold text-orange-700 mb-1">Motion Practice</h4>
                                            <p class="text-gray-700 text-sm">Strategic planning and execution of pre-trial motions to address legal issues.</p>
                                        </div>
                                        <div class="bg-red-50 p-3 rounded-lg border border-red-200">
                                            <h4 class="font-semibold text-red-700 mb-1">Plea Negotiations</h4>
                                            <p class="text-gray-700 text-sm">Managing plea discussions ensuring alignment with departmental policies.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Stage 4: Trial Preparation -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                                <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                    <span class="mr-2">4️⃣</span> Trial Preparation and Conduct
                                </h3>
                                <div class="grid md:grid-cols-4 gap-4">
                                    <div class="bg-teal-50 p-4 rounded-lg text-center">
                                        <div class="text-2xl mb-2">🎯</div>
                                        <h4 class="font-semibold text-teal-700 mb-2">Trial Strategy</h4>
                                        <p class="text-gray-700 text-xs">Comprehensive strategy development including witness preparation and argument construction.</p>
                                    </div>
                                    <div class="bg-cyan-50 p-4 rounded-lg text-center">
                                        <div class="text-2xl mb-2">👥</div>
                                        <h4 class="font-semibold text-cyan-700 mb-2">Witness Coordination</h4>
                                        <p class="text-gray-700 text-xs">Scheduling, preparation, and management of all necessary witness appearances.</p>
                                    </div>
                                    <div class="bg-sky-50 p-4 rounded-lg text-center">
                                        <div class="text-2xl mb-2">📁</div>
                                        <h4 class="font-semibold text-sky-700 mb-2">Exhibit Management</h4>
                                        <p class="text-gray-700 text-xs">Organization and preparation of all physical and digital evidence for court presentation.</p>
                                    </div>
                                    <div class="bg-blue-50 p-4 rounded-lg text-center">
                                        <div class="text-2xl mb-2">⚖️</div>
                                        <h4 class="font-semibold text-blue-700 mb-2">Court Logistics</h4>
                                        <p class="text-gray-700 text-xs">Managing all logistical aspects to ensure efficient trial proceedings.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Stage 5: Post-Conviction -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                                <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                    <span class="mr-2">5️⃣</span> Post-Conviction/Post-Judgment Management
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-purple-700">Sentencing Phase:</strong>
                                            <p class="text-gray-700 mt-1 text-sm">Managing presentation of arguments and evidence during sentencing hearings.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-purple-700">Appeals Process:</strong>
                                            <p class="text-gray-700 mt-1 text-sm">Oversight of appellate processes including brief filing and oral argument preparation.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-purple-700">Compliance Monitoring:</strong>
                                            <p class="text-gray-700 mt-1 text-sm">Coordination with probation departments and victim services for restitution and probation compliance.</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <div>
                                            <strong class="text-purple-700">Judgment Enforcement:</strong>
                                            <p class="text-gray-700 mt-1 text-sm">For civil cases, managing the process of enforcing court judgments and orders.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Management Tools Section -->
                <div id="management-tools-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-purple-900 mb-2">Case Management Tools & Systems</h2>
                                <p class="text-lg text-purple-700">Technology and systems supporting efficient case oversight</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Digital Case Management System -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-purple-100">
                                <h3 class="text-xl font-bold text-purple-800 mb-4 flex items-center">
                                    <span class="mr-2">💻</span> Digital Case Management System (CMS)
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-purple-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-purple-700 mb-2">Core Features:</h4>
                                        <ul class="space-y-2 text-gray-700 text-sm">
                                            <li class="flex items-center">
                                                <span class="text-purple-500 mr-2">•</span>
                                                Centralized electronic tracking of all case details
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-purple-500 mr-2">•</span>
                                                Secure digital archive for case documents
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-purple-500 mr-2">•</span>
                                                Integrated evidence tracking with chain of custody
                                            </li>
                                            <li class="flex items-center">
                                                <span class="text-purple-500 mr-2">•</span>
                                                Real-time collaboration and communication tools
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="bg-indigo-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-indigo-700 mb-2">System Components:</h4>
                                        <div class="grid grid-cols-2 gap-3 text-sm">
                                            <div class="flex items-center">
                                                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                                Chronological Logging
                                            </div>
                                            <div class="flex items-center">
                                                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                                Document Repository
                                            </div>
                                            <div class="flex items-center">
                                                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                                Calendar & Reminders
                                            </div>
                                            <div class="flex items-center">
                                                <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                                Reporting Capabilities
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Performance Metrics -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-purple-100">
                                <h3 class="text-xl font-bold text-purple-800 mb-4 flex items-center">
                                    <span class="mr-2">📊</span> Performance Metrics & Analytics
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-pink-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-pink-700 mb-2">Key Performance Indicators:</h4>
                                        <ul class="space-y-2 text-gray-700 text-sm">
                                            <li class="flex items-start">
                                                <span class="text-pink-500 mr-2 mt-1">•</span>
                                                <div>
                                                    <strong>Case Processing Time:</strong> Average time from initiation to resolution
                                                </div>
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-pink-500 mr-2 mt-1">•</span>
                                                <div>
                                                    <strong>Caseload Distribution:</strong> Balanced assignment across personnel
                                                </div>
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-pink-500 mr-2 mt-1">•</span>
                                                <div>
                                                    <strong>Disposition Rates:</strong> Success rates by case type and complexity
                                                </div>
                                            </li>
                                            <li class="flex items-start">
                                                <span class="text-pink-500 mr-2 mt-1">•</span>
                                                <div>
                                                    <strong>Resource Utilization:</strong> Efficiency of personnel and budget allocation
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="bg-rose-50 p-4 rounded-lg">
                                        <h4 class="font-semibold text-rose-700 mb-2">Regular Review Process:</h4>
                                        <p class="text-gray-700 text-sm">The DOJ regularly reviews case management metrics to identify areas for improvement and ensure optimal performance across all divisions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Evidence Tracking System -->
                        <div class="mt-8 bg-white rounded-xl p-6 shadow-md border border-purple-100">
                            <h3 class="text-xl font-bold text-purple-800 mb-4 flex items-center">
                                <span class="mr-2">🔒</span> Evidence Tracking & Chain of Custody
                            </h3>
                            <div class="grid md:grid-cols-3 gap-6">
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h4 class="font-semibold text-gray-700 mb-2">Digital Evidence</h4>
                                    <p class="text-gray-600 text-sm">Secure storage and access control for digital files, with automated integrity verification and backup systems.</p>
                                </div>
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h4 class="font-semibold text-gray-700 mb-2">Physical Evidence</h4>
                                    <p class="text-gray-600 text-sm">Comprehensive tracking of physical evidence location, handling, and transfer with complete audit trails.</p>
                                </div>
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h4 class="font-semibold text-gray-700 mb-2">Chain of Custody</h4>
                                    <p class="text-gray-600 text-sm">Automated logging of all evidence interactions to maintain legal admissibility and procedural integrity.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Roles & Responsibilities Section -->
                <div id="roles-responsibilities-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-green-900 mb-2">Roles in Case Management</h2>
                                <p class="text-lg text-green-700">Defined responsibilities for efficient case progression</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Legal Personnel -->
                            <div class="space-y-6">
                                <div class="bg-white rounded-xl p-6 shadow-md border border-green-100">
                                    <div class="flex items-start mb-4">
                                        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                                            <span class="text-xl">⚖️</span>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-bold text-green-800 mb-2">Prosecutors/Attorneys</h3>
                                            <p class="text-gray-700 text-sm mb-3">Primary legal responsibility for case strategy and outcomes</p>
                                            <div class="space-y-2">
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Direct legal strategy development and decision-making
                                                </div>
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Court appearances and legal representation
                                                </div>
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Final case decisions and plea negotiations
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-white rounded-xl p-6 shadow-md border border-green-100">
                                    <div class="flex items-start mb-4">
                                        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                                            <span class="text-xl">🔍</span>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-bold text-green-800 mb-2">Investigators</h3>
                                            <p class="text-gray-700 text-sm mb-3">Evidence gathering and case development support</p>
                                            <div class="space-y-2">
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Follow-up investigations as directed by prosecutors
                                                </div>
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Additional evidence gathering and witness interviews
                                                </div>
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Coordination with law enforcement agencies
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-white rounded-xl p-6 shadow-md border border-green-100">
                                    <div class="flex items-start mb-4">
                                        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                                            <span class="text-xl">📋</span>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-bold text-green-800 mb-2">Paralegals/Legal Assistants</h3>
                                            <p class="text-gray-700 text-sm mb-3">Essential support for case organization and documentation</p>
                                            <div class="space-y-2">
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Document organization and discovery management
                                                </div>
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Exhibit preparation and case file maintenance
                                                </div>
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Administrative support and coordination
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Administrative Personnel -->
                            <div class="space-y-6">
                                <div class="bg-white rounded-xl p-6 shadow-md border border-green-100">
                                    <div class="flex items-start mb-4">
                                        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                                            <span class="text-xl">🏢</span>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-bold text-green-800 mb-2">Administrative Staff</h3>
                                            <p class="text-gray-700 text-sm mb-3">Operational support for smooth case processing</p>
                                            <div class="space-y-2">
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Filing and scheduling coordination
                                                </div>
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    General logistical support services
                                                </div>
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Communication and correspondence management
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-white rounded-xl p-6 shadow-md border border-green-100">
                                    <div class="flex items-start mb-4">
                                        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                                            <span class="text-xl">👨‍💼</span>
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-bold text-green-800 mb-2">Case Supervisors</h3>
                                            <p class="text-gray-700 text-sm mb-3">Oversight and guidance for case management teams</p>
                                            <div class="space-y-2">
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Team supervision and guidance provision
                                                </div>
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Policy compliance and quality assurance
                                                </div>
                                                <div class="flex items-center text-sm">
                                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Caseload distribution and resource management
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Collaboration Framework -->
                                <div class="bg-gradient-to-br from-emerald-100 to-green-100 p-6 rounded-xl border border-emerald-200">
                                    <h3 class="text-lg font-bold text-emerald-800 mb-3 flex items-center">
                                        <span class="mr-2">🤝</span> Collaborative Framework
                                    </h3>
                                    <p class="text-gray-700 text-sm mb-4">Effective case management relies on seamless collaboration between all team members, with clear communication channels and defined accountability structures.</p>
                                    <div class="grid grid-cols-2 gap-3 text-sm">
                                        <div class="flex items-center">
                                            <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                                            Regular team meetings
                                        </div>
                                        <div class="flex items-center">
                                            <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                                            Shared documentation systems
                                        </div>
                                        <div class="flex items-center">
                                            <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                                            Cross-training programs
                                        </div>
                                        <div class="flex items-center">
                                            <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                                            Performance feedback loops
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary Section -->
                <div class="mt-12 bg-gradient-to-r from-teal-50 to-cyan-100 rounded-2xl p-8 border border-teal-200">
                    <div class="text-center">
                        <h3 class="text-2xl font-bold text-teal-900 mb-4">Case Management Excellence</h3>
                        <p class="text-lg text-gray-700 max-w-4xl mx-auto mb-6">
                            Through robust case management practices, the Los Santos Department of Justice strives to handle each legal matter with precision, efficiency, and unwavering commitment to justice. Our systematic approach ensures accountability, optimizes resources, and maintains the highest standards of legal practice.
                        </p>
                        <div class="flex flex-wrap justify-center gap-3">
                            <span class="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium">Systematic Oversight</span>
                            <span class="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium">Resource Optimization</span>
                            <span class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">Quality Assurance</span>
                            <span class="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">Accountability Standards</span>
                        </div>
                    </div>
                </div>
            </div>
        `    },

    {
        id: 'rule9',
        title: 'Ethics & Conduct',
        fullTitle: 'Ethics & Conduct Standards',
        description: 'Comprehensive ethical guidelines and professional conduct standards for all Department of Justice personnel and stakeholders.',
        category: 'ethics',
        icon: '🎯',
        color: 'bg-pink-500',
        content: `
            <style>
                .tab-btn {
                    background-color: #f3f4f6;
                    color: #6b7280;
                }
                .tab-btn.active {
                    background-color: #ec4899;
                    color: white;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .tab-btn:hover {
                    background-color: #e5e7eb;
                }
                .tab-btn.active:hover {
                    background-color: #db2777;
                }
                .content-section.hidden {
                    display: none;
                }
            </style>
            <div class="max-w-7xl mx-auto">
                <!-- Hero Section -->
                <div class="relative bg-gradient-to-br from-pink-600 to-rose-700 text-white p-8 rounded-lg shadow-xl mb-8">
                    <div class="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
                    <div class="relative z-10 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                            <span class="text-3xl">🎯</span>
                        </div>
                        <h1 class="text-3xl font-bold mb-2">Ethics & Conduct Standards</h1>
                        <p class="text-xl opacity-90">Professional Integrity and Ethical Guidelines for Justice Personnel</p>
                    </div>
                </div>

                <!-- Tab Navigation -->
                <div class="mb-8">
                    <div class="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl">
                        <button onclick="showSection('core-principles')" class="tab-btn active px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="core-principles">
                            Core Principles
                        </button>
                        <button onclick="showSection('professional-standards')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="professional-standards">
                            Professional Standards
                        </button>
                        <button onclick="showSection('conflict-resolution')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="conflict-resolution">
                            Conflict Resolution
                        </button>
                        <button onclick="showSection('accountability')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="accountability">
                            Accountability & Enforcement
                        </button>
                    </div>
                </div>

                <!-- Core Principles Section -->
                <div id="core-principles-section" class="content-section">
                    <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-pink-900 mb-2">Fundamental Ethical Principles</h2>
                                <p class="text-lg text-pink-700">Foundation stones of integrity and professional excellence</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Justice & Fairness -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-pink-100">
                                <div class="flex items-center mb-4">
                                    <div class="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                                        <span class="text-lg">⚖️</span>
                                    </div>
                                    <h3 class="text-xl font-bold text-pink-800">Justice & Fairness</h3>
                                </div>
                                <div class="space-y-3 text-gray-700 text-sm">
                                    <div><strong>Equal Treatment:</strong> Every individual deserves fair and impartial treatment regardless of race, gender, religion, economic status, or political affiliation.</div>
                                    <div><strong>Due Process:</strong> Commitment to upholding constitutional rights and procedural safeguards in all legal proceedings.</div>
                                    <div><strong>Unbiased Decision-Making:</strong> Decisions must be based solely on facts, evidence, and applicable law without personal bias or external influence.</div>
                                    <div><strong>Access to Justice:</strong> Ensuring legal processes are accessible and comprehensible to all citizens.</div>
                                </div>
                            </div>

                            <!-- Integrity & Honesty -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-pink-100">
                                <div class="flex items-center mb-4">
                                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                        <span class="text-lg">🛡️</span>
                                    </div>
                                    <h3 class="text-xl font-bold text-blue-800">Integrity & Honesty</h3>
                                </div>
                                <div class="space-y-3 text-gray-700 text-sm">
                                    <div><strong>Truthfulness:</strong> Commitment to honesty in all professional communications and representations.</div>
                                    <div><strong>Transparency:</strong> Operating with openness while respecting confidentiality requirements and legal restrictions.</div>
                                    <div><strong>Moral Courage:</strong> Standing up for what is right even when facing pressure or personal cost.</div>
                                    <div><strong>Personal Accountability:</strong> Taking responsibility for decisions, actions, and their consequences.</div>
                                </div>
                            </div>

                            <!-- Professional Excellence -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-pink-100">
                                <div class="flex items-center mb-4">
                                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                        <span class="text-lg">🎓</span>
                                    </div>
                                    <h3 class="text-xl font-bold text-green-800">Professional Excellence</h3>
                                </div>
                                <div class="space-y-3 text-gray-700 text-sm">
                                    <div><strong>Competence:</strong> Maintaining and continuously improving professional knowledge, skills, and abilities.</div>
                                    <div><strong>Diligence:</strong> Performing duties with care, thoroughness, and attention to detail.</div>
                                    <div><strong>Continuous Learning:</strong> Staying current with legal developments, best practices, and technological advances.</div>
                                    <div><strong>Quality Service:</strong> Delivering consistently high-quality work product and public service.</div>
                                </div>
                            </div>

                            <!-- Public Service Commitment -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-pink-100">
                                <div class="flex items-center mb-4">
                                    <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                        <span class="text-lg">🤝</span>
                                    </div>
                                    <h3 class="text-xl font-bold text-purple-800">Public Service Commitment</h3>
                                </div>
                                <div class="space-y-3 text-gray-700 text-sm">
                                    <div><strong>Service Above Self:</strong> Placing public interest above personal gain or convenience.</div>
                                    <div><strong>Resource Stewardship:</strong> Responsible use of public resources and taxpayer funds.</div>
                                    <div><strong>Community Trust:</strong> Building and maintaining public confidence in the justice system.</div>
                                    <div><strong>Civic Responsibility:</strong> Contributing positively to the community and democratic institutions.</div>
                                </div>
                            </div>
                        </div>

                        <!-- Core Values Statement -->
                        <div class="mt-8 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl p-6 border border-pink-300">
                            <h3 class="text-lg font-bold text-pink-800 mb-3 flex items-center">
                                <span class="mr-2">🌟</span> Our Ethical Foundation
                            </h3>
                            <p class="text-gray-700 text-sm leading-relaxed">These principles form the foundation of all our work in the Department of Justice. They guide our daily decisions, inform our policies, and define our commitment to serving the people of Los Santos with honor, dignity, and unwavering ethical standards.</p>
                        </div>
                    </div>
                </div>

                <!-- Professional Standards Section -->
                <div id="professional-standards-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-blue-900 mb-2">Professional Standards & Conduct</h2>
                                <p class="text-lg text-blue-700">Specific behavioral expectations and professional requirements</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-3 gap-6">
                            <!-- Communication Standards -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                                <h3 class="text-lg font-bold text-blue-800 mb-4 flex items-center">
                                    <span class="mr-2">💬</span> Communication Standards
                                </h3>
                                <div class="space-y-3 text-gray-700 text-sm">
                                    <div class="flex items-start">
                                        <span class="text-blue-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span><strong>Professional Language:</strong> Use respectful, clear, and appropriate language in all communications</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-blue-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span><strong>Confidentiality:</strong> Protect sensitive information and respect privacy requirements</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-blue-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span><strong>Accuracy:</strong> Ensure all communications are factual and properly verified</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-blue-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span><strong>Timeliness:</strong> Respond promptly to legitimate requests and inquiries</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Appearance & Demeanor -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                                <h3 class="text-lg font-bold text-green-800 mb-4 flex items-center">
                                    <span class="mr-2">👔</span> Appearance & Demeanor
                                </h3>
                                <div class="space-y-3 text-gray-700 text-sm">
                                    <div class="flex items-start">
                                        <span class="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span><strong>Professional Attire:</strong> Dress appropriately for court and office environments</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span><strong>Respectful Conduct:</strong> Maintain dignity and respect in all interactions</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span><strong>Emotional Control:</strong> Manage emotions professionally, especially under pressure</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span><strong>Cultural Sensitivity:</strong> Show respect for diverse backgrounds and perspectives</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Work Performance -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-blue-100">
                                <h3 class="text-lg font-bold text-purple-800 mb-4 flex items-center">
                                    <span class="mr-2">📊</span> Work Performance
                                </h3>
                                <div class="space-y-3 text-gray-700 text-sm">
                                    <div class="flex items-start">
                                        <span class="text-purple-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span><strong>Quality Standards:</strong> Meet or exceed established performance benchmarks</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-purple-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span><strong>Deadline Compliance:</strong> Complete tasks within required timeframes</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-purple-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span><strong>Collaboration:</strong> Work effectively with colleagues and external partners</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-purple-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span><strong>Initiative:</strong> Take proactive steps to improve processes and outcomes</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Prohibited Behaviors -->
                        <div class="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
                            <h3 class="text-xl font-bold text-red-800 mb-4 flex items-center">
                                <span class="mr-2">🚫</span> Prohibited Behaviors
                            </h3>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="space-y-3">
                                    <div class="flex items-start">
                                        <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span class="text-gray-700 text-sm"><strong>Discrimination or Harassment:</strong> Any form of discriminatory behavior or harassment based on protected characteristics</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span class="text-gray-700 text-sm"><strong>Conflicts of Interest:</strong> Engaging in activities that compromise professional judgment or create ethical conflicts</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span class="text-gray-700 text-sm"><strong>Inappropriate Gifts:</strong> Accepting gifts or benefits that could influence official duties</span>
                                    </div>
                                </div>
                                <div class="space-y-3">
                                    <div class="flex items-start">
                                        <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span class="text-gray-700 text-sm"><strong>Substance Abuse:</strong> Use of alcohol or illegal substances that impairs job performance</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span class="text-gray-700 text-sm"><strong>Misuse of Resources:</strong> Using public resources for personal benefit or unauthorized purposes</span>
                                    </div>
                                    <div class="flex items-start">
                                        <span class="text-red-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span class="text-gray-700 text-sm"><strong>Breach of Confidentiality:</strong> Unauthorized disclosure of sensitive information</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Conflict Resolution Section -->
                <div id="conflict-resolution-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C17.76 8.249 18 9.1 18 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-4.415-1.507l1.58-1.58A3.996 3.996 0 0010 14c.592 0 1.152-.129 1.658-.364.821-.38 1.507-1.066 1.507-1.907 0-.841-.686-1.527-1.507-1.907A3.996 3.996 0 0010 9.636a3.997 3.997 0 00-1.658.364c-.821.38-1.507 1.066-1.507 1.907 0 .841.686 1.527 1.507 1.907z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-green-900 mb-2">Conflict Resolution & Ethics Advisory</h2>
                                <p class="text-lg text-green-700">Procedures for addressing ethical dilemmas and resolving conflicts</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Ethics Advisory Process -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-green-100">
                                <h3 class="text-xl font-bold text-green-800 mb-4 flex items-center">
                                    <span class="mr-2">🤔</span> Ethics Advisory Process
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                                        <h4 class="font-semibold text-green-800 mb-2">Step 1: Recognition</h4>
                                        <p class="text-gray-700 text-sm">Identify when you face an ethical dilemma or potential conflict of interest. Common indicators include feelings of discomfort about a decision, competing loyalties, or unclear legal/ethical boundaries.</p>
                                    </div>
                                    <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <h4 class="font-semibold text-blue-800 mb-2">Step 2: Consultation</h4>
                                        <p class="text-gray-700 text-sm">Seek guidance from supervisors, the Ethics Advisory Board, or legal counsel. Early consultation prevents problems and demonstrates ethical awareness.</p>
                                    </div>
                                    <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                        <h4 class="font-semibold text-purple-800 mb-2">Step 3: Documentation</h4>
                                        <p class="text-gray-700 text-sm">Document the ethical concern, guidance received, and actions taken. This creates a record of good faith efforts to address ethical issues.</p>
                                    </div>
                                    <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                        <h4 class="font-semibold text-orange-800 mb-2">Step 4: Implementation</h4>
                                        <p class="text-gray-700 text-sm">Follow through on the agreed course of action and monitor for any additional ethical considerations that may arise.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Conflict Resolution Methods -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-green-100">
                                <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                    <span class="mr-2">🔧</span> Conflict Resolution Methods
                                </h3>
                                <div class="space-y-4">
                                    <div class="border-l-4 border-blue-500 pl-4">
                                        <h4 class="font-semibold text-gray-800 mb-2">Direct Communication</h4>
                                        <p class="text-gray-700 text-sm">Address conflicts directly with involved parties when appropriate. Use respectful dialogue to understand different perspectives and find mutually acceptable solutions.</p>
                                    </div>
                                    <div class="border-l-4 border-green-500 pl-4">
                                        <h4 class="font-semibold text-gray-800 mb-2">Mediation</h4>
                                        <p class="text-gray-700 text-sm">Utilize neutral third parties to facilitate resolution of interpersonal or workplace conflicts. Mediation preserves relationships while addressing underlying issues.</p>
                                    </div>
                                    <div class="border-l-4 border-purple-500 pl-4">
                                        <h4 class="font-semibold text-gray-800 mb-2">Formal Grievance</h4>
                                        <p class="text-gray-700 text-sm">When informal methods fail, formal grievance procedures provide structured resolution paths with clear timelines and protections for all parties.</p>
                                    </div>
                                    <div class="border-l-4 border-orange-500 pl-4">
                                        <h4 class="font-semibold text-gray-800 mb-2">Ethics Review</h4>
                                        <p class="text-gray-700 text-sm">Complex ethical issues may require review by the Ethics Advisory Board for formal guidance and policy clarification.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Resources & Support -->
                        <div class="mt-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border border-green-300">
                            <h3 class="text-lg font-bold text-green-800 mb-4 flex items-center">
                                <span class="mr-2">📞</span> Resources & Support
                            </h3>
                            <div class="grid md:grid-cols-3 gap-4">
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <h4 class="font-semibold text-gray-800 mb-2">Ethics Advisory Board</h4>
                                    <p class="text-gray-700 text-sm">Confidential consultation on ethical dilemmas and policy interpretation</p>
                                </div>
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <h4 class="font-semibold text-gray-800 mb-2">Employee Assistance Program</h4>
                                    <p class="text-gray-700 text-sm">Professional counseling and support services for personal and work-related challenges</p>
                                </div>
                                <div class="bg-white p-4 rounded-lg shadow-sm">
                                    <h4 class="font-semibold text-gray-800 mb-2">Legal Counsel</h4>
                                    <p class="text-gray-700 text-sm">Legal guidance on complex ethical and procedural questions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Accountability & Enforcement Section -->
                <div id="accountability-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-3xl font-bold text-red-900 mb-2">Accountability & Enforcement</h2>
                                <p class="text-lg text-red-700">Oversight mechanisms and corrective actions for ethical violations</p>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-8">
                            <!-- Accountability Measures -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-red-100">
                                <h3 class="text-xl font-bold text-red-800 mb-4 flex items-center">
                                    <span class="mr-2">📋</span> Accountability Measures
                                </h3>
                                <div class="space-y-4">
                                    <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                                        <h4 class="font-semibold text-red-800 mb-2">Performance Monitoring</h4>
                                        <p class="text-gray-700 text-sm">Regular evaluation of professional conduct, case outcomes, and adherence to ethical standards through structured review processes.</p>
                                    </div>
                                    <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                        <h4 class="font-semibold text-orange-800 mb-2">Peer Review</h4>
                                        <p class="text-gray-700 text-sm">Collegial oversight and feedback mechanisms that promote professional development and ethical awareness.</p>
                                    </div>
                                    <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                        <h4 class="font-semibold text-yellow-800 mb-2">External Oversight</h4>
                                        <p class="text-gray-700 text-sm">Independent review by professional boards, auditors, and oversight bodies to ensure transparency and accountability.</p>
                                    </div>
                                    <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <h4 class="font-semibold text-blue-800 mb-2">Public Reporting</h4>
                                        <p class="text-gray-700 text-sm">Transparent reporting of departmental performance, ethical compliance, and corrective actions taken.</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Enforcement Actions -->
                            <div class="bg-white rounded-xl p-6 shadow-md border border-red-100">
                                <h3 class="text-xl font-bold text-purple-800 mb-4 flex items-center">
                                    <span class="mr-2">⚖️</span> Progressive Enforcement
                                </h3>
                                <div class="space-y-4">
                                    <div class="border-l-4 border-green-500 pl-4">
                                        <h4 class="font-semibold text-gray-800 mb-1">Level 1: Counseling & Training</h4>
                                        <p class="text-gray-700 text-sm">Verbal counseling, additional training, or mentoring for minor infractions or first-time issues.</p>
                                    </div>
                                    <div class="border-l-4 border-yellow-500 pl-4">
                                        <h4 class="font-semibold text-gray-800 mb-1">Level 2: Written Warning</h4>
                                        <p class="text-gray-700 text-sm">Formal written documentation of ethical concerns with specific improvement expectations and timelines.</p>
                                    </div>
                                    <div class="border-l-4 border-orange-500 pl-4">
                                        <h4 class="font-semibold text-gray-800 mb-1">Level 3: Suspension</h4>
                                        <p class="text-gray-700 text-sm">Temporary removal from duties with or without pay, depending on the severity of the violation.</p>
                                    </div>
                                    <div class="border-l-4 border-red-500 pl-4">
                                        <h4 class="font-semibold text-gray-800 mb-1">Level 4: Termination</h4>
                                        <p class="text-gray-700 text-sm">Permanent separation from employment for serious violations or repeated infractions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Reporting & Whistleblower Protection -->
                        <div class="mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 border border-blue-300">
                            <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                <span class="mr-2">🛡️</span> Reporting & Whistleblower Protection
                            </h3>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="space-y-3">
                                    <h4 class="font-semibold text-blue-700 mb-2">Reporting Mechanisms:</h4>
                                    <div class="space-y-2 text-gray-700 text-sm">
                                        <div class="flex items-start">
                                            <span class="text-blue-500 mr-2 mt-1 flex-shrink-0">•</span>
                                            <span>Direct supervisor reporting for routine concerns</span>
                                        </div>
                                        <div class="flex items-start">
                                            <span class="text-blue-500 mr-2 mt-1 flex-shrink-0">•</span>
                                            <span>Anonymous hotline for sensitive issues</span>
                                        </div>
                                        <div class="flex items-start">
                                            <span class="text-blue-500 mr-2 mt-1 flex-shrink-0">•</span>
                                            <span>Ethics Advisory Board for complex matters</span>
                                        </div>
                                        <div class="flex items-start">
                                            <span class="text-blue-500 mr-2 mt-1 flex-shrink-0">•</span>
                                            <span>External oversight agencies when appropriate</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-y-3">
                                    <h4 class="font-semibold text-green-700 mb-2">Protection Guarantees:</h4>
                                    <div class="space-y-2 text-gray-700 text-sm">
                                        <div class="flex items-start">
                                            <span class="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                                            <span>No retaliation for good faith reporting</span>
                                        </div>
                                        <div class="flex items-start">
                                            <span class="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                                            <span>Confidentiality protection where possible</span>
                                        </div>
                                        <div class="flex items-start">
                                            <span class="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                                            <span>Legal support for whistleblower rights</span>
                                        </div>
                                        <div class="flex items-start">
                                            <span class="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                                            <span>Swift investigation of reported concerns</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Commitment Statement -->
                        <div class="mt-8 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl p-6 border border-pink-300">
                            <h3 class="text-lg font-bold text-pink-800 mb-3 flex items-center">
                                <span class="mr-2">🤝</span> Our Commitment to Ethical Excellence
                            </h3>
                            <p class="text-gray-700 text-sm leading-relaxed mb-4">
                                The Los Santos Department of Justice is committed to maintaining the highest standards of ethical conduct and professional integrity. We recognize that public trust in our justice system depends on the character and conduct of every member of our organization.
                            </p>
                            <p class="text-gray-700 text-sm leading-relaxed">
                                Through continuous education, fair enforcement, and unwavering commitment to our core values, we strive to serve as a model of ethical excellence in public service. Every member of our team has both the responsibility and the support necessary to uphold these standards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },     {
        id: 'rule10',
        title: 'Appeals Process',
        fullTitle: 'Appeals Process and Appellate Procedures',
        description: 'Comprehensive guidelines for appealing court decisions in both criminal and civil cases, including filing requirements, deadlines, procedures, and strategic considerations.',
        category: 'legal',
        icon: '📃',
        color: 'bg-lime-500',
        content: `
            <div class="max-w-7xl mx-auto">
                <!-- Hero Section -->
                <div class="bg-gradient-to-br from-slate-900 via-lime-900 to-green-900 text-white rounded-2xl p-8 mb-10 relative overflow-hidden">
                    <div class="absolute inset-0 bg-black/20"></div>
                    <div class="relative z-10">
                        <div class="flex items-center justify-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-lime-400 to-green-600 rounded-full flex items-center justify-center mr-4">
                                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                        <h2 class="text-4xl font-bold mb-4 font-serif">Appeals Process & Appellate Procedures</h2>
                        <p class="text-xl text-lime-100 max-w-4xl mx-auto leading-relaxed">
                            Comprehensive guidelines for challenging court decisions through the appellate system, protecting the right to seek review of trial court rulings
                        </p>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="mb-8">
                    <div class="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl">
                        <button onclick="showSection('general-principles')" class="tab-btn active px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="general-principles">
                            General Principles
                        </button>
                        <button onclick="showSection('criminal-appeals')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="criminal-appeals">
                            Criminal Appeals
                        </button>
                        <button onclick="showSection('civil-appeals')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="civil-appeals">
                            Civil Appeals
                        </button>
                        <button onclick="showSection('key-considerations')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="key-considerations">
                            Key Considerations
                        </button>
                    </div>
                </div>

                <!-- General Principles Section -->
                <div id="general-principles-section" class="content-section">
                    <div class="bg-gradient-to-br from-lime-50 to-green-50 rounded-2xl p-8 border border-lime-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">General Principles of Appeals</h3>
                                <p class="text-gray-600 mt-1">Foundation concepts for understanding the appellate process</p>
                            </div>
                        </div>
                        
                        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <!-- Right to Appeal -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-lime-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-lime-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-lime-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-lime-600 transition-colors">Right to Appeal</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Parties have the fundamental right to appeal adverse trial court decisions. This right ensures access to appellate review for potential errors in law or procedure.</p>
                            </div>

                            <!-- Purpose of Appeals -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">Purpose of Appeals</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Appeals exist to correct legal errors made by trial courts, not to re-examine facts or allow new evidence. Focus is on reviewing application of law and proper procedures.</p>
                            </div>

                            <!-- Standard of Review -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-emerald-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">Standard of Review</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Different standards apply: de novo (fresh review) for legal questions, clear error for factual findings, and abuse of discretion for discretionary rulings.</p>
                            </div>

                            <!-- Timing Requirements -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-teal-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-teal-600 transition-colors">Strict Deadlines</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Appeals must be filed within strict timeframes. Missing deadlines typically results in forfeiture of appeal rights. Deadlines vary by case type and jurisdiction.</p>
                            </div>

                            <!-- Written Record -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-cyan-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-cyan-600 transition-colors">Written Record</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Appeals based on written trial record including transcripts, exhibits, and pleadings. Appellate courts generally do not hear new testimony or evidence.</p>
                            </div>

                            <!-- Limited Scope -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.94l1-4H9.03z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Limited Scope</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Appeals limited to issues properly raised and preserved at trial. New arguments or issues generally cannot be raised for first time on appeal.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Criminal Appeals Section -->
                <div id="criminal-appeals-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.94l1-4H9.03z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Criminal Appeals Process</h3>
                                <p class="text-gray-600 mt-1">Special procedures and protections for criminal defendants</p>
                            </div>
                        </div>

                        <div class="bg-gradient-to-br from-amber-100 to-orange-100 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
                            <div class="flex items-center">
                                <svg class="w-6 h-6 text-amber-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                </svg>
                                <p class="text-amber-800 font-medium italic">Criminal appeals involve heightened constitutional protections and specific procedural requirements to safeguard defendants' rights.</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                            <!-- Notice of Appeal -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">📄</span>
                                    <h4 class="text-lg font-bold text-gray-800">Notice of Appeal Filing</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Timeframe:</strong> Must be filed within 30 days of sentencing for felonies, 30 days for misdemeanors</div>
                                    <div><strong>Content Requirements:</strong> Must specify conviction being appealed and general grounds for appeal</div>
                                    <div><strong>Court Filing:</strong> Filed with trial court that imposed sentence</div>
                                    <div><strong>Service:</strong> Copy must be served on prosecution and probation department if applicable</div>
                                </div>
                            </div>

                            <!-- Right to Counsel -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">⚖️</span>
                                    <h4 class="text-lg font-bold text-gray-800">Right to Counsel</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Constitutional Right:</strong> Defendants have right to legal representation on first appeal as of right</div>
                                    <div><strong>Appointed Counsel:</strong> Court must appoint counsel if defendant cannot afford attorney</div>
                                    <div><strong>Adequate Representation:</strong> Counsel must provide effective assistance throughout appellate process</div>
                                    <div><strong>Conflict Issues:</strong> Different counsel may be appointed if trial counsel has conflicts</div>
                                </div>
                            </div>

                            <!-- Common Grounds -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-amber-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">📋</span>
                                    <h4 class="text-lg font-bold text-gray-800">Common Appeal Grounds</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Constitutional Violations:</strong> Due process, equal protection, cruel and unusual punishment claims</div>
                                    <div><strong>Evidentiary Errors:</strong> Improper admission or exclusion of evidence during trial</div>
                                    <div><strong>Jury Instructions:</strong> Incorrect or misleading instructions given to jury</div>
                                    <div><strong>Sentencing Errors:</strong> Improper sentence calculation or constitutional violations</div>
                                    <div><strong>Prosecutorial Misconduct:</strong> Improper conduct affecting trial fairness</div>
                                    <div><strong>Ineffective Assistance:</strong> Trial counsel performance below constitutional standards</div>
                                </div>
                            </div>

                            <!-- Record Preparation -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">📚</span>
                                    <h4 class="text-lg font-bold text-gray-800">Record Preparation</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Transcript Ordering:</strong> Court reporter must prepare transcript of relevant proceedings</div>
                                    <div><strong>Clerk's Transcript:</strong> Trial court clerk compiles relevant documents and exhibits</div>
                                    <div><strong>Cost Considerations:</strong> State pays transcript costs for indigent defendants</div>
                                    <div><strong>Record Completeness:</strong> Appellant responsible for ensuring complete record on appeal</div>
                                </div>
                            </div>

                            <!-- Brief Requirements -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">✍️</span>
                                    <h4 class="text-lg font-bold text-gray-800">Brief Requirements</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Opening Brief:</strong> Appellant must file comprehensive brief outlining legal arguments</div>
                                    <div><strong>Response Brief:</strong> Prosecution files response defending trial court decision</div>
                                    <div><strong>Reply Brief:</strong> Appellant may file limited reply to prosecution's response</div>
                                    <div><strong>Format Requirements:</strong> Specific formatting, citation, and length requirements must be followed</div>
                                    <div><strong>Record Citations:</strong> All factual assertions must be supported by citations to record</div>
                                </div>
                            </div>

                            <!-- Appellate Review -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">👨‍⚖️</span>
                                    <h4 class="text-lg font-bold text-gray-800">Appellate Court Review</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Panel Review:</strong> Three-judge panel typically reviews criminal appeals</div>
                                    <div><strong>Oral Argument:</strong> Court may schedule oral argument for complex cases</div>
                                    <div><strong>Written Decision:</strong> Court issues written opinion affirming, reversing, or remanding case</div>
                                    <div><strong>Harmless Error Analysis:</strong> Court determines if errors affected trial outcome</div>
                                    <div><strong>Further Review:</strong> May petition for review by State Supreme Court</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Civil Appeals Section -->
                <div id="civil-appeals-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Civil Appeals Process</h3>
                                <p class="text-gray-600 mt-1">Procedures for appealing civil judgments and orders</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                            <!-- Appealable Orders -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">📋</span>
                                    <h4 class="text-lg font-bold text-gray-800">Appealable Orders</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Final Judgments:</strong> Final orders disposing of entire case generally appealable</div>
                                    <div><strong>Interlocutory Appeals:</strong> Limited circumstances allow appeal of non-final orders</div>
                                    <div><strong>Injunctive Relief:</strong> Orders granting or denying injunctions typically appealable</div>
                                    <div><strong>Class Action Orders:</strong> Certain class certification decisions may be appealed</div>
                                    <div><strong>Summary Judgment:</strong> Grants of summary judgment are generally appealable</div>
                                </div>
                            </div>

                            <!-- Filing Requirements -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-cyan-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">📄</span>
                                    <h4 class="text-lg font-bold text-gray-800">Filing Requirements</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Notice Deadline:</strong> Usually 30 days from entry of judgment or appealable order</div>
                                    <div><strong>Court and Service:</strong> Filed with trial court with copies served on all parties</div>
                                    <div><strong>Filing Fees:</strong> Appellant must pay required filing fees unless fee waiver granted</div>
                                    <div><strong>Designation:</strong> Must designate portions of record to be included in appeal</div>
                                </div>
                            </div>

                            <!-- Common Civil Appeal Issues -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">⚖️</span>
                                    <h4 class="text-lg font-bold text-gray-800">Common Appeal Issues</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Legal Standard Errors:</strong> Misapplication of legal standards or precedent</div>
                                    <div><strong>Evidentiary Rulings:</strong> Improper admission or exclusion of evidence</div>
                                    <div><strong>Jury Instructions:</strong> Erroneous or inadequate jury instructions</div>
                                    <div><strong>Damages Awards:</strong> Excessive or inadequate damage awards</div>
                                    <div><strong>Discovery Sanctions:</strong> Abuse of discretion in discovery rulings</div>
                                    <div><strong>Jurisdictional Issues:</strong> Subject matter or personal jurisdiction challenges</div>
                                </div>
                            </div>

                            <!-- Record and Transcripts -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-teal-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">📚</span>
                                    <h4 class="text-lg font-bold text-gray-800">Record Preparation</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Appellant's Responsibility:</strong> Appellant responsible for ensuring adequate record</div>
                                    <div><strong>Transcript Costs:</strong> Appellant generally pays for necessary transcripts</div>
                                    <div><strong>Agreed Statement:</strong> Parties may agree on statement of case instead of full transcript</div>
                                    <div><strong>Exhibits:</strong> Important exhibits must be included in appellate record</div>
                                </div>
                            </div>

                            <!-- Briefing Schedule -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">📅</span>
                                    <h4 class="text-lg font-bold text-gray-800">Briefing Schedule</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Opening Brief:</strong> Appellant files comprehensive brief within prescribed time</div>
                                    <div><strong>Respondent's Brief:</strong> Responding party files brief defending trial court decision</div>
                                    <div><strong>Reply Brief:</strong> Appellant may file optional reply brief</div>
                                    <div><strong>Page Limits:</strong> Strict page or word count limitations apply to all briefs</div>
                                    <div><strong>Extensions:</strong> Extensions may be available for good cause shown</div>
                                </div>
                            </div>

                            <!-- Settlement and Resolution -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">🤝</span>
                                    <h4 class="text-lg font-bold text-gray-800">Settlement Options</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Appellate Mediation:</strong> Many courts offer appellate mediation programs</div>
                                    <div><strong>Settlement Conferences:</strong> Parties may participate in settlement discussions</div>
                                    <div><strong>Voluntary Dismissal:</strong> Appeal may be dismissed if parties reach agreement</div>
                                    <div><strong>Cost Considerations:</strong> Settlement can avoid costs of continued appellate litigation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Key Considerations Section -->
                <div id="key-considerations-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Key Strategic Considerations</h3>
                                <p class="text-gray-600 mt-1">Important factors for successful appellate advocacy</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                            <!-- Cost-Benefit Analysis -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">💰</span>
                                    <h4 class="text-lg font-bold text-gray-800">Cost-Benefit Analysis</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Financial Costs:</strong> Consider attorney fees, filing fees, transcript costs, and time investment</div>
                                    <div><strong>Likelihood of Success:</strong> Realistically assess chances of reversal based on legal issues</div>
                                    <div><strong>Potential Outcomes:</strong> Consider best and worst case scenarios for appeal</div>
                                    <div><strong>Alternative Options:</strong> Explore settlement or other resolution methods</div>
                                </div>
                            </div>

                            <!-- Issue Preservation -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-pink-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">🛡️</span>
                                    <h4 class="text-lg font-bold text-gray-800">Issue Preservation</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Trial Objections:</strong> Issues must be properly raised and preserved at trial level</div>
                                    <div><strong>Specificity Requirements:</strong> Objections must be specific enough to alert trial court</div>
                                    <div><strong>Waiver Doctrine:</strong> Failure to preserve issues may result in waiver of appellate rights</div>
                                    <div><strong>Exceptions:</strong> Limited exceptions for fundamental errors or constitutional issues</div>
                                </div>
                            </div>

                            <!-- Standard of Review Impact -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">⚖️</span>
                                    <h4 class="text-lg font-bold text-gray-800">Standard of Review Impact</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>De Novo Review:</strong> Questions of law reviewed without deference to trial court</div>
                                    <div><strong>Substantial Evidence:</strong> Factual findings upheld if supported by substantial evidence</div>
                                    <div><strong>Abuse of Discretion:</strong> Discretionary rulings rarely overturned absent clear abuse</div>
                                    <div><strong>Strategy Implications:</strong> Understanding standard helps assess appeal prospects</div>
                                </div>
                            </div>

                            <!-- Time Management -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-teal-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">⏰</span>
                                    <h4 class="text-lg font-bold text-gray-800">Time Management</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Strict Deadlines:</strong> Missing deadlines can be fatal to appeal</div>
                                    <div><strong>Calendar Planning:</strong> Plan briefing schedule well in advance</div>
                                    <div><strong>Extension Requests:</strong> Request extensions early and show good cause</div>
                                    <div><strong>Court Schedules:</strong> Understand appellate court calendar and processing times</div>
                                </div>
                            </div>

                            <!-- Quality Control -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">✅</span>
                                    <h4 class="text-lg font-bold text-gray-800">Brief Quality</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Clear Arguments:</strong> Develop clear, logical legal arguments supported by authority</div>
                                    <div><strong>Record Citations:</strong> Ensure all factual statements supported by record citations</div>
                                    <div><strong>Professional Tone:</strong> Maintain respectful, professional tone throughout brief</div>
                                    <div><strong>Proofreading:</strong> Carefully proofread for errors that undermine credibility</div>
                                </div>
                            </div>

                            <!-- Alternative Remedies -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">🔄</span>
                                    <h4 class="text-lg font-bold text-gray-800">Alternative Remedies</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Post-Trial Motions:</strong> Consider filing motions for new trial or judgment notwithstanding verdict</div>
                                    <div><strong>Settlement Negotiations:</strong> Continue settlement discussions during appeal process</div>
                                    <div><strong>Petition for Review:</strong> Consider seeking higher court review of adverse appellate decisions</div>
                                    <div><strong>Federal Court Options:</strong> Evaluate federal court remedies for constitutional issues</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="mt-12 bg-gradient-to-br from-slate-800 to-gray-900 text-white rounded-2xl p-8 text-center">
                    <div class="flex justify-center mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-lime-400 to-green-600 rounded-full flex items-center justify-center">
                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                    <h3 class="text-3xl font-bold mb-4 font-serif">Protecting Appellate Rights</h3>
                    <p class="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                        The Los Santos Department of Justice is committed to ensuring fair and accessible appellate procedures, 
                        protecting the fundamental right to seek review of trial court decisions through our comprehensive appellate system.
                    </p>
                </div>
            </div>
        `
    },    {
        id: 'rule11',
        title: 'Public Relations',
        fullTitle: 'Public Relations and Community Engagement',
        description: 'Building and maintaining public trust through transparent communication, community outreach, and strategic engagement with Los Santos citizens.',
        category: 'legal',
        icon: '🤝',
        color: 'bg-amber-500',
        content: `
            <div class="max-w-7xl mx-auto">
                <!-- Hero Section -->
                <div class="bg-gradient-to-br from-slate-900 via-amber-900 to-orange-900 text-white rounded-2xl p-8 mb-10 relative overflow-hidden">
                    <div class="absolute inset-0 bg-black/20"></div>
                    <div class="relative z-10">
                        <div class="flex items-center justify-center mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center mr-4">
                                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                </svg>
                            </div>
                        </div>
                        <h2 class="text-4xl font-bold mb-4 font-serif">Public Relations & Community Engagement</h2>
                        <p class="text-xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
                            Building and maintaining public trust through transparent communication, community outreach, and strategic engagement with the diverse communities of Los Santos
                        </p>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="mb-8">
                    <div class="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl">
                        <button onclick="showSection('core-goals')" class="tab-btn active px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="core-goals">
                            Core Goals
                        </button>
                        <button onclick="showSection('activities')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="activities">
                            Key Activities
                        </button>
                        <button onclick="showSection('digital-engagement')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="digital-engagement">
                            Digital Engagement
                        </button>
                        <button onclick="showSection('management')" class="tab-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300" data-section="management">
                            Management & Feedback
                        </button>
                    </div>
                </div>

                <!-- Core Goals Section -->
                <div id="core-goals-section" class="content-section">
                    <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Core Goals of Public Relations</h3>
                                <p class="text-gray-600 mt-1">Strategic objectives for building community trust and engagement</p>
                            </div>
                        </div>

                        <div class="bg-gradient-to-br from-blue-100 to-indigo-100 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
                            <div class="flex items-center">
                                <svg class="w-6 h-6 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                </svg>
                                <p class="text-blue-800 font-medium italic">Building and maintaining public trust and confidence is paramount to our mission, encompassing broader engagement with the diverse communities of Los Santos.</p>
                            </div>
                        </div>
                        
                        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <!-- Build Public Trust -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-amber-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-amber-600 transition-colors">Build & Maintain Public Trust</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Instill confidence in the fairness, impartiality, and effectiveness of the Los Santos justice system through consistent, reliable communication and transparent operations.</p>
                            </div>

                            <!-- Enhance Transparency -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Enhance Transparency</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Make DOJ operations and functions more accessible and understandable to the public, within legal and ethical bounds, promoting open government principles.</p>
                            </div>

                            <!-- Promote Understanding -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">Promote Understanding</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Educate citizens about their rights, responsibilities, the legal process, and the DOJ's role in maintaining public safety and order through comprehensive outreach.</p>
                            </div>

                            <!-- Community Partnerships -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">Strengthen Community Partnerships</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Collaborate with community organizations, educational institutions, and local leaders to address shared concerns and improve public safety through joint initiatives.</p>
                            </div>

                            <!-- Reputation Management -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors">Manage Reputation</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Proactively shape public perception and effectively manage communications during critical incidents or crises while maintaining credibility and public confidence.</p>
                            </div>

                            <!-- Highlight Successes -->
                            <div class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-teal-500">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg class="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 class="text-lg font-bold text-gray-800 group-hover:text-teal-600 transition-colors">Highlight Successes</h4>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">Appropriately communicate the positive impact of the DOJ's work on the community, celebrating achievements while maintaining professional standards.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Key Activities Section -->
                <div id="activities-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Key Public Relations Activities</h3>
                                <p class="text-gray-600 mt-1">Strategic programs and initiatives for community engagement</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                            <!-- Community Outreach -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">🏛️</span>
                                    <h4 class="text-lg font-bold text-gray-800">Community Outreach Programs</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Town Hall Meetings & Forums:</strong> Hosting and participating in public meetings to discuss community concerns, explain legal processes, and solicit feedback from residents</div>
                                    <div><strong>Educational Workshops:</strong> Offering workshops on crime prevention, victim's rights, juvenile justice, and court system navigation</div>
                                    <div><strong>School Programs:</strong> Engaging with schools to educate students about law, rights, and legal career opportunities</div>
                                    <div><strong>Community Partnerships:</strong> Collaborating with local non-profits, community groups, and civic organizations on public safety initiatives</div>
                                </div>
                            </div>

                            <!-- Content Creation -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">📝</span>
                                    <h4 class="text-lg font-bold text-gray-800">Content Creation & Dissemination</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Public Service Announcements (PSAs):</strong> Developing and distributing PSAs on important legal topics or public safety messages</div>
                                    <div><strong>Informational Materials:</strong> Creating easy-to-understand print and digital materials explaining various aspects of law or DOJ functions</div>
                                    <div><strong>Annual Reports:</strong> Publishing accessible annual reports detailing DOJ activities, achievements, and community impact</div>
                                    <div><strong>Legal Guides:</strong> Comprehensive guides helping citizens understand their rights and legal processes</div>
                                </div>
                            </div>

                            <!-- Special Events -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">🎉</span>
                                    <h4 class="text-lg font-bold text-gray-800">Special Events & Initiatives</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Open House Events:</strong> Hosting events at courthouses or DOJ offices to allow public tours and personnel meetings</div>
                                    <div><strong>Victim & Witness Appreciation:</strong> Recognizing and supporting the vital role of victims and witnesses in the justice process</div>
                                    <div><strong>Internship Programs:</strong> Providing opportunities for community members, especially students, to gain insight into DOJ work</div>
                                    <div><strong>Volunteer Programs:</strong> Engaging citizens in meaningful volunteer opportunities within the justice system</div>
                                </div>
                            </div>

                            <!-- Crisis Communication -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">🚨</span>
                                    <h4 class="text-lg font-bold text-gray-800">Crisis Communication</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Rapid Response Strategies:</strong> Implementing rapid response strategies to address critical incidents and manage misinformation</div>
                                    <div><strong>Timely Information:</strong> Providing timely, accurate information to the public in coordination with Media Relations Policy</div>
                                    <div><strong>Consistent Messaging:</strong> Ensuring consistent messaging across all platforms during sensitive situations</div>
                                    <div><strong>Media Coordination:</strong> Working closely with media outlets to ensure accurate reporting during crises</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Digital Engagement Section -->
                <div id="digital-engagement-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Digital Engagement Strategy</h3>
                                <p class="text-gray-600 mt-1">Modern communication through digital platforms and online presence</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                            <!-- Website Management -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">🌐</span>
                                    <h4 class="text-lg font-bold text-gray-800">DOJ Website Content</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Comprehensive Resource:</strong> Ensuring the website serves as a comprehensive, user-friendly resource for legal information</div>
                                    <div><strong>Current Information:</strong> Maintaining up-to-date forms, legal documents, and procedural information</div>
                                    <div><strong>Accessibility:</strong> Ensuring website accessibility for all community members, including those with disabilities</div>
                                    <div><strong>Regular Updates:</strong> Providing regular updates on DOJ activities, news, and important announcements</div>
                                </div>
                            </div>

                            <!-- Social Media Presence -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">📱</span>
                                    <h4 class="text-lg font-bold text-gray-800">Social Media Presence</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Active Accounts:</strong> Maintaining active and informative official social media accounts.</div>
                                    <div><strong>Content Strategy:</strong> Sharing news, public safety alerts, and engaging with the community appropriately</div>
                                    <div><strong>Policy Compliance:</strong> All content adheres to Media Relations Policy restrictions on sensitive information</div>
                                    <div><strong>Community Interaction:</strong> Engaging with community questions and concerns through appropriate channels</div>
                                </div>
                            </div>

                            <!-- Online Q&A Sessions -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-teal-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">💬</span>
                                    <h4 class="text-lg font-bold text-gray-800">Online Q&A Sessions</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Live Sessions:</strong> Periodically hosting live online sessions where the public can ask general questions</div>
                                    <div><strong>Expert Access:</strong> Providing direct access to DOJ experts and officials for community inquiries</div>
                                    <div><strong>Educational Focus:</strong> Sessions focus on educating the public about the legal system and DOJ operations</div>
                                    <div><strong>Recorded Archives:</strong> Maintaining archives of sessions for future reference and accessibility</div>
                                </div>
                            </div>

                            <!-- Digital Innovation -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">🚀</span>
                                    <h4 class="text-lg font-bold text-gray-800">Digital Innovation</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Mobile-First Approach:</strong> Optimizing all digital content for mobile device accessibility</div>
                                    <div><strong>Multi-Platform Strategy:</strong> Coordinating messaging across multiple digital platforms for maximum reach</div>
                                    <div><strong>Interactive Tools:</strong> Developing interactive tools and resources to help citizens navigate legal processes</div>
                                    <div><strong>Analytics & Improvement:</strong> Using digital analytics to continuously improve content and engagement strategies</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Management & Feedback Section -->
                <div id="management-section" class="content-section hidden">
                    <div class="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-200 shadow-lg">
                        <div class="flex items-center mb-8">
                            <div class="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-3xl font-bold text-gray-800 font-serif">Management & Continuous Improvement</h3>
                                <p class="text-gray-600 mt-1">Organizational structure and feedback mechanisms for ongoing enhancement</p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                            <!-- Public Information Officer Role -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-rose-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">👨‍💼</span>
                                    <h4 class="text-lg font-bold text-gray-800">Public Information Officer (PIO)</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Central Coordination:</strong> The designated PIO or Office of Public Affairs serves as the central point of contact for all public relations activities</div>
                                    <div><strong>Strategy Development:</strong> Developing and implementing comprehensive public relations strategies aligned with DOJ goals</div>
                                    <div><strong>Community Outreach:</strong> Coordinating community outreach efforts and maintaining relationships with community leaders</div>
                                    <div><strong>Digital Management:</strong> Managing the DOJ's official digital presence across all platforms</div>
                                    <div><strong>Message Consistency:</strong> Ensuring consistent and accurate messaging across all public-facing platforms</div>
                                    <div><strong>Staff Training:</strong> Training DOJ personnel on effective public communication and community engagement</div>
                                </div>
                            </div>

                            <!-- Feedback Mechanisms -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-pink-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">📊</span>
                                    <h4 class="text-lg font-bold text-gray-800">Feedback & Improvement</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Community Feedback:</strong> Welcoming feedback from the community regarding communication strategies and overall engagement</div>
                                    <div><strong>Multiple Channels:</strong> Providing feedback opportunities through website, community forums, and direct contact with PIO</div>
                                    <div><strong>Continuous Assessment:</strong> Regular assessment of public relations effectiveness through surveys and community input</div>
                                    <div><strong>Strategy Adaptation:</strong> Adapting communication strategies based on community needs and feedback</div>
                                    <div><strong>Performance Metrics:</strong> Establishing and monitoring key performance indicators for public engagement</div>
                                    <div><strong>Regular Reviews:</strong> Conducting regular reviews of public relations activities and outcomes</div>
                                </div>
                            </div>

                            <!-- Quality Standards -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">⭐</span>
                                    <h4 class="text-lg font-bold text-gray-800">Communication Quality Standards</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Accuracy:</strong> All public communications must be factually accurate and legally appropriate</div>
                                    <div><strong>Timeliness:</strong> Information provided in a timely manner to serve community needs effectively</div>
                                    <div><strong>Clarity:</strong> Communications written in clear, accessible language appropriate for diverse audiences</div>
                                    <div><strong>Professional Tone:</strong> Maintaining professional, respectful tone in all public interactions</div>
                                    <div><strong>Cultural Sensitivity:</strong> Ensuring communications are culturally sensitive and inclusive of all community members</div>
                                </div>
                            </div>

                            <!-- Partnership Development -->
                            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-teal-500">
                                <div class="flex items-center mb-4">
                                    <span class="text-2xl mr-3">🤝</span>
                                    <h4 class="text-lg font-bold text-gray-800">Strategic Partnerships</h4>
                                </div>
                                <div class="space-y-3 text-gray-600 text-sm">
                                    <div><strong>Community Organizations:</strong> Building lasting partnerships with local non-profits and community groups</div>
                                    <div><strong>Educational Institutions:</strong> Collaborating with schools, colleges, and universities on educational initiatives</div>
                                    <div><strong>Media Relations:</strong> Maintaining professional relationships with local media outlets and journalists</div>
                                    <div><strong>Government Coordination:</strong> Coordinating with other government agencies for unified public communication</div>
                                    <div><strong>Private Sector:</strong> Engaging with private sector partners on community safety and legal education initiatives</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="mt-12 bg-gradient-to-br from-slate-800 to-gray-900 text-white rounded-2xl p-8 text-center">
                    <div class="flex justify-center mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center">
                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                            </svg>
                        </div>
                    </div>
                    <h3 class="text-3xl font-bold mb-4 font-serif">Serving with Transparency</h3>
                    <p class="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                        By fostering open communication and active engagement, the Los Santos Department of Justice strives to be a responsive and trusted institution that truly serves and represents the citizens of Los Santos.
                    </p>
                </div>
            </div>
        `
    }
];
    
// Render rules cards
function renderRulesCards() {
    const rulesGrid = document.getElementById('rules-grid');
    if (!rulesGrid) return;

    rulesGrid.innerHTML = rulesData.map(rule => `
        <div class="rule-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer" data-rule="${rule.id}" data-category="${rule.category}">
            <div class="p-6">
                <div class="flex items-center mb-4">
                    <div class="${rule.color} text-white p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                        <div class="text-2xl">${rule.icon}</div>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-lg font-bold text-gray-900 group-hover:text-doj-brown transition-colors duration-300">
                            Rule ${rule.id.replace('rule', '')}: ${rule.title}
                        </h3>
                        <div class="text-xs text-gray-500 mt-1 px-2 py-1 bg-gray-100 rounded-full inline-block">
                            ${getCategoryDisplayName(rule.category)}
                        </div>
                    </div>
                </div>
                <p class="text-gray-600 text-sm leading-relaxed mb-4">${rule.description}</p>
                <div class="flex items-center justify-between">
                    <div class="text-xs text-gray-500">
                        Click to view details
                    </div>
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-doj-brown group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            </div>
        </div>
    `).join('');

    // Add click event listeners to rule cards
    document.querySelectorAll('.rule-card').forEach(card => {
        card.addEventListener('click', () => {
            const ruleId = card.dataset.rule;
            openRuleModal(ruleId);
        });
    });
}

// Get category display name
function getCategoryDisplayName(category) {
    const categoryMap = {
        'court': 'Court Procedures',
        'legal': 'Legal Process',
        'security': 'Security & Safety',
        'ethics': 'Ethics & Conduct'
    };
    return categoryMap[category] || category;
}

// Setup rules modal
function setupRulesModal() {
    const modal = document.getElementById('rules-modal');
    const closeBtn = document.getElementById('close-modal');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeRuleModal);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeRuleModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeRuleModal();
        }
    });
}

// Open rule modal
function openRuleModal(ruleId) {
    const rule = rulesData.find(r => r.id === ruleId);
    if (!rule) return;

    const modal = document.getElementById('rules-modal');
    const modalTitle = document.getElementById('modal-rule-title');
    const modalContent = document.getElementById('modal-rule-content');

    if (modal && modalTitle && modalContent) {
        modalTitle.textContent = rule.fullTitle;
        modalContent.innerHTML = rule.content;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Add animation and initialize tabs
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            
            // Multiple initialization attempts to ensure reliability
            initializeModalTabs(ruleId);
            setTimeout(() => initializeModalTabs(ruleId), 50);
            setTimeout(() => initializeModalTabs(ruleId), 200);
        });
    }
}

// Initialize tabs for specific rules that have tabbed content
function initializeModalTabs(ruleId) {
    // Different rules have different default sections
    let defaultSection = '';
    
    switch(ruleId) {
        case 'rule1': // Court Decorum
            defaultSection = 'general';
            break;
        case 'rule2': // Legal Process  
            defaultSection = 'criminal';
            break;
        case 'rule3': // Evidence Handling
            defaultSection = 'general-principles';
            break;        case 'rule4': // Witness Testimony
            defaultSection = 'witness-role';
            break;        case 'rule5': // Legal Documentation Standards
            defaultSection = 'formatting';
            break;
        case 'rule6': // Court Security Protocols
            defaultSection = 'entry-screening';
            break;        case 'rule7': // Media Relations Policy
            defaultSection = 'guiding-principles';
            break;        case 'rule8': // Case Management
            defaultSection = 'core-objectives';
            break;
        case 'rule9': // Ethics & Conduct
            defaultSection = 'core-principles';
            break;
        case 'rule10': // Appeals Process
            defaultSection = 'general-principles';
            break;
        case 'rule11': // Public Relations
            defaultSection = 'core-goals';
            break;
        default:
            return; // No tabs for this rule
    }      // Ensure DOM is ready before initializing tabs
    setTimeout(() => {
        if (defaultSection) {
            if (ruleId === 'rule5') {
                // Rule5 uses a different tab system
                showTabContent('rule5', defaultSection);            } else if (ruleId === 'rule6' || ruleId === 'rule7' || ruleId === 'rule8' || ruleId === 'rule9' || ruleId === 'rule10' || ruleId === 'rule11') {
                // Rule6, Rule7, Rule8, Rule9, Rule10, and Rule11 use showSection function
                showSection(defaultSection);
            } else {
                const targetSection = document.getElementById(defaultSection + '-section');
                if (targetSection) {
                    showSection(defaultSection);
                }
            }
        }
    }, 150);
}

// Close rule modal
function closeRuleModal() {
    const modal = document.getElementById('rules-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        modal.style.opacity = '0';
    }
}

// Setup rules search functionality
function setupRulesSearch() {
    const searchInput = document.getElementById('rules-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterRules(searchTerm, getSelectedCategory());
    });
}

// Setup rules filter functionality
function setupRulesFilter() {
    const filterSelect = document.getElementById('rules-filter');
    if (!filterSelect) return;

    filterSelect.addEventListener('change', (e) => {
        const category = e.target.value;
        const searchTerm = document.getElementById('rules-search')?.value.toLowerCase() || '';
        filterRules(searchTerm, category);
    });
}

// Get selected category from filter
function getSelectedCategory() {
    const filterSelect = document.getElementById('rules-filter');
    return filterSelect ? filterSelect.value : 'all';
}

// Filter rules based on search and category
function filterRules(searchTerm, category) {
    const ruleCards = document.querySelectorAll('.rule-card');
    
    ruleCards.forEach(card => {
        const ruleId = card.dataset.rule;
        const ruleCategory = card.dataset.category;
        const rule = rulesData.find(r => r.id === ruleId);
        
        if (!rule) return;
        
        const matchesSearch = !searchTerm || 
            rule.title.toLowerCase().includes(searchTerm) ||
            rule.description.toLowerCase().includes(searchTerm) ||
            rule.fullTitle.toLowerCase().includes(searchTerm);
            
        const matchesCategory = category === 'all' || ruleCategory === category;
          if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            card.classList.add('animate-fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('animate-fade-in');
        }
    });
}

// Show section function for Court Decorum tabs
function showSection(sectionName) {
    // Hide all sections
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Remove active class from all tabs
    const allTabs = document.querySelectorAll('.tab-btn');
    allTabs.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    
    // Add active class to clicked tab
    const targetTab = document.querySelector('[data-section="' + sectionName + '"]');
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

// Show tab content function for rules with tabbed content
function showTabContent(ruleId, tabName) {
    // Hide all tab content for this rule
    const allTabContent = document.querySelectorAll(`#${ruleId}-${tabName.split('-')[0] === tabName ? tabName : tabName.split('-')[0]}`).length > 0 
        ? document.querySelectorAll(`[id^="${ruleId}-"]`)
        : document.querySelectorAll('.tab-content');
    
    allTabContent.forEach(content => {
        if (content.id.startsWith(ruleId + '-')) {
            content.classList.add('hidden');
        }
    });
    
    // Remove active class from all tab buttons for this rule
    const allTabButtons = document.querySelectorAll(`button[onclick*="${ruleId}"]`);
    allTabButtons.forEach(btn => {
        btn.classList.remove('bg-teal-600', 'text-white', 'shadow-md', 'transform', 'scale-105');
        btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-50', 'border', 'border-gray-200');
    });
    
    // Show selected tab content
    const targetContent = document.getElementById(`${ruleId}-${tabName}`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    // Add active class to clicked tab button
    const targetButton = document.querySelector(`button[onclick*="${ruleId}"][onclick*="${tabName}"]`);
    if (targetButton) {
        targetButton.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-50', 'border', 'border-gray-200');
        targetButton.classList.add('bg-teal-600', 'text-white', 'shadow-md', 'transform', 'scale-105');
    }
}

// Make showSection globally available
window.showSection = showSection;
// Make showTabContent globally available  
window.showTabContent = showTabContent;

// Initialize penal codes functionality
function initializePenalCodes() {
    if (!document.getElementById('penalCodesGrid')) return;
    
    initializePenalCodeCards();
    initializePenalCodeModal();
    resetPenalCodeCards(); // Reset all cards to visible state initially
    initializePenalCodeSearch();
    initializePenalCodeFilter();
    enhanceSearchExperience(); // Add enhanced UX features
}

// Reset all penal code cards to their default visible state
function resetPenalCodeCards() {
    const cards = document.querySelectorAll('.penal-code-card');
    
    cards.forEach(card => {
        card.style.display = '';  // Reset to default CSS display
        card.style.opacity = '1';
        card.classList.remove('animate-fade-in');
    });
    
    // Hide any existing no-results message
    const grid = document.getElementById('penalCodesGrid');
    const noResultsMsg = grid?.querySelector('.no-results-message');
    if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Initialize penal code search functionality
function initializePenalCodeSearch() {
    const searchInput = document.getElementById('penalCodeSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const selectedFilter = document.getElementById('codeFilter')?.value || '';
        
        // If search is cleared and no filter is selected, reset all cards
        if (!searchTerm && !selectedFilter) {
            resetPenalCodeCards();
        } else {
            filterPenalCodes(searchTerm, selectedFilter);
        }
    });
}

// Initialize penal code filter functionality
function initializePenalCodeFilter() {
    const filterSelect = document.getElementById('codeFilter');
    if (!filterSelect) return;

    filterSelect.addEventListener('change', (e) => {
        const selectedFilter = e.target.value;
        const searchTerm = document.getElementById('penalCodeSearch')?.value.toLowerCase() || '';
        
        // If "All Codes" is selected (empty value), reset and show all cards
        if (!selectedFilter) {
            resetPenalCodeCards();
            // Still apply search filter if there's a search term
            if (searchTerm) {
                filterPenalCodes(searchTerm, selectedFilter);
            }
        } else {
            filterPenalCodes(searchTerm, selectedFilter);
        }
    });
}

// Filter penal code cards based on search term and category filter
function filterPenalCodes(searchTerm, categoryFilter) {
    const cards = document.querySelectorAll('.penal-code-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const codeType = card.getAttribute('data-code');
        const cardTitle = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const cardDescription = card.querySelector('p')?.textContent.toLowerCase() || '';
        const cardCategory = card.querySelector('span')?.textContent.toLowerCase() || '';
        
        // Check if search term matches
        const matchesSearch = !searchTerm || 
            cardTitle.includes(searchTerm) ||
            cardDescription.includes(searchTerm) ||
            cardCategory.includes(searchTerm) ||
            codeType.includes(searchTerm);
        
        // Check if category filter matches (empty string means show all)
        const matchesFilter = !categoryFilter || codeType === categoryFilter;
        
        // Show/hide card based on both search and filter criteria
        if (matchesSearch && matchesFilter) {
            card.style.display = '';  // Reset to default display
            card.style.opacity = '1';
            card.classList.add('animate-fade-in');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.classList.remove('animate-fade-in');
        }
    });
    
    // Update grid layout after filtering
    updatePenalCodesGridLayout(visibleCount);
}

// Update grid layout after filtering
function updatePenalCodesGridLayout(visibleCount = null) {
    const grid = document.getElementById('penalCodesGrid');
    if (!grid) return;
    
    // If visibleCount is not provided, count visible cards manually
    if (visibleCount === null) {
        const visibleCards = grid.querySelectorAll('.penal-code-card:not([style*="display: none"])');
        visibleCount = visibleCards.length;
    }
    
    // Add a subtle animation class for better UX
    grid.classList.add('grid-updating');
    setTimeout(() => {
        grid.classList.remove('grid-updating');
    }, 300);
    
    // Show "No results" message if no cards are visible
    let noResultsMsg = grid.querySelector('.no-results-message');
    if (visibleCount === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message col-span-full text-center py-12';
            noResultsMsg.innerHTML = `
                <div class="max-w-md mx-auto">
                    <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.462-.816-6.127-2.179C5.23 12.304 5 11.671 5 11V6a2 2 0 012-2h10a2 2 0 012 2v5c0 .671-.23 1.304-.673 1.821z"></path>
                    </svg>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">No penal codes found</h3>
                    <p class="text-gray-600">Try adjusting your search terms or filter selection.</p>
                </div>
            `;
            grid.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Enhanced search and filter functionality with better UX
function enhanceSearchExperience() {
    // Add clear search button functionality
    const searchInput = document.getElementById('penalCodeSearch');
    const categoryFilter = document.getElementById('codeFilter');
    
    if (searchInput) {
        // Add clear button if it doesn't exist
        if (!searchInput.parentElement.querySelector('.clear-search-btn')) {
            const clearBtn = document.createElement('button');
            clearBtn.className = 'clear-search-btn absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors';
            clearBtn.innerHTML = 'Ã—';
            clearBtn.style.display = 'none';
            clearBtn.type = 'button';
              clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                const filterSelect = document.getElementById('codeFilter');
                if (filterSelect) {
                    filterSelect.value = '';
                }
                resetPenalCodeCards();
                clearBtn.style.display = 'none';
            });
            
            searchInput.parentElement.appendChild(clearBtn);
        }
        
        // Show/hide clear button based on input
        searchInput.addEventListener('input', () => {
            const clearBtn = searchInput.parentElement.querySelector('.clear-search-btn');
            if (clearBtn) {
                clearBtn.style.display = searchInput.value ? 'block' : 'none';
            }
        });
    }
}
