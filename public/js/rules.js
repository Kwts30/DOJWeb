/**
 * Los Santos Department of Justice - Rules & Regulations Renderer
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rulesData !== 'undefined') {
    renderRulesCards(rulesData);
    initRulesFilter();
  }
});

/**
 * Render Rules Grid Cards
 */
function renderRulesCards(rules) {
  const container = document.getElementById('rules-grid');
  if (!container) return;

  container.innerHTML = rules.map(rule => `
    <div class="doj-card p-6 flex flex-col justify-between cursor-pointer" onclick="openRuleModal('${rule.id}')">
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl ${rule.color} text-white flex items-center justify-center shadow-md">
            ${rule.iconSvg || rule.icon}
          </div>
          <span class="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">${rule.category}</span>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">${rule.title}</h3>
        <p class="text-slate-600 text-sm leading-relaxed mb-4">${rule.description}</p>
      </div>

      <div class="border-t border-slate-100 pt-4 flex items-center justify-between text-doj-gold hover:text-amber-600 font-semibold text-sm">
        <span>Read Full Regulation</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  `).join('');
}

/**
 * Open Rule Modal with Section Tabs
 */
function openRuleModal(ruleId) {
  const rule = rulesData.find(r => r.id === ruleId);
  if (!rule) return;

  const modal = document.getElementById('rule-modal');
  const titleEl = document.getElementById('modal-rule-title');
  const categoryEl = document.getElementById('modal-rule-category');
  const tabsContainer = document.getElementById('modal-rule-tabs');
  const contentEl = document.getElementById('modal-rule-content');

  if (!modal) return;

  if (titleEl) titleEl.textContent = rule.fullTitle;
  if (categoryEl) categoryEl.textContent = rule.category.toUpperCase();

  // Render Tabs
  if (tabsContainer) {
    tabsContainer.innerHTML = rule.sections.map((sec, idx) => `
      <button 
        onclick="switchRuleTab('${sec.id}')"
        id="tab-btn-${sec.id}"
        class="rule-tab-btn px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
          idx === 0 
            ? 'bg-slate-900 text-white shadow' 
            : 'text-slate-600 hover:bg-slate-100'
        }"
      >
        ${sec.title}
      </button>
    `).join('');
  }

  // Render Initial Tab Content
  if (contentEl && rule.sections.length > 0) {
    window.currentModalSections = rule.sections;
    contentEl.innerHTML = rule.sections[0].content;
  }

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

/**
 * Switch Active Rule Tab
 */
function switchRuleTab(sectionId) {
  if (!window.currentModalSections) return;
  const section = window.currentModalSections.find(s => s.id === sectionId);
  const contentEl = document.getElementById('modal-rule-content');

  if (section && contentEl) {
    contentEl.innerHTML = section.content;

    document.querySelectorAll('.rule-tab-btn').forEach(btn => {
      btn.classList.remove('bg-slate-900', 'text-white', 'shadow');
      btn.classList.add('text-slate-600', 'hover:bg-slate-100');
    });

    const activeBtn = document.getElementById(`tab-btn-${sectionId}`);
    if (activeBtn) {
      activeBtn.classList.remove('text-slate-600', 'hover:bg-slate-100');
      activeBtn.classList.add('bg-slate-900', 'text-white', 'shadow');
    }
  }
}

/**
 * Close Rule Modal
 */
function closeRuleModal() {
  const modal = document.getElementById('rule-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

/**
 * Rules Filter
 */
function initRulesFilter() {
  const searchInput = document.getElementById('rules-search-input');
  const categoryFilter = document.getElementById('rules-category-filter');

  function applyFilters() {
    const query = (searchInput?.value || '').toLowerCase();
    const category = categoryFilter?.value || 'all';

    const filtered = rulesData.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(query) || 
                            r.description.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || r.category === category;
      return matchesSearch && matchesCategory;
    });

    renderRulesCards(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
}

window.openRuleModal = openRuleModal;
window.closeRuleModal = closeRuleModal;
window.switchRuleTab = switchRuleTab;
