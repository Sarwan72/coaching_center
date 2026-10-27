import React from 'react';
import { Star, Award, BookOpen, Users, CheckCircle2 } from 'lucide-react';

export default function FacultyCard({ faculty, onSelect }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Top Image & Rating */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={faculty.photo}
          alt={faculty.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        {/* Rating Pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-400 text-xs font-bold border border-white/10">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{faculty.rating}</span>
        </div>

        {/* Experience & Students Overlay */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs text-white">
          <span className="font-semibold px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm">
            {faculty.experience} Experience
          </span>
          <span className="flex items-center gap-1 font-semibold text-emerald-300">
            <Users className="w-3.5 h-3.5" /> {faculty.studentsTaught} Students
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {faculty.name}
          </h3>
          <p className="text-xs font-semibold text-indigo-600 mt-0.5">
            {faculty.designation}
          </p>

          <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
            {faculty.bio}
          </p>

          {/* Specialization */}
          <div className="mt-3 py-2 px-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
              Specialization
            </span>
            <p className="text-xs font-medium text-slate-700 truncate">
              {faculty.specialization}
            </p>
          </div>

          {/* Courses Taught Pills */}
          <div className="mt-3 flex flex-wrap gap-1">
            {faculty.coursesTaught?.map((courseName, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-medium"
              >
                {courseName}
              </span>
            ))}
          </div>
        </div>

        {/* View Profile Action */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified Educator
          </span>
          {onSelect && (
            <button
              onClick={() => onSelect(faculty)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              View Full Profile →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
