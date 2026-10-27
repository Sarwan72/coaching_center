import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Keyboard, 
  Award, 
  CheckCircle2, 
  Clock, 
  Play, 
  Download, 
  ArrowRight, 
  Calendar, 
  Bell, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function StudentDashboard() {
  const { 
    courses, 
    lectures, 
    materials, 
    enrolledCourses, 
    completedLectures, 
    bookmarkedMaterials, 
    typingHistory, 
    playVideo,
    previewPdf,
    announcements
  } = useApp();

  const userCourses = courses.filter(c => enrolledCourses.includes(c.id));
  const recentLecture = lectures[0];
  const lastTypingAttempt = typingHistory[0] || { wpm: 44, accuracy: 96, date: "Today" };

  const upcomingMockTests = [
    { title: "SSC CGL Full-Length Mock #12", date: "Sunday, 10:00 AM", duration: "60 mins", marks: "200 Marks", status: "Upcoming" },
    { title: "Quantitative Speed Drill: Percentage", date: "Wednesday, 08:00 PM", duration: "30 mins", marks: "50 Marks", status: "Upcoming" },
    { title: "General Hindi & Mool Vidhi Quiz", date: "Friday, 06:00 PM", duration: "45 mins", marks: "100 Marks", status: "Upcoming" }
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-indigo-200 border border-white/10">
            Student ID: BP-2026-0814 • Morning Batch A
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Keep Pushing, Rahul! 🚀
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
            You've completed <strong>{completedLectures.length}</strong> video lectures and maintained <strong>94%</strong> attendance this month. Your next All-India Mock Test is in 2 days.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/typing-practice"
            className="px-4 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-teal-950 font-bold text-xs flex items-center gap-1.5 shadow"
          >
            <Keyboard className="w-4 h-4" /> Start Typing Test
          </Link>
          <Link
            to="/student/my-courses"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
          >
            My Courses
          </Link>
        </div>
      </div>

      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Enrolled Courses</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{enrolledCourses.length}</div>
            <span className="text-[10px] text-emerald-600 font-semibold">Active Batches</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed Lectures</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{completedLectures.length}</div>
            <span className="text-[10px] text-slate-400">Out of 148 syllabus</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
            <Keyboard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Typing Speed</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{lastTypingAttempt.wpm} <span className="text-xs font-normal">WPM</span></div>
            <span className="text-[10px] text-emerald-600 font-semibold">{lastTypingAttempt.accuracy}% Accuracy</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mock Score Avg</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">158 <span className="text-xs font-normal">/ 200</span></div>
            <span className="text-[10px] text-indigo-600 font-semibold">Top 15% Rank</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Continue Learning & Sidebar info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col (8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Continue Learning Widget */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Resume Lesson</span>
                <h3 className="text-base font-bold text-slate-900">Continue Where You Left Off</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Lecture 3 of 48</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div 
                onClick={() => playVideo(recentLecture)}
                className="relative w-full sm:w-44 aspect-video rounded-xl overflow-hidden shrink-0 bg-slate-900 cursor-pointer group"
              >
                <img
                  src={recentLecture.thumbnail}
                  alt={recentLecture.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                  {recentLecture.subject}
                </span>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{recentLecture.title}</h4>
                <p className="text-xs text-slate-500">Instructor: {recentLecture.instructor} • Duration: {recentLecture.duration}</p>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>19 mins watched</span>
                    <span>42% completed</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full w-[42%]"></div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => playVideo(recentLecture)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 shadow-sm"
              >
                Resume
              </button>
            </div>
          </div>

          {/* Enrolled Courses Summary */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">My Active Enrolled Courses</h3>
              <Link to="/student/my-courses" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {userCourses.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl border border-slate-200/80 hover:border-indigo-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      className="w-16 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{c.title}</h4>
                      <p className="text-xs text-slate-500">{c.category} • Mentor: {c.instructor}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-xs font-bold text-indigo-600">68% Done</span>
                      <p className="text-[10px] text-slate-400">12 / 18 Tests Completed</p>
                    </div>
                    <Link
                      to={`/courses/${c.id}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-bold transition-colors"
                    >
                      Classroom
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tests & Assignments */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-500" /> Upcoming Mock Tests & Assignments
            </h3>

            <div className="space-y-3">
              {upcomingMockTests.map((t, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <h5 className="font-bold text-slate-800">{t.title}</h5>
                    <p className="text-slate-500">{t.date} • {t.duration} • {t.marks}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Announcements & Saved Notes (4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Announcements Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Bell className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">Academy Notices</h3>
            </div>

            <div className="space-y-3">
              {announcements.slice(0, 3).map((ann) => (
                <div key={ann.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                      {ann.badge || 'Notice'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{ann.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">{ann.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bookmarked Study Material */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold text-slate-900">Saved Study Notes</h3>
              </div>
              <span className="text-xs text-slate-400">{bookmarkedMaterials.length} items</span>
            </div>

            <div className="space-y-2.5">
              {materials.filter(m => bookmarkedMaterials.includes(m.id)).slice(0, 3).map((mat) => (
                <div
                  key={mat.id}
                  onClick={() => previewPdf(mat)}
                  className="p-3 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50 hover:bg-indigo-50/40 cursor-pointer transition-colors space-y-1 group"
                >
                  <h5 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 line-clamp-1">{mat.title}</h5>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{mat.subject}</span>
                    <span className="font-mono">{mat.fileSize}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/student/study-material"
              className="block text-center text-xs font-bold text-indigo-600 hover:text-indigo-800 pt-1"
            >
              Open Study Material Hub →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
