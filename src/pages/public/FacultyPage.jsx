import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import FacultyCard from '../../components/cards/FacultyCard';
import { GraduationCap, Award, Star, Users, CheckCircle, X, Mail, Phone } from 'lucide-react';

export default function FacultyPage() {
  const { faculty, openEnquiryModal } = useApp();
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>North India's Most Celebrated Educators</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our Distinguished Faculty
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every BrightPath educator brings years of competitive teaching experience, landmark author credentials, or former civil services and banking ranks.
          </p>
        </div>
      </div>

      {/* Grid of Faculty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {faculty.map((fac) => (
          <FacultyCard
            key={fac.id}
            faculty={fac}
            onSelect={(item) => setSelectedFaculty(item)}
          />
        ))}
      </div>

      {/* Faculty Profile Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/7] bg-slate-900 overflow-hidden">
              <img
                src={selectedFaculty.photo}
                alt={selectedFaculty.name}
                className="w-full h-full object-cover opacity-80"
              />
              <button
                onClick={() => setSelectedFaculty(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-6 text-white">
                <h3 className="text-xl font-bold">{selectedFaculty.name}</h3>
                <p className="text-xs text-indigo-300">{selectedFaculty.designation}</p>
              </div>
            </div>

            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Biography</span>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">{selectedFaculty.bio}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Specialization</span>
                <p className="text-xs font-semibold text-indigo-700 mt-1">{selectedFaculty.specialization}</p>
              </div>

              {selectedFaculty.achievements && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Accolades & Milestones</span>
                  <ul className="mt-2 space-y-2 text-xs text-slate-600">
                    {selectedFaculty.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Rating: <strong className="text-slate-800">★ {selectedFaculty.rating}</strong> (From {selectedFaculty.studentsTaught} students)
                </span>
                <button
                  onClick={() => {
                    setSelectedFaculty(null);
                    openEnquiryModal();
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
                >
                  Book Demo with Faculty
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
