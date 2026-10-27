import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Star, Users, Plus, Search, Edit, Trash2, Award } from 'lucide-react';

export default function AdminFaculty() {
  const { faculty } = useApp();
  const [search, setSearch] = useState('');

  const filteredFaculty = faculty.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.specialization.toLowerCase().includes(search.toLowerCase()) ||
    f.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Faculty Roster & Department Allocation</h2>
          <p className="text-xs text-slate-500">Manage star educators, assigned courses, student satisfaction ratings, and achievements.</p>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={fac.photo}
                  alt={fac.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500 shadow shrink-0"
                />
                <div>
                  <h4 className="text-base font-bold text-slate-900">{fac.name}</h4>
                  <p className="text-xs text-indigo-600 font-semibold">{fac.designation}</p>
                  <span className="inline-block mt-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Active Faculty
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                <div className="text-[10px] uppercase font-bold text-slate-400">Specialization</div>
                <div className="font-semibold text-slate-800">{fac.specialization}</div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <span>Experience: <strong className="text-slate-800">{fac.experience}</strong></span>
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" /> {fac.rating}
                </span>
              </div>

              {/* Courses Taught */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Assigned Courses</span>
                <div className="flex flex-wrap gap-1">
                  {fac.coursesTaught?.map((c, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {fac.studentsTaught} Taught
              </span>
              <span className="text-emerald-600 font-bold">Verified Mentor</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
