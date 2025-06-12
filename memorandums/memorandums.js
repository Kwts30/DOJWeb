// Memorandums Page JavaScript

// Sample memorandum data - In a real application, this would come from a database/API
const memorandums = [
    {
        id: 2,
        title: "DIRECTIVE ON FACIAL COVERINGS FOR ENHANCED PUBLIC SAFETY AND IDENTIFICATION IN PUBLIC AND GOVERNMENT ESTABLISHMENTS",
        excerpt: "Judicial directive issued to clarify and reinforce the imperative for unobstructed facial identification within public and government establishments in Los Santos.",
        category: "policy",
        priority: "high",
        date: "2025-05-30",
        author: "The Honorable Kawatskie Delos Reyes, Chief Justice",
        status: "active",
        memorandumNumber: "JD-2025-001",
        content: `
            <div class="official-header mb-6 p-4 bg-gray-50 border-l-4 border-blue-500">
                <div class="flex items-center mb-2">
                    <img src="../assets/doj-seal.png" alt="DOJ Seal" class="h-12 w-12 mr-3">
                    <div>
                        <h2 class="text-lg font-bold text-doj-brown">DEPARTMENT OF JUSTICE</h2>
                        <p class="text-sm text-gray-600">STATE OF SAN ANDREAS</p>
                        <p class="text-xs text-gray-500">CITY OF LOS SANTOS | ROCKFORD HILLS, CITY HALL</p>
                    </div>
                </div>
                <div class="mt-4 text-sm">
                    <p><strong>IN THE SUPERIOR COURT OF LOS SANTOS JUDICIAL DISTRICT OF SAN ANDREAS</strong></p>
                    <p><strong>JUDICIAL DIRECTIVE</strong></p>
                    <p><strong>ISSUED BY THE OFFICE OF THE CHIEF JUSTICE</strong></p>
                    <p class="mt-2"><strong>DATE:</strong> May 30, 2025</p>
                </div>
            </div>

            <h3 class="text-xl font-bold text-center mb-6 text-blue-600">DIRECTIVE ON FACIAL COVERINGS FOR ENHANCED PUBLIC SAFETY AND IDENTIFICATION IN PUBLIC AND GOVERNMENT ESTABLISHMENTS</h3>
            
            <div class="mb-6">
                <p><strong>TO:</strong> All Law Enforcement Agencies, Public and Private Security Services, and Operators of Public and Government Establishments within the Jurisdiction of Los Santos.</p>
                <p class="mt-2"><strong>FROM:</strong> The Honorable Kawatskie Delos Reyes, Chief Justice, Superior Court of Los Santos</p>
            </div>
            
            <h4 class="font-bold mb-3">I. PURPOSE OF THIS DIRECTIVE</h4>
            <p class="mb-4">This Judicial Directive is issued to clarify and reinforce the imperative for unobstructed facial identification within public and government establishments in Los Santos. The Court recognizes the paramount importance of public safety, the deterrence of illicit activities, and the efficient administration of justice, all of which are significantly aided by the clear identification of individuals in public spaces. This Directive aims to provide guidance on the reasonable expectation of facial visibility while respecting legitimate exceptions.</p>
            
            <h4 class="font-bold mb-3">II. DEFINITIONS FOR THE APPLICATION OF THIS DIRECTIVE</h4>
            <p class="mb-2">For the purposes of this Directive:</p>
            <ul class="list-disc pl-6 mb-4">
                <li><strong>A. "Facial Covering":</strong> Any item, garment, or material worn over the face that substantially obscures the full facial features (eyes, nose, mouth, and chin) of an individual, thereby impeding clear identification. This specifically includes, but is not limited to, ski masks, balaclavas, costume masks, or any non-medical mask designed to conceal identity.</li>
                <li><strong>B. "Public Establishment":</strong> Any commercial, recreational, or service-oriented building or facility, or portion thereof, accessible to the general public (e.g., retail stores, banks, entertainment venues, private transportation hubs).</li>
                <li><strong>C. "Government Establishment":</strong> Any building or facility, or portion thereof, owned or operated by the City of Los Santos, the State of San Andreas, or the Federal Government, where public services are rendered or official functions are conducted (e.g., courthouses, city halls, public libraries, government offices).</li>
                <li><strong>D. "Surgical Mask":</strong> A standard, loose-fitting, disposable medical mask primarily designed to create a barrier against respiratory droplets.</li>
            </ul>
            
            <h4 class="font-bold mb-3">III. JUDICIAL EXPECTATION REGARDING FACIAL IDENTIFICATION</h4>
            <p class="mb-4">It is the expectation of this Court that, within Public and Government Establishments, individuals shall present their full facial features for identification upon entry and while present within such premises. This expectation is grounded in the necessity for security, accountability, and the effective operation of public and commercial spaces.</p>
            
            <h4 class="font-bold mb-3">IV. GUIDANCE ON APPLICATION AND EXEMPTIONS</h4>
            <p class="mb-2">While the general expectation is for unobstructed facial identification, this Directive acknowledges and provides for the following specific exemptions:</p>
            <ul class="list-disc pl-6 mb-4">
                <li><strong>A. Surgical Masks:</strong> The wearing of a Surgical Mask is explicitly permitted and shall not be considered a violation of the principle of facial identification as outlined herein.</li>
                <li><strong>B. Religious or Cultural Head Coverings:</strong> Facial coverings worn as an integral part of a genuine religious or cultural practice are permitted, provided they are not primarily utilized to obscure identity for illicit purposes.</li>
                <li><strong>C. Law Enforcement and Emergency Personnel:</strong> Uniformed law enforcement officers, emergency medical personnel, and firefighters acting in the course of their official duties, where the facial covering is part of their standard protective equipment or uniform.</li>
                <li><strong>D. Officially Sanctioned Events:</strong> Participants in officially sanctioned parades, theatrical performances, costume events, or similar activities where a facial covering is integral to the event's nature, provided that such coverings are removed upon reasonable request for identification by security or law enforcement.</li>
                <li><strong>E. Documented Medical Conditions:</strong> Individuals with a documented medical condition necessitating a non-surgical facial covering, where reasonable accommodation can be made without compromising security.</li>
            </ul>
            
            <h4 class="font-bold mb-3">V. ENFORCEMENT AND COMPLIANCE</h4>
            <p class="mb-4">Operators of Public and Government Establishments, along with their security personnel, are hereby encouraged to implement reasonable measures to ensure compliance with the spirit of this Directive. Law enforcement agencies and authorized security personnel are empowered to request individuals to remove facial coverings that impede identification in accordance with this Directive.</p>
            
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p class="text-yellow-800"><strong>Failure to comply with such a lawful and reasonable request for identification by an authorized law enforcement officer or security personnel may constitute a misdemeanor violation, which may lead to further legal action, including but not limited to, charges of trespass, obstruction, or other applicable offenses under the laws of the City of Los Santos or the State of San Andreas.</strong></p>
            </div>
            
            <p class="mb-4">Individuals who refuse to comply with a lawful request for identification or to leave the premises when directed may be subject to arrest and prosecution as per applicable statutes. This Directive underscores the expectation of cooperation with legitimate security and identification protocols.</p>
            
            <h4 class="font-bold mb-3">VI. JUDICIAL REVIEW</h4>
            <p class="mb-4">This Directive serves as guidance for the application of existing laws and principles related to public order and safety. Any challenges to the application of this Directive in specific instances shall be subject to judicial review by the appropriate courts.</p>
            
            <h4 class="font-bold mb-3">VII. EFFECTIVE DATE</h4>
            <p class="mb-6">This Judicial Directive is effective immediately upon issuance.</p>
            
            <div class="signature-section mt-8 text-center">
                <div class="mb-4">
                    <img src="../assets/doj-seal.png" alt="Official Seal" class="h-16 w-16 mx-auto opacity-50">
                </div>
                <div class="signature-line mb-2">
                    <p class="font-bold">Hon. Kawatskie Delos Reyes</p>
                    <p class="text-sm">Chief Justice</p>
                    <p class="text-sm">Superior Court of San Andreas</p>
                </div>
            </div>
        `
    },
    {
        id: 1,
        title: "IMMEDIATE APPREHENSION OF HIGH-ALERT SUBJECTS FRANK BOMPENSIERO AND LUCIANO D'ANGELO",
        excerpt: "Urgent directive regarding the immediate apprehension of Mr. Frank Bompensiero and Mr. Luciano D'Angelo - high alert subjects involved in attempted murder of a Law Enforcement Officer.",
        category: "announcement",
        priority: "high",
        date: "2025-06-08",
        author: "Department of Justice (DOJ)",
        status: "active",
        memorandumNumber: "DOJ-SC-001",
        content: `
            <div class="official-header mb-6 p-4 bg-gray-50 border-l-4 border-red-500">
                <div class="flex items-center mb-2">
                    <img src="../assets/doj-seal.png" alt="DOJ Seal" class="h-12 w-12 mr-3">
                    <div>
                        <h2 class="text-lg font-bold text-doj-brown">DEPARTMENT OF JUSTICE</h2>
                        <p class="text-sm text-gray-600">STATE OF SAN ANDREAS</p>
                        <p class="text-xs text-gray-500">CITY OF LOS SANTOS | ROCKFORD HILLS, CITY HALL</p>
                    </div>
                </div>
                <div class="mt-4 text-sm">
                    <p><strong>MEMORANDUM NO:</strong> DOJ-SC-001</p>
                    <p><strong>STATE OF LOS SANTOS</strong></p>
                    <p class="mt-2"><strong>TO:</strong> Los Santos Police Department (LSPD)</p>
                    <p><strong>FROM:</strong> Department of Justice (DOJ)</p>
                    <p><strong>DATE:</strong> June 8, 2025</p>
                </div>
            </div>

            <h3 class="text-xl font-bold text-center mb-6 text-red-600">IMMEDIATE APPREHENSION OF HIGH-ALERT SUBJECTS FRANK BOMPENSIERO AND LUCIANO D'ANGELO</h3>
            
            <p class="mb-4">This memorandum reiterates and formalizes an urgent directive regarding the immediate apprehension of Mr. Frank Bompensiero and Mr. Luciano D'Angelo.</p>
            
            <p class="mb-4">These individuals are designated as subjects of high alert within the Department of Justice. This designation stems from their direct and confirmed involvement in the attempted murder of a Law Enforcement Officer, as documented under criminal case number <strong>DOJ-CCN2025-001</strong>. A new, related warrant for their arrest, <strong>DOJ-CCN2025-002</strong>, has been issued to facilitate their capture and bring them to justice.</p>
            
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <h4 class="font-bold text-yellow-800 mb-2">⚠️ HIGH PRIORITY DIRECTIVE</h4>
                <p class="text-yellow-700">All Los Santos Police Department personnel are hereby ordered to undertake any and all necessary actions, strictly in accordance with applicable laws and established departmental protocols, to locate and apprehend Mr. Frank Bompensiero and Mr. Luciano D'Angelo.</p>
            </div>
            
            <h4 class="font-bold mb-3">Case Details:</h4>
            <ul class="list-disc pl-6 mb-4">
                <li><strong>Primary Case Number:</strong> DOJ-CCN2025-001</li>
                <li><strong>Related Warrant:</strong> DOJ-CCN2025-002</li>
                <li><strong>Charges:</strong> Attempted Murder of a Law Enforcement Officer</li>
                <li><strong>Alert Level:</strong> HIGH</li>
            </ul>
            
            <h4 class="font-bold mb-3">Subjects:</h4>
            <ul class="list-disc pl-6 mb-4">
                <li><strong>Frank Bompensiero</strong> - High Alert Subject</li>
                <li><strong>Luciano D'Angelo</strong> - High Alert Subject</li>
            </ul>
            
            <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <h4 class="font-bold text-red-800 mb-2">🚨 OFFICER SAFETY NOTICE</h4>
                <p class="text-red-700">Their prompt apprehension is paramount for the safety and security of our officers and the public, and it is essential for the effective administration of justice in Los Santos.</p>
            </div>
            
            <h4 class="font-bold mb-3">Departmental Requirements:</h4>
            <ul class="list-disc pl-6 mb-6">
                <li>All LSPD personnel must prioritize the location and apprehension of these subjects</li>
                <li>Actions must be taken in strict accordance with applicable laws</li>
                <li>All operations must follow established departmental protocols</li>
                <li>Immediate reporting of any sightings or leads to command</li>
                <li>Coordinate with DOJ for all arrest procedures</li>
            </ul>
            
            <div class="signature-section mt-8 text-center">
                <div class="mb-4">
                    <img src="../assets/doj-seal.png" alt="Official Seal" class="h-16 w-16 mx-auto opacity-50">
                </div>
                <div class="signature-line mb-2">
                    <p class="font-bold">Hon. Kawatskie Delos Reyes</p>
                    <p class="text-sm">Chief Justice</p>
                    <p class="text-sm">Superior Court of San Andreas</p>
                </div>
            </div>
        `
    }
];

// DOM elements
let memorandumsContainer;
let searchInput;
let categoryFilter;
let yearFilter;
let loadingState;
let emptyState;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {    // Get DOM elements
    memorandumsContainer = document.getElementById('memorandums-container');
    searchInput = document.getElementById('memo-search');
    categoryFilter = document.getElementById('memo-category');
    yearFilter = document.getElementById('memo-year');
    loadingState = document.getElementById('loading-state');
    emptyState = document.getElementById('empty-state');
    
    // Setup event listeners
    setupEventListeners();
    
    // Load memorandums
    setTimeout(() => {
        loadMemorandums(memorandums);
    }, 1000); // Simulate loading time
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

function loadMemorandums(memos) {
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
    card.onclick = () => openMemoDetail(memo.id);
    
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
                <button class="memo-read-btn" onclick="openMemoDetail(${memo.id})">
                    Read Full Memorandum
                </button>
                <button class="memo-share-btn" onclick="event.stopPropagation(); shareMemo(${memo.id})">
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
    // Navigate to the detail page with the memo ID as a parameter
    window.location.href = `memorandum-detail.html?id=${memoId}`;
}

function openMemoModal(memoId) {
    // Redirect to detail page for backward compatibility
    openMemoDetail(memoId);
}

function closeModal() {
    // Modal functionality replaced with detail page navigation
    // This function is kept for compatibility but may be removed in future updates
}

function shareMemo(memoId) {
    const memo = memorandums.find(m => m.id === memoId);
    if (!memo) return;
    
    const shareUrl = `${window.location.origin}${window.location.pathname.replace('memorandums.html', '')}memorandum-detail.html?id=${memoId}`;
    const shareData = {
        title: memo.title,
        text: memo.excerpt,
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
        });
    }
}

function filterMemorandums() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedYear = yearFilter.value;
    
    const filteredMemos = memorandums.filter(memo => {
        const matchesSearch = memo.title.toLowerCase().includes(searchTerm) || 
                             memo.excerpt.toLowerCase().includes(searchTerm) ||
                             memo.author.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !selectedCategory || memo.category === selectedCategory;
        
        const matchesYear = !selectedYear || memo.date.startsWith(selectedYear);
        
        return matchesSearch && matchesCategory && matchesYear;
    });
    
    loadMemorandums(filteredMemos);
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
