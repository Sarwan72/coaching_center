import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import VacancyCard from '../../components/cards/VacancyCard';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Filter, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  PlusCircle,
  FileCheck,
  AlertCircle
} from 'lucide-react';

export default function CareersPage() {
  const { vacancies } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All'); // 'All' | 'Teaching' | 'Non-Teaching'
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const locations = ['All', 'Noida', 'Delhi', 'Lucknow', 'Jaipur'];
  const employmentTypes = ['All', 'Full-time', 'Part-time'];

  const filteredVacancies = useMemo(() => {
    return vacancies.filter((v) => {
      const matchSearch =
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.department.toLowerCase().includes(search.toLowerCase()) ||
        v.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'All' || v.category === selectedCategory;
      const matchLocation = selectedLocation === 'All' || v.location.includes(selectedLocation);
      const matchType = selectedType === 'All' || v.type.includes(selectedType);
      return matchSearch && matchCategory && matchLocation && matchType;
    });
  }, [vacancies, search, selectedCategory, selectedLocation, selectedType]);

  const teachingCount = vacancies.filter(v => v.category === 'Teaching').length;
  const nonTeachingCount = vacancies.filter(v => v.category === 'Non-Teaching').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Careers Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>Join North India's Leading EdTech & Coaching Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Careers at BrightPath Academy
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We are looking for passionate educators, student counselors, video editors, and administrative coordinators to join our Noida, Delhi, and Lucknow branches.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <span className="text-xs text-emerald-300 bg-emerald-900/50 px-3 py-1.5 rounded-xl border border-emerald-700/50">
              • Attractive monthly pay • Smart classroom studios • Performance bonuses
            </span>
          </div>
        </div>
      </div>

      {/* Job Seeker Notice Board */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900">Walk-In Interviews for Faculties & Telecallers</h4>
            <p className="text-xs text-amber-800">
              Direct walk-in interviews are conducted every Tuesday and Friday (11:00 AM - 4:00 PM) at our Noida Sector 62 Head Campus.
            </p>
          </div>
        </div>

        <Link
          to="/admin/vacancies"
          className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 shrink-0 transition-colors flex items-center gap-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5" /> Post a Vacancy (Admin)
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Category Tabs: All / Teaching / Non-Teaching */}
        <div className="flex border-b border-slate-100 pb-3 gap-3">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`pb-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              selectedCategory === 'All'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            All Openings ({vacancies.length})
          </button>
          <button
            onClick={() => setSelectedCategory('Teaching')}
            className={`pb-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-1.5 ${
              selectedCategory === 'Teaching'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" /> Teaching Vacancies ({teachingCount})
          </button>
          <button
            onClick={() => setSelectedCategory('Non-Teaching')}
            className={`pb-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-1.5 ${
              selectedCategory === 'Non-Teaching'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Non-Teaching & Staff ({nonTeachingCount})
          </button>
        </div>

        {/* Filter Row */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job title, subject, or role (e.g. Maths, Reasoning, Counsellor, Editor)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Location Filter */}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>Location: {loc}</option>
                ))}
              </select>
            </div>

            {/* Employment Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              {employmentTypes.map(t => (
                <option key={t} value={t}>Type: {t}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Vacancies Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong className="text-slate-800">{filteredVacancies.length}</strong> active openings</span>
          {selectedCategory !== 'All' && <span>Category: <strong>{selectedCategory}</strong></span>}
        </div>

        {filteredVacancies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVacancies.map((vac) => (
              <VacancyCard key={vac.id} vacancy={vac} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No vacancies match your criteria</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We are constantly adding new teaching and non-teaching positions. Try adjusting your filters.
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedLocation('All'); setSelectedType('All'); }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
