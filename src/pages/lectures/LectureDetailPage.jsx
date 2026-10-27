import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  Eye, 
  FileText, 
  Download, 
  ArrowLeft, 
  Share2, 
  Sparkles,
  BookOpen,
  Volume2,
  Maximize,
  Check
} from 'lucide-react';
import LectureCard from '../../components/cards/LectureCard';

export default function LectureDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lectures, completedLectures, toggleCompleteLecture, showToast } = useApp();

  const lecture = lectures.find((l) => l.id === id) || lectures[0];
  const isCompleted = completedLectures.includes(lecture.id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState('1.0x');
  const [copied, setCopied] = useState(false);

  const relatedLectures = lectures.filter((l) => l.id !== lecture.id && (l.subject === lecture.subject || l.courseId === lecture.courseId)).slice(0, 4);

  const handleDownloadNotes = () => {
    showToast(`Downloading attached study notes: ${lecture.notesAttached || 'Lecture_Notes.pdf'}`, "success");
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    showToast("Lecture link copied to clipboard!", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={() => navigate('/lectures')}
          className="flex items-center gap-1.5 hover:text-indigo-600 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Lectures Library
        </button>
        <div className="flex items-center gap-2">
          <span>{lecture.subject}</span>
          <span>/</span>
          <span className="text-slate-800 font-medium truncate max-w-[200px]">{lecture.title}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Video & Details (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Video Player Canvas */}
          <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
              <img
                src={lecture.thumbnail}
                alt={lecture.title}
                className="w-full h-full object-cover opacity-75 group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

              {/* Play / Pause Center Trigger */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute z-10 w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all"
              >
                {isPlaying ? <Pause className="w-9 h-9" /> : <Play className="w-9 h-9 ml-1 fill-current" />}
              </button>

              {/* Top Bar Badges */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs text-white">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-semibold">
                  {lecture.courseName}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/80 backdrop-blur-md font-bold text-[10px] uppercase">
                  1080p Full HD
                </span>
              </div>

              {/* Simulated Scrub Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 to-transparent flex flex-col gap-2">
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                  <div className="bg-indigo-500 h-full w-[35%] relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <Volume2 className="w-4 h-4 text-slate-400 hover:text-white" />
                    <span className="font-mono text-[11px]">16:40 / {lecture.duration}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold">
                      {['1.0x', '1.25x', '1.5x'].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setCurrentSpeed(spd)}
                          className={`px-1 py-0.5 rounded transition-colors ${
                            currentSpeed === spd ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          {spd}
                        </button>
                      ))}
                    </div>
                    <Maximize className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Action Bar */}
            <div className="p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {lecture.title}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Instructor: <span className="text-indigo-400 font-semibold">{lecture.instructor}</span> • Uploaded on {lecture.uploadDate}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleCompleteLecture(lecture.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow ${
                    isCompleted
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isCompleted ? 'Completed' : 'Mark as Completed'}
                </button>

                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  title="Share Lecture"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Lecture Description & Attached Material */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">About this Class</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {lecture.description}
              </p>
            </div>

            {/* Attached Notes Card */}
            {lecture.notesAttached && (
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Classroom Lecture Notes Attached</span>
                    <h4 className="text-sm font-bold text-slate-900">{lecture.notesAttached}</h4>
                    <p className="text-xs text-slate-500">Handwritten cheat sheet with solved homework examples</p>
                  </div>
                </div>

                <button
                  onClick={handleDownloadNotes}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            )}
          </div>

          {/* Interactive Chapter Timeline */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              Chapter Timestamps & Key Moments
            </h3>
            
            <div className="space-y-2">
              {lecture.chapters ? (
                lecture.chapters.map((chap, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-500 group-hover:text-indigo-600 flex items-center justify-center text-xs font-mono font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                        {chap.title}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-mono text-xs font-bold text-indigo-600">
                      {chap.time}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">Continuous video without separate chapters.</p>
              )}
            </div>
          </div>

        </div>

        {/* Sidebar: Related Lectures (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Related Course Lectures
              </h3>
              <span className="text-xs text-slate-400">{relatedLectures.length} videos</span>
            </div>

            <div className="space-y-3">
              {relatedLectures.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/lectures/${rel.id}`}
                  className="flex gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="relative w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-slate-900">
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded text-[9px] font-mono bg-black/80 text-white">
                      {rel.duration}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-indigo-600 block truncate">
                      {rel.subject}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 line-clamp-2 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1">{rel.instructor}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
