import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import LectureCard from '../../components/cards/LectureCard';
import { Video, CheckCircle2, Search, Play } from 'lucide-react';

export default function StudentLectures() {
  const { lectures, completedLectures, playVideo, toggleCompleteLecture } = useApp();
  const [filter, setFilter] = useState('All'); // 'All' | 'Completed' | 'Pending'
  const [search, setSearch] = useState('');

  const filteredLectures = useMemo(() => {
    return lectures.filter((l) => {
      const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) || l.subject.toLowerCase().includes(search.toLowerCase());
      const isDone = completedLectures.includes(l.id);
      if (filter === 'Completed') return matchSearch && isDone;
      if (filter === 'Pending') return matchSearch && !isDone;
      return matchSearch;
    });
  }, [lectures, completedLectures, filter, search]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Recorded Lecture Portal</h2>
          <p className="text-xs text-slate-500">
            {completedLectures.length} of {lectures.length} lectures completed • Track your syllabus progression
          </p>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-xl shrink-0">
          {['All', 'Pending', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === tab ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter lectures by title or topic..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Lectures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLectures.map((lec) => (
          <LectureCard key={lec.id} lecture={lec} />
        ))}
      </div>
    </div>
  );
}
