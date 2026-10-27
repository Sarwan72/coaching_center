import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, IndianRupee, Calendar, Clock, Users, ArrowRight } from 'lucide-react';

export default function VacancyCard({ vacancy }) {
  const isClosed = vacancy.status === 'Closed';
  const isClosingSoon = vacancy.status === 'Closing Soon';

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
      isClosed 
        ? 'border-slate-200 opacity-75' 
        : 'border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-xl'
    }`}>
      <div className="p-5">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            vacancy.category === 'Teaching' 
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60' 
              : 'bg-teal-50 text-teal-700 border border-teal-200/60'
          }`}>
            {vacancy.department}
          </span>

          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            isClosed
              ? 'bg-slate-100 text-slate-500'
              : isClosingSoon
              ? 'bg-amber-100 text-amber-800 animate-pulse'
              : 'bg-emerald-100 text-emerald-800'
          }`}>
            {vacancy.status}
          </span>
        </div>

        {/* Title */}
        <Link to={`/careers/${vacancy.id}`}>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 leading-snug">
            {vacancy.title}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {vacancy.description}
        </p>

        {/* Key Attributes */}
        <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">{vacancy.location}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{vacancy.type}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Briefcase className="w-3.5 h-3.5 text-teal-500 shrink-0" />
            <span>Exp: {vacancy.experience}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate font-semibold text-slate-800">
            <span className="text-emerald-600 font-bold">₹</span>
            <span className="truncate">{vacancy.salary}</span>
          </div>
        </div>
      </div>

      {/* Footer Info & CTA */}
      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 space-y-0.5">
            <p>Deadline: <strong className="text-slate-600">{vacancy.deadline}</strong></p>
            <p>{vacancy.openings} Openings • {vacancy.applicantsCount || 0} applied</p>
          </div>

          <Link
            to={`/careers/${vacancy.id}`}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isClosed
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
            }`}
          >
            {isClosed ? 'Closed' : 'Apply Now'}
            {!isClosed && <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        </div>
      </div>
    </div>
  );
}
