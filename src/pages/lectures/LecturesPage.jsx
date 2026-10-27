import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import LectureCard from '../../components/cards/LectureCard';
import { Search, LayoutGrid, List, Video, Sparkles, Filter } from 'lucide-react';

export default function LecturesPage() {
  const { lectures, playVideo } = useApp();
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const subjects = [
    'All',
    'Quantitative Aptitude',
    'Logical Reasoning',
    'English Language',
    'Polity & Constitution',
    'General Science',
    'General Hindi',
    'Banking Awareness',
    'Child Pedagogy',
    'Computer Skills'
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredLectures = useMemo(() => {
    return lectures.filter((lec) => {
      const matchSearch =
        lec.title.toLowerCase().includes(search.toLowerCase()) ||
        lec.subject.toLowerCase().includes(search.toLowerCase()) ||
        lec.instructor.toLowerCase().includes(search.toLowerCase());
      const matchSubject = selectedSubject === 'All' || lec.subject === selectedSubject;
      const matchDiff = selectedDifficulty === 'All' || lec.difficulty === selectedDifficulty;
      return matchSearch && matchSubject && matchDiff;
    });
  }, [lectures, search, selectedSubject, selectedDifficulty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
            <Video className="w-4 h-4 text-rose-400" />
            <span>High-Definition Video Lecture Library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Recorded Classes & Speed Mastery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Watch concept breakdown lectures taught by our top faculties. Review chapter timestamps, study attached formula notes, and track your completion progress.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lectures by topic (e.g. Percentage, Puzzles, Tenses, Constitution)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Difficulty & View Mode Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Level:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none"
              >
                {difficulties.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* View Mode Grid/List */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                selectedSubject === sub
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Lectures Display */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <span>Showing <strong className="text-slate-800">{filteredLectures.length}</strong> recorded lectures</span>
          {selectedSubject !== 'All' && <span>Subject: <strong>{selectedSubject}</strong></span>}
        </div>

        {filteredLectures.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLectures.map((lec) => (
                <LectureCard key={lec.id} lecture={lec} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLectures.map((lec) => (
                <LectureCard key={lec.id} lecture={lec} viewMode="list" />
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Video className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No lectures found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No recorded lectures matched your filter criteria. Try resetting the subject or search query.
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedSubject('All'); setSelectedDifficulty('All'); }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
