/**
 * Los Santos Department of Justice - Staff Directory & Leadership Roster
 */

const staffData = [
  { id: 1, name: 'Arthur Pendelton', title: 'Chief Justice', department: 'Judiciary', rank: 'Leadership', status: 'Active', logo: 'assets/doj-seal.png', bio: 'Presiding Justice over the Supreme Court of San Andreas.', contact: 'a.pendelton@doj.ls.gov' },
  { id: 2, name: 'Eleanor Vance', title: 'Associate Justice', department: 'Judiciary', rank: 'Senior', status: 'Active', logo: 'assets/doj-seal.png', bio: 'Senior Magistrate specializing in Appellate review & Constitutional law.', contact: 'e.vance@doj.ls.gov' },
  { id: 3, name: 'Marcus Sterling', title: 'District Attorney', department: 'District Attorney', rank: 'Leadership', status: 'Active', logo: 'assets/da-logo.webp', bio: 'Head of Prosecutorial Operations & Chief State Attorney.', contact: 'm.sterling@da.ls.gov' },
  { id: 4, name: 'Julian Vance', title: 'Chief Public Defender', department: 'Public Attorney', rank: 'Leadership', status: 'Active', logo: 'assets/public-attorney-logo.png', bio: 'Oversees court-appointed defense counsel for indigent defendants.', contact: 'j.vance@pdo.ls.gov' },
  { id: 5, name: 'Victoria Blake', title: 'Senior Deputy District Attorney', department: 'District Attorney', rank: 'Senior', status: 'Active', logo: 'assets/da-logo.webp', bio: 'Lead prosecutor for Organized Crime & Gang Taskforce indictments.', contact: 'v.blake@da.ls.gov' },
  { id: 6, name: 'Harrison Forde', title: 'Licensed Defense Attorney', department: 'Private Lawyers', rank: 'Bar Member', status: 'Active Bar License', logo: 'assets/sanandreaslogo.png', bio: 'Licensed Private Defense Counsel registered with the San Andreas State Bar.', contact: 'h.forde@lsbar.org' }
];

document.addEventListener('DOMContentLoaded', () => {
  renderStaff(staffData);
  initStaffFilter();
});

function renderStaff(staffList) {
  const container = document.getElementById('staff-grid');
  if (!container) return;

  container.innerHTML = staffList.map(person => {
    let deptBadgeColor = 'bg-slate-900 text-doj-gold';
    if (person.department === 'District Attorney') deptBadgeColor = 'bg-red-950 text-red-200 border border-red-800';
    if (person.department === 'Public Attorney') deptBadgeColor = 'bg-teal-950 text-teal-200 border border-teal-800';
    if (person.department === 'Private Lawyers') deptBadgeColor = 'bg-amber-950 text-amber-200 border border-amber-800';

    return `
      <div class="doj-card p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <img src="${person.logo}" alt="${person.department} Logo" class="h-10 w-10 object-contain drop-shadow">
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${deptBadgeColor}">${person.department}</span>
            </div>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              ● ${person.status}
            </span>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-1">${person.name}</h3>
          <p class="text-doj-gold font-semibold text-sm mb-3">${person.title}</p>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">${person.bio}</p>
        </div>

        <div class="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
          <span class="font-mono text-slate-700 font-medium">${person.contact}</span>
          <span class="font-bold text-slate-400">${person.rank}</span>
        </div>
      </div>
    `;
  }).join('');
}

function initStaffFilter() {
  const searchInput = document.getElementById('staff-search-input');
  const deptFilter = document.getElementById('staff-dept-filter');

  function applyFilter() {
    const query = (searchInput?.value || '').toLowerCase();
    const dept = deptFilter?.value || 'all';

    const filtered = staffData.filter(s => {
      const matchesQuery = s.name.toLowerCase().includes(query) || s.title.toLowerCase().includes(query);
      const matchesDept = dept === 'all' || s.department.toLowerCase() === dept.toLowerCase();
      return matchesQuery && matchesDept;
    });

    renderStaff(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilter);
  if (deptFilter) deptFilter.addEventListener('change', applyFilter);
}
