/**
 * Los Santos Department of Justice - Court Dockets & Public Legal Services
 */

const docketsDatabase = [
  { caseNo: 'CR-2025-0841', title: 'State of San Andreas v. Joseph Miller', type: 'Criminal Trial', court: 'District Court Div. 1', judge: 'Arthur Pendelton', status: 'Scheduled', date: '2025-08-12 14:00', summary: 'Felony Arm Robbery & Weapons Charges.' },
  { caseNo: 'CR-2025-0839', title: 'State of San Andreas v. Marcus Vance', type: 'Appellate Hearing', court: 'Supreme Court', judge: 'Eleanor Vance', status: 'In Deliberation', date: '2025-08-10 16:30', summary: 'Constitutional challenge regarding search warrant scope.' },
  { caseNo: 'CV-2025-0104', title: 'Los Santos Transport Co. v. City Council', type: 'Civil Lawsuit', court: 'Superior Court', judge: 'Arthur Pendelton', status: 'Pleadings Open', date: '2025-08-20 10:00', summary: 'Breach of municipal service contract.' }
];

const warrantsDatabase = [
  { id: 'W-9021', suspect: 'Damian "Ghost" Ray', offense: 'PC 301 - Murder 1st Degree', bail: 'No Bail', issuedBy: 'Judge Pendelton', status: 'ACTIVE BENCH WARRANT' },
  { id: 'W-8874', suspect: 'Travis Sterling', offense: 'PC 504 - Drug Trafficking', bail: '$50,000', issuedBy: 'Judge Vance', status: 'ACTIVE BENCH WARRANT' },
  { id: 'W-8812', suspect: 'Carlos Mendez', offense: 'PC 203 - Impersonating Officer', bail: '$15,000', issuedBy: 'DA Office', status: 'ACTIVE BENCH WARRANT' }
];

document.addEventListener('DOMContentLoaded', () => {
  renderDockets(docketsDatabase);
  renderWarrants(warrantsDatabase);
  initDocketFilters();
});

function renderDockets(dockets) {
  const container = document.getElementById('dockets-container');
  if (!container) return;

  container.innerHTML = dockets.map(d => `
    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="font-mono text-xs font-bold text-doj-gold px-2.5 py-1 bg-slate-900 rounded-md">${d.caseNo}</span>
          <span class="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">${d.status}</span>
        </div>
        <h4 class="font-bold text-slate-900 mb-1">${d.title}</h4>
        <p class="text-xs text-slate-500 mb-3">${d.court} | Presiding: ${d.judge}</p>
        <p class="text-slate-600 text-sm mb-4 leading-relaxed">${d.summary}</p>
      </div>

      <div class="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
        <span class="inline-flex items-center gap-1"><span class="material-icons text-slate-400 text-sm">calendar_today</span> ${d.date}</span>
        <button onclick="viewCaseDetail('${d.caseNo}')" class="text-slate-900 hover:text-doj-gold font-bold">View Docket →</button>
      </div>
    </div>
  `).join('');
}

function renderWarrants(warrants) {
  const container = document.getElementById('warrants-container');
  if (!container) return;

  container.innerHTML = warrants.map(w => `
    <div class="bg-red-50/50 p-4 rounded-xl border border-red-200 flex items-center justify-between">
      <div>
        <div class="flex items-center space-x-2 mb-1">
          <span class="text-xs font-bold font-mono text-red-800 bg-red-100 px-2 py-0.5 rounded">${w.id}</span>
          <span class="text-xs font-bold text-red-600 uppercase tracking-wide">${w.status}</span>
        </div>
        <h5 class="font-bold text-slate-900">${w.suspect}</h5>
        <p class="text-xs text-slate-600">${w.offense} | Bail: ${w.bail}</p>
      </div>
      <span class="text-xs text-slate-400 font-medium">Issued by: ${w.issuedBy}</span>
    </div>
  `).join('');
}

function initDocketFilters() {
  const searchInput = document.getElementById('docket-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      const filtered = docketsDatabase.filter(d => 
        d.caseNo.toLowerCase().includes(q) || 
        d.title.toLowerCase().includes(q) || 
        d.judge.toLowerCase().includes(q)
      );
      renderDockets(filtered);
    });
  }
}

function viewCaseDetail(caseNo) {
  if (window.showToast) window.showToast(`Loading public record file for ${caseNo}...`, 'info');
}

window.viewCaseDetail = viewCaseDetail;
