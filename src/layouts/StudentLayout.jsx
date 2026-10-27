import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  FileText, 
  Keyboard, 
  User, 
  LogOut, 
  Bell, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import VideoPlayerModal from '../components/common/VideoPlayerModal';
import PdfPreviewModal from '../components/common/PdfPreviewModal';
import ToastContainer from '../components/common/ToastContainer';

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { enrolledCourses, completedLectures, bookmarkedMaterials, typingHistory } = useApp();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Enrolled Courses', path: '/student/my-courses', icon: BookOpen, count: enrolledCourses.length },
    { name: 'Recorded Lectures', path: '/student/my-lectures', icon: Video, count: completedLectures.length ? `${completedLectures.length} Done` : null },
    { name: 'Study Material & Notes', path: '/student/study-material', icon: FileText, count: bookmarkedMaterials.length },
    { name: 'Typing Test Results', path: '/student/typing-results', icon: Keyboard, count: typingHistory.length },
    { name: 'My Student Profile', path: '/student/profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">BrightPath</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Student Portal</span>
            </div>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Mini Profile Card */}
        <div className="p-4 mx-4 my-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80"
            alt="Rahul Sharma"
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white truncate">Rahul Sharma</h4>
            <p className="text-[11px] text-slate-400 truncate">Roll No: BP-2026-0814</p>
            <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Active Student
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Study Dashboard
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.count !== undefined && item.count !== null && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Switch Portal Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/admin"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 text-xs font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Switch to Admin View</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <Link
            to="/"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-indigo-400 text-xs font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-4 h-4 text-indigo-400" />
              <span>Back to Public Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </aside>

      {/* Main Right Body */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Welcome back, Rahul! 👋
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Batch: Morning SSC CGL Foundation • Next Mock Test: Sunday 10:00 AM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/typing-practice"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-bold border border-teal-200/60 transition-colors"
            >
              <Keyboard className="w-3.5 h-3.5" /> Start Typing Drill
            </Link>

            <button 
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>

            <Link
              to="/student/profile"
              className="flex items-center gap-2 p-1 pl-2 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all"
            >
              <span className="text-xs font-bold text-slate-700 hidden sm:inline">Rahul Sharma</span>
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
                alt="Rahul"
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
              />
            </Link>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <VideoPlayerModal />
      <PdfPreviewModal />
      <ToastContainer />
    </div>
  );
}
