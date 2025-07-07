// Memorandums Page JavaScript

// Load memorandums from JSON file
async function loadMemorandums() {
    try {
        const response = await fetch('data/memorandums.json');
        const data = await response.json();
        return data.memorandums;
    } catch (error) {
        console.error('Error loading memorandums:', error);
        return [];
    }
}

// Memorandums are now loaded from JSON file - no hardcoded data needed

// DOM elements
let memorandumsContainer;
let searchInput;
let categoryFilter;
let yearFilter;
let loadingState;
let emptyState;

// Initialize the page
document.addEventListener('DOMContentLoaded', async function() {
    // Get DOM elements
    memorandumsContainer = document.getElementById('memorandums-container');
    searchInput = document.getElementById('memo-search');
    categoryFilter = document.getElementById('memo-category');
    yearFilter = document.getElementById('memo-year');
    loadingState = document.getElementById('loading-state');
    emptyState = document.getElementById('empty-state');
    
    // Setup event listeners
    setupEventListeners();
    
    // Load memorandums from JSON
    const loadedMemorandums = await loadMemorandums();
    
    // Store globally for filtering
    window.memorandums = loadedMemorandums;
    
    // Display memorandums with simulated loading time
    setTimeout(() => {
        displayMemorandums(loadedMemorandums);
    }, 1000);
});

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', debounce(filterMemorandums, 300));
    
    // Filter functionality
    categoryFilter.addEventListener('change', filterMemorandums);
    yearFilter.addEventListener('change', filterMemorandums);
    
    // Modal close events
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function displayMemorandums(memos) {
    loadingState.style.display = 'none';
    
    if (memos.length === 0) {
        showEmptyState();
        return;
    }
    
    memorandumsContainer.innerHTML = '';
    
    memos.forEach((memo, index) => {
        const memoCard = createMemorandumCard(memo);
        memoCard.style.animationDelay = `${index * 0.1}s`;
        memorandumsContainer.appendChild(memoCard);
    });
    
    hideEmptyState();
}

function createMemorandumCard(memo) {
    const card = document.createElement('div');
    card.className = 'memo-card memo-card-enter cursor-pointer';
    card.onclick = () => window.location.href = `pages/${memo.filename}`;
    
    const priorityClass = memo.priority;
    const statusText = memo.status === 'active' ? 'Active' : 'Archived';
    const formattedDate = formatDate(memo.date);
    
    card.innerHTML = `
        <div class="memo-card-header">
            <div class="flex items-center justify-between mb-3">
                <span class="memo-category">${getCategoryDisplayName(memo.category)}</span>
                <div class="flex items-center gap-2">
                    <span class="memo-priority ${priorityClass}">${memo.priority}</span>
                    <span class="memo-status ${memo.status}">${statusText}</span>
                </div>
            </div>
            <h3 class="memo-title">${memo.title}</h3>
            <div class="memo-meta">
                <div class="memo-meta-item">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                    </svg>
                    <span>${formattedDate}</span>
                </div>
                <div class="memo-meta-item">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                    </svg>
                    <span>${memo.author}</span>
                </div>
            </div>
        </div>
        <div class="memo-card-body">
            <p class="memo-excerpt">${memo.excerpt}</p>            <div class="memo-actions">
                <button class="memo-read-btn" onclick="event.stopPropagation(); window.location.href = 'pages/${memo.filename}'">
                    Read Full Memorandum
                </button>
                <button class="memo-share-btn" onclick="event.stopPropagation(); shareMemo('${memo.id}', '${memo.title.replace(/'/g, "\\'")}', '${memo.filename}')">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function createModal() {
    // Modal functionality replaced with detail page navigation
    // This function is kept for compatibility but may be removed in future updates
}

function openMemoDetail(memoId) {
    // Find the memorandum by ID and navigate to its individual page
    const memo = window.memorandums.find(m => m.id === memoId);
    if (memo) {
        window.location.href = `pages/${memo.filename}`;
    }
}

function openMemoModal(memoId) {
    // Redirect to detail page for backward compatibility
    openMemoDetail(memoId);
}

function closeModal() {
    // Modal functionality replaced with detail page navigation
    // This function is kept for compatibility but may be removed in future updates
}

function shareMemo(memoId, title, filename) {
    const shareUrl = `${window.location.origin}${window.location.pathname.replace('memorandums.html', '')}pages/${filename}`;
    const shareData = {
        title: title,
        text: `Check out this memorandum from the Los Santos Department of Justice: ${title}`,
        url: shareUrl
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback for browsers that don't support native sharing
        navigator.clipboard.writeText(shareUrl).then(() => {
            // Simple notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
            notification.textContent = 'Link copied to clipboard!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }).catch(() => {
            // Fallback: show URL in prompt
            prompt('Copy this link:', shareUrl);
        });
    }
}

function filterMemorandums() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedYear = yearFilter.value;
    
    const filteredMemos = window.memorandums.filter(memo => {
        const matchesSearch = memo.title.toLowerCase().includes(searchTerm) || 
                             memo.excerpt.toLowerCase().includes(searchTerm) ||
                             memo.author.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !selectedCategory || memo.category === selectedCategory;
        
        const matchesYear = !selectedYear || memo.date.startsWith(selectedYear);
        
        return matchesSearch && matchesCategory && matchesYear;
    });
    
    displayMemorandums(filteredMemos);
}

function showEmptyState() {
    emptyState.classList.remove('hidden');
    memorandumsContainer.style.display = 'none';
}

function hideEmptyState() {
    emptyState.classList.add('hidden');
    memorandumsContainer.style.display = 'block';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function getCategoryDisplayName(category) {
    const categoryMap = {
        'policy': 'Policy Update',
        'announcement': 'Announcement', 
        'procedure': 'Procedure',
        'notice': 'Public Notice'
    };
    return categoryMap[category] || category;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.openMemoDetail = openMemoDetail;
window.openMemoModal = openMemoModal; // For backward compatibility
window.closeModal = closeModal; // For backward compatibility
window.shareMemo = shareMemo;
