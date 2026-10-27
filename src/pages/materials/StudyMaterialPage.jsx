import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import MaterialCard from '../../components/cards/MaterialCard';
import { Search, FileText, Download, Filter, Star, Sparkles, BookOpen } from 'lucide-react';

export default function StudyMaterialPage() {
  const { materials, previewPdf } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = [
    'All',
    'Notes',
    'Previous Year Papers',
    'Mock Tests',
    'Assignments',
    'Syllabus',
    'Answer Keys'
  ];

  const subjects = [
    'All',
    'Quantitative Aptitude',
    'Polity & Constitution',
    'Logical Reasoning',
    'General Science & Maths',
    'Computer Skills',
    'English Language',
    'General Hindi',
    'Child Pedagogy & EVS'
  ];

  const popularMaterials = useMemo(() => {
    return materials.filter(m => m.isPopular).slice(0, 4);
  }, [materials]);

  const filteredMaterials = useMemo(() => {
    return materials.filter((mat) => {
      const matchSearch =
        mat.title.toLowerCase().includes(search.toLowerCase()) ||
        mat.subject.toLowerCase().includes(search.toLowerCase()) ||
        mat.courseName.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'All' || mat.category === selectedCategory;
      const matchSubject = selectedSubject === 'All' || mat.subject.includes(selectedSubject);
      return matchSearch && matchCategory && matchSubject;
    });
  }, [materials, search, selectedCategory, selectedSubject]);

  const displayedMaterials = filteredMaterials.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Digital Study Hub & Verified PDF Bank</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Handwritten Notes & Mock Tests
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Free download of TCS-pattern formula handbooks, previous year solved question papers, English vocab capsules, and child pedagogy notes.
          </p>
        </div>
      </div>

      {/* Featured / Popular Materials Row */}
      {popularMaterials.length > 0 && selectedCategory === 'All' && !search && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-slate-900">Most Downloaded Exam Capsules</h2>
            </div>
            <span className="text-xs text-slate-400">High-yield revision PDFs</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularMaterials.map((mat) => (
              <MaterialCard key={mat.id} material={mat} />
            ))}
          </div>
        </div>
      )}

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search PDF notes by subject or title (e.g. Maths, Polity, Reasoning, Hindi)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Subject Dropdown Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-600">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              {subjects.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* All Materials Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong className="text-slate-800">{displayedMaterials.length}</strong> of {filteredMaterials.length} PDF materials</span>
          {selectedCategory !== 'All' && <span>Category: <strong>{selectedCategory}</strong></span>}
        </div>

        {displayedMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedMaterials.map((mat) => (
              <MaterialCard key={mat.id} material={mat} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No study material matches your criteria</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try searching for general terms like "Notes", "Polity", or "Mock Test".
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedSubject('All'); }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-50 text-amber-700 hover:bg-amber-100"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredMaterials.length && (
          <div className="text-center pt-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm transition-all"
            >
              Load More Study Materials ({filteredMaterials.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
