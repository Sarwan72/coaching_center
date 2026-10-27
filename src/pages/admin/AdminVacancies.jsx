import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  Users, 
  CheckCircle2, 
  Clock, 
  X, 
  Eye, 
  FileCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminVacancies() {
  const { vacancies, addVacancy, updateVacancy, deleteVacancy, applications, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingApplicantsFor, setViewingApplicantsFor] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    department: 'Teaching',
    category: 'Teaching',
    type: 'Full-time',
    experience: '2-5 Years',
    salary: '₹40,000 - ₹60,000 / month',
    location: 'Noida Sector 62, UP',
    openings: 2,
    deadline: '2026-11-30',
    description: 'Energetic educator or coordinator required for offline and online coaching batches.',
    status: 'Active'
  });

  const filteredVacancies = vacancies.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    v.department.toLowerCase().includes(search.toLowerCase()) ||
    v.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      department: 'Teaching',
      category: 'Teaching',
      type: 'Full-time',
      experience: '2-5 Years',
      salary: '₹40,000 - ₹60,000 / month',
      location: 'Noida Sector 62, UP',
      openings: 2,
      deadline: '2026-11-30',
      description: 'Energetic educator or coordinator required for offline and online coaching batches.',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleToggleStatus = (vac) => {
    const nextStatus = vac.status === 'Active' ? 'Closed' : 'Active';
    updateVacancy(vac.id, { status: nextStatus });
    showToast(`Vacancy marked as "${nextStatus}"`, "info");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addVacancy(formData);
    setIsModalOpen(false);
  };

  const vacancyApplicants = viewingApplicantsFor
    ? applications.filter(a => a.vacancyId === viewingApplicantsFor.id || a.jobTitle?.includes(viewingApplicantsFor.title?.slice(0, 10)))
    : [];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Faculty & Staff Vacancy Manager</h2>
          <p className="text-xs text-slate-500">Post new job openings, manage candidate applications, and close filled positions.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Post New Vacancy
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vacancies by title, department, or location..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none"
          />
        </div>
        <span className="text-xs text-slate-500">{filteredVacancies.length} Openings Listed</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase">
                <th className="py-3.5 px-4">Position Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Salary Range</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Applicants</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVacancies.map((vac) => (
                <tr key={vac.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <Link to={`/careers/${vac.id}`} className="font-bold text-slate-800 hover:text-indigo-600">
                        {vac.title}
                      </Link>
                      <p className="text-[10px] text-slate-400 mt-0.5">Exp: {vac.experience} • {vac.type}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                      {vac.department}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 truncate max-w-[140px]">{vac.location}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-600">{vac.salary}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleStatus(vac)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                        vac.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : vac.status === 'Closing Soon'
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                      title="Click to toggle status"
                    >
                      {vac.status} (Toggle)
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setViewingApplicantsFor(vac)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Users className="w-3 h-3" />
                      <span>{vac.applicantsCount || 0} Candidates</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => deleteVacancy(vac.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete Vacancy"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: View Applicants for this Job */}
      {viewingApplicantsFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <div>
                <h3 className="text-base font-bold">Applicants: {viewingApplicantsFor.title}</h3>
                <p className="text-xs text-indigo-200">Viewing submissions stored in local recruitment pipeline</p>
              </div>
              <button
                onClick={() => setViewingApplicantsFor(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3">
              {vacancyApplicants.length > 0 ? (
                vacancyApplicants.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{app.candidateName}</h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                        {app.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-600">
                      <div>Email: <strong className="text-slate-800">{app.email}</strong></div>
                      <div>Phone: <strong className="text-slate-800">{app.phone}</strong></div>
                      <div>Experience: <strong className="text-slate-800">{app.experienceYears}</strong></div>
                      <div>Qualification: <strong className="text-slate-800">{app.highestQualification}</strong></div>
                    </div>
                    {app.resumeFileName && (
                      <div className="pt-1 flex items-center gap-1.5 text-indigo-600 font-semibold font-mono">
                        <FileCheck className="w-3.5 h-3.5" /> Resume: {app.resumeFileName}
                      </div>
                    )}
                    {app.coverLetter && (
                      <p className="pt-1 text-slate-500 italic bg-white p-2.5 rounded-xl border border-slate-100">
                        "{app.coverLetter}"
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-semibold">No direct applications submitted for this role yet.</p>
                  <p className="text-xs">Candidate submissions from the public careers page will appear here immediately.</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
              <button
                onClick={() => setViewingApplicantsFor(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Post New Vacancy */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" /> Post New Faculty / Staff Vacancy
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Job Position Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior General Studies & Constitution Faculty"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Teaching">Teaching Faculty</option>
                    <option value="Non-Teaching">Non-Teaching Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Employment Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time / Weekend">Part-time / Weekend</option>
                    <option value="Guest Lecturer">Guest Lecturer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Monthly Remuneration (₹)
                  </label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g. ₹45,000 - ₹70,000 / month"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Job Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Noida Sector 62, UP"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Required Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 2-5 Years"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Job Description & Roles
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow transition-all"
                >
                  Publish Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
