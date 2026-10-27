import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileCheck, Search, Eye, X, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';

export default function AdminApplications() {
  const { applications, updateApplicationStatus } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);

  const filteredApps = applications.filter((a) => {
    const matchSearch =
      a.candidateName.toLowerCase().includes(search.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Job & Faculty Applications</h2>
          <p className="text-xs text-slate-500">
            Review submitted resumes, filter candidate qualifications, and schedule recruitment interviews.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-xl">
          {['All', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Hired'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === st ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by candidate name, position, or qualification..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase">
                <th className="py-3.5 px-4">Applicant Name</th>
                <th className="py-3.5 px-4">Applied Position</th>
                <th className="py-3.5 px-4">Experience & Degree</th>
                <th className="py-3.5 px-4">Applied Date</th>
                <th className="py-3.5 px-4">Hiring Status</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <h4 className="font-bold text-slate-900">{app.candidateName}</h4>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {app.phone} • {app.email}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">{app.jobTitle}</td>
                  <td className="py-3 px-4 text-slate-600">
                    <div>{app.experienceYears} Experience</div>
                    <div className="text-[10px] text-slate-400">{app.highestQualification}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">{app.appliedDate}</td>
                  <td className="py-3 px-4">
                    <select
                      value={app.status}
                      onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border-0 focus:outline-none cursor-pointer ${
                        app.status === 'Hired'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Shortlisted'
                          ? 'bg-indigo-100 text-indigo-800'
                          : app.status === 'Interview Scheduled'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors"
                    >
                      View Resume
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Resume Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">{selectedApp.candidateName}</h3>
                <p className="text-xs text-indigo-200">Candidate ID: {selectedApp.id}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-600">Position Applied For</span>
                <h4 className="text-sm font-bold text-slate-900">{selectedApp.jobTitle}</h4>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-600">
                <div>Email: <strong className="text-slate-800">{selectedApp.email}</strong></div>
                <div>Phone: <strong className="text-slate-800">{selectedApp.phone}</strong></div>
                <div>Total Experience: <strong className="text-slate-800">{selectedApp.experienceYears}</strong></div>
                <div>Qualification: <strong className="text-slate-800">{selectedApp.highestQualification}</strong></div>
                <div>Current Org: <strong className="text-slate-800">{selectedApp.currentCompany || 'N/A'}</strong></div>
                <div>Expected Pay: <strong className="text-slate-800">{selectedApp.expectedSalary || 'Negotiable'}</strong></div>
              </div>

              {selectedApp.resumeFileName && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span className="font-mono font-bold text-slate-800 truncate max-w-[200px]">
                      {selectedApp.resumeFileName}
                    </span>
                  </div>
                  <span className="text-emerald-600 font-bold text-[10px] uppercase">Verified File</span>
                </div>
              )}

              {selectedApp.coverLetter && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Statement of Purpose / Experience</span>
                  <p className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 italic leading-relaxed">
                    "{selectedApp.coverLetter}"
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <span className="text-slate-400 font-mono">Submitted on {selectedApp.appliedDate}</span>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Close Candidate Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
