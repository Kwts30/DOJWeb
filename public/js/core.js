/**
 * Los Santos Department of Justice - Core Script
 * Handles navigation, mobile drawer, universal search modal, toast notifications, and Apple-style scroll reveal animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initGlobalSearch();
  setActiveNavLink();
  initAppleScrollReveal();
});

/**
 * Apple-Style Scroll Reveal Observer
 */
function initAppleScrollReveal() {
  const revealElements = document.querySelectorAll('.apple-reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Navigation & Mobile Drawer Setup
 */
function initNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-backdrop');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
      if (backdrop) backdrop.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  }

  const closeMenu = () => {
    if (mobileMenu) mobileMenu.classList.add('translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  if (menuClose) menuClose.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);
}

/**
 * Highlight Active Page Link
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.menu-link, .nav-link-item');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('text-doj-gold', 'font-bold', 'bg-white/10');
    }
  });
}

/**
 * Global Keyboard & Button Search Trigger (Cmd + K)
 */
function initGlobalSearch() {
  const searchInput = document.getElementById('global-search-input');
  const searchModal = document.getElementById('global-search-modal');
  const closeBtn = document.getElementById('close-global-search');

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchModal) {
        searchModal.classList.toggle('hidden');
        if (!searchModal.classList.contains('hidden') && searchInput) {
          searchInput.focus();
        }
      }
    }
    if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('hidden')) {
      searchModal.classList.add('hidden');
    }
  });

  if (closeBtn && searchModal) {
    closeBtn.addEventListener('click', () => searchModal.classList.add('hidden'));
  }
}

/**
 * Show UI Toast Notification
 */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bgColors = {
    info: 'bg-slate-900 text-white border-doj-gold',
    success: 'bg-emerald-900 text-emerald-100 border-emerald-500',
    warning: 'bg-amber-900 text-amber-100 border-amber-500',
    error: 'bg-red-900 text-red-100 border-red-500'
  };

  toast.className = `pointer-events-auto px-5 py-3 rounded-xl border shadow-2xl text-sm font-semibold flex items-center space-x-3 transition-all duration-300 transform translate-y-4 opacity-0 ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

window.showToast = showToast;
