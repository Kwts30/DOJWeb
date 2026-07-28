/**
 * Los Santos Department of Justice - Official Rules & Bar Association Regulations Data
 */
const rulesData = [
  {
    id: 'rule1',
    title: 'Court Decorum',
    fullTitle: 'Court Decorum and Professional Conduct Guidelines',
    category: 'court',
    icon: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l9-4 9 4v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v20M8 10h8"/></svg>`,
    iconSvg: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l9-4 9 4v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v20M8 10h8"/></svg>`,
    color: 'bg-blue-600',
    description: 'Guidelines governing proper conduct, attire, order, and respect within all San Andreas courtrooms.',
    sections: [
      {
        id: 'decorum-overview',
        title: '1. Standard Demeanor',
        content: `
          <div class="space-y-4">
            <h4 class="text-xl font-bold text-slate-900 font-serif">1.1 Demeanor and Respect</h4>
            <p class="text-slate-700 leading-relaxed">All attorneys, law enforcement officers, defendants, and members of the public present in court shall maintain strict professional decorum. Interrupting presiding judicial officers, outbursting, or speaking out of turn is punishable as Direct Contempt of Court.</p>
            <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <h5 class="font-bold text-amber-900">Mandatory Courtroom Attire</h5>
              <p class="text-amber-800 text-sm mt-1">Attorneys must wear formal business attire (suit & tie or formal dress). Law enforcement officers must wear official dress uniforms. Masks or facial coverings that obscure identity are strictly prohibited unless authorized by the Judicial Council.</p>
            </div>
          </div>
        `
      },
      {
        id: 'decorum-motions',
        title: '2. Speaking & Objections',
        content: `
          <div class="space-y-4">
            <h4 class="text-xl font-bold text-slate-900 font-serif">2.1 Presentation of Evidence & Objections</h4>
            <p class="text-slate-700 leading-relaxed">Attorneys must request permission from the bench before approaching the witness stand or presenting physical evidence. Objections must be stated succinctly with legal grounds (e.g., "Objection, Hearsay" or "Objection, Relevance") without argument until requested by the Judge.</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'rule2',
    title: 'San Andreas Bar Rules',
    fullTitle: 'San Andreas State Bar Association Ethics & Licensing Standards',
    category: 'bar',
    icon: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
    iconSvg: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
    color: 'bg-amber-600',
    description: 'Ethical standards, attorney-client privilege regulations, bar dues, and disciplinary actions for practicing attorneys.',
    sections: [
      {
        id: 'bar-licensing',
        title: '1. Bar Licensing Requirements',
        content: `
          <div class="space-y-4">
            <h4 class="text-xl font-bold text-slate-900 font-serif">1.1 Active Practice Licensure</h4>
            <p class="text-slate-700 leading-relaxed">No individual may represent clients in court or provide paid legal counsel without holding an active San Andreas Bar License in good standing. Practicing without a license constitutes Unauthorized Practice of Law (Felony).</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span class="text-xs font-bold text-blue-600 uppercase">Public Defender Division</span>
                <p class="text-sm font-semibold text-slate-800 mt-1">Appointed counsel for indigent defendants. State funded.</p>
              </div>
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span class="text-xs font-bold text-emerald-600 uppercase">Private Defense Attorney</span>
                <p class="text-sm font-semibold text-slate-800 mt-1">Licensed private advocates registered with the State Bar registry.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'bar-ethics',
        title: '2. Attorney Conduct & Privilege',
        content: `
          <div class="space-y-4">
            <h4 class="text-xl font-bold text-slate-900 font-serif">2.1 Attorney-Client Privilege</h4>
            <p class="text-slate-700 leading-relaxed">All communications between a licensed attorney and client are strictly confidential and privileged. Breach of confidentiality will result in immediate bar disbarment and criminal investigation.</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'rule3',
    title: 'Bail & Release Standards',
    fullTitle: 'Pre-Trial Release, Bail Bonds, & Habeas Corpus Directives',
    category: 'bail',
    icon: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>`,
    iconSvg: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>`,
    color: 'bg-emerald-600',
    description: 'Procedures for setting bail, pre-trial detention limits, and emergency habeas corpus hearings.',
    sections: [
      {
        id: 'bail-schedule',
        title: '1. Bail Hearing Procedures',
        content: `
          <div class="space-y-4">
            <h4 class="text-xl font-bold text-slate-900 font-serif">1.1 Standard Bail Calculation</h4>
            <p class="text-slate-700 leading-relaxed">Bail amounts are calculated based on the statutory Penal Code schedule. Judges or District Attorneys may adjust bail depending on flight risk, criminal record severity, and threat to public safety.</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'rule4',
    title: 'Warrants & Subpoenas',
    fullTitle: 'Search Warrants, Arrest Warrants & Judicial Subpoenas',
    category: 'warrants',
    icon: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`,
    iconSvg: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`,
    color: 'bg-purple-600',
    description: 'Requirements for probable cause, search warrant execution, and judicial subpoena service.',
    sections: [
      {
        id: 'warrant-reqs',
        title: '1. Probable Cause Standard',
        content: `
          <div class="space-y-4">
            <h4 class="text-xl font-bold text-slate-900 font-serif">1.1 Search & Arrest Warrant Approval</h4>
            <p class="text-slate-700 leading-relaxed">All search warrants must detail specific locations, property to be seized, and supported by sworn affidavit demonstrating probable cause. Warrants must be signed by a Judge or Magistrate prior to execution.</p>
          </div>
        `
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.rulesData = rulesData;
}
