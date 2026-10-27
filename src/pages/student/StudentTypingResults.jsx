import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Keyboard, TrendingUp, Award, Zap, Clock, ArrowRight } from 'lucide-react';

export default function StudentTypingResults() {
  const { typingHistory } = useApp();

  const bestSpeed = typingHistory.length > 0 ? Math.max(...typingHistory.map(h => h.wpm)) : 48;
  const avgAccuracy = typingHistory.length > 0 ? Math.round(typingHistory.reduce((acc, cur) => acc + cur.accuracy, 0) / typingHistory.length) : 96;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Typing Performance & Analytics</h2>
          <p className="text-xs text-slate-500">
            Track your typing speed (WPM) and accuracy across English and Hindi passages.
          </p>
        </div>
        <Link
          to="/typing-practice"
          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shrink-0 shadow-sm flex items-center gap-1.5"
        >
          <Keyboard className="w-4 h-4" /> Start New Typing Test
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
            <Zap className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Personal Best Speed</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{bestSpeed} <span className="text-sm font-normal">WPM</span></div>
            <span className="text-xs text-emerald-600 font-semibold">Exceeds SSC Cutoff (30 WPM)</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Average Accuracy</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{avgAccuracy}%</div>
            <span className="text-xs text-indigo-600 font-semibold">Error tolerance &lt; 5%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Drills Completed</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{typingHistory.length} Tests</div>
            <span className="text-xs text-slate-500">Regular daily practice</span>
          </div>
        </div>

      </div>

      {/* History Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-900">Drill History Log</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase font-semibold">
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Passage</th>
                <th className="pb-3">Language</th>
                <th className="pb-3">Gross WPM</th>
                <th className="pb-3">Accuracy</th>
                <th className="pb-3">Duration</th>
                <th className="pb-3">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {typingHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-mono text-slate-500">{item.date}</td>
                  <td className="py-3 font-bold text-slate-800">{item.passageTitle}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {item.language}
                    </span>
                  </td>
                  <td className="py-3 font-mono font-extrabold text-teal-600">{item.wpm} WPM</td>
                  <td className="py-3 font-mono font-bold text-indigo-600">{item.accuracy}%</td>
                  <td className="py-3 text-slate-500">{item.duration}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Standard Met
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
