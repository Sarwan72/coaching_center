import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Search, Phone, Mail, Clock, CheckCircle2, X } from 'lucide-react';

export default function AdminEnquiries() {
  const { enquiries, updateEnquiryStatus } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const filteredEnquiries = enquiries.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.courseInterested.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Student Admissions & Inquiries</h2>
          <p className="text-xs text-slate-500">
            Real-time contact leads submitted via website demo forms and callback requests.
          </p>
        </div>
        
        {/* Status Filter */}
        <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-xl">
          {['All', 'New', 'Contacted', 'Converted'].map((st) => (
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
          placeholder="Search by student name, phone number, or target course..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase">
                <th className="py-3.5 px-4">Student & Contact</th>
                <th className="py-3.5 px-4">Course Interested</th>
                <th className="py-3.5 px-4">Preferred Mode</th>
                <th className="py-3.5 px-4">Inquiry Date</th>
                <th className="py-3.5 px-4">Lead Status</th>
                <th className="py-3.5 px-4 text-right">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <h4 className="font-bold text-slate-900">{enq.name}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5 font-mono">
                      <span>{enq.phone}</span>
                      <span>•</span>
                      <span>{enq.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{enq.courseInterested}</td>
                  <td className="py-3 px-4 text-slate-600">{enq.mode || 'Classroom'}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{enq.date}</td>
                  <td className="py-3 px-4">
                    <select
                      value={enq.status}
                      onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border-0 focus:outline-none cursor-pointer ${
                        enq.status === 'New'
                          ? 'bg-rose-100 text-rose-800'
                          : enq.status === 'Converted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <option value="New">New Lead</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted to Admission</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedEnquiry(enq)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors"
                    >
                      Read Note
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Message Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">{selectedEnquiry.name}</h3>
                <p className="text-xs text-indigo-200">{selectedEnquiry.phone} • {selectedEnquiry.email}</p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Course Interested</span>
                <p className="text-sm font-bold text-slate-900">{selectedEnquiry.courseInterested}</p>
                <p className="text-xs text-slate-500">Mode: {selectedEnquiry.mode}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Student Message / Query</span>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{selectedEnquiry.message || 'No additional message provided.'}"
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-slate-400 font-mono">{selectedEnquiry.date}</span>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
