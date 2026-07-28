// Memorandum Detail Page JavaScript

// Get URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get memorandum ID from URL
function getMemorandumId() {
    const pathParts = window.location.pathname.split('/');
    const filename = pathParts[pathParts.length - 1];
    return filename.replace('.html', '');
}

// Load memorandum data from JSON
async function loadMemorandumData() {
    try {
        const response = await fetch('../data/memorandums.json');
        const data = await response.json();
        return data.memorandums;
    } catch (error) {
        console.error('Error loading memorandum data:', error);
        return [];
    }
}

// Find specific memorandum by ID or filename
function findMemorandum(memorandums, id) {
    return memorandums.find(memo => 
        memo.id === id || 
        memo.filename === id + '.html' || 
        memo.slug === id
    );
}

// Format date for display
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Get priority badge color
function getPriorityColor(priority) {
    switch (priority.toLowerCase()) {
        case 'high':
            return 'bg-red-100 text-red-800';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'low':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

// Get category badge color
function getCategoryColor(category) {
    switch (category.toLowerCase()) {
        case 'policy':
            return 'bg-blue-100 text-blue-800';
        case 'procedure':
            return 'bg-purple-100 text-purple-800';
        case 'notice':
            return 'bg-orange-100 text-orange-800';
        case 'announcement':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

// Update page title and meta information
function updatePageMeta(memorandum) {
    document.title = `${memorandum.title} - Los Santos Department of Justice`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', memorandum.excerpt);
    } else {
        const newMeta = document.createElement('meta');
        newMeta.name = 'description';
        newMeta.content = memorandum.excerpt;
        document.head.appendChild(newMeta);
    }
}

// Populate memorandum details
function populateMemorandumDetails(memorandum) {
    // Update breadcrumb
    document.getElementById('memo-breadcrumb').textContent = memorandum.title;
    
    // Update header information
    document.getElementById('memo-category').textContent = memorandum.category.charAt(0).toUpperCase() + memorandum.category.slice(1);
    document.getElementById('memo-category').className = `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(memorandum.category)}`;
    
    document.getElementById('memo-priority').textContent = memorandum.priority.charAt(0).toUpperCase() + memorandum.priority.slice(1) + ' Priority';
    document.getElementById('memo-priority').className = `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(memorandum.priority)}`;
    
    document.getElementById('memo-title').textContent = memorandum.title;
    document.getElementById('memo-date').textContent = formatDate(memorandum.date);
    document.getElementById('memo-author').textContent = memorandum.author;
    document.getElementById('memo-number').textContent = memorandum.memorandumNumber;
}

// Load memorandum content
async function loadMemorandumContent(memorandum) {
    try {
        const response = await fetch(`../content/${memorandum.filename}`);
        if (response.ok) {
            const content = await response.text();
            document.getElementById('memo-content').innerHTML = content;
        } else {
            // Fallback content if file doesn't exist
            document.getElementById('memo-content').innerHTML = `
                <div class="text-center py-8">
                    <p class="text-gray-600 mb-4">This memorandum content is being prepared and will be available soon.</p>
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="text-lg font-semibold mb-2">${memorandum.title}</h3>
                        <p class="text-gray-700">${memorandum.excerpt}</p>
                        <div class="mt-4 text-sm text-gray-500">
                            <p><strong>Document Number:</strong> ${memorandum.memorandumNumber}</p>
                            <p><strong>Date:</strong> ${formatDate(memorandum.date)}</p>
                            <p><strong>Author:</strong> ${memorandum.author}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading memorandum content:', error);
        document.getElementById('memo-content').innerHTML = `
            <div class="text-center py-8">
                <p class="text-red-600 mb-4">Error loading memorandum content. Please try again later.</p>
            </div>
        `;
    }
}

// Load related documents
function loadRelatedDocuments(memorandums, currentMemo) {
    const relatedDocs = memorandums
        .filter(memo => memo.id !== currentMemo.id && memo.category === currentMemo.category)
        .slice(0, 4);
    
    const relatedContainer = document.getElementById('related-docs');
    
    if (relatedDocs.length === 0) {
        relatedContainer.innerHTML = '<p class="text-gray-600 text-center col-span-2">No related documents found.</p>';
        return;
    }
    
    relatedContainer.innerHTML = relatedDocs.map(memo => `
        <div class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(memo.category)}">
                    ${memo.category.charAt(0).toUpperCase() + memo.category.slice(1)}
                </span>
                <span class="text-xs text-gray-500">${formatDate(memo.date)}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">${memo.title}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">${memo.excerpt}</p>
            <a href="${memo.filename}" class="inline-flex items-center text-doj-brown hover:text-[#2c1810] font-medium text-sm">
                Read More
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </a>
        </div>
    `).join('');
}

// Share memorandum function
function shareMemorandum() {
    const url = window.location.href;
    const title = document.getElementById('memo-title').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this memorandum from the Los Santos Department of Justice: ${title}`,
            url: url
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        }).catch(() => {
            // Fallback: show URL in prompt
            prompt('Copy this link:', url);
        });
    }
}

// Initialize page
async function initializePage() {
    const memoId = getMemorandumId();
    const memorandums = await loadMemorandumData();
    const memorandum = findMemorandum(memorandums, memoId);
    
    if (!memorandum) {
        document.getElementById('memo-content').innerHTML = `
            <div class="text-center py-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Memorandum Not Found</h2>
                <p class="text-gray-600 mb-4">The requested memorandum could not be found.</p>
                <a href="../memorandums.html" class="inline-flex items-center text-doj-brown hover:text-[#2c1810] font-medium">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                    Back to Memorandums
                </a>
            </div>
        `;
        return;
    }
    
    updatePageMeta(memorandum);
    populateMemorandumDetails(memorandum);
    await loadMemorandumContent(memorandum);
    loadRelatedDocuments(memorandums, memorandum);
}

// Add CSS for line clamping
const style = document.createElement('style');
style.textContent = `
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .prose {
        max-width: none;
    }
    .prose h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #2c1810;
    }
    .prose h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: #2c1810;
    }
    .prose h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #2c1810;
    }
    .prose p {
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    .prose ul, .prose ol {
        margin-bottom: 1rem;
        padding-left: 1.5rem;
    }
    .prose li {
        margin-bottom: 0.5rem;
    }
    .prose strong {
        font-weight: 600;
    }
    .prose .official-header {
        border-left: 4px solid #3b82f6;
        background-color: #f9fafb;
        padding: 1rem;
        margin-bottom: 1.5rem;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
