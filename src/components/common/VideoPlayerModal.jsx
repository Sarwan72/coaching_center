import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Pause, CheckCircle2, FileText, Download, Clock, Eye, Sparkles } from 'lucide-react';

export default function VideoPlayerModal() {
  const { activeVideo, closeVideo, completedLectures, toggleCompleteLecture, showToast } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('chapters'); // 'chapters', 'notes', 'about'

  if (!activeVideo) return null;

  const isCompleted = completedLectures.includes(activeVideo.id);

  const handleSimulatedDownload = (fileName) => {
    showToast(`Downloading attached resource: ${fileName}`, "success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-4xl bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {activeVideo.courseName || 'Recorded Lecture'}
            </span>
          </div>
          <button
            onClick={closeVideo}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display Placeholder */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <img
            src={activeVideo.thumbnail}
            alt={activeVideo.title}
            className="w-full h-full object-cover opacity-60 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          {/* Player Controls Center Overlay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all"
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
          </button>

          {/* Live Video Indicator Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-medium text-slate-200 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> High-Definition 1080p
          </div>

          {/* Bottom Video Progress Simulation */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-2">
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div className="bg-indigo-500 h-full w-[42%] relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="font-mono">19:45 / {activeVideo.duration}</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] uppercase font-bold">1.0x</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1 text-slate-300">
                  <Eye className="w-3.5 h-3.5" /> {(activeVideo.views || 3400).toLocaleString()} views
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3.5 h-3.5" /> {activeVideo.duration} min
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info and Controls Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white leading-snug">{activeVideo.title}</h3>
            <p className="text-xs text-slate-400 mt-1">Instructor: <span className="text-indigo-400 font-medium">{activeVideo.instructor}</span> • Subject: {activeVideo.subject}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleCompleteLecture(activeVideo.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isCompleted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Completed' : 'Mark as Completed'}
            </button>
            {activeVideo.notesAttached && (
              <button
                onClick={() => handleSimulatedDownload(activeVideo.notesAttached)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md"
              >
                <Download className="w-4 h-4" /> Notes PDF
              </button>
            )}
          </div>
        </div>

        {/* Tabs and Tab Content */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-5">
          <div className="flex border-b border-slate-800 gap-6 mb-4">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'chapters'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Chapter Markers ({activeVideo.chapters ? activeVideo.chapters.length : 0})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'about'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Lesson Overview
            </button>
            {activeVideo.notesAttached && (
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'notes'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Attached PDF Notes
              </button>
            )}
          </div>

          {activeTab === 'chapters' && (
            <div className="space-y-2">
              {activeVideo.chapters && activeVideo.chapters.length > 0 ? (
                activeVideo.chapters.map((chap, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-slate-800 group-hover:bg-indigo-600/30 group-hover:text-indigo-400 text-slate-400 flex items-center justify-center text-xs font-mono">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                        {chap.title}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-slate-800 font-mono text-xs text-indigo-400 group-hover:bg-indigo-950">
                      {chap.time}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No timestamp markers available for this lecture.</p>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <p>{activeVideo.description}</p>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1.5">
                <p>• Difficulty Level: <span className="text-slate-200 font-semibold">{activeVideo.difficulty}</span></p>
                <p>• Uploaded on: <span className="text-slate-200 font-semibold">{activeVideo.uploadDate}</span></p>
                <p>• Recommended for: SSC CGL, Banking, Railway, and State Govt tests.</p>
              </div>
            </div>
          )}

          {activeTab === 'notes' && activeVideo.notesAttached && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{activeVideo.notesAttached}</h4>
                  <p className="text-xs text-slate-400">Handwritten classroom formula summary & practice worksheet</p>
                </div>
              </div>
              <button
                onClick={() => handleSimulatedDownload(activeVideo.notesAttached)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
