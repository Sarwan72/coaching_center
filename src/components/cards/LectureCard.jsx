import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Play, Clock, Eye, CheckCircle2, User, FileText } from 'lucide-react';

export default function LectureCard({ lecture, viewMode = 'grid' }) {
  const { playVideo, completedLectures } = useApp();
  const isCompleted = completedLectures.includes(lecture.id);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 items-center">
          <div 
            onClick={() => playVideo(lecture)}
            className="relative w-36 aspect-video rounded-xl overflow-hidden shrink-0 bg-slate-900 cursor-pointer group"
          >
            <img
              src={lecture.thumbnail}
              alt={lecture.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/70 text-white">
              {lecture.duration}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                {lecture.subject}
              </span>
              {isCompleted && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              )}
            </div>
            <Link to={`/lectures/${lecture.id}`}>
              <h4 className="text-sm font-bold text-slate-800 hover:text-indigo-600 line-clamp-1 transition-colors">
                {lecture.title}
              </h4>
            </Link>
            <p className="text-xs text-slate-500 mt-0.5">Instructor: {lecture.instructor} • {lecture.courseName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {lecture.views?.toLocaleString()}
          </span>
          <button
            onClick={() => playVideo(lecture)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Watch Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Video Thumbnail */}
      <div 
        onClick={() => playVideo(lecture)}
        className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden"
      >
        <img
          src={lecture.thumbnail}
          alt={lecture.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/30 transition-colors"></div>

        {/* Center Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-indigo-600/90 group-hover:bg-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white">
            {lecture.subject}
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white shadow">
              <CheckCircle2 className="w-3 h-3" /> Watched
            </span>
          )}
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-xs font-mono font-medium bg-black/80 text-white backdrop-blur-sm flex items-center gap-1">
          <Clock className="w-3 h-3 text-indigo-400" />
          <span>{lecture.duration}</span>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-medium text-slate-400 truncate block">
            {lecture.courseName}
          </span>
          <Link to={`/lectures/${lecture.id}`}>
            <h3 className="text-sm font-bold text-slate-800 hover:text-indigo-600 line-clamp-2 mt-1 leading-snug transition-colors">
              {lecture.title}
            </h3>
          </Link>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{lecture.instructor}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-slate-400">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {lecture.views?.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => playVideo(lecture)}
            className="flex-1 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Watch Lecture
          </button>
          <Link
            to={`/lectures/${lecture.id}`}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
