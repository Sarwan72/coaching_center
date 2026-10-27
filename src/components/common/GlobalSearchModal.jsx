import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, X, BookOpen, Video, FileText, Briefcase, ArrowRight } from 'lucide-react';

export default function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen, courses, lectures, materials, vacancies } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredCourses = q ? courses.filter(c => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)).slice(0, 3) : [];
  const filteredLectures = q ? lectures.filter(l => l.title.toLowerCase().includes(q) || l.subject.toLowerCase().includes(q)).slice(0, 3) : [];
  const filteredMaterials = q ? materials.filter(m => m.title.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q)).slice(0, 3) : [];
  const filteredVacancies = q ? vacancies.filter(v => v.title.toLowerCase().includes(q) || v.department.toLowerCase().includes(q)).slice(0, 2) : [];

  const totalResults = filteredCourses.length + filteredLectures.length + filteredMaterials.length + filteredVacancies.length;

  const handleSelect = (path) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-indigo-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, lectures, PDF notes, jobs..."
            className="w-full bg-transparent text-slate-800 text-base placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold text-slate-400 bg-slate-100 rounded border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-slate-400">
              <p className="text-sm">Type keywords like <span className="font-semibold text-indigo-600">"SSC"</span>, <span className="font-semibold text-indigo-600">"Percentage"</span>, <span className="font-semibold text-indigo-600">"Reasoning"</span>, or <span className="font-semibold text-indigo-600">"Faculty"</span></p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['SSC CGL', 'Banking PO', 'Indian Polity', 'MS Excel', 'Typing Test'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 text-xs rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="text-center py-10 text-slate-500">
              <p className="font-medium">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try checking your spelling or search for general subjects.</p>
            </div>
          )}

          {/* Courses Matches */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> Courses
              </div>
              <div className="space-y-1">
                {filteredCourses.map(course => (
                  <button
                    key={course.id}
                    onClick={() => handleSelect(`/courses/${course.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 text-left group transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">{course.title}</h4>
                      <p className="text-xs text-slate-500">{course.category} • {course.instructor}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lectures Matches */}
          {filteredLectures.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
                <Video className="w-3.5 h-3.5 text-rose-500" /> Recorded Lectures
              </div>
              <div className="space-y-1">
                {filteredLectures.map(lec => (
                  <button
                    key={lec.id}
                    onClick={() => handleSelect(`/lectures/${lec.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 text-left group transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">{lec.title}</h4>
                      <p className="text-xs text-slate-500">{lec.subject} • {lec.duration} min</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Materials Matches */}
          {filteredMaterials.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
                <FileText className="w-3.5 h-3.5 text-amber-500" /> PDF Study Materials
              </div>
              <div className="space-y-1">
                {filteredMaterials.map(mat => (
                  <button
                    key={mat.id}
                    onClick={() => handleSelect(`/study-material`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 text-left group transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">{mat.title}</h4>
                      <p className="text-xs text-slate-500">{mat.subject} • {mat.fileSize}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Vacancies Matches */}
          {filteredVacancies.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
                <Briefcase className="w-3.5 h-3.5 text-emerald-500" /> Career Vacancies
              </div>
              <div className="space-y-1">
                {filteredVacancies.map(vac => (
                  <button
                    key={vac.id}
                    onClick={() => handleSelect(`/careers/${vac.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 text-left group transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">{vac.title}</h4>
                      <p className="text-xs text-slate-500">{vac.department} • {vac.location}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Navigate to any content instantly</span>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="hover:text-slate-800 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
