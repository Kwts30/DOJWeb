/**
 * Los Santos Department of Justice - Penal Codes & Interactive Charge Calculator
 */

// Penal Codes Database
const penalCodesDatabase = [
  { id: '101', title: 'Title 1', code: 'PC 101', name: 'Treason & Sedition', severity: 'Felony', fine: 50000, sentence: 120, bail: 'No Bail', category: 'title1', desc: 'Attempting to overthrow or subvert the State Government or city authority.' },
  { id: '102', title: 'Title 1', code: 'PC 102', name: 'Terrorism', severity: 'Felony', fine: 75000, sentence: 180, bail: 'No Bail', category: 'title1', desc: 'Committing acts intended to instill terror or mass violence against civilians or government.' },
  
  { id: '201', title: 'Title 2', code: 'PC 201', name: 'Bribery of a Public Official', severity: 'Felony', fine: 15000, sentence: 45, bail: '$30,000', category: 'title2', desc: 'Offering or receiving money/favors to influence official duties.' },
  { id: '202', title: 'Title 2', code: 'PC 202', name: 'Perjury', severity: 'Felony', fine: 10000, sentence: 30, bail: '$20,000', category: 'title2', desc: 'Lying under oath during official court proceedings or sworn affidavits.' },
  { id: '203', title: 'Title 2', code: 'PC 203', name: 'Impersonating an Officer/Public Official', severity: 'Felony', fine: 8000, sentence: 25, bail: '$15,000', category: 'title2', desc: 'Falsely claiming to be a police officer, judge, prosecutor, or government official.' },

  { id: '301', title: 'Title 3', code: 'PC 301', name: 'First Degree Murder', severity: 'Felony', fine: 100000, sentence: 240, bail: 'No Bail', category: 'title3', desc: 'Premeditated, willful killing of a human being.' },
  { id: '302', title: 'Title 3', code: 'PC 302', name: 'Second Degree Murder', severity: 'Felony', fine: 60000, sentence: 150, bail: 'No Bail', category: 'title3', desc: 'Unlawful killing of a human being without premeditation.' },
  { id: '303', title: 'Title 3', code: 'PC 303', name: 'Manslaughter', severity: 'Felony', fine: 35000, sentence: 90, bail: '$50,000', category: 'title3', desc: 'Unlawful killing of a human being without malice or intent.' },
  { id: '304', title: 'Title 3', code: 'PC 304', name: 'Aggravated Assault', severity: 'Felony', fine: 12000, sentence: 35, bail: '$25,000', category: 'title3', desc: 'Assault with a deadly weapon or intention to inflict severe bodily injury.' },
  { id: '305', title: 'Title 3', code: 'PC 305', name: 'Simple Assault & Battery', severity: 'Misdemeanor', fine: 3500, sentence: 15, bail: '$5,000', category: 'title3', desc: 'Unlawful physical contact or attempt to inflict injury.' },
  { id: '306', title: 'Title 3', code: 'PC 306', name: 'Kidnapping / Hostage Taking', severity: 'Felony', fine: 45000, sentence: 100, bail: 'No Bail', category: 'title3', desc: 'Unlawfully seizing, confining, or carrying away a person against their will.' },

  { id: '401', title: 'Title 4', code: 'PC 401', name: 'Armed Robbery', severity: 'Felony', fine: 25000, sentence: 60, bail: '$40,000', category: 'title4', desc: 'Taking property from a person or location using a firearm or dangerous weapon.' },
  { id: '402', title: 'Title 4', code: 'PC 402', name: 'Grand Theft Auto', severity: 'Felony', fine: 10000, sentence: 30, bail: '$20,000', category: 'title4', desc: 'Unlawfully taking or driving a motor vehicle without owner consent.' },
  { id: '403', title: 'Title 4', code: 'PC 403', name: 'Burglary / Breaking & Entering', severity: 'Felony', fine: 8500, sentence: 25, bail: '$15,000', category: 'title4', desc: 'Unlawfully entering a structure or property with intent to commit a crime.' },
  { id: '404', title: 'Title 4', code: 'PC 404', name: 'Petty Theft', severity: 'Misdemeanor', fine: 2000, sentence: 10, bail: '$3,000', category: 'title4', desc: 'Theft of property valued under $2,500.' },
  { id: '405', title: 'Title 4', code: 'PC 405', name: 'Vandalism / Property Destruction', severity: 'Infraction', fine: 1500, sentence: 0, bail: '$1,500', category: 'title4', desc: 'Defacing or damaging public or private property.' },

  { id: '501', title: 'Title 5', code: 'PC 501', name: 'Possession of Illegal Firearms', severity: 'Felony', fine: 15000, sentence: 40, bail: '$25,000', category: 'title5', desc: 'Possession of Class 2/3 automatic weapons or unregistered firearms.' },
  { id: '502', title: 'Title 5', code: 'PC 502', name: 'Weapons Trafficking', severity: 'Felony', fine: 50000, sentence: 120, bail: 'No Bail', category: 'title5', desc: 'Selling or distributing illegal weaponry or explosives.' },
  { id: '503', title: 'Title 5', code: 'PC 503', name: 'Possession of Controlled Substances', severity: 'Misdemeanor', fine: 4000, sentence: 15, bail: '$5,000', category: 'title5', desc: 'Carrying narcotics above personal use limit without prescription.' },
  { id: '504', title: 'Title 5', code: 'PC 504', name: 'Drug Trafficking / Intent to Distribute', severity: 'Felony', fine: 30000, sentence: 75, bail: '$50,000', category: 'title5', desc: 'Manufacturing, transporting, or distributing bulk illicit drugs.' },

  { id: '601', title: 'Title 6', code: 'PC 601', name: 'Speeding (Freeway / City)', severity: 'Infraction', fine: 750, sentence: 0, bail: '$750', category: 'title6', desc: 'Exceeding posted speed limits.' },
  { id: '602', title: 'Title 6', code: 'PC 602', name: 'Reckless Endangerment / Driving', severity: 'Misdemeanor', fine: 3000, sentence: 10, bail: '$4,000', category: 'title6', desc: 'Driving with willful disregard for safety of persons or property.' },
  { id: '603', title: 'Title 6', code: 'PC 603', name: 'Driving Under the Influence (DUI)', severity: 'Misdemeanor', fine: 5000, sentence: 20, bail: '$7,500', category: 'title6', desc: 'Operating a motor vehicle while intoxicated by alcohol or drugs.' },
  { id: '604', title: 'Title 6', code: 'PC 604', name: 'Evading Law Enforcement', severity: 'Felony', fine: 12000, sentence: 35, bail: '$20,000', category: 'title6', desc: 'Fleeing or attempting to elude a pursuing police vehicle.' }
];

// Interactive Charge Calculator Cart State
let selectedCharges = [];

document.addEventListener('DOMContentLoaded', () => {
  renderPenalCodes(penalCodesDatabase);
  initPenalCodeFilters();
  initChargeCalculator();
});

/**
 * Render Penal Code Grid Cards
 */
function renderPenalCodes(codes) {
  const container = document.getElementById('penal-code-container');
  if (!container) return;

  if (codes.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
        <svg class="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-slate-600 font-medium">No matching penal codes found.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = codes.map(pc => {
    const badgeClass = pc.severity === 'Felony' ? 'doj-badge-felony' : (pc.severity === 'Misdemeanor' ? 'doj-badge-misdemeanor' : 'doj-badge-infraction');
    const isAdded = selectedCharges.some(c => c.id === pc.id);

    return `
      <div class="doj-card p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-doj-gold uppercase tracking-wider">${pc.title}</span>
            <span class="${badgeClass}">${pc.severity}</span>
          </div>
          <div class="flex items-baseline justify-between mb-2">
            <h3 class="text-lg font-bold text-slate-900">${pc.code} - ${pc.name}</h3>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">${pc.desc}</p>
        </div>

        <div class="border-t border-slate-100 pt-4 mt-2">
          <div class="grid grid-cols-3 gap-2 text-center text-xs mb-4">
            <div class="bg-slate-50 p-2 rounded-lg">
              <span class="block text-slate-400 font-semibold">FINE</span>
              <span class="font-bold text-slate-800">$${pc.fine.toLocaleString()}</span>
            </div>
            <div class="bg-slate-50 p-2 rounded-lg">
              <span class="block text-slate-400 font-semibold">TIME</span>
              <span class="font-bold text-slate-800">${pc.sentence} Mins</span>
            </div>
            <div class="bg-slate-50 p-2 rounded-lg">
              <span class="block text-slate-400 font-semibold">BAIL</span>
              <span class="font-bold text-slate-800">${pc.bail}</span>
            </div>
          </div>

          <button 
            onclick="toggleCharge('${pc.id}')"
            class="w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
              isAdded 
                ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700' 
                : 'bg-slate-900 text-white hover:bg-doj-gold hover:text-slate-900'
            }"
          >
            <span class="inline-flex items-center">${isAdded ? '<svg class="w-4 h-4 text-white inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Added to Arrest Record' : '<svg class="w-4 h-4 text-white inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg> Add Charge to Calculator'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Filter Penal Codes by Search & Category
 */
function initPenalCodeFilters() {
  const searchInput = document.getElementById('pc-search-input');
  const categoryFilter = document.getElementById('pc-category-filter');
  const severityFilter = document.getElementById('pc-severity-filter');

  function applyFilters() {
    const query = (searchInput?.value || '').toLowerCase();
    const category = categoryFilter?.value || 'all';
    const severity = severityFilter?.value || 'all';

    const filtered = penalCodesDatabase.filter(pc => {
      const matchesSearch = pc.code.toLowerCase().includes(query) || 
                            pc.name.toLowerCase().includes(query) || 
                            pc.desc.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || pc.category === category;
      const matchesSeverity = severity === 'all' || pc.severity.toLowerCase() === severity.toLowerCase();

      return matchesSearch && matchesCategory && matchesSeverity;
    });

    renderPenalCodes(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
  if (severityFilter) severityFilter.addEventListener('change', applyFilters);
}

/**
 * Interactive Charge Calculator
 */
function toggleCharge(codeId) {
  const code = penalCodesDatabase.find(c => c.id === codeId);
  if (!code) return;

  const index = selectedCharges.findIndex(c => c.id === codeId);
  if (index > -1) {
    selectedCharges.splice(index, 1);
    if (window.showToast) window.showToast(`Removed ${code.code} from record`, 'info');
  } else {
    selectedCharges.push(code);
    if (window.showToast) window.showToast(`Added ${code.code} (${code.name}) to record`, 'success');
  }

  updateCalculatorUI();
  // Re-render cards to update button states
  const categoryFilter = document.getElementById('pc-category-filter');
  const searchInput = document.getElementById('pc-search-input');
  if (searchInput || categoryFilter) {
    const query = (searchInput?.value || '').toLowerCase();
    const category = categoryFilter?.value || 'all';
    const filtered = penalCodesDatabase.filter(pc => {
      return (pc.code.toLowerCase().includes(query) || pc.name.toLowerCase().includes(query)) &&
             (category === 'all' || pc.category === category);
    });
    renderPenalCodes(filtered);
  }
}

function updateCalculatorUI() {
  const calcContainer = document.getElementById('charge-calculator');
  if (!calcContainer) return;

  const countBadge = document.getElementById('calc-count');
  const totalFineEl = document.getElementById('calc-total-fine');
  const totalTimeEl = document.getElementById('calc-total-time');
  const selectedListEl = document.getElementById('calc-selected-list');

  const totalFine = selectedCharges.reduce((sum, c) => sum + c.fine, 0);
  const totalTime = selectedCharges.reduce((sum, c) => sum + c.sentence, 0);

  if (countBadge) countBadge.textContent = selectedCharges.length;
  if (totalFineEl) totalFineEl.textContent = `$${totalFine.toLocaleString()}`;
  if (totalTimeEl) totalTimeEl.textContent = `${totalTime} Mins`;

  if (selectedListEl) {
    if (selectedCharges.length === 0) {
      selectedListEl.innerHTML = `<p class="text-sm text-slate-400 italic">No charges selected yet. Click "+ Add Charge" on any penal code above.</p>`;
    } else {
      selectedListEl.innerHTML = selectedCharges.map(c => `
        <div class="flex items-center justify-between p-2.5 bg-slate-800 rounded-lg text-xs text-slate-200">
          <div>
            <span class="font-bold text-doj-gold">${c.code}</span> - ${c.name}
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-slate-400">$${c.fine.toLocaleString()} | ${c.sentence}m</span>
            <button onclick="toggleCharge('${c.id}')" class="text-red-400 hover:text-red-300 font-bold ml-2 inline-flex items-center"><svg class="w-4 h-4 text-red-400 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
          </div>
        </div>
      `).join('');
    }
  }
}

function copyChargeString() {
  if (selectedCharges.length === 0) {
    if (window.showToast) window.showToast('No charges selected to copy', 'warning');
    return;
  }

  const chargeNames = selectedCharges.map(c => `${c.code} (${c.name})`).join(', ');
  const totalFine = selectedCharges.reduce((sum, c) => sum + c.fine, 0);
  const totalTime = selectedCharges.reduce((sum, c) => sum + c.sentence, 0);

  const formattedString = `CHARGES: ${chargeNames} | TOTAL FINE: $${totalFine.toLocaleString()} | SENTENCE: ${totalTime} Mins`;

  navigator.clipboard.writeText(formattedString).then(() => {
    if (window.showToast) window.showToast('Copied Indictment Charge String to clipboard!', 'success');
  });
}

function clearCalculator() {
  selectedCharges = [];
  updateCalculatorUI();
  renderPenalCodes(penalCodesDatabase);
  if (window.showToast) window.showToast('Cleared charge calculator', 'info');
}

window.toggleCharge = toggleCharge;
window.copyChargeString = copyChargeString;
window.clearCalculator = clearCalculator;
